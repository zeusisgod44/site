
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

const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");

let w, h, grid = [], angle = 0;
let animating = true; // animasyon kontrolü

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function createGrid() {
    const cols = 25;
    const rows = 25;
    const spacing = 40;

    grid = [];
    for (let y = -rows / 2; y < rows / 2; y++) {
        for (let x = -cols / 2; x < cols / 2; x++) {
            grid.push({ x: x * spacing, y: y * spacing, z: 0 });
        }
    }
}
createGrid();

function draw() {
    if (!animating) return requestAnimationFrame(draw); // animasyon durduysa boş döngü
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(w / 2, h / 2 + 100);

    angle += 0.002;

    for (let i = 0; i < grid.length; i++) {
        const p = grid[i];
        const z = Math.sin(Math.sqrt(p.x ** 2 + p.y ** 2) / 100 - angle) * 40;

        const perspective = 200 / (200 + z);
        const x2d = p.x * perspective;
        const y2d = p.y * perspective;

        const alpha = Math.max(0, perspective - 0.5);

        ctx.fillStyle = `rgba(255, 80, 80, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x2d, y2d, 1.8, 0, Math.PI * 2);
        ctx.fill();

        // çizgiler (wireframe bağlantıları)
        if (i % 25 !== 24) {
            const next = grid[i + 1];
            const z2 = Math.sin(Math.sqrt(next.x ** 2 + next.y ** 2) / 100 - angle) * 40;
            const perspective2 = 200 / (200 + z2);
            const x2 = next.x * perspective2;
            const y2 = next.y * perspective2;

            ctx.strokeStyle = `rgba(255, 80, 80, ${alpha * 0.6})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x2d, y2d);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    }
    ctx.restore();
    requestAnimationFrame(draw);
}
draw();

// ================== OBSERVER ==================
const heroSection = document.querySelector(".hero");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            animating = entry.isIntersecting; // görünüyorsa true, görünmüyorsa false
            if (animating) draw(); // tekrar görünürse animasyonu başlat
        });
    },
    { threshold: 0.1 } // %10 göründüğünde tetiklenir
);

//2. canvas

observer.observe(heroSection);
const aboutCanvasUnique = document.getElementById('aboutCanvas');
const ctxUnique = aboutCanvasUnique.getContext('2d');

let canvasWidthUnique, canvasHeightUnique;
let particlesUnique = [];
let animationIdUnique;

// Canvas boyutunu ayarlayan fonksiyon
function resizeCanvasUnique() {
    canvasWidthUnique = aboutCanvasUnique.width = aboutCanvasUnique.offsetWidth;
    canvasHeightUnique = aboutCanvasUnique.height = aboutCanvasUnique.offsetHeight;
}
window.addEventListener('resize', resizeCanvasUnique);
resizeCanvasUnique();

// Partikülleri oluştur
function createParticlesUnique() {
    particlesUnique = [];
    for (let i = 0; i < 100; i++) {
        particlesUnique.push({
            x: Math.random() * canvasWidthUnique,
            y: Math.random() * canvasHeightUnique,
            r: Math.random() * 2 + 1,
            dx: (Math.random() - 0.5) * 0.5,
            dy: (Math.random() - 0.5) * 0.5
        });
    }
}
createParticlesUnique();

// Animasyon fonksiyonu
function animateParticlesUnique() {
    ctxUnique.clearRect(0, 0, canvasWidthUnique, canvasHeightUnique);
    ctxUnique.fillStyle = 'rgba(255, 77, 77, 0.7)';
    ctxUnique.strokeStyle = 'rgba(255, 77, 77, 0.3)';

    particlesUnique.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvasWidthUnique) p.dx *= -1;
        if (p.y < 0 || p.y > canvasHeightUnique) p.dy *= -1;

        ctxUnique.beginPath();
        ctxUnique.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctxUnique.fill();
    });

    // Partikülleri birbirine bağlayan çizgiler
    for (let i = 0; i < particlesUnique.length; i++) {
        for (let j = i + 1; j < particlesUnique.length; j++) {
            let dx = particlesUnique[i].x - particlesUnique[j].x;
            let dy = particlesUnique[i].y - particlesUnique[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                ctxUnique.beginPath();
                ctxUnique.moveTo(particlesUnique[i].x, particlesUnique[i].y);
                ctxUnique.lineTo(particlesUnique[j].x, particlesUnique[j].y);
                ctxUnique.stroke();
            }
        }
    }

    animationIdUnique = requestAnimationFrame(animateParticlesUnique);
}

// Intersection Observer ile animasyonu başlat
const aboutSectionUnique = document.querySelector('#hakkimizda');
const observerUnique = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (!animationIdUnique) {
                animateParticlesUnique();
            }
        } else {
            cancelAnimationFrame(animationIdUnique);
            animationIdUnique = null;
        }
    });
}, { threshold: 0.3 });

