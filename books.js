// Mind Lab Books: 5 books for every subject, 200 pages each, from Easy to Genius.
// A book is put together from that subject's lessons (teaching pages + practice pages).
// The extra pages are WORKED EXAMPLES: Mind Lab books teach, they do not test. Each shows a question, Hoot's step-by-step walk-through and the answer.
// Book prices: Easy $5, Smart $10, Hard $15, Expert $20, Genius $30. The first 10 pages are a free preview.

const BOOK_PAGES = 200;
const BOOK_PREVIEW = 10;
const BOOK_TIERS = [
  { n: 1, name: "Easy",   price: 5,  from: 1,  to: 6,  stars: 1, tag: "Kindergarten to 2nd grade", accent: "#4ade80" },
  { n: 2, name: "Smart",  price: 10, from: 7,  to: 12, stars: 2, tag: "3rd to 5th grade",          accent: "#38bdf8" },
  { n: 3, name: "Hard",   price: 15, from: 13, to: 18, stars: 3, tag: "6th to 8th grade",          accent: "#fbbf24" },
  { n: 4, name: "Expert", price: 20, from: 19, to: 24, stars: 4, tag: "9th to 11th grade",         accent: "#fb7185" },
  { n: 5, name: "Genius", price: 30, from: 25, to: 30, stars: 5, tag: "12th grade and college",    accent: "#e879f9" }
];
// Topic books: shorter books about ONE topic (for example Math: Division) in the same 5 levels as the big books
// (Easy, Smart, Hard, Expert, Genius). They are shorter, so they cost less: $2, $3, $4, $5 and $8.
// The Genius topic book is the COMPLETE collection: every lesson on the topic from level 1 to 30.
// Book number = 100 + topic number * 10 + book level (1-5). A tier book only shows up when it has at least 4 lessons.
const TOPIC_PRICES = { 1: 2, 2: 3, 3: 4, 4: 5, 5: 8 };
const TOPICS = [
  ["math", "Division", "➗", /divi|÷|quotient|remainder/i], ["math", "Multiplication", "✖️", /multipl|foil/i], ["math", "Fractions", "🍕", /fraction/i],
  ["math", "Decimals & Percent", "💯", /decimal|percent/i], ["math", "Equations", "🧮", /equation|inequalit/i], ["math", "Geometry", "📐", /geometr|angle|triangle|circle|area|volume|perimeter|polygon/i],
  ["animals", "Wildlife & Habitats", "🦌", /wildlife|habitat|ecosystem|food chain|endanger/i], ["animals", "Animal Bodies", "🦴", /body|bodies|skeleton|sense|skin|bones/i], ["animals", "Evolution", "🦕", /evolution|adapt|species|extinct/i],
  ["art", "Color", "🎨", /colou?r/i], ["art", "Painting & Drawing", "🖌️", /paint|draw|sketch/i], ["art", "Design", "✏️", /design|pattern|shape/i],
  ["chem", "Reactions", "💥", /reaction|equation|react/i], ["chem", "Atoms & Electrons", "⚛️", /atom|electron|element|periodic/i], ["chem", "Energy & Heat", "🔥", /energy|heat/i], ["chem", "Water & Solutions", "💧", /water|solution|acid|base/i],
  ["civics", "Government", "🏛️", /government/i], ["civics", "Rights", "⚖️", /right|freedom|amend/i], ["civics", "Voting & Democracy", "🗳️", /vot|democra|election/i], ["civics", "Laws & Rules", "📜", /\blaws?\b|rules|court|polic/i],
  ["coding", "Loops", "🔁", /loop|repeat/i], ["coding", "Functions", "🧩", /function/i], ["coding", "Lists & Data", "📋", /list|array|data|dictionar/i], ["coding", "Numbers & Bits", "🔢", /number|bit|binary/i],
  ["drama", "Stage", "🎭", /stage/i], ["drama", "Voice & Character", "🗣️", /voice|character|acting/i], ["drama", "Shakespeare", "📖", /shakespeare/i], ["drama", "Lights & Design", "💡", /light|design|costume|set /i],
  ["earth", "Weather & Climate", "⛅", /weather|climate/i], ["earth", "Oceans & Water", "🌊", /ocean|water|river/i], ["earth", "Space & Planets", "🪐", /space|planet|moon|star|solar|sun/i], ["earth", "Rocks & Quakes", "🌋", /rock|volcano|earthquake|mineral|plate/i],
  ["engineer", "Power & Energy", "⚡", /power|energy|heat|electric/i], ["engineer", "Robots", "🤖", /robot/i], ["engineer", "Design & Machines", "⚙️", /design|build|bridge|machine/i],
  ["french", "Verbs", "🇫🇷", /verb|tense|conjug|past|subjunctive/i], ["french", "Reading", "📖", /reading/i], ["french", "Everyday Words", "💬", /number|saying|food|family|which/i],
  ["geo", "Maps", "🗺️", /\bmaps?\b|latitude|longitude/i], ["geo", "Countries & Capitals", "🏙️", /capital|countr|cities/i], ["geo", "Climate & Zones", "🌡️", /climate|zone|biome/i], ["geo", "Landforms", "⛰️", /landform|mountain|river|desert/i],
  ["hand", "Cursive", "✒️", /cursive/i], ["hand", "Letters", "🔤", /letter/i], ["hand", "Lettering & Notes", "📝", /lettering|notes|paper/i],
  ["health", "Safety", "🦺", /safe/i], ["health", "Food & Nutrition", "🥦", /food|nutri|eat/i], ["health", "Sleep, Heart & Body", "💤", /sleep|heart|body|exercise/i],
  ["history", "World History", "🌍", /world|ancient|empire|china/i], ["history", "Revolutions", "🔥", /revolution|independence|civil war/i], ["history", "Sources & Evidence", "🔎", /source|primary|evidence/i],
  ["homeec", "Cooking", "🍳", /cook|kitchen|recipe|food/i], ["homeec", "Sewing & Fabric", "🧵", /sew|fabric|stitch/i], ["homeec", "Costs & Budgets", "🧾", /cost|budget|price/i],
  ["library", "Research", "🔍", /research|search|source/i], ["library", "Books & Reading", "📚", /book|read|author|genre/i], ["library", "Data & Catalogs", "🗂️", /data|catalog|parts/i],
  ["life", "Plants", "🌱", /plant/i], ["life", "Cells", "🔬", /\bcells?\b/i], ["life", "The Body", "🫀", /blood|body|heart|organ/i], ["life", "Life Cycles", "🐛", /life|cycle/i],
  ["logic", "Patterns", "🔷", /pattern|sequence/i], ["logic", "Counting & Sums", "➕", /counting|number|sums?\b/i], ["logic", "Venn & Grids", "⭕", /venn|grid|square|puzzle/i],
  ["money", "Interest & Saving", "🏦", /interest|loan|saving|invest/i], ["money", "Prices & Change", "🪙", /price|cost|change|coin|discount|tax/i], ["money", "Earning & Budgets", "💼", /earn|wage|income|job|budget/i],
  ["music", "Chords", "🎹", /chord/i], ["music", "Notes & Scales", "🎼", /note|scale|key|rhythm/i], ["music", "Composers & Songs", "🎻", /composer|song|instrument/i],
  ["pe", "Fitness", "💪", /fitness|training|exercise/i], ["pe", "Sports & Games", "⚽", /sport|game|play/i], ["pe", "Heart & Safety", "❤️", /heart|rate|safe/i],
  ["physics", "Energy", "⚡", /energy|heat|power/i], ["physics", "Motion & Forces", "🚀", /speed|acceleration|distance|velocity|force|gravity/i], ["physics", "Light & Waves", "🌈", /light|wave|sound/i],
  ["reading", "Word Roots", "🌳", /root|latin|greek/i], ["reading", "Prefixes & Suffixes", "🔠", /prefix|suffix/i], ["reading", "Stories & Sentences", "📕", /story|sentence/i],
  ["sign", "Letters & Numbers", "🤟", /letter|number|alphabet/i], ["sign", "Deaf Culture", "👂", /deaf|culture|history/i], ["sign", "Signs", "🙌", /\bsigns?\b/i],
  ["spanish", "Verbs", "🇪🇸", /verb|past|tense|wish/i], ["spanish", "Reading", "📖", /reading/i], ["spanish", "Everyday Words", "💬", /food|family|number|world/i],
  ["speaking", "Listening", "👂", /listen/i], ["speaking", "Debate", "🎤", /debate|argue/i], ["speaking", "Talks & Questions", "🗣️", /talk|speech|question/i],
  ["typing", "Letters & Rows", "⌨️", /letter|row|trace|key/i], ["typing", "Numbers & Data", "🔢", /number|data/i], ["typing", "Typing Code", "💻", /line|loop|file/i],
  ["vocab", "Spelling", "🐝", /spell|misspell|proofread/i], ["vocab", "Homophones", "👂", /homophone|listen/i], ["vocab", "Roots & Endings", "🌿", /root|prefix|ending|suffix/i],
  ["writing", "Sentences", "✍️", /sentence|phrase/i], ["writing", "Commas & Marks", "❗", /comma|mark|punct/i], ["writing", "Verbs & Pronouns", "🔤", /verb|pronoun|noun|adjective/i]
].map((t, i) => ({ idx: i, sid: t[0], topic: t[1], emoji: t[2], re: t[3] }));
const TOPIC_SKIP = /mixed|challenge|level \d|exam|review/i;
const topicNum = (tb, tier) => 100 + tb.idx * 10 + tier;
const topicBook = n => n >= 100 ? { tb: TOPICS[Math.floor((n - 100) / 10)], tier: (n - 100) % 10 } : null;
const bookTier = n => {
  const tbk = topicBook(n);
  if (!tbk) return BOOK_TIERS[n - 1];
  const bt = BOOK_TIERS[tbk.tier - 1], tb = tbk.tb;
  return { n, name: bt.name + " " + tb.topic, tierName: bt.name, price: TOPIC_PRICES[tbk.tier], from: tbk.tier === 5 ? 1 : bt.from, to: tbk.tier === 5 ? 30 : bt.to, stars: bt.stars,
    tag: tbk.tier === 5 ? "Everything about " + tb.topic.toLowerCase() + ", from the very start to college" : bt.tag, accent: bt.accent, topic: tb.topic, emoji: tb.emoji, tb, tier: tbk.tier };
};
function topicLessons(sid, n) {
  const tbk = topicBook(n), out = [];
  if (!tbk || !tbk.tb || tbk.tb.sid !== sid) return out;
  const t = bookTier(n);
  for (let l = t.from; l <= t.to; l++) { const ls = lessonsFor(sid, l); if (!ls) continue; for (const x of ls) if (tbk.tb.re.test(x.title || "") && !TOPIC_SKIP.test(x.title || "")) out.push({ l, ls: x }); }
  return out;
}
const topicTiersReady = tb => [1, 2, 3, 4, 5].filter(k => bookReady(tb.sid, topicNum(tb, k)));
const bookKey = (sid, n) => "book-" + sid + "-" + n;
function bookOpen(sid, n) { return !!unlocked[bookKey(sid, n)]; }
function bookReady(sid, n) { if (topicBook(n)) return topicLessons(sid, n).length >= 4; const t = bookTier(n); for (let l = t.from; l <= t.to; l++) if (!lessonsFor(sid, l)) return false; return true; }

