// Mind Lab Reading. Levels 1-3, 20 lessons each (60 lessons).
// Needs math.js loaded first (uses ri, pick, shuf).
const READING_LEVELS = (() => {
  const T = (h, v, t) => ({ h, v, t });
  const rest = (arr, x, n) => shuf(arr.filter(y => y !== x)).slice(0, n);
  const mkL = (title, make, slides) => { make.teach = () => slides; return { title, make }; };
  const MIX = (title, ...ls) => {
    const f = () => pick(ls).make();
    f.teach = () => [T("Review time!", "🔄", "This lesson mixes things you already know. Here is a quick reminder of each idea, then the quiz.")].concat(ls.map(l => l.make.teach()[0]));
    return { title, make: f };
  };
  // statics: rows are [text, answer, [wrong choices], optional visual, optional hint 2]
  const statics = (rows, h1, h2, h3) => () => {
    const [text, ans, wr, vis, x2] = pick(rows);
    const q = { text, choices: shuf([ans, ...wr]), answer: ans, hints: [h1, x2 || h2, h3] };
    if (vis) q.visual = vis;
    return q;
  };
  // pictures as A / B / C choices
  const pics = (right, items) => {
    const opts = shuf([right, ...rest(items, right, 2)]);
    const ch = opts.map((o, i) => "ABC"[i] + " " + o[1]);
    return { choices: ch, answer: ch[opts.indexOf(right)] };
  };

  // ---------- word banks ----------
  const PIC = [["cat","🐱"],["dog","🐶"],["sun","☀️"],["pig","🐷"],["hat","🎩"],["bus","🚌"],["fish","🐟"],["bed","🛏️"],["cup","☕"],["bug","🐛"],["fox","🦊"],["hen","🐔"],["bat","🦇"],["map","🗺️"],["box","📦"],["log","🪵"]];
  const PIC2 = [["frog","🐸"],["star","⭐"],["tree","🌳"],["ship","🚢"],["shell","🐚"],["moon","🌙"],["house","🏠"],["boat","⛵"],["kite","🪁"],["duck","🦆"],["bee","🐝"],["key","🔑"],["drum","🥁"],["sock","🧦"],["book","📖"],["apple","🍎"],["flag","🚩"],["crab","🦀"],["snake","🐍"],["cake","🎂"]];
  const FIRST1 = [["sun","☀️"],["sock","🧦"],["moon","🌙"],["map","🗺️"],["tub","🛁"],["tent","⛺"],["pig","🐷"],["pen","🖊️"],["bus","🚌"],["bee","🐝"],["nose","👃"],["nut","🥜"]];
  const FIRST2 = [["cat","🐱"],["cup","☕"],["key","🔑"],["kite","🪁"],["dog","🐶"],["duck","🦆"],["fish","🐟"],["frog","🐸"],["goat","🐐"],["hat","🎩"],["hen","🐔"],["leg","🦵"],["lion","🦁"],["rain","🌧️"],["ring","💍"],["web","🕸️"],["window","🪟"]];
  const L1 = "smtpbn".split(""), L2 = "ckdfghlrw".split("");
  const SHORTV = { a: ["cat","hat","bag","map","jam","fan"], e: ["bed","hen","pen","net","leg","web"], i: ["pig","sit","lip","pin","big","kid"], o: ["dog","pot","box","fox","log","mop"], u: ["sun","bus","cup","bug","tub","rug"] };
  const LONGW = { a: ["cake","rain","play","gate","snail","train","tape","make"], e: ["feet","bee","leaf","seal","tree","beach","green","meat"], i: ["kite","bike","light","pie","ride","night","time","slide"], o: ["boat","snow","bone","coat","rope","nose","goat","home"], u: ["cube","tube","mule","huge","cute","use"] };
  const LONGREF = { a: "cake", e: "feet", i: "kite", o: "boat", u: "cube" };
  const RH = [["at",["cat","hat","bat","mat","rat"]],["og",["dog","log","frog","fog"]],["ig",["pig","big","dig","wig"]],["un",["sun","run","fun","bun"]],["ug",["bug","hug","mug","rug"]],["en",["hen","pen","ten","men"]],["ake",["cake","lake","snake","bake"]],["ain",["rain","train","chain","pain"]],["ight",["night","light","right","fight"]],["ar",["car","star","jar","far"]],["ell",["bell","shell","well","tell"]],["ose",["nose","rose","hose","toes"]]];
  const FAM = [["at",["cat","hat","bat","mat","rat","sat"]],["an",["can","fan","man","pan","ran","van"]],["ig",["big","dig","pig","wig","fig"]],["ug",["bug","hug","mug","rug","jug"]],["op",["hop","mop","pop","top"]],["ed",["bed","red","fed","led"]]];
  const SW1 = ["the","a","I","to","and","is","you","it","in","see","can","we"];
  const SW2 = ["said","was","they","have","are","with","for","what","she","he","me","my","like","go","look"];
  const SW3 = ["because","friend","again","would","could","every","your","there","where","their","were","want","does","been","many"];
  const SENT_SW = [["I ___ a bird.","see",["to","and"]],["The cat ___ big.","is",["to","and"]],["I like ___ play.","to",["is","and"]],["Mom ___ Dad are here.","and",["see","is"]],["Can you ___ it?","see",["the","and"]],["We ___ to the park.","go",["the","big"]],["I ___ my dog.","like",["is","to"]],["Look at ___ red hat!","my",["and","is"]],["She ___ a cat.","has",["to","and"]]];
  const SENT_SW2 = [["We ___ happy.","are",["was","said"]],["She ___ hello to me.","said",["are","look"]],["I ___ a new bike.","have",["they","with"]],["___ are my friends.","They",["What","Said"]],["Come ___ me to the park.","with",["was","have"]],["This gift is ___ you.","for",["are","said"]],["___ is your name?","What",["They","Have"]],["It ___ a sunny day.","was",["are","with"]],["___ at the big moon!","Look",["Said","For"]]];
  const BLEND4 = ["stop","frog","flag","crab","drum","swim","plan","slip","clap","spin","drip","grab"];
  const DIG = [["sh",["ship","shell","sheep","shoe","shark"]],["ch",["chair","cheese","chick","cherry","chin"]],["th",["three","thumb","think","thorn","thick"]],["wh",["whale","wheel","white","whip","wheat"]]];
  const MAGIC = [["cap","cape"],["tap","tape"],["kit","kite"],["hop","hope"],["cub","cube"],["pin","pine"],["mat","mate"],["not","note"]];
  const COMP = [["sun","flower"],["rain","bow"],["cup","cake"],["foot","ball"],["butter","fly"],["pop","corn"],["snow","man"],["bed","room"],["sail","boat"],["tooth","brush"],["pan","cake"],["air","plane"]];

  // ---------- stories ----------
  const S1 = [
    { s: "Sam has a red hat. He wears it at the park.", who: ["Sam", ["Tom", "Max"]], what: ["What does Sam have?", "a red hat", ["a red bat", "a blue hat"]], where: ["Where does Sam wear his hat?", "at the park", ["at school", "at home"]] },
    { s: "Mia has a cat. The cat sits on the bed.", who: ["Mia", ["Ann", "Zoe"]], what: ["What does Mia have?", "a cat", ["a dog", "a pig"]], where: ["Where does the cat sit?", "on the bed", ["in the tub", "on the bus"]] },
    { s: "Ben ran to the shop. He got a big bun.", who: ["Ben", ["Dan", "Ken"]], what: ["What did Ben get?", "a big bun", ["a big bug", "a red cup"]], where: ["Where did Ben run?", "to the shop", ["to the park", "to the bus"]] },
    { s: "Lin has a pet frog. The frog hops in the pond.", who: ["Lin", ["Kim", "Pam"]], what: ["What does Lin have?", "a pet frog", ["a pet fish", "a pet bug"]], where: ["Where does the frog hop?", "in the pond", ["on the bed", "in the car"]] },
    { s: "Dad made a big cake. We ate it at home.", who: ["Dad", ["Mom", "Gran"]], what: ["What did Dad make?", "a big cake", ["a big pie", "a big hat"]], where: ["Where did we eat the cake?", "at home", ["at the zoo", "at school"]] },
    { s: "Tom and his dog go for a walk. They walk by the lake.", who: ["Tom and his dog", ["Tom and his cat", "Tom and his pig"]], what: ["What do Tom and his dog do?", "go for a walk", ["go to bed", "play a game"]], where: ["Where do they walk?", "by the lake", ["by the school", "by the shop"]] },
    { s: "Rosa has a kite. The kite is up in the sky.", who: ["Rosa", ["Jen", "Ali"]], what: ["What does Rosa have?", "a kite", ["a ball", "a drum"]], where: ["Where is the kite?", "in the sky", ["in the box", "on the bed"]] },
    { s: "A duck swims in the pond. The duck is wet.", who: ["A duck", ["A dog", "A cat"]], what: ["How is the duck?", "wet", ["dry", "sad"]], where: ["Where does the duck swim?", "in the pond", ["in the tub", "in the bus"]] },
    { s: "Jo and Bo sit on a log. They eat a snack.", who: ["Jo and Bo", ["Jo and Ann", "Bo and Sam"]], what: ["What do they eat?", "a snack", ["a bug", "a log"]], where: ["Where do they sit?", "on a log", ["on a bus", "in a tub"]] }
  ];
  const S2 = [
    { s: "Pam found a lost puppy near the school. She took it home and gave it a bowl of water.", who: ["Pam", ["Pat", "Kim"]], what: ["What did Pam give the puppy?", "a bowl of water", ["a toy bone", "a warm bed"]], where: ["Where did Pam find the puppy?", "near the school", ["at the shop", "by the lake"]] },
    { s: "Max and his sister baked cookies in the kitchen. The cookies smelled so good!", who: ["Max and his sister", ["Max and his dad", "Max and his dog"]], what: ["What did they bake?", "cookies", ["bread", "a cake"]], where: ["Where did they bake?", "in the kitchen", ["in the yard", "at the park"]] },
    { s: "A little bird built a nest in a tall tree. Then she laid three eggs.", who: ["A little bird", ["A little bee", "A little frog"]], what: ["What did she lay?", "three eggs", ["two eggs", "four eggs"]], where: ["Where did she build the nest?", "in a tall tree", ["in a small box", "on the ground"]] },
    { s: "Ava rode her bike to the park. She met her friend Jack by the slide.", who: ["Ava", ["Lily", "Ruby"]], what: ["How did Ava get to the park?", "on her bike", ["on a bus", "on foot"]], where: ["Where did Ava meet Jack?", "by the slide", ["by the swings", "by the pond"]] },
    { s: "On Monday it rained all day. Leo stayed inside and built a tall tower with blocks.", who: ["Leo", ["Eli", "Sam"]], what: ["What did Leo build?", "a tall tower", ["a small boat", "a big house"]], where: ["Where did Leo stay?", "inside", ["outside", "at the park"]] },
    { s: "The farmer feeds the hens in the barn every morning. The hens give him fresh eggs.", who: ["The farmer", ["The baker", "The teacher"]], what: ["What do the hens give him?", "fresh eggs", ["fresh milk", "fresh bread"]], where: ["Where does the farmer feed the hens?", "in the barn", ["in the lake", "in the car"]] },
    { s: "Nina is going to the beach. She put a towel, a hat and a pail in her bag.", who: ["Nina", ["Tara", "Gwen"]], what: ["What did Nina put in her bag?", "a towel, a hat and a pail", ["a towel, a book and a ball", "a coat, a hat and a pail"]], where: ["Where is Nina going?", "to the beach", ["to the zoo", "to school"]] },
    { s: "Our class went to the zoo on Friday. We saw a tall giraffe and a baby monkey.", who: ["Our class", ["Our family", "Our club"]], what: ["What did the class see?", "a giraffe and a monkey", ["a lion and a bear", "a horse and a duck"]], where: ["Where did the class go?", "to the zoo", ["to the farm", "to the beach"]] },
    { s: "Omar plants a seed in a pot. Every day he gives it water, and soon a green sprout grows.", who: ["Omar", ["Ivan", "Hugo"]], what: ["What grows?", "a green sprout", ["a red flower", "a big tree"]], where: ["Where does Omar plant the seed?", "in a pot", ["in a box", "in the sea"]] }
  ];
  const S3 = [
    { s: "Kai and his mom went to the library on Saturday. Kai picked a book about space. He read it under a big tree in the yard.", who: ["Kai and his mom", ["Kai and his dad", "Kai and his gran"]], what: ["What kind of book did Kai pick?", "a book about space", ["a book about dogs", "a book about boats"]], where: ["Where did Kai read his book?", "under a big tree", ["at the library", "in his bed"]] },
    { s: "Emma has a pet turtle named Shelly. Shelly eats lettuce and walks very slowly across the porch. Emma loves to watch her.", who: ["Emma", ["Anna", "Lucy"]], what: ["What does Shelly eat?", "lettuce", ["cake", "pizza"]], where: ["Where does Shelly walk?", "across the porch", ["across the road", "across the lake"]] },
    { s: "It was a hot day, so Lucas and Zoe set up a lemonade stand on the sidewalk. They made a sign with big blue letters. By noon they sold ten cups.", who: ["Lucas and Zoe", ["Lucas and Eli", "Zoe and Maya"]], what: ["What did they sell?", "lemonade", ["cookies", "toys"]], where: ["Where did they set up the stand?", "on the sidewalk", ["in the garage", "at the beach"]] },
    { s: "A fox lived in a den under an old oak tree. Every night, he went out to look for food. In the morning he came home to sleep.", who: ["A fox", ["A bear", "A rabbit"]], what: ["What did the fox do every night?", "looked for food", ["slept all night", "built a den"]], where: ["Where did the fox live?", "under an old oak tree", ["in a tall pine", "in a barn"]] },
    { s: "Nora walked her dog Biscuit to the pond. Biscuit jumped in and splashed water everywhere. Nora laughed and held up a towel.", who: ["Nora", ["Tessa", "Hannah"]], what: ["What did Biscuit do?", "jumped in and splashed", ["slept on a towel", "ran far away"]], where: ["Where did Nora walk her dog?", "to the pond", ["to the store", "to the beach"]] },
    { s: "The class planted flowers in the school garden. Each child got a small shovel and a seed. They watered the seeds with a can.", who: ["The class", ["The farmer", "The mail carrier"]], what: ["What did each child get?", "a small shovel and a seed", ["a pail and a rake", "a hose and a pot"]], where: ["Where did they plant flowers?", "in the school garden", ["in the park", "at the zoo"]] },
    { s: "Grandpa took Ruby fishing at the lake. They sat on a wooden dock with two rods. Ruby caught a shiny fish and let it go.", who: ["Grandpa and Ruby", ["Grandma and Ruby", "Dad and Ruby"]], what: ["What did Ruby do with the fish?", "let it go", ["ate it", "sold it"]], where: ["Where did they sit?", "on a wooden dock", ["in a boat", "on a rock"]] },
    { s: "On Sunday, Dev and his cousins built a fort in the living room. They used pillows and a big blue sheet. Inside, they read funny comics.", who: ["Dev and his cousins", ["Dev and his friends", "Dev and his uncle"]], what: ["What did they use for the fort?", "pillows and a blue sheet", ["boxes and a rug", "chairs and a tent"]], where: ["Where did they build the fort?", "in the living room", ["in the garden", "in the garage"]] },
    { s: "Priya took the train to see her aunt. Out the window she saw green hills and little cows. The ride took one hour.", who: ["Priya", ["Sara", "Tina"]], what: ["What did she see out the window?", "green hills and little cows", ["tall buildings and cars", "big ships and boats"]], where: ["Where did Priya ride?", "on a train", ["on a boat", "on a bus"]] }
  ];
  const ST_H = {
    who: ["Read the story slowly. Who is it about?", "The name or animal is usually at the very start of the first sentence.", "Example: <i>Tom sat in the tub.</i> Who is it about? <b>Tom</b>. Now find the name in yours."],
    what: ["Read the story again, one sentence at a time. Look for the part that answers the question.", "Find the key words from the question in the story. The answer is right next to them.", "Example: <i>Tom sat in the tub.</i> What did Tom do? He <b>sat in the tub</b>. Now try yours."],
    where: ["<b>Where</b> asks for a place. Look for a place in the story.", "Place words are clues: in, on, at, to, by, under. The place comes right after them.", "Example: <i>Tom sat in the tub.</i> Where did Tom sit? <b>in the tub</b>. Now find the place in yours."]
  };
  const storyQ = (bank, f) => () => {
    const s = pick(bank), d = s[f];
    const q = f === "who" ? "Who is this story about?" : d[0];
    const ans = f === "who" ? d[0] : d[1], wr = f === "who" ? d[1] : d[2];
    return { text: `<b>Read:</b> ${s.s}<br><br>${q}`, choices: shuf([ans, ...wr]), answer: ans, hints: ST_H[f] };
  };
  const stSlides = (age, f) => [
    T(f === "who" ? "Who is in the story?" : f === "what" ? "What happens?" : "Where does it happen?", f === "who" ? "🧒🐶" : f === "what" ? "🎬" : "🗺️",
      f === "who" ? "Stories are about <b>characters</b>. A character can be a person or an animal. Find out <b>who</b> the story is about." : f === "what" ? "Stories tell you <b>what</b> happens. Read to find the things the characters have and do." : "Stories happen in a <b>place</b>. The place is called the <b>setting</b>. A story can happen at home, at school, or at the park."),
    T("Read, then look back", "👀", "Read the whole story first. Then read the question. Go back to the story to find the answer. Don't guess!"),
    T("Example", "<i>Tom sat in the tub.</i>", f === "who" ? "Who? <b>Tom</b>. The name is at the start of the sentence." : f === "what" ? "What did Tom do? He <b>sat in the tub</b>." : "Where did Tom sit? <b>In the tub</b>. The place comes after the word \"in\".")
  ];

  const SEQ = [
    ["Mia plants a seed.", "Mia waters the seed every day.", "A flower grows."],
    ["Ben is hungry.", "Ben makes a sandwich.", "Ben eats the sandwich."],
    ["The sky gets dark and cloudy.", "Rain begins to fall.", "A rainbow shows up in the sky."],
    ["Ana wakes up in the morning.", "Ana brushes her teeth.", "Ana goes to school."],
    ["Tom has a dirty dog.", "Tom gives the dog a bath.", "The dog is clean and happy."],
    ["A caterpillar eats leaves.", "It hangs from a twig and wraps up tight.", "It comes out as a butterfly."],
    ["Lia gets a new puzzle.", "Lia puts the pieces together.", "The puzzle is finished!"],
    ["Dad fills the tub with water.", "Sam hops in with his toy boat.", "Sam dries off with a towel."]
  ];
  const seqQ = kinds => () => {
    const s = pick(SEQ), k = pick(kinds), i = { first: 0, middle: 1, last: 2 }[k];
    const lab = { first: "<b>beginning</b> (what happened first)", middle: "<b>middle</b> (what happened next)", last: "<b>end</b> (what happened last)" }[k];
    return {
      text: `These three sentences are from one story. Which one is the ${lab}?`, choices: shuf(s), answer: s[i],
      hints: ["Think about what has to happen before the other things.", "The beginning starts the story. The middle comes next. The end is how it finishes.", "Example: <i>Jo puts on her helmet. Jo rides to the park. Jo parks her bike.</i> The beginning is <b>Jo puts on her helmet</b>, because she needs it before she rides."]
    };
  };
  const seqSlides = [
    T("Beginning, middle, end", "1️⃣ 2️⃣ 3️⃣", "Every story has a <b>beginning</b> (how it starts), a <b>middle</b> (what happens next) and an <b>end</b> (how it finishes)."),
    T("Example", "🌱 → 💧 → 🌻", "Beginning: plant a seed. Middle: water it. End: a flower grows. The order matters!"),
    T("Tip", "🤔", "Ask: What happened first? What happened next? What happened last? Words like <b>first, next, then, last</b> help.")
  ];

  // ---------- question makers ----------
  const firstSound = (items, letters) => () => {
    const [w, e] = pick(items), a = w[0], bad = a === "c" ? ["k"] : a === "k" ? ["c"] : [];
    const wr = shuf(letters.filter(l => l !== a && !bad.includes(l))).slice(0, 2);
    const [xw, xe] = w === "sun" ? ["pig", "🐷"] : ["sun", "☀️"];
    return { text: "Which letter makes the <b>first sound</b> of this word?", visual: e, say: w, choices: shuf([a, ...wr]), answer: a,
      hints: ["Press 🔊 and say the word slowly. Listen to the very first sound.", "Say just the first sound and stretch it out. Which letter makes that sound?", `Example: ${xe} ${xw} starts with <b>${xw[0]}</b> (${xw[0]}-${xw[0]}-${xw}). Now do yours.`] };
  };
  const endSound = () => {
    const bank = PIC.concat(PIC2.slice(0, 8)).filter(([w]) => !["fox", "box"].includes(w));
    return () => {
      const [w, e] = pick(bank), z = w[w.length - 1];
      const wr = shuf("abcdefghilmnoprstuy".split("").filter(l => l !== z)).slice(0, 2);
      const [xw, xe] = w === "cat" ? ["pig", "🐷"] : ["cat", "🐱"];
      return { text: "Which letter makes the <b>last sound</b> of this word?", visual: e, say: w, choices: shuf([z, ...wr]), answer: z,
        hints: ["Press 🔊 and say the word slowly. Listen to the very last sound.", "Say the word again and stop at the end. What sound do you hear last?", `Example: ${xe} ${xw} ends with <b>${xw[xw.length - 1]}</b> (${xw.slice(0, -1)}-${xw[xw.length - 1]}). Now do yours.`] };
    };
  };
  const shortVowel = vs => () => {
    const v = pick(vs), w = pick(SHORTV[v]), right = pick(SHORTV[v].filter(x => x !== w));
    const ov = shuf("aeiou".split("").filter(x => x !== v)).slice(0, 2);
    const wr = ov.map(x => pick(SHORTV[x]));
    const xv = v === "a" ? "o" : "a", xs = SHORTV[xv].slice(0, 2);
    return { text: `Which word has the same <b>middle sound</b> as <b>${w}</b>?`, say: w, choices: shuf([right, ...wr]), answer: right,
      hints: [`Say <b>${w}</b> slowly. Listen to the sound in the middle.`, "The middle sound is the vowel sound. Say each choice slowly and listen to its middle sound. Which one matches?", `Example: <b>${xs[0]}</b> and <b>${xs[1]}</b> have the same middle sound (${xv}), because ${xs[0][1]} and ${xs[1][1]} both say \"${xv}\". Now do yours.`] };
  };
  const longVowel = vs => () => {
    const v = pick(vs), ref = LONGREF[v], right = pick(LONGW[v].filter(x => x !== ref));
    const pool = [].concat(...Object.keys(SHORTV).map(k => SHORTV[k]), ...Object.keys(LONGW).filter(k => k !== v).map(k => LONGW[k]));
    const wr = shuf(pool).slice(0, 2);
    const ex = pick(LONGW[v].filter(x => x !== ref && x !== right));
    return { text: `Which word has the <b>long ${v}</b> sound (the vowel says its name), like in <b>${ref}</b>?`, say: right, choices: shuf([right, ...wr]), answer: right,
      hints: ["Say each word slowly. A long vowel sound says the name of the letter.", `Listen for the sound \"${v}\", like the letter name. Words with a quick, short vowel don't count.`, `Example: <b>${ex}</b> has the long ${v} sound. You can hear the name of the letter ${v}. Now check yours.`] };
  };
  const blend3 = () => () => {
    const p3 = PIC.filter(([x]) => x.length === 3), it = pick(p3), w = it[0], wr = rest(p3, it, 2).map(x => x[0]);
    const [xw] = w === "sun" ? ["map"] : ["sun"];
    return { text: `Blend the sounds: <b>${w.split("").join(" - ")}</b>. What word is it?`, choices: shuf([w, ...wr]), answer: w,
      hints: ["Say each sound, then say them faster and faster until they join into one word.", "Stretch the sounds together without stopping: the first sound slides into the next.", `Example: <b>${xw.split("").join(" - ")}</b> blended together says \"${xw}\". Now blend yours.`] };
  };
  const blend4 = () => () => {
    const w = pick(BLEND4), wr = rest(BLEND4, w, 2), xw = w === "stop" ? "frog" : "stop";
    return { text: `Blend the sounds: <b>${w.split("").join(" - ")}</b>. What word is it?`, choices: shuf([w, ...wr]), answer: w,
      hints: ["Say each sound, then blend them together into one word.", "Two sounds at the start can be blended first (like \"st\" or \"fr\"), then add the rest.", `Example: <b>${xw.split("").join(" - ")}</b> blended together says \"${xw}\". Now blend yours.`] };
  };
  const wordToPic = bank => () => {
    const it = pick(bank), p = pics(it, bank);
    return { text: `Which picture matches the word <b>${it[0]}</b>?`, say: it[0], choices: p.choices, answer: p.answer,
      hints: ["Read the word slowly, sound by sound.", `Say the sounds in <b>${it[0]}</b> and blend them. Then think about which picture has that name.`, "Example: the word <b>sun</b> matches the picture ☀️, because s-u-n says \"sun\". Now read yours."] };
  };
  const picToWord = bank => () => {
    const it = pick(bank), wr = rest(bank, it, 2).map(x => x[0]);
    return { text: "Which word matches the picture?", visual: it[1], choices: shuf([it[0], ...wr]), answer: it[0],
      hints: ["Say the name of the picture out loud. What is it?", `Read each word slowly. The right word starts with the letter <b>${it[0][0]}</b>.`, "Example: the picture 🐷 is a pig. The word <b>pig</b> starts with p. Now do yours."] };
  };
  const rhymeQ = fams => () => {
    const [end, ws] = pick(fams), w = pick(ws), right = pick(ws.filter(x => x !== w));
    const wr = shuf(fams.filter(f => f[0] !== end)).slice(0, 2).map(f => pick(f[1]));
    return { text: `Which word rhymes with <b>${w}</b>?`, say: w, choices: shuf([right, ...wr]), answer: right,
      hints: ["Rhyming words end with the same sound.", `Say <b>${w}</b> and listen to how it ends. Then say each choice. Which one ends the same way?`, "Example: <b>moon</b> and <b>spoon</b> rhyme, because they both end with \"-oon\". Now do yours."] };
  };
  const oddRhyme = fams => () => {
    const f = pick(fams), g = pick(fams.filter(x => x !== f)), two = shuf(f[1]).slice(0, 2), odd = pick(g[1]);
    return { text: "Which word does <b>NOT</b> rhyme with the other two?", choices: shuf([...two, odd]), answer: odd,
      hints: ["Two of the words end with the same sound. One is different.", "Say all three words and listen to the endings. Which ending is the odd one?", "Example: <b>bee, tree, dog</b>. Bee and tree rhyme, so <b>dog</b> is the odd one out. Now do yours."] };
  };
  const changeLetter = () => () => {
    const [, ws] = pick(FAM), w = pick(ws), fams = FAM.filter(f => !f[1].includes(w));
    const newW = pick(ws.filter(x => x !== w));
    let same = shuf([].concat(...fams.map(f => f[1])).filter(x => x[0] === newW[0]));
    const wr = same.length >= 2 ? same.slice(0, 2) : shuf([].concat(...fams.map(f => f[1])).filter(x => x !== newW)).slice(0, 2);
    return { text: `Change the first letter of <b>${w}</b> to <b>${newW[0]}</b>. What new word do you get?`, choices: shuf([newW, ...wr]), answer: newW,
      hints: ["Take away the first letter, keep the rest, and put the new letter in front.", `Keep the ending <b>-${w.slice(1)}</b> and write the new first letter before it. Say it out loud.`, "Example: change the <b>m</b> in <b>mop</b> to <b>h</b>. Keep \"-op\" and you get <b>hop</b>. Now do yours."] };
  };
  const sightHear = words => () => {
    const w = pick(words), wr = shuf(words.filter(x => x !== w && x[0].toLowerCase() !== w[0].toLowerCase())).slice(0, 2);
    const ex = w === "the" || w === "said" || w === "because" ? "and" : "the";
    return { text: "Press 🔊 and listen. Which word did you hear?", say: w, choices: shuf([w, ...wr]), answer: w,
      hints: ["Press 🔊 again and listen closely. Say the word back to yourself.", `The word starts with the letter <b>${w[0]}</b> and has ${w.length} letters. Check each choice.`, ex === "and" ? "Example: you hear \"and\". Look for a word with the letters a-n-d. Now find yours." : "Example: you hear \"the\". Look for a word with the letters t-h-e. Now find yours."] };
  };
  const sentSight = rows => () => {
    const [s, ans, wr] = pick(rows);
    return { text: `Which word fits the blank?<br><br><b>${s}</b>`, choices: shuf([ans, ...wr]), answer: ans,
      hints: ["Read the whole sentence. Which word makes it sound right?", "Try each choice in the blank and read the sentence out loud. Only one sounds right.", "Example: <b>The dog ___ big.</b> Try \"is\": \"The dog is big.\" That sounds right. Now do yours."] };
  };
  const digraphQ = () => () => {
    const [d, ws] = pick(DIG), w = pick(ws), wr = shuf(DIG.filter(x => x[0] !== d)).slice(0, 2).map(x => pick(x[1]));
    return { text: `Which word begins with the letters <b>${d}</b>?`, choices: shuf([w, ...wr]), answer: w,
      hints: [`Look at the first two letters of each word. Find the pair <b>${d}</b>.`, "These letter pairs make ONE sound: sh (ship), ch (chair), th (three), wh (whale). Say each word.", "Example: which word begins with <b>sh</b>: ship, chair or three? <b>ship</b>, because it starts s-h. Now do yours."] };
  };
  const magicQ = () => () => {
    const [s, l] = pick(MAGIC), other = pick(MAGIC.filter(p => p[0] !== s))[0];
    const [xs, xl] = s === "cap" ? ["tap", "tape"] : ["cap", "cape"];
    return { text: "Which word has a <b>long vowel</b> sound (the vowel says its name)?", say: l, choices: shuf([l, s, other]), answer: l,
      hints: ["Say each word. In a long vowel word, you hear the name of the vowel letter.", "Look at the end of each word. A silent <b>e</b> on the end makes the vowel say its name.", `Example: <b>${xl}</b> has a magic e, so the vowel says its name. <b>${xs}</b> does not. Now do yours.`] };
  };
  const wordCount = () => {
    const bank = ["I see a cat.", "The dog is big.", "We like to run.", "Mom has a red hat.", "I can hop.", "The sun is hot.", "A pig is in the mud.", "Dad and I go to the park.", "My bug is on a leaf.", "Look at the big moon."];
    return () => {
      const s = pick(bank), n = s.split(" ").length;
      const wr = shuf([n - 1, n + 1, n + 2, n - 2].filter(x => x > 0)).slice(0, 2);
      return { text: `How many words are in this sentence?<br><br><b>${s}</b>`, choices: shuf([n, ...wr]), answer: n,
        hints: ["A word is a group of letters with a space on each side.", "Touch each word with your finger and count out loud as you go.", "Example: <b>The sun is up.</b> The (1) sun (2) is (3) up (4). That is 4 words. Now count yours."] };
    };
  };
  const picSent = rows => () => {
    const [e, s] = pick(rows), wr = rest(rows, rows.find(r => r[1] === s), 2).map(r => r[1]);
    return { text: "Which sentence matches the picture?", visual: e, choices: shuf([s, ...wr]), answer: s,
      hints: ["Look at the picture carefully. What do you see?", "Read each sentence slowly. Which one tells about the things in the picture?", "Example: for the picture 🐟 the sentence \"The fish swims.\" matches, but \"The bird sings.\" does not. Now do yours."] };
  };
  const PS1 = [["🐱", "The cat naps on a soft bed."], ["☀️", "The sun is hot and bright."], ["🌧️", "It is raining outside."], ["🚌", "The bus can take us to school."], ["🐟", "The fish swims in the water."], ["🌳", "A tall tree has green leaves."], ["🍎", "The apple is red and round."], ["⛵", "The boat sails on the sea."], ["🐸", "The frog hops on a log."], ["🚂", "The train goes on the track."]];
  const PS3 = [["🐶🦴", "The dog has a bone."], ["👧📖", "The girl reads a book."], ["🐝🌸", "A bee sits on a flower."], ["👦⚽", "The boy kicks the ball."], ["🐘💦", "The elephant sprays water."], ["🧒🚲", "The kid rides a bike."], ["🐱🐟", "The cat wants the fish."], ["🌙⭐", "The moon and a star are in the sky."], ["🧑‍🍳🍕", "The cook makes a pizza."]];

  // ---------- statics banks ----------
  const PRINT = statics([
    ["Which way do we read words in English?", "left to right", ["right to left", "bottom to top"]],
    ["Where do we start reading a page?", "at the top", ["at the bottom", "in the middle"]],
    ["What do we leave between words?", "a space", ["a star", "a number"]],
    ["The name of a book is its ___.", "title", ["author", "page"]],
    ["The person who writes the words in a book is the ___.", "author", ["title", "cover"]],
    ["The person who draws the pictures in a book is the ___.", "illustrator", ["author", "title"]],
    ["What is on the front of a book?", "the cover", ["the glue", "the end"]],
    ["Which mark do you see at the end of this sentence?<br><b>I see a cat.</b>", "period", ["question mark", "exclamation mark"]],
    ["Which mark do you see at the end of this sentence?<br><b>Can you see me?</b>", "question mark", ["period", "exclamation mark"]]
  ], "Think about how you hold and read a book.", "Remember: we read words in order, one after another, and a book has parts like the cover, title and pages.", "Example: when you read <i>The cat sat.</i> you start at <b>The</b> on the left and move to the right. Now do yours.");
  const REALQ = statics([
    ["A cow eats grass in a field.", "Real", ["Make-believe"]], ["Fish swim in the water.", "Real", ["Make-believe"]], ["A girl rides a bike to school.", "Real", ["Make-believe"]], ["The sun comes up in the morning.", "Real", ["Make-believe"]], ["A bird builds a nest.", "Real", ["Make-believe"]], ["Bees make honey.", "Real", ["Make-believe"]],
    ["A cat drives a bus to the moon.", "Make-believe", ["Real"]], ["A talking tree sings a song to the kids.", "Make-believe", ["Real"]], ["A pig puts on a cape and flies.", "Make-believe", ["Real"]], ["A dragon bakes a pizza.", "Make-believe", ["Real"]], ["A spoon runs away with a fork.", "Make-believe", ["Real"]], ["A rock tells a joke.", "Make-believe", ["Real"]]
  ].map(r => ["Could this really happen, or is it make-believe?<br><br><b>" + r[0] + "</b>", r[1], r[2]]), "Think about the world around you. Have you ever seen this happen?", "Real things can happen in life. Make-believe things only happen in pretend stories, like animals who drive buses.", "Example: <i>A dog chases a ball.</i> That is real. <i>A dog flies a rocket.</i> That is make-believe. Now do yours.");
  const FEEL1 = statics([
    ["Mia dropped her ice cream on the ground. How does she feel?", "sad", ["happy", "sleepy"]],
    ["Ben got a new puppy for his birthday. How does Ben feel?", "happy", ["sad", "angry"]],
    ["Ana heard a loud boom in the night. How does Ana feel?", "scared", ["bored", "silly"]],
    ["Leo won the race and got a gold ribbon. How does he feel?", "proud", ["sleepy", "scared"]],
    ["It has rained all day and Zoe has nothing to do. How does she feel?", "bored", ["excited", "proud"]],
    ["Kim is going to the zoo tomorrow! How does Kim feel?", "excited", ["sad", "sleepy"]],
    ["Rosa played all day and now her eyes keep closing. How does she feel?", "sleepy", ["excited", "scared"]],
    ["A big dog ran toward Eli and barked loudly. How does Eli feel?", "scared", ["proud", "happy"]]
  ], "Think about what happened to the character. How would you feel?", "Feelings words: happy, sad, scared, proud, bored, excited, sleepy. Pick the one that matches what happened.", "Example: <i>Sam's balloon popped.</i> Sam feels <b>sad</b>, because he lost his balloon. Now think about yours.");
  const FEEL3 = statics([
    ["Ben is crying. His balloon floated up into the sky. Why is Ben sad?", "His balloon floated away", ["He is hungry", "He is cold"]],
    ["Zoe is jumping and clapping. Her team won the game. Why is Zoe happy?", "Her team won", ["It is raining", "She lost her hat"]],
    ["Max hid under the blanket. He heard thunder. Why did Max hide?", "He heard thunder", ["He was hungry", "He wanted to play"]],
    ["Lily smiled big. Her grandma came to visit. Why is Lily smiling?", "Her grandma came", ["She lost a toy", "It is bedtime"]],
    ["Noah yawned and rubbed his eyes. It was very late at night. Why did Noah yawn?", "He was sleepy", ["He was angry", "He was excited"]],
    ["Ella frowned. Her brother broke her toy. Why is Ella upset?", "Her brother broke her toy", ["She got a new toy", "She won a prize"]],
    ["Omar was shivering. He forgot his coat on a snowy day. Why was Omar shivering?", "He was cold", ["He was happy", "He was hot"]],
    ["Tia ran to the door. She heard the ice cream truck. Why did Tia run?", "She heard the ice cream truck", ["She was sleepy", "She was cold"]]
  ], "Read both sentences. The second one is usually the clue.", "Ask: what happened to the character? That is the reason for the feeling.", "Example: <i>Dan is smiling. He got a gold star.</i> Why is Dan smiling? <b>He got a gold star</b>. Now find the reason in yours.");
  const PRED2 = [
    ["Dark clouds fill the sky and thunder booms. Soon it will ___.", "rain", ["be sunny", "snow"]],
    ["Mia puts on her swimsuit and grabs a towel. She is going to the ___.", "pool", ["library", "bakery"]],
    ["Ben tips the glass too far. The milk will ___.", "spill", ["freeze", "sing"]],
    ["The baby bird flaps its wings and hops out of the nest. The bird will ___.", "fly", ["swim", "dig"]],
    ["Dad puts the cake in the oven. When the timer rings, the cake will be ___.", "baked", ["frozen", "wet"]],
    ["Pam picks up her backpack and puts on her shoes. The bus honks. Pam will go to ___.", "school", ["bed", "the beach"]],
    ["The ice cream sits in the hot sun. Soon it will ___.", "melt", ["grow", "freeze"]],
    ["Leo yawns, puts on pajamas and brushes his teeth. Next Leo will go to ___.", "bed", ["the park", "the zoo"]]
  ];
  const PRED3 = [
    ["Grandpa fills the bird feeder with seeds and sits by the window. Soon, many ___ will come.", "birds", ["fish", "cars"]],
    ["Kai drops his ball at the top of the hill. It rolls down faster and faster. It will stop at the ___ of the hill.", "bottom", ["top", "middle of the sky"]],
    ["Rosa plants a bean seed in wet soil and puts it in the sun. In a few days, it will ___.", "sprout", ["melt", "sing"]],
    ["The kids make a snowman. The next day, the sun is very warm. The snowman will ___.", "melt", ["grow", "dance"]],
    ["A boy blows hard on a dandelion with fuzzy white seeds. The seeds will ___.", "float away", ["sink", "turn blue"]],
    ["Jen has a ticket for the movie and a bag of popcorn. She is going to ___.", "watch a movie", ["take a bath", "plant a tree"]],
    ["Dad lights the candles and everyone sings. Then Kim will ___.", "blow out the candles", ["put on boots", "take a nap"]],
    ["The sky is full of stars and the moon is up. Soon the owl will ___.", "hoot", ["moo", "bark"]]
  ];
  const predQ = rows => statics(rows.map(r => ["<b>What will happen next?</b><br><br>" + r[0], r[1], r[2]]), "Look for clues in the sentences. What do they tell you?", "Think: what usually happens after this? Use the clues and what you know.", "Example: <i>Sam puts on his coat and boots. Snow is falling. Sam will go ___.</i> He will go <b>outside</b> to play in the snow. Now do yours.");
  const predSlides = [
    T("Making a prediction", "🔮", "A <b>prediction</b> is a smart guess about what will happen next."),
    T("Use clues", "🔎", "Look at the clues in the story. Then think: \"What usually happens after this?\""),
    T("Example", "🌧️ ☂️", "Dark clouds and thunder? Rain is coming! Your guess comes from clues, not magic.")
  ];
  const TF = statics([
    ["Ben has a big brown dog.", "The dog is brown.", "True"], ["Ben has a big brown dog.", "Ben has a cat.", "False"],
    ["Lily sees two red birds in a tree.", "Lily sees three birds.", "False"], ["Lily sees two red birds in a tree.", "The birds are in a tree.", "True"],
    ["Max and Tom play ball at the park after school.", "They play at the park.", "True"], ["Max and Tom play ball at the park after school.", "They play before school.", "False"],
    ["The cake is on the table. It has pink icing.", "The icing is pink.", "True"], ["The cake is on the table. It has pink icing.", "The cake is on the floor.", "False"],
    ["Ava has a yellow hat and blue shoes.", "Ava has red shoes.", "False"], ["A frog sat on a log and ate a fly.", "The frog ate a fly.", "True"]
  ].map(r => ["<b>Read:</b> " + r[0] + "<br><br>Is this true or false?<br><b>" + r[1] + "</b>", r[2], [r[2] === "True" ? "False" : "True"]]), "Read the story first. Then read the sentence you need to check.", "Look back at the story. Does it say the same thing as the sentence? Check the colors, numbers and places.", "Example: <i>Sam has two cats.</i> The sentence \"Sam has three cats\" is <b>false</b>, because the story says two. Now check yours.");
  const FICT = statics([
    ["A book about a talking rabbit who goes to the moon.", "Fiction", ["Nonfiction"]], ["A book that tells how a seed grows into a plant.", "Nonfiction", ["Fiction"]],
    ["A story about a dragon who is afraid of fire.", "Fiction", ["Nonfiction"]], ["A book with facts about sharks.", "Nonfiction", ["Fiction"]],
    ["A tale about a princess and a magic frog.", "Fiction", ["Nonfiction"]], ["A book that shows the planets in space.", "Nonfiction", ["Fiction"]],
    ["A book about a mouse who drives a school bus.", "Fiction", ["Nonfiction"]], ["A book that tells how to plant a garden.", "Nonfiction", ["Fiction"]],
    ["A book of facts about the weather.", "Nonfiction", ["Fiction"]], ["A story about a robot who learns to dance.", "Fiction", ["Nonfiction"]]
  ].map(r => ["Is this book <b>fiction</b> or <b>nonfiction</b>?<br><br>📚 <i>" + r[0] + "</i>", r[1], r[2]]), "Ask: could this be about real facts, or is it a made-up story?", "<b>Fiction</b> = made-up stories. <b>Nonfiction</b> = true facts that teach you about the real world.", "Example: <i>A book about a bear who bakes pies.</i> Bears don't bake, so it is fiction. <i>A book about how bears live.</i> That is nonfiction. Now do yours.");
  const MAIN = statics([
    ["Dogs can bark. Dogs can run fast. Dogs love to play fetch.", "Things dogs can do", ["Things cats can do", "How to bake a cake"]],
    ["Apples can be red, green or yellow. Apples grow on trees. We can eat them or make juice.", "All about apples", ["All about fish", "All about shoes"]],
    ["Bees fly from flower to flower. They collect sweet nectar. They make honey in their hive.", "How bees make honey", ["How birds build nests", "How flowers smell"]],
    ["Winter is cold. We wear coats, hats and gloves. Snow falls and kids play outside.", "Winter time", ["Summer time", "Rainy days"]],
    ["A seed needs water. It needs sun. Then it can grow into a plant.", "What a seed needs to grow", ["How to bake bread", "Where seeds are sold"]],
    ["My bike has two wheels. It has a bell and a seat. I ride it to the park.", "My bike", ["My shoes", "My house"]],
    ["Frogs hop. Frogs swim. Frogs catch bugs with their sticky tongues.", "What frogs can do", ["What birds can do", "What cows eat"]],
    ["The moon shines at night. It looks round or like a curve. It changes shape over many days.", "The moon", ["The sun", "The wind"]]
  ].map(r => ["<b>Read:</b> " + r[0] + "<br><br>What is this mostly about?", r[1], r[2]]), "The main idea is what the whole passage is mostly about.", "Ask: what do ALL the sentences talk about? That is the main idea. One small detail is not enough.", "Example: <i>Cats purr. Cats climb. Cats nap in the sun.</i> Every sentence is about cats, so the main idea is <b>cats</b>. Now do yours.");
  const FACTS = statics([
    ["Frogs live near water. They eat bugs. Baby frogs are called tadpoles.", "What are baby frogs called?", "tadpoles", ["puppies", "chicks"]],
    ["Owls hunt at night. They have big eyes and can turn their heads a long way.", "When do owls hunt?", "at night", ["in the morning", "at lunch"]],
    ["A giraffe is the tallest animal. It has a long neck and eats leaves from tall trees.", "What does a giraffe eat?", "leaves", ["fish", "pizza"]],
    ["The sun is a star. It gives us light and heat. It looks small because it is far away.", "What does the sun give us?", "light and heat", ["rain and snow", "milk and food"]],
    ["Penguins are birds that cannot fly. They swim fast in cold water.", "What can penguins do well?", "swim", ["fly", "climb trees"]],
    ["Plants need sun, water and air to grow.", "What do plants need?", "sun, water and air", ["milk and juice", "toys and games"]],
    ["A butterfly starts as an egg. Then it is a caterpillar. Later it becomes a butterfly with wings.", "What comes after the egg?", "a caterpillar", ["a butterfly", "a worm"]],
    ["Camels live in hot, dry places. They store fat in their humps and can go many days without water.", "Where do camels live?", "hot, dry places", ["cold, icy places", "under the sea"]]
  ].map(r => ["<b>Read:</b> " + r[0] + "<br><br>" + r[1], r[2], r[3]]), "Read the facts one sentence at a time. Which sentence matches the question?", "Look for the key words from the question in the passage. The answer is right next to them.", "Example: <i>Cows eat grass. Cows give milk.</i> What do cows give? Find \"give\" in the text: <b>milk</b>. Now do yours.");
  const PROB = statics([
    ["Mia's kite got stuck in a tree. Her dad used a long stick to get it down.", "What was the problem?", "The kite was stuck", ["The kite was red", "Mia was sleepy"]],
    ["Ben's shoe was untied and he kept tripping. His mom showed him how to tie a bow.", "How was the problem solved?", "Mom showed him how to tie it", ["Ben stopped walking", "Ben took off his hat"]],
    ["It was too hot at the park. The kids ran through the sprinkler to cool down.", "What was the problem?", "It was too hot", ["It was too cold", "The park was closed"]],
    ["Ava lost her toy bear. She looked under her bed and found it there.", "How was the problem solved?", "She looked under her bed", ["She bought a new one", "She went to sleep"]],
    ["The puppy was very dirty from the mud. Sam gave him a bath with soap and water.", "How was the problem solved?", "Sam gave him a bath", ["Sam gave him a toy", "The puppy ran away"]],
    ["Lila could not reach the cookie jar. She pushed a stool over and climbed up.", "What was the problem?", "She could not reach the jar", ["The jar was empty", "The cookies were hot"]],
    ["The class pet fish had a dirty tank. The kids helped clean it with fresh water.", "What was the problem?", "The fish tank was dirty", ["The fish was lost", "The tank was too big"]],
    ["Leo's bike had a flat tire. His uncle pumped it full of air.", "How was the problem solved?", "His uncle pumped up the tire", ["Leo got a new helmet", "Leo walked home"]]
  ].map(r => ["<b>Read:</b> " + r[0] + "<br><br>" + r[1], r[2], r[3]]), "A <b>problem</b> is something that goes wrong. A <b>solution</b> is how it gets fixed.", "Find what went wrong first. Then look for what the character did to fix it.", "Example: <i>Jo was thirsty. She got a glass of water.</i> The problem: Jo was thirsty. The solution: she got water. Now do yours.");
  const DIRS = statics([
    ["<i>Draw a circle. Then draw a dot inside it.</i><br>What do you draw first?", "a circle", ["a dot", "a square"]],
    ["<i>Put on your socks. Then put on your shoes.</i><br>What goes on last?", "shoes", ["socks", "a hat"]],
    ["<i>Get a cup. Fill it with water. Take a drink.</i><br>What do you do second?", "fill it with water", ["get a cup", "take a drink"]],
    ["<i>Open the door. Walk outside. Close the door.</i><br>What do you do last?", "close the door", ["open the door", "walk outside"]],
    ["<i>Color the star red. Color the moon yellow.</i><br>What color is the moon?", "yellow", ["red", "blue"]],
    ["<i>Clap two times. Then jump one time.</i><br>How many times do you clap?", 2, [1, 3]],
    ["<i>Wash your hands. Dry them with a towel.</i><br>What do you use to dry your hands?", "a towel", ["soap", "water"]],
    ["<i>First, put bread on a plate. Next, put cheese on the bread. Last, put on another slice.</i><br>What do you do first?", "put bread on a plate", ["put on cheese", "put on another slice"]]
  ], "Read all the steps first. Words like first, then, next and last tell you the order.", "Go step by step with your finger. Count the steps until you reach the one the question asks about.", "Example: <i>Sit down. Stand up. Spin around.</i> What do you do second? <b>Stand up</b> is step two. Now do yours.");

  // ---------- teach slide sets ----------
  const sl = {
    first: n => [T("First sounds", "🐶 dog → <b>d</b>-d-dog", "Every word starts with a sound. Say the word slowly and listen to the <b>very first sound</b>."), T("Match a letter", "☀️ sun → <b>s</b>-s-sun", "Each letter makes a sound. The first sound of \"sun\" is \"sss\", and that is the letter <b>s</b>."), T("Tip", "🔊", "Press 🔊 to hear the word. Stretch the first sound and pick the letter that makes it!")],
    short: () => [T("Short vowel sounds", "🍎 a &nbsp; 🥚 e &nbsp; 🦠 i &nbsp; 🐙 o &nbsp; ☂️ u", "The vowels are <b>a, e, i, o, u</b>. Each one has a short sound: a in apple, e in egg, i in igloo, o in octopus, u in umbrella."), T("The middle sound", "c<b>a</b>t &nbsp; b<b>e</b>d &nbsp; p<b>i</b>g", "Short words often have the vowel in the <b>middle</b>. Cat, bed and pig have different middle sounds."), T("Words that match", "cat · hat · bag", "Words with the same middle sound match! Cat, hat and bag all have the short <b>a</b> sound.")],
    long: v => [T("Long vowel sounds", "🎂 &nbsp; 🐝 &nbsp; 🪁 &nbsp; ⛵ &nbsp; 🧊", "A <b>long vowel</b> says its own name: a as in cake, e as in feet, i as in kite, o as in boat, u as in cube."), T("Many spellings", "cake · rain · play", "The same long sound can be spelled in different ways. Long a can be a-e (cake), ai (rain) or ay (play)."), T("Listen first", "👂", "Say the word slowly and ask: do I hear the name of the letter? If yes, it is a long vowel.")],
    blend: () => [T("Blending", "c - a - t → <b>cat</b>", "To read a word, say each sound, then slide the sounds together fast. That is called <b>blending</b>."), T("Slide the sounds", "s-s-s-u-u-u-n-n-n → sun", "Say the sounds slowly with no stop in between. Then say them faster until you hear the word."), T("Check it", "✅", "Does it sound like a real word? If yes, you blended it!")],
    wordpic: () => [T("Words have meanings", "🐱 = cat", "Every word you read stands for something. The word <b>cat</b> means the animal 🐱."), T("Read it, picture it", "d-o-g → 🐶", "Sound out the word, blend it, then think: what does it look like?"), T("Tip", "🔊", "Press 🔊 to hear the word if you need help.")],
    rhyme: () => [T("What rhymes?", "cat · hat · bat", "Words <b>rhyme</b> when they end with the same sound. Cat, hat and bat all end with <b>-at</b>."), T("Rhymes can look different", "🐱 cat &nbsp; 🎩 hat &nbsp; 🦇 bat", "The beginning changes but the <b>ending sound stays the same</b>."), T("Listen for the ending", "👂", "Say each word out loud. If the ending sounds the same, it is a rhyme!")],
    odd: () => [T("Odd one out", "cat · hat · 🐶 dog", "In a group of three, two words may rhyme and one does not. The one that doesn't fit is the <b>odd one out</b>."), T("Listen to the endings", "-at -at <b>-og</b>", "Cat and hat both end in -at. Dog ends in -og. Dog is the odd one."), T("Tip", "👂", "Say all three words and listen for the one that sounds different at the end.")],
    sight: () => [T("Sight words", "the · and · is", "<b>Sight words</b> are words we see in almost every book. We learn to know them right away, without sounding them out."), T("Look and say", "👀 → 🗣️", "Look at the word, say it, and look again. Try to remember how it looks."), T("Tip", "🔊", "Press 🔊 to hear the word. Then find the word that looks right.")],
    sentsight: () => [T("Words in sentences", "I <b>see</b> a cat.", "Sight words are the glue in sentences. They help the other words fit together."), T("Does it sound right?", "The dog <b>is</b> big.", "Read the sentence with each choice. The right word makes the sentence sound like real talking."), T("Tip", "🗣️", "Read the whole sentence out loud in your head.")],
    print: () => [T("How books work", "📖", "A book has a <b>cover</b>, a <b>title</b> (its name), an <b>author</b> (who writes the words) and an <b>illustrator</b> (who draws the pictures)."), T("Reading direction", "➡️ ➡️ ➡️", "We read words from <b>left to right</b>, and lines from the <b>top</b> to the bottom."), T("Sentence marks", "I see a cat<b>.</b> &nbsp; Can you see<b>?</b>", "A sentence ends with a mark: a <b>period</b> (.) for a telling sentence, a <b>question mark</b> (?) for a question.")],
    count: () => [T("Words in a sentence", "I &nbsp; see &nbsp; a &nbsp; cat", "A sentence is made of words. There is a small <b>space</b> between each word."), T("Count them", "I (1) see (2) a (3) cat (4)", "Point to each word and count. \"I see a cat.\" has 4 words."), T("Tip", "☝️", "Little words like \"a\" and \"I\" count too!")],
    end: () => [T("Last sounds", "🐱 cat → ca-<b>t</b>", "Words end with a sound too. Say the word slowly and listen to the <b>very last sound</b>."), T("Match a letter", "🐷 pig → pi-<b>g</b>", "The last sound of \"pig\" is \"g\", so it ends with the letter <b>g</b>."), T("Tip", "🔊", "Press 🔊, say the word again and stop at the end.")],
    blend4: () => [T("Blending bigger words", "s-t-o-p → <b>stop</b>", "Some words have 4 sounds. Say each sound, then blend them together."), T("Blends", "<b>fr</b>-o-g &nbsp; <b>st</b>-o-p", "Two letters at the start (like fr or st) can be said quickly together, then you add the rest."), T("Check it", "✅", "Does it sound like a real word?")],
    dig: () => [T("Two letters, one sound", "<b>sh</b>ip &nbsp; <b>ch</b>air &nbsp; <b>th</b>ree &nbsp; <b>wh</b>ale", "Some letter pairs make just <b>one</b> sound together: sh, ch, th and wh."), T("Hear the difference", "🚢 🪑 3️⃣ 🐳", "sh is a quiet \"shhh\", ch is like a train \"choo\", th has your tongue between your teeth, and wh is a puff of air."), T("Tip", "👀", "Look at the first two letters of the word.")],
    change: () => [T("Word families", "c<b>at</b> · h<b>at</b> · b<b>at</b>", "Words in a family end the same. Change just the first letter and you get a new word!"), T("Swap the first letter", "cat → <b>h</b>at", "Take off the c, put on an h, and \"cat\" becomes \"hat\"."), T("Tip", "🔤", "Keep the ending and say the new word out loud.")],
    magic: () => [T("The magic e", "cap → cap<b>e</b>", "An <b>e</b> at the end of some words is silent, but it makes the vowel say its own name."), T("More magic", "kit → kite &nbsp; hop → hope", "Without the e, the vowel is short. With the e, the vowel is long."), T("Tip", "🪄", "Look at the end of the word. See an e? Long vowel!")],
    real: () => [T("Real or make-believe?", "🐄 vs 🐄🚀", "Some things in stories can happen in real life. Other things are <b>make-believe</b>, like a cow in a rocket."), T("Ask yourself", "🤔", "Could this really happen? If yes, it is real. If no, it is pretend."), T("Both are fun!", "📚", "Make-believe stories are fun to read, but it's good to know the difference.")],
    feel: () => [T("How do characters feel?", "😊 😢 😠 😨", "Characters have <b>feelings</b> just like you: happy, sad, upset, scared, proud, excited."), T("Find the clue", "🎈💥 → 😢", "What happened to the character? That tells you how they feel."), T("Tip", "💭", "Ask: how would I feel if that happened to me?")],
    whyfeel: () => [T("Why do they feel that way?", "😢 ← 🎈", "A feeling always has a <b>reason</b>. The story tells you why a character feels a certain way."), T("Look at the clue sentence", "Ben is crying. <b>His balloon flew away.</b>", "The reason is often in the next sentence. His balloon flew away, so he is sad."), T("Tip", "🔎", "Read both sentences. Which one tells why?")],
    picsent: () => [T("Sentences and pictures", "🐶 → The dog runs.", "A sentence can tell about a picture. The words and the picture go together."), T("Check the details", "👀", "Look at who or what is in the picture. Then read each sentence to see which one fits."), T("Tip", "✅", "Cross out sentences that talk about things you cannot see.")],
    tf: () => [T("True or false?", "✅ ❌", "A sentence is <b>true</b> if the story says it. It is <b>false</b> if the story says something different."), T("Look back", "📖 → 🔎", "Read the story again. Check colors, numbers and places."), T("Tip", "☝️", "If the story does not match the sentence, the answer is false.")],
    fict: () => [T("Fiction", "🐉 📖", "<b>Fiction</b> books tell made-up stories. They can have talking animals, dragons and magic."), T("Nonfiction", "🌍 📖", "<b>Nonfiction</b> books give true facts about the real world: animals, space, plants and more."), T("How to tell", "🤔", "Ask: is it a made-up story or real facts? Facts that teach you = nonfiction.")],
    main: () => [T("The main idea", "🎯", "The <b>main idea</b> is what a passage is mostly about."), T("Find it", "Cats purr. Cats climb. Cats nap. → <b>cats</b>", "If all the sentences talk about the same thing, that thing is the main idea."), T("Details", "🧩", "Small facts are <b>details</b>. They help explain the main idea.")],
    facts: () => [T("Facts in nonfiction", "🦒 📖", "Nonfiction passages teach you facts. Read them carefully, one sentence at a time."), T("Find the answer", "❓ → 🔎", "Look for the key words from the question in the passage. The answer is nearby."), T("Tip", "☝️", "Use your finger to follow the words while you read.")],
    prob: () => [T("Problem and solution", "😟 → 💡 → 😊", "Many stories have a <b>problem</b> (something goes wrong) and a <b>solution</b> (how it gets fixed)."), T("Find both", "Kite stuck in a tree → use a long stick", "Ask: what went wrong? Then: what did the character do about it?"), T("Tip", "🔎", "The solution often comes near the end of the story.")],
    dirs: () => [T("Following directions", "1️⃣ 2️⃣ 3️⃣", "Directions are steps that tell you what to do. Reading them in order is important."), T("Order words", "first · next · then · last", "These words tell you the order of the steps."), T("Tip", "☝️", "Use your finger to go step by step.")],
    comp: () => [T("Compound words", "rain + bow = <b>rainbow</b> 🌈", "A <b>compound word</b> is two small words stuck together to make a new word."), T("Two words in one", "sun + flower = sunflower 🌻", "You can read each small word, then say them together."), T("Tip", "✂️", "If a long word is hard, look for two small words inside it.")]
  };
  const compQ = () => () => {
    const [a, b] = pick(COMP), w = a + b, other = rest(COMP, COMP.find(c => c[0] === a), 2).map(c => c[0] + c[1]);
    return { text: `Which compound word is made from <b>${a}</b> and <b>${b}</b>?`, choices: shuf([w, ...other]), answer: w,
      hints: ["A compound word joins two small words with no space.", `Put <b>${a}</b> first, then add the second word right after it.`, "Example: <b>air</b> and <b>plane</b> make <b>airplane</b>. Join yours the same way."] };
  };
  const fixed = sl;

  // ---------- lessons ----------
  const mk = (t, f, s) => mkL(t, f, s);
  const A1 = mk("First sounds 1", firstSound(FIRST1, L1), sl.first());
  const A2 = mk("First sounds 2", firstSound(FIRST2, L2), sl.first());
  const A3 = mk("Short a and short i", shortVowel(["a", "i"]), sl.short());
  const A4 = mk("Short o, u and e", shortVowel(["o", "u", "e"]), sl.short());
  const A5 = mk("Blend the sounds", blend3(), sl.blend());
  const A6 = mk("Match words to pictures", wordToPic(PIC), sl.wordpic());
  const A7 = mk("Words that rhyme", rhymeQ(RH.slice(0, 6)), sl.rhyme());
  const A8 = mk("Odd one out", oddRhyme(RH.slice(0, 6)), sl.odd());
  const A9 = mk("Sight words 1", sightHear(SW1), sl.sight());
  const A10 = mk("Sight words 2", sightHear(SW1.concat(["he", "she", "my", "like", "go", "look"])), sl.sight());
  const A11 = mk("Sight words in sentences", sentSight(SENT_SW), sl.sentsight());
  const A12 = mk("Pick the word", picToWord(PIC.concat(PIC2.slice(0, 6))), sl.wordpic());
  const A13 = mk("How books work", PRINT, sl.print());
  const A14 = mk("Count the words", wordCount(), sl.count());
  const A15 = mk("Who is in the story?", storyQ(S1, "who"), stSlides(1, "who"));
  const A16 = mk("What happens?", storyQ(S1, "what"), stSlides(1, "what"));
  const A17 = mk("Where does it happen?", storyQ(S1, "where"), stSlides(1, "where"));
  const A18 = mk("Last sounds", endSound(), sl.end());

  const B1 = mk("Sight words 3", sightHear(SW2), sl.sight());
  const B2 = mk("More sight words in sentences", sentSight(SENT_SW2), sl.sentsight());
  const B3 = mk("Short vowel words", shortVowel(["a", "e", "i", "o", "u"]), sl.short());
  const B4 = mk("Blend bigger words", blend4(), sl.blend4());
  const B5 = mk("sh, ch, th and wh words", digraphQ(), sl.dig());
  const B6 = mk("Rhymes in word families", rhymeQ(RH.slice(6)), sl.rhyme());
  const B7 = mk("Odd one out 2", oddRhyme(RH.slice(6)), sl.odd());
  const B8 = mk("Change the first letter", changeLetter(), sl.change());
  const B9 = mk("The magic e", magicQ(), sl.magic());
  const B10 = mk("Who is in the story?", storyQ(S2, "who"), stSlides(2, "who"));
  const B11 = mk("What happens?", storyQ(S2, "what"), stSlides(2, "what"));
  const B12 = mk("Where does it happen?", storyQ(S2, "where"), stSlides(2, "where"));
  const B13 = mk("Beginning and end", seqQ(["first", "last"]), seqSlides);
  const B14 = mk("Real or make-believe?", REALQ, sl.real());
  const B15 = mk("How do they feel?", FEEL1, sl.feel());
  const B16 = mk("What happens next?", predQ(PRED2), predSlides);
  const B17 = mk("Match the sentence", picSent(PS1), sl.picsent());
  const B18 = mk("True or false?", TF, sl.tf());

  const C1 = mk("Long a words", longVowel(["a"]), sl.long("a"));
  const C2 = mk("Long e words", longVowel(["e"]), sl.long("e"));
  const C3 = mk("Long i words", longVowel(["i"]), sl.long("i"));
  const C4 = mk("Long o and long u", longVowel(["o", "u"]), sl.long("o"));
  const C5 = mk("Sight words 4", sightHear(SW3), sl.sight());
  const C6 = mk("Compound words", compQ(), sl.comp());
  const C7 = mk("Match the sentence 2", picSent(PS3), sl.picsent());
  const C8 = mk("Who is in the story?", storyQ(S3, "who"), stSlides(3, "who"));
  const C9 = mk("Where does it happen?", storyQ(S3, "where"), stSlides(3, "where"));
  const C10 = mk("Beginning, middle, end", seqQ(["first", "middle", "last"]), seqSlides);
  const C11 = mk("Fiction or nonfiction?", FICT, sl.fict());
  const C12 = mk("Make a prediction", predQ(PRED3), predSlides);
  const C13 = mk("The main idea", MAIN, sl.main());
  const C14 = mk("Story details", storyQ(S3, "what"), stSlides(3, "what"));
  const C15 = mk("Why do they feel that way?", FEEL3, sl.whyfeel());
  const C16 = mk("Problem and solution", PROB, sl.prob());
  const C17 = mk("Facts in nonfiction", FACTS, sl.facts());
  const C18 = mk("Following directions", DIRS, sl.dirs());

  return {
    1: [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18,
      MIX("Mixed practice", A1, A7, A9, A12), MIX("Level 1 Challenge", A5, A3, A8, A11, A16, A18)],
    2: [B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17, B18,
      MIX("Mixed practice", B3, B5, B9, B14), MIX("Level 2 Challenge", B2, B4, B8, B11, B16, B18)],
    3: [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, C17, C18,
      MIX("Mixed practice", C1, C6, C10, C11), MIX("Level 3 Challenge", C4, C9, C12, C13, C16, C17)]
  };
})();
