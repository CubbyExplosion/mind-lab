// ext/sign-16-18.js  Mind Lab Sign Language (ASL), levels 16-18 (60 lessons)
// Only things we are sure about: fingerspelling, number signs, ASL grammar ideas, Deaf culture, history and etiquette.
(() => {
  const S = (a, n) => shuf(a).slice(0, n);
  const UP = s => String(s).toUpperCase();
  const lead = s => String(s).replace(/<[^>]+>/g, "").replace(/^[^A-Za-z0-9]+/, "")[0].toUpperCase();

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
      { h: "Remember these", v: pairs.map(p => `${p.e ? p.e + " " : ""}<b>${p.t}</b>: ${p.d}`).join("<br>"), t: "Read each one slowly and say it in your own words." },
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
  const MK = (title, v, intro, exV, exT, tip, make) => {
    make.teach = () => [{ h: title, v, t: intro }, { h: "Worked example", v: exV, t: exT }, { h: "Tip", v: "💡", t: tip }];
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
  const readSpell = (title, words, note) => MK(title, "🔠", note, "R-I-V-E-R", "R, I, V, E, R. Put them together and you get <b>river</b>.",
    "Read the rhythm of the whole word, not each letter alone. Say the word in your head as soon as you can guess it.", () => {
      const w = pick(words), ex = pick(["sun", "cat", "pig", "bus", "map"]);
      return {
        text: `A friend fingerspells these letters, one after another:<br><b>${UP(w).split("").join(" - ")}</b><br>What word is it?`, visual: "🔠", textInput: true, answer: w,
        hints: ["Say the letters quickly in your head and listen for the word.", `The word has ${w.length} letters and starts with "${UP(w[0])}".`, `Example: ${UP(ex).split("").join(" - ")} spells "${ex}". Now do yours.`]
      };
    });
  const readTimes = () => MK("Read signed times", "🕒", "Times are often shown with two number signs: the hour first, then the minutes. Type them as digits.",
    "3 and 20", "Three, then twenty is the time <b>3:20</b>. A minute with only one digit gets a zero in front, like 4:05.",
    "Hour first, minutes second. Say it out loud before you type it.", () => {
      const h = ri(1, 12), m = ri(1, 59), ms = String(m).padStart(2, "0");
      return {
        text: `A friend signs a time with two number signs: <b>${h}</b> and then <b>${ms}</b>. Type the time as digits, like 3:20.`, visual: "🕒", textInput: true, answer: `${h}${ms}`,
        hints: ["The first number is the hour. The second number is the minutes.", "Write the hour, then the minutes right after it. A one-digit minute gets a zero in front.", "Example: 9 and then 15 makes the time 9:15. Now do yours."]
      };
    });
  const letterSum = () => MK("Alphabet numbers", "🔤", "Here is a puzzle that mixes letters and math. Give each letter its place in the alphabet: A is 1, B is 2, C is 3, and so on. Then add up the letters of a word.",
    "C-A-B", "C is 3, A is 1 and B is 2. Add them: 3 + 1 + 2 = <b>6</b>.", "Write the alphabet in a row with numbers under it to check each letter. Handy places: J is 10, T is 20.", () => {
      const w = pick(["bad", "bee", "dad", "fig", "hat", "jam", "kid", "leg", "mop", "pig", "sun", "zip", "ace", "dog"]);
      const n = w.split("").reduce((a, c) => a + c.charCodeAt(0) - 96, 0);
      return {
        text: `A is 1, B is 2, C is 3 and so on. A friend fingerspells <b>${UP(w).split("").join(" - ")}</b>. What is the total of the letters?`, visual: "🔢", answer: n,
        hints: ["Find the place of each letter in the alphabet first.", "Add the three letter values together, one after the other.", "Example: C-A-B is 3 + 1 + 2 = 6. Now do yours."]
      };
    });
  const meanMk = () => MK("Practice minutes: the mean", "📊", "The <b>mean</b> (average) tells you what a typical number in a group is. Add all the numbers, then divide by how many numbers there are.",
    "10, 20, 30", "10 + 20 + 30 = 60. There are 3 numbers, so 60 ÷ 3 = <b>20</b>.", "Add first, divide second. The mean is always between the smallest and the largest number.", () => {
      let nums;
      for (; ;) {
        const a = ri(10, 40), x = ri(a - 8, a + 8), y = ri(a - 8, a + 8), z = ri(a - 8, a + 8), w = 4 * a - x - y - z;
        if (w >= 5 && w <= 60) { nums = [x, y, z, w]; break; }
      }
      return {
        text: `Four friends practiced fingerspelling for <b>${nums.join(", ")}</b> minutes. What is the mean (average) number of minutes?`, visual: "📊", answer: nums.reduce((a, b) => a + b, 0) / 4,
        hints: ["Add up all the numbers first.", "Then divide your total by how many friends there are.", "Example: 8, 10 and 12 add to 30, and 30 ÷ 3 = 10. Now do yours."]
      };
    });
  const classTime = () => MK("Sign class minutes", "⏰", "Planning your practice uses multiplication. Find the minutes in one week first, then multiply by the number of weeks.",
    "2 × 30 × 4", "2 classes a week for 30 minutes is 60 minutes a week. In 4 weeks that is <b>240</b> minutes.", "Do one step at a time: classes per week, then minutes per week, then all the weeks.", () => {
      const a = ri(2, 4), m = pick([30, 45, 60]), w = ri(3, 8);
      return {
        text: `A sign class meets <b>${a}</b> times a week for <b>${m}</b> minutes. How many minutes is that in <b>${w}</b> weeks?`, visual: "⏰", answer: a * m * w,
        hints: ["First find how many minutes the class meets in one week.", "Then multiply that by the number of weeks.", "Example: 3 times a week for 20 minutes is 60 a week, and 60 × 2 weeks = 120. Now do yours."]
      };
    });
  const budget = () => MK("Event budget", "💵", "Clubs plan with a budget, the money they can spend. Find the total cost first, then subtract it from the budget to see what is left.",
    "$3 × 6", "6 flyers at $3 each cost 6 × 3 = $18. With a budget of $25, you have 25 - 18 = <b>$7</b> left.", "Total cost first, subtract second. The money left cannot be more than the budget.", () => {
      const p = ri(2, 9), n = ri(5, 12), B = p * n + ri(5, 30);
      return {
        text: `Each flyer for Deaf Awareness Week costs <b>$${p}</b> to print. The club prints <b>${n}</b> flyers and has a budget of <b>$${B}</b>. How many dollars are left?`, visual: "💵", answer: B - p * n,
        hints: ["Find out what all the flyers cost together first.", "Then take that cost away from the budget.", "Example: 4 flyers at $5 cost $20. From a $30 budget, $10 is left. Now do yours."]
      };
    });
  const medianMk = () => MK("Median and range", "📏", "The <b>median</b> is the middle number when you put numbers in order. The <b>range</b> is the biggest number minus the smallest.",
    "4, 9, 12", "In order, 2, 5, 9, 11, 20 has the median 9, the middle one. For 4, 9, 12 the range is 12 - 4 = <b>8</b>.", "Always put the numbers in order first, from smallest to biggest.", () => {
      const set = new Set(); while (set.size < 5) set.add(ri(8, 60));
      const arr = shuf([...set]), s = [...arr].sort((a, b) => a - b), med = Math.random() < 0.5;
      return {
        text: `Five students timed how many seconds they needed to fingerspell a name: <b>${arr.join(", ")}</b>. What is the ${med ? "median" : "range"}?`, visual: "📏", answer: med ? s[2] : s[4] - s[0],
        hints: med ? ["Put the numbers in order from smallest to biggest.", "The median is the number right in the middle of the ordered list.", "Example: 3, 8, 5 in order is 3, 5, 8, so the median is 5. Now do yours."]
          : ["Find the biggest number and the smallest number.", "The range is the biggest number minus the smallest number.", "Example: for 3, 8, 5 the range is 8 - 3 = 5. Now do yours."]
      };
    });
  const EV = [
    ["The first permanent school for the Deaf in the United States opens in Hartford", 1817],
    ["Gallaudet receives its college charter", 1864],
    ["The Milan conference", 1880],
    ["William Stokoe publishes a book showing that ASL has its own structure", 1960],
    ["Early TTY phone calls begin", 1964],
    ["A cooking show is shown with open captions on public TV", 1972],
    ["The Deaf President Now protest", 1988],
    ["The Americans with Disabilities Act is signed", 1990],
    ["New Zealand Sign Language becomes an official language", 2006],
    ["The CVAA is signed", 2010]
  ];
  const timeline = () => MK("Timeline order", "⏳", "Putting events in order helps you see how Deaf history fits together. Here are the dates to remember: " + EV.map(e => `${e[1]} ${e[0].split(" ").slice(0, 4).join(" ")}...`).join("; "),
    "1960, 1990", "1960 is a smaller number than 1990, so it happened first.", "Compare the years like numbers. The smaller year is earlier, the bigger year is later.", () => {
      const es = S(EV, 3), early = Math.random() < 0.5, ys = es.map(e => e[1]), tgt = early ? Math.min(...ys) : Math.max(...ys);
      return {
        text: `Which of these happened ${early ? "<b>first</b> (earliest)" : "<b>last</b> (latest)"}?`, visual: "⏳", choices: es.map(e => e[0]), answer: es.find(e => e[1] === tgt)[0],
        hints: ["Remember the years from the lesson. A smaller year is earlier.", early ? "Think about which event came before the others, long ago or recently." : "Think about which event is closest to today.", "Example: 1964 comes before 1990 because 1964 is the smaller number. Now do yours."]
      };
    });
  // timeline intro needs a clean list on slide 1
  const timelineLesson = () => {
    const l = timeline(), t = l.make.teach;
    l.make.teach = () => { const s = t(); s[0].v = EV.map(e => `<b>${e[1]}</b> ${e[0]}`).join("<br>"); s[0].t = "Putting events in order helps you see how Deaf history fits together. Study this list."; return s; };
    return l;
  };

  // ================= LEVEL 16 =================
  const L16 = [
    SC("Receptive and expressive", "🙌", "Language skills come in two kinds. <b>Expressive</b> skill is making signs yourself. <b>Receptive</b> skill is understanding signs you see. Good signers train both.", "Think about who is doing the work: the person making the message or the person taking it in.", "Speaking a sentence out loud is one kind of skill, and listening to a sentence is the other kind.", [
      "Understanding a friend's signs is which skill?|Receptive|Expressive|Typing",
      "Making a sign with your own hands is which skill?|Expressive|Receptive|Listening",
      "Watching a video of a Deaf storyteller builds your...|Receptive skill|Expressive skill|Cooking skill",
      "Telling a story in sign to a friend builds your...|Expressive skill|Receptive skill|Reading speed",
      "Which is a good way to practice receptive skills?|Watch signers and try to follow|Never look at anyone|Memorize while keeping your hands in pockets",
      "Which is a good way to practice expressive skills?|Sign a short story to a partner|Never move your hands|Only read about signs",
      "Understanding the fingerspelling you see is...|Receptive|Expressive|Neither one"
    ]),
    SC("Numbers inside signs", "🔢", "In ASL some signs have a number blended right into them. The handshape of the number becomes part of the sign. Signs about amounts of time, like weeks, can change handshape to show the number. This is called <b>number incorporation</b>.", "Look for where the number shows up: inside the sign itself, not as a separate word.", "In a sign for 'three weeks,' the hand can show a 3 while it makes the week movement.", [
      "Number incorporation means a number handshape is...|Built into another sign|Written only on paper|Spoken aloud",
      "A signer shows 'three weeks' by using a 3 handshape in the week sign. This is number...|Incorporation|Subtraction|Deletion",
      "Why is number incorporation useful?|It says the number and the idea together|It makes signing slower|It hides the meaning",
      "Does a signer always need a separate sign for every number?|No, sometimes it is built in|Yes, never built in|Only on Tuesdays",
      "Number incorporation is part of ASL's...|Grammar|English spelling rules|Music",
      "Which describes a number built into a sign?|A time sign whose handshape changes with the amount|A sign that never changes|A fingerspelled name"
    ]),
    readTimes(),
    SC("Home sign", "🏠", "Some Deaf children grow up with no sign language around them. Many invent their own gestures to talk with their family. These are called <b>home signs</b>. They work well for that family, but a language grows richer when a whole community shares and uses it.", "Think about who makes up a home sign and who understands it.", "A family makes up a special gesture for bath time that only they use.", [
      "Home signs are gestures made up by...|A child and family without a shared sign language|A big company|A government office",
      "Who usually understands a home sign best?|The family who uses it|Everyone in the world|Nobody",
      "Why do children invent home signs?|They need to communicate|They want to forget words|They are told to be quiet",
      "Is home sign the same as ASL?|No, ASL is shared by a large community|Yes, exactly|Yes, they have the same word list",
      "Home sign shows that humans...|Naturally try to create language|Cannot communicate without sound|Learn only from books",
      "What helps a Deaf child most?|Early access to a shared language|Waiting until age fifteen|No communication at all"
    ]),
    SC("Language from the start", "👶", "Babies who see sign language from birth begin to 'babble' with their hands, just like hearing babies babble with sounds. Getting a language early, signed or spoken, helps a child learn, play and think. Deaf children of Deaf parents often get sign language from day one.", "Think about what babies need to learn a language: people using it with them.", "A hearing baby repeats sounds like 'ba-ba'. A signing baby may repeat hand movements.", [
      "Signing babies babble with...|Their hands|Only their toes|Radios",
      "What helps a baby learn language?|People using it with them every day|Silence|Locked doors",
      "Why is early language access important?|It helps learning, play and thinking|It stops babies sleeping|It is only for adults",
      "Deaf children of Deaf signing parents often get sign language...|From the very start|Only at age twenty|Never",
      "Is babbling only for sound?|No, signing babies babble with hands too|Yes, only for sound|Yes, only for birds",
      "A family with a new Deaf baby can help by...|Learning to sign and talking with the baby a lot|Waiting years to say anything|Ignoring the baby"
    ]),
    SC("Deaf Gain", "🎁", "Many people talk about hearing <i>loss</i>. Some Deaf scholars use the words <b>Deaf Gain</b> instead. It means that being Deaf brings things of value: a rich visual language, a strong community and new ways of seeing and building.", "Deaf Gain is about what Deaf people add to the world, not only what is missing.", "A room with open circle seating and good light helps Deaf and hearing people talk together.", [
      "Deaf Gain focuses on...|The value Deaf people bring|Only what is missing|Only sports",
      "Which is a Deaf Gain?|A rich visual language|Having no friends|Less learning",
      "Sign languages show that language can be...|Visual and spatial|Only spoken|Only written",
      "Open circle seating helps people to...|See each other and talk|Hide from each other|Sit alone",
      "Deaf Gain asks us to see Deaf people as...|Part of human variety|Broken|Invisible",
      "Which view is closest to Deaf Gain?|Different, with strengths|Less than hearing people|Needing pity",
      "Hearing people can learn from Deaf culture how to...|Communicate in clear, visual ways|Ignore others|Never share"
    ]),
    SC("Audism and fairness", "⚖️", "<b>Audism</b> is treating people unfairly because they cannot hear, or believing that hearing is better. It can be big, like a school with no interpreter, or small, like brushing off someone who asks what was said. Fairness means giving people the access they need.", "Think about what a fair choice would look like, and who might be left out.", "Saying 'never mind' to a Deaf person who asks what was said leaves them out. Writing it down includes them.", [
      "Audism means...|Unfair treatment because someone is Deaf or hard of hearing|A kind of music|A sign for hello",
      "A meeting has no interpreter or captions for a Deaf worker. That is...|An access problem|Fair|Fun",
      "Someone asks what was said. A fair reply is...|Repeat it or write it down|Never mind|Walk away",
      "Which is fair?|Giving Deaf students interpreters when needed|Leaving them out of conversations|Laughing at them",
      "Believing hearing people are better than Deaf people is an example of...|Audism|Fairness|Teamwork",
      "How can you help stop audism?|Include people and learn about Deaf culture|Stay silent when jokes are mean|Copy unkind jokes",
      "A friend is left out of a joke. You can...|Explain it to them|Hide it|Say it is not important"
    ]),
    PL("Laws that help", "⚖️", "Several laws help protect the rights of Deaf and disabled people, and give access to school, TV and technology.", "Link each law to the area it helps: public life, school, TV, or modern technology.", [
      "Americans with Disabilities Act (1990)::A law that bans disability discrimination in public life and jobs::⚖️",
      "Section 504 (1973)::A law that bans disability discrimination in programs that get federal money::🏛️",
      "IDEA::A law that gives students with disabilities a free, appropriate public education::🎓",
      "Television Decoder Circuitry Act (1990)::A law that made most new TVs include caption chips::📺",
      "CVAA (2010)::A law that updated access rules for modern phones, video and internet::📱"
    ], { qd: "Which law is this?", qt: "What does this law do?" }),
    SC("Open and closed captions", "💬", "<b>Closed captions</b> can be turned on or off by the viewer. <b>Open captions</b> are always on the screen. Captions show spoken words and important sounds, like [door slams]. Good captions are accurate, easy to read, and stay up long enough.", "Think about who controls the captions: the viewer or the video maker.", "A caption that says [phone rings] tells you about a sound, not a word.", [
      "Captions that the viewer can switch off are...|Closed captions|Open captions|Loud captions",
      "Captions that always show on the screen are...|Open captions|Closed captions|Hidden captions",
      "Captions also show...|Important sounds like [knock]|Only music videos|Nothing but the title",
      "Good captions should be...|Accurate and easy to read in time|Tiny and super fast|Full of mistakes",
      "Who benefits from captions?|Deaf viewers and many other people|Only pilots|Nobody",
      "A caption says [door slams]. What does it describe?|A sound|A smell|A color",
      "Captions that cover the speaker's face are...|Hard to use|Perfect|Required"
    ]),
    SC("Deaf interpreters", "🤝", "Some Deaf people work as interpreters. A <b>Certified Deaf Interpreter (CDI)</b> works with a hearing interpreter as a team. A CDI can help when a person's signing is unusual, for example someone who uses home sign or signs from another country. The team makes sure the message gets through.", "A team can solve problems that one person might struggle with.", "Two cooks in one kitchen can finish a hard recipe that one cook would find tricky.", [
      "CDI stands for...|Certified Deaf Interpreter|Certified Dance Instructor|Computer Data Index",
      "A CDI usually works...|With a hearing interpreter as a team|Without ever signing|Alone in the dark",
      "A CDI can help when a person uses...|Home sign or a sign language from another country|Only a loud voice|Only email",
      "Why is teamwork useful for interpreters?|It helps the message get through accurately|It makes the message longer for fun|It stops the signer",
      "A CDI is a person who is...|Deaf|Always a robot|Always a lawyer",
      "Which situation might need a CDI?|A person who uses very limited language|A hearing friend ordering lunch|A song on the radio",
      "Interpreter teams swap turns because...|Interpreting is tiring work|They dislike each other|They need a nap in the room"
    ]),
    SC("Two ways of interpreting", "🔁", "<b>Simultaneous</b> interpreting happens a moment behind the speaker, almost at the same time. <b>Consecutive</b> interpreting happens after the speaker finishes a chunk and pauses. Speeches often use simultaneous interpreting. Short back-and-forth talks may use consecutive.", "Ask yourself: does the interpreter wait for a pause, or follow along right away?", "A guide in a museum who repeats each sentence after the speaker stops is working in the pause-and-repeat way.", [
      "Interpreting that follows the speaker with a small delay is...|Simultaneous|Consecutive|Silent",
      "Interpreting after the speaker finishes a chunk is...|Consecutive|Simultaneous|Instant",
      "Which lets a long speech keep flowing without pauses?|Simultaneous interpreting|Consecutive interpreting|No interpreting",
      "In consecutive interpreting the speaker should...|Pause so the interpreter can catch up|Talk without stopping|Leave",
      "A small delay in simultaneous interpreting is...|Normal, the interpreter needs time to understand|Always a mistake|A secret code",
      "Interpreters work between two...|Languages|Cars|Chairs",
      "To help an interpreter, a speaker should speak...|At a steady, clear pace|As fast as possible|Behind a book"
    ]),
    SC("Black ASL", "🌟", "Black ASL is a variety of ASL that grew in Black Deaf communities. In much of the American South, Black and white Deaf students went to separate schools for many years, so their signing developed differences. Black ASL has its own signs, style and history, and researchers study it as a real language variety.", "Think about how history and communities shape the way people talk and sign.", "Different towns can have different words for the same thing, and no one is wrong.", [
      "Black ASL is...|A real variety of ASL with its own history|A mistake|A secret code",
      "Why did Black ASL grow its own features?|Separate Deaf schools kept communities apart|One dictionary was printed|Radio was invented",
      "Linguists see Black ASL as...|A valid variety of the language|Wrong signing|A different alphabet",
      "Language varieties like Black ASL are shaped by...|Community, history and place|Only the weather|Only math",
      "How should we treat different ways of signing?|With respect|With teasing|By always correcting them",
      "A friend uses signs you do not know. You can...|Ask about them and learn|Say they are wrong|Ignore them"
    ]),
    SC("Deaf artists of the past", "🎨", "Granville Redmond (1871-1935) was a Deaf American painter famous for California landscapes with fields of poppies. He also acted in silent films with the comedy star Charlie Chaplin. Silent films told stories with action, faces and written title cards. Douglas Tilden (1860-1935) was a Deaf sculptor known for public statues.", "Think about the kind of art each person made: painting or sculpture.", "A painter works with colors on a canvas, and a sculptor shapes clay, metal or stone.", [
      "Granville Redmond was a Deaf...|Painter|Pilot|Chef",
      "Redmond is famous for landscapes with fields of...|Poppies|Skyscrapers|Spaceships",
      "Which comedy star did Redmond work with in silent films?|Charlie Chaplin|A talking parrot|A game-show host",
      "Douglas Tilden was a Deaf...|Sculptor|Singer|Baker",
      "A sculptor makes art by shaping...|Clay, metal or stone|Only sounds|Only words",
      "Silent films told stories with...|Action, faces and written title cards|Spoken dialogue only|Smell cards",
      "Why did silent films suit a Deaf actor?|They used action instead of spoken words|They had no pictures|They were very loud"
    ]),
    SC("World Federation of the Deaf", "🌍", "The World Federation of the Deaf (WFD) is an international group made of national Deaf associations. It was founded in 1951 in Rome, Italy. The WFD says there are about 70 million Deaf people in the world and about 300 different sign languages. It works for sign language rights and equal access.", "Think about why a group from many countries could be useful.", "A world sports group helps teams from many countries play by shared rules.", [
      "The WFD is a group made of...|National Deaf associations from many countries|Only one school|Pet shops",
      "The WFD was founded in the year...|1951|1851|1991",
      "Where was the WFD founded?|Rome, Italy|Tokyo, Japan|Lima, Peru",
      "The WFD says the world has about how many Deaf people?|70 million|7 thousand|7 billion",
      "The WFD says there are about how many different sign languages?|300|3|3 million",
      "Why is a world group useful?|Deaf people can share ideas and work for rights|It replaces all languages|It stops travel",
      "The WFD helps push for...|Equal access and sign language rights|Lower candy prices|Louder music"
    ]),
    letterSum(),
    SC("Fingerspelling manners", "✋", "Fingerspelling is easier to read when you follow some habits. Keep your hand in one spot near your shoulder with the palm facing the reader. Move mostly your fingers, not your whole arm. Keep a smooth rhythm and pause a little between words. Use real signs when you know them.", "Picture what makes spelling clear for the person who is reading it.", "A clear speaker does not mumble or race. A clear speller is steady in the same way.", [
      "Where should your spelling hand be?|Near your shoulder in clear view|Behind your back|Under the table",
      "Your palm faces...|The person reading|The floor always|Your own face",
      "When fingerspelling you mostly move your...|Fingers|Whole body|Feet",
      "A good rhythm is...|Smooth and steady|Wild and jumpy|Frozen for ten seconds",
      "Between two words you should...|Pause a little|Rush with no break|Wave",
      "A reader looks confused. You can...|Slow down and spell it again|Spell faster|Stop forever",
      "Spelling every word of a sentence letter by letter is...|Slow to read, so use real signs when you know them|The best way always|Required every time"
    ]),
    readSpell("Read school subjects", ["science", "history", "algebra", "geometry", "english", "music", "health", "reading", "writing", "drama", "spanish", "library"], "Fingerspelling is often used for school words. Read these school subjects letter by letter and put the word together."),
    SC("Dinner with signers", "🍽️", "Meals are social, and signers need their hands to talk. At a table, sit where everyone can see each other, like a circle or a U shape. Put food down or pause eating while you sign. Pass things between conversation turns. Keep the light bright enough to see signs and faces.", "Think about what signers need during a meal: sight lines and free hands.", "A round table lets everyone see everyone, like a campfire circle.", [
      "Which seating helps signers at dinner?|A circle or U shape|A line facing a wall|Everyone facing away",
      "You want to talk with food in your hands. You should...|Put the food down, then sign|Sign with your hands full|Walk away",
      "Why do signers sometimes wait to eat?|Their hands are needed to talk|They dislike food|They are shy",
      "Good light at dinner helps because...|Signs and faces are easier to see|Food tastes louder|Light is bad",
      "A good time to pass the salt is...|Between conversation turns|Right in front of someone's signing hands|Never",
      "Someone waves to get your attention at the table. You...|Look and respond|Keep eating without looking|Leave",
      "Everyone seeing each other makes dinner more...|Inclusive|Lonely|Confusing"
    ])
  ];

  // ================= LEVEL 17 =================
  const L17 = [
    SC("Total communication", "🧰", "<b>Total communication</b> is an approach in schools that uses many ways to communicate: signs, speech, fingerspelling, writing, gestures, pictures and hearing devices. <b>Simultaneous communication</b> (sim-com) means signing and speaking at the same time. It can be hard to do both fully, because ASL and English have different grammar.", "Think about the word 'total' and what a full toolbox contains.", "A builder with many tools can fix more kinds of problems than a builder with just one.", [
      "Total communication uses...|Many ways to communicate|Only one way|Only writing",
      "Signing and speaking at the same time is called...|Simultaneous communication|Silent reading|Mirror signing",
      "Why is sim-com tricky?|ASL and English have different grammar|Hands are too heavy|Voices are too quiet",
      "Which is part of total communication?|Fingerspelling|Only spoken English|A locked door",
      "A school using total communication wants students to...|Understand in the way that works for them|Use only one tool|Sit silently",
      "Writing notes back and forth is...|One way to communicate|Never useful|Against all rules"
    ]),
    SC("English as a second language", "📚", "Many Deaf children learn ASL first and English second. ASL has no everyday written form, so reading and writing English is like learning a new language. ASL and English have different grammar, and English words do not match signs one to one. A strong first language can help a child learn English.", "Think about how learning any second language feels.", "A Spanish speaker learning English must learn new words and new grammar, and takes time.", [
      "Many Deaf kids learn English as a...|Second language|Fifth language|Secret code",
      "Why might English writing be a challenge?|It follows different grammar than ASL|ASL has no hands|Books are invisible",
      "A strong first language can help a child learn...|A second language|Nothing at all|Only drawing",
      "Does every English word match one sign?|No|Yes, always|Only on weekends",
      "A good way to help a Deaf learner with English is...|Share books, captions and writing in a friendly way|Take away ASL|Hide all text",
      "ASL grammar is...|Its own system|Just English on the hands|Missing",
      "A Deaf classmate's writing looks different from yours. You should be...|Kind and never make fun|Mean|Annoyed"
    ]),
    SC("Jobs that use sign language", "💼", "Many jobs use sign language. An <b>interpreter</b> changes messages between sign and voice. A <b>teacher of the Deaf</b> teaches Deaf students. An <b>audiologist</b> tests hearing. A <b>speech-language pathologist</b> helps with speaking and language skills. A <b>linguist</b> studies how languages work. Deaf people work in all kinds of jobs too.", "Match the job to what the person does all day.", "A librarian helps people find books, and a chef cooks. Each job has its own tasks.", [
      "Who tests how well people hear?|An audiologist|A baker|A pilot",
      "Who studies how languages work?|A linguist|A plumber|A clown",
      "Who teaches Deaf students?|A teacher of the Deaf|A lifeguard|A mechanic",
      "Who changes a message between sign and voice?|An interpreter|A mapmaker|A farmer",
      "Can Deaf people work as doctors, artists and engineers?|Yes, in all kinds of jobs|No, only a few|Only in one job",
      "Which job helps with speaking and language skills?|A speech-language pathologist|An electrician|A roofer"
    ]),
    SC("Nothing about us without us", "📣", "Disability rights groups use the motto <b>'Nothing about us without us.'</b> It means that decisions about a group should include people from that group. For Deaf people, Deaf teachers, leaders and experts should help make plans about Deaf education, tools and services.", "Think about who knows best what a group needs.", "A park built for kids works better when kids help design it.", [
      "'Nothing about us without us' means...|Include the people the decision is about|Leave them out|Decide quickly",
      "A school plans a new Deaf program. Who should help plan it?|Deaf people and their families|Nobody|People who never met a Deaf person",
      "A company designs a sign-language app. Who should test and advise?|Deaf signers|Nobody who signs|Only advertisers",
      "Leaving people out of decisions can make plans...|Work badly|Work perfectly|Louder",
      "The motto is about...|Respect and having a voice|Silence|Money only",
      "The best way to learn what Deaf students need is to...|Ask them|Guess|Assume nothing matters"
    ]),
    SC("Deaf people in the movies", "🎬", "Films show Deaf life better when Deaf actors, writers and consultants help. The film <i>CODA</i> won the Oscar for Best Picture in 2022, and Troy Kotsur, a Deaf actor in the film, won Best Supporting Actor. CODA also means 'child of Deaf adults.'", "Think about why it helps to have the people in the story help to tell it.", "A film about astronauts is more real when real astronauts give advice.", [
      "Troy Kotsur won an Oscar for the film...|CODA|Frozen|Toy Story",
      "Troy Kotsur is...|A Deaf actor|A chef|A judge",
      "Why does it help when Deaf actors play Deaf characters?|The story feels more real and Deaf actors get jobs|It does not matter|It makes the film shorter",
      "CODA also stands for...|Child of Deaf Adults|Cat on Desk Always|Cool Original Dance Act",
      "Good media shows Deaf people as...|Real people with many parts to their lives|All the same|Only sad",
      "Who can help a film show signing correctly?|Deaf consultants|No one|Only chefs",
      "Best Picture is...|The top award for a film at the Oscars|A drawing contest|A cooking prize"
    ]),
    SC("Signing avatars and AI", "🤖", "Some computer tools try to translate between sign and speech or text, or use cartoon signing figures called <b>avatars</b>. These tools are still limited. Sign language uses hands, face, body and space, and computers often miss the meaning. Many Deaf people want to help build such tools and want human interpreters to stay available for important talks.", "Think about how many parts of the body carry meaning in a sign.", "A phone can mis-translate a joke. For serious things you check with a person.", [
      "A signing avatar is...|A computer figure that signs|A real interpreter|A kind of hat",
      "Why can computers struggle to read sign language?|Meaning comes from hands, face, body and space|Hands cannot be seen|Signs are always the same",
      "For a doctor visit, which is safer?|A qualified human interpreter|An untested app alone|Nothing",
      "Who should help build sign-language tools?|Deaf signers|Nobody who signs|Only advertisers",
      "If an app mistranslates, the best step is to...|Ask a fluent signer|Trust it blindly|Shout",
      "Why do facial expressions matter for a sign-reading tool?|They are part of the grammar|They are decoration|They are random",
      "Technology can be...|A helpful tool but not a full replacement for people|Perfect in every way|Always harmful"
    ]),
    SC("Technology timeline", "📞", "Technology for Deaf people has changed quickly. TTY calls began in the 1960s. Open captions came to public TV in the 1970s. Caption chips became required in TVs in the 1990s. In the 2000s video phones, texting and video relay made calls easier. Today video calls and captions are everywhere.", "Think about the order: typing over phone lines, then captions on TV, then video calls.", "Letters came before email, and email came before video calls.", [
      "Which came first?|TTY calls|Video relay|Smartphone video calls",
      "Which is newest?|Smartphone video calls|TTY calls|Open captions on a TV show",
      "Texting and video phones made it easier for Deaf people to...|Talk to others without a TTY|Hear music|Swim",
      "A TTY lets people type messages over...|A phone line|A garden hose|A paper airplane",
      "Which shows words on a TV screen?|Captions|A TTY|A hearing dog",
      "Video relay lets a Deaf signer call a hearing person through...|An interpreter on video|A speaker|A map",
      "Technology works best when it is built...|With users' needs in mind|Without testing|For nobody"
    ]),
    PL("Access words", "🔑", "Access means making sure everyone can use and understand things. Here are words about access that you may meet.", "Link each word to who it helps: Deaf viewers, blind viewers, or readers of images.", [
      "Captions::Text on screen with the words spoken and important sounds::💬",
      "Live captioning (CART)::Trained captioners typing speech into text as it happens::⌨️",
      "Transcript::A full written copy of what was said::📄",
      "Audio description::Spoken details of what is seen, for blind viewers::🎧",
      "Alt text::Words describing a picture for people who cannot see it::🖼️",
      "Video relay::Sign-to-voice phone calls through an interpreter on video::📹"
    ], { qd: "Which access word is this?", qt: "What does this access word mean?" }),
    SC("Fair surveys", "📝", "A survey asks people questions to learn about a group. To be fair, ask many different people, use clear questions in a language they understand (offer ASL or captions), and report results honestly. Never speak for a group without asking the group.", "Think about who should be asked and how to make the questions easy to answer.", "To learn what a class likes for lunch, you ask many students, not just your best friend.", [
      "To learn what Deaf students think, you should...|Ask many Deaf students|Ask one person only|Guess",
      "A fair survey question is...|Clear and not pushing an answer|Tricky|Rude",
      "A survey for Deaf people should be available in...|A form they can access, like ASL or captions|Voice only|Smoke signals",
      "If you only ask your friends, the results may be...|Unfair for the whole group|Perfect|Magical",
      "Reporting results honestly means...|Sharing what people really said|Changing answers|Hiding some",
      "Asking only a hearing teacher to answer for Deaf students is...|Not as good as asking the students|Always best|Required",
      "Why keep a survey short and clear?|So people can understand and finish|To hide the point|To trick people"
    ]),
    meanMk(),
    readSpell("Read science words", ["telescope", "gravity", "molecule", "habitat", "climate", "fossil", "volcano", "energy", "oxygen", "planet", "magnet", "neutron"], "Science class has long words that are often fingerspelled. Read these letter by letter and put the word together."),
    SC("DeafBlind supports", "🤲", "DeafBlind people have both hearing and vision differences. A <b>Support Service Provider (SSP)</b> helps with things like getting around, shopping and learning about surroundings, in the way the person chooses. An SSP is not the same as an interpreter. Some DeafBlind people use tactile signing, where the receiver feels the signs with their hands.", "Think about what a helper does, and who gets to decide how they help.", "A guide at a new school helps you find your way, but you decide where you want to go.", [
      "SSP stands for...|Support Service Provider|Sign Spelling Plan|Super Slow Pace",
      "An SSP helps a DeafBlind person with...|Getting around and information about surroundings|Winning games|Cooking every meal",
      "Is an SSP the same as an interpreter?|No, the jobs are different|Yes, identical|Yes, the very same",
      "Tactile signing means the receiver...|Feels the signs with their hands|Listens|Watches from far away",
      "Who decides how an SSP helps?|The DeafBlind person|The SSP alone|A stranger",
      "When you guide a DeafBlind person, you should...|Ask how they would like to be guided|Grab them|Pull them quickly"
    ]),
    SC("International Week of the Deaf", "🗓️", "Every September, Deaf communities around the world celebrate International Week of the Deaf, which is led by the World Federation of the Deaf. Schools and clubs hold events such as storytelling, Deaf speakers, sign classes and captioned movies. The week celebrates Deaf culture and sign languages and reminds people about rights.", "Think about when the week happens and who leads it.", "Birthdays are celebrated once a year with the people who matter. This week is a party for a whole community.", [
      "International Week of the Deaf is in which month?|September|February|July",
      "Which group leads it?|The World Federation of the Deaf|A candy company|A bank",
      "A good event for the week is...|A sign class or a Deaf speaker|A loud show with no captions|A party behind closed doors",
      "Events for Deaf awareness should have...|Interpreters or captions|No access|Sound only",
      "A purpose of such a week is to...|Celebrate Deaf culture and sign languages|Hide them|Take them away",
      "Deaf people should be...|Invited to lead the event|Left out|Kept quiet"
    ]),
    SC("Types of hearing differences", "👂", "People hear differently for different reasons. <b>Conductive</b> hearing loss means sound has trouble moving through the outer or middle ear. <b>Sensorineural</b> hearing loss involves the inner ear or the nerve. Some people have both, called <b>mixed</b>. Each person's needs are different.", "Think about the path of sound through the ear: outside first, deeper next.", "A letter can get stuck at the post office or at the final house. The trouble spot changes the fix.", [
      "Conductive hearing loss is a problem in the...|Outer or middle ear|Eyes|Knee",
      "Sensorineural hearing loss involves the...|Inner ear or nerve|Outer ear only|Toes",
      "Who can test hearing?|An audiologist|A plumber|A florist",
      "Do all people with hearing differences need the same help?|No, needs differ|Yes, identical|Nobody needs help",
      "A person with both kinds has...|Mixed hearing loss|Double vision|A cold",
      "Where does sound travel first?|The outer ear|The inner ear|The brain",
      "The cochlea is in the...|Inner ear|Elbow|Nose"
    ]),
    SC("Taking part as a citizen", "🗳️", "Deaf Americans vote, serve on juries, run for office and work in government. Courts must give a qualified interpreter when a Deaf person needs one, and jury duty can be done with an interpreter. Civic life works best when everyone can take part.", "Think about what citizens do and what access they need to do it.", "A town meeting is better when every neighbor can follow what is said.", [
      "Can Deaf people vote?|Yes|No|Only at night",
      "A Deaf juror may use...|A qualified interpreter|No help|A loudspeaker",
      "Why should courts provide interpreters?|So the person can understand and take part|To slow the court|To save money",
      "Can Deaf people run for office?|Yes|Never|Only in dreams",
      "Which law supports access in courts?|The Americans with Disabilities Act|A cooking rule|A traffic sign",
      "Civic life means...|Taking part in your community|Staying hidden|Fighting",
      "A town meeting has no captions or interpreter. People can ask...|For access in advance|To skip it|To leave"
    ]),
    SC("Claims and evidence", "🗣️", "A good discussion uses a <b>claim</b> (what you think), <b>evidence</b> (facts that support it) and <b>reasons</b> (why the facts matter). Disagree with the idea, not the person. A sample topic: 'Should schools offer ASL as a language class?'", "Separate what someone thinks from the facts they use to support it.", "Claim: our class should read more. Evidence: students who read more write better. Reason: practice helps.", [
      "A claim is...|What you think is true|A joke|A sound",
      "Evidence is...|Facts that support a claim|A guess|A rumor",
      "Which sentence is a claim?|Every school should teach some sign language|The school has 300 students|It is eight o'clock",
      "Which is better evidence?|A study or a report by a Deaf teacher|My cousin said so, maybe|I just feel like it",
      "In a respectful debate you...|Argue against ideas, not people|Insult people|Interrupt a lot",
      "Your partner makes a good point. You can...|Say so and answer calmly|Pretend you did not see|Laugh",
      "A good reason explains...|Why the evidence supports the claim|Nothing|A different topic"
    ]),
    SC("Telling a story in ASL", "📖", "A good story in ASL, like in any language, has parts: set the scene (who and where), introduce the problem, tell events in order, and end with how things work out. Signers use space, facial expressions and role shift to show different characters.", "Think about the shape of a story from start to finish.", "In a fairy tale you meet the hero, then a problem, then a solution.", [
      "What comes first in many stories?|The setting and characters|The ending|The credits",
      "What shows that a character changes in an ASL story?|Role shift, with body and face|Nothing|A drum",
      "The problem in a story is...|What the character must solve|The title|The last word",
      "A story ends with...|How things are resolved|A new problem only|Nothing",
      "Signers can place characters in...|Different spots in the signing space|A pocket|Under chairs",
      "Why use facial expressions in a story?|They show feelings and who is speaking|They are random|They hide the plot",
      "Events should be told...|In an order the audience can follow|Backwards with no clue|Randomly"
    ]),
    classTime()
  ];

  // ================= LEVEL 18 =================
  const L18 = [
    SC("Persuasive talks", "🎤", "A persuasive talk tries to help the audience agree with you. Start with a hook, state your claim, give two or three reasons with evidence, answer a worry, and end with a call to action. If an interpreter will sign your talk, share your notes ahead of time and speak at a clear, steady pace.", "Think about the order of parts that makes a talk easy to follow.", "A good sales pitch grabs you, explains why, and then asks you to do something.", [
      "A hook at the start of a talk...|Gets the audience interested|Ends the talk|Hides the claim",
      "A call to action tells the audience...|What to do next|To be silent|To leave early",
      "Which makes your claim stronger?|Evidence|Shouting|Guessing",
      "If an interpreter will interpret your talk, you should...|Share your notes ahead of time|Surprise them|Talk very quickly",
      "Why mention an opposite view and answer it?|It shows you thought carefully|It confuses the audience|It ends the talk",
      "A conclusion should...|Wrap up the main idea|Start a new topic|Be silent"
    ]),
    SC("Helpful feedback", "🗨️", "When a friend practices signing, give feedback that is kind, specific and helpful. Ask first: 'Do you want feedback?' Say one good thing, then one thing to try, with an example. The goal is to help them grow.", "Think about feedback that you would like to receive yourself.", "'Your story was clear. Try slowing down on the names.' tells what worked and what to try.", [
      "Which is specific feedback?|Your fingerspelling was clear but a bit fast on long words|It was bad|It was fine",
      "Before giving advice you can...|Ask if they want feedback|Say nothing forever|Laugh",
      "A kind way to start is with...|Something they did well|A complaint|A joke about them",
      "'Try to slow down on long words' is...|A helpful suggestion|Mean|Useless",
      "A Deaf teacher corrects your sign. You should...|Say thank you and try again|Argue|Hide",
      "The goal of feedback is...|To help someone improve|To show off|To win"
    ]),
    SC("Planning an awareness event", "📋", "To plan a Deaf awareness event, ask Deaf people to help lead it. Decide the date and place, book interpreters or captions early, choose a room with good light and clear sight lines, share the plan in writing and on video, and ask for feedback afterwards.", "Think about the steps from the first idea to the day after the event.", "Planning a birthday party works best when you pick a date early and invite the guest of honor to help.", [
      "Who should help lead a Deaf awareness event?|Deaf community members|Nobody|Only strangers",
      "When should you book interpreters?|Early|After the event|Never",
      "Which room helps signers?|Good light and clear sight lines|Dark with big pillars|Echoing hall only",
      "How should you share the plan?|In writing and in video with captions|By whisper only|Not at all",
      "After the event, you should...|Ask for feedback|Forget it|Delete the plan",
      "The point of the event is to...|Include and celebrate people|Show off|Make noise"
    ]),
    SC("Volunteering well", "🙋", "If you volunteer with a Deaf group, be reliable, ask what help is wanted, and let Deaf people lead. Do not say you are an interpreter unless you are trained and qualified. Respect privacy. Practicing sign is good, but a student is not a professional interpreter.", "Think about the difference between helping and taking over.", "A new helper at a food bank asks where to start and does not rearrange the shelves.", [
      "A student learning ASL should not...|Pretend to be a trained interpreter|Practice|Carry chairs",
      "First, a volunteer should...|Ask what help is wanted|Take over|Leave",
      "Privacy means...|Not sharing personal information|Telling everyone|Posting it online",
      "Who should lead a Deaf event?|Deaf people|Volunteers who just arrived|Nobody",
      "A good volunteer is...|Reliable and respectful|Late|Bossy",
      "Why is a trained interpreter needed at a hospital?|Mistakes can be serious|It looks nice|Nobody wants to"
    ]),
    SC("Who should interpret?", "🧑‍⚖️", "Children and friends should not be asked to interpret serious things, like medical or legal talks. They may not know the words, may feel pressure, and the talk may be private. A professional interpreter is trained and keeps things confidential. For small casual moments, a friend helping is fine.", "Think about how serious the situation is and who is trained for it.", "A friend can help you carry a box, but a surgeon should do an operation.", [
      "Who should interpret a medical visit?|A professional interpreter|A child|A stranger",
      "Why is it unfair to ask a kid to interpret big adult matters?|It puts too much pressure on the child|It is always fun|They love it",
      "A professional interpreter keeps things...|Confidential|Public|Loud",
      "A friend helps order pizza. Is that okay?|Yes, it is a small casual moment|It is always wrong|It is against the law",
      "You are asked to interpret something serious. You can say...|I am not trained, let us get an interpreter|Sure, anything|Never mind",
      "Privacy matters because...|Personal information should be protected|Nobody cares|It is boring"
    ]),
    SC("Cultural humility", "🌱", "Cultural humility means you stay curious, listen, and accept that you do not know everything. You do not have to be an expert on a culture that is not yours. Learn from Deaf people themselves, accept correction kindly, and share what you learn without taking over.", "Think about how a good learner acts when someone else knows more.", "A guest in someone's home follows their lead and asks questions.", [
      "Cultural humility means...|Staying curious and listening|Knowing everything|Telling others what to do",
      "A Deaf friend corrects your sign. You...|Thank them and fix it|Argue|Quit",
      "A hearing learner should avoid...|Speaking for Deaf people|Learning|Asking questions",
      "Where do you learn Deaf culture best?|From Deaf people|From guesses|From jokes",
      "Taking over a Deaf event is...|Not respectful|Great|Needed",
      "Being humble means admitting...|You can always learn more|You know it all|You are finished learning"
    ]),
    SC("Performing respectfully", "🎶", "Signing a song at school can be fun, but do it with care. Learn from a Deaf teacher or signer, give credit, understand each sign before you perform it, and consider inviting Deaf performers. Signing is a language, not just a decoration.", "Think about how to honor the people whose language you are using.", "Before you cook another family's recipe for a party, you ask them how it is really made and thank them.", [
      "Before performing a signed song, you should...|Learn from Deaf signers and understand the signs|Make up random moves|Guess",
      "Giving credit means...|Naming who taught or made it|Hiding names|Taking it for yourself",
      "Signing is...|A real language|Just decoration|A toy",
      "A great way to include the Deaf community is to...|Invite Deaf performers|Leave them out|Make jokes about them",
      "You do not understand a sign. You should...|Ask before performing it|Make it up|Pretend",
      "Why not make up fake signs?|It spreads wrong information and disrespects the language|It is too easy|It is too quiet"
    ]),
    SC("Case study: the dance", "🎶", "A school dance has loud music and a Deaf student. Think of ways to include everyone: a well-lit spot to chat, lyrics or announcements on a screen, and friends who check in kindly.", "Think about how to share information in ways that do not depend on sound alone.", "A fire drill with only a bell leaves some people out. A bell plus a flashing light includes everyone.", [
      "The DJ makes an announcement. How can a Deaf student get it too?|Put it on a screen or tell them directly|Skip it|Whisper it",
      "Where could friends chat in sign?|A well-lit spot|A dark corner|Outside in the rain",
      "Lyrics on a screen help because...|Everyone can follow along|They are loud|They hide the song",
      "A friend feels left out. You can...|Invite them and check in|Ignore them|Tease them",
      "Before a speech, the host should...|Make sure an interpreter or captions are ready|Mumble in the dark|Skip the speech",
      "Dancing is great because it is...|Visual, so everyone can join|Only for loud people|Unfair"
    ]),
    SC("Case study: the group chat", "💬", "In a group chat, a Deaf friend can read text but not voice notes. To include them, type, or use video with captions, share the plan in writing, and avoid inside jokes that leave people out.", "Think about whether each message can be used by everyone in the chat.", "A flyer with only a picture leaves out a blind reader. Adding words fixes it.", [
      "Your friend cannot hear voice notes. Instead you can send...|Text or captioned video|More voice notes|Nothing",
      "A video in the chat has no captions. You can...|Add captions or a summary|Leave it|Make it louder",
      "A speech-to-text tool may make mistakes. You should...|Check with the friend if it is unclear|Believe it blindly|Blame them",
      "The plan for tonight is in a voice note. You...|Type the plan too|Hope they guess|Skip them",
      "Inside jokes in a chat can...|Leave people out|Always bring people together|Fix grammar",
      "Short, clear texts with emoji are...|Often helpful|Banned|Rude"
    ]),
    SC("Case study: the assembly", "🎙️", "A school assembly has a guest speaker. Give the interpreter the notes early, reserve front seats where Deaf students can see both the interpreter and the speaker, add captions to slides and videos, and light the interpreter's area.", "Think about what the interpreter and the audience each need to do their parts.", "A concert has a stage light so the audience can see the singers.", [
      "Where should Deaf students sit?|Front, with a clear view|Back corner|Behind a pillar",
      "The interpreter should have...|A well-lit spot near the speaker|A dark closet|No space",
      "The video has no captions. The school should...|Add captions|Hope for the best|Turn off the sound only",
      "Giving the interpreter the speaker's notes early helps them...|Prepare|Relax|Nap",
      "The speaker should...|Speak clearly and not too fast|Rush|Whisper",
      "Slides should be...|Easy to read with few words|Tiny text|Blank"
    ]),
    SC("Case study: the museum", "🏛️", "On a field trip, a Deaf student wants to enjoy the museum. The group can ask ahead for a signed tour or written guide, use captions or transcripts for videos, and stay together so everyone can see the guide's hands and face.", "Think about the information the museum shares by voice and how it could be shared another way.", "A foreign visitor appreciates a map in their language. A Deaf visitor appreciates a signed or written guide.", [
      "Before the trip you can ask the museum for...|A signed tour or written guide|Less light|Nothing",
      "On the tour, you should stand where you can see the guide's...|Face and hands|Back only|Shoes",
      "A film in the museum has no captions. A good solution is...|A transcript or captioned version|Skipping the film|Closing your eyes",
      "A guide turns away to point while talking. A better habit is to...|Face the group when speaking|Talk louder|Stop talking",
      "To share what you saw later, you can...|Take notes together|Forget it|Hide the notes",
      "Staying together as a group helps because...|Everyone can see the guide|Nobody can see|It is louder"
    ]),
    readSpell("Read community words", ["community", "interpreter", "advocate", "accessible", "equality", "culture", "history", "heritage", "respect", "language", "captions", "identity"], "Words about community and rights are often fingerspelled. Read these letter by letter and put the word together."),
    budget(),
    medianMk(),
    timelineLesson(),
    SC("Keep learning", "🚀", "Learning ASL is a long road. Take classes taught by Deaf teachers, go to Deaf events when you are welcome, watch videos by Deaf creators, practice with a partner, and keep a notebook describing signs in words. Fluency can take years, so celebrate small steps.", "Think about habits that keep a learner growing over many months.", "A musician practices a little every day instead of all in one night.", [
      "How long does it take to become fluent in a language?|Often years|One day|One minute",
      "A good way to learn is from...|Deaf teachers|Guessing|Rumors",
      "A practice notebook can hold...|New signs with descriptions and notes|Only doodles|Nothing",
      "Setting small goals helps you...|Stay motivated|Stop|Quit",
      "Practicing with a partner builds...|Both receptive and expressive skills|Nothing|Only silence",
      "Mistakes while learning are...|Normal|Terrible|Forbidden"
    ]),
    SC("Language pride", "💛", "Many Deaf people take pride in their language and culture. In the past some Deaf children were told not to sign. Today Deaf communities celebrate sign languages, tell their histories and teach the next generation. Language pride is good for everyone.", "Think about how a community keeps its language alive.", "People pass on songs and stories so the next generation keeps them.", [
      "Many Deaf people feel pride in their...|Language and culture|Nothing|Only music",
      "Teaching sign to the next generation...|Keeps the language alive|Ends it|Hides it",
      "Deaf history is shared through...|Stories, books and videos|Secrets|Nothing",
      "Language pride means you...|Value your language and others'|Look down on others|Hide",
      "Saying a sign language is a real language is...|Correct|Wrong|Silly",
      "Celebrating a language includes...|Respecting the people who use it|Ignoring them|Copying without credit"
    ]),
    SC("Case study: the new classmate", "👋", "A new Deaf classmate joins your class. Say hello, learn their name sign when they share it, ask how they like to communicate, face them when you talk, and invite them to join in.", "Think about what a friendly, patient classmate would do on the first day.", "On your own first day, a kind invitation to sit together felt great.", [
      "You can ask the new classmate...|How they like to communicate|What is wrong with their ears|Whether they can hear you",
      "You learn their name sign when...|They share it|You invent one|You guess",
      "When you talk, you should...|Face them and speak clearly|Look away|Cover your mouth",
      "At lunch, you can...|Invite them to sit with you|Ignore them|Whisper about them",
      "If there is an interpreter in class, you speak to...|The classmate, not the interpreter|The ceiling|Only the interpreter",
      "A good first impression is...|Friendly and patient|Impatient|Mocking"
    ])
  ];

  Object.assign(SIGN_LEVELS, {
    16: lvl(16, L16, [0, 1, 3, 5, 8, 10, 13, 15]),
    17: lvl(17, L17, [0, 2, 4, 6, 8, 12, 14, 16]),
    18: lvl(18, L18, [0, 1, 4, 6, 7, 11, 14, 16])
  });
})();
