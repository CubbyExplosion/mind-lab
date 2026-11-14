// Mind Lab app: home, course map (4 sections), level page, lesson player + owl tutor.
const app = document.getElementById("app");
const QUESTIONS_PER_LESSON = 6;

// ---------- saving (this browser only) ----------
// (profiles.js gives each signed-in person their own save keys through mindKey)
const pkey = k => (window.mindKey ? window.mindKey(k) : k);
const store = {
  get(k, d) { try { const v = localStorage.getItem(pkey(k)); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(pkey(k), JSON.stringify(v)); } catch (e) {} }
};
let progress = store.get("mindlab-progress", {});   // { "math-1": { "1": 3, "2": 2 } }  (stars per lesson)
let unlocked = store.get("mindlab-unlocked", {});   // { "math-2": true }
let streak = store.get("mindlab-streak", { last: "", count: 0 });

// Make a value safe to put inside an HTML attribute (answers can contain quote marks).
function attr(v) { return String(v).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"); }
function today() { return new Date().toISOString().slice(0, 10); }
function bumpStreak() {
  const t = today();
  if (streak.last === t) return;
  const y = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  streak = { last: t, count: streak.last === y ? streak.count + 1 : 1 };
  store.set("mindlab-streak", streak);
  showStreak();
}
function showStreak() {
  const alive = streak.last === today() || streak.last === new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  document.getElementById("streak").textContent = "🔥 " + (alive ? streak.count : 0);
}
function starsFor(sid, level) { return progress[sid + "-" + level] || {}; }
function isOpen(sid, level) { return levelPrice(level) === 0 || !!unlocked[sid + "-" + level]; }
// Which subjects have lessons built. Add new subjects here as we build them.
const BANK_NAMES = {
  math: "MATH_LEVELS", reading: "READING_LEVELS", writing: "WRITING_LEVELS", vocab: "SPELL_LEVELS", life: "LIFE_LEVELS",
  chem: "CHEM_LEVELS", physics: "PHYSICS_LEVELS", earth: "EARTH_LEVELS", history: "HISTORY_LEVELS", geo: "GEO_LEVELS",
  coding: "CODING_LEVELS", logic: "LOGIC_LEVELS", money: "MONEY_LEVELS", music: "MUSIC_LEVELS", spanish: "SPANISH_LEVELS",
  art: "ART_LEVELS", animals: "ANIMALS_LEVELS", engineer: "ENGINEER_LEVELS", health: "HEALTH_LEVELS", typing: "TYPING_LEVELS",
  pe: "PE_LEVELS", drama: "DRAMA_LEVELS", civics: "CIVICS_LEVELS", homeec: "HOMEEC_LEVELS", french: "FRENCH_LEVELS",
  sign: "SIGN_LEVELS", library: "LIBRARY_LEVELS", hand: "HAND_LEVELS", speaking: "SPEAKING_LEVELS"
};
const bankCache = {};
function lessonBanks() {
  const out = {};
  for (const [id, name] of Object.entries(BANK_NAMES)) {
    if (!(id in bankCache) || !bankCache[id]) {
      try { bankCache[id] = Function("return typeof " + name + " !== 'undefined' ? " + name + " : null")(); } catch (e) { bankCache[id] = null; }
    }
    out[id] = bankCache[id];
  }
  return out;
}
function lessonsFor(sid, level) { const b = lessonBanks()[sid]; return b ? b[level] || null : null; }

// Say a word out loud with the browser's built-in voice (no outside sites).
function speak(word, lang) {
  try {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(word));
    u.rate = 0.8; u.lang = lang || "en-US";
    // Use a voice for that language if the browser has one.
    const voices = speechSynthesis.getVoices();
    const v = voices.find(x => x.lang === u.lang) || voices.find(x => x.lang.slice(0, 2) === u.lang.slice(0, 2));
    if (v) u.voice = v;
    speechSynthesis.speak(u);
  } catch (e) {}
}
// Any element with data-say="word" (like words in the teaching slides) speaks when tapped.
document.addEventListener("click", e => {
  const t = e.target.closest && e.target.closest("[data-say]");
  if (t) speak(t.dataset.say, t.dataset.lang || "es-ES");
});
function subj(id) { return SUBJECTS.find(s => s.id === id); }

// ---------- home ----------
function home() {
  app.innerHTML = `
    <h1>What do you want to explore?</h1>
    <p class="sub">${SUBJECTS.length} subjects · ${LEVELS_PER_SUBJECT} levels each · ${LESSONS_PER_LEVEL} lessons per level</p>
    <button class="close" id="bookstoreBtn" style="margin-bottom:18px">📚 Mind Lab Books: 5 books per subject, from $5</button>
    <button class="close" id="requestBtn" style="margin:0 0 18px 10px">➕ Request a new subject</button>
    <button class="close" id="cardsBtn" style="margin:0 0 18px 10px">My Mind Cards</button>
    <button class="close" id="scrollBtn" style="margin:0 0 18px 10px">My Grade Scroll</button>
    <button class="close bg-home-btn" id="breakBtn" style="margin:0 0 18px 10px">Break Time Games</button>
    <div class="grid">${SUBJECTS.map(s => {
      const done = Object.keys(progress).filter(k => k.startsWith(s.id + "-")).reduce((n, k) => n + Object.keys(progress[k]).length, 0);
      return `<div class="subject" style="--c:${s.color}" data-id="${s.id}">
        <div class="emoji">${subjIcon(s)}</div><h3>${s.name}</h3><p>${s.tagline}</p>
        <div class="meta">${LEVELS_PER_SUBJECT} levels · ${LEVELS_PER_SUBJECT * LESSONS_PER_LEVEL} lessons${done ? " · ✅ " + done + " done" : ""}</div>
        <div class="meta">${hardStars(hardnessOf(s.id))} ${HARD_WORDS[hardnessOf(s.id) - 1]} · ages 5-20 · ~${subjectHours()} hours</div></div>`;
    }).join("")}</div>`;
  app.querySelectorAll(".subject").forEach(el => el.onclick = () => course(el.dataset.id));
  document.getElementById("bookstoreBtn").onclick = bookstore;
  document.getElementById("requestBtn").onclick = requestModal;
  document.getElementById("cardsBtn").onclick = () => (window.cardsPage ? window.cardsPage() : 0);
  document.getElementById("scrollBtn").onclick = () => (window.scrollPage ? window.scrollPage() : 0);
  document.getElementById("breakBtn").onclick = () => (window.BreakGames ? window.BreakGames.open() : 0);
  window.scrollTo(0, 0);
}

