// Mind Lab background music. Almost everything is made live with the Web Audio API (no downloads, no outside websites):
// real chord progressions, bass lines, melodies, drums, a warm reverb and a soft limiter.
// The "S.I.P. Theme" is a song file from this project's own folder.
const MindMusic = (() => {
  let ctx = null, bus = null, master = null, timer = null, current = "off", volume = 0.5, step = 0, nextTime = 0, audioEl = null, verb = null;

  const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
  const N = (name) => { // "C4" -> frequency
    const m = /^([A-G])(#|b)?(\d)$/.exec(name);
    const base = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]] + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0);
    return mtof(12 * (parseInt(m[3]) + 1) + base);
  };
  const rnd = (seed) => { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };

  // ---------- sound makers ----------
  function env(g, t, a, d, vol, tail) { g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + a + d + (tail || 0)); }
  function osc(type, f, t, dur, detune) { const o = ctx.createOscillator(); o.type = type; o.frequency.setValueAtTime(f, t); if (detune) o.detune.value = detune; o.start(t); o.stop(t + dur + 0.1); return o; }
  function send(node, wet) { node.connect(bus); if (wet && verb) { const g = ctx.createGain(); g.gain.value = wet; node.connect(g); g.connect(verb); } }
  // soft plucked / piano-like note
  function pluck(f, t, dur, vol, wet, bright) {
    const g = ctx.createGain(), lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.setValueAtTime(Math.min(9000, f * (bright || 6)), t); lp.frequency.exponentialRampToValueAtTime(Math.max(300, f * 1.5), t + dur);
    env(g, t, 0.006, dur, vol); [["triangle", 0], ["sine", 0], ["triangle", 6]].forEach(([ty, d], i) => { const o = osc(ty, f * (i === 1 ? 2 : 1), t, dur, d); const og = ctx.createGain(); og.gain.value = i === 1 ? 0.25 : 0.5; o.connect(og); og.connect(lp); });
    lp.connect(g); send(g, wet === undefined ? 0.25 : wet);
  }
  // bell / electric piano
  function bell(f, t, dur, vol, wet) {
    const g = ctx.createGain(); env(g, t, 0.004, dur, vol);
    [[1, 1], [2.01, 0.35], [3.99, 0.12]].forEach(([m, a]) => { const o = osc("sine", f * m, t, dur); const og = ctx.createGain(); og.gain.value = a; o.connect(og); og.connect(g); });
    send(g, wet === undefined ? 0.4 : wet);
  }
  // slow warm pad (detuned saws through a low-pass)
  function pad(freqs, t, dur, vol, wet) {
    const g = ctx.createGain(), lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.setValueAtTime(500, t); lp.frequency.linearRampToValueAtTime(1500, t + dur * 0.5); lp.frequency.linearRampToValueAtTime(600, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol, t + dur * 0.35); g.gain.linearRampToValueAtTime(0.0001, t + dur);
    freqs.forEach(f => [-7, 7].forEach(d => { const o = osc("sawtooth", f, t, dur, d); const og = ctx.createGain(); og.gain.value = 1 / freqs.length / 2; o.connect(og); og.connect(lp); }));
    lp.connect(g); send(g, wet === undefined ? 0.5 : wet);
  }
  function bass(f, t, dur, vol, kind) {
    const g = ctx.createGain(), lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = kind === "synth" ? 700 : 420;
    env(g, t, 0.01, dur, vol);
    const o = osc(kind === "synth" ? "sawtooth" : "triangle", f, t, dur), o2 = osc("sine", f, t, dur); o.connect(lp); o2.connect(lp); lp.connect(g); send(g, 0);
  }
  function lead(f, t, dur, vol, type, wet) {
    const g = ctx.createGain(), lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 3200;
    env(g, t, 0.02, dur, vol); const o = osc(type || "sawtooth", f, t, dur), o2 = osc(type || "sawtooth", f, t, dur, 9);
    const vib = ctx.createOscillator(), vg = ctx.createGain(); vib.frequency.value = 5.5; vg.gain.value = f * 0.004; vib.connect(vg); vg.connect(o.frequency); vib.start(t + dur * 0.3); vib.stop(t + dur + 0.1);
    o.connect(lp); o2.connect(lp); lp.connect(g); send(g, wet === undefined ? 0.3 : wet);
  }
  function chip(f, t, dur, vol, duty) {
    const g = ctx.createGain(); env(g, t, 0.003, dur, vol); const o = osc("square", f, t, dur); o.connect(g); send(g, 0);
  }
  function noiseBuf(dur) { const len = Math.max(1, Math.floor(ctx.sampleRate * dur)), b = ctx.createBuffer(1, len, ctx.sampleRate), d = b.getChannelData(0); for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1; return b; }
  function hat(t, vol, open) { const s = ctx.createBufferSource(), hp = ctx.createBiquadFilter(), g = ctx.createGain(); s.buffer = noiseBuf(open ? 0.25 : 0.06); hp.type = "highpass"; hp.frequency.value = 7000; env(g, t, 0.001, open ? 0.18 : 0.04, vol); s.connect(hp); hp.connect(g); send(g, 0.05); s.start(t); }
  function snare(t, vol) { const s = ctx.createBufferSource(), bp = ctx.createBiquadFilter(), g = ctx.createGain(); s.buffer = noiseBuf(0.25); bp.type = "bandpass"; bp.frequency.value = 2200; bp.Q.value = 0.8; env(g, t, 0.001, 0.14, vol); s.connect(bp); bp.connect(g); send(g, 0.2); s.start(t); const o = osc("triangle", 190, t, 0.1), og = ctx.createGain(); env(og, t, 0.001, 0.08, vol * 0.5); o.frequency.exponentialRampToValueAtTime(110, t + 0.08); o.connect(og); send(og, 0); }
  function kick(t, vol) { const o = osc("sine", 140, t, 0.3), g = ctx.createGain(); o.frequency.exponentialRampToValueAtTime(42, t + 0.14); env(g, t, 0.002, 0.22, vol); o.connect(g); send(g, 0); }
  function clap(t, vol) { for (let k = 0; k < 3; k++) { const s = ctx.createBufferSource(), bp = ctx.createBiquadFilter(), g = ctx.createGain(); s.buffer = noiseBuf(0.1); bp.type = "bandpass"; bp.frequency.value = 1500; env(g, t + k * 0.012, 0.001, 0.07, vol); s.connect(bp); bp.connect(g); send(g, 0.25); s.start(t + k * 0.012); } }
  function tom(t, f, vol) { const o = osc("sine", f, t, 0.35), g = ctx.createGain(); o.frequency.exponentialRampToValueAtTime(f * 0.55, t + 0.25); env(g, t, 0.003, 0.28, vol); o.connect(g); send(g, 0.15); }
  function crackle(t, dur, vol) { const s = ctx.createBufferSource(), hp = ctx.createBiquadFilter(), g = ctx.createGain(); const len = Math.floor(ctx.sampleRate * dur), b = ctx.createBuffer(1, len, ctx.sampleRate), d = b.getChannelData(0); for (let i = 0; i < len; i++) d[i] = Math.random() < 0.0015 ? (Math.random() * 2 - 1) : 0; s.buffer = b; hp.type = "highpass"; hp.frequency.value = 2500; g.gain.value = vol; s.connect(hp); hp.connect(g); send(g, 0); s.start(t); }
  function chirp(t, vol) { const f0 = 2400 + Math.random() * 1600; const o = osc("sine", f0, t, 0.2), g = ctx.createGain(); o.frequency.exponentialRampToValueAtTime(f0 * 1.35, t + 0.06); o.frequency.exponentialRampToValueAtTime(f0 * 0.9, t + 0.14); env(g, t, 0.01, 0.12, vol); o.connect(g); send(g, 0.3); }

  // chords as MIDI notes
  const CH = { C: [60, 64, 67], Cmaj7: [60, 64, 67, 71], Am: [57, 60, 64], Am7: [57, 60, 64, 67], F: [53, 57, 60], Fmaj7: [53, 57, 60, 64], G: [55, 59, 62], G6: [55, 59, 62, 64], G7: [55, 59, 62, 65], Dm: [50, 53, 57], Dm7: [50, 53, 57, 60], Em: [52, 55, 59], Em7: [52, 55, 59, 62], D: [50, 54, 57], Bm: [47, 50, 54] };
  const ROOT = { C: 36, Cmaj7: 36, Am: 33, Am7: 33, F: 29, Fmaj7: 29, G: 31, G6: 31, G7: 31, Dm: 38, Dm7: 38, Em: 40, Em7: 40, D: 38, Bm: 35 };
  const up = (arr, o) => arr.map(n => n + o);

  // ---------- the songs (i = 16th-note step, t = start time, b = swing-free beat position) ----------
  const TRACKS = {
    chill: {
      label: "Chill Keys", emoji: "🎹", bpm: 76, prog: ["Cmaj7", "Am7", "Fmaj7", "G6"],
      play(i, t) {
        const bar = i >> 4, p = i & 15, name = this.prog[bar % 4], ch = CH[name], R = rnd(bar * 31 + 7);
        if (p === 0) { pad(up(ch, 0).map(mtof), t, this.dur * 16 * 1.02, 0.07, 0.7); bass(mtof(ROOT[name] + 12), t, this.dur * 14, 0.17); }
        if (p % 2 === 0) { const k = [0, 2, 1, 3, 2, 1, 3, 2][(p / 2) | 0] % ch.length; bell(mtof(ch[k] + 12), t, 1.4, 0.05, 0.5); }
        if (p === 6 || p === 14) { const mel = [72, 74, 76, 79, 76, 74, 72, 71]; if (R() < 0.7) bell(mtof(mel[(R() * 8) | 0] + 12), t, 1.8, 0.05, 0.7); }
        if (p % 4 === 2) hat(t, 0.012);
      }
    },
    chip: {
      label: "Happy Chip", emoji: "👾", bpm: 138, prog: ["C", "G", "Am", "F"],
      riff: [72, 0, 76, 0, 79, 0, 76, 0, 77, 0, 74, 0, 71, 0, 74, 0, 76, 0, 79, 0, 81, 0, 79, 0, 77, 76, 74, 0, 72, 0, 0, 0],
      play(i, t) {
        const bar = i >> 4, p = i & 15, name = this.prog[bar % 4], r = this.riff[i % 32];
        if (r) chip(mtof(r), t, this.dur * 1.6, 0.07);
        if (p % 4 === 0) { const a = CH[name]; chip(mtof(a[(p / 4 | 0) % 3] + 12), t, this.dur * 0.9, 0.022); }
        const bn = ROOT[name] + 12; if (p % 4 === 0 || p === 10) chip(mtof(p === 10 ? bn + 7 : bn), t, this.dur * 2, 0.09);
        if (p === 4 || p === 12) snare(t, 0.05); if (p % 2 === 0) hat(t, 0.02); if (p === 0 || p === 8) kick(t, 0.18);
      }
    },
    space: {
      label: "Dreamy Space", emoji: "🌌", bpm: 56, prog: ["Dm7", "Fmaj7", "Am7", "G6"],
      play(i, t) {
        const bar = i >> 4, p = i & 15, name = this.prog[(bar >> 1) % 4], ch = CH[name];
        if (p === 0 && (bar & 1) === 0) { pad(ch.map(n => mtof(n + 12)), t, this.dur * 32, 0.09, 0.9); bass(mtof(ROOT[name] + 12), t, this.dur * 28, 0.14); }
        const R = rnd(i * 13 + 5); if (p % 4 === 0 && R() < 0.5) { const sc = [74, 77, 79, 81, 84, 86]; bell(mtof(sc[(R() * 6) | 0] + 12), t, 3.2, 0.035, 0.9); }
      }
    },
    focus: {
      label: "Focus Beats", emoji: "🎧", bpm: 84, swing: 0.16, prog: ["Am7", "Dm7", "G7", "Cmaj7"],
      play(i, t) {
        const bar = i >> 4, p = i & 15, name = this.prog[bar % 4], ch = CH[name];
        if (p === 0) crackle(t, this.dur * 16, 0.02);
        if (p === 0 || p === 10) kick(t, 0.2); if (p === 4 || p === 12) snare(t, 0.07); if (p % 2 === 0) hat(t, p % 4 === 0 ? 0.02 : 0.012);
        if (p === 0 || p === 6 || p === 10) bass(mtof(ROOT[name] + 12), t, this.dur * 3, 0.2);
        if (p === 3 || p === 11) ch.forEach((n, k) => pluck(mtof(n + 12), t + k * 0.012, 0.9, 0.035, 0.3, 4));
        if (p === 14) { const m = [76, 79, 72, 74][bar % 4]; bell(mtof(m + 12), t, 1.2, 0.03, 0.5); }
      }
    },
    forest: {
      label: "Calm Forest", emoji: "🌲", bpm: 68, prog: ["Em", "C", "G", "D"],
      play(i, t) {
        const bar = i >> 4, p = i & 15, name = this.prog[bar % 4], ch = CH[name], R = rnd(i * 7 + 3);
        if (p === 0) pad(ch.map(n => mtof(n + 12)), t, this.dur * 16, 0.04, 0.8);
        if (p % 2 === 0) { const pat = [0, 1, 2, 1, 0, 2, 1, 2]; pluck(mtof(ch[pat[(p / 2) | 0] % 3] + 12), t, 1.6, 0.06, 0.35); }
        if (p === 0) bass(mtof(ROOT[name] + 12), t, this.dur * 12, 0.12);
        if (p === 8 && (bar % 2) === 1) { const mel = [76, 79, 83, 81]; pluck(mtof(mel[(R() * 4) | 0] + 12), t, 2, 0.06, 0.6); }
        if (R() < 0.025) chirp(t, 0.012);
      }
    },
    sunny: {
      label: "Sunny Day", emoji: "🎵", bpm: 112, prog: ["C", "G", "Am", "F"],
      mel: [76, 0, 76, 79, 0, 76, 74, 0, 72, 0, 74, 76, 0, 74, 0, 0, 74, 0, 74, 77, 0, 74, 72, 0, 71, 0, 72, 74, 0, 72, 0, 0],
      play(i, t) {
        const bar = i >> 4, p = i & 15, name = this.prog[bar % 4], ch = CH[name], m = this.mel[(i % 32)];
        if ([0, 3, 6, 8, 11, 14].includes(p)) ch.forEach((n, k) => pluck(mtof(n + 12), t + k * 0.008, 0.6, 0.04, 0.2, 5));
        if (p % 4 === 0) bass(mtof(ROOT[name] + 12 + (p === 8 ? 7 : 0)), t, this.dur * 3.4, 0.2);
        if (m) bell(mtof(m + 12), t, 0.5, 0.06, 0.3);
        if (p === 0 || p === 8) kick(t, 0.2); if (p === 4 || p === 12) clap(t, 0.06); if (p % 2 === 1) hat(t, 0.012);
      }
    },
    adventure: {
      label: "Big Adventure", emoji: "🎵", bpm: 124, prog: ["Am", "F", "C", "G"],
      mel: [69, 0, 0, 72, 0, 76, 0, 0, 77, 0, 0, 76, 0, 72, 0, 0, 72, 0, 0, 76, 0, 79, 0, 0, 79, 0, 78, 76, 0, 74, 0, 0],
      play(i, t) {
        const bar = i >> 4, p = i & 15, name = this.prog[bar % 4], ch = CH[name], m = this.mel[i % 32];
        if (p === 0) pad(ch.map(n => mtof(n + 12)), t, this.dur * 16, 0.06, 0.6);
        if (p % 2 === 0) bass(mtof(ROOT[name] + 12), t, this.dur * 1.8, 0.17, "synth");
        if (m) lead(mtof(m + 12), t, this.dur * 3.5, 0.045, "sawtooth", 0.35);
        if (p === 0 || p === 6 || p === 8) kick(t, 0.24); if (p === 4 || p === 12) snare(t, 0.09); if (p % 4 === 2) hat(t, 0.015);
        if ((bar & 7) === 7 && p >= 8 && p % 2 === 0) tom(t, 220 - (p - 8) * 12, 0.12);
        const arp = [0, 1, 2, 1]; if (p % 4 === 1) pluck(mtof(ch[arp[(p >> 2) % 4] % ch.length] + 24), t, 0.3, 0.025, 0.3, 5);
      }
    },
    piano: {
      label: "Quiet Piano", emoji: "🎹", bpm: 72, prog: ["Fmaj7", "Em7", "Dm7", "Cmaj7"],
      mel: [81, 0, 0, 0, 79, 0, 77, 0, 76, 0, 0, 0, 0, 0, 0, 0, 77, 0, 0, 0, 76, 0, 74, 0, 72, 0, 0, 0, 0, 0, 0, 0],
      play(i, t) {
        const bar = i >> 4, p = i & 15, name = this.prog[bar % 4], ch = CH[name], m = this.mel[i % 32];
        if (p % 2 === 0) pluck(mtof(ch[[0, 2, 1, 3, 2, 1, 3, 1][(p / 2) | 0] % ch.length] + 12), t, 2.2, 0.06, 0.5, 4);
        if (p === 0) pluck(mtof(ROOT[name] + 12), t, 3.2, 0.12, 0.4, 3);
        if (m) pluck(mtof(m), t, 2.4, 0.08, 0.6, 5);
      }
    },
    sip: { label: "S.I.P. Theme (our song)", emoji: "🎵", file: "music/sip-theme.mp3" }
  };
  Object.values(TRACKS).forEach(tr => { if (tr.bpm) tr.dur = 60 / tr.bpm / 4; });

  // ---------- engine ----------
  function makeReverb(c) {
    const len = Math.floor(c.sampleRate * 2.4), b = c.createBuffer(2, len, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) { const d = b.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6); }
    const cv = c.createConvolver(); cv.buffer = b; return cv;
  }
  function build(c, dest) {
    ctx = c;
    master = ctx.createGain(); master.gain.value = volume * 0.8;
    const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 4; comp.attack.value = 0.01; comp.release.value = 0.25;
    bus = ctx.createGain(); bus.gain.value = 1; bus.connect(comp);
    verb = makeReverb(ctx); const vg = ctx.createGain(); vg.gain.value = 0.55; verb.connect(vg); vg.connect(comp);
    comp.connect(master); master.connect(dest || ctx.destination);
  }
  function ensure() { if (ctx) return; build(new (window.AudioContext || window.webkitAudioContext)()); }

  function schedule() {
    const track = TRACKS[current]; if (!track || !track.play) return;
    while (nextTime < ctx.currentTime + 0.5) {
      const sw = (track.swing && (step % 2 === 1)) ? track.dur * track.swing : 0;
      track.play(step, Math.max(nextTime + sw, ctx.currentTime));
      step++; nextTime += track.dur;
    }
  }

  function stopFile() { if (audioEl) { audioEl.pause(); audioEl = null; } }
  function play(id) {
    clearInterval(timer); timer = null; stopFile();
    current = id;
    try { localStorage.setItem("mindlab-music", id); } catch (e) {}
    if (id === "off" || !TRACKS[id]) return;
    const tr = TRACKS[id];
    if (tr.file) { audioEl = new Audio(tr.file); audioEl.loop = true; audioEl.volume = Math.min(1, volume); audioEl.play().catch(() => {}); return; }
    ensure();
    if (ctx.state === "suspended") ctx.resume();
    step = 0; nextTime = ctx.currentTime + 0.1;
    timer = setInterval(schedule, 100);
  }
  function setVolume(v) {
    volume = v;
    try { localStorage.setItem("mindlab-vol", String(v)); } catch (e) {}
    if (master) master.gain.value = v * 0.8;
    if (audioEl) audioEl.volume = Math.min(1, v);
  }
  // used only by tests: renders a few seconds of a song off-line and reports how loud it got
  async function testRender(id, seconds) {
    const oc = new OfflineAudioContext(2, 44100 * seconds, 44100), keep = [ctx, bus, master, verb, current];
    build(oc, oc.destination); current = id; const tr = TRACKS[id]; step = 0; nextTime = 0;
    while (nextTime < seconds - 0.2) { tr.play(step, nextTime); step++; nextTime += tr.dur; }
    const buf = await oc.startRendering(); let peak = 0, sum = 0; const d = buf.getChannelData(0); for (let i = 0; i < d.length; i++) { const a = Math.abs(d[i]); if (a > peak) peak = a; sum += a; }
    [ctx, bus, master, verb, current] = keep; return { peak: +peak.toFixed(3), avg: +(sum / d.length).toFixed(4) };
  }

  return {
    tracks: TRACKS, play, setVolume, testRender,
    get current() { return current; },
    get volume() { return volume; },
    stop() { play("off"); }
  };
})();
