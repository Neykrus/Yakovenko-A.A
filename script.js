
(function(){
  const root = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setTheme(theme) {
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
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
      themeBtn.setAttribute('aria-pressed', String(next === 'dark'));
    });
  }

  let allData = {};
  let lang = localStorage.getItem('lang') || 'ua';

  function obfuscateEmail(email) {
    // Simple obfuscation: split and join on demand
    const [user, domain] = email.split('@');
    return { text: `${user} [at] ${domain}`, href: `mailto:${user}@${domain}` };
  }

  function populateContent(l) {
    const data = allData[l];
    if (!data) return;

    // Simple text fields
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (data[key]) el.textContent = data[key];
    });

    // Skills
    const skillsContainer = document.getElementById('skills-container');
    skillsContainer.innerHTML = '';
    (data.skills || []).forEach(skill => {
      const span = document.createElement('span');
      span.className = 'inline-flex items-center rounded-full border border-slate-200 dark:border-slate-800 px-3 py-1 text-sm';
      span.textContent = skill;
      skillsContainer.appendChild(span);
    });

    // Highlights
    const highlightsContainer = document.getElementById('highlights-container');
    highlightsContainer.innerHTML = '';
    (data.highlights || []).forEach(h => {
      const card = document.createElement('div');
      card.className = 'card shadow-soft p-5 bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800';
      card.setAttribute('data-reveal', '');
      const p = document.createElement('p');
      p.className = 'text-slate-700 dark:text-slate-200';
      p.textContent = h;
      card.appendChild(p);
      highlightsContainer.appendChild(card);
    });

    // Projects
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = '';
    (data.projects || []).forEach(pj => {
      const card = document.createElement('div');
      card.className = 'card shadow-soft p-5 bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800';
      card.setAttribute('data-reveal', '');
      const h3 = document.createElement('h3');
      h3.className = 'font-semibold';
      h3.textContent = pj.title;
      const p = document.createElement('p');
      p.className = 'mt-2 text-sm text-slate-600 dark:text-slate-300';
      p.textContent = pj.desc;
      card.appendChild(h3);
      card.appendChild(p);
      projectsContainer.appendChild(card);
    });

    // Contacts
    const cl = document.getElementById('contacts-list');
    cl.innerHTML = '';
    const loc = document.createElement('li');
    loc.textContent = `📍 ${data.contacts.location}`;
    cl.appendChild(loc);
    const emailInfo = obfuscateEmail(data.contacts.email);
    const em = document.createElement('li');
    const emA = document.createElement('a');
    emA.className = 'underline decoration-dotted';
    emA.href = emailInfo.href;
    emA.textContent = emailInfo.text;
    em.appendChild(document.createTextNode('✉️ '));
    em.appendChild(emA);
    cl.appendChild(em);
    const tg = document.createElement('li');
    const tgA = document.createElement('a');
    tgA.className = 'underline decoration-dotted';
    tgA.href = `https://${data.contacts.tg}`;
    tgA.textContent = data.contacts.tg;
    tg.appendChild(document.createTextNode('💬 '));
    tg.appendChild(tgA);
    cl.appendChild(tg);

    // Email CTA button
    const emailCta = document.getElementById('email-cta');
    if (emailCta) emailCta.href = emailInfo.href;

    // CV link (prefer PDFs)
    const cv = document.getElementById('cv-link');
    if (cv) {
      cv.href = l === 'ua' ? './resume/Andrii_Yakovenko_CV_uk.pdf' : './resume/Andrii_Yakovenko_CV_en.pdf';
      const cta = cv.querySelector('[data-i18n="cta"]');
      if (cta) cta.textContent = data.cta;
    }

    // Language buttons states
    document.getElementById('lang-ua').setAttribute('aria-pressed', String(l === 'ua'));
    document.getElementById('lang-en').setAttribute('aria-pressed', String(l === 'en'));
  }

  window.switchLang = function(l) {
    lang = l;
    localStorage.setItem('lang', l);
    populateContent(l);
  };

  document.addEventListener('DOMContentLoaded', () => {
    // Initialize button states for theme
    const currentTheme = root.classList.contains('dark') ? 'dark' : 'light';
    if (themeBtn) themeBtn.setAttribute('aria-pressed', String(currentTheme === 'dark'));

    // Bind language buttons (no inline onclick)
    const uaBtn = document.getElementById('lang-ua');
    const enBtn = document.getElementById('lang-en');
    if (uaBtn) uaBtn.addEventListener('click', () => switchLang('ua'));
    if (enBtn) enBtn.addEventListener('click', () => switchLang('en'));

    // Fetch data and populate
    fetch('./site-data.json')
      .then(r => r.json())
      .then(data => { allData = data; populateContent(lang);
        // reveal animation
        if (motionOK) {
          document.querySelectorAll('[data-reveal]').forEach((el, i) => {
            el.classList.add('opacity-0','translate-y-2');
            setTimeout(() => el.classList.remove('opacity-0','translate-y-2'), i*60);
          });
        }
      })
      .catch(err => console.error('Error loading site data:', err));
  });
})();
