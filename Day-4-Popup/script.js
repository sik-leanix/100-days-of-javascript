const modalWrapper = document.querySelector(".modalWrapper"),
      openModalButton = document.querySelector(".btn"),
      closeButton = document.querySelector(".close");


openModalButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);
modalWrapper.addEventListener("click", (event) => {
    // If the target is something else then the wrapper
    // then the user clicked inside the modal and we do not close it.
    if (event.target === modalWrapper) {
        closeModal();
    }
});


function openModal(e) {
    e.preventDefault();
    modalWrapper.style.display = "block";
}


function closeModal() {
    modalWrapper.style.display = "none";
}