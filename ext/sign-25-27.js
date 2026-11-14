// ext/sign-25-27.js  Mind Lab Sign Language (ASL), levels 25-27 (60 lessons)
// 12th grade and College year 1: ASL linguistics, Deaf studies, law, and the interpreting profession. No sign descriptions beyond what we are sure of.
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
        text: `${o.qd || "Which term matches?"}<br><b>${cur.d}</b>`, visual: cur.e, choices: shuf([cur.t, ...S(rest, 2).map(x => x.t)]), answer: cur.t,
        hints: ["Think back to the lesson. Which one fits this?", `The answer starts with "${lead(cur.t)}".`, exh]
      };
      return {
        text: `${o.qt || "What does this term mean?"}<br><b>${cur.t}</b>`, visual: cur.e, choices: shuf([cur.d, ...S(rest, 2).map(x => x.d)]), answer: cur.d,
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
    "Look for a common ending or beginning first, like -ing or -er, then fit the other letters around it.", () => {
      const w = pick(words);
      let sc = w;
      for (let i = 0; i < 30 && sc === w; i++) sc = shuf(w.split("")).join("");
      return {
        text: `The letters of a word are mixed up:<br><b>${UP(sc).split("").join(" - ")}</b><br>Put them in order. What is the word?`, visual: "🔀", textInput: true, answer: w,
        hints: ["Try to find a small word or an ending hidden inside the letters.", `The word has ${w.length} letters and starts with "${UP(w[0])}".`, `Example: ${UP("nirabwo").split("").join(" - ")} can be arranged into "rainbow". Now do yours.`]
      };
    });
  const rate = () => MK("Signing rate", "⏱️", "A rate says how much happens in one minute. Signs per minute times the number of minutes gives the total. Linguists use rates to compare how fast people sign.",
    "30 signs per minute", "At 30 signs per minute for 9 minutes: 30 times 9 = <b>270</b> signs. To find minutes, divide the total by the rate.",
    "Total = rate times minutes. Minutes = total divided by rate.", () => {
      const r = pick([40, 50, 60, 70, 80, 90, 100, 120]), m = pick([2, 3, 4, 5, 6]);
      if (Math.random() < 0.5) return {
        text: `A signer produces ${r} signs per minute. How many signs is that in ${m} minutes? Type the number only.`, visual: "⏱️", answer: r * m,
        hints: ["Each minute adds the same number of signs.", "Multiply the signs per minute by the number of minutes.", "Example: 30 signs per minute for 9 minutes is 30 times 9 = 270. Now do yours."]
      };
      return {
        text: `A signer produces ${r} signs per minute and makes ${r * m} signs in all. How many minutes did it take? Type the number only.`, visual: "⏱️", answer: m,
        hints: ["You know the total and the amount made each minute.", "Divide the total by the signs per minute.", "Example: 270 signs at 30 per minute is 270 divided by 30 = 9 minutes. Now do yours."]
      };
    });
  const pctOf = () => MK("Percent of a group", "📊", "Studies often report a percent of a group. To find a percent of a number, multiply the number by the percent and divide by 100.",
    "20 percent of 300", "300 students, 20 percent sign: 300 times 20 divided by 100 = <b>60</b> students.",
    "Try 10 percent first (divide by 10), then build up: 20 percent is double that.", () => {
      let N, p;
      do { N = pick([20, 40, 50, 80, 100, 200]); p = pick([10, 20, 25, 50, 75]); } while ((N * p) % 100 !== 0);
      const a = N * p / 100;
      return {
        text: `A survey asked ${N} students. ${p} percent of them use ASL. How many students use ASL? Type the number only.`, visual: "📊", answer: a,
        hints: ["A percent means that many out of every 100.", "Multiply the group size by the percent, then divide by 100.", "Example: 20 percent of 300 is 300 times 20 divided by 100 = 60. Now do yours."]
      };
    });
  const rotate = () => MK("Interpreter team schedule", "👥", "Long jobs use two interpreters who switch every so many minutes. If you know the job length and the switch time, you can plan how many turns each person takes.",
    "300 minutes, switch every 50", "300 divided by 50 = 6 turns in all. Two interpreters share them, so each takes 6 divided by 2 = <b>3</b> turns.",
    "Total turns = job minutes divided by switch time. Each person gets half.", () => {
      const m = pick([10, 15, 20, 30]), k = pick([2, 3, 4, 5]), H = 2 * m * k;
      if (Math.random() < 0.6) return {
        text: `Two interpreters share a ${H}-minute meeting and switch every ${m} minutes. How many turns does each interpreter take? Type the number only.`, visual: "👥", answer: k,
        hints: ["First find how many turns the whole meeting has.", "Divide the meeting length by the switch time, then split the turns between two people.", "Example: 300 minutes with a switch every 50 gives 6 turns in all, so 3 each. Now do yours."]
      };
      return {
        text: `Two interpreters share a ${H}-minute meeting equally. How many minutes does each interpreter actually work? Type the number only.`, visual: "👥", answer: H / 2,
        hints: ["They share the time equally.", "Split the total meeting time between the two people.", "Example: a 300-minute meeting shared equally gives 300 divided by 2 = 150 minutes each. Now do yours."]
      };
    });

  // ================= LEVEL 25 =================
  const L25 = [
    SC("Minimal pairs", "⚖️", "A <b>minimal pair</b> is two signs that differ in just one small part, such as handshape, place or movement. Linguists use them to find which parts matter.", "Think about what a linguist learns when changing one small part makes a brand new word.", "Two signs share most parts but differ in one, and they have different meanings.", [
      "Two signs that differ in only one small part are called a...|Minimal pair|Gloss|Fingerspelled word",
      "Linguists use minimal pairs to find...|Which small parts change meaning|Which signer is fastest|Which sign is oldest",
      "If changing only the movement gives a new word, then movement is...|Meaningful in that language|Random|Ignored",
      "A minimal pair differs in...|Exactly one part|Every part|No parts",
      "Which are parts that can differ in a pair of signs?|Handshape, location, movement, orientation|Only volume|Only color",
      "In a minimal pair, each small part by itself usually has...|No meaning alone|A full sentence|A whole story",
      "Spoken languages have minimal pairs too, such as...|Bat and pat|Bat and a bat's wing|Pat and a story",
      "Minimal pairs help show that sign languages have...|Systematic structure like other languages|No rules|Only gestures"
    ]),
    SC("Repeating for meaning", "🔁", "Repeating a movement can change the meaning of a sign. In ASL, repeating can show a plural noun or an action that goes on or happens again. Linguists call repeating parts of a word <b>reduplication</b>.", "Think about what repeating something over and over tells your viewer about how often or how many.", "A signer changes the movement pattern of a word, and the viewer understands the meaning changed.", [
      "Repeating a movement in a noun can show...|More than one|Past tense only|A question",
      "Repeating a verb's movement can show an action that...|Happens again or goes on|Never happened|Is a command only",
      "Repeating part of a word to change its meaning is called...|Reduplication|Subtraction|Transcription",
      "Reduplication is part of building words, which is called...|Morphology|Spelling|Punctuation",
      "Many spoken languages also repeat parts of words to show...|Plural or repeated action|Only volume|Silence",
      "If a verb is signed with fast repeated movement, the action may be...|Done over and over|Done once|Not done",
      "Why do linguists study repeating in signs?|It shows signs are built by rules|It is only decoration|It means the signer is nervous",
      "Reduplication changes a sign's...|Movement pattern|Language|Spelling"
    ]),
    SC("Babbling with hands", "👶", "Hearing babies babble with sounds. Deaf babies who see sign language from birth babble with their <b>hands</b> in patterned, rhythmic ways. Hearing babies who see signing do this too. Researchers use this to learn how language begins.", "Think about what baby babbling shows about the brain's readiness for language.", "Researchers film babies at play and compare how they move.", [
      "Deaf babies who see sign language babble with their...|Hands|Feet only|Noses",
      "Hand babbling by babies is...|Patterned and rhythmic|Always random|Copied from videos",
      "Babbling shows the baby's brain is ready for...|Language in any form|Only speech|Only reading",
      "Hearing babies who see signing from birth can...|Babble with their hands too|Never babble|Learn nothing",
      "Babbling usually comes before...|First real words or signs|Birth|Marathons",
      "A baby babbling with the hands is not yet making...|Full signs with meaning|Movements|Any noise",
      "Babbling is evidence that language is not tied to...|Sound alone|Brains|People",
      "For a Deaf baby, the best access to language is seeing...|Sign language every day|Silence|Only toys"
    ]),
    SC("The early window", "🌱", "Brains are especially ready to learn a first language in early childhood. Children who get a full language early, signed or spoken, usually do best later. Waiting can make some parts of grammar harder to learn.", "Think about why experts say a child should have a language they can fully access as early as possible.", "Two children start learning a language at very different ages, and researchers compare their progress.", [
      "The first years of life are very important for learning...|A first language|Only math|Only cooking",
      "A child who gets sign language early usually...|Builds strong language skills|Cannot learn|Loses language",
      "A sensitive period means learning is...|Easiest during certain ages|Equal at every age|Impossible",
      "A first language learned late can still be used, but some grammar may be...|Harder|Easier|Illegal",
      "Early language is helped by...|Rich, daily conversation|Waiting until ten|No people",
      "Which is true?|A first language can be a signed one|Only speech counts as a first language|Sign is never a first language",
      "Why do many Deaf experts urge early sign exposure?|It protects language growth|It slows learning|It is only a trend",
      "Waiting before adding sign can risk...|Missing the early window of language|Better memory|Faster reading"
    ]),
    SC("Oralism and manualism", "🏫", "<b>Oralism</b> teaches Deaf children only to speak and lip-read. <b>Manualism</b> teaches with sign language. After a meeting in Milan in 1880, many schools moved to oral-only teaching and signing was often banned in class.", "Think about which approach gives a Deaf child a language they can fully see.", "A student is told not to sign in class but signs with friends later in the day.", [
      "Oralism focuses on...|Speech and lip-reading|Only signing|Only art",
      "Manualism focuses on...|Sign language|Only speaking|Only typing",
      "After 1880, many schools...|Moved toward oral-only teaching|Closed all libraries|Taught only math",
      "Many Deaf people say oral-only schooling...|Left out the language they could fully see|Taught them best|Needed no change",
      "ASL survived the bans partly thanks to Deaf students signing in...|Dorms and playgrounds|Banks|Offices only",
      "Many programs today use...|Sign language and written English|Neither|Only gestures",
      "The Milan meeting was held in the year...|1880|1680|1980",
      "The key problem with oral-only teaching is that it...|Withholds an accessible language|Uses too many books|Is too colorful"
    ]),
    SC("Section 504", "📜", "<b>Section 504</b> of the <b>Rehabilitation Act of 1973</b> says programs that get money from the US federal government cannot discriminate because of disability. It came about 17 years before the ADA.", "Think about which programs the law reaches, and what they must not do.", "A college that gets federal money makes sure a Deaf student can take part in class.", [
      "Section 504 is part of the...|Rehabilitation Act of 1973|ADA of 1990|Bill of Rights",
      "Section 504 covers programs that get...|Federal money|No money|Only gifts",
      "Section 504 says these programs cannot...|Discriminate because of disability|Teach reading|Close on weekends",
      "A school that gets federal funds may need to provide...|Reasonable access like an interpreter|Nothing|A new building",
      "The Rehabilitation Act came before the ADA by about...|17 years|1 year|50 years",
      "Section 504 was one of the first US laws to protect...|Civil rights of people with disabilities|Voting machines|Mailboxes",
      "Section 504 and the ADA are...|Separate laws that work together|The same page|Rules for animals",
      "Section 504 applies to many...|Schools and hospitals that get federal money|Backyards|Spaceships"
    ]),
    SC("IDEA and the IEP", "📝", "<b>IDEA</b> is the Individuals with Disabilities Education Act. It began in 1975 under another name. It promises eligible children a free, appropriate public education, planned in an <b>IEP</b> (Individualized Education Program) written with the family.", "Think about who helps write an IEP and what it can list.", "A team meets with a family to plan a student's supports.", [
      "IDEA stands for the Individuals with Disabilities Education...|Act|Agency|Atlas",
      "IEP stands for...|Individualized Education Program|Internal Exit Permit|Instant English Plan",
      "An IEP is written by a team that includes...|The family and school staff|Only a stranger|Nobody",
      "For a Deaf child, an IEP can list supports like...|Interpreters or captioning|Sleeping in|Silent lunch",
      "IDEA promises a free appropriate public...|Education|Entertainment|Election",
      "IDEA began in 1975 under the name...|Education for All Handicapped Children Act|Silent Schools Act|Sign Act",
      "A good IEP for a signing child includes...|Language and communication needs|Nothing about language|Sports scores",
      "Families are...|Partners in making the IEP|Not allowed to speak|Told afterward"
    ]),
    SC("The Rowley case", "⚖️", "In <b>Board of Education v. Rowley</b> (1982), the US Supreme Court heard the case of Amy Rowley, a Deaf student whose family asked for a sign language interpreter. The Court said schools must provide some educational benefit, which many advocates call a low bar. In 2017 the Court said more than minimal progress is needed.", "Think about whether the Court's standard asks for a lot or a little, and how it later changed.", "A family argues that a school must do more than the bare minimum for a student.", [
      "Amy Rowley's case reached the...|US Supreme Court|Local bakery|Space agency",
      "The Rowley decision came in...|1982|1882|1998",
      "Rowley is about the special education law now called...|IDEA|Section 508|The Constitution",
      "The Court said schools must provide some educational...|Benefit|Vacation|Salary",
      "Many Deaf advocates say the Rowley standard is a...|Low bar|High bar|Parking rule",
      "In 2017 the Court in Endrew F. said progress must be...|More than minimal|Zero|Secret",
      "Rowley's family had asked for a...|Sign language interpreter|Swimming pool|New car",
      "A Supreme Court decision sets guidance for...|Courts across the country|One classroom only|Nobody"
    ]),
    SC("Captioning laws", "💬", "The <b>TV Decoder Circuitry Act of 1990</b> required new TVs of a certain size to have caption decoders built in. The <b>CVAA</b> of 2010 (21st Century Communications and Video Accessibility Act) helped bring captions to internet video that aired on TV.", "Think about how each law helped viewers get captions on more screens.", "A 1990 law made TV makers add a feature so more homes could use captions.", [
      "The TV Decoder Circuitry Act of 1990 required many new TVs to have...|Built-in caption decoders|Hand-shaped remotes|Louder speakers",
      "Before built-in decoders, viewers needed...|A separate decoder box|A telephone|A map",
      "The CVAA of 2010 helped bring captions to...|Internet video from TV shows|Radio|Newspapers",
      "CVAA ends with Video...|Accessibility Act|Acting Agency|Archive",
      "Captions are most helpful when they are...|Accurate and in sync|Late and wrong|Covering the picture",
      "Captions help Deaf viewers and also...|Many people in noisy or quiet places|Nobody else|Only pets",
      "Quality rules for captions include accuracy, timing and...|Completeness|Rhyming|Color of the TV",
      "Closed captions are called closed because viewers can...|Turn them on or off|Not read them|Only buy them"
    ]),
    SC("Relay under the ADA", "☎️", "<b>Title IV</b> of the ADA (signed in 1990) requires telephone relay services across the country. A relay connects a Deaf caller with a hearing person through a relay operator or a video interpreter. Calls are confidential.", "Think about who is on each end of a relay call and who stands in the middle.", "A Deaf customer calls a pharmacy through a service that links the two sides.", [
      "Title IV of the ADA requires...|Telephone relay services|School buses|Voting booths",
      "Relay services connect Deaf callers with...|Hearing people on the phone|Only other Deaf people|Nobody",
      "Relay must be available...|At any hour|Only Mondays|Only noon",
      "A relay operator or video interpreter is...|A link in the call|The caller's boss|A judge",
      "A relay call is...|Confidential|Shared with neighbors|Posted online",
      "Relay can be done by text, captioned phone or...|Video relay|Telegraph only|Mind reading",
      "The ADA was signed in...|1990|1950|2010",
      "Relay services made phone access more...|Equal|Expensive for callers|Rare"
    ]),
    SC("Who is Deaf in families?", "👪", "About nine out of ten Deaf children are born to hearing parents. So most Deaf children do not get sign language from their parents at birth. Early sign classes, Deaf mentors and Deaf schools help families and children find language and community.", "Think about where most Deaf children first meet fluent signers.", "A hearing family looks for ways to learn their baby's language early.", [
      "Most Deaf children are born to...|Hearing parents|Deaf parents|Singers",
      "About how many in ten Deaf children have hearing parents?|About nine|About one|About five",
      "Many Deaf children first meet fluent signers in...|Schools, peers or community|Their parents always|Radio",
      "Because most hearing parents do not know sign at the start, families benefit from...|Early sign classes and Deaf mentors|Waiting|Staying quiet",
      "Deaf adults who pass ASL to their children are...|A smaller group|The majority|Not real",
      "Deaf schools are places where many kids...|Meet signing peers|Never meet anyone|Hide",
      "A Deaf child of Deaf parents often has language access...|From birth|Only at age 12|Never",
      "A Deaf mentor program links families with...|Deaf adults who share language and culture|Salesmen|Robots"
    ]),
    SC("Modality", "👀", "<b>Modality</b> means the channel a language uses. Spoken languages are auditory-vocal (ears and mouth). Sign languages are visual-manual (eyes and hands, face and body). The channel differs, but both are full human languages.", "Think about which senses and body parts each kind of language uses.", "Think of a phone call compared with a video chat in sign.", [
      "Spoken languages are auditory-vocal. Sign languages are...|Visual-manual|Only vocal|Only written",
      "Modality means the...|Channel a language uses|Age of a language|Age of the speaker",
      "Sign languages can express...|Anything spoken languages can|Only simple needs|Only feelings",
      "The brain uses many of the same areas for...|Sign and speech|Only sign|Neither",
      "Because vision can show many things at once, sign languages often use...|Simultaneous structure|No structure|Only one sign ever",
      "ASL has no single...|Widely used writing system|Grammar|Community",
      "Both signed and spoken languages are learned naturally by children who...|Are exposed early|Read only|Drill alone",
      "ASL is a...|Full language|Last resort code|Set of jokes"
    ]),
    SC("What all languages share", "🌐", "All human languages, signed or spoken, share some features: they have rules, they build new sentences from small parts, they change over time, and a community uses them.", "Think about what you can do in any language that you could not do with a list of memorized phrases.", "Two communities each use rules that work well for their own language.", [
      "Every language has rules for...|Building words and sentences|Only spelling|Only volume",
      "Languages let users make...|New sentences never said before|Only memorized lines|Only one sentence",
      "Over time, all living languages...|Change|Stay the same for centuries|Vanish instantly",
      "A language belongs to a...|Community of users|Single teacher|Book",
      "Languages combine small parts into...|Larger meaningful pieces|Nothing|Photos",
      "Children learn languages by...|Interacting with people who use them|Memorizing a dictionary|Taking tests",
      "Sign languages meet the tests of being languages. For example, they have...|Grammar, vocabulary and new sentences|No vocabulary|Only mime",
      "Different languages can say the same idea in...|Different ways|Exactly the same way|No way"
    ]),
    SC("Signs change over time", "🕰️", "Signs change as people use them. Over time, many signs become easier and smoother to make. Two-handed signs may become one-handed, and signs may move closer to the face or to the easy space in front of the body. Linguists study old films and old books of signs.", "Think about what happens to anything people use every day for a long time.", "Film from a hundred years ago shows a sign that looks different from today's.", [
      "Over time, many signs become...|Easier and smoother to make|Harder to make|Louder",
      "Old signs may be studied using...|Old films and books of signs|Dreams|Radio",
      "Two-handed signs sometimes become...|One-handed|Three-handed|Fingerspelled only",
      "Changes in signs are driven by...|Everyday use by the community|One law|A computer",
      "Language change is...|Normal|Always a mistake|A sign of decline",
      "Some signs once looked like a picture of the thing, but change to be more...|Abstract|Detailed|Loud",
      "New technology brings...|New signs|No change|Silence",
      "Older and younger signers using different signs shows...|Language change over generations|Rudeness|Poor learning"
    ]),
    PL("Linguistics terms", "🔬", "Linguists use special words to talk about the parts of a language. Here are some you will see in college courses about ASL.", "Link each word to its question: how are parts organized, built, ordered, understood?", [
      "Phonology::How the small parts of signs are organized::🖐️", "Morphology::How words and signs are built from parts::🧱", "Syntax::How signs are ordered into sentences::📏",
      "Semantics::The study of meaning::💭", "Pragmatics::How context and manners affect meaning::🤝", "Lexicon::The whole stock of signs and words::📚",
      "Modality::The channel a language uses::👀", "Minimal pair::Two signs that differ in one part::⚖️"]),
    rate(),
    readSpell("Read linguistics words", ["syntax", "lexicon", "accent", "dialect", "grammar", "gesture", "meaning", "culture", "history", "student"], "College classes use many fingerspelled terms. Practice reading words from linguistics and Deaf studies."),
    unscramble("Unscramble class words", ["language", "grammar", "dialect", "culture", "history", "captions", "student", "teacher"])
  ];

  // ================= LEVEL 26 =================
  const L26 = [
    SC("Deafhood", "🌱", "<b>Deafhood</b> is an idea shared by scholar Paddy Ladd in 2003. It sees being Deaf as a positive process of discovering and growing Deaf identity, community and language, not just as a loss.", "Think about the difference between asking what is missing and asking what is gained.", "A teenager meets Deaf elders, learns community history and feels proud.", [
      "Deafhood sees being Deaf as a...|Positive process of identity and community|Medical mistake|Fashion",
      "The idea was popularized by scholar...|Paddy Ladd|Isaac Newton|Marie Curie",
      "Deafhood focuses on what Deaf people...|Have and create|Lack|Hide",
      "Deafhood is related to the cultural view, not just the...|Medical view|Weather view|Sports view",
      "Deafhood says identity grows through...|Community, language and history|Silence only|Avoiding others",
      "A person's Deafhood journey may begin...|At different ages|Only at birth|Never",
      "Deafhood is a word used in...|Deaf studies|Cooking class|Chemistry labs",
      "Deafhood invites us to ask not what is missing, but what is...|Gained and shared|Ignored|Forbidden"
    ]),
    SC("De'VIA art", "🎨", "<b>De'VIA</b> means Deaf View/Image Art. Deaf artists named it at a workshop at Gallaudet University in 1989. It is art that shows Deaf experience, such as language, identity and struggle.", "Think about who named it, and what the art is about.", "A painting shows a moment from a Deaf artist's life.", [
      "De'VIA stands for Deaf View/Image...|Art|Audio|Alphabet",
      "De'VIA art expresses...|Deaf experiences|Only landscapes|Only advertising",
      "The name De'VIA was created by...|Deaf artists|A TV network|A bank",
      "De'VIA was named in...|1989|1789|2019",
      "Common De'VIA themes include...|Signing, eyes, hands and communication|Nothing|Sports cars",
      "A De'VIA work shows a Deaf...|Perspective|Hearing view only|Blank page",
      "The naming workshop took place at...|Gallaudet University|A beach|Space",
      "Art by a Deaf artist is...|Not always De'VIA|Always De'VIA|Illegal"
    ]),
    SC("The NAD", "🏛️", "The <b>National Association of the Deaf (NAD)</b> was founded in 1880. It works on civil rights, laws and advocacy for Deaf and hard of hearing people in the United States. It began at a time when oral-only teaching was spreading.", "Think about the group's name, its year and its job.", "A national group writes to lawmakers about access.", [
      "NAD stands for the National Association of the...|Deaf|Dancers|Dreamers",
      "The NAD was founded in...|1880|1980|1780",
      "NAD works on civil rights, laws and...|Advocacy for Deaf people|Cooking contests|Weather",
      "The NAD formed partly to defend sign language during the rise of...|Oral-only teaching|Cameras|Ice cream",
      "The NAD is led largely by...|Deaf people and allies|Only hearing doctors|Nobody",
      "Early NAD members met to protect...|Sign language and Deaf rights|Taxes|Streets",
      "NAD has members across the...|United States|One street|One school",
      "The NAD is a type of...|Advocacy organization|Sports team|Bank"
    ]),
    SC("Deaf studies as a field", "🎓", "<b>Deaf studies</b> is an academic field about Deaf people, their languages, cultures and history. It uses ideas from linguistics, education, history, anthropology and the arts.", "Think about what you would study, and who should shape the research.", "A student writes a paper on a part of Deaf history and interviews someone who lived it.", [
      "Deaf studies is a field about...|Deaf people, language, culture and history|Only dogs|Only cooking",
      "A Deaf studies class might cover ASL, history and...|Culture|Kayaking|Weather",
      "The field draws on linguistics, education, anthropology and...|History|Only chemistry|Nothing",
      "Many Deaf studies classes are taught...|In sign language or with interpreters|In silence|In Morse code",
      "Deaf studies values research led or shaped by...|Deaf people|No one|Outsiders only",
      "A Deaf studies major can lead to jobs in education, advocacy and...|Interpreting or research|Deep sea diving|Space travel",
      "Deaf studies treats Deaf people as a...|Linguistic and cultural group|Medical problem only|Mystery",
      "A student of Deaf studies should read works by...|Deaf authors too|One source|Rumors"
    ]),
    SC("Choices for families", "🧭", "When a baby is found to be Deaf, parents make choices about language, devices and school. Good decisions use information from many trusted sources, including Deaf adults, and always make sure the child has full language access.", "Think about what a child needs most, no matter which device or school is chosen.", "A family asks questions, listens to many people and keeps its child's access to language first.", [
      "Parents of a new Deaf baby often choose about language, devices and...|School|Toys only|Names only",
      "A good decision uses information from...|Many trusted sources, including Deaf adults|One rumor|Ads only",
      "Whatever device a family chooses, a child needs...|Full language access|No language|Less light",
      "Learning ASL and learning English can happen...|Together|Never together|Only at age 20",
      "A device like a cochlear implant is...|A tool, not a replacement for language access|Magic|Illegal",
      "Meeting Deaf adults helps families see...|Many possible futures|Nothing|Only problems",
      "Families should avoid decisions based on...|Fear and one-sided advice|Research|Mentors",
      "Respecting a family's choice means...|Listening and sharing accurate information|Judging|Shouting"
    ]),
    SC("Literacy and language", "📚", "Reading English is built on a strong first language. Many Deaf children do well in reading when they have strong ASL first. Fingerspelling and stories in ASL help link signs to printed words. Reading gaps come mostly from late or limited language access, not lower ability.", "Think about what a strong foundation does for learning a second language like written English.", "A teacher tells a story, then shows the printed words side by side.", [
      "Reading English is built on a strong...|First language|TV|Pencil",
      "Methods that rely only on sound can be harder for children who...|Cannot hear the sounds well|Dislike books|Are lazy",
      "Fingerspelling can help connect signs to...|Printed English words|Math|Music",
      "Many ASL-English bilingual programs teach English mainly as a...|Written language|Song|Silent game",
      "Story reading in ASL builds...|Language and story sense|Nothing|Only sleep",
      "Reading gaps come mostly from...|Late or limited language access|Lower ability|Bad eyes",
      "A bilingual approach treats ASL as the...|Foundation that supports English learning|Obstacle|Secret",
      "Captions help reading because they pair...|Spoken content with printed words|Music with silence|Nothing"
    ]),
    SC("Intersectionality", "🧩", "<b>Intersectionality</b> means that a person's identities overlap and shape their experiences. A person can be Deaf, Black, Latino, a woman, DeafBlind, or part of many groups at once. Legal scholar Kimberlé Crenshaw introduced the word.", "Think about how one person can belong to many groups at the same time.", "A Deaf student of color may face barriers that another Deaf student does not.", [
      "Intersectionality means identities...|Overlap and shape experiences|Never overlap|Do not matter",
      "A Deaf person can also be...|Many other identities too|Only one identity|No identity",
      "Deaf people of color may face...|Barriers from more than one source|No barriers|Only fun",
      "The word intersectionality was introduced by...|Kimberlé Crenshaw|Albert Einstein|Pablo Picasso",
      "To include everyone, groups should...|Listen to many voices|Hear one voice|Skip surveys",
      "DeafBlind people may need...|Tactile signing and other supports|Nothing|Louder voices",
      "Everyone's Deaf story is...|Different|Identical|Secret",
      "A group with leaders from varied backgrounds is more likely to...|Serve all members|Ignore members|Avoid change"
    ]),
    SC("Passing on culture", "🔥", "Many cultures are passed from parents to children. Deaf culture is often passed on through <b>schools, clubs, friends and community events</b>, because most Deaf children have hearing parents. Stories, jokes, name signs and history are shared in sign.", "Think about where Deaf children and teens meet older Deaf people.", "A Deaf elder tells a story to a group of teens after school.", [
      "Deaf culture is often passed on through...|Schools, clubs and friends|Only parents|Books only",
      "Most Deaf children have hearing parents, so culture often comes from...|Peers and community|The weather|Billboards",
      "Stories, jokes and rules are shared in...|Sign|Silence|Code",
      "Alumni gatherings keep...|Friendships and traditions|Debt|Weather",
      "Older Deaf people share history by...|Telling stories|Hiding|Saying nothing",
      "Name signs are an example of a...|Cultural tradition|Traffic rule|Medicine",
      "Recording signed stories helps by...|Saving them for the future|Replacing signers|Deleting them",
      "Deaf culture grows when new members are...|Welcomed|Rejected|Ignored"
    ]),
    SC("Telecom access: Section 255", "📱", "<b>Section 255</b> of the <b>Telecommunications Act of 1996</b> says phones and phone services must be accessible to people with disabilities when this is readily achievable. Access is easiest when built in from the start, called <b>universal design</b>.", "Think about why planning access at the start is easier than fixing it later.", "A phone maker designs its product so more customers can use it.", [
      "Section 255 of the Telecommunications Act says products must be accessible when it is...|Readily achievable|Never|Impossible",
      "The Telecommunications Act was passed in...|1996|1796|2036",
      "Accessible means more people can...|Use the product|Break it|Sell it",
      "Features that help Deaf users include text and...|Video calling|Voice-only menus|Mute buttons only",
      "A phone with only voice menus is...|Not accessible for Deaf users|Great|Silent",
      "Building access in from the start is called...|Universal design|Late design|Hidden design",
      "Section 255 pushed companies to think about access in...|Product design|Zoos|Weather",
      "Who benefits from accessible phones?|Many people, including older adults|Nobody|Only engineers"
    ]),
    SC("Section 508", "💻", "<b>Section 508</b> is part of the Rehabilitation Act. It requires that technology bought and used by federal agencies be accessible. Videos need captions, websites need to work with screen readers and keyboards, and documents need clear structure.", "Think about what makes a website or video usable by everyone.", "A federal office checks that its new website works for people who use different tools.", [
      "Section 508 is about the accessibility of...|Technology used by federal agencies|Fishing|Bridges",
      "Under 508, agency videos should have...|Captions|Smells|Fireworks",
      "Websites should work with...|Screen readers and keyboards|Only one browser|Only mice",
      "A document with clear headings and text descriptions is more...|Accessible|Heavy|Slow",
      "Section 508 is part of the...|Rehabilitation Act|Bill of Rights|Treaty of Paris",
      "508 helps make sure technology can be used by...|Employees and the public with disabilities|Only executives|Nobody",
      "A video with both sign language and captions offers...|Two ways to understand|Confusion|Silence",
      "Making sites accessible also helps...|Many other users|Nobody|Hackers"
    ]),
    SC("Reading legal words", "📖", "Laws use words with special meanings. <b>Shall</b> usually means required, <b>may</b> means allowed, <b>reasonable accommodation</b> means a practical change, and <b>undue burden</b> means a request that would cause major difficulty or expense.", "Think about which legal word means a rule you must follow, and which gives you a choice.", "A law says an agency shall post notices; read the verb slowly to see what it asks.", [
      "In a law, 'shall' usually means...|Required|Optional|Forbidden",
      "'May' usually means...|Allowed but not required|Required|Forbidden",
      "A reasonable accommodation is a change that is...|Practical and not an undue burden|Impossible|Free for all",
      "An undue burden is a request that causes...|Major difficulty or expense|No effort|Joy",
      "To understand a law, you can read its...|Definitions section|Cover color|Ads",
      "A covered entity is a group that...|The law applies to|Is exempt|Is imaginary",
      "A statute is a law passed by...|A legislature|A neighbor|A coach",
      "Legal words often have...|Specific meanings|No meanings|Rhymes"
    ]),
    SC("Interpreters in court", "🏛️", "Deaf people in court can ask for a <b>qualified interpreter</b>. Legal interpreting needs special training because the words are exact and the stakes are high. Family members are usually not allowed or advised to interpret, because they may not be neutral or trained.", "Think about why fairness in court depends on understanding every word.", "The court arranges help for a Deaf witness before a long hearing.", [
      "A courtroom interpreter should be...|Qualified for legal settings|Any relative|A friend of the judge",
      "Using a family member as the court interpreter is...|Usually not advised|Best|Required",
      "Why? A family member may not be...|Neutral or trained|Tall|Late",
      "Legal language is hard, so legal interpreters need...|Special training|No training|A costume",
      "A Deaf person who understands the proceedings can...|Take part fairly|Be removed|Not speak",
      "A Deaf juror may need...|An interpreter to take part|To be excluded|Nothing",
      "Understanding what is happening in court connects to...|Fairness and due process|Fashion|Sports",
      "A team of interpreters is often used in long hearings to...|Prevent tired errors|Be loud|Save paper"
    ]),
    SC("Media and stereotypes", "📰", "Media can help or harm. Stories that treat Deaf people as only brave for doing ordinary things, or as helpless, can be unfair. Better stories show Deaf people as full people with their own goals and let them speak for themselves.", "Think about who is telling the story and whether the person is shown as a full person.", "A news story interviews a Deaf teacher in ASL with captions rather than only talking about her.", [
      "A story praising a Deaf person as a hero for doing ordinary things is called...|Inspiration framing|Fair coverage|Humor",
      "Better stories show Deaf people as...|People with their own goals|Only helpless|Only silent",
      "Good coverage lets Deaf people...|Speak for themselves|Stay out|Sign nothing",
      "A story with captions and interpreters is...|More accessible|Less accurate|Illegal",
      "Many Deaf people prefer the words 'Deaf' or 'hard of hearing' to...|Hearing-impaired|Signer|Teacher",
      "When reading media, ask who is...|Telling the story|Selling snacks|Taller",
      "Stereotypes harm because they...|Reduce people to one idea|Teach language|Save time",
      "A fair video of a signer shows their...|Hands and face clearly|Back|Only shadows"
    ]),
    PL("Deaf studies terms", "📘", "Deaf studies uses its own vocabulary. Here are more words you may see in college readings.", "Match each word to the big idea behind it: identity, bias, benefits, teaching, or art.", [
      "Deafhood::A positive process of growing Deaf identity::🌱", "Audism::Belief that hearing is better::⚖️", "Phonocentrism::Belief that language must be spoken sound::🔊",
      "Deaf Gain::The benefits Deaf people bring::🎁", "Oralism::Teaching speech and lip-reading only::👄", "Bilingualism::Using two languages like ASL and English::🌐",
      "De'VIA::Deaf View/Image Art::🎨", "Advocacy::Speaking up for a cause::📣"]),
    pctOf(),
    SC("The UN treaty", "🌍", "The <b>UN Convention on the Rights of Persons with Disabilities (CRPD)</b> was adopted in 2006. It recognizes sign languages and says Deaf people should be able to use and learn them. Countries that join are called <b>states parties</b>.", "Think about what a treaty is, who makes it and which languages it recognizes.", "A country that joins a treaty agrees to follow its promises.", [
      "The UN CRPD was adopted in...|2006|1906|1806",
      "CRPD stands for Convention on the Rights of Persons with...|Disabilities|Dreams|Diets",
      "The CRPD recognizes sign languages as...|Languages worthy of respect|Not languages|Banned",
      "It says Deaf children should be able to learn...|Sign language|Nothing|No language",
      "Countries that agree to the treaty are called...|States parties|Teams|Clubs",
      "A treaty is an agreement between...|Countries|Pets|Brands",
      "The CRPD supports education in the most suitable...|Languages and ways of communicating|Weather|Colors",
      "The World Federation of the Deaf speaks up for Deaf rights...|Worldwide|On one street|In one town"
    ]),
    readSpell("Read legal and school words", ["rights", "access", "policy", "equity", "school", "statute", "benefit", "program", "service"], "Fingerspelled words in meetings, courts and classes are often law and school words. Practice reading them."),
    unscramble("Unscramble Deaf studies words", ["identity", "advocacy", "literacy", "community", "heritage", "tradition", "equality", "research"])
  ];

  // ================= LEVEL 27 =================
  const L27 = [
    SC("Two hands, two rules", "🤲", "Linguist Robbin Battison described rules in 1978 about two-handed signs. <b>Symmetry</b>: if both hands move, they usually have the same handshape and mirror each other. <b>Dominance</b>: if only one hand moves, the other is a stable base using a simple, common handshape.", "Think about which hand does the work and which one supports it.", "Think of signs where one hand moves and the other holds still.", [
      "When both hands move in a sign, they usually share the same...|Handshape|Skin color|Age",
      "When one hand stays still as a base, it usually uses a...|Simple, common handshape|Rare, complex shape|Different shape each time",
      "These patterns are examples of phonological...|Constraints|Rainfall|Fingerspelling",
      "The linguist who described them in 1978 was...|Robbin Battison|Alexander Bell|Louis Braille",
      "The hand that moves most is the...|Dominant hand|Silent hand|Spare hand",
      "The other hand is called the...|Non-dominant hand|Mute hand|Left hand always",
      "A left-handed signer's dominant hand is usually the...|Left hand|Right hand always|Foot",
      "Constraints like these show sign languages have...|Rules about what is possible|No limits|Only guessing"
    ]),
    SC("Aspect: how an action unfolds", "🔄", "<b>Aspect</b> tells how an action unfolds: ongoing, repeated, or completed. ASL can show aspect by changing the movement of a verb, such as repeating it or making it long and smooth. Aspect is different from <b>tense</b>, which shows when something happens.", "Think about the difference between how long an action lasts and when it happened.", "A signer changes how a verb moves, and the meaning shifts.", [
      "Aspect tells whether an action is...|Ongoing, repeated or completed|Loud or soft|Large or small",
      "ASL can show 'for a long time' by changing a verb's...|Movement|Spelling|Language",
      "Showing a verb happens again and again uses...|Repeated movement|One short motion|Stillness",
      "Aspect is part of the grammar of...|Verbs|Only nouns|Only numbers",
      "The same verb can mean different things by changing its movement and...|Nonmanual marking|Writing|Color",
      "Tense tells you...|When something happens|How loud it is|How it is spelled",
      "ASL often sets time using a time line in...|Signing space|Silence|Writing",
      "Spoken languages show aspect too, such as 'kept running' in...|English|Silence|Math"
    ]),
    SC("Prosody in sign", "🎵", "Speech has <b>prosody</b>: rhythm, pitch and pauses. Sign languages have prosody too. Signers use timing, holding a sign, head movement, eye blinks and facial expression to mark the edges of phrases and show how ideas group together.", "Think about what in sign plays the role that pitch and pauses play in speech.", "A signer's face and timing show where one thought ends.", [
      "Which does sign prosody NOT use?|Sound pitch|Timing|Facial expression",
      "Eye blinks can mark the end of a...|Phrase|Page|Year",
      "Holding the last sign of a phrase slightly longer can mark a...|Boundary|Mistake|Joke",
      "Researchers study prosody by using...|Video of many signers|Radio|Smell",
      "Head tilts and brow shapes help show how ideas...|Group together|Disappear|Count",
      "Intonation in speech is like what in sign?|Facial expression|Nothing|Handedness",
      "Prosody makes language easier to...|Understand|Print|Sell",
      "A signed story with no face would lose...|Much of the grammar and mood|Nothing|Only color"
    ]),
    SC("Corpora", "🗂️", "A <b>corpus</b> is a large collection of real language samples. A sign language corpus is made of videos of many signers, often <b>annotated</b> (labeled) by researchers. It helps linguists see how signs are really used.", "Think about the difference between a list of signs and a library of real conversations.", "A team films signers from many places and keeps the videos for research.", [
      "A corpus is a...|Collection of language samples|Type of drum|Muscle",
      "A sign language corpus is made of...|Videos of signers, often annotated|Only dictionaries|Only novels",
      "Corpora help researchers find...|Patterns in real use|Lottery numbers|Nothing",
      "To make a corpus, signers should give...|Informed consent|Gifts|Nothing",
      "To annotate a video means to add...|Labels for signs and grammar|Music|Stickers",
      "A large corpus helps avoid depending on...|One signer's habits|Any data|Math",
      "Signers in a corpus should represent different...|Ages, places and backgrounds|Shirt colors|Pets",
      "Compared with a dictionary, a corpus shows how signs are used in...|Real conversation|Alphabet order|Silence"
    ]),
    SC("Glosses and their limits", "🏷️", "A <b>gloss</b> is an English label in capital letters for a sign. Glosses are handy, but they lose details like facial grammar, movement and use of space. Researchers add notes, video and other systems to show what a gloss leaves out.", "Think about how a label differs from the thing it names.", "A written label for a sign cannot show everything the signer did.", [
      "A gloss like HOME is an English label for...|A sign|A face|A hat",
      "Glosses can lose information about...|Facial grammar and use of space|Spelling|English",
      "A gloss is not...|A full translation|A label|Written text",
      "Software for annotating video lets researchers...|Tag parts of the video by time|Cook|Do nothing",
      "Because glosses leave details out, researchers add...|Notes on face and movement|Nothing|Ads",
      "Glosses are usually written in...|Capital letters|Tiny pictures|Rhymes",
      "A gloss is best seen as a...|Handy research label|Final translation|Law",
      "SignWriting records signs using symbols for handshape, movement and...|Place|Smell|Taste"
    ]),
    SC("Models of interpreting", "🧠", "How interpreters see their job has changed. The <b>conduit</b> model treated them as a pipe passing words along. The <b>helper</b> model treated them like caregivers. Today the <b>bilingual-bicultural</b> view sees them as skilled communicators who work with language and culture and use sound judgment.", "Think about which older models were criticized and why.", "An interpreter chooses signs that carry the meaning of a joke instead of translating each word.", [
      "The conduit model sees the interpreter as a...|Pipe that passes words along|Teacher|Judge",
      "Critics say the conduit model ignores...|Meaning, culture and context|Spelling|Footsteps",
      "The bilingual-bicultural view sees interpreters as...|Skilled communicators handling language and culture|Silent robots|Decision-makers for clients",
      "In the helper model, interpreters acted like...|Caregivers who sometimes helped too much|Judges|Referees",
      "Why was the helper model criticized?|It treated Deaf adults as needing care|It was too fast|It used props",
      "Today's views stress the interpreter's...|Judgment, skill and respect for clients|Silence|Speed only",
      "Models change as the profession learns from research and...|Deaf feedback|Nothing|Fashion",
      "A word-for-word approach often fails because languages have...|Different grammar|The same grammar|No grammar"
    ]),
    SC("Demand-control schema", "🎛️", "Robyn Dean and Robert Pollard introduced the <b>demand-control schema</b>. <b>Demands</b> are challenges in a job: environmental (the room), interpersonal (people), paralinguistic (how someone speaks or signs) and intrapersonal (your own thoughts and feelings). <b>Controls</b> are choices the interpreter can use to respond.", "Think about whether each example is a challenge or a choice you make to respond to it.", "An interpreter feels nervous before a big job and takes a slow breath before starting.", [
      "In demand-control, demands are...|Challenges in the job|Payments|Prizes",
      "Controls are...|Choices the interpreter can use to respond|Locks|Buttons only",
      "The four kinds of demand are environmental, interpersonal, paralinguistic and...|Intrapersonal|Imaginary|Insurance",
      "A noisy room is which kind of demand?|Environmental|Intrapersonal|Paralinguistic",
      "Your own nervousness is which kind of demand?|Intrapersonal|Environmental|Interpersonal",
      "A speaker talking very fast is which kind of demand?|Paralinguistic|Environmental|Intrapersonal",
      "Asking a speaker to slow down is an example of a...|Control|Demand|Gloss",
      "Studying materials before the job is a control used...|Before the work begins|After it ends|Never"
    ]),
    SC("Meaning, not just words", "🎯", "The language you interpret <b>from</b> is the <b>source language</b>. The language you interpret <b>into</b> is the <b>target language</b>. A good interpretation carries the meaning and the speaker's goal, not just each word. Idioms must be conveyed by their meaning.", "Think about which language is which, and what really needs to be carried across.", "To interpret 'it costs an arm and a leg', the interpreter conveys that something is very expensive.", [
      "The language you interpret from is the...|Source language|Target language|Gloss language",
      "The language you interpret into is the...|Target language|Source language|Native language",
      "A good interpretation carries the...|Meaning and intent|Only the first word|Only the last word",
      "Word-for-word interpreting of an English idiom can sound...|Confusing|Perfect|Funny always",
      "Before interpreting, an interpreter thinks about the speaker's...|Goal|Shoe size|Name",
      "'It's raining cats and dogs' should be conveyed as...|Heavy rain|Pets falling|A zoo",
      "Interpreters need strong skills in...|Both languages and cultures|One language|Math only",
      "Changing a message to fit the target grammar is...|Normal and necessary|Cheating|Rude"
    ]),
    SC("Register and audience", "🎩", "<b>Register</b> is the level of formality in language. A job interview needs a more formal register than a chat among friends. Interpreters match the speaker's register and think about the audience and setting.", "Think about how you sign to a friend compared with how you would sign to a judge.", "An interpreter reads the room before choosing how to sign.", [
      "Register means the...|Level of formality|Cash machine|Volume",
      "A job interview needs a more...|Formal register|Silly register|Secret code",
      "An interpreter should match the speaker's...|Register|Height|Clothes",
      "Chatting with friends uses...|Casual register|Legal register|No register",
      "Interpreting a lecture, you keep the academic words and...|Tone|Nothing|Jokes always",
      "Changing a formal speech to slang would be an...|Error in register|Improvement|Rule",
      "To pick a register, ask who the audience is and what the...|Setting is|Weather is|Time zone is",
      "Register in sign can show in the signs chosen and the size of...|Signing space|Hair|Shoes"
    ]),
    SC("Specialized settings", "🏥", "Interpreters work in many settings: schools, hospitals, courts, workplaces and performances. Medical and legal settings use exact terms and carry high stakes, so interpreters need training and preparation. A professional turns down jobs they are not qualified for.", "Think about why some settings need extra training and preparation.", "Before a surgery consult, the interpreter prepares in advance.", [
      "Interpreters in hospitals need to know...|Medical terms|Cooking terms|Sports scores",
      "In legal settings, accuracy is extremely...|Important|Unimportant|Silly",
      "Educational interpreters work with students in...|Classrooms|Zoos|Pools",
      "Some interpreters take extra training for... settings|Legal or medical|Weather|Gaming",
      "A good interpreter turns down jobs they are...|Not qualified for|Qualified for|Paid for",
      "Before an appointment, an interpreter might ask for...|Preparation materials|A secret|A snack",
      "Mental health settings need extra care with...|Confidentiality and trust|Decor|Parking",
      "Which has special terms that must be exact?|Court hearings|A casual hello|Birthday cheer"
    ]),
    SC("Video remote interpreting", "🖥️", "<b>VRI</b> means Video Remote Interpreting: the interpreter appears on a screen instead of being in the room. It can help when no local interpreter is available, but poor video, a bad angle or a frozen screen can make it fail. <b>VRS</b>, video relay service, is different: it connects phone calls.", "Think about what must work well for a visual language over a video link.", "A clinic plans the room before the patient arrives.", [
      "VRI stands for Video Remote...|Interpreting|Internet|Invention",
      "In VRI, the interpreter appears by...|Video screen|Mail|Radio",
      "VRI is used when an interpreter is...|Not on site|Always on site|Not needed",
      "VRI can fail when the video is...|Blurry or frozen|Colorful|Big",
      "A hospital using VRI should make sure the screen is... for the Deaf patient|Clearly visible|Facing a wall|Hidden",
      "VRS is different because it connects...|Phone calls|Students in class|Judges",
      "For long or complex meetings, many Deaf people prefer...|In-person interpreters|Silent notes|None",
      "A strong connection matters because sign is...|Visual, so video quality matters|Audio only|Typed"
    ]),
    SC("Interpreter well-being", "🧘", "Interpreting is mentally and physically demanding. Hearing about hard events can cause <b>vicarious trauma</b>. Teaming, breaks, stretching, sleep, and talking through difficult jobs with a trusted colleague (while keeping privacy rules) help interpreters stay healthy.", "Think about habits that protect both the mind and the hands.", "After a hard job, an interpreter takes time to recover.", [
      "Feeling affected by hearing about someone else's hard experiences can be called...|Vicarious trauma|Typing speed|Weather",
      "Interpreters can protect themselves by...|Taking breaks and talking to peers|Ignoring feelings|Working non-stop",
      "Teaming helps because partners can...|Swap to rest|Compete|Sign louder",
      "Repetitive strain can hurt the...|Hands and arms|Hair|Shoes",
      "Stretching can help...|Prevent strain|Cause strain|Nothing",
      "Debriefing means talking through a hard job with a trusted colleague while keeping...|Privacy|Names public|Everything open",
      "A healthy routine includes enough...|Sleep and rest|Noise|Overtime",
      "Asking for support is a sign of...|Professional strength|Failure|Rudeness"
    ]),
    SC("Professional organizations", "🌐", "Professional groups set standards and support interpreters. <b>RID</b> (Registry of Interpreters for the Deaf) was founded in 1964. <b>CIT</b> is the Conference of Interpreter Trainers. <b>WASLI</b> is the World Association of Sign Language Interpreters. The <b>NAD</b> and RID share a code of professional conduct.", "Think about what each group's name tells you about who it serves.", "A new interpreter looks for a professional group to join.", [
      "RID stands for the Registry of Interpreters for the...|Deaf|Dancers|Dentists",
      "RID was founded in...|1964|1864|1984",
      "CIT stands for the Conference of Interpreter...|Trainers|Tutors|Travelers",
      "WASLI is the World Association of Sign Language...|Interpreters|Islands|Instructors",
      "Groups like these set standards and offer...|Training and certification|Free pizza|Radio",
      "NAD and RID share a...|Code of professional conduct|Mascot|Menu",
      "An interpreter joins a professional group to get...|Standards, networks and learning|Discounts only|Nothing",
      "WASLI works...|Worldwide|On one street|In one school"
    ]),
    SC("The Code of Conduct", "📏", "The NAD-RID <b>Code of Professional Conduct</b> has seven tenets: confidentiality, professionalism, conduct, respect for consumers, respect for colleagues, business practices and professional development. It guides interpreters when they face hard choices.", "Think about what each of the seven words asks an interpreter to be or do.", "An interpreter keeps a client's medical visit private.", [
      "The NAD-RID Code of Professional Conduct has how many tenets?|Seven|Two|Thirty",
      "One tenet is...|Confidentiality|Gossip|Competition",
      "Another is respect for...|Consumers|Cars|Cats",
      "Another is professional...|Development|Retirement|Silence",
      "Professionalism means being...|Reliable and accurate|Late|Loud",
      "Respect for colleagues includes...|Supporting teammates|Mocking|Hiding",
      "Business practices cover things like...|Fair fees and clear agreements|Costumes|Gifts",
      "The code is meant to guide interpreters when...|Facing hard choices|Eating|Shopping"
    ]),
    PL("Interpreting terms", "🗣️", "Interpreters use special words for their work. These are the ones to know in an introductory course.", "Think of each term as an answer to: from what, into what, when, or how.", [
      "Source language::The language being interpreted from::📥", "Target language::The language you interpret into::📤", "Consecutive::Interpreting after the speaker pauses::⏸️",
      "Simultaneous::Interpreting while the speaker continues::⏩", "Decalage::The lag between the message and the interpretation::⏱️", "Sight translation::Reading a written text and rendering it into another language::📄",
      "Team interpreting::Two interpreters sharing the work::👥", "Confidentiality::Keeping what you interpret private::🔒"]),
    rotate(),
    readSpell("Read interpreting words", ["interpret", "register", "ethics", "culture", "mentor", "target", "source", "gloss", "medical", "client"], "College interpreting classes use many fingerspelled terms. Practice reading words from the profession."),
    unscramble("Unscramble profession words", ["interpret", "register", "teaming", "trainer", "clients", "culture", "meaning", "decision"])
  ];

  Object.assign(SIGN_LEVELS, {
    25: lvl(25, L25, [0, 1, 3, 5, 6, 10, 13, 14]),
    26: lvl(26, L26, [0, 2, 4, 6, 8, 11, 13, 14]),
    27: lvl(27, L27, [0, 1, 5, 6, 8, 10, 13, 15])
  });
})();
