/* ============================================================
   daily-mission.js — Once-per-day with streak tracking
   ============================================================ */

const DailyMission = (() => {

  function start() {
    if (!isDailyAvailable()) {
      const state = getState();
      const streak = state.daily && state.daily.streak ? state.daily.streak : 0;
      Rick.showBubble('menu-bubble',
        "You already did today's mission. Come back tomorrow. Day " + streak + " streak intact.",
        4000);
      return;
    }

    const questions = getRandomQuestions(10);
    Engine.start(questions, 'daily', {
      onAnswer:   handleAnswer,
      onComplete: handleComplete
    });

    showScreen('screen-quiz');

    document.getElementById('quiz-mode-badge').textContent = 'Daily Mission';
    document.getElementById('quiz-meta').textContent = '10 questions';

    document.getElementById('hint-btn').classList.remove('hidden');
    document.getElementById('hint-btn').onclick = useHint;
    document.getElementById('skip-btn').classList.add('hidden');

    document.getElementById('quiz-back-btn').onclick = () => showScreen('screen-menu');

    // Day-of-week greeting (0=Sun, 1=Mon ... 6=Sat — map to Mon=0 index)
    const dayOfWeek = new Date().getDay(); // 0=Sun
    const dayIdx = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // convert to Mon=0
    const greet = RICK_DIALOGUE.dailyGreet[dayIdx] ||
      "Daily mission time. Let's see what you've got.";
    Rick.showBubble('quiz-bubble', greet, 3000);

    renderQuestion();
  }

  function renderQuestion() {
    const q = Engine.current();
    if (!q) return;

    const prog = Engine.getProgress();
    document.getElementById('q-number').textContent =
      'Question ' + prog.current + ' of ' + prog.total;

    document.getElementById('q-text').textContent = q.question;
    setSvg('sign-display', q.signSvg);
    buildOptionButtons(q, submitAnswer);
  }

  function submitAnswer(index) {
    Engine.submit(index);
  }

  function handleAnswer({ correct, question, streak }) {
    showAnswerFeedback(correct, question.answer, question);

    if (correct) {
      Rick.reactCorrect('quiz-rick', 'quiz-bubble');
      Rick.reactStreak('quiz-rick', 'quiz-bubble', streak);
    } else {
      Rick.reactWrong('quiz-rick', 'quiz-bubble', question.rickTopic);
    }

    Trophies.check('first-question');
    Trophies.check('streak', { streak });

    const delay = correct ? 1200 : 2500;
    setTimeout(() => {
      const next = Engine.next();
      if (next) renderQuestion();
    }, delay);
  }

  function handleComplete(results) {
    const streak = markDailyComplete();

    Trophies.check('mode-complete');
    Trophies.check('daily-complete', { streak });
    Trophies.check('daily-streak-7', { streak });
    Trophies.check('night-owl');
    if (results.leveled) Trophies.check('level', { level: results.newLevel });

    showScreen('screen-results');

    document.getElementById('results-title').textContent = 'Daily Mission — Done';
    document.getElementById('results-score').textContent = results.pct + '%';
    document.getElementById('results-stats').textContent =
      results.correct + ' / 10 \u2022 Day ' + streak + ' streak';
    document.getElementById('results-xp').textContent = '+' + results.xpEarned + ' XP';

    const line = results.pct >= 80
      ? "Daily mission complete. Day " + streak + " streak. Come back tomorrow."
      : "Day " + streak + ". We'll do better tomorrow. Come back.";
    Rick.showBubble('results-bubble', line, 0);

    // Hide play-again — daily is once per day
    document.getElementById('play-again-btn').style.display = 'none';
    document.getElementById('results-menu-btn').onclick = () => showScreen('screen-menu');
    updateTopBar();
  }

  function useHint() {
    const q = Engine.current();
    if (q) Rick.reactHint('quiz-bubble', q.rickHint);
  }

  return { start };

})();
