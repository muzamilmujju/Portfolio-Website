// ---------- Theme toggle (remembers your choice) ----------
const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  try { localStorage.setItem('theme', theme); } catch (e) {}
}

let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) {}
setTheme(saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

themeBtn.addEventListener('click', () => {
  setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

// ---------- Mobile menu ----------
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---------- Highlight current section in the nav ----------
const sections = document.querySelectorAll('main section[id]');
const links = navLinks.querySelectorAll('a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  links.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// ---------- Contact form: opens the visitor's email app ----------
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(e.target);
  const subject = encodeURIComponent('Portfolio message from ' + data.get('name'));
  const body = encodeURIComponent(data.get('message') + '\n\n' + data.get('name') + '\n' + data.get('email'));
  window.location.href = 'mailto:mujjumuzamil07@gmail.com?subject=' + subject + '&body=' + body;
});

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();
