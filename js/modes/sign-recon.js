/* ============================================================
   sign-recon.js — Signs only mode
   ============================================================ */

const SignRecon = (() => {

  let allCorrect = true;

  function start() {
    allCorrect = true;

    const signQuestions = QUESTIONS.filter(q => q.category === 'signs');
    // Shuffle
    const pool = signQuestions.slice();
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    Engine.start(pool, 'signs', {
      onAnswer:   handleAnswer,
      onComplete: handleComplete
    });

    showScreen('screen-quiz');

    document.getElementById('quiz-mode-badge').textContent = 'Sign Recon';
    document.getElementById('quiz-meta').textContent = pool.length + ' signs';

    document.getElementById('hint-btn').classList.remove('hidden');
    document.getElementById('hint-btn').onclick = useHint;
    document.getElementById('skip-btn').classList.add('hidden');

    document.getElementById('quiz-back-btn').onclick = () => showScreen('screen-menu');

    renderQuestion();
    Rick.showBubble('quiz-bubble',
      "Road signs. The hieroglyphics of this civilization. Let's see how many you know.", 3000);
  }

  function renderQuestion() {
    const q = Engine.current();
    if (!q) return;

    const prog = Engine.getProgress();
    document.getElementById('q-number').textContent =
      'Sign ' + prog.current + ' of ' + prog.total;

    document.getElementById('q-text').textContent = q.question;

    // Always show SVG in sign mode
    setSvg('sign-display', q.signSvg || '');

    buildOptionButtons(q, submitAnswer);
  }

  function submitAnswer(index) {
    Engine.submit(index);
  }

  function handleAnswer({ correct, question, streak }) {
    if (!correct) allCorrect = false;

    showAnswerFeedback(correct, question.answer, question);

    if (correct) {
      Rick.reactCorrect('quiz-rick', 'quiz-bubble');
      Rick.reactStreak('quiz-rick', 'quiz-bubble', streak);
    } else {
      Rick.reactWrong('quiz-rick', 'quiz-bubble', question.rickTopic);
    }

    Trophies.check('first-question');
    Trophies.check('streak', { streak });

    const delay = correct ? 1000 : 2000;
    setTimeout(() => {
      const next = Engine.next();
      if (next) renderQuestion();
    }, delay);
  }

  function handleComplete(results) {
    if (allCorrect) Trophies.check('sign-perfect');
    Trophies.check('mode-complete');
    Trophies.check('night-owl');
    if (results.leveled) Trophies.check('level', { level: results.newLevel });

    showScreen('screen-results');

    document.getElementById('results-title').textContent = 'Sign Recon — Done';
    document.getElementById('results-score').textContent = results.pct + '%';
    document.getElementById('results-stats').textContent =
      results.correct + ' / ' + results.total + ' signs identified';
    document.getElementById('results-xp').textContent = '+' + results.xpEarned + ' XP';

    const line = allCorrect
      ? "Road signs. All of them. Perfect. You know every sign. You're basically a stop sign yourself at this point."
      : results.pct >= 80
        ? "Good sign recognition. The ones you missed — look them up. They'll be on the real test."
        : "Signs use shape AND color as a system. Red means stop. Yellow means warning. Learn the system.";
    Rick.showBubble('results-bubble', line, 0);

    document.getElementById('play-again-btn').style.display = '';
    document.getElementById('play-again-btn').onclick = start;
    document.getElementById('results-menu-btn').onclick = () => showScreen('screen-menu');
    updateTopBar();
  }

  function useHint() {
    const q = Engine.current();
    if (q) Rick.reactHint('quiz-bubble', q.rickHint);
  }

  return { start };

})();
