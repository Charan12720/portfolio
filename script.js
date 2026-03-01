// Typing Effect
const words = ["Cloud Enthusiast", "Networking Learner", "Java Developer"];
let i = 0, j = 0, current = "", isDeleting = false;

function typeEffect() {
    current = words[i];
    document.getElementById("typing").textContent = current.substring(0, j);

    if (!isDeleting && j < current.length) {
        j++;
        setTimeout(typeEffect, 100);
    } else if (isDeleting && j > 0) {
        j--;
        setTimeout(typeEffect, 50);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) i = (i + 1) % words.length;
        setTimeout(typeEffect, 800);
    }
}
typeEffect();

// Dark/Light Mode Toggle
document.getElementById("themeToggle").onclick = function () {
    document.body.classList.toggle("light");
};

// Scroll Reveal
function reveal() {
    let reveals = document.querySelectorAll(".reveal");
    for (let r of reveals) {
        let windowHeight = window.innerHeight;
        let elementTop = r.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            r.classList.add("active");
        }
    }
}

// Smooth background blur transition on scroll
const animatedSections = document.querySelectorAll("#home, #about, #skills, #projects, #contact");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let ticking = false;

function updateScrollEffects() {
    reveal();

    if (!reduceMotion) {
        const viewportCenter = window.innerHeight / 2;

        for (const section of animatedSections) {
            const rect = section.getBoundingClientRect();
            const sectionCenter = rect.top + rect.height / 2;
            const distance = Math.abs(sectionCenter - viewportCenter);
            const normalized = Math.min(distance / (window.innerHeight * 0.7), 1);
            const blur = normalized * 3.2;

            section.style.setProperty("--bg-blur", `${blur.toFixed(2)}px`);
        }
    }

    ticking = false;
}

function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
onScroll();