(function addBookStyles() {
  const css = `
  .shelf { display:flex; gap:18px; overflow-x:auto; padding:6px 4px 16px; }
  .bk { flex:none; width:170px; cursor:pointer; text-align:center; transition:transform .15s; }
  .bk:hover { transform:translateY(-6px) rotate(-1deg); }
  .bk .bk-meta { margin-top:8px; font-size:13px; color:var(--muted); }
  .bk .bk-meta b { color:var(--text); font-size:15px; }
  .bk.soon { opacity:.55; }
  .cover { position:relative; width:170px; height:236px; border-radius:6px 14px 14px 6px; overflow:hidden; color:#fff;
    box-shadow:0 10px 24px rgba(0,0,0,.5), inset 8px 0 10px -6px rgba(0,0,0,.6), inset -2px 0 0 rgba(255,255,255,.12);
    border:2px solid var(--ac); display:flex; flex-direction:column; align-items:center; justify-content:space-between; padding:14px 10px 12px; text-align:center; }
  .cover::before { content:""; position:absolute; inset:0; background:
      radial-gradient(circle at 20% 15%, rgba(255,255,255,.22) 0 2px, transparent 3px) 0 0/34px 34px,
      radial-gradient(circle at 70% 60%, rgba(255,255,255,.14) 0 2px, transparent 3px) 0 0/46px 46px; pointer-events:none; }
  .cover::after { content:""; position:absolute; left:0; top:0; bottom:0; width:12px; background:linear-gradient(90deg,rgba(0,0,0,.55),rgba(0,0,0,0)); }
  .cover .c-top { font-size:11px; letter-spacing:3px; font-weight:800; opacity:.9; position:relative; }
  .cover .c-art { position:relative; width:104px; height:104px; filter:drop-shadow(0 4px 6px rgba(0,0,0,.5)); }
  .cover.big .c-art { width:170px; height:170px; }
  .cover .c-emoji { font-size:62px; line-height:1; position:relative; filter:drop-shadow(0 0 14px var(--ac)) drop-shadow(0 4px 6px rgba(0,0,0,.5)); }
  .cover .c-title { position:relative; font-weight:900; font-size:19px; line-height:1.1; text-transform:uppercase; letter-spacing:1px;
    background:linear-gradient(180deg,#fffbe0,#ffd34e 55%,#c98a00); -webkit-background-clip:text; background-clip:text; color:transparent; filter:drop-shadow(0 2px 2px rgba(0,0,0,.6)); }
  .cover .c-ribbon { position:relative; background:var(--ac); color:#10142b; font-weight:900; font-size:13px; letter-spacing:2px; padding:3px 14px; border-radius:99px; text-transform:uppercase; }
  .cover .c-stars { position:relative; font-size:13px; letter-spacing:2px; }
  .cover.t5 { border:3px solid transparent; background-clip:padding-box; }
  .cover.t5::before { background:
      radial-gradient(circle at 20% 15%, rgba(255,255,255,.5) 0 2px, transparent 3px) 0 0/30px 30px,
      linear-gradient(115deg, rgba(255,0,150,.25), rgba(0,255,255,.25), rgba(255,255,0,.25), rgba(255,0,150,.25)) 0 0/300% 100%;
    animation: holo 5s linear infinite; }
  @keyframes holo { to { background-position: 0 0, 300% 0; } }
  .cover.big { width:260px; height:360px; padding:22px 16px 18px; }
  .cover.big .c-emoji { font-size:96px; } .cover.big .c-title { font-size:28px; } .cover.big .c-ribbon { font-size:17px; } .cover.big .c-top { font-size:14px; } .cover.big .c-stars { font-size:18px; }
  .tier-tabs { display:flex; gap:8px; flex-wrap:wrap; margin:10px 0 16px; }
  .tier-tabs button { background:var(--card); color:var(--text); border:2px solid #3a4390; border-radius:999px; padding:8px 16px; font-weight:700; cursor:pointer; }
  .tier-tabs button.on { border-color:var(--accent); background:#2a3270; }
  .book-head { display:flex; gap:22px; align-items:center; flex-wrap:wrap; margin:10px 0 20px; }
  .bk-page { background:#fdf8e8; color:#2a2418; border-radius:10px 18px 18px 10px; padding:26px 28px; min-height:420px; box-shadow:0 10px 26px rgba(0,0,0,.45), inset 10px 0 14px -10px rgba(0,0,0,.35); font-size:18px; line-height:1.5; }
  .bk-page h2 { margin:0 0 8px; color:#7a3b00; } .bk-page h3 { margin:14px 0 4px; color:#8a4a00; }
  .bk-page .bk-vis { text-align:center; font-size:34px; background:#fff3cf; border-radius:12px; padding:10px; margin:6px 0; word-break:break-word; }
  .bk-page .bk-no { float:right; font-size:13px; color:#9a8a60; }
  .bk-page.divider { display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; background:linear-gradient(160deg,#fff3cf,#ffe39a); }
  .bk-page.divider .big { font-size:80px; }
  .bk-page ul.toc { list-style:none; padding:0; margin:0; columns:2; column-gap:30px; } .bk-page ul.toc li { padding:2px 0; display:flex; justify-content:space-between; gap:10px; }
  .bk-q { background:#fff; border:2px dashed #c9a24a; border-radius:12px; padding:12px 16px; margin:8px 0; }
  .bk-q .ch { display:inline-block; border:2px solid #b8923a; border-radius:8px; padding:2px 12px; margin:3px 6px 3px 0; font-weight:700; }
  .bk-nav { display:flex; align-items:center; gap:12px; margin:14px 0; flex-wrap:wrap; }
  .bk-nav input[type=range] { flex:1; min-width:140px; }
  .bk-lock { text-align:center; padding:50px 20px; }
  .bk-lock .big { font-size:64px; }`;
  const el = document.createElement("style"); el.textContent = css; document.head.appendChild(el);
})();

