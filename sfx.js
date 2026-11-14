// Mind Lab sound effects: every button, answer, page, animation and screen has its own little sound.
// All sounds are made with the Web Audio API (no files). MindSfx.play("name") plays one; the Sounds button turns them on/off.
(function () {
  let ctx = null, master = null, noiseBuf = null, on = true;
  try { on = localStorage.getItem("mindlab-sfx") !== "off"; } catch (e) {}
  function ac() {
    if (!ctx) {
      const C = window.AudioContext || window.webkitAudioContext; if (!C) return null;
      ctx = new C(); master = ctx.createGain(); master.gain.value = 0.5;
      const comp = ctx.createDynamicsCompressor(); master.connect(comp); comp.connect(ctx.destination);
      noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate); const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }
  // a single tone: frequency, length, wave, volume, slide-to frequency, delay
  function tone(f, dur, type, vol, to, delay) {
    const c = ac(); if (!c) return; const t = c.currentTime + (delay || 0), o = c.createOscillator(), g = c.createGain();
    o.type = type || "sine"; o.frequency.setValueAtTime(f, t); if (to) o.frequency.exponentialRampToValueAtTime(Math.max(20, to), t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.3, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + 0.05);
  }
  // a burst of noise through a filter (whoosh, fizz, boom, rain)
  function noise(dur, freq, vol, type, to, delay) {
    const c = ac(); if (!c) return; const t = c.currentTime + (delay || 0), s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    s.buffer = noiseBuf; s.loop = true; f.type = type || "bandpass"; f.frequency.setValueAtTime(freq, t); if (to) f.frequency.exponentialRampToValueAtTime(Math.max(30, to), t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.3, t + Math.min(0.03, dur / 3)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(master); s.start(t); s.stop(t + dur + 0.05);
  }
  const N = { C4: 262, D4: 294, E4: 330, F4: 349, G4: 392, A4: 440, B4: 494, C5: 523, D5: 587, E5: 659, F5: 698, G5: 784, A5: 880, C6: 1047 };
  const SFX = {
    click() { tone(660, .07, "triangle", .22, 520); },
    hover() { tone(1200, .025, "sine", .025); },
    pick() { tone(520, .08, "square", .12, 700); tone(780, .06, "triangle", .12, null, .05); },
    back() { tone(500, .09, "triangle", .2, 330); },
    next() { tone(440, .07, "triangle", .2); tone(660, .09, "triangle", .2, null, .06); },
    swish() { noise(.22, 700, .1, "bandpass", 2400); },
    right() { [N.C5, N.E5, N.G5, N.C6].forEach((f, i) => tone(f, .22, "triangle", .3, null, i * .08)); tone(N.C6, .4, "sine", .15, null, .3); },
    wrong() { tone(220, .25, "sawtooth", .22, 150); tone(165, .3, "square", .12, 110, .1); },
    hint() { tone(880, .12, "sine", .22); tone(1320, .2, "sine", .18, null, .1); noise(.15, 5000, .04, "highpass", null, .08); },
    cheer() { [N.G4, N.C5, N.E5, N.G5].forEach((f, i) => tone(f, .18, "square", .14, null, i * .06)); },
    finish() { [N.C5, N.E5, N.G5, N.C6, N.G5, N.C6].forEach((f, i) => tone(f, .28, "triangle", .3, null, i * .13)); tone(N.C6, .9, "sine", .2, null, .8); noise(.5, 6000, .08, "highpass", null, .75); },
    sad() { [N.G4, N.E4, N.C4].forEach((f, i) => tone(f, .3, "triangle", .25, f * .96, i * .17)); },
    star() { tone(1047, .25, "sine", .25); tone(1568, .35, "sine", .2, null, .08); },
    pop() { tone(300, .09, "sine", .3, 900); },
    tick() { tone(900, .04, "square", .1); },
    drop() { tone(700, .18, "sine", .22, 180); },
    flip() { noise(.18, 1500, .14, "bandpass", 5000); noise(.1, 3000, .08, "highpass", null, .1); },
    boom() { noise(.7, 300, .6, "lowpass", 60); tone(110, .5, "sine", .5, 35); noise(.4, 2500, .2, "highpass", null, .02); },
    fizz() { noise(1.2, 6000, .1, "highpass"); },
    rumble() { noise(1.6, 120, .35, "lowpass", 70); tone(55, 1.5, "sawtooth", .08, 40); },
    launch() { noise(2.4, 400, .3, "lowpass", 2000); tone(70, 2.2, "sawtooth", .12, 140); },
    splash() { noise(.12, 3000, .07, "bandpass", 5000); },
    hum() { tone(180, .6, "sine", .1, 220); tone(360, .6, "sine", .05, 440); },
    thump() { tone(90, .12, "sine", .5, 50); tone(80, .14, "sine", .4, 45, .18); },
    beep() { tone(1000, .08, "square", .12); },
    clink() { tone(2200, .12, "triangle", .2, 1800); tone(3300, .15, "sine", .1, null, .03); },
    type() { noise(.03, 3500, .12, "highpass"); tone(1800, .02, "square", .04); },
    lock() { tone(440, .06, "square", .2); tone(880, .12, "triangle", .25, null, .06); },
    flag() { tone(660, .08, "triangle", .2); tone(990, .1, "triangle", .2, null, .07); tone(660, .08, "triangle", .15, null, .14); },
    grow() { tone(262, .6, "sine", .15, 523); tone(330, .6, "sine", .1, 659, .15); },
    note(f) { tone(f || 523, .3, "triangle", .25); },
    owl() { tone(420, .2, "sine", .2, 380); tone(380, .3, "sine", .2, 330, .25); },
    send() { tone(600, .08, "sine", .2, 900); },
    gotit() { tone(900, .1, "sine", .2); tone(1200, .12, "sine", .18, null, .1); },
    tickclock() { tone(1400, .03, "square", .08); }
  };
  function play(name, arg) {
    if (!on) return;
    try { const f = SFX[name]; if (f) f(arg); } catch (e) {}
  }
  function setOn(v) {
    on = !!v; try { localStorage.setItem("mindlab-sfx", on ? "on" : "off"); } catch (e) {}
    const b = document.getElementById("sfxBtn"); if (b) { b.textContent = "Sounds: " + (on ? "On" : "Off"); b.setAttribute("aria-pressed", on); }
    if (on) { ac(); play("gotit"); }
  }
  window.MindSfx = { play, tone, noise, get on() { return on; }, set: setOn, names: Object.keys(SFX) };

  // ---------- the Sounds button ----------
  function addBtn() {
    const m = document.getElementById("musicBtn"); if (!m || document.getElementById("sfxBtn")) return;
    const b = document.createElement("button"); b.className = "music-btn"; b.id = "sfxBtn"; b.type = "button"; b.textContent = "Sounds: " + (on ? "On" : "Off");
    b.onclick = () => setOn(!on); m.parentNode.insertBefore(b, m);
  }
  addBtn();

  // ---------- sounds for every click, hover and key ----------
  const CLICKABLE = "button, .subject, .level, .lesson-card, .exdot, .exam-card, a, summary, [role=button]";
  document.addEventListener("click", e => {
    const t = e.target.closest && e.target.closest(CLICKABLE); if (!t || t.id === "sfxBtn") return;
    if (t.classList.contains("choice")) play("pick");
    else if (t.classList.contains("back") || /^(quit|back|exback|list|prev|exprev)$/.test(t.id)) play("back");
    else if (/^(nx|next|go|nextL|exnext|handin|check|retake|again)$/.test(t.id)) play("next");
    else if (t.id === "hint" || t.id === "easier") play("hint");
    else if (t.id === "exflag") play("flag");
    else if (t.classList.contains("an-replay")) play("pop");
    else play("click");
  }, true);
  let lastHover = 0;
  document.addEventListener("mouseover", e => {
    const t = e.target.closest && e.target.closest(".subject, .level, .lesson-card, .book, .cover"); // only big cards, never buttons
    if (!t || t === lastHover) return; lastHover = t; play("hover");
  });
  let lastKey = 0;
  document.addEventListener("keydown", e => {
    const el = e.target; if (!el || !/^(INPUT|TEXTAREA)$/.test(el.tagName) || e.key.length > 1 && e.key !== "Backspace") return;
    const now = performance.now(); if (now - lastKey > 45) { lastKey = now; play("type"); }
  }, true);

  // ---------- sounds when things happen on screen ----------
  const seen = new WeakSet();
  const once = (el, name) => { if (el && !seen.has(el)) { seen.add(el); play(name); return true; } return false; };
  let lastApp = 0;
  new MutationObserver(() => {
    const r = document.querySelector(".choice.right"); if (r) once(r, "right");
    const w = document.querySelector(".choice.wrongc"); if (w) { if (!seen.has(w)) { seen.add(w); play("wrong"); } }
    const good = document.querySelector(".bubble.good"); if (good && !r) once(good, "right");
    const bad = document.querySelector(".bubble.bad"); if (bad && !w) once(bad, "wrong");
    const hint = document.querySelector(".bubble.hint"); if (hint) once(hint, "hint");
    const fin = document.querySelector(".finish"); if (fin && once(fin, /Not quite/.test(fin.textContent) ? "sad" : "finish")) { fin.querySelectorAll(".ex-stars i.on, .big svg").forEach((s, i) => setTimeout(() => play("star"), 500 + i * 330)); }
    const pg = document.querySelector(".bk-page"); if (pg) once(pg, "flip");
    const dropz = document.querySelector(".dropzone.over"); if (dropz) once(dropz, "tick");
    const now = performance.now(); const app = document.getElementById("app");
    if (app && app.firstElementChild && !seen.has(app.firstElementChild) && now - lastApp > 500) { seen.add(app.firstElementChild); lastApp = now; play("swish"); }
  }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
  // Hoot chat
  document.addEventListener("submit", () => play("send"), true);
  // first touch wakes the audio up (browsers need a click first)
  const wake = () => { ac(); document.removeEventListener("pointerdown", wake, true); };
  document.addEventListener("pointerdown", wake, true);
})();
