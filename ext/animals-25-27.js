// ext/animals-25-27.js  Animals & Nature levels 25-27
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
  // NUM(rnd, build): build(p) -> {text, v, ans, h1, h2, ex}; hint 3 is a solved example with different numbers
  const NUM = (rnd, build) => () => {
    const q = build(rnd());
    let o = build(rnd()), g = 0;
    while (o.ans === q.ans && g++ < 80) o = build(rnd());
    return { text: q.text + " (type a number)", visual: q.v, answer: q.ans, hints: [q.h1, q.h2, `Example: ${o.ex} Now do yours.`] };
  };


  // ---------- number makers ----------
  const kleib = NUM(() => ({ k: ri(0, 2), r: pick([[16, 8], [81, 27], [256, 64], [625, 125]]) }), p => {
    const m = p.r[0], r = p.r[1];
    if (p.k === 0) return { v: "📉", ans: r, text: `An animal is ${m} times heavier than a smaller relative with the same body plan. By Kleiber's law (rate goes with mass to the power 3/4), how many times higher is its whole-body metabolic rate?`, h1: "Total metabolic rate rises more slowly than mass.", h2: "Raise the mass ratio to the power 3/4: take the fourth root, then cube it.", ex: `Mass ${m} times bigger: the fourth root of ${m} is ${Math.round(Math.pow(m, 0.25))}, and cubed that is ${r}. The answer is ${r}.` };
    if (p.k === 1) return { v: "🔥", ans: m / r, text: `An animal is ${m} times heavier than a smaller relative. By Kleiber's law, its metabolic rate per gram is how many times LOWER?`, h1: "Per-gram rate is total rate divided by mass.", h2: "Per-gram rate goes with mass to the power -1/4. Take the fourth root of the mass ratio.", ex: `Mass ${m} times bigger: total rate is ${r} times higher, so per gram it is ${m} / ${r} = ${m / r} times lower. The answer is ${m / r}.` };
    return { v: "⚖️", ans: m, text: `A big animal uses ${r} times as much energy per day as a small relative of the same kind. By the 3/4 rule, how many times heavier is it?`, h1: "Work backwards from the energy ratio to the mass ratio.", h2: "Raise the energy ratio to the power 4/3: take the cube root, then raise to the fourth power.", ex: `An energy ratio of ${r} means mass ratio ${r}^(4/3): the cube root of ${r} is ${Math.round(Math.cbrt(r))}, and to the fourth power that is ${m}. The answer is ${m}.` };
  });
  const meio = NUM(() => ({ k: ri(0, 2), n: ri(2, 5), c: pick([4, 7, 19, 20, 23, 32, 39]) }), p => {
    if (p.k === 0) return { v: "✂️", ans: Math.pow(2, p.n), text: `An animal has ${p.n} pairs of chromosomes. Ignoring crossing over, how many different chromosome combinations can one parent make in its gametes?`, h1: "Each pair can go either way into a gamete.", h2: "Multiply 2 by itself once for each pair of chromosomes.", ex: `With ${p.n + 1} pairs: 2 multiplied ${p.n + 1} times is ${Math.pow(2, p.n + 1)}. The answer is ${Math.pow(2, p.n + 1)}.` };
    if (p.k === 1) return { v: "🥚", ans: p.c, text: `An animal has ${2 * p.c} chromosomes in each body cell. How many chromosomes are in one of its gametes?`, h1: "Meiosis makes haploid gametes.", h2: "Haploid means half the body-cell number.", ex: `A body cell with ${2 * p.c + 2} chromosomes gives gametes with ${p.c + 1}. The answer is ${p.c + 1}.` };
    return { v: "🧬", ans: Math.pow(4, p.n), text: `Both parents have ${p.n} pairs of chromosomes. Ignoring crossing over, how many different zygotes are possible from their gametes?`, h1: "Count the gamete types of each parent, then combine them.", h2: "Each parent makes 2 to the power n gamete types. Multiply the two numbers.", ex: `With ${p.n + 1} pairs each parent makes ${Math.pow(2, p.n + 1)} types, so ${Math.pow(2, p.n + 1)} x ${Math.pow(2, p.n + 1)} = ${Math.pow(4, p.n + 1)}. The answer is ${Math.pow(4, p.n + 1)}.` };
  });
  const dihyb = NUM(() => ({ k: ri(0, 3), N: pick([16, 32, 48, 64, 160, 320]) }), p => {
    const u = p.N / 16, base = `Two mice that are heterozygous for two unlinked genes (AaBb x AaBb) have ${p.N} offspring.`;
    const ex = n => `With ${n} offspring, one sixteenth is ${n / 16}.`;
    if (p.k === 0) return { v: "🐭", ans: 9 * u, text: `${base} About how many show BOTH dominant traits?`, h1: "The expected ratio is 9:3:3:1, out of 16 parts.", h2: "Both dominant is the 9 part. Find one part (total / 16), then multiply by 9.", ex: `${ex(p.N + 16)} Nine parts is ${9 * (u + 1)}. The answer is ${9 * (u + 1)}.` };
    if (p.k === 1) return { v: "🐭", ans: 3 * u, text: `${base} About how many show the first dominant trait and the second recessive trait?`, h1: "The expected ratio is 9:3:3:1, out of 16 parts.", h2: "That group is one of the 3 parts. Find one part (total / 16), then multiply by 3.", ex: `${ex(p.N + 16)} Three parts is ${3 * (u + 1)}. The answer is ${3 * (u + 1)}.` };
    if (p.k === 2) return { v: "🐭", ans: u, text: `${base} About how many show BOTH recessive traits?`, h1: "The expected ratio is 9:3:3:1, out of 16 parts.", h2: "Both recessive is the single 1 part. Divide the total by 16.", ex: `${ex(p.N + 16)} So both recessive is ${u + 1}. The answer is ${u + 1}.` };
    return { v: "🐭", ans: 7 * u, text: `${base} About how many show AT LEAST ONE recessive trait?`, h1: "Everything that is not both-dominant has at least one recessive trait.", h2: "Add the other three parts of the 9:3:3:1 ratio (3 + 3 + 1), then multiply by total / 16.", ex: `${ex(p.N + 16)} Seven parts is ${7 * (u + 1)}. The answer is ${7 * (u + 1)}.` };
  });
  const recomb = NUM(() => ({ k: ri(0, 3), tot: pick([200, 400, 500, 1000]), d: pick([5, 8, 10, 12, 15, 20, 25]) }), p => {
    const rec = p.tot * p.d / 100, t2 = p.tot === 200 ? 400 : 200, r2 = t2 * 10 / 100;
    if (p.k === 0) return { v: "🗺️", ans: p.d, text: `Of ${p.tot} offspring in a cross, ${rec} are recombinants. How many map units apart are the two linked genes?`, h1: "Recombination frequency in percent equals map units.", h2: "Divide recombinants by total offspring, then multiply by 100.", ex: `${r2} recombinants out of ${t2}: ${r2} / ${t2} x 100 = 10. The answer is 10.` };
    if (p.k === 1) return { v: "🗺️", ans: rec, text: `Two linked genes are ${p.d} map units apart. In ${p.tot} offspring, about how many recombinants do you expect?`, h1: "Map units tell you the percent of recombinants.", h2: "Multiply total offspring by the percent, then divide by 100.", ex: `10 map units in ${t2} offspring: ${t2} x 10 / 100 = ${r2}. The answer is ${r2}.` };
    if (p.k === 2) return { v: "🗺️", ans: 100 - p.d, text: `Two linked genes are ${p.d} map units apart. About what percent of offspring are parental types?`, h1: "Every offspring is either a recombinant or a parental type.", h2: "Subtract the recombinant percent from 100.", ex: `Genes 10 map units apart: 100 - 10 = 90 percent parental. The answer is 90.` };
    return { v: "🗺️", ans: p.tot - rec, text: `Of ${p.tot} offspring, ${rec} are recombinants. How many are parental types?`, h1: "Total offspring = parental types + recombinants.", h2: "Subtract the recombinants from the total.", ex: `Of ${t2} offspring with ${r2} recombinants: ${t2} - ${r2} = ${t2 - r2}. The answer is ${t2 - r2}.` };
  });
  const rzero = NUM(() => ({ k: ri(0, 2), pc: pick([25, 50, 20, 10, 40]), j: ri(1, 5), N0: pick([10, 20, 50]), R: pick([2, 3]), g: ri(2, 3) }), p => {
    const step = { 25: 4, 50: 2, 20: 5, 10: 10, 40: 5 }[p.pc], b = step * p.j, R0 = b * p.pc / 100;
    if (p.k === 0) return { v: "🐇", ans: R0, text: `${p.pc} percent of newborn females survive to breed, and each breeder has ${b} daughters in her life. What is R0, the daughters per newborn female?`, h1: "R0 combines survival and fertility.", h2: "Multiply the fraction that survive (percent / 100) by the daughters per breeder.", ex: `50 percent survive and each has 6 daughters: 0.5 x 6 = 3. The answer is 3.` };
    if (p.k === 1) return { v: "📈", ans: p.N0 * Math.pow(p.R, p.g), text: `A population of ${p.N0} females has R0 = ${p.R} per generation. How many females after ${p.g} generations?`, h1: "R0 is the multiplier for each generation.", h2: "Multiply the starting number by R0 once for every generation.", ex: `10 females with R0 = 2 for 2 generations: 10 x 2 x 2 = 40. The answer is 40.` };
    return { v: "🐇", ans: b, text: `${p.pc} percent of newborn females survive to breed, and R0 is ${R0}. How many daughters does each breeding female have?`, h1: "R0 = survival fraction x daughters per breeder.", h2: "Divide R0 by the fraction that survive (percent / 100).", ex: `50 percent survive and R0 is 3: 3 / 0.5 = 6 daughters. The answer is 6.` };
  });
  const biomag = NUM(() => ({ k: ri(0, 1), c: pick([2, 3, 4, 5]), f: pick([5, 10]), s: ri(1, 3) }), p => {
    const X = p.c * Math.pow(p.f, p.s);
    if (p.k === 0) return { v: "🧪", ans: X, text: `Plankton hold ${p.c} units of a toxin per kg. At each step up the food chain the toxin is ${p.f} times more concentrated. How many units per kg in an animal ${p.s} step${p.s > 1 ? "s" : ""} up?`, h1: "Biomagnification multiplies the level at every step.", h2: "Multiply the starting level by the factor once for each step.", ex: `Start with 3 units and a factor of 10 for 2 steps: 3 x 10 x 10 = 300. The answer is 300.` };
    return { v: "🧪", ans: p.c, text: `A top predator ${p.s} step${p.s > 1 ? "s" : ""} up the food chain holds ${X} units of a toxin per kg. Each step multiplies the level by ${p.f}. How many units per kg did the plankton hold?`, h1: "Work backwards: undo each multiplication.", h2: "Divide by the factor once for each step.", ex: `A predator with 400 units, factor 10, 2 steps up: 400 / 10 / 10 = 4. The answer is 4.` };
  });
  const logist = NUM(() => ({ k: ri(0, 2), K: pick([400, 800, 1600]), r: pick([1, 2, 3]), fr: pick([[1, 4], [1, 2], [3, 4]]) }), p => {
    const N = p.K * p.fr[0] / p.fr[1], rate = p.r * N * (p.K - N) / p.K;
    if (p.k === 0) return { v: "📈", ans: rate, text: `A population has carrying capacity K = ${p.K} and growth constant r = ${p.r}. Using dN/dt = rN(1 - N/K), what is the growth per year when N = ${N}?`, h1: "Put N, K and r into the formula.", h2: "Compute (1 - N/K) first, then multiply by r and by N.", ex: `K = 400, r = 1, N = 200: 1 x 200 x (1 - 0.5) = 100. The answer is 100.` };
    if (p.k === 1) return { v: "📈", ans: p.K / 2, text: `A population grows logistically with carrying capacity K = ${p.K}. At what population size is growth fastest?`, h1: "Growth is slow when N is tiny and slow when N is close to K.", h2: "The fastest growth is at the halfway point of K.", ex: `With K = 1000, the fastest growth is at 500. The answer is 500.` };
    return { v: "📈", ans: p.K - N, text: `A reserve can hold K = ${p.K} deer and has ${N} now. How many more deer can the habitat add before reaching carrying capacity?`, h1: "Find the gap between the limit and the present number.", h2: "Subtract the present number from K.", ex: `K = 500 and 300 now: 500 - 300 = 200. The answer is 200.` };
  });
  const neff = NUM(() => ({ k: ri(0, 1), pr: pick([[10, 10], [5, 20], [20, 30], [10, 40], [15, 10], [20, 20], [25, 100], [10, 15]]) }), p => {
    const m = p.pr[0], f = p.pr[1], Ne = 4 * m * f / (m + f);
    if (p.k === 0) return { v: "🐆", ans: Ne, text: `A group has ${m} breeding males and ${f} breeding females. Using Ne = 4 x Nm x Nf / (Nm + Nf), what is the effective population size?`, h1: "Put the male and female numbers into the formula.", h2: "Multiply 4 x males x females, then divide by (males + females).", ex: `10 males and 40 females: 4 x 10 x 40 = 1600, divided by 50 = 32. The answer is 32.` };
    return { v: "🐆", ans: m + f - Ne, text: `A group has ${m} breeding males and ${f} breeding females. By how many does the effective size Ne (4 x Nm x Nf / (Nm + Nf)) fall short of the headcount?`, h1: "Find Ne first, then compare with the headcount.", h2: "Headcount is males + females. Subtract Ne from it.", ex: `10 males and 40 females: headcount 50, Ne = 32, shortfall 18. The answer is 18.` };
  });

  const a = [], b = [], c = [];
  const W = "Think back to what you just learned. Read the question slowly.";

  // ================= LEVEL 25 =================
  a.push(L("Homeostasis and feedback loops", [
    "Keeping steady|⚖️|<b>Homeostasis</b> means keeping the inside of the body steady (temperature, blood sugar, water) even when the outside changes.",
    "Negative feedback|🔁|In <b>negative feedback</b> a change triggers a response that reverses it. The body gets hot, you sweat, and you cool down. Most homeostasis works this way.",
    "Positive feedback|📈|In <b>positive feedback</b> the response makes the change bigger. It is rare: birth contractions get stronger and stronger, and a nerve signal builds up in an action potential."
  ], [
    "Keeping the inside of the body steady is called...|homeostasis|⚖️||metamorphosis,migration",
    "A response that reverses a change is ... feedback|negative|🔁||positive,neutral",
    "A response that makes a change bigger is ... feedback|positive|📈||negative,steady",
    "A dog pants, cools down, and then stops panting. This is ... feedback|negative|🐕||positive,random",
    "Which type of feedback is most common in homeostasis?|negative|🌡️||positive,none",
    "The part of a feedback loop that detects a change is the...|sensor|👁️||effector,set point",
    "The normal target value in a feedback loop is the...|set point|🎯||effector,sensor",
    "The part that carries out the response, such as a muscle or gland, is the...|effector|💪||sensor,set point"
  ], "Think about whether the response undoes the change or adds to it."));
  a.push(L("Osmoregulation", [
    "Salt and water balance|🧂|<b>Osmoregulation</b> controls the water and salt inside an animal. <b>Osmoconformers</b> (many sea invertebrates, like sea stars) let their body fluids match the water around them. <b>Osmoregulators</b> keep their own salt level.",
    "Marine fish|🐟|A marine bony fish is less salty than seawater, so it loses water to the sea by osmosis. It drinks seawater and pumps extra salt out through its gills.",
    "Freshwater fish|🏞️|A freshwater fish is saltier than its water, so water floods in. It hardly drinks, makes lots of dilute urine, and takes in salts through its gills."
  ], [
    "An animal whose body fluids match the water around it is an...|osmoconformer|🪼||osmoregulator,osmotic filter",
    "An animal that keeps its own salt level steady is an...|osmoregulator|🐟||osmoconformer,osmotic pump",
    "A marine bony fish loses water to the sea. So it...|drinks seawater|🌊||never drinks,takes in fresh water through its skin",
    "A freshwater fish gains water. It makes...|lots of dilute urine|🏞️||tiny salty urine,no urine at all",
    "A marine bony fish gets rid of extra salt mainly through its...|gills|🐠||fins,scales",
    "Water moving across a membrane toward the saltier side is called...|osmosis|💧||evaporation,digestion",
    "Which animal is most likely an osmoconformer?|a jellyfish|🪼||a freshwater trout,a human",
    "Freshwater fish take in needed salts through their...|gills|🏞️||fins,teeth"
  ], "Ask yourself which way water moves: toward the saltier side."));
  a.push(L("Nitrogen wastes", [
    "Breaking down protein|🧬|When animals break down proteins they make nitrogen waste. There are three main forms: ammonia, urea and uric acid.",
    "Ammonia|🐠|Ammonia is very toxic but dissolves easily. Water animals such as most fish flush it out quickly with lots of water.",
    "Urea and uric acid|🦎|Mammals and amphibians make <b>urea</b>, which is less toxic but needs some water. Birds, insects and many reptiles make <b>uric acid</b>, a paste that needs very little water. That suits dry places and eggs."
  ], [
    "Most bony fish release their nitrogen waste as...|ammonia|🐠||urea,uric acid",
    "Mammals mostly make...|urea|🐮||ammonia,uric acid",
    "Birds make...|uric acid|🐦||ammonia,urea",
    "Which waste saves the most water?|uric acid|🏜️||ammonia,urea",
    "The most toxic of the three nitrogen wastes is...|ammonia|⚠️||urea,uric acid",
    "Nitrogen waste comes mainly from breaking down...|proteins|🥩||sugars,fats",
    "Uric acid suits an egg because it...|can be stored as a harmless paste|🥚||dissolves the shell,feeds the embryo",
    "Insects make uric acid, which suits animals that must save...|water|🪲||heat,space"
  ], "Think about how much water each waste needs."));
  a.push(L("Inside the nephron", [
    "The kidney's filter|🫘|The vertebrate kidney is made of tiny filters called <b>nephrons</b>. Blood is pushed under pressure into a ball of capillaries, and the fluid squeezed out is called <b>filtrate</b>.",
    "Three steps|🔬|<b>Filtration</b> pushes water, salts, sugar and urea out of the blood. <b>Reabsorption</b> returns useful things to the blood. <b>Secretion</b> adds extra wastes to the filtrate.",
    "Making urine|🚰|What is left becomes urine. Mammals with long loops of Henle, like the desert kangaroo rat, make very concentrated urine and save water."
  ], [
    "The tiny filtering unit of a kidney is the...|nephron|🫘||neuron,alveolus",
    "Squeezing fluid out of the blood is called...|filtration|🔬||secretion,digestion",
    "Moving useful things like sugar back into the blood is...|reabsorption|↩️||filtration,secretion",
    "Adding extra wastes into the filtrate is...|secretion|➕||reabsorption,filtration",
    "The fluid squeezed out of blood into the nephron is the...|filtrate|💧||plasma,pigment",
    "Which animal makes very concentrated urine using long loops of Henle?|kangaroo rat|🐁||river otter,frog",
    "Of the water filtered by a mammal's kidney, how much is reabsorbed?|nearly all of it|💧||about half,almost none",
    "A healthy kidney treats filtered sugar by...|taking it back into the blood|🍬||leaving it in the urine,destroying it"
  ], "Think about which step puts things in and which step takes them back."));
  a.push(L("Open and closed circulation", [
    "Two designs|🩸|In an <b>open circulatory system</b> the fluid (called hemolymph) leaves the vessels and bathes the organs directly. In a <b>closed</b> system the blood stays inside vessels.",
    "Open examples|🦗|Insects, most snails and clams, and other arthropods and molluscs have open systems. An insect's hemolymph does not carry oxygen: air tubes do that.",
    "Closed examples|🐘|Vertebrates, earthworms, octopuses and squid have closed systems. They keep higher pressure and deliver blood fast to where it is needed, which suits fast, active animals."
  ], [
    "Blood stays inside vessels in a ... circulatory system|closed|🩸||open,sealed-off",
    "Fluid that bathes the organs directly is found in an ... system|open|🦗||closed,tube-only",
    "Insects have a(n) ... circulatory system|open|🪲||closed,double-loop",
    "Which animal has a closed circulatory system?|an octopus|🐙||a grasshopper,a clam",
    "Which animal has an open circulatory system?|a clam|🦪||an earthworm,a fish",
    "The fluid in an open circulatory system is called...|hemolymph|💧||serum,saliva",
    "In insects, oxygen is delivered mostly by the...|tracheae|🪲||hemolymph,red blood cells",
    "Closed systems work well for ... animals|fast and active|🏃||slow and still,microscopic only"
  ], "Ask yourself whether the fluid stays in tubes or flows around the organs."));
  a.push(L("Gills, tracheae and lungs", [
    "Getting oxygen|💨|Gas exchange always needs a surface that is thin, moist and large. Different animals use different organs.",
    "Gills, skin and tracheae|🐟|Fish use <b>gills</b>. Many amphibians also breathe through moist <b>skin</b>. Insects use <b>tracheae</b>, air tubes that open at holes called spiracles and reach the cells directly.",
    "Lungs and book lungs|🫁|Reptiles, birds and mammals have <b>lungs</b>. Many spiders have <b>book lungs</b>, stacks of thin plates like pages in a book."
  ], [
    "Fish take oxygen from water with...|gills|🐟||tracheae,book lungs",
    "Insects bring air to their cells through...|tracheae|🪲||gills,lungs",
    "Insect tracheae open to the outside through holes called...|spiracles|🕳️||stomata,nostrils",
    "Many spiders have breathing organs called...|book lungs|🕷️||gills,fins",
    "Gas exchange surfaces must be...|thin and moist|💧||thick and dry,hard and dry",
    "Frogs can also take in oxygen through their...|skin|🐸||shell,claws",
    "Mammals and birds breathe with...|lungs|🫁||gills,book lungs",
    "A large gas exchange surface helps because it lets in more...|oxygen|📏||sound,heat"
  ], "Match each animal to the organ it uses to get air or dissolved oxygen."));
  a.push(L("One-way air in birds", [
    "Birds breathe differently|🐦|Mammal lungs move air in and out through the same tubes. Birds have lungs plus <b>air sacs</b> that push air one way through the lungs.",
    "Two breaths|🔁|Air takes two breaths to pass through the whole system. Fresh air always flows past the gas-exchange surfaces in the same direction, so the lungs get oxygen during both inhaling and exhaling.",
    "Why it matters|🏔️|This efficient system lets birds fly high where oxygen is thin. Bar-headed geese cross the Himalayas."
  ], [
    "Birds have extra storage bags for air called...|air sacs|🐦||alveoli,gill rakers",
    "In how many directions does air flow through bird lungs?|one|➡️||two,three",
    "Mammal lungs move air...|in and out the same way|🐕||in one direction only,only when exhaling",
    "Bird lungs get fresh air during...|both inhaling and exhaling|💨||only exhaling,only inhaling",
    "The tiny sacs where mammals exchange gases are called...|alveoli|🫁||gill filaments,spiracles",
    "Which bird is famous for flying over the Himalayas?|bar-headed goose|🦆||emperor penguin,ostrich",
    "One-way airflow especially helps birds at...|high altitude|🏔️||deep water,sea level only",
    "How many breaths does air need to pass fully through a bird's system?|two|🔁||one,four"
  ], "Think about the direction the air travels in a bird compared with a mammal."));
  a.push(L("Nerves and hormones", [
    "Two messaging systems|📡|The <b>nervous system</b> sends fast electrical signals along nerves. The <b>endocrine system</b> releases <b>hormones</b> from glands into the blood.",
    "Speed and duration|⏱️|Nerve signals act in milliseconds and last briefly. Hormones are slower (seconds to days) but last longer and can affect many body parts at once.",
    "Examples|🧪|Adrenaline prepares the body to act fast. Thyroid hormone sets metabolic rate and triggers metamorphosis in tadpoles. Growth hormone from the pituitary affects growth."
  ], [
    "Hormones travel to their targets in the...|blood|🩸||nerves,air",
    "Which system is usually faster?|nervous system|⚡||endocrine system,digestive system",
    "Which usually has longer-lasting effects?|hormones|⏳||nerve signals,reflexes",
    "Glands that release hormones belong to the ... system|endocrine|🧪||nervous,skeletal",
    "Which hormone helps prepare the body for 'fight or flight'?|adrenaline|❗||insulin,growth hormone",
    "Thyroid hormone triggers ... in a tadpole|metamorphosis|🐸||migration,hibernation",
    "Pulling a paw back from heat quickly uses the...|nervous system|🐾||endocrine system,immune system",
    "A hormone only affects cells that have the matching...|receptor|🔑||shell,tail"
  ], "Think about speed: which system uses wires and which uses delivery by blood?"));
  a.push(BOTH("Metabolic rate and body size", [
    "Big and small|🐭|Bigger animals use more energy in total, but each gram of a small animal uses more. A shrew must eat almost constantly.",
    "Kleiber's law|📉|Metabolic rate is roughly proportional to mass to the power 3/4. When mass grows 16 times, the total rate grows only 8 times.",
    "Per gram|🧮|Per-gram rate goes with mass to the power -1/4, so it gets lower as animals get bigger. That is why small warm-blooded animals eat so much for their size."
  ], [
    "Per gram of body, which uses more energy?|a shrew|🐭||an elephant,they are equal",
    "Total energy use is higher in...|an elephant|🐘||a shrew,a hamster",
    "Kleiber's law says metabolic rate rises with mass to the power of about...|3/4|📉||1,2",
    "When body mass doubles, total metabolic rate...|less than doubles|📈||more than doubles,exactly doubles",
    "Per-gram metabolic rate as animals get bigger...|falls|⬇️||rises,stays exactly the same",
    "Why does a tiny hummingbird feed so often?|high metabolic rate per gram|🐦||low metabolic rate,huge stomach",
    "An elephant uses less energy per gram than a mouse because of its...|large body size|🐘||color,tusks",
    "A bigger animal needs ... food in total than a smaller one|more|🍽️||less,the same"
  ], "Separate total energy from energy per gram.", "", kleib, 0.45));
  a.push(L("Four ways heat moves", [
    "Heat in, heat out|🔥|Animals exchange heat in four ways: conduction, convection, radiation and evaporation.",
    "Touch and air|🌬️|<b>Conduction</b> is heat passing by direct touch, like a lizard on a warm rock. <b>Convection</b> is heat carried away by moving air or water, like wind chill.",
    "Rays and sweat|☀️|<b>Radiation</b> is heat given or taken as infrared and light, like sunbathing. <b>Evaporation</b> removes heat when liquid water turns to gas, as in panting and sweating."
  ], [
    "A lizard warming on a hot rock gains heat by...|conduction|🦎||evaporation,convection",
    "Wind carrying heat away from a bird is...|convection|🌬️||conduction,radiation",
    "A snake warming in direct sunlight gains heat mostly by...|radiation|☀️||conduction,evaporation",
    "A panting dog cools by...|evaporation|🐕||radiation,conduction",
    "Heat moving by direct touch is...|conduction|🤝||convection,radiation",
    "Fur and feathers trap still air to reduce...|heat loss|🧥||heat gain,sound",
    "Why do elephants flap their huge ears in hot weather?|to lose heat|🐘||to hear better,to stay warm",
    "Sweating cools the body only if the sweat...|evaporates|💦||freezes,soaks in"
  ], "Ask yourself: touch, moving fluid, rays, or water turning into gas?"));
  a.push(L("Clones and virgin births", [
    "Babies without mating|🧬|In <b>asexual reproduction</b> one parent makes offspring that are genetically identical clones. <b>Parthenogenesis</b> is when an egg develops without being fertilized.",
    "Who does it|🦎|Aphids, water fleas and some lizards (such as whiptails) do it. Honeybee drones (males) hatch from unfertilized eggs.",
    "Trade-offs|⚖️|Asexual reproduction is fast and needs no mate, but identical offspring give little variation to cope with new diseases. Sexual reproduction mixes genes."
  ], [
    "An egg developing without being fertilized is...|parthenogenesis|🥚||fertilization,metamorphosis",
    "Offspring of asexual reproduction are genetically...|identical|👯||all different,half different",
    "Honeybee drones (males) develop from...|unfertilized eggs|🐝||fertilized eggs,larvae only",
    "A main advantage of asexual reproduction is...|no mate needed|⚡||more variation,better disease resistance",
    "A main disadvantage of asexual reproduction is...|low genetic variation|🧬||needing a mate,too many differences",
    "Sexual reproduction creates...|new gene combinations|🔀||exact copies,no change",
    "Which lizard is known for all-female species that clone themselves?|whiptail|🦎||chameleon,iguana",
    "Aphids make many clones fast, which helps them when...|food is plentiful|🌿||food runs out,they must fly"
  ], "Think about how many parents are involved and how alike the young are."));
  a.push(BOTH("Meiosis and variety", [
    "Making gametes|✂️|<b>Meiosis</b> is the cell division that makes gametes (eggs and sperm) with half the chromosomes: <b>haploid (n)</b>. Body cells are <b>diploid (2n)</b>.",
    "Shuffling genes|🔀|<b>Crossing over</b> swaps pieces between paired chromosomes. <b>Independent assortment</b> sorts each pair into gametes at random.",
    "Counting variety|🧮|With n pairs of chromosomes, independent assortment alone can make 2 to the power n kinds of gamete. A human, with 23 pairs, can make over 8 million kinds."
  ], [
    "Meiosis makes cells with ... the chromosomes|half|✂️||double,all",
    "A cell with half the chromosome number is...|haploid|1️⃣||diploid,triploid",
    "Body cells are normally...|diploid|🧫||haploid,gametes",
    "Swapping pieces between paired chromosomes is...|crossing over|❌||fertilization,cloning",
    "Random sorting of chromosome pairs is...|independent assortment|🎲||crossing over,cloning",
    "Meiosis produces...|gametes|🥚||skin cells,muscle cells",
    "Fertilization restores the ... number of chromosomes|diploid|➕||haploid,zero",
    "Meiosis helps populations by increasing...|genetic variation|🌈||cloning,body size"
  ], "Think about halving and shuffling.", "", meio, 0.45));
  a.push(BOTH("Two genes at once", [
    "Dihybrid crosses|🐭|A <b>dihybrid cross</b> follows two genes. If they are on different chromosomes they are sorted independently (Mendel's law of independent assortment).",
    "The 9:3:3:1 ratio|📊|Cross two parents that are heterozygous for both genes (AaBb x AaBb). Offspring show 9 dominant-dominant : 3 dominant-recessive : 3 recessive-dominant : 1 recessive-recessive, from 16 boxes.",
    "The test cross|🔍|A <b>test cross</b> mates an animal showing the dominant trait with a homozygous recessive animal. If any offspring show the recessive trait, the unknown parent was heterozygous."
  ], [
    "A cross following two genes at once is a...|dihybrid cross|2️⃣||monohybrid cross,test tube",
    "AaBb x AaBb gives a phenotype ratio of...|9:3:3:1|📊||3:1,1:1:1:1",
    "How many boxes are in a dihybrid Punnett square?|16|🔲||4,8",
    "A test cross uses a partner that is homozygous...|recessive|🔍||dominant,heterozygous",
    "A test cross gives some recessive offspring. The unknown parent was...|heterozygous|🧪||homozygous dominant,sterile",
    "Genes on different chromosomes follow the law of...|independent assortment|🎲||natural selection,blending",
    "In a 9:3:3:1 ratio, the '1' shows...|both recessive traits|1️⃣||both dominant traits,one dominant trait",
    "Mendel's law of segregation says each parent passes on...|one allele of each gene|🧬||both alleles,no alleles"
  ], "Picture a 16-box Punnett square and count the groups.", "", dihyb, 0.45));
  a.push(BOTH("Linked genes and maps", [
    "Genes that travel together|🔗|Genes close together on the same chromosome are <b>linked</b>. They tend to be inherited together, so the 9:3:3:1 ratio does not appear.",
    "Crossing over breaks links|✂️|Crossing over can swap alleles. Offspring with new combinations are <b>recombinants</b>. Offspring like the parents are <b>parental types</b>.",
    "Gene maps|🗺️|Recombination frequency = recombinants / total offspring x 100. One percent equals one <b>map unit</b>. Genes that are farther apart recombine more often, up to a maximum of 50 percent."
  ], [
    "Genes close together on one chromosome are...|linked|🔗||recessive,mutated",
    "Linked genes tend to be inherited...|together|🧲||separately,never",
    "Offspring with new combinations of alleles are...|recombinants|🔀||parental types,clones",
    "Recombinants arise through...|crossing over|✂️||fertilization alone,digestion",
    "Genes far apart on a chromosome show recombination that is...|higher|📏||lower,always zero",
    "The highest possible recombination frequency is about...|50 percent|🔝||100 percent,10 percent",
    "One map unit equals ... recombination|1 percent|🗺️||10 percent,50 percent",
    "Recombination frequency is found by dividing recombinants by...|total offspring|➗||parents,genes"
  ], "Think about how often a crossover falls between two genes.", "", recomb, 0.45));
  a.push(L("The genetic code and mutations", [
    "Reading the code|🔤|DNA is read in <b>codons</b>, groups of 3 bases. Each codon stands for an amino acid or a stop signal. Almost all living things use the same code.",
    "Point mutations|✏️|A <b>substitution</b> changes one base. It can be silent (same amino acid), missense (a different amino acid) or nonsense (a stop codon). Adding or losing 1 or 2 bases causes a <b>frameshift</b>, which scrambles everything after it.",
    "Why it matters|🧪|Most mutations are neutral or harmful, and a few help. Mutations in eggs or sperm can be inherited and are the raw material for evolution."
  ], [
    "A codon is a group of how many bases?|three|🔤||two,four",
    "Each codon codes for one...|amino acid|🧬||sugar,gene",
    "A mutation that changes one base is a...|point mutation|✏️||frameshift,chromosome loss",
    "Adding or losing 1 base shifts the reading frame. This is a...|frameshift|➡️||silent mutation,missense mutation",
    "A change that gives the same amino acid is...|silent|🤫||nonsense,missense",
    "A change that creates a stop codon is...|nonsense|🛑||silent,missense",
    "Which mutations can be inherited?|those in egg or sperm cells|🥚||those in skin cells,those in hair",
    "Nearly all life uses the same genetic code, evidence of...|common ancestry|🌳||luck alone,recent mutation"
  ], "Think about what happens to the amino acids after the change."));
  a.push(L("Allopatric and sympatric speciation", [
    "Split by a barrier|🏔️|<b>Allopatric</b> speciation starts when a barrier such as mountains, a river or an ocean splits a population. The groups evolve apart until they can no longer interbreed.",
    "In the same place|🌿|<b>Sympatric</b> speciation happens in the same area. One route is <b>polyploidy</b>, an error that gives extra sets of chromosomes, common in plants. Insects can also split by shifting to a new host plant.",
    "Evidence|🐦|Darwin's finches on separate islands show allopatric speciation. Hybrid zones show places where young species still meet."
  ], [
    "Speciation after a barrier splits a population is...|allopatric|🏔️||sympatric,instant",
    "Speciation in the same area is...|sympatric|🌿||allopatric,distant",
    "Extra sets of chromosomes are called...|polyploidy|🧬||polygamy,polymorphism",
    "Which of these is a physical barrier?|a mountain range|⛰️||a shared meadow,a common food",
    "Darwin's finches on separate islands show ... speciation|allopatric|🐦||sympatric,polyploid",
    "'Allopatric' means in different...|places|📍||times,colors",
    "'Sympatric' means in the same...|place|🗺️||time,genus",
    "Polyploidy is a common route to new species in...|plants|🌱||birds,mammals"
  ], "Ask yourself whether a barrier separates the groups."));
  a.push(L("Naming and ranking life", [
    "Naming life|🏷️|Each species has a two-part scientific name (<b>binomial</b>), a system made popular by Linnaeus. The genus comes first, then the species, as in <i>Canis lupus</i>, the gray wolf.",
    "The ranks|🪜|From broadest to narrowest the ranks are Domain, Kingdom, Phylum, Class, Order, Family, Genus and Species. A memory trick: Dear King Philip Came Over For Good Soup.",
    "Why scientific names|🌍|The same name works in every language, so scientists everywhere know which animal is meant. Modern taxonomy also uses DNA to group animals by ancestry."
  ], [
    "A scientific name has how many parts?|two|🏷️||one,three",
    "In Canis lupus, 'Canis' is the...|genus|🐺||species,family",
    "In Canis lupus, 'lupus' is the...|species name|🐺||genus,order",
    "Which rank is the broadest?|domain|🌐||genus,family",
    "Which rank sits just below class?|order|🪜||family,phylum",
    "Which rank sits just above genus?|family|👪||order,species",
    "Scientific names help scientists in different countries because they are...|the same everywhere|🌍||different in each country,secret",
    "Modern taxonomy groups animals using DNA and...|shared ancestry|🧬||favorite colors,body weight"
  ], "Picture the ranks as a ladder from widest to narrowest."));
  a.push(L("The carbon cycle and animals", [
    "Carbon moves around|♻️|Carbon moves between air, plants, animals, oceans, soil and rocks. Plants take carbon dioxide from the air by photosynthesis, and animals get carbon by eating.",
    "The animal part|🐄|Animals release carbon dioxide by cellular respiration, and decomposers return carbon from dead bodies. Some sea animals build shells of calcium carbonate that lock carbon away, and over millions of years shells can form limestone.",
    "People and carbon|🏭|Burning fossil fuels, which formed from ancient organisms, adds carbon dioxide faster than nature removes it. Forests, oceans and soils are carbon sinks."
  ], [
    "Plants take carbon from the air as...|carbon dioxide|🌿||oxygen,nitrogen",
    "Animals return carbon to the air through...|respiration|🐄||photosynthesis,pollination",
    "Animals get their carbon mainly by...|eating other organisms|🍽️||drinking air,sunbathing",
    "Decomposers return carbon from dead things to the...|air and soil|🍄||sun,deep space",
    "Limestone is partly made from the shells of...|ancient sea animals|🐚||old trees,dinosaur bones",
    "Fossil fuels come from...|ancient living things|🛢️||volcano glass,meteorites",
    "A place that stores more carbon than it releases is a...|carbon sink|🌳||carbon source,carbon leak",
    "Burning fossil fuels adds ... to the air|carbon dioxide|🏭||oxygen,helium"
  ], "Follow the carbon: where does it go in, and where does it come out?"));
  a.push(MIX("Mixed practice", a.slice(0, 18)));
  a.push(MIX("Level 25 Challenge", a.slice(0, 18).reverse()));

  // ================= LEVEL 26 =================
  b.push(L("Parts of the vertebrate brain", [
    "Brain regions|🧠|The vertebrate brain has parts with different jobs. The <b>cerebrum</b> handles senses, thinking and voluntary movement. The <b>cerebellum</b> coordinates movement and balance. The <b>brainstem</b> runs breathing and heartbeat.",
    "Other parts|👃|The <b>olfactory bulbs</b> process smell and are large in sharks and dogs. The <b>optic tectum</b> handles vision in fish and amphibians. The <b>hypothalamus</b> controls hunger, thirst and body temperature.",
    "Mammals and birds|🐦|Mammals have an expanded, folded outer layer of the cerebrum called the <b>cerebral cortex</b>. Birds have a large cerebellum, which helps coordination in flight."
  ], [
    "The part of the brain mostly responsible for balance and coordination is the...|cerebellum|⚖️||brainstem,olfactory bulb",
    "The brainstem controls basic functions like...|breathing and heartbeat|🫀||reading and math,color vision",
    "The cerebrum is mainly for...|thinking and voluntary movement|🧠||balance only,digestion",
    "Sharks and dogs have large ... for their sense of smell|olfactory bulbs|👃||optic lobes,pituitaries",
    "The hypothalamus helps control hunger and...|body temperature|🌡️||eyesight,hearing",
    "Birds have a large ... for coordination in flight|cerebellum|🐦||olfactory bulb,spinal cord",
    "In fish the optic tectum is mainly for...|vision|👁️||smell,digestion",
    "Mammals have an expanded, folded outer layer of the cerebrum called the...|cerebral cortex|🧠||brainstem,spinal cord"
  ], "Match each part of the brain to the job it does."));
  b.push(L("Muscle types and fibers", [
    "Three muscle types|💪|<b>Skeletal</b> muscle moves bones and is voluntary. <b>Cardiac</b> muscle is found only in the heart. <b>Smooth</b> muscle lines the gut and blood vessels and works without thinking. Skeletal and cardiac muscle look striped (striated).",
    "Fast and slow fibers|⚡|<b>Fast-twitch</b> fibers contract quickly for short sprints but tire fast. <b>Slow-twitch</b> fibers are rich in mitochondria and myoglobin and keep working for a long time.",
    "Red and white|🍗|Myoglobin makes slow-twitch muscle red, like the swimming muscle of tuna. Pale meat, like chicken breast, is mostly fast-twitch fibers."
  ], [
    "Which muscle type is voluntary and attached to bones?|skeletal|💪||cardiac,smooth",
    "Which muscle type is found only in the heart?|cardiac|❤️||skeletal,smooth",
    "Which muscle type moves food through the gut?|smooth|🍽️||skeletal,cardiac",
    "Fast-twitch fibers are best for...|short sprints|⚡||long endurance,slow steady swimming",
    "Slow-twitch fibers are rich in mitochondria and myoglobin, good for...|endurance|🏃||sprints,single jumps",
    "Myoglobin makes slow-twitch muscle look...|red|🔴||white,blue",
    "Chicken breast meat is pale because it has mostly ... fibers|fast-twitch|🍗||slow-twitch,cardiac",
    "Skeletal and cardiac muscle both look...|striped|📏||smooth,spotted"
  ], "Think about sprinting versus long-distance work."));
  b.push(L("Vertebrate hearts", [
    "More chambers|🫀|A fish heart has 2 chambers (one atrium, one ventricle) and blood passes through it once per circuit: <b>single circulation</b>. Amphibians have 3 chambers (two atria, one ventricle).",
    "Three chambers|🐸|Most reptiles have 3 chambers with a partial wall in the ventricle, so oxygen-rich and oxygen-poor blood mix a little. Crocodilians have 4 chambers.",
    "Four chambers|🐦|Birds and mammals have 4 chambers and <b>double circulation</b>: one loop to the lungs and one to the body. The wall keeps blood types separate, which delivers more oxygen to support a high metabolic rate."
  ], [
    "A fish heart has how many chambers?|two|🐟||three,four",
    "An amphibian heart has how many chambers?|three|🐸||two,four",
    "Birds and mammals have how many heart chambers?|four|🐦||two,three",
    "Birds and mammals have ... circulation|double|🔄||single,absent",
    "In a fish, blood passes through the heart once per circuit. This is ... circulation|single|🐟||double,triple",
    "Four chambers keep oxygen-rich and oxygen-poor blood...|separate|🧪||mixed,frozen",
    "Which reptiles have a four-chambered heart?|crocodilians|🐊||snakes,turtles",
    "In a three-chambered heart some mixing happens in the single...|ventricle|🫀||atrium,artery"
  ], "Count the chambers and the loops."));
  b.push(L("Arteries, veins and capillaries", [
    "Three vessel types|🩸|<b>Arteries</b> carry blood away from the heart. Their walls are thick and elastic to handle high pressure. <b>Veins</b> carry blood back to the heart and have valves that stop backflow.",
    "Where exchange happens|🔬|<b>Capillaries</b> are tiny vessels with walls one cell thick. Gases, nutrients and wastes pass through them between blood and tissues.",
    "Flow speed|🐢|There are so many capillaries that their total area is huge, so blood slows down there, giving time for exchange. Tall animals like giraffes need very high pressure to lift blood up the neck."
  ], [
    "Vessels that carry blood away from the heart are...|arteries|🔴||veins,capillaries",
    "Exchange of gases and nutrients happens in...|capillaries|🔬||arteries,veins",
    "Vessels with valves that stop backflow are...|veins|🔵||arteries,capillaries",
    "Capillary walls are about how many cells thick?|one|1️⃣||five,twenty",
    "Blood flows slowest in capillaries because their total area is...|very large|📏||tiny,zero",
    "Artery walls are thick and elastic to handle...|high pressure|💥||low temperature,low light",
    "A giraffe needs very high blood pressure to lift blood up its...|neck|🦒||tail,stomach",
    "Which vessels usually carry blood back to the heart?|veins|🔵||arteries,tendons"
  ], "Think about direction of flow and what each vessel must do."));
  b.push(L("Absorbing nutrients", [
    "The small intestine|🍽️|Most digestion ends and most absorption happens in the small intestine. Its lining has finger-like folds called <b>villi</b>, covered in even tinier microvilli, that greatly increase surface area.",
    "Helpers|🧪|The liver makes <b>bile</b>, which breaks fat into small droplets and is stored in the gall bladder in many animals. The pancreas sends digestive enzymes into the small intestine.",
    "After the small intestine|💧|Sugars and amino acids enter blood capillaries in the villi. Fats enter small vessels called lacteals. The large intestine takes back much of the remaining water."
  ], [
    "Tiny finger-like folds in the small intestine are called...|villi|🔬||alveoli,nephrons",
    "Villi help by increasing...|surface area|📏||stomach acid,body heat",
    "Most nutrient absorption happens in the...|small intestine|🍽️||large intestine,stomach",
    "Much of the remaining water is taken back in the...|large intestine|💧||liver,esophagus",
    "Bile breaks fat into small droplets. It is made by the...|liver|🟤||pancreas,stomach",
    "In many animals bile is stored in the...|gall bladder|🟢||spleen,kidney",
    "The pancreas releases...|digestive enzymes|🧪||bile,urine",
    "Fats are absorbed into small vessels in villi called...|lacteals|🥛||arteries,nephrons"
  ], "Follow the food: where is it broken down and where does it pass into the body?"));
  b.push(L("Innate and adaptive immunity", [
    "First defenses|🛡️|<b>Innate immunity</b> is fast and general: skin, mucus, stomach acid, inflammation, and white blood cells called phagocytes that engulf germs. All animals have some innate defenses.",
    "Special defenses|🧬|<b>Adaptive immunity</b> is specific and has memory. B cells make antibodies and T cells attack infected cells. It is slower the first time, but memory cells make the next response faster and stronger.",
    "Vaccines|💉|A vaccine shows the body a harmless piece or weakened form of a germ so that memory cells form without a real illness."
  ], [
    "Skin and mucus are part of ... immunity|innate|🛡️||adaptive,vaccinated",
    "Immunity that remembers specific germs is...|adaptive|🧠||innate,skin-deep",
    "Cells that engulf germs are called...|phagocytes|😋||neurons,red cells",
    "B cells make...|antibodies|🧬||hormones,enzymes",
    "Memory cells make a second response to a germ...|faster|⏩||slower,weaker",
    "A vaccine trains the body by...|building memory without a real illness|💉||adding antibiotics,filtering the air",
    "Swelling and warmth around a cut are part of...|inflammation|🔥||digestion,hibernation",
    "The innate response is general and...|fast|⚡||slow,delayed by weeks"
  ], "Think about which defense is general and which one remembers."));
  b.push(L("Monotremes, marsupials and placentals", [
    "Three groups of mammals|🦘|<b>Monotremes</b> lay eggs: the platypus and echidnas. <b>Marsupials</b> give birth to very undeveloped young that finish growing in a pouch: kangaroos, koalas, opossums. <b>Placentals</b> nourish young inside the mother through a placenta.",
    "The placenta|🩸|The placenta links the baby to the mother's blood supply so food and oxygen pass in and wastes pass out. Most mammals, from mice to whales, are placentals.",
    "Where they live|🌏|Australia is rich in marsupials and monotremes. North America has only one marsupial, the Virginia opossum."
  ], [
    "Mammals that lay eggs are...|monotremes|🥚||marsupials,placentals",
    "Which animal is a monotreme?|platypus|🦆||koala,kangaroo",
    "Newborn marsupials finish developing mostly in the...|pouch|🦘||egg,nest",
    "Most mammals are...|placentals|🐄||marsupials,monotremes",
    "The placenta feeds a baby by connecting it to its mother's...|blood supply|🩸||stomach,skin",
    "Which animal is a marsupial?|koala|🐨||platypus,rabbit",
    "Which marsupial lives in North America?|opossum|🌎||kangaroo,wombat",
    "Compared with placentals, newborn marsupials are...|very undeveloped|🐣||fully grown,still in eggs"
  ], "Think about how each group of mammals feeds and carries its young."));
  b.push(L("Early development and germ layers", [
    "From egg to ball|⚪|A fertilized egg is a <b>zygote</b>. Rapid cell divisions called <b>cleavage</b> turn it into a hollow ball of cells, the <b>blastula</b>.",
    "Three layers|🌀|In the <b>gastrula</b> stage the cells fold inward and form germ layers. <b>Ectoderm</b> becomes skin and the nervous system. <b>Mesoderm</b> becomes muscle, bone, blood and heart. <b>Endoderm</b> becomes the lining of the gut, lungs and liver.",
    "A body plan|🧬|Most animals form three germ layers. Simple animals like jellyfish form only two. Hox genes and other signals then decide where body parts form."
  ], [
    "A hollow ball of cells in early development is a...|blastula|⚪||gastrula,zygote",
    "Rapid early cell divisions after fertilization are called...|cleavage|✂️||migration,molting",
    "The stage that forms the germ layers is the...|gastrula|🌀||blastula,larva",
    "Skin and the nervous system come from the...|ectoderm|🧠||mesoderm,endoderm",
    "Muscles, bones and blood come from the...|mesoderm|💪||ectoderm,endoderm",
    "The lining of the gut comes from the...|endoderm|🍽️||ectoderm,mesoderm",
    "How many germ layers do most animals form?|three|3️⃣||two,four",
    "A fertilized egg is called a...|zygote|🥚||gamete,larva"
  ], "Follow the order: egg, ball, folded ball, layers."));
  b.push(L("Molecules and embryos as evidence", [
    "Many lines of evidence|🔎|Evolution is supported by fossils, anatomy, embryos, biogeography and DNA. They all point to common descent.",
    "Embryos and old genes|🧬|Early embryos of fish, birds and humans all show pharyngeal arches and a tail. Humans also carry a broken leftover gene for making vitamin C, called a <b>pseudogene</b>.",
    "Molecules|🔬|The more similar the DNA or proteins (like cytochrome c) of two species, the more recently they shared an ancestor. <b>Homologous</b> structures, like the arm bones of a bat and a whale, share an origin. <b>Vestigial</b> structures, like whale hip bones, lost their main use."
  ], [
    "Early embryos of fish, birds and humans all show...|pharyngeal arches|🧬||wings,fur",
    "Species with very similar DNA are probably...|closely related|🧬||living in the same place,the same size",
    "More similar cytochrome c in two species suggests a ... common ancestor|more recent|🔬||more distant,no",
    "A broken, leftover gene is called a...|pseudogene|🧬||codon,chromatid",
    "Bird wings and bat wings share the same arm bones. These are ... structures|homologous|🦴||analogous,vestigial",
    "Whales have tiny hip bones with no main use. They are ... structures|vestigial|🐋||analogous,homologous",
    "Comparing DNA sequences can show how ... species are|related|🧬||heavy,loud",
    "Fossils, anatomy, embryos and DNA all point to...|common descent|🌳||separate origins,sudden change"
  ], "Think about which evidence is from bodies and which is from molecules."));
  b.push(L("Directional, stabilizing and disruptive selection", [
    "Three patterns|📊|<b>Directional</b> selection favors one extreme, so the average shifts. <b>Stabilizing</b> selection favors the middle and reduces variation. <b>Disruptive</b> selection favors both extremes over the middle.",
    "Examples|🦋|Peppered moths turning darker in sooty forests show directional selection. Human babies of medium weight survive best, which is stabilizing. Finches with either very big or very small bills but few medium ones show disruptive selection.",
    "Long-term results|⏳|Directional selection can change a species. Stabilizing selection keeps a successful form steady. Disruptive selection may eventually split one population into two."
  ], [
    "Selection favoring one extreme is...|directional|➡️||stabilizing,disruptive",
    "Selection favoring the middle is...|stabilizing|⚖️||directional,disruptive",
    "Selection favoring both extremes is...|disruptive|↔️||stabilizing,directional",
    "Human babies of medium weight survive best. This is ... selection|stabilizing|👶||directional,disruptive",
    "Peppered moths turning darker in sooty forests showed ... selection|directional|🦋||stabilizing,disruptive",
    "Finches with small or large bills but few medium bills show ... selection|disruptive|🐦||directional,stabilizing",
    "Disruptive selection may eventually split a population into...|two groups|✌️||one group,clones",
    "Stabilizing selection tends to ... variation|reduce|📉||increase,double"
  ], "Picture a bell curve: does the peak move, narrow, or split?"));
  b.push(L("Convergent and divergent evolution", [
    "Different roads, same result|🐬|<b>Convergent</b> evolution happens when unrelated species evolve similar traits because they face similar challenges. Dolphins and sharks both have streamlined bodies and fins.",
    "One ancestor, many forms|🌿|<b>Divergent</b> evolution happens when related species become different, as in adaptive radiation. Their shared ancestry leaves <b>homologous</b> structures.",
    "Analogous or homologous|🦴|<b>Analogous</b> structures do the same job but evolved separately, like bird and insect wings. Homologous structures come from a common ancestor, like the arm bones of a bat and a human."
  ], [
    "Unrelated species evolving similar traits for similar lives show ... evolution|convergent|🔀||divergent,reverse",
    "Related species becoming different over time show ... evolution|divergent|🌿||convergent,identical",
    "Dolphin and shark body shapes are an example of...|convergent evolution|🐬||divergent evolution,inheritance",
    "Bird wings and insect wings are...|analogous|🪽||homologous,vestigial",
    "Structures with the same function but different origins are...|analogous|🔧||homologous,vestigial",
    "Structures inherited from a common ancestor are...|homologous|🦴||analogous,convergent",
    "Sugar gliders and flying squirrels glide in similar ways but are not close relatives. This shows...|convergent evolution|🐿️||recent common ancestry,a vestigial trait",
    "Adaptive radiation is an example of ... evolution|divergent|🐦||convergent,analogous"
  ], "Ask yourself whether the similarity comes from a shared ancestor or a shared problem."));
  b.push(L("Deep time and the geologic eras", [
    "Earth's age|🌍|Earth is about 4.5 billion years old. Most of that time was Precambrian, long before animals with hard parts appeared.",
    "Three eras|⏳|The <b>Paleozoic</b> era had the Cambrian explosion, the first fish, and the first land animals. The <b>Mesozoic</b> era is the age of dinosaurs and also saw the first birds and mammals. The <b>Cenozoic</b> era, since about 66 million years ago, is the age of mammals.",
    "Ends of eras|☄️|Mass extinctions mark the boundaries. The end-Permian extinction (about 252 million years ago) ended the Paleozoic, and the end-Cretaceous extinction (about 66 million years ago) ended the Mesozoic."
  ], [
    "About how old is Earth?|4.5 billion years|🌍||4.5 million years,450 thousand years",
    "Dinosaurs ruled in the...|Mesozoic|🦖||Paleozoic,Cenozoic",
    "The 'Age of Mammals' is the...|Cenozoic|🐘||Mesozoic,Paleozoic",
    "Fish and the first land animals appeared in the...|Paleozoic|🐟||Mesozoic,Cenozoic",
    "The end-Cretaceous extinction about 66 million years ago ended the...|Mesozoic|☄️||Paleozoic,Cenozoic",
    "Which era is the most recent?|Cenozoic|⏳||Paleozoic,Mesozoic",
    "The first birds and mammals appeared in the...|Mesozoic|🐦||Paleozoic,Cenozoic",
    "Humans have existed for ... of Earth's history|a tiny fraction|⏱️||about half,most"
  ], "Put the three eras in order from oldest to newest."));
  b.push(BOTH("r-selected and K-selected life", [
    "Two strategies|🐭|<b>r-selected</b> species have many young, give little care, mature early and live short lives: mice, insects, oysters. <b>K-selected</b> species have few young, give much care, mature late and live long: elephants and whales.",
    "Where they live|🐘|K-selected species usually live near the carrying capacity (K) of their habitat. R-selected species often boom in new or changing places.",
    "Net reproductive rate|🧮|<b>R0</b> is the average number of daughters a newborn female will have in her life. If R0 is above 1 the population grows, if it equals 1 it is steady, and if it is below 1 it shrinks."
  ], [
    "Species with many young and little care are...|r-selected|🐭||K-selected,L-selected",
    "Species with few young and lots of care are...|K-selected|🐘||r-selected,egg-selected",
    "Which animal is more r-selected?|a mouse|🐭||an elephant,a whale",
    "Which animal is more K-selected?|an elephant|🐘||a housefly,a mosquito",
    "r-selected species usually mature...|early|⏩||late,never",
    "An oyster releasing millions of eggs uses a more ... strategy|r-selected|🦪||K-selected,L-selected",
    "A whale calf nursed for a year suggests a ... strategy|K-selected|🐋||r-selected,egg-laying",
    "If R0 is above 1 the population...|grows|📈||shrinks,stays steady"
  ], "Count the number of young and the amount of care.", "", rzero, 0.45));
  b.push(L("Island biogeography", [
    "Species on islands|🏝️|The theory of island biogeography by MacArthur and Wilson says the number of species on an island balances <b>immigration</b> of new species against <b>extinction</b> of old ones, reaching an equilibrium.",
    "Size and distance|📏|Large islands have lower extinction rates, so they hold more species. Islands near the mainland get more immigrants, so they also hold more species than faraway islands.",
    "Habitat islands|🌳|The same ideas apply to parks, ponds and mountaintops that are separated from similar habitat. Small, isolated reserves tend to lose species over time."
  ], [
    "Bigger islands usually hold ... species than small ones|more|🏝️||fewer,the same number of",
    "Islands closer to the mainland usually have ... species than far ones|more|➡️||fewer,zero",
    "The number of species on an island balances immigration and...|extinction|⚖️||rainfall,photosynthesis",
    "The theory of island biogeography was developed by MacArthur and...|Wilson|📚||Darwin,Mendel",
    "Small islands tend to have a ... extinction rate|higher|🏝️||lower,unchanging",
    "Far islands tend to have a ... immigration rate|lower|📏||higher,constant",
    "Why can a park surrounded by farms act like an island?|its habitat is isolated|🌳||it floats,it has no plants",
    "An island's species number tends to settle at an...|equilibrium|⚖️||explosion,infinity"
  ], "Think about how fast species arrive and how fast they vanish."));
  b.push(BOTH("Toxins up the food chain", [
    "Two build-ups|🧪|<b>Bioaccumulation</b> is the build-up of a toxin in one animal's body over its life. <b>Biomagnification</b> is the increase in concentration at each step up a food chain.",
    "Famous cases|🥚|DDT, a pesticide, thinned the eggshells of birds like peregrine falcons and bald eagles. Mercury builds up in large predatory fish such as swordfish and tuna.",
    "Why top predators|🦅|Each predator eats many prey, so toxins that do not break down or leave the body pile up. Top predators carry the highest doses. Banning DDT allowed bald eagles to recover."
  ], [
    "A toxin building up in one animal's body over its life is...|bioaccumulation|🧪||biomagnification,biodegradation",
    "A toxin getting more concentrated at each step up a food chain is...|biomagnification|🧪||bioaccumulation,biodiversity",
    "Top predators are the most affected because toxins are most ... in them|concentrated|🦅||diluted,absent",
    "DDT thinned the eggshells of birds like the...|peregrine falcon|🥚||ostrich,penguin",
    "Mercury builds up most in large predatory fish like...|swordfish|🐟||sardines,anchovies",
    "The DDT ban helped bald eagles...|recover|🦅||vanish,migrate",
    "Toxins that dissolve in fat tend to build up in...|fatty tissue|🧈||fingernails,water",
    "A good way to reduce biomagnification is to...|limit toxic chemical use|🧪||eat more predators,release more chemicals"
  ], "Think about what happens at each step as predators eat many prey.", "", biomag, 0.45));
  b.push(L("Red List and hotspots", [
    "The IUCN Red List|📋|The IUCN Red List ranks species by extinction risk: Least Concern, Near Threatened, Vulnerable, Endangered, Critically Endangered, then Extinct in the Wild and Extinct.",
    "Threatened ranks|⚠️|<b>Vulnerable</b>, <b>Endangered</b> and <b>Critically Endangered</b> are called threatened. Critically Endangered species face an extremely high risk of extinction in the wild.",
    "Hotspots|📍|A species found only in one region is <b>endemic</b> there. A <b>biodiversity hotspot</b> is a region with many endemic species that is also highly threatened. Madagascar is a famous hotspot."
  ], [
    "Which IUCN category means an extremely high risk of extinction in the wild?|critically endangered|🔴||vulnerable,least concern",
    "Which category is the lowest risk?|least concern|🟢||vulnerable,endangered",
    "The IUCN Red List ranks species by...|extinction risk|📋||body size,color",
    "Between vulnerable and critically endangered is...|endangered|🟠||near threatened,least concern",
    "A species that lives only in one region is...|endemic|📍||invasive,migratory",
    "A biodiversity hotspot has many endemic species and is also highly...|threatened|⚠️||frozen,flat",
    "Extinct in the wild means survivors live only in...|captivity|🏛️||the ocean,the desert",
    "Madagascar is a hotspot because many of its lemurs are...|endemic|🐒||migratory,invasive"
  ], "Think about the ladder from safest to most at risk."));
  b.push(L("Reading graphs and spotting causes", [
    "Variables|🎛️|The <b>independent variable</b> is what you change on purpose. The <b>dependent variable</b> is what you measure as the result. A <b>control group</b> gets no treatment, for comparison.",
    "Correlation is not causation|📈|Two things can rise together without one causing the other. A <b>confounding variable</b> may affect both. Ice cream sales and sunburns both rise in summer because of hot weather.",
    "Error bars|📊|Error bars on a graph show how much the data vary. Overlapping bars suggest that a difference may be just chance."
  ], [
    "The variable you change on purpose is the...|independent variable|🎛️||dependent variable,control group",
    "The variable you measure as the result is the...|dependent variable|📏||independent variable,constant",
    "A group that gets no treatment for comparison is the...|control group|🧪||variable group,hypothesis group",
    "Two things rising together shows...|correlation|📈||proof of cause,a control",
    "Does correlation alone prove that one thing causes the other?|no|❌||yes,always",
    "A third factor that affects both variables is a...|confounding variable|🔀||control group,placebo",
    "Ice cream sales and shark sightings both rise in summer because of...|hot weather|🍦||ice cream,sharks",
    "Error bars on a graph show how much the data...|vary|📊||cost,weigh"
  ], "Ask yourself what was changed, what was measured, and what else could matter."));
  b.push(L("Animals in extreme places", [
    "Surviving drying out|🔬|Tardigrades, tiny water bears, survive drying by entering <b>cryptobiosis</b>. They shrivel up and restart when water returns. They have even survived exposure in space experiments.",
    "Vents and ice|🌋|At deep-sea hydrothermal vents, tubeworms rely on bacteria that make food from chemicals (<b>chemosynthesis</b>), not sunlight. Many Antarctic fish make antifreeze proteins that stop ice crystals from growing in their blood.",
    "Deserts and cold|🐪|Kangaroo rats may never drink: they get water from their food and from metabolism. Emperor penguins huddle together to reduce heat loss in Antarctic winters."
  ], [
    "Tardigrades survive drying out by entering a state called...|cryptobiosis|🔬||metamorphosis,migration",
    "Vent tubeworms rely on bacteria that make food from chemicals. This is...|chemosynthesis|🌋||photosynthesis,fermentation",
    "Antarctic fish antifreeze proteins stop...|ice crystals growing|🧊||eating,swimming",
    "Life at hydrothermal vents gets energy from...|chemicals|🌋||sunlight,wind",
    "Emperor penguins huddle together to reduce...|heat loss|🐧||speed,hunger",
    "Kangaroo rats get water from their food and from...|metabolism|🐁||rainfall,snow",
    "Which tiny animal can survive drying out for years?|tardigrade|🔬||goldfish,ostrich",
    "Deep-sea vent communities do not need...|sunlight|🌑||water,chemicals"
  ], "Think about the problem each place poses: water, cold, or no light."));
  b.push(MIX("Mixed practice", b.slice(0, 18)));
  b.push(MIX("Level 26 Challenge", b.slice(0, 18).reverse()));

  // ================= LEVEL 27 =================
  c.push(L("Symmetry, heads and body cavities", [
    "Symmetry|🪼|Animals with parts arranged around a central axis, like sea anemones and jellyfish, have <b>radial symmetry</b>. Most animals have <b>bilateral symmetry</b>: left and right halves that mirror each other.",
    "Cephalization|👀|<b>Cephalization</b> is the concentration of sense organs and nerve tissue at the head end. It goes with bilateral symmetry and moving in one direction.",
    "Body cavities|🕳️|A true <b>coelom</b> is a body cavity fully lined by mesoderm. A <b>pseudocoelom</b> is only partly lined (roundworms). <b>Acoelomates</b>, like flatworms, have no body cavity."
  ], [
    "Animals with body parts arranged around a central axis show...|radial symmetry|🪼||bilateral symmetry,no symmetry",
    "Animals with mirror-image left and right halves show...|bilateral symmetry|🐕||radial symmetry,asymmetry",
    "Concentration of sense organs and nerves at the head end is...|cephalization|👀||segmentation,metamorphosis",
    "Cephalization goes with ... symmetry|bilateral|➡️||radial,spherical",
    "A body cavity fully lined by mesoderm is a true...|coelom|🕳️||blastopore,gastrula",
    "Flatworms have no body cavity. They are...|acoelomates|🪱||coelomates,pseudocoelomates",
    "Roundworms have a body cavity only partly lined by mesoderm, a...|pseudocoelom|🪱||coelom,blastula",
    "A sea anemone shows ... symmetry|radial|🌸||bilateral,spherical"
  ], "Think about how the body can be divided into matching halves."));
  c.push(L("Arthropod diversity", [
    "The biggest phylum|🐜|Arthropods are the most species-rich animal phylum. All have a jointed-legged body, a hard exoskeleton of <b>chitin</b>, and a body divided into regions called <b>tagmata</b>. They grow by molting.",
    "Four lineages|🦀|<b>Chelicerates</b> (spiders, scorpions) have no antennae. <b>Crustaceans</b> (crabs, shrimp) have two pairs of antennae. <b>Myriapods</b> are centipedes and millipedes. <b>Hexapods</b> are insects, with 6 legs.",
    "Why they succeed|🏆|Their exoskeleton protects and prevents water loss, jointed legs allow precise movement, and insect wings opened up new habitats and food."
  ], [
    "The arthropod exoskeleton is made mainly of...|chitin|🦀||keratin,collagen",
    "Insects have how many legs?|six|🐜||eight,ten",
    "Spiders and scorpions belong to the...|chelicerates|🕷️||crustaceans,hexapods",
    "Crabs, shrimp and lobsters are...|crustaceans|🦀||chelicerates,myriapods",
    "Centipedes and millipedes are...|myriapods|🐛||hexapods,crustaceans",
    "Arthropods grow by shedding their exoskeleton in a process called...|molting|🦗||budding,hibernation",
    "Arthropod bodies are divided into regions called...|tagmata|📏||phyla,tentacles",
    "Which animal group has the most known species?|insects|🐞||mammals,fish"
  ], "Count legs and antennae to place the animal."));
  c.push(L("Echinoderms and their kin", [
    "Spiny skins|⭐|Echinoderms include sea stars, sea urchins, sand dollars and sea cucumbers. Adults have five-part radial symmetry (<b>pentaradial</b>), but their larvae are bilateral, a clue to their ancestry.",
    "Water power|💧|They move and feed with a <b>water vascular system</b>, a network of fluid-filled canals ending in tube feet. Sea urchins scrape algae with a toothed structure called Aristotle's lantern.",
    "Cousins of chordates|🧬|Echinoderms are deuterostomes, so they are closer relatives of vertebrates than of snails or insects. Acorn worms (hemichordates) are another branch of this group."
  ], [
    "Sea stars, urchins and sand dollars are...|echinoderms|⭐||cnidarians,mollusks",
    "Adult echinoderms show ... symmetry|pentaradial|⭐||bilateral,spherical",
    "Echinoderm larvae show ... symmetry, a clue to their ancestry|bilateral|🐛||radial,none",
    "Echinoderms move with fluid-filled canals and tube feet called the...|water vascular system|💧||open circulatory system,lateral line",
    "Echinoderms are deuterostomes, so they are closer kin to ... than to snails|chordates|🧬||insects,earthworms",
    "Sea urchins scrape algae with a structure called Aristotle's...|lantern|🔦||compass,spear",
    "Acorn worms belong to the same large branch as...|echinoderms|🪱||insects,sponges",
    "Many sea stars can regrow lost...|arms|⭐||eyes,brains"
  ], "Think about the five-part body and the water-filled tube system."));
  c.push(L("Molting animals and spiral animals", [
    "Two protostome branches|🪱|<b>Ecdysozoa</b> (nematodes, arthropods) grow by molting their outer cuticle. <b>Lophotrochozoa</b> include flatworms, annelids and mollusks.",
    "Shared features|🌀|Marine annelids and many mollusks share a free-swimming <b>trochophore</b> larva. Annelid bodies are repeated segments, and earthworms help soil by mixing and aerating it.",
    "Flatworm wonders|🔬|Planaria flatworms are famous for regeneration. Tapeworms are flatworms that live as parasites inside other animals."
  ], [
    "Flatworms, annelids and mollusks are in the...|lophotrochozoans|🪱||ecdysozoans,deuterostomes",
    "Nematodes and arthropods are in the...|ecdysozoans|🪱||lophotrochozoans,deuterostomes",
    "Ecdysozoans are named for their habit of...|molting|🐛||budding,swimming",
    "A larva shared by marine annelids and many mollusks is the...|trochophore|🌀||tadpole,planula",
    "Earthworm bodies are divided into repeated parts, so they are...|segmented|🪱||unsegmented,radial",
    "Planaria flatworms are famous for...|regeneration|🔬||flight,echolocation",
    "Tapeworms are flatworms that live as...|parasites|🪱||predators,filter feeders",
    "Earthworms help soil by...|aerating and mixing it|🌱||sealing it,heating it"
  ], "Link each group to its big feature: molting, or the swimming larva."));
  c.push(L("From fins to limbs", [
    "A big step|🐟|About 375 million years ago, fish relatives like <b>Tiktaalik</b> had a flexible neck, strong fins with wrist-like bones, and lungs. It is a transitional fossil between fish and tetrapods.",
    "Tetrapods|🦎|<b>Tetrapods</b> are four-limbed animals with digits. Early ones like Acanthostega lived in shallow water in the Paleozoic. The closest living fish relatives of tetrapods are lungfish.",
    "Amniotes|🥚|<b>Amniotes</b> have an amniotic egg or embryo membrane and can live fully on land. They split into <b>synapsids</b> (leading to mammals) and <b>sauropsids</b> (reptiles and birds)."
  ], [
    "Tiktaalik is a transitional fossil between fish and...|tetrapods|🦎||birds,mammals",
    "Tetrapods have limbs with...|digits|🖐️||gills,scales",
    "Tiktaalik had a flexible ... unlike most fish|neck|🐟||tail,jaw",
    "Tiktaalik lived about ... million years ago|375|⏳||65,200",
    "The first tetrapods lived in the ... era|Paleozoic|🌿||Mesozoic,Cenozoic",
    "Amniotes are animals whose embryos develop with...|an amniotic membrane|🥚||open water,a pouch",
    "The two amniote lineages are synapsids and...|sauropsids|🦎||placentals,teleosts",
    "Mammals descend from the...|synapsids|🐭||sauropsids,archosaurs"
  ], "Follow the story from water to land."));
  c.push(L("Mammal orders and teeth", [
    "Teeth tell stories|🦷|A <b>dental formula</b> counts incisors, canines, premolars and molars on one side of the jaw. Teeth match diet. Rodents have continuously growing incisors. Carnivores have shearing teeth called <b>carnassials</b>. Grazers have broad flat molars.",
    "Hoofed mammals|🐴|<b>Odd-toed</b> ungulates (horses, rhinos) and <b>even-toed</b> ungulates (cows, pigs, deer) are separate orders. Whales are nested within the even-toed group, and hippos are their closest living relatives.",
    "Fliers|🦇|Bats are the only mammals capable of true flight."
  ], [
    "Rodents are known for continuously growing...|incisors|🐭||canines,molars",
    "Carnivore shearing teeth are called...|carnassials|🐺||incisors,tusks",
    "Horses and rhinos are ... ungulates|odd-toed|🐴||even-toed,toeless",
    "Cows, pigs and deer are ... ungulates|even-toed|🐄||odd-toed,toeless",
    "The closest living relatives of whales are...|hippos|🐋||sharks,seals",
    "Bats are the only mammals capable of true...|flight|🦇||gliding,swimming",
    "A dental formula lists teeth on...|one side of the jaw|🦷||both sides added,the tongue",
    "Grass-chewing herbivores have broad flat...|molars|🐄||canines,carnassials"
  ], "Match the tooth shape to what the animal eats."));
  c.push(L("Birds as living dinosaurs", [
    "Archosaurs|🦖|<b>Archosaurs</b> are a lineage that includes crocodilians, birds, extinct dinosaurs and pterosaurs. Crocodilians are the closest living relatives of birds.",
    "Birds are dinosaurs|🐦|Birds are living theropod dinosaurs. Many feathered theropods could not fly, so feathers evolved before flight, probably for insulation and display.",
    "Built for flight|🪽|Birds have hollow, air-filled bones, a large breastbone with a <b>keel</b> that anchors flight muscles, a beak with no teeth, and a fused collarbone called the furcula."
  ], [
    "Birds belong to which dinosaur group?|theropods|🦖||sauropods,ornithischians",
    "The closest living relatives of birds are...|crocodilians|🐊||lizards,turtles",
    "Archosaurs include birds, crocodilians, and extinct...|dinosaurs and pterosaurs|🦕||trilobites,synapsids",
    "Feathers first evolved...|before flight evolved|🪶||after flight evolved,in mammals",
    "The enlarged breastbone that anchors flight muscles has a...|keel|🪽||furcula,beak",
    "Bird bones are light because many are...|hollow and air-filled|🦴||thick and solid,made of metal",
    "Birds lack ... in their jaws, replaced by beaks|teeth|🦷||tongues,eyes",
    "Flightless birds like ostriches and emus are called...|ratites|🐦||passerines,raptors"
  ], "Think about birds as part of the reptile family tree."));
  c.push(L("Excretory organs of invertebrates", [
    "Simple systems|💧|Freshwater protists and sponges pump out extra water with <b>contractile vacuoles</b>. Flatworms use <b>protonephridia</b>, tubes that end in flame cells.",
    "Segmented tubes|🪱|Earthworms use <b>metanephridia</b>, one pair in nearly every segment, that filter fluid and reclaim useful solutes.",
    "Insects|🪲|Insects use <b>Malpighian tubules</b> that empty into the gut. Waste is mostly uric acid, and the rectum reabsorbs water, which suits life on land. Mammals use nephrons."
  ], [
    "Freshwater protists pump out extra water with...|contractile vacuoles|💧||nephrons,tracheae",
    "Flatworms excrete with tubes ending in flame cells, called...|protonephridia|🔥||nephrons,Malpighian tubules",
    "Earthworms use segmental tubes called...|metanephridia|🪱||protonephridia,nephrons",
    "Insects use ... that empty into the gut|Malpighian tubules|🪲||flame cells,kidneys",
    "Insect Malpighian tubules produce waste that is mostly...|uric acid|💧||ammonia,urea",
    "Which animals use flame cells?|flatworms|🪱||insects,earthworms",
    "Mammals filter blood with...|nephrons|🫘||tracheae,flame cells",
    "Insects save water because the ... takes water back|rectum|💧||heart,wings"
  ], "Match each animal group to its kind of tube."));
  c.push(L("The hypothalamus and pituitary", [
    "The control center|🧠|The hypothalamus in the brain controls the pituitary gland below it, linking the nervous system to the endocrine system. The posterior pituitary releases oxytocin and <b>ADH</b>, which makes the kidney reabsorb more water.",
    "Hormone cascades|🔗|The anterior pituitary releases hormones such as TSH (tells the thyroid to release thyroid hormone), ACTH (tells the adrenal glands to release cortisol) and growth hormone.",
    "Feedback|🔁|When thyroid hormone or cortisol levels rise, they signal the hypothalamus and pituitary to make less, a case of negative feedback. Cortisol is a key stress hormone."
  ], [
    "The master gland controlled by the hypothalamus is the...|pituitary|🧠||thyroid,pancreas",
    "The hypothalamus and pituitary are found in the...|brain|🧠||kidney,liver",
    "The posterior pituitary releases oxytocin and...|ADH|💧||insulin,TSH",
    "ADH makes the kidney reabsorb more...|water|💧||sugar,iron",
    "The stress hormone cortisol comes from the...|adrenal glands|⚠️||thyroid,pancreas",
    "TSH tells the ... to release thyroid hormone|thyroid|🧪||adrenal glands,ovary",
    "High thyroid hormone makes the pituitary release less TSH. This is...|negative feedback|🔁||positive feedback,a reflex",
    "The hypothalamus links the nervous system to the ... system|endocrine|🔗||skeletal,digestive"
  ], "Follow the chain: brain, pituitary, target gland."));
  c.push(L("Action potentials and synapses", [
    "The signal|⚡|A resting neuron is negative inside. When it <b>depolarizes</b> past a threshold, sodium ions rush in, making an <b>action potential</b>. It is all-or-none: always the same size.",
    "Speeding up|🏃|<b>Myelin</b> insulates axons, so the signal jumps between gaps called <b>nodes of Ranvier</b>, which makes conduction much faster.",
    "The synapse|🔗|At a <b>synapse</b>, calcium entering the axon terminal makes vesicles release <b>neurotransmitter</b>. It crosses the gap and binds receptors on the next cell. Acetylcholine, for example, signals muscles to contract."
  ], [
    "A resting neuron is more ... inside than outside|negative|🔋||positive,neutral",
    "An action potential starts when the membrane...|depolarizes|⚡||freezes,dissolves",
    "Sodium ions rush ... the cell during the rising phase|into|➡️||out of,around",
    "Myelin speeds signals by letting them jump between gaps called...|nodes of Ranvier|⚡||synapses,ganglia",
    "The gap between two neurons is a...|synapse|🔗||axon,node",
    "Calcium entering the terminal makes vesicles release...|neurotransmitter|🧪||myelin,insulin",
    "A common neurotransmitter at neuromuscular junctions is...|acetylcholine|💪||insulin,melatonin",
    "Action potentials are all-or-none, meaning they are...|always the same size|1️⃣||bigger for stronger stimuli,only at night"
  ], "Trace the signal along the axon, then across the gap."));
  c.push(L("Neutral evolution", [
    "Kimura's idea|🎲|The <b>neutral theory</b> says most molecular differences between species come from mutations with almost no effect on fitness, spread by chance (genetic drift) rather than selection.",
    "Clock-like change|⏰|For neutral changes, the rate of substitution equals the mutation rate, which is why molecular clocks tick steadily. Silent (synonymous) changes are often nearly neutral.",
    "Selection still matters|🧹|<b>Purifying selection</b> removes harmful mutations, so important parts of a gene change more slowly. Drift is strongest in small populations."
  ], [
    "Kimura's neutral theory says most molecular differences are due to...|neutral mutations and drift|🎲||strong selection,gene flow only",
    "A neutral mutation has ... effect on fitness|almost no|⚖️||a large harmful,a large helpful",
    "Silent (synonymous) changes are often...|nearly neutral|🤫||strongly harmful,strongly helpful",
    "Drift is strongest in ... populations|small|📉||large,infinite",
    "The rate of neutral substitution equals the...|mutation rate|⏱️||population size,selection coefficient",
    "This steady rate of change underlies the molecular...|clock|⏰||map,compass",
    "Important parts of a gene change more ... than unimportant parts|slowly|🔒||quickly,randomly",
    "Selection that removes harmful mutations is...|purifying selection|🧹||positive selection,drift"
  ], "Ask whether chance or selection explains the change."));
  c.push(L("Clades and cladograms", [
    "Branches of the tree|🌳|A <b>clade</b> or <b>monophyletic</b> group contains an ancestor and ALL its descendants. A <b>paraphyletic</b> group leaves some descendants out. A <b>polyphyletic</b> group has members from different ancestors and omits their common ancestor.",
    "Traits|🧬|A <b>synapomorphy</b> is a shared derived trait that defines a clade, such as fur in mammals. The <b>outgroup</b> is a related lineage outside the group, used to tell old traits from new ones.",
    "Reading nodes|🔎|Each node on a cladogram is a common ancestor. 'Reptiles' without birds is a paraphyletic group, because birds are descendants of reptile ancestors."
  ], [
    "A group with an ancestor and ALL its descendants is...|monophyletic|🌳||paraphyletic,polyphyletic",
    "A group that leaves out some descendants is...|paraphyletic|✂️||monophyletic,polyphyletic",
    "A group with members from different ancestors, omitting their common ancestor, is...|polyphyletic|🔀||monophyletic,paraphyletic",
    "A shared derived trait that defines a clade is a...|synapomorphy|🧬||symplesiomorphy,polymorphism",
    "The related lineage outside the group, used for comparison, is the...|outgroup|↗️||ingroup,clade",
    "'Reptiles' excluding birds is...|paraphyletic|🦎||monophyletic,polyphyletic",
    "A node on a cladogram shows a...|common ancestor|🌿||extinction,trait loss",
    "Fur is a derived trait that defines the clade of...|mammals|🐶||birds,reptiles"
  ], "Check whether the group includes every descendant of one ancestor."));
  c.push(L("Where animals live and why", [
    "Moving continents|🌍|Biogeography studies how species are distributed. <b>Vicariance</b> happens when a barrier, like moving continents, splits a range. <b>Dispersal</b> happens when species cross a barrier into a new place.",
    "Old landmasses|🦘|Continental drift (plate tectonics) broke up the supercontinent Gondwana into South America, Africa, India, Australia and Antarctica. Australia was long isolated, which is why marsupials are so diverse there.",
    "Wallace|🌴|Alfred Russel Wallace studied animals in the Malay Archipelago and noticed a sharp change in fauna along the <b>Wallace Line</b>, between Asian and Australasian species. Lemurs live only on Madagascar."
  ], [
    "The Wallace Line separates Asian animals from those of...|Australasia|🗺️||Africa,the Arctic",
    "Species split by a moving continent show...|vicariance|🌏||dispersal,migration",
    "Species that cross a barrier to a new place show...|dispersal|🦅||vicariance,extinction",
    "Continents moving over time is called...|continental drift|🌍||sea level rise,glaciation",
    "Gondwana split into South America, Africa, Australia, Antarctica and...|India|🗺️||Europe,Greenland",
    "Marsupials are diverse in Australia mainly because Australia was long...|isolated|🦘||connected to Asia,covered in ice",
    "Wallace worked out biogeography while traveling in the...|Malay Archipelago|🌴||Arctic,Alps",
    "Lemurs live only on...|Madagascar|🐒||Borneo,Cuba"
  ], "Ask whether a barrier moved or whether the animals moved."));
  c.push(BOTH("Exponential and logistic growth", [
    "Two growth curves|📈|Exponential growth, dN/dt = rN, makes a J-shaped curve with no limits. Logistic growth, dN/dt = rN(1 - N/K), makes an S-shaped curve that slows as N nears the carrying capacity K.",
    "The S curve|〰️|Logistic growth is fastest at N = K/2 and is zero at N = K. If N is above K, the population declines.",
    "What sets limits|🧱|Density-dependent factors, such as food, disease and space, get stronger as numbers rise. Density-independent factors, like storms, act regardless of density."
  ], [
    "Unlimited growth gives a ... shaped curve|J-shaped|📈||S-shaped,flat",
    "Logistic growth gives a ... curve|S-shaped|〰️||J-shaped,flat",
    "In logistic growth, growth is zero when N equals...|carrying capacity|🛑||the growth rate,half of capacity",
    "Logistic growth is fastest when N is about...|half of K|⚡||K,zero",
    "If N is above K, the population tends to...|decline|📉||grow faster,double",
    "In these equations, r stands for the...|intrinsic rate of increase|🔢||resource ratio,reserve rate",
    "Limits that get stronger as numbers rise are ... factors|density-dependent|👥||density-independent,random",
    "A hurricane killing a fixed fraction of animals is a ... factor|density-independent|🌀||density-dependent,logistic"
  ], "Picture the S-curve and where it is steepest.", "", logist, 0.45));
  c.push(L("Competition models", [
    "Competition types|👥|<b>Intraspecific</b> competition is between members of one species. <b>Interspecific</b> competition is between different species.",
    "Competitive exclusion|🚫|Gause grew two Paramecium species together on the same food: one species won and the other died out. The <b>competitive exclusion principle</b> says species with identical needs cannot coexist forever.",
    "Coexisting|🌲|Species can coexist by <b>resource partitioning</b>, such as warblers feeding in different parts of a spruce tree. Lotka-Volterra models predict stable coexistence when competition within each species is stronger than between them."
  ], [
    "Gause's competing Paramecium species ended with...|one species excluding the other|🔬||both growing forever,no change",
    "The principle that species with identical needs cannot coexist is...|competitive exclusion|🚫||resource sharing,mutualism",
    "Species can coexist by dividing resources, called...|resource partitioning|🍽️||competitive exclusion,migration",
    "Competition between members of the same species is...|intraspecific|👥||interspecific,symbiotic",
    "Competition between different species is...|interspecific|👥||intraspecific,mutual",
    "Lotka-Volterra models predict coexistence when competition within species is ... than between species|stronger|⚖️||weaker,zero",
    "Anole lizards on one tree using different heights show...|resource partitioning|🦎||competitive exclusion,parasitism",
    "Warblers feeding in different parts of the same spruce tree show...|niche partitioning|🌲||predation,migration"
  ], "Ask whether the two species can share what they need."));
  c.push(L("The nitrogen cycle and animals", [
    "Getting nitrogen|🌬️|Air is mostly nitrogen gas, but most organisms cannot use it. Bacteria in soil and in legume roots perform <b>nitrogen fixation</b>, making usable forms.",
    "Cycling|♻️|<b>Ammonification</b>: decomposers turn proteins and wastes into ammonia. <b>Nitrification</b>: bacteria turn ammonia into nitrite and nitrate. <b>Denitrification</b>: other bacteria return nitrogen gas to the air.",
    "Animals|🥩|Animals get nitrogen from proteins in food and return it as urine, manure and bodies. Too much fertilizer runoff can cause algal blooms in water."
  ], [
    "Turning nitrogen gas into usable forms is nitrogen...|fixation|🌬️||denitrification,nitrification",
    "Bacteria in legume roots...|fix nitrogen|🌱||release nitrogen to space,digest cellulose",
    "Turning ammonia into nitrite and nitrate is...|nitrification|⚗️||fixation,denitrification",
    "Returning nitrogen gas to the air is...|denitrification|💨||fixation,assimilation",
    "Decomposers turning proteins into ammonia is...|ammonification|🍄||nitrification,fixation",
    "Animals get nitrogen mainly from...|proteins in food|🥩||the air,water alone",
    "Animal urine and manure return nitrogen to...|soil and water|💧||space,rocks only",
    "Too much fertilizer runoff can cause ... in waters|algal blooms|🟢||clear water,more salt"
  ], "Trace the nitrogen: gas, usable forms, back to gas."));
  c.push(BOTH("Small populations and inbreeding", [
    "Effective population size|🐆|<b>Ne</b> is the size of an ideal population that would lose genetic diversity as fast as the real one. It is usually smaller than the headcount (census size).",
    "What lowers Ne|⚖️|Unequal sex ratios, big differences in how many young each parent has, and big swings in population size all lower Ne. With unequal sexes, Ne = 4 x Nm x Nf / (Nm + Nf).",
    "Inbreeding|🧬|In small populations, relatives mate and harmful recessive alleles become homozygous. This <b>inbreeding depression</b> lowers fitness. Adding new individuals, <b>genetic rescue</b>, helped the Florida panther."
  ], [
    "Ne is usually ... than the headcount|smaller|📉||larger,identical",
    "Which lowers Ne?|unequal numbers of males and females|⚖️||an equal sex ratio,more food",
    "Mating between relatives is...|inbreeding|👪||outbreeding,hybridization",
    "Inbreeding raises the chance that harmful recessive alleles become...|homozygous|🧬||dominant,extinct",
    "A drop in fitness due to inbreeding is...|inbreeding depression|⬇️||heterosis,gene flow",
    "Bringing in new individuals with new alleles is...|genetic rescue|🛟||genetic drift,inbreeding",
    "Small populations lose diversity faster by...|genetic drift|🎲||mutation,migration",
    "For the same headcount, a larger Ne comes from...|an equal sex ratio|⚖️||one male and many females,one female and many males"
  ], "Think about how many animals actually pass on genes.", "", neff, 0.45));
  c.push(L("Ecosystem services", [
    "What nature gives us|🌳|<b>Ecosystem services</b> are the benefits people get from nature. <b>Provisioning</b> services are products like food, water and timber. <b>Regulating</b> services include flood control, pollination and climate control.",
    "More services|🏞️|<b>Cultural</b> services include recreation and spiritual value. <b>Supporting</b> services, like nutrient cycling and soil formation, make the others possible.",
    "Examples|🌊|Mangroves absorb wave energy and protect coasts. Wetlands filter pollutants from water. Putting a money value on nature helps decision makers compare costs and benefits."
  ], [
    "Benefits people get from nature are called...|ecosystem services|🌳||nature taxes,wild rights",
    "Food, water and timber are ... services|provisioning|🍎||regulating,cultural",
    "Flood control and pollination are ... services|regulating|🐝||provisioning,cultural",
    "Recreation and spiritual value are ... services|cultural|🏞️||provisioning,regulating",
    "Nutrient cycling and soil formation are ... services|supporting|🌱||cultural,provisioning",
    "Mangroves protect coasts by absorbing...|wave energy|🌊||sunlight,pollen",
    "Wetlands clean water by filtering...|pollutants|💧||fish,sand",
    "Putting a money value on nature helps decision makers...|compare costs and benefits|⚖️||ignore nature,avoid planning"
  ], "Sort each benefit into products, controls, culture, or support."));
  c.push(MIX("Mixed practice", c.slice(0, 18)));
  c.push(MIX("Level 27 Challenge", c.slice(0, 18).reverse()));

  Object.assign(ANIMALS_LEVELS, { 25: a, 26: b, 27: c });
})();
