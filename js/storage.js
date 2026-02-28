/* ============================================================
   storage.js — localStorage layer
   All state lives here. No module syntax — plain globals.
   ============================================================ */

const STORAGE_KEY = 'ricks_driving_academy';
const XP_PER_LEVEL = 200;

const LEVEL_NAMES = [
  'Learner',
  'Passenger',
  'Almost A Driver',
  'Morty-Tier',
  'Smith Family Average',
  'Not Jerry',
  'Occasionally Competent',
  'Road-Adjacent',
  'Science Aware',
  'Interdimensional Basics',
  'Dimension C-137 Approved',
  'Rick-Adjacent',
  'Portal-Ready',
  'Federation Escapee',
  'Rick-Certified',
  'Galactic Driver',
  'Multiverse Navigator',
  'Wubba Level',
  'Smartest On This Road',
  'Interdimensional Driver'
];

const DEFAULT_STATE = {
  playerName: '',
  xp: 0,
  trophies: [],
  stats: {
    totalAnswered: 0,
    totalCorrect: 0,
    currentStreak: 0,
    longestStreak: 0,
    bestSpeedBlitz: 0,
    bossAttempts: 0,
    bossPasses: 0
  },
  daily: {
    lastPlayed: null,
    streak: 0
  },
  seenDialogue: {}
};

function getState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return JSON.parse(JSON.stringify(DEFAULT_STATE));
    const saved = JSON.parse(raw);
    // Deep merge with defaults to handle new fields
    return {
      ...DEFAULT_STATE,
      ...saved,
      stats: { ...DEFAULT_STATE.stats, ...(saved.stats || {}) },
      daily: { ...DEFAULT_STATE.daily, ...(saved.daily || {}) },
      seenDialogue: saved.seenDialogue || {}
    };
  } catch (e) {
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // localStorage full or unavailable — silently fail
  }
}

function getLevelFromXP(xp) {
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  return Math.min(level, LEVEL_NAMES.length);
}

function getXPProgress(xp) {
  const remainder = xp % XP_PER_LEVEL;
  return Math.round((remainder / XP_PER_LEVEL) * 100);
}

function getLevelName(level) {
  const idx = Math.max(0, Math.min(level - 1, LEVEL_NAMES.length - 1));
  return LEVEL_NAMES[idx];
}

function addXP(amount) {
  const state = getState();
  const oldLevel = getLevelFromXP(state.xp);
  state.xp += amount;
  const newLevel = getLevelFromXP(state.xp);
  const leveled = newLevel > oldLevel;
  saveState(state);
  return { leveled, newLevel };
}

function recordAnswer(correct) {
  const state = getState();
  state.stats.totalAnswered = (state.stats.totalAnswered || 0) + 1;
  if (correct) {
    state.stats.totalCorrect = (state.stats.totalCorrect || 0) + 1;
    state.stats.currentStreak = (state.stats.currentStreak || 0) + 1;
    if (state.stats.currentStreak > (state.stats.longestStreak || 0)) {
      state.stats.longestStreak = state.stats.currentStreak;
    }
  } else {
    state.stats.currentStreak = 0;
  }
  saveState(state);
}

function markDailyComplete() {
  const state = getState();
  const today = new Date().toDateString();
  const lastPlayed = state.daily.lastPlayed;

  if (lastPlayed) {
    const last = new Date(lastPlayed);
    const now = new Date();
    const diffDays = Math.round((now - last) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      state.daily.streak = (state.daily.streak || 0) + 1;
    } else if (diffDays > 1) {
      state.daily.streak = 1;
    }
  } else {
    state.daily.streak = 1;
  }

  state.daily.lastPlayed = today;
  saveState(state);
  return state.daily.streak;
}

function isDailyAvailable() {
  const state = getState();
  const today = new Date().toDateString();
  return state.daily.lastPlayed !== today;
}

function hasTrophy(id) {
  const state = getState();
  return (state.trophies || []).includes(id);
}

function awardTrophy(id) {
  if (hasTrophy(id)) return false;
  const state = getState();
  state.trophies = state.trophies || [];
  state.trophies.push(id);
  saveState(state);
  return true;
}

function markDialogueSeen(context, index) {
  const state = getState();
  if (!state.seenDialogue[context]) state.seenDialogue[context] = [];
  if (!state.seenDialogue[context].includes(index)) {
    state.seenDialogue[context].push(index);
  }
  saveState(state);
}

function getSeenDialogue(context) {
  const state = getState();
  return state.seenDialogue[context] || [];
}

function clearSeenDialogue(context) {
  const state = getState();
  state.seenDialogue[context] = [];
  saveState(state);
}
