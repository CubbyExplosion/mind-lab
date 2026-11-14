// Mind Lab Music, levels 22-24 (extension file). 20 lessons per level.
(() => {
  const nz = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
  const S = a => ({ h: a[0], v: a[1], t: a[2] });
  const I = s => { const p = s.split("|"); return [p[0], p[1], p.slice(2)]; };
  // L(title, slides[[h,v,t]], items["question|answer|wrong1|wrong2"], nudge, clue)
  const L = (title, slides, strs, nudge, clue) => {
    const items = strs.map(I);
    const make = () => {
      const [q, a, w] = pick(items);
      const others = items.filter(x => x[1] !== a);
      const ex = pick(others.filter(x => !nz(x[0]).includes(nz(a))).concat(others));
      return {
        text: q,
        choices: shuf([a, ...shuf(w.filter(x => x !== a)).slice(0, 2)]), answer: a,
        hints: [nudge, clue, `Example: ${ex[0]} The answer is "${ex[1]}". Now do yours.`]
      };
    };
    make.teach = () => slides.map(S);
    return { title, make };
  };
  const F = (title, slides, fn) => { const make = () => fn(); make.teach = () => slides.map(S); return { title, make }; };
  const MIX = (title, ls) => {
    const make = () => pick(ls).make();
    make.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here is a quick reminder of some of the ideas, then the quiz." }, ...ls.slice(0, 4).map(l => l.make.teach()[0])];
    return { title, make };
  };
  const others = (arr, x) => arr.filter(v => v !== x);
  const NOTES = ["C", "C sharp", "D", "D sharp", "E", "F", "F sharp", "G", "G sharp", "A", "A sharp", "B"];
  const mod = (x, m) => ((x % m) + m) % m;
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const lcm = (a, b) => a / gcd(a, b) * b;

  // ======================= LEVEL 22 computed questions =======================
  const pcQ = () => {
    const t = ri(0, 3);
    if (t === 0) {
      const i = ri(1, 11), j = pick(others([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], i));
      return {
        text: `Using pitch-class numbers (C = 0, C sharp = 1, D = 2, and so on up to B = 11), what number is ${NOTES[i]}?`, answer: i,
        hints: ["Count half steps up from C. Each half step adds one to the number.",
          "C is the starting point. Say the note names in order, including the sharps, until you land on your note. The count you reached is its number.",
          `Example: ${NOTES[j]} is number ${j}. Now count yours.`]
      };
    }
    if (t === 1) {
      const x = ri(3, 11), n = ri(3, 9), x2 = pick(others([4, 5, 6, 7, 8, 9, 10], x)), n2 = pick(others([3, 4, 5, 6, 7], n));
      return {
        text: `Pitch class ${x} is transposed up ${n} half steps. What pitch class number do you get? (The numbers wrap around: after 11 comes 0.)`, answer: (x + n) % 12,
        hints: ["Add the number of half steps to the pitch class number.",
          "If the total goes past the top of the pitch-class clock, take away a full twelve so you wrap around to the start.",
          `Example: pitch class ${x2} up ${n2} half steps is ${x2} + ${n2} = ${x2 + n2}${x2 + n2 >= 12 ? `, then minus twelve gives ${x2 + n2 - 12}` : ""}. Now do yours.`]
      };
    }
    if (t === 2) {
      const x = ri(1, 11), x2 = pick(others([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], x));
      return {
        text: `Invert pitch class ${x} around C (this flips it like a mirror, so the new number is 12 minus the old one). What number do you get?`, answer: 12 - x,
        hints: ["Inversion turns an upward step into a downward step of the same size, starting from C.",
          "Take the old number away from a full twelve.",
          `Example: inverting ${x2} gives 12 - ${x2} = ${12 - x2}. Now do yours.`]
      };
    }
    const a = ri(0, 11), n = ri(3, 8), a2 = pick(others([0, 2, 4, 5, 7, 9], a)), n2 = pick(others([3, 4, 5, 6, 7], n));
    const ans = NOTES[(a + n) % 12];
    return {
      text: `Transpose ${NOTES[a]} up ${n} half steps. Which note do you get?`,
      choices: shuf([ans, NOTES[(a + n + 1) % 12], NOTES[(a + n + 11) % 12]]), answer: ans,
      hints: ["Count the half steps one at a time, and remember that sharps count as steps too.",
        "Go up through the twelve notes of the chromatic scale and wrap around to C after B.",
        `Example: ${NOTES[a2]} up ${n2} half steps is ${NOTES[(a2 + n2) % 12]}. Now do yours.`]
    };
  };

  const seqQ = () => {
    const up = Math.random() < 0.5, dir = up ? "up" : "down";
    const sh = (d, k) => mod(d - 1 + (up ? k : -k), 7) + 1;
    if (Math.random() < 0.5) {
      const d = ri(1, 7), k = ri(1, 3), d2 = pick(others([1, 2, 3, 4, 5, 6, 7], d)), k2 = pick(others([1, 2, 3], k));
      return {
        text: `A motif starts on scale degree ${d}. It is repeated in a sequence ${k} scale step${k > 1 ? "s" : ""} ${dir}. Which scale degree does the repeat start on?`, answer: sh(d, k),
        hints: ["Move along the scale one step at a time in the direction of the sequence.",
          "The scale has seven degrees. After the highest one going up you are back at the tonic, and below the tonic going down you reach the leading tone.",
          `Example: starting on ${d2} and moving ${k2} step${k2 > 1 ? "s" : ""} ${dir} lands on ${sh(d2, k2)}. Now do yours.`]
      };
    }
    const d = ri(1, 7), o1 = pick([1, 2, -1]), o2 = pick([1, 2, -1, -2]);
    const m = [d, mod(d - 1 + o1, 7) + 1, mod(d - 1 + o1 + o2, 7) + 1], k = ri(1, 2);
    const d2 = pick(others([1, 2, 3, 4, 5, 6, 7], d)), m2 = [d2, mod(d2 - 1 + 1, 7) + 1, mod(d2 - 1 + 2, 7) + 1];
    return {
      text: `A three-note motif uses scale degrees ${m.join(" - ")}. A sequence repeats it ${k} scale step${k > 1 ? "s" : ""} ${dir}. What is the LAST note of the repeat?`, answer: sh(m[2], k),
      hints: ["Every note of the motif moves by the same number of scale steps. Which note is last?",
        "Take only the last note of the motif and move it the right number of scale steps in the right direction, wrapping around the seven degrees.",
        `Example: the motif ${m2.join(" - ")} repeated one step ${dir} becomes ${m2.map(x => sh(x, 1)).join(" - ")}, so its last note is ${sh(m2[2], 1)}. Now do yours.`]
    };
  };

  const royQ = () => {
    const t = ri(0, 3);
    if (t === 0) {
      const X = pick([200, 400, 500, 800, 1000, 1200, 2000, 2400]), p = pick([10, 20, 25, 40, 50, 75]);
      const X2 = pick(others([200, 400, 500, 800, 1000], X)), p2 = pick(others([10, 20, 50], p));
      return {
        text: `A song earns $${X} in royalties. The songwriter's share is ${p}%. How many dollars is that?`, answer: X * p / 100,
        hints: ["A percent means that many parts out of one hundred.",
          "Find one percent of the total first (divide by one hundred), then multiply by the percent you need.",
          `Example: ${p2}% of $${X2} is ${X2} / 100 x ${p2} = ${X2 * p2 / 100} dollars. Now do yours.`]
      };
    }
    if (t === 1) {
      const pairs = [[240, 2], [240, 3], [300, 3], [300, 5], [360, 4], [360, 6], [480, 4], [480, 6], [600, 5], [600, 6], [900, 3], [900, 5]];
      const [X, n] = pick(pairs), [X2, n2] = pick(pairs.filter(p => p[0] !== X));
      return {
        text: `A song earns $${X}. It is shared equally among ${n} co-writers. How many dollars does each writer get?`, answer: X / n,
        hints: ["Equal shares means dividing the total by the number of people.",
          "Divide the money by the number of co-writers. Check your answer by multiplying back.",
          `Example: $${X2} shared by ${n2} writers is ${X2} / ${n2} = ${X2 / n2} dollars each. Now do yours.`]
      };
    }
    if (t === 2) {
      const r = ri(3, 6), N = ri(5, 40), r2 = pick(others([3, 4, 5, 6], r)), N2 = ri(5, 40);
      return {
        text: `Suppose a streaming service pays $${r} for every 1000 plays. How many dollars is that for ${N} thousand plays?`, answer: r * N,
        hints: ["First see how much one thousand plays pays. Then count how many thousands you have.",
          "Multiply the payment for each thousand plays by the number of thousands.",
          `Example: $${r2} per thousand and ${N2} thousand plays is ${r2} x ${N2} = ${r2 * N2} dollars. Now do yours.`]
      };
    }
    const X = pick([400, 500, 1000, 2000]), p = pick([10, 20, 25, 40]), X2 = pick(others([400, 500, 1000, 2000], X)), p2 = pick(others([10, 20, 25, 40], p));
    return {
      text: `A band earns $${X} from a show. The venue keeps ${p}% of it. How many dollars does the band get?`, answer: X - X * p / 100,
      hints: ["First find the venue's share of the total. Then think about what is left.",
        "Work out the percent of the total that the venue keeps, then take that amount away from the whole.",
        `Example: on $${X2} the venue keeps ${p2}%, which is $${X2 * p2 / 100}, so the band gets ${X2} - ${X2 * p2 / 100} = ${X2 - X2 * p2 / 100} dollars. Now do yours.`]
    };
  };

  const fileQ = () => {
    const rates = [8000, 16000, 44100, 48000], bitsL = [8, 16, 24];
    const rate = pick(rates), bits = pick(bitsL), ch = pick([1, 2]), sec = ri(2, 5);
    const rate2 = pick(others(rates, rate)), bits2 = pick(others(bitsL, bits)), ch2 = pick([1, 2]), sec2 = pick(others([2, 3, 4, 5], sec));
    const chT = c => c === 1 ? "mono (1 channel)" : "stereo (2 channels)";
    if (Math.random() < 0.5) {
      return {
        text: `Audio is recorded at ${rate} samples per second, ${bits} bits per sample, ${chT(ch)}. How many bytes of data does it make each second? (Type only digits. A byte is 8 bits.)`, answer: rate * bits / 8 * ch,
        hints: ["First work out how many bytes one sample uses. Then think about how many samples there are every second and how many channels.",
          "Multiply three things: samples per second, bytes per sample, and the number of channels.",
          `Example: ${rate2} samples, ${bits2} bits (${bits2 / 8} bytes), ${ch2} channel${ch2 > 1 ? "s" : ""}: ${rate2} x ${bits2 / 8} x ${ch2} = ${rate2 * bits2 / 8 * ch2} bytes each second. Now do yours.`]
      };
    }
    return {
      text: `Audio is recorded at ${rate} samples per second, ${bits} bits per sample, ${chT(ch)}. How many bytes of data are there in ${sec} seconds? (Type only digits. A byte is 8 bits.)`, answer: rate * bits / 8 * ch * sec,
      hints: ["Find the bytes made in one second first, then think about how many seconds there are.",
        "Bytes per second = samples per second x bytes per sample x channels. Then multiply by the number of seconds.",
        `Example: ${rate2} samples, ${bits2 / 8} byte${bits2 > 8 ? "s" : ""} per sample, ${ch2} channel${ch2 > 1 ? "s" : ""}, ${sec2} seconds: ${rate2} x ${bits2 / 8} x ${ch2} x ${sec2} = ${rate2 * bits2 / 8 * ch2 * sec2} bytes. Now do yours.`]
    };
  };

  // ======================= LEVEL 23 computed questions =======================
  const icQ = () => {
    const t = ri(0, 2);
    const ic = d => Math.min(mod(d, 12), 12 - mod(d, 12));
    if (t === 0) {
      const a = ri(0, 11), b = pick(others([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], a)), a2 = ri(0, 4), b2 = a2 + pick([7, 8, 9, 10]);
      return {
        text: `What is the interval class between ${NOTES[a]} and ${NOTES[b]}? (Count the half steps going up from the lower note to the higher one in the shortest way round: the answer is 6 or less.)`, answer: ic(b - a),
        hints: ["Find how many half steps separate the two notes, either way round the pitch-class clock.",
          "The interval class is the smaller of the two distances: going up from one note to the other, or going up from the other back to the first.",
          `Example: ${NOTES[a2]} and ${NOTES[b2 % 12]} are ${b2 - a2} half steps apart one way and ${12 - (b2 - a2)} the other way, so the interval class is ${ic(b2 - a2)}. Now do yours.`]
      };
    }
    if (t === 1) {
      const a = ri(0, 11), b = pick(others([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], a)), a2 = ri(0, 4), b2 = a2 + pick([6, 8, 9, 11]);
      return {
        text: `Pitch classes ${a} and ${b}: what is their interval class?`, answer: ic(b - a),
        hints: ["Subtract the smaller number from the larger one to get the distance in half steps.",
          "If that distance is more than half of the twelve, use the distance going the other way round instead. Interval classes only go up to the tritone.",
          `Example: ${a2} and ${b2}: the difference is ${b2 - a2}, and the other way round is ${12 - (b2 - a2)}, so the interval class is ${ic(b2 - a2)}. Now do yours.`]
      };
    }
    const n = ri(7, 11), n2 = pick(others([7, 8, 9, 10, 11], n));
    return {
      text: `An interval is ${n} half steps wide. Which interval class does it belong to?`, answer: 12 - n,
      hints: ["An interval and its inversion always belong to the same interval class.",
        "Invert the interval: take the number of half steps away from a full octave of twelve half steps.",
        `Example: an interval of ${n2} half steps inverts to ${12 - n2}, so it is interval class ${12 - n2}. Now do yours.`]
    };
  };

  const hyperQ = () => {
    const sigs = [[4, "4/4"], [3, "3/4"], [2, "2/4"]];
    for (let tries = 0; tries < 200; tries++) {
      const [bpm0, nm] = pick(sigs), bpm = pick([60, 80, 90, 100, 120, 150]), m = pick([2, 4, 8]);
      const beats = bpm0 * m, sec = beats * 60 / bpm;
      if (!Number.isInteger(sec)) continue;
      const b2 = pick([60, 120]), m2 = pick(others([2, 4, 8], m)), s2 = pick(sigs.filter(s => s[1] !== nm));
      return {
        text: `A piece in ${nm} runs at ${bpm} beats per minute. How many seconds does a ${m}-measure hypermeasure last?`, answer: sec,
        hints: ["First find how many beats are in the whole group of measures.",
          "Multiply the beats in one measure by the number of measures. Then one beat lasts sixty divided by the tempo, in seconds.",
          `Example: ${s2[1]} at ${b2} beats per minute, ${m2} measures: ${s2[0]} x ${m2} = ${s2[0] * m2} beats, then ${s2[0] * m2} x 60 / ${b2} = ${s2[0] * m2 * 60 / b2} seconds. Now do yours.`]
      };
    }
  };

  const chooseQ = () => {
    const opts = [[5, 2], [5, 3], [6, 2], [6, 3], [6, 4], [7, 2], [7, 3], [8, 2], [8, 3], [12, 2], [12, 3]];
    const f = (n, k) => { let r = 1; for (let i = 0; i < k; i++) r = r * (n - i) / (i + 1); return Math.round(r); };
    const [n, k] = pick(opts), [n2, k2] = pick(opts.filter(o => o[0] !== n));
    const what = k === 2 ? "pairs" : k === 3 ? "groups of three" : "groups of four";
    const exW = k2 === 2 ? "pairs" : k2 === 3 ? "groups of three" : "groups of four";
    const way = (nn, kk) => kk === 2 ? `${nn} x ${nn - 1} / 2` : kk === 3 ? `${nn} x ${nn - 1} x ${nn - 2} / 6` : `${nn} x ${nn - 1} x ${nn - 2} x ${nn - 3} / 24`;
    return {
      text: `You have ${n} different pitch classes. How many different ${what} of them can you choose? (Order does not matter.)`, answer: f(n, k),
      hints: ["Order does not matter, so a pair like (C, E) counts only once, no matter how you list it.",
        "Multiply the choices for each spot (the first spot has n choices, the next has one fewer, and so on), then divide by the number of ways to reorder the group.",
        `Example: ${exW} from ${n2} notes is ${way(n2, k2)} = ${f(n2, k2)}. Now do yours.`]
    };
  };

  // ======================= LEVEL 24 computed questions =======================
  const NEO = (r, q, op) => {
    if (q === "major") return { P: [r, "minor"], R: [mod(r + 9, 12), "minor"], L: [mod(r + 4, 12), "minor"] }[op];
    return { P: [r, "major"], R: [mod(r + 3, 12), "major"], L: [mod(r + 8, 12), "major"] }[op];
  };
  const neoName = x => `${NOTES[x[0]]} ${x[1]}`;
  const neoQ = () => {
    const r = ri(0, 11), q = pick(["major", "minor"]), op = pick(["P", "R", "L"]);
    const ans = neoName(NEO(r, q, op)), wr = others(["P", "R", "L"], op).map(o => neoName(NEO(r, q, o)));
    const full = { P: "P (parallel)", R: "R (relative)", L: "L (leading-tone exchange)" }[op];
    const r2 = pick(others([0, 2, 5, 7, 9], r)), q2 = q, op2 = pick(others(["P", "R", "L"], op));
    const rule = {
      P: q === "major" ? "keep the root and the fifth, and lower the third by a half step" : "keep the root and the fifth, and raise the third by a half step",
      R: q === "major" ? "move the fifth up a whole step" : "move the root down a whole step",
      L: q === "major" ? "move the root down a half step" : "move the fifth up a half step"
    }[op];
    const rule2 = {
      P: q2 === "major" ? "keep the root and the fifth, and lower the third by a half step" : "keep the root and the fifth, and raise the third by a half step",
      R: q2 === "major" ? "move the fifth up a whole step" : "move the root down a whole step",
      L: q2 === "major" ? "move the root down a half step" : "move the fifth up a half step"
    }[op2];
    return {
      text: `Apply the neo-Riemannian transformation ${full} to the ${NOTES[r]} ${q} triad. Which triad do you get?`,
      choices: shuf([ans, ...wr]), answer: ans,
      hints: ["Each of P, R and L changes only one note of the triad and keeps the other two.",
        `For a ${q} triad this move will ${rule}.`,
        `Example: for the ${NOTES[r2]} ${q2} triad, ${op2} will ${rule2}, giving ${neoName(NEO(r2, q2, op2))}. Now do yours.`]
    };
  };

  const setQ = () => {
    const base = shuf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]).slice(0, 3);
    const useI = Math.random() < 0.5, n = ri(2, 11);
    const f = (s, i, k) => s.map(x => i ? mod(k - x, 12) : mod(x + k, 12));
    const ans = f(base, useI, n).join(", ");
    let wr = [f(base, useI, 12 - n).join(", "), (useI ? base.map(x => n + x) : base.map(x => x + n)).join(", "), f(base, !useI, n).join(", ")];
    const seen = new Set([nz(ans)]);
    wr = wr.filter(w => { if (seen.has(nz(w))) return false; seen.add(nz(w)); return true; });
    while (wr.length < 2) { const w = f(base, useI, ri(1, 11)).join(", "); if (!seen.has(nz(w))) { seen.add(nz(w)); wr.push(w); } }
    const base2 = shuf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]).slice(0, 3), u2 = !useI, n2 = ri(2, 6);
    return {
      text: `Apply ${useI ? "I" : "T"}${n} to the ordered set (${base.join(", ")}). ${useI ? `Inversion I${n} turns each number x into ${n} minus x.` : `Transposition T${n} adds ${n} to each number.`} All numbers wrap around so they stay from 0 to 11. What set results?`,
      choices: shuf([ans, ...wr.slice(0, 2)]), answer: ans,
      hints: [useI ? "Apply the rule to each number in turn, working from the given set." : "Add the same number to every note of the set.",
        "After each calculation, if the result is below zero or above eleven, add or take away twelve to bring it back onto the pitch-class clock.",
        `Example: ${u2 ? "I" : "T"}${n2} on (${base2.join(", ")}) gives (${f(base2, u2, n2).join(", ")}). Now do yours.`]
    };
  };

  const vecQ = () => {
    const size = pick([3, 3, 4]), set = shuf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]).slice(0, size).sort((a, b) => a - b);
    const ic = d => Math.min(mod(d, 12), 12 - mod(d, 12));
    const counts = fs => { const c = [0, 0, 0, 0, 0, 0, 0]; for (let i = 0; i < fs.length; i++) for (let j = i + 1; j < fs.length; j++) c[ic(fs[j] - fs[i])]++; return c; };
    const k = ri(1, 6), c = counts(set);
    const s2 = [0, 4, 7], k2 = pick([3, 4, 5]);
    return {
      text: `Look at the set {${set.join(", ")}}. How many pairs of notes in the set have interval class ${k}? (Check every pair once.)`, answer: c[k],
      hints: ["List every pair of notes in the set. A set of three notes has three pairs, and a set of four has six.",
        "For each pair, subtract to find the distance in half steps, and if it is more than six use twelve minus that distance. Count how many pairs give the interval class asked.",
        `Example: in {0, 4, 7} the pairs give distances 4, 7 and 3, which are interval classes 4, 5 and 3. So interval class ${k2} appears ${counts(s2)[k2]} time${counts(s2)[k2] === 1 ? "" : "s"}. Now do yours.`]
    };
  };

  const clickQ = () => {
    for (let tries = 0; tries < 200; tries++) {
      const fps = pick([24, 25, 30]), bpm = pick([48, 50, 60, 72, 75, 80, 90, 96, 100, 120, 125, 144, 150, 180]);
      if ((fps * 60) % bpm !== 0) continue;
      const fpb = fps * 60 / bpm;
      const f2 = pick([24, 30]), b2 = pick([60, 120, 90].filter(b => (f2 * 60) % b === 0));
      if (Math.random() < 0.5) {
        return {
          text: `A film runs at ${fps} frames per second. A click track plays at ${bpm} beats per minute. How many frames pass during one beat?`, answer: fpb,
          hints: ["First find how many frames go by in a whole minute.",
            "Divide the frames in a minute by the number of beats in a minute.",
            `Example: at ${f2} frames per second there are ${f2 * 60} frames in a minute. At ${b2} beats per minute each beat is ${f2 * 60} / ${b2} = ${f2 * 60 / b2} frames. Now do yours.`]
        };
      }
      const m = pick([2, 3, 4]);
      return {
        text: `A film runs at ${fps} frames per second and the click track plays at ${bpm} beats per minute. How many frames does a ${m}-beat bar take?`, answer: fpb * m,
        hints: ["Find the frames in a single beat first. Then think about the number of beats in the bar.",
          "Frames in one beat = frames in a minute divided by beats in a minute. Then multiply by the beats in the bar.",
          `Example: at ${f2} frames per second and ${b2} beats per minute each beat is ${f2 * 60 / b2} frames, so 4 beats is ${f2 * 60 / b2 * 4} frames. Now do yours.`]
      };
    }
  };

  const phaseQ = () => {
    const t = ri(0, 2);
    if (t === 0) {
      const n = pick([6, 8, 12]), k = ri(2, 5), n2 = pick(others([6, 8, 12], n)), k2 = pick(others([2, 3, 4, 5], k));
      return {
        text: `Two players loop a pattern of ${n} notes. Player B plays very slightly faster and gains one note on player A every ${k} loops. After how many loops will they line up again?`, answer: n * k,
        hints: ["B has to gain the whole length of the pattern, one note at a time, to line up again.",
          "Multiply the number of notes in the pattern by the number of loops it takes B to gain each note.",
          `Example: a ${n2}-note pattern with a gain every ${k2} loops needs ${n2} x ${k2} = ${n2 * k2} loops. Now do yours.`]
      };
    }
    if (t === 1) {
      const pairs = [[3, 4], [4, 6], [6, 8], [5, 6], [3, 5], [4, 5], [9, 12], [8, 12], [6, 9], [4, 10]];
      const [a, b] = pick(pairs), [a2, b2] = pick(pairs.filter(p => p[0] !== a));
      return {
        text: `Player A repeats a loop that lasts ${a} beats. Player B repeats a loop that lasts ${b} beats. Both start together. After how many beats do both loops begin again at the same moment?`, answer: lcm(a, b),
        hints: ["Both loops must finish exactly at the same beat. Look for a number that both loop lengths divide into evenly.",
          "You want the smallest such number, the least common multiple. List multiples of the larger loop length until the smaller one divides it evenly.",
          `Example: loops of ${a2} and ${b2} beats first meet at beat ${lcm(a2, b2)}. Now do yours.`]
      };
    }
    const n = pick([8, 12, 16]), n2 = pick(others([8, 12, 16], n));
    return {
      text: `In a phasing piece the pattern has ${n} notes. Player B gains exactly one note on player A on every loop. After how many loops are the two players lined up again?`, answer: n,
      hints: ["Every loop B moves one note ahead. How many notes ahead must B get before the patterns match again?",
        "B must move ahead by the entire length of the pattern. Gaining one note per loop, count the loops that takes.",
        `Example: with a ${n2}-note pattern and one note gained per loop, it takes ${n2} loops. Now do yours.`]
    };
  };

  // ======================= LEVEL 22 =======================
  const l22 = [
    L("Texture words: heterophony and more", [
      ["Texture", "🧵", "<b>Texture</b> is how the layers of a piece fit together. <b>Monophony</b> is one melody alone. <b>Homophony</b> is a melody with chords under it. <b>Polyphony</b> is two or more independent melodies at once."],
      ["Heterophony", "🪢", "In <b>heterophony</b> several players play the same melody at the same time, but each decorates it a little differently. It is common in gamelan and in many folk traditions."],
      ["Homorhythm", "⛪", "When all the voices move in the same rhythm, like a hymn, the texture is <b>homorhythmic</b>. A fugue is <b>imitative polyphony</b>."]
    ], [
      "A single melody with no accompaniment is...|monophony|homophony|polyphony",
      "Two or more independent melodies at once is...|polyphony|monophony|homophony",
      "A melody with chords underneath is...|homophony|monophony|heterophony",
      "Several players decorate the same tune at the same time. This is...|heterophony|monophony|homophony",
      "When all voices move in the same rhythm, the texture is...|homorhythmic|monophonic|heterophonic",
      "Gregorian chant is an example of...|monophony|homophony|polyphony",
      "A fugue is an example of...|imitative polyphony|monophony|homophony",
      "A singer with guitar chords is...|homophony|polyphony|monophony",
      "Texture describes how...|layers of sound combine|loud the music is|fast the music moves",
      "Which texture is common in gamelan music?|heterophony|only homophony|only monophony"
    ], "Count the melodic lines and ask whether they are the same or different.", "Think: one line, one line with chords, many lines, or one line decorated many ways?"),

    L("Rounded binary and ternary form", [
      ["Two parts", "2️⃣", "<b>Simple binary</b> form has two sections, A and B, and each is usually repeated. Many Baroque dances are in binary form."],
      ["Rounded", "🔄", "In <b>rounded binary</b>, the second section starts away from home, then the opening music comes back near the end (A B A'). The A' is often a little shorter or changed."],
      ["Ternary", "3️⃣", "<b>Ternary</b> form is A B A. The first A is a complete section that ends with a full cadence. B contrasts with it, and then A returns."]
    ], [
      "Simple binary form has how many sections?|2|3|4",
      "Rounded binary is A, then B, and then...|a return of the opening A music|a brand new C section|silence",
      "In ternary form (A B A), the last section is...|a return of the first section|completely new|a bridge",
      "A key difference: in ternary form the first A section...|is complete and closes with a cadence on its own|never ends|is always in minor",
      "Ternary form is shown by the letters...|A B A|A B|A B A C A",
      "A da capo aria is usually in...|ternary form|binary form only|sonata form only",
      "Many Baroque dance movements are in...|binary form|ternary only|a rondo with ten sections",
      "A' (A prime) means the section returns...|slightly changed|exactly the same|backwards",
      "In rounded binary, the B section usually...|starts away from the home key|never moves|is always the loudest",
      "Minuet and trio makes a larger form that is...|ternary|binary|a fugue"
    ], "Write out the letters for the sections in order.", "Ask: does the opening music return, and does its first section stand alone as a closed piece?"),

    L("Harmonic rhythm", [
      ["How fast chords change", "⏱️", "<b>Harmonic rhythm</b> is the rate at which the chords change. It is not the same as the melody's rhythm."],
      ["Fast and slow", "🐢🐇", "One chord for each measure is a slow harmonic rhythm. A new chord on every beat is faster. A long pedal point makes it very slow."],
      ["Reading a phrase", "🔍", "Harmonic rhythm often speeds up as a phrase heads to a cadence, and changes usually fall on strong beats."]
    ], [
      "Harmonic rhythm means the rate at which...|chords change|the tempo changes|the melody gets loud",
      "One chord per measure compared with one chord per beat is...|slower|faster|identical",
      "In 4/4, two chords per measure means each chord lasts about...|two beats|one beat|four beats",
      "Harmonic rhythm often speeds up near a...|cadence|title|pickup note",
      "A piece that holds one chord for many measures has a...|very slow harmonic rhythm|very fast harmonic rhythm|no meter",
      "Harmonic rhythm is different from melodic rhythm because it only counts...|when the chords change|how many notes the melody has|how many words are sung",
      "In 4/4, one chord on every beat is a...|fast harmonic rhythm|slow harmonic rhythm|silent harmonic rhythm",
      "Chord changes most often fall on...|strong beats|rests|the final bar line only",
      "A long pedal point usually gives...|a slower harmonic rhythm|a faster harmonic rhythm|a new key signature",
      "Bach chorales usually change chords on...|nearly every beat|once every ten measures|only the last chord"
    ], "Think about how often the chord underneath changes, not the melody.", "Count the chord changes in a measure. More changes means a faster harmonic rhythm."),

    F("Pitch classes and mod 12", [
      ["The clock of notes", "🕛", "Music theorists number the notes: C = 0, C sharp = 1, D = 2, D sharp = 3, E = 4, F = 5, F sharp = 6, G = 7, G sharp = 8, A = 9, A sharp = 10, B = 11. These are <b>pitch classes</b>, and octaves do not matter."],
      ["Transposing", "➕", "To <b>transpose</b> up by n half steps, add n. The numbers wrap around like a clock, so after 11 you are back at 0. Example: 9 + 5 = 14, and 14 - 12 = 2."],
      ["Inverting", "🪞", "To <b>invert</b> around C, turn x into 12 - x. Pitch class 3 (D sharp) inverts to 9 (A). It is like a mirror on a clock."]
    ], pcQ),

    L("Suspensions: 4-3, 7-6 and 9-8", [
      ["Prepare, suspend, resolve", "⏳", "A <b>suspension</b> has three steps. The <b>preparation</b> is a consonant note. It is held over (tied) while the chord changes. That makes the <b>suspension</b>, a dissonance. Then it <b>resolves</b> down by step."],
      ["The numbers", "🔢", "We name suspensions by the intervals above the bass: <b>4-3</b>, <b>7-6</b> and <b>9-8</b>. The first number is the dissonance and the second is the resolution. In the bass voice we see <b>2-3</b>."],
      ["On the beat", "🥁", "The dissonance happens on a strong beat. A suspension that resolves up is a <b>retardation</b>."]
    ], [
      "The three parts of a suspension are preparation, suspension and...|resolution|modulation|cadence",
      "In a 4-3 suspension the fourth above the bass falls to a...|third|fifth|second",
      "In a 7-6 suspension the seventh resolves down to a...|sixth|octave|fifth",
      "In a 9-8 suspension the ninth resolves down to an...|octave|seventh|third",
      "A suspension usually resolves...|downward by step|upward by leap|by staying put",
      "The preparation of a suspension is...|a consonant note held over|a dissonant note|a rest",
      "The dissonant moment of a suspension usually falls on a...|strong beat|weak beat|rest",
      "A suspension in the bass voice is numbered...|2-3|4-3|9-8",
      "A suspension that resolves upward is called a...|retardation|cadence|anticipation",
      "A note that arrives early, before its chord, is an...|anticipation|retardation|appoggiatura"
    ], "Remember the three stages: set it up, hold it as the chord changes, then let it fall.", "Look at the numbers: the first one is the clashing interval and the second one is where it ends up."),

    L("The four kinds of six-four chords", [
      ["Fifth in the bass", "6️⃣4️⃣", "A <b>six-four chord</b> is a triad in second inversion, with the fifth in the bass. Its figures are 6/4. It sounds unstable, so it is used only in special ways."],
      ["Cadential and passing", "🎯", "The <b>cadential six-four</b> comes just before the dominant, on a strong beat, and acts like a decoration of V. The <b>passing six-four</b> falls on a weak beat while the bass moves by step between two chords."],
      ["Pedal and arpeggiated", "🎼", "In a <b>pedal</b> (neighbor) six-four the bass stays put while upper voices step away and return. In an <b>arpeggiated</b> six-four the bass moves through the notes of one chord."]
    ], [
      "In a six-four chord, which chord note is in the bass?|the fifth|the root|the third",
      "The six-four that comes just before the dominant at a cadence is the...|cadential six-four|passing six-four|pedal six-four",
      "A six-four chord that appears on a weak beat as the bass moves by step is a...|passing six-four|cadential six-four|arpeggiated six-four",
      "In a pedal six-four the bass...|stays on the same note|leaps every beat|rests",
      "An arpeggiated six-four appears when the bass...|outlines the notes of a chord|stays still|moves only by half steps",
      "A cadential six-four usually falls on a...|strong beat|weak beat|pickup beat",
      "A cadential six-four really functions as a decoration of the...|dominant|tonic|subdominant",
      "The figure for a second-inversion triad is...|6/4|6/5|4/2",
      "In C major, a C major chord with G in the bass is in...|second inversion|root position|first inversion",
      "A cadential six-four resolves to...|V or V7|vi|IV"
    ], "First ask which note of the chord is in the bass, then ask where the chord sits in the phrase.", "Check the beat (strong or weak) and what the bass does (stay, step or arpeggiate)."),

    L("Harmonic sequences", [
      ["Patterns that repeat", "🔁", "A <b>harmonic sequence</b> repeats a short chord pattern again and again, each time starting on a different step. It gives music a feeling of purpose and momentum."],
      ["Falling fifths", "⬇️", "The most common is <b>descending fifths</b>: each chord root falls a fifth (or rises a fourth). In C major: I - IV - vii dim - iii - vi - ii - V - I."],
      ["The 5-6 sequence", "👣", "In a <b>descending 5-6 sequence</b> the roots step down, and the chords alternate between root position and first inversion. The intervals above the bass go 5, 6, 5, 6."]
    ], [
      "A harmonic sequence is a chord pattern that...|repeats starting on a different step|never repeats|stays on one chord",
      "In the descending fifths sequence, each chord root moves...|down a fifth|up a second|down a third",
      "In C major, the descending fifths sequence goes ... vi, then which chord?|ii|V|iii",
      "In C major, the descending fifths sequence goes ... iii, then which chord?|vi|ii|IV",
      "In C major, the descending fifths sequence goes ... ii, then which chord?|V|I|vii dim",
      "A descending 5-6 sequence alternates root position with...|first inversion|second inversion|seventh chords only",
      "In a descending 5-6 sequence the bass line moves by...|steps|leaps of a fifth|octaves",
      "Falling a fifth is the same pitch-letter motion as rising a...|fourth|third|sixth",
      "Sequences are useful because they...|build momentum and direction|stop the music|force minor keys",
      "A repeat of the pattern on the same pitches is not a sequence because a sequence must...|move to a new starting step|be loud|use only minor chords"
    ], "Ask what move is repeated each time, and in which direction it travels.", "Falling fifths: count the chord roots down by fifths from the previous chord."),

    F("Sequences by scale degrees", [
      ["Copying a motif", "📋", "A <b>melodic sequence</b> copies a motif and moves it up or down the scale. Each note moves the same number of <b>scale steps</b>."],
      ["Wrapping around", "🔄", "A scale has seven degrees, numbered 1 to 7. Going down from 1 you reach 7, and going up from 7 you reach 1. Example: down 2 steps from degree 2 gives degree 6."],
      ["Whole motifs", "🎵", "To find the repeat of a motif, move every note the same number of scale steps. Example: 1 - 2 - 3, one step lower, becomes 7 - 1 - 2."]
    ], seqQ),

    L("Madrigals and word painting", [
      ["A song for friends", "🎶", "A <b>madrigal</b> is a secular (not church) song for a few voices, usually without instruments. It began in Italy in the 1500s and spread to England."],
      ["Word painting", "🖌️", "In <b>word painting</b> the music acts out the words. A rising line goes with 'ascend', a falling line with 'descend', quick notes with 'run' and a low note with 'night'."],
      ["English madrigals", "🇬🇧", "Thomas Morley wrote 'Now is the Month of Maying'. Singers often sat around a table, each reading one part from a part-book."]
    ], [
      "A madrigal is a song for...|a few voices, usually without instruments|a full orchestra only|solo drum",
      "Most early madrigals were sung in which language?|Italian|Russian|Chinese",
      "Word painting means the music...|imitates the meaning of the words|is very quiet|has no words",
      "A madrigal sings the word 'ascend'. The melody probably...|rises|falls|stays on one note",
      "To paint the word 'running', a composer might use...|quick notes|very long slow notes|a long rest",
      "Madrigals are secular, which means they are...|not church music|only for church|always silent",
      "Which English composer wrote 'Now is the Month of Maying'?|Thomas Morley|Frederic Chopin|Antonio Vivaldi",
      "In which era were madrigals most popular?|Renaissance|Romantic era|the 1900s",
      "A very low, slow note for the word 'night' is an example of...|word painting|a cadenza|modulation",
      "Madrigals were often sung by friends...|around a table, each with one part|only on a stage with 100 singers|never in groups"
    ], "Ask what the words mean and how the notes could act it out.", "A madrigal is a secular song for a few unaccompanied voices, and word painting copies the meaning of a word."),

    L("The Renaissance mass", [
      ["The Ordinary", "⛪", "The <b>mass</b> is a Catholic church service. The parts whose words stay the same every day are the <b>Ordinary</b>: Kyrie, Gloria, Credo, Sanctus and Agnus Dei (five in all)."],
      ["Josquin and Palestrina", "👤", "<b>Josquin des Prez</b> (about 1450-1521) came from the north (today's France and Belgium) and loved <b>imitation</b> between voices. <b>Palestrina</b> (about 1525-1594) was Italian and wrote smooth, clear polyphony."],
      ["A cappella", "🗣️", "Renaissance masses were usually sung <b>a cappella</b>, which means voices only. Palestrina's Pope Marcellus Mass is famous for its clear words."]
    ], [
      "How many sections are in the Ordinary of the mass?|5|3|8",
      "Which of these is a part of the Ordinary?|Kyrie|Sonata|Overture",
      "The Ordinary has words that are...|the same every day|different every day|written by the singer",
      "Which composer wrote the Pope Marcellus Mass?|Palestrina|Josquin|Handel",
      "Josquin des Prez is famous for using what technique?|imitation between voices|electric guitar|figured bass",
      "Renaissance masses were usually sung...|a cappella|with a large orchestra|with electric instruments",
      "Which is the last part of the Ordinary?|Agnus Dei|Kyrie|Credo",
      "Which is the first part of the Ordinary?|Kyrie|Gloria|Sanctus",
      "Palestrina's music is praised because the words are...|clear and easy to follow|hidden by noise|never sung",
      "Palestrina was from which country?|Italy|England|Austria"
    ], "Think about the order of the five parts and about what each composer is known for.", "Ordinary parts in order: Kyrie, Gloria, Credo, Sanctus, Agnus Dei. Josquin: imitation. Palestrina: clarity."),

    L("The birth of opera", [
      ["Florence, 1600", "🏛️", "Around 1600 a group in Florence, the <b>Camerata</b>, wanted to bring back ancient Greek drama. They invented singing that follows natural speech: <b>recitative</b>."],
      ["First operas", "🎭", "<b>Peri's Dafne</b> (about 1598) is the first opera we know of. <b>Monteverdi's L'Orfeo</b> (1607) was the first great opera. It tells the Greek myth of Orpheus."],
      ["Recitative and aria", "🎤", "Recitative tells the story. An <b>aria</b> is a more melodic song where a character shows feelings. An <b>overture</b> opens an opera."]
    ], [
      "Opera began around 1600 in which Italian city?|Florence|Vienna|Paris",
      "The Camerata wanted to bring back...|ancient Greek drama|military bands|jazz",
      "L'Orfeo was written by...|Monteverdi|Mozart|Verdi",
      "L'Orfeo was first performed in about...|1607|1707|1807",
      "Singing that copies natural speech is called...|recitative|aria|chorus",
      "A song where a character shows feelings, with a flowing melody, is an...|aria|recitative|overture",
      "The orchestral piece that opens an opera is the...|overture|aria|coda",
      "Peri's Dafne, the first known opera, was written about...|1598|1698|1498",
      "L'Orfeo tells a story from...|Greek myth|American history|Chinese history",
      "The Camerata was a group in which city?|Florence|London|Berlin"
    ], "Remember the place, the date and the people that began opera.", "Recitative follows speech to tell the story, and an aria is a melodic song of feeling."),

    L("The symphonic poem", [
      ["One movement, one story", "📖", "A <b>symphonic poem</b> (or <b>tone poem</b>) is a single-movement orchestral piece that tells a story or paints a picture. It is a kind of <b>program music</b>."],
      ["Liszt and others", "🎼", "<b>Franz Liszt</b> invented the term in the 1850s. <b>Smetana's Vltava</b> follows a river, and <b>Sibelius's Finlandia</b> is a symphonic poem too."],
      ["More tone poems", "✨", "<b>Richard Strauss</b> wrote Don Juan, and <b>Dukas</b> wrote The Sorcerer's Apprentice."]
    ], [
      "A symphonic poem is usually in how many movements?|1|4|10",
      "Who first used the name symphonic poem?|Liszt|Haydn|Bach",
      "Smetana's Vltava follows the course of a...|river|mountain|train",
      "Which is a symphonic poem by Sibelius?|Finlandia|Eroica|The Four Seasons",
      "The Sorcerer's Apprentice was written by...|Dukas|Handel|Vivaldi",
      "A symphonic poem is a type of...|program music|absolute music|only dance music",
      "Another name for a symphonic poem is a...|tone poem|nocturne|etude",
      "Who plays a symphonic poem?|an orchestra|only a solo piano|only a choir",
      "Which tone poem is by Richard Strauss?|Don Juan|Peter and the Wolf|The Planets"
    ], "Recall that it has one movement and tells a story.", "Match composer to piece: Liszt invented the name, Smetana wrote a river piece, Sibelius wrote Finlandia."),

    L("Soul and Motown", [
      ["Soul music", "❤️‍🔥", "<b>Soul</b> mixes gospel singing with rhythm and blues. Singers use call and response, and powerful, emotional voices. Aretha Franklin was called the <b>Queen of Soul</b>."],
      ["Motown", "🚗", "<b>Motown Records</b> was started in Detroit in 1959 by <b>Berry Gordy</b>. Detroit was nicknamed 'Motor Town', and that gave the label its name."],
      ["The Motown sound", "🥁", "Hits had catchy melodies, a strong backbeat on beats 2 and 4, and a studio band known as the <b>Funk Brothers</b>. Artists included the Supremes and Stevie Wonder."]
    ], [
      "Motown Records was founded in 1959 in which city?|Detroit|Nashville|Seattle",
      "Who founded Motown Records?|Berry Gordy|Elvis Presley|Duke Ellington",
      "Soul music mixes gospel with...|rhythm and blues|marches|opera arias",
      "Aretha Franklin is known as the...|Queen of Soul|King of Rock|Queen of Opera",
      "The Motown backbeat falls on beats...|2 and 4|1 only|3 only",
      "Which group recorded for Motown?|The Supremes|The Beatles|The Eagles",
      "Soul singers often use gospel-style...|call and response|fugue entries|tone rows",
      "The studio band on many Motown hits was the...|Funk Brothers|Brandenburg Ensemble|Camerata",
      "Stevie Wonder began recording at Motown...|as a child|only after he was 60|never",
      "The name Motown comes from Detroit's nickname...|Motor Town|Music Town|Moon Town"
    ], "Link each fact to Detroit, gospel roots or the backbeat.", "Motown began in Detroit with Berry Gordy, and soul came from gospel and rhythm and blues."),

    L("Bebop", [
      ["A new jazz", "🎷", "<b>Bebop</b> arose in the mid-1940s in New York clubs like Minton's in Harlem. It used fast tempos, complex chord changes and long improvised solos. It was music to listen to, not mainly to dance to."],
      ["The players", "👤", "<b>Charlie Parker</b> played alto sax, <b>Dizzy Gillespie</b> played trumpet, <b>Thelonious Monk</b> was a pianist and composer, and <b>Max Roach</b> was a drummer."],
      ["Heads and contrafacts", "🔁", "A bebop group plays the <b>head</b> (the tune), then solos over the chords, then the head again. A <b>contrafact</b> is a new melody on old chords. Anthropology uses the chords of 'I Got Rhythm'."]
    ], [
      "Bebop began in the mid...|1940s|1840s|1990s",
      "Which sax player was a leader of bebop?|Charlie Parker|Louis Armstrong|Scott Joplin",
      "Dizzy Gillespie played the...|trumpet|tuba|harp",
      "Bebop was mostly played by small groups called...|combos|marching bands|choirs",
      "Compared with swing, bebop tempos were often...|faster|much slower|silent",
      "The tune that opens and closes a jazz performance is the...|head|tail|spine",
      "A new melody written over old chord changes is a...|contrafact|cadenza|fugue",
      "Thelonious Monk was famous as a...|pianist and composer|ballet dancer|opera singer",
      "Bebop was designed mostly for...|listening|dancing in crowds|marching",
      "Max Roach played the...|drums|clarinet|violin"
    ], "Think of fast tempos, small bands and improvising on chord changes.", "Match each musician to the instrument they are known for."),

    L("Funk and the groove", [
      ["The one", "1️⃣", "<b>Funk</b> grew in the late 1960s. <b>James Brown</b>, the 'Godfather of Soul', stressed the first beat of the bar, called <b>the one</b>."],
      ["Short riffs", "🎸", "Funk uses short repeating riffs, syncopated bass lines and tight sixteenth-note rhythms. Larry Graham helped develop <b>slap bass</b>."],
      ["The funk family", "👨‍👩‍👧‍👦", "Sly and the Family Stone and George Clinton's Parliament-Funkadelic made funk colorful and playful. Funk later fed into disco and hip-hop."]
    ], [
      "Funk puts special stress on beat...|1|3|none",
      "Who is known as the 'Godfather of Soul'?|James Brown|Ray Charles|Louis Armstrong",
      "Funk basslines are usually...|syncopated and rhythmic|slow and smooth only|silent",
      "Slap bass was developed by Larry Graham and others, and it makes the bass sound...|snappy|very quiet|like a flute",
      "A short repeated musical idea is a...|riff|cadenza|aria",
      "Funk first became popular in the...|late 1960s|1700s|1920s",
      "George Clinton led...|Parliament-Funkadelic|The Funk Brothers|The Camerata",
      "Funk rhythms often use tight...|sixteenth notes|whole notes only|ritardandos",
      "Funk later helped shape...|hip-hop|Gregorian chant|madrigals",
      "In funk, the groove is built by many parts that...|lock together|never repeat|play in different tempos"
    ], "Think about repeating riffs and a heavy first beat.", "Funk comes from soul and puts the focus on the groove and the one."),

    L("The music business and copyright", [
      ["Who owns the song?", "©️", "A <b>copyright</b> protects an original song so that others cannot copy or sell it without permission. A song has two parts: the <b>composition</b> (melody and words) and the <b>sound recording</b> (the master)."],
      ["Getting paid", "💵", "A <b>royalty</b> is a payment each time a song is used. Groups such as <b>ASCAP</b> and <b>BMI</b> collect public performance royalties. A <b>license</b> is permission to use a song, for example in a video (a sync license)."],
      ["Public domain", "🌍", "When copyright ends, a work enters the <b>public domain</b> and anyone may use it. Many jobs help musicians: managers, publishers, agents and lawyers."]
    ], [
      "A copyright protects...|an original work|only famous songs|only old songs",
      "A royalty is a...|payment each time a song is used|kind of instrument|musical rest",
      "Permission to use a song is called a...|license|cadenza|ritornello",
      "A song's melody and words make up its...|composition|master recording|mix",
      "The finished recording is called the...|master|score|libretto",
      "A song whose copyright has ended is in the...|public domain|private vault|tuning fork",
      "ASCAP and BMI collect royalties for...|public performances|tuning pianos|building concert halls",
      "A license to put a song in a video is called a...|sync license|rest license|choir license",
      "A music publisher helps songwriters by...|promoting songs and collecting money|building guitars|conducting",
      "A written agreement between an artist and a company is a...|contract|clef|coda"
    ], "Think about who made the song, who owns it, and who must ask permission.", "Composition = melody and words. Master = the recording. License = permission. Royalty = payment."),

    F("Royalty and money math", [
      ["Percent of a total", "💲", "To find a percent of an amount, divide by 100 and multiply by the percent. 20% of $500 is 500 / 100 x 20 = $100."],
      ["Equal shares", "➗", "If co-writers share equally, divide the money by the number of writers. $300 shared by 3 people is $100 each."],
      ["Per-thousand pay", "📻", "Some pay rates are per thousand plays. Multiply the rate by how many thousands there are. If a service pays $4 per thousand plays, then 10 thousand plays pay $40."]
    ], royQ),

    F("Audio file sizes", [
      ["Bits and bytes", "💾", "A digital recording stores a number (a sample) many times a second. Each sample uses a set number of <b>bits</b>. <b>8 bits make 1 byte</b>, so 16-bit audio uses 2 bytes per sample."],
      ["The formula", "🧮", "Bytes per second = samples per second x bytes per sample x number of channels. Stereo has 2 channels, mono has 1."],
      ["Whole recordings", "⏲️", "For a longer recording, multiply the bytes per second by the number of seconds. Example: 1000 samples a second, 2 bytes, mono, for 3 seconds = 1000 x 2 x 1 x 3 = 6000 bytes."]
    ], fileQ)
  ];
  l22.push(
    MIX("Mixed practice", l22.slice(0, 9)),
    MIX("Level 22 Challenge", l22.slice(9))
  );

  // ======================= LEVEL 23 =======================
  const l23 = [
    L("Hypermeter", [
      ["Measures as beats", "📏", "<b>Hypermeter</b> is the pattern of strong and weak <b>measures</b>, like a bigger bar made of bars. A group of measures that feels like one bigger bar is a <b>hypermeasure</b>."],
      ["Groups of four", "4️⃣", "In Classical music, phrases often last four measures: strong, weak, medium, weak. The first measure of the group is the hypermetric downbeat."],
      ["Stretching it", "↔️", "Adding extra measures is <b>phrase expansion</b>. When one phrase ends at the very moment the next begins, that overlap is an <b>elision</b>."]
    ], [
      "A hypermeasure is a group of...|measures that feel like beats of a larger bar|chords that feel like notes|notes that feel like a rest",
      "Most Classical phrases group measures in sets of...|4|7|9",
      "In a four-measure hypermeter, which measure usually feels strongest?|the first|the second|the last",
      "When one phrase ends as the next begins, the overlap is an...|elision|augmentation|retrograde",
      "Adding extra measures to a phrase is called phrase...|expansion|inversion|resolution",
      "Hypermeter is felt at a level...|above the bar line|below the beat|inside a single note",
      "A 4-measure phrase in 3/4 has how many beats in all?|12|8|16",
      "An 8-measure phrase in 2/4 has how many beats in all?|16|8|12",
      "A pattern of strong, weak, strong, weak measures is...|duple hypermeter|triple hypermeter|no meter",
      "The first measure of a hypermeasure is called the hypermetric...|downbeat|cadenza|pickup"
    ], "Think of measures as beats of a bigger bar. Which is the strongest one?", "Group the measures (usually in fours) and feel where the strong one falls."),

    F("Hypermeasure timing", [
      ["Beats first", "🥁", "To time a hypermeasure, first count the beats. Beats = beats per measure x number of measures. A 4-measure group in 3/4 has 3 x 4 = 12 beats."],
      ["Beat length", "⏱️", "At a tempo of B beats per minute, one beat lasts 60 / B seconds. At 120 beats per minute one beat lasts half a second."],
      ["Putting it together", "🧮", "Seconds = total beats x 60 / tempo. Example: 8 beats at 120 beats per minute = 8 x 60 / 120 = 4 seconds."]
    ], hyperQ),

    L("The minuet and the scherzo", [
      ["Minuet", "💃", "The <b>minuet</b> is a graceful French court dance in 3/4. In a Classical symphony it is usually the <b>third</b> movement."],
      ["Minuet and trio", "🔁", "The form is <b>minuet, trio, minuet</b> (ABA). The <b>trio</b> is a contrasting middle section, and then the minuet returns, often marked Da Capo."],
      ["Scherzo", "😄", "Beethoven often replaced the minuet with a faster, livelier <b>scherzo</b>. In Italian, scherzo means <b>joke</b>."]
    ], [
      "A minuet is in which meter?|3/4|4/4|2/4",
      "The overall form of minuet and trio is...|minuet, trio, minuet|trio, trio, minuet|minuet only",
      "The word scherzo means...|joke|dance|lullaby",
      "Beethoven often wrote a fast, lively movement instead of a minuet called a...|scherzo|fugue|aria",
      "In a four-movement symphony, the minuet usually comes...|third|first|last of all as a fifth",
      "The trio is a section that is...|contrasting|identical|silent",
      "The minuet began as a dance of the...|French court|army camps|village markets in Asia",
      "After the trio, the minuet returns, often marked...|Da Capo|Coda|Tacet",
      "Compared with a minuet, a scherzo is usually...|faster|slower|without a beat",
      "The minuet's character is usually...|graceful|violent|fast and wild"
    ], "Think of the third movement of a Classical symphony.", "Minuet = graceful in 3/4. Trio = contrast. Scherzo = joke, faster."),

    L("Sonata form: the key plan", [
      ["Three parts", "🧩", "<b>Sonata form</b> has an <b>exposition</b> (themes are introduced), a <b>development</b> (themes travel through many keys) and a <b>recapitulation</b> (themes return). A <b>coda</b> can end the movement."],
      ["Where the keys go", "🗺️", "In the exposition the first theme is in the tonic. In a major piece the second theme moves to the <b>dominant</b>. In a minor piece it usually goes to the <b>relative major</b>."],
      ["Back home", "🏠", "In the recapitulation <b>both themes are in the tonic</b>. The development ends with a <b>retransition</b> that prepares the return."]
    ], [
      "In a major-key sonata, the second theme in the exposition is in the...|dominant key|subdominant key|parallel minor",
      "In a minor-key sonata, the second theme is usually in the...|relative major|parallel major|subdominant",
      "In the recapitulation, the second theme is in the...|home key|dominant|relative key",
      "Which section moves through many keys and breaks themes into fragments?|development|exposition|coda",
      "The passage that prepares the return of the tonic is the...|retransition|introduction|trio",
      "The section after the recapitulation that closes the movement is the...|coda|trio|cadenza",
      "Sonata form sections in order:|exposition, development, recapitulation|development, exposition, recapitulation|recapitulation, exposition, development",
      "In C major, the second theme in the exposition is usually in...|G major|F major|C minor",
      "In A minor, the second theme in the exposition is usually in...|C major|E major|D minor",
      "The transition between the themes usually...|modulates|stays in the tonic|has no notes"
    ], "Follow the key from the first theme to the second theme, then to the return.", "Exposition: tonic then new key. Development: many keys. Recapitulation: tonic again."),

    L("Bach's big collections", [
      ["The Well-Tempered Clavier", "🎹", "Bach's <b>Well-Tempered Clavier</b> has two books, each with 24 preludes and fugues, one pair in every major and minor key. It was written for keyboard."],
      ["Concertos and variations", "🎼", "The six <b>Brandenburg Concertos</b> (1721) were sent as a gift to a nobleman, the Margrave of Brandenburg. The <b>Goldberg Variations</b> are an aria with 30 variations."],
      ["More collections", "📚", "Bach wrote six solo <b>cello suites</b>, the <b>Mass in B minor</b>, and <b>The Art of Fugue</b>, which was left unfinished."]
    ], [
      "The Well-Tempered Clavier has pieces in how many keys?|24|12|7",
      "How many Brandenburg Concertos are there?|6|3|12",
      "The Goldberg Variations has an aria and how many variations?|30|12|7",
      "How many solo cello suites did Bach write?|6|4|12",
      "The Well-Tempered Clavier was written for...|keyboard|solo flute|brass band",
      "Each pair in the Well-Tempered Clavier is a prelude and a...|fugue|waltz|march",
      "The Art of Fugue is famous for being left...|unfinished|silent|in 12/8",
      "Bach lived in the...|Baroque era|Classical era|Romantic era",
      "The Brandenburg Concertos were sent as a gift to...|a nobleman|an opera house|a children's school",
      "Bach's Mass in B minor is for choir, soloists and...|orchestra|only electric guitar|only kazoo"
    ], "Count the pieces in each collection and think about the instrument.", "Remember the numbers: 24 keys, 6 concertos, 6 cello suites, 30 variations."),

    L("Mozart's operas", [
      ["Four great operas", "🎭", "Mozart's best-known operas are <b>The Marriage of Figaro</b> (1786), <b>Don Giovanni</b> (1787), <b>Così fan tutte</b> (1790) and <b>The Magic Flute</b> (1791)."],
      ["Language and style", "🗣️", "The first three are in Italian, and Lorenzo Da Ponte wrote their <b>libretti</b> (the words of an opera). Figaro is an opera buffa, a comic opera."],
      ["Singspiel", "🐦", "<b>The Magic Flute</b> is a <b>Singspiel</b>: an opera in German with spoken dialogue. It has the bird catcher Papageno and the Queen of the Night's very high, fast aria."]
    ], [
      "Which Mozart opera has Papageno the bird catcher?|The Magic Flute|Don Giovanni|Così fan tutte",
      "A Singspiel is an opera with...|spoken dialogue in German|no singers|only ballet",
      "The Magic Flute is sung in which language?|German|Italian|Russian",
      "The Marriage of Figaro is sung in...|Italian|German|French",
      "Who wrote the libretti of Figaro, Don Giovanni and Così fan tutte?|Lorenzo Da Ponte|Beaumarchais|Schiller",
      "A libretto is...|the words of an opera|a stage costume|the conductor's baton",
      "The Magic Flute was first performed in...|1791|1691|1891",
      "The Queen of the Night's fast, very high aria is an example of...|coloratura|plainchant|a march",
      "Mozart was born in which city?|Salzburg|Paris|London",
      "The Marriage of Figaro is mainly...|an opera buffa (comic)|a serious tragedy|an oratorio"
    ], "Match each opera to its year, language and style.", "Remember: Figaro (1786), Don Giovanni (1787), Così (1790), Magic Flute (1791, German Singspiel)."),

    L("Absolute music and program music", [
      ["Two ideas", "⚖️", "<b>Absolute music</b> is music with no story: it is about sound and form. <b>Program music</b> tells a story or paints a scene, and the composer gives a written program."],
      ["Debate", "🥊", "In the 1800s, composers such as Liszt and Wagner supported program music, and <b>Brahms</b> followed the Classical forms of absolute music. Critic Eduard Hanslick defended absolute music."],
      ["Examples", "🎻", "Beethoven's <b>Symphony No. 6, 'Pastoral'</b>, with movement titles about country scenes, is program music. Brahms wrote four symphonies, and his first was premiered in 1876."]
    ], [
      "Music with no story, about sound and form, is...|absolute music|program music|film music",
      "Music that tells a story or paints a scene is...|program music|absolute music|a canon",
      "Which composer supported absolute music in the 1800s?|Brahms|Liszt|Berlioz",
      "A written description of the story behind a piece is its...|program|libretto|cadenza",
      "Beethoven's 'Pastoral' Symphony is an example of...|program music|absolute music|a twelve-tone work",
      "How many symphonies did Brahms write?|4|9|104",
      "Which critic defended absolute music?|Eduard Hanslick|Lorenzo Da Ponte|Franz Liszt",
      "Liszt's symphonic poems are examples of...|program music|absolute music|church chants",
      "A pure symphony with only the title 'Symphony No. 2' is more likely...|absolute music|program music|opera",
      "Brahms's First Symphony was premiered in...|1876|1776|1976"
    ], "Ask: does the piece come with a story, or only a title like Symphony No. 2?", "Program = story and scene. Absolute = only sound and form."),

    L("Russian music: the Mighty Handful", [
      ["Glinka", "🇷🇺", "<b>Mikhail Glinka</b> (1804-1857) is called the father of Russian classical music. Later composers wanted to write in a truly Russian style."],
      ["The Five", "5️⃣", "The <b>Mighty Handful</b> (or The Five) were Balakirev, Cui, Mussorgsky, Rimsky-Korsakov and Borodin. They used Russian folk tunes and stories."],
      ["Famous pieces", "🎼", "Mussorgsky wrote the piano suite <b>Pictures at an Exhibition</b>, which Ravel later orchestrated. Rimsky-Korsakov wrote <b>Scheherazade</b>. Borodin wrote the Polovtsian Dances."]
    ], [
      "The Mighty Handful had how many composers?|5|3|8",
      "Who is called the father of Russian classical music?|Glinka|Bach|Mozart",
      "Who wrote Pictures at an Exhibition?|Mussorgsky|Borodin|Rimsky-Korsakov",
      "Who orchestrated Pictures at an Exhibition?|Ravel|Handel|Haydn",
      "Who wrote Scheherazade?|Rimsky-Korsakov|Cui|Balakirev",
      "Who wrote the Polovtsian Dances?|Borodin|Mussorgsky|Cui",
      "The Mighty Handful wanted music that was...|truly Russian|copied from Italy|completely silent",
      "Pictures at an Exhibition was first written for...|piano|harp|bagpipes",
      "The Five often used Russian...|folk tunes|jazz chords|Gregorian chants",
      "Tchaikovsky was not one of the Five. He is famous for ballets like...|Swan Lake|Pictures at an Exhibition|Scheherazade"
    ], "Recall the five names and the pieces that go with them.", "Mussorgsky: Pictures. Rimsky-Korsakov: Scheherazade. Borodin: Polovtsian Dances. Glinka: the father."),

    L("Mahler and late Romanticism", [
      ["Giant orchestras", "🎻", "Late Romantic composers wrote for larger and larger orchestras, with extra brass, harps and percussion, and sometimes choirs."],
      ["Gustav Mahler", "👤", "<b>Gustav Mahler</b> (1860-1911) was born in Bohemia and worked in Vienna. He was a great conductor and wrote nine finished symphonies. His Symphony No. 8 is called the 'Symphony of a Thousand' because it needs huge forces."],
      ["Others", "🎼", "<b>Bruckner</b> wrote long symphonies, and <b>Richard Strauss</b> wrote tone poems and operas. Mahler's Symphony No. 2, 'Resurrection', includes a choir."]
    ], [
      "How many finished symphonies did Mahler write?|9|4|104",
      "Mahler's Symphony No. 8 is nicknamed the...|Symphony of a Thousand|Surprise|Pastoral",
      "Late Romantic orchestras tended to be...|larger|smaller|made of only recorders",
      "Mahler was also famous as a...|conductor|opera costume designer|piano tuner",
      "Mahler's Symphony No. 2 includes a...|choir|jazz band|steel drum",
      "Mahler lived mostly in the...|late 1800s and early 1900s|Baroque period|Renaissance",
      "Which composer wrote long symphonies and was an organist?|Bruckner|Debussy|Gershwin",
      "Richard Strauss is famous for tone poems and...|operas|madrigals|plainchant",
      "Which city was Mahler's main base as a conductor?|Vienna|Detroit|Sydney",
      "Late Romantic music often asks for extra brass, harps and...|percussion|only recorders|only one violin"
    ], "Think big: big orchestras, long symphonies, huge forces.", "Mahler wrote nine finished symphonies and used huge forces, like choirs."),

    L("Gamelan", [
      ["An orchestra of metal", "🥁", "A <b>gamelan</b> is an ensemble from Java and Bali in Indonesia. Most of its instruments are bronze percussion: metallophones (like the saron), gongs and drums. It may also have a flute and a bowed rebab."],
      ["Scales and cycles", "🔔", "Gamelan uses two scales: <b>slendro</b> (five notes) and <b>pelog</b> (seven notes with unequal steps). A large gong marks the end of each long cycle."],
      ["Interlocking", "🧩", "In Balinese gamelan, players share fast patterns that <b>interlock</b>, called kotekan. Debussy heard a gamelan in Paris in 1889 and was inspired."]
    ], [
      "Gamelan comes from which country?|Indonesia|Peru|Norway",
      "Most gamelan instruments are...|bronze percussion|violins|trumpets",
      "The five-note gamelan scale is...|slendro|pelog|chromatic",
      "The large gong in gamelan marks...|the end of a long cycle|the start of a rest|the pitch of the flute",
      "Fast interlocking patterns in Balinese gamelan are called...|kotekan|ostinato|cadenza",
      "Gamelan is played in Java and...|Bali|Hawaii|Iceland",
      "Which composer heard a gamelan in Paris and was inspired?|Debussy|Handel|Schubert",
      "The pelog scale has how many notes?|7|5|12",
      "Gamelan usually has a mix of metal bars, gongs and...|drums|synthesizers|organs",
      "In interlocking patterns, each player plays...|part of the pattern|the whole melody alone|nothing"
    ], "Remember the instruments, the two scales and the idea of sharing patterns.", "Slendro = five notes, pelog = seven notes. Big gong = end of cycle."),

    L("Pitch-class sets", [
      ["Numbers for notes", "🔢", "Set theory numbers the notes: C = 0, C sharp = 1, D = 2, E = 4, F = 5, G = 7, A = 9, B = 11. A <b>pitch-class set</b> is a group of these numbers where order does not matter."],
      ["Chords as sets", "🎹", "A C major triad (C, E, G) is the set {0, 4, 7}. A C minor triad is {0, 3, 7}. The chord can be moved to any pitch."],
      ["Names and numbers", "🏷️", "Allen Forte named set classes with labels like <b>3-11</b>. The first number tells how many notes are in the set. This method is useful for <b>atonal</b> music."]
    ], [
      "In pitch-class numbers, C is 0. What number is G?|7|5|8",
      "What number is E?|4|3|5",
      "What number is B flat?|10|9|11",
      "What number is F sharp?|6|5|7",
      "Pitch class treats C4 and C5 as...|the same pitch class|different pitch classes|rests",
      "In a pitch-class set, {0, 4, 7} and {7, 0, 4} are...|the same set|different sets|silent",
      "The set {0, 4, 7} is which chord?|C major triad|C minor triad|C diminished triad",
      "The set {0, 3, 7} is which chord?|C minor triad|C major triad|C augmented triad",
      "Set theory is mostly used to study...|atonal music|marches|hymn tunes",
      "In Forte's name 3-11, the first number tells the...|number of notes|key|tempo"
    ], "Count half steps up from C to get a pitch-class number.", "C = 0, and each half step adds one. Sets ignore order and octave."),

    F("Interval classes", [
      ["Same class", "🪞", "An interval and its inversion belong to the same <b>interval class</b>. A fifth (7 half steps) and a fourth (5 half steps) are both interval class 5."],
      ["Counting", "➗", "Find the distance in half steps. If it is more than 6, use 12 minus the distance. So interval classes only run from 1 to 6."],
      ["Examples", "🎵", "C to G: 7 half steps, and 12 - 7 = 5, so interval class 5. C to E: 4 half steps, so interval class 4. C to F sharp: 6 half steps, so interval class 6."]
    ], icQ),

    F("Counting chords and sets", [
      ["Groups of notes", "🎲", "How many different pairs of notes can you make from n notes if order does not matter? Choose n x (n - 1) / 2. From 5 notes: 5 x 4 / 2 = 10 pairs."],
      ["Groups of three", "3️⃣", "For groups of three: n x (n - 1) x (n - 2) / 6. From 6 notes: 6 x 5 x 4 / 6 = 20 groups. We divide because the same three notes in a different order are the same group."],
      ["Groups of four", "4️⃣", "For groups of four: n x (n - 1) x (n - 2) x (n - 3) / 24. From 6 notes: 6 x 5 x 4 x 3 / 24 = 15 groups. There are 220 possible 3-note sets from the 12 pitch classes."]
    ], chooseQ),

    L("Tonicization or modulation?", [
      ["Short visit", "👋", "A <b>tonicization</b> briefly makes a chord feel like a temporary tonic, usually using a secondary dominant. The music soon returns to the home key."],
      ["A real move", "🚚", "A <b>modulation</b> is a true change of key. It is confirmed by a cadence in the new key, and the music stays there for a while."],
      ["How to decide", "🔍", "Ask: is there a cadence in the new key? Does the music stay? If it is only a passing accidental or a brief V/V, it is a tonicization."]
    ], [
      "A brief emphasis on a chord other than the tonic is a...|tonicization|modulation|transposition",
      "A real change of key confirmed by a cadence is a...|modulation|tonicization|suspension",
      "A secondary dominant such as V/V most often creates a...|tonicization|permanent modulation|key signature change",
      "Which is the best evidence of modulation?|a cadence in the new key, followed by staying there|a single accidental|a loud chord",
      "In C major, F sharp appears once and leads to G, then the music returns to C. This is...|a tonicization|a modulation|an inversion",
      "A whole section in G major, with cadences there, is...|a modulation|a tonicization|a rest",
      "V/V in C major is built on...|D|F|A",
      "A tonicization works by using the temporary chord's own...|dominant|subdominant|rests",
      "A new key that lasts only a beat or two is a...|tonicization|modulation|full transposition"
    ], "Ask whether the new key lasts or only visits.", "Modulation = confirmed by a cadence and stays. Tonicization = short visit with a secondary dominant."),

    L("Diminished sevenths as pivots", [
      ["Stacked minor thirds", "🧱", "A <b>fully diminished seventh</b> chord is four notes stacked in minor thirds (3 half steps each). In C minor, vii dim7 is B - D - F - A flat."],
      ["Symmetry", "⚖️", "It divides the octave into four equal parts, so there are only <b>three</b> different diminished seventh chords. Any note can be treated as the leading tone."],
      ["Pivoting", "🔀", "By respelling a note enharmonically, one diminished seventh chord can lead to <b>four</b> different tonic notes. That makes it a handy chord for modulating."]
    ], [
      "A fully diminished seventh chord is made of stacked...|minor thirds|major thirds|perfect fifths",
      "How many half steps are between neighboring notes in the chord?|3|4|2",
      "How many different diminished seventh chords exist, ignoring spelling?|3|4|12",
      "The chord divides the octave into how many equal parts?|4|2|6",
      "A diminished seventh chord can act as a leading-tone chord for how many different tonic notes?|4|1|7",
      "Vii dim7 is built on the...|leading tone|tonic|dominant",
      "Using a diminished seventh to move between keys makes it a...|pivot chord|final chord|pedal point",
      "Respelling a chord without changing its sound is called...|enharmonic reinterpretation|inversion|transposition",
      "In C minor, the vii dim7 chord is B, D, F and...|A flat|A|G",
      "The sound of a diminished seventh chord is usually...|tense and unstable|calm and final|silent"
    ], "Picture stacking minor thirds. How symmetrical is it?", "Four notes, equal spacing: any note can act as the leading tone."),

    L("The backdoor dominant", [
      ["The usual way", "🚪", "The usual ii-V-I in C is D minor 7, G7, C major 7. The <b>backdoor</b> version uses F minor 7, <b>B flat 7</b>, then C major 7."],
      ["Why backdoor?", "🔙", "B flat 7 is built on the <b>flat seventh</b> degree. Its root moves up a whole step to C. It enters the tonic from the side, like a back door."],
      ["Modal interchange", "🔄", "Chords borrowed from the parallel minor are <b>modal interchange</b>. In C major, F minor (iv), B flat (flat VII) and A flat (flat VI) come from C minor."]
    ], [
      "In C major, the backdoor dominant is which chord?|B flat 7|G7|A flat 7",
      "The backdoor dominant is built on which scale degree?|the flat seventh|the fifth|the flat second",
      "The usual backdoor progression in C is F minor 7, B flat 7 and...|C major 7|G7|D minor 7",
      "A regular ii-V-I in C is D minor 7, G7 and...|C major|F major|A minor",
      "The backdoor 7 chord's root moves to the tonic by...|a whole step up|a tritone|a perfect fifth",
      "Borrowing a chord from the parallel minor is called...|modal interchange|inversion|transposition",
      "In C major, the borrowed F minor chord comes from...|C minor|G major|A minor",
      "B flat major in C major is borrowed from...|C minor|C major|G minor",
      "A flat major in C major is borrowed from...|C minor|G major|D minor",
      "The backdoor sound feels smooth because the root...|moves by step|stays still|leaps up a ninth"
    ], "Think of the usual ii-V-I and where its V chord sits.", "Backdoor: iv minor 7, then the flat seven dominant, then I."),

    L("Altered dominants", [
      ["Spicy dominant", "🌶️", "An <b>altered dominant</b> is a dominant 7 chord with a changed fifth or ninth: flat 9, sharp 9, flat 5 or sharp 5. The extra tension is released when it resolves to a tonic chord."],
      ["The altered scale", "🎼", "The <b>altered scale</b> (super Locrian) is the 7th mode of the melodic minor scale. G altered uses the notes of A flat melodic minor."],
      ["Famous sound", "🎸", "C7 sharp 9 is nicknamed the 'Hendrix chord'. In G7 flat 9 the ninth (A) is lowered to A flat."]
    ], [
      "An altered dominant changes the...|fifth and/or ninth|root only|key signature",
      "G7 flat nine contains which note as its ninth?|A flat|A natural|B natural",
      "In G7 sharp five, the fifth, D, is raised to...|D sharp|D flat|E",
      "The altered scale is the seventh mode of the...|melodic minor scale|major scale|pentatonic scale",
      "Another name for the altered scale is...|super Locrian|Dorian|Lydian",
      "Altered dominants usually lead to a...|tonic chord|silent measure|drum solo",
      "G altered uses the same notes as which melodic minor scale?|A flat melodic minor|G melodic minor|F melodic minor",
      "Altered notes add...|tension|silence|only volume",
      "C7 sharp 9 is nicknamed the...|Hendrix chord|Mozart chord|Bach chord",
      "An altered dominant most commonly resolves down a fifth to...|I or i|ii|vii"
    ], "Dominant chords are tense. How do you add even more tension?", "Flat 9, sharp 9, flat 5 or sharp 5. Then it resolves to the tonic."),

    L("Modes of limited transposition", [
      ["Messiaen", "🇫🇷", "<b>Olivier Messiaen</b> (1908-1992) was a French composer and organist. He described <b>modes of limited transposition</b>: scales that have fewer than 12 different transpositions."],
      ["Counting transpositions", "🔢", "A pattern that repeats every p half steps has only p different transpositions. The whole-tone scale repeats every 2, so it has <b>2</b>. The octatonic scale repeats every 3, so it has <b>3</b>."],
      ["Other examples", "🔷", "An augmented triad repeats every 4 half steps, so it has 4 transpositions. A diminished seventh chord has 3. The chromatic scale has just 1. The major scale has all 12."]
    ], [
      "Messiaen described modes of...|limited transposition|endless modulation|equal temperament",
      "A mode of limited transposition has fewer than how many different transpositions?|12|7|5",
      "The whole-tone scale has how many different transpositions?|2|6|12",
      "The octatonic scale has how many different transpositions?|3|4|8",
      "A pattern that repeats every 3 half steps has how many transpositions?|3|4|6",
      "An augmented triad has how many different transpositions?|4|3|12",
      "Messiaen was a French composer and...|organist|jazz drummer|ballet dancer",
      "The major scale has how many different transpositions?|12|7|2",
      "The chromatic scale has how many different transpositions?|1|12|2",
      "A diminished seventh chord has how many different transpositions?|3|4|12"
    ], "How many half steps until the pattern repeats?", "Number of transpositions = the repeat length in half steps.")
  ];
  l23.push(
    MIX("Mixed practice", l23.slice(0, 9)),
    MIX("Level 23 Challenge", l23.slice(9))
  );

  // ======================= LEVEL 24 =======================
  const l24 = [
    L("Species counterpoint: second to fifth", [
      ["Fux", "📖", "<b>Johann Joseph Fux</b> wrote the famous teaching book <b>Gradus ad Parnassum</b> (1725). It teaches counterpoint in five steps called <b>species</b>, written against a given melody called the <b>cantus firmus</b>."],
      ["The species", "🔢", "First species: 1 note against 1. <b>Second</b>: 2 notes against 1. <b>Third</b>: 4 notes against 1. <b>Fourth</b>: syncopation and suspensions. <b>Fifth</b>: <b>florid</b> counterpoint, which mixes everything."],
      ["Rules", "📏", "Begin and end on a perfect consonance (unison, fifth or octave). Avoid parallel perfect fifths and octaves. Prefer contrary motion. Dissonances only as passing tones, neighbors or suspensions."]
    ], [
      "Fux wrote the counterpoint book...|Gradus ad Parnassum|The Art of Fugue|The Planets",
      "Second species has how many notes against each cantus firmus note?|2|1|4",
      "Third species has how many notes against each cantus firmus note?|4|2|8",
      "Fourth species is based on...|syncopation and suspensions|running scales only|silence",
      "Fifth species is also called...|florid counterpoint|strict canon|choral writing",
      "In species counterpoint, the given melody is called the...|cantus firmus|aria|ostinato",
      "The final interval in first species is usually a...|unison or octave|tritone|seventh",
      "Which motion helps voices stay independent?|contrary motion|parallel fifths|parallel octaves",
      "Which intervals must be avoided in parallel motion?|perfect fifths|sixths|thirds",
      "In second species, the note on the strong beat is usually a...|consonance|dissonance|rest"
    ], "Count how many notes the new line has against each fixed note.", "Species 1 to 5: 1:1, 2:1, 4:1, syncopation, then free mixing."),

    L("Spotting part-writing errors", [
      ["Check the voices", "🔎", "In four-part writing the voices from high to low are Soprano, Alto, Tenor and Bass. Look for <b>parallel fifths or octaves</b>, <b>voice crossing</b>, and gaps wider than an octave between neighboring upper voices."],
      ["More errors", "⚠️", "Do not double the <b>leading tone</b>. The <b>chordal seventh</b> should resolve down by step. <b>Direct (hidden) fifths and octaves</b> happen when the outer voices move in the same direction into a perfect interval."],
      ["Kinds of motion", "↔️", "<b>Contrary</b>: opposite directions. <b>Similar</b>: same direction by different intervals. <b>Parallel</b>: same direction, same interval. <b>Oblique</b>: one voice stays still."]
    ], [
      "Two voices moving in the same direction, a fifth apart each time, make...|parallel fifths|contrary motion|oblique motion",
      "When the alto goes below the tenor, this is...|voice crossing|good spacing|a suspension",
      "Soprano and alto should be no more than how far apart?|an octave|a fifth|two octaves",
      "Which note should not be doubled in a V chord?|the leading tone|the root|the fifth",
      "The chordal seventh of V7 should resolve...|down by step|up by leap|by staying forever",
      "Moving the outer voices in the same direction into a perfect fifth or octave gives...|hidden (direct) fifths or octaves|contrary motion|an elision",
      "Parallel octaves are weak because the two voices...|sound like one doubled line|go too slowly|are too high",
      "In four-part writing, the voices from top to bottom are...|soprano, alto, tenor, bass|bass, tenor, alto, soprano|alto, soprano, bass, tenor",
      "Contrary motion means voices move...|in opposite directions|in the same direction|one stays still",
      "In oblique motion, one voice stays and the other...|moves|stays too|disappears"
    ], "Check the outer voices first, then the spacing, then the leading tone.", "Look for: parallel 5ths or 8ves, crossed voices, big gaps, doubled leading tones."),

    L("Schenkerian analysis", [
      ["Big picture", "🔭", "<b>Heinrich Schenker</b> (1868-1935), an Austrian theorist, said a tonal piece is an elaboration of a simple underlying shape."],
      ["The Ursatz", "🪜", "The basic shape is the <b>Ursatz</b> (fundamental structure). It has an upper line, the <b>Urlinie</b>, that falls by step (3-2-1 or 5-4-3-2-1) over a bass that goes I - V - I."],
      ["Levels", "🧅", "A Schenker graph shows layers: <b>foreground</b> (the surface notes), <b>middleground</b> and <b>background</b>. <b>Prolongation</b> means one harmony is extended over time by decorating notes."]
    ], [
      "Schenkerian analysis was developed by...|Heinrich Schenker|Hugo Riemann|Allen Forte",
      "The fundamental structure is called the...|Ursatz|Urtext|Urlaub",
      "The Urlinie is a line that usually...|descends by step to the tonic|jumps in random leaps|stays on one note",
      "The bass motion in the Ursatz is...|I - V - I|IV - ii - vii|I - IV - vi",
      "The surface notes of a piece are called the...|foreground|background|grid",
      "The deepest layer, the simplest structure, is the...|background|foreground|coda",
      "Extending one harmony over time by decorating it is called...|prolongation|modulation|inversion",
      "A Schenker graph is mostly used to show...|how notes relate to a simple basic structure|the lyrics|the instrument names",
      "Schenker was an Austrian...|theorist|opera singer|trumpeter",
      "In a reduction, the analyst takes away...|decorating notes|the whole melody|the tonic"
    ], "Think of peeling a piece back, layer by layer, to a simple basic shape.", "Ursatz = descending upper line over I - V - I; foreground = surface."),

    L("Neo-Riemannian transformations", [
      ["Moving triads", "🔀", "Neo-Riemannian theory looks at how major and minor triads change into each other with the smallest motion. Its three moves are <b>P</b>, <b>L</b> and <b>R</b>."],
      ["P, L and R", "🅿️", "<b>P</b> (parallel): C major to C minor. <b>R</b> (relative): C major to A minor. <b>L</b> (leading-tone exchange): C major to E minor. Each move changes only one note."],
      ["The Tonnetz", "🕸️", "The <b>Tonnetz</b> is a grid that shows these relationships. The theory is named after Hugo Riemann and is used to explain chromatic music."]
    ], [
      "In neo-Riemannian theory, P stands for...|Parallel|Pedal|Perfect",
      "R stands for...|Relative|Resolution|Rhythm",
      "L stands for...|Leading-tone exchange|Lydian|Legato",
      "Applying P to C major gives...|C minor|A minor|E minor",
      "Applying R to C major gives...|A minor|C minor|E minor",
      "Applying L to C major gives...|E minor|C minor|A minor",
      "Applying R to A minor gives...|C major|A major|F major",
      "How many notes change in each P, L or R move?|1|2|3",
      "In an L move from C major (C, E, G), the note C moves to...|B|D|C sharp",
      "The Tonnetz is a...|grid map of pitch relationships|type of drum|kind of opera"
    ], "Each move changes a single note by a half or whole step.", "P = parallel, R = relative, L = leading-tone exchange."),

    F("Applying P, R and L", [
      ["Three moves", "🔀", "<b>P</b> keeps the root and fifth and changes the third (C major to C minor). <b>R</b> turns C major into A minor, and <b>L</b> turns C major into E minor."],
      ["From minor", "🔽", "From a minor triad: P raises the third (A minor to A major). R moves the root down a whole step (A minor to C major). L moves the fifth up a half step (A minor to F major)."],
      ["The quality flips", "↕️", "Each move turns a major triad into a minor triad or a minor triad into a major triad."]
    ], neoQ),

    F("Transposing and inverting sets", [
      ["T and I", "🔁", "In set theory <b>Tn</b> means transpose: add n to each number. <b>In</b> means invert: change each x to n - x. All answers wrap around mod 12, so they stay between 0 and 11."],
      ["Example: T5", "➕", "T5 on (0, 4, 7) gives (5, 9, 12). Since 12 wraps to 0, the answer is (5, 9, 0)."],
      ["Example: I3", "🪞", "I3 on (0, 4, 7) gives (3 - 0, 3 - 4, 3 - 7) = (3, -1, -4). Adding 12 to negative numbers gives (3, 11, 8)."]
    ], setQ),

    F("Interval vectors", [
      ["Counting intervals", "🧮", "The <b>interval vector</b> of a set counts how many pairs of notes make each interval class (1 to 6)."],
      ["Example", "🎹", "In {0, 4, 7} the pairs give 4, 7 and 3 half steps. As interval classes these are 4, 5 and 3. So the vector is <b>001110</b>."],
      ["Method", "✅", "List all pairs. A 3-note set has 3 pairs, a 4-note set has 6. For each pair take the distance, and if it is above 6 use 12 minus the distance."]
    ], vecQ),

    L("Expressionism and the Second Viennese School", [
      ["Three composers", "👥", "<b>Arnold Schoenberg</b> and his students <b>Alban Berg</b> and <b>Anton Webern</b> are called the <b>Second Viennese School</b>. They worked in Vienna in the early 1900s."],
      ["Expressionism", "🎨", "Expressionist music shows strong inner feeling and uses dissonance freely. About 1908-09 Schoenberg started writing <b>atonal</b> music, and in the early 1920s he developed the <b>twelve-tone method</b>."],
      ["Famous works", "📜", "Schoenberg's <b>Pierrot lunaire</b> (1912) uses <b>Sprechstimme</b>, a half-sung, half-spoken style. Berg wrote the opera <b>Wozzeck</b>. Webern wrote very short, concentrated pieces."]
    ], [
      "Schoenberg's students Berg and Webern belong to the...|Second Viennese School|Mighty Handful|Florentine Camerata",
      "Expressionist music shows strong...|inner feeling|marching rhythm|folk dance",
      "Sprechstimme is a style that is...|half sung, half spoken|played on drums|only whispered",
      "Which work uses Sprechstimme?|Pierrot lunaire|Messiah|Boléro",
      "Who wrote the opera Wozzeck?|Berg|Webern|Mozart",
      "Webern is known for pieces that are...|very short and concentrated|longer than symphonies|only for organ",
      "Schoenberg developed the...|twelve-tone method|figured bass|Alberti bass",
      "Atonal music has no clear...|tonic or key center|rhythm|pitch",
      "The Second Viennese School worked in which city?|Vienna|Rome|Moscow",
      "Pierrot lunaire was written in...|1912|1812|1990"
    ], "Remember the three names and the feelings of the style.", "Schoenberg (teacher), Berg and Webern (students). Atonal, Sprechstimme, twelve-tone."),

    L("Contemporary composers", [
      ["New sounds", "🌌", "<b>György Ligeti</b> (born in Hungary) wrote shimmering textures called <b>micropolyphony</b>. His <b>Atmosphères</b> was used in the film 2001: A Space Odyssey."],
      ["Simple and bell-like", "🔔", "<b>Arvo Pärt</b> from Estonia created <b>tintinnabuli</b>, a style based on a bell-like triad. <b>John Adams</b> wrote Short Ride in a Fast Machine."],
      ["Today", "🎤", "<b>Caroline Shaw</b> won the Pulitzer Prize for Music in 2013 for Partita for 8 Voices, at age 30. <b>Kaija Saariaho</b> from Finland wrote the opera L'Amour de loin."]
    ], [
      "Ligeti's shimmering style is called...|micropolyphony|tintinnabuli|word painting",
      "Which film used Ligeti's Atmosphères?|2001: A Space Odyssey|The Wizard of Oz|Snow White",
      "Arvo Pärt is from which country?|Estonia|Brazil|Egypt",
      "Pärt's bell-like style is called...|tintinnabuli|micropolyphony|serialism",
      "Caroline Shaw won a Pulitzer Prize for...|Partita for 8 Voices|Rhapsody in Blue|The Four Seasons",
      "Who wrote Short Ride in a Fast Machine?|John Adams|Johann Strauss|Johannes Brahms",
      "Kaija Saariaho was from...|Finland|Peru|Japan",
      "Ligeti was born in...|Hungary|Argentina|Canada",
      "Saariaho wrote the opera...|L'Amour de loin|Wozzeck|La bohème",
      "Tintinnabuli is based on a...|bell-like triad|twelve-tone row|gamelan scale"
    ], "Match each composer to the country and the special style.", "Ligeti: micropolyphony. Pärt: tintinnabuli. Shaw: Pulitzer 2013. Saariaho: Finland."),

    L("Early electronic music", [
      ["Musique concrète", "🎙️", "In Paris in 1948, <b>Pierre Schaeffer</b> began <b>musique concrète</b>: music made from recorded real-world sounds, such as trains, which were cut, looped, reversed or slowed."],
      ["Elektronische Musik", "⚡", "In Cologne, from 1951, composers like <b>Karlheinz Stockhausen</b> built sounds from scratch with electronic generators. This was called <b>Elektronische Musik</b>."],
      ["Synthesizers", "🎹", "<b>Robert Moog</b> built a famous synthesizer in the 1960s. <b>Wendy Carlos</b> recorded Switched-On Bach (1968), which made the synthesizer popular."]
    ], [
      "Musique concrète uses...|recorded real-world sounds|only live violins|only choirs",
      "Who began musique concrète in Paris?|Pierre Schaeffer|Robert Moog|Wendy Carlos",
      "In Elektronische Musik, sounds were made by...|electronic generators|natural instruments only|folk singers",
      "Which German city was home to the famous electronic studio?|Cologne|Boston|Madrid",
      "Who built a famous synthesizer in the 1960s?|Robert Moog|Johann Strauss|John Adams",
      "Switched-On Bach was recorded by...|Wendy Carlos|Karlheinz Stockhausen|Pierre Boulez",
      "Cutting tape and playing it backwards is an example of...|tape manipulation|word painting|figured bass",
      "A tape loop repeats a...|short recorded sound|full orchestra|printed score",
      "Stockhausen was a composer from...|Germany|Australia|Brazil",
      "Musique concrète began in the year...|1948|1748|2008"
    ], "Real sounds recorded, or sounds built from nothing?", "Concrete = recorded real sounds (Paris). Elektronische = built electronically (Cologne)."),

    L("Jazz forms: blues, AABA and Coltrane", [
      ["Forms", "🧩", "Jazz tunes use forms like the 12-bar blues and the 32-bar <b>AABA</b>. In AABA the B section is the <b>bridge</b>, or release. The tune is the <b>head</b>."],
      ["Rhythm changes", "🔄", "<b>Rhythm changes</b> are the chords of Gershwin's 'I Got Rhythm' (1930). Many tunes use them. A new melody on old chords is a <b>contrafact</b>."],
      ["Big steps", "🪜", "John Coltrane's <b>Giant Steps</b> (recorded 1959) moves through key centers that are a <b>major third</b> apart (B, G and E flat). Miles Davis's <b>Kind of Blue</b> (1959) made <b>modal jazz</b> famous."]
    ], [
      "Rhythm changes come from the chords of which song?|I Got Rhythm|Rhapsody in Blue|Summertime",
      "A new melody over old chords is a...|contrafact|cadenza|fugue",
      "In AABA form, the bridge is the...|B section|first A|last bar only",
      "Giant Steps is known for key centers a ... apart.|major third|perfect fifth|half step",
      "Giant Steps was recorded in...|1959|1929|1999",
      "Kind of Blue helped make popular...|modal jazz|ragtime|plainchant",
      "The 12-bar blues has how many bars?|12|8|32",
      "The AABA tune has how many bars?|32|12|64",
      "Who led the Kind of Blue sessions?|Miles Davis|Duke Ellington|Louis Armstrong",
      "The tune played at the beginning of a jazz performance is called the...|head|tail|spine"
    ], "Match each piece or term to the form it describes.", "AABA = 32 bars with a bridge. Rhythm changes = I Got Rhythm. Giant Steps = major-third key centers."),

    L("Global pop: K-pop, J-pop and Bollywood", [
      ["K-pop", "🇰🇷", "<b>K-pop</b> is pop music from South Korea. It mixes pop, hip-hop, R&B and dance music, with strong choreography and video. The worldwide spread of Korean pop culture is called <b>Hallyu</b>, the Korean Wave."],
      ["J-pop", "🇯🇵", "<b>J-pop</b> is pop music from Japan. Songs for anime shows and games are an important part of the scene."],
      ["Bollywood", "🎬", "<b>Bollywood</b> is the Hindi film industry in Mumbai. The songs are usually sung by <b>playback singers</b>, who record the voice while actors move their lips on screen."]
    ], [
      "K-pop comes from which country?|South Korea|Brazil|Greece",
      "J-pop comes from which country?|Japan|Italy|Kenya",
      "Hallyu is also called the Korean...|Wave|Mountain|Piano",
      "A playback singer is someone who...|records the song for an actor to lip-sync|plays only the drums|sells tickets",
      "Bollywood films are made mainly in which language?|Hindi|French|German",
      "The word Bollywood comes from Bombay and...|Hollywood|Broadway|Tollywood only",
      "K-pop is known for strong...|choreography and video|silence|only solo piano",
      "Anime songs are important in...|J-pop|Gregorian chant|madrigals",
      "The Bollywood industry is based in...|Mumbai|Cairo|Toronto",
      "K-pop mixes pop, hip-hop, R&B and...|dance music|Baroque suites only|plainchant"
    ], "Match each style to its country and what it is known for.", "K-pop: South Korea. J-pop: Japan. Bollywood: Hindi film songs from Mumbai."),

    L("Ethnomusicology", [
      ["What is it?", "🌍", "<b>Ethnomusicology</b> is the study of music in its culture. Scholars do <b>fieldwork</b>: they record, interview, and take part in the music with people."],
      ["Terms", "📝", "<b>Oral tradition</b> means music passed on by ear, not by writing. <b>Transcription</b> means writing a performance down in notation. An <b>emic</b> view is the insider's; an <b>etic</b> view is the outsider's."],
      ["Collectors", "🎧", "<b>Alan Lomax</b> recorded folk music across the United States and other countries for the Library of Congress, starting in the 1930s. Good researchers respect and credit the musicians."]
    ], [
      "Ethnomusicology is the study of music in its...|culture|volume|key",
      "Recording and interviewing people in the place they live is called...|fieldwork|transposition|orchestration",
      "Music passed on by ear, not by writing, is part of an...|oral tradition|opera|overture",
      "Writing a performance down in notation is called...|transcription|improvisation|modulation",
      "An insider's view of a culture is called...|emic|etic|epic",
      "An outsider's view of a culture is called...|etic|emic|ethic",
      "Who recorded folk music for the Library of Congress from the 1930s?|Alan Lomax|Leonard Bernstein|Franz Liszt",
      "A good fieldworker treats musicians with...|respect and credit|no concern|secrecy",
      "Participant observation means the researcher...|takes part in the music|never visits|only reads old books",
      "Transcription may miss details because notation...|cannot show every nuance|is too loud|is a secret code"
    ], "Think about studying music as part of people's lives.", "Fieldwork, oral tradition, transcription, emic and etic."),

    L("Composers of the African diaspora", [
      ["Early voices", "🎻", "<b>Joseph Bologne, Chevalier de Saint-Georges</b> (1745-1799), born in Guadeloupe, was a violinist, conductor and composer in France. <b>Samuel Coleridge-Taylor</b> of England wrote Hiawatha's Wedding Feast (1898)."],
      ["American pioneers", "🇺🇸", "<b>Scott Joplin</b> wrote the Maple Leaf Rag (1899) and the opera Treemonisha. <b>William Grant Still</b> wrote the Afro-American Symphony (1930s) and is called the dean of African American composers."],
      ["Chicago", "🏙️", "<b>Florence Price</b>'s First Symphony was performed by the Chicago Symphony in 1933, a first for a Black woman composer. <b>Margaret Bonds</b>, a pianist, set poems by Langston Hughes."]
    ], [
      "Chevalier de Saint-Georges was born in...|Guadeloupe|Texas|Australia",
      "Samuel Coleridge-Taylor was a composer from...|England|Mexico|India",
      "Scott Joplin wrote the...|Maple Leaf Rag|Boléro|Messiah",
      "Joplin also wrote an opera called...|Treemonisha|Wozzeck|Aida",
      "Who wrote the Afro-American Symphony?|William Grant Still|Aaron Copland|John Adams",
      "Florence Price's First Symphony was played by the...|Chicago Symphony|Vienna Opera|Detroit Band",
      "Margaret Bonds set poems by...|Langston Hughes|William Shakespeare|Homer",
      "Saint-Georges was a violinist, conductor and...|composer|ballet teacher|organ builder",
      "Coleridge-Taylor is famous for...|Hiawatha's Wedding Feast|The Planets|Peter and the Wolf",
      "Price's Symphony No. 1 was performed in...|1933|1833|1999"
    ], "Match each composer to a famous work or place.", "Saint-Georges: France. Coleridge-Taylor: Hiawatha. Joplin: Maple Leaf Rag. Price: Chicago, 1933."),

    L("Style detective", [
      ["Clues", "🕵️", "To place a piece in an era, listen to the <b>texture</b>, the <b>instruments</b>, the <b>harmony</b> and the <b>form</b>. Each era has favorite clues."],
      ["Early eras", "⏳", "Medieval: chant on one line. Renaissance: smooth vocal polyphony. Baroque: harpsichord and basso continuo, ornaments. Classical: clear four-bar phrases, Alberti bass, sonata form."],
      ["Later eras", "🚀", "Romantic: big orchestras and strong feeling. Impressionist: blurred harmony. 1900s: twelve-tone rows. Minimalism: patterns that change slowly."]
    ], [
      "Harpsichord with basso continuo and ornaments points to the...|Baroque|Romantic|Classical",
      "Balanced four-bar phrases, Alberti bass and sonata form point to the...|Classical|Baroque|Medieval",
      "Huge orchestras and strong personal feeling point to the...|Romantic era|Classical era|Renaissance",
      "Unaccompanied chant in Latin on one line suggests the...|Medieval era|Classical era|Impressionism",
      "Whole-tone scales and blurred harmony suggest...|Impressionism|Baroque|Classical",
      "Twelve-tone rows suggest...|serialism|the Renaissance|the Classical era",
      "Imitative vocal polyphony for a cappella choir suggests the...|Renaissance|Romantic era|minimalism",
      "Repeating patterns that change slowly suggest...|minimalism|the Baroque|the Medieval era",
      "Piano pieces called nocturnes and ballades suggest the...|Romantic era|Baroque|Renaissance",
      "Terraced dynamics (sudden steps of loud and soft) on a harpsichord suggest the...|Baroque|Romantic era|Impressionism"
    ], "Think of each era's favorite instruments, textures and forms.", "Match the clue to the era: chant, polyphony, continuo, Alberti bass, big orchestra, blur, tone rows, patterns."),

    L("Opera in the 1900s", [
      ["Puccini", "🇮🇹", "<b>Giacomo Puccini</b> was Italian. He wrote La bohème (1896) and Madama Butterfly (1904). His last opera, <b>Turandot</b>, was left unfinished when he died in 1924 and was first performed in 1926."],
      ["New styles", "🆕", "<b>Berg's Wozzeck</b> (1925) is an atonal opera. <b>Britten's Peter Grimes</b> (1945) is English. <b>Gershwin's Porgy and Bess</b> (1935) is an American opera with jazz and blues touches."],
      ["Minimalist opera", "🔁", "<b>Philip Glass</b> wrote Einstein on the Beach (1976) with repeating patterns. <b>Richard Strauss</b> wrote Salome (1905)."]
    ], [
      "Turandot was left unfinished by...|Puccini|Verdi|Mozart",
      "Puccini was from which country?|Italy|Spain|Germany",
      "Which opera by Berg is atonal?|Wozzeck|Madama Butterfly|Carmen",
      "Peter Grimes was written by...|Britten|Gershwin|Glass",
      "Porgy and Bess was written by...|Gershwin|Berg|Strauss",
      "Einstein on the Beach is by...|Philip Glass|Giacomo Puccini|Benjamin Britten",
      "Philip Glass is known for...|minimalism|madrigals|plainchant",
      "Porgy and Bess mixes opera with...|jazz and blues|marches only|gamelan",
      "Salome was written by...|Richard Strauss|Rossini|Handel",
      "Britten was from...|England|Brazil|India"
    ], "Match each opera to its composer, country and style.", "Puccini: Turandot. Berg: Wozzeck. Britten: Peter Grimes. Gershwin: Porgy and Bess. Glass: Einstein on the Beach."),

    F("Click tracks and film frames", [
      ["Frames", "🎞️", "Film and video are made of still <b>frames</b>. Common speeds are 24, 25 and 30 frames per second. Composers use a <b>click track</b> to keep the music in time with the picture."],
      ["Frames per beat", "🧮", "Frames per minute = frames per second x 60. Frames per beat = frames per minute divided by beats per minute. Example: 24 frames a second and 120 beats per minute: 24 x 60 / 120 = 12 frames per beat."],
      ["A whole bar", "📏", "For a bar, multiply the frames per beat by the beats in the bar. At 12 frames per beat, 4 beats take 48 frames."]
    ], clickQ),

    F("Phasing and cycles", [
      ["Phase music", "🎹", "In his <b>Piano Phase</b> (1967), <b>Steve Reich</b> has two pianists start with the same short pattern. One player slowly speeds up so the patterns drift apart and eventually line up again."],
      ["Counting the drift", "🧮", "If a pattern has n notes and player B gains one note every loop, they line up after n loops. If B gains one note only every k loops, they line up after n x k loops."],
      ["Different lengths", "🔁", "Two loops of different lengths line up again at their least common multiple. Loops of 3 and 4 beats meet again at 12 beats."]
    ], phaseQ)
  ];
  l24.push(
    MIX("Mixed practice", l24.slice(0, 9)),
    MIX("Level 24 Challenge", l24.slice(9))
  );

  Object.assign(MUSIC_LEVELS, { 22: l22, 23: l23, 24: l24 });
})();