// ---------- course map: 4 sections ----------
function course(id) {
  const s = subj(id);
  let html = `<button class="back" id="back">← All subjects</button>
    <h1>${subjIcon(s)} ${s.name}</h1><p class="sub">${s.tagline}. Level 1 is free!</p>
    <div class="note">🎯 <b>How hard is ${s.name}?</b> ${hardStars(hardnessOf(id))} ${HARD_WORDS[hardnessOf(id) - 1]}<br>
      🎂 You can start at about age 5 and keep going up to about age 20 (college).<br>
      ⏱️ Each lesson takes about ${lessonMinutes(1)}-${lessonMinutes(LEVELS_PER_SUBJECT)} minutes, and the whole course is about ${subjectHours()} hours.</div>`;
  html += booksShelf(id);
  for (const sec of SECTIONS) {
    html += `<div class="section"><div class="sec-title">${sec.emoji} ${sec.name}<span>${sec.blurb}</span></div>
      <div class="levels" style="--c:${s.color}">`;
    for (let l = sec.from; l <= sec.to; l++) {
      const p = levelPrice(l), done = Object.keys(starsFor(id, l)).length, has = !!lessonsFor(id, l);
      html += `<div class="level" data-l="${l}"><b>Level ${l}</b><small>${gradeLabel(l)}</small>
        <small>🎂 ages ${ageRange(l)} · ⏱️ ${levelTimeText(l)}</small><small>${hardStars(levelDifficulty(l))} ${HARD_WORDS[levelDifficulty(l) - 1]}</small>
        <span class="price ${p === 0 ? "free" : ""}">${p === 0 ? "FREE" : "$" + p}</span>
        ${has ? `<small class="prog">${done}/${LESSONS_PER_LEVEL} done</small>` : `<small class="prog">soon</small>`}
        ${has && l % 2 === 0 ? `<small class="prog">${examResult(id, l).passed ? "🎓 Exam passed!" : "📝 Grade exam"}</small>` : ""}</div>`;
    }
    html += `</div></div>`;
  }
  app.innerHTML = html;
  document.getElementById("back").onclick = home;
  app.querySelectorAll(".level").forEach(el => el.onclick = () => levelPage(id, +el.dataset.l));
  bindBooks();
  window.scrollTo(0, 0);
}

