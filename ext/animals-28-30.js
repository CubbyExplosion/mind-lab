// ext/animals-28-30.js  Animals & Nature levels 28-30
(() => {
  const nz = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
  const T = slides => () => slides.map(s => { const p = s.split("|"); return { h: p[0], v: p[1], t: p[2] }; });
  const L = (title, slides, items, nudge, clue) => {
    const its = items.map(s => { const p = s.split("|"); return { q: p[0], a: p[1], v: p[2] || "", c: p[3] || "", w: p[4] ? p.slice(4).join(",").split(",").filter(Boolean) : null }; });
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
  const para = NUM(() => ({ k: ri(0, 2), E: pick([1000, 2000, 5000, 10000, 20000]), a: pick([10, 20, 50]), b: pick([10, 20, 50]) }), p => {
    const s1 = p.E * p.a / 100, s2 = s1 * p.b / 100;
    const base = `A parasite makes ${p.E} eggs. ${p.a}% of the eggs become larvae that infect an intermediate host, and ${p.b}% of those larvae reach the definitive host.`;
    const ex = `With 1000 eggs, 10% become larvae (100), and 50% of those survive (50).`;
    if (p.k === 0) return { v: "🪱", ans: s2, text: `${base} How many larvae reach the definitive host?`, h1: "Apply the two survival steps one after the other.", h2: "Take the first percentage of the eggs, then take the second percentage of that smaller number.", ex: `${ex} The answer is 50.` };
    if (p.k === 1) return { v: "🥚", ans: s1, text: `${base} How many larvae infect the intermediate host?`, h1: "Only the first step matters here.", h2: "Find the first percentage of the egg number.", ex: `With 1000 eggs and 10% reaching larvae: 1000 x 10 / 100 = 100. The answer is 100.` };
    return { v: "📉", ans: p.E - s1, text: `${base} How many eggs never become infective larvae?`, h1: "Count the eggs that fail at the first step.", h2: "Subtract the successful eggs from all the eggs.", ex: `With 1000 eggs and 10% succeeding, 100 succeed, so 900 fail. The answer is 900.` };
  });
  const ifd = NUM(() => ({ k: ri(0, 2), r: pick([[1, 1], [2, 1], [3, 1], [3, 2], [4, 1], [1, 3], [2, 3]]), m: ri(2, 9) }), p => {
    const a = p.r[0], b = p.r[1], N = (a + b) * p.m;
    const ex = `Food in the ratio 1:1 with 20 animals means 10 animals in each patch.`;
    if (p.k === 0) return { v: "🦆", ans: a * p.m, text: `Food reaches two patches in the ratio ${a}:${b} (A:B). ${N} animals settle in an ideal free distribution. How many are in patch A?`, h1: "At the ideal free distribution, animal numbers match food supply.", h2: "Split all the animals in the same ratio as the food. Find the size of one share first.", ex: `${ex} The answer is 10.` };
    if (p.k === 1) return { v: "🦆", ans: b * p.m, text: `Food reaches two patches in the ratio ${a}:${b} (A:B). ${N} animals settle in an ideal free distribution. How many are in patch B?`, h1: "At the ideal free distribution, animal numbers match food supply.", h2: "Divide the total by the number of shares, then multiply by B's shares.", ex: `Food in the ratio 1:3 with 20 animals means 4 shares of 5, so patch B has 15. The answer is 15.` };
    return { v: "⚖️", ans: b * p.m, text: `Food ratio A:B is ${a}:${b}. Patch A holds ${a * p.m} animals in an ideal free distribution. How many animals are in patch B?`, h1: "Animals match the food ratio in every patch.", h2: "Find how many animals make one share, then multiply by B's shares.", ex: `Food ratio 1:3 and 5 animals in A means one share is 5, so B has 15. The answer is 15.` };
  });
  const echo = NUM(() => ({ k: ri(0, 1), n: ri(1, 10) }), p => {
    const o = p.n % 10 + 1;
    if (p.k === 0) return { v: "🦇", ans: 17 * p.n, text: `A bat hears its echo ${100 * p.n} milliseconds after its call. Sound travels 340 meters per second. How many meters away is the target?`, h1: "The sound travels to the target and back.", h2: "Find the distance for the whole trip (speed x time in seconds), then halve it.", ex: `An echo after ${100 * o} ms is ${o / 10} s. Trip = 340 x ${o / 10} = ${34 * o} m, half is ${17 * o} m. The answer is ${17 * o}.` };
    return { v: "🔊", ans: 100 * p.n, text: `A target is ${17 * p.n} meters away from a bat. Sound travels 340 meters per second. After how many milliseconds does the echo come back?`, h1: "The sound travels there and back.", h2: "Double the distance, divide by the speed to get seconds, then convert to milliseconds.", ex: `A target ${17 * o} m away: round trip ${34 * o} m, time ${(34 * o) / 340} s = ${100 * o} ms. The answer is ${100 * o}.` };
  });
  const selc = NUM(() => ({ k: ri(0, 1), base: pick([100, 200, 400, 500]), s: pick([10, 20, 25, 40, 50]) }), p => {
    const low = p.base * (100 - p.s) / 100;
    if (p.k === 0) return { v: "🧬", ans: low, text: `The best genotype leaves ${p.base} offspring. A rival genotype has a selection coefficient s = ${p.s / 100}. How many offspring does the rival leave?`, h1: "Relative fitness is 1 minus s.", h2: "Multiply the best number of offspring by (1 - s).", ex: `Best leaves 100 offspring and s = 0.3, so the rival leaves 100 x 0.7 = 70. The answer is 70.` };
    return { v: "📊", ans: p.s, text: `The best genotype leaves ${p.base} offspring and a rival leaves ${low}. What is the rival's selection coefficient, as a percent (s x 100)?`, h1: "First find the relative fitness, rival divided by best.", h2: "s is 1 minus that relative fitness. Then write it as a percent.", ex: `Best leaves 100 and rival leaves 70: w = 0.7, s = 0.3, which is 30 percent. The answer is 30.` };
  });
  const pva = NUM(() => ({ k: ri(0, 2), t: ri(2, 5), m: ri(1, 5), N: pick([40, 80, 120, 200]), p: pick([10, 20, 25, 50]) }), p => {
    const N0 = p.m * Math.pow(2, p.t);
    if (p.k === 0) return { v: "📉", ans: p.m, text: `A small population of ${N0} animals halves every year. How many are left after ${p.t} years?`, h1: "Halve once for each year.", h2: "Divide by 2 as many times as there are years.", ex: `64 animals halving for 3 years: 32, 16, 8. The answer is 8.` };
    if (p.k === 1) return { v: "⏳", ans: p.t, text: `A population of ${N0} animals halves every year. In how many years does it fall to ${p.m} animals?`, h1: "Count how many times you halve.", h2: "Keep halving the starting number until you reach the target, and count the steps.", ex: `64 halving to 8: 64, 32, 16, 8 took 3 halvings. The answer is 3.` };
    return { v: "⚠️", ans: p.N * p.p / 100, text: `A small population has ${p.N} adults and loses ${p.p}% of them each year. How many adults die in one year?`, h1: "Find a percent of the whole.", h2: "Multiply the population by the percent and divide by 100.", ex: `With 60 adults and 10% loss: 60 x 10 / 100 = 6. The answer is 6.` };
  });
  const quad = NUM(() => ({ k: ri(0, 2), a: pick([1, 4]), n: pick([5, 10, 20]), d: ri(2, 9), A: pick([100, 500, 1000, 2000]) }), p => {
    const T = p.d * p.n * p.a;
    if (p.k === 0) return { v: "🟩", ans: p.d, text: `${p.n} quadrats of ${p.a} square meter(s) each hold ${T} animals in total. What is the density per square meter?`, h1: "Density is count divided by area sampled.", h2: "Find the total area of all the quadrats first, then divide the count by it.", ex: `4 quadrats of 1 m2 hold 12 animals: area 4 m2, 12 / 4 = 3. The answer is 3.` };
    if (p.k === 1) return { v: "🌾", ans: p.d * p.A, text: `Quadrat sampling finds ${p.d} animals per square meter. About how many animals live in a field of ${p.A} square meters?`, h1: "Scale the sample up to the whole area.", h2: "Multiply the density by the area of the field.", ex: `Density 3 per m2 in 50 m2: 3 x 50 = 150. The answer is 150.` };
    return { v: "🟩", ans: p.d * p.a, text: `${p.n} quadrats of ${p.a} square meter(s) each hold ${T} animals in total. What is the mean count per quadrat?`, h1: "A mean is a total shared out equally.", h2: "Divide the total count by the number of quadrats.", ex: `20 animals in 5 quadrats: 20 / 5 = 4. The answer is 4.` };
  });
  const occ = NUM(() => ({ k: ri(0, 1), p: pick([10, 20, 30, 40, 50]) }), p => {
    const miss = Math.round(Math.pow(100 - p.p, 2) / 100);
    if (p.k === 0) return { v: "🔎", ans: 100 - miss, text: `A species is present at a site, and each survey has a ${p.p}% chance of detecting it. Two independent surveys are done. What is the percent chance of detecting it at least once?`, h1: "It is easier to find the chance of missing it both times.", h2: "Chance of at least one detection = 100 minus the chance of two misses. A miss on one survey is 100 minus the detection percent.", ex: `With 10% detection: a miss is 90%, two misses is 81%, so at least one detection is 19%. The answer is 19.` };
    return { v: "🙈", ans: miss, text: `A species is present at a site, and each survey has a ${p.p}% chance of detecting it. Two independent surveys are done. What is the percent chance of missing it both times?`, h1: "Find the miss chance for one survey first.", h2: "Multiply the two miss chances as fractions of 1, then write the result as a percent.", ex: `With 10% detection: miss = 0.9, both misses = 0.9 x 0.9 = 0.81, which is 81 percent. The answer is 81.` };
  });
  const dist = NUM(() => ({ k: ri(0, 2), lw: pick([[2, 0.1], [5, 0.1], [10, 0.1], [2, 0.5], [5, 0.5], [10, 0.5]]), D: pick([5, 10, 15, 20, 25, 30]), A: pick([10, 20, 50]) }), p => {
    const L = p.lw[0], w = p.lw[1], n = Math.round(p.D * 2 * L * w);
    const base = `Observers walk a ${L} km line and count animals within ${w} km on each side of it.`;
    if (p.k === 0) return { v: "🚶", ans: p.D, text: `${base} They count ${n} animals. What is the density in animals per square km?`, h1: "Density is count divided by the area surveyed.", h2: "Area = length x total strip width (both sides of the line).", ex: `A 4 km line with 1 km on each side counts 16 animals. Area = 4 x 2 = 8 km2, and 16 / 8 = 2. The answer is 2.` };
    if (p.k === 1) return { v: "🚶", ans: n, text: `${base} The true density is ${p.D} animals per square km. How many animals will the observers expect to count?`, h1: "Find the surveyed area first.", h2: "Count = density x length x total strip width.", ex: `A 4 km line with 1 km on each side has area 8 km2. At 2 per km2 you expect 16. The answer is 16.` };
    return { v: "🗺️", ans: p.D * p.A, text: `A line survey shows ${p.D} animals per square km. About how many animals live in a ${p.A} square km reserve?`, h1: "Scale density up to the whole area.", h2: "Multiply density by the area of the reserve.", ex: `3 per km2 in a 10 km2 reserve gives 3 x 10 = 30. The answer is 30.` };
  });
  const cam = NUM(() => ({ k: ri(0, 2), r: pick([2, 4, 6, 8, 10, 12, 20]), N: pick([50, 100, 250, 500]) }), p => {
    const d = p.r * p.N / 100;
    if (p.k === 0) return { v: "📷", ans: p.r, text: `A camera trap array runs for ${p.N} trap-nights and records ${d} detections of a species. What is its detection rate per 100 trap-nights?`, h1: "A rate compares detections with effort.", h2: "Divide the detections by the trap-nights, then multiply by 100.", ex: `10 detections in 200 trap-nights: 10 / 200 x 100 = 5. The answer is 5.` };
    if (p.k === 1) return { v: "📷", ans: d, text: `A species is recorded at ${p.r} detections per 100 trap-nights. How many detections are expected in ${p.N} trap-nights?`, h1: "Scale the rate up to the effort.", h2: "Find how many hundreds of trap-nights there are, then multiply by the rate.", ex: `A rate of 5 per 100 over 200 trap-nights is 2 x 5 = 10. The answer is 10.` };
    return { v: "🌙", ans: p.N, text: `A species is recorded at ${p.r} detections per 100 trap-nights. A survey gets ${d} detections. How many trap-nights did it run?`, h1: "Work backwards from the rate.", h2: "Detections divided by the rate gives the number of hundreds of trap-nights.", ex: `At 5 per 100, 10 detections need 10 / 5 = 2 hundreds, so 200 trap-nights. The answer is 200.` };
  });
  const iso = NUM(() => ({ k: ri(0, 2), t: ri(2, 5), b: ri(2, 8) }), p => {
    const cons = p.b + 3 * (p.t - 1);
    const base = "Assume nitrogen-15 rises by 3 per mil with each trophic level, and plants (trophic position 1) are the base.";
    if (p.k === 0) return { v: "🧪", ans: p.t, text: `${base} Plants have 15N = ${p.b} and a fish has ${cons}. What is the fish's trophic position?`, h1: "Count how many steps up from the base the fish is.", h2: "Divide the difference by 3, then add 1 for the starting level.", ex: `Plants 4 and animal 10: difference 6, 6 / 3 = 2 steps, position 3. The answer is 3.` };
    if (p.k === 1) return { v: "🧪", ans: cons, text: `${base} Plants have 15N = ${p.b}. What 15N value do you expect in an animal at trophic position ${p.t}?`, h1: "Count the steps above the plants.", h2: "Steps = position minus 1. Add 3 for each step to the plant value.", ex: `Plants 4 and position 3: 2 steps x 3 = 6, so 4 + 6 = 10. The answer is 10.` };
    return { v: "🧪", ans: p.b, text: `${base} An animal at trophic position ${p.t} has 15N = ${cons}. What is the 15N of the plants at the base?`, h1: "Work backwards down the food chain.", h2: "Take away 3 for each step between the animal and the plants.", ex: `Position 3 with 15N = 10: two steps x 3 = 6, so the base is 4. The answer is 4.` };
  });
  const lesl = NUM(() => ({ k: ri(0, 2), A: pick([20, 40, 50, 100, 200]), f: pick([1, 2, 3]), J: pick([10, 20, 40, 100]), sj: pick([20, 50, 80]), sa: pick([50, 60, 80]) }), p => {
    const base = `A population has ${p.A} adults and ${p.J} juveniles. Each adult produces ${p.f} newborn(s) per year, ${p.sj}% of juveniles become adults, and ${p.sa}% of adults survive the year.`;
    if (p.k === 0) return { v: "🐣", ans: p.A * p.f, text: `${base} How many newborns are produced this year?`, h1: "Only adults reproduce here.", h2: "Multiply the number of adults by the births per adult.", ex: `30 adults with 2 newborns each make 60. The answer is 60.` };
    if (p.k === 1) return { v: "🧮", ans: p.J * p.sj / 100 + p.A * p.sa / 100, text: `${base} How many adults will there be next year?`, h1: "Next year's adults come from two sources.", h2: "Add the juveniles who mature to the adults who survive.", ex: `10 juveniles at 50% and 20 adults at 50%: 5 + 10 = 15. The answer is 15.` };
    return { v: "📉", ans: p.J * (100 - p.sj) / 100, text: `${base} How many juveniles do NOT become adults?`, h1: "Find the percent that fail to mature.", h2: "Subtract the maturing percent from 100, then take that percent of the juveniles.", ex: `20 juveniles with 50% maturing: 50% fail, which is 10. The answer is 10.` };
  });
  const cpue = NUM(() => ({ k: ri(0, 2), c: pick([2, 4, 5, 10, 20]), E: pick([10, 20, 50, 100]), o: pick([40, 80, 100, 200]), q: pick([10, 20, 25, 50]) }), p => {
    const C = p.c * p.E;
    if (p.k === 0) return { v: "🎣", ans: p.c, text: `Scientists record a catch of ${C} kg in ${p.E} boat-days. What is the catch per unit effort (kg per boat-day)?`, h1: "Compare the catch with the effort used.", h2: "Divide the catch by the number of boat-days.", ex: `A catch of 60 kg in 20 boat-days: 60 / 20 = 3. The answer is 3.` };
    if (p.k === 1) return { v: "⚓", ans: p.E, text: `A fishery gets ${p.c} kg per boat-day. How many boat-days of effort produce a catch of ${C} kg?`, h1: "Work backwards from the rate.", h2: "Divide the catch by the kg per boat-day.", ex: `At 3 kg per boat-day, a 60 kg catch needs 60 / 3 = 20. The answer is 20.` };
    return { v: "📉", ans: p.q, text: `Catch per unit effort fell from ${p.o} to ${p.o * (100 - p.q) / 100} kg per day. By what percent did it fall?`, h1: "Compare the drop with the starting value.", h2: "Find the drop, divide by the starting value, then multiply by 100.", ex: `A fall from 50 to 40 is a drop of 10, 10 / 50 = 20 percent. The answer is 20.` };
  });
  const cinum = NUM(() => ({ k: ri(0, 2), r: pick([2, 3, 4, 5, 6, 10]), se: ri(1, 6) }), p => {
    const n = p.r * p.r, sd = p.se * p.r;
    if (p.k === 0) return { v: "📏", ans: p.se, text: `A sample of ${n} animals has a standard deviation of ${sd} g. What is the standard error of the mean (SD divided by the square root of n)?`, h1: "The standard error is smaller than the SD.", h2: "Find the square root of the sample size, then divide the SD by it.", ex: `A sample of 16 with SD 12: square root of 16 is 4, 12 / 4 = 3. The answer is 3.` };
    if (p.k === 1) return { v: "📏", ans: 2 * p.se, text: `A sample of ${n} animals has an SD of ${sd} g. Roughly how wide is the 95% confidence interval on each side of the mean (about 2 standard errors)?`, h1: "Find the standard error first.", h2: "SE = SD divided by the square root of n. Then double it.", ex: `A sample of 16 with SD 12: SE = 3, so about 2 x 3 = 6. The answer is 6.` };
    return { v: "🔢", ans: n, text: `A study finds an SD of ${sd} g and a standard error of ${p.se} g. How many animals were sampled?`, h1: "Work backwards from SE = SD divided by the square root of n.", h2: "Divide the SD by the SE to get the square root of n, then square it.", ex: `SD 12 and SE 3: 12 / 3 = 4, and 4 squared is 16. The answer is 16.` };
  });

  // ---------- LEVEL 28 ----------
  const a = [], b = [], c = [];
  a.push(L("Cnidarian life cycles", [
    "Two body forms|🪼|Many cnidarians have a <b>polyp</b> (a tube shape, usually attached, like a sea anemone) and a <b>medusa</b> (a free-swimming bell, like a jellyfish).",
    "A typical cycle|🔄|Medusae release eggs and sperm. The zygote grows into a swimming <b>planula larva</b>, which settles and becomes a polyp. The polyp divides asexually to make new medusae.",
    "Variations|🪸|Corals and sea anemones live only as polyps. In true jellyfish the medusa is the main stage. Both forms use <b>cnidocytes</b>, the stinging cells."
  ], [
    "The bell-shaped, free-swimming cnidarian form is the...|medusa|🪼||polyp,planula",
    "The tube-shaped, attached cnidarian form is the...|polyp|🪸||medusa,planula",
    "The swimming larva of a cnidarian is called a...|planula|🐛||polyp,medusa",
    "Corals and sea anemones live as...|polyps only|🪸||medusae only,both forms",
    "In a typical jellyfish cycle the medusa makes...|eggs and sperm|🥚||spores,buds only",
    "A polyp makes new medusae mainly by...|asexual division|✂️||sexual mating,molting",
    "The stinging cells of cnidarians are called...|cnidocytes|⚡||choanocytes,amoebocytes",
    "A coral reef is built from many connected...|polyps|🪸||medusae,planulae"
  ], "Is it the attached form, the swimming bell, or the larva?"));
  a.push(BOTH("Definitive and intermediate hosts", [
    "Host roles|🪱|The <b>definitive host</b> is where a parasite becomes adult and reproduces sexually. An <b>intermediate host</b> carries larval stages. A <b>vector</b> carries a parasite from host to host.",
    "Complex cycles|🔁|A parasite with several hosts has a <b>complex life cycle</b>. One with a single host has a <b>direct</b> cycle. In malaria, the Anopheles mosquito is the definitive host and humans are an intermediate host.",
    "Big numbers|📊|Each step is risky, so many parasites make thousands of eggs. A tapeworm adult lives in a vertebrate gut, and eating larval cysts in raw meat can start an infection."
  ], [
    "The host where a parasite becomes adult and reproduces is the...|definitive host|🪱||intermediate host,vector",
    "A host that carries only larval stages is the...|intermediate host|🐌||definitive host,vector",
    "An animal that carries a parasite between hosts is a...|vector|🦟||definitive host,decomposer",
    "In malaria the parasite reproduces sexually inside the...|mosquito|🦟||human liver,red blood cell",
    "Adult tapeworms usually live in the...|gut of a vertebrate|🪱||blood of an insect,shell of a snail",
    "Many parasites make thousands of eggs because...|few offspring survive each stage|🥚||every egg survives,hosts need no eggs",
    "A parasite that uses more than one host has a ... life cycle|complex|🔁||direct,solitary",
    "A parasite that uses only one host has a ... life cycle|direct|➡️||complex,vectored"
  ], "Which animal holds the adult, and which holds the young?", "", para, 0.4));
  a.push(L("Fish in fresh and salt water", [
    "Fresh water|🐟|A freshwater fish is saltier than its water, so water flows in by osmosis. It makes <b>lots of dilute urine</b> and takes salts in through its gills.",
    "Salt water|🌊|A marine bony fish is less salty than seawater, so it loses water. It <b>drinks seawater</b>, makes little urine, and pumps extra salt out through its <b>gills</b> with active transport.",
    "In between|🐟|Sharks keep <b>urea</b> in their blood so their fluids match seawater. <b>Euryhaline</b> fish handle many salinities, and salmon are <b>anadromous</b>: they breed in rivers and grow in the sea."
  ], [
    "A freshwater fish tends to ... water by osmosis|gain|🐟||lose,ignore",
    "A marine bony fish tends to ... water by osmosis|lose|🌊||gain,hold steady",
    "Freshwater fish make ... urine|large amounts of dilute|🚰||tiny amounts of salty,no",
    "Marine bony fish remove extra salt through their...|gills|🐠||scales,fins",
    "Sharks match seawater by holding a lot of...|urea|🦈||glucose,calcium",
    "Fish that tolerate a wide range of salinity are...|euryhaline|🐟||stenohaline,benthic",
    "Fish limited to a narrow salinity range are...|stenohaline|🐠||euryhaline,pelagic",
    "Salmon that breed in rivers but grow in the sea are...|anadromous|🐟||catadromous,stenohaline"
  ], "Think about which way water moves across the gills and skin."));
  a.push(L("Jaws and middle ear bones", [
    "Mammal ancestors|🦴|Mammals belong to the <b>synapsids</b>, a group with one opening on each side of the skull behind the eye. Early synapsids had jaws built from several bones.",
    "Bones that moved|👂|In mammals the lower jaw is a single bone, the <b>dentary</b>. Two old jaw-joint bones, the <b>articular</b> and <b>quadrate</b>, shrank and became the <b>malleus</b> and <b>incus</b> of the middle ear.",
    "Evidence|🔍|Reptiles and birds have one middle ear bone (the stapes), while mammals have three. Cynodont fossils show jaw bones getting smaller as ear bones formed."
  ], [
    "The mammal lower jaw is a single bone called the...|dentary|🦴||articular,quadrate",
    "The malleus evolved from the jaw bone called the...|articular|👂||dentary,squamosal",
    "The incus evolved from the jaw bone called the...|quadrate|👂||dentary,squamosal",
    "Mammals have ... middle ear bones|three|👂||one,five",
    "Reptiles and birds have ... middle ear bone(s)|one|🦎||two,three",
    "The group that includes mammal ancestors is the...|synapsids|🦴||diapsids,amphibians",
    "Synapsid skulls have ... opening on each side behind the eye|one|💀||two,no",
    "The jaw-to-ear change is a good example of evolution because...|bones were reused for a new job|🔁||bones were deleted for no reason,new bones appeared from nothing"
  ], "Remember which jaw bones stayed and which moved into the ear."));
  a.push(L("Feeding styles of animals", [
    "Grabbing and sucking|🐟|<b>Suction feeding</b>: a fish expands its mouth, which lowers the pressure and pulls in water and prey. <b>Raptorial feeding</b>: grabbing prey with claws, jaws or limbs.",
    "Straining|🐋|<b>Filter feeding</b> strains tiny food from water, as baleen whales and clams do. <b>Ram feeding</b>: swimming with the mouth open, as a basking shark does.",
    "Other styles|🦋|<b>Deposit feeders</b>, such as earthworms, eat soil or mud for the food in it. <b>Fluid feeders</b>, such as butterflies and mosquitoes, drink liquids."
  ], [
    "Baleen whales strain small prey from water. This is...|filter feeding|🐋||suction feeding,deposit feeding",
    "A fish expands its mouth to pull in prey. This is...|suction feeding|🐟||ram feeding,fluid feeding",
    "A basking shark swims with its mouth open to collect plankton. This is...|ram feeding|🦈||raptorial feeding,deposit feeding",
    "Earthworms eat soil for the organic bits in it. This is...|deposit feeding|🪱||filter feeding,raptorial feeding",
    "Butterflies sip nectar. This is...|fluid feeding|🦋||deposit feeding,suction feeding",
    "A praying mantis seizes insects with spiny forelegs. This is...|raptorial feeding|🦗||filter feeding,fluid feeding",
    "Clams pull water over their gills and trap particles. This is...|filter feeding|🐚||raptorial feeding,suction feeding",
    "Suction feeding works because opening the mouth wide ... the pressure inside|lowers|🐠||raises,keeps constant"
  ], "Ask how the animal gets its food: grab, strain, suck, sip or swallow soil."));
  a.push(L("Hormone axes and feedback", [
    "A chain of command|🔗|Many hormones work in an axis: the <b>hypothalamus</b> signals the <b>pituitary</b>, which signals a gland. In the thyroid axis the pituitary releases <b>TSH</b>. In the stress axis it releases <b>ACTH</b>, which makes the adrenal cortex release <b>cortisol</b>.",
    "Negative feedback|🔁|The final hormone turns down the first steps in the chain. High thyroid hormone lowers TSH release, so levels stay steady.",
    "When feedback is lost|⚠️|If the thyroid is removed, thyroid hormone drops, feedback is lost, and TSH rises. The adrenal medulla is different: it releases <b>adrenaline</b> for fast fight-or-flight responses."
  ], [
    "In the thyroid axis, the pituitary releases...|TSH|🦋||ACTH,insulin",
    "In the stress axis, the pituitary hormone that acts on the adrenal cortex is...|ACTH|🧠||TSH,adrenaline",
    "The adrenal cortex releases...|cortisol|🫘||adrenaline,insulin",
    "The adrenal medulla releases...|adrenaline|⚡||cortisol,TSH",
    "High thyroid hormone ... TSH release|reduces|🔁||boosts,has no effect on",
    "Negative feedback means the final hormone ... the first steps|turns down|🔁||turns up,ignores",
    "If the thyroid is removed, TSH levels will...|rise|📈||fall,stay at zero",
    "Fast fight-or-flight responses depend mainly on...|adrenaline|🏃||cortisol,thyroid hormone"
  ], "Follow the chain: brain, pituitary, gland, then the feedback loop."));
  a.push(L("Steroid and peptide hormones", [
    "Two chemical families|🧪|<b>Steroid hormones</b> (estrogen, testosterone, cortisol) are made from cholesterol and dissolve in fat. <b>Peptide hormones</b> (insulin, growth hormone) are chains of amino acids and dissolve in water.",
    "How they act|🔑|Steroids slip through the cell membrane, bind receptors <b>inside</b> the cell, and change <b>gene expression</b>. Peptides cannot cross the membrane, so they bind receptors on the <b>cell surface</b>.",
    "Speed|⏱️|Peptide signals use second messengers such as <b>cAMP</b> and act quickly. Steroid effects usually start more slowly but last longer."
  ], [
    "Estrogen, testosterone and cortisol are...|steroid hormones|🧪||peptide hormones,gases",
    "Insulin is a...|peptide hormone|💉||steroid hormone,fat",
    "Steroid hormone receptors are located...|inside the cell|🔑||on the cell surface,outside the body",
    "Peptide hormone receptors are located...|on the cell surface|🔑||in the nucleus,in the blood only",
    "Peptide hormones need surface receptors because they are...|water-soluble|💧||fat-soluble,tiny gases",
    "Steroids act mainly by changing...|gene expression|🧬||the body's color,bone density directly",
    "Which hormone type usually acts faster?|peptide hormones|⏱️||steroid hormones,neither",
    "A common second messenger is...|cAMP|📡||cholesterol,urea"
  ], "Fat-soluble and water-soluble messages enter cells differently."));
  a.push(L("Placentas and live birth", [
    "Three ways to be born|🥚|<b>Oviparous</b> animals lay eggs (most birds, the platypus). <b>Ovoviviparous</b> animals keep eggs inside until they hatch, with yolk as food. <b>Viviparous</b> animals nourish the embryo directly, often through a <b>placenta</b>.",
    "The placenta|🤰|In placental mammals the placenta lets nutrients, oxygen and wastes pass between mother and fetus without their blood mixing.",
    "Other strategies|🦘|Marsupials have a short pregnancy; the tiny newborn finishes growing in the pouch. In seahorses the <b>male</b> carries the eggs in a brood pouch."
  ], [
    "A platypus is...|oviparous|🦆||viviparous,ovoviviparous",
    "Most birds are...|oviparous|🐦||viviparous,ovoviviparous",
    "Eggs that hatch inside the mother, fed by yolk, show...|ovoviviparity|🥚||oviparity,viviparity",
    "An embryo fed directly through a placenta shows...|viviparity|🤰||oviparity,ovoviviparity",
    "The placenta exchanges materials between...|mother and fetus|🤰||two eggs,mother and father",
    "A newborn marsupial finishes growing in the...|pouch|🦘||placenta,shell",
    "In seahorses, the brood pouch is carried by the...|male|🌊||female,juvenile",
    "In egg-laying animals, the food store inside the egg is the...|yolk|🍳||placenta,amnion"
  ], "Where does the baby get its food: yolk, a placenta, or a pouch?"));
  a.push(L("Delayed implantation", [
    "Pausing pregnancy|⏸️|In <b>delayed implantation</b> (embryonic diapause) the embryo stays a tiny ball of cells, the <b>blastocyst</b>, and does not attach to the uterus for weeks or months.",
    "Timing|📅|It separates the time of mating from the time of birth. Roe deer mate in summer, the embryo implants in winter, and fawns are born in spring.",
    "Examples|🐻|Bears delay implantation until autumn. A mother in poor condition may not implant the embryo. A kangaroo can pause a new embryo while a joey is still nursing."
  ], [
    "In embryonic diapause the embryo...|pauses development|⏸️||doubles in size,hatches early",
    "During diapause the embryo stays a tiny ball of cells called a...|blastocyst|🔵||gastrula,fetus",
    "Delayed implantation lets birth be timed for...|a good season|🌸||the wrong season,any random day",
    "Roe deer mate in summer but their embryos implant in...|winter|🦌||spring,the same week",
    "A bear in poor condition may...|not implant the embryo|🐻||implant twice,give birth early",
    "A kangaroo can pause a new embryo while a joey is...|nursing|🦘||flying,hibernating",
    "Delayed implantation separates mating from...|birth|📅||weaning,migration",
    "Implantation means the embryo attaches to the...|uterus|🤰||pouch,egg shell"
  ], "The pause is about timing, not about growth being fast."));
  a.push(L("Sleep in animals", [
    "One half asleep|🐬|Dolphins and some other animals show <b>unihemispheric sleep</b>: one brain hemisphere sleeps while the other stays awake, so they can surface to breathe and watch for danger.",
    "More examples|🦆|Ducks at the edge of a group keep one eye open. Fur seals sleep with one hemisphere in the sea but with both on land. Frigatebirds nap briefly while flying.",
    "Sleep stages|😴|Mammals and birds both have <b>REM sleep</b>, a stage with fast eye movements. Sleep time varies hugely: elephants sleep about 2 hours a day in the wild, while little brown bats sleep about 19."
  ], [
    "Dolphins sleep using...|one brain half at a time|🐬||both halves deeply,no sleep at all",
    "Unihemispheric sleep helps dolphins...|surface to breathe|🌊||hunt in sleep,change color",
    "Ducks at the edge of a group sleep with...|one eye open|🦆||both eyes closed,their head under water",
    "Fur seals sleep with both hemispheres when they are...|on land|🦭||in the sea,flying",
    "Frigatebirds can sleep briefly while...|flying|🐦||swimming,hibernating",
    "REM sleep has been found in mammals and...|birds|🐦||insects only,sponges",
    "A sleep stage with fast eye movements is...|REM sleep|👁️||slow-wave only,hibernation",
    "Little brown bats sleep about ... hours a day|19|🦇||2,8"
  ], "Which brain half is asleep, and why must the other stay on guard?"));
  a.push(BOTH("Hearing and locating sound", [
    "Where is it?|👂|Animals locate sound with the <b>interaural time difference</b> (the sound reaches one ear first) and the <b>interaural level difference</b> (it is louder in one ear).",
    "Special ears|🦉|A barn owl's ears are at different heights, which helps it pinpoint up-and-down position. Crickets hear with ears on their <b>front legs</b>. Fish detect sound with ear stones called <b>otoliths</b>.",
    "Inside the ear|🔊|In mammals, <b>hair cells</b> in the cochlea turn vibrations into nerve signals. Bats use echo delay: a longer delay means a target that is farther away."
  ], [
    "A sound reaching one ear first gives the...|interaural time difference|👂||interaural level difference,otolith signal",
    "A sound louder in one ear gives the...|interaural level difference|🔊||interaural time difference,echo delay",
    "Barn owls have ears at different heights to judge a sound's...|up and down position|🦉||color,temperature",
    "Hair cells in the cochlea turn vibrations into...|nerve signals|🧠||light,heat",
    "A head's sound shadow works best for ... sounds|high-pitched|🔔||very low,silent",
    "A longer echo delay in a bat means a target that is...|farther away|🦇||closer,smaller",
    "Crickets hear with ears on their...|front legs|🦗||antennae,wings",
    "Fish detect sound with ear stones called...|otoliths|🐟||cochleas,hair brushes"
  ], "Think about timing, loudness, and where the ears sit.", "", echo, 0.35));
  a.push(L("Smell and taste receptors", [
    "Receptors|👃|Smell begins when odor molecules bind to <b>receptor proteins</b> on olfactory neurons. Mice have many more olfactory receptor genes than humans.",
    "Special organs|🐴|The <b>vomeronasal organ</b> detects pheromones. Cats and horses show <b>flehmen</b>, curling the lip to bring chemicals to it. Snakes flick their tongues to collect scent particles.",
    "Odd places|🪰|Insects smell mostly with their <b>antennae</b>. Houseflies taste with sensors on their feet, and catfish have taste buds across their skin."
  ], [
    "Smell begins when receptor proteins bind...|odor molecules|👃||sound waves,light",
    "Compared with humans, mice have ... olfactory receptor genes|many more|🐭||far fewer,exactly the same number of",
    "The organ that detects pheromones is the...|vomeronasal organ|👃||cochlea,pineal gland",
    "A horse curling its lip (flehmen) helps move chemicals to the...|vomeronasal organ|🐴||eardrum,tooth",
    "Houseflies taste with sensors on their...|feet|🪰||wings,eyes",
    "A snake flicks its tongue to...|collect scent particles|🐍||cool its tongue,make sound",
    "Catfish have taste buds all over their...|body|🐟||fins only,bones",
    "Insects smell mostly with their...|antennae|🦗||legs,wings"
  ], "Where do chemical messages meet receptors?"));
  a.push(L("Signals fit the habitat", [
    "Sensory drive|📡|Signals evolve to be easy to detect in the place where the animal lives. This idea is called <b>sensory drive</b>.",
    "Examples|🌲|In dense forest, low-pitched songs travel farther because leaves scatter high pitches more. In deep water, blue-green light travels best, so many deep-sea fish make blue-green light.",
    "Old preferences|🐠|A receiver may already be biased to like something. Female guppies are attracted to orange, perhaps because they eat orange fruit, and males with orange spots gain from it."
  ], [
    "Signals that evolve to suit the habitat's conditions show...|sensory drive|📡||sexual drive,random drift",
    "In dense forest, which sounds often travel farther?|low-pitched|🌲||very high-pitched,only ultrasound",
    "Deep-sea bioluminescence is often...|blue-green|🌊||red,yellow",
    "A signal that is easy to detect against background noise has high...|signal-to-noise ratio|📶||body mass,fitness cost",
    "Firefly species differ in flash patterns, which helps with...|species recognition|✨||digestion,hibernation",
    "Female guppies' attraction to orange may come from a bias for...|orange fruit|🍊||blue water,dark rocks",
    "Leaves scatter ... sounds more than low ones|high-pitched|🍃||low-pitched,all equally",
    "A preference that existed before a signal evolved is a...|sensory bias|🧠||learned habit,mutation"
  ], "Ask what the environment lets through best."));
  a.push(L("Alarm calls and meaning", [
    "Calls with meaning|🐒|Vervet monkeys give different alarm calls for a leopard, an eagle and a snake. Hearers respond differently: climb trees for a leopard, look up or hide in bushes for an eagle, and stand and scan the ground for a snake.",
    "Danger levels|🐦|Chickadees add more \"dee\" notes to their call when a predator is small and dangerous. Meerkats take turns as <b>sentinels</b> watching for danger.",
    "Syntax|🔤|Japanese tits combine different calls in a set order, and other tits respond to the order. This suggests simple rule-based structure in animal calls."
  ], [
    "Vervet monkeys have different alarm calls for...|different predators|🐒||different weather,different foods",
    "Hearing the vervet leopard alarm, monkeys usually...|climb into trees|🌳||look up at the sky,freeze on the ground",
    "Hearing the vervet eagle alarm, monkeys usually...|look up or hide in bushes|🦅||climb to the tips of thin branches,run onto open ground",
    "Chickadees add more \"dee\" notes for a predator that is...|small and dangerous|🐦||large and slow,absent",
    "Meerkats that watch for danger from a high spot are...|sentinels|🦡||foragers,pups",
    "Japanese tits combining calls in a set order suggests simple...|syntax|🔤||mimicry,migration",
    "Alarm calls that carry information about the type of danger are...|referential|📢||random,silent",
    "Calling out can help relatives because it...|warns them|📢||hides the caller,feeds them"
  ], "Look for what each call tells the listener to do."));
  a.push(BOTH("Ideal free distribution", [
    "Choosing patches|🦆|When food patches differ, each animal tries to get the best intake. As a patch fills up, each animal's share falls.",
    "The ideal free distribution|⚖️|If animals are <b>free</b> to move at no cost and have <b>ideal</b> knowledge, they spread out until every animal gets about the same intake. So animal numbers match food supply.",
    "Real life|🏁|When strong animals take the best spots and shut others out, the pattern is an ideal <b>despotic</b> distribution."
  ], [
    "At an ideal free distribution, each animal gets about the ... intake|same|🦆||largest,smallest",
    "Animals spread so numbers match...|food supply|🍞||body color,nest height",
    "As more animals crowd a patch, each one's share...|falls|📉||rises,stays infinite",
    "\"Free\" in ideal free means animals can...|move to any patch at no cost|🆓||only stay put,only fight",
    "A patch with 3 times the food should hold about ... times the animals|3|🍞||1,9",
    "When strong animals keep others out of good patches, the pattern is...|ideal despotic|👑||ideal free,random",
    "If the best patch fills up, newcomers do better by going to...|a less crowded patch|🔄||the most crowded patch,no patch",
    "The ideal free model assumes animals have ... knowledge of patches|ideal|🧠||no,random"
  ], "Equal shares per animal means more animals where there is more food.", "", ifd, 0.4));
  a.push(L("The landscape of fear", [
    "Fear changes behavior|😨|Predators affect prey even without killing them. Prey that sense high risk spend more time scanning, feed in safer covered places, and avoid risky areas.",
    "Costs of caution|⚖️|Time spent being <b>vigilant</b> is time not feeding. A \"landscape of fear\" maps where prey feel most at risk. Hungry animals in poor condition accept more danger.",
    "Ripples|🌿|These <b>non-consumptive effects</b> can lower prey reproduction and, because prey eat less in risky places, protect plants there."
  ], [
    "Predators changing prey behavior without killing is a ... effect|non-consumptive|😨||consumptive,mineral",
    "A \"landscape of fear\" maps where prey feel...|most at risk|🗺️||most hungry,most social",
    "Time spent scanning for predators means less time...|feeding|👀||sleeping,migrating",
    "Prey that sense high risk often feed in...|safer covered places|🌿||open exposed places,the middle of the road",
    "Hungry animals in poor condition tend to accept ... risk|more|🍽️||less,exactly zero",
    "Because prey eat less in risky places, plants there may...|be protected|🌱||be eaten more,vanish at once",
    "Fear of predators can lower prey...|reproduction|🐣||body temperature,hair color",
    "Being watchful for danger is called...|vigilance|👁️||dispersal,torpor"
  ], "Think about the trade-off between eating and staying safe."));
  a.push(L("Animal personality", [
    "Consistent differences|🐦|<b>Animal personality</b> means individuals differ in behavior in ways that stay stable over time and across situations, such as boldness, aggression, activity and exploration.",
    "Syndromes|🔗|Traits often come as a package, called a <b>behavioral syndrome</b>: bold individuals may also be more aggressive. In great tits, fast explorers and slow explorers both exist.",
    "Why variety stays|⚖️|Personality is partly heritable. Different personalities can win in different conditions, so selection that fluctuates keeps both types in the population."
  ], [
    "Behavior differences that are stable over time within individuals are...|animal personality|🐦||short-term moods,random noise",
    "A set of linked behaviors, such as bold and aggressive together, is a...|behavioral syndrome|🔗||food web,karyotype",
    "In great tits, individuals differ in how they...|explore new places|🌳||see color,digest seeds",
    "Personality is partly...|heritable|🧬||learned never,random every day",
    "Boldness describes how an animal responds to...|risk or new things|⚠️||the moon,its own shadow only",
    "Two personality types can both persist if selection...|fluctuates|📈||never changes,hits all equally",
    "Personality is shown by differences between...|individuals|👥||species only,continents only",
    "Behavior that stays consistent across situations is called...|consistent|🔁||plastic,random"
  ], "Look for differences between individuals that last."));
  a.push(L("Dispersal and inbreeding", [
    "Leaving home|🚶|<b>Natal dispersal</b> is moving away from the place of birth. Animals that stay near home are <b>philopatric</b>.",
    "Who leaves?|🦁|In most mammals males disperse more; in most birds females disperse more. Dispersal helps avoid <b>inbreeding</b>, reduces competition with relatives, and finds new habitat.",
    "Costs|⚠️|Moving risks predators, starvation and unfamiliar ground. Animals balance these costs against the benefits, and some recognize kin to avoid mating with them."
  ], [
    "Moving away from the birthplace is called...|natal dispersal|🚶||philopatry,hibernation",
    "Animals that stay near their birthplace are...|philopatric|🏠||dispersive,nomadic",
    "In most mammals, the sex that disperses more is...|male|🦁||female,neither",
    "In most birds, the sex that disperses more is...|female|🐦||male,neither",
    "Dispersal helps avoid mating with relatives, called...|inbreeding|🧬||outbreeding,cloning",
    "A cost of dispersal is...|risk in unfamiliar areas|⚠️||finding too many mates,faster growth",
    "Dispersal can reduce competition with...|relatives|👪||predators,the weather",
    "Recognizing kin helps animals avoid...|mating with relatives|👪||finding food,migrating"
  ], "Who leaves home, and what do they gain?"));
  a.push(MIX("Mixed practice", a.slice(0, 18)));
  a.push(MIX("Level 28 Challenge", a.slice(0, 18).reverse()));

  // ---------- LEVEL 29 ----------
  b.push(BOTH("Selection coefficient", [
    "Relative fitness|📊|<b>Relative fitness (w)</b> compares a genotype's reproductive success with the best genotype, which has w = 1. For example, w = 0.8 means 80% as many offspring.",
    "The coefficient s|🧮|The <b>selection coefficient</b> is s = 1 - w. It measures how strongly selection acts against a genotype. If s = 0, the genotype is neutral. If s = 1, it leaves no offspring.",
    "Strength|💪|Larger s means faster change in allele frequency. An allele with a small s can still spread or vanish over many generations, especially in big populations."
  ], [
    "The best genotype has a relative fitness of...|1|🏆||0|2",
    "The selection coefficient s equals...|1 minus w|🧮||w plus 1|w times 2",
    "A genotype with w = 0.7 has s =...|0.3|📉||0.7|1.7",
    "A genotype with s = 0.05 has w =...|0.95|📈||0.05|1.05",
    "If s = 0, the genotype is...|neutral|⚖️||lethal|the best by far",
    "An allele lethal in homozygotes has s =...|1|☠️||0|0.5",
    "Stronger selection against a genotype means s is...|closer to 1|📊||closer to 0|negative",
    "A genotype with s = 0.25 leaves ... percent as many offspring as the best|75|📉||25|125"
  ], "Remember: s is the cost, w is what is left.", "", selc, 0.45));
  b.push(L("Gene flow", [
    "Moving genes|🦌|<b>Gene flow</b> is the movement of alleles between populations when individuals migrate and breed. It makes populations more alike.",
    "Two effects|⚖️|Gene flow can bring in useful new alleles, but it can also <b>swamp local adaptation</b> when many poorly adapted migrants arrive. Drift and selection pull populations apart, while gene flow pulls them together.",
    "A rule of thumb|1️⃣|Population differentiation is measured by <b>Fst</b>, from 0 (identical) to 1 (completely different). About one migrant per generation is often enough to stop drift from making populations strongly different."
  ], [
    "Gene flow is the movement of ... between populations|alleles|🧬||habitats,mountains",
    "Gene flow tends to make populations...|more alike|🤝||more different,extinct",
    "Too many poorly adapted migrants can ... local adaptation|swamp|🌊||improve,copy",
    "Fst measures population...|differentiation|📏||mutation rate,body size",
    "An Fst near 0 means populations are...|nearly identical|🟰||completely different,extinct",
    "An Fst near 1 means populations are...|completely different|↔️||nearly identical,hybrids",
    "Genetic drift tends to make populations...|diverge|↔️||merge,disappear",
    "About how many migrants per generation can stop strong drift differences?|one|1️⃣||a thousand,none"
  ], "Does moving genes together pull populations alike or apart?"));
  b.push(L("Genetic incompatibilities", [
    "A hidden problem|🧩|In the <b>Dobzhansky-Muller model</b>, two populations each evolve a new allele at a different gene. Each new allele works fine in its own population.",
    "Hybrids|⚠️|When the populations interbreed, the two new alleles meet for the first time in hybrids. They may not work together, causing sterile or weak hybrids.",
    "Why it matters|🔬|No individual ever has to be unfit during the process, so isolation can build up gradually. These are called <b>hybrid incompatibilities</b> and help explain how species stay distinct."
  ], [
    "The Dobzhansky-Muller model explains how hybrids can be...|incompatible|🧩||immortal,identical",
    "In this model, the two new alleles first meet in...|hybrids|👶||parents,fossils",
    "Each new allele works well in...|its own population|🧬||no population,all populations",
    "How many genes are involved in the simplest model?|two|2️⃣||one,a million",
    "Isolation can build up...|gradually|🐢||instantly,never",
    "A problem in hybrids can be sterility or...|weakness|⚠️||extra fitness,immortality",
    "Hybrid incompatibilities help keep species...|distinct|🔬||identical,extinct",
    "No individual in the process has to be...|unfit|✅||healthy,born"
  ], "Each change alone is fine. What about together?"));
  b.push(L("The Red Queen", [
    "Running to stay still|👑|The <b>Red Queen hypothesis</b> says species must keep evolving just to keep up with enemies that are also evolving. The name comes from a story in which a queen has to run as fast as she can to stay in the same place.",
    "Hosts and parasites|🦠|Parasites adapt to common host genotypes, so rare host genotypes gain an advantage. This keeps variation in host populations.",
    "Why sex?|🔀|Sexual reproduction mixes genes into new combinations. In New Zealand mud snails, sexual snails are more common where parasites are common, supporting the idea."
  ], [
    "The Red Queen hypothesis says species must keep evolving to...|keep up with enemies|👑||grow bigger,stop changing",
    "Parasites adapt to ... host genotypes|common|🦠||rare,extinct",
    "Rare host genotypes often gain an...|advantage|🥇||disadvantage,exact copy",
    "The Red Queen idea helps explain why...|sex is common|🔀||all animals clone,no parasites exist",
    "In mud snails, sexual snails are more common where ... are common|parasites|🐌||rocks,fish",
    "The idea comes from a story in which running keeps you...|in the same place|🏃||far ahead,asleep",
    "Constant coevolution means no side ever...|wins for good|♾️||fights,eats",
    "Sexual reproduction mixes genes into...|new combinations|🧬||identical copies,clones"
  ], "Think of an endless arms race."));
  b.push(L("Adaptation and exaptation", [
    "Old traits, new jobs|🪶|An <b>exaptation</b> is a trait that evolved for one use and was later used for another. Feathers likely first helped with insulation or display, and later helped flight.",
    "Adaptation|✅|An <b>adaptation</b> is a trait shaped by natural selection for its current function. Telling them apart needs evidence about history, not just present use.",
    "Spandrels|🏛️|Not every trait is an adaptation. Some are by-products of other changes. Careful scientists test whether a trait truly improves fitness before calling it an adaptation."
  ], [
    "A trait used for a new purpose after evolving for another is an...|exaptation|🔁||adaptation|fossil",
    "A trait shaped by selection for its current job is an...|adaptation|✅||exaptation|extinction",
    "Feathers likely first evolved for...|insulation or display|🪶||jet propulsion|eating fish",
    "Bird flight feathers show how a trait can be...|co-opted|🪶||deleted|frozen",
    "A trait that is a by-product of other changes is not necessarily...|an adaptation|🏛️||a fossil|a gene",
    "To prove adaptation, scientists need evidence about the trait's...|history and fitness benefit|🔬||color alone|name",
    "A trait's present use alone tells us its...|current function only|⏱️||entire history|DNA",
    "An exaptation shows that evolution is...|opportunistic|🧰||planned ahead|impossible"
  ], "Ask: what was it first used for, and what is it used for now?"));
  b.push(L("Phylogeography", [
    "Genes on a map|🗺️|<b>Phylogeography</b> studies how gene lineages are spread across geography. It often uses mitochondrial DNA to trace where lineages lived and moved.",
    "Ice ages|❄️|During the glaciations many species survived in ice-free <b>refugia</b>. When ice retreated, populations spread out, leaving a pattern of genetic diversity that scientists can read.",
    "Reading the pattern|🔍|Places with high genetic diversity may be old refugia. Places with low diversity may have been colonized recently by a few individuals."
  ], [
    "Phylogeography studies how gene lineages are spread across...|geography|🗺️||time only,diets",
    "Many species survived ice ages in ice-free...|refugia|❄️||tundra|deserts",
    "Places with high genetic diversity may be old...|refugia|🏔️||colonies|dumps",
    "Places with low diversity may have been colonized by...|a few individuals|📉||millions of animals|a single gene",
    "Scientists often trace lineages using ... DNA|mitochondrial|🧬||fossil bone|plant",
    "After the ice retreated, populations...|spread out|↗️||went extinct|froze",
    "A glaciation is a period with extensive...|ice cover|🧊||heat|rain",
    "Patterns of genetic diversity reveal a species'...|history|📜||future only|age in days"
  ], "Use gene patterns as a trail on a map."));
  b.push(L("Parent-offspring conflict", [
    "Who wants what?|🐣|Robert Trivers proposed <b>parent-offspring conflict</b>: offspring want more care than the parent is selected to give, because the parent also invests in future young.",
    "Relatedness|👪|A mother is equally related (r = 0.5) to all her young. A young animal is related to itself by 1, and to a full sibling by 0.5, so it values itself more.",
    "Weaning|🍼|Conflict shows up as begging and as fights over weaning time. Parents stop care sooner than offspring would like, so parents save energy for the next litter."
  ], [
    "Parent-offspring conflict was proposed by...|Trivers|🧠||Darwin|Mendel",
    "Offspring want ... care than parents are selected to give|more|🍼||less|the same",
    "A parent also invests in...|future young|🐣||past young only|rocks",
    "A young animal is related to itself by...|1|👶||0.5|0",
    "A full sibling is related to a young animal by...|0.5|👪||1|0",
    "Conflict often shows as begging and fights over...|weaning time|🍼||nest color|song",
    "Parents stop care sooner to save energy for...|the next litter|⏭️||old age|migration",
    "A mother is equally related to all her...|offspring|👪||mates|rivals"
  ], "Parents and young share genes, but not exactly the same interests."));
  b.push(L("Phenotypic plasticity", [
    "One genotype, many forms|🔄|<b>Phenotypic plasticity</b> is when one genotype produces different phenotypes in different environments. The pattern is called a <b>reaction norm</b>.",
    "Examples|🦐|Daphnia (water fleas) grow defensive helmets when they sense chemicals from predators. Spadefoot tadpoles can develop into a carnivorous form in crowded, shrinking ponds.",
    "Cost and benefit|⚖️|Plasticity is useful when the environment changes, but it has costs, such as the energy needed to sense and respond. Plasticity can also affect how evolution proceeds."
  ], [
    "One genotype producing different phenotypes in different environments is...|phenotypic plasticity|🔄||mutation|speciation",
    "A graph of phenotype across environments is a...|reaction norm|📈||food web|phylogeny",
    "Daphnia grow helmets when they sense...|predator chemicals|🦐||sunshine|new moons",
    "Spadefoot tadpoles can become...|carnivores|🐸||plants|rocks",
    "Plasticity helps most when the environment...|changes|🌡️||never changes|is unknown to all",
    "A cost of plasticity is the energy to...|sense and respond|⚡||sleep|eat only seeds",
    "Plasticity means genes...|do not fix one outcome|🧬||are missing|are all lost",
    "A plastic trait can differ without any change in the...|genotype|🧬||environment|water"
  ], "Same genes, different results."));
  b.push(L("Bet-hedging", [
    "Risky environments|🎲|When the environment is unpredictable, evolution may favor <b>bet-hedging</b>: reducing the variation in success across years, even if the average gets lower.",
    "Examples|🥚|Some eggs or seeds wait extra seasons before hatching, forming a <b>seed bank</b> or egg bank. Some annual killifish embryos can pause development through dry spells.",
    "Geometric mean|🧮|Long-run growth depends on the <b>geometric mean</b>, which is pulled down by bad years. A strategy that avoids terrible years can win even if good years are less good."
  ], [
    "Bet-hedging reduces variation in success...|between years|📅||within a single day|in size",
    "Bet-hedging is favored when the environment is...|unpredictable|🎲||perfectly stable|empty",
    "Seeds or eggs that wait extra seasons form a...|bank|🌱||net|nest",
    "Bet-hedging may lower the ... success a little|average|📉||worst|rank",
    "Long-run growth depends on the ... mean|geometric|🧮||arithmetic|zero",
    "A strategy that avoids terrible years can win even if good years are...|less good|⚖️||perfect|identical",
    "Some killifish embryos pause development through...|dry spells|🏜️||shopping|snowflakes",
    "Spreading risk across offspring types is like not putting all eggs in...|one basket|🧺||the nest|water"
  ], "Safer on average over many years beats lucky some years."));
  b.push(L("The extinction vortex", [
    "A downward spiral|🌀|The <b>extinction vortex</b> describes feedback loops that drive small populations toward extinction. Each problem makes the population smaller, which worsens the problems.",
    "The loops|🔁|Small size causes inbreeding and loss of diversity. It also increases <b>demographic stochasticity</b> (random births and deaths) and can trigger the <b>Allee effect</b>, where fewer individuals mean lower success.",
    "Escape|🛟|Preventing the vortex means acting early: adding unrelated individuals, restoring habitat, and removing threats before the population is too small."
  ], [
    "The extinction vortex is a set of ... that shrink small populations|feedback loops|🌀||food chains|migrations",
    "As a population shrinks, inbreeding usually...|rises|📈||falls|vanishes",
    "Random births and deaths matter most in...|small populations|🔢||huge populations|empty places",
    "Random variation in births and deaths is...|demographic stochasticity|🎲||natural selection|mutation",
    "Lower success at low numbers is the...|Allee effect|📉||Wallace line|Hardy effect",
    "The best time to act against the vortex is...|early|⏰||after extinction|never",
    "Adding unrelated individuals can help by restoring...|genetic diversity|🧬||the moon|salt",
    "Each problem in the vortex makes the population...|smaller|⬇️||larger|immortal"
  ], "Each problem feeds the next one."));
  b.push(BOTH("Population viability analysis", [
    "What is PVA?|🧮|<b>Population viability analysis</b> uses models of births, deaths, inbreeding, and random events to estimate the chance a population will go extinct within a time such as 100 years.",
    "Thresholds|🚧|Many studies use a <b>quasi-extinction threshold</b>, a small number of animals that is treated as being as good as gone. Catastrophes such as fires or disease are included.",
    "Uses|🧰|PVA compares management options, such as protecting adults, adding habitat, or releasing animals, and helps set priorities. Models are only as good as their data."
  ], [
    "PVA estimates the chance of...|extinction|🧮||migration|mutation",
    "A quasi-extinction threshold is a ... treated as nearly gone|small number|🚧||large number|color",
    "Catastrophes in PVA can include fires or...|disease|🔥||sunshine|rain only",
    "PVA helps compare ... options|management|🧰||musical|shopping",
    "PVA models include births, deaths and...|random events|🎲||money|clouds",
    "A PVA is only as good as its...|data|📊||title|font",
    "The time frame in PVA is often...|100 years|⏳||a week|a minute",
    "PVA results help set conservation...|priorities|📋||recipes|passwords"
  ], "It is a forecast of survival chances.", "", pva, 0.4));
  b.push(L("Translocation and reintroduction", [
    "Moving animals back|🚚|A <b>translocation</b> moves animals from one place to another. A <b>reintroduction</b> returns a species to a place it once lived. Examples are wolves in Yellowstone in 1995 and Arabian oryx in Oman.",
    "Success needs|✅|Good habitat, removal of the original threat, enough founders, and monitoring. A <b>soft release</b> gives animals shelter and food at first to help them settle.",
    "Risks|⚠️|Moving animals can spread disease, can fail if the original threat remains, and may harm other species. Plans use guidelines from the IUCN."
  ], [
    "Returning a species to a place it once lived is a...|reintroduction|🐺||quarantine|hunt",
    "Moving animals from one place to another is a...|translocation|🚚||adaptation|fossilization",
    "A good first step before reintroduction is to remove the...|original threat|🛑||habitat|species",
    "A soft release gives animals early...|shelter and food|🏠||weapons|loud music",
    "Wolves were reintroduced to Yellowstone in...|1995|🐺||1795|2095",
    "Moving animals can spread...|disease|🦠||sunshine|gravity",
    "Success depends on good habitat and enough...|founders|👥||money only|photos",
    "Plans follow guidelines from the...|IUCN|📘||FIFA|NASA"
  ], "A move only works if the home is safe again."));
  b.push(L("Umbrella, flagship and indicator species", [
    "Umbrella|☂️|An <b>umbrella species</b> needs so much habitat that protecting it also protects many other species. The northern spotted owl and tigers are examples.",
    "Flagship|🐼|A <b>flagship species</b> is popular and charming, so it helps raise public support and money. The giant panda is a classic flagship.",
    "Indicator|🌡️|An <b>indicator species</b> shows the health of an environment. Amphibians and some stream insects react quickly to pollution. These roles can overlap."
  ], [
    "A species whose protection shelters many others is an...|umbrella species|☂️||indicator species,keystone species",
    "A popular species that attracts public support is a...|flagship species|🐼||umbrella species,pest species",
    "A species that shows environmental health is an...|indicator species|🌡️||flagship species,umbrella species",
    "A giant panda is a classic...|flagship species|🐼||indicator species,pest species",
    "Tigers need huge areas, so they act as an...|umbrella species|🐅||indicator species,invasive species",
    "Amphibians react quickly to pollution, so they are used as...|indicators|🐸||flags,umbrellas",
    "An umbrella species protects others by saving large amounts of...|habitat|🌳||money,time",
    "Roles like these can sometimes...|overlap|⭕||never mix,be skipped"
  ], "Is it about habitat, popularity, or health signals?"));
  b.push(L("Managing wildlife disease", [
    "Wildlife diseases|🦠|Chytrid fungus has caused amphibian declines worldwide. White-nose syndrome, caused by a fungus, has killed millions of hibernating bats in North America.",
    "Management tools|🛡️|Surveillance finds disease early. Quarantine limits spread. <b>Oral vaccine baits</b> have helped control rabies in foxes and raccoons. Cleaning gear stops people from spreading spores.",
    "Hard choices|⚖️|Culling can reduce some diseases but is often disputed. Managers weigh effectiveness, ethics, cost and the chance of success."
  ], [
    "Chytrid fungus has caused declines of...|amphibians|🐸||birds|insects",
    "White-nose syndrome affects...|bats|🦇||bees|owls",
    "Finding disease early is called...|surveillance|🔎||quarantine|culling",
    "Limiting spread by keeping animals apart is...|quarantine|🚧||vaccination|baiting",
    "Oral vaccine baits have helped control...|rabies|💉||flooding|drought",
    "Cleaning boots and gear helps stop spreading...|spores|🥾||clouds|seeds of grass",
    "Culling to control disease is often...|debated|⚖️||always illegal|always required",
    "Managers weigh effectiveness, cost, and...|ethics|⚖️||fashion|weather"
  ], "Detect, contain, protect, and weigh the choices."));
  b.push(L("Additive and compensatory mortality", [
    "Two ways to lose animals|🦆|<b>Additive mortality</b> adds to deaths from other causes. <b>Compensatory mortality</b> replaces deaths that would have happened anyway.",
    "Why it matters|⚖️|If hunting deaths are compensatory, a harvest may not reduce the population because fewer animals would die from starvation or disease later. If they are additive, the population falls.",
    "Density dependence|📈|Compensation works best when the population is near its carrying capacity and resources are limited. Past a point, harvest becomes additive."
  ], [
    "Deaths that replace other deaths are...|compensatory|♻️||additive|natural births",
    "Deaths that add to other deaths are...|additive|➕||compensatory|neutral",
    "If a harvest is compensatory, the population may...|not decline|🦆||collapse at once,double",
    "If a harvest is additive, the population will...|decline|📉||increase|stay hidden",
    "Compensation works best near...|carrying capacity|🏞️||zero|infinity",
    "Beyond a certain harvest, mortality becomes...|additive|➕||compensatory|beneficial",
    "A harvest can be compensatory because fewer animals would...|die later from other causes|⏳||ever be born|ever migrate",
    "Managers need to know which type applies to set...|harvest limits|📋||song lengths|fur colors"
  ], "Would these animals have died anyway?"));
  b.push(L("Adaptive management", [
    "Learning by doing|🔄|<b>Adaptive management</b> treats management as an experiment: set goals, take action, monitor results, evaluate, and adjust. It admits that we don't know everything.",
    "Cycle|♻️|The steps repeat: plan, act, monitor, evaluate, adjust. Managers may try different actions in different places to learn which works best.",
    "Why use it?|💡|Ecosystems are complex and change over time. Adaptive management lets decisions improve as new data arrive and avoids repeating mistakes."
  ], [
    "Adaptive management treats management like an...|experiment|🔬||recipe,parade",
    "After taking action, managers must...|monitor results|📊||stop watching,hide data",
    "A step in the adaptive cycle is to...|adjust|🔧||ignore|hide",
    "Adaptive management admits that managers don't know...|everything|❓||anything|their goals",
    "Trying different actions in different places helps managers learn which...|works best|✅||costs most,looks nicest",
    "The adaptive management steps...|repeat|♻️||stop after one|are random",
    "Why use adaptive management? Ecosystems are...|complex and changing|🌍||simple and fixed,imaginary",
    "New data lets decisions...|improve|📈||freeze,vanish"
  ], "Plan, act, watch, learn, then repeat."));
  b.push(BOTH("Quadrats and transects", [
    "Sampling small areas|🟩|A <b>quadrat</b> is a square frame used to count animals or plants in a small area. A <b>transect</b> is a line along which you sample at set points.",
    "Density|🧮|<b>Density</b> = number counted divided by the area sampled. To estimate a whole habitat, multiply the density by the habitat's area.",
    "Good practice|✅|Use enough quadrats, place them randomly or at regular spacing, and record carefully. More samples give more reliable estimates."
  ], [
    "A square frame for counting in a small area is a...|quadrat|🟩||transect|helix",
    "A line along which you sample at set points is a...|transect|📏||quadrat|isobar",
    "Density equals count divided by...|area sampled|🧮||time,height",
    "To estimate a whole habitat from density, multiply by the...|habitat area|🗺️||temperature,wind",
    "More quadrats usually give more...|reliable estimates|📊||colorful results,smaller area",
    "Quadrats should be placed randomly or at...|regular spacing|🎯||the easiest spots,the richest spots",
    "A sample count of 40 animals in 8 square meters gives a density of...|5 per square meter|🟩||8 per square meter,40 per square meter",
    "Careful recording helps make results...|trustworthy|📝||secret,short"
  ], "Count, divide by area, then scale up.", "", quad, 0.45));
  b.push(L("Sampling designs", [
    "Choosing where to sample|🎲|<b>Random sampling</b> gives every spot an equal chance. <b>Systematic sampling</b> uses regular spacing. <b>Stratified sampling</b> splits the area into types (strata), such as forest and meadow, and samples each.",
    "Why stratify?|🌳|If habitats differ a lot, stratified sampling makes sure rare or small types are not missed and gives better estimates.",
    "Avoiding bias|⚠️|<b>Convenience sampling</b>, like only sampling near roads, can bias results. Randomization protects against hidden bias."
  ], [
    "Giving every spot an equal chance is...|random sampling|🎲||systematic sampling,convenience sampling",
    "Sampling at regular spacing is...|systematic sampling|📏||random sampling,convenience sampling",
    "Splitting an area into habitat types and sampling each is...|stratified sampling|🌳||random sampling,convenience sampling",
    "Sampling only near roads is...|convenience sampling|🛣️||stratified sampling,random sampling",
    "Stratifying makes sure ... types are not missed|small or rare|🔍||large,common",
    "Convenience sampling can cause...|bias|⚠️||perfect accuracy,more data",
    "Randomization protects against...|hidden bias|🛡️||good weather,noise",
    "Strata means the ... of an area|layers or types|🧱||sounds,names"
  ], "How are the sample sites chosen?"));
  b.push(MIX("Mixed practice", b.slice(0, 18)));
  b.push(MIX("Level 29 Challenge", b.slice(0, 18).reverse()));

  // ---------- LEVEL 30 ----------
  c.push(BOTH("Occupancy and detection", [
    "Missing animals|🔎|A species can be present but not seen. <b>Detection probability (p)</b> is the chance you detect it when it is there. If you ignore it, you underestimate <b>occupancy</b> (the share of sites the species uses).",
    "Repeat visits|🔁|Visiting each site several times lets <b>occupancy models</b> separate true absence from missed detection. The chance of at least one detection in k visits is 1 - (1 - p)^k.",
    "Naive vs corrected|📉|The <b>naive occupancy</b> (sites with detections divided by all sites) is usually too low. Models correct it using the repeat-visit data."
  ], [
    "The chance of detecting a species that is present is the...|detection probability|🔎||birth rate,mortality rate",
    "The share of sites a species uses is...|occupancy|🗺️||detection,density",
    "Ignoring imperfect detection usually ... occupancy|underestimates|📉||overestimates,fixes",
    "Repeat visits let models separate true absence from...|missed detection|🔁||extra food,new habitat",
    "Naive occupancy is usually too...|low|📉||high,perfect",
    "More visits to a site ... the chance of detecting a present species|raise|📈||lower,erase",
    "A false absence means the species was present but...|not detected|🙈||eaten,counted twice",
    "Occupancy models need ... at the same sites|repeat surveys|🔁||one survey,no surveys"
  ], "Present does not mean seen.", "", occ, 0.4));
  c.push(BOTH("Distance sampling", [
    "Counting along a line|🚶|In <b>line transect</b> surveys an observer walks a line and records animals seen and how far they are from the line.",
    "Detection falls with distance|📉|Animals farther away are more likely to be missed. A <b>detection function</b> fitted to the distances corrects for this, and gives density.",
    "Simple strip version|🧮|If every animal in a strip is seen, density = count divided by (length x total strip width). Assumptions: animals on the line are seen, they do not move before detection, and distances are measured well."
  ], [
    "In a line transect survey, the observer records the ... to each animal|distance from the line|📏||weight,age",
    "Animals farther from the line are ... likely to be detected|less|📉||more,equally",
    "A model of how detection falls with distance is the...|detection function|📈||food web,genome",
    "Distance sampling is used to estimate...|density|🧮||age,speed",
    "A key assumption is that animals on the line are...|detected|✅||sleeping,absent",
    "If animals flee before being seen, density will be...|underestimated|🏃||overestimated,exact",
    "Strip density = count / (length x ...)|total strip width|📏||weight,time",
    "Distance sampling helps correct for animals that are...|missed|🙈||overcounted,identical"
  ], "Count, adjust for missed animals, then divide by area.", "", dist, 0.4));
  c.push(BOTH("Camera traps", [
    "Remote cameras|📷|<b>Camera traps</b> are motion-triggered cameras that record animals without disturbing them. They are good for shy or nocturnal species.",
    "Counting effort|🌙|Effort is measured in <b>trap-nights</b>. A common index is the <b>relative abundance index</b>: detections per 100 trap-nights.",
    "Careful use|⚠️|Photos of one animal can be repeated, so records within a short time are often counted as one event. If animals have natural markings, such as tiger stripes or jaguar spots, individuals can be identified and counted."
  ], [
    "Camera traps are triggered by...|motion|📷||sound only,sunlight",
    "Camera traps are good for ... species|shy or nocturnal|🌙||loud and daytime,plant",
    "Effort is measured in...|trap-nights|🌙||bird-days,tank-hours",
    "A common index is detections per ... trap-nights|100|📊||5,1 million",
    "Repeated photos of one animal in a short time are often counted as...|one event|📸||many events,no event",
    "Natural markings, such as stripes or spots, let scientists...|identify individuals|🐅||paint animals,call animals",
    "Camera traps record animals without...|disturbing them|🤫||feeding them,catching them",
    "A detection index is an index, not a direct count of...|all animals|📊||cameras,days"
  ], "Think of effort in nights and detections as the count.", "", cam, 0.4));
  c.push(L("Tracking and home range", [
    "Following animals|📡|Scientists track animals with <b>radio</b> and <b>GPS collars</b> and tags. GPS gives many accurate locations over time.",
    "Home range|🗺️|The <b>home range</b> is the area an animal uses in its normal activities. A <b>minimum convex polygon (MCP)</b> draws the smallest convex shape around all locations. A <b>kernel density</b> estimate shows where the animal spends most time.",
    "Cautions|⚠️|Locations close in time are not independent (<b>autocorrelation</b>). MCPs can include areas the animal never uses. Tags should be light enough, usually under 5% of body mass for birds."
  ], [
    "The area an animal uses in its normal activities is its...|home range|🗺️||migration route,burrow",
    "The smallest convex shape around all locations is the...|minimum convex polygon|📐||kernel density,detection function",
    "A kernel density estimate shows where an animal...|spends most time|🔥||was born,is buried",
    "GPS collars give many accurate...|locations|📡||weights,names",
    "Locations close in time are not independent because of...|autocorrelation|🔗||migration,mutation",
    "A weakness of the MCP is that it may include areas the animal...|never uses|⚠️||always uses,counts",
    "Tags should be light enough, often under about ... of a bird's mass|5%|🪶||50%,95%",
    "Radio and GPS tags help scientists study...|movement|🧭||fossils,tides"
  ], "A home range is where, and how much, the animal goes."));
  c.push(BOTH("Stable isotopes", [
    "Chemical fingerprints|🧪|<b>Stable isotopes</b> are forms of an element with different masses that do not decay. Animals take on the isotope values of their food.",
    "Nitrogen|🔼|<b>15N</b> rises about 3 to 4 per mil with each trophic level, so it shows an animal's trophic position. <b>13C</b> changes little and helps show food sources, such as sea vs land plants.",
    "Formula|🧮|Trophic position = 1 + (15N of consumer - 15N of base) / enrichment per level. Tissues such as feathers or claws record diets over time."
  ], [
    "Stable isotopes are forms of an element that do not...|decay|🧪||exist,react at all",
    "Animals take on isotope values from their...|food|🍽️||mood,shadow",
    "Nitrogen-15 rises with each...|trophic level|🔼||month,mile",
    "Carbon-13 helps show the ... of food|source|🌿||speed,sound",
    "Nitrogen-15 indicates an animal's...|trophic position|🪜||color,weight",
    "Claws or feathers can record ... over time|diets|🪶||thoughts,addresses",
    "Per mil means parts per...|thousand|⚖️||hundred,million",
    "Trophic position of a plant eater is about...|2|🌿||1,4"
  ], "Subtract the base, divide by the step, add one.", "", iso, 0.4));
  c.push(L("Open and closed population models", [
    "Closed population|🔒|A <b>closed population</b> has no births, deaths, immigration or emigration during the study. Lincoln-Petersen and similar methods assume this, so studies are short.",
    "Open population|🚪|An <b>open population</b> changes. Models such as <b>Jolly-Seber</b> and <b>Cormack-Jolly-Seber</b> use many sampling occasions to estimate survival, recruitment and abundance.",
    "Choosing|✅|For a long study of a lasting population, use an open model. For a short quick count, a closed model is simpler. Using the wrong model gives wrong answers."
  ], [
    "A population with no births or deaths during a study is...|closed|🔒||open,extinct",
    "A population with births, deaths and movement is...|open|🚪||closed,frozen",
    "Lincoln-Petersen methods assume the population is...|closed|🔒||open,growing fast",
    "Jolly-Seber models can estimate ... in open populations|survival|📈||only color,only age of fossils",
    "Open models need ... sampling occasions|many|🔁||one,no",
    "A short quick study suits a ... model|closed|⏱️||open,imaginary",
    "Using the wrong model can give...|wrong answers|⚠️||perfect answers,no data",
    "Cormack-Jolly-Seber models estimate...|survival|📈||nest size,song type"
  ], "Does the population stay the same during the study?"));
  c.push(L("Rarefaction", [
    "Sample size changes richness|📈|The more individuals or samples you collect, the more species you find. So you can't fairly compare richness between sites if one had a larger sample.",
    "Species accumulation|🔼|A <b>species accumulation curve</b> plots the number of species against sampling effort. The curve rises fast, then flattens as common species are already found.",
    "Rarefaction|✂️|<b>Rarefaction</b> shrinks big samples to the same size as the smallest by repeated random subsampling, so sites can be compared fairly."
  ], [
    "Collecting more individuals usually finds ... species|more|📈||fewer,identical",
    "A plot of species versus sampling effort is a...|species accumulation curve|📈||food web,cladogram",
    "As a species accumulation curve flattens, new species are...|rarer to find|➖||easier to find,impossible to name",
    "Rarefaction makes samples the same...|size|✂️||color,price",
    "Rarefaction helps when comparing sites with ... sample sizes|different|⚖️||identical,zero",
    "A curve that never flattens suggests many species are still...|unfound|🔍||extinct,identical",
    "Rarefaction uses repeated random...|subsampling|🎲||painting,naming",
    "Unequal sampling effort makes richness comparisons...|unfair|⚠️||perfect,unnecessary"
  ], "Fair comparison needs equal sample size."));
  c.push(L("BACI and pseudoreplication", [
    "BACI|🧪|A <b>Before-After-Control-Impact</b> design measures both a control site and an impact site before and after a change, such as a new dam. It separates the change from natural year-to-year variation.",
    "Pseudoreplication|⚠️|<b>Pseudoreplication</b> treats repeated measures from one unit as if they were independent replicates, for example sampling 20 fish from one pond to represent \"ponds\". It inflates confidence.",
    "Good design|✅|True replicates are separate units given the treatment. Randomly assign treatments and include controls."
  ], [
    "BACI stands for Before-After-Control-...|Impact|🧪||Island,Index",
    "A BACI design includes a ... site|control|🧪||secret,second planet",
    "BACI helps separate a treatment effect from...|natural variation|📉||the treatment,the controls",
    "Treating repeated samples from one pond as separate ponds is...|pseudoreplication|⚠️||replication,randomization",
    "Pseudoreplication makes results seem more...|certain|⚠️||uncertain,hidden",
    "True replicates are separate ... given the treatment|units|✅||names,seasons",
    "Randomly assigning treatments helps avoid...|bias|🎲||controls,samples",
    "Sampling 20 fish from one pond gives you ... pond(s) of replication|one|1️⃣||twenty,zero"
  ], "Are the replicates truly independent?"));
  c.push(L("Errors and power", [
    "Two mistakes|⚖️|A <b>Type I error</b> is a false positive: finding an effect that isn't there. A <b>Type II error</b> is a false negative: missing an effect that is there.",
    "Alpha and power|📊|<b>Alpha</b> is the accepted chance of a Type I error, often 0.05. <b>Power</b> is the chance of detecting a real effect, equal to 1 minus the chance of a Type II error.",
    "Improving power|🔧|Power rises with a larger sample, a bigger true effect, and lower variation. Too little power means a study may miss real effects."
  ], [
    "A false positive is a Type ... error|I|⚖️||II|III",
    "A false negative is a Type ... error|II|⚖️||I|III",
    "Alpha is often set at...|0.05|📊||0.95|5",
    "Power is the chance of detecting a ... effect|real|🔍||fake,tiny only",
    "Power rises with a ... sample|larger|📈||smaller,identical",
    "Power rises when variation is...|lower|📉||higher,infinite",
    "Missing a real effect is a...|Type II error|🙈||Type I error,correct result",
    "Too little power means a study may...|miss real effects|⚠️||invent effects,break the law"
  ], "Which mistake is a false alarm, and which is a miss?"));
  c.push(BOTH("Confidence intervals", [
    "Estimating a mean|📏|A sample mean is only an estimate. The <b>standard error (SE)</b> = SD divided by the square root of n, and shows how much sample means vary.",
    "The interval|↔️|A <b>95% confidence interval</b> is roughly the mean plus or minus 2 SE. If we repeated the study many times, about 95% of such intervals would contain the true mean.",
    "Reading it|👀|A narrow interval means a precise estimate. Intervals from two groups that do not overlap suggest a real difference. Larger samples give narrower intervals."
  ], [
    "Standard error equals SD divided by the ... of n|square root|📏||square,cube",
    "A 95% confidence interval is about the mean plus or minus...|2 SE|↔️||1 SD only,10 SE",
    "A narrow interval means a ... estimate|precise|🎯||poor,fake",
    "Larger samples give ... intervals|narrower|📉||wider,identical",
    "If intervals of two groups do not overlap, a real difference is...|likely|👀||impossible,proven wrong",
    "The standard error shows how much ... vary|sample means|📊||fossils,genes",
    "If the SD gets larger, the SE gets...|larger|📈||smaller,disappears",
    "A confidence interval shows the ... in an estimate|uncertainty|❓||age,flavor"
  ], "SE is SD divided by the root of n.", "", cinum, 0.45));
  c.push(L("Regression and R squared", [
    "Fitting a line|📈|<b>Linear regression</b> draws a line through points to describe how a response (like clutch size) changes with a predictor (like body mass). The <b>slope</b> says how much the response changes per unit.",
    "R squared|📊|<b>R squared</b> is the share of variation in the response that the line explains, from 0 to 1. A value of 0.8 means 80% of variation is explained.",
    "Cautions|⚠️|<b>Residuals</b> are the differences between points and the line. Don't <b>extrapolate</b> far beyond your data, and remember correlation is not causation."
  ], [
    "Linear regression draws a ... through data points|line|📈||circle,box",
    "The slope tells how much the response changes per...|unit of the predictor|📏||year only,animal",
    "R squared is the share of ... explained by the line|variation|📊||error only,animals",
    "An R squared of 0.8 means ... of variation explained|80%|📊||8%,0.8%",
    "Residuals are the differences between points and the...|line|➖||axes,legend",
    "Extending a line far beyond your data is called...|extrapolation|⚠️||interpolation,replication",
    "A strong correlation does not prove...|causation|⚠️||a pattern,a line",
    "R squared values range from 0 to...|1|🔢||10,100"
  ], "The line is the pattern, the residuals are the scatter."));
  c.push(L("Confounding variables", [
    "Hidden third factors|🕵️|A <b>confounding variable</b> affects both the factors you study, making a false link. Ice cream sales and drowning both rise in summer because of heat.",
    "Controlling|🧰|Experiments with random assignment spread confounders evenly. In field studies, scientists measure possible confounders and include them in models.",
    "Natural experiments|🌋|Sometimes an event such as a fire or storm acts like an experiment, but because it was not randomized, careful matching and controls are needed."
  ], [
    "A variable that affects both factors you study is a...|confounder|🕵️||control,replicate",
    "Confounding can create a ... link|false|🔗||perfect,hidden always",
    "Random assignment spreads confounders...|evenly|🎲||to one group,nowhere",
    "In field studies scientists often ... possible confounders|measure|📏||ignore,hide",
    "A natural experiment is not...|randomized|🌋||real,useful",
    "Ice cream and drowning both rise in summer due to...|heat|☀️||swimming ice cream,sharks",
    "A random experiment is stronger than an observational study for showing...|causation|✅||beauty,speed",
    "Models can ... for confounders|adjust|🧮||apologize,vanish"
  ], "What hidden factor could be behind both?"));
  c.push(BOTH("Projecting age structure", [
    "Stages matter|📊|Populations are often modeled by age or stage. Each stage has its own survival and fertility. Young animals may have lower survival than adults.",
    "A simple projection|🧮|Next year's adults = juveniles that mature + adults that survive. Next year's young = adults x births per adult. Repeating gives future numbers.",
    "Elasticity|🎯|Some stages matter more. In long-lived animals such as sea turtles, adult survival has a large effect on growth, so protecting adults is often most effective."
  ], [
    "Models by age or stage give each stage its own...|survival and fertility|📊||color,name",
    "Next year's adults come from maturing juveniles and...|surviving adults|🧮||new fossils,dead adults",
    "Next year's young come from adults x...|births per adult|🐣||deaths per adult,years",
    "In long-lived animals, adult survival has a ... effect on growth|large|🐢||tiny,no",
    "Protecting adults is often most effective in...|long-lived animals|🐢||mayflies,mushrooms",
    "Repeating the projection step gives ... numbers|future|⏭️||past,random",
    "Young animals often have ... survival than adults|lower|📉||higher,identical",
    "Each stage in the model has its own...|rates|📊||rhyme,address"
  ], "Count who matures, who survives, and who is born.", "", lesl, 0.4));
  c.push(BOTH("Catch per unit effort", [
    "Fishing data|🎣|<b>Catch per unit effort (CPUE)</b> = catch divided by effort, such as kg per boat-day. It is often used as an index of how many fish there are.",
    "Hidden problems|⚠️|CPUE may stay high even as fish decline, because fish gather in schools and boats find them with technology. This is called <b>hyperstability</b>, and it hides collapse.",
    "Using it well|✅|Standardize for gear, season and skill, and compare with independent survey data. A steady fall in standardized CPUE is a warning sign."
  ], [
    "CPUE stands for catch per unit...|effort|🎣||energy,error",
    "CPUE equals catch divided by...|effort|➗||price,length",
    "CPUE is often used as an index of how many fish there...|are|🐟||seem,were",
    "Hyperstability means CPUE stays high even as fish...|decline|📉||increase,vanish at once",
    "Hyperstability can hide a stock...|collapse|⚠️||recovery,census",
    "CPUE should be standardized for gear and...|season|📅||fish names,tide times",
    "Independent surveys can be compared with...|CPUE|🔍||recipes,songs",
    "A steady fall in standardized CPUE is a...|warning sign|🚨||trophy,coincidence"
  ], "Catch alone isn't enough, you need to know how hard people fished.", "", cpue, 0.4));
  c.push(L("Community-based conservation", [
    "People as partners|🤝|<b>Community-based conservation</b> gives local people a say and a share of the benefits. If wildlife helps families, they have a reason to protect it.",
    "Models|🦒|In Namibia and Kenya, <b>conservancies</b> let communities manage wildlife and earn from tourism or regulated hunting. Money may fund schools, clinics, and rangers.",
    "Success needs|✅|Fair sharing, clear rights, honest management, and good governance. Without benefits to local people, protection can fail."
  ], [
    "Community-based conservation gives local people a...|say and a share|🤝||ban,tax",
    "If wildlife helps families, they have a reason to...|protect it|🦒||ignore it,sell it all",
    "Namibia and Kenya have local wildlife areas called...|conservancies|🏞️||harbors,museums",
    "Tourism income can fund schools, clinics and...|rangers|🏫||weapons,casinos",
    "Success needs fair sharing and good...|governance|⚖️||weather,luck",
    "Without benefits to local people, protection can...|fail|⚠️||work better,be faster",
    "A community-based approach sees people as...|partners|🤝||enemies,spectators",
    "Clear rights over wildlife use help communities...|manage it|📜||lose it,hide it"
  ], "If people gain, they guard."));
  c.push(L("Phylogenetic diversity", [
    "Not all species are equal|🌳|<b>Phylogenetic diversity</b> adds up the evolutionary history in a group of species. Losing a species with no close relatives loses more unique history than losing one with many relatives.",
    "Distinct species|🦎|The tuatara is the only living member of its order, and the aardvark is the only living member of its order. Both are <b>evolutionarily distinct</b>.",
    "Using it|📋|Some conservation lists, such as the EDGE program, score species by both evolutionary distinctiveness and risk of extinction."
  ], [
    "Phylogenetic diversity sums up evolutionary...|history|🌳||weight,color",
    "Losing a species with no close relatives loses ... unique history|more|🦎||less,no",
    "The tuatara is the only living member of its...|order|🦎||phylum,genus",
    "The aardvark is the only living member of its...|order|🐘||class,kingdom",
    "A species with few close relatives is evolutionarily...|distinct|🌿||common,identical",
    "The EDGE program scores species by distinctiveness and...|extinction risk|📋||beauty,speed",
    "Protecting distinct species saves more ... diversity|evolutionary|🧬||political,financial",
    "A phylogeny is a family...|tree|🌳||bush,list"
  ], "A lone branch is worth more than a twig in a crowded bush."));
  c.push(L("The latitudinal diversity gradient", [
    "More species near the equator|🌴|Species richness is usually higher in the tropics and falls toward the poles. This is the <b>latitudinal diversity gradient</b>.",
    "Possible reasons|🔍|More solar energy and productivity, a larger tropical area, stable climates, and a long time for species to form. Some studies find speciation higher and extinction lower in the tropics.",
    "Not always|❄️|The pattern holds for many groups but not all. Some groups, such as certain sandpipers and conifers, are richer at higher latitudes. Ideas are tested, not proven by a single study."
  ], [
    "Species richness is usually highest in the...|tropics|🌴||Arctic,mid-ocean only",
    "Richness usually ... toward the poles|falls|📉||rises,stays flat",
    "The pattern is called the latitudinal...|diversity gradient|🌍||song cycle,tide chart",
    "One idea is that the tropics have more solar...|energy|☀️||ice,snow",
    "Stable climates may help species...|persist and form|🕰️||vanish,become identical",
    "Some studies suggest speciation is ... in the tropics|higher|⬆️||lower,absent",
    "The gradient holds for many groups but...|not all|⚖️||exactly all,none",
    "A single study can...|test an idea|🔬||prove everything,end science"
  ], "Tropical richness, with some exceptions."));
  c.push(L("Reading research and field ethics", [
    "Parts of a paper|📄|Most research papers have an abstract, introduction, methods, results and discussion. Methods should be clear enough that others can repeat the work. <b>Peer review</b> means other experts check a paper before it is published.",
    "Ethics|🤝|Field researchers need permits, work to minimize disturbance, and follow the 3Rs for animal studies: <b>replace</b>, <b>reduce</b> and <b>refine</b>. Ethics boards review plans.",
    "Open science|📂|Sharing data and code lets others check results. <b>Reproducibility</b> helps science correct mistakes."
  ], [
    "A short summary at the start of a paper is the...|abstract|📄||appendix,index",
    "The section that explains how the study was done is the...|methods|🔧||results,title",
    "Experts checking a paper before publication is...|peer review|👀||voting,advertising",
    "The 3Rs are replace, reduce and...|refine|🤝||remove,repeat",
    "Field researchers usually need...|permits|📝||costumes,trophies",
    "Researchers try to minimize ... to wildlife|disturbance|🤫||data,notes",
    "Sharing data and code helps others check...|results|📂||dreams,weather",
    "Being able to get the same results again is...|reproducibility|🔁||randomness,popularity"
  ], "Check the plan, the permit, and the proof."));
  c.push(MIX("Mixed practice", c.slice(0, 18)));
  c.push(MIX("Level 30 Challenge", c.slice(0, 18).reverse()));

  Object.assign(ANIMALS_LEVELS, { 28: a, 29: b, 30: c });
})();
