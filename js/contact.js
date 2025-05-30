// Contact Page Specific JavaScript - Clean & Simple

document.addEventListener("DOMContentLoaded", function () {
  // Initialize form validation
  initFormValidation();

  // Initialize animations
  initAnimations();

  // Initialize smooth scrolling
  initSmoothScrolling();
});

// Enhanced Form Validation
function initFormValidation() {
  const form = document.querySelector(".contact-form");

  if (!form) return;

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm(form)) {
      showFormMessage(
        "Thank you! We'll get back to you within 24 hours.",
        "success"
      );
      form.reset();

      // Reset any error states
      form.querySelectorAll(".error").forEach((field) => {
        field.classList.remove("error");
      });
    } else {
      showFormMessage("Please fill in all required fields correctly.", "error");
    }
  });

  // Real-time validation
  const inputs = form.querySelectorAll("input, textarea, select");
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this);
    });

    input.addEventListener("input", function () {
      if (this.classList.contains("error")) {
        validateField(this);
      }
    });
  });
}

function validateForm(form) {
  const requiredFields = form.querySelectorAll("[required]");
  let isValid = true;

  requiredFields.forEach((field) => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  return isValid;
}

function validateField(field) {
  const value = field.value.trim();
  const isRequired = field.hasAttribute("required");
  let isValid = true;

  if (isRequired && !value) {
    isValid = false;
  } else if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid = emailRegex.test(value);
  } else if (field.type === "tel" && value) {
    const phoneRegex = /^[\d\s\-\(\)\+\.]{10,}$/;
    isValid = phoneRegex.test(value);
  }

  if (isValid) {
    field.classList.remove("error");
  } else {
    field.classList.add("error");
  }

  return isValid;
}

// Show form messages with better styling
function showFormMessage(message, type) {
  // Remove existing messages
  const existingMessage = document.querySelector(".form-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create new message
  const messageDiv = document.createElement("div");
  messageDiv.className = `form-message ${type}`;
  messageDiv.textContent = message;

  // Insert message after form
  const form = document.querySelector(".contact-form");
  if (form && form.parentNode) {
    form.parentNode.insertBefore(messageDiv, form.nextSibling);

    // Scroll to message
    messageDiv.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  // Remove message after 5 seconds
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.remove();
    }
  }, 5000);
}

// Improved scroll-triggered animations
function initAnimations() {
  const animateElements = document.querySelectorAll(".animate-on-scroll");

  if (!animateElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  animateElements.forEach((el) => {
    observer.observe(el);
  });
}

// Enhanced smooth scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href === "#") return;

      e.preventDefault();

      const targetElement = document.querySelector(href);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Account for header

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}
