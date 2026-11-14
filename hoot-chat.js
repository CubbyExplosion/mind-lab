// Ask Hoot: a chat window that talks ONLY to the Mind Lab server (/api/chat).
// The rules (school subjects only, family-safe, moderation) are enforced on the server, so nothing here can change them.
// Messages are shown as plain text (never as HTML). No keys live in this file.
(function () {
  const css = `
  .hoot-fab { position:fixed; right:18px; bottom:18px; z-index:20; background:var(--accent); color:#201a00; border:none; border-radius:999px; padding:14px 20px; font-size:18px; font-weight:800; cursor:pointer; box-shadow:0 8px 22px rgba(0,0,0,.45); }
  .hoot-fab:hover { filter:brightness(1.08); }
  .hoot-panel { position:fixed; right:18px; bottom:78px; z-index:21; width:min(400px, calc(100vw - 36px)); height:min(560px, calc(100vh - 110px)); background:var(--card); border:3px solid var(--accent); border-radius:20px; display:none; flex-direction:column; overflow:hidden; box-shadow:0 14px 34px rgba(0,0,0,.55); }
  .hoot-panel.open { display:flex; }
  .hoot-head { padding:12px 16px; font-weight:800; font-size:18px; background:#252d62; display:flex; justify-content:space-between; align-items:center; }
  .hoot-head button { background:none; border:none; color:var(--text); font-size:22px; cursor:pointer; }
  .hoot-note { padding:6px 14px; font-size:12px; color:var(--muted); background:#1b2145; }
  .hoot-log { flex:1; overflow-y:auto; padding:12px; display:flex; flex-direction:column; gap:10px; }
  .hoot-msg { max-width:88%; padding:10px 14px; border-radius:16px; font-size:16px; line-height:1.4; white-space:pre-wrap; word-wrap:break-word; }
  .hoot-msg.bot { background:#252d62; align-self:flex-start; border-bottom-left-radius:4px; }
  .hoot-msg.me { background:#3b3a14; border:2px solid var(--accent); align-self:flex-end; border-bottom-right-radius:4px; }
  .hoot-form { display:flex; gap:8px; padding:10px; background:#1b2145; }
  .hoot-form input { flex:1; font-size:16px; padding:10px 12px; border-radius:12px; border:3px solid #3a4390; background:#10142b; color:var(--text); }
  .hoot-form input:focus { outline:none; border-color:var(--accent); }
  .hoot-form button { background:var(--accent); color:#201a00; border:none; border-radius:12px; padding:0 16px; font-weight:800; font-size:16px; cursor:pointer; }
  .hoot-form button:disabled { opacity:.5; cursor:default; }`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  const fab = document.createElement("button");
  fab.className = "hoot-fab"; fab.innerHTML = '<img src="' + HOOT_SRC + '" alt="" width="30" height="33" style="vertical-align:middle;margin-right:6px">Ask Hoot'; fab.setAttribute("aria-label", "Ask Hoot, the tutor chat");
  const panel = document.createElement("div");
  panel.className = "hoot-panel";
  panel.innerHTML = `<div class="hoot-head"><span><img src="${HOOT_SRC}" alt="" width="28" height="31" style="vertical-align:middle;margin-right:8px">Hoot the Tutor</span><button aria-label="Close chat" id="hootX">✕</button></div>
    <div class="hoot-note">Hoot teaches school subjects only. Don't share personal details. Hoot is an AI and can make mistakes.</div>
    <div class="hoot-log" id="hootLog"></div>
    <form class="hoot-form" id="hootForm"><input id="hootIn" maxlength="500" autocomplete="off" placeholder="Ask about a school subject…"><button id="hootGo">Send</button></form>`;
  document.body.appendChild(fab); document.body.appendChild(panel);
  const log = panel.querySelector("#hootLog"), input = panel.querySelector("#hootIn"), go = panel.querySelector("#hootGo");
  let history = [], busy = false, greeted = false;

  function add(text, who) {
    const d = document.createElement("div"); d.className = "hoot-msg " + who; d.textContent = text; log.appendChild(d); log.scrollTop = log.scrollHeight; return d;
  }
  const api = () => (typeof MINDLAB_API !== "undefined" && MINDLAB_API) ? MINDLAB_API : "";

  // ---------- built-in Hoot (works with no server or key): looks answers up in the Mind Lab lessons ----------
  // Same safety idea as the server: personal details, distress and unsafe words get fixed replies; nothing else is invented.
  const L_PERSONAL = /(\b[\w.+-]+@[\w-]+\.[\w.]+\b)|(\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b)|(\bmy (real |full |last )?name is\b)|(\bi(?:'m| am) \d{1,2}(?: years old| yrs old)?\b)|(\bmy school is\b)|(\bi live (in|at|on)\b)|(\bmy (home )?address is\b)/i;
  const L_DISTRESS = /\b(kill myself|want to die|hurt myself|suicide|i am being hurt|someone is hurting me)\b/i;
  const L_UNSAFE = /\b(porn\w*|nude\w*|naked|nsfw|gambl\w*|casino|cocaine|heroin|vape|vaping|vpn|proxy|unblock\w*)\b/i;
  const L_ATTACK = /\b(ignore (all |your |the )?(rules|instructions)|pretend (to be|you are)|you are now|jailbreak|developer mode|i am (your )?(parent|developer|admin))\b/i;
  const STOP = new Set("the and for are what how why who when where does did can could would should you your with that this from have has was were there their about into just like tell teach explain please give some more than then them they will its it's i'm me my a an of to in on is it do we be or as at by if so not no yes hoot".split(" "));
  let index = null;
  function strip(h) { return String(h == null ? "" : h).replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim(); }
  function buildIndex() {
    index = [];
    const banks = (typeof lessonBanks === "function") ? lessonBanks() : {};
    for (const s of (typeof SUBJECTS !== "undefined" ? SUBJECTS : [])) {
      const b = banks[s.id]; if (!b) continue;
      for (const lv of Object.keys(b)) for (let i = 0; i < b[lv].length; i++) {
        const ls = b[lv][i]; let slides = [];
        try { slides = ls.make.teach() || []; } catch (e) {}
        const body = slides.map(x => strip(x.h) + ". " + strip(x.t)).join(" ");
        index.push({ s, lv: +lv, i, title: ls.title || "", tl: String(ls.title || "").toLowerCase(), body, bl: body.toLowerCase(), slides });
      }
    }
  }
  function words(q) { return (q.toLowerCase().match(/[a-z0-9']+/g) || []).filter(w => w.length > 2 && !STOP.has(w)); }
  function localHoot(q) {
    if (L_DISTRESS.test(q)) return "I'm sorry you feel that way. 💛 Please tell a parent or another grown-up you trust right now. They can help.";
    if (L_PERSONAL.test(q)) return "Please don't share personal details like your real name, age, school, town, phone number or email. 🦉 If you're not sure, ask a parent.";
    if (L_ATTACK.test(q)) return "I can't change my rules. 🦉 I'm Hoot, and I only teach school subjects.";
    if (L_UNSAFE.test(q)) return "I can't help with that. 🦉 Let's get back to learning! Ask me about a school subject.";
    const ws = words(q);
    if (!ws.length) return "Ask me about a school subject, like “what is a fraction?” or “how do plants make food?” 🦉";
    if (!index) buildIndex();
    let best = null, bestScore = 0;
    for (const e of index) {
      let sc = 0;
      for (const w of ws) { if (e.tl.includes(w)) sc += 4; if (e.bl.includes(w)) sc += 1; }
      if (sc > bestScore) { bestScore = sc; best = e; }
    }
    if (!best || bestScore < Math.max(3, ws.length)) return "That's out of topic, or I don't have it in my lessons yet! 🦉 I teach school subjects like math, reading, science, history, coding, Spanish and art. Try asking it with different words.";
    const txt = best.slides.slice(0, 3).map(x => strip(x.h) + ": " + strip(x.t)).join("\n\n");
    return "📖 " + best.s.name + " · Level " + best.lv + " · " + best.title + "\n\n" + txt.slice(0, 900) + (txt.length > 900 ? "…" : "") + "\n\nI can explain more or show another example. Just ask! 🦉 (This is from " + best.s.name + " → Level " + best.lv + " → “" + best.title + "”.)";
  }

  fab.onclick = () => {
    panel.classList.toggle("open");
    if (panel.classList.contains("open")) {
      if (!greeted) {
        greeted = true;
        add(api() ? "Hi, I'm Hoot! 🦉 Ask me anything about a school subject like math, science, reading, history, coding, Spanish or art, and I'll teach you!"
                  : "Hi, I'm Hoot! 🦉 Ask me about a school subject and I'll look it up in the Mind Lab lessons. (The smart AI chat is switched off for now. A parent can turn it on.)", "bot");
      }
      input.focus();
    }
  };
  panel.querySelector("#hootX").onclick = () => panel.classList.remove("open");

  // ---------- Hoot stays quiet during quizzes and exams (a question is on screen) ----------
  const QUIET = "Shh, I can't talk during a quiz or an exam. That's your turn to show what you know! Use the hints if you're stuck. When the quiz is over, ask me anything.";
  function inQuiz() { return !!document.querySelector(".q-card .q-text"); }
  let wasQuiet = null;
  function syncQuiet() {
    const q = inQuiz(); if (q === wasQuiet) return; wasQuiet = q;
    fab.classList.toggle("quiet", q); input.disabled = q; go.disabled = q || busy;
    input.placeholder = q ? "Hoot is quiet during quizzes" : "Ask about a school subject…";
    if (q && panel.classList.contains("open")) add(QUIET, "bot");
  }
  new MutationObserver(syncQuiet).observe(document.getElementById("app") || document.body, { childList: true, subtree: true });
  fab.addEventListener("click", () => { setTimeout(() => { if (inQuiz()) { const last = log.lastElementChild; if (!last || last.textContent !== QUIET) add(QUIET, "bot"); } }, 0); });
  syncQuiet();

  panel.querySelector("#hootForm").onsubmit = e => {
    e.preventDefault();
    if (inQuiz()) { input.value = ""; const last = log.lastElementChild; if (!last || last.textContent !== QUIET) add(QUIET, "bot"); return; }
    const text = input.value.trim();
    if (!text || busy) return;
    if (!api()) { input.value = ""; add(text, "me"); add(localHoot(text), "bot"); log.scrollTop = log.scrollHeight; return; }
    input.value = ""; add(text, "me");
    history.push({ role: "user", content: text }); history = history.slice(-8);
    busy = true; go.disabled = true;
    const waiting = add("Hoot is thinking…", "bot");
    fetch(api() + "/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: history }) })
      .then(r => r.json())
      .then(j => { const reply = typeof j.reply === "string" ? j.reply : (j.error || "Hoot is resting right now. 😴"); waiting.textContent = reply; history.push({ role: "assistant", content: reply }); history = history.slice(-8); })
      .catch(() => { waiting.textContent = "Hoot is resting right now. 😴 Please try again later."; })
      .finally(() => { busy = false; go.disabled = false; log.scrollTop = log.scrollHeight; input.focus(); });
  };
})();
