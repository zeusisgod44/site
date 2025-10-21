window.addEventListener('load', () => {
    const fade = document.getElementById('page-fade');
    fade.classList.add('hidden');
    setTimeout(() => {
        fade.remove();
    }, 1000); // CSS transition ile eşleşiyor
});



//scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});


//slide
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Slider ana değişkenler
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const heroContent = document.querySelector('.hero-content');
const h1 = heroContent.querySelector('h1');
const p = heroContent.querySelector('p');
const heroButton = document.getElementById('heroButton');

const slideTexts = [
    {
        title: 'Güvenilir Kontrol ve Danışmanlık',
        desc: 'İstanbul’daki projelerinize uzman denetim ve teknik destekle değer katıyoruz',
        btnText: 'Danışmanlık Hizmetlerimiz',
        btnLink: '#kontrol-danismanlik',
        btnTarget: '_self'
    },
    {
        title: 'Betonarme Yapı İmalatları',
        desc: 'Uzman ekibimizle betonarme yapılarınızı güvenli ve standartlara uygun şekilde inşa ediyoruz',
        btnText: 'Hizmet Detaylarını Gör',
        btnLink: '#betonarme-yapi',
        btnTarget: '_self'
    },
    {
        title: 'Betonarme Güçlendirme',
        desc: 'Mevcut yapıların güçlendirilmesi ve raporlanması',
        btnText: 'Detaylı İncele',
        btnLink: '#güçlendirme',
        btnTarget: '_self'
    },
    {
        title: 'Çelik Yapı İmalatları',
        desc: 'Dayanıklı, hafif ve estetik çelik konstrüksiyon çözümleriyle projelerinize değer katıyoruz.',
        btnText: 'İmalat Süreçlerini Gör',
        btnLink: '#celik-yapi   ',
        btnTarget: '_self'
    },
    {
        title: 'Hafriyat ve Kırım İşleri',
        desc: 'Güvenli, hızlı ve çevreye duyarlı hafriyat ve kırım hizmetleri sunuyoruz.',
        btnText: 'Detayları İncele',
        btnLink: '#yikim-hafriyat',
        btnTarget: '_self'
    }
];



let currentSlide = 0;
let slideInterval;

// Slide değiştirme fonksiyonu
function changeSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));

    slides[index].classList.add('active');
    indicators[index].classList.add('active');

    // Yazı animasyonlarını sıfırla ve tekrar uygula
    h1.classList.remove('animate-title');
    p.classList.remove('animate-desc');
    void h1.offsetWidth;
    void p.offsetWidth;

    h1.textContent = slideTexts[index].title;
    p.textContent = slideTexts[index].desc;

    h1.classList.add('animate-title');
    p.classList.add('animate-desc');
    // buton güncellemesi
    if (heroButton && slideTexts[index]) {
        // Önce çıkış animasyonu
        heroButton.classList.remove('show');
        heroButton.classList.add('fade-out');

        // Butonun tamamen kaybolmasını bekle (600ms)
        setTimeout(() => {
            // Yeni içerikleri ayarla
            heroButton.textContent = slideTexts[index].btnText || 'Detay';
            heroButton.href = slideTexts[index].btnLink || '#';
            heroButton.target = slideTexts[index].btnTarget || '_self';

            // Şimdi tekrar göster
            heroButton.classList.remove('fade-out');
            heroButton.classList.add('show');
        }, 600); // bu süre CSS geçiş süresiyle aynı olmalı
    }



    currentSlide = index;
}

// Otomatik slayt gösterimi
function startSlideShow() {
    slideInterval = setInterval(() => {
        let nextSlide = (currentSlide + 1) % slides.length;
        changeSlide(nextSlide);
    }, 6000);
}

// Zamanlayıcı sıfırlama
function resetSlideTimer() {
    clearInterval(slideInterval);
    startSlideShow();
}

// Indicator tıklamaları
indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => {
        changeSlide(i);
        resetSlideTimer();
    });
});

// Başlangıç
window.addEventListener('DOMContentLoaded', () => {
    changeSlide(0);
    startSlideShow();
    heroContent.classList.add('animate');
});


// dropdown menü
document.querySelectorAll('.dropdown').forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');

    // Tıklama ile aç/kapat
    toggle.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });

    // Dışarı tıklanınca kapat
    document.addEventListener('click', e => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });

    // Hover da aktif kalsın
    dropdown.addEventListener('mouseenter', () => dropdown.classList.add('active'));
    dropdown.addEventListener('mouseleave', () => dropdown.classList.remove('active'));
});

// Hakkımızda paragraflarını seç
const aboutSection = document.querySelector('#hakkimizda');
const aboutParagraphs = aboutSection.querySelectorAll('p');

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75
    );
}

const aboutButton = aboutSection.querySelector('.about-btn');

