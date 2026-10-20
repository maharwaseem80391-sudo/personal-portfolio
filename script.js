// 1. Mobile navigation menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the mobile menu after clicking a navigation link
document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.textContent = "☰";
  });
});

// 2. Animated role text
const roleText = document.getElementById("roleText");
const roles = [
  "Web Developer",
  "IT Student",
  "Python Learner",
  "Future IT Professional"
];

let roleIndex = 0;

function changeRole() {
  roleText.style.opacity = "0";

  setTimeout(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleText.textContent = roles[roleIndex];
    roleText.style.opacity = "1";
  }, 300);
}

roleText.style.transition = "opacity 0.3s ease";
setInterval(changeRole, 2500);

// 3. Project category filters
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    projectCards.forEach((card) => {
      const category = card.dataset.category;
      const shouldShow =
        selectedFilter === "all" || category === selectedFilter;

      card.hidden = !shouldShow;
    });
  });

  button.setAttribute(
    "aria-pressed",
    String(button.classList.contains("active"))
  );
});

// 4. Contact form: prepare a message in the visitor's email app
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const senderName = document.getElementById("senderName").value.trim();
  const senderEmail = document.getElementById("senderEmail").value.trim();
  const senderMessage = document.getElementById("senderMessage").value.trim();

  if (!senderName || !senderEmail || !senderMessage) {
    formNote.textContent = "Please complete all fields.";
    return;
  }

  const subject = encodeURIComponent(
    "Portfolio contact from " + senderName
  );

  const body = encodeURIComponent(
    "Name: " + senderName +
    "\nEmail: " + senderEmail +
    "\n\nMessage:\n" + senderMessage
  );

  formNote.textContent =
    "Opening your email app. Review the message and send it there.";

  window.location.href =
    "mailto:YOUR_EMAIL@example.com?subject=" + subject + "&body=" + body;
});

// 5. Automatically display the current year
document.getElementById("year").textContent = new Date().getFullYear();