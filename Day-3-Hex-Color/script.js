const count = document.querySelector (".count")
const buttons = document.querySelector (".buttons")


buttons.addEventListener("click", (event) => {
    let color = Math.random().toString(16).substring(2, 8)
    count.innerHTML = `#${color}`;
    document.body.style.backgroundColor = `#${color}`
})

