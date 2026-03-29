const TOUR_DATE = new Date("2026-05-06T00:00:00");

function initWelcomeScreen() {
  const screen = document.getElementById("welcome-screen");
  const enterBtn = document.getElementById("enter-site-btn");

  if (!screen || !enterBtn) return;

  document.body.classList.add("no-scroll");
  enterBtn.addEventListener("click", () => {
    screen.classList.add("hidden");
    screen.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  });
}

function initMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function updateCountdown() {
  const target = document.getElementById("tour-countdown");
  if (!target) return;

  const now = new Date();
  const diff = TOUR_DATE - now;

  if (diff <= 0) {
    target.textContent = "Тур уже стартовал";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  target.textContent = `${days} дн ${hours} ч ${minutes} мин`;
}

function initForm() {
  const form = document.getElementById("booking-form");
  const message = document.getElementById("form-message");

  if (!form || !message) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");

    if (!name.value.trim() || !phone.value.trim() || !email.value.trim()) {
      message.textContent = "Пожалуйста, заполните все поля.";
      message.style.color = "#b54027";
      return;
    }

    message.textContent = "Спасибо! Заявка принята, мы свяжемся с вами в ближайшее время.";
    message.style.color = "#1f6a42";
    form.reset();
  });
}

initWelcomeScreen();
initMobileMenu();
initForm();
updateCountdown();
setInterval(updateCountdown, 30000);
