/* ============================================================
   trophies.js — 20 achievements
   All DOM via createElement/textContent — never innerHTML.
   ============================================================ */

const TROPHY_DATA = [
  { id: 'first-question', name: 'First Question',       tier: '🥉', badge: '❓', xp: 10  },
  { id: 'first-mode',     name: 'First Mode Complete',  tier: '🥉', badge: '🎮', xp: 25  },
  { id: 'streak-3',       name: 'Three In A Row',        tier: '🥉', badge: '🔥', xp: 30  },
  { id: 'streak-10',      name: 'Ten Streak',            tier: '🥈', badge: '⚡', xp: 75  },
  { id: 'streak-20',      name: 'Twenty Streak',         tier: '🥇', badge: '💥', xp: 150 },
  { id: 'daily-3',        name: '3-Day Streak',          tier: '🥉', badge: '📅', xp: 50  },
  { id: 'daily-7',        name: 'Week Warrior',          tier: '🥈', badge: '🗓️', xp: 100 },
  { id: 'speed-15',       name: 'Speed Demon',           tier: '🥈', badge: '⚡', xp: 75  },
  { id: 'sign-perfect',   name: 'Sign Master',           tier: '🥇', badge: '🚧', xp: 100 },
  { id: 'boss-attempt',   name: 'Boss Challenger',       tier: '🥉', badge: '💀', xp: 25  },
  { id: 'boss-pass',      name: 'Boss Slayer',           tier: '🥇', badge: '🏆', xp: 200 },
  { id: 'boss-perfect',   name: 'Perfect Boss',          tier: '🥇', badge: '💎', xp: 300 },
  { id: 'no-hints',       name: 'No Hints Needed',       tier: '🥈', badge: '🧠', xp: 75  },
  { id: 'comeback',       name: 'Comeback Kid',          tier: '🥈', badge: '↩️', xp: 50  },
  { id: 'rick-mode',      name: 'Pickle Rick Mode',      tier: '🥇', badge: '🥒', xp: 50  },
  { id: 'night-owl',      name: 'Night Owl',             tier: '🥉', badge: '🦉', xp: 25  },
  { id: 'daily-streak-7', name: 'Daily Streak 7',        tier: '🥈', badge: '🌟', xp: 100 },
  { id: 'rick-certified', name: 'Rick-Certified',        tier: '🥇', badge: '🔬', xp: 150 },
  { id: 'level-up',       name: 'Level Up',              tier: '🥉', badge: '⬆️', xp: 20  },
  { id: 'interdimensional', name: 'Interdimensional Driver', tier: '✨', badge: '🌀', xp: 500 }
];

const Trophies = (() => {

  function _getTrophyData(id) {
    return TROPHY_DATA.find(t => t.id === id) || null;
  }

  function unlock(id) {
    const data = _getTrophyData(id);
    if (!data) return;

    const isNew = awardTrophy(id);
    if (!isNew) return;

    // Award XP for the trophy itself
    addXP(data.xp);

    // Show the trophy card overlay
    _showCard(data);

    // Check if interdimensional should unlock (after 1500ms)
    if (id !== 'interdimensional') {
      setTimeout(() => {
        const state = getState();
        const earned = state.trophies || [];
        const nonInterdimensional = TROPHY_DATA
          .filter(t => t.id !== 'interdimensional')
          .map(t => t.id);
        const allEarned = nonInterdimensional.every(tid => earned.includes(tid));
        if (allEarned) {
          unlock('interdimensional');
        }
      }, 1500);
    }
  }

  function check(event, data) {
    data = data || {};

    switch (event) {
      case 'first-question':
        unlock('first-question');
        break;

      case 'mode-complete':
        unlock('first-mode');
        break;

      case 'streak':
        if (data.streak >= 20) unlock('streak-20');
        else if (data.streak >= 10) unlock('streak-10');
        else if (data.streak >= 3) unlock('streak-3');
        break;

      case 'daily-complete':
        if (data.streak >= 3) unlock('daily-3');
        break;

      case 'daily-streak-7':
        if (data.streak >= 7) {
          unlock('daily-7');
          unlock('daily-streak-7');
        }
        break;

      case 'speed-score':
        if (data.score >= 15) unlock('speed-15');
        break;

      case 'sign-perfect':
        unlock('sign-perfect');
        break;

      case 'boss-attempt':
        unlock('boss-attempt');
        break;

      case 'boss-pass':
        unlock('boss-pass');
        break;

      case 'boss-perfect':
        unlock('boss-perfect');
        break;

      case 'no-hints':
        unlock('no-hints');
        break;

      case 'comeback':
        unlock('comeback');
        break;

      case 'rick-mode':
        unlock('rick-mode');
        break;

      case 'night-owl':
        if (new Date().getHours() < 5) unlock('night-owl');
        break;

      case 'level':
        if (data.level >= 15) unlock('rick-certified');
        unlock('level-up');
        break;
    }
  }

  function renderShelf() {
    const grid = document.getElementById('trophy-grid');
    if (!grid) return;

    // Clear existing content
    while (grid.firstChild) grid.removeChild(grid.firstChild);

    const state = getState();
    const earned = state.trophies || [];

    TROPHY_DATA.forEach(trophy => {
      const item = document.createElement('div');
      item.className = 'trophy-item ' + (earned.includes(trophy.id) ? 'earned' : 'locked');

      const badge = document.createElement('div');
      badge.className = 'trophy-badge';
      badge.textContent = trophy.badge;

      const name = document.createElement('div');
      name.className = 'trophy-item-name';
      name.textContent = earned.includes(trophy.id) ? trophy.name : '???';

      const xp = document.createElement('div');
      xp.className = 'trophy-item-xp';
      xp.textContent = earned.includes(trophy.id) ? '+' + trophy.xp + ' XP' : '';

      item.appendChild(badge);
      item.appendChild(name);
      item.appendChild(xp);
      grid.appendChild(item);
    });
  }

  function _showCard(data) {
    const overlay = document.getElementById('overlay-trophy');
    if (!overlay) return;

    document.getElementById('trophy-tier-badge').textContent = data.badge;
    document.getElementById('trophy-name').textContent = data.name;
    document.getElementById('trophy-xp').textContent = '+' + data.xp + ' XP';

    const rickLine = (RICK_DIALOGUE.trophyUnlock && RICK_DIALOGUE.trophyUnlock[data.id])
      ? '"' + RICK_DIALOGUE.trophyUnlock[data.id] + '"'
      : '"Nice. I mean. Whatever."';
    document.getElementById('trophy-rick-line').textContent = rickLine;

    overlay.classList.remove('hidden');

    // One-time click to dismiss
    function dismiss() {
      overlay.classList.add('hidden');
      overlay.removeEventListener('click', dismiss);
      if (typeof updateTopBar === 'function') updateTopBar();
    }
    overlay.addEventListener('click', dismiss);
  }

  return { unlock, check, renderShelf };

})();
