// Mind Lab playful extras: confetti when you get something right or finish a lesson.
(function () {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let cv = null, cx = null, parts = [], raf = 0;
  function ensure() {
    if (cv) return;
    cv = document.createElement("canvas"); cv.id = "confetti"; document.body.appendChild(cv); cx = cv.getContext("2d");
    const fit = () => { cv.width = innerWidth; cv.height = innerHeight; }; fit(); addEventListener("resize", fit);
  }
  const COL = ["#ffd34e", "#ff6fb5", "#4cc3ff", "#6be28f", "#ff8a2a", "#b48cff"];
  function burst(x, y, n, spread) {
    ensure();
    for (let i = 0; i < n; i++) {
      const a = (Math.random() * spread) - spread / 2 - Math.PI / 2, s = 4 + Math.random() * 9;
      parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, g: 0.24, r: 4 + Math.random() * 6, rot: Math.random() * 6, vr: (Math.random() - .5) * .4, c: COL[(Math.random() * COL.length) | 0], shape: (Math.random() * 3) | 0, life: 1 });
    }
    if (!raf) raf = requestAnimationFrame(tick);
  }
  function star(c, r) { c.beginPath(); for (let i = 0; i < 10; i++) { const a = i * Math.PI / 5, rr = i % 2 ? r * .45 : r; c.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } c.closePath(); c.fill(); }
  function tick() {
    cx.clearRect(0, 0, cv.width, cv.height);
    parts = parts.filter(p => p.life > 0 && p.y < cv.height + 20);
    for (const p of parts) {
      p.vy += p.g; p.x += p.vx; p.y += p.vy; p.vx *= .99; p.rot += p.vr; p.life -= 0.006;
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.rot); cx.fillStyle = p.c; cx.globalAlpha = Math.max(0, Math.min(1, p.life * 1.6));
      if (p.shape === 0) cx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * .6); else if (p.shape === 1) { cx.beginPath(); cx.arc(0, 0, p.r / 2, 0, 7); cx.fill(); } else star(cx, p.r);
      cx.restore();
    }
    raf = parts.length ? requestAnimationFrame(tick) : 0;
    if (!raf) cx.clearRect(0, 0, cv.width, cv.height);
  }
  window.playConfetti = burst;
  // watch for happy moments
  let lastRight = null, finished = false;
  new MutationObserver(() => {
    const r = document.querySelector(".choice.right");
    if (r && r !== lastRight) { lastRight = r; const b = r.getBoundingClientRect(); burst(b.left + b.width / 2, b.top + b.height / 2, 26, 4.4); }
    else if (!r) lastRight = null;
    const good = document.querySelector(".bubble.good");
    if (good && good !== lastRight && !r) { lastRight = good; const b = good.getBoundingClientRect(); burst(b.left + 40, b.top + b.height / 2, 22, 4.4); }
    const fin = document.querySelector(".finish");
    if (fin && !finished) { finished = true; burst(innerWidth * .2, innerHeight * .75, 70, 2.2); burst(innerWidth * .8, innerHeight * .75, 70, 2.2); setTimeout(() => burst(innerWidth * .5, innerHeight * .6, 90, 5), 350); }
    else if (!fin) finished = false;
  }).observe(document.body, { childList: true, subtree: true });
  // ----- more animations -----
  const app = document.getElementById("app");
  let lastEnter = 0, tutorState = "";
  function stagger() {
    document.querySelectorAll(".visual, .bk-vis").forEach(v => v.querySelectorAll(".ico:not([data-pop])").forEach((ic, i) => { ic.setAttribute("data-pop", "1"); ic.style.animationDelay = Math.min(i, 14) * 110 + "ms, " + (1000 + i * 150) + "ms"; }));
    document.querySelectorAll(".grid > .subject, .levels > .level, .lesson-list > .lesson-card").forEach((el, i) => { if (!el.style.getPropertyValue("--i")) el.style.setProperty("--i", String(i % 30)); });
    const t = document.querySelector(".tutor");
    if (t) { const st = document.querySelector(".bubble.good") ? "cheer" : document.querySelector(".bubble.bad") ? "sad" : ""; if (st !== tutorState) { t.classList.remove("cheer", "sad"); void t.offsetWidth; if (st) t.classList.add(st); tutorState = st; } } else tutorState = "";
  }
  if (app) {
    app.classList.add("enter"); lastEnter = performance.now();
    new MutationObserver(() => {
      const now = performance.now();
      if (now - lastEnter > 700) { app.classList.remove("enter"); void app.offsetWidth; app.classList.add("enter"); lastEnter = now; }
    }).observe(app, { childList: true });
  }
  new MutationObserver(stagger).observe(document.body, { childList: true, subtree: true });
  stagger();
})();
