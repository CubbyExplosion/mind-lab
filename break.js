// Hoot's BREAK MODE: you can ask Hoot for a 30 minute break (games time).
// When the 30 minutes are up the games close, and you must wait 1 hour before the next break.
// The timer is kept on this computer (not per profile, so signing in as someone else doesn't skip the wait).
(function () {
  const BREAK_MS = 30 * 60 * 1000, WAIT_MS = 60 * 60 * 1000, KEY = "mindlab-break-timer";
  const get = () => { try { return JSON.parse(localStorage.getItem(KEY) || "null") || {}; } catch (e) { return {}; } };
  const put = o => { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} };
  const fmt = ms => { const s = Math.max(0, Math.ceil(ms / 1000)), m = Math.floor(s / 60); return m + ":" + String(s % 60).padStart(2, "0"); };
  const fmtLong = ms => { const m = Math.ceil(ms / 60000); return m >= 60 ? "1 hour" : m + " minute" + (m === 1 ? "" : "s"); };
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const inQuiz = () => !!document.querySelector(".q-card .q-text");

  // "ready" (you can start one), "on" (break running, ms left) or "wait" (ms until the next one)
  function status() {
    const t = get(), now = Date.now();
    if (t.end && now < t.end) return { s: "on", ms: t.end - now };
    if (t.next && now < t.next) return { s: "wait", ms: t.next - now };
    return { s: "ready", ms: 0 };
  }
  function start(force) {
    if (!force && status().s !== "ready") return false;
    if (inQuiz()) return false;
    const now = Date.now(); put({ end: now + BREAK_MS, next: now + BREAK_MS + WAIT_MS }); render(); pill(); setTimeout(() => { if (!document.querySelector(".bg-stage, .bg-grid, .bg-gate")) { try { breakHome(); } catch (e) {} } }, 0); return true;
  }
  // Ending a break early: no code needed, but the 1 hour wait starts right away.
  function endNow(msg) {
    const now = Date.now(); put({ end: 0, next: now + WAIT_MS });
    try { if (window.BreakGames) window.BreakGames.leave(); } catch (e) {}
    pill(); render(); backHome(); hootSay(msg || "Break over! Back to learning. 🦉 Your next break is in 1 hour.", true);
  }
  // The SECRET CODE gets you out of school time: it starts a break right now, even while you are waiting for the next one.
  // (It only changes this Mind Lab break timer. It cannot change the homework time or the bedtime that your parents set.)
  // The code is stored only as a hash.
  const CODE_HASH = "b80ca43d4ea7731517b6b1c5cf0b7f9a21376e4d937ba1be7ac6adf63ede785e";
  async function sha(t) { try { const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t + "|mindlab-break")); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join(""); } catch (e) { return ""; } }
  function askCode() {
    if (document.getElementById("brkCode")) return;
    const m = document.createElement("div"); m.id = "brkCode"; m.className = "prof-modal";
    m.innerHTML = `<div class="pm-card"><button class="pm-x" type="button" aria-label="Close">x</button><h2>Secret code</h2><p>Type the secret code to leave school time and start a break right now.</p>
      <input id="brkIn" type="password" inputmode="numeric" autocomplete="off" maxlength="20" placeholder="Secret code" style="font-size:20px;padding:10px;border-radius:12px;border:3px solid #1a1240;width:90%">
      <div class="pm-err" id="brkErr"></div><div class="pm-btns"><button class="close" id="brkGo" type="button">Start my break</button></div></div>`;
    document.body.appendChild(m); const inp = m.querySelector("#brkIn"), err = m.querySelector("#brkErr"); inp.focus();
    const close = () => m.remove(); m.querySelector(".pm-x").onclick = close; m.onclick = e => { if (e.target === m) close(); };
    const go = async () => {
      const h = await sha(inp.value.trim());
      if (h && h === CODE_HASH) { if (inQuiz()) { err.textContent = "Finish your quiz first."; return; } close(); start(true); openGames(); hootSay("Secret code accepted! Here is your 30 minute break. 🦉", false); }
      else { err.textContent = "That is not the code."; inp.value = ""; inp.focus(); }
    };
    m.querySelector("#brkGo").onclick = go; inp.onkeydown = e => { if (e.key === "Enter") go(); };
  }
  function backHome() { try { if (document.querySelector(".bg-stage, .bg-grid, .bg-gate") && typeof home === "function") home(); } catch (e) {} }

  // ---------- Hoot's panel: a break bar and a few lines of chat ----------
  const panel = document.querySelector(".hoot-panel"), log = document.getElementById("hootLog");
  function hootSay(text, open) {
    if (!log) return; const d = document.createElement("div"); d.className = "hoot-msg bot"; d.textContent = text; log.appendChild(d); log.scrollTop = log.scrollHeight;
    if (open && panel) panel.classList.add("open");
  }
  let bar = null;
  if (panel) {
    bar = document.createElement("div"); bar.className = "hoot-break"; bar.id = "hootBreak";
    const note = panel.querySelector(".hoot-note"); if (note) note.after(bar); else panel.prepend(bar);
  }
  function render() {
    if (!bar) return; const st = status();
    if (st.s === "ready") bar.innerHTML = `<span><b>Break mode</b>: take a 30 minute break and play Break Time Games.</span><button type="button" class="hb-go" id="hbStart">Start my break</button>`;
    else if (st.s === "on") bar.innerHTML = `<span><b>Break time!</b> <i id="hbLeft">${fmt(st.ms)}</i> left</span><button type="button" class="hb-go" id="hbGames">Games</button><button type="button" class="hb-end" id="hbEnd">End my break</button>`;
    else bar.innerHTML = `<span><b>Break mode</b>: your next break is in <i id="hbLeft">${fmt(st.ms)}</i></span><button type="button" class="hb-code" id="hbCode">Secret code</button>`;
    const b1 = document.getElementById("hbStart"); if (b1) b1.onclick = () => { if (start()) { hootSay("Enjoy your 30 minute break! 🦉 I'll tell you when it's over.", false); openGames(); } else hootSay(inQuiz() ? "Finish your quiz first, then ask me for a break. 🦉" : "Not yet. 🦉", false); };
    const b4 = document.getElementById("hbCode"); if (b4) b4.onclick = askCode;
    const b2 = document.getElementById("hbGames"); if (b2) b2.onclick = openGames;
    const b3 = document.getElementById("hbEnd"); if (b3) b3.onclick = () => endNow();
  }
  function openGames() { if (panel) panel.classList.remove("open"); try { window.BreakGames && window.BreakGames.open(); } catch (e) {} }

  // fun chat on a break: the Mind Lab server (fun mode, with its own safety checks) when it is on, otherwise the built-in jokes and riddles
  let funHist = [], funBusy = false;
  const apiUrl = () => (typeof MINDLAB_API !== "undefined" && MINDLAB_API) ? MINDLAB_API : "";
  function funChat(q) {
    const local = window.HootFun ? window.HootFun.reply(q) : "Hoo hoo! It's break time.";
    if (!apiUrl()) { hootSay(local, false); return; }
    if (funBusy) { hootSay("One moment, I'm still thinking!", false); return; }
    funHist.push({ role: "user", content: q }); funHist = funHist.slice(-8); funBusy = true;
    const waiting = document.createElement("div"); waiting.className = "hoot-msg bot"; waiting.textContent = "Hoot is thinking..."; log.appendChild(waiting); log.scrollTop = log.scrollHeight;
    fetch(apiUrl() + "/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: funHist, mode: "fun" }) })
      .then(r => r.json()).then(j => { const t = typeof j.reply === "string" ? j.reply : local; waiting.textContent = t; funHist.push({ role: "assistant", content: t }); funHist = funHist.slice(-8); })
      .catch(() => { waiting.textContent = local; }).finally(() => { funBusy = false; log.scrollTop = log.scrollHeight; });
  }
  // the chat box and note tell the truth about what Hoot does right now
  function chatLabels() {
    const on = status().s === "on", note = panel && panel.querySelector(".hoot-note");
    if (inp && !inp.disabled) inp.placeholder = on ? "Chat with Hoot for fun..." : "Ask about a school subject…";
    if (note) note.textContent = on ? "Break chat: just for fun, no school right now. Don't share personal details. Hoot is an AI and can make mistakes." : "Hoot teaches school subjects only. Don't share personal details. Hoot is an AI and can make mistakes.";
  }

  // typing "break" or "games" to Hoot (outside quizzes) gets a break answer
  const form = panel && panel.querySelector("#hootForm"), inp = panel && panel.querySelector("#hootIn");
  if (form && inp) form.addEventListener("submit", e => {
    const q = inp.value.trim(); if (!q || inQuiz()) return;
    const about = /\b(break|breaks|games?|play|recess)\b/i.test(q);
    if (status().s === "on") {   // on a break Hoot chats just for fun and does not teach
      e.preventDefault(); e.stopImmediatePropagation(); inp.value = "";
      const me = document.createElement("div"); me.className = "hoot-msg me"; me.textContent = q; log.appendChild(me);
      funChat(q); return;
    }
    if (!about) return;
    e.preventDefault(); e.stopImmediatePropagation(); inp.value = "";
    const me = document.createElement("div"); me.className = "hoot-msg me"; me.textContent = q; log.appendChild(me);
    const st = status();
    if (st.s === "ready") { start(); hootSay("Okay! Here is your 30 minute break. 🦉 Have fun!", false); openGames(); }
    else if (st.s === "on") hootSay("You are already on a break: " + fmt(st.ms) + " left. 🦉", false);
    else hootSay("Not yet! 🦉 You can have another break in " + fmtLong(st.ms) + ". Let's learn something until then.", false);
  }, true);

  // ---------- floating timer while on a break ----------
  let pillEl = null;
  function pill() {
    const st = status();
    if (st.s !== "on") { if (pillEl) { pillEl.remove(); pillEl = null; } return; }
    if (!pillEl) { pillEl = document.createElement("button"); pillEl.type = "button"; pillEl.className = "break-pill"; pillEl.onclick = () => { try { window.BreakGames && window.BreakGames.open(); } catch (e) {} }; document.body.appendChild(pillEl); }
    pillEl.textContent = "Break time " + fmt(st.ms) + " left";
    pillEl.classList.toggle("low", st.ms < 5 * 60 * 1000);
  }

  // ---------- the games page needs a break ----------
  function gate() {
    const st = status(), a = document.getElementById("app"); if (!a) return;
    const hoot = (typeof HOOT_SRC !== "undefined") ? `<img src="${HOOT_SRC}" alt="" width="70" height="77">` : "";
    a.innerHTML = `<button class="back" id="bgGateBack">← All subjects</button>
      <div class="bg-gate">${hoot}<h1>Break Time Games</h1>
        ${st.s === "ready" ? `<p>Hoot gives you a <b>30 minute break</b> to play. When the 30 minutes are up the games close, and you wait <b>1 hour</b> before the next break.</p><button class="close" id="bgGateGo">Start my 30 minute break</button><div class="pm-err" id="bgGateMsg"></div>`
          : `<p>Hoot says: no break yet! 🦉 You can have your next break in <b id="bgGateLeft">${fmt(st.ms)}</b>. Let's learn something until then.</p><button class="hintbtn" id="bgGateCode" type="button">I have a secret code</button>`}</div>`;
    document.getElementById("bgGateBack").onclick = () => home();
    const gc = document.getElementById("bgGateCode"); if (gc) gc.onclick = askCode;
    const go = document.getElementById("bgGateGo");
    if (go) go.onclick = () => { if (start()) window.BreakGames.open(); else document.getElementById("bgGateMsg").textContent = inQuiz() ? "Finish your quiz first." : "Not yet."; };
  }
  // wrap the games page so it only opens during a break
  function guard() {
    const B = window.BreakGames; if (!B || B.__guarded) return; B.__guarded = true;
    const open = B.open, play = B.play;
    B.open = function () { if (status().s !== "on") { B.leave(); gate(); return; } return open.apply(this, arguments); };
    B.play = function () { if (status().s !== "on") { B.leave(); gate(); return; } return play.apply(this, arguments); };
    B.status = status;
  }
  guard();

  // ---------- no school during a break ----------
  // Lessons, courses and exams are closed while a break is running. The home page becomes the break page.
  function breakHome() {
    const a = document.getElementById("app"); if (!a) return; const st = status();
    const hoot = (typeof HOOT_SRC !== "undefined") ? `<img src="${HOOT_SRC}" alt="" width="70" height="77">` : "";
    a.innerHTML = `<div class="bg-gate">${hoot}<h1>Break time!</h1><p>No school right now. Your break has <b id="bgGateLeft">${fmt(st.ms)}</b> left. Lessons open again when it's over.</p>
      <button class="close" id="bhGames">Play Break Time Games</button> <button class="hintbtn" id="bhEnd" type="button">Leave break mode</button></div>`;
    document.getElementById("bhGames").onclick = () => window.BreakGames.open();
    document.getElementById("bhEnd").onclick = () => endNow();
    window.scrollTo(0, 0);
  }
  ["course", "levelPage", "startLesson", "startExam", "bookstore", "requestModal", "home", "cardsPage", "scrollPage"].forEach(n => {
    const f = window[n]; if (typeof f !== "function" || f.__brk) return;
    const w = function () { if (status().s === "on") { breakHome(); return; } return f.apply(this, arguments); }; w.__brk = 1; window[n] = w;
  });

  // ---------- one clock for everything ----------
  let was = status().s;
  setInterval(() => {
    const st = status(), left = document.getElementById("hbLeft"), gl = document.getElementById("bgGateLeft");
    if (left) left.textContent = fmt(st.ms); if (gl) gl.textContent = fmt(st.ms);
    if (was === "on" && st.s !== "on") { was = st.s; try { window.BreakGames && window.BreakGames.leave(); } catch (e) {} pill(); render(); backHome(); hootSay("Break over! 🦉 Time to learn again. Your next break is in 1 hour.", true); return; }
    if (was !== st.s) { was = st.s; render(); if (st.s === "ready" && document.getElementById("bgGateLeft")) gate(); }
    pill(); label(); chatLabels();
  }, 1000);
  // the home button says whether games are open: in school time they are locked
  function label() {
    const b = document.getElementById("breakBtn"); if (!b) return; const st = status();
    const t = st.s === "on" ? "Break Time Games (open: " + fmt(st.ms) + ")" : st.s === "ready" ? "Break Time Games (ask Hoot for a break)" : "Break Time Games (locked: " + fmt(st.ms) + ")";
    if (b.textContent !== t) b.textContent = t; b.classList.toggle("bg-locked", st.s !== "on");
  }
  render(); pill(); chatLabels();
  window.MindBreak = { status, start, endNow, askCode, BREAK_MS, WAIT_MS };
})();
