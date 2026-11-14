// ext/animals-22-24.js  Animals & Nature levels 22-24
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
  const dens = NUM(() => ({ k: ri(0, 2), d: pick([2, 3, 4, 5, 6, 8, 10, 12]), a: pick([5, 10, 20, 25, 40, 50]) }), p => {
    const N = p.d * p.a;
    if (p.k === 0) return { v: "🦌", ans: p.d, text: `A reserve of ${p.a} square km holds ${N} deer. How many deer is that per square km (the population density)?`, h1: "Density is the number of animals for each unit of area.", h2: "Divide the number of animals by the area.", ex: `${N} animals in ${p.a} square km is ${N} / ${p.a} = ${p.d} per square km. The answer is ${p.d}.` };
    if (p.k === 1) return { v: "🦊", ans: N, text: `Foxes live at a density of ${p.d} per square km. How many foxes live in a park of ${p.a} square km?`, h1: "Total animals = density x area.", h2: "Multiply the number per square km by the number of square km.", ex: `${p.d} per square km over ${p.a} square km is ${p.d} x ${p.a} = ${N}. The answer is ${N}.` };
    return { v: "🗺️", ans: p.a, text: `${N} voles live at a density of ${p.d} per square km. How many square km is the area?`, h1: "Area = number of animals / density.", h2: "Divide the total number of animals by the number per square km.", ex: `${N} animals at ${p.d} per square km is ${N} / ${p.d} = ${p.a} square km. The answer is ${p.a}.` };
  });
  const markre = NUM(() => ({ k: ri(0, 1), M: pick([10, 20, 30, 40, 50]), R: pick([2, 3, 4, 5, 6]), j: pick([2, 3, 4, 5, 6]) }), p => {
    const C = p.R * p.j, N = p.M * p.j;
    if (p.k === 0) return { v: "🏷️", ans: N, text: `Scientists mark and release ${p.M} fish. Later they catch ${C} fish, and ${p.R} of them have marks. Estimate the number of fish in the lake.`, h1: "Population = (marked in first catch x total in second catch) / marked in second catch.", h2: "Multiply the first two numbers, then divide by the number of marked fish you caught again.", ex: `${p.M} marked, then ${C} caught with ${p.R} marked: ${p.M} x ${C} / ${p.R} = ${N}. The answer is ${N}.` };
    return { v: "🏷️", ans: p.R, text: `A lake has about ${N} fish. ${p.M} are marked and released. If ${C} fish are caught later, how many marked fish should you expect in that catch?`, h1: "The share of marked fish in the catch should match the share in the whole lake.", h2: "Expected marked = marked x catch / population.", ex: `A lake of ${N} fish with ${p.M} marked and a catch of ${C}: ${p.M} x ${C} / ${N} = ${p.R}. The answer is ${p.R}.` };
  });
  const lifet = NUM(() => ({ k: ri(0, 2), S: pick([40, 80, 100, 200, 400]), pc: pick([10, 20, 25, 40, 50, 75]) }), p => {
    const E = p.S * p.pc / 100;
    if (p.k === 0) return { v: "📋", ans: p.pc, text: `A cohort of ${p.S} young seals is followed. After one year ${E} are alive. What percent survived?`, h1: "Survival = number alive at the end / number alive at the start.", h2: "Divide the survivors by the starting number, then multiply by 100.", ex: `${p.S} start and ${E} survive: ${E} / ${p.S} x 100 = ${p.pc} percent. The answer is ${p.pc}.` };
    if (p.k === 1) return { v: "📋", ans: E, text: `A cohort starts with ${p.S} young seals. ${p.pc} percent survive their first year. How many are alive after one year?`, h1: "Find the share that survive out of the starting number.", h2: "Multiply the starting number by the percent, then divide by 100.", ex: `${p.S} start and ${p.pc} percent survive: ${p.S} x ${p.pc} / 100 = ${E}. The answer is ${E}.` };
    return { v: "📋", ans: p.S - E, text: `A cohort starts with ${p.S} young seals and ${E} are alive after one year. How many died during the year?`, h1: "Deaths are the starting number minus the survivors.", h2: "Subtract the number alive at the end from the number at the start.", ex: `${p.S} start and ${E} survive: ${p.S} - ${E} = ${p.S - E} died. The answer is ${p.S - E}.` };
  });
  const msy = NUM(() => ({ k: ri(0, 2), K: pick([400, 800, 1200, 2000]), r: pick([2, 4, 5, 8]) }), p => {
    const m = p.r * p.K / 40;
    if (p.k === 0) return { v: "🎣", ans: m, text: `A fish stock has a carrying capacity K of ${p.K} fish and a growth rate r of ${p.r / 10} per year. Using MSY = r x K / 4, what is the maximum sustainable yield (fish per year)?`, h1: "Use the formula given: multiply r by K, then divide by 4.", h2: "r x K first, then divide that answer by 4.", ex: `With K = ${p.K === 400 ? 800 : 400} and r = ${p.r === 4 ? 0.5 : 0.4}, MSY = ${p.r === 4 ? 0.5 : 0.4} x ${p.K === 400 ? 800 : 400} / 4 = ${(p.r === 4 ? 5 : 4) * (p.K === 400 ? 800 : 400) / 40}. The answer is ${(p.r === 4 ? 5 : 4) * (p.K === 400 ? 800 : 400) / 40}.` };
    if (p.k === 1) return { v: "📈", ans: p.K / 2, text: `A population has a carrying capacity K of ${p.K}. At about what population size is its growth fastest?`, h1: "In the logistic model, growth is fastest at the middle of the S-curve.", h2: "That is half of the carrying capacity.", ex: `If K = ${p.K === 400 ? 1000 : 400}, growth is fastest at half of K, which is ${p.K === 400 ? 500 : 200}. The answer is ${p.K === 400 ? 500 : 200}.` };
    return { v: "🎣", ans: p.K, text: `A stock grows at r = ${p.r / 10} per year and its MSY is ${m} fish per year. Using MSY = r x K / 4, what is the carrying capacity K?`, h1: "Rearrange the formula: K = 4 x MSY / r.", h2: "Multiply the MSY by 4, then divide by r.", ex: `With r = 0.5 and an MSY of 50: K = 4 x 50 / 0.5 = 400. The answer is 400.` };
  });
  const hamil = NUM(() => ({ k: ri(0, 1), pc: pick([25, 50, 75]), B: pick([8, 12, 16, 20]) }), p => {
    const rb = p.pc * p.B / 100;
    if (p.k === 0) return { v: "🐝", ans: rb, text: `Relatedness r is ${p.pc / 100} and the benefit B to a relative is ${p.B} extra offspring. What is r x B?`, h1: "Just multiply the two numbers you are given.", h2: "r is a fraction, so r x B is a share of B.", ex: `With r = 0.5 and B = 6, r x B = 0.5 x 6 = 3. The answer is 3.` };
    return { v: "🐝", ans: rb - 1, text: `A helper has relatedness r = ${p.pc / 100} to a relative who gains B = ${p.B} offspring. Helping pays only if r x B is bigger than the cost C. What is the largest whole-number cost C for which helping still pays?`, h1: "First find r x B. Then C must be smaller than that.", h2: "Take r x B and go one whole number lower.", ex: `With r = 0.5 and B = 10, r x B = 5, so C must be below 5. The largest whole cost is 4. The answer is 4.` };
  });
  const chi = NUM(() => ({ k: ri(0, 2), pr: pick([[50, 5], [25, 5], [50, 10], [100, 10], [100, 20], [200, 10], [200, 20], [25, 10]]), rt: pick([[3, 1], [1, 1], [1, 3]]), m: pick([10, 20, 30, 40]), g: pick([2, 3, 4, 5, 6]) }), p => {
    if (p.k === 0) { const E = p.pr[0], d = p.pr[1], a = 2 * d * d / E; return { v: "🎲", ans: a, text: `A study expects ${E} male and ${E} female pups in each group. It sees ${E + d} males and ${E - d} females. Using chi-square = sum of (O - E)^2 / E, what is the chi-square value?`, h1: "Work out (O - E)^2 / E for each of the two groups, then add them.", h2: "Both groups are off by the same amount, so both give the same number.", ex: `Expect 50 and 50, see 55 and 45. Each group gives 5 x 5 / 50 = 0.5, and 0.5 + 0.5 = 1. The answer is 1.` }; }
    if (p.k === 1) { const tot = (p.rt[0] + p.rt[1]) * p.m, e = tot * p.rt[0] / (p.rt[0] + p.rt[1]); return { v: "🧬", ans: e, text: `A cross is expected to give a ${p.rt[0]} to ${p.rt[1]} ratio. Among ${tot} offspring, how many are expected in the group with ratio part ${p.rt[0]}?`, h1: "Split the total into equal parts, one part for each unit of the ratio.", h2: "Divide the total by the sum of the ratio parts, then multiply by the first part.", ex: `A 3 to 1 ratio among 200 offspring: 200 / 4 = 50 per part, so the first group expects 3 x 50 = 150. The answer is 150.` }; }
    return { v: "📊", ans: p.g - 1, text: `A chi-square test compares ${p.g} groups. How many degrees of freedom does it have (groups minus 1)?`, h1: "Degrees of freedom here is the number of groups minus one.", h2: "Subtract 1 from the number of groups.", ex: `With 4 groups, degrees of freedom = 4 - 1 = 3. The answer is 3.` };
  });
  const breed = NUM(() => ({ k: ri(0, 2), h: pick([20, 30, 40, 50, 60, 80]), S: pick([10, 20, 30, 40, 50]), base: pick([100, 200, 300]) }), p => {
    const R = p.h * p.S / 100;
    if (p.k === 0) return { v: "🐄", ans: R, text: `Heritability h² is ${p.h / 100} and the selection differential S is ${p.S}. Using R = h² x S, what is the response to selection R?`, h1: "Multiply heritability by the selection differential.", h2: "h² is a fraction, so R is a share of S.", ex: `With h² = 0.5 and S = 20, R = 0.5 x 20 = 10. The answer is 10.` };
    if (p.k === 1) return { v: "🐄", ans: p.base + R, text: `A herd averages ${p.base} units of a trait. Selection differential S is ${p.S} and h² is ${p.h / 100}. What will the next generation average (mean + R)?`, h1: "First find R = h² x S. Then add it to the current mean.", h2: "New mean = old mean + R.", ex: `A herd averages 100 with S = 20 and h² = 0.5: R = 10, so the new mean is 100 + 10 = 110. The answer is 110.` };
    return { v: "🐄", ans: p.S, text: `The whole herd averages ${p.base} units. The animals chosen to breed average ${p.base + p.S}. What is the selection differential S?`, h1: "S compares the chosen parents with the whole group.", h2: "Subtract the group average from the parents' average.", ex: `The group averages 50 and the chosen parents average 62: S = 62 - 50 = 12. The answer is 12.` };
  });
  const divers = NUM(() => ({ k: ri(0, 2), al: pick([5, 10, 12, 15, 20]), b: pick([2, 3, 4, 5]), m: ri(8, 20), d: pick([1, 2, 3, 4]) }), p => {
    if (p.k === 0) return { v: "🗺️", ans: p.b, text: `A region has ${p.al * p.b} species in total (gamma). Each site averages ${p.al} species (alpha). Using beta = gamma / alpha, what is beta diversity?`, h1: "Beta = gamma divided by alpha.", h2: "Divide the regional total by the average per site.", ex: `A region with 60 species and sites averaging 20: beta = 60 / 20 = 3. The answer is 3.` };
    if (p.k === 1) return { v: "🗺️", ans: p.al * p.b, text: `Sites average ${p.al} species (alpha) and beta diversity is ${p.b}. Using gamma = alpha x beta, how many species live in the whole region?`, h1: "Gamma = alpha x beta.", h2: "Multiply the average per site by the beta number.", ex: `Alpha is 10 and beta is 4, so gamma = 10 x 4 = 40. The answer is 40.` };
    return { v: "🏞️", ans: p.m, text: `Three ponds hold ${p.m - p.d}, ${p.m} and ${p.m + p.d} species. What is the average alpha diversity per pond?`, h1: "An average is the total divided by how many sites.", h2: "Add the three numbers, then divide by 3.", ex: `Ponds with 6, 9 and 12 species: (6 + 9 + 12) / 3 = 9. The answer is 9.` };
  });

  const a = [], b = [], c = [];
  const W = "Think back to what you just learned. Read the question slowly.";

  // ================= LEVEL 22 =================
  a.push(L("Protostomes and deuterostomes", [
    "Two big branches|🌿|Most animals with a gut tunnel belong to two branches. In <b>protostomes</b> the first opening of the embryo becomes the mouth. In <b>deuterostomes</b> that first opening becomes the anus and the mouth forms second.",
    "Who is who|🐌|Protostomes include mollusks, annelid worms and arthropods. Deuterostomes include echinoderms (like sea stars) and chordates (like fish and humans).",
    "Surprising cousins|🧍|Humans are deuterostomes, so we are more closely related to sea stars than to insects or snails."
  ], [
    "In a protostome, the first opening of the embryo becomes the...|mouth|🪱||anus,brain",
    "In a deuterostome, the first opening of the embryo becomes the...|anus|🧍||mouth,heart",
    "Which animal is a deuterostome?|a sea star|⭐||a snail,a beetle",
    "Which animal is a protostome?|an insect|🐜||a fish,a sea star",
    "Humans are deuterostomes, so we are closer cousins to sea stars than to...|insects|🧍||sharks,frogs",
    "Which pair are both deuterostomes?|a frog and a sea urchin|🐸||a frog and a beetle,a snail and a sea urchin",
    "Earthworms (annelids) are...|protostomes|🪱||deuterostomes,sponges",
    "Snails and squid (mollusks) are...|protostomes|🐌||deuterostomes,plants"
  ], "Think about which opening of the embryo forms first, and where each group sits on the family tree."));
  a.push(L("Sponge and cnidarian cells", [
    "Sponges: cells but no tissues|🧽|Sponges have different kinds of cells but no true tissues or organs. <b>Choanocytes</b> (collar cells) beat a whip-like flagellum to pull water through the sponge and trap food.",
    "Cnidarians: stinging cells|🪼|Jellyfish, corals and sea anemones have <b>cnidocytes</b>, stinging cells that fire a tiny harpoon to catch prey. They have two body forms: a swimming <b>medusa</b> and an attached <b>polyp</b>.",
    "A simple nerve net|🕸️|Cnidarians have a <b>nerve net</b> instead of a brain, and one opening to the gut that works as both mouth and exit."
  ], [
    "The collar cells of sponges are called...|choanocytes|🧽||cnidocytes,neurons",
    "The stinging cells of jellyfish are called...|cnidocytes|🪼||choanocytes,osteocytes",
    "A sponge gets food by...|filtering water|🧽||chasing prey,digging burrows",
    "The attached body form of a cnidarian is the...|polyp|🪸||medusa,egg",
    "The swimming bell-shaped body form of a jellyfish is the...|medusa|🪼||polyp,sponge",
    "Cnidarians coordinate their bodies with a...|nerve net|🕸️||large brain,spinal cord",
    "Sponges lack true...|tissues|🧽||cells,water",
    "Sea anemones and corals spend their lives mostly as...|polyps|🪸||medusas,larvae"
  ], "Think about what each kind of cell does for the animal."));
  a.push(L("The molluscan body plan", [
    "Three main parts|🐚|A mollusk body has a muscular <b>foot</b> for moving or gripping, a <b>visceral mass</b> holding the organs, and a <b>mantle</b> that makes the shell.",
    "The radula|🐌|Many mollusks scrape food with a ribbon of tiny teeth called a <b>radula</b>. Clams have no radula; they filter food from water with their gills.",
    "Three big classes|🦑|<b>Gastropods</b> (snails, slugs) have one shell or none. <b>Bivalves</b> (clams, oysters) have two shells. <b>Cephalopods</b> (squid, octopuses) have a foot divided into arms and tentacles."
  ], [
    "The part of a mollusk that makes the shell is the...|mantle|🐚||radula,foot",
    "The ribbon of tiny teeth that scrapes food is the...|radula|🐌||mantle,gill",
    "Clams and oysters belong to the...|bivalves|🦪||gastropods,cephalopods",
    "Snails and slugs belong to the...|gastropods|🐌||bivalves,cephalopods",
    "Squid and octopuses belong to the...|cephalopods|🐙||bivalves,gastropods",
    "Which mollusk class has no radula?|bivalves|🦪||gastropods,cephalopods",
    "The muscular foot of a mollusk is used for...|moving or gripping|🦶||making shell,seeing",
    "Which mollusks have a closed circulatory system?|cephalopods|🦑||bivalves,gastropods"
  ], "Think about the three parts of a mollusk and the three big classes."));
  a.push(L("Chordate features", [
    "Four clues|🧬|All chordates have, at some time in life: a <b>notochord</b> (a stiff rod), a <b>dorsal hollow nerve cord</b>, <b>pharyngeal slits</b> and a <b>post-anal tail</b>.",
    "Backbone cousins|🦴|In most vertebrates the notochord is replaced by a backbone. Tunicates (sea squirts) and lancelets are chordates without a backbone.",
    "A sea squirt grows up|🫧|A sea squirt larva looks like a tiny tadpole with a notochord and tail. As an adult it attaches to a rock and loses most of those features."
  ], [
    "The stiff rod along the back of a chordate embryo is the...|notochord|🦴||radula,mantle",
    "The nerve cord of a chordate runs along the...|back|🧠||belly,legs",
    "Which animal is a chordate without a backbone?|a sea squirt|🫧||a jellyfish,a snail",
    "Pharyngeal slits become the gills of...|fish|🐟||beetles,snails",
    "Which is NOT a chordate feature?|an outer skeleton of chitin|🦗||a notochord,a dorsal nerve cord",
    "In vertebrates the notochord is mostly replaced by...|a backbone|🦴||a shell,gills",
    "A sea squirt larva looks like a tiny...|tadpole|🐸||beetle,jellyfish",
    "Lancelets are small chordates that live...|buried in sand|🏖️||in trees,in caves"
  ], "Think about the four features that all chordates share at some point."));
  a.push(L("Jawless, cartilaginous and bony fishes", [
    "Three groups|🐟|<b>Jawless fishes</b> (lampreys, hagfish) have no jaws. <b>Cartilaginous fishes</b> (sharks, rays) have skeletons of cartilage. <b>Bony fishes</b> have skeletons of bone.",
    "Bony fish types|🐠|Most bony fishes are <b>ray-finned</b> (trout, tuna). A few are <b>lobe-finned</b> (coelacanth, lungfish) with fleshy fins like those of the ancestors of land animals.",
    "Jaws were a big step|🦷|Jaws let animals bite, grip and eat bigger food, and helped fish groups spread into many habitats."
  ], [
    "Lampreys and hagfish are...|jawless fishes|🐍||sharks,bony fishes",
    "Sharks have skeletons made of...|cartilage|🦈||bone,shell",
    "Tuna and trout are...|ray-finned fishes|🐟||lobe-finned fishes,jawless fishes",
    "Which fish has fleshy lobed fins?|a coelacanth|🐟||a tuna,a lamprey",
    "Which one is a bony fish?|a trout|🐟||a ray,a hagfish",
    "Rays belong to the...|cartilaginous fishes|🦈||bony fishes,jawless fishes",
    "Land vertebrates evolved from ancient...|lobe-finned fishes|🐊||jawless fishes,sharks",
    "A lamprey has a round sucking mouth with no...|jaws|🐍||eyes,gills"
  ], "Think about what the skeleton is made of and whether the fish has jaws."));
  a.push(L("Amphibian metamorphosis", [
    "A hormone switch|🐸|Frog metamorphosis is controlled by the hormone <b>thyroxine</b> from the thyroid gland. As the level rises, the tadpole changes into a frog.",
    "What changes|🌱|Gills shrink and lungs form, legs grow, the tail is absorbed, and the gut gets shorter as a plant-eating tadpole becomes a meat-eating frog.",
    "Why it matters|🌍|Tadpoles and frogs use different foods and habitats. Their thin skin breathes and absorbs water, which is why pollution hurts amphibians."
  ], [
    "Frog metamorphosis is triggered by the hormone...|thyroxine|🐸||insulin,adrenaline",
    "That hormone is made in the...|thyroid gland|🧪||pancreas,liver",
    "As a tadpole becomes a frog its tail is...|absorbed|🐸||doubled,hidden",
    "Tadpoles breathe with gills but adult frogs mainly use...|lungs and skin|🫁||only gills,fins",
    "Tadpoles mostly eat plants. Adult frogs eat...|animals|🦟||only leaves,only seeds",
    "During metamorphosis the gut becomes...|shorter|🍃||longer,wider",
    "Amphibian skin is thin, so it easily absorbs...|water and pollutants|💧||light,sound",
    "The change from tadpole to frog is called...|metamorphosis|🐸||migration,hibernation"
  ], "Think about the hormone that signals the change, and what changes in the body."));
  a.push(L("Mammary glands and milk", [
    "A defining mammal trait|🍼|Female mammals feed their young with milk from <b>mammary glands</b>. Milk contains fat, sugar (lactose), protein and antibodies.",
    "Different milks|🐋|Milk recipes match the baby's needs. Whale and seal milk is very rich in fat, so young grow fast and stay warm in cold water.",
    "Monotremes|🦆|Platypuses lay eggs but still make milk. They have no nipples; milk seeps onto the skin and the babies lap it up."
  ], [
    "Mammals feed their young with milk from...|mammary glands|🍼||scent glands,salivary glands",
    "The main sugar in milk is called...|lactose|🥛||chlorophyll,sucrose",
    "Which animal makes milk but lays eggs?|a platypus|🦆||a kangaroo,a bat",
    "Seal milk is very high in...|fat|🦭||sugar,water",
    "Milk helps babies fight germs because it contains...|antibodies|🛡️||pigments,sand",
    "Which animal does NOT make milk?|a crocodile|🐊||a bat,a whale",
    "A platypus mother's milk comes out through...|her skin|🦆||nipples,her beak",
    "Why is whale milk very fatty?|calves grow fast and stay warm|🐋||it makes them lighter,it helps them hunt"
  ], "Think about what milk contains and why babies need it."));
  a.push(L("Fundamental and realized niches", [
    "Fundamental niche|📋|The <b>fundamental niche</b> is everything a species could use and tolerate if no competitors or enemies were around.",
    "Realized niche|🎯|The <b>realized niche</b> is what a species actually uses. It is usually smaller because of competition and predators.",
    "The barnacle example|🐚|On rocky shores, one barnacle could live low on the shore, but a competing barnacle pushes it up to the higher rocks. Its realized niche is smaller than its fundamental niche."
  ], [
    "The full range of conditions a species could use is its...|fundamental niche|📋||realized niche,food web",
    "What a species actually uses is its...|realized niche|🎯||fundamental niche,food web",
    "The realized niche is usually ... the fundamental niche|smaller than|🔍||bigger than,exactly the same as",
    "Which can shrink a realized niche?|competition and predators|⚔️||extra food,perfect weather",
    "In the shore barnacle study, one barnacle was pushed up the rocks by...|a competing barnacle|🐚||the Moon,fishing boats",
    "If a competitor is removed, a species' realized niche often...|grows|📈||shrinks,vanishes",
    "A niche describes a species' role and...|the conditions it needs|📋||its favorite color,its age",
    "Two species with the same niche in the same place will usually...|compete strongly|⚔️||become friends,never meet"
  ], "Think about what a species could use compared with what it really uses."));
  a.push(BOTH("Dispersion and density", [
    "Where individuals live|📍|<b>Dispersion</b> is how individuals are spread out. <b>Clumped</b> = in groups (herds, schools). <b>Uniform</b> = evenly spaced (nesting penguins). <b>Random</b> = no pattern.",
    "Why clumped|🦓|Clumped is the most common pattern: animals gather around food, water and shelter, or for safety. Uniform spacing often comes from territories or competition for space.",
    "Density|🔢|<b>Population density</b> = number of individuals / area. 100 deer in 20 square km is 5 deer per square km."
  ], [
    "Animals spaced evenly, like territorial nesting birds, show a ... pattern|uniform|📏||clumped,random",
    "A herd of zebras shows a ... pattern|clumped|🦓||uniform,random",
    "The most common dispersion pattern in nature is...|clumped|👥||uniform,random",
    "Population density is individuals per unit of...|area|🗺️||time,weight",
    "Uniform dispersion often comes from...|territories|🚧||schools,wind",
    "Animals spread with no clear pattern show ... dispersion|random|🎲||uniform,clumped",
    "Fish in a school show ... dispersion|clumped|🐟||uniform,random",
    "Which is the higher density?|100 animals in 10 square km|🔢||100 animals in 50 square km,50 animals in 50 square km"
  ], "Think about how the animals are spread out, or about animals per area.", "", dens, 0.4));
  a.push(BOTH("Mark and recapture", [
    "Counting hidden animals|🏷️|You cannot count every fish in a lake. So catch some, mark them harmlessly, release them, and later catch a second sample.",
    "The formula|🧮|Population is about (marked in first catch x total in second catch) / marked in second catch. Example: mark 20, later catch 30 with 5 marked: 20 x 30 / 5 = 120.",
    "Assumptions|⚠️|It works if marks stay on, marked animals mix back in, and there are no big births, deaths or moves between the two samples."
  ], [
    "In mark-recapture, the second sample is used to find what share is...|marked|🏷️||old,large",
    "If a high share of the second catch is marked, the population is probably...|small|🔢||large,extinct",
    "Marks must be...|harmless to the animal|❤️||painful,bright red",
    "If marks fell off, the population estimate would be too...|high|⚠️||low,exact",
    "Mark-recapture is useful for animals that are...|hard to count one by one|🔍||already extinct,made of metal",
    "Marked animals must have time to...|mix back with the population|🔀||grow wings,leave the area",
    "The formula divides by the number of marked animals in the...|second catch|🧮||first catch,whole lake",
    "Why do we release marked animals before the second sample?|so they can mix back in|🐟||so they can be fed,so they can be painted"
  ], "Think about the marked share in the second catch.", "", markre, 0.45));
  a.push(L("Allee effect and minimum viable populations", [
    "Too few can be bad|📉|Usually small populations grow fast because there is lots of food. But the <b>Allee effect</b> means very small populations may do worse per animal: they struggle to find mates, defend against predators or hunt together.",
    "Examples|🐕|Meerkats need a group to watch for danger. African wild dogs hunt and raise pups in packs and do poorly in small groups.",
    "Minimum viable population|🎯|A <b>minimum viable population (MVP)</b> is the smallest number that has a good chance of surviving a long time despite chance events, disease and inbreeding."
  ], [
    "The Allee effect says very small populations may...|do worse per animal|📉||always grow faster,never change",
    "One cause of the Allee effect is difficulty finding...|mates|🔍||rainbows,tools",
    "Meerkats in tiny groups struggle because there are fewer...|lookouts|👀||colors,tails",
    "MVP stands for minimum viable...|population|🎯||predator,variety",
    "The minimum viable population is the smallest number that can...|survive long term|🛟||fly,speak",
    "Small populations face extra risk from chance events, disease and...|inbreeding|🧬||sunlight,gravity",
    "Which animals do worse in tiny groups because they hunt together?|African wild dogs|🐕||sloths,tigers",
    "If a population falls below its MVP, it is...|at high risk of dying out|⚠️||safe forever,about to double"
  ], "Think about what goes wrong when only a few animals are left."));
  a.push(L("Edge effects and ecotones", [
    "Where habitats meet|🌲|An <b>ecotone</b> is the zone where two habitats meet, like forest and meadow. The boundary itself is called the <b>edge</b>.",
    "The edge effect|🦌|Edges often have more species because animals from both habitats live there, plus some edge specialists. Deer feed in meadow and hide in forest.",
    "Edges can hurt|⚠️|When forests are cut into small patches there is more edge and less deep forest. Edges are windier, drier and brighter, and nest predators and parasites reach in more easily. Forest-interior species lose out."
  ], [
    "The zone where two habitats meet is an...|ecotone|🌲||ecosystem service,omnivore",
    "An edge between forest and meadow often has ... species|more|🦌||fewer,no",
    "Cutting a forest into small patches creates more...|edge|✂️||deep forest,rain",
    "Compared with deep forest, edges are usually...|brighter and drier|☀️||darker and wetter,quieter and colder",
    "Nest predators can reach nests more easily near...|forest edges|🥚||deep forest centers,mountain tops",
    "A deer that feeds in meadow and hides in forest uses the...|edge|🦌||desert,deep sea",
    "Which has more edge for its area, one big square patch or many small patches?|many small patches|🟩||one big square patch,they are the same",
    "Species that need the middle of a large forest are called forest ... species|interior|🌳||edge,marsh"
  ], "Think about what happens where two habitats touch."));
  a.push(L("Intermediate disturbance", [
    "Disturbance|🌪️|A <b>disturbance</b> is an event that changes a community, like fire, storm, flood or heavy grazing.",
    "Not too little, not too much|⚖️|The <b>intermediate disturbance hypothesis</b> says diversity is highest when disturbances are moderate. If they are very rare, a few strong competitors take over. If they are very frequent, only fast, tough species survive.",
    "Reefs and shores|🪸|Moderate storms open space on reefs and rocky shores, letting new species move in."
  ], [
    "Which level of disturbance often gives the highest biodiversity?|intermediate|⚖️||none,very high",
    "With no disturbance for a very long time, a few strong ... may take over|competitors|🏆||predators,seeds",
    "With constant, severe disturbance only ... species survive|fast and tough|⚡||slow and delicate,huge",
    "A storm that knocks down some coral opens up...|space|🌊||money,gravity",
    "A disturbance is an event that...|changes a community|🌪️||keeps it frozen,counts animals",
    "Which is a natural disturbance?|a flood|🌊||a library,a map",
    "Moderate grazing can raise plant variety by stopping a few plants from...|taking over|🐄||growing roots,making seeds",
    "Very frequent disturbance lowers diversity because species cannot...|recover|🔄||talk,sing"
  ], "Think about disturbances that are not too small and not too big."));
  a.push(L("Imprinting and critical periods", [
    "Imprinting|🦆|<b>Imprinting</b> is fast learning during a short window of life. Konrad Lorenz showed that goslings follow the first moving thing they see after hatching, which is normally their mother.",
    "Critical period|⏱️|A <b>critical period</b> is a time when the brain is especially ready to learn something. Learning after that window is harder or impossible.",
    "Other examples|🐦|Songbirds learn their songs early in life. Young white-crowned sparrows need to hear adult song in their first months to sing it well."
  ], [
    "Imprinting is learning that happens during a...|short window of life|⏱️||whole life evenly,sleep only",
    "Goslings that followed the first moving object they saw showed...|imprinting|🦆||hibernation,mimicry",
    "A time when the brain is especially ready to learn is a...|critical period|⏱️||habitat,niche",
    "Normally, imprinting helps a baby bird stay near its...|parent|🦆||enemies,eggs",
    "Young songbirds that never hear adult song at the right age...|sing abnormal songs|🎶||sing perfectly,stop breathing",
    "Imprinting is a mix of instinct and...|experience|🧠||pigment,luck",
    "Imprinting is usually permanent or...|hard to change|🔒||easy to change,short-lived always",
    "Who studied imprinting in geese?|Konrad Lorenz|🦆||Charles Darwin,Isaac Newton"
  ], "Think about when in life the learning happens."));
  a.push(L("Classical and operant conditioning", [
    "Classical conditioning|🔔|Pavlov rang a bell before feeding dogs. Soon the bell alone made them drool. The animal links two things that happen together.",
    "Operant conditioning|🐀|Animals learn from consequences. A rat that presses a lever and gets food presses more (<b>reinforcement</b>). Behavior followed by something unpleasant becomes less likely.",
    "Used by trainers|🐬|Trainers use clicker sounds and treats to shape behavior, rewarding small steps toward the goal."
  ], [
    "Pavlov's dogs learned to drool at the sound of a...|bell|🔔||picture,flower",
    "Linking two events that happen together is ... conditioning|classical|🔔||operant,optical",
    "Learning from rewards and consequences is ... conditioning|operant|🐀||classical,musical",
    "A rat presses a lever and gets food, so it presses more. This is...|reinforcement|🍪||habituation,instinct",
    "A dog sits when told and gets a treat. The treat is a...|reward|🦴||punishment,signal",
    "Dolphin trainers use a whistle or clicker to mark...|the exact moment of good behavior|🐬||bedtime,the weather",
    "Shaping means rewarding...|small steps toward the goal|🪜||only the final result,every random act",
    "In classical conditioning, the bell becomes a...|signal for food|🔔||kind of food,punishment"
  ], "Think about whether the animal links two events or learns from a result."));
  a.push(L("Fixed action patterns and sign stimuli", [
    "Fixed action pattern|🧬|A <b>fixed action pattern</b> is an instinctive behavior that runs to the end once triggered, in almost the same way every time.",
    "Sign stimulus|🔴|A <b>sign stimulus</b> is the simple cue that triggers it. Male stickleback fish attack anything with a red belly, even a crude model. Herring gull chicks peck at a red spot on a parent's bill.",
    "Super signals|🥚|Niko Tinbergen found that birds such as oystercatchers tried to sit on a giant fake egg instead of their own. A <b>supernormal stimulus</b> is an exaggerated cue that triggers an even stronger response."
  ], [
    "An instinctive behavior that runs to the end once triggered is a...|fixed action pattern|🧬||learned trick,sleep cycle",
    "The simple cue that triggers it is a...|sign stimulus|🔴||habitat,mutation",
    "Male sticklebacks attack models with a red...|belly|🐟||eye,tail",
    "Gull chicks peck at a red spot on the parent's...|bill|🐦||wing,foot",
    "A giant fake egg that a bird prefers over a real egg is a...|supernormal stimulus|🥚||habitat,predator",
    "Fixed action patterns are mostly...|innate|🧬||learned at school,copied from friends",
    "Fixed action patterns help animals respond fast without...|having to learn|⚡||eating,sleeping",
    "Who studied sticklebacks and gulls?|Niko Tinbergen|🔬||Marie Curie,Albert Einstein"
  ], "Think about an instinct that is set off by a simple cue."));
  a.push(L("Batesian and Mullerian mimicry", [
    "Batesian mimicry|🐝|In <b>Batesian mimicry</b> a harmless species looks like a dangerous one. A hoverfly looks like a wasp but cannot sting.",
    "Mullerian mimicry|🦋|In <b>Mullerian mimicry</b> several dangerous or bad-tasting species look alike, so predators learn the warning pattern faster. Many Heliconius butterflies share patterns.",
    "A balance|⚖️|A Batesian mimic works only if the dangerous model is common enough that predators avoid the pattern. Mullerian species all gain from sharing one warning."
  ], [
    "A harmless hoverfly looks like a wasp. This is ... mimicry|Batesian|🐝||Mullerian,Darwinian",
    "Several bad-tasting species sharing a pattern is ... mimicry|Mullerian|🦋||Batesian,Darwinian",
    "In Batesian mimicry the mimic is usually...|harmless|🐝||venomous,huge",
    "In Mullerian mimicry all the species are...|dangerous or bad-tasting|⚠️||harmless,invisible",
    "Mullerian mimicry helps predators learn...|faster|🧠||slower,nothing",
    "A Batesian mimic works best when the dangerous species is...|common|⚖️||extinct,rare",
    "Why do mimics copy colors and patterns?|predators avoid the warning signal|🎨||they like paint,to be heavier",
    "A harmless snake with the red, yellow and black bands of a venomous coral snake is likely a...|Batesian mimic|🐍||Mullerian mimic,fossil"
  ], "Think about whether the copycat is harmless or dangerous."));
  a.push(L("Biological control", [
    "Natural enemies|🐞|<b>Biological control</b> uses a pest's natural enemies, such as predators, parasites or diseases, to reduce it instead of using only pesticides.",
    "Success stories|🌵|In Australia the larvae of the cactus moth helped control prickly pear cactus. Ladybugs eat aphids in gardens.",
    "Risks|⚠️|Control agents can become pests too. The cane toad was brought to Australia to eat beetles but harmed native wildlife. Today agents are tested carefully first."
  ], [
    "Using a pest's natural enemies to reduce it is...|biological control|🐞||chemical spraying,burning",
    "Ladybugs help gardeners by eating...|aphids|🐞||bees,earthworms",
    "The cane toad was brought to Australia to control...|beetles|🐸||weeds,mice",
    "The cane toad harmed...|native wildlife|⚠️||only crops,nobody at all",
    "Cactus moth larvae helped control...|prickly pear cactus|🌵||palm trees,wheat",
    "Before releasing a control agent, scientists should...|test it carefully|🔬||hope for the best,release it quickly",
    "A big risk of biological control is that the agent may...|become a pest itself|⚠️||disappear overnight,turn into a plant",
    "Compared with pesticides, a benefit of biological control is less...|chemical pollution|🧪||sunlight,water"
  ], "Think about using nature's own enemies, and what could go wrong."));
  a.push(MIX("Mixed practice", a.slice(0, 18)));
  a.push(MIX("Level 22 Challenge", a.slice(0, 18).reverse()));

  // ================= LEVEL 23 =================
  b.push(L("Top-down and bottom-up control", [
    "Who controls a food web?|🕸️|In <b>bottom-up control</b> the amount of plants and nutrients limits everything above. In <b>top-down control</b> predators limit the animals they eat.",
    "Examples|🐺|If wolves are removed, deer can boom and overgraze (top-down). If a drought cuts plant growth, fewer herbivores and predators can live there (bottom-up).",
    "Both at once|⚖️|Most ecosystems have both kinds of control. Their strength varies from place to place and from year to year."
  ], [
    "Plants and nutrients limiting the animals above them is ... control|bottom-up|⬆️||top-down,side-to-side",
    "Predators limiting the numbers of their prey is ... control|top-down|⬇️||bottom-up,sideways",
    "A drought cuts plant growth and herbivores decline. This shows...|bottom-up control|🌵||top-down control,no control",
    "Removing wolves lets deer overgraze. This shows...|top-down control|🐺||bottom-up control,mutation",
    "Most ecosystems show...|both top-down and bottom-up control|⚖️||only top-down control,only bottom-up control",
    "Fertilizer runoff makes algae boom in a pond. This is a ... effect|bottom-up|🧪||top-down,sideways",
    "Sea otters eat urchins, so kelp thrives. This is ... control|top-down|🦦||bottom-up,no",
    "A cold spring cuts insect numbers, so fewer insect-eating birds can nest. This is ... control|bottom-up|❄️||top-down,sideways"
  ], "Ask yourself whether the limit comes from the food below or the eaters above."));
  b.push(L("Character displacement", [
    "Competition changes species|🐦|<b>Character displacement</b> is when two similar species living together evolve to become more different, which lowers competition.",
    "Finch beaks|🔍|On Galapagos islands where two finch species live together, their beak sizes differ more than where each lives alone. Different beaks eat different seed sizes.",
    "The result|🎯|Over many generations natural selection favors individuals that overlap less with their rival, so the niches separate."
  ], [
    "Two similar species that evolve to be more different where they live together show...|character displacement|🐦||convergence,imprinting",
    "Character displacement lowers...|competition|⚔️||sunlight,temperature",
    "Finches living together tend to have beaks that are more...|different in size|🐦||identical,missing",
    "The process behind character displacement is...|natural selection|🧬||migration,photosynthesis",
    "Which pair is most likely to show it?|similar species sharing a habitat|🌳||species on different continents,species that never meet",
    "Character displacement helps species keep separate...|niches|🧭||birthdays,passports",
    "Character displacement happens over...|many generations|⏳||a single day,one meal",
    "Convergent evolution makes species more alike. Character displacement makes them more...|different|↔️||alike,extinct"
  ], "Think about what two similar species gain by becoming different."));
  b.push(L("Sources, sinks and metapopulations", [
    "Linked populations|🧩|A <b>metapopulation</b> is a group of local populations connected by animals moving between them.",
    "Sources and sinks|🔄|A <b>source</b> habitat has more births than deaths, so extra animals leave. A <b>sink</b> has more deaths than births and survives only because newcomers arrive.",
    "Patches blink on and off|💡|In a metapopulation, small patches can die out and later be recolonized from other patches. Corridors make this easier."
  ], [
    "A group of local populations linked by movement is a...|metapopulation|🧩||ecosystem,food chain",
    "A habitat where births exceed deaths and animals leave is a...|source|⬆️||sink,ecotone",
    "A habitat where deaths exceed births is a...|sink|⬇️||source,ecotone",
    "A sink population survives only because of...|newcomers arriving|🚶||more food,cold weather",
    "A patch that lost its animals can be recolonized from...|other patches|🔄||the sky,the future",
    "Corridors help metapopulations by letting animals...|move between patches|🛣️||sleep longer,sing louder",
    "If a source is destroyed, nearby sink populations will likely...|die out|⚠️||boom,become sources",
    "Which patch is a sink?|3 births and 8 deaths per year|🔢||8 births and 3 deaths per year,5 births and 5 deaths per year"
  ], "Compare births with deaths, and think about who moves between patches."));
  b.push(BOTH("Life tables", [
    "Following a cohort|📋|A <b>life table</b> follows a group born together (a cohort) and records how many are alive at each age.",
    "Survival rate|🔢|Survival for an age = number alive at the end / number alive at the start. Example: 80 start and 60 survive gives 60 / 80 = 0.75, or 75 percent.",
    "Replacing yourself|🔁|If each female leaves more than one daughter on average, the population grows. Exactly one means it stays steady. Less than one means it shrinks."
  ], [
    "A life table follows a group born together, called a...|cohort|📋||herd,species",
    "Survival is the number alive at the end divided by the number alive at the...|start|🔢||tail,middle",
    "If each female leaves more than 1 daughter on average, the population...|grows|📈||shrinks,stays still",
    "If each female leaves exactly 1 daughter on average, the population...|stays steady|⚖️||doubles,vanishes",
    "A life table helps scientists find which ages have the highest...|death rate|📋||temperature,volume",
    "In a cohort of 100, 25 are alive at age 2. The survival to age 2 is...|25 percent|🔢||2 percent,75 percent",
    "Survivorship curves are made from...|life table data|📉||fossils,sounds",
    "Net reproductive rate above 1 means each female more than...|replaces herself|🔁||feeds herself,defends herself"
  ], "Think about starting numbers and survivors.", "", lifet, 0.45));
  b.push(BOTH("Maximum sustainable yield", [
    "Harvesting fish|🎣|A population grows fastest at a middle size. A harvest equal to the growth can be taken again and again.",
    "MSY|📈|In the logistic model, growth is fastest at half of the carrying capacity K. The <b>maximum sustainable yield</b> is about r x K / 4 animals per year, taken when the population is near K / 2.",
    "Overshooting|⚠️|Taking more than the MSY year after year shrinks the population. Quotas try to stay under it, and managers add safety margins because real stocks change with climate and chance."
  ], [
    "Under the logistic model, growth is fastest when the population is about ... carrying capacity|half of|📈||all of,a tenth of",
    "Maximum sustainable yield is the biggest harvest that...|can be taken year after year|🎣||ever occurs in one day,kills the population",
    "Harvesting more than MSY year after year makes a population...|shrink|📉||grow faster,stay perfect",
    "Fishing quotas aim to keep catches...|under the sustainable limit|📏||as large as possible,secret",
    "Why do managers add safety margins?|stocks change with climate and chance|🌡️||fish like margins,nets are heavy",
    "If a fish population is near zero, its growth is slow because there are few...|parents|🐟||oceans,nets",
    "If a population is at carrying capacity, its growth is nearly...|zero|🛑||the fastest,infinite",
    "To harvest at MSY, managers aim to keep the population near...|half of K|📈||twice K,zero"
  ], "Think about the middle of the S-shaped growth curve.", "", msy, 0.45));
  b.push(L("Blue carbon and carbon sinks", [
    "Carbon sinks|🌊|A <b>carbon sink</b> takes in more carbon than it releases. Forests, soils and oceans can all be sinks.",
    "Blue carbon|🦀|Coastal habitats such as mangroves, salt marshes and seagrass meadows store large amounts of carbon, mostly in wet mud below them, for hundreds or thousands of years.",
    "Animals matter too|🐋|Whales, fish and shellfish move and recycle carbon. A dead whale that sinks carries carbon to the deep sea. Healthy animal populations help keep these habitats working."
  ], [
    "A habitat that takes in more carbon than it releases is a...|carbon sink|🌊||carbon source,power plant",
    "Carbon stored in coastal habitats like mangroves is called...|blue carbon|🌊||red carbon,green sand",
    "Blue carbon is stored mostly in...|wet mud|🟫||tree leaves,the air",
    "Which is a blue carbon habitat?|a seagrass meadow|🌿||a desert dune,a rooftop",
    "A dead whale sinking to the deep sea carries ... down|carbon|🐋||sunlight,sound",
    "Clearing mangroves can release stored carbon dioxide into the...|air|💨||soil,rocks",
    "Mangroves also protect coasts and shelter young...|fish|🐟||camels,cars",
    "Carbon sinks help slow...|climate warming|🌡️||the tides,sunrise"
  ], "Think about where carbon is stored along coasts."));
  b.push(L("Noise and light pollution", [
    "Human noise|🔊|Ships, sonar and construction create noise that masks animal sounds. Whales may call louder, move away, or fail to find food and mates.",
    "Artificial light|💡|Night lights confuse sea turtle hatchlings, which crawl toward the brightest horizon (normally the sea). Lights also pull in insects, throw off migrating birds, and change when animals sleep and hunt.",
    "Solutions|✅|Shielded lights pointed down, turtle-safe lighting, quieter ships and seasonal limits on loud work all help."
  ], [
    "Loud ship noise can mask the calls of...|whales|🐋||clouds,rocks",
    "Baby sea turtles crawl toward the brightest horizon, which should be the...|sea|🐢||road,hotel",
    "Bright lights on land can lead hatchlings...|away from the sea|💡||toward the sea faster,underground",
    "Birds migrating at night can be confused by...|city lights|🌃||rain,tides",
    "Noise can make animals miss calls from...|mates and predators|📢||trees only,mirrors",
    "Which lighting helps wildlife most?|shielded lights pointed down|⬇️||bright lights pointing up,flashing colored lights",
    "Light pollution can change when animals...|sleep and hunt|🌙||get taller,speak",
    "Quieter ships and slower speeds reduce harm to...|marine animals|🚢||desert plants,satellites"
  ], "Think about how human sounds and lights disturb the senses animals rely on."));
  b.push(L("Captive breeding and genetic rescue", [
    "Breeding in zoos|🏞️|<b>Captive breeding</b> raises endangered animals in zoos or centers, then releases some into the wild. California condors and black-footed ferrets were saved this way.",
    "Genetic rescue|🧬|Small populations lose genetic variety. In <b>genetic rescue</b>, animals from another group are added to bring in new genes. Florida panthers improved after pumas from Texas were introduced.",
    "Studbooks|📒|A <b>studbook</b> records every animal's parents so breeders can pair animals that are not close relatives and keep as much variety as possible."
  ], [
    "Raising endangered animals in zoos to release later is...|captive breeding|🏞️||habitat loss,migration",
    "A record of every animal's parents is a...|studbook|📒||passport,menu",
    "Bringing in animals from another group to add new genes is...|genetic rescue|🧬||inbreeding,pollination",
    "Florida panthers recovered after pumas from ... were added|Texas|🐆||Alaska,Maine",
    "Breeders pair animals that are not close...|relatives|👪||friends,sizes",
    "Which species was saved from near extinction by captive breeding?|California condor|🦅||house sparrow,pigeon",
    "A problem with captive breeding is that animals may not learn wild...|survival skills|🧠||dance moves,recipes",
    "Small populations lose variety, and genetic rescue helps by adding new...|genes|🧬||paint,walls"
  ], "Think about helping very small populations and keeping their genes varied."));
  b.push(L("Making and losing heat", [
    "Making heat|🔥|Endotherms make heat inside by metabolism. When cold they can shiver: muscles contract rapidly and give off heat without moving the body much.",
    "Brown fat|🟤|<b>Brown fat</b> has many mitochondria that burn fuel directly into heat instead of storing energy. Hibernating mammals and newborn mammals use it to warm up.",
    "Cooling off|💦|Animals cool down by panting, sweating (horses, humans), licking, flapping ears, or lying in shade and mud. Evaporating water carries heat away."
  ], [
    "Shivering warms an animal because muscle contractions give off...|heat|🥶||light,sound",
    "A tissue that burns fuel directly into heat is...|brown fat|🟤||white bone,gray hair",
    "Brown fat cells have many...|mitochondria|🔬||wings,claws",
    "Dogs cool down mainly by...|panting|🐕||shivering,fluffing fur",
    "Evaporating water cools an animal because it carries away...|heat|💦||color,salt",
    "Which animal sweats to cool down?|a horse|🐴||a dog,a rabbit",
    "Newborn mammals and hibernators rely on ... to warm up|brown fat|🧸||white feathers,sunscreen",
    "Elephants and rabbits lose heat through their large...|ears|🐘||tusks,tails"
  ], "Think about how an animal makes heat, or how it gets rid of extra heat."));
  b.push(L("Sensory receptors", [
    "Types of receptors|👁️|<b>Photoreceptors</b> detect light, <b>chemoreceptors</b> detect chemicals (taste and smell), <b>mechanoreceptors</b> detect touch, pressure, sound and motion, <b>thermoreceptors</b> detect heat, and <b>electroreceptors</b> detect electric fields.",
    "Transduction|⚡|A receptor turns a stimulus into a nerve signal. This is <b>sensory transduction</b>. The brain then interprets the signals.",
    "Special cases|🐍|Pit vipers have heat-sensing pits that detect infrared. Sharks have electroreceptors. Catfish have taste buds all over their bodies."
  ], [
    "Cells that detect light are...|photoreceptors|👁️||mechanoreceptors,chemoreceptors",
    "Cells that detect smell and taste are...|chemoreceptors|👃||thermoreceptors,photoreceptors",
    "Cells that detect touch and sound vibrations are...|mechanoreceptors|👂||electroreceptors,photoreceptors",
    "Pit vipers sense warm prey using...|thermoreceptors|🐍||electroreceptors,photoreceptors",
    "Sharks sense weak electric fields with...|electroreceptors|🦈||photoreceptors,thermoreceptors",
    "Turning a stimulus into a nerve signal is...|sensory transduction|⚡||photosynthesis,digestion",
    "Catfish taste with sensors across their...|whole body|🐟||tail only,teeth only",
    "The heat-sensing pits of pit vipers detect ... radiation|infrared|🔥||ultraviolet,radio"
  ], "Match the kind of stimulus to the kind of receptor."));
  b.push(L("Reciprocal altruism", [
    "Help now, repaid later|🤝|In <b>reciprocal altruism</b> an animal helps an unrelated animal and expects help back later. It can evolve when animals meet again and again and can recognize each other.",
    "Vampire bats|🦇|Vampire bats that fed well share blood meals with roost mates that failed to feed, and the favor is often returned later.",
    "Cheaters|🕵️|If cheats were never punished they would win. So animals keep track and stop helping those who never return favors. A simple rule is <b>tit-for-tat</b>: start kind, then copy the partner's last move."
  ], [
    "Helping an unrelated animal and being repaid later is...|reciprocal altruism|🤝||kin selection,camouflage",
    "Vampire bats share ... with roost mates|blood meals|🦇||nests,songs",
    "Reciprocal altruism needs animals that meet...|again and again|🔁||only once,never",
    "It also needs animals to be able to...|recognize each other|🧐||fly high,read books",
    "In tit-for-tat, an animal starts by being...|kind|😊||selfish,silent",
    "In tit-for-tat, after the first move, the animal copies the partner's...|last move|🔁||first name,age",
    "Kin selection helps relatives. Reciprocal altruism helps...|non-relatives who return favors|🤝||only offspring,only enemies",
    "A cheater that never returns favors may be...|refused help later|🚫||thanked,promoted"
  ], "Think about favors that are paid back, and animals that remember."));
  b.push(BOTH("Eusociality and relatedness", [
    "Eusociality|🐝|<b>Eusocial</b> species have a queen or a few breeders, workers who raise others' young, and overlapping generations. Honeybees, ants, termites and naked mole-rats are eusocial.",
    "Haplodiploidy|🧬|In bees, ants and wasps, females come from fertilized eggs (two sets of chromosomes) and males from unfertilized eggs (one set). Full sisters share about 75 percent of their genes, a mother and daughter share 50 percent.",
    "Hamilton's rule|📐|Helping can evolve when <b>r x B &gt; C</b>: r = relatedness, B = benefit to the relative, C = cost to the helper. Termites are eusocial but not haplodiploid, so relatedness is not the whole story."
  ], [
    "Which animal is eusocial?|the naked mole-rat|🐀||the house cat,the eagle",
    "Honeybee males (drones) come from...|unfertilized eggs|🥚||fertilized eggs,larvae only",
    "Full sister bees share on average about ... of their genes|75 percent|🐝||50 percent,25 percent",
    "A mother shares about ... of her genes with each of her children|50 percent|🧍||25 percent,75 percent",
    "Eusocial colonies have workers who...|raise others' young|🐜||fight each other only,never work",
    "Termites are eusocial but not haplodiploid, which shows haplodiploidy is...|not the only explanation|🔍||the only explanation,impossible",
    "A eusocial colony has a ... that does most of the egg laying|queen|👑||worker,soldier",
    "In bees, males have ... set of chromosomes|one|🧬||two,three"
  ], "Think about who is related to whom, and who does the work.", "", hamil, 0.4));
  b.push(L("Brood parasites", [
    "Cuckoos and cowbirds|🥚|A <b>brood parasite</b> lays its eggs in another bird's nest so the host raises the young. Cuckoos and cowbirds do this.",
    "Tricks|🎭|Cuckoo eggs often copy the host's eggs in color and pattern. A common cuckoo chick may push the host's eggs out of the nest and beg loudly.",
    "An arms race|⚔️|Hosts evolve defenses: they may recognize and eject odd eggs, or abandon the nest. Parasites then evolve better copies, a coevolution cycle."
  ], [
    "A bird that lays eggs in another bird's nest is a...|brood parasite|🥚||pollinator,scavenger",
    "Cuckoo eggs often copy the host's egg...|colors and patterns|🎨||songs,flavors",
    "A host can defend by ... odd eggs|ejecting|🚮||feeding,naming",
    "A common cuckoo chick may push host eggs...|out of the nest|🪺||into a bigger nest,into a tree hole",
    "Which bird is a brood parasite?|a cowbird|🐦||a robin,a swan",
    "The back-and-forth change of parasite tricks and host defenses is...|coevolution|🔄||metamorphosis,migration",
    "Cuckoo chicks beg loudly, which makes host parents bring...|more food|🍛||less food,toys",
    "A brood parasite saves energy by not having to build a...|nest|🪺||wing,song"
  ], "Think about a bird that gets another bird to raise its chicks."));
  b.push(L("Swarm intelligence", [
    "Simple rules|🐜|In <b>swarm intelligence</b> no single animal is in charge. Each follows simple rules and reacts to its neighbors, and the group does smart things.",
    "Ant trails|🛤️|Ants lay chemical trails of pheromones. Shorter routes are traveled more often, so more pheromone builds up and the colony settles on good paths.",
    "Bees choosing a home|🏠|Honeybee scouts find nest sites and dance for the best ones. When enough scouts agree (a quorum), the swarm moves there."
  ], [
    "In swarm intelligence, who is in charge?|no single animal|🐜||the biggest animal,a boss bird",
    "Ant trails build up because ants leave...|pheromones|🧪||magnets,sound waves",
    "Shorter routes get more pheromone because ants travel them more...|often|🔁||slowly,secretly",
    "Honeybee scouts communicate about nest sites with...|dances|💃||pictures,letters",
    "When enough scouts agree on a site, they have reached a...|quorum|🗳️||recipe,fossil",
    "Fish in a school turn together because each fish follows its...|neighbors|🐟||leader only,shadow",
    "Swarm intelligence uses simple rules and ... between animals|local interactions|🔗||long speeches,money",
    "A benefit of swarm decisions is that mistakes by single animals are...|averaged out|📊||copied by all,celebrated"
  ], "Think about many animals following simple rules with no boss."));
  b.push(L("Safety in groups", [
    "Many eyes|👀|In a group, someone is more likely to spot a predator, so each animal can spend more time feeding. This is the <b>many-eyes effect</b>.",
    "Dilution and confusion|🐟|<b>Dilution effect</b>: with many animals around, the chance that you are the one caught drops. <b>Confusion effect</b>: a swirling school makes it hard for a predator to pick one target.",
    "Costs|⚠️|Groups can attract predators, spread disease and share limited food. Animals balance these costs against the benefits."
  ], [
    "In a big group, each animal can spend more time feeding because of the ... effect|many-eyes|👀||big-stomach,loud-voice",
    "The chance that you are the one caught gets smaller in a bigger group. This is the ... effect|dilution|💧||evaporation,rainbow",
    "A swirling school that makes it hard to pick one fish is the ... effect|confusion|🌀||dilution,feeding",
    "A cost of living in a group is more...|disease spreading|🤒||sunshine,silence",
    "A solitary animal needs to spend more time...|watching for danger|👁️||sleeping,singing",
    "Meerkat sentinels stand guard so the rest can...|feed|🦡||swim,fly",
    "Larger flocks of birds spot an approaching hawk...|earlier|🕊️||later,never",
    "An alarm call warns the group but a risk to the caller is that it may...|attract the predator|📢||grow bigger,lose color"
  ], "Think about what a bigger group does for each member."));
  b.push(L("Tool use and innovation", [
    "Tools in nature|🪛|A tool is an object used to change something. New Caledonian crows shape twigs and leaves into hooks to get grubs. Chimpanzees fish for termites with twigs and crack nuts with stones.",
    "More tool users|🦦|Sea otters crack shells on stones. Some dolphins wear sponges on their snouts while hunting on the seafloor. Veined octopuses carry coconut shell halves as shelter.",
    "Innovation|💡|<b>Innovation</b> is solving a new problem in a new way. If others copy it, it can spread as culture. Scientists test problem solving with puzzle boxes."
  ], [
    "New Caledonian crows make hooks from...|twigs and leaves|🐦||rocks only,metal ore",
    "Chimpanzees fish for termites with...|twigs|🐒||boats,keys",
    "Sea otters crack shells using...|stones|🦦||seaweed,sand",
    "Some dolphins wear ... on their snouts to forage on the seafloor|sponges|🐬||seaweed,shells",
    "Veined octopuses carry ... as shelter|coconut shells|🐙||tires,boxes",
    "Solving a new problem in a new way is...|innovation|💡||instinct,migration",
    "When others copy an innovation, it can spread as...|culture|👥||weather,gravity",
    "Scientists test problem solving with...|puzzle boxes|🧩||paint,mirrors"
  ], "Think about animals that use objects, or solve something new."));
  b.push(L("Ethograms and sampling", [
    "Describing behavior|📝|An <b>ethogram</b> is a list of all the behaviors of a species, each clearly defined (like 'grooming' or 'resting') so observers record things the same way.",
    "Sampling methods|⏲️|<b>Focal sampling</b>: watch one animal for a set time. <b>Scan sampling</b>: at set times, note what every visible animal is doing. <b>Ad libitum</b>: write down anything interesting without a plan.",
    "Time budgets|🥧|Add up the time spent on each behavior to make a <b>time budget</b>, like 40 percent feeding, 30 percent resting, 20 percent moving and 10 percent social."
  ], [
    "A list of clearly defined behaviors of a species is an...|ethogram|📝||atlas,almanac",
    "Watching one animal for a set time is ... sampling|focal|🔍||scan,ad libitum",
    "Noting what every visible animal does at set times is ... sampling|scan|📸||focal,random",
    "Writing down anything interesting with no fixed plan is ... sampling|ad libitum|📓||scan,focal",
    "A summary of how an animal spends its day is a...|time budget|🥧||food web,map",
    "Why define each behavior clearly?|so observers record things the same way|📏||to make it longer,to hide data",
    "An animal rests 6 hours of a 24-hour day. That is ... of its day|one quarter|⏰||one half,one tenth",
    "If observers cannot agree what 'play' is, the data will be...|unreliable|⚠️||perfect,colorful"
  ], "Think about how to watch animals fairly and record what you see."));
  b.push(BOTH("Chi-square for animal data", [
    "Is it just luck?|🎲|A <b>chi-square test</b> compares what you observed (O) with what you expected (E). Chi-square = the sum of (O - E)^2 / E for each group.",
    "A worked example|🧮|Expect 50 male and 50 female pups. You see 60 and 40. Males: 10 x 10 / 50 = 2. Females: 10 x 10 / 50 = 2. Total chi-square = 4.",
    "Reading the result|📊|A bigger chi-square means observed and expected differ more. For two groups, a value above 3.84 is unlikely to be chance (p under 0.05)."
  ], [
    "In chi-square, O stands for...|observed|👀||organized,occasional",
    "In chi-square, E stands for...|expected|🔮||extinct,evolved",
    "A bigger chi-square value means observed and expected numbers are...|further apart|📏||closer together,identical",
    "For two groups, a chi-square above 3.84 suggests the difference is probably...|not just chance|🎲||just chance,impossible",
    "If observed numbers equal expected numbers exactly, chi-square is...|zero|🟰||one,infinite",
    "Chi-square helps check whether data fit an expected...|ratio|🧬||map,song",
    "Chi-square squares each difference so that negatives do not...|cancel out|²||get counted,matter",
    "A 3 to 1 cross among 80 offspring expects how many in the larger group?|60|🧬||40,20"
  ], "Think about comparing counts you saw with counts you expected.", "", chi, 0.4));
  b.push(MIX("Mixed practice", b.slice(0, 18)));
  b.push(MIX("Level 23 Challenge", b.slice(0, 18).reverse()));

  // ================= LEVEL 24 =================
  c.push(L("Reproductive isolation", [
    "Keeping species apart|🚧|<b>Prezygotic barriers</b> stop mating or fertilization: different habitats, breeding seasons, courtship signals, body fit, or gametes that cannot join. <b>Postzygotic barriers</b> act after the egg is fertilized: hybrids may die, be weak, or be sterile.",
    "The mule|🐴|A horse and a donkey can mate, but their offspring, a mule, is almost always sterile.",
    "Songs and lights|✨|Different firefly species flash different patterns, and frog species use different calls. These behavioral barriers help keep species separate."
  ], [
    "Barriers that act before fertilization are...|prezygotic|⏮️||postzygotic,gastric",
    "Barriers that act after fertilization are...|postzygotic|⏭️||prezygotic,dynamic",
    "Different firefly flash patterns are a...|behavioral barrier|✨||geographic barrier,postzygotic barrier",
    "A mule is almost always...|sterile|🐴||fertile,striped",
    "Two species that breed in different seasons are kept apart by a ... barrier|timing|📅||habitat,body-shape",
    "Body parts that do not fit together make a ... barrier|mechanical|🔧||behavioral,timing",
    "Hybrids that die as embryos show a ... barrier|postzygotic|⚠️||prezygotic,behavioral",
    "Sperm that cannot fertilize another species' egg is a ... barrier|gametic|🧬||habitat,timing"
  ], "Ask yourself whether the barrier works before or after the egg is fertilized."));
  c.push(L("Adaptive radiation and key innovations", [
    "A burst of new species|🌿|<b>Adaptive radiation</b> is a burst of new species from one ancestor as they fill many empty niches. It often follows arrival in a new habitat, or a mass extinction.",
    "Examples|🦎|Darwin's finches in the Galapagos, cichlid fishes in African lakes, Hawaiian honeycreepers, and the mammals after the dinosaurs.",
    "Key innovation|🔑|A <b>key innovation</b> is a new trait that opens new ways of living, like feathers for flight or the extra throat jaws of cichlid fishes."
  ], [
    "A burst of many new species from one ancestor filling many niches is...|adaptive radiation|🌿||convergent evolution,extinction",
    "Which group radiated into hundreds of species in African lakes?|cichlid fishes|🐟||penguins,camels",
    "Hawaiian honeycreepers are birds that radiated on...|an island chain|🏝️||a desert,a glacier",
    "Mammals radiated after the dinosaurs because many niches were...|empty|🦣||crowded,frozen",
    "A new trait that opens new ways of living is a...|key innovation|🔑||fossil,niche",
    "Which could be a key innovation?|feathers for flight|🪶||a sunny day,a bigger nest",
    "Adaptive radiation often follows colonizing a new...|island or lake|🏝️||zoo,school",
    "In a radiation, species differ mainly in how they use...|resources|🍽️||clothes,languages"
  ], "Think about one ancestor spreading into many empty niches."));
  c.push(L("Punctuated equilibrium", [
    "Two patterns|📈|<b>Gradualism</b>: species change slowly and steadily. <b>Punctuated equilibrium</b>: species stay much the same for long periods (stasis), then change in short bursts, often when a new species forms.",
    "Fossil clues|🦴|Fossil records often show a species staying the same for millions of years, then new forms appearing quickly in geologic time. This fits punctuated equilibrium, proposed by Eldredge and Gould in 1972.",
    "Both happen|⚖️|Most biologists think both patterns occur. 'Quick' on a geologic scale can still mean thousands of generations, not a sudden jump."
  ], [
    "Slow, steady change is called...|gradualism|🐌||stasis,extinction",
    "Long periods of little change are called...|stasis|⏸️||radiation,mutation",
    "Species staying the same, then changing in bursts, fits...|punctuated equilibrium|📈||gradualism,spontaneous generation",
    "Punctuated equilibrium was proposed by Eldredge and...|Gould|📖||Mendel,Linnaeus",
    "Fast evolutionary change in geologic time may still take...|thousands of generations|⏳||one afternoon,one breath",
    "A fossil record with gaps can make evolution look...|jumpy|🦴||perfectly smooth,reversed",
    "Most biologists think evolution has...|both patterns|⚖️||only gradualism,neither pattern",
    "In punctuated equilibrium, new species often form during...|short bursts|⚡||long stasis,no time"
  ], "Think about long calm periods and short bursts of change."));
  c.push(L("Heterochrony and neoteny", [
    "Timing changes|⏱️|<b>Heterochrony</b> is a change in the timing or speed of development between an ancestor and its descendant. Small timing changes can change body shape a lot.",
    "Neoteny|🦎|In <b>neoteny</b> a young trait stays into adulthood. An axolotl keeps its gills and tail fin as a breeding adult and stays in water.",
    "People too?|🧍|Some scientists think humans keep juvenile features compared with chimpanzees, such as a flatter face and rounder head, and that timing changes helped shape our evolution."
  ], [
    "A change in the timing or speed of development is...|heterochrony|⏱️||heterozygosity,homeostasis",
    "Keeping juvenile traits as an adult is called...|neoteny|🦎||metamorphosis,hibernation",
    "An axolotl keeps ... as an adult|gills|🦎||wings,fur",
    "Axolotls usually live in...|water|💧||trees,deserts",
    "Small changes in timing can cause large changes in...|body shape|📐||the Moon,the season",
    "Some scientists think humans keep juvenile features like a...|flatter face|🧍||longer snout,thick tail",
    "An animal that never completes its change to the usual adult form shows...|neoteny|🐸||migration,instinct",
    "Heterochrony compares the development of an ancestor and its...|descendant|🌳||neighbor,dinner"
  ], "Think about development speeding up, slowing down, or staying juvenile."));
  c.push(L("Sexual conflict and sperm competition", [
    "Different interests|⚔️|<b>Sexual conflict</b> happens when males and females gain from different outcomes, such as how often to mate or who should care for young. It can drive an arms race of traits.",
    "Sperm competition|🏁|If a female mates with several males, their sperm compete to fertilize the eggs. In species where this is common, males tend to make more sperm.",
    "Coevolution inside a species|🔄|Each sex evolves new tricks and the other evolves counter-tricks. This can speed up the formation of new species."
  ], [
    "Sexual conflict happens when males and females benefit from...|different outcomes|⚔️||the same outcome,no outcome",
    "Competition between sperm of different males inside one female is...|sperm competition|🏁||sexual mimicry,pair bonding",
    "Species where females mate with many males tend to have males that make more...|sperm|🏁||feathers,milk",
    "Sexual conflict can cause an ... of traits|arms race|⚔️||food web,extinction",
    "Sexual conflict is a kind of coevolution within...|one species|🔄||two oceans,one cell",
    "Sexual conflict can speed up the formation of new...|species|🌱||clouds,tools",
    "If females mate with only one male, sperm competition will be...|weak|1️⃣||strong,huge",
    "A conflict over care can happen because each parent does better if the...|other parent works harder|🍼||both parents do all the work,neither parent eats"
  ], "Think about two sexes whose best outcomes are not the same."));
  c.push(L("Life history trade-offs", [
    "Limited energy|⚖️|An animal has limited energy. Energy spent on growth, reproduction and staying alive cannot be spent on the others. These are <b>trade-offs</b>.",
    "Once or many times|🐟|<b>Semelparous</b> animals reproduce once and then die (Pacific salmon, many octopuses). <b>Iteroparous</b> animals breed many times (most mammals and birds).",
    "Few big or many small|🥚|More offspring means fewer resources for each one. Sea turtles lay many small eggs. Albatrosses lay a single egg and invest heavily in it."
  ], [
    "Using energy for one thing leaves less for another. This is a...|trade-off|⚖️||habitat,reflex",
    "Reproducing once and then dying is called...|semelparity|🐟||iteroparity,symbiosis",
    "Reproducing many times is called...|iteroparity|🐦||semelparity,migration",
    "Which animal is semelparous?|Pacific salmon|🐟||an elephant,an eagle",
    "Which animal is iteroparous?|a wolf|🐺||Pacific salmon,a mayfly",
    "Many small eggs usually means each offspring gets...|less care|🥚||more care,gold",
    "An albatross lays one egg and invests a lot in it, a ... strategy|few-and-big|🕊️||many-and-tiny,no-egg",
    "Heavy breeding can reduce...|the parent's own survival|⚖️||the sunlight,the Moon"
  ], "Think about energy that can only be spent once."));
  c.push(L("Why animals age", [
    "Aging is common|⏳|Most animals show <b>senescence</b>: body function declines with age. Why would natural selection allow this?",
    "Weak selection late in life|🧬|After most animals have bred (or died by accident), a gene that harms only late in life is not removed. Some genes may help early and hurt later (<b>antagonistic pleiotropy</b>).",
    "Slow agers|🦇|Animals that are well protected, such as bats, tortoises and animals with shells or flight, often live longer for their size. Lifespan follows outside danger, not only body size."
  ], [
    "The decline of body function with age is...|senescence|⏳||metamorphosis,hibernation",
    "A gene that helps early in life but harms later is an example of...|antagonistic pleiotropy|🧬||adaptive radiation,genetic drift",
    "Natural selection is weaker on genes that act only...|late in life|⏳||at birth,in embryos",
    "Animals with low outside danger, like bats, tend to live...|longer than expected|🦇||shorter than expected,exactly one year",
    "Which usually lives longer for its size?|a bat|🦇||a mouse,a rabbit",
    "Many mice die young from predators, so selection on late-life genes is...|weak|🐭||strong,paused",
    "Animals that invest heavily in early reproduction often have ... lifespans|shorter|📉||longer,unchanging",
    "The idea that damage builds up with age is called...|wear and tear|🔧||instinct,echo"
  ], "Think about why selection cannot remove every harm that shows up late in life."));
  c.push(L("Island gigantism and dwarfism", [
    "The island rule|🏝️|On islands, small animals often evolve to be larger (gigantism) and large animals often evolve to be smaller (dwarfism). This pattern is called the <b>island rule</b>.",
    "Examples|🐘|Dwarf elephants and dwarf hippos once lived on Mediterranean islands. Giant tortoises live on islands like the Galapagos. Komodo dragons live only on a few Indonesian islands.",
    "Why?|🤔|Few predators and competitors let small animals grow big. Limited food makes large animals shrink, since smaller bodies need less."
  ], [
    "On islands, small animals often evolve to be...|larger|⬆️||smaller,invisible",
    "On islands, large animals often evolve to be...|smaller|⬇️||larger,faster",
    "The pattern of island size changes is the...|island rule|🏝️||island clock,tide table",
    "Dwarf elephants once lived on islands in the...|Mediterranean|🐘||Arctic,Sahara",
    "Why can small island animals grow big?|few predators and competitors|🏝️||constant snow,loud storms",
    "Why can big island animals shrink?|limited food|🍃||too many predators,magnetism",
    "Giant tortoises live on islands like...|the Galapagos|🐢||the Arctic,the Sahara",
    "Gigantism and dwarfism are changes in...|body size|📏||eye color,song"
  ], "Think about what is different on a small island: predators, rivals and food."));
  c.push(L("Founder effect and bottlenecks", [
    "Small starts|🧬|The <b>founder effect</b>: a few individuals start a new population, carrying only a small sample of the original population's genes.",
    "Bottleneck|🍾|A <b>bottleneck</b> is a sharp drop in population size. Survivors carry only part of the original genetic variety, even after numbers recover.",
    "Examples|🦭|Northern elephant seals were hunted down to perhaps 20 to 100 animals by the 1890s. Today there are hundreds of thousands, but they have very low genetic variety."
  ], [
    "When a few individuals start a new population, we call it the...|founder effect|🧬||bottleneck,arms race",
    "A sharp drop in population size is a...|bottleneck|🍾||founder,radiation",
    "After a bottleneck, genetic variety is usually...|lower|📉||higher,unchanged",
    "Northern elephant seals today have very low...|genetic variety|🦭||body weight,appetite",
    "The founder effect and bottlenecks are both examples of...|genetic drift|🎲||natural selection,migration",
    "A new island population started by 5 birds has ... than the mainland group|less genetic variety|🏝️||more genetic variety,the same genes exactly",
    "Low genetic variety makes a population more at risk from...|new diseases|🦠||sunshine,tides",
    "Once a bottleneck is over, the lost variety...|is not quickly regained|🔒||returns the next day,is copied from other species"
  ], "Think about a small group carrying only some of the original genes."));
  c.push(L("Ecosystem engineers", [
    "Builders|🦫|<b>Ecosystem engineers</b> change the habitat in ways that help or harm other species. Beavers build dams that create ponds and wetlands.",
    "Other engineers|🐜|Earthworms mix and aerate soil, prairie dogs dig burrows used by other animals, corals build reefs, and elephants knock down trees and open up savanna.",
    "Big effects|🏘️|Engineers can raise biodiversity by creating new habitats, but too much change can harm some species. Removing or adding one engineer can reshape an ecosystem."
  ], [
    "An animal that changes the habitat for other species is an...|ecosystem engineer|🦫||apex predator,decomposer",
    "Beavers create ponds with...|dams|🌊||tunnels,fences",
    "Prairie dog burrows are also used by...|other animals|🐕||airplanes,trees",
    "Corals act as engineers by building...|reefs|🪸||dams,nests",
    "Elephants help open grassland by knocking down...|trees|🐘||clouds,rocks",
    "Earthworms help soil by mixing it and adding...|air|🪱||gold,sound",
    "A beaver pond can raise biodiversity by creating...|new habitats|🦆||deserts,silence",
    "Engineers differ from predators because they mainly change...|the physical habitat|🏗️||their prey's DNA,the Moon"
  ], "Think about animals that build or reshape the place others live in."));
  c.push(L("Phenology and mismatch", [
    "Timing of life events|📅|<b>Phenology</b> is the timing of seasonal events such as flowering, insect emergence, bird arrival and breeding.",
    "Warming shifts timing|🌡️|Warmer springs make plants leaf out and insects emerge earlier. If birds use other cues, like day length, they may arrive too late. This is <b>phenological mismatch</b>.",
    "Hungry chicks|🐦|In some places in Europe, pied flycatcher chicks hatch after the caterpillar peak, so the chicks have less food."
  ], [
    "The timing of seasonal events is called...|phenology|📅||geology,anatomy",
    "A mismatch occurs when animals and their food peak at...|different times|📅||the same time,midnight",
    "Birds that rely on day length may not react to...|warmer springs|🌡️||rainbows,echoes",
    "Warmer springs make many insects emerge...|earlier|🐛||later,never",
    "Chicks hatching after the caterpillar peak is an example of...|mismatch|🐛||camouflage,imprinting",
    "Day length is the same each year on a date, but spring temperature...|varies|🌡️||never varies,disappears",
    "Mismatch can reduce chick...|survival|🐣||singing practice,cuteness",
    "Scientists track phenology using long-term records of when events happen, like first...|flowering|🌸||lunches,homework"
  ], "Think about timing: when food appears and when the animals need it."));
  c.push(L("Range shifts and refugia", [
    "Moving with climate|🧭|As climate warms, many species shift their ranges toward the poles and uphill to stay in their preferred temperatures.",
    "Limits|🏔️|Mountain species may run out of mountain. Island species and slow-spreading species cannot move fast enough. Cities and farms block paths.",
    "Refugia|🛟|A <b>climate refugium</b> (plural: refugia) is a place that stays relatively stable, like a deep valley or a cold ocean pocket. It can shelter species, so protecting refugia and the corridors to them is a key plan."
  ], [
    "As climate warms, species often move toward the...|poles|🧭||equator,center of the Earth",
    "On mountains, species often move...|uphill|⛰️||downhill,in circles",
    "Species at the top of a mountain may have nowhere left to...|move|🏔️||sleep,sing",
    "A place that stays relatively stable as climate changes is a...|refugium|🛟||volcano,highway",
    "Roads and farms can block species from...|moving|🛣️||sleeping,singing",
    "Species that spread slowly are at higher risk because they cannot...|move fast enough|🐌||breathe,hear",
    "Moving toward the poles helps species stay in...|cooler conditions|🥶||hotter conditions,darker caves",
    "Wildlife corridors help range shifts by connecting habitat...|patches|🛣️||parking lots,oceans"
  ], "Think about where a species goes when its home gets too warm."));
  c.push(L("Extinction debt", [
    "Delayed loss|⌛|<b>Extinction debt</b> is the future loss of species caused by past habitat loss. After a habitat shrinks, some species hang on for years or decades before the last individuals die.",
    "Why the delay|🌳|Long-lived animals can survive for years even when there are too few for the population to recover. Small populations decline slowly.",
    "A chance to act|🛠️|Because the extinctions are delayed, restoring habitat and reconnecting patches soon enough can still rescue some species."
  ], [
    "Future species loss caused by past habitat loss is called...|extinction debt|⌛||radiation debt,mass extinction",
    "Extinction debt means losses may come...|years or decades later|⏳||the same minute,never",
    "Long-lived animals can survive for years even after the population can no longer...|recover|🐢||sleep,float",
    "Because the loss is delayed, restoring habitat can still...|save some species|🛠️||make no difference ever,cause extinction",
    "Which animals are most likely to show a long delay before disappearing?|long-lived species|🐢||mayflies,bacteria",
    "Extinction debt shows why counting only today's species can...|underestimate future loss|📉||predict the weather,count the Sun",
    "Reconnecting habitat patches can reduce extinction...|debt|🔗||bank,carbon",
    "The first step to pay off extinction debt is to stop more...|habitat loss|🛑||sunshine,rainfall"
  ], "Think about losses that are already on their way but have not happened yet."));
  c.push(L("Human-wildlife conflict", [
    "Sharing space|🐘|<b>Human-wildlife conflict</b> happens when animals harm people's crops, livestock or safety, and people harm animals in return. It grows as people and wildlife share more space.",
    "Solutions|🐝|Beehive fences keep elephants out of fields because elephants avoid bees. Guard dogs and night corrals protect livestock, and compensation programs pay farmers for losses.",
    "Working with communities|🤝|Programs work best when local people help plan them, earn income from wildlife and see the benefits. People who lose crops are less likely to support protection."
  ], [
    "Human-wildlife conflict often involves damage to crops and...|livestock|🐄||movies,lakes",
    "Beehive fences keep ... away from farms|elephants|🐘||mice,sharks",
    "Why do beehive fences work?|elephants avoid bees|🐝||bees eat elephants,bees paint fences",
    "Night corrals protect livestock from...|predators|🏠||storm clouds,shadows",
    "Programs work best when local people help...|plan them|🗣️||avoid them,ignore them",
    "Compensation payments help farmers who lose...|crops or animals|💰||homework,sleep",
    "People who suffer losses are ... likely to support wildlife protection|less|📉||more,equally",
    "Conflict tends to grow as people and wildlife share more...|space|🗺️||songs,recipes"
  ], "Think about people and wildlife competing for the same land, and how to share it."));
  c.push(L("Brain size and encephalization", [
    "Brain and body|🧠|Bigger animals have bigger brains, but brain size alone is not the whole story. <b>Encephalization</b> is brain size compared with what is expected for the body size.",
    "A costly tissue|🔥|Brain tissue uses lots of energy. A human brain is only about 2 percent of body weight but uses about 20 percent of the body's energy.",
    "Who ranks high|🐬|Humans, dolphins, apes and crows rank high for brain size compared with body size. Birds have very tightly packed neurons in the forebrain."
  ], [
    "Brain size compared with what is expected for body size is...|encephalization|🧠||evaporation,migration",
    "A human brain uses about ... of the body's energy|20 percent|⚡||2 percent,80 percent",
    "A human brain is about ... of body weight|2 percent|⚖️||20 percent,50 percent",
    "Why is a big brain costly?|it uses lots of energy|🔥||it weighs a ton,it glows",
    "Which animals rank high for brain size relative to body size?|dolphins and apes|🐬||sponges and corals,clams and oysters",
    "Crows are smart even with small brains because they have many ... packed densely|neurons|🐦||bones,feathers",
    "Large animals have large brains partly because they must control...|a big body|🐘||a small body,a tiny shell",
    "An animal's brain is highly encephalized if it is large for its...|body size|📏||color,age"
  ], "Think about brain size compared with the size of the whole animal."));
  c.push(BOTH("Heritability and selection", [
    "Heritability|🧬|<b>Heritability (h²)</b> is the share of variation in a trait that comes from genes, from 0 to 1. A trait with h² = 0 will not respond to selection.",
    "Predicting change|📈|<b>Response to selection R = h² x S</b>. S is the selection differential: the average of the animals chosen to breed minus the average of the whole group.",
    "Example|🐄|Cows average 20 L of milk. Breeders pick cows averaging 30 L, so S = 10. With h² = 0.4, R = 0.4 x 10 = 4 L, so the next generation averages 24 L."
  ], [
    "Heritability is a number between 0 and...|1|🔢||10,100",
    "If h² = 0, selection will cause ... change|no|🚫||huge,fast",
    "Response to selection is R = h² x...|S|✖️||K,N",
    "S is the difference between the chosen parents' average and the ... average|whole group's|📊||smallest animal's,tallest animal's",
    "A trait mostly caused by the environment has ... heritability|low|🌱||high,perfect",
    "A trait mostly determined by genes has ... heritability|high|🧬||low,zero",
    "Breeders chasing a trait with low heritability will see ... progress|slow|🐢||fast,instant",
    "Selection can only change a trait if it varies and is...|heritable|🧬||colorful,expensive"
  ], "Think about how much of a trait is passed on by genes.", "", breed, 0.45));
  c.push(BOTH("Alpha, beta and gamma diversity", [
    "Three scales|🗺️|<b>Alpha diversity</b> is the number of species at one local site. <b>Beta diversity</b> is how much the species change from site to site. <b>Gamma diversity</b> is the total number of species across a whole region.",
    "A simple formula|🧮|A simple measure is beta = gamma / alpha. If a region has 60 species and each site averages 20, beta = 60 / 20 = 3, about three different communities.",
    "Why it matters|🌍|Many identical protected sites hold fewer species than a set of different sites. To keep a region's gamma diversity high, protect many different sites."
  ], [
    "The number of species at one local site is...|alpha diversity|🔬||beta diversity,gamma diversity",
    "How much species change between sites is...|beta diversity|↔️||alpha diversity,gamma diversity",
    "The total number of species across a whole region is...|gamma diversity|🌍||alpha diversity,beta diversity",
    "Two forests that share nearly every species have ... beta diversity|low|🌲||high,no",
    "Two very different habitats like a marsh and a desert have ... beta diversity|high|🏜️||low,zero",
    "To protect gamma diversity, protect...|many different sites|🗺️||only one site,only the smallest site",
    "A single pond with 15 species has an alpha diversity of...|15|🔢||1,150",
    "Gamma diversity is always...|equal to or larger than alpha|📐||smaller than alpha,negative"
  ], "Think about a single site, differences between sites, and the whole region.", "", divers, 0.4));
  c.push(L("Designing protected areas", [
    "Big or small?|🗾|The <b>SLOSS</b> debate asks: Single Large Or Several Small reserves? Large reserves hold bigger populations and big-range animals, with less edge. Several small reserves spread risk and may protect different habitats.",
    "Design rules|📐|Good reserves are large, round rather than long (less edge), connected by corridors, and surrounded by buffer zones where human use is limited.",
    "No single answer|🤝|The best choice depends on the species. Large predators need large reserves, while many plants and insects can live in small patches. Reserves also need good management and local support."
  ], [
    "SLOSS stands for Single Large Or Several...|Small|🗾||Slow,Soft",
    "Large reserves are good for animals with ... ranges|big|🐻||tiny,no",
    "Several small reserves help spread...|risk|🛟||water,weight",
    "A round reserve has less ... than a long thin one|edge|⭕||area,height",
    "A buffer zone is an area around a reserve where human use is...|limited|🚧||unlimited,forbidden for animals",
    "Corridors between reserves let animals...|move between them|🛣️||pay fees,sleep forever",
    "Which animal most needs a very large reserve?|a tiger|🐅||a snail,a mayfly",
    "The best reserve design depends on the...|species being protected|📋||color of the map,weekday"
  ], "Think about size, shape and connections for a reserve."));
  c.push(MIX("Mixed practice", c.slice(0, 18)));
  c.push(MIX("Level 24 Challenge", c.slice(0, 18).reverse()));

  Object.assign(ANIMALS_LEVELS, { 22: a, 23: b, 24: c });
})();
