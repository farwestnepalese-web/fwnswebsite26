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

// ── Force Chatbase bubble bigger ────────────────────────
(function resizeChatbot() {
  const css = `
    [id*="chatbase"] iframe, [class*="chatbase"] iframe { display:block !important; }
    /* target the floating bubble button */
    div[style*="z-index: 2147483647"] > div:last-child,
    div[style*="z-index:2147483647"] > div:last-child {
      width: 68px !important;
      height: 68px !important;
      min-width: 68px !important;
      min-height: 68px !important;
    }
  `;
  const s = document.createElement('style');
  s.textContent = css;
  document.head.appendChild(s);

  // Also try after chatbase loads via MutationObserver
  const mo = new MutationObserver(() => {
    const bubble = document.querySelector('div[style*="z-index: 2147483647"] > div:last-child, div[style*="z-index:2147483647"] > div:last-child');
    if (bubble) {
      bubble.style.width  = '68px';
      bubble.style.height = '68px';
      bubble.style.minWidth  = '68px';
      bubble.style.minHeight = '68px';
    }
  });
  mo.observe(document.body, { childList: true, subtree: true });
})();

// Fade-in on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── Language toggle: English / Nepali ──────────────────
(function() {
  // Check current language from cookie
  function getLang() {
    const match = document.cookie.match(/googtrans=\/en\/(\w+)/);
    return match ? match[1] : 'en';
  }

  function setLang(lang) {
    const domain = window.location.hostname;
    if (lang === 'en') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + domain;
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    } else {
      document.cookie = 'googtrans=/en/' + lang + '; path=/; domain=' + domain;
      document.cookie = 'googtrans=/en/' + lang + '; path=/';
    }
    window.location.reload();
  }

  const isNepali = getLang() === 'ne';

  // Inject hidden Google Translate widget (needed for cookie to work)
  const gtDiv = document.createElement('div');
  gtDiv.id = 'google_translate_element';
  gtDiv.style.cssText = 'position:absolute;top:-9999px;left:-9999px;';
  document.body.appendChild(gtDiv);

  window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'ne,en',
      autoDisplay: false
    }, 'google_translate_element');
  };
  const gtScript = document.createElement('script');
  gtScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  document.body.appendChild(gtScript);

  // Button
  const btn = document.createElement('button');
  btn.id = 'lang-btn';
  btn.innerHTML = isNepali ? '🌐 English' : '🌐 नेपाली';

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
      padding: 0.55rem 1.2rem;
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      font-family: inherit;
      transition: background 0.2s, transform 0.1s;
    }
    #lang-btn:hover { background: #D4A017; color: #1A3A5C; transform: scale(1.05); }
    #lang-btn:active { transform: scale(0.97); }
    .goog-te-banner-frame { display:none !important; }
    body { top: 0 !important; }
  `;
  document.head.appendChild(style);
  document.body.appendChild(btn);

  btn.addEventListener('click', function() {
    setLang(isNepali ? 'en' : 'ne');
  });
})();
