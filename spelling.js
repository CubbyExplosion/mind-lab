// Mind Lab Spelling & Words. Levels 1-3 have 20 lessons each (60 lessons).
// Every lesson teaches first (3 slides), then quizzes. Every question has 3 hints
// (nudge, clue, worked example) and never shows the real answer.
// Needs math.js loaded first (uses ri, pick).
const shuf = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(x => x[1]);
const ALPHA = "abcdefghijklmnopqrstuvwxyz".split("");
const others = (ans, n, avoid = []) => shuf(ALPHA.filter(l => l !== ans && !avoid.includes(l))).slice(0, n);
const bold = (word, part) => word.replace(part, "<b>" + part + "</b>");

// ---------- word banks: [word, emoji] ----------
const BEGIN_BANK = [["cat","🐱"],["dog","🐶"],["sun","☀️"],["fish","🐟"],["bus","🚌"],["hat","🎩"],["pig","🐷"],["hen","🐔"],["bat","🦇"],["bug","🐛"],["fox","🦊"],["ant","🐜"],["bee","🐝"],["cup","☕"],["bed","🛏️"],["map","🗺️"],["web","🕸️"],["pen","🖊️"],["box","📦"],["log","🪵"],["lip","👄"],["leg","🦵"],["tub","🛁"],["bag","🎒"],["sock","🧦"],["book","📖"],["moon","🌙"],["star","⭐"],["tree","🌳"],["bird","🐦"],["duck","🦆"],["drum","🥁"],["flag","🚩"],["house","🏠"],["boat","⛵"],["kite","🪁"],["rain","🌧️"],["apple","🍎"],["egg","🥚"],["key","🔑"],["zip","🤐"]];
const CVC = {
  a: [["cat","🐱"],["hat","🎩"],["bat","🦇"],["map","🗺️"],["bag","🎒"],["ant","🐜"]],
  e: [["hen","🐔"],["bed","🛏️"],["pen","🖊️"],["web","🕸️"],["leg","🦵"],["gem","💎"]],
  i: [["pig","🐷"],["lip","👄"],["zip","🤐"],["kid","🧒"],["six","6️⃣"],["pin","📌"]],
  o: [["dog","🐶"],["fox","🦊"],["box","📦"],["log","🪵"],["pot","🍲"],["mop","🧹"]],
  u: [["sun","☀️"],["bug","🐛"],["cup","☕"],["bus","🚌"],["tub","🛁"],["hug","🤗"]]
};
const CVC_ALL = [].concat(CVC.a, CVC.e, CVC.i, CVC.o, CVC.u);
const END_BANK = CVC_ALL.filter(([w]) => !["fox", "box", "six"].includes(w));
const BLEND_WORDS = [["frog","🐸"],["star","⭐"],["flag","🚩"],["tree","🌳"],["crab","🦀"],["drum","🥁"],["plane","✈️"],["snake","🐍"],["sled","🛷"],["spoon","🥄"],["clock","🕐"],["block","🧱"]];
const DIGRAPH_WORDS = [["ship","🚢"],["fish","🐟"],["shell","🐚"],["sheep","🐑"],["shoe","👟"],["chair","🪑"],["cheese","🧀"],["cherry","🍒"],["whale","🐳"]];
const BIG_WORDS = [["apple","🍎"],["house","🏠"],["bread","🍞"],["plant","🌱"],["cloud","☁️"],["tiger","🐯"],["snake","🐍"],["horse","🐴"],["train","🚂"],["beach","🏖️"],["tooth","🦷"],["clock","🕐"],["chair","🪑"],["pizza","🍕"],["queen","👑"],["mouse","🐭"]];
const RHYMES = [["at",["cat","bat","hat","mat","rat"]],["og",["dog","log","frog","fog"]],["an",["can","fan","man","pan"]],["ig",["pig","big","dig","wig"]],["un",["sun","run","fun","bun"]],["ug",["bug","hug","mug","rug"]],["ake",["cake","lake","snake","bake"]],["ight",["night","light","right","fight"]],["ain",["rain","train","pain","chain"]]];
const SYLL = {
  1: ["dog","cat","frog","sun","fish","tree","ship","moon"],
  2: ["apple","tiger","rabbit","happy","pizza","flower","monkey","pencil"],
  3: ["banana","elephant","butterfly","computer","tomato","umbrella","dinosaur","potato"],
  4: ["watermelon","alligator","caterpillar","helicopter"]
};
const SIGHT_A = [["the",["teh","tha"]],["said",["sed","siad"]],["they",["thay","thae"]],["was",["wuz","wos"]],["what",["wat","whut"]],["have",["hav","haev"]],["were",["wer","wure"]],["some",["sum","som"]]];
const SIGHT_B = [["friend",["freind","frend"]],["again",["agen","agian"]],["people",["peple","peeple"]],["would",["wud","wuld"]],["could",["cud","culd"]],["because",["becuz","becase"]],["their",["thier","ther"]],["does",["duz","dose"]]];
const CLOZE = [["I can ___ a bird in the tree.","see"],["The cat ___ on the mat.","sat"],["She ___ to the park.","went"],["We ___ pizza for lunch.","eat"],["He ___ a red hat.","has"],["___ you like milk?","do"],["They ___ my friends.","are"],["I ___ my mom.","love"]];
const SILENT_E = [["cap","cape"],["tap","tape"],["kit","kite"],["hop","hope"],["cub","cube"],["pin","pine"],["mat","mate"],["not","note"]];
const PLURAL_S = [["cat","🐱"],["dog","🐶"],["pig","🐷"],["hat","🎩"],["cup","☕"],["book","📖"],["tree","🌳"],["star","⭐"],["flower","🌸"],["bed","🛏️"]];
const PLURAL_ES = [["box","📦"],["bus","🚌"],["dish","🍽️"],["fox","🦊"],["glass","🥛"],["brush","🪥"],["watch","⌚"]];
const COMPOUND = [["sun","flower","🌻"],["rain","bow","🌈"],["cup","cake","🧁"],["foot","ball","🏈"],["butter","fly","🦋"],["pop","corn","🍿"],["snow","man","⛄"],["bed","room","🛏️"],["sail","boat","⛵"],["tooth","brush","🪥"],["pan","cake","🥞"],["air","plane","✈️"]];
const ED_WORDS = ["walk","jump","play","look","help","talk","cook","paint","call","want"];
const ING_WORDS = ["jump","walk","play","look","help","sing","eat","read","cook","paint"];
const CONTRACT = [["do not","don't"],["can not","can't"],["it is","it's"],["I am","I'm"],["we are","we're"],["he is","he's"],["did not","didn't"],["is not","isn't"],["they are","they're"],["I will","I'll"]];
const OPP = [["hot","cold"],["up","down"],["big","small"],["happy","sad"],["fast","slow"],["day","night"],["open","close"],["wet","dry"],["loud","quiet"],["old","new"],["hard","soft"],["full","empty"],["light","dark"],["in","out"],["front","back"]];
const SYN = [["big","large"],["little","small"],["happy","glad"],["fast","quick"],["begin","start"],["pretty","beautiful"],["sad","unhappy"],["shut","close"],["tired","sleepy"],["jump","leap"]];
const ABC_FAM = [["cat","cap","cow","car","can","cup"],["bat","bad","bag","ban","bed","bus"],["pig","pin","pit","pen","pot","pup"],["hat","ham","hit","hen","hot","hug"]];
const ABC_WORDS = ["apple","bird","cat","dog","egg","fish","goat","hat","igloo","jam","kite","lion","moon","nest","owl","pig","queen","rain","sun","tree","van","web","zoo"];