observerUnique.observe(aboutSectionUnique);

//vizyon misyon
// Canvas ve context
const vmCanvas = document.getElementById('vmCanvas');
const vmCtx = vmCanvas.getContext('2d');

let vmWidth, vmHeight;
let shapes = [];

// Canvas boyutu
function resizeVMCanvas() {
    vmWidth = vmCanvas.width = vmCanvas.offsetWidth;
    vmHeight = vmCanvas.height = vmCanvas.offsetHeight;
}
window.addEventListener('resize', resizeVMCanvas);
resizeVMCanvas();

// Geometrik şekilleri oluştur
function createShapes() {
    shapes = [];
    const types = ['triangle', 'square', 'circle'];
    for (let i = 0; i < 25; i++) { // Şekil sayısı azaltıldı
        shapes.push({
            x: Math.random() * vmWidth,
            y: Math.random() * vmHeight,
            size: Math.random() * 25 + 10,
            type: types[Math.floor(Math.random() * types.length)],
            dx: (Math.random() - 0.5) * 0.3, // Hız azaltıldı
            dy: (Math.random() - 0.5) * 0.3,
            color: `rgba(255,77,77,${Math.random() * 0.3 + 0.2})`
        });
    }
}
createShapes();

// Şekil çizme fonksiyonu
function drawShape(shape) {
    vmCtx.fillStyle = shape.color;
    vmCtx.beginPath();
    switch (shape.type) {
        case 'circle':
            vmCtx.arc(shape.x, shape.y, shape.size / 2, 0, Math.PI * 2);
            vmCtx.fill();
            break;
        case 'square':
            vmCtx.fillRect(shape.x - shape.size / 2, shape.y - shape.size / 2, shape.size, shape.size);
            break;
        case 'triangle':
            vmCtx.moveTo(shape.x, shape.y - shape.size / 2);
            vmCtx.lineTo(shape.x - shape.size / 2, shape.y + shape.size / 2);
            vmCtx.lineTo(shape.x + shape.size / 2, shape.y + shape.size / 2);
            vmCtx.closePath();
            vmCtx.fill();
            break;
    }
}

// Animasyon fonksiyonu
let vmAnimationId;
function animateShapes() {
    vmCtx.clearRect(0, 0, vmWidth, vmHeight);
    shapes.forEach(s => {
        s.x += s.dx;
        s.y += s.dy;

        // Canvas sınırında zıplama
        if (s.x < 0 || s.x > vmWidth) s.dx *= -1;
        if (s.y < 0 || s.y > vmHeight) s.dy *= -1;

        drawShape(s);
    });

    vmAnimationId = requestAnimationFrame(animateShapes);
}

// Intersection Observer ile animasyonu başlat
const vmSection = document.querySelector('#vizyon-misyon');
const vmObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (!vmAnimationId) animateShapes();
        } else {
            cancelAnimationFrame(vmAnimationId);
            vmAnimationId = null;
        }
    });
}, { threshold: 0.2 });

vmObserver.observe(vmSection);
//cta
const ctaCanvas = document.getElementById('ctaCanvas');
const ctaCtx = ctaCanvas.getContext('2d');

let ctaWidth, ctaHeight;
let ctaParticles = [];

function resizeCTACanvas() {
    ctaWidth = ctaCanvas.width = ctaCanvas.offsetWidth;
    ctaHeight = ctaCanvas.height = ctaCanvas.offsetHeight;
}
window.addEventListener('resize', resizeCTACanvas);
resizeCTACanvas();

function createCTAParticles() {
    ctaParticles = [];
    for (let i = 0; i < 90; i++) {
        ctaParticles.push({
            x: Math.random() * ctaWidth,
            y: Math.random() * ctaHeight,
            r: Math.random() * 3 + 1,
            dx: (Math.random() - 0.5) * 0.2,
            dy: (Math.random() - 0.5) * 0.2,
            color: `rgba(255,77,77,${Math.random() * 0.3 + 0.2})`
        });
    }
}
createCTAParticles();

function drawCTAParticle(p) {
    ctaCtx.beginPath();
    ctaCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctaCtx.fillStyle = p.color;
    ctaCtx.fill();
}

function animateCTAParticles() {
    ctaCtx.clearRect(0, 0, ctaWidth, ctaHeight);
    ctaParticles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > ctaWidth) p.dx *= -1;
        if (p.y < 0 || p.y > ctaHeight) p.dy *= -1;

        drawCTAParticle(p);
    });

    requestAnimationFrame(animateCTAParticles);
}

// Intersection Observer ile sadece görünürken çalıştır
const ctaSection = document.querySelector('.cta-section');
const ctaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCTAParticles();
        }
    });
}, { threshold: 0.2 });

ctaObserver.observe(ctaSection);

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

