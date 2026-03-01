// Typing Effect
const words = ["Cloud Enthusiast", "Networking Learner", "Java Developer" ,"CyberSecurity Analyst"];
const typingElement = document.getElementById("typing");
let i = 0;

function rotateWords() {
    typingElement.classList.add("is-fading");

    window.setTimeout(() => {
        i = (i + 1) % words.length;
        typingElement.textContent = words[i];
        typingElement.classList.remove("is-fading");
    }, 380);
}

typingElement.textContent = words[0];
window.setInterval(rotateWords, 2600);

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
const animatedSections = document.querySelectorAll("#home, #about, #skills, #projects, #hire, #contact");
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

// Hire form submit
const hireForm = document.getElementById("hireForm");
const hireStatus = document.getElementById("hireStatus");

if (hireForm && hireStatus) {
    hireForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        hireStatus.textContent = "Sending...";

        try {
            const formData = new FormData(hireForm);
            const response = await fetch("/api/hire", {
                method: "POST",
                body: formData
            });
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Failed to send request.");
            }

            hireStatus.textContent = "Request saved successfully.";
            hireForm.reset();
        } catch (error) {
            hireStatus.textContent = error.message || "Something went wrong.";
        }
    });
}
