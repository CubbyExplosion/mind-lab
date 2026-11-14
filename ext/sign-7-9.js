// ext/sign-7-9.js  Mind Lab Sign Language (ASL), levels 7-9 (60 lessons)
// Only things we are sure about: fingerspelling, number signs, ASL grammar ideas, Deaf culture, history and etiquette.
(() => {
  const S = (a, n) => shuf(a).slice(0, n);
  const UP = s => String(s).toUpperCase();
  const ORD = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"];
  const NUMW = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

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

  // ---------- fingerspelling makers ----------
  const readSpell = (title, words) => {
    const make = () => {
      const w = pick(words), ex = pick(["sun", "cat", "pig", "bus", "map"]);
      return {
        text: `A friend fingerspells these letters, one after another:<br><b>${UP(w).split("").join(" - ")}</b><br>What word is it?`, visual: "🔠", textInput: true, answer: w,
        hints: ["Say the letters quickly in your head and listen for the word.", `The word has ${w.length} letters and starts with "${UP(w[0])}".`, `Example: ${UP(ex).split("").join(" - ")} spells "${ex}". Now do yours.`]
      };
    };
    make.teach = () => [
      { h: title, v: "🔠", t: "Reading fingerspelling means you see the letters and put them together into a word. Longer words need a steady eye." },
      { h: "Worked example", v: "S - U - N", t: "S, then U, then N. Put them together and you get <b>sun</b>." },
      { h: "Tip", v: "💡", t: "Do not stare at each letter. Watch the shape and rhythm of the whole word, like reading a word on a page." }
    ];
    return { title, make };
  };
  const spellCount = (title, words, label) => {
    const make = () => {
      const w = pick(words), n = w.replace(/ /g, "").length, ex = pick(["rose", "sun", "tree", "moon"]);
      return {
        text: `You fingerspell ${label} <b>${w}</b>. How many handshapes do you make?`, visual: "✋", answer: n,
        hints: ["You make one handshape for each letter. A space is only a tiny pause.", "Count the letters one at a time. Do not count the space.", `Example: the word ${ex} has ${ex.length} letters, so you make ${ex.length} handshapes. Now do yours.`]
      };
    };
    make.teach = () => [
      { h: title, v: "🔤", t: "Fingerspelling means one handshape for each letter. You do not make a handshape for a space, you just pause." },
      { h: "Worked example", v: "R-O-S-E = 4", t: "The word <b>rose</b> has four letters, so you make four handshapes: R, O, S, E." },
      { h: "Tip", v: "✋", t: "Keep your hand near your shoulder, palm toward the person watching, and keep it smooth." }
    ];
    return { title, make };
  };
  const letterCount = (title, words) => {
    const make = () => {
      const w = pick(words), L = UP(pick(w.split(""))), n = w.split("").filter(c => UP(c) === L).length;
      const exw = w === "letter" ? ["summer", "M", 2] : ["letter", "T", 2];
      return {
        text: `You fingerspell <b>${w}</b>. How many times do you make the letter <b>${L}</b>?`, visual: "🔤", answer: n,
        hints: ["Go through the word one letter at a time.", "Move from left to right and count only the matching handshapes. A repeated letter gets a small bounce.", `Example: in the word ${exw[0]} the letter ${exw[1]} shows up ${exw[2]} times. Now do yours.`]
      };
    };
    make.teach = () => [
      { h: title, v: "🔤", t: "Some words use the same letter more than once. When you fingerspell a double letter, you make a small bounce or slide." },
      { h: "Worked example", v: "B-A-N-A-N-A", t: "In <b>banana</b> the letter A shows up 3 times and N shows up 2 times." },
      { h: "Tip", v: "💡", t: "Say each letter softly in your head and tap a finger for every match." }
    ];
    return { title, make };
  };
  const spellOrder = (title, words) => {
    const make = () => {
      const w = pick(words), n = w.length, idx = Math.random() < 0.2 ? n - 1 : ri(0, n - 1), last = idx === n - 1;
      const c = UP(w[idx]);
      let pool = shuf([...new Set(w.split("").map(UP))].filter(x => x !== c));
      const extra = shuf("AEIOURSTLNMDPCB".split("")).filter(x => x !== c && !pool.includes(x));
      const wrongs = [...pool, ...extra].slice(0, 2);
      const exw = n > 6 && w !== "planet" ? "planet" : "tiger";
      return {
        text: `You fingerspell <b>${w}</b>. Which letter is the <b>${last ? "last" : ORD[idx]}</b> handshape?`, visual: "✋", choices: shuf([c, ...wrongs]), answer: c,
        hints: ["Spell the word slowly in your head, one handshape at a time.", `The word has ${n} letters. ${last ? "Go all the way to the end." : "Count along to number " + (idx + 1) + "."}`, `Example: in "${exw}" the 2nd handshape is ${UP(exw[1])}. Now do yours.`]
      };
    };
    make.teach = () => [
      { h: title, v: "🔢", t: "Fingerspelling has an order. The first handshape is the first letter, the second is the second letter, and so on." },
      { h: "Worked example", v: "T-I-G-E-R", t: "In <b>tiger</b>, the 1st handshape is T, the 3rd is G and the last is R." },
      { h: "Tip", v: "💡", t: "Count on your fingers as the letters go by." }
    ];
    return { title, make };
  };
  const alphaNext = title => {
    const make = () => {
      const i = ri(1, 24), after = Math.random() < 0.5, ans = String.fromCharCode(65 + i + (after ? 1 : -1)), cur = String.fromCharCode(65 + i);
      const w1 = String.fromCharCode(65 + i + (after ? 2 : -2)), w2 = String.fromCharCode(65 + i + (after ? -1 : 1));
      const exs = ["C", "H", "P"].filter(x => x !== cur && x !== ans);
      const ex = exs[0];
      return {
        text: `You sign the alphabet in order. Which letter comes right <b>${after ? "after" : "before"}</b> <b>${cur}</b>?`, visual: "🔠", choices: shuf([ans, w1, w2].filter(x => x >= "A" && x <= "Z")), answer: ans,
        hints: ["Sign the alphabet slowly in your head, A, B, C and so on.", `Find ${cur}, then take one step ${after ? "forward" : "backward"} in the alphabet.`, `Example: right ${after ? "after" : "before"} ${ex} comes ${String.fromCharCode(ex.charCodeAt(0) + (after ? 1 : -1))}. Now do yours.`]
      };
    };
    make.teach = () => [
      { h: title, v: "🔠", t: "Knowing the alphabet order helps you find letters quickly and read fingerspelling smoothly." },
      { h: "Worked example", v: "K, L, M", t: "Right after K comes <b>L</b>. Right before M comes <b>L</b> too." },
      { h: "Tip", v: "💡", t: "Say the ABC in your head while you move your hand through the letters." }
    ];
    return { title, make };
  };
  const readDigits = (title, len) => {
    const make = () => {
      const n = typeof len === "number" ? len : ri(len[0], len[1]);
      const d = Array.from({ length: n }, () => ri(1, 9)), ans = d.join("");
      return {
        text: `A friend signs these number signs one after another:<br><b>${d.map(x => NUMW[x]).join(" - ")}</b><br>Type the number you read.`, visual: "🔢", textInput: true, answer: ans,
        hints: ["Turn each number word into its digit, in the same order.", `The number has ${n} digits.`, "Example: two - five - eight is the number 258. Now do yours."]
      };
    };
    make.teach = () => [
      { h: title, v: "🔢", t: "When someone signs a long number, like a phone number, you read each number sign in order and write down the digits." },
      { h: "Worked example", v: "3 - 1 - 4", t: "Three, one, four makes <b>314</b>. The order matters!" },
      { h: "Tip", v: "💡", t: "Write each digit as soon as you see it, so you do not forget." }
    ];
    return { title, make };
  };
  const THUMB = { 6: "pinky", 7: "ring finger", 8: "middle finger", 9: "pointer finger" };
  const thumbFinger = title => {
    const make = () => {
      const n = ri(6, 9), others = [6, 7, 8, 9].filter(x => x !== n), ex = pick(others);
      if (Math.random() < 0.5) return {
        text: `To sign the number <b>${n}</b> in ASL, your thumb touches which finger?`, visual: "🖐️", choices: shuf(Object.values(THUMB)), answer: THUMB[n],
        hints: ["Numbers 6 to 9 touch the thumb to one finger. The other three fingers stay up.", "The fingers go in a row from the smallest finger up toward the pointer, matching 6, 7, 8, 9.", `Example: for ${ex} the thumb touches the ${THUMB[ex]}. Now do yours.`]
      };
      return {
        text: `Your thumb touches your <b>${THUMB[n]}</b> and the other three fingers stay up. Which number is that?`, visual: "🖐️", choices: shuf([6, 7, 8, 9]), answer: n,
        hints: ["Numbers 6 to 9 touch the thumb to one finger. The other three fingers stay up.", "The fingers go in a row from the smallest finger up toward the pointer, matching 6, 7, 8, 9.", `Example: when the thumb touches the ${THUMB[ex]}, the number is ${ex}. Now do yours.`]
      };
    };
    make.teach = () => [
      { h: title, v: "🖐️", t: "For 6, 7, 8 and 9 the thumb touches one finger and the other three fingers stay up." },
      { h: "The pattern", v: "6 pinky, 7 ring, 8 middle, 9 pointer", t: "Start at the smallest finger for 6 and move toward the pointer finger for 9." },
      { h: "Tip", v: "💡", t: "Practice counting 6, 7, 8, 9 slowly with your own hand." }
    ];
    return { title, make };
  };
  const signMath = (title, mode) => {
    const make = () => {
      const sub = mode === "mix" && Math.random() < 0.5;
      let a = ri(6, 10), b = ri(3, 9);
      if (sub) { if (b >= a) b = a - ri(1, 4); return {
        text: `A friend signs the number <b>${a}</b>. Then they take away <b>${b}</b>. How many are left?`, visual: "🖐️", answer: a - b,
        hints: ["Taking away means the number gets smaller.", "Count back from the first number, one at a time.", "Example: 10 take away 4 leaves 6. Now do yours."]
      }; }
      return {
        text: `A friend signs the number <b>${a}</b>. Then they sign <b>${b}</b> more. How many in all?`, visual: "🖐️", answer: a + b,
        hints: ["Put the two numbers together.", "Start at the bigger number and count up the other one.", "Example: 8 and 5 more makes 13. Now do yours."]
      };
    };
    make.teach = () => [
      { h: title, v: "➕", t: "Number signs are the same as numbers you add and subtract in math. Read the sign, then do the math." },
      { h: "Worked example", v: "7 + 4 = 11", t: "Start at 7 and count up 4 more: 8, 9, 10, 11." },
      { h: "Tip", v: "💡", t: "Use your fingers and your head together." }
    ];
    return { title, make };
  };
  const FIRST = ["Maya", "Noah", "Ella", "Owen", "Ruby", "Liam", "Zara", "Theo", "Nora", "Jack", "Ivy", "Dean"];
  const LAST = ["Brooks", "Clark", "Davis", "Evans", "Foster", "Grant", "Hayes", "Jones", "Kelly", "Lopez", "Moore", "Reed", "Stone", "Young"];
  const initials = title => {
    const make = () => {
      const person = () => ({ f: pick(FIRST), l: pick(LAST) });
      const p = person(), ans = `${p.f[0]} - ${p.l[0]}`;
      const wr = new Set();
      while (wr.size < 2) { const q = person(), s = `${q.f[0]} - ${q.l[0]}`; if (s !== ans) wr.add(s); }
      wr.add(`${p.l[0]} - ${p.f[0]}`);
      const wrongs = [...wr].filter(x => x !== ans);
      return {
        text: `A Deaf friend is named <b>${p.f} ${p.l}</b>. Which letters do you fingerspell for the initials, in order?`, visual: "🏷️", choices: shuf([ans, ...S(wrongs, 2)]), answer: ans,
        hints: ["Initials are the first letters of the names.", "Take the first letter of the first name, then the first letter of the last name.", "Example: Sam Lee has the initials S - L. Now do yours."]
      };
    };
    make.teach = () => [
      { h: title, v: "🏷️", t: "Initials are the first letters of a person's names. In ASL you can fingerspell them quickly." },
      { h: "Worked example", v: "Sam Lee = S - L", t: "The first name starts with S and the last name starts with L, so the initials are S - L." },
      { h: "Tip", v: "💡", t: "Order matters. The first name comes first." }
    ];
    return { title, make };
  };
  const ACR = [
    "American Sign Language|ASL", "Americans with Disabilities Act|ADA", "Closed Captions|CC", "Video Relay Service|VRS", "Video Remote Interpreting|VRI",
    "National Association of the Deaf|NAD", "Registry of Interpreters for the Deaf|RID", "Teletypewriter|TTY"
  ].map(r => r.split("|"));
  const acronyms = title => {
    const make = () => {
      const [full, ab] = pick(ACR), others = ACR.filter(x => x[1] !== ab);
      const ex = pick([["Portable Document Format", "PDF"], ["Central Processing Unit", "CPU"], ["Television", "TV"]]);
      return {
        text: `Short names are often fingerspelled. What letters do you fingerspell for <b>${full}</b>?`, visual: "🔠", choices: shuf([UP(ab).split("").join(" - "), ...S(others, 2).map(x => UP(x[1]).split("").join(" - "))]), answer: UP(ab).split("").join(" - "),
        hints: ["Use the first letter of the important words.", `The short name has ${ab.length} letters.`, `Example: ${ex[0]} is fingerspelled ${ex[1].split("").join(" - ")}. Now do yours.`]
      };
    };
    make.teach = () => [
      { h: title, v: "🔠", t: "Many groups and laws have a long name and a short name made from first letters. Signers often fingerspell the short name." },
      { h: "Worked example", v: "ASL", t: "<b>A</b>merican <b>S</b>ign <b>L</b>anguage becomes A - S - L." },
      { h: "Tip", v: "💡", t: "Small words like \"of\" or \"the\" are often left out of the short name." }
    ];
    return { title, make };
  };

  // ================= LEVEL 7 =================
  const L7 = [
    SC("Five parts of a sign", "🧩", "Every sign is built from five parts: <b>handshape</b>, <b>location</b>, <b>movement</b>, <b>palm orientation</b> and <b>facial expression</b>. Change one part and the meaning can change.", "Think about what your hands, your body and your face each do when you sign.", "To describe a sign, you could say: the fist shape, near the chin, moving down, palm facing in, with a smile.", [
      "Which one is NOT a part of a sign?|Taste|Handshape|Movement|Location",
      "The shape your fingers make is the...|Handshape|Movement|Location",
      "Where a sign is made, like the chin or the chest, is its...|Location|Handshape|Facial expression",
      "How the hand travels, like a circle or a tap, is its...|Movement|Handshape|Palm orientation",
      "The way your palm faces is called...|Palm orientation|Location|Handshape",
      "Your eyebrows, eyes and mouth belong to the part called...|Facial expression|Handshape|Movement",
      "How many parts does a sign have?|Five|Two|Nine"
    ]),
    SC("Time lines", "⏳", "ASL signers often use a time line in the air. The past is behind you, the present is close to your body, and the future is in front of you.", "Picture a line going from behind your shoulder to far out in front of you.", "A signer can show 'a long time ago' by moving a hand far back over the shoulder.", [
      "A time sign that moves forward is often about...|The future|The past|Nothing",
      "A time sign that moves back toward the shoulder is often about...|The past|The future|The weather",
      "On a signer's time line, the future is...|In front of the signer|Behind the signer|Under the floor",
      "On a signer's time line, the past is...|Behind the signer|In front of the signer|Above the roof",
      "Which of these moves forward from the cheek?|Tomorrow|Yesterday|Both of them",
      "Which of these moves back from the cheek?|Yesterday|Tomorrow|Neither",
      "The sign for now is made...|Close to the body|Far away on the right|Behind a wall"
    ]),
    SC("Topic first", "🎯", "ASL often names the <b>topic</b> first, and then says something about it. For example: BOOK, ME LIKE. This is not wrong English. It is ASL grammar.", "Find the thing the signer is talking about. That is the topic.", "In COOKIE, ME WANT the topic is the thing that the signer is excited about.", [
      "In ASL you often sign the ___ first, then say something about it.|Topic|Ending|Joke",
      "BOOK, ME LIKE. What is the topic?|BOOK|LIKE|ME",
      "COOKIE, ME WANT. What is the topic?|COOKIE|WANT|ME",
      "DOG, BIG. What do we learn about the dog?|It is big|It is small|It is asleep",
      "PARK, ME GO. Where does the signer go?|The park|Home|School",
      "Is putting the topic first wrong in ASL?|No, it is a normal ASL pattern|Yes, always|Only on weekends",
      "SCHOOL, ME LIKE. What does the signer like?|School|Soccer|Nothing"
    ]),
    SC("Pointing is polite", "👉", "In ASL, pointing is a normal and polite way to say who you mean. Pointing at yourself means <b>me</b>, and pointing at a person means <b>you</b>, <b>he</b> or <b>she</b>.", "Think about how pointing works as a pronoun, like \"he\" or \"you\" in English.", "A signer points to a friend across the table and everyone knows who is being talked about.", [
      "Pointing at your own chest means...|Me|You|Them",
      "Pointing at a friend can mean...|You|Me|Nobody",
      "Is pointing at a person rude in ASL?|No, it is a normal way to say who|Yes, always|Only to teachers",
      "A signer points to a spot where a person stood earlier. They mean...|That person|A new place|A song",
      "ASL can use pointing in place of English words like...|He, she and you|Cat and dog|Red and blue",
      "Who can you point to when you want to say \"he\" or \"she\" and the person is not there?|A spot you chose in the air|A wall far away|A mirror"
    ]),
    readSpell("Read longer words", ["balloon", "giraffe", "blanket", "picture", "chicken", "dinosaur", "octopus", "village", "cabbage", "volcano"]),
    letterCount("Double letters", ["balloon", "pepper", "rabbit", "summer", "butter", "banana", "coffee", "tomato", "message", "mammal", "puppy", "bubble", "kitten", "giraffe"]),
    SC("Letters drawn in the air", "✍️", "Most letters stay still, but J and Z move. For J, start with the I handshape and draw a J. For Z, use your pointer finger to draw a Z in the air.", "Which letters have a path to follow, and which only have a shape?", "To fingerspell the word zoo you draw the first letter in the air, then hold the next two still.", [
      "Which two letters are drawn in the air?|J and Z|A and B|M and N",
      "To sign J you start with the handshape for...|I|T|W",
      "To sign Z you...|Draw a Z with your pointer finger|Make a fist and hold still|Clap",
      "Which letter has movement?|Z|B|M",
      "Which letter stays still?|M|J|Z",
      "In the word jazz, how many letters need movement?|3|1|4",
      "Which letter do you draw with the pinky up first?|J|K|L"
    ]),
    spellOrder("Which handshape comes when?", ["planet", "garden", "monkey", "window", "guitar", "turtle", "pencil", "castle", "dragon", "rocket", "banana", "orange"]),
    alphaNext("Alphabet order"),
    readDigits("Read number signs", 4),
    thumbFinger("Numbers 6 to 9"),
    signMath("Number sign math", "add"),
    initials("Initials"),
    SC("Gallaudet becomes a college", "🏛️", "In 1864, President Abraham Lincoln signed a law that let the school in Washington, D.C., give college degrees to Deaf students. The school later became Gallaudet University. Edward Miner Gallaudet, the son of Thomas Hopkins Gallaudet, was its first leader.", "Remember a year, a president, a city and a famous family name from this lesson.", "A student reads a short history card about a school and answers questions about who, where and when.", [
      "Which president signed the law for the college?|Abraham Lincoln|George Washington|Theodore Roosevelt",
      "In which year was the law signed?|1864|1964|1764",
      "In which city is the university?|Washington, D.C.|Chicago|Denver",
      "Edward Miner Gallaudet was the son of...|Thomas Hopkins Gallaudet|Laurent Clerc|Abraham Lincoln",
      "The school could now give...|College degrees|Pizza coupons|Free flights",
      "The school later became...|Gallaudet University|A museum of toys|A bakery"
    ]),
    SC("Deaf goodbyes", "👋", "In Deaf culture, goodbyes can take a long time. Friends share last news, make plans, and chat before they leave. This is a warm part of Deaf culture, because time together matters.", "Think about why a friendly chat might not end quickly.", "At a Deaf party, people keep chatting at the door for a while before they actually leave.", [
      "Deaf goodbyes are often...|Long, with lots of chatting|Over in one second|Silent and sudden",
      "Why can a goodbye take a while?|People enjoy sharing last news|They forgot how to sign|The doors are locked",
      "Deaf gatherings are places to...|Share news and stories in ASL|Be silent all night|Only watch TV",
      "At a Deaf club the main language is often...|ASL|Latin|Whistling",
      "Is it polite to leave in the middle of a signed story?|No, wait for a good moment|Yes, always|Only at night",
      "Taking time to say goodbye shows...|You care about your friends|You are angry|You are lost"
    ]),
    SC("Name signs", "🏷️", "A name sign is a special sign for a person, used instead of fingerspelling a whole name each time. Name signs are usually given by Deaf community members. Some use the first letter of the name (initialized), and some show something about the person (descriptive).", "Think about who gives name signs and what they are based on.", "A Deaf friend might give you a name sign from your first letter and something you love to do.", [
      "Who usually gives a name sign?|A member of the Deaf community|The person to themselves|A robot",
      "A name sign that uses the first letter of a name is called...|Initialized|Invisible|Alphabetical",
      "A name sign that shows how someone looks or acts is called...|Descriptive|Cooked|Loud",
      "Name signs are used instead of...|Fingerspelling the whole name every time|Doing homework|Eating",
      "If a hearing learner wants a name sign, they should...|Wait for a Deaf person to give one|Make one up and insist|Copy a friend's",
      "A name sign is a bit like a...|Special nickname gift|Password|Math fact"
    ]),
    SC("Hearing aids and implants", "🦻", "A hearing aid is a small device that makes sounds louder. A cochlear implant is a device that helps some people sense sound. Some Deaf people use these devices and some do not. It is each person's choice.", "Think about respect, choice and asking first.", "A friend might take off their hearing aid at a swimming pool, and that is okay.", [
      "A hearing aid is a small device that...|Makes sounds louder|Makes signs|Plays only music",
      "Do all Deaf people use hearing aids?|No, it is each person's choice|Yes, everyone does|No one does",
      "A cochlear implant is a device that...|Helps some people sense sound|Cooks dinner|Drives a car",
      "A person who uses a hearing aid can also...|Use ASL|Never sign|Lose their name",
      "Before touching someone's device you should...|Ask, because it is personal|Grab it|Hide it",
      "Who decides whether to use these devices?|The person and their family|A stranger|No one"
    ]),
    SC("Lip-reading is hard", "👄", "Lip-reading means watching the mouth to understand speech. It is hard, because many sounds look the same on the lips. The words pat, bat and mat can look almost the same. So lip-reading shows only part of what is said.", "Think about whether every word has its own clear shape on the lips.", "A shout across the room is not clear, but a friend facing you in good light is easier to follow.", [
      "Why is lip-reading hard?|Many sounds look alike on the lips|Lips never move|Words are secret",
      "Does lip-reading show every word clearly?|No, only part of what is said|Yes, every word|Only long words",
      "Why can a beard or a hand over the mouth make it harder?|The lips are hidden|Ears get cold|Words vanish",
      "Is lip-reading easy for all Deaf people?|No, it is hard and tiring|Yes, always|Only for kids",
      "What helps lip-reading a little?|Facing the person in good light|Turning away|Whispering",
      "A clearer way to talk with a Deaf person is...|Signing, writing or typing|Shouting|Humming"
    ])
  ];

  // ================= LEVEL 8 =================
  const L8 = [
    SC("ASL and Signed English", "🔀", "ASL is its own language with its own grammar. Signed English is a way of putting English word order onto signs, often with extra signs for endings. They are not the same thing.", "One of them follows English word order. The other has its own order and rules.", "A teacher might use signs while speaking English. That is different from ASL grammar.", [
      "Which one follows English word order?|Signed English|ASL|Neither",
      "Which one has its own grammar and word order?|ASL|Signed English|Neither",
      "Is ASL just English on the hands?|No, it is its own language|Yes, word for word|Only in school",
      "Signed English often adds signs for...|Word endings like -ing and -ed|Colors|Songs",
      "ASL uses space, face and movement as part of...|Its grammar|Its spelling tests|Its music",
      "Who uses ASL as a home language?|Many Deaf families|Only robots|Only pirates"
    ]),
    SC("Question words", "❓", "In ASL, a question word like WHAT, WHERE or WHO often comes at the end of the sentence: YOU NAME WHAT? A signer can also ask a <b>rhetorical question</b> and answer it right away, like: ME LATE, WHY? BUS LATE.", "Notice where the question word sits in the sentence and who answers the question.", "SCHOOL WHERE? is a way to ask where the school is.", [
      "In ASL a question word like WHAT or WHERE can come...|At the end of the sentence|Nowhere|Only in songs",
      "A signer asks WHY? and then answers it. This is a...|Rhetorical question|Mistake|Quiz",
      "YOU NAME WHAT? is asking...|What your name is|Where you live|How old you are",
      "A rhetorical question is used to...|Make a point clear|Be silly|Hide words",
      "Eyebrows for a WHAT or WHERE question go...|Down|Up|Away",
      "Eyebrows for a yes or no question go...|Up|Down|Sideways"
    ]),
    SC("Direction shows who", "↔️", "Some ASL verbs move in the air to show who does the action to whom. For example, the sign for GIVE moves from the giver toward the receiver. The direction is part of the grammar.", "Follow the path of the hand from the doer to the receiver.", "You give a book to a friend: the sign starts near you and ends near your friend.", [
      "The sign GIVE can move from the giver toward...|The receiver|The ceiling|The floor",
      "I give you and you give me are shown by changing...|The direction of the movement|The weather|The color",
      "Because the direction shows who does what to whom, signers can often skip...|Extra pronouns|All verbs|Faces",
      "A verb moving from you out toward a friend can mean...|I do it to you|You do it to me|We both sit",
      "A verb moving toward yourself can mean...|Someone does it to me|I do it to you|The end",
      "Direction in the air is part of ASL...|Grammar|Cooking|Music"
    ]),
    SC("Fingerspelling becomes signs", "🔁", "Some English words come into ASL through fingerspelling. After many people use them, the letters can blend and the movement gets smoother and shorter, until the word becomes a sign. These are called loan signs.", "Think about how a long word gets shorter when many people say it often.", "Think of how people say a long name quickly, so the sounds blend together.", [
      "When a fingerspelled word turns into a sign it often becomes...|Smoother and shorter|Louder|Longer",
      "Words come into ASL from English through...|Fingerspelling|Whistling|Drums",
      "A sign that began as fingerspelling is called a...|Loan sign|Crayon sign|Secret sign",
      "Do other languages borrow words too?|Yes, all languages do|No, only ASL|Never",
      "This shows that ASL...|Grows and changes like other languages|Cannot change|Is not real",
      "Fingerspelling in ASL is mostly used for...|Names and words without a sign|Every single word|Counting"
    ]),
    readSpell("Read place words", ["castle", "island", "forest", "bridge", "market", "museum", "desert", "meadow", "canyon", "harbor"]),
    spellCount("Count place names", ["New York", "Rock Park", "Blue Lake", "Sun Hill", "Rose Bay", "Pine Road", "Oak Street", "Maple Lane", "Lake Erie", "Green Hill"], "the place"),
    letterCount("Letter counting", ["mississippi", "coconut", "strawberry", "parallel", "tomorrow", "committee", "bookkeeper", "cinnamon", "paperwork"]),
    spellOrder("Find the handshape", ["elephant", "kangaroo", "triangle", "mountain", "notebook", "airplane", "playground", "sandwich", "umbrella"]),
    readDigits("Longer number signs", 5),
    signMath("Add and take away", "mix"),
    SC("The first TTY", "⌨️", "TTY stands for teletypewriter. In 1964, Robert Weitbrecht, a Deaf scientist, invented a device that let typed messages travel over telephone lines. It helped Deaf people use the phone for the first time in a new way. Today text messages and video calls do much of this work.", "Think about who invented it, what it carried and what replaced it.", "A Deaf family could type a message and read the reply on a small screen.", [
      "What does TTY stand for?|Teletypewriter|Tiny tiger|Ten tall yaks",
      "In which year did Robert Weitbrecht invent his device?|1964|1864|2004",
      "Robert Weitbrecht was a Deaf...|Scientist|Chef|Pilot",
      "The TTY sent typed messages over...|Telephone lines|Rivers|Rainbows",
      "Today many Deaf people use ___ instead of TTYs.|Texts and video calls|Carrier pigeons|Paper airplanes",
      "A TTY made it possible for Deaf people to...|Use the telephone in a new way|Hear music|Bake bread"
    ]),
    SC("Captions", "💬", "Captions are words on a screen that show what is said and also describe important sounds, like [music]. CC means closed captions. Closed captions can be turned on or off. Open captions are always on and cannot be turned off.", "Think about which kind you can switch and which kind is always there.", "A movie shows [door creaks] on the screen, so a Deaf viewer knows what the sound was.", [
      "CC stands for...|Closed captions|Cool cats|Clear colors",
      "Closed captions can be...|Turned on or off|Eaten|Folded",
      "Open captions are...|Always showing|Hidden forever|Only on Tuesday",
      "Captions often describe sounds like...|[music] or [door closes]|Smells|Colors",
      "Who is helped by captions?|Deaf people and many others|Only cats|Only pilots",
      "Captions are shown as...|Words on the screen|Smoke|Flags"
    ]),
    SC("The Milan meeting", "📜", "In 1880, a group of teachers met in Milan, Italy. Most of them voted that Deaf students should learn speech instead of sign language. After this, many schools stopped using sign in classrooms for a long time. Deaf people kept signing with friends and in Deaf clubs, and sign languages survived.", "Remember where the meeting was, what was decided and what Deaf people did next.", "Even if a rule says no signing at school, friends can still sign to each other in the yard.", [
      "In which city was the meeting in 1880?|Milan|Rome|Vienna",
      "In which year was the meeting?|1880|1780|1980",
      "Most voted that Deaf students should learn...|Speech instead of sign|More sign|Music",
      "After the meeting many schools...|Pushed sign out of classrooms|Added more sign classes|Closed forever",
      "Did Deaf people stop signing?|No, they kept signing together|Yes, everyone stopped|They all moved away",
      "Today we know sign languages are...|Real, full languages|Games|Mistakes"
    ]),
    SC("William Stokoe", "🔬", "William Stokoe was a hearing professor at Gallaudet. In 1960 he wrote a paper showing that ASL is a real language with its own structure. He studied parts of signs like handshape, location and movement. In 1965 he helped publish the first dictionary of ASL based on how signs are built.", "Think about the question he answered: is ASL a real language?", "A scientist looks closely at a language and finds its rules.", [
      "William Stokoe worked at...|Gallaudet|A circus|A bakery",
      "In 1960 he showed that ASL is...|A real language|Only gestures|A game",
      "He studied parts of signs like...|Handshape, location and movement|Colors and shapes of shoes|Sneezes and coughs",
      "In which year did the first ASL dictionary he helped write come out?|1965|1865|2065",
      "Stokoe's work helped people see that ASL has its own...|Rules and structure|Songs|Flavors",
      "Stokoe's work changed how people thought about...|Sign languages|Volcanoes|Spaceships"
    ]),
    SC("Marlee Matlin", "🎬", "Marlee Matlin is a Deaf actress. In 1987 she won an Academy Award (an Oscar) for Best Actress for the movie Children of a Lesser God. She was the first Deaf performer to win an Oscar. She has used her fame to show that Deaf people can be actors and leaders.", "Remember who she is, what she won and what it shows.", "A Deaf child watches a movie and sees a Deaf actress, and thinks: I can be an actor too.", [
      "Marlee Matlin is a...|Deaf actress|Pilot|Chef",
      "She won an...|Academy Award, called an Oscar|Spelling bee|Swimming race",
      "In which year did she win?|1987|1887|2037",
      "Which movie did she win for?|Children of a Lesser God|Toy Story|Jaws",
      "She was the first Deaf performer to...|Win an Oscar|Climb a tree|Ride a horse",
      "Her win shows that Deaf people can be...|Actors and leaders|Only quiet|Only teachers"
    ]),
    SC("Seeing each other well", "💡", "Signing needs good sight. Deaf people sit in a circle or a U-shape so everyone can see. A signer wants light on their face and hands, with no bright window behind them. Plain clothes that contrast with skin make hands easier to see.", "Picture what makes hands and faces easy to see.", "Move your chair so the window is beside you, not behind the signer.", [
      "How do people sit so everyone can see each other sign?|In a circle or U-shape|In one long line|Back to back",
      "Where should the light be?|On the signer's face and hands|Behind the signer|In the dark",
      "A bright window behind the signer makes it...|Hard to see their face|Easier to see|Quieter",
      "Plain clothes help because...|Hands show up clearly|They make noise|They are warm",
      "A busy striped shirt can make signing...|Harder to watch|Easier to watch|Louder",
      "A good seat for watching a signer is...|With a clear view of their face and hands|Behind a pole|Under the table"
    ]),
    SC("Interpreter manners", "🧑‍🤝‍🧑", "When an interpreter helps, speak at a normal pace, one person at a time. The interpreter is a few seconds behind, so wait a moment. Talk to the Deaf person using \"you\", not \"tell him\". The interpreter only passes the message along.", "Think about who is talking and who is helping.", "Say \"How was your day?\" to your Deaf friend, not \"Ask her how her day was.\"", [
      "One person at a time speaks because...|The interpreter can only follow one voice|Quiet is good|Noise is rare",
      "The interpreter is a few seconds behind, so you should...|Wait a moment|Shout|Leave",
      "To the Deaf person you say...|\"How are you?\"|\"Ask her how she is\"|Nothing",
      "An interpreter's job is to...|Pass the message along|Give their own opinions|Take over",
      "If you speak too fast the interpreter might...|Ask you to slow down|Fall asleep|Fly",
      "Where do you look?|At the Deaf person|At the floor|Out the window"
    ]),
    SC("Lookalike letters", "👀", "Some hand letters look alike. M and N both tuck the thumb under fingers: M has three fingers over the thumb and N has two. U and V both have two fingers up: U together, V apart. K and P use the same fingers, but P points down. G and Q both use a pointer and thumb, but Q points down.", "Look for what is different: how many fingers, apart or together, up or down.", "A and S are both fists. The thumb tells them apart: at the side for A, across the front for S.", [
      "M has ___ fingers over the thumb.|Three|Two|Four",
      "Which letter has two fingers together, pointing up?|U|V|W",
      "Which letter has two fingers up and apart?|V|U|M",
      "K and P use the same fingers, but P points...|Down|Up|Behind",
      "Q is like G, but it points...|Down|Up|Away",
      "A and S are both fists. What is different?|The thumb|The size|The color",
      "Which letter uses the pinky finger and makes a J path?|J|N|Q"
    ])
  ];

  // ================= LEVEL 9 =================
  const L9 = [
    SC("Signs can vary", "🗺️", "Not all signers use the exact same signs. Signs can differ by region, age and community, a bit like accents and dialects in spoken languages. Black ASL is a variety of ASL with its own history. A different sign is not wrong.", "Think about accents. People say things differently, and all of them are valid.", "A friend from another state shows you their sign for a word. You smile and ask them to show you again.", [
      "Do all signers in the United States use exactly the same signs?|No, signs can differ by region|Yes, always|Only twins do",
      "Different signs for the same thing are like...|Accents and dialects|Typos|Songs",
      "Black ASL is...|A variety of ASL with its own history|Not real|A cartoon",
      "If you see a new sign for a word you know, you should...|Ask about it with curiosity|Say it is wrong|Laugh",
      "Why do signs differ in different places?|Communities made their own signs over time|Hands got tired|Colors changed",
      "Are regional signs wrong?|No, they are all part of the language|Yes, only one is right|They are mistakes"
    ]),
    SC("Many sign languages", "🌍", "The United Nations says there are more than 300 different sign languages in the world. There is no one sign language for everyone. The International Day of Sign Languages is on September 23. It celebrates sign languages and Deaf cultures.", "Think about the numbers and the date from this lesson.", "A Deaf student in Canada, Japan or Brazil may use a different sign language from ASL.", [
      "How many sign languages are there?|More than 300|Only 3|Exactly 1",
      "Is there one sign language that everyone uses?|No|Yes|Yes, only ASL",
      "In which month is the International Day of Sign Languages?|September|March|December",
      "Which day of the month is it?|The 23rd|The 3rd|The 12th",
      "ASL and British Sign Language are...|Different languages|The same|Both spoken",
      "Why is there a day for sign languages?|To celebrate them and Deaf cultures|To sell shoes|To ban noise"
    ]),
    SC("No \"is\" in ASL", "✂️", "ASL usually leaves out words like <b>is</b>, <b>am</b> and <b>are</b>. In gloss, \"I am happy\" is written ME HAPPY, and \"The dog is big\" is written DOG BIG. This is normal in ASL.", "Look for the shortest sentence that still has all the meaning.", "\"She is tall\" in gloss is written SHE TALL.", [
      "How is \"I am happy\" written in gloss?|ME HAPPY|ME AM HAPPY|ME BE HAPPY",
      "ASL usually leaves out words like...|Is, am and are|Hands|Names",
      "How is \"The dog is big\" written in gloss?|DOG BIG|DOG IS BIG|DOG BEING BIG",
      "How is \"You are kind\" written in gloss?|YOU KIND|YOU ARE KIND|YOU BE KIND",
      "Is leaving out \"is\" a mistake in ASL?|No, it is how ASL works|Yes, always|Only on Mondays",
      "Which gloss is natural ASL?|FRIEND NICE|FRIEND IS NICE|FRIEND BEING NICE"
    ]),
    SC("If, then", "🤨", "To show a condition like \"if\", a signer raises their eyebrows (and often tilts the head) during the first part of the sentence. Then the face relaxes for the rest. IF RAIN, STAY HOME.", "Find the part that begins the \"if\" and gets the raised eyebrows.", "In IF TIRED, SLEEP the \"if\" part is TIRED.", [
      "Raised eyebrows on the first part can show...|An \"if\" idea|Goodbye|A color",
      "IF RAIN, STAY HOME. Which part has raised eyebrows?|RAIN|HOME|Neither",
      "IF HUNGRY, EAT. What is the condition?|HUNGRY|EAT|Nothing",
      "IF SUNNY, PARK GO. What do we do if it is sunny?|Go to the park|Stay in bed|Swim at night",
      "Facial grammar like this is part of...|ASL grammar|A game|A snack",
      "In IF COLD, COAT WEAR what is the result?|Wear a coat|Eat ice cream|Go swimming"
    ]),
    SC("Showing time", "📅", "In ASL you often sign a time word once and the whole story stays in that time. YESTERDAY ME PLAY, EAT, SLEEP means all three things happened yesterday. When the time changes, you sign a new time word.", "The time word at the start tells you when everything happens.", "TOMORROW ME SCHOOL GO. The time word is at the start, so the going is tomorrow.", [
      "YESTERDAY ME PLAY, EAT, SLEEP. When did all this happen?|Yesterday|Tomorrow|Next year",
      "In ASL, time is often shown with...|A time sign at the start|Endings on every verb|Silence",
      "Do you need to sign YESTERDAY again before each action?|No, the time stays until it changes|Yes, every word|Never",
      "TOMORROW ME SCHOOL GO. When do you go?|Tomorrow|Yesterday|Last year",
      "English adds -ed to show the past. ASL uses...|Time signs|Colors|Rhymes",
      "A new time sign in a story shows...|The time has changed|A mistake|The end of the language"
    ]),
    SC("The face says how", "😮", "The face does more than show feelings. A bigger sign with a stronger face can show more or very. A small, gentle sign with a calm face can show less. The same sign with different faces can mean different things.", "Think about how big or small the sign and the face are.", "A big sign with wide eyes for \"big\" shows something very big.", [
      "A bigger sign with a stronger face often shows...|More or very|Less|Nothing",
      "A small, gentle sign with a calm face can show...|Less intensity|More intensity|A shout",
      "Is facial expression just decoration in ASL?|No, it is part of the grammar|Yes, only decoration|Only for jokes",
      "The same sign with different faces can change...|The meaning or feeling|Nothing|The alphabet",
      "When someone signs to you, where do you mostly look?|At their face|At their knees|Away",
      "Why must you see the signer's face?|It carries meaning|It is hidden anyway|It tells the time"
    ]),
    readSpell("Read long words", ["telephone", "adventure", "chocolate", "beautiful", "elephant", "umbrella", "triangle", "mountain", "butterfly", "basketball"]),
    letterCount("Count the letter", ["bookkeeper", "successful", "assistant", "necessary", "possession", "millennium", "mississippi", "tennessee", "cappuccino", "hippopotamus"]),
    spellOrder("Order of the handshapes", ["telephone", "adventure", "chocolate", "beautiful", "elephant", "umbrella", "triangle", "mountain", "butterfly", "basketball"]),
    readDigits("Phone numbers", [6, 7]),
    acronyms("Fingerspelled short names"),
    SC("Access services", "🖥️", "There are different ways to give Deaf people access. VRI (Video Remote Interpreting) puts an interpreter on a screen. VRS (Video Relay Service) lets a Deaf person sign to a video interpreter, who then calls a hearing person. CART (real-time captioning) turns speech into typed words on a screen at once.", "Think about whether the help is signed or typed, and who is on the screen.", "In a meeting, someone types everything said so it appears as words on a screen.", [
      "CART turns speech into...|Typed words on a screen right away|Dance|Smoke signals",
      "VRI puts an interpreter...|On a screen|On the roof|Under a table",
      "VRS lets a Deaf person sign to...|A video interpreter who calls someone|A pet|A statue",
      "Which one uses typed words?|CART|VRI|Fingerspelling",
      "Which one shows a signing interpreter on video?|VRI|CART|A thermometer",
      "These services help Deaf people...|Take part in conversations|Avoid everyone|Sleep"
    ]),
    SC("Deaflympics", "🏅", "The Deaflympics are sports games for Deaf athletes. The first games were held in Paris, France, in 1924. At the games, starting signals are visual, using flags or flashing lights instead of only sound.", "Think about the city, the year and how races start without sound.", "A runner sees a flash of light at the start line and bursts forward.", [
      "The Deaflympics are sports games for...|Deaf athletes|Only pilots|Only dogs",
      "In which year were the first Deaflympics?|1924|1824|2024",
      "In which city were the first Deaflympics?|Paris|Sydney|Cairo",
      "How can a race start without sound?|With a flash of light or a flag|With a drum only|With a whisper",
      "In which country were the first games?|France|Japan|Peru",
      "The Deaflympics show that Deaf people can be...|Great athletes|Only watchers|Bored"
    ]),
    SC("DeafSpace", "🏢", "Gallaudet University studied how to design buildings for people who sign. This is called DeafSpace. It uses wide hallways so people can sign while walking side by side, open spaces and seats in curves so everyone can see each other, and soft, even lighting without glare.", "Picture a building where signers can always see each other's hands and faces.", "A round table in a bright room lets everyone see everyone's face.", [
      "Wide hallways help signers to...|Sign while walking side by side|Run races|Hide",
      "Seats arranged in a curve help everyone...|See each other|Sleep|Stay quiet",
      "Which light is best for signing?|Soft, even light without glare|A flashlight in the face|No light",
      "Where did the DeafSpace ideas come from?|Gallaudet University|A cooking show|A circus",
      "DeafSpace is about designing...|Buildings that work well for signers|Cars|Airplanes",
      "A round table is good for signing because...|Everyone can see everyone's face|It is noisy|It has corners"
    ]),
    SC("Music for everyone", "🎵", "Many Deaf people enjoy music through vibration, rhythm and watching performers. At concerts, ASL interpreters can sign the song with their hands, face and whole body. Some fans hold balloons to feel the beat. Good seats let the audience see the interpreter.", "Think about what a person can see and feel at a concert.", "A fan holds a balloon near the speaker and feels the drumbeat as it shakes.", [
      "How can Deaf fans feel a beat at a concert?|Through vibrations|By tasting|Through a book",
      "A balloon helps a person feel...|Vibrations from the music|The weather|The time",
      "At a concert, an ASL interpreter signs...|The song and the feeling|The weather forecast|Nothing",
      "A good place for the interpreter is...|Where the Deaf audience can see them|Behind a curtain|In the car park",
      "Interpreters for music use their...|Hands, face and whole body|Only a drum|Only a flute",
      "Do many Deaf people enjoy music?|Yes, in their own ways|No, never|Only on Mondays"
    ]),
    SC("ABC stories", "🔤", "An ABC story is a story told in ASL using the handshapes of the alphabet in order, from A to Z. Each part of the story uses the next letter's handshape. Number stories do the same with number handshapes. They are a Deaf art form.", "Think about what stays the same: the order of handshapes.", "A short story might use the A handshape first, then B, then C, and so on.", [
      "An ABC story uses handshapes of the alphabet...|In order from A to Z|At random|Only vowels",
      "An ABC story starts with the handshape for...|A|Z|M",
      "An ABC story ends with the handshape for...|Z|A|M",
      "A number story uses...|Number handshapes in order|Colors|Only fingerspelling",
      "ABC stories are a kind of...|Deaf art|Math test|Weather report",
      "To tell an ABC story you need to know...|The alphabet handshapes|Only spoken words|Nothing"
    ]),
    SC("Bilingual learning", "📚", "Many Deaf children learn ASL as a first language and English as a second language, through reading and writing. This is called bilingual education. Learning a first language early is important for every child.", "Think about two languages helping each other.", "A Deaf student signs a story in ASL and then writes it in English.", [
      "In bilingual education, a Deaf child learns...|ASL and English|Only music|Only math",
      "A Deaf child often learns English through...|Reading and writing|Only hearing|Only magic",
      "Which language is often the first language?|ASL|Latin|Whistling",
      "Why is early language important?|It helps a child learn and think|It is not|It makes homework disappear",
      "Learning two languages is...|A strength|A problem|Impossible",
      "A Deaf student can show a story in ASL, then write it in...|English|Morse code|Smoke signals"
    ]),
    SC("Protactile", "🤲", "DeafBlind people can be both Deaf and unable to see well. The DeafBlind community created Protactile, a way of communicating through touch. People use taps, touches and shapes on each other's hands, arms, shoulders and backs to share information, and to say \"yes, I understand\".", "Think about touch taking the place of watching.", "A friend taps your shoulder twice so you know they heard what you said.", [
      "Protactile is a way of communicating through...|Touch|Smell|Colors",
      "Who created Protactile?|The DeafBlind community|Pirates|Chefs",
      "In Protactile, a friend might tap a shoulder to say...|\"I understand\"|\"Goodbye forever\"|\"It is raining\"",
      "DeafBlind people are people who...|Cannot see well and cannot hear well|Always sleep|Love only math",
      "Which place on the body might be used for touch signals?|Back, arm or shoulder|The sky|A shoe",
      "Touch communication helps DeafBlind people to...|Share information and feelings|Skip school|Fly"
    ])
  ];

  Object.assign(SIGN_LEVELS, {
    7: lvl(7, L7, [0, 1, 2, 4, 5, 7, 9, 13, 15]),
    8: lvl(8, L8, [0, 1, 2, 4, 6, 8, 10, 12, 14]),
    9: lvl(9, L9, [0, 1, 3, 4, 6, 8, 10, 11, 13])
  });
})();
