# Rick's Driving Academy — For Bentley

## Getting It On Your Phone

This app installs directly from the browser — no App Store, no Google Play.

**Steps:**

1. Open **Google Chrome** on your phone
2. Go to: **ricks-driving-academy.vercel.app**
3. Tap the **three dots** (⋮) in the top right corner
4. Tap **"Add to Home Screen"**
5. Tap **"Add"** on the confirmation
6. Done — it shows up on your home screen like a regular app

Once it's installed, **it works offline** too. No internet needed to study.

---

## How To Use It

When you first open it, type your name and tap **Let's Go**.

You'll see 5 modes:

| Mode | What it is |
|------|-----------|
| **Rick's Lecture** | 20 random questions — the main study mode |
| **Speed Blitz** | 60 seconds, answer as fast as you can |
| **Sign Recon** | Road signs only — every sign on the G1 test |
| **Daily Mission** | 10 questions once a day — builds a streak |
| **Boss Battle** | 40 questions, 75 minutes — the real G1 simulation |

Your XP and level save automatically. Come back every day and your progress is still there.

**Pro tip:** Do the Daily Mission every day to build your streak. Rick gets impressed.

---

## How It Was Built (The Cool Part)

Your dad built this app specifically for you to study for your G1. Here's what went into it.

### The Tech

- **Pure HTML, CSS, and JavaScript** — no frameworks, no shortcuts. This is the foundational layer of everything on the web. If you learn this, you understand how the internet actually works.
- **140 real Ontario G1 questions** — written from scratch, covering every topic on the actual test: speed limits, right-of-way, school buses, signs, alcohol limits, G1 restrictions, and more.
- **Progressive Web App (PWA)** — the reason it installs on your home screen and works offline. It uses a "service worker" that caches all the files to your phone the first time you load it.
- **localStorage** — your XP, level, trophies, and daily streak are all saved to your phone's local storage. No account needed, no server, no data collection.
- **Deployed on Vercel** — a platform that hosts the app for free and serves it globally in under 30 seconds after any update.

### How Long It Took

The entire app — 17 tasks, 140 questions, 5 game modes, 20 trophies, 200+ Rick lines, PWA setup, and deployment — was planned and built in a single session using Claude Code (an AI coding assistant). The plan was written first, then executed task by task with full code review at each step.

### The Files

```
ricks-driving-academy/
├── index.html          ← the whole app structure (6 screens)
├── style.css           ← all the visuals (dark theme, animations)
├── data/
│   ├── questions.js    ← all 140 G1 questions
│   └── rick-dialogue.js← all of Rick's lines (200+)
├── js/
│   ├── app.js          ← screen routing, menus
│   ├── engine.js       ← quiz logic and XP
│   ├── rick.js         ← Rick's reactions and avatar
│   ├── storage.js      ← saves your progress
│   ├── trophies.js     ← achievement system
│   └── modes/          ← each game mode is its own file
│       ├── lecture.js
│       ├── speed-blitz.js
│       ├── sign-recon.js
│       ├── daily-mission.js
│       └── boss-battle.js
├── manifest.json       ← makes it installable as an app
└── sw.js               ← makes it work offline
```

If you're ever curious about how any of it works, open the file and read it — the code is written to be readable.

---

## The Goal

Pass your G1. Do the Boss Battle (40 questions, 80% to pass) when you feel ready — it's calibrated to be as hard as the real test.

Good luck.

— Dad
