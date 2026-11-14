// ext/animals-13-15.js  Animals & Nature levels 13-15
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
  const punnett = () => {
    const crosses = [["Bb", "Bb"], ["Bb", "bb"], ["BB", "bb"], ["BB", "Bb"], ["bb", "bb"]];
    const box = (p, q) => { const r = []; for (const x of p) for (const y of q) r.push(x < y ? x + y : y + x); return r; };
    const dom = c => box(c[0], c[1]).filter(g => g.includes("B")).length;
    const bbn = c => box(c[0], c[1]).filter(g => g === "bb").length;
    const traits = [
      ["mice", "black fur (B) is dominant over brown fur (b)", "🐭"],
      ["rabbits", "gray fur (B) is dominant over white fur (b)", "🐰"],
      ["guinea pigs", "short hair (B) is dominant over long hair (b)", "🐹"],
      ["dogs", "a straight tail (B) is dominant over a curly tail (b)", "🐕"]
    ];
    const c = pick(crosses), tr = pick(traits);
    if (Math.random() < 0.5) {
      const e = pick(crosses.filter(x => dom(x) !== dom(c)));
      return {
        text: `In ${tr[0]}, ${tr[1]}. Two parents have the genotypes ${c[0]} and ${c[1]}. What percent of their young will show the dominant trait? (type a number)`,
        visual: tr[2], answer: dom(c) * 25,
        hints: ["Draw a two by two square. Each box gets one allele from each parent.",
          "A young animal shows the dominant trait if its box has at least one capital B. Count those boxes of the four, then multiply by twenty-five.",
          `Example: ${e[0]} x ${e[1]} makes the boxes ${box(e[0], e[1]).join(", ")}. ${dom(e)} of 4 boxes have a capital B, so the answer is ${dom(e) * 25}. Now do yours.`]
      };
    }
    const e = pick(crosses.filter(x => bbn(x) !== bbn(c)));
    return {
      text: `Two ${tr[0]} have the genotypes ${c[0]} and ${c[1]} (${tr[1]}). In the Punnett square of 4 boxes, how many boxes are bb? (type a number)`,
      visual: tr[2], answer: bbn(c),
      hints: ["Draw a two by two square. Put one parent's alleles on top and the other parent's on the side.",
        "Fill each box with one allele from the top and one from the side. Then count only the boxes with two small b letters.",
        `Example: ${e[0]} x ${e[1]} makes the boxes ${box(e[0], e[1]).join(", ")}. ${bbn(e)} of them are bb. Now do yours.`]
    };
  };
  const doubling = () => {
    const s = pick([10, 20, 50, 100]), y = pick([2, 3, 4]), nm = pick([["frogs", "🐸"], ["beetles", "🪲"], ["mice", "🐭"], ["fish", "🐟"]]);
    return {
      text: `A group of ${s} ${nm[0]} doubles in number every year. How many are there after ${y} years? (type a number)`,
      visual: nm[1], answer: s * 2 ** y,
      hints: ["Doubling means multiplying by two, over and over.",
        "Double the number once for each year, one year at a time. Write each step.",
        "Example: 7 insects double each year for 2 years: 7, then 14, then 28. So the answer is 28. Now do yours."]
    };
  };
  const halfLife = () => {
    if (Math.random() < 0.6) {
      const s = pick([64, 80, 96, 120, 160]), k = pick([1, 2, 3]);
      return {
        text: `A fossil started with ${s} units of a radioactive atom. After ${k} half-li${k > 1 ? "ves" : "fe"}, how many units are left? (type a number)`,
        visual: "🦴", answer: s / 2 ** k,
        hints: ["Each half-life cuts the amount in half.",
          "Halve the number once for every half-life, one step at a time.",
          "Example: 36 units and 2 half-lives: 36, then 18, then 9. So the answer is 9. Now do yours."]
      };
    }
    const hl = pick([1000, 5000, 10000]), k = pick([2, 3, 4]);
    return {
      text: `A radioactive atom has a half-life of ${hl} years. How many years pass during ${k} half-lives? (type a number)`,
      visual: "⏳", answer: hl * k,
      hints: ["One half-life is a fixed amount of time.",
        "Multiply the length of one half-life by the number of half-lives.",
        "Example: a half-life of 300 years and 2 half-lives is 300 + 300 = 600 years. Now do yours."]
    };
  };
  const scaling = () => {
    const t = pick(["area", "vol", "ratio"]);
    if (t === "area") {
      const s = pick([2, 3, 4, 5]);
      return {
        text: `A model animal is a cube with sides ${s} cm long. What is its total surface area in square cm? (type a number)`,
        visual: "🧊", answer: 6 * s * s,
        hints: ["A cube has six faces that are all the same.",
          "Find the area of one face (side times side), then count all the faces.",
          "Example: a cube with side 1 cm has one face of 1 square cm, and 6 faces, so 6. Now do yours."]
      };
    }
    if (t === "vol") {
      const s = pick([2, 3, 4, 5]);
      return {
        text: `A cube-shaped animal model has sides ${s} cm long. What is its volume in cubic cm? (type a number)`,
        visual: "🧊", answer: s ** 3,
        hints: ["Volume tells how much space is inside.",
          "For a cube, multiply the side by itself, and then by the side one more time.",
          "Example: a cube with side 10 cm has volume 10 x 10 x 10 = 1000. Now do yours."]
      };
    }
    const s = pick([1, 2, 3, 6]);
    return {
      text: `A cube has sides ${s} cm long. What is its surface area divided by its volume? (type a number)`,
      visual: "📏", answer: 6 / s,
      hints: ["Find the surface area and the volume first, then divide.",
        "Surface area is six times the side squared. Volume is the side cubed. Divide the first by the second.",
        "Example: side 12 cm gives area 864 and volume 1728, and 864 / 1728 = 0.5. Bigger cubes have a smaller ratio. Now do yours."]
    };
  };

  // ================= LEVEL 13 =================
  const a = [];
  a.push(L("Homeostasis", [
    "Staying balanced|⚖️|<b>Homeostasis</b> means keeping the inside of the body steady even when the outside changes. Temperature, water and sugar levels are kept in a safe range.",
    "Feedback|🌡️|Body controls work like a thermostat. Too hot? You sweat or pant. Too cold? You shiver to make heat. The body <b>reverses</b> the change. This is called <b>negative feedback</b>.",
    "Animal examples|🐕|Dogs pant, elephants flap their big ears to lose heat, and lizards move between sun and shade to control their body temperature."
  ], [
    "Keeping the inside of the body steady is called...|homeostasis|⚖️||metamorphosis,migration",
    "A dog pants to...|cool down|🐕||warm up,find food",
    "Shivering helps the body...|make heat|🥶||lose heat,store water",
    "A thermostat that turns on to reverse a change is like...|negative feedback|🌡️||a food chain,a reflex arc",
    "A lizard that moves from sun to shade is controlling its...|body temperature|🦎||eye color,diet",
    "Elephants flap their huge ears to...|lose heat|🐘||gain heat,scare fish",
    "Sweat cools the skin as it...|evaporates|💧||freezes,burns",
    "Which animal makes its own body heat to stay steady?|mouse|🐭||frog,snake"
  ], "Think about how the body fights a change in temperature or water.", "Hot: cool down. Cold: warm up."));
  a.push(L("Metabolic rate and size", [
    "How fast energy is used|🔥|<b>Metabolic rate</b> is how fast a body uses energy. Small animals use more energy for each gram of body than big animals.",
    "Tiny and busy|🐭|A shrew or hummingbird must eat almost all day. A hummingbird's heart can beat more than 1,000 times a minute. An elephant's heart beats only about 30 times a minute.",
    "Warm or cold|🦎|A snake uses far less energy than a mammal of the same size because it does not make its own body heat."
  ], [
    "Which has the faster heartbeat?|mouse|🐭||elephant,they are the same",
    "Per gram of body, small mammals eat...|more food|🍽️||less food,no food",
    "Metabolic rate is...|how fast the body uses energy|🔥||how fast an animal runs,how big an animal grows",
    "Which uses energy faster per gram: a hummingbird or an eagle?|hummingbird|🐦||eagle,neither",
    "Shrews must eat often because they have a...|fast metabolism|🐁||slow metabolism,thick shell",
    "Compared with a mammal of the same size, a resting snake uses...|much less energy|🐍||much more energy,exactly the same energy",
    "Hibernating animals save energy by slowing their...|metabolism|🐻||eyesight,fur color",
    "Which eats a larger share of its own weight each day: a shrew or a bison?|shrew|🐁||bison,both the same"
  ], "Think about body size and how much fuel a body burns.", "Small and warm-blooded means a hungry, fast body."));
  a.push(L("Fighting germs", [
    "Layers of defense|🛡️|The first defense against germs is the <b>skin</b> and the sticky <b>mucus</b> in the nose that traps them. If germs get inside, the immune system fights.",
    "White blood cells|🔬|<b>White blood cells</b> find and attack germs. Some make <b>antibodies</b>, proteins that stick to a germ so it can be destroyed.",
    "Vaccines|💉|A <b>vaccine</b> shows the body a harmless piece of a germ so it can practice. Pets are vaccinated to protect them from diseases such as rabies."
  ], [
    "The first line of defense against germs is the...|skin|🛡️||bones,toenails",
    "Cells that fight germs are...|white blood cells|🔬||red blood cells,fat cells",
    "Proteins that stick to germs are...|antibodies|🧪||hormones,vitamins",
    "A vaccine trains the body to...|recognize a germ|💉||grow bigger,sleep longer",
    "A fever helps fight germs by making the body...|warmer|🌡️||colder,louder",
    "A mother's first milk gives babies...|antibodies|🍼||new bones,more teeth",
    "Mucus in the nose helps by...|trapping germs|👃||making sound,storing fat",
    "Pet dogs get vaccines to protect them from diseases such as...|rabies|🐕||sunburn,hiccups"
  ], "Think about what blocks germs, what attacks them and what trains the body.", "Barrier, fighters, practice."));
  a.push(L("Hormones", [
    "Chemical messengers|🧪|<b>Hormones</b> are chemical messages made by glands. They travel in the blood and tell body parts what to do.",
    "Slower but longer|⏳|Nerve signals are very fast and short. Hormones usually work more slowly, but their effects last longer.",
    "Hormones at work|🐸|A hormone from the thyroid gland turns a tadpole into a frog. A hormone called ecdysone tells an insect to molt. <b>Adrenaline</b> prepares animals to fight or run."
  ], [
    "Hormones travel through the...|blood|🩸||bones,skin",
    "Chemical messengers made by glands are called...|hormones|🧪||neurons,bones",
    "A thyroid hormone triggers a tadpole to...|become a frog|🐸||lay eggs,grow gills",
    "Adrenaline prepares the body for...|fight or flight|⚡||sleep,digesting",
    "A hormone tells an insect when to...|shed its exoskeleton|🦗||lay eggs,sing",
    "Melatonin helps control...|sleep cycles|😴||eye color,leg length",
    "Compared with nerve signals, hormones usually work...|more slowly|⏳||more quickly,only at night",
    "Changing day length can trigger migration by changing...|hormones|🐦||colors,bones"
  ], "Think about a messenger carried in the blood.", "Glands make them, blood carries them."));
  a.push(L("Pheromones", [
    "Scent messages|👃|A <b>pheromone</b> is a chemical signal sent from one animal to others of the same species. It works even in the dark.",
    "What they say|🐜|Ants lay scent trails to food. Female moths call males from far away. Bees give alarm signals. Queen bees release pheromones that keep the colony working together.",
    "Marking places|🐈|Cats and many other mammals leave scent marks by rubbing glands on objects to say, \"I live here.\""
  ], [
    "A chemical signal between animals of the same species is a...|pheromone|👃||vitamin,symptom",
    "How do ants mark a trail to food?|scent chemicals|🐜||tiny flags,sound waves",
    "Female moths can call males from far away using...|scent|🦋||song,light",
    "A queen bee's pheromones help keep the colony...|working together|🐝||hungry,asleep",
    "Alarm pheromones warn others of...|danger|⚠️||dinner,rain",
    "A cat rubbing its cheek on furniture is leaving...|scent marks|🐈||dust only,loud calls",
    "Pheromones are detected mostly by...|smell|👃||sight,hearing",
    "Why is a scent signal useful in the dark?|it needs no light|🌙||it makes light,it is loud"
  ], "Think about signals that are smelled, not seen or heard.", "Same species, chemical, smell."));
  a.push(L("Dominant and recessive", [
    "Alleles|🧬|Genes come in different versions called <b>alleles</b>. An animal gets one allele of each gene from each parent.",
    "Dominant and recessive|⚫|A <b>dominant</b> allele (capital letter, B) shows even when there is just one copy. A <b>recessive</b> allele (small letter, b) shows only when there are two copies.",
    "Genotype and phenotype|🐭|The <b>genotype</b> is the pair of alleles, like Bb. The <b>phenotype</b> is how the animal looks, like black fur."
  ], [
    "A version of a gene is an...|allele|🧬||enzyme,organ",
    "An allele that shows even with just one copy is...|dominant|⚫||recessive,rare",
    "Genotype Bb means the animal has...|one of each allele|🧬||two dominant alleles,two recessive alleles",
    "The way an animal looks, like fur color, is its...|phenotype|🐭||genotype,allele",
    "The pair of alleles an animal carries is its...|genotype|🧬||phenotype,habitat",
    "If black fur (B) is dominant, a mouse with Bb has ___ fur|black|🐭||brown,spotted",
    "To show a recessive trait an animal needs...|two recessive alleles|🧬||one recessive allele,two dominant alleles",
    "Gregor Mendel found the rules of heredity by growing...|pea plants|🌱||pet dogs,fruit bats"
  ], "Think about capital letters and small letters.", "Dominant shows with one copy; recessive needs two."));
  a.push(BOTH("Punnett squares", [
    "A chance chart|🔲|A <b>Punnett square</b> predicts what young could get from two parents. Each parent gives one allele.",
    "How to fill it|✏️|Put one parent's two alleles along the top and the other's down the side. Each of the 4 boxes shows a possible pair.",
    "Chances, not promises|🎲|If Bb mates with Bb, the boxes are BB, Bb, Bb, bb. That is 3 with the dominant trait and 1 with the recessive trait, a <b>3:1</b> ratio."
  ], [
    "A Punnett square is used to...|predict offspring|🔲||measure speed,find fossils",
    "A one-gene Punnett square usually has how many boxes?|4|🔲||2,8",
    "A cross of BB with bb gives young that all carry...|one of each allele|🐭||two dominant alleles,two recessive alleles",
    "A cross of Bb with Bb gives a dominant to recessive ratio of...|3:1|🐭||1:1,2:1",
    "In a cross of Bb with bb, about what part of the young are bb?|50%|🐰||25%,75%",
    "Punnett squares show...|chances|🎲||certainty,speed",
    "Each parent gives how many alleles of a gene to a young animal?|one|🧬||two,four",
    "Two parents that both carry only recessive alleles can only have young with...|recessive alleles only|🐭||one dominant allele,two dominant alleles"
  ], "Think about each parent giving one allele.", "Draw the square and fill the boxes.", punnett, 0.5));
  a.push(L("Mutations and variation", [
    "A change in DNA|🧬|A <b>mutation</b> is a change in DNA. Most mutations have little or no effect. Some are harmful and a few are helpful.",
    "Passing it on|🥚|A mutation in an egg or sperm cell can be passed to young. If it helps the animal survive, it may become common over time.",
    "Variation|🐾|Differences between members of a species are <b>variation</b>. It comes from mutations and from mixing genes from two parents. Variation gives a species a chance when the environment changes."
  ], [
    "A change in DNA is called a...|mutation|🧬||reflex,migration",
    "Most mutations have...|little or no effect|🧬||a huge effect,magic powers",
    "A mutation in an egg or sperm can be...|passed to offspring|🥚||washed away,avoided",
    "Animals that lack color pigment because of a gene change are called...|albino|🐇||nocturnal,hybrid",
    "Black panthers are leopards or jaguars with extra dark fur because of a...|mutation|🐆||infection,diet",
    "Differences between members of one species are called...|variation|🐾||adaptation,migration",
    "Besides mutations, variation comes from mixing genes in...|sexual reproduction|🧬||cloning,budding",
    "Variation helps a species survive when the...|environment changes|🌍||name changes,moon changes"
  ], "Think about changes in the instructions inside cells.", "DNA changes can be passed on."));
  a.push(L("How new species form", [
    "What is a species?|🐎|A <b>species</b> is a group that can breed and have healthy young that can have young of their own. A mule (horse x donkey) is usually sterile, so horses and donkeys are different species.",
    "Splitting apart|🏔️|When a river, mountain or sea splits a group in two, the groups can no longer mix. This is <b>isolation</b>. Each group collects different mutations and faces different pressures.",
    "Becoming new|🐿️|After many generations, the groups may become so different that they cannot breed together. Then there are <b>two species</b>. This is called <b>speciation</b>."
  ], [
    "A species can usually breed and make ___ young|fertile|🐎||sterile,colorful",
    "A mule (horse x donkey) is usually...|sterile|🐴||fertile,wild",
    "A group being separated from another group is called...|isolation|🏔️||hibernation,migration",
    "A mountain range or river that splits groups is a ___ barrier|geographic|🏔️||chemical,musical",
    "Over many generations, isolated groups can become...|new species|🐿️||the same twin,younger",
    "Kaibab squirrels are found only on the north rim of the...|Grand Canyon|🐿️||Amazon River,Alps",
    "Splitting into new species takes...|many generations|⏳||one night,one week",
    "Hundreds of cichlid fish species formed in African lakes from a few ancestors. This is an example of...|speciation|🐠||extinction,migration"
  ], "Think about groups that stop mixing with each other.", "Separate, change, cannot breed."));
  a.push(L("Sexual selection", [
    "Choosing a mate|🦚|<b>Sexual selection</b> happens when traits help an animal get a mate. Either mates choose (like peahens choosing peacocks) or rivals fight (like stags with antlers).",
    "Showy traits|✨|A peacock's tail, a bird of paradise's dance and a frog's loud call help attract mates. They can signal health and strength.",
    "A cost|⚖️|Bright colors and loud calls can also be seen or heard by predators. The trait spreads if the mating benefit is bigger than the danger."
  ], [
    "Choosing mates by their traits is called...|sexual selection|🦚||habitat selection,food selection",
    "A peacock's big tail helps him...|attract mates|🦚||hide from predators,swim faster",
    "Antlers on male deer are used mostly in...|contests with rivals|🦌||digging,drinking",
    "Bright male birds may be easier for predators to see. That is a...|cost|⚠️||reward,disguise",
    "In many bird species, which sex usually does the choosing?|females|🐦||males,chicks",
    "Birds of paradise use dances and feathers to...|court a mate|🐦||fight a storm,build a nest",
    "A strong display can signal that the male is...|healthy|💪||sick,lost",
    "Male elephant seals fight so the winner can...|mate with many females|🦭||eat more fish,dive deeper"
  ], "Think about what helps an animal win a mate.", "Attract or beat rivals."));
  a.push(L("Coevolution", [
    "Changing each other|🔄|<b>Coevolution</b> happens when two species shape each other's evolution over a long time.",
    "Flowers and pollinators|🦋|Red tube flowers suit hummingbirds. A very long flower, the comet orchid of Madagascar, is pollinated by a hawk moth with a tongue long enough to reach the nectar. Darwin predicted such a moth before it was found!",
    "Arms races|🐆|Faster cheetahs push gazelles to get faster. Faster gazelles push cheetahs to get faster. Each side is a <b>selective pressure</b> for the other."
  ], [
    "When two species change each other over time, it is...|coevolution|🔄||extinction,migration",
    "Which animal has a tongue long enough to reach nectar deep in a comet orchid?|hawk moth|🦋||ladybug,mosquito",
    "Cheetahs and gazelles both getting faster is an evolutionary...|arms race|🐆||picnic,holiday",
    "Hummingbirds are drawn to flowers that are...|red and tube-shaped|🌺||green and flat,brown and tiny",
    "In coevolution, each species ___ the other's evolution|shapes|🔄||stops,ignores",
    "Many night-blooming flowers are pollinated by bats and...|moths|🌙||bees,butterflies",
    "Acacia trees feed ants and the ants guard the tree. This helpful partnership is...|mutualism|🐜||parasitism,predation",
    "Predators getting better at hunting while prey get better at escaping is...|coevolution|🦊||hibernation,instinct"
  ], "Think about two species that keep changing in response to each other.", "A back-and-forth over many generations."));
  a.push(L("Competition", [
    "Sharing limited things|⚔️|Animals compete for food, water, space and mates. Competition inside one species is <b>intraspecific</b>. Between different species it is <b>interspecific</b>.",
    "Who wins?|🐿️|In Britain, introduced gray squirrels outcompete native red squirrels. The <b>competitive exclusion principle</b> says two species cannot share exactly the same niche forever.",
    "Making room|🌳|Species can lower competition by using different resources, like warblers that feed in different parts of the same tree."
  ], [
    "Competition between two different species is called...|interspecific|⚔️||intraspecific,mutual",
    "Competition among members of the same species is called...|intraspecific|⚔️||interspecific,symbiotic",
    "Animals compete for food, water, space and...|mates|🦌||homework,money",
    "Two species cannot share exactly the same niche forever. This is the competitive ___ principle|exclusion|⚔️||sharing,tolerance",
    "In Britain, introduced gray squirrels have outcompeted native ___ squirrels|red|🐿️||flying,ground",
    "Trees in a forest compete mostly for...|sunlight|🌳||snow,sand",
    "Lions and hyenas that both hunt zebras are...|competitors|🦁||partners,parasites",
    "Birds that feed in different parts of one tree lower competition by...|dividing resources|🐦||fighting more,migrating less"
  ], "Think about animals needing the same limited thing.", "Same need, limited supply."));
  a.push(BOTH("Population growth curves", [
    "Fast at first|📈|With plenty of food and few enemies, a population can grow <b>exponentially</b>, doubling again and again. The graph looks like the letter J.",
    "Hitting the limit|📉|Resources run out, so growth slows. The population levels off at the <b>carrying capacity</b>, the most the place can support. The graph looks like an S and is called <b>logistic</b> growth.",
    "Real example|🐇|Rabbits in Australia boomed after 1859 because they had lots of food and few predators."
  ], [
    "Growth that doubles again and again is called...|exponential|📈||linear,backward",
    "An S-shaped growth curve is called...|logistic|📉||square,straight",
    "The curve levels off at the...|carrying capacity|📉||starting size,fossil limit",
    "A J-shaped growth curve shows ___ growth|exponential|📈||logistic,no",
    "Exponential growth cannot last because resources...|run out|🌾||multiply,sing",
    "Rabbits in Australia grew fast at first because they had food and few...|predators|🐇||neighbors,maps",
    "Which curve is more realistic over a long time?|logistic|📉||exponential,a straight line",
    "At the carrying capacity, births are about ___ deaths|equal to|⚖️||double,ignored by"
  ], "Think about a fast start and then running out of room.", "J for boom, S for limit.", doubling, 0.4));
  a.push(L("Predator and prey cycles", [
    "Ups and downs|🔄|Some predator and prey numbers rise and fall in <b>cycles</b>. The best known are the snowshoe hare and the lynx in northern Canada, found in old fur trading records.",
    "How it works|🐇|When hares are many, lynx have plenty of food and increase. Then lynx eat many hares, so hare numbers fall. With less food, lynx numbers fall too, and hares can recover.",
    "Reading the graph|📊|On a line graph, the predator peak comes a little <b>after</b> the prey peak, because predators need time to reproduce."
  ], [
    "Snowshoe hare and lynx numbers rise and fall in...|cycles|🔄||squares,straight lines",
    "When hare numbers rise, lynx numbers soon...|rise|🐇||fall,vanish",
    "The lynx peak comes ___ the hare peak|after|📊||before,never near",
    "After there are very many predators, prey numbers...|fall|📉||rise,freeze",
    "Cycles like this are best shown on a...|line graph|📊||pie chart,map",
    "Records of pelts traded showed cycles in lynx and...|snowshoe hares|🐇||owls,deer",
    "If predators disappeared from an area, prey might at first...|increase a lot|🐇||all disappear,stay the same",
    "The predator peak lags because predators need time to...|reproduce|🐆||hibernate,migrate"
  ], "Think about who rises first, predator or prey.", "Prey peak, then predator peak."));
  a.push(L("Toxins in food chains", [
    "Building up|☠️|<b>Bioaccumulation</b> means a poison slowly builds up in an animal's body, often in fat, because it is eaten faster than it leaves.",
    "Up the chain|🐟|<b>Biomagnification</b> means the poison gets stronger at each step up the food chain, so top predators carry the most. Large tuna carry more mercury than small sardines.",
    "DDT|🦅|The pesticide DDT thinned eggshells of bald eagles and peregrine falcons. Rachel Carson warned about it in her book <i>Silent Spring</i>. After DDT was banned in the US in 1972, the eagles recovered."
  ], [
    "Poisons slowly building up in an animal's body is...|bioaccumulation|☠️||photosynthesis,migration",
    "A poison getting stronger at each step up a food chain is...|biomagnification|🐟||biodiversity,pollination",
    "Which usually has more mercury in its body?|large tuna|🐟||tiny sardine,krill",
    "DDT caused thin eggshells in bald eagles and...|peregrine falcons|🦅||rabbits,goldfish",
    "Which book by Rachel Carson warned about pesticides?|Silent Spring|📖||Ocean Stories,Green Planet",
    "Many poisons are stored in an animal's...|fat|🧈||nails,teeth",
    "Top predators are most at risk because they eat...|many contaminated prey|🦅||only plants,nothing",
    "After DDT was banned, bald eagle numbers...|recovered|🦅||fell more,stayed frozen"
  ], "Think about poison collecting as animals eat other animals.", "Small animals eaten by bigger ones, again and again."));
  a.push(L("Carbon and nitrogen cycles", [
    "Carbon moves|🌍|Plants take in carbon dioxide by <b>photosynthesis</b>. Animals eat plants and get carbon. Animals and decomposers release carbon dioxide by <b>respiration</b>. Burning fossil fuels adds extra.",
    "Nitrogen moves|🌱|Air is mostly nitrogen, but plants cannot use it. Bacteria on the roots of beans and peas (legumes) change it into a form plants can use. Animals eat the plants. Waste and dead bodies return nitrogen to the soil.",
    "Cycle or flow?|☀️|Matter such as carbon and nitrogen is <b>recycled</b>. Energy flows one way, from the sun, through living things, and out as heat."
  ], [
    "Plants take carbon dioxide from the air through...|photosynthesis|🌿||respiration,evaporation",
    "Animals release carbon dioxide through...|respiration|🐕||photosynthesis,pollination",
    "Decomposers return nutrients to the...|soil|🍄||sky,moon",
    "Bacteria that help plants use nitrogen live on the roots of...|legumes|🌱||grasses,mosses",
    "Animals get their carbon from...|food|🥕||sunlight,soil water",
    "Burning fossil fuels adds extra ___ to the air|carbon dioxide|🏭||oxygen,helium",
    "Which flows through an ecosystem one way and is not recycled?|energy|☀️||carbon,nitrogen",
    "Animal droppings return ___ to the soil|nitrogen|💩||helium,sunlight"
  ], "Think about nutrients moving around and around.", "Air, plants, animals, soil."));
  a.push(L("Biogeography and the Wallace Line", [
    "Where species live|🗺️|<b>Biogeography</b> studies where species live and why. Alfred Russel Wallace, who also came up with natural selection, saw a sharp change in wildlife in Indonesia.",
    "The Wallace Line|🏝️|The line runs between Bali and Lombok. West of it, animals are like Asian ones, such as tigers, elephants and woodpeckers. East of it, they are like Australian ones, such as cockatoos and marsupials.",
    "Why?|🌊|Deep water between the islands stayed as sea even when sea levels were low, so many land animals could not cross."
  ], [
    "The Wallace Line runs between Bali and...|Lombok|🏝️||Java,Sumatra",
    "Wallace saw different animals on each side because of deep...|water|🌊||deserts,ice",
    "Which birds are common east of the Wallace Line?|cockatoos|🦜||woodpeckers,barbets",
    "Tigers and elephants live on the ___ side of the line|west|🐅||east,both",
    "The study of where species live and why is...|biogeography|🗺️||astronomy,anatomy",
    "Alfred Russel Wallace also helped develop the idea of...|natural selection|📚||gravity,electricity",
    "Australia has many marsupials partly because it has been separated by ocean for a very long...|time|🦘||week,song",
    "A species found only in one region is called...|endemic|🗺️||extinct,common"
  ], "Think about oceans and straits as barriers.", "East, west, deep water."));
  a.push(L("Identification keys", [
    "Two choices|🔑|A <b>dichotomous key</b> gives two choices at every step. Each choice leads to another step or to the name.",
    "Good questions|🔎|Use traits you can see, like feathers, legs or wings. Avoid opinions like \"Is it cute?\"",
    "Example|🐦|Step 1: Feathers? Yes: bird. No: go to step 2. Step 2: Six legs? Yes: insect. No: go to step 3."
  ], [
    "A dichotomous key gives ___ choices at each step|two|🔑||three,ten",
    "Dichotomous means divided into...|two parts|🔑||five parts,many parts",
    "Key: \"Has feathers? Yes: Group A. No: Group B.\" Where does a robin go?|Group A|🐦||Group B,neither",
    "Using the same key (feathers: Group A, no feathers: Group B), where does a frog go?|Group B|🐸||Group A,both",
    "A key helps you to...|identify an organism|🔑||feed an animal,count stars",
    "Good key questions use traits you can...|observe|👀||guess,hope for",
    "A key says: six legs means insect, eight legs means spider. An animal with eight legs is a...|spider|🕷️||insect,bird",
    "Which is the best key question?|Does it have fur?|🔎||Is it cute?,Do I like it?"
  ], "Think about yes-or-no questions about traits you can see.", "Follow each step."));
  a.push(MIX("Mixed practice", a.slice(0, 18)));
  a.push(MIX("Level 13 Challenge", a.slice(0, 18).reverse()));

  // ================= LEVEL 14 =================
  const b = [];
  b.push(L("Hearts of vertebrates", [
    "More chambers|❤️|Fish hearts have <b>2 chambers</b>. Amphibians and most reptiles have <b>3</b>. Birds, mammals and crocodiles have <b>4</b>.",
    "Single or double loop|🔁|Fish blood goes through the heart once per trip around the body. Birds and mammals pump blood twice: to the lungs, then to the body.",
    "Why 4?|🫀|A four-chamber heart keeps blood with lots of oxygen apart from blood with little. Warm-blooded animals need that for their high energy use."
  ], [
    "A fish heart has how many chambers?|2|🐟||3,4",
    "A frog heart has how many chambers?|3|🐸||2,4",
    "Mammal hearts have how many chambers?|4|🐕||2,3",
    "Bird hearts have how many chambers?|4|🐦||2,3",
    "Crocodiles are unusual reptiles because they have a...|4-chamber heart|🐊||2-chamber heart,no heart",
    "A four-chamber heart keeps oxygen-rich and oxygen-poor blood...|separate|🫀||mixed,frozen",
    "Birds and mammals need 4 chambers because they are warm-blooded and need lots of...|oxygen|🫁||sunlight,sand",
    "In a fish, blood passes through the heart ___ in each loop around the body|once|🐟||twice,three times"
  ], "Think about how many rooms the heart has in each group.", "Fish few, mammals and birds most."));
  b.push(L("From fish to land animals", [
    "Fins to limbs|🦎|About 375 million years ago, some lobe-finned fish had strong fins with bones inside. <i>Tiktaalik</i> had a neck and wrist-like fin bones and could prop itself up in shallow water.",
    "Tetrapods|🐸|Animals with four limbs are <b>tetrapods</b>: amphibians, reptiles, birds and mammals. They all came from fish like these.",
    "Evidence|🪨|Fossils show the steps. <i>Tiktaalik</i> was found in the Arctic of Canada. Lungfish are living fish with lungs and are close relatives of the first tetrapods."
  ], [
    "<i>Tiktaalik</i> lived about ___ million years ago|375|🐟||65,200",
    "<i>Tiktaalik</i> is a link between fish and...|four-legged animals|🦎||insects,whales",
    "Four-limbed vertebrates are called...|tetrapods|🦎||arthropods,cephalopods",
    "The first four-limbed animals came from lobe-finned...|fish|🐟||birds,beetles",
    "Which living fish is closest to the first land vertebrates: lungfish or sharks?|lungfish|🐟||sharks,tuna",
    "Lungs helped early fish live in shallow water low in...|oxygen|💧||snow,sand",
    "<i>Tiktaalik</i> fossils were found in the Arctic of...|Canada|🧊||Brazil,Egypt",
    "The evidence for this change comes from...|fossils|🪨||guesses,videos"
  ], "Think about fins that became legs.", "Fish, shallow water, limbs."));
  b.push(L("Dinosaurs to birds", [
    "Living dinosaurs|🦖|Birds are <b>theropod</b> dinosaurs, a group of mostly meat-eating dinosaurs that walked on two legs. T. rex was in the same big group.",
    "Evidence|🪶|Many feathered dinosaur fossils have been found in China. <i>Archaeopteryx</i>, from about 150 million years ago, had feathers and wings but also teeth and a long bony tail.",
    "Shared features|🦴|Birds and theropods share the wishbone and hollow bones. Early feathers likely first helped with keeping warm and with display, before flight."
  ], [
    "Birds evolved from small meat-eating ___ dinosaurs|theropod|🦖||sauropod,stegosaur",
    "<i>Archaeopteryx</i> lived about ___ million years ago|150|🪶||50,300",
    "<i>Archaeopteryx</i> had feathers and wings plus teeth and a long bony...|tail|🪶||shell,mane",
    "Many feathered dinosaur fossils were found in...|China|🪶||Greenland,Iceland",
    "Birds are sometimes called...|living dinosaurs|🐦||flying lizards,fish cousins",
    "Which fused collarbone is found in birds and their theropod relatives?|wishbone|🦴||tailbone,kneecap",
    "Early feathers probably first helped with...|keeping warm|🪶||digging,swimming",
    "Hollow bones make birds light, which helps them...|fly|🐦||dig,sink"
  ], "Think about which dinosaurs lived on after the others.", "Two legs, feathers, wishbone."));
  b.push(L("Whale evolution", [
    "Land to sea|🐋|Whales came from four-legged land mammals. <i>Pakicetus</i> lived about 50 million years ago near water. Later whales such as <i>Basilosaurus</i> had tiny hind legs.",
    "Clues|🦴|Whale flippers have finger bones like our hands. Some whales have small leftover hip bones. The nostrils moved to the top of the head to form the <b>blowhole</b>.",
    "Relatives|🦛|DNA shows the closest living relatives of whales are hippos."
  ], [
    "Whales evolved from land mammals that walked on...|four legs|🐋||two wings,eight arms",
    "<i>Pakicetus</i>, an early whale relative, lived about ___ million years ago|50|🐋||5,500",
    "The closest living relatives of whales are...|hippos|🦛||sharks,tuna",
    "In whales the nostrils moved to the top of the head, forming the...|blowhole|🐋||gill,beak",
    "Tiny hip bones inside whales are leftover bones from...|land ancestors|🦴||sharks,birds",
    "Evidence that whales are mammals: they breathe air and...|nurse their young|🍼||lay eggs,have gills",
    "<i>Basilosaurus</i> had tiny...|hind legs|🦴||wings,antlers",
    "A whale's flipper contains finger bones like our...|hands|✋||tails,gills"
  ], "Think about leftover land features in whales.", "Legs, then flippers."));
  b.push(L("Ruminants and plant eaters", [
    "Tough plants|🌾|Grass has tough <b>cellulose</b> that animals cannot digest alone. Gut microbes break it down.",
    "Chewing cud|🐄|A <b>ruminant</b> such as a cow, sheep or giraffe has a stomach with 4 chambers. It brings food back up to chew again. This food is called <b>cud</b>.",
    "Gut lengths|📏|Plant eaters usually have longer guts than meat eaters because plants take longer to digest."
  ], [
    "A cow's stomach has how many chambers?|4|🐄||2,6",
    "Food brought back up to chew again is called...|cud|🐄||pulp,pellets",
    "Grass has tough ___ that animals need microbes to digest|cellulose|🌾||iron,salt",
    "Tiny gut microbes help break down...|plant fibers|🦠||bones,rocks",
    "Which animal is a ruminant?|cow|🐄||horse,lion",
    "Carnivore guts are usually ___ than herbivore guts|shorter|🦁||longer,identical",
    "A giraffe chews cud, so it is a...|ruminant|🦒||predator,scavenger",
    "Which animal is also a ruminant?|sheep|🐑||pig,dog"
  ], "Think about how animals digest grass.", "Four chambers, cud, microbes."));
  b.push(L("Learned behavior", [
    "Learning links|🔔|<b>Classical conditioning</b> links two things. Pavlov rang a bell before feeding dogs. Soon the dogs drooled at the bell alone.",
    "Other kinds|🦆|<b>Imprinting</b>: baby birds, like goslings studied by Konrad Lorenz, follow the first moving thing they see. <b>Habituation</b>: ignoring a harmless sound that repeats. <b>Trial and error</b>: learning from results.",
    "Instinct or learned?|🧠|<b>Instinct</b> is inborn. Learned behavior comes from experience."
  ], [
    "Pavlov rang a bell before feeding dogs, and the dogs began to...|drool at the bell|🔔||sleep at the bell,run from food",
    "Learning that links two things is called...|conditioning|🔔||hibernation,molting",
    "Konrad Lorenz studied ___ following him|goslings|🦆||puppies,tadpoles",
    "Baby birds following the first moving thing they see is called...|imprinting|🦆||migration,camouflage",
    "Learning to ignore a harmless repeated sound is...|habituation|🔇||imprinting,instinct",
    "A dolphin does a trick for a fish treat. It learns from a...|reward|🐬||delay,rule",
    "A bird tastes a bad-tasting butterfly once and avoids it afterward. This is learning from...|experience|🦋||instinct,imprinting",
    "Inborn behavior is called...|instinct|🧠||habit,training"
  ], "Think about whether it is inborn or learned from experience.", "Bell, first sight, repeated sound."));
  b.push(L("Social learning and culture", [
    "Learning from others|👀|Many animals learn by watching others. This is <b>social learning</b>.",
    "Examples|🐒|On Koshima island a macaque named Imo washed sweet potatoes, and others copied her. Crows make tools from twigs and leaves. Meerkat adults give pups scorpions with stingers removed to practice handling prey.",
    "Animal culture|🐋|Habits passed on by learning are <b>culture</b>. Different chimpanzee groups crack nuts in different ways, and orca pods have their own calls and hunting skills."
  ], [
    "Learning by watching others is called ___ learning|social|👀||solo,sleep",
    "After Imo washed her sweet potatoes, other macaques...|copied her|🐒||ignored her,chased her",
    "Habits passed on by learning in a group are called animal...|culture|🐒||genes,fur",
    "Meerkat adults teach pups to handle...|prey|🦫||songs,tunnels",
    "Orca pods have their own hunting skills and...|calls|🐋||colors,shells",
    "New Caledonian crows make tools from twigs and...|leaves|🐦‍⬛||gold,glass",
    "Humpback whale songs in a region change and spread when whales...|copy each other|🐋||forget them,sleep more",
    "Learning from others is helpful because it saves time and...|risk|⏱️||paint,money"
  ], "Think about animals copying each other.", "Watch, copy, pass on."));
  b.push(L("Bird song", [
    "The voice box|🎤|Birds sing with a special organ at the bottom of the windpipe called the <b>syrinx</b>.",
    "Songs and calls|🎶|<b>Songs</b> are long and used to defend a territory and attract a mate. <b>Calls</b> are short and used for alarms or keeping in touch.",
    "Learning songs|📝|Many young songbirds learn from adult birds, so different regions can have different <b>dialects</b>. Mockingbirds copy other sounds. Scientists draw songs as a picture called a <b>spectrogram</b>."
  ], [
    "A bird's voice organ is the...|syrinx|🎤||gizzard,crop",
    "Songs are mostly used to defend a territory and attract...|mates|🎶||fish,rain",
    "Short sounds used as warnings are called...|calls|⚠️||verses,poems",
    "Many young songbirds learn songs by listening to...|adult birds|🐦||frogs,wind",
    "The loud morning bird concert is the dawn...|chorus|🌅||march,sprint",
    "Birds from different areas may sing different song...|dialects|🗺️||diets,sizes",
    "Mockingbirds are known to...|copy other sounds|🐦||refuse to sing,sing underwater",
    "Scientists draw bird songs as a picture called a...|spectrogram|📈||pie chart,treasure map"
  ], "Think about how birds make and learn sounds.", "Syrinx, song, call."));
  b.push(L("Wildlife laws", [
    "Rules to protect|⚖️|<b>CITES</b> is an international agreement from 1975 that controls trade in endangered species. The US <b>Endangered Species Act</b> was passed in 1973.",
    "Poaching|🚫|Illegal hunting is <b>poaching</b>. International trade in new elephant ivory is banned because poaching lowered elephant numbers.",
    "Safe places|🏞️|Parks and reserves are <b>protected areas</b>. Rangers patrol them. Laws help most when they are followed and enforced."
  ], [
    "CITES controls the ___ of endangered species|trade|⚖️||feeding,naming",
    "The US Endangered Species Act was passed in...|1973|⚖️||1873,2003",
    "Illegal hunting is called...|poaching|🚫||tracking,herding",
    "Parks and reserves where wildlife is safe are called...|protected areas|🏞️||farm fields,city streets",
    "New elephant ivory trade is banned because poaching lowered elephant...|numbers|🐘||speeds,sizes",
    "Laws protect a species best when people...|follow and enforce them|⚖️||ignore them,hide them",
    "Rangers protect wildlife by...|patrolling parks|🧑‍🌾||building mazes,selling toys",
    "A \"threatened\" species is one likely to become...|endangered|⚠️||common,famous"
  ], "Think about rules and the people who protect wildlife.", "Trade, hunting, parks."));
  b.push(L("Amphibian decline", [
    "Sensitive skin|🐸|Amphibians breathe and drink through thin skin, so they take in pollution easily. That is why frogs are called <b>indicator species</b>: they show how healthy the environment is.",
    "Threats|🍄|Habitat loss, pollution, climate change and a disease caused by the <b>chytrid</b> fungus have harmed amphibians. The golden toad of Costa Rica, last seen in 1989, is now extinct.",
    "Helping|🛟|People protect wetlands, build ponds and raise rare amphibians in safe breeding centers."
  ], [
    "Amphibians absorb water and chemicals through their...|skin|🐸||claws,scales",
    "A disease that has harmed frogs worldwide is caused by the ___ fungus|chytrid|🍄||moss,algae",
    "The golden toad of Costa Rica is now...|extinct|🐸||common,thriving",
    "Frogs are indicator species because they show how healthy the ___ is|environment|🌍||kitchen,moon",
    "Draining wetlands removes breeding places for...|frogs|🐸||camels,eagles",
    "Chemicals in water hurt amphibians because their skin is...|very thin|💧||thick and dry,metal",
    "Some scientists protect rare frogs in safe...|breeding centers|🛟||supermarkets,theaters",
    "Most amphibians lay eggs in...|water or damp places|🥚||dry sand,tree tops"
  ], "Think about thin skin and wet places.", "Skin, fungus, wetlands."));
  b.push(L("Diving adaptations", [
    "Holding breath|🤿|Diving mammals slow their heartbeat and send blood mostly to the heart and brain. Their lungs can collapse safely at depth.",
    "Oxygen storage|🫁|They carry oxygen mostly in their blood and in muscles, using a protein called <b>myoglobin</b>, instead of in the lungs. Blubber keeps them warm.",
    "Record divers|🐋|Sperm whales and beaked whales dive thousands of feet. The emperor penguin is the deepest-diving bird, going more than 500 meters."
  ], [
    "When a seal dives, its heart rate...|slows down|🦭||speeds up,stops forever",
    "Muscles of diving mammals store oxygen in a protein called...|myoglobin|💪||keratin,melanin",
    "Many diving mammals let their lungs...|collapse|🫁||burst,grow",
    "Which dives deeper: a sperm whale or a sea otter?|sperm whale|🐋||sea otter,they are equal",
    "At depth, blood goes mostly to the heart and...|brain|🧠||toes,tail",
    "Which bird is the deepest diver?|emperor penguin|🐧||puffin,seagull",
    "Diving mammals keep much of their oxygen in their blood and muscles rather than their...|lungs|🫁||gills,skin",
    "Blubber helps a diving mammal stay...|warm|🧊||dry,thin"
  ], "Think about saving oxygen under water.", "Slow heart, oxygen in muscles."));
  b.push(L("Lateral line and schools", [
    "Feeling water|🐟|Fish sense vibrations and water movement with a <b>lateral line</b>, a row of sensors along each side. Even blind cavefish can find their way.",
    "Schools|🐠|A <b>school</b> is a group of fish that swim together in a coordinated way. Each fish follows simple rules: stay near neighbors, match their direction, avoid crashes.",
    "Why school?|🦈|Schools confuse predators, which find it hard to pick out one target. Many eyes spot danger, and swimming together can reduce drag."
  ], [
    "Fish sense water vibrations with a...|lateral line|🐟||gill line,dorsal fin",
    "The lateral line runs along the fish's...|sides|🐟||mouth only,tail tip",
    "A group of fish swimming together in a coordinated way is a...|school|🐠||herd,flock",
    "Schooling makes it harder for a predator to pick out...|one target|🦈||any water,sound",
    "Swimming in a school can save energy by reducing...|drag|🐟||color,sound",
    "Each fish in a school follows simple rules such as staying near neighbors and matching their...|direction|🐠||lunch,names",
    "Many eyes in a school help spot...|danger|👀||rain,rocks",
    "Blind cavefish use their lateral line to sense...|water movement|🕳️||bright colors,sunsets"
  ], "Think about sensing water and swimming in groups.", "Sides sense, schools protect."));
  b.push(L("Krill and polar food webs", [
    "Tiny giants|🦐|Antarctic <b>krill</b> are small shrimp-like crustaceans that eat microscopic algae. Algae grow on the underside of sea ice.",
    "Who eats krill|🐧|Blue whales, penguins, seals, fish and squid eat krill. Krill link algae to larger predators in the Southern Ocean food web.",
    "Poles apart|🧊|Polar bears live in the Arctic in the north. Penguins live mostly in the Antarctic region in the south."
  ], [
    "Antarctic krill are tiny...|crustaceans|🦐||fish,worms",
    "Krill eat microscopic...|algae|🌿||whales,seals",
    "Which whale eats mostly krill?|blue whale|🐋||orca,sperm whale",
    "Algae grow on the underside of sea...|ice|🧊||rocks,sand",
    "If krill declined, penguins would have...|less food|🐧||more food,bigger wings",
    "Wild polar bears live in the...|Arctic|🐻‍❄️||Antarctic,Sahara",
    "Krill are food for whales, seals, penguins, fish and...|squid|🦑||glaciers,volcanoes",
    "Krill link algae to larger animals, so they are a key part of the...|food web|🕸️||road map,power grid"
  ], "Think about what the smallest animals feed.", "Algae, krill, giants."));
  b.push(L("Ocean acidification", [
    "Absorbing carbon dioxide|🌊|The ocean absorbs some of the extra carbon dioxide from burning fossil fuels. It makes the water slightly more <b>acidic</b>.",
    "The pH scale|🧪|The <b>pH</b> scale: 7 is neutral, below 7 is acidic and above 7 is basic. A pH of 5 is more acidic than 7.",
    "Hard for shells|🐚|Animals such as oysters, clams, pteropods and corals build shells and skeletons from calcium carbonate. More acid in the water makes building harder."
  ], [
    "The ocean absorbs some of the extra ___ in the air|carbon dioxide|🌊||oxygen,helium",
    "When carbon dioxide dissolves, seawater becomes more...|acidic|🧪||sweet,solid",
    "On the pH scale, 7 is...|neutral|🧪||very acidic,very basic",
    "Acidic water makes it harder to build...|shells|🐚||feathers,eyes",
    "Which is hurt by acidic water because it builds shells: oysters or jellyfish?|oysters|🦪||jellyfish,eels",
    "Corals grow skeletons made of calcium...|carbonate|🪸||chloride,sugar",
    "A pH of 5 is more ___ than a pH of 7|acidic|🧪||basic,neutral",
    "The main cause of the extra carbon dioxide is burning...|fossil fuels|🏭||grass,water"
  ], "Think about gas dissolving in water and changing it.", "More CO2, more acid, weaker shells."));
  b.push(L("Bringing wildlife back", [
    "Reintroduction|🐺|Bringing animals back to places they once lived is <b>reintroduction</b>. Wolves were returned to Yellowstone in 1995.",
    "Cascade|🌳|Wolves changed where elk fed, so willow trees grew back. Beavers returned and made ponds and wetlands. A chain of effects started by a top predator is a <b>trophic cascade</b>.",
    "More examples|🦦|Sea otters eat sea urchins, which protects kelp forests. California condors were bred in captivity and then released."
  ], [
    "Wolves were returned to Yellowstone in...|1995|🐺||1895,2015",
    "A chain of effects started by a top predator is a trophic...|cascade|🐺||pyramid,cycle",
    "After wolves returned, elk changed where they fed, so young ___ trees grew back|willow|🌳||palm,cactus",
    "Sea otters eat sea urchins, which protects...|kelp forests|🦦||deserts,glaciers",
    "Moving animals back to a place they once lived is...|reintroduction|🐺||migration,extinction",
    "Rewilding means letting nature...|recover|🌿||end,be paved",
    "Beaver dams create...|ponds and wetlands|🦫||deserts,tunnels",
    "California condors were bred in captivity and then...|released into the wild|🦅||sold,renamed"
  ], "Think about a top predator changing a whole place.", "Predator returns, plants return."));
  b.push(L("Ecosystem services", [
    "What nature gives|🎁|<b>Ecosystem services</b> are benefits nature gives people: food, clean water, clean air, pollination and more.",
    "Animal helpers|🐝|Bees pollinate crops. Bats and birds eat pest insects. Earthworms loosen soil. Oysters filter water. Wetlands and mangroves soak up floods and storm waves.",
    "Valuing nature|💚|When ecosystems are damaged, we lose these free services and may have to pay to replace them."
  ], [
    "Benefits that nature gives people are ecosystem...|services|🎁||problems,rules",
    "Bees and other insects pollinate many of our...|crops|🐝||rocks,roads",
    "Oysters filter...|water|🦪||air,snow",
    "Bats eating insects help farmers through pest...|control|🦇||growth,lights",
    "Earthworms improve soil by...|loosening it|🪱||painting it,freezing it",
    "Wetlands soak up water like sponges, helping prevent...|floods|🌾||sunrises,tides",
    "Mangrove forests protect coasts from...|storm waves|🌴||earthquakes,droughts",
    "Nature gives us clean air, clean water and...|food|🌍||traffic,noise"
  ], "Think about free benefits from living things.", "Pollination, filtering, protection."));
  b.push(L("Graphs and correlation", [
    "Scatter plots|📉|A <b>scatter plot</b> puts one dot for each animal or place, with two measurements. A trend line shows the pattern.",
    "Kinds of correlation|↗️|If both measures rise together, the correlation is <b>positive</b>. If one rises while the other falls, it is <b>negative</b>. If there is no pattern, there is no correlation.",
    "Careful!|⚠️|Correlation does not prove one thing <b>causes</b> the other. A hidden third factor may cause both."
  ], [
    "A graph of dots for two measurements is a...|scatter plot|📉||pie chart,bar code",
    "If both measurements go up together, the correlation is...|positive|↗️||negative,missing",
    "Higher up a mountain, fewer insect species live there. This is a ___ correlation|negative|⛰️||positive,perfect",
    "A dog's name and its weight show ___ correlation|no|🐕||strong,positive",
    "Correlation does not prove...|cause|⚠️||data,evidence",
    "Ice-cream sales and shark sightings both rise in summer. The best explanation is...|warm weather brings both|🍦||ice cream attracts sharks,sharks buy ice cream",
    "A line drawn through the dots to show the pattern is a...|trend line|📉||border,boundary",
    "Bigger birds tend to have longer wings. This is a ___ correlation|positive|🦅||negative,no"
  ], "Think about how two things change together.", "Up with up, up with down, or no pattern."));
  b.push(BOTH("Body size and shape", [
    "Surface and volume|🧊|A bigger animal has less surface for its size. For a cube with side s, surface area is 6 x s x s and volume is s x s x s. The ratio gets smaller as s grows.",
    "Heat|🔥|Small animals lose heat fast through their relatively big surface. Big animals lose heat slowly.",
    "Rules of climate|🌡️|<b>Bergmann's rule</b>: animals in colder places tend to be larger. <b>Allen's rule</b>: they tend to have shorter ears and limbs. Desert fennec foxes have huge ears that release heat."
  ], [
    "As an animal gets bigger, its surface area compared to its volume gets...|smaller|🧊||larger,exactly the same",
    "Small animals lose heat quickly because they have a lot of surface compared to their...|volume|🐭||legs,ears",
    "Bergmann's rule says animals in colder places tend to be...|larger|🐻‍❄️||smaller,paler",
    "Allen's rule says cold-climate animals tend to have ___ ears and limbs|shorter|🦊||longer,more",
    "Which fox has larger ears?|fennec fox|🦊||arctic fox,red fox",
    "Big ears help desert animals...|release heat|🏜️||store water,keep warm",
    "Elephants lose heat slowly because they have little surface compared to their...|volume|🐘||tusks,ears",
    "Who must eat more per gram of body each day?|a mouse|🐭||an elephant,a whale"
  ], "Think about surface area and volume.", "Bigger bodies keep heat.", scaling, 0.4));
  b.push(MIX("Mixed practice", b.slice(0, 18)));
  b.push(MIX("Level 14 Challenge", b.slice(0, 18).reverse()));

  // ================= LEVEL 15 =================
  const c = [];
  c.push(L("Levels of organization", [
    "Small to big|🔬|Life is organized in levels: <b>cell</b>, <b>tissue</b>, <b>organ</b>, <b>organ system</b>, <b>organism</b>.",
    "Beyond one animal|🌍|All the members of one species in an area form a <b>population</b>. Different populations together are a <b>community</b>. A community plus its non-living surroundings is an <b>ecosystem</b>.",
    "Biggest level|🌎|All ecosystems on Earth together make the <b>biosphere</b>."
  ], [
    "Several similar cells working together form a...|tissue|🔬||organ,system",
    "Tissues working together form an...|organ|🫀||organism,ecosystem",
    "The heart, blood vessels and blood form the circulatory...|system|🫀||cell,tissue",
    "All the members of one species in an area form a...|population|🐺||community,biome",
    "Different populations living together form a...|community|🌳||tissue,organ",
    "A community plus its non-living surroundings is an...|ecosystem|🌿||organ,organism",
    "The smallest unit of life is the...|cell|🔬||tissue,organ",
    "Which is bigger: an organ or a tissue?|organ|🫀||tissue,a cell"
  ], "Think about small parts joining into bigger ones.", "Cell, tissue, organ, system."));
  c.push(L("Mitosis", [
    "Making copies|🧫|<b>Mitosis</b> makes two identical cells from one. Animals use it to grow and to repair injuries.",
    "Steps|🔁|The cell first copies its DNA. Then in mitosis the copies line up, are pulled apart, and two new nuclei form. The four stages are prophase, metaphase, anaphase and telophase.",
    "One cell animals|🦠|Some single-celled organisms, like amoebas, reproduce by dividing in two."
  ], [
    "Mitosis makes how many new cells from one?|2|🧫||4,1",
    "The new cells from mitosis are...|identical to the parent|🧫||completely different,half size",
    "Mitosis is used for growth and...|repair|🩹||migration,flight",
    "Before dividing, a cell copies its...|DNA|🧬||tail,skin",
    "Prophase, metaphase, anaphase and ___ are the stages of mitosis|telophase|🔁||interphase,diaphase",
    "During anaphase, copied chromosomes are pulled...|apart|🧬||together,flat",
    "Cells in a healing cut multiply by...|mitosis|🩹||meiosis,migration",
    "Amoebas reproduce by...|dividing in two|🦠||laying eggs,growing feathers"
  ], "Think about one cell becoming two copies.", "Copy DNA, split."));
  c.push(L("Meiosis and gametes", [
    "Half the set|🧬|<b>Meiosis</b> makes sex cells, called <b>gametes</b> (sperm and eggs). Each gamete has half the usual number of chromosomes.",
    "Fertilization|🥚|When a sperm joins an egg, the full number is restored. The new cell is a <b>zygote</b>. A human body cell has 46 chromosomes; sperm and eggs have 23.",
    "Why?|🎲|Meiosis shuffles genes, so each gamete is different. This creates variation among offspring."
  ], [
    "Meiosis makes sperm and egg cells, called...|gametes|🧬||tissues,hormones",
    "Gametes have ___ the usual number of chromosomes|half|🧬||double,the same",
    "A human body cell has 46 chromosomes. A human egg has...|23|🥚||46,92",
    "Joining a sperm and an egg makes a...|zygote|🥚||spore,nucleus",
    "Meiosis makes cells that are ___ from each other|different|🎲||identical,the same",
    "Dogs have 78 chromosomes in body cells. A dog sperm has...|39|🐕||78,156",
    "A fruit fly body cell has 8 chromosomes. A fruit fly egg has...|4|🪰||8,16",
    "Meiosis helps create ___ in a species|variation|🎲||sameness,bones"
  ], "Think about halving the set so fertilization can restore it.", "Half plus half is whole."));
  c.push(L("Embryo development", [
    "A ball of cells|🥚|A fertilized egg divides into a ball of cells called a <b>blastula</b>. Later the embryo forms three layers.",
    "Three layers|🧬|The outer layer, <b>ectoderm</b>, becomes skin and the nervous system. The middle layer, <b>mesoderm</b>, becomes muscle, bone and blood. The inner layer, <b>endoderm</b>, forms the lining of the gut.",
    "Look alike|🐣|Early vertebrate embryos look similar, a clue to shared ancestry. A chick gets food from the yolk; most mammals get food through a placenta."
  ], [
    "A fertilized egg divides to form a ball of cells called a...|blastula|🥚||larva,pupa",
    "The ectoderm becomes skin and the...|nervous system|🧠||stomach lining,blood",
    "The mesoderm becomes muscle, bone and...|blood|🩸||skin,brain",
    "The endoderm forms the lining of the...|gut|🧬||skull,feathers",
    "Most animal embryos have how many germ layers?|3|🥚||1,5",
    "Early vertebrate embryos look alike, suggesting shared...|ancestry|🐣||diets,addresses",
    "A chick embryo grows using food from the...|yolk|🥚||shell,air",
    "Most mammal embryos get food through the...|placenta|🍼||beak,wing"
  ], "Think about how one cell becomes layers, then organs.", "Ball, layers, organs."));
  c.push(L("Four kinds of tissue", [
    "Four types|🧱|Animal bodies have four main tissues: <b>epithelial</b>, <b>connective</b>, <b>muscle</b> and <b>nervous</b>.",
    "Jobs|💪|Epithelial tissue covers surfaces such as skin and gut linings. Connective tissue supports and joins: bone, blood, fat and tendons. Muscle tissue contracts to move. Nervous tissue carries signals.",
    "Special case|🧽|Sponges are animals with no true tissues. Cardiac muscle is found only in the heart."
  ], [
    "Which tissue covers surfaces such as skin?|epithelial|🧱||connective,nervous",
    "Bone, blood and fat are ___ tissue|connective|🦴||nervous,epithelial",
    "Which tissue contracts to make movement?|muscle|💪||epithelial,connective",
    "Which tissue carries signals?|nervous|⚡||connective,epithelial",
    "Epithelial, connective, muscle and ___ are the four main tissues|nervous|🧱||plant,wood",
    "Which animal group has no true tissues?|sponges|🧽||insects,frogs",
    "Tendons connect muscle to bone and are ___ tissue|connective|🦴||nervous,epithelial",
    "Cardiac muscle is found only in the...|heart|🫀||lungs,liver"
  ], "Think about covering, joining, moving and signaling.", "Cover, join, move, signal."));
  c.push(L("Circulation types", [
    "Open system|🦗|Insects and most mollusks have an <b>open</b> system. A blood-like fluid called <b>hemolymph</b> bathes the organs directly. Insects breathe through tiny tubes called tracheae, so the fluid carries little oxygen.",
    "Closed system|🪱|Earthworms, octopuses and vertebrates have a <b>closed</b> system. Blood stays inside vessels, so it moves faster and with more pressure. Octopuses have three hearts.",
    "Blue blood|🦑|Octopus and horseshoe crab blood looks blue because it uses copper-based <b>hemocyanin</b> instead of iron-based hemoglobin."
  ], [
    "The blood-like fluid in insects is called...|hemolymph|🦗||saliva,sap",
    "Insects have an ___ circulatory system|open|🦗||closed,frozen",
    "Earthworms have a ___ circulatory system|closed|🪱||open,missing",
    "Vertebrates have a ___ circulatory system|closed|🐕||open,no",
    "How many hearts does an octopus have?|three|🐙||one,five",
    "Compared with open systems, closed systems can move blood with more...|pressure|🫀||wings,color",
    "Insects breathe through tiny tubes called...|tracheae|🦗||gills,lungs",
    "Octopus and horseshoe crab blood looks blue because of copper-based...|hemocyanin|🦑||hemoglobin,chlorophyll"
  ], "Think about where the fluid travels: inside vessels or around organs.", "Open spaces or closed tubes."));
  c.push(L("Water and salt balance", [
    "Osmosis|💧|<b>Osmosis</b> is the movement of water across a membrane. Animals must balance water and salt, called <b>osmoregulation</b>.",
    "Fish|🐟|A freshwater fish gains water, so it makes lots of dilute urine and takes in salts through its gills. A saltwater fish loses water, so it drinks seawater and pushes out extra salt through its gills.",
    "Others|🐢|Sea turtles clear salt through glands near the eyes, which looks like crying. Kangaroo rats save water by making very concentrated urine. Salmon can switch between fresh and salt water."
  ], [
    "Freshwater fish tend to gain...|water|🐟||salt,feathers",
    "Saltwater fish lose water, so they...|drink seawater|🐠||never drink,breathe air",
    "Marine fish get rid of extra salt through their...|gills|🐟||scales,fins",
    "Freshwater fish make a lot of ___ urine|dilute|🐟||salty,sticky",
    "Salmon can live in both because their bodies...|adjust their salt control|🐟||freeze,glow",
    "Sea turtles get rid of extra salt through their...|tears|🐢||toes,shells",
    "Kangaroo rats save water by making very concentrated...|urine|🐀||saliva,sweat",
    "Osmosis is the movement of ___ across a membrane|water|💧||sand,sound"
  ], "Think about animals that gain or lose water.", "Fresh gains, salty loses."));
  c.push(L("Nervous systems", [
    "Simple nets|🪼|Jellyfish have a <b>nerve net</b>, with no brain. Flatworms have a simple brain and eyespots that sense light.",
    "Heads and brains|🧠|Putting nerve cells and sense organs in the head is <b>cephalization</b>. Animals that move head first benefit from sensing what is ahead.",
    "Vertebrates and more|🐙|Vertebrates have a central nervous system (brain and spinal cord) and a peripheral system (nerves elsewhere). Clusters of nerve cells in invertebrates are <b>ganglia</b>. An octopus has most of its neurons in its arms."
  ], [
    "Jellyfish have a ___ instead of a brain|nerve net|🪼||big skull,shell",
    "Putting nerve cells and sense organs in the head is called...|cephalization|🧠||metamorphosis,migration",
    "A cluster of nerve cells in invertebrates is a...|ganglion|🧠||gill,fin",
    "The central nervous system includes the brain and...|spinal cord|🧠||heart,stomach",
    "Nerves outside the brain and spinal cord are the ___ nervous system|peripheral|⚡||digestive,skeletal",
    "Flatworm eyespots detect...|light|👁️||sound,smell",
    "Most of an octopus's neurons are in its...|arms|🐙||ink sac,beak",
    "Animals that move head first usually have sense organs in the...|head|🧠||tail,knees"
  ], "Think about where nerve cells are gathered.", "Net, ganglia, brain."));
  c.push(L("Body symmetry", [
    "Mirror halves|🪞|<b>Bilateral</b> symmetry: one cut makes two mirror halves. Most animals, including people and butterflies, are bilateral and have a head end.",
    "Round bodies|🪼|<b>Radial</b> symmetry: the body is arranged around a center, like a pie. Jellyfish, sea anemones and sea stars are radial. This suits animals that drift or stay put, since food can come from any direction.",
    "No symmetry|🧽|Most sponges are <b>asymmetrical</b>. Sea star larvae are bilateral, but the adults are radial."
  ], [
    "A body that can be split into two mirror halves one way has ___ symmetry|bilateral|🦋||radial,no",
    "Jellyfish have ___ symmetry|radial|🪼||bilateral,mirror",
    "Sponges are mostly...|asymmetrical|🧽||radial,bilateral",
    "Which animal has bilateral symmetry?|butterfly|🦋||sea star,jellyfish",
    "Which animal has radial symmetry as an adult?|sea star|⭐||dog,bee",
    "Radial symmetry suits animals that stay put because food can come from...|any direction|🪸||only the front,nowhere",
    "Humans have ___ symmetry|bilateral|🧍||radial,none",
    "Sea star larvae are...|bilateral|⭐||radial,asymmetrical"
  ], "Think about mirror halves versus a round pattern.", "Two halves or around a center."));
  c.push(L("Body cavities and segments", [
    "Coelom|🪱|A <b>coelom</b> is a fluid-filled body cavity around the gut. Flatworms have none. Earthworms and vertebrates have one. In worms the fluid works like a <b>hydrostatic skeleton</b>.",
    "Segments|🧩|Many animals are built from repeating <b>segments</b>. Earthworms are segmented. Arthropods have segments that fuse into head, thorax and abdomen. Our backbone is made of repeating <b>vertebrae</b>.",
    "Why helpful?|🛠️|Segments can specialize and do different jobs, such as legs, antennae and mouthparts."
  ], [
    "A fluid-filled body cavity around the gut is the...|coelom|🪱||cocoon,colon",
    "Which has no body cavity?|flatworm|🪱||earthworm,frog",
    "Earthworms are made of many repeating sections called...|segments|🪱||scales,petals",
    "Segmentation lets body parts evolve to...|do different jobs|🧩||vanish,glow",
    "Arthropod body regions are head, thorax and...|abdomen|🐜||thumb,tailfin",
    "Our backbone is made of repeating bones called...|vertebrae|🦴||ribs,joints",
    "Which worm is segmented?|earthworm|🪱||tapeworm,pinworm",
    "A worm's fluid-filled cavity works like a ___ skeleton|hydrostatic|🪱||metal,bone"
  ], "Think about repeating sections and inner spaces.", "Cavity and segments."));
  c.push(L("Reading evolution trees", [
    "A family tree of species|🌳|A <b>phylogenetic tree</b> shows how species are related. The tips are species. Each branching point is a <b>common ancestor</b>.",
    "Closeness|🔗|Species that share a recent branching point are <b>closely related</b>. Trees are built from body traits and DNA.",
    "Surprises|🐊|Birds are more closely related to crocodiles than to lizards. Whales are close relatives of hippos."
  ], [
    "A diagram showing how species are related is a...|phylogenetic tree|🌳||food chain,pie chart",
    "A branching point on the tree shows a...|common ancestor|🌳||predator,feeding site",
    "Species that branch from a recent point are...|closely related|🔗||unrelated,identical",
    "Scientists build trees from physical traits and...|DNA|🧬||paint,maps",
    "Which is more closely related to humans: chimpanzees or lemurs?|chimpanzees|🐒||lemurs,mice",
    "Which pair is more closely related?|birds and crocodiles|🐊||birds and lizards,they are equal",
    "On a tree, whales and ___ share a recent ancestor|hippos|🦛||sharks,penguins",
    "The tips of the branches show...|species|🌳||climates,ages"
  ], "Think about branches and shared ancestors.", "Recent branching means close cousins."));
  c.push(BOTH("Dating fossils", [
    "Layers|🪨|The <b>law of superposition</b> says deeper rock layers are usually older. <b>Index fossils</b> are fossils of species that lived a short time over a wide area, so they help date layers.",
    "Atoms that decay|☢️|Radioactive atoms break down at a steady rate. The <b>half-life</b> is the time for half of the atoms to decay. Carbon-14 has a half-life of 5,730 years and works up to about 50,000 years.",
    "Older fossils|🦖|For dinosaur-age rocks, scientists use atoms with much longer half-lives, like uranium."
  ], [
    "Deeper rock layers are usually...|older|🪨||younger,warmer",
    "The idea that lower layers are older is the law of...|superposition|🪨||gravity,migration",
    "A fossil of a species that lived a short time over a wide area is an ___ fossil|index|🐚||random,pet",
    "Carbon-14 dating works on remains up to about ___ years old|50,000|⏳||500,5 million",
    "Radiometric dating uses the steady breakdown of...|radioactive atoms|☢️||bones,sand",
    "Which is better for dating a 100-million-year-old rock layer: uranium or carbon-14?|uranium|☢️||carbon-14,paint",
    "A half-life is the time for half of the atoms to...|decay|⏳||grow,multiply",
    "The half-life of carbon-14 is about 5,730...|years|⏳||seconds,minutes"
  ], "Think about layers and steady decay.", "Deeper means older; half-lives are fixed.", halfLife, 0.5));
  c.push(L("Moving continents", [
    "Wegener's idea|🌍|In 1912 Alfred Wegener proposed <b>continental drift</b>. Once there was one giant land, <b>Pangaea</b>. Earth's crust is made of slow-moving <b>plates</b> that move about as fast as fingernails grow.",
    "Fossil clues|🦎|<i>Mesosaurus</i> fossils are found in both South America and Africa, which were once joined. Marsupials in Australia and South America come from the southern land called Gondwana.",
    "Islands|🏝️|Lemurs live only on Madagascar, which split off and became isolated."
  ], [
    "The giant ancient supercontinent was named...|Pangaea|🌍||Atlantis,Lemuria",
    "Alfred Wegener proposed continental...|drift|🌍||freeze,growth",
    "<i>Mesosaurus</i> fossils in South America and Africa suggest the continents were once...|joined|🦎||frozen,empty",
    "The slow-moving pieces of Earth's crust are called...|plates|🌍||bowls,ropes",
    "Plates move about as fast as your ___ grow|fingernails|💅||trees,teeth",
    "Marsupials in Australia and South America come from a once-joined land called...|Gondwana|🦘||Europe,Asia",
    "Fossils of the same species on separate continents are evidence for...|continental drift|🦴||ocean waves,earthquakes",
    "Lemurs live only on...|Madagascar|🐒||Iceland,Cuba"
  ], "Think about land masses that were once joined.", "Plates drift slowly."));
  c.push(L("r and K strategies", [
    "Two ways to live|👶|<b>r-strategists</b> (frogs, insects, oysters) have many young and give little care. Most young die, but a few survive.",
    "K-strategists|🐘|<b>K-strategists</b> (elephants, whales, apes) have few young, give a lot of care and live longer. They mature later.",
    "Risk|⚠️|K-strategists reproduce slowly, so they recover slowly when numbers fall. The ocean sunfish can make hundreds of millions of eggs; an albatross raises one chick at a time."
  ], [
    "Elephants have few young and give lots of...|care|🐘||eggs,babies at once",
    "Which animal is an r-strategist?|frog|🐸||elephant,whale",
    "K-strategists tend to live...|longer|🐘||shorter,only a day",
    "r-strategists often have a short...|lifespan|🐸||tail,name",
    "Which matures later?|elephant|🐘||mouse,fly",
    "Which makes far more eggs at a time?|ocean sunfish|🐟||albatross,penguin",
    "K-strategists are at more risk when numbers drop because they...|reproduce slowly|🐘||reproduce quickly,fly away",
    "Whales, apes and elephants are mostly...|K-strategists|🐋||r-strategists,decomposers"
  ], "Think about many young with little care versus few with much care.", "Quantity or quality."));
  c.push(L("Survivorship curves", [
    "Who survives?|📊|A <b>survivorship curve</b> shows how many of a group are still alive at each age.",
    "Three types|📈|<b>Type I</b>: most live to old age (humans, elephants). <b>Type II</b>: a steady chance of dying at any age (many small birds, squirrels). <b>Type III</b>: most die when very young, but survivors can live long (oysters, sea turtles, many fish).",
    "Link|🔗|K-strategists tend to be Type I and give lots of parental care."
  ], [
    "In a Type I curve, most individuals...|live to old age|📈||die young,never hatch",
    "Which animal fits Type III?|sea turtle|🐢||elephant,human",
    "Which fits Type II, with a steady chance of dying at any age?|squirrel|🐿️||elephant,oyster",
    "Survivorship curves plot age against the number...|surviving|📊||hatching,eating",
    "Type I species usually give lots of...|parental care|🐘||eggs,wings",
    "K-strategists commonly follow Type...|I|🐘||III,V",
    "Mortality means...|death rate|📊||birth rate,growth rate",
    "A life table lists, for each age, how many...|survive|📋||hatch,migrate"
  ], "Think about when most deaths happen: early, steady, or late.", "I late, II steady, III early."));
  c.push(L("Sharing a habitat", [
    "Dividing resources|🌳|<b>Niche partitioning</b> means species divide resources so they can coexist. Robert MacArthur found warblers feeding in different parts of the same spruce tree.",
    "African grasslands|🦒|Giraffes eat treetops, zebras tall grass, wildebeest shorter grass and gazelles the shortest. Cheetahs hunt mostly by day, leopards by night.",
    "Niche words|🧩|A <b>niche</b> is a species' role in its ecosystem. With competitors present, the niche it really uses is its <b>realized niche</b>."
  ], [
    "Species dividing up resources to reduce competition is niche...|partitioning|🌳||migration,drift",
    "Which of these eats the highest leaves?|giraffe|🦒||zebra,gazelle",
    "MacArthur's warblers fed in different parts of the same...|tree|🌲||pond,cave",
    "Resource partitioning allows more species to...|coexist|🤝||fight,vanish",
    "Cheetahs hunt mostly by day, while leopards hunt mostly by...|night|🌙||dawn only,winter",
    "Long-billed shorebirds probe ___ in the mud than short-billed ones|deeper|🏖️||shallower,sideways",
    "The role and place of a species in its ecosystem is its...|niche|🧩||biome,range",
    "The part of its niche a species really uses with competitors present is its ___ niche|realized|🧩||imaginary,frozen"
  ], "Think about how species avoid using the same thing.", "Different foods, places, times."));
  c.push(L("The Cambrian explosion", [
    "A burst of life|💥|About 540 million years ago, in the <b>Cambrian</b> period, many kinds of animals appeared quickly in the oceans. Before that, most life was simple or soft-bodied.",
    "New features|🦐|Hard shells, eyes and legs became common. <b>Trilobites</b> were armored arthropods. Eyes may have driven prey to evolve shells and spines.",
    "Fossil treasure|🪨|The Burgess Shale in Canada has superb Cambrian fossils, even of soft parts."
  ], [
    "The Cambrian explosion began about ___ million years ago|540|💥||65,250",
    "The Cambrian is famous for a burst of new ___ forms|animal|💥||volcano,cloud",
    "Trilobites were armored...|arthropods|🦐||mammals,birds",
    "The Burgess Shale fossils are in...|Canada|🪨||Brazil,India",
    "Hard body parts first became common in the...|Cambrian|🐚||Jurassic,Ice Age",
    "Before the Cambrian, life was mostly simple and lived in the...|ocean|🌊||desert,trees",
    "Which came first?|trilobites|🦐||dinosaurs,mammoths",
    "Eyes may have pushed prey to evolve...|armor|🛡️||wings only,fur"
  ], "Think about the first big burst of animal types.", "Long ago, in the sea, shells and eyes."));
  c.push(L("Genetic drift", [
    "Chance changes|🎲|<b>Genetic drift</b> is a random change in how common an allele is, and it matters most in small populations.",
    "Bottlenecks|🍾|A sudden drop in population size is a <b>bottleneck</b>. Cheetahs and northern elephant seals (hunted to fewer than 100) have low genetic variation.",
    "Founders|🏝️|A new colony started by just a few animals has less variation, the <b>founder effect</b>. Low variation can leave a species open to a new disease."
  ], [
    "A random change in how common an allele is, especially in small populations, is genetic...|drift|🎲||mutation,flow",
    "A sudden drop in population size leads to a...|bottleneck|🍾||pipeline,shortcut",
    "Cheetahs have very ___ genetic variation|low|🐆||high,colorful",
    "Hunting left fewer than 100 northern elephant seals, lowering their genetic...|diversity|🦭||weight,height",
    "Small populations lose variation faster than ___ ones|large|🐾||tiny,old",
    "With little variation, a new disease could ___ most of a population|harm|🦠||help,feed",
    "A new colony started by a few animals has ___ variation|less|🏝️||more,exactly the same",
    "Genetic drift happens because of...|chance|🎲||choice,fur color"
  ], "Think about luck in small groups.", "Few animals, random changes."));
  c.push(MIX("Mixed practice", c.slice(0, 18)));
  c.push(MIX("Level 15 Challenge", c.slice(0, 18).reverse()));

  Object.assign(ANIMALS_LEVELS, { 13: a, 14: b, 15: c });
})();
