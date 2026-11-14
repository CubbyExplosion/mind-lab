// ext/spelling-16-18.js : Spelling & Words, levels 16-18 (7th grade second half, 8th grade).
(() => {
  const S = (h, v, t) => ({ h, v, t });
  const run = (gen, hints) => () => { const q = gen(); q.hints = hints.map(h => (typeof h === "function" ? h(q) : h)); return q; };
  const L = (title, gen, hints, slides) => { const make = run(gen, hints); make.teach = () => slides; return { title, make }; };
  const MIX = (title, ls) => {
    const make = () => pick(ls).make();
    make.teach = () => [S("Review time!", "🔄", "This lesson mixes ideas you already know. Here is a quick reminder of each one, then the quiz.")].concat(ls.slice(0, 4).map(l => l.make.teach()[0]));
    return { title, make };
  };
  const info = w => `It starts with <b>${w[0]}</b> and has ${w.length} letters.`;

  // ----- question makers -----
  const mcG = (items, n = 3) => () => { const it = pick(items); const [t, a, d, v] = it; const q = { text: t, choices: shuf([a, ...shuf(d).slice(0, n - 1)]), answer: a, it }; if (v) q.visual = v; return q; };
  const poolG = (items, pool) => () => { const it = pick(items); const [t, a, v] = it; const q = { text: t, choices: shuf([a, ...shuf(pool.filter(p => p !== a)).slice(0, 2)]), answer: a, it }; if (v) q.visual = v; return q; };
  const tyG = items => () => { const it = pick(items); const [t, a, v, s] = it; const q = { text: t, textInput: true, answer: a, it }; if (v) q.visual = v; if (s) q.say = s; return q; };
  const tyN = items => tyG(items.map(([t, a]) => [t, a, "", ""]));
  const rightG = items => () => {
    const it = pick(items), [r, w] = it;
    return { text: "Which one is spelled correctly?", say: r, choices: shuf([r, ...shuf(w).slice(0, 2)]), answer: r, it };
  };
  const sentG = items => () => { const it = pick(items), [t, a, d] = it; return { text: t.replace("___", "<b>___</b>"), choices: shuf([a, ...shuf(d).slice(0, 2)]), answer: a, it }; };
  const dictG = items => items.map(([w, s]) => [`Listen and spell the missing word: ${s.replace("___", "<b>___</b>")}`, w, "", w]);
  const meaningG = (items, pool, label) => () => {
    const it = pick(items), [word, part, mean] = it;
    return { text: `The word <b>${word}</b> has the ${label} <b>${part}</b>. What does it mean?`, choices: shuf([mean, ...shuf(pool.filter(m => m !== mean)).slice(0, 2)]), answer: mean, it };
  };
  const prefG = (items, pool) => () => {
    const it = pick(items), [p, w, m] = it;
    return { text: `What does the word part <b>${p}</b> mean, as in <b>${w}</b>?`, choices: shuf([m, ...shuf(pool.filter(x => x !== m)).slice(0, 2)]), answer: m, it };
  };
  const vocG = items => () => {
    const it = pick(items), [w, s, m, d] = it;
    return { text: `${s}<br>What does <b>${w}</b> mean here?`, choices: shuf([m, ...shuf(d).slice(0, 2)]), answer: m, it };
  };
  const proofG = list => () => {
    const s = pick(list), wrong = s.match(/\[(\w+)\]/)[1], clean = s.replace(/[\[\]]/g, "");
    const good = [...new Set(clean.replace(/[.,]/g, "").split(" ").filter(w => w.length > 3 && w !== wrong))];
    return { text: `Which word is spelled wrong?<br><b>${clean}</b>`, choices: shuf([wrong, ...shuf(good).slice(0, 2)]), answer: wrong, it: [wrong] };
  };
  const proofH = ex => ["Read the sentence slowly, one word at a time. Do not read ahead.", "Look for a word with a missing, extra or swapped letter. The wrong word is one that you can fix by changing a letter or two.", ex];
  const proofSlides = a => [S("Proofreading", "🕵️", "A proofreader reads slowly to find spelling mistakes."), S("Check the tricky spots", a, "Look at double letters, silent letters, endings and the middle of long words."), S("Fix it", "✏️", "Write the word the right way, then read the sentence again.")];
  const dictHints = ex => ["Press the speaker and listen. Say the word in parts, then write each part.", q => info(q.answer) + " Say it in parts and write each one.", ex];
  const dictSlides = (a, b) => [S("Spell in parts", a, "Break a long word into syllables and spell one part at a time."), S("Tricky spots", b, "Look for double letters, silent letters and parts that do not sound the way they are spelled."), S("Check", "✅", "Write the word, then say it again in parts. Does every part appear in your spelling?")];
  const sentHints = ex => ["Read the whole sentence. Think about what the missing word means.", "These words sound alike or look alike. Match the meaning to the sentence.", ex];
  const misH = ex => ["Say each choice slowly. Look for missing, extra or swapped letters in the middle of the word.", q => info(q.answer), ex];
  const misSlides = (a, b) => [S("Tricky words", "✏️", "Some words are hard because of double letters, silent letters or letters that sound like others."), S("Look closely", a, "Check the middle of the word. That is where most mistakes hide."), S("Learn by parts", b, "Split the word into parts and say each part. Then picture the whole word.")];
  const vocabH = ex => ["Use the other words in the sentence to guess what the word means.", q => q.it[4] || "Think about whether the word feels positive or negative.", ex];
  const vocabSlides = [S("Context clues", "🔎", "The words around a new word often tell you its meaning."), S("Parts help", "🧩", "Look for a root, prefix or suffix you know inside the word."), S("Use it", "✍️", "After you learn a word, use it in your own sentence to make it stick.")];
  const meanH = ex => ["Break the word into parts. One part carries the main meaning.", q => q.it[3], ex];

  // ================= LEVEL 16 =================
  const ROOT9 = [
    ["immortal", "mort", "death", "A hero in a myth who never dies is this."],
    ["judicial", "jud", "judge", "Courts of law belong to this branch of government."],
    ["introduce", "duc", "lead", "You do this when you lead a new friend over to meet your family."],
    ["prevent", "ven", "come", "To stop something before it can come."],
    ["compress", "press", "push", "Squeezing a big sleeping bag into a small bag is doing this."],
    ["suburb", "urb", "city", "It is a neighborhood just outside a big town."],
    ["marine", "mar", "sea", "A scientist who studies ocean animals studies this kind of life."],
    ["sanitary", "san", "healthy", "A clean kitchen that is free of germs is this."],
    ["vacant", "vac", "empty", "A parking space with no car in it is this."]
  ];
  const ROOT9P = ["death", "judge", "lead", "come", "push", "city", "sea", "healthy", "empty"];
  const PREF16 = [["inter-", "international", "between"], ["inter-", "intersection", "between"], ["intra-", "intramural", "within"], ["intra-", "intranet", "within"], ["trans-", "transatlantic", "across"], ["trans-", "transport", "across"], ["sub-", "subway", "under"], ["sub-", "subzero", "under"], ["super-", "supervise", "above"], ["super-", "supernatural", "above"], ["anti-", "antifreeze", "against"], ["anti-", "antibacterial", "against"]];
  const PREF16P = ["between", "within", "across", "under", "above", "against"];
  const NOUN16 = [
    ["Make a noun from <b>arrange</b> by adding <b>-ment</b>.", "arrangement"], ["Make a noun from <b>achieve</b> by adding <b>-ment</b>.", "achievement"],
    ["Make a noun from <b>argue</b> by adding <b>-ment</b>. The e drops!", "argument"], ["Make a noun from <b>announce</b> by adding <b>-ment</b>.", "announcement"],
    ["Make a noun from <b>refuse</b> by adding <b>-al</b>.", "refusal"], ["Make a noun from <b>approve</b> by adding <b>-al</b>.", "approval"],
    ["Make a noun from <b>arrive</b> by adding <b>-al</b>.", "arrival"], ["Make a noun from <b>survive</b> by adding <b>-al</b>.", "survival"],
    ["Make a noun from <b>fail</b> by adding <b>-ure</b>.", "failure"], ["Make a noun from <b>depart</b> by adding <b>-ure</b>.", "departure"],
    ["Make a noun from <b>expose</b> by adding <b>-ure</b>. The e drops!", "exposure"], ["Make a noun from <b>perform</b> by adding <b>-ance</b>.", "performance"],
    ["Make a noun from <b>resist</b> by adding <b>-ance</b>.", "resistance"], ["Make a noun from <b>exist</b> by adding <b>-ence</b>.", "existence"],
    ["Make a noun from <b>differ</b> by adding <b>-ence</b>.", "difference"], ["Make a noun from <b>appear</b> by adding <b>-ance</b>.", "appearance"]
  ];
  const HOMO13 = [
    ["The ___ of the school welcomed the new students.", "principal", ["principle", "prince"]], ["It is a ___ of mine never to give up.", "principle", ["principal", "principles"]],
    ["Her blue scarf is a perfect ___ to her coat.", "complement", ["compliment", "complain"]], ["He gave me a kind ___ about my drawing.", "compliment", ["complement", "complaint"]],
    ["The scientist will ___ her source in the report.", "cite", ["site", "sight"]], ["The builders walked around the building ___.", "site", ["cite", "sight"]],
    ["The tourists shopped for spices at the colorful ___.", "bazaar", ["bizarre", "bazar"]], ["That strange costume looked ___.", "bizarre", ["bazaar", "bizzare"]],
    ["A heart is a ___ for love.", "symbol", ["cymbal", "symbal"]], ["The drummer crashed the ___.", "cymbal", ["symbol", "symbal"]],
    ["Please be ___ when you carry a secret.", "discreet", ["discrete", "discreat"]], ["The puzzle was made of ten ___ pieces that were not joined.", "discrete", ["discreet", "discrite"]],
    ["The climbers began their ___ of the mountain at dawn.", "ascent", ["assent", "accent"]], ["The class showed their ___ to the plan by raising their hands.", "assent", ["ascent", "accent"]],
    ["Tomorrow's ___ will teach us fractions.", "lesson", ["lessen", "lessan"]], ["Medicine can ___ the pain.", "lessen", ["lesson", "lessin"]],
    ["Read the ___ at the front of the book.", "foreword", ["forward", "foreward"]], ["The clock sits on the fireplace ___.", "mantel", ["mantle", "mantal"]],
    ["The sand felt ___ under my feet.", "coarse", ["course", "corse"]], ["We took the long ___ home.", "course", ["coarse", "cours"]]
  ];
  const MIS16 = [["pursue", ["persue", "pursew"]], ["sacrifice", ["sacrafice", "sacrifise"]], ["variety", ["varriety", "varity"]], ["discipline", ["disipline", "discapline"]], ["gauge", ["guage", "gaige"]], ["harass", ["harrass", "haras"]], ["hindrance", ["hinderance", "hindrence"]], ["license", ["lisence", "liscence"]], ["possession", ["posession", "possesion"]], ["prejudice", ["predjudice", "prejudise"]], ["tendency", ["tendancy", "tendensy"]], ["vengeance", ["vengence", "vengeence"]]];
  const SOFT = [["noticeable", ["noticable", "noticeible"]], ["courageous", ["couragous", "courajous"]], ["manageable", ["managable", "manageible"]], ["changeable", ["changable", "changeible"]], ["peaceable", ["peacable", "peaceible"]], ["outrageous", ["outragous", "outrajous"]], ["advantageous", ["advantagous", "advantajous"]], ["knowledgeable", ["knowledgable", "knowlegeable"]], ["serviceable", ["servicable", "serviseable"]], ["traceable", ["tracable", "traseable"]]];
  const ORD = [["ninth", ["nineth", "ninnth"]], ["twelfth", ["twelvth", "twelth"]], ["fortieth", ["fourtieth", "fortyeth"]], ["fifth", ["fiveth", "fith"]], ["eighth", ["eigth", "eightth"]], ["twentieth", ["twentyeth", "twentith"]], ["ninetieth", ["ninetyeth", "nintieth"]], ["sixtieth", ["sixtyeth", "sixtith"]], ["fifteenth", ["fifthteenth", "fiftenth"]], ["hundredth", ["hundreth", "hundredeth"]], ["thirtieth", ["thirtyeth", "thirtith"]]];
  const SCI16 = [["photosynthesis", ["photosinthesis", "photosythesis"]], ["chlorophyll", ["clorophyll", "chlorofil"]], ["atmosphere", ["atmosfere", "atmosphear"]], ["ecosystem", ["ecosistem", "ecosytem"]], ["molecule", ["molicule", "mollecule"]], ["hypothesis", ["hypothisis", "hipothesis"]], ["organism", ["orgnism", "organizm"]], ["evaporation", ["evapuration", "evaperation"]], ["condensation", ["condensasion", "condencation"]], ["precipitation", ["percipitation", "precipatation"]], ["thermometer", ["thermomiter", "thermomater"]]];
  const MATH16 = [["parallelogram", ["paralelogram", "parallelagram"]], ["perpendicular", ["perpendiclar", "perpindicular"]], ["hypotenuse", ["hypotenous", "hypotenuce"]], ["denominator", ["denomenator", "denominater"]], ["numerator", ["numerater", "numarator"]], ["quadrilateral", ["quadrilatteral", "quadralateral"]], ["circumference", ["circumferance", "circumfrence"]], ["perimeter", ["perimiter", "perrimeter"]], ["coefficient", ["coefficent", "cofficient"]], ["exponent", ["exponant", "exponet"]], ["symmetry", ["symetry", "symmetery"]], ["equilateral", ["equalateral", "equilatteral"]]];
  const DEV = [
    ["<b>Buzz</b>, <b>sizzle</b> and <b>splash</b> are words that sound like what they mean. What is this called?", "onomatopoeia"],
    ["'Peter picked a peck of pickled peppers' repeats the same first sound. What is this called?", "alliteration"],
    ["'The wind whispered through the trees.' Giving a human action to the wind is called...", "personification"],
    ["'The sun smiled down on the picnic.' This gives the sun a human action. It is...", "personification"],
    ["'Sally sells seashells by the seashore' is an example of...", "alliteration"],
    ["'Boom! Crash! Splat!' are examples of...", "onomatopoeia"],
    ["'I've told you a million times!' is an extreme exaggeration. It is...", "hyperbole"],
    ["'The classroom was a zoo.' compares two things without using like or as. It is a...", "metaphor"],
    ["'She was as brave as a lion.' compares using as. It is a...", "simile"],
    ["'The thunder grumbled in the distance.' gives thunder a human action. It is...", "personification"]
  ];
  const DEVP = ["alliteration", "onomatopoeia", "personification", "hyperbole", "metaphor", "simile"];
  const FEEL = [["curious", "interested", "nosy"], ["thrifty", "saving", "stingy"], ["slim", "thin", "scrawny"], ["confident", "sure", "arrogant"], ["unique", "different", "weird"], ["childlike", "young", "childish"], ["adventurous", "daring", "reckless"], ["cozy", "small", "cramped"], ["outgoing", "talkative", "rambling"]];
  const feelG = () => {
    const it = pick(FEEL), pos = Math.random() < 0.5;
    return { text: `These words have nearly the same meaning. Which one sounds <b>${pos ? "most positive" : "most negative"}</b>?`, choices: shuf(it.slice()), answer: pos ? it[0] : it[2], it, pos };
  };
  const LOAN = [
    ["algebra", "Arabic", "Scholars in the Middle East wrote the first big books about this kind of math."], ["sofa", "Arabic", "It came from a word for a raised seat in the Middle East."],
    ["cookie", "Dutch", "The first people to say it lived in a country with windmills and tulips."], ["yacht", "Dutch", "It is a sailing boat word from a land of canals and windmills."],
    ["shampoo", "Hindi", "It started as a word for massage in a country in South Asia."], ["tsunami", "Japanese", "It means 'harbor wave' on an island nation in East Asia."],
    ["origami", "Japanese", "This folding art comes from an island nation in East Asia."], ["kindergarten", "German", "Its first half means children and its second half means garden, in a country in central Europe."],
    ["hamster", "German", "It came into English from a country famous for the Black Forest."], ["canyon", "Spanish", "It comes from the language of the country that named Los Angeles and San Antonio."],
    ["bouquet", "French", "It is a word from the country famous for the Eiffel Tower."], ["opera", "Italian", "It is a word from the country shaped like a boot."], ["kayak", "Inuit", "It is a boat word from the northern peoples of Arctic Canada and Greenland."]
  ];
  const LANGP = ["Arabic", "Dutch", "Hindi", "Japanese", "German", "Spanish", "French", "Italian", "Inuit"];
  const loanG = () => {
    const it = pick(LOAN), [w, l] = it;
    return { text: `English borrowed the word <b>${w}</b> from another language. Which one?`, choices: shuf([l, ...shuf(LANGP.filter(x => x !== l)).slice(0, 2)]), answer: l, it };
  };
  const COLL = [
    ["We need to ___ a decision before lunch.", "make", ["do", "get"]], ["Please ___ attention to the teacher.", "pay", ["spend", "make"]],
    ["She will ___ a photo of the sunset.", "take", ["make", "do"]], ["The forecast calls for ___ rain.", "heavy", ["strong", "large"]],
    ["He fell into a ___ sleep.", "deep", ["tall", "wide"]], ["Please ___ your homework before dinner.", "do", ["make", "take"]],
    ["It is time to ___ the table for dinner.", "set", ["build", "do"]], ["She will ___ a speech at the assembly.", "give", ["tell", "say"]],
    ["He has only a ___ chance of winning.", "slim", ["narrow", "short"]], ["They had a ___ escape from the storm.", "narrow", ["slim", "short"]],
    ["We hope to ___ a new record.", "set", ["do", "put"]]
  ];
  const ING = [["Add <b>-ing</b> to <b>die</b>.", "dying"], ["Add <b>-ing</b> to <b>lie</b> (rest flat).", "lying"], ["Add <b>-ing</b> to <b>tie</b>.", "tying"], ["Add <b>-ing</b> to <b>picnic</b>.", "picnicking"], ["Add <b>-ing</b> to <b>panic</b>.", "panicking"], ["Add <b>-ing</b> to <b>mimic</b>.", "mimicking"], ["Add <b>-ing</b> to <b>dye</b>.", "dyeing"], ["Add <b>-ing</b> to <b>canoe</b>.", "canoeing"], ["Add <b>-ing</b> to <b>agree</b>.", "agreeing"], ["Add <b>-ing</b> to <b>frolic</b>.", "frolicking"]];
  const WORDY = [
    ["past history", ["ancient history", "local history"]], ["free gift", ["birthday gift", "small gift"]], ["unexpected surprise", ["pleasant surprise", "big surprise"]],
    ["repeat again", ["repeat twice", "say again"]], ["return back", ["return home", "come back"]], ["added bonus", ["cash bonus", "big bonus"]],
    ["close proximity", ["close friend", "near the door"]], ["final outcome", ["happy outcome", "final exam"]], ["advance planning", ["careful planning", "early planning"]], ["end result", ["final score", "good result"]]
  ];
  const wordyG = () => { const it = pick(WORDY), [r, o] = it; return { text: "Which phrase says the same thing twice and could be shortened?", choices: shuf([r, ...o]), answer: r, it }; };
  const PROOF16 = ["The old [castel] stood high on the hill.", "My [nieghbor] waters the garden every morning.", "He ate a [sandwhich] for lunch.", "Please check your [grammer] before you hand it in.", "The [tomatoe] plants grew taller than me.", "She wrote one [paragraf] about the trip.", "He made a [sincear] apology to his friend.", "We took a [differant] road home.", "The [intresting] book kept me up late."];
  const DICT16 = dictG([["appreciate", "I really ___ your help."], ["tournament", "Our school won the chess ___."], ["triumph", "The team celebrated its ___."], ["wholesome", "Fresh fruit is a ___ snack."], ["communicate", "We ___ with each other by email."], ["available", "Is the library ___ on Sunday?"], ["typical", "It was a ___ rainy day."], ["vigorous", "A ___ walk is good exercise."], ["literature", "She loves reading classic ___."], ["resource", "Water is a valuable natural ___."]]);
  const VOC16 = [
    ["abundant", "The <b>abundant</b> rain filled the rivers to the top.", "plentiful", ["rare", "cold"], "Rain that fills rivers to the top is a lot of rain."],
    ["reluctant", "He was <b>reluctant</b> to jump into the cold lake.", "unwilling", ["eager", "able"], "He did not want to jump in. How would you describe that feeling?"],
    ["fragile", "Wrap the <b>fragile</b> glass carefully.", "easily broken", ["very heavy", "very old"], "Why would you wrap glass carefully?"],
    ["conceal", "The spy tried to <b>conceal</b> the letter in his coat.", "hide", ["show", "write"], "He put it inside his coat so that nobody could see."],
    ["vital", "Water is <b>vital</b> for all living things.", "very important", ["a little useful", "fairly tasty"], "All living things need it. How important is it?"],
    ["obstacle", "A fallen tree was an <b>obstacle</b> on the trail.", "something in the way", ["something to eat", "a path"], "A fallen tree blocks the hikers."],
    ["diligent", "The <b>diligent</b> student finished every page.", "hardworking", ["lazy", "noisy"], "Finishing every page takes steady effort."],
    ["scarce", "Food was <b>scarce</b> in the desert.", "hard to find", ["easy to find", "very tasty"], "Think about food in a desert. Is there much of it?"],
    ["hesitate", "Do not <b>hesitate</b> to ask for help.", "pause because you are unsure", ["run away", "shout"], "The sentence tells you to ask quickly, without waiting."],
    ["peculiar", "A <b>peculiar</b> smell came from the attic.", "strange", ["pleasant", "familiar"], "The word describes a smell that you did not expect."]
  ];

  const A16 = [
    L("Word roots 9", meaningG(ROOT9, ROOT9P, "root"),
      meanH("Example: the root <b>ped</b> means <b>foot</b>, as in <i>pedal</i>. Find the meaning of yours the same way."),
      [S("Roots on the move", "mort · jud · duc", "<b>mort</b> = death (immortal), <b>jud</b> = judge (judicial), <b>duc</b> = lead (introduce)."), S("More roots", "ven · press · urb", "<b>ven</b> = come (prevent), <b>press</b> = push (compress), <b>urb</b> = city (suburb)."), S("Last three", "mar · san · vac", "<b>mar</b> = sea (marine), <b>san</b> = healthy (sanitary), <b>vac</b> = empty (vacant).")]),
    L("Prefixes inter-, intra-, trans-, sub-, super- and anti-", prefG(PREF16, PREF16P),
      ["Break the word into the prefix and the rest. What does the rest of the word mean?", "Picture a real object or event the word names. How does the prefix change the base word?", "Example: <b>semicircle</b> is half of a circle, so <b>semi-</b> means half. Use your word the same way."],
      [S("Between and within", "inter- · intra-", "<b>inter-</b> means between or among (international). <b>intra-</b> means within (intramural: inside one school)."), S("Across and under", "trans- · sub-", "<b>trans-</b> means across (transport, transatlantic). <b>sub-</b> means under (subway, subzero)."), S("Above and against", "super- · anti-", "<b>super-</b> means above or beyond (supervise). <b>anti-</b> means against (antifreeze).")]),
    L("Making nouns from verbs", tyG(NOUN16.map(([t, a]) => [t, a, "", ""])),
      ["Add the ending shown in the question to the verb. Check if the last letter of the verb must change.", q => info(q.answer), "Example: <b>agree</b> + <b>-ment</b> = <b>agreement</b>, but <b>judge</b> + <b>-ment</b> may drop the e, and <b>deny</b> ➜ <b>denial</b>. Now do yours."],
      [S("Noun endings", "-ment · -al · -ure", "We make nouns from verbs with endings: <b>achieve ➜ achievement</b>, <b>refuse ➜ refusal</b>, <b>fail ➜ failure</b>."), S("Letters that drop", "argue ➜ argument", "Sometimes the silent e drops: <b>argue ➜ argument</b>, <b>expose ➜ exposure</b>."), S("-ance and -ence", "perform ➜ performance", "<b>-ance</b> and <b>-ence</b> also make nouns: <b>resist ➜ resistance</b>, <b>exist ➜ existence</b>. Say the word and check a dictionary if unsure.")]),
    L("Homophones 13", sentG(HOMO13),
      sentHints("Example: 'I will <b>wait</b> here' and 'the <b>weight</b> of a box'. Decide which meaning your sentence needs."),
      [S("Same sound", "principal · principle", "A <b>principal</b> leads a school. A <b>principle</b> is a rule you believe in. The principal is your <b>pal</b>."), S("Compliments", "complement · compliment", "A <b>compliment</b> is kind words (<b>i</b> like it). A <b>complement</b> completes something (it has <b>e</b> like complete)."), S("More pairs", "cite · site · sight", "<b>Cite</b> a source, a building <b>site</b>, and good <b>sight</b>. <b>Discreet</b> means careful; <b>discrete</b> means separate.")]),
    L("Commonly misspelled words 4", rightG(MIS16),
      misH("Example: <b>Wednesday</b> has a silent d and <b>government</b> has an n before the m. Check the middle of yours."),
      misSlides("nec·es·sar·y · sep·a·rate", "ac·com·mo·date · em·bar·rass")),
    L("Keeping the e after soft c and g", rightG(SOFT),
      ["A soft c sounds like s, and a soft g sounds like j. Think about what the letter before the ending needs.", q => `Say the word slowly. It has ${q.answer.length} letters, and the e before the ending is important.`, "Example: <b>peaceable</b> keeps its e so that the c stays soft, and <b>courageous</b> keeps the e so that the g stays soft. Check yours the same way."],
      [S("Soft c and g", "c = s · g = j", "A <b>c</b> before e, i or y sounds like <b>s</b>. A <b>g</b> before e, i or y can sound like <b>j</b>."), S("Keep the e", "notice ➜ noticeable", "When you add <b>-able</b> or <b>-ous</b> to a word that ends in <b>ce</b> or <b>ge</b>, keep the e: <b>noticeable</b>, <b>courageous</b>."), S("Why?", "ca vs ce", "Without the e, the c or g would turn hard, like in <b>cat</b> and <b>gum</b>. The e keeps the sound soft.")]),
    L("Ordinal numbers", rightG(ORD),
      ["Ordinal numbers tell the order: first, second, third. Say the number, then add -th.", q => info(q.answer), "Example: <b>five</b> ➜ <b>fifth</b> (ve changes to f) and <b>eight</b> ➜ <b>eighth</b> (only one t added). Check yours."],
      [S("Order words", "1st · 2nd · 3rd", "Ordinal numbers show the order: first, second, third, fourth... Most add <b>-th</b>."), S("Odd changes", "five ➜ fifth", "<b>five</b> ➜ <b>fifth</b>, <b>twelve</b> ➜ <b>twelfth</b>, <b>nine</b> ➜ <b>ninth</b> (the e drops)."), S("Tens", "twenty ➜ twentieth", "For tens, change the y to ie and add <b>-th</b>: <b>twentieth</b>, <b>fortieth</b>. Note: <b>forty</b> has no u, so <b>fortieth</b> has no u either.")]),
    L("Science words", rightG(SCI16),
      misH("Example: <b>hypothesis</b> starts with hypo and ends with thesis. Split long science words into parts."),
      misSlides("pho·to·syn·the·sis", "at·mos·phere · ev·ap·o·ra·tion")),
    L("Math words", rightG(MATH16),
      misH("Example: <b>diagonal</b> has dia + gon + al. Split long math words into parts."),
      misSlides("par·al·lel·o·gram", "per·pen·dic·u·lar · cir·cum·fer·ence")),
    L("Sound and picture devices", poolG(DEV, DEVP),
      ["Read the example slowly. Does it repeat a sound, copy a sound, or give a thing human actions?", "Think about the name: 'personify' hints at a person, and alliteration repeats a beginning sound.", "Example: 'The moon winked at me' gives the moon a human action, so it is not a simile or a sound word. Match yours to the right idea."],
      [S("Sound devices", "buzz · peter picked", "<b>Onomatopoeia</b> = words that sound like their meaning (buzz). <b>Alliteration</b> = repeated first sounds (Peter picked)."), S("Comparing", "like · as · is", "A <b>simile</b> uses like or as. A <b>metaphor</b> says one thing is another."), S("Big pictures", "wink · million", "<b>Personification</b> gives human actions to things. <b>Hyperbole</b> is a big exaggeration.")]),
    L("Positive or negative feeling?", feelG,
      ["Imagine someone calling you each word. Which would make you smile, and which would sting?", q => "Words can mean nearly the same but carry different feelings. Look for the one that says something " + (q.pos ? "good" : "unkind") + ".", "Example: <b>frugal</b> sounds positive, <b>cheap</b> sounds negative. Rank your words the same way."],
      [S("Feeling words", "😊 / 😠", "Words have a <b>feeling</b> (connotation) as well as a meaning."), S("Same idea", "slim · thin · scrawny", "<b>Slim</b> sounds nice, <b>thin</b> is neutral, and <b>scrawny</b> sounds unkind."), S("Choose wisely", "✍️", "Pick the word whose feeling matches what you want to say.")]),
    L("Words that travelled", loanG,
      ["English has borrowed words from many languages. Think of where the thing came from.", q => q.it[2], "Example: <b>pizza</b> and <b>pasta</b> came with foods from Italy, and <b>taco</b> came with food from Mexico. Use the thing the word names to guess where it came from."],
      [S("Borrowed words", "🌍", "English has borrowed thousands of words from other languages."), S("From far away", "algebra · sofa", "<b>Algebra</b> and <b>sofa</b> come from Arabic. <b>Cookie</b> and <b>yacht</b> come from Dutch."), S("More travellers", "tsunami · origami", "<b>Tsunami</b> and <b>origami</b> are Japanese. <b>Kindergarten</b> is German, <b>canyon</b> is Spanish, <b>kayak</b> is Inuit.")]),
    L("Words that go together", mcG(COLL),
      ["Some words are partners and sound right together. Say the sentence in your head with each choice.", "Think about the partner words you hear in real life: you make a plan, but you do homework.", "Example: we say 'take a nap' and 'make a mistake', but not 'make a nap'. Say yours with each choice."],
      [S("Word partners", "make · do · take", "English has fixed partners: <b>make</b> a mistake, <b>do</b> homework, <b>take</b> a photo."), S("Weather words", "heavy rain", "We say <b>heavy rain</b>, <b>strong wind</b> and <b>deep sleep</b>, and not the other way around."), S("Listen", "👂", "When a pair sounds wrong, trust your ear and read the sentence aloud.")]),
    L("Adding -ing: special cases", tyG(ING.map(([t, a]) => [t, a, "", ""])),
      ["Look at how the word ends. Words ending in ie, c or silent e have special rules.", q => info(q.answer), "Example: <b>lie</b> ➜ <b>lying</b> (ie becomes y), <b>mimic</b> ➜ <b>mimicking</b> (c gets a k to stay hard). Now do yours."],
      [S("ie becomes y", "die ➜ dying", "Words ending in <b>ie</b> change to <b>y</b> before -ing: <b>dying</b>, <b>lying</b>, <b>tying</b>."), S("c gets a k", "panic ➜ panicking", "Words ending in <b>c</b> add a <b>k</b> so the c stays hard: <b>panicking</b>, <b>picnicking</b>."), S("e stays", "dye ➜ dyeing", "In <b>dyeing</b>, <b>canoeing</b> and <b>agreeing</b> the e stays, so that the word does not look like another word.")]),
    L("Say it once", wordyG,
      ["Look for two words in one phrase that mean nearly the same.", "Cross out the second word. If the meaning stays exactly the same, the phrase repeats itself.", "Example: 'round circle' says <b>round</b> twice, because a circle is already round. Check your phrases the same way."],
      [S("Repeating yourself", "🔁", "Some phrases say the same thing twice. This is called being <b>redundant</b>."), S("Examples", "free gift · past history", "A gift is already free. History is already in the past."), S("Be brief", "✂️", "Cut the extra word. Short, clear writing is easier to read.")]),
    L("Proofreading 6", proofG(PROOF16),
      proofH("Example: 'She sat <b>quitely</b> at her desk' ➜ 'quitely' should be 'quietly'. Check each word like that."),
      proofSlides("📚")),
    L("Listen and spell 12", tyG(DICT16),
      dictHints("Example: 'enthusiasm' = en + thu + si + asm. Write each part, then check the whole word."),
      dictSlides("ap·pre·ci·ate", "op·por·tu·ni·ty · re·spon·si·ble")),
    L("Vocabulary in context", vocG(VOC16),
      vocabH("Example: in 'The <b>timid</b> mouse hid behind the door', the clue is <b>hid</b>, so timid means shy and easily scared."),
      vocabSlides)
  ];
  A16.push(MIX("Mixed practice", [A16[0], A16[2], A16[3], A16[5], A16[7], A16[12]]));
  A16.push(MIX("Level 16 Challenge", [A16[1], A16[4], A16[6], A16[8], A16[9], A16[10], A16[11], A16[13], A16[14], A16[15], A16[16], A16[17]]));

  // ================= LEVEL 17 =================
  const ROOT10 = [
    ["chronological", "chron", "time", "Events listed in this order go from earliest to latest."],
    ["thermometer", "therm", "heat", "You use it to measure how hot or cold something is."],
    ["symphony", "phon", "sound", "A large orchestra plays this, with many instruments sounding together."],
    ["reflect", "flect", "bend", "Light does this when it bounces back off a mirror."],
    ["complicated", "plic", "fold", "A plan with too many twists and folds is this."],
    ["position", "pos", "put", "It tells where something has been put."],
    ["tangible", "tang", "touch", "You can feel it with your hands, so it is real."],
    ["timid", "tim", "fear", "A shy rabbit that bolts at every noise is this."],
    ["voluntary", "vol", "wish", "It is something you do because you want to, not because you are told."],
    ["constellation", "stell", "star", "Orion is one of these in the night sky."]
  ];
  const ROOT10P = ["time", "heat", "sound", "bend", "fold", "put", "touch", "fear", "wish", "star"];
  const PREF17 = [["ante-", "anteroom", "before"], ["ante-", "antecedent", "before"], ["post-", "postpone", "after"], ["post-", "postscript", "after"], ["extra-", "extraordinary", "beyond"], ["extra-", "extraterrestrial", "beyond"], ["hyper-", "hyperactive", "too much"], ["hyper-", "hypersensitive", "too much"], ["hypo-", "hypothermia", "below"], ["hypo-", "hypodermic", "below"], ["micro-", "microscope", "very small"], ["micro-", "microorganism", "very small"], ["mega-", "megaphone", "very large"], ["mega-", "megabyte", "very large"]];
  const PREF17P = ["before", "after", "beyond", "too much", "below", "very small", "very large"];
  const IFY = [
    ["Make a noun from <b>simplify</b>.", "simplification"], ["Make a noun from <b>justify</b>.", "justification"], ["Make a noun from <b>notify</b>.", "notification"], ["Make a noun from <b>identify</b>.", "identification"],
    ["Make a noun from <b>purify</b>.", "purification"], ["Make a noun from <b>modify</b>.", "modification"], ["Make a noun from <b>organize</b>.", "organization"], ["Make a noun from <b>realize</b>.", "realization"],
    ["Make a noun from <b>civilize</b>.", "civilization"], ["Make a noun from <b>memorize</b>.", "memorization"], ["Make a noun from <b>classify</b>.", "classification"]
  ];
  const HOMO14 = [
    ["Nobody is ___ to run in the hall.", "allowed", ["aloud", "alowed"]], ["She read the poem ___ to the class.", "aloud", ["allowed", "alowd"]],
    ["The guitarist played a ___ of three notes.", "chord", ["cord", "cored"]], ["Plug the ___ into the wall.", "cord", ["chord", "cored"]],
    ["The bus ___ is two dollars.", "fare", ["fair", "fear"]], ["It is not ___ to cut in line.", "fair", ["fare", "fear"]],
    ["Please close the ___ behind you.", "gate", ["gait", "gaite"]], ["The horse had a smooth ___.", "gait", ["gate", "gaet"]],
    ["Squirrels ___ nuts for winter.", "hoard", ["horde", "hord"]], ["A ___ of ants marched across the picnic.", "horde", ["hoard", "hord"]],
    ["Bakers ___ the dough before it rises.", "knead", ["need", "kneed"]], ["She won a gold ___ at the meet.", "medal", ["meddle", "metal"]],
    ["Do not ___ in other people's business.", "meddle", ["medal", "metal"]], ["The spoon is made of ___.", "metal", ["medal", "meddle"]],
    ["A flag hung from the tall ___.", "pole", ["poll", "pool"]], ["The queen's ___ lasted forty years.", "reign", ["rain", "rein"]],
    ["Pull the ___ to steer the horse.", "rein", ["reign", "rain"]], ["Drive the ___ into the ground to hold the tent.", "stake", ["steak", "stack"]],
    ["I wonder ___ it will rain.", "whether", ["weather", "wether"]], ["The ___ is sunny today.", "weather", ["whether", "wether"]]
  ];
  const MIS17 = [["boundary", ["boundry", "boundery"]], ["circumstance", ["circumstence", "circumstanse"]], ["deceive", ["decieve", "deseive"]], ["diligence", ["diligance", "dilligence"]], ["eligible", ["eligable", "elegible"]], ["emphasize", ["emfasize", "emphisize"]], ["existence", ["existance", "existense"]], ["extinct", ["extint", "extinkt"]], ["fluent", ["fluant", "flewent"]], ["harmony", ["harmoney", "harmonny"]], ["hospitality", ["hospitallity", "hospitalty"]], ["intelligence", ["intelligance", "inteligence"]]];
  const HIST = [["constitution", ["constitusion", "constitutian"]], ["legislature", ["legeslature", "legislatur"]], ["democracy", ["democrasy", "democracey"]], ["amendment", ["ammendment", "amendmant"]], ["parliament", ["parliment", "parlament"]], ["citizenship", ["citizenchip", "citizinship"]], ["jurisdiction", ["jurisdition", "jurisdicton"]], ["sovereignty", ["soverignty", "sovereinty"]], ["monarchy", ["monarky", "monarchey"]], ["civilization", ["civilazation", "civilizasion"]]];
  const GEO = [["peninsula", ["penninsula", "peninsulla"]], ["archipelago", ["archipeligo", "archipelagoe"]], ["equator", ["equater", "ecuator"]], ["hemisphere", ["hemisfere", "hemispere"]], ["continent", ["continant", "contenent"]], ["latitude", ["lattitude", "latatude"]], ["longitude", ["longtitude", "longatude"]], ["plateau", ["plataeu", "plateu"]], ["tributary", ["tributery", "tributory"]], ["glacier", ["glaceir", "glacer"]], ["Mediterranean", ["Mediteranean", "Meditterranean"]], ["Antarctica", ["Antartica", "Antarctika"]]];
  const LIT = [
    ["protagonist", "The <b>protagonist</b> of the novel is a girl who wants to save her farm.", "the main character", ["the author", "the setting"], "Think about who the story follows."],
    ["antagonist", "The <b>antagonist</b> tries to stop the hero from reaching the goal.", "the character who opposes the hero", ["the hero's best friend", "the narrator"], "Think about who is against the main character."],
    ["foreshadowing", "The dark clouds at the start were <b>foreshadowing</b> of the storm to come.", "hints about what will happen later", ["a summary of the ending", "a description of the setting"], "The clouds come first, and the storm comes later."],
    ["irony", "It was <b>ironic</b> that the fire station burned down.", "the opposite of what you expect", ["exactly what you expect", "a happy ending"], "A fire station is a place that fights fires, so what happened was surprising."],
    ["setting", "The <b>setting</b> of the story is a small island in 1920.", "the time and place of a story", ["the main problem", "the last chapter"], "An island in 1920 tells you when and where."],
    ["theme", "The <b>theme</b> of the fable is that honesty is the best policy.", "the big message of a story", ["the title page", "the first sentence"], "The sentence names a lesson about life."],
    ["narrator", "The <b>narrator</b> tells us about the events as they happen.", "the voice that tells the story", ["the hero", "the cover artist"], "Who is telling us about the events?"],
    ["flashback", "The chapter is a <b>flashback</b> to the hero's childhood.", "a scene that goes back to an earlier time", ["a glimpse of the future", "a funny joke"], "Childhood happened before the story's present."],
    ["climax", "The <b>climax</b> came when the hero finally faced the dragon.", "the most exciting turning point", ["the quiet beginning", "the list of characters"], "It is the moment when the biggest problem is faced."],
    ["dialogue", "The <b>dialogue</b> between the two friends made the scene funny.", "the words that characters say to each other", ["a long description", "a rhyming poem"], "The word 'between' shows two people talking."],
    ["stanza", "The poem has four <b>stanzas</b>.", "a group of lines in a poem", ["a rhyming word", "a chapter in a novel"], "Poems are built from these, a bit like paragraphs."]
  ];
  const CHANGED = [
    ["awful", "full of awe", "very bad", ["very kind", "very small"]], ["nice", "foolish or silly", "pleasant", ["rude", "angry"]], ["broadcast", "to scatter seeds by hand", "to send out on radio or TV", ["to plant a garden", "to build a stage"]],
    ["computer", "a person who does calculations", "an electronic machine that processes information", ["a kind of calendar", "a pencil case"]], ["silly", "happy or blessed", "foolish in a playful way", ["very serious", "very tired"]],
    ["sad", "full or satisfied", "unhappy", ["hungry", "excited"]], ["villain", "a farm worker", "the bad character in a story", ["a kind farmer", "a hero's helper"]],
    ["pretty", "clever or tricky", "nice to look at", ["very loud", "slightly old"]], ["manufacture", "to make by hand", "to make in a factory", ["to repair at home", "to sell in a shop"]]
  ];
  const changedG = () => { const it = pick(CHANGED), [w, o, m, d] = it; return { text: `Long ago, the word <b>${w}</b> meant <b>${o}</b>. What does it usually mean today?`, choices: shuf([m, ...shuf(d).slice(0, 2)]), answer: m, it }; };
  const IDIOM = [
    ["bite the bullet", "to do something hard without complaining", ["to eat a quick snack", "to win a game"]], ["burn the midnight oil", "to work late into the night", ["to light a lamp", "to waste fuel"]],
    ["cut corners", "to do something in a quick, careless way", ["to build a house", "to take a shortcut home"]], ["hit the nail on the head", "to say exactly the right thing", ["to build a table", "to hurt your finger"]],
    ["let the cat out of the bag", "to tell a secret by accident", ["to buy a pet", "to clean a closet"]], ["on thin ice", "in a risky situation", ["skating well", "feeling very cold"]],
    ["a blessing in disguise", "something that seems bad but turns out good", ["a costume party", "a big surprise gift"]], ["break the ice", "to start a friendly conversation", ["to crack a frozen pond", "to cool a drink"]],
    ["once in a blue moon", "very rarely", ["every night", "on a cold evening"]], ["under the weather", "feeling a little sick", ["standing in the rain", "enjoying a storm"]],
    ["go the extra mile", "to do more than is asked", ["to run a race", "to drive far away"]], ["pull someone's leg", "to joke with someone", ["to help someone stand", "to trip someone"]]
  ];
  const idiomG = () => { const it = pick(IDIOM), [p, m, d] = it; return { text: `What does the idiom <b>${p}</b> mean?`, choices: shuf([m, ...shuf(d).slice(0, 2)]), answer: m, it }; };
  const OXY = ["jumbo shrimp", "deafening silence", "bittersweet", "open secret", "original copy", "awfully good", "act naturally", "same difference"];
  const ORDI = ["bright sunshine", "quiet library", "sweet candy", "secret door", "fresh bread", "happy dog", "soft pillow", "tall tree", "cold winter", "loud music"];
  const oxyG = () => { const a = pick(OXY); return { text: "Which phrase is an <b>oxymoron</b> (two opposite ideas together)?", choices: shuf([a, ...shuf(ORDI).slice(0, 2)]), answer: a, it: [a] }; };
  const USAGE = [
    ["She has ___ pencils than I do. (You can count them.)", "fewer", ["less", "least"]], ["I have ___ time than I need. (You cannot count it.)", "less", ["fewer", "few"]],
    ["To ___ did you give the book?", "whom", ["who", "whose"]], ["___ is knocking at the door?", "Who", ["Whom", "Whose"]],
    ["I cannot walk any ___ today.", "farther", ["further", "fartest"]], ["The prize was shared ___ the three friends.", "among", ["between", "betwixt"]],
    ["The rain will ___ our plans.", "affect", ["effect", "affection"]], ["The ___ of the storm was huge.", "effect", ["affect", "effort"]],
    ["___ jacket is this?", "Whose", ["Who's", "Whom"]], ["Do not ___ your keys.", "lose", ["loose", "lost"]], ["The knot came ___.", "loose", ["lose", "loosen"]], ["He is taller ___ his brother.", "than", ["then", "that"]]
  ];
  const ANALOG3 = [
    ["<b>Whisper</b> is to <b>shout</b> as <b>drizzle</b> is to ___.", "downpour", ["rainbow", "puddle"]], ["<b>Chapter</b> is to <b>book</b> as <b>scene</b> is to ___.", "play", ["actor", "stage"]],
    ["<b>Thermometer</b> is to <b>temperature</b> as <b>ruler</b> is to ___.", "length", ["weight", "time"]], ["<b>Kitten</b> is to <b>cat</b> as <b>cub</b> is to ___.", "bear", ["bird", "fish"]],
    ["<b>Brave</b> is to <b>cowardly</b> as <b>generous</b> is to ___.", "selfish", ["kind", "rich"]], ["<b>Pilot</b> is to <b>airplane</b> as <b>captain</b> is to ___.", "ship", ["sailor", "ocean"]],
    ["<b>Petal</b> is to <b>flower</b> as <b>page</b> is to ___.", "book", ["paper", "pen"]], ["<b>Hungry</b> is to <b>starving</b> as <b>tired</b> is to ___.", "exhausted", ["sleepy", "rested"]],
    ["<b>Seed</b> is to <b>plant</b> as <b>egg</b> is to ___.", "bird", ["nest", "shell"]], ["<b>Key</b> is to <b>lock</b> as <b>password</b> is to ___.", "account", ["letter", "computer"]]
  ];
  const LIE = [
    ["Please ___ your books on the desk.", "lay", ["lie", "lain"]], ["The cat likes to ___ in the sun.", "lie", ["lay", "laid"]], ["Yesterday I ___ the keys on the table.", "laid", ["lay", "lied"]],
    ["The sun will ___ at 6:40 tomorrow.", "rise", ["raise", "rised"]], ["Please ___ your hand if you know the answer.", "raise", ["rise", "rose"]], ["The dog is ___ on the rug.", "lying", ["laying", "lieing"]],
    ["Will you ___ me a glass of water from the kitchen?", "bring", ["take", "brung"]], ["___ your umbrella when you leave the house.", "Take", ["Bring", "Took"]], ["Please ___ the vase on the shelf.", "set", ["sit", "sat"]],
    ["I will ___ here until you return.", "sit", ["set", "sat"]], ["The bread dough will ___ in the warm kitchen.", "rise", ["raise", "rose"]]
  ];
  const PLAIN = [["utilize", "use"], ["commence", "begin"], ["terminate", "end"], ["assist", "help"], ["purchase", "buy"], ["inquire", "ask"], ["residence", "home"], ["sufficient", "enough"], ["require", "need"], ["attempt", "try"], ["obtain", "get"], ["demonstrate", "show"]];
  const PLAINP = ["use", "begin", "end", "help", "buy", "ask", "home", "enough", "need", "try", "get", "show", "sell", "stop", "wait"];
  const plainG = () => { const it = pick(PLAIN), [f, p] = it; return { text: `Which plain word means the same as the fancy word <b>${f}</b>?`, choices: shuf([p, ...shuf(PLAINP.filter(x => x !== p)).slice(0, 2)]), answer: p, it }; };
  const PROOF17 = ["Our team had a [wonderfull] season.", "She was [suprised] by the party.", "He gave a [beutiful] speech.", "The [artical] was in the newspaper.", "We will [travle] by train this summer.", "The [bussiness] opened in May.", "Wash your hands [regulary] to stay healthy.", "The [temprature] dropped overnight.", "Her [writting] improved a lot this year."];
  const DICT17 = dictG([["strategy", "The coach explained the ___."], ["suspicious", "The ___ noise woke the dog."], ["laboratory", "The scientists work in a ___."], ["financial", "The bank gave ___ advice."], ["scarcity", "A ___ of water hurt the crops."], ["explanation", "The teacher gave a clear ___."], ["tolerance", "Show ___ for other opinions."], ["jewelry", "She wore silver ___."], ["rural", "We live in a ___ area."], ["thermostat", "Turn the ___ up a little."]]);
  const VOC17 = [
    ["meticulous", "The <b>meticulous</b> artist checked every tiny detail.", "very careful about details", ["quick and careless", "loud and bold"], "She checked every tiny detail."],
    ["ambiguous", "The sign was <b>ambiguous</b>, so people read it two different ways.", "unclear, with more than one meaning", ["very colorful", "easy to read"], "People read it in two different ways."],
    ["benevolent", "The <b>benevolent</b> woman gave food to anyone who was hungry.", "kind and generous", ["cruel and mean", "shy and quiet"], "She helped hungry people."],
    ["candid", "Her <b>candid</b> answer was honest, even though it was hard to hear.", "honest and open", ["secret", "silly"], "The sentence says she was honest."],
    ["tenacious", "The <b>tenacious</b> climber would not give up.", "holding firmly to a goal", ["easily bored", "afraid of heights"], "She would not give up."],
    ["pragmatic", "A <b>pragmatic</b> plan solves a problem with simple, useful steps.", "practical", ["dreamy", "dangerous"], "The plan uses simple, useful steps."],
    ["ephemeral", "A rainbow is <b>ephemeral</b>: it fades after a few minutes.", "lasting a very short time", ["lasting forever", "very colorful"], "It fades after a few minutes."],
    ["eloquent", "The <b>eloquent</b> speaker moved the crowd with her clear, powerful words.", "speaking clearly and well", ["speaking very softly", "speaking too fast"], "Her words were clear and powerful."],
    ["skeptical", "I was <b>skeptical</b> about the claim until I saw the proof.", "doubtful", ["certain", "excited"], "She needed proof first."],
    ["resilient", "A <b>resilient</b> player bounces back after a loss.", "able to recover quickly", ["easily broken", "very tall"], "The player bounces back."]
  ];

  const A17 = [
    L("Word roots 10", meaningG(ROOT10, ROOT10P, "root"),
      meanH("Example: the root <b>aud</b> means <b>hear</b>, as in <i>audience</i>. Find the meaning of yours the same way."),
      [S("Time and heat", "chron · therm", "<b>chron</b> = time (chronological), <b>therm</b> = heat (thermometer)."), S("Sound and bend", "phon · flect · plic", "<b>phon</b> = sound (symphony), <b>flect</b> = bend (reflect), <b>plic</b> = fold (complicated)."), S("More roots", "pos · tang · tim · vol · stell", "<b>pos</b> = put, <b>tang</b> = touch, <b>tim</b> = fear, <b>vol</b> = wish, <b>stell</b> = star.")]),
    L("Prefixes ante-, post-, extra-, hyper-, hypo-, micro- and mega-", prefG(PREF17, PREF17P),
      ["Break the word into the prefix and the rest. What does the rest of the word mean?", "Picture the real thing the word names, and how the prefix changes the base word.", "Example: <b>transport</b> carries things across, so <b>trans-</b> means across. Use the prefix in your word the same way."],
      [S("Time and place", "ante- · post-", "<b>ante-</b> means before (anteroom). <b>post-</b> means after (postpone, postscript)."), S("Beyond, over, under", "extra- · hyper- · hypo-", "<b>extra-</b> means beyond (extraordinary). <b>hyper-</b> means too much (hyperactive). <b>hypo-</b> means below (hypothermia)."), S("Small and large", "micro- · mega-", "<b>micro-</b> means very small (microscope). <b>mega-</b> means very large (megaphone).")]),
    L("Nouns ending in -ification and -ization", tyG(IFY.map(([t, a]) => [t, a, "", ""])),
      ["Verbs ending in -ify become -ification, and verbs ending in -ize become -ization. Which ending does yours have?", q => info(q.answer), "Example: <b>beautify</b> ➜ <b>beautification</b> and <b>colonize</b> ➜ <b>colonization</b>. Now do yours."],
      [S("-ify ➜ -ification", "simplify", "Change the <b>y</b> to <b>i</b>, then add <b>-fication</b>: <b>simplify ➜ simplification</b>."), S("-ize ➜ -ization", "organize", "Drop the final e, then add <b>-ation</b>: <b>organize ➜ organization</b>."), S("Say it", "🗣️", "Say the new noun slowly. It has a long ending, so spell it in parts.")]),
    L("Homophones 14", sentG(HOMO14),
      sentHints("Example: 'I will <b>wait</b> here' and 'the <b>weight</b> of a box'. Decide which meaning your sentence needs."),
      [S("Sound-alikes", "chord · cord", "A <b>chord</b> is notes played together. A <b>cord</b> is a rope or cable."), S("Fair and fare", "fare · fair · gait · gate", "A bus <b>fare</b> costs money. A <b>fair</b> day is good. A <b>gait</b> is how you walk; a <b>gate</b> is a door in a fence."), S("More", "reign · rein · whether · weather", "A queen's <b>reign</b>, a horse's <b>rein</b>, <b>whether</b> (if) and <b>weather</b> (rain or sun).")]),
    L("Commonly misspelled words 5", rightG(MIS17),
      misH("Example: <b>Wednesday</b> has a silent d and <b>government</b> has an n before the m. Check the middle of yours."),
      misSlides("ac·quain·tance · dis·as·trous", "ques·tion·naire · sched·ule")),
    L("History and government words", rightG(HIST),
      misH("Example: <b>election</b> = e + lec + tion. Split long civics words into parts."),
      misSlides("con·sti·tu·tion · de·moc·ra·cy", "leg·is·la·ture · sov·er·eign·ty")),
    L("Geography words", rightG(GEO),
      misH("Example: <b>mountain</b> = moun + tain. Split long geography words into parts."),
      misSlides("pen·in·su·la · ar·chi·pel·a·go", "lat·i·tude · lon·gi·tude")),
    L("Words for stories and poems", vocG(LIT),
      vocabH("Example: the <b>villain</b> is the bad character in a story. Use clues in the sentence to find yours."),
      [S("Characters", "protagonist · antagonist", "The <b>protagonist</b> is the main character. The <b>antagonist</b> works against the hero."), S("The shape of a story", "plot · climax · flashback", "The <b>climax</b> is the most exciting turn. A <b>flashback</b> goes back in time."), S("Meaning and style", "theme · irony · stanza", "The <b>theme</b> is the big message. <b>Irony</b> is the opposite of what you expect. A <b>stanza</b> is a group of lines in a poem.")]),
    L("Words that changed meaning", changedG,
      ["Think about the old meaning. How could that idea grow into a new meaning?", "The new meaning is often different from the old meaning. Be careful of choices that repeat the old idea.", "Example: <b>nervous</b> once meant 'strong', but now it means 'worried'. Use the old meaning to find how the change happened."],
      [S("Words change", "🔄", "Word meanings slowly change over hundreds of years."), S("Surprises", "awful · nice · silly", "<b>Awful</b> once meant full of awe. <b>Nice</b> once meant foolish. <b>Silly</b> once meant happy."), S("Everyday things", "broadcast · computer", "<b>Broadcast</b> was scattering seeds. A <b>computer</b> was a person who did calculations.")]),
    L("Idioms 3", idiomG,
      ["An idiom does not mean what the words say. Think about the picture, then about what it could stand for.", "Use the situation: when would a person say this?", "Example: 'spill the beans' is not about food. It means to tell a secret. Do yours the same way."],
      [S("Not literal", "🧊", "An <b>idiom</b> is a phrase whose meaning is different from its words."), S("Examples", "bite the bullet", "<b>Bite the bullet</b> means to do something hard without complaining. <b>Break the ice</b> means to start a friendly chat."), S("Use them", "✍️", "Idioms make writing lively, but do not use too many in one place.")]),
    L("Oxymorons", oxyG,
      ["An oxymoron puts two opposite ideas together in two words.", "Check each phrase. Do the two words pull in opposite directions?", "Example: 'friendly fire' joins two opposite ideas, but 'sunny day' does not. Test yours the same way."],
      [S("Opposite pair", "jumbo shrimp", "A <b>shrimp</b> is small and <b>jumbo</b> is large. The two words clash on purpose."), S("More", "deafening silence", "<b>Deafening</b> means very loud, and <b>silence</b> means no sound. That is an oxymoron."), S("Why use them?", "✨", "Writers use oxymorons to make you stop and think.")]),
    L("Fewer or less? Who or whom?", sentG(USAGE),
      ["Read the sentence and think about what the word must do in it.", "Use the small rules: <i>fewer</i> for things you can count, <i>whom</i> for the receiver of an action, <i>affect</i> is an action word.", "Example: 'I have <b>fewer</b> apples' (you can count apples), but 'I have <b>less</b> juice' (you cannot count juice). Use the same test."],
      [S("Count it?", "fewer · less", "Use <b>fewer</b> for things you can count and <b>less</b> for things you cannot."), S("Who or whom?", "who · whom", "<b>Who</b> does the action. <b>Whom</b> receives it: 'To <b>whom</b> did you give it?'"), S("More", "affect · effect · lose · loose", "<b>Affect</b> is a verb, <b>effect</b> is a noun. <b>Lose</b> has one o (lost); <b>loose</b> has two (not tight).")]),
    L("Word analogies 3", mcG(ANALOG3),
      ["An analogy has two pairs. First find how the first two words are linked.", "Say the link in a sentence, like 'A ___ is part of a ___', and use the same link for the second pair.", "Example: <b>Hand</b> is to <b>glove</b> as <b>foot</b> is to <b>sock</b>, because both are worn on the part. Find your link the same way."],
      [S("Two pairs", "A : B :: C : ?", "Find the link between the first two words. The last pair has the same link."), S("Common links", "part · tool · degree", "Part and whole, tool and job, opposites, young and grown-up, and weak and strong."), S("Check it", "✅", "Say the full sentence. If your link works for both pairs, you have the answer.")]),
    L("Lie or lay? Rise or raise?", sentG(LIE),
      ["Ask: does the action need an object, like something that gets put somewhere? Or does the subject do it alone?", "<i>Lay</i>, <i>raise</i>, <i>set</i> and <i>bring</i> act on something. <i>Lie</i>, <i>rise</i> and <i>sit</i> do not.", "Example: 'I <b>raise</b> a flag' (the flag is acted on) but 'The sun will <b>rise</b>' (it acts alone). Test yours."],
      [S("Needs an object", "lay · raise · set", "<b>Lay</b>, <b>raise</b> and <b>set</b> need an object: you lay a book, raise a flag, set a vase."), S("Acts alone", "lie · rise · sit", "<b>Lie</b>, <b>rise</b> and <b>sit</b> need no object: a cat <b>lies</b>, the sun <b>rises</b>."), S("Bring or take", "➡️ / ⬅️", "<b>Bring</b> carries something toward you. <b>Take</b> carries it away from you.")]),
    L("Plain words for fancy words", plainG,
      ["The fancy word is long. Think of a short, everyday word that means the same.", "Imagine telling the idea to a friend. What word would you use?", "Example: <b>discover</b> ➜ <b>find</b>, <b>assemble</b> ➜ <b>put together</b>. Do yours the same way."],
      [S("Fancy and plain", "utilize ➜ use", "Many long words have short, plain partners: <b>utilize ➜ use</b>, <b>commence ➜ begin</b>."), S("Why plain?", "👀", "Short words are clearer. Use fancy words only when they say it better."), S("More pairs", "purchase · require", "<b>Purchase ➜ buy</b>, <b>require ➜ need</b>, <b>assist ➜ help</b>.")]),
    L("Proofreading 7", proofG(PROOF17),
      proofH("Example: 'The <b>libary</b> opens at nine' ➜ 'libary' should be 'library'. Check each word like that."),
      proofSlides("📖")),
    L("Listen and spell 13", tyG(DICT17),
      dictHints("Example: 'enthusiasm' = en + thu + si + asm. Write each part, then check the whole word."),
      dictSlides("fa·mil·iar · lab·o·ra·to·ry", "fi·nan·cial · jew·el·ry")),
    L("Advanced vocabulary", vocG(VOC17),
      vocabH("Example: in 'The <b>timid</b> mouse hid behind the door', the clue is <b>hid</b>, so timid means shy and easily scared."),
      vocabSlides)
  ];
  A17.push(MIX("Mixed practice", [A17[0], A17[2], A17[3], A17[5], A17[8], A17[13]]));
  A17.push(MIX("Level 17 Challenge", [A17[1], A17[4], A17[6], A17[7], A17[9], A17[10], A17[11], A17[12], A17[14], A17[15], A17[16], A17[17]]));

  // ================= LEVEL 18 =================
  const ROOT11 = [
    ["survive", "viv", "live", "A plant that lives through a harsh winter does this."],
    ["graduate", "grad", "step", "You move up one step, from one level of school to the next."],
    ["maternal", "mater", "mother", "It describes love or care that comes from a mom."],
    ["terminate", "termin", "end", "To bring something to a stop."],
    ["magnify", "magn", "large", "A hand lens does this to a tiny bug."],
    ["liberty", "liber", "free", "The Statue of Liberty stands for this."],
    ["annual", "ann", "year", "A fair that happens once every year is this."],
    ["linguist", "lingu", "language", "She studies how people speak and write."],
    ["population", "popul", "people", "It is the number of people who live in a city."]
  ];
  const ROOT11P = ["live", "step", "mother", "end", "large", "free", "year", "language", "people"];
  const GREEK3 = [["pseudo-", "pseudonym", "false"], ["pseudo-", "pseudoscience", "false"], ["paleo-", "paleontology", "ancient"], ["paleo-", "Paleolithic", "ancient"], ["eco-", "ecology", "home"], ["eco-", "ecosystem", "home"], ["dys-", "dyslexia", "bad or difficult"], ["dys-", "dysfunction", "bad or difficult"], ["eu-", "euphoria", "good"], ["eu-", "euphemism", "good"], ["an-", "anonymous", "without"], ["an-", "anarchy", "without"]];
  const GREEK3P = ["false", "ancient", "home", "bad or difficult", "good", "without"];
  const ICAL = [
    ["The country's ___ growth was strong this year.", "economic", ["economical", "economy"]], ["A small car is an ___ choice because it saves fuel.", "economical", ["economic", "economy"]],
    ["The moon landing was a ___ event.", "historic", ["historical", "history"]], ["She read a ___ novel set in the 1800s.", "historical", ["historic", "history"]],
    ["The ___ guitar needs to be plugged in.", "electric", ["electrical", "electron"]], ["An ___ engineer designs wiring systems.", "electrical", ["electric", "electron"]],
    ["Mozart wrote ___ music.", "classical", ["classic", "classes"]], ["That film is a ___ that people still love.", "classic", ["classical", "class"]],
    ["The newspaper has a ___ strip on the last page.", "comic", ["comical", "comedy"]], ["The puppy's wobbly walk looked ___.", "comical", ["comic", "comedy"]]
  ];
  const HOMO15 = [
    ["The stars came out at ___.", "night", ["knight", "nite"]], ["The ___ wore shiny armor in the story.", "knight", ["night", "nite"]],
    ["The athlete flexed a strong ___.", "muscle", ["mussel", "mussle"]], ["A ___ is a shellfish.", "mussel", ["muscle", "mussle"]],
    ["The library book is ___ on Friday.", "due", ["dew", "do"]], ["Morning ___ sparkled on the grass.", "dew", ["due", "do"]],
    ["Use ___ to bake bread.", "flour", ["flower", "floor"]], ["A rose is a ___.", "flower", ["flour", "floor"]],
    ["The usher led us down the ___.", "aisle", ["isle", "I'll"]], ["A small ___ lay in the sea.", "isle", ["aisle", "I'll"]],
    ["The company made a big ___ this year.", "profit", ["prophet", "profet"]], ["Her ___ in the play is the queen.", "role", ["roll", "rowl"]],
    ["Butter your ___ before you eat it.", "roll", ["role", "rowl"]], ["Wear a belt around your ___.", "waist", ["waste", "wasted"]],
    ["Do not ___ food.", "waste", ["waist", "wast"]], ["The king sat on his ___.", "throne", ["thrown", "throan"]],
    ["The ball was ___ over the fence.", "thrown", ["throne", "throan"]], ["We waded in the shallow ___.", "creek", ["creak", "crick"]],
    ["The old door began to ___.", "creak", ["creek", "crick"]], ["The paper ___ glided across the room.", "plane", ["plain", "plan"]],
    ["He wore a ___ white shirt.", "plain", ["plane", "plan"]], ["A ___ carries blood back to the heart.", "vein", ["vain", "vane"]],
    ["The weather ___ shows which way the wind blows.", "vane", ["vain", "vein"]], ["They booked a ___ on the top floor.", "suite", ["sweet", "suit"]], ["The cake was very ___.", "sweet", ["suite", "suit"]]
  ];
  const MIS18 = [["memorable", ["memorible", "memmorable"]], ["necessity", ["necesity", "neccesity"]], ["obedient", ["obediant", "obedeint"]], ["preference", ["preferance", "prefrence"]], ["prescription", ["perscription", "prescripsion"]], ["punctuation", ["puntuation", "punctation"]], ["resemble", ["resamble", "resemmble"]], ["rebellious", ["rebelious", "rebellius"]], ["strategy", ["stratagy", "stratigy"]], ["terrific", ["terriffic", "terific"]], ["triumph", ["triumf", "trimuph"]]];
  const TECH = [["algorithm", ["algorythm", "algorithem"]], ["encryption", ["encription", "enkryption"]], ["bandwidth", ["bandwith", "bandwidht"]], ["database", ["datebase", "databace"]], ["browser", ["browzer", "browsar"]], ["firewall", ["firewal", "fireawll"]], ["interface", ["interfase", "interfece"]], ["cybersecurity", ["cybersecuirty", "sybersecurity"]], ["hyperlink", ["hyperlynk", "hiperlink"]], ["processor", ["proccessor", "processer"]]];
  const BIZ = [["entrepreneur", ["enterpreneur", "entreprenuer"]], ["budget", ["budjet", "buget"]], ["investment", ["investmant", "invesment"]], ["inflation", ["inflasion", "infaltion"]], ["customer", ["costumer", "custommer"]], ["salary", ["salery", "sallary"]], ["receipt", ["reciept", "receit"]], ["commission", ["comission", "commision"]], ["currency", ["currancy", "curency"]], ["bankruptcy", ["bankrupcy", "bankruptsy"]], ["negotiate", ["negociate", "negotiete"]], ["accountant", ["accountent", "acountant"]]];
  const FRENCH = [["bouquet", ["bouket", "bouqet"]], ["souvenir", ["suvenir", "souvineer"]], ["rendezvous", ["rendevous", "rondezvous"]], ["chauffeur", ["chauffer", "shofur"]], ["boutique", ["butique", "boutiqe"]], ["croissant", ["croisant", "crossaint"]], ["genre", ["jenre", "genere"]], ["bureau", ["burow", "bureu"]], ["etiquette", ["etiquete", "ettiquette"]], ["critique", ["critiq", "critic'"]]];
  const HYPER = [
    ["I'm so hungry I could eat a horse.", ["I am hungry after the long hike.", "Lunch is at noon today."]], ["This bag weighs a ton.", ["This bag weighs five pounds.", "I carried the bag to the car."]],
    ["I've waited here forever.", ["I waited here for ten minutes.", "The bus was late today."]], ["She runs faster than the speed of light.", ["She runs very fast for her age.", "She won the race by two seconds."]],
    ["It's so hot the sidewalk could fry an egg.", ["It is hot today, about 95 degrees.", "We drank cold water at lunch."]], ["My brother's room is a thousand miles of mess.", ["My brother's room is messy.", "My brother cleaned his room."]],
    ["I have a mountain of homework.", ["I have two pages of homework.", "Homework is due on Friday."]], ["The line was longer than the Great Wall.", ["The line had about thirty people.", "The line moved slowly."]]
  ];
  const hyperG = () => { const it = pick(HYPER), [h, o] = it; return { text: "Which sentence is an <b>exaggeration</b> (hyperbole)?", choices: shuf([h, ...o]), answer: h, it }; };
  const STRESS = [
    ["Add <b>-ing</b> to <b>begin</b>.", "beginning"], ["Add <b>-ing</b> to <b>refer</b>.", "referring"], ["Add <b>-ing</b> to <b>prefer</b>.", "preferring"], ["Add <b>-ing</b> to <b>visit</b>.", "visiting"],
    ["Add <b>-ing</b> to <b>admit</b>.", "admitting"], ["Add <b>-ing</b> to <b>open</b>.", "opening"], ["Add <b>-ed</b> to <b>occur</b>.", "occurred"], ["Add <b>-ing</b> to <b>forget</b>.", "forgetting"],
    ["Add <b>-ing</b> to <b>listen</b>.", "listening"], ["Add <b>-ed</b> to <b>regret</b>.", "regretted"], ["Add <b>-ing</b> to <b>control</b>.", "controlling"], ["Add <b>-ing</b> to <b>limit</b>.", "limiting"]
  ];
  const COMPADJ = [
    ["a well known author", ["a brave author", "an old author"]], ["a ten year old girl", ["a happy little girl", "a clever girl"]],
    ["a five course meal", ["a tasty meal", "a big meal"]], ["a two week trip", ["a long trip", "a fun trip"]],
    ["a six foot fence", ["a tall fence", "a wooden fence"]], ["a high quality photo", ["a clear photo", "a bright photo"]],
    ["a part time job", ["a new job", "a summer job"]], ["a hard working team", ["a happy team", "a winning team"]]
  ];
  const hyphG = () => { const it = pick(COMPADJ), [n, o] = it; return { text: "Which phrase needs <b>hyphens</b> to join its describing words?", choices: shuf([n, ...o]), answer: n, it }; };
  const ORIGIN = [
    ["Which word comes from old words meaning 'bad star'? People once blamed the stars for bad luck.", "disaster", ["distance", "display"]],
    ["Which word comes from a Latin word meaning 'little mouse'? A flexing arm looked like one moving under the skin.", "muscle", ["muscat", "mustache"]],
    ["Which word comes from an Italian phrase for 'forty days'?", "quarantine", ["quartet", "quarter"]],
    ["Which word comes from Latin words for 'with bread', the people you share meals with?", "companion", ["compass", "complete"]],
    ["Which word comes from Latin for 'shining white', because in Rome people who sought office wore white robes?", "candidate", ["calendar", "captain"]],
    ["Which word comes from Latin for 'not able to speak'?", "infant", ["inflate", "infinite"]],
    ["Which word comes from Latin for 'left'? Left was once seen as unlucky.", "sinister", ["sincere", "signal"]],
    ["Which word is made from the names of the first two Greek letters?", "alphabet", ["almanac", "algebra"]],
    ["Which word began as 'bone fire'?", "bonfire", ["bondage", "bonus"]],
    ["Which flower name began as 'day's eye', because the flower opens in the morning?", "daisy", ["dairy", "dazzle"]]
  ];
  const BEEQ = [
    ["Spell the word: a person who is careful and wants to do things right (c______________).", "conscientious"], ["Spell the word: an illness of the lungs (p________).", "pneumonia"],
    ["Spell the word: an animal that eats only plants (h________).", "herbivore"],
    ["Spell the word: a person who fills prescriptions at a drugstore (p________).", "pharmacist"], ["Spell the word: a person who plays the piano (p______).", "pianist"],
    ["Spell the word: the bones that hold up your body (s________).", "skeleton"],
    ["Spell the word: a vehicle that takes sick people to the hospital (a_________).", "ambulance"], ["Spell the word: able to be believed (c________).", "credible"],
    ["Spell the word: a huge storm with very strong winds (h________).", "hurricane"], ["Spell the word: the tool a doctor uses to listen to your heart (s___________).", "stethoscope"]
  ];
  const CLOSE = [
    ["gregarious", "sociable", ["shy", "greedy"], "Think about someone who loves company."], ["lethargic", "sluggish", ["lively", "angry"], "Think about how you feel when you have no energy."],
    ["obsolete", "out of date", ["brand new", "very large"], "Think about an old phone nobody uses."], ["prudent", "wise and careful", ["foolish", "noisy"], "Think about someone who looks before leaping."],
    ["verbose", "using too many words", ["using very few words", "speaking quietly"], "Think about a person who talks and talks."], ["adamant", "firm and unwilling to change", ["flexible", "frightened"], "Think about someone who will not budge."],
    ["arduous", "difficult and tiring", ["easy and quick", "short and sweet"], "Think about climbing a very steep mountain."], ["tranquil", "calm and peaceful", ["stormy", "crowded"], "Think about a quiet lake at dawn."]
  ];
  const closeG = () => { const it = pick(CLOSE), [w, m, d, c] = it; return { text: `Which choice is closest in meaning to <b>${w}</b>?`, choices: shuf([m, ...shuf(d).slice(0, 2)]), answer: m, it }; };
  const PUNCT = [
    ["She needs three things for the trip <b>___</b> a hat, a map and water.", "colon"], ["The rain stopped <b>___</b> we went outside.", "semicolon"],
    ["When the bell rang <b>___</b> everyone ran to the door.", "comma"], ["I like soccer <b>___</b> my sister prefers swimming.", "semicolon"],
    ["After dinner <b>___</b> we washed the dishes.", "comma"], ["He had one goal <b>___</b> to win the spelling bee.", "colon"],
    ["My sister is tall <b>___</b> I am short.", "semicolon"], ["If you finish early <b>___</b> please read a book.", "comma"]
  ];
  const MOOD = [
    ["The fog crept over the empty street, and every window was dark.", "eerie", ["cheerful", "playful"]], ["Balloons floated above the room as everyone sang and laughed.", "joyful", ["gloomy", "tense"]],
    ["The clock ticked loudly as she waited for the test results.", "tense", ["relaxed", "silly"]], ["He looked at the old photo and sighed softly, missing the summers of his childhood.", "nostalgic", ["furious", "bored"]],
    ["Gray rain fell all day, and nobody felt like talking.", "gloomy", ["lively", "excited"]], ["The lake was still, and the quiet evening settled over the camp.", "peaceful", ["frantic", "angry"]],
    ["The crowd roared as the runner crossed the finish line first.", "triumphant", ["sorrowful", "puzzled"]], ["Footsteps echoed behind her in the dark hallway.", "suspenseful", ["comforting", "funny"]]
  ];
  const PROOF18 = ["The [experament] failed at first.", "He is [responsable] for the class pet.", "The [adress] is on the envelope.", "A [rediculous] hat sat on his head.", "The [excercise] class starts at nine.", "He wore a [costum] to the fair.", "The [definate] answer is no.", "She felt [confidant] that she would win the race.", "My [favorit] subject is science."];
  const DICT18 = dictG([["consequence", "Every choice has a ___."], ["controversy", "The new rule caused a ___ in town."], ["fundamental", "Reading is a ___ skill."], ["inevitable", "Sunrise after night is ___."], ["proficient", "She is ___ in three languages."], ["nuisance", "A buzzing fly is a ___."], ["approximately", "The trip takes ___ two hours."], ["prominent", "A ___ sign hung over the door."], ["sophisticated", "The robot has a ___ design."], ["spontaneous", "The song was a ___ performance."]]);

  const A18 = [
    L("Word roots 11", meaningG(ROOT11, ROOT11P, "root"),
      meanH("Example: the root <b>aud</b> means <b>hear</b>, as in <i>audience</i>. Find the meaning of yours the same way."),
      [S("Life and steps", "viv · grad", "<b>viv</b> = live (survive), <b>grad</b> = step (graduate)."), S("Family and ending", "mater · termin · magn", "<b>mater</b> = mother (maternal), <b>termin</b> = end (terminate), <b>magn</b> = large (magnify)."), S("Free, year, tongue, people", "liber · ann · lingu · popul", "<b>liber</b> = free (liberty), <b>ann</b> = year (annual), <b>lingu</b> = language (linguist), <b>popul</b> = people (population).")]),
    L("Greek word parts 3", prefG(GREEK3, GREEK3P),
      ["Break the word into the Greek part and the rest. What does the rest of the word mean?", "Think of a real situation where the word is used. How does the word part change it?", "Example: <b>monologue</b> is one person speaking, so <b>mono-</b> means one. Use the word part in your word the same way."],
      [S("False and old", "pseudo- · paleo-", "<b>pseudo-</b> means false (pseudonym, a made-up name). <b>paleo-</b> means ancient (paleontology)."), S("Home, bad, good", "eco- · dys- · eu-", "<b>eco-</b> means home (ecology). <b>dys-</b> means bad or difficult (dyslexia). <b>eu-</b> means good (euphoria)."), S("Without", "an-", "<b>an-</b> means without: <b>anonymous</b> (without a name) and <b>anarchy</b> (without a ruler).")]),
    L("-ic or -ical?", sentG(ICAL),
      sentHints("Example: a <b>magic</b> trick, but a <b>magical</b> evening. Check what each word means."),
      [S("Same root", "econom-", "<b>Economic</b> is about money and trade. <b>Economical</b> means not wasting money."), S("Historic or historical?", "history", "<b>Historic</b> means important in history. <b>Historical</b> means about the past."), S("More pairs", "classic · classical · comic · comical", "<b>Classic</b> means the best of its kind; <b>classical</b> is about ancient Greece or Rome, or music. <b>Comic</b> is about comedy; <b>comical</b> means funny.")]),
    L("Homophones 15", sentG(HOMO15),
      sentHints("Example: 'I will <b>wait</b> here' and 'the <b>weight</b> of a box'. Decide which meaning your sentence needs."),
      [S("Sound-alikes", "night · knight", "<b>Night</b> is when it is dark. A <b>knight</b> wore armor. The k is silent."), S("Body and stuff", "muscle · mussel · waist · waste", "A <b>muscle</b> moves you and a <b>mussel</b> is a shellfish. Your <b>waist</b> is by your belt; to <b>waste</b> is to use badly."), S("More", "plane · plain · vein · vane", "A <b>plane</b> flies. <b>Plain</b> means simple. A <b>vein</b> carries blood and a weather <b>vane</b> points to the wind.")]),
    L("Commonly misspelled words 6", rightG(MIS18),
      misH("Example: <b>Wednesday</b> has a silent d and <b>government</b> has an n before the m. Check the middle of yours."),
      misSlides("oc·ca·sion·al·ly · main·te·nance", "mil·len·ni·um · play·wright")),
    L("Computer words", rightG(TECH),
      misH("Example: <b>keyboard</b> = key + board. Split computer words into parts."),
      misSlides("al·go·rithm · en·cryp·tion", "band·width · cy·ber·se·cu·ri·ty")),
    L("Money and business words", rightG(BIZ),
      misH("Example: <b>profit</b> = pro + fit. Split business words into parts."),
      misSlides("en·tre·pre·neur · bank·rupt·cy", "re·ceipt (silent p) · ne·go·ti·ate")),
    L("Words with French spellings", rightG(FRENCH),
      ["Many English words came from French and kept their French spelling. Look for unusual letter groups.", q => info(q.answer), "Example: <b>ballet</b> ends with 'et' but sounds like 'ay'. Look for French spellings that do not match the sound."],
      [S("French spellings", "🇫🇷", "English borrowed many words from French and kept the spelling."), S("Strange endings", "bouquet · ballet", "French words often end with silent letters: <b>bouquet</b> (et sounds like ay), <b>ballet</b>, <b>genre</b>."), S("Odd letters", "rendezvous · chauffeur", "<b>Rendezvous</b> ends with silent letters. <b>Chauffeur</b> has 'ch' that sounds like 'sh'.")]),
    L("Exaggeration", hyperG,
      ["An exaggeration says something is much bigger, faster or more than it really is.", "Check which sentence could not really be true. That one is the exaggeration.", "Example: 'I'm so tired I could sleep for a year' cannot really happen, so it is an exaggeration. Test yours the same way."],
      [S("Hyperbole", "🌊", "<b>Hyperbole</b> is a big exaggeration used for effect."), S("Not literal", "a ton · forever", "'This bag weighs a ton' or 'I waited forever' are not meant to be exact."), S("Use it well", "✨", "Use hyperbole to be funny or dramatic, but not in a science report.")]),
    L("Doubling the last letter", tyG(STRESS.map(([t, a]) => [t, a, "", ""])),
      ["Look at the last syllable of the base word. Is it the stressed (strong) one?", q => info(q.answer), "Example: <b>admit</b> ➜ <b>admitting</b> (the stress is on mit, so the t doubles), but <b>visit</b> ➜ <b>visiting</b> (the stress is on vis, so no doubling). Now do yours."],
      [S("Stress rule", "be·GIN", "Double the last consonant when the stress is on the last syllable: <b>begin ➜ beginning</b>."), S("No stress, no doubling", "VIS·it", "If the stress is on the first syllable, do not double: <b>visit ➜ visiting</b>, <b>open ➜ opening</b>."), S("Check", "👂", "Say the word aloud and hear which syllable is louder.")]),
    L("Hyphens in describing words", hyphG,
      ["Look at the words right before the noun. Do two or more of them work together as one describing idea?", "Join words with hyphens when together they describe the noun. Words that each describe the noun alone do not need hyphens.", "Example: 'a fast moving train' needs 'fast-moving' because the two words work as a team, but 'a big red train' needs no hyphen. Test yours."],
      [S("One idea", "well-known author", "When several words work together as one describing word before a noun, join them with hyphens."), S("Not plural", "a two-week trip", "In these phrases the number word stays singular: <b>two-week</b>, not two-weeks."), S("After the noun", "The trip was two weeks long.", "When the words come after the noun, you usually do not need hyphens.")]),
    L("Surprising word origins", mcG(ORIGIN),
      ["Read the clue about where the word came from. What does that old idea link to?", "Use the old meaning. A word often still carries a bit of its story today.", "Example: <b>sandwich</b> comes from a person called the Earl of Sandwich. Your word's story gives you its clue the same way."],
      [S("Word stories", "📜", "Many words began as something quite different. The story is called the word's <b>origin</b>."), S("Examples", "muscle · disaster", "<b>Muscle</b> means 'little mouse'. <b>Disaster</b> means 'bad star'."), S("More", "alphabet · daisy", "<b>Alphabet</b> comes from alpha and beta. <b>Daisy</b> comes from 'day's eye'.")]),
    L("Spelling bee words", tyG(BEEQ.map(([t, a]) => [t, a, "", ""])),
      ["Read the clue, think of the word, then spell it in parts.", q => info(q.answer) + " Say it in parts and write each one.", "Example: 'a place to see paintings' ➜ <b>museum</b> = mu + se + um. Spell yours in parts too."],
      [S("Spelling bee tips", "🐝", "Listen, say the word, then spell it out in parts."), S("Break it up", "con·sci·en·tious", "Cut long words into syllables and write one at a time."), S("Check", "✅", "Say it again. Do all the parts appear in what you wrote?")]),
    L("Proofreading 8", proofG(PROOF18),
      proofH("Example: 'It was a <b>wierd</b> sound' ➜ 'wierd' should be 'weird'. Check each word like that."),
      proofSlides("🧐")),
    L("Listen and spell 14", tyG(DICT18),
      dictHints("Example: 'enthusiasm' = en + thu + si + asm. Write each part, then check the whole word."),
      dictSlides("con·se·quence · con·tro·ver·sy", "phe·nom·e·non · so·phis·ti·cat·ed")),
    L("Closest meaning", closeG,
      ["Think about a time you could use the word, then look for the choice that fits.", q => q.it[3], "Example: <b>frigid</b> ➜ very cold, because 'frigid air' makes you shiver. Do yours the same way."],
      [S("Same idea", "≈", "Words with nearly the same meaning are called <b>synonyms</b>."), S("Test it", "🧪", "Put each choice into a sentence in place of the word. It should still make sense."), S("Learn it", "📘", "Learn new words by using them in your own sentences.")]),
    L("Commas, colons and semicolons", poolG(PUNCT.map(([t, a]) => ["Which mark belongs in the gap? " + t, a]), ["comma", "colon", "semicolon"]),
      ["Read the sentence. Does the missing mark come before a list or explanation, join two full thoughts, or follow a starting phrase?", "A <b>colon</b> introduces a list or an explanation, a <b>semicolon</b> joins two full sentences, and a <b>comma</b> follows a starting phrase.", "Example: 'Pack these: a coat, a hat.' (colon), 'It rained; we stayed in.' (semicolon), 'After lunch, we left.' (comma). Match yours."],
      [S("Colon", ": introduces", "A <b>colon</b> introduces a list or an explanation: 'You need three things: a pen, a pad and a book.'"), S("Semicolon", "; joins", "A <b>semicolon</b> joins two complete thoughts that belong together: 'I like soccer; my sister likes swimming.'"), S("Comma", ", pauses", "A <b>comma</b> follows an opening phrase: 'After dinner, we washed the dishes.'")]),
    L("Mood words", mcG(MOOD),
      ["Picture the scene. How would you feel standing in it?", "Look for words in the sentence that set a feeling, like dark, laughed, ticked, or echoed.", "Example: 'Candles flickered as the wind howled in the empty hall' sounds <b>spooky</b>. Find the feeling for yours the same way."],
      [S("Mood", "🎭", "The <b>mood</b> of a text is the feeling it gives the reader."), S("Clue words", "dark · laughed · echoed", "Details such as dark, laughed or echoed point to the mood."), S("Match", "✅", "Choose the mood word that matches all the clues, not just one.")])
  ];
  A18.push(MIX("Mixed practice", [A18[0], A18[2], A18[3], A18[5], A18[9], A18[16]]));
  A18.push(MIX("Level 18 Challenge", [A18[1], A18[4], A18[6], A18[7], A18[8], A18[10], A18[11], A18[12], A18[13], A18[14], A18[15], A18[17]]));

  Object.assign(SPELL_LEVELS, { 16: A16, 17: A17, 18: A18 });
})();
