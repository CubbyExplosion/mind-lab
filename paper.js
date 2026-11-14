// Mind Lab working paper: a sheet of paper (500 wide, 1000 tall) to do your working out on while you answer a question.
// Draw with a pen in 5 colours, rub out, undo, or start a fresh sheet. Each question keeps its own sheet.
(function () {
  const W = 500, H = 1000;
  const COLORS = ["#1a1240", "#1e6fe0", "#e53935", "#2fb34a", "#ff8a2a"];
  let panel, btn, cv, cx, open = false, color = COLORS[0], size = 3, erase = false, cur = null, key = "", sheets = {}, strokes = [];
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  const sfx = n => { try { window.MindSfx && window.MindSfx.play(n); } catch (e) {} };

  function build() {
    btn = document.createElement("button"); btn.id = "paperBtn"; btn.type = "button"; btn.textContent = "Working paper"; btn.hidden = true;
    btn.onclick = () => toggle(!open);
    panel = document.createElement("div"); panel.id = "paperPanel"; panel.hidden = true;
    panel.innerHTML = `<div class="pp-bar">
        <b>Working paper</b>
        <span class="pp-cols">${COLORS.map((c, i) => `<i class="pp-col ${i === 0 ? "on" : ""}" data-c="${c}" style="background:${c}"></i>`).join("")}</span>
        <button type="button" data-s="3" class="pp-sz on" title="Thin">S</button><button type="button" data-s="6" class="pp-sz" title="Medium">M</button><button type="button" data-s="12" class="pp-sz" title="Thick">L</button>
        <button type="button" id="ppErase">Rubber</button><button type="button" id="ppUndo">Undo</button><button type="button" id="ppClear">New page</button><button type="button" id="ppClose">Close</button>
      </div>
      <div class="pp-scroll"><div class="pp-sheet" style="width:${W}px;height:${H}px"><canvas width="${W * dpr}" height="${H * dpr}" style="width:${W}px;height:${H}px"></canvas></div></div>`;
    document.body.append(btn, panel);
    cv = panel.querySelector("canvas"); cx = cv.getContext("2d"); cx.scale(dpr, dpr); cx.lineCap = "round"; cx.lineJoin = "round";
    panel.querySelectorAll(".pp-col").forEach(i => i.onclick = () => { color = i.dataset.c; erase = false; sync(); });
    panel.querySelectorAll(".pp-sz").forEach(b => b.onclick = () => { size = +b.dataset.s; sync(); });
    panel.querySelector("#ppErase").onclick = () => { erase = !erase; sync(); };
    panel.querySelector("#ppUndo").onclick = () => { strokes.pop(); redraw(); };
    panel.querySelector("#ppClear").onclick = () => { if (!strokes.length || confirm("Start a fresh page? This page will be wiped.")) { strokes.length = 0; redraw(); } };
    panel.querySelector("#ppClose").onclick = () => toggle(false);
    cv.addEventListener("pointerdown", down); cv.addEventListener("pointermove", move); cv.addEventListener("pointerup", up); cv.addEventListener("pointercancel", up);
    document.addEventListener("keydown", e => { if (e.key === "Escape" && open) toggle(false); });
  }
  function sync() {
    panel.querySelectorAll(".pp-col").forEach(i => i.classList.toggle("on", !erase && i.dataset.c === color));
    panel.querySelectorAll(".pp-sz").forEach(b => b.classList.toggle("on", +b.dataset.s === size));
    panel.querySelector("#ppErase").classList.toggle("on", erase);
  }
  function pos(e) { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * (W / r.width), (e.clientY - r.top) * (H / r.height)]; }
  function seg(s, a, b) {
    cx.globalCompositeOperation = s.erase ? "destination-out" : "source-over"; cx.strokeStyle = s.color; cx.lineWidth = s.erase ? s.size * 3 : s.size;
    cx.beginPath(); cx.moveTo(a[0], a[1]); cx.lineTo(b[0], b[1]); cx.stroke();
  }
  function dot(s, p) { cx.globalCompositeOperation = s.erase ? "destination-out" : "source-over"; cx.fillStyle = s.color; cx.beginPath(); cx.arc(p[0], p[1], (s.erase ? s.size * 3 : s.size) / 2, 0, 7); cx.fill(); }
  function redraw() {
    cx.globalCompositeOperation = "source-over"; cx.clearRect(0, 0, W, H);
    strokes.forEach(s => { if (s.pts.length === 1) dot(s, s.pts[0]); else for (let i = 1; i < s.pts.length; i++) seg(s, s.pts[i - 1], s.pts[i]); });
  }
  function down(e) {
    if (e.button && e.button !== 0) return; cv.setPointerCapture(e.pointerId);
    cur = { color, size, erase, pts: [pos(e)] }; strokes.push(cur); dot(cur, cur.pts[0]); e.preventDefault();
  }
  function move(e) { if (!cur) return; const p = pos(e), last = cur.pts[cur.pts.length - 1]; if (Math.hypot(p[0] - last[0], p[1] - last[1]) < 1.2) return; cur.pts.push(p); seg(cur, last, p); e.preventDefault(); }
  function up() { cur = null; }

  function toggle(v) {
    open = v; panel.hidden = !open; btn.classList.toggle("on", open); btn.textContent = open ? "Hide paper" : "Working paper";
    document.body.classList.toggle("paper-open", open); sfx(open ? "flip" : "back");
  }
  // each question has its own sheet
  function questionKey() {
    const q = document.querySelector(".q-card .q-text"); if (!q) return null;
    const v = document.querySelector(".q-card .visual");
    return q.textContent + "|" + (v ? v.textContent.length : 0) + "|" + (document.querySelector(".lesson-head") || {}).textContent;
  }
  function check() {
    const k = questionKey(); btn.hidden = !k;
    if (!k) { if (open) toggle(false); if (key) { sheets = {}; strokes = []; key = ""; redraw(); } return; }
    if (k !== key) { if (key) sheets[key] = strokes; key = k; strokes = sheets[k] || []; redraw(); }
  }
  build();
  let pending = 0;
  new MutationObserver(() => { if (pending) return; pending = requestAnimationFrame(() => { pending = 0; check(); }); }).observe(document.getElementById("app") || document.body, { childList: true, subtree: true });
  check();
})();
