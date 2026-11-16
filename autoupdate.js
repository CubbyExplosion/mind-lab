// Mind Lab: notices when a new version is published and updates by itself (when it's safe).
(function () {
  if (location.protocol === "file:") return;
  var first = null, shown = false, lastTouch = Date.now();
  ["pointerdown", "keydown", "touchstart"].forEach(function (e) { addEventListener(e, function () { lastTouch = Date.now(); }, true); });
  function sig() {
    return fetch("version.txt?v=" + Date.now(), { cache: "no-store" }).then(function (r) { return r.ok ? r.text() : ""; });
  }
  function busy() { return !!document.getElementById("rcL"); } // a rocket is launching right now
  function banner() {
    if (shown) return; shown = true;
    var b = document.createElement("div");
    b.style.cssText = "position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:99999;background:#2b3070;color:#fff;border:3px solid #ffd34e;border-radius:14px;padding:10px 16px;font:700 15px system-ui,sans-serif;box-shadow:0 6px 20px rgba(0,0,0,.4);display:flex;gap:10px;align-items:center";
    b.innerHTML = '<span>New Mind Lab update is ready!</span><button type="button" style="background:#ffd34e;color:#1a1240;border:0;border-radius:10px;padding:6px 12px;font:800 14px system-ui;cursor:pointer">Update now</button>';
    b.querySelector("button").onclick = function () { location.reload(); };
    document.body.appendChild(b);
    setInterval(function () { if (!busy() && Date.now() - lastTouch > 25000) location.reload(); }, 5000); // idle for 25s: update by itself
  }
  function check() {
    if (document.hidden && first) return;
    sig().then(function (s) { if (!first) first = s; else if (s && s !== first) banner(); }).catch(function () {});
  }
  setTimeout(check, 3000); setInterval(check, 60000);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) check(); });
})();
