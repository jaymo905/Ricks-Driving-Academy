# Rick's Driving Academy — Design Document
**Date:** 2026-02-27
**Project:** Ontario G1 Driver's Test Study App
**Built for:** Bentley Morrison (age 16, ADHD learner)
**Status:** Approved — ready for implementation

---

## Overview

A mobile-first Progressive Web App (PWA) that teaches Ontario G1 driver's test content through Rick Sanchez from *Rick and Morty* as an ADHD-optimized tutor. The app uses gamification (Fortnite-style XP, trophies, streaks) and Rick's signature teaching style (contempt-flavoured expertise, physics explanations, reluctant encouragement) to make dry road rules engaging and memorable.

**Core philosophy:** Dopamine first, information second. Every correct answer feels like a win. Rick makes wrong answers funny instead of demoralizing. Bentley keeps coming back because the game rewards showing up.

---

## Tech Stack

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | None (vanilla JS) | No build step, no Node.js required, easy for Jay to modify |
| Deployment | Vercel (free tier) | Zero-config static hosting, auto-deploys on git push |
| PWA | manifest.json + service worker | Installable on home screen, full offline play |
| Storage | localStorage only | No backend, no account, no privacy concerns |
| Style | Pure CSS | No dependencies, fast load, total control |
| Signs | Inline SVG | No external images, works offline, no copyright issues |

---

## File Structure

```
g1-rick-tutor/
├── index.html              <- app shell, loads everything
├── manifest.json           <- PWA: name, icon, theme color
├── sw.js                   <- service worker: offline caching
├── style.css               <- all visual design + animations
│
├── data/
│   ├── questions.js        <- 140 questions (rules + signs + scenarios)
│   └── rick-dialogue.js    <- 200+ Rick lines organized by context key
│
├── js/
│   ├── app.js              <- main controller, screen routing
│   ├── engine.js           <- quiz logic, scoring, XP calculation
│   ├── rick.js             <- dialogue engine, avatar state manager
│   ├── storage.js          <- localStorage read/write, schema definition
│   ├── trophies.js         <- trophy tracking, unlock logic, display
│   └── modes/
│       ├── lecture.js      <- Mode 1: Classic Quiz
│       ├── speed-blitz.js  <- Mode 2: Speed Blitz
│       ├── sign-recon.js   <- Mode 3: Sign Recon
│       ├── daily-mission.js<- Mode 4: Daily Mission
│       └── boss-battle.js  <- Mode 5: Boss Battle
│
└── assets/
    └── signs/              <- SVG road sign files
```

---

## Game Modes (5)

### Mode 1 — Rick's Lecture (Classic Quiz)
- **Format:** 4-option multiple choice, no time limit
- **Rick behaviour:** Introduces each question, reacts to answer, explains wrong answers with physics
- **Purpose:** Primary study mode — learn at your own pace
- **XP:** 10 per correct, 5 for correct after hint

### Mode 2 — Speed Blitz
- **Format:** 60 seconds, questions fire continuously
- **Rick behaviour:** Gets increasingly unhinged as clock runs down. Silent during play, rapid-fire debrief at end.
- **Purpose:** Reaction training, drilling familiar material
- **XP:** 15 per correct + time multiplier. Best score tracked.
- **Fortnite element:** Final score displayed like a kill count with Rick commentary

### Mode 3 — Sign Recon
- **Format:** Sign image displayed (SVG), 4 text options
- **Rick behaviour:** Strong opinions on Ontario sign design philosophy
- **Purpose:** Sign-only drilling — its own skill set
- **XP:** 10 per correct. Perfect round bonus: 50 XP

### Mode 4 — Daily Mission
- **Format:** 10 random questions, one per day
- **Rick behaviour:** Streak-aware. Tracks days. Roasts gaps.
- **Purpose:** Habit formation, daily engagement
- **XP:** 100 on completion + streak multiplier
- **Fortnite element:** Daily streak counter with Rick daily message ("Day 7. You're still here. Unexpected.")

### Mode 5 — G1 Boss Battle
- **Format:** 40 questions, timed (75 minutes, same as real G1)
- **Structure:** 20 rules of the road + 20 signs (mirrors actual test)
- **Rick behaviour:** Silent during exam (respects the format), full debrief after
- **Pass threshold:** 32/40 (80%) — same as actual G1
- **XP:** 250 on pass, 50 on attempt
- **Fortnite element:** Results screen styled like post-match summary — accuracy %, time used, Rick verdict

