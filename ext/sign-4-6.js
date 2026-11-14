// ext/sign-4-6.js  Mind Lab Sign Language (ASL), levels 4-6 (60 lessons)
// Only signs we are sure about are described; the rest is fingerspelling, numbers and Deaf culture.
(() => {
  const S = (a, n) => shuf(a).slice(0, n);
  const lead = s => String(s).replace(/<[^>]+>/g, "").replace(/^[^A-Za-z0-9]+/, "")[0].toUpperCase();

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
      { h: "Remember these", v: pairs.map(p => `${p.e ? p.e + " " : ""}<b>${p.t}</b>: ${p.d}`).join("<br>"), t: "Read each one slowly. Try it with your own hands!" },
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
  // build a level: 18 lessons + mixed practice + challenge
  const lvl = (n, ls) => {
    const ms = ls.map(l => l.make);
    const mix = (title, arr) => {
      const f = () => pick(arr)();
      const step = Math.max(1, Math.floor(arr.length / 4));
      f.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here is a quick reminder of some of them, then the quiz." }, ...arr.filter((_, i) => i % step === 0).slice(0, 4).map(m => m.teach()[0])];
      return { title, make: f };
    };
    return [...ls, mix("Mixed practice", [ms[0], ms[1], ms[3], ms[6], ms[8], ms[10], ms[13], ms[15]]), mix(`Level ${n} Challenge`, ms)];
  };

  // ---------- sign descriptions ----------
  const QD = { qd: "Which word is this sign?", qt: "How do you sign this word?" };
  const QL = { qd: "Which letter is this hand?", qt: "What does the hand for this letter look like?" };
  const QN = { qd: "Which number is this hand?", qt: "How do you show this number?" };
  const G = {
    red: "red::Pointer finger brushes down over your lips::🔴",
    blue: "blue::A B hand (flat, fingers up) shakes::🔵",
    green: "green::A G hand (pointer and thumb sideways) shakes::🟢",
    yellow: "yellow::A Y hand (thumb and pinky out) shakes::🟡",
    black: "black::Pointer finger draws across your forehead::⚫",
    white: "white::Open hand on your chest pulls away and closes to a pinch::⚪",
    bird: "bird::Pointer finger and thumb open and close near your mouth like a beak::🐦",
    fish: "fish::Flat hand wiggles forward like a fish swimming::🐟",
    cat: "cat::Pinch fingers at your cheek and pull out like whiskers::🐱",
    dog: "dog::Pat your leg and snap your fingers::🐶",
    apple: "apple::Knuckle of a bent pointer finger twists on your cheek::🍎",
    banana: "banana::One pointer finger stands up and the other hand peels it::🍌",
    orange: "orange::Fist squeezes open and closed at your mouth, like squeezing an orange::🍊",
    milk: "milk::Fist squeezes open and closed, like milking::🥛",
    family: "family::Two F hands start together and circle around to touch at the sides::👨‍👩‍👧",
    girl: "girl::Thumb of an A hand slides down your cheek::👧",
    boy: "boy::Hand at your forehead opens and closes like the brim of a cap::👦",
    home: "home::Pinched fingertips touch near your mouth, then your cheek::🏠",
    deaf: "Deaf::Pointer finger touches near your ear, then near your mouth::🧏",
    hearing: "hearing::Pointer finger circles in front of your mouth::👂",
    sign: "sign::Both pointer fingers circle toward each other, one up and one down::🤟",
    learn: "learn::Flat hand picks up from your other palm and moves to your forehead::🎓",
    tomorrow: "tomorrow::Thumb of an A hand on your cheek moves forward::➡️",
    yesterday: "yesterday::Thumb of an A hand on your cheek moves back toward your ear::⬅️",
    time: "time::Pointer finger taps the back of your wrist, like a watch::⌚",
    again: "again::A bent hand flips over and taps into your other palm::🔁",
    jump: "jump::Two fingers (a V) stand on your other palm and hop up::🦘",
    drive: "drive::Both hands hold a steering wheel and turn it::🚗",
    work: "work::Two fists tap, one wrist on top of the other::💼",
    want: "want::Both hands, fingers curled like claws, pull toward you::🤲",
    what: "what::Both flat hands face up and shake a little::❓",
    where: "where::Pointer finger up wags side to side::🗺️",
    go: "go::Pointer fingers point up, then swing forward and out::🚶",
    wait: "wait::Both hands face up and the fingers wiggle::⏳",
    need: "need::A bent pointer finger (an X hand) bobs down and forward::📌",
    rain: "rain::Open hands wiggle their fingers and move down like falling drops::🌧️",
    snow: "snow::Open hands flutter down slowly like snowflakes::❄️",
    hot: "hot::A claw hand at your mouth turns quickly away and down::🔥",
    cold: "cold::Fists shake, like shivering::🥶",
    read: "read::V fingers move down your other flat palm, like eyes reading::📖",
    write: "write::Pinched fingers write across your other palm::✏️",
    teach: "teach::Both hands start near your temples and move forward::🧑‍🏫",
    know: "know::Fingertips tap your forehead::💡",
    airplane: "airplane::A hand with thumb, pointer finger and pinky out flies forward::✈️",
    bike: "bike::Two fists circle, like feet pedaling::🚲",
    tree: "tree::One elbow rests on your other hand and the upright hand shakes with fingers spread::🌳",
    house: "house::Flat hands make a roof shape, then move down like walls::🏡",
    understand: "understand::A fist near your forehead, then the pointer finger flicks up::💭",
    think: "think::Pointer finger touches your forehead::🤔"
  };
  const g = (...ks) => ks.map(k => G[k]);
  const ALLSIGNS4 = g("red", "blue", "green", "yellow", "black", "white", "bird", "fish", "apple", "banana", "orange", "family", "girl", "boy", "home", "deaf", "hearing", "sign", "learn", "tomorrow", "yesterday", "time", "again", "jump", "drive", "work", "want");
  const NUMS = ["1::Pointer finger up", "2::Pointer and middle finger up", "3::Thumb, pointer and middle finger up", "4::Four fingers up, thumb tucked in", "5::All five fingers open",
    "6::Thumb touches pinky, other three fingers up", "7::Thumb touches ring finger, other three fingers up", "8::Thumb touches middle finger, other three fingers up", "9::Thumb touches pointer finger, other three fingers up",
    "10::Fist with the thumb up, and the hand shakes a little"];
  const LET = {
    A: "Letter A::Fist with the thumb along the side", B: "Letter B::Flat hand, fingers up, thumb across the palm", C: "Letter C::Curved hand shaped like a C",
    D: "Letter D::Pointer finger up, other fingers and thumb touch in a small circle", E: "Letter E::Fingers curl down and touch the thumb tucked under them",
    F: "Letter F::Thumb and pointer touch in a circle, three fingers up",
    G: "Letter G::Pointer finger and thumb point sideways", H: "Letter H::Pointer and middle fingers point sideways together", I: "Letter I::Pinky finger up, other fingers in a fist",
    J: "Letter J::Pinky up, then draw a J in the air", K: "Letter K::Pointer and middle fingers up and spread, thumb touches the middle finger",
    L: "Letter L::Pointer finger up and thumb out, like an L",
    M: "Letter M::Fist with the thumb tucked under three fingers", N: "Letter N::Fist with the thumb tucked under two fingers",
    O: "Letter O::Fingers and thumb curve to touch, like an O", P: "Letter P::Like the K hand, but pointing down", Q: "Letter Q::Like the G hand, but pointing down",
    R: "Letter R::Pointer and middle fingers up and crossed", S: "Letter S::Fist with the thumb across the front of the fingers",
    T: "Letter T::Fist with the thumb poking up between the pointer and middle fingers",
    U: "Letter U::Pointer and middle fingers up, held together", V: "Letter V::Pointer and middle fingers up and spread apart",
    W: "Letter W::Pointer, middle and ring fingers up and spread", X: "Letter X::Pointer finger bent like a hook", Y: "Letter Y::Thumb and pinky out, other fingers curled", Z: "Letter Z::Pointer finger draws a Z in the air"
  };
  const l = (...ks) => ks.map(k => LET[k]);
  const ALLLET = Object.keys(LET).map(k => LET[k]);

  // ---------- special makers ----------
  const spellCountOf = (title, words, label) => {
    const make = () => {
      const w = pick(words), n = w.replace(/ /g, "").length;
      return {
        text: `You fingerspell ${label} <b>${w}</b>. How many handshapes do you make?`, visual: "✋", answer: n,
        hints: ["You make one handshape for each letter. A space is only a tiny pause.", "Count the letters one at a time. Do not count the space.", "Example: the word sun has 3 letters, so you make 3 handshapes. Now do yours."]
      };
    };
    make.teach = () => [
      { h: title, v: "🔤", t: "Fingerspelling means one handshape for each letter. You do not make a handshape for a space, you just pause." },
      { h: "Worked example", v: "R-O-S-E = 4", t: "The word <b>rose</b> has four letters, so you make four handshapes: R, O, S, E." },
      { h: "Tip", v: "✋", t: "Keep your hand near your shoulder, palm toward the person watching, and keep it smooth." }
    ];
    return { title, make };
  };
  const readSpell = (title, words) => {
    const make = () => {
      const w = pick(words), others = words.filter(x => x !== w), ex = pick(others);
      return {
        text: `A friend fingerspells these letters, one after another:<br><b>${w.toUpperCase().split("").join(" - ")}</b><br>What word is it?`, visual: "🔠", textInput: true, answer: w,
        hints: ["Say the letters quickly in your head and listen for the word.", `The word has ${w.length} letters and starts with "${w[0].toUpperCase()}".`, `Example: ${ex.toUpperCase().split("").join(" - ")} spells "${ex}". Now do yours.`]
      };
    };
    make.teach = () => [
      { h: title, v: "🔠", t: "Reading fingerspelling means you see the letters and put them together into a word." },
      { h: "Worked example", v: "S - U - N", t: "S, then U, then N. Put them together and you get <b>sun</b>." },
      { h: "Tip", v: "💡", t: "Do not stare at each letter. Watch the whole shape of the word, like reading a word on a page." }
    ];
    return { title, make };
  };
  const fingerMath = () => {
    const make = () => {
      const a = ri(1, 5), b = ri(1, 5), pool = [[2, 3], [1, 4], [2, 2], [3, 1], [4, 5]].filter(p => !(p[0] === a && p[1] === b) && !(p[0] === b && p[1] === a)), ex = pick(pool);
      return {
        text: `You show <b>${a}</b> on one hand and <b>${b}</b> on the other hand. How many fingers are up in all?`, visual: "🖐️", answer: a + b,
        hints: ["Add the fingers on both hands together.", "Start at the bigger number and count up the rest on your fingers.", `Example: ${ex[0]} on one hand and ${ex[1]} on the other is ${ex[0]} + ${ex[1]} = ${ex[0] + ex[1]}. Now do yours.`]
      };
    };
    make.teach = () => [
      { h: "Numbers on two hands", v: "🖐️🖐️", t: "In ASL you show 1 to 5 on one hand. For bigger numbers you can use both hands and add them up." },
      { h: "Worked example", v: "3 + 2 = 5", t: "Three fingers on one hand and two on the other make <b>5</b> fingers in all." },
      { h: "Tip", v: "💡", t: "Count in your head, then check with your fingers." }
    ];
    return { title: "Fingers add up", make };
  };

  // ================= LEVEL 4 =================
  const L4 = [
    PL("Color signs", "🎨", "Many color signs use a handshape that matches a letter. Blue uses B, green uses G and yellow uses Y.", "For blue, green and yellow the hand shakes a little. Think of the first letter!", g("red", "blue", "green", "yellow", "black", "white"), QD),
    PL("Animal signs", "🐾", "Here are four animal signs to practice.", "Bird uses a beak. Fish uses a swimming hand. Cat has whiskers.", g("bird", "fish", "cat", "dog"), QD),
    PL("Fruit and milk", "🍎", "Signs for yummy foods and a drink.", "Orange and milk both squeeze the fist. Orange is at your mouth.", g("apple", "banana", "orange", "milk"), QD),
    PL("Home and family", "🏡", "Family signs and a sign for where you live.", "Girl is on the cheek. Boy is at the forehead.", g("family", "girl", "boy", "home"), QD),
    PL("Deaf, hearing, sign, learn", "🧏", "These four signs talk about people and language.", "Deaf goes from the ear to the mouth. Hearing is a circle at the mouth.", g("deaf", "hearing", "sign", "learn"), QD),
    PL("Time signs", "⏰", "Signs that help you say when something happens.", "Tomorrow moves forward and yesterday moves back. Forward is the future!", g("tomorrow", "yesterday", "time", "again"), QD),
    PL("Action signs", "🏃", "Four more action signs to try with your hands.", "Act them out with your whole body. Your hands remember better that way.", g("jump", "drive", "work", "want"), QD),
    PL("Numbers 1 to 10", "🔢", "You know 1 to 9. For 10, make a fist with the thumb up and shake it a little.", "Count with your hands: 1 to 5 on the open hand, 6 to 9 touch the thumb to a finger, 10 is a shaking thumb.", NUMS, QN),
    PL("Letters E, K, M, N", "🔤", "Four new letters. M and N look much alike, so count the fingers over the thumb.", "M has three fingers over the thumb. N has two. M has more humps, like the letter M!", l("E", "K", "M", "N"), QL),
    PL("Letters P, Q, R, T", "🔡", "P and Q point down. R crosses two fingers. T hides the thumb in a fist.", "P is like K turned down. Q is like G turned down.", l("P", "Q", "R", "T"), QL),
    PL("The whole alphabet", "🔠", "Now you know all 26 letters! Let's see how many you remember.", "Think about the shape of the fingers, the thumb, and whether the hand moves.", ALLLET, QL),
    spellCountOf("Count the handshapes", ["Sam", "Mia", "Ben", "Zoe", "Max", "Ava", "Leo", "Jake", "Anna", "Rose"], "the name"),
    readSpell("Read the letters", ["cat", "dog", "sun", "bus", "hat", "red", "map", "cup", "pig", "hen"]),
    SC("ASL word order", "🗣️", "ASL has its own word order. Signers often sign the time first, like YESTERDAY ME PLAY. This is not English on the hands.", "Time words like yesterday and tomorrow usually come at the start of an ASL sentence.", "In ASL you might sign TOMORROW SCHOOL ME GO. The time goes first.", [
      "Where do signers often put time words like yesterday?|At the start|At the very end|They never use them",
      "TOMORROW ME PLAY. What is the time word?|TOMORROW|PLAY|ME",
      "Is ASL the same as English on the hands?|No, it has its own order and rules|Yes, word for word|It has no order at all",
      "YESTERDAY ME EAT. Does it tell about the past or the future?|The past|The future|Right now at night",
      "TOMORROW SCHOOL ME GO. When do you go?|Tomorrow|Yesterday|A long time ago",
      "Which sentence puts time first?|YESTERDAY FRIEND PLAY|FRIEND PLAY YESTERDAY MAYBE|PLAY FRIEND NEVER"
    ]),
    SC("Deaf and deaf", "🧏", "A capital D in Deaf is used for people who are part of the Deaf community and share its language and culture. A small d in deaf only says a person does not hear well.", "Capital D means culture and community. Small d means only how the ears work.", "A person who signs ASL, goes to Deaf events and has Deaf friends is part of the Deaf community.", [
      "A capital D in Deaf often means someone is part of...|The Deaf community and culture|A sports team|A cooking club",
      "A small d in deaf only tells us that...|A person does not hear well|A person is silly|A person is a teacher",
      "Which spelling shows the Deaf community and its culture?|A capital D|A small d|No letters",
      "Deaf culture has its own...|Language, stories and traditions|Only rules about food|Weather",
      "Which language do many Deaf people in the United States use?|ASL|Morse code|Pig Latin",
      "Is being Deaf a bad thing?|No, many Deaf people are proud of who they are|Yes, always|Only on weekends"
    ]),
    SC("Lights that help", "💡", "Deaf people use sight and touch for things hearing people do with sound. A doorbell can flash a light. An alarm clock can shake the bed.", "Think about what a Deaf person can see or feel instead of hear.", "A flashing light tells a Deaf family that someone is at the door.", [
      "How can a doorbell tell a Deaf person someone is there?|It flashes a light|It sings a song|It is silent forever",
      "A bed shaker is used for...|Waking up with a gentle shake|Making pancakes|Playing music",
      "A smoke alarm for a Deaf person can use...|Bright flashing lights|Only a quiet hum|A paper sign",
      "A Deaf person may feel a phone...|Vibrate|Sing|Sneeze",
      "Which one is a visual alert?|A flashing light|A loud bell|A whisper",
      "Why do Deaf people use flashing lights?|They can see them|They can smell them|They can taste them"
    ]),
    SC("The first school", "🏫", "In 1817, the American School for the Deaf opened in Hartford, Connecticut. Laurent Clerc, a Deaf teacher from France, and Thomas Gallaudet started it. It was the first permanent school for Deaf children in the United States.", "Remember: Hartford, Connecticut, 1817, and a Deaf teacher from France named Clerc.", "Students at the school learned together, and sign language grew in the United States.", [
      "In what year did the American School for the Deaf open?|1817|1017|1999",
      "In which state is the American School for the Deaf?|Connecticut|Hawaii|Texas",
      "Where was Laurent Clerc from?|France|Mexico|Egypt",
      "Laurent Clerc was a...|Deaf teacher|Pirate|Chef",
      "Which city is the school in?|Hartford|Honolulu|Houston",
      "This school was important because it was...|The first long-lasting school for Deaf children in the country|A school for pets|A school on a boat"
    ]),
    SC("Eye contact", "👀", "In Deaf culture, eye contact is important. Looking at the signer shows you are listening. Looking away in the middle of a conversation can seem rude.", "Watching the face and hands is how you listen to a signer.", "When a Deaf friend signs to you, you keep your eyes on them.", [
      "When a Deaf friend signs, where should your eyes be?|On their face and hands|On your phone|On the ceiling",
      "Looking away in the middle of a signed chat can seem...|Rude|Fun|Fast",
      "Eye contact shows that you are...|Listening|Sleeping|Leaving",
      "What should you do if you need to look away?|Say so politely first|Just walk off|Close your eyes and hum",
      "A signer looks at you. You should...|Look back and pay attention|Look at the floor|Cover your eyes",
      "Where do signers usually look at the other person?|Near the face|At the feet|Over the shoulder"
    ])
  ];

  // ================= LEVEL 5 =================
  const L5 = [
    SC("Question faces", "🤨", "Your eyebrows help ask questions in ASL. Eyebrows up asks a yes or no question. Eyebrows down asks who, what, where, when or why.", "Yes or no question: eyebrows up. What or where question: eyebrows down.", "To ask 'Are you hungry?' you sign with your eyebrows up.", [
      "Which question needs eyebrows up?|Are you hungry?|Where is my book?|What is your name?",
      "Which question needs eyebrows down?|Where is the park?|Do you like cake?|Is it raining?",
      "Eyebrows up show a...|Yes or no question|What question|Sad feeling",
      "Eyebrows down show a...|Who, what or where question|Yes or no question|Joke",
      "'Do you want milk?' is which kind of question?|A yes or no question|A where question|A when question",
      "'What is your name?' is which kind of question?|A what question|A yes or no question|A sleepy question"
    ]),
    PL("What, where, go, wait, need", "❓", "Useful signs for asking and for telling what you do.", "What uses open palms. Wait uses wiggling fingers. Need looks like a bobbing hook.", g("what", "where", "go", "wait", "need"), QD),
    PL("Weather signs", "🌦️", "Signs for weather you can see and feel.", "Rain falls fast and wiggly. Snow floats down slowly. Hot is at the mouth.", g("rain", "snow", "hot", "cold"), QD),
    PL("School signs", "📚", "Four signs you can use at school.", "Read looks like eyes moving down a page. Write looks like writing on a palm.", g("read", "write", "teach", "know"), QD),
    PL("Things around us", "🌳", "Signs for things you see every day.", "Airplane uses the I love you handshape flying away!", g("airplane", "bike", "tree", "house"), QD),
    SC("Handshape and place matter", "🎯", "A small change can change a sign. Mom and dad use the same handshape, but mom is on the chin and dad is on the forehead. Please and sorry both circle on the chest, but please uses a flat hand and sorry uses a fist.", "Check three things: handshape, place and movement.", "Same hand on the chin is mom. Same hand on the forehead is dad.", [
      "Mom and dad use the same hand. What is different?|The place on the face|The color|The sound",
      "Mom is made at the...|Chin|Forehead|Knee",
      "Dad is made at the...|Forehead|Chin|Foot",
      "Please and sorry both circle on the chest. What is different?|The handshape|The weather|The day",
      "Sorry is made with a...|Fist|Flat hand|Wiggling hand",
      "Please is made with a...|Flat hand|Fist|Pinky only"
    ]),
    SC("Double letters", "🔤", "Some words have the same letter twice, like ball or book. When you fingerspell a double letter, you make a small bounce or slide to show the letter twice.", "Do not forget the second letter. It still counts as a handshape.", "In the word ball, you sign B, A, L, then L again with a little bounce, then you finish.", [
      "How do you show a double letter, like the two Ls in ball?|A small bounce or slide|Skip the second one|Stand up",
      "How many letters are in the word book?|4|3|2",
      "The word moon has two of which letter?|O|M|N",
      "The word apple has two of which letter?|P|A|L",
      "When you spell the word bee, which letter shows twice?|E|B|T",
      "A double letter like the two Ts in kitten is shown with...|A small bounce or slide|A big jump|Nothing at all"
    ]),
    SC("Read fingerspelling", "👀", "When you watch fingerspelling, you do not read each letter one by one. You watch the shape and rhythm of the whole word. Look at the hand and keep your eyes steady.", "Watch the whole word, not each letter alone. Say it to yourself.", "A friend spells H-O-M-E. You read it as one word: home.", [
      "How do skilled signers read fingerspelling?|They watch the whole word shape|They guess without watching|They close their eyes",
      "Where should your eyes stay?|On the hand and face area|On the floor|On the ceiling",
      "If you miss a letter, what is a kind thing to do?|Ask them to spell it again slowly|Laugh|Walk away",
      "Fingerspelling that is smooth is easier to...|Read|Burn|Wash",
      "Is it okay to ask a friend to spell slower?|Yes, it is polite|No, it is rude|Only on Sundays",
      "When you read a spelled word you should...|Put the letters into a word|Count the fingers only|Forget it"
    ]),
    readSpell("Read longer words", ["friend", "apple", "happy", "school", "water", "bread", "tiger", "house", "plant", "smile"]),
    spellCountOf("Count longer words", ["friend", "apple", "happy", "school", "water", "bread", "tiger", "house", "plant", "smile", "garden", "yellow"], "the word"),
    fingerMath(),
    PL("Sign detective 4", "🕵️", "Time to match more signs to their words.", "Picture the sign in your hands before you choose.", ALLSIGNS4, QD),
    SC("School and Gallaudet", "🎓", "Thomas Hopkins Gallaudet helped start the first lasting school for Deaf children in the United States, in Hartford, Connecticut, in 1817. He worked with Laurent Clerc, who was a Deaf teacher from France.", "Two names to remember: Gallaudet and Clerc. They started the school together.", "Clerc taught Deaf students, and Gallaudet helped lead the school.", [
      "Who worked with Thomas Gallaudet to start the school?|Laurent Clerc|A baker|A sailor",
      "Where did Laurent Clerc come from?|France|Brazil|China",
      "In which city did the school open?|Hartford|Boston|Miami",
      "The school opened in the year...|1817|1717|1917",
      "Laurent Clerc was...|Deaf|A bird|A robot",
      "Why was the school important?|Deaf children could learn together in sign|It sold toys|It was a bakery"
    ]),
    SC("Gallaudet University", "🏛️", "Gallaudet University is in Washington, D.C. It is a university made for Deaf and hard of hearing students, and classes use ASL and English. It is named after Thomas Hopkins Gallaudet.", "Remember: Washington, D.C., a university, and ASL.", "A Deaf student can go to Gallaudet and learn in ASL with other Deaf students.", [
      "Where is Gallaudet University?|Washington, D.C.|Paris|The moon",
      "Gallaudet University is for...|Deaf and hard of hearing students|Only pilots|Only chefs",
      "Which languages are used there?|ASL and English|Only Spanish|Only music",
      "Gallaudet University is a...|University|Zoo|Pizza shop",
      "Gallaudet is named after...|Thomas Hopkins Gallaudet|A bird|A planet",
      "At Gallaudet, classes can be taught in...|ASL|Whistling|Silent movies only"
    ]),
    SC("Where ASL came from", "🌱", "ASL grew from sign languages used by Deaf people long ago, especially French Sign Language, which Laurent Clerc brought from France. Home signs and local signs also helped. On Martha's Vineyard, an island in Massachusetts, many people, both Deaf and hearing, used sign language for many years.", "ASL has roots in French Sign Language. Languages grow and change.", "Clerc taught French Sign Language to American students, and it mixed with signs they already used.", [
      "ASL has roots in which sign language?|French Sign Language|Moon language|Dolphin language",
      "Who helped bring French Sign Language to America?|Laurent Clerc|A farmer|An astronaut",
      "On Martha's Vineyard, many people used...|Sign language|Only drums|Only flags",
      "Martha's Vineyard is in which state?|Massachusetts|Arizona|Kansas",
      "Do languages stay exactly the same forever?|No, they grow and change|Yes, always|They disappear every night",
      "On Martha's Vineyard, who signed?|Both Deaf and hearing people|Only birds|Only teachers"
    ]),
    SC("Technology for Deaf people", "📱", "Technology helps Deaf people talk and learn. Captions show words on a screen. Video calls let people sign to each other. Text messages are easy to read. A video relay service lets a Deaf person sign to an interpreter, who calls a hearing person.", "Think about what you can see: words on a screen or a signer in a video.", "On a video call, two friends can sign to each other from far away.", [
      "What are captions?|Words on a screen for what is said|A kind of hat|A music box",
      "How can friends who sign talk from far away?|A video call|A paper plane|A spoon",
      "A video relay service lets a Deaf person...|Sign to an interpreter who calls someone|Teach a bird|Draw a map",
      "Texting is easy for Deaf people because...|They can read it|It plays loud sound|It is made of paper",
      "Why do videos need captions?|So Deaf people can read what is said|To make them longer|To hide the picture",
      "Which tool helps you see what is said?|Captions|A drum|A whistle"
    ]),
    SC("Working with an interpreter", "🧑‍🤝‍🧑", "An interpreter signs what a hearing person says and speaks what a Deaf person signs. The interpreter speaks as the Deaf person, so you answer the Deaf person, not the interpreter. Interpreters keep what they hear private.", "Talk to the Deaf person. The interpreter is a helper in the middle.", "If a Deaf student signs a question, you answer the student, not the interpreter.", [
      "Who do you look at when an interpreter is helping?|The Deaf person|Only the interpreter|The ceiling",
      "An interpreter helps by...|Signing and speaking what was said|Taking notes for a game|Making lunch",
      "Interpreters keep what they hear...|Private|Public on the radio|On posters",
      "A Deaf person says through an interpreter, 'I am happy.' Who is happy?|The Deaf person|The interpreter|The teacher",
      "When you talk with a Deaf person through an interpreter, you should say things like...|'How are you?' to the Deaf person|'Ask him how he is' to the interpreter|Nothing at all",
      "It is best to...|Talk directly to the Deaf person|Ignore the Deaf person|Talk only to the wall"
    ]),
    SC("Getting attention in Deaf culture", "🙋", "Deaf people have kind ways to call each other. You can wave, tap a shoulder lightly, flick the lights on and off, or stomp on the floor so they can feel it. You never grab or pull.", "Pick a way that is seen or felt, and gentle.", "Stomping on a wooden floor sends a feeling a Deaf friend can feel.", [
      "Which way to call a Deaf person is gentle?|Wave where they can see|Pull their hair|Throw a toy",
      "A stomp on the floor works because...|They can feel the shake|It makes a pretty sound|It is a secret",
      "Flicking the lights is used to...|Get attention in a room|Make a joke about the weather|Cook",
      "A light tap on the shoulder is...|Okay and gentle|Never okay|A magic spell",
      "Which is NOT kind?|Grabbing someone's arm|Waving|A light tap",
      "After you get their attention you should...|Face them and start signing|Hide|Spin around"
    ])
  ];

  // ================= LEVEL 6 =================
  const L6 = [
    SC("Handshapes that show things", "🚗", "In ASL, a handshape can stand for a thing and then show how it moves. This is called a classifier. A flat hand can be a flat thing, and a 3 hand (thumb, pointer and middle finger) can show a car driving.", "A classifier is a handshape that stands for a kind of thing and shows what it does.", "The 3 hand moves along a path, like a car driving up a hill.", [
      "A classifier is a...|Handshape that shows a thing and how it moves|Kind of pencil|Drum beat",
      "Which handshape can show a car moving?|The 3 hand|A fist in your pocket|Both hands behind you",
      "Why do signers use classifiers?|To show how things look and move|To be silent|To hide words",
      "A hand moves along a wavy path. It could show...|A car or bike on a bumpy road|A word spelled with letters|A number",
      "A flat hand slides across the air. It can show...|A flat thing moving|A phone call|A song",
      "Classifiers are a part of...|ASL grammar|Math tables|Spelling lists"
    ]),
    SC("Say no with your head", "🙅", "In ASL, a head shake helps say no or not. You can shake your head while you sign. Your head nod can say yes. Your face and head are part of the grammar.", "Head shake means no or not. Head nod means yes.", "To say 'I do not like it', you shake your head while you sign.", [
      "A head shake while signing often means...|No or not|Yes|Hello",
      "A head nod while signing often means...|Yes|No|Goodbye",
      "Is your head part of ASL grammar?|Yes|No, never|Only sometimes at dinner",
      "You sign 'I do not know' with a head shake. The shake shows...|Not|Yes|Now",
      "Your face and head help a signer show...|Meaning and feeling|Only the weather|Nothing",
      "To show a strong yes you could...|Nod your head|Cross your eyes|Turn around"
    ]),
    SC("Role shift", "🎭", "When a signer tells a story with two people talking, they turn their body a little to show who is speaking. This is called role shift. The signer turns to one side for one person and the other side for the other person.", "A small turn of the body shows who is talking.", "To show a mom and a child talking, the signer turns left for the mom and right for the child.", [
      "In a story, how does a signer show two people talking?|Turn the body a little for each person|Sing two songs|Leave the room",
      "Role shift is when a signer...|Shows who is talking by turning|Spells every letter|Counts to ten",
      "A signer turns left and says 'Dinner is ready'. Who is talking?|The character on the left|The audience|The ceiling",
      "Role shift helps the watcher know...|Who is saying what|The time on the clock|Where the pizza is",
      "A signer tells a story with a face for each character. This shows...|How each one feels|The weather|The date",
      "Role shift is a part of...|ASL storytelling|Math tests|Cooking"
    ]),
    SC("Using the space", "📍", "ASL uses the space in front of you. A signer can put a person or a thing in a spot in the air and then point back to that spot later. That tells you who or what they mean.", "Spot first, then point back to it.", "A signer puts 'Mia' on the left, then points left to talk about her again.", [
      "Why does a signer point to a spot in the air?|To talk about the person or thing placed there|To scratch the air|To fix lights",
      "A signer places the dog on the right. Later they point right. They mean...|The dog|The weather|A song",
      "ASL uses the space...|In front of the signer|Behind a wall|Inside a pocket",
      "Using space is a part of...|ASL grammar|A video game|A snack",
      "If a signer places two friends in two spots, you can tell them apart by...|Where the signer points|Their shoes|Their snack",
      "A pointing spot in the air is useful for...|Remembering who is who|Making noise|Counting stars"
    ]),
    SC("Writing ASL with glosses", "✍️", "ASL does not have one everyday writing system like English does. To write ASL ideas on paper, people often use glosses. A gloss is an English word in capital letters for each sign, like STORE ME GO.", "A gloss is a written label for a sign, in capital letters.", "The gloss HELLO FRIEND ME HAPPY tells you the order of the signs.", [
      "In a gloss, signs are written in...|Capital letters|Little pictures|Wavy lines",
      "A gloss like TOMORROW ME PLAY is a way to write...|The signs in order|A secret code|A song",
      "Is a gloss the same as an English sentence?|No, the order can be different|Yes, always|It has no meaning",
      "Which is written like a gloss?|YESTERDAY ME EAT|Yesterday, I ate.|yesterday i ate",
      "What do Deaf people usually use to write notes?|English|Only glosses|Only emojis",
      "Why do people use glosses?|To show ASL order on paper|To make the sign louder|To hide words"
    ]),
    PL("Mind signs", "💭", "Four signs about learning and knowing.", "Know taps the forehead. Think touches the forehead. Understand flicks up from the forehead.", g("understand", "learn", "know", "think"), QD),
    PL("Sign detective 5", "🕵️", "Time for a big sign review, with new signs and old ones.", "Picture the sign in your hands before you choose.", [...ALLSIGNS4, ...g("what", "where", "go", "wait", "need", "rain", "snow", "hot", "cold", "read", "write", "teach", "know", "airplane", "bike", "tree", "house", "understand", "think")], QD),
    PL("Alphabet speed round", "🔠", "Check your whole alphabet. Think about the thumb and finger positions.", "Compare letters that look alike: M and N, K and P, G and Q, U and V.", ALLLET, QL),
    readSpell("Read long words", ["teacher", "rainbow", "penguin", "morning", "library", "kitchen", "monkey", "holiday", "dolphin", "pancake"]),
    spellCountOf("Count a full name", ["Emma Lee", "Sam Cole", "Ava Ray", "Leo Fox", "Mia Hall", "Jake Moss", "Anna Bell", "Ben Ross"], "the name"),
    SC("Learning without sight or hearing", "🤲", "Some people are both Deaf and blind. They are called DeafBlind. Helen Keller was DeafBlind. Her teacher, Anne Sullivan, spelled words into her hand with fingerspelling. Today many DeafBlind people use signs that they feel with their hands.", "Touch can be a way to listen. Fingerspelling can be felt in a hand.", "A friend spells W-A-T-E-R into the palm of a DeafBlind person while cold water flows over the other hand.", [
      "DeafBlind people are people who...|Cannot see well and cannot hear well|Can only dance|Are always asleep",
      "Who spelled words into Helen Keller's hand?|Anne Sullivan|A baker|A pilot",
      "How can a DeafBlind person read signs?|By feeling them with their hands|By smelling them|By tasting them",
      "Fingerspelling into a hand uses...|Touch|Only sound|A drum",
      "Helen Keller learned many words through...|Fingerspelling in her palm|A trumpet|Radio",
      "Touch signing helps people who...|Cannot see the signs well|Always have a pencil|Like pizza"
    ]),
    SC("The ADA", "⚖️", "In 1990 the United States passed the Americans with Disabilities Act, called the ADA. It is a law that protects people with disabilities. It helps Deaf people ask for things like interpreters and captions so they can take part in schools, jobs and public places.", "A law that is fair to everyone. It helps Deaf people have access.", "At a Deaf student's school event, an interpreter is provided so the student can join in.", [
      "What does ADA stand for?|Americans with Disabilities Act|All Day Art|Animals Do Acrobatics",
      "In which year did the ADA become law?|1990|1790|2090",
      "The ADA helps Deaf people ask for...|Interpreters and captions|Ice cream|Candy",
      "The ADA is a...|Law|Song|Recipe",
      "The ADA says people with disabilities should be able to take part in...|Schools, jobs and public places|Only one place|Nowhere",
      "Why is an interpreter at a public event helpful?|The Deaf person can follow what is said|It makes the room smell good|It makes it louder"
    ]),
    SC("Deaf President Now", "✊", "In 1988, students at Gallaudet University protested because the school had chosen another hearing president. They wanted a Deaf president. After a week, I. King Jordan became the first Deaf president of Gallaudet. The protest was called Deaf President Now.", "Students spoke up, and their voices, in sign, were heard.", "Students at Gallaudet marched and signed, and the school chose a Deaf president.", [
      "In which year was Deaf President Now?|1988|1888|2088",
      "What did the students want?|A Deaf president for their school|Longer recess|A new pet",
      "Who became the first Deaf president of Gallaudet?|I. King Jordan|A bird|Anne Sullivan",
      "Deaf President Now showed that...|Deaf people can lead|Nobody can lead|Rules are never fair",
      "The protest was by...|Students|Pirates|Clowns",
      "Where did Deaf President Now happen?|Gallaudet University|A beach|A circus"
    ]),
    SC("Deaf art and poetry", "🎭", "Deaf people make art too. ASL poetry uses handshapes, rhythm and space the way a poem uses words and rhymes. Deaf storytellers act out stories with big faces and movement. Deaf theater is made to be seen.", "Art you see: poems in the air, stories with hands.", "An ASL poem can repeat one handshape again and again, like a rhyme you can see.", [
      "ASL poetry uses...|Handshapes, rhythm and space|Only drums|Only paper",
      "A rhyme in ASL could repeat a...|Handshape|Sneeze|Tea cup",
      "Deaf storytellers use...|Faces and movement|Only a pencil|Only whistling",
      "ASL poems are meant to be...|Seen|Smelled|Tasted",
      "Deaf theater is made for people to...|Watch and enjoy|Sleep|Run away",
      "Can Deaf people be artists and poets?|Yes, of course|No, never|Only on Mondays"
    ]),
    SC("Being a good ally", "🤝", "An ally is a friend who helps in a respectful way. A good ally to the Deaf community learns signs from Deaf teachers, asks before helping, and never makes fun of signing.", "Learn from Deaf people and listen to what they want.", "Before you help, ask: 'Would you like me to help?' and then follow what your friend says.", [
      "Before helping a Deaf friend, a good ally...|Asks if they want help|Just grabs their things|Does it in secret",
      "Where is a good place to learn ASL?|From Deaf teachers|By copying a cartoon|By guessing",
      "Making fun of signing is...|Unkind|Fun|Smart",
      "An ally listens to...|What Deaf people say they need|Only their own ideas|Nobody",
      "A kind thing to do for a Deaf classmate is to...|Include them in games|Leave them out|Whisper secrets",
      "If a Deaf friend corrects your sign you say...|Thank you for helping me|Stop it|Whatever"
    ]),
    SC("Careers for Deaf people", "💼", "Deaf people work in every kind of job. There are Deaf teachers, scientists, artists, doctors, athletes, engineers, bakers and business owners. Many Deaf teachers teach ASL.", "Being Deaf does not stop someone from having a great job.", "A Deaf scientist can lead a team and use an interpreter or video to share ideas.", [
      "Can a Deaf person be a teacher?|Yes|No|Only on Fridays",
      "Can a Deaf person be a scientist?|Yes, many are|No, never|Only a sleepy one",
      "Who often teaches ASL?|Deaf teachers|Only robots|Only dogs",
      "Deaf people work in...|Every kind of job|Only one kind of job|No jobs",
      "A Deaf baker can...|Bake great bread|Not bake at all|Only watch",
      "Which is true?|Deaf people can do almost any job|Deaf people must stay home|Deaf people cannot learn"
    ]),
    SC("Sign languages of the world", "🌍", "There are hundreds of different sign languages around the world. Each country or community may have its own. At big meetings, Deaf people from different countries sometimes use International Sign, a way to share ideas across languages.", "Sign languages are many, and each is a real language.", "A Deaf traveler from the United States may use International Sign to chat with Deaf people from other countries.", [
      "How many sign languages are there?|Hundreds|Exactly one|None",
      "International Sign is used to...|Share ideas across countries|Order pizza|Play chess",
      "Does each country always have the same sign language?|No, there are many|Yes, only one|Nobody signs",
      "Is a sign language a real language?|Yes|No|Only in movies",
      "ASL is used mostly in...|The United States and parts of Canada|Antarctica|The ocean",
      "British Sign Language is...|A different language from ASL|The same as ASL|A type of food"
    ]),
    SC("Respectful words", "💬", "Words matter. Many Deaf people like to be called Deaf or hard of hearing. Words like 'deaf and dumb' are hurtful and wrong. Deaf people are smart and can speak up for themselves.", "Use the words Deaf people choose for themselves.", "You can say, 'My friend is Deaf and uses ASL.'", [
      "Which words are respectful?|Deaf or hard of hearing|Deaf and dumb|Silly ears",
      "Deaf people are...|Smart and capable|Not able to learn|Always lonely",
      "If you are not sure what to say, you can...|Ask politely or listen|Make up a joke|Stare",
      "Which sentence is kind?|My friend is Deaf and signs|My friend is broken|My friend is weird",
      "Hurtful words about Deaf people should be...|Avoided|Used more|Sung",
      "Who can best say how to talk about being Deaf?|Deaf people|Nobody|A parrot"
    ])
  ];

  Object.assign(SIGN_LEVELS, { 4: lvl(4, L4), 5: lvl(5, L5), 6: lvl(6, L6) });
})();
