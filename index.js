document.addEventListener("DOMContentLoaded", function () {
  // =======================================================
  // 0. GLOBAL HTML ELEMANLARI (TÜM SAYFALAR İÇİN GEREKLİ)
  // =======================================================
  const menuToggle = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");
  const contactForm = document.getElementById("contact-form");
  const nav = document.querySelector("nav");

  /* =======================================================
       1, 2, 4. Hamburger Menü İşlevleri (Tüm Sayfalar)
    ======================================================= */
  if (menuToggle && navLinks) {
    // 1. Hamburger İşlevi (Açma/Kapatma)
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      const icon = menuToggle.querySelector("i");
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    });

    // 2. Linklere Tıklayınca Kapatma İşlevi
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          const icon = menuToggle.querySelector("i");
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      });
    });

    // 4. BİR YERE TIKLAYINCA MENÜYÜ KAPATMA
    document.addEventListener("click", function (event) {
      const isClickInsideMenuToggle = menuToggle.contains(event.target);
      const isClickInsideNavLinks = navLinks.contains(event.target);
      if (
        navLinks.classList.contains("active") &&
        !isClickInsideMenuToggle &&
        !isClickInsideNavLinks
      ) {
        navLinks.classList.remove("active");

        // İkonu geri hamburger'e döndür
        const icon = menuToggle.querySelector("i");
        if (icon.classList.contains("fa-times")) {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      }
    });
  }

  /* =======================================================
       3. İletişim Formu İşlevi (Tüm Sayfalar)
    ======================================================= */
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Mesajınız gönderildi!");
      this.reset();
    });
  }

  /* =======================================================
       6. Yeni: Duman Efekti İşlevi (Sadece Power BI Sayfası)
    ======================================================= */
  const smokeContainer = document.querySelector(".smoke-container");

  if (smokeContainer) {
    for (let i = 0; i < 20; i++) {
      const smoke = document.createElement("div");
      smoke.classList.add("smoke");

      // Rastgele boyut (20px - 50px arası)
      let size = Math.floor(Math.random() * 30) + 20;
      smoke.style.width = `${size}px`;
      smoke.style.height = `${size}px`;

      // Rastgele yatay konum (%0 - %100)
      smoke.style.left = `${Math.random() * 100}%`;

      // Rastgele animasyon gecikmesi (0s - 6s)
      smoke.style.animationDelay = `${Math.random() * 6}s`;

      // Dumanları ekle
      smokeContainer.appendChild(smoke);
    }
  }

  /* =======================================================
       5. Veri Analizi Modal İşlevleri (Sadece Veri Analizi Sayfası)
    ======================================================= */
  const viewSalesTrendDetailsBtn = document.getElementById(
    "viewSalesTrendDetailsBtn"
  );

  if (viewSalesTrendDetailsBtn) {
    var modals = {
      salesTrend: document.getElementById("salesTrendModal"),
      customerSegmentation: document.getElementById(
        "customerSegmentationModal"
      ),
      duyguAnalizi: document.getElementById("duyguAnaliziModal"),
      recommendationSystem: document.getElementById(
        "recommendationSystemModal"
      ),
      abTest: document.getElementById("abTestModal"),
      timeSeries: document.getElementById("timeSeriesModal"),
    };

    var buttons = {
      salesTrend: viewSalesTrendDetailsBtn,
      customerSegmentation: document.getElementById(
        "viewCustomerSegmentationDetailsBtn"
      ),
      duyguAnalizi: document.getElementById("openDuyguAnaliziModalBtn"),
      recommendationSystem: document.getElementById(
        "viewRecommendationSystemDetailsBtn"
      ),
      abTest: document.getElementById("viewABTestDetailsBtn"),
      timeSeries: document.getElementById("viewTimeSeriesDetailsBtn"),
    };

    var closeButtons = {
      salesTrend: document.getElementById("closeSalesTrendModal"),
      customerSegmentation: document.getElementById(
        "closeCustomerSegmentationModal"
      ),
      duyguAnalizi: document.getElementById("closeDuyguAnaliziModal"),
      recommendationSystem: document.getElementById(
        "closeRecommendationSystemModal"
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

    // Modal açma fonksiyonu
    function openModal(modal, key) {
      if (navLinks && menuToggle && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        const icon = menuToggle.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      }
      if (navLinks) {
        navLinks.style.display = "none";
      }
      menuToggle.style.pointerEvents = "none";

      scrollPositions[key] = window.pageYOffset;
      modal.style.display = "block";
      fixNav();
    }

    // Modal kapatma fonksiyonu
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

    // Butonlara event listener ekleme
    for (const key in buttons) {
      if (buttons[key]) {
        buttons[key].onclick = () => openModal(modals[key], key);
      }
    }

    // Kapatma butonlarına event listener ekleme
    for (const key in closeButtons) {
      if (closeButtons[key]) {
        closeButtons[key].onclick = () => closeModal(modals[key], key);
      }
    }

    // Modal dışına tıklayınca kapatma işlemi
    window.onclick = function (event) {
      for (let key in modals) {
        if (event.target === modals[key]) {
          closeModal(modals[key], key);
        }
      }
    };
  }
  /* =======================================================
   7. Yeni: Sayfa Başına Dön İşlevi (Tüm Sayfalar)
======================================================= */

const scrollToTopBtn = document.getElementById("scrollToTopBtn");

if (scrollToTopBtn) {
    
    // Butonu ne zaman göstereceğini belirle
    window.addEventListener('scroll', function() {
        // Kullanıcı 400 piksel aşağı kaydıysa göster
        if (window.pageYOffset > 400) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    });

    // Butona tıklandığında sayfayı yukarı kaydır
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Yumuşak kaydırma
        });
    });
}
});
