// Mind Lab interactive lesson questions: drag answers into a box, tap to count, a number pad,
// and happy / shaky reactions with floating points and combos. Works only on lesson questions (not the exam).
(function () {
  const sfx = (n, a) => { try { window.MindSfx && window.MindSfx.play(n, a); } catch (e) {} };
  let suppress = 0, combo = 0, lastPts = null, lastS = null, drag = null;

  function inLesson() { return !!(document.getElementById("bubble") && document.querySelector(".q-card .q-text")); }

  // ---------- drag an answer into the box ----------
  function addDrop(card) {
    const choices = card.querySelector(".choices"); if (!choices || card.querySelector(".dropzone")) return;
    const z = document.createElement("div"); z.className = "dropzone"; z.innerHTML = '<span>Drag your answer here</span><small>(or just tap it)</small>';
    choices.before(z);
    choices.querySelectorAll(".choice").forEach(b => b.addEventListener("pointerdown", e => {
      if (b.disabled || (e.button && e.button !== 0)) return;
      drag = { b, z, x: e.clientX, y: e.clientY, on: false, ghost: null };
    }));
  }
  window.addEventListener("pointermove", e => {
    if (!drag) return;
    if (!drag.on) {
      if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < 9) return;
      drag.on = true; document.body.classList.add("dragging"); drag.b.classList.add("dragsrc");
      const g = drag.b.cloneNode(true); g.className = "choice ghost"; g.removeAttribute("id"); document.body.appendChild(g); drag.ghost = g; sfx("pick");
    }
    const g = drag.ghost; g.style.left = e.clientX + "px"; g.style.top = e.clientY + "px";
    const r = drag.z.getBoundingClientRect(), over = e.clientX > r.left && e.clientX < r.right && e.clientY > r.top - 10 && e.clientY < r.bottom + 10;
    if (over !== drag.z.classList.contains("over")) { drag.z.classList.toggle("over", over); if (over) sfx("tick"); }
    e.preventDefault();
  }, { passive: false });
  window.addEventListener("pointerup", e => {
    if (!drag) return; const d = drag; drag = null;
    if (!d.on) return;
    document.body.classList.remove("dragging"); d.b.classList.remove("dragsrc"); if (d.ghost) d.ghost.remove();
    const over = d.z.classList.contains("over"); d.z.classList.remove("over"); suppress = performance.now() + 150;
    if (over && d.b.isConnected && !d.b.disabled) {
      d.z.classList.add("got"); d.z.querySelector("span").textContent = d.b.dataset.v; sfx("drop");
      d.b.onclick && d.b.onclick();
      setTimeout(() => { if (d.z.isConnected) { d.z.classList.remove("got"); d.z.querySelector("span").textContent = "Drag your answer here"; } }, 900);
    }
  });
  document.addEventListener("click", e => { if (suppress > performance.now() && e.target.closest && e.target.closest(".choice")) { e.stopPropagation(); e.preventDefault(); } }, true);

  // ---------- tap each thing to count it ----------
  function addCount(card) {
    const q = (card.querySelector(".q-text") || {}).textContent || "", vis = card.querySelector(".visual");
    if (!vis || !/how many|count/i.test(q) || vis.dataset.cnt) return;
    const icons = [...vis.querySelectorAll("svg.ico")]; if (icons.length < 2 || icons.length > 30) return;
    vis.dataset.cnt = "1";
    const box = document.createElement("div"); box.className = "countbox"; box.innerHTML = 'Tap each one to count it: <b>0</b>';
    vis.after(box); let n = 0;
    icons.forEach(ic => {
      const w = document.createElement("span"); w.className = "cwrap"; ic.replaceWith(w); w.appendChild(ic);
      w.onclick = () => {
        if (w.dataset.n) return; n++; w.dataset.n = n;
        const bd = document.createElement("i"); bd.className = "cnum"; bd.textContent = n; w.appendChild(bd); w.classList.add("counted");
        const b = box.querySelector("b"); b.textContent = n; b.classList.remove("tick"); void b.offsetWidth; b.classList.add("tick");
        sfx("note", 330 + n * 40);
      };
    });
  }

  // ---------- number pad ----------
  function addPad(card) {
    const input = card.querySelector("#ans"); if (!input || input.getAttribute("inputmode") !== "numeric" || card.querySelector(".numpad")) return;
    const pad = document.createElement("div"); pad.className = "numpad";
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "<"].forEach(k => {
      const b = document.createElement("button"); b.type = "button"; b.className = "np"; b.textContent = k === "<" ? "Del" : k;
      if (k === "C" || k === "<") b.classList.add("np-x");
      b.onclick = e => {
        e.stopPropagation(); if (input.disabled) return;
        // after a wrong try the old answer is highlighted: typing a new number replaces it
        if (input.value && input.selectionStart === 0 && input.selectionEnd === input.value.length && k !== "C") input.value = "";
        if (k === "C") input.value = ""; else if (k === "<") input.value = input.value.slice(0, -1); else input.value += k;
        input.focus(); input.dispatchEvent(new Event("input"));
      };
      pad.appendChild(b);
    });
    card.querySelector(".answer-row").after(pad);
  }

  function enhance() {
    if (!inLesson()) return;
    const card = document.querySelector(".q-card"); if (!card || card.dataset.ix) return;
    card.dataset.ix = "1";
    if (typeof S !== "undefined" && S !== lastS) { lastS = S; combo = 0; lastPts = S.points; }
    addDrop(card); addPad(card);
    setTimeout(() => addCount(card), 120);
  }

  // ---------- happy and shaky reactions ----------
  function floatText(card, txt, cls) {
    const f = document.createElement("div"); f.className = "floatfx " + (cls || ""); f.innerHTML = txt; card.appendChild(f); setTimeout(() => f.remove(), 1500);
  }
  const seen = new WeakSet();
  function react() {
    const card = document.querySelector(".q-card"); if (!card || !inLesson()) return;
    const good = document.querySelector(".bubble.good"), bad = document.querySelector(".bubble.bad"), hint = document.querySelector(".bubble.hint");
    if (good && !seen.has(good)) {
      seen.add(good);
      let pts = 1; try { pts = S.lastGain != null ? S.lastGain : 1; } catch (e) {}
      combo = pts >= 3 ? combo + 1 : 0; /* a fixed mistake (+1) does not add to a combo */
      card.classList.remove("shake"); card.classList.add("yay"); setTimeout(() => card.classList.remove("yay"), 900);
      floatText(card, "+" + pts, "pts");
      if (combo >= 2) { setTimeout(() => { floatText(card, "Combo x" + combo + "!", "combo"); sfx("cheer"); }, 250); }
      card.querySelectorAll(".visual .ico").forEach((ic, i) => { ic.style.animation = "none"; void ic.getBoundingClientRect(); ic.style.animation = "anPop .5s cubic-bezier(.3,1.8,.5,1) " + i * 60 + "ms both"; });
    }
    if (bad && !seen.has(bad)) { seen.add(bad); combo = 0; card.classList.remove("yay", "shake"); void card.offsetWidth; card.classList.add("shake"); setTimeout(() => card.classList.remove("shake"), 700); }
    if (hint && !seen.has(hint)) { seen.add(hint); const t = document.querySelector(".tutor"); if (t) { t.classList.remove("glow"); void t.offsetWidth; t.classList.add("glow"); } }
  }
  let pending = 0;
  new MutationObserver(() => { if (pending) return; pending = requestAnimationFrame(() => { pending = 0; enhance(); react(); }); }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
})();
