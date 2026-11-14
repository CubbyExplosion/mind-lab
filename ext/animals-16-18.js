// ext/animals-16-18.js  Animals & Nature levels 16-18
(() => {
  const nz = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
  const T = slides => () => slides.map(s => { const p = s.split("|"); return { h: p[0], v: p[1], t: p[2] }; });
  const L = (title, slides, items, nudge, clue) => {
    const its = items.map(s => { const p = s.split("|"); return { q: p[0], a: p[1], v: p[2] || "", c: p[3] || "", w: p[4] ? p[4].split(",") : null }; });
    const make = () => {
      const it = pick(its);
      const pool = [...new Set(its.map(x => x.a))].filter(a => a !== it.a);
      const wr = shuf(it.w || pool).slice(0, 2);
      let exs = its.filter(x => x.a !== it.a && !nz(x.q + x.a).includes(nz(it.a)));
      if (!exs.length) exs = its.filter(x => x.a !== it.a);
      const ex = pick(exs);
      const na = nz(it.a), leaks = h => na.length > 2 && nz(String(h).replace(/<[^>]+>/g, "")).includes(na);
      let h1 = nudge || "Think back to what you just learned. Read the question slowly.";
      if (leaks(h1)) h1 = "Think back to what you just learned. Read the question slowly.";
      let h2 = it.c || clue || "";
      if (!h2 || leaks(h2)) h2 = `The answer starts with the letter "${it.a[0].toUpperCase()}" and has ${it.a.replace(/ /g, "").length} letters.`;
      return {
        text: it.q, visual: it.v || undefined, choices: shuf([it.a, ...wr]), answer: it.a,
        hints: [h1, h2, `Example: ${ex.q} The answer is "${ex.a}". Now do yours.`]
      };
    };
    make.teach = T(slides);
    return { title, make };
  };
  const N = (title, slides, make) => { make.teach = T(slides); return { title, make }; };
  const BOTH = (title, slides, items, nudge, clue, gen, share) => {
    const base = L(title, slides, items, nudge, clue);
    const m = () => (Math.random() < (share || 0.4) ? gen() : base.make());
    m.teach = base.make.teach;
    return { title, make: m };
  };
  const MIX = (title, ls) => {
    const make = () => pick(ls).make();
    make.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes ideas you already know. Here is a quick reminder, then the quiz." }, ...shuf(ls).slice(0, 4).map(l => l.make.teach()[0])];
    return { title, make };
  };

  // ---------- number makers ----------
  const ANI = [["frogs", "🐸"], ["mice", "🐭"], ["beetles", "🪲"], ["fish", "🐟"], ["deer", "🦌"], ["geese", "🪿"], ["rabbits", "🐰"], ["turtles", "🐢"]];

  const popchange = () => {
    const mk = () => ({ P: ri(5, 20) * 10, b: ri(1, 8) * 5, d: ri(1, 8) * 5, i: ri(0, 4) * 5, e: ri(0, 4) * 5 });
    const v = mk(), nm = pick(ANI);
    const ans = v.P + v.b - v.d + v.i - v.e;
    let o = mk(); while (o.P + o.b - o.d + o.i - o.e === ans) o = mk();
    return {
      text: `A group of ${v.P} ${nm[0]} has ${v.b} births, ${v.d} deaths, ${v.i} animals moving in (immigration) and ${v.e} moving out (emigration) in one year. How many are in the group now? (type a number)`,
      visual: nm[1], answer: ans,
      hints: ["Births and animals moving in make a group bigger. Deaths and animals moving out make it smaller.",
        "Add the animals that come in, then take away the animals that leave. Do it one step at a time.",
        `Example: a group of ${o.P} has ${o.b} births, ${o.d} deaths, ${o.i} come in and ${o.e} leave. ${o.P} + ${o.b} - ${o.d} + ${o.i} - ${o.e} = ${o.P + o.b - o.d + o.i - o.e}. Now do yours.`]
    };
  };

  const meanMed = () => {
    const mk = () => {
      const a = [ri(2, 9), ri(2, 9), ri(2, 9), ri(2, 9), ri(2, 9)];
      const s = a.reduce((x, y) => x + y, 0), r = s % 5;
      a[4] += (5 - r) % 5;
      return a;
    };
    const stat = (a, k) => {
      const s = [...a].sort((x, y) => x - y);
      return k === 0 ? a.reduce((x, y) => x + y, 0) / a.length : k === 1 ? s[2] : s[4] - s[0];
    };
    const k = ri(0, 2), a = mk(), nm = pick(ANI), ans = stat(a, k);
    let o = mk(), g = 0; while ((stat(o, k) === ans || o.join() === a.join()) && g++ < 50) o = mk();
    const name = ["mean (average)", "median (the middle number when sorted)", "range (biggest minus smallest)"][k];
    const how = [
      "Add all the numbers, then divide by how many numbers there are.",
      "Put the numbers in order from smallest to biggest, then pick the one in the middle.",
      "Find the biggest number and the smallest number, then subtract."][k];
    const exs = [`Add them up and divide by 5.`, `Sort them and take the middle one.`, `Biggest minus smallest.`][k];
    return {
      text: `Scientists counted ${nm[0]} at 5 ponds: ${a.join(", ")}. What is the ${name}? (type a number)`,
      visual: nm[1], answer: ans,
      hints: [`Think about what ${["the mean", "the median", "the range"][k]} tells you about a list of numbers.`, how,
        `Example: the counts ${o.join(", ")}. ${exs} The answer is ${stat(o, k)}. Now do yours.`]
    };
  };

  const metric = () => {
    const types = [["kg", "g", 1000], ["m", "cm", 100], ["km", "m", 1000], ["L", "mL", 1000], ["cm", "mm", 10]];
    const mk = () => { const t = pick(types), n = ri(2, 9); return { t, n, big: Math.random() < 0.5 }; };
    const v = mk(), nm = pick([["a whale shark", "🦈"], ["a river", "🌊"], ["a snake", "🐍"], ["a bucket for an aquarium", "🪣"], ["a migration trip", "🧭"]]);
    const q = (u) => u.big ? `${u.n} ${u.t[0]} = how many ${u.t[1]}?` : `${u.n * u.t[2]} ${u.t[1]} = how many ${u.t[0]}?`;
    const a = u => u.big ? u.n * u.t[2] : u.n;
    let o = mk(); while (a(o) === a(v)) o = mk();
    return {
      text: `Unit conversion for a field notebook: ${q(v)} (type a number)`,
      visual: "📏", answer: a(v),
      hints: ["Moving to a smaller unit means more of them. Moving to a bigger unit means fewer of them.",
        "Kilo means 1000, centi means 100 and milli means 1000 of the base unit. Decide whether to multiply or divide.",
        `Example: ${q(o)} The answer is ${a(o)}. Now do yours.`]
    };
  };

  const pctChange = () => {
    const mk = () => ({ S: pick([20, 40, 60, 80, 100, 200]), p: pick([10, 25, 50]), up: Math.random() < 0.5 });
    const v = mk(), nm = pick(ANI);
    const f = u => u.S + (u.up ? 1 : -1) * u.S * u.p / 100;
    let o = mk(); while (f(o) === f(v)) o = mk();
    const w = u => u.up ? "grows" : "drops";
    return {
      text: `A group of ${v.S} ${nm[0]} ${w(v)} by ${v.p} percent. How many are there now? (type a number)`,
      visual: nm[1], answer: f(v),
      hints: ["Find the part of the group the percent describes first, then decide whether to add it or take it away.",
        "Percent means out of one hundred. Half, a quarter and a tenth are easy percents to picture.",
        `Example: a group of ${o.S} ${w(o)} by ${o.p} percent. ${o.p} percent of ${o.S} is ${o.S * o.p / 100}, so the new number is ${f(o)}. Now do yours.`]
    };
  };

  const alleleFreq = () => {
    const mk = () => { const N = pick([20, 50, 100, 200]), f = pick([10, 20, 25, 30, 40, 50]); return { N, f, c: 2 * N * f / 100 }; };
    const v = mk(), nm = pick([["mice", "🐭"], ["beetles", "🪲"], ["rabbits", "🐰"]]);
    let o = mk(); while (o.f === v.f) o = mk();
    return {
      text: `In a group of ${v.N} ${nm[0]}, each animal has 2 copies of a gene. ${v.c} of all the copies are the allele b. What percent of the alleles are b? (type a number)`,
      visual: nm[1], answer: v.f,
      hints: ["First find out how many gene copies there are in the whole group.",
        "Divide the copies of allele b by all the copies, then change the fraction to a percent.",
        `Example: ${o.N} animals have ${2 * o.N} copies. If ${o.c} are allele b, then ${o.c} / ${2 * o.N} = ${o.f / 100}, which is ${o.f} percent. Now do yours.`]
    };
  };

  const spread = () => {
    const mk = () => ({ R: pick([2, 3]), k: ri(2, 4) });
    const v = mk(), o0 = mk();
    const o = (o0.R === v.R && o0.k === v.k) ? { R: v.R === 2 ? 3 : 2, k: 2 } : o0;
    const nm = pick([["birds", "🐦"], ["bats", "🦇"], ["frogs", "🐸"]]);
    return {
      text: `One sick ${nm[0].slice(0, -1)} starts an outbreak. In each round, every newly sick animal infects ${v.R} new animals. How many animals are newly infected in round ${v.k}? Round 1 has 1 newly sick animal. (type a number)`,
      visual: nm[1], answer: v.R ** (v.k - 1),
      hints: ["Each round multiplies the number of newly sick animals by the same number.",
        "Round 1 has 1 animal. Multiply by the spread number once to get round 2, again to get round 3, and so on.",
        `Example: if each sick animal infects ${o.R} others, round 1 has 1, round 2 has ${o.R}, and round ${o.k} has ${o.R ** (o.k - 1)}. Now do yours.`]
    };
  };

  const energy10 = () => {
    const mk = () => ({ E: ri(1, 9) * 10000, n: ri(2, 4) });
    const v = mk(); let o = mk(); while (o.E === v.E && o.n === v.n) o = mk();
    const lv = ["", "", "primary consumer", "secondary consumer", "tertiary consumer"];
    return {
      text: `Plants in a meadow capture ${v.E} units of energy. Using the 10 percent rule, how much energy reaches the ${lv[v.n]} (level ${v.n})? (type a number)`,
      visual: "🌿", answer: v.E / 10 ** (v.n - 1),
      hints: ["Only about one tenth of the energy moves up each time. The rest is used or lost as heat.",
        "Divide by 10 once for each step up from the plants. Plants are level 1.",
        `Example: ${o.E} units at level 1. Level ${o.n} is ${o.n - 1} step${o.n > 2 ? "s" : ""} up, so divide by 10 that many times: ${o.E / 10 ** (o.n - 1)}. Now do yours.`]
    };
  };

  const compose = () => {
    const mk = () => { const T = pick([20, 50, 100]), x = ri(1, 4), y = ri(1, 4); const a = Math.round(T * x / 10), b = Math.round(T * y / 10); return { T, a, b, c: T - a - b }; };
    let v = mk(); while (v.c < 1) v = mk();
    let o = mk(); while (o.c < 1 || o.T === v.T) o = mk();
    const k = ri(0, 2), nmv = ["frogs", "fish", "snails"], key = ["a", "b", "c"][k];
    return {
      text: `A pond sample of ${v.T} animals has ${v.a} frogs, ${v.b} fish and ${v.c} snails. What percent of the sample are ${nmv[k]}? (type a number)`,
      visual: "🏞️", answer: v[key] * 100 / v.T,
      hints: ["A percent is the part divided by the whole, times 100.",
        "The whole is the total sample, not just one kind of animal. Divide the part by the total, then multiply by 100.",
        `Example: 8 of 40 animals are newts. 8 / 40 = 0.2, and 0.2 times 100 is 20 percent. Now do yours.`]
    };
  };

  const magnify = () => {
    const mk = () => ({ r: ri(1, 9), m: pick([10, 20, 40, 100]) });
    const v = mk(); let o = mk(); while (o.r === v.r) o = mk();
    const nm = pick([["an ant leg", "🐜"], ["a fly wing", "🪰"], ["a flea", "🔬"]]);
    return {
      text: `Under a microscope with ${v.m} times magnification, ${nm[0]} looks ${v.r * v.m} mm long on the screen. How long is it in real life, in mm? (type a number)`,
      visual: nm[1], answer: v.r,
      hints: ["The picture is bigger than the real thing. To get the real size, shrink it back.",
        "Real size equals the size you see divided by the magnification.",
        `Example: at ${o.m} times, a speck looks ${o.r * o.m} mm. ${o.r * o.m} / ${o.m} = ${o.r} mm. Now do yours.`]
    };
  };

  const molClock = () => {
    const mk = () => { const r = pick([1, 2, 5]), T = ri(2, 20); return { r, T, D: 2 * r * T }; };
    const v = mk(); let o = mk(); while (o.T === v.T) o = mk();
    return {
      text: `Two related animals differ by ${v.D} DNA changes in a gene. Each separate lineage gains ${v.r} change${v.r > 1 ? "s" : ""} per million years. How many million years ago did they split? (type a number)`,
      visual: "🧬", answer: v.T,
      hints: ["Both lineages have been changing since they split, so both add changes.",
        "Add the changes in both lineages each million years. Then divide the total difference by that number.",
        `Example: ${o.D} changes, ${o.r} per million years in each lineage. Both lineages give ${2 * o.r} per million years, and ${o.D} / ${2 * o.r} = ${o.T} million years. Now do yours.`]
    };
  };

  const lever = () => {
    const mk = () => ({ L: pick([2, 4, 5, 10]), k: ri(3, 6), b: pick([1, 2, 3]) });
    const v = mk(); let o = mk(); while (o.L * o.k === v.L * v.k) o = mk();
    return {
      text: `A muscle pulls on a bone ${v.b} cm from the joint. A load sits ${v.b * v.k} cm from the joint and weighs ${v.L} N. How many N must the muscle pull to hold it still? (type a number)`,
      visual: "💪", answer: v.L * v.k,
      hints: ["A bone is a lever. A force close to the joint must be bigger to balance a load far from the joint.",
        "Muscle force times its distance equals load times its distance. Find the muscle force by dividing.",
        `Example: muscle ${o.b} cm from the joint, load ${o.b * o.k} cm away and ${o.L} N. Muscle force = ${o.L} x ${o.b * o.k} / ${o.b} = ${o.L * o.k} N. Now do yours.`]
    };
  };

  // ================= LEVEL 16 =================
  const a = [];
  a.push(L("Cellular respiration", [
    "Burning food for energy|🔥|<b>Cellular respiration</b> releases energy from food. Cells combine glucose (sugar) with oxygen and make <b>ATP</b>, the energy molecule cells use, plus carbon dioxide and water.",
    "Where it happens|🔋|Most ATP is made in the <b>mitochondria</b>, the powerhouses of animal cells. Busy cells, like flight muscles, have many mitochondria.",
    "Without oxygen|🏃|If oxygen runs short, muscles can still make a little ATP by <b>fermentation</b>. It makes <b>lactic acid</b> and far less energy."
  ], [
    "The energy molecule that cells use is...|ATP|🔋||DNA,RNA",
    "Most ATP is made in the...|mitochondria|🔬||nucleus,cell wall",
    "Cellular respiration uses glucose and...|oxygen|💨||nitrogen,helium",
    "Cellular respiration gives off carbon dioxide and...|water|💧||oxygen,salt",
    "Which cells have the most mitochondria?|flight muscle cells|🐦||fat storage cells,hair cells",
    "Muscles working without enough oxygen make...|lactic acid|🏃||more oxygen,vitamin C",
    "Which makes more ATP from one glucose?|using oxygen|🔥||fermentation,both the same",
    "The food molecule broken down for energy is...|glucose|🍬||chlorophyll,calcium"
  ], "Think about burning fuel in the cell to get usable energy.", "Fuel plus oxygen gives energy, carbon dioxide and water."));
  a.push(L("Enzymes and digestion", [
    "Tiny helpers|🧪|An <b>enzyme</b> is a protein that speeds up a chemical reaction. In digestion, enzymes cut big food molecules into small pieces the blood can carry.",
    "Different jobs|🥣|<b>Amylase</b> in saliva breaks starch into sugars. <b>Proteases</b> break proteins into amino acids. <b>Lipases</b> break fats.",
    "Picky and sensitive|🌡️|Each enzyme fits one kind of molecule, like a key in a lock. Too much heat can change an enzyme's shape so it stops working."
  ], [
    "An enzyme is a kind of...|protein|🧪||sugar,mineral",
    "Enzymes make reactions go...|faster|⚡||slower,backwards only",
    "Amylase breaks down...|starch|🍞||fat,protein",
    "Protease enzymes break down...|protein|🥩||starch,water",
    "Lipase enzymes break down...|fat|🧈||sugar,bone",
    "An enzyme fits one kind of molecule, like a...|key in a lock|🔑||hammer on a nail,sponge in water",
    "Too much heat can make an enzyme...|change shape and stop working|🔥||work twice as fast,turn into sugar",
    "Digestive enzymes cut food into pieces that are...|small enough to absorb|🍽️||bigger than before,full of germs"
  ], "Think about what an enzyme does to food molecules and reactions.", "Match the enzyme name to the food it works on."));
  a.push(L("Carrying oxygen", [
    "Blood carriers|🩸|Many animals use a protein to carry oxygen. Vertebrates use <b>hemoglobin</b>, which has iron and makes blood red.",
    "Blue blood|🦑|Octopuses, squid and many crabs use <b>hemocyanin</b>, which has copper. Their blood looks blue when it carries oxygen.",
    "Special cases|🧊|Insects carry oxygen in tiny tubes instead of blood. Antarctic icefish have almost no hemoglobin at all and live in very cold, oxygen-rich water."
  ], [
    "The oxygen carrier in human and fish blood is...|hemoglobin|🩸||hemocyanin,chlorophyll",
    "Hemoglobin contains the metal...|iron|🧲||copper,gold",
    "Hemocyanin contains the metal...|copper|🦑||iron,silver",
    "An octopus has blood that looks...|blue|🐙||green,purple",
    "Insects carry oxygen using...|tiny tubes|🦗||red blood cells,gills only",
    "Hemoglobin is found inside...|red blood cells|🔴||white blood cells,bones",
    "Which animal is known for having almost no hemoglobin?|icefish|🐟||tuna,salmon",
    "Squid and crabs use hemocyanin to carry...|oxygen|🦀||sugar,sound"
  ], "Think about which metal each carrier uses and which animals have it.", "Iron makes red and copper makes blue."));
  a.push(L("Countercurrent exchange", [
    "Passing in opposite ways|🔄|In <b>countercurrent exchange</b>, two fluids flow in opposite directions next to each other. This lets heat or oxygen move across the whole length.",
    "Fish gills|🐟|In gills, blood flows one way and water flows the other. The blood always meets water with more oxygen, so fish take in much of the oxygen they pass over.",
    "Keeping warm|🐧|Penguin flippers and wolf legs have arteries next to veins. Warm blood going out gives heat to cool blood coming back, so the feet stay cold and little heat is lost."
  ], [
    "In countercurrent exchange, two fluids flow in...|opposite directions|🔄||the same direction,circles only",
    "Fish gills use countercurrent exchange to take in...|more oxygen|🐟||more salt,more sand",
    "In a fish gill, blood and water flow...|in opposite directions|💧||in the same direction,not at all",
    "A penguin's flipper uses it to save...|heat|🐧||sound,water",
    "Warm blood leaving the body gives heat to...|cool blood returning|🩸||the cold air,the ground",
    "Because of this, a penguin's feet stay...|cold|🦶||very hot,glowing",
    "Countercurrent exchange helps animals transfer heat or oxygen...|efficiently|🔄||by making noise,by growing taller",
    "Which uses countercurrent exchange?|a fish gill|🐠||a bird feather,a snail shell"
  ], "Picture two streams flowing past each other in opposite ways.", "Opposite flow keeps a difference all along the path."));
  a.push(L("Sound and frequency", [
    "High and low|🎵|<b>Frequency</b> is how many sound waves pass each second, measured in <b>hertz (Hz)</b>. High frequency makes a high pitch. Low frequency makes a low pitch.",
    "Hearing ranges|👂|People hear about 20 to 20,000 Hz. Dogs hear higher sounds, bats hear very high sounds, and elephants and whales use very low sounds.",
    "Sounds humans cannot hear|🦇|Sound above human hearing is <b>ultrasound</b>. Sound below it is <b>infrasound</b>. Bats use ultrasound to find insects, and elephants use infrasound to talk across long distances."
  ], [
    "Frequency is measured in...|hertz|🎵||liters,newtons",
    "A high-pitched sound has a...|high frequency|🔔||low frequency,no frequency",
    "Sound higher than people can hear is called...|ultrasound|🦇||infrasound,loudsound",
    "Sound lower than people can hear is called...|infrasound|🐘||ultrasound,mid sound",
    "Which animal uses ultrasound to hunt?|bat|🦇||elephant,cow",
    "Which animal talks with infrasound?|elephant|🐘||bat,mouse",
    "A dog whistle works because dogs hear...|higher sounds than people|🐕||lower sounds than people,no sounds",
    "Sound travels as...|waves|🌊||beams of light,heat"
  ], "Think about pitch: high or low, and who can hear it.", "Ultra means above, infra means below."));
  a.push(L("Seeing more colors", [
    "Light we cannot see|🌈|People see <b>visible light</b>. Just beyond violet is <b>ultraviolet (UV)</b>, and beyond red is <b>infrared</b>.",
    "Seeing UV|🐝|Bees, many birds and some butterflies can see UV. Flowers have UV patterns that act like landing guides for bees.",
    "Seeing heat|🐍|Pit vipers and some boas have pit organs that sense infrared heat from warm prey, even in the dark."
  ], [
    "Light just beyond violet is called...|ultraviolet|🌈||infrared,sunlight only",
    "Light just beyond red is called...|infrared|🔴||ultraviolet,radio shadow",
    "Bees can see...|ultraviolet patterns|🐝||no colors at all,only black and white",
    "Pit vipers sense...|heat from prey|🐍||smells in water,magnets",
    "UV patterns on flowers help bees find...|nectar|🌼||water,shelter",
    "Many birds can see more colors than people because they see...|ultraviolet|🐦||ultrasound,x-rays",
    "A snake's pit organ works best at finding...|warm animals|🐭||cold rocks,still water",
    "Which is visible to humans?|red light|🔴||ultraviolet light,infrared heat"
  ], "Think about which colors lie outside what people can see.", "UV is past violet and infrared is past red."));
  a.push(L("Bioluminescence", [
    "Living light|✨|<b>Bioluminescence</b> is light made by a living thing. A chemical reaction makes the glow, with little heat. It is called <b>cold light</b>.",
    "Why glow?|🐙|Animals glow to attract prey or mates, to confuse enemies, or to hide. Anglerfish use a glowing lure. Some squid glow underneath to match the light from above.",
    "Where it happens|🪰|Most glowing animals live in the deep sea. On land, fireflies and some worms glow too."
  ], [
    "Light made by a living thing is called...|bioluminescence|✨||fluorescence,reflection",
    "Bioluminescent light is often called cold light because it makes...|very little heat|🧊||a lot of heat,no light",
    "An anglerfish uses its glowing lure to...|attract prey|🎣||warm its eggs,hear sounds",
    "Where do most glowing animals live?|the deep sea|🌊||deserts,high mountains",
    "A land animal that glows is the...|firefly|🪰||ladybug,honeybee",
    "Some squid glow underneath to match light from...|above|🦑||below,the side",
    "Bioluminescence is made by a...|chemical reaction|🧪||magnet,mirror",
    "Fireflies flash their lights to find...|mates|🪰||sand,ice"
  ], "Think about animals that make their own light and why.", "It is a chemical glow, mostly seen in dark places."));
  a.push(L("Electric and magnetic senses", [
    "Electric fish|⚡|Some fish make electric signals. An <b>electric eel</b> can give a strong shock to stun prey. Smaller electric fish use weak signals to sense nearby objects in muddy water.",
    "Sensing electricity|🦈|Sharks and rays have jelly-filled pores called <b>ampullae of Lorenzini</b> that sense tiny electric fields from hidden prey. Platypuses also sense electric fields.",
    "Magnetic sense|🧭|Sea turtles, many birds and some other animals sense the Earth's <b>magnetic field</b>. It helps them find direction on long trips."
  ], [
    "Sharks sense weak electric fields with...|special pores|🦈||whiskers on the tail,glowing eyes",
    "An electric eel uses a strong shock to...|stun prey|⚡||dig holes,sing",
    "Which mammal can sense electric fields in water?|platypus|🦆||beaver,otter",
    "Many birds and sea turtles sense the Earth's...|magnetic field|🧭||gravity wave,rotation speed",
    "Weak electric fish use signals to sense objects in...|muddy water|🐟||bright sunlight,dry air",
    "A magnetic sense helps animals find...|direction|🧭||new colors,spare food",
    "Rays and sharks find hidden prey partly by sensing...|tiny electric fields|🦈||ocean salt,music",
    "Which fish can stun prey with a strong shock?|electric eel|⚡||goldfish,seahorse"
  ], "Think about which sense uses electricity or magnetism.", "Electric fields point to prey. Magnetic fields point the way."));
  a.push(L("Regeneration", [
    "Growing back|🦎|<b>Regeneration</b> is growing back a lost body part. A lizard can regrow a tail, and a starfish can regrow an arm.",
    "Champions|🪱|A <b>planarian</b> flatworm can regrow its whole body from a small piece. Axolotls, a kind of salamander, can regrow legs, tails and even parts of the heart and brain.",
    "Escape tricks|🦎|Some lizards drop their tails on purpose to escape a predator. This is called <b>autotomy</b>. The tail wriggles and distracts the predator."
  ], [
    "Growing back a lost body part is called...|regeneration|🦎||migration,hibernation",
    "A lizard that drops its tail is using...|autotomy|🦎||photosynthesis,echolocation",
    "A flatworm that regrows its whole body from a piece is a...|planarian|🪱||sparrow,hamster",
    "Which amphibian can regrow legs and tails?|axolotl|🦎||bullfrog,toad",
    "A starfish can regrow a lost...|arm|⭐||eye only,shell",
    "Dropping a tail helps a lizard...|escape a predator|🦖||catch more food,keep warm",
    "A wriggling tail left behind may...|distract the predator|🦎||heal the lizard,scare the sun",
    "Humans can regrow a lost...|part of the liver|🧍||leg,arm"
  ], "Think about animals that can replace lost parts.", "Re means again, and generate means to make."));
  a.push(L("Gut microbes", [
    "Tiny helpers inside|🦠|Every animal's gut is home to trillions of bacteria and other tiny living things called the <b>gut microbiome</b>.",
    "What they do|🐄|Microbes help break down food the animal cannot digest alone, make some vitamins, and crowd out harmful germs. Cows and termites need microbes to digest plant fibers (cellulose).",
    "Sharing microbes|🐨|Baby koalas eat a special soft food from their mother called pap, which gives them the microbes needed to digest eucalyptus leaves."
  ], [
    "The community of microbes in the gut is called the...|gut microbiome|🦠||brain stem,skin layer",
    "Microbes help cows digest...|cellulose|🐄||sand,plastic",
    "Termites rely on gut microbes to digest...|wood|🪵||metal,glass",
    "Baby koalas get gut microbes from their mother's...|pap|🐨||tail,pouch lining",
    "Helpful gut microbes can crowd out...|harmful germs|🛡️||helpful vitamins,all food",
    "This relationship, where both sides gain, is called...|mutualism|🤝||parasitism,predation",
    "Gut microbes may help make some...|vitamins|💊||bones,feathers",
    "Which animal needs gut microbes to digest grass?|cow|🐄||cobra,shark"
  ], "Think about tiny living things inside the gut.", "Both the animal and the microbes get something."));
  a.push(L("Cooperation and kin selection", [
    "Helping family|🐦|Helping relatives pass on shared genes is called <b>kin selection</b>. An animal that helps a sibling raise young still helps its own genes survive.",
    "Helpers at the nest|🐺|In many birds, meerkats and wolves, older young stay and help raise their younger brothers and sisters. They are called <b>helpers</b>.",
    "Working with non-relatives|🦇|Vampire bats share blood meals with roost mates who did not feed, and those bats return the favor later. This is <b>reciprocal altruism</b>: you help me, I help you."
  ], [
    "Helping relatives pass on shared genes is called...|kin selection|👪||sexual selection,migration",
    "A young bird that helps raise its siblings is a...|helper|🐦||predator,parasite",
    "Meerkats take turns acting as a...|lookout|🦡||judge,chef",
    "Behavior where animals trade favors is called...|reciprocal altruism|🤝||camouflage,mimicry",
    "Vampire bats share meals with...|roost mates|🦇||predators,plants",
    "Helping a sibling raise young helps pass on...|shared genes|🧬||new fur,tall legs",
    "Which pair of animals is most closely related?|siblings|👪||neighbors,strangers",
    "In wolf packs, the pack is mostly made of...|a family|🐺||unrelated adults,only males"
  ], "Think about relatives who share many of the same genes.", "Family or favor: why does helping pay off?"));
  a.push(BOTH("The honeybee dance", [
    "Telling the hive|🐝|A forager bee that finds good flowers returns and does a <b>waggle dance</b> on the comb. Other bees follow and learn where to go.",
    "Reading the dance|💃|The direction of the waggle run, measured against straight up, shows the direction of the flowers relative to the sun. A longer waggle means farther away.",
    "A second dance|⭕|If food is very close, a bee does a <b>round dance</b> instead. It tells other bees to search near the hive."
  ], [
    "A bee that finds flowers tells others with a...|waggle dance|🐝||song,flag",
    "A longer waggle run means the food is...|farther away|📏||closer,sweeter",
    "The dance direction is measured against...|straight up on the comb|⬆️||the moon,the hive door",
    "For food very close to the hive, a bee does a...|round dance|⭕||waggle dance,sleep dance",
    "Bees use the position of the sun to...|find direction|☀️||make wax,lay eggs",
    "Other bees learn the location by...|following the dancer|🐝||reading maps,smelling the dancer's wings only",
    "Who figured out the honeybee dance language?|Karl von Frisch|🔬||Charles Darwin,Jane Goodall",
    "The dance happens on the...|honeycomb|🍯||flowers,ground"
  ], "Think about what direction and length are telling the hive.", "A dance gives where, and how far.", () => {
    const mk = () => ({ s: ri(1, 5) });
    const v = mk(); let o = mk(); while (o.s === v.s) o = mk();
    return {
      text: `A forager's waggle run lasts ${v.s} second${v.s > 1 ? "s" : ""}. Bees often count about 1 km of distance for each second of waggle. How many km away is the food? (type a number)`,
      visual: "🐝", answer: v.s,
      hints: ["A longer waggle run means farther food. The rule links seconds to distance.",
        "Use the rule: one second of waggle matches one kilometer. Multiply.",
        `Example: a waggle of ${o.s} seconds with the same rule means ${o.s} km. Now do yours.`]
    };
  }, 0.3));
  a.push(L("Horns, antlers and claws", [
    "Keratin|🐂|<b>Keratin</b> is a tough protein. Hair, nails, claws, hooves, feathers, beaks and horns are all made of keratin.",
    "Horns or antlers?|🦌|<b>Horns</b> (cattle, goats, sheep) have a bone core with a keratin cover and are never shed. <b>Antlers</b> (deer, moose) are solid bone that falls off and regrows each year.",
    "Rhino horn|🦏|A rhinoceros horn is not bone at all. It is made only of keratin, like a giant fingernail."
  ], [
    "Hair and claws are both made mostly of...|keratin|🐾||calcium,starch",
    "Which is shed and regrown each year?|antlers|🦌||horns,claws",
    "Which has a bone core with a keratin cover?|horns|🐂||antlers,feathers",
    "A moose has...|antlers|🫎||horns,tusks",
    "A rhinoceros horn is made of...|keratin|🦏||solid bone,ivory",
    "A bighorn sheep has...|horns|🐏||antlers,fins",
    "Which animal grows antlers?|deer|🦌||cow,goat",
    "Feathers are made of...|keratin|🪶||bone,cartilage"
  ], "Think about what is shed each year and what is kept for life.", "Horns stay. Antlers fall off and regrow."));
  a.push(L("How insects fly", [
    "Tiny wings, big moves|🪰|Insect wings are thin sheets held up by stiff <b>veins</b>. They are not made of feathers or skin like a bat's wing.",
    "Powering the wings|💪|Insects have flight muscles in the <b>thorax</b>. In flies and bees, the muscles squeeze the thorax and the wings flap very fast, hundreds of times a second.",
    "Special flyers|🦟|A mosquito beats its wings about 500 times a second. A dragonfly has two pairs of wings it can move separately, so it can hover and fly backward."
  ], [
    "Insect wings are held up by stiff...|veins|🪰||bones,feathers",
    "Flight muscles of insects are in the...|thorax|🐝||abdomen,head",
    "Which can fly backward?|dragonfly|🦋||housefly,ant",
    "A mosquito beats its wings about...|500 times a second|🦟||5 times a second,once a minute",
    "Insect wings are made of...|thin sheets|🪽||feathers,fur",
    "How many pairs of wings does a dragonfly have?|2|🐉||1,3",
    "An insect's wings are attached to the...|thorax|🪰||leg,antenna",
    "Fast flapping makes a buzzing sound in...|bees|🐝||fish,snails"
  ], "Think about the middle body part and the wing frame.", "Veins hold the wings and the thorax powers them."));
  a.push(BOTH("Population change", [
    "Four things change a group|👥|The size of a population changes with <b>births</b> and <b>immigration</b> (animals moving in), which add animals, and <b>deaths</b> and <b>emigration</b> (animals moving out), which remove them.",
    "The math|➕|New size = start + births - deaths + immigrants - emigrants.",
    "Growth or decline?|📈|If births plus immigrants are more than deaths plus emigrants, the population grows. If less, it shrinks."
  ], [
    "Animals moving into an area is called...|immigration|➡️||emigration,migration only",
    "Animals moving out of an area is called...|emigration|⬅️||immigration,birth",
    "Births and immigration make a population...|bigger|📈||smaller,invisible",
    "Deaths and emigration make a population...|smaller|📉||bigger,faster",
    "A population grows when births plus immigrants are...|more than deaths plus emigrants|⚖️||less than deaths plus emigrants,always zero",
    "If births equal deaths and nobody moves, the population...|stays the same|🟰||doubles,vanishes",
    "Which adds animals to a population?|birth|🐣||death,emigration",
    "Which removes animals from a population?|death|🪦||birth,immigration"
  ], "Which events add animals and which take them away?", "Plus for in, minus for out.", popchange, 0.5));
  a.push(BOTH("Mean, median and range", [
    "Mean|➗|The <b>mean</b> is the average. Add all the numbers and divide by how many there are.",
    "Median and range|📊|The <b>median</b> is the middle number when the list is in order. The <b>range</b> is the biggest number minus the smallest.",
    "Which to use?|🧮|One huge number pulls the mean up, but the median stays steady. The range shows how spread out the data are."
  ], [
    "To find the mean you add the numbers and then...|divide by how many|➗||multiply by two,take the biggest",
    "The middle number in an ordered list is the...|median|📊||mean,range",
    "Biggest minus smallest gives the...|range|📏||mean,mode",
    "The mean is the same as the...|average|⚖️||middle number,biggest number",
    "Which is least changed by one extremely large number?|median|📈||mean,range",
    "The mode is the number that appears...|most often|🔢||least often,in the middle",
    "A small range means the data are...|close together|🎯||far apart,missing",
    "Before finding the median you should...|put the numbers in order|🔢||add the numbers,double each number"
  ], "Pick the measure that matches the name.", "Mean is fair share, median is middle, range is spread.", meanMed, 0.55));
  a.push(BOTH("Metric conversions", [
    "The metric ladder|📏|Metric units change by tens. <b>Kilo</b> means 1000, <b>centi</b> means one hundredth, and <b>milli</b> means one thousandth.",
    "Going down or up|🔁|From a big unit to a small unit, multiply. From a small unit to a big unit, divide. 2 kg is 2000 g, and 3000 m is 3 km.",
    "In the field|🧪|Biologists measure mass in grams and kilograms, length in millimeters, centimeters, meters and kilometers, and liquids in milliliters and liters."
  ], [
    "How many grams are in 1 kilogram?|1000|⚖️||100,10",
    "How many centimeters are in 1 meter?|100|📏||10,1000",
    "How many millimeters are in 1 centimeter?|10|📐||100,1000",
    "How many meters are in 1 kilometer?|1000|🛣️||100,10",
    "To change kilometers to meters, you...|multiply|✖️||divide,subtract",
    "To change grams to kilograms, you...|divide|➗||multiply,add",
    "Milli means...|one thousandth|🔬||one thousand,one hundred",
    "A frog that is 50 mm long is how many cm long?|5|🐸||50,500"
  ], "Think about which unit is bigger.", "Bigger unit to smaller unit means multiply.", metric, 0.55));
  a.push(BOTH("Percent change", [
    "Change by a percent|%|A <b>percent</b> is a part out of 100. To increase 40 by 25 percent, find a quarter of 40, which is 10, and add it to get 50.",
    "Going down|📉|To decrease, take the part away instead. Decrease 40 by 25 percent: 40 minus 10 is 30.",
    "In nature|🐸|Biologists use percent change to describe how groups of animals grow or shrink from year to year."
  ], [
    "Percent means out of...|100|%||10,1000",
    "50 percent of a group is the same as...|half|½||a quarter,double",
    "25 percent of a group is the same as...|one quarter|¼||one half,one third",
    "A group of 100 animals grows by 10 percent. It gains how many?|10|📈||1,100",
    "If a group of 200 shrinks by 50 percent, it loses...|100|📉||50,150",
    "A decrease of 100 percent would leave...|none|⚠️||half,double",
    "To increase a number by a percent you...|add the part|➕||take the part away,ignore the part",
    "If a group doubles, it grows by...|100 percent|✌️||50 percent,200 percent"
  ], "Find the part first, then add it or subtract it.", "10 percent is a tenth.", pctChange, 0.55));
  a.push(MIX("Mixed practice", a.slice(0, 18)));
  a.push(MIX("Level 16 Challenge", a.slice(0, 18).reverse()));

  // ================= LEVEL 17 =================
  const b = [];
  b.push(L("From gene to protein", [
    "The code|🧬|A <b>gene</b> is a stretch of DNA that holds instructions for making a protein. DNA is made of four letters (A, T, C, G).",
    "Copy and build|🧱|First the cell makes a copy of the gene called <b>mRNA</b> (transcription). Then a ribosome reads the mRNA and builds the protein from amino acids (<b>translation</b>).",
    "Why it matters|🐆|Proteins build and run the body, from fur color to enzymes. A change in a gene can change a protein, and that can change a trait."
  ], [
    "A stretch of DNA with instructions for a protein is a...|gene|🧬||ribosome,mineral",
    "Copying DNA into mRNA is called...|transcription|📝||translation,digestion",
    "Building a protein from mRNA is called...|translation|🧱||transcription,mutation",
    "Proteins are built from...|amino acids|🔗||sugars,vitamins",
    "The cell part that reads mRNA to build protein is the...|ribosome|🔬||nucleus,cell wall",
    "DNA is written with how many different letters?|4|🧬||2,20",
    "Enzymes are made of...|protein|🧪||fat,starch",
    "A change in a gene can change a...|protein|🧬||whole planet,the weather"
  ], "Think of the order: DNA, then RNA, then protein.", "Transcribe means copy. Translate means build from the copy."));
  b.push(BOTH("Allele frequency", [
    "Counting alleles|🔢|An <b>allele frequency</b> tells how common an allele is in a whole population. Count the copies of the allele and divide by all copies of the gene.",
    "Why it changes|📊|Evolution is a change in allele frequency over generations. Natural selection, chance, mutation and gene flow can all change it.",
    "Example|🐭|In 50 mice, there are 100 copies of a gene. If 20 copies are allele b, the frequency of b is 20 / 100 = 0.20, or 20 percent."
  ], [
    "Allele frequency tells how common an allele is in a...|population|👥||single cell,single day",
    "Evolution is a change in allele frequency over...|generations|⏳||minutes,a lunch break",
    "A population of 10 animals has how many copies of a gene (2 each)?|20|🧬||10,5",
    "If 5 of 20 gene copies are allele B, the frequency is...|25%|🔢||5%,50%",
    "Frequencies of all alleles of one gene add up to...|100 percent|➕||50 percent,10 percent",
    "Chance changes in small populations are called...|genetic drift|🎲||natural selection,migration",
    "Animals moving between populations and bringing alleles is called...|gene flow|➡️||mutation,drift",
    "The raw source of brand-new alleles is...|mutation|🧬||gene flow,exercise"
  ], "Count the copies, then divide by all copies.", "Frequency is part over whole.", alleleFreq, 0.5));
  b.push(L("Hybrids and ring species", [
    "Hybrids|🐴|A <b>hybrid</b> is the young of two different species or kinds. A mule is the young of a horse mother and a donkey father. Mules are usually sterile, which means they cannot have young.",
    "Species and breeding|🐅|A common idea of a species is a group that can breed with each other and have fertile young. A liger (lion and tiger) can happen in captivity, but not in the wild.",
    "A ring of populations|💍|In a <b>ring species</b>, neighbors around a ring can interbreed, but the two ends of the ring cannot. Greenish warblers around the Himalayas are an example."
  ], [
    "The young of two different species is a...|hybrid|🐴||clone,twin",
    "A mule has a horse mother and a...|donkey father|🫏||zebra father,cow father",
    "Mules are usually...|sterile|🐴||twice as large as horses,not real animals",
    "Sterile means unable to...|have young|🚫||see,run",
    "A common idea of a species is a group that can...|breed and have fertile young|🧬||swim fast,live in zoos",
    "In a ring species, the two ends of the ring...|cannot interbreed|💍||look the same,live in zoos",
    "A liger has a lion and a...|tiger parent|🐅||leopard parent,bear parent",
    "Ring species help show how...|new species can form|🌍||animals shrink,seas rise"
  ], "Think about two kinds mixing and whether their young can have young.", "Hybrid means mixed."));
  b.push(L("How sex is determined", [
    "Chromosomes decide|🧬|In mammals, females are <b>XX</b> and males are <b>XY</b>. The father's sperm decides: carrying X or Y.",
    "Birds are different|🐔|In birds, males are <b>ZZ</b> and females are <b>ZW</b>. The mother's egg decides.",
    "Temperature decides|🐢|In many reptiles, such as sea turtles and crocodiles, the <b>temperature</b> of the nest decides if hatchlings are male or female. In sea turtles, warm nests make more females."
  ], [
    "In mammals, males are...|XY|♂️||XX,ZZ",
    "In mammals, females are...|XX|♀️||XY,ZW",
    "In birds, females are...|ZW|🐔||ZZ,XY",
    "In mammals, which parent's sperm decides the sex?|father|🧬||mother,neither",
    "In many reptiles, what decides the sex?|nest temperature|🌡️||food type,moon color",
    "Warm sea turtle nests produce more...|females|🐢||males,eggs only",
    "Clownfish can change sex. This is useful because...|a group may lose its female|🐠||all fish are the same,the sea is salty",
    "In birds, which parent's egg decides the sex?|mother|🥚||father,both equally"
  ], "Think about which chromosomes each animal has.", "Mammals XX/XY. Birds ZZ/ZW."));
  b.push(L("Inbreeding and diversity", [
    "Mating with relatives|👪|<b>Inbreeding</b> is breeding among close relatives. It can bring together harmful recessive alleles that were hidden before.",
    "Small populations|🐆|When a population gets very small, there are fewer different alleles. Less <b>genetic diversity</b> means less chance that some animals can survive a new disease or change.",
    "The Florida panther|🐈|In the 1990s, only a few Florida panthers were left, and many had health problems. Adding panthers from Texas brought in new genes and helped the population recover."
  ], [
    "Breeding between close relatives is called...|inbreeding|👪||crossbreeding,migration",
    "Inbreeding can bring together harmful...|recessive alleles|🧬||dominant colors,sounds",
    "Low genetic diversity makes a population...|more at risk|⚠️||stronger,louder",
    "Genetic diversity means many different...|alleles|🌈||predators,seasons",
    "The Florida panther was helped by adding panthers from...|Texas|🐆||Alaska,Brazil",
    "Small populations lose diversity because...|there are fewer animals to carry alleles|🔢||animals stop growing,the sea dries up",
    "More diversity helps a species survive a new...|disease|🦠||sunrise,season name",
    "A population with very little diversity has a higher chance of...|dying out|🐾||growing faster,gaining colors"
  ], "Think about what a small, related group is missing.", "More different genes means more ways to survive."));
  b.push(L("Selective breeding and gene editing", [
    "Choosing parents|🐕|<b>Selective breeding</b> means people choose animals with wanted traits to be parents. Over many generations dogs, cattle and chickens were bred for different jobs.",
    "Editing genes|✂️|<b>Genetic engineering</b> changes the genes in a living thing directly. Scientists have edited genes in mice and farm animals to study diseases or add useful traits.",
    "Big questions|🤔|People ask about animal welfare, safety, and effects on nature. Careful rules, testing and honest discussion help decide what is right."
  ], [
    "Choosing parents with wanted traits is called...|selective breeding|🐕||camouflage,migration",
    "Dogs came from wolves mostly by...|selective breeding|🐺||genetic drift,magic",
    "Changing the genes directly is called...|genetic engineering|✂️||natural selection,hibernation",
    "Selective breeding works over many...|generations|⏳||minutes,eggs",
    "A good question to ask about gene editing is...|is it safe and fair to animals?|🤔||what color is the lab?,who is fastest?",
    "Both selective breeding and natural selection depend on...|variation|🌈||money,speed",
    "The difference is that in selective breeding, the chooser is...|people|🧑‍🌾||the weather,predators",
    "Farmers choose cows that give more milk. This is...|selective breeding|🐄||gene flow,extinction"
  ], "Think about who is choosing: people or nature.", "People choose parents in selective breeding."));
  b.push(L("Body clocks", [
    "Daily rhythm|⏰|A <b>circadian rhythm</b> is a body cycle of about 24 hours. It controls sleep, body temperature and hormones.",
    "Light as a cue|🌅|Light tells the brain what time it is. The hormone <b>melatonin</b> rises in darkness and helps animals feel sleepy.",
    "Seasons too|🍂|Many animals also track the length of days (<b>photoperiod</b>) to know when to breed, grow winter fur or migrate."
  ], [
    "A circadian rhythm lasts about...|24 hours|⏰||1 week,1 year",
    "The hormone that rises in darkness is...|melatonin|🌙||adrenaline,insulin",
    "A strong cue that sets the body clock is...|light|🌅||sand,sound of rain",
    "Length of the day is called...|photoperiod|☀️||predation,food chain",
    "Short days in autumn tell some animals to grow...|winter fur|🦊||new feathers in summer,extra legs",
    "A rhythm that follows the seasons is called...|annual|🍂||hourly,never",
    "Animals active at night are called...|nocturnal|🦉||diurnal,seasonal",
    "Animals kept in constant dim light still show rhythms. This shows the clock is...|inside the body|🧬||only the weather,the TV"
  ], "Think about daily cycles and the light they follow.", "Circa means about, dies means day."));
  b.push(L("Animals and human disease", [
    "Zoonotic diseases|🦠|A <b>zoonotic disease</b> is one that can pass from animals to people. Rabies, Lyme disease and some flu viruses are examples.",
    "Vectors|🦟|A <b>vector</b> is an animal that carries a germ from one host to another without being sick itself. Mosquitoes spread malaria, and ticks spread Lyme disease.",
    "Staying safe|🧼|Vaccines, clean water, washing hands, insect repellent and caring for wildlife habitats all lower the risk."
  ], [
    "A disease that can pass from animals to people is...|zoonotic|🦠||seasonal,wild",
    "An animal that carries germs from host to host is a...|vector|🦟||producer,predator",
    "Which animal spreads Lyme disease?|tick|🕷️||frog,rabbit",
    "Which animal spreads malaria?|mosquito|🦟||tick,fly",
    "Rabies can be prevented in pets with a...|vaccine|💉||haircut,snack",
    "One way to lower the risk of mosquito-borne disease is to...|remove standing water|💧||feed mosquitoes,leave buckets full",
    "Washing hands after touching animals helps stop...|germs spreading|🧼||animals growing,rain",
    "A scientist who studies how diseases spread is an...|epidemiologist|🔬||entomologist,geologist"
  ], "Think about how germs travel from animals to people.", "Vector means carrier."));
  b.push(BOTH("How outbreaks grow", [
    "Spreading by rounds|🔁|If each sick animal infects 2 others, cases double each round: 1, 2, 4, 8, 16. This is <b>exponential growth</b>.",
    "Slowing the spread|🛑|Vaccination, distance and quarantine lower how many each sick animal infects. If the number drops below 1, the outbreak fades away.",
    "Reading the number|🔢|Scientists call this spread number <b>R</b>. If R is more than 1 the outbreak grows. If R is less than 1 it shrinks."
  ], [
    "If each sick animal infects 2 others, cases...|double each round|✌️||stay the same,drop by half",
    "The growth 1, 2, 4, 8, 16 is called...|exponential growth|📈||steady growth,shrinking",
    "An outbreak grows when R is...|more than 1|📈||less than 1,zero",
    "An outbreak fades away when R is...|less than 1|📉||more than 1,exactly 10",
    "Vaccination helps by lowering...|the spread number|💉||the temperature,body size",
    "Keeping sick animals apart from others is called...|quarantine|🚧||migration,breeding",
    "If every sick animal infects 3 others, round 2 has how many new cases?|3|🔢||2,6",
    "If R is exactly 1, the number of cases stays...|about the same|🟰||doubling,at zero"
  ], "Think about multiplying by the spread number each round.", "Cases times R gives the next round.", spread, 0.5));
  b.push(BOTH("Energy transfer math", [
    "The 10 percent rule|⚡|Only about 10 percent of the energy at one trophic level reaches the next. The rest is used for living or lost as heat.",
    "Dividing by ten|➗|If plants have 10,000 units, herbivores get about 1,000, small carnivores about 100, and top predators about 10.",
    "Why top predators are few|🦅|Energy runs out, so there are fewer animals at the top and food chains rarely have more than four or five levels."
  ], [
    "About how much energy passes to the next level?|10 percent|⚡||50 percent,90 percent",
    "What happens to most of the energy at each level?|used or lost as heat|🔥||saved forever,turned into plants",
    "If grass has 1000 units, herbivores get about...|100|🐄||10,500",
    "If herbivores have 500 units, the carnivores that eat them get about...|50|🦁||5,250",
    "Food chains rarely have more than five levels because...|energy runs out|🔋||animals refuse to eat,plants stop growing",
    "A pyramid with a wide base and narrow top shows...|energy|🔺||temperature,sound",
    "Which level has the most energy?|producers|🌿||top predators,decomposers only",
    "Which are fewer, usually?|top predators|🦅||plants,insects"
  ], "Divide by ten for each step up.", "Plants start at level 1.", energy10, 0.5));
  b.push(L("Trophic cascades", [
    "A chain reaction|🐺|A <b>trophic cascade</b> is a chain of effects that starts when top predators are added or removed.",
    "Yellowstone wolves|🌲|After wolves were returned to Yellowstone in 1995, elk changed where they grazed. Young willow and aspen trees grew back along streams, and beavers and birds benefited.",
    "Sea otters|🦦|Sea otters eat sea urchins. Where otters disappear, urchins multiply and chew down kelp forests. Where otters return, kelp grows back."
  ], [
    "A chain of effects started by top predators is a...|trophic cascade|🔗||food label,migration route",
    "Wolves returned to Yellowstone in...|1995|🐺||1795,2025",
    "After wolves returned, elk changed where they...|grazed|🦌||slept in winter,hid eggs",
    "Sea otters eat sea urchins, which protects...|kelp forests|🌿||coral sand,desert plants",
    "Without otters, sea urchins would...|increase|🦔||vanish,become kelp",
    "Predators can help young trees grow by...|keeping herbivores moving|🌳||planting seeds themselves,making rain",
    "Top predators affect plants indirectly. This is...|a cascade|🔗||a coincidence,a vaccine",
    "Beavers benefited from more...|young willows|🦫||sand dunes,ice"
  ], "Think about what changes when a top predator comes or goes.", "A change at the top reaches the bottom."));
  b.push(BOTH("Sampling and percent composition", [
    "Samples|🧺|Scientists cannot count every animal, so they study a <b>sample</b>, a small part that stands for the whole.",
    "A good sample|🎯|A sample should be big enough and chosen without bias. A <b>random</b> sample gives every part of the area the same chance of being picked.",
    "Percent of sample|%|Part divided by whole times 100 gives the percent. If 8 of 40 animals are newts, then 20 percent are newts."
  ], [
    "A small part chosen to stand for the whole is a...|sample|🧺||census,family",
    "A bigger sample usually gives results that are...|more reliable|🎯||less reliable,always wrong",
    "Choosing sample spots by chance is called...|random sampling|🎲||bias,guessing",
    "Studying only the easiest-to-reach places can add...|bias|⚠️||data,mass",
    "To find percent of a sample you divide the part by the...|whole|➗||smallest,largest",
    "If 10 of 50 animals in a sample are beetles, the percent is...|20|🪲||10,50",
    "If 25 of 50 animals are ants, the percent is...|50|🐜||25,75",
    "A sample of only one pond can not show the whole...|region|🏞️||pond,drop"
  ], "A sample stands for a larger whole.", "Part over whole, times one hundred.", compose, 0.45));
  b.push(L("Animals and a warming climate", [
    "Moving to cooler places|🌡️|As climates warm, many animals move toward the poles or up mountains to stay in the temperatures they need. This is a <b>range shift</b>.",
    "Timing changes|📅|Spring comes earlier in many places. Some birds lay eggs earlier. Problems happen if insects hatch at a different time than the chicks that eat them. This timing mismatch is a change in <b>phenology</b>.",
    "Those who cannot move|🐻‍❄️|Ice-dependent animals such as polar bears lose hunting platforms when sea ice shrinks, and animals at mountaintops run out of cooler land."
  ], [
    "A shift in where a species lives is a...|range shift|🗺️||food chain,life cycle",
    "As the world warms, many animals move toward the...|poles|🧭||equator,center of Earth",
    "The timing of seasonal events is called...|phenology|📅||geology,anatomy",
    "A mismatch can happen when chicks hatch before...|their insect food is out|🐣||the sun rises,their parents arrive",
    "Polar bears hunt from...|sea ice|🐻‍❄️||tree branches,sand",
    "Mountain animals that move uphill may run out of...|cooler land|⛰️||water vapor,gravity",
    "Many butterflies and birds now arrive in spring...|earlier|🦋||later in winter,on the same day always",
    "Which is a warming effect on oceans?|coral bleaching|🪸||more snow,new volcanoes"
  ], "Think about animals following their favorite temperatures.", "Warmer means moving to cooler spots."));
  b.push(L("Tides and the shore", [
    "High tide, low tide|🌊|<b>Tides</b> are the rise and fall of the sea caused mostly by the Moon's gravity. Most coasts have two high tides and two low tides each day.",
    "Zones on the shore|🦀|The <b>intertidal zone</b> is covered by water at high tide and dry at low tide. Animals there must deal with waves, heat, drying and changing salt.",
    "Clever shore animals|🐚|Barnacles and mussels clamp shut to keep water in. Crabs hide under rocks. Sea stars cling to rocks with tube feet."
  ], [
    "Tides are mostly caused by the pull of the...|Moon|🌙||wind,Sun's color",
    "Most coasts have how many high tides a day?|2|🌊||1,4",
    "The area between high and low tide is the...|intertidal zone|🏖️||deep sea,desert",
    "Barnacles close up at low tide to keep from...|drying out|🐚||getting wet,growing",
    "A tide pool is a pool left behind at...|low tide|🕳️||high tide,noon only",
    "Crabs in the intertidal zone often hide...|under rocks|🦀||in clouds,in trees",
    "Intertidal animals must handle...|waves and drying|🌊||only snow,constant darkness",
    "Sea stars cling to rocks using...|tube feet|⭐||suction cups on arms only,hooks"
  ], "Think about the water coming in and going out twice a day.", "The Moon pulls the water."));
  b.push(L("Kinds of fossils", [
    "Body fossils|🦴|A <b>body fossil</b> is part of the animal itself, such as bones, teeth and shells turned to stone. Soft parts are rarely saved.",
    "Molds and casts|🐚|A <b>mold</b> is a hollow shape left when a shell dissolves. A <b>cast</b> forms when the hollow fills with minerals and makes a copy.",
    "Trace fossils|👣|A <b>trace fossil</b> shows what an animal did, such as footprints, burrows and fossil poop. Amber can trap an insect whole."
  ], [
    "Footprints in stone are what kind of fossil?|trace fossil|👣||body fossil,cast",
    "A hollow shape left by a shell is a...|mold|🕳️||cast,gem",
    "A fossil that is a copy made when a mold fills in is a...|cast|🐚||mold,trace fossil",
    "Bones turned to stone are...|body fossils|🦴||trace fossils,molds only",
    "Insects can be preserved whole in...|amber|🪲||sand,snow rarely",
    "A fossil burrow shows how an animal...|behaved|🐛||looked in color,tasted",
    "Soft parts of an animal are usually...|not preserved|🪱||preserved best,harder than bone",
    "Fossils are found mostly in...|sedimentary rock|🪨||volcano lava,metal ore"
  ], "Think about whether it shows the animal itself or what it did.", "Body, mold or cast, trace."));
  b.push(L("Evolution of flight", [
    "Flight evolved four times|🪽|Flying animals did not come from one flying ancestor. Wings evolved separately in <b>insects</b>, <b>pterosaurs</b>, <b>birds</b> and <b>bats</b>.",
    "Different wings|🦇|A bat wing is skin stretched over long finger bones. A bird wing uses feathers attached to arm bones. A pterosaur wing was skin held by one very long finger.",
    "Same job, different design|✈️|Wings evolving separately for the same job is an example of <b>convergent evolution</b>."
  ], [
    "How many times did powered flight evolve in animals?|4|🪽||1,10",
    "A bat's wing is skin stretched over long...|finger bones|🦇||feathers,scales",
    "A bird's wing surface is made of...|feathers|🐦||skin only,scales",
    "Pterosaurs were...|flying reptiles|🦖||birds,mammals",
    "Wings that evolved separately show...|convergent evolution|🔀||inbreeding,migration",
    "Which animal is a flying mammal?|bat|🦇||pterosaur,sparrow",
    "Which group had wings first?|insects|🦟||birds,bats",
    "Birds are most closely related to...|small feathered dinosaurs|🦕||bats,flying fish"
  ], "Think about different groups finding flight on their own.", "Four separate inventions."));
  b.push(L("Climate rules for body shape", [
    "Bergmann's rule|🐻|Within a kind of animal, bodies tend to be <b>larger in colder places</b>. A big body has less surface for its size, so it loses less heat.",
    "Allen's rule|🐇|Animals in cold places tend to have <b>shorter ears and limbs</b>. Arctic hares have short ears, while desert jackrabbits have very long ones to lose heat.",
    "Remember|🧭|These are tendencies, not strict laws. They show how heat balance shapes bodies."
  ], [
    "Bergmann's rule says bodies are larger in...|colder places|❄️||hotter places,deep caves only",
    "Allen's rule says animals in cold places have...|shorter ears and limbs|🐇||longer ears and limbs,no ears",
    "A big body loses heat more slowly because it has less...|surface for its size|🔥||fur,blood",
    "Which would likely have bigger ears?|a desert fox|🦊||an arctic fox,a polar bear",
    "Long ears help animals in hot places to...|lose heat|👂||make heat,hear less",
    "Large ears on an elephant help it...|cool off|🐘||keep warm,dive deeper",
    "Which is larger on average?|a polar bear|🐻‍❄️||a sun bear,a honey badger",
    "Bergmann's and Allen's rules are about...|heat balance|⚖️||speed,color"
  ], "Think about surface area and heat loss.", "Cold means chunky and compact."));
  b.push(L("Citizen science", [
    "Science for everyone|🧑‍🔬|In <b>citizen science</b>, people help researchers by collecting data, like counting birds at a feeder or logging frog calls in a pond.",
    "Why it helps|📋|Thousands of observers can cover a huge area and many years. Scientists check data to remove mistakes.",
    "Doing it well|✅|Good notes include what you saw, where, when and how many. Take care not to disturb animals, and ask an adult before you join online projects."
  ], [
    "Everyday people helping scientists collect data is...|citizen science|🧑‍🔬||fiction,hobby only",
    "A benefit is that many people can cover...|a huge area|🗺️||no time,only one lab",
    "Good notes should include what, where, when and...|how many|📝||what you ate,your mood",
    "Scientists check citizen data to remove...|mistakes|✅||all animals,rainfall",
    "While observing animals you should...|not disturb them|🤫||chase them,feed them candy",
    "Before joining an online project you should ask...|an adult|🧑‍🏫||a stranger,a chatroom",
    "Counting birds at a feeder over many winters can show...|changes in bird numbers|🐦||the price of seeds,colors of cars",
    "Data from many years is called...|long-term data|📆||one-day data,guesses"
  ], "Think about how many careful observers help.", "Notes need what, where, when, how many."));
  b.push(MIX("Mixed practice", b.slice(0, 18)));
  b.push(MIX("Level 17 Challenge", b.slice(0, 18).reverse()));

  // ================= LEVEL 18 =================
  const c = [];
  c.push(L("Nutrients and diets", [
    "Six kinds of nutrients|🍽️|Animals need <b>carbohydrates</b> (quick energy), <b>proteins</b> (growth and repair), <b>fats</b> (stored energy), <b>vitamins</b>, <b>minerals</b> and <b>water</b>.",
    "Energy per gram|⚖️|Fat stores about twice as much energy per gram as carbohydrates or proteins. That is why migrating birds and hibernating bears build up fat.",
    "Special diets|🐼|Carnivores need lots of protein. Herbivores eat large amounts of plants because plants give less energy per bite. Many animals need certain amino acids and vitamins from their food."
  ], [
    "Which nutrient gives the most energy per gram?|fat|🧈||protein,water",
    "Which nutrient builds and repairs body tissue?|protein|🥩||water,vitamin C",
    "Which gives quick energy?|carbohydrates|🍞||minerals,fiber alone",
    "Hibernating bears store energy mainly as...|fat|🐻||bone,vitamins",
    "Calcium is a kind of...|mineral|🦴||vitamin,protein",
    "Which nutrient is not a source of energy?|water|💧||fat,carbohydrate",
    "Why do herbivores eat large amounts of plants?|plants give less energy per bite|🐄||plants are poisonous,they are bored",
    "Migrating birds build up extra...|fat|🐦||bones,feathers only"
  ], "Think about which nutrient is for fuel, which is for building.", "Fat is the densest fuel."));
  c.push(L("Buoyancy", [
    "Floating and sinking|🎈|Water pushes up on anything in it. This upward push is called <b>buoyancy</b>. If an animal is less dense than water it floats. If it is denser, it sinks.",
    "Swim bladder|🐟|Most bony fish have a <b>swim bladder</b>, a gas-filled sac. By adding or removing gas, a fish can float at any depth without swimming.",
    "No swim bladder|🦈|Sharks have none. They have a huge oil-filled liver that is lighter than water, and they use their fins to lift themselves as they swim."
  ], [
    "The upward push of water is called...|buoyancy|🎈||gravity,friction",
    "An animal that is less dense than water will...|float|🦆||sink,melt",
    "The gas-filled sac in bony fish is the...|swim bladder|🐟||stomach,gill",
    "A fish adds gas to its swim bladder to...|rise|⬆️||sink,hide",
    "Sharks do not have a...|swim bladder|🦈||liver,heart",
    "A shark's liver helps it float because it is full of...|oil|🛢️||rocks,sugar",
    "A submarine fills tanks with water to...|sink|🚢||float higher,sing",
    "A fish with more gas in its swim bladder is...|less dense|🐠||more dense,heavier than a rock"
  ], "Think about density: lighter than water floats.", "More gas inside makes the fish lighter for its size."));
  c.push(L("Drag and streamlining", [
    "Moving through fluids|🌬️|Air and water resist movement. This resistance is called <b>drag</b>. Faster speeds mean more drag.",
    "Streamlined shapes|🐬|A smooth, tapered shape like a dolphin, tuna or falcon reduces drag. It lets the animal move fast with less effort.",
    "Tricks to reduce drag|🐧|Penguins release tiny air bubbles from their feathers to move faster. Birds in V formation save energy by flying in the air lifted by the bird ahead."
  ], [
    "Resistance to moving through air or water is...|drag|🌬️||lift,gravity",
    "A streamlined body has...|less drag|🐬||more drag,no weight",
    "Which shape reduces drag the most?|smooth and tapered|✈️||square and flat,spiky",
    "Faster speeds make drag...|bigger|⏩||smaller,disappear",
    "Birds flying in V formation can save...|energy|🦆||nests,feathers",
    "A tuna's shape is...|streamlined|🐟||boxy,star-shaped",
    "Falcons dive with wings tucked to reduce...|drag|🦅||eggs,hunger",
    "A smooth body surface helps an animal...|slip through water|🐬||sink,hide"
  ], "Think about what slows movement through air or water.", "Smooth and pointed slips through."));
  c.push(BOTH("Levers in the body", [
    "Bones as levers|🦴|A <b>lever</b> is a bar that turns around a point called the pivot. In your arm, the elbow joint is the pivot, bones are the bars and muscles pull.",
    "Strength or speed|💪|A muscle attached close to the joint makes the limb swing a long way fast, but the muscle has to pull hard. A muscle attached farther from the joint gives more force with less speed.",
    "Examples|🐆|Fast runners like cheetahs have muscles close to the joints in the legs for speed. Digging animals like moles have muscles attached far out to push with more power."
  ], [
    "The fixed turning point of a lever is the...|pivot|⚙️||load,muscle only",
    "In the arm, the elbow joint is the...|pivot|💪||load,effort",
    "The muscle supplies the...|effort|💪||pivot,load",
    "Fast runners have muscles attached close to the...|joint|🐆||toes,foot pad",
    "A muscle close to the joint must pull... to hold a load far away|harder|💪||more softly,less",
    "Bones that act as bars in a lever are...|rigid|🦴||liquid,soft",
    "Muscles can only...|pull|🔗||push,blow",
    "Joints are where two bones...|meet|🦴||dissolve,freeze"
  ], "Pivot, bar, effort and load. Which part is which?", "Muscles pull, joints pivot.", lever, 0.5));
  c.push(L("Arms races", [
    "Predators and prey keep up|🏁|An <b>evolutionary arms race</b> is a back-and-forth where a change in one species causes a change in another. Faster prey are caught by faster predators.",
    "The Red Queen|♟️|The <b>Red Queen idea</b> says species must keep evolving just to survive against changing enemies, like running to stay in the same place.",
    "Examples|🐍|Some garter snakes resist the poison of newts, and some newts have evolved even stronger poison. Plants make bitter chemicals, and some insects evolve ways to cope with them."
  ], [
    "A back-and-forth evolution between enemies is a...|arms race|🏁||food web,migration",
    "In an arms race, faster prey leads to...|faster predators|🐆||slower predators,no predators",
    "The Red Queen idea says species must keep evolving to...|survive|♟️||sleep,be bigger",
    "Newts with stronger poison are matched by garter snakes with more...|resistance|🐍||speed,legs",
    "Plants make bitter chemicals to...|discourage plant eaters|🌿||attract rain,make sound",
    "An arms race happens over many...|generations|⏳||days,seconds",
    "Arms races involve species that...|affect each other|🔄||never meet,live on different planets",
    "In arms races, change in one species is a pressure on the...|other species|🔀||ocean tides,moon"
  ], "Think about both sides evolving in reply to each other.", "Each side answers the other's change."));
  c.push(L("Hawks, doves and strategies", [
    "Fight or share?|🕊️|Scientists use simple models of strategies. A <b>hawk</b> always fights for food or territory. A <b>dove</b> displays and retreats. These are strategies, not real birds.",
    "Costs and benefits|⚖️|Fighting wins food but can cause injury. Two hawks meeting often get hurt. A world of all doves wastes nothing, but a hawk could take advantage.",
    "A balance|🎯|The best strategy depends on what others do. Often a mix of strategies is stable, and animals usually settle fights with displays before real harm."
  ], [
    "In the model, a strategy that always fights is called a...|hawk|🦅||dove,sparrow",
    "In the model, a strategy that displays and retreats is a...|dove|🕊️||hawk,eagle",
    "Two hawks fighting often lead to...|injury|🩹||sharing,rest",
    "A group of only doves could be taken advantage of by a...|hawk|🦅||dove,pigeon",
    "The best strategy often depends on what... do|others|👥||plants,clouds",
    "Many animals settle fights by...|displays|🦌||fighting to the end,hiding forever",
    "Fighting has a cost of energy and...|risk of injury|⚔️||new fur,food stores",
    "A model in science is a simplified way to...|understand a pattern|🧠||hide a pattern,break the lab"
  ], "Think about costs and benefits when two animals meet.", "A strategy depends on others."));
  c.push(L("Mating systems", [
    "Who pairs with whom|👫|<b>Monogamy</b> means one male and one female pair up. <b>Polygyny</b> means one male mates with several females. In <b>polyandry</b> one female pairs with several males.",
    "Examples|🐧|Many songbirds and wolves form pairs. Elephant seals and deer are polygynous. In jacanas (water birds), the female has several male mates who tend the nests.",
    "Why it matters|🍼|The system affects which animals care for young and how males and females look. Where males compete fiercely, they are often larger or more colorful."
  ], [
    "One male and one female pairing is...|monogamy|💞||polygyny,polyandry",
    "One male mating with several females is...|polygyny|🦌||monogamy,polyandry",
    "One female with several males is...|polyandry|🪿||polygyny,monogamy",
    "Elephant seals are...|polygynous|🦭||monogamous,polyandrous",
    "Male jacanas usually take care of...|the nests|🪺||the food,the sea",
    "Where males compete a lot, males are often...|larger or more colorful|🦚||smaller and plain,silent",
    "Most songbirds form...|pairs|🐦||large herds,hives",
    "The mating system affects who...|cares for young|🍼||wins the race,builds roads"
  ], "Poly means many. Mono means one.", "Gyn means female, andr means male."));
  c.push(L("DNA in the water", [
    "Clues left behind|🧪|Animals shed bits of skin, mucus and waste. <b>Environmental DNA (eDNA)</b> is DNA collected from water, soil or air instead of from the animal.",
    "How it works|🔬|A scientist filters a water sample, copies the DNA and compares it with known sequences to see which species were nearby. It can find rare animals without catching them.",
    "DNA barcoding|🏷️|A short, standard stretch of DNA works like a <b>barcode</b> to identify a species. It can even identify food in a stomach or a species from a small piece."
  ], [
    "DNA collected from water or soil is called...|eDNA|🧪||mRNA,fossil",
    "Scientists use eDNA to detect animals without...|catching them|🎣||seeing the water,knowing their names",
    "A short standard stretch of DNA used to identify species is a...|barcode|🏷️||pattern book,seed",
    "Before comparing, scientists often...|copy the DNA|🧬||freeze the lake,count stars",
    "eDNA is especially helpful for finding...|rare animals|🔎||common weeds,buildings",
    "Animals leave DNA through skin, mucus and...|waste|💧||thoughts,sound",
    "A DNA sample is compared with...|known sequences|📚||paint colors,maps only",
    "A big benefit of eDNA is that it is...|less harmful to animals|🐟||more harmful to animals,very loud"
  ], "Think about animals leaving tiny traces everywhere.", "Collect, copy and compare."));
  c.push(BOTH("Molecular clocks", [
    "DNA changes over time|⏱️|DNA changes slowly as mutations build up. Two species that split long ago have more differences than two that split recently.",
    "Counting back|🧮|If changes build up at a steady rate, scientists can estimate how long ago species split. This idea is a <b>molecular clock</b>.",
    "Checking the answer|🦴|Scientists check clock estimates against fossils. Rates are not always steady, so estimates are rough."
  ], [
    "More DNA differences between two species suggest they split...|longer ago|⏳||more recently,yesterday",
    "A steady rate of DNA change is the basis of the...|molecular clock|⏱️||food chain,tide chart",
    "Molecular clocks estimate when species...|split|🌳||were born,died",
    "Scientists check clock estimates with...|fossils|🦴||magic,guesses only",
    "A change in DNA is called a...|mutation|🧬||migration,cell",
    "Clock estimates are rough because rates may...|change|📈||never matter,always match",
    "Which pair probably split most recently?|a lion and a tiger|🦁||a lion and a whale,a lion and a frog",
    "Compared with a mouse, a human is more closely related to a...|chimp|🐒||frog,fish"
  ], "More differences mean more time.", "Both lineages keep changing.", molClock, 0.5));
  c.push(L("Extinction risk", [
    "Red List categories|📋|The <b>IUCN Red List</b> sorts species by how likely they are to vanish. The steps include Least Concern, Vulnerable, Endangered, Critically Endangered, Extinct in the Wild and Extinct.",
    "Reasons for risk|⚠️|Scientists look at population size, how fast it is shrinking and the size of the range. Small, falling populations in tiny areas are at the highest risk.",
    "Rates|📉|Species have always gone extinct, but today's rate is estimated to be many times higher than normal, mainly from habitat loss, hunting, pollution, invasive species and climate change."
  ], [
    "The IUCN Red List sorts species by risk of...|extinction|📋||weight,age",
    "Which is more at risk?|Critically Endangered|⚠️||Least Concern,Vulnerable",
    "Which is the lowest risk?|Least Concern|✅||Endangered,Vulnerable",
    "A species that no longer exists anywhere is...|extinct|🪦||vulnerable,common",
    "A small and shrinking population is...|at higher risk|📉||at lower risk,growing",
    "A leading cause of extinction today is...|habitat loss|🌳||seasonal changes,full moons",
    "Extinct in the Wild means animals survive only in...|zoos or care|🏛️||oceans,the wild",
    "A species living in one tiny area is more at risk because...|one event could harm it all|🏝️||it is huge,it is fast"
  ], "Order the categories from safe to gone.", "Small, shrinking and tiny range means higher risk."));
  c.push(L("Wildlife trade and CITES", [
    "Trade across borders|🌍|Animals and plants are sold around the world as pets, food, medicine and decorations. Too much trade can push species toward extinction.",
    "CITES|📜|<b>CITES</b> is an agreement between many countries that controls trade in endangered species. Species are listed by how much protection they need.",
    "What helps|✅|Buying only legal, sustainable products, reporting illegal trade to the authorities and supporting rangers all help. Never buy wild animals or products made of endangered species."
  ], [
    "CITES is an agreement that controls...|wildlife trade|📜||weather reports,school lunches",
    "CITES is signed by many...|countries|🌍||schools,pets",
    "Too much trade in wildlife can lead to...|extinction|⚠️||more habitat,rain",
    "A good choice is to buy only...|legal and sustainable products|✅||products from endangered species,wild pets",
    "A person who protects wildlife areas is a...|ranger|🧑‍🌾||trader,tourist guide only",
    "Species are listed in CITES by how much...|protection they need|🔢||they weigh,they cost",
    "Illegal wildlife trade should be reported to...|the authorities|📞||the neighbors only,nobody",
    "Elephant ivory trade is limited because it threatens...|elephants|🐘||plants,stones"
  ], "Think about a rule that countries share.", "Protect the species, not the trade."));
  c.push(L("Decomposers and recycling nutrients", [
    "Breaking down|🍂|Decomposers like fungi, bacteria, worms and beetles break dead plants and animals into simple nutrients, and return them to soil.",
    "Nutrient cycles|♻️|Nutrients such as carbon, nitrogen and phosphorus move between living things, soil, water and air. Without decomposers they would stay locked in dead bodies.",
    "Speed depends|🌡️|Decay is fast in warm, moist places and slow in cold or dry ones. A rainforest leaf rots in weeks while a tundra leaf lasts for years."
  ], [
    "Which are decomposers?|fungi and bacteria|🍄||hawks and lions,butterflies and bees",
    "Decomposers return nutrients to the...|soil|🌱||clouds,sun",
    "Without decomposers, dead bodies would...|pile up|🪦||vanish at once,turn to gold",
    "Decay is fastest in a...|warm and moist place|🌴||cold and dry place,frozen place",
    "Nutrients move through...|nutrient cycles|♻️||vacations,fences",
    "A dung beetle helps recycle nutrients by burying...|dung|🪲||bones,seeds only",
    "An earthworm helps soil by...|mixing it and eating dead plants|🪱||drying it out,painting it",
    "Phosphorus is a nutrient that plants and animals need to make...|DNA and bones|🦴||wings only,sound"
  ], "Think about who turns the dead into food for plants.", "Decompose means break apart."));
  c.push(L("Resisting antibiotics", [
    "Medicine for bacteria|💊|<b>Antibiotics</b> kill or stop bacteria. They do not work on viruses.",
    "Evolution in action|🦠|In a large group of bacteria, a few may be naturally resistant. Antibiotics kill the others, so the resistant ones multiply. This is natural selection.",
    "Using them wisely|🩺|Taking antibiotics only when needed and finishing the course helps. Giving farm animals too many antibiotics can also create resistant bacteria."
  ], [
    "Antibiotics work against...|bacteria|🦠||viruses,fur",
    "Antibiotics do not work on...|viruses|🤧||bacteria,germs of any kind",
    "Resistant bacteria survive and then...|multiply|🔬||disappear,sleep",
    "This is an example of...|natural selection|🌱||migration,hibernation",
    "To slow resistance, antibiotics should be used only...|when needed|🩺||every day,for colds",
    "Where does resistance first come from?|random mutations|🧬||the medicine itself,wishes",
    "A person with a cold, caused by a virus, should not take...|antibiotics|💊||rest,water",
    "Overuse of antibiotics in animals can lead to more...|resistant bacteria|🐄||vitamins,shade"
  ], "Which bacteria are left after the medicine?", "Selection favors the survivors."));
  c.push(L("Nerve signals", [
    "Neurons|🧠|A <b>neuron</b> is a nerve cell. It has a cell body, short branches called <b>dendrites</b> that receive messages, and a long <b>axon</b> that sends them on.",
    "Electric and chemical|⚡|A signal travels along the axon as a tiny electrical pulse. At the gap between neurons (the <b>synapse</b>) it is passed on by chemicals called <b>neurotransmitters</b>.",
    "Speed|🏎️|Axons wrapped in a fatty layer called <b>myelin</b> carry signals faster. Squid have giant axons that send fast signals for quick escapes."
  ], [
    "A nerve cell is a...|neuron|🧠||nephron,neutron",
    "The part of a neuron that receives messages is the...|dendrite|🌿||axon,synapse",
    "The long part that sends messages is the...|axon|➡️||dendrite,cell wall",
    "The gap between neurons is the...|synapse|🔗||myelin,ganglion",
    "Chemicals that carry a signal across a synapse are...|neurotransmitters|🧪||enzymes,antibodies",
    "Myelin makes signals travel...|faster|🏎️||slower,backwards",
    "A signal along an axon is...|an electrical pulse|⚡||a sound wave,a drop of water",
    "Which animal has giant axons for quick escapes?|squid|🦑||oyster,sponge"
  ], "Receive, send and pass on.", "Dendrites in, axon out."));
  c.push(L("Designing a fair experiment", [
    "Controls and variables|🧪|In a fair test you change one thing, the <b>independent variable</b>, and measure the result, the <b>dependent variable</b>. Everything else stays the same.",
    "Many trials|🔁|Use many animals or many trials. <b>Replication</b> shows if a result is real and not luck. A bigger <b>sample size</b> gives more trust.",
    "Avoiding bias|🙈|In a <b>blind</b> test, the observer does not know which group is which, so hopes cannot change the results. Careful notes let others repeat the experiment."
  ], [
    "The thing you change on purpose is the...|independent variable|🧪||dependent variable,control group",
    "The thing you measure is the...|dependent variable|📏||independent variable,hypothesis",
    "A group that does not get the change is the...|control group|🧊||test group,sample",
    "Repeating tests helps show a result is not...|luck|🎲||big,green",
    "A bigger sample size gives results you can...|trust more|📊||trust less,ignore",
    "A blind test helps avoid...|bias|🙈||measurements,replication",
    "Fair tests should change how many things at a time?|one|1️⃣||all,none",
    "Careful notes let other scientists...|repeat the experiment|📝||skip the test,hide the data"
  ], "What do you change, what do you measure, what stays the same?", "One change, one measurement."));
  c.push(L("Animal welfare and ethics", [
    "Caring about animals|🐕|Animal welfare means caring about an animal's health, comfort and freedom from needless pain or fear. Good care includes food, water, shelter and room to behave naturally.",
    "The three Rs|📋|Scientists try to <b>Replace</b> animal tests when possible, <b>Reduce</b> the number of animals, and <b>Refine</b> methods to cause less distress.",
    "Everyday choices|🌱|Adopting pets from shelters, keeping them safe and vaccinated, watching wildlife from a distance and not releasing pets into the wild all show respect."
  ], [
    "Animal welfare means caring about an animal's...|health and comfort|🐕||fashion,speed",
    "The three Rs are Replace, Reduce and...|Refine|📋||Repeat,Rest",
    "Refine means to cause less...|distress|🤗||food,light",
    "A responsible pet owner provides food, water and...|shelter|🏠||fireworks,mirrors",
    "Releasing a pet into the wild can harm...|local ecosystems|🌿||nothing at all,the sun",
    "A good way to watch wildlife is from a...|distance|🔭||pocket,mud puddle",
    "A good place to adopt a pet is a...|shelter|🐶||roadside box,storm drain",
    "Vaccinating pets protects them and...|other animals and people|💉||no one else,only the vet"
  ], "Think about kindness, safety and respect.", "Replace, reduce, refine."));
  c.push(L("Four questions about behavior", [
    "Tinbergen's questions|❓|Scientist Niko Tinbergen said you can ask four kinds of questions about any behavior: <b>cause</b>, <b>development</b>, <b>function</b> and <b>evolution</b>.",
    "Example: bird song|🐦|Cause: which brain areas and hormones trigger song? Development: how does the young bird learn it? Function: how does song help it survive or find a mate? Evolution: how did singing change over time?",
    "Why four?|🧩|Each question gives a different kind of answer, and all can be true at once. Together they give a full picture."
  ], [
    "How many kinds of questions did Tinbergen ask?|4|❓||2,10",
    "Asking how a young animal learns a behavior is about its...|development|🐣||function,cause only",
    "Asking how a behavior helps survival is about its...|function|🛡️||evolution,development",
    "Asking which hormones trigger the behavior is about its...|cause|🧪||evolution,function",
    "Asking how the behavior changed over time is about its...|evolution|⏳||cause,function",
    "A scientist who studies animal behavior is an...|ethologist|🔍||etymologist,entomologist",
    "Different questions can all be...|true at the same time|🧩||wrong,silly",
    "Finding a mate by singing is an example of...|function|🎶||development,cause only"
  ], "What, how, why and how did it begin?", "Cause, development, function, evolution."));
  c.push(BOTH("Microscopes and magnification", [
    "Seeing small|🔬|A microscope makes tiny things look bigger. The <b>eyepiece</b> and the <b>objective lens</b> both magnify. Total magnification is eyepiece times objective.",
    "Example|✖️|A 10x eyepiece with a 40x objective gives 10 x 40 = 400x. A speck that is 2 mm long would look 800 mm long.",
    "Real size|📐|To find real size, divide the size you see by the magnification. Always write the units, like mm or micrometers."
  ], [
    "A microscope makes small things look...|bigger|🔬||smaller,louder",
    "Total magnification is eyepiece times...|objective|✖️||stage,mirror",
    "A 10x eyepiece with a 10x objective gives...|100x|🔬||20x,1000x",
    "A 10x eyepiece with a 40x objective gives...|400x|🔬||50x,4000x",
    "To find real size, you divide the size you see by the...|magnification|📐||weight,color",
    "A slide holds the...|specimen|🔬||light bulb,eyepiece",
    "A very thin specimen is used so that light can...|pass through|💡||be blocked,turn green",
    "A micrometer is one millionth of a...|meter|📏||kilometer,second"
  ], "Multiply to see larger. Divide to find the real size.", "Real size equals seen size over magnification.", magnify, 0.5));
  c.push(MIX("Mixed practice", c.slice(0, 18)));
  c.push(MIX("Level 18 Challenge", c.slice(0, 18).reverse()));

  Object.assign(ANIMALS_LEVELS, { 16: a, 17: b, 18: c });
})();
