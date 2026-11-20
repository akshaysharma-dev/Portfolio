// ===== Theme toggle (dark / light) with saved preference =====
const themeBtn = document.getElementById("themeBtn");

function applyTheme(mode) {
  document.body.classList.toggle("light", mode === "light");
  themeBtn.textContent = mode === "light" ? "☀️" : "🌙";
}

let savedTheme = "dark";
try { savedTheme = localStorage.getItem("theme") || "dark"; } catch (e) {}
applyTheme(savedTheme);

themeBtn.addEventListener("click", () => {
  const next = document.body.classList.contains("light") ? "dark" : "light";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// ===== Mobile menu =====
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

// ===== Typing effect =====
const roles = ["CS Student", "Web Developer", "Problem Solver", "Future Software Engineer"];
const typedEl = document.getElementById("typed");
let roleIdx = 0, charIdx = 0, deleting = false;

function typeLoop() {
  const word = roles[roleIdx];
  typedEl.textContent = word.substring(0, charIdx);

  if (!deleting && charIdx < word.length) {
    charIdx++;
    setTimeout(typeLoop, 90);
  } else if (!deleting) {
    deleting = true;
    setTimeout(typeLoop, 1400);
  } else if (charIdx > 0) {
    charIdx--;
    setTimeout(typeLoop, 45);
  } else {
    deleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
    setTimeout(typeLoop, 300);
  }
}
typeLoop();

// ===== Active nav link on scroll + back-to-top button =====
const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".nav-links a");
const toTop = document.getElementById("toTop");

window.addEventListener("scroll", () => {
  let current = "home";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + current));
  toTop.classList.toggle("show", window.scrollY > 500);
});

toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ===== Scroll reveal + skill bar animation =====
document.querySelectorAll(".about-card, .timeline-item, .project-card, .chip, .contact-info, form")
  .forEach(el => el.classList.add("reveal"));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    if (entry.target.classList.contains("skill")) {
      entry.target.querySelector(".fill").style.width = entry.target.dataset.level + "%";
    }
    observer.unobserve(entry.target);
  });
}, { threshold: 0.2 });

document.querySelectorAll(".reveal, .skill").forEach(el => observer.observe(el));

// ===== Contact form validation =====
const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const successMsg = document.getElementById("formSuccess");

function setError(input, errId, msg) {
  document.getElementById(errId).textContent = msg;
  input.parentElement.classList.toggle("invalid", Boolean(msg));
  return !msg;
}

form.addEventListener("submit", e => {
  e.preventDefault();
  successMsg.textContent = "";

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const okName = setError(nameInput, "nameErr",
    name.length < 2 ? "Please enter your name (at least 2 characters)." : "");
  const okEmail = setError(emailInput, "emailErr",
    !emailPattern.test(email) ? "Please enter a valid email address." : "");
  const okMsg = setError(messageInput, "messageErr",
    message.length < 10 ? "Message should be at least 10 characters." : "");

  if (okName && okEmail && okMsg) {
    successMsg.textContent = "Thanks, " + name + "! Your message has been validated successfully.";
    form.reset();
  }
});

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();
