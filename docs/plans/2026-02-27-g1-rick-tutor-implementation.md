# Rick's Driving Academy — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a mobile-first PWA G1 driver's test study app with Rick Sanchez as tutor — 5 game modes, 140 questions, 200+ Rick dialogue lines, Fortnite-style trophies.

**Architecture:** Vanilla JS multi-file static site. No framework, no build step. State in localStorage. PWA via manifest + service worker. Deployed free on Vercel.

**Tech Stack:** HTML5, CSS3, vanilla ES6, localStorage, Vercel

---

## File Structure

```
g1-rick-tutor/
├── index.html
├── manifest.json
├── sw.js
├── style.css
├── data/
│   ├── questions.js        (140 questions)
│   └── rick-dialogue.js    (200+ Rick lines)
├── js/
│   ├── app.js              (screen router + menu)
│   ├── engine.js           (quiz logic + XP)
│   ├── rick.js             (dialogue engine + avatar)
│   ├── storage.js          (localStorage layer)
│   ├── trophies.js         (20 achievements)
│   └── modes/
│       ├── lecture.js      (Classic Quiz)
│       ├── speed-blitz.js  (60-second timer mode)
│       ├── sign-recon.js   (signs only)
│       ├── daily-mission.js(once per day + streak)
│       └── boss-battle.js  (40q G1 simulation)
└── assets/
    ├── icon-192.png
    └── icon-512.png
```

---

## Build Order

| # | Task | First Playable |
|---|------|---------------|
| 1 | Project setup | — |
| 2 | index.html | — |
| 3 | style.css | — |
| 4 | storage.js | — |
| 5 | rick-dialogue.js | — |
| 6 | questions.js | — |
| 7 | rick.js | — |
| 8 | engine.js | — |
| 9 | trophies.js | — |
| 10 | app.js | — |
| 11 | lecture.js | YES — Bentley can play after this |
| 12 | speed-blitz.js | — |
| 13 | sign-recon.js | — |
| 14 | daily-mission.js | — |
| 15 | boss-battle.js | — |
| 16 | manifest + sw.js | PWA install + offline |
| 17 | Deploy to Vercel | Live URL |

---

## Task 1: Project Setup

```bash
mkdir -p g1-rick-tutor/{data,js/modes,assets,docs/plans}
cd g1-rick-tutor
echo ".DS_Store\n.vercel" > .gitignore
git init
git add .gitignore
git commit -m "chore: init project"
```

---

## Task 2: index.html

Six screens as `<div id="screen-X" class="screen">`, hidden by default, shown via JS:

- **screen-splash** — app title (portal-green glow), Rick avatar, name input, start button
- **screen-menu** — XP top bar, Rick avatar + speech bubble, 5 mode cards, trophy button  
- **screen-quiz** — top bar (mode badge + meta), Rick section (avatar + bubble), question section (number, optional sign display, text, 4 option buttons, hint button)
- **screen-results** — Rick avatar, title, score percentage, stats line, XP award, play-again + menu buttons
- **screen-trophies** — scrollable 2-column grid of all 20 trophies
- **overlay-trophy** — full-screen dim + trophy card (hidden by default, z-index 100)

PWA meta tags in head:
```html
<meta name="theme-color" content="#0a0e1a">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<link rel="manifest" href="manifest.json">
```

Script load order (bottom of body):
`rick-dialogue.js` → `questions.js` → `storage.js` → `rick.js` → `engine.js` → `trophies.js` → all 5 modes → `app.js`

```bash
git add index.html && git commit -m "feat: app shell with all screens"
```

---

## Task 3: style.css

CSS custom properties in `:root`:
```
--bg: #0a0e1a      (deep space navy)
--panel: #1a2035   (dark slate)
--green: #39FF14   (portal neon green)
--orange: #FF4500  (blood orange — wrong answers)
--gold: #FFD700    (trophies)
--text: #f0f0f0
--muted: #8899aa
--border: #2a3550
```

Key rules:
- `.screen` → `position:fixed; inset:0; display:none;` — `.screen.active` → `display:flex; flex-direction:column`
- `.xp-fill` → `transition: width 0.6s cubic-bezier(0.34,1.56,0.64,1)` (springy XP surge)
- `.option-btn` → `min-height:56px` (mobile tap target), `border:2px solid var(--border)`
- `.option-btn.correct` → `border-color:var(--green); background:rgba(57,255,20,0.1)`
- `.option-btn.wrong` → `border-color:var(--orange); background:rgba(255,69,0,0.1)`
- `.mode-card` → dark panel, `cursor:pointer`, hover → `border-color:var(--green)`
- `.mode-card.daily-glow` → `border-color:var(--gold); box-shadow:0 0 12px rgba(255,215,0,0.15)`
- `.trophy-card` → `animation: trophy-slide-up 0.4s cubic-bezier(0.34,1.56,0.64,1)`
- `.rick-avatar` → CSS art (white spiky hair via clip-path polygon, pale face, white lab coat div)

