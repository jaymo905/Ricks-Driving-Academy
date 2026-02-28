/* ============================================================
   boss-battle.js — 40-question G1 simulation (75 min timer)
   ============================================================ */

const BossBattle = (() => {

  const DURATION_MINS = 75;
  const DURATION_SECS = DURATION_MINS * 60;
  let timeLeft      = DURATION_SECS;
  let timerInterval = null;

  function start() {
    timeLeft = DURATION_SECS;

    const questions = getBossQuestions(); // 40 questions
    Engine.start(questions, 'boss', {
      onAnswer:   handleAnswer,
      onComplete: handleComplete
    });

    showScreen('screen-quiz');

    document.getElementById('quiz-mode-badge').textContent = 'Boss Battle';
    document.getElementById('quiz-meta').textContent = _formatTime(timeLeft);

    // No hint, no skip in boss mode
    document.getElementById('hint-btn').classList.add('hidden');
    document.getElementById('skip-btn').classList.add('hidden');

    document.getElementById('quiz-back-btn').onclick = () => {
      _clearTimer();
      showScreen('screen-menu');
    };

    // Rick says one thing then goes silent
    const startLine = RICK_DIALOGUE.bossStart[Math.floor(Math.random() * RICK_DIALOGUE.bossStart.length)];
    Rick.showBubble('quiz-bubble', startLine, 4000);

    _startTimer();
    renderQuestion();
  }

  function _startTimer() {
    _clearTimer();
    timerInterval = setInterval(() => {
      timeLeft--;
      const meta = document.getElementById('quiz-meta');
      if (meta) meta.textContent = _formatTime(timeLeft);

      if (timeLeft <= 0) {
        _clearTimer();
        // Force engine to complete with current progress
        const prog = Engine.getProgress();
        _showResults({
          correct: prog.correct,
          total:   40,
          pct:     Math.round((prog.correct / 40) * 100),
          xpEarned: prog.correct > 0 ? 50 : 50,
          mode:    'boss',
          leveled: false
        });
      }
    }, 1000);
  }

  function _clearTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function _formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function renderQuestion() {
    const q = Engine.current();
    if (!q) return;

    const prog = Engine.getProgress();
    document.getElementById('q-number').textContent =
      'Question ' + prog.current + ' of 40';

    document.getElementById('q-text').textContent = q.question;
    setSvg('sign-display', q.signSvg);
    buildOptionButtons(q, submitAnswer);
  }

  function submitAnswer(index) {
    Engine.submit(index);
  }

  function handleAnswer({ correct, question }) {
    // Boss mode: feedback only — no Rick reaction, no streak comments
    showAnswerFeedback(correct, question.answer, question);

    setTimeout(() => {
      const next = Engine.next();
      if (next) renderQuestion();
    }, 800);
  }

  function handleComplete(results) {
    _clearTimer();
    _showResults(results);
  }

  function _showResults(results) {
    _clearTimer();

    const passed = results.pct >= 80;
    const perfect = results.correct === 40;

    // Update stats
    const state = getState();
    state.stats.bossAttempts = (state.stats.bossAttempts || 0) + 1;
    if (passed) state.stats.bossPasses = (state.stats.bossPasses || 0) + 1;
    saveState(state);

    Trophies.check('boss-attempt');
    if (passed)  Trophies.check('boss-pass');
    if (perfect) Trophies.check('boss-perfect');
    Trophies.check('night-owl');
    if (results.leveled) Trophies.check('level', { level: results.newLevel });

    showScreen('screen-results');

    document.getElementById('results-title').textContent =
      passed ? 'Boss Battle — PASSED' : 'Boss Battle — Not Yet';
    document.getElementById('results-score').textContent = results.pct + '%';
    document.getElementById('results-stats').textContent =
      results.correct + ' / 40 correct \u2022 Pass = 80%';
    document.getElementById('results-xp').textContent = '+' + results.xpEarned + ' XP';

    // Rick delivers pass or fail line
    const lines = passed ? RICK_DIALOGUE.bossPass : RICK_DIALOGUE.bossFail;
    const line  = lines[Math.floor(Math.random() * lines.length)];
    Rick.showBubble('results-bubble', line, 0);

    document.getElementById('play-again-btn').style.display = '';
    document.getElementById('play-again-btn').onclick = start;
    document.getElementById('results-menu-btn').onclick = () => showScreen('screen-menu');
    updateTopBar();
  }

  return { start };

})();
