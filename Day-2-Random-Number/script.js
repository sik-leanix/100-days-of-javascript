const randomNumberContainer = document.querySelector (".count")
const generateRandomNumberButton = document.querySelector(".generateRandomNumberButton")

const setRandomNumberAsInnerHtml = (element) => {
    const minus = Math.floor(Math.random() * 3);  
    if (minus !== 0) {
        element.innerHTML = Math.floor(Math.random() * 300);
    } else {
        element.innerHTML = Math.floor(Math.random() * -300);
    }
}

generateRandomNumberButton.addEventListener("click", () => setRandomNumberAsInnerHtml(randomNumberContainer))

/**
 * Refactoring steps:
 * 1. Extract anonymous function into named one for better readability
 * 2. Make new function pure by passing in the element to modify as a parameter
 * 3. Use !== over != to have type safety
 * 4. Change from let to const. Always use const first and only switch to let if necessary
 * 5. Remove unused CSS and use meaningful CSS class names
 */