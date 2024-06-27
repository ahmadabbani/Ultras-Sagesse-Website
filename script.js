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

//Sliders
$(document).ready(function () {
  var $slider = $(".slider");
  $slider.slick({
    autoplay: true,
    pauseOnHover: false,
    autoplaySpeed: 3000,
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
    slidesToShow: 4,
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
          slidesToShow: 4,
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
        breakpoint: 275,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});