Rick avatar CSS animation states:
```css
.rick-avatar.idle  { animation: idle-breathe 3s ease-in-out infinite; }
.rick-avatar.correct { animation: correct-bounce 0.6s ease-out forwards; }
.rick-avatar.wrong   { animation: wrong-shake 0.5s ease-out forwards; }
```

Keyframes needed: `idle-breathe` (Y float), `correct-bounce` (jump up), `wrong-shake` (X rattle), `trophy-slide-up` (Y + opacity), `green-flash` / `orange-flash` (edge glow on body).

```bash
git add style.css && git commit -m "feat: complete visual design system"
```

---

## Task 4: storage.js

Exports these functions (no module syntax — plain globals):

```
getState()           → reads localStorage, merges with DEFAULT_STATE
saveState(state)     → writes to localStorage
addXP(amount)        → adds XP, recalcs level, saves, returns {leveled, newLevel}
getLevelFromXP(xp)   → returns level 1-20
getXPProgress(xp)    → returns 0-100 (percent through current level)
getLevelName(level)  → returns string from LEVEL_NAMES array
recordAnswer(correct)→ updates stats.totalAnswered, currentStreak, longestStreak
markDailyComplete()  → updates daily streak logic, returns current streak number
isDailyAvailable()   → returns true if today !== lastPlayed date
hasTrophy(id)        → boolean
awardTrophy(id)      → adds to trophies array if not present, returns true if newly awarded
markDialogueSeen(context, index)
getSeenDialogue(context)
clearSeenDialogue(context)
```

Level names array (20 entries):
`Learner, Passenger, Almost A Driver, Morty-Tier, Smith Family Average, Not Jerry, Occasionally Competent, Road-Adjacent, Science Aware, Interdimensional Basics, Dimension C-137 Approved, Rick-Adjacent, Portal-Ready, Federation Escapee, Rick-Certified, Galactic Driver, Multiverse Navigator, Wubba Level, Smartest On This Road, Interdimensional Driver`

XP_PER_LEVEL = 200

```bash
git add js/storage.js && git commit -m "feat: localStorage layer"
```

---

## Task 5: rick-dialogue.js

Single global `const RICK_DIALOGUE = { ... }` object. Copy all lines from `RICK_CHARACTER_BIBLE.md`.

Required keys:
```
correct[]       20 lines
wrong[]         15 lines  
hint[]          5 lines
intro[]         10 lines
streak3[]       3 lines
streak10[]      3 lines
streak20[]      3 lines
bossStart[]     2 lines
bossPass[]      3 lines
bossFail[]      3 lines
dailyGreet[]    7 lines (index 0=Mon, 6=Sun)
topics{}        12 keys (following-distance, right-of-way, speed-limits, seatbelts,
                          school-zones, railroad-crossings, emergency-vehicles, roundabouts,
                          school-buses, parallel-parking, construction-zones, signs-general)
trophyUnlock{}  20 keys (one per trophy ID)
```

```bash
git add data/rick-dialogue.js && git commit -m "feat: Rick dialogue library (200+ lines)"
```

---

## Task 6: questions.js

Global `const QUESTIONS = [...]` array of 140 question objects:

```js
{
  id: "R001",
  category: "rules",      // "rules" | "signs" | "scenario"
  topic: "following-distance",
  difficulty: 1,           // 1-3
  question: "...",
  options: ["A","B","C","D"],
  answer: 2,               // 0-based index
  signSvg: null,           // SVG string for sign questions, null otherwise
  rickTopic: "following-distance",
  rickHint: "..."
}
```

Question counts: 80 rules + 40 signs + 20 scenarios = 140 total.

Sign SVGs are simple inline SVG strings (100x100 viewBox). Examples:
- Stop: red octagon + "STOP" text
- Yield: red downward triangle + "YIELD" text  
- Warning (school zone): yellow square + text
- Regulatory (no entry): white circle + red border + diagonal line

Helper functions (globals):
```js
function getRandomQuestions(count, category = null) { /* Fisher-Yates shuffle, slice */ }
function getBossQuestions() { /* 20 rules + 10 signs + 10 scenarios, shuffled */ }
```

