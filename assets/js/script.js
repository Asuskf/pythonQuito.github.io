// 1. Efecto máquina de escribir para la terminal del hero
const PHRASES = [
    "import top_talent from python_uio",
    "pip install oportunidades",
    "comunidad.conectar(tu_talento)"
];

const typewriterElement = document.getElementById("typewriter");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (typewriterElement) {
    if (reducedMotion) {
        typewriterElement.textContent = PHRASES[0];
    } else {
        let phraseIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeLoop() {
            const phrase = PHRASES[phraseIndex];
            charIndex += deleting ? -1 : 1;
            typewriterElement.textContent = phrase.slice(0, charIndex);

            let delay = deleting ? 28 : 65;

            if (!deleting && charIndex === phrase.length) {
                deleting = true;
                delay = 2200;
            } else if (deleting && charIndex === 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % PHRASES.length;
                delay = 400;
            }

            setTimeout(typeLoop, delay);
        }

        setTimeout(typeLoop, 800);
    }
}

// 2. Revelar elementos al hacer scroll
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target); 
        }
    });
}, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// 3. Fondo sólido en el header al hacer scroll
const header = document.querySelector(".site-header");

if (header) {
    const syncHeader = () => header.classList.toggle("scrolled", window.scrollY > 20);
    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
}

// ============================================
// 4. Navegación estilo PowerPoint por Teclado
// ============================================
document.addEventListener('keydown', (e) => {
    // Teclas para avanzar (Flecha Abajo, Av. Pág, Espacio)
    const nextKeys = ['ArrowDown', 'PageDown', ' '];
    // Teclas para retroceder (Flecha Arriba, Re. Pág)
    const prevKeys = ['ArrowUp', 'PageUp'];

    if (nextKeys.includes(e.key) || prevKeys.includes(e.key)) {
        // Detiene el comportamiento de salto normal del navegador
        e.preventDefault();

        // Obtiene todas las secciones que actúan como "diapositivas"
        const slides = Array.from(document.querySelectorAll('.hero, .section'));

        let currentSlideIndex = 0;
        let minDistance = Infinity;

        // Calcula cuál es la diapositiva visible actualmente
        slides.forEach((slide, index) => {
            const rect = slide.getBoundingClientRect();
            const distance = Math.abs(rect.top);
            if (distance < minDistance) {
                minDistance = distance;
                currentSlideIndex = index;
            }
        });

        // Avanzar a la siguiente diapositiva
        if (nextKeys.includes(e.key) && currentSlideIndex < slides.length - 1) {
            slides[currentSlideIndex + 1].scrollIntoView({ behavior: 'smooth' });
        } 
        // Retroceder a la diapositiva anterior
        else if (prevKeys.includes(e.key) && currentSlideIndex > 0) {
            slides[currentSlideIndex - 1].scrollIntoView({ behavior: 'smooth' });
        }
    }
});