// ---------- real payments (Stripe Checkout, via the mindlab-server) ----------
// The page only ever talks to our own server. The Stripe secret key lives on that server, never here.
let payMode = "";   // "test" | "live" | "off" once the server answers
if (MINDLAB_API) fetch(MINDLAB_API + "/api/config").then(r => r.json()).then(j => { payMode = j.mode; }).catch(() => {});
function startCheckout(id, level, btn) {
  const msg = document.getElementById("payMsg");
  btn.disabled = true; if (msg) msg.textContent = "Opening the payment page…";
  fetch(MINDLAB_API + "/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ subject: id, level }) })
    .then(r => r.json())
    .then(j => { if (j.url) location.href = j.url; else throw new Error(j.error || "no url"); })
    .catch(() => { btn.disabled = false; if (msg) msg.textContent = "Sorry, payments aren't working right now. Please try again later."; });
}
// Back from Stripe: ?paid=cs_... -> ask our server if it was really paid, then unlock.
function finishPayment() {
  const sp = new URLSearchParams(location.search), sid = sp.get("paid");
  if (!sid || !MINDLAB_API) return Promise.resolve(null);
  history.replaceState(null, "", location.pathname);
  return fetch(MINDLAB_API + "/api/verify?session_id=" + encodeURIComponent(sid)).then(r => r.json()).then(j => {
    if (!j.paid) return null;
    if (j.kind === "card") return j;   // a printed Mind Card: nothing to unlock
    unlocked[j.kind === "subject" ? "subject-" + j.request : j.kind === "book" ? bookKey(j.subject, j.book) : j.subject + "-" + j.level] = true; store.set("mindlab-unlocked", unlocked);
    if (j.kind === "subject") { const rl = store.get("mindlab-requests", []).map(r => r.id === j.request ? { ...r, status: "paid" } : r); store.set("mindlab-requests", rl); }
    return j;
  }).catch(() => null);
}

// ---------- level page ----------
function levelPage(id, level) {
  const s = subj(id), lessons = lessonsFor(id, level), p = levelPrice(level), open = isOpen(id, level);
  const stars = starsFor(id, level);
  let html = `<button class="back" id="back">← ${s.name} course</button>
    <h1>${subjIcon(s)} ${s.name} · Level ${level}</h1><p class="sub">${gradeLabel(level)} · 🎂 ages ${ageRange(level)} · ${hardStars(levelDifficulty(level))} ${HARD_WORDS[levelDifficulty(level) - 1]} · ⏱️ ${levelTimeText(level)} (about ${lessonMinutes(level)} min a lesson)</p>`;
  if (!lessons) {
    html += `<div class="note">🚧 These lessons are still being built. Check back soon!</div>`;
  } else {
    if (!open) {
      html += `<div class="note lock">🔒 This level costs <b>$${p}</b>.
        ${MINDLAB_API
          ? `<div style="margin-top:8px">You'll pay safely on Stripe's own page, then come right back here.${payMode === "test" ? " <b>(Test mode: no real money is taken.)</b>" : ""}</div>
        <button class="close" id="unlock">Unlock Level ${level} for $${p}</button><div id="payMsg" class="sub"></div></div>`
          : `<div style="margin-top:8px">Payments aren't switched on yet, so for now you can <b>try it in test mode</b> (no real money).</div>
        <button class="close" id="unlock">Unlock Level ${level} (test mode)</button></div>`}`;
    }
    html += `<div class="lesson-list ${open ? "" : "locked"}">${lessons.map((ls, i) => {
      const st = stars[i + 1] || 0;
      return `<div class="lesson-card" data-i="${i}"><span class="num">${i + 1}</span><span class="t">${ls.title}</span>
        <span class="stars">${st ? "⭐".repeat(st) : (open ? "▶" : "🔒")}</span></div>`;
    }).join("")}</div>`;
  }
  // The grade exam sits at the end of every second-half level (levels 2, 4, 6...).
  if (lessons && level % 2 === 0) {
    const r = examResult(id, level);
    html += `<div class="exam-card ${open ? "" : "locked"}" id="examCard">
      <b>${r.passed ? "🎓" : "📝"} ${gradeName(level)} Exam</b>
      <small>${examTotal(level)} questions from the whole grade (levels ${level - 1} and ${level})${examOut100(level) ? ", marked out of 100" : ""}. No hints. ${examOut100(level) ? "Score 80 out of 100 to pass!" : "Get " + Math.ceil(examTotal(level) * EXAM_PASS) + " right to pass!"}</small>
      <small>${r.best !== undefined ? `Your best: ${r.best} ${examOut100(level) ? "out of 100" : "of " + examTotal(level)}${r.passed ? " · <span class=\"pass\">PASSED ✅</span>" : ""}` : "You haven't taken it yet."}</small>
    </div>`;
  }
  app.innerHTML = html;
  document.getElementById("back").onclick = () => course(id);
  const ec = document.getElementById("examCard");
  if (ec && open) ec.onclick = () => startExam(id, level);
  const u = document.getElementById("unlock");
  if (u) u.onclick = MINDLAB_API ? () => startCheckout(id, level, u) : () => { unlocked[id + "-" + level] = true; store.set("mindlab-unlocked", unlocked); levelPage(id, level); };
  if (lessons && open) app.querySelectorAll(".lesson-card").forEach(el => el.onclick = () => startLesson(id, level, +el.dataset.i));
  window.scrollTo(0, 0);
}

// ---------- lesson player ----------
let S = null; // current lesson state
function makeQuestions(lesson) {
  const qs = [], seen = new Set();
  let tries = 0;
  while (qs.length < QUESTIONS_PER_LESSON && tries++ < 300) {
    const q = lesson.make(false);
    // Two questions are the same only if text, picture AND choices match.
    const key = q.text + (q.visual || "") + (q.choices ? [...q.choices].map(String).sort().join("|") : "");
    if (!seen.has(key)) { seen.add(key); qs.push(q); }
  }
  return qs;
}

function startLesson(sid, level, idx) {
  const lesson = lessonsFor(sid, level)[idx];
  S = { sid, level, idx, lesson, qs: makeQuestions(lesson), qi: 0, points: 0, clean: 0, slides: lesson.make.teach ? lesson.make.teach() : null, seenTeach: false, phase: "answer", ans: [], hu: [], fixList: [], fixIdx: 0, fixed: 0 };
  newQuestionState();
  if (S.slides) renderTeach(0, false); else enterQuiz(true);
}

// ---------- teaching: short slides first, then the quiz ----------
function renderTeach(i, review) {
  const slide = S.slides[i], s = subj(S.sid), last = i === S.slides.length - 1;
  app.innerHTML = `
    <button class="back" id="quit">← ${review ? "Back to the quiz" : "Leave lesson"}</button>
    <div class="lesson-head">${subjIcon(s)} ${S.lesson.title} <span>📖 Learn · ${i + 1} of ${S.slides.length}</span></div>
    <div class="bar"><div style="width:${((i + 1) / S.slides.length) * 100}%"></div></div>
    <div class="q-card teach">
      <div class="teach-h">${slide.h}</div>
      ${slide.v ? `<div class="visual">${slide.v}</div>` : ""}
      <div class="teach-t">${slide.t}</div>
    </div>
    <div class="tutor">
      <div class="owl"><img src="${HOOT_SRC}" alt="Hoot the owl" width="64" height="70"></div>
      <div class="bubble">${i === 0 ? "Let's learn this together first. Then we'll try some questions!" : last ? "That's everything you need. Ready?" : "Got it? Tap Next when you're ready."}</div>
    </div>
    <div class="tutor-actions">
      ${i > 0 ? `<button class="hintbtn" id="prev">← Back</button>` : ""}
      ${last
        ? `<button class="close" id="go">${review ? "Back to the quiz →" : "Start the quiz 📝"}</button>`
        : `<button class="close" id="nx">Next →</button>`}
    </div>`;
  document.getElementById("quit").onclick = () => (review ? enterQuiz(false) : levelPage(S.sid, S.level));
  try { if (window.MindAnim) window.MindAnim.mount(app.querySelector(".q-card.teach"), { sid: S.sid, title: S.lesson.title, h: slide.h, scene: slide.anim, i, level: S.level, lessonKey: S.level + "-" + S.idx }); } catch (e) {}
  const p = document.getElementById("prev"); if (p) p.onclick = () => renderTeach(i - 1, review);
  const n = document.getElementById("nx"); if (n) n.onclick = () => renderTeach(i + 1, review);
  const g = document.getElementById("go");
  if (g) g.onclick = () => { const firstTime = !S.quizStarted; S.quizStarted = true; enterQuiz(firstTime); };
  window.scrollTo(0, 0);
}
function newQuestionState() { S.hints = 0; S.wrong = 0; S.done = false; S.helped = false; }

const CHEERS = ["Yes! Nice work! 🎉", "You got it! ⭐", "Super! Keep going! 🚀", "Brilliant thinking! 💡", "That's right! 🙌", "Great job! 🌟"];
const pickOne = a => a[Math.floor(Math.random() * a.length)];

// ---------- the quiz: answer EVERYTHING first, then it is marked, then you fix your mistakes ----------
function enterQuiz(first) { if (!S.phase) S.phase = "answer"; if (S.phase === "answer") renderAnswerQ(first); else renderQuestion(false); }
function saveCur() {
  const input = document.getElementById("ans");
  if (input && S.phase === "answer") S.ans[S.qi] = input.value.trim() === "" ? null : input.value.trim();
}
function answeredCount() { return S.ans.filter(a => a != null).length; }

function renderAnswerQ(first) {
  const q = S.qs[S.qi], s = subj(S.sid), total = S.qs.length, last = S.qi === total - 1, saved = S.ans[S.qi];
  const answerUI = q.choices
    ? `<div class="choices">${q.choices.map(c => `<button class="choice ${saved != null && String(saved) === String(c) ? "picked" : ""}" data-v="${attr(c)}">${c}</button>`).join("")}</div>`
    : `<div class="answer-row"><input id="ans" type="text" value="${saved != null ? attr(saved) : ""}" ${q.textInput ? 'inputmode="text" autocapitalize="off" spellcheck="false" placeholder="Type it here"' : 'inputmode="numeric" placeholder="Your answer"'} autocomplete="off" enterkeyhint="next"></div>`;
  const dots = `<div class="exdots">${S.qs.map((_, i) => `<button type="button" class="exdot ${S.ans[i] != null ? "ans" : ""} ${i === S.qi ? "cur" : ""}" data-i="${i}" title="Question ${i + 1}">${i + 1}</button>`).join("")}</div>`;
  const hu = S.hu[S.qi] || 0;
  app.innerHTML = `
    <button class="back" id="quit">← Leave lesson</button>
    <div class="lesson-head">${subjIcon(s)} ${S.lesson.title} <span>Question ${S.qi + 1} of ${total}</span></div>
    <div class="bar"><div style="width:${(answeredCount() / total) * 100}%"></div></div>
    ${dots}
    <div class="q-card">
      ${q.visual ? `<div class="visual">${q.visual}</div>` : ""}
      ${q.say ? `<button class="hintbtn say" id="say">🔊 Hear the word</button>` : ""}
      <div class="q-text">${q.text}</div>
      ${answerUI}
    </div>
    <div class="tutor">
      <div class="owl"><img src="${HOOT_SRC}" alt="Hoot the owl" width="64" height="70"></div>
      <div class="bubble" id="bubble">${first ? "Answer every question first. I'll mark them all at the end, and then we'll fix any mistakes together!" : "Take your time. You can go back and change an answer."}</div>
    </div>
    <div class="tutor-actions" id="tactions">
      ${S.qi > 0 ? `<button class="hintbtn" id="aprev">← Back</button>` : ""}
      ${hu < 3 ? `<button class="hintbtn" id="ahint">💡 Hint ${hu + 1} of 3</button>` : ""}
      <button class="close" id="anext">${last ? "Mark my quiz" : "Next →"}</button>
    </div>
    ${S.slides ? `<button class="back review" id="review">📖 Review the lesson</button>` : ""}`;
  document.getElementById("quit").onclick = () => { if (answeredCount() > 0) { if (!confirm("Leave this lesson? Your answers so far will not be saved.")) return; } levelPage(S.sid, S.level); };
  const rv = document.getElementById("review"); if (rv) rv.onclick = () => { saveCur(); renderTeach(0, true); };
  const sy = document.getElementById("say"); if (sy) sy.onclick = () => speak(q.say, q.lang);
  const go = to => { saveCur(); S.qi = to; renderAnswerQ(false); };
  const pv = document.getElementById("aprev"); if (pv) pv.onclick = () => go(S.qi - 1);
  app.querySelectorAll(".exdot").forEach(b => b.onclick = () => go(+b.dataset.i));
  const ah = document.getElementById("ahint");
  if (ah) ah.onclick = () => {
    saveCur(); S.hu[S.qi] = hu + 1;
    renderAnswerQ(false); say(`<b>Hint ${hu + 1}:</b> ${q.hints[hu]}`, "hint");
  };
  const nx = document.getElementById("anext");
  nx.onclick = () => { saveCur(); if (last) askMark(); else { S.qi++; renderAnswerQ(false); } };
  const input = document.getElementById("ans");
  if (input) { input.onkeydown = e => { if (e.key === "Enter") nx.click(); }; input.focus(); }
  let timer = 0;
  app.querySelectorAll(".choice").forEach(b => b.onclick = () => {
    S.ans[S.qi] = b.dataset.v;
    app.querySelectorAll(".choice").forEach(x => x.classList.toggle("picked", x === b));
    const dot = app.querySelector(".exdot.cur"); if (dot) dot.classList.add("ans");
    // no marking here: it only moves on. Tapping another answer first just restarts the wait. The last question waits for "Mark my quiz".
    if (!last) { clearTimeout(timer); timer = setTimeout(() => { if (S && S.phase === "answer" && S.qs[S.qi] === q) { S.qi++; renderAnswerQ(false); } }, 650); }
  });
}

function askMark() {
  const left = S.qs.length - answeredCount();
  if (left > 0 && !confirm(left + " question" + (left === 1 ? " has" : "s have") + " no answer yet. They will be marked wrong. Mark the quiz anyway?")) return;
  markQuiz();
}

function markQuiz() {
  S.phase = "marked";
  S.first = S.qs.map((q, i) => S.ans[i] != null && sameAnswer(S.ans[i], q.answer));
  S.firstPts = S.qs.map((q, i) => S.first[i] ? (S.hu[i] ? 2 : 3) : 0);
  S.points = S.firstPts.reduce((a, b) => a + b, 0);
  S.fixList = S.first.map((ok, i) => ok ? -1 : i).filter(i => i >= 0); S.fixIdx = 0; S.fixed = 0;
  S.clean = S.firstPts.filter(p => p === 3).length;
  app.innerHTML = `<div class="marking"><div class="mk-pencil"></div><h1>Marking your quiz...</h1><div class="mk-bar"><div></div></div><p class="sub">Checking every answer, one by one.</p></div>`;
  try { for (let i = 0; i < S.qs.length; i++) setTimeout(() => window.MindSfx && window.MindSfx.play("tick"), 250 + i * 220); } catch (e) {}
  setTimeout(() => { if (S && S.phase === "marked") renderMarked(); }, 400 + S.qs.length * 220);
}

function renderMarked() {
  const total = S.qs.length, max = total * 3, pct = Math.round((S.points / max) * 100), g = typeof mindGrade === "function" ? mindGrade(pct).mark : "", right = S.first.filter(Boolean).length, wrong = S.fixList.length;
  app.innerHTML = `
    <div class="${wrong ? "mkpage" : "finish"} marked">
      <div class="big">${wrong ? "📝" : "🎉"}</div>
      <h1>${wrong ? "Your quiz is marked!" : "Perfect! Nothing to fix!"}</h1>
      <div class="ex-score"><b id="mkScore">0</b><span>out of ${total}</span></div>
      <p class="sub">${right} right first time · mark so far: <b>${pct}%${g ? " (" + g + ")" : ""}</b></p>
      <div class="mk-list">${S.qs.map((q, i) => `
        <div class="mk-row ${S.first[i] ? "ok" : "bad"}" style="--i:${i}">
          <span class="mk-n">${i + 1}</span>
          <span class="mk-q">${q.text}${q.visual ? ` <small class="mk-v">${q.visual}</small>` : ""}</span>
          <span class="mk-a">${S.first[i] ? "Right" : `Wrong${S.ans[i] != null ? ": you put <b>" + String(S.ans[i]).replace(/</g, "&lt;") + "</b>" : ": no answer"}`}</span>
        </div>`).join("")}</div>
      ${wrong ? `<p>Let's go back through the ${wrong} you missed and fix ${wrong === 1 ? "it" : "them"} together. You'll earn a point back for each one you correct.</p>` : ""}
      <div class="finish-btns"><button class="close" id="fixgo">${wrong ? "Correct my mistakes (" + wrong + ")" : "See my Mind Card"}</button></div>
    </div>`;
  document.getElementById("fixgo").onclick = () => { if (wrong) { S.phase = "fix"; goFix(); } else finishLesson(); };
  const sc = document.getElementById("mkScore"); let n = 0;
  const tick = () => { if (!sc.isConnected) return; sc.textContent = n; sc.classList.remove("tick"); void sc.offsetWidth; sc.classList.add("tick"); if (n < right) { n++; setTimeout(tick, 120); } };
  setTimeout(tick, 300);
  window.scrollTo(0, 0);
}

function goFix() {
  if (S.fixIdx >= S.fixList.length) return finishLesson();
  S.qi = S.fixList[S.fixIdx]; newQuestionState();
  renderQuestion(false);
  say(`Let's fix this one together. You put <b>${S.ans[S.qi] != null ? String(S.ans[S.qi]).replace(/</g, "&lt;") : "nothing"}</b>. Try again, and tap the hint if you need help.`, "hint");
}

function renderQuestion(first) {
  const q = S.qs[S.qi], s = subj(S.sid);
  const answerUI = q.choices
    ? `<div class="choices">${q.choices.map(c => `<button class="choice" data-v="${attr(c)}">${c}</button>`).join("")}</div>`
    : `<div class="answer-row"><input id="ans" type="text" ${q.textInput ? 'inputmode="text" autocapitalize="off" spellcheck="false" placeholder="Type it here"' : 'inputmode="numeric" placeholder="Your answer"'} autocomplete="off" enterkeyhint="done"></div>`;
  app.innerHTML = `
    <button class="back" id="quit">← Leave lesson</button>
    <div class="lesson-head">${subjIcon(s)} ${S.lesson.title} <span>${S.phase === "fix" ? "Fix " + (S.fixIdx + 1) + " of " + S.fixList.length : "Question " + (S.qi + 1) + " of " + S.qs.length}</span></div>
    <div class="bar"><div style="width:${S.phase === "fix" ? (S.fixIdx / S.fixList.length) * 100 : (S.qi / S.qs.length) * 100}%"></div></div>
    <div class="q-card">
      ${q.visual ? `<div class="visual">${q.visual}</div>` : ""}
      ${q.say ? `<button class="hintbtn say" id="say">🔊 Hear the word</button>` : ""}
      <div class="q-text">${q.text}</div>
      ${answerUI}
    </div>
    <div class="tutor">
      <div class="owl"><img src="${HOOT_SRC}" alt="Hoot the owl" width="64" height="70"></div>
      <div class="bubble" id="bubble">${first ? (S.slides ? "Quiz time! I'll help you if you get stuck." : "Hi, I'm Hoot! I'll help you if you get stuck.") : "Here's the next one. You can do it!"}</div>
    </div>
    <div class="tutor-actions" id="tactions"></div>
    ${S.slides ? `<button class="back review" id="review">📖 Review the lesson</button>` : ""}`;
  // leaving halfway asks first, so a stray tap does not throw your answers away
  document.getElementById("quit").onclick = () => { if (S.qi > 0 || S.points > 0) { if (!confirm("Leave this lesson? Your answers so far will not be saved.")) return; } levelPage(S.sid, S.level); };
  const rv = document.getElementById("review"); if (rv) rv.onclick = () => renderTeach(0, true);
  const sy = document.getElementById("say"); if (sy) { sy.onclick = () => speak(q.say, q.lang); }
  // No Check button: press Enter, or it checks by itself the moment you have typed an answer as long as the real one
  // (a right answer is accepted straight away). Wrong tries still count.
  const input = document.getElementById("ans");
  if (input) {
    let timer = 0;
    input.onkeydown = e => { if (e.key === "Enter") { clearTimeout(timer); submit(input.value); } };
    input.oninput = () => {
      clearTimeout(timer); if (S.done) return;
      const v = input.value, want = String(q.answer);
      if (sameAnswer(v, q.answer)) { timer = setTimeout(() => submit(input.value), 250); return; }          // right: accept it
      if (!q.textInput && normalize(v).length >= normalize(want).length && normalize(v) !== "") timer = setTimeout(() => submit(input.value), 800); // number is long enough: check it (a short pause, so you can still fix a slip)
    };
    input.focus();
  }
  app.querySelectorAll(".choice").forEach(b => b.onclick = () => submit(b.dataset.v, b));
  renderActions();
}

function isLastQ() { return S.phase === "fix" ? S.fixIdx + 1 >= S.fixList.length : S.qi + 1 >= S.qs.length; }
function renderActions() {
  const box = document.getElementById("tactions");
  if (!box) return;
  if (S.done) { box.innerHTML = `<button class="close" id="next">${isLastQ() ? "Finish 🏁" : "Next →"}</button>`; document.getElementById("next").onclick = nextQ; return; }
  let html = "";
  if (S.hints < 3) html += `<button class="hintbtn" id="hint">💡 Hint ${S.hints + 1} of 3</button>`;
  else html += `<button class="hintbtn" id="easier">🪜 Try an easier one</button>`;
  // You can always just tap Next. A question you skip is worth 0 points, so marks can go down as well as up.
  html += `<button class="hintbtn" id="skipq">${isLastQ() ? "Finish →" : "Next →"}</button>`;
  box.innerHTML = html;
  // Skipping asks twice, so nobody skips (and loses the points) by an accidental tap.
  const sk = document.getElementById("skipq");
  if (sk) sk.onclick = () => {
    if (!sk.classList.contains("sure")) { const old = sk.textContent; sk.classList.add("sure"); sk.textContent = "Skip? Tap again (0 points)"; setTimeout(() => { if (sk.isConnected) { sk.classList.remove("sure"); sk.textContent = old; } }, 2800); return; }
    S.skipped = (S.skipped || 0) + 1; nextQ();
  };
  const h = document.getElementById("hint"); if (h) h.onclick = giveHint;
  const e = document.getElementById("easier"); if (e) e.onclick = easier;
}

function say(msg, mood) {
  const b = document.getElementById("bubble");
  if (!b) return;
  b.className = "bubble " + (mood || "");
  b.innerHTML = msg;
}

function giveHint() {
  const q = S.qs[S.qi];
  const text = q.hints[S.hints];
  S.hints++; S.helped = true;
  say(`<b>Hint ${S.hints}:</b> ${text}`, "hint");
  renderActions();
}

function easier() {
  S.qs[S.qi] = S.lesson.make(true);
  S.helped = true; S.hints = 0; S.wrong = 0;
  renderQuestion(false);
  say("No problem! Here's an easier one. Try this first, then you'll be ready for harder ones. 💪");
}

// Compare answers ignoring capitals, spaces, punctuation and accents (so "pajaro" = "pájaro").
function normalize(v) { return String(v).trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^\w.\-]/g, ""); }

