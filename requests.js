// "Request a new subject": a kid suggests a subject (no personal details). A parent reviews it and decides:
//   free  -> approved for free, or
//   $20   -> approved, $20 unlocks ALL levels of that subject, or
//   decline.
// The price and the decision live on the server (mindlab-server). Without a server, requests are only saved on this device.
const REQ_STATUS = {
  pending: "⏳ Waiting for a parent to look at it",
  free_approved: "✅ Approved, and it's FREE! We'll build it for you",
  paid_approved: "✅ Approved! Get ALL levels for $20",
  paid: "✅ You own it! We're building it",
  built: "🎉 It's ready!",
  declined: "Not this time. Try another idea!",
  local: "📝 Saved on this device. A parent can read it when the shop is online"
};
function reqApi() { return (typeof MINDLAB_API !== "undefined" && MINDLAB_API) ? MINDLAB_API : ""; }
function reqList() { return store.get("mindlab-requests", []); }
function reqSave(list) { store.set("mindlab-requests", list.slice(0, 20)); }

function requestModal() {
  let bg = document.getElementById("reqModal");
  if (bg) bg.remove();
  bg = document.createElement("div");
  bg.className = "modal-bg open"; bg.id = "reqModal";
  bg.innerHTML = `<div class="modal"><h2>➕ Request a new subject</h2>
    <p class="sub">Tell us a school subject you want. A parent looks at every idea. If they say yes, it's <b>FREE</b> or <b>$20 to get ALL its levels</b>. Don't put your name or any personal details here.</p>
    <input id="reqName" maxlength="60" placeholder="Subject name (like Astronomy)" style="width:100%;font-size:18px;padding:10px;border-radius:12px;border:3px solid #3a4390;background:#10142b;color:var(--text);margin:6px 0">
    <input id="reqNote" maxlength="200" placeholder="Why do you want it? (optional)" style="width:100%;font-size:16px;padding:10px;border-radius:12px;border:3px solid #3a4390;background:#10142b;color:var(--text);margin:6px 0">
    <button class="close" id="reqSend">Send my idea</button> <button class="hintbtn" id="reqRefresh">Check my ideas</button>
    <div id="reqMsg" class="sub" style="margin-top:8px"></div>
    <div id="reqList"></div>
    <button class="close" id="reqClose" style="background:#3a4390;color:var(--text)">Close</button></div>`;
  document.body.appendChild(bg);
  const msg = bg.querySelector("#reqMsg"), listEl = bg.querySelector("#reqList");

  function draw() {
    listEl.innerHTML = "";
    for (const r of reqList()) {
      const d = document.createElement("div"); d.className = "note"; d.style.margin = "8px 0";
      const t = document.createElement("div"); t.innerHTML = "<b></b>"; t.firstChild.textContent = r.name;
      const s = document.createElement("div"); s.textContent = REQ_STATUS[r.status] || r.status; s.className = "sub";
      d.appendChild(t); d.appendChild(s);
      if (r.status === "paid_approved" && reqApi()) {
        const b = document.createElement("button"); b.className = "close"; b.textContent = "Get all levels for $20";
        b.onclick = () => { b.disabled = true; msg.textContent = "Opening the payment page…";
          fetch(reqApi() + "/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind: "subject", request: r.id }) })
            .then(x => x.json()).then(j => { if (j.url) location.href = j.url; else throw new Error(j.error || "no url"); })
            .catch(() => { b.disabled = false; msg.textContent = "Sorry, payments aren't working right now. Please try again later."; }); };
        d.appendChild(b);
      }
      listEl.appendChild(d);
    }
  }
  function refresh() {
    const list = reqList();
    if (!reqApi()) { draw(); return; }
    Promise.all(list.map(r => (r.id.startsWith("local-") || ["paid", "built", "declined"].includes(r.status)) ? r :
      fetch(reqApi() + "/api/subject-request?id=" + encodeURIComponent(r.id)).then(x => x.json()).then(j => j && j.status ? { ...r, status: j.status } : r).catch(() => r)))
      .then(nl => { reqSave(nl); draw(); });
  }
  bg.querySelector("#reqClose").onclick = () => bg.remove();
  bg.onclick = e => { if (e.target === bg) bg.remove(); };
  bg.querySelector("#reqRefresh").onclick = refresh;
  bg.querySelector("#reqSend").onclick = () => {
    const name = bg.querySelector("#reqName").value.trim(), note = bg.querySelector("#reqNote").value.trim();
    if (name.length < 3) { msg.textContent = "Please type the subject you want, at least 3 letters."; return; }
    if (!reqApi()) {
      const list = reqList(); list.unshift({ id: "local-" + Date.now(), name, note, status: "local" }); reqSave(list);
      msg.textContent = "Saved! 📝 The shop isn't online yet, so a parent can read it later."; draw(); return;
    }
    msg.textContent = "Sending…";
    fetch(reqApi() + "/api/subject-request", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, note }) })
      .then(r => r.json()).then(j => {
        if (j.error) { msg.textContent = j.error; return; }
        const list = reqList(); list.unshift({ id: j.id, name, status: "pending" }); reqSave(list);
        bg.querySelector("#reqName").value = ""; bg.querySelector("#reqNote").value = "";
        msg.textContent = "Sent! 🎉 A parent will look at it."; draw();
      }).catch(() => { msg.textContent = "Sorry, I couldn't send it. Please try again later."; });
  };
  refresh();
}
