// ===== Show Surprise with Crazy Orbit =====
function showSurprise() {
    const box = document.getElementById("surpriseBox");
    const buttonArea = document.querySelector(".buttonArea");

    // Show surprise box and bring to front
    box.style.display = "block";
    box.style.zIndex = 1004;
    buttonArea.style.zIndex = 1002;
    document.getElementById("mainTitle").innerText = "You're The Best Dad ❤️";

    // Screen glow
    document.body.classList.add("surpriseGlow");
    setTimeout(() => document.body.classList.remove("surpriseGlow"), 1000);

    // Floating hearts
    for (let i = 0; i < 25; i++) {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * window.innerWidth + "px";
        heart.style.bottom = "0px";
        heart.style.fontSize = (20 + Math.random() * 30) + "px";
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
    }

    // Crazy orbit gallery photos
    const photos = document.querySelectorAll('.artGrid img');
    const centerX = window.innerWidth / 2;
    const centerY = box.getBoundingClientRect().top + box.offsetHeight / 2 + window.scrollY;

    photos.forEach((photo, index) => {
        const angle = (index / photos.length) * Math.PI * 2;
        const radius = 300 + Math.random() * 100; // expand farther for crazy effect
        const x = centerX + radius * Math.cos(angle) - photo.offsetWidth / 2;
        const y = centerY + radius * Math.sin(angle) - photo.offsetHeight / 2;

        photo.classList.add('orbiting');
        photo.style.position = "relative";
        photo.style.zIndex = 1000;

        // Apply crazy transform with spin
        photo.style.transition = "transform 2s ease-out";
        photo.style.transform = `translate(${x - photo.getBoundingClientRect().left}px, ${y - photo.getBoundingClientRect().top}px) scale(1.4) rotate(${Math.random() * 360}deg)`;
        photo.style.boxShadow = "0 0 35px rgba(255,200,220,1)";
    });

    // Reset to normal after 2 seconds
    setTimeout(() => {
        photos.forEach(photo => {
            if(photo.classList.contains('orbiting')){
                photo.style.transform = "translate(0px,0px) scale(1) rotate(0deg)";
                photo.style.boxShadow = "0 0 10px rgba(199,214,255,0.5)";
            }
        });
    }, 2000);
}
// ===== Reset gallery photos =====
function resetGalleryOrbit() {
    const photos = document.querySelectorAll('.artGrid img.orbiting');
    photos.forEach(photo => {
        photo.style.transform = "translate(0px, 0px) scale(1) rotate(0deg)";
        photo.style.boxShadow = "0 0 10px rgba(199,214,255,0.5)";
        photo.style.zIndex = 1; // back to default layer
        photo.classList.remove('orbiting');
    });
}

// Reset orbit when user scrolls or clicks outside surprise box
window.addEventListener('scroll', resetGalleryOrbit);
document.addEventListener('click', e => {
    const box = document.getElementById("surpriseBox");
    const buttonArea = document.querySelector(".buttonArea");
    if (!box.contains(e.target) && !buttonArea.contains(e.target)) resetGalleryOrbit();
});

// ===== Lightbox Functionality =====
const images = document.querySelectorAll('.artGrid img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('closeBtn');

images.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', e => {
    if (e.target === lightbox) lightbox.style.display = 'none';
});

// ===== Sparkles Background =====
const canvas = document.getElementById('sparkleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const particles = [];
for (let i = 0; i < 120; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) / 2,
        dy: (Math.random() - 0.5) / 2
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(199,214,255,0.7)';
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

// ===== Background Music =====
const bgMusic = document.getElementById('myAudio');
const muteBtn = document.getElementById('muteBtn');

function startMusic() {
    bgMusic.play().catch(err => console.log(err));
    window.removeEventListener('click', startMusic);
    window.removeEventListener('scroll', startMusic);
}

window.addEventListener('click', startMusic);
window.addEventListener('scroll', startMusic);

muteBtn.addEventListener('click', () => {
    if (bgMusic.muted) {
        bgMusic.muted = false;
        muteBtn.textContent = "🔊";
    } else {
        bgMusic.muted = true;
        muteBtn.textContent = "🔇";
    }
});

// ===== Smooth Parallax =====
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    document.querySelectorAll('[data-speed]').forEach(el => {
        const speed = parseFloat(el.getAttribute('data-speed'));
        const y = scrollY * speed * 0.15;
        el.style.transform = `translateY(${y}px)`;
    });
});