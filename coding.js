// Mind Lab Coding (unplugged: no typing code). Levels 1-3, 20 lessons each.
// Needs math.js loaded first (uses ri, pick, shuf).
const CODING_LEVELS = (() => {
  // ---------- tiny helpers ----------
  const S = (h, v, t) => ({ h, v, t });
  const L = (title, make, slides) => { make.teach = () => slides; return { title, make }; };
  const mix = (...ms) => () => pick(ms)();
  const MIXS = topics => [
    S("Review time!", "🔄", "This lesson mixes ideas you already know. Take your time and think about each one."),
    S("Remember", "🧠", topics),
    S("Tip", "💡", "Use your finger to follow steps and arrows. Go slowly, one step at a time.")
  ];
  const sameP = (a, b) => a[0] === b[0] && a[1] === b[1];

  // ---------- robot grid ----------
  const DIRS = { right: [0, 1], left: [0, -1], up: [-1, 0], down: [1, 0] };
  const AR = { right: "➡️", left: "⬅️", up: "⬆️", down: "⬇️" };
  const OPP = { right: "left", left: "right", up: "down", down: "up" };
  const DN = ["up", "down", "left", "right"];
  const arrows = c => c.map(d => AR[d]).join(" ");
  const words = c => c.join(", ");
  const inb = (n, p) => p[0] >= 0 && p[1] >= 0 && p[0] < n && p[1] < n;
  const mv = (p, d) => [p[0] + DIRS[d][0], p[1] + DIRS[d][1]];
  const run = (p, cmds) => cmds.reduce((a, d) => mv(a, d), p);
  const rnd = n => [ri(0, n - 1), ri(0, n - 1)];
  function randPath(n, k) {
    for (let t = 0; t < 500; t++) {
      const s = rnd(n); let p = s; const cmds = []; let ok = true;
      for (let i = 0; i < k; i++) {
        const opts = DN.filter(d => inb(n, mv(p, d)) && (!cmds.length || d !== OPP[cmds[cmds.length - 1]]));
        if (!opts.length) { ok = false; break; }
        const d = pick(opts); cmds.push(d); p = mv(p, d);
      }
      if (ok && !sameP(s, p)) return { s, cmds, e: p };
    }
    return { s: [0, 0], cmds: ["right"], e: [0, 1] };
  }
  const G = (n, f) => `<div style="line-height:1.3;font-size:1.6em">` + Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => f(r, c)).join("")).join("<br>") + `</div>`;
  const robotGrid = (n, s, g, walls) => G(n, (r, c) => sameP([r, c], s) ? "🤖" : g && sameP([r, c], g) ? "⭐" : walls && walls.some(w => sameP(w, [r, c])) ? "🧱" : "⬜");
  const code = lines => `<div style="text-align:left;display:inline-block;font-family:monospace;background:#eef2ff;color:#1a2a55;padding:8px 14px;border-radius:10px;line-height:1.5">${lines.join("<br>")}</div>`;
  const sp = "&nbsp;&nbsp;";

  const reachYN = (n, kr) => () => {
    for (;;) {
      const p = randPath(n, ri(kr[0], kr[1]));
      const hit = Math.random() < 0.5;
      let g = p.e;
      if (!hit) { g = rnd(n); if (sameP(g, p.e) || sameP(g, p.s)) continue; }
      return {
        text: `The robot follows these commands: ${arrows(p.cmds)} (${words(p.cmds)}). Does it land on the star?`,
        visual: robotGrid(n, p.s, g), choices: ["yes", "no"], answer: hit ? "yes" : "no",
        hints: ["Put your finger on the 🤖. Move it one square for each arrow.", "Arrows: ⬆️ up, ⬇️ down, ⬅️ left, ➡️ right. After the last arrow, look: is your finger on the ⭐?", "Example: a 🤖 with the commands ➡️ ➡️ moves two squares to the right. Now do yours."]
      };
    }
  };

  const FR = [["🍎", "apple"], ["🍌", "banana"], ["🍇", "grapes"], ["🍓", "strawberry"], ["🍊", "orange"], ["🍉", "watermelon"], ["🍒", "cherries"], ["🍑", "peach"], ["🍍", "pineapple"]];
  const endFruit = (n, kr) => () => {
    const f = shuf(FR), lab = x => `${x[0]} ${x[1]}`;
    const p = randPath(3, ri(kr[0], kr[1]));
    const at = q => f[q[0] * 3 + q[1]];
    const ans = lab(at(p.e));
    const others = shuf(f.filter(x => lab(x) !== ans)).slice(0, 2).map(lab);
    return {
      text: `The robot starts on the <b>${lab(at(p.s))}</b>. It follows: ${arrows(p.cmds)} (${words(p.cmds)}). Which fruit is it on at the end?`,
      visual: G(3, (r, c) => f[r * 3 + c][0]), choices: shuf([ans, ...others]), answer: ans,
      hints: ["Find the starting fruit in the grid. Put your finger on it.", "Move your finger one square for each arrow: ⬆️ up, ⬇️ down, ⬅️ left, ➡️ right. The fruit under your finger at the end is your answer.", "Example: if you start on a 🍌 and the command is ⬇️, you move to the fruit right below the 🍌. Now do yours."]
    };
  };

  const pathChoice = (n, kr) => () => {
    const p = randPath(n, ri(kr[0], kr[1]));
    const wr = [];
    for (let t = 0; t < 400 && wr.length < 2; t++) {
      const c = Array.from({ length: p.cmds.length }, () => pick(DN));
      if (sameP(run(p.s, c), p.e)) continue;
      if (c.join() === p.cmds.join() || wr.some(x => x.join() === c.join())) continue;
      wr.push(c);
    }
    return {
      text: "Which commands take the 🤖 to the ⭐?", visual: robotGrid(n, p.s, p.e),
      choices: shuf([words(p.cmds), ...wr.map(words)]), answer: words(p.cmds),
      hints: ["Find the 🤖 and the ⭐. How many squares apart are they?", "Count how many squares you need to go across and how many up or down. Then test each answer with your finger.", "Example: if the ⭐ is two squares to the right of the 🤖, then \"right, right\" works. Now do yours."]
    };
  };

  const fewest = n => () => {
    for (;;) {
      const s = rnd(n), g = rnd(n);
      if (sameP(s, g)) continue;
      return {
        text: "The robot can only move up, down, left or right. What is the fewest moves to reach the star?", visual: robotGrid(n, s, g),
        answer: Math.abs(s[0] - g[0]) + Math.abs(s[1] - g[1]),
        hints: ["Count the squares between the 🤖 and the ⭐, one direction at a time.", "Robots do not go diagonally. Count the squares across, then the squares up or down, then add them together.", "Example: if the ⭐ is 2 squares right and 1 square down, that is 2 + 1 = 3 moves. Now count yours."]
      };
    }
  };

  const wallBump = n => () => {
    for (let t = 0; t < 300; t++) {
      const s = rnd(n); const walls = [];
      while (walls.length < 3) { const w = rnd(n); if (!sameP(w, s) && !walls.some(x => sameP(x, w))) walls.push(w); }
      const p = randPath(n, 3);
      // walk the path from a start, wall check
      let pos = p.s, bump = false;
      for (const d of p.cmds) { pos = mv(pos, d); if (walls.some(w => sameP(w, pos))) bump = true; }
      if (walls.some(w => sameP(w, p.s))) continue;
      if (bump !== (Math.random() < 0.5)) continue;
      return {
        text: `The robot follows: ${arrows(p.cmds)} (${words(p.cmds)}). Does it bump into a wall 🧱?`, visual: robotGrid(n, p.s, null, walls),
        choices: ["yes", "no"], answer: bump ? "yes" : "no",
        hints: ["Put your finger on the 🤖 and follow the arrows one at a time.", "After each arrow, look at the square you are on. Is it a 🧱? If it is, the robot bumps.", "Example: a 🤖 with the command ➡️ bumps if the square on its right is a 🧱. Now do yours."]
      };
    }
  };

  const debugRobot = (n, k) => () => {
    for (let t = 0; t < 500; t++) {
      const p = randPath(n, k);
      const wi = ri(0, k - 1);
      const wd = pick(DN.filter(d => d !== p.cmds[wi]));
      const bad = p.cmds.slice(); bad[wi] = wd;
      let pos = p.s, inside = true;
      for (const d of bad) { pos = mv(pos, d); if (!inb(n, pos)) inside = false; }
      if (!inside) continue;
      const fixes = new Set();
      for (let j = 0; j < k; j++) for (const d of DN) if (d !== bad[j]) { const c = bad.slice(); c[j] = d; if (sameP(run(p.s, c), p.e)) fixes.add(j); }
      if (fixes.size !== 1 || !fixes.has(wi)) continue;
      const list = bad.map((d, i) => `${i + 1}: ${AR[d]}`).join(" &nbsp; ");
      return {
        text: `The robot must reach the star ⭐, but its commands have a bug. Which step is wrong?`,
        visual: robotGrid(n, p.s, p.e) + `<div>${list}</div>`,
        choices: bad.map((_, i) => `step ${i + 1}`), answer: `step ${wi + 1}`,
        hints: ["Follow the commands with your finger. Where does the robot stop?", "Compare where it stops with the ⭐. Which one step, if you changed it, would fix the trip?", "Example: the ⭐ is on the right, but one command points up. The command that goes the wrong way is the bug. Now do yours."]
      };
    }
  };

  const arrowMeaning = () => {
    const x = pick(DN);
    return {
      text: pick(["Which way does this arrow tell the robot to go?", "The robot gets this command. Which way does it move?"]), visual: `<span style="font-size:2em">${AR[x]}</span>`,
      choices: shuf([x, ...shuf(DN.filter(d => d !== x)).slice(0, 2)]), answer: x,
      hints: ["Look at which way the arrow points.", "An arrow pointing to the sky means up. Pointing to the floor means down. The others point to the sides.", "Example: ➡️ points to the right side, so it means right. Now do yours."]
    };
  };

  // ---------- routines (sequences) ----------
  const RT = [
    { n: "wash your hands", e: "🧼", s: ["turn on the water", "wet your hands", "rub on soap", "rinse off the soap", "dry your hands"] },
    { n: "brush your teeth", e: "🪥", s: ["pick up your toothbrush", "put toothpaste on it", "brush your teeth", "rinse your mouth"] },
    { n: "make a sandwich", e: "🥪", s: ["get two slices of bread", "spread on the filling", "put the slices together", "cut it in half", "eat it"] },
    { n: "plant a seed", e: "🌱", s: ["dig a small hole", "put the seed in", "cover it with soil", "water it", "watch it grow"] },
    { n: "go to bed", e: "🛏️", s: ["get in bed", "turn off the light", "close your eyes", "fall asleep"] },
    { n: "put on your shoes", e: "👟", s: ["put on your socks", "slide your shoes on", "tie the laces", "stand up and walk"] },
    { n: "eat cereal", e: "🥣", s: ["get a bowl", "pour in the cereal", "pour in the milk", "eat with a spoon"] },
    { n: "bake cookies", e: "🍪", s: ["mix the dough", "put the dough on a tray", "bake it in the oven", "let the cookies cool", "eat a cookie"] },
    { n: "draw a picture", e: "🎨", s: ["get a paper", "draw with a pencil", "color it in", "hang it up"] },
    { n: "ride a bike", e: "🚲", s: ["put on your helmet", "get on the bike", "push the pedals", "stop and get off"] }
  ];
  const otherSteps = (r, cnt) => shuf(RT.filter(x => x !== r).flatMap(x => x.s)).slice(0, cnt);
  const routineFirst = () => {
    const r = pick(RT);
    return {
      text: `When you ${r.n}, which step comes <b>first</b>?`, visual: r.e, choices: shuf([r.s[0], ...shuf(r.s.slice(1)).slice(0, 2)]), answer: r.s[0],
      hints: ["Think: what must you do before anything else?", "The first step is done before all the others. Which choice could not happen after the other steps?", "Example: to put on a hat, the first step is to pick up the hat. Then you put it on. Now do yours."]
    };
  };
  const routineLast = () => {
    const r = pick(RT), last = r.s[r.s.length - 1];
    return {
      text: `When you ${r.n}, which step comes <b>last</b>?`, visual: r.e, choices: shuf([last, ...shuf(r.s.slice(0, -1)).slice(0, 2)]), answer: last,
      hints: ["Think: what is the very last thing you do?", "The last step is when you are all done. Which choice would be the end of the job?", "Example: to put on a hat, the last step is to adjust it on your head. Now do yours."]
    };
  };
  const routineAfter = () => {
    const r = pick(RT), i = ri(0, r.s.length - 2);
    return {
      text: `You are making steps to ${r.n}. After you <b>${r.s[i]}</b>, what comes next?`, visual: r.e, choices: shuf([r.s[i + 1], ...otherSteps(r, 2)]), answer: r.s[i + 1],
      hints: ["Think about the job. What step would make sense right after?", "One choice is about a different job. Another does not fit here. Pick the step that goes with this job.", "Example: after you pick up your cup, the next step is to pour in a drink. Now do yours."]
    };
  };
  const routineOrder = cnt => () => {
    const r = pick(RT), st = cnt ? r.s.slice(0, cnt) : r.s, ans = st.join(" → ");
    const wr = [];
    for (let t = 0; t < 200 && wr.length < 2; t++) { const c = shuf(st).join(" → "); if (c !== ans && !wr.includes(c)) wr.push(c); }
    return {
      text: `Which list shows the steps in the right order to ${r.n}?`, visual: r.e, choices: shuf([ans, ...wr]), answer: ans,
      hints: ["Think about what you do first, next, and last.", "Find the step that must come first. Cross out any list that starts with a different step. Then check the next step.", "Example: to brush your hair: pick up the brush → brush your hair → put the brush away. Now do yours."]
    };
  };
  const routineMissing = () => {
    const r = pick(RT.filter(x => x.s.length >= 4)), j = ri(1, r.s.length - 2);
    const list = r.s.map((x, i) => `${i + 1}. ${i === j ? "<b>?</b>" : x}`).join("<br>");
    return {
      text: `Something is missing when you ${r.n}. Which step goes in the blank?`, visual: `<div style="text-align:left;display:inline-block">${list}</div>`,
      choices: shuf([r.s[j], ...otherSteps(r, 2)]), answer: r.s[j],
      hints: ["Read the steps from the top. Where does the story have a hole?", "Which step makes sense between the step before the blank and the step after it?", "Example: pick up the cup, ___, drink it. The missing step is \"pour in the juice\". Now do yours."]
    };
  };

  const DB1 = [
    ["wash your hands", ["turn on the water", "rub on soap", "kick a ball", "dry your hands"], 2],
    ["make a sandwich", ["get two slices of bread", "put on your socks", "spread on the filling", "put the slices together"], 1],
    ["plant a seed", ["dig a small hole", "put the seed in", "water it", "watch a movie"], 3],
    ["go to bed", ["build a tower of blocks", "get in bed", "turn off the light", "close your eyes"], 0],
    ["brush your teeth", ["pick up your toothbrush", "put toothpaste on it", "feed the fish", "brush your teeth"], 2],
    ["eat cereal", ["get a bowl", "pour in the cereal", "pour in the milk", "paint the fence", "eat with a spoon"], 3],
    ["ride a bike", ["put on your helmet", "bake a cake", "get on the bike", "push the pedals"], 1],
    ["draw a picture", ["get a paper", "draw with a pencil", "sing to a tree", "color it in"], 2],
    ["put on your shoes", ["put on your socks", "slide your shoes on", "tie the laces", "wash the car"], 3]
  ];
  const wrongStep = () => {
    const [g, st, bi] = pick(DB1);
    return {
      text: `You want to ${g}. Which step does <b>not</b> belong?`, visual: `<div style="text-align:left;display:inline-block">${st.map((x, i) => `${i + 1}. ${x}`).join("<br>")}</div>`,
      choices: shuf(st), answer: st[bi],
      hints: ["Read every step. Does each one help with the job?", "One step is about something totally different. Which step would not help you do the job?", "Example: to wash a cup: fill the sink, scrub the cup, jump on the bed, dry the cup. Jumping on the bed does not belong. Now do yours."]
    };
  };

  // ---------- fact banks ----------
  const facts = (items, nudge, example) => () => {
    const [q, r, w, c, v] = pick(items);
    return { text: q, visual: v, choices: shuf([r, ...w]), answer: r, hints: [nudge, c, example] };
  };
  const yn = (items, nudge, example) => () => {
    const [q, a, c, v] = pick(items);
    return { text: q, visual: v, choices: ["yes", "no"], answer: a, hints: [nudge, c, example] };
  };
  const ALGO = facts([
    ["What is an algorithm?", "a list of steps", ["a kind of toy", "a loud noise"], "Think of a recipe: it tells you what to do, one step at a time."],
    ["Which one is an algorithm?", "a recipe for pancakes", ["a blue balloon", "a sleeping cat"], "An algorithm tells you what to do, step by step."],
    ["Do the steps of an algorithm go in order?", "yes", ["no"], "Try making a sandwich with the steps all mixed up!"],
    ["What can happen if you mix up the steps?", "the result may go wrong", ["nothing ever changes", "it gets much faster"], "Imagine putting on your shoes before your socks."],
    ["Who writes the steps a robot follows?", "a person", ["the moon", "a banana"], "Robots do not make up the steps by themselves."],
    ["Which word means steps that go in order?", "sequence", ["puddle", "balloon"], "It starts with the letter s and means first, next, last."],
    ["A recipe for a cake is a kind of ___", "algorithm", ["animal", "weather"], "A recipe is a list of steps to follow."],
    ["Are the steps for brushing teeth an algorithm?", "yes", ["no"], "Is it a list of steps that go in order?"],
    ["Which is an algorithm for getting dressed?", "socks, then shoes", ["shoes, then socks", "hat, then fish"], "Think about what makes sense in real life."]
  ], "Think about a list of steps that you follow in order.", "Example: the steps to wash a cup (fill the sink, scrub, rinse) are an algorithm. Now do yours.");
  const CANDO = yn([
    ["Can a computer play music?", "yes", "Computers can play sounds that people saved on them."],
    ["Can a computer show a movie?", "yes", "Many people watch movies on a screen."],
    ["Can a computer play a game?", "yes", "People play games on computers, tablets and phones."],
    ["Can a computer eat a sandwich?", "no", "A computer is a machine. Does a machine get hungry?"],
    ["Can a computer feel sleepy?", "no", "Feeling sleepy is something only living things do."],
    ["Can a computer give you a real hug?", "no", "A computer does not have arms to hug with."],
    ["Does a computer need power (a plug or a battery)?", "yes", "What would happen if you never charged a tablet?"],
    ["Can a computer follow steps?", "yes", "That is what programs are for."],
    ["Can a computer grow like a plant?", "no", "Plants are alive. Computers are machines."],
    ["Can a computer read a story out loud?", "yes", "Some computers can turn words into speech."],
    ["Can a computer get thirsty?", "no", "Only living things need drinks."]
  ], "Is a computer alive, or is it a machine?", "Example: a computer can add numbers (yes), but it cannot smell flowers (no). Now do yours.");
  const ISCOMP = () => {
    const [e, n, a, c] = pick([
      ["📱", "phone", "yes", "It has a tiny computer inside that follows programs."], ["📱", "tablet", "yes", "You touch its screen to run programs."], ["💻", "laptop", "yes", "You type on it and run programs."],
      ["🖥️", "desktop computer", "yes", "It is built to run programs."], ["🎮", "game console", "yes", "A computer inside runs the games."], ["⌚", "smartwatch", "yes", "It has a tiny computer and a tiny screen."],
      ["🥄", "spoon", "no", "It cannot follow any steps or show anything."], ["🍌", "banana", "no", "It is a fruit, not a machine."], ["🚲", "bicycle", "no", "You pedal it yourself. It has no program."],
      ["✏️", "pencil", "no", "It is a tool for writing, with no program inside."], ["🧸", "teddy bear", "no", "It is soft and has no screen or program."], ["⚽", "soccer ball", "no", "It is just a ball you kick."]
    ]);
    return {
      text: `Is a ${n} a computer?`, visual: e, choices: ["yes", "no"], answer: a,
      hints: ["A computer is a machine that follows a program and can show or tell you things.", c, "Example: a calculator is a computer because it follows steps to do math. A rock is not. Now do yours."]
    };
  };
  const CLEAR = facts([
    ["Which instruction is clearer for a robot?", "Take 3 steps forward", ["Go over there"], "A robot needs to know exactly how far and which way."],
    ["Which instruction is clearer for a robot?", "Pick up the red block", ["Pick up the thing"], "Which one says exactly which thing?"],
    ["Which instruction is clearer for a robot?", "Turn left, then take 2 steps", ["Go that way"], "Look for the one with a direction and a number."],
    ["Which instruction is clearer?", "Put 2 spoons of sugar in the bowl", ["Put some stuff in"], "Which one tells you what and how many?"],
    ["Which instruction is clearer?", "Clap 4 times", ["Clap a bunch"], "A number is clearer than \"a bunch\"."],
    ["Which instruction is clearer?", "Open the door, then walk in", ["Do the door thing"], "Which one says exactly what to do?"],
    ["Which instruction is clearer?", "Jump 5 times", ["Jump a lot"], "How many is \"a lot\"? Pick the one with a real number."],
    ["Which instruction is clearer?", "Draw a circle, then color it blue", ["Make it nice"], "Which one tells you exactly what to draw?"]
  ], "A computer cannot guess. Which instruction says exactly what to do?", "Example: \"Hop 2 times\" is clearer than \"Hop a little\". Now do yours.");
  const PROG = facts([
    ["What is a program?", "steps a computer follows", ["a TV show", "a kind of food"], "Think of a recipe, but for a computer."],
    ["Who writes programs?", "a programmer", ["a baker", "a farmer"], "It is a person who tells computers what to do."],
    ["What is a bug in a program?", "a mistake", ["a real insect", "a loud sound"], "A bug makes the program act the wrong way."],
    ["What is debugging?", "finding and fixing mistakes", ["making a snack", "drawing a bug"], "A bug is a mistake. What do you do about it?"],
    ["Does a computer do exactly what the program says?", "yes", ["no"], "Computers follow the steps exactly."],
    ["Can a computer guess what you meant if the steps are wrong?", "no", ["yes"], "Computers only do what they are told."],
    ["A computer needs clear steps because it ___", "cannot guess", ["can read minds", "always knows"], "What does a computer do if the steps are fuzzy?"],
    ["What do we call a list of steps in order?", "a sequence", ["a puddle", "a snack"], "First, next, last."]
  ], "A program is a list of instructions for a computer.", "Example: a recipe tells a cook what to do. A program tells a computer what to do. Now do yours.");
  const DEBUGF = facts([
    ["A robot should clap, but it jumps. Is that a bug?", "yes", ["no"], "The robot is not doing what we wanted."],
    ["What do we do when we find a bug?", "fix it", ["ignore it", "hide it"], "Programmers make the program work right."],
    ["How can you find a bug?", "go through the steps one at a time", ["close your eyes", "skip every step"], "Slow and careful checking works best."],
    ["Your robot walks into a wall. What should you check?", "the commands", ["the weather", "your lunch"], "The commands tell the robot where to go."],
    ["Is it OK to make a mistake when you code?", "yes", ["no"], "Even grown-up programmers make mistakes. They fix them."],
    ["What is the best thing to do with a bug?", "test the steps again after fixing", ["give up", "hope it goes away"], "After a fix, you want to be sure it works."],
    ["A bug is a ___", "mistake in the steps", ["tiny animal in the computer", "game prize"], "In code, a bug is not an animal."],
    ["Which helps find a bug?", "reading each step slowly", ["guessing fast", "skipping steps"], "Careful beats fast."]
  ], "Bugs are mistakes. Think about how to find and fix them.", "Example: if a toy car does not move, you check one thing at a time, like the switch. Now do yours.");
  const CANDO2 = yn([
    ["Is a computer good at following the same steps again and again?", "yes", "Computers never get bored."],
    ["Can a computer add big numbers very fast?", "yes", "This is something computers are great at."],
    ["Does a computer know how you feel without being told?", "no", "Computers do not have feelings or minds."],
    ["Can a computer do what the program says exactly?", "yes", "It follows the steps exactly."],
    ["Does a computer have a favorite color?", "no", "A computer is a machine with no likes or dislikes."],
    ["Can a computer fix its own bugs without any help?", "no", "People find and fix the mistakes."],
    ["Can a computer sort a long list quickly?", "yes", "Sorting is a job computers do well."],
    ["Does a computer get tired after a long day?", "no", "It is a machine, but it can get hot or run out of power."],
    ["Can a computer play a song you choose?", "yes", "It can find sounds that were saved."],
    ["Can a computer smell cookies baking?", "no", "A computer has no nose."]
  ], "Is this a job for a machine that follows steps?", "Example: a computer can store many photos (yes), but it cannot be sad about them (no). Now do yours.");
  const CANDO3 = yn([
    ["Does a computer have feelings?", "no", "Feelings belong to people and animals."],
    ["If a program has a bug, can the computer do something wrong?", "yes", "It follows the steps, even the wrong ones."],
    ["Does a computer understand jokes the way people do?", "no", "It only follows steps."],
    ["Can a program be copied and run on many computers?", "yes", "Programs are saved as files."],
    ["Can a computer run without power?", "no", "It needs a battery or a plug."],
    ["Is a person needed to make a program?", "yes", "People write the steps."],
    ["Can a computer follow a very long list of steps?", "yes", "Long lists are no problem."],
    ["Does a computer ever get bored of a long job?", "no", "It just keeps following steps."],
    ["Does a computer learn on its own from nothing?", "no", "It needs a program that people made."],
    ["Can a computer tell the same thing to a thousand people?", "yes", "Computers can repeat things without getting tired."]
  ], "Think: is this something a machine that follows steps can do?", "Example: a computer can add numbers (yes), but it does not feel proud of itself (no). Now do yours.");
  const IO = () => {
    const [e, n, a, c] = pick([
      ["🖱️", "mouse", "input", "You use it to tell the computer where to go."], ["⌨️", "keyboard", "input", "You press its keys to send letters in."],
      ["🎤", "microphone", "input", "It sends your voice into the computer."], ["📷", "camera", "input", "It sends pictures into the computer."],
      ["🖥️", "screen", "output", "It shows you what the computer made."], ["🔊", "speaker", "output", "It plays sounds out to you."],
      ["🎧", "headphones", "output", "They play sound out for your ears."], ["🖨️", "printer", "output", "It puts the computer's work onto paper."]
    ]);
    return {
      text: `Is the ${n} an input or an output?`, visual: e, choices: ["input", "output"], answer: a,
      hints: ["Input means you send something IN to the computer. Output means the computer sends something OUT to you.", c, "Example: a game controller sends your button presses in, so it is an input. Now do yours."]
    };
  };
  const IO3 = facts([
    ["You tap letters on a keyboard. What is the keyboard doing?", "giving input", ["giving output", "making a snack"], "The keys send information into the computer."],
    ["A screen shows a picture. What is it doing?", "showing output", ["giving input", "writing a program"], "The computer shows you its work."],
    ["Which is the right order?", "input, then process, then output", ["output, then input, then process", "process, then output, then input"], "First something goes in, then the computer works, then results come out."],
    ["You say \"hello\" to a computer. Your voice is ___", "input", ["output", "a bug"], "You are sending something in."],
    ["A speaker plays a song. The song is ___", "output", ["input", "a bug"], "The sound comes out of the computer."],
    ["What does the computer do in the middle?", "it processes (works on) the input", ["it sleeps", "it eats"], "Between input and output, something happens."],
    ["A calculator gets 2 + 3. The numbers you type are ___", "input", ["output", "a bug"], "You typed them in."],
    ["A calculator shows 5. The 5 is ___", "output", ["input", "a bug"], "It is the answer that comes out."]
  ], "Think: does it go IN to the computer, get worked on, or come OUT?", "Example: you click a mouse (input), the computer thinks (process), the screen changes (output). Now do yours.");

  // ---------- if / then ----------
  const IFS = [
    ["it is raining", "it is not raining", "take an umbrella", "put on sunglasses"],
    ["the light is red", "the light is green", "stop", "go"],
    ["you are hungry", "you are full", "eat a snack", "keep playing"],
    ["it is night", "it is daytime", "turn on the lamp", "open the curtains"],
    ["it is cold outside", "it is hot outside", "put on a coat", "put on shorts"],
    ["the door is locked", "the door is open", "use the key", "walk right in"],
    ["the cup is empty", "the cup is full", "fill it up", "take a sip"],
    ["the baby is sleeping", "the baby is awake", "whisper", "say hello"]
  ];
  const ifThen = () => {
    const [c, nc, a] = pick(IFS), yes = Math.random() < 0.5;
    const act = a.replace(/^(\w+)/, "$1");
    return {
      text: `IF <b>${c}</b> THEN <b>${a}</b>.<br>Right now, ${yes ? c : nc}. Do you ${a}?`, choices: ["yes", "no"], answer: yes ? "yes" : "no",
      hints: ["Read the IF part. Is it true right now?", "If the IF part is true, you do the THEN part. If it is not true, you do not do it.", "Example: IF it is sunny THEN wear a hat. It is cloudy. Then you do not need to wear the hat. Now do yours."]
    };
  };
  const ifElse = () => {
    const [c, nc, a, b] = pick(IFS), yes = Math.random() < 0.5, right = yes ? a : b;
    const extra = shuf(IFS.filter(x => x[2] !== a).flatMap(x => [x[2], x[3]]).filter(x => x !== a && x !== b))[0];
    return {
      text: `IF <b>${c}</b> THEN <b>${a}</b><br>ELSE <b>${b}</b>.<br>Right now, ${yes ? c : nc}. What do you do?`, choices: shuf([a, b, extra]), answer: right,
      hints: ["Is the IF part true right now?", "If it is true, do the THEN part. If it is not true, do the ELSE part.", "Example: IF it is sunny THEN wear a hat ELSE take a coat. It is cloudy. The hat is for sunny days, so you take the ELSE part: the coat. Now do yours."]
    };
  };
  const numIf = () => {
    const t = ri(0, 2);
    if (t === 0) {
      const k = ri(3, 8); let n = ri(1, 10); if (n === k) n++;
      return { text: `The number is <b>${n}</b>. What do you say?`, visual: code([`IF number is more than ${k}`, `${sp}THEN say "big"`, `ELSE say "small"`]), choices: ["big", "small"], answer: n > k ? "big" : "small",
        hints: ["Check the IF part first. Is it true for your number?", `Is the number more than ${k}? If yes, do the THEN part. If no, do the ELSE part.`, "Example: IF number is even THEN say \"even\" ELSE say \"odd\". For the number 4, it is true, so say \"even\". Now do yours."] };
    }
    if (t === 1) {
      const n = ri(1, 12);
      return { text: `The number is <b>${n}</b>. What do you say?`, visual: code([`IF number is even`, `${sp}THEN say "even"`, `ELSE say "odd"`]), choices: ["even", "odd"], answer: n % 2 === 0 ? "even" : "odd",
        hints: ["Check the IF part first. Is it true for your number?", "Even numbers can be shared into two equal groups. Even numbers end in 0, 2, 4, 6 or 8.", "Example: IF number is more than 5 THEN say \"big\" ELSE say \"small\". For 9, it is true, so say \"big\". Now do yours."] };
    }
    const k = ri(3, 8); let n = ri(1, 10); if (n === k) n--;
    return { text: `The number is <b>${n}</b>. What do you say?`, visual: code([`IF number is less than ${k}`, `${sp}THEN say "low"`, `ELSE say "high"`]), choices: ["low", "high"], answer: n < k ? "low" : "high",
      hints: ["Check the IF part first. Is it true for your number?", `Is the number less than ${k}? If yes, do the THEN part. If no, do the ELSE part.`, "Example: IF number is more than 5 THEN say \"big\" ELSE say \"small\". For 9, it is true, so say \"big\". Now do yours."] };
  };

  // ---------- classify / sort ----------
  const CAT = {
    animals: ["🐶 dog", "🐱 cat", "🐴 horse", "🐦 bird", "🐟 fish", "🐮 cow"],
    fruits: ["🍎 apple", "🍌 banana", "🍇 grapes", "🍓 strawberry", "🍊 orange", "🍉 watermelon"],
    vehicles: ["🚗 car", "🚌 bus", "🚲 bike", "✈️ airplane", "🚂 train", "⛵ boat"],
    clothes: ["👕 shirt", "👟 shoe", "🧦 sock", "🧥 coat", "🎩 hat", "👖 pants"],
    "school things": ["✏️ pencil", "📖 book", "🎒 backpack", "✂️ scissors", "📏 ruler", "🖍️ crayon"]
  };
  const classify = keys => () => {
    const k = pick(keys), it = pick(CAT[k]);
    const ch = [k, ...shuf(keys.filter(x => x !== k)).slice(0, 2)];
    return {
      text: `Which group does <b>${it}</b> go in?`, visual: it.split(" ")[0], choices: shuf(ch), answer: k,
      hints: ["Say what the thing is. What kind of thing is it?", "Think: is it something you eat, wear, ride, use at school, or an animal? Pick the group that fits.", "Example: a 🛴 scooter goes with the vehicles, because you ride it. Now do yours."]
    };
  };
  const MOVE = {
    flies: ["🐦 bird", "🦋 butterfly", "🐝 bee", "🦉 owl", "🦅 eagle"],
    swims: ["🐟 fish", "🐬 dolphin", "🐙 octopus", "🐳 whale", "🐠 tropical fish"],
    walks: ["🐶 dog", "🐱 cat", "🐴 horse", "🐘 elephant", "🐮 cow"]
  };
  const sortMove = () => {
    const k = pick(Object.keys(MOVE)), it = pick(MOVE[k]);
    return {
      text: `Sort the animals by how they move. How does the <b>${it}</b> move?`, visual: it.split(" ")[0], choices: shuf(Object.keys(MOVE)), answer: k,
      hints: ["Picture the animal. How does it get around?", "Birds and insects with wings fly, sea animals swim, and animals with legs on land walk.", "Example: a 🐸 frog hops, but a 🐕 dog walks. Think about how yours moves. Now do yours."]
    };
  };
  const sortNums = cnt => () => {
    const nums = shuf([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, cnt), up = Math.random() < 0.5;
    const ans = nums.slice().sort((a, b) => up ? a - b : b - a).join(", ");
    const wr = [];
    for (let t = 0; t < 200 && wr.length < 2; t++) { const c = shuf(nums).join(", "); if (c !== ans && !wr.includes(c)) wr.push(c); }
    return {
      text: `Sort these numbers from ${up ? "smallest to biggest" : "biggest to smallest"}. Which list is right?`, visual: `<span style="font-size:1.6em">${nums.join(" &nbsp; ")}</span>`, choices: shuf([ans, ...wr]), answer: ans,
      hints: [up ? "Find the smallest number first." : "Find the biggest number first.", up ? "Pick the smallest, then the next smallest, and so on." : "Pick the biggest, then the next biggest, and so on.", "Example: to sort 7, 2, 5 from smallest to biggest: 2 is smallest, then 5, then 7. Now do yours."]
    };
  };

  // ---------- loops ----------
  const ACT = [["clap", "👏"], ["jump", "🦘"], ["stomp", "🦶"], ["wave", "👋"], ["spin", "🌀"], ["hop", "🐸"], ["nod", "🙂"], ["tap", "👆"]];
  const loopCount = (lo, hi) => () => {
    const [a, e] = pick(ACT), n = ri(lo, hi), ex = pick([2, 3, 4, 5].filter(x => x !== n));
    return {
      text: `How many times will we ${a}?`, visual: code([`repeat ${n} times`, `${sp}${e} ${a}`]), answer: n,
      hints: ["Find the number after the word repeat.", "That number tells you how many times to do what is inside the loop.", `Example: "repeat ${ex} times: ${e}" means ${e.repeat(ex)}, so ${ex} times. Now do yours.`]
    };
  };
  const loopMatch = (lo, hi) => () => {
    const [a, e] = pick(ACT), n = ri(lo, hi);
    const others = shuf([1, 2, 3, 4, 5, 6].filter(x => x !== n && Math.abs(x - n) <= 2)).slice(0, 2);
    return {
      text: "Which loop makes this?", visual: `<span style="font-size:1.6em">${e.repeat(n)}</span>`,
      choices: shuf([n, ...others].map(x => `repeat ${x} times: ${a}`)), answer: `repeat ${n} times: ${a}`,
      hints: ["Count the pictures first.", "The number after the word repeat must be the same as the number of pictures.", "Example: ⭐⭐ is made by \"repeat 2 times: star\". Now do yours."]
    };
  };
  const loopMove = cells => () => {
    for (;;) {
      const s = ri(1, cells), n = ri(2, 4), d = pick(["right", "left"]), end = d === "right" ? s + n : s - n;
      if (end < 1 || end > cells) continue;
      let es = ri(1, 2), en = ri(1, 2); if (es === s && en === n) en++;
      const row = Array.from({ length: cells }, (_, i) => `<span style="display:inline-block;width:2em;text-align:center">${i + 1 === s ? "🤖" : "⬜"}<br><small>${i + 1}</small></span>`).join("");
      return {
        text: `The robot is on square ${s}. Repeat ${n} times: ${AR[d]} (${d}). Which square is it on at the end?`, visual: `<div style="font-size:1.4em">${row}</div>`, answer: end,
        hints: ["Moving right makes the square number bigger. Moving left makes it smaller.", "Move your finger one square for each repeat, and count the repeats.", `Example: on square ${es}, repeat ${en} times right: count ${en} squares to the right, which is square ${es + en}. Now do yours.`]
      };
    }
  };
  const loopTotal = (lo, hi, kmax) => () => {
    const k = ri(2, kmax), acts = shuf(ACT).slice(0, k), n = ri(lo, hi), askTimes = Math.random() < 0.5;
    const ans = askTimes ? n : n * k;
    const er = pick([2, 3, 4, 5].filter(x => (askTimes ? x : x * 2) !== ans));
    return {
      text: askTimes ? `How many times will we ${acts[0][0]}?` : "How many actions will we do in all?",
      visual: code([`repeat ${n} times`, ...acts.map(x => `${sp}${x[1]} ${x[0]}`)]), answer: ans,
      hints: ["The loop does everything inside it, then does it all again.", askTimes ? "Look at the number after repeat. Each round has this action one time." : "Count how many actions are inside one round. Then think about how many rounds there are.", `Example: "repeat ${er} times: clap, jump" makes ${er} claps and ${er} jumps. That is ${er * 2} actions in all. Now do yours.`]
    };
  };
  const loopShorter = (lo, hi, pair) => () => {
    const a = pick(ACT); let b = pick(ACT); while (b[0] === a[0]) b = pick(ACT);
    const n = ri(lo, hi), unit = pair ? [a, b] : [a];
    const name = u => u.map(x => x[0]).join(", ");
    const m = n === lo ? n + 1 : n - 1, c = pick(ACT.filter(x => x[0] !== a[0] && x[0] !== b[0]));
    const right = `repeat ${n} times: ${name(unit)}`;
    return {
      text: "Which loop does the same job as this list?", visual: `<span style="font-size:1.4em">${unit.map(x => x[1]).join("").repeat(n)}</span>`,
      choices: shuf([right, `repeat ${m} times: ${name(unit)}`, `repeat ${n} times: ${name([c, ...unit.slice(1)])}`]), answer: right,
      hints: ["Find the part that repeats. How many times does it show up?", "A loop says repeat, then a number, then the part that repeats. Check the number AND the actions.", "Example: 👏 🦘 👏 🦘 can be written as \"repeat 2 times: clap, jump\". Now do yours."]
    };
  };
  const loopFix = (lo, hi) => () => {
    const [a, e] = pick(ACT), n = ri(lo, hi); let m = ri(lo, hi + 1); if (m === n) m = n + 2;
    let ex = ri(2, 4); if (ex === n) ex = 5;
    return {
      text: `This loop was supposed to make the picture, but it has a bug. What number should replace ${m}?`,
      visual: `<div style="font-size:1.5em">${e.repeat(n)}</div>` + code([`repeat ${m} times`, `${sp}${e} ${a}`]), answer: n,
      hints: ["Count the pictures you want to make.", "The number after repeat must be the same as the number of pictures you want.", `Example: to make ${e.repeat(ex)} you need "repeat ${ex} times". Now do yours.`]
    };
  };
  const loopPattern = () => {
    const unit = pick([["A", "B"], ["A", "A", "B"], ["A", "B", "C"], ["B", "A"], ["A", "B", "B"], ["C", "A"]]), t = ri(2, 4);
    const rep = k => Array.from({ length: k }, () => unit.join(" ")).join(" ");
    const right = rep(t);
    const rev = Array.from({ length: t }, () => unit.slice().reverse().join(" ")).join(" ");
    const third = rep(t + 1);
    const ch = [right, rep(t - 1), rev === right ? third : rev].filter((x, i, arr) => arr.indexOf(x) === i);
    if (ch.length < 3) ch.push(rep(t + 1));
    return {
      text: "What does this loop make?", visual: code([`repeat ${t} times`, `${sp}${unit.join(" ")}`]), choices: shuf(ch.slice(0, 3)), answer: right,
      hints: ["Do the part inside the loop one time. Then do it again.", "Write the part under repeat as many times as the number says, one right after the other.", "Example: \"repeat 2 times: X Y\" makes X Y X Y. Now do yours."]
    };
  };

  // ---------- patterns ----------
  const PI = [["🔴", "red"], ["🔵", "blue"], ["🟢", "green"], ["🟡", "yellow"], ["🟣", "purple"], ["🟠", "orange"], ["⭐", "star"], ["🍎", "apple"], ["🍌", "banana"], ["🐶", "dog"], ["🐱", "cat"], ["🌞", "sun"], ["🌙", "moon"], ["⚽", "ball"]];
  const patternNext = units => () => {
    const u = pick(units), set = shuf(PI), m = {};
    [...new Set(u)].forEach((ch, i) => m[ch] = set[i]);
    const len = u.length * 2 + ri(0, u.length - 1);
    const shown = Array.from({ length: len }, (_, i) => m[u[i % u.length]]);
    const nx = m[u[len % u.length]], lab = x => `${x[0]} ${x[1]}`;
    const ch = [lab(nx), ...shuf(set.filter(x => x !== nx)).slice(0, 2).map(lab)];
    return {
      text: "What comes next in the pattern?", visual: `<span style="font-size:1.6em">${shown.map(x => x[0]).join(" ")} &nbsp;?</span>`, choices: shuf(ch), answer: lab(nx),
      hints: ["Look for the part that repeats over and over.", `The repeating part has ${u.length} things. Say them out loud, then keep going to see what is next.`, "Example: 🔴 🔵 🔴 🔵 🔴 → next is 🔵, because the pattern goes red, blue, red, blue. Now do yours."]
    };
  };
  const growing = (d1, d2) => () => {
    const d = ri(d1, d2), s = ri(1, 3), e = pick(["⭐", "🔵", "🍎", "🐟"]);
    const sizes = [0, 1, 2, 3].map(i => s + i * d);
    return {
      text: "These groups grow. How many will be in the next group?", visual: `<div style="font-size:1.2em;line-height:1.6">${sizes.map(n => e.repeat(n)).join("<br>")}</div>`, answer: s + 4 * d,
      hints: ["Count each group. How many more is each group than the one before?", "The jump is always the same. Add that jump to the last group.", "Example: groups of 1, 3, 5 grow by 2 each time, so the next group has 7. Now do yours."]
    };
  };

  // ---------- machines and variables ----------
  const RULES = [1, 2, 3, 4, 5].map(k => ({ nm: `adds ${k}`, tx: `add ${k}`, f: n => n + k }))
    .concat([1, 2, 3].map(k => ({ nm: `takes away ${k}`, tx: `take away ${k}`, f: n => n - k })), [{ nm: "doubles", tx: "double", f: n => n * 2 }]);
  const machineOut = () => {
    const r = pick(RULES); let n = ri(1, 9); while (r.f(n) < 0) n++;
    return {
      text: `The machine will ${r.tx} to every number you put in. What comes out?`, visual: `<span style="font-size:1.5em">${n} → [ ${r.tx} ] → ?</span>`, answer: r.f(n),
      hints: ["Put the number into the machine. What does the machine do to it?", "Follow the rule written in the box, one time.", "Example: a machine that adds 1: put in 6, and 7 comes out. Now do yours with the rule in the box."]
    };
  };
  const machineRule = () => {
    const r = pick(RULES);
    for (;;) {
      const a = ri(2, 9); let b = ri(2, 9); if (b === a) continue;
      if (r.f(a) < 0 || r.f(b) < 0) continue;
      const wrongs = shuf(RULES.filter(x => x.nm !== r.nm && !(x.f(a) === r.f(a) && x.f(b) === r.f(b)))).slice(0, 2);
      if (wrongs.length < 2) continue;
      return {
        text: "A machine always does the same thing. What does it do?", visual: `<span style="font-size:1.4em">${a} → [ ? ] → ${r.f(a)}<br>${b} → [ ? ] → ${r.f(b)}</span>`,
        choices: shuf([r, ...wrongs].map(x => x.nm)), answer: r.nm,
        hints: ["Compare each number going in to the number coming out.", "Did the numbers get bigger or smaller? By how much? Does the same rule work for both rows?", "Example: 3 → 5 and 4 → 6. Each time 2 is added, so the machine adds 2. Now do yours."]
      };
    }
  };
  const VN = ["score", "apples", "stars", "lives", "points", "coins"];
  const varParts = () => {
    const nm = pick(VN), v = ri(1, 9), box = `<span style="display:inline-block;border:3px solid #6366f1;border-radius:8px;padding:6px 14px;font-size:1.4em">📦 <b>${nm}</b> = ${v}</span>`;
    if (Math.random() < 0.5) return {
      text: "A variable is a labeled box. What is the NAME of this box?", visual: box, choices: shuf([nm, `the number ${v}`, "the equals sign"]), answer: nm,
      hints: ["The name is the label on the outside of the box.", "The name is a word. The number is what is stored inside.", "Example: in the box \"lives = 3\", the name is lives and the number 3 is inside. Now do yours."]
    };
    return {
      text: "A variable is a labeled box. What number is IN this box?", visual: box, answer: v,
      hints: ["Look for the number in the box.", "The number after the equals sign is what is stored inside the box.", "Example: in \"lives = 3\", the box holds 3. Now do yours."]
    };
  };
  const varCalc = ops => () => {
    for (;;) {
      const nm = pick(VN); let v = ri(2, 8); const start = v; const lines = [`${nm} = ${v}`];
      for (let i = 0; i < ops; i++) {
        const add = Math.random() < 0.6, k = ri(1, 4);
        if (!add && v - k < 0) { i--; continue; }
        v += add ? k : -k; lines.push(`${add ? "add" : "take away"} ${k} ${add ? "to" : "from"} ${nm}`);
      }
      return {
        text: `What number is in the box <b>${nm}</b> at the end?`, visual: code(lines), answer: v,
        hints: ["Read the lines from top to bottom, one at a time.", "\"add\" makes the number in the box bigger. \"take away\" makes it smaller. The box keeps the newest number.", "Example: coins = 2, then add 3 to coins. The box now holds 5. Now do yours."]
      };
    }
  };
  const varCopy = () => {
    const [x, y] = shuf(VN).slice(0, 2); const a = ri(1, 9); let b = ri(1, 9); if (b === a) b = a % 9 + 1;
    const toFirst = Math.random() < 0.5, askFirst = Math.random() < 0.5;
    const lines = [`${x} = ${a}`, `${y} = ${b}`, toFirst ? `set ${x} to ${y}` : `set ${y} to ${x}`];
    const target = askFirst ? x : y;
    return {
      text: `What number is in the box <b>${target}</b> at the end?`, visual: code(lines), answer: toFirst ? b : a,
      hints: ["Follow the lines in order. What does \"set\" do?", "\"set A to B\" copies the number from box B into box A. Both boxes then hold the same number.", "Example: p = 1, q = 6, set p to q. Now p holds the number from q, and q still holds it too. Now do yours."]
    };
  };

  // ---------- lessons ----------
  const L1 = [
    L("First step", routineFirst, [S("What is a step?", "👣", "A <b>step</b> is one small thing to do. Many steps in a row make a job."), S("First, next, last", "1️⃣ 2️⃣ 3️⃣", "Every job has a <b>first</b> step. Washing hands starts with turning on the water."), S("Tip", "💡", "Ask yourself: what do I have to do before anything else?")]),
    L("Last step", routineLast, [S("The last step", "🏁", "The <b>last</b> step is the one that finishes the job."), S("Example", "🥪", "To make a sandwich, the last step is to eat it!"), S("Tip", "💡", "Think about the end of the job. What do you do when you are all done?")]),
    L("Put the steps in order", routineOrder(3), [S("Order matters", "🔢", "Computers do steps in the order you give them. If the order is wrong, the job goes wrong."), S("Example", "🧦 → 👟", "Socks first, then shoes. Shoes first and then socks would not work!"), S("Tip", "💡", "Say the steps out loud in order: first, next, then.")]),
    L("Find the missing step", routineMissing, [S("Missing steps", "❓", "Sometimes one step is missing. Without it the job does not work."), S("Example", "🌱", "Dig a hole, ___, cover it with soil. The missing step is: put the seed in!"), S("Tip", "💡", "Read the step before and the step after. What fits in between?")]),
    L("Recipes for robots", ALGO, [S("What is an algorithm?", "📋", "An <b>algorithm</b> is a list of steps to do a job. A recipe is an algorithm!"), S("Why steps?", "🤖", "Robots and computers need every step. They cannot guess."), S("Tip", "💡", "Good steps are in the right order and say exactly what to do.")]),
    L("Arrows", arrowMeaning, [S("Arrow commands", "⬆️⬇️⬅️➡️", "We use arrows to tell a robot which way to move: up, down, left, right."), S("Look at the arrow", "➡️", "The arrow ➡️ points to the right. So it means: move right."), S("Tip", "💡", "Point your finger the same way as the arrow.")]),
    L("Move the robot", reachYN(3, [1, 2]), [S("The robot grid", "🤖⬜⭐", "The 🤖 moves one square for each arrow. The ⭐ is the goal."), S("Example", "🤖➡️⭐", "If the ⭐ is right next to the 🤖 on the right, one ➡️ gets there."), S("Tip", "💡", "Use your finger. Move one square for each arrow.")]),
    L("Follow the arrows", endFruit(3, [1, 2]), [S("Fruit grid", "🍎🍌🍇", "Now the grid has fruit. The robot starts on one fruit and follows the arrows."), S("Example", "🍌⬇️", "If the robot starts on a 🍌 and goes ⬇️, it lands on the fruit just below."), S("Tip", "💡", "Say the fruit you land on after each arrow.")]),
    L("Repeat it", loopCount(2, 4), [S("Loops", "🔁", "A <b>loop</b> does the same thing again and again. It saves writing the same step many times."), S("Example", "👏👏👏", "\"repeat 3 times: clap\" means clap, clap, clap."), S("Tip", "💡", "The number after repeat tells you how many times.")]),
    L("Match the loop", loopMatch(2, 4), [S("Loops and pictures", "🔁", "A loop can make a row of pictures. The number tells how many."), S("Example", "⭐⭐⭐", "Three stars are made by \"repeat 3 times: star\"."), S("Tip", "💡", "Count the pictures. That number goes after repeat.")]),
    L("Patterns", patternNext(["AB"]), [S("What is a pattern?", "🔴🔵🔴🔵", "A <b>pattern</b> is something that repeats in the same way again and again."), S("Find the core", "🔴🔵", "Find the part that repeats. Here it is red, blue."), S("Tip", "💡", "Say the pattern out loud and keep going.")]),
    L("Longer patterns", patternNext(["AAB", "ABB"]), [S("Longer patterns", "🔴🔴🔵", "Some patterns repeat three things: red, red, blue, red, red, blue..."), S("Find the core", "🔴🔴🔵", "Look for the part that comes back. That part is the core."), S("Tip", "💡", "Put your finger on the first thing. Where does the pattern start again?")]),
    L("Which step is wrong?", wrongStep, [S("Bugs", "🐛", "A mistake in a list of steps is called a <b>bug</b>."), S("Example", "🧼", "Wash hands: turn on water, rub on soap, kick a ball. Kicking a ball does not belong!"), S("Tip", "💡", "Read each step. Does it help with the job?")]),
    L("Fix the robot", debugRobot(3, 2), [S("Debugging", "🔧", "<b>Debugging</b> means finding a bug and fixing it."), S("Follow and check", "🤖", "Follow the commands with your finger and see where the robot stops."), S("Tip", "💡", "Find the one step that sends the robot the wrong way.")]),
    L("Sort it", classify(["animals", "fruits", "clothes"]), [S("Sorting", "🗂️", "Computers sort things into groups. A group is things that go together."), S("Example", "🐶🐱", "A dog and a cat both go in the animals group."), S("Tip", "💡", "Ask: what kind of thing is it?")]),
    L("If this, then that", ifThen, [S("IF and THEN", "☔", "<b>IF</b> something is true, <b>THEN</b> do something. IF it rains, THEN take an umbrella."), S("What if it is not true?", "☀️", "If the IF part is not true, you skip the THEN part."), S("Tip", "💡", "First check: is the IF part true right now?")]),
    L("What can computers do?", CANDO, [S("Computers", "💻", "Computers are machines. They follow steps that people give them."), S("They can", "🎵🎮", "Computers can play music, show pictures, and run games."), S("They cannot", "🍔", "Computers are not alive. They do not get hungry or sleepy.")]),
    L("Is it a computer?", ISCOMP, [S("What is a computer?", "💻", "A computer follows a program, which is a list of steps, and can show or tell you things."), S("Computers hide in many places", "📱⌚🎮", "Phones, tablets, laptops, watches and game machines all have computers inside."), S("Not computers", "🥄🍌", "A spoon, a banana and a ball have no program inside.")]),
    L("Mixed practice", mix(routineFirst, routineOrder(3), arrowMeaning, patternNext(["AB"]), ifThen), MIXS("Steps go in order. Arrows show direction. Patterns repeat. IF/THEN checks something first.")),
    L("Level 1 Challenge", mix(routineLast, routineMissing, reachYN(3, [1, 2]), endFruit(3, [1, 2]), loopCount(2, 4), patternNext(["AB", "AAB", "ABB"]), wrongStep, classify(["animals", "fruits", "vehicles"]), ISCOMP), MIXS("Steps, robots and arrows, loops, patterns, bugs, sorting and computers."))
  ];

  const L2 = [
    L("Longer routines", routineOrder(0), [S("More steps", "📋", "Bigger jobs have more steps. The order still matters."), S("Example", "🍪", "Mix the dough, put it on a tray, bake it, let it cool, eat. Every step has a place."), S("Tip", "💡", "Find the first step, then check the next one, then the next.")]),
    L("Missing step", routineMissing, [S("Finding gaps", "❓", "If one step is missing, the job can break."), S("Example", "🥣", "Get a bowl, pour in cereal, ___, eat. The missing step is: pour in the milk."), S("Tip", "💡", "Imagine doing the steps. Where do you get stuck?")]),
    L("Clear instructions", CLEAR, [S("Be exact", "🎯", "Computers cannot guess. Instructions must say exactly what to do."), S("Fuzzy vs clear", "🤖", "\"Go over there\" is fuzzy. \"Take 3 steps forward\" is clear."), S("Tip", "💡", "Clear instructions have numbers and exact words.")]),
    L("Programs", PROG, [S("What is a program?", "💾", "A <b>program</b> is a list of steps that a computer follows."), S("Who makes them?", "🧑‍💻", "A <b>programmer</b> writes the steps. The computer follows them exactly."), S("Bugs", "🐛", "A mistake in a program is a <b>bug</b>. Fixing it is <b>debugging</b>.")]),
    L("Get the robot to the star", pathChoice(4, [2, 3]), [S("Planning a path", "🗺️", "Look at where the robot is and where the star is. Plan the commands."), S("Count squares", "🤖➡️➡️⭐", "If the star is two squares to the right, the commands are right, right."), S("Tip", "💡", "Test each choice with your finger.")]),
    L("Where does it end?", endFruit(3, [3, 4]), [S("Longer trips", "🍎🍌🍇", "Now the robot follows three or four arrows."), S("Track it", "👆", "After each arrow, say the fruit you are on."), S("Tip", "💡", "Do one arrow at a time. Do not skip!")]),
    L("Fewest moves", fewest(4), [S("Shortest path", "📏", "The fewest moves is the shortest trip to the star."), S("No diagonals", "🤖", "A robot moves up, down, left or right. It does not cut across corners."), S("Add them", "➕", "Squares across plus squares up or down gives the fewest moves.")]),
    L("Loops that move", loopMove(7), [S("Repeating moves", "🔁🤖", "A loop can repeat a move. \"repeat 3 times: right\" moves three squares right."), S("Count the squares", "1 2 3 4 5", "Squares have numbers. Right goes up in number, left goes down."), S("Tip", "💡", "Move your finger once for each repeat.")]),
    L("Shorter with loops", loopShorter(3, 5, false), [S("Loops save time", "⏱️", "Instead of writing clap, clap, clap, clap, you can write \"repeat 4 times: clap\"."), S("Match it", "👏👏👏👏", "Count how many times it happens. Put that number after repeat."), S("Tip", "💡", "Check the number AND the action.")]),
    L("Loops with two actions", loopTotal(2, 4, 2), [S("More than one action", "🔁", "A loop can repeat two or more actions together as a team."), S("Example", "👏🦘👏🦘", "\"repeat 2 times: clap, jump\" makes clap, jump, clap, jump."), S("Tip", "💡", "Count the actions in one round, then count the rounds.")]),
    L("Patterns with 3", patternNext(["ABC", "AABB", "AAB"]), [S("Bigger patterns", "🔴🔵🟢", "Some patterns repeat three different things: red, blue, green, red, blue, green..."), S("Find the core", "🔴🔵🟢", "The core is the part that repeats. Say it out loud."), S("Tip", "💡", "Put your finger where the core starts again.")]),
    L("Growing patterns", growing(1, 1), [S("Growing patterns", "⭐ ⭐⭐ ⭐⭐⭐", "Some patterns grow. Each group gets bigger by the same amount."), S("Find the jump", "➕1", "Count each group. How many more is the next group?"), S("Tip", "💡", "Add the same jump to the last group.")]),
    L("Find the bug", debugRobot(4, 3), [S("Bug hunt", "🔍", "The robot ends in the wrong place. One command is a bug."), S("Check each step", "🤖", "Move your finger one step at a time. Where does it go wrong?"), S("Tip", "💡", "Compare where the robot stops and where the star is.")]),
    L("Fix the loop", loopFix(2, 5), [S("Loop bugs", "🐛🔁", "A loop can have a bug too. The number might be wrong."), S("Example", "⭐⭐⭐", "Three stars need \"repeat 3 times\", not 2."), S("Tip", "💡", "Count the pictures you want. That is the right number.")]),
    L("If this, else that", ifElse, [S("IF, THEN, ELSE", "🚦", "<b>IF</b> a thing is true, <b>THEN</b> do one thing, <b>ELSE</b> do another."), S("Example", "🚦", "IF the light is green THEN go ELSE stop."), S("Tip", "💡", "Check the IF part first. True means THEN, not true means ELSE.")]),
    L("How does it move?", sortMove, [S("Sorting by a rule", "🗂️", "Sorting means putting things into groups by a rule."), S("Example", "🐦🐟🐶", "Birds fly, fish swim, dogs walk."), S("Tip", "💡", "Picture the animal moving. How does it get around?")]),
    L("Input and output", IO, [S("Input", "⌨️🖱️", "<b>Input</b> is how you tell a computer something: keyboard, mouse, microphone, camera."), S("Output", "🖥️🔊", "<b>Output</b> is what the computer shows or plays: screen, speaker, printer."), S("Tip", "💡", "Input goes IN. Output comes OUT.")]),
    L("What computers are good at", CANDO2, [S("Computer strengths", "⚡", "Computers are great at fast math, repeating things and sorting."), S("Computer limits", "🤔", "Computers have no feelings and cannot guess what you meant."), S("Tip", "💡", "Ask: can a machine that follows steps do this?")]),
    L("Mixed practice", mix(routineMissing, CLEAR, pathChoice(4, [2, 3]), loopMove(7), patternNext(["ABC", "AAB"]), ifElse), MIXS("Steps in order, clear instructions, robots, loops, patterns and IF/ELSE.")),
    L("Level 2 Challenge", mix(routineOrder(0), PROG, endFruit(3, [3, 4]), fewest(4), loopTotal(2, 4, 2), growing(1, 1), debugRobot(4, 3), loopFix(2, 5), IO, sortMove, CANDO2), MIXS("Everything from level 2: steps, programs, robots, loops, patterns, bugs, sorting and computer parts."))
  ];

  const L3 = [
    L("Sort the numbers", sortNums(4), [S("Sorting", "🔢", "Computers sort lists all the time, like names or scores."), S("How to sort", "1 2 3", "Find the smallest. Then the next smallest. Keep going."), S("Tip", "💡", "Cross out the numbers you have already used.")]),
    L("Debugging detective", DEBUGF, [S("Bugs", "🐛", "A <b>bug</b> is a mistake in a program."), S("Debugging", "🔍", "To debug, go through the steps slowly, one at a time."), S("Tip", "💡", "Mistakes are okay! Fix them and test again.")]),
    L("Input, process, output", IO3, [S("Three parts", "⌨️ ⚙️ 🖥️", "A computer takes <b>input</b>, <b>processes</b> it (works on it), and gives <b>output</b>."), S("Example", "🧮", "You type 2 + 3 (input). The calculator adds (process). It shows 5 (output)."), S("Tip", "💡", "In, work, out.")]),
    L("Number machines", machineOut, [S("Machines", "⚙️", "A machine takes a number in, follows a rule, and puts a number out."), S("Example", "3 → [ add 2 ] → 5", "Put in 3. The machine adds 2. Out comes 5."), S("Tip", "💡", "Do exactly what the rule in the box says.")]),
    L("Find the rule", machineRule, [S("Secret rule", "🕵️", "Sometimes you see what goes in and what comes out, but the rule is hidden."), S("Example", "2 → 5, 4 → 7", "Each time 3 is added. The rule is add 3."), S("Tip", "💡", "Check your rule on both rows.")]),
    L("Walls!", wallBump(4), [S("Walls", "🧱", "Walls block the robot. A good program does not bump into them."), S("Check each step", "🤖", "After each arrow, check the square. Is it a wall?"), S("Tip", "💡", "Move one arrow at a time.")]),
    L("Fewest moves", fewest(5), [S("Shortest path", "📏", "The shortest path uses the fewest moves."), S("Add them", "➕", "Squares across plus squares up or down."), S("Tip", "💡", "Robots move up, down, left, right only.")]),
    L("Long trips", endFruit(3, [4, 5]), [S("Long programs", "📜", "Programs can have lots of steps. Track each one."), S("Example", "🍎➡️🍌⬇️", "Say the fruit you land on after each arrow."), S("Tip", "💡", "Use your finger and do not skip steps.")]),
    L("Loops that move", loopMove(8), [S("Loops and numbers", "🔁", "A loop repeats a move. Count the repeats."), S("Right and left", "➡️⬅️", "Right adds squares to the number. Left takes them away."), S("Tip", "💡", "Move your finger once for each repeat.")]),
    L("Count with loops", loopTotal(2, 5, 3), [S("Loops with more actions", "🔁", "A loop can hold two or three actions. They all repeat together."), S("Count", "🔢", "Actions in one round times the number of rounds is the total."), S("Tip", "💡", "Count what is inside the loop first.")]),
    L("What does the loop make?", loopPattern, [S("Loops make patterns", "🔁", "A loop can build a pattern from letters."), S("Example", "X Y X Y", "\"repeat 2 times: X Y\" makes X Y X Y."), S("Tip", "💡", "Do the part inside once, then again.")]),
    L("Fix the loop", loopFix(3, 6), [S("Loop bugs", "🐛", "A loop with the wrong number makes too many or too few."), S("Count", "⭐⭐⭐⭐", "Count the pictures you want to make."), S("Tip", "💡", "That number goes after repeat.")]),
    L("Shorter loops", loopShorter(2, 4, true), [S("Make it short", "✂️", "Loops make long lists short."), S("Example", "👏🦘👏🦘", "\"repeat 2 times: clap, jump\" is the same as clap, jump, clap, jump."), S("Tip", "💡", "Find the repeating team of actions.")]),
    L("Debug the path", debugRobot(5, 4), [S("Bugs in paths", "🔍", "A longer path can hide a bug."), S("Check each step", "🤖", "Move your finger and see where the robot goes wrong."), S("Tip", "💡", "Only one step is wrong. Which one?")]),
    L("IF with numbers", numIf, [S("IF with numbers", "🔢", "A program can check a number. IF the number is big THEN do one thing, ELSE do another."), S("Even or odd", "2 4 6 / 1 3 5", "Even numbers end in 0, 2, 4, 6, 8. Odd numbers end in 1, 3, 5, 7, 9."), S("Tip", "💡", "Check the IF first. True means THEN. Not true means ELSE.")]),
    L("Boxes with names", varParts, [S("Variables", "📦", "A <b>variable</b> is a labeled box that holds a number."), S("Name and value", "📦 score = 4", "The <b>name</b> is the label (score). The <b>value</b> is what is inside (4)."), S("Tip", "💡", "Name outside, number inside.")]),
    L("Change the box", varCalc(2), [S("Changing boxes", "➕➖", "You can add to a box or take away from a box. The number changes."), S("Example", "coins = 2, add 3", "Now the box holds 5."), S("Tip", "💡", "Go line by line from the top.")]),
    L("Copy a box", varCopy, [S("Copying", "📦➡️📦", "\"set A to B\" copies the number from B into A."), S("Both match", "🟰", "After copying, both boxes hold the same number."), S("Tip", "💡", "The box named after \"set\" gets the new number.")]),
    L("Mixed practice", mix(IO3, machineOut, wallBump(4), loopMove(8), numIf, varCalc(2)), MIXS("Input and output, machines, robots, loops, IF with numbers, and variables.")),
    L("Level 3 Challenge", mix(sortNums(4), DEBUGF, machineRule, fewest(5), endFruit(3, [4, 5]), loopTotal(2, 5, 3), loopPattern, loopFix(3, 6), debugRobot(5, 4), numIf, varParts, varCalc(3), varCopy, CANDO3), MIXS("Everything from level 3: sorting, bugs, machines, robots, loops, IF, and variables."))
  ];

  return { 1: L1, 2: L2, 3: L3 };
})();
