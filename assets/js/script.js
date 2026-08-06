// 1. Typewriter effect for the hero terminal
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
                // Pause on the complete phrase before erasing it
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

// 2. Reveal elements as they scroll into view
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target); // Animate once, then stop tracking
        }
    });
}, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// 3. Solid header background once the page is scrolled
const header = document.querySelector(".site-header");

if (header) {
    const syncHeader = () => header.classList.toggle("scrolled", window.scrollY > 20);
    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
}