// Same answer if the cleaned text matches, or both are numbers with the same value ("1.50" = "1.5").
function sameAnswer(given, answer) {
  const a = normalize(given), b = normalize(answer);
  if (a === b) return true;
  if (a === "" || b === "") return false;
  const x = Number(a), y = Number(b);
  return !isNaN(x) && !isNaN(y) && Math.abs(x - y) <= 1e-9 * Math.max(1, Math.abs(y));
}
function submit(raw, btn) {
  if (S.done) return;
  if (String(raw).trim() === "") { say("Type your answer first, then press Enter. 🙂"); return; }
  const q = S.qs[S.qi];
  const ok = sameAnswer(raw, q.answer);
  if (ok) {
    S.done = true;
    const fixing = S.phase === "fix";
    const pts = fixing ? 1 : (S.wrong === 0 && !S.helped ? 3 : S.wrong === 0 ? 2 : 1);   // a mistake you correct earns 1 point back
    S.points += pts; S.lastGain = pts; if (fixing) S.fixed++; else if (pts === 3) S.clean++;
    const input = document.getElementById("ans"); if (input) input.disabled = true;
    app.querySelectorAll(".choice").forEach(b => { b.disabled = true; if (normalize(b.dataset.v) === normalize(q.answer)) b.classList.add("right"); });
    say((fixing ? "Corrected! +1 point back. " : "") + pickOne(CHEERS) + (pts < 3 && !fixing ? " <br><small>(Using hints is totally fine, that's how we learn!)</small>" : ""), "good");
    renderActions();
  } else {
    S.wrong++;
    if (btn) btn.classList.add("wrongc");
    const n = Number(raw);
    const extra = q.wrong && q.wrong(isNaN(n) ? raw : n);
    let msg = "❌ That's not right." + (extra ? " " + extra : "");
    if (S.hints < 3) {
      // Hoot says it's wrong AND gives the next hint on his own.
      S.helped = true;
      msg += `<br><b>💡 Hint ${S.hints + 1}:</b> ${q.hints[S.hints]}`;
      S.hints++;
    } else {
      msg += "<br>That was my last hint. Try again, or tap <b>Try an easier one</b>.";
    }
    say(msg, "bad");
    renderActions();
    const input = document.getElementById("ans"); if (input) { input.select(); input.focus(); }
  }
}

