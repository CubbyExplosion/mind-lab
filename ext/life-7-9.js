// ext/life-7-9.js  Life Science levels 7-9
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

  // ================= LEVEL 7 =================
  const a = [];
  a.push(L("Using a key", [
    "Sorting with a key|🔑|A <b>key</b> is a set of questions with two answers, <b>yes or no</b>. Each answer sends you to the next question until you find the name.",
    "Try one|🐜🕷️|Does it have 6 legs? Yes: it is an insect. No, it has 8 legs: it is a spider.",
    "Why classify?|📋|Scientists <b>classify</b> living things so they can sort, name and study them."
  ], [
    "A sorting key asks questions with two answers. What are they?|yes or no|🔑||red or blue,big or small",
    "Does it have 6 legs? Yes. It is probably an...|insect|🐜||spider,fish",
    "Does it have 8 legs? Yes. It is probably a...|spider|🕷️||beetle,bee",
    "Does it have fins and gills? Yes. It is a...|fish|🐟||mammal,bird",
    "Does it have feathers and a beak? Yes. It is a...|bird|🐦||reptile,fish",
    "Does it make its own food from sunlight? Yes. It is a...|plant|🌿||animal,rock",
    "Why do scientists classify living things?|to sort and name them|📋||to make them grow,to hide them",
    "Which question could help sort leaves?|Is the edge smooth?|🍃||Is it Tuesday?,Is it loud?"
  ], "A key follows yes or no answers, one step at a time."));
  a.push(L("Kinds of mammals", [
    "Three kinds|🦘🦆🐕|Most mammals grow inside their mother before birth. <b>Marsupials</b> carry their tiny babies in a pouch. <b>Monotremes</b> lay eggs.",
    "Pouch animals|🦘🐨|Kangaroos and koalas are marsupials. A baby kangaroo is called a joey.",
    "Egg-laying mammals|🥚|The platypus and the echidna are mammals that lay eggs. They still feed their babies milk."
  ], [
    "Which animal carries its baby in a pouch?|kangaroo|🦘||horse,dolphin",
    "A baby kangaroo is called a...|joey|🦘||cub,calf",
    "Which mammal lays eggs?|platypus|🥚||koala,rabbit",
    "Which of these is a marsupial?|koala|🐨||platypus,wolf",
    "Mammals that lay eggs are called...|monotremes|🥚||marsupials,reptiles",
    "The only mammal that can truly fly is the...|bat|🦇||flying squirrel,sugar glider",
    "A whale is a mammal because it breathes air and...|feeds milk to its young|🐋||lays eggs on land,has scales",
    "Which is NOT a marsupial?|a cat|🐈||a kangaroo,a koala"
  ], "Think about how the babies are carried or born."));
  a.push(L("Plant groups", [
    "Flowering plants|🌸|Most plants make <b>flowers</b>. After pollination, flowers make seeds inside fruits.",
    "Cones and spores|🌲🌿|<b>Conifers</b> like pine trees have cones and needles. <b>Ferns</b> make tiny <b>spores</b> instead of seeds. <b>Mosses</b> are small and grow in damp places.",
    "Sorting plants|🍄|Spores are tiny dust-like cells that can grow into new plants."
  ], [
    "Which plant makes cones?|pine tree|🌲||rose,fern",
    "Ferns make new plants from...|spores|🌿||fruits,flowers",
    "Which plants make seeds inside fruits?|flowering plants|🌸||mosses,ferns",
    "Which plant is small and grows in damp places?|moss|🌱||oak tree,sunflower",
    "Pine needles are the leaves of a...|conifer|🌲||fern,moss",
    "A rose bush belongs to which group?|flowering plants|🌹||conifers,mosses",
    "Which plant has no flowers and no seeds?|fern|🌿||apple tree,tulip",
    "An apple tree makes seeds inside...|fruit|🍎||cones,spores"
  ], "Ask: does it have flowers, cones or spores?"));
  a.push(L("Animals without backbones", [
    "Invertebrates|🐛🐌🦀|An <b>invertebrate</b> is an animal with no backbone. Most animals on Earth are invertebrates!",
    "Many kinds|🪱🪼🐙|Insects, spiders, crabs, snails, worms and jellyfish are all invertebrates.",
    "Vertebrates|🦴🐟|A <b>vertebrate</b> has a backbone. Fish, amphibians, reptiles, birds and mammals are vertebrates."
  ], [
    "An animal with no backbone is an...|invertebrate|🐛||vertebrate,amphibian",
    "An animal with a backbone is a...|vertebrate|🦴||invertebrate,mineral",
    "Which animal is an invertebrate?|a snail|🐌||a frog,a sparrow",
    "Which animal is a vertebrate?|a trout|🐟||a crab,a jellyfish",
    "Which animal is an invertebrate?|a jellyfish|🪼||a lizard,a turtle",
    "Most animals on Earth are...|invertebrates|🐜||vertebrates,mammals",
    "Which animal is NOT an invertebrate?|a horse|🐴||a bee,an octopus",
    "A spider is a...|invertebrate|🕷️||vertebrate,mammal"
  ], "Does the animal have a backbone inside its body?"));
  a.push(L("Arthropods and mollusks", [
    "Arthropods|🦀🐜🕷️|<b>Arthropods</b> have jointed legs and a hard outer skeleton called an <b>exoskeleton</b>. Insects, spiders and crabs are arthropods.",
    "Mollusks|🐌🐙🦪|<b>Mollusks</b> have a soft body, often with a hard shell. Snails, clams and octopuses are mollusks.",
    "Tell them apart|🔎|Jointed legs and an exoskeleton means arthropod. A soft body means mollusk."
  ], [
    "A hard outer skeleton is called an...|exoskeleton|🦀||endoskeleton,eyelid",
    "Which animal is an arthropod?|a crab|🦀||a clam,an octopus",
    "Which animal is a mollusk?|a snail|🐌||an ant,a spider",
    "Which animal is a mollusk?|an octopus|🐙||a beetle,a lobster",
    "Arthropods have legs that are...|jointed|🐜||missing,made of fur",
    "A clam has a soft body inside a...|shell|🦪||pouch,web",
    "Which animal is an arthropod?|a butterfly|🦋||a squid,a slug",
    "Which animal is NOT an arthropod?|a snail|🐌||a bee,a spider"
  ], "Think: jointed legs and exoskeleton, or soft body?"));
  a.push(L("Worms, jellyfish and starfish", [
    "Worms|🪱|An earthworm's body is made of many rings called <b>segments</b>. Worms loosen the soil and help plants grow.",
    "Jellyfish|🪼|A jellyfish has no brain and no bones. Its tentacles can sting. It is a <b>cnidarian</b>.",
    "Spiny skin|⭐🧽|A sea star (starfish) is an <b>echinoderm</b> with spiny skin and tube feet. A sponge is a simple animal that stays in one place and filters water."
  ], [
    "An earthworm's body is made of rings called...|segments|🪱||petals,scales",
    "Earthworms help gardens by...|loosening the soil|🪱||eating flowers,blocking rain",
    "A jellyfish has no...|brain|🪼||water,tentacles",
    "A jellyfish uses its tentacles to...|sting prey|🪼||dig tunnels,make honey",
    "A sea star is a kind of...|echinoderm|⭐||insect,mammal",
    "A sea star moves with tiny...|tube feet|⭐||wings,fins",
    "A sponge is an animal that...|stays in one place|🧽||runs fast,flies south",
    "Which animal has a body made of segments?|earthworm|🪱||jellyfish,sponge"
  ], "Picture each animal's body."));
  a.push(L("Land biomes", [
    "Biomes|🌍|A <b>biome</b> is a very large area with its own climate, plants and animals.",
    "Cold and wet|🌲❄️🌴|The <b>tundra</b> is very cold and has no tall trees. The <b>taiga</b> is a cold forest of conifers. The <b>rainforest</b> is warm and rains almost every day.",
    "Dry and grassy|🏜️🌾🍂|A <b>desert</b> gets very little rain. A <b>grassland</b> has grasses and few trees. A <b>temperate forest</b> has trees that lose their leaves in fall."
  ], [
    "Which biome is very cold with no tall trees?|tundra|❄️||rainforest,desert",
    "Which biome has the most rain and warm weather all year?|rainforest|🌴||desert,tundra",
    "Which biome gets very little rain?|desert|🏜️||taiga,rainforest",
    "A cactus is most likely to live in a...|desert|🌵||tundra,rainforest",
    "A zebra is most likely to live in a...|grassland|🦓||tundra,desert",
    "A moose lives in the cold forest called the...|taiga|🫎||desert,grassland",
    "A toucan lives in a...|rainforest|🦜||tundra,desert",
    "Trees that lose their leaves in fall grow in a...|temperate forest|🍂||desert,tundra"
  ], "Think about the rain and the temperature of each biome."));
  a.push(L("Ocean life zones", [
    "Layers of the sea|🌊|The ocean has layers. The top is the <b>sunlight zone</b>, where most sea life lives.",
    "Getting darker|🌑|Below it is the <b>twilight zone</b> with very little light. The deepest water is the <b>midnight zone</b>, which is completely dark.",
    "Tiny and big|🦠🪸|<b>Plankton</b> are tiny living things that float. They are food for many animals. <b>Coral reefs</b> grow in warm, shallow water."
  ], [
    "Which ocean zone gets the most sunlight?|sunlight zone|☀️||midnight zone,twilight zone",
    "Which ocean zone is completely dark?|midnight zone|🌑||sunlight zone,twilight zone",
    "Tiny living things that float in the ocean are...|plankton|🦠||whales,rocks",
    "Coral reefs grow in water that is warm and...|shallow|🪸||frozen,very deep",
    "Most sea life lives in the...|sunlight zone|🐠||midnight zone,mud",
    "Why can plants and algae not grow in the midnight zone?|there is no sunlight|🌑||it is too hot,there is no water",
    "Oceans cover about how much of Earth?|70 percent|🌍||10 percent,30 percent",
    "Plankton are an important...|food source|🦐||kind of rock,sea storm"
  ], "Think about how far sunlight can travel through water."));
  a.push(L("Populations and communities", [
    "One kind|🐺🐺|A <b>population</b> is all the animals or plants of one kind living in the same place, like all the frogs in a pond.",
    "Many kinds|🐸🦆🌿|A <b>community</b> is all the different populations living together in a place.",
    "The whole picture|🏞️|An <b>ecosystem</b> is the community plus the non-living things, like water, soil and sunlight."
  ], [
    "All the frogs living in one pond are a...|population|🐸||community,ecosystem",
    "All the living things in one pond make a...|community|🏞️||population,habitat",
    "A community plus water, soil and sunlight is an...|ecosystem|🌿||population,species",
    "The place where an animal lives is its...|habitat|🏠||niche,species",
    "An animal's job in an ecosystem is its...|niche|🔧||habitat,population",
    "Which is a non-living part of an ecosystem?|sunlight|☀️||grass,beetle",
    "All the oak trees in a forest are a...|population|🌳||community,ecosystem",
    "Many populations living together form a...|community|🦌||population,cell"
  ], "One kind is a population. Many kinds together are a community."));
  a.push(L("Living together", [
    "Symbiosis|🤝|<b>Symbiosis</b> means two different living things live closely together.",
    "Helping|🐠🪸🐝🌼|In <b>mutualism</b> both partners are helped. A clownfish is protected by the anemone, and it keeps the anemone clean. Bees get nectar and flowers get pollinated.",
    "Taking|🐕|In <b>parasitism</b> one living thing, the parasite, gets food from another and harms it, like a flea on a dog. In <b>commensalism</b> one is helped and the other is not harmed, like barnacles on a whale."
  ], [
    "When both partners are helped, it is called...|mutualism|🤝||parasitism,competition",
    "A flea living on a dog is an example of...|parasitism|🐕||mutualism,commensalism",
    "Bees and flowers help each other. This is...|mutualism|🐝||parasitism,predation",
    "Barnacles ride on a whale and the whale is not harmed. This is...|commensalism|🐋||mutualism,parasitism",
    "A parasite gets food from its host and...|harms it|🪱||helps it a lot,cleans it",
    "Clownfish and sea anemones help each other. This is...|mutualism|🐠||parasitism,commensalism",
    "Symbiosis means two living things live...|closely together|🤝||far apart,only at night",
    "A tick feeding on a deer is an example of...|parasitism|🦌||mutualism,commensalism"
  ], "Ask who is helped and who is harmed."));
  a.push(L("Water, oxygen and nutrients", [
    "Water travels|💧|Water <b>evaporates</b> into the air, <b>condenses</b> into clouds, and falls as <b>precipitation</b>. Then the cycle starts again.",
    "Air for life|🌳🧑|Plants take in carbon dioxide and give out <b>oxygen</b>. Animals breathe in oxygen and give out carbon dioxide.",
    "Nutrients|🍂🍄|When living things die, <b>decomposers</b> break them down. The nutrients go back to the soil for new plants."
  ], [
    "Water turning into vapor is called...|evaporation|☀️||condensation,precipitation",
    "Vapor turning into tiny drops in clouds is...|condensation|☁️||evaporation,erosion",
    "Rain and snow are kinds of...|precipitation|🌧️||evaporation,photosynthesis",
    "Plants give out which gas that we need?|oxygen|🌳||helium,smoke",
    "Animals breathe out which gas?|carbon dioxide|🌬️||oxygen,hydrogen",
    "What powers the water cycle?|the Sun|☀️||the Moon,the wind only",
    "Who returns nutrients from dead things to the soil?|decomposers|🍄||predators,bees",
    "Plants take in which gas from the air?|carbon dioxide|🌿||oxygen,nitrogen only"
  ], "Follow the path of the water or gas."));
  a.push(L("Roots and stems carry water", [
    "Up the stem|🌱|Roots soak up water through tiny <b>root hairs</b>. Special tubes called <b>xylem</b> carry the water up the stem to the leaves.",
    "Food moves too|🍃|Leaves make sugar. Tubes called <b>phloem</b> carry the sugar to the rest of the plant.",
    "Leaving the leaf|💨|Leaves have tiny holes called <b>stomata</b>. Water vapor escapes through them. This is called <b>transpiration</b>."
  ], [
    "Which tubes carry water up a plant?|xylem|🌱||phloem,veins of blood",
    "Which tubes carry sugar around a plant?|phloem|🍃||xylem,roots",
    "Tiny holes in leaves are called...|stomata|🍃||root hairs,petals",
    "Water escaping from leaves is called...|transpiration|💨||germination,pollination",
    "What do root hairs do?|soak up water|🌱||make flowers,catch bees",
    "A white flower in colored water turns colored because the water goes up the...|stem|🌸||sky,petal edge",
    "Where does a plant make its sugar?|in the leaves|🍃||in the roots,in the soil",
    "Roots hold the plant in place and also...|take in water|🌿||make seeds,smell flowers"
  ], "Water goes up, sugar goes around."));
  a.push(L("Germination", [
    "A seed wakes up|🌰|<b>Germination</b> is when a seed starts to grow into a plant.",
    "What it needs|💧🌡️💨|A seed needs <b>water</b>, <b>warmth</b> and <b>air</b> to germinate. Most seeds do not need light until the shoot comes out.",
    "First parts|🌱|The first root is the <b>radicle</b>. The seed leaves, or <b>cotyledons</b>, hold stored food. The <b>seed coat</b> protects the seed."
  ], [
    "When a seed starts to grow it is called...|germination|🌰||pollination,evaporation",
    "Which of these does a seed need to germinate?|water|💧||a bright light bulb,a lot of salt",
    "The first root of a seedling is the...|radicle|🌱||petal,stamen",
    "The outside of a seed that protects it is the...|seed coat|🌰||leaf,stem",
    "Seed leaves that hold stored food are the...|cotyledons|🌱||thorns,roots",
    "A seed in a dry, cold freezer will probably...|not germinate|🧊||germinate fast,turn into a flower",
    "Seeds need warmth, air and...|water|🌡️||sugar,salt",
    "A seed that is waiting for the right conditions is...|dormant|😴||blooming,rotting"
  ], "Think about what a seed needs from its surroundings."));
  a.push(L("Fungi", [
    "Not plants|🍄|<b>Fungi</b> include mushrooms, molds and yeast. They are not plants or animals.",
    "How they live|🍞|Fungi cannot make their own food. Many are <b>decomposers</b> that feed on dead things. They grow from <b>spores</b>.",
    "Helpers|🥖🧫|Yeast makes bread rise. The medicine penicillin came from a mold. Never eat a wild mushroom, because some are poisonous."
  ], [
    "Which of these is a fungus?|mushroom|🍄||fern,moss",
    "Fungi cannot make their own...|food|🍞||spores,noise",
    "Fungi spread by tiny...|spores|🍄||seeds in fruit,eggs",
    "Which fungus makes bread rise?|yeast|🥖||mold,lichen",
    "Many fungi are decomposers, so they feed on...|dead things|🍂||sunlight,rocks",
    "Fuzzy mold on old bread is a kind of...|fungus|🍞||plant,insect",
    "What should you do with a wild mushroom you find?|never eat it|⚠️||eat it right away,feed it to a pet",
    "Fungi are not plants because they have no...|chlorophyll|🍄||spores,body"
  ], "Fungi are their own group, not plants or animals."));
  a.push(L("Microbes", [
    "Tiny life|🔬|<b>Microbes</b> are living things too small to see without a microscope. <b>Bacteria</b> are single-celled microbes.",
    "Good and bad|🥛🤒|Some bacteria are helpful: they help make yogurt and help digest food in your gut. A few can make you sick.",
    "Viruses|🧼|<b>Viruses</b> are even smaller. They can only multiply inside living cells. Washing your hands with soap helps stop germs from spreading."
  ], [
    "Living things too small to see without a microscope are...|microbes|🔬||fungi,insects",
    "Bacteria are made of how many cells?|one|🦠||millions,none",
    "Which food is made with the help of bacteria?|yogurt|🥛||an apple,rice",
    "What helps stop germs from spreading?|washing hands|🧼||sharing cups,skipping sleep",
    "A virus can only multiply inside...|living cells|🦠||water alone,rocks",
    "You need a microscope to see...|bacteria|🔬||a dog,a tree",
    "Bacteria in your gut can help you...|digest food|🥗||see in the dark,grow wings",
    "Which is smaller?|a virus|🦠||an ant,a mushroom"
  ], "Microbes are very tiny. Some help us, a few harm us."));
  a.push(L("Skeleton", [
    "206 bones|💀|An adult has <b>206</b> bones. The skeleton holds you up, protects soft parts and lets you move.",
    "Protectors|🧠🫁|Your <b>skull</b> protects your brain. Your <b>ribs</b> protect your heart and lungs. Your <b>spine</b>, made of <b>vertebrae</b>, protects your spinal cord.",
    "Joints|🦵|A <b>joint</b> is where two bones meet. The <b>femur</b> in your thigh is the longest bone. Calcium from foods like milk makes bones strong."
  ], [
    "How many bones does an adult have?|206|💀||106,306",
    "Which bones protect your brain?|skull|🧠||ribs,femur",
    "Which bones protect your heart and lungs?|ribs|🫁||skull,spine",
    "The bones of your backbone are called...|vertebrae|🦴||ribs,joints",
    "Where two bones meet is a...|joint|🦵||tendon,muscle",
    "The longest bone in the body is the...|femur|🦴||skull,rib",
    "Which mineral helps make bones strong?|calcium|🥛||sugar,salt",
    "A skeleton holds you up, protects you and helps you...|move|🏃||sleep,hear",
  ], "Think about which bone guards which body part."));
  a.push(L("Muscles", [
    "Muscles pull|💪|Muscles can only <b>pull</b>, not push. They work in pairs: when your biceps pulls your arm up, your triceps relaxes.",
    "Voluntary and involuntary|🦵❤️|<b>Voluntary</b> muscles are the ones you choose to move, like in your legs. <b>Involuntary</b> muscles work on their own, like your heart and stomach.",
    "Strings|🦴|<b>Tendons</b> join muscles to bones. You have over 600 muscles, and exercise makes them stronger."
  ], [
    "Muscles can only...|pull|💪||push,float",
    "Muscles that you choose to move are...|voluntary|🦵||involuntary,invisible",
    "Muscles that work on their own are...|involuntary|❤️||voluntary,weak",
    "Which of these is an involuntary muscle?|the heart|❤️||the arm,the leg",
    "Tendons join muscles to...|bones|🦴||skin,nerves",
    "Muscles work in...|pairs|💪||circles,colors",
    "Exercise makes your muscles...|stronger|🏋️||smaller,sleepy",
    "Which muscle do you control on purpose?|a leg muscle|🦵||the heart,the stomach"
  ], "Think: do you control it on purpose?"));
  a.push(L("Breathing and blood", [
    "Breathing in|🫁|Air goes through your nose, down the <b>windpipe</b> into your lungs. The <b>diaphragm</b> is a muscle under the lungs that helps you breathe.",
    "Swap|🔄|Tiny air sacs called <b>alveoli</b> pass oxygen into your blood and take carbon dioxide out. You breathe the carbon dioxide out.",
    "Blood|❤️🩸|<b>Red blood cells</b> carry oxygen. The heart pumps. <b>Arteries</b> carry blood away from the heart. <b>Veins</b> carry it back."
  ], [
    "The muscle that helps you breathe is the...|diaphragm|🫁||femur,tongue",
    "Tiny air sacs in the lungs are called...|alveoli|🫁||vertebrae,stomata",
    "Red blood cells carry...|oxygen|🩸||sugar only,sound",
    "Blood vessels that carry blood away from the heart are...|arteries|❤️||veins,roots",
    "Blood vessels that carry blood back to the heart are...|veins|🩸||arteries,tendons",
    "The windpipe carries air to the...|lungs|🫁||stomach,brain",
    "You breathe out the gas called...|carbon dioxide|💨||oxygen,helium",
    "What pumps blood around your body?|the heart|❤️||the lungs,the liver"
  ], "Follow the path of air or blood."));
  a.push(MIX("Mixed practice", [a[0], a[1], a[2], a[3], a[5], a[6], a[8], a[9], a[13], a[15]]));
  a.push(MIX("Level 7 Challenge", [a[4], a[7], a[10], a[11], a[12], a[14], a[16], a[17], a[9], a[6]]));

  // ================= LEVEL 8 =================
  const b = [];
  b.push(L("Parts of a cell", [
    "Tiny parts|🔬|Every cell has parts with jobs. The <b>nucleus</b> is the control center and holds the DNA. The <b>cell membrane</b> is the thin skin that controls what goes in and out.",
    "Energy and fill|⚡|<b>Mitochondria</b> release energy from food. The <b>cytoplasm</b> is the jelly-like fill where the parts float.",
    "Small workers|🧱|<b>Ribosomes</b> build proteins. Each part is called an <b>organelle</b>, like a tiny organ."
  ], [
    "Which part is the cell's control center?|nucleus|🧬||membrane,cytoplasm",
    "Which part controls what goes in and out of a cell?|cell membrane|🔬||nucleus,mitochondria",
    "Which parts release energy from food?|mitochondria|⚡||ribosomes,vacuoles",
    "The jelly-like fill inside a cell is the...|cytoplasm|🫧||nucleus,cell wall",
    "Ribosomes build...|proteins|🧱||bones,leaves",
    "The DNA of a cell is found in the...|nucleus|🧬||membrane,cytoplasm",
    "The parts inside a cell are called...|organelles|🔬||organs,tissues",
    "Which part is called the powerhouse of the cell?|mitochondria|⚡||nucleus,ribosome"
  ], "Match each part to its job."));
  b.push(L("Plant and animal cells", [
    "Both have|🔬|Plant and animal cells both have a nucleus, a cell membrane, cytoplasm and mitochondria.",
    "Only plants|🌿|Plant cells also have a stiff <b>cell wall</b>, green <b>chloroplasts</b> that make food, and a large <b>vacuole</b> that stores water.",
    "Shapes|🟩🔵|Plant cells are often box-shaped because of the wall. Animal cells are rounder and can change shape."
  ], [
    "Which part makes food in plant cells?|chloroplast|🌿||nucleus,membrane",
    "Which part gives plant cells a stiff outside?|cell wall|🟩||cytoplasm,ribosome",
    "Which cells have chloroplasts?|plant cells|🌱||animal cells,both the same",
    "Which part stores water in a plant cell?|vacuole|💧||nucleus,mitochondria",
    "Which cells have no cell wall?|animal cells|🐾||plant cells,tree cells",
    "Chloroplasts are green because of...|chlorophyll|🌿||paint,vitamin A",
    "Which part do BOTH plant and animal cells have?|nucleus|🧬||cell wall,chloroplast",
    "Plant cells often look like...|boxes|🟩||balls of jelly,long threads"
  ], "Plants have extra parts that animals do not."));
  b.push(L("Cells, tissues, organs", [
    "Building up|🧱|Your body is built in levels: <b>cells</b> make <b>tissues</b>, tissues make <b>organs</b>, organs make <b>organ systems</b>, and systems make the whole <b>organism</b>.",
    "Examples|💪❤️|Muscle cells make muscle tissue. Muscle tissue is part of the heart, an organ. The heart is part of the circulatory system.",
    "Teamwork|🤝|Each level works together. A group of similar cells doing the same job is a tissue."
  ], [
    "A group of similar cells doing the same job is a...|tissue|🧱||organ,organism",
    "Different tissues working together make an...|organ|❤️||cell,tissue",
    "Organs working together make an organ...|system|🫁||cell,part",
    "The smallest unit of life is the...|cell|🔬||organ,system",
    "The stomach is an example of an...|organ|🍽️||cell,tissue",
    "The heart, blood and blood vessels make the...|circulatory system|❤️||digestive system,skeletal system",
    "Which is the correct order from smallest to biggest?|cell > tissue > organ|🪜||organ > tissue > cell,tissue > cell > organ",
    "A whole living thing, like a dog, is called an...|organism|🐕||organ,organelle"
  ], "Start with the smallest part and build up."));
  b.push(L("One cell or many", [
    "One cell|🦠|A <b>unicellular</b> organism is made of just one cell. Bacteria, yeast and amoebas are unicellular.",
    "Many cells|🌳🧑|A <b>multicellular</b> organism has many cells. Trees, dogs and people are multicellular.",
    "Special cells|🧬|In a multicellular body, cells are <b>specialized</b>. Nerve cells send messages and red blood cells carry oxygen."
  ], [
    "An organism made of one cell is...|unicellular|🦠||multicellular,tissue",
    "An organism made of many cells is...|multicellular|🌳||unicellular,microscopic",
    "Which one is unicellular?|an amoeba|🦠||an oak tree,a horse",
    "Which one is multicellular?|a person|🧑||a bacterium,an amoeba",
    "Cells that do one special job are...|specialized|🧬||identical,empty",
    "Which cells send messages in your body?|nerve cells|⚡||red blood cells,fat cells",
    "Yeast is made of how many cells?|one|🍞||thousands,none",
    "Red blood cells have the job of carrying...|oxygen|🩸||messages,light"
  ], "Count the cells in the organism."));
  b.push(L("Digestive system", [
    "Breaking food down|🍎|Digestion starts in the <b>mouth</b>. Teeth chew and saliva begins to break food down.",
    "The path|🍽️|Food goes down the <b>esophagus</b> to the <b>stomach</b>, which mixes it with acid. In the <b>small intestine</b>, nutrients pass into the blood.",
    "The end|♻️|The <b>large intestine</b> takes out water. The rest leaves the body as waste."
  ], [
    "Where does digestion start?|the mouth|👄||the stomach,the liver",
    "The tube from the mouth to the stomach is the...|esophagus|🍽️||trachea,intestine",
    "Which organ mixes food with acid?|stomach|🍽️||lungs,brain",
    "Where do nutrients pass into the blood?|small intestine|🩸||large intestine,esophagus",
    "Which organ takes water out of the leftovers?|large intestine|💧||stomach,heart",
    "After the mouth, food goes down the...|esophagus|🍎||large intestine,small intestine",
    "Saliva in your mouth helps to...|break down food|👄||freeze food,cook food",
    "The liver helps digestion by making a juice called...|bile|🟢||saliva,sap"
  ], "Follow the food from mouth to the end."));
  b.push(L("Getting rid of waste", [
    "Kidneys|🫘|You have two <b>kidneys</b> shaped like beans. They filter your blood and remove extra water and waste as <b>urine</b>.",
    "Storing|💧|Urine is stored in the <b>bladder</b> until you go to the bathroom.",
    "Other ways|💦🌬️|Your skin lets out waste water as <b>sweat</b>. Your lungs breathe out carbon dioxide."
  ], [
    "Which organs filter your blood?|kidneys|🫘||lungs,stomach",
    "How many kidneys do most people have?|2|🫘||1,4",
    "Where is urine stored?|bladder|💧||heart,esophagus",
    "Your skin gets rid of extra water as...|sweat|💦||bile,mucus",
    "Your lungs get rid of the waste gas...|carbon dioxide|🌬️||oxygen,helium",
    "Kidneys remove waste and extra...|water|🫘||bones,air",
    "A kidney is shaped like a...|bean|🫘||star,cube",
    "Drinking enough water helps your...|kidneys|🥤||toenails,hair color"
  ], "Which organ cleans the blood?"));
  b.push(L("Nervous system", [
    "Messages|⚡|The nervous system sends messages. A <b>neuron</b> is a nerve cell. The brain and <b>spinal cord</b> make up the control center.",
    "Brain parts|🧠|The <b>cerebrum</b> is for thinking and memory. The <b>cerebellum</b> helps balance. The <b>brain stem</b> keeps your heart beating and your breathing going.",
    "Fast|💨|A <b>reflex</b> is a very fast action that goes through the spinal cord, so your body reacts before you think."
  ], [
    "A nerve cell is called a...|neuron|⚡||nucleus,tendon",
    "Which brain part is for thinking and memory?|cerebrum|🧠||cerebellum,brain stem",
    "Which brain part helps with balance?|cerebellum|🧠||cerebrum,brain stem",
    "Which brain part keeps your breathing going?|brain stem|🧠||cerebrum,cerebellum",
    "The spinal cord is protected by the...|backbone|🦴||ribs,skull",
    "A very fast action without thinking is a...|reflex|⚡||memory,dream",
    "The brain and spinal cord are the control center of the...|nervous system|🧠||digestive system,skeletal system",
    "Messages travel along...|nerves|⚡||veins,tendons"
  ], "Match each brain part with its job."));
  b.push(L("Eye and ear", [
    "Seeing|👁️|Light enters through the <b>pupil</b>. The colored <b>iris</b> changes the pupil's size. The <b>lens</b> focuses the light on the <b>retina</b>, and the <b>optic nerve</b> sends the message to the brain.",
    "Hearing|👂|Sound makes the <b>eardrum</b> vibrate. Three tiny bones pass the vibration on to the <b>cochlea</b>, and a nerve carries the message to the brain.",
    "Balance|🌀|The inner ear also helps you keep your balance."
  ], [
    "The opening that lets light into the eye is the...|pupil|👁️||retina,iris",
    "The colored part of the eye is the...|iris|👁️||lens,cornea",
    "Light is focused onto the...|retina|👁️||eardrum,pupil",
    "Which nerve sends sight messages to the brain?|optic nerve|🧠||cochlea,eardrum",
    "Sound makes which part vibrate?|eardrum|👂||retina,iris",
    "The snail-shaped part of the inner ear is the...|cochlea|👂||lens,cornea",
    "The inner ear helps you with...|balance|🌀||seeing color,smelling",
    "The part of the eye that focuses light is the...|lens|🔍||eardrum,optic nerve"
  ], "Follow the light or the sound inside."));
  b.push(L("Immune system", [
    "Defenders|🛡️|Your body fights germs. Skin is the first barrier. <b>Mucus</b> in your nose traps germs.",
    "White blood cells|⚪|If germs get in, <b>white blood cells</b> attack them. Your body makes <b>antibodies</b> that remember the germ.",
    "Vaccines|💉|A <b>vaccine</b> teaches your body how to beat a germ before you ever meet it. Rest and healthy food help you recover."
  ], [
    "Which cells fight germs?|white blood cells|⚪||red blood cells,skin cells",
    "Your first barrier against germs is your...|skin|🛡️||bones,hair",
    "Sticky mucus in the nose helps by...|trapping germs|👃||making noise,storing food",
    "A vaccine helps your body...|get ready to fight a germ|💉||grow taller,see better",
    "Proteins that remember and fight germs are...|antibodies|🛡️||vitamins,vertebrae",
    "Which helps you recover from being sick?|rest|😴||skipping meals,staying up late",
    "The system that defends your body is the...|immune system|🛡️||skeletal system,digestive system",
    "Washing your hands helps keep germs...|away|🧼||inside,happy"
  ], "What defends your body from germs?"));
  b.push(L("Nutrients", [
    "Energy and building|🍞🍗|<b>Carbohydrates</b> (bread, rice, pasta) give quick energy. <b>Proteins</b> (beans, eggs, fish) build and repair your body.",
    "Stored and small|🥑🍊|<b>Fats</b> store energy and keep you warm. <b>Vitamins</b> and <b>minerals</b> keep you healthy: vitamin C is in oranges, calcium is in milk.",
    "Do not forget|💧🥦|Your body also needs <b>water</b> and <b>fiber</b> from plants to help digestion."
  ], [
    "Which nutrient gives quick energy?|carbohydrates|🍞||vitamins,fiber",
    "Which nutrient builds and repairs the body?|protein|🍗||water,fat",
    "Which food is a good source of protein?|beans|🫘||white rice,lemonade",
    "Which mineral is in milk and builds bones?|calcium|🥛||vitamin C,iron",
    "Which vitamin is found in oranges?|vitamin C|🍊||protein,calcium",
    "Fiber from plants helps your...|digestion|🥦||eyesight,hair",
    "Which nutrient stores energy and keeps you warm?|fats|🥑||fiber,minerals",
    "Bread, rice and pasta are rich in...|carbohydrates|🍝||proteins,vitamin C"
  ], "Match each nutrient to its job."));
  b.push(L("DNA and genes", [
    "The instructions|🧬|<b>DNA</b> is the instruction book for a living thing. It looks like a twisted ladder and sits in the nucleus.",
    "Genes|📖|A <b>gene</b> is a short piece of DNA that holds the instructions for one trait, like eye color. DNA is packed into <b>chromosomes</b>.",
    "From parents|👨‍👩‍👧|Humans have 46 chromosomes. A child gets half from each parent."
  ], [
    "What carries the instructions for a living thing?|DNA|🧬||fat,oxygen",
    "A short piece of DNA for one trait is a...|gene|📖||bone,tissue",
    "DNA is found in the cell's...|nucleus|🔬||wall,vacuole",
    "DNA is packed into structures called...|chromosomes|🧬||ribosomes,vertebrae",
    "How many chromosomes do humans have?|46|👤||12,100",
    "A child gets DNA from...|both parents|👨‍👩‍👧||only one friend,neither parent",
    "DNA looks like a twisted...|ladder|🪜||circle,ball",
    "Eye color is decided by...|genes|👁️||clothes,food"
  ], "Think of DNA as a set of instructions."));
  b.push(L("Making copies", [
    "One parent|🍓|Some living things make offspring with just <b>one parent</b>. This is <b>asexual reproduction</b>. The offspring are exact copies.",
    "Examples|🪴|Bacteria split in two. A strawberry plant sends out runners. A new plant can grow from a cutting. A hydra grows a bud.",
    "Two parents|👨‍👩‍👧|When there are <b>two parents</b>, the young get a mix of both, so each one is a little different."
  ], [
    "Reproduction with only one parent is...|asexual|🍓||sexual,mineral",
    "Offspring from one parent are...|exact copies|📄||very different,always smaller",
    "Bacteria reproduce by...|splitting in two|🦠||laying eggs,making flowers",
    "A strawberry plant spreads using...|runners|🍓||cones,gills",
    "A new plant grown from a piece of stem is a...|cutting|🪴||seed coat,fruit",
    "A hydra makes new hydras by growing a...|bud|🪸||egg shell,feather",
    "With two parents, the young are...|a mix of both|👨‍👩‍👧||exact copies,always identical",
    "Which grows from a cutting?|a new plant|🪴||a new bird,a new rock"
  ], "How many parents are involved?"));
  b.push(L("Natural selection", [
    "Differences|🦋|In every group, living things are a little different. These differences are called <b>variation</b>.",
    "Survive and pass on|🐦|Animals with helpful traits survive better, have more young and pass the traits on. This is <b>natural selection</b>.",
    "Slow change|⏳|Over many generations, a whole population can change. Darwin explained this idea."
  ], [
    "Small differences between individuals are called...|variation|🦋||mutation,migration",
    "Helpful traits are more likely to be...|passed on|🧬||thrown away,hidden",
    "Who explained natural selection?|Darwin|📖||Newton,Edison",
    "Natural selection works over many...|generations|⏳||minutes,songs",
    "Dark moths survived better on sooty dark trees because they were harder for birds to...|see|🦋||smell,hear",
    "Finches with the right beak size for the food on the island...|survived better|🐦||changed on purpose,never ate",
    "Does one animal change itself on purpose to adapt?|no|🤔||yes always,only in winter",
    "A trait that helps survival becomes more common after...|many generations|⏳||one day,one meal"
  ], "Helpful traits help animals survive and have young."));
  b.push(L("Kinds of adaptations", [
    "Body part|🦒|A <b>structural adaptation</b> is a body feature, like a giraffe's long neck, a duck's webbed feet or a cactus that stores water.",
    "Action|🐻|A <b>behavioral adaptation</b> is something an animal does, like migrating, hibernating or building nests.",
    "Inside|🐍|A <b>physiological adaptation</b> is something the body does inside, like making venom or sweating."
  ], [
    "A duck's webbed feet are what kind of adaptation?|structural|🦆||behavioral,physiological",
    "Birds flying south for winter is a...|behavioral adaptation|🐦||structural adaptation,physiological adaptation",
    "A cactus that stores water has a...|structural adaptation|🌵||behavioral adaptation,physiological adaptation",
    "A bear hibernating is a...|behavioral adaptation|🐻||structural adaptation,physiological adaptation",
    "A giraffe's long neck is a...|structural adaptation|🦒||behavioral adaptation,physiological adaptation",
    "A snake making venom inside its body is a...|physiological adaptation|🐍||structural adaptation,behavioral adaptation",
    "Building a nest is a...|behavioral adaptation|🪺||structural adaptation,physiological adaptation",
    "Thick fur on a polar bear is a...|structural adaptation|🐻‍❄️||behavioral adaptation,physiological adaptation"
  ], "Is it a body part, an action or something inside the body?"));
  b.push(L("Kingdoms of life", [
    "Big groups|🌍|The biggest groups of living things are called <b>kingdoms</b>. They include animals, plants, fungi, protists and bacteria.",
    "Examples|🐕🌳🍄|Dogs are in the animal kingdom, oaks in the plant kingdom, mushrooms in the fungi kingdom. An amoeba is a protist.",
    "Smaller and smaller|🪜|Scientists sort in steps: kingdom, phylum, class, order, family, genus and species. Species is the smallest group."
  ], [
    "A mushroom is in which kingdom?|fungi|🍄||plants,animals",
    "An oak tree is in the...|plant kingdom|🌳||fungi kingdom,animal kingdom",
    "A dog is in the...|animal kingdom|🐕||plant kingdom,fungi kingdom",
    "An amoeba is a...|protist|🦠||plant,fungus",
    "Which group is the biggest?|kingdom|🌍||species,genus",
    "Which group is the smallest?|species|🐾||kingdom,phylum",
    "Bacteria belong to their own...|kingdom|🦠||species,organ",
    "Which group comes right before species?|genus|🪜||class,kingdom"
  ], "Kingdoms are the biggest groups."));
  b.push(L("Scientific names", [
    "Two-part names|📛|Carl Linnaeus gave each kind of living thing a two-part name in Latin. The first part is the <b>genus</b> and the second is the <b>species</b>.",
    "Examples|🦁|A lion is <i>Panthera leo</i>. A house cat is <i>Felis catus</i>. People are <i>Homo sapiens</i>.",
    "Why|🌐|Common names change from place to place. A scientific name is the same everywhere."
  ], [
    "Who gave living things two-part names?|Linnaeus|📛||Darwin,Mendel",
    "A scientific name has how many parts?|two|📛||one,five",
    "The first part of a scientific name is the...|genus|🦁||species,family",
    "The second part of a scientific name is the...|species|🐈||kingdom,genus",
    "Homo sapiens is the scientific name for...|humans|🧑||cats,lions",
    "Panthera leo is the scientific name of the...|lion|🦁||tiger,wolf",
    "Scientific names are useful because they are the same...|everywhere|🌐||only in one town,only on Mondays",
    "Scientific names are written in the language called...|Latin|📜||Spanish,French"
  ], "Genus first, then species."));
  b.push(L("Using a microscope", [
    "Parts|🔬|A microscope has an <b>eyepiece</b>, <b>objective lenses</b>, a <b>stage</b> that holds the slide, a light and <b>focus knobs</b>.",
    "Magnify|🔎|Total magnification = eyepiece power times objective power. A 10x eyepiece with a 40x objective gives 400x.",
    "Safe use|🧤|Carry it with two hands. Start with the lowest power lens, then change."
  ], [
    "The part that holds the slide is the...|stage|🔬||eyepiece,base cord",
    "The part you look through is the...|eyepiece|👁️||stage,slide",
    "A 10x eyepiece with a 10x objective makes...|100x|🔎||20x,1000x",
    "A 10x eyepiece with a 40x objective makes...|400x|🔬||50x,4000x",
    "Which turns to make the picture clear?|focus knob|🎛️||stage,light switch",
    "You should start with the...|lowest power lens|🔬||highest power lens,biggest slide",
    "A thin glass piece with a sample on it is a...|slide|🧪||stage,knob",
    "Why do we use a microscope?|to see tiny things|🔎||to hear sounds,to weigh things"
  ], "Name each part of the microscope by its job."));
  b.push(L("Energy pyramid", [
    "Levels|🔺|Producers are at the bottom. Then <b>primary consumers</b> (plant eaters), <b>secondary consumers</b> and top <b>predators</b>.",
    "Less each step|📉|Only about <b>10 percent</b> of energy passes to the next level. The rest is used for living or lost as heat.",
    "So|🦅|That is why there are many plants, fewer plant eaters and very few top predators."
  ], [
    "Which level of the pyramid has the most energy?|producers|🌱||top predators,secondary consumers",
    "A grasshopper eating grass is a...|primary consumer|🦗||producer,top predator",
    "A frog eating a grasshopper is a...|secondary consumer|🐸||producer,decomposer",
    "About how much energy passes to the next level?|10 percent|📉||90 percent,50 percent",
    "Why are there few top predators?|little energy reaches the top|🦅||they are shy,they sleep a lot",
    "Plants are the...|producers|🌿||consumers,decomposers",
    "A hawk at the top is a...|top predator|🦅||producer,primary consumer",
    "Where does the energy at the bottom of the pyramid come from?|the Sun|☀️||the soil,the wind"
  ], "Energy shrinks as you go up the pyramid."));
  b.push(MIX("Mixed practice", [b[0], b[1], b[2], b[4], b[6], b[8], b[9], b[10], b[12], b[16]]));
  b.push(MIX("Level 8 Challenge", [b[3], b[5], b[7], b[11], b[13], b[14], b[15], b[17], b[0], b[6]]));

  // ================= LEVEL 9 =================
  const c = [];
  c.push(L("Biodiversity", [
    "So many kinds|🌎|<b>Biodiversity</b> means the variety of living things in a place. Rainforests and coral reefs have a huge variety.",
    "Why it matters|⚖️|A place with many kinds of living things is usually stronger. If one species struggles, others can fill its role.",
    "Losing species|🐾|When species disappear, food webs can break and ecosystems become weaker."
  ], [
    "The variety of living things in a place is called...|biodiversity|🌎||population,habitat",
    "Which place has very high biodiversity?|rainforest|🌴||ice sheet,parking lot",
    "Which has more kinds of life?|a coral reef|🪸||a bare desert rock,a paved road",
    "Why is high biodiversity good for an ecosystem?|it makes it stronger|⚖️||it uses more space,it stops rain",
    "If a species disappears, the food web can...|be harmed|🕸️||get faster,stay exactly the same",
    "Biodiversity includes plants, animals, fungi and...|microbes|🦠||toys,clouds",
    "A field with only one kind of plant has...|low biodiversity|🌾||high biodiversity,no soil",
    "Rainforests are famous for their...|many species|🦜||few species,empty ground"
  ], "Think about how many different kinds there are."));
  c.push(L("Limits to growth", [
    "Limiting factors|📏|A <b>limiting factor</b> stops a population from growing without end. Food, water, space, shelter, predators and disease are limiting factors.",
    "Carrying capacity|🏞️|The <b>carrying capacity</b> is the largest population an environment can support for a long time.",
    "Ups and downs|📈📉|If food is plentiful, a population grows. In a drought it can shrink."
  ], [
    "Something that limits how big a population can grow is a...|limiting factor|📏||birth day,habitat",
    "The largest population an area can support is the...|carrying capacity|🏞️||food chain,niche",
    "Which is a limiting factor?|food supply|🍽️||a rainbow,a shadow",
    "A drought makes a deer population...|shrink|🦌||grow forever,turn blue",
    "When there is plenty of food and water, a population usually...|grows|📈||vanishes,stays at zero",
    "More predators will usually make a prey population...|smaller|🐺||bigger,louder",
    "Too many animals in a small space can cause...|a lack of food|🏞️||more sunshine,extra water",
    "Disease is a limiting factor because it can...|lower the population|🤒||add food,build shelter"
  ], "What stops a population from growing forever?"));
  c.push(L("Succession", [
    "Slow change|🪨|<b>Succession</b> is the slow change of the living things in a place over time.",
    "Starting from rock|🌋|<b>Primary succession</b> starts on bare rock with no soil. First come <b>lichens</b> and <b>mosses</b>. They help make soil.",
    "After a disturbance|🔥|<b>Secondary succession</b> happens where soil is still there, like after a fire or a flood. Grasses come first, then shrubs, then trees."
  ], [
    "Slow change in the living things of an area is...|succession|⏳||migration,pollination",
    "Succession that starts on bare rock is...|primary succession|🪨||secondary succession,rapid succession",
    "Which grow first on bare rock?|lichens|🪨||oak trees,deer",
    "Succession after a fire, with soil left, is...|secondary succession|🔥||primary succession,final succession",
    "Which usually comes first after a fire?|grasses|🌱||tall trees,whales",
    "Which comes last?|large trees|🌳||bare soil,mosses",
    "Lichens and mosses help rock become...|soil|🪨||ice,sand castles",
    "A new island made of lava rock begins with...|primary succession|🌋||secondary succession,no succession"
  ], "Does the place start with soil or without soil?"));
  c.push(L("Invasive species", [
    "Newcomers|🐸|An <b>invasive species</b> is a living thing that was brought to a new place and spreads, harming the native species.",
    "Why they win|🌿|Invasive species often have no predators in their new home. Examples: kudzu vine, zebra mussels and cane toads.",
    "What we can do|🧽|Clean boats and boots, do not move firewood and never let pets go into the wild."
  ], [
    "A species from somewhere else that harms the new place is...|invasive|🐸||native,extinct",
    "A species that belongs naturally in a place is...|native|🌳||invasive,imported",
    "Invasive species often win because they have no...|predators|🐺||water,seeds",
    "Which is an invasive plant?|kudzu|🌿||an oak in its home forest,a native wildflower",
    "You should never let pets go...|into the wild|🐕||to the vet,to school",
    "Cleaning boats helps stop the spread of...|invasive species|⛵||clouds,tides",
    "Invasive species can harm...|native species|🦎||only rocks,only the weather",
    "Moving firewood can spread...|insect pests|🪵||new songs,rainbows"
  ], "Think about animals and plants in the wrong place."));
  c.push(L("People and nature", [
    "Problems|🏭|People can harm nature with <b>pollution</b>, cutting down forests (<b>deforestation</b>), litter and catching too many fish (<b>overfishing</b>).",
    "Solutions|♻️|We can help by following <b>reduce, reuse, recycle</b>, planting trees and using clean energy like solar and wind power.",
    "Protecting|🏞️|<b>Conservation</b> means protecting nature. National parks and reserves keep habitats safe."
  ], [
    "Cutting down large areas of forest is...|deforestation|🪓||reforestation,recycling",
    "Protecting nature and its resources is...|conservation|🏞️||pollution,litter",
    "Which energy source is renewable?|solar|☀️||coal,oil",
    "Reduce, reuse and...|recycle|♻️||refuse,remove",
    "Taking too many fish from the sea is...|overfishing|🎣||recycling,sailing",
    "Planting trees helps by giving animals...|habitat|🌳||pollution,trash",
    "Which is a way to reduce waste?|using a refillable bottle|🚰||throwing litter,buying more plastic",
    "Pollution in a river can harm...|water animals|🐟||only the clouds,only rocks"
  ], "Which choices help nature and which harm it?"));
  c.push(L("Photosynthesis and respiration", [
    "Making food|🌿|In <b>photosynthesis</b>, plants use light, water and carbon dioxide to make sugar and oxygen. It happens in chloroplasts.",
    "Using food|⚡|In <b>cellular respiration</b>, cells use sugar and oxygen to release energy, and give out carbon dioxide and water. It happens in mitochondria.",
    "Opposites|🔄|The two processes are almost opposites. Plants do both. Animals do only respiration."
  ], [
    "Which process makes sugar using light?|photosynthesis|☀️||respiration,digestion",
    "Which process releases energy from sugar?|respiration|⚡||photosynthesis,pollination",
    "Photosynthesis takes in carbon dioxide and gives out...|oxygen|🌿||helium,smoke",
    "Respiration uses sugar and...|oxygen|🫁||sunlight,soil",
    "Photosynthesis happens in the...|chloroplasts|🌿||mitochondria,nucleus",
    "Respiration happens in the...|mitochondria|⚡||chloroplasts,cell wall",
    "Which living things do photosynthesis?|plants|🌱||dogs,rocks",
    "Which living things do respiration?|plants and animals|🐾||only animals,only rocks"
  ], "One process makes sugar, the other uses it."));
  c.push(L("Plants respond", [
    "Growing toward|🌻|A plant grows in response to its surroundings. <b>Phototropism</b> is growing toward light.",
    "Down and up|⬇️⬆️|<b>Gravitropism</b>: roots grow down and shoots grow up. <b>Thigmotropism</b>: a vine curls around something it touches.",
    "Quick moves|🪴|A mimosa plant folds its leaves when touched. A Venus flytrap snaps shut on an insect."
  ], [
    "Growing toward light is called...|phototropism|🌻||gravitropism,hydrotropism",
    "Roots growing downward show...|gravitropism|⬇️||phototropism,thigmotropism",
    "A vine curling around a pole is...|thigmotropism|🌱||phototropism,gravitropism",
    "A houseplant on a windowsill bends toward the...|light|🪟||floor,door",
    "Which part of a seedling grows down?|root|🌱||shoot,leaf",
    "Which plant folds its leaves when touched?|mimosa|🪴||oak,pine",
    "Which plant snaps shut on insects?|Venus flytrap|🪰||sunflower,rose",
    "A tropism is a plant's growth in response to a...|stimulus|🌿||sound track,price"
  ], "What is the plant responding to?"));
  c.push(L("Plant defenses", [
    "Hard to eat|🌵|Plants cannot run away, so they have defenses. <b>Thorns</b> and <b>spines</b> poke hungry animals.",
    "Tricky chemicals|🌿|Some plants taste bad or are poisonous. Poison ivy has an oil that makes skin itch. Nettles have stinging hairs.",
    "Tough|🌳|Thick bark protects trees. Never touch or eat plants you do not know."
  ], [
    "A cactus protects itself with...|spines|🌵||wings,fur",
    "A rose bush has sharp...|thorns|🌹||beaks,gills",
    "Thick bark protects a...|tree|🌳||bee,fish",
    "A plant that tastes bad is protected from...|being eaten|🌿||the sun,the rain",
    "Stinging nettle protects itself with...|stinging hairs|🌿||big eyes,loud songs",
    "Poison ivy can make your skin...|itchy|🍃||glow,grow",
    "You should never eat a plant unless you are sure it is...|safe|⚠️||purple,small",
    "Plants need defenses because they cannot...|run away|🌱||breathe,make seeds"
  ], "How can a plant that cannot move protect itself?"));
  c.push(L("Instinct and learning", [
    "Born knowing|🐢|An <b>instinct</b> is a behavior animals are born with. Baby sea turtles crawl toward the sea. Spiders spin webs without lessons.",
    "Learned|🐕|A <b>learned behavior</b> comes from experience. A dog learns to sit. A crow learns to use a tool.",
    "Following mom|🦆|Ducklings follow the first moving thing they see after hatching, usually their mother. This is called <b>imprinting</b>."
  ], [
    "A behavior an animal is born with is an...|instinct|🐢||habit class,lesson",
    "A spider spinning its first web shows...|instinct|🕷️||learning,practice",
    "A dog learning to sit shows...|learned behavior|🐕||instinct,migration",
    "Baby sea turtles crawling to the sea is...|instinct|🐢||learned behavior,a game",
    "A crow dropping nuts on a road to crack them is...|learned behavior|🐦‍⬛||pure instinct,a plant response",
    "Ducklings following their mother is called...|imprinting|🦆||hibernating,pollinating",
    "Riding a bicycle is...|learned|🚲||an instinct,a reflex",
    "A newborn baby sucking milk is...|an instinct|🍼||learned in school,a trick"
  ], "Was it born knowing it, or did it learn it?"));
  c.push(L("Animal communication", [
    "Signals|📢|Animals communicate with sounds, smells, colors and movement.",
    "Examples|🐝🐋|A honeybee does a <b>waggle dance</b> to show other bees where flowers are. Whales sing. Fireflies flash light. Ants leave scent trails.",
    "Why|🐦|Birds sing to claim a territory or find a mate. Meerkats give alarm calls to warn the group."
  ], [
    "A honeybee shows where flowers are with a...|waggle dance|🐝||song,whistle",
    "Ants find the way using a...|scent trail|🐜||light show,loud drum",
    "Fireflies communicate with...|flashing light|✨||roars,paw prints",
    "Whales communicate with...|songs|🐋||smoke,flags",
    "Meerkat alarm calls warn the group of...|danger|🦦||dinner,rain only",
    "Birds sing to claim their...|territory|🐦||taxes,homework",
    "A dog wagging its tail may be showing...|a feeling|🐕||the time,a map",
    "Which is NOT a way animals communicate?|reading books|📚||sound,smell"
  ], "Animals use sound, smell, light and movement."));
  c.push(L("Camouflage and mimicry", [
    "Hide|🦎|<b>Camouflage</b> helps an animal blend in. A stick insect looks like a twig. An arctic hare turns white in winter.",
    "Copy|🦋|<b>Mimicry</b> means looking like something else. A harmless viceroy butterfly looks like the bad-tasting monarch.",
    "Warning|🐸|Some animals have bright colors as a <b>warning</b>. A poison dart frog's colors say: do not eat me!"
  ], [
    "Blending in with the surroundings is...|camouflage|🦎||mimicry,migration",
    "Looking like another animal is...|mimicry|🦋||camouflage,hibernation",
    "A stick insect looks like a...|twig|🌿||rock,flower",
    "An arctic hare turns white in winter to blend with...|snow|❄️||sand,grass",
    "Bright colors on a poisonous frog are a...|warning|🐸||disguise,song",
    "A harmless animal that looks like a harmful one uses...|mimicry|🦋||camouflage,warning song",
    "Camouflage helps animals avoid...|being seen|👀||getting water,growing",
    "Which animal can change its color to blend in?|chameleon|🦎||elephant,wolf"
  ], "Is the animal hiding, copying or warning?"));
  c.push(L("Staying balanced", [
    "Homeostasis|⚖️|<b>Homeostasis</b> means keeping the inside of your body steady, like a thermostat in a house.",
    "Temperature|🌡️|Your body stays at about 37 degrees Celsius. When you get hot, you <b>sweat</b>. When you get cold, you <b>shiver</b>.",
    "More|❤️|When you exercise, your heart and breathing speed up to bring more oxygen. Thirst tells you to drink."
  ], [
    "Keeping the body steady inside is...|homeostasis|⚖️||digestion,evolution",
    "Normal body temperature is about...|37 degrees Celsius|🌡️||10 degrees Celsius,60 degrees Celsius",
    "When you get too hot, your body...|sweats|💦||shivers,freezes",
    "When you get too cold, your body...|shivers|🥶||sweats,sleeps",
    "During exercise, your heart rate...|speeds up|🏃||stops,stays at zero",
    "Feeling thirsty tells you to...|drink water|🥤||go to sleep,add salt",
    "A thermostat in a house works like...|homeostasis|🏠||a fossil,a seed",
    "Why does sweat cool you down?|it carries away heat as it dries|💦||it freezes the skin,it makes you grow"
  ], "Your body keeps its inside steady."));
  c.push(L("Hormones", [
    "Chemical messengers|🧪|<b>Hormones</b> are chemical messages made in glands. They travel in the blood and tell body parts what to do.",
    "Examples|🍬|The pancreas makes <b>insulin</b>, which controls the sugar in your blood. The <b>adrenal glands</b> make adrenaline when you are scared or excited.",
    "Slow and steady|🕰️|Hormones work more slowly than nerves, but their effects last longer. The pituitary gland is the \"master gland\" in the brain."
  ], [
    "Chemical messages in the blood are...|hormones|🧪||tendons,nerves",
    "Which hormone controls blood sugar?|insulin|🍬||adrenaline,melanin",
    "Which gland makes insulin?|pancreas|🍬||thyroid,liver",
    "Adrenaline is made when you feel...|scared or excited|⚡||sleepy,full",
    "Hormones travel through the...|blood|🩸||bones,hair",
    "Which works faster?|nerves|⚡||hormones,vitamins",
    "The \"master gland\" is the...|pituitary|🧠||kidney,appendix",
    "Glands make hormones, and then hormones...|travel in the blood|🩸||turn into bones,stop working"
  ], "Hormones are chemical messengers."));
  c.push(L("Body systems team up", [
    "Teamwork|🏃|Body systems work together. When you run, your muscles move you, your lungs bring in oxygen and your heart pumps it to the muscles.",
    "Jobs|📋|The digestive system gets nutrients. The circulatory system delivers them. The nervous system sends messages. The excretory system removes waste.",
    "Protect|🛡️|The immune system fights germs. The skeletal system supports and protects."
  ], [
    "Which system delivers oxygen and nutrients around the body?|circulatory|❤️||skeletal,digestive",
    "Which system gets nutrients out of food?|digestive|🍽️||nervous,respiratory",
    "Which system brings oxygen into the body?|respiratory|🫁||excretory,immune",
    "Which system sends messages?|nervous|🧠||digestive,skeletal",
    "Which system fights germs?|immune|🛡️||muscular,respiratory",
    "Which system removes waste from the blood?|excretory|🫘||nervous,skeletal",
    "Which two systems work together to move your body?|skeletal and muscular|🦴||digestive and immune,nervous and excretory",
    "When you run, your heart beats faster to send more...|oxygen to muscles|🏃||snow to muscles,light to bones"
  ], "Think about each system's job."));
  c.push(L("Dominant and recessive", [
    "Two copies|🧬|You get two copies of each gene, one from each parent. A <b>dominant</b> allele (big letter B) shows up even if only one copy is there.",
    "Hidden|🫥|A <b>recessive</b> allele (small letter b) shows only when both copies are recessive (bb). Bb looks the same as BB.",
    "Punnett square|🔲|A <b>Punnett square</b> shows the chances for the young. Mendel studied this with pea plants."
  ], [
    "An allele that shows even with one copy is...|dominant|🧬||recessive,mutant",
    "An allele that shows only with two copies is...|recessive|🫥||dominant,loud",
    "Brown (B) is dominant to white (b). A Bb plant is...|brown|🌱||white,half brown",
    "Brown (B) is dominant to white (b). A bb plant is...|white|🌱||brown,green",
    "Bb crossed with Bb: the chance of bb is...|25 percent|🔲||50 percent,75 percent",
    "BB crossed with bb: every young one is...|one big and one small allele|🔲||two big alleles,two small alleles",
    "A chart that shows the chances for young is a...|Punnett square|🔲||pie chart,periodic table",
    "Who studied heredity with pea plants?|Mendel|🫛||Pasteur,Hooke"
  ], "Capital letters are dominant and small letters are recessive."));
  c.push(L("Mutations and variation", [
    "A DNA change|🧬|A <b>mutation</b> is a change in DNA. Most mutations have no effect. Some are harmful and a few help.",
    "New traits|🐯|Mutations are a source of new variation. A mutation in an egg or sperm cell can be passed to the young.",
    "Not all variation is inherited|🏋️|Some differences come from the environment, like muscles from exercise or a plant being short from too little water."
  ], [
    "A change in DNA is a...|mutation|🧬||migration,reflex",
    "Most mutations have...|no effect|🤷||a huge effect,a loud noise",
    "Mutations are a source of new...|variation|🌈||fossils,oxygen",
    "A mutation passed to young is in the...|egg or sperm cells|🧬||skin freckle only,hair clip",
    "Big muscles from exercise are from the...|environment|🏋️||genes only,fossils",
    "A short plant from too little water is a difference caused by the...|environment|🌱||genes only,planet",
    "Can a mutation sometimes help a living thing survive?|yes|✅||no never,only in plants",
    "Where is DNA found in a cell?|nucleus|🔬||wall,vacuole"
  ], "Think about changes in DNA and where differences come from."));
  c.push(L("Evidence for evolution", [
    "Fossils|🦴|Fossils in older rock layers show earlier forms of life. Layers deeper down are usually older.",
    "Body clues|🦇🐋|A human arm, a bat wing and a whale flipper have similar bones. This suggests a common ancestor.",
    "DNA|🧬|Animals that are closely related have more similar DNA. Whales had ancestors that walked on land."
  ], [
    "Older fossils are usually found in layers that are...|deeper|⛏️||higher up,painted",
    "A bat wing and a human arm have similar...|bones|🦴||colors,sounds",
    "Closely related animals have more similar...|DNA|🧬||phone numbers,names",
    "Whales had ancestors that lived on...|land|🐋||the Moon,trees only",
    "A common ancestor is an animal that...|related species came from|🌳||lives in a zoo,eats leaves",
    "Fossils give clues about...|life in the past|🦕||tomorrow's weather,TV shows",
    "Which two animals are most closely related?|a wolf and a dog|🐺||a wolf and a frog,a dog and a snail",
    "Evolution happens over...|a very long time|⏳||a single day,one meal"
  ], "Evidence comes from fossils, body parts and DNA."));
  c.push(L("Life scientists", [
    "Explorers of life|🔭|Charles <b>Darwin</b> explained natural selection. Gregor <b>Mendel</b> studied heredity in pea plants. Carl <b>Linnaeus</b> named living things.",
    "Tiny worlds|🔬|Robert <b>Hooke</b> first named cells when he looked at cork. Antonie van <b>Leeuwenhoek</b> saw tiny living things with his own microscopes. Louis <b>Pasteur</b> showed that germs cause disease.",
    "Nature helpers|🦍|Jane <b>Goodall</b> studied wild chimpanzees. Edward <b>Jenner</b> made the first vaccine, for smallpox."
  ], [
    "Who explained natural selection?|Darwin|📖||Mendel,Hooke",
    "Who studied heredity with pea plants?|Mendel|🫛||Darwin,Pasteur",
    "Who gave living things two-part names?|Linnaeus|📛||Goodall,Jenner",
    "Who first named cells while looking at cork?|Hooke|🔬||Pasteur,Linnaeus",
    "Who showed that germs cause disease?|Pasteur|🧫||Mendel,Goodall",
    "Who studied wild chimpanzees?|Goodall|🦍||Jenner,Darwin",
    "Who made the first smallpox vaccine?|Jenner|💉||Hooke,Linnaeus",
    "Who saw tiny living things with his own microscopes?|Leeuwenhoek|🔬||Mendel,Jenner"
  ], "Match each scientist to what they found."));
  c.push(MIX("Mixed practice", [c[0], c[1], c[2], c[4], c[5], c[8], c[9], c[10], c[13], c[15]]));
  c.push(MIX("Level 9 Challenge", [c[3], c[6], c[7], c[11], c[12], c[14], c[16], c[17], c[1], c[10]]));

  Object.assign(LIFE_LEVELS, { 7: a, 8: b, 9: c });
})();