// ---------- pattern builder (blanks in a word) ----------
const P = (word, e, ans) => ({ word, e, ans, show: word.replace(ans, "__") });
const PATTERNS = {
  lblend: { name: "L-blends", opts: ["bl","cl","fl","pl","gl"], rule: "Blends are two letters that sit side by side and you hear <b>both</b> sounds: <b>bl</b> in block, <b>cl</b> in clock, <b>fl</b> in flag, <b>pl</b> in plane, <b>gl</b> in glue.", items: [P("block","🧱","bl"),P("clock","🕐","cl"),P("flag","🚩","fl"),P("plane","✈️","pl"),P("flower","🌸","fl"),P("cloud","☁️","cl"),P("plant","🌱","pl"),P("glue","🧴","gl"),P("blue","🔵","bl"),P("clap","👏","cl")] },
  rblend: { name: "R-blends", opts: ["br","cr","dr","fr","gr","tr"], rule: "These blends have an <b>r</b> after the first letter: <b>br</b> in bread, <b>cr</b> in crab, <b>dr</b> in drum, <b>fr</b> in frog, <b>gr</b> in grass, <b>tr</b> in tree.", items: [P("bread","🍞","br"),P("crab","🦀","cr"),P("drum","🥁","dr"),P("frog","🐸","fr"),P("grass","🌿","gr"),P("tree","🌳","tr"),P("truck","🚚","tr"),P("crown","👑","cr"),P("dragon","🐉","dr"),P("brush","🪥","br")] },
  sblend: { name: "S-blends", opts: ["sl","sn","sp","st","sw"], rule: "These blends start with <b>s</b>: <b>sl</b> in sled, <b>sn</b> in snake, <b>sp</b> in spoon, <b>st</b> in star, <b>sw</b> in swan.", items: [P("sled","🛷","sl"),P("snake","🐍","sn"),P("spoon","🥄","sp"),P("star","⭐","st"),P("swan","🦢","sw"),P("snail","🐌","sn"),P("spider","🕷️","sp"),P("stop","🛑","st"),P("snow","❄️","sn"),P("stone","🪨","st")] },
  sh: { name: "The sh sound", opts: ["sh","ch","th"], rule: "<b>sh</b> makes the quiet \"shhh\" sound, like when you ask someone to hush. It can be at the start (ship) or the end (fish) of a word.", items: [P("ship","🚢","sh"),P("shell","🐚","sh"),P("sheep","🐑","sh"),P("shoe","👟","sh"),P("shark","🦈","sh"),P("fish","🐟","sh"),P("dish","🍽️","sh")] },
  ch: { name: "The ch sound", opts: ["ch","sh","th"], rule: "<b>ch</b> makes the sound you hear in chair, like a train going \"choo-choo\". It can be at the start (cheese) or the end (beach) of a word.", items: [P("chair","🪑","ch"),P("cheese","🧀","ch"),P("cherry","🍒","ch"),P("chick","🐥","ch"),P("beach","🏖️","ch"),P("peach","🍑","ch"),P("lunch","🥪","ch")] },
  thwh: { name: "th and wh", opts: ["th","wh","sh"], rule: "<b>th</b> is made with your tongue between your teeth (three, bath). <b>wh</b> sounds like a puff of air (whale, wheel).", items: [P("three","3️⃣","th"),P("thumb","👍","th"),P("bath","🛁","th"),P("tooth","🦷","th"),P("whale","🐳","wh"),P("wheel","🛞","wh"),P("think","💭","th")] },
  aiay: { name: "Long a: ai or ay", opts: ["ai","ay"], rule: "<b>ai</b> and <b>ay</b> both say \"ay\", like in rain and play. <b>ai</b> is usually in the <b>middle</b> of a word (rain). <b>ay</b> is usually at the <b>end</b> (play).", items: [P("rain","🌧️","ai"),P("train","🚂","ai"),P("snail","🐌","ai"),P("paint","🎨","ai"),P("mail","✉️","ai"),P("play","🎮","ay"),P("day","🌞","ay"),P("spray","🧴","ay"),P("hay","🌾","ay"),P("tray","🍽️","ay")] },
  eeea: { name: "Long e: ee or ea", opts: ["ee","ea"], rule: "<b>ee</b> and <b>ea</b> both say \"ee\", like in feet and beach. You'll just have to learn which words use which. Looking at the picture and practicing helps!", items: [P("feet","🦶","ee"),P("tree","🌳","ee"),P("bee","🐝","ee"),P("sheep","🐑","ee"),P("green","🟢","ee"),P("beach","🏖️","ea"),P("leaf","🍃","ea"),P("seal","🦭","ea"),P("peach","🍑","ea"),P("bean","🫘","ea")] },
  igh: { name: "Long i: igh, y or ie", opts: ["igh","y","ie"], rule: "The long <b>i</b> (say \"eye\") can be spelled <b>igh</b> (light), <b>y</b> at the end of short words (fly) or <b>ie</b> (pie).", items: [P("light","💡","igh"),P("night","🌃","igh"),P("flight","✈️","igh"),P("fly","🪰","y"),P("sky","☁️","y"),P("cry","😢","y"),P("pie","🥧","ie"),P("tie","👔","ie")] },
  oaow: { name: "Long o: oa or ow", opts: ["oa","ow"], rule: "<b>oa</b> and <b>ow</b> both say \"oh\", like in boat and snow. <b>oa</b> is usually in the <b>middle</b> (boat). <b>ow</b> is usually at the <b>end</b> (snow).", items: [P("boat","⛵","oa"),P("goat","🐐","oa"),P("coat","🧥","oa"),P("soap","🧼","oa"),P("road","🛣️","oa"),P("snow","❄️","ow"),P("grow","🌱","ow"),P("window","🪟","ow"),P("pillow","🛏️","ow"),P("yellow","🟡","ow")] },
  oo: { name: "The oo sound", opts: ["oo","ew","ue"], rule: "The \"oo\" sound (like in moon) can be spelled <b>oo</b> (moon), <b>ew</b> (new) or <b>ue</b> (blue). All three sound the same!", items: [P("moon","🌙","oo"),P("food","🍔","oo"),P("spoon","🥄","oo"),P("boot","🥾","oo"),P("pool","🏊","oo"),P("new","🆕","ew"),P("flew","🕊️","ew"),P("blew","💨","ew"),P("blue","🔵","ue"),P("glue","🧴","ue")] },
  aror: { name: "ar and or", opts: ["ar","or"], rule: "<b>ar</b> says \"ar\" like a pirate (car, star). <b>or</b> says \"or\" (corn, fork).", items: [P("car","🚗","ar"),P("star","⭐","ar"),P("farm","🚜","ar"),P("shark","🦈","ar"),P("park","🏞️","ar"),P("corn","🌽","or"),P("fork","🍴","or"),P("horse","🐴","or"),P("storm","⛈️","or"),P("north","🧭","or")] },
  erirur: { name: "er, ir and ur", opts: ["er","ir","ur"], rule: "<b>er</b>, <b>ir</b> and <b>ur</b> all say the same sound, like in tiger, bird and turtle. You learn each word by seeing it a lot!", items: [P("tiger","🐯","er"),P("flower","🌸","er"),P("spider","🕷️","er"),P("water","💧","er"),P("butter","🧈","er"),P("bird","🐦","ir"),P("girl","👧","ir"),P("shirt","👕","ir"),P("turtle","🐢","ur"),P("burn","🔥","ur")] },
  owou: { name: "ow and ou", opts: ["ow","ou"], rule: "<b>ow</b> and <b>ou</b> both say \"ow!\" like when you get a bump. <b>ow</b> (cow, owl) and <b>ou</b> (house, mouse).", items: [P("cow","🐮","ow"),P("owl","🦉","ow"),P("clown","🤡","ow"),P("crown","👑","ow"),P("house","🏠","ou"),P("mouse","🐭","ou"),P("cloud","☁️","ou"),P("mouth","👄","ou"),P("couch","🛋️","ou")] },
  oyoi: { name: "oy and oi", opts: ["oy","oi"], rule: "<b>oy</b> and <b>oi</b> say the same sound, like in boy and coin. <b>oy</b> is at the <b>end</b> (boy, toy). <b>oi</b> is in the <b>middle</b> (coin, oil).", items: [P("boy","👦","oy"),P("toy","🧸","oy"),P("joy","😊","oy"),P("coin","🪙","oi"),P("oil","🛢️","oi"),P("boil","♨️","oi"),P("noise","🔊","oi")] },
  digraphs: { name: "sh, ch, th and wh", opts: ["sh","ch","th","wh"], rule: "<b>sh</b> (ship), <b>ch</b> (chair), <b>th</b> (three) and <b>wh</b> (whale) are letter pairs that make ONE sound together.", items: [P("ship","🚢","sh"),P("chair","🪑","ch"),P("three","3️⃣","th"),P("whale","🐳","wh"),P("cheese","🧀","ch"),P("shell","🐚","sh"),P("bath","🛁","th"),P("wheel","🛞","wh"),P("beach","🏖️","ch"),P("fish","🐟","sh")] }
};