function nextQ() {
  if (S.phase === "fix") { S.fixIdx++; return goFix(); }
  S.qi++;
  if (S.qi >= S.qs.length) return finishLesson();
  newQuestionState();
  renderQuestion(false);
}

function finishLesson() {
  // marks can now be low: 0 stars if you scored under a third (skipping questions gives 0 points)
  const max = S.qs.length * 3, stars = S.points >= max * 0.83 ? 3 : S.points >= max * 0.55 ? 2 : S.points >= max * 0.34 ? 1 : 0;
  const key = S.sid + "-" + S.level;
  progress[key] = progress[key] || {};
  if (stars > 0) progress[key][S.idx + 1] = Math.max(progress[key][S.idx + 1] || 0, stars);
  store.set("mindlab-progress", progress);
  bumpStreak();
  const hasNext = S.idx + 1 < lessonsFor(S.sid, S.level).length;
  app.innerHTML = `
    <div class="finish">
      <div class="big">${"⭐".repeat(stars)}${"☆".repeat(3 - stars)}</div>
      <h1>Lesson complete!</h1>
      <p class="sub">${S.lesson.title}: ${S.points} of ${max} bonus points${S.fixList && S.fixList.length ? ` · you corrected ${S.fixed} of ${S.fixList.length} mistake${S.fixList.length === 1 ? "" : "s"}` : ""}</p>
      ${typeof mindCard === "function" ? mindCard({ kind: "lesson", sid: S.sid, level: S.level, title: S.lesson.title, pct: (S.points / max) * 100, stars }) : ""}
      <p>${stars === 3 ? "Amazing work! 🎉" : stars === 2 ? "Great job! Try again for 3 stars." : stars === 1 ? "You finished it, that's what counts! Try again to get more stars." : "No stars this time. Read the lesson again and have another go. Skipped questions are worth 0 points."}</p>
      <div class="finish-btns">
        ${hasNext ? `<button class="close" id="nextL">Next lesson →</button>` : ""}
        <button class="hintbtn" id="again">🔁 Do it again</button>
        <button class="hintbtn" id="list">📋 All lessons</button>
      </div>
    </div>`;
  const { sid, level, idx } = S;
  if (hasNext) document.getElementById("nextL").onclick = () => startLesson(sid, level, idx + 1);
  document.getElementById("again").onclick = () => startLesson(sid, level, idx);
  document.getElementById("list").onclick = () => levelPage(sid, level);
  window.scrollTo(0, 0);
}

