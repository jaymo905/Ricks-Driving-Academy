/* ============================================================
   lecture.js — Classic Quiz mode (20 questions)
   FIRST PLAYABLE MILESTONE
   ============================================================ */

const Lecture = (() => {

  let hintsUsed = 0;

  function start() {
    hintsUsed = 0;

    const questions = getRandomQuestions(20);
    Engine.start(questions, 'lecture', {
      onAnswer:   handleAnswer,
      onComplete: handleComplete
    });

    showScreen('screen-quiz');

    document.getElementById('quiz-mode-badge').textContent = "Rick's Lecture";
    document.getElementById('quiz-meta').textContent = '';

    // Hint button
    const hintBtn = document.getElementById('hint-btn');
    hintBtn.classList.remove('hidden');
    hintBtn.onclick = useHint;

    // Skip button — hidden in lecture mode
    document.getElementById('skip-btn').classList.add('hidden');

    // Back button
    document.getElementById('quiz-back-btn').onclick = () => showScreen('screen-menu');

    renderQuestion();
    Rick.intro('quiz-bubble');
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
    Trophies.check('night-owl');

    const delay = correct ? 1200 : 2500;
    setTimeout(() => {
      const next = Engine.next();
      if (next) renderQuestion();
    }, delay);
  }

  function handleComplete(results) {
    Trophies.check('mode-complete');
    if (hintsUsed === 0) Trophies.check('no-hints');
    if (results.leveled) Trophies.check('level', { level: results.newLevel });

    showScreen('screen-results');

    document.getElementById('results-title').textContent = "Rick's Lecture — Done";
    document.getElementById('results-score').textContent = results.pct + '%';
    document.getElementById('results-stats').textContent =
      results.correct + ' / ' + results.total + ' correct';
    document.getElementById('results-xp').textContent = '+' + results.xpEarned + ' XP';

    const resultLine = results.pct >= 80
      ? RICK_DIALOGUE.bossPass[0]
      : results.pct >= 60
        ? "Not bad. Not great. But not bad. Come back."
        : "We have work to do. Come back tomorrow. Or today. Preferably today.";
    Rick.showBubble('results-bubble', resultLine, 0);

    // Wire buttons
    document.getElementById('play-again-btn').style.display = '';
    document.getElementById('play-again-btn').onclick = start;
    document.getElementById('results-menu-btn').onclick = () => showScreen('screen-menu');

    updateTopBar();
  }

  function useHint() {
    hintsUsed++;
    const q = Engine.current();
    if (q) Rick.reactHint('quiz-bubble', q.rickHint);
  }

  return { start };

})();
