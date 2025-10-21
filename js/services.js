window.addEventListener('load', () => {
    const fade = document.getElementById('page-fade');
    fade.classList.add('hidden');
    setTimeout(() => {
        fade.remove();
    }, 1000); // CSS transition ile eşleşiyor
});


//navbar scroll dalga
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight * 0.7) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

//giriş animasyonu
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
    for (let el of reveals) {
        const rect = el.getBoundingClientRect().top;
        if (rect < window.innerHeight - 100) {
            el.classList.add("active");
        }
    }
});

// ilk canvas
const serviceParticle_canvas = document.getElementById('service-canvas');
const serviceParticle_ctx = serviceParticle_canvas.getContext('2d');
let serviceParticle_array = [];
let serviceParticle_animationId;
let serviceParticle_isRunning = false;

// === Canvas boyutu ayarı ===
function serviceParticle_resizeCanvas() {
    const rect = serviceParticle_canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    serviceParticle_canvas.style.width = rect.width + 'px';
    serviceParticle_canvas.style.height = rect.height + 'px';
    serviceParticle_canvas.width = Math.round(rect.width * dpr);
    serviceParticle_canvas.height = Math.round(rect.height * dpr);
    serviceParticle_ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener('resize', serviceParticle_resizeCanvas);
serviceParticle_resizeCanvas();

// === Partikül sınıfı ===
class serviceParticle_Particle {
    constructor() {
        this.x = Math.random() * serviceParticle_canvas.width;
        this.y = Math.random() * serviceParticle_canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 1;
        this.speedY = (Math.random() - 0.5) * 1;
        this.color = 'rgba(255, 77, 77, 0.8)';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > serviceParticle_canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > serviceParticle_canvas.height) this.speedY *= -1;
    }
    draw() {
        serviceParticle_ctx.beginPath();
        serviceParticle_ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        serviceParticle_ctx.fillStyle = this.color;
        serviceParticle_ctx.fill();
    }
}

// === Partiküller arası bağlantılar ===
function serviceParticle_connect() {
    let maxDistance = 120; // çizgi mesafesi
    for (let a = 0; a < serviceParticle_array.length; a++) {
        for (let b = a; b < serviceParticle_array.length; b++) {
            const dx = serviceParticle_array[a].x - serviceParticle_array[b].x;
            const dy = serviceParticle_array[a].y - serviceParticle_array[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                const opacity = 1 - distance / maxDistance;
                serviceParticle_ctx.strokeStyle = `rgba(255, 77, 77, ${opacity * 0.3})`;
                serviceParticle_ctx.lineWidth = 1;
                serviceParticle_ctx.beginPath();
                serviceParticle_ctx.moveTo(serviceParticle_array[a].x, serviceParticle_array[a].y);
                serviceParticle_ctx.lineTo(serviceParticle_array[b].x, serviceParticle_array[b].y);
                serviceParticle_ctx.stroke();
            }
        }
    }
}

// === Partikülleri oluştur ===
function serviceParticle_init(count = 60) {
    serviceParticle_array = [];
    for (let i = 0; i < count; i++) {
        serviceParticle_array.push(new serviceParticle_Particle());
    }
}

// === Animasyon döngüsü ===
function serviceParticle_animate() {
    serviceParticle_ctx.clearRect(0, 0, serviceParticle_canvas.width, serviceParticle_canvas.height);
    serviceParticle_array.forEach(p => {
        p.update();
        p.draw();
    });
    serviceParticle_connect();
    serviceParticle_animationId = requestAnimationFrame(serviceParticle_animate);
}

// === Intersection Observer ===
const serviceParticle_section = document.getElementById('service-section');
const serviceParticle_observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !serviceParticle_isRunning) {
                serviceParticle_init();
                serviceParticle_animate();
                serviceParticle_isRunning = true;
            } else if (!entry.isIntersecting && serviceParticle_isRunning) {
                cancelAnimationFrame(serviceParticle_animationId);
                serviceParticle_ctx.clearRect(0, 0, serviceParticle_canvas.width, serviceParticle_canvas.height);
                serviceParticle_isRunning = false;
            }
        });
    },
    { threshold: 0.3 }
);

serviceParticle_observer.observe(serviceParticle_section);

/* === TRUST SECTION POLYGON ANIMATION === */
const trustCanvas = document.getElementById("trust-canvas");
const trustCtx = trustCanvas.getContext("2d");
let trustPolygons = [];
let trustAnimationFrame;

function resizeTrustCanvas() {
    trustCanvas.width = trustCanvas.offsetWidth;
    trustCanvas.height = trustCanvas.offsetHeight;
}
window.addEventListener("resize", resizeTrustCanvas);
resizeTrustCanvas();

class Polygon {
    constructor(x, y, sides, radius, speed, color) {
        this.x = x;
        this.y = y;
        this.sides = sides;
        this.radius = radius;
        this.angle = Math.random() * Math.PI * 2;
        this.rotation = Math.random() * Math.PI * 2;
        this.speed = speed;
        this.color = color;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.beginPath();

        for (let i = 0; i < this.sides; i++) {
            const theta = (i / this.sides) * Math.PI * 2;
            const px = Math.cos(theta) * this.radius;
            const py = Math.sin(theta) * this.radius;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }

        ctx.closePath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
    }

    update() {
        this.rotation += this.rotationSpeed;
        this.y += Math.sin(this.angle) * this.speed;
        this.x += Math.cos(this.angle) * this.speed;

        // Yavaşça kenarlardan geri dön
        if (this.x < -100) this.x = trustCanvas.width + 100;
        if (this.x > trustCanvas.width + 100) this.x = -100;
        if (this.y < -100) this.y = trustCanvas.height + 100;
        if (this.y > trustCanvas.height + 100) this.y = -100;
    }
}

