[script.js](https://github.com/user-attachments/files/26669306/script.js)
/* ============================================================
   Guyboo — Script
   - Dark mode toggle
   - Sticky header shadow
   - Mobile menu
   - Scroll fade-up animations
   ============================================================ */

(function () {
  // ── THEME TOGGLE ──
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;

  function getPreferred() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  let currentTheme = getPreferred();
  root.setAttribute('data-theme', currentTheme);
  updateToggleIcon(currentTheme);

  if (toggle) {
    toggle.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', currentTheme);
      updateToggleIcon(currentTheme);
    });
  }

  function updateToggleIcon(theme) {
    if (!toggle) return;
    toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
    toggle.innerHTML = theme === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  // ── STICKY HEADER ──
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('header--scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // ── MOBILE MENU ──
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    // Close on link click
    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });
  }

  // ── SCROLL FADE-UP ANIMATIONS ──
  const animTargets = [
    '.service-card',
    '.brand-card',
    '.edge-item',
    '.story-card',
    '.testimonial',
    '.engagement-card',
    '.about-pillars li',
    '.client-name'
  ];

  const targets = document.querySelectorAll(animTargets.join(', '));
  targets.forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${(i % 6) * 55}ms`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));

  // ── SMOOTH ACTIVE NAV ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 80;
      if (window.scrollY >= top) current = section.id;
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === '#' + current
        ? 'var(--color-text)'
        : '';
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

})();