// ---------- grade exam: at the end of every second-half level ----------
const EXAM_PASS = 0.8;
// Kindergarten and 1st grade exams: 20 questions. From 2nd grade up (level 6 and above): 40 questions, marked out of 100.
function examTotal(level) { return level >= 6 ? 40 : 20; }
function examOut100(level) { return level >= 6; }
const EXAM_QUESTIONS = 20; // (kept for old code; use examTotal(level))
let E = null; // current exam state
function gradeName(level) { return gradeLabel(level).replace(/ \(.*\)/, ""); }
function examResult(sid, level) { return (store.get("mindlab-exams", {})[sid + "-" + level]) || {}; }
function shuffleArr(a) { return a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(x => x[1]); }

function examFmt(ms) { const s = Math.floor(ms / 1000); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); }
function examStopClock() { if (E && E.clock) { clearInterval(E.clock); E.clock = 0; } }
function examStartClock() {
  examStopClock();
  E.clock = setInterval(() => { const t = document.getElementById("exTime"); if (!t || !E) { examStopClock(); return; } t.textContent = examFmt(Date.now() - E.t0); }, 500);
}
function examDots() {
  return `<div class="exdots">${E.qs.map((_, i) => `<button type="button" class="exdot ${E.answers[i] !== null ? "ans" : ""} ${E.flags[i] ? "flag" : ""} ${i === E.qi && !E.review ? "cur" : ""}" data-i="${i}" title="Question ${i + 1}">${i + 1}</button>`).join("")}</div>`;
}
function examTop(extra) {
  const total = E.qs.length, need = Math.ceil(total * EXAM_PASS), done = E.answers.filter(a => a !== null).length;
  return `<button class="back" id="quit">← Leave exam</button>
    <div class="exam-bar">
      <div class="ex-stat"><span>Answered</span><b>${done}/${total}</b></div>
      <div class="ex-track"><div class="ex-fill" style="width:${(done / total) * 100}%"></div><div class="ex-mark" style="left:${(need / total) * 100}%"><i></i><small>pass ${need}</small></div><div class="ex-rocket" style="left:${(done / total) * 100}%">🚀</div></div>
      <div class="ex-stat"><span>Time</span><b id="exTime">${examFmt(Date.now() - E.t0)}</b></div>
    </div>
    ${examDots()}${extra || ""}`;
}
function examBind() {
  document.getElementById("quit").onclick = () => { if (confirm("Leave the exam? Your answers will be lost.")) { examStopClock(); levelPage(E.sid, E.level); } };
  app.querySelectorAll(".exdot").forEach(b => b.onclick = () => { E.review = false; E.qi = +b.dataset.i; renderExamQ(); });
}

