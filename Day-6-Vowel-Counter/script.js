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

const button = document.querySelector(".btn");
const inputText = document.querySelector(".input-text");

const handleVowelCountEvent = () => vowelCounter(inputText, document.querySelector(".result"));

button.addEventListener("click", handleVowelCountEvent);

inputText.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   handleVowelCountEvent();
  }
})

/**
 * Refactoring steps:
 * 1. In order to make the vowelCounter function more reuseable the elements such as 
 * the inputWord element and the result element should be passed in as parameters.
 * 2. The DRY principle stands for "Dont repeat yourself. Right now we repeat the code to pass the correct elements into the vowelCounter two times.
 * Let's make that into just one time.
 */