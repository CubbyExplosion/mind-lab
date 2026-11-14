// Mind Lab book effects: books tilt toward your pointer, the cover swings open, pages curl as they turn,
// lines of text appear one by one, a bookmark ribbon shows how far you have read, and the page corner curls when you hover it.
(function () {
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sfx = n => { try { window.MindSfx && window.MindSfx.play(n); } catch (e) {} };

  // ---------- 1. books on the shelf lean toward the pointer ----------
  document.addEventListener("pointermove", e => {
    if (reduce || e.pointerType === "touch") return;
    const b = e.target.closest && e.target.closest(".bk .cover, .book-head .cover");
    document.querySelectorAll(".cover.tilt").forEach(c => { if (c !== b) { c.classList.remove("tilt"); c.style.removeProperty("--rx"); c.style.removeProperty("--ry"); } });
    if (!b) return;
    const r = b.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    b.classList.add("tilt"); b.style.setProperty("--ry", (x * 18).toFixed(1) + "deg"); b.style.setProperty("--rx", (-y * 14).toFixed(1) + "deg");
  });

  // ---------- 2. the cover swings open when a book is opened ----------
  function openAnim(sid, n) {
    if (reduce || typeof coverHTML !== "function") return;
    try {
      const s = subj(sid), ov = document.createElement("div"); ov.className = "bk-open";
      ov.innerHTML = `<div class="bk-open-book"><div class="bk-open-page"></div><div class="bk-open-cover">${coverHTML(s, n, true)}</div></div>`;
      document.body.appendChild(ov); sfx("swish"); setTimeout(() => sfx("flip"), 380);
      setTimeout(() => ov.classList.add("fade"), 1350); setTimeout(() => ov.remove(), 1900);
    } catch (e) {}
  }
  // books.js loads after this file, so wrap openBook once everything has loaded
  const wrap = () => {
    if (typeof openBook !== "function" || window.__bookfxWrapped) return; window.__bookfxWrapped = true;
    const orig = openBook;
    window.openBook = function (sid, n, page) { const first = !document.querySelector(".bk-page"); const r = orig.apply(this, arguments); if (first && (!page || page === 1)) openAnim(sid, n); return r; };
  };
  if (document.readyState === "complete") wrap(); else window.addEventListener("load", wrap);

  // ---------- 3. page extras (curl, ribbon, corner, sparkles, line reveal) ----------
  function dress(pg) {
    if (!pg || pg.dataset.fx) return; pg.dataset.fx = "1";
    // lines appear one after another
    [...pg.children].forEach((el, i) => { if (!el.matches(".bk-foot, .bk-sip, .anim-box")) el.style.setProperty("--ln", Math.min(i, 14)); });
    pg.classList.add("lines");
    if (reduce) return;
    // a moving shadow like a page sweeping over
    const curl = document.createElement("div"); curl.className = "bk-curl" + (pg.classList.contains("back") ? " back" : ""); pg.appendChild(curl); setTimeout(() => curl.remove(), 900);
    // bookmark ribbon: grows with how far through the book you are
    const range = document.getElementById("pg");
    if (range) { const p = (+range.value - 1) / Math.max(1, +range.max - 1), rb = document.createElement("div"); rb.className = "bk-ribbon"; rb.style.setProperty("--p", (28 + p * 72).toFixed(0) + "px"); pg.appendChild(rb); }
    // the corner: hover to see it curl, tap to turn the page
    if (!pg.querySelector(".bk-lock")) {
      const c = document.createElement("button"); c.type = "button"; c.className = "bk-corner"; c.setAttribute("aria-label", "Turn the page"); c.onclick = () => { const nx = document.getElementById("next"); if (nx) nx.click(); };
      pg.appendChild(c);
    }
    // a few gentle sparkles drifting up the page
    for (let i = 0; i < 6; i++) { const s = document.createElement("i"); s.className = "bk-dust"; s.style.left = (8 + Math.random() * 84) + "%"; s.style.animationDelay = (Math.random() * 6) + "s"; s.style.animationDuration = (6 + Math.random() * 6) + "s"; pg.appendChild(s); }
  }
  new MutationObserver(ms => { for (const m of ms) m.addedNodes.forEach(n => { if (n.nodeType === 1) { if (n.classList.contains("bk-page")) dress(n); else n.querySelectorAll && n.querySelectorAll(".bk-page").forEach(dress); } }); }).observe(document.body, { childList: true, subtree: true });
  document.querySelectorAll(".bk-page").forEach(dress);

  // ---------- 4. swipe to turn pages (touch or mouse drag on the page) ----------
  let sx = 0, sy = 0, down = false;
  document.addEventListener("pointerdown", e => { const p = e.target.closest && e.target.closest(".bk-page"); if (!p || e.target.closest("button, input, a, .choice")) return; down = true; sx = e.clientX; sy = e.clientY; });
  document.addEventListener("pointerup", e => {
    if (!down) return; down = false; const dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) < 70 || Math.abs(dy) > 60) return;
    const b = document.getElementById(dx < 0 ? "next" : "prev"); if (b) b.click();
  });
})();
