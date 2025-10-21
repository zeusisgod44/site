
//navbar scroll dalga
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight * 0.7) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("policyCanvas");
    const ctx = canvas.getContext("2d");

    let particles = [];
    let animationFrame;
    let active = false;

    // Canvas boyutlarını güncelle
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Basit partikül sınıfı
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
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
            ctx.fillStyle = "rgba(255,255,255,0.5)";
            ctx.fill();
        }
    }

    // Partikülleri oluştur
    function initParticles() {
        particles = [];
        for (let i = 0; i < 80; i++) {
            particles.push(new Particle());
        }
    }

    // Animasyon döngüsü
    function animate() {
        if (!active) return; // görünmüyorsa durdur
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        animationFrame = requestAnimationFrame(animate);
    }

    // Intersection Observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                active = true;
                initParticles();
                animate();
            } else {
                active = false;
                cancelAnimationFrame(animationFrame);
            }
        });
    }, { threshold: 0.1 });

    observer.observe(document.getElementById("gizlilik-politikasi"));
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

