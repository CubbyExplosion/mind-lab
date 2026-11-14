// ext/sign-13-15.js  Mind Lab Sign Language (ASL), levels 13-15 (60 lessons)
// Only things we are sure about: fingerspelling, number signs, ASL grammar ideas, Deaf culture, history and etiquette.
(() => {
  const S = (a, n) => shuf(a).slice(0, n);
  const UP = s => String(s).toUpperCase();
  const lead = s => String(s).replace(/<[^>]+>/g, "").replace(/^[^A-Za-z0-9]+/, "")[0].toUpperCase();
  const NUMW = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const ORD = ["", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];

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
      { h: "Remember these", v: pairs.slice(0, 8).map(p => `${p.e ? p.e + " " : ""}<b>${p.t}</b>: ${p.d}`).join("<br>"), t: "Read each one slowly and say it in your own words." },
      { h: "Tip", v: "💡", t: tip }
    ];
    return { title, make };
  };
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
      { h: "Worked example", v: "T - R - A - I - N", t: "T, R, A, I, N. Put them together and you get <b>train</b>." },
      { h: "Tip", v: "💡", t: "Read the rhythm of the whole word, not each letter alone. Say the word in your head as soon as you can guess it." }
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
      { h: "Worked example", v: "G-A-R-D-E-N = 6", t: "The word <b>garden</b> has six letters, so you make six handshapes." },
      { h: "Tip", v: "✋", t: "Count by touching each letter with your finger. Counting out loud helps too." }
    ];
    return { title, make };
  };
  const letterKind = (title, words, consonants, note) => {
    const make = () => {
      const w = pick(words), vs = w.split("").filter(c => "aeiou".includes(c)).length, n = consonants ? w.length - vs : vs;
      return {
        text: `A friend fingerspells <b>${UP(w).split("").join(" - ")}</b>. How many ${consonants ? "consonants" : "vowels"} are in the word?`, visual: "🔠", answer: n,
        hints: [consonants ? "Consonants are all the letters that are not vowels." : "Only some letters are vowels.", consonants ? "The vowels are A, E, I, O and U. Count the other letters." : "The vowels are A, E, I, O and U. Look for them in the word.", `Example: in the word ${consonants ? "moon, M and N are consonants, so that is 2" : "moon, the two O letters are vowels, so that is 2"}. Now do yours.`]
      };
    };
    make.teach = () => [
      { h: title, v: "🔠", t: note },
      { h: "Vowels and consonants", v: "A E I O U", t: "The vowels are <b>A, E, I, O, U</b>. Every other letter of the alphabet is a consonant." },
      { h: "Tip", v: "💡", t: "Go through the word from left to right and make a tally mark each time you see the kind you are counting." }
    ];
    return { title, make };
  };
  const readYears = () => {
    const make = () => {
      const a = pick([19, 19, 20]), b = a === 20 ? ri(0, 25) : ri(10, 99), bs = String(b).padStart(2, "0");
      return {
        text: `A friend signs a year as two numbers: <b>${a}</b> and then <b>${bs}</b>. Type the four-digit year.`, visual: "📅", textInput: true, answer: `${a}${bs}`,
        hints: ["Years are often signed as two pairs of digits, one pair after the other.", "Put the two pairs of digits side by side, in the same order you saw them.", "Example: 17 and then 76 makes the year 1776. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Signing years", v: "📅", t: "A year is usually signed as two pairs of numbers. For 1987 you sign 19, then 87." },
      { h: "Worked example", v: "20 + 15", t: "Twenty, then fifteen is the year <b>2015</b>. For years like 2005 the second pair is 05." },
      { h: "Tip", v: "💡", t: "Write down the first pair and then the second pair. Keep the order." }
    ];
    return { title: "Signing years", make };
  };
  const readDigits = (title, len, note) => {
    const make = () => {
      const n = ri(len[0], len[1]), d = Array.from({ length: n }, () => ri(1, 9)), ans = d.join("");
      return {
        text: `A friend signs these number signs one after another:<br><b>${d.map(x => NUMW[x]).join(" - ")}</b><br>Type the number you read.`, visual: "🔢", textInput: true, answer: ans,
        hints: ["Turn each number word into its digit, in the same order.", "Write each digit as soon as you read it, and do not skip any.", "Example: two - five - eight - one is the number 2581. Now do yours."]
      };
    };
    make.teach = () => [
      { h: title, v: "🔢", t: note },
      { h: "Worked example", v: "6 - 0 - 2 - 4", t: "Six, zero, two, four makes <b>6024</b>. Zero counts as a digit too." },
      { h: "Tip", v: "💡", t: "Read in small chunks. Hold each chunk in your head, then write it." }
    ];
    return { title, make };
  };
  const signMul = () => {
    const make = () => {
      const a = ri(3, 12), b = ri(3, 12);
      return {
        text: `A friend signs two numbers and then the sign for <b>times</b>: <b>${a}</b> times <b>${b}</b>. What is the answer?`, visual: "✖️", answer: a * b,
        hints: ["Times means groups of the same size.", "Think of it as adding one number to itself, again and again.", "Example: 6 times 4 is 4+4+4+4+4+4 = 24. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Number sign math", v: "✖️", t: "You can read number signs and do math with them. Read both numbers first, then work out the answer." },
      { h: "Worked example", v: "5 × 7 = 35", t: "Five groups of seven is <b>35</b>." },
      { h: "Tip", v: "💡", t: "Use facts you know, like 5 times a number, and add or subtract from there." }
    ];
    return { title: "Number sign math: times", make };
  };
  const pattern = () => {
    const make = () => {
      const t = pick(["add", "add", "sub", "dbl"]);
      let seq, nx;
      if (t === "add") { const s = ri(2, 20), d = ri(2, 9); seq = [0, 1, 2, 3].map(i => s + d * i); nx = s + d * 4; }
      else if (t === "sub") { const d = ri(2, 8), s = ri(40, 60); seq = [0, 1, 2, 3].map(i => s - d * i); nx = s - d * 4; }
      else { const s = ri(1, 5); seq = [0, 1, 2, 3].map(i => s * 2 ** i); nx = s * 16; }
      return {
        text: `A friend signs these numbers in a row: <b>${seq.join(", ")}</b>, and then stops. What number comes next?`, visual: "🔢", answer: nx,
        hints: ["Look at how each number changes to the next one.", "Check whether the same amount is added or taken away each time, or whether the numbers keep doubling.", "Example: 3, 6, 12, 24 doubles every time, so the next one is 48. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Number patterns", v: "🔢", t: "A pattern follows a rule. To read a pattern in number signs, find the rule first." },
      { h: "Worked example", v: "5, 9, 13, 17", t: "Each number is 4 more than the one before, so the next is <b>21</b>." },
      { h: "Tip", v: "💡", t: "Check the rule with two or three pairs of numbers before you trust it." }
    ];
    return { title: "Number patterns", make };
  };
  const rate = () => {
    const make = () => {
      const r = ri(2, 6), s = pick([10, 12, 15, 20, 30]), n = r * s;
      return {
        text: `A signer fingerspells <b>${n}</b> letters in <b>${s}</b> seconds, at a steady speed. How many letters is that in one full minute?`, visual: "⏱️", answer: r * 60,
        hints: ["Find how many letters the signer makes in one second first.", "A minute is a number of seconds that you know. Multiply the speed per second by it.", "Example: 40 letters in 10 seconds is 4 letters a second, so 240 letters in a minute. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Fingerspelling speed", v: "⏱️", t: "Fast fingerspellers can make several letters every second. Speed is a rate: how much happens in a set time." },
      { h: "Worked example", v: "30 ÷ 10 = 3", t: "30 letters in 10 seconds is 3 letters a second. In 60 seconds that is <b>180</b>." },
      { h: "Tip", v: "💡", t: "Clear is better than fast. A message nobody can read is not a message." }
    ];
    return { title: "Fingerspelling speed", make };
  };
  const percent = () => {
    const make = () => {
      const n = pick([10, 20, 25, 50]), k = ri(1, n - 1);
      return {
        text: `In a club of <b>${n}</b> students, <b>${k}</b> know how to sign. What percent of the club signs?`, visual: "📊", answer: k * 100 / n,
        hints: ["Percent means out of one hundred.", "Find what fraction of the club signs, then change it to a fraction out of one hundred.", "Example: 3 of 10 students is 30 out of 100, so 30 percent. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Percent of a group", v: "📊", t: "A percent tells how many out of every 100. It helps you compare groups of different sizes." },
      { h: "Worked example", v: "6 of 20 = 30%", t: "6 out of 20 is the same as 30 out of 100, so it is <b>30 percent</b>." },
      { h: "Tip", v: "💡", t: "Multiply the top and bottom of the fraction by the same number to make the bottom 100." }
    ];
    return { title: "Percent of the club", make };
  };
  const letterSum = () => {
    const W = ["bed", "cab", "bad", "fed", "age", "dig", "hid", "aid", "lab", "bag", "deaf", "sign", "hand", "face", "game", "code"];
    const make = () => {
      const w = pick(W), sum = w.split("").reduce((t, c) => t + c.charCodeAt(0) - 96, 0);
      return {
        text: `In the alphabet, A is 1, B is 2, C is 3, and so on. Fingerspell <b>${UP(w).split("").join(" - ")}</b>. What is the total of the letter numbers?`, visual: "🔠", answer: sum,
        hints: ["First find each letter's place in the alphabet.", "Write down the place number for each letter, then add them all.", "Example: BAD is 2 + 1 + 4 = 7. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Alphabet math", v: "🔠", t: "Each letter has a place in the alphabet: A is 1, B is 2, and Z is 26. You can add letter numbers like any other numbers." },
      { h: "Worked example", v: "C+A+B = 6", t: "C is 3, A is 1 and B is 2. The total is <b>6</b>." },
      { h: "Tip", v: "💡", t: "Learn a few anchors: E is 5, J is 10, O is 15, T is 20. Count from the nearest one." }
    ];
    return { title: "Alphabet math", make };
  };
  const spellAt = () => {
    const W = ["planet", "garden", "teacher", "friend", "rabbit", "circle", "pencil", "bridge", "window", "orange", "thunder", "picture", "journey", "library"];
    const make = () => {
      const w = pick(W), i = ri(1, w.length - 1), c = UP(w[i]);
      const wr = S("AEIOURSTLNMDPCBGH".split("").filter(x => x !== c), 2);
      return {
        text: `A friend fingerspells <b>${UP(w)}</b>. Which letter is the <b>${ORD[i + 1]}</b> handshape?`, visual: "✋", choices: shuf([c, ...wr]), answer: c,
        hints: ["Start counting from the first letter on the left.", `The word has ${w.length} letters. Touch each one as you count to the place you need.`, "Example: in the word MOON, the second letter is O. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Which handshape comes when?", v: "✋", t: "Fingerspelling goes in order. Knowing the place of each letter helps you read and remember words." },
      { h: "Worked example", v: "S-U-N-S-E-T", t: "In <b>sunset</b>, the first handshape is S and the fourth is S again." },
      { h: "Tip", v: "💡", t: "Count on your fingers if it helps." }
    ];
    return { title: "Which letter is where?", make };
  };

  // ================= LEVEL 13 =================
  const L13 = [
    readSpell("Read long words", ["umbrella", "elephant", "mountain", "calendar", "triangle", "treasure", "notebook", "backpack", "football", "sandwich", "birthday", "lightning", "keyboard", "hospital"], "Longer words are easier when you watch the rhythm. Let your eyes see the whole word instead of single letters."),
    SC("Village sign languages", "🏘️", "Sometimes many people in one small community are Deaf. They and their hearing neighbors may build a full sign language together. Kata Kolok grew in a village in Bali, Indonesia. Al-Sayyid Bedouin Sign Language grew in a community in Israel.", "Think about what a language needs to grow: people who use it with each other every day.", "A new game gets rules when a group plays it together every day.", [
      "A village sign language grows when...|A community signs together every day|One person signs alone|A book is printed",
      "Kata Kolok is a sign language from a village in...|Bali, Indonesia|Antarctica|Iceland",
      "Al-Sayyid Bedouin Sign Language is used in a community in...|Israel|Peru|Canada",
      "In these villages, hearing neighbors often...|Sign too|Never talk to Deaf people|Move away",
      "Village sign languages are real languages because they have...|Their own grammar and many words|No rules|Only pictures",
      "These stories show that...|Communities can grow a full language of signs|Only writing makes a language|A language needs a big school first"
    ]),
    letterKind("Count the vowels", ["education", "interpreter", "community", "alphabet", "language", "beautiful", "adventure", "important", "question", "different", "conversation", "celebrate"], false, "A fun way to practice reading fingerspelling is to look for certain letters inside words, like vowels."),
    SC("Video relay", "💻", "A Deaf person can use a video relay service (VRS) to make phone calls. The Deaf caller signs on a video screen to an interpreter. The interpreter phones the hearing person, speaks for the caller, and signs back what the hearing person says.", "Picture who talks to whom: the caller, the interpreter and the person on the phone. Who needs the sign and who needs the voice?", "A translator at a meeting passes messages between two people who speak different languages.", [
      "In video relay, the Deaf caller signs to...|An interpreter on a video screen|A radio|A mailbox",
      "The interpreter then...|Phones the hearing person and speaks|Writes a letter|Hides the screen",
      "VRS stands for...|Video relay service|Very rapid signs|Voice and radio system",
      "For a good relay call, the Deaf caller should...|Sit in good light with hands and face in view|Sit in the dark|Cover the camera",
      "Video relay is useful because...|Deaf and hearing people can talk by phone|It plays music|It cooks dinner",
      "Before video, many Deaf people used phone machines called...|TTYs that send typed text|Telescopes|Record players"
    ]),
    SC("Interpreter ethics", "⚖️", "Interpreters follow a code of conduct. The Registry of Interpreters for the Deaf (RID), which began in 1964, helps set standards. A good interpreter keeps private things private, interprets faithfully and fairly, and does not add opinions.", "Ask yourself what makes people trust an interpreter with an important conversation.", "A fair referee does not play for one team and does not change the rules.", [
      "Confidential means an interpreter...|Keeps private things private|Tells friends the story|Posts it online",
      "A good interpreter signs and speaks...|What was really said|Only the funny parts|Their own opinions",
      "Impartial means the interpreter...|Does not take sides|Always argues|Picks a favorite",
      "If an interpreter does not understand something, they...|Ask for it to be repeated|Make something up|Walk away",
      "RID is a group that helps set standards for...|Interpreters|Bakers|Pilots",
      "An interpreter's goal is to...|Help both sides understand each other|Win the argument|Talk the most"
    ]),
    readYears(),
    SC("Signals without sound", "🤿", "Not every set of hand signals is a full language. Scuba divers use a few signals because talking underwater is hard. Some monks used signs during times of silence. Plains Sign Talk helped nations with different spoken languages to talk to each other.", "Compare a small set of signals with a full language that has grammar and thousands of words.", "A traffic light has just three signals, but English has thousands of words.", [
      "Scuba divers use hand signals because...|Talking underwater is hard|Fish are shy|It is a secret",
      "Some monks used signs during...|Times of silence|Loud concerts|Races",
      "Plains Sign Talk helped nations with different spoken languages to...|Talk to each other|Print newspapers|Fly kites",
      "Is every set of hand signals a full language like ASL?|No, many are small sets of signals|Yes, all of them|Only ones with numbers",
      "A full sign language has...|Grammar and a large vocabulary|Only ten gestures|No rules",
      "Umpires in baseball use signals to...|Tell players and fans a call across the field|Sing|Cool the grass"
    ]),
    SC("Hands before words", "👶", "Researchers have found that hearing babies babble with sounds, and babies who grow up seeing sign language babble with their hands. Babies are ready to learn language in any form. The most important thing is that they see or hear language early and every day.", "Think about what a baby needs to start learning: lots of language around them, in a way they can sense.", "A seed grows when it gets water and sun early, not when it is already a tree.", [
      "Babies who see sign may 'babble' with their...|Hands|Knees|Ears",
      "This shows babies are ready to learn language in...|Any form they can sense|Only spoken words|No form",
      "Children learn a first language best when they...|Have language around them early|Wait until age twenty|Never practice",
      "Deaf children with Deaf signing parents often learn ASL...|Naturally, like hearing kids learn speech|Only from a textbook|Never",
      "Baby sign, a few signs for hearing babies, is...|A small set of signs, not a full language|The same as ASL|A kind of food",
      "First words, spoken or signed, often come around...|A child's first birthday|Age thirty|Before birth"
    ]),
    SC("Again and again", "🔁", "ASL grammar uses movement, space and the face. Repeating a noun can show there is more than one. Repeating a verb can show something happens again and again. A bigger movement with a stronger face can show something is very strong.", "Think about what repeating or enlarging a sign would tell a watcher about how many or how much.", "In English you add an s to make one cat into many cats. In ASL you can repeat the sign.", [
      "Repeating a noun sign can show...|More than one|Less than one|Nothing at all",
      "Repeating a verb's movement can show it happens...|Again and again|Only once|Never",
      "A bigger movement with a stronger face can show...|More intensity|A quiet whisper|A question",
      "A slow, long, smooth movement can show...|It lasts a long time|It was very quick|It has no meaning",
      "ASL grammar uses movement, space and the...|Face|Keyboard|Radio",
      "Sweeping a sign across the signing space can show...|Many different things in different places|Nothing|A secret"
    ]),
    signMul(),
    SC("Deaf organizations", "🏛️", "People form groups to work together. The National Association of the Deaf (NAD) in the United States began in 1880. The World Federation of the Deaf began in 1951 and works for Deaf people around the world. Local Deaf clubs give people a place to meet and share news.", "Think about why people join together: to share news, support each other, and speak up for rights.", "A school club has a goal and members who help each other reach it.", [
      "NAD stands for...|National Association of the Deaf|New American Dictionary|National Art Day",
      "The NAD began in...|1880|1990|1750",
      "The World Federation of the Deaf works for Deaf people...|Around the world|On one street only|In one classroom",
      "A local Deaf club is a place to...|Meet, sign and share news|Buy cars|Be quiet all day",
      "Deaf organizations help by...|Speaking up for rights|Closing schools|Hiding information",
      "The best people to lead Deaf organizations are often...|Deaf people|No one|Strangers who never met them"
    ]),
    SC("Deaf people who did big things", "🌟", "Many Deaf and hard of hearing people have done great things. Derrick Coleman, who has hearing loss, played in the NFL and helped win a Super Bowl. Heather Whitestone was crowned Miss America in 1995. Nyle DiMarco, a Deaf actor and model, won Dancing with the Stars. Beethoven kept making music even as he lost his hearing.", "Think about what these stories prove: hearing loss does not decide what a person can do.", "A student who wears glasses can still be a great reader and a great athlete.", [
      "Derrick Coleman played in the...|NFL|Opera|Olympic pool",
      "Heather Whitestone was crowned...|Miss America|A mayor|An airline pilot",
      "Nyle DiMarco won...|Dancing with the Stars|The Super Bowl|The spelling bee",
      "Beethoven kept composing music even as he...|Lost much of his hearing|Moved to space|Stopped using paper",
      "These stories show that Deaf people can...|Do many different things|Only do one job|Not work",
      "Thomas Edison, the famous inventor, had...|Hearing loss|Four hands|Wings"
    ]),
    SC("What to wear to sign", "👕", "Signing is visual, so clothes matter. Wear plain colors that contrast with your skin so your hands show up clearly. Avoid busy patterns, jewelry that dangles by your hands, and hair that hides your face. Your face is part of the grammar.", "Think about what the watcher's eyes need: clear hands and a clear face.", "A teacher writes on a dark board with white chalk so the words stand out.", [
      "A good shirt for signing is...|A plain solid color|Covered in busy patterns|Covered in sparkles",
      "Clothes and skin should...|Contrast so hands are easy to see|Be exactly the same shade|Be covered by a scarf",
      "Jewelry that dangles near your hands can...|Distract the watcher|Make you float|Help the grammar",
      "Hair across your face can...|Hide your facial grammar|Add sound|Help the signs",
      "Why choose contrasting clothes?|Hands are easier to see|They make sound|They are a rule of the moon",
      "A very baggy sleeve that flops over your fingers may...|Cover your hands|Boost your speed|Make a beep"
    ]),
    SC("The huddle", "🏈", "A story says that Deaf players at Gallaudet University in Washington, D.C. started the football huddle. They stood in a tight circle so the other team could not see their signed plays. Today teams everywhere use the huddle.", "Think about why a team with signing players would stand close in a tight circle.", "People in a quiet library whisper close together so only their friends can hear.", [
      "Deaf players huddled so the other team could not...|See their signed plays|Hear the crowd|Bounce the ball",
      "In a huddle, players stand close so everyone can...|See the signs|Smell lunch|Sleep",
      "Today the huddle is used by teams...|Everywhere|Only at Deaf schools|Nowhere",
      "Gallaudet University is in...|Washington, D.C.|London|Tokyo",
      "The huddle story shows Deaf culture...|Has even changed sports|Banned sports|Stopped games",
      "Players who sign plays need...|A clear view of hands|Loud speakers|A dark room"
    ]),
    spellAt(),
    PL("Deaf history timeline", "📜", "Here are some dates in Deaf history, from schools to laws.", "Tell yourself a story that links the dates in order, from oldest to newest.", [
      "1817::The first permanent school for the Deaf in the United States opens::🏫",
      "1864::Gallaudet College is chartered::🎓",
      "1880::The National Association of the Deaf is founded::🏛️",
      "1960::William Stokoe shows that ASL has its own structure::📘",
      "1964::Interpreters form the RID::🤝",
      "1988::Students protest and choose Deaf President Now::✊",
      "1990::The ADA becomes law::⚖️"
    ], { qd: "Which year fits this?", qt: "What happened in this year?" }),
    SC("Gesture or sign?", "🙌", "A gesture is a small movement that people use while they talk. A sign is a word in a sign language. Gestures can mean different things in different places. Pantomime is acting something out without words. ASL is a full language with its own grammar, not just acting.", "Think about whether the thing follows rules like a language, or is just a loose movement.", "A smile is a loose signal, but the word 'smile' follows the rules of a language.", [
      "A thumbs-up gesture can mean different things in...|Different cultures|The same way everywhere|No place",
      "Pantomime means...|Acting out without words|A kind of bread|A Deaf club",
      "Signs in ASL follow...|Rules of the language|No rules|Only guesses",
      "Is ASL just acting?|No, it is a language with grammar|Yes, it is only acting|It is only for plays",
      "Many signs do not look like what they mean, so...|You must learn them|You can always guess them|They are mistakes",
      "A person who does not know ASL, trying to guess a whole conversation, will usually...|Miss a lot|Understand it all|Become Deaf"
    ]),
    SC("Seating for signers", "🪑", "A group of signers needs to see each other. A circle or a U-shape works well. Everyone should have light on their faces, and nobody should sit with a bright window behind them. Only one person should sign at a time.", "Picture each seat and ask whether every person can see every other person's hands and face.", "In a theater, seats are placed so everyone can see the stage.", [
      "A good seating plan for a signing group is...|A circle or U-shape|One long straight row|Seats facing the wall",
      "A bright window behind someone can...|Make them hard to see|Make them louder|Help with grammar",
      "Good light should shine on...|People's faces and hands|The ceiling|The floor",
      "In a group, signers should...|Take turns, one at a time|All sign at once|Whisper",
      "A tall person should not sit...|Right in front of someone else's view|Near a friend|In a circle",
      "If you cannot see a signer, you should...|Politely ask to move or have them adjust|Say nothing|Leave"
    ])
  ];

  // ================= LEVEL 14 =================
  const L14 = [
    readSpell("Read very long words", ["adventure", "chocolate", "dinosaur", "fireworks", "grandfather", "hurricane", "instrument", "kangaroo", "microscope", "newspaper", "playground", "restaurant", "skateboard", "telescope"], "Long words are easier when you read in chunks, like syllables. Try seeing parts of the word, not only letters."),
    SC("What makes a language?", "🗣️", "A language has words, grammar, and ways to make new words. Children learn it naturally when they are around it. ASL has all of these. Signed and spoken languages are different in how they are made, but they are equal as languages.", "Think about what a language needs: words, rules, a community and a way to make new things.", "A board game needs pieces, rules and players. A language needs words, grammar and users.", [
      "A language has words and...|Grammar|Only pictures|Only noises",
      "ASL is a language because it has...|Its own words and grammar|No rules|Only English words",
      "People can create new signs to...|Name new things|Break the language|Stop talking",
      "Signed and spoken languages are...|Equal as languages|One real, one fake|Opposites",
      "Children learn a first language best by...|Being around it every day|Reading alone|Waiting until adulthood",
      "A language lives on when...|Communities keep using it|Nobody speaks it|It is locked in a box"
    ]),
    spellCount("Count sports words", ["basketball", "swimming", "volleyball", "skateboarding", "gymnastics", "soccer", "baseball", "track and field", "snowboarding", "table tennis", "wrestling", "archery"], "the sport", "Fingerspelling a longer word means more handshapes. Counting letters is a quick way to tell how long a spelling will be."),
    SC("Rights at school", "🏫", "In the United States, a law first passed in 1975, now called IDEA, says children with disabilities must get a free public education. A student can have an IEP, an Individualized Education Program, that lists what help they need, like an interpreter, captions or notes.", "Think about what a fair school gives a student so they can learn as much as anyone.", "A ramp lets a student in a wheelchair enter the same door as everyone.", [
      "An IEP is a plan that lists...|The help a student needs to learn|A list of favorite foods|A seating chart for lunch",
      "IEP stands for...|Individualized Education Program|Interpreter English Project|Important Early Page",
      "Help in an IEP could be...|An interpreter or captions|A secret code|A day off every day",
      "The law says children with disabilities must get...|A free public education|No school|Only home lessons",
      "The goal of an IEP is for the student to...|Learn as much as anyone|Be left out|Skip tests",
      "An IEP is made by...|The family and school team together|A stranger online|The weather"
    ]),
    rate(),
    SC("ASL across borders", "🗺️", "ASL is used across most of the United States and in English-speaking parts of Canada. In Quebec, Deaf people use LSQ, which grew from French Sign Language. In Mexico, Deaf people use LSM. These are different languages, not just dialects of ASL.", "Think about where each language grew and who used it.", "English is used in many countries, but Spanish is used in others, and each has its own words.", [
      "ASL is used in the United States and parts of...|Canada|Antarctica|The ocean",
      "In Quebec, many Deaf people use...|LSQ|ASL only|Morse code",
      "LSQ grew from...|French Sign Language|Spanish sentences|Songs",
      "In Mexico, Deaf people use...|LSM|ASL only|LSQ",
      "ASL, LSQ and LSM are...|Different languages|The same language|Not languages",
      "Signs from one country...|May not be understood in another|Are the same worldwide|Are always the same"
    ]),
    SC("Safe online", "🛡️", "You can chat with friends online, including Deaf friends, using video and text. Stay safe: keep your personal details private, only talk with people you really know, and tell a trusted adult if anyone asks for private things or wants to keep a secret.", "Think about what you would do if a stranger online asked something private.", "You would not tell a stranger on the street your address, and the same is true online.", [
      "Which is private and should not be shared online?|Your home address|Your favorite color|A game score",
      "If a stranger asks for your photo, you should...|Say no and tell a trusted adult|Send it|Ask them for theirs",
      "If someone says 'keep it a secret', you should...|Tell a trusted adult|Keep it secret|Send them gifts",
      "A video call is safest with...|People you really know|Anyone who messages you|Strangers",
      "If you see something that feels wrong, you should...|Stop and tell an adult|Keep watching|Share it",
      "A good password is...|Private and not shared|Told to friends|The word password"
    ]),
    pattern(),
    SC("Interpreter in class", "🧑‍🏫", "Some Deaf students have an educational interpreter in class. The interpreter sits or stands near the teacher where the student can see both. The teacher should talk to the student, not to the interpreter, and give the interpreter a moment to catch up.", "Think about where the Deaf student needs to look and what helps the interpreter keep up.", "A sports announcer sits where they can see the whole field.", [
      "The interpreter should be placed...|Near the teacher where the student sees both|At the back|Out in the hall",
      "When you speak to a Deaf student with an interpreter, you should talk to...|The student|Only the interpreter|The ceiling",
      "A teacher can help the interpreter by...|Pausing a moment before moving on|Talking much faster|Turning the lights off",
      "Showing a video in class works best with...|Captions|No sound|The lights out",
      "The interpreter's job in class is to...|Pass messages between the teacher and student|Do the student's homework|Give out grades",
      "When the teacher writes on the board, they should...|Pause so the student can look at the board, then back|Keep talking facing the board|Erase quickly"
    ]),
    SC("Care for your hands", "🤲", "Signers use their hands, wrists and arms a lot, so they need to take care of them. Stretch before long signing, take breaks, keep your shoulders relaxed, and do not sign with a tight, tense grip. If something hurts, tell an adult.", "Think about how athletes warm up and rest to protect their muscles.", "Before a run, runners stretch their legs and rest when they are tired.", [
      "Before a long time of signing, it is good to...|Stretch your hands and arms|Hold your breath|Wear heavy gloves",
      "If your wrist starts to hurt, you should...|Rest and tell an adult|Sign harder|Ignore it forever",
      "While signing, your shoulders should be...|Relaxed|Tight and raised|Frozen",
      "A good habit for long conversations is to...|Take breaks|Never stop|Sign in the dark",
      "Tense, tight signing can...|Hurt your hands over time|Make you taller|Make your signs louder",
      "A gentle warm up for hands is...|Opening and closing them slowly|Slamming them on a table|Tying them up"
    ]),
    readDigits("Long number signs", [7, 10], "Longer numbers like ID or account numbers need careful reading. Take them in chunks and check your work."),
    SC("Presenting with visuals", "📽️", "When you give a talk, Deaf classmates may watch an interpreter, captions, or you. Stand where you can be seen, face the audience, speak and move at a steady pace, use pictures or slides, and add captions to videos. Pause when you point to a slide.", "Think about how your audience will see and understand your message.", "A tour guide stops walking to point at something and then keeps talking.", [
      "When presenting, you should face...|The audience|The wall|The floor",
      "If you point at a slide, you should...|Pause, then keep talking|Keep talking while turned away|Run off the stage",
      "Videos in your talk should have...|Captions|No pictures|A loud song only",
      "Slides help because they...|Give people something to look at|Replace you|Hide the room",
      "A steady pace helps the interpreter to...|Keep up|Run away|Sleep",
      "Standing in a bright light with your face shadowed makes it...|Hard for people to see your face|Easier to hear|Quieter"
    ]),
    SC("Looking up signs", "📚", "Looking up a sign is trickier than looking up a word. A sign dictionary may be organized by English word, or by handshape, place and movement. Many dictionaries today are video dictionaries because pictures can not show movement well.", "Think about how you could find a sign if you do not know the English word.", "A map index can be sorted by name, or by the type of place.", [
      "A video dictionary is useful because it can show...|Movement|Smells|Weather",
      "A sign dictionary may be organized by...|Handshape, place or movement|Height of the author|Color of the cover",
      "A picture in a book can not easily show...|How a sign moves|The color of a hand|Letters",
      "If you do not know the English word for a sign, you could...|Search by handshape or ask a signer|Give up|Guess forever",
      "A good dictionary entry shows...|How to make the sign and what it means|Only the page number|A bedtime story",
      "Before using a new sign in public, it is smart to...|Check that you have it right|Never practice|Make it up"
    ]),
    SC("Standing up for others", "💪", "Some Deaf kids get teased, or left out of games and talk. You can help. Include them, learn some signs, invite them to join, and speak up if you see teasing. Tell a trusted adult if it keeps happening.", "Think about what a good friend would do to make someone feel welcome.", "If a new student sits alone at lunch, you can wave them over.", [
      "A good way to include a Deaf classmate is to...|Invite them and learn some signs|Ignore them|Whisper behind their back",
      "If you see someone teased, you can...|Speak up and tell an adult|Laugh|Join in",
      "If a friend is left out of a joke, you could...|Explain it so they can laugh too|Say 'never mind'|Leave them out",
      "Leaving people out of group chat is...|Unkind|Fine|Required",
      "A kind way to start a chat is to...|Wave and smile|Tap them hard|Throw something",
      "When teasing keeps happening, you should...|Tell a trusted adult|Keep it secret|Tease back"
    ]),
    PL("Interpreting words", "🧑‍🤝‍🧑", "Here are some words people use when they talk about interpreting.", "Link each word to what the interpreter does.", [
      "Simultaneous::Interpreting at the same time the speaker is talking::⏱️",
      "Consecutive::Interpreting after the speaker finishes a chunk::⏸️",
      "CDI::A Deaf interpreter who works with a hearing interpreter::🤝",
      "VRS::A video relay service for phone calls::💻",
      "Confidential::Keeping private things private::🔒",
      "Impartial::Not taking sides::⚖️",
      "RID::A group that sets standards for interpreters::🏛️"
    ], { qd: "Which word fits?", qt: "What does this word mean?" }),
    SC("Fair or unfair?", "⚖️", "Fairness means everyone gets the access they need. If a Deaf student does not get captions or an interpreter, they miss information, and that is unfair. A fair fix gives the same information to everyone at the same time.", "Ask whether everyone gets the same information at the same time.", "If everyone gets a bus pass but one student has no bus, it is not equal access.", [
      "A video without captions is unfair because...|Some people miss the words|It is too short|It is too colorful",
      "A fair way to share an announcement is...|Make it visible and clear to everyone|Whisper it to a few|Tell only some",
      "A quiz given to everyone but explained only by voice is...|Unfair to some students|Fair|Wonderful",
      "Fair access means everyone gets...|The same information at the same time|Different rules|No information",
      "If a Deaf student must wait for notes, it is...|Not fully fair|Perfect|A prize",
      "A good way to fix an unfair situation is to...|Ask what access is needed and provide it|Hide the problem|Blame the student"
    ]),
    letterSum(),
    SC("Working in a Deaf-friendly place", "🏢", "Many Deaf people work as teachers, engineers, doctors, artists, scientists and more. A Deaf-friendly workplace has visual alerts, captions, clear meetings with one speaker at a time, and an interpreter when needed. Everyone benefits from clear communication.", "Think about what would help everyone in a team to share ideas.", "A team meeting works best when everyone can see the whiteboard and take turns.", [
      "A visual fire alarm uses...|Flashing lights|A whisper|Nothing",
      "In a meeting, it helps to have...|One speaker at a time|Everyone talking at once|No agenda",
      "Deaf people work as...|Many kinds of jobs|Only one kind of job|No jobs",
      "A good way to share a message at work is...|Write it or caption it so it is clear|Shout it across the hall|Hide it",
      "Clear communication helps...|Everyone|Nobody|Only managers",
      "When an interpreter is needed at work, the company should...|Provide one|Refuse|Ask the Deaf person to pay"
    ])
  ];

  // ================= LEVEL 15 =================
  const L15 = [
    readSpell("Read hard words", ["architecture", "bicycle", "camouflage", "dictionary", "exhibition", "friendship", "geography", "headquarters", "imagination", "knowledge", "laboratory", "mysterious", "neighborhood", "orchestra"], "Hard words may have tricky letter patterns. Keep your eyes soft and watch the shape of the whole spelling."),
    SC("One small change", "🔍", "In every sign language, changing just one part of a sign can change its meaning, like changing one letter in a word. The parts include handshape, place, movement, palm direction and face. Linguists call two signs that differ in only one part a minimal pair.", "Think of words that change when only one sound changes, and apply that idea to signs.", "The words 'cat' and 'bat' differ by only one sound.", [
      "Changing only one part of a sign can...|Change its meaning|Never change anything|Make it silent",
      "Two signs that differ in only one part are called...|A minimal pair|A big mess|A triple",
      "Parts of a sign include handshape, place and...|Movement|Spelling|Sound",
      "A linguist is a person who...|Studies language|Cooks food|Paints houses",
      "Minimal pairs show that every part of a sign...|Matters|Is optional|Is random",
      "Like changing one letter in a word, changing one part of a sign can make...|A different sign|The same sign|A song"
    ]),
    SC("Early teachers", "📖", "A long time ago, a Spanish monk named Pedro Ponce de Leon taught Deaf students in the 1500s. In 1620 Juan Pablo Bonet wrote a book about teaching Deaf students that included a manual alphabet. Ideas like these helped later teachers who made the alphabets we know today.", "Think about how old ideas get passed to new teachers through books and students.", "A recipe passes from cook to cook and gets better each time.", [
      "Pedro Ponce de Leon was a Spanish monk who taught Deaf students in the...|1500s|1990s|2010s",
      "Juan Pablo Bonet wrote a book in...|1620|1920|1250",
      "Bonet's book included a manual...|Alphabet|Recipe|Calendar",
      "Ideas from early teachers helped...|Later teachers|No one|Only robots",
      "Both men were from...|Spain|Australia|Brazil",
      "A manual alphabet is a way to spell with...|Hands|Feet|Drums"
    ]),
    SC("Deaf cultural values", "🤝", "Deaf culture has shared values. People share information openly, welcome newcomers, tell stories, value eye contact and clear, direct talk, and take care of each other. Deaf culture is about language and community, not about what people cannot do.", "Think about what a community built around a visual language values.", "A town with a river values boats and bridges.", [
      "In Deaf culture, sharing information is...|Valued|Hidden|Forbidden",
      "Deaf culture is about language and...|Community|Isolation|Noise",
      "Storytelling in Deaf culture is...|An important tradition|Not allowed|Done only by machines",
      "Welcoming newcomers shows...|Care for the community|Rudeness|Fear",
      "Direct, clear communication is often...|Valued|Disliked|Illegal",
      "Deaf culture focuses on what people...|Share and can do|Cannot do|Hide"
    ]),
    SC("Deaf schools as homes for language", "🏫", "Most Deaf children are born to hearing parents who may not know sign language. At Deaf schools, children can meet Deaf peers and adults and learn ASL and Deaf culture. Many Deaf people say these schools were where they first had easy, everyday communication.", "Think about why meeting other signers every day helps a child learn language.", "If you want to learn to swim, you learn fastest around a pool with other swimmers.", [
      "Most Deaf children are born into families that are...|Hearing|Deaf signing families|Circus families",
      "At Deaf schools, children can meet...|Deaf peers and adults|Only machines|Nobody",
      "A Deaf school helps children learn ASL and...|Deaf culture|Only math|Silence",
      "Meeting signers every day helps a child...|Learn language more easily|Forget it|Hide",
      "Parents of Deaf children can help by...|Learning to sign too|Never talking|Ignoring them",
      "Deaf schools are important to Deaf history because they...|Spread ASL and community|Closed all clubs|Banned signing"
    ]),
    SC("Access at work", "🏢", "The Americans with Disabilities Act (ADA) says employers must provide reasonable accommodations for workers with disabilities, if it does not cause huge hardship. For a Deaf worker that could be an interpreter, captioning, or flashing alerts. The goal is equal chances.", "Think about what a Deaf worker might need to do the job as well as anyone.", "A left-handed worker may need scissors made for the left hand.", [
      "A reasonable accommodation at work could be...|An interpreter or captions|A louder bell|A longer coffee break for everyone",
      "The ADA helps give people with disabilities...|Equal chances|Special treats|Fewer chances",
      "Flashing alerts at work help a Deaf worker to...|Notice alarms|Hear music|Cook",
      "Employers must provide accommodations unless they cause...|Huge hardship|Smiles|Cake",
      "The goal of accommodations is...|Equal access to do the job|Less work for everyone|Extra pay",
      "A good way to find the right accommodation is to...|Ask the worker what works for them|Guess|Skip it"
    ]),
    letterSum(),
    SC("Captions and computers", "🤖", "Automatic captions can be helpful, but they make mistakes, especially with names, accents, background noise and technical words. Computers that make signs from text, called avatars, are still not as clear and natural as Deaf signers. For important information, check the captions or use a human.", "Think about whether a computer is always right, and what to do when it matters a lot.", "A spell checker catches many errors but misses some, so you still read your work.", [
      "Automatic captions can sometimes be...|Wrong|Perfect always|Made of paper",
      "Captions are most likely to make mistakes with...|Names and technical words|Simple common words only|Pictures",
      "For important information, it is wise to...|Check the captions or use a human|Trust blindly|Ignore it",
      "Sign language avatars are still not as natural as...|Deaf signers|Cartoons|Maps",
      "Good captions should be...|Accurate and easy to read|Hidden|Very tiny",
      "If a caption looks wrong, you can...|Ask for a correction|Believe it anyway|Delete the video"
    ]),
    SC("Mainstream classrooms", "🎒", "Many Deaf students go to a regular school with hearing students. This is sometimes called mainstreaming. For it to work well, the school must give access like interpreters or captions and help with friendships, because it can feel lonely to be the only Deaf student.", "Think about both sides: the access needed in class and the chance to connect with others.", "A new student in a school needs both books and friends.", [
      "Mainstreaming means a Deaf student goes to...|A regular school with hearing students|A school on the moon|No school",
      "A mainstream school must provide...|Access like interpreters or captions|Nothing|Longer lunch",
      "A Deaf student in a regular school may sometimes feel...|Lonely if they are the only one|Always loud|Invisible to cameras",
      "Friendships can be supported by...|Teaching classmates some signs|Silence|Separate lunch tables",
      "A good school also connects Deaf students to...|Deaf peers and adults|No one|Machines only",
      "Families choose a school by looking at...|What helps the child learn and belong|Which one has the biggest sign|Which has no rules"
    ]),
    SC("Language changes", "⏳", "Every language changes over time, including ASL. Older signers may use signs that younger signers rarely use. Some signs become smaller and easier. New signs appear for new things, like technology. This shows ASL is a living language.", "Think about how English words and slang change from one generation to the next.", "Your grandparents may use words you rarely hear today.", [
      "A living language is one that...|Changes over time|Never changes|Is only written",
      "New signs often appear for...|New ideas and technology|Old stones|Silence",
      "Older and younger signers may use...|Some different signs|The same exact signs always|No signs",
      "Signs over time often become...|Smaller and easier|Larger and harder|Silent",
      "That ASL changes shows that it is...|A real, living language|A mistake|A secret code",
      "Spoken languages like English also...|Change over time|Never change|Stop changing at midnight"
    ]),
    PL("Linguist words", "🔬", "Linguists have words to talk about sign languages.", "Match each word to its job.", [
      "Handshape::The shape the hand makes in a sign::✋",
      "Location::Where on or near the body a sign is made::📍",
      "Movement::How the hands move::➡️",
      "Palm orientation::Which way the palm faces::🖐️",
      "Non-manual marker::Something done with the face or head::🙂",
      "Fingerspelling::Spelling a word with handshapes for letters::🔤",
      "Gloss::A written English label for a sign::📝",
      "Minimal pair::Two signs that differ by one part::🔍"
    ], { qd: "Which word fits?", qt: "What does this word mean?" }),
    SC("Start a sign club", "👐", "You could start a sign club at school with a teacher's help. Meet in a room with good light. Invite students who like to learn. Learn from Deaf people and Deaf-made videos or a teacher, practice fingerspelling, play signing games, and respect Deaf culture. Ask an adult for help in contacting guests so that it stays safe.", "Think about what a good, safe and respectful club would do each week.", "A chess club picks a teacher, a room and a time, then invites everyone.", [
      "To start a school club, first you should...|Ask a teacher or adult for help|Do it secretly|Skip permission",
      "A good meeting place for signing has...|Good light and room to see|Darkness|Loud music",
      "A club can learn from...|Deaf people and Deaf-made materials|Only guessing|Nothing at all",
      "Club activities could include...|Fingerspelling games|Teasing|Skipping homework",
      "To invite a guest speaker, you should...|Ask an adult to help contact them|Message strangers yourself|Skip it",
      "The club should show respect for...|Deaf culture|Nothing|Only itself"
    ]),
    SC("Learning from Deaf teachers", "👩‍🏫", "The best teachers of ASL are often Deaf people, because ASL is their language and culture. A Deaf teacher can show natural signing, facial grammar and Deaf culture in ways hearing learners miss. Respect their time, give them credit, and learn first from Deaf sources.", "Think about who knows a language and its culture the best.", "To learn about a country, you learn from people who live there.", [
      "ASL is often best learned from...|Deaf teachers|A random video of guesses|A dictionary alone",
      "A Deaf teacher can show...|Natural signing and culture|Only spelling|Only reading",
      "When you learn from someone, you should...|Give them credit|Pretend you made it up|Copy without asking",
      "If you share a lesson you learned, you should...|Say where you learned it|Keep it secret|Say it was all yours",
      "Learning culture as well as signs helps you...|Understand and respect people|Skip the grammar|Forget",
      "A good learner is...|Respectful and patient|Rude|Rushing"
    ]),
    percent(),
    SC("Check your sources", "🧐", "Not everything online is true. For facts about Deaf culture or ASL, use trustworthy sources: Deaf-led organizations, museums, universities and library books. Check the date, check who made it, and compare more than one source.", "Ask: who made this, when, and do other trusted sources agree?", "Before you share a rumor, you check if it is true.", [
      "A good source for ASL facts is...|A Deaf-led organization|A random comment|A rumor",
      "Before you trust a page, check...|Who made it and when|Only how colorful it is|Only the title",
      "Comparing sources helps you...|Spot mistakes|Be lazy|Guess",
      "A comment from a stranger is...|Not always reliable|Always true|A final proof",
      "A library book from a trusted publisher is usually...|Checked by editors|Always wrong|Secret",
      "When two good sources disagree, you should...|Look for more information|Pick randomly|Stop caring"
    ]),
    letterKind("Count the consonants", ["education", "interpreter", "community", "alphabet", "language", "beautiful", "adventure", "important", "question", "different", "conversation", "celebrate"], true, "Reading fingerspelling gets easier when you notice letter patterns. Counting consonants is another way to practice."),
    SC("Group project, group access", "👥", "In a group project with a Deaf teammate, plan ahead. Meet where everyone can see each other, use shared notes or chat, take turns, and use an interpreter or captions if needed. Make sure everyone's ideas are heard.", "Ask whether every teammate can follow the talk and add ideas.", "A relay race works when every runner gets the baton.", [
      "In a group project, everyone should be able to...|Follow the talk and share ideas|Stay silent|Work alone",
      "Shared notes help because they...|Keep everyone on the same page|Hide the plan|Replace the project",
      "Taking turns talking helps a Deaf teammate to...|See who is speaking|Hide|Fall asleep",
      "Meeting where you can all see each other is...|Helpful|Useless|Silly",
      "If a teammate misses something, you should...|Fill them in|Skip it|Laugh",
      "Good teamwork means every voice or sign is...|Heard|Ignored|Muted"
    ]),
    SC("Emergency plans", "🚨", "Families can make an emergency plan that works for everyone. Include flashing smoke alarms, a way to contact each other by text or video, a meeting place outside, and a list of important numbers. Practice the plan. Tell an adult right away if you sense danger.", "Think about how everyone in the home would know there is danger and what they would do.", "A fire drill practices where to go before it is needed.", [
      "A smoke alarm for a Deaf person may include...|Flashing lights or a bed shaker|Only a bell|Nothing",
      "A good emergency plan should include a...|Meeting place outside|Place to hide forever|Surprise party",
      "Practicing the plan helps because it...|Makes it easier to remember|Wastes time|Scares everyone",
      "Family members can contact each other with...|Text or video|Smoke signals|Nothing",
      "If you sense danger, you should...|Tell an adult right away|Wait|Keep it a secret",
      "A list of important numbers should be...|Easy to find|Hidden|Lost"
    ])
  ];

  Object.assign(SIGN_LEVELS, {
    13: lvl(13, L13, [0, 2, 3, 5, 9, 14, 15, 16]),
    14: lvl(14, L14, [0, 2, 4, 7, 10, 14, 16, 17]),
    15: lvl(15, L15, [0, 5, 6, 12, 13, 15, 16, 17])
  });
})();