// ---------- cover art (drawn, not emoji): rays, rings, sparkles and a gold medallion with a letter, different for every subject / topic / level ----------
let _artId = 0;
function _rng(str) { let h = 1779033703 ^ str.length; for (let i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); } let a = h >>> 0; return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function coverArt(s, n) {
  const t = bookTier(n), tier = t.tier || t.n, r = _rng(s.id + ":" + (t.topic || "") + ":" + tier), id = "ca" + (++_artId);
  const ac = t.accent, col = s.color, cx = 60, cy = 60, rays = 10 + tier * 3, rot = r() * 30;
  let o = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="${id}g"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></radialGradient><linearGradient id="${id}m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffbe0"/><stop offset=".55" stop-color="#ffd34e"/><stop offset="1" stop-color="#c98a00"/></linearGradient></defs>`;
  o += `<circle cx="${cx}" cy="${cy}" r="58" fill="url(#${id}g)"/>`;
  o += `<g class="rays">`;
  for (let i = 0; i < rays; i++) { const a1 = (rot + i * 360 / rays) * Math.PI / 180, a2 = (rot + (i + .5) * 360 / rays) * Math.PI / 180; o += `<polygon points="${cx},${cy} ${(cx + 60 * Math.cos(a1)).toFixed(1)},${(cy + 60 * Math.sin(a1)).toFixed(1)} ${(cx + 60 * Math.cos(a2)).toFixed(1)},${(cy + 60 * Math.sin(a2)).toFixed(1)}" fill="#fff" opacity="${(.1 + r() * .12).toFixed(2)}"/>`; }
  o += `</g>`;
  [50, 41, 33].forEach((rad, i) => { o += `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="none" stroke="${i === 1 ? "#fff" : ac}" stroke-width="${i === 1 ? 1 : 2}" stroke-dasharray="${i === 1 ? "2 4" : "none"}" opacity=".8"/>`; });
  o += `<g class="orbit">`;
  const dots = 4 + tier * 2; for (let i = 0; i < dots; i++) { const a = (rot * 2 + i * 360 / dots) * Math.PI / 180; o += `<circle cx="${(cx + 50 * Math.cos(a)).toFixed(1)}" cy="${(cy + 50 * Math.sin(a)).toFixed(1)}" r="${i % 3 === 0 ? 3 : 2}" fill="${i % 2 ? "#ffd34e" : "#fff"}" stroke="#1a1240" stroke-width=".8"/>`; }
  o += `</g>`;
  for (let i = 0; i < 3 + tier; i++) { const x = 8 + r() * 104, y = 8 + r() * 104; if (Math.hypot(x - cx, y - cy) < 38) continue; const k = 2 + r() * 3; o += `<path d="M${x.toFixed(1)},${(y - k * 2).toFixed(1)} L${(x + k * .5).toFixed(1)},${(y - k * .5).toFixed(1)} L${(x + k * 2).toFixed(1)},${y.toFixed(1)} L${(x + k * .5).toFixed(1)},${(y + k * .5).toFixed(1)} L${x.toFixed(1)},${(y + k * 2).toFixed(1)} L${(x - k * .5).toFixed(1)},${(y + k * .5).toFixed(1)} L${(x - k * 2).toFixed(1)},${y.toFixed(1)} L${(x - k * .5).toFixed(1)},${(y - k * .5).toFixed(1)}Z" fill="#fff" opacity=".85" class="spark" style="animation-delay:${(r() * 2).toFixed(2)}s"/>`; }
  const icon = (typeof COVER_ICONS !== "undefined" && COVER_ICONS[s.id]) ? COVER_ICONS[s.id](col) : "";
  o += `<circle cx="${cx}" cy="${cy}" r="37" fill="#1a1240" stroke="url(#${id}m)" stroke-width="4"/><circle cx="${cx}" cy="${cy}" r="33" fill="${col}" opacity=".5"/><circle cx="${cx}" cy="${cy}" r="33" fill="url(#${id}g)" opacity=".6"/>`;
  o += `<g transform="translate(26 26) scale(.68)">${icon}</g></svg>`;
  return o;
}

