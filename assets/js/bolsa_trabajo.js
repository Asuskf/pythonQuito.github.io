// ============================================
// Python UIO — Bolsa de trabajo
// Script propio de la página (no interviene el sitio principal)
// ============================================

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// 1. Efecto máquina de escribir en la terminal del hero
const PHRASES = [
    "carrera = 'Tec. Superior de Desarrollo de Software'",
    "semestre_2.docente(asignatura='Programacion 2')",
    "semestre_1.docente(asignatura='Matematicas')"
];

const typewriterElement = document.getElementById("typewriter");

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

            let delay = deleting ? 26 : 58;

            if (!deleting && charIndex === phrase.length) {
                deleting = true;
                delay = 2400;
            } else if (deleting && charIndex === 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % PHRASES.length;
                delay = 400;
            }

            setTimeout(typeLoop, delay);
        }

        setTimeout(typeLoop, 700);
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
}, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// 3. Fondo sólido en el header al hacer scroll
const header = document.querySelector(".site-header");

if (header) {
    const syncHeader = () => header.classList.toggle("scrolled", window.scrollY > 20);
    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
}

// 4. Copiar el correo de postulación al portapapeles
document.querySelectorAll(".copy-btn").forEach(button => {
    button.addEventListener("click", async () => {
        const email = button.dataset.copy;
        const original = button.textContent;

        try {
            await navigator.clipboard.writeText(email);
        } catch (err) {
            // Respaldo para navegadores sin acceso al portapapeles
            const helper = document.createElement("textarea");
            helper.value = email;
            helper.setAttribute("readonly", "");
            helper.style.position = "fixed";
            helper.style.opacity = "0";
            document.body.appendChild(helper);
            helper.select();
            document.execCommand("copy");
            document.body.removeChild(helper);
        }

        button.textContent = "✓ Correo copiado";
        button.classList.add("copied");

        setTimeout(() => {
            button.textContent = original;
            button.classList.remove("copied");
        }, 2200);
    });
});
