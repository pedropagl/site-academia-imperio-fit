const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

const sections = document.querySelectorAll(".section, .card, .plan-card, .testimonial");

sections.forEach((section) => {
  section.classList.add("reveal");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.12,
  }
);

sections.forEach((section) => {
  observer.observe(section);
});

// Scroll spy: highlight current section link
const navSections = document.querySelectorAll("main .section[id]");

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  {
    rootMargin: "-50% 0px -50% 0px",
  }
);

navSections.forEach((section) => {
  spyObserver.observe(section);
});

// Back to top button
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 400);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const form = document.getElementById("contactForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const goal = document.getElementById("goal").value;

  message.classList.remove("success");

  if (!name || !phone || !goal) {
    message.textContent = "Preencha todos os campos antes de enviar.";
    return;
  }

  const phoneDigits = phone.replace(/\D/g, "");
  if (phoneDigits.length < 10) {
    message.textContent = "Informe um telefone válido com DDD.";
    return;
  }

  message.textContent = "Interesse registrado! Em um site real, isso seria enviado para a academia.";
  message.classList.add("success");
  form.reset();
});
