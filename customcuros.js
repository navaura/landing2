document.addEventListener('DOMContentLoaded', () => {
  // Auto-inject custom cursor element into body
  if (!document.getElementById('cursor')) {
    const cursorEl = document.createElement('div');
    cursorEl.id = 'cursor';
    cursorEl.className = 'custom-cursor';
    document.body.appendChild(cursorEl);
  }

  // Add CSS dynamically if needed (optional fallback)
  if (!document.querySelector('style[data-custom-cursor]')) {
    const style = document.createElement('style');
    style.setAttribute('data-custom-cursor', 'true');
    style.textContent = `
      .custom-cursor {
        position: fixed;
        top: 0;
        left: 0;
        width: 20px;
        height: 20px;
        background-color: white;
        border-radius: 50%;
        pointer-events: none;
        mix-blend-mode: difference;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: transform 0.2s ease, opacity 0.2s ease;
      }
    `;
    document.head.appendChild(style);
  }

  const cursor = document.getElementById('cursor');
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    const speed = 0.15;
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;

    cursor.style.left = `${cursorX - 10}px`;
    cursor.style.top = `${cursorY - 10}px`;

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Smooth scroll with offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = 80;
        const targetPosition = target.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Navigation scroll effects
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      nav.style.background = 'rgba(10, 10, 10, 0.95)';
      nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    } else {
      nav.style.background = 'rgba(10, 10, 10, 0.8)';
      nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.08)';
    }
  }, { passive: true });

  // Slide-up animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  const slideUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.slide-up').forEach(el => {
    el.style.animationPlayState = 'paused';
    slideUpObserver.observe(el);
  });

  // Button hover scaling
  document.querySelectorAll('button, .hover-lift').forEach(button => {
    button.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(1.5)';
      cursor.style.opacity = '0.8';
    });

    button.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.opacity = '1';
    });
  });

  // Animate loading dots
  const loadingDots = document.querySelectorAll('.loading-dot');
  loadingDots.forEach((dot, index) => {
    dot.style.animationDelay = `${index * 0.5}s`;
  });

  // Throttle
  function throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Parallax effect
  const gradientGlow = document.querySelector('.gradient-glow');
  const throttledScroll = throttle(() => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    if (gradientGlow) {
      gradientGlow.style.transform = `translateY(${rate}px)`;
    }
  }, 16);
  window.addEventListener('scroll', throttledScroll, { passive: true });

  // Preload images
  const criticalImages = [
    'asfalt-light.png'
  ];
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  // Accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
      cursor.style.display = 'none';
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
    cursor.style.display = 'block';
  });
});
