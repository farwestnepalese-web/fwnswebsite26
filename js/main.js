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
(function injectTranslate() {
  let isNepali = false;

  // Hidden Google Translate element
  const gtDiv = document.createElement('div');
  gtDiv.id = 'google_translate_element';
  gtDiv.style.display = 'none';
  document.body.appendChild(gtDiv);

  // Floating button
  const btn = document.createElement('button');
  btn.id = 'lang-btn';
  btn.innerHTML = '🌐 नेपाली';
  btn.title = 'Translate to Nepali / English';
  document.body.appendChild(btn);

  const style = document.createElement('style');
  style.textContent = `
    #lang-btn {
      position: fixed;
      bottom: 1.5rem;
      left: 1.5rem;
      z-index: 99999;
      background: #1A3A5C;
      color: #fff;
      border: none;
      border-radius: 50px;
      padding: 0.5rem 1rem;
      font-size: 0.78rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(0,0,0,0.25);
      font-family: inherit;
      transition: background 0.2s;
    }
    #lang-btn:hover { background: #D4A017; color: #1A3A5C; }
    .goog-te-banner-frame, .goog-te-balloon-frame { display:none !important; }
    body { top: 0 !important; }
  `;
  document.head.appendChild(style);

  // Load Google Translate
  window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'ne,en',
      autoDisplay: false
    }, 'google_translate_element');
  };
  const script = document.createElement('script');
  script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.body.appendChild(script);

  // Button click — pick Nepali or English from the hidden select
  btn.addEventListener('click', function() {
    const select = document.querySelector('.goog-te-combo');
    if (!select) { alert('Translate is still loading, please try again in a second.'); return; }
    if (!isNepali) {
      select.value = 'ne';
      select.dispatchEvent(new Event('change'));
      btn.innerHTML = '🌐 English';
      isNepali = true;
    } else {
      select.value = '';
      select.dispatchEvent(new Event('change'));
      btn.innerHTML = '🌐 नेपाली';
      isNepali = false;
    }
  });
})();
