// Mind Lab: hover over a subject and its picture comes alive with something that subject does
// (maths: a calculator working out sums, reading: pages flipping, chemistry: bubbling flask...).
(function () {
  const rnd = n => Math.floor(Math.random() * n);
  const dots = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join("");
  const snd = (n, a) => { try { window.MindSfx && window.MindSfx.play(n, a); } catch (e) {} };

  const SCENES = {
    calc: () => `<div class="hv-calc"><div class="scr"><b>0</b></div><div class="keys">${dots(12, i => `<i style="animation-delay:${(i * .23).toFixed(2)}s"></i>`)}</div></div>`,
    pages: () => `<div class="hv-book"><div class="cov"></div>${dots(6, i => `<div class="lf" style="--d:${(i * .32).toFixed(2)}s;z-index:${6 - i}"><s></s><s></s><s></s></div>`)}</div>`,
    write: () => `<div class="hv-write"><i></i><i></i><i></i><div class="pen"></div></div>`,
    abc: () => `<div class="hv-abc">${dots(4, i => `<b style="animation-delay:${i * .25}s">${"ABCD"[i]}</b>`)}</div>`,
    plant: () => `<div class="hv-plant"><div class="soil"></div><div class="stem"></div><div class="lf1"></div><div class="lf2"></div><div class="fl"></div></div>`,
    flask: () => `<div class="hv-flask"><div class="nk"></div><div class="bd"><div class="lq"></div></div>${dots(7, i => `<i style="left:${34 + (i % 4) * 9}%;animation-delay:${(i * .22).toFixed(2)}s"></i>`)}</div>`,
    atom: () => `<div class="hv-atom"><div class="nu"></div><div class="or o1"><i></i></div><div class="or o2"><i></i></div><div class="or o3"><i></i></div></div>`,
    globe: () => `<div class="hv-globe"><div class="land"></div></div>`,
    compass: () => `<div class="hv-compass"><b>N</b><div class="nd"></div></div>`,
    clock: () => `<div class="hv-clock"><i class="a"></i><i class="b"></i><b></b></div>`,
    coins: () => `<div class="hv-coins">${dots(5, i => `<i style="animation-delay:${(i * .25).toFixed(2)}s;--y:${i * 9}px"></i>`)}</div>`,
    vote: () => `<div class="hv-vote"><div class="bx"></div><div class="pp"></div></div>`,
    code: () => `<div class="hv-code"><div class="ln"><u></u><u></u></div><div class="ln"><u></u></div><div class="ln"><u></u><u></u><u></u></div><div class="cur"></div></div>`,
    keys: () => `<div class="hv-keys">${dots(15, i => `<i style="animation-delay:${((i * 7) % 15 * .1).toFixed(2)}s"></i>`)}</div>`,
    bulb: () => `<div class="hv-bulb"><div class="g"></div><div class="b"></div>${dots(6, i => `<i style="--r:${i * 60}deg"></i>`)}</div>`,
    notes: () => `<div class="hv-notes">${dots(5, i => `<b style="left:${8 + i * 17}%;animation-delay:${(i * .3).toFixed(2)}s">${["♪", "♫", "♪", "♬", "♫"][i]}</b>`)}</div>`,
    masks: () => `<div class="hv-masks"><div class="m1"></div><div class="m2"></div></div>`,
    paint: () => `<div class="hv-paint">${dots(5, i => `<i style="background:${["#ff6fb5", "#4cc3ff", "#ffd34e", "#6be28f", "#ff8a2a"][i]};left:${8 + i * 17}%;animation-delay:${(i * .25).toFixed(2)}s"></i>`)}<div class="br"></div></div>`,
    speak: w => `<div class="hv-speak"><div class="bub"><b>${w}</b></div>${dots(3, i => `<i style="animation-delay:${i * .2}s"></i>`)}</div>`,
    wave: () => `<div class="hv-wave"><div class="hd"><i></i><i></i><i></i><i></i><i></i><b></b></div></div>`,
    paws: () => `<div class="hv-paws">${dots(4, i => `<b style="left:${10 + i * 22}%;top:${i % 2 ? 22 : 54}%;animation-delay:${(i * .3).toFixed(2)}s"></b>`)}</div>`,
    gears: () => `<div class="hv-gears"><div class="g1"></div><div class="g2"></div></div>`,
    heart: () => `<div class="hv-heart"><div class="hh"></div><svg viewBox="0 0 100 30"><polyline points="0,15 24,15 32,3 40,27 48,15 100,15"/></svg></div>`,
    ball: () => `<div class="hv-ball"><div class="bl"></div><div class="sh"></div></div>`,
    pot: () => `<div class="hv-pot"><div class="pt"></div><div class="hl"></div>${dots(3, i => `<i style="left:${34 + i * 12}%;animation-delay:${(i * .35).toFixed(2)}s"></i>`)}</div>`,
    scroll: () => `<div class="hv-scroll"><div class="sc"></div><div class="tx"><u></u><u></u><u></u></div></div>`
  };
  const FOR = {
    math: "calc", logic: "bulb", reading: "pages", library: "pages", writing: "write", vocab: "abc", life: "plant", chem: "flask", physics: "atom", earth: "globe", geo: "compass",
    history: "clock", money: "coins", civics: "vote", coding: "code", typing: "keys", music: "notes", drama: "masks", art: "paint", spanish: "speak:Hola!", french: "speak:Bonjour!",
    speaking: "speak:Hello!", sign: "wave", hand: "wave", animals: "paws", engineer: "gears", health: "heart", pe: "ball", homeec: "pot"
  };

  let timer = null;
  function stop(card) {
    clearInterval(timer); timer = null;
    const o = card.querySelector(".hv-fx"); if (o) o.remove();
    card.classList.remove("hv-on");
  }
  function start(card) {
    if (card.classList.contains("hv-on")) return;
    const spec = FOR[card.dataset.id]; if (!spec) return;
    const [kind, arg] = spec.split(":"), html = SCENES[kind] && SCENES[kind](arg); if (!html) return;
    const holder = card.querySelector(".emoji"); if (!holder) return;
    const o = document.createElement("div"); o.className = "hv-fx hv-" + kind + "-wrap"; o.innerHTML = html;
    holder.appendChild(o); card.classList.add("hv-on");
    const ico = holder.querySelector("svg");   // sit exactly over the picture, wherever the card puts it
    if (ico) { const a = ico.getBoundingClientRect(), b = holder.getBoundingClientRect(); o.style.left = (a.left - b.left + a.width / 2) + "px"; o.style.top = (a.top - b.top + a.height / 2) + "px"; }
    if (kind === "calc") { // the calculator display really does sums
      const n = o.querySelector(".scr b"); let step = 0, a = 2 + rnd(7), b = 2 + rnd(7);
      const ops = ["+", "x", "-"], op = ops[rnd(3)];
      timer = setInterval(() => {
        step++;
        n.textContent = step % 4 === 1 ? a : step % 4 === 2 ? op : step % 4 === 3 ? b : (op === "+" ? a + b : op === "x" ? a * b : a - b);
        if (step % 4 === 0) { a = 2 + rnd(7); b = 2 + rnd(7); snd("right"); } else snd("tick");
      }, 480);
      n.textContent = a;
    } else if (kind === "pages") { timer = setInterval(() => snd("flip"), 640); snd("flip"); }
    else if (kind === "notes") snd("note", 440 + rnd(5) * 60);
    else if (kind === "coins") snd("clink");
    else if (kind === "flask") snd("fizz");
    else if (kind === "keys") snd("type");
  }
  document.addEventListener("mouseover", e => {
    const card = e.target.closest && e.target.closest(".subject"); if (!card) return;
    if (e.relatedTarget && card.contains(e.relatedTarget)) return;
    document.querySelectorAll(".subject.hv-on").forEach(stop); start(card);
  });
  document.addEventListener("mouseout", e => {
    const card = e.target.closest && e.target.closest(".subject"); if (!card) return;
    if (e.relatedTarget && card.contains(e.relatedTarget)) return;
    stop(card);
  });
  // keyboard users too
  document.addEventListener("focusin", e => { const c = e.target.closest && e.target.closest(".subject"); if (c) start(c); });
  document.addEventListener("focusout", e => { const c = e.target.closest && e.target.closest(".subject"); if (c) stop(c); });
  // the same subject picture, for the lesson title card
  function html(sid) { const spec = FOR[sid]; if (!spec) return ""; const [kind, arg] = spec.split(":"); return SCENES[kind] ? `<div class="hv-fx hv-${kind}-wrap">${SCENES[kind](arg)}</div>` : ""; }
  window.MindHover = { scenes: Object.keys(SCENES), FOR, html };
})();