function renderExamQ() {
  const q = E.qs[E.qi], s = subj(E.sid), total = E.qs.length, last = E.qi === total - 1, saved = E.answers[E.qi];
  const answerUI = q.choices
    ? `<div class="choices">${q.choices.map(c => `<button class="choice ${saved !== null && String(saved) === String(c) ? "picked" : ""}" data-v="${attr(c)}">${c}</button>`).join("")}</div>`
    : `<div class="answer-row"><input id="ans" type="text" value="${saved !== null ? attr(saved) : ""}" ${q.textInput ? 'inputmode="text" autocapitalize="off" spellcheck="false" placeholder="Type it here"' : 'inputmode="numeric" placeholder="Your answer"'} autocomplete="off"><button class="close" id="check">Lock in ✓</button></div>`;
  app.innerHTML = `
    ${examTop(`<div class="lesson-head">${subjIcon(s)} ${gradeName(E.level)} Exam <span>Question ${E.qi + 1} of ${total}</span></div>`)}
    <div class="q-card exq ${E.flags[E.qi] ? "flagged" : ""}">
      ${q.visual ? `<div class="visual">${q.visual}</div>` : ""}
      ${q.say ? `<button class="hintbtn say" id="say">🔊 Hear the word</button>` : ""}
      <div class="q-text">${q.text}</div>
      ${answerUI}
    </div>
    <div class="exnav">
      <button class="hintbtn" id="exprev" ${E.qi === 0 ? "disabled" : ""}>← Back</button>
      <button class="hintbtn exflag ${E.flags[E.qi] ? "on" : ""}" id="exflag">${E.flags[E.qi] ? "🚩 Flagged" : "🏁 Flag to check later"}</button>
      <button class="hintbtn" id="exnext">${last ? "Check my answers →" : "Skip / Next →"}</button>
    </div>
    <p class="sub" style="margin-top:12px">📝 Exam rules: no hints. You can go back and change any answer before you hand in.</p>`;
  examBind();
  const sy = document.getElementById("say"); if (sy) sy.onclick = () => speak(q.say, q.lang);
  const advance = () => { if (last) { E.review = true; renderExamReview(); } else { E.qi++; renderExamQ(); } };
  document.getElementById("exprev").onclick = () => { if (E.qi > 0) { E.qi--; renderExamQ(); } };
  document.getElementById("exnext").onclick = advance;
  document.getElementById("exflag").onclick = () => { E.flags[E.qi] = !E.flags[E.qi]; renderExamQ(); };
  const input = document.getElementById("ans"), check = document.getElementById("check");
  if (check) {
    const go = () => { if (String(input.value).trim() === "") return; E.answers[E.qi] = input.value.trim(); advance(); };
    check.onclick = go; input.onkeydown = e => { if (e.key === "Enter") go(); }; input.focus();
  }
  app.querySelectorAll(".choice").forEach(b => b.onclick = () => {
    E.answers[E.qi] = b.dataset.v;
    app.querySelectorAll(".choice").forEach(x => x.classList.toggle("picked", x === b));
    b.classList.add("lock");
    // moving on waits a moment, and tapping a different answer first just restarts the wait (so a slip can be fixed)
    clearTimeout(E.autoT); E.autoT = setTimeout(() => { if (E && E.qs[E.qi] === q && !E.review) advance(); }, 650);
  });
  examStartClock();
  window.scrollTo(0, 0);
}

function renderExamReview() {
  const total = E.qs.length, un = E.answers.map((a, i) => a === null ? i : -1).filter(i => i >= 0), fl = E.flags.map((f, i) => f ? i : -1).filter(i => i >= 0);
  app.innerHTML = `
    ${examTop(`<div class="q-card exreview">
      <h2>Check before you hand in</h2>
      <p class="sub">Tap a number to go back to that question.</p>
      ${un.length ? `<p class="ex-warn">Not answered yet: <b>${un.map(i => i + 1).join(", ")}</b></p>` : `<p class="ex-ok">You answered every question!</p>`}
      ${fl.length ? `<p class="ex-warn">Flagged to check: <b>${fl.map(i => i + 1).join(", ")}</b></p>` : ""}
      <div class="finish-btns"><button class="close" id="handin">Hand in the exam</button><button class="hintbtn" id="exback">← Keep checking</button></div>
    </div>`)}`;
  examBind();
  document.getElementById("exback").onclick = () => { E.review = false; E.qi = un.length ? un[0] : (fl.length ? fl[0] : 0); renderExamQ(); };
  document.getElementById("handin").onclick = () => {
    if (un.length && !confirm("You have " + un.length + " question(s) with no answer. They will count as wrong. Hand in anyway?")) return;
    finishExam();
  };
  window.scrollTo(0, 0);
}

