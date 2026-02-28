/* ============================================================
   app.js — Screen router and main menu
   All DOM via createElement/textContent — never innerHTML.
   ============================================================ */

/* ---- Screen router ---- */

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
}

/* ---- Top bar ---- */

function updateTopBar() {
  const state = getState();
  const level = getLevelFromXP(state.xp);
  const pct   = getXPProgress(state.xp);
  const name  = getLevelName(level);

  const lvlEl  = document.getElementById('menu-level');
  const nameEl = document.getElementById('menu-level-name');
  const fillEl = document.getElementById('menu-xp-fill');

  if (lvlEl)  lvlEl.textContent  = 'Lv ' + level;
  if (nameEl) nameEl.textContent = name;
  if (fillEl) fillEl.style.width = pct + '%';
}

/* ---- SVG sign helper (shared by modes) ---- */

function setSvg(containerId, svgString) {
  const el = document.getElementById(containerId);
  if (!el) return;
  while (el.firstChild) el.removeChild(el.firstChild);
  if (!svgString) {
    el.classList.add('hidden');
    return;
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');
  el.appendChild(document.adoptNode(doc.documentElement));
  el.classList.remove('hidden');
}

/* ---- Option buttons ---- */

function buildOptionButtons(question, onSelect) {
  const grid = document.getElementById('options-grid');
  if (!grid) return;
  while (grid.firstChild) grid.removeChild(grid.firstChild);

  const letters = ['A', 'B', 'C', 'D'];

  question.options.forEach((optText, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.setAttribute('aria-label', letters[i] + ': ' + optText);

    const letter = document.createElement('span');
    letter.className = 'option-letter';
    letter.textContent = letters[i];

    const text = document.createTextNode(optText);

    btn.appendChild(letter);
    btn.appendChild(text);

    btn.addEventListener('click', () => {
      // Disable all buttons on first answer
      grid.querySelectorAll('.option-btn').forEach(b => {
        b.disabled = true;
      });
      onSelect(i);
    });

    grid.appendChild(btn);
  });
}

/* ---- Answer feedback ---- */

function showAnswerFeedback(correct, correctIdx, question) {
  const grid = document.getElementById('options-grid');
  if (!grid) return;

  const btns = grid.querySelectorAll('.option-btn');
  btns.forEach((btn, i) => {
    if (i === correctIdx) btn.classList.add('correct');
  });

  // Flash the screen edge
  document.body.classList.remove('flash-correct', 'flash-wrong');
  void document.body.offsetWidth; // force reflow
  document.body.classList.add(correct ? 'flash-correct' : 'flash-wrong');
  setTimeout(() => document.body.classList.remove('flash-correct', 'flash-wrong'), 400);
}

/* ---- Main menu ---- */

function initMenu() {
  updateTopBar();

  const state = getState();

  // Rick greeting
  const hour = new Date().getHours();
  let greeting;
  if (hour < 5)       greeting = Rick.getLine('intro');
  else if (hour < 12) greeting = "Morning. Let's get to it.";
  else if (hour < 17) greeting = "Afternoon session. Good.";
  else                greeting = "Evening study. I respect the commitment.";

  Rick.showBubble('menu-bubble', greeting, 0);

  // Daily mission glow + badge
  const dailyDesc = document.getElementById('daily-desc');
  const dailyStreak = state.daily && state.daily.streak ? state.daily.streak : 0;
  if (!isDailyAvailable()) {
    if (dailyDesc) dailyDesc.textContent = 'Done for today \u2022 Day ' + dailyStreak + ' streak';
    const card = document.getElementById('mode-daily');
    if (card) card.style.opacity = '0.6';
  } else {
    if (dailyDesc) {
      dailyDesc.textContent = dailyStreak > 0
        ? '10 questions \u2022 Day ' + dailyStreak + ' streak'
        : '10 questions \u2022 Streak bonus';
    }
  }

  // Mode card listeners
  document.getElementById('mode-lecture').addEventListener('click', () => Lecture.start());
  document.getElementById('mode-speed').addEventListener('click', () => SpeedBlitz.start());
  document.getElementById('mode-signs').addEventListener('click', () => SignRecon.start());
  document.getElementById('mode-daily').addEventListener('click', () => DailyMission.start());
  document.getElementById('mode-boss').addEventListener('click', () => BossBattle.start());

  // Trophy button
  document.getElementById('trophy-btn').addEventListener('click', () => {
    Trophies.renderShelf();
    showScreen('screen-trophies');
  });

  // Trophies back button
  document.getElementById('trophies-back-btn').addEventListener('click', () => {
    showScreen('screen-menu');
  });

  // Rick tap Easter egg — 7 taps unlocks rick-mode trophy
  let tapCount = 0;
  let tapTimer = null;
  document.getElementById('menu-rick').addEventListener('click', () => {
    tapCount++;
    clearTimeout(tapTimer);
    tapTimer = setTimeout(() => { tapCount = 0; }, 2000);
    if (tapCount >= 7) {
      tapCount = 0;
      Trophies.check('rick-mode');
      Rick.showBubble('menu-bubble',
        "I turned myself into a PICKLE, Morty! I'm Pickle RICK! ...That has nothing to do with driving. Let's move on.",
        4000);
    }
  });
}

/* ---- DOMContentLoaded ---- */

document.addEventListener('DOMContentLoaded', () => {
  const state = getState();

  if (!state.playerName) {
    // New player — show splash
    showScreen('screen-splash');

    const startBtn   = document.getElementById('start-btn');
    const nameInput  = document.getElementById('name-input');

    startBtn.addEventListener('click', () => {
      const name = nameInput.value.trim();
      if (!name) {
        nameInput.focus();
        return;
      }
      const s = getState();
      s.playerName = name;
      saveState(s);
      showScreen('screen-menu');
      initMenu();
    });

    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') startBtn.click();
    });

  } else {
    // Returning player — go straight to menu
    showScreen('screen-menu');
    initMenu();
  }

  // Service worker registration
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
});