Key Ontario G1 topics to cover in rules questions:
- Following distance (3 sec minimum)
- Seatbelts (driver responsible for under-16 passengers)
- Speed limits (50 urban, 80 rural, 100 highway)
- Right-of-way (4-way stops, uncontrolled intersections, turning)
- School buses (red flashing = stop both directions unless median)
- Railroad crossings (stop at flashing lights)
- Emergency vehicles (pull right, stop)
- Cell phones (hands-free only, no handheld)
- Blood alcohol (0.08 = criminal, 0.05 = warn range, 0.00 for G1/G2)
- G1 restrictions (no driving alone, no alcohol, no 400-series highways)
- Signals (30m before turn)
- Parking (3m from fire hydrant, no stopping in bus zones)
- Construction zones (fines doubled)
- Roundabouts (yield to traffic in circle)
- Cyclists / pedestrian crossovers

```bash
git add data/questions.js && git commit -m "feat: 140-question G1 bank"
```

---

## Task 7: rick.js

Global `const Rick` object with these methods:

```js
Rick.setAvatarState(avatarId, state)    // sets className, resets to idle after 800ms
Rick.getLine(context)                   // pulls unseen line, tracks via seenDialogue
Rick.getTopicLine(topic)               // returns RICK_DIALOGUE.topics[topic]
Rick.showBubble(bubbleId, text, duration) // sets textContent, removes .hidden, optional auto-hide
Rick.hideBubble(bubbleId)
Rick.reactCorrect(avatarId, bubbleId)  // correct state + correct line
Rick.reactWrong(avatarId, bubbleId, topic)  // wrong state + wrong line + topic explanation
Rick.reactStreak(avatarId, bubbleId, streak) // fires at 3, 10, 20
Rick.reactHint(bubbleId, hintText)     // hint line + actual hint
Rick.intro(bubbleId)                   // shows intro line, auto-hides after 3000ms
```

getLine() anti-repeat logic:
1. Get `getSeenDialogue(context)` 
2. Filter lines to unseen indices
3. If all seen: `clearSeenDialogue(context)`, reset to full pool
4. Pick random from available, call `markDialogueSeen(context, idx)`
5. Return the line

All text set via `element.textContent` — never innerHTML.

```bash
git add js/rick.js && git commit -m "feat: Rick dialogue engine and avatar controller"
```

---

## Task 8: engine.js

Global `const Engine` object. Internal state: `_questions, _idx, _correct, _streak, _mode, _onAnswer, _onComplete, _startTime`.

```js
Engine.start(questions, mode, { onAnswer, onComplete })
Engine.current()           // returns current question object or null
Engine.submit(answerIndex) // checks answer, updates streak, calls recordAnswer(), calls onAnswer()
Engine.next()              // advances index; if done, calls onComplete() with results; returns null when done
Engine.getProgress()       // returns { current, total, correct, streak }
```

`submit()` calls `onAnswer({ correct, question, streak })`.

`next()` when done: calculates XP via internal `calcXP()`, calls `addXP()`, calls `onComplete({ correct, total, pct, elapsed, mode, xpEarned, leveled, newLevel })`.

XP rates: lecture=10/q, speed=15/q, signs=10/q, daily=100+5/correct, boss=250 pass/50 fail.

```bash
git add js/engine.js && git commit -m "feat: quiz engine with XP calculation"
```

---

## Task 9: trophies.js

Global `const Trophies` object + `const TROPHY_DATA` array (20 entries).

TROPHY_DATA entry shape:
```js
{ id, name, tier, badge (emoji), xp }
```

```js
Trophies.unlock(id)          // awardTrophy() → addXP() → showCard() → check interdimensional
Trophies.check(event, data)  // event-based: maps events to unlock() calls
Trophies.renderShelf()       // builds trophy grid using createElement (not innerHTML)
```

check() event map:
```
'first-question'        → unlock first-question
'mode-complete'         → unlock first-mode
'streak' + data.streak  → unlock streak-3, streak-10, streak-20
'daily-complete'        → unlock daily-3 (streak>=3), daily-7 (streak>=7)
'speed-score'           → unlock speed-15 (score>=15)
'sign-perfect'          → unlock sign-perfect
'boss-attempt'          → unlock boss-attempt
'boss-pass'             → unlock boss-pass
'boss-perfect'          → unlock boss-perfect
'no-hints'              → unlock no-hints
'comeback'              → unlock comeback
'rick-mode'             → unlock rick-mode
'night-owl'             → unlock night-owl (hour < 5)
'daily-streak-7'        → unlock daily-streak-7 (streak>=7)
'level' + data.level    → unlock rick-certified (level>=15)
```

