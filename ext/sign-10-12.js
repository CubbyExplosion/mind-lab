// ext/sign-10-12.js  Mind Lab Sign Language (ASL), levels 10-12 (60 lessons)
// Only things we are sure about: fingerspelling, number signs, ASL grammar ideas, Deaf culture, history and etiquette.
(() => {
  const S = (a, n) => shuf(a).slice(0, n);
  const UP = s => String(s).toUpperCase();
  const lead = s => String(s).replace(/<[^>]+>/g, "").replace(/^[^A-Za-z0-9]+/, "")[0].toUpperCase();
  const NUMW = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

  // pairs lesson: rows are "term::description::emoji"
  const PL = (title, v, intro, tip, rows, o = {}) => {
    const pairs = rows.map(r => { const [t, d, e] = r.split("::"); return { t, d, e }; });
    const make = () => {
      const cur = pick(pairs), rest = pairs.filter(x => x !== cur), ex = pick(rest);
      const exh = `Example: "${ex.t}" goes with "${ex.d}". Now do yours.`;
      if (Math.random() < 0.5) return {
        text: `${o.qd || "Which one matches?"}<br><b>${cur.d}</b>`, visual: cur.e, choices: shuf([cur.t, ...S(rest, 2).map(x => x.t)]), answer: cur.t,
        hints: ["Think back to the lesson. Which one fits this?", `The answer starts with "${lead(cur.t)}".`, exh]
      };
      return {
        text: `${o.qt || "What does this mean?"}<br><b>${cur.t}</b>`, visual: cur.e, choices: shuf([cur.d, ...S(rest, 2).map(x => x.d)]), answer: cur.d,
        hints: ["Think back to the lesson. What did you learn about this one?", `The right answer starts with "${lead(cur.d)}".`, exh]
      };
    };
    make.teach = () => [
      { h: title, v, t: intro },
      { h: "Remember these", v: pairs.slice(0, 8).map(p => `${p.e ? p.e + " " : ""}<b>${p.t}</b>: ${p.d}`).join("<br>"), t: "Read each one slowly. Try it with your own hands!" },
      { h: "Tip", v: "💡", t: tip }
    ];
    return { title, make };
  };
  // scenario lesson: rows are "question|right|wrong|wrong"
  const SC = (title, v, intro, clue, example, rows) => {
    const items = rows.map(r => r.split("|"));
    const make = () => {
      const [q, a, ...ws] = pick(items);
      return { text: q, visual: v, choices: shuf([a, ...S(ws, 2)]), answer: a, hints: ["Read every choice slowly and picture it.", clue, `Example: ${example} Now do yours.`] };
    };
    make.teach = () => [{ h: title, v, t: intro }, { h: "Think about it", v: "🤔", t: clue }, { h: "Example", v: "✨", t: example }];
    return { title, make };
  };
  const lvl = (n, ls, mixIdx) => {
    const ms = ls.map(l => l.make);
    const mix = (title, arr) => {
      const f = () => pick(arr)();
      const step = Math.max(1, Math.floor(arr.length / 4));
      f.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here is a quick reminder of some of them, then the quiz." }, ...arr.filter((_, i) => i % step === 0).slice(0, 4).map(m => m.teach()[0])];
      return { title, make: f };
    };
    return [...ls, mix("Mixed practice", mixIdx.map(i => ms[i])), mix(`Level ${n} Challenge`, ms)];
  };

  // ---------- makers ----------
  const readSpell = (title, words, note) => {
    const make = () => {
      const w = pick(words), ex = pick(["sun", "cat", "pig", "bus", "map"]);
      return {
        text: `A friend fingerspells these letters, one after another:<br><b>${UP(w).split("").join(" - ")}</b><br>What word is it?`, visual: "🔠", textInput: true, answer: w,
        hints: ["Say the letters quickly in your head and listen for the word.", `The word has ${w.length} letters and starts with "${UP(w[0])}".`, `Example: ${UP(ex).split("").join(" - ")} spells "${ex}". Now do yours.`]
      };
    };
    make.teach = () => [
      { h: title, v: "🔠", t: note },
      { h: "Worked example", v: "S - U - N", t: "S, then U, then N. Put them together and you get <b>sun</b>." },
      { h: "Tip", v: "💡", t: "Do not stare at each letter. Watch the shape and rhythm of the whole word, like reading a word on a page." }
    ];
    return { title, make };
  };
  const spellCount = (title, words, label, note) => {
    const make = () => {
      const w = pick(words), n = w.replace(/ /g, "").length, ex = pick(["rose", "sun", "tree", "moon"]);
      return {
        text: `You fingerspell ${label} <b>${w}</b>. How many handshapes do you make?`, visual: "✋", answer: n,
        hints: ["You make one handshape for each letter. A space is only a tiny pause.", "Count the letters one at a time. Do not count the space.", `Example: the word ${ex} has ${ex.length} letters, so you make ${ex.length} handshapes. Now do yours.`]
      };
    };
    make.teach = () => [
      { h: title, v: "🔤", t: note },
      { h: "Worked example", v: "R-O-S-E = 4", t: "The word <b>rose</b> has four letters, so you make four handshapes: R, O, S, E." },
      { h: "Tip", v: "✋", t: "Keep your hand near your shoulder, palm toward the person watching, and keep it smooth." }
    ];
    return { title, make };
  };
  const digitsText = d => d.map(x => NUMW[x]).join(" - ");
  const readDigits = (title, len, note) => {
    const make = () => {
      const n = typeof len === "number" ? len : ri(len[0], len[1]);
      const d = Array.from({ length: n }, () => ri(1, 9)), ans = d.join("");
      return {
        text: `A friend signs these number signs one after another:<br><b>${digitsText(d)}</b><br>Type the number you read.`, visual: "🔢", textInput: true, answer: ans,
        hints: ["Turn each number word into its digit, in the same order.", `The number has ${n} digits.`, "Example: two - five - eight is the number 258. Now do yours."]
      };
    };
    make.teach = () => [
      { h: title, v: "🔢", t: note },
      { h: "Worked example", v: "3 - 1 - 4", t: "Three, one, four makes <b>314</b>. The order matters!" },
      { h: "Tip", v: "💡", t: "Write each digit as soon as you see it, so you do not forget." }
    ];
    return { title, make };
  };
  const change = () => {
    const make = () => {
      const pay = pick([10, 10, 20]), p = pay === 10 ? ri(2, 9) : ri(6, 17);
      const exs = pay === 10 ? "a book costs 6 dollars and you give 10, so you get 4 dollars back" : "a toy costs 12 dollars and you give 20, so you get 8 dollars back";
      return {
        text: `A Deaf shop owner signs the price: <b>${p}</b> dollars. You give <b>${pay}</b> dollars. How many dollars of change do you get?`, visual: "💵", answer: pay - p,
        hints: ["Change is the money left over after you pay the price.", "Subtract the price from the money you give. You can count up from the price to the money you gave.", `Example: ${exs}. Now do yours.`]
      };
    };
    make.teach = () => [
      { h: "Numbers at a shop", v: "💵", t: "Prices are signed with number signs. Read the sign, then do the math to find your change." },
      { h: "Worked example", v: "10 - 7 = 3", t: "A snack costs 7 dollars. You give 10 dollars. Your change is <b>3</b> dollars." },
      { h: "Tip", v: "💡", t: "Count up from the price to what you paid: 7, 8, 9, 10 is 3 steps." }
    ];
    return { title: "Prices and change", make };
  };
  const missing = () => {
    const W = ["planet", "garden", "teacher", "friend", "sunshine", "rabbit", "circle", "pencil", "jungle", "castle", "orange", "window", "bridge", "yellow"];
    const make = () => {
      const w = pick(W), i = ri(1, w.length - 2), c = UP(w[i]);
      const shown = UP(w.slice(0, i) + "_" + w.slice(i + 1)).split("").join(" ");
      const wr = S("AEIOURSTLNMDPCBGH".split("").filter(x => x !== c), 2);
      return {
        text: `A friend fingerspells a word but one handshape is hidden:<br><b>${shown}</b><br>Which letter is missing?`, visual: "🔠", choices: shuf([c, ...wr]), answer: c,
        hints: ["Read the letters you can see and think about which word they could be.", `The word has ${w.length} letters. The hidden one is number ${i + 1}.`, "Example: T - I - _ - E - R is tiger, so the hidden letter is G. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Find the missing handshape", v: "🔠", t: "Sometimes you miss one letter of a fingerspelled word. Good readers still figure out the word from the other letters." },
      { h: "Worked example", v: "C - _ - O - U - D", t: "The word is <b>cloud</b>, so the missing letter is L." },
      { h: "Tip", v: "💡", t: "Think about what word makes sense. Then check each letter." }
    ];
    return { title: "The missing handshape", make };
  };
  const compare = (title, lo, hi, note) => {
    const make = () => {
      const set = new Set(); while (set.size < 3) set.add(ri(lo, hi));
      const arr = [...set], big = Math.random() < 0.5, ans = big ? Math.max(...arr) : Math.min(...arr);
      const hd = hi > 99 ? "hundreds digit" : "tens digit";
      return {
        text: `A friend signs three numbers: <b>${arr.join(", ")}</b>. Which one is the <b>${big ? "biggest" : "smallest"}</b>?`, visual: "🔢", choices: shuf(arr), answer: ans,
        hints: ["Compare the numbers by looking at the digits, starting from the left.", `Start with the ${hd}. If two match, look at the next digit.`, `Example: of 27, 31 and 19 the ${big ? "biggest" : "smallest"} is ${big ? 31 : 19}. Now do yours.`]
      };
    };
    make.teach = () => [
      { h: title, v: "🔢", t: note },
      { h: "Worked example", v: "42, 38, 45", t: "The tens digits are 4, 3 and 4. The 3 is smallest, so <b>38</b> is the smallest. For the biggest, compare 42 and 45 by the ones: <b>45</b>." },
      { h: "Tip", v: "💡", t: "Always start with the biggest place value, on the left." }
    ];
    return { title, make };
  };
  const manyHands = () => {
    const make = () => {
      const n = ri(3, 9), two = Math.random() < 0.5;
      return {
        text: two ? `<b>${n}</b> students each hold up <b>both hands</b> with all five fingers open. How many fingers are up in all?` : `<b>${n}</b> students each hold up <b>one hand</b> with all five fingers open. How many fingers are up in all?`,
        visual: "🖐️", answer: n * (two ? 10 : 5),
        hints: [two ? "Each student shows 10 fingers." : "Each student shows 5 fingers.", two ? "Count by tens, once for each student." : "Count by fives, once for each student.", two ? "Example: 4 students with both hands up show 10, 20, 30, 40 fingers. Now do yours." : "Example: 4 students with one hand up show 5, 10, 15, 20 fingers. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Fingers on many hands", v: "🖐️🖐️", t: "Five open fingers is the number sign for 5. Lots of hands make a good counting game." },
      { h: "Worked example", v: "3 x 5 = 15", t: "Three students with one open hand each show 5, 10, 15 fingers. That is <b>15</b>." },
      { h: "Tip", v: "💡", t: "Count by fives for one hand and by tens for two hands." }
    ];
    return { title: "Fingers on many hands", make };
  };
  const addSigned = () => {
    const make = () => {
      const a = ri(11, 49), b = ri(11, 49);
      const sa = String(a).split("").map(Number), sb = String(b).split("").map(Number);
      return {
        text: `A friend signs <b>${digitsText(sa)}</b> and then <b>${digitsText(sb)}</b>. What is the sum of the two numbers?`, visual: "➕", answer: a + b,
        hints: ["First turn each pair of number signs into a two-digit number.", "Add the tens first, then add the ones, then put them together.", "Example: three - one and one - two means 31 + 12 = 43. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Read, then add", v: "➕", t: "Signers show two-digit numbers one digit at a time. First read the numbers, then do the math." },
      { h: "Worked example", v: "2-4 + 1-5", t: "Two - four is 24 and one - five is 15. 24 + 15 = <b>39</b>." },
      { h: "Tip", v: "💡", t: "Add tens and ones separately: 20 + 10 and 4 + 5." }
    ];
    return { title: "Read, then add", make };
  };
  const backwards = () => {
    const W = ["river", "plant", "stone", "bread", "light", "tiger", "happy", "music", "table", "chair", "house", "green", "water", "smile"];
    const make = () => {
      const w = pick(W), r = w.split("").reverse().join("");
      return {
        text: `A friend fingerspells a word <b>backwards</b>:<br><b>${UP(r).split("").join(" - ")}</b><br>What is the real word?`, visual: "🔄", textInput: true, answer: w,
        hints: ["Read the letters from the last one back to the first one.", `The real word has ${w.length} letters and ends with "${UP(r[0])}".`, "Example: N - U - S backwards is S - U - N, which spells \"sun\". Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Spelling backwards", v: "🔄", t: "A fun way to build skill is to read a fingerspelled word from the end to the start. It trains your eyes to catch every letter." },
      { h: "Worked example", v: "T - A - C", t: "Backwards, T - A - C becomes C - A - T. The word is <b>cat</b>." },
      { h: "Tip", v: "💡", t: "Write the letters down, then read them from right to left." }
    ];
    return { title: "Backwards spelling", make };
  };

  // ---------- known signs, for review lessons ----------
  const D = {
    hello: "hello::Flat hand at your forehead, then move it out and away::👋", goodbye: "goodbye::Open hand waves::✋", yes: "yes::Fist nods up and down like a head::✊",
    no: "no::Pointer and middle finger tap your thumb, like a beak closing::🤏", please: "please::Flat hand rubs a circle on your chest::🙏",
    thanks: "thank you::Flat fingertips touch your chin, then move forward::😊", sorry: "sorry::Fist rubs a circle on your chest::😔",
    help: "help::Fist with thumb up sits on a flat palm, and both lift up::🆘", eat: "eat::Pinched fingertips tap your mouth::🍽️",
    drink: "drink::Hand shaped like it holds a cup tips toward your mouth::🥤", water: "water::Three fingers (a W) tap your chin::💧",
    more: "more::Both hands pinch fingertips together and tap::➕", mom: "mom::Open hand, thumb taps your chin::👩", dad: "dad::Open hand, thumb taps your forehead::👨",
    baby: "baby::Rock your arms like you hold a baby::👶", friend: "friend::Hook your pointer fingers together, then switch::🤝", stop: "stop::One flat hand chops down onto the other palm::🛑",
    see: "see::Two-finger V starts at your eyes and moves out::👀", book: "book::Palms together, then open like a book::📖", school: "school::Clap your hands two times::🏫",
    play: "play::Both hands make Y shapes and shake::🎮", cat: "cat::Pinch fingers at your cheek and pull out like whiskers::🐱", dog: "dog::Pat your leg and snap your fingers::🐶",
    good: "good::Flat hand moves from your chin down into your other hand::👍", happy: "happy::Flat hands brush up your chest again and again::😊",
    sad: "sad::Open hands in front of your face move down::😢", love: "love::Cross your fists over your heart::❤️",
    red: "red::Pointer finger brushes down over your lips::🔴", blue: "blue::A B hand (flat, fingers up) shakes::🔵", green: "green::A G hand (pointer and thumb sideways) shakes::🟢",
    yellow: "yellow::A Y hand (thumb and pinky out) shakes::🟡", black: "black::Pointer finger draws across your forehead::⚫", white: "white::Open hand on your chest pulls away and closes to a pinch::⚪",
    bird: "bird::Pointer finger and thumb open and close near your mouth like a beak::🐦", fish: "fish::Flat hand wiggles forward like a fish swimming::🐟",
    apple: "apple::Knuckle of a bent pointer finger twists on your cheek::🍎", banana: "banana::One pointer finger stands up and the other hand peels it::🍌",
    orange: "orange::Fist squeezes open and closed at your mouth, like squeezing an orange::🍊", milk: "milk::Fist squeezes open and closed, like milking::🥛",
    family: "family::Two F hands start together and circle around to touch at the sides::👨‍👩‍👧", girl: "girl::Thumb of an A hand slides down your cheek::👧",
    boy: "boy::Hand at your forehead opens and closes like the brim of a cap::👦", home: "home::Pinched fingertips touch near your mouth, then your cheek::🏠",
    deaf: "Deaf::Pointer finger touches near your ear, then near your mouth::🧏", hearing: "hearing::Pointer finger circles in front of your mouth::👂",
    sign: "sign::Both pointer fingers circle toward each other, one up and one down::🤟", learn: "learn::Flat hand picks up from your other palm and moves to your forehead::🎓",
    tomorrow: "tomorrow::Thumb of an A hand on your cheek moves forward::➡️", yesterday: "yesterday::Thumb of an A hand on your cheek moves back toward your ear::⬅️",
    time: "time::Pointer finger taps the back of your wrist, like a watch::⌚", again: "again::A bent hand flips over and taps into your other palm::🔁",
    jump: "jump::Two fingers (a V) stand on your other palm and hop up::🦘", drive: "drive::Both hands hold a steering wheel and turn it::🚗",
    work: "work::Two fists tap, one wrist on top of the other::💼", want: "want::Both hands, fingers curled like claws, pull toward you::🤲",
    what: "what::Both flat hands face up and shake a little::❓", where: "where::Pointer finger up wags side to side::🗺️", go: "go::Pointer fingers point up, then swing forward and out::🚶",
    wait: "wait::Both hands face up and the fingers wiggle::⏳", need: "need::A bent pointer finger (an X hand) bobs down and forward::📌",
    rain: "rain::Open hands wiggle their fingers and move down like falling drops::🌧️", snow: "snow::Open hands flutter down slowly like snowflakes::❄️",
    hot: "hot::A claw hand at your mouth turns quickly away and down::🔥", cold: "cold::Fists shake, like shivering::🥶", read: "read::V fingers move down your other flat palm, like eyes reading::📖",
    write: "write::Pinched fingers write across your other palm::✏️", teach: "teach::Both hands start near your temples and move forward::🧑‍🏫", know: "know::Fingertips tap your forehead::💡",
    airplane: "airplane::A hand with thumb, pointer finger and pinky out flies forward::✈️", bike: "bike::Two fists circle, like feet pedaling::🚲",
    tree: "tree::One elbow rests on your other hand and the upright hand shakes with fingers spread::🌳", house: "house::Flat hands make a roof shape, then move down like walls::🏡",
    understand: "understand::A fist near your forehead, then the pointer finger flicks up::💭", think: "think::Pointer finger touches your forehead::🤔"
  };
  const g = (...ks) => ks.map(k => D[k]);
  const QD = { qd: "Which word is this sign?", qt: "How do you sign this word?" };

  // ================= LEVEL 10 =================
  const L10 = [
    readSpell("Read big words", ["elephant", "birthday", "mountain", "sandwich", "painting", "friendly", "football", "weekend", "notebook", "squirrel", "festival", "rainbow"], "Longer words need a steady eye. Watch the whole word, not each letter alone."),
    spellCount("Spell the months", ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], "the month", "Many months are fingerspelled. Some people shorten the long ones, but the full spelling is a great way to practice counting handshapes."),
    SC("Days of the week", "📅", "Many day signs make a small circle. The handshape is the first letter of the English word: M for Monday, T for Tuesday, W for Wednesday, F for Friday and S for Saturday.", "Think of the first letter of the day, then add a small circle with that handshape.", "Monday starts with M, so the sign uses an M hand that makes a small circle.", [
      "The sign for Tuesday uses which letter?|T|M|S", "The sign for Wednesday uses which letter?|W|V|Y", "The sign for Friday uses which letter?|F|P|T", "The sign for Saturday uses which letter?|S|C|T",
      "Day signs make the letter move in a small...|Circle|Square|Zigzag", "Why do day signs use letters?|They match the first letter of the English word|They are chosen at random|They come from songs",
      "Which day sign uses a W hand?|Wednesday|Saturday|Friday", "Which day sign uses an F hand?|Friday|Tuesday|Saturday"
    ]),
    SC("Initialized signs", "🔤", "An initialized sign uses the first letter of an English word as its handshape. For example, the sign for family uses F hands, the sign for class uses C hands and the sign for group uses G hands.", "Look for a handshape that matches the first letter of the English word.", "The sign for team uses T hands that circle. T is the first letter of team.", [
      "The sign for family uses which handshape?|F|A|L", "The sign for class uses which handshape?|C|K|O", "The sign for group uses which handshape?|G|D|Y",
      "An initialized sign uses...|The first letter of the English word|A random number|Only the face", "Which sign uses G hands?|Group|Family|Class", "Which sign uses C hands?|Class|Group|Family",
      "Why are initialized signs handy?|The letter helps you remember the sign|They need no hands|They are always silent"
    ]),
    SC("Martha's Vineyard", "🏝️", "Martha's Vineyard is an island in Massachusetts. In the 1800s many people there were Deaf, and both Deaf and hearing neighbors signed. Signs from the island later blended into the sign language Deaf Americans use today.", "Think about a whole community sharing one language so everyone can join in.", "A shopkeeper on the island could sign with every customer, Deaf or hearing.", [
      "Martha's Vineyard is...|An island in Massachusetts|A city in Spain|A kind of ice cream", "In the 1800s, who signed on the island?|Deaf and hearing neighbors|Only visitors|Nobody",
      "Island signs later helped shape...|American Sign Language|Spanish|Morse code", "Why did hearing people there sign?|Their Deaf neighbors and family used it|They were paid to|They had no voices at all",
      "This story shows that a community can...|Share a language so everyone is included|Hide its languages|Stop talking", "Martha's Vineyard is in which US state?|Massachusetts|Texas|Oregon"
    ]),
    SC("A new language is born", "🌱", "In Nicaragua in the late 1970s and 1980s, Deaf children came together at new schools. They had no shared language, so they built one together. Each new group of children made it richer. Today it is called Nicaraguan Sign Language.", "Think about what happens when many people need to talk to each other.", "Kids at a new school invent signs for the games they play together.", [
      "Where did a new sign language grow in the 1980s?|Nicaragua|Antarctica|Iceland", "How did it begin?|Deaf children met at school and built it together|A book taught it|A machine invented it",
      "Each new group of children...|Added to the language|Forgot it|Used only English", "What does this show about Deaf children?|They create language when they have a community|They cannot learn language|They need no friends",
      "Before the schools, many Deaf children there used...|Their own home gestures|A huge dictionary|ASL", "What is the language called?|Nicaraguan Sign Language|Island Speech|Spanish Morse",
      "New languages grow when people...|Come together and communicate|Stay alone|Sleep all day"
    ]),
    SC("A teacher in Paris", "🇫🇷", "In the 1700s a teacher in Paris, France, named Charles-Michel de l'Epee started one of the first schools for Deaf children. He learned from the signs the children already used. People remember him as an early friend of sign language.", "Think about a teacher who learned from his students.", "A teacher watches how children sign and learns their words.", [
      "In the 1700s, where did l'Epee start his school?|Paris, France|London, England|Boston, USA", "What did he learn from the Deaf children?|Their signs|Their songs|Their recipes",
      "Why do people remember him?|He started one of the first schools for Deaf children|He invented the telephone|He sailed a ship", "Which century are the 1700s?|The 18th century|The 20th century|The 15th century",
      "Why did the school use signs?|Signs are a natural way for Deaf children to learn|Signs were a secret|Signs make loud noises", "France is a country in...|Europe|South America|Africa"
    ]),
    SC("How hearing works", "👂", "Sound is a wave of vibrations. It goes into your ear and shakes your eardrum. Tiny bones pass the shakes to the cochlea, a snail-shaped part. A nerve then sends the message to your brain.", "Follow the sound from the outside of the ear to the brain.", "A drum shakes when you hit it. Your eardrum shakes in the same way when sound reaches it.", [
      "Sound travels as...|Vibrations|Colors|Smells", "What thin, tight skin shakes inside the ear?|The eardrum|The earring|The elbow", "The snail-shaped part of the inner ear is the...|Cochlea|Cornea|Knuckle",
      "What carries the message to the brain?|A nerve|A shoelace|A pencil", "Where does sound go first?|Into the ear canal|Into the stomach|Into the shoe", "Where is the message understood?|In the brain|In the elbow|In the knee",
      "Deaf people can still feel some sounds as...|Vibrations|Smells|Rainbows"
    ]),
    SC("Protect your ears", "🎧", "Very loud sounds can harm your hearing, and the harm can last forever. Wear earplugs or ear muffs near loud noise, keep headphone volume low, and give your ears quiet breaks.", "Think about how to make a loud place safer for your ears.", "At a noisy parade, you can wear ear muffs and stand a little farther from the speakers.", [
      "A loud concert is coming. What protects your ears?|Earplugs or ear muffs|Sunglasses|A scarf", "Headphone volume should be...|Low or medium|As loud as possible|Louder each day",
      "Very loud noise can...|Harm hearing|Make ears grow|Make you taller", "Your ears need...|Quiet breaks|Non-stop noise|Cotton swabs pushed deep", "Which is NOT safe for your ears?|Poking a pencil into them|Wearing ear muffs near machines|Taking a quiet break",
      "If a sound is too loud, you can...|Move away or cover your ears|Move closer|Cheer louder", "Why take care of your ears?|You use them your whole life|They are only decorations|They glow in the dark"
    ]),
    SC("Hearing dogs", "🐕‍🦺", "A hearing dog is trained to notice sounds for a Deaf person, like a doorbell or a smoke alarm. The dog touches its person with a paw to say, 'come and see'.", "Working dogs have an important job, so we do not distract them.", "You see a dog in a special vest, so you smile and leave it alone.", [
      "What does a hearing dog do?|Tells its person about sounds|Reads books|Drives a car", "A hearing dog may alert its person to a...|Doorbell|Rainbow|Sandwich", "How might the dog say 'come and see'?|It touches its person with a paw|It sings|It writes a note",
      "A working dog wears a vest. You should...|Not pet or call it|Offer it snacks|Pull its tail", "Why must you not distract a working dog?|It needs to focus so its person stays safe|It is sleepy|It is shy of colors", "Which sound could a hearing dog warn about?|A smoke alarm|Silence|A shadow"
    ]),
    readDigits("Zip codes", 5, "A zip code has five digits. If a friend signs the digits one by one, you read each number sign and write the digits in order."),
    change(),
    SC("Taking turns", "🗣️", "In a group, signers take turns, one person at a time, just like speakers. Wait until the signer finishes. Look at whoever is signing, and wave a hand or wait for a pause to join in.", "Think about how everyone gets a fair chance to be seen and understood.", "You wave a hand gently, wait for a pause, and then start to sign.", [
      "Two friends sign at once. This is hard to follow because...|You can watch only one signer at a time|They are too quiet|They have the wrong hands", "How can you join a group chat politely?|Wave a hand or wait for a pause|Block someone's hands|Stamp your feet loudly",
      "While a friend signs, you should...|Watch them|Look at your phone|Talk to someone else", "Taking turns means...|One person signs at a time|Everyone signs at once|Nobody signs", "Looking at the signer shows that you are...|Listening|Bored|Leaving",
      "You missed the end of a sentence. You can...|Politely ask to see it again|Pretend you understood|Walk away"
    ]),
    SC("Ask before filming", "📹", "A video of someone signing shows their words and their face. Ask before you film a person, and ask again before you show the video to anyone. If the answer is no, respect it.", "Think about how you would want others to treat your own video.", "You say, 'May I film you? You can say no,' and you wait for the answer.", [
      "You want to film your friend signing. First you...|Ask for permission|Hide the camera|Film and ask later", "Can you share a friend's video without asking?|No, ask first|Yes, always|Yes, if it is funny",
      "A signer says no to filming. You...|Respect that|Film anyway|Argue", "Why does asking matter?|It respects the person|It wastes time|It helps the camera work", "A video of someone's face and signing is...|Part of their private life|Free for anyone|A public rule",
      "Which is a good way to ask?|May I film you? You can say no.|Smile, I am filming.|Too late, it is done."
    ]),
    SC("Ask and answer yourself", "❓", "In ASL a signer may ask a question and then answer it right away. This is called a rhetorical question. The eyebrows go up for the question. It helps point out an important idea.", "Think: the signer asks the question and gives the answer too.", "A signer asks, 'Why do I like Fridays?' and then answers, 'No school tomorrow!'", [
      "A signer asks a question and answers it. This is called a...|Rhetorical question|Quiz show|Secret code", "Rhetorical questions help to...|Point out an important idea|Confuse the watcher|End the talk",
      "Does the signer wait for you to answer?|No, they answer it themselves|Yes, for ten minutes|Yes, with a drum roll", "Which face goes with a rhetorical question?|Raised eyebrows|Closed eyes|A wrinkled nose",
      "Which is a rhetorical question?|Why do I love ASL? It is beautiful!|Please pass the salt.|It is raining.", "Rhetorical questions are part of ASL...|Grammar|Math|Weather"
    ]),
    SC("Kids of Deaf adults", "👨‍👧", "A CODA is a hearing Child Of Deaf Adults. Many CODAs grow up with ASL as a first language and are part of both Deaf culture and hearing culture. Some become interpreters. A KODA is a Kid Of Deaf Adults.", "Think about a child who grows up using two worlds of language.", "A CODA signs with her parents at dinner and speaks with her friends at school.", [
      "CODA stands for...|Child Of Deaf Adults|Cat Over Dog Area|Class Of Deaf Artists", "A CODA is usually...|Hearing|A robot|A cartoon", "Many CODAs grow up using...|ASL at home|No language|Only Morse code",
      "Some CODAs become...|Interpreters|Mountains|Clocks", "Growing up with two cultures means knowing...|Deaf and hearing ways|Only one way|No ways", "KODA means...|Kid Of Deaf Adults|King Of Dancing Ants|Keys Of Deaf Alphabets",
      "Most Deaf children are born to parents who are...|Hearing|Deaf|Dogs"
    ]),
    missing(),
    PL("Sign detective 6", "🕵️", "Time to match signs to their words. Think about each description.", "Picture the sign in your hands before you choose.", g("hello", "goodbye", "yes", "no", "please", "thanks", "sorry", "help", "eat", "drink", "water", "more", "mom", "dad", "baby", "friend", "stop", "see", "book", "school", "play", "cat", "dog", "good"), QD)
  ];

  // ================= LEVEL 11 =================
  const L11 = [
    readSpell("Read tricky words", ["adventure", "knowledge", "different", "beautiful", "language", "chocolate", "important", "telephone", "wonderful", "dinosaur", "calendar", "umbrella"], "Longer words can have double letters and tricky patterns. Keep your eyes soft and watch the rhythm."),
    spellCount("Count state names", ["Alabama", "Arizona", "California", "Colorado", "Florida", "Illinois", "Kentucky", "Louisiana", "Minnesota", "Mississippi", "Montana", "Oklahoma", "Pennsylvania", "Tennessee", "Wisconsin"], "the state", "Many Deaf people fingerspell the names of places. Some state names have signs, but spelling works for every one."),
    SC("International Day of Sign Languages", "🌍", "Each year on September 23, the United Nations celebrates the International Day of Sign Languages. It reminds the world that sign languages are real languages and that Deaf people have the right to use them.", "Think about a day that helps everyone learn about sign languages.", "A school invites a Deaf guest to teach everyone a few signs.", [
      "Which group celebrates the International Day of Sign Languages?|The United Nations|A toy store|A space agency", "In which month is it celebrated?|September|March|July", "The day reminds us that sign languages are...|Real languages|Only games|Only gestures",
      "Who can take part in the celebration?|Everyone|Only kings|Only dogs", "A good way to celebrate is to...|Learn signs and respect Deaf people|Ignore it|Cover your eyes", "The day happens...|Once a year|Every minute|Never"
    ]),
    SC("Other fingerspelling alphabets", "🇬🇧", "Different sign languages have different fingerspelling alphabets. ASL fingerspells with one hand. British Sign Language fingerspells with two hands, touching points on the other hand to show letters.", "Think about how many hands each alphabet uses.", "A friend from another country fingerspells her name with two hands, and you ask her to show you how.", [
      "ASL fingerspells with...|One hand|Two feet|Your elbow", "British Sign Language fingerspells with...|Two hands|One finger only|The face only", "Do all countries use the same fingerspelling alphabet?|No, they can be different|Yes, exactly the same|They do not fingerspell",
      "A fingerspelling alphabet is matched to the...|Written alphabet of the language|Colors of the rainbow|Number of friends", "In the British alphabet the hands...|Touch each other to make letters|Never touch|Hide behind the back", "If you meet a signer from another country, you can...|Ask them to show you their alphabet|Tell them they are wrong|Walk away"
    ]),
    SC("International Sign", "🧭", "When Deaf people from many countries meet at big events, they often use International Sign. It uses simple signs, gestures and expressions that many people can follow. It is simpler than a full sign language like ASL.", "Think about how people who share no language find a way to talk.", "At a world sports event, Deaf visitors from different lands use International Sign to chat.", [
      "International Sign is used when Deaf people from...|Many countries meet|One house meets|The moon meets", "International Sign uses simple signs and...|Gestures and expressions|Only music|Only numbers",
      "Compared with ASL, International Sign is...|Simpler|Much harder|Exactly the same", "Where might you see it?|At a big international event|In a bakery only|Nowhere", "It helps people who do not share a...|Sign language|Raincoat|Pencil", "Good users of International Sign are also...|Clear and patient|Fast and silent|Angry"
    ]),
    SC("Cued speech is different", "🤲", "Cued speech uses hand shapes near the mouth to help show the sounds of a spoken language. It is not a sign language. ASL has its own words and grammar, while cued speech helps people see the sounds of speech.", "Think about whether the hands show words or only help show sounds.", "A teacher puts a hand near her mouth to cue the sounds in a spoken word.", [
      "Cued speech uses hand shapes near the...|Mouth|Knee|Elbow", "Cued speech helps people see the...|Sounds of speech|Colors of paint|Beats of a drum", "Is cued speech a sign language?|No|Yes, exactly|It is a type of cooking",
      "ASL has its own...|Words and grammar|Recipes|Spelling tests only", "Which is a full language of its own?|ASL|A handshake|A wave", "Cued speech and ASL are...|Different things|The same thing|Both cartoons"
    ]),
    SC("Writing signs", "✍️", "Most signing is shared face to face or on video, but people have made ways to write sign languages. SignWriting uses small pictures of handshapes, movements and faces to record signs on paper.", "Think about drawing a sign instead of saying it.", "A teacher draws the handshape and the movement of a sign on a page so students can study it.", [
      "SignWriting uses small...|Pictures of handshapes and movements|Musical notes|Weather maps", "Why would anyone write a sign?|To study and remember it|To hide it|To make it louder", "Is SignWriting the same as English spelling?|No, it records signs|Yes, exactly|It is a math test",
      "Most signing is shared...|Face to face or on video|Only by mail|Only by whispering", "SignWriting can record the...|Face, hands and movement|Only the voice|Only smells", "Besides SignWriting, a teacher may use words called...|Glosses|Echoes|Shadows"
    ]),
    SC("Deaf theater", "🎭", "Deaf theater companies tell stories in sign language. Hearing audience members may see an interpreter or hear a voice actor. Good lighting is important so everyone can see the actors' hands and faces.", "Think about what the audience needs to see the story.", "A stage has bright lights on the actors' faces so the audience can follow every sign.", [
      "In Deaf theater, actors may tell stories in...|Sign language|Only whispers|Only mime tricks", "Why is lighting important?|People need to see hands and faces|The actors are sleepy|The seats are cold", "A hearing audience may follow with help from an...|Interpreter|Umpire|Echo",
      "Who can enjoy Deaf theater?|Everyone|Only actors|Only cats", "Actors' faces matter because...|Faces show feelings and grammar|Faces make sounds|Faces are costumes only", "Stories in sign language can be...|Funny, sad or exciting|Only silent|Only numbers"
    ]),
    SC("Andrew Foster", "🏫", "Andrew Foster was a Deaf American teacher who studied at Gallaudet University. Later he helped start many schools for Deaf children in Africa. He is remembered for bringing education to Deaf children.", "Think about how a school helps children learn and share language.", "A Deaf teacher builds a school so Deaf kids in his region can learn together.", [
      "Andrew Foster helped start...|Schools for Deaf children in Africa|Chocolate factories|Rocket ships", "He studied at...|Gallaudet University|A circus|A kitchen", "Why are schools important for Deaf children?|They can learn and share language|They can sleep|They can avoid friends",
      "Africa is a...|Continent|Planet|Single house", "Andrew Foster was a...|Teacher|Pirate|Dancer", "He is remembered for spreading...|Deaf education|Fast food|Loud music"
    ]),
    SC("A baseball star", "⚾", "William Hoy was a Deaf baseball player who played in the major leagues more than 100 years ago. He showed that Deaf people can excel at sports. He was a fast runner and a skilled outfielder.", "Think about how someone proves what they can do.", "A Deaf runner steals a base in a big game and the crowd cheers.", [
      "William Hoy played...|Baseball|Hockey|Chess", "He was...|Deaf|A robot|An astronaut", "He played more than...|100 years ago|10 minutes ago|Next year", "He showed that Deaf people can...|Excel at sports|Not play games|Not run", "In baseball an outfielder...|Catches balls far from the batter|Cooks the snacks|Sells tickets", "Fans of a Deaf athlete can cheer by...|Waving hands high|Staying silent|Leaving early"
    ]),
    SC("Interpreting is hard work", "🧑‍🤝‍🧑", "Interpreting takes a lot of focus. At long events, interpreters often work in teams and take turns, so they stay sharp and accurate. They also use breaks to rest their hands and minds.", "Think about why switching helps when a job needs a lot of focus.", "Two interpreters swap after a short time, and the partner watches to help with names.", [
      "At a long event, interpreters often...|Work in teams and take turns|Never rest|Leave quickly", "Why do interpreters take turns?|To stay focused and accurate|To play cards|To hide", "A partner interpreter can help by...|Watching and helping with details|Talking over the speaker|Leaving", "Interpreting needs a lot of...|Focus|Sleep|Snacks", "Resting hands and minds helps interpreters...|Stay accurate|Skip lunch|Add noise", "Teams of interpreters help make sure...|Messages stay clear|Everyone is quiet|Seats are empty"
    ]),
    SC("Deaf clubs and schools", "🏛️", "Deaf clubs, Deaf schools and Deaf events are places where Deaf people meet, sign freely and share their culture. Many people make lifelong friends there. Children can learn language from other signers.", "Think about a place where everyone shares your language.", "At a Deaf club night, friends tell stories and laugh in sign language.", [
      "Deaf clubs are places where Deaf people...|Meet and share culture|Hide|Wait alone", "At a Deaf school, children can learn language from...|Teachers and other signers|Only machines|No one", "Why do Deaf events matter?|People can sign freely and make friends|They are for sleeping|Nobody comes",
      "Many people make lifelong...|Friends|Cheese|Bridges", "A Deaf club night may include...|Stories and games|Silent walls|Closed doors", "Sharing a language with a group helps people feel...|Included|Lost|Hidden"
    ]),
    SC("Speech-to-text apps", "📱", "Some apps turn speech into written words. They can help, but they are not perfect. They can make mistakes with names, noisy rooms or fast talkers. A Deaf person may still prefer an interpreter or captions checked by a person.", "Think about when a tool is helpful and when it can make mistakes.", "An app mixes up a name in a noisy room, so the Deaf person asks for a person to check.", [
      "A speech-to-text app turns speech into...|Written words|Music|Pictures", "Are these apps always perfect?|No, they make mistakes|Yes, always|They never run", "When might an app have trouble?|In a noisy room|In a silent room|When it is turned off",
      "A Deaf person may prefer...|An interpreter or checked captions|Nothing|A loud speaker", "Names can be hard for an app because...|They may sound unusual|They are too short|They are in color", "If an app makes a mistake, you can...|Repeat or write it down|Get upset|Shout"
    ]),
    SC("Mouth shapes while signing", "😮", "Signers often move their mouths while they sign. Some mouth shapes add details, like how big, how fast or how hard something is. Some are mouth movements that follow English words. These mouth shapes are part of the message in ASL.", "Think about the face and mouth as part of the sign.", "A signer puffs their cheeks to show something is very big.", [
      "Mouth shapes while signing can add...|Details like size|Only noise|Nothing at all", "Signers use their mouths as...|Part of the message|A decoration|A whistle", "Which can mouth shapes show?|How big or how fast something is|The weather on Mars|Your shoe size",
      "Watching only the hands would...|Miss part of the message|Be enough|Be easier", "Signers look mostly at the other person's...|Face|Shoes|Knees", "A signer's face is part of the...|Grammar|Pencil case|Backpack"
    ]),
    SC("Signing and the brain", "🧠", "Research shows that when people sign, they use language areas of the brain, much like when others speak. Sign languages are full languages. Babies who see sign language can learn it just like hearing babies learn speech.", "Think about the brain treating signing as language.", "A Deaf baby watches her parents sign and starts to sign back.", [
      "When people sign, they use the brain's...|Language areas|Toenails|Sneezes", "Signing is processed like...|A language|A wave|A sneeze", "Babies who see sign language can...|Learn it naturally|Never learn it|Learn it only from books",
      "Sign languages are...|Full languages|Pretend games|Secret codes", "Where do ideas and language live?|In the brain|In the elbow|In the shoe", "A Deaf baby with signing parents can learn...|ASL as a first language|Nothing|Only English"
    ]),
    compare("Compare signed numbers", 100, 999, "Three-digit numbers are signed one digit at a time. To compare them, start with the biggest place value, the hundreds."),
    manyHands(),
    PL("Sign detective 7", "🕵️", "Time to match more signs to their words.", "Picture the sign in your hands before you choose.", g("red", "blue", "green", "yellow", "black", "white", "bird", "fish", "apple", "banana", "orange", "milk", "family", "girl", "boy", "home", "deaf", "hearing", "sign", "learn", "tomorrow", "yesterday", "time", "again"), QD)
  ];

  // ================= LEVEL 12 =================
  const L12 = [
    readSpell("Read hard words", ["strawberry", "basketball", "friendship", "playground", "adventure", "grandfather", "grandmother", "thunderstorm", "wheelchair", "interpreter", "celebration", "lightning"], "Long words are easier when you spot the chunks inside them, like play and ground."),
    spellCount("Count whole phrases", ["sign language", "Deaf culture", "good morning", "nice to meet you", "thank you", "happy birthday", "see you later", "please wait", "my name is", "how are you"], "the phrase", "Sometimes you fingerspell several words in a row. Count the letters only. A space is a tiny pause."),
    SC("Rights and sign languages", "⚖️", "In 2006 the United Nations adopted a treaty about the rights of people with disabilities. It says that sign languages count as languages, and that Deaf people should be able to use them in daily life, school and public places.", "Think about everyone's right to understand and be understood.", "A Deaf student asks for an interpreter in class, and the school provides one.", [
      "A treaty from the United Nations says sign languages are...|Real languages|Not languages|Banned", "Deaf people should be able to use sign language in...|Daily life, school and public places|Only at home|Nowhere", "The treaty was adopted in...|2006|1306|2306",
      "A right is something people...|Should be able to count on|Must buy|Can lose by sleeping", "A school that provides an interpreter is...|Helping a student learn|Breaking a rule|Wasting time", "Learning in your own language is a...|Right|Prize|Chore"
    ]),
    SC("At the doctor", "🩺", "Deaf patients have the right to understand their doctor. A qualified interpreter can be requested for medical visits, and it helps to ask ahead of time. A young child should not be asked to interpret difficult or private health topics.", "Think about how important it is to understand health information correctly.", "A patient calls ahead to ask for an interpreter, so the doctor's office can plan.", [
      "At a medical visit, a Deaf patient may ask for...|A qualified interpreter|A magic wand|A tuba", "It helps to ask for an interpreter...|Ahead of time|After leaving|Never", "Why not ask a young child to interpret health topics?|The words are hard and private|Kids are never helpful|Kids are too tall",
      "The doctor should look at...|The patient|The ceiling|Their shoes", "Why does clear communication matter at the doctor?|It keeps people safe|It is only for fun|It saves paper", "If you do not understand, you can...|Ask the doctor to explain again|Say nothing|Leave"
    ]),
    SC("Design for everyone", "🧩", "Universal design means making places and tools that work for as many people as possible. Captions, flashing alarms and ramps can help many people, not only the ones they were first made for.", "Think about one change that helps lots of people.", "Captions help Deaf viewers, and also someone in a noisy cafe.", [
      "Universal design means making things that...|Work for many people|Work for one person only|Cannot be used", "Captions can help people in a...|Noisy place|Rainbow|Sandwich", "A flashing alarm helps people who...|Cannot hear the alarm|Do not want to wake up|Like blinking lights",
      "A ramp helps people using...|Wheelchairs and strollers|Only ladders|Only flags", "Good design helps...|More people than expected|Nobody|Only builders", "When you plan a party, you can think about...|What everyone needs|Only your needs|Only snacks"
    ]),
    SC("Myths and facts", "🔍", "Many myths about Deaf people are wrong. Learning the facts helps you be a respectful friend.", "Check each choice against what you learned about Deaf people and sign languages.", "Someone says, 'Sign language is the same everywhere.' The fact is that each country has its own.", [
      "Which is true?|Sign languages are real languages|Sign language is just acting|Sign language is English on the hands", "Which is true?|Not every Deaf person lip-reads well|All Deaf people lip-read perfectly|Lip-reading is easy for everyone",
      "Which is true?|Deaf people have many kinds of jobs|Deaf people cannot work|Deaf people only do one job", "Which is true?|Each country has its own sign language or languages|There is one world sign language|Sign languages have no grammar",
      "Which is true?|Shouting does not help a Deaf person hear|Shouting always helps|Whispering fixes it", "Which is true?|Deaf people can drive|Deaf people can never drive|Deaf people are not allowed outside",
      "Which is true?|Many Deaf people are proud of Deaf culture|Everyone sees Deafness as sad|Deaf people have no culture"
    ]),
    SC("Cousins of ASL", "👪", "ASL has roots in French Sign Language, because Laurent Clerc brought French signs from Paris to America in 1816. British Sign Language is a separate language, even though the United States and Britain both use English.", "Think about languages that share a family history.", "Two Deaf signers from Paris and Boston could find many signs that look alike.", [
      "ASL has roots in...|French Sign Language|British Sign Language|Latin", "Who helped bring French signs to America?|Laurent Clerc|A pirate|A baker", "Is ASL the same as British Sign Language?|No, they are separate languages|Yes, exactly|They are both songs",
      "Do two countries that speak English have the same sign language?|Not always|Always|Never use signs", "Languages can be related like...|Cousins|Shoes|Trees in a row", "Laurent Clerc brought signs from...|Paris|Mars|Mexico"
    ]),
    SC("Different ways of signing", "🗺️", "Signers do not all sign in exactly the same way. Signs can differ by region, age and community. For example, Black ASL is a variety with its own history. All of these are good signing.", "Think about how people of different places and groups use the same language in their own ways.", "A signer from one city teaches a friend a local sign that the friend has never seen.", [
      "Do all signers sign in exactly the same way?|No, signs can vary|Yes, exactly|Only on Mondays", "Signs can differ by region and...|Age and community|The color of a shirt|The weather", "Black ASL is a...|Variety with its own history|Mistake|Joke",
      "If you see a sign you do not know, you can...|Ask politely what it means|Say it is wrong|Laugh", "Different styles of signing are all...|Good signing|Wrong|Forbidden", "Why do signs change from place to place?|People in different groups use language in their own ways|Signs are random|Hands get tired"
    ]),
    SC("New things, new signs", "📲", "When something new is invented, like a new device or game, people need words for it. Deaf communities create new signs, or fingerspell the name first. The signs used most by the community become the common ones.", "Think about how any language grows when new things appear.", "A new game is popular, so signers invent a sign for it and teach each other.", [
      "When a new invention appears, signers may...|Make a new sign|Ban the invention|Never talk about it", "Who helps decide which new sign becomes common?|The community using it|One random stranger|A robot", "Before a new sign exists, people can...|Fingerspell the name|Wait silently|Whisper",
      "All languages change over...|Time|Lunch|Pencils", "New signs often come from...|The community's ideas|A cookbook|A thunderstorm", "A language grows when people...|Use and share it|Hide it|Forget it"
    ]),
    SC("Respecting Deaf culture", "🤝", "Sign language is not a costume or a trick to get attention. Learn from Deaf teachers, give credit, ask what Deaf people want, and do not perform signs you do not understand. Deaf voices should lead conversations about Deaf life.", "Think about how to learn with respect and help others do the same.", "You join a class taught by a Deaf teacher and thank her for sharing her language.", [
      "Is sign language a costume?|No, it is a language to respect|Yes, wear it for fun|Only on holidays", "Who is the best teacher of ASL?|A Deaf teacher|A stranger who guesses|A cartoon", "Which is NOT respectful?|Performing signs you do not understand|Asking about a sign|Learning it carefully",
      "When talking about Deaf life, whose voice should lead?|Deaf people|People who just guess|Nobody", "Showing respect includes giving...|Credit|Orders|Costumes", "Before you share signs you learned, you can...|Learn them well first|Make them up|Skip learning"
    ]),
    SC("Your learning plan", "📆", "Good learners practice a little each day. Watch Deaf signers, learn from Deaf teachers, review often, and practice facial expressions. Try to learn whole sentences, not only single words.", "Think about habits that help you remember more over time.", "You practice ten minutes each day, and on Saturday you review the signs from the whole week.", [
      "Which habit helps you learn signs?|Practice a little each day|Cram once a year|Never review", "Facial expressions are...|Part of what you practice|Not needed|Only for photos", "A good way to learn is to watch...|Deaf signers|Only blank walls|Only rain",
      "Reviewing often helps you...|Remember|Forget|Sleep", "Learning whole sentences is better than...|Only single words|Reading books|Practice", "If you make a mistake, you should...|Smile and try again|Quit forever|Blame your hands"
    ]),
    SC("Deaf History Month", "📚", "Deaf History Month is a time in spring in the United States when people celebrate Deaf achievements and Deaf history. Schools and communities share stories about Deaf leaders, artists, teachers and inventors.", "Think about why people take a special time to remember and learn.", "A class reads about a Deaf painter and a Deaf teacher during the month.", [
      "Deaf History Month celebrates...|Deaf achievements and history|Only cooking|Only pets", "In the United States it is held in...|Spring|Winter only|It is not held", "During the month, schools may share stories about...|Deaf leaders and artists|Only animals|Only weather",
      "Learning history helps us...|Understand and respect people|Forget the past|Skip homework", "The month is for...|Everyone to learn|Only Deaf people to stay home|No one", "Who can take part in the celebration?|Everyone who wants to learn|Only adults|Only dogs"
    ]),
    SC("Video calls and sharing", "💻", "Many Deaf people use video calls to sign with family and friends. For clear signing, make sure your hands and face are in the camera, use good light, and pick a plain background. Keep private details like your address or school out of videos.", "Think about what the other person needs to see, and what should stay private.", "You sit near a window, check that both hands show on the screen, and keep your house number out of the picture.", [
      "On a video call, the camera should show your...|Hands and face|Only the ceiling|Only your feet", "A plain background helps because...|Hands are easier to see|It is boring|It is loud", "Good light helps the other person...|See you clearly|Hear you|Smell you",
      "Which is private and should stay out of videos?|Your address|Your favorite color|A smile", "If the video freezes, you can...|Ask your friend to repeat|Shout|Give up", "A video is best when you sign a bit...|Slowly and clearly|Super fast|With your hands hidden"
    ]),
    SC("Teams and sports", "🏀", "On a team with Deaf players, use signals everyone can see. Flags or flashing lights can replace whistles. Make eye contact before a play, and huddle face to face so everyone can see every sign.", "Think about how to make the game clear without relying on sound.", "A coach waves a flag when the game starts and points to show where to run.", [
      "Instead of a whistle, a game could use...|A flag or flashing light|A secret code|A lullaby", "Before a play, teammates should...|Make eye contact|Look away|Close their eyes", "A huddle works best when players...|Face each other|Stand back to back|Stay silent in the dark",
      "A coach can guide Deaf players by...|Using visible signals|Whispering from far away|Hiding", "Visible signals help...|Everyone on the team|No one|Only the ball", "A fair game is one where everyone can...|Understand the rules|Cheat|Sit out"
    ]),
    SC("Good questions", "💬", "Be curious, but polite. It is fine to ask about language, like 'How do you like to communicate?' It is not polite to ask for private details about someone's body or health unless they choose to share. Let people share when they feel comfortable.", "Think about questions you would be happy to answer yourself.", "You ask, 'Can you teach me a sign?' and wait for your friend to answer.", [
      "Which question is polite?|How do you like to communicate?|What is wrong with you?|Why are you so different?", "Private health details are...|Shared only if the person chooses|Open for everybody|Required for school", "A friend does not want to answer a question. You...|Respect that|Ask again and again|Tell everyone",
      "Which question shows you want to learn?|Can you teach me a sign?|Why can't you hear?|Are you broken?", "Being curious and kind means...|Asking politely|Staring|Pointing", "Good friends let people share when they...|Feel comfortable|Are tricked|Are tired"
    ]),
    addSigned(),
    backwards(),
    PL("Sign detective 8", "🕵️", "A final big review of signs.", "Picture the sign in your hands before you choose.", g("jump", "drive", "work", "want", "what", "where", "go", "wait", "need", "rain", "snow", "hot", "cold", "read", "write", "teach", "know", "airplane", "bike", "tree", "house", "understand", "happy", "sad"), QD)
  ];

  Object.assign(SIGN_LEVELS, {
    10: lvl(10, L10, [0, 2, 3, 6, 10, 14, 16, 17]),
    11: lvl(11, L11, [0, 2, 3, 5, 9, 14, 15, 17]),
    12: lvl(12, L12, [0, 2, 5, 6, 10, 14, 15, 17])
  });
})();