function animateParagraphsAndButton() {
    aboutParagraphs.forEach((p, index) => {
        if (isInViewport(p)) {
            setTimeout(() => {
                if (p.classList.contains('fade-left')) {
                    p.classList.add('fade-in-left');
                } else if (p.classList.contains('fade-right')) {
                    p.classList.add('fade-in-right');
                }
                // Buton paragraflardan sonra
                if (index === aboutParagraphs.length - 1 && aboutButton) {
                    setTimeout(() => {
                        aboutButton.classList.add('fade-in');
                    }, 200);
                }
            }, index * 200);
        }
    });
}

window.addEventListener('scroll', animateParagraphsAndButton);
window.addEventListener('load', animateParagraphsAndButton);


//about canvas
const aboutParticle_canvas = document.getElementById('about-canvas');
const aboutParticle_ctx = aboutParticle_canvas.getContext('2d');
let aboutParticle_array = [];
let aboutParticle_animationId;
let aboutParticle_isRunning = false;

// Canvas boyutunu ayarla
function aboutParticle_resizeCanvas() {
    aboutParticle_canvas.width = aboutParticle_canvas.offsetWidth;
    aboutParticle_canvas.height = aboutParticle_canvas.offsetHeight;
}
window.addEventListener('resize', aboutParticle_resizeCanvas);
aboutParticle_resizeCanvas();

// Partikül sınıfı
class aboutParticle_Particle {
    constructor() {
        this.x = Math.random() * aboutParticle_canvas.width;
        this.y = Math.random() * aboutParticle_canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
        this.color = 'rgba(255, 77, 77, 0.8)';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > aboutParticle_canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > aboutParticle_canvas.height) this.speedY *= -1;
    }
    draw() {
        aboutParticle_ctx.beginPath();
        aboutParticle_ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        aboutParticle_ctx.fillStyle = this.color;
        aboutParticle_ctx.fill();
    }
}

// Partikülleri oluştur
function aboutParticle_init(count = 40) {
    aboutParticle_array = [];
    for (let i = 0; i < count; i++) {
        aboutParticle_array.push(new aboutParticle_Particle());
    }
}

// Animasyon
function aboutParticle_animate() {
    aboutParticle_ctx.clearRect(0, 0, aboutParticle_canvas.width, aboutParticle_canvas.height);
    aboutParticle_array.forEach(p => {
        p.update();
        p.draw();
    });
    aboutParticle_animationId = requestAnimationFrame(aboutParticle_animate);
}

// Intersection Observer
const aboutParticle_section = document.getElementById('hakkimizda');
const aboutParticle_observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !aboutParticle_isRunning) {
                aboutParticle_init();
                aboutParticle_animate();
                aboutParticle_isRunning = true;
            } else if (!entry.isIntersecting && aboutParticle_isRunning) {
                cancelAnimationFrame(aboutParticle_animationId);
                aboutParticle_ctx.clearRect(0, 0, aboutParticle_canvas.width, aboutParticle_canvas.height);
                aboutParticle_isRunning = false;
            }
        });
    },
    { threshold: 0.3 }
);

aboutParticle_observer.observe(aboutParticle_section);

//servis1

const serviceSections = document.querySelectorAll('.service-section');

function animateService(entry) {
    const section = entry.target;
    const title = section.querySelector('h2');
    const paragraph = section.querySelector('p');
    const button = section.querySelector('.service-btn');
    const image = section.querySelector('img');
    const list = section.querySelector('ul'); // ✅ yeni ekleme

    // Başlık
    if (title) title.classList.add('service-animate-title');

    // Paragraf
    if (paragraph) setTimeout(() => paragraph.classList.add('service-animate-p'), 300);

    // Liste (madde madde animasyon)
    if (list) {
        const items = list.querySelectorAll('li');
        items.forEach((li, index) => {
            setTimeout(() => {
                li.classList.add('service-animate-li');
            }, 400 + index * 150); // sıralı biçimde
        });
    }

    // Buton
    if (button) setTimeout(() => button.classList.add('service-animate-btn'), 600);

    // Görsel
    if (image) setTimeout(() => image.classList.add('service-animate-img'), 300);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateService(entry);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

serviceSections.forEach(section => observer.observe(section));



// SERVİS 2 Animasyon

const service2Sections = document.querySelectorAll('.service2-section');

function animateService2Section(section) {
    const title = section.querySelector('h2');
    const paragraph = section.querySelector('p');
    const button = section.querySelector('.service2-btn');
    const image = section.querySelector('img');
    const list = section.querySelector('ul');

    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.75 && !section.dataset.animated) {
        section.dataset.animated = 'true';

        if (title) title.classList.add('service2-animate-title');

        if (paragraph) {
            setTimeout(() => paragraph.classList.add('service2-animate-p'), 300);
        }

        if (list) {
            const items = list.querySelectorAll('li');
            items.forEach((li, index) => {
                setTimeout(() => li.classList.add('service2-animate-li'), 400 + index * 150);
            });
        }

        if (button) {
            setTimeout(() => button.classList.add('service2-animate-btn'), 600);
        }

        if (image) {
            setTimeout(() => image.classList.add('service2-animate-img'), 300);
        }
    }
}

