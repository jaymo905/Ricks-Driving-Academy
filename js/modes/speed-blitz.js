/* ============================================================
   speed-blitz.js — 60-second timer mode
   ============================================================ */

const SpeedBlitz = (() => {

  const DURATION = 60;
  let timeLeft   = DURATION;
  let timerInterval = null;
  let correctCount  = 0;
  let timerBar      = null;
  let timerFill     = null;

  function start() {
    timeLeft     = DURATION;
    correctCount = 0;

    const questions = getRandomQuestions(40); // more than we'll need in 60s
    Engine.start(questions, 'speed', {
      onAnswer:   handleAnswer,
      onComplete: handleComplete
    });

    showScreen('screen-quiz');

    document.getElementById('quiz-mode-badge').textContent = 'Speed Blitz';
    document.getElementById('quiz-meta').textContent = '60s';

    // Hint button — hidden in speed mode
    document.getElementById('hint-btn').classList.add('hidden');

    // Skip button
    const skipBtn = document.getElementById('skip-btn');
    skipBtn.classList.remove('hidden');
    skipBtn.onclick = skipQuestion;

    // Back button — stop timer on exit
    document.getElementById('quiz-back-btn').onclick = () => {
      _clearTimer();
      _removeTimerBar();
      showScreen('screen-menu');
    };

    _buildTimerBar();
    _startTimer();
    renderQuestion();

    Rick.showBubble('quiz-bubble', "Get schwifty! Sixty seconds. GO.", 3000);
  }

  function _buildTimerBar() {
    _removeTimerBar();
    timerBar  = document.createElement('div');
    timerBar.className = 'timer-bar';
    timerFill = document.createElement('div');
    timerFill.className = 'timer-fill';
    timerFill.style.width = '100%';
    timerBar.appendChild(timerFill);

    const quizScreen = document.getElementById('screen-quiz');
    const topBar = quizScreen.querySelector('.quiz-top-bar');
    quizScreen.insertBefore(timerBar, topBar.nextSibling);
  }

  function _removeTimerBar() {
    if (timerBar && timerBar.parentNode) {
      timerBar.parentNode.removeChild(timerBar);
    }
    timerBar  = null;
    timerFill = null;
  }

  function _startTimer() {
    _clearTimer();
    timerInterval = setInterval(() => {
      timeLeft--;
      _updateTimerDisplay();

      if (timeLeft <= 10) {
        if (timerFill) timerFill.classList.add('urgent');
        Rick.showBubble('quiz-bubble', "Come on, come on, COME ON.", 0);
      }

      if (timeLeft <= 0) {
        _clearTimer();
        Engine.next(); // triggers onComplete via engine finish logic
        // Engine.next returns null when done, we need to force completion
        _forceComplete();
      }
    }, 1000);
  }

  function _forceComplete() {
    const total   = Engine.getProgress().total;
    const pct     = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    _showResults({ correct: correctCount, total, pct, xpEarned: correctCount * 15, mode: 'speed' });
  }

  function _clearTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function _updateTimerDisplay() {
    const meta = document.getElementById('quiz-meta');
    if (meta) meta.textContent = timeLeft + 's';
    if (timerFill) timerFill.style.width = ((timeLeft / DURATION) * 100) + '%';
  }

  function renderQuestion() {
    const q = Engine.current();
    if (!q) return;

    const prog = Engine.getProgress();
    document.getElementById('q-number').textContent =
      'Q' + prog.current + ' \u2022 ' + correctCount + ' correct';

    document.getElementById('q-text').textContent = q.question;
    setSvg('sign-display', q.signSvg);
    buildOptionButtons(q, submitAnswer);
  }

  function submitAnswer(index) {
    Engine.submit(index);
  }

  function skipQuestion() {
    Engine.submit(-1); // forced wrong
    setTimeout(() => {
      const next = Engine.next();
      if (next) renderQuestion();
      else _forceComplete();
    }, 300);
  }

  function handleAnswer({ correct, question, streak }) {
    if (correct) correctCount++;
    showAnswerFeedback(correct, question.answer, question);
    Trophies.check('streak', { streak });

    setTimeout(() => {
      const next = Engine.next();
      if (next) renderQuestion();
      else _forceComplete();
    }, 300);
  }

  function handleComplete(results) {
    _clearTimer();
    _removeTimerBar();
    _showResults(results);
  }

  function _showResults(results) {
    _clearTimer();
    _removeTimerBar();

    // Save best score
    const state = getState();
    if (correctCount > (state.stats.bestSpeedBlitz || 0)) {
      state.stats.bestSpeedBlitz = correctCount;
      saveState(state);
    }

    Trophies.check('mode-complete');
    Trophies.check('speed-score', { score: correctCount });
    Trophies.check('night-owl');

    showScreen('screen-results');

    document.getElementById('results-title').textContent = 'Speed Blitz — Done';
    document.getElementById('results-score').textContent = correctCount + ' correct';
    document.getElementById('results-stats').textContent =
      'In 60 seconds \u2022 Best: ' + (getState().stats.bestSpeedBlitz || correctCount);
    document.getElementById('results-xp').textContent =
      '+' + (results.xpEarned || correctCount * 15) + ' XP';

    const line = correctCount >= 15
      ? "Speed round. " + correctCount + " correct in sixty seconds. You went fast. I respect velocity."
      : correctCount >= 8
        ? correctCount + " in sixty seconds. Not bad. Room to grow."
        : "We can do better than " + correctCount + ". Come back and try again.";
    Rick.showBubble('results-bubble', line, 0);

    document.getElementById('play-again-btn').style.display = '';
    document.getElementById('play-again-btn').onclick = start;
    document.getElementById('results-menu-btn').onclick = () => showScreen('screen-menu');
    updateTopBar();
  }

  return { start };

})();