// ---------- question makers ----------
const SQ = {
  alphaNext(dir) {
    return () => {
      const after = dir === "after", i = after ? ri(0, 24) : ri(1, 25), L = ALPHA[i], ans = ALPHA[after ? i + 1 : i - 1];
      const ex = i === 1 ? 5 : 1, exL = ALPHA[ex], exAns = ALPHA[after ? ex + 1 : ex - 1];
      return {
        text: `Which letter comes ${dir} ${L.toUpperCase()}?`, choices: shuf([ans.toUpperCase(), ...others(ans, 2, [L]).map(x => x.toUpperCase())]), answer: ans.toUpperCase(),
        hints: [
          "Sing the alphabet song in your head: A, B, C, D…",
          `Sing until you reach ${L.toUpperCase()}. ${after ? "The very next letter you sing" : "The letter you sang right before it"} is your answer.`,
          `Example: ${after ? "after" : "before"} ${exL.toUpperCase()} comes ${exAns.toUpperCase()}. Use the same trick with ${L.toUpperCase()}.`
        ]
      };
    };
  },
  upperLower() {
    return () => {
      const L = pick(ALPHA), toLower = Math.random() < 0.5;
      const ans = toLower ? L : L.toUpperCase();
      const opts = others(L, 2).map(x => (toLower ? x : x.toUpperCase()));
      const ex = L === "b" ? "d" : "b";
      return {
        text: toLower ? `Which is the small letter for ${L.toUpperCase()}?` : `Which is the capital letter for ${L}?`, choices: shuf([ans, ...opts]), answer: ans,
        hints: [
          "Every letter has two forms: a big capital letter and a small letter.",
          toLower ? "Small letters are the ones you see most in books. Think of the same letter but little." : "Capital letters are the big ones that start names and sentences.",
          `Example: ${ex.toUpperCase()} and ${ex} are the same letter, big and small. Find the partner of ${toLower ? L.toUpperCase() : L}.`
        ]
      };
    };
  },
  vowel() {
    return () => {
      const L = pick(ALPHA.filter(x => x !== "y")), isV = "aeiou".includes(L);
      const exV = L === "a" ? "e" : "a", exC = L === "b" ? "d" : "b";
      return {
        text: `Is the letter ${L.toUpperCase()} a vowel or a consonant?`, choices: ["Vowel", "Consonant"], answer: isV ? "Vowel" : "Consonant",
        hints: [
          "The alphabet has two kinds of letters: vowels and consonants.",
          "The vowels are only these: A, E, I, O, U. Every other letter is a consonant.",
          `Example: ${exV.toUpperCase()} is in A-E-I-O-U, so it's a vowel. ${exC.toUpperCase()} is not in A-E-I-O-U, so it's a consonant.`
        ]
      };
    };
  },
  beginSound(bank = BEGIN_BANK) {
    return () => {
      const [w, e] = pick(bank), a = w[0];
      const avoid = a === "c" ? ["k"] : a === "k" ? ["c"] : [];
      const [xw, xe] = w === "dog" ? ["sun", "☀️"] : ["dog", "🐶"];
      return {
        text: "Which letter does this word start with?", visual: e, say: w, choices: shuf([a, ...others(a, 2, avoid)]), answer: a,
        hints: [
          "Press 🔊 and say the word slowly. Listen to the very first sound.",
          "Say just the first sound, and stretch it out like \"sssss\" for sun. Which letter makes that sound?",
          `Example: ${xe} ${xw} starts with <b>${xw[0]}</b> (${xw[0]}-${xw[0]}-${xw}). Do the same for yours.`
        ]
      };
    };
  },
  endSound(bank = END_BANK) {
    return () => {
      const [w, e] = pick(bank), z = w[w.length - 1];
      const [xw, xe] = w === "cat" ? ["sun", "☀️"] : ["cat", "🐱"];
      return {
        text: "Which letter does this word end with?", visual: e, say: w, choices: shuf([z, ...others(z, 2)]), answer: z,
        hints: [
          "Press 🔊 and say the word slowly. Listen to the very last sound.",
          "Say the word again and stop at the end. What sound is the last thing you hear?",
          `Example: ${xe} ${xw} ends with <b>${xw[xw.length - 1]}</b> (${xw.slice(0, -1)}-${xw[xw.length - 1]}). Do the same for yours.`
        ]
      };
    };
  },
  rhyme() {
    return () => {
      const fam = pick(RHYMES), [end, words] = fam, w = pick(words);
      const right = pick(words.filter(x => x !== w));
      const wrongs = shuf(RHYMES.filter(f => f[0] !== end)).slice(0, 2).map(f => pick(f[1]));
      return {
        text: `Which word rhymes with "${w}"?`, say: w, choices: shuf([right, ...wrongs]), answer: right,
        hints: [
          "Rhyming words end with the same sound.",
          `Say "${w}" and listen to how it ends. Then say each choice. Which one ends the same way?`,
          "Example: \"sun\" and \"run\" rhyme, because they both end in -un."
        ]
      };
    };
  },
  syllables(maxS) {
    return () => {
      const n = ri(1, maxS), w = pick(SYLL[n]);
      return {
        text: `How many claps (syllables) are in "${w}"?`, say: w, choices: Array.from({ length: Math.min(maxS, 4) + (maxS < 4 ? 1 : 0) }, (_, i) => i + 1), answer: n,
        hints: [
          "A syllable is one beat of a word. Say the word slowly and clap each part.",
          "Put your hand under your chin and say the word. Your chin drops once for every syllable!",
          "Example: \"sunshine\" is sun-shine. That's 2 claps."
        ]
      };
    };
  },
  spellType(bank) {
    return () => {
      const [w, e] = pick(bank);
      const [xw, xe] = w === "dog" ? ["cat", "🐱"] : ["dog", "🐶"];
      return {
        text: "Spell the word.", visual: e, say: w, textInput: true, answer: w,
        wrong: g => (typeof g === "string" && g.length !== w.length ? `The word you're spelling has ${w.length} letters. Yours has ${g.length}.` : null),
        hints: [
          "Press 🔊 and say the word slowly. Listen for each sound, and write a letter for each one.",
          `It starts with <b>${w[0]}</b> and has ${w.length} letters. Say it slowly again and write what you hear.`,
          `Example: ${xe} sound out "${xw}": ${xw.split("").join(" - ")}. Each sound gets a letter. Do the same for yours.`
        ]
      };
    };
  },
  missingVowel() {
    return () => {
      const [w, e] = pick(CVC_ALL.filter(([x]) => "aeiou".includes(x[1]))), v = w[1];
      const [xw, xe] = w === "dog" ? ["cat", "🐱"] : ["dog", "🐶"];
      return {
        text: `${w[0]}_${w[2]}`, visual: e, say: w, choices: ["a", "e", "i", "o", "u"], answer: v,
        hints: [
          `Press 🔊 and say the word slowly: ${w[0]}… ? …${w[2]}. What sound is in the middle?`,
          "The missing letter is a vowel: a, e, i, o or u. Try each one and see which makes the word in the picture.",
          `Example: ${xe} ${xw[0]}_${xw[2]} is "${xw}". The missing vowel is <b>${xw[1]}</b>.`
        ]
      };
    };
  },
  missingFirst() {
    return () => {
      const [w, e] = pick(END_BANK.filter(([x]) => x.length === 3)), a = w[0];
      const avoid = a === "c" ? ["k"] : a === "k" ? ["c"] : [];
      return {
        text: `_${w.slice(1)}`, visual: e, say: w, choices: shuf([a, ...others(a, 2, avoid)]), answer: a,
        hints: [
          "Press 🔊 and say the whole word. Then say just the beginning sound.",
          `The ending is "${w.slice(1)}". Which letter's sound goes in front to make the word in the picture?`,
          "Example: _og with a dog picture. The first sound is \"d\", so it's <b>d</b>og."
        ]
      };
    };
  },
  countSounds() {
    const bank = [["at",2],["up",2],["in",2],["on",2],["dog",3],["cat",3],["ship",3],["fish",3],["sun",3],["tree",3],["frog",4],["flag",4],["stop",4],["grass",4]];
    return () => {
      const [w, n] = pick(bank);
      return {
        text: `How many sounds do you hear in "${w}"?`, say: w, choices: [2, 3, 4], answer: n,
        hints: [
          "Say the word slowly and put up one finger for each sound.",
          "Sounds are not always the same as letters! Two letters like \"sh\" can make just one sound.",
          "Example: \"ship\" has 3 sounds: sh - i - p."
        ]
      };
    };
  },
  sightChoice(bank) {
    return () => {
      const [w, wrongs] = pick(bank), ex = w === "friend" ? ["said", "ai"] : ["friend", "ie"];
      return {
        text: "Which one is spelled right?", choices: shuf([w, ...wrongs]), answer: w,
        hints: [
          "Look at each word carefully. Which one looks right to you?",
          "Sight words are tricky because they don't always sound the way they look. Some have silent or sneaky letters.",
          `Example: "${ex[0]}" has the letters "${ex[1]}" in it, even though that's hard to hear. Look closely at yours.`
        ]
      };
    };
  },
  cloze() {
    return () => {
      const [s, w] = pick(CLOZE);
      const [xs, xw] = w === "see" ? ["The dog ___ a bone.", "has"] : ["I can ___ a bird.", "see"];
      return {
        text: s, textInput: true, answer: w,
        hints: [
          "Read the whole sentence. What word would make it make sense?",
          `The missing word starts with the letter <b>${w[0]}</b> and is ${w.length} letters long.`,
          `Example: "${xs.replace("___", "<b>" + xw + "</b>")}" The word has to fit the sentence. Now try yours.`
        ]
      };
    };
  },
  pattern(key) {
    const cfg = PATTERNS[key];
    return () => {
      const it = pick(cfg.items), exs = cfg.items.filter(x => x.ans !== it.ans), ex = exs.length ? pick(exs) : it;
      const wrong = shuf(cfg.opts.filter(o => o !== it.ans)).slice(0, 2);
      return {
        text: it.show, visual: it.e, say: it.word, choices: shuf([it.ans, ...wrong]), answer: it.ans,
        hints: [
          "Press 🔊 and say the word slowly. Listen to the sound where the letters are missing.",
          cfg.rule,
          `Example: in <b>${bold(ex.word, ex.ans)}</b> the missing letters are <b>${ex.ans}</b>. Now find yours.`
        ]
      };
    };
  },
  silentE() {
    return () => {
      const [w, ans] = pick(SILENT_E), [xw, xa] = w === "cap" ? ["tap", "tape"] : ["cap", "cape"];
      return {
        text: `Add a magic e to "${w}". What is the new word?`, textInput: true, answer: ans,
        hints: [
          "A magic e at the end of a word makes the vowel say its own name.",
          `Write "${w}" and think about adding one letter at the very end. Say the new word out loud.`,
          `Example: ${xw} + e = ${xa}. The a said its name. Now do yours.`
        ]
      };
    };
  },
  plural(kind) {
    const bank = kind === "es" ? PLURAL_ES : PLURAL_S;
    return () => {
      const [w, e] = pick(bank), ans = w + kind;
      return {
        text: `One ${w}, two ___ .`, visual: e + " → " + e + e, textInput: true, answer: ans,
        hints: [
          "Plural means more than one. Two or more things need a plural word.",
          kind === "es" ? "Words that end in s, x, sh or ch need <b>-es</b> to make more than one." : "For most words, you just add an <b>s</b> at the end to make more than one.",
          kind === "es" ? "Example: one fox, two foxes. One dish, two dishes." : "Example: one dog, two dogs. One hat, two hats."
        ]
      };
    };
  },
  compound() {
    return () => {
      const [a, b, e] = pick(COMPOUND), [xa, xb] = a === "rain" ? ["sun", "flower"] : ["rain", "bow"];
      return {
        text: `${a} + ${b} = ?`, visual: e, textInput: true, answer: a + b,
        hints: [
          "A compound word is made when two small words stick together to make a new big word.",
          "Look at the picture. It shows the new word. Say the two small words together, fast.",
          `Example: ${xa} + ${xb} = ${xa}${xb}. Join yours the same way.`
        ]
      };
    };
  },
  suffix(kind) {
    return () => {
      const w = pick(kind === "ed" ? ED_WORDS : ING_WORDS), ans = w + kind;
      const ex = kind === "ed" ? (w === "play" ? "jump" : "play") : (w === "jump" ? "walk" : "jump");
      return {
        text: kind === "ed" ? `Yesterday, I ___ (${w}).` : `Right now, I am ___ (${w}).`, textInput: true, answer: ans,
        hints: [
          kind === "ed" ? "Yesterday means it already happened. That's the past." : "Right now means it is happening at this moment.",
          kind === "ed" ? "To show the past for many words, add <b>-ed</b> at the end of the word." : "To show it's happening now, add <b>-ing</b> at the end of the word.",
          `Example: ${kind === "ed" ? `Yesterday I ${ex}ed.` : `I am ${ex}ing.`} ${ex} + ${kind} = ${ex}${kind}. Now do yours.`
        ]
      };
    };
  },
  contraction() {
    return () => {
      const [a, ans] = pick(CONTRACT), [xa, xans] = a === "do not" ? ["is not", "isn't"] : ["do not", "don't"];
      return {
        text: `Squish "${a}" into one word.`, textInput: true, answer: ans,
        hints: [
          "A contraction squishes two words into one shorter word.",
          "An apostrophe (') takes the place of the letters that get left out. Join the two words, then take out those letters.",
          `Example: "${xa}" becomes "${xans}". The apostrophe replaced the "${xa === "do not" ? "o" : "i"}".`
        ]
      };
    };
  },
  opposites() {
    return () => {
      const flip = Math.random() < 0.5, [p, q] = pick(OPP), word = flip ? q : p, ans = flip ? p : q;
      const wrongs = shuf(OPP.flat().filter(x => x !== word && x !== ans)).slice(0, 2);
      return {
        text: `What is the opposite of "${word}"?`, choices: shuf([ans, ...wrongs]), answer: ans,
        hints: [
          "Opposites are words that mean things that are as different as can be.",
          `Think of "${word}". What would be the very opposite of that?`,
          "Example: the opposite of \"up\" is \"down\". The opposite of \"hot\" is \"cold\"."
        ]
      };
    };
  },
  synonyms() {
    return () => {
      const [w, ans] = pick(SYN), wrongs = shuf(SYN.map(x => x[1]).filter(x => x !== ans)).slice(0, 2);
      return {
        text: `Which word means the same as "${w}"?`, choices: shuf([ans, ...wrongs]), answer: ans,
        hints: [
          "A synonym is a word that means almost the same thing as another word.",
          `Say "${w}" in a sentence. Which choice could you put in instead and keep the same meaning?`,
          "Example: \"big\" and \"large\" mean the same. \"Happy\" and \"glad\" mean the same."
        ]
      };
    };
  },
  abcFirst() {
    return () => {
      const ws = shuf(ABC_WORDS).slice(0, 3).sort(), ans = ws[0];
      return {
        text: "Which word comes first in ABC order?", choices: shuf(ws), answer: ans,
        hints: [
          "ABC order means the order of the alphabet: A, B, C, D…",
          "Look at the first letter of each word. Which letter comes earliest in the alphabet?",
          "Example: \"cat\", \"apple\", \"dog\". A comes before C and D, so \"apple\" comes first."
        ]
      };
    };
  },
  abcSecond() {
    return () => {
      const ws = shuf(pick(ABC_FAM)).slice(0, 3), ans = [...ws].sort()[0];
      return {
        text: "Which word comes first in ABC order?", choices: ws, answer: ans,
        hints: [
          "These words start with the same letter, so look at the next letter.",
          "Compare the second letters. Which one comes earliest in the alphabet? If they match, look at the third letter.",
          "Example: \"bad\" comes before \"bed\", because a comes before e."
        ]
      };
    };
  },
  mixed(...makers) { return () => pick(makers)(); }
};

