const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
// Animaciones al hacer scroll
const reveals = document.querySelectorAll('.reveal, .fade-left, .fade-right, .scale-in');

function revealOnScroll() {
    const trigger = window.innerHeight * 0.85;

    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < trigger) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();
