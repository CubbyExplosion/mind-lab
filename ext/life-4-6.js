// ext/life-4-6.js  Life Science levels 4-6
(() => {
  const nz = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
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
    make.teach = () => slides.map(s => { const p = s.split("|"); return { h: p[0], v: p[1], t: p[2] }; });
    return { title, make };
  };
  const MIX = (title, ls) => {
    const make = () => pick(ls).make();
    make.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes ideas you already know. Here is a quick reminder, then the quiz." }, ...ls.slice(0, 4).map(l => l.make.teach()[0])];
    return { title, make };
  };

  // ================= LEVEL 4 =================
  const a = [];
  a.push(L("Animal groups", [
    "Sorting animals|🐘🦅🐟|Scientists sort animals into groups: <b>mammals</b>, <b>birds</b>, <b>fish</b>, <b>reptiles</b>, <b>amphibians</b> and <b>insects</b>.",
    "How to tell|🐕🐦|Mammals have fur or hair and feed milk to their babies. Birds have feathers and wings. Fish live in water and have fins.",
    "More groups|🐍🐸🐞|Reptiles have dry scales. Amphibians live in water and on land. Insects have six legs."
  ], [
    "A dog has fur and feeds milk to its pups. It is a...|mammal|🐕||bird,fish",
    "A robin has feathers and wings. It is a...|bird|🐦||mammal,reptile",
    "A goldfish lives in water and has fins. It is a...|fish|🐠||insect,bird",
    "A snake has dry scales. It is a...|reptile|🐍||amphibian,mammal",
    "A frog starts life in water and later lives on land too. It is an...|amphibian|🐸||insect,reptile",
    "An ant has six legs. It is an...|insect|🐜||fish,bird",
    "A cat has fur. It is a...|mammal|🐈||reptile,insect",
    "An eagle has feathers. It is a...|bird|🦅||mammal,fish"
  ], "Look at the body covering and where it lives."));
  a.push(L("Mammals", [
    "What is a mammal?|🐘|Mammals have <b>hair or fur</b>. They breathe air with lungs.",
    "Mother's milk|🐄🍼|Baby mammals drink <b>milk</b> from their mothers.",
    "Mammals everywhere|🐋🦇🐒|Whales live in the sea. Bats fly. Monkeys climb. People are mammals too!"
  ], [
    "Mammal babies drink their mother's...|milk|🍼||honey,juice",
    "Which animal is a mammal?|a horse|🐴||a shark,an eagle",
    "Which animal is a mammal?|a whale|🐋||a trout,a lizard",
    "Which animal is a mammal?|a bat|🦇||a robin,a bee",
    "Mammals have hair or...|fur|🐻||scales,feathers",
    "Are people mammals?|yes|🧑||no,only sometimes",
    "Which is NOT a mammal?|a crocodile|🐊||a mouse,a rabbit",
    "How do mammals breathe?|with lungs|🫁||with gills only,through shells"
  ], "Think: fur or hair, and milk for babies."));
  a.push(L("Birds", [
    "What is a bird?|🐦|Birds have <b>feathers</b>, <b>wings</b> and a <b>beak</b>. They lay eggs.",
    "Flying and not flying|🦆🐧|Most birds fly. Penguins and ostriches cannot fly, but they are still birds.",
    "Nests|🪺|Many birds build nests to keep their eggs safe and warm."
  ], [
    "Only birds have...|feathers|🪶||fur,scales",
    "Birds lay...|eggs|🥚||milk,seeds",
    "Where do birds keep their eggs safe?|in a nest|🪺||in a puddle,in a pocket",
    "Which bird cannot fly?|a penguin|🐧||an eagle,a robin",
    "A bird's mouth is called a...|beak|🐤||snout,trunk",
    "Which animal is a bird?|an owl|🦉||a bat,a bee",
    "Which big bird runs fast but cannot fly?|an ostrich|🐦||a hummingbird,a sparrow",
    "What do birds use to fly?|wings|🪽||fins,paws"
  ], "Birds are the animals with feathers."));
  a.push(L("Fish", [
    "What is a fish?|🐟|Fish live in water. They have <b>fins</b> to swim and <b>scales</b> on their skin.",
    "Gills|🫧|Fish breathe underwater with <b>gills</b>. Gills take air out of the water.",
    "Fish eggs|🥚|Most fish lay lots of tiny eggs in the water."
  ], [
    "What do fish use to swim?|fins|🐠||wings,legs",
    "What do fish use to breathe underwater?|gills|🫧||lungs only,ears",
    "Fish skin is covered with...|scales|🐟||feathers,fur",
    "Where do fish live?|in water|🌊||in trees,in the sky",
    "Which animal is a fish?|a shark|🦈||a dolphin,a whale",
    "Which animal is NOT a fish?|a dolphin|🐬||a salmon,a goldfish",
    "Most fish lay...|eggs|🥚||milk,nests of straw",
    "A seahorse is a kind of...|fish|🐴||insect,bird"
  ], "Fish live in water and breathe with gills."));
  a.push(L("Reptiles and amphibians", [
    "Reptiles|🦎🐢🐊|Reptiles have <b>dry scaly skin</b>. Snakes, lizards, turtles and crocodiles are reptiles.",
    "Amphibians|🐸|Amphibians have <b>smooth, moist skin</b>. Frogs and salamanders start in water and live on land later.",
    "Cold animals|☀️|Both groups are cold-blooded. They warm up by sitting in the sun."
  ], [
    "Reptiles have skin that is...|dry and scaly|🦎||soft and furry,feathery",
    "Which animal is a reptile?|a turtle|🐢||a frog,a dolphin",
    "Which animal is an amphibian?|a frog|🐸||a lizard,a snake",
    "Which animal is a reptile?|a crocodile|🐊||a salamander,a bat",
    "Amphibians start life in the...|water|💧||desert,tree top",
    "A lizard warms up by sitting in the...|sun|☀️||freezer,rain",
    "Which animal is NOT a reptile?|a frog|🐸||a snake,a gecko",
    "Which is an amphibian?|a salamander|🦎||a turtle,a snake"
  ], "Dry scales means reptile. Moist skin and a start in water means amphibian."));
  a.push(L("Insects", [
    "What is an insect?|🐞|An insect has <b>6 legs</b> and <b>3 body parts</b>: head, thorax and abdomen.",
    "Antennae and wings|🦋|Insects have two <b>antennae</b> to sense things. Many have wings.",
    "Not insects|🕷️|Spiders have 8 legs, so they are not insects."
  ], [
    "How many legs does an insect have?|6|🐜||4,8",
    "How many body parts does an insect have?|3|🐞||2,5",
    "Which is an insect?|a bee|🐝||a spider,a worm",
    "Which is an insect?|a butterfly|🦋||a snail,a spider",
    "A spider has how many legs?|8|🕷️||6,10",
    "Which is NOT an insect?|a spider|🕷️||an ant,a beetle",
    "Insects use their antennae to...|sense things|🐜||swim,chew leaves only",
    "Which insect makes honey?|a honeybee|🍯||a ladybug,a fly"
  ], "Count the legs: insects have six."));
  a.push(L("Animal body coverings", [
    "Fur and feathers|🐻🦜|Fur keeps mammals warm. Feathers keep birds warm and help them fly.",
    "Scales|🐍🐟|Scales are small hard plates. They protect fish and reptiles.",
    "Shells and skin|🐢🐌🐸|A shell is a hard home for a turtle or a snail. Frogs have smooth, wet skin."
  ], [
    "A bear is covered in...|fur|🐻||scales,feathers",
    "A parrot is covered in...|feathers|🦜||fur,scales",
    "A snake is covered in...|scales|🐍||fur,feathers",
    "A turtle has a hard...|shell|🐢||wing,fin",
    "A sheep has thick wool that keeps it...|warm|🐑||wet,loud",
    "A frog has smooth, wet...|skin|🐸||fur,feathers",
    "A fish is covered in...|scales|🐠||feathers,wool",
    "A snail carries its...|shell|🐌||nest,burrow"
  ], "Match each animal to what covers its body."));
  a.push(L("What animals eat", [
    "Plant eaters|🐰🐄|<b>Herbivores</b> eat only plants. Cows and rabbits are herbivores.",
    "Meat eaters|🦁|<b>Carnivores</b> eat other animals. Lions and sharks are carnivores.",
    "Both|🐻🧑|<b>Omnivores</b> eat plants and animals. Bears and people are omnivores."
  ], [
    "An animal that eats only plants is a...|herbivore|🐰||carnivore,omnivore",
    "An animal that eats only meat is a...|carnivore|🦁||herbivore,omnivore",
    "An animal that eats plants and animals is an...|omnivore|🐻||herbivore,carnivore",
    "A cow eats grass. It is a...|herbivore|🐄||carnivore,omnivore",
    "A lion eats meat. It is a...|carnivore|🦁||herbivore,omnivore",
    "A person eats fruit and fish. People are...|omnivores|🧑||herbivores,carnivores",
    "A giraffe eats leaves. It is a...|herbivore|🦒||carnivore,omnivore",
    "A shark eats other fish. It is a...|carnivore|🦈||herbivore,omnivore"
  ], "Plants only, meat only, or both?"));
  a.push(L("Habitats", [
    "A home in nature|🏞️|A <b>habitat</b> is the place where an animal or plant lives. It has food, water and shelter.",
    "Different habitats|🏜️🌊🌲|A desert is hot and dry. The ocean is full of salty water. A forest has lots of trees.",
    "Right place|🐪🐠🦌|Camels live in the desert, fish in water and deer in forests."
  ], [
    "A habitat is where a plant or animal...|lives|🏞️||is painted,is sold",
    "Which animal lives in the desert?|a camel|🐪||a whale,a penguin",
    "Which animal lives in the ocean?|a whale|🐋||a camel,a deer",
    "Which animal lives in the forest?|a deer|🦌||a shark,a camel",
    "A habitat gives animals food, water and...|shelter|🏠||homework,a TV",
    "Which place is hot and dry?|desert|🏜️||ocean,pond",
    "Which animal lives in a cold, icy place?|a penguin|🐧||a camel,a monkey",
    "Which habitat is full of trees?|forest|🌳||desert,ocean"
  ], "Where would the animal find what it needs?"));
  a.push(L("Animal babies", [
    "Baby names|🐶🐱|A baby dog is a <b>puppy</b>. A baby cat is a <b>kitten</b>. A baby cow is a <b>calf</b>.",
    "More baby names|🐴🐑🐥|A baby horse is a <b>foal</b>. A baby sheep is a <b>lamb</b>. A baby chicken is a <b>chick</b>.",
    "Even more|🦁🐸|A baby lion is a <b>cub</b>. A baby frog is a <b>tadpole</b>."
  ], [
    "A baby dog is called a...|puppy|🐶||kitten,calf",
    "A baby cat is called a...|kitten|🐱||puppy,lamb",
    "A baby cow is called a...|calf|🐄||foal,chick",
    "A baby horse is called a...|foal|🐴||lamb,cub",
    "A baby sheep is called a...|lamb|🐑||calf,chick",
    "A baby chicken is called a...|chick|🐥||foal,puppy",
    "A baby lion is called a...|cub|🦁||lamb,kitten",
    "A baby frog is called a...|tadpole|🐸||cub,calf"
  ], "Each animal has its own baby name."));
  a.push(L("Butterfly life cycle", [
    "Four steps|🥚🐛🫘🦋|A butterfly goes through <b>egg</b>, <b>caterpillar</b>, <b>chrysalis</b> and <b>butterfly</b>.",
    "Eat and grow|🐛🍃|A caterpillar eats lots of leaves and grows bigger and bigger.",
    "The big change|🦋|Inside the chrysalis, the caterpillar changes into a butterfly with wings."
  ], [
    "What comes first in a butterfly's life?|egg|🥚||wings,chrysalis",
    "What hatches from a butterfly egg?|caterpillar|🐛||butterfly,chrysalis",
    "What does a caterpillar mostly do?|eat and grow|🍃||fly high,sing",
    "What does a caterpillar make to change inside?|chrysalis|🫘||a nest,a hive",
    "What comes out of the chrysalis?|butterfly|🦋||egg,caterpillar",
    "Which is the last stage?|butterfly|🦋||egg,caterpillar",
    "How many stages are in a butterfly life cycle?|4|🔢||2,7",
    "Which stage has wings?|butterfly|🦋||egg,caterpillar"
  ], "Egg, caterpillar, chrysalis, butterfly, in that order."));
  a.push(L("Frog and chicken life cycles", [
    "Frog cycle|🥚🐸|A frog starts as an egg, then a <b>tadpole</b> with a tail. It grows legs and becomes a frog.",
    "Chicken cycle|🥚🐥🐔|A chicken starts as an egg. A <b>chick</b> hatches, then grows into a hen or rooster.",
    "Every animal changes|🔄|Animals grow and change. Then the adult lays eggs and the cycle starts again."
  ], [
    "A tadpole lives in...|water|💧||a tree,a nest",
    "A tadpole grows into a...|frog|🐸||fish,duck",
    "A chick hatches from an...|egg|🥚||acorn,seed",
    "A chick grows up to be a...|chicken|🐔||frog,duck",
    "What does a tadpole have that a frog does not?|a tail|🐸||four legs,wings",
    "Which comes first for a frog?|egg|🥚||tadpole,adult frog",
    "A frog lays...|eggs|🐸||seeds,pups",
    "Which animal hatches from an egg?|a chick|🐥||a puppy,a calf"
  ], "Follow the animal from egg to adult."));
  a.push(L("Plant life cycle", [
    "From seed to plant|🌰🌱|A seed sprouts into a seedling when it has water and warmth.",
    "Grow up|🌱🌻|The seedling grows leaves, a stem and roots. It becomes an adult plant.",
    "Flowers make seeds|🌻🌰|Flowers make new seeds. The seeds can grow into new plants."
  ], [
    "What does a seed sprout into first?|a seedling|🌱||a fruit,a tree",
    "What does a seed need to sprout?|water and warmth|💧||a TV,paint",
    "Where do new seeds come from?|flowers|🌻||rocks,roots",
    "What does an adult plant make?|seeds|🌰||eggs,milk",
    "Which comes first?|seed|🌰||flower,fruit",
    "A seedling is a young...|plant|🌱||fish,bird",
    "Which part drinks water from the soil?|roots|🌱||petals,seeds",
    "A bean seed can grow into a bean...|plant|🫘||cow,rock"
  ], "A plant begins as a seed and ends by making new seeds."));
  a.push(L("How seeds travel", [
    "Wind|🌼💨|Dandelion seeds have fluffy parts. The wind blows them far away.",
    "Animals|🐿️🌰|Squirrels bury nuts and forget some. Some seeds stick to fur like burrs.",
    "Water and fruit|🥥🍓|Coconuts float on water. Animals eat fruit and drop the seeds."
  ], [
    "What carries dandelion seeds away?|wind|💨||a car,a dog bowl",
    "A squirrel buries nuts. A forgotten nut can grow into a...|tree|🌳||rock,bug",
    "A coconut can travel by...|floating on water|🥥||flying like a bird,digging",
    "Some seeds stick to an animal's...|fur|🐕||hat,backpack",
    "Why do seeds need to travel?|to find space to grow|🌱||to get tired,to meet friends",
    "Maple seeds spin like helicopters through the...|air|🍁||soil,sea",
    "A bird eats a berry and drops the seed far away. This helps the plant...|spread|🐦||disappear,sleep",
    "Which seed is carried by the wind?|dandelion|🌼||coconut,burr"
  ], "Seeds travel by wind, water or animals."));
  a.push(L("Bees and flowers", [
    "Bees visit flowers|🐝🌸|Bees drink sweet <b>nectar</b> from flowers.",
    "Pollen|🌼|Pollen is a yellow dust. It sticks to the bee and gets carried to the next flower.",
    "Helping plants|🍎|When pollen moves between flowers, the flower can make fruit and seeds. This is <b>pollination</b>."
  ], [
    "What sweet drink do bees get from flowers?|nectar|🌸||milk,soda",
    "What yellow dust sticks to a bee?|pollen|🌼||sand,flour",
    "Moving pollen from flower to flower is called...|pollination|🐝||migration,hibernation",
    "Which animal helps pollinate flowers?|a bee|🐝||a shark,a snake",
    "Which other animal visits flowers and helps?|a butterfly|🦋||a crocodile,a crab",
    "After pollination, a flower can make...|seeds|🌰||bricks,socks",
    "Bees make honey from...|nectar|🍯||milk,water only",
    "Pollen sticks to a bee's...|fuzzy body|🐝||nest,honey jar"
  ], "Bees carry pollen while looking for nectar."));
  a.push(L("Hiding and homes", [
    "Camouflage|🦎🌿|Some animals have colors that match their home. This is <b>camouflage</b>. It helps them hide.",
    "Animal homes|🐦🐰🐝|Birds build nests. Rabbits dig burrows. Bees live in hives.",
    "Hiding to stay safe|🫥|Hiding keeps animals safe from hunters and helps hunters sneak up on food."
  ], [
    "Colors that help an animal hide are called...|camouflage|🦎||costumes,paint",
    "A green caterpillar on a green leaf is hard to...|see|🐛||feed,count",
    "A rabbit lives in a...|burrow|🐰||hive,nest in a tree",
    "Bees live in a...|hive|🐝||burrow,den",
    "A bird lays eggs in a...|nest|🪺||hive,puddle",
    "A white arctic hare is hard to see in the...|snow|❄️||grass,sand",
    "Camouflage helps animals stay...|safe|🦎||loud,lost",
    "A stick insect looks like a...|twig|🪵||flower pot,rock"
  ], "Camouflage means matching the background."));
  a.push(L("Winter ways", [
    "Hibernate|🐻😴|Some animals <b>hibernate</b>. They sleep deeply through the cold winter, like bears.",
    "Migrate|🦆✈️|Some animals <b>migrate</b>. They travel to a warmer place for winter, like many birds.",
    "Store food|🐿️|Squirrels gather nuts in autumn so they have food in winter."
  ], [
    "Sleeping deeply through winter is called...|hibernation|🐻||migration,camouflage",
    "Traveling to a warmer place for winter is called...|migration|🦆||hibernation,pollination",
    "Which animal hibernates?|a bear|🐻||a goose,a dolphin",
    "Which animal migrates south for winter?|a goose|🦆||a bear,a snail",
    "Why does a squirrel store nuts?|food for winter|🐿️||to build a toy,to play ball",
    "Why do birds fly south?|it is warmer|🌞||to find snow,to hide",
    "Hibernating animals are...|sleeping|😴||racing,singing",
    "Which season is the coldest?|winter|❄️||summer,spring"
  ], "Some animals sleep, some travel and some store food."));
  a.push(L("Teeth and heart", [
    "Teeth|🦷|We have different teeth. Front teeth <b>bite</b>. Back teeth <b>grind</b> food.",
    "Heart|❤️|Your <b>heart</b> is a muscle that pumps blood around your body. Feel your pulse in your wrist.",
    "Care|🪥🏃|Brush your teeth twice a day. Running and playing make your heart strong."
  ], [
    "Your heart pumps...|blood|❤️||water,air",
    "Back teeth are best at...|grinding food|🦷||singing,waving",
    "How often should you brush your teeth?|twice a day|🪥||once a year,never",
    "What can make your heart strong?|exercise|🏃||sitting all day,skipping lunch",
    "Which food is better for your teeth?|an apple|🍎||a lollipop,a gummy",
    "Your heart is a...|muscle|❤️||bone,tooth",
    "You can feel your heartbeat as a...|pulse|✋||rainbow,smell",
    "What do dentists help you keep healthy?|teeth|🧑‍⚕️||shoes,toys"
  ], "Take care of your heart and your teeth."));
  a.push(MIX("Mixed practice", [a[0], a[1], a[2], a[6], a[7], a[8], a[10], a[12], a[14], a[16]]));
  a.push(MIX("Level 4 Challenge", [a[3], a[4], a[5], a[9], a[11], a[13], a[15], a[17], a[16], a[12]]));

  // ================= LEVEL 5 =================
  const b = [];
  b.push(L("Backbones or not", [
    "Vertebrates|🐕🐟🐦|A <b>vertebrate</b> is an animal with a backbone. Mammals, birds, fish, reptiles and amphibians are vertebrates.",
    "Invertebrates|🐜🐙🪱|An <b>invertebrate</b> has no backbone. Insects, spiders, worms, snails and jellyfish are invertebrates.",
    "Most animals|🌍|About 95 out of every 100 kinds of animals have no backbone."
  ], [
    "An animal with a backbone is a...|vertebrate|🦴||invertebrate,herbivore",
    "An animal without a backbone is an...|invertebrate|🪱||vertebrate,amphibian",
    "Which is a vertebrate?|a horse|🐴||a beetle,a snail",
    "Which is an invertebrate?|a butterfly|🦋||a lizard,a sparrow",
    "Which is an invertebrate?|a jellyfish|🪼||a shark,a frog",
    "Which is a vertebrate?|a frog|🐸||a spider,a worm",
    "A spider is an...|invertebrate|🕷️||vertebrate,mammal",
    "A snake is a...|vertebrate|🐍||invertebrate,insect"
  ], "Does the animal have a backbone inside?"));
  b.push(L("Sorting by traits", [
    "Traits|🔍|A <b>trait</b> is something about an animal, like fur, wings or six legs. We use traits to sort animals.",
    "Warm or cold|🌡️|Mammals and birds are <b>warm-blooded</b>. Fish, reptiles and amphibians are <b>cold-blooded</b>.",
    "Eggs or live babies|🥚🐕|Birds, reptiles, most fish and insects lay eggs. Most mammals give birth to live babies."
  ], [
    "Which animal gives birth to live babies?|a cat|🐈||a hen,a turtle",
    "Which animal lays eggs?|a duck|🦆||a cow,a horse",
    "Which animal is warm-blooded?|a bird|🐦||a lizard,a frog",
    "Which animal is cold-blooded?|a snake|🐍||a dog,a bear",
    "An animal with feathers and wings is a...|bird|🪶||mammal,fish",
    "An animal with six legs and antennae is an...|insect|🐜||reptile,spider",
    "Which trait do ALL mammals share?|they feed milk to babies|🍼||they lay eggs,they have feathers",
    "A trait is a...|feature of a living thing|🔍||kind of food,type of weather"
  ], "Look for the trait that matches."));
  b.push(L("Habitats around the world", [
    "Wet and warm|🌴🦜|A <b>rainforest</b> is warm and rainy with very tall trees. Monkeys, parrots and frogs live there.",
    "Open lands|🦁🦓|A <b>grassland</b> has tall grass and few trees. Zebras and lions live in African grasslands.",
    "Cold and dry|🐧🐪|The <b>polar</b> regions are icy. A <b>desert</b> gets very little rain and may be hot or cold."
  ], [
    "Which habitat gets a lot of rain and has tall trees?|rainforest|🌴||desert,tundra",
    "Which habitat has little rain?|desert|🏜️||rainforest,pond",
    "Which habitat has tall grass and few trees?|grassland|🌾||ocean,rainforest",
    "Where would you find a polar bear?|the Arctic|🐻‍❄️||a desert,a rainforest",
    "Where would you find a cactus?|desert|🌵||ocean,polar ice",
    "Where would you find a toucan?|rainforest|🦜||desert,polar ice",
    "Where do zebras live?|grassland|🦓||the ocean,a pond",
    "Which habitat is made of salty water?|ocean|🌊||desert,grassland"
  ], "Match the weather and land to the habitat."));
  b.push(L("Producers and consumers", [
    "Producers|🌱|<b>Producers</b> make their own food. Plants are producers because they use sunlight.",
    "Consumers|🐰🦊|<b>Consumers</b> cannot make food. They eat plants or animals.",
    "Kinds of consumers|🍽️|Herbivores, carnivores and omnivores are all consumers."
  ], [
    "Which living thing makes its own food?|a plant|🌱||a rabbit,a fox",
    "A rabbit eats grass. A rabbit is a...|consumer|🐰||producer,rock",
    "Grass is a...|producer|🌿||consumer,predator",
    "A fox eats a mouse. A fox is a...|consumer|🦊||producer,plant",
    "Producers get energy from the...|sun|☀️||moon,wind",
    "A tree is a...|producer|🌳||consumer,carnivore",
    "Which one is NOT a producer?|a cow|🐄||a bush,a flower",
    "Consumers get food by...|eating other living things|🍽️||making it from sunlight,sleeping"
  ], "Does it make its own food or eat food?"));
  b.push(L("Food chains", [
    "Who eats whom|☀️🌱🐛🐦|A <b>food chain</b> shows how energy moves. The sun helps grass grow. A grasshopper eats the grass. A frog eats the grasshopper.",
    "Arrows|➡️|Arrows point to what gets the energy. Grass ➡️ rabbit ➡️ fox means the fox eats the rabbit.",
    "Start with a plant|🌿|Most food chains start with a plant, because plants make food from sunlight."
  ], [
    "Which one starts most food chains?|a plant|🌿||a fox,a hawk",
    "In grass ➡️ rabbit ➡️ fox, who eats the rabbit?|the fox|🦊||the grass,the sun",
    "In grass ➡️ cow ➡️ person, who eats the grass?|the cow|🐄||the person,the sun",
    "In leaf ➡️ caterpillar ➡️ bird, who eats the caterpillar?|the bird|🐦||the leaf,the sun",
    "In algae ➡️ small fish ➡️ big fish, what does the small fish eat?|algae|🐟||the big fish,rocks",
    "What gives energy to the plant at the start?|the sun|☀️||the moon,the rain only",
    "The arrow in a food chain points to the...|eater|➡️||food,sun",
    "In seed ➡️ mouse ➡️ owl, which one is the producer?|the seed|🌰||the mouse,the owl"
  ], "Follow the arrows from food to eater."));
  b.push(L("Predator and prey", [
    "Hunters|🐯🦌|A <b>predator</b> hunts and eats other animals. The animal it hunts is the <b>prey</b>.",
    "Predators and prey|🦉🐭|An owl is a predator. A mouse is its prey.",
    "Staying alive|🏃|Prey animals have ways to stay safe: running fast, hiding or living in groups."
  ], [
    "An animal that hunts is a...|predator|🐯||prey,producer",
    "An animal that is hunted is...|prey|🦌||a predator,a plant",
    "A hawk catches a mouse. The mouse is the...|prey|🐭||predator,producer",
    "A lion hunts a zebra. The lion is the...|predator|🦁||prey,plant",
    "A frog catches a fly. The frog is the...|predator|🐸||prey,producer",
    "A zebra runs to escape. It is trying to avoid a...|predator|🦓||seed,cloud",
    "Which is a predator?|a shark|🦈||a rabbit,a deer",
    "Which is usually prey?|a rabbit|🐇||a wolf,an eagle"
  ], "Predators hunt. Prey gets hunted."));
  b.push(L("What plant parts do", [
    "Roots|🌱|Roots hold the plant in place and take in water and minerals from the soil.",
    "Stem and leaves|🌿|The stem holds the plant up and moves water to the leaves. Leaves make food using sunlight.",
    "Flowers and fruit|🌸🍎|Flowers help the plant make seeds. Fruit protects the seeds."
  ], [
    "Which part takes in water from the soil?|roots|🌱||leaves,petals",
    "Which part makes food using sunlight?|leaves|🍃||roots,seeds",
    "Which part holds the plant up?|stem|🌿||flower,fruit",
    "Which part helps make seeds?|flower|🌸||root,stem",
    "Which part protects seeds?|fruit|🍎||root,stem",
    "Which part moves water up to the leaves?|stem|🌿||seed,petal",
    "Roots keep a plant from blowing...|away|🌬️||bigger,sweeter",
    "A carrot is the part of the plant called the...|root|🥕||leaf,flower"
  ], "Each part of a plant has a job."));
  b.push(L("Plants make food", [
    "Photosynthesis|☀️🌿|Plants make their own food with <b>sunlight</b>, <b>water</b> and <b>air</b> (carbon dioxide). This is called photosynthesis.",
    "The kitchen|🍃|The leaves are the plant's kitchen. A green stuff called <b>chlorophyll</b> catches the sunlight.",
    "Oxygen|💨|While making food, plants give off <b>oxygen</b>, the gas we need to breathe."
  ], [
    "Plants make their food using sunlight, water and...|air|💨||soil only,milk",
    "Where does the plant make its food?|in the leaves|🍃||in the roots,in the seeds",
    "What gas do plants give off that we breathe?|oxygen|💨||smoke,steam",
    "What green stuff catches sunlight?|chlorophyll|🍃||pollen,nectar",
    "Making food from sunlight is called...|photosynthesis|☀️||hibernation,migration",
    "A plant kept in a dark closet cannot make much...|food|🚪||noise,smoke",
    "Plants take water in through their...|roots|💧||petals,fruit",
    "Which one is needed for photosynthesis?|sunlight|☀️||candy,music"
  ], "Plants need sun, water and air to make food."));
  b.push(L("Parts of a flower", [
    "Petals|🌸|<b>Petals</b> are colorful. They attract bees and butterflies.",
    "Inside|🌼|The <b>stamen</b> makes pollen. The <b>pistil</b> is in the middle. It has the part that grows into the fruit.",
    "Sepals and stem|🌷|<b>Sepals</b> are small green leaves under the petals. They protect the bud."
  ], [
    "Which flower part is colorful and attracts insects?|petals|🌸||roots,sepals",
    "Which part makes pollen?|stamen|🌼||petal,sepal",
    "Which part is in the middle and grows seeds?|pistil|🌺||stamen,petal",
    "Small green leaves under the petals are called...|sepals|🌷||pistils,stamens",
    "Why are petals bright?|to attract insects|🐝||to scare bees,to hide",
    "Pollen is made by the...|stamen|🌼||sepal,root",
    "Which part protects a flower bud?|sepals|🌷||petals,pollen",
    "After pollination, the pistil can grow into...|fruit with seeds|🍎||a root,a leaf"
  ], "Think about the job of each flower part."));
  b.push(L("Metamorphosis", [
    "Big changes|🐛➡️🦋|Some animals change their body shape a lot as they grow. This is <b>metamorphosis</b>.",
    "Four stages|🥚🐛🫘🦋|Butterflies, bees and beetles go through egg, larva, pupa and adult.",
    "Grasshoppers|🦗|A grasshopper hatches as a small <b>nymph</b> that looks like a tiny adult. It does not have a pupa stage."
  ], [
    "A caterpillar is the larva of a...|butterfly|🐛||grasshopper,spider",
    "The pupa of a butterfly is also called a...|chrysalis|🫘||nymph,larva",
    "Which stage comes after the egg for a butterfly?|larva|🐛||adult,pupa",
    "A baby grasshopper is called a...|nymph|🦗||larva,pupa",
    "Which insect goes through all four stages?|a beetle|🪲||a grasshopper,a cricket",
    "A tadpole changing into a frog is also a big change called...|metamorphosis|🐸||migration,hibernation",
    "Which stage looks like a tiny adult?|nymph|🦗||egg,pupa",
    "The stage that eats the most is the...|larva|🐛||pupa,egg"
  ], "Some insects change a lot, some only grow bigger."));
  b.push(L("Growing up", [
    "Same kind of animal|🐕🐶|A puppy grows up to be a dog. It looks like a small version of its parents.",
    "Growing stages|👶🧒🧑|People grow from baby to child to teen to adult. Adults can have babies of their own.",
    "Life spans|⏳|Different living things live for different times. A mayfly lives a day or two. Some turtles live over 100 years."
  ], [
    "A puppy will grow up to be a...|dog|🐶||cat,horse",
    "A baby person grows to a child, then a teen, then an...|adult|🧑||egg,seed",
    "A kitten looks like a small...|cat|🐱||bird,fish",
    "A life cycle is the stages of a living thing's...|life|🔄||dinner,day",
    "Which lives the longest?|a giant tortoise|🐢||a mayfly,a house fly",
    "Which lives only a day or two as an adult?|a mayfly|🪰||a tortoise,an elephant",
    "Adults can have their own...|babies|👶||cars,keys",
    "A foal grows up to be a...|horse|🐴||cow,sheep"
  ], "Young animals grow up into adults of the same kind."));
  b.push(L("Beaks, feet and fins", [
    "Beaks|🦅🦆|A bird's beak fits its food. An eagle has a sharp, hooked beak to tear meat. A duck has a flat beak to scoop plants.",
    "Feet|🦆🦉|Ducks have webbed feet for paddling. Owls have sharp claws to grab prey.",
    "Body parts with jobs|🐟|An <b>adaptation</b> is a body part or behavior that helps a living thing survive."
  ], [
    "A body part that helps an animal survive is an...|adaptation|🦅||allowance,addition",
    "Webbed feet help a duck...|swim|🦆||climb trees,dig a burrow",
    "An eagle's hooked beak helps it...|tear meat|🦅||sip nectar,crack nuts",
    "A hummingbird's long thin beak helps it sip...|nectar|🐦||fish,seeds",
    "An owl's sharp claws help it...|catch prey|🦉||swim,dig",
    "A fish's fins help it...|swim|🐟||fly,climb",
    "A woodpecker's strong beak helps it...|peck wood|🐦||swim fast,sip nectar",
    "A giraffe's long neck helps it reach...|high leaves|🦒||deep water,the ground"
  ], "How does the body part help the animal?"));
  b.push(L("Plant adaptations", [
    "Desert plants|🌵|A cactus stores water in its thick stem. Its spines protect it and give some shade.",
    "Water plants|🪷|A water lily has wide leaves that float on the water so they can catch sunlight.",
    "Cold and dark|🌲|Pine trees have thin needle leaves. Snow slides off the slanted branches."
  ], [
    "A cactus stores water in its...|stem|🌵||flowers,nest",
    "Cactus spines help to...|protect the plant|🌵||sing,drink",
    "A water lily's leaves float so they can catch...|sunlight|🪷||fish,mud",
    "Pine needles help snow to...|slide off|🌲||stay on,melt in a hurry",
    "Which plant is adapted to a dry place?|a cactus|🌵||a water lily,a lotus in a pond",
    "Which plant is adapted to float?|a water lily|🪷||a cactus,a pine",
    "Why do some plants have thick waxy leaves?|to hold in water|🌿||to be loud,to attract fish",
    "A sunflower turns its head to follow the...|sun|🌻||wind,moon"
  ], "Plants have special parts for where they live."));
  b.push(L("Surviving the seasons", [
    "Hibernation and migration|🐻🦢|Bears hibernate. Many birds, whales and butterflies migrate to find food or warm places.",
    "Changing coats|🐇❄️|Some animals change with the seasons. An arctic fox has a white coat in winter and a brown coat in summer.",
    "Plants too|🍂|Some trees drop their leaves in autumn to save water over winter."
  ], [
    "Which animal travels far to a warm place each year?|a monarch butterfly|🦋||a bear,a snail",
    "Which animal sleeps most of the winter?|a bear|🐻||a goose,a whale",
    "An arctic fox's coat is white in winter so it can...|blend in with snow|🦊||be seen,smell better",
    "Trees that lose their leaves in autumn are saving...|water|🍂||sunlight,seeds",
    "A bird that flies south in autumn is...|migrating|🦢||hibernating,pollinating",
    "Leaves change color in...|autumn|🍁||summer,spring",
    "In winter food is hard to find, so some animals...|hibernate|🐻||swim faster,get taller",
    "A snowshoe hare grows a white coat in...|winter|🐇||summer,spring"
  ], "Animals and plants have ways to get through hard seasons."));
  b.push(L("Bones, muscles and joints", [
    "Skeleton|💀|Your skeleton has 206 bones in an adult. It holds your body up and protects soft parts.",
    "Muscles|💪|Muscles are attached to bones. They pull on bones to make them move. Muscles can only pull, not push.",
    "Joints|🦵|Joints are where two bones meet. Your knee bends like a hinge. Your shoulder moves in many directions."
  ], [
    "Which part of your body protects your brain?|skull|💀||ribs,spine",
    "Which bones protect the heart and lungs?|ribs|🫁||legs,fingers",
    "What do muscles do to bones?|pull them|💪||paint them,freeze them",
    "A place where two bones meet is a...|joint|🦵||tendon,nail",
    "Your knee bends like a...|hinge|🚪||spoon,balloon",
    "The bones of your back make your...|spine|🦴||skull,jaw",
    "Which helps bones stay strong?|calcium from milk or greens|🥛||only candy,soda",
    "Muscles work in pairs. When one pulls, the other...|relaxes|💪||sings,disappears"
  ], "Bones hold you up, muscles move you."));
  b.push(L("Heart, blood and lungs", [
    "Heart|❤️|The heart is a strong muscle. It pumps <b>blood</b> through tubes called blood vessels.",
    "Lungs|🫁|You breathe in air. Your lungs take out <b>oxygen</b> and pass it into your blood.",
    "Delivery|🚚|Blood carries oxygen and food to every part of your body, then returns to the heart."
  ], [
    "What organ pumps blood?|heart|❤️||lungs,stomach",
    "What organs help you breathe?|lungs|🫁||kidneys,ears",
    "The gas your body needs from the air is...|oxygen|💨||smoke,steam",
    "Blood travels through tubes called...|blood vessels|🩸||straws,wires",
    "What does blood carry to your body?|oxygen and food|🚚||toys,paint",
    "When you run, your heart beats...|faster|🏃||slower,not at all",
    "Which organ is a pump?|the heart|❤️||the brain,the skin",
    "Breathing in brings air into your...|lungs|🫁||ears,knees"
  ], "The heart pumps blood. The lungs bring in oxygen."));
  b.push(L("Digestion and healthy food", [
    "Digestion|🍽️|Digestion breaks food into tiny bits your body can use. It starts in the mouth, then the stomach and small intestine.",
    "Nutrients|🥦🍞🥛|<b>Nutrients</b> in food give you energy and help you grow. Carbohydrates give energy. Protein builds the body. Calcium builds bones.",
    "Balance|🥗|Eat many kinds of food: fruits, vegetables, grains, protein and dairy. Drink water."
  ], [
    "Digestion breaks food into...|tiny bits|🍽️||big chunks,paper",
    "Which organ mixes food with juices?|stomach|🍽️||heart,lungs",
    "Where does most digestion finish and take in nutrients?|small intestine|🌀||nose,skull",
    "Which nutrient helps build muscles?|protein|🍗||sugar only,salt",
    "Which food has calcium for strong bones?|milk|🥛||soda,candy",
    "Grains like bread and rice mostly give you...|energy|🍞||bones,eyes",
    "What drink is best when thirsty?|water|💧||soda,sweet tea",
    "A balanced diet has...|many kinds of food|🥗||only one food,only sweets"
  ], "Digestion turns food into nutrients."));
  b.push(L("Traits from parents", [
    "Inherited traits|👪|Living things get traits from their parents. These are <b>inherited</b> traits, like eye color or fur color.",
    "Alike but different|🐶🐶|Puppies look like their parents, but they are not exactly the same.",
    "Plants too|🌻|Seeds from a sunflower grow into sunflowers, not roses."
  ], [
    "Traits passed from parents to young are...|inherited|👪||bought,borrowed",
    "Which is an inherited trait?|eye color|👁️||knowing a song,riding a bike",
    "A tulip seed grows into a...|tulip|🌷||rose,tree frog",
    "Baby ducks look like their...|parents|🦆||toys,shoes",
    "Which trait could a puppy inherit?|fur color|🐕||tricks it learned,a haircut",
    "Do puppies look exactly the same as their parents?|no, a bit different|🐶||yes, perfectly the same,never alike at all",
    "Hair color in people is usually...|inherited|👩‍🦰||learned,bought",
    "Seeds from an apple tree grow into...|apple trees|🍎||oak trees,cars"
  ], "Traits come from parents."));
  b.push(MIX("Mixed practice", [b[0], b[1], b[3], b[4], b[5], b[6], b[9], b[11], b[14], b[15]]));
  b.push(MIX("Level 5 Challenge", [b[2], b[7], b[8], b[10], b[12], b[13], b[16], b[17], b[4], b[5]]));

  // ================= LEVEL 6 =================
  const c = [];
  c.push(L("What is an ecosystem?", [
    "Living and nonliving|🌳💧☀️|An <b>ecosystem</b> is all the living things and nonliving things in a place, all working together.",
    "Living parts|🦊🐛🌿|Living parts are plants, animals, fungi and tiny microbes.",
    "Nonliving parts|🪨💧🌞|Nonliving parts are sunlight, water, soil, rocks, air and temperature."
  ], [
    "Which is a nonliving part of a pond ecosystem?|water|💧||frog,lily",
    "Which is a living part of a forest ecosystem?|a tree|🌳||a rock,sunlight",
    "An ecosystem includes living and...|nonliving things|🌍||only animals,only plants",
    "Which is nonliving?|sunlight|☀️||moss,a beetle",
    "Which is living?|a mushroom|🍄||a pebble,soil",
    "Which is nonliving?|a rock|🪨||an ant,a fern",
    "In a desert, which is a nonliving part?|sand|🏜️||a lizard,a cactus",
    "Which of these is an ecosystem?|a pond with its plants and animals|🏞️||a single frog,a single leaf"
  ], "Is it alive, or was it never alive?"));
  c.push(L("Food webs", [
    "Many chains|🕸️|A <b>food web</b> shows many food chains joined together. Most animals eat more than one kind of food.",
    "Example|🦊🐇🐭🦉|A mouse eats seeds and an owl or fox eats the mouse. A fox also eats rabbits, so the chains join.",
    "If one changes|⚠️|If one living thing disappears, others in the web are affected."
  ], [
    "A food web is made of many linked...|food chains|🕸️||trees,rivers",
    "If rabbits disappear, the foxes might eat more...|mice|🦊||grass,sunlight",
    "In a food web, the producers are the...|plants|🌿||wolves,hawks",
    "Why is a food web better than a food chain at showing feeding?|animals eat many things|🕸️||animals never eat,only plants are in it",
    "If all the grass died, the rabbits would have less...|food|🐇||water,bones",
    "If many owls disappeared, there might be more...|mice|🦉||owls,sunlight",
    "In a food web, which would be a top predator?|a hawk|🦅||a grasshopper,grass",
    "A food web starts with energy from the...|sun|☀️||moon,soil"
  ], "A web connects many chains."));
  c.push(L("Decomposers", [
    "Nature's recyclers|🍄|<b>Decomposers</b> break down dead plants and animals. Mushrooms, bacteria, worms and some bugs are decomposers.",
    "Back to the soil|🌱|They turn dead things into nutrients that go back into the soil so plants can use them.",
    "Without them|🍂|Without decomposers, dead leaves and animals would pile up and the soil would run out of nutrients."
  ], [
    "Which is a decomposer?|a mushroom|🍄||a rabbit,a hawk",
    "Decomposers break down dead plants and...|animals|🍂||rocks,plastic",
    "Decomposers put nutrients back into the...|soil|🌱||clouds,sky",
    "Which animal helps break down leaves in soil?|an earthworm|🪱||an eagle,a deer",
    "Which is a decomposer?|bacteria|🦠||a squirrel,a fox",
    "If there were no decomposers, dead things would...|pile up|🍂||vanish instantly,turn to gold",
    "A fallen log slowly turns into...|soil|🪵||metal,glass",
    "Decomposers are often called nature's...|recyclers|♻️||painters,singers"
  ], "Decomposers break down dead things."));
  c.push(L("Energy from the sun", [
    "Start with sunlight|☀️|Nearly all energy in a food chain starts with the sun. Plants capture it to make food.",
    "Energy moves|⚡|When an animal eats a plant, energy moves to the animal. When a predator eats it, energy moves on.",
    "Less each step|📉|Animals use up some energy to move and stay warm, so less energy goes to the next eater."
  ], [
    "Where does the energy in a food chain start?|the sun|☀️||the soil,the moon",
    "Which living things capture the sun's energy?|plants|🌱||wolves,fish",
    "When a rabbit eats grass, energy moves to the...|rabbit|🐇||sun,soil",
    "Energy in a food chain gets passed by...|eating|🍽️||sleeping,swimming",
    "Why is there less energy at the top of a food chain?|animals use it up along the way|📉||the sun gets tired,plants are heavy",
    "A hawk's energy first came from the...|sun|🦅||ocean floor,wind",
    "Producers are at the ___ of a food chain.|start|🌿||end,middle",
    "Which gives energy to a plant?|sunlight|☀️||darkness,pebbles"
  ], "Follow the energy back to its source."));
  c.push(L("Photosynthesis in detail", [
    "Ingredients|💧💨☀️|Plants take in <b>water</b> through roots, <b>carbon dioxide</b> from the air, and <b>sunlight</b> energy.",
    "Products|🍬💨|They make <b>sugar</b> (food) and give off <b>oxygen</b>.",
    "Where|🍃|It happens in the leaves, in green parts that contain <b>chlorophyll</b>."
  ], [
    "Which gas do plants take in?|carbon dioxide|💨||helium,hydrogen",
    "Which gas do plants give off?|oxygen|💨||smoke,helium",
    "What sugar-food do plants make?|glucose|🍬||milk,meat",
    "What energy do plants use?|sunlight|☀️||electricity,sound",
    "Where do plants take in water?|roots|💧||petals,fruit",
    "Chlorophyll gives leaves their...|green color|🍃||sweet smell,rough skin",
    "Which is NOT needed for photosynthesis?|candy from a shop|🍬||water,sunlight",
    "Plants help us because they give off...|oxygen|🌳||plastic,steam only"
  ], "Water + carbon dioxide + sunlight makes sugar and oxygen."));
  c.push(L("Changing ecosystems", [
    "Natural changes|🔥🌊|Floods, droughts, storms and fires can change an ecosystem quickly.",
    "Slow change|📅|Some changes are slow. A pond can fill with plants over many years and turn into land.",
    "People can change things|🏗️|Building cities, cutting forests or polluting water can harm living things."
  ], [
    "A long time with very little rain is a...|drought|🏜️||flood,blizzard",
    "Too much water covering the land is a...|flood|🌊||drought,breeze",
    "A drought can make plants...|dry out|🥀||grow faster,turn blue",
    "Cutting down a forest removes animals'...|homes|🪓||wishes,socks",
    "Pollution in a river can harm...|fish|🏭||rocks only,clouds",
    "After a forest fire, new plants can slowly...|grow back|🌱||turn to stone,fly away",
    "A change that happens over a long time is...|slow|📅||instant,loud",
    "Which can hurt an ecosystem?|trash dumped in water|🗑️||planting trees,picking up litter"
  ], "Ecosystems can change quickly or slowly."));
  c.push(L("Protecting nature", [
    "Reduce, reuse, recycle|♻️|We can protect nature by reducing waste, reusing things and recycling.",
    "Save water and energy|💧💡|Turn off the tap and the lights when you are not using them.",
    "Help wildlife|🌳🐦|Plant trees, keep litter out of parks and give animals space."
  ], [
    "Putting paper and cans in the right bin is called...|recycling|♻️||wasting,burying",
    "Which saves water?|turning off the tap|🚰||leaving the tap running,washing the car all day",
    "Using a cloth bag again and again is...|reusing|👜||wasting,burning",
    "Which helps animals?|planting trees|🌳||dropping litter,cutting every tree",
    "Which is a way to reduce waste?|bring a refillable bottle|🥤||use a new plastic cup each time,throw things in a river",
    "Turning off lights saves...|energy|💡||sand,toys",
    "Litter in a park can hurt...|animals|🗑️||rainbows,time",
    "What should you do with litter?|put it in a bin|🗑️||leave it on the ground,throw it in a pond"
  ], "How can you take care of nature?"));
  c.push(L("Endangered and extinct", [
    "Endangered|🐼|An animal is <b>endangered</b> when very few are left. Giant pandas were once endangered.",
    "Extinct|🦤|An animal is <b>extinct</b> when none are left alive. Dodo birds and woolly mammoths are extinct.",
    "How to help|💚|We can protect habitats and make rules to keep animals safe."
  ], [
    "When none of a kind are left alive, it is...|extinct|🦤||endangered,migrating",
    "When very few of a kind are left, it is...|endangered|🐼||extinct,common",
    "Which animal is extinct?|dodo|🦤||cat,horse",
    "Which animal is extinct?|woolly mammoth|🦣||elephant,sheep",
    "Losing a habitat can make an animal...|endangered|🌳||famous,taller",
    "Which helps endangered animals?|protecting their habitats|🌳||building on their homes,littering",
    "Many dinosaurs are...|extinct|🦖||endangered only,living in towns",
    "A nature reserve is a place to...|protect wildlife|🏞️||build malls,park cars"
  ], "Few left means endangered. None left means extinct."));
  c.push(L("Fossils", [
    "What is a fossil?|🦴|A <b>fossil</b> is what is left of a plant or animal that lived long ago, usually found in rock.",
    "How they form|🪨|A dead animal is buried in mud or sand. Over millions of years the mud turns to rock and keeps the shape of the bones or shell.",
    "What fossils tell us|🔍|Fossils show us what lived long ago and how living things have changed."
  ], [
    "A fossil is a...|remains of something that lived long ago|🦴||new toy,fresh leaf",
    "Fossils are usually found in...|rock|🪨||the sky,milk",
    "Fossils take about how long to form?|millions of years|⏳||one day,one week",
    "Scientists who study fossils learn about...|ancient life|🔍||tomorrow's weather,candy",
    "A fossil of a seashell on a mountain shows the area was once under...|the sea|🐚||ice cream,sand dunes",
    "Which could become a fossil?|a bone buried in mud|🦴||a melting snowman,a floating bubble",
    "Dinosaur bones found in rock are...|fossils|🦖||seeds,eggs of today",
    "Fossils help us learn about animals that are...|extinct|🦕||still in the zoo,brand new"
  ], "Fossils are old remains kept in rock."));
  c.push(L("Inherited and learned", [
    "Inherited traits|👪|Inherited traits come from parents: eye color, skin color, the shape of a leaf or the stripes of a tiger.",
    "Learned behaviors|📚|Learned behaviors are things you learn, like riding a bike, reading, or a dog learning to sit.",
    "Which one?|🤔|Ask: was I born with it, or did I learn it?"
  ], [
    "Eye color is...|inherited|👁️||learned,bought",
    "Riding a bike is...|learned|🚲||inherited,born in you",
    "A tiger's stripes are...|inherited|🐯||learned,painted on",
    "A dog learning to fetch is a...|learned behavior|🐕||inherited trait,color",
    "Which is NOT inherited?|a scar from a fall|🩹||eye color,hair color",
    "A bird building a nest without being taught is an...|instinct|🪺||homework,hobby",
    "Reading a book is a...|learned skill|📖||inherited trait,color of hair",
    "The shape of a leaf is...|inherited|🍃||learned,drawn by hand"
  ], "Born with it or learned it?"));
  c.push(L("Variation", [
    "No two the same|🌻🌻|Living things of the same kind are a bit different from each other. This is <b>variation</b>.",
    "People|🧑‍🤝‍🧑|People have different heights, hair colors and voices. Even sisters and brothers are different.",
    "Helpful differences|🦌|Variation can help a group survive. If winter is harsh, animals with thicker fur may do better."
  ], [
    "Differences among members of one kind is called...|variation|🌻||migration,pollination",
    "Two dogs of the same kind can differ in...|size and color|🐕||being a cat,number of wings",
    "Variation helps a group to...|survive changes|🦌||get bored,sleep more",
    "Identical twins are alike but still have small...|differences|👯||wings,gills",
    "In a harsh winter, an animal with thicker fur may...|stay warmer|🐻‍❄️||freeze faster,fly",
    "All oak trees are oaks, but their leaves can be slightly...|different|🍃||made of glass,purple stripes",
    "A group of seeds from one plant will be...|slightly different|🌱||exactly identical,all green rocks",
    "Siblings are often...|alike and different|👫||exactly the same,totally unrelated"
  ], "Even the same kind are not exactly alike."));
  c.push(L("Body parts and jobs", [
    "Structure and function|🔧|An animal's body part (its <b>structure</b>) has a job (its <b>function</b>).",
    "Examples|🦆🐢🐈|Webbed feet help ducks swim. A turtle's shell protects it. A cat's whiskers help it feel in the dark.",
    "Teeth|🦷|Sharp teeth tear meat. Flat teeth grind plants."
  ], [
    "A turtle's shell is for...|protection|🐢||flying,singing",
    "Sharp pointed teeth are good for...|tearing meat|🐺||grinding grass,sipping nectar",
    "Flat back teeth are good for...|grinding plants|🐄||tearing meat,spearing fish",
    "A cat's whiskers help it...|feel its way|🐱||fly,hear thunder",
    "A bat's wings help it...|fly|🦇||swim,burrow",
    "A fish's gills help it...|breathe underwater|🐟||climb trees,sing",
    "A camel's hump stores...|fat|🐪||sand,rocks",
    "A skunk's spray is used to...|defend itself|🦨||find food,stay warm"
  ], "Ask what job the body part does."));
  c.push(L("Warm-blooded and cold-blooded", [
    "Warm-blooded|🌡️🐕|<b>Warm-blooded</b> animals keep their body temperature steady. Mammals and birds are warm-blooded.",
    "Cold-blooded|🐍☀️|<b>Cold-blooded</b> animals take their heat from outside. Reptiles, amphibians, fish and insects are cold-blooded.",
    "Staying comfortable|🪨|A lizard sits on a warm rock to heat up and hides in the shade to cool down."
  ], [
    "Which is warm-blooded?|a robin|🐦||a lizard,a frog",
    "Which is cold-blooded?|a snake|🐍||a horse,a sparrow",
    "A lizard warms up by sitting in the...|sun|☀️||shade,fridge",
    "A warm-blooded animal keeps its body temperature...|steady|🌡️||changing with the air,at freezing",
    "Mammals and birds are...|warm-blooded|🐕||cold-blooded,not animals",
    "Which is cold-blooded?|a goldfish|🐠||a dolphin,a bear",
    "A cold-blooded animal is slow on a very cold...|morning|🥶||afternoon in the sun,dream",
    "Which is NOT cold-blooded?|a bat|🦇||a toad,a turtle"
  ], "Does the animal make its own heat?"));
  c.push(L("Vertebrate groups", [
    "Traits that sort|📋|<b>Mammals</b>: hair, milk, lungs. <b>Birds</b>: feathers, beaks, eggs. <b>Reptiles</b>: dry scales, lungs, eggs.",
    "Water groups|🐟🐸|<b>Fish</b>: gills, fins, scales. <b>Amphibians</b>: moist skin, start in water with gills, grow lungs.",
    "A tricky few|🐬🦇🐧|Dolphins live in water but are mammals. Bats fly but are mammals. Penguins swim but are birds."
  ], [
    "Which group has gills all its life?|fish|🐟||reptiles,birds",
    "A dolphin breathes air and feeds milk. It is a...|mammal|🐬||fish,reptile",
    "A bat is a...|mammal|🦇||bird,insect",
    "A penguin is a...|bird|🐧||fish,mammal",
    "Which group has moist skin and a young stage in water?|amphibians|🐸||reptiles,birds",
    "A turtle breathes air with lungs and has a shell. It is a...|reptile|🐢||amphibian,fish",
    "An animal with hair and milk for babies is a...|mammal|🐕||bird,reptile",
    "A platypus lays eggs but feeds milk. It is a...|mammal|🦆||bird,reptile"
  ], "Match the traits to the group."));
  c.push(L("Complete and incomplete change", [
    "Complete metamorphosis|🦋|Egg, larva, pupa, adult. The larva looks very different from the adult. Examples: butterflies, beetles, flies.",
    "Incomplete metamorphosis|🦗|Egg, nymph, adult. The nymph looks like a small adult without wings. Examples: grasshoppers, dragonflies, cockroaches.",
    "Count the stages|🔢|Complete has 4 stages. Incomplete has 3."
  ], [
    "How many stages in complete metamorphosis?|4|🦋||2,3",
    "How many stages in incomplete metamorphosis?|3|🦗||4,5",
    "Which has a pupa stage?|a butterfly|🦋||a grasshopper,a dragonfly",
    "A nymph looks like a small...|adult|🦗||egg,seed",
    "A ladybug larva looks very different from an adult. This is...|complete metamorphosis|🐞||incomplete metamorphosis,no change",
    "A dragonfly nymph lives in water and grows into an adult. This is...|incomplete metamorphosis|🪰||complete metamorphosis,no change",
    "A fly maggot becomes a fly. This is...|complete metamorphosis|🪰||incomplete metamorphosis,hibernation",
    "Which stage is missing in incomplete metamorphosis?|pupa|🫘||egg,adult"
  ], "Does it have a pupa stage?"));
  c.push(L("Pollination to fruit", [
    "Pollination|🐝🌸|Pollen moves from one flower to another, carried by insects, birds or wind.",
    "Fertilization|🌼|The pollen joins with egg cells in the pistil. Then seeds begin to grow.",
    "Fruit|🍎|The flower's base grows into a <b>fruit</b> that holds the seeds. A fruit helps spread seeds."
  ], [
    "Which can carry pollen?|a bee|🐝||a pebble,a cloud",
    "Pollen can also be carried by the...|wind|🌬️||moon,snowman",
    "After pollen joins the egg cell, the flower makes...|seeds|🌰||bricks,legs",
    "A fruit holds the...|seeds|🍎||roots,petals",
    "What happens first?|pollination|🐝||fruit ripens,seed sprouts",
    "A tomato is a fruit because it holds...|seeds|🍅||roots,leaves",
    "Bright petals and sweet nectar help to attract...|pollinators|🌸||predators,rain",
    "Animals that eat fruit help the plant by spreading its...|seeds|🐦||petals,roots"
  ], "Flower, pollen, seeds, fruit."));
  c.push(L("Cells", [
    "Tiny building blocks|🔬|All living things are made of <b>cells</b>. Cells are too small to see without a <b>microscope</b>.",
    "One or many|🦠🧍|Some living things, like bacteria, are made of just one cell. Plants, animals and people have millions of cells.",
    "Cell parts|🟢|Plant cells have a stiff wall and chlorophyll. Animal cells do not. Both have a <b>nucleus</b> that controls the cell."
  ], [
    "All living things are made of...|cells|🔬||rocks,metal",
    "A tool for seeing tiny cells is a...|microscope|🔬||telescope,ruler",
    "Bacteria are made of how many cells?|one|🦠||millions,none",
    "Which cell has chlorophyll?|a plant cell|🌿||an animal cell,a rock",
    "The part that controls the cell is the...|nucleus|🔴||wall,leaf",
    "Your body is made of...|millions of cells|🧍||one cell,no cells",
    "A telescope is used to see...|faraway things|🔭||cells,germs",
    "Which has a stiff cell wall?|a plant|🌱||a dog,a person"
  ], "Cells are the tiny building blocks of life."));
  c.push(L("Brain, nerves and senses", [
    "Command center|🧠|The brain controls your body. <b>Nerves</b> carry messages between the brain and the body.",
    "Senses|👁️👂👃|Your eyes, ears, nose, tongue and skin gather information and send it to the brain.",
    "Fast reflexes|⚡|A <b>reflex</b> is a quick reaction you do not think about, like pulling your hand from something hot."
  ], [
    "Which organ is the body's control center?|brain|🧠||heart,stomach",
    "What carries messages to the brain?|nerves|⚡||bones,hair",
    "A quick reaction without thinking is a...|reflex|⚡||sleep,lesson",
    "Which sense organ is for seeing?|eye|👁️||ear,nose",
    "Which sense organ is for smelling?|nose|👃||tongue,skin",
    "Your tongue helps with...|taste|👅||hearing,sight",
    "Pulling your hand from a hot pan fast is a...|reflex|🔥||dream,lesson",
    "Your skin helps you feel...|touch|✋||sound,light only"
  ], "The brain and nerves control the body."));
  c.push(MIX("Mixed practice", [c[0], c[1], c[2], c[3], c[5], c[6], c[9], c[11], c[13], c[15]]));
  c.push(MIX("Level 6 Challenge", [c[4], c[7], c[8], c[10], c[12], c[14], c[16], c[17], c[1], c[2]]));

  Object.assign(LIFE_LEVELS, { 4: a, 5: b, 6: c });
})();
