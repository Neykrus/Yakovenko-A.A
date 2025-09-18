// Smooth anchor scrolling
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el){
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Reveal on scroll with IntersectionObserver
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if (entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

document.querySelectorAll('.reveal').forEach(el=> io.observe(el));

// Back-to-top visibility
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', ()=>{
  if (window.scrollY > 600) backToTop.classList.add('show');
  else backToTop.classList.remove('show');
});
backToTop.addEventListener('click', ()=> window.scrollTo({ top:0, behavior:'smooth' }));

// Active nav highlighting
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav-link')];
const inViewObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if (entry.isIntersecting){
      const id = entry.target.getAttribute('id');
      navLinks.forEach(l=> l.classList.toggle('active', l.getAttribute('href') === '#'+id));
    }
  });
}, { threshold: 0.6 });

sections.forEach(s=> inViewObserver.observe(s));