// ---------- teaching slides ----------
const STEACH = {
  alphaNext: dir => [
    { h: "The alphabet", v: "A B C D E F G H I J K L M<br>N O P Q R S T U V W X Y Z", t: "The alphabet has <b>26 letters</b> and they always go in the same order. You can sing the alphabet song to remember it." },
    dir === "after"
      ? { h: "Which letter comes after?", v: "C → <b>D</b>", t: "The letter <b>after</b> is the one that comes <b>next</b>. After C comes D." }
      : { h: "Which letter comes before?", v: "<b>C</b> ← D", t: "The letter <b>before</b> is the one that came <b>just earlier</b>. Before D comes C." },
    { h: "Sing it!", v: "🎵", t: "If you aren't sure, sing the alphabet song in your head and stop at the letter. You'll hear the answer coming!" }
  ],
  upperLower: () => [
    { h: "Capital and small letters", v: "A a &nbsp; B b &nbsp; C c", t: "Every letter has two forms: a <b>capital</b> (big) letter and a <b>small</b> letter. They're partners!" },
    { h: "When do we use capitals?", v: "Maya likes cats.", t: "Capital letters start a <b>sentence</b> and start <b>names</b>. Small letters are for everything else." },
    { h: "Look for partners", v: "D d &nbsp; G g &nbsp; Q q", t: "Some partners look alike (Oo, Ss) and some look different (Dd, Gg). Practice makes it easy!" }
  ],
  vowel: () => [
    { h: "Two kinds of letters", v: "<b>A E I O U</b> &nbsp; vs &nbsp; B C D F G…", t: "Letters are <b>vowels</b> or <b>consonants</b>. There are only 5 vowels: <b>A, E, I, O, U</b>." },
    { h: "Everything else", v: "B C D F G H J K L M N P Q R S T V W X Y Z", t: "All the other letters are <b>consonants</b>. Every word needs at least one vowel!" },
    { h: "A song to remember", v: "🎵 a-e-i-o-u", t: "Sing \"a, e, i, o, u\". If the letter is in the song, it's a vowel!" }
  ],
  beginSound: () => [
    { h: "First sounds", v: "🐶 dog → <b>d</b>-d-dog", t: "Every word starts with a sound. Say the word slowly and listen to the <b>very first sound</b>." },
    { h: "Match the sound to a letter", v: "☀️ sun → <b>s</b>-s-sun", t: "Each letter has a sound. The first sound of \"sun\" is \"sss\", and that's the letter <b>s</b>." },
    { h: "Tip", v: "🔊", t: "Press the 🔊 button to hear a word. Say it slowly, stretch the first sound, and pick the letter!" }
  ],
  endSound: () => [
    { h: "Last sounds", v: "🐱 cat → ca-<b>t</b>", t: "Words end with a sound too. Say the word slowly and listen to the <b>very last sound</b>." },
    { h: "Match the sound to a letter", v: "🐷 pig → pi-<b>g</b>", t: "The last sound of \"pig\" is \"g\", so it ends with the letter <b>g</b>." },
    { h: "Tip", v: "🔊", t: "Press the 🔊 button to hear a word. Say it again and stop at the end. What sound is last?" }
  ],
  rhyme: () => [
    { h: "What rhymes?", v: "cat · hat · bat", t: "Words <b>rhyme</b> when they end with the same sound. Cat, hat and bat all end in <b>-at</b>." },
    { h: "Rhymes can look different", v: "🐱 cat &nbsp; 🎩 hat &nbsp; 🦇 bat", t: "The beginning changes, but the <b>ending sound stays the same</b>. c-at, h-at, b-at." },
    { h: "Listen for the ending", v: "👂", t: "Say each word out loud. If the ending sounds the same, it's a rhyme!" }
  ],
  syllables: () => [
    { h: "Syllables are beats", v: "ap-ple &nbsp; 👏👏", t: "A <b>syllable</b> is one beat in a word. \"Apple\" has 2 beats: ap-ple." },
    { h: "Clap it out", v: "dog 👏 &nbsp; tiger 👏👏 &nbsp; banana 👏👏👏", t: "Clap once for each beat. Dog = 1 clap. Tiger = 2 claps. Banana = 3 claps." },
    { h: "The chin trick", v: "🧑", t: "Put your hand under your chin. Your chin drops once for every syllable when you say a word!" }
  ],
  spellType: () => [
    { h: "Sound it out", v: "🐶 → d - o - g", t: "To spell a word, say it <b>slowly</b> and listen to each sound. Write a letter for each sound you hear." },
    { h: "One sound at a time", v: "🐱 c - a - t → <b>cat</b>", t: "Cat has 3 sounds: c, a, t. Three sounds, three letters! Now put them together." },
    { h: "Check your work", v: "✅", t: "Read your word back. Does it sound like the word in the picture? Press 🔊 to hear it again." }
  ],
  missingVowel: () => [
    { h: "The middle sound", v: "c _ t", t: "Most short words have a consonant, then a vowel, then a consonant. The vowel is in the <b>middle</b>." },
    { h: "Try each vowel", v: "cat? cet? cit? cot? cut?", t: "Say the word with each vowel: a, e, i, o, u. Only one makes the word in the picture." },
    { h: "Use the picture", v: "🐱", t: "The picture tells you the word. Press 🔊 to hear it and listen to the middle sound." }
  ],
  missingFirst: () => [
    { h: "The first sound", v: "_ at", t: "Sometimes the first letter is hiding. Look at the picture and say the whole word." },
    { h: "Say it slowly", v: "🐱 → <b>c</b>-at", t: "Stretch out the first sound: \"c-c-cat\". That sound is the letter you need." },
    { h: "Tip", v: "🔊", t: "Press 🔊 to hear the word, then match the first sound to a letter." }
  ],
  countSounds: () => [
    { h: "Count the sounds", v: "dog → d · o · g = 3", t: "Say the word slowly and put up one finger for each sound. \"Dog\" has <b>3</b> sounds." },
    { h: "Letters vs. sounds", v: "ship → sh · i · p = 3", t: "Sometimes two letters make <b>one</b> sound. In \"ship\", the letters <b>s</b> and <b>h</b> work together to say \"sh\". So \"ship\" has 3 sounds, not 4." },
    { h: "Tip", v: "🖐️", t: "Use your fingers! Say the word slowly and count each sound you hear." }
  ],
  sightChoice: () => [
    { h: "Sight words", v: "the · said · was", t: "<b>Sight words</b> are words we see over and over. Many are tricky because they don't sound the way they look." },
    { h: "Look closely", v: "said ≠ sed", t: "\"Said\" sounds like \"sed\", but it's spelled s-a-i-d. You have to <b>remember</b> how the word looks." },
    { h: "Tip", v: "👀", t: "Look at the word, cover it, write it, then check. That helps your brain remember!" }
  ],
  cloze: () => [
    { h: "Fill in the blank", v: "The cat ___ on the mat.", t: "Read the whole sentence and think about which word fits the blank." },
    { h: "Use the clues", v: "sat 🐱", t: "Look at the other words in the sentence. They give you clues about what is missing." },
    { h: "Spell it carefully", v: "s - a - t", t: "Once you know the word, sound it out and spell it letter by letter." }
  ],
  pattern: key => {
    const cfg = PATTERNS[key], seen = [], exs = [];
    cfg.items.forEach(it => { if (!seen.includes(it.ans) && exs.length < 3) { seen.push(it.ans); exs.push(it); } });
    return [
      { h: cfg.name, v: exs.map(it => `${it.e} ${bold(it.word, it.ans)}`).join(" &nbsp; "), t: cfg.rule },
      { h: "Listen and look", v: "👂 👀", t: "Press 🔊 to hear the word. Say it slowly and listen to the sound where the letters are missing. Then try each choice in the blank and see which one looks right." },
      { h: "Words to remember", v: cfg.items.slice(0, 6).map(it => `${it.e} ${bold(it.word, it.ans)}`).join(" &nbsp; "), t: "These words follow the pattern. The more you see them, the easier they get!" }
    ];
  },
  silentE: () => [
    { h: "The magic e", v: "cap → cap<b>e</b>", t: "Add an <b>e</b> to the end of some words and a little magic happens: the vowel says its <b>own name</b>. \"Cap\" becomes \"cape\"." },
    { h: "More magic", v: "kit → kite &nbsp; hop → hope &nbsp; cub → cube", t: "The e is silent. You don't say it. It just changes the vowel in the middle." },
    { h: "Try it", v: "🪄", t: "Say the new word out loud and listen for the long vowel sound." }
  ],
  plural: kind => [
    { h: "More than one", v: "🐱 → 🐱🐱", t: "<b>Plural</b> means more than one. One cat, two <b>cats</b>." },
    kind === "es"
      ? { h: "Words that need -es", v: "box → box<b>es</b> &nbsp; bus → bus<b>es</b>", t: "Words that end in <b>s, x, sh</b> or <b>ch</b> need <b>-es</b>. Say \"boxs\" out loud. It's hard! \"Boxes\" is easier to say." }
      : { h: "Just add s", v: "dog → dog<b>s</b> &nbsp; hat → hat<b>s</b>", t: "For most words you just add <b>s</b> at the end. One dog, two dog<b>s</b>." },
    { h: "Tip", v: "✅", t: kind === "es" ? "Look at the last letters of the word. If it ends in s, x, sh or ch, add es." : "Add the s at the very end of the word. Don't change the rest of the word!" }
  ],
  compound: () => [
    { h: "Compound words", v: "rain + bow = <b>rainbow</b> 🌈", t: "A <b>compound word</b> is made when two small words stick together to make a new word." },
    { h: "Two words in one", v: "sun + flower = sunflower 🌻", t: "Each small word is a word by itself. Together they name a new thing. There's no space between them!" },
    { h: "Use the picture", v: "🖼️", t: "The picture shows the new word. Say the two small words quickly and you'll hear it." }
  ],
  suffix: kind => [
    kind === "ed"
      ? { h: "Past tense: -ed", v: "I walk → I walk<b>ed</b>", t: "To talk about something that <b>already happened</b>, we often add <b>-ed</b> to the end of the word." }
      : { h: "Happening now: -ing", v: "I jump → I am jump<b>ing</b>", t: "To talk about something that is <b>happening right now</b>, we add <b>-ing</b> to the end of the word." },
    { h: "Keep the word", v: kind === "ed" ? "play → play<b>ed</b>" : "play → play<b>ing</b>", t: "Write the whole word first. Then just add the ending right after it." },
    { h: "Look for clues", v: kind === "ed" ? "Yesterday…" : "Right now…", t: kind === "ed" ? "Words like \"yesterday\" tell you it's the past." : "Words like \"right now\" and \"I am\" tell you it's happening now." }
  ],
  contraction: () => [
    { h: "Contractions", v: "do not → <b>don't</b>", t: "A <b>contraction</b> squishes two words into one. An <b>apostrophe</b> (') shows where letters were left out." },
    { h: "Which letters go?", v: "is not → isn't &nbsp; I am → I'm", t: "In \"don't\", the <b>o</b> in \"not\" is replaced by the apostrophe. In \"I'm\", the <b>a</b> in \"am\" is replaced." },
    { h: "Tip", v: "✂️", t: "Join the words, then snip out the missing letters and put an apostrophe where they were." }
  ],
  opposites: () => [
    { h: "Opposites", v: "hot ↔ cold", t: "<b>Opposites</b> are words that mean things that are completely different. Hot and cold. Up and down." },
    { h: "Pairs to know", v: "big ↔ small &nbsp; day ↔ night &nbsp; open ↔ close", t: "Opposites come in pairs. Learning them helps you understand more words." },
    { h: "Tip", v: "💭", t: "Think of the word in your mind. What's the very opposite?" }
  ],
  synonyms: () => [
    { h: "Synonyms", v: "big = large", t: "<b>Synonyms</b> are different words that mean almost the same thing. Big and large. Happy and glad." },
    { h: "Swap test", v: "A big dog ↔ A large dog", t: "Put the new word in the sentence. If it still means the same thing, it's a synonym!" },
    { h: "Why it matters", v: "✨", t: "Synonyms help you make your writing more interesting. You don't have to say \"big\" every time!" }
  ],
  abcFirst: () => [
    { h: "ABC order", v: "A B C D E F G…", t: "<b>ABC order</b> means putting words in the order of the alphabet. A comes first, then B, then C…" },
    { h: "Look at the first letter", v: "<b>a</b>pple · <b>b</b>ird · <b>c</b>at", t: "Find the first letter of each word. The word whose letter comes <b>earliest</b> in the alphabet comes first." },
    { h: "Tip", v: "🎵", t: "Sing the alphabet song to remember which letter comes first!" }
  ],
  abcSecond: () => [
    { h: "Same first letter?", v: "<b>c</b>at · <b>c</b>ap · <b>c</b>ow", t: "When words start with the <b>same letter</b>, look at the <b>second letter</b> to put them in ABC order." },
    { h: "Compare the next letter", v: "c<b>a</b>p · c<b>o</b>w", t: "\"Cap\" has <b>a</b> and \"cow\" has <b>o</b>. A comes before O, so cap comes first." },
    { h: "Still tied?", v: "ca<b>n</b> · ca<b>p</b>", t: "If the first two letters match, look at the <b>third</b> letter. N comes before P, so \"can\" is first." }
  ]
};

