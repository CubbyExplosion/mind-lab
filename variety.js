// Mind Lab variety: every card, button, answer and badge arrives and reacts with its OWN animation (10 different ones),
// so neighbours never move the same way. The look is in anim.css ([data-av="0".."9"]).
(function () {
  const SEL = ".subject,.level,.lesson-card,.choice,.hintbtn,.close,.back,.exdot,.exam-card,.mindcard,.mc-sum > div,.np,.shelf > *,.an-replay,.cwrap,.music-btn,.pm-tabs button,.ex-stat";
  let n = 0;
  function tag(el) {
    if (el.dataset.av !== undefined) return;
    const sib = el.parentNode ? Array.prototype.indexOf.call(el.parentNode.children, el) : 0;
    el.dataset.av = String((n++ * 3 + sib * 7) % 10); el.classList.add("vv");
    el.style.setProperty("--i", el.style.getPropertyValue("--i") || String(Math.min(sib, 24)));
  }
  function scan(root) {
    if (root.nodeType !== 1) return;
    if (root.matches && root.matches(SEL)) tag(root);
    root.querySelectorAll && root.querySelectorAll(SEL).forEach(tag);
  }
  new MutationObserver(ms => { for (const m of ms) m.addedNodes.forEach(scan); }).observe(document.body, { childList: true, subtree: true });
  scan(document.body);
})();