---

## Trophy & Achievement System (20 trophies)

### Tier Levels

| Tier | Name | Hex | Rick's Reaction |
|------|------|-----|-----------------|
| Bronze | "You Showed Up" | `#cd7f32` | "Participation. The bare minimum. It's a start." |
| Silver | "Getting Somewhere" | `#c0c0c0` | "Progress. Actual progress. I'm noting this." |
| Gold | "Not Completely Hopeless" | `#FFD700` | "You've earned this. I'm choosing to be unbothered by that." |
| Platinum | "Rick-Certified" | `#39FF14` | "I don't give these out. Except I just did. Don't make it weird." |
| Rick's Choice | "Interdimensional Driver" | animated | "WUBBA LUBBA DUB DUB. You're done. Get your license." |

### Trophy List

**Completion (5)**
- `first-question` — Answer first question (Bronze)
- `first-mode` — Complete any mode (Bronze)
- `all-modes` — Unlock all 5 modes (Silver)
- `boss-attempt` — Attempt Boss Battle (Silver)
- `boss-pass` — Pass Boss Battle at 80%+ (Gold)

**Streaks (5)**
- `streak-3` — 3 correct in a row (Bronze)
- `streak-10` — 10 correct in a row (Silver)
- `streak-20` — 20 correct in a row (Gold)
- `daily-3` — Daily Mission 3-day streak (Silver)
- `daily-7` — Daily Mission 7-day streak (Gold)

