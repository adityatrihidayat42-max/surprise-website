const intro = document.getElementById("intro");
const app = document.getElementById("app");

function startSite() {
  if (!intro || !app || intro.classList.contains("hidden")) return;

  intro.style.opacity = "0";

  setTimeout(() => {
    intro.classList.add("hidden");
    app.classList.remove("hidden");
  }, 650);
}

document.getElementById("skipIntro")?.addEventListener("click", startSite);

setTimeout(startSite, 2500);

const screens = [...document.querySelectorAll(".screen")];

function showScreen(id) {
  screens.forEach(screen => {
    screen.classList.toggle("active", screen.id === id);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => showScreen(button.dataset.go));
});

document.querySelectorAll(".back").forEach(button => {
  button.addEventListener("click", () => showScreen("home"));
});

document.getElementById("openGift")?.addEventListener("click", () => {
  document.getElementById("giftNote")?.classList.toggle("show");
});

document.getElementById("playMini")?.addEventListener("click", () => {
  showScreen("playlist");
});



document.getElementById("playMain")?.addEventListener("click", () => {
  const screen = document.querySelector(".tv-screen");
  if (!screen) return;

  screen.innerHTML = `
    <iframe
      class="tv-youtube"
      src="https://www.youtube-nocookie.com/embed/UppBA4u9pyQ?autoplay=1&rel=0"
      title="LANY - you!"
      allow="autoplay; encrypted-media; picture-in-picture"
      allowfullscreen>
    </iframe>
  `;
});

const sparkle = document.querySelector(".sparkles");

if (sparkle) {
  for (let i = 0; i < 35; i++) {
    const star = document.createElement("span");
    star.textContent = "✦";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 4 + "s";
    star.style.fontSize = (6 + Math.random() * 9) + "px";
    sparkle.appendChild(star);
  }
}