// Attach the right teaching slides to every question maker.
for (const key of Object.keys(SQ)) {
  if (key === "mixed") continue;
  const orig = SQ[key];
  SQ[key] = (...args) => {
    const f = orig(...args);
    f.teach = () => STEACH[key](...args);
    return f;
  };
}
SQ.mixed = (...makers) => {
  const f = () => pick(makers)();
  f.teach = () => {
    const slides = [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here's a quick reminder of each idea, then the quiz." }];
    makers.forEach(m => { if (m.teach) slides.push(m.teach()[0]); });
    return slides;
  };
  return f;
};

// ---------- lessons ----------
const SL = (title, make) => ({ title, make });
const SPELL_LEVELS = {
  1: [ // Kindergarten, first half: letters and sounds
    SL("Which letter comes after?", SQ.alphaNext("after")), SL("Which letter comes before?", SQ.alphaNext("before")),
    SL("Big and small letters", SQ.upperLower()), SL("Vowels and consonants", SQ.vowel()),
    SL("Beginning sounds", SQ.beginSound(BEGIN_BANK.slice(0, 20))), SL("More beginning sounds", SQ.beginSound(BEGIN_BANK.slice(20))),
    SL("Ending sounds", SQ.endSound()), SL("Rhyming words", SQ.rhyme()),
    SL("Clap the syllables", SQ.syllables(2)), SL("Spell short-a words", SQ.spellType(CVC.a)),
    SL("Spell short-e words", SQ.spellType(CVC.e)), SL("Spell short-i words", SQ.spellType(CVC.i)),
    SL("Spell short-o words", SQ.spellType(CVC.o)), SL("Spell short-u words", SQ.spellType(CVC.u)),
    SL("Missing vowel", SQ.missingVowel()), SL("Missing first letter", SQ.missingFirst()),
    SL("Spell short words", SQ.spellType(CVC_ALL)), SL("Count the sounds", SQ.countSounds()),
    SL("Sounds review", SQ.mixed(SQ.beginSound(), SQ.endSound(), SQ.rhyme())), SL("Level 1 Challenge", SQ.mixed(SQ.spellType(CVC_ALL), SQ.missingVowel(), SQ.endSound(), SQ.rhyme(), SQ.vowel()))
  ],
  2: [ // Kindergarten, second half: blends, digraphs, sight words
    SL("Sight words 1", SQ.sightChoice(SIGHT_A)), SL("Sight words 2", SQ.sightChoice(SIGHT_B)),
    SL("Finish the sentence", SQ.cloze()), SL("L-blends", SQ.pattern("lblend")),
    SL("R-blends", SQ.pattern("rblend")), SL("S-blends", SQ.pattern("sblend")),
    SL("The sh sound", SQ.pattern("sh")), SL("The ch sound", SQ.pattern("ch")),
    SL("th and wh", SQ.pattern("thwh")), SL("Spell blend words", SQ.spellType(BLEND_WORDS)),
    SL("Spell sh and ch words", SQ.spellType(DIGRAPH_WORDS)), SL("Clap the syllables (to 3)", SQ.syllables(3)),
    SL("Rhyming words 2", SQ.rhyme()), SL("The magic e", SQ.silentE()),
    SL("Plurals with s", SQ.plural("s")), SL("Plurals with es", SQ.plural("es")),
    SL("ABC order", SQ.abcFirst()), SL("Compound words", SQ.compound()),
    SL("Mixed practice", SQ.mixed(SQ.pattern("lblend"), SQ.pattern("sh"), SQ.sightChoice(SIGHT_A), SQ.plural("s"))), SL("Level 2 Challenge", SQ.mixed(SQ.spellType(BLEND_WORDS), SQ.spellType(DIGRAPH_WORDS), SQ.silentE(), SQ.plural("es"), SQ.sightChoice(SIGHT_B), SQ.compound()))
  ],
  3: [ // 1st grade, first half: spelling patterns
    SL("Long a: ai or ay", SQ.pattern("aiay")), SL("Long e: ee or ea", SQ.pattern("eeea")),
    SL("Long i: igh, y or ie", SQ.pattern("igh")), SL("Long o: oa or ow", SQ.pattern("oaow")),
    SL("The oo sound", SQ.pattern("oo")), SL("ar and or", SQ.pattern("aror")),
    SL("er, ir and ur", SQ.pattern("erirur")), SL("ow and ou", SQ.pattern("owou")),
    SL("oy and oi", SQ.pattern("oyoi")), SL("sh, ch, th and wh", SQ.pattern("digraphs")),
    SL("Past tense: -ed", SQ.suffix("ed")), SL("Ending in -ing", SQ.suffix("ing")),
    SL("Contractions", SQ.contraction()), SL("Opposites", SQ.opposites()),
    SL("Words that mean the same", SQ.synonyms()), SL("ABC order (second letter)", SQ.abcSecond()),
    SL("Compound words 2", SQ.compound()), SL("Spell bigger words", SQ.spellType(BIG_WORDS)),
    SL("Mixed practice", SQ.mixed(SQ.pattern("aiay"), SQ.pattern("oaow"), SQ.suffix("ed"), SQ.opposites())), SL("Level 3 Challenge", SQ.mixed(SQ.spellType(BIG_WORDS), SQ.pattern("erirur"), SQ.pattern("oo"), SQ.contraction(), SQ.synonyms(), SQ.suffix("ing")))
  ]
};
