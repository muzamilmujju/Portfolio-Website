/* ── THEME TOGGLE ──────────────────────────────────── */
const themeBtn = document.getElementById('themeBtn');
const html = document.documentElement;
themeBtn.addEventListener('click', () => {
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeBtn.textContent = isDark ? '☀️' : '🌙';
});

/* ── HAMBURGER ─────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});
mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileNav.classList.remove('open'));
});

/* ── ACTIVE NAV ────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 90) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

/* ── TYPING TEXT ───────────────────────────────────── */
const phrases = [
  'CSE (Data Science) Graduate',
  'Python Developer',
  'ML Enthusiast',
  'Problem Solver',
  'Based in Hyderabad 🇮🇳'
];
let pi = 0, ci = 0, deleting = false;
const typingEl = document.getElementById('typingText');

function type() {
  const phrase = phrases[pi];
  if (!deleting) {
    typingEl.textContent = phrase.slice(0, ++ci);
    if (ci === phrase.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typingEl.textContent = phrase.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 60 : 90);
}
type();

/* ── SCROLL REVEAL ─────────────────────────────────── */
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });
reveals.forEach(r => revealObs.observe(r));

/* ── SKILL BARS ────────────────────────────────────── */
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-category').forEach(c => barObs.observe(c));

/* ── SKILLS FILTER ─────────────────────────────────── */
document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn[data-filter]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.skill-category').forEach(c => {
      c.style.display = (f === 'all' || c.dataset.cat === f) ? '' : 'none';
    });
  });
});

/* ── PROJECTS FILTER ───────────────────────────────── */
document.querySelectorAll('.filter-btn[data-pfilter]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn[data-pfilter]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.pfilter;
    document.querySelectorAll('.project-card').forEach(c => {
      c.style.display = (f === 'all' || c.dataset.ptag === f) ? '' : 'none';
    });
  });
});

/* ── CONTACT FORM ──────────────────────────────────── */
function handleForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type=submit]');
  btn.textContent = '✓ Sent!';
  btn.style.background = 'linear-gradient(135deg, #3ecfb2, #7c6af7)';
  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = '';
  }, 3000);
}
