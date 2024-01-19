
const fileInput = document.querySelector(".file-input");
const page = document.querySelector(".page");
const saveButton = document.querySelector(".save")
const wordcount = document.querySelector(".count")

fileInput.addEventListener("change",(e)=>{
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = (e) =>{
        const content = e.target.result;
        page.innerText = content
    }
    reader.readAsText(file);
    
})



saveButton.addEventListener("click", async (e) =>{
    if(!fileInput.files[0]){
        await ShowError("Fájl nem található!")
        return
    }
    
    const blob = new Blob([page.innerText], {type:"text/plain"})

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    const fileName = 'savedTextFile.txt';
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
})

page.addEventListener("keyup" ,(e) =>{
    if(page.innerText.length == 0){
        wordcount.innerText = `0 word, 0 character`;
        return;
    }
    let content = page.innerText.trim().split(" ");
    wordcount.innerText = `${content.length} word, ${page.innerText.length} character`;

})

let IsErrorDisplayed = false;

async function ShowError(msg){
    if(IsErrorDisplayed) return
    IsErrorDisplayed = true
    document.body.insertAdjacentHTML("beforeend", `
    <div class="error">
        <h2>ERROR</h2>
        <p>${msg}</p>
        <div class="close-error-btn">
            Bezárás
        </div>
        <div class="timer">5s</div>
</div>`);

    let errorelement = document.querySelector(".error");
    let timer = document.querySelector(".timer")
    let bezarasbtn = document.querySelector(".close-error-btn")
    bezarasbtn.addEventListener("click",()=>{
        errorelement.remove();

    })
    for (let index = 4; index > -1; index--) {
        await wait(1000);
        timer.innerText = `${index}s`

        
        
    }
    await wait(1000)
    errorelement.remove();
    IsErrorDisplayed = false;
    console.log("EXECUTED");

}


function wait(ms) {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
  }