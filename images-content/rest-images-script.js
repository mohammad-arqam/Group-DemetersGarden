function openModal(image) {
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("modalImage");
    const caption = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = image.src;
    caption.innerHTML = image.alt;
}

function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}