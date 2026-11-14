// ext/sign-19-21.js  Mind Lab Sign Language (ASL), levels 19-21 (60 lessons)
// Only things we are sure about: fingerspelling, number signs, ASL grammar ideas, Deaf culture, history, interpreting and etiquette.
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
  const unscramble = (title, words) => MK(title, "🔀", "Here is a word puzzle for your fingerspelling eyes. The letters of a word come out in the wrong order. Put them back in order to find the word.",
    "L - O - O - H - C - S", "Try moving letters around until a word appears: S-C-H-O-O-L spells <b>school</b>.",
    "Look for a common ending or beginning first, like -ing or str-, then fit the other letters around it.", () => {
      const w = pick(words), ex = "school";
      let sc = w;
      for (let i = 0; i < 20 && sc === w; i++) sc = shuf(w.split("")).join("");
      return {
        text: `The letters of a word are mixed up:<br><b>${UP(sc).split("").join(" - ")}</b><br>Put them in order. What is the word?`, visual: "🔀", textInput: true, answer: w,
        hints: ["Try to find a small word or an ending hidden inside the letters.", `The word has ${w.length} letters and starts with "${UP(w[0])}".`, `Example: ${UP("hcsloo").split("").join(" - ")} can be arranged into "${ex}". Now do yours.`]
      };
    });
  const years = () => MK("Reading years", "📅", "A year with four digits is usually signed as two pairs of numbers. 2012 is signed as 20 and then 12. Type the year as digits.",
    "18 and 76", "Eighteen and then seventy-six is the year <b>1876</b>. Put the two pairs side by side.",
    "Do not add the two numbers. Just write the first pair, then the second pair right next to it.", () => {
      const a = pick([18, 19, 20]), b = ri(10, 99);
      return {
        text: `A friend signs a year as two number signs: <b>${a}</b> and then <b>${b}</b>. Type the year as digits.`, visual: "📅", textInput: true, answer: `${a}${b}`,
        hints: ["The year is made of two pairs, the first one and then the second one.", "Write the first pair and put the second pair directly after it. You do not add them.", "Example: 19 and then 65 is the year 1965. Now do yours."]
      };
    });
  const percentOf = () => MK("Percent of a group", "📊", "Surveys often report a percent. A percent is a part out of 100. To find it, divide the part by the whole, then multiply by 100.",
    "6 of 30", "6 divided by 30 is 0.2, and 0.2 times 100 is <b>20</b> percent.",
    "Easy check: 50 percent is one half, and 25 percent is one quarter.", () => {
      const t = pick([20, 25, 40, 50, 100, 200]), p = pick([5, 10, 20, 25, 40, 50]), part = t * p / 100;
      if (!Number.isInteger(part)) return percentOf().make();
      return {
        text: `In a survey of ${t} students, ${part} said they would like to learn ASL. What percent is that? Type the number only.`, visual: "📊", answer: p,
        hints: ["A percent compares the part to the whole, out of 100.", "Divide the part by the whole number of students, then multiply by 100.", "Example: 9 of 30 students is 9 divided by 30 = 0.3, and 0.3 times 100 = 30 percent. Now do yours."]
      };
    });
  const clubTable = () => MK("Reading a table", "📋", "Data in a table can answer questions with some quick math. Read the numbers carefully, then add or subtract.",
    "Art 8, Chess 12", "Total = 8 + 12 = 20. The difference between the clubs = 12 - 8 = <b>4</b>.",
    "Underline what the question asks for: the total, the biggest, or the difference.", () => {
      const names = shuf(["ASL Club", "Art Club", "Chess Club", "Drama Club", "Robotics"]).slice(0, 4);
      const vals = [];
      while (vals.length < 4) { const x = ri(5, 20); if (!vals.includes(x)) vals.push(x); }
      const row = names.map((n, i) => `${n}: ${vals[i]}`).join("<br>");
      if (Math.random() < 0.5) return {
        text: `Students in each club:<br>${row}<br>How many students are in all four clubs together?`, visual: "📋", answer: vals.reduce((a, b) => a + b, 0),
        hints: ["You need all four numbers.", "Add the four numbers, one pair at a time.", "Example: 4 + 7 + 5 + 9: 4 + 7 = 11, 5 + 9 = 14, 11 + 14 = 25. Now do yours."]
      };
      return {
        text: `Students in each club:<br>${row}<br>How many more students are in the biggest club than in the smallest club?`, visual: "📋", answer: Math.max(...vals) - Math.min(...vals),
        hints: ["First find the biggest number and the smallest number.", "Subtract the smallest from the biggest.", "Example: with 6, 11, 9 and 14, the biggest is 14 and the smallest is 6, so 14 - 6 = 8. Now do yours."]
      };
    });

  // =========================== LEVEL 19 ===========================
  const L19 = [
    SC("Formal and casual signing", "🎩", "Signers change how they sign for different situations. A speech, an interview or a talk with a teacher is usually <b>formal</b>: signs are larger, slower and more careful. A chat with a close friend is <b>casual</b>: signs are smaller and faster. This is called <b>register</b>.",
      "Ask: who is watching, and how important is the moment?", "Signing at a school assembly is formal, while signing in a lunch line is casual.", [
        "A signer is giving a speech to a big audience. The signing is probably...|Larger, slower and careful|Tiny and very fast|Done with no face at all",
        "Friends chatting at lunch usually sign in a...|Casual register|Courtroom register|Silent register",
        "Register means...|Changing your language to fit the situation|A list of names|A kind of camera",
        "Which setting calls for the most formal signing?|A job interview|A game with friends|A joke in a hallway",
        "Casual signing is often...|Smaller and faster|Always louder|Never allowed",
        "Switching register is a sign that a signer...|Knows the language well|Has forgotten signs|Is nervous about everything",
        "Hearing speakers also change register, such as...|Talking differently to a principal than to a friend|Never using words|Using only whispers",
        "When you meet an older Deaf person for the first time, a good choice is...|A polite, clear and not-too-fast style|Slang you made up|Turning your back"
      ]),
    SC("Contact signing", "🤝", "When Deaf and hearing people meet, they often mix ASL and English together. Some people call this <b>contact signing</b>. It can have English word order and fingerspelling mixed with ASL signs. It is a normal way to bridge two languages.",
      "Think about two languages meeting in the middle.", "A hearing learner and a Deaf adult chat, using some ASL signs in English order.", [
        "Contact signing mixes...|ASL and English|Spanish and math|Music and drawing",
        "Contact signing often happens when...|Deaf and hearing people meet|Two Deaf experts sign alone|Nobody is talking",
        "Contact signing is...|A normal way to bridge two languages|A mistake that must be punished|A secret code",
        "A learner uses English word order with some ASL signs. This is a good first step because...|It gets communication started|It proves ASL is easy|It means you are finished learning",
        "To grow past contact signing, a learner should...|Keep studying ASL from Deaf teachers|Stop practicing|Only copy videos without help",
        "Which of these is NOT part of contact signing?|Leaving out every sign|Fingerspelling|ASL signs",
        "When two languages meet, speakers often...|Borrow from both|Forget both|Use neither",
        "A Deaf person using contact signing with a beginner is...|Being kind and adjusting|Showing they cannot sign|Making a mistake"
      ]),
    SC("Signs happen together", "✋", "Spoken words come out one after another. Signed languages can show several things at the same time. One hand can hold an object while the other hand moves, the face shows a feeling, and the body leans. This is called <b>simultaneity</b>.",
      "Count how many parts of the body carry meaning at once.", "A signer shows a person walking past a tree using both hands while the face shows surprise.", [
        "Simultaneity means...|Several parts of the message happen at once|Signing only one thing at a time|Signing with eyes closed",
        "In speech, words usually come...|One after another|All at once|Only on paper",
        "While one hand shows a tree, the other hand can...|Show a person walking by|Do nothing at all|Be tied up",
        "Which can carry meaning at the same time as the hands?|The face|The shoes|The weather",
        "Simultaneity is one reason signed languages are...|Different from spoken ones in form|Not real languages|Easy to write down",
        "A signer leans in and raises eyebrows while signing. This shows...|Several channels at once|A mistake|Nothing important",
        "Because of simultaneity, a signed story can...|Show many details at once|Only use one word|Never use space",
        "Both hands, the face and the body are called...|Channels of meaning|Passwords|Colors"
      ]),
    SC("Iconic and arbitrary", "🔗", "An <b>iconic</b> sign looks a bit like what it means. An <b>arbitrary</b> sign has no picture-like link to its meaning. Even iconic signs are not universal: different sign languages choose different parts of an idea to show. And speech has arbitrary words too, like the word 'dog' that does not sound like a dog.",
      "Ask: is there a picture in the sign, or is it just the agreed form?", "The English word 'house' does not look like a house, so that is arbitrary. A drawing of a house is iconic.", [
        "An iconic sign is one that...|Looks a little like its meaning|Has no meaning|Is only for names",
        "Is every sign in ASL iconic?|No, many are arbitrary|Yes, every one|Yes, if the signer is fast",
        "If a sign is iconic, can it still differ between sign languages?|Yes, languages choose different details|No, it is always identical|Only on Tuesdays",
        "Which statement is true?|Iconic signs still follow grammar rules|Iconic signs are not real language|Only iconic signs are real",
        "An arbitrary link means...|The form does not look like the meaning|The sign is drawn on paper|The sign is wrong",
        "Spoken words like 'table' are mostly...|Arbitrary|Iconic pictures|Illegal",
        "Why can you not guess every sign you see?|Many signs are arbitrary or have hidden history|All signs are secret|Signs are always random",
        "A drawing of a cat is...|Iconic|Arbitrary|A sound"
      ]),
    SC("Early access to language", "🌱", "Children learn language best when they can reach it easily from the start. Deaf children need a language they can see, such as a sign language, so they can learn naturally. Not having full access to any language in the early years can make later learning harder. This is why early signing, families who learn together and Deaf role models matter.",
      "Think: what helps a baby start learning a language in a natural way?", "A Deaf baby with signing parents sees language every day, and learns signs just as hearing babies learn words.", [
        "Why is early language access important?|Children learn naturally when they can reach language|It makes children quiet|It saves money",
        "A Deaf baby can learn language through...|Seeing signs every day|Only quiet rooms|Only reading",
        "Early signing can help children later with...|Learning other languages and reading|Nothing at all|Only music",
        "Families can help by...|Learning sign language together|Hiding the child away|Avoiding all talking",
        "Deaf role models help children see...|What they can become|Nothing helpful|Only sports scores",
        "Language access means a child can...|Easily take in language|Only watch TV|Be left alone",
        "What is one good step for a family with a Deaf child?|Find signers and classes early|Wait many years|Ignore sign language",
        "A language the child can fully see and hear (or both) is called...|Accessible|Hidden|Optional"
      ]),
    SC("Bimodal bilinguals", "🗣️", "Someone who knows a signed language and a spoken language is a <b>bimodal bilingual</b>. They use two <i>modes</i>: hands and eyes, and voice and ears. Some bimodal bilinguals can sign and speak at the same time, which is called <b>code-blending</b>. Many hearing children of Deaf parents are bimodal bilinguals.",
      "'Bi' means two, and 'modal' is about the mode, or way, a language travels.", "A teacher who signs ASL and speaks English is bimodal, with two modes of language.", [
        "A bimodal bilingual knows...|A signed and a spoken language|Two spoken languages|No languages",
        "The word 'bimodal' refers to...|Two modes, like hands and voice|Two schools|Two phones",
        "Code-blending is...|Signing and speaking at the same time|Writing code|Mixing paint colors",
        "A hearing child of Deaf parents who signs and speaks is...|Often a bimodal bilingual|A beginner in no language|A computer",
        "Do bimodal bilinguals have to give up one of their languages?|No, they can use both|Yes, always|Yes, after age ten",
        "Two languages in one person can help...|Communication in more places|Confusion only|Nothing",
        "A person who speaks Spanish and English is...|Unimodal bilingual (both spoken)|Bimodal bilingual|Silent",
        "'Mode' in this lesson means...|The way language is produced and received|A kind of ice cream|The temperature"
      ]),
    SC("Compound signs", "🧩", "Sometimes two signs join to make a new sign with a new meaning. This is called a <b>compound</b>. Over time the joined sign gets smoother and shorter, so it can look different from the two original signs. English does this too, like 'sun' + 'flower' = 'sunflower'.",
      "A compound is made by joining parts, and it can have a meaning of its own.", "In English, 'bed' + 'room' = 'bedroom', one word with a new meaning.", [
        "A compound sign is made from...|Two signs joined into one|One sign only|No signs",
        "Over time a compound sign often becomes...|Smoother and shorter|Longer and louder|Invisible",
        "Which English word is a compound?|Rainbow|Quickly|Running",
        "Compounds in signed languages show that...|They build new words like other languages do|They have no grammar|Signs cannot change",
        "The meaning of a compound can be...|A new meaning of its own|Always exactly the sum of the parts|Never related to the parts",
        "'Sun' + 'flower' makes...|A compound word|A fingerspelled name|A question",
        "Do the original two signs always look exactly the same inside the compound?|No, they may blend|Yes, always|Only for names",
        "Which is another compound word?|Football|Happy|Slowly"
      ]),
    SC("Caption quality", "💬", "Not all captions are equally good. In the United States, the FCC set quality standards for TV captions: they should be <b>accurate</b>, <b>in time</b> with the speech (synchronous), <b>complete</b> from start to end of the program, and <b>placed</b> so they do not block important things on screen.",
      "Four ideas: right words, right timing, whole show, good position.", "Captions that show the right words but appear ten seconds late fail the timing test.", [
        "Accurate captions are...|Correct matches of what was said|Only pretty|Always blue",
        "Synchronous captions...|Match the timing of the speech|Show up a minute late|Never appear",
        "Complete captions cover...|The whole program|Only the start|Only the ads",
        "Good placement means captions...|Do not block important things on screen|Cover people's faces|Move around randomly",
        "Captions that miss half the dialogue fail the standard for...|Accuracy and completeness|Color|Volume",
        "Why do caption standards matter?|People rely on them to follow shows|They make shows longer|They change the plot",
        "Captions that cover a speaker's mouth and the scoreboard have a problem with...|Placement|Spelling|Genre",
        "Which agency set these standards for TV in the US?|The FCC|The post office|A sports league"
      ]),
    readSpell("Read country names", ["canada", "mexico", "france", "brazil", "germany", "japan", "kenya", "ireland", "norway", "egypt"], "Names of countries are often fingerspelled. Read the whole word, and type the country you see."),
    years(),
    SC("Interpreter lag time", "⏱️", "When an interpreter works at the same time as a speaker, there is a short delay between what is said and the interpreted message. This is called <b>lag time</b> (also known as <b>decalage</b>). Some lag time gives the interpreter time to understand the whole idea before putting it into the other language.",
      "The interpreter waits a little so the meaning is clear before signing or speaking.", "A speaker says a long sentence. The interpreter listens for the main idea first, then starts signing a moment later.", [
        "Lag time is...|The short delay between the speaker and the interpreter|A broken microphone|A kind of break",
        "Why do interpreters use lag time?|To understand the idea before interpreting|To waste time|To rest their eyes",
        "If the interpreter has no lag time at all, the risk is...|Interpreting word by word and missing meaning|Being too slow|Having too many breaks",
        "If the lag time is too long, the risk is...|Getting behind and forgetting parts|Seeing too well|Speaking too softly",
        "Another word for lag time is...|Decalage|Caption|Gloss",
        "A speaker can help the interpreter by...|Speaking at a steady pace|Rushing without pauses|Turning away",
        "Lag time is most useful in...|Simultaneous interpreting|Reading a book silently|Sleeping",
        "Which kind of interpreting uses lag time between speaker and interpreter?|Simultaneous|Silent|Written only"
      ]),
    SC("Showing more than one", "🔁", "In ASL, a signer can show plural, or more than one, by repeating a sign or by sweeping it across the space. For example, repeating a noun sign a few times can mean many of them. Number signs also work, as in 'three trees'. English adds -s, but ASL often uses repetition or a number.",
      "Look for repeating or sweeping, or a number.", "Signing one tree is single. Repeating the tree sign across the space can mean many trees.", [
        "One way ASL can show more than one is by...|Repeating the sign|Making the sign invisible|Speaking louder",
        "In English we usually add an ending like...|-s|-ing|-ly",
        "A signer sweeps a noun sign across the space. This can mean...|Many of them|Only one|A question",
        "Using a number sign with a noun shows...|How many there are|Nothing|That the signer is sad",
        "Repetition in ASL is...|A grammar tool|A mistake|Only for songs",
        "Which of these shows plural in ASL?|Repeating the sign|Closing your eyes|Stopping the sign",
        "Do ASL and English show plural in exactly the same way?|No, they use different tools|Yes, both add -s|Yes, both use the same hand",
        "Two or more of something is called...|Plural|Singular|Silent"
      ]),
    SC("Introductions in Deaf culture", "👋", "In many Deaf communities, introductions share more than a name. People often say where they went to school, who their Deaf friends and family are, and where they are from. This helps connect the new person to the community. It is a friendly way of finding common ground.",
      "Think: what helps people see how they are connected?", "A Deaf person says their name, where they live and which school they attended, so others can see who they might know in common.", [
        "In many Deaf communities, an introduction often includes...|Where you went to school|Your favorite soda|Your shoe size",
        "Why share school and community connections?|To find people you both know|To show off|To hide your name",
        "A friendly introduction usually starts with...|Your name and a friendly greeting|Walking away|Staring at the ceiling",
        "Finding common ground means...|Finding things you share|Arguing|Leaving",
        "If you are a hearing learner, a good introduction might say...|Your name and that you are learning ASL|That you know everything|Nothing at all",
        "When a Deaf person introduces themself you should...|Watch, and respond with your own intro|Look away|Interrupt",
        "In Deaf culture, being connected to a community is...|Valued|Unimportant|Forbidden",
        "Name signs are usually given by...|Deaf community members|Anyone for fun|A machine"
      ]),
    SC("Many identities in the community", "🌈", "The Deaf community is not one single group. It includes people of every race, family background, religion and region, and also people with different levels of hearing, different ways of communicating, and people who are DeafBlind. Each person has more than one identity at once, and each is part of who they are.",
      "Think: each person is like a mix of many identities, not one box.", "A Deaf student can also be a cook, a soccer fan and a speaker of another language at home.", [
        "The Deaf community includes people who are...|From many backgrounds|All exactly the same|Only from one town",
        "A person can be both Deaf and...|Part of other communities too|Never anything else|Only a student",
        "Why should we avoid stereotypes?|People are many things at once|Stereotypes are always correct|Rules say so",
        "DeafBlind people are...|Part of the wider community|Not included|Not real",
        "Different Deaf people may use...|Different ways to communicate|Only one way|No way",
        "Respecting identities means...|Not assuming one thing about a person|Guessing everything|Ignoring their words",
        "A Deaf person from another country might use...|A different sign language|ASL only, always|No language",
        "Learning about many identities helps us be...|Better friends and allies|Less curious|Less kind"
      ]),
    SC("Recognition of sign languages", "🏛️", "Official recognition means a government says a sign language is a real language that deserves support. In 2006 New Zealand made New Zealand Sign Language an official language. Recognition can help with schooling, interpreters and public services. Laws differ from country to country.",
      "Recognition is a promise of respect and support from a government.", "When a language is recognized, more schools may offer classes in it.", [
        "Official recognition of a sign language means...|A government says it is a real language|It is secretly banned|It is just a gesture",
        "Which country made its sign language official in 2006?|New Zealand|Antarctica|The Moon",
        "Recognition can help with...|Schools and interpreters|Weather|Candy prices",
        "Do all countries have the same laws about sign languages?|No, laws differ|Yes, all the same|There are no laws anywhere",
        "A recognized language can be taught in...|Schools|Only in secret|Nowhere",
        "Who often works for recognition of their language?|Deaf communities|Only governments alone|Nobody",
        "Recognition helps people because it shows their language is...|Valued|Wrong|Unnecessary",
        "Recognition for a sign language does NOT mean...|Everyone must sign|The language is real|Services can improve"
      ]),
    PL("Grammar toolbox", "🧰", "ASL has grammar just like any other language. Here are words that linguists use when they talk about ASL grammar.",
      "A gloss is only a rough written label: it is not how ASL is really signed.",
      ["topic::The thing a sentence is about, often signed first::📌", "comment::What is said about the topic::💬", "gloss::A written label for a sign, usually in capital letters::🏷️", "non-manual marker::A face, head or body signal that adds grammar::😮", "classifier::A handshape that stands for a type of thing::🤲", "index::Pointing to a place in space to refer to someone::👉", "register::How formal or casual a style is::🎩"],
      { qd: "Which grammar word is this?", qt: "What does this grammar word mean?" }),
    SC("Signed poetry", "🎭", "Signed poetry uses the tools of the language in artistic ways: rhythm, repeated handshapes, smooth movement, use of space and the face. Poets sometimes repeat the same handshape in different signs, which creates a kind of <b>handshape rhyme</b>, like rhyming sounds in spoken poems.",
      "Poems play with the form of the language, not only the meaning.", "A poem with many signs that use the same handshape feels connected, like words that rhyme.", [
        "Signed poetry uses...|Rhythm, handshape and space|Only sound|Only drawing",
        "A handshape rhyme means...|Signs that share a handshape|Signs that sound alike|A song with a drum",
        "In spoken poems, rhymes match...|Sounds|Handshapes|Colors",
        "Signed poems can be shared in...|Videos and live performances|Only radio|Only secret",
        "Poets use the face and body to...|Add feeling and rhythm|Hide meaning|Replace signs completely",
        "Which is a tool of a signed poem?|Repeating a movement|Silence on a radio|A phone call",
        "Signed poetry is an example of...|Art in a signed language|A mistake|Fingerspelling only",
        "A person who writes poems is a...|Poet|Pilot|Plumber"
      ]),
    SC("Two ways to see disability", "🔍", "The <b>medical model</b> sees a disability as a problem in a person's body that should be fixed. The <b>social model</b> says that barriers in the world, such as no captions or no interpreters, are what make life hard. Many Deaf people also see themselves as a language and culture group, not only as people with a hearing difference.",
      "Look for where the problem is placed: in the person, or in the barriers.", "A building with only stairs is a barrier. Adding a ramp removes the barrier without changing the person.", [
        "The social model says that barriers in the world...|Create many of the problems|Do not exist|Are always the person's fault",
        "The medical model focuses on...|Fixing a problem in the body|Changing the world|Language and culture",
        "Which is a barrier for Deaf people?|A video without captions|A ramp|A big smile",
        "Removing a barrier could look like...|Adding captions or an interpreter|Telling the person to try harder|Doing nothing",
        "Many Deaf people also describe themselves as...|A language and culture group|A secret society|Only patients",
        "A building with no visual fire alarm has...|A barrier to safety|No problem|A great feature",
        "The social model is helpful because it asks...|How can we change the world to include everyone?|Who is to blame?|How can we hide it?",
        "A ramp helps remove a barrier for people who...|Use wheelchairs|Fingerspell|Study maps"
      ])
  ];

  // =========================== LEVEL 20 ===========================
  const L20 = [
    SC("Eye gaze is grammar", "👁️", "In ASL, where the eyes look can carry meaning. A signer may look at a spot in space to show who or what they are talking about, and then look at the other person to speak directly to them. When telling a story, looking in different directions can show different characters speaking.",
      "Eyes can point just like hands do.", "A signer looks to the left to be one character and to the right to be another character in a story.", [
        "In ASL, eye gaze can...|Show who or what is being talked about|Mean nothing|Cause grammar errors",
        "A signer looks left for one character and right for another. This shows...|Different characters|A mistake|Sleepiness",
        "Looking directly at the viewer often means...|The signer is speaking to that person|The signer is lost|The signer is ending",
        "Gaze is part of grammar because it...|Adds meaning to the message|Is only decoration|Replaces all signs",
        "When a signer places a person in space and then looks there, they are...|Referring to that person|Taking a break|Making an error",
        "Which part of the body carries grammar besides the hands?|The eyes|The elbows|The knees only",
        "To follow a story you should watch...|The face, eyes and hands|Only your feet|Only the floor",
        "Eye gaze in ASL is called a...|Non-manual signal|Cell phone|Typed gloss"
      ]),
    SC("Interpreter certification", "📜", "Professional interpreters often earn certification to show they have the skills for the job. In the United States the Registry of Interpreters for the Deaf (RID) was founded in 1964, and certification tests check both interpreting skill and knowledge of ethics. Certified interpreters also keep learning through training.",
      "Certification is a way to show skill and professional standards.", "A doctor passes exams to show they can work safely. Interpreters do something similar.", [
        "Why do interpreters earn certification?|To show they have professional skills|To get a free lunch|To avoid learning",
        "RID stands for...|Registry of Interpreters for the Deaf|Real Interpreter Directory|Ready Interpreting Day",
        "RID was founded in...|1964|1264|1999",
        "Certification tests look at skill and...|Ethics|Cooking|Swimming",
        "After certification, interpreters should...|Keep learning|Stop studying|Quit",
        "A professional interpreter should keep client information...|Confidential|Public|On posters",
        "Hiring a certified interpreter helps make sure the message is...|Handled with skill|Skipped|Doubled",
        "Interpreters are people who...|Work between two languages|Fix cars|Grow crops"
      ]),
    SC("Interpreters work in teams", "👥", "For long events, interpreters often work in a <b>team</b> of two. They take turns, often switching about every 15 to 30 minutes, because interpreting is mentally tiring. The resting interpreter stays alert and helps with names, numbers and missed words (this is called <b>support</b>).",
      "Think of it as teammates who share a heavy job and help each other.", "At a two-hour meeting, two interpreters switch every 20 minutes so their work stays accurate.", [
        "Why do interpreters work in teams for long events?|Interpreting is tiring|They like crowds|They cannot read",
        "About how often might teams switch?|Every 15 to 30 minutes|Every 5 seconds|Once a year",
        "The interpreter who is not interpreting can...|Support with names and numbers|Leave the room|Sleep",
        "Teaming helps keep the interpreting...|Accurate|Sloppy|Silent",
        "A two-hour meeting might use...|Two interpreters|No interpreters|Ten comedians",
        "Support from a team member is useful when...|The interpreter misses a number|The sun is bright|The lights are on",
        "Mental tiredness can cause...|Mistakes|Better results always|Nothing",
        "A team of two means...|Two interpreters share the work|Two speakers talk at once|Two Deaf people are alone"
      ]),
    SC("Sight translation", "📄", "<b>Sight translation</b> is when an interpreter reads a written text, such as a form, in one language and says or signs it in another language right away. It is used for things like medical forms and signs. It needs fast reading and careful choice of words.",
      "The 'source' is written, and the 'target' is signed or spoken.", "An interpreter reads a school permission note in English and signs it in ASL for a parent.", [
        "Sight translation starts with...|A written text|A song|A dream",
        "An interpreter might sight-translate...|A medical form|A rainbow|A cloud",
        "The result is usually...|Signed or spoken aloud|Burned|Hidden",
        "Which skill is needed?|Fast, careful reading|Swimming|Juggling",
        "Why can sight translation be hard?|The interpreter must read and translate at the same time|Paper is heavy|Pens are rare",
        "A permission note read in English and signed in ASL is...|Sight translation|A weather report|A concert",
        "The language of the written text is called the...|Source language|Secret language|Food language",
        "Sight translation is useful because...|Not everyone reads every written language equally|Writing never matters|Forms are fun"
      ]),
    SC("Set the scene first", "🖼️", "When a signer describes a place or a scene, they often show the big picture first, like the room or the street, and then add smaller things inside it. This order of 'big to small' helps the viewer picture the scene clearly, like a camera zooming in.",
      "Imagine a camera starting wide, then zooming in.", "Describe a classroom: first the room, then the desks, then the pencil on one desk.", [
        "A signer describing a room usually starts with...|The big picture|The smallest object|The ending",
        "After the big picture, the signer adds...|Smaller details|Nothing|Only the ending",
        "This order helps the viewer to...|Picture the scene clearly|Get confused|Fall asleep",
        "Which order matches 'big to small'?|Street, house, window, curtain|Curtain, window, house, street|Window, street, curtain, house",
        "It is similar to a camera that...|Zooms in|Turns off|Breaks",
        "To describe a park, you might first show...|The whole park|One grain of sand|The last bench",
        "A clear description makes it easier for the viewer to...|Understand what is where|Forget it|Look away",
        "Showing the setting first gives the viewer...|A frame for the story|A secret|A tired hand"
      ]),
    SC("Studying sign languages", "🔬", "Researchers study sign languages the way they study other languages. William Stokoe's work in the 1960s showed that ASL has its own structure. Later, researchers such as Ursula Bellugi and Edward Klima studied how signed languages are built and learned. Padden and Humphries wrote <i>Deaf in America: Voices from a Culture</i> in 1988 about Deaf culture. Deaf researchers play a big role in this work.",
      "Researchers ask questions and gather evidence about language.", "A linguist records signers, watches carefully, and looks for patterns in the signs.", [
        "Researchers study sign languages to learn...|How they are built and used|How to cook|How to fly",
        "Whose work in the 1960s showed ASL has its own structure?|William Stokoe|A pilot|A baker",
        "A linguist is someone who studies...|Language|Rocks|Clouds",
        "Deaf in America: Voices from a Culture is a book about...|Deaf culture|Space travel|Soccer",
        "Which two researchers studied how signed languages are built and learned?|Ursula Bellugi and Edward Klima|Two chefs|Two pilots",
        "Researchers find patterns by...|Watching carefully and recording|Guessing wildly|Avoiding evidence",
        "Deaf researchers help because they...|Know the language and culture deeply|Cannot join|Should be left out",
        "Good research is based on...|Evidence|Rumors|Luck only"
      ]),
    SC("Accessible slides and documents", "🖥️", "When you make slides or documents, think of everyone who will read them. Use large, clear fonts, strong contrast between text and background, headings to organize ideas, and captions for videos. Add short descriptions for images (alt text) so screen readers can describe them. Keep text short so people can watch an interpreter and read.",
      "Ask: could someone with different vision or hearing still follow this?", "Slides with big dark text on a light background and captions on the video are easier for more people.", [
        "A readable slide uses...|Big, clear fonts|Tiny curly writing|Pale yellow on white",
        "Strong contrast means...|Text clearly different from the background|Text the same color as the background|Moving text",
        "Captions on a video help people who...|Cannot hear the sound|Love long titles|Need more ads",
        "Alt text is a short description of...|A picture|A cookie|A secret",
        "Too much text on one slide makes it hard to...|Read while watching an interpreter|Print|Save",
        "Headings help readers to...|Find and organize ideas|Lose the topic|Skip reading",
        "Who benefits from accessible design?|Many different people|Nobody|Only the designer",
        "To make a slide easier to see, you could...|Add contrast and larger text|Make the text smaller|Use a busy background"
      ]),
    SC("Oral history", "🎙️", "An <b>oral history</b> is a first-hand story told by a person about their life or events they lived through. For Deaf communities, signed histories can be recorded on video, since the language is visual. Ask permission, ask open questions, and listen (watch) with respect. Credit the person who shared.",
      "Ask first, listen well, and thank and credit the storyteller.", "A student records, with permission, a Deaf elder signing about their school days, then shares it with credit.", [
        "An oral history is...|A first-hand story from a person|A list of weather facts|A made-up tale",
        "A signed oral history can be recorded on...|Video|A thermometer|A bike",
        "Before recording someone, you should...|Ask for permission|Hide the camera|Guess they agree",
        "A good interview question is...|Open, like 'What was it like?'|A yes/no trick|A rude comment",
        "When sharing the story you should...|Give credit to the person|Pretend it is yours|Change their words secretly",
        "Why are Deaf elders' stories important?|They keep community history alive|They are boring|They are not real",
        "While someone signs a story you should...|Watch closely and show interest|Look at your phone|Leave",
        "'First-hand' means the story comes from...|Someone who lived it|A rumor|A guess"
      ]),
    readSpell("Read job titles", ["teacher", "doctor", "nurse", "pilot", "farmer", "lawyer", "dentist", "mechanic", "engineer", "designer"], "Job titles are often fingerspelled. Read the whole word and type the job."),
    unscramble("Unscramble the word", ["school", "library", "picture", "history", "window", "pencil", "yellow", "number", "bridge", "family"]),
    SC("Language rights", "🌐", "The United Nations Convention on the Rights of Persons with Disabilities (adopted in 2006) says that sign languages are languages, and that governments should support their use and the Deaf community's linguistic identity. It also calls for education that fits Deaf learners' needs. International agreements like this encourage countries to improve their own laws.",
      "A convention is an agreement between countries.", "A country that signs the agreement promises to work on removing barriers.", [
        "The UN Convention on the Rights of Persons with Disabilities was adopted in...|2006|1806|2106",
        "It says that sign languages are...|Languages|Gestures only|Illegal",
        "A convention is...|An agreement between countries|A cooking class|A bike race",
        "International agreements encourage countries to...|Improve their own laws|Ignore each other|Close schools",
        "The convention supports Deaf people's...|Language and identity|Hidden lives|Silence",
        "Education for Deaf learners should...|Meet their needs|Ignore their language|Never exist",
        "Which group created the convention?|The United Nations|A pizza shop|A circus",
        "A right is something that...|People should be able to have|Nobody needs|Is optional only"
      ]),
    SC("Repair strategies", "🔧", "In every conversation, misunderstandings happen. These are repaired with simple steps: ask the person to repeat, ask for a different sign or fingerspelling, say back what you understood to check, point to an object, or write on paper or a phone. Repairing a conversation is a normal skill, not a failure.",
      "Misunderstanding is normal, and fixing it is a skill.", "You say, 'Do you mean the library?' to check that you understood a fingerspelled word.", [
        "If you miss a sign, a good repair is to...|Ask the person to repeat|Pretend you understood|Walk away",
        "Saying back what you understood is called...|Checking|Hiding|Yawning",
        "If a fingerspelled name is unclear you can...|Ask for it again slowly|Guess loudly|Laugh",
        "Writing on paper or a phone can...|Help repair the conversation|Never help|Be rude",
        "Misunderstandings are...|Normal in every conversation|A sign of failure|A secret",
        "Pointing to an object can...|Clarify what you mean|Cause confusion always|Be forbidden",
        "Repairing a conversation shows you...|Care about understanding|Do not care|Know everything",
        "A kind way to ask for repetition is...|With a smile and patience|With an angry face|Without looking"
      ]),
    SC("Nodding along", "🙂", "When someone signs to you, you show you are following with small signals: nods, a face that matches the story, and quick signs like yes or oh. This is called <b>backchanneling</b>. Without it, the signer might think you are lost or not paying attention. Keep your eyes on them the whole time.",
      "You can listen with your whole face and head.", "A friend tells you a funny story and you nod and smile to show you understand.", [
        "Backchanneling means...|Small signals that show you are following|Turning your back|Signing very loudly",
        "A nod while someone signs shows you...|Understand|Are leaving|Are asleep",
        "Why are these signals useful?|The signer knows you are following|They hide information|They end the talk",
        "If you give no signals at all the signer may think...|You are lost or not watching|You are an expert|You are signing",
        "While someone signs you should keep your eyes...|On them|On the floor|Closed",
        "A face that matches the story shows...|Interest|Boredom|Nothing",
        "A quick yes or oh sign during a story is...|A friendly signal|A mistake|Rude",
        "'Backchannel' signals are often...|Small and quick|Giant and slow|Illegal"
      ]),
    SC("Visual alarms", "🚨", "Hearing people notice alarms by sound, but Deaf people need to see or feel them. Buildings use <b>visual alarms</b> such as flashing strobe lights for fires. At home, people use flashing doorbells, vibrating alarm clocks and phones that flash. Planning for emergencies includes these tools, so everyone can be safe.",
      "If sound is not an option, think of light and vibration.", "A bed shaker under a pillow wakes a Deaf person for a fire alarm.", [
        "A visual alarm uses...|Flashing lights|Only loud bells|Smells",
        "Which device helps wake a Deaf person?|A vibrating alarm clock|A radio|A candle",
        "Strobe lights in a building are for...|Showing an alarm|Decoration only|Dance parties",
        "A flashing doorbell tells the person...|Someone is at the door|The day of the week|Nothing",
        "Why must buildings have visual alarms?|So everyone knows about danger|To confuse people|To save electricity",
        "A phone can also alert by...|Flashing or vibrating|Shouting|Disappearing",
        "Emergency plans should include everyone, so they need...|Visual and vibrating alerts|Only sounds|Nothing",
        "A bed shaker works by...|Vibrating|Singing|Glowing blue"
      ]),
    PL("People who help", "🧑‍⚕️", "Many professionals work with Deaf and hard of hearing people. Each has a different job.",
      "Match the job to what the person does. Some of these people may also be Deaf themselves.",
      ["interpreter::Moves messages between sign and speech::🤝", "audiologist::Tests hearing and fits devices::👂", "captioner::Types live words so people can read what is said::⌨️", "teacher of the Deaf::Teaches Deaf students::🏫", "speech-language pathologist::Helps with speech and language skills::🗣️", "SSP::Helps DeafBlind people get around and get information::🤲"],
      { qd: "Which person does this job?", qt: "What does this person do?" }),
    SC("Appreciating without taking", "🎁", "Learning from a culture is wonderful. But using Deaf culture or ASL only to look cool, to sell things, or to copy without credit is disrespectful. Appreciation means learning with Deaf teachers, giving credit, paying Deaf creators, and letting Deaf people lead. If you are unsure, ask.",
      "Appreciation gives back. Taking only uses.", "A shop wants a poster with ASL. It asks a Deaf artist to design it and pays them, with credit.", [
        "Appreciation of Deaf culture means...|Learning, giving credit and listening|Copying without asking|Using it as a costume",
        "A business that wants ASL on a poster should...|Hire a Deaf artist|Guess the signs|Skip permission",
        "Giving credit means...|Naming the creator|Hiding the source|Charging more",
        "Paying Deaf creators shows...|Respect for their work|Nothing|Disrespect",
        "If you are not sure whether something is respectful, you should...|Ask a Deaf person or leader|Do it anyway|Hide it",
        "Which is disrespectful?|Selling copies of Deaf art without credit|Taking a class from a Deaf teacher|Asking permission",
        "Letting Deaf people lead means...|They guide how their culture is shared|They are ignored|They stay silent",
        "A good learner of ASL...|Learns from the community|Claims to be the expert|Avoids the community"
      ]),
    SC("New science signs", "🔬", "New ideas need new words, and that includes signs. Signs for science and technology words are created by Deaf teachers, scientists and communities, then shared and adopted when people find them clear. When there is no sign yet, signers can fingerspell a word and explain it with ASL, until a sign becomes common.",
      "New words (and signs) appear when people need them.", "When a new device is invented, signers fingerspell the name at first, then create a sign that everyone starts to use.", [
        "New signs for science words are made by...|Deaf communities and teachers|Machines only|Nobody",
        "If no sign exists yet, a signer can...|Fingerspell and explain|Stay silent|Make up rules to confuse",
        "A new sign becomes common when...|Many people find it clear and use it|One person says so|It is secret",
        "Why do languages need new words?|New ideas appear|They get bored|They want to confuse",
        "Spoken languages also...|Add new words|Never change|Are banned",
        "Fingerspelling a new word is...|A normal first step|A big mistake|Never allowed",
        "Which group helps invent clear science signs?|Deaf scientists and teachers|Nobody at all|Random strangers only",
        "A new sign is more useful when it is...|Clear and easy to understand|Secret|Impossible to see"
      ]),
    percentOf()
  ];

  // =========================== LEVEL 21 ===========================
  const L21 = [
    SC("Signs bend near neighbors", "🔄", "In every language, sounds or signs can change when they sit next to other ones. In ASL the handshape or place of a sign may shift a little to fit the sign before or after it, which makes signing smoother and faster. This is called <b>assimilation</b>. English does the same: 'in' + 'possible' becomes 'impossible'.",
      "Signs near each other can influence each other, like neighbors.", "In speech, 'input' is often said like 'imput', because the sounds blend.", [
        "Assimilation means a sign changes to...|Fit its neighbors|Disappear|Become a number",
        "Why does assimilation happen?|It makes signing smoother|It makes things worse|It is a rule broken",
        "Spoken languages also have...|Sounds that blend|No changes at all|Hand signs only",
        "Which English word shows a blend of in + possible?|Impossible|Possible|Positive",
        "When a handshape shifts slightly near another sign it is...|A natural change|An error always|Fingerspelling",
        "Assimilation is common in...|All languages|Only ASL|No language",
        "A signer who blends signs smoothly is often...|Fluent|A beginner|Stopping",
        "Smooth signing tends to be...|Faster|Slower|Louder"
      ]),
    SC("One sign, many meanings", "🔀", "A sign can have more than one meaning, depending on the context, the face and the other signs near it. This is called <b>polysemy</b>. English does this too: 'bat' can be an animal or a baseball bat. A signer or interpreter must look at the whole message, not just one sign.",
      "Meaning comes from the whole message, not one piece alone.", "The word 'light' can mean not heavy, or the opposite of dark. You use the sentence to know.", [
        "Polysemy means a sign or word can have...|More than one meaning|No meaning|Only one meaning",
        "What helps you choose the right meaning?|The context|The weather|The clock",
        "The English word 'bat' can mean...|An animal or a baseball bat|Only an animal|Nothing",
        "An interpreter must look at...|The whole message|Only the first sign|Only the last sign",
        "If you see a sign with two possible meanings you can...|Check the context or ask|Pick randomly|Give up",
        "The word 'light' can mean...|Not heavy or not dark|Only a color|Only a sound",
        "Is polysemy a mistake in the language?|No, it is a normal feature|Yes, always|Only in ASL",
        "The face and other signs can help show...|Which meaning is intended|Nothing|The time"
      ]),
    SC("Reading gloss sentences", "📝", "A <b>gloss</b> is a rough way to write ASL using English labels in capitals. It is not a perfect picture of ASL. A time word often comes first: YESTERDAY I GO STORE means 'I went to the store yesterday.' A topic can come first too: BOOK, I READ means 'I read the book.' Glosses leave out the face and movement, so they are only a sketch.",
      "Look for the time or topic at the start, then read the rest.", "TOMORROW FRIEND VISIT ME means 'My friend will visit me tomorrow.'", [
        "YESTERDAY I GO STORE means...|I went to the store yesterday|I will go tomorrow|I do not like stores",
        "In glosses, time words often come...|First|Last|Never",
        "BOOK, I READ means...|I read the book|The book reads me|I lost the book",
        "A gloss is...|A rough written label of ASL|A video|A perfect copy of ASL",
        "What do glosses leave out?|The face and movement|The words|The letters",
        "TOMORROW FRIEND VISIT ME means...|My friend will visit me tomorrow|My friend visited yesterday|I never see friends",
        "Glosses are written in...|Capital letters|Colors|Tiny numbers",
        "A gloss alone is...|A sketch, not the full language|The full language|A recording"
      ]),
    SC("A sit-in for rights", "🏢", "In 1977, disability rights activists held sit-ins at government offices in the United States, including a long one in San Francisco, to demand that Section 504 of the Rehabilitation Act of 1973 be put into action. The law says programs getting government money cannot leave out people because of a disability. Deaf people and interpreters took part, and the effort helped lead to later laws, like the ADA.",
      "Think about a peaceful protest that stayed for weeks until laws were carried out.", "Peaceful protesters sit in an office and ask leaders to follow a law that already exists.", [
        "A sit-in is a peaceful protest where people...|Stay in a place to ask for change|Run away|Hide",
        "Section 504 says programs with government money cannot...|Leave people out because of disability|Open on Mondays|Sell books",
        "The sit-ins were in...|1977|1477|2077",
        "Which later law built on this work?|The ADA|A pizza menu|A movie",
        "Disability rights activists wanted Section 504...|Put into action|Erased|Hidden",
        "Who took part in the sit-ins?|Disabled people and supporters, including interpreters|Only robots|Nobody",
        "Peaceful protest is...|A way to ask leaders for change|Illegal everywhere|Always silent",
        "The Rehabilitation Act was passed in...|1973|1873|2003"
      ]),
    SC("Primary and secondary sources", "📚", "A <b>primary source</b> comes from the time or person being studied, such as a letter, a photo, a video or an interview. A <b>secondary source</b> explains or discusses it later, such as a textbook or a documentary. For Deaf history, both help, and Deaf voices should be included whenever you can.",
      "Primary is first-hand. Secondary is a later explanation.", "A diary from 1850 is primary. A textbook written last year about 1850 is secondary.", [
        "A primary source is...|First-hand from the time|A later summary|A guess",
        "A textbook about Deaf history is usually...|A secondary source|A primary source|A song",
        "A video interview with a Deaf elder is...|A primary source|Secondary|Useless",
        "A letter from 1880 written by a student is...|Primary|Secondary|Fiction",
        "Why use both kinds of sources?|They give different views|They are always the same|It is a rule from nowhere",
        "A documentary made last year about 1900 is...|Secondary|Primary|A diary",
        "In Deaf history, it is important to include...|Deaf voices|Only outsiders|Nothing",
        "A photograph from the time of an event is usually...|Primary|Secondary|Wrong"
      ]),
    SC("Rebuttals", "🛡️", "In a debate, a <b>rebuttal</b> answers the other side's point. A good rebuttal listens first, repeats the point fairly, then gives evidence for a different view. Keep it about the idea, not the person. In a signed debate, face the person, sign clearly, and wait your turn.",
      "Answer the idea, not the person.", "'You said captions are too costly, but many streaming services already include them.'", [
        "A rebuttal is...|An answer to the other side's point|A rude interruption|A joke",
        "A good rebuttal should be about...|The idea|The person's looks|The weather",
        "Before you rebut, you should first...|Listen|Interrupt|Look away",
        "Evidence in a rebuttal is...|Facts that support your view|Rumors|Insults",
        "In a signed debate you should...|Wait your turn and sign clearly|Cut in at once|Turn your back",
        "Which is a fair rebuttal?|I see your point, but here is a fact that differs|You are silly|No, I said no",
        "Repeating the other point fairly shows...|You listened|You are lost|You are mocking",
        "Debates help people to...|Think about different views|Fight|Give up"
      ]),
    SC("Writing to ask for access", "✉️", "If a class or event is not accessible, a clear and polite letter or email can help. Say who you are, what you need (for example an interpreter or captions), when and where you need it, and why it matters. Offer to talk it over, and thank the reader. Keep a copy of your request.",
      "Be clear, be polite, give the details, and keep a copy.", "A short email asks the school for an interpreter at Friday's assembly and thanks them.", [
        "A good access request is...|Clear and polite|Angry and long|Vague",
        "You should say what you need, such as...|An interpreter or captions|A new bike|Nothing",
        "You should include when and where...|You need it|You ate lunch|You were born",
        "Why keep a copy of your request?|You have a record|To lose it|To hide it",
        "Ending with a thank you is...|Polite|Unneeded rudeness|A mistake",
        "Explaining why it matters helps the reader to...|Understand the need|Ignore it|Get confused",
        "Offering to talk about the request shows you are...|Willing to work together|Hiding|Angry",
        "A request sent early gives the reader...|Time to arrange it|No time|A headache"
      ]),
    SC("Effective communication", "🗨️", "The ADA says that businesses, hospitals and offices must provide <b>effective communication</b> to Deaf people. That means communication that really works for the person, such as a qualified sign language interpreter, captions or written notes, depending on the situation. A Deaf person should be asked what works best, and a family member should not be pulled in to interpret serious matters.",
      "Effective means it actually works for that person.", "For a long medical visit, a qualified interpreter works better than passing notes back and forth.", [
        "Effective communication means...|Communication that really works for the person|Any method at all|Only speaking",
        "For serious talks, a good choice is...|A qualified interpreter|A child who happens to be nearby|A guess",
        "Who should be asked what works best?|The Deaf person|The building|The pharmacist",
        "Which law says offices must give effective communication?|The ADA|A recipe|A video game",
        "Notes on paper may be enough for...|Short, simple exchanges|Long medical talks always|Nothing",
        "Pulling a child into interpreting a serious issue is...|Not a good idea|Required|Best practice",
        "Captions can give access to...|Videos and presentations|Smells|Tastes",
        "The goal is for the Deaf person to...|Understand and be understood|Be quiet|Wait outside"
      ]),
    SC("Dictionaries of signs", "📖", "Sign language dictionaries have to find a way to order signs, since sign languages have no alphabet of their own. Some list signs by English word. Others sort by handshape, location and movement. In 1965, William Stokoe and colleagues published <i>A Dictionary of American Sign Language on Linguistic Principles</i>, which sorted signs by their parts instead of English.",
      "How do you look up something that is not written?", "A video dictionary lets you search by handshape and see a signer showing the sign.", [
        "Why do sign dictionaries need a special way to order signs?|There is no alphabet for the signs themselves|They are bored|They have no signs",
        "One way to order signs is by...|Handshape, location and movement|Their color|Their smell",
        "The 1965 Stokoe dictionary sorted signs by...|Their parts|English letters only|Weather",
        "A video dictionary helps because it...|Shows how a sign moves|Hides signs|Prints smells",
        "Some dictionaries list signs by...|English words|Nothing|Dates of birth",
        "Why is video better than a drawing for signs?|Movement is easier to see|It is cheaper in every case|It has less detail",
        "The dictionary treated ASL as...|A language with structure|A random set of gestures|A secret code",
        "A person looking up a sign they saw could search by...|Handshape|Eye color|Zip code"
      ]),
    readSpell("Read hard words", ["communication", "interpreter", "accessibility", "linguistics", "grammar", "community", "advocate", "captioning", "literature", "history"], "Longer academic words are common in school. Read the whole word and type it."),
    SC("Respect, not 'inspiring'", "💬", "Some people call a Deaf person 'so inspiring' just for doing ordinary things, like going to school or shopping. This can feel like being treated as an object, not a person. A better response is to respect people's real skills and treat them as equals. Praise what someone has actually made or done.",
      "Treat people as people first.", "Instead of 'You are so inspiring for buying groceries,' say 'Nice to meet you' and talk normally.", [
        "Calling someone 'inspiring' just for ordinary tasks can feel...|Like they are not seen as a regular person|Wonderful always|Required",
        "A better response is to...|Treat them as an equal|Stare|Praise nothing",
        "You can praise someone for...|Something they actually made or did|Being alive|Nothing",
        "A Deaf student who wins a science prize deserves praise for...|The science work|Being Deaf only|Nothing",
        "To respect someone, talk to them...|Like any other person|Like a baby|Not at all",
        "Which is more respectful?|Asking about their interests|Assuming they need pity|Giving pity",
        "Stereotypes can make people feel...|Left out|Included|Rich",
        "Everyone wants to be seen as...|A whole person|A symbol|A problem"
      ]),
    SC("Counseling in your own language", "🧠", "Everyone sometimes needs to talk about worries or feelings. Deaf people can get the best help from counselors who use sign language or who work with a qualified interpreter. Talking in your own language makes it easier to share feelings. If you or a friend are worried or sad, tell a trusted adult.",
      "It helps to talk in the language you know best.", "A student who signs ASL feels more at ease with a counselor who also signs ASL.", [
        "Why might a Deaf student prefer a counselor who signs?|It is easier to share feelings in your own language|It is faster at spelling|Counselors never talk",
        "If you feel worried you should...|Tell a trusted adult|Hide it forever|Ignore it",
        "A counselor can work with...|A qualified interpreter if needed|No one|A stranger from the street",
        "Sharing feelings is...|A healthy thing to do|Always wrong|A secret to hide",
        "If a friend seems very sad you can...|Be kind and help them find a trusted adult|Laugh|Ignore them",
        "Talking in the language you know best helps you...|Say what you really mean|Forget things|Get confused",
        "Who is a trusted adult?|A parent, teacher or counselor|A random stranger|Nobody",
        "A good listener...|Pays attention and does not judge|Interrupts|Looks away"
      ]),
    SC("Late learners and new arrivals", "🧳", "Some Deaf people first learn a sign language when they are older, for example after moving to a new country or going to a Deaf school for the first time. They may have used another sign language or home signs before. Learning later takes time and support, and being patient helps. Their first language still matters and is respected.",
      "Different paths lead to language. All of them are valid.", "A teen arrives from another country, signs a different sign language, and begins learning ASL as an extra language.", [
        "Some Deaf people first learn a sign language...|At an older age|Only as babies|Never",
        "A new arrival may already know...|Another sign language|Nothing at all|Only ASL",
        "Learning a new language later takes...|Time and support|Magic|No effort",
        "A good way to help a late learner is to be...|Patient and welcoming|Impatient|Silent",
        "Their first language or home signs...|Still matter|Must be erased|Are useless",
        "Starting late means the person...|Can still learn and grow|Cannot ever learn|Is not smart",
        "Deaf immigrants may come with...|Their own sign language|No culture|No stories",
        "Welcoming a new student includes...|Introductions and friendly signs|Mocking|Ignoring"
      ]),
    clubTable(),
    PL("Debate words", "⚖️", "Good thinkers use special words when they argue fairly. Here are words to help you build and answer arguments.",
      "A fair argument uses evidence and respects the other side.",
      ["claim::A statement you want people to accept::📣", "evidence::Facts that support a claim::🧾", "rebuttal::An answer to the other side's point::🛡️", "bias::A leaning that is not fair::⚖️", "source::Where information comes from::📚", "audience::The people who listen or watch::👥"],
      { qd: "Which debate word is this?", qt: "What does this debate word mean?" }),
    SC("Credit Deaf creators", "©️", "When you share, remix or learn from a video, poem or lesson made by a Deaf creator, give clear credit: say the creator's name and where it came from. Ask permission before reposting or using their work in your project. Giving credit supports Deaf artists and teachers, and it is honest.",
      "Name them, ask, and thank them.", "A student includes the name of a Deaf poet when showing a poem in class, and asks if they can.", [
        "When you use a Deaf creator's work you should...|Give clear credit|Pretend it is yours|Change the name",
        "Before reposting someone's video you should...|Ask permission|Hide it|Guess it is fine",
        "Credit includes...|The creator's name and source|A silly nickname|Nothing",
        "Giving credit supports...|Deaf artists and teachers|Nothing|Cheating",
        "Taking someone's work and saying you made it is...|Dishonest|Honest|Fun",
        "A fair way to share is to...|Link or name the original|Delete the name|Copy secretly",
        "If a creator says no to reposting, you should...|Respect their choice|Do it anyway|Argue",
        "Crediting people is part of being...|Honest and respectful|Silent|Hidden"
      ]),
    SC("Planning your own project", "🗺️", "A good project begins with a clear goal, an audience and a plan. Decide what you want to show, who it is for, how you will make it accessible (captions, an interpreter or visual design), who can give you feedback, and when it will be done. Involve Deaf people from the start, and leave time to fix problems.",
      "Goal, audience, access, feedback and timing.", "A student plans a short video in ASL with captions, asks a Deaf teacher for feedback, and sets a finish date.", [
        "The first step in a project is a clear...|Goal|Snack|Pet",
        "Knowing your audience helps you...|Make the project useful for them|Hide it|Delay it",
        "Access in a project may include...|Captions or an interpreter|Locked doors|Silence only",
        "Who should be involved from the start?|Deaf people connected to the topic|Nobody|Only strangers",
        "Feedback helps you to...|Improve your work|Quit|Cheat",
        "A timeline helps you...|Finish on time|Avoid work|Forget it",
        "Leaving time to fix problems is...|Smart planning|A waste|Impossible",
        "A project about Deaf culture should be led with...|Respect for Deaf voices|Guesses|Secrets"
      ]),
    SC("Case study: the job interview", "💼", "A Deaf applicant has a job interview and requests an interpreter. The employer books a qualified one and shares the interview questions' topics ahead so the interpreter can prepare. During the interview, the interviewer looks at the applicant, not the interpreter, and speaks at a normal pace. After the interview, everyone can ask the interpreter about any missed parts.",
      "Prepare ahead, look at the person, and keep a normal pace.", "At the interview, the interviewer asks the applicant about their skills and waits for the answer.", [
        "The employer should book...|A qualified interpreter|Any person nearby|Nothing",
        "Sharing the topics ahead helps the interpreter to...|Prepare|Panic|Skip",
        "During the interview the interviewer should look at...|The applicant|The ceiling|The interpreter only",
        "The interviewer should speak...|At a normal pace, with pauses for turns|Super fast|In a whisper",
        "Who answers the questions?|The applicant|The interpreter|The doorman",
        "If something is unclear, the interpreter can...|Ask for clarification|Make up an answer|Leave",
        "The goal of the interview is to see the applicant's...|Skills and fit|Hearing|Shoe color",
        "An access request for an interview is...|A normal, legal request|A bother|Not allowed"
      ])
  ];

  Object.assign(SIGN_LEVELS, {
    19: lvl(19, L19, [0, 1, 3, 5, 8, 9, 12, 14]),
    20: lvl(20, L20, [0, 2, 4, 7, 8, 9, 11, 17]),
    21: lvl(21, L21, [0, 2, 4, 8, 9, 13, 15, 17])
  });
})();
