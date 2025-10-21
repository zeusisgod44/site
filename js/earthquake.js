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

// nedir
// Observer ile scroll animasyonu
const depremElements = document.querySelectorAll(".deprem-title, .deprem-text");

const depremObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal");
            }
        });
    },
    {
        threshold: 0.2,
    }
);

depremElements.forEach((el) => depremObserver.observe(el));

// ============================
// Deprem Canvas Partikülleri + Observer
// ============================
const depremCanvas = document.getElementById("depremCanvas");
const depremCtx = depremCanvas.getContext("2d");

let depremW, depremH;
let depremParticles = [];
let depremAnimationId = null;
let depremActive = false;

// Canvas boyutunu ayarla
function resizeDepremCanvas() {
    depremW = depremCanvas.width = window.innerWidth;
    depremH = depremCanvas.height = document.querySelector(".deprem-nedir-section").offsetHeight;
}
window.addEventListener("resize", resizeDepremCanvas);
resizeDepremCanvas();

// Parçacık sınıfı
class DepremParticle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * depremW;
        this.y = Math.random() * depremH;
        this.size = Math.random() * 2 + 1;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.alpha = Math.random() * 0.5 + 0.3;
    }
    update() {
        this.y += this.speedY;
        if (this.y > depremH) this.reset();
    }
    draw() {
        depremCtx.beginPath();
        depremCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        depremCtx.fillStyle = `rgba(255, 77, 77, ${this.alpha})`;
        depremCtx.fill();
    }
}

// Parçacıkları oluştur
function createDepremParticles(count = 100) {
    depremParticles = [];
    for (let i = 0; i < count; i++) {
        depremParticles.push(new DepremParticle());
    }
}
createDepremParticles();

// Animasyon fonksiyonu
function animateDepremParticles() {
    if (!depremActive) return;
    depremCtx.clearRect(0, 0, depremW, depremH);
    depremParticles.forEach((p) => {
        p.update();
        p.draw();
    });
    depremAnimationId = requestAnimationFrame(animateDepremParticles);
}

// Observer tanımı
const depremSection = document.querySelector(".deprem-nedir-section");
const depremObserverCanvas = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                depremActive = true;
                cancelAnimationFrame(depremAnimationId);
                animateDepremParticles();
            } else {
                depremActive = false;
                cancelAnimationFrame(depremAnimationId);
                depremCtx.clearRect(0, 0, depremW, depremH);
            }
        });
    },
    { threshold: 0.2 } // %20 görünür olunca çalışır
);

// Section’u gözlemle
depremObserverCanvas.observe(depremSection);



// ============================
// Güçlendirme Canvas Geometrik Efekt + Observer
// ============================
const guclCanvas = document.getElementById("guclendirmeCanvas");
const guclCtx = guclCanvas.getContext("2d");

let guclW, guclH, guclShapes = [], guclActive = false, guclAnim;

function resizeGucl() {
    guclW = guclCanvas.width = window.innerWidth;
    guclH = guclCanvas.height = document.querySelector(".guclendirme-section").offsetHeight;
}
window.addEventListener("resize", resizeGucl);
resizeGucl();

class GuclShape {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * guclW;
        this.y = Math.random() * guclH;
        this.size = Math.random() * 20 + 10;
        this.speed = Math.random() * 0.3 + 0.1;
        this.type = Math.random() > 0.5 ? "circle" : "triangle";
        this.alpha = Math.random() * 0.4 + 0.2;
    }
    update() {
        this.y -= this.speed;
        if (this.y < -this.size) this.reset();
    }
    draw() {
        guclCtx.save();
        guclCtx.globalAlpha = this.alpha;
        guclCtx.strokeStyle = "#ff4d4d";
        guclCtx.lineWidth = 1.2;
        guclCtx.beginPath();
        if (this.type === "circle") {
            guclCtx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        } else {
            guclCtx.moveTo(this.x, this.y - this.size / 2);
            guclCtx.lineTo(this.x - this.size / 2, this.y + this.size / 2);
            guclCtx.lineTo(this.x + this.size / 2, this.y + this.size / 2);
            guclCtx.closePath();
        }
        guclCtx.stroke();
        guclCtx.restore();
    }
}

function createGuclShapes(count = 25) {
    guclShapes = [];
    for (let i = 0; i < count; i++) guclShapes.push(new GuclShape());
}
createGuclShapes();

function animateGucl() {
    if (!guclActive) return;
    guclCtx.clearRect(0, 0, guclW, guclH);
    guclShapes.forEach((s) => {
        s.update();
        s.draw();
    });
    guclAnim = requestAnimationFrame(animateGucl);
}

// Observer
const guclSection = document.querySelector(".guclendirme-section");
const guclObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                guclActive = true;
                guclSection.classList.add("guclendirme-visible");
                cancelAnimationFrame(guclAnim);
                animateGucl();
            } else {
                guclActive = false;
                guclSection.classList.remove("guclendirme-visible");
                cancelAnimationFrame(guclAnim);
                guclCtx.clearRect(0, 0, guclW, guclH);
            }
        });
    },
    { threshold: 0.3 }
);

guclObserver.observe(guclSection);


// ===== Scroll Animasyon için Observer =====
const kdSectionUnique = document.querySelector(".kentsel-donusum-section");
const kdItemsUnique = kdSectionUnique.querySelectorAll(".kd-item");

const kdObserverUnique = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                kdSectionUnique.classList.add("kd-visible");
            }
        });
    },
    { threshold: 0.3 }
);

kdObserverUnique.observe(kdSectionUnique);

// ===== Canvas Partiküller =====
const kdCanvasUnique = document.getElementById("kdCanvas");
const kdCtxUnique = kdCanvasUnique.getContext("2d");
let kdCWUnique, kdCHUnique;
let kdParticlesUnique = [];

function kdResizeCanvasUnique() {
    kdCWUnique = kdCanvasUnique.width = window.innerWidth;
    kdCHUnique = kdCanvasUnique.height = kdSectionUnique.offsetHeight;
}
window.addEventListener("resize", kdResizeCanvasUnique);
kdResizeCanvasUnique();

// Partikül oluştur
function kdCreateParticlesUnique(num = 80) {
    kdParticlesUnique = [];
    for (let i = 0; i < num; i++) {
        kdParticlesUnique.push({
            x: Math.random() * kdCWUnique,
            y: Math.random() * kdCHUnique,
            radius: Math.random() * 3 + 1,
            dx: (Math.random() - 0.5) * 0.5,
            dy: (Math.random() - 0.5) * 0.5,
            alpha: Math.random() * 0.5 + 0.3
        });
    }
}
kdCreateParticlesUnique();

function kdAnimateParticlesUnique() {
    kdCtxUnique.clearRect(0, 0, kdCWUnique, kdCHUnique);
    kdParticlesUnique.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > kdCWUnique) p.dx *= -1;
        if (p.y < 0 || p.y > kdCHUnique) p.dy *= -1;

        kdCtxUnique.beginPath();
        kdCtxUnique.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        kdCtxUnique.fillStyle = `rgba(255,77,77,${p.alpha})`;
        kdCtxUnique.fill();
    });
    requestAnimationFrame(kdAnimateParticlesUnique);
}
kdAnimateParticlesUnique();

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

