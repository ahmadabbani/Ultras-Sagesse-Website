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
const sectionPadding = 80; // 4rem in pixels (assuming 1rem = 16px)

function activeLink(e) {
  e.preventDefault(); // Prevent default anchor behavior

  // Remove active-link class from all links and add to the clicked link
  navlink.forEach((a) => a.classList.remove("active-link"));
  this.classList.add("active-link");

  // Get the target section
  const targetId = this.getAttribute("href");
  const targetSection = document.querySelector(targetId);

  // Calculate the scroll position considering the section padding
  const scrollPosition = targetSection.offsetTop - sectionPadding;

  // Scroll smoothly to the target position
  window.scrollTo({
    top: scrollPosition,
    behavior: "smooth",
  });
}

navlink.forEach((a) => a.addEventListener("click", activeLink));

const sections = document.querySelectorAll("section"); // Assuming each section has a <section> tag
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const navLink = document.querySelector(
        `.nav-link[href="#${entry.target.id}"]`
      );

      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active-link"));
        if (navLink) {
          navLink.classList.add("active-link");
        }
      }
    });
  },
  {
    threshold: 0.5, // Adjust as needed to determine when to activate the link (50% in view)
  }
);

sections.forEach((section) => observer.observe(section));

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

// Update the onclick attribute for modal based on screen size
function updateImageOnClick() {
  var imgElements = document.querySelectorAll(".grid-item img");
  var imageMappings = [
    { desktop: "images/image1.jpeg", mobile: "images/image1-mobile.jpeg" },
    { desktop: "images/image2.jpg", mobile: "images/image2-mobile.jpg" },
    { desktop: "images/image3.jpeg", mobile: "images/image3-mobile.jpeg" },
    { desktop: "images/image4.jpg", mobile: "images/image4-mobile.jpg" },
    { desktop: "images/image5.jpg", mobile: "images/image5-mobile.jpg" },
    { desktop: "images/image62.png", mobile: "images/image6-mobile.png" },
  ];

  imgElements.forEach((imgElement, index) => {
    var desktopImageUrl = imageMappings[index].desktop;
    var mobileImageUrl = imageMappings[index].mobile;

    if (window.innerWidth <= 768) {
      imgElement.setAttribute("onclick", `openImage('${mobileImageUrl}')`);
    } else {
      imgElement.setAttribute("onclick", `openImage('${desktopImageUrl}')`);
    }
  });
}

// Update the image onclick attribute on page load and on window resize
window.addEventListener("load", updateImageOnClick);
window.addEventListener("resize", updateImageOnClick);

//Whatsapp message
function sendWhatsAppMessage(productName, productPrice, imageUrl) {
  const phoneNumber = "96171776900";
  const fullImageUrl = `https://ultras-sagesse.com/${imageUrl}`;
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
