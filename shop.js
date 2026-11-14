// Mind Lab shop: buy a REAL printed Mind Card that comes in the post.
// A grown-up pays on Stripe's own page, and the address is typed there too. This page never sees an address or a card number.
// Without the payments server (config.js MINDLAB_API) you can still print the card at home.
(function () {
  const api = () => (typeof MINDLAB_API !== "undefined" && MINDLAB_API) ? MINDLAB_API : "";
  let cfg = null;
  if (api()) fetch(api() + "/api/config").then(r => r.json()).then(j => { cfg = j; }).catch(() => {});
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const money = c => "$" + (c / 100).toFixed(2).replace(/\.00$/, "");
  const NICK = /^[\p{L}\p{N} _-]{2,16}$/u;
  const subjectName = id => { try { const s = SUBJECTS.find(x => x.id === id); return s ? s.name : id; } catch (e) { return id; } };
  const safeText = (t, n) => String(t).replace(/[^\p{L}\p{N} .,:'()&?!+-]/gu, " ").replace(/\s+/g, " ").trim().slice(0, n);

  function printLink(c, nick) {
    const q = new URLSearchParams({ m: c.mark || (window.mindGrade ? window.mindGrade(c.pct).mark : c.grade), t: safeText(c.title, 60), s: safeText(subjectName(c.sid), 30), l: String(c.level), p: String(c.pct), st: String(c.stars || 0), d: c.date, n: nick, k: c.kind === "exam" ? "exam" : "lesson" });
    return "card-print.html?" + q.toString();
  }

  function open(c) {
    if (!c) return;
    const old = document.getElementById("shopModal"); if (old) old.remove();
    const exam = c.kind === "exam", mark = c.mark || (window.mindGrade ? window.mindGrade(c.pct).mark : c.grade);
    const price = cfg && cfg.card ? (exam ? cfg.card.examPrice : cfg.card.price) : null, ship = cfg && cfg.card ? cfg.card.ship : null;
    const ready = !!api() && cfg && cfg.mode && cfg.mode !== "off" && price != null;
    const nick0 = (window.mindName && window.mindName() !== "Guest") ? window.mindName() : "";
    const m = document.createElement("div"); m.id = "shopModal"; m.className = "prof-modal";
    m.innerHTML = `<div class="pm-card shop-card">
      <button class="pm-x" id="shClose" aria-label="Close">x</button>
      <h2>${exam ? "Buy your EXAM card" : "Buy a real Mind Card"}</h2>
      <div class="shop-prev"><div class="shop-flip" id="shFlip"><div class="shop-face front">${window.mindCardHTML ? window.mindCardHTML(c, false).replace(/<button[^>]*mc-buy[^>]*>.*?<\/button>/s, "") : ""}</div><div class="shop-face back">${window.mindCardBackHTML ? window.mindCardBackHTML() : ""}</div></div></div>
      <div class="shop-flipbar"><button type="button" class="hintbtn" id="shTurn">Turn the card over</button></div>
      <p class="pm-note">A real S.I.P. Mind Card in the post: ${exam ? "premium gold with a shiny finish, " : ""}the size of a playing card, with the S.I.P. mark on the front and back.</p>
      <label>Name printed on the card<input id="shNick" type="text" maxlength="16" autocomplete="off" spellcheck="false" value="${esc(nick0)}" placeholder="A nickname"></label>
      <p class="pm-note pm-safe">Use a nickname, not your real name. It is printed on the card.</p>
      ${ready ? `<div class="shop-price"><span>Card</span><b>${money(price)}</b></div><div class="shop-price"><span>Postage</span><b>${money(ship)}</b></div><div class="shop-price tot"><span>Total (one card)</span><b>${money(price + ship)}</b></div>
        <p class="pm-note">Posting to: ${esc((cfg.card.countries || []).join(", "))}. You can choose up to 5 cards on the next page.${cfg.mode === "test" ? ' <b class="shop-test">TEST MODE: no real money is taken.</b>' : ""}</p>
        <label class="shop-ok"><input type="checkbox" id="shOk"> A grown-up is here with me and says yes to buying this.</label>`
        : `<p class="pm-note shop-off">${api() ? "Ordering is not switched on right now." : "Ordering is not switched on yet."} You can print this card at home for free.</p>`}
      <div class="pm-err" id="shErr"></div>
      <div class="pm-btns">${ready ? `<button class="close" id="shPay" disabled>Pay with a grown-up</button>` : ""}<a class="hintbtn shop-link" id="shPrint" href="#" target="_blank" rel="noopener">Print it at home</a></div>
    </div>`;
    document.body.appendChild(m);
    const q = id => document.getElementById(id), close = () => m.remove(), err = t => { q("shErr").textContent = t; };
    q("shTurn").onclick = () => q("shFlip").classList.toggle("turned");
    q("shClose").onclick = close; m.onclick = e => { if (e.target === m) close(); };
    const nickOk = () => NICK.test(q("shNick").value.trim());
    const sync = () => { const b = q("shPay"); if (b) b.disabled = !(q("shOk") && q("shOk").checked && nickOk()); };
    q("shNick").oninput = () => { err(nickOk() || !q("shNick").value ? "" : "A nickname with 2 to 16 letters or numbers, please."); sync(); };
    if (q("shOk")) q("shOk").onchange = sync;
    q("shPrint").onclick = e => { if (!nickOk()) { e.preventDefault(); err("Type a nickname first (2 to 16 letters or numbers)."); return; } q("shPrint").href = printLink(c, q("shNick").value.trim()); };
    const pay = q("shPay");
    if (pay) pay.onclick = () => {
      if (!nickOk()) return err("Type a nickname first (2 to 16 letters or numbers).");
      pay.disabled = true; err("Opening the payment page...");
      const card = { kind: c.kind, mark, title: safeText(c.title, 60), subject: safeText(subjectName(c.sid), 30), level: c.level, pct: c.pct, stars: c.stars || 0, date: c.date, nick: q("shNick").value.trim() };
      fetch(api() + "/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind: "card", card }) })
        .then(r => r.json()).then(j => { if (j.url) location.href = j.url; else throw new Error(j.error || "no url"); })
        .catch(e => { pay.disabled = false; err(String(e.message || "").length < 90 && e.message !== "no url" ? e.message : "Sorry, ordering is not working right now. Try again later or print it at home."); });
    };
    sync();
  }
  window.buyCard = open;
  document.addEventListener("click", e => {
    const b = e.target.closest && e.target.closest(".mc-buy"); if (!b) return;
    e.stopPropagation(); open((window.mindCardList ? window.mindCardList() : []).find(c => String(c.id) === String(b.dataset.id)));
  }, true);

  // back from Stripe after paying for a card
  window.cardThanks = function (j) {
    const m = document.createElement("div"); m.className = "prof-modal";
    m.innerHTML = `<div class="pm-card shop-card"><button class="pm-x" aria-label="Close">x</button><h2>Your card is ordered!</h2>
      <p>Thank you! Your ${esc(j && j.mark ? j.mark + " " : "")}Mind Card is paid for and will be printed and posted.</p>
      <p class="pm-note">The receipt and address are with Stripe. Keep the email they send.</p>
      <div class="pm-btns"><button class="close" id="thx">Great!</button></div></div>`;
    document.body.appendChild(m); const x = () => m.remove(); m.querySelector(".pm-x").onclick = x; m.querySelector("#thx").onclick = x; m.onclick = e => { if (e.target === m) x(); };
  };
})();
