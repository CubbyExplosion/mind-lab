// ext/life-16-18.js  Life Science levels 16-18
(() => {
  const nz = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
  // L(title, slides["h|v|t"], items["question|answer|picture|clue|wrong1,wrong2"], nudge)
  const L = (title, slides, items, nudge) => {
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
      let h2 = it.c || "";
      if (!h2 || leaks(h2)) h2 = `The answer starts with "${it.a[0].toUpperCase()}" and has ${it.a.replace(/ /g, "").length} letters.`;
      return {
        text: it.q, visual: it.v || undefined, choices: shuf([it.a, ...wr]), answer: it.a,
        hints: [h1, h2, `Example: ${ex.q} The answer is "${ex.a}". Now do yours.`]
      };
    };
    make.teach = () => slides.map(s => { const p = s.split("|"); return { h: p[0], v: p[1], t: p[2] }; });
    return { title, make };
  };
  const MIX = (title, ls) => {
    const make = () => pick(ls).make();
    make.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes ideas you already know. Here is a quick reminder, then the quiz." }, ...ls.slice(0, 4).map(l => l.make.teach()[0])];
    return { title, make };
  };

  // ================= LEVEL 16 =================
  const a = [];
  a.push(L("Two stages of photosynthesis", [
    "Light reactions|☀️|The <b>light reactions</b> happen in the <b>thylakoid</b> membranes. Light energy splits water, releases oxygen, and makes the energy carriers ATP and NADPH.",
    "The Calvin cycle|🍬|The <b>Calvin cycle</b> happens in the <b>stroma</b>. It uses carbon dioxide plus the ATP and NADPH to build sugar. It does not use light directly.",
    "Working as a team|🤝|The two stages depend on each other. The light reactions make the energy carriers; the Calvin cycle uses them and sends back the empty carriers to be recharged."
  ], [
    "Which stage needs light directly?|light reactions|☀️||the Calvin cycle,fermentation",
    "Where does the Calvin cycle take place?|stroma|🌿||thylakoid membranes,nucleus",
    "The oxygen released in photosynthesis comes from splitting...|water|💧||carbon dioxide,glucose",
    "The Calvin cycle uses carbon dioxide to build...|sugar|🍬||oxygen,water",
    "The light reactions take place in the...|thylakoid membranes|🌿||stroma,cell wall",
    "Which two energy carriers do the light reactions make?|ATP and NADPH|⚡||glucose and oxygen,water and carbon dioxide",
    "Which gas enters the Calvin cycle?|carbon dioxide|💨||oxygen,nitrogen",
    "Which stage builds sugar from carbon dioxide?|Calvin cycle|🍬||light reactions,glycolysis"
  ], "One stage captures light energy. The other uses that energy to build sugar."));
  a.push(L("Chloroplasts and pigments", [
    "Inside a chloroplast|🌿|A chloroplast has stacks of flat sacs called <b>grana</b> (made of thylakoids), surrounded by fluid called the <b>stroma</b>. Chlorophyll sits in the thylakoid membranes.",
    "Pigments|🎨|<b>Chlorophyll</b> absorbs mostly red and blue light and reflects green, so leaves look green. <b>Carotenoids</b> are yellow and orange pigments.",
    "Autumn colors|🍂|In autumn the green chlorophyll breaks down. The yellow and orange carotenoids that were hiding underneath finally show."
  ], [
    "Why do most leaves look green?|chlorophyll reflects green light|🍃||chlorophyll absorbs green light,leaves are painted green",
    "Which colors does chlorophyll absorb best?|red and blue|🌈||green and yellow,only green",
    "A stack of thylakoids is called a...|granum|🥞||stroma,cristae",
    "The fluid inside a chloroplast is the...|stroma|💧||granum,cristae",
    "Yellow and orange pigments in leaves are...|carotenoids|🍂||chlorophylls,cellulose",
    "In autumn, leaves turn yellow because chlorophyll...|breaks down|🍁||gets stronger,turns into sugar",
    "Which organelle contains chlorophyll?|chloroplast|🌿||mitochondrion,vacuole",
    "Green light is not used much by plants because it is mostly...|reflected|🟢||absorbed,frozen"
  ], "Think about which colors a leaf takes in and which colors bounce back to your eyes."));
  a.push(L("Fermentation", [
    "Energy without oxygen|🍞|<b>Fermentation</b> lets cells get a little energy from sugar when there is no oxygen. It is much less efficient than aerobic respiration.",
    "Yeast and bread|🥖|<b>Yeast</b> is a tiny fungus. It ferments sugar in dough and makes <b>carbon dioxide</b> gas. The gas bubbles are trapped in the dough, so bread rises and has little holes.",
    "Lactic acid|🥛|Some bacteria ferment milk sugar into <b>lactic acid</b>, which makes yogurt tangy. Tired muscles can also make lactic acid when oxygen runs low."
  ], [
    "Which gas makes bread dough rise?|carbon dioxide|🍞||oxygen,hydrogen",
    "Yeast belongs to which group of living things?|fungi|🍄||bacteria,plants",
    "Does fermentation need oxygen?|no|🚫||yes,only in sunlight",
    "What do yeast cells ferment in dough?|sugar|🍬||salt,oil",
    "Why does bread have little holes?|gas bubbles get trapped|🥖||the flour shrinks,yeast eats the flour away",
    "Which acid do bacteria make when they ferment milk into yogurt?|lactic acid|🥛||citric acid,carbon dioxide",
    "What does the heat of baking do to yeast?|kills it|🔥||helps it grow,turns it into sugar",
    "Fermentation is a way to get energy without...|oxygen|💨||water,sugar"
  ], "Fermentation works when there is no oxygen. What does yeast release?"));
  a.push(L("The nephron", [
    "Kidneys filter blood|🫘|Your two kidneys clean your blood. Each kidney has about a million tiny filters called <b>nephrons</b>.",
    "Inside a nephron|🔬|Blood is squeezed through a ball of capillaries, the <b>glomerulus</b>. Water, salts, sugar and wastes leak out. The tubule then <b>reabsorbs</b> the useful things back into the blood.",
    "Making urine|🚽|What is left over is <b>urine</b>. It flows down the <b>ureter</b> to the <b>bladder</b>, and leaves the body through the <b>urethra</b>."
  ], [
    "What are the tiny filtering units of a kidney called?|nephrons|🫘||alveoli,neurons",
    "Which ball of capillaries filters the blood?|glomerulus|🔬||ureter,villus",
    "Which tube carries urine from a kidney to the bladder?|ureter|🫘||urethra,aorta",
    "Which tube carries urine out of the body?|urethra|🚽||ureter,trachea",
    "Which organ stores urine?|bladder|🚽||liver,stomach",
    "Useful things such as glucose are _____ back into the blood.|reabsorbed|🔁||excreted,digested",
    "The waste fluid that leaves the nephron is called...|urine|💛||bile,plasma",
    "How many kidneys do most people have?|2|🫘||1,4"
  ], "Filter first, then take back what the body needs."));
  a.push(L("Liver and pancreas", [
    "The liver|🫀|The <b>liver</b> is the largest organ inside the body. It makes <b>bile</b> to break up fats, stores extra sugar as <b>glycogen</b>, and breaks down harmful substances.",
    "The gallbladder|🟢|Bile is stored in the small <b>gallbladder</b> until fatty food arrives in the small intestine.",
    "The pancreas|🥞|The <b>pancreas</b> makes digestive enzymes that go into the small intestine. It also makes the hormone <b>insulin</b> to control blood sugar."
  ], [
    "Which organ makes bile?|liver|🫀||pancreas,stomach",
    "Bile helps to digest...|fats|🧈||proteins,vitamins",
    "Where is bile stored?|gallbladder|🟢||bladder,pancreas",
    "Which organ makes insulin?|pancreas|🥞||liver,gallbladder",
    "Pancreas enzymes flow into the...|small intestine|🍽️||mouth,lungs",
    "The liver stores extra sugar as...|glycogen|🍬||starch,keratin",
    "Which organ helps break down harmful substances?|liver|🫀||lungs,eyes",
    "What is the largest organ inside the body?|liver|🫀||heart,brain"
  ], "Think of digestion helpers: one makes bile, one makes enzymes and insulin."));
  a.push(L("Negative feedback", [
    "Staying steady|🌡️|<b>Homeostasis</b> means keeping conditions inside the body steady, like body temperature (about 37 degrees C) and blood sugar.",
    "Feedback loops|🔁|In <b>negative feedback</b>, a sensor notices a change, a control center decides, and an effector makes a response that <b>reverses</b> the change, like a thermostat.",
    "Examples|💦|Too hot: you sweat and blood vessels in the skin widen. Too cold: you shiver to make heat. High blood sugar: the pancreas releases insulin."
  ], [
    "Negative feedback does what to a change?|reverses it|🔁||makes it bigger,ignores it",
    "When your body gets too hot, you...|sweat|💦||shiver,sleep",
    "Which one helps warm you up?|shivering|🥶||sweating,panting",
    "A thermostat turns the heater off when the room is warm. This is like...|negative feedback|🌡️||a mutation,a food chain",
    "Keeping the inside of the body steady is called...|homeostasis|⚖️||metamorphosis,digestion",
    "Normal human body temperature, in degrees C, is about...|37|🌡️||25,45",
    "When blood sugar is too high, the pancreas releases...|insulin|🍬||bile,oxygen",
    "The part of a feedback loop that carries out the response is the...|effector|💪||sensor,stimulus"
  ], "A negative feedback loop pushes things back toward normal."));
  a.push(L("Rods and cones", [
    "The retina|👁️|The <b>retina</b> is the back layer of the eye. It is full of light-sensing cells that send signals along the <b>optic nerve</b> to the brain.",
    "Two kinds of cells|🌗|<b>Rods</b> work in dim light but cannot see color. <b>Cones</b> need bright light and let you see color and fine detail.",
    "Focusing|🔍|The <b>cornea</b> and <b>lens</b> bend light to form an image on the retina. The image is upside down, and the brain flips it. The <b>iris</b> changes the size of the pupil."
  ], [
    "Which cells work in dim light?|rods|🌙||cones,lenses",
    "Which cells let you see color?|cones|🌈||rods,pupils",
    "Which layer at the back of the eye senses light?|retina|👁️||cornea,iris",
    "Which nerve carries signals from the eye to the brain?|optic nerve|🧠||auditory nerve,spinal cord",
    "Which part at the front of the eye bends light first?|cornea|👁️||retina,optic nerve",
    "Why do colors look faded in a dark room?|cones need bright light|🌑||rods need color,the lens is closed",
    "The image formed on the retina is...|upside down|🙃||blurry,green",
    "Which part changes the size of the pupil?|iris|🌀||retina,lens"
  ], "Think about which cells are for brightness and which are for color."));
  a.push(L("Hearing and balance", [
    "Sound path|👂|Sound waves enter the outer ear and make the <b>eardrum</b> vibrate. Three tiny bones, the <b>hammer, anvil and stirrup</b>, pass the vibrations on.",
    "The cochlea|🐌|The snail-shaped <b>cochlea</b> is full of fluid and tiny hair cells. They turn vibrations into signals that the <b>auditory nerve</b> carries to the brain.",
    "Balance|🤸|Three loops called the <b>semicircular canals</b> sense head movement and help you keep your balance. The stirrup is the smallest bone in the body."
  ], [
    "Which thin membrane vibrates when sound hits it?|eardrum|🥁||cochlea,lens",
    "What are the three tiny ear bones called together?|ossicles|🦴||vertebrae,phalanges",
    "Which snail-shaped part turns vibrations into signals?|cochlea|🐌||retina,tongue",
    "Which part of the inner ear helps with balance?|semicircular canals|🤸||ossicles,eardrum",
    "Sound travels through the air as...|vibrations|🔊||light rays,chemicals",
    "Which nerve carries sound signals to the brain?|auditory nerve|🧠||optic nerve,spinal cord",
    "The part of the ear you can see is the...|outer ear|👂||inner ear,cochlea",
    "The smallest bone in the body is the...|stirrup|🦴||femur,skull"
  ], "Follow the path of a sound: outside, eardrum, tiny bones, then the inner ear."));
  a.push(L("Neurons and synapses", [
    "Two parts of the system|🧠|The <b>central nervous system (CNS)</b> is the brain and spinal cord. The <b>peripheral nervous system (PNS)</b> is all the nerves that branch out to the body.",
    "Inside a neuron|⚡|<b>Dendrites</b> receive signals. The signal runs along the <b>axon</b> as an electrical impulse. Many axons are wrapped in <b>myelin</b>, which speeds up the signal.",
    "Across the gap|🔗|Neurons do not touch. A tiny gap called a <b>synapse</b> separates them, and chemicals called <b>neurotransmitters</b> carry the message across."
  ], [
    "The CNS includes the...|brain and spinal cord|🧠||heart and lungs,nerves in the arms",
    "Nerves outside the brain and spinal cord make up the...|peripheral nervous system|🕸️||central nervous system,endocrine system",
    "The tiny gap between two neurons is a...|synapse|🔗||dendrite,nucleus",
    "Chemicals that cross the synapse are...|neurotransmitters|⚗️||enzymes,antibodies",
    "Which part carries a signal away from the cell body?|axon|➡️||dendrite,nucleus",
    "Which branches receive signals?|dendrites|🌿||axons,synapses",
    "A fatty coating that speeds up signals is...|myelin|🧈||keratin,cellulose",
    "A signal traveling inside a neuron is...|electrical|⚡||magnetic,a sound"
  ], "Signals go along a neuron electrically, then cross a gap chemically."));
  a.push(L("Plant hormones", [
    "Auxin and bending|🌱|<b>Auxin</b> is a plant hormone. In a stem it collects on the shaded side and makes those cells grow longer, so the stem bends toward light. This is <b>phototropism</b>.",
    "More hormones|🍌|<b>Gibberellins</b> help stems grow and seeds sprout. <b>Ethylene</b> is a gas that ripens fruit. <b>Abscisic acid</b> closes stomata when water is short.",
    "Tropisms|↕️|A <b>tropism</b> is growth toward or away from something. Roots grow down (<b>gravitropism</b>) and shoots grow up."
  ], [
    "Which hormone makes a stem bend toward light?|auxin|🌱||ethylene,insulin",
    "Growth toward light is called...|phototropism|💡||gravitropism,thigmotropism",
    "Which gas hormone ripens fruit?|ethylene|🍌||auxin,gibberellin",
    "Auxin collects on which side of a bending stem?|the shaded side|🌑||the sunny side,only the roots",
    "Roots growing downward is an example of...|gravitropism|⬇️||phototropism,hibernation",
    "Which hormone helps seeds sprout and stems grow tall?|gibberellin|🌱||ethylene,abscisic acid",
    "Which hormone closes stomata during a drought?|abscisic acid|🏜️||auxin,gibberellin",
    "A green banana ripens faster next to a ripe one because of...|ethylene|🍌||chlorophyll,gravity"
  ], "Each plant hormone has its own job. Which one fits?"));
  a.push(L("Reading climatograms", [
    "Two things on one graph|📈|A <b>climatogram</b> shows a place's climate. A <b>line</b> shows average temperature each month and <b>bars</b> show how much rain or snow falls.",
    "Reading the shape|🔎|Tall bars every month mean it is wet all year. Tiny bars mean dry. A line that stays high is hot all year; a line below 0 degrees C means freezing months.",
    "Match a biome|🗺️|Tropical rainforest: hot and very wet. Desert: very little rain. Tundra: freezing most of the year. Temperate forest: four seasons with rain all year."
  ], [
    "On a climatogram, what does the line show?|temperature|🌡️||rainfall,wind speed",
    "On a climatogram, what do the bars show?|precipitation|🌧️||temperature,sunlight",
    "Hot all year with more than 20 cm of rain every month. Which biome?|tropical rainforest|🌴||desert,tundra",
    "Hot days and almost no rain in any month. Which biome?|desert|🏜️||taiga,tropical rainforest",
    "Temperatures below 0 degrees C most months with little precipitation. Which biome?|tundra|🥶||desert,temperate forest",
    "Warm wet summers, cold winters, rain all year, trees that drop leaves. Which biome?|temperate forest|🍂||desert,tundra",
    "Very long cold winters, short summers and many cone-bearing trees. Which biome?|taiga|🌲||desert,tropical rainforest",
    "A temperature line that stays high and flat means...|little change across seasons|📏||four strong seasons,freezing all year"
  ], "Decide first: is it hot or cold, and wet or dry?"));
  a.push(L("Trophic cascades", [
    "Chain reactions|🐺|A <b>trophic cascade</b> is a chain of effects that ripples down a food web when a top predator is added or removed.",
    "Sea otters|🦦|Sea otters eat sea urchins. Where otters disappear, urchins multiply and eat the kelp, so kelp forests shrink and the animals that live in them lose their home.",
    "Wolves|🌳|When wolves returned to Yellowstone, elk grazed less along the rivers. Young willows and other plants grew back, and beavers and birds returned."
  ], [
    "If sea otters disappear, sea urchins...|increase|🦔||decrease,vanish too",
    "If urchins increase a lot, kelp forests...|shrink|🌊||grow,stay exactly the same",
    "After wolves returned to Yellowstone, grazing by elk...|decreased|🐺||increased,stopped completely",
    "A trophic cascade is...|a chain of effects through a food web|🔗||a kind of waterfall,a plant disease",
    "If a top predator is removed, which group usually increases first?|its prey|🦌||sunlight,producers",
    "Predators controlling prey numbers is called...|top-down control|⬇️||bottom-up control,sideways control",
    "After wolves returned, streamside willows...|grew back|🌳||were eaten more,stopped growing",
    "Top predators sit at the...|top of the food web|🔝||bottom of the food web,middle only"
  ], "Follow the effect link by link up and down the food web."));
  a.push(L("Carbon sinks and sources", [
    "Sinks and sources|🌲|A <b>carbon sink</b> takes in more carbon than it releases. A <b>carbon source</b> releases more than it takes in.",
    "Natural sinks|🌊|Forests store carbon in wood and leaves. Oceans dissolve carbon dioxide. Soil holds carbon from dead plants.",
    "Sources|🏭|Burning coal, oil and gas releases carbon that was stored for millions of years. Cutting down and burning forests also releases carbon. Volcanoes and the respiration of living things are natural sources."
  ], [
    "A growing forest is usually a...|carbon sink|🌲||carbon source,carbon factory",
    "Burning coal or oil is a...|carbon source|🏭||carbon sink,carbon filter",
    "Fossil fuels formed from...|ancient plants and animals|🦕||moon dust,melted glass",
    "Deforestation mostly...|releases carbon|🪓||removes carbon from air,cools the air",
    "Planting trees helps by...|taking in carbon dioxide|🌱||adding more coal,making more rocks",
    "Oceans act as a sink because carbon dioxide...|dissolves in the water|🌊||freezes into ice,turns into stone at once",
    "A volcano is a...|natural carbon source|🌋||carbon sink,solar panel",
    "Wood stores carbon that the tree took from...|the air|🌳||the moon,the soil minerals"
  ], "Does the thing take carbon in, or send carbon out?"));
  a.push(L("Body clocks", [
    "The 24-hour clock|⏰|A <b>circadian rhythm</b> is a body cycle of about <b>24 hours</b>. It controls when you feel sleepy or awake. A tiny area in the hypothalamus of the brain is the master clock.",
    "Light is the signal|💡|Light entering the eyes sets the clock. In the evening the brain releases <b>melatonin</b>, a hormone that makes you sleepy. Bright light late at night can delay it.",
    "Day and night animals|🦉|<b>Diurnal</b> animals are active by day, <b>nocturnal</b> animals at night, and <b>crepuscular</b> animals at dawn and dusk. <b>Jet lag</b> happens when travel puts your body clock out of step."
  ], [
    "A circadian rhythm lasts about...|24 hours|⏰||7 days,1 hour",
    "Which hormone makes you sleepy in the evening?|melatonin|😴||insulin,auxin",
    "Which signal mostly sets the body clock?|light|💡||smell,gravity",
    "Jet lag happens when...|your body clock is out of step with the new time|✈️||you eat too much,the plane is loud",
    "An animal active at night is...|nocturnal|🦉||diurnal,crepuscular",
    "An animal active at dawn and dusk is...|crepuscular|🌅||nocturnal,diurnal",
    "Which part of the brain holds the master clock?|hypothalamus|🧠||cerebellum,brain stem",
    "Bright screens late at night can make it...|harder to fall asleep|📱||easier to wake up,faster to grow"
  ], "The clock runs about a day long, and light keeps it on time."));
  a.push(L("Moving onto land", [
    "From fins to legs|🐟|Long ago, some <b>lobe-finned fish</b> had strong, limb-like fins. Fossils like <b>Tiktaalik</b> show a link between fish and four-legged animals.",
    "New problems on land|🌵|Air gives less support than water, so bodies needed strong limbs. Land animals also had to avoid drying out and breathe air with lungs.",
    "Eggs on land|🥚|Amphibians must lay soft eggs in water. Reptiles evolved the <b>amniotic egg</b> with a shell and scaly, waterproof skin, so they could live far from water."
  ], [
    "Which fish group is linked to the first four-legged animals?|lobe-finned fish|🐟||sharks,jellyfish",
    "Amphibians must return to water to...|lay eggs|🐸||breathe,sleep",
    "An egg with a shell and protective membranes for life on land is the...|amniotic egg|🥚||tadpole,spore",
    "Scaly skin helps reptiles...|keep water in|🦎||swim faster,sing",
    "Fossils of Tiktaalik show...|a link between fish and land animals|🦴||a bird ancestor,a plant seed",
    "Land animals need strong limbs because air...|gives less support than water|🦵||is too thick,has no gravity",
    "Which living things moved onto land before four-legged animals?|plants|🌱||mammals,birds",
    "Land vertebrates breathe with...|lungs|🫁||gills,fins"
  ], "What new problems did leaving water create, and what fixed them?"));
  a.push(L("Crossing over", [
    "Swapping pieces|🧬|In meiosis, pairs of <b>homologous chromosomes</b> line up and trade matching pieces. This is <b>crossing over</b>, and it makes new combinations of alleles.",
    "Shuffling|🃏|<b>Independent assortment</b> means each chromosome pair separates at random. Humans have 23 pairs, so one person can make over 8 million different gamete types.",
    "Why it matters|🌈|Sexual reproduction mixes genes, so brothers and sisters differ. Offspring made by mitosis (cloning) are usually genetically identical to the parent."
  ], [
    "Crossing over happens during...|meiosis|🧬||mitosis,photosynthesis",
    "In crossing over, pieces are swapped between...|homologous chromosomes|🧬||unrelated cells,ribosomes",
    "Crossing over makes new...|combinations of alleles|🎲||organelles,species",
    "In independent assortment, chromosome pairs separate...|randomly|🃏||in a fixed order,never",
    "Brothers and sisters differ because meiosis...|shuffles genes|👫||copies genes exactly,removes genes",
    "Identical twins come from...|one fertilized egg|👯||two eggs,no egg",
    "How many chromosomes are in a human egg or sperm cell?|23|🔢||46,92",
    "Offspring made by mitosis are usually...|identical to the parent|🪞||very different,half the size"
  ], "Meiosis shuffles alleles in two ways: swapping pieces and random sorting."));
  a.push(L("Types of animal tissue", [
    "Four main tissues|🧫|Animal bodies have four main tissue types: <b>epithelial</b>, <b>connective</b>, <b>muscle</b> and <b>nervous</b>.",
    "Cover and support|🦴|<b>Epithelial</b> tissue covers surfaces and lines organs, like skin and the lining of the stomach. <b>Connective</b> tissue supports and connects: bone, tendons, fat and even blood.",
    "Move and signal|⚡|<b>Muscle</b> tissue contracts to make movement. <b>Nervous</b> tissue (neurons) sends signals around the body."
  ], [
    "Which tissue covers the skin surface?|epithelial|🧴||connective,nervous",
    "Bone is which kind of tissue?|connective|🦴||epithelial,muscle",
    "Blood is a kind of...|connective tissue|🩸||muscle tissue,epithelial tissue",
    "Which tissue contracts to make movement?|muscle|💪||nervous,epithelial",
    "Neurons make up which tissue?|nervous|🧠||connective,muscle",
    "The lining of the stomach is which tissue?|epithelial|🍽️||nervous,connective",
    "Tendons that join muscle to bone are...|connective tissue|🦵||nervous tissue,epithelial tissue",
    "Heart muscle is part of which tissue type?|muscle|❤️||epithelial,connective"
  ], "Cover, support, move, signal: match the job to the tissue."));
  a.push(L("Blood types", [
    "ABO groups|🩸|Red blood cells can carry marker proteins called <b>antigens</b>. Type A has A antigens, type B has B, type AB has both, and type O has neither.",
    "Giving blood|💉|The wrong type of blood can make the receiver's blood clump. Type <b>O negative</b> red cells are safest for almost anyone (universal donor). Type <b>AB</b> can receive from all ABO types.",
    "Inheritance|🧬|Blood type genes have three alleles: A and B are codominant, and O is recessive. A person with both A and B alleles has type AB. The <b>Rh factor</b> is another protein, making blood positive or negative."
  ], [
    "Which blood type has both A and B antigens?|AB|🩸||O,A",
    "Which blood type has no A or B antigens?|O|🩸||AB,B",
    "Which type is called the universal donor for red cells?|O negative|💉||AB positive,B negative",
    "Type A can safely receive red cells from...|A and O|💉||B and AB,AB only",
    "Antigens for blood type sit on the...|red blood cells|🔴||platelets,bones",
    "A and B alleles showing together in type AB is an example of...|codominance|🧬||mutation,recessive inheritance",
    "Parents with types AB and O can NOT have a child with type...|AB|👪||A,B",
    "The Rh factor is a...|protein on red blood cells|🔴||kind of virus,type of vein",
    "If the wrong blood type is given, the blood may...|clump|⚠️||turn green,grow bigger"
  ], "Match the antigens (A, B, both, or none) to the blood type."));
  a.push(MIX("Mixed practice", [a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15], a[16], a[17]]));
  a.push(MIX("Level 16 Challenge", [a[0], a[3], a[5], a[6], a[8], a[9], a[10], a[11], a[13], a[15], a[16], a[17]]));

  // ================= LEVEL 17 =================
  const b = [];
  b.push(L("Hypotonic and hypertonic", [
    "Comparing solutions|🧂|Water moves by osmosis toward the side with <b>more dissolved solute</b>. A solution with the <b>same</b> solute as the cell is <b>isotonic</b>; more solute is <b>hypertonic</b>; less solute is <b>hypotonic</b>.",
    "Animal cells|🩸|In a hypotonic solution water rushes in and an animal cell swells and may burst. In a hypertonic solution water leaves and the cell shrivels. In an isotonic solution the cell stays the same.",
    "Plant cells|🥬|A plant cell in a hypotonic solution becomes firm, or <b>turgid</b>, and the cell wall stops it bursting. In a hypertonic solution the membrane pulls away from the wall. This is <b>plasmolysis</b>."
  ], [
    "A red blood cell is put in pure water. It...|swells|🩸||shrinks,stays exactly the same",
    "A cell is put in very salty water. It...|shrinks|🧂||swells,bursts at once",
    "A solution with the same solute concentration as the cell is...|isotonic|⚖️||hypotonic,hypertonic",
    "A solution with more solute than the cell is...|hypertonic|🧂||hypotonic,isotonic",
    "A solution with less solute than the cell is...|hypotonic|💧||hypertonic,isotonic",
    "Water moves toward the side with...|more dissolved solute|➡️||less dissolved solute,more air",
    "A plant cell in pure water becomes firm, or...|turgid|🥬||plasmolyzed,frozen",
    "A limp celery stick in plain water becomes crisp because water moves...|into the cells|🥬||out of the cells,nowhere"
  ], "Water follows the solute. Which side has more dissolved stuff?"));
  b.push(L("Active transport", [
    "Uphill movement|⛰️|<b>Passive transport</b>, like diffusion, moves things from high to low concentration and needs no energy. <b>Active transport</b> moves them from low to high, which needs <b>energy (ATP)</b>.",
    "Pumps|🔋|Active transport uses protein pumps in the membrane. The <b>sodium-potassium pump</b> in nerve cells uses ATP to push sodium ions out and potassium ions in.",
    "Big cargo|🫧|Cells move large particles in bubbles called vesicles. <b>Endocytosis</b> takes things in by engulfing them. <b>Exocytosis</b> sends things out."
  ], [
    "Active transport needs...|energy from ATP|🔋||no energy,only sunlight",
    "Active transport moves particles from...|low to high concentration|⛰️||high to low concentration,side to side with no change",
    "Moving down a concentration gradient with no energy is...|passive transport|⬇️||active transport,exocytosis",
    "Which membrane parts use ATP to move ions?|protein pumps|⚙️||water droplets,cell walls",
    "A cell engulfs a large particle. This is...|endocytosis|🫧||exocytosis,osmosis",
    "A cell sends materials out in vesicles. This is...|exocytosis|📤||endocytosis,diffusion",
    "The sodium-potassium pump gets its energy from...|ATP|⚡||sunlight,chlorophyll",
    "A white blood cell engulfs a bacterium by...|endocytosis|🦠||exocytosis,osmosis"
  ], "Does the cell have to spend energy, or does the substance move on its own?"));
  b.push(L("Enzyme rates", [
    "Best conditions|🌡️|Every enzyme has an <b>optimum</b> temperature and pH where it works best. Most human enzymes work best near 37 degrees C.",
    "Too hot or wrong pH|🔥|Heat or the wrong pH changes the enzyme's shape. A <b>denatured</b> enzyme cannot fit its substrate. Pepsin works in the acidic stomach (about pH 2); amylase in the mouth works near neutral.",
    "Reading graphs|📈|On a graph of rate against temperature, the rate climbs to a peak at the optimum, then drops fast. More substrate speeds up the reaction until every enzyme is busy (saturated)."
  ], [
    "Too much heat makes an enzyme...|denature|🔥||grow bigger,multiply",
    "The optimum is the condition where an enzyme works...|best|🏆||worst,only once",
    "Human enzymes work best at about what temperature (degrees C)?|37|🌡️||10,60",
    "Pepsin works best in what kind of conditions?|acidic|🍋||basic,frozen",
    "Adding more substrate speeds up a reaction until...|all enzymes are busy|📈||the enzyme melts,the substrate is gone from the label",
    "A denatured enzyme has lost its...|shape|🧩||nucleus,color",
    "After a reaction, an enzyme is...|unchanged and reused|♻️||used up,turned into sugar",
    "On a rate-versus-temperature graph, the peak shows the...|optimum temperature|⛰️||freezing point,lowest rate"
  ], "Enzymes are shape-dependent. What happens when the shape is wrecked?"));
  b.push(L("Proteins and amino acids", [
    "Building blocks|🧱|Proteins are long chains of <b>amino acids</b> joined by peptide bonds. Cells use <b>20</b> kinds of amino acids, like 20 different letters making endless words.",
    "Shape is function|🧶|The order of amino acids decides how the chain folds into a 3D shape. The shape decides the job. Change the order and the protein may stop working.",
    "Protein jobs|💪|Proteins are enzymes, antibodies, <b>hemoglobin</b> that carries oxygen, and <b>collagen</b> that strengthens skin. Heat or acid can <b>denature</b> a protein."
  ], [
    "Proteins are built from smaller units called...|amino acids|🧱||sugars,fatty acids",
    "How many kinds of amino acids do cells use to build proteins?|20|🔢||4,100",
    "What decides how a protein folds?|the order of amino acids|🧶||its color,its smell",
    "A protein's shape decides its...|function|🔧||age,color",
    "Which bonds join amino acids together?|peptide bonds|🔗||hydrogen gas,glue bonds",
    "Which protein carries oxygen in red blood cells?|hemoglobin|🩸||collagen,insulin",
    "Which protein gives strength to skin and tendons?|collagen|💪||hemoglobin,amylase",
    "Cells build proteins at the...|ribosomes|🏭||vacuoles,cell wall"
  ], "A protein is a chain. The chain's order sets its shape and job."));
  b.push(L("Fats and cell membranes", [
    "Lipids|🧈|<b>Lipids</b> such as fats and oils do not dissolve in water. Gram for gram, fat stores about twice as much energy as carbohydrates. Fat under the skin also insulates the body.",
    "Phospholipids|🫧|A cell membrane is made of <b>phospholipids</b>. Each has a <b>hydrophilic</b> (water-loving) head and two <b>hydrophobic</b> (water-fearing) tails, so they form a double layer.",
    "Cholesterol|🧪|<b>Cholesterol</b> is a lipid found in animal cell membranes, where it helps keep the membrane steady. The body also uses it to make some hormones."
  ], [
    "Lipids do not dissolve in...|water|💧||oil,fat",
    "Gram for gram, fat stores about _____ the energy of carbohydrates.|twice|🧈||half,the same as",
    "Cell membranes are mostly made of...|phospholipids|🫧||starch,cellulose",
    "Hydrophobic means...|water-fearing|🚫||water-loving,sugar-loving",
    "The head of a phospholipid is...|hydrophilic|💧||hydrophobic,magnetic",
    "The tails of a phospholipid are...|hydrophobic|🚫||hydrophilic,sugary",
    "Fat under the skin helps to...|insulate the body|🧥||digest food,carry oxygen",
    "Cholesterol in a membrane helps keep it...|steady|🧪||dry,green"
  ], "Remember: head loves water, tails avoid water."));
  b.push(L("Gene regulation", [
    "Same DNA, different jobs|🧬|Almost every cell in your body has the same DNA. A muscle cell and a nerve cell differ because they switch on different genes.",
    "Switches|🔛|<b>Transcription factors</b> are proteins that bind near a gene's <b>promoter</b> to turn the gene on or off. This is called <b>gene regulation</b>.",
    "Becoming specialized|🧫|When a cell becomes specialized, this is <b>differentiation</b>. A liver cell keeps its other genes but most of them stay switched off."
  ], [
    "A muscle cell and a nerve cell in the same person have the same...|DNA|🧬||ribosomes only,proteins",
    "They look different because different genes are...|switched on|🔛||made of different sugars,borrowed",
    "When a cell becomes specialized, this is called...|differentiation|🧫||photosynthesis,fermentation",
    "Proteins that turn genes on or off are...|transcription factors|🔛||antibodies,enzymes of digestion",
    "The place near a gene where factors bind is the...|promoter|📍||ribosome,vacuole",
    "A liver cell uses only some of its genes. The others are...|switched off|🔕||deleted,destroyed",
    "Gene regulation lets cells make proteins only...|when needed|⏱️||once in their life,at night",
    "Turning genes on and off is called gene...|regulation|🎛️||mutation,transport"
  ], "All cells have all the genes. What changes is which ones are used."));
  b.push(L("Kinds of mutations", [
    "Point mutations|🔤|A <b>substitution</b> swaps one DNA base for another. It might change one amino acid, or nothing (a <b>silent</b> mutation).",
    "Insertions and deletions|✂️|An <b>insertion</b> adds a base; a <b>deletion</b> removes one. They shift how the code is read after that point, a <b>frameshift</b>, which often wrecks the protein.",
    "Who is affected|👨‍👩‍👧|Mutations in body cells are not passed to children. Mutations in sperm or egg cells can be inherited. Sickle cell disease comes from a change in one base of the hemoglobin gene."
  ], [
    "One base swapped for another is a...|substitution|🔤||deletion,insertion",
    "An extra base added is an...|insertion|➕||substitution,inversion of the planet",
    "A base lost is a...|deletion|➖||insertion,substitution",
    "Insertions and deletions can cause a...|frameshift|🔀||silent mutation,clone",
    "A mutation in a sperm or egg cell can be...|passed to children|👶||ignored by DNA,used as food",
    "A mutation in a skin cell is...|not passed to children|🧴||always passed to children,always harmful",
    "A mutation that does not change the protein is...|silent|🤫||loud,frameshift",
    "Sickle cell disease is caused by a change in...|one base of the hemoglobin gene|🩸||the whole skeleton,a vitamin"
  ], "Think about what changed in the DNA letters and where."));
  b.push(L("Gene editing and cloning", [
    "CRISPR|✂️|<b>CRISPR-Cas9</b> is a tool based on a bacterial defense. A guide RNA leads the Cas9 enzyme, which acts like <b>molecular scissors</b>, to a chosen place in the DNA to cut it.",
    "Cloning|🐑|A <b>clone</b> is a genetically identical copy. In 1996 <b>Dolly the sheep</b> became the first mammal cloned from an adult cell.",
    "Using genetic engineering|🧫|Scientists put a human insulin gene into bacteria so they make insulin for people with diabetes. Gene editing may one day treat genetic disorders, so scientists also discuss safety and ethics."
  ], [
    "CRISPR-Cas9 works like...|molecular scissors|✂️||a microscope,a magnet",
    "What tells Cas9 where to cut?|guide RNA|🧭||a vitamin,a ribosome",
    "A clone is...|a genetically identical copy|🐑||a lookalike by chance,a mutated copy",
    "Which animal was the first mammal cloned from an adult cell?|Dolly the sheep|🐑||a spotted dog,Lucy the cow",
    "Putting a gene from one species into another is called genetic...|engineering|🧫||erosion,migration",
    "Why put the human insulin gene into bacteria?|so they make insulin|💉||so they glow,so they get bigger",
    "Gene editing raises questions about...|safety and ethics|🤔||recipes,shoe sizes",
    "Gene editing might help treat...|genetic disorders|🧬||sunburn only,weather"
  ], "Gene tools cut, copy, or move DNA. Which tool does what?"));
  b.push(L("Gene pools", [
    "A shared pool|🏊|A population's <b>gene pool</b> is all the alleles of all its members. <b>Allele frequency</b> is how common an allele is, as a fraction.",
    "Counting|🔢|If 30 of 100 alleles are A, the frequency of A is 30/100 = 0.30. In a two-allele gene the frequencies add up to 1, so a is 0.70.",
    "Evolution|🌍|<b>Evolution</b> is a change in allele frequencies in a population over generations. Individuals do not evolve; populations do. Mutation makes new alleles, and gene flow moves alleles between populations."
  ], [
    "All the alleles in a population make up its...|gene pool|🏊||food web,gene gun",
    "Evolution is a change in _____ over generations.|allele frequencies|🧬||the weather,the moon",
    "40 of 100 alleles are B. The frequency of B is...|0.4|🔢||0.04,4",
    "In 20 flies (40 alleles), 10 alleles are r. The frequency of r is...|0.25|🪰||0.5,0.1",
    "Allele A has frequency 0.7. The other allele (a) has frequency...|0.3|➗||0.7,1.7",
    "What evolves over generations?|populations|👥||single individuals,single cells only",
    "What makes brand-new alleles?|mutation|🔤||exercise,gene flow",
    "Moving alleles from one population to another is gene...|flow|🚶||drift,pool"
  ], "Frequency is part divided by whole. All the frequencies add up to 1."));
  b.push(L("Genetic drift", [
    "Random change|🎲|<b>Genetic drift</b> is a random change in allele frequencies from chance. It is strongest in small populations.",
    "Bottleneck|🍼|A <b>bottleneck</b> is a sudden drop in population size. The few survivors may carry only some alleles, so variation is lost. Cheetahs have very little genetic variation, probably from a past bottleneck.",
    "Founders|🏝️|The <b>founder effect</b> happens when a few individuals start a new colony. Their alleles may not match the original population. Low variation can make a population more at risk from disease."
  ], [
    "Random changes in allele frequencies are called genetic...|drift|🎲||flow,pool",
    "Drift has the biggest effect in...|small populations|🐾||large populations,empty places",
    "A sudden drop in population size is a...|bottleneck|🍼||founder,ladder",
    "A few individuals starting a new colony shows the...|founder effect|🏝️||bottleneck rule,cell theory",
    "Cheetahs have little variation, probably from a past...|bottleneck|🐆||flood of mutations,planting",
    "Drift is different from natural selection because it is...|random|🎲||based on fitness,always helpful",
    "Low genetic variation can make a population more at risk from...|disease|🦠||sunshine,rain",
    "A bottleneck usually _____ genetic variation.|reduces|📉||raises,cannot change"
  ], "Chance, not fitness, is what drives drift."));
  b.push(L("Homologous and analogous", [
    "Same ancestor|🦴|<b>Homologous structures</b> have the same basic bones because of a common ancestor, even if used differently: a human arm, a bat wing and a whale flipper.",
    "Same job, different ancestor|🦋|<b>Analogous structures</b> do the same job but did not come from the same ancestral structure, like a bird wing and an insect wing. This is <b>convergent evolution</b>.",
    "Leftovers|🦴|A <b>vestigial</b> structure is reduced and has little or no use now, like the human tailbone. Similar embryos also point to common ancestry."
  ], [
    "A human arm and a bat wing share similar bones. They are...|homologous|🦇||analogous,vestigial",
    "A bird wing and a butterfly wing are...|analogous|🦋||homologous,vestigial",
    "Homologous structures suggest...|a common ancestor|🌳||the same diet,the same age",
    "Analogous structures come from...|convergent evolution|🧭||a common parent bone,a mutation in the tailbone",
    "A reduced structure with little use is...|vestigial|🦴||analogous,homologous",
    "Which is an example of a vestigial structure in people?|the tailbone|🧍||the heart,the lungs",
    "A shark fin and a dolphin flipper look alike but evolved separately. This is...|convergent evolution|🐬||common ancestry,gene flow",
    "Early embryos of fish and humans both have gill-like pouches. This points to...|common ancestry|🧬||the same diet,pure chance"
  ], "Same ancestor? Same job? Those two questions sort most examples."));
  b.push(L("Adaptive radiation", [
    "One becomes many|🌳|<b>Adaptive radiation</b> is when one ancestor species splits into many new species that each fill a different niche.",
    "When it happens|🏝️|It happens when new niches open up: on new islands, or after a mass extinction removes competitors. Hawaiian honeycreepers evolved many beak shapes from one ancestor.",
    "Famous cases|🐦|Darwin's finches radiated on the Galapagos Islands. After the dinosaurs died out, mammals radiated into many forms, from bats to whales."
  ], [
    "In adaptive radiation, one ancestor species...|splits into many new species|🌳||merges into one,never changes",
    "Adaptive radiation often happens when there are many empty...|niches|🏝️||volcanoes,classrooms",
    "Hawaiian honeycreepers differ mainly in their...|beaks|🐦||wheels,gills",
    "After the dinosaurs died out, which group radiated?|mammals|🦇||dinosaurs again,trilobites",
    "Which place gave a famous example with finches?|Galapagos Islands|🏝️||Sahara,Arctic",
    "A new island is a good place for radiation because it has...|few competitors|🏝️||no sunlight,no water at all",
    "Each new species in a radiation fills a different...|niche|🧩||sea,ice cube",
    "Which can open new niches?|a mass extinction|☄️||a cloudy day,a short nap"
  ], "One group, many new ways of living."));
  b.push(L("Human evolution", [
    "Our family tree|🦶|Humans and chimpanzees share a <b>common ancestor</b>. People did not come from chimps. Early human relatives are called hominins.",
    "Walking upright|🚶|Walking on two legs, <b>bipedalism</b>, came before big brains. The famous fossil <b>Lucy</b> (<i>Australopithecus</i>), about 3 million years old, walked upright.",
    "Tools and fire|🔥|<i>Homo habilis</i> made simple stone tools. <i>Homo erectus</i> used fire. Our species, <i>Homo sapiens</i>, appeared in Africa about 300,000 years ago."
  ], [
    "Humans and chimps share a...|common ancestor|🌳||birthday,home town",
    "Walking on two legs is called...|bipedalism|🚶||metamorphosis,migration",
    "What came first in human evolution?|walking upright|🦶||big brains,space travel",
    "The fossil Lucy belongs to the genus...|Australopithecus|🦴||Tyrannosaurus,Homo sapiens",
    "The oldest Homo sapiens fossils are from...|Africa|🌍||Antarctica,South America",
    "Homo habilis is known for making...|stone tools|🪨||metal swords,pottery",
    "Homo erectus used...|fire|🔥||electricity,wheels",
    "Fossils and tools give scientists...|evidence|🔎||opinions only,riddles"
  ], "Think in order: upright walking, tools, fire, then our own species."));
  b.push(L("r and K strategies", [
    "Two ways to live|🐭|<b>r-strategists</b> have many offspring, give little care, grow up fast and often die young. Mice, mosquitoes and dandelions are examples.",
    "K-strategists|🐘|<b>K-strategists</b> have few offspring, give lots of care, take a long time to grow up and live long. Elephants, whales and humans are examples.",
    "What it means|⚖️|r-strategists can bounce back quickly after a population crash. K-strategists recover slowly, so they are more at risk when their numbers fall."
  ], [
    "Many small offspring and little care describes an...|r-strategist|🐭||K-strategist,producer",
    "Few offspring and lots of care describes a...|K-strategist|🐘||r-strategist,decomposer",
    "An elephant is a...|K-strategist|🐘||r-strategist,producer",
    "A mosquito is an...|r-strategist|🦟||K-strategist,decomposer",
    "A dandelion that spreads thousands of seeds is an...|r-strategist|🌼||K-strategist,omnivore",
    "Humans are mostly...|K-strategists|🧑||r-strategists,decomposers",
    "Which kind of species recovers faster after a crash?|r-strategists|📈||K-strategists,neither",
    "A whale that has one calf and cares for it a long time is a...|K-strategist|🐋||r-strategist,producer"
  ], "Count the offspring and the care."));
  b.push(L("Biomass and productivity", [
    "Two key words|⚖️|<b>Biomass</b> is the total mass of living things in an area. <b>Primary productivity</b> is how fast producers make organic matter from sunlight (or chemicals).",
    "High and low|🌴|Tropical rainforests, estuaries and coral reefs have high productivity. Deserts and the open ocean have low productivity because water or nutrients are short.",
    "Pyramids|🔺|A biomass pyramid is widest at the bottom, because producers hold the most mass. Energy is lost at each level, so there is less biomass in each higher level."
  ], [
    "The total mass of living things in an area is...|biomass|⚖️||temperature,climate",
    "How fast producers make organic matter is...|primary productivity|🌿||secondary consumption,decomposition",
    "Which level usually has the most biomass?|producers|🌿||top predators,secondary consumers",
    "Which ecosystem has very high productivity?|tropical rainforest|🌴||desert,open ocean",
    "A desert's productivity is limited mostly by...|water|🏜️||too much rain,too many fish",
    "A biomass pyramid narrows going up because...|energy is lost at each level|🔺||animals are shy,plants grow upside down",
    "Which is the base of a biomass pyramid?|producers|🌿||decomposers only,herbivores",
    "Plants use some of the sugar they make for their own...|respiration|🫁||digestion,migration"
  ], "More sun, water and nutrients mean more plant growth."));
  b.push(L("Ocean acidification", [
    "Extra carbon dioxide|🌊|The ocean absorbs part of the carbon dioxide people release. In water, it forms a weak acid, so the ocean's pH is slowly falling. A lower pH means <b>more acidic</b>.",
    "Shells at risk|🐚|Corals, clams, oysters and some tiny plankton build shells and skeletons from <b>calcium carbonate</b>. More acid makes it harder for them to build and keep their shells.",
    "Whole food webs|🐟|Reefs shelter a huge number of fish, and plankton feed many animals. Harm to them can ripple through the food web. Reducing carbon dioxide emissions helps."
  ], [
    "When the ocean absorbs extra carbon dioxide, it becomes more...|acidic|🌊||basic,sweet",
    "A lower pH means the water is more...|acidic|🧪||basic,solid",
    "Which animals struggle most as the ocean acidifies?|corals and shellfish|🐚||sharks and whales,gulls",
    "Shells and coral skeletons are made of...|calcium carbonate|🐚||sodium chloride,sugar",
    "The extra carbon dioxide comes mostly from burning...|fossil fuels|🏭||seaweed,sand",
    "The pH of pure, neutral water is...|7|🧪||1,14",
    "Harm to plankton and corals can ripple through the...|food web|🕸️||sand,weather map",
    "Which action helps slow ocean acidification?|cutting carbon dioxide emissions|🌍||dumping trash,adding salt"
  ], "Dissolved carbon dioxide makes water more acidic. What does acid do to shells?"));
  b.push(L("Conservation tools", [
    "Protecting places|🏞️|<b>Protected areas</b> like national parks and reserves keep habitats safe. <b>Wildlife corridors</b> are strips of habitat that link them so animals can move.",
    "Helping species|🐼|<b>Captive breeding</b> raises endangered animals in zoos and reserves so young can be released. <b>Seed banks</b> store seeds to protect plant species.",
    "Hotspots and sustainability|🌍|A <b>biodiversity hotspot</b> has many species found nowhere else and is under threat. <b>Sustainable use</b> means using resources in ways that let them last."
  ], [
    "Strips of habitat that link protected areas are...|wildlife corridors|🛤️||fences,power lines",
    "A national park is a kind of...|protected area|🏞️||road,farm field",
    "Raising endangered animals in zoos to release their young is...|captive breeding|🐼||fishing,pet trading",
    "A seed bank stores...|seeds|🌱||fossils,tools",
    "A region with many unique species that is under threat is a...|biodiversity hotspot|🔥||ghost town,carbon sink",
    "Using resources so they last is...|sustainable use|♻️||overharvesting,mining only",
    "Why do corridors help animals?|they let animals move between habitats|🦌||they make animals sleep,they trap animals",
    "Which is a way to conserve biodiversity?|protecting habitats|🌳||building on every forest,clearing more land"
  ], "Conservation protects places, species and the way we use resources."));
  b.push(L("Adaptive immunity", [
    "Innate and adaptive|🛡️|<b>Innate</b> defenses work against all germs: skin, stomach acid and white blood cells that eat germs. <b>Adaptive</b> immunity targets specific germs and remembers them.",
    "B cells and T cells|🧬|<b>B cells</b> make <b>antibodies</b> whose shape fits one antigen. <b>Helper T cells</b> direct the response and <b>killer T cells</b> destroy infected cells.",
    "Memory|💭|After an infection some <b>memory cells</b> stay. If the same germ returns, they respond fast, so you may not get sick. Vaccines train memory cells safely."
  ], [
    "B cells make...|antibodies|🧬||vitamins,hormones",
    "Killer T cells destroy...|infected cells|⚔️||all body cells,red blood cells",
    "Helper T cells...|direct other immune cells|📣||make bile,carry oxygen",
    "Memory cells help the body...|respond faster the next time|💭||forget germs,grow taller",
    "A marker that triggers an immune response is an...|antigen|🏷️||antibody,antibiotic",
    "An antibody's shape fits...|one specific antigen|🧩||every germ,only viruses",
    "Skin and stomach acid are part of...|innate immunity|🛡️||adaptive immunity,memory cells",
    "Vaccines train the...|adaptive immune system|💉||digestive system,skeleton"
  ], "Innate defenses are general; adaptive defenses are specific and remember."));
  b.push(MIX("Mixed practice", [b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8], b[9], b[10], b[11], b[12], b[13], b[14], b[15], b[16], b[17]]));
  b.push(MIX("Level 17 Challenge", [b[0], b[1], b[2], b[4], b[6], b[8], b[9], b[10], b[13], b[14], b[15], b[17], a[3], a[5], a[12]]));

  // ================= LEVEL 18 =================
  const c = [];
  c.push(L("Limiting factors in photosynthesis", [
    "What speeds it up|💡|The rate of photosynthesis depends on <b>light intensity</b>, the amount of <b>carbon dioxide</b> and <b>temperature</b>. More of each usually means a faster rate, up to a point.",
    "The limiting factor|📈|On a graph the rate rises and then levels off. The factor in shortest supply is the <b>limiting factor</b>. Adding more of something else will not help until the limiting one is increased.",
    "Too much heat|🔥|Very high temperatures denature enzymes, so the rate falls. Scientists can measure the rate by counting oxygen bubbles from pondweed in a given time."
  ], [
    "The factor in shortest supply that slows a process is the...|limiting factor|⛔||optimum factor,final factor",
    "On a graph, a rate that rises then levels off shows...|a limiting factor has been reached|📈||the experiment has failed,the plant has died",
    "Three things that affect photosynthesis rate are light, carbon dioxide and...|temperature|🌡️||sound,gravity",
    "At very high temperatures the photosynthesis rate falls because enzymes...|denature|🔥||multiply,grow",
    "Pondweed is used to measure the rate by counting...|oxygen bubbles|🫧||roots,leaves",
    "If light is the limiting factor, adding more carbon dioxide will...|not help much|🚫||speed it up a lot,stop it",
    "Making a bright lamp brighter helps when _____ is limiting.|light|💡||temperature,nothing",
    "In a dark room, the limiting factor is...|light|🌑||carbon dioxide,soil"
  ], "Find the one thing that is in shortest supply."));
  c.push(L("The cell cycle and cancer", [
    "Stages of the cycle|🔁|The <b>cell cycle</b> has a long <b>interphase</b> (the cell grows and copies its DNA in the <b>S phase</b>) and then <b>mitosis</b>. <b>Checkpoints</b> make sure DNA is undamaged before the cell goes on.",
    "When control fails|⚠️|<b>Cancer</b> starts when mutations in genes that control the cycle cause cells to divide without stopping. They can form a lump called a <b>tumor</b>.",
    "Types and prevention|🧴|A <b>benign</b> tumor stays in one place. A <b>malignant</b> tumor can spread. Avoiding too much UV light (use sunscreen) and not smoking lowers the risk of some cancers."
  ], [
    "In which part of interphase is DNA copied?|S phase|🧬||mitosis,checkpoint",
    "Checkpoints in the cell cycle check that...|DNA is undamaged and the cell is ready|✅||the cell is the right color,the cell is hungry",
    "Cancer is caused by cell division that is...|out of control|⚠️||too slow,perfectly normal",
    "A lump of dividing cells is a...|tumor|🔴||vesicle,organelle",
    "A tumor that stays in one place is...|benign|🟢||malignant,viral",
    "A tumor that can spread is...|malignant|🔴||benign,silent",
    "Which long phase comes before mitosis?|interphase|⏳||telophase,anaphase",
    "UV light from the sun can mutate skin cells. A good protection is...|sunscreen|🧴||more sunlight,sugar"
  ], "Cell division is normally tightly controlled. What goes wrong in cancer?"));
  c.push(L("Cell signaling", [
    "Sending a message|📡|Cells talk with chemical signals. A signal molecule (a <b>ligand</b>) fits a <b>receptor</b> protein on or in the target cell, like a key in a lock.",
    "Inside the cell|🔔|After the signal binds, a chain of molecules passes the message in (<b>signal transduction</b>), and the cell responds: it might make a protein, move or divide.",
    "Short and long range|✉️|Neurotransmitters send fast signals across a tiny synapse. Hormones travel in the blood to cells far away. For example, insulin binds receptors on body cells and tells them to take in glucose."
  ], [
    "A signal molecule fits into a...|receptor|🔑||ribosome,nucleolus",
    "A signal molecule is also called a...|ligand|🔑||lipid,lysosome",
    "The chain of steps that passes a message inside a cell is signal...|transduction|🔔||production,separation",
    "Hormones travel to far-away cells in the...|blood|🩸||stomach,bones",
    "Insulin tells body cells to take in...|glucose|🍬||oxygen,cholesterol",
    "Receptors are usually made of...|protein|🧩||starch,water",
    "Which signal crosses a synapse?|a neurotransmitter|⚡||an antibody,a hormone from the kidney",
    "Only cells with the right receptor will respond because the signal must...|fit the receptor|🔑||be very loud,be made of metal"
  ], "Think of a lock and a key: the signal is the key."));
  c.push(L("Programmed cell death", [
    "A cell's planned end|🧫|<b>Apoptosis</b> is programmed cell death. A cell follows an internal plan to shrink and be cleaned up by neighbors, without leaking harmful contents.",
    "Why it helps|✂️|Apoptosis shapes the body. It removes the webbing between fingers while a baby develops and the tail of a tadpole as it becomes a frog. It also removes damaged or dangerous cells.",
    "When it fails|⚖️|If damaged cells do not die when they should, they might keep dividing and become cancer. Healthy bodies balance cell division with cell death."
  ], [
    "Programmed cell death is called...|apoptosis|🧫||mitosis,osmosis",
    "Apoptosis helps shape fingers by removing the...|webbing between them|🖐️||bones,nails",
    "A tadpole loses its tail partly by...|apoptosis|🐸||photosynthesis,fermentation",
    "Damaged cells that do not die may cause...|cancer|⚠️||faster growth in height,better eyesight",
    "Apoptosis is a _____ process.|planned|📋||random,fast and messy",
    "A healthy body balances cell division with cell...|death|⚖️||color,sound",
    "In apoptosis the cell is cleaned up by...|its neighbors|🧹||sunlight,the skeleton",
    "Which is a reason for apoptosis?|removing damaged cells|🛡️||making more bones at once,growing a new head"
  ], "Some cells are meant to die so the body works well."));
  c.push(L("Three steps of respiration", [
    "Glycolysis|🍬|<b>Glycolysis</b> happens in the cytoplasm. One glucose is split into two pyruvate molecules, giving a small net gain of 2 ATP. No oxygen is needed.",
    "The Krebs cycle|🔄|In the mitochondrion, pyruvate is broken down in the <b>Krebs cycle</b>. Carbon dioxide is released and energy-carrying molecules are loaded.",
    "Electron transport|⚡|The <b>electron transport chain</b> on the inner membrane of the mitochondrion makes most of the ATP (about 30 or more). Oxygen is the last electron acceptor and forms <b>water</b>."
  ], [
    "Where does glycolysis happen?|cytoplasm|🍬||nucleus,chloroplast",
    "Glycolysis splits one glucose into two molecules of...|pyruvate|✂️||oxygen,starch",
    "Which stage releases carbon dioxide?|Krebs cycle|💨||glycolysis only,none of them",
    "Which stage makes most of the ATP?|electron transport chain|⚡||glycolysis,Calvin cycle",
    "The final electron acceptor in the chain is...|oxygen|💨||glucose,carbon dioxide",
    "Oxygen ends up in which product?|water|💧||sugar,protein",
    "Which stage does NOT need oxygen?|glycolysis|🚫||electron transport chain,all three need it",
    "The Krebs cycle and electron transport happen in the...|mitochondrion|🔋||ribosome,Golgi body"
  ], "Three stages: cytoplasm first, then two in the mitochondrion."));
  c.push(L("Endocrine glands", [
    "The glands|🧪|The <b>endocrine system</b> is made of glands that release hormones straight into the blood. The <b>pituitary</b> gland at the base of the brain is called the master gland.",
    "More glands|🦋|The <b>thyroid</b> in the neck controls metabolism. The <b>adrenal</b> glands make adrenaline for the fight-or-flight response. The <b>pancreas</b> controls blood sugar.",
    "Slow but long-lasting|⏳|Hormone messages are slower than nerve messages but last longer. Each hormone acts only on cells that have the right receptor."
  ], [
    "Which gland is called the master gland?|pituitary|🧠||thyroid,adrenal",
    "Which gland in the neck controls metabolism?|thyroid|🦋||adrenal,pancreas",
    "Which hormone prepares the body for fight or flight?|adrenaline|⚡||insulin,melatonin",
    "Which glands make adrenaline?|adrenal glands|⚡||thyroid glands,salivary glands",
    "Endocrine glands release hormones into the...|blood|🩸||mouth,air",
    "Compared with nerve messages, hormone messages are...|slower but longer lasting|⏳||faster and shorter,identical",
    "A hormone affects only cells that have the right...|receptor|🔑||shape of nucleus,color",
    "Which gland controls blood sugar with insulin?|pancreas|🍬||pituitary,thyroid"
  ], "Match each gland to its hormone job."));
  c.push(L("Epidemics and herd immunity", [
    "Disease words|🌍|An <b>outbreak</b> is a sudden rise in cases. An <b>epidemic</b> is a large outbreak in one region. A <b>pandemic</b> spreads across many countries or the world.",
    "Herd immunity|🛡️|When most people in a community are immune, usually through <b>vaccination</b>, a germ has trouble finding a new person to infect. This protects even people who cannot be vaccinated.",
    "Slowing the spread|🧼|Washing hands, staying home when sick, clean water, and finding and informing people who were near a sick person all help slow disease. Public health workers track the cases."
  ], [
    "A disease outbreak across many countries is a...|pandemic|🌍||local cold,fossil",
    "A large outbreak in one region is an...|epidemic|📈||adaptation,echo",
    "When most people in a community are immune, a germ spreads...|more slowly|🛡️||faster,just the same",
    "Herd immunity mostly comes from...|vaccination|💉||sunshine,exercise class",
    "Herd immunity helps protect people who...|cannot be vaccinated|🤝||never go outside,already got every disease",
    "Which action helps slow the spread of germs?|washing hands|🧼||sharing cups,skipping sleep",
    "A sudden rise in cases of a disease is an...|outbreak|📈||ecosystem,orbit",
    "Public health workers track cases to...|slow the spread|🔎||make the germ stronger,delete the vaccine"
  ], "Think about how many people can still catch the germ."));
  c.push(L("Calories and metabolism", [
    "Energy in food|🍎|A <b>Calorie</b> measures the energy in food. Carbohydrates and proteins give about <b>4 Calories per gram</b>. Fats give about <b>9 Calories per gram</b>.",
    "Metabolism|🔥|<b>Metabolism</b> is all the chemical reactions in the body. Your <b>basal metabolic rate (BMR)</b> is the energy you use at rest to breathe, pump blood and stay warm.",
    "Balance|⚖️|Active people use more energy. Eating much more energy than you use is stored as fat. A healthy diet gives the energy and nutrients the body needs to grow."
  ], [
    "How many Calories are in 10 g of fat?|90|🧈||40,100",
    "How many Calories are in 20 g of carbohydrate?|80|🍞||180,40",
    "How many Calories are in 5 g of protein?|20|🥩||45,10",
    "Which nutrient gives the most energy per gram?|fat|🧈||protein,carbohydrate",
    "All the chemical reactions in the body are called...|metabolism|🔥||digestion only,circulation",
    "The energy used at rest is the...|basal metabolic rate|😴||running rate,growth chart",
    "Extra energy that the body does not use is stored as...|fat|🧈||bone,hair",
    "Compared with sitting, running uses _____ energy.|more|🏃||less,exactly the same"
  ], "Fat has more energy per gram than carbs or proteins."));
  c.push(L("Memory and learning", [
    "Types of memory|💭|<b>Short-term memory</b> holds a little information for seconds to minutes, like a phone number you just heard. <b>Long-term memory</b> stores facts and skills for years.",
    "The brain's recorder|🧠|The <b>hippocampus</b> helps turn new experiences into long-term memories. Learning strengthens the connections (synapses) between neurons.",
    "Study tips|📚|Repeating information over several days, explaining it in your own words and getting enough sleep all help memories stick. Sleep helps the brain store what you learned."
  ], [
    "Which memory holds information for seconds to minutes?|short-term memory|⏱️||long-term memory,muscle memory only",
    "Which brain part helps make long-term memories?|hippocampus|🧠||cerebellum,spinal cord",
    "Learning strengthens connections called...|synapses|🔗||tendons,vacuoles",
    "Which helps memories stick?|getting enough sleep|😴||staying up all night,skipping review",
    "Repeating over several days helps move information into...|long-term memory|📅||the stomach,short-term memory",
    "A phone number you just heard is held in...|short-term memory|📞||long-term memory,the retina",
    "Explaining a topic in your own words helps you...|understand and remember|🗣️||forget faster,get dizzy",
    "Riding a bike for years is stored in...|long-term memory|🚲||short-term memory,the eardrum"
  ], "Short-term holds a little for a short time; long-term holds a lot for a long time."));
  c.push(L("Bacteria and plasmids", [
    "Copying|✖️|Bacteria reproduce by <b>binary fission</b>: the cell copies its DNA and splits in two. In good conditions some divide every 20 minutes.",
    "Plasmids|⭕|A <b>plasmid</b> is a small circle of extra DNA. It can carry useful genes, such as one that makes a bacterium resistant to an antibiotic.",
    "Sharing genes|🔗|In <b>conjugation</b>, one bacterium passes a plasmid to another. Scientists also use plasmids as carriers to move genes into bacteria, such as the insulin gene."
  ], [
    "Bacteria reproduce by...|binary fission|✖️||pollination,mitosis with a spindle",
    "A small circle of extra bacterial DNA is a...|plasmid|⭕||chromatid,centromere",
    "A plasmid might carry a gene for...|antibiotic resistance|💊||eye color,hair length",
    "When one bacterium passes a plasmid to another, this is...|conjugation|🔗||fission,digestion",
    "Scientists use plasmids as _____ to move genes into bacteria.|carriers|🚚||food,microscopes",
    "Under good conditions, some bacteria can divide about every...|20 minutes|⏱️||20 days,20 years",
    "Binary fission makes offspring that are usually...|genetically identical|🪞||all very different,half the DNA",
    "Plasmids help bacteria share genes without...|reproducing|🔄||dividing at all,any DNA"
  ], "Bacteria copy and split; plasmids are extra DNA they can share."));
  c.push(L("Virus life cycles", [
    "Needing a host|🦠|A virus cannot reproduce alone. It must get inside a <b>host cell</b> and use the cell's machinery to make more viruses. A virus that infects bacteria is a <b>bacteriophage</b>.",
    "Lytic cycle|💥|In the <b>lytic cycle</b> the virus takes over the cell, makes many new viruses, and the cell bursts (<b>lysis</b>), releasing them.",
    "Lysogenic cycle|😴|In the <b>lysogenic cycle</b> the virus DNA is inserted into the host's DNA and copied each time the cell divides. It can stay hidden for a long time, then switch to the lytic cycle."
  ], [
    "A virus infecting bacteria is a...|bacteriophage|🦠||protist,plasmid",
    "A virus can only reproduce inside a...|host cell|🧫||pond,leaf",
    "In the lytic cycle, the host cell...|bursts open|💥||grows bigger forever,turns into a seed",
    "In the lysogenic cycle, viral DNA...|is inserted into the host DNA|😴||is thrown away,becomes a protein only",
    "Which cycle can stay hidden for a long time?|lysogenic cycle|😴||lytic cycle,Calvin cycle",
    "Bursting of a host cell is called...|lysis|💥||fusion,osmosis",
    "Viruses make new viruses by using the host cell's...|machinery|🏭||sunlight,leaves",
    "A hidden virus can later switch to the...|lytic cycle|🔄||water cycle,carbon cycle"
  ], "Lytic bursts quickly; lysogenic hides in the DNA."));
  c.push(L("Lichens and mycorrhizae", [
    "Lichens|🪨|A <b>lichen</b> is a fungus living with an alga or cyanobacterium. The fungus holds water and shelter; the partner makes food by photosynthesis. Both benefit: <b>mutualism</b>.",
    "Pioneers|🌱|Lichens can grow on bare rock. They slowly break the rock down and help start <b>soil</b>, so plants can come later.",
    "Mycorrhizae|🍄|<b>Mycorrhizae</b> are fungi that wrap around plant roots. The fungal threads help the plant take in water and minerals, and the plant gives the fungus sugar."
  ], [
    "A lichen is a partnership between a fungus and an...|alga or cyanobacterium|🪨||ant,earthworm",
    "The relationship in a lichen is called...|mutualism|🤝||parasitism,predation",
    "The partner in a lichen that makes food is the...|alga|🟢||fungus,rock",
    "Lichens are useful pioneers because they help start...|soil|🌱||lakes,wind",
    "Fungi that wrap around plant roots are...|mycorrhizae|🍄||lichens,tubers",
    "Mycorrhizae help plants take in...|water and minerals|💧||sunlight,sugar",
    "In mycorrhizae, the plant gives the fungus...|sugar|🍬||oxygen only,seeds",
    "Lichens can grow on...|bare rock|🪨||only on animals,only underwater"
  ], "Both partners get something useful."));
  c.push(L("Plant tissues", [
    "Three tissue systems|🌿|<b>Dermal tissue</b> is the outer covering of a plant (the epidermis with a waxy cuticle). <b>Vascular tissue</b> (xylem and phloem) carries water and food. <b>Ground tissue</b> does photosynthesis, storage and support.",
    "Growing points|📍|<b>Meristems</b> are areas of cells that keep dividing, such as the tips of roots and shoots. This is how plants grow longer all their lives.",
    "Roots|🥕|<b>Root hairs</b> are tiny extensions of root epidermis cells. They greatly increase the surface area for taking in water and minerals."
  ], [
    "The outer covering of a plant is...|dermal tissue|🌿||vascular tissue,ground tissue",
    "Xylem and phloem are part of...|vascular tissue|🚰||dermal tissue,meristem",
    "Which tissue does photosynthesis and storage?|ground tissue|🍃||dermal tissue,vascular tissue",
    "Areas where plant cells keep dividing are...|meristems|📍||stomata,cuticles",
    "Plants grow longer at the tips of roots and shoots because of...|meristems|🌱||root hairs,flowers",
    "A waxy cuticle on a leaf helps to...|reduce water loss|🍃||attract insects,make seeds",
    "Root hairs increase the _____ for absorbing water.|surface area|🥕||weight,color",
    "Root hairs are extensions of...|epidermis cells|🥕||xylem cells,petals"
  ], "Cover, carry, make and store: three tissue systems."));
  c.push(L("Day length and flowering", [
    "Plants measure night|🌙|<b>Photoperiodism</b> is a plant's response to the length of day and night. Plants really measure the length of the dark period with a pigment called <b>phytochrome</b>.",
    "Short-day and long-day|🌼|<b>Short-day plants</b>, such as chrysanthemums and poinsettias, flower when nights are long. <b>Long-day plants</b>, such as spinach and lettuce, flower when nights are short.",
    "Why it matters|📅|Photoperiod tells plants the season, so they flower at a good time. Farmers and gardeners can use lights or covers to control when some plants flower. Autumn leaf fall is also triggered by shorter days."
  ], [
    "Response of plants to day and night length is...|photoperiodism|🌙||phototropism,photosynthesis",
    "What do plants really measure?|the length of the dark period|🌙||the temperature of the soil,the wind speed",
    "A plant that flowers when nights are long is a...|short-day plant|🌼||long-day plant,seed plant",
    "A plant that flowers when nights are short is a...|long-day plant|🌻||short-day plant,moss",
    "The pigment that helps plants sense light is...|phytochrome|🎨||melanin,hemoglobin",
    "Photoperiod tells a plant what _____ it is.|season|📅||age,height",
    "Leaves dropping in autumn is triggered partly by...|shorter days|🍂||longer days,louder wind",
    "Gardeners can change flowering time by changing...|light exposure|💡||soil color,pot names"
  ], "It is the length of the night that counts."));
  c.push(L("Body plans", [
    "Symmetry|⭐|<b>Radial symmetry</b> means the body can be divided into matching halves around a center, like a jellyfish or sea star. <b>Bilateral symmetry</b> means a left side and right side that are mirror images, like a fish or a person. Sponges are mostly <b>asymmetrical</b>.",
    "Head first|🐜|Animals with bilateral symmetry usually have a head end with sense organs and a brain. This is called <b>cephalization</b> and helps them move in one direction and find food.",
    "Segments|🪱|<b>Segmentation</b> means a body made of repeated sections, like an earthworm or an insect. Segments can specialize for different jobs."
  ], [
    "A jellyfish has which symmetry?|radial|🪼||bilateral,none at all",
    "A human has which symmetry?|bilateral|🧍||radial,asymmetrical",
    "Sponges are mostly...|asymmetrical|🧽||bilateral,radial",
    "Having a head end with sense organs is called...|cephalization|🧠||segmentation,metamorphosis",
    "A body made of repeated sections is...|segmented|🪱||radial,hollow",
    "Which animal is segmented?|earthworm|🪱||jellyfish,sponge",
    "A butterfly has _____ symmetry.|bilateral|🦋||radial,no",
    "A sea star has _____ symmetry as an adult.|radial|⭐||bilateral,asymmetrical"
  ], "Look for a center or a left and right side."));
  c.push(L("Life in extreme places", [
    "Extremophiles|🌋|<b>Extremophiles</b> are organisms that live where most life cannot: boiling hot springs (<b>thermophiles</b>), very salty lakes (<b>halophiles</b>) and very cold places (<b>psychrophiles</b>).",
    "Deep-sea vents|🌊|At hydrothermal vents there is no sunlight. Bacteria use chemicals such as hydrogen sulfide to make food, called <b>chemosynthesis</b>. Tube worms live with these bacteria.",
    "Tough animals|🐻|Tardigrades, or water bears, are tiny animals that can survive drying out, freezing and strong radiation by going into a dormant state. Studying them helps scientists look for life in other places."
  ], [
    "Organisms that live in boiling hot springs are...|thermophiles|♨️||halophiles,psychrophiles",
    "Organisms that live in very salty places are...|halophiles|🧂||thermophiles,psychrophiles",
    "Organisms that live in very cold places are...|psychrophiles|🧊||thermophiles,halophiles",
    "Making food from chemicals instead of light is...|chemosynthesis|🧪||photosynthesis,digestion",
    "Which chemical do vent bacteria use to make food?|hydrogen sulfide|🌋||table sugar,oxygen only",
    "Tube worms at vents live with...|chemosynthetic bacteria|🪱||green algae in sunlight,fungi on land",
    "Tardigrades survive hard times by becoming...|dormant|🐻||bigger,louder",
    "At hydrothermal vents there is no...|sunlight|🌑||water,minerals"
  ], "Where light is missing, some life uses chemicals instead."));
  c.push(L("Nutrient runoff and dead zones", [
    "Too many nutrients|🌾|<b>Eutrophication</b> happens when too many nutrients such as nitrogen and phosphorus, often from fertilizer runoff or sewage, enter lakes and coasts.",
    "Algal bloom|🟢|The extra nutrients make algae multiply into an <b>algal bloom</b>. The bloom blocks light for plants below. When the algae die, bacteria decompose them and use up the oxygen.",
    "Dead zones|🌊|Low oxygen water is a <b>dead zone</b>. Fish and other animals cannot get enough oxygen there. Using less fertilizer, planting buffer strips and treating sewage can prevent it."
  ], [
    "Too many nutrients entering water is called...|eutrophication|🌾||evaporation,erosion",
    "Which two nutrients commonly cause algal blooms?|nitrogen and phosphorus|🌾||iron and gold,helium and neon",
    "Where do many of these nutrients come from?|fertilizer runoff|🚜||volcano ash only,moonlight",
    "A rapid growth of algae in water is an...|algal bloom|🟢||ocean current,iceberg",
    "After algae die, decomposers use up the water's...|oxygen|💨||salt,sugar",
    "Water with too little oxygen for animals is a...|dead zone|🌊||delta,reef",
    "Which action helps prevent dead zones?|using less fertilizer|🌱||adding more sewage,clearing buffer strips",
    "An algal bloom blocks _____ from reaching plants below.|light|🌞||heat only,fish"
  ], "More nutrients, more algae, then less oxygen."));
  c.push(L("Origin of mitochondria", [
    "Early life|🌍|Earth is about 4.6 billion years old. The oldest evidence of life is about 3.5 billion years old and came from simple <b>prokaryotes</b>. Cyanobacteria later filled the air with oxygen by photosynthesis.",
    "Endosymbiosis|🔬|The <b>endosymbiotic theory</b> says that mitochondria and chloroplasts were once free-living bacteria. They were engulfed by a larger cell and stayed inside as partners. Lynn Margulis helped make this idea famous.",
    "Evidence|🧬|Mitochondria and chloroplasts have their own circular DNA, bacteria-like ribosomes, double membranes, and they divide on their own like bacteria."
  ], [
    "Earth is about how old?|4.6 billion years|🌍||46 million years,4.6 thousand years",
    "The first living things were simple...|prokaryotes|🦠||mammals,animals",
    "Which early bacteria added oxygen to the air?|cyanobacteria|🫧||viruses,fungi",
    "Endosymbiotic theory says mitochondria were once...|free-living bacteria|🔬||viruses in the air,parts of the nucleus",
    "Which organelles are included in endosymbiotic theory?|mitochondria and chloroplasts|🔋||nucleus and vacuole,ribosome and wall only",
    "Mitochondria have their own...|circular DNA|🧬||cell wall,petals",
    "Which scientist helped make the theory famous?|Lynn Margulis|👩‍🔬||Charles Darwin,Gregor Mendel",
    "Mitochondria and chloroplasts have _____ membranes.|two|🫧||no,seven"
  ], "Think about which organelles have their own DNA and look like bacteria."));
  c.push(MIX("Mixed practice", [c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15], c[16], c[17]]));
  c.push(MIX("Level 18 Challenge", [c[0], c[1], c[3], c[4], c[5], c[6], c[9], c[10], c[12], c[14], c[16], c[17], b[5], b[7], b[11], a[2]]));

  Object.assign(LIFE_LEVELS, { 16: a, 17: b, 18: c });
})();
