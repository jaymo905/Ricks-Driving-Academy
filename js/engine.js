/* ============================================================
   engine.js — Quiz engine with XP calculation
   ============================================================ */

const Engine = (() => {

  // XP per correct answer by mode
  const XP_RATES = {
    lecture: 10,
    speed:   15,
    signs:   10,
    daily:   5,   // base per correct; bonus added separately
    boss:    0    // boss XP awarded as lump sum on completion
  };

  let _questions  = [];
  let _idx        = 0;
  let _correct    = 0;
  let _streak     = 0;
  let _mode       = 'lecture';
  let _onAnswer   = null;
  let _onComplete = null;
  let _startTime  = null;

  function start(questions, mode, { onAnswer, onComplete }) {
    _questions  = questions;
    _idx        = 0;
    _correct    = 0;
    _streak     = 0;
    _mode       = mode || 'lecture';
    _onAnswer   = onAnswer;
    _onComplete = onComplete;
    _startTime  = Date.now();
  }

  function current() {
    if (_idx >= _questions.length) return null;
    return _questions[_idx];
  }

  function submit(answerIndex) {
    const q = current();
    if (!q) return;

    // answerIndex === -1 means forced wrong (speed blitz skip)
    const correct = answerIndex === q.answer;

    if (correct) {
      _correct++;
      _streak++;
    } else {
      _streak = 0;
    }

    recordAnswer(correct);

    if (_onAnswer) {
      _onAnswer({ correct, question: q, streak: _streak });
    }
  }

  function next() {
    _idx++;
    if (_idx >= _questions.length) {
      _finish();
      return null;
    }
    return _questions[_idx];
  }

  function _finish() {
    const total   = _questions.length;
    const pct     = total > 0 ? Math.round((_correct / total) * 100) : 0;
    const elapsed = Math.round((Date.now() - _startTime) / 1000);

    const { xpEarned, leveled, newLevel } = _calcXP(pct);

    if (_onComplete) {
      _onComplete({
        correct: _correct,
        total,
        pct,
        elapsed,
        mode: _mode,
        xpEarned,
        leveled,
        newLevel
      });
    }
  }

  function _calcXP(pct) {
    let xpEarned = 0;

    if (_mode === 'boss') {
      xpEarned = pct >= 80 ? 250 : 50;
    } else if (_mode === 'daily') {
      // 100 base + 5 per correct answer
      xpEarned = 100 + (_correct * 5);
    } else {
      const rate = XP_RATES[_mode] || 10;
      xpEarned = _correct * rate;
    }

    const { leveled, newLevel } = addXP(xpEarned);
    return { xpEarned, leveled, newLevel };
  }

  function getProgress() {
    return {
      current: _idx + 1,
      total:   _questions.length,
      correct: _correct,
      streak:  _streak
    };
  }

  return { start, current, submit, next, getProgress };

})();
