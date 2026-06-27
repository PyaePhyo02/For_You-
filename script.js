// ═══════════════════════════════════════
// script.js — Heyy Cuttie Pie
// ═══════════════════════════════════════

// ─── Flora (floating flowers, hearts, roses) ───
const FLORA_SYMBOLS = ['🌷', '🌹', '🌸', '💗', '💕', '🌺', '💐', '🌼', '🫶'];
const floraCanvas   = document.getElementById('flora-canvas');

function spawnFlora() {
  const el = document.createElement('div');
  el.className = 'flora';
  el.textContent = FLORA_SYMBOLS[Math.floor(Math.random() * FLORA_SYMBOLS.length)];

  const dur   = (7 + Math.random() * 7).toFixed(1) + 's';
  const delay = (Math.random() * 4).toFixed(1) + 's';
  const size  = Math.round(18 + Math.random() * 20);

  el.style.cssText = `
    left: ${Math.random() * 100}%;
    font-size: ${size}px;
    --dur: ${dur};
    --delay: ${delay};
  `;

  floraCanvas.appendChild(el);
  const totalMs = (parseFloat(dur) + parseFloat(delay) + 0.5) * 1000;
  setTimeout(() => el.remove(), totalMs);
}

for (let i = 0; i < 8; i++) setTimeout(spawnFlora, i * 350);
setInterval(spawnFlora, 700);

// Launch birthday confetti burst when page first loads
window.addEventListener('load', () => {
  launchConfetti();
  setTimeout(launchConfetti, 1800);
});


// ─── Page navigation ───
function goTo(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  const el = document.getElementById(id);
  if (!el) return;

  void el.offsetWidth; // force reflow so animation re-triggers
  el.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (id === 'p0') { launchConfetti(); setTimeout(launchConfetti, 1200); }
  if (id === 'p3') initNoBtn();
  if (id === 'p5') launchConfetti();
  if (id === 'p6') launchConfetti();
}


// ─── NO button logic ───
let noCount   = 0;
let yesFontPx = 15;

function initNoBtn() {
  // Reset counters every time page 3 is entered
  noCount   = 0;
  yesFontPx = 15;

  const noBtn  = document.getElementById('noBtn');
  const yesBtn = document.getElementById('yesBtn');

  // Put NO back inline beside YES
  noBtn.classList.remove('floating');
  noBtn.style.cssText  = '';
  noBtn.style.opacity  = '1';
  noBtn.style.display  = '';

  // Reset YES button size
  yesBtn.style.fontSize = '';
  yesBtn.style.padding  = '';
}

function handleNo() {
  noCount++;

  const noBtn  = document.getElementById('noBtn');
  const yesBtn = document.getElementById('yesBtn');

  // 3rd click → fade out and switch page
  if (noCount >= 3) {
    noBtn.style.opacity = '0';
    setTimeout(() => goTo('p4'), 350);
    return;
  }

  // 1st click: capture inline position, switch to fixed, then animate away
  if (noCount === 1) {
    const rect = noBtn.getBoundingClientRect();
    noBtn.classList.add('floating');
    // Place it exactly where it was so there's no jump
    noBtn.style.top    = rect.top  + 'px';
    noBtn.style.left   = rect.left + 'px';
    noBtn.style.width  = rect.width + 'px';
    // Two animation frames so the browser paints the starting position first
    requestAnimationFrame(() => requestAnimationFrame(() => moveNoBtn()));
  } else {
    moveNoBtn();
  }

  // Grow YES button a little each click
  yesFontPx = Math.min(yesFontPx + 3, 22);
  yesBtn.style.fontSize = yesFontPx + 'px';
  yesBtn.style.padding  = `${15 + noCount * 3}px ${38 + noCount * 8}px`;
}

function moveNoBtn() {
  const btn = document.getElementById('noBtn');

  // Use the button's actual rendered size
  const bw = btn.offsetWidth  || 100;
  const bh = btn.offsetHeight || 44;

  // Keep strictly inside the visible viewport with a 12px safety margin
  const maxX = window.innerWidth  - bw - 12;
  const maxY = window.innerHeight - bh - 12;

  const x = Math.max(12, Math.floor(Math.random() * maxX));
  const y = Math.max(12, Math.floor(Math.random() * maxY));

  btn.style.left = x + 'px';
  btn.style.top  = y + 'px';
}


// ─── Love letter popup ───
function openLetter() {
  const overlay = document.getElementById('letter-overlay');
  overlay.classList.add('open');
  // Reset scroll to top every time it opens
  overlay.querySelector('.letter-scroll').scrollTop = 0;
  launchConfetti();
}

function closeLetter() {
  document.getElementById('letter-overlay').classList.remove('open');
}

function backdropClose(e) {
  if (e.target === document.getElementById('letter-overlay')) closeLetter();
}

// Background Music
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let playing = false;

musicBtn.addEventListener("click", () => {

    if (!playing) {
        music.play();
        musicBtn.innerHTML = "⏸ Pause Music";
        playing = true;
    } else {
        music.pause();
        musicBtn.innerHTML = "🎵 Play Music";
        playing = false;
    }

});

// ─── Confetti ───
const CONFETTI_COLORS = [
  '#f48fb1', '#ce93d8', '#81d4fa', '#a5d6a7',
  '#fff176', '#ff8a65', '#c2185b', '#f8bbd0'
];

function launchConfetti() {
  const container = document.getElementById('confetti');

  for (let i = 0; i < 45; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'confetti-piece';

      const dur      = (2.2 + Math.random() * 1.6).toFixed(2) + 's';
      const color    = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      const isCircle = Math.random() > 0.5;

      el.style.cssText = `
        background: ${color};
        left: ${Math.random() * 100}vw;
        top: -16px;
        --dur: ${dur};
        border-radius: ${isCircle ? '50%' : '2px'};
        transform: rotate(${Math.random() * 360}deg);
      `;

      container.appendChild(el);
      setTimeout(() => el.remove(), 4500);
    }, i * 55);
  }
}
