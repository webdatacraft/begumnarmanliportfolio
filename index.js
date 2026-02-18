document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");
  const contactForm = document.getElementById("contact-form");
  const nav = document.querySelector("nav");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
        }
      });
    });

    document.addEventListener("click", function (event) {
      const isClickInsideMenuToggle = menuToggle.contains(event.target);
      const isClickInsideNavLinks = navLinks.contains(event.target);
      if (
        navLinks.classList.contains("active") &&
        !isClickInsideMenuToggle &&
        !isClickInsideNavLinks
      ) {
        navLinks.classList.remove("active");
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Mesajınız gönderildi!");
      this.reset();
    });
  }

  const smokeContainer = document.querySelector(".smoke-container");

  if (smokeContainer) {
    for (let i = 0; i < 20; i++) {
      const smoke = document.createElement("div");
      smoke.classList.add("smoke");

      let size = Math.floor(Math.random() * 30) + 20;
      smoke.style.width = `${size}px`;
      smoke.style.height = `${size}px`;
      smoke.style.left = `${Math.random() * 100}%`;
      smoke.style.animationDelay = `${Math.random() * 6}s`;
      smokeContainer.appendChild(smoke);
    }
  }

  const viewSalesTrendDetailsBtn = document.getElementById(
    "viewSalesTrendDetailsBtn",
  );

  if (viewSalesTrendDetailsBtn) {
    var modals = {
      salesTrend: document.getElementById("salesTrendModal"),
      customerSegmentation: document.getElementById(
        "customerSegmentationModal",
      ),
      duyguAnalizi: document.getElementById("duyguAnaliziModal"),
      recommendationSystem: document.getElementById(
        "recommendationSystemModal",
      ),
      abTest: document.getElementById("abTestModal"),
      timeSeries: document.getElementById("timeSeriesModal"),
    };

    var buttons = {
      salesTrend: viewSalesTrendDetailsBtn,
      customerSegmentation: document.getElementById(
        "viewCustomerSegmentationDetailsBtn",
      ),
      duyguAnalizi: document.getElementById("openDuyguAnaliziModalBtn"),
      recommendationSystem: document.getElementById(
        "viewRecommendationSystemDetailsBtn",
      ),
      abTest: document.getElementById("viewABTestDetailsBtn"),
      timeSeries: document.getElementById("viewTimeSeriesDetailsBtn"),
    };

    var closeButtons = {
      salesTrend: document.getElementById("closeSalesTrendModal"),
      customerSegmentation: document.getElementById(
        "closeCustomerSegmentationModal",
      ),
      duyguAnalizi: document.getElementById("closeDuyguAnaliziModal"),
      recommendationSystem: document.getElementById(
        "closeRecommendationSystemModal",
      ),
      abTest: document.getElementById("closeABTestModal"),
      timeSeries: document.getElementById("closeTimeSeriesModal"),
    };

    var scrollPositions = {
      salesTrend: 0,
      customerSegmentation: 0,
      duyguAnalizi: 0,
      recommendationSystem: 0,
      abTest: 0,
      timeSeries: 0,
    };

    function openModal(modal, key) {
      if (navLinks && menuToggle && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
      }
      if (navLinks) {
        navLinks.style.display = "none";
      }
      menuToggle.style.pointerEvents = "none";

      scrollPositions[key] = window.pageYOffset;
      modal.style.display = "block";
      fixNav();
    }

    function closeModal(modal, key) {
      menuToggle.style.pointerEvents = "auto";
      if (navLinks) {
        navLinks.style.display = "";
      }

      modal.style.display = "none";
      resetNav();
      window.scrollTo(0, scrollPositions[key]);
    }
    function fixNav() {
      if (nav) {
        nav.style.position = "fixed";
        nav.style.top = "0";
        nav.style.left = "0";
        nav.style.width = "100%";
      }
    }

    function resetNav() {
      if (nav) {
        nav.style.position = "absolute";
      }
    }

    for (const key in buttons) {
      if (buttons[key]) {
        buttons[key].onclick = () => openModal(modals[key], key);
      }
    }

    for (const key in closeButtons) {
      if (closeButtons[key]) {
        closeButtons[key].onclick = () => closeModal(modals[key], key);
      }
    }

    window.onclick = function (event) {
      for (let key in modals) {
        if (event.target === modals[key]) {
          closeModal(modals[key], key);
        }
      }
    };
  }

  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  if (scrollToTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 400) {
        scrollToTopBtn.style.display = "block";
      } else {
        scrollToTopBtn.style.display = "none";
      }
    });

    scrollToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