function initTrustPolygons() {
    trustPolygons = [];
    const colors = ["rgba(255,77,77,0.2)", "rgba(255,255,255,0.08)"];
    for (let i = 0; i < 15; i++) {
        const x = Math.random() * trustCanvas.width;
        const y = Math.random() * trustCanvas.height;
        const sides = Math.floor(Math.random() * 3) + 3; // 3–6 kenar
        const radius = Math.random() * 40 + 20;
        const speed = Math.random() * 0.5 + 0.2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        trustPolygons.push(new Polygon(x, y, sides, radius, speed, color));
    }
}

function animateTrustPolygons() {
    trustCtx.clearRect(0, 0, trustCanvas.width, trustCanvas.height);
    trustPolygons.forEach((p) => {
        p.update();
        p.draw(trustCtx);
    });
    trustAnimationFrame = requestAnimationFrame(animateTrustPolygons);
}

/* Scroll ile aktif etme */
const trustSection = document.getElementById("trust-section");
const trustObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            initTrustPolygons();
            animateTrustPolygons();
        } else {
            cancelAnimationFrame(trustAnimationFrame);
        }
    });
}, { threshold: 0.1 });

trustObserver.observe(trustSection);

//cta
const ctaCanvas = document.getElementById('cta-canvas');
const ctx = ctaCanvas.getContext('2d');

let particles = [];
let animationId;
let isAnimating = false;

function resizeCanvas() {
    ctaCanvas.width = ctaCanvas.offsetWidth;
    ctaCanvas.height = ctaCanvas.offsetHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * ctaCanvas.width;
        this.y = Math.random() * ctaCanvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = (Math.random() - 0.5) * 1.2;
        this.speedY = (Math.random() - 0.5) * 1.2;
        this.color = 'rgba(255,255,255,0.6)';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > ctaCanvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > ctaCanvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.fill();
    }
}

function initParticles(count = 20) {
    particles = [];
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, ctaCanvas.width, ctaCanvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    animationId = requestAnimationFrame(animate);
}

// 🔸 Intersection Observer
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Görünür olduğunda animasyonu başlat
            if (!isAnimating) {
                isAnimating = true;
                initParticles();
                animate();
            }
        } else {
            // Görünür değilken animasyonu durdur
            if (isAnimating) {
                isAnimating = false;
                cancelAnimationFrame(animationId);
                ctx.clearRect(0, 0, ctaCanvas.width, ctaCanvas.height);
            }
        }
    });
}, {
    threshold: 0.2 // %20 görünür olunca tetiklenir
});

// Observer'ı başlat
observer.observe(ctaCanvas);



// === GALERİ 
const gallerySwiper = new Swiper('.gallery-swiper', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    autoplay: {
        delay: 6000,
        disableOnInteraction: true, // 📌 kullanıcı kaydırınca durur
    },
    speed: 1200,
    slidesPerView: 1,
    spaceBetween: 30,
});
// Swiper oluşturulduktan sonra ekle
const gallerySection = document.querySelector('.gallery-section');
if (gallerySection) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    gallerySwiper.autoplay.start();
                } else {
                    gallerySwiper.autoplay.stop();
                }
            });
        },
        { threshold: 0.2 } // %20 görünürlükte tetiklenir
    );

    observer.observe(gallerySection);
}

// galeri canvası
const movingCanvas = document.getElementById('movingLinesCanvas');
const movingCtx = movingCanvas.getContext('2d');

// Canvas boyutlandırma
function adjustMovingCanvas() {
    movingCanvas.width = movingCanvas.offsetWidth;
    movingCanvas.height = movingCanvas.offsetHeight;
}
adjustMovingCanvas();
window.addEventListener('resize', adjustMovingCanvas);

// Çizgi objelerini oluştur
const movingLinesArray = [];
for (let i = 0; i < 30; i++) {
    movingLinesArray.push({
        posX: Math.random() * movingCanvas.width,
        posY: Math.random() * movingCanvas.height,
        lineLength: 50 + Math.random() * 100,
        speedY: 0.2 + Math.random() * 0.5,
        strokeColor: `rgba(255,77,77,0.4)` // glow yok
    });
}

// Animasyon fonksiyonu
let movingAnimationId;
function animateMovingLines() {
    movingCtx.clearRect(0, 0, movingCanvas.width, movingCanvas.height);

    movingLinesArray.forEach(line => {
        movingCtx.beginPath();
        movingCtx.moveTo(line.posX, line.posY);
        movingCtx.lineTo(line.posX, line.posY + line.lineLength);
        movingCtx.strokeStyle = line.strokeColor;
        movingCtx.lineWidth = 1;
        movingCtx.stroke();

        // Hareket
        line.posY += line.speedY;
        if (line.posY > movingCanvas.height) line.posY = -line.lineLength;
    });

    movingAnimationId = requestAnimationFrame(animateMovingLines);
}

// === Intersection Observer ===
const movingCanvasObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Canvas görünür → animasyonu başlat
            animateMovingLines();
        } else {
            // Canvas görünür değil → animasyonu durdur ve temizle
            cancelAnimationFrame(movingAnimationId);
            movingCtx.clearRect(0, 0, movingCanvas.width, movingCanvas.height);
        }
    });
}, { threshold: 0.1 });

// Canvas’ı gözlemle
movingCanvasObserver.observe(movingCanvas);





// Lightbox başlat
const galleryLightbox = GLightbox({
    selector: '.glightbox',
    loop: true, // ileri-geri geçiş
    touchNavigation: true,
    autoplayVideos: false,
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

