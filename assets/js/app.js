
// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href').slice(1);
    const el=document.getElementById(id);
    if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'});}
  });
});

// Reveal on scroll
const revealIO=new IntersectionObserver(entries=>{
  entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); revealIO.unobserve(en.target); } });
},{threshold:0.08, rootMargin:"0px 0px -10% 0px"});
document.querySelectorAll('.reveal').forEach(el=>revealIO.observe(el));

// Back-to-top
const btt=document.getElementById('backToTop');
window.addEventListener('scroll',()=>{
  if(window.scrollY>600) btt.classList.add('show'); else btt.classList.remove('show');
});
btt.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

// Active nav highlighting
const sections=[...document.querySelectorAll('main section[id]')];
const links=[...document.querySelectorAll('.nav-link')];
const navIO=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const id=e.target.getAttribute('id');
      links.forEach(l=> l.classList.toggle('active', l.getAttribute('href')==='#'+id));
    }
  });
},{threshold:0.6});
sections.forEach(s=>navIO.observe(s));

// Language toggle (simple dict)
const dict={
  en:{
    about:"About",experience:"Experience",skills:"Skills",qualities:"Qualities",credo:"Approach",goals:"What I seek",highlights:"Highlights",contact:"Contacts",
    name:"Andrii Yakovenko",
    title:"Retail & Vape Lead · Growth & Operations",
    tagline:"From spare parts and cameras to leading the vape category. I blend analytics, processes, and team execution.",
    seeExperience:"See Experience",contactMe:"Contact Me",
    aboutText:"Retail development specialist with 8+ years of experience. From spare parts and electronics to the vape industry. Currently responsible for category development and assortment across 150+ retail locations.",
    skill1:"Multi-store management from 10 to 150+ locations",
    skill2:"Assortment strategy and optimization",
    skill3:"Operational processes and SOPs",
    skill4:"KPIs: profit, revenue, margin",
    skill5:"Team leadership and staff development",
    skill6:"Promotions and retail campaigns",
    qual1:"Systematic and disciplined",
    qual2:"Adaptable to market change",
    qual3:"Balance of analytics & execution",
    qual4:"Customer & results oriented",
    credoText:"My principle is simple: any business can become profitable if you understand the customer, build the right processes, and empower the team with clear tools.",
    goalsText:"I'm looking for roles where I can scale directions, manage assortment, build processes, and deliver measurable results. I value team culture and real impact on growth.",
    contactText:"Open to opportunities in retail and e‑commerce. Reach me on Telegram or Email.",
    hire:"Hire me"
  }
};
const toggle=document.getElementById('langToggle');
toggle.addEventListener('click',()=>{
  const isUA=document.documentElement.getAttribute('data-lang')==='ua';
  document.documentElement.setAttribute('data-lang', isUA ? 'en':'ua');
  toggle.textContent = isUA ? '🇬🇧 / 🇺🇦' : '🇺🇦 / 🇬🇧';
  if(isUA){
    // switch to EN
    for(const [k,v] of Object.entries(dict.en)){
      document.querySelectorAll('[data-i18n="'+k+'"]').forEach(el=> el.textContent = v);
    }
  }else{
    // reload to restore UA text from HTML
    location.reload();
  }
});
