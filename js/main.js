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
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;

  // Inject as a list item before the Join Us button
  const li = document.createElement('li');
  li.id = 'translate-li';
  li.innerHTML = '<div id="google_translate_element"></div>';
  navLinks.appendChild(li);

  // Styles
  const style = document.createElement('style');
  style.textContent = `
    #translate-li { display:flex; align-items:center; }
    #google_translate_element .goog-te-gadget-simple {
      background: #f0f4fa !important;
      border: 1.5px solid #d0d8e8 !important;
      border-radius: 6px !important;
      padding: 3px 8px !important;
      font-size: 0.72rem !important;
      cursor: pointer;
    }
    #google_translate_element .goog-te-gadget-simple a {
      color: #1A3A5C !important;
      font-weight: 600 !important;
      text-decoration: none !important;
    }
    #google_translate_element .goog-te-gadget-simple span {
      color: #1A3A5C !important;
    }
    #google_translate_element .goog-te-gadget-simple img { display:none !important; }
    .goog-te-banner-frame, .goog-te-balloon-frame { display:none !important; }
    body { top: 0 !important; }
    .skiptranslate:not(#google_translate_element) { display:none !important; }
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
