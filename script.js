
(function(){
  const root = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setTheme(theme) {
    if (theme === 'dark') { root.classList.add('dark'); }
    else { root.classList.remove('dark'); }
    localStorage.setItem('theme', theme);
  }
  const savedTheme = localStorage.getItem('theme');
  setTheme(savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light'));

  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      if (motionOK) { root.classList.add('theme-transition'); setTimeout(() => root.classList.remove('theme-transition'), 300); }
      const next = root.classList.contains('dark') ? 'light' : 'dark';
      setTheme(next);
      themeBtn.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
    });
  }

  // i18n
  let lang = localStorage.getItem('lang') || 'ua';
  function applyLang(l) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = window.I18N[l][key];
      if (value) el.textContent = value;
    });
    localStorage.setItem('lang', l);
  }
  window.switchLang = function(l) {
    lang = l; applyLang(lang);
    document.getElementById('lang-ua').setAttribute('aria-pressed', l==='ua');
    document.getElementById('lang-en').setAttribute('aria-pressed', l==='en');
    // switch CV link
    const link = document.getElementById('cv-link');
    link.href = l==='ua' ? './resume/Andrii_Yakovenko_CV_uk.docx' : './resume/Andrii_Yakovenko_CV_en.docx';
  };

  document.addEventListener('DOMContentLoaded', () => {
    applyLang(lang);
    if (motionOK) {
      document.querySelectorAll('[data-reveal]').forEach((el, i) => {
        setTimeout(() => el.classList.remove('opacity-0', 'translate-y-2'), i*60);
      });
    } else {
      document.querySelectorAll('[data-reveal]').forEach(el => el.classList.remove('opacity-0', 'translate-y-2'));
    }
  });
})();
