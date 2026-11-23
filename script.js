const intro = document.getElementById("intro");
const app = document.getElementById("app");

function startSite() {
  if (!intro || !app || intro.classList.contains("hidden")) return;
  const introEnvelope = document.getElementById("introEnvelope");
  const introHint = document.getElementById("introEnvelopeHint");
  const openButton = document.getElementById("skipIntro");
  if (introEnvelope?.classList.contains("opened")) return;
  introEnvelope?.classList.add("opened");
  if (introHint) introHint.textContent = "your surprise is waiting...";
  if (openButton) openButton.textContent = "WELCOME";
  setTimeout(() => {
    intro.style.opacity = "0";
    setTimeout(() => {
      intro.classList.add("hidden");
      app.classList.remove("hidden");
    }, 650);
  }, 1050);
}

document.getElementById("skipIntro")?.addEventListener("click", startSite);

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
  const player = document.getElementById("youtubeAudio");
  const button = document.getElementById("playMain");
  if (!player || !button) return;

  if (!player.classList.contains("is-visible")) {
    player.innerHTML = `<iframe
      src="https://www.youtube-nocookie.com/embed/UppBA4u9pyQ?autoplay=1&rel=0&playsinline=1"
      title="LANY - you! (official lyric video)"
      allow="autoplay; encrypted-media; picture-in-picture; web-share"
      allowfullscreen>
    </iframe>`;
    player.classList.add("is-visible");
    button.textContent = "TUTUP PLAYER";
    player.scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    player.innerHTML = "";
    player.classList.remove("is-visible");
    button.textContent = "▶ PUTAR LAGU";
  }
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


/* ENVELOPE REVEAL */
const envelopeButton = document.getElementById("openEnvelope");
const envelopeVisual = document.getElementById("envelopeVisual");
const envelopeHint = document.getElementById("envelopeHint");
const loveLetter = document.getElementById("loveLetter");

envelopeButton?.addEventListener("click", () => {
  const isOpen = envelopeVisual?.classList.toggle("open") ?? false;
  envelopeButton.setAttribute("aria-expanded", String(isOpen));
  envelopeButton.textContent = isOpen ? "CLOSE THE ENVELOPE" : "OPEN THE ENVELOPE";
  if (loveLetter) loveLetter.setAttribute("aria-hidden", String(!isOpen));
  if (envelopeHint) envelopeHint.textContent = isOpen
    ? "a little note, made just for you"
    : "tap the envelope to read your letter";
});
