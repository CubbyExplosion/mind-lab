// Mind Lab Animals & Nature. Levels 1-3, 20 lessons each (60 lessons).
// Every lesson: 3 teaching slides, then quiz questions with 3 hints (nudge, clue, worked example).
// Needs math.js loaded first (uses pick, shuf).
const ANIMALS_LEVELS = (() => {
  const nz = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
  // L(title, slides["h|v|t"], items["question|answer|picture|clue|wrong1,wrong2"], nudge, defaultClue)
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
    make.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here is a quick reminder of some of the ideas, then the quiz." }, ...ls.slice(0, 4).map(l => l.make.teach()[0])];
    return { title, make };
  };


  // ================= LEVEL 1 =================
  const a = [];
  a.push(L("Farm animals", [
    "Down on the farm|🐮🐷🐑|A farm is a place where people raise animals and grow food. Cows, pigs and sheep live on farms.",
    "More farm animals|🐴🐔🦆|Horses, chickens and ducks live on farms too. Goats and turkeys also live there.",
    "Name them!|🚜|Look at the picture and say the animal's name out loud."
  ], [
    "What animal is this?|cow|🐮",
    "What animal is this?|horse|🐴",
    "What animal is this?|pig|🐷",
    "What animal is this?|sheep|🐑",
    "What animal is this?|chicken|🐔",
    "What animal is this?|duck|🦆",
    "What animal is this?|goat|🐐",
    "What animal is this?|turkey|🦃"
  ], "Look at the picture. What animal do you see?", "Say the name of the animal you see in the picture."));
  a.push(L("Farm animal sounds", [
    "Moo, oink, baa|🐮🐷🐑|A cow says <b>moo</b>. A pig says <b>oink</b>. A sheep says <b>baa</b>.",
    "Quack and neigh|🦆🐴|A duck says <b>quack</b>. A horse says <b>neigh</b>.",
    "Cluck and cock-a-doodle-doo|🐔🐓|A hen says <b>cluck</b>. A rooster says <b>cock-a-doodle-doo</b> in the morning!"
  ], [
    "What sound does a cow make?|moo|🐮",
    "What sound does a pig make?|oink|🐷",
    "What sound does a sheep make?|baa|🐑",
    "What sound does a duck make?|quack|🦆",
    "What sound does a horse make?|neigh|🐴",
    "What sound does a hen make?|cluck|🐔",
    "What sound does a rooster make in the morning?|cock-a-doodle-doo|🐓",
    "Which animal says oink?|a pig|🐷||a cow,a duck",
    "Which animal says moo?|a cow|🐮||a pig,a horse"
  ], "Think about the farm. Hear the sound in your head.", "Say the animal's sound out loud."));
  a.push(L("More animal sounds", [
    "Pets|🐶🐱|A dog says <b>woof</b>. A cat says <b>meow</b>.",
    "Wild animals|🦁🐍🐝|A lion <b>roars</b>. A snake <b>hisses</b>. A bee <b>buzzes</b>.",
    "Night and pond|🦉🐸|An owl says <b>hoot</b>. A frog says <b>ribbit</b>."
  ], [
    "What sound does a dog make?|woof|🐶",
    "What sound does a cat make?|meow|🐱",
    "What sound does a lion make?|roar|🦁",
    "What sound does a snake make?|hiss|🐍",
    "What sound does a bee make?|buzz|🐝",
    "What sound does an owl make?|hoot|🦉",
    "What sound does a frog make?|ribbit|🐸",
    "What sound does a mouse make?|squeak|🐭",
    "What sound does a wolf make at the moon?|howl|🐺"
  ], "Think of the animal. How does it sound?", "Say the animal's sound out loud."));
  a.push(L("Pets", [
    "Pets live with us|🐶🐱|A pet is an animal that lives with a family. Dogs and cats are popular pets.",
    "Other pets|🐹🐰🐠|Hamsters, rabbits, birds and goldfish can be pets too.",
    "Pets need care|🥣💧|Pets need food, fresh water, a safe home and love."
  ], [
    "Which pet barks?|a dog|🐶",
    "Which pet purrs?|a cat|🐱",
    "Which pet lives in a bowl of water?|a goldfish|🐠",
    "Which pet has long ears and hops?|a rabbit|🐰",
    "Which small pet runs on a wheel?|a hamster|🐹",
    "Which pet has feathers and can sing?|a bird|🐦",
    "Which pet carries a shell on its back?|a turtle|🐢",
    "Which pet loves to fetch a ball?|a dog|🎾"
  ], "Think about what each pet does.", "Think about how the pet looks and sounds."));
  a.push(L("Zoo animals", [
    "A trip to the zoo|🦁🐘🦒|At the zoo you can see animals from all over the world.",
    "Big animals|🐘🦒|An <b>elephant</b> has a long trunk. A <b>giraffe</b> has a very long neck.",
    "Stripes and more|🦓🐒🐧|A <b>zebra</b> has stripes. A <b>monkey</b> swings. A <b>penguin</b> is a bird that cannot fly."
  ], [
    "Which animal has a long trunk?|elephant|🐘",
    "Which animal has a very long neck?|giraffe|🦒",
    "Which big cat has a fluffy mane?|lion|🦁",
    "Which animal has black and white stripes like a horse?|zebra|🦓",
    "Which animal swings in trees and eats bananas?|monkey|🐒",
    "Which black and white bird waddles and cannot fly?|penguin|🐧",
    "Which big orange cat has black stripes?|tiger|🐯",
    "Which animal hops and has a pouch for her baby?|kangaroo|🦘",
    "Which huge animal spends much of its day in the water?|hippo|🦛"
  ], "Look at the clue. Which zoo animal has it?"));
  a.push(L("Baby animals", [
    "Baby names|🐶🐱|A baby dog is a <b>puppy</b>. A baby cat is a <b>kitten</b>.",
    "On the farm|🐮🐑🐴|A baby cow is a <b>calf</b>. A baby sheep is a <b>lamb</b>. A baby horse is a <b>foal</b>.",
    "More babies|🐥🐷🦆|A baby chicken is a <b>chick</b>. A baby pig is a <b>piglet</b>. A baby duck is a <b>duckling</b>."
  ], [
    "A baby dog is called a...|puppy|🐶",
    "A baby cat is called a...|kitten|🐱",
    "A baby cow is called a...|calf|🐮",
    "A baby sheep is called a...|lamb|🐑",
    "A baby horse is called a...|foal|🐴",
    "A baby pig is called a...|piglet|🐷",
    "A baby duck is called a...|duckling|🦆",
    "A baby chicken is called a...|chick|🐥",
    "A baby lion is called a...|cub|🦁"
  ], "Remember the baby name for each animal."));
  a.push(L("Animal homes", [
    "Animals need homes|🏠|A home keeps animals safe, warm and dry.",
    "Different homes|🪺🐝🕸️|Birds live in <b>nests</b>. Bees live in a <b>hive</b>. Spiders make a <b>web</b>.",
    "Under the ground|🐰🐻|Rabbits dig a <b>burrow</b>. Bears sleep in a <b>den</b>."
  ], [
    "Where does a bird live?|a nest|🪺",
    "Where do bees live?|a hive|🐝",
    "What does a spider make to catch food?|a web|🕸️",
    "Where does a rabbit live underground?|a burrow|🐰",
    "Where does a bear sleep in winter?|a den|🐻",
    "Where does a horse sleep on a farm?|a stable|🐴",
    "Where do hens lay their eggs?|a coop|🐔",
    "Where does a pig live on a farm?|a pen|🐷",
    "Where does a cow stay at night?|a barn|🐮"
  ], "Each animal has a special kind of home."));
  a.push(L("What the farm gives us", [
    "Milk and eggs|🥛🥚|Cows give us <b>milk</b>. Hens lay <b>eggs</b> we can eat.",
    "Wool|🐑🧶|Sheep grow <b>wool</b>. Wool is used to make warm sweaters and socks.",
    "Helpers|🐴🐕|Horses can carry riders. Farm dogs help herd the sheep."
  ], [
    "What do we get from a cow?|milk|🥛||wool,honey",
    "What do hens lay?|eggs|🥚||milk,wool",
    "What do we get from a sheep to make sweaters?|wool|🧶||eggs,milk",
    "Which farm animal can we ride?|a horse|🐴||a hen,a duck",
    "Which animal wakes the farm up in the morning?|a rooster|🐓||a pig,a horse",
    "Which animal helps herd sheep?|a dog|🐕||a duck,a cow",
    "What do bees make that is sweet?|honey|🍯||milk,wool",
    "Where do farmers keep hay for the animals?|in a barn|🏚️||in a pond,in a tree"
  ], "Think about what each farm animal gives or does."));
  a.push(L("Ocean animals", [
    "The big blue sea|🌊|The ocean is home to many animals, from tiny fish to huge whales.",
    "Under the waves|🐙🦀🐳|An <b>octopus</b> has eight arms. A <b>crab</b> walks sideways. A <b>whale</b> is huge.",
    "More sea life|🐬🦈⭐|A <b>dolphin</b> is smart and friendly. A <b>shark</b> is a big fish. A <b>starfish</b> looks like a star."
  ], [
    "Which sea animal has eight arms?|octopus|🐙",
    "Which sea animal has claws and walks sideways?|crab|🦀",
    "Which is the biggest animal in the sea?|whale|🐳",
    "Which friendly sea animal jumps and clicks?|dolphin|🐬",
    "Which fish has a big fin on top and sharp teeth?|shark|🦈",
    "Which sea animal looks like a star?|starfish|⭐",
    "Which sea animal has a shell and swims slowly with flippers?|sea turtle|🐢",
    "Which sea animal has long arms that float and sting?|jellyfish|🌊"
  ], "Picture the animal swimming in the ocean."));
  a.push(L("Big and small", [
    "Big animals|🐘🐳|An elephant is the biggest animal on land. A whale is the biggest in the sea.",
    "Small animals|🐜🐭|An ant is tiny. A mouse is small too.",
    "Compare|⚖️|To compare, ask: which one is bigger? Which one is smaller?"
  ], [
    "Which is bigger, an elephant or a mouse?|an elephant|🐘||a mouse",
    "Which is bigger, a whale or a goldfish?|a whale|🐳||a goldfish",
    "Which is bigger, a giraffe or a cat?|a giraffe|🦒||a cat",
    "Which is smaller, an ant or a dog?|an ant|🐜||a dog",
    "Which is smaller, a mouse or a cow?|a mouse|🐭||a cow",
    "Which is smaller, a bee or a bear?|a bee|🐝||a bear",
    "Which is bigger, a horse or a hamster?|a horse|🐴||a hamster",
    "Which is smaller, a kitten or a lion?|a kitten|🐱||a lion"
  ], "Picture the two animals side by side."));
  a.push(L("Fast and slow", [
    "Fast animals|🐆🐇|A <b>cheetah</b> is the fastest land animal. Rabbits and horses are fast too.",
    "Slow animals|🐌🦥🐢|A <b>snail</b> moves very slowly. So do sloths and turtles.",
    "Fast birds|🦅|Some birds, like falcons, fly very fast. An ostrich runs fast but cannot fly."
  ], [
    "Which animal runs very fast?|a cheetah|🐆||a snail,a sloth",
    "Which animal moves very slowly?|a snail|🐌||a cheetah,a horse",
    "Which animal moves slowly through trees?|a sloth|🦥||a cheetah,a falcon",
    "Which is faster, a rabbit or a turtle?|a rabbit|🐇||a turtle",
    "Which is faster, a horse or a snail?|a horse|🐴||a snail",
    "Which is slower, a sloth or a cheetah?|a sloth|🦥||a cheetah",
    "Which big bird runs fast but cannot fly?|an ostrich|🐦||a falcon,a duck",
    "Which is slower, a turtle or a horse?|a turtle|🐢||a horse"
  ], "Think: does it zoom or take its time?"));
  a.push(L("How animals move", [
    "Fly and swim|🐦🐟|Birds <b>fly</b> with wings. Fish <b>swim</b> with fins.",
    "Hop and run|🐸🐴|Frogs and kangaroos <b>hop</b>. Horses <b>run</b>.",
    "Slither and crawl|🐍🐌|Snakes <b>slither</b>. Snails <b>crawl</b>. Monkeys <b>climb</b>."
  ], [
    "How does a bird move?|it flies|🐦||it swims,it slithers",
    "How does a fish move?|it swims|🐟||it flies,it hops",
    "How does a frog move?|it hops|🐸||it flies,it slithers",
    "How does a snake move?|it slithers|🐍||it hops,it flies",
    "How does a horse move?|it runs|🐴||it slithers,it swims only",
    "How does a monkey move in trees?|it climbs|🐒||it slithers,it swims",
    "How does a snail move?|it crawls slowly|🐌||it flies fast,it hops high",
    "How does a kangaroo move?|it hops|🦘||it slithers,it swims"
  ], "Think about how the animal's body helps it move."));
  a.push(L("What animals eat", [
    "Animals eat different foods|🍽️|Every animal has its favorite food. Some eat plants. Some eat meat.",
    "Plant foods|🐮🐰🐼|Cows eat grass. Rabbits eat carrots. Pandas eat bamboo.",
    "Other foods|🦁🐝🐒|Lions eat meat. Bees drink nectar. Monkeys love fruit."
  ], [
    "What does a cow eat?|grass|🐮||meat,nectar",
    "What does a rabbit like to eat?|carrots|🐰||meat,bamboo",
    "What does a panda eat?|bamboo|🐼||meat,nectar",
    "What do bees drink from flowers?|nectar|🐝||meat,bamboo",
    "What does a koala eat?|leaves|🐨||meat,nectar",
    "What does a lion eat?|meat|🦁||grass,bamboo",
    "What does a monkey like to eat?|bananas|🐵||meat,bamboo",
    "What do many small birds eat?|seeds|🐦||grass,bamboo"
  ], "Think about the animal's favorite food."));
  a.push(L("Fur, feathers and scales", [
    "Fur|🐱🐻|Cats and bears are covered in <b>fur</b>. Fur keeps them warm.",
    "Feathers|🐦🦆|Birds are covered in <b>feathers</b>. Feathers help them fly and stay warm.",
    "Scales and shells|🐟🐍🐢|Fish and snakes have <b>scales</b>. Turtles have a hard <b>shell</b>."
  ], [
    "What covers a cat?|fur|🐱||feathers,scales",
    "What covers a bird?|feathers|🐦||fur,scales",
    "What covers a fish?|scales|🐟||fur,feathers",
    "What covers a bear?|fur|🐻||feathers,scales",
    "What covers a duck?|feathers|🦆||fur,scales",
    "What covers a snake?|scales|🐍||fur,feathers",
    "What covers a turtle's back?|a shell|🐢||fur,feathers",
    "What covers a sheep?|wool|🐑||scales,feathers"
  ], "Look at the animal's skin. Is it soft, feathery or hard?"));
  a.push(L("Animal features", [
    "Stripes and spots|🦓🐆|A zebra has <b>stripes</b>. A leopard has <b>spots</b>.",
    "Long and tall|🦒🐘|A giraffe has a long <b>neck</b>. An elephant has a long <b>trunk</b>.",
    "Pouches and shells|🦘🐢|A kangaroo has a <b>pouch</b> for her baby. A turtle has a <b>shell</b>."
  ], [
    "Which animal has stripes?|a zebra|🦓||a giraffe,an elephant",
    "Which animal has a very long neck?|a giraffe|🦒||a zebra,a pig",
    "Which animal has a long nose called a trunk?|an elephant|🐘||a giraffe,a horse",
    "Which animal has a fluffy mane?|a lion|🦁||a mouse,a frog",
    "Which animal has a shell on its back?|a turtle|🐢||a cat,a bird",
    "Which animal has a pouch for her baby?|a kangaroo|🦘||a horse,a duck",
    "Which black and white bird waddles on ice?|a penguin|🐧||a robin,a duck",
    "Which animal has a very long tail and swings in trees?|a monkey|🐒||a pig,a cow"
  ], "Which animal has this feature?"));
  a.push(L("Forest animals", [
    "In the forest|🌲🦌|A forest has lots of trees. Many animals live there.",
    "Furry friends|🐿️🦊🐻|Squirrels, foxes and bears live in forests.",
    "Night and day|🦉🦝|Owls and raccoons are awake at night. Deer and squirrels are awake in the day."
  ], [
    "Which forest animal has antlers?|a deer|🦌||a squirrel,a frog",
    "Which forest animal collects nuts and has a bushy tail?|a squirrel|🐿️||a deer,a fox",
    "Which forest animal has a red bushy tail and is a clever hunter?|a fox|🦊||a bear,a deer",
    "Which big furry animal sleeps in a den in winter?|a bear|🐻||a fox,a rabbit",
    "Which bird says hoot at night?|an owl|🦉||a duck,a hen",
    "Which animal has a face like it wears a mask?|a raccoon|🦝||a deer,a bear",
    "Which bird taps on tree trunks?|a woodpecker|🐦||a duck,a penguin",
    "Which animal hops through the grass with long ears?|a rabbit|🐰||a deer,a fox"
  ], "Picture the forest. Which animal fits the clue?"));
  a.push(L("Snowy places", [
    "Cold and icy|❄️|In very cold places, there is snow and ice all year long.",
    "Polar bear and walrus|🐻‍❄️|A <b>polar bear</b> has thick white fur. A <b>walrus</b> has long tusks.",
    "Penguins and seals|🐧|<b>Penguins</b> are birds that swim well in cold water. <b>Seals</b> swim and rest on the ice."
  ], [
    "Which white bear lives in the icy Arctic?|a polar bear|🐻‍❄️||a panda,a brown bear",
    "Which bird swims well but cannot fly?|a penguin|🐧||a robin,a duck",
    "Which animal has long tusks and lives near Arctic ice?|a walrus|🦭||a camel,a monkey",
    "Which animal has thick fur to stay warm in the snow?|a polar bear|❄️||a snake,a frog",
    "Which animal swims and rests on the ice?|a seal|🦭||a camel,a lion",
    "Which animal likes cold, snowy places?|a penguin|🐧||a camel,a monkey",
    "Which animal has white feathers and lives in the snow?|a snowy owl|🦉||a parrot,a duck",
    "Which animal would NOT live where it is icy and snowy?|a camel|🐪|Think about a hot, dry place.|a polar bear,a seal"
  ], "Think about animals with thick fur or blubber."));
  a.push(L("Bugs and insects", [
    "Little bugs|🐜🐝🦋|Bugs are small animals. Ants, bees and butterflies are insects.",
    "What bugs do|🐝🕸️|Bees make honey. Spiders spin webs. Ants work together.",
    "Be kind|💚|Bugs are important. Watch them closely and be gentle."
  ], [
    "Which bug makes honey?|a bee|🐝",
    "Which bug has colorful wings and was once a caterpillar?|a butterfly|🦋",
    "Which bug has red wings with black spots?|a ladybug|🐞",
    "Which bug spins a web?|a spider|🕷️",
    "Which tiny bug works with a big team in a colony?|an ant|🐜",
    "Which bug jumps high with big back legs?|a grasshopper|🦗",
    "Which bug lights up at night?|a firefly|✨",
    "Which bug chirps at night?|a cricket|🦗"
  ], "Picture the bug and what it does."));
  a.push(MIX("Mixed practice", [a[0], a[1], a[5], a[6], a[8], a[13]]));
  a.push(MIX("Level 1 Challenge", [a[2], a[3], a[4], a[7], a[11], a[12], a[14], a[16]]));

  // ================= LEVEL 2 =================
  const b = [];
  b.push(L("Life on the farm", [
    "A farm is a habitat|🚜|A <b>habitat</b> is the place where an animal lives. A farm is a habitat for farm animals.",
    "Farm homes|🏚️🐔|Cows stay in a <b>barn</b>. Hens stay in a <b>coop</b>. Pigs stay in a <b>pen</b>.",
    "Farmers help|🧑‍🌾|Farmers feed the animals and keep them safe."
  ], [
    "Where do cows sleep on a farm?|a barn|🐮",
    "Where do hens lay eggs on a farm?|a coop|🐔",
    "Where do pigs live on a farm?|a pen|🐷",
    "Where do horses sleep on a farm?|a stable|🐴",
    "Where do ducks swim on a farm?|a pond|🦆",
    "Where do sheep eat grass?|a field|🐑",
    "Who takes care of farm animals?|a farmer|🧑‍🌾",
    "What do farmers feed their animals?|hay and grain|🌾"
  ], "Each farm animal has its own place."));
  b.push(L("The ocean", [
    "Ocean habitat|🌊|The ocean is a huge, salty habitat. Many animals live in the water.",
    "Reefs|🪸🐠|A coral reef is full of colorful fish.",
    "Beach life|🦀🐢|Crabs scuttle on the sand. Sea turtles come to the beach to lay eggs."
  ], [
    "Is ocean water salty or not salty?|salty|🌊||not salty",
    "Which animal lives in the ocean?|a whale|🐳||a cow,a hen",
    "Which animal does NOT live in the ocean?|a cow|🐮|Think about a farm.|a whale,a shark",
    "Where do colorful fish like to live?|a coral reef|🪸||a desert,a farm",
    "Which animal walks sideways on the beach?|a crab|🦀||a horse,a dog",
    "Where does a sea turtle lay her eggs?|on the beach|🏖️||in a tree,on a farm",
    "Which sea animal has eight arms?|an octopus|🐙||a crab,a dolphin",
    "Which sea animal is a mammal that breathes air?|a dolphin|🐬||a shark,an octopus"
  ], "Think about animals that live in the sea."));
  b.push(L("The forest", [
    "Forest habitat|🌲|A forest has many trees. Trees give food, shade and homes.",
    "Forest life|🦌🦊🦉|Deer, foxes and owls live in forests.",
    "Quiet visitors|🍄|Watch from far away so forest animals stay safe and calm."
  ], [
    "What gives shade and homes in a forest?|trees|🌲||oceans,deserts",
    "Which animal lives in a forest?|a deer|🦌||a whale,a camel",
    "Which forest animal says hoot?|an owl|🦉||a bear,a squirrel",
    "Where does a squirrel keep its nuts?|in a tree|🐿️||in the ocean,in a desert",
    "Which animal digs a burrow in the forest floor?|a rabbit|🐰||a bird,a monkey",
    "Which forest animal has a bushy red tail?|a fox|🦊||a bear,a deer",
    "What do forest animals use trees for?|homes and food|🌳||only for shade,toys",
    "How should we watch forest animals?|from far away|🔭||by chasing them,by touching them"
  ], "A forest is full of trees."));
  b.push(L("The desert", [
    "Hot and dry|🏜️|A desert gets very little rain. It is hot in the day and cool at night.",
    "Desert animals|🐪🦎🐍|Camels, lizards and snakes live in deserts.",
    "Smart survivors|🌵|Many desert animals hide from the sun in the day and come out at night."
  ], [
    "A desert gets very little...|rain|🏜️||snow,ice",
    "Which animal lives in the desert?|a camel|🐪||a penguin,a walrus",
    "Which animal can go a long time without water?|a camel|🐪||a fish,a frog",
    "Which plant grows in the desert?|a cactus|🌵||seaweed,a water lily",
    "Which animal with small scales loves the hot sun?|a lizard|🦎||a seal,a duck",
    "When do many desert animals come out?|at night|🌙||at noon only,never",
    "Which animal would NOT like a desert?|a penguin|🐧|Think about very cold places.|a camel,a lizard",
    "Deserts are...|hot and dry|☀️||cold and wet,icy and snowy"
  ], "Deserts are hot and dry."));
  b.push(L("The Arctic", [
    "Very cold|❄️|The Arctic is at the top of the Earth. It is covered in snow and ice.",
    "Arctic animals|🐻‍❄️🦊|Polar bears, arctic foxes and walruses live there.",
    "Warm and white|🦭|Thick fur, thick fat and white coats help animals stay warm and hide."
  ], [
    "The Arctic is very...|cold|❄️||hot,sandy",
    "Which animal lives in the Arctic?|a polar bear|🐻‍❄️||a camel,a monkey",
    "Which animal has long tusks and lives near Arctic ice?|a walrus|🦭||a lion,a parrot",
    "Which fox has a white coat in winter?|an arctic fox|🦊||a desert fox,a red fox",
    "Which animal's thick fat keeps it warm in icy water?|a seal|🦭||a monkey,a giraffe",
    "What covers the ground in the Arctic?|snow and ice|🧊||sand,grass",
    "Why do arctic animals have thick fur?|to stay warm|🧥||to look silly,to be fast",
    "Which animal does NOT live in the Arctic?|a giraffe|🦒|Think about a warm place.|a seal,a polar bear"
  ], "Think of very cold places with ice."));
  b.push(L("The rainforest", [
    "Warm and wet|🌴🌧️|A rainforest is warm and gets lots of rain. Tall trees make a green roof.",
    "Rainforest animals|🦜🐒🦥|Parrots, monkeys, sloths and toucans live in rainforests.",
    "Colors everywhere|🐸|Rainforests are full of bright birds, butterflies and tiny frogs."
  ], [
    "A rainforest gets lots of...|rain|🌧️||snow,sand",
    "Which colorful bird can copy sounds and lives in the rainforest?|a parrot|🦜||a penguin,a goose",
    "Which animal lives in rainforest trees and moves very slowly?|a sloth|🦥||a camel,a seal",
    "Which animal with a big colorful beak lives in the rainforest?|a toucan|🐦||a robin,a duck",
    "Which animal swings from tree to tree?|a monkey|🐒||a seal,a cow",
    "What is the weather like in a rainforest?|warm and wet|🌴||cold and dry,snowy",
    "Which big spotted cat lives in the rainforest?|a jaguar|🐆||a polar bear,a walrus",
    "Which animal would NOT live in a rainforest?|a polar bear|🐻‍❄️|Think about snow and ice.|a monkey,a parrot"
  ], "A rainforest is warm, wet and green."));
  b.push(L("The grassland", [
    "Wide open grass|🌾|A grassland, or savanna, has tall grass and few trees. It is warm.",
    "Savanna animals|🦁🦓🐘🦒|Lions, zebras, elephants and giraffes live on the African grasslands.",
    "Herds|🦓|Many grassland animals live in big groups called herds."
  ], [
    "A grassland has tall...|grass|🌾||ice,sand",
    "Which animal lives on the grassland?|a lion|🦁||a penguin,a polar bear",
    "Which striped animal lives on the grassland?|a zebra|🦓||a tiger,a camel",
    "Which tall animal eats leaves from tall trees?|a giraffe|🦒||a lion,a zebra",
    "Which huge animal sprays water with its trunk?|an elephant|🐘||a giraffe,a lion",
    "A big group of animals is called a...|herd|🦓||bubble,pizza",
    "Which fast cat lives on the grassland?|a cheetah|🐆||a polar bear,a seal",
    "What can animals on the grassland eat?|grass and leaves|🌱||ice and snow,plastic toys"
  ], "Think of wide open grass."));
  b.push(L("Ponds and rivers", [
    "Fresh water|💧|Ponds, lakes and rivers have fresh water. It is not salty like the ocean.",
    "Pond animals|🐸🦆🐢|Frogs, ducks, turtles and fish live in and near ponds.",
    "Builders|🦫|A beaver builds a dam and a lodge from sticks and mud."
  ], [
    "Is pond water fresh or salty?|fresh|💧||salty",
    "Which animal says ribbit and lives near ponds?|a frog|🐸||a lion,a cow",
    "Which bird swims on a pond?|a duck|🦆||an owl,a parrot",
    "Which animal builds a dam with sticks and mud?|a beaver|🦫||a bear,a squirrel",
    "Which insect with shiny wings flies over a pond?|a dragonfly|💧||a snail,a worm",
    "Which animal lives in a shell and slowly paddles in the pond?|a turtle|🐢||a camel,a horse",
    "Which animal lives all its life in a river?|a fish|🐟||a horse,a bird",
    "Water in a river is moving...|downstream|🏞️||upward,sideways always"
  ], "Ponds and rivers have fresh water."));
  b.push(L("Where does it live?", [
    "Match the habitat|🗺️|Each animal lives in a habitat that gives it food, water and shelter.",
    "Examples|🐻‍❄️🐪🐳|A polar bear lives in the Arctic. A camel lives in the desert. A whale lives in the ocean.",
    "More examples|🐒🐮🦁|A toucan lives in the rainforest. A cow lives on a farm. A lion lives on the grassland."
  ], [
    "A polar bear lives in the...|Arctic|🐻‍❄️",
    "A camel lives in the...|desert|🐪",
    "A whale lives in the...|ocean|🐳",
    "A toucan lives in the...|rainforest|🐦",
    "A cow lives on a...|farm|🐮",
    "A lion lives on the...|grassland|🦁",
    "A beaver lives near a...|pond|🦫",
    "A squirrel lives in a...|forest|🐿️"
  ], "Which place gives this animal what it needs?"));
  b.push(L("Animal homes", [
    "Nests and burrows|🪺🐰|Birds build <b>nests</b>. Rabbits dig <b>burrows</b>. Foxes and bears live in <b>dens</b>.",
    "Hives and webs|🐝🕸️|Bees live in a <b>hive</b>. Spiders make <b>webs</b>.",
    "Lodges and shells|🦫🐚|A beaver lives in a <b>lodge</b>. A snail carries its home, a <b>shell</b>."
  ], [
    "A beaver lives in a...|lodge|🦫||nest,web",
    "A fox lives in a...|den|🦊||hive,shell",
    "A snail carries its home, a...|shell|🐌||nest,den",
    "A bee lives in a...|hive|🐝||den,burrow",
    "A bird builds a...|nest|🪺||web,burrow",
    "A rabbit digs a...|burrow|🐰||hive,web",
    "A spider makes a...|web|🕸️||nest,hive",
    "Ants live together in an...|anthill|🐜||igloo,aquarium"
  ], "Different animals build different homes."));
  b.push(L("Plant eaters and meat eaters", [
    "Plant eaters|🐮🦒|Some animals eat only <b>plants</b>. A scientist calls them <b>herbivores</b>.",
    "Meat eaters|🦁🦈|Some animals eat <b>meat</b>. They are <b>carnivores</b>.",
    "Both|🐻🐷|Some animals eat <b>both</b> plants and meat. They are <b>omnivores</b>. People are omnivores too."
  ], [
    "A cow eats...|plants|🐮||meat,both",
    "A lion eats...|meat|🦁||plants,both",
    "A rabbit eats...|plants|🐰||meat,both",
    "A wolf eats...|meat|🐺||plants,both",
    "A deer eats...|plants|🦌||meat,both",
    "A shark eats...|meat|🦈||plants,both",
    "A bear eats...|both|🐻||plants only,meat only",
    "A pig eats...|both|🐷||plants only,meat only"
  ], "Does the animal eat plants, meat or both?"));
  b.push(L("Fur, feathers, scales and shells", [
    "Warm coverings|🐻🐑|Fur and wool keep mammals warm.",
    "Light and strong|🐦|Feathers keep birds warm and help them fly.",
    "Armor|🐟🐢🦔|Scales protect fish and snakes. Shells protect turtles. Spines protect a hedgehog."
  ], [
    "What covers a fish?|scales|🐟||fur,feathers",
    "What covers a hedgehog's back?|spines|🦔||feathers,scales",
    "Which animal is covered in fur?|a rabbit|🐰||a snake,a goldfish",
    "Which animal has feathers?|an eagle|🦅||a rabbit,a fish",
    "Which animal has scales?|a snake|🐍||a cat,a bird",
    "Which animal has a hard shell?|a turtle|🐢||a puppy,a duck",
    "Which animal has wool?|a sheep|🐑||a snake,a fish",
    "Which animal has quills like needles?|a porcupine|🦔||a dog,a cat"
  ], "Think about how the animal's covering helps it."));
  b.push(L("Ways animals move", [
    "Air and water|🦅🐟|Birds, bats and many bugs <b>fly</b>. Fish, whales and dolphins <b>swim</b>.",
    "On land|🐕🐍🐸|Dogs <b>run</b>. Snakes <b>slither</b>. Frogs <b>hop</b>.",
    "In trees|🐒🦥|Monkeys <b>swing</b> and <b>climb</b>. Sloths <b>hang</b> from branches."
  ], [
    "Which animal can fly?|a bat|🦇||a cow,a fish",
    "Which animal lives and swims all its life in water?|a fish|🐟||a bird,a cow",
    "Which animal slithers on the ground?|a snake|🐍||a frog,a bird",
    "Which animal hops?|a kangaroo|🦘||a snake,a whale",
    "Which animal swings from branches?|a monkey|🐒||a snake,a fish",
    "Which animal hangs upside down in trees and moves slowly?|a sloth|🦥||a cheetah,a bear",
    "Which animal gallops?|a horse|🐴||a fish,a snail",
    "Which insect flies from flower to flower?|a bee|🐝||a snail,a worm"
  ], "How does this animal's body help it move?"));
  b.push(L("Mammals", [
    "What is a mammal?|🐶🐱|Mammals have <b>hair or fur</b>, breathe air, and feed their babies <b>milk</b>.",
    "Land and sea|🐘🐳|Elephants, dogs and people are mammals. Whales and dolphins are mammals that live in the sea.",
    "Flying mammal|🦇|A bat is a mammal that can fly."
  ], [
    "Which one is a mammal?|a dog|🐶||a snake,a goldfish",
    "Which one is a mammal?|a whale|🐳||a shark,a trout",
    "Which one is a mammal?|a bat|🦇||a bee,a robin",
    "What do mammal mothers feed their babies?|milk|🥛||seeds,worms",
    "Mammals have fur or...|hair|🐻||feathers,scales",
    "Which one is NOT a mammal?|a goldfish|🐠|A mammal feeds its babies milk.|a cow,a cat",
    "Are people mammals?|yes|🧑||no",
    "Which one is a mammal?|a dolphin|🐬||a shark,a goldfish"
  ], "Mammals have fur or hair and drink milk as babies."));
  b.push(L("Birds", [
    "What is a bird?|🐦|Birds have <b>feathers</b>, <b>wings</b> and a <b>beak</b>. They lay eggs.",
    "Flying birds|🦅🦜|Most birds can fly with their wings. Eagles soar high in the sky.",
    "Birds that can't fly|🐧🦤|Penguins swim and ostriches run. They are birds that cannot fly."
  ], [
    "What covers a bird's body?|feathers|🐦||fur,scales",
    "What do birds use to eat?|a beak|🐥||a trunk,a fin",
    "How do birds come into the world?|they hatch from eggs|🥚||they are born from seeds,they pop out of flowers",
    "Which bird cannot fly but swims well?|a penguin|🐧||an eagle,a robin",
    "Which bird is the tallest and runs fast on land?|an ostrich|🐦||a robin,a duck",
    "Which bird has a bright beak and can copy sounds?|a parrot|🦜||an owl,a penguin",
    "Which bird hoots at night?|an owl|🦉||a robin,a duck",
    "Which bird lives on a farm and says cluck?|a chicken|🐔||an eagle,an owl"
  ], "Birds have feathers, wings and beaks."));
  b.push(L("Fish", [
    "What is a fish?|🐟|Fish live in water. They have <b>fins</b>, <b>scales</b> and <b>gills</b>.",
    "Gills|💧|Gills let fish take in air from the water.",
    "Big and small fish|🦈🐠|A shark is a fish. A goldfish is a fish. So is a seahorse."
  ], [
    "What helps a fish swim?|fins|🐟||wings,legs",
    "What helps a fish breathe in water?|gills|🐠||lungs,wings",
    "What covers most fish?|scales|🐟||fur,feathers",
    "Is a shark a fish?|yes|🦈||no",
    "Is a dolphin a fish?|no|🐬|A dolphin is a mammal. It breathes air.|yes",
    "Where do fish live?|in water|🌊||in trees,in deserts",
    "Which one is a fish?|a seahorse|🐴||a whale,a crab",
    "Which one is a fish?|a goldfish|🐠||a dolphin,a frog"
  ], "Fish breathe with gills."));
  b.push(L("Reptiles", [
    "What is a reptile?|🐍🦎|Reptiles have dry skin with <b>scales</b>. Snakes, lizards, turtles and crocodiles are reptiles.",
    "Warming up|☀️|Reptiles sit in the sun to warm their bodies.",
    "Eggs|🥚🐢|Most reptiles lay eggs."
  ], [
    "Which one is a reptile?|a snake|🐍||a frog,a rabbit",
    "Which one is a reptile?|a lizard|🦎||a cat,a robin",
    "Which one is a reptile?|a turtle|🐢||a cow,a duck",
    "Which one is a reptile?|a crocodile|🐊||a dolphin,a monkey",
    "What covers a reptile's skin?|scales|🦎||fur,feathers",
    "Why do reptiles sit in the sun?|to warm up|☀️||to get colder,to sing",
    "Most reptiles lay...|eggs|🥚||milk,seeds",
    "Which one is NOT a reptile?|a rabbit|🐰|A reptile has dry, scaly skin.|a snake,a turtle"
  ], "Reptiles have dry, scaly skin."));
  b.push(L("Insects", [
    "What is an insect?|🐜|Insects have <b>6 legs</b>, three body parts and two antennae.",
    "Wings|🦋🐝|Many insects have wings. Butterflies, bees and beetles are insects.",
    "Not insects|🕷️|A spider has <b>8 legs</b>. It is not an insect."
  ], [
    "How many legs does an insect have?|6|🐜||4,8",
    "How many legs does a spider have?|8|🕷️||6,4",
    "Which one is an insect?|a bee|🐝||a spider,a snail",
    "Which one is an insect?|a butterfly|🦋||a spider,a worm",
    "Which one is an insect?|an ant|🐜||a spider,a snail",
    "Which one is NOT an insect?|a spider|🕷️|Count its legs.|a bee,an ant",
    "What do insects have on their heads to feel and smell?|antennae|🐞||ears,whiskers",
    "Which insect is a good flyer with shiny wings?|a dragonfly|🪰||a snail,a worm"
  ], "Insects have six legs."));
  b.push(MIX("Mixed practice", [b[0], b[3], b[4], b[8], b[9], b[10]]));
  b.push(MIX("Level 2 Challenge", [b[1], b[5], b[7], b[11], b[12], b[13], b[14], b[16]]));

  // ================= LEVEL 3 =================
  const c = [];
  c.push(L("Herbivore, carnivore, omnivore", [
    "Herbivore|🐮|A <b>herbivore</b> eats only plants. Cows, rabbits and giraffes are herbivores.",
    "Carnivore|🦁|A <b>carnivore</b> eats meat. Lions, sharks and wolves are carnivores.",
    "Omnivore|🐻|An <b>omnivore</b> eats plants and meat. Bears, pigs and people are omnivores."
  ], [
    "A herbivore eats...|only plants|🌱||only meat,rocks",
    "A carnivore eats...|meat|🍖||only plants,rocks",
    "An omnivore eats...|plants and meat|🍽️||only plants,only meat",
    "A cow is a...|herbivore|🐮||carnivore,omnivore",
    "A lion is a...|carnivore|🦁||herbivore,omnivore",
    "A bear is an...|omnivore|🐻||herbivore,carnivore",
    "A rabbit is a...|herbivore|🐰||carnivore,omnivore",
    "A shark is a...|carnivore|🦈||herbivore,omnivore"
  ], "Plants only, meat only, or both?"));
  c.push(L("Who eats what?", [
    "Match the food|🍃|Every animal has foods that fit its body. Its teeth and beak match its food.",
    "Teeth tell|🦷|Flat teeth grind plants. Sharp teeth tear meat.",
    "Special foods|🐼🐨|Pandas eat bamboo. Koalas eat leaves. Anteaters eat ants."
  ], [
    "What does a panda mostly eat?|bamboo|🐼||fish,bananas",
    "What do koalas eat?|eucalyptus leaves|🐨||meat,bamboo",
    "What does an anteater eat?|ants|🐜||grass,seaweed",
    "What do hummingbirds drink?|nectar|🌺||milk,juice boxes",
    "What do cows eat?|grass|🐮||meat,ants",
    "What do monkeys love to eat?|fruit|🍌||ants only,rocks",
    "What do whales like to eat?|small fish and krill|🐳||grass,leaves",
    "What do rabbits eat?|leafy plants|🥬||meat,fish"
  ], "Think about where the animal lives and what is there to eat."));
  c.push(L("A simple food chain", [
    "The Sun|☀️|The Sun gives energy. Plants use sunlight to make their own food.",
    "A chain|🌱🐛🐦|A caterpillar eats a leaf. A bird eats the caterpillar. This is a <b>food chain</b>.",
    "Energy passes on|🔗|Every link in the chain gets energy from the one before it."
  ], [
    "Where does a food chain start?|with the Sun and plants|☀️||with a lion,with a rock",
    "What do plants use to make food?|sunlight|☀️||moonlight,cheese",
    "In the chain grass → rabbit → fox, who eats the grass?|the rabbit|🐰||the fox,the Sun",
    "In the chain grass → rabbit → fox, who eats the rabbit?|the fox|🦊||the grass,the Sun",
    "In the chain leaf → caterpillar → bird, who eats the leaf?|the caterpillar|🐛||the bird,the Sun",
    "A food chain shows who...|eats what|🔗||sleeps where,runs fastest",
    "In the chain plant → mouse → owl, what is the plant's job?|it makes food|🌱||it hoots,it hunts",
    "Where does the energy in a food chain first come from?|the Sun|🌞||a rock,a car"
  ], "Follow the arrows: who eats whom?"));
  c.push(L("What comes next?", [
    "Follow the arrow|➡️|In a food chain, the arrow points to the one that eats.",
    "Example|🌱🐛🐦|Leaf → caterpillar → bird. The caterpillar eats the leaf. The bird eats the caterpillar.",
    "Another|🌿🐇🦊|Grass → rabbit → fox. The fox gets energy from the rabbit."
  ], [
    "Grass → rabbit → ?|fox|🦊||tree,flower",
    "Seaweed → small fish → ?|big fish|🐟||sand,boat",
    "Leaf → caterpillar → ?|bird|🐦||fish,rock",
    "Plant → mouse → ?|owl|🦉||sand,flower",
    "Sun → ? → caterpillar|leaf|🍃||bird,fox",
    "Sun → grass → ?|rabbit|🐇||sand,rain",
    "Plankton → small fish → ?|seal|🦭||tree,cow",
    "Nectar → bee → ?|bird|🐝||flower,sun"
  ], "Use the arrows to see who eats whom."));
  c.push(L("Animal groups", [
    "Sorting animals|🗂️|Scientists put animals in groups: mammals, birds, fish, reptiles, amphibians and insects.",
    "Clues|🔍|Fur? Feathers? Scales? Wet skin? Six legs? The clue tells you the group.",
    "Examples|🐶🐦🐟🐍🐸🐜|Dog is a mammal. Robin is a bird. Goldfish is a fish. Snake is a reptile. Frog is an amphibian. Ant is an insect."
  ], [
    "A dog is a...|mammal|🐶||bird,fish",
    "A robin is a...|bird|🐦||mammal,fish",
    "A goldfish is a...|fish|🐠||mammal,bird",
    "A snake is a...|reptile|🐍||bird,insect",
    "A frog is an...|amphibian|🐸||reptile,insect",
    "An ant is an...|insect|🐜||amphibian,mammal",
    "A dolphin is a...|mammal|🐬||fish,reptile",
    "A turtle is a...|reptile|🐢||amphibian,mammal"
  ], "Look for clues: fur, feathers, scales, or six legs."));
  c.push(L("Frogs and reptiles", [
    "Amphibians|🐸|Frogs, toads and salamanders are <b>amphibians</b>. They have smooth, wet skin.",
    "Two lives|💧🌿|Young amphibians live in water. Adults can live on land and in water.",
    "Reptiles|🐍🦎|Reptiles have dry, scaly skin. They lay eggs on land."
  ], [
    "Which one has smooth, wet skin?|a frog|🐸||a snake,a lizard",
    "Which one has dry, scaly skin?|a snake|🐍||a frog,a toad",
    "A baby frog is called a...|tadpole|🐸||chick,cub",
    "Which one is an amphibian?|a toad|🐸||a lizard,a turtle",
    "Which one is a reptile?|a lizard|🦎||a frog,a salamander",
    "Where do tadpoles live?|in water|💧||in trees,in a nest",
    "Which one is an amphibian?|a salamander|🦎||a snake,a crocodile",
    "Which group sits in the sun to warm up?|reptiles|☀️||amphibians only,insects only"
  ], "Wet skin is an amphibian. Scaly skin is a reptile."));
  c.push(L("Eggs or live babies?", [
    "Laying eggs|🥚|Birds, fish, reptiles, frogs and insects lay eggs. Babies hatch out.",
    "Live babies|🐶🐮|Most mammals have babies that grow inside the mother.",
    "Both care|🤱|Many parents feed and protect their babies."
  ], [
    "Which animal lays eggs?|a hen|🐔||a cow,a dog",
    "Which animal's babies grow inside the mother?|a dog|🐶||a hen,a frog",
    "Which animal lays eggs?|a turtle|🐢||a cat,a horse",
    "Which animal lays eggs?|a fish|🐟||a dog,a cow",
    "Which animal's babies grow inside the mother?|a cow|🐮||a duck,a snake",
    "Which animal lays eggs in a nest?|a robin|🐦||a cat,a pig",
    "Which animal's babies grow inside the mother?|a horse|🐴||a hen,a frog",
    "Which animal lays eggs and starts as a tadpole?|a frog|🐸||a cow,a kitten"
  ], "Does the baby hatch from an egg, or grow inside its mother?"));
  c.push(L("Animal tools", [
    "Parts with jobs|🛠️|Animals have body parts that do jobs. A duck has webbed feet to swim.",
    "More tools|🐦🦒|Some birds have long beaks to sip nectar. A giraffe has a long neck to reach tall leaves.",
    "Claws and teeth|🐱🦷|Sharp claws and teeth help hunters. Flat teeth help grass-eaters."
  ], [
    "What do webbed feet help a duck do?|swim|🦆||climb,hide",
    "What does a giraffe's long neck help it do?|reach tall leaves|🦒||swim,dig",
    "What does a hummingbird's long beak help it do?|sip nectar|🐦||swim,dig",
    "What does a woodpecker's strong beak help it do?|peck at tree bark|🐦||sip nectar,swim",
    "What do a cat's sharp claws help it do?|climb and catch|🐱||sing,fly",
    "What do a mole's strong paws help it do?|dig|⛏️||fly,swim",
    "What do flat teeth help cows do?|grind grass|🐮||tear meat,sing",
    "What do a fish's fins help it do?|swim|🐠||fly,dig"
  ], "Each body part helps the animal do a job."));
  c.push(L("Hide and stay safe", [
    "Camouflage|🦎|Some animals blend in with their surroundings to hide. This is <b>camouflage</b>.",
    "Armor and spines|🐢🦔|A turtle hides in its shell. A hedgehog curls up into a prickly ball.",
    "Run, fly, or stick together|🦓|Zebras stay in groups. Fish swim in schools. Safety is found in numbers."
  ], [
    "Blending in to hide is called...|camouflage|🦎||dancing,shouting",
    "What does a turtle do when it is scared?|hides in its shell|🐢||sings a song,flies away",
    "What does a hedgehog do when it is scared?|curls into a ball|🦔||does a flip,starts to bark",
    "Which animal can change color to hide?|a chameleon|🦎||a cow,a duck",
    "Which animal looks like a stick?|a stick insect|🐛||a ladybug,a bee",
    "Why do fish swim in big groups?|it is safer|🐠||to play cards,to sleep",
    "Which animal has quills to protect itself?|a porcupine|🦔||a rabbit,a hen",
    "Why is an arctic hare white in winter?|to hide in the snow|❄️||to look silly,to be heavier"
  ], "Camouflage helps animals blend in."));
  c.push(L("Hot and cold places", [
    "Staying warm|🐻‍❄️|Polar bears have thick fur and a layer of fat to stay warm.",
    "Staying cool|🐘|Elephants flap their big ears to cool down.",
    "Saving water|🐪|A camel can go a long time without a drink."
  ], [
    "What keeps a polar bear warm?|thick fur and fat|🐻‍❄️||big ears,a shell",
    "What do elephants flap to cool down?|their ears|🐘||their tails only,their feet",
    "Which animal can go a long time without water?|a camel|🐪||a fish,a seal",
    "Why do desert animals come out at night?|it is cooler|🌙||they like snow,they dislike sunlight",
    "Which fox has big ears to help it stay cool?|a fennec fox|🦊||an arctic fox,a red fox",
    "Why does an arctic hare have thick fur?|to stay warm|❄️||to stay cool,to look pretty",
    "Whales stay warm in cold water with a layer of...|fat|🐳||sand,fur only",
    "Birds puff up their feathers to...|stay warm|🐦||go swimming,sing louder"
  ], "Animals have ways to stay comfortable where they live."));
  c.push(L("Caring for pets", [
    "What pets need|🐶🥣|Pets need food, fresh water, exercise, a clean home and love.",
    "Vet visits|🩺|A veterinarian (vet) keeps pets healthy with check-ups.",
    "Be gentle|🤲|Pet gently. Never pull ears or tails. Wash your hands after you touch a pet."
  ], [
    "What does a pet need every day?|food and fresh water|🥣||only candy,nothing",
    "Who is the doctor for animals?|a vet|🩺||a pilot,a baker",
    "Dogs need to go for a...|walk|🦮||dive,drive",
    "How should you pet an animal?|gently|🤲||roughly,loudly",
    "What should you do after touching a pet?|wash your hands|🧼||throw a ball,sing",
    "Where is it NOT safe to leave a pet?|in a hot car|🚗|Think about heat.|in a cool home,with fresh water",
    "A cat's litter box should be...|cleaned often|🐱||left alone,hidden forever",
    "Pets need to be...|loved and cared for|❤️||forgotten,left outside all night"
  ], "Pets depend on us to take care of them."));
  c.push(L("Wild animals", [
    "Wild animals|🦌|Wild animals live outside. They find their own food.",
    "Stay back|🔭|Watch from far away. Do not touch or feed wild animals.",
    "Tell a grown-up|🧑‍🤝‍🧑|If you find a hurt animal, tell a grown-up. They will call the right helper."
  ], [
    "Should you feed wild animals?|no|🚫||yes",
    "How should you watch wild animals?|from far away|🔭||by touching them,by chasing them",
    "If you see an animal that looks hurt, you should...|tell a grown-up|🧑‍🤝‍🧑||pick it up,chase it",
    "Wild animals find their own...|food|🍂||homework,clothes",
    "Should you chase a wild animal?|no|🚫||yes",
    "Which tool helps you see animals from far away?|binoculars|🔭||a hammer,a spoon",
    "What should you do with your trash in a park?|put it in a bin|🗑️||leave it on the ground,give it to animals",
    "Keeping a distance keeps both you and the animal...|safe|🛡️||sleepy,silly"
  ], "Wild animals are wild. Keep your distance."));
  c.push(L("Nature's helpers", [
    "Bees and butterflies|🐝🦋|Bees and butterflies carry pollen from flower to flower. This helps fruits grow.",
    "Worms and trees|🪱🌳|Worms loosen the soil. Trees give shade, homes and fresh air.",
    "Birds|🐦|Birds spread seeds and eat many bugs."
  ], [
    "Which animals carry pollen between flowers?|bees|🐝||worms,whales",
    "What do earthworms do for the soil?|loosen it|🪱||paint it,melt it",
    "What do trees give us?|shade and fresh air|🌳||only noise,candy",
    "What do birds help spread?|seeds|🐦||sand,cheese",
    "Why do flowers need pollinators?|to make seeds and fruit|🌸||to sing,to stay warm",
    "Which tiny helper makes the soil healthier?|an earthworm|🪱||a shark,a lion",
    "A tree is a home for many...|animals|🐿️||cars,TVs",
    "Which animal helps eat the bugs in a garden?|a bird|🐦||a whale,a camel"
  ], "Everything in nature has a job."));
  c.push(L("Taking care of nature", [
    "Keep it clean|🗑️|Put trash in a bin. Litter can hurt animals and make homes dirty.",
    "Plant a tree|🌱|Planting trees gives animals homes and gives us fresh air.",
    "Save water|🚰|Turn off the tap while you brush your teeth."
  ], [
    "Where should trash go?|in a bin|🗑️||on the ground,in a river",
    "What can you plant to help animals?|a tree|🌳||a plastic toy,a rock",
    "What should you do with the tap while brushing your teeth?|turn it off|🚰||leave it running,break it",
    "Why is littering bad?|it hurts animals and nature|🐢||it is fun,it makes plants grow",
    "How can you help birds in a garden?|put out clean water|💧||throw rocks,make loud noise",
    "Picking all the wildflowers is...|not kind to nature|🌼||helpful to bees,a great idea",
    "Which is a kind thing to do at a park?|take your trash home|🏞️||leave it behind,feed wild animals",
    "How can you help save water?|take shorter showers|🚿||leave taps on,fill a pool for fun"
  ], "Think about how to keep nature safe and clean."));
  c.push(L("Reduce, reuse, recycle", [
    "Reduce|✂️|<b>Reduce</b> means to use less. Take only what you need.",
    "Reuse|🔄|<b>Reuse</b> means to use something again, like using a jar for pencils.",
    "Recycle|♻️|<b>Recycle</b> means making old things into new things, like turning old bottles into new ones."
  ], [
    "Using less is called...|reduce|✂️||reuse,recycle",
    "Using something again is called...|reuse|🔄||reduce,recycle",
    "Turning old things into new things is called...|recycle|♻️||reduce,reuse",
    "Putting pencils in an old jar is an example of...|reuse|🫙||recycle,reduce",
    "Taking only what you need is an example of...|reduce|✂️||reuse,recycle",
    "Putting a plastic bottle in the recycling bin is...|recycling|♻️||reducing,reusing",
    "What do the three arrows on the recycling sign mean?|reduce, reuse, recycle|♻️||eat and sleep,stop and wait",
    "Using a cloth bag instead of a new plastic bag each time is...|reuse|🛍️||recycle,reduce"
  ], "Reduce, reuse and recycle are three ways to help."));
  c.push(L("Sorting recycling", [
    "Paper and cardboard|📰📦|Newspapers, boxes and paper can be recycled.",
    "Plastic, metal and glass|🧴🥫🫙|Clean plastic bottles, metal cans and glass jars can be recycled too.",
    "Compost|🍌|Banana peels and apple cores can be composted to make rich soil."
  ], [
    "Where does a clean newspaper go?|paper recycling|📰||compost,glass",
    "Where does an empty glass jar go?|glass recycling|🫙||paper,compost",
    "Where does a clean metal can go?|metal recycling|🥫||compost,paper",
    "Where does a clean plastic bottle go?|plastic recycling|🧴||compost,glass",
    "Where does a banana peel go?|compost|🍌||metal recycling,glass",
    "Where does a cardboard box go?|paper recycling|📦||compost,glass",
    "Where does an apple core go?|compost|🍎||metal recycling,glass",
    "What can food scraps turn into?|rich soil|🌱||plastic,paper"
  ], "Sort by what it is made of."));
  c.push(L("Saving energy", [
    "Energy|💡|We use energy for lights, TVs and heating. Saving energy helps nature.",
    "Small steps|🔌|Turn off lights when you leave a room. Unplug things you do not use.",
    "Clean energy|☀️💨|Sunshine and wind can make electricity without making smoke."
  ], [
    "What should you do with lights when leaving a room?|turn them off|💡||leave them on,break them",
    "What can make clean electricity?|the sun|☀️||smoke,trash",
    "What else can make clean electricity?|wind|💨||smoke,trash",
    "Walking or biking to nearby places saves...|energy|🚲||trash,friends",
    "What does a solar panel use?|sunlight|☀️||rain,sand",
    "What does a wind turbine use?|wind|💨||sunlight,rain",
    "What can you unplug to save energy?|a charger you are not using|🔌||a sleeping cat,a tree",
    "Using less energy helps...|nature|🌍||nothing,only robots"
  ], "Saving energy is good for nature."));
  c.push(L("Trees and clean oceans", [
    "Trees help|🌳|Trees give shade, homes for animals and fresh air.",
    "Clean oceans|🌊|Trash in the ocean can hurt sea animals. Pick up litter at the beach.",
    "Protect homes|🏞️|When animals have a safe habitat, they can live and have babies."
  ], [
    "What do trees give animals?|homes|🌳||TVs,cars",
    "What can hurt sea animals?|trash in the ocean|🐢||clean water,fresh air",
    "What should you do with litter at the beach?|put it in a bin|🏖️||leave it,bury it",
    "A habitat gives an animal food, water and...|shelter|🏠||a bike,a phone",
    "Why do we plant trees?|for shade, homes and fresh air|🌱||to be noisy,to make trash",
    "Which helps a river stay clean?|not throwing trash in it|🏞️||throwing rocks,pouring paint",
    "Which is a good way to help animals?|protect their homes|🐾||cut down all the trees,leave trash around",
    "Who can help protect nature?|everyone, including kids|🌍||only robots,nobody"
  ], "Safe habitats help animals live."));
  c.push(MIX("Mixed practice", [c[0], c[2], c[4], c[7], c[10], c[13]]));
  c.push(MIX("Level 3 Challenge", [c[1], c[3], c[5], c[6], c[8], c[11], c[12], c[14], c[15], c[17]]));

  return { 1: a, 2: b, 3: c };
})();
