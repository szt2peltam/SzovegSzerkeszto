
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


saveButton.addEventListener("click", (e) =>{
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