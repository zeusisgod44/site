
//navbar scroll dalga
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight * 0.7) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
//form
document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Mesajınız gönderildi! En kısa sürede dönüş yapılacaktır.');
    this.reset();
});

// ===================== FORM =====================
document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Mesajınız gönderildi! En kısa sürede dönüş yapılacaktır.');
    this.reset();
});

// ===================== CANVAS ANİMASYONU =====================
const canvas = document.getElementById('contactCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationActive = false;
let animationFrameId;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.getElementById('contact').offsetHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor(x, y, size, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const count = Math.min(100, Math.floor(canvas.width / 20));
    for (let i = 0; i < count; i++) {
        const size = Math.random() * 2 + 0.5;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speedX = (Math.random() - 0.5) * 0.3;
        const speedY = (Math.random() - 0.5) * 0.3;
        particles.push(new Particle(x, y, size, speedX, speedY));
    }
}

function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.strokeStyle = 'rgba(255,255,255,0.05)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    if (!animationActive) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    connectParticles();
    animationFrameId = requestAnimationFrame(animate);
}

// ===================== INTERSECTION OBSERVER =====================
const contactSection = document.getElementById('contact');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Fade in animasyonu
            contactSection.classList.add('visible');

            // Canvas'ı başlat
            if (!animationActive) {
                animationActive = true;
                initParticles();
                animate();
            }
        } else {
            // Görünmüyorsa animasyonu durdur
            animationActive = false;
            cancelAnimationFrame(animationFrameId);
        }
    });
}, { threshold: 0.3 }); // %30 görünürlükte tetiklenir

observer.observe(contactSection);

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

