// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Remove any Live Server code that might be displayed
  const bodyText = document.body.textContent;
  if (bodyText.includes("// <![CDATA[")) {
    // Find and remove any script tags that contain Live Server code
    const scripts = document.querySelectorAll("script");
    scripts.forEach((script) => {
      if (
        script.textContent &&
        script.textContent.includes("Live reload enabled")
      ) {
        script.remove();
      }
    });

    // Clean up any text nodes that might contain the code
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    let node;
    while ((node = walker.nextNode())) {
      if (node.textContent.includes("// <![CDATA[")) {
        node.remove();
      }
    }
  }

  // Force all elements to be visible immediately
  const allElements = document.querySelectorAll("*");
  allElements.forEach((element) => {
    element.style.opacity = "1";
    element.style.visibility = "visible";
    element.style.display = element.style.display || "block";
  });

  // Force all sections to be visible
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.style.opacity = "1";
    section.style.visibility = "visible";
    section.style.display = "block";
  });

  // Force all content areas to be visible
  const contentAreas = document.querySelectorAll(
    ".hero-content, .hero-text, .hero-countdown, .schedule-grid, .map-content, .social-grid, .register-content, .news-grid, .fifa-content, .about-content"
  );
  contentAreas.forEach((area) => {
    area.style.opacity = "1";
    area.style.visibility = "visible";
    area.style.display = "block";
  });

  // Initialize all functionality
  initNavigation();
  initSmoothScrolling();
  initScrollAnimations();
  initCountdownTimer();
  initFormHandling();
  initCookieNotice();
  initNewsletterForm();
  initParticleEffects();
});

// Navigation functionality
function initNavigation() {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navbar = document.querySelector(".navbar");

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");

      // Animate hamburger menu
      const bars = navToggle.querySelectorAll(".bar");
      bars.forEach((bar, index) => {
        if (navMenu.classList.contains("active")) {
          if (index === 0)
            bar.style.transform = "rotate(45deg) translate(5px, 5px)";
          if (index === 1) bar.style.opacity = "0";
          if (index === 2)
            bar.style.transform = "rotate(-45deg) translate(7px, -6px)";
        } else {
          bar.style.transform = "none";
          bar.style.opacity = "1";
        }
      });
    });
  }

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        const bars = navToggle.querySelectorAll(".bar");
        bars.forEach((bar) => {
          bar.style.transform = "none";
          bar.style.opacity = "1";
        });
      }
    });
  });

  // Navbar background on scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(0, 0, 0, 0.98)";
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)";
    } else {
      navbar.style.background = "rgba(0, 0, 0, 0.9)";
      navbar.style.boxShadow = "none";
    }
  });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".section-header, .match-card, .map-item, .social-item, .register-option, .news-card, .fifa-link"
  );
  animateElements.forEach((el) => {
    el.classList.add("loaded");
    observer.observe(el);
  });

  // Trigger animations on scroll
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".hero-particles");

    parallaxElements.forEach((element) => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// Countdown timer
function initCountdownTimer() {
  // Set the date for the World Cup (June 15, 2026)
  const countdownDate = new Date("June 15, 2026 00:00:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update DOM elements
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (daysElement) daysElement.textContent = days.toString().padStart(2, "0");
    if (hoursElement)
      hoursElement.textContent = hours.toString().padStart(2, "0");
    if (minutesElement)
      minutesElement.textContent = minutes.toString().padStart(2, "0");
    if (secondsElement)
      secondsElement.textContent = seconds.toString().padStart(2, "0");

    // Add pulse animation to seconds
    if (secondsElement) {
      secondsElement.style.transform = "scale(1.1)";
      setTimeout(() => {
        secondsElement.style.transform = "scale(1)";
      }, 100);
    }

    if (distance < 0) {
      clearInterval(countdownInterval);
      if (daysElement) daysElement.textContent = "00";
      if (hoursElement) hoursElement.textContent = "00";
      if (minutesElement) minutesElement.textContent = "00";
      if (secondsElement) secondsElement.textContent = "00";
    }
  }

  // Update countdown immediately and then every second
  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);
}

