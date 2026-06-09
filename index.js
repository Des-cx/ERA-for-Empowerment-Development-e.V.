let currentLang = localStorage.getItem('language') || 'de';

// ================= LANGUAGE SYSTEM =================
function setLang(lang) {
currentLang = lang;

// Save selected language
localStorage.setItem('language', lang);

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

```
btn.classList.toggle('active', isActive);
```

});
}

// Load saved language on page load
document.addEventListener('DOMContentLoaded', () => {
const savedLang = localStorage.getItem('language') || 'de';
setLang(savedLang);
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

if (slides.length) {
setInterval(() => {
goSlide((currentSlide + 1) % slides.length);
}, 5000);
}

// ================= MOBILE MENU =================
function toggleMenu() {
const menu = document.getElementById('mobileMenu');

if (!menu) return;

menu.classList.toggle('open');

document.body.style.overflow = menu.classList.contains('open')
? 'hidden'
: '';
}

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu .nav-links a').forEach(link => {
link.addEventListener('click', () => {
const menu = document.getElementById('mobileMenu');

```
if (menu) {
  menu.classList.remove('open');
  document.body.style.overflow = '';
}
```

});
});

// Close menu on resize
window.addEventListener('resize', () => {
const menu = document.getElementById('mobileMenu');

if (window.innerWidth > 992 && menu) {
menu.classList.remove('open');
document.body.style.overflow = '';
}
});

// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(a => {
a.addEventListener('click', e => {
const target = document.querySelector(a.getAttribute('href'));

```
if (target) {
  e.preventDefault();

  target.scrollIntoView({
    behavior: 'smooth'
  });

  document.getElementById('navLinks')?.classList.remove('open');
}
```

});
});

// ================= SCROLL ACTIVE NAV =================
const sections = document.querySelectorAll('section[id], .hero[id]');

window.addEventListener('scroll', () => {
let pos = window.scrollY + 100;

sections.forEach(sec => {
if (
pos >= sec.offsetTop &&
pos < sec.offsetTop + sec.offsetHeight
) {
document.querySelectorAll('.nav-links a').forEach(a => {
a.classList.toggle(
'active',
a.getAttribute('href') === '#' + sec.id
);
});
}
});
});

// ================= FADE IN =================
document.addEventListener('DOMContentLoaded', () => {
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('visible');
}
});
}, {
threshold: 0.15
});

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

const ctaBtn = document.getElementById('ctaBtn');

if (ctaBtn) {
ctaBtn.addEventListener('click', handleCTAClick);
}


(function () {
  var track  = document.getElementById('partnersTrack');
  var dotsEl = document.getElementById('partnersDots');
  if (!track) return;

  var cards     = Array.from(track.querySelectorAll('.partner-card'));
  var current   = 0;
  var autoTimer = null;

  function visibleCount() {
    if (window.innerWidth >= 1024) return 4;
    if (window.innerWidth >= 768)  return 3;
    if (window.innerWidth >= 480)  return 2;
    return 1;
  }

  function totalPages() {
    return Math.ceil(cards.length / visibleCount());
  }

  function buildDots() {
    dotsEl.innerHTML = '';
    for (var i = 0; i < totalPages(); i++) {
      var d = document.createElement('button');
      d.className = 'partners-dot' + (i === current ? ' active' : '');
      d.setAttribute('aria-label', 'Seite ' + (i + 1));
      (function(idx){ d.addEventListener('click', function(){ goTo(idx); }); })(i);
      dotsEl.appendChild(d);
    }
  }

  function goTo(page) {
    var pages = totalPages();
    current   = (page + pages) % pages;
    var vc    = visibleCount();
    var cardW = track.parentElement.offsetWidth / vc;
    track.style.transform = 'translateX(-' + (current * vc * cardW) + 'px)';
    buildDots();
  }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(function(){ goTo(current + 1); }, 3500);
  }

  track.parentElement.addEventListener('mouseenter', function(){ clearInterval(autoTimer); });
  track.parentElement.addEventListener('mouseleave', startAuto);

  document.querySelector('.partners-prev').addEventListener('click', function(){ goTo(current - 1); startAuto(); });
  document.querySelector('.partners-next').addEventListener('click', function(){ goTo(current + 1); startAuto(); });

  window.addEventListener('resize', function(){ current = 0; buildDots(); goTo(0); });

  buildDots();
  startAuto();
})();


function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    btn.classList.add('copied');
    btn.innerHTML = '<i class="bx bx-check"></i>';
    setTimeout(() => {
      btn.classList.remove('loved');
      btn.innerHTML = '<i class="bx bx-copy"></i>';
    }, 2000);
  });
}