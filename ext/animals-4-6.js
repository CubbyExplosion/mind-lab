// ext/animals-4-6.js  Animals & Nature levels 4-6
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
  a.push(L("Backbones or not?", [
    "Vertebrates|🐟🐦🐕|A <b>vertebrate</b> is an animal with a backbone. Fish, birds, mammals, reptiles and amphibians are vertebrates.",
    "Invertebrates|🐛🦋🪼|An <b>invertebrate</b> has no backbone. Insects, spiders, worms, snails and jellyfish are invertebrates.",
    "Most animals|🐜|Most animals on Earth are invertebrates. There are more kinds of insects than any other animal."
  ], [
    "A dog has a backbone. It is a...|vertebrate|🐕||invertebrate,plant",
    "A snail has no backbone. It is an...|invertebrate|🐌||vertebrate,mammal",
    "A butterfly has no backbone. It is an...|invertebrate|🦋||vertebrate,reptile",
    "A goldfish has a backbone. It is a...|vertebrate|🐠||invertebrate,insect",
    "An earthworm has no backbone. It is an...|invertebrate|🪱||vertebrate,mammal",
    "A frog has a backbone. It is a...|vertebrate|🐸||invertebrate,insect",
    "A spider has no backbone. It is an...|invertebrate|🕷️||vertebrate,bird",
    "A parrot has a backbone. It is a...|vertebrate|🦜||invertebrate,insect"
  ], "Does the animal have a backbone inside its body?"));
  a.push(L("Warm and cold bodies", [
    "Warm-blooded|🐻🐦|Mammals and birds are <b>warm-blooded</b>. Their bodies stay about the same warm temperature.",
    "Cold-blooded|🐍🐸🐟|Reptiles, amphibians, fish and insects are <b>cold-blooded</b>. Their body heat changes with the air or water around them.",
    "Basking|☀️🦎|A lizard lies on a warm rock in the sun to heat up. It hides in the shade when it gets too hot."
  ], [
    "A bird is...|warm-blooded|🐦||cold-blooded,not alive",
    "A snake is...|cold-blooded|🐍||warm-blooded,not alive",
    "A cat is...|warm-blooded|🐈||cold-blooded,not alive",
    "A frog is...|cold-blooded|🐸||warm-blooded,not alive",
    "A goldfish is...|cold-blooded|🐠||warm-blooded,not alive",
    "A horse is...|warm-blooded|🐴||cold-blooded,not alive",
    "Why does a lizard lie on a sunny rock?|to warm up|🦎||to cool down,to sleep forever",
    "A penguin is...|warm-blooded|🐧||cold-blooded,not alive"
  ], "Mammals and birds are warm-blooded. The rest are cold-blooded."));
  a.push(L("Butterfly life cycle", [
    "Four stages|🥚🐛🦋|A butterfly goes through four stages: <b>egg</b>, <b>caterpillar</b> (larva), <b>chrysalis</b> (pupa) and <b>adult butterfly</b>.",
    "Eating and growing|🐛🍃|The caterpillar eats leaves all day and grows fast. It sheds its skin as it gets bigger.",
    "Big change|🪺🦋|Inside the chrysalis the caterpillar's body changes. Then a butterfly comes out. This is called <b>metamorphosis</b>."
  ], [
    "What hatches from a butterfly egg?|a caterpillar|🥚||a chrysalis,a butterfly",
    "What does a caterpillar do most of the time?|eats and grows|🐛||flies and drinks nectar,sleeps all day",
    "What stage comes after the caterpillar?|chrysalis|🐛||egg,adult",
    "What comes out of the chrysalis?|a butterfly|🦋||a caterpillar,an egg",
    "What is the first stage of a butterfly's life?|egg|🥚||adult,chrysalis",
    "The big body change from caterpillar to butterfly is called...|metamorphosis|🦋||migration,hibernation",
    "Where does a butterfly lay its eggs?|on a leaf|🍃||in the sea,in a nest",
    "What is the last stage of the life cycle?|adult butterfly|🦋||egg,chrysalis"
  ], "Put the stages in order: egg, caterpillar, chrysalis, butterfly."));
  a.push(L("Frog life cycle", [
    "From egg to tadpole|🥚🐸|A frog lays lots of tiny eggs in water. The eggs hatch into <b>tadpoles</b>.",
    "Growing legs|🐸|A tadpole has a tail and gills, and it swims. Then it grows back legs, then front legs.",
    "Adult frog|🐸🪷|The tail gets shorter and lungs grow. The young frog hops onto land. An adult frog lays eggs, and the cycle starts again."
  ], [
    "Where do frogs lay their eggs?|in water|🥚||on a tree,in a nest",
    "What hatches from a frog egg?|a tadpole|🥚||a froglet only,a caterpillar",
    "A tadpole breathes with...|gills|🐟||wings,feathers",
    "What does a tadpole have that an adult frog does not?|a long tail|🐸||four legs,lungs",
    "Which legs grow first on a tadpole?|back legs|🐸||wings,antennae",
    "An adult frog can live...|in water and on land|🐸||only in the desert,only in the air",
    "A frog is an...|amphibian|🐸||insect,mammal",
    "What is the first stage of a frog's life?|egg|🥚||adult,tadpole"
  ], "A frog starts in water as an egg."));
  a.push(L("Chicken life cycle", [
    "The egg|🥚|A hen sits on her eggs to keep them warm. After about 21 days, a chick hatches.",
    "The chick|🐣|A chick uses a small egg tooth to crack the shell. Its fluffy feathers are called <b>down</b>.",
    "Growing up|🐥🐔|The chick grows real feathers. A young female is a <b>pullet</b> and a grown female is a <b>hen</b>. A male is a <b>rooster</b>."
  ], [
    "A chicken starts life as an...|egg|🥚||chick,adult",
    "A baby chicken is called a...|chick|🐣||calf,kitten",
    "A grown female chicken is a...|hen|🐔||rooster,chick",
    "A grown male chicken is a...|rooster|🐓||hen,chick",
    "A hen keeps her eggs...|warm|🥚||wet,cold",
    "A fluffy baby chick is covered with...|down|🐥||scales,fur",
    "A chick cracks the shell with its...|egg tooth|🐣||wing,tail",
    "About how long does a chicken egg take to hatch?|21 days|🥚||2 days,6 months"
  ], "Think of the order: egg, chick, adult."));
  a.push(L("Bird beaks", [
    "Beaks differ|🦜🦆🦅|A bird's <b>beak</b> is shaped for the food it eats.",
    "Beak jobs|🦅🦉|Eagles and owls have a sharp, hooked beak for tearing meat. Seed eaters like finches have a short, strong beak for cracking seeds.",
    "More beaks|🦆🦩🐦|Ducks have a flat beak for scooping in water. A hummingbird has a long thin beak for sipping nectar."
  ], [
    "Which beak is best for tearing meat?|a sharp hooked beak|🦅||a flat wide beak,a long thin beak",
    "Which bird sips nectar with a long thin beak?|hummingbird|🐦||eagle,duck",
    "Which beak is good for cracking seeds?|a short strong beak|🐤||a flat wide beak,a long thin beak",
    "A duck's flat beak helps it...|scoop food in water|🦆||tear meat,crack nuts",
    "An eagle has a hooked beak because it eats...|meat|🦅||nectar,seeds",
    "Which bird has a long beak for probing mud?|a sandpiper|🏖️||an eagle,a finch",
    "What shapes a bird's beak?|the food it eats|🦜||its color,its name",
    "A woodpecker uses its strong beak to...|peck into trees|🪵||sip nectar,scoop water"
  ], "The beak fits the food."));
  a.push(L("Bird feet", [
    "Feet are tools|🦆🦅🐓|Birds' feet fit their lives. Look at the feet to guess how the bird lives.",
    "Walking and swimming|🦆🐔|Ducks have <b>webbed feet</b> for paddling. Chickens have strong toes for scratching the ground.",
    "Grabbing and perching|🦅🦜|Eagles and owls have sharp <b>talons</b> for catching food. Small songbirds have toes that grip a branch."
  ], [
    "Which feet help a duck swim?|webbed feet|🦆||sharp talons,long hooves",
    "Eagles catch food with their...|talons|🦅||webbed toes,fins",
    "A chicken scratches the ground with its...|strong toes|🐔||flippers,paws",
    "A songbird holds a branch with its...|gripping toes|🐦||fins,hooves",
    "A bird with webbed feet probably lives near...|water|🦢||deserts only,caves only",
    "Owls have sharp feet called...|talons|🦉||flippers,hooves",
    "Which bird is best at paddling?|a duck|🦆||an eagle,an owl",
    "Which bird grabs prey with its feet?|an owl|🦉||a duck,a goose"
  ], "Look at the shape of the feet."));
  a.push(L("Animal senses", [
    "Five senses|👀👂👃|Many animals use sight, hearing, smell, taste and touch to find food and stay safe.",
    "Super smell and hearing|🐕🦇|A dog has a very strong sense of smell. A bat has big ears that hear very well in the dark.",
    "Other senses|🐍🐱|A cat's whiskers feel nearby things. A snake flicks its tongue to taste the air. Eagles see far away."
  ], [
    "Which animal has an amazing sense of smell?|a dog|🐕||a fish,a snail",
    "Which sense do an eagle's sharp eyes use?|sight|🦅||smell,taste",
    "A cat's whiskers help it...|feel things nearby|🐱||see far away,hear music",
    "A snake flicks its tongue to...|taste the air|🐍||sing,cool down",
    "Which animal hears very well in the dark?|a bat|🦇||a cow,a hen",
    "Big ears help a rabbit to...|hear danger|🐰||find honey,climb trees",
    "A bear can smell food from very...|far away|🐻||close only,under water only",
    "Which sense helps an owl hunt at night?|hearing|🦉||touch,taste"
  ], "Which sense does the animal use most?"));
  a.push(L("Hiding with camouflage", [
    "Blend in|🦎🌿|<b>Camouflage</b> means looking like the place around you. It helps an animal hide.",
    "Colors and shapes|🐸🦋|A green frog hides in green leaves. A stick insect looks just like a twig.",
    "Why hide?|🐻‍❄️❄️|Hiding keeps animals safe from predators. A hunter can also hide to sneak up on its food. A polar bear's white fur blends with snow."
  ], [
    "Looking like the place around you is called...|camouflage|🦎||hibernation,migration",
    "A stick insect looks like a...|twig|🌿||rock,flower",
    "A polar bear's white fur blends with...|snow|❄️||grass,sand",
    "Why does camouflage help a prey animal?|it hides from predators|🐸||it makes noise,it grows bigger",
    "A green frog hides best among...|green leaves|🍃||red flowers,snow",
    "A tan lion hides in dry...|grass|🦁||snow,water",
    "A hunter can use camouflage to...|sneak up on food|🐆||sing loudly,fly away",
    "A flounder fish blends with the...|sea floor|🐟||sky,trees"
  ], "Camouflage means blending in."));
  a.push(L("Hibernation", [
    "A long winter sleep|🐻😴|Some animals <b>hibernate</b>. They sleep deeply through the cold winter when food is hard to find.",
    "Who hibernates?|🦔🐿️🦇|Bears, hedgehogs, bats and groundhogs hibernate. Their bodies slow down to save energy.",
    "Getting ready|🍂🌰|Before winter, animals eat lots of food to build up body fat. They find a safe cozy den."
  ], [
    "A long deep sleep in winter is called...|hibernation|🐻||migration,camouflage",
    "Why do animals hibernate?|food is hard to find in winter|❄️||they are bored,it is too hot",
    "Which animal hibernates?|a groundhog|🦫||a cow,a hen",
    "What do animals do before they hibernate?|eat a lot|🍂||run a race,build a boat",
    "While hibernating, an animal's body...|slows down|😴||speeds up,gets bigger",
    "Where does a bear hibernate?|in a den|🐻||in a pond,on a branch",
    "Which animal can hibernate in a cave?|a bat|🦇||a duck,a pig",
    "In which season do animals hibernate?|winter|❄️||summer,spring"
  ], "Hibernating animals sleep through the cold season."));
  a.push(L("Migration", [
    "Going on a trip|🦆✈️|<b>Migration</b> is when animals travel a long way to find food or a warmer place, then come back.",
    "Migrating animals|🦋🐋🦢|Monarch butterflies, geese, whales and caribou all migrate.",
    "Why migrate?|🌤️|Many birds fly south in fall to find warm weather and food. They return north in spring."
  ], [
    "A long trip animals make each year is called...|migration|🦆||hibernation,camouflage",
    "Many birds fly south in...|fall|🍂||spring,never",
    "Why do many birds migrate?|to find food and warm weather|🦢||to take a nap,to build a house",
    "Which butterfly makes a long trip each year?|monarch|🦋||swallowtail,moth",
    "Which sea giant migrates long distances?|a whale|🐋||a snail,a seahorse",
    "Geese often fly in the shape of a...|V|🦆||circle,square",
    "Do migrating animals come back?|yes, the next season|🔁||never again,only once ever",
    "Geese usually fly north in...|spring|🌸||winter,midnight"
  ], "Migration means travelling a long way and coming back."));
  a.push(L("Day and night animals", [
    "Diurnal|☀️🐿️|A <b>diurnal</b> animal is awake in the day and sleeps at night. Squirrels and most birds are diurnal.",
    "Nocturnal|🌙🦉|A <b>nocturnal</b> animal is awake at night and sleeps in the day. Owls, bats and raccoons are nocturnal.",
    "Night helpers|👀|Nocturnal animals have big eyes or great hearing to find their way in the dark."
  ], [
    "An animal awake at night is...|nocturnal|🌙||diurnal,hibernating",
    "An animal awake in the daytime is...|diurnal|☀️||nocturnal,migrating",
    "Which animal is nocturnal?|an owl|🦉||a squirrel,a robin",
    "Which animal is diurnal?|a squirrel|🐿️||a bat,an owl",
    "Bats are...|nocturnal|🦇||diurnal,plants",
    "Most songbirds are...|diurnal|🐦||nocturnal,cold-blooded",
    "Nocturnal animals sleep during the...|day|☀️||night,winter only",
    "Which is nocturnal?|a raccoon|🦝||a butterfly,a chicken"
  ], "Nocturnal = night. Diurnal = day."));
  a.push(L("Pollinators", [
    "Flowers need help|🌼🐝|<b>Pollen</b> is a yellow dust inside flowers. To make seeds, a flower needs pollen to move to another flower.",
    "Helpful animals|🐝🦋🐦|Bees, butterflies, hummingbirds and bats carry pollen as they visit flowers for nectar. They are <b>pollinators</b>.",
    "Why it matters|🍎🍓|Pollinators help make many fruits and vegetables. We need them!"
  ], [
    "Animals that carry pollen are called...|pollinators|🐝||predators,herbivores",
    "A bee visits flowers to collect...|nectar and pollen|🐝||fish,leaves only",
    "Which animal is a pollinator?|a butterfly|🦋||a shark,a snake",
    "What is pollen?|a yellow dust from flowers|🌼||a kind of water,a bug",
    "Pollinators help flowers make...|seeds and fruit|🍎||rocks,rain",
    "Which tiny bird sips nectar and pollinates flowers?|hummingbird|🐦||penguin,owl",
    "What do bees make from nectar?|honey|🍯||milk,wool",
    "Why do we need pollinators?|they help make fruit and veggies|🍓||they make electricity,they clean the sky"
  ], "Pollinators carry pollen from flower to flower."));
  a.push(L("Spiders are not insects", [
    "Spiders|🕷️|A spider has <b>eight legs</b> and two body parts. It has no wings and no antennae. Spiders are <b>arachnids</b>.",
    "Insects|🐜|An insect has <b>six legs</b>, three body parts and two antennae. Many insects have wings.",
    "Spider webs|🕸️|Many spiders spin silk into webs to catch insects to eat."
  ], [
    "How many legs does a spider have?|8|🕷️||6,4",
    "How many legs does an insect have?|6|🐜||8,10",
    "A spider is an...|arachnid|🕷️||insect,reptile",
    "Which one has antennae?|an ant|🐜||a spider,a scorpion",
    "Which one is NOT an insect?|a spider|🕷️||a beetle,a bee",
    "A spider web is made of...|silk|🕸️||plastic,wool",
    "How many body parts does an insect have?|3|🐞||2,5",
    "Which one has eight legs?|a scorpion|🦂||a fly,a beetle"
  ], "Count the legs: insects 6, spiders 8."));
  a.push(L("Water mammals and fish", [
    "Not a fish!|🐬🐋|Dolphins and whales live in the sea but are <b>mammals</b>. They breathe air through a blowhole and feed milk to their babies.",
    "Fish|🐟🦈|Fish breathe underwater with <b>gills</b>. A shark is a fish, not a mammal.",
    "Other swimmers|🦭🐙|Seals are mammals that swim. An octopus is neither a fish nor a mammal. It is an invertebrate."
  ], [
    "A dolphin is a...|mammal|🐬||fish,reptile",
    "A shark is a...|fish|🦈||mammal,bird",
    "Whales breathe through a...|blowhole|🐋||gill,beak",
    "Fish breathe with...|gills|🐠||lungs only,wings",
    "A seal is a...|mammal|🦭||fish,insect",
    "An octopus has no backbone. It is an...|invertebrate|🐙||mammal,fish",
    "Which one feeds milk to its babies?|a whale|🐋||a shark,a goldfish",
    "Which one is a fish?|a seahorse|🐠||a dolphin,a seal"
  ], "Does it breathe air or use gills?"));
  a.push(L("Animal group names", [
    "Groups of animals|🐄🐟🐦|Many animals live in groups. A group often has its own name.",
    "Common ones|🐑🐟|A group of cows is a <b>herd</b>. A group of fish is a <b>school</b>. A group of birds is a <b>flock</b>.",
    "Fun ones|🐺🦁|A group of wolves is a <b>pack</b>. A group of lions is a <b>pride</b>. A group of bees is a <b>swarm</b>."
  ], [
    "A group of fish is a...|school|🐟||herd,pack",
    "A group of cows is a...|herd|🐄||flock,pride",
    "A group of birds is a...|flock|🐦||school,pack",
    "A group of wolves is a...|pack|🐺||herd,swarm",
    "A group of lions is a...|pride|🦁||school,flock",
    "A group of bees is a...|swarm|🐝||herd,pack",
    "A group of sheep is a...|flock|🐑||pride,school",
    "A group of elephants is a...|herd|🐘||pack,swarm"
  ], "Each animal group has its own special name."));
  a.push(L("What animals need", [
    "Four needs|🍎💧🏠|All animals need <b>food</b>, <b>water</b>, <b>air</b> and <b>shelter</b> (a safe place).",
    "Habitat|🌳🏞️|A <b>habitat</b> is the place that gives an animal what it needs.",
    "Change a habitat|🚧|If a habitat gets cut down or polluted, animals may not find what they need."
  ], [
    "A place where an animal finds food, water and shelter is a...|habitat|🌳||museum,invention",
    "Which is a need of every animal?|water|💧||toys,video games",
    "Shelter helps an animal stay...|safe|🏠||bored,loud",
    "Which is NOT a need of an animal?|a phone|📱||food,air",
    "What do animals get from air?|oxygen|💨||sugar,wool",
    "What happens if a pond dries up?|animals lose water to drink|🏜️||animals get more food,nothing changes",
    "What does a bird use for shelter?|a nest|🪺||a plate,a bus",
    "Animals get energy from...|food|🍎||shade only,rocks"
  ], "Think about food, water, air and shelter."));
  a.push(L("Animal babies and parents", [
    "Parent care|🐧🐣|Some animals take care of their babies for a long time. Others leave them after they hatch.",
    "Caring parents|🐘🐧|Elephant mothers and aunts guard the calf. A penguin dad keeps the egg warm on his feet.",
    "On their own|🐢🐍|Baby sea turtles hatch and crawl to the sea by themselves. Most snakes do not look after their eggs."
  ], [
    "Who keeps a penguin egg warm in the cold?|the dad penguin|🐧||the fish,a seal",
    "Baby sea turtles go to the sea...|by themselves|🐢||carried by mom,in a bus",
    "A herd of elephants helps guard the...|calf|🐘||nest,hive",
    "Baby mammals get food by drinking...|milk|🍼||sand,seeds",
    "A bird parent brings food to its babies in the...|nest|🪺||ocean,burrow",
    "Why do parents feed their babies?|so the babies can grow|🍼||for no reason,to make them sleepy",
    "A mother bear protects her...|cubs|🐻||eggs only,den walls",
    "Who sits on a hen's eggs to keep them warm?|the hen|🐔||the farmer's dog,a fox"
  ], "Some parents care for their young. Others do not."));
  a.push(MIX("Mixed practice", [a[0], a[1], a[2], a[5], a[8], a[9], a[10], a[12], a[13]]));
  a.push(MIX("Level 4 Challenge", [a[3], a[4], a[6], a[7], a[11], a[14], a[15], a[16], a[17], a[0], a[10]]));

  // ================= LEVEL 5 =================
  const b = [];
  b.push(L("Sorting by traits", [
    "Use clues|🔍|Scientists sort animals by their <b>traits</b>, such as body covering, how they breathe and how they have babies.",
    "Five vertebrate groups|🐟🐸🐍🐦🐕|<b>Fish</b> have gills and fins. <b>Amphibians</b> have moist skin. <b>Reptiles</b> have dry scales. <b>Birds</b> have feathers. <b>Mammals</b> have hair.",
    "Be careful|🐋🦇|A whale looks like a fish and a bat flies like a bird. But both have hair and feed milk, so they are mammals."
  ], [
    "An animal has moist skin, starts life in water and later lives on land. It is an...|amphibian|🐸||reptile,mammal",
    "An animal has feathers and lays eggs. It is a...|bird|🐦||mammal,reptile",
    "An animal has dry scales and lays leathery eggs on land. It is a...|reptile|🐊||amphibian,fish",
    "An animal has gills and fins all its life. It is a...|fish|🐟||amphibian,reptile",
    "An animal has hair and feeds milk to its young. It is a...|mammal|🐕||bird,reptile",
    "A bat can fly but has fur and feeds milk. It is a...|mammal|🦇||bird,insect",
    "A penguin cannot fly but has feathers. It is a...|bird|🐧||fish,mammal",
    "A salamander has moist skin and lives near water. It is an...|amphibian|🦎||reptile,fish"
  ], "Look at the traits, not at where it lives."));
  b.push(L("Producers and consumers", [
    "Producers|🌱☀️|<b>Producers</b> make their own food using sunlight. Plants are producers.",
    "Consumers|🐇🦊|<b>Consumers</b> eat other living things. Animals are consumers. Plant eaters are <b>primary consumers</b>; animals that eat them are <b>secondary consumers</b>.",
    "Food chain|🌿🐇🦊|A food chain shows who eats what. The arrow points to the one that gets the energy: grass → rabbit → fox."
  ], [
    "In a food chain, plants are the...|producers|🌱||consumers,decomposers",
    "A rabbit that eats grass is a...|consumer|🐇||producer,rock",
    "Where does a plant get its energy?|the sun|☀️||the soil only,a rabbit",
    "In grass → rabbit → fox, the fox eats the...|rabbit|🦊||grass,sun",
    "In grass → rabbit → fox, which is the producer?|grass|🌿||rabbit,fox",
    "An animal that eats only plants is a...|primary consumer|🐛||producer,secondary consumer",
    "A fox that eats a rabbit is a...|secondary consumer|🦊||producer,primary consumer",
    "In a food chain the arrow shows the flow of...|energy|➡️||sound,color"
  ], "Producers make food. Consumers eat."));
  b.push(L("Food webs and decomposers", [
    "Food web|🕸️|Most animals eat more than one thing, so many food chains connect. Together they make a <b>food web</b>.",
    "Decomposers|🍄🪱|<b>Decomposers</b> break down dead plants and animals. Mushrooms, bacteria and worms are decomposers.",
    "Recycling nature|🌱|Decomposers put nutrients back in the soil, and new plants use them to grow."
  ], [
    "Many food chains linked together make a...|food web|🕸️||food bank,food line",
    "Mushrooms are...|decomposers|🍄||producers,predators",
    "Decomposers break down...|dead plants and animals|🍂||living rocks,sunlight",
    "Decomposers put what back into the soil?|nutrients|🌱||plastic,sound",
    "Which is a decomposer?|an earthworm|🪱||a lion,an eagle",
    "Why is a web a better picture than a chain?|animals eat more than one thing|🕸️||animals eat nothing,plants walk",
    "If one animal disappears from a web...|other animals can be affected|⚠️||nothing changes ever,the sun goes out",
    "Dead leaves on the forest floor are broken down by...|decomposers|🍂||predators,producers"
  ], "Decomposers clean up and return nutrients."));
  b.push(L("Predator and prey", [
    "Hunter and hunted|🦁🦓|A <b>predator</b> hunts other animals for food. The animal it eats is the <b>prey</b>.",
    "Predator tools|🦅🐅|Predators have sharp teeth or claws, strong legs or sharp eyes to catch prey.",
    "Prey tools|🐇🦌|Prey animals have ways to escape: speed, hiding, big ears to hear danger, or living in herds."
  ], [
    "An animal that hunts other animals is a...|predator|🦁||prey,producer",
    "An animal that is hunted is...|prey|🦓||a predator,a hunter",
    "A hawk eats a mouse. The mouse is the...|prey|🐭||predator,producer",
    "A wolf eats a deer. The wolf is the...|predator|🐺||prey,decomposer",
    "Why do zebras live in herds?|more eyes watch for danger|🦓||to hunt lions,to eat meat",
    "Sharp claws help a predator...|catch prey|🐅||hide in mud,grow grass",
    "Rabbits escape predators by...|running fast|🐇||hunting wolves,growing tall",
    "A frog eats a fly. The frog is the...|predator|🐸||prey,producer"
  ], "Predators hunt; prey gets hunted."));
  b.push(L("Adaptations", [
    "What is an adaptation?|🧬|An <b>adaptation</b> is a body part or a behavior that helps a living thing survive where it lives.",
    "Body adaptations|🐘🦒🦆|An elephant's trunk grabs food. A giraffe's long neck reaches high leaves. A duck's webbed feet help it swim.",
    "Behavior adaptations|🐻🦆|Hibernating, migrating and living in groups are adaptations in behavior."
  ], [
    "A body part or behavior that helps survival is an...|adaptation|🧬||adventure,addition",
    "A giraffe's long neck helps it reach...|high leaves|🦒||deep water,small seeds",
    "A duck's webbed feet help it...|swim|🦆||climb trees,dig holes",
    "A woodpecker's sharp beak helps it...|peck into wood|🪵||swim fast,sip nectar",
    "Which is a behavior adaptation?|migrating south for winter|🦢||having green feathers,a long tail",
    "A camel's hump stores...|fat|🐪||water only,sand",
    "A polar bear's thick fur helps it...|stay warm|🐻‍❄️||climb trees,swim faster than fish",
    "A mole's strong front claws help it...|dig|🐭||fly,swim"
  ], "An adaptation helps an animal live in its home."));
  b.push(L("Instinct and learning", [
    "Instinct|🐢🌊|An <b>instinct</b> is something an animal knows how to do without being taught. A baby sea turtle heads for the sea by instinct.",
    "Learned behavior|🐕🎓|A <b>learned behavior</b> is something an animal is taught or figures out. A dog learns to sit. A young lion learns to hunt by watching its mother.",
    "Both|🐦|A bird knows by instinct how to build a nest, but a songbird learns its song by hearing other birds."
  ], [
    "Knowing what to do without being taught is...|instinct|🐢||learning,magic",
    "A dog learning to sit is a...|learned behavior|🐕||instinct,migration",
    "A baby spider spinning a web is...|instinct|🕷️||learned from school,copying a dog",
    "A chimp learning to use a stick tool from its mother is...|learned behavior|🐒||instinct,hibernation",
    "A baby sea turtle crawling to the sea is...|instinct|🐢||learned behavior,a trick",
    "A young lion learns to hunt by...|watching its mother|🦁||reading books,sleeping",
    "A bird building its nest uses...|instinct|🪺||a map,a lesson book",
    "A dolphin trained to jump through a hoop shows...|learned behavior|🐬||instinct only,hibernation"
  ], "Was it born knowing it, or did it learn?"));
  b.push(L("Camouflage and mimicry", [
    "Blending in|🦎|<b>Camouflage</b> helps an animal blend with its surroundings.",
    "Mimicry|🐝🪰|<b>Mimicry</b> is when an animal looks like something else. A hoverfly has yellow and black stripes like a bee, so predators leave it alone.",
    "Warning colors|🐸🔴|Bright colors can warn \"I taste bad or am poisonous.\" A poison dart frog's bright colors warn predators to stay away."
  ], [
    "A hoverfly looking like a bee is an example of...|mimicry|🪰||hibernation,migration",
    "Bright colors on a poison dart frog are a...|warning|🐸||camouflage,disguise as a leaf",
    "A moth with wings like tree bark uses...|camouflage|🦋||a warning color,hibernation",
    "A leaf insect looks like a leaf. This helps it...|hide|🍃||sing,swim",
    "A harmless animal that looks like a dangerous one is using...|mimicry|🐍||camouflage only,speed",
    "Why do predators avoid a hoverfly?|it looks like a stinging bee|🪰||it is very loud,it is huge",
    "Which animal changes color to blend in?|a chameleon|🦎||a cow,a duck",
    "A walking stick insect looks like a...|twig|🌿||rock,flower"
  ], "Does the animal blend in, or copy something else?"));
  b.push(L("How animals communicate", [
    "Sending messages|🐺🐝|Animals send messages to warn, find friends or find food.",
    "Sounds and dances|🐋🐝🐦|Whales sing to each other. Birds sing to mark their space. A honeybee does a <b>waggle dance</b> to show others where flowers are.",
    "Smell and signals|🐜🐕|Ants leave smell trails for others to follow. Dogs wag tails and use smell to say hello."
  ], [
    "A honeybee shows where flowers are with a...|waggle dance|🐝||song,letter",
    "Ants follow a trail of...|smell|🐜||light,sound",
    "Whales talk to each other with...|songs and clicks|🐋||letters,flags",
    "Why do birds sing?|to talk and mark their space|🐦||to chop wood,to dig holes",
    "A beaver slaps its tail on the water to...|warn others|🦫||sing a song,find food",
    "A wolf's howl helps the pack to...|find each other|🐺||sleep,learn math",
    "A cat hisses to say...|stay back|🐱||I am hungry for flowers,hello friend",
    "Fireflies flash light to...|signal to each other|✨||cook food,scare the moon"
  ], "How does the animal send its message?"));
  b.push(L("Complete and incomplete change", [
    "Complete metamorphosis|🦋🐞|Butterflies, beetles, bees and flies go through four stages: egg, <b>larva</b>, <b>pupa</b>, adult. The young looks very different from the adult.",
    "Incomplete metamorphosis|🦗🦟|Grasshoppers and dragonflies have three stages: egg, <b>nymph</b>, adult. A nymph looks like a small adult without wings.",
    "No pupa!|🦗|With incomplete change there is no pupa stage. The nymph sheds its skin as it grows until it is an adult."
  ], [
    "How many stages in complete metamorphosis?|4|🦋||2,3",
    "How many stages in incomplete metamorphosis?|3|🦗||4,5",
    "A grasshopper's young is called a...|nymph|🦗||larva,pupa",
    "A caterpillar is a...|larva|🐛||nymph,pupa",
    "Which insect has a pupa stage?|a beetle|🐞||a grasshopper,a dragonfly",
    "Which insect has a nymph stage?|a dragonfly|🦟||a butterfly,a bee",
    "In complete change, the stage after the larva is the...|pupa|🦋||nymph,egg",
    "A nymph looks like a small...|adult without wings|🦗||egg,caterpillar"
  ], "Does it have a pupa stage or not?"));
  b.push(L("Desert animals", [
    "Hot and dry|🏜️|Deserts get very little rain and can be very hot. Desert animals have adaptations to save water.",
    "Staying cool|🐪🦊|A camel stores fat in its hump and can go many days without a drink. A fennec fox has big ears that let heat escape.",
    "Hiding from heat|🦎🦂|Many desert animals are nocturnal or dig burrows to stay cool in the day. A kangaroo rat gets water from the seeds it eats."
  ], [
    "A camel's hump stores...|fat|🐪||water,sand",
    "A fennec fox's big ears help it...|let out heat|🦊||swim,climb",
    "Why are many desert animals active at night?|it is cooler|🌙||it is wetter,it is snowy",
    "Many desert animals dig a...|burrow|🕳️||pond,nest in a palm",
    "Deserts get very little...|rain|🏜️||sunlight,sand",
    "A desert tortoise stays cool by...|staying in a burrow|🐢||swimming in a lake,flying south",
    "A kangaroo rat gets water mostly from...|the seeds it eats|🐭||lakes,rain puddles",
    "Which animal lives in the desert?|a camel|🐪||a penguin,a walrus"
  ], "Think about how to save water and stay cool."));
  b.push(L("Arctic animals", [
    "Freezing cold|🧊|The Arctic is around the North Pole. It is cold, icy and windy.",
    "Staying warm|🐻‍❄️|A polar bear has thick fur and a layer of fat called <b>blubber</b>. Seals and walruses also have blubber.",
    "Winter changes|🦊🐇|An Arctic fox and a snowshoe hare grow white fur in winter to blend with the snow."
  ], [
    "A layer of fat that keeps animals warm is called...|blubber|🦭||blossom,bubble",
    "An Arctic fox's winter fur is...|white|🦊||green,red",
    "Which animal lives in the Arctic?|a polar bear|🐻‍❄️||a camel,a zebra",
    "Penguins live mostly near the...|South Pole|🐧||North Pole,equator",
    "A walrus has long...|tusks|🦭||wings,horns",
    "Why is a white coat helpful in winter?|it blends with snow|❄️||it is shiny,it is loud",
    "Polar bears have black skin to...|soak up warmth|🐻‍❄️||look pretty,scare seals",
    "Which animal lives in the Arctic and has big antlers?|caribou|🦌||a lion,a monkey"
  ], "Arctic animals need ways to stay warm."));
  b.push(L("Rainforest layers", [
    "Four layers|🌴|A rainforest has four layers: the <b>emergent layer</b> (tops), the <b>canopy</b>, the <b>understory</b> and the <b>forest floor</b>.",
    "Up high|🦜🐒|The canopy is a thick roof of leaves. Monkeys, parrots, toucans and sloths live there.",
    "Down low|🐆🐍|The dark floor has fallen leaves, fungi and insects. Jaguars hunt there. A lot of rain falls all year."
  ], [
    "The thick leafy roof of a rainforest is the...|canopy|🌳||floor,desert",
    "The bottom layer of a rainforest is the...|forest floor|🍂||canopy,sky",
    "The tallest trees poke through the...|emergent layer|🌲||understory,floor",
    "Where do toucans and parrots mostly live?|in the canopy|🦜||on the forest floor,underground",
    "How much rain does a rainforest get?|a lot, all year|🌧️||almost none,only in winter",
    "Which layer is in the middle, under the canopy?|understory|🌿||emergent layer,desert",
    "Why is the forest floor dark?|the canopy blocks the sun|🌑||there is no sun,it is always night",
    "Which animal lives on the forest floor?|a jaguar|🐆||a toucan,a sloth"
  ], "Think from the top of the trees down to the ground."));
  b.push(L("Coral reefs", [
    "A reef is alive|🪸🐠|A coral reef is made of tiny animals called <b>coral polyps</b>. They build hard skeletons that pile up over many years.",
    "A busy home|🐠🐢🦈|Reefs are warm, shallow and sunny. Thousands of kinds of fish, turtles and sea stars live there.",
    "Reefs need care|🌊|Dirty water and warming oceans can hurt corals. Healthy reefs protect shores and give homes to fish."
  ], [
    "Corals are...|tiny animals|🪸||rocks only,plants",
    "A coral reef grows in water that is...|warm and shallow|🐠||cold and deep,frozen",
    "Which animal lives on a coral reef?|a clownfish|🐠||a camel,a polar bear",
    "Coral reefs give fish...|food and homes|🏠||cars,snow",
    "What can hurt coral reefs?|dirty water|🛢️||clean sunshine,fish",
    "Clownfish hide in the arms of a...|sea anemone|🪸||tree,cactus",
    "A reef can protect the shore from...|big waves|🌊||all rain,sunlight",
    "Coral polyps build hard...|skeletons|🪸||wings,feathers"
  ], "A reef is a busy underwater city."));
  b.push(L("Marsupials and monotremes", [
    "Pouch animals|🦘🐨|<b>Marsupials</b> are mammals whose babies are born tiny and grow in their mother's pouch. Kangaroos, koalas and wombats are marsupials.",
    "Egg-laying mammals|🦆🦔|<b>Monotremes</b> are mammals that lay eggs. The platypus and the echidna are monotremes.",
    "Most mammals|🐕|Most mammals, like dogs and humans, are neither. Their babies grow inside the mother until they are well developed."
  ], [
    "A baby kangaroo is called a...|joey|🦘||cub,foal",
    "Which animal is a marsupial?|a koala|🐨||a lion,a whale",
    "Which mammal lays eggs?|a platypus|🦆||a koala,a kangaroo",
    "Marsupial babies grow in the mother's...|pouch|🦘||nest,shell",
    "Where do most marsupials live (a lot of them)?|Australia|🦘||Antarctica,the Arctic",
    "Egg-laying mammals are called...|monotremes|🦔||marsupials,reptiles",
    "A platypus is a...|mammal|🦆||bird,fish",
    "A wombat is a...|marsupial|🐨||monotreme,bird"
  ], "Pouch = marsupial. Eggs + milk = monotreme."));
  b.push(L("Endangered animals", [
    "Endangered|⚠️🐼|An animal is <b>endangered</b> when so few are left that it could disappear forever.",
    "Why it happens|🌳🪓|Animals lose their homes when forests are cut down, water gets dirty or the climate changes. Hunting can also hurt them.",
    "Helping|🐼💚|People protect animals by saving habitats, making parks and keeping rules. Giant pandas are doing better thanks to this help."
  ], [
    "When so few animals are left that they might disappear, they are...|endangered|⚠️||extinct already,hibernating",
    "What is a main reason animals become endangered?|losing their habitat|🌳||too much food,too many friends",
    "Which animal has been endangered?|giant panda|🐼||house cat,pet goldfish",
    "How can people help endangered animals?|protect their habitats|💚||build over their homes,make more trash",
    "A place made to keep wildlife safe is a...|nature reserve|🏞️||shopping mall,parking lot",
    "When a kind of animal is gone forever, it is...|extinct|🦕||endangered,migrating",
    "Which is endangered?|the Siberian tiger|🐅||a pigeon,a house mouse",
    "Planting trees helps animals by...|giving them homes|🌳||making noise,removing food"
  ], "Endangered means in danger of disappearing."));
  b.push(L("Extinct animals", [
    "Gone forever|🦕|<b>Extinct</b> means a kind of animal has died out and none are left.",
    "Long ago|🦖🦣|Dinosaurs lived millions of years ago. Woolly mammoths lived in the ice age. Scientists learn about them from <b>fossils</b>.",
    "Fossils|🦴🪨|A fossil is the print or remains of a plant or animal that lived long ago, kept in rock."
  ], [
    "A kind of animal that has died out completely is...|extinct|🦕||endangered,nocturnal",
    "Scientists learn about dinosaurs from...|fossils|🦴||magic,paintings by dinosaurs",
    "A fossil is found in...|rock|🪨||the sky,the ocean's top",
    "Which of these is extinct?|a woolly mammoth|🦣||an elephant,a horse",
    "Dinosaurs lived...|millions of years ago|🦖||last year,only in winter",
    "Who studies fossils?|a paleontologist|🔍||a baker,a pilot",
    "A dodo bird...|is extinct|🐦||lives in Africa today,is a dinosaur",
    "A fossil can show the shape of a...|bone or footprint|🦶||song,sound"
  ], "Extinct animals are gone, but fossils tell their story."));
  b.push(L("Animals helping each other", [
    "Partners|🤝|<b>Symbiosis</b> is when two different living things live closely together.",
    "Both win|🐠🪸|A clownfish hides in a sea anemone for safety, and it cleans the anemone and protects it. A bee gets nectar while it pollinates the flower. This helps both.",
    "One wins|🐶🦟|A tick drinks the blood of a dog. The tick gains and the dog is hurt. This is a <b>parasite</b>."
  ], [
    "Two different living things living closely together is...|symbiosis|🤝||migration,camouflage",
    "A bee and a flower both gain. This is...|a partnership that helps both|🐝||a one-sided hurt,a hunting game",
    "A tick feeding on a dog is a...|parasite|🐕||pollinator,producer",
    "An oxpecker bird eats ticks off a zebra. This helps the...|bird and the zebra|🦓||only the tick,nobody",
    "A clownfish gets safety from a...|sea anemone|🐠||coral rock,shark",
    "Which is a parasite?|a flea|🐕||a bee,a ladybug",
    "A cleaner fish eats pests off a bigger fish. This helps...|both fish|🐟||no one,only the pest",
    "A parasite lives on a...|host|🐕||producer,rock"
  ], "Who gains? Both, or only one?"));
  b.push(L("Animals without backbones", [
    "Groups of invertebrates|🐌🦀🐙|Invertebrates have many groups. <b>Mollusks</b> are soft-bodied, like snails, clams and octopuses.",
    "More groups|🦀🕷️🪼|<b>Crustaceans</b> have a hard shell and many legs, like crabs and lobsters. <b>Arachnids</b> have eight legs. <b>Cnidarians</b> such as jellyfish have stinging tentacles.",
    "Worms|🪱|Worms have long soft bodies and live in soil or water. An earthworm helps loosen the soil."
  ], [
    "A snail is a...|mollusk|🐌||crustacean,arachnid",
    "A crab is a...|crustacean|🦀||mollusk,insect",
    "A jellyfish has...|stinging tentacles|🪼||wings,fur",
    "An octopus is a...|mollusk|🐙||fish,crustacean",
    "A spider is an...|arachnid|🕷️||insect,crustacean",
    "A lobster is a...|crustacean|🦞||mollusk,reptile",
    "Which one has a soft body and may have a shell?|a clam|🐚||a crab,a scorpion",
    "An earthworm helps the soil by...|loosening it|🪱||freezing it,painting it"
  ], "Look at the body: shell, legs, tentacles or soft."));
  b.push(MIX("Mixed practice", [b[0], b[1], b[3], b[4], b[5], b[8], b[9], b[10], b[12], b[13], b[16]]));
  b.push(MIX("Level 5 Challenge", [b[2], b[6], b[7], b[11], b[14], b[15], b[17], b[1], b[3], b[4], b[8], b[12]]));

  // ================= LEVEL 6 =================
  const c = [];
  c.push(L("The five vertebrate classes", [
    "Five classes|🐟🐸🐍🐦🐕|Vertebrates are grouped into fish, amphibians, reptiles, birds and mammals. Each has its own set of traits.",
    "Breathing and body heat|🫁|Fish breathe with gills. Adult amphibians use lungs and skin. Reptiles, birds and mammals use lungs. Birds and mammals are warm-blooded.",
    "Eggs and young|🥚🍼|Most fish, amphibians, reptiles and birds lay eggs. Most mammals give birth to live young and make milk."
  ], [
    "Which class has feathers?|birds|🐦||reptiles,fish",
    "Which class has dry scales and is cold-blooded with lungs?|reptiles|🐍||amphibians,mammals",
    "Which class feeds babies milk?|mammals|🐕||birds,reptiles",
    "Which class breathes with gills its whole life?|fish|🐟||amphibians,reptiles",
    "Which class has smooth moist skin and a life in two places?|amphibians|🐸||reptiles,birds",
    "Which two classes are warm-blooded?|birds and mammals|🌡️||fish and reptiles,reptiles and amphibians",
    "A crocodile belongs to the...|reptiles|🐊||amphibians,mammals",
    "A newt belongs to the...|amphibians|🦎||reptiles,fish"
  ], "Match the traits to the class."));
  c.push(L("Parts of an ecosystem", [
    "Ecosystem|🌳🦌|An <b>ecosystem</b> is all the living and nonliving things in a place and how they interact.",
    "Living parts|🐛🌿|<b>Biotic</b> parts are living or once living: plants, animals, fungi and bacteria.",
    "Nonliving parts|☀️💧🪨|<b>Abiotic</b> parts are nonliving: sunlight, water, soil, rocks, air and temperature."
  ], [
    "Living parts of an ecosystem are called...|biotic|🌿||abiotic,mineral",
    "Nonliving parts of an ecosystem are called...|abiotic|🪨||biotic,animal",
    "Which is abiotic?|sunlight|☀️||a fox,a mushroom",
    "Which is biotic?|a mushroom|🍄||water,a rock",
    "Which is abiotic?|soil|🟫||a worm,a tree",
    "A pond with fish, frogs, plants, water and mud is an...|ecosystem|🏞️||animal group,single habitat part",
    "Which is biotic?|an oak tree|🌳||temperature,air",
    "Temperature is...|abiotic|🌡️||biotic,an animal"
  ], "Biotic = once alive. Abiotic = never alive."));
  c.push(L("Energy pyramid", [
    "Energy flows up|🔺|Energy moves up a food chain. Plants get energy from the sun. Animals get it by eating.",
    "The 10% rule|🔟|Only about <b>10%</b> of the energy goes to the next level. The rest is used for moving, growing and staying warm.",
    "Why few top predators|🦅|Each higher level has less energy, so there are fewer animals. A forest has lots of plants, fewer plant eaters, and only a few top predators."
  ], [
    "About how much energy passes to the next level?|10%|🔟||90%,50%",
    "Which level has the most living things in a pyramid?|producers|🌱||top predators,secondary consumers",
    "Which level has the fewest animals?|top predators|🦅||producers,primary consumers",
    "The original source of energy for most food chains is the...|sun|☀️||moon,soil",
    "If grass gets 1000 units of energy, a rabbit gets about...|100|🐇||10,1000",
    "Where does the rest of the energy go?|it is used by the animal for living|🔥||it turns into water,it flies to the moon",
    "In a pyramid, the bottom level is...|producers|🌿||predators,decomposers",
    "Why are there fewer top predators than prey?|less energy reaches the top|🔺||they are lazy,they run away"
  ], "Energy gets smaller as you go up the pyramid."));
  c.push(L("Habitat and niche", [
    "Habitat vs. niche|🏠💼|A <b>habitat</b> is where an animal lives. A <b>niche</b> is its job in the ecosystem: what it eats, where it sleeps and how it lives.",
    "Competing|🦁🐆|Animals <b>compete</b> when they need the same food, water or space. Different niches mean less competition.",
    "Sharing a tree|🌳🦜|Different birds may live in one tree. One eats seeds, one eats insects, one drinks nectar. They share the tree without fighting over food."
  ], [
    "The place where an animal lives is its...|habitat|🏠||niche,pyramid",
    "An animal's job in an ecosystem is its...|niche|💼||habitat,class",
    "When two animals need the same food they...|compete|🥊||hibernate,migrate",
    "Different niches mean...|less competition|🤝||more competition,no food",
    "Two birds in one tree eat different foods. This shows different...|niches|🌳||habitats,classes",
    "A shark's niche is a...|predator in the ocean|🦈||plant eater in the desert,decomposer in soil",
    "A forest is a...|habitat|🌲||niche,food chain",
    "A bee's niche includes...|pollinating flowers|🐝||hunting deer,making rain"
  ], "Habitat is the address. Niche is the job."));
  c.push(L("Population and limits", [
    "Population|📈|A <b>population</b> is all the members of one kind of animal living in a place.",
    "Limiting factors|🥬💧|A <b>limiting factor</b> is something that keeps a population from growing forever, like food, water, space, disease or predators.",
    "Balance|⚖️🐺🦌|When wolves are few, deer can grow in number. Then there is less grass, so deer decrease and the cycle goes on."
  ], [
    "All the deer in one forest are a...|population|🦌||community,niche",
    "Food, water and space can be...|limiting factors|💧||pets,wings",
    "If food runs out, a population will likely...|get smaller|📉||get bigger forever,turn invisible",
    "If predators decrease, the prey population may...|increase|📈||vanish,freeze",
    "A flood or drought that kills many animals is a...|limiting factor|🌊||population,niche",
    "What can keep a rabbit population from growing forever?|limited food and predators|🐇||too many friends,sunshine",
    "Wolves hunt deer. If wolves vanish, deer may...|increase at first|🐺||become wolves,fly",
    "What do we call all the living things in one area together with the nonliving parts?|ecosystem|🌳||habitat,niche"
  ], "A limiting factor puts a limit on growth."));
  c.push(L("Invasive species", [
    "A newcomer|🚢|An <b>invasive species</b> is a living thing that moves into a new place and harms it. It is not native there.",
    "Why trouble?|🐸🌿|Invasive species may have no natural predators. They can eat or crowd out native species.",
    "Examples|🐍🌱|Burmese pythons in Florida and cane toads in Australia are invasive. People can help by not releasing pets into the wild."
  ], [
    "A harmful newcomer to an ecosystem is an...|invasive species|🚢||native species,pollinator",
    "A species that belongs naturally in a place is...|native|🌳||invasive,extinct",
    "Why do invasive species spread quickly?|few natural predators|🐸||they are slow,they eat nothing",
    "Cane toads in Australia are...|invasive|🐸||native,endangered",
    "How can people help prevent invasive species?|never release pets into the wild|🐠||let pets go free,bring plants everywhere",
    "Invasive species can...|crowd out native species|🌿||make more native species,clean the sky",
    "Burmese pythons in Florida are...|invasive|🐍||native,extinct",
    "Which would be native to an area?|an animal that has lived there for thousands of years|🦌||a pet that escaped,a newly brought animal"
  ], "Invasive = does not belong and causes harm."));
  c.push(L("Keystone species", [
    "Key to balance|🗝️|A <b>keystone species</b> has a big effect on its ecosystem, even if there are not many of them.",
    "Beavers|🦫🌊|Beavers build dams that make ponds. Many animals and plants then have a home.",
    "Wolves and sea otters|🐺🦦|When wolves returned to Yellowstone, elk behaved differently and trees grew back. Sea otters eat sea urchins, which protects kelp forests."
  ], [
    "A species with a huge effect on its ecosystem is a...|keystone species|🗝️||pet species,rare food",
    "Beavers help other animals by building...|dams that make ponds|🦫||roads,cities",
    "Sea otters protect kelp forests by eating...|sea urchins|🦦||kelp,whales",
    "What happened when wolves returned to Yellowstone?|trees grew back|🐺||all animals left,rivers dried up",
    "If a keystone species vanishes, the ecosystem may...|change a lot|⚠️||stay exactly the same,get more sun",
    "Which is a keystone animal?|a beaver|🦫||a house cat,a goldfish bowl",
    "Beavers build their dams with...|sticks and mud|🪵||plastic bricks,sand castles",
    "Kelp forests are home to...|many sea animals|🌊||only camels,only birds"
  ], "A keystone holds the whole ecosystem together."));
  c.push(L("Biomes", [
    "Big regions|🌍|A <b>biome</b> is a very large region with a similar climate, plants and animals.",
    "Main biomes|🌲🏜️🌾|Biomes include tropical rainforest, desert, grassland, deciduous forest, taiga, tundra and ocean.",
    "Taiga and tundra|🦌❄️|The <b>taiga</b> is a cold forest of evergreen trees with moose and lynx. The <b>tundra</b> is a cold, treeless plain with frozen soil and caribou."
  ], [
    "A large region with similar climate, plants and animals is a...|biome|🌍||niche,cell",
    "A cold, treeless biome with frozen soil is the...|tundra|🧊||rainforest,savanna",
    "A cold forest of evergreen trees is the...|taiga|🌲||desert,reef",
    "Which biome gets the least rain?|desert|🏜️||rainforest,ocean",
    "Which biome has the most rain and the most kinds of life?|tropical rainforest|🌴||tundra,desert",
    "Caribou are found in the...|tundra|❄️||desert,reef",
    "The savanna is a type of...|grassland|🦁||tundra,ocean",
    "Which biome covers most of Earth?|ocean|🌊||desert,tundra"
  ], "Think about the climate of each biome."));
  c.push(L("Echolocation and special senses", [
    "Sound pictures|🦇🔊|Bats and dolphins use <b>echolocation</b>. They make a sound and listen for the echo to find objects and food.",
    "Other senses|🦈🐝|Sharks can sense tiny electric signals from prey. Bees see colors that humans cannot see. Some snakes sense heat from warm animals.",
    "Why special senses?|🌙🌊|These senses help animals live where light is dim, like at night or deep in the sea."
  ], [
    "Using echoes to find things is called...|echolocation|🦇||migration,mimicry",
    "Which animal uses echolocation?|a bat|🦇||a cow,a hen",
    "Dolphins use echolocation to...|find food and objects|🐬||keep warm,build nests",
    "A bat listens for the...|echo|🔊||smell,color",
    "Sharks can sense tiny...|electric signals|🦈||songs,colors only",
    "Pit vipers sense...|heat|🐍||magnets,rain",
    "Echolocation helps most in the...|dark|🌑||bright sun,rain only",
    "An echo is a sound that...|bounces back|🔊||disappears,gets louder forever"
  ], "Echolocation = make a sound and listen for the echo."));
  c.push(L("Animal records", [
    "Fast and big|🐆🐋|The cheetah is the fastest land animal, up to about 100 km/h (60 mph) in short bursts. The blue whale is the largest animal ever, bigger than any dinosaur.",
    "Tall and small|🦒🐝|The giraffe is the tallest land animal. The bee hummingbird is the smallest bird.",
    "More records|🦅🦘|The peregrine falcon is the fastest animal, diving at over 300 km/h (200 mph). The ostrich is the largest bird and runs fast but cannot fly."
  ], [
    "The fastest land animal is the...|cheetah|🐆||elephant,lion",
    "The largest animal is the...|blue whale|🐋||elephant,giraffe",
    "The tallest land animal is the...|giraffe|🦒||elephant,ostrich",
    "The fastest diving bird is the...|peregrine falcon|🦅||ostrich,penguin",
    "The largest bird is the...|ostrich|🐦||eagle,owl",
    "The largest land animal is the...|African elephant|🐘||hippo,rhino",
    "The smallest bird is the...|bee hummingbird|🐦||sparrow,robin",
    "A blue whale eats mostly tiny...|krill|🦐||sharks,seals"
  ], "Think about the record: fastest, tallest, biggest."));
  c.push(L("Gills, lungs and skin", [
    "Getting oxygen|🫁|All animals need oxygen. Different animals get it in different ways.",
    "In water|🐟|Fish take oxygen from the water through <b>gills</b>. Insects breathe through tiny holes in their body called <b>spiracles</b>.",
    "Air breathers|🐕🐸|Mammals, birds and reptiles have <b>lungs</b>. Adult frogs also breathe through their moist skin."
  ], [
    "Fish get oxygen from water with...|gills|🐟||lungs,wings",
    "Insects breathe through tiny holes called...|spiracles|🐜||gills,lungs",
    "A dog breathes with...|lungs|🐕||gills,spiracles",
    "A frog can also breathe through its...|skin|🐸||tail,claws",
    "Whales must come up for air because they have...|lungs|🐋||gills,spiracles",
    "A tadpole breathes with...|gills|🐸||lungs,antennae",
    "Which animal has gills all its life?|a trout|🐟||a dolphin,a lizard",
    "What do all animals need to get from air or water?|oxygen|💨||sugar,wool"
  ], "Which body part takes in oxygen?"));
  c.push(L("Inherited traits", [
    "Traits from parents|👪🐕|An <b>inherited trait</b> is passed from parents to their young, like fur color or eye color.",
    "Learned or inherited?|🐶|A puppy inherits the color of its fur. It learns to fetch with training. Learning does not change what parents pass on.",
    "Variation|🐈🐈‍⬛|No two animals are exactly alike. Kittens in one litter may have different colors."
  ], [
    "Fur color is...|inherited|🐈||learned,a toy",
    "Fetching a ball is...|learned|🎾||inherited,a body part",
    "A trait passed from parents to young is...|inherited|🧬||learned,invented",
    "Kittens in a litter can look...|a little different|🐈||exactly identical always,like frogs",
    "A bird's wing shape is...|inherited|🪽||learned,taught by a friend",
    "A trained dog learning to roll over shows a...|learned behavior|🐕||inherited trait,adaptation of the eye",
    "Learning a new trick...|does not change what parents pass on|🐶||changes fur color,changes the number of legs",
    "A tiger's stripes are...|inherited|🐅||learned,painted"
  ], "Inherited = from parents. Learned = from experience."));
  c.push(L("Survival of the fittest", [
    "Variation|🦋|Animals in a group differ a little. Some traits help them live better than others.",
    "Natural selection|🐛🐦|Brown moths on a brown tree are harder to spot than white ones. Birds eat more white moths, so more brown moths survive and have babies.",
    "Over time|⏳|Helpful traits get passed on more often. After many generations, a group can change. This is called <b>natural selection</b>."
  ], [
    "Animals that survive and have babies pass on their...|traits|🧬||homes,names",
    "A brown moth on a brown tree is more likely to...|survive|🦋||be seen,be sad",
    "Helpful traits become more common over time. This is...|natural selection|⏳||migration,hibernation",
    "Why do more brown moths survive on brown bark?|birds find them harder to see|🐦||they are faster,they are bigger",
    "Natural selection happens over...|many generations|⏳||one afternoon,one minute",
    "A trait that helps an animal survive is...|helpful|✅||harmful,useless",
    "Who passes on traits to young?|parents|👪||teachers,friends",
    "Individuals in a group are...|a little different|🐾||all exactly the same,all invisible"
  ], "Helpful traits help animals survive and have young."));
  c.push(L("Habitat loss and helping", [
    "Habitat loss|🪓🌳|The biggest problem for wildlife is <b>habitat loss</b>. Forests are cut down, wetlands drained and land turned into towns and farms.",
    "Other threats|🛢️🌡️|Pollution, climate change and overfishing also harm animals.",
    "Solutions|🌱🏞️|We can protect wild places, plant native trees, recycle, use less energy and make wildlife corridors so animals can cross safely."
  ], [
    "The biggest threat to wildlife is...|habitat loss|🪓||too much sun,full moons",
    "A wildlife corridor lets animals...|move safely between habitats|🌉||talk on the phone,buy food",
    "Which action helps wildlife?|plant native trees|🌳||pour oil in rivers,drop litter",
    "Draining wetlands causes...|habitat loss|🌾||habitat growth,more fish",
    "Overfishing is when people...|take too many fish|🎣||plant too many seeds,feed fish",
    "Protected areas like national parks...|keep habitats safe|🏞️||build malls,clear forests",
    "Recycling helps wildlife by...|cutting pollution and waste|♻️||adding trash,making ponds dry",
    "Pollution can...|harm animals and water|🛢️||help animals grow bigger,clean the air"
  ], "Protect homes to protect wildlife."));
  c.push(L("Studying animals", [
    "Zoologists|🔬🦁|A <b>zoologist</b> is a scientist who studies animals. They watch, record, and ask questions.",
    "Tools|📓🔭|Zoologists use notebooks, binoculars, cameras, GPS tags and tracking collars to learn about animals without bothering them.",
    "Jobs that help animals|🩺🏞️|A <b>veterinarian</b> treats sick animals. A <b>park ranger</b> protects wild places. A <b>marine biologist</b> studies sea life."
  ], [
    "A scientist who studies animals is a...|zoologist|🔬||geologist,chef",
    "A doctor for animals is a...|veterinarian|🩺||dentist only,baker",
    "A scientist who studies sea life is a...|marine biologist|🌊||astronaut,pilot",
    "A tool for seeing birds from far away is...|binoculars|🔭||a hammer,a ladder",
    "A GPS tag on an animal shows...|where it travels|📍||what it dreams,its age in years only",
    "A person who protects a national park is a...|park ranger|🏞️||clown,tailor",
    "Why do scientists watch animals quietly?|so they do not bother them|🤫||to scare them,to catch them all",
    "Scientists write what they see in a...|field notebook|📓||cooking pot,suitcase"
  ], "Think about the person and the tool."));
  c.push(L("Smart animals", [
    "Tool users|🐒🪵|Chimpanzees use sticks to get termites. Crows can bend wire to make a hook. Sea otters use rocks to crack open shells.",
    "Problem solvers|🐙🐬|Octopuses can open jars. Dolphins work together and learn tricks fast.",
    "Memory and play|🐘🦜|Elephants remember places for many years. Parrots can copy words. Many young mammals learn by playing."
  ], [
    "A chimpanzee uses a stick to get...|termites|🐒||fish,corn",
    "Which bird can bend wire into a hook?|a crow|🐦‍⬛||a penguin,an ostrich",
    "Sea otters crack shells with a...|rock|🦦||spoon,pencil",
    "Which animal can open a jar?|an octopus|🐙||a snail,a clam",
    "Elephants are known for good...|memory|🐘||handwriting,singing",
    "Parrots can copy...|words|🦜||colors,light",
    "Dolphins learn tricks...|fast|🐬||never,only at night",
    "Using an object to do a job is called using a...|tool|🛠️||wing,trail"
  ], "Which clever animal uses which tool?"));
  c.push(L("Sea giants and cephalopods", [
    "Cetaceans|🐋🐬|Whales, dolphins and porpoises are <b>cetaceans</b>: mammals that live in the sea. Some whales have teeth. Others, like blue whales, have baleen plates for filtering food.",
    "Cephalopods|🐙🦑|Octopuses, squids and cuttlefish are <b>cephalopods</b>. They are mollusks with soft bodies, arms and big eyes.",
    "Octopus facts|🐙|An octopus has eight arms and three hearts. Many can change color to hide."
  ], [
    "Whales and dolphins are called...|cetaceans|🐋||cephalopods,crustaceans",
    "An octopus is a...|cephalopod|🐙||cetacean,fish",
    "How many arms does an octopus have?|8|🐙||6,10",
    "Baleen whales filter food with...|baleen plates|🐋||sharp claws,gills",
    "An octopus has how many hearts?|3|🫀||1,8",
    "A squid is a...|cephalopod|🦑||fish,whale",
    "Whales are...|mammals|🐋||fish,reptiles",
    "An octopus can hide by changing...|color|🐙||its bones,its legs into wings"
  ], "Cetaceans are mammals; cephalopods are mollusks."));
  c.push(L("Climate and animals", [
    "Weather and climate|🌦️|<b>Weather</b> is what the sky does today. <b>Climate</b> is the usual weather in a place over many years.",
    "Changing climate|🌡️|When Earth's climate gets warmer, ice melts and the seasons shift. This can change where animals can live.",
    "Moving and helping|🐻‍❄️🐟|Polar bears need sea ice to hunt seals. Some fish and birds move toward cooler places. We can slow the change by saving energy and planting trees."
  ], [
    "The usual weather in a place over many years is...|climate|🌦️||weather today,a season",
    "What the sky does today is...|weather|⛅||climate,biome",
    "Polar bears hunt seals from sea...|ice|🧊||sand,grass",
    "Melting ice can make homes of polar animals...|smaller|🧊||bigger,tastier",
    "One way to help slow climate change is...|save energy|💡||leave lights on,burn more trash",
    "Planting trees helps because trees take in...|carbon dioxide|🌳||sand,rocks",
    "Warmer oceans can harm...|coral reefs|🪸||deserts,mountains",
    "Some animals respond to warming by...|moving to cooler places|🧭||buying boats,growing wings overnight"
  ], "Climate is the long-term pattern."));
  c.push(MIX("Mixed practice", [c[0], c[1], c[2], c[3], c[6], c[7], c[8], c[9], c[11], c[12], c[13], c[15]]));
  c.push(MIX("Level 6 Challenge", [c[2], c[4], c[5], c[6], c[8], c[10], c[11], c[13], c[14], c[16], c[17], c[1], c[0]]));

  Object.assign(ANIMALS_LEVELS, { 4: a, 5: b, 6: c });
})();