**Skill (5)**
- `speed-15` — Score 15+ in Speed Blitz (Silver)
- `sign-perfect` — Perfect score in Sign Recon (Gold)
- `boss-perfect` — 40/40 in Boss Battle (Rick's Choice)
- `no-hints` — Complete any full mode without hints (Silver)
- `comeback` — Fail 3 then answer 5 in a row correctly (Bronze)

**Easter Eggs (5)**
- `rick-mode` — Tap Rick avatar 7 times triggers special mode (Gold)
- `night-owl` — Play past midnight (Bronze)
- `daily-streak-7` — 7 consecutive Daily Missions (Platinum)
- `rick-certified` — Reach XP Level 15 (Platinum)
- `interdimensional` — Earn all other 19 trophies (Rick's Choice)

### Trophy Unlock Experience
1. Screen dims, portal-green particle burst from center
2. Trophy card slides up: tier badge + trophy name + Rick one-liner
3. XP awarded and animated on bar
4. Tap anywhere to dismiss
5. Trophy shelf accessible from main menu (shows locked/unlocked state)

---

## Visual Design

### Color Palette

| Purpose | Color | Hex |
|---------|-------|-----|
| Background | Deep space navy | `#0a0e1a` |
| Panels/cards | Dark slate | `#1a2035` |
| Correct / portal green | Neon green | `#39FF14` |
| Wrong answer | Blood orange | `#FF4500` |
| Trophy gold | Championship gold | `#FFD700` |
| Primary text | Off-white | `#f0f0f0` |
| Secondary text | Blue-grey | `#8899aa` |

### Mobile Layout (portrait, 375px base)

```
+-------------------------+
|  XP BAR       [TROPHY] |  <- sticky top bar
+-------------------------+
|    RICK AVATAR          |  <- pixel art, 4 animation states
|    [speech bubble]      |  <- Rick dialogue
+-------------------------+
|    QUESTION TEXT        |
|                         |
|  [ A ] Option one       |  <- large tap targets (min 56px)
|  [ B ] Option two       |
|  [ C ] Option three     |
|  [ D ] Option four      |
|                         |
|  [Hint]       [Skip]    |
+-------------------------+
```

### Rick Avatar States
- **idle:** subtle breathing animation (CSS keyframe)
- **correct:** arms up, slight bounce
- **wrong:** facepalm, head shake
- **thinking:** arms crossed, staring

### XP Level Names (1-20)
1. Learner
2. Passenger
3. Almost A Driver
4. Morty-Tier
5. Smith Family Average
6. Not Jerry
7. Occasionally Competent
8. Road-Adjacent
9. Science Aware
10. Interdimensional Basics
11. Dimension C-137 Approved
12. Rick-Adjacent
13. Portal-Ready
14. Federation Escapee
15. Rick-Certified
16. Galactic Driver
17. Multiverse Navigator
18. Wubba Level
19. Smartest On This Road
20. Interdimensional Driver

---

## Data Architecture

### Question Object Schema
```js
{
  id: "R001",
  category: "rules",          // "rules" | "signs" | "scenario"
  topic: "following-distance",
  difficulty: 2,               // 1=easy, 2=medium, 3=hard
  question: "What is the minimum following distance on a highway?",
  options: ["1 second", "2 seconds", "3 seconds", "4 seconds"],
  answer: 2,                   // 0-based index of correct option
  signSvg: null,               // SVG string for sign questions
  rickTopic: "following-distance",
  rickHint: "Think about what happens physically at high speed."
}
```

### Question Bank Targets
- 80 rules-of-the-road questions
- 40 signs questions (with SVG)
- 20 scenario/situational questions
- **140 total**

### localStorage Schema
```js
rickAcademy: {
  playerName: "Bentley",
  xp: 0,
  level: 1,
  trophies: [],
  dailyMission: {
    lastPlayed: null,
    streak: 0,
    completedToday: false
  },
  stats: {
    totalAnswered: 0,
    totalCorrect: 0,
    bestSpeedBlitz: 0,
    bossAttempts: 0,
    bossPasses: 0,
    longestStreak: 0
  },
  seenDialogue: {
    correct: [],
    wrong: [],
    hint: [],
    intro: []
  }
}
```

### Rick Dialogue Engine Schema
```js
RICK_DIALOGUE = {
  correct: [/* 20 lines */],
  wrong: [/* 15 lines */],
  streak3: [/* 3 lines */],
  streak10: [/* 3 lines */],
  streak20: [/* 3 lines */],
  hint: [/* 5 lines */],
  intro: [/* 10 lines */],
  bossStart: [/* 2 lines */],
  bossPass: [/* 3 lines */],
  bossFail: [/* 3 lines */],
  dailyGreet: [/* 7 lines, one per day of week */],
  topics: {
    "following-distance": "...",
    "right-of-way": "...",
    "speed-limits": "...",
    "seatbelts": "...",
    "school-zones": "...",
    "railroad-crossings": "...",
    "emergency-vehicles": "...",
    "roundabouts": "...",
    "school-buses": "...",
    "parallel-parking": "...",
    "construction-zones": "...",
    "signs-general": "..."
  },
  trophyUnlock: {
    /* one line per trophy ID */
  }
}
```

seenDialogue tracking prevents repetition — Rick cycles full library before repeating any line.

---

## Deployment

1. Push project folder to GitHub repo
2. Connect repo to Vercel (vercel.com, free tier)
3. Auto-deploys at ricks-driving-academy.vercel.app
4. Bentley opens on phone, taps "Add to Home Screen" — installed as app
5. Service worker caches all assets — full offline play

**Ongoing updates:** Jay edits file, git push, Vercel deploys in ~30 seconds, Bentley's app updates silently.

---

## Build Order

| Step | File(s) | Deliverable |
|------|---------|-------------|
| 1 | index.html, style.css | Full visual shell, all screens rendered |
| 2 | storage.js | localStorage layer working |
| 3 | rick-dialogue.js | Full Rick dialogue library loaded |
| 4 | questions.js | Full 140-question bank loaded |
| 5 | rick.js, engine.js | Dialogue engine + quiz logic wired |
| 6 | modes/lecture.js | **First playable mode** |
| 7 | modes/speed-blitz.js | Speed Blitz |
| 8 | modes/sign-recon.js | Sign Recon |
| 9 | modes/daily-mission.js | Daily Mission |
| 10 | modes/boss-battle.js | Boss Battle |
| 11 | trophies.js | Full trophy system |
| 12 | manifest.json, sw.js | PWA install + offline |

Bentley can play after Step 6. Steps 7-12 are progressive enhancement.

---

## Companion Files (already created)

| File | Purpose |
|------|---------|
| RICK_CHARACTER_BIBLE.md | Full character reference — personality, 200+ scripted lines, teaching style, visual guidelines |
| RICK_SYSTEM_PROMPT.md | Standalone chatbot system prompt — drop into Claude API, ChatGPT, or any LLM |

---

*Design approved: 2026-02-27*
*Next: Implementation plan*
