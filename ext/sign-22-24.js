// ext/sign-22-24.js  Mind Lab Sign Language (ASL), levels 22-24 (60 lessons)
// Only things we are sure about: fingerspelling, number signs, ASL grammar ideas, Deaf culture, history, law, research ethics, interpreting and etiquette.
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
  const readSpell = (title, words, note) => MK(title, "🔠", note, "M-E-A-D-O-W", "M, E, A, D, O, W. Put them together and you get <b>meadow</b>.",
    "Read the rhythm of the whole word, not each letter alone. Say the word in your head as soon as you can guess it.", () => {
      const w = pick(words), ex = pick(["sun", "cat", "pig", "bus", "map"]);
      return {
        text: `A friend fingerspells these letters, one after another:<br><b>${UP(w).split("").join(" - ")}</b><br>What word is it?`, visual: "🔠", textInput: true, answer: w,
        hints: ["Say the letters quickly in your head and listen for the word.", `The word has ${w.length} letters and starts with "${UP(w[0])}".`, `Example: ${UP(ex).split("").join(" - ")} spells "${ex}". Now do yours.`]
      };
    });
  const unscramble = (title, words) => MK(title, "🔀", "Here is a word puzzle for your fingerspelling eyes. The letters of a word come out in the wrong order. Put them back in order to find the word.",
    "N-I-A-R-B-O-W", "Try moving letters around until a word appears: R-A-I-N-B-O-W spells <b>rainbow</b>.",
    "Look for a common ending or beginning first, like -ing or str-, then fit the other letters around it.", () => {
      const w = pick(words), ex = "rainbow";
      let sc = w;
      for (let i = 0; i < 30 && sc === w; i++) sc = shuf(w.split("")).join("");
      return {
        text: `The letters of a word are mixed up:<br><b>${UP(sc).split("").join(" - ")}</b><br>Put them in order. What is the word?`, visual: "🔀", textInput: true, answer: w,
        hints: ["Try to find a small word or an ending hidden inside the letters.", `The word has ${w.length} letters and starts with "${UP(w[0])}".`, `Example: ${UP("nirabwo").split("").join(" - ")} can be arranged into "${ex}". Now do yours.`]
      };
    });
  const pace = () => MK("Fingerspelling pace", "⏱️", "Speed is a rate: letters per second. If a signer spells a steady number of letters each second, you can multiply or divide to answer questions about time and length.",
    "6 letters per second", "At 6 letters per second, a word of 18 letters takes 18 divided by 6 = <b>3</b> seconds. In 5 seconds the signer spells 6 times 5 = 30 letters.",
    "Letters = rate times seconds. Seconds = letters divided by rate.", () => {
      const rate = pick([2, 3, 4, 5]), secs = pick([2, 3, 4, 5, 6]), letters = rate * secs;
      if (Math.random() < 0.5) return {
        text: `A signer fingerspells steadily at ${rate} letters per second. How many seconds does a word of ${letters} letters take? Type the number only.`, visual: "⏱️", answer: secs,
        hints: ["You know how many letters there are and how many come out each second.", "Divide the number of letters by the letters per second.", "Example: 24 letters at 6 letters per second is 24 divided by 6 = 4 seconds. Now do yours."]
      };
      return {
        text: `A signer fingerspells steadily at ${rate} letters per second. How many letters do they spell in ${secs} seconds? Type the number only.`, visual: "⏱️", answer: letters,
        hints: ["Each second adds the same number of letters.", "Multiply the letters per second by the number of seconds.", "Example: at 6 letters per second for 7 seconds, 6 times 7 = 42 letters. Now do yours."]
      };
    });
  const meanOf = () => MK("Finding the average", "🧮", "The mean (the usual meaning of average) is found by adding all the numbers and dividing by how many numbers there are.",
    "25, 30, 35, 40, 45", "Add: 25 + 30 + 35 + 40 + 45 = 175. Divide by 5 numbers: 175 divided by 5 = <b>35</b>.",
    "Count how many numbers you have before you divide.", () => {
      let v;
      do { v = Array.from({ length: 5 }, () => ri(4, 20)); } while (v.reduce((a, b) => a + b, 0) % 5 !== 0);
      const sum = v.reduce((a, b) => a + b, 0);
      return {
        text: `Five ASL club members practiced fingerspelling for these numbers of minutes this week: <b>${v.join(", ")}</b>. What is the mean number of minutes? Type the number only.`, visual: "🧮", answer: sum / 5,
        hints: ["The mean needs two steps: a total, then a share.", "Add all five numbers, then divide that total by five.", "Example: 10, 20, 30 add up to 60, and 60 divided by 3 numbers = 20. Now do yours."]
      };
    });
  const pctChange = () => MK("Percent change", "📈", "A percent change tells how much something grew or shrank compared with where it started. Find the change, divide by the starting number, then multiply by 100.",
    "50 to 65", "The change is 65 - 50 = 15. Then 15 divided by 50 = 0.3, and 0.3 times 100 = <b>30</b> percent increase.",
    "Always divide by the starting number, not the ending number.", () => {
      const old = pick([20, 40, 50, 80, 100, 200]), p = pick([10, 20, 25, 50]), ch = old * p / 100;
      if (!Number.isInteger(ch)) return pctChange().make();
      if (Math.random() < 0.5) return {
        text: `An ASL club grew from ${old} members to ${old + ch} members. By what percent did it grow? Type the number only.`, visual: "📈", answer: p,
        hints: ["First find how many members were added.", "Divide the number added by the starting number of members, then multiply by 100.", "Example: 40 to 52 is 12 more, and 12 divided by 40 = 0.3, so 30 percent. Now do yours."]
      };
      return {
        text: `Attendance at a signing workshop fell from ${old} people to ${old - ch} people. By what percent did it fall? Type the number only.`, visual: "📉", answer: p,
        hints: ["First find how many fewer people came.", "Divide the drop by the starting number of people, then multiply by 100.", "Example: 60 to 45 is 15 fewer, and 15 divided by 60 = 0.25, so 25 percent. Now do yours."]
      };
    });
  const unitRate = () => MK("Cost and sharing", "💵", "Access costs money, and good planners do the math. Multiply to find a total. Divide a total to find a fair share for each person.",
    "2 interpreters, 7 hours, $45", "Each hour costs 2 times $45 = $90. For 7 hours: 90 times 7 = <b>630</b> dollars.",
    "Break it into steps: cost for one hour first, then all the hours.", () => {
      if (Math.random() < 0.5) {
        const h = ri(2, 6), r = pick([30, 40, 50, 60, 70, 80]);
        return {
          text: `In this puzzle, two interpreters work together for ${h} hours. Each one is paid $${r} per hour. What is the total cost in dollars? Type the number only.`, visual: "💵", answer: 2 * h * r,
          hints: ["Two people are paid for every hour.", "Multiply the number of interpreters, the hours and the pay per hour.", "Example: 2 interpreters for 5 hours at $20 an hour: 2 times 5 times 20 = 200. Now do yours."]
        };
      }
      const n = pick([4, 5, 6, 10]), c = pick([5, 8, 12, 15, 20]);
      return {
        text: `A class of ${n} students shares the $${n * c} cost of a captioned video night equally. How many dollars does each student pay? Type the number only.`, visual: "💵", answer: c,
        hints: ["Sharing equally means dividing.", "Divide the total cost by the number of students.", "Example: $96 shared by 8 students is 96 divided by 8 = $12 each. Now do yours."]
      };
    });
  const budget = () => MK("Access budget", "🧾", "Planning an accessible event means adding up every cost. Work out each part first, then add the parts together.",
    "2 interpreters, 5 h, $40 + captioner 2 h, $30", "Interpreters: 2 times 5 times 40 = 400. Captioner: 2 times 30 = 60. Total: 400 + 60 = <b>460</b> dollars.",
    "Write each part on its own line, then add the lines.", () => {
      const h = pick([2, 3, 4]), r = pick([50, 60, 70]), h2 = pick([2, 3, 4]), r2 = pick([40, 50, 60]);
      return {
        text: `In this puzzle, an event needs 2 interpreters for ${h} hours at $${r} per hour each, plus a live captioner for ${h2} hours at $${r2} per hour. What is the total cost in dollars? Type the number only.`, visual: "🧾", answer: 2 * h * r + h2 * r2,
        hints: ["There are two separate costs to find before you add.", "Interpreters: 2 people times hours times pay. Captioner: hours times pay. Then add the two parts.", "Example: 2 interpreters for 3 hours at $10 each is 60, a captioner for 1 hour at $15 is 15, and the total is 75. Now do yours."]
      };
    });
  const schedule = () => MK("Event schedule", "🗓️", "Long events need breaks, especially for interpreters and for eyes that watch signing. To find the total time, add the sessions and then add the breaks between them.",
    "6 sessions of 20 min, 5 min breaks", "Sessions: 6 times 20 = 120. Breaks: only 5 between 6 sessions, so 5 times 5 = 25. Total: 120 + 25 = <b>145</b> minutes.",
    "Breaks go between sessions, so there is one fewer break than sessions.", () => {
      const n = pick([3, 4, 5]), m = pick([30, 45, 60]), b = pick([10, 15]);
      return {
        text: `A workshop has ${n} sessions of ${m} minutes each, with a ${b}-minute break between sessions (none at the start or end). How many minutes does the whole workshop take? Type the number only.`, visual: "🗓️", answer: n * m + (n - 1) * b,
        hints: ["Count the sessions and count the breaks separately.", "There is one fewer break than sessions. Add the session time and the break time.", "Example: 4 sessions of 25 minutes with 5-minute breaks: 100 + 15 = 115 minutes. Now do yours."]
      };
    });

  // =========================== LEVEL 22 ===========================
  const L22 = [
    SC("Hands that match", "🤲", "Linguists have found patterns in signs. If both hands move in a sign, they usually have the <b>same handshape</b>. If the two hands have different shapes, the resting hand (the <b>non-dominant</b> hand) stays still and uses a simple shape as a base. These patterns make signs easier to make and to see.",
      "Ask: are both hands moving, or is one just a base?", "In a sign where a pointing hand moves along a flat resting palm, the flat hand is the base and does not move.", [
        "In a sign where both hands move, the handshapes are usually...|The same|Completely different|Hidden",
        "When the two hands have different shapes, the resting hand usually...|Stays still as a base|Moves faster than the other|Changes shape three times",
        "The hand a signer uses most for moving is the...|Dominant hand|Base hand|Elbow",
        "The resting hand in a one-moving-hand sign is called the...|Non-dominant hand|Main hand|Lost hand",
        "A right-handed signer's dominant hand is usually the...|Right hand|Left hand|Hand that is nearer the door",
        "A left-handed signer usually...|Signs as a mirror image, with the left hand leading|Cannot learn ASL|Must switch to the right hand forever",
        "The base hand in these signs is usually a...|Simple, easy shape|Very hard shape|Different shape each time",
        "Why do these patterns exist?|They make signs easier to produce and see|They were made up for tests|They hide meanings",
        "A signer suddenly swaps their dominant hand in a sentence. Viewers may...|Be briefly confused because it is unexpected|Understand nothing ever again|Think it is a new language"
      ]),
    SC("Fingerspelling inside signs", "🔤", "Some English words are fingerspelled so often that they turn into signs. The letters get blended, some are dropped, and the hand moves in one smooth motion. Examples include #JOB, #BACK and #OK. These are called <b>loan signs</b> or lexicalized fingerspelling.",
      "Think of fingerspelling that has been smoothed into a single sign.", "A signer quickly makes #OK with a small twist and nobody reads it as two separate letters.", [
        "Fingerspelling that turns into a single sign is called...|Lexicalized fingerspelling|Mirror spelling|Silent spelling",
        "Which of these is a well-known loan sign?|#JOB|#ELEPHANT-TRUNK|#PLEASE-WAIT-HERE",
        "In a loan sign, the letters are usually...|Blended, and some change or drop out|Spelled slowly one by one|Written down on paper",
        "Loan signs show that ASL...|Borrows from English and makes it its own|Is just English on the hands|Cannot borrow anything",
        "English borrowed 'ballet' from French. That is like...|ASL making loan signs from English words|ASL copying French grammar|Nothing at all",
        "A loan sign is...|A real part of ASL vocabulary|A spelling mistake|A secret code",
        "Compared with careful fingerspelling, a loan sign is usually...|Faster and shaped like one sign|Slower and clearer|Forbidden",
        "Languages borrow words because...|Speakers meet other languages and need words|A dictionary forces them|Borrowing is always an error"
      ]),
    SC("The signing space", "🧭", "Most signs are made in the <b>signing space</b>: the area in front of the upper body, roughly from the waist to the top of the head and about as wide as the arms. Staying inside it keeps signs easy to see and comfortable to make. Signers also use places in this space to stand for people and things.",
      "Picture an invisible box in front of the chest and shoulders.", "A signer puts one friend on the left side of the space and another on the right, so each place stands for a person.", [
        "The signing space is mostly...|In front of the upper body|Behind the head|Under the table",
        "Staying in the signing space makes signs...|Easier to see and comfortable to make|Impossible to read|Invisible",
        "A signer can use places in the space to...|Stand for people or things|Hide the hands|Mute the face",
        "Signing far outside the space, such as above the head all the time, is...|Tiring and harder to read|Required|The best style",
        "Signing space is roughly as wide as...|The signer's arms|A football field|A pencil",
        "Which part of the body is NOT usually the middle of the signing space?|The toes|The chest|The shoulders",
        "When a signer tucks in the elbows and signs tiny, the style is often used for...|Private or quiet talk|Big speeches|Signing outdoors across a field",
        "Large, wide signing space is often used when...|Talking to a big group|Whispering to a friend|Reading silently"
      ]),
    SC("Time in space", "⏳", "ASL often shows time with a line in space. Signs for the <b>past</b> move back toward or over the shoulder. The <b>present</b> stays close to the body. The <b>future</b> moves forward away from the body. Signers combine this with time signs such as yesterday or tomorrow.",
      "Past is behind, future is ahead.", "A signer moves a hand forward to talk about next year and backward over the shoulder to talk about long ago.", [
        "In ASL, signs about the past move...|Back toward the shoulder|Straight up|Forward far away",
        "Signs about the future move...|Forward, away from the body|Backward|Into the floor",
        "Signs about right now usually stay...|Close to the body|Far behind|Over the head",
        "A signer moves a sign far forward. They are probably talking about...|The far future|The distant past|Nothing at all",
        "A time line in space is a way to show...|When things happen|Where the exit is|How loud it is",
        "Signs like 'tomorrow' and 'yesterday' are...|Time signs that also use the timeline|Only letters|Questions",
        "A sign that moves farther backward over the shoulder shows time that is...|Longer ago|Closer to now|In the future",
        "Why can this help a viewer?|It shows time without extra words|It makes signs silent|It means the speaker is quiet"
      ]),
    SC("Pointing as pronouns", "👉", "Pointing is a normal and polite part of ASL. Pointing to a person who is present means <b>you</b> or <b>he or she</b>. Pointing to yourself means <b>I</b>. If a person is not there, a signer can set a place in the space for them, then point to that place later. The point is called <b>indexing</b>.",
      "Pointing here is grammar, not rudeness.", "A signer sets a friend on the left, then points left to say 'she'.", [
        "In ASL, pointing at a person who is present is usually...|Normal and not rude|Always rude|Not allowed",
        "Pointing to your own chest means...|I or me|You|Nothing",
        "Pointing to a place in space that stands for someone means...|That person (he or she)|The ceiling|Stop",
        "The grammar word for this pointing is...|Indexing|Mirroring|Fingerspelling",
        "To talk about someone who is not there, a signer first...|Sets a place in the space for them|Fingerspells the whole alphabet|Leaves the room",
        "Later, the signer points to that place to mean...|The same person|A new stranger|The alphabet",
        "Pointing at someone in ASL while talking about them in front of them is usually...|A normal way to refer to them|Meant to hurt|Against the law",
        "If a signer points at a place that stands for no one, a viewer will probably...|Be confused|Know everything|Understand perfectly"
      ]),
    SC("Verbs that move between people", "↔️", "Some ASL verbs change their direction to show who does something to whom. A verb that moves from the signer toward you can mean <b>I do it to you</b>. The same verb moving from you toward the signer means <b>you do it to me</b>. Other verbs, like <b>think</b>, are made in one place and do not change this way.",
      "Follow the path from the doer to the receiver.", "A signer makes a 'give' sign that starts at their own chest and ends at a friend: 'I give you.'", [
        "Some verbs show who does what to whom by changing...|Their direction|Their color|Their volume",
        "A verb that moves from the signer toward you usually shows...|I do it to you|You do it to me|Nobody is involved",
        "The same verb moving from you toward the signer shows...|You do it to me|I do it to you|The weather",
        "Verbs that change direction in this way are sometimes called...|Directional or agreement verbs|Silent verbs|Number verbs",
        "A sign like THINK, made at the forehead, is...|Made in one place and does not move between people|Moving between people always|A question sign",
        "Why is direction useful?|It can show who does what without extra signs|It makes the sign louder|It removes the face",
        "If the path starts at a place standing for a friend and ends at the signer, it shows...|The friend does it to the signer|The signer does it to the friend|Nobody does anything",
        "English shows the same idea with...|Word order and small words|Hand movements|Colors"
      ]),
    SC("Question faces", "❓", "In ASL, the face helps make a question. A <b>yes/no question</b> uses raised eyebrows and a head tilted slightly forward. A <b>wh-question</b> (who, what, where, when, why, how) uses lowered, squeezed eyebrows. A rhetorical question, which the signer answers right away, often uses raised eyebrows and then an answer.",
      "Eyebrows up for yes/no, eyebrows down for wh-questions.", "A signer asks 'Do you like the park?' with raised eyebrows and asks 'Where is the park?' with lowered eyebrows.", [
        "A yes/no question in ASL uses...|Raised eyebrows|Lowered, squeezed eyebrows|Closed eyes",
        "A wh-question (who, what, where) uses...|Lowered, squeezed eyebrows|Raised eyebrows only|A wide smile",
        "Which is a yes/no question?|Do you want to play?|Where do you live?|Who is that?",
        "Which is a wh-question?|What is your name?|Are you tired?|Is it cold?",
        "Facial grammar like this is called...|Non-manual signals|Silent letters|Hand extras",
        "Without the right face, a question can look like...|A plain statement|A hello|A song",
        "A signer who asks a question and then answers it right away is using a...|Rhetorical question|Secret code|Number sign",
        "Why are non-manual signals part of the grammar?|They change the meaning of a sentence|They are only for decoration|They are optional jokes"
      ]),
    SC("Mouth movements", "👄", "Signers use two kinds of mouth movements. Some are <b>mouth morphemes</b>, mouth shapes that belong to ASL and add meaning, like 'very big' or 'done carelessly'. Others are <b>mouthed English words</b>. They show the mouth shape of a spoken word while signing. Both can appear in the same conversation.",
      "Ask: is the mouth adding ASL meaning or showing an English word?", "A signer puffs the cheeks while signing 'big' to show something very large.", [
        "A mouth shape that adds meaning and belongs to ASL is called a...|Mouth morpheme|Spoken accent|Mask",
        "Mouthing the shape of an English word while signing is...|Borrowing from English|Not allowed in any language|A kind of fingerspelling letter",
        "A signer puffs cheeks while signing 'big'. The mouth likely adds...|Very large size|A question|A past tense",
        "Mouth shapes in ASL...|Can change the meaning of a sign|Never matter|Are random",
        "A signer who stays still-faced and flat while signing...|May lose some meaning|Says it better|Sounds louder",
        "Mouth morphemes are like...|Adverbs that add how something is done|Names of people|Numbers",
        "Mouthing English words is common...|Among many signers, but people differ in how much they do it|Never|Only at night",
        "Voice off while signing: the mouth is still used for...|Meaning and expression|Nothing|Hiding signs"
      ]),
    SC("Pidgins and creoles", "🌱", "When people with no shared language need to talk, they may build a simple mixed language called a <b>pidgin</b>. When children grow up with it, it can grow into a full new language with its own grammar, called a <b>creole</b>. Something like this happened with Nicaraguan Sign Language: Deaf children were brought together at schools in the 1980s and a new language grew among them.",
      "Simple first, full language after children grow up with it.", "Children in a new school share home gestures, and over years the group builds a real language with grammar.", [
        "A simple mixed language used between groups with no shared language is a...|Pidgin|Poem|Alphabet",
        "When children grow up with a pidgin and make it a full language, it becomes a...|Creole|Rule book|Dictionary",
        "In Nicaragua in the 1980s, Deaf children together at schools...|Built a new sign language|Stopped communicating|Were forced to use only speech",
        "This story shows that children...|Can build a full language when they are together|Cannot create languages|Need a textbook first",
        "A pidgin usually has...|Simple structure at first|A giant dictionary|No speakers",
        "Why do Deaf schools matter to this story?|They let Deaf children meet and share a language|They sell books|They close languages",
        "A creole has...|Its own full grammar|No grammar|Only nouns",
        "New sign languages show that sign languages are...|Real languages that can arise naturally|Only copies of speech|Impossible to grow"
      ]),
    pace(),
    readSpell("Read nature words", ["forest", "ocean", "mountain", "valley", "meadow", "island", "desert", "canyon", "glacier", "volcano", "thunder", "rainbow"], "Longer words come faster when you read the whole word shape. Here are nature words."),
    SC("Visual humor", "😄", "Deaf humor is often very visual. Jokes may use handshape stories, funny faces, exaggerated movement, and puns that only work in sign. Sarcasm is shown with the face, a sideways look or a slow, exaggerated sign. Humor is a big part of Deaf culture and a good way to share it with respect.",
      "Think of humor that works with the eyes and the hands.", "A signer tells a story where each handshape turns into a different animal, and the audience laughs at the ending.", [
        "Deaf humor is often very...|Visual|Silent forever|Written only",
        "A pun that only works in sign uses...|The shapes and movements of signs|Rhymes in sound|Written spelling",
        "Sarcasm in ASL is often shown by...|The face and exaggerated movement|A sound effect|A letter",
        "A handshape story uses...|The same handshape to make different pictures|Only the alphabet|Voices",
        "Funny faces in ASL are...|Part of the humor and the grammar|Rude|Not allowed",
        "Humor is...|A big part of Deaf culture|Forbidden in Deaf culture|Only for hearing people",
        "A joke that depends on English sounds usually...|Does not work in ASL|Works exactly the same|Needs a drum",
        "When you share a Deaf joke, a good habit is to...|Give credit to the person who made it|Say you invented it|Change the story to be mean"
      ]),
    meanOf(),
    SC("College and training paths", "🎓", "Deaf students have many ways to continue after high school. <b>Gallaudet University</b> in Washington, D.C., is a university designed for Deaf and hard of hearing students. <b>NTID</b>, at RIT in Rochester, New York, is a college for Deaf and hard of hearing students within a larger university. Many other colleges and training programs also provide interpreters or captioning through a disability services office.",
      "Look for access, a good program and support that fits you.", "A student visits three schools, asks each about interpreting and captioning, and compares them.", [
        "Gallaudet University is in...|Washington, D.C.|Rochester, New York|Los Angeles",
        "NTID is part of...|RIT in Rochester, New York|Gallaudet University|A bank",
        "A disability services office at a college can arrange...|Interpreters or captioning|Free parking for pets|Pizza coupons",
        "When choosing a school, a student should ask about...|Access and support|Only the mascot|Only the weather",
        "Training programs for careers, such as nursing or computer work, may also offer...|Access services|Nothing ever|Only paper",
        "A good first step in visiting a college is to...|Contact the access office before applying or visiting|Wait until after graduation|Hide that you need access",
        "Is going to a Deaf-focused school the only option?|No, there are many paths|Yes, it is the only way|Deaf students cannot go to college",
        "A student can compare colleges by asking...|What access services do you offer?|What color is your logo?|How tall is your tower?"
      ]),
    SC("Access at public meetings", "🏛️", "Town meetings, school boards and other public events should be open to everyone. That can mean a sign language interpreter or live captioning, agendas shared early, clear speaking turns, and good lighting. People who need access should be able to ask ahead of time, and organizers should plan for it.",
      "Plan access before the meeting, not during it.", "A town posts the agenda a week early and invites people to request an interpreter.", [
        "Public meetings should be open to...|Everyone|Only hearing people|Only people who live next door",
        "Live captioning at a meeting helps...|People follow along in text|People sleep|The lights stay on",
        "An agenda shared early helps interpreters to...|Prepare for topics|Skip the meeting|Guess the ending",
        "People who need access should be able to...|Request it ahead of time|Never ask|Show up at midnight",
        "Speaking one at a time at a meeting helps...|The interpreter and the captioner|Nobody|Only the speakers",
        "Good lighting in the room helps...|People see the interpreter|The clock|The coffee",
        "Which is a good access plan?|Interpreter or captions, an early agenda and clear turns|A single loud microphone only|Whispering in the back",
        "If a meeting has no access, a polite step is to...|Ask the organizers to fix it|Give up forever|Leave a rude note"
      ]),
    SC("Talking with officials", "🧑‍⚖️", "Everyone sometimes talks with officials such as clerks, nurses, school staff or police. A Deaf person can say clearly that they are Deaf and ask for an interpreter or another way to communicate. Staying calm, keeping hands visible and asking to write things down can help. The law says officials must make sure communication is effective, and complex matters need more than quick notes.",
      "Say you are Deaf, ask for what works, stay calm.", "At a counter, a person points to a card that says 'I am Deaf. Please call an interpreter.'", [
        "A good first step with an official is to...|Say you are Deaf and ask for an interpreter|Pretend to hear|Walk away",
        "A card that says what you need can help because it...|Explains clearly and quickly|Makes people angry|Is secret",
        "Staying calm and keeping hands visible helps...|Everyone understand what you are doing|Hide your signs|Make time stop",
        "Writing notes back and forth can work for...|Short, simple matters|Every long and serious talk|Nothing at all",
        "For complex or serious matters, it is better to have...|A qualified interpreter|A guess|No help",
        "The law says officials should make sure communication is...|Effective|Fast only|Silent",
        "A family member's child should not be asked to interpret serious matters because...|It is unfair and may not be accurate|They are too loud|They love it",
        "If staff say 'we don't have to help', you can...|Politely ask for a supervisor or learn your rights|Shout|Give up"
      ]),
    SC("Resumes and cover letters", "📄", "A resume lists your skills, work and education. A cover letter explains why you want a job. If you know ASL, say how well you know it, honestly, and give examples such as volunteer work or classes. Check your spelling and keep it short. A person can ask for access, like an interpreter for the interview, after being invited to interview.",
      "Be honest, clear and proofread everything.", "A student writes that they are learning ASL and have taken a class, rather than saying they are fluent.", [
        "A resume lists your...|Skills, work and education|Favorite snacks|Passwords",
        "A cover letter explains...|Why you want the job|What you ate for lunch|How tall you are",
        "When writing about your ASL, you should be...|Honest about your level|Exaggerate to impress|Silent",
        "Before sending a resume you should...|Proofread it|Hide it|Send it twice with errors",
        "Examples such as volunteer work or classes show...|What you have done with a skill|Nothing|That you are tired",
        "After being invited to interview, a Deaf applicant can...|Ask for an interpreter|Lose the interview|Keep it secret",
        "A good resume is usually...|Clear and short|Very long and messy|Written in another language only",
        "Which is the best way to describe beginner ASL?|Learning ASL, one class completed|Fluent ASL expert with no proof|I can sign anything"
      ]),
    PL("Sign structure words", "🧩", "Linguists use special words to talk about how signs are built. Here are some of them.",
      "Every sign has a handshape, a location, a movement and an orientation. The face can add meaning too.",
      ["handshape::The shape the hand makes::✋", "location::Where on or near the body a sign is made::📍", "movement::The path or motion of the hands::➡️", "palm orientation::The way the palm faces::🫲", "non-manual signal::A face or head movement that carries meaning::😮", "minimal pair::Two signs that differ in only one part::⚖️", "dominant hand::The hand used most for moving::✍️", "base hand::The resting hand that supports a sign::🧱", "parameters::The basic building blocks of a sign::🧱"],
      { qd: "Which sign-structure word is this?", qt: "What does this word mean?" })
  ];

  // =========================== LEVEL 23 ===========================
  const L23 = [
    SC("Research with Deaf communities", "🔬", "When researchers study Deaf people, they should work <b>with</b> the community, not just look at it. Good research asks permission, gets informed consent in an accessible language (like ASL), includes Deaf researchers, protects privacy and shares the results back in a form the community can use.",
      "Ask: who gives permission, and who gets the results?", "Researchers present their findings in ASL video and plain English to the school they studied.", [
        "Good research with a community starts by...|Asking for permission|Taking videos secretly|Writing the answer first",
        "Informed consent means people...|Understand and agree before taking part|Are told after the study is over|Cannot say no",
        "Consent information for Deaf participants should be in...|An accessible language like ASL or clear text|A language they cannot read|Whispers only",
        "Including Deaf researchers helps because they...|Know the community's needs and language|Make it harder|Keep results secret",
        "Participants' privacy should be...|Protected|Posted online with names|Sold",
        "Sharing results back with the community is...|Respectful and fair|A waste of time|Against the rules",
        "Research that treats a community only as a subject, with no partnership, can be...|Disrespectful and less accurate|Perfect|The only way",
        "If a participant wants to stop, the researcher should...|Let them stop|Make them stay|Hide their name"
      ]),
    pctChange(),
    SC("Idioms and meaning", "🗨️", "Idioms are sayings whose meaning is not the sum of the words, like 'it's raining cats and dogs' for heavy rain. Interpreters and translators carry over the <b>meaning</b>, not word for word. Signing the literal words would confuse people. Every language, including ASL, has its own sayings.",
      "Translate the idea, not each word.", "An interpreter signs 'raining hard' instead of showing cats and dogs falling from the sky.", [
        "An idiom is a saying where the meaning...|Is different from the individual words|Is exactly the words|Is always a number",
        "'It's raining cats and dogs' means...|It's raining very hard|Animals are falling|It is a pet show",
        "An interpreter should usually translate an idiom by its...|Meaning|Letters|Rhythm only",
        "Signing 'cats and dogs' literally for that saying would...|Confuse the viewer|Make perfect sense|Be required",
        "'Break a leg' said before a play means...|Good luck|Please get hurt|Run",
        "Do all languages have idioms?|Yes, every language has its own sayings|No, only English|Only ASL",
        "When two languages do not match word for word, translators look for...|The same idea in natural words|A matching letter|Silence",
        "'Spill the beans' means to...|Reveal a secret|Drop food|Plant a garden"
      ]),
    SC("Planning for after high school", "🗺️", "Under U.S. special education law (IDEA), students who have an IEP get a <b>transition plan</b> no later than around age 16. It lists goals for what comes after high school, such as college, work and living on your own, and the supports needed to reach them. The student takes part in making it.",
      "The plan is about the student's own goals, so the student has a voice.", "A Deaf student asks their IEP team to plan for college visits with interpreter access.", [
        "A transition plan is about...|Life after high school|What to eat for lunch|A sports score",
        "A transition plan is usually started no later than about age...|16|5|40",
        "A transition plan can include goals for...|College, work and living|Only video games|Hair styles",
        "Who should take part in making the plan?|The student, with family and school staff|Strangers|No one",
        "An IEP is a plan under...|Special education law|A cooking class|A bus company",
        "A Deaf student can ask the team to plan for...|Interpreter or captioning access|Silence in every room|Nothing",
        "Why should students speak up in their own plan?|It is about their own goals|It is a secret|Teachers dislike it",
        "The transition plan lists goals and the...|Supports needed to reach them|Names of birds|Weather"
      ]),
    SC("Health instructions", "🩺", "Clear health information keeps people safe. A Deaf patient can ask for a qualified interpreter. Providers can use plain words, show diagrams and check understanding with <b>teach-back</b>, where the patient explains the plan in their own words. Written instructions help too, but writing alone may not be enough for someone whose first language is ASL.",
      "Check that the message was understood, not just sent.", "A nurse asks, 'Can you show me how you will take the medicine?' to check understanding.", [
        "Teach-back means the patient...|Explains the plan in their own words|Teaches the doctor to dance|Gets homework",
        "A provider can make health information clearer with...|Plain words and diagrams|Long technical words|Fast whispering",
        "Written instructions alone may not be enough when...|ASL is the patient's first language|The patient likes reading|It is raining",
        "A Deaf patient can ask for...|A qualified interpreter|Nothing|A silent room",
        "Why is checking understanding useful?|It catches mistakes before they cause trouble|It wastes time|It confuses people",
        "A provider should speak to...|The patient, not only the interpreter|The wall|The next patient",
        "Medical words that are hard can be...|Explained in plain words|Used faster|Spelled backward",
        "If a patient does not understand, they should...|Ask for it again in a clearer way|Nod and hope|Leave without asking"
      ]),
    SC("Is the interpreting working?", "🔍", "Sometimes interpreting does not work well. Signs it may be going wrong: the Deaf person looks confused, keeps asking for repeats, or the interpreter often stops and seems unsure. A polite step is to tell the organizer, who can ask for a break, a qualified replacement or a different plan. Credentials and preparation help prevent this.",
      "Notice the signs, then tell the organizer politely.", "A Deaf attendee tells the event organizer that the interpreter's signs are hard to follow and asks for a change.", [
        "One sign that interpreting may not be working is...|The Deaf person looks confused or asks for repeats|Everyone is clapping|The room is quiet",
        "If interpreting is not working, a polite first step is to...|Tell the organizer|Shout|Leave quietly and never come back",
        "Interpreters do better when they...|Prepare with materials ahead|Never see the topic|Hear it for the first time on stage",
        "A good fix might be...|A break or a qualified replacement|Turning off all the lights|Cancelling the whole event always",
        "Whose responsibility is it to arrange good access?|The event organizers|The Deaf attendee alone|Nobody",
        "Credentials can show an interpreter...|Has met professional standards|Is famous|Is tall",
        "A person nearby who 'knows a little sign' is...|Not the same as a qualified interpreter|The same thing|Always better",
        "Feedback on interpreting should be...|Respectful and specific|Rude|Posted publicly with insults"
      ]),
    SC("Numbers around the world", "🌍", "According to the World Federation of the Deaf, there are about 70 million Deaf people around the world, and they use more than 300 different sign languages. Most Deaf people live in developing countries, and many do not have access to education in a sign language. These facts show how important language rights are.",
      "Large numbers, many languages, and a need for access.", "A report says that 70 million Deaf people use more than 300 sign languages.", [
        "About how many Deaf people are there in the world, according to the WFD?|About 70 million|About 7 thousand|About 7 billion",
        "How many different sign languages does the WFD count?|More than 300|Exactly 1|About 3",
        "Is there one worldwide sign language for everyone?|No, there are many|Yes, only one|Only two",
        "Many Deaf people around the world do not have...|Education in a sign language|A name|Hands",
        "Why do these numbers matter?|They show how important language rights are|They are only trivia|They are secrets",
        "Different countries usually have...|Their own sign languages|The same one|No languages",
        "70 million is a number with how many zeros?|Seven zeros after the 7|Three zeros|None",
        "Which is closer to the number of sign languages?|300|3|3 million"
      ]),
    SC("ASL for language credit", "📚", "Many schools and colleges in the United States accept ASL as a <b>world language</b> for credit, because it is a full language with its own grammar and culture. Students study vocabulary, grammar, Deaf culture and history. Rules differ by state and school, so a student should check what their own school accepts.",
      "ASL is a language, so it can count as one, but rules vary.", "A student asks the guidance counselor whether ASL class counts toward the language requirement.", [
        "ASL can count as a world language because it is...|A full language|A secret code|Only for fun",
        "Whether ASL counts for credit depends on...|The state and school|The weather|Nothing",
        "A student should check by asking...|A counselor or the school website|Nobody|A stranger on the street",
        "ASL classes usually include...|Grammar, vocabulary and Deaf culture|Only drawing|Only math",
        "Studying Deaf culture along with ASL helps because...|Language and culture go together|It is boring|It is not needed",
        "Do all schools accept ASL for credit?|No, rules differ|Yes, all do|None do",
        "Taking ASL helps a student to...|Communicate with Deaf people and learn a new language|Avoid all homework|Hear better",
        "A good ASL class is taught by...|A skilled teacher, ideally Deaf|Anyone who is bored|A random video only"
      ]),
    SC("Filming signers", "🎥", "Signing happens on the face and hands, so a video shows a lot about a person. Always ask for consent before filming or posting someone. Explain where the video will be shared, let people say no, and take it down if they change their mind. For people under 18, a parent or guardian must agree. Credit people and add captions.",
      "Ask first, explain where it goes, and respect a no.", "Before posting a class video, a student asks everyone in it and checks with a teacher.", [
        "Before filming someone you should...|Ask for their consent|Film secretly|Hide the camera",
        "You should tell people...|Where the video will be shared|Nothing|Nothing until later",
        "If a person says no to being posted, you should...|Respect it|Post it anyway|Argue",
        "If someone changes their mind later, you should...|Take the video down|Ignore them|Keep it forever",
        "For a person under 18, you also need...|A parent or guardian to agree|Nothing extra|A silly nickname",
        "Why is privacy so important in videos of signers?|Faces and hands show a lot about a person|Videos are boring|Cameras are expensive",
        "Adding captions to a video of signing helps...|More people understand it|Hide the signer|Cost nothing",
        "Giving credit means...|Naming the signer and the source|Pretending it is yours|Removing the name"
      ]),
    SC("Booking interpreters", "📅", "Good interpreters are often booked far ahead, so ask <b>early</b>. Give the date, time, place, topic and how long it will last. Share slides, names and key words ahead. For long events, book a team so interpreters can take turns. Ask the Deaf attendee about preferences, such as the interpreter's style.",
      "Early, clear details, prepared materials.", "A school books interpreters a month ahead and sends the speaker's slides two days before.", [
        "Interpreters should be booked...|Early|At the last second|After the event",
        "Information to give includes...|Date, time, place and topic|Only the color of the room|Nothing",
        "Sharing slides and key words ahead helps the interpreter to...|Prepare|Panic|Skip",
        "For a long event, book...|A team|One tired interpreter|No one",
        "The Deaf attendee should be asked about...|Their preferences|Nothing|The menu",
        "If you wait until the last minute, you may...|Not find a qualified interpreter|Always find the best one|Save time",
        "Telling the interpreter the length of the event helps them to...|Plan breaks|Fall asleep|Skip lunch",
        "Events with Deaf attendees should plan access...|From the start|After complaints|Never"
      ]),
    SC("Reasonable accommodations", "🧰", "Under the ADA, employers must provide <b>reasonable accommodations</b> to qualified workers with disabilities, unless it would cause <b>undue hardship</b>, which means a very large difficulty or cost for the employer. Examples for Deaf workers: interpreters, captioning, visual alerts, or a flashing phone. The worker and employer talk it through in the <b>interactive process</b>.",
      "A reasonable change that gives equal access, unless it is truly too hard.", "A Deaf employee and a manager agree to use video relay and captions at meetings.", [
        "A reasonable accommodation is a change that...|Gives a worker equal access|Gives a worker a lot of extra pay|Removes the job",
        "An example for a Deaf worker is...|A sign language interpreter|A louder phone|Dark glasses",
        "Undue hardship means...|A very large difficulty or cost for the employer|A birthday|A long lunch",
        "The talk between employer and worker about what help works is called...|The interactive process|A parade|A vote",
        "A visual alert might be used for...|A fire alarm or a doorbell|Reading|Sleeping",
        "Who decides what works best?|The worker and employer, together|The mail carrier|No one",
        "Accommodations are for...|Equal access|Special treatment unrelated to work|Fun",
        "The law that includes this rule for workers is...|The ADA|A cooking law|A map law"
      ]),
    SC("Parts of the ADA", "⚖️", "The Americans with Disabilities Act (ADA) became law in 1990. It has parts called <b>titles</b>. Title I is about <b>employment</b>. Title II is about <b>state and local government</b> services. Title III is about <b>businesses open to the public</b>. Title IV is about <b>telecommunications</b>, such as relay services.",
      "Think: jobs, government, businesses, phones.", "A person asks a government office for an interpreter. That is covered by Title II.", [
        "The ADA became law in...|1990|1790|2090",
        "Title I of the ADA is about...|Employment|Telecommunications|Schools only",
        "Title II is about...|State and local government services|Restaurants only|Phones only",
        "Title III covers...|Businesses open to the public|Space travel|Weather",
        "Title IV is about...|Telecommunications such as relay|Tax forms|Animals",
        "A restaurant not letting a Deaf customer order is a concern under...|Title III|Title I|Title IV",
        "A city office refusing an interpreter is a concern under...|Title II|Title III|Title IV",
        "A relay service for phone calls comes from...|Title IV|Title I|Title II"
      ]),
    SC("Shops that welcome signers", "🏪", "A welcoming shop thinks about Deaf customers: a pen and paper or a tablet, clear menus or order forms, staff who learn a few signs, good lighting, and a plain way for a customer to say what they need. Some businesses are owned and run by Deaf people, and supporting them is another way to be part of the community.",
      "Make it easy to order, ask and be understood.", "A cafe puts a small card on the counter that says 'Point to what you want, or write it here.'", [
        "A welcoming shop might keep nearby...|Pen and paper or a tablet|A loud siren|Locked doors",
        "A visual menu helps customers to...|Point and order|Guess what is there|Leave",
        "Staff who learn a few signs make customers feel...|Welcome|Worried|Invisible",
        "Good lighting helps people to...|See faces, signs and lipreading cues|Sleep|Hide",
        "Supporting Deaf-owned businesses is a way to...|Be part of the community|Cause trouble|Avoid shopping",
        "If a Deaf customer cannot be understood, staff can...|Try writing or typing|Ignore them|Talk louder only",
        "Talking louder to a Deaf customer usually...|Does not help|Solves everything|Is required",
        "A simple sign on the door can show...|That the shop is ready to help|Nothing|A secret"
      ]),
    readSpell("Read law words", ["access", "rights", "consent", "justice", "equality", "request", "notice", "policy", "fairness", "support", "complaint", "citizen"], "Many words about rights and laws are long, so read the whole word shape."),
    unscramble("Unscramble the word", ["culture", "language", "history", "village", "rhythm", "poetry", "mirror", "journey", "balance", "justice"]),
    PL("Law words", "⚖️", "Laws and rights have their own words. Here are some that matter for access.",
      "These words are used in the ADA and in many access plans.",
      ["accommodation::A change that gives equal access::🧰", "discrimination::Unfair treatment because of a difference::🚫", "undue hardship::A very large difficulty or cost for an employer::🏋️", "public accommodation::A business or place open to the public::🏪", "effective communication::Information a person can truly understand::💬", "interactive process::A talk to find the right support::🤝", "complaint::A formal report that rights were not respected::📝", "advocate::Someone who speaks up for rights::📣"],
      { qd: "Which law word is this?", qt: "What does this law word mean?" }),
    unitRate(),
    SC("Language attitudes", "💭", "People have attitudes about languages. Some think a language is more important because it is spoken by powerful groups. For a long time, many people wrongly thought sign languages were not real languages. Today, research shows ASL is a full language. Respecting a language means treating it, and its users, as equals.",
      "A language's value does not depend on how many powerful people use it.", "A student corrects a classmate who calls ASL 'just gestures' by explaining it has its own grammar.", [
        "ASL is a...|Full language|Set of random gestures|Code for English only",
        "For a long time, many people wrongly thought sign languages were...|Not real languages|Too loud|Too old",
        "Research has shown that sign languages...|Have their own grammar|Have no rules|Cannot be learned",
        "A language's value depends on...|Its speakers and what they share|Only the number of powerful users|The weather",
        "Treating a language as inferior can lead to...|Unfair treatment of its users|More friendships|Better schools",
        "Respecting a language means...|Treating it and its users as equals|Ignoring it|Changing it",
        "Someone says 'ASL is just gestures'. A good reply is...|ASL has its own grammar and vocabulary|You are right|I do not care",
        "Valuing both ASL and English shows...|Bilingual respect|Confusion|Rudeness"
      ])
  ];

  // =========================== LEVEL 24 ===========================
  const L24 = [
    SC("Writing a thesis", "✍️", "In an essay, a <b>thesis</b> is the main claim you will prove. It should be specific and something people could argue. 'Schools should offer ASL as a language option because it is a full language with its own culture' is a thesis. 'ASL is a language' is only a fact, and 'What is ASL?' is a question.",
      "A thesis takes a position and can be supported with evidence.", "A student improves 'Captions are good' to 'Public videos should be captioned because captions help many viewers, including Deaf people.'", [
        "A thesis is...|The main claim of an essay|The title page|The last word",
        "Which is the strongest thesis?|Public events should include interpreters because access is a right|Events happen|Interpreters exist",
        "Which is only a fact, not a thesis?|ASL has its own grammar|Schools should require ASL for everyone|Captions must be on every video",
        "A thesis should be...|Specific and arguable|Vague|A single word",
        "Which one is a question, not a thesis?|Why does Deaf culture matter?|Deaf culture matters because it keeps a community's language alive|Deaf culture is important",
        "Evidence in an essay is used to...|Support the thesis|Replace the thesis|Hide it",
        "A thesis usually appears...|Near the beginning|Only after the last page|Never",
        "Improving 'ASL is good' means making it...|More specific and reasoned|Shorter|More vague"
      ]),
    SC("Interviewing a community member", "🎤", "An interview can teach you a lot. Be respectful: get <b>consent</b>, explain your purpose, arrange access (an interpreter or video), ask open questions, listen, do not interrupt, and check quotes for accuracy. Ask how the person wants to be described, and share the finished work with them.",
      "Prepare, listen, and be accurate and respectful.", "A student asks a Deaf elder for permission to record, uses an interpreter, and later shows the elder the final write-up.", [
        "Before an interview you should get...|Consent|Nothing|A prize",
        "An open question is one that...|Invites more than a yes or no|Can only be answered yes or no|Has no meaning",
        "If the interviewee uses ASL, you should arrange...|An interpreter or accessible video|Silence|A long written test",
        "During the interview, a good habit is to...|Listen without interrupting|Talk the whole time|Look away",
        "Before publishing a quote, you should...|Check it for accuracy|Change it to be funnier|Guess",
        "It is respectful to ask the person...|How they want to be described|Nothing|Secrets",
        "After the project, a kind thing is to...|Share the finished work with them|Hide it|Delete their name",
        "If the person says they do not want to answer a question, you should...|Respect it and move on|Insist|Make a face"
      ]),
    SC("Leading a meeting", "🧑‍💼", "A leader makes a meeting work for everyone. When Deaf and hearing people meet together, share the agenda ahead, speak one at a time, say your name before talking, pause so the interpreter can keep up, and look at the person you talk to, not the interpreter. Plan breaks, and check that everyone had a chance to speak.",
      "Everyone should be able to follow and join in.", "A chair asks people to raise a hand, say their name, and wait for the interpreter before speaking.", [
        "A good leader shares the agenda...|Ahead of time|After the meeting|Never",
        "In a meeting with an interpreter, people should speak...|One at a time|All together|In whispers only",
        "Saying your name before speaking helps...|Everyone know who is talking|Nothing|You win",
        "When talking to a Deaf person using an interpreter, you should look at...|The Deaf person|The ceiling|The door",
        "Pausing for the interpreter helps...|Keep the message accurate|Cause delay on purpose|Skip topics",
        "Breaks are useful for...|Interpreters and everyone's eyes and minds|Nobody|Only the chair",
        "At the end, a good leader checks that...|Everyone had a chance to speak|Only the leader spoke|Nobody remembers",
        "If two people talk at once, the leader can...|Ask them to take turns|Join in|Leave"
      ]),
    SC("Mentors", "🧭", "A <b>mentor</b> is someone with more experience who guides you. In the Deaf community, elders and Deaf mentors pass on language, history and skills. Good mentoring is respectful on both sides: the mentee comes prepared and thanks the mentor, and the mentor shares honestly and listens. Later, mentees often become mentors.",
      "Learning goes both ways when mentoring is respectful.", "A student asks a Deaf teacher for advice, comes with questions, and later helps a younger student.", [
        "A mentor is someone who...|Has experience and guides you|Takes your homework|Is a stranger online",
        "Deaf mentors can pass on...|Language, history and skills|Nothing|Only gossip",
        "A good mentee...|Comes prepared and says thank you|Never listens|Shows up late every time",
        "Mentoring is best when it is...|Respectful on both sides|One-sided|Secret",
        "Later, a mentee can...|Become a mentor|Never help anyone|Quit forever",
        "Where might you meet a mentor safely?|At school or a trusted community group|From strangers in private messages|Anywhere online alone",
        "A mentor who listens and explains is...|Helping you grow|Wasting time|Cheating",
        "Thanking a mentor shows...|Respect for their time|Nothing|A trick"
      ]),
    SC("Speaking to a school board", "🏫", "Citizens can speak at school board or council meetings. Plan a short statement, often about three minutes: state one clear request, give a short true story or fact to support it, be polite and thank the board. Ask in advance for an interpreter or other access, and bring a written copy so your words are on record.",
      "One clear request, short, polite and prepared.", "A parent asks the board to keep funding the school's ASL class, shares one student's story, and thanks the board.", [
        "A short statement at a board meeting should have...|One clear request|Ten different demands|No point",
        "A good length is often...|About three minutes, or as the board allows|Three hours|Three seconds",
        "A story or fact helps by...|Supporting your request|Hiding it|Making noise",
        "The tone should be...|Polite|Rude|Angry",
        "If you need an interpreter, you should...|Ask in advance|Wait until you are speaking|Not ask",
        "A written copy helps because...|Your words are on record|It looks fancy|It is required to be loud",
        "Ending with a thank-you shows...|Respect|Weakness|Nothing",
        "Before speaking, a good step is to...|Practice your statement|Read it for the first time on stage|Skip it"
      ]),
    SC("Honest fundraising", "💰", "Groups raise money for classes, interpreters or events. Honest fundraising tells the truth about what the money is for, keeps records, thanks donors, and does not treat Deaf people as objects of pity. People should give permission before their story is used, and Deaf voices should help lead.",
      "Tell the truth, keep records and respect the people in the story.", "A club says exactly how much it needs for interpreter fees and shares a report of how the money was used.", [
        "Honest fundraising tells donors...|What the money is really for|A made-up story|Nothing",
        "Records of money help show...|Where the funds went|Nothing|Secrets",
        "Thanking donors is...|A good habit|Unneeded|Silly",
        "Using someone's story requires their...|Permission|Nickname|Secret",
        "Fundraising that treats Deaf people as objects of pity is...|Disrespectful|Respectful|Required",
        "Who should help lead a Deaf community project?|Deaf people|Nobody|Only strangers",
        "An honest report after fundraising shows...|How the money was used|A list of the donors' passwords|Nothing",
        "If a goal changes, an honest group should...|Tell its donors|Hide it|Spend money on something else secretly"
      ]),
    budget(),
    SC("Framing signing on video", "📹", "A video of signing should show the signer's hands and face clearly. Keep the camera steady, put the signer in the middle with the hands inside the frame, use even light from the front, a plain background and clothes that contrast with the skin. Do not crop the hands or the face, and add captions.",
      "Hands and face must stay visible and steady.", "A student films from chest height with a plain wall behind the signer and checks that both hands stay in the shot.", [
        "In a video of signing, the frame should show...|Hands and face|Only the feet|Only the sky",
        "A steady camera helps because...|The signs are easy to follow|It is faster|It is cheaper",
        "Good light should come from...|The front|Behind the signer only|Nowhere",
        "A plain background helps because...|Hands stand out|It is boring|It hides the signer",
        "Clothes that contrast with the skin help...|Hands show clearly|Nothing|Hide the face",
        "Cropping off the hands is a problem because...|Most of the message is lost|It looks nicer|The sound changes",
        "Adding captions helps...|More viewers understand|Nobody|Only sleepers",
        "Before filming, a good step is to...|Check the frame with a test|Skip it|Close your eyes"
      ]),
    SC("Languages at risk", "🕯️", "Some sign languages have very few signers and may disappear. This can happen when a larger national sign language spreads through schools, when villages grow smaller, or when children learn another language. People can help by teaching children, recording elders with permission, and supporting community-led projects to keep the language alive.",
      "Small languages need teachers, speakers and records made with permission.", "A community records its elders telling stories and runs weekend classes for children.", [
        "A language is at risk when it has...|Very few signers|Many signers|A large dictionary",
        "One reason a sign language may fade is when...|Children learn another language instead|Everyone moves to the moon|The moon changes",
        "Teaching children helps by...|Passing the language on|Silencing them|Ending it",
        "Recording elders should be done with their...|Permission|Surprise|Silence",
        "Who should lead language revival projects?|Community members|Outside strangers only|No one",
        "Why does a lost language matter?|People lose stories, culture and ways of thinking|Nothing is lost|It is only a hobby",
        "Language classes for children can help a language...|Survive|Disappear|Quiet down",
        "A spread of a larger national sign language through schools can sometimes...|Push small local signs out|Make all signs vanish overnight|Help small signs grow"
      ]),
    SC("Archives and records", "🗄️", "Recording signers for history and research is valuable, but it needs care. Get written or signed consent, note who is in the video, when and where it was recorded, store the files safely, and decide with the signer who may see them. Credit the signer. Share copies with the community, and use clear labels so videos can be found later.",
      "Consent, labels and safe storage.", "An archive labels a video with the signer's name, the date, the topic and who may view it.", [
        "Before archiving a signer's video, you need...|Their consent|A prize|Nothing",
        "Labels like names, dates and places help...|People find and understand it later|Nothing|Hide the video",
        "Files should be stored...|Safely|In a public pile|Randomly",
        "Who decides who may see a video?|The signer, with the archive|Anybody|Nobody",
        "Giving credit to the signer means...|Naming them|Hiding them|Changing the video",
        "Sharing copies with the community is...|Fair and helpful|Wrong|Forbidden",
        "If a signer wants limits on who may view, the archive should...|Follow those limits|Ignore them|Argue",
        "Clear file names and notes help future researchers to...|Understand the recording|Lose it|Forget it"
      ]),
    SC("Data and AI consent", "🤖", "Companies and researchers sometimes train computer programs on videos of signing. This should happen only with clear, informed consent from the signers, fair credit, and the ability to withdraw. Deaf people should help lead and test the tools. A program that works for the community, built with the community, is better than one built without them.",
      "Consent, credit and Deaf leadership.", "A project asks signers for permission to use their videos, explains how, and lets them leave the project later.", [
        "Using videos of signers to train a program needs...|Informed consent|Nothing|Secrecy",
        "Signers should be able to...|Withdraw their videos|Never leave|Hide for years",
        "Who should help test a sign tool?|Deaf users|Nobody|Machines only",
        "A tool built without the community often...|Misses what they need|Works perfectly|Is cheaper for everyone",
        "Fair credit means...|Recognizing the people who contributed|Hiding them|Selling their videos secretly",
        "Informed consent means they know...|How their video will be used|Nothing|Only the color",
        "A responsible company will be open about...|What the tool can and cannot do|Nothing|Every secret",
        "Which is the best way to build a sign tool?|With the Deaf community, from the start|Without asking anyone|In secret"
      ]),
    SC("Whose story is it?", "📖", "When we tell stories about Deaf people, they should be able to tell their own. Avoid pity words like 'suffers from', and avoid treating Deaf people as heroes only for living their lives. Check facts, give context and ask permission. The best stories are told by Deaf people or shared with their approval.",
      "Let people speak for themselves, and be accurate.", "A student writes a profile after asking a Deaf athlete what to include and how to describe them.", [
        "The best stories about Deaf people are told...|By Deaf people, or with their approval|By anyone with no checks|In secret",
        "A pity phrase like 'suffers from deafness' is...|Not respectful|Perfect|Required",
        "Before writing about someone you should...|Ask permission|Guess|Hide it",
        "Checking facts is...|Part of fair storytelling|Optional|Boring",
        "Treating Deaf people as heroes just for ordinary life...|Can be unfair and patronizing|Is always welcome|Is required",
        "Giving context means...|Explaining the background|Hiding the story|Changing it",
        "A good story about a Deaf person includes their...|Own words and goals|Only other people's opinions|Only their hearing",
        "If the person asks you to change a detail, you should...|Listen and respect their wishes|Refuse|Ignore"
      ]),
    readSpell("Read college words", ["scholarship", "university", "application", "deadline", "internship", "semester", "graduation", "research", "tutoring", "campus", "seminar", "career"], "Here are words you may see while planning for college and careers."),
    PL("Research words", "🔬", "Researchers use special words. Here are some you will see in studies about Deaf communities and sign languages.",
      "A careful study has a question, a sample, evidence and honest conclusions.",
      ["hypothesis::A testable idea about what you expect to find::💡", "sample::The group of people studied::👥", "survey::A set of questions asked to many people::📋", "bias::A leaning that makes results unfair::⚖️", "consent::Permission given after understanding::✅", "evidence::Facts that support an idea::🧾", "source::Where information comes from::📚", "conclusion::What the study finds in the end::🏁"],
      { qd: "Which research word is this?", qt: "What does this research word mean?" }),
    SC("Case study: the board meeting", "🏛️", "A school board is deciding whether to cut interpreter hours to save money. Students and families prepare. They ask for an interpreter at the meeting, gather facts about how interpreting helps students, choose a few speakers, and ask the board for another way to save money that does not remove access.",
      "Use facts, a clear request and respect.", "A student speaks for three minutes, shows grades before and after interpreting, and thanks the board.", [
        "The board plans to cut interpreter hours. Families should first...|Gather facts and make a plan|Say nothing|Yell in the hall",
        "At the meeting, families should ask for...|An interpreter for the meeting|No access|A quiet room only",
        "A few chosen speakers help because...|The message stays clear and short|Nothing is heard|Time is wasted",
        "A strong request could be...|Find other savings that keep interpreting|Do away with interpreters completely|Have no plan",
        "Showing how interpreting helps students gives...|Evidence|Opinions only|Noise",
        "The tone with the board should be...|Respectful|Angry|Silent",
        "After the meeting, a good step is to...|Follow up in writing|Forget it|Argue online",
        "Why is cutting access a problem?|Students lose equal access to learning|Nothing changes|It saves everyone",
      ].filter(Boolean)),
    SC("Case study: the research project", "🧪", "Two students plan a survey about how Deaf teens use captions. They write clear questions, get consent from participants and from a parent for minors, offer the survey in ASL video and in text, keep answers private, and promise to share the results with the community. They ask a Deaf mentor to review the plan.",
      "Plan for consent, access, privacy and sharing back.", "The students keep names out of the results and post a short summary in ASL and in captions.", [
        "The students first need to write...|Clear questions|Nothing|Jokes only",
        "Participants must give...|Consent|A prize|Nothing",
        "For minors, the students also need...|A parent's permission|Nothing extra|Only a friend's note",
        "Offering the survey in ASL and in text makes it...|More accessible|Longer|Harder",
        "Keeping answers private means...|Names are not shared with the results|Everyone sees every answer|Nothing is written",
        "Sharing the results with the community is...|Respectful and fair|Pointless|Forbidden",
        "A Deaf mentor reviewing the plan can...|Catch problems early|Cancel the survey|Do nothing",
        "A summary in ASL and captions is...|Accessible for more people|Silly|Not allowed"
      ]),
    schedule(),
    SC("Looking back, looking ahead", "🌅", "You have learned about language, history, rights and respect. The next steps are to keep learning from Deaf teachers, take part in community events, use your skills in a job or volunteer role, support access, and keep an open mind. Language is a living thing, and learners and community members grow it together.",
      "Keep learning, give back and stay respectful.", "A student joins a community class, volunteers to set up captions at a school event, and keeps practicing.", [
        "A good way to keep learning ASL is to...|Learn from Deaf teachers and community|Stop practicing|Only read about it",
        "A way to use your skills is to...|Volunteer or work where they help|Hide them|Brag only",
        "Supporting access means...|Helping everyone take part|Making some people wait|Closing doors",
        "A language that people keep using is...|Living and growing|Frozen|Done",
        "An open mind helps you to...|Keep learning and listening|Stop learning|Stop caring",
        "Taking part in community events is a way to...|Build friendships and skills|Cause trouble|Avoid people",
        "Why is respect important to keep going?|It builds trust with the community|It is easy to skip|It is only for tests",
        "Giving back after you learn means...|Sharing what you learned respectfully|Keeping it all secret|Selling it"
      ])
  ];

  Object.assign(SIGN_LEVELS, {
    22: lvl(22, L22, [0, 1, 4, 5, 6, 8, 11, 12, 13]),
    23: lvl(23, L23, [0, 2, 4, 9, 10, 11, 12, 17]),
    24: lvl(24, L24, [0, 1, 2, 4, 7, 11, 15, 16])
  });
})();