// ---------- covers ----------
function coverHTML(s, n, big) {
  const t = bookTier(n);
  const bg = n === 5
    ? `linear-gradient(160deg,#12063a,${s.color} 60%,#12063a)`
    : `radial-gradient(circle at 50% 38%, ${s.color} 0%, #1a1240 78%)`;
  return `<div class="cover t${n} ${big ? "big" : ""}" style="--ac:${t.accent};background:${bg}">
    <div class="c-top">MIND LAB</div><img class="c-sip" src="img/sip-logo.png" alt="S.I.P.">
    <div class="shine"></div><div class="c-art">${coverArt(s, n)}</div>
    <div class="c-title" style="${(t.topic || s.name).length > 11 ? "font-size:" + (big ? 20 : 14) + "px;" : ""}${t.topic && t.topic.length > 13 ? "letter-spacing:0;" : ""}">${t.topic ? s.name + ":<br>" + t.topic : s.name}</div>
    <div><div class="c-ribbon">${t.topic ? t.tierName : t.name}</div><div class="c-stars" style="margin-top:6px">${"⭐".repeat(t.stars)}</div></div>
  </div>`;
}

// ---------- the book itself (built from the lessons) ----------
function slideHTML(sl) {
  return `<h3>${sl.h}</h3>${sl.v ? `<div class="bk-vis">${sl.v}</div>` : ""}<div>${sl.t}</div>`;
}
function practiceHTML(lesson) {
  let q;
  try { q = lesson.make(false); } catch (e) { return "<p>Worked example.</p>"; }
  const hints = Array.isArray(q.hints) ? q.hints : [];
  const ans = (q.answer !== undefined && q.answer !== null) ? q.answer : "";
  return `<h3>💡 Let's learn by example: ${lesson.title}</h3>
    <div class="bk-q">${q.visual ? `<div class="bk-vis">${q.visual}</div>` : ""}<div><b>${q.text}</b></div>
    ${q.choices ? `<div style="margin-top:6px">${q.choices.map((c, i) => `<span class="ch">${"ABCD"[i] || ""}. ${c}</span>`).join("")}</div>` : ""}</div>
    ${hints.length ? `<h3>🦉 Hoot shows you how</h3><ol>${hints.map(h => `<li>${h}</li>`).join("")}</ol>` : ""}
    ${ans !== "" ? `<div class="bk-q" style="border-style:solid;border-color:#4a9a4a"><b>✅ Answer: ${ans}</b></div>` : ""}
    <p style="color:#8a7a4a;font-size:15px">Now you know how it works! You can try questions like this in the course whenever you want.</p>`;
}
// Exactly 200 pages: 4 front + 6 chapter pages + 120 lessons + 69 worked-example pages + 1 end page.
function buildTopicBook(sid, n) {
  const s = subj(sid), t = bookTier(n), pages = [], list = topicLessons(sid, n);
  const put = (cls, html) => pages.push({ cls: cls || "", html });
  put("", ""); put("", ""); put("", "");
  const chapters = [];
  let lastL = 0;
  for (const { l, ls } of list) {
    if (l !== lastL) { chapters.push({ l, page: pages.length + 1 }); put("divider", `<div class="big">${subjIcon(s, 90)}</div><h2>${gradeLabel(l)}</h2><p>Level ${l} of ${s.name}</p>`); lastL = l; }
    let slides = []; try { slides = ls.make.teach(); } catch (e) {}
    put("", `<h2>📖 ${ls.title}</h2>${slides.map(slideHTML).join("")}`);
    put("", practiceHTML(ls));
  }
  put("divider", `<div class="big">🎓</div><h2>The End!</h2><p>You finished <b>${s.name}: ${t.topic}</b>.</p><p>Look at the other books on your shelf to learn even more!</p>`);
  pages[1] = { cls: "divider", html: `<div class="big">${subjIcon(s, 90)}</div><h2 style="font-size:34px">${s.name}: ${t.topic}</h2><h2>${t.tierName} Topic Book</h2><p>${t.tag}</p><p>${"⭐".repeat(t.stars)}</p><p style="font-size:14px;color:#8a7a4a">Mind Lab Books · ${pages.length} pages</p>` };
  pages[2] = { cls: "", html: `<h2>📑 Contents</h2><ul class="toc">${chapters.map(c => `<li><span>${gradeLabel(c.l)}</span><b>page ${c.page}</b></li>`).join("")}</ul>` };
  return pages;
}
function buildBook(sid, n) {
  if (topicBook(n)) return buildTopicBook(sid, n);
  const s = subj(sid), t = bookTier(n), pages = [];
  const put = (cls, html) => pages.push({ cls: cls || "", html });
  put("", "");  // cover (drawn separately)
  put("", "");  // title page
  put("", "");  // contents
  put("", "");  // how to use
  const chapters = [];
  const lessonList = [];
  for (let l = t.from; l <= t.to; l++) for (const ls of lessonsFor(sid, l)) lessonList.push({ l, ls });
  let idx = 0;
  const extras = lessonList.length ? BOOK_PAGES - 4 - 6 - lessonList.length - 1 : 0;
  for (let l = t.from; l <= t.to; l++) {
    chapters.push({ l, page: pages.length + 1 });
    put("divider", `<div class="big">${subjIcon(s, 90)}</div><h2>Chapter ${l - t.from + 1}</h2><h2 style="font-size:30px">${gradeLabel(l)}</h2><p>Level ${l} of ${s.name}</p>`);
    for (const ls of lessonsFor(sid, l)) {
      let slides = [];
      try { slides = ls.make.teach(); } catch (e) {}
      put("", `<span class="bk-no">${ls.title ? "" : ""}</span><h2>📖 ${ls.title}</h2>${slides.map(slideHTML).join("")}`);
      if (Math.floor((idx + 1) * extras / lessonList.length) > Math.floor(idx * extras / lessonList.length)) put("", practiceHTML(ls));
      idx++;
    }
  }
  put("divider", `<div class="big">🎓</div><h2>The End!</h2><p>You finished <b>${s.name}: ${t.name}</b>.</p><p>Keep going with the next book on your shelf, and take the grade exams in the course!</p>`);
  // front pages (page 1 is the cover, drawn by the reader)
  pages[1] = { cls: "divider", html: `<div class="big">${subjIcon(s, 90)}</div><h2 style="font-size:34px">${s.name}</h2><h2>${t.name} Book ${n}</h2><p>${t.tag}</p><p>${"⭐".repeat(t.stars)}</p><p style="font-size:14px;color:#8a7a4a">Mind Lab Books · ${BOOK_PAGES} pages</p>` };
  pages[2] = { cls: "", html: `<h2>📑 Contents</h2><ul class="toc">${chapters.map(c => `<li><span>Chapter ${c.l - t.from + 1}: ${gradeLabel(c.l)}</span><b>page ${c.page}</b></li>`).join("")}</ul>` };
  pages[3] = { cls: "", html: `<h2>🦉 How to use this book</h2><ol><li>Read each teaching page slowly.</li><li>Read the worked examples. Hoot shows every step and the answer, so you learn how it is done.</li><li>Stuck on a word or idea? Read that page again, or ask Hoot.</li><li>When you feel ready, try the lessons in the course and earn stars. There is no rush!</li></ol>` };
  return pages;
}

