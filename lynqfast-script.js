document.addEventListener("DOMContentLoaded", () => {
  // Navigation Toggle
  const navToggle = document.getElementById("lf-nav-toggle");
  const navMenu = document.getElementById("lf-nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("is-open");
    });
  }

  // Animated Counter for Hero Metric
  const metricEl = document.querySelector(".lf-metric__value");
  if (metricEl) {
    const target = parseInt(metricEl.dataset.target || "0", 10);
    let current = 0;
    const duration = 1200;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      current = Math.floor(progress * target);
      metricEl.textContent = current.toString();
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  // Animated Counters for Stats
  const animateCounter = (element) => {
    const target = parseInt(element.dataset.count || "0", 10);
    const duration = 2000;
    const start = performance.now();
    const isDecimal = element.dataset.count.includes(".");

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const current = progress * target;
      
      if (isDecimal) {
        element.textContent = current.toFixed(1);
      } else {
        element.textContent = Math.floor(current).toLocaleString();
      }
      
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  // Intersection Observer for Scroll Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        
        // Trigger stat counters
        if (entry.target.classList.contains("lf-stat-item")) {
          const counter = entry.target.querySelector(".lf-stat-number");
          if (counter && counter.dataset.count) {
            animateCounter(counter);
          }
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = document.querySelectorAll([
    '.animate-fade-in',
    '.animate-fade-in-up',
    '.animate-slide-in-left',
    '.animate-slide-in-right',
    '.animate-scale-in',
    '.lf-stat-item'
  ].join(','));

  animatedElements.forEach(el => {
    el.style.opacity = "0";
    observer.observe(el);
  });

  // Parallax Effect
  const parallaxBanner = document.getElementById("parallax-banner");
  if (parallaxBanner) {
    const parallaxBg = parallaxBanner.querySelector(".lf-parallax-bg");
    
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const bannerTop = parallaxBanner.offsetTop;
      const bannerHeight = parallaxBanner.offsetHeight;
      
      if (scrolled > bannerTop - window.innerHeight && scrolled < bannerTop + bannerHeight) {
        const offset = (scrolled - bannerTop) * 0.5;
        if (parallaxBg) {
          parallaxBg.style.transform = `translateY(${offset}px)`;
        }
      }
    });
  }

  // Image Hover Effects
  const imageContainers = document.querySelectorAll(".lf-image-card");
  imageContainers.forEach(container => {
    container.addEventListener("mouseenter", () => {
      container.style.zIndex = "10";
    });
    
    container.addEventListener("mouseleave", () => {
      container.style.zIndex = "1";
    });
  });

  // Testimonials Carousel
  const testimonials = document.querySelectorAll(".lf-story");
  const dots = document.querySelectorAll("#lf-testimonial-dots button");

  if (testimonials.length && dots.length) {
    let activeIndex = 0;

    const setActive = (index) => {
      testimonials[activeIndex].classList.remove("is-active");
      dots[activeIndex].classList.remove("is-active");
      activeIndex = index;
      testimonials[activeIndex].classList.add("is-active");
      dots[activeIndex].classList.add("is-active");
    };

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => setActive(index));
    });

    setInterval(() => {
      const next = (activeIndex + 1) % testimonials.length;
      setActive(next);
    }, 7000);
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".lf-faq__item");
  faqItems.forEach((item) => {
    const button = item.querySelector(".lf-faq__question");
    if (!button) return;

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      faqItems.forEach((i) => i.classList.remove("is-open"));
      if (!isOpen) item.classList.add("is-open");
    });
  });

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      }
    });
  });

  // Add floating animation to specific elements
  const floatingElements = document.querySelectorAll(".lf-hero__orb");
  floatingElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.5}s`;
  });

  // Card hover tilt effect
  const cards = document.querySelectorAll(".lf-card, .lf-plan, .lf-team-card");
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;
      
      const tiltX = deltaY * 5;
      const tiltY = deltaX * -5;
      
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
    });
    
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  // Form Animation
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      const originalText = button.textContent;
      
      button.textContent = "Sending...";
      button.disabled = true;
      
      setTimeout(() => {
        button.textContent = "✓ Sent!";
        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
          form.reset();
        }, 2000);
      }, 1500);
    });
  }

  // Lazy Loading for Images
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
          }
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach(img => {
      imageObserver.observe(img);
    });
  }

  // Add scroll progress indicator
  const createScrollProgress = () => {
    const progressBar = document.createElement("div");
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #38bdf8, #a855f7);
      z-index: 9999;
      transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener("scroll", () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.pageYOffset / windowHeight) * 100;
      progressBar.style.width = `${scrolled}%`;
    });
  };

  createScrollProgress();

  console.log("🚀 LYNQFAST enhanced with animations and interactions!");
});
