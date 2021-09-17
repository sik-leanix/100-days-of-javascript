const bgColor = document.getElementById("main");

function setColor() {
  bgColor.classList.add("online");
}

window.addEventListener("load", (event) => {
  const statusDisplay = document.getElementById("status");
  const isOnline = navigator.onLine;
  statusDisplay.textContent = isOnline ? "Online" : "Offline";
  if (isOnline) {
    setColor()
  }
});

window.addEventListener("offline", (event) => {
  const statusDisplay = document.getElementById("status");
  statusDisplay.textContent = "Offline";
  bgColor.classList.remove("online");
});

window.addEventListener("online", (event) => {
  const statusDisplay = document.getElementById("status");
  statusDisplay.textContent = "Online";
  setColor();
});