// ---------- shelf on a course page, bookstore, reader ----------
function booksShelf(sid) {
  const s = subj(sid), mine = TOPICS.filter(tb => tb.sid === sid && topicTiersReady(tb).length);
  return `<div class="section"><div class="sec-title">📚 ${s.name} Books<span>5 big books (${BOOK_PAGES} pages) from Easy to Genius${mine.length ? " + short topic books from $2" : ""}</span></div>
    <div class="shelf">${BOOK_TIERS.map(t => {
      const ready = bookReady(sid, t.n);
      return `<div class="bk ${ready ? "" : "soon"}" data-sid="${sid}" data-n="${t.n}">${coverHTML(s, t.n)}
        <div class="bk-meta"><b>${t.name}</b> · $${t.price}<br>${ready ? (bookOpen(sid, t.n) ? "✅ You own this" : "Free preview inside") : "being written…"}</div></div>`;
    }).join("")}</div>
    ${mine.length ? `<div class="sec-title" style="margin-top:14px">📘 Short topic books<span>Pick a topic. Each one has Easy, Smart, Hard, Expert and Genius books, and they cost less because they are shorter.</span></div>
    <div class="shelf">${mine.map(tb => `<div class="bk tpk" data-sid="${sid}" data-topic="${tb.idx}">${coverHTML(s, topicNum(tb, 5))}
        <div class="bk-meta"><b>${tb.topic}</b><br>${topicTiersReady(tb).length} books · from $${TOPIC_PRICES[topicTiersReady(tb)[0]]}</div></div>`).join("")}</div>` : ""}</div>`;
}
function topicPage(idx) {
  const tb = TOPICS[idx], s = subj(tb.sid), ready = topicTiersReady(tb);
  app.innerHTML = `<button class="back" id="back">← ${s.name} course</button>
    <h1>${subjIcon(s)} ${s.name}: ${tb.topic}</h1><p class="sub">Short books about ${tb.topic.toLowerCase()}. Pick your level. The first ${BOOK_PREVIEW} pages are free to read.</p>
    <div class="shelf">${ready.map(k => { const n = topicNum(tb, k), t = bookTier(n); return `<div class="bk" data-sid="${tb.sid}" data-n="${n}">${coverHTML(s, n)}
        <div class="bk-meta"><b>${t.tierName}</b> · $${t.price}<br>${bookOpen(tb.sid, n) ? "✅ You own this" : topicLessons(tb.sid, n).length * 2 + " pages"}</div></div>`; }).join("")}</div>`;
  document.getElementById("back").onclick = () => course(tb.sid);
  bindBooks(); window.scrollTo(0, 0);
}
function bindBooks(root) {
  (root || app).querySelectorAll(".bk").forEach(el => el.onclick = () => el.dataset.topic ? topicPage(+el.dataset.topic) : bookDetail(el.dataset.sid, +el.dataset.n));
}
let storeTier = 1;
function bookstore() {
  app.innerHTML = `<button class="back" id="back">← All subjects</button>
    <h1>📚 Mind Lab Books</h1><p class="sub">Every subject has 5 books of ${BOOK_PAGES} pages, from Easy ($5) to Genius ($30). Read the first ${BOOK_PREVIEW} pages free!</p>
    <div class="tier-tabs">${BOOK_TIERS.map(t => `<button data-n="${t.n}" class="${t.n === storeTier ? "on" : ""}">${"⭐".repeat(t.stars)} ${t.name} · $${t.price}</button>`).join("")}<button data-n="0" class="${storeTier === 0 ? "on" : ""}">📘 Short topic books · from $2</button></div>
    ${storeTier === 0 ? `<p class="sub">Short books about ONE topic, like Math: Division. Each topic has Easy ($2), Smart ($3), Hard ($4), Expert ($5) and Genius ($8). They are shorter than the big books, so they cost less.</p>${SUBJECTS.map(s => { const mine = TOPICS.filter(tb => tb.sid === s.id && topicTiersReady(tb).length); return mine.length ? `<h3>${s.emoji} ${s.name}</h3><div class="shelf">${mine.map(tb => `<div class="bk tpk" data-sid="${s.id}" data-topic="${tb.idx}">${coverHTML(s, topicNum(tb, 5))}<div class="bk-meta"><b>${tb.topic}</b><br>${topicTiersReady(tb).length} books</div></div>`).join("")}</div>` : ""; }).join("")}</div>` : `<div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(190px,1fr))">${SUBJECTS.map(s => {
      const ready = bookReady(s.id, storeTier);
      return `<div class="bk ${ready ? "" : "soon"}" style="width:auto;display:flex;flex-direction:column;align-items:center" data-sid="${s.id}" data-n="${storeTier}">${coverHTML(s, storeTier)}
        <div class="bk-meta"><b>${s.name}</b><br>${ready ? "$" + bookTier(storeTier).price : "being written…"}</div></div>`;
    }).join("")}</div>`}`;
  document.getElementById("back").onclick = home;
  app.querySelectorAll(".tier-tabs button").forEach(b => b.onclick = () => { storeTier = +b.dataset.n; bookstore(); });
  bindBooks();
  window.scrollTo(0, 0);
}
function bookDetail(sid, n) {
  const s = subj(sid), t = bookTier(n), ready = bookReady(sid, n), owned = bookOpen(sid, n), pcount = ready && t.topic ? buildBook(sid, n).length : BOOK_PAGES;
  app.innerHTML = `<button class="back" id="back">← ${s.name} course</button>
    <div class="book-head">${coverHTML(s, n, true)}
      <div><h1>${s.name}: ${t.topic ? t.topic + " (" + t.tierName + ")" : t.name}</h1><p class="sub">${t.tag} · ${pcount} pages · ${"⭐".repeat(t.stars)}</p>
        <p>${ready ? `${t.topic ? (t.tier === 5 ? "Every " + s.name + " lesson about " + t.topic.toLowerCase() + ", from level 1 to level 30, in order." : "The " + s.name + " lessons about " + t.topic.toLowerCase() + " for levels " + t.from + " to " + t.to + ".") : "Made from the " + s.name + " lessons for levels " + t.from + " to " + t.to + "."} Clear teaching pages, and worked examples where Hoot shows every step and the answer.` : "This book is still being written. Check back soon!"}</p>
        ${ready ? `<p><b>${owned ? "✅ You own this book" : "$" + t.price}</b></p>
        <button class="close" id="readBtn">${owned ? "Read the book" : "Read the free preview"}</button>
        ${owned ? "" : buyBookButton(t)}` : ""}
        <div id="payMsg" class="sub"></div></div></div>`;
  document.getElementById("back").onclick = () => t.topic ? topicPage(t.tb.idx) : course(sid);
  const rb = document.getElementById("readBtn"); if (rb) rb.onclick = () => openBook(sid, n, 1);
  const bb = document.getElementById("buyBook"); if (bb) bb.onclick = () => buyBook(sid, n, bb);
  window.scrollTo(0, 0);
}
function buyBookButton(t) {
  return typeof MINDLAB_API !== "undefined" && MINDLAB_API
    ? `<button class="close" id="buyBook" style="margin-left:10px">Buy for $${t.price}</button>`
    : `<button class="close" id="buyBook" style="margin-left:10px">Unlock (test mode)</button>`;
}
function buyBook(sid, n, btn) {
  if (typeof MINDLAB_API !== "undefined" && MINDLAB_API) {
    const msg = document.getElementById("payMsg");
    btn.disabled = true; if (msg) msg.textContent = "Opening the payment page…";
    fetch(MINDLAB_API + "/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind: "book", subject: sid, book: n }) })
      .then(r => r.json()).then(j => { if (j.url) location.href = j.url; else throw new Error("no url"); })
      .catch(() => { btn.disabled = false; if (msg) msg.textContent = "Sorry, payments aren't working right now. Please try again later."; });
  } else {
    unlocked[bookKey(sid, n)] = true; store.set("mindlab-unlocked", unlocked); bookDetail(sid, n);
  }
}
// ---------- full screen reader and a nicer book look ----------
function bookFsOn() { return !!(document.fullscreenElement || document.webkitFullscreenElement); }
function bookFsToggle() {
  const el = document.getElementById("app");
  try { if (bookFsOn()) (document.exitFullscreen || document.webkitExitFullscreen).call(document); else (el.requestFullscreen || el.webkitRequestFullscreen).call(el); } catch (e) {}
}
function bookFsExit() { try { if (bookFsOn()) (document.exitFullscreen || document.webkitExitFullscreen).call(document); } catch (e) {} }
["fullscreenchange", "webkitfullscreenchange"].forEach(ev => document.addEventListener(ev, () => {
  const b = document.getElementById("bkfs"); if (b) b.textContent = bookFsOn() ? "Exit full screen" : "Full screen book";
}));
(function bookLook() {
  const css = `
  .bk-top { display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap; }
  .bk-fs { margin:10px 0; }
  .bk-nav { background:rgba(255,255,255,.05); border:1px solid #3a4390; border-radius:14px; padding:8px 14px; }
  .bk-nav b { min-width:120px; text-align:center; }
  .bk-page { position:relative; background:
      linear-gradient(90deg, rgba(120,80,20,.16) 0, rgba(120,80,20,0) 26px),
      repeating-linear-gradient(180deg, rgba(150,110,40,0) 0 31px, rgba(150,110,40,.07) 31px 32px),
      linear-gradient(160deg,#fffaf0,#f6ecd2); border:1px solid #d8c791; padding:34px 40px 46px; line-height:1.62; }
  .bk-page.turn { animation: pageTurn .35s ease-out; }
  @keyframes pageTurn { from { opacity:0; transform:translateX(22px) rotateY(-6deg); } to { opacity:1; transform:none; } }
  .bk-page h2 { font-size:30px; border-bottom:3px double #d9a441; padding-bottom:6px; margin-bottom:12px; color:#7a3b00; }
  .bk-page h3 { color:#9a4b00; font-size:20px; }
  .bk-page h3::before { content:""; display:inline-block; width:10px; height:10px; background:#d9a441; transform:rotate(45deg); margin-right:8px; border-radius:2px; }
  .bk-page .bk-vis { background:linear-gradient(160deg,#fff7dc,#ffe7a6); border:2px solid #e6c46a; box-shadow:inset 0 2px 8px rgba(160,110,20,.15); }
  .bk-page .bk-q { background:#fffdf5; border:2px solid #e0c06a; border-radius:14px; box-shadow:0 3px 0 #e8d28a; }
  .bk-page .bk-q .ch { background:#fff3cf; }
  .bk-page ol li { margin:4px 0; }
  .bk-foot { position:absolute; left:0; right:0; bottom:12px; text-align:center; font-size:14px; color:#a08a50; letter-spacing:3px; }
  .bk-foot::before, .bk-foot::after { content:"~"; margin:0 10px; }
  .bk-page.divider { background: radial-gradient(circle at 50% 30%, #fff9e0, #ffe39a 70%, #f3c964); }
  .bk-page.divider .big svg { filter:drop-shadow(0 6px 8px rgba(0,0,0,.25)); }
  #app:fullscreen, #app:-webkit-full-screen { background:radial-gradient(circle at 50% 0%, #2a3270, #0b0f26 70%); overflow:auto; padding:18px 4vw 30px; max-width:none; margin:0; width:100%; height:100%; box-sizing:border-box; }
  #app:fullscreen .bk-top, #app:fullscreen .bk-nav, #app:fullscreen .bk-page, #app:fullscreen > div[style] { max-width:1000px; margin-left:auto; margin-right:auto; }
  #app:fullscreen .bk-page { font-size:clamp(20px, 2.1vw, 30px); min-height:calc(100vh - 190px); padding:48px 7vw 64px; }
  #app:fullscreen .bk-page h2 { font-size:clamp(30px, 3.2vw, 46px); }
  #app:fullscreen .bk-page h3 { font-size:clamp(22px, 2.3vw, 32px); }
  #app:fullscreen .bk-page .bk-vis { font-size:clamp(40px, 4.5vw, 64px); }
  #app:fullscreen .bk-foot { font-size:18px; }
  #app:fullscreen .cover.big { transform:scale(1.25); margin:60px 0; }
  @media (max-width:640px){ .bk-page { padding:22px 18px 40px; } }`;
  const el = document.createElement("style"); el.textContent = css; document.head.appendChild(el);
})();
function openBook(sid, n, page) {
  const s = subj(sid), t = bookTier(n), pages = buildBook(sid, n), owned = bookOpen(sid, n);
  let cur = Math.max(1, Math.min(pages.length, page || 1)), flipBack = false;
  function draw() {
    const locked = !owned && cur > BOOK_PREVIEW;
    let body;
    if (cur === 1) body = `<div style="display:flex;justify-content:center;padding:10px">${coverHTML(s, n, true)}</div>`;
    else if (locked) body = `<div class="bk-page"><div class="bk-lock"><div class="big">🔒</div><h2>The rest of the book is locked</h2><p>The first ${BOOK_PREVIEW} pages are free. Get the whole ${pages.length}-page book for <b>$${t.price}</b>.</p>${buyBookButton(t)}<div id="payMsg" class="sub"></div></div></div>`;
    else body = `<div class="bk-page turn ${flipBack ? "back" : ""} ${pages[cur - 1].cls}">${pages[cur - 1].html}<div class="bk-foot">${cur}</div><img class="bk-sip" src="img/sip-logo.png" alt=""></div>`;
    app.innerHTML = `<div class="bk-top"><button class="back" id="back">← ${s.name}${t.topic ? ": " + t.topic : ""} · ${t.tierName || t.name}</button><button class="hintbtn bk-fs" id="bkfs">${bookFsOn() ? "Exit full screen" : "Full screen book"}</button></div>
      <div class="bk-nav"><button class="hintbtn" id="prev">◀ Back</button><input type="range" id="pg" min="1" max="${pages.length}" value="${cur}"><b>Page ${cur} of ${pages.length}</b><button class="hintbtn" id="next">Next ▶</button></div>
      ${body}`;
    document.getElementById("bkfs").onclick = bookFsToggle;
    try { const pg = app.querySelector(".bk-page"); if (pg && window.MindAnim) window.MindAnim.mountBook(pg, { sid, i: cur }); } catch (e) {}
    document.getElementById("back").onclick = () => { bookFsExit(); bookDetail(sid, n); };
    document.getElementById("prev").onclick = () => { if (cur > 1) { flipBack = true; cur--; draw(); window.scrollTo(0, 0); } };
    document.getElementById("next").onclick = () => { if (cur < pages.length) { flipBack = false; cur++; draw(); window.scrollTo(0, 0); } };
    document.getElementById("pg").onchange = e => { cur = +e.target.value; draw(); window.scrollTo(0, 0); };
    const bb = document.getElementById("buyBook"); if (bb) bb.onclick = () => buyBook(sid, n, bb);
  }
  draw();
}
document.addEventListener("keydown", e => {
  const prev = document.getElementById("prev"), next = document.getElementById("next");
  if (!prev || !next || /INPUT|TEXTAREA/.test((e.target.tagName || ""))) return;
  if (e.key === "ArrowLeft") prev.click(); else if (e.key === "ArrowRight") next.click(); else if (e.key === "f" || e.key === "F") bookFsToggle();
});
