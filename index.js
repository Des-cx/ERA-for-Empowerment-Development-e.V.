let currentLang = 'de';

function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  // Update all elements with data-de / data-en
  document.querySelectorAll('[data-de]').forEach(el => {
    const val = el.getAttribute('data-' + lang);
    if (val) el.innerHTML = val;
  });

  // Update select options
  document.querySelectorAll('select option').forEach(opt => {
    const val = opt.getAttribute('data-' + lang);
    if (val) opt.textContent = val;
  });

  // Active button
  document.getElementById('btnDE').classList.toggle('active', lang === 'de');
  document.getElementById('btnEN').classList.toggle('active', lang === 'en');
}

// ===== HERO SLIDER =====
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');

function goSlide(n) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = n;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

setInterval(() => goSlide((currentSlide + 1) % slides.length), 5000);

// ===== MOBILE MENU =====
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// ===== CONTACT FORM =====
function submitForm() {
  const success = document.getElementById('formSuccess');
  success.style.display = 'block';
  success.textContent = success.getAttribute('data-' + currentLang);
  // Reset form fields
  ['fname','lname','email','message'].forEach(id => { document.getElementById(id).value = ''; });
  setTimeout(() => { success.style.display = 'none'; }, 5000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      document.getElementById('navLinks').classList.remove('open');
    }
  });
});

// Active nav on scroll
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

// intro animation
// Scroll Fade-in Effect
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

// CTA Button Interaction
function handleCTAClick() {
    const button = event.currentTarget;
    
    // Ripple effect
    button.classList.add('ripple');
    setTimeout(() => {
        button.classList.remove('ripple');
    }, 600);
    
    // Visual feedback
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
    
    // You can add navigation here later
    console.log('CTA Button clicked - Ready to redirect to contact');
}

// MOBILE MENU WITH SLIDE + CLOSE BUTTON
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
  
  // Optional: prevent body scroll when menu open
  if (menu.classList.contains('open')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'visible';
  }
}

// Close menu when clicking a link
document.querySelectorAll('.mobile-menu .nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.remove('open');
    document.body.style.overflow = 'visible';
  });
});

// Sync language buttons (desktop + mobile)
function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-de]').forEach(el => {
    const val = el.getAttribute('data-' + lang);
    if (val) el.innerHTML = val;
  });

  // Sync all language buttons
  ['DE', 'EN'].forEach(l => {
    const btns = document.querySelectorAll(`.lang-btn[id*="btn${l}"]`);
    btns.forEach(btn => btn.classList.toggle('active', lang.toLowerCase() === l.toLowerCase()));
  });
}

// Close mobile menu on resize to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 992) {
    document.getElementById('mobileMenu').classList.remove('open');
    document.body.style.overflow = 'visible';
  }
});