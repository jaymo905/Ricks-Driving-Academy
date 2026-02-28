/* ============================================================
   rick.js — Rick dialogue engine and avatar controller
   All text via textContent — never innerHTML.
   ============================================================ */

const Rick = (() => {

  function setAvatarState(avatarId, state) {
    const el = document.getElementById(avatarId);
    if (!el) return;
    el.className = 'rick-avatar ' + state;
    if (state !== 'idle') {
      setTimeout(() => {
        if (el.className.includes(state)) {
          el.className = 'rick-avatar idle';
        }
      }, 800);
    }
  }

  /* Anti-repeat line picker */
  function getLine(context) {
    const pool = RICK_DIALOGUE[context];
    if (!pool || pool.length === 0) return '';

    const seen = getSeenDialogue(context);
    let available = pool
      .map((line, idx) => ({ line, idx }))
      .filter(({ idx }) => !seen.includes(idx));

    if (available.length === 0) {
      clearSeenDialogue(context);
      available = pool.map((line, idx) => ({ line, idx }));
    }

    const pick = available[Math.floor(Math.random() * available.length)];
    markDialogueSeen(context, pick.idx);
    return pick.line;
  }

  function getTopicLine(topic) {
    const topics = RICK_DIALOGUE.topics || {};
    return topics[topic] || "That's the rule. Don't argue with the rule.";
  }

  function showBubble(bubbleId, text, duration) {
    const el = document.getElementById(bubbleId);
    if (!el) return;
    el.textContent = text;
    el.classList.remove('hidden');
    if (duration && duration > 0) {
      setTimeout(() => hideBubble(bubbleId), duration);
    }
  }

  function hideBubble(bubbleId) {
    const el = document.getElementById(bubbleId);
    if (el) el.classList.add('hidden');
  }

  function reactCorrect(avatarId, bubbleId) {
    setAvatarState(avatarId, 'correct');
    showBubble(bubbleId, getLine('correct'), 0);
  }

  function reactWrong(avatarId, bubbleId, topic) {
    setAvatarState(avatarId, 'wrong');
    const wrongLine = getLine('wrong');
    const topicLine = topic ? getTopicLine(topic) : '';
    const full = topicLine ? wrongLine + ' ' + topicLine : wrongLine;
    showBubble(bubbleId, full, 0);
  }

  function reactStreak(avatarId, bubbleId, streak) {
    let context = null;
    if (streak >= 20) context = 'streak20';
    else if (streak >= 10) context = 'streak10';
    else if (streak >= 3 && streak % 3 === 0) context = 'streak3';

    if (!context) return;
    setAvatarState(avatarId, 'correct');
    showBubble(bubbleId, getLine(context), 0);
  }

  function reactHint(bubbleId, hintText) {
    const hintIntro = getLine('hint');
    showBubble(bubbleId, hintIntro + (hintText ? ' ' + hintText : ''), 0);
  }

  function intro(bubbleId) {
    showBubble(bubbleId, getLine('intro'), 3000);
  }

  return {
    setAvatarState,
    getLine,
    getTopicLine,
    showBubble,
    hideBubble,
    reactCorrect,
    reactWrong,
    reactStreak,
    reactHint,
    intro
  };

})();