// Form handling
function initFormHandling() {
  const registerForm = document.querySelector(".register-form");

  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const message = this.querySelector("textarea").value;
      const selectedInterest = document.querySelector(
        'input[name="interest"]:checked'
      );

      // Simple validation
      if (!name || !email || !message) {
        showNotification("Please fill in all required fields.", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showNotification("Please enter a valid email address.", "error");
        return;
      }

      if (!selectedInterest) {
        showNotification("Please select an interest category.", "error");
        return;
      }

      // Simulate form submission with loading state
      const submitBtn = this.querySelector(".btn-submit");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      setTimeout(() => {
        // Show success message
        const successMessage = document.getElementById("success-message");
        successMessage.classList.add("show");

        // Hide success message after 3 seconds
        setTimeout(() => {
          successMessage.classList.remove("show");
        }, 3000);

        // Reset form
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }

  // Add radio button selection styling
  const radioButtons = document.querySelectorAll('input[name="interest"]');
  radioButtons.forEach((radio) => {
    radio.addEventListener("change", function () {
      // Remove active class from all options
      document.querySelectorAll(".register-option").forEach((option) => {
        option.style.background = "rgba(255, 255, 255, 0.05)";
        option.style.borderColor = "rgba(255, 255, 255, 0.1)";
      });

      // Add active class to selected option
      const selectedOption = this.closest(".register-option");
      if (selectedOption) {
        selectedOption.style.background = "rgba(0, 212, 255, 0.2)";
        selectedOption.style.borderColor = "rgba(0, 212, 255, 0.5)";
      }
    });
  });
}

// Cookie notice functionality
function initCookieNotice() {
  const cookieNotice = document.getElementById("cookie-notice");

  // Check if user has already accepted cookies
  if (!localStorage.getItem("cookiesAccepted")) {
    cookieNotice.style.display = "block";
  } else {
    cookieNotice.style.display = "none";
  }
}

// Accept cookies function (called from HTML)
function acceptCookies() {
  localStorage.setItem("cookiesAccepted", "true");
  const cookieNotice = document.getElementById("cookie-notice");
  cookieNotice.style.display = "none";
}

// Newsletter form functionality
function initNewsletterForm() {
  const newsletterForm = document.querySelector(".newsletter-form");
  const newsletterSuccess = document.getElementById("newsletter-success");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = this.querySelector('input[type="email"]').value;

      if (!email || !isValidEmail(email)) {
        showNotification("Please enter a valid email address.", "error");
        return;
      }

      // Simulate newsletter subscription
      const subscribeBtn = this.querySelector(".btn-subscribe");
      const originalText = subscribeBtn.textContent;
      subscribeBtn.textContent = "Subscribing...";
      subscribeBtn.disabled = true;

      setTimeout(() => {
        // Show success message
        newsletterSuccess.classList.add("show");

        // Reset form
        this.reset();
        subscribeBtn.textContent = originalText;
        subscribeBtn.disabled = false;

        // Hide success message after 3 seconds
        setTimeout(() => {
          newsletterSuccess.classList.remove("show");
        }, 3000);
      }, 1500);
    });
  }
}

// Particle effects
function initParticleEffects() {
  const particleContainer = document.querySelector(".hero-particles");
  if (!particleContainer) return;

  // Create floating particles
  for (let i = 0; i < 15; i++) {
    createParticle(particleContainer);
  }

  // Add mouse interaction
  particleContainer.addEventListener("mousemove", (e) => {
    const particles = particleContainer.querySelectorAll(".particle");
    const rect = particleContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    particles.forEach((particle, index) => {
      const speed = (index + 1) * 0.05;
      particle.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });
}

function createParticle(container) {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.cssText = `
        position: absolute;
        width: 3px;
        height: 3px;
        background: rgba(0, 212, 255, 0.6);
        border-radius: 50%;
        pointer-events: none;
        animation: particleFloat ${
          Math.random() * 10 + 10
        }s ease-in-out infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
    `;

  container.appendChild(particle);

  // Remove particle after animation
  setTimeout(() => {
    if (particle.parentNode) {
      particle.remove();
      createParticle(container);
    }
  }, 15000);
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${
          type === "success"
            ? "linear-gradient(45deg, #28a745, #20c997)"
            : type === "error"
            ? "linear-gradient(45deg, #dc3545, #e74c3c)"
            : "linear-gradient(45deg, #00d4ff, #0099cc)"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      notification.remove();
    }, 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(400px)";
      setTimeout(() => {
        notification.remove();
      }, 300);
    }
  }, 5000);
}

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
