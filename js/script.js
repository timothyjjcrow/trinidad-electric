// Trinidad Electric - Modern JavaScript for Enhanced User Experience

document.addEventListener("DOMContentLoaded", function () {
  // ============================================================================
  // MOBILE NAVIGATION FUNCTIONALITY
  // ============================================================================
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileNav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".main-nav a");

  if (mobileMenuBtn && mobileNav) {
    // Toggle mobile menu
    mobileMenuBtn.addEventListener("click", function () {
      this.classList.toggle("active");
      mobileNav.classList.toggle("active");

      // Toggle body scroll when menu is open
      if (mobileNav.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });

    // Close menu when clicking on nav links
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenuBtn.classList.remove("active");
        mobileNav.classList.remove("active");
        document.body.style.overflow = "";
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.classList.remove("active");
        mobileNav.classList.remove("active");
        document.body.style.overflow = "";
      }
    });

    // Close menu on window resize if screen becomes larger
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        mobileMenuBtn.classList.remove("active");
        mobileNav.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // ============================================================================
  // PARALLAX SCROLLING EFFECT
  // ============================================================================
  const heroBg = document.querySelector(".hero-bg");

  if (heroBg && window.innerWidth > 768) {
    // Only enable parallax on desktop
    let ticking = false;

    function updateParallax() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.3; // Reduced from -0.5 to -0.3 for less movement
      const maxScroll = window.innerHeight; // Limit parallax to viewport height

      // Only apply parallax within reasonable scroll bounds
      if (scrolled <= maxScroll) {
        heroBg.style.transform = `translateY(${rate}px)`;
      }

      ticking = false;
    }

    function requestParallaxUpdate() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    // Add scroll listener for parallax effect
    window.addEventListener("scroll", requestParallaxUpdate);

    // Initial call
    updateParallax();

    // Disable parallax on window resize if screen becomes smaller
    window.addEventListener("resize", function () {
      if (window.innerWidth <= 768) {
        heroBg.style.transform = "none";
        window.removeEventListener("scroll", requestParallaxUpdate);
      }
    });
  }

  // ============================================================================
  // SMOOTH SCROLLING FOR ANCHOR LINKS
  // ============================================================================
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // ============================================================================
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // ============================================================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".service-card, .trust-item, .team-member, .faq-item"
  );
  animateElements.forEach((el) => {
    observer.observe(el);
  });

  // ============================================================================
  // CONTACT FORM ENHANCEMENT
  // ============================================================================
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    // Form validation
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const formObject = {};
      for (let [key, value] of formData.entries()) {
        formObject[key] = value;
      }

      // Basic validation
      if (validateForm(formObject)) {
        showFormSuccess();
        // Here you would typically send the data to your server
        console.log("Form submitted:", formObject);
      }
    });

    // Real-time validation
    const inputs = contactForm.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateField(this);
      });
    });
  }

  function validateForm(data) {
    let isValid = true;
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "serviceType",
      "description",
    ];

    requiredFields.forEach((field) => {
      if (!data[field] || data[field].trim() === "") {
        showFieldError(field, "This field is required");
        isValid = false;
      }
    });

    // Email validation
    if (data.email && !isValidEmail(data.email)) {
      showFieldError("email", "Please enter a valid email address");
      isValid = false;
    }

    // Phone validation
    if (data.phone && !isValidPhone(data.phone)) {
      showFieldError("phone", "Please enter a valid phone number");
      isValid = false;
    }

    return isValid;
  }

  function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;

    // Clear previous error
    clearFieldError(fieldName);

    if (field.required && !value) {
      showFieldError(fieldName, "This field is required");
      return false;
    }

    if (fieldName === "email" && value && !isValidEmail(value)) {
      showFieldError(fieldName, "Please enter a valid email address");
      return false;
    }

    if (fieldName === "phone" && value && !isValidPhone(value)) {
      showFieldError(fieldName, "Please enter a valid phone number");
      return false;
    }

    return true;
  }

  function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
      field.classList.add("error");

      // Remove existing error message
      const existingError = field.parentNode.querySelector(".error-message");
      if (existingError) {
        existingError.remove();
      }

      // Add new error message
      const errorDiv = document.createElement("div");
      errorDiv.className = "error-message";
      errorDiv.textContent = message;
      field.parentNode.appendChild(errorDiv);
    }
  }

  function clearFieldError(fieldName) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
      field.classList.remove("error");
      const errorMessage = field.parentNode.querySelector(".error-message");
      if (errorMessage) {
        errorMessage.remove();
      }
    }
  }

  function showFormSuccess() {
    const form = document.querySelector(".contact-form");
    if (form) {
      const successDiv = document.createElement("div");
      successDiv.className = "form-success";
      successDiv.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Thank You!</h3>
                <p>Your quote request has been submitted successfully. We'll get back to you within 24 hours.</p>
                <p>For emergencies, please call <a href="tel:(707) 834-2156">(707) 834-2156</a> immediately.</p>
            `;

      form.style.display = "none";
      form.parentNode.appendChild(successDiv);
    }
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, "");
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
  }

  // ============================================================================
  // EMERGENCY CALL TRACKING
  // ============================================================================
  const emergencyLinks = document.querySelectorAll('a[href^="tel:"]');
  emergencyLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Track emergency call clicks for analytics
      console.log("Emergency call initiated");

      // You could send this to Google Analytics or other tracking
      if (typeof gtag !== "undefined") {
        gtag("event", "phone_call", {
          event_category: "engagement",
          event_label: "emergency_call",
        });
      }
    });
  });

  // ============================================================================
  // MOBILE MENU TOGGLE (if needed for responsive design)
  // ============================================================================
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener("click", function () {
      mainNav.classList.toggle("mobile-active");
      this.classList.toggle("active");
    });
  }

  // ============================================================================
  // SCROLL TO TOP BUTTON
  // ============================================================================
  const scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.className = "scroll-to-top";
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollToTopBtn.setAttribute("aria-label", "Scroll to top");
  document.body.appendChild(scrollToTopBtn);

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  });

  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // ============================================================================
  // LAZY LOADING FOR IMAGES (when real images are added)
  // ============================================================================
  if ("IntersectionObserver" in window) {
    const lazyImages = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // ============================================================================
  // ACCESSIBILITY ENHANCEMENTS
  // ============================================================================

  // Skip to main content
  const skipLink = document.createElement("a");
  skipLink.href = "#main";
  skipLink.className = "skip-link";
  skipLink.textContent = "Skip to main content";
  document.body.insertBefore(skipLink, document.body.firstChild);

  // Keyboard navigation for cards
  const interactiveCards = document.querySelectorAll(
    ".service-card, .team-member"
  );
  interactiveCards.forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        const link = this.querySelector("a");
        if (link) {
          link.click();
        }
      }
    });
  });

  // ============================================================================
  // PERFORMANCE MONITORING
  // ============================================================================

  // Monitor page load time
  window.addEventListener("load", function () {
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);

    // You could send this to analytics
    if (typeof gtag !== "undefined") {
      gtag("event", "timing_complete", {
        name: "page_load",
        value: Math.round(loadTime),
      });
    }
  });

  // ============================================================================
  // ANIMATIONS AND VISUAL EFFECTS
  // ============================================================================

  // Add entrance animations CSS class when elements come into view
  const fadeInElements = document.querySelectorAll(
    ".service-card, .trust-item, .contact-method"
  );

  const fadeInObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeInElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    fadeInObserver.observe(el);
  });

  console.log("Trinidad Electric website JavaScript loaded successfully");

  // Animate on Scroll Utility
  // Reveals elements with .animate-on-scroll when they enter the viewport
  (function () {
    document.addEventListener("DOMContentLoaded", function () {
      const animatedElements = document.querySelectorAll(".animate-on-scroll");
      if (animatedElements.length === 0) return;
      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target); // Animate only once
            }
          });
        },
        { threshold: 0.15 }
      );
      animatedElements.forEach((el) => observer.observe(el));
    });
  })();
});
