const button = document.querySelector(".btn");
const result = document.querySelector(".result");
const inputText = document.querySelector(".input-text");


const vowelCounter = () => {
    const inputWord = document.querySelector(".input-text").value;
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const amountOfVowels = inputWord.toLowerCase().split("").filter((character) => vowels.includes(character)).length;
    const coloredInputWord = document.createElement("span");
    coloredInputWord.textContent = inputWord;
    coloredInputWord.style.color = 'green'
    result.textContent = '';
    if (amountOfVowels === 1) {
        result.appendChild(coloredInputWord);
        result.innerHTML += ` has one vowel.`
    } else {
        result.appendChild(coloredInputWord)
        result.innerHTML += ` has ${amountOfVowels} vowels.`
    }
}

button.addEventListener("click", vowelCounter);

inputText.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   vowelCounter()
  }
})

