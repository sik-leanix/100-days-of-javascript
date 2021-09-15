const button = document.querySelector(".btn");

const copyText = (event) => {
  const textToCopy = document.querySelector(".coupon");
  event.preventDefault();
  textToCopy.select();
  textToCopy.setSelectionRange(0, 999999);
  document.execCommand("copy");
  button.textContent = "Done!";
  button.style.background = "green";
  setTimeout(() => {
    button.textContent = "Copy";
    button.style.background = "#3399ff";
  }, 3000);
};

button.addEventListener("click", copyText);
