// Mind Lab profiles (name + passcode) and Mind Cards (a grade A to F card at the end of every quiz).
// Everything is saved in THIS browser only. Nothing is sent anywhere. Use a nickname, not a real name.
(function () {
  const get = (k, d) => { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } };
  const set = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const raw = k => { try { return localStorage.getItem(k) || ""; } catch (e) { return ""; } };
  const PER_USER = { "mindlab-progress": 1, "mindlab-exams": 1, "mindlab-streak": 1, "mindlab-cards": 1 };
  const ME = raw("mindlab-profile"); // id of the signed-in person ("" = guest)
  // app.js asks this for every save key, so each person gets their own progress
  window.mindKey = k => (ME && (PER_USER[k] || /^mindlab-break-(save|best|diff|pics)|^mindlab-rocketco$/.test(k)) ? "u:" + ME + ":" + k : k);
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const users = () => get("mindlab-users", {});
  const slug = n => n.trim().toLowerCase().replace(/\s+/g, " ");
  const me = () => (ME ? users()[ME] : null);
  window.mindName = () => { const u = me(); return u ? u.name : "Guest"; };

  async function hash(salt, pass) {
    const data = new TextEncoder().encode(salt + "|" + pass + "|mindlab");
    try { if (crypto && crypto.subtle) { const h = await crypto.subtle.digest("SHA-256", data); return [...new Uint8Array(h)].map(b => b.toString(16).padStart(2, "0")).join(""); } } catch (e) {}
    let h = 2166136261; for (const b of data) { h ^= b; h = Math.imul(h, 16777619) >>> 0; } return "f" + h.toString(16);
  }
  const newSalt = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

  // ---------- grades ----------
  const GRADES = [[90, "A", "Brilliant! You really know this."], [80, "B", "Great job! Almost perfect."], [70, "C", "Good work! You know most of it."], [60, "D", "Nice try. Practise a little more."], [50, "E", "Getting there. Review the lesson and try again."], [0, "F", "Don't give up! Read the lesson again, then retry."]];
  // Each letter has a mark: "-" (bottom of the band), nothing (middle), "+" (upper) and "++" (very top). That's all.
  function gradeOf(pct) {
    pct = Math.max(0, Math.min(100, pct));
    for (let i = 0; i < GRADES.length; i++) {
      const g = GRADES[i]; if (pct < g[0]) continue;
      const top = i === 0 ? 100 : GRADES[i - 1][0] - 1, width = top - g[0] + 1, f = (pct - g[0] + 1) / width;
      const mod = f > 0.9 ? "++" : f > 0.7 ? "+" : f <= 0.3 ? "-" : "";
      return { letter: g[1], mark: g[1] + mod, msg: g[2] };
    }
    return { letter: "F", mark: "F-", msg: GRADES[5][2] };
  }
  window.mindGrade = gradeOf;
  // An exam card is the most important card: it counts 3 times in every average.
  const WEIGHT = c => (c.kind === "exam" ? 3 : 1);
  const wavg = a => { let t = 0, w = 0; a.forEach(c => { t += c.pct * WEIGHT(c); w += WEIGHT(c); }); return w ? Math.round(t / w) : 0; };
  window.mindCardList = () => get(window.mindKey("mindlab-cards"), []);

  // makes the card, saves it in the collection, and returns its HTML
  window.mindCard = function (info) {
    const pct = Math.max(0, Math.min(100, Math.round(info.pct))), g = gradeOf(pct), key = "mindlab-cards";
    const list = get(window.mindKey(key), []);
    const date = new Date().toISOString().slice(0, 10);
    const card = { id: list.length + 1, kind: info.kind, sid: info.sid, title: info.title, level: info.level, pct, grade: g.letter, mark: g.mark, stars: info.stars || 0, date };
    list.push(card); set(window.mindKey(key), list.slice(-300));
    return cardHTML(card, true);
  };
  function cardHTML(c, big) {
    let sub = "";
    try { const s = SUBJECTS.find(x => x.id === c.sid); sub = (s ? s.name : c.sid) + " · Level " + c.level; } catch (e) { sub = "Level " + c.level; }
    const exam = c.kind === "exam";
    return `<div class="mindcard g-${c.grade} ${big ? "big" : ""} ${exam ? "exam" : ""}">
      <div class="shine"></div><div class="mc-frame"></div><img class="mc-wm" src="img/sip-logo.png" alt="">
      <div class="mc-top"><span><img class="mc-tl" src="img/sip-logo.png" alt="">S.I.P. MIND CARD</span><span>No. ${String(c.id).padStart(4, "0")}</span></div>
      ${exam ? `<div class="mc-ribbon">EXAM CARD</div>` : ""}
      <div class="mc-grade ${(c.mark || c.grade).length > 2 ? "long" : ""}">${c.mark || gradeOf(c.pct).mark}</div>
      <div class="mc-title">${esc(c.title)}</div>
      <div class="mc-sub">${esc(sub)}${c.kind === "exam" ? " · Exam" : ""}</div>
      <div class="mc-pct">${c.pct}%</div>
      <div class="mc-stars">${[1, 2, 3].map(n => `<i class="${n <= c.stars ? "on" : ""}">★</i>`).join("")}</div>
      ${big ? `<div class="mc-msg">${gradeOf(c.pct).msg}</div>` : ""}
      <div class="mc-foot"><span>${esc(window.mindName())}</span><span>${c.date}</span></div>
      <div class="mc-mark"><img src="img/sip-logo.png" alt="S.I.P. logo"><span>Marked by the S.I.P.</span></div>
      <div class="mc-since">ORIGINAL SINCE 2024</div>
      <button type="button" class="mc-buy" data-id="${c.id}">Buy a real card</button>
    </div>`;
  }

  window.mindCardHTML = cardHTML;
  // the back of every S.I.P. Mind Card: black and gold with the real logo
  window.mindCardBackHTML = () => `<div class="mindcard cardback"><div class="mc-frame"></div><img class="cb-logo" src="img/sip-logo.png" alt="S.I.P. logo"><div class="cb-name">S.I.P.</div><div class="cb-sub">MIND CARD</div><div class="cb-line"></div><div class="cb-small">Marked by the S.I.P.<br>Original since 2024</div></div>`;

  // ---------- my cards page ----------
  window.cardsPage = function () {
    const list = get(window.mindKey("mindlab-cards"), []).slice().reverse();
    const count = {}; list.forEach(c => count[c.grade] = (count[c.grade] || 0) + 1);
    const avg = wavg(list), exams = list.filter(c => c.kind === "exam"), lessons = list.filter(c => c.kind !== "exam");
    app.innerHTML = `<button class="back" id="back">← All subjects</button> <button class="hintbtn" id="cardsScroll">My Grade Scroll</button>
      <h1>My Mind Cards</h1>
      <p class="sub">${list.length ? list.length + " card" + (list.length === 1 ? "" : "s") + " · average " + avg + "% (" + gradeOf(avg).mark + ")" : "Finish a lesson or an exam to earn your first card."} · Playing as <b>${esc(window.mindName())}</b></p>
      <div class="mc-sum">${["A", "B", "C", "D", "E", "F"].map(l => `<div class="g-${l}"><b>${l}</b><span>${count[l] || 0}</span></div>`).join("")}</div>
      ${exams.length ? `<h2 class="mc-h exam">Exam Cards <small>the most important ones: they count 3 times</small></h2><div class="mc-grid exams">${exams.map(c => cardHTML(c, true)).join("")}</div>` : `<p class="mc-hint">Exam Cards are the most important cards. Take a grade exam at the end of a level to earn one!</p>`}
      ${lessons.length ? `<h2 class="mc-h">Lesson Cards</h2><div class="mc-grid">${lessons.map(c => cardHTML(c, false)).join("")}</div>` : ""}`;
    document.getElementById("back").onclick = () => home();
    document.getElementById("cardsScroll").onclick = () => window.scrollPage();
    window.scrollTo(0, 0);
  };

  // ---------- the grade scroll: one every year, with every grade you have ever got ----------
  window.scrollPage = function (year) {
    const all = get(window.mindKey("mindlab-cards"), []);
    const years = [...new Set(all.map(c => c.date.slice(0, 4)).concat([String(new Date().getFullYear())]))].sort().reverse();
    year = String(year || years[0]);
    const upto = all.filter(c => c.date.slice(0, 4) <= year);          // every grade up to the end of that year
    const bySubj = {};
    upto.forEach(c => { (bySubj[c.sid] = bySubj[c.sid] || []).push(c); });
    const subjName = id => { try { const s = SUBJECTS.find(x => x.id === id); return s ? s.name : id; } catch (e) { return id; } };
    const avg = wavg;
    const rows = Object.keys(bySubj).sort((a, b) => subjName(a).localeCompare(subjName(b))).map(id => {
      const a = bySubj[id], av = avg(a), g = gradeOf(av).letter, ex = a.filter(c => c.kind === "exam");
      return `<tr><td>${esc(subjName(id))}</td><td>${a.length}</td><td>${ex.length ? "<b class='sc-g g-" + gradeOf(avg(ex)).letter + "'>" + gradeOf(avg(ex)).mark + "</b>" : "-"}</td><td>${av}%</td><td><b class="sc-g g-${g}">${gradeOf(av).mark}</b></td></tr>`;
    }).join("");
    const yrs = [...new Set(upto.map(c => c.date.slice(0, 4)))].sort().reverse();
    const detail = yrs.map(y => {
      const list = upto.filter(c => c.date.startsWith(y)).slice().reverse();
      return `<h3 class="sc-year">${y}${y === year ? " (this scroll's year)" : ""} · ${list.length} grade${list.length === 1 ? "" : "s"} · average ${avg(list)}% (${gradeOf(avg(list)).mark})</h3>
        <table class="sc-tab"><tr><th>Date</th><th>Subject</th><th>What</th><th>Score</th><th>Grade</th></tr>${list.map(c => `<tr class="${c.kind === "exam" ? "ex" : ""}"><td>${c.date.slice(5)}</td><td>${esc(subjName(c.sid))}</td><td>${esc(c.title)}${c.kind === "exam" ? " (exam)" : ""}</td><td>${c.pct}%</td><td><b class="sc-g g-${c.grade}">${c.mark || gradeOf(c.pct).mark}</b></td></tr>`).join("")}</table>`;
    }).join("");
    const examRows = upto.filter(c => c.kind === "exam").slice().reverse().map(c => `<tr class="ex"><td>${c.date}</td><td>${esc(subjName(c.sid))}</td><td>${esc(c.title)}</td><td>${c.pct}%</td><td><b class="sc-g g-${c.grade}">${c.mark || gradeOf(c.pct).mark}</b></td></tr>`).join("");
    const tot = avg(upto), tg = gradeOf(tot).letter, A = upto.filter(c => c.grade === "A").length;
    app.innerHTML = `<button class="back" id="back">← All subjects</button>
      <div class="sc-years">${years.map(y => `<button class="hintbtn ${y === year ? "on" : ""}" data-y="${y}">${y}</button>`).join("")}<button class="hintbtn" id="scPrint">Print my scroll</button><button class="hintbtn" id="scCards">My Mind Cards</button></div>
      <div class="scroll-wrap"><div class="sc-rod"></div>
        <div class="scroll"><div class="sc-in">
          <div class="sc-head"><img class="sc-logo" src="img/sip-logo.png" alt="S.I.P. logo"><small>MARKED BY THE S.I.P.</small><h1>Grade Scroll ${year}</h1><p>for <b>${esc(window.mindName())}</b></p></div>
          ${upto.length ? `<div class="sc-total"><div class="sc-big g-${tg} ${gradeOf(tot).mark.length > 2 ? "long" : ""}">${gradeOf(tot).mark}</div><div><b>${tot}%</b> average (exams count 3 times)<br>${upto.length} grade${upto.length === 1 ? "" : "s"} so far · ${A} A${A === 1 ? "" : "s"}</div></div>
            ${examRows ? `<h3 class="sc-exh">Exam grades <small>(most important: they count 3 times)</small></h3><table class="sc-tab"><tr><th>Date</th><th>Subject</th><th>Exam</th><th>Score</th><th>Grade</th></tr>${examRows}</table>` : ""}
            <h3>Subjects</h3><table class="sc-tab"><tr><th>Subject</th><th>Grades</th><th>Exam</th><th>Average</th><th>Grade</th></tr>${rows}</table>
            <h2 class="sc-sec">Every grade you have ever got</h2>${detail}` : `<p class="sc-empty">No grades yet. Finish a lesson or an exam and your first grade will be written here!</p>`}
          <div class="sc-seal"><img src="img/sip-logo.png" alt="S.I.P. logo"><b>Marked by the S.I.P.</b><small>Mind Lab · ${year}</small></div>
        </div></div><div class="sc-rod"></div></div>`;
    document.getElementById("back").onclick = () => home();
    document.getElementById("scCards").onclick = () => window.cardsPage();
    document.getElementById("scPrint").onclick = () => window.print();
    app.querySelectorAll("[data-y]").forEach(b => b.onclick = () => window.scrollPage(b.dataset.y));
    window.scrollTo(0, 0);
  };

  // ---------- sign in / new profile ----------
  const fails = { n: 0, until: 0 };
  function modal(view) {
    let m = document.getElementById("profModal"); if (m) m.remove();
    m = document.createElement("div"); m.id = "profModal"; m.className = "prof-modal";
    const u = me(), all = Object.values(users());
    let body = "";
    if (u) {
      body = `<h2>Hi, ${esc(u.name)}!</h2><p class="pm-note">You are signed in. Your lessons, exams and Mind Cards are saved just for you.</p>
        <div class="pm-btns"><button class="close" id="pmCards">My Mind Cards</button><button class="close" id="pmScroll">My Grade Scroll</button><button class="hintbtn" id="pmOut">Sign out</button></div>`;
    } else {
      body = `<div class="pm-tabs"><button class="${view !== "new" ? "on" : ""}" data-v="in">Sign in</button><button class="${view === "new" ? "on" : ""}" data-v="new">New profile</button></div>
        <label>Name<input id="pmName" type="text" maxlength="16" autocomplete="off" spellcheck="false" placeholder="A nickname"></label>
        <label>Passcode<input id="pmPass" type="password" maxlength="24" autocomplete="off" placeholder="At least 4 letters or numbers"></label>
        ${view === "new" ? `<label>Passcode again<input id="pmPass2" type="password" maxlength="24" autocomplete="off"></label>` : ""}
        <div class="pm-err" id="pmErr"></div>
        <div class="pm-btns"><button class="close" id="pmGo">${view === "new" ? "Make my profile" : "Sign in"}</button><button class="hintbtn" id="pmGuest">Keep playing as a guest</button></div>
        ${all.length && view !== "new" ? `<p class="pm-note">Profiles on this device: ${all.map(x => esc(x.name)).join(", ")}</p>` : ""}
        <p class="pm-note pm-safe">Safety tip: use a nickname, not your real name, and a passcode you do not use anywhere else. Everything stays in this browser only.</p>`;
    }
    m.innerHTML = `<div class="pm-card"><button class="pm-x" id="pmClose" aria-label="Close">x</button>${body}</div>`;
    document.body.appendChild(m);
    const close = () => m.remove();
    m.onclick = e => { if (e.target === m) close(); };
    document.getElementById("pmClose").onclick = close;
    if (u) {
      document.getElementById("pmCards").onclick = () => { close(); window.cardsPage(); };
      document.getElementById("pmScroll").onclick = () => { close(); window.scrollPage(); };
      document.getElementById("pmOut").onclick = () => { try { localStorage.removeItem("mindlab-profile"); } catch (e) {} location.reload(); };
      return;
    }
    m.querySelectorAll(".pm-tabs button").forEach(b => b.onclick = () => modal(b.dataset.v === "new" ? "new" : "in"));
    document.getElementById("pmGuest").onclick = close;
    const err = t => { const e = document.getElementById("pmErr"); e.textContent = t; e.classList.remove("shake"); void e.offsetWidth; e.classList.add("shake"); try { window.MindSfx && window.MindSfx.play("wrong"); } catch (x) {} };
    const go = async () => {
      const name = document.getElementById("pmName").value.trim().replace(/\s+/g, " "), pass = document.getElementById("pmPass").value, id = slug(name), all = users();
      if (name.length < 2) return err("Type a name with at least 2 letters.");
      if (!/^[\p{L}\p{N} _-]+$/u.test(name)) return err("Use only letters, numbers and spaces in your name.");
      if (pass.length < 4) return err("Your passcode needs at least 4 letters or numbers.");
      if (view === "new") {
        if (all[id]) return err("That name is already used on this device. Pick another or sign in.");
        if (pass !== document.getElementById("pmPass2").value) return err("The two passcodes are different.");
        if (slug(pass) === id) return err("Your passcode should not be the same as your name.");
        const salt = newSalt(); all[id] = { name, salt, hash: await hash(salt, pass), made: Date.now() }; set("mindlab-users", all);
        try { localStorage.setItem("mindlab-profile", id); } catch (e) {} location.reload();
      } else {
        if (Date.now() < fails.until) return err("Too many tries. Wait " + Math.ceil((fails.until - Date.now()) / 1000) + " seconds.");
        const u = all[id];
        if (!u || (await hash(u.salt, pass)) !== u.hash) { fails.n++; if (fails.n >= 5) { fails.until = Date.now() + 30000; fails.n = 0; } return err("That name and passcode do not match."); }
        try { localStorage.setItem("mindlab-profile", id); } catch (e) {} location.reload();
      }
    };
    document.getElementById("pmGo").onclick = go;
    m.querySelectorAll("input").forEach(i => i.onkeydown = e => { if (e.key === "Enter") go(); });
    document.getElementById("pmName").focus();
  }
  window.openProfile = modal;

  function addBtn() {
    const hr = document.querySelector(".head-right"); if (!hr || document.getElementById("profBtn")) return;
    const b = document.createElement("button"); b.className = "music-btn"; b.id = "profBtn"; b.type = "button";
    const u = me(); b.textContent = u ? u.name : "Sign in"; b.title = u ? "Your profile" : "Sign in with a name and passcode";
    b.onclick = () => modal(); hr.insertBefore(b, hr.firstChild);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", addBtn); else addBtn();
})();
