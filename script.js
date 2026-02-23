document.addEventListener('DOMContentLoaded', () => {

  // ===== Scroll-triggered fade-in animations =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // ===== Navbar scroll behavior =====
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // ===== Mobile menu toggle =====
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // ===== Smooth scroll for anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: position, behavior: 'smooth' });
      }
    });
  });

  // ===== Waitlist form =====
  const form = document.getElementById('waitlistForm');
  const successMsg = document.getElementById('waitlistSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('waitlistEmail').value;
      if (email) {
        form.style.display = 'none';
        successMsg.style.display = 'block';
        successMsg.classList.add('fade-up', 'visible');
      }
    });
  }

  // ===== Typing animation in demo chat =====
  const chatBubbles = document.querySelectorAll('.demo-chat .chat-msg');
  let delay = 0;
  chatBubbles.forEach((msg, i) => {
    msg.style.opacity = '0';
    msg.style.transform = 'translateY(10px)';
    msg.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const demoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        chatBubbles.forEach((msg, i) => {
          setTimeout(() => {
            msg.style.opacity = '1';
            msg.style.transform = 'translateY(0)';
          }, 300 + i * 500);
        });
        demoObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const demoChat = document.querySelector('.demo-chat');
  if (demoChat) {
    demoObserver.observe(demoChat);
  }

  // ===== Counter animation for stats =====
  const animateValue = (element, start, end, duration, suffix = '') => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.floor(eased * (end - start) + start) + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  // ===== Parallax for floating books =====
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    document.querySelectorAll('.floating-book').forEach((book, i) => {
      const speed = 0.03 + i * 0.015;
      book.style.transform = `translateY(${scrollY * speed}px) rotate(${-15 + i * 12}deg)`;
    });
  }, { passive: true });

});
