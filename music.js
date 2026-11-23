(() => {
  let audio, playing = false, timer;
  const beat = 0.78;
  const chords = [
    [48, 52, 55],
    [43, 47, 50],
    [45, 48, 52],
    [41, 45, 48]
  ];
  const melody = [
    [72, 76, 79, 76, 74, 76, 72, 67],
    [71, 74, 79, 74, 76, 74, 71, 67],
    [72, 76, 81, 79, 76, 74, 72, 69],
    [69, 72, 77, 76, 72, 69, 67, 65]
  ];

  function frequency(note) {
    return 440 * Math.pow(2, (note - 69) / 12);
  }

  function playNote(note, start, duration, volume, type = "sine") {
    const osc = audio.createOscillator();
    const gain = audio.createGain();

    osc.type = type;
    osc.frequency.value = frequency(note);
    gain.gain.setValueAtTime(0.001, start);
    gain.gain.linearRampToValueAtTime(volume, start + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

    osc.connect(gain);
    gain.connect(audio.destination);
    osc.start(start);
    osc.stop(start + duration + 0.05);
  }

  function phrase(start) {
    chords.forEach((chord, bar) => {
      const t = start + bar * beat * 4;

      chord.forEach((note, i) => {
        playNote(note, t + i * 0.035, 2.8, 0.045, "triangle");
        playNote(note + 12, t + beat * 2, 1.8, 0.018);
      });

      melody[bar].forEach((note, i) => {
        if (note) {
          playNote(
            note,
            t + i * beat / 2,
            0.65,
            0.035,
            "sine"
          );
        }
      });
    });
  }

  function createButton() {
    if (document.getElementById("sweetMusicToggle")) return;

    const style = document.createElement("style");
    style.textContent = `
      #sweetMusicToggle {
        position: fixed;
        right: 18px;
        bottom: 20px;
        z-index: 99999;
        border: 1px solid rgba(255,255,255,.45);
        border-radius: 30px;
        padding: 12px 17px;
        background: linear-gradient(135deg,#ed79b5,#a66bd4);
        color: white;
        font: 600 13px system-ui,sans-serif;
        box-shadow: 0 5px 22px rgba(130,55,120,.28);
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);

    const button = document.createElement("button");
    button.id = "sweetMusicToggle";
    button.type = "button";
    button.textContent = "♫ Putar musik";

    button.addEventListener("click", async () => {
      if (!audio) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) {
          button.textContent = "Audio tidak didukung";
          return;
        }
        audio = new AudioContext();
      }

      if (!playing) {
        await audio.resume();
        playing = true;
        phrase(audio.currentTime + 0.1);
        timer = setInterval(() => {
          if (playing) phrase(audio.currentTime + 0.1);
        }, beat * 16 * 1000);
        button.textContent = "♫ Musik: ON";
      } else {
        playing = false;
        clearInterval(timer);
        await audio.suspend();
        button.textContent = "♫ Putar musik";
      }
    });

    document.body.appendChild(button);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createButton);
  } else {
    createButton();
  }
})();
