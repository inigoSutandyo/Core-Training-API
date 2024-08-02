const modal = document.getElementById("modal");

const showModal = () => {
    modal.className = "fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-10"
}

const hideModal = () => {
    modal.className = "fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-10 hidden"
}