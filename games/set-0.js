// Break Time Games: set 0 (the two example games every other set copies the style of)
(function () {
  const B = window.BreakGames; if (!B) return;

  // ---- Bubble Pop: tap the bubbles before they float away ----
  B.add({
    id: "bubble-pop", name: "Bubble Pop", ages: [5, 9], cat: "Tap", color: "#4cc3ff", icon: "O",
    desc: "Pop the floating bubbles. Rainbow ones are worth more!", controls: "Tap or click the bubbles",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), bubbles = [], parts = [];
      let spawn = 0, lives = 5, time = 0;
      const COL = ["#ff6fb5", "#4cc3ff", "#ffd34e", "#6be28f", "#b48cff", "#ff8a2a"];
      g.status("Lives: " + lives);
      g.on(c, "pointerdown", e => {
        const p = pos(e);
        for (let i = bubbles.length - 1; i >= 0; i--) {
          const b = bubbles[i];
          if (Math.hypot(b.x - p.x, b.y - p.y) < b.r + 6) {
            bubbles.splice(i, 1); g.sfx("pop"); g.add(b.rainbow ? 5 : 1); g.pop(b.rainbow ? "+5" : "+1", p.x * c.clientWidth / W, p.y * c.clientHeight / H);
            for (let k = 0; k < 10; k++) parts.push({ x: b.x, y: b.y, vx: g.rf(-120, 120), vy: g.rf(-120, 120), life: .5, col: b.col });
            return;
          }
        }
      });
      g.loop((dt, t) => {
        time = t; spawn -= dt;
        if (spawn <= 0) { spawn = g.by(.9, .6, .38) * g.rf(.7, 1.3); const r = g.rf(22, 44); bubbles.push({ x: g.rf(r, W - r), y: H + r, r, vy: g.rf(40, 70) * g.by(.8, 1.1, 1.5), col: g.pick(COL), rainbow: Math.random() < .12, ph: g.rf(0, 6) }); }
        x.clearRect(0, 0, W, H);
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#1c2a7a"); gr.addColorStop(1, "#4cc3ff"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        for (let i = bubbles.length - 1; i >= 0; i--) {
          const b = bubbles[i]; b.y -= b.vy * dt; b.x += Math.sin(time * 2 + b.ph) * 18 * dt;
          if (b.y < -b.r) { bubbles.splice(i, 1); lives--; g.status("Lives: " + lives); g.sfx("wrong"); if (lives <= 0) { g.over("The bubbles got away!"); return false; } continue; }
          x.beginPath(); x.arc(b.x, b.y, b.r, 0, 7);
          if (b.rainbow) { const rg = x.createLinearGradient(b.x - b.r, b.y, b.x + b.r, b.y); ["#f66", "#fd4", "#6e8", "#4cf", "#b8f"].forEach((cc, k) => rg.addColorStop(k / 4, cc)); x.fillStyle = rg; } else x.fillStyle = b.col + "aa";
          x.fill(); x.lineWidth = 3; x.strokeStyle = "#fff"; x.stroke();
          x.beginPath(); x.arc(b.x - b.r * .35, b.y - b.r * .35, b.r * .22, 0, 7); x.fillStyle = "rgba(255,255,255,.7)"; x.fill();
        }
        for (let i = parts.length - 1; i >= 0; i--) { const p = parts[i]; p.life -= dt; if (p.life <= 0) { parts.splice(i, 1); continue; } p.x += p.vx * dt; p.y += p.vy * dt; x.globalAlpha = p.life * 2; x.fillStyle = p.col; x.fillRect(p.x, p.y, 5, 5); x.globalAlpha = 1; }
      });
    }
  });

  // ---- Snake: eat, grow, don't crash ----
  B.add({
    id: "snake", name: "Snake", ages: [8, 20], cat: "Arcade", color: "#6be28f", icon: "S",
    desc: "Eat the apples, grow longer and never bite yourself.", controls: "Arrow keys or WASD, or swipe on the board",
    start(g) {
      const N = 20, { c, x, W, H } = g.canvas(600, 600), cell = W / N;
      let snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }], dir = { x: 1, y: 0 }, next = dir, apple = null, acc = 0, sx = 0, sy = 0;
      const speed = g.by(.16, .11, .075);
      const place = () => { do { apple = { x: g.ri(0, N - 1), y: g.ri(0, N - 1) }; } while (snake.some(s => s.x === apple.x && s.y === apple.y)); };
      place();
      const turn = (dx, dy) => { if (dx === -dir.x && dy === -dir.y) return; next = { x: dx, y: dy }; };
      g.on(window, "keydown", e => { const m = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1], a: [-1, 0], d: [1, 0], w: [0, -1], s: [0, 1] }[e.key]; if (m) turn(m[0], m[1]); });
      g.on(c, "pointerdown", e => { sx = e.clientX; sy = e.clientY; });
      g.on(c, "pointerup", e => { const dx = e.clientX - sx, dy = e.clientY - sy; if (Math.hypot(dx, dy) < 20) return; if (Math.abs(dx) > Math.abs(dy)) turn(dx > 0 ? 1 : -1, 0); else turn(0, dy > 0 ? 1 : -1); });
      g.loop(dt => {
        acc += dt;
        if (acc >= speed) {
          acc = 0; dir = next; const h = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
          if (h.x < 0 || h.y < 0 || h.x >= N || h.y >= N || snake.some(s => s.x === h.x && s.y === h.y)) { g.over("Crunch!"); return false; }
          snake.unshift(h);
          if (h.x === apple.x && h.y === apple.y) { g.add(1); g.sfx("pop"); place(); } else snake.pop();
        }
        x.fillStyle = "#12305a"; x.fillRect(0, 0, W, H);
        for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) if ((i + j) % 2) { x.fillStyle = "rgba(255,255,255,.04)"; x.fillRect(i * cell, j * cell, cell, cell); }
        x.fillStyle = "#ff4d6d"; x.beginPath(); x.arc((apple.x + .5) * cell, (apple.y + .5) * cell, cell * .38, 0, 7); x.fill();
        snake.forEach((s, i) => { x.fillStyle = i === 0 ? "#b6ffcb" : `hsl(${140 - i * 2},65%,${52 - Math.min(i, 20)}%)`; x.beginPath(); x.roundRect(s.x * cell + 2, s.y * cell + 2, cell - 4, cell - 4, 7); x.fill(); });
      });
    }
  });
})();