function startExam(sid, level) {
  // One question from each of 20 different lessons across both halves of the grade.
  const pool = [];
  [level - 1, level].forEach(l => { const ls = lessonsFor(sid, l); if (ls) ls.forEach(x => pool.push(x)); });
  const picks = shuffleArr(pool);
  const qs = [];
  const want = examTotal(level);
  for (let i = 0; qs.length < want && i < want * 4; i++) {
    const q = picks[i % picks.length].make(false);
    if (!qs.some(o => o.text === q.text && (o.visual || "") === (q.visual || ""))) qs.push(q);
  }
  examStopClock();
  E = { sid, level, qs, qi: 0, answers: qs.map(() => null), flags: qs.map(() => false), review: false, t0: Date.now(), clock: 0 };
  renderExamQ();
}

function finishExam() {
  examStopClock();
  E.log = E.qs.map((q, i) => { const given = E.answers[i]; return { q, given: given === null ? "(no answer)" : given, ok: given !== null && sameAnswer(given, q.answer) }; });
  E.right = E.log.filter(x => x.ok).length;
  const total = E.qs.length, need = Math.ceil(total * EXAM_PASS), passed = E.right >= need, took = examFmt(Date.now() - E.t0), pct = Math.round((E.right / total) * 100);
  const out100 = examOut100(E.level), score = out100 ? Math.round((E.right / total) * 100) : E.right, outOf = out100 ? 100 : total, needScore = out100 ? Math.round(EXAM_PASS * 100) : need;
  const exams = store.get("mindlab-exams", {}), key = E.sid + "-" + E.level, prev = exams[key] || {};
  const prevBest = prev.out === outOf ? (prev.best || 0) : (prev.out === undefined && !out100 ? (prev.best || 0) : 0);
  exams[key] = { best: Math.max(prevBest, score), out: outOf, passed: !!prev.passed || passed };
  store.set("mindlab-exams", exams);
  bumpStreak();
  const missed = E.log.filter(x => !x.ok), stars = pct >= 100 ? 3 : pct >= 90 ? 2 : passed ? 1 : 0;
  const { sid, level } = E, right = score;
  app.innerHTML = `
    <div class="finish">
      <div class="big">${passed ? "🎓" : "💪"}</div>
      <h1>${passed ? "You passed the " + gradeName(level) + " exam!" : "Not quite there yet"}</h1>
      <div class="ex-score"><b id="exScore">0</b><span>out of ${outOf}</span></div>
      <div class="ex-stars">${[1, 2, 3].map(n => `<i class="${n <= stars ? "on" : ""}" style="--d:${0.9 + n * 0.35}s">★</i>`).join("")}</div>
      <p class="sub">${E.right} of ${total} questions right · You needed ${needScore} to pass · Time ${took}</p>
      ${typeof mindCard === "function" ? mindCard({ kind: "exam", sid, level, title: gradeName(level) + " Exam", pct, stars }) : ""}
      <p>${passed ? (stars === 3 ? "Perfect score! Wow!" : "Amazing work!") + " 🎉" : "That's okay! Look at what you missed, review the lessons, then try again. You can do it!"}</p>
      ${missed.length ? `<h3 style="margin-top:22px">Questions to review (tap to see)</h3>${missed.map((m, i) => `
        <details class="exam-miss" style="--i:${i}"><summary>${m.q.text}</summary>
          ${m.q.visual ? `<div class="vis">${m.q.visual}</div>` : ""}
          <div>Your answer: <span style="color:#ff8a8a">${m.given}</span></div>
          <div>Correct answer: <span class="pass">${m.q.answer}</span></div></details>`).join("")}` : ""}
      <div class="finish-btns">
        <button class="close" id="retake">🔁 ${passed ? "Take it again" : "Try the exam again"}</button>
        <button class="hintbtn" id="list">📋 Back to lessons</button>
      </div>
    </div>`;
  document.getElementById("retake").onclick = () => startExam(sid, level);
  document.getElementById("list").onclick = () => levelPage(sid, level);
  // count the score up like a scoreboard
  const sc = document.getElementById("exScore"); let n = 0;
  const tick = () => { if (!sc.isConnected) return; sc.textContent = n; sc.classList.remove("tick"); void sc.offsetWidth; sc.classList.add("tick"); if (n < right) { n++; setTimeout(tick, Math.max(14, 1100 / Math.max(1, right))); } };
  setTimeout(tick, 400);
  window.scrollTo(0, 0);
}

// ---------- music picker ----------
const musicBtn = document.getElementById("musicBtn");
const musicModal = document.getElementById("musicModal");
const trackList = document.getElementById("trackList");
const vol = document.getElementById("vol");
function labelFor(id) { return id === "off" ? "Off" : MindMusic.tracks[id].emoji + " " + MindMusic.tracks[id].label; }
function refreshMusic() {
  musicBtn.textContent = "🎵 Music: " + labelFor(MindMusic.current);
  const ids = ["off", ...Object.keys(MindMusic.tracks)];
  trackList.innerHTML = ids.map(id => `<button class="track ${MindMusic.current === id ? "on" : ""}" data-id="${id}">${id === "off" ? "🔇 No music" : labelFor(id)}</button>`).join("");
  trackList.querySelectorAll(".track").forEach(b => b.onclick = () => { MindMusic.play(b.dataset.id); refreshMusic(); });
}
musicBtn.onclick = () => { musicModal.classList.add("open"); refreshMusic(); };
document.getElementById("musicClose").onclick = () => musicModal.classList.remove("open");
musicModal.onclick = e => { if (e.target === musicModal) musicModal.classList.remove("open"); };
vol.oninput = () => MindMusic.setVolume(+vol.value);
try { const v = localStorage.getItem("mindlab-vol"); if (v !== null) MindMusic.setVolume(+v); } catch (e) {}
vol.value = MindMusic.volume;
document.getElementById("logo").onclick = home;

showStreak();
refreshMusic();
finishPayment().then(j => {
  if (j && j.kind === "card") { home(); if (window.cardThanks) window.cardThanks(j); }
  else if (j) { if (j.kind === "subject") { home(); requestModal(); } else if (j.kind === "book") openBook(j.subject, j.book, BOOK_PREVIEW + 1); else levelPage(j.subject, j.level); }
  else home();
});
