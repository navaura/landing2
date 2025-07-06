   // Enhanced cursor tracking with smooth animation
    const cursor = document.getElementById('cursor');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    // Smooth cursor animation with requestAnimationFrame
    function animateCursor() {
      const speed = 0.15;
      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;
      
      cursor.style.left = `${cursorX - 40}px`;
      cursor.style.top = `${cursorY - 40}px`;
      
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Enhanced smooth scrolling with offset for fixed navigation
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
    
    // Professional scroll-based navigation background
    let lastScrollTop = 0;
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
      
      lastScrollTop = scrollTop;
    }, { passive: true });
    
    // Enhanced intersection observer for animations
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
    
    // Observe all slide-up elements
    document.querySelectorAll('.slide-up').forEach(el => {
      el.style.animationPlayState = 'paused';
      slideUpObserver.observe(el);
    });
    
    // Professional button hover effects
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
    
    // Loading animation enhancement
    const loadingDots = document.querySelectorAll('.loading-dot');
    loadingDots.forEach((dot, index) => {
      dot.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Performance optimization: Throttle scroll events
    function throttle(func, limit) {
      let inThrottle;
      return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      }
    }
    
    // Add subtle parallax effect to gradient background
    const gradientGlow = document.querySelector('.gradient-glow');
    const throttledScroll = throttle(() => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      if (gradientGlow) {
        gradientGlow.style.transform = `translateY(${rate}px)`;
      }
    }, 16);
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Preload critical images for better performance
    const criticalImages = [
      'asfalt-light.png'
    ];
    
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
    
    // Enhanced accessibility: Focus management
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
    