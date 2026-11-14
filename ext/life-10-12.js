// ext/life-10-12.js  Life Science levels 10-12
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

  // ================= LEVEL 10 =================
  const a = [];
  a.push(L("The carbon cycle", [
    "Carbon is everywhere|🌍|All living things contain <b>carbon</b>. Carbon moves between air, plants, animals and soil again and again. That is the <b>carbon cycle</b>.",
    "Taking in and giving out|🌿🐕|Plants take in <b>carbon dioxide</b> from the air to make food. Animals eat plants and breathe carbon dioxide back out.",
    "Returning carbon|🏭🍄|Burning coal, oil and gas adds carbon dioxide to the air. Decomposers return carbon to the soil when they break down dead things."
  ], [
    "Which gas do plants take in to make food?|carbon dioxide|🌿||oxygen,nitrogen",
    "Which gas do animals breathe out?|carbon dioxide|🐕||oxygen,helium",
    "Which gas do plants release when they make food?|oxygen|🌳||carbon dioxide,smoke",
    "Burning coal and gas adds which gas to the air?|carbon dioxide|🏭||oxygen,helium",
    "Which living things return carbon to the soil by breaking down dead matter?|decomposers|🍄||producers,predators",
    "When a rabbit eats grass, carbon moves from the grass into the...|rabbit|🐇||sun,clouds",
    "Why is it called a carbon cycle?|carbon keeps moving around and around|🔄||carbon is used up forever,carbon stays only in rocks",
    "Which things are made of carbon?|all living things|🧬||only plants,only rocks"
  ], "Follow where the carbon goes: air, plants, animals, soil."));
  a.push(L("Nitrogen and soil", [
    "Air is mostly nitrogen|🌬️|About 78 percent of the air is <b>nitrogen</b>. But plants cannot use nitrogen straight from the air.",
    "Helpful bacteria|🦠🫘|Some bacteria in soil, and on the roots of beans and peas, change nitrogen into a form plants can use.",
    "Back to the soil|🍄🚜|Decomposers return nitrogen to the soil when things die. Farmers add fertilizer to give soil extra nutrients."
  ], [
    "Which gas makes up most of the air?|nitrogen|🌬️||oxygen,carbon dioxide",
    "Which living things change nitrogen into a form plants can use?|bacteria|🦠||birds,earthworms",
    "Plants take up nitrogen from the soil through their...|roots|🌱||petals,seeds",
    "Peas and beans have helpful bacteria living on their...|roots|🫘||petals,pods",
    "Farmers add fertilizer to give soil more...|nutrients|🚜||sunlight,sand",
    "Plants need nitrogen to make...|proteins|🌿||rocks,glass",
    "About how much of the air is nitrogen?|about 78 percent|🌬️||about 21 percent,about 1 percent",
    "Which returns nitrogen to soil when plants and animals die?|decomposers|🍄||producers,herbivores"
  ], "Nitrogen needs helpers before plants can use it."));
  a.push(L("Living together: symbiosis", [
    "Symbiosis|🤝|<b>Symbiosis</b> means two different kinds of living things live close together. There are three main kinds.",
    "Mutualism and commensalism|🐝🌸|In <b>mutualism</b> both partners benefit, like a bee and a flower. In <b>commensalism</b> one partner benefits and the other is not harmed or helped.",
    "Parasitism|🐕|In <b>parasitism</b> one partner benefits and the other is harmed. A flea feeds on a dog and the dog is harmed."
  ], [
    "Both partners benefit. This is called...|mutualism|🤝||commensalism,parasitism",
    "One partner benefits and the other is not affected. This is...|commensalism|🤝||mutualism,parasitism",
    "One partner benefits and the other is harmed. This is...|parasitism|🤝||mutualism,commensalism",
    "A bee gets nectar and the flower gets pollinated. This is...|mutualism|🐝||commensalism,parasitism",
    "Barnacles ride on a whale and the whale is not harmed. This is...|commensalism|🐋||mutualism,parasitism",
    "A flea drinks a dog's blood and makes it itchy. This is...|parasitism|🐕||mutualism,commensalism",
    "A clownfish hides among anemone tentacles and keeps the anemone clean. This is...|mutualism|🐠||commensalism,parasitism",
    "An orchid grows on a tree branch and the tree is not harmed. This is...|commensalism|🌺||mutualism,parasitism"
  ], "Ask: who benefits, and is anyone harmed?"));
  a.push(L("Niches and competition", [
    "What is a niche?|🏠|A <b>niche</b> is an organism's role in its ecosystem: where it lives, what it eats, and how it survives.",
    "Competition|🥊|When living things need the same limited resource, like food, water, space or light, they <b>compete</b>.",
    "Sharing a place|🐦🌳|Different species often use different niches, like birds that feed at different heights in the same tree. This lowers competition."
  ], [
    "An organism's role in its ecosystem is called its...|niche|🏠||habitat,population",
    "Trees in a thick forest compete for...|sunlight|🌳||wind,sand",
    "Needing the same limited resource is called...|competition|🥊||cooperation,migration",
    "Two bird species feed at different heights in one tree. This helps them...|avoid competing|🐦||compete more,disappear",
    "Plants in a crowded garden compete for water, light and...|soil nutrients|🌻||shade cloths,music",
    "Which is part of a niche?|what the animal eats|🦊||its favorite color,its name",
    "If food becomes scarce, competition gets...|stronger|📉||weaker,quieter",
    "Animals compete for food, water, space and...|shelter|🏚️||money,toys"
  ], "A niche is a job in nature. Competition is about sharing limited things."));
  a.push(L("Rainforest layers", [
    "A warm wet forest|🌴|Tropical rainforests are warm all year and get lots of rain. They hold more kinds of plants and animals than almost any other land biome.",
    "Four layers|🌳|The <b>emergent layer</b> has the tallest trees. The <b>canopy</b> is a thick leafy roof. The <b>understory</b> is shady. The <b>forest floor</b> is dark.",
    "Life in the layers|🦜🐒|Many animals, like toucans and monkeys, live in the canopy. On the floor, fallen leaves rot quickly in the warmth."
  ], [
    "Which layer has the tallest trees that poke above the rest?|emergent layer|🌳||understory,forest floor",
    "Which layer is a thick leafy roof of branches?|canopy|🌴||forest floor,understory",
    "Which layer is the darkest, with fallen leaves?|forest floor|🍂||canopy,emergent layer",
    "Which layer has small trees and shrubs in the shade?|understory|🌿||canopy,emergent layer",
    "Where do most rainforest animals live?|in the canopy|🦜||in the emergent layer only,under the ground",
    "What is the weather in a tropical rainforest?|warm and wet|🌧️||cold and dry,cool and windy",
    "Why do fallen leaves rot quickly on a rainforest floor?|it is warm and wet|🍂||it is freezing,it is dry",
    "Toucans and monkeys mostly live in the...|canopy|🐒||forest floor,soil"
  ], "Picture the forest from the sky down to the ground."));
  a.push(L("Tundra and taiga", [
    "Tundra|❄️|The <b>tundra</b> is cold and treeless. Under the surface the ground is frozen all year. This is called <b>permafrost</b>. Only small plants like moss and lichen grow.",
    "Taiga|🌲|The <b>taiga</b> is a huge forest of cone-bearing, evergreen trees in the cold north. Winters are long and snowy.",
    "Animals|🦌🦊|Caribou and arctic foxes live in the tundra. Taiga animals include moose, lynx and bears."
  ], [
    "Ground that stays frozen all year is called...|permafrost|❄️||bedrock,topsoil",
    "Which biome is cold, flat and has no tall trees?|tundra|❄️||taiga,rainforest",
    "Which biome is a huge forest of evergreen trees in the cold north?|taiga|🌲||tundra,desert",
    "Which animal lives in the tundra?|caribou|🦌||camel,monkey",
    "Why does an arctic fox turn white in winter?|to blend in with the snow|🦊||to look bigger,to find water",
    "Why do few trees grow in the tundra?|the ground is frozen and summers are short|❄️||it rains too much,it is too hot",
    "Taiga trees have needle-shaped leaves, so snow...|slides off easily|🌲||piles up on them,melts at once",
    "Moss and lichen grow in the...|tundra|🌿||open ocean,rainforest canopy"
  ], "Think about cold, frozen ground, and tree types."));
  a.push(L("Desert life", [
    "Dry places|🏜️|Deserts get very little rain. Some are hot and some are cold. Life there must save water.",
    "Plant tricks|🌵|A cactus stores water in its thick stem. Its spines give shade and keep animals away. Its waxy skin keeps water in.",
    "Animal tricks|🦊🐫|Many desert animals come out at night when it is cool. A fennec fox has big ears to lose heat. A camel's hump stores fat, not water."
  ], [
    "What is the main feature of a desert?|very little rain|🏜️||lots of rain,thick forests",
    "Where does a cactus store water?|in its stem|🌵||in its spines,in its flowers",
    "What does a camel's hump store?|fat|🐫||water,sand",
    "Why do many desert animals come out at night?|it is cooler|🌙||it rains at night,there are more plants",
    "A fennec fox has big ears to...|lose heat|🦊||hide in snow,swim",
    "A cactus has a waxy skin to...|keep water in|🌵||attract rain,catch fish",
    "A kangaroo rat can live on water from the...|seeds it eats|🐭||rivers it drinks,clouds",
    "Which plant is adapted to a desert?|cactus|🌵||water lily,maple tree"
  ], "Desert life is about saving water and staying cool."));
  a.push(L("Ponds, rivers and wetlands", [
    "Freshwater|💧|<b>Freshwater</b> habitats have very little salt. They include ponds, lakes, streams and rivers.",
    "Moving water|🏞️|A river starts at its <b>source</b> and flows toward its <b>mouth</b>, often at the sea. Streams are small and fast. Slow rivers have muddy bottoms.",
    "Wetlands|🦆🌾|<b>Wetlands</b> like marshes and swamps are soaked with water. They hold back floods, clean water and shelter ducks, frogs and fish."
  ], [
    "Freshwater has very little...|salt|💧||sand,oxygen",
    "Where does a river begin?|its source|🏞️||its mouth,its delta",
    "Rivers often end at the...|sea|🌊||mountain top,desert",
    "Marshes and swamps are types of...|wetlands|🌾||deserts,glaciers",
    "Wetlands help people by soaking up extra...|floodwater|🌧️||sunlight,sand",
    "Which animal would you expect in a pond?|frog|🐸||camel,arctic fox",
    "Which is a freshwater habitat?|lake|🏞️||coral reef,open ocean",
    "A beaver's dam makes a...|pond|🦫||desert,cave"
  ], "Freshwater means not salty."));
  a.push(L("Coral reefs", [
    "Corals are animals|🪸|A coral is made of tiny animals called <b>polyps</b>. They build hard skeletons that grow into a reef over many years.",
    "Warm and clear|🐠|Reefs grow in warm, shallow, sunny seas. Tiny algae live inside corals and make food for them from sunlight.",
    "Reefs in danger|🌡️|A reef shelters a huge number of fish. If the water gets too warm, corals lose their algae and turn white. This is called <b>bleaching</b>."
  ], [
    "A coral reef is built by tiny...|animals|🪸||plants,rocks",
    "The tiny animals that build a reef are called...|polyps|🪸||seeds,larvae of crabs",
    "Where do coral reefs grow?|warm shallow seas|🌊||cold deep trenches,freshwater ponds",
    "Why do reefs grow in sunny water?|algae inside corals need light|☀️||fish need tans,sand needs heat",
    "When corals turn white from warm water, it is called...|bleaching|🌡️||blooming,freezing",
    "The Great Barrier Reef is found near...|Australia|🗺️||Canada,Egypt",
    "Many fish live on reefs because reefs give them...|food and shelter|🐠||snow and ice,sand castles",
    "Algae living in coral make food using...|sunlight|☀️||moonlight,sound"
  ], "Corals look like rocks, but they are alive."));
  a.push(L("Shores and estuaries", [
    "Tides|🌊|Tides are the rise and fall of the sea each day. The Moon's gravity causes them. Land that is covered at high tide shows at low tide.",
    "Tide pools|🦀|Small pools left at low tide hold crabs, snails, sea stars and barnacles. They must cope with waves, sun and changing salt.",
    "Estuaries|🏞️🌊|An <b>estuary</b> is where a river meets the sea. The water is a mix of fresh and salty. It is a busy nursery for young fish."
  ], [
    "What causes the tides?|the Moon's gravity|🌙||the wind only,fish swimming",
    "A place where a river meets the sea is an...|estuary|🏞️||oasis,iceberg",
    "Water that is a mix of fresh and salty water is...|brackish|🌊||distilled,frozen",
    "Pools left behind when the tide goes out are...|tide pools|🦀||deserts,ponds on mountains",
    "Which animal clings to rocks in a tide pool?|barnacle|🦐||camel,sparrow",
    "Tides rise and fall about how often each day?|twice|🌊||once a year,ten times",
    "Why are estuaries good nurseries for young fish?|they are rich in food and shelter|🐟||they are very dry,they are frozen",
    "At low tide, the sea level is...|lowest|⬇️||highest,not changing"
  ], "Think about the sea, the Moon and where rivers end."));
  a.push(L("Two kinds of seed plants", [
    "Seed leaves|🌱|Inside a seed is a baby plant with one or two seed leaves, called <b>cotyledons</b>.",
    "Monocots|🌽|<b>Monocots</b> have one seed leaf and leaves with parallel veins. Corn, grass, rice and lilies are monocots.",
    "Dicots|🫘|<b>Dicots</b> have two seed leaves and leaves with branching veins. Beans, roses and oak trees are dicots."
  ], [
    "A monocot seed has how many seed leaves?|one|🌽||two,three",
    "A dicot seed has how many seed leaves?|two|🫘||one,four",
    "A seed leaf is called a...|cotyledon|🌱||stamen,petal",
    "Grass leaves have veins that are...|parallel|🌾||branching,missing",
    "Which plant is a dicot?|bean|🫘||corn,grass",
    "Which plant is a monocot?|corn|🌽||rose,oak tree",
    "Leaves with branching veins belong to...|dicots|🍃||monocots,mosses",
    "Rice is a...|monocot|🌾||dicot,fern"
  ], "Count the seed leaves, or look at the veins."));
  a.push(L("Tree rings", [
    "Reading a stump|🪵|Cut across a tree trunk and you see rings. Each ring is usually <b>one year</b> of growth.",
    "Wide and narrow|📏|A wide ring means a good year with plenty of water and warmth. A narrow ring means a dry or cold year.",
    "Oldest to newest|🌳|The center ring is the oldest. The outside ring is the newest. The bark protects the tree."
  ], [
    "Each tree ring usually shows how much time?|one year|🪵||one day,one century",
    "A stump has 35 rings. About how old was the tree?|35 years|🪵||3 years,350 years",
    "A stump has 12 rings. About how old was the tree?|12 years|🪵||1 year,120 years",
    "A wide ring usually means a year that was...|good for growing|🌧️||very dry,very short",
    "A narrow ring usually means a year that was...|dry or cold|🌵||extra rainy,extra sunny",
    "Which ring is the oldest?|the center one|🎯||the outside one,the widest one",
    "Which part of a tree protects it on the outside?|bark|🌳||roots,seeds",
    "How do you see tree rings?|cut across the trunk|🪚||look at the leaves,look at the roots"
  ], "One ring, one year."));
  a.push(L("Germs and staying clean", [
    "Tiny germs|🦠|Germs are tiny living things that can make us sick, like some <b>bacteria</b> and <b>viruses</b>. We cannot see them without a microscope.",
    "Stopping germs|🧼|Wash hands with soap for about <b>20 seconds</b>. Cover coughs and sneezes. Keep food cold or cook it well.",
    "Helping the body|💉|Clean cuts, rest, healthy food and vaccines help the body fight germs."
  ], [
    "About how long should you wash your hands with soap?|20 seconds|🧼||2 seconds,5 minutes",
    "Germs can be spread by...|coughs and sneezes|🤧||fresh air only,sunshine",
    "To cover a sneeze, you should use your...|elbow or a tissue|🤧||bare hands,pet",
    "Which tool shows tiny germs?|microscope|🔬||telescope,ruler",
    "Why do we keep some foods in the fridge?|to slow germ growth|🧊||to make them heavy,to change color",
    "What should you do to a cut first?|clean it|🩹||leave it dirty,rub it with dirt",
    "A vaccine helps the body...|get ready to fight a germ|💉||grow taller,hear better",
    "Which is a good way to avoid spreading germs?|stay home when sick|🏠||share cups,skip handwashing"
  ], "Think about how germs move from place to place."));
  a.push(L("Taste, smell and touch", [
    "Taste|👅|Your tongue has <b>taste buds</b> that notice sweet, sour, salty and bitter flavors.",
    "Smell|👃|Your nose catches tiny particles in the air and sends signals to the brain. Smell and taste work together, so food seems bland when your nose is blocked.",
    "Touch|✋|Your skin has nerve endings that feel pressure, heat, cold and pain. Fingertips have many of them."
  ], [
    "What is on your tongue that notices flavors?|taste buds|👅||tonsils,whiskers",
    "Which is one of the main tastes?|salty|🧂||loud,smooth",
    "Food seems bland when your nose is blocked because smell and taste...|work together|🤧||never meet,are the same organ",
    "Where do signals about smells go?|to the brain|🧠||to the knee,to the hair",
    "Which part of the body has the most touch receptors per inch?|fingertips|☝️||elbows,back",
    "Skin can feel pressure, heat, cold and...|pain|🌡️||colors,music",
    "Lemons taste mostly...|sour|🍋||sweet,salty",
    "Why can pain be useful?|it warns you of danger|⚠️||it makes you taller,it helps you hear"
  ], "Which body part gathers this information?"));
  a.push(L("Sleep and the brain", [
    "Why we sleep|😴|Sleep lets your body rest and grow. Kids aged 6 to 12 need about <b>9 to 12 hours</b> each night.",
    "Busy brains|🧠|While you sleep, your brain sorts what you learned and stores memories. Your body repairs itself.",
    "Sleep habits|🌙|Go to bed at the same time. Keep the room dark and quiet. Turn off screens before bed."
  ], [
    "About how many hours of sleep do kids aged 6 to 12 need?|9 to 12|😴||3 to 4,15 to 18",
    "During sleep, the brain helps sort and store...|memories|🧠||sunlight,shadows",
    "During sleep, the body can rest, grow and...|repair itself|🛌||stop all work forever,shrink",
    "Which habit helps you sleep well?|a regular bedtime|🕘||a bright screen in bed,drinking soda late",
    "Which is a good place to sleep?|a dark quiet room|🌙||a loud bright room,a busy kitchen",
    "Being short on sleep can make it hard to...|pay attention|😪||grow feathers,see colors",
    "Why should screens go off before bed?|bright light can keep you awake|📱||they get sleepy,they use up the dark",
    "Is sleep important for growing?|yes|🌱||no,only for adults"
  ], "Sleep is when the body and brain do important jobs."));
  a.push(L("Skin, hair and nails", [
    "Your largest organ|🧍|Skin is the body's largest organ. The outer layer is the <b>epidermis</b>. The thicker layer under it is the <b>dermis</b>.",
    "Skin jobs|🛡️|Skin keeps out germs, holds in water, helps you feel, and cools you when you sweat. <b>Melanin</b> gives skin color and helps block harmful sunlight.",
    "Hair and nails|💅|Hair and nails are made of a tough material called <b>keratin</b>. Wear sunscreen to protect your skin."
  ], [
    "What is the body's largest organ?|skin|🧍||heart,brain",
    "The outer layer of skin is the...|epidermis|🧍||dermis,muscle",
    "What gives skin its color?|melanin|🎨||keratin,calcium",
    "Hair and nails are made of...|keratin|💅||melanin,plastic",
    "Sweating helps the body...|cool down|💦||warm up,grow taller",
    "Skin helps protect the body from...|germs|🛡️||gravity,sound",
    "Why should you wear sunscreen?|to protect skin from harmful sunlight|🧴||to make you glow,to keep sand off",
    "Skin can sense touch because it has...|nerve endings|✋||keratin plates,bones"
  ], "Skin is an organ with many jobs."));
  a.push(L("New plants without seeds", [
    "Cloning plants|🍓|Some plants make new plants without seeds. The new plant is a copy of its parent. This is called <b>asexual reproduction</b>.",
    "Ways to do it|🥔|Strawberries send out <b>runners</b>. Potatoes grow from <b>tubers</b>. Tulips and onions grow from <b>bulbs</b>.",
    "Cuttings|✂️|If you cut a stem from some plants and put it in water, it grows roots. A new plant grows from the cutting."
  ], [
    "A new plant that grows from a cutting is...|a copy of the parent|✂️||totally different,a seed",
    "Strawberries spread using...|runners|🍓||cones,spores",
    "A potato grows new plants from its...|tuber|🥔||cone,petals",
    "A tulip grows from a...|bulb|🌷||cone,tuber of a bean",
    "To grow a cutting you can put the stem in...|water|🥤||oil,dry sand",
    "Making new plants without seeds is called...|asexual reproduction|🌱||pollination,hibernation",
    "Which plant makes new plants by runners?|strawberry|🍓||pine tree,fern's cone",
    "The new roots on a cutting grow from the...|cut stem|✂️||seed,flower"
  ], "No seeds needed, so the new plant matches its parent."));
  a.push(L("Parents in the animal world", [
    "Many babies, few babies|🐢🐘|Sea turtles lay many eggs and leave. Most babies must care for themselves. Elephants have one baby at a time and care for it for years.",
    "Caring parents|🐧|Emperor penguin fathers keep an egg warm on their feet. Birds feed their chicks. Mammals feed their babies milk.",
    "Different strategies|🐟|Salmon lay thousands of eggs. Wolves live in packs that help raise pups."
  ], [
    "Which animal lays many eggs and leaves them?|sea turtle|🐢||elephant,wolf",
    "Which animal usually has one baby and cares for it for years?|elephant|🐘||frog,sea turtle",
    "Who keeps the egg warm on his feet?|emperor penguin|🐧||sea turtle,salmon",
    "Mammal mothers feed their babies...|milk|🍼||seeds,grass only",
    "Why do animals that leave their eggs lay so many?|many will not survive|🥚||they like counting,eggs are small toys",
    "Birds feed their chicks until the chicks can...|feed themselves|🐦||swim,sing",
    "A wolf pack helps raise the...|pups|🐺||eggs of fish,seeds",
    "Which fish lays thousands of eggs?|salmon|🐟||elephant,penguin"
  ], "Some parents have lots of babies and some give lots of care."));
  a.push(MIX("Mixed practice", [a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9]]));
  a.push(MIX("Level 10 Challenge", [a[10], a[11], a[12], a[13], a[14], a[15], a[16], a[17], a[2], a[8], a[0]]));

  // ================= LEVEL 11 =================
  const b = [];
  b.push(L("Moving in and out of cells", [
    "The cell membrane|🧫|The <b>cell membrane</b> is a thin skin around a cell. It lets some things in and out and keeps others out. Plant cells also have a stiff <b>cell wall</b>.",
    "Diffusion|💨|<b>Diffusion</b> is when particles spread out from a crowded place to a less crowded place, like a smell spreading across a room.",
    "Osmosis|💧|<b>Osmosis</b> is water moving through a membrane. A limp celery stalk gets crisp in water because its cells take water in."
  ], [
    "What controls what enters and leaves a cell?|cell membrane|🧫||nucleus,cell wall",
    "Which cells have a stiff cell wall outside the membrane?|plant cells|🌿||animal cells,human blood cells",
    "Particles spreading from crowded to less crowded is called...|diffusion|💨||evolution,migration",
    "Water moving through a membrane is called...|osmosis|💧||diffusion of rocks,respiration",
    "A smell spreading across a room is an example of...|diffusion|👃||photosynthesis,pollination",
    "Why does limp celery get crisp in water?|its cells take in water|🥬||it grows roots instantly,it makes sugar",
    "The cell wall gives a plant cell...|a stiff shape|🧱||a nucleus,eyes",
    "Food coloring spreads in a glass of water by...|diffusion|🥤||osmosis only,digestion"
  ], "Think about spreading out and passing through a thin skin."));
  b.push(L("How cells divide", [
    "Cells make more cells|✂️|Your body grows and heals because cells divide. One cell becomes two new cells. This is called <b>mitosis</b>.",
    "Steps|📋|First the cell copies its DNA. Then the copies line up and are pulled apart. Then the cell splits in two.",
    "Identical cells|👯|The two new cells are <b>identical</b> to the original. Skin cells divide all the time to replace old ones."
  ], [
    "Dividing a cell into two identical cells is called...|mitosis|✂️||photosynthesis,digestion",
    "What does the cell copy before it divides?|its DNA|🧬||its food,its skin",
    "How do the two new cells compare to the original?|identical|👯||opposite,much smaller forever",
    "Cell division helps the body grow and...|heal|🩹||fly,sleep",
    "One cell divides once. How many cells are there?|2|✂️||1,4",
    "A cell divides into 2, then each divides again. How many cells now?|4|✂️||3,8",
    "Which cells divide often to replace old ones?|skin cells|🧍||rock cells,glass cells",
    "What is found inside the nucleus that is copied?|DNA|🧬||sugar,water"
  ], "Copy first, then split."));
  b.push(L("Chromosomes", [
    "Where genes live|🧬|Genes are sections of DNA. The DNA is coiled up in structures called <b>chromosomes</b> in the nucleus.",
    "Counting|🔢|Humans have <b>46</b> chromosomes in most body cells. They come in <b>23 pairs</b>.",
    "From both parents|👪|You get 23 chromosomes from each parent. That is why you share traits with both."
  ], [
    "Genes are found on...|chromosomes|🧬||ribosomes,vacuoles",
    "How many chromosomes are in a human body cell?|46|🔢||23,64",
    "Human chromosomes form how many pairs?|23|🔢||46,12",
    "How many chromosomes do you get from each parent?|23|👪||46,12",
    "Chromosomes are found in the cell's...|nucleus|🧫||cell wall,membrane",
    "Chromosomes are made mostly of...|DNA|🧬||fat,water only",
    "Why do you share traits with both parents?|you get chromosomes from both|👪||you copy your friends,you eat their food",
    "A gene is a section of...|DNA|🧬||skin,bone"
  ], "Gene, DNA, chromosome, nucleus: from small to big."));
  b.push(L("Punnett squares", [
    "Alleles|🔤|An <b>allele</b> is a version of a gene. A capital letter (B) shows a <b>dominant</b> allele. A small letter (b) shows a <b>recessive</b> one.",
    "The square|🟦|A <b>Punnett square</b> shows the possible gene pairs of offspring. Put one parent's alleles on top and the other's on the side.",
    "Example|🧮|Bb x Bb gives BB, Bb, Bb and bb. So 1 in 4 is bb (25 percent), and 3 in 4 show the dominant trait."
  ], [
    "What does a Punnett square show?|possible gene pairs of offspring|🟦||the age of parents,how tall a plant is",
    "A capital letter usually shows which allele?|dominant|🔤||recessive,extinct",
    "A different version of a gene is called an...|allele|🔤||organ,enzyme",
    "BB x bb: every offspring has one big letter and one small letter. Which pair is that?|Bb|🟦||BB or bb,none of them",
    "Bb x Bb: chance of bb offspring?|25 percent|🟦||50 percent,75 percent",
    "Bb x Bb: chance the offspring shows the dominant trait?|75 percent|🟦||25 percent,100 percent",
    "Bb x bb: chance of bb offspring?|50 percent|🟦||25 percent,100 percent",
    "BB x Bb: chance of BB offspring?|50 percent|🟦||25 percent,0 percent"
  ], "Fill in the four boxes, then count."));
  b.push(L("Genes and environment", [
    "Two causes|🧬🌱|Some traits come from genes, like eye color. Some come from the environment, like a scar or speaking a language.",
    "Mixed traits|🌻|Many traits depend on both. Your height depends on your genes and on food and health. A plant's size depends on its genes and on light and water.",
    "Nature and nurture|🤝|Scientists call genes <b>nature</b> and the environment <b>nurture</b>."
  ], [
    "Eye color comes mainly from...|genes|👁️||practice,food",
    "Speaking a language is mainly...|learned|🗣️||inherited,in the DNA only",
    "Height depends on genes and on...|food and health|📏||hair length,the weather only on Tuesday",
    "Tall sunflower seeds in poor soil may grow...|shorter than expected|🌻||taller than expected,into roses",
    "A scar is a trait caused by the...|environment|🩹||genes,chromosomes",
    "Scientists call the environment's effect...|nurture|🏡||nature,mutation",
    "Scientists call the effect of genes...|nature|🧬||nurture,training",
    "A plant kept in the dark will be...|pale and weak|🌱||greener and stronger,taller than all others"
  ], "Ask: was it born with it, or did the surroundings change it?"));
  b.push(L("Selective breeding", [
    "Choosing parents|🐄|<b>Selective breeding</b> means people choose parent plants or animals with the traits they want and breed them together.",
    "Over many generations|🌽|Corn was bred from a wild grass called teosinte. Dogs, cows and wheat have been bred for useful traits.",
    "Not natural selection|⚖️|In natural selection nature decides who survives. In selective breeding, <b>people</b> decide."
  ], [
    "Who decides which parents breed in selective breeding?|people|🧑‍🌾||nature,the weather",
    "Corn was bred from a wild grass called...|teosinte|🌽||clover,bamboo",
    "A farmer breeds only cows that give lots of milk. This is...|selective breeding|🐄||natural selection,hibernation",
    "Selective breeding takes...|many generations|⏳||one hour,no time",
    "Dog breeds with different looks came from...|selective breeding|🐕||volcanoes,rainfall",
    "A wheat farmer saves seeds from the strongest plants. This is...|selective breeding|🌾||migration,photosynthesis",
    "In natural selection, who decides who survives?|nature|🌿||farmers,pet owners",
    "A good reason to breed wheat selectively is to get...|bigger harvests|🌾||smaller seeds only,fewer plants"
  ], "People are the ones choosing."));
  b.push(L("Dinosaurs and extinction", [
    "Long ago|🦖|Dinosaurs lived on Earth for over 150 million years. Most died out about <b>66 million years ago</b>.",
    "A big change|☄️|Scientists think a huge asteroid hit Earth and changed the climate. Many plants and animals could not survive.",
    "Dinosaur cousins|🐦|Birds are living descendants of small feathered dinosaurs. We learn about dinosaurs from fossils."
  ], [
    "How do we learn about dinosaurs?|from fossils|🦴||from photographs,from cartoons",
    "About when did most dinosaurs die out?|66 million years ago|☄️||66 years ago,6 thousand years ago",
    "Scientists think a huge what hit Earth?|asteroid|☄️||glacier,tornado",
    "Which living animals are descendants of dinosaurs?|birds|🐦||frogs,mammals",
    "When all of one kind of living thing dies out, it is...|extinct|💀||endangered,migrating",
    "Woolly mammoths lived in the...|Ice Age|🦣||Stone Age lakes only,space age",
    "The Tyrannosaurus rex lived...|long before people|🦖||with the first people,last year",
    "Fossils are the remains of...|ancient living things|🦴||new plastic toys,recent rain"
  ], "Think about fossils and a very long time ago."));
  b.push(L("Darwin's finches", [
    "Galapagos Islands|🏝️|Charles Darwin visited the Galapagos Islands. He saw finches that looked alike but had different beaks.",
    "Beak shapes|🐦|Some had thick strong beaks for cracking seeds. Others had thin beaks for catching insects. Beak shape matches the food.",
    "One ancestor|🌳|The finches came from one ancestor species. Over time they changed to fit different foods. This is called <b>adaptive radiation</b>."
  ], [
    "Where did Darwin study finches?|Galapagos Islands|🏝️||Hawaii,Iceland",
    "A thick strong beak is good for...|cracking seeds|🌰||sipping nectar,catching fish",
    "A thin pointed beak is good for...|catching insects|🐛||cracking big nuts,crushing shells",
    "Beak shape matches the finch's...|food|🐦||song,age",
    "The finches came from how many ancestor species?|one|🐦||fifty,none",
    "Different beaks help finches avoid...|competing for the same food|🥊||flying,building nests",
    "Birds with better beak shapes for the food available survive and have...|more offspring|🐣||less food,bigger wings only",
    "One ancestor species splitting into many is called...|adaptive radiation|🌳||metamorphosis,pollination"
  ], "The beak fits the job."));
  b.push(L("Bacteria", [
    "Tiny cells|🦠|<b>Bacteria</b> are single-celled living things. They have no nucleus. They live almost everywhere.",
    "Helpful bacteria|🥛|Bacteria help make yogurt and cheese, break down dead plants, and live in our guts and help digest food.",
    "Harmful bacteria|🤒|A few bacteria cause illnesses, like strep throat. Antibiotics can treat bacterial infections. Bacteria can double quickly by splitting in two."
  ], [
    "Bacteria are made of how many cells?|one|🦠||millions,none",
    "Bacteria have no...|nucleus|🦠||cell membrane,DNA",
    "Which food is made with the help of bacteria?|yogurt|🥛||apple,rice",
    "Helpful gut bacteria help us...|digest food|🍽️||grow feathers,see in the dark",
    "Bacteria reproduce by...|splitting in two|✂️||laying eggs,making flowers",
    "Which medicine can treat bacterial infections?|antibiotics|💊||sunscreen,vitamins only",
    "Bacteria in soil help to...|break down dead plants|🍂||make rocks,cause rain",
    "Strep throat is caused by...|bacteria|🤒||the cold air,vitamins"
  ], "Bacteria can be helpers or troublemakers."));
  b.push(L("Viruses", [
    "Not cells|🦠|<b>Viruses</b> are much smaller than bacteria. They are not made of cells. A virus must get inside a living cell to make copies of itself.",
    "Illnesses|🤧|Colds, flu and chickenpox are caused by viruses. Antibiotics do <b>not</b> work on viruses.",
    "Vaccines|💉|A vaccine teaches the body to fight a virus before you ever meet it."
  ], [
    "A virus can make copies only inside a...|living cell|🧫||rock,glass",
    "Viruses are made of cells.|false|🦠||true,sometimes",
    "Which illness is caused by a virus?|the flu|🤧||a broken arm,a sunburn",
    "Do antibiotics work against viruses?|no|💊||yes,only on Mondays",
    "What helps your body prepare to fight a virus?|a vaccine|💉||an antibiotic,a bandage",
    "Which is smaller?|a virus|🦠||a bacterium,a human cell",
    "A virus that needs a living cell is called a...|parasite of cells|🧫||producer,decomposer",
    "Chickenpox is caused by a...|virus|🤒||fungus,sunburn"
  ], "A virus needs a host to copy itself."));
  b.push(L("Protists and algae", [
    "Simple living things|🔬|<b>Protists</b> are mostly one-celled living things with a nucleus, like amoebas and paramecia. Most live in water.",
    "Algae|🌊|<b>Algae</b> make food using sunlight. Ocean algae make a large share of the oxygen we breathe. Giant kelp is a very large algae.",
    "Plankton|🐟|Tiny floating algae and animals are called <b>plankton</b>. They are the base of many ocean food chains."
  ], [
    "Amoebas and paramecia are...|protists|🔬||bacteria,plants",
    "Where do most protists live?|in water|💧||on dry rocks,in clouds",
    "Algae make food using...|sunlight|☀️||moonlight,wind",
    "Algae release which gas?|oxygen|🌊||helium,methane",
    "Giant kelp is a very large kind of...|algae|🌿||fish,coral",
    "Tiny floating living things in the sea are called...|plankton|🐟||corals,reefs",
    "Plankton are at the base of many...|ocean food chains|🔗||deserts,mountains",
    "Protist cells have a nucleus, unlike...|bacteria|🦠||algae,plants"
  ], "Think water, sunlight, and tiny cells."));
  b.push(L("From pollen to seed", [
    "Pollination|🐝|<b>Pollen</b> must reach the <b>stigma</b>, the top of the flower's female part. Insects, wind or birds carry it.",
    "Fertilization|🌸|A tube grows from the pollen down to the ovary. A sperm cell from the pollen joins an egg cell in an <b>ovule</b>. This is <b>fertilization</b>.",
    "Seeds and fruit|🍎|The ovule becomes a seed. The ovary around it grows into a <b>fruit</b>."
  ], [
    "Where does pollen need to land?|the stigma|🌸||the petals,the roots",
    "Joining of a pollen cell and an egg cell is...|fertilization|🌸||germination,migration",
    "A fertilized ovule becomes a...|seed|🌰||petal,root",
    "The ovary around the seeds grows into a...|fruit|🍎||leaf,stem",
    "What can carry pollen between flowers?|bees or wind|🐝||only rain on roots,moles",
    "Where do egg cells in a flower wait?|in the ovule|🥚||on the petal,in the root",
    "A growing tube carries the pollen cell down to the...|ovary|🌸||leaf,bud",
    "After fertilization, the flower's petals usually...|wither and fall|🥀||turn into roots,grow bigger"
  ], "Follow the pollen from the top of the flower down."));
  b.push(L("Stomata and transpiration", [
    "Tiny doors|🍃|Leaves have tiny holes called <b>stomata</b>, mostly underneath. Carbon dioxide goes in and oxygen and water vapor go out. Guard cells open and close them.",
    "Water pull|💧|Water evaporates from the leaves. This is called <b>transpiration</b>. It pulls more water up the stem from the roots through tubes called <b>xylem</b>.",
    "Saving water|☀️|On hot dry days, plants close their stomata to save water."
  ], [
    "Tiny holes in leaves are called...|stomata|🍃||roots,veins",
    "Which cells open and close the stomata?|guard cells|🛡️||root cells,seed cells",
    "Water leaving a leaf as vapor is called...|transpiration|💨||germination,pollination",
    "Tubes that carry water up a plant are called...|xylem|🌿||bark,petals",
    "Which gas goes in through stomata for photosynthesis?|carbon dioxide|🍃||nitrogen,helium",
    "On a hot dry day, plants often...|close their stomata|☀️||open all stomata,drop their roots",
    "Transpiration helps pull water up from the...|roots|🌱||flowers,sky",
    "Stomata are mostly found on the...|underside of leaves|🍃||top of roots,inside seeds"
  ], "Leaves have tiny doors for gases and water."));
  b.push(L("Seasons and plants", [
    "Day length|🌤️|Many plants sense how long the day is. This is called <b>photoperiod</b>. It tells them when to bloom or drop leaves.",
    "Autumn leaves|🍂|In autumn, <b>deciduous</b> trees stop making green <b>chlorophyll</b>. The yellow and orange colors that were hidden show through. Then the leaves fall.",
    "Evergreens|🌲|<b>Evergreen</b> trees like pines keep their needles all year."
  ], [
    "The length of daylight that plants sense is called...|photoperiod|🌤️||photosynthesis,pollination",
    "Trees that drop their leaves in autumn are...|deciduous|🍂||evergreen,tropical",
    "Which green pigment fades in autumn?|chlorophyll|🍃||melanin,keratin",
    "Why do leaves look yellow in autumn?|green fades and yellow shows|🍂||the sun paints them,they get dirty",
    "Which tree keeps needles all year?|pine|🌲||maple,oak",
    "Days get shorter in autumn. This signals trees to...|prepare for winter|🍁||bloom,sprout seeds",
    "Why can trees drop leaves in winter?|it saves water and energy|❄️||leaves fall by themselves for fun,roots dig up",
    "Evergreen means the tree...|stays green all year|🌲||turns red,loses leaves in fall"
  ], "Plants notice changes in light and temperature."));
  b.push(L("Heart and blood vessels", [
    "Four chambers|❤️|The heart has four chambers: two <b>atria</b> on top and two <b>ventricles</b> on the bottom. The right side sends blood to the lungs. The left side sends it to the body.",
    "Vessels|🩸|<b>Arteries</b> carry blood away from the heart. <b>Veins</b> carry blood back. Tiny <b>capillaries</b> let oxygen and nutrients pass into cells.",
    "Pulse|⏱️|You can feel your heartbeat as a pulse in your wrist or neck."
  ], [
    "How many chambers does a human heart have?|four|❤️||two,six",
    "Which vessels carry blood away from the heart?|arteries|🩸||veins,capillaries",
    "Which vessels carry blood back to the heart?|veins|🩸||arteries,tendons",
    "The tiniest blood vessels are called...|capillaries|🔬||arteries,veins",
    "The right side of the heart sends blood to the...|lungs|🫁||brain only,toes only",
    "The left side of the heart sends blood to the...|body|🧍||lungs,stomach only",
    "The top chambers of the heart are the...|atria|❤️||ventricles,valves",
    "You can feel your pulse in your...|wrist|✋||hair,teeth"
  ], "Away from the heart is one kind, back to the heart is another."));
  b.push(L("Gas exchange in the lungs", [
    "The path of air|🫁|Air goes through the nose, down the <b>trachea</b>, into the <b>bronchi</b>, and into tiny air sacs called <b>alveoli</b>.",
    "Swapping gases|🔄|In the alveoli, oxygen passes into the blood and carbon dioxide passes out of the blood. We breathe the carbon dioxide out.",
    "Breathing muscle|💨|The <b>diaphragm</b> is a muscle under the lungs. It moves down when you breathe in."
  ], [
    "The windpipe is also called the...|trachea|🫁||esophagus,bronchus of the heart",
    "Tiny air sacs in the lungs are called...|alveoli|🫁||capillaries,arteries",
    "Which gas passes into the blood in the lungs?|oxygen|🫁||carbon dioxide,nitrogen",
    "Which gas leaves the blood in the lungs?|carbon dioxide|🫁||oxygen,helium",
    "The muscle under the lungs that helps breathing is the...|diaphragm|💨||biceps,heart",
    "Red blood cells carry oxygen to the...|body cells|🩸||hair tips only,shoes",
    "Air goes from the trachea into the...|bronchi|🫁||stomach,brain",
    "When you breathe in, the diaphragm moves...|down|⬇️||up,sideways"
  ], "Follow air from nose to air sacs."));
  b.push(L("Kinds of muscles", [
    "Three kinds|💪|<b>Skeletal</b> muscles move your bones and you control them. <b>Smooth</b> muscles work on their own in the stomach and blood vessels. <b>Cardiac</b> muscle is in the heart.",
    "Pairs|🦾|Muscles can only pull, not push. So they work in pairs. When your biceps pull your arm up, the triceps relax. To straighten, the triceps pull.",
    "Tendons|🔗|<b>Tendons</b> join muscles to bones."
  ], [
    "Which muscles do you control on purpose?|skeletal|💪||smooth,cardiac",
    "Which muscle is found only in the heart?|cardiac|❤️||skeletal,smooth",
    "Which muscles work without you thinking, like in the stomach?|smooth|🍽️||skeletal,tendons",
    "Muscles can only...|pull|💪||push,float",
    "What joins muscles to bones?|tendons|🔗||veins,skin",
    "When the biceps pulls the arm up, the triceps...|relaxes|🦾||pulls too,vanishes",
    "Muscles work in...|pairs|🦾||isolation always,circles of three",
    "Moving your leg to kick a ball uses...|skeletal muscle|⚽||cardiac muscle,smooth muscle"
  ], "Which muscle can you control, and which works by itself?"));
  b.push(L("Vitamins and minerals", [
    "Small but vital|🍊|Your body needs small amounts of <b>vitamins</b> and <b>minerals</b> to work well. A varied diet gives you what you need.",
    "Examples|🥛|<b>Calcium</b> (milk) builds strong bones and teeth. <b>Iron</b> helps blood carry oxygen. <b>Vitamin C</b> (oranges) helps you heal. <b>Vitamin A</b> (carrots) helps eyes.",
    "Sunshine vitamin|☀️|Skin makes <b>vitamin D</b> in sunlight. It helps the body use calcium."
  ], [
    "Which mineral builds strong bones and teeth?|calcium|🥛||iron,potassium",
    "Which mineral helps blood carry oxygen?|iron|🩸||calcium,sodium",
    "Oranges are a good source of...|vitamin C|🍊||vitamin D,iron",
    "Carrots are good for the eyes because of...|vitamin A|🥕||vitamin D,calcium",
    "Skin makes which vitamin in sunlight?|vitamin D|☀️||vitamin C,vitamin A",
    "Vitamin D helps the body use...|calcium|🦴||iron,sugar",
    "Bananas contain the mineral...|potassium|🍌||iron only,calcium only",
    "The best way to get vitamins is a...|varied diet|🥗||single food only,candy only"
  ], "Match each nutrient to what it does."));
  b.push(MIX("Mixed practice", [b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8], b[9]]));
  b.push(MIX("Level 11 Challenge", [b[10], b[11], b[12], b[13], b[14], b[15], b[16], b[17], b[3], b[8], b[2]]));

  // ================= LEVEL 12 =================
  const c = [];
  c.push(L("Energy up the food chain", [
    "Losing energy|⚡|Only about <b>10 percent</b> of the energy in one level passes to the next. The rest is used for living or lost as heat.",
    "An example|📉|If plants hold 1000 units of energy, plant-eaters get about 100, small meat-eaters about 10, and top predators about 1.",
    "Short chains|🔗|Because so much energy is lost at each step, food chains rarely have more than 4 or 5 levels."
  ], [
    "About how much energy passes to the next level?|10 percent|⚡||90 percent,50 percent",
    "Plants hold 1000 units of energy. About how many do plant-eaters get?|100|🌿||10,500",
    "Plant-eaters hold 100 units. About how many do their predators get?|10|🦊||1,50",
    "Producers hold 500 units. About how many do primary consumers get?|50|🌿||5,250",
    "Where does most of the lost energy go?|heat and living activities|🔥||into the soil as rocks,to the Moon",
    "Why are food chains short?|energy is lost at each step|🔗||animals dislike long lines,plants are rare",
    "Which level has the most energy?|producers|🌿||top predators,decomposers only",
    "Which level has the least energy?|top predators|🦅||producers,plants"
  ], "Each step keeps only a small part of the energy."));
  c.push(L("Counting populations", [
    "Too big to count|🔢|Scientists cannot count every animal, so they take a <b>sample</b>. A <b>quadrat</b> is a square frame used to count plants in a small area. Then they estimate for the whole area.",
    "Capture and recapture|🐟|Catch and mark some animals, release them, then catch a second group. Use: marked x second catch / marked in second catch.",
    "Example|🧮|Mark 20 fish. Next time catch 10 and 2 are marked. Estimate = 20 x 10 / 2 = 100 fish."
  ], [
    "A square frame used to count plants in a small area is a...|quadrat|🟩||beaker,telescope",
    "Counting a small part to estimate the whole is called...|sampling|📊||guessing blindly,migration",
    "Mark 20 fish. Catch 10 later and 2 are marked. Estimated population?|100|🐟||40,200",
    "Mark 30 fish. Catch 20 later and 5 are marked. Estimated population?|120|🐟||150,600",
    "Mark 40 fish. Catch 10 later and 2 are marked. Estimated population?|200|🐟||80,400",
    "Mark 10 birds. Catch 20 later and 4 are marked. Estimated population?|50|🐦||80,200",
    "Why do scientists take samples?|they cannot count everything|🔍||counting is forbidden,samples are bigger",
    "Marking animals in a study should be done...|gently and safely|🏷️||painfully,with loud noise"
  ], "Marked x second catch, divided by the marked ones you found again."));
  c.push(L("Water cycle and life", [
    "Water moves|💧|The sun heats water. It <b>evaporates</b> into vapor. Vapor cools and <b>condenses</b> into clouds. Water falls as <b>precipitation</b> and collects in oceans, lakes and ground.",
    "Living things join in|🌳|Plants take up water by their roots and release vapor from their leaves. This is <b>transpiration</b>. Animals drink water and give some back.",
    "Underground|🏞️|Some rain soaks into the ground and becomes <b>groundwater</b>, which wells and springs use."
  ], [
    "Liquid water turning into vapor is called...|evaporation|☀️||condensation,precipitation",
    "Vapor cooling into tiny drops is called...|condensation|☁️||evaporation,collection",
    "Rain and snow are called...|precipitation|🌧️||transpiration,runoff only",
    "What drives the water cycle?|the sun|☀️||the Moon,earthquakes",
    "Plants release water vapor from their leaves in...|transpiration|🌳||germination,fertilization",
    "Rain that soaks into the ground becomes...|groundwater|🏞️||clouds,sunlight",
    "Which step forms clouds?|condensation|☁️||evaporation,precipitation",
    "Water in the cycle...|keeps moving and is reused|🔄||is used up for good,only stays in oceans"
  ], "Water goes up, forms clouds, and comes down."));
  c.push(L("Climate and life", [
    "Greenhouse effect|🌍|Gases like carbon dioxide trap some of the sun's heat near Earth. This keeps Earth warm enough for life.",
    "More gas, more heat|🏭|Burning coal, oil and gas adds extra carbon dioxide. Earth is warming. Ice is melting and sea levels are rising.",
    "Life responds|🐻‍❄️🪸|Some animals and plants move to new places. Coral reefs bleach in warm water. People can help with clean energy, saving energy and planting trees."
  ], [
    "Which gas traps heat near Earth?|carbon dioxide|🌍||helium,argon",
    "Burning fossil fuels adds more...|carbon dioxide|🏭||helium,pure water",
    "Warmer oceans can cause coral...|bleaching|🪸||sprouting,blooming",
    "Melting ice can make sea levels...|rise|🧊||drop,freeze",
    "Which action helps reduce extra carbon dioxide?|planting trees|🌳||burning more coal,cutting forests",
    "Clean energy sources include...|wind and solar power|🌬️||coal and oil,wood smoke",
    "As places warm, some animals may...|move to cooler areas|🐻‍❄️||turn into rocks,stop eating",
    "The greenhouse effect in a natural amount keeps Earth...|warm enough for life|🌍||frozen,empty of air"
  ], "Think heat-trapping gases and what adds them."));
  c.push(L("Keystone species", [
    "Small number, big effect|🗝️|A <b>keystone species</b> affects its ecosystem much more than its numbers suggest. If it disappears, the whole community changes.",
    "Examples|🦦|Sea otters eat sea urchins, which keeps kelp forests healthy. Beavers build dams that make ponds. Wolves in Yellowstone help control elk.",
    "Why it matters|🌿|Protecting a keystone species protects many others."
  ], [
    "A species with a large effect on its ecosystem is called a...|keystone species|🗝️||pet species,rare plant",
    "Which animal helps keep kelp forests healthy by eating urchins?|sea otter|🦦||dolphin,shark",
    "Which animal builds dams that make ponds?|beaver|🦫||otter,duck",
    "Wolves returning to Yellowstone helped control...|elk|🐺||trees,rivers by themselves",
    "If a keystone species disappears, the community...|changes a lot|⚠️||stays exactly the same,gets bigger",
    "Why do scientists protect keystone species?|many other species depend on them|🌿||they are the biggest,they are the prettiest",
    "Too many sea urchins can destroy...|kelp forests|🌊||sandy beaches,coral only",
    "A keystone species is important because of its...|effect on others|🗝️||size alone,color"
  ], "A keystone holds an arch together. What holds an ecosystem together?"));
  c.push(L("Pollution and indicator species", [
    "Clues in nature|🔎|An <b>indicator species</b> shows the health of a place. Some are very sensitive to pollution.",
    "Examples|🌿|Lichens need clean air. Mayfly and stonefly young need clean water. Frogs have thin skin that takes in pollutants.",
    "Too many nutrients|🟢|Fertilizer washed into ponds can cause an <b>algae bloom</b>. When the algae die, bacteria use up the oxygen and fish suffer."
  ], [
    "An organism whose health shows the quality of a place is an...|indicator species|🔎||invasive species,imaginary species",
    "Lichens grow well only where the air is...|clean|🌿||polluted,very hot",
    "Mayfly young live only in water that is...|clean|💧||dirty,salty",
    "Why are frogs sensitive to pollution?|their thin skin takes in chemicals|🐸||they are loud,they have fur",
    "Fertilizer washed into ponds can cause an...|algae bloom|🟢||earthquake,eclipse",
    "After algae die, bacteria use up the water's...|oxygen|🐟||salt,sunlight",
    "Which can pollute water?|oil spills|🛢️||clean rain,fresh snow",
    "Plastic in oceans can harm...|sea animals|🐢||only deserts,only mountains"
  ], "Some living things are early warning signs."));
  c.push(L("Natural resources", [
    "Renewable|🌬️|<b>Renewable</b> resources can be replaced in a short time, like wind, sunlight, water and trees (if replanted).",
    "Nonrenewable|🛢️|<b>Nonrenewable</b> resources take millions of years to form. Coal, oil and natural gas are fossil fuels made from ancient plants and tiny sea life.",
    "Using wisely|♻️|We can reduce, reuse and recycle. Fishing and farming can be <b>sustainable</b>, taking only what nature can replace."
  ], [
    "Which resource is renewable?|sunlight|☀️||coal,oil",
    "Which resource is nonrenewable?|oil|🛢️||wind,sunlight",
    "Fossil fuels formed from ancient plants and...|tiny sea life|🌊||volcano dust,glass",
    "Fossil fuels take about how long to form?|millions of years|⏳||one week,ten years",
    "Taking only what nature can replace is called...|sustainable use|♻️||overuse,wasting",
    "The 3 R's are reduce, reuse and...|recycle|♻️||remove,replace by buying",
    "Which energy source is renewable?|wind|🌬️||natural gas,coal",
    "Trees are renewable only if we...|plant new ones|🌱||cut them all,burn them"
  ], "Renewable means it can be replaced soon."));
  c.push(L("Inside the cell: organelles", [
    "Tiny parts, big jobs|🧫|The <b>nucleus</b> holds DNA. <b>Ribosomes</b> build proteins. <b>Mitochondria</b> release energy from food. The <b>Golgi body</b> packages and ships proteins.",
    "Cleaning and storing|🗑️|<b>Lysosomes</b> break down waste. A <b>vacuole</b> stores water and food. Plant cells also have <b>chloroplasts</b> for photosynthesis.",
    "Energy molecule|🔋|Cells use a small energy-carrying molecule called <b>ATP</b>."
  ], [
    "Which organelle holds the cell's DNA?|nucleus|🧬||ribosome,lysosome",
    "Which organelle builds proteins?|ribosome|🧱||mitochondrion,vacuole",
    "Which organelle releases energy from food?|mitochondrion|🔋||Golgi body,nucleus",
    "Which organelle packages and ships proteins?|Golgi body|📦||chloroplast,nucleus",
    "Which organelle breaks down cell waste?|lysosome|🗑️||ribosome,chloroplast",
    "Which organelle stores water and food?|vacuole|🥤||nucleus,mitochondrion",
    "Which organelle is found in plant cells for photosynthesis?|chloroplast|🌿||lysosome,Golgi body",
    "Cells use which molecule to carry energy?|ATP|🔋||DNA,keratin"
  ], "Match each tiny part to its job."));
  c.push(L("Enzymes", [
    "Helpers|🧪|<b>Enzymes</b> are proteins that speed up chemical reactions in living things. They are not used up.",
    "One job each|🔑|Each enzyme fits a certain molecule like a key in a lock. <b>Amylase</b> in saliva breaks down starch. <b>Pepsin</b> breaks down protein in the stomach. <b>Lactase</b> breaks down milk sugar.",
    "Heat and shape|🌡️|Too much heat can change an enzyme's shape so it stops working."
  ], [
    "Enzymes are made of...|protein|🧪||sugar,salt",
    "Enzymes do what to chemical reactions?|speed them up|⏩||stop them forever,change their color",
    "Which enzyme in saliva starts breaking down starch?|amylase|👄||pepsin,lactase",
    "Which enzyme breaks down protein in the stomach?|pepsin|🍖||amylase,lactase",
    "Which enzyme breaks down milk sugar?|lactase|🥛||amylase,pepsin",
    "An enzyme fits its molecule like a...|key in a lock|🔑||hat on a head,sock on a foot",
    "Too much heat can change an enzyme's...|shape|🌡️||color,smell",
    "Are enzymes used up in a reaction?|no|♻️||yes,only in the stomach"
  ], "Enzymes are protein helpers."));
  c.push(L("The DNA code", [
    "The double helix|🧬|DNA looks like a twisted ladder, a <b>double helix</b>. Scientists James Watson and Francis Crick, using data from Rosalind Franklin, described it in 1953.",
    "Four letters|🔤|The rungs are made of four bases: <b>A, T, C, G</b>. A always pairs with T. C always pairs with G.",
    "The code|📖|The order of bases is the code for building a living thing."
  ], [
    "DNA is shaped like a...|twisted ladder|🧬||flat circle,straight stick",
    "The shape of DNA is called a...|double helix|🧬||pyramid,triangle",
    "A base A pairs with...|T|🔤||C,G",
    "A base C pairs with...|G|🔤||A,T",
    "How many different bases are in DNA?|four|🔤||two,twenty",
    "The code for building a living thing is the order of the...|bases|📖||ribs,leaves",
    "Who used data to help show DNA's structure in 1953?|Watson and Crick|🔬||Darwin and Mendel,Pasteur and Jenner",
    "What carries the DNA code in an organism?|the order of bases|📖||the size of the cell,the cell wall"
  ], "A pairs with one letter, C pairs with another."));
  c.push(L("From gene to protein", [
    "Genes are recipes|📖|A <b>gene</b> is a section of DNA that holds the instructions for one protein. Proteins do most of the work in the body.",
    "Copying the recipe|✉️|A copy of the gene, called <b>messenger RNA</b>, travels out of the nucleus to a ribosome.",
    "Building|🧱|The ribosome reads the copy three letters at a time and joins small units called <b>amino acids</b> into a protein."
  ], [
    "A gene holds the instructions for making a...|protein|📖||vitamin,mineral",
    "Where are proteins built?|ribosomes|🧱||nucleus,vacuole",
    "What carries a copy of the gene to the ribosome?|messenger RNA|✉️||ATP,keratin",
    "Proteins are built from small units called...|amino acids|🧱||sugars,minerals",
    "How many DNA letters does a ribosome read at a time?|three|🔠||one,ten",
    "DNA stays in the...|nucleus|🧫||vacuole,ribosome",
    "Which is made from genes' instructions?|enzymes|🧪||rocks,glass",
    "A change in a gene can change the...|protein|🧬||weather,calendar"
  ], "Gene to message to ribosome to protein."));
  c.push(L("Genotype and phenotype", [
    "Genes and looks|🧬|<b>Genotype</b> is the pair of alleles an organism has, like Bb. <b>Phenotype</b> is the trait you can see, like brown eyes.",
    "Same or different|🔤|<b>Homozygous</b> means two matching alleles (BB or bb). <b>Heterozygous</b> means two different alleles (Bb).",
    "Other patterns|🌺|In <b>incomplete dominance</b> traits blend, like red and white snapdragons giving pink. In <b>codominance</b> both show, like blood type AB."
  ], [
    "The pair of alleles an organism has is its...|genotype|🧬||phenotype,habitat",
    "The trait you can see is its...|phenotype|👁️||genotype,allele",
    "Bb is an example of...|heterozygous|🔤||homozygous,recessive only",
    "BB is an example of...|homozygous|🔤||heterozygous,mixed",
    "Red x white snapdragons give pink flowers. This is...|incomplete dominance|🌺||codominance,mutation",
    "Blood type AB shows both A and B. This is...|codominance|🩸||incomplete dominance,recessive",
    "Brown eyes is a...|phenotype|👁️||genotype,gene pair",
    "Alleles bb are...|homozygous|🔤||heterozygous,dominant"
  ], "Genotype is the code. Phenotype is what you see."));
  c.push(L("Genetic engineering", [
    "Changing genes|🧬|<b>Genetic engineering</b> means scientists move or change genes in an organism to give it a new trait.",
    "Uses|💊🌽|Bacteria with a human gene make insulin to treat diabetes. Some crops are changed to resist pests or grow in dry soil.",
    "Careful thinking|⚖️|Scientists test these products for safety. People discuss benefits and risks. A tool called CRISPR can edit genes very precisely."
  ], [
    "Moving or changing genes to give a new trait is...|genetic engineering|🧬||selective breeding,photosynthesis",
    "Bacteria with a human gene can make...|insulin|💊||sunlight,oxygen",
    "Why might a crop be changed to resist pests?|to grow a better harvest|🌽||to stop it growing,to make it fly",
    "A tool that can edit genes precisely is...|CRISPR|✂️||ATP,DNA only",
    "Insulin helps treat...|diabetes|💉||broken bones,a sunburn",
    "Before these products are used, scientists...|test them for safety|🧪||ignore the risks,hide them",
    "A crop with a new gene added is called...|genetically modified|🌽||wild,fossilized",
    "Genetic engineering is different from selective breeding because it...|changes genes directly|🧬||needs many generations only,uses no DNA"
  ], "Think of editing the instructions, not picking parents."));
  c.push(L("Antibiotics and resistance", [
    "Penicillin|🍄|In 1928 Alexander Fleming noticed that mold stopped bacteria from growing. This led to the first antibiotic, <b>penicillin</b>.",
    "What they treat|💊|Antibiotics kill bacteria or stop them growing. They do <b>not</b> work on viruses like colds and flu.",
    "Resistance|🛡️|If antibiotics are misused, the strongest bacteria survive and multiply. This is <b>resistance</b>. Take medicine exactly as the doctor says."
  ], [
    "Who noticed that mold stopped bacteria in 1928?|Alexander Fleming|🍄||Louis Pasteur,Gregor Mendel",
    "Penicillin comes from a kind of...|mold|🍄||rock,seaweed",
    "Antibiotics work against...|bacteria|🦠||viruses,sunlight",
    "Do antibiotics work for the flu?|no|🤧||yes,only for the flu",
    "When bacteria survive a medicine, they are said to have...|resistance|🛡️||allergy,gravity",
    "Why does misuse of antibiotics matter?|it helps resistant bacteria survive|⚠️||it makes medicine tastier,it changes eye color",
    "You should take antibiotics...|exactly as the doctor says|⏰||only when you feel like it,with no plan",
    "Resistant bacteria are a kind of...|natural selection at work|🧬||magic,photosynthesis"
  ], "Antibiotics are for bacteria only."));
  c.push(L("Parts of blood", [
    "A river of cells|🩸|Blood has four main parts. <b>Red blood cells</b> carry oxygen. <b>White blood cells</b> fight germs. <b>Platelets</b> help blood clot. <b>Plasma</b> is the liquid, mostly water.",
    "Blood types|🅰️|People have blood type A, B, AB or O. Doctors match types for blood donations.",
    "Healing|🩹|When you get a cut, platelets clump together to form a clot and stop the bleeding."
  ], [
    "Which blood cells carry oxygen?|red blood cells|🩸||white blood cells,platelets",
    "Which blood cells fight germs?|white blood cells|🛡️||red blood cells,plasma",
    "Which blood part helps blood clot?|platelets|🩹||plasma,red blood cells",
    "The liquid part of blood is called...|plasma|💧||platelets,hemoglobin",
    "Plasma is mostly...|water|💧||sugar,iron",
    "Which is a blood type?|AB|🅰️||XY,CC",
    "After a cut, which parts clump together to stop bleeding?|platelets|🩹||white blood cells,veins",
    "Doctors match blood types for...|blood donations|🏥||haircuts,weather forecasts"
  ], "Match each blood part with its job."));
  c.push(L("Neurons and reflexes", [
    "Messenger cells|⚡|<b>Neurons</b> are nerve cells. <b>Dendrites</b> receive signals, the <b>cell body</b> processes them and the <b>axon</b> sends them on as tiny electrical signals.",
    "Gaps|🔗|Between neurons is a small gap called a <b>synapse</b>. Chemicals carry the message across.",
    "Reflexes|✋🔥|A <b>reflex</b> is a very fast automatic reaction, like pulling your hand from something hot. The signal goes through the spinal cord without waiting for the brain."
  ], [
    "A nerve cell is called a...|neuron|⚡||nephron,platelet",
    "Which part of a neuron receives signals?|dendrites|🌳||axon,nucleus",
    "Which part of a neuron sends signals on?|axon|➡️||dendrites,synapse",
    "The gap between two neurons is called a...|synapse|🔗||vein,ridge",
    "A fast automatic reaction is a...|reflex|⚡||habit,memory",
    "A reflex signal travels through the...|spinal cord|🦴||stomach,heart",
    "Pulling your hand away from a hot pan is an example of...|a reflex|🔥||a plan,a dream",
    "Neurons carry signals as tiny...|electrical signals|⚡||drops of blood,sounds"
  ], "Think of fast messages along nerves."));
  c.push(L("Infectious diseases", [
    "Two kinds|🦠|<b>Infectious</b> diseases are caused by pathogens: bacteria, viruses, fungi or parasites. They can spread. <b>Non-infectious</b> diseases, like asthma or diabetes, do not spread from person to person.",
    "How they spread|🤧|Through the air, touch, contaminated food or water, or animal bites. Mosquitoes can carry malaria between people.",
    "Prevention|🧼|Handwashing, clean water, vaccines and staying home when sick all help."
  ], [
    "A germ that causes disease is called a...|pathogen|🦠||producer,predator",
    "Which disease is infectious?|flu|🤧||asthma,a broken leg",
    "Which is NOT infectious?|asthma|🫁||chickenpox,strep throat",
    "Mosquitoes can carry the disease called...|malaria|🦟||asthma,diabetes",
    "Which can pass a disease through the air?|a sneeze|🤧||a smile,a shadow",
    "Which helps prevent infectious disease?|vaccines|💉||dirty water,sharing cups",
    "A disease that cannot spread between people is...|non-infectious|🩺||infectious,contagious",
    "Safe drinking water helps prevent...|disease|💧||sunshine,music"
  ], "Ask: can it spread from one person to another?"));
  c.push(L("Fair tests in biology", [
    "Variables|🧪|In a fair test you change only one thing. That is the <b>independent variable</b>. What you measure is the <b>dependent variable</b>. All else stays the same: the <b>controlled variables</b>.",
    "Controls|🪴|A <b>control group</b> is not given the change, so you can compare. Repeat trials to be sure of results.",
    "Example|🌱|To test if light affects bean growth, change the light and measure the height. Keep water and soil the same."
  ], [
    "The one thing you change in a fair test is the...|independent variable|🧪||dependent variable,control group",
    "What you measure is the...|dependent variable|📏||independent variable,hypothesis",
    "Things you keep the same are the...|controlled variables|⚖️||results,errors",
    "A group that gets no change, for comparison, is the...|control group|🪴||variable group,test tube",
    "Testing light on plants: what do you change?|the amount of light|💡||the soil,the plant kind",
    "Testing light on plants: what do you measure?|plant height|📏||amount of light,pot size",
    "Why repeat trials?|to be sure of the results|🔁||to waste time,to change the question",
    "A testable prediction is called a...|hypothesis|🧪||conclusion,control"
  ], "Change one thing, measure one thing, keep the rest the same."));
  c.push(MIX("Mixed practice", [c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9]]));
  c.push(MIX("Level 12 Challenge", [c[10], c[11], c[12], c[13], c[14], c[15], c[16], c[17], c[3], c[9], c[7]]));

  Object.assign(LIFE_LEVELS, { 10: a, 11: b, 12: c });
})();
