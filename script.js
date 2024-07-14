//Header
function scrollHeader() {
  const header = document.getElementById("header");
  const logo = document.getElementById("logo");
  const nav = document.querySelector(".nav-links");
  //when the scroll is greater than 50 viewport
  if (this.scrollY >= 50) {
    header.classList.add("scroll-header");
    logo.classList.add("remove-logo");
    nav.classList.add("nav-position");
  } else {
    header.classList.remove("scroll-header");
    logo.classList.remove("remove-logo");
    nav.classList.remove("nav-position");
  }
}
window.addEventListener("scroll", scrollHeader);

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

//Active link
const navlink = document.querySelectorAll(".nav-link");
function activeLink() {
  navlink.forEach((a) => a.classList.remove("active-link"));
  this.classList.add("active-link");
}
navlink.forEach((a) => a.addEventListener("click", activeLink));

//audio
document
  .getElementById("play-icon")
  .addEventListener("click", function (event) {
    const audio = document.getElementById("song");
    const playIcon = this;

    if (audio.paused) {
      audio.play();
      playIcon.src = "images/pause.png";
    } else {
      audio.pause();
      playIcon.src = "images/play.png";
    }

    // Prevent the event from bubbling up to the container
    event.stopPropagation();
  });

document.getElementById("song").addEventListener("ended", function () {
  document.getElementById("play-icon").src = "images/play.png";
});

// Image modal functions
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

//Whatsapp message
function sendWhatsAppMessage(productName, productPrice, imageUrl) {
  const phoneNumber = "96176585971";
  const fullImageUrl = `${window.location.origin}/${imageUrl}`;
  const message = `I'm interested in buying ${productName} for ${productPrice}. ${fullImageUrl}`;
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappURL, "_blank");
}

//Sliders
$(document).ready(function () {
  var $slider = $(".slider");
  $slider.slick({
    autoplay: true,
    pauseOnHover: false,
    autoplaySpeed: 2000,
    fade: true,
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    centerMode: false,
  });
  $slider.on("afterChange", function () {
    $slider.slick("slickPlay");
  });

  $(".Principles-slider").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false,
    autoplaySpeed: 2000,
    dots: true,
    arrows: false,
    infinite: true,
    centerMode: false,
    speed: 500,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});
