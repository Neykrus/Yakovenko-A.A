
// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href').slice(1);
    const el=document.getElementById(id);
    if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'});}
  });
});

// Back to top
const btt=document.querySelector('.btt');
window.addEventListener('scroll',()=>{ btt.style.opacity = window.scrollY>400 ? 1 : 0.25; });
btt.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

// Theme toggle (two-state)
(function(){
  const root=document.documentElement, key="theme-pref";
  const btn=document.getElementById("themeToggle");
  const apply=(m)=>{ if(m==="light"){root.setAttribute("data-theme","light"); btn.textContent="🌙";} else {root.setAttribute("data-theme","dark"); btn.textContent="☀︎";} };
  let saved=localStorage.getItem(key);
  if(!saved){ const prefersLight=window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches; saved=prefersLight?"light":"dark"; localStorage.setItem(key,saved); }
  apply(saved);
  btn.addEventListener("click",()=>{ const next=localStorage.getItem(key)==="light"?"dark":"light"; localStorage.setItem(key,next); apply(next); });
})();

// i18n
const dict={
  en:{
    about:"About",experience:"Experience",skills:"Skills & KPIs",projects:"Projects",now:"Now",contact:"Contacts",
    name:"Andrii Yakovenko",
    title:"Retail & Vape Lead — Growth & Operations",
    oneLiner:"Building retail systems, not just sales.",
    seeExperience:"See Experience",contactMe:"Contact Me",
    aboutText:"I started my retail journey at 18. There were pauses along the way, but each return gave me a new level of experience and responsibility. I’ve worked with various products — from spare parts and photo equipment to modern vape products. I focus on building systems: finding growth points, structuring processes, and empowering teams. As a leader, I combine human qualities with a strong focus on results. Today, at 25, I’m responsible for the vape category and assortment across 150+ locations — and I see this as a chance to scale results further.",
    exp1:"+22% revenue in the first month, margin growth; launched promotions and SOPs.",
    exp2:"Managed 10+ stores; solved staffing deficit; ensured steady KPI growth.",
    exp3:"+80% profit in a year thanks to process optimization and team work.",
    exp4:"High NPS, excellent mystery shopper results, fast promotion to deputy director.",
    kpi1:"revenue in the 1st month",kpi2:"profit in a year",kpi3:"stores managed",kpi4:"locations in assortment",
    skill1:"Multi-store management (10–150+)", skill2:"Assortment strategy & optimization", skill3:"Operations & SOPs",
    skill4:"KPIs: profit, revenue, margin", skill5:"Hiring & team development", skill6:"Promotions & retail marketing",
    projects:"Projects",
    proj1t:"Processes → +80% profit", proj1d:"Rebuilt operations, optimized assortment and incentives.", proj1b:"Before: fragmented processes, low margin", proj1a:"After: +80% profit YoY",
    proj2t:"Fast revenue growth", proj2d:"Launched promos and introduced transparent sales KPIs.", proj2b:"Before: uneven MoM sales", proj2a:"After: +22% revenue in month one",
    proj3t:"Network management", proj3d:"Closed staffing gaps, standardized ops, stabilized KPIs across 10+ stores.", proj3b:"Before: staff shortage, inconsistent service", proj3a:"After: steady KPI growth",
    proj4t:"Service & growth", proj4d:"Excellent mystery shopper results, high NPS, fast promotion.", proj4b:"Before: baseline service level", proj4a:"After: higher NPS, promoted to deputy director",
    now:"Now", nowText:"Leading the vape category and assortment in 150+ locations. Launching promos, expanding assortment and coordinating network operations.",
    contact:"Contacts", footer:"open to new opportunities"
  }
};
const langBtn=document.getElementById('langToggle');
langBtn.addEventListener('click',()=>{
  const isUA=document.documentElement.getAttribute('lang')==='uk';
  if(isUA){
    document.documentElement.setAttribute('lang','en');
    langBtn.textContent='EN / 🇺🇦';
    for(const [k,v] of Object.entries(dict.en)){
      document.querySelectorAll('[data-i18n="'+k+'"]').forEach(el=> el.textContent=v);
    }
  }else{
    document.documentElement.setAttribute('lang','uk');
    langBtn.textContent='🇺🇦 / EN';
    // reload to restore UA literals embedded in HTML
    location.reload();
  }
});
