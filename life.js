// Mind Lab Life Science. Levels 1-3, 20 lessons each (60 lessons).
// Every lesson: 3 teaching slides, then quiz questions with 3 hints (nudge, clue, worked example).
// Needs math.js loaded first (uses pick, shuf).
const LIFE_LEVELS = (() => {
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
  a.push(L("Living or not living?", [
    "Living things|🐶🌳🐟|Living things <b>grow</b>, need <b>food or water</b>, and <b>breathe</b>. Plants, animals and people are living things.",
    "Not living things|🪨🚲🥄|Rocks, toys and bikes are <b>not living</b>. They do not grow, eat or breathe.",
    "A quick test|🤔|Ask yourself: does it grow? Does it need food or water? If yes, it is living."
  ], [
    "Is a puppy living or not living?|living|🐶",
    "Is a rock living or not living?|not living|🪨",
    "Is a tree living or not living?|living|🌳",
    "Is a toy car living or not living?|not living|🚗",
    "Is a fish living or not living?|living|🐟",
    "Is a bike living or not living?|not living|🚲",
    "Is a flower living or not living?|living|🌻",
    "Is a spoon living or not living?|not living|🥄",
    "Is a bird living or not living?|living|🐦"
  ], "Think: does it grow and need food or water?", "Living things grow and need food or water. Does this one?"));
  a.push(L("Living things grow", [
    "Living things grow|🐥➡️🐔|A baby chick grows into a big chicken. Living things <b>grow bigger</b> as time goes by.",
    "Plants grow too|🌱➡️🌳|A tiny seed grows into a plant. A small tree can grow very tall!",
    "Not living things stay the same|🧱|A toy block never grows. A rock stays a rock. Only living things grow."
  ], [
    "Which one will grow bigger over time?|a baby chick|🐥||a toy block,a pebble",
    "Which one will grow taller over time?|a tiny seedling|🌱||a chair,a spoon",
    "Which one will grow up to be a big dog?|a puppy|🐶||a stuffed toy,a rock",
    "Which one grows bigger as it gets older?|a kitten|🐱||a doll,a plate",
    "Which one does NOT grow?|a toy robot|🤖|Pick the one that is not alive.|a baby bird,a small plant",
    "Which one will grow into a tree?|an acorn|🌰||a button,a sock",
    "Which one grows bigger every year?|a baby|👶||a pencil,a cup",
    "Which one will grow into a frog?|a tadpole|🐸||a leaf,a bubble"
  ], "Living things grow bigger. Which choice is alive?"));
  a.push(L("What plants need", [
    "Plants need water|💧🌱|Plants drink water with their roots. Without water, a plant gets droopy.",
    "Plants need light|☀️🌿|Plants use sunlight to make their food. A plant likes a sunny spot.",
    "Plants need air and soil|🌬️🪴|Plants take in air and get help from soil. Water, light and air keep a plant happy and healthy."
  ], [
    "What do plants drink?|water|💧||light,candy",
    "What does a plant get from the sun?|light|☀️||water,soil",
    "What do plant roots grow in?|soil|🪴||juice,sand toys",
    "Which of these does a plant NOT need?|candy|🍬|Think about what a plant really needs.|water,light",
    "If a plant gets no water, what happens?|it wilts|🥀||it grows tall,it gets stronger",
    "Where should a plant sit to get light?|by a sunny window|🪟||in a dark box,under the bed",
    "What do we pour on a plant to help it grow?|water|🚿||paint,milk",
    "Plants are living things, so they need...|water and light|🌿||a TV,toys"
  ], "Plants need water, light, air and soil."));
  a.push(L("Parts of a plant", [
    "Roots|🌱|The <b>roots</b> grow under the ground. They hold the plant in place and drink water.",
    "Stem and leaves|🌿|The <b>stem</b> holds the plant up. The <b>leaves</b> are flat and green and catch sunlight.",
    "Flower|🌸|The <b>flower</b> is the bright, pretty part. Some flowers grow into fruit and seeds."
  ], [
    "Which part grows under the ground?|roots|🌱",
    "Which part holds the plant up?|stem|🌿",
    "Which parts are green and flat?|leaves|🍃",
    "Which part is bright and pretty?|flower|🌷",
    "Which part drinks water from the soil?|roots|💧",
    "Which parts catch sunlight?|leaves|☀️",
    "Which part is like the plant's neck, standing tall?|stem|🌻",
    "Which part can smell nice and attract bees?|flower|🐝"
  ], "Think about where each part is on a plant.", "Picture the plant: roots below, stem in the middle, leaves and flower on top."));
  a.push(L("Seeds", [
    "What is a seed?|🌰|A seed is a tiny package. Inside is a baby plant, waiting to grow.",
    "How a seed grows|🌱|Plant it in soil, give it water, and keep it warm. A little sprout pops out!",
    "Seeds are everywhere|🍎🍉🌻|Apples, watermelons and sunflowers all have seeds."
  ], [
    "What does a seed grow into?|a plant|🌱||a rock,a bug",
    "Where do you plant a seed?|in soil|🪴||on a plate,in the sky",
    "What do you give a seed so it can grow?|water|💧||a toy,a hat",
    "Which fruit has seeds inside?|a watermelon|🍉||a brick,a coin",
    "A tiny seed can grow into a big...|tree|🌳||bike,table",
    "What pops out of a seed first?|a tiny sprout|🌱||a flower,a fruit",
    "What do pumpkin seeds grow into?|a pumpkin plant|🎃||a cat,a car",
    "Dandelion seeds fly away on the...|wind|🌼||rocks,plates"
  ], "A seed holds a baby plant inside."));
  a.push(L("My five senses", [
    "Five senses|👁️👂👃👅✋|We have five senses: <b>sight</b>, <b>hearing</b>, <b>smell</b>, <b>taste</b> and <b>touch</b>.",
    "Which body part?|👁️ eyes · 👂 ears · 👃 nose|Eyes see. Ears hear. The nose smells. The tongue tastes. Skin feels.",
    "Senses keep us safe|🔥🔔|Senses tell us about the world, like a hot stove or a ringing bell."
  ], [
    "Which sense do you use with your ears?|hearing|👂",
    "Which sense do you use with your eyes?|sight|👁️",
    "Which sense do you use with your nose?|smell|👃",
    "Which sense do you use with your tongue?|taste|👅",
    "Which sense do you use with your skin and hands?|touch|✋",
    "You sniff a flower. Which sense is that?|smell|🌸",
    "You listen to a bell. Which sense is that?|hearing|🔔",
    "You pet a soft teddy bear. Which sense is that?|touch|🧸",
    "You lick ice cream. Which sense is that?|taste|🍦"
  ], "Which body part are you using?"));
  a.push(L("Eyes and ears", [
    "Eyes see|👁️|Your eyes help you see colors, shapes and faces. Never look straight at the sun.",
    "Ears hear|👂|Your ears hear music, voices and animals. Very loud sounds can hurt your ears.",
    "Take care|🕶️🔉|Wear sunglasses on bright days and keep the volume low."
  ], [
    "What do your eyes do?|see|👁️||hear,smell",
    "What do your ears do?|hear|👂||see,taste",
    "Which one can you hear?|a drum|🥁||a rainbow,a picture",
    "Which one can you see?|a rainbow|🌈||a whisper,a song",
    "How can you be kind to your ears?|keep the volume low|🔉||turn it up loud,shout in them",
    "On a very bright sunny day you can wear...|sunglasses|🕶️||mittens,boots",
    "Which one is a sound?|a ring of a bell|🔔||a red color,a sweet taste",
    "Which one do you look at with your eyes?|a painting|🖼️||a lullaby,a drumbeat"
  ], "Eyes are for seeing. Ears are for hearing."));
  a.push(L("Nose, tongue and skin", [
    "Nose and tongue|👃👅|Your <b>nose</b> smells flowers and cookies. Your <b>tongue</b> tastes sweet, sour and salty things.",
    "Skin feels|✋|Your <b>skin</b> feels soft, rough, hot and cold. It helps you stay safe.",
    "Try it|🍋🍯🧊|A lemon tastes sour. Honey tastes sweet. An ice cube feels cold."
  ], [
    "What do you use your nose for?|smelling|👃||hearing,seeing",
    "What do you use your tongue for?|tasting|👅||hearing,seeing",
    "Which one feels soft?|a teddy bear|🧸||a brick,a nail",
    "Which one feels cold?|an ice cube|🧊||hot soup,a warm blanket",
    "Which one tastes sour?|a lemon|🍋||a cake,a marshmallow",
    "Which one tastes sweet?|honey|🍯||a lemon,a pickle",
    "Which one smells nice?|a flower|🌸||old trash,a wet sock",
    "Which one feels rough?|tree bark|🌳||a feather,a ribbon"
  ], "Think about which sense you would use."));
  a.push(L("Parts of my body", [
    "Head and body|🙂|Your <b>head</b> is on top. Your <b>tummy</b> is in the middle of your body.",
    "Arms and legs|💪🦵|Your <b>arms</b> have <b>elbows</b> that bend and <b>hands</b> with fingers. Your <b>legs</b> have <b>knees</b> that bend and <b>feet</b> with toes.",
    "Use them|🚶👋|You walk with your legs and wave with your hand."
  ], [
    "Which part do you kick a ball with?|foot|⚽||hand,head",
    "Which part do you wave with?|hand|👋||foot,knee",
    "Which part sits on top of your body?|head|🙂||knee,elbow",
    "Which part bends in the middle of your arm?|elbow|💪",
    "Which part bends in the middle of your leg?|knee|🦵",
    "Which parts are at the end of your hand and have nails?|fingers|✋",
    "Which part helps you smell a flower?|nose|👃||elbow,knee",
    "Which part holds your lunch?|tummy|🍽️"
  ], "Point to the part on your own body.", "Touch the part on your own body. Where is it?"));
  a.push(L("Inside my body", [
    "Brain|🧠|Your <b>brain</b> is in your head. It helps you think, learn and remember.",
    "Heart and lungs|❤️🫁|Your <b>heart</b> pumps blood around your body. Your <b>lungs</b> help you breathe air.",
    "Bones and muscles|🦴💪|<b>Bones</b> hold your body up. <b>Muscles</b> help you move."
  ], [
    "Which body part helps you think?|brain|🧠",
    "Which body part beats, thump thump?|heart|❤️",
    "Which body parts help you breathe?|lungs|🫁",
    "What holds your body up from the inside?|bones|🦴",
    "What helps you move and be strong?|muscles|💪",
    "Where does your food go after you swallow?|stomach|🍽️",
    "When you run, your heart beats...|faster|🏃||slower,never",
    "You breathe in air through your...|nose|👃||elbow,knee"
  ], "Think about each job inside your body."));
  a.push(L("What animals need", [
    "Food and water|🍖💧|Animals need <b>food</b> and <b>water</b> to grow and stay strong.",
    "Air and a home|🌬️🏠|Animals breathe <b>air</b>. They also need a <b>home</b> or shelter to stay safe.",
    "Animals are alive|🐾|Animals are living things. They grow, move, eat and have babies."
  ], [
    "What do animals eat so they can grow?|food|🍖||toys,paper",
    "What do animals drink?|water|💧||soap,paint",
    "What do animals breathe?|air|🌬️||sand,milk",
    "Where does a bird keep its eggs safe?|a nest|🪺||a plate,a bed",
    "Which of these does an animal NOT need?|a TV|📺|Think about what keeps an animal alive.|food,water",
    "Where do animals stay safe and warm?|a home|🏠||a toy store,a swimming pool",
    "Do animals need sleep?|yes|😴||no",
    "Do animals need food?|yes|🍽️||no"
  ], "Animals need food, water, air and a home."));
  a.push(L("Plant or animal?", [
    "Plants|🌹🌳|Plants stay in one place. They make their own food from sunlight, water and air.",
    "Animals|🐰🦋|Animals can move around. They eat plants or other animals for food.",
    "How to tell|🤔|Can it walk, hop, swim or fly? Then it is an animal. Does it grow in the ground? Then it is a plant."
  ], [
    "Is a rose a plant or an animal?|plant|🌹||animal",
    "Is a rabbit a plant or an animal?|animal|🐰||plant",
    "Is an oak tree a plant or an animal?|plant|🌳||animal",
    "Is a frog a plant or an animal?|animal|🐸||plant",
    "Is grass a plant or an animal?|plant|🌱||animal",
    "Is a butterfly a plant or an animal?|animal|🦋||plant",
    "Is a cactus a plant or an animal?|plant|🌵||animal",
    "Is a duck a plant or an animal?|animal|🦆||plant"
  ], "Can it move around by itself, or does it grow in one spot?"));
  a.push(L("Healthy food", [
    "Fruits and vegetables|🍎🥕|Fruits and vegetables give your body vitamins. Eat lots of colors!",
    "Water and milk|💧🥛|Water is a great drink. Milk helps make your bones strong.",
    "Treats are sometimes foods|🍫|Candy is fine once in a while, but it should not be your main food."
  ], [
    "Which one is a fruit?|a banana|🍌||a carrot,broccoli",
    "Which one is a vegetable?|a carrot|🥕||a banana,a grape",
    "Which one is a vegetable?|broccoli|🥦||an orange,a peach",
    "Which is a healthy drink?|water|💧||soda,sugar syrup",
    "Which one is a sometimes treat?|a candy bar|🍫||an apple,a carrot",
    "Which drink helps make strong bones?|milk|🥛||soda,sugar syrup",
    "Which one is a fruit?|a strawberry|🍓||lettuce,a potato",
    "Which one is a healthy snack?|apple slices|🍎||a candy bar,a bag of sprinkles"
  ], "Fruits, vegetables, water and milk are healthy choices."));
  a.push(L("Sleep and rest", [
    "Sleep is important|😴|When you sleep, your body rests and gets ready for tomorrow. Kids grow while they sleep.",
    "Get ready for bed|🪥🛏️|Brush your teeth, put on pajamas, and have a calm story.",
    "Quiet and calm|🌙|A quiet, dark room helps you sleep well."
  ], [
    "When do most kids sleep?|at night|🌙||at lunch time,in the middle of school",
    "What does sleep give your body?|rest|😴||noise,more homework",
    "What should you do before bed?|brush your teeth|🪥||run around,eat candy",
    "A good place to sleep is a...|quiet bed|🛏️||loud playground,busy road",
    "Which helps you sleep well?|a calm bedtime story|📖||a loud video game,a noisy party",
    "Do kids grow while they sleep?|yes|🌱||no",
    "Why do we rest?|to get energy back|⚡||to turn green,to shrink",
    "When you are very tired, your body needs...|sleep|😴||paint,a toy"
  ], "Sleep helps your body rest and grow."));
  a.push(L("Keeping clean", [
    "Wash your hands|🧼💧|Wash with <b>soap and water</b> before you eat and after you use the bathroom. Tiny germs wash away.",
    "Brush your teeth|🪥|Brush your teeth in the morning and at night for <b>2 minutes</b>.",
    "Cover coughs|🤧|When you sneeze or cough, cover your nose and mouth with your elbow."
  ], [
    "What do you use to wash your hands?|soap and water|🧼||paint,juice",
    "Wash your hands before you...|eat|🍽️||sleep,run",
    "Wash your hands after you use the...|bathroom|🚽||kitchen table,bed",
    "How long should you brush your teeth?|2 minutes|🪥||2 seconds,2 hours",
    "What do you brush your teeth with?|toothpaste|🪥||glue,ketchup",
    "When you sneeze, cover your nose with your...|elbow|🤧||shoe,hat",
    "Germs are very...|tiny|🦠||huge,loud",
    "Which keeps your hair clean?|shampoo|🧴||glue,ketchup"
  ], "Think about how to stay clean and healthy."));
  a.push(L("Move your body", [
    "Exercise|🏃|Running, jumping and dancing are exercise. Exercise makes your <b>muscles and heart strong</b>.",
    "Every day|⏱️|Kids should move their bodies for about <b>1 hour</b> every day.",
    "Warm up and drink|🤸💧|Stretch before you play. Drink water when you are hot."
  ], [
    "Which one is exercise?|jumping rope|🪢||watching TV,napping",
    "Which one is exercise?|riding a bike|🚲||sitting on a couch,lying in bed",
    "Exercise makes your muscles...|strong|💪||weak,sleepy",
    "After a big run, your body wants a drink of...|water|💧||paint,glue",
    "A good goal for kids is to move how long each day?|about 1 hour|⏱️||1 minute,10 hours",
    "What should you do before hard exercise?|stretch|🤸||eat a huge meal,take a nap",
    "Which one helps your heart stay strong?|playing tag|🏃||sleeping all day,lying still",
    "Which one is a fun way to move?|dancing|💃||sitting still,watching clouds"
  ], "Exercise means moving your body."));
  a.push(L("Big plants, small plants", [
    "Trees|🌳|Trees are the tallest plants. They have a thick <b>trunk</b> and lots of leaves.",
    "Grass, flowers and cactus|🌵🌷|Grass is short. Flowers are bright. A cactus has prickly spines and lives in dry places.",
    "Different leaves|🍁🌲|A pine tree has needles. A maple tree has flat leaves that fall in autumn."
  ], [
    "Which is the tallest plant?|a tree|🌳||grass,a flower",
    "Which plant has a thick trunk?|a tree|🪵||a daisy,a clover",
    "Which plant has prickly spines and grows in the desert?|a cactus|🌵||an oak,a daisy",
    "Which plant is small, bright and smells nice?|a flower|🌷||an oak tree,a cactus",
    "Which tree has needles instead of flat leaves?|a pine tree|🌲||an oak tree,a rose",
    "Which tree drops its leaves in autumn?|a maple tree|🍁||a pine tree,a cactus",
    "Which plant floats on a pond?|a water lily|🪷||a cactus,an oak tree",
    "Which plant do cows like to eat?|grass|🐄||a cactus,a tree trunk"
  ], "Think about the size and shape of the plant."));
  a.push(L("Living things review", [
    "Living things|🌱🐶|Living things grow, need food and water, and breathe air.",
    "Plants and animals|🌳🐰|Plants make their own food. Animals find food. Both are alive.",
    "Staying healthy|🍎😴🏃|Eat well, sleep, move and wash your hands. That keeps you healthy."
  ], [
    "Which is living?|a tulip|🌷||a toy,a pencil",
    "Which is NOT living?|a pencil|✏️|It does not grow or breathe.|a worm,a tree",
    "A plant needs water, light and...|air|🌿||candy,toys",
    "Animals get food by...|eating|🍎||sleeping,painting",
    "Which body part helps you think?|brain|🧠||knee,elbow",
    "Which sense uses your nose?|smell|👃||sight,hearing",
    "Which part of a plant is under the ground?|roots|🌱||leaves,flower",
    "Which helps keep your hands clean?|soap and water|🧼||paint,sand"
  ], "Use what you learned this level."));
  a.push(MIX("Mixed practice", [a[0], a[2], a[3], a[5], a[8], a[10]]));
  a.push(MIX("Level 1 Challenge", [a[1], a[3], a[4], a[6], a[9], a[12], a[14], a[17]]));

  // ================= LEVEL 2 =================
  const b = [];
  b.push(L("What roots do", [
    "Roots hold on|🌳|Roots grow into the soil and hold the plant firmly, like an anchor, so wind does not blow it over.",
    "Roots drink|💧|Roots soak up water from the soil. The water travels up the plant.",
    "Roots we eat|🥕|A carrot is a root! Radishes and beets are roots too."
  ], [
    "Roots hold a plant in the...|soil|🌱||sky,air",
    "What do roots soak up?|water|💧||sunlight,music",
    "Which one is a root we eat?|a carrot|🥕||lettuce,celery",
    "Roots keep a plant from blowing...|over|💨||blue,loud",
    "Where do most roots grow?|under the ground|⬇️||up in the clouds,on the leaves",
    "Which part of the plant is like a straw drinking water?|roots|🥤||flowers,leaves",
    "Which one is a root we eat?|a radish|🔴||broccoli,a pea",
    "A tree stays standing in a storm because of its...|roots|🌳||paint,shoes"
  ], "Roots are the plant's anchor and drink."));
  b.push(L("Stems and leaves", [
    "The stem|🌿|The stem holds the plant up. It carries water from the roots to the leaves.",
    "The leaves|🍃|Leaves catch sunlight. They use it to make food for the plant.",
    "Fresh air|🌬️|Leaves take in air and let out fresh air that we breathe."
  ], [
    "Which part holds the plant up?|stem|🌿||root,petal",
    "What does the stem carry up to the leaves?|water|💧||toys,paint",
    "Which part catches sunlight?|leaves|☀️||roots,stem",
    "Which part makes food for the plant?|leaves|🍃||roots,petals",
    "Leaves let out fresh air for us to...|breathe|🌬️||paint,hear",
    "Which part of the plant is like a tall straw?|stem|🥤||leaf,flower",
    "Which one is a stem we eat?|celery|🥬||a carrot,a pea",
    "Which one is a leaf we eat?|lettuce|🥗||celery,a carrot"
  ], "Stems carry water. Leaves make food."));
  b.push(L("Flowers, fruit and seeds", [
    "Flowers|🌸|Flowers have colorful <b>petals</b>. Many flowers turn into fruit.",
    "Fruit|🍎|Fruit grows from a flower. Inside the fruit are seeds.",
    "Seeds|🌰|Each seed can grow into a new plant. That is how plants make more plants."
  ], [
    "What are the colorful parts of a flower called?|petals|🌸||roots,seeds",
    "What grows from a flower?|fruit|🍎||shoes,bricks",
    "What is inside many fruits?|seeds|🍊||bones,toys",
    "A new plant can grow from a...|seed|🌱||pebble,coin",
    "Which part gives a plant its bright color?|petals|🌺||roots,stem",
    "A sunflower makes lots of...|seeds|🌻||shoes,eggs",
    "A pea pod holds peas, which are...|seeds|🫛||roots,flowers",
    "An apple grows from an apple...|blossom|🌸||shoe,rock"
  ], "Flower, then fruit, then seeds."));
  b.push(L("Bees and flowers", [
    "Bees visit flowers|🐝🌼|Bees drink a sweet juice called <b>nectar</b> from flowers.",
    "Sticky pollen|🌼|Pollen is a yellow dust on flowers. It sticks to bees and gets carried to other flowers.",
    "Helpers|🐝🦋|Bees, butterflies and hummingbirds help flowers make seeds."
  ], [
    "What do bees drink from flowers?|nectar|🐝||milk,juice boxes",
    "What yellow dust do bees carry?|pollen|🌼||sand,salt",
    "Which animal visits flowers for nectar?|a bee|🐝||a cow,a fish",
    "Bees help flowers make...|seeds|🌻||shoes,rain",
    "Which of these also visits flowers?|a butterfly|🦋||a shark,a lion",
    "Where do bees get nectar?|from flowers|🌸||from rocks,from shoes",
    "Pollen is what color on many flowers?|yellow|🟡||purple only,invisible",
    "A bee goes from flower to flower, carrying...|pollen|🐝||pizza,socks"
  ], "Bees visit flowers and carry pollen."));
  b.push(L("Trees", [
    "Parts of a tree|🌳|A tree has <b>roots</b>, a thick <b>trunk</b> with <b>bark</b>, <b>branches</b> and leaves.",
    "Evergreens|🌲|Evergreen trees, like pines, stay green all year.",
    "Leaf-droppers|🍂|Some trees drop their leaves in autumn and grow new ones in spring."
  ], [
    "What is the thick middle part of a tree called?|trunk|🪵||petal,seed",
    "What is the outside skin of a tree trunk called?|bark|🌳||fur,wool",
    "What grows out of a trunk and holds the leaves?|branches|🌿||roots,petals",
    "Which kind of tree stays green all year?|an evergreen|🌲||a maple,a cactus",
    "When do many trees drop their leaves?|in autumn|🍂||in summer,at night",
    "Trees give animals a home like a...|nest|🪺||pizza,boat",
    "Which tree has needles?|a pine tree|🌲||a maple,a rose",
    "A tree's roots are under the...|ground|⬇️||clouds,moon"
  ], "Think about the parts of a tree."));
  b.push(L("Plants we eat", [
    "Different plant parts|🥕🥬|We eat different parts of plants. A carrot is a root. Lettuce is leaves.",
    "Stems and flowers|🥦|Celery is a stem. Broccoli is a flower.",
    "Seeds and fruit|🫛🍎|Peas are seeds. Apples are fruit."
  ], [
    "A carrot is the plant's...|root|🥕||leaf,petal",
    "Lettuce is the plant's...|leaves|🥬||roots,seeds",
    "Celery is the plant's...|stem|🥬||roots,fruit",
    "Broccoli is a plant's...|flower|🥦||root,seed",
    "Peas are the plant's...|seeds|🫛||roots,leaves",
    "An apple is a...|fruit|🍎||root,stem",
    "Spinach is the plant's...|leaves|🥬||roots,seeds",
    "A radish is the plant's...|root|🔴||flower,fruit"
  ], "Which part of the plant is it?"));
  b.push(L("Animal body parts", [
    "Wings, fins and legs|🐦🐟🐕|Birds have <b>wings</b>. Fish have <b>fins</b>. Dogs have <b>legs</b>. Each part has a job.",
    "More parts|🐘|An elephant uses its <b>trunk</b> to drink and pick things up. Birds use their <b>beaks</b> to eat.",
    "Tails|🐒|Some animals use tails to balance, swim or keep flies away."
  ], [
    "What do birds fly with?|wings|🐦||fins,paws",
    "What do fish swim with?|fins|🐟||wings,legs",
    "What do dogs run with?|legs|🐕||fins,wings",
    "What does a bird eat with?|a beak|🐥||a trunk,a fin",
    "What does an elephant pick things up with?|its trunk|🐘||its tail,its wings",
    "What does a cow swish to keep flies away?|its tail|🐄||its beak,its fin",
    "What helps a duck swim?|webbed feet|🦆||big ears,tiny horns",
    "What does a giraffe use to reach high leaves?|its long neck|🦒||its fins,its wings"
  ], "Think about what the body part helps the animal do."));
  b.push(L("Animal senses", [
    "Super noses|🐶|A dog has an amazing sense of <b>smell</b>. It can sniff out things we cannot.",
    "Super eyes and ears|🦉🦇|An owl sees well in the dark. A bat uses sound to find its way at night.",
    "Whiskers|🐱|A cat's whiskers help it feel things around it."
  ], [
    "Which animal has an amazing sense of smell?|a dog|🐶||a fish,a snail",
    "Which animal sees well in the dark?|an owl|🦉||a cow,a hen",
    "Which animal uses sound to find its way at night?|a bat|🦇||a horse,a duck",
    "What helps a cat feel things around it?|whiskers|🐱||wings,scales",
    "An eagle can see things very far...|away|🦅||inside,asleep",
    "A rabbit has long ears to help it...|hear|🐰||swim,fly",
    "Which sense does a dog use most to find food?|smell|🐕||touch,sight",
    "A snake flicks its tongue to...|smell|🐍||whistle,sing"
  ], "Animals use their senses to stay safe and find food."));
  b.push(L("Day and night animals", [
    "Day animals|☀️🐿️|Many animals, like squirrels and butterflies, are awake in the day.",
    "Night animals|🌙🦉|Owls, bats and hedgehogs wake up at night. They sleep in the day.",
    "Why?|🤔|Some animals hunt or hide better in the dark."
  ], [
    "Which animal is awake at night?|an owl|🦉||a squirrel,a robin",
    "Which animal is awake at night?|a bat|🦇||a bee,a butterfly",
    "Which animal is awake in the day?|a squirrel|🐿️||a bat,an owl",
    "Which animal is awake in the day?|a butterfly|🦋||a hedgehog,a bat",
    "A bee collects nectar when the sun is...|up|🐝||down,off",
    "Which animal sleeps in the day and wakes at night?|a hedgehog|🦔||a robin,a bee",
    "A robin sings in the...|morning|🐦||middle of the night,dark",
    "Fireflies light up at...|night|✨||noon,breakfast"
  ], "Day animals are awake in daylight. Night animals wake when it is dark."));
  b.push(L("Babies grow up", [
    "Babies look like parents|🐕🐶|A puppy grows up to be a dog. A kitten grows up to be a cat.",
    "Growing takes time|⏳|Baby animals eat, play and sleep as they grow bigger.",
    "Then they are adults|🐔|A chick grows into a hen or rooster."
  ], [
    "A puppy grows up to be a...|dog|🐶||cat,horse",
    "A kitten grows up to be a...|cat|🐱||dog,cow",
    "A chick grows up to be a...|chicken|🐥||duck,goose",
    "A calf grows up to be a...|cow|🐮||pig,sheep",
    "A foal grows up to be a...|horse|🐴||cow,sheep",
    "A lamb grows up to be a...|sheep|🐑||goat,cow",
    "A piglet grows up to be a...|pig|🐷||cow,horse",
    "A duckling grows up to be a...|duck|🦆||chicken,goose"
  ], "The baby grows into its parent's kind."));
  b.push(L("Butterfly life cycle", [
    "Egg and caterpillar|🥚🐛|A butterfly starts as a tiny <b>egg</b>. A <b>caterpillar</b> hatches and eats lots of leaves.",
    "Chrysalis|🟢|The caterpillar makes a hard shell called a <b>chrysalis</b> and changes inside.",
    "Butterfly|🦋|A <b>butterfly</b> comes out with wings!"
  ], [
    "What does a butterfly start as?|an egg|🥚||a chrysalis,a flower",
    "What hatches from a butterfly egg?|a caterpillar|🐛||a butterfly,a bee",
    "What does a caterpillar eat?|leaves|🍃||fish,ice",
    "What does a caterpillar make to change inside?|a chrysalis|🟢||a nest,a web",
    "What comes out of the chrysalis?|a butterfly|🦋||an egg,a bee",
    "How many stages does a butterfly have?|four|4️⃣||two,nine",
    "Which stage has wings?|butterfly|🦋||egg,caterpillar",
    "Which stage hatches out of the egg?|caterpillar|🐛||butterfly,chrysalis"
  ], "Egg, caterpillar, chrysalis, butterfly."));
  b.push(L("Frog life cycle", [
    "Eggs and tadpoles|🥚🐸|A frog starts as a jelly-like egg in water. A <b>tadpole</b> hatches and swims.",
    "Growing legs|🦵|The tadpole grows back legs, then front legs. Its tail gets shorter.",
    "A frog|🐸|The tadpole becomes a frog that can hop and live on land."
  ], [
    "Where does a frog lay its eggs?|in water|💧||in a tree,in the sand",
    "What hatches from a frog egg?|a tadpole|🐸||a caterpillar,a chick",
    "What does a tadpole use to swim?|a tail|🌊||wings,hooves",
    "What does a tadpole grow?|legs|🦵||feathers,fur",
    "A grown frog can...|hop|🐸||fly,roar",
    "A tadpole lives in...|water|💧||the sky,a nest",
    "Which one is a baby frog?|a tadpole|🐸||a chick,a calf",
    "What happens to the tadpole's tail?|it gets shorter|✂️||it gets wings,it turns green"
  ], "Egg, tadpole, froglet, frog."));
  b.push(L("Plant life cycle", [
    "Seed to sprout|🌰🌱|A seed gets water and warmth, and a tiny <b>sprout</b> grows.",
    "Plant and flower|🌿🌼|The sprout grows into a plant. The plant makes flowers.",
    "New seeds|🌻🌰|The flowers make new seeds, and the cycle begins again."
  ], [
    "What comes first in a plant's life?|a seed|🌰||a flower,a fruit",
    "What grows out of a seed?|a sprout|🌱||a fish,an egg",
    "What does a plant make when it is grown?|flowers|🌼||eggs,feathers",
    "What do flowers make for new plants?|seeds|🌻||shells,bones",
    "What does a seed need to start growing?|water|💧||toys,paper",
    "A sprout grows into a...|plant|🌿||frog,bird",
    "Which comes last in the plant cycle?|new seeds|🌰||an egg,a tadpole",
    "A plant's life cycle starts again with a...|seed|🌰||shell,stone"
  ], "Seed, sprout, plant, flower, new seeds."));
  b.push(L("Animals that hatch from eggs", [
    "Eggs|🥚|Many animals lay eggs. Baby animals grow inside until they hatch.",
    "Egg layers|🐔🐢🐟|Birds, turtles, fish, frogs and snakes lay eggs.",
    "Not all|🐶🐱|Dogs, cats, cows and people do not lay eggs. Their babies grow inside the mother."
  ], [
    "Which animal lays eggs?|a chicken|🐔||a cow,a dog",
    "Which animal lays eggs?|a turtle|🐢||a cat,a horse",
    "Which animal does NOT lay eggs?|a dog|🐕|Its babies grow inside the mother.|a bird,a frog",
    "Which animal lays eggs?|a duck|🦆||a pig,a sheep",
    "A baby bird hatches out of an...|egg|🥚||apple,acorn",
    "Which animal lays eggs in water?|a frog|🐸||a cat,a cow",
    "Which animal does NOT lay eggs?|a cat|🐱|Its babies grow inside the mother.|a snake,a bird",
    "Which animal lays eggs?|a snake|🐍||a horse,a rabbit"
  ], "Think about which animals lay eggs."));
  b.push(L("Bones and muscles", [
    "Bones|🦴|Bones are hard. They hold you up and protect parts inside, like your brain.",
    "Muscles|💪|Muscles pull on bones to make them move. Using muscles makes them strong.",
    "Joints|🦵|Your elbows and knees are joints. They bend so you can move."
  ], [
    "What holds your body up?|bones|🦴||hair,nails",
    "What helps your body move?|muscles|💪||teeth,eyes",
    "What protects your brain?|your skull|💀|The skull is the bone in your head.|your elbow,your toe",
    "Where does your arm bend?|elbow|💪||wrist only,shoulder only",
    "Where does your leg bend?|knee|🦵||elbow,wrist",
    "How do you make muscles strong?|exercise|🏃||sitting all day,sleeping",
    "Bones are...|hard|🦴||soft like jelly,wet",
    "What pulls bones to make them move?|muscles|💪||eyes,hair"
  ], "Bones are hard. Muscles move bones."));
  b.push(L("Heart and lungs", [
    "Your heart|❤️|Your heart is about as big as your fist. It pumps blood all around your body.",
    "Your lungs|🫁|You breathe in air. Your lungs take the good part, called oxygen, into your blood.",
    "Feel it|✋|Put your hand on your chest. You can feel your heart beat!"
  ], [
    "What pumps blood around your body?|heart|❤️||lungs,brain",
    "What helps you breathe?|lungs|🫁||heart,stomach",
    "About how big is your heart?|as big as your fist|✊||as big as a house,as tiny as a pea",
    "What do you breathe in?|air|🌬️||sand,milk",
    "After running, your heart beats...|faster|🏃||slower,never",
    "When you rest, your breathing gets...|slower|😌||louder than a drum,stuck",
    "Where are your lungs?|in your chest|🫁||in your foot,in your ear",
    "What does your body get from air that it needs?|oxygen|💨||sugar,water"
  ], "The heart pumps. The lungs breathe."));
  b.push(L("Teeth", [
    "Teeth chew|🦷|Teeth help you bite and chew your food. Strong teeth are important.",
    "Baby teeth|😁|Kids have 20 baby teeth. They fall out and bigger teeth grow in.",
    "Take care|🪥|Brush two times a day. Eat healthy food. Visit the dentist."
  ], [
    "What do teeth help you do?|chew|🍎||hear,see",
    "How many baby teeth do kids have?|20|🦷||2,200",
    "What happens to baby teeth?|they fall out|😁||they turn blue,they turn into stars",
    "What do you brush your teeth with?|a toothbrush|🪥||a spoon,a shoe",
    "Who helps keep your teeth healthy?|a dentist|🧑‍⚕️||a pilot,a baker",
    "Which food is bad for teeth in large amounts?|sugary candy|🍬||apples,cheese",
    "How often should you brush your teeth?|2 times a day|🪥||once a year,never",
    "Which food helps teeth stay strong?|cheese|🧀||soda,sticky candy"
  ], "Healthy teeth need brushing and good food."));
  b.push(L("Healthy habits", [
    "Eat well|🍎|Eat fruits and vegetables and drink water.",
    "Sleep and move|😴🏃|Sleep at night and move your body every day.",
    "Stay clean|🧼|Wash your hands and brush your teeth."
  ], [
    "Which is a healthy habit?|washing your hands|🧼||skipping sleep,only eating candy",
    "How much should kids move each day?|about 1 hour|⏱️||5 seconds,all night",
    "Which is a healthy drink?|water|💧||soda,syrup",
    "When should you brush your teeth?|morning and night|🪥||only on birthdays,never",
    "Which helps your body grow?|sleep|😴||skipping meals,staying up all night",
    "Which food is a healthy snack?|carrot sticks|🥕||candy,chips every day",
    "When you cough, cover your mouth with your...|elbow|🤧||hand only,shoe",
    "Which is NOT a healthy habit?|skipping sleep|🚫|Pick the choice that does not help your body.|eating fruit,washing hands"
  ], "Healthy habits help your body stay strong."));
  b.push(MIX("Mixed practice", [b[0], b[1], b[4], b[8], b[11], b[14]]));
  b.push(MIX("Level 2 Challenge", [b[2], b[5], b[6], b[9], b[10], b[12], b[15], b[17]]));

  // ================= LEVEL 3 =================
  const c = [];
  c.push(L("What living things need", [
    "Basic needs|💧🍎🌬️|All living things need <b>water</b>, <b>food</b> and <b>air</b>.",
    "Space and shelter|🏠|Plants need room to grow. Animals need space and a safe shelter.",
    "Different needs|🐟🌵|A fish needs water to live in. A cactus needs only a little water."
  ], [
    "Which is a basic need for all living things?|water|💧||toys,video games",
    "Plants make their own food. Animals must...|find food|🍖||sleep all day,buy shoes",
    "Which does an animal need for safety?|shelter|🏠||a TV,a bike",
    "A fish needs to live in...|water|🐟||a tree,sand only",
    "A plant needs room to...|grow|🌱||drive,sing",
    "A cactus needs only a little...|water|🌵||sunlight,air",
    "Which is a need, not a want?|food|🍎||a game,a toy",
    "What do living things take in to breathe?|air|🌬️||sand,paint"
  ], "Needs are things living things must have."));
  c.push(L("Plants make food", [
    "Leaves are food makers|🍃|Plants make their own food in their <b>leaves</b>. This is a big job.",
    "What they use|☀️💧🌬️|They use <b>sunlight</b>, <b>water</b> and <b>air</b> to make the food.",
    "Fresh air for us|😮‍💨|While making food, plants give out <b>oxygen</b>, the part of air we need to breathe."
  ], [
    "Where do plants make their food?|in the leaves|🍃||in the roots,in the petals only",
    "What gives plants energy to make food?|sunlight|☀️||moonlight,candy",
    "What do roots bring to the plant?|water|💧||sunlight,oxygen",
    "What do plants give out for us to breathe?|oxygen|🌿||sand,smoke",
    "Which does a plant use to make food?|sunlight, water and air|🌱||milk and rocks,toys and candy",
    "Without sunlight, a plant will...|get weak|🌑||grow super fast,sing",
    "Animals cannot make their own food, so they...|eat|🍎||photosynthesize,glow",
    "Plants are the start of many animals' food because they...|make food|🌿||sleep,run"
  ], "Plants are food makers."));
  c.push(L("Plants in different places", [
    "Desert plants|🌵|A cactus stores water in its thick stem. It has spines instead of thin leaves.",
    "Water plants|🪷|A water lily floats on a pond. Seaweed grows in the ocean.",
    "Forest plants|🌲|Tall trees, ferns and moss grow where there is lots of rain."
  ], [
    "Which plant lives in a dry desert?|a cactus|🌵||a water lily,seaweed",
    "Which plant floats on a pond?|a water lily|🪷||a cactus,a pine tree",
    "Which plant grows in the ocean?|seaweed|🌊||a cactus,an oak",
    "A cactus stores water in its...|stem|🌵||petals,roots only",
    "Which place gets lots of rain and has tall trees?|a rainforest|🌴||a desert,a freezer",
    "Which place is dry and hot?|a desert|🏜️||a pond,a rainforest",
    "Moss likes places that are...|damp|💧||super dry,burning hot",
    "A cactus has spines instead of...|thin leaves|🌵||roots,seeds"
  ], "Plants live where they can get what they need."));
  c.push(L("Inside a seed", [
    "A seed has parts|🌰|A seed has a hard <b>seed coat</b> on the outside. It keeps the inside safe.",
    "Baby plant|🌱|Inside is a tiny <b>baby plant</b>. It is waiting for water and warmth.",
    "Packed lunch|🥜|A seed also has stored food, so the baby plant can eat while it grows."
  ], [
    "What is the hard outside of a seed called?|seed coat|🌰||peel of a banana,wing",
    "What is the tiny thing inside a seed?|a baby plant|🌱||a fish,a pebble",
    "What does the seed coat do?|keeps the seed safe|🛡️||sings songs,paints leaves",
    "Why does a seed have stored food?|to feed the baby plant|🥜||to feed the dog,to make a snack for you",
    "A seed is waiting for water and...|warmth|🌡️||ice,music",
    "Which part of the seed becomes the plant?|the baby plant|🌱||the coat,the wrapper",
    "Seeds can be big, like a coconut, or...|tiny|🔍||invisible,heavy as a car",
    "What gives the baby plant food inside the seed?|stored food|🥜||the label,the sunshine"
  ], "A seed has a coat, a baby plant and food."));
  c.push(L("How a seed sprouts", [
    "Water first|💧🌰|A seed soaks up water and swells.",
    "Roots, then shoot|🌱|A little root grows down. Then a shoot grows up toward the light.",
    "Try it|🫘|Put a bean in a damp paper towel in a bag. In a few days you may see it sprout!"
  ], [
    "What does a seed do first when it gets wet?|soaks up water|💧||sings a song,jumps",
    "Which part grows down from a sprouting seed?|the root|🌱||the leaf,the flower",
    "Which part grows up toward the light?|the shoot|🌱||the root,the seed coat",
    "A seed needs water and...|warmth|🌡️||homework,snow only",
    "A sprouting bean in a damp towel is a...|science test|🔬||a pizza,a game",
    "The first leaves open up and turn...|green|🍃||purple,blue",
    "A seed that never gets water will...|not sprout|🚫||sprout faster,turn into a bird",
    "When a seed starts to grow, we say it...|sprouts|🌱||sleeps,melts"
  ], "Water first, then root, then shoot."));
  c.push(L("Pollination", [
    "Flowers need help|🌼🐝|Pollen has to travel from flower to flower so the flower can make seeds.",
    "Helpers|🐝🦋🐦|Bees, butterflies, birds and even the wind carry pollen.",
    "Pollinators|🍎|Many fruits we eat, like apples, need pollinators."
  ], [
    "What has to travel from flower to flower?|pollen|🌼||water,sand",
    "Which animal helps carry pollen?|a bee|🐝||a shark,a cow",
    "What is a pollinator?|an animal that carries pollen|🐝||a plant that sings,a tall tree",
    "Besides animals, what can carry pollen?|wind|💨||snow cones,shoes",
    "Flowers that get pollen can make...|seeds|🌻||shoes,eggs",
    "Why do bees visit flowers?|to drink nectar|🍯||to read books,to play ball",
    "Which of these helps pollinate flowers?|a hummingbird|🐦||a shark,a snail",
    "Many fruits we eat grow because bees...|carried pollen|🍎||drove trucks,painted flowers"
  ], "Pollinators move pollen from flower to flower."));
  c.push(L("Look-alike or changers?", [
    "Look-alikes|🐶|A puppy looks like a small dog. Its body just gets bigger as it grows.",
    "Changers|🐛➡️🦋|A caterpillar looks very different from a butterfly. Its body changes a lot.",
    "Two groups|🐸|A tadpole also changes a lot to become a frog."
  ], [
    "Which baby looks like a small adult?|a puppy|🐶||a caterpillar,a tadpole",
    "Which baby looks very different from its parent?|a caterpillar|🐛||a kitten,a calf",
    "Which baby looks very different from its parent?|a tadpole|🐸||a lamb,a chick",
    "Which baby looks like a small cow?|a calf|🐮||a tadpole,a caterpillar",
    "A butterfly changes a lot, so it is a...|big changer|🦋||look-alike,rock",
    "A kitten looks like a...|little cat|🐱||frog,fish",
    "Which one changes shape a lot as it grows?|a frog|🐸||a horse,a pig",
    "Which baby looks like a tiny version of its parent?|a foal|🐴||a tadpole,a caterpillar"
  ], "Does the baby look like its parent?"));
  c.push(L("Life cycle order", [
    "Butterfly order|🦋|Egg, then caterpillar, then chrysalis, then butterfly.",
    "Frog order|🐸|Egg, then tadpole, then froglet (a young frog), then adult frog.",
    "Chicken order|🐔|Egg, then chick, then adult hen or rooster."
  ], [
    "What comes right after the egg for a butterfly?|caterpillar|🐛||chrysalis,butterfly",
    "What comes right after the caterpillar?|chrysalis|🟢||egg,butterfly",
    "What comes last in a butterfly's life cycle?|butterfly|🦋||egg,caterpillar",
    "What comes right after the egg for a frog?|tadpole|🥚||froglet,adult frog",
    "What comes right after a tadpole?|froglet|🐸||egg,chick",
    "What comes right after the egg for a chicken?|chick|🥚||tadpole,caterpillar",
    "What comes last in a chicken's life cycle?|adult hen|🐔||egg,chick",
    "What comes right before a plant makes flowers?|a grown plant|🌿||a seed,a sprout"
  ], "Put the stages in order from the beginning."));
  c.push(L("Caring parents", [
    "Parents care|🐔🐥|Many animal parents keep eggs warm and feed their babies.",
    "Mammals nurse|🐮🐄|Mammals, like cows, dogs and people, feed their babies milk.",
    "Staying safe|🦆|Duck parents lead their ducklings to water and keep them safe."
  ], [
    "What do mammal mothers feed their babies?|milk|🥛||pizza,seeds",
    "What does a hen sit on to keep it warm?|her eggs|🥚||a rock,a boot",
    "Which animal feeds its baby milk?|a cow|🐮||a duck,a frog",
    "Which animal feeds its baby milk?|a cat|🐱||a robin,a turtle",
    "Who feeds baby birds in the nest?|their parents|🐦||the moon,a robot",
    "A mother duck leads her ducklings to...|water|🦆||a bank,a store",
    "Which of these is a mammal?|a dog|🐶||a robin,a goldfish",
    "Which of these is a mammal?|a whale|🐋||a hen,a trout"
  ], "Many animal parents take care of their babies."));
  c.push(L("Same and different", [
    "Traits|👀|A <b>trait</b> is how you look, like hair color, eye color or curly hair.",
    "From your family|👨‍👩‍👧|You get traits from your parents. You may look a bit like them.",
    "Everyone is special|🌈|No two people are exactly alike. Even brothers and sisters are different."
  ], [
    "Hair color is a...|trait|💇||toy,meal",
    "Eye color is a...|trait|👀||toy,game",
    "Where do you get many of your traits?|your parents|👪||a store,a TV",
    "Puppies often look like their...|parents|🐕||teachers,toys",
    "Are any two people exactly alike?|no|🌈||yes",
    "Which is a trait?|curly hair|🌀||a bike,a backpack",
    "A tall sunflower and a short sunflower show that plants can be...|different|🌻||the same always,invisible",
    "Which trait do many baby ducks have from their parents?|feathers|🦆||wheels,buttons"
  ], "A trait is something about how you look."));
  c.push(L("Animal super senses", [
    "Hide in the colors|🦎|Some animals hide by matching their surroundings. A chameleon can change its colors.",
    "Super senses|🦇🦉|Bats use echoes to find food. Owls hear and see well at night.",
    "Warm coats|🐻‍❄️|Animals in cold places have thick fur to stay warm."
  ], [
    "Which animal can change its color?|a chameleon|🦎||a cow,a duck",
    "Hiding by matching surroundings is called...|camouflage|🌿||dancing,painting",
    "Which animal uses echoes to find food?|a bat|🦇||a horse,a cow",
    "Which animal hunts at night with great hearing?|an owl|🦉||a robin,a duck",
    "A thick fur coat helps animals stay...|warm|🧥||cold,dizzy",
    "A stick insect looks like a...|twig|🌿||balloon,pencil",
    "A snowy hare turns white in winter to hide in the...|snow|❄️||sand,grass",
    "An eagle can see small animals from far...|away|🦅||inside,below"
  ], "Animals have special tools to stay safe and find food."));
  c.push(L("Hibernate and migrate", [
    "Hibernate|🐻|Some animals, like bears and groundhogs, sleep a lot in winter. This is called <b>hibernation</b>.",
    "Migrate|🦆|Some animals travel long ways to warmer places. This is called <b>migration</b>.",
    "Why?|❄️|Winter can bring cold and less food, so animals have clever ways to cope."
  ], [
    "Sleeping through winter is called...|hibernation|😴||migration,camouflage",
    "Traveling to a warmer place is called...|migration|✈️||hibernation,camouflage",
    "Which animal may hibernate in winter?|a bear|🐻||a goose,a robin",
    "Which animal often flies south in winter?|a goose|🦆||a bear,a groundhog",
    "Why do some animals migrate?|to find warmer places and food|🌍||to go shopping,to see movies",
    "Which animal travels long distances over the ocean?|a whale|🐋||a snail,a worm",
    "Which animal is famous for migrating long distances?|a monarch butterfly|🦋||a snail,a worm",
    "Groundhogs sleep a lot in...|winter|❄️||summer,spring"
  ], "Hibernate means sleep. Migrate means travel."));
  c.push(L("Skeleton and muscles", [
    "Skeleton|💀|Your skeleton is all your bones together. A grown-up has 206 bones.",
    "Skull and ribs|🦴|Your <b>skull</b> protects your brain. Your <b>ribs</b> protect your heart and lungs.",
    "Muscles work in pairs|💪|Muscles pull to bend your arm, and other muscles pull to straighten it."
  ], [
    "All your bones together are called your...|skeleton|💀||wardrobe,muscle",
    "About how many bones does a grown-up have?|206|🦴||6,6000",
    "Which bone protects your brain?|skull|💀||ribs,thumb",
    "Which bones protect your heart and lungs?|ribs|🫁||toes,elbows",
    "Muscles help your bones...|move|💪||sing,melt",
    "Muscles get stronger when you...|exercise|🏃||sleep all day,sit still",
    "Where is your biggest muscle group for walking?|legs|🦵||hair,teeth",
    "What do you call the place two bones meet?|a joint|🦵||a feather,a petal"
  ], "Bones and muscles work together."));
  c.push(L("How food travels", [
    "Chew and swallow|👄|Your teeth chew food. Your mouth makes spit that helps break it down.",
    "Down the tube|⬇️|Swallowed food goes down your throat to your <b>stomach</b>.",
    "Small and large|🍽️|Your stomach mixes food. Then it moves to your intestines, where your body takes what it needs."
  ], [
    "Where does your food go first?|your mouth|👄||your knee,your hand",
    "What do your teeth do to food?|chew it|🦷||paint it,sing to it",
    "Where does swallowed food go after your throat?|stomach|🍽️||lungs,brain",
    "What mixes and breaks down food?|stomach|🍽️||heart,eyes",
    "Where does your body take what it needs from food?|intestines|🌀||elbows,ears",
    "Why do we chew food well?|so it breaks into small bits|🍎||to hear it better,to make it cold",
    "The path food takes is called the...|digestive system|🍽️||art system,sports system",
    "Water helps your body...|digest|💧||freeze,hide"
  ], "Follow the food: mouth, throat, stomach, intestines."));
  c.push(L("Brain and nerves", [
    "Brain boss|🧠|Your brain is like the boss. It helps you think, remember, and control your body.",
    "Nerves are messengers|⚡|<b>Nerves</b> carry messages between your body and your brain very fast.",
    "Keep it safe|⛑️|Wear a helmet when you ride a bike to protect your head."
  ], [
    "Which part is the boss of your body?|brain|🧠||knee,toe",
    "What carries messages to your brain?|nerves|⚡||bones,hair",
    "How do you protect your head on a bike?|wear a helmet|⛑️||wear sunglasses only,wear mittens",
    "What helps you remember things?|brain|🧠||elbow,teeth",
    "Your brain is inside your...|head|🙂||tummy,foot",
    "You touch something hot. A message goes from your hand to your...|brain|🔥||knee,hair",
    "Sleep helps your brain...|rest|😴||melt,shrink",
    "What helps your brain learn?|practice|📚||skipping everything,never trying"
  ], "The brain controls the body with the help of nerves."));
  c.push(L("Germs and staying well", [
    "Germs|🦠|Germs are tiny living things you cannot see. Some can make us sick.",
    "Stop germs|🧼|Wash hands, cover coughs and do not share cups.",
    "Resting helps|🛌|If you are sick, rest, drink water and tell a grown-up."
  ], [
    "Germs are very...|tiny|🦠||huge,loud",
    "What helps wash germs off your hands?|soap and water|🧼||juice,paper",
    "When you cough, cover with your...|elbow|🤧||hat,shoe",
    "If you feel sick, you should...|tell a grown-up|🧑‍⚕️||hide it,run a race",
    "Which helps your body get better?|rest|🛌||skipping meals,staying up late",
    "Which should you NOT share when someone is sick?|a cup|🥤||a story,a smile",
    "Washing your hands takes about...|20 seconds|⏱️||2 seconds,2 hours",
    "Who can help you when you are sick?|a doctor|👩‍⚕️||a baker,a bus driver"
  ], "Clean hands help keep germs away."));
  c.push(L("Food groups", [
    "Food groups|🍎🥦🍞|We group foods: <b>fruits</b>, <b>vegetables</b>, <b>grains</b>, <b>protein</b> and <b>dairy</b>.",
    "Examples|🥛🍗|Milk and cheese are dairy. Chicken, beans and eggs are protein. Bread and rice are grains.",
    "A balanced plate|🍽️|A healthy plate has a bit of everything, with lots of fruits and vegetables."
  ], [
    "Which group does an apple belong to?|fruits|🍎||dairy,grains",
    "Which group does broccoli belong to?|vegetables|🥦||fruits,dairy",
    "Which group does bread belong to?|grains|🍞||protein,dairy",
    "Which group does milk belong to?|dairy|🥛||grains,fruits",
    "Which group does chicken belong to?|protein|🍗||fruits,grains",
    "Which group do eggs belong to?|protein|🥚||grains,vegetables",
    "Which group does rice belong to?|grains|🍚||dairy,vegetables",
    "Which group does cheese belong to?|dairy|🧀||fruits,grains"
  ], "Sort the food into its group."));
  c.push(L("Healthy habits for life", [
    "Food, water, sleep|🥗💧😴|Healthy food, water and sleep give you energy.",
    "Move and play|🏃⚽|Moving every day makes your body and mind strong.",
    "Feel good|😊|Talking about feelings and being kind also keep you healthy."
  ], [
    "Which gives you energy?|healthy food|🥗||skipping meals,only candy",
    "How much sleep helps kids your age?|about 9 to 11 hours|😴||about 2 hours,about 20 hours",
    "How can you take care of your feelings?|talk to a grown-up you trust|🗣️||hide them forever,yell at everyone",
    "What can you drink when you are thirsty?|water|💧||paint,soap",
    "Which is a good way to be active?|playing outside|⚽||sitting all day,lying all day",
    "When you wear a helmet, you are keeping your...|head safe|⛑️||shoes safe,socks safe",
    "Screen time should be...|limited|📺||all day,all night",
    "Washing hands helps stop...|germs|🧼||music,rain"
  ], "Healthy habits help your body and your mind."));
  c.push(MIX("Mixed practice", [c[0], c[1], c[3], c[6], c[10], c[13], c[15]]));
  c.push(MIX("Level 3 Challenge", [c[2], c[4], c[5], c[7], c[9], c[11], c[12], c[14], c[16], c[17]]));

  return { 1: a, 2: b, 3: c };
})();
