// ext/animals-19-21.js  Animals & Nature levels 19-21
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
  // NUM(rnd, build): build(p) -> {text, v, ans, h1, h2, ex}; makes a numeric question with a different worked example
  const NUM = (rnd, build) => () => {
    const q = build(rnd());
    let o = build(rnd()), g = 0;
    while (o.ans === q.ans && g++ < 60) o = build(rnd());
    return { text: q.text + " (type a number)", visual: q.v, answer: q.ans, hints: [q.h1, q.h2, `Example: ${o.ex} The answer is ${o.ans}. Now do yours.`] };
  };

  // ---------- number makers ----------
  const sav = NUM(() => ({ k: ri(0, 2), s: ri(2, 6), r: pick([1, 2, 3, 6]) }), p => {
    if (p.k === 0) return { v: "🧊", ans: 6 * p.s * p.s, text: `A cube-shaped model cell has sides of ${p.s} cm. What is its surface area in square cm?`, h1: "A cube has 6 flat faces that are all the same size.", h2: "Find the area of one face (side times side), then use all the faces.", ex: `a cube with sides of ${p.s === 2 ? 3 : 2} cm has 6 faces of ${p.s === 2 ? 9 : 4} square cm, so 6 x ${p.s === 2 ? 9 : 4} = ${p.s === 2 ? 54 : 24}.` };
    if (p.k === 1) return { v: "🧊", ans: p.s ** 3, text: `A cube-shaped model cell has sides of ${p.s} cm. What is its volume in cubic cm?`, h1: "Volume is how much space is inside the cube.", h2: "Multiply the side by itself, and then by the side one more time.", ex: `a cube with sides of ${p.s === 2 ? 3 : 2} cm has volume ${p.s === 2 ? 3 : 2} x ${p.s === 2 ? 3 : 2} x ${p.s === 2 ? 3 : 2} = ${p.s === 2 ? 27 : 8}.` };
    return { v: "🧊", ans: 6 / p.r, text: `A cube has sides of ${p.r} cm. Its surface area is ${6 * p.r * p.r} square cm and its volume is ${p.r ** 3} cubic cm. What is surface area divided by volume?`, h1: "You are given both numbers already. Just divide the first by the second.", h2: "Surface area goes on top, volume goes on the bottom.", ex: `a cube with sides of ${p.r === 3 ? 2 : 3} cm has surface area ${p.r === 3 ? 24 : 54} and volume ${p.r === 3 ? 8 : 27}, and ${p.r === 3 ? 24 : 54} / ${p.r === 3 ? 8 : 27} = ${p.r === 3 ? 3 : 2}.` };
  });
  const cardiac = NUM(() => ({ k: ri(0, 1), hr: pick([60, 70, 80, 90, 100]), sv: pick([50, 60, 70, 80]) }), p => {
    if (p.k === 0) return { v: "❤️", ans: p.hr * p.sv, text: `A heart beats ${p.hr} times each minute and pumps ${p.sv} mL of blood with each beat. How many mL does it pump per minute (cardiac output)?`, h1: "Cardiac output is the blood pumped in one minute.", h2: "Multiply beats per minute by the blood pumped in each beat.", ex: `60 beats per minute x 70 mL per beat = 4200 mL per minute.` };
    return { v: "❤️", ans: p.hr, text: `A heart pumps ${p.hr * p.sv} mL of blood each minute, and each beat pumps ${p.sv} mL. How many beats per minute is that?`, h1: "Cardiac output = beats per minute x blood per beat. Which part is missing?", h2: "Divide the blood per minute by the blood per beat.", ex: `A heart pumps 4200 mL per minute with 70 mL per beat: 4200 / 70 = 60 beats per minute.` };
  });
  const abund = NUM(() => ({ N: pick([20, 50, 100, 200]), f: pick([10, 20, 25, 40, 50, 60]), n: pick(["water beetles", "snails", "tadpoles", "mayfly larvae", "water fleas"]) }), p => ({
    v: "🔍", ans: p.f, text: `A pond sample has ${p.N} animals. ${p.N * p.f / 100} of them are ${p.n}. What percent of the sample is ${p.n}?`,
    h1: "Percent abundance is the share of the whole that one kind makes up.", h2: "Divide the number of that kind by the whole sample, then multiply by 100.", ex: `In a sample of 50, there are 10 snails: 10 / 50 = 0.2, which is 20 percent.`
  }));
  const kcal = NUM(() => ({ k: ri(0, 2), c: pick([10, 20, 30]), p: pick([5, 10, 15]), f: pick([5, 10, 20]) }), p => {
    if (p.k === 0) return { v: "🥜", ans: 9 * p.f, text: `A snack for a squirrel has ${p.f} g of fat and nothing else. Fat gives 9 kcal per gram. How many kcal is that?`, h1: "Multiply the grams by the energy in each gram.", h2: "Each gram of fat holds 9 kcal.", ex: `4 g of fat x 9 kcal = 36 kcal.` };
    if (p.k === 1) return { v: "🍓", ans: 4 * p.c, text: `A berry snack has ${p.c} g of carbohydrate and nothing else. Carbohydrate gives 4 kcal per gram. How many kcal is that?`, h1: "Multiply the grams by the energy in each gram.", h2: "Each gram of carbohydrate holds 4 kcal.", ex: `5 g of carbohydrate x 4 kcal = 20 kcal.` };
    return { v: "🍽️", ans: 4 * p.c + 4 * p.p + 9 * p.f, text: `A meal has ${p.c} g carbohydrate (4 kcal per g), ${p.p} g protein (4 kcal per g) and ${p.f} g fat (9 kcal per g). How many kcal in total?`, h1: "Work out the energy of each part first, then add the parts.", h2: "Carbohydrate and protein give 4 kcal per gram. Fat gives 9.", ex: `2 g carbohydrate, 3 g protein, 1 g fat: 8 + 12 + 9 = 29 kcal.` };
  });
  const doubling = NUM(() => ({ P: pick([10, 20, 50, 100]), d: pick([2, 3, 4, 5]), k: ri(2, 5) }), p => ({
    v: "🦠", ans: p.P * 2 ** p.k, text: `A bacteria colony starts with ${p.P} cells and doubles every ${p.d} hours. How many cells are there after ${p.d * p.k} hours?`,
    h1: "First count how many times the colony doubles in that time.", h2: "Doubling twice means times 2, then times 2 again.", ex: `Start with 5 cells and double 3 times: 5 > 10 > 20 > 40, so 40 cells.`
  }));
  const prob = NUM(() => ({ a: pick([10, 20, 30, 40, 50, 60, 80]), b: pick([10, 20, 30, 40, 50, 60, 80]) }), p => ({
    v: "🎲", ans: p.a * p.b / 100, text: `A young bird has a ${p.a} percent chance of surviving the winter. If it survives, it has a ${p.b} percent chance of finding a nest site. What is the chance of both happening, in percent?`,
    h1: "For two events that depend on each other in a row, multiply the chances.", h2: "Change each percent to a fraction of 1 (like 0.5), multiply, then change back to a percent.", ex: `A 50 percent chance and then a 20 percent chance: 0.5 x 0.2 = 0.1, which is 10 percent.`
  }));
  const q10 = NUM(() => ({ r: pick([2, 3, 4, 5, 6]), k: ri(1, 3), t: pick([10, 15, 20]) }), p => ({
    v: "🦎", ans: p.r * 2 ** p.k, text: `A lizard's activity rate doubles for every 10 degrees C warmer. At ${p.t} degrees C it makes ${p.r} moves per minute. How many moves per minute at ${p.t + 10 * p.k} degrees C?`,
    h1: "Count how many 10-degree steps the warming has.", h2: "Each 10-degree step doubles the rate.", ex: `4 moves at 10 degrees. At 30 degrees is two steps: 4 > 8 > 16 moves.`
  }));
  const relfit = NUM(() => ({ k: ri(0, 1), x: pick([[20, 5], [20, 10], [20, 15], [10, 2], [10, 5], [10, 8], [40, 10], [40, 20], [40, 30]]) }), p => {
    const w = p.x[1] * 100 / p.x[0];
    if (p.k === 0) return { v: "🪲", ans: w, text: `Beetle type A leaves an average of ${p.x[0]} surviving offspring. Type B leaves ${p.x[1]}. What is the relative fitness of type B, as a percent of type A?`, h1: "Relative fitness compares one type to the best type.", h2: "Divide type B's offspring by type A's offspring, then multiply by 100.", ex: `Type A leaves 10 and type B leaves 4: 4 / 10 = 0.4, which is 40 percent.` };
    return { v: "🪲", ans: 100 - w, text: `Beetle type A leaves an average of ${p.x[0]} surviving offspring. Type B leaves ${p.x[1]}. The selection coefficient is 100 minus B's relative fitness (in percent). What is it?`, h1: "First work out B's relative fitness as a percent of A.", h2: "Relative fitness = B's offspring divided by A's offspring, times 100. Then subtract from 100.", ex: `A leaves 10 and B leaves 4: relative fitness is 40 percent, so the coefficient is 100 - 40 = 60.` };
  });
  const hw = NUM(() => ({ k: ri(0, 2), t: ri(1, 5) }), p => {
    const q2 = p.t * p.t, ex = { t: p.t === 3 ? 2 : 3 };
    if (p.k === 0) return { v: "🧬", ans: 2 * p.t * (10 - p.t), text: `In a population at Hardy-Weinberg balance, ${q2} percent of animals show a recessive trait (q squared). What percent are heterozygous carriers (2pq)?`, h1: "Take the square root of q squared to find q, then find p.", h2: "p + q = 1. Then work out 2 x p x q and change it to a percent.", ex: `If q squared is ${ex.t * ex.t} percent, q = 0.${ex.t}, p = 0.${10 - ex.t}, and 2pq = ${2 * ex.t * (10 - ex.t)} percent.` };
    if (p.k === 1) return { v: "🧬", ans: p.t * 10, text: `In a population at Hardy-Weinberg balance, ${q2} percent of animals show a recessive trait (q squared). What is q, the recessive allele frequency, as a percent?`, h1: "q squared is q times q. You need to undo the squaring.", h2: "Take the square root of the q squared value as a decimal, then change it to a percent.", ex: `If q squared is ${ex.t * ex.t} percent (0.0${ex.t * ex.t}), then q = 0.${ex.t}, which is ${ex.t * 10} percent.` };
    return { v: "🧬", ans: 100 - p.t * 10, text: `In a population at Hardy-Weinberg balance, ${q2} percent of animals show a recessive trait (q squared). What is p, the dominant allele frequency, as a percent?`, h1: "Find q first, because p and q add up to a whole.", h2: "p + q = 1 (or 100 percent). Find q from q squared, then subtract.", ex: `If q squared is ${ex.t * ex.t} percent, q = ${ex.t * 10} percent, so p = 100 - ${ex.t * 10} = ${100 - ex.t * 10} percent.` };
  });
  const npp = NUM(() => ({ k: ri(0, 2), g: pick([800, 1000, 1200, 1500, 2000]), r: pick([200, 300, 400, 500]) }), p => {
    if (p.k === 0) return { v: "🌿", ans: p.g - p.r, text: `A meadow plants make ${p.g} units of energy by photosynthesis (GPP) and use ${p.r} units for their own breathing (respiration). What is the net primary productivity (NPP)?`, h1: "NPP is what is left over after the plants use some energy themselves.", h2: "NPP = GPP minus respiration.", ex: `GPP 900 and respiration 300: NPP = 900 - 300 = 600.` };
    if (p.k === 1) return { v: "🌿", ans: p.g, text: `A meadow has an NPP of ${p.g - p.r} units. The plants use ${p.r} units in respiration. What is the GPP?`, h1: "NPP is GPP with the plants' own use taken away. Go backwards.", h2: "GPP = NPP plus respiration.", ex: `NPP 600 and respiration 300: GPP = 600 + 300 = 900.` };
    return { v: "🌿", ans: p.r, text: `A meadow has a GPP of ${p.g} units and an NPP of ${p.g - p.r} units. How many units did the plants use in respiration?`, h1: "The difference between GPP and NPP is the energy the plants used.", h2: "Respiration = GPP minus NPP.", ex: `GPP 900 and NPP 600: respiration = 900 - 600 = 300.` };
  });
  const spare = NUM(() => ({ s: pick([10, 15, 20, 30]), k: ri(1, 3), a: pick([1, 5, 10]) }), p => ({
    v: "🏝️", ans: p.s * 2 ** p.k, text: `A rule of thumb: an island ten times bigger has about twice as many species. An island of ${p.a} square km has ${p.s} bird species. About how many species would an island of ${p.a * 10 ** p.k} square km have?`,
    h1: "Count how many times the area is multiplied by ten.", h2: "Each tenfold step in area doubles the number of species.", ex: `An island of 2 square km has 12 species. One of 200 square km is two tenfold steps: 12 > 24 > 48 species.`
  }));
  const cot = NUM(() => ({ k: ri(0, 1), c: pick([2, 3, 4, 5, 6]), d: pick([5, 10, 20, 50]) }), p => {
    if (p.k === 0) return { v: "🐋", ans: p.c * p.d, text: `A swimming animal uses ${p.c} kJ of energy for each km it travels. How many kJ does it use to swim ${p.d} km?`, h1: "The cost per km is the same for every km.", h2: "Multiply the cost for one km by the number of km.", ex: `3 kJ per km for 10 km is 3 x 10 = 30 kJ.` };
    return { v: "🐋", ans: p.d, text: `A swimming animal uses ${p.c} kJ for each km. It used ${p.c * p.d} kJ in total. How many km did it swim?`, h1: "Total energy = cost per km x distance. Which part is missing?", h2: "Divide the total energy by the cost for one km.", ex: `3 kJ per km and 30 kJ used in total: 30 / 3 = 10 km.` };
  });

  const a = [], b = [], c = [];
  const W = "Think back to what you just learned. Read the question slowly.";

  // ================= LEVEL 19 =================
  a.push(BOTH("Surface area and volume", [
    "Big and small|🐭🐘|When an animal gets bigger, its volume grows faster than its surface area. So big animals have less skin for their size.",
    "Heat and gas exchange|🌡️|Heat leaves through the skin, and oxygen can enter through surfaces. Small animals lose heat fast. Large animals keep it better.",
    "The cube trick|🧊|For a cube with side s: surface area = 6 x s x s, volume = s x s x s. Surface area divided by volume = 6 / s. Bigger cube, smaller ratio."
  ], [
    "Which loses body heat faster for its size, a mouse or an elephant?|a mouse|🐭||an elephant,they lose the same",
    "As an animal grows bigger, its surface area compared to its volume gets...|smaller|📏||bigger,stays the same",
    "Why do tiny animals like shrews need to eat so often?|they lose heat fast|🐁||they are lazy,they have no stomach",
    "Why do elephants have big, thin ears?|to lose extra heat|🐘||to hide,to swim faster",
    "Why are most cells tiny?|oxygen and food must reach the middle quickly|🔬||to save paint,to fit in a pocket",
    "Which shape has more surface for its volume, a flat flatworm or a round ball the same size?|the flat flatworm|🪱||the ball,they are equal",
    "Flatworms are very flat so oxygen can reach...|every cell|🪱||only the head,only the tail",
    "A small cube has surface area 24 and volume 8. Compared with a bigger cube, its ratio is...|larger|🧊||smaller,exactly the same"
  ], W, "Think about surface compared with the space inside.", sav, 0.45));
  a.push(BOTH("Cardiac output", [
    "Blood per minute|❤️|Heart rate is beats per minute. Stroke volume is the blood pumped by one beat. <b>Cardiac output = heart rate x stroke volume</b>.",
    "Small and large hearts|🐁🐘|Small mammals have fast heart rates. A mouse heart beats hundreds of times a minute. An elephant heart beats about 30.",
    "Exercise|🏃|During exercise the brain tells the heart to beat faster and harder, so cardiac output goes up and muscles get more oxygen."
  ], [
    "Cardiac output is the amount of blood the heart pumps each...|minute|❤️||beat,day",
    "Stroke volume is the blood pumped with each...|beat|❤️||minute,breath",
    "Which has the faster resting heart rate, a shrew or an elephant?|a shrew|🐁||an elephant,they are the same",
    "When an animal runs, its cardiac output goes...|up|🏃||down,nowhere",
    "A hummingbird heart in flight beats more than...|1000 times a minute|🐦||60 times a minute,10 times a minute",
    "Cardiac output is found by multiplying heart rate by...|stroke volume|❤️||body weight,breath rate",
    "A trained athlete often has a lower resting heart rate because each beat pumps more...|blood|🏊||air,sugar",
    "Why does more cardiac output help a running animal?|muscles get more oxygen|💨||it grows taller,it gets lighter"
  ], W, "Think about blood, beats and time.", cardiac, 0.45));
  a.push(L("Diffusion, osmosis and active transport", [
    "Moving without energy|💨|<b>Diffusion</b> moves particles from where there are many to where there are few. It needs no energy. A smell spreading through a room is diffusion.",
    "Water moves too|💧|<b>Osmosis</b> is the diffusion of water through a membrane, usually toward the side with more dissolved stuff.",
    "Pushing uphill|🔋|<b>Active transport</b> moves particles from few to many. It needs energy from ATP, like pushing a ball uphill."
  ], [
    "Oxygen moving from the lungs into the blood is an example of...|diffusion|🫁||active transport,digestion",
    "Water moving through a cell membrane is called...|osmosis|💧||evaporation,mutation",
    "Moving particles from few to many needs energy. This is called...|active transport|🔋||diffusion,osmosis",
    "Diffusion moves particles from...|many to few|💨||few to many,top to bottom",
    "Which kind of transport uses ATP?|active transport|🔋||diffusion,osmosis",
    "An animal cell placed in pure water will take in water and may...|swell|🧫||shrink,turn green",
    "A smell of food spreading across a room is...|diffusion|👃||active transport,evolution",
    "Diffusion and osmosis are called passive because they do not need...|energy|🧫||water,oxygen"
  ], W, "Ask: does it need energy? Which way do the particles move?"));
  a.push(L("Four molecules of life", [
    "Big molecules|🧪|Living things are built from four main kinds of large molecules: carbohydrates, lipids, proteins and nucleic acids.",
    "Energy and fat|🍞🥑|<b>Carbohydrates</b> (sugars and starches) give quick energy. <b>Lipids</b> (fats and oils) store lots of energy and build cell membranes.",
    "Builders and code|💪🧬|<b>Proteins</b> are made of amino acids and make muscles, enzymes and more. <b>Nucleic acids</b> (DNA and RNA) hold the instructions."
  ], [
    "Which molecule is made of amino acids?|protein|💪||lipid,carbohydrate",
    "Which molecules store the most energy per gram?|lipids|🥑||carbohydrates,nucleic acids",
    "DNA and RNA are called...|nucleic acids|🧬||lipids,proteins",
    "Sugars and starches are...|carbohydrates|🍞||lipids,proteins",
    "Enzymes are mostly made of...|protein|⚙️||fat,sugar",
    "Cell membranes are built mostly from...|lipids|🧫||nucleic acids,starches",
    "Which molecule carries the instructions for building an animal?|DNA|🧬||fat,starch",
    "Which molecule gives quick energy, like glucose?|a carbohydrate|🍬||a nucleic acid,a lipid"
  ], W, "Think about the job each kind of molecule does."));
  a.push(L("Blood cells and clotting", [
    "Red cells|🔴|<b>Red blood cells</b> carry oxygen using a protein called hemoglobin. Mammal red cells have no nucleus, so they have more room for hemoglobin.",
    "White cells|⚪|<b>White blood cells</b> fight germs. Different kinds eat germs or make antibodies.",
    "Platelets and plasma|🩹|<b>Platelets</b> are tiny pieces that clump together to seal a cut and start a clot. <b>Plasma</b> is the yellowish liquid that carries all the cells."
  ], [
    "Which blood cells carry oxygen?|red blood cells|🔴||white blood cells,platelets",
    "Which blood cells fight germs?|white blood cells|⚪||red blood cells,platelets",
    "What do platelets help the body do?|clot blood|🩹||digest food,hear sounds",
    "The protein in red cells that holds oxygen is...|hemoglobin|🔴||keratin,insulin",
    "The liquid part of blood is called...|plasma|🩸||marrow,mucus",
    "Mammal red blood cells differ from bird red cells because they have no...|nucleus|🔬||membrane,hemoglobin",
    "Where are most blood cells made in a mammal?|bone marrow|🦴||the stomach,the skin",
    "A scab forms when platelets and other parts make a...|clot|🩹||bubble,bone"
  ], W, "Think about the job of each part of blood."));
  a.push(L("Skin, scales and shells", [
    "Keratin|🧬|<b>Keratin</b> is a tough protein. It makes mammal hair, bird feathers, reptile scales and claws, and horns.",
    "Different coverings|🐟🐍|Most fish have thin bony scales. Reptiles have keratin scales, and a snake sheds its whole outer skin. Amphibians have thin, moist skin.",
    "Shells and antlers|🐢🦌|A turtle's shell grows from its own bones and is covered by plates called scutes. Antlers are bone that deer shed and regrow every year."
  ], [
    "Hair, feathers and claws are all made mostly of...|keratin|🧬||calcium,chlorophyll",
    "Which animal has thin, moist skin that can take in water and oxygen?|a frog|🐸||a snake,a turtle",
    "A turtle's shell is part of its...|skeleton|🐢||fur,feathers",
    "Which grow back every year?|deer antlers|🦌||cow horns,rhino teeth",
    "Snakes grow by shedding their...|outer skin|🐍||bones,teeth",
    "Most fish scales are made of...|bone|🐟||keratin hair,shell",
    "Feathers keep a bird warm and help it...|fly|🐦||dig,smell",
    "A rhinoceros horn is made of...|keratin|🦏||ivory,bone"
  ], W, "Think about what the covering is made of and what it does."));
  a.push(L("The amniotic egg", [
    "Eggs on dry land|🥚|Reptiles, birds and egg-laying mammals lay an <b>amniotic egg</b> with a shell that stops it drying out, so it can be laid on land.",
    "Four inner bags|🐣|The <b>amnion</b> holds a cushion of fluid. The <b>yolk sac</b> holds food. The <b>allantois</b> stores waste. The <b>chorion</b> lets gases through.",
    "Amphibian eggs|🐸|Frog eggs have only jelly, with no shell, so they must stay in water or damp places."
  ], [
    "Which animals lay amniotic eggs?|reptiles and birds|🥚||frogs and fish,sponges and jellies",
    "The part of the egg that holds food for the embryo is the...|yolk sac|🥚||amnion,allantois",
    "The part that stores waste in the egg is the...|allantois|🥚||yolk sac,shell",
    "The amnion is filled with fluid that works like a...|cushion|🐣||window,battery",
    "Why can reptile eggs be laid on dry land?|the shell stops drying out|🦎||they float,they are jelly",
    "Frog eggs must stay in water because they have no...|shell|🐸||yolk,embryo",
    "The chorion lets the embryo exchange...|gases|🐣||sounds,colors",
    "Which of these also lays eggs and is a mammal?|a platypus|🦆||a bat,a seal"
  ], W, "Think about which animals need a shell to keep eggs from drying."));
  a.push(L("Torpor and hibernation bodies", [
    "Slowing down|🛌|In <b>torpor</b> an animal lets its body temperature and heart rate drop for a short time, often just one night. Hummingbirds do this.",
    "Hibernation|🐿️|<b>Hibernation</b> is a long torpor lasting weeks or months. A ground squirrel's heart can slow from about 200 beats a minute to about 5.",
    "Waking up|🔥|Waking takes lots of energy. Special <b>brown fat</b> makes heat to warm the body. Bears cool only a little and wake easily."
  ], [
    "What is a short, one-night drop in body temperature and heart rate called?|torpor|🐦||migration,molting",
    "Why does hibernating save energy?|the body uses less fuel|🐿️||the animal eats more,the animal runs",
    "Which bird often enters torpor at night?|a hummingbird|🐦||an ostrich,a penguin",
    "What helps hibernators make heat when they wake?|brown fat|🔥||feathers,scales",
    "During hibernation a heart rate...|slows down a lot|🐿️||speeds up,stays the same",
    "Hibernation is usually longer than...|torpor|🛌||sleep each night,a heartbeat",
    "Compared with a ground squirrel, a hibernating bear's body temperature drops...|only a little|🐻||to freezing,to boiling",
    "Animals store fat before hibernating to use as...|fuel|🥜||a blanket,a toy"
  ], W, "Think about saving energy when food is scarce."));
  a.push(L("Fuel for migration", [
    "Fat is the best fuel|🪫|Fat holds about 9 kcal per gram, more than twice as much as sugar or protein (about 4). Migrating birds pack on fat before a long trip.",
    "Record flights|🛫|A bar-tailed godwit can fly over 11,000 km from Alaska to New Zealand without stopping. An Arctic tern travels about 70,000 km a year, round trip.",
    "Refueling|🍤|Birds stop at special places to feed and rest. If those places are lost, migrations can fail."
  ], [
    "Which fuel gives the most energy per gram?|fat|🪫||sugar,protein",
    "Before migrating, many birds first...|gain fat|🐦||lose their feathers,fall asleep for months",
    "Which bird has one of the longest yearly migrations?|the Arctic tern|🐦||the ostrich,the kiwi",
    "A bar-tailed godwit flies without stopping across the...|Pacific Ocean|🌊||Sahara Desert,Amazon forest",
    "Why are stopover places important?|birds refuel and rest there|🛬||they are for nesting only,birds sleep for a year",
    "Fat has about how many kcal per gram?|9|🪫||2,20",
    "Why is fat better than sugar for a long flight?|it is light for the energy it holds|🪶||it is heavier,it is colorful",
    "Losing a stopover wetland can harm migrating birds because they cannot...|refuel|🌾||sing,hatch eggs"
  ], W, "Think about which fuel packs the most energy for its weight."));
  a.push(L("Insect molting hormones", [
    "Growing in armor|🐛|An insect's hard exoskeleton cannot stretch, so it must <b>molt</b>, shedding the old one while a new one forms underneath.",
    "Two hormones|🧪|<b>Ecdysone</b> tells the insect to molt. <b>Juvenile hormone</b> keeps it in a young (larva) form.",
    "Becoming an adult|🦋|When juvenile hormone drops low, the next molt changes the larva into a pupa and then an adult. This is metamorphosis."
  ], [
    "Which hormone tells an insect to molt?|ecdysone|🐛||insulin,melatonin",
    "Which hormone keeps an insect in its young form?|juvenile hormone|🐛||ecdysone,adrenaline",
    "Why must insects molt to grow?|the exoskeleton cannot stretch|🦗||they are bored,they lose their wings",
    "A freshly molted insect is...|soft and easy to harm|🦗||harder than before,invisible",
    "Each stage between molts is called an...|instar|🐛||egg case,antenna",
    "Metamorphosis begins when juvenile hormone...|drops low|🦋||rises high,stays fixed",
    "The old shed skin of an insect is called the...|exuvia|🦗||pupa,larva",
    "Which animals have an exoskeleton that must be molted?|insects|🦗||birds,dogs"
  ], W, "Think about what the insect's outer armor can and cannot do."));
  a.push(L("Eyes: hunters and hunted", [
    "Eyes in front|🦉|Hunters like owls, cats and hawks have eyes facing forward. The two views overlap, giving <b>depth perception</b> to judge distance.",
    "Eyes on the sides|🐇|Prey like rabbits and horses have eyes on the sides of their heads. They can see almost all around to spot danger.",
    "Pupil shapes|🐐|Goats, sheep and horses have wide, flat (horizontal) pupils that see the ground well. Many ambush hunters, like house cats, have upright slit pupils."
  ], [
    "Eyes facing forward help a hunter judge...|distance|🦉||smell,sound",
    "Why do rabbits have eyes on the sides of their heads?|to see almost all around|🐇||to see better at depth,to see only ahead",
    "Which animal most likely has forward-facing eyes?|an owl|🦉||a horse,a rabbit",
    "A goat's pupil is shaped like a...|horizontal bar|🐐||tiny circle,star",
    "Seeing with two overlapping views is called...|binocular vision|👀||sonar,infrared",
    "A chameleon can look in two directions at once because its eyes...|move separately|🦎||are huge,are glued",
    "A horse is a prey animal, so its wide field of view helps it...|spot danger|🐴||catch fish,dig",
    "Upright slit pupils are common in...|ambush hunters|🐈||grazing sheep,swimming whales"
  ], W, "Hunters need to judge distance. Prey need to see danger."));
  a.push(L("Testing animal minds", [
    "Mirror test|🪞|Scientists put a mark on an animal where it can only see it in a mirror. If it touches its own body, it may know the mirror shows itself. Chimps, dolphins, elephants and magpies have passed.",
    "Beware of cues|🐴|Clever Hans, a horse around 1900, seemed to do math. Really he was reading tiny body signals from his owner. Good tests remove such cues.",
    "Be careful and fair|🔬|We should not say an animal thinks like a person without evidence. Tests need a control group and must be repeatable."
  ], [
    "In the mirror test, a mark is put where the animal...|can only see it in a mirror|🪞||can smell it,cannot be scratched",
    "Clever Hans really answered by reading...|his owner's body signals|🐴||math tables,sounds from the stars",
    "Which of these has passed the mirror test?|an elephant|🐘||a goldfish,a frog",
    "Why do good tests hide cues from the animal?|so the animal cannot just copy the person|🔬||to make tests longer,to save money",
    "Giving animals human thoughts without evidence is called...|anthropomorphism|🤔||camouflage,migration",
    "Alex, a famous African grey parrot, could...|name colors and shapes|🦜||fly backward only,count to a million",
    "Why do scientists repeat animal tests?|to check the result is not luck|🔁||to bore the animal,to make noise",
    "Which bird is known for using tools and solving puzzles?|a crow|🐦‍⬛||a pigeon,a swan"
  ], W, "Think about careful, fair testing."));
  a.push(BOTH("Counting diversity", [
    "Richness|🔢|<b>Species richness</b> is how many different species live in a place.",
    "Evenness|⚖️|A community is more diverse when species are about equally common. One species making up almost everything lowers diversity.",
    "Percent abundance|📊|Percent abundance = (number of one kind / total number) x 100. It shows how common a species is."
  ], [
    "Species richness means the...|number of different species|🔢||total weight of animals,size of the biggest animal",
    "Pond A has 4 species in equal numbers. Pond B has 4 species but 97 percent are one species. Which is more even?|Pond A|🌊||Pond B,they are equal",
    "A forest with 40 species has higher richness than one with...|12 species|🌳||60 species,45 species",
    "One species making up nearly all the animals means diversity is...|lower|🐜||higher,perfect",
    "Percent abundance tells you how...|common a species is|📊||old a species is,fast a species is",
    "Which is likely to be more diverse, a rainforest or a farm field of one crop?|a rainforest|🌴||a farm field,they are the same",
    "Evenness is about how equal the numbers of each species are. High evenness means species are...|similar in number|⚖️||all different sizes,all extinct",
    "A scientist counts 3 beetle species, 5 snail species and 2 worm species. The richness is...|10|🔢||3,5"
  ], W, "Think about how many kinds, and how evenly they are shared.", abund, 0.4));
  a.push(BOTH("Food energy", [
    "Energy in food|🍎|Food energy is measured in kilocalories (kcal), often called Calories. One food Calorie is 1000 small calories.",
    "Energy per gram|⚖️|Carbohydrates and proteins hold about <b>4 kcal per gram</b>. Fat holds about <b>9 kcal per gram</b>.",
    "Why it matters|🐻|Animals that must store energy, like bears before winter, eat fatty foods such as nuts, seeds and salmon."
  ], [
    "Fat holds about how many kcal per gram?|9|🥜||4,1",
    "Carbohydrate holds about how many kcal per gram?|4|🍞||9,2",
    "Which is the best fuel to store for winter?|fat|🐻||water,fiber",
    "A food Calorie (kcal) is equal to how many small calories?|1000|🔢||10,100",
    "Which food has the most energy per gram?|oil|🫒||lettuce,watermelon",
    "Protein holds about how many kcal per gram?|4|🥚||9,12",
    "Why do bears eat salmon in autumn?|to gain fat|🐻||to get thin,to learn to swim",
    "Which unit measures food energy?|kilocalorie|🍎||kilometer,kilogram"
  ], W, "Remember: fat holds more than twice the energy of sugar or protein.", kcal, 0.45));
  a.push(L("Cleaner fish and trust", [
    "A cleaning station|🐠|Cleaner wrasse fish eat parasites off bigger fish, called clients. The client gets cleaned and the cleaner gets a meal. This is <b>mutualism</b>.",
    "Cheating and keeping watch|👀|Sometimes a cleaner bites a client's healthy mucus, which is cheating. The client may chase it, or swim away and choose another cleaner.",
    "Sharing food|🦇|Vampire bats sometimes share a blood meal with a roost mate who is hungry, and the favor is often returned later. This is <b>reciprocal altruism</b>."
  ], [
    "A cleaner wrasse gets food from eating the client's...|parasites|🐠||bones,eyes",
    "Both animals gain from cleaning. This relationship is called...|mutualism|🤝||parasitism,predation",
    "If a cleaner cheats, the client may...|swim away|🐟||give it a gift,sleep",
    "Helping someone now so they help you later is called...|reciprocal altruism|🦇||camouflage,molting",
    "Which animal may share blood meals with hungry roost mates?|the vampire bat|🦇||the owl,the shark",
    "Clients visiting a cleaning station get fewer...|parasites|🐠||fins,friends",
    "Why does cheating risk the cleaner's reputation?|clients may avoid it|👀||it grows bigger,the sea freezes",
    "Reciprocal altruism works best if animals can recognize each other and remember who...|helped them|🧠||ran fastest,was biggest"
  ], W, "Think about who gains, and what happens if one animal cheats."));
  a.push(L("Pigment and structural color", [
    "Pigment colors|🎨|<b>Pigments</b> are chemicals that absorb some colors of light and reflect others. Melanin makes black and brown. Carotenoids make yellow, orange and red.",
    "Colors from food|🦩|Flamingos are pink because of carotenoids in the algae and shrimp they eat. Without those foods, their feathers fade.",
    "Colors from structure|🦋|<b>Structural color</b> comes from tiny layers or bumps that bounce light. Blue morpho butterfly wings and peacock feathers shine this way, and a blue jay's blue is structural too."
  ], [
    "Which pigment makes black and brown colors?|melanin|🖤||carotenoid,chlorophyll",
    "Why are flamingos pink?|carotenoids in their food|🦩||they are born pink always,pink paint",
    "A blue morpho butterfly looks blue because of...|tiny structures that bounce light|🦋||blue pigment,blue food",
    "Colors made by tiny layers reflecting light are called...|structural colors|🌈||food colors,nerve colors",
    "Carotenoids give animals what colors?|yellow, orange and red|🟠||blue and green,black only",
    "Which feathers shine because of structure?|peacock feathers|🦚||an ostrich's gray feathers,a crow's black feathers",
    "A pigment works by...|absorbing some colors of light|🎨||making light,blocking all light",
    "Animals get carotenoids mostly from...|their food|🍤||sunlight alone,their bones"
  ], W, "Ask: is the color from a chemical, or from tiny shapes?"));
  a.push(BOTH("Doubling time", [
    "Growing by doubling|🦠|Some populations grow by doubling again and again. This is called <b>exponential growth</b>.",
    "The pattern|2️⃣|Start with 3 cells that double each hour: 3, 6, 12, 24, 48. After n doublings, the count is the start x 2 x 2... n times.",
    "Limits|🧫|Growth like this cannot last forever, because food and space run out. Then the curve flattens at the carrying capacity."
  ], [
    "A population that doubles every day grows...|exponentially|📈||by the same amount each day,not at all",
    "10 cells double three times. How is that worked out?|10 x 2 x 2 x 2|🦠||10 + 3,10 x 3",
    "What stops exponential growth in nature?|running out of food and space|🧫||too much time,too many names",
    "The population size a place can support is the...|carrying capacity|🏞️||growth rate,birth date",
    "If a colony doubles every hour, how many doublings in 3 hours?|3|⏰||2,6",
    "Which grows faster over time, adding 10 each day or doubling each day?|doubling|📈||adding 10,they are equal",
    "Bacteria can double in about 20 minutes. This helps infections...|spread fast|🦠||disappear,stand still",
    "On a graph, exponential growth looks like a...|steepening curve|📈||flat line,circle"
  ], W, "Count the doublings first.", doubling, 0.45));
  a.push(L("What is a species?", [
    "One idea|🧬|The <b>biological species concept</b> says a species is a group that can breed together and have fertile offspring.",
    "Where it gets tricky|🐴🫏|A horse and a donkey can have a baby mule, but mules are usually unable to have babies. So horses and donkeys are separate species.",
    "Other ideas|🦴|Fossils and asexual organisms cannot be tested for breeding, so scientists also use body shape, DNA and behavior to name species."
  ], [
    "In the biological species concept, a species can breed and have...|fertile offspring|🧬||no offspring,only eggs",
    "A mule is a baby of a horse and a...|donkey|🫏||zebra,cow",
    "Why can mules usually not have babies?|their chromosomes do not pair well|🫏||they are too small,they are too old",
    "Why is the breeding idea hard to use for fossils?|you cannot test breeding|🦴||fossils are too bright,fossils grow",
    "Which can scientists use to separate species besides breeding?|DNA|🧬||weather,guesses",
    "Bacteria copy themselves without mating. The breeding idea works...|poorly for them|🦠||perfectly for them,only at night",
    "Two groups that look alike but never interbreed in the wild are probably...|different species|🔍||the same species,twins",
    "Naming a new species often uses body features and...|DNA tests|🧪||horoscopes,colors alone"
  ], W, "Think about breeding and fertile offspring."));
  a.push(MIX("Mixed practice", a.slice(0, 18)));
  a.push(MIX("Level 19 Challenge", a.slice(0, 18).reverse()));

  // ================= LEVEL 20 =================
  b.push(L("Incomplete dominance and codominance", [
    "Blending|🌸|In <b>incomplete dominance</b> neither allele fully wins, so the offspring look in between. Black and white Andalusian chickens give blue-gray chicks.",
    "Both show|🐄|In <b>codominance</b> both alleles show at the same time. A roan cow has both red and white hairs mixed together.",
    "In people too|🩸|Human blood type AB is codominance: both the A and B markers appear on the red blood cells."
  ], [
    "Black and white Andalusian chickens have blue-gray chicks. This is...|incomplete dominance|🐔||codominance,a mutation",
    "A roan cow has both red and white hairs. This is...|codominance|🐄||incomplete dominance,recessive",
    "In codominance, the two alleles...|both show|🧬||blend into one,cancel out",
    "In incomplete dominance, offspring look...|in between|🌸||exactly like one parent,like neither and random",
    "Blood type AB is an example of...|codominance|🩸||incomplete dominance,mutation",
    "A pink flower from a red and a white parent shows...|incomplete dominance|🌸||codominance,full dominance",
    "In complete dominance, the heterozygote looks like...|the dominant parent|🧬||a blend,neither parent",
    "Which pattern lets you see both alleles at once?|codominance|🐄||complete dominance,incomplete dominance"
  ], W, "Ask: do the traits blend, or do both show?"));
  b.push(L("Sex-linked traits", [
    "Genes on X|🧬|Some genes sit on the X chromosome. Males have one X and one Y, so a single recessive allele on their X shows up. This is a <b>sex-linked</b> trait.",
    "Why males show more|👦|A female has two X chromosomes, so a second normal copy can cover a recessive one. Red-green color blindness in people is X-linked and more common in males.",
    "Calico cats|🐱|The gene for orange or black fur is on the X. A female cat with one of each gets patches of both, so calico cats are almost always female."
  ], [
    "Sex-linked genes are found on the...|sex chromosomes|🧬||tail,mitochondria only",
    "Why do males show X-linked recessive traits more often?|they have only one X|👦||they have three X chromosomes,they have no genes",
    "Calico cats are almost always...|female|🐱||male,twins",
    "A female mammal has which sex chromosomes?|XX|🧬||XY,YY",
    "A male mammal has which sex chromosomes?|XY|🧬||XX,YY",
    "Red-green color blindness in people is usually carried on the...|X chromosome|👁️||Y chromosome,chromosome 1 only",
    "Why can a second X protect a female?|it can carry a working copy|🧬||it makes her stronger,it hides her genes",
    "Patches of two fur colors in a calico cat happen because...|different X copies are used in different patches|🐱||the cat is dirty,the cat has two heads"
  ], W, "Think about how many X chromosomes each sex has."));
  b.push(L("Chromosomes and karyotypes", [
    "Counting chromosomes|🔢|Each species has its own number of chromosomes in body cells: fruit fly 8, cat 38, human 46, horse 64, dog 78.",
    "More is not smarter|🐕|The number tells nothing about how complex an animal is. A dog has more chromosomes than a human.",
    "A karyotype|📷|A <b>karyotype</b> is a picture of all the chromosomes in a cell, sorted into pairs. Egg and sperm cells have half the number of body cells."
  ], [
    "How many chromosomes are in a human body cell?|46|🧍||23,64",
    "A fruit fly body cell has how many chromosomes?|8|🪰||38,78",
    "A picture of all the chromosomes sorted in pairs is a...|karyotype|📷||genome map,pedigree",
    "Egg cells have how many chromosomes compared with body cells?|half|🥚||double,the same",
    "Which has more chromosomes, a dog or a human?|a dog|🐕||a human,exactly the same",
    "Does a higher chromosome number mean a smarter animal?|no|🤔||yes,always",
    "A cat body cell has 38 chromosomes. How many in a cat sperm cell?|19|🐱||38,76",
    "Chromosomes are made of DNA wrapped around proteins and found in the...|nucleus|🧫||skin,blood plasma"
  ], W, "Remember: numbers are different for each species, and gametes have half."));
  b.push(L("Epigenetics", [
    "Tags on DNA|🏷️|<b>Epigenetic tags</b> are chemical marks on DNA that switch genes on or off without changing the DNA letters.",
    "Same DNA, different animals|🐝|A honeybee larva fed royal jelly becomes a queen. A larva fed ordinary food becomes a worker. They have the same DNA, but different tags.",
    "Passing on|🧬|Some tags can be passed to offspring, but most are reset. Identical twins start with the same DNA and gradually collect different tags."
  ], [
    "Epigenetic tags change which genes are...|switched on or off|🏷️||spelled wrong,deleted forever",
    "Do epigenetic tags change the DNA letters?|no|🧬||yes always,only in fish",
    "What food helps a honeybee larva become a queen?|royal jelly|🐝||pollen only,nectar only",
    "Queen and worker bees have...|the same DNA|🐝||different species,different bodies of DNA",
    "Identical twins can differ over time partly because of...|epigenetic tags|👯||new species,changing letters of DNA",
    "A chemical mark added to DNA is called a...|tag|🏷️||bone,fin",
    "Most tags are reset when...|a new embryo forms|🥚||an animal sleeps,the sun sets",
    "Epigenetics shows that genes can be affected by...|environment and diet|🌍||only the moon,only luck"
  ], W, "The DNA letters stay the same, but the genes can be turned up or down."));
  b.push(L("Hox genes and body plans", [
    "Body map genes|🧬|<b>Hox genes</b> work like a map. They tell each part of a growing embryo, from head to tail, what to become.",
    "Shared toolkit|🪰🐭|Flies and mice have very similar Hox genes, even though their bodies look so different. Small changes in these genes can make big changes in body shape.",
    "Mix-ups|🔧|A mutation in a fly Hox gene once made legs grow where antennae should be. It shows these genes act like master switches."
  ], [
    "Hox genes help set up the animal's...|body plan from head to tail|🧬||eye color only,favorite food",
    "Flies and mice have Hox genes that are...|very similar|🪰||totally different,missing",
    "A mutation in a Hox gene can change...|which body part grows where|🔧||the number of stars,nothing at all",
    "Hox genes are like a...|master switch|🔧||paintbrush,pencil",
    "Why do scientists find similar Hox genes in many animals?|animals share ancient ancestors|🌳||by accident,because they eat the same food",
    "Hox genes work along the body from head to...|tail|🐭||toe only,skin only",
    "Small changes in Hox genes can help explain how new body shapes...|evolve|🦎||disappear for good,are hidden",
    "A fly with legs where its antennae should be had a mutation in a...|Hox gene|🪰||bone,tooth"
  ], W, "Think about a map that tells body parts where to grow."));
  b.push(L("Stem cells and cloning", [
    "Cells that can become many|🧫|<b>Stem cells</b> can become many types of cells, like muscle or nerve cells. Embryos have lots of them.",
    "Regrowing|🦎|Salamanders can regrow a whole leg because their cells can turn back into a stem-like state. Mammals can do much less.",
    "Dolly the sheep|🐑|In 1996, Dolly became the first mammal cloned from an adult body cell. Scientists put its nucleus into an egg with its own nucleus removed."
  ], [
    "A stem cell can become...|many types of cells|🧫||only one cell type,a rock",
    "Which animal can regrow a whole leg?|a salamander|🦎||a horse,a cat",
    "Dolly was the first mammal cloned from an adult...|body cell|🐑||egg only,bone only",
    "A clone has DNA that is...|the same as the donor|🧬||totally new,half and half",
    "In cloning a sheep, scientists put a nucleus into an egg without its own...|nucleus|🥚||shell,tail",
    "Where are many stem cells found?|in embryos|🧫||in fur,in shells",
    "A cell that has become a muscle cell is said to be...|specialized|💪||wild,frozen",
    "Dolly was cloned in...|1996|🐑||1066,2021"
  ], W, "Think about cells that can become many kinds."));
  b.push(L("Joints and cartilage", [
    "Where bones meet|🦴|A <b>joint</b> is where bones meet. Ball-and-socket joints (shoulder, hip) move in many directions. Hinge joints (elbow, knee) open and close.",
    "Soft connectors|🧵|<b>Ligaments</b> join bone to bone. <b>Tendons</b> join muscle to bone. <b>Cartilage</b> is smooth and cushions the ends of bones.",
    "A cartilage skeleton|🦈|Sharks and rays have skeletons made of cartilage instead of bone. It is lighter and more flexible."
  ], [
    "A ligament connects bone to...|bone|🦴||muscle,skin",
    "A tendon connects muscle to...|bone|💪||fat,skin",
    "Which joint opens and closes like a door?|a hinge joint|🚪||a ball-and-socket joint,a fixed joint",
    "The shoulder is an example of a...|ball-and-socket joint|💪||hinge joint,pivot joint",
    "What cushions the ends of bones?|cartilage|🦴||fur,skin",
    "A shark's skeleton is made of...|cartilage|🦈||bone,shell",
    "The knee is mostly a...|hinge joint|🦵||ball-and-socket joint,fused joint",
    "Cartilage is bendier than bone, which makes a shark skeleton more...|flexible|🦈||breakable,heavy"
  ], W, "Think about what each part connects."));
  b.push(L("How muscles contract", [
    "Sliding threads|💪|Muscle fibers hold two kinds of protein threads, <b>actin</b> and <b>myosin</b>. They slide past each other, which shortens the muscle.",
    "Energy needed|⚡|Contracting uses ATP for energy and calcium as a signal. Muscles can only pull, never push.",
    "Working in pairs|🦾|Muscles work in pairs. When the biceps pulls the forearm up, the triceps relaxes. To straighten the arm, they swap jobs."
  ], [
    "Muscles can only...|pull|💪||push,float",
    "The two protein threads in muscle are actin and...|myosin|🧵||keratin,insulin",
    "Muscles get their energy from...|ATP|⚡||bone,plasma",
    "When a muscle contracts, it gets...|shorter|💪||longer,colder",
    "Muscles that pull in opposite directions form an...|antagonistic pair|🦾||ally pair,single pair",
    "When the biceps contracts, the triceps...|relaxes|🦾||also contracts hard,disappears",
    "Which muscle signal ion helps start a contraction?|calcium|🦴||sodium chloride,iron",
    "Actin and myosin do their work by...|sliding past each other|🧵||growing longer,spinning"
  ], W, "Think about sliding threads and pulling."));
  b.push(L("Antibodies and allergies", [
    "Y-shaped proteins|🛡️|<b>Antibodies</b> are Y-shaped proteins made by B cells. Each one fits one particular germ marker, called an <b>antigen</b>.",
    "Memory|🧠|After an infection, memory cells stay behind. If the same germ returns, the body responds faster.",
    "Allergies|🤧|An <b>allergy</b> is when the immune system overreacts to something harmless, like pollen or a food. It releases histamine. Dogs and cats get allergies too."
  ], [
    "Antibodies are made by...|B cells|🛡️||red blood cells,platelets",
    "The marker on a germ that an antibody recognizes is an...|antigen|🦠||antler,antenna",
    "An allergy is the immune system reacting to something...|harmless|🤧||dangerous only,invisible",
    "Which chemical causes sneezing and itchy eyes in allergies?|histamine|🤧||melanin,insulin",
    "Memory cells help the body respond faster to a...|germ it met before|🧠||brand new food,cold weather",
    "An antibody's shape looks like the letter...|Y|🛡️||O,Z",
    "Can pets such as dogs have allergies?|yes|🐕||no,only fish",
    "Each antibody matches...|one type of antigen|🔑||every germ,no germs"
  ], W, "Think of an antibody as a key that fits one lock."));
  b.push(L("Density-dependent factors", [
    "Crowding|🐁|Some things hurt a population more when it is crowded. These are <b>density-dependent</b> factors: disease, competition for food and predators.",
    "Anytime hazards|🔥|Others do not care how many animals there are. Fires, floods, storms and droughts are <b>density-independent</b>.",
    "Why it matters|📉|Density-dependent factors help keep a population near its carrying capacity."
  ], [
    "Which is density-dependent?|disease spreading in a crowd|🦠||a wildfire,a flood",
    "Which is density-independent?|a flood|🌊||competition for food,disease",
    "As a population becomes crowded, competition for food gets...|stronger|🐁||weaker,silent",
    "A drought hurts a big and a small group alike. It is...|density-independent|☀️||density-dependent,a predator",
    "Density-dependent factors help a population stay near its...|carrying capacity|🏞️||birthday,color",
    "Disease spreads faster when animals are...|crowded together|🦠||far apart,asleep",
    "Wolves catching more deer when deer are plentiful is...|density-dependent|🐺||density-independent,random chance",
    "A hurricane hitting an island is...|density-independent|🌀||density-dependent,caused by crowding"
  ], W, "Ask: does the factor get worse when more animals are packed together?"));
  b.push(L("Dead zones", [
    "Too many nutrients|🌽|Fertilizer from farms washes into rivers. The nitrogen and phosphorus feed huge algae blooms in the water.",
    "Dying algae|🦠|When the algae die, bacteria break them down and use up the oxygen. Low oxygen is called <b>hypoxia</b>.",
    "A dead zone|🐟|Fish and crabs cannot get enough oxygen, so they leave or die. A large dead zone forms each summer in the Gulf of Mexico. Using less fertilizer and keeping wetlands helps."
  ], [
    "Too many nutrients in water causes...|algae blooms|🟢||ice storms,more oxygen",
    "A low-oxygen area in water is called a...|dead zone|🌊||reef,delta",
    "Who uses up the oxygen as algae are broken down?|bacteria|🦠||dolphins,rocks",
    "What farm product washes into rivers and feeds algae?|fertilizer|🌽||sand,rain",
    "Low oxygen in water is called...|hypoxia|🐟||osmosis,hibernation",
    "A big dead zone forms yearly in the Gulf of...|Mexico|🗺️||Alaska,Siberia",
    "Which action helps prevent dead zones?|using less fertilizer|🌱||pouring more nutrients in,removing all wetlands",
    "Fish in a dead zone often...|leave or die|🐟||grow bigger,sing"
  ], W, "Follow the chain: nutrients, algae, bacteria, oxygen."));
  b.push(L("Water and phosphorus cycles", [
    "The water cycle|💧|Water <b>evaporates</b>, rises, <b>condenses</b> into clouds, falls as <b>precipitation</b> and flows back as <b>runoff</b>. Plants release water too, called <b>transpiration</b>.",
    "Phosphorus has no gas|🪨|Phosphorus has no gas form in air. It is released from rocks by <b>weathering</b>, taken up by plants, and passed to animals who eat them.",
    "Returning|🐚|Animals return phosphorus in waste and when they die. Seabird droppings, called guano, are rich in phosphorus."
  ], [
    "Water turning into vapor is called...|evaporation|☀️||condensation,runoff",
    "Vapor turning into cloud droplets is...|condensation|☁️||evaporation,weathering",
    "Rain and snow are types of...|precipitation|🌧️||transpiration,erosion",
    "Plants releasing water vapor is called...|transpiration|🌿||respiration,digestion",
    "Where does most phosphorus in ecosystems come from?|weathered rocks|🪨||the air,the sun",
    "Does the phosphorus cycle have a gas stage?|no|🧪||yes a big one,only at night",
    "Seabird droppings are rich in...|phosphorus|🐦||helium,iron",
    "Water flowing over land back to rivers and the sea is...|runoff|🏞️||evaporation,precipitation"
  ], W, "Think about each step, one at a time."));
  b.push(L("Seasonal breeding", [
    "Daylight is the clock|🌅|Many animals use <b>photoperiod</b>, the length of daylight, as a calendar. It changes hormones.",
    "Timing babies|🐑|Young need food, so animals time births for spring. Sheep mate in autumn and carry their lambs about 5 months. Deer mate in autumn and fawns come in spring.",
    "A body signal|🌙|The pineal gland makes melatonin at night. Long nights mean more melatonin, which tells the body the season."
  ], [
    "The length of daylight is called...|photoperiod|🌅||perimeter,period of rain",
    "Why do many animals have babies in spring?|food is plentiful|🌸||it is dark,winter is near",
    "Sheep mate in autumn so lambs are born in...|spring|🐑||autumn,winter",
    "Which hormone rises at night and tells the body about season?|melatonin|🌙||insulin,adrenaline",
    "Which gland makes melatonin?|the pineal gland|🧠||the pancreas,the liver",
    "Birds often start breeding when days get...|longer|🐦||shorter,colder",
    "Long winter nights mean the body makes more...|melatonin|🌙||chlorophyll,keratin",
    "Using daylight length as a calendar works because it is...|the same each year|📅||random,always cloudy"
  ], W, "Think about what tells an animal what time of year it is."));
  b.push(BOTH("Probability in nature", [
    "Chance|🎲|Probability tells how likely something is. A coin lands on heads with a 1 in 2 chance, or 50 percent.",
    "Chances in a row|🧬|For events that do not affect each other, you multiply their chances. Two heterozygous parents (Aa x Aa) have a 1 in 4 (25 percent) chance of an aa baby.",
    "Past does not matter|🔁|If four coin flips in a row were heads, the next is still 50 percent. Each birth or flip is independent."
  ], [
    "A fair coin lands heads with what chance?|50 percent|🪙||25 percent,100 percent",
    "Aa x Aa parents have an aa baby with what chance?|25 percent|🧬||50 percent,75 percent",
    "Aa x Aa parents have a baby showing the dominant trait with what chance?|75 percent|🧬||25 percent,50 percent",
    "After four heads in a row, the next flip is heads with what chance?|50 percent|🪙||25 percent,0 percent",
    "Events that do not affect each other are called...|independent|🎲||connected,sticky",
    "To find the chance of two independent events both happening, you...|multiply|✖️||subtract,ignore",
    "A chance of 1 in 10 is the same as...|10 percent|🔟||1 percent,100 percent",
    "A heterozygous Aa parent passes on allele a with what chance?|50 percent|🧬||25 percent,100 percent"
  ], W, "Think about chance as a fraction or a percent.", prob, 0.45));
  b.push(BOTH("Temperature and cold-blooded speed", [
    "Ectotherms follow the weather|🦎|An ectotherm's body temperature follows its surroundings. Its speed and appetite rise when it warms and fall when it cools.",
    "Doubling rule|🌡️|For many animals, activity rate doubles for about every 10 degrees C of warming. This is the idea behind Q10 = 2.",
    "Limits|🥵|Too hot is dangerous. Past a certain point, the animal slows and may be harmed, so lizards seek shade."
  ], [
    "A lizard's speed when it is cooler is...|slower|🦎||faster,the same",
    "Why do lizards bask in the sun in the morning?|to warm up and get active|☀️||to cool off,to hide",
    "An ectotherm's body temperature mostly follows...|its surroundings|🌡️||its meal size,its age",
    "A very hot day can make a lizard seek...|shade|🥵||a heater,a snowdrift",
    "Frogs are less active in winter because they are...|cold|🐸||bored,louder",
    "If a rate doubles for every 10 degrees, then 20 degrees warmer gives...|four times the rate|🌡️||twice the rate,no change",
    "A warm-blooded animal keeps a steady temperature using its...|own body heat|🔥||surroundings only,fur color",
    "Which animal is an ectotherm?|a snake|🐍||a dog,a robin"
  ], W, "Think about heat from outside, and how it changes speed.", q10, 0.45));
  b.push(L("Three domains of life", [
    "Three big groups|🌳|Scientists sort life into three domains: <b>Bacteria</b>, <b>Archaea</b> and <b>Eukarya</b>.",
    "No nucleus|🦠|Bacteria and Archaea are single cells with no nucleus. Many archaea live in extreme places like hot springs, but some are found in soil and oceans too.",
    "Us|🐾|Eukarya have cells with a nucleus. Animals, plants, fungi and protists are all in Eukarya. Fungi are closer relatives of animals than of plants."
  ], [
    "Animals belong to the domain...|Eukarya|🐾||Bacteria,Archaea",
    "Which domain includes the germs that cause strep throat?|Bacteria|🦠||Archaea,Eukarya",
    "Cells with a nucleus are in the domain...|Eukarya|🧫||Bacteria,Archaea",
    "How many domains of life are commonly used?|3|3️⃣||2,6",
    "Which group has cells with no nucleus?|Bacteria|🦠||Eukarya,animals",
    "Fungi are more closely related to...|animals|🍄||plants,bacteria",
    "Many Archaea were first found living in...|hot springs|♨️||wool,toys",
    "A mushroom, a dog and an oak tree are all in...|Eukarya|🌳||Archaea,Bacteria"
  ], W, "Think about nuclei and which big group animals belong to."));
  b.push(L("Optimal foraging", [
    "Smart searching|🐦|Animals seem to weigh the energy a meal gives against the time and effort to get it. This is called <b>optimal foraging</b>.",
    "Leaving the patch|🌿|A bird picks berries from a bush. At first it gets many, then fewer. When the gain per minute drops below what it expects elsewhere, leaving is best.",
    "Choosy eaters|🦀|Shore crabs often pick medium mussels. Large ones take too long to open, and small ones give too little energy."
  ], [
    "Optimal foraging is about getting the most energy for the...|effort|🐦||colors,noise",
    "When should a bird leave a berry bush?|when gains fall below what it expects elsewhere|🌿||as soon as it arrives,never",
    "A shore crab often picks medium mussels because large ones take too long and small ones give...|too little energy|🦀||too much energy,too much noise",
    "Prey that costs more energy to catch than it gives is not worth...|chasing|⚖️||eating,naming",
    "Animals that forage well tend to leave more...|offspring|🐣||footprints,shadows",
    "As a bush gets picked clean, the gain per minute...|goes down|🍓||goes up,stays at the top",
    "Traveling between patches costs...|time and energy|🚶||nothing,only money",
    "A bird hunting in a rich patch should likely stay...|longer|🐦||for one second,away"
  ], W, "Think about energy gained compared with energy and time spent."));
  b.push(L("Habituation and sensitization", [
    "Getting used to it|🦅|<b>Habituation</b> is learning to ignore a harmless thing that happens again and again. Birds stop fearing a scarecrow after a while.",
    "Getting more alert|🔔|<b>Sensitization</b> is when a strong or scary event makes an animal react more to other things afterward.",
    "A simple learner|🐌|Even a sea slug called Aplysia learns this way. It pulls in its gill less often if gently touched again and again."
  ], [
    "Learning to ignore a harmless repeated thing is...|habituation|🦅||sensitization,migration",
    "A scarecrow stops working over time because birds...|get used to it|🌾||grow bigger,go blind",
    "Reacting more after a strong, scary event is...|sensitization|🔔||habituation,mating",
    "Prairie dogs that stop alarming at walkers show...|habituation|🐿️||sensitization,a mutation",
    "Which animal is famous for a simple habituation study?|a sea slug|🐌||an eagle,a bear",
    "Habituation saves an animal...|energy|⚡||legs,teeth",
    "Sensitization helps an animal be more...|watchful|👀||sleepy,hungry",
    "Learning to ignore a ticking clock is an example of...|habituation|⏰||sensitization,hibernation"
  ], W, "Ask: is the animal getting used to it, or getting more alert?"));
  b.push(MIX("Mixed practice", b.slice(0, 18)));
  b.push(MIX("Level 20 Challenge", b.slice(0, 18).reverse()));

  // ================= LEVEL 21 =================
  c.push(L("Endosymbiosis", [
    "A cell inside a cell|🔋|Mitochondria, the power plants of animal cells, were probably once free-living bacteria swallowed by a bigger cell about 2 billion years ago. Both gained, so they stayed together. This is <b>endosymbiosis</b>.",
    "The evidence|🔬|Mitochondria have their own circular DNA like bacteria, a double membrane, and they divide on their own inside the cell.",
    "Plants too|🌿|Chloroplasts in plants and algae came the same way, from bacteria that could do photosynthesis. Animals have mitochondria but not chloroplasts."
  ], [
    "Mitochondria probably began as...|free-living bacteria|🔋||viruses,rocks",
    "The idea that organelles began as swallowed cells is called...|endosymbiosis|🔬||metamorphosis,osmosis",
    "Which part of an animal cell has its own DNA?|the mitochondrion|🔋||the nucleus only,the cell wall",
    "Which organelles do plants have that animals do not?|chloroplasts|🌿||mitochondria,ribosomes",
    "Mitochondria divide...|on their own inside the cell|🔬||never,only in the sun",
    "Mitochondrial DNA has a shape like a...|circle|⭕||ladder,star",
    "Endosymbiosis happened because both cells...|gained something|🤝||fought forever,were identical",
    "Chloroplasts came from bacteria that could do...|photosynthesis|☀️||digestion,hibernation"
  ], W, "Think about a cell moving in with a bigger cell, and both benefiting."));
  c.push(BOTH("Relative fitness", [
    "Fitness means offspring|🪲|In evolution, <b>fitness</b> is how many offspring that survive to breed an animal leaves, not how strong it is.",
    "Comparing types|📊|<b>Relative fitness</b> compares each type to the best type: its offspring divided by the best type's offspring.",
    "Selection strength|💪|The <b>selection coefficient</b> is 1 minus relative fitness. A type with relative fitness 0.6 has a selection coefficient of 0.4, so it is selected against."
  ], [
    "In evolution, fitness is measured by...|surviving offspring|🪲||muscle size,speed alone",
    "The best type in a group has a relative fitness of...|1|🏆||0,10",
    "Relative fitness compares a type to the...|best type|📊||smallest type,oldest type",
    "A type that leaves no offspring has fitness...|zero|0️⃣||one,ten",
    "A type with relative fitness 1 has a selection coefficient of...|0|📊||1,10",
    "Which animal has higher fitness?|one that leaves more surviving young|🐣||one that lives longest without young,one that is biggest",
    "Fitness depends on the...|environment|🌍||animal's name,shape of the moon",
    "Selection coefficient measures how strongly a type is...|selected against|📉||fed,named"
  ], W, "Compare to the best type, not to a fixed number.", relfit, 0.45));
  c.push(BOTH("Hardy-Weinberg balance", [
    "A population in balance|⚖️|If allele frequencies do not change, the population is in <b>Hardy-Weinberg</b> balance. For two alleles: p + q = 1 and p squared + 2pq + q squared = 1.",
    "What the letters mean|🔤|p is the dominant allele frequency, q is the recessive one. q squared is the share of animals with two recessive alleles. 2pq is the share of heterozygous carriers.",
    "Rules of balance|📏|Balance needs a big population, random mating, no mutation, no migration and no natural selection. Real populations break these rules, which is how scientists spot evolution."
  ], [
    "In Hardy-Weinberg, p + q equals...|1|⚖️||2,0",
    "In the equation, q squared is the share with...|two recessive alleles|🧬||two dominant alleles,one of each",
    "2pq is the share of...|heterozygous carriers|🧬||recessive animals,dominant homozygotes",
    "Hardy-Weinberg assumes the population is...|large|👥||tiny,shrinking fast",
    "If allele frequencies change over time, the population is...|evolving|📈||in balance,extinct",
    "Which would break Hardy-Weinberg balance?|natural selection|🌿||random mating,a large population",
    "p stands for the frequency of the...|dominant allele|🔤||recessive allele,mutation",
    "Hardy-Weinberg is useful because it gives a baseline to compare against to see...|if evolution is happening|📊||what color is best,the age of the Earth"
  ], W, "Remember p + q = 1 and that q squared is the recessive share.", hw, 0.5));
  c.push(L("Reading evolution trees with parsimony", [
    "Fewest changes|🌳|<b>Parsimony</b> says the best family tree is the one that needs the fewest evolutionary changes to explain the traits.",
    "Shared new traits|🧬|Relatives share <b>derived traits</b> inherited from a recent common ancestor. Hair is shared by mammals, so it points to a mammal ancestor.",
    "Outgroup|🧭|To tell old traits from new ones, scientists include an <b>outgroup</b>, a more distant relative that branches off earlier."
  ], [
    "Parsimony prefers the tree with...|the fewest changes|🌳||the most changes,the most animals",
    "A trait shared by a group because of a recent ancestor is a...|derived trait|🧬||random trait,pet trait",
    "A distant relative used to compare against is the...|outgroup|🧭||ingroup,sibling",
    "Hair is a derived trait shared by...|mammals|🐾||all animals,reptiles",
    "A tree needing 5 changes or a tree needing 8. Parsimony picks the one with...|5 changes|🌳||8 changes,no changes",
    "Feathers point to a common ancestor shared by...|birds|🪶||fish,insects",
    "Each branch point on a tree stands for a...|common ancestor|🌳||tooth,habitat",
    "Why use an outgroup?|to see which traits are old and which are new|🧭||to add more branches for fun,to count legs"
  ], W, "Fewer changes make a simpler story."));
  c.push(BOTH("Net primary productivity", [
    "Plants make the energy|🌿|<b>GPP</b>, gross primary productivity, is all the energy producers capture by photosynthesis.",
    "What is left|🔋|Producers use some energy in respiration. <b>NPP = GPP - respiration</b>. NPP is what is left to feed consumers.",
    "Rich and poor places|🌍|Tropical rainforests and estuaries have high NPP per area. Deserts and open oceans have low NPP per area, but oceans are so big they make a lot in total."
  ], [
    "NPP stands for net primary...|productivity|🌿||pressure,position",
    "NPP equals GPP minus...|respiration|🌿||consumers,sunlight",
    "NPP is the energy that is left for...|consumers|🐛||the Sun,the soil only",
    "Which place has high NPP per area?|a tropical rainforest|🌴||a desert,the polar ice",
    "Which has low NPP per area?|a desert|🏜️||an estuary,a rainforest",
    "GPP is the energy captured by producers through...|photosynthesis|☀️||digestion,hibernation",
    "Why is the open ocean important for total NPP?|it is huge|🌊||it has no water,it has the most trees",
    "If respiration uses most of GPP, NPP is...|small|📉||large,negative always"
  ], W, "Think about what is left after producers use some for themselves.", npp, 0.45));
  c.push(L("Fragmented habitats", [
    "Broken into pieces|🧩|Roads and farms can cut a big habitat into small patches. This is <b>fragmentation</b>.",
    "Edge effects|🌲|Edges have more wind, sun and predators than the deep interior. Small patches are mostly edge, and interior species struggle.",
    "Linking patches|🦌|A <b>metapopulation</b> is a set of small groups linked by animals moving between patches. Wildlife corridors and bridges help, and new arrivals can rescue a patch where a group died out."
  ], [
    "Cutting a habitat into small pieces is called...|fragmentation|🧩||restoration,migration",
    "A set of small groups linked by movement is a...|metapopulation|🦌||monoculture,herd mood",
    "What conditions are different at a habitat edge?|more wind and sun|🌲||more fish,less gravity",
    "A small patch is hard for interior species because it is mostly...|edge|🌲||core,water",
    "A wildlife bridge over a road helps animals...|move between patches|🌉||drive faster,sleep",
    "When new arrivals save a patch that lost its group, it is called the...|rescue effect|🦌||edge effect,tide effect",
    "A corridor links...|habitat patches|🌿||two oceans,clouds",
    "Fragmentation can harm animals that need...|large areas|🐆||tiny areas,loud areas"
  ], W, "Think about small pieces, and what links them."));
  c.push(BOTH("Species and area", [
    "More space, more species|🏝️|Bigger islands and habitats hold more species. A rule of thumb: ten times the area has about twice the species.",
    "Distance matters|🛶|Islands near the mainland get new arrivals more often. Far islands get fewer. This is the idea of island biogeography.",
    "Balance|⚖️|Species arrive (immigration) and die out (extinction). Big, near islands have more arrivals and fewer die-outs, so they hold more species."
  ], [
    "Bigger islands usually have...|more species|🏝️||fewer species,the same species",
    "Which island likely has more species, a near one or a far one?|a near one|🛶||a far one,they are equal",
    "Species arriving on an island is called...|immigration|🛬||extinction,mutation",
    "Big islands have a lower chance of...|extinction of species|🏝️||sunshine,tides",
    "If area grows tenfold, species grow about...|twofold|🔟||tenfold,hundredfold",
    "The idea of species on islands is called island...|biogeography|🗺️||geometry,chemistry",
    "Reserves that are too small will likely lose...|species|🦎||roads,borders",
    "Distance from the mainland affects how often species...|arrive|🛶||fall asleep,molt"
  ], W, "Think about space, and how easily species can reach the place.", spare, 0.45));
  c.push(L("Bones: structure and growth", [
    "Living bone|🦴|Bone is alive. <b>Osteoblasts</b> build new bone, and <b>osteoclasts</b> break down old bone. Together they repair breaks and reshape bones.",
    "Inside bones|🩸|Bones store calcium, and their marrow makes blood cells. Long bones grow at growth plates near their ends until adulthood.",
    "Light bones|🦅|Bird bones are partly hollow with air spaces and braces inside, so they are light but strong."
  ], [
    "Cells that build new bone are...|osteoblasts|🦴||osteoclasts,platelets",
    "Cells that break down old bone are...|osteoclasts|🦴||osteoblasts,neurons",
    "Bone marrow makes...|blood cells|🩸||hair,feathers",
    "Bones store which mineral?|calcium|🦴||helium,sulfur only",
    "Long bones grow at their...|growth plates|📏||tendons,joints only",
    "Bird bones are partly hollow, which makes them...|light|🦅||heavy,soft",
    "A broken bone can heal because bone is...|living tissue|🩹||frozen,rock",
    "Bone is made of living cells and a hard mineral called...|calcium phosphate|🦴||plastic,iron"
  ], W, "Think about the cells that build and the cells that remove."));
  c.push(L("Memory in animal brains", [
    "A map in the brain|🧠|The <b>hippocampus</b> helps animals remember places. Birds that hide many seeds, like chickadees and nutcrackers, have a larger hippocampus.",
    "Remembering flowers|🐝|Honeybees learn the scent and color of rewarding flowers and remember them. Octopuses can learn to open jars.",
    "Long memories|🐘|Elephants remember where water holes are, sometimes after many years. Older females lead herds partly because of this."
  ], [
    "Which brain part helps animals remember places?|the hippocampus|🧠||the cerebellum only,the spine",
    "Birds that hide lots of seeds often have a larger...|hippocampus|🐦||beak,tail",
    "Honeybees remember the scent of...|good flowers|🐝||the Moon,fur",
    "Which animal can learn to open a jar?|an octopus|🐙||a jellyfish,a sponge",
    "Older female elephants lead herds partly because they...|remember water holes|🐘||are the fastest,are the loudest",
    "A chickadee finds its hidden seeds using...|memory|🐦||magic,luck only",
    "A bigger hippocampus helps with...|remembering places|🗺️||breathing,digesting",
    "Learning that stays for a long time is called...|long-term memory|🧠||short-term sleep,instinct"
  ], W, "Think about the brain part that stores places."));
  c.push(L("Dominance hierarchies", [
    "Pecking order|🐔|Chickens form a pecking order. The top hen eats first, and each hen knows who ranks above and below her. The word comes from pecking.",
    "Less fighting|🕊️|Once ranks are settled, animals fight less, because everyone knows their place. Rank often depends on size, age or past wins.",
    "Wolf packs|🐺|A wild wolf pack is usually a family, with parents leading their young. The old idea of one fighting alpha comes mostly from studies of unrelated wolves in zoos."
  ], [
    "A pecking order is an example of a...|dominance hierarchy|🐔||migration,habitat",
    "A dominance hierarchy helps reduce...|fighting|🕊️||eating,sleeping",
    "In a chicken flock, the top hen often...|eats first|🐔||eats last,sleeps all day",
    "A wild wolf pack is usually a...|family|🐺||group of strangers,school",
    "Rank can depend on size, age or...|past wins|🏆||fur color only,favorite food",
    "The term pecking order came from observing...|chickens|🐔||wolves,whales",
    "Once ranks are settled, animals usually...|fight less|🕊️||fight more,leave the flock",
    "A lower-ranking animal often...|waits for its turn to eat|🍽️||eats first,leads the pack"
  ], W, "Think about who is first, who is next, and why there is less fighting."));
  c.push(L("Honest signals", [
    "Costly signals|🦚|Zahavi's <b>handicap principle</b>: a signal that costs a lot can only be made by a healthy animal, so it is honest. A peacock's long tail is hard to carry.",
    "Warning the hunter|🦌|A gazelle bounces high, called <b>stotting</b>, when it sees a hunter. It shows it is fit and not worth chasing.",
    "Cheap signals|📢|A cheap signal is easy to fake, so it can be trusted less. Honest signals are costly or cannot be faked."
  ], [
    "The handicap principle says costly signals are...|honest|🦚||fake,silent",
    "A gazelle that bounces high when it sees a hunter is...|stotting|🦌||hibernating,molting",
    "Stotting tells the hunter the gazelle is...|fit|💪||sleepy,lost",
    "A peacock's big tail shows he is...|healthy|🦚||old,tired",
    "A signal that is easy to fake can be trusted...|less|📢||more,always",
    "A signal is more honest if it is...|costly to make|💰||free to make,random",
    "A deer with large healthy antlers shows...|good condition|🦌||bad luck,a quiet life",
    "Signals that cannot be faked are called...|honest signals|✅||secret signals,silent signals"
  ], W, "Think about why only a strong animal can afford the signal."));
  c.push(L("Parasites that steer hosts", [
    "Changing behavior|🐜|Some parasites change how their host acts so that the parasite can complete its life cycle. A fungus called Ophiocordyceps makes ants climb a plant stem and grip it before the fungus grows.",
    "More examples|🦗|A hairworm makes a cricket jump into water, where the worm lives as an adult. In lab studies, the parasite Toxoplasma makes infected rats lose some fear of cat smells.",
    "Why it works|🔬|Parasites that change host behavior spread better, so natural selection can favor them. Scientists study how they affect the host's brain and body."
  ], [
    "A hairworm makes a cricket jump into...|water|🦗||fire,a nest",
    "A fungus that controls ants makes them climb a...|plant stem|🐜||tree root,rock",
    "Toxoplasma in lab rats makes them lose some fear of...|cat smells|🐀||water,light",
    "Parasites change host behavior to help them finish their...|life cycle|🔄||sandwich,song",
    "Why can natural selection favor such parasites?|they spread better|🦠||they get lost,they run faster",
    "Parasites live on or in a host and...|harm it|🦗||always help it,ignore it",
    "Scientists study these parasites to learn how they affect the host's...|brain and body|🧠||favorite color,shoe size",
    "A hairworm adult lives in...|water|💧||the desert,a tree"
  ], W, "Think about how the parasite benefits when the host acts differently."));
  c.push(L("Virus basics", [
    "Not quite alive|🦠|A <b>virus</b> is a tiny package of genetic material in a protein coat. It has no cells and cannot grow or copy itself alone.",
    "Hijacking cells|🧫|A virus enters a host cell and uses the cell's machinery to make more viruses. Some viruses, called bacteriophages, infect bacteria.",
    "Fighting them|💉|Antibiotics kill bacteria, not viruses. Vaccines train the immune system. Viruses change (mutate), so some vaccines are updated."
  ], [
    "A virus needs a host cell to...|make copies|🦠||eat food,breathe",
    "Do antibiotics work on viruses?|no|💊||yes,only on animals",
    "A virus that infects bacteria is a...|bacteriophage|🦠||bacteriocyte,antibody",
    "A virus is made of genetic material in a...|protein coat|🧬||leaf,shell of calcium",
    "Do viruses have cells?|no|🔬||yes,two",
    "Viruses change over time by...|mutation|🧬||migration,photosynthesis",
    "Vaccines help by training the...|immune system|💉||skeleton,stomach",
    "A virus copies itself using the host's...|cell machinery|🧫||sunlight,bones"
  ], W, "Think about what a virus lacks, and what it borrows."));
  c.push(BOTH("Cost of transport", [
    "Moving costs energy|🏃|The <b>cost of transport</b> is the energy an animal uses to move a certain distance, often for each kilometer.",
    "Swim, fly or run|🏊|For animals of the same size, swimming costs the least energy per distance, flying is in the middle and running costs the most.",
    "Size and speed|📏|Bigger animals use more energy in total but less per kilogram. Moving at an efficient speed saves energy."
  ], [
    "Cost of transport is the energy used to move a given...|distance|🏃||weight,color",
    "For the same size, which is cheapest per distance?|swimming|🏊||running,flying",
    "For the same size, which costs the most per distance?|running|🏃||swimming,flying",
    "Flying costs more than swimming but less than...|running|🐦||floating,sleeping",
    "Moving at an efficient speed...|saves energy|⚡||wastes energy,stops muscles",
    "Bigger animals use more energy in total but less per...|kilogram|🐘||breath,tooth",
    "Why do many migrating whales swim long distances?|swimming is energy-efficient|🐋||water is warm,they like speed",
    "Which uses more energy to cover 10 km, a heavy animal or a light animal of the same kind?|the heavy animal|⚖️||the light animal,they are equal"
  ], W, "Think about energy used for each kilometer.", cot, 0.45));
  c.push(L("Seed dispersal by animals", [
    "Fruit and seeds|🍓|Many plants wrap seeds in tasty fruit. Animals eat the fruit and drop the seeds far away in their dung, often with natural fertilizer.",
    "Hitchhikers and buriers|🌰|Burrs hook onto fur. Squirrels and jays bury acorns and forget some, which grow into oak trees.",
    "Ants and elephants|🐘|Some seeds have an oily snack that ants love, so ants carry them away. Elephants spread the seeds of many forest trees."
  ], [
    "A seed in a berry is spread when an animal eats the berry and then...|drops the seed elsewhere|🍓||keeps it forever,chews it to dust",
    "Burrs spread by sticking to an animal's...|fur|🐕||teeth,eyes",
    "Squirrels help oak trees by burying and forgetting...|acorns|🐿️||leaves,rocks",
    "Ants carry some seeds because they like the oily...|snack on the seed|🐜||wing of the seed,color of the seed",
    "Which large animal spreads many forest tree seeds?|the elephant|🐘||the sloth only,the coral",
    "Why is it good for a plant to spread seeds far from the parent?|less crowding and competition|🌱||it saves water for the parent,it hides from the sun",
    "Plants make fruit tasty so animals will...|eat it and spread seeds|🍎||ignore it,rot it",
    "If dispersers disappear, some forests may be unable to...|spread to new areas|🌳||grow leaves,make seeds"
  ], W, "Think about who carries the seeds and why."));
  c.push(L("Marine protected areas", [
    "Safe places in the sea|🌊|A <b>marine protected area</b> limits fishing and other activities. In a no-take zone, fishing is not allowed at all.",
    "What happens|🐟|Inside, fish grow bigger and more plentiful. Some swim out and enrich nearby waters. This is called <b>spillover</b>.",
    "A big goal|🌍|Many countries aim to protect 30 percent of land and sea by 2030. To work, areas need rules that are followed, and places that matter."
  ], [
    "In a no-take zone, fishing is...|not allowed|🚫||only at night,encouraged",
    "Fish leaving a protected area to nearby waters is called...|spillover|🐟||drift,cleanup",
    "Inside protected areas, fish often become...|bigger and more plentiful|🐟||smaller and fewer,silent",
    "A marine protected area limits fishing and other...|harmful activities|🌊||swimming,sunshine",
    "The 30 by 30 goal aims to protect what share by 2030?|30 percent|🌍||3 percent,90 percent",
    "Why do protected areas need enforcement?|rules must be followed to work|⚖️||they do not,to make noise",
    "Healthy protected reefs can help nearby fishing by...|supplying young fish|🪸||eating the nets,hiding the fish",
    "A protected area works best when it covers places that are...|important for wildlife|🐢||empty,full of boats"
  ], W, "Think about what happens to fish when fishing is limited."));
  c.push(L("Hominin evolution", [
    "Our family tree|🧬|Humans are great apes. We share a common ancestor with chimpanzees that lived about 6 to 7 million years ago. Humans did not come from chimpanzees; both are cousins.",
    "Walking upright|🦴|Hominins walked on two legs. The famous fossil \"Lucy\", an Australopithecus about 3.2 million years old, was found in Ethiopia. Later came Homo erectus, which used fire and spread widely.",
    "Our species|🌍|Homo sapiens appeared in Africa about 300,000 years ago. Neanderthals were a close cousin species, and some people today carry a little Neanderthal DNA."
  ], [
    "Humans share a common ancestor with chimpanzees from about...|6 to 7 million years ago|🐒||6 to 7 hundred years ago,600 million years ago",
    "Humans came directly from chimpanzees.|false they are cousins|🧬||true,true but only partly",
    "Lucy was found in which country?|Ethiopia|🦴||Canada,Chile",
    "Walking on two legs is called...|bipedalism|🚶||quadrupedalism,flying",
    "Homo sapiens first appeared in...|Africa|🌍||Antarctica,Australia",
    "Homo sapiens appeared about how long ago?|300,000 years|⏳||3,000 years,300 million years",
    "Neanderthals were a close cousin of...|modern humans|🧍||chimpanzees only,dinosaurs",
    "Homo erectus used...|fire|🔥||phones,cars"
  ], W, "Think about our family tree and about how old the fossils are."));
  c.push(L("Sample size and significance", [
    "Why big samples help|🔢|Small samples can mislead by luck. A big sample gives a clearer picture and is more reliable.",
    "What a p-value says|📊|A <b>p-value</b> is the chance of seeing results at least this strong if only luck was at work. A small p-value (under 0.05) suggests the result was probably not just luck.",
    "Not the full story|🧪|A significant result can still be small or unimportant. Good scientists repeat experiments and check the size of the effect."
  ], [
    "A bigger sample is usually more...|reliable|🔢||risky,colorful",
    "A small p-value suggests the result was probably not...|just luck|📊||measured,real",
    "A p-value under 0.05 is commonly called...|statistically significant|📊||finished,a law",
    "Testing 3 animals instead of 300 means a result is more likely due to...|chance|🎲||design,growth",
    "Repeating experiments helps check that results are...|reliable|🔁||fast,pretty",
    "A significant result can still be...|small in effect|📏||impossible,wrong always",
    "The p-value is the chance of results this strong if only...|luck was at work|🎲||the Sun was working,animals were silent",
    "Which scientist is better at avoiding mistakes?|one who repeats tests|🔬||one who tests once and stops,one who guesses"
  ], W, "Think about luck, and why more data helps."));
  c.push(MIX("Mixed practice", c.slice(0, 18)));
  c.push(MIX("Level 21 Challenge", c.slice(0, 18).reverse()));

  Object.assign(ANIMALS_LEVELS, { 19: a, 20: b, 21: c });
})();