renderShelf() uses `createElement` + `textContent` for all content. Never innerHTML.

showCard(): sets textContent on tier-badge, name, rick-line, xp elements. Shows overlay. One-time click listener hides overlay + calls `updateTopBar()`.

After any unlock: check if all 19 non-interdimensional trophies earned → unlock interdimensional after 1500ms delay.

```bash
git add js/trophies.js && git commit -m "feat: trophy system with 20 achievements"
```

---

## Task 10: app.js

Global functions:

```js
showScreen(id)              // removes .active from all screens, adds to target
updateTopBar()              // reads state, updates XP bar width, level, level name
buildOptionButtons(q, cb)  // creates 4 buttons via createElement, appends to #options-grid
showAnswerFeedback(correct, answerIdx, question)  // adds .correct/.wrong classes, triggers flash
initMenu()                  // sets up all menu event listeners, Rick greeting, streak badge
```

DOMContentLoaded handler:
- Check `getState().playerName` — if empty, show splash + wire start button
- Otherwise show menu + call `initMenu()`
- Register service worker: `navigator.serviceWorker.register('sw.js')`

buildOptionButtons(): use `createElement('button')`, create letter span + text node. Never use innerHTML. Wire click to disable all buttons + call `onSelect(i)`.

Rick tap Easter egg in initMenu(): count taps on `#menu-rick`. At 7 taps: `Trophies.check('rick-mode')`, reset count.

```bash
git add js/app.js && git commit -m "feat: screen router and main menu"
```

---

## Task 11: modes/lecture.js — FIRST PLAYABLE MILESTONE

```js
const Lecture = (() => {
  let hintsUsed = 0;

  function start() { ... }
  function renderQuestion() { ... }
  function handleAnswer({ correct, question, streak }) { ... }
  function handleComplete(results) { ... }
  function useHint() { ... }

  return { start };
})();
```

**start():**
- Reset hintsUsed = 0
- `getRandomQuestions(20)` → `Engine.start(questions, 'lecture', { onAnswer: handleAnswer, onComplete: handleComplete })`
- `showScreen('screen-quiz')`
- Set mode badge text = "Rick's Lecture"
- Wire hint button → `useHint()`
- Hide skip button
- Wire back button → `showScreen('screen-menu')`
- `renderQuestion()`
- `Rick.intro('quiz-bubble')`

**renderQuestion():**
- `Engine.current()` → get question
- Set `#q-number` textContent = "Question X of Y"
- Set `#q-text` textContent = question text
- SVG signs: use DOMParser to safely insert SVG:
  ```js
  function setSvg(containerId, svgString) {
    const el = document.getElementById(containerId);
    while (el.firstChild) el.removeChild(el.firstChild);
    if (!svgString) { el.classList.add('hidden'); return; }
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    el.appendChild(document.adoptNode(doc.documentElement));
    el.classList.remove('hidden');
  }
  ```
- `buildOptionButtons(question, submitAnswer)`

**handleAnswer({ correct, question, streak }):**
- `showAnswerFeedback(correct, <correct answer index>, question)`
- If correct: `Rick.reactCorrect(...)`, `Rick.reactStreak(...)` 
- If wrong: `Rick.reactWrong(..., question.rickTopic)`
- `Trophies.check('first-question')`
- `Trophies.check('streak', { streak })`
- `Trophies.check('night-owl')`
- `setTimeout(() => { const next = Engine.next(); if (next) renderQuestion(); }, correct ? 1200 : 2500)`

**handleComplete(results):**
- `Trophies.check('mode-complete')`
- `if (hintsUsed === 0) Trophies.check('no-hints')`
- `showScreen('screen-results')`
- Set title, score (pct%), stats, XP award via textContent
- Rick bubble: results.pct >= 80 → `RICK_DIALOGUE.bossPass[0]` else calculate line
- Wire play-again → `start()`, menu → `showScreen('screen-menu')`
- `updateTopBar()`

**useHint():**
- hintsUsed++
- `Rick.reactHint('quiz-bubble', Engine.current().rickHint)`

**VERIFY:** Open app → enter name → tap Rick's Lecture → 20 questions → Rick reacts → XP updates → trophy fires on first answer. This is the milestone.

```bash
git add js/modes/lecture.js && git commit -m "feat: Classic Quiz — first playable milestone"
```

---

## Task 12: modes/speed-blitz.js

60-second countdown. No explanations between questions (300ms delay only).

