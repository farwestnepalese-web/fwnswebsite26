// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !navLinks.contains(e.target)) navLinks.classList.remove('open');
  });
}

// Active nav link
const path = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
});

// Fade-in on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── Language toggle: English / Nepali ──────────────────
(function() {
  const btn = document.createElement('button');
  btn.id = 'lang-btn';
  btn.innerHTML = '🌐 नेपाली';

  const style = document.createElement('style');
  style.textContent = `
    #lang-btn {
      position: fixed;
      bottom: 1.75rem;
      left: 1.5rem;
      z-index: 999999;
      background: #1A3A5C;
      color: #fff;
      border: none;
      border-radius: 50px;
      padding: 0.55rem 1.1rem;
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer !important;
      pointer-events: all !important;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      font-family: inherit;
      transition: background 0.2s, transform 0.1s;
      user-select: none;
    }
    #lang-btn:hover { background: #D4A017; color: #1A3A5C; transform: scale(1.05); }
    #lang-btn:active { transform: scale(0.97); }

    /* Bigger Chatbase bubble */
    #chatbase-bubble-button {
      width: 64px !important;
      height: 64px !important;
      bottom: 1.5rem !important;
      right: 1.5rem !important;
    }
    #chatbase-bubble-button img,
    #chatbase-bubble-button svg {
      width: 36px !important;
      height: 36px !important;
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(btn);

  // Click opens page in Google Translate (Nepali) — no script dependency
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    const currentUrl = encodeURIComponent(window.location.href);
    window.open(
      'https://translate.google.com/translate?sl=en&tl=ne&u=' + currentUrl,
      '_blank'
    );
  });
})();
