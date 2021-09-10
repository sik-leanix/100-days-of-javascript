const button = document.querySelector(".btn");
const result = document.querySelector(".result");
let inputText = document.querySelector(".input-text");



const palindrome = () => {
    let inputWord = document.querySelector(".input-text").value;
    if (inputWord === "" || inputWord.length === 1) {
        result.style.color = "red";
        result.innerHTML = `You have to type in a word!`;
    } else if (inputWord.toLowerCase() === inputWord.toLowerCase().split("").reverse().join('')) {
        result.style.color = "green";
        result.innerHTML = `${inputWord} is a palindrome!`;
    } else {
        result.style.color = "red";
        result.innerHTML = `${inputWord} is a not palindrome!`;
    }
}

button.addEventListener("click", palindrome);

inputText.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   button.click();
  }
})

