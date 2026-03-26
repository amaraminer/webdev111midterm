// 1. STANDALONE LOGIN REDIRECT
const loginForm = document.getElementById('standaloneLoginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Professional transition effect
        document.querySelector('.glass-card').style.opacity = '0';
        setTimeout(() => {
            window.location.href = "index.html";
        }, 500);
    });
}

// 2. NAV SCROLL EFFECT
window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// 3. SCROLL REVEAL ANIMATION (Professional Way)
const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

// 4. DRAWER LOGIC
function toggleDrawer() {
    const drawer = document.getElementById('loginDrawer');
    const overlay = document.getElementById('overlay');
    drawer.classList.toggle('open');
    overlay.classList.toggle('active');
}

// 5. SMOOTH SCROLL
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function showNutrients() {
    // Pwedeng palitan ng isang magandang modal sa future
    alert("🧬 Weekly Macros:\nProtein: 210g\nCarbs: 150g\nFats: 65g\nAvg Calories: 1,850/day");
}