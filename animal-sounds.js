// Tap an animal picture in a lesson and it makes its sound. All sounds are made live with the Web Audio API (no files).
// Nothing plays by itself, so a sound can never give away an answer.
(function () {
  let ctx = null, out = null;
  function ensure() {
    if (ctx) return;
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    const comp = ctx.createDynamicsCompressor(); out = ctx.createGain(); out.gain.value = 0.9; out.connect(comp); comp.connect(ctx.destination);
  }
  function nbuf(dur) { const n = Math.floor(ctx.sampleRate * dur), b = ctx.createBuffer(1, n, ctx.sampleRate), d = b.getChannelData(0); for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1; return b; }
  // voice: a pitch curve through "mouth" filters. p = { t0, dur, f:[[time,freq],...], type, fm:[[freq,Q,gain],...], vib:[rate,depth], am:[rate,depth], vol, noise }
  function voice(p) {
    const t = ctx.currentTime + 0.02 + (p.t0 || 0), g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(p.vol || 0.3, t + Math.min(0.05, p.dur * 0.2)); g.gain.setValueAtTime(p.vol || 0.3, t + p.dur * 0.7); g.gain.exponentialRampToValueAtTime(0.0001, t + p.dur);
    let src;
    if (p.type === "noise") { src = ctx.createBufferSource(); src.buffer = nbuf(p.dur + 0.1); }
    else {
      src = ctx.createOscillator(); src.type = p.type || "sawtooth"; src.frequency.setValueAtTime(p.f[0][1], t);
      p.f.forEach(([tt, ff]) => src.frequency.exponentialRampToValueAtTime(Math.max(20, ff), t + tt * p.dur));
      if (p.vib) { const v = ctx.createOscillator(), vg = ctx.createGain(); v.frequency.value = p.vib[0]; vg.gain.value = p.vib[1]; v.connect(vg); vg.connect(src.frequency); v.start(t); v.stop(t + p.dur + 0.1); }
    }
    const mix = ctx.createGain(); mix.gain.value = 1;
    if (p.fm) p.fm.forEach(([f, q, gn]) => { const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = f; bp.Q.value = q; const fg = ctx.createGain(); fg.gain.value = gn; src.connect(bp); bp.connect(fg); fg.connect(mix); });
    else src.connect(mix);
    if (p.hp) { const hp = ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = p.hp; mix.connect(hp); hp.connect(g); } else mix.connect(g);
    if (p.am) { const a = ctx.createOscillator(), ag = ctx.createGain(), base = ctx.createGain(); a.frequency.value = p.am[0]; ag.gain.value = p.am[1]; base.gain.value = 1 - p.am[1]; a.connect(ag); ag.connect(g.gain); a.start(t); a.stop(t + p.dur + 0.1); }
    g.connect(out); src.start(t); src.stop(t + p.dur + 0.1);
    if (p.noise) voice({ t0: p.t0, dur: p.dur, type: "noise", fm: [[p.noise[0], 1.2, 1]], vol: p.noise[1] });
  }
  const A = {
    cow: () => voice({ dur: 1.5, f: [[0, 105], [0.25, 140], [1, 92]], fm: [[450, 5, 1.3], [1000, 6, 0.8]], vib: [5, 3], vol: 0.45 }),
    sheep: () => voice({ dur: 1.0, f: [[0, 330], [0.5, 300], [1, 270]], fm: [[900, 8, 1.2], [1700, 8, 0.9]], vib: [6, 6], am: [26, 0.35], vol: 0.4 }),
    pig: () => { voice({ dur: 0.3, f: [[0, 230], [1, 120]], fm: [[600, 5, 1.2], [1500, 5, 0.8]], vol: 0.4, noise: [500, 0.05] }); voice({ t0: 0.34, dur: 0.3, f: [[0, 220], [1, 110]], fm: [[600, 5, 1.2], [1500, 5, 0.8]], vol: 0.4, noise: [500, 0.05] }); },
    dog: () => { for (let k = 0; k < 2; k++) voice({ t0: k * 0.32, dur: 0.2, f: [[0, 420], [1, 250]], fm: [[700, 5, 1.3], [1400, 5, 0.9]], vol: 0.45, noise: [1200, 0.06] }); },
    cat: () => voice({ dur: 0.9, f: [[0, 430], [0.3, 760], [1, 480]], fm: [[1000, 7, 1.2], [2400, 8, 0.8]], vib: [7, 8], vol: 0.35 }),
    horse: () => voice({ dur: 1.6, f: [[0, 600], [0.25, 1150], [0.7, 800], [1, 500]], fm: [[900, 6, 1.2], [2200, 7, 0.9]], vib: [9, 14], vol: 0.35, noise: [3000, 0.04] }),
    duck: () => { for (let k = 0; k < 2; k++) voice({ t0: k * 0.28, dur: 0.2, f: [[0, 420], [1, 300]], fm: [[1100, 10, 1.4], [2100, 10, 0.9]], vol: 0.4 }); },
    chicken: () => { for (let k = 0; k < 4; k++) voice({ t0: k * 0.11, dur: 0.08, f: [[0, 600 + k * 40], [1, 800]], fm: [[1200, 8, 1.2], [2400, 8, 0.7]], vol: 0.3 }); },
    rooster: () => { voice({ dur: 0.3, f: [[0, 500], [1, 700]], fm: [[1000, 6, 1.2], [2200, 7, 0.8]], vol: 0.35 }); voice({ t0: 0.3, dur: 0.25, f: [[0, 700], [1, 900]], fm: [[1000, 6, 1.2], [2200, 7, 0.8]], vol: 0.35 }); voice({ t0: 0.58, dur: 0.9, f: [[0, 850], [0.4, 1000], [1, 600]], fm: [[1000, 6, 1.2], [2400, 7, 0.8]], vib: [10, 12], vol: 0.35 }); },
    turkey: () => voice({ dur: 0.9, f: [[0, 520], [1, 440]], fm: [[1100, 8, 1.2], [2000, 8, 0.8]], am: [24, 0.45], vol: 0.35 }),
    bird: () => { for (let k = 0; k < 3; k++) voice({ t0: k * 0.14, dur: 0.1, type: "sine", f: [[0, 2800 + k * 300], [1, 4000 + k * 300]], vol: 0.2 }); },
    owl: () => { voice({ dur: 0.55, type: "sine", f: [[0, 420], [1, 360]], vol: 0.35, vib: [4, 4] }); voice({ t0: 0.7, dur: 0.7, type: "sine", f: [[0, 400], [1, 330]], vol: 0.35, vib: [4, 4] }); },
    frog: () => { for (let k = 0; k < 2; k++) voice({ t0: k * 0.25, dur: 0.2, f: [[0, 170], [1, 130]], fm: [[400, 6, 1.2], [900, 6, 0.8]], am: [40, 0.5], vol: 0.45 }); },
    lion: () => voice({ dur: 2.0, f: [[0, 95], [0.3, 120], [1, 65]], fm: [[300, 4, 1.4], [800, 5, 0.9]], am: [18, 0.4], vol: 0.5, noise: [700, 0.12] }),
    elephant: () => voice({ dur: 1.5, f: [[0, 330], [0.3, 820], [0.8, 640], [1, 500]], fm: [[700, 5, 1.3], [1500, 6, 0.9]], vib: [8, 12], vol: 0.4, noise: [1800, 0.08] }),
    wolf: () => voice({ dur: 2.6, type: "triangle", f: [[0, 300], [0.3, 620], [0.7, 560], [1, 380]], vib: [5, 9], fm: [[600, 6, 1.2], [1200, 7, 0.6]], vol: 0.4 }),
    snake: () => voice({ dur: 1.3, type: "noise", fm: [[6000, 1.2, 1]], hp: 4000, vol: 0.25 }),
    bee: () => voice({ dur: 1.2, f: [[0, 190], [1, 210]], fm: [[600, 5, 1.2], [1200, 5, 0.6]], am: [60, 0.5], vol: 0.25 }),
    cricket: () => { for (let k = 0; k < 4; k++) voice({ t0: k * 0.18, dur: 0.12, type: "sine", f: [[0, 4500], [1, 4600]], am: [80, 0.6], vol: 0.12 }); },
    monkey: () => { for (let k = 0; k < 4; k++) voice({ t0: k * 0.2, dur: 0.16, f: [[0, 450 + k * 70], [1, 520 + k * 70]], fm: [[900, 6, 1.2], [1800, 7, 0.8]], vol: 0.35 }); },
    mouse: () => { for (let k = 0; k < 2; k++) voice({ t0: k * 0.16, dur: 0.1, type: "sine", f: [[0, 3000], [1, 4100]], vol: 0.18 }); },
    whale: () => voice({ dur: 3, type: "sine", f: [[0, 190], [0.3, 480], [0.6, 300], [1, 420]], vib: [0.8, 12], vol: 0.35 }),
    dolphin: () => { voice({ dur: 0.6, type: "sine", f: [[0, 1800], [1, 5200]], vol: 0.18 }); for (let k = 0; k < 6; k++) voice({ t0: 0.7 + k * 0.07, dur: 0.03, type: "noise", fm: [[4500, 3, 1]], vol: 0.2 }); },
    seal: () => { for (let k = 0; k < 2; k++) voice({ t0: k * 0.35, dur: 0.3, f: [[0, 280], [1, 190]], fm: [[600, 5, 1.3], [1300, 5, 0.8]], vol: 0.4, noise: [900, 0.05] }); },
    bear: () => voice({ dur: 1.6, f: [[0, 80], [0.4, 105], [1, 62]], fm: [[260, 4, 1.4], [650, 5, 0.9]], am: [28, 0.5], vol: 0.5, noise: [500, 0.1] }),
    donkey: () => { voice({ dur: 0.55, f: [[0, 540], [1, 860]], fm: [[900, 6, 1.2], [1900, 6, 0.9]], vib: [8, 10], vol: 0.35 }); voice({ t0: 0.6, dur: 0.65, f: [[0, 320], [1, 190]], fm: [[700, 6, 1.2], [1500, 6, 0.9]], vib: [10, 8], vol: 0.4 }); },
    honk: () => { voice({ dur: 0.35, f: [[0, 380], [1, 340]], fm: [[1000, 7, 1.3], [1800, 7, 0.8]], vol: 0.4 }); voice({ t0: 0.4, dur: 0.35, f: [[0, 400], [1, 350]], fm: [[1000, 7, 1.3], [1800, 7, 0.8]], vol: 0.4 }); },
    camel: () => voice({ dur: 1.2, f: [[0, 130], [1, 90]], fm: [[400, 4, 1.3], [900, 5, 0.8]], am: [14, 0.4], vol: 0.4, noise: [600, 0.08] }),
    thump: () => voice({ dur: 0.18, type: "sine", f: [[0, 120], [1, 50]], vol: 0.5 })
  };
  const MAP = {
    cow: "🐄🐮🐂", sheep: "🐑🐏🐐", pig: "🐷🐖🐽", dog: "🐶🐕🦮🐩", cat: "🐱🐈🐈‍⬛", horse: "🐴🐎🦄🦓", duck: "🦆", chicken: "🐔🐥🐤🐣", rooster: "🐓", turkey: "🦃", bird: "🐦🦅🦜🦚🦩🕊",
    owl: "🦉", frog: "🐸", lion: "🦁🐯🐅🐆", elephant: "🐘🦣", wolf: "🐺", snake: "🐍", bee: "🐝🪰🦟", cricket: "🦗", monkey: "🐒🐵🦍🦧", mouse: "🐭🐁🐀🐹", whale: "🐋🐳", dolphin: "🐬",
    seal: "🦭", bear: "🐻🐼🐨🐻‍❄", donkey: "🫏", honk: "🦢🪿", camel: "🐪🐫🦙", thump: "🐇🐰"
  };
  const SND = {}; Object.keys(MAP).forEach(k => Array.from(MAP[k].replace(/️/g, "").match(/(?:\p{Extended_Pictographic}(?:‍\p{Extended_Pictographic})*)/gu) || []).forEach(e => { SND[e] = A[k]; }));
  window.animalSound = (e) => { const f = SND[String(e).replace(/️/g, "")]; if (!f) return false; try { ensure(); if (ctx.state === "suspended") ctx.resume(); f(); } catch (x) { return false; } return true; };
  window.animalHasSound = (e) => !!SND[String(e).replace(/️/g, "")];
  const css = document.createElement("style");
  css.textContent = ".ico[data-snd]{cursor:pointer}.ico.bounce{animation:icoBounce .5s ease}@keyframes icoBounce{0%{transform:scale(1)}30%{transform:scale(1.25) rotate(-6deg)}60%{transform:scale(.95) rotate(4deg)}100%{transform:scale(1)}}";
  document.head.appendChild(css);
  document.addEventListener("click", (ev) => {
    const s = ev.target.closest && ev.target.closest(".ico[data-e]"); if (!s) return;
    if (document.querySelector("#app button.choice, #app input[type=text], #app input:not([type])")) return;   // never during a question: the sound would give the answer away
    if (window.animalSound(s.getAttribute("data-e"))) { s.classList.remove("bounce"); void s.getBoundingClientRect(); s.classList.add("bounce"); }
  });
  // mark every animal picture as tappable
  window.markAnimalPics = (root) => (root || document).querySelectorAll(".ico[data-e]").forEach(s => { if (!s.hasAttribute("data-snd") && window.animalHasSound(s.getAttribute("data-e"))) s.setAttribute("data-snd", "1"); });
  new MutationObserver(() => window.markAnimalPics()).observe(document.documentElement, { childList: true, subtree: true });
})();
