// ext/animals-10-12.js  Animals & Nature levels 10-12
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
  const MIX = (title, ls) => {
    const make = () => pick(ls).make();
    make.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes ideas you already know. Here is a quick reminder, then the quiz." }, ...ls.slice(0, 4).map(l => l.make.teach()[0])];
    return { title, make };
  };

  // ================= LEVEL 10 =================
  const a = [];
  a.push(L("Animal cells", [
    "Tiny building blocks|🔬|Every animal is built from <b>cells</b>. Most cells are too small to see without a microscope.",
    "Parts of a cell|🧫|The <b>nucleus</b> is the control center and holds the DNA. The <b>cell membrane</b> is the soft outer skin. <b>Mitochondria</b> release energy from food. <b>Cytoplasm</b> is the jelly inside.",
    "Plant cells are different|🌿|Plant cells also have a stiff <b>cell wall</b> and green <b>chloroplasts</b> that make food from sunlight. Animal cells have neither."
  ], [
    "Which part of a cell holds the DNA?|nucleus|🧫||mitochondria,cytoplasm",
    "Which part releases energy from food?|mitochondria|⚡||nucleus,cell wall",
    "The soft outer skin of an animal cell is the...|cell membrane|🧫||cell wall,nucleus",
    "Which part is found in plant cells but NOT animal cells?|cell wall|🌿||nucleus,cell membrane",
    "Chloroplasts make food from sunlight. They are found in...|plant cells|🌱||animal cells,muscle cells",
    "The jelly-like fluid that fills a cell is the...|cytoplasm|🧫||nucleus,membrane",
    "Which tool lets us see cells?|microscope|🔬||telescope,thermometer",
    "Cells are the basic building blocks of...|all living things|🧬||only animals,only plants"
  ], "Think about the job each part of a cell does.", "Control center, energy maker, outer skin, jelly."));
  a.push(L("The brain and nerves", [
    "The control center|🧠|The <b>brain</b> controls the body. It gets messages from the eyes, ears, nose and skin and decides what to do.",
    "Nerves|⚡|<b>Nerves</b> are like wires that carry tiny electrical signals. The nerve cells are called <b>neurons</b>. The <b>spinal cord</b> runs inside the backbone and links the brain to the body.",
    "Reflexes|✋|A <b>reflex</b> is a very fast automatic reaction, like pulling your hand from something hot. It happens before you even think!"
  ], [
    "Which organ is the control center of the body?|brain|🧠||heart,stomach",
    "Nerve cells are called...|neurons|⚡||nucleus cells,platelets",
    "The brain is protected by the...|skull|💀||ribs,backbone",
    "The spinal cord runs inside the...|backbone|🦴||skull,ribs",
    "A fast automatic reaction is called a...|reflex|✋||dream,habit",
    "Nerves carry messages as tiny electrical...|signals|⚡||bubbles,sounds",
    "Which animal has no brain but a net of nerves?|jellyfish|🪼||octopus,dog",
    "Which animal has a very large brain and is great at solving puzzles?|octopus|🐙||sea star,sponge"
  ], "Think about which part sends, carries or protects messages.", "Brain decides, nerves carry, bones protect."));
  a.push(L("Breathing systems", [
    "Lungs|🫁|Mammals, birds and reptiles breathe air with <b>lungs</b>. A whale or dolphin breathes through a <b>blowhole</b> on top of its head.",
    "Gills|🐟|Fish take oxygen from the water with <b>gills</b>. Tadpoles use gills too.",
    "Other ways|🐛|Insects have tiny holes called <b>spiracles</b> that lead to air tubes. An earthworm and an adult frog can breathe through their moist <b>skin</b>."
  ], [
    "Fish take oxygen from water using their...|gills|🐟||lungs,fins",
    "Insects breathe through tiny holes called...|spiracles|🐜||gills,blowholes",
    "An earthworm breathes mostly through its...|skin|🪱||lungs,gills",
    "A dolphin breathes air through its...|blowhole|🐬||gills,spiracles",
    "A tadpole breathes with...|gills|🐸||lungs,spiracles",
    "A snake breathes with...|lungs|🐍||gills,spiracles",
    "Air tubes inside an insect are called...|tracheae|🦗||arteries,gills",
    "Which of these breathes with gills?|trout|🐟||cat,pigeon"
  ], "Think about whether the animal lives in water or on land.", "Gills for water, lungs for air, spiracles for insects."));
  a.push(L("Getting rid of waste", [
    "Why remove waste?|♻️|Bodies make waste that can harm them if it builds up. So animals must get rid of it.",
    "Organs that clean|🫘|The <b>kidneys</b> filter waste out of the blood and make urine. The <b>lungs</b> breathe out carbon dioxide. Skin gives off sweat.",
    "Clever waste|🐦|Birds save water by making a whitish paste called <b>uric acid</b>. Many fish let ammonia waste flow out through their gills."
  ], [
    "Which organs filter waste from the blood?|kidneys|🫘||lungs,stomach",
    "Which gas do animals breathe out?|carbon dioxide|💨||oxygen,helium",
    "Liquid waste made by the kidneys is called...|urine|💧||blood,saliva",
    "Birds save water by making a whitish waste called...|uric acid|🐦||milk,sweat",
    "Most fish get rid of ammonia through their...|gills|🐟||wings,lungs",
    "Waste can be harmful to the body if it...|builds up|⚠️||is removed,is filtered",
    "Plants use the carbon dioxide we breathe out to make...|food|🌱||wool,milk",
    "Sweat leaves the body through the...|skin|💦||kidneys,bones"
  ], "Think about which body part cleans or removes what.", "Kidneys clean blood; lungs breathe out gas."));
  a.push(L("DNA and genes", [
    "The instruction book|🧬|<b>DNA</b> is a code of instructions inside almost every cell. It is shaped like a twisted ladder called a <b>double helix</b>.",
    "Genes|📖|A <b>gene</b> is a short piece of DNA with one instruction, such as fur color. DNA sits inside the cell's nucleus.",
    "Passing it on|👪|Young animals get DNA from their parents, so they look like them. Close relatives have very similar DNA."
  ], [
    "DNA is shaped like a twisted ladder called a...|double helix|🧬||spiral shell,zigzag",
    "A short piece of DNA with one instruction is a...|gene|📖||cell,muscle",
    "DNA is found mostly in the cell's...|nucleus|🧫||cell wall,cytoplasm",
    "Kittens get DNA from...|both parents|🐱||only the father,the vet",
    "Identical twins have almost exactly the same...|DNA|👯||height,age",
    "Closely related animals have DNA that is more...|similar|🐺||different,missing",
    "Traits are passed from parents to young by...|genes|👪||vitamins,habits",
    "DNA is a code of...|instructions|📖||sounds,water"
  ], "Think of DNA as an instruction book inside the cell.", "Genes are pieces of the instructions."));
  a.push(L("The peppered moth", [
    "Two kinds of moth|🦋|The peppered moth can be pale with dark speckles or almost black. Long ago, most were pale and hid well on light tree bark.",
    "Soot changed things|🏭|In the 1800s, factory soot turned tree bark dark in some English towns. Pale moths now stood out and birds ate more of them. Dark moths survived and had more young.",
    "Clean air|🌳|When the air got cleaner and the trees got lighter, pale moths became common again. This is <b>natural selection</b> in action."
  ], [
    "Before the soot, most peppered moths were...|pale|🦋||black,red",
    "Why did dark moths become common in sooty towns?|birds could not see them well|🐦||they were bigger,they ate soot",
    "Who ate the moths that stood out?|birds|🐦||bats,cats",
    "The soot turned the tree bark...|dark|🌳||pink,white",
    "When the air got cleaner, which moths became common again?|pale ones|🌿||striped ones,blue ones",
    "Moths that survive and have young pass on their...|genes|🧬||colors only,houses",
    "This example shows...|natural selection|🔬||migration,hibernation",
    "Being hard to see helps a moth...|avoid predators|🕵️||fly faster,find soot"
  ], "Think about which color matched the bark.", "Animals that blend in survive and have more young."));
  a.push(L("Territories", [
    "My space|🗺️|A <b>territory</b> is an area an animal defends from others of its kind. It protects food, shelter and a place to raise young.",
    "Marking it|🐾|Animals mark territory with <b>scent</b>, droppings, scratches, songs or calls. Wolves howl, and many birds sing to say \"this space is taken\".",
    "Home range|🧭|The whole area an animal moves around in is its <b>home range</b>. Animals defend only part of it. Most rivals use warnings and displays before they fight."
  ], [
    "An area an animal defends is its...|territory|🗺️||migration,herd",
    "Cats mark their space by leaving their...|scent|🐱||toys,shadows",
    "Many songbirds sing to tell rivals to stay out of their...|territory|🐦||eggs,migration",
    "The whole area an animal travels in is its...|home range|🧭||hibernation,pack",
    "A territory protects food and a place to...|raise young|🪺||buy things,watch TV",
    "Most rivals first try warnings and...|displays|⚠️||presents,hibernation",
    "Wolves use howls and scent to protect their...|territory|🐺||homework,seasons",
    "A bird that sings loudly from a high branch may be...|claiming its territory|🎵||asking for food,saying goodbye"
  ], "Think about why an animal would want to keep others away.", "Defended area versus the area it travels."));
  a.push(L("Parental care", [
    "Lots of care|🦢|Birds and mammals usually take care of their young. Mammals feed their babies milk. Birds sit on eggs to keep them warm, called <b>incubating</b>.",
    "Dads too|🐧|A male emperor penguin balances one egg on his feet for about two months. A male seahorse carries the eggs in a pouch until they hatch.",
    "No care at all|🐢|Sea turtles bury their eggs in sand and swim away. Baby turtles must look after themselves. Animals that lay many eggs often give little care."
  ], [
    "Sitting on eggs to keep them warm is called...|incubating|🥚||hibernating,migrating",
    "A male seahorse carries eggs in a...|pouch|🐴||nest,burrow",
    "A male emperor penguin keeps his egg warm on his...|feet|🐧||back,flippers",
    "Mammal mothers feed their babies...|milk|🍼||seeds,insects",
    "Sea turtles bury their eggs and then...|leave|🐢||guard them,carry them",
    "Animals that lay thousands of eggs often give...|little care|🥚||lots of care,milk",
    "Which animal gives lots of care to its young?|elephant|🐘||sea turtle,codfish",
    "Which parent carries the eggs in a seahorse family?|the father|🐴||the mother,the cousins"
  ], "Think about which animals stay with their babies.", "Few babies means more care; thousands of eggs means little."));
  a.push(L("Whales and dolphins", [
    "Sea mammals|🐋|Whales and dolphins are <b>mammals</b>. They breathe air, have warm blood and feed their calves milk.",
    "Two kinds|🐬|<b>Baleen whales</b> (blue, humpback) have plates that filter tiny krill from the water. <b>Toothed whales</b> (dolphins, orcas, sperm whales) hunt fish and squid, and use echolocation.",
    "Record holder|🐳|The <b>blue whale</b> is the largest animal that has ever lived. An orca is really the largest kind of dolphin."
  ], [
    "Whales and dolphins are...|mammals|🐋||fish,reptiles",
    "A blue whale eats mostly tiny...|krill|🦐||sharks,seals",
    "Whales that filter food with plates are called...|baleen whales|🐋||toothed whales,sea cows",
    "Which one is a toothed whale?|orca|🐬||blue whale,humpback",
    "The largest animal ever to live is the...|blue whale|🐳||elephant,great white shark",
    "An orca is really the largest kind of...|dolphin|🐬||shark,seal",
    "Dolphins find food using...|echolocation|🔊||x-rays,magnets",
    "A baby whale is called a...|calf|🐋||pup,kit"
  ], "Think about baleen plates versus teeth.", "Baleen filters, teeth hunt."));
  a.push(L("Sharks and rays", [
    "Not bone|🦈|Sharks and rays are fish with skeletons made of <b>cartilage</b>, the bendy stuff in your nose and ears, not hard bone.",
    "Shark facts|🦷|Sharks have gill slits on the sides and keep growing new teeth all their life. The whale shark is the biggest fish, but it only eats tiny plankton.",
    "Rays|🪽|Rays are flat relatives of sharks that glide along using wing-like fins. Sharks and rays can sense the tiny electric signals made by other animals."
  ], [
    "A shark's skeleton is made of...|cartilage|🦈||bone,shell",
    "The biggest fish in the world is the...|whale shark|🦈||great white,swordfish",
    "A whale shark eats mostly...|plankton|🦐||seals,turtles",
    "Sharks are always growing new...|teeth|🦷||fins,scales",
    "Rays are flat relatives of...|sharks|🪽||whales,eels",
    "Sharks have slits on the sides called...|gill slits|🦈||ears,nostrils",
    "Cartilage is bendier than...|bone|🦴||rubber,cloth",
    "Sharks and rays can sense tiny...|electric signals|⚡||songs,smells only"
  ], "Think about the skeleton and the body shape.", "Bendy skeleton, flat or streamlined."));
  a.push(L("Bats", [
    "Flying mammals|🦇|Bats are the only mammals that truly fly. Their wings are thin skin stretched over very long finger bones.",
    "Night hunters|🌙|Most bats are active at night and use <b>echolocation</b>: they squeak and listen to the echoes to find insects. Bats are not blind!",
    "Helpful bats|🦟|One small bat can eat hundreds of insects in a night. Fruit bats spread seeds and pollinate flowers. Bats rest by hanging upside down."
  ], [
    "The only mammals that truly fly are...|bats|🦇||flying squirrels,sugar gliders",
    "A bat's wing is skin stretched over long...|finger bones|🦴||feathers,twigs",
    "Bats find insects in the dark using...|echolocation|🔊||x-ray eyes,whiskers only",
    "Most bats are active at...|night|🌙||noon,morning",
    "Bats hang upside down while they...|rest|😴||swim,run",
    "Fruit bats help plants by spreading...|seeds|🍌||rain,soil",
    "Bats are...|mammals|🦇||birds,insects",
    "Many bats help people by eating...|insects|🦟||leaves,coins"
  ], "Think about what a bat is and what it does at night.", "Mammal, wings of skin, uses sound."));
  a.push(L("Big cats", [
    "The roaring cats|🦁|Lions, tigers, leopards and jaguars are the big cats that can <b>roar</b>. Smaller wild cats, like cheetahs and cougars, purr instead.",
    "Different lives|🐅|Lions live in groups called <b>prides</b>. Most other big cats hunt alone. The tiger is the largest cat. The cheetah is the fastest land animal.",
    "High up|🐆|Snow leopards live on cold mountains in Asia. Jaguars live in the Americas. Most cats can pull their claws in, but a cheetah cannot fully."
  ], [
    "A group of lions is called a...|pride|🦁||pack,herd",
    "The largest of all cats is the...|tiger|🐅||lion,jaguar",
    "The fastest land animal is the...|cheetah|🐆||lion,leopard",
    "Snow leopards live in cold...|mountains|🏔️||deserts,swamps",
    "Which big cat lives in the Americas?|jaguar|🐆||tiger,lion",
    "Which of these cannot roar but purrs?|cheetah|🐆||lion,tiger",
    "Most big cats hunt...|alone|🐅||in huge herds,only in water",
    "Lions mostly live in Africa on the...|savanna|🌾||tundra,reef"
  ], "Think about which cat lives where and how it lives.", "Prides are for lions; most others are loners."));
  a.push(L("Bears", [
    "Bear basics|🐻|Bears are big mammals with strong claws and an amazing sense of smell. Most bears are <b>omnivores</b> and eat berries, roots, fish and insects.",
    "Special bears|🐼|The polar bear eats mostly seals. The giant panda eats mostly bamboo. Brown bears (grizzlies) catch salmon in rivers.",
    "Winter sleep|💤|Many bears sleep deeply through winter in a den. Their heart slows down, but they can wake up. Cubs are born in the den."
  ], [
    "Most bears are...|omnivores|🐻||herbivores only,decomposers",
    "A giant panda eats mostly...|bamboo|🐼||seals,salmon",
    "Polar bears eat mostly...|seals|🐻‍❄️||bamboo,berries",
    "Bears have a very strong sense of...|smell|👃||color,hearing only",
    "Grizzly bears are a kind of...|brown bear|🐻||polar bear,panda",
    "Many bears spend winter sleeping in a...|den|🕳️||tree top,river",
    "A baby bear is called a...|cub|🐻||kit,calf",
    "Brown bears catch which fish in rivers?|salmon|🐟||sharks,tuna"
  ], "Think about what each bear eats and where it lives.", "Mostly omnivores; polar bear and panda are special."));
  a.push(L("Penguins", [
    "Birds that swim|🐧|Penguins are birds that cannot fly. Their wings became strong <b>flippers</b> for swimming, and their feathers are thick and waterproof.",
    "Where they live|🧊|Almost all penguins live in the Southern Hemisphere. Emperor penguins, the largest kind, live in Antarctica. The Galápagos penguin lives near the equator!",
    "Staying warm|🤝|Emperor penguins huddle together in a big group to share warmth in the cold winter wind."
  ], [
    "Penguins are...|birds|🐧||fish,mammals",
    "Penguins use their flippers to...|swim|🌊||fly,dig",
    "The largest penguin is the...|emperor penguin|🐧||Adelie penguin,little penguin",
    "Emperor penguins stay warm by...|huddling together|🤝||sleeping alone,flying south",
    "Most penguins live in the...|Southern Hemisphere|🌍||Northern Hemisphere,rainforest",
    "Which penguin lives near the equator?|Galápagos penguin|🏝️||emperor penguin,king penguin",
    "A penguin's feathers are thick and...|waterproof|💧||see-through,hollow",
    "Which continent do emperor penguins call home?|Antarctica|🧊||Africa,Europe"
  ], "Think about penguin wings and where penguins live.", "They swim instead of fly, and they live in the south."));
  a.push(L("Owls and birds of prey", [
    "Raptors|🦅|Birds of prey, or <b>raptors</b>, hunt other animals. They have hooked beaks, strong feet with sharp <b>talons</b>, and sharp eyes. Eagles, hawks, falcons and owls are raptors.",
    "Owls|🦉|Owls hunt mostly at night. Soft feathers help them fly almost silently. They cannot move their eyes, so they turn their heads, up to about 270 degrees!",
    "Pellets and speed|⚡|Owls cough up <b>pellets</b> of fur and bones they could not digest. The peregrine falcon is the fastest animal, diving at over 300 kilometers per hour."
  ], [
    "Birds that hunt other animals are called birds of...|prey|🦅||song,paradise",
    "Raptors grab food with sharp...|talons|🦅||flippers,gills",
    "Owls fly almost silently because of their...|soft feathers|🦉||tiny wings,loud calls",
    "An owl turns its head because its eyes cannot...|move|🦉||see,blink",
    "Undigested fur and bones coughed up by owls are called...|pellets|🦉||eggs,seeds",
    "The fastest diving animal is the peregrine...|falcon|🦅||penguin,swan",
    "Most owls hunt at...|night|🌙||noon,sunrise",
    "Which one is NOT a bird of prey?|duck|🦆||eagle,hawk"
  ], "Think about hunters with hooked beaks and talons.", "Talons grab, soft feathers silence."));
  a.push(L("Snakes", [
    "No legs|🐍|Snakes are reptiles with long bodies covered in dry scales and no legs. They have no eyelids, so they always look wide awake.",
    "Smelling with a tongue|👅|A snake flicks its forked tongue to pick up smells. Its jaws stretch so it can swallow food whole, because it cannot chew.",
    "Different hunters|🐍|Constrictors, like boas, squeeze their prey. Venomous snakes, like cobras, use hollow fangs. Snakes <b>shed</b> their skin as they grow."
  ], [
    "Snakes are...|reptiles|🐍||amphibians,mammals",
    "A snake smells by flicking its...|tongue|👅||tail,scales",
    "A snake swallows its food...|whole|🐁||in tiny bites,after cooking",
    "A snake grows by shedding its...|skin|🐍||bones,eyes",
    "A snake's body is covered with...|scales|🐍||fur,feathers",
    "Snakes that squeeze their prey are called...|constrictors|🐍||sprinters,climbers",
    "Snakes have no...|eyelids|👁️||tongues,lungs",
    "A snake is cold-blooded, so it warms up by...|basking in the sun|☀️||shivering,eating ice"
  ], "Think about snake bodies and how they eat.", "Scales, no legs, swallowing whole."));
  a.push(L("Turtles and tortoises", [
    "The shell|🐢|A turtle's shell is part of its skeleton. The ribs and backbone are joined to it, so a turtle can never leave its shell.",
    "Turtle or tortoise?|🐢|Tortoises live on land and have heavy, high, domed shells and stumpy legs. Sea turtles have flat shells and flippers. All of them lay eggs.",
    "Long lives|🏝️|Female sea turtles come to sandy beaches to lay eggs, and the sand's warmth helps decide whether the babies are boys or girls. Giant tortoises can live over 100 years."
  ], [
    "A turtle's shell is part of its...|skeleton|🐢||fur,hair",
    "Tortoises live on...|land|🏜️||the deep sea,ice floes",
    "Sea turtles have flat shells and...|flippers|🐢||wings,hooves",
    "Turtles and tortoises are...|reptiles|🐢||mammals,fish",
    "Sea turtle mothers lay their eggs on...|beaches|🏖️||trees,reefs",
    "Giant tortoises can live over...|100 years|🕰️||10 years,2 years",
    "A heavy, high, domed shell suits a...|tortoise|🐢||sea turtle,leatherback",
    "Baby turtles hatch from...|eggs|🥚||pouches,cocoons"
  ], "Think about the shell and where each animal lives.", "Shell is part of the skeleton."));
  a.push(L("Elephants", [
    "Giant of the land|🐘|The elephant is the largest land animal. Its long <b>trunk</b> is a nose and a hand in one: it smells, breathes, drinks and grabs food.",
    "African and Asian|🌍|African elephants are bigger and have big ears shaped like Africa. Asian elephants are smaller with smaller ears. Their <b>tusks</b> are really long front teeth.",
    "Family life|👪|Elephants live in herds led by the oldest female, the <b>matriarch</b>. A mother elephant is pregnant for about 22 months, longer than any other land animal."
  ], [
    "The largest land animal is the...|elephant|🐘||rhinoceros,giraffe",
    "An elephant's trunk is a nose and a...|hand|🐘||tail,wing",
    "An elephant's tusks are really long...|teeth|🦷||horns,bones",
    "A herd of elephants is led by the oldest...|female|🐘||male,baby",
    "Which elephants have bigger ears?|African elephants|🐘||Asian elephants,both the same",
    "The lead female of a herd is the...|matriarch|👑||calf,tusker",
    "An elephant mother is pregnant for about...|22 months|🐘||9 weeks,3 months",
    "Elephants eat only...|plants|🌿||meat,fish"
  ], "Think about what the trunk and herd leader do.", "Trunk, teeth, oldest female."));
  a.push(MIX("Mixed practice", [a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15], a[16], a[17]]));
  a.push(MIX("Level 10 Challenge", [a[0], a[2], a[4], a[5], a[7], a[8], a[9], a[10], a[11], a[13], a[14], a[15], a[16], a[17], a[1], a[3]]));

  // ================= LEVEL 11 =================
  const b = [];
  b.push(L("Ecological succession", [
    "Nature rebuilds|🌱|<b>Succession</b> is the slow, steady change in the plants and animals of a place over time. It starts when bare rock or soil is first colonized.",
    "Step by step|🪨|First come <b>pioneer species</b> like lichens and moss. They help make soil. Then grasses, shrubs and finally trees grow, and different animals move in.",
    "After a disturbance|🌲|After a fire or flood, soil is still there, so plants return faster. This is called <b>secondary succession</b>. Starting on bare rock is <b>primary succession</b>."
  ], [
    "Slow change in a community over time is called...|succession|🌱||migration,hibernation",
    "The first living things on bare rock are called...|pioneer species|🪨||predators,decomposers",
    "Lichens and moss help make...|soil|🪨||salt,sand castles",
    "After grasses and shrubs, which usually grow next?|trees|🌳||seaweed,coral",
    "Succession that starts on bare rock is...|primary succession|🪨||secondary succession,fast succession",
    "Succession after a fire in a place with soil is...|secondary succession|🔥||primary succession,no succession",
    "Which grows first on a bare rock?|lichen|🪨||oak tree,maple tree",
    "As plants change, the _____ in the area change too.|animals|🦌||rocks only,seasons"
  ], "Think about what must happen first before big plants can grow.", "Pioneers, then grasses, shrubs, trees."));
  b.push(L("Fire and wildlife", [
    "Fire in nature|🔥|Wildfires started by lightning are a natural part of some forests and grasslands. People also cause fires, which can be dangerous.",
    "Fire helps|🌲|Some plants need fire. Certain pine cones only open in the heat and release their seeds. Fire clears old growth, and ash adds nutrients to the soil.",
    "Animals and fire|🦌|Many animals run, fly or hide underground when fire comes. Afterwards new green shoots feed grazers, and some woodpeckers feed on insects in burned trees."
  ], [
    "Which natural event can start a wildfire?|lightning|⚡||rain,snow",
    "Some pine cones only open their seeds in...|heat|🔥||ice,darkness",
    "Ash adds _____ to the soil.|nutrients|🌱||plastic,salt water",
    "Many small animals escape fire by going...|underground|🕳️||up into trees,into streams only",
    "After a fire, new green shoots feed...|grazing animals|🦌||sharks,penguins",
    "Some woodpeckers eat insects living in...|burned trees|🪵||open ponds,sand dunes",
    "Fire can clear _____ and make room for new growth.|old growth|🌲||all the rocks,the sky",
    "Wildfires that people start can be very...|dangerous|⚠️||helpful always,tasty"
  ], "Think about what fire does to plants and soil.", "Heat opens cones; ash feeds soil."));
  b.push(L("Tundra and taiga", [
    "Tundra|❄️|The <b>tundra</b> is cold, windy and treeless. Under the surface is frozen ground called <b>permafrost</b>. Caribou, arctic foxes, snowy owls and lemmings live there.",
    "Taiga|🌲|The <b>taiga</b> is a huge forest of cone-bearing trees (conifers) south of the tundra. Moose, lynx, wolves and brown bears live there.",
    "Short summers|☀️|Both have long, harsh winters and short summers. Many birds fly in for the summer, when insects and plants are plentiful."
  ], [
    "The cold treeless biome with frozen ground is the...|tundra|❄️||taiga,savanna",
    "Frozen ground under the tundra is called...|permafrost|🧊||bedrock,quicksand",
    "A huge forest of conifers is the...|taiga|🌲||tundra,desert",
    "Which animal lives in the tundra?|caribou|🦌||giraffe,monkey",
    "Which animal lives in the taiga?|moose|🫎||camel,zebra",
    "Tundra animals eat tiny rodents called...|lemmings|🐹||pandas,bats",
    "Taiga trees such as pines and spruces are...|conifers|🌲||palms,cacti",
    "Many birds visit the tundra only in...|summer|☀️||winter,fall"
  ], "Think about trees: tundra has almost none.", "Treeless and frozen versus conifer forest."));
  b.push(L("Temperate forest", [
    "Four seasons|🍂|Temperate forests have warm summers and cold winters. Many trees are <b>deciduous</b>: they drop their leaves in fall.",
    "Forest floor|🍄|Fallen leaves make a layer of litter. Fungi, worms and insects break it down into soil, and that feeds the trees.",
    "Animals|🦌|White-tailed deer, squirrels, black bears, owls and woodpeckers live here. Some store food, some hibernate and some migrate for winter."
  ], [
    "Trees that drop their leaves in fall are...|deciduous|🍂||evergreen,tropical",
    "A temperate forest has how many seasons?|four|🍁||one,two",
    "Fungi, worms and insects break down fallen leaves into...|soil|🍂||sand,salt",
    "Which animal lives in a temperate forest?|white-tailed deer|🦌||camel,penguin",
    "Squirrels get ready for winter by storing...|nuts|🐿️||ice,moss",
    "Trees that stay green all year are...|evergreen|🌲||deciduous,bare",
    "The layer of fallen leaves is called leaf...|litter|🍂||tower,magic",
    "Why do deciduous trees drop leaves in winter?|to save energy|❄️||to hide,to fly away"
  ], "Think about what happens to the trees in each season.", "Leaves fall, decomposers work, animals prepare."));
  b.push(L("The deep sea", [
    "Dark and deep|🌊|Below about 1,000 meters, no sunlight reaches the ocean. It is freezing cold and under huge pressure from all the water above.",
    "Making light|💡|Many deep-sea animals make their own light, called <b>bioluminescence</b>. The anglerfish dangles a glowing lure to attract prey.",
    "Food from above|❄️|Food drifts down as \"marine snow\", bits of dead plankton. Near hot water vents, tube worms depend on bacteria that make food from chemicals."
  ], [
    "How often does sunlight reach the deep sea?|never|🌑||always,only at noon",
    "Animals that make their own light show...|bioluminescence|💡||camouflage only,migration",
    "The anglerfish attracts prey with a glowing...|lure|🎣||tail,song",
    "Bits of dead plankton drifting down are called marine...|snow|❄️||sand,rain",
    "The deep sea is very cold and has high...|pressure|🌊||heat,sunshine",
    "Tube worms near hot vents depend on...|bacteria|🪱||sunlight,sharks",
    "Below about 1,000 meters the sea is...|dark|🌑||bright,warm",
    "A very large deep-sea animal with long arms is the giant...|squid|🦑||crab,sea star"
  ], "Think about what is missing deep underwater.", "No sunlight, so living things make light or use chemicals."));
  b.push(L("Cave animals", [
    "Life in the dark|🕳️|Caves are dark, damp and have steady temperatures. Animals that live their whole lives in caves are called <b>troglobites</b>.",
    "Special bodies|🦎|Many troglobites are pale and have tiny or no eyes. They have long antennae or whiskers to feel their way. Blind cave fish are an example.",
    "Food in caves|🦇|Plants cannot grow without light. Bats bring food in from outside, and their droppings, called <b>guano</b>, feed insects, fungi and many other cave creatures."
  ], [
    "Animals that live their whole lives in caves are...|troglobites|🕳️||nomads,herbivores",
    "Many cave animals have tiny or no...|eyes|👁️||legs,teeth",
    "Blind cave fish do not need...|eyesight|🐟||water,food",
    "Cave animals often find their way using long...|antennae|🦗||wings,tails",
    "Bat droppings in caves are called...|guano|🦇||pellets,larvae",
    "Plants cannot grow in a cave because there is no...|light|🌑||air,dust",
    "Cave animals are often pale because in the dark they do not need...|color|⚪||bones,water",
    "Which animal often roosts in caves?|bat|🦇||eagle,cow"
  ], "Think about what the dark does to bodies and food.", "No light means odd eyes and food brought in."));
  b.push(L("Mountain animals", [
    "High places|🏔️|Mountains are cold, windy and have thin air with less oxygen. Higher up, trees stop growing and rocky slopes begin.",
    "Climbers|🐐|Mountain goats have rough hoof pads for gripping steep cliffs. Snow leopards have thick fur and long tails for balance. Yaks have very thick coats. Pikas gather piles of dry grass for winter.",
    "Thin air|🦅|Animals of high places have big lungs or blood that carries oxygen well. Condors and eagles ride rising winds on wide wings."
  ], [
    "Air high in the mountains is...|thin|🏔️||thick,wet",
    "Which animal grips cliffs with rough hoof pads?|mountain goat|🐐||horse,pig",
    "Snow leopards use their long tails for...|balance|🐆||swimming,digging",
    "Yaks stay warm with very thick...|coats|🐂||shells,scales",
    "Pikas collect piles of dry grass for...|winter|🐹||summer,lunch",
    "High-altitude animals do well with less...|oxygen|🫁||sleep,friends",
    "Which bird soars over the Andes mountains?|condor|🦅||penguin,duck",
    "As you go higher on a mountain, trees eventually...|stop growing|🌲||grow taller,grow bananas"
  ], "Think about cold, thin air and steep rock.", "Grip, warmth, and handling little oxygen."));
  b.push(L("City wildlife", [
    "Animals in town|🏙️|Many animals live in cities: pigeons, squirrels, raccoons, foxes and coyotes. Cities give them food, shelter and fewer predators.",
    "City tricks|🦅|Peregrine falcons nest on tall buildings as if they were cliffs. Raccoons open trash cans. Animals that live well near people are called <b>urban</b> wildlife.",
    "Living together|🌳|Wild animals should stay wild: do not feed them or touch them. We can help by keeping trash closed, putting up bird-safe windows and keeping some green spaces."
  ], [
    "Wildlife living in cities is called...|urban wildlife|🏙️||ocean wildlife,pets",
    "Peregrine falcons nest on tall buildings like on...|cliffs|🦅||beaches,farms",
    "Which animal often opens trash cans for food?|raccoon|🦝||whale,eagle",
    "Why should we not feed wild animals?|they must stay wild and find their own food|🚫||they dislike food,it is illegal in space",
    "Closing trash cans helps keep wildlife...|safe and wild|🗑️||hungry for candy,asleep",
    "Cities give animals shelter and fewer...|predators|🏙️||trees,insects",
    "Green spaces like parks help city...|wildlife|🌳||traffic,noise",
    "Which bird is very common in cities?|pigeon|🕊️||penguin,albatross"
  ], "Think about what cities offer animals and how to be kind.", "Food, shelter, nesting spots; keep wildlife wild."));
  b.push(L("Domestication", [
    "Tamed or domesticated?|🐕|<b>Domestication</b> means people raised animals over many generations until the whole species changed to live with us. A tamed wild animal is still wild.",
    "Early partners|🐄|Dogs were the first, descended from wolves over 15,000 years ago. Sheep, goats and cattle came about 10,000 years ago. Chickens come from wild junglefowl.",
    "Choosing traits|🐎|People used <b>selective breeding</b>: they picked animals with the traits they wanted, like calm nature, strength or lots of wool, and bred them."
  ], [
    "The first animal to be domesticated was probably the...|dog|🐕||horse,cat",
    "Dogs descended from...|wolves|🐺||foxes,bears",
    "Chickens come from wild...|junglefowl|🐔||ducks,eagles",
    "Choosing animals with wanted traits to breed is...|selective breeding|🐑||hibernation,migration",
    "A wild elephant raised by people is...|tamed but not domesticated|🐘||fully domesticated,a pet species",
    "Which animal was domesticated for wool?|sheep|🐑||pig,duck",
    "Domestication takes place over many...|generations|⏳||minutes,days",
    "Cattle were domesticated about _____ years ago.|10000|🐄||100,1000"
  ], "Think about the difference between taming one animal and changing a whole species.", "It takes many generations of choosing."));
  b.push(L("Mass extinctions", [
    "Big die-offs|☄️|A <b>mass extinction</b> is when a huge number of species disappear in a short time on Earth's long timeline. Scientists have found five big ones.",
    "The dinosaur one|🦖|About 66 million years ago a giant asteroid hit Earth, and volcanoes also erupted. Dust blocked sunlight and about three out of four species died, including the non-bird dinosaurs. Birds survived.",
    "The worst one|🌋|The \"Great Dying\" about 252 million years ago was the worst, with most ocean species lost. Many scientists warn that people are causing a new wave of extinctions, which we can still slow down."
  ], [
    "A mass extinction is when...|many species disappear quickly|☄️||one animal moves,a zoo closes",
    "The non-bird dinosaurs died about _____ million years ago.|66|🦖||6,252",
    "What hit Earth at the end of the dinosaur age?|an asteroid|☄️||an earthquake,a flood",
    "Which group of dinosaurs survived to today?|birds|🐦||crocodiles,sharks",
    "How many big mass extinctions have scientists found?|five|5️⃣||two,twenty",
    "The worst mass extinction was about _____ million years ago.|252|🌋||66,10",
    "Big dust clouds blocked...|sunlight|☁️||oxygen,gravity",
    "People today can help by protecting animals and...|habitats|🌳||dust,asteroids"
  ], "Think about what caused big changes and which groups survived.", "Asteroid and volcanoes 66 million years ago."));
  b.push(L("Ice age animals", [
    "Cold times|🧊|During the last ice age, thick sheets of ice covered much of North America and Europe. It ended about 11,700 years ago.",
    "Giants|🦣|Woolly mammoths, woolly rhinos, giant ground sloths and saber-toothed cats lived then. The mammoth's closest living relative is the Asian elephant.",
    "How we know|🔍|We know about them from fossils, bones, cave paintings and even frozen bodies preserved in permafrost. Many large animals died out as the climate warmed."
  ], [
    "A woolly mammoth's closest living relative is the...|Asian elephant|🦣||giraffe,hippo",
    "Which animal had huge curved teeth called sabers?|saber-toothed cat|🐅||woolly mammoth,giant sloth",
    "The last ice age ended about _____ years ago.|11700|🧊||1000,5 million",
    "How did woolly mammoths stay warm?|thick fur|🦣||swimming,hibernation",
    "Frozen mammoth bodies were found in...|permafrost|🧊||deserts,jungles",
    "Which of these lived during the ice age?|woolly rhino|🦏||T. rex,stegosaurus",
    "Ice sheets covered much of North America and...|Europe|🌍||Australia,Hawaii",
    "Many ice age giants disappeared as the climate...|warmed|🌡️||froze more,stayed same"
  ], "Think about ice, cold and the big mammals that lived with it.", "Mammoth, sloth, sabertooth; ended 11,700 years ago."));
  b.push(L("Dinosaur eras", [
    "The Mesozoic|🦖|The age of dinosaurs is the <b>Mesozoic Era</b>. It is split into three periods: <b>Triassic</b>, <b>Jurassic</b> and <b>Cretaceous</b>.",
    "Who lived when|🦕|The first dinosaurs appeared in the Triassic. Stegosaurus and long-necked Brachiosaurus lived in the Jurassic. Tyrannosaurus rex and Triceratops lived in the Cretaceous.",
    "Not so close|⏳|T. rex died out about 66 million years ago, long before humans. Stegosaurus lived over 80 million years before T. rex! Birds are living dinosaurs."
  ], [
    "The age of dinosaurs is the...|Mesozoic Era|🦖||Ice Age,Space Age",
    "Which period came first?|Triassic|🦎||Jurassic,Cretaceous",
    "Which period came last in the age of dinosaurs?|Cretaceous|🦖||Triassic,Jurassic",
    "Tyrannosaurus rex lived in the...|Cretaceous|🦖||Triassic,Jurassic",
    "Stegosaurus lived in the...|Jurassic|🦕||Cretaceous,Triassic",
    "Today's living dinosaurs are the...|birds|🐔||lizards,crocodiles",
    "Triceratops lived in the...|Cretaceous|🦏||Triassic,Jurassic",
    "How many periods make up the Mesozoic Era?|three|3️⃣||two,five"
  ], "Remember the order: Triassic, Jurassic, Cretaceous.", "T then J then C."));
  b.push(L("Primates", [
    "Grasping hands|🐒|Primates have hands that grasp, eyes facing forward and large brains for their size. Monkeys, apes, lemurs and humans are all primates.",
    "Monkey or ape?|🦍|Apes (gorillas, chimps, orangutans, gibbons) have no tail. Most monkeys have a tail. Apes are usually bigger.",
    "Where they live|🌴|Most primates live in tropical forests. Lemurs live only on the island of Madagascar. Chimpanzees use sticks as tools."
  ], [
    "Humans are...|primates|🧍||rodents,reptiles",
    "Apes have no...|tail|🦍||eyes,hands",
    "Which one is an ape?|gorilla|🦍||baboon,lemur",
    "Lemurs live only on the island of...|Madagascar|🏝️||Iceland,Ireland",
    "Primates have hands that can...|grasp|🖐️||fly,swim",
    "Chimpanzees use sticks as...|tools|🐒||toys only,hats",
    "Most primates live in...|tropical forests|🌴||polar ice,deserts",
    "A primate's eyes face...|forward|👀||to the sides,backward"
  ], "Think about hands, eyes and tails.", "No tail means ape."));
  b.push(L("Rodents", [
    "Gnawing teeth|🐭|Rodents have two big front teeth in each jaw that never stop growing. They keep them short by gnawing. About four in ten mammal species are rodents.",
    "Big and small|🦫|Mice, rats, squirrels, hamsters, beavers, porcupines and capybaras are rodents. The capybara of South America is the largest rodent. Rabbits are NOT rodents!",
    "Busy builders|🏗️|Beavers cut trees and build dams, making ponds that help other animals. Squirrels bury nuts, and some forget them, which plants new trees."
  ], [
    "Rodents' front teeth never stop...|growing|🐭||hurting,shining",
    "The largest rodent is the...|capybara|🐹||beaver,porcupine",
    "Which of these is NOT a rodent?|rabbit|🐇||squirrel,hamster",
    "Beavers build...|dams|🦫||bridges of stone,roads",
    "Rodents keep teeth short by...|gnawing|🐭||swimming,sleeping",
    "A porcupine is a kind of...|rodent|🦔||hedgehog,bear",
    "Squirrels that forget buried nuts help plant new...|trees|🐿️||ponds,roads",
    "About four in ten mammal species are...|rodents|🐭||primates,whales"
  ], "Think about the front teeth and the kinds of animals with them.", "Gnawing teeth that keep growing."));
  b.push(L("Crustaceans", [
    "Hard-shelled|🦀|Crustaceans are arthropods with a hard <b>exoskeleton</b>, two pairs of antennae and many jointed legs. Crabs, lobsters, shrimp and barnacles are crustaceans.",
    "Molting|🦞|Crustaceans must <b>molt</b>: they wiggle out of their shell and grow a new bigger one. Most breathe with gills. Crabs, lobsters and shrimp have ten main legs.",
    "Land and sea|🐛|Pill bugs (rolly-pollies) are crustaceans that live on land. Tiny krill form the food of baleen whales."
  ], [
    "Crustaceans have a hard outer covering called an...|exoskeleton|🦀||endoskeleton,backbone",
    "Crabs, lobsters and shrimp are...|crustaceans|🦞||insects,mollusks",
    "To grow, a crab sheds its shell. This is called...|molting|🦀||hibernating,nesting",
    "Most crustaceans breathe with...|gills|🦐||lungs,spiracles",
    "Which land animal is a crustacean?|pill bug|🪲||ant,spider",
    "Tiny crustaceans eaten by baleen whales are...|krill|🐋||plankton worms,eels",
    "Barnacles are...|crustaceans|🐚||plants,fish",
    "Crustaceans belong to the group of animals called...|arthropods|🦀||vertebrates,mammals"
  ], "Think about hard shells that must be shed to grow.", "Gills, exoskeleton, molting."));
  b.push(L("Amphibian bodies", [
    "Double life|🐸|Amphibians (frogs, toads, salamanders) usually begin life in water and live on land as adults. They are cold-blooded with no scales.",
    "Special skin|💧|Their skin is thin and moist, and they absorb water and oxygen through it. They lay soft, jelly-covered eggs in water, because eggs would dry out in air.",
    "Warning signs|🌍|Poison dart frogs have bright colors to warn predators. Some salamanders can regrow a lost tail or leg. Because their skin takes in pollution, frogs show when an environment is unhealthy."
  ], [
    "Amphibian skin is thin and...|moist|🐸||scaly,furry",
    "Amphibian eggs are laid in water because they would otherwise...|dry out|🥚||freeze,float away",
    "Which animal is an amphibian?|salamander|🦎||lizard,turtle",
    "Some salamanders can regrow a lost...|tail|🦎||brain,wing",
    "Bright colors on a poison dart frog are a...|warning|🐸||snack,song",
    "Amphibians absorb water and oxygen through their...|skin|🐸||scales,feathers",
    "Frogs show us when an environment is...|unhealthy|🌍||windy,quiet",
    "Amphibian adults usually live on...|land|🐸||ice,mountains only"
  ], "Think about thin skin and soft eggs.", "Water, skin, jelly eggs."));
  b.push(L("Insect orders", [
    "Many kinds|🪲|Insects are sorted into groups called <b>orders</b>. All have six legs and three body parts.",
    "Famous orders|🦋|<b>Beetles</b> have hard wing covers and are the largest group of animals. <b>Butterflies and moths</b> have wings with tiny scales. <b>Flies</b> have only two wings. Bees, wasps and ants form another order.",
    "Others|🦗|Grasshoppers and crickets jump on strong back legs. Dragonflies are fast fliers that catch other insects in the air."
  ], [
    "The largest group of insects is the...|beetles|🪲||butterflies,dragonflies",
    "Butterfly and moth wings are covered with tiny...|scales|🦋||feathers,spines",
    "True flies have how many wings?|two|🪰||four,six",
    "Which insect jumps on strong back legs?|grasshopper|🦗||bee,dragonfly",
    "Bees, wasps and ants belong to the same...|order|🐝||egg,plant",
    "How many legs do all insects have?|six|🐜||four,eight",
    "Beetles have hard wing...|covers|🪲||tails,eyes",
    "Which insect catches others in the air?|dragonfly|🐝||ladybug,moth"
  ], "Think about wings and legs.", "Insects always have six legs; orders differ by wings."));
  b.push(L("Zoos and aquariums", [
    "Why zoos?|🦒|Good modern zoos and aquariums care for animals, teach people, do research and help save species.",
    "Breeding to save|🦅|In <b>conservation breeding</b>, zoos breed rare animals so the species survives. Black-footed ferrets and Arabian oryx were returned to the wild this way.",
    "Good care|🎾|Zoo animals need <b>enrichment</b>: toys, puzzles and spaces that let them act naturally. Vets check their health, and keepers learn each animal's needs."
  ], [
    "Breeding rare animals to save the species is called...|conservation breeding|🦜||hunting,collecting",
    "Toys and puzzles that keep zoo animals active are called...|enrichment|🎾||pollution,tickets",
    "Zoos teach visitors about...|animals and nature|🏫||only cars,only money",
    "Which animal was helped back from the brink by zoo breeding?|black-footed ferret|🦡||T. rex,giant sloth",
    "A zoo vet checks the animals'...|health|🩺||homework,hats",
    "Animals returned to the wild after zoo breeding are called...|reintroduced|🌿||tamed,retired",
    "Good zoos let animals behave in a _____ way.|natural|🌳||silly,quiet only",
    "Research at zoos helps scientists learn how to...|protect species|🔬||make toys,sell tickets"
  ], "Think about the goals of a good zoo.", "Care, teach, research, save species."));
  b.push(MIX("Mixed practice", [b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8], b[9], b[10], b[11], b[12], b[13], b[14], b[15], b[16], b[17]]));
  b.push(MIX("Level 11 Challenge", [b[0], b[2], b[3], b[4], b[6], b[7], b[8], b[9], b[10], b[11], b[12], b[13], b[14], b[15], b[16], b[17], b[1], b[5]]));

  // ================= LEVEL 12 =================
  const c = [];
  // numeric question maker: gen() returns {text, answer, clue, choices?, v?}
  const G = (gen, nudge) => () => {
    const q = gen();
    let e, tries = 0;
    do { e = gen(); tries++; } while ((e.answer === q.answer || e.text === q.text) && tries < 50);
    const et = String(e.text).replace(/<[^>]+>/g, "");
    const o = { text: q.text, visual: q.v, answer: q.answer, hints: [nudge, q.clue, `Example: ${et} The answer is ${e.answer}. Now do yours.`] };
    if (q.choices) o.choices = q.choices;
    return o;
  };
  c.push(L("Coral bleaching", [
    "Living reefs|🪸|Corals are tiny animals. Many have colorful <b>algae</b> living inside them that give them food and color. Reefs shelter about a quarter of all ocean species.",
    "Bleaching|🌡️|If the water stays too warm, corals push out their algae and turn white. This is <b>coral bleaching</b>. A bleached coral is not yet dead and can recover if the water cools in time.",
    "Helping|🐠|Rising ocean temperatures are the main cause. Less pollution, careful fishing and cutting the gases that warm Earth all help reefs."
  ], [
    "Corals are...|animals|🪸||plants,rocks",
    "Corals get color and food from tiny...|algae|🌿||sharks,pebbles",
    "A stressed coral that pushes out its algae turns...|white|🪸||black,green",
    "The main cause of widespread bleaching is...|warm water|🌡️||cold currents,rain",
    "A bleached coral...|can recover if the water cools|🪸||is already a rock,turns into a fish",
    "Coral reefs shelter about _____ of ocean species.|a quarter|🐠||none,all",
    "Reefs also protect coasts from strong...|waves|🌊||clouds,volcanoes",
    "Which helps reefs?|less pollution|♻️||more dumping,warmer water"
  ], "Think about what the algae do for the coral and what upsets them.", "Heat makes corals push out algae."));
  c.push(L("Plastic in the ocean", [
    "A big problem|🌊|Millions of tons of plastic reach the ocean each year. Plastic does not rot away. It breaks into tiny pieces called <b>microplastics</b>.",
    "Harm to animals|🐢|Sea turtles can mistake floating bags for jellyfish. Seabirds feed plastic bits to chicks. Animals can get tangled in lost fishing nets, called \"ghost nets\".",
    "What helps|🧹|We can use fewer single-use plastics, reuse and recycle, and join beach cleanups. Choosing reusable bottles and bags keeps plastic out of the sea."
  ], [
    "Tiny pieces of broken-down plastic are called...|microplastics|🔬||micro-sand,megaplastics",
    "Sea turtles may mistake plastic bags for...|jellyfish|🐢||seaweed trees,crabs",
    "Lost fishing nets that trap animals are called _____ nets.|ghost|👻||magic,golden",
    "Plastic in the ocean breaks into smaller pieces but does not...|rot away|🌊||float,sink",
    "A helpful action is using _____ plastic.|less single-use|♻️||more single-use,flaming",
    "Reusable bottles and bags help keep plastic out of the...|ocean|🌊||fridge,attic",
    "A group cleaning litter off a beach is a beach...|cleanup|🧹||party,race",
    "Seabirds can feed bits of plastic to their...|chicks|🐦||eggs only,partners"
  ], "Think about what plastic does after it is used.", "It breaks down into pieces but never disappears."));
  c.push(L("Overfishing", [
    "Too many fish caught|🎣|<b>Overfishing</b> means catching fish faster than they can have young. Fewer fish are left to breed, and the population falls.",
    "Side effects|🐟|Nets can also catch animals nobody wanted, such as turtles and dolphins. This is called <b>bycatch</b>. Atlantic cod collapsed in the 1990s from overfishing.",
    "Fishing wisely|✅|<b>Sustainable fishing</b> uses limits (quotas), safer nets, closed seasons and protected ocean areas so that fish stocks can recover."
  ], [
    "Catching fish faster than they can reproduce is...|overfishing|🎣||fish farming,migrating",
    "Unwanted animals caught by accident are called...|bycatch|🐢||leftovers,trophies",
    "Fishing that does not use up fish stocks is...|sustainable|✅||wasteful,instant",
    "Limits on how many fish can be caught are called...|quotas|📏||tickets,toys",
    "Protected ocean areas let fish populations...|recover|🌊||vanish,shrink",
    "A famous fish that collapsed in the 1990s from overfishing was the Atlantic...|cod|🐟||salmon,shark",
    "Closed seasons protect fish when they are...|breeding|🐟||sleeping,hunting",
    "Overfishing causes fish populations to...|fall|📉||rise,stay the same"
  ], "Think about whether the fish can have enough young.", "Catch less than the fish can replace."));
  c.push(L("Sustainable farming", [
    "Farms and nature|🚜|Farms can harm or help wildlife. Farmers who work with nature use methods called <b>sustainable farming</b>.",
    "Good methods|🌾|<b>Crop rotation</b> grows different crops each year so the soil stays healthy. <b>Cover crops</b> protect bare soil. <b>Rotational grazing</b> moves cows between fields so grass can regrow.",
    "Wildlife helpers|🐝|Hedgerows and wildflower strips give homes to bees, birds and insects that eat pests. Using less pesticide protects helpful animals."
  ], [
    "Growing different crops in a field each year is crop...|rotation|🌽||freezing,cutting",
    "Moving cows between fields so grass can regrow is _____ grazing.|rotational|🐄||constant,midnight",
    "Plants grown to protect bare soil are called _____ crops.|cover|🌱||party,hidden",
    "Hedgerows give homes to bees and...|birds|🐦||cars,dinosaurs",
    "Using less pesticide protects helpful...|insects|🐝||weeds only,tractors",
    "Healthy soil is full of tiny living things such as...|worms|🪱||plastic,glass",
    "Farming that protects nature for the future is called...|sustainable farming|🌾||fast farming,empty farming",
    "A strip of wildflowers at a field's edge helps...|pollinators|🌼||pests,rocks"
  ], "Think about keeping soil and wildlife healthy for years.", "Rotate, cover, graze wisely."));
  c.push(L("Pollinator decline", [
    "Why they matter|🐝|Bees, butterflies, bats and hummingbirds are pollinators. Many fruits, nuts and vegetables we eat depend on them.",
    "Troubles|⚠️|Some pollinator numbers are falling because of habitat loss, strong pesticides, disease and tiny pests like the varroa mite. Climate change also upsets when flowers bloom.",
    "How to help|🌼|Plant flowers that bloom at different times, leave a wild patch, avoid pesticides and give bees a shallow dish of water with stones to stand on."
  ], [
    "Animals that carry pollen between flowers are...|pollinators|🐝||predators,decomposers",
    "A tiny pest that harms honeybees is the varroa...|mite|🐝||whale,fox",
    "Pollinators lose their homes when _____ is destroyed.|habitat|🌳||sunshine,pollen",
    "One way to help pollinators is to plant...|flowers|🌼||plastic plants,gravel",
    "Strong pesticides can harm...|bees|🐝||rocks,clouds",
    "Which is a pollinator?|hummingbird|🐦||wolf,trout",
    "Many fruits and vegetables need pollinators to make...|seeds and fruit|🍎||plastic,noise",
    "Leaving a wild patch in a garden gives pollinators a place to...|live|🏡||sell honey,go bowling"
  ], "Think about what pollinators need and what hurts them.", "Flowers, homes, fewer pesticides."));
  c.push(L("Wildlife corridors", [
    "Broken homes|🛣️|Roads, farms and cities cut wild habitat into small pieces. This is called <b>habitat fragmentation</b>. Animals struggle to find food and mates, and many are hit by cars.",
    "Safe paths|🌉|A <b>wildlife corridor</b> is a strip of habitat that links two wild areas. Wildlife bridges and tunnels let animals cross roads safely. Fish ladders help fish swim past dams.",
    "Why it works|🧬|Corridors let animals move, find new homes and meet others of their kind, which keeps their populations healthy and varied."
  ], [
    "Habitat cut into small pieces is called habitat...|fragmentation|🧩||creation,erosion",
    "A strip of habitat that links wild areas is a wildlife...|corridor|🌳||fence,zoo",
    "Bridges over highways help animals cross...|safely|🌉||faster than light,upside down",
    "Fish ladders help fish pass...|dams|🐟||boats,docks",
    "A major danger to animals crossing roads is...|cars|🚗||snow,sunshine",
    "Corridors let animals move and find new...|homes|🏡||phones,ladders",
    "Which structure helps animals cross a highway?|wildlife bridge|🌉||toll gate,billboard",
    "Fragmented habitats make it hard for animals to find...|food|🍽️||roads,fences"
  ], "Think about how animals get from one area to another.", "Corridors and bridges join habitats."));
  c.push(L("Tracking animals", [
    "Following wildlife|📡|Scientists track animals to learn where they go. <b>GPS collars</b> and tags send locations by satellite. Tracking shows migration routes and which places need protection.",
    "Other tools|📷|<b>Camera traps</b> take pictures when an animal walks past, without disturbing it. Bird <b>bands</b> are small rings with a number on the leg. Drones count animals from the sky.",
    "Safe science|🔬|Trackers are light and designed not to hurt. Scientists also listen to sound recorders to find birds, frogs and whales."
  ], [
    "Collars that send location by satellite are...|GPS collars|📡||sound collars,lunch collars",
    "Cameras that take a photo when an animal walks by are...|camera traps|📷||selfie sticks,projectors",
    "A numbered ring on a bird's leg is a...|band|🐦||crown,belt",
    "Scientists use _____ to count animals from the sky.|drones|🚁||balloons made of cake,kites only",
    "Tracking shows animals' migration...|routes|🗺️||songs,dreams",
    "Sound recorders can find animals by their...|calls|🎙️||colors,shadows",
    "Tracking tags should be light and designed not to...|hurt the animal|🏷️||blink,play music",
    "Why do scientists track animals?|to learn where they go|🔬||to scare them,to name them after friends"
  ], "Think about how each tool helps scientists see where animals go.", "Satellite, camera, band, sound."));
  c.push(L("Wildlife careers", [
    "Jobs with animals|🧑‍🔬|Many careers help animals and nature. A <b>zoologist</b> studies animals. A <b>veterinarian</b> treats sick animals. A <b>wildlife biologist</b> studies animals in the wild.",
    "Specialists|🔎|An <b>ornithologist</b> studies birds. An <b>entomologist</b> studies insects. A <b>herpetologist</b> studies reptiles and amphibians. A <b>marine biologist</b> studies sea life.",
    "More jobs|🌲|Park rangers protect wild places. An <b>ecologist</b> studies how living things and their surroundings fit together."
  ], [
    "A scientist who studies birds is an...|ornithologist|🐦||entomologist,herpetologist",
    "A scientist who studies insects is an...|entomologist|🐜||ornithologist,ichthyologist",
    "Someone who treats sick animals is a...|veterinarian|🩺||pilot,baker",
    "A scientist who studies sea life is a...|marine biologist|🌊||park ranger,astronomer",
    "A scientist who studies reptiles and amphibians is a...|herpetologist|🐍||ornithologist,botanist",
    "Someone who protects a national park is a park...|ranger|🌲||clerk,chef",
    "A scientist who studies how living things and their surroundings fit together is an...|ecologist|🌿||astronomer,geologist",
    "A zoologist studies...|animals|🦒||rocks,stars"
  ], "Look at the word parts: ornitho means bird, ento means insect.", "Match the job to what it studies."));
  c.push(N("Reading population graphs", [
    "Graph basics|📈|A line graph shows how a number changes. The bottom (x-axis) shows time, like years. The side (y-axis) shows the count, like how many animals.",
    "Rising or falling|📉|A line going up means the population is growing. Going down means it is shrinking. A flat line means it is staying steady.",
    "Comparing|🔢|To find how much it changed, subtract the smaller number from the bigger. To find an average, add the numbers and divide by how many there are."
  ], G(() => {
    const sp = pick([["wolves", "🐺"], ["sea otters", "🦦"], ["eagles", "🦅"], ["bison", "🦬"], ["tortoises", "🐢"], ["deer", "🦌"]]);
    const y = ri(2015, 2022), t = ri(0, 2);
    if (t === 0) {
      const a1 = ri(10, 40), a2 = a1 + ri(2, 15), a3 = a2 + ri(2, 20);
      return { v: sp[1], text: `A park counted ${sp[0]}: ${y}: ${a1}, ${y + 1}: ${a2}, ${y + 2}: ${a3}. How many more ${sp[0]} were there in ${y + 2} than in ${y}?`, answer: a3 - a1, clue: "Subtract the smaller count from the bigger one." };
    }
    if (t === 1) {
      const m = ri(10, 60), d1 = ri(2, 9), d2 = ri(2, 9);
      const vals = [m - d1, m + d1 + d2, m - d2].map(x => x);
      const total = vals[0] + vals[1] + vals[2];
      return { v: sp[1], text: `A reserve counted ${sp[0]} in three years: ${vals[0]}, ${vals[1]} and ${vals[2]}. What is the average count?`, answer: total / 3, clue: "Add all three counts, then divide by three." };
    }
    const a1 = ri(30, 80), a2 = a1 - ri(3, 12), a3 = a2 - ri(3, 12);
    const ys = [y, y + 1, y + 2];
    return { v: sp[1], text: `${sp[0][0].toUpperCase() + sp[0].slice(1)} in a forest: ${ys[0]}: ${a1}, ${ys[1]}: ${a2}, ${ys[2]}: ${a3}. In which year was the count lowest?`, answer: ys[2], choices: shuf(ys), clue: "The lowest count is the smallest number. Find its year." };
  }, "Read the numbers carefully and decide what the question asks.")));
  c.push(L("Measuring animals", [
    "Metric units|📏|Scientists measure with the metric system. Length: millimeters (mm), centimeters (cm), meters (m) and kilometers (km). Mass: grams (g), kilograms (kg) and tonnes.",
    "Pick the right size|🐜|Use small units for small things (an ant is measured in mm) and big units for big things (a blue whale is measured in meters). Speed is in km/h and liquid in liters.",
    "Converting|🔢|100 cm = 1 m. 1,000 m = 1 km. 1,000 g = 1 kg. Always check the unit before comparing numbers."
  ], [
    "The best unit for the length of an ant is...|millimeters|🐜||kilometers,meters",
    "The best unit for the length of a blue whale is...|meters|🐋||millimeters,kilometers",
    "The best unit for the mass of a hummingbird is...|grams|🐦||tonnes,kilograms",
    "The best unit for the speed of a cheetah is...|km/h|🐆||kg,liters",
    "How far a goose migrates is measured in...|kilometers|🪿||centimeters,grams",
    "100 centimeters make one...|meter|📏||kilometer,gram",
    "1,000 grams make one...|kilogram|⚖️||liter,meter",
    "The water a camel drinks is measured in...|liters|🐫||meters,grams"
  ], "Is the thing small, medium or huge? Pick a unit to match.", "Length, mass, speed and liquids have different units."));
  c.push(N("Estimating populations", [
    "Can't count them all|🦎|You cannot count every animal in a big place. Scientists use <b>mark and recapture</b>: catch some, mark them harmlessly, release them, then catch another sample.",
    "The idea|🔍|If 1 out of 4 animals in the second sample is marked, then about 1 out of 4 in the whole population is marked.",
    "The rule|🧮|Estimate = (marked first time x second sample) divided by (marked in second sample)."
  ], G(() => {
    const sp = pick([["frogs", "🐸"], ["fish", "🐟"], ["beetles", "🪲"], ["lizards", "🦎"], ["mice", "🐭"]]);
    const M = pick([20, 30, 40, 50]), R = pick([2, 4, 5]), c1 = ri(2, 6), C = R * c1;
    return { v: sp[1], text: `Scientists marked ${M} ${sp[0]} and let them go. Later they caught ${C} ${sp[0]}, and ${R} of them were marked. About how many ${sp[0]} live in the area?`, answer: M * c1, clue: "Multiply the first marked number by the second sample, then divide by the marked ones found the second time." };
  }, "Use the mark and recapture rule. Watch which number goes where.")));
  c.push(L("Fair tests", [
    "A fair test|🧪|A <b>hypothesis</b> is a guess you can test. In a <b>fair test</b> you change only one thing and keep everything else the same.",
    "Comparing|⚖️|A <b>control group</b> does not get the change, so you have something to compare with. Repeat the test several times to make sure the results are reliable.",
    "Be honest and kind|🐦|Collect <b>data</b> (measurements) and report what you really found, even if it does not match your guess. When studying animals, never harm them."
  ], [
    "A guess that you can test is a...|hypothesis|💭||conclusion,control",
    "In a fair test you change only...|one thing|🧪||everything,nothing",
    "The group that does not get the change is the...|control group|⚖️||test group,secret group",
    "Repeating a test helps show results are...|reliable|🔁||pretty,loud",
    "Measurements and observations are called...|data|📊||dreams,tales",
    "If results do not match your guess, you should...|report them honestly|📝||change them,hide them",
    "To test if bird seed type matters, keep the feeder spot the...|same|🐦||different each time,secret",
    "Scientists studying animals should avoid...|harming them|🐾||measuring,watching"
  ], "Think about what must stay the same so the test is fair.", "One change, one control, repeat, be honest."));
  c.push(L("Animal lifespans", [
    "Short and long lives|⏳|Lifespans vary a lot. An adult mayfly lives about a day. A mouse lives about two years. A pet dog lives about 10 to 15 years. Elephants can live 60 to 70 years.",
    "Really old animals|🐢|Giant tortoises can live over 100 years. Bowhead whales may live about 200 years. The Greenland shark may live for hundreds of years, and the ocean quahog clam for over 500!",
    "Why different?|🔍|Small animals often live short lives and have many young. Large animals often live long and have few young."
  ], [
    "An adult mayfly lives about...|a day|🦟||a year,ten years",
    "A pet dog usually lives about...|10 to 15 years|🐕||2 years,50 years",
    "Elephants can live about...|60 to 70 years|🐘||5 years,200 years",
    "Which animal can live over 100 years?|giant tortoise|🐢||mouse,mayfly",
    "A mouse lives about...|two years|🐭||twenty years,two days",
    "Which fish may live for hundreds of years?|Greenland shark|🦈||goldfish,guppy",
    "Which small mollusk can live over 500 years?|ocean quahog|🐚||garden snail,squid",
    "Large animals often have _____ young and live long lives.|few|🐘||thousands of,no"
  ], "Think about big and small animals.", "Small and quick versus large and slow."));
  c.push(L("Convergent evolution", [
    "Same problem, same answer|🐬|Sometimes unrelated animals evolve similar features because they face similar challenges. This is <b>convergent evolution</b>.",
    "Examples|🦈|Sharks (fish) and dolphins (mammals) both have streamlined bodies and fins for fast swimming. Bats, birds and insects all evolved wings separately. Bats and dolphins both use echolocation.",
    "Not the same family|🧬|These animals look alike on the outside but are not close relatives. A dolphin is more closely related to a cow than to a shark."
  ], [
    "Unrelated animals evolving similar features is _____ evolution.|convergent|🧬||divergent,backward",
    "Sharks and dolphins both have streamlined bodies for...|fast swimming|🏊||climbing,digging",
    "Bats, birds and insects all evolved...|wings|🪽||gills,fur",
    "A dolphin is more closely related to a...|cow|🐄||shark,tuna",
    "Both bats and dolphins use...|echolocation|🔊||camouflage,hibernation",
    "Similar features appear because of similar...|challenges|🧩||names,colors only",
    "A shark is a fish and a dolphin is a...|mammal|🐬||reptile,bird",
    "Wings of a bat and a bird evolved...|separately|🪽||from the same wing,in a zoo"
  ], "Think about animals that look alike but are not close relatives.", "Similar problem, similar body."));
  c.push(L("Shared bones and leftovers", [
    "Same bones, different jobs|🦴|A human arm, bat wing, whale flipper and horse leg all have the same basic bones, such as the upper-arm bone called the <b>humerus</b>. These are <b>homologous structures</b>.",
    "Common ancestors|🌳|Homologous bones show that these animals share a common ancestor. The bones were changed over time for different jobs: flying, swimming, running or grasping.",
    "Vestigial parts|🐋|A <b>vestigial structure</b> is a part that has lost most of its use. Whales have tiny hip bones left from land ancestors, and kiwis have tiny wings."
  ], [
    "Similar bones in different animals are called _____ structures.|homologous|🦴||fossil,hungry",
    "A body part that has lost most of its use is...|vestigial|🐋||brand new,glowing",
    "Whales' tiny hip bones come from ancestors that lived on...|land|🐋||ice,trees",
    "The upper-arm bone is the...|humerus|🦴||femur,skull",
    "A bat wing and a whale flipper both come from...|front limbs|🦇||tails,antennae",
    "Homologous bones show animals share a common...|ancestor|🌳||enemy,address",
    "Kiwis have tiny wings that they cannot use to...|fly|🥝||eat,swim",
    "Flipper, wing and arm have the same bones used for...|different jobs|🦴||the same job only,no job"
  ], "Think about the same bones with different shapes.", "Shared ancestor, changed jobs."));
  c.push(L("Animal navigation", [
    "Finding the way|🧭|Many animals travel long distances without maps. They use clues from nature.",
    "Senses and signs|⭐|Salmon smell their way back to the stream where they hatched. Many birds use the sun and stars. Sea turtles and some birds can sense Earth's <b>magnetic field</b>.",
    "Teamwork|🐜|Ants leave scent trails with chemicals that other ants follow. Honeybees do a <b>waggle dance</b> to show others where flowers are."
  ], [
    "Salmon find their home stream by...|smell|🐟||sight of rainbows,asking for directions",
    "Some animals sense Earth's...|magnetic field|🧲||weather map,moon dust",
    "Honeybees show where flowers are with a...|waggle dance|🐝||flying contest,song",
    "Ants follow trails of...|scent|🐜||stars,bubbles",
    "Many migrating birds use the sun and...|stars|⭐||radios,mirrors",
    "Bats find their way in the dark using...|echolocation|🦇||smell of salmon,magnets only",
    "Sea turtles can return to the beach where they were...|born|🐢||eaten,painted",
    "Homing pigeons use landmarks and Earth's...|magnetic field|🕊️||tides,thunder"
  ], "Think about which sense or clue the animal uses.", "Smell, stars, magnets, dances."));
  c.push(L("Estuaries and mangroves", [
    "Where river meets sea|🌅|An <b>estuary</b> is where a river flows into the sea, mixing fresh and salt water. It is a rich nursery for young fish, crabs and oysters.",
    "Mangroves|🌿|<b>Mangrove</b> trees grow in salty water in warm places. Their tangled roots shelter young fish and slow down waves that would wear away the shore.",
    "Salt marshes and oysters|🦪|Salt marshes filter dirty water and give homes to birds. Oysters clean water too, filtering it as they feed."
  ], [
    "Where a river meets the sea is an...|estuary|🌅||oasis,glacier",
    "Estuaries are nurseries for young...|fish|🐟||camels,eagles only",
    "Trees that grow in salty water in warm places are...|mangroves|🌿||pines,maples",
    "Mangrove roots slow down...|waves|🌊||clouds,cars",
    "Oysters help clean the water by...|filtering it|🦪||drinking it all,heating it",
    "Estuary water is a mix of fresh and...|salt water|🌅||lava,milk",
    "Salt marshes give homes to many...|birds|🦆||camels,penguins",
    "Mangrove roots give young fish a place to...|hide|🐠||fly,sleep on ice"
  ], "Think about where the river meets the sea and why young animals would live there.", "Mixed fresh and salt water, shelter."));
  c.push(L("Myths and facts", [
    "Check the facts|🧐|Many animal \"facts\" are really myths. Good scientists check before they believe.",
    "Common myths|🦇|Bats are not blind. Ostriches do not bury their heads in sand. Camel humps store fat, not water. Porcupines cannot shoot their quills. Goldfish can remember things for months.",
    "Ask how we know|🔍|Look for evidence: careful observation, experiments and trusted science books."
  ], [
    "A camel's hump stores mostly...|fat|🐫||water,sand",
    "Bats are...|not blind|🦇||blind,deaf",
    "Ostriches bury their heads in sand.|myth|🦤||fact,sometimes",
    "Porcupines can throw their quills.|myth|🦔||fact,only on Mondays",
    "How long can goldfish remember things?|months|🐠||three seconds,never",
    "Bats seeing nothing is a...|myth|🦇||fact,law",
    "To check an animal claim, we look for...|evidence|🔍||rumors,luck",
    "Camel humps hold water.|myth|🐫||fact,usually"
  ], "Think about what scientists have really observed.", "Check evidence."));
  c.push(MIX("Mixed practice", [c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15], c[16], c[17]]));
  c.push(MIX("Level 12 Challenge", [c[0], c[2], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15], c[16], c[17], c[1], c[3]]));

  Object.assign(ANIMALS_LEVELS, { 10: a, 11: b, 12: c });
})();
