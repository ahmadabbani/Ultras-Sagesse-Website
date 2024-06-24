// Toggle navigation menu for mobile view
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");

  burger.addEventListener("click", () => {
    // Toggle 'active' class on nav-links
    nav.classList.toggle("active");

    // Toggle 'toggle' class on burger to change icon
    burger.classList.toggle("toggle");
  });
});

function openImage(imageSrc) {
  var modal = document.getElementById("imageModal");
  var modalImg = document.getElementById("modalImage");

  modal.style.display = "flex";
  modalImg.src = imageSrc;
}

function closeImage() {
  var modal = document.getElementById("imageModal");
  modal.style.display = "none";
}
