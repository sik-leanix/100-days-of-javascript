const button = document.querySelector(".btn");
const result = document.querySelector(".result");
let inputText = document.querySelector(".input-text");



const characterCounter = () => {
    let inputWord = document.querySelector(".input-text").value;
    let amountOfCharacters = inputWord.replace(/\s+/g, '').length;
    if (amountOfCharacters === 0) {
        result.innerHTML = "Please type in a word!"
    } else {
        result.innerHTML = `${inputWord} has ${amountOfCharacters} characters.`
    }
}
    

button.addEventListener("click", characterCounter);

inputText.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   button.click();
  }
})

