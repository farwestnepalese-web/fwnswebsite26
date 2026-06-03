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

// ── Google Translate — floating Nepali / English button ──
(function injectTranslate() {
  // Create floating translate button
  const floater = document.createElement('div');
  floater.id = 'translate-floater';
  floater.innerHTML = `
    <div id="translate-label">🌐 भाषा</div>
    <div id="google_translate_element"></div>
  `;
  document.body.appendChild(floater);

  const style = document.createElement('style');
  style.textContent = `
    #translate-floater {
      position: fixed;
      bottom: 1.5rem;
      left: 1.5rem;
      z-index: 9999;
      background: #1A3A5C;
      border-radius: 50px;
      padding: 0.45rem 0.85rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    }
    #translate-label {
      font-size: 0.72rem;
      font-weight: 700;
      color: #fff;
      white-space: nowrap;
      pointer-events: none;
    }
    #google_translate_element .goog-te-gadget-simple {
      background: transparent !important;
      border: none !important;
      padding: 0 !important;
      font-size: 0.72rem !important;
    }
    #google_translate_element .goog-te-gadget-simple a,
    #google_translate_element .goog-te-gadget-simple span {
      color: #D4A017 !important;
      font-weight: 700 !important;
      text-decoration: none !important;
    }
    #google_translate_element .goog-te-gadget-simple img { display:none !important; }
    .goog-te-banner-frame, .goog-te-balloon-frame { display:none !important; }
    body { top: 0 !important; }
    .skiptranslate:not(#translate-floater) { display:none !important; }
  `;
  document.head.appendChild(style);

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
