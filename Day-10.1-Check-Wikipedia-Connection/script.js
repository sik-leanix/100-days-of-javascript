const image = document.getElementById("image");
const statusDisplay = document.getElementById("status");
const bgColor = document.getElementById("main");

function setColor() {
    bgColor.classList.add("online");
    document.body.style.backgroundColor = "#3399ff"
}

async function isWikipediaImageAvailable() {
  try {
    const fetchResult = await fetch('https://upload.wikimedia.org/wikipedia/en/thumb/7/7d/Lenna_%28test_image%29.png/440px-Lenna_%28test_image%29.png?time=' + (new Date()).getTime());
    image.src = fetchResult.url;
    console.log(fetchResult);
    setColor();
    return fetchResult.status >= 200 && fetchResult.status < 300;
  } catch (error) {
    console.error(error);
    image.src = "./images/offline.png";
    bgColor.classList.remove("online");
    return false;
  }
}

const updateAvailability = async () => {
  if (await isWikipediaImageAvailable()) {
    statusDisplay.textContent = "Yes, we were able to fetch the image.";
    setColor();
  } else {
    statusDisplay.textContent = "Nope, Wikipedia was not able to serve the image.";
    bgColor.classList.remove("online");
    document.body.style.backgroundColor = "black"
  }
}
 
// Monitor the connection
  setInterval(async () => {
    await updateAvailability();
  }, 1000);
  
//   Check Connection When Page Loads
window.addEventListener("load", async () => {
   await updateAvailability();
});

/**
 * About try catch:
 * Try catch allows you to write code and ignore any errors that might occur in it. Or write special handling logic for these errors.
 * Example:
 * let foo;
 * console.log(foo[0]);
 * 
 * This code will throw the following error: "Error: Cannot read properties of undefined (reading '0')"
 * 
 * By putting it into a try catch block the error can be "swallowed":
 * try {
 *   let foo;
 *   console.log(foo[0]);
 * } catch (error) {
 *    if (error == "severe") {
 *      console.log("Something went wrong, sorry about that");
 *    }
 * }
 */

/**
 * About async functions: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 * 
 * The await keywork reacts to the "then" callback of the provided Promise and returns the value of it.
 * You can only use await inside of an "async" function. This is required so that users of your function know that they have to call it with an "await" keyword.
 * 
 * Example of await: const result = await resolveAfter2Seconds();
 * Is the same as: let result; resolveAfter2Seconds().then((promiseResult) => result = promiseResult);
 */