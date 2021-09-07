const count = document.querySelector (".count")
const buttons = document.querySelector (".buttons")

buttons.addEventListener("click", (event) => {
    if (event.target.classList.contains("add")) {
    count.innerHTML++;
    setColor();
    } else if (event.target.classList.contains("subtract")) {
        count.innerHTML--;
        setColor();
    } else if (event.target.classList.contains("reset")) {
        count.innerHTML = 0;
        setColor();
    }
})

function setColor() {
    if (count.innerHTML < 0) {
        count.style.color = "orangered";
    } else if (count.innerHTML > 0){
        count.style.color = "green"
    } else {
        count.style.color = "white"
    }
}