let currentLang = 'de';

// ================= LANGUAGE SYSTEM =================
function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  // Translate all elements
  document.querySelectorAll('[data-de]').forEach(el => {
    const val = el.getAttribute('data-' + lang);
    if (val) el.innerHTML = val;
  });

  // Translate select options
  document.querySelectorAll('select option').forEach(opt => {
    const val = opt.getAttribute('data-' + lang);
    if (val) opt.textContent = val;
  });

  // Sync desktop + mobile buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const isActive =
      (lang === 'de' && btn.id.includes('btnDE')) ||
      (lang === 'en' && btn.id.includes('btnEN'));

    btn.classList.toggle('active', isActive);
  });
}

// Run German on page load
document.addEventListener('DOMContentLoaded', () => {
  setLang('de');
});

// ================= HERO SLIDER =================
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');

function goSlide(n) {
  if (!slides.length || !dots.length) return;

  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');

  currentSlide = n;

  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

setInterval(() => {
  if (slides.length) {
    goSlide((currentSlide + 1) % slides.length);
  }
}, 5000);

// ================= MOBILE MENU =================
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');

  document.body.style.overflow = menu.classList.contains('open')
    ? 'hidden'
    : 'visible';
}

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu .nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.remove('open');
    document.body.style.overflow = 'visible';
  });
});

// Close menu on resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 992) {
    document.getElementById('mobileMenu').classList.remove('open');
    document.body.style.overflow = 'visible';
  }
});

// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      document.getElementById('navLinks')?.classList.remove('open');
    }
  });
});

// ================= SCROLL ACTIVE NAV =================
const sections = document.querySelectorAll('section[id], .hero[id]');

window.addEventListener('scroll', () => {
  let pos = window.scrollY + 100;

  sections.forEach(sec => {
    if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
      document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + sec.id);
      });
    }
  });
});

// ================= FADE IN =================
document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  fadeElements.forEach(el => observer.observe(el));
});

// ================= CTA BUTTON =================
function handleCTAClick(event) {
  const button = event.currentTarget;

  button.classList.add('ripple');

  setTimeout(() => {
    button.classList.remove('ripple');
  }, 600);

  button.style.transform = 'scale(0.95)';

  setTimeout(() => {
    button.style.transform = 'scale(1)';
  }, 200);

  console.log('CTA clicked');
}