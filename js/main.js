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

// ── Google Translate — Nepali / English toggle ──────────
(function injectTranslate() {
  // Add translate container to nav
  const nav = document.querySelector('nav');
  if (!nav) return;

  const wrap = document.createElement('div');
  wrap.id = 'translate-wrap';
  wrap.style.cssText = 'display:flex;align-items:center;gap:0.4rem;margin-left:auto;padding-right:0.75rem;flex-shrink:0;';

  wrap.innerHTML = `
    <span style="font-size:0.7rem;font-weight:700;color:rgba(255,255,255,0.6);text-transform:uppercase;letter-spacing:0.08em;">🌐</span>
    <div id="google_translate_element"></div>
  `;

  // Insert before the nav-toggle button
  const toggle = nav.querySelector('.nav-toggle');
  nav.insertBefore(wrap, toggle);

  // Style the Google Translate widget
  const style = document.createElement('style');
  style.textContent = `
    #translate-wrap { order: 99; }
    #google_translate_element .goog-te-gadget-simple {
      background: rgba(255,255,255,0.1) !important;
      border: 1px solid rgba(255,255,255,0.25) !important;
      border-radius: 6px !important;
      padding: 2px 6px !important;
      font-size: 0.72rem !important;
    }
    #google_translate_element .goog-te-gadget-simple a,
    #google_translate_element .goog-te-gadget-simple span {
      color: #fff !important;
      text-decoration: none !important;
    }
    .goog-te-banner-frame { display: none !important; }
    body { top: 0 !important; }
    .skiptranslate { display: none !important; }
  `;
  document.head.appendChild(style);

  // Load Google Translate script
  window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'ne,en',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false
    }, 'google_translate_element');
  };

  const script = document.createElement('script');
  script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.body.appendChild(script);
})();
