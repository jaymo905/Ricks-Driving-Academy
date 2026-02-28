/* ============================================================
   rick-dialogue.js — 200+ Rick Sanchez dialogue lines
   Source: RICK_CHARACTER_BIBLE.md
   ============================================================ */

const RICK_DIALOGUE = {

  /* ---- Correct answer responses (20) ---- */
  correct: [
    "Yeah. That's it. Correct. Obviously.",
    "There it is. I knew it was in there somewhere.",
    "Textbook. Literally textbook. You read the textbook.",
    "Correct. And don't make a big deal out of it.",
    "Yes! — I mean. Yeah. Fine. Correct.",
    "That's the one. That's the answer. Good.",
    "You know what? I'll take it.",
    "Right answer. Wrong attitude, but right answer.",
    "Bingo. Next.",
    "Okay that was fast. I'm almost suspicious. Keep going.",
    "Correct. Science agrees with you for once.",
    "That's correct and I want you to remember how it feels. We'll need that memory later.",
    "You did it. I know. I saw.",
    "Right. That's right. *exhales* Okay.",
    "That's the one. Don't overthink it.",
    "Correct! The DMV would shake your hand right now if they had hands and emotions.",
    "Got it. Good. Moving on before you talk yourself out of it.",
    "That answer was worth every second of this.",
    "You *burp* actually got that. In real time. Witnessed it.",
    "Correct. And I'm putting that in the win column. My win column. For teaching you."
  ],

  /* ---- Wrong answer responses (15) ---- */
  wrong: [
    "No. That's — no. Let me explain why.",
    "Incorrect. But recoverable. Stay with me.",
    "Nope. That's not it. That's like the opposite of it.",
    "Wrong. But wrong in an interesting way. Let's unpack this.",
    "I've seen that answer before. It was wrong then too.",
    "You know what? In a different dimension, that's correct. This isn't that dimension.",
    "That's a guess. I can tell. Don't guess. Guess with information.",
    "Wrong answer. Right to try. Keep going.",
    "Incorrect. And I'm not going to pretend otherwise.",
    "Not quite. You got 80% of the way there. The other 20% is the part that matters.",
    "No. But the fact that you answered quickly means you're confident. Apply that confidence to the correct answer next time.",
    "Wrong, but I've seen dumber. Genuinely.",
    "That's not right. I'm going to tell you why, and then we're going to move on.",
    "Oof. Okay. New plan: we revisit this.",
    "Incorrect. The universe doesn't care. But I do, a little, which is why we're still here."
  ],

  /* ---- Hint responses (5) ---- */
  hint: [
    "Ugh. Fine. A hint. Here's a hint: think about what happens physically, not what feels right.",
    "You want a hint. Of course you want a hint. Okay. Think about who has the right of way here.",
    "Hint mode activated. I can't believe I'm in hint mode. Look at the shape and color. What does that tell you?",
    "I'm going to help you, but I'm going to be slightly judgmental about it. The answer involves a number. A specific one.",
    "Here's your hint: you've answered this type of question before. Trust what you already know."
  ],

  /* ---- Session intro lines (10) ---- */
  intro: [
    "Okay. Pay attention. This one matters.",
    "Here's one even Jerry might get right. Emphasis on might.",
    "I'm going to ask you something, and I need you to think before you answer. Just... try.",
    "Question time. And before you panic — don't. Panic is for people who haven't studied with me.",
    "Let's see what you've retained. I'm cautiously optimistic.",
    "Alright, the DMV wants to know if you're ready. So do I. Prove us both right.",
    "Focus. Just for the next 15 seconds. That's all I'm asking.",
    "In the infinite multiverse, there's a version of you who aces this. Let's find out if you're that version.",
    "Question inbound. Three... two... *burp* ...one.",
    "This is what we've been building to. Don't blow it."
  ],

  /* ---- Streak responses ---- */
  streak3: [
    "Three right in a row. You're not terrible at this.",
    "Three in a row. I'm not saying I'm surprised. I'm saying I noticed.",
    "Hat trick. In driving knowledge. Which is somehow even nerdier than a regular hat trick."
  ],

  streak10: [
    "Ten in a row. WUBBA LUBBA DUB DUB! Okay I'm not making that a habit.",
    "Ten consecutive correct answers. I've seen civilizations rise and fall with less consistency.",
    "Ten. T-E-N. I need to sit down. I'm sitting down. This is fine."
  ],

  streak20: [
    "Twenty. You got twenty in a row. I built a portal gun and I'm impressed by THIS.",
    "TWENTY CONSECUTIVE. Somewhere, the Galactic Federation is updating your file.",
    "Alright. ALRIGHT. Fine. You know what? You're *burp* you're not completely hopeless. Perfect streak."
  ],

  /* ---- Boss Battle start/pass/fail ---- */
  bossStart: [
    "Forty questions. This is the real deal. I'll be here but I won't be talking. You've got this. Probably.",
    "Boss Battle mode. No hints, no skips, no mercy. Just you, forty questions, and whatever you've learned. Go."
  ],

  bossPass: [
    "You passed. You actually passed. I designed this to be as hard as the real test. I need a moment.",
    "WUBBA LUBBA DUB DUB! That just happened. You passed the Boss Battle. Go get your actual G1. You're ready.",
    "You finished. All of it. I want you to know that I did not expect this to go as well as it did. That's a compliment. From me. Treat it like the rare thing it is."
  ],

  bossFail: [
    "You didn't pass. But you ATTEMPTED. That's step one. More than 40% of people don't even get to step one.",
    "Not this time. But listen — you know more now than you did before you started. That's not nothing. That's the whole point.",
    "It's fine. It's fine! In an infinite multiverse, there's a version of you that just aced this. We're just in one of the other ones. Come back."
  ],

  /* ---- Daily Mission greetings (index 0=Mon, 6=Sun) ---- */
  dailyGreet: [
    "Monday. The worst day of the week, objectively. Let's get this over with.",
    "Tuesday. The Tuesday of days. Let's go.",
    "Wednesday. Hump day. I don't know why humans call it that. Actually I do. Anyway. Questions.",
    "Thursday. Almost there. Four days down. Let's make today count.",
    "Friday. You could be doing literally anything else. You're studying. I respect that.",
    "Saturday. Weekend studying. That's either dedication or avoidance. Either way, let's go.",
    "Sunday. The calm before the Monday. Good time to lock this knowledge in."
  ],

  /* ---- Topic explanations (12 keys) ---- */
  topics: {
    'following-distance': "Three seconds minimum. At highway speed you cover 27 metres per second. Your brain takes 0.25 seconds to register danger. The math says three seconds. The math doesn't care about your confidence.",
    'right-of-way': "Right of way is a social contract. At a four-way stop: first to arrive, first to go. If simultaneous, yield to the right. If turning, yield to oncoming. This isn't complicated — it's just not instinctive.",
    'speed-limits': "Speed limits exist because someone, at some point, was going too fast and turned themselves into a before-and-after demonstration of momentum. The limit accounts for every other idiot on the road, not just you.",
    'seatbelts': "You know what a seatbelt does? It keeps your body from becoming a projectile inside your own vehicle. Driver is responsible for all passengers under 16. That's the law. The physics would have been enough.",
    'school-zones': "Children don't see cars. Children see opportunity to run. The school zone speed limit is 40 km/h when lights are flashing. Treat every child near a road as a variable you cannot predict.",
    'railroad-crossings': "The train always wins. It's 50,000 tons and it doesn't feel guilty. Stop when lights flash. Don't cross until the train is gone AND the lights stop flashing. Two separate conditions.",
    'emergency-vehicles': "Flashing lights and sirens trigger a primal brain response — and for once, your primal brain is right. Pull to the right. Stop. Wait until clear. It's the one rule every human gets instinctively.",
    'roundabouts': "You yield to traffic already IN the circle. Enter when there's a gap. Signal when exiting. Europe figured this out before North America. Don't argue with geometry.",
    'school-buses': "Red lights flashing equals stop — both directions — unless there's a physical median separating you. The median is the one time 'your side' gets to be selfish. No median: stop. Full stop.",
    'parallel-parking': "Spatial reasoning and patience — two things humans are famously bad at. Signal, pull alongside the car ahead, reverse at an angle toward the curb, straighten out. The DMV put this on the test as their little joke.",
    'construction-zones': "Men in orange vests. Slow down. Fines doubled in construction zones. They have families. Probably. Regardless: physics says the slower you go, the less damage when you inevitably misjudge something.",
    'signs-general': "Road signs use shape AND color as a system. Red means prohibition or stop. Yellow means warning. Green means go or guidance. Blue means services. White means regulatory. Shape is backup for when you can't read the word."
  },

  /* ---- Trophy unlock lines (20 keys) ---- */
  trophyUnlock: {
    'first-question': "You unlocked something. I designed the trophy system. It's more sophisticated than the actual G1 test.",
    'first-mode': "First mode complete. That's one down. In this dimension, that counts.",
    'streak-3': "Three in a row gets a trophy. I feel like the bar should be higher. But here we are.",
    'streak-10': "Ten in a row. WUBBA LUBBA DUB DUB! Okay I'm not making that a habit.",
    'streak-20': "Twenty consecutive. I've awarded medals for less. Actually, I haven't. This is meaningful.",
    'daily-3': "Three daily missions. You came back. Three times. I don't admit to being touched by things. I'm not admitting that now.",
    'daily-7': "Seven days straight. A full week. The DMV doesn't deserve your dedication. But the G1 test will respect it.",
    'speed-15': "Speed round. Fifteen correct in sixty seconds. You went fast. I respect velocity.",
    'sign-perfect': "Road signs. All of them. Perfect. You know every sign. You're basically a stop sign yourself. A very well-informed one.",
    'boss-attempt': "You attempted the Boss Battle. That already puts you ahead of everyone who didn't try. Which is most people.",
    'boss-pass': "You passed the Boss Battle. You're ready for the real thing. I designed this test. I don't say that lightly.",
    'boss-perfect': "Perfect on the Boss Battle. Forty questions. Forty correct. I need to recalibrate the difficulty. This is a compliment.",
    'no-hints': "You didn't use any hints. That means you either know the material or you're stubborn. Both qualities serve you well.",
    'comeback': "You were losing. Then you won. That's a narrative arc. I respect narrative arcs.",
    'rick-mode': "I turned myself into a PICKLE, Morty! I'm Pickle RICK! ...That has nothing to do with driving. Let's move on.",
    'night-owl': "You're studying at 2 AM. That's either dedication or insomnia. Either way, knowledge doesn't care what time it is.",
    'daily-streak-7': "Seven day streak on the Daily Mission. I'm putting this in your file. I keep your file.",
    'rick-certified': "Rick-Certified. Level 15. I made up this level system and I'm taking it seriously. You should too.",
    'interdimensional': "You got everything. Every trophy. In every dimension I've visited, very few entities complete what they start. You are one of them.",
    'level-up': "Level up. You're progressing. Don't let it go to your head."
  }

};
