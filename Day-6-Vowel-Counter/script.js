const button = document.querySelector(".btn");


const vowelCounter = (inputElement, resultElement) => {
    const inputWord = inputElement.value;
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const amountOfVowels = inputWord.toLowerCase().split("").filter((character) => vowels.includes(character)).length;
    const coloredInputWord = document.createElement("span");
    coloredInputWord.textContent = inputWord;
    coloredInputWord.style.color = 'green'
    resultElement.textContent = '';
    if (amountOfVowels === 1) {
        resultElement.appendChild(coloredInputWord);
        resultElement.innerHTML += ` has one vowel.`
    } else {
        resultElement.appendChild(coloredInputWord)
        resultElement.innerHTML += ` has ${amountOfVowels} vowels.`
    }
}

button.addEventListener("click", () => vowelCounter(document.querySelector(".input-text"), document.querySelector(".result")));

inputText.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   vowelCounter(document.querySelector(".input-text"), document.querySelector(".result"))
  }
})

/**
 * Refactoring steps:
 * 1. In order to make the vowelCounter function more reuseable the elements such as 
 * the inputWord element and the result element should be passed in as parameters.
 */