// Mind Lab shows NO emoji in its screens. Every little picture is drawn here as an SVG icon.
// 1) subjIcon(subject) draws the big subject picture (from cover-icons.js).
// 2) A watcher swaps any emoji that shows up on screen for its drawn icon (buttons, headings, messages, lessons...).
(function () {
  const S = 'stroke="#1a1240" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"';
  const v = (inner) => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">${inner}</svg>`;
  const star = (f) => `<path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.500 9.400l6.600-.9z" fill="${f}" ${S}/>`;
  const heart = (f) => `<path d="M12 21C4 15 2.500 10 5 6.500 7.500 3.500 11 5 12 8c1-3 4.500-4.500 7-1.500C21.500 10 20 15 12 21z" fill="${f}" ${S}/>`;
  const I = {
    fire: v(`<path d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-4 3-7 1 1 2 2 2 3 1-3 1-5 1-8z" fill="#ff8a2a" ${S}/><path d="M12 22a3.500 3.500 0 0 1-3.500-3.500c0-2 2-3 3.500-5 1.500 2 3.500 3 3.500 5A3.500 3.500 0 0 1 12 22z" fill="#ffd34e" ${S}/>`),
    books: v(`<rect x="3" y="4" width="5" height="16" rx="1" fill="#ff5d5d" ${S}/><rect x="9" y="3" width="5" height="17" rx="1" fill="#4ade80" ${S}/><rect x="15" y="6" width="6" height="14" rx="1" fill="#38bdf8" transform="rotate(8 18 13)" ${S}/>`),
    plus: v(`<path d="M12 4v16M4 12h16" stroke="#1a1240" stroke-width="4.500" stroke-linecap="round"/>`),
    check: v(`<circle cx="12" cy="12" r="9.500" fill="#2fb34a" ${S}/><path d="M7 12.500l3.500 3.500L17 9" fill="none" stroke="#fff" stroke-width="2.600" stroke-linecap="round" stroke-linejoin="round"/>`),
    target: v(`<circle cx="12" cy="12" r="9.500" fill="#fff" ${S}/><circle cx="12" cy="12" r="6" fill="#ff4b4b" ${S}/><circle cx="12" cy="12" r="2.600" fill="#fff" ${S}/>`),
    cake: v(`<rect x="3.500" y="12" width="17" height="8" rx="1.500" fill="#ff8aa8" ${S}/><path d="M3.500 15c2 2 3 2 4.500 0 1.500 2 3 2 4.500 0 1.500 2 3 2 4.500 0 1.500 2 2 1.500 3 0" fill="none" stroke="#fff" stroke-width="1.500"/><rect x="11" y="6" width="2" height="6" fill="#4cc3ff" ${S}/><path d="M12 2c1.500 1.500 1.500 2.500 0 3.500-1.500-1-1.500-2 0-3.500z" fill="#ffd34e" ${S}/>`),
    timer: v(`<circle cx="12" cy="13" r="8.500" fill="#fff" ${S}/><path d="M12 8v5l3 2" fill="none" stroke="#1a1240" stroke-width="2" stroke-linecap="round"/><rect x="9.500" y="1.500" width="5" height="2.500" rx="1" fill="#ffd34e" ${S}/>`),
    cap: v(`<path d="M12 4L1.500 9 12 14l10.500-5z" fill="#2a3270" ${S}/><path d="M6 11.500v4.500c0 2 12 2 12 0v-4.500" fill="#4a56b8" ${S}/><path d="M21 9.500v6" stroke="#ffd34e" stroke-width="2" stroke-linecap="round"/>`),
    memo: v(`<rect x="4" y="2.500" width="16" height="19" rx="2" fill="#fff" ${S}/><path d="M8 8h8M8 12h8M8 16h5" stroke="#38bdf8" stroke-width="1.800" stroke-linecap="round"/>`),
    construction: v(`<path d="M2 20L12 3l10 17z" fill="#ffd34e" ${S}/><path d="M12 9v5" stroke="#1a1240" stroke-width="2.200" stroke-linecap="round"/><circle cx="12" cy="17" r="1.300" fill="#1a1240"/>`),
    lock: v(`<path d="M7 11V8a5 5 0 0 1 10 0v3" fill="none" stroke="#cfd6e4" stroke-width="2.600" stroke-linecap="round"/><rect x="4.500" y="10.500" width="15" height="11" rx="2.500" fill="#ffd34e" ${S}/><circle cx="12" cy="15.500" r="1.800" fill="#1a1240"/>`),
    star: v(star("#ffd34e")),
    starOutline: v(star("none")),
    book: v(`<path d="M12 6C9 4 5 4 2.500 5v14c2.500-1 6.500-1 9.500 1z" fill="#fff8e6" ${S}/><path d="M12 6c3-2 7-2 9.500-1v14c-2.500-1-6.500-1-9.500 1z" fill="#fff3cf" ${S}/>`),
    party: v(`<path d="M3 21l5-13 8 8z" fill="#ff8a2a" ${S}/><path d="M12 4l1 2M19 5l-2 1.500M20 12l-2.500-.5M15 2.500v2.500" stroke="#ffd34e" stroke-width="2" stroke-linecap="round"/><circle cx="19" cy="8" r="1.500" fill="#ff4b6e"/><circle cx="9" cy="4" r="1.500" fill="#38bdf8"/><circle cx="21" cy="16" r="1.500" fill="#4ade80"/>`),
    rocket: v(`<path d="M12 2c4 3 5 8 4 13H8c-1-5 0-10 4-13z" fill="#e9eefc" ${S}/><circle cx="12" cy="9" r="2" fill="#38bdf8" ${S}/><path d="M8 12l-3.500 4 3.500-.5M16 12l3.500 4-3.500-.5" fill="#ff5d5d" ${S}/><path d="M10 15.500c0 3 2 5.500 2 5.500s2-2.500 2-5.500z" fill="#ffd34e" ${S}/>`),
    bulb: v(`<path d="M12 2.500a6.500 6.500 0 0 0-3.500 12c.8.700 1 1.500 1 2.500h5c0-1 .2-1.800 1-2.500A6.500 6.500 0 0 0 12 2.500z" fill="#ffe27a" ${S}/><rect x="9.500" y="18" width="5" height="3" rx="1" fill="#9aa5b4" ${S}/>`),
    hands: v(`<path d="M5 20V10l2-2 2 3V6l2-1 1.500 6 1.500-3 3 1v8c0 2-2 3-5 3H9c-2 0-4-1-4-3z" fill="#f1c27d" ${S}/><path d="M3 5l2 1.500M21 5l-2 1.500M12 1.500v2" stroke="#ffd34e" stroke-width="2" stroke-linecap="round"/>`),
    sparkle: v(`<path d="M12 2l2.500 7.500L22 12l-7.500 2.500L12 22l-2.500-7.500L2 12l7.500-2.500z" fill="#ffd34e" ${S}/>`),
    speaker: v(`<path d="M3 9h4l5-4v14l-5-4H3z" fill="#cfd6e4" ${S}/><path d="M15.500 8.500c2 2 2 5 0 7M18.500 6c3.500 3.500 3.500 8.500 0 12" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>`),
    speakerLow: v(`<path d="M3 9h4l5-4v14l-5-4H3z" fill="#cfd6e4" ${S}/><path d="M15.500 9c1.500 1.800 1.500 4.200 0 6" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>`),
    mute: v(`<path d="M3 9h4l5-4v14l-5-4H3z" fill="#cfd6e4" ${S}/><path d="M16 9l5 6M21 9l-5 6" stroke="#ff4b4b" stroke-width="2.200" stroke-linecap="round"/>`),
    flag: v(`<path d="M5 22V3" stroke="#1a1240" stroke-width="2.200" stroke-linecap="round"/><path d="M5 4h14l-3 4.500 3 4.500H5z" fill="#ff4b4b" ${S}/>`),
    ladder: v(`<path d="M7 2v20M17 2v20" stroke="#c98a4a" stroke-width="2.600" stroke-linecap="round"/><path d="M7 6h10M7 11h10M7 16h10M7 21h10" stroke="#e8b878" stroke-width="2.200" stroke-linecap="round"/>`),
    muscle: v(`<path d="M3 15c0-4 2-7 6-8 1 2 3 2 5 1 4-1 8 1 8 5 0 3-3 6-8 6-4 0-6 0-8 0z" fill="#f1c27d" ${S}/><path d="M12 10c1.500 1 3 1 4 0" fill="none" stroke="#1a1240" stroke-width="1.500" stroke-linecap="round"/>`),
    smile: v(`<circle cx="12" cy="12" r="9.500" fill="#ffd34e" ${S}/><circle cx="9" cy="10" r="1.200" fill="#1a1240"/><circle cx="15" cy="10" r="1.200" fill="#1a1240"/><path d="M7.500 14c2 3 7 3 9 0" fill="none" stroke="#1a1240" stroke-width="1.800" stroke-linecap="round"/>`),
    sleepy: v(`<circle cx="12" cy="12" r="9.500" fill="#ffd34e" ${S}/><path d="M7.500 10h3M13.500 10h3" stroke="#1a1240" stroke-width="1.800" stroke-linecap="round"/><path d="M9 16h6" stroke="#1a1240" stroke-width="1.800" stroke-linecap="round"/><path d="M17 3h4l-4 4h4" fill="none" stroke="#38bdf8" stroke-width="1.500" stroke-linecap="round"/>`),
    cross: v(`<path d="M5 5l14 14M19 5L5 19" stroke="#ff4b4b" stroke-width="4" stroke-linecap="round"/>`),
    xmark: v(`<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.600" stroke-linecap="round"/>`),
    repeat: v(`<path d="M4 11V9a3 3 0 0 1 3-3h11l-3-3M20 13v2a3 3 0 0 1-3 3H6l3 3" fill="none" stroke="#38bdf8" stroke-width="2.400" stroke-linecap="round" stroke-linejoin="round"/>`),
    clipboard: v(`<rect x="4.500" y="4" width="15" height="18" rx="2" fill="#fff" ${S}/><rect x="8.500" y="2" width="7" height="4" rx="1.500" fill="#9aa5b4" ${S}/><path d="M8 11h8M8 15h8" stroke="#38bdf8" stroke-width="1.800" stroke-linecap="round"/>`),
    note: v(`<path d="M9 18V5l11-2v13" fill="none" stroke="#1a1240" stroke-width="2.200" stroke-linejoin="round"/><ellipse cx="6.500" cy="18" rx="3.500" ry="2.600" fill="#ffd34e" ${S}/><ellipse cx="17.500" cy="16" rx="3.500" ry="2.600" fill="#ffd34e" ${S}/>`),
    brain: v(`<path d="M8 4a3.500 3.500 0 0 0-3.500 3.500A3.500 3.500 0 0 0 3 11a3.500 3.500 0 0 0 2 3.200A3.500 3.500 0 0 0 8.500 19 3 3 0 0 0 12 20.500V4.500A3 3 0 0 0 8 4z" fill="#ff8aa8" ${S}/><path d="M16 4a3.500 3.500 0 0 1 3.500 3.500A3.500 3.500 0 0 1 21 11a3.500 3.500 0 0 1-2 3.200A3.500 3.500 0 0 1 15.500 19 3 3 0 0 1 12 20.500V4.500A3 3 0 0 1 16 4z" fill="#ffa3bb" ${S}/><path d="M8 9c1 0 2 1 2 2M16 9c-1 0-2 1-2 2M8 14c1 0 2-1 2-2M16 14c-1 0-2-1-2-2" fill="none" stroke="#1a1240" stroke-width="1.200" stroke-linecap="round"/>`),
    fullscreen: v(`<path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" fill="none" stroke="currentColor" stroke-width="2.400" stroke-linecap="round" stroke-linejoin="round"/>`),
    heart: v(heart("#ff4b6e")),
    owl: `<img class="ico" src="hoot.svg" alt="" style="width:1.2em;height:1.2em">`,
    hourglass: v(`<path d="M6 2.500h12M6 21.500h12M7 2.500c0 5 5 6 5 9.500 0 3.500-5 4.500-5 9.500M17 2.500c0 5-5 6-5 9.500 0 3.500 5 4.500 5 9.500" fill="#ffe27a" ${S}/>`),
    person: v(`<circle cx="12" cy="7.500" r="4.500" fill="#f1c27d" ${S}/><path d="M3.500 22c0-6 3.500-8.500 8.500-8.500s8.500 2.500 8.500 8.500z" fill="#38bdf8" ${S}/>`),
    school: v(`<path d="M2 10l10-7 10 7v11H2z" fill="#e8a070" ${S}/><path d="M9.500 21v-6h5v6" fill="#7a4a2a" ${S}/><path d="M12 3V1" stroke="#1a1240" stroke-width="1.800"/><path d="M12 1h4v2.500h-4z" fill="#ff4b4b"/>`),
    moneybag: v(`<path d="M9 3l1.500 3h3L15 3z" fill="#c98a4a" ${S}/><path d="M9.500 6C3 10 3 21 12 21s9-11 2.500-15z" fill="#d9a05a" ${S}/><text x="12" y="17" text-anchor="middle" font-family="Impact,Arial Black,sans-serif" font-size="9" fill="#1a1240">$</text>`),
    keys: v(`<rect x="2" y="7" width="20" height="12" rx="2" fill="#fff" ${S}/><path d="M7 7v12M12 7v12M17 7v12" stroke="#1a1240" stroke-width="1.200"/><rect x="5.500" y="7" width="3" height="7" rx=".5" fill="#1a1240"/><rect x="10.500" y="7" width="3" height="7" rx=".5" fill="#1a1240"/><rect x="15.500" y="7" width="3" height="7" rx=".5" fill="#1a1240"/>`),
    alien: v(`<path d="M12 3c6 0 9 4 8.500 9-.5 4-4 8-8.500 8S4 16 3.500 12C3 7 6 3 12 3z" fill="#7be585" ${S}/><ellipse cx="8.500" cy="11.500" rx="2.400" ry="3.200" fill="#1a1240" transform="rotate(20 8.500 11.500)"/><ellipse cx="15.500" cy="11.500" rx="2.400" ry="3.200" fill="#1a1240" transform="rotate(-20 15.500 11.500)"/>`),
    galaxy: v(`<circle cx="12" cy="12" r="9.500" fill="#2a1a6a" ${S}/><path d="M12 12c2-4 6-3 6 0M12 12c-2 4-6 3-6 0" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="12" r="1.800" fill="#fff"/><circle cx="6" cy="6" r=".8" fill="#fff"/><circle cx="18" cy="17" r=".8" fill="#fff"/>`),
    headphones: v(`<path d="M4 15v-3a8 8 0 0 1 16 0v3" fill="none" stroke="#1a1240" stroke-width="2.600" stroke-linecap="round"/><rect x="2.500" y="13" width="5" height="8" rx="2" fill="#ff5d5d" ${S}/><rect x="16.500" y="13" width="5" height="8" rx="2" fill="#ff5d5d" ${S}/>`),
    tree: v(`<path d="M12 2l6 8h-3l5 7H4l5-7H6z" fill="#2f9e4a" ${S}/><rect x="10.500" y="17" width="3" height="5" fill="#8a5a2a" ${S}/>`),
    contents: v(`<rect x="4" y="3" width="16" height="18" rx="2" fill="#fff" ${S}/><path d="M8 8h8M8 12h8M8 16h5" stroke="#8a5a2a" stroke-width="1.800" stroke-linecap="round"/>`),
    bluebook: v(`<rect x="4" y="3" width="16" height="18" rx="2" fill="#38bdf8" ${S}/><path d="M8 7h8M8 11h6" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`),
    teddy: v(`<circle cx="6" cy="6" r="3" fill="#c98a4a" ${S}/><circle cx="18" cy="6" r="3" fill="#c98a4a" ${S}/><circle cx="12" cy="13" r="8" fill="#c98a4a" ${S}/><ellipse cx="12" cy="15" rx="3.500" ry="2.600" fill="#f1d3a0"/><circle cx="9" cy="11.500" r="1.100" fill="#1a1240"/><circle cx="15" cy="11.500" r="1.100" fill="#1a1240"/>`),
    backpack: v(`<rect x="5" y="6" width="14" height="16" rx="4" fill="#ff7a59" ${S}/><path d="M9 6a3 3 0 0 1 6 0" fill="none" stroke="#1a1240" stroke-width="1.800"/><rect x="8" y="14" width="8" height="5" rx="1.500" fill="#ffb199" ${S}/>`),
    medal: v(`<path d="M7 2l5 8 5-8" fill="#38bdf8" ${S}/><circle cx="12" cy="15" r="6.500" fill="#ffd34e" ${S}/>${""}`),
    divide: v(`<circle cx="12" cy="12" r="9.500" fill="#2a3270" ${S}/><circle cx="12" cy="7.500" r="1.600" fill="#ffd34e"/><circle cx="12" cy="16.500" r="1.600" fill="#ffd34e"/><path d="M6 12h12" stroke="#ffd34e" stroke-width="2.200" stroke-linecap="round"/>`),
    gear: v(`<circle cx="12" cy="12" r="6" fill="#9aa5b4" ${S}/><circle cx="12" cy="12" r="2.400" fill="#2a3270"/>${[0, 45, 90, 135].map(a => `<rect x="10.500" y="1.500" width="3" height="4" rx=".8" fill="#9aa5b4" ${S} transform="rotate(${a} 12 12)"/><rect x="10.500" y="18.500" width="3" height="4" rx=".8" fill="#9aa5b4" ${S} transform="rotate(${a} 12 12)"/>`).join("")}`),
    unknown: v(`<circle cx="12" cy="12" r="9" fill="#cfd6e4" ${S}/>`)
  };
  const MAP = {
    "🔥": "fire", "📚": "books", "➕": "plus", "✅": "check", "🎯": "target", "🎂": "cake", "⏱": "timer", "🎓": "cap", "📝": "memo", "🚧": "construction", "🔒": "lock",
    "⭐": "star", "🌟": "sparkle", "☆": "starOutline", "📖": "book", "🎉": "party", "🚀": "rocket", "💡": "bulb", "🙌": "hands", "🔊": "speaker", "🔈": "speakerLow", "🔇": "mute",
    "🏁": "flag", "🪜": "ladder", "💪": "muscle", "🙂": "smile", "😴": "sleepy", "❌": "cross", "✕": "xmark", "🔁": "repeat", "📋": "clipboard", "🎵": "note", "🧠": "brain",
    "⛶": "fullscreen", "💛": "heart", "❤": "heart", "🦉": "owl", "⏳": "hourglass", "🧑": "person", "🏫": "school", "💰": "moneybag", "🎹": "keys", "👾": "alien", "🌌": "galaxy",
    "🎧": "headphones", "🌲": "tree", "📑": "contents", "📘": "bluebook", "🧸": "teddy", "🎒": "backpack", "➗": "divide", "⚙": "gear"
  };
  window.ICO = I;
  // the big subject picture (from cover-icons.js)
  window.subjIcon = function (s, px) {
    const f = (typeof COVER_ICONS !== "undefined") && COVER_ICONS[s.id];
    px = px || 28;
    return f ? `<svg class="ico subj-ico" data-s="${s.id}" viewBox="0 0 100 100" width="${px}" height="${px}" aria-hidden="true">${f(s.color)}</svg>` : "";
  };
  const css = document.createElement("style");
  css.textContent = ".ico{display:inline-block;width:1.15em;height:1.15em;vertical-align:-0.22em}.ico+.ico{margin-left:.1em}.subject .emoji .subj-ico{width:58px;height:58px}.visual .ico,.bk-vis .ico{width:2.1em;height:2.1em;margin:0 .06em;vertical-align:-.35em}.lesson-head .subj-ico,h1 .subj-ico{width:1.2em;height:1.2em;vertical-align:-.2em}";
  document.head.appendChild(css);
  // ----- the watcher: finds emoji in text on the screen and swaps in the drawn icon -----
  const EMO = /(?:[\u{1F1E6}-\u{1F1FF}]{2}|(?![\u2713\u2714\u2717\u2718\u2605])[\u{1F300}-\u{1FAFF}\u2600-\u27BF\u2B50\u23E9-\u23FF]\uFE0F?(?:\u200D[\u{1F300}-\u{1FAFF}\u2600-\u27BF]\uFE0F?)*)/gu;
  const SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, INPUT: 1, TITLE: 1, SVG: 1, OPTION: 1 };
  // any picture without its own drawing becomes a simple drawn shape (8 shapes x 36 colours x 4 marks), always the same shape for the same picture
  function shapeFor(e) {
    let h = 2166136261; for (const ch of e) { h ^= ch.codePointAt(0); h = Math.imul(h, 16777619) >>> 0; }
    const hue = (h % 36) * 10, shape = (h >>> 6) % 8, mark = (h >>> 10) % 4, f = `hsl(${hue} 80% 58%)`, d = `hsl(${hue} 80% 30%)`, a = `fill="${f}" stroke="#1a1240" stroke-width="1.6" stroke-linejoin="round"`;
    const body = [
      `<circle cx="12" cy="12" r="9.500" ${a}/>`, `<rect x="3.500" y="3.500" width="17" height="17" rx="3" ${a}/>`, `<path d="M12 3L22 21H2z" ${a}/>`,
      `<path d="M12 2.500l2.900 6 6.600.9-4.800 4.600 1.200 6.500L12 17.400 6.100 20.500l1.200-6.500L2.500 9.400l6.600-.9z" ${a}/>`, `<path d="M12 2l10 10-10 10L2 12z" ${a}/>`,
      `<path d="M12 2.500l8 4.500v10l-8 4.500-8-4.500V7z" ${a}/>`, `<path d="M12 21C4 15 2.500 10 5 6.500 7.500 3.500 11 5 12 8c1-3 4.500-4.500 7-1.500C21.500 10 20 15 12 21z" ${a}/>`,
      `<rect x="2.500" y="6.500" width="19" height="11" rx="5.500" ${a}/>`
    ][shape];
    const m = [`<circle cx="12" cy="12" r="2.600" fill="${d}"/>`, `<path d="M8 12h8" stroke="${d}" stroke-width="2.400" stroke-linecap="round"/>`, `<path d="M8.500 9.500h7M8.500 14.500h7" stroke="${d}" stroke-width="2" stroke-linecap="round"/>`, `<circle cx="9.500" cy="12" r="1.600" fill="${d}"/><circle cx="14.500" cy="12" r="1.600" fill="${d}"/>`][mark];
    return v(body + m);
  }
  function iconFor(e) { const k = e.replace(/️/g, ""); if (MAP[k]) return I[MAP[k]].replace("<svg ", `<svg data-i="${MAP[k]}" `);const pic = window.PICS && window.PICS[k]; return (pic ? v(pic) : shapeFor(k)).replace("<svg ", `<svg data-e="${k}" `); }
  function fix(node) {
    if (!node) return;
    if (node.nodeType === 3) {
      const t = node.nodeValue; if (!t || !EMO.test(t)) { EMO.lastIndex = 0; return; } EMO.lastIndex = 0;
      const p = node.parentNode; if (!p || SKIP[(p.nodeName || "").toUpperCase()]) return;
      let out = "", last = 0, hit = false, m; EMO.lastIndex = 0;
      const esc = (x) => x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      while ((m = EMO.exec(t))) { const ic = iconFor(m[0]); if (!ic) continue; hit = true; out += esc(t.slice(last, m.index)) + ic; last = m.index + m[0].length; }
      if (!hit) return;
      out += esc(t.slice(last));
      const span = document.createElement("span"); span.className = "ico-wrap"; span.style.display = "contents"; span.innerHTML = out; p.replaceChild(span, node); return;
    }
    if (node.nodeType !== 1 || SKIP[node.nodeName.toUpperCase()]) return;
    const kids = Array.from(node.childNodes); for (const k of kids) fix(k);
  }
  let busy = false;
  const mo = new MutationObserver((list) => {
    if (busy) return; busy = true;
    try { for (const m of list) { if (m.type === "characterData") fix(m.target); else m.addedNodes.forEach(fix); } } finally { busy = false; }
  });
  function start() { fix(document.body); mo.observe(document.body, { childList: true, subtree: true, characterData: true }); }
  if (document.body) start(); else document.addEventListener("DOMContentLoaded", start);
})();
