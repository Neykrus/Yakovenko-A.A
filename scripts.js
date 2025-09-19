// Ініціалізація particles.js
document.addEventListener('DOMContentLoaded', () => {
    if (typeof particlesJS === 'undefined') {
        console.error('particles.js не завантажено. Перевірте підключення скрипту.');
        return;
    }

    particlesJS('particles-js', {
        particles: {
            number: { value: 100, density: { enable: true, value_area: 800 } }, // Збільшено кількість частинок
            color: { value: "#3b82f6" },
            shape: { type: "circle" },
            opacity: { value: 0.6, random: true }, // Збільшено видимість
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#3b82f6",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 3, // Прискорено рух
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
            }
        },
        retina_detect: true
    });

    // Ініціалізація мови з localStorage або за замовчуванням українська
    const savedLang = localStorage.getItem('language') || 'ua';
    switchLang(savedLang);

    // Плавна прокрутка для якірних посилань
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Intersection Observer для анімацій
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section .animate').forEach(section => {
        observer.observe(section);
    });

    // Кнопка "Вгору"
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Функція перемикання мови
function switchLang(lang) {
    document.querySelectorAll('[class^="lang-"]').forEach(el => {
        el.style.display = 'none';
    });

    document.querySelectorAll(`.lang-${lang}`).forEach(el => {
        el.style.display = 'block';
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[onclick="switchLang('${lang}')"]`).classList.add('active');

    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
}