Extra elements to manage:
- Create `.timer-bar > .timer-fill` div, prepend to quiz screen on start, remove on complete
- `setInterval` every 1000ms: decrement timeLeft, update `timer-fill` width `(timeLeft/60*100)%`
- Under 10 seconds: `Rick.showBubble('quiz-bubble', "Come on, come on, COME ON.", 0)`
- Skip button visible: calls `Engine.submit(-1)` (forced wrong), 300ms next
- Time reaches 0: `clearInterval`, call `Engine.next()` to trigger completion
- Track correct count as separate var (not pct) — results show raw count
- `Trophies.check('speed-score', { score: correctCount })`
- Store best score: compare to `getState().stats.bestSpeedBlitz`, save if higher

```bash
git add js/modes/speed-blitz.js && git commit -m "feat: Speed Blitz mode"
```

---

## Task 13: modes/sign-recon.js

Signs-only. Track `allCorrect` flag.

- `QUESTIONS.filter(q => q.category === 'signs')` → shuffle → `Engine.start()`
- `allCorrect = true` at start; set `false` on any wrong answer
- Always show SVG (use `setSvg()` helper — define once in `app.js` or copy to each mode)
- On complete: `if (allCorrect) Trophies.check('sign-perfect')`
- Answer delay: 1000ms correct / 2000ms wrong

```bash
git add js/modes/sign-recon.js && git commit -m "feat: Sign Recon mode"
```

---

## Task 14: modes/daily-mission.js

10 questions, once per day. Streak-aware.

- Check `isDailyAvailable()` at start — if false: `Rick.showBubble('menu-bubble', "You already did today's mission...", 4000)` and return
- `getRandomQuestions(10)` → `Engine.start(..., 'daily', ...)`
- Day-of-week greeting: `RICK_DIALOGUE.dailyGreet[dayIdx]` (Mon=0...Sun=6)
- On complete: `const streak = markDailyComplete()`
- `Trophies.check('daily-complete', { streak })`
- `Trophies.check('daily-streak-7', { streak })`
- Hide play-again button on results screen (`style.display = 'none'`)
- Show streak in results stats: "X / 10 · Day N streak"

```bash
git add js/modes/daily-mission.js && git commit -m "feat: Daily Mission with streak tracking"
```

---

## Task 15: modes/boss-battle.js

40 questions. 75-minute timer. Rick silent during quiz.

- `getBossQuestions()` → `Engine.start(..., 'boss', ...)`
- Show Rick's `bossStart` line, then hide bubble for duration of quiz
- 75-minute `setInterval`: display `MM:SS` in quiz-meta, stop when 0
- No hint button, no skip button
- `showAnswerFeedback()` only on answer — no Rick reaction — 800ms delay
- On complete: `clearInterval`
  - `if (results.pct >= 80) Trophies.check('boss-pass')`
  - `if (results.correct === 40) Trophies.check('boss-perfect')`
  - Trophies.check('boss-attempt')
  - Update `stats.bossAttempts` and `stats.bossPasses` in localStorage
  - Rick delivers bossPass or bossFail line

```bash
git add js/modes/boss-battle.js && git commit -m "feat: Boss Battle (G1 simulation)"
```

---

## Task 16: manifest.json + sw.js

**manifest.json:**
```json
{
  "name": "Rick's Driving Academy",
  "short_name": "Rick's G1",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0e1a",
  "theme_color": "#0a0e1a",
  "orientation": "portrait",
  "icons": [
    { "src": "assets/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "assets/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

**sw.js** — cache-first for all static assets. List all 15 JS files + index.html + style.css in ASSETS array. `install` event caches all. `fetch` event serves from cache, falls back to network.

Icons: create any 192x192 and 512x512 PNG. Solid green (#39FF14) square works as placeholder.

```bash
git add manifest.json sw.js assets/ && git commit -m "feat: PWA — offline support and home screen install"
```

---

## Task 17: Deploy to Vercel

1. Push to GitHub repo
2. vercel.com → Add New Project → import repo → Framework: Other → Deploy
3. Get URL (e.g. `ricks-driving-academy.vercel.app`)
4. Share URL with Bentley
5. On Bentley's phone: open in Chrome → menu → "Add to Home Screen"

Future updates: `git push` → Vercel auto-deploys in ~30 seconds.

---

*Plan complete — 17 tasks, full code architecture, build order, deployment steps.*
*Companion files: RICK_CHARACTER_BIBLE.md · RICK_SYSTEM_PROMPT.md · 2026-02-27-g1-rick-tutor-design.md*
