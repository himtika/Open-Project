(function ($) {
  "use strict";

  function handlePreloader() {
    if ($(".preloader").length) {
      $("body").addClass("page-loaded");
      $(".preloader").fadeOut(300, function () {


        setTimeout(() => {
          window.addEventListener("scroll", handleScroll);
          handleScroll(); // initial trigger
        }, 2000);
      });
    }
  }

  function handleScroll() {
    const scrollY = window.scrollY;

    const cloudLeft = document.querySelector(".cloud-left img");
    const cloudRight = document.querySelector(".cloud-right img");
    const heroText = document.querySelector(".hero-text");
    const heroTitle = document.querySelector(".hero-text h1");
    const heroButton = document.querySelector(".hero-text button");
    const heroCity = document.querySelector(".hero-city img");
    const gtkSection = document.querySelector(".gtk");
    const gtkText = document.querySelector(".gtk-text h3");
    const gtkH1 = document.querySelector(".gtk-text h1");

     // --- PARALLAX CLOUD ---
  if (cloudLeft && cloudRight) {
    cloudLeft.style.transform = `translateX(${-scrollY * 0.3}px) translateY(${scrollY * 0.2}px)`;
    cloudRight.style.transform = `translateX(${scrollY * 0.3}px) translateY(${scrollY * 0.2}px)`;
  }

  // --- PARALLAX HERO TITLE ---
  if (heroTitle) {
    heroTitle.style.transform = `translateY(${scrollY * 0.3}px)`;
  }

  // --- PARALLAX HERO CITY ---
  if (heroCity) {
    heroCity.style.transform = `translateY(${scrollY * 0.15}px)`;
  }

  // --- PARALLAX CONTAINER (for scale shrink effect) ---
  if (heroText) {
    const translateY = scrollY * 0.2;
    let scale = 1;

    if (scrollY > 50) {
      scale = 1 - ((scrollY - 50) / 250) * 0.2;
      scale = Math.max(scale, 0.85);
    }

    heroText.style.transform = `translateY(${translateY}px) scale(${scale})`;
  }

  // --- BUTTON FADE OUT on scroll ---
  if (heroButton) {
    if (scrollY > 20) {
      heroButton.style.opacity = "0";
      heroButton.style.pointerEvents = "none";
    } else {
      heroButton.style.opacity = "1";
      heroButton.style.pointerEvents = "auto";
    }
  }


    // --- GTK SECTION FADE ---
    if (gtkSection && gtkText && gtkH1) {
      const windowHeight = window.innerHeight;
      const gtkTop = gtkSection.getBoundingClientRect().top;
      const gtkHeight = gtkSection.offsetHeight;

      if (gtkTop + gtkHeight * 0.5 <= windowHeight) {
        gtkText.style.opacity = "1";
        gtkText.style.transform = "translateY(0)";
        gtkH1.style.transform = "translateY(0)";
      } else {
        gtkText.style.opacity = "0";
        gtkText.style.transform = "translateY(20px)";
        gtkH1.style.transform = "translateY(100px)";
      }
    }
  }

  $(window).on("load", function () {
    handlePreloader();
  });

  document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const menu = document.querySelector(".menu");

    if (hamburger && menu) {
      hamburger.addEventListener("click", function () {
        menu.classList.toggle("show-menu");
      });
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // trigger sekali saat load untuk posisi awal
  });

})(window.jQuery);

/* ================= Section FAQ ================= */
document.querySelectorAll("details").forEach((detail) => {
    let content = detail.querySelector(".faq-answer");
  
    detail.addEventListener("toggle", function () {
        if (detail.open) {
            content.style.height = content.scrollHeight + "px";
            content.style.opacity = "1";
            content.style.transform = "translateY(0)";
  
            content.addEventListener("transitionend", function resetHeight() {
                content.style.height = "auto";
                content.removeEventListener("transitionend", resetHeight);
            });
        } else {
            content.style.height = content.scrollHeight + "px";
            requestAnimationFrame(() => {
                content.style.height = "0px";
                content.style.opacity = "0";
                content.style.transform = "translateY(-5px)";
            });
        }
    });
  
    content.addEventListener("transitionend", function () {
        if (!detail.open) {
            content.style.height = "";
        }
    });
  });
  
  