function onScroll() {
    service2Sections.forEach(section => animateService2Section(section));
}

window.addEventListener('scroll', onScroll);
window.addEventListener('load', onScroll);

// --- NEDEN BİZ FADE IN ---
const nedenBizTitle = document.querySelector(".stats-section .animated-text");

const nedenBizObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (nedenBizTitle) {
                nedenBizTitle.classList.add("active");
            }
            nedenBizObserver.disconnect(); // sadece bir kere çalışsın
        }
    });
}, { threshold: 0.5 });

if (nedenBizTitle) nedenBizObserver.observe(nedenBizTitle);

// --- MEVCUT STATS ANİMASYONLARI ---
function animateStatsCounters() {
    const statsBoxes = document.querySelectorAll(".stat-box");

    statsBoxes.forEach((statsBox, i) => {
        const delayMs = i * 200; // sırayla gecikme
        setTimeout(() => {
            statsBox.classList.add("active");

            const statsNumberEl = statsBox.querySelector(".stat-number");
            const targetValue = parseFloat(statsNumberEl.dataset.count);
            let currentValue = 0;
            const isFloat = targetValue % 1 !== 0;

            const updateStatsNumber = () => {
                const increment = isFloat ? 0.1 : Math.ceil(targetValue / 50);
                currentValue += increment;

                if (currentValue >= targetValue) {
                    statsNumberEl.textContent = isFloat ? targetValue.toFixed(1) : targetValue;
                } else {
                    statsNumberEl.textContent = isFloat ? currentValue.toFixed(1) : Math.floor(currentValue);
                    requestAnimationFrame(updateStatsNumber);
                }
            };

            requestAnimationFrame(updateStatsNumber);
        }, delayMs);
    });
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStatsCounters();
            statsObserver.disconnect(); // sadece bir kere
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector(".stats-section");
if (statsSection) statsObserver.observe(statsSection);

// --- CANVAS ANİMASYONLARI ---
(function () {
    const canvas = document.getElementById("statsCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    function resizeStatsCanvas() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    }
    window.addEventListener("resize", resizeStatsCanvas);

    const shapes = [];
    const shapeCount = 40;

    function createShapes() {
        shapes.length = 0;
        for (let i = 0; i < shapeCount; i++) {
            shapes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 8 + 3,
                speedY: Math.random() * 0.3 + 0.2,
                alpha: Math.random() * 0.3 + 0.2,
                shape: Math.random() > 0.5 ? "circle" : "triangle"
            });
        }
    }

    let statsCanvasAnimationId = null;
    let isAnimating = false;

    function drawShapes() {
        if (!isAnimating) return;

        ctx.clearRect(0, 0, width, height);
        for (const s of shapes) {
            ctx.globalAlpha = s.alpha;
            ctx.fillStyle = "#ff4d4d";

            if (s.shape === "circle") {
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(s.x - s.size, s.y + s.size * 1.5);
                ctx.lineTo(s.x + s.size, s.y + s.size * 1.5);
                ctx.closePath();
                ctx.fill();
            }

            s.y -= s.speedY;
            if (s.y + s.size < 0) {
                s.y = height + s.size;
                s.x = Math.random() * width;
            }
        }
        ctx.globalAlpha = 1;
        statsCanvasAnimationId = requestAnimationFrame(drawShapes);
    }

    // Observer ile görünürlük kontrolü
    const statsCanvasObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!isAnimating) {
                    isAnimating = true;
                    createShapes();
                    drawShapes();
                }
                statsCanvasObserver.disconnect(); // sadece bir kere çalışır
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) statsCanvasObserver.observe(statsSection);
})();

// Deprem & Kentsel Dönüşüm özel observer
const quakeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('quake-fade-left')) {
                entry.target.classList.add('quake-fade-in-left');
            } else if (entry.target.classList.contains('quake-fade-right')) {
                entry.target.classList.add('quake-fade-in-right');
            }
            // Gözlemlenen eleman zaten görünürse bir daha gözlemleme
            quakeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

// Observer'a hedef elemanları ekle
document.querySelectorAll('.quake-fade-left, .quake-fade-right').forEach(el => {
    quakeObserver.observe(el);
});


//hamburger
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const dropdownToggle = document.querySelector(".mobile-dropdown-toggle");
const dropdown = document.querySelector(".mobile-dropdown");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "auto";
});

dropdownToggle.addEventListener("click", () => {
    dropdown.classList.toggle("open");
});

