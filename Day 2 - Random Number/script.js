const count = document.querySelector (".count")
const buttons = document.querySelector (".buttons")



buttons.addEventListener("click", (event) => {
    let minus = Math.floor(Math.random() * 3);  
    if (minus != 0) {
        count.innerHTML = Math.floor(Math.random() * 100);
    } else {
        count.innerHTML = Math.floor(Math.random() * -100);
    }
})
