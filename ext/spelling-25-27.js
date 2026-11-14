// ext/spelling-25-27.js : Spelling & Words, levels 25-27 (12th grade, College year 1 first half).
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
  const tyG = items => () => { const it = pick(items); const [t, a, v, s] = it; const q = { text: t, textInput: true, answer: a, it }; if (v) q.visual = v; if (s) q.say = s; return q; };
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
  const phraseG = (label, items) => () => {
    const it = pick(items), [p, m, d] = it;
    return { text: `What does the ${label} <b>${p}</b> mean?`, choices: shuf([m, ...shuf(d).slice(0, 2)]), answer: m, it };
  };
  const anaG = items => () => { const it = pick(items), [a, b, c, ans, d] = it; return { text: `<b>${a}</b> is to <b>${b}</b> as <b>${c}</b> is to ...?`, choices: shuf([ans, ...shuf(d).slice(0, 2)]), answer: ans, it }; };
  const etyG = items => () => { const it = pick(items), [t, a, d] = it; return { text: t, choices: shuf([a, ...shuf(d).slice(0, 2)]), answer: a, it }; };
  const plG = items => () => { const it = pick(items), [w, p, d] = it; return { text: `What is the plural of <b>${w}</b>?`, choices: shuf([p, ...shuf(d).slice(0, 2)]), answer: p, it }; };

  // ----- hints and slides -----
  const proofH = ex => ["Read the sentence slowly, one word at a time. Do not read ahead.", "Look for a word with a missing, extra or swapped letter. The wrong word is one that you can fix by changing a letter or two.", ex];
  const proofSlides = a => [S("Proofreading", "🕵️", "A proofreader reads slowly to find spelling mistakes before anyone else sees the writing."), S("Check the tricky spots", a, "Look at double letters, silent letters, endings and the middle of long words."), S("Fix it", "✏️", "Write the word the right way, then read the sentence again. Read your own essays backward, word by word, to catch slips.")];
  const dictHints = ex => ["Press the speaker and listen. Say the word in parts, then write each part.", q => info(q.answer) + " Say it in parts and write each one.", ex];
  const dictSlides = (a, b) => [S("Spell in parts", a, "Break a long word into syllables and spell one part at a time."), S("Tricky spots", b, "Look for double letters, silent letters and parts that do not sound the way they are spelled."), S("Check", "✅", "Write the word, then say it again in parts. Does every part appear in your spelling?")];
  const sentHints = ex => ["Read the whole sentence. Think about what the missing word means.", "The choices sound alike or look alike. Match the meaning to the sentence.", ex];
  const misH = ex => ["Say each choice slowly. Look for missing, extra or swapped letters in the middle of the word.", q => info(q.answer), ex];
  const wordSlides = (h, t, a, b) => [S(h, "📚", t), S("Look closely", a, "Check the middle of the word. That is where most mistakes hide."), S("Learn by parts", b, "Split the word into parts and say each part. Then picture the whole word.")];
  const misSlides = (a, b) => wordSlides("Tricky words", "Some words are hard because of double letters, silent letters or letters that sound like others.", a, b);
  const vocabH = ex => ["Use the other words in the sentence to guess what the word means.", q => q.it[4] || "Think about whether the word feels positive or negative.", ex];
  const vocabSlides = [S("Context clues", "🔎", "The words around a new word often tell you its meaning."), S("Parts help", "🧩", "Look for a root, prefix or suffix you know inside the word."), S("Use it", "✍️", "After you learn a word, use it in your own sentence. Academic words show up in lectures, textbooks and exams.")];
  const meanH = ex => ["Break the word into parts. One part carries the main meaning.", q => q.it[3], ex];
  const prefH = ex => ["Split the word into the prefix and the rest. What does the rest of the word tell you?", "Picture the real thing the word names. How does the prefix describe it?", ex];
  const homoSlides = (a, b) => [S("Same sound, different word", "👂", "Homophones sound the same but have different spellings and meanings."), S("Pair up", a, "Learn each pair together and tie a memory trick to each word."), S("More pairs", b, "Decide what the sentence needs, then pick the spelling that has that meaning.")];
  const anaH = ex => ["An analogy has two pairs. First find how the first two words are linked.", q => q.it[5], ex];
  const anaSlides = [S("Word pairs", "🔗", "An <b>analogy</b> shows that two pairs of words are linked in the same way."), S("Find the link", "A : B :: C : ?", "Say the link as a sentence, such as 'a ___ is a tool for ___' or 'this is the opposite of that'."), S("Use it twice", "✅", "Test your answer by saying the same sentence for the second pair. If it works, you have the match.")];
  const etyH = ex => ["Many words hide a short story: a person, a place, a thing or a few old words joined together.", q => q.it[3], ex];
  const etySlides = (a, b) => [S("Word stories", "📜", "<b>Etymology</b> is the study of where words come from. Many English words began as names, places or old phrases."), S("Stories to know", a, b), S("Why it helps", "🧠", "If you know the story behind a word, the spelling and the meaning are much easier to remember.")];
  const phrH = ex => ["Do not read the words one by one. Ask what the whole phrase means when people say it.", q => q.it[3], ex];
  const multSlides = [S("Many meanings", "🔀", "Lots of words have more than one meaning. The sentence tells you which one is used."), S("Test each meaning", "🔎", "Put each meaning into the sentence. Only one will make sense."), S("College tip", "✍️", "Common words get special meanings in each subject. Read the whole sentence before you decide.")];
  const ssSlides = [S("Complete the thought", "🧩", "A sentence-completion question gives a sentence with a missing word. The best word fits the meaning of the whole sentence."), S("Look for clue words", "because · although · but", "<b>Because</b> and <b>so</b> point to a similar idea. <b>Although</b>, <b>unlike</b> and <b>but</b> point to an opposite idea."), S("Try each choice", "✅", "Put every choice into the blank and read it aloud. Cross out the ones that make no sense.")];
  const ssH = ex => ["Read the whole sentence, then say in your own words what the blank should mean.", "Look for clue words such as because, although, unlike or despite. They tell you if the blank agrees with the rest of the sentence or goes against it.", ex];
  const confSlides = (a, b) => [S("Words that get confused", "🤔", "College papers lose points for small mix-ups between words that look or sound alike."), S("Pairs to know", a, b), S("Check every time", "✅", "When you proofread, stop at each word from these pairs and ask what the sentence really needs.")];

  // =================================================================
  // LEVEL 25 (12th grade, first half)
  // =================================================================
  const ROOT25 = [
    ["culprit", "culp", "fault", "The person who did the wrong thing in a mystery story."],
    ["sanctuary", "sanct", "holy", "Long ago a temple was called this, and today a protected place for animals is too."],
    ["monolith", "lith", "stone", "Think of an ancient tall pillar cut from one single piece."],
    ["binocular", "ocul", "eye", "You raise them to your face to see far away."],
    ["gastric", "gastr", "stomach", "Juices that help digest your lunch are named this."],
    ["hepatitis", "hepat", "liver", "A disease named for swelling in the organ that cleans your blood."],
    ["pulmonary", "pulmon", "lung", "Doctors of this system treat trouble with breathing."],
    ["cranium", "crani", "skull", "The hard bony case that protects the brain."],
    ["adrenal", "ren", "kidney", "A gland that sits on top of each of the two bean-shaped organs that filter waste."],
    ["thoracic", "thorac", "chest", "A doctor of this kind treats the cage of ribs and the organs inside it."],
    ["cervical", "cervic", "neck", "A brace of this kind protects the top of the spine, near the head."]
  ];
  const ROOT25P = ["fault", "holy", "stone", "eye", "stomach", "liver", "lung", "skull", "kidney", "chest", "neck"];
  const PREF25 = [["a-", "atypical", "without"], ["a-", "amoral", "without"], ["para-", "parallel", "beside"], ["para-", "paramedic", "beside"], ["peri-", "perimeter", "around"], ["peri-", "periscope", "around"], ["intra-", "intravenous", "within"], ["intra-", "intramural", "within"], ["infra-", "infrared", "below"], ["infra-", "infrasonic", "below"]];
  const PREF25P = ["without", "beside", "around", "within", "below", "beyond"];
  const END25 = [
    ["appendectomy", "-ectomy", "cutting out", "Doctors do this operation when the appendix is inflamed."],
    ["tonsillectomy", "-ectomy", "cutting out", "An operation on the throat that many children have."],
    ["empathy", "-pathy", "feeling or disease", "Putting yourself in someone else's shoes."],
    ["neuropathy", "-pathy", "feeling or disease", "A problem in the nerves, which is where 'neuro-' comes in."],
    ["claustrophobia", "-phobia", "fear", "Panic in tiny closed spaces such as a stuck elevator."],
    ["acrophobia", "-phobia", "fear", "Trouble standing on a very high balcony."],
    ["carcinogenic", "-genic", "producing or causing", "Substances that can start a serious disease are called this."],
    ["pathogenic", "-genic", "producing or causing", "A germ that can start an illness is called this."],
    ["analysis", "-lysis", "breaking down", "Studying a poem by examining each part separately."],
    ["electrolysis", "-lysis", "breaking down", "Sending electric current through water to separate it into gases."]
  ];
  const END25P = ["cutting out", "feeling or disease", "fear", "producing or causing", "breaking down", "study of"];
  const HOMO25 = [

    ["Volunteers will ___ the neighborhood to ask people to vote.", "canvass", ["canvas", "canvasse"]], ["The artist stretched a fresh ___ across the frame.", "canvas", ["canvass", "canvase"]],
    ["The country agreed to ___ the island after the treaty.", "cede", ["seed", "sede"]], ["Plant one ___ in each small pot.", "seed", ["cede", "ceed"]],
    ["The machine sat ___ over the weekend.", "idle", ["idol", "idel"]], ["The singer was a teenage ___.", "idol", ["idle", "idoll"]],
    ["The fishing boats tied up at the ___.", "pier", ["peer", "pear"]], ["She had to ___ through the fog to read the sign.", "peer", ["pier", "pear"]],
    ["The ___ cut the ribbon at the new park.", "mayor", ["mare", "mayer"]], ["The ___ galloped across the field.", "mare", ["mayor", "maire"]],
    ["The ___ of the church was crowded.", "nave", ["knave", "nabe"]], ["In the old tale, the ___ cheated the king.", "knave", ["nave", "knaive"]],
    ["The picture frame was covered in ___ paint.", "gilt", ["guilt", "gilte"]], ["She felt ___ about breaking the vase.", "guilt", ["gilt", "gillt"]],
    ["Frequency is measured in ___.", "hertz", ["hurts", "hertze"]], ["My ankle ___ when I run.", "hurts", ["hertz", "hurtz"]]
  ];
  const MIS25 = [["benefited", ["benefitted", "benifited"]], ["dependent", ["dependant", "dependint"]], ["dormitory", ["dormatory", "dormitary"]], ["physician", ["phisician", "physican"]], ["practically", ["practicly", "practicaly"]], ["referred", ["refered", "reffered"]], ["religious", ["religeous", "relijious"]], ["repetition", ["repitition", "repatition"]], ["pigeon", ["pidgeon", "pigeen"]], ["pamphlet", ["pamphelt", "pamflet"]], ["conscious", ["consious", "concious"]], ["abundance", ["abundence", "abundanse"]], ["accessory", ["accesory", "accessery"]], ["amateur", ["amatuer", "amature"]], ["anxious", ["anxous", "anxius"]], ["courtesy", ["curtesy", "courtesey"]]];
  const VOC25 = [
    ["acumen", "A banker needs financial <i>acumen</i> to spot a good investment.", "sharp judgment", ["dull habits", "a large salary"], "Spotting a good investment takes skill of the mind."],
    ["adroit", "The <i>adroit</i> negotiator found a deal that pleased both sides.", "skillful and quick", ["slow and clumsy", "loud and angry"], "The negotiator solved a hard problem well."],
    ["affable", "The <i>affable</i> host greeted every guest with a smile.", "friendly and easy to talk to", ["cold and distant", "strict and serious"], "The host smiled at every guest."],
    ["alacrity", "She accepted the invitation with <i>alacrity</i>, answering within seconds.", "cheerful eagerness", ["great doubt", "slow reluctance"], "She answered within seconds."],
    ["apocryphal", "The story that Newton invented gravity from one apple is probably <i>apocryphal</i>.", "of doubtful truth", ["well documented", "very funny"], "The word 'probably' hints at doubt."],
    ["assiduous", "The <i>assiduous</i> student studied every night for months.", "hardworking and careful", ["lazy and careless", "loud and showy"], "She studied every night for months."],
    ["bombastic", "His <i>bombastic</i> speech was full of big words that said very little.", "pompous and overblown", ["simple and honest", "short and quiet"], "Big words that say little."],
    ["cacophony", "A <i>cacophony</i> of horns filled the busy street.", "a harsh mix of loud sounds", ["a gentle melody", "a long silence"], "Horns on a busy street are not pleasant."],
    ["callous", "His <i>callous</i> reply showed that he did not care about her feelings.", "cold and unfeeling", ["warm and caring", "cheerful and silly"], "He did not care about her feelings."],
    ["circumvent", "The pilot chose a new route to <i>circumvent</i> the storm.", "find a way around", ["fly straight into", "measure"], "He wanted to avoid the storm."],
    ["cloying", "The perfume was so <i>cloying</i> that it gave her a headache.", "sickeningly sweet", ["light and fresh", "very expensive"], "It caused a headache."],
    ["cursory", "He gave the report only a <i>cursory</i> glance before the meeting.", "quick and not thorough", ["slow and careful", "angry"], "He barely looked at it."]
  ];
  const PHYS25 = [["amplitude", ["amplatude", "amplitute"]], ["centrifugal", ["centrafugal", "centrifigal"]], ["electromagnetic", ["electromagnetik", "electromagnatic"]], ["momentum", ["momentem", "momenttum"]], ["oscillation", ["ocillation", "oscilation"]], ["refraction", ["refracshun", "refration"]], ["trajectory", ["trajectery", "trajectorie"]], ["wavelength", ["wavelenth", "wavelengh"]], ["thermodynamics", ["thermodynamicks", "thermodynamix"]], ["inertia", ["inertea", "inershia"]], ["viscosity", ["viscocity", "viscosty"]], ["spectrum", ["spectrem", "specrum"]], ["diffraction", ["difraction", "diffracshun"]], ["kinematics", ["kinimatics", "kinematix"]], ["photon", ["foton", "photton"]], ["capacitor", ["capasitor", "capacitar"]]];
  const LAW25 = [["affidavit", ["affadavit", "affidavid"]], ["arbitration", ["arbitraition", "arbitrashun"]], ["indictment", ["indightment", "indictmint"]], ["litigation", ["litigashun", "litagation"]], ["liability", ["liablity", "liabilty"]], ["negligence", ["negligance", "neglegence"]], ["statute", ["statue", "statut"]], ["injunction", ["injuncshun", "injunktion"]], ["arraignment", ["arainment", "arraingment"]], ["deposition", ["depocition", "deposision"]], ["jurisprudence", ["jurisprudance", "jurisprudense"]], ["misdemeanor", ["misdemeaner", "misdimeanor"]], ["felony", ["felloney", "felany"]], ["bailiff", ["baliff", "bailif"]], ["adjudicate", ["ajudicate", "adjudikate"]], ["appellate", ["appelate", "apellate"]]];
  const LOOK25 = [
    ["The poem makes an ___ to a Greek myth.", "allusion", ["illusion", "elusion"]], ["The magician created the ___ of a floating ball.", "illusion", ["allusion", "ilusion"]],
    ["She told a funny ___ about her first day of school.", "anecdote", ["antidote", "anecdoat"]], ["The doctor gave him the ___ for the poison.", "antidote", ["anecdote", "antidoat"]],
    ["I am ___ to risk; I like to play it safe.", "averse", ["adverse", "avers"]], ["The ___ weather delayed every flight.", "adverse", ["averse", "adverce"]],
    ["Rude remarks may ___ a crowd to anger.", "incite", ["insight", "insite"]], ["Her speech gave me a new ___ into history.", "insight", ["incite", "insite"]],
    ["The bus runs on ___ days during the summer.", "alternate", ["alternative", "alturnate"]], ["We need an ___ plan in case it rains.", "alternative", ["alternate", "alturnative"]],
    ["A computer program is ___; it has no sense of right or wrong.", "amoral", ["immoral", "amorel"]], ["Stealing from a friend is ___.", "immoral", ["amoral", "imoral"]],
    ["A ___ answer ends all doubt.", "definitive", ["definite", "definative"]], ["We have a ___ time for the meeting.", "definite", ["definitive", "definit"]],
    ["Fruit is a ___ snack.", "healthful", ["healthy", "helthful"]], ["A ___ child plays outdoors every day.", "healthy", ["healthful", "helthy"]]
  ];
  const MULT25 = [
    ["table", "The committee voted to <i>table</i> the motion until next week.", "put it off until later", ["write it down in a chart", "make it shorter"], "Think about what happens to a topic you do not discuss now."],
    ["novel", "The scientist's <i>novel</i> approach had never been tried before.", "new and original", ["long and made up", "very old"], "Nobody had tried it before."],
    ["discipline", "Biology is a major <i>discipline</i> at the university.", "a field of study", ["a type of punishment", "a strict house rule"], "A university is full of these."],
    ["moot", "The game was cancelled, so the argument about the score is <i>moot</i>.", "no longer important", ["very loud", "heated and angry"], "The game never happened, so the argument has no use."],
    ["tender", "The bruise was still <i>tender</i> to the touch.", "sore", ["soft to chew", "kind and gentle"], "A bruise is the clue."],
    ["bear", "She could not <i>bear</i> the noise any longer.", "put up with", ["carry on her back", "give birth to"], "She wanted the noise to stop."],
    ["grave", "The doctor spoke in a <i>grave</i> voice about the results.", "serious", ["cheerful and light", "soft and sleepy"], "The doctor is talking about test results."],
    ["yield", "The farm should <i>yield</i> a big harvest this year.", "produce", ["give up", "stop for traffic"], "A farm is expected to give you something."],
    ["interest", "The bank charges <i>interest</i> on the loan.", "extra money paid for borrowing", ["curiosity about something", "a favorite hobby"], "Think about banks and money."],
    ["volume", "The library's oldest <i>volume</i> is a book of maps.", "a book", ["the loudness of a sound", "the amount of space inside"], "The sentence names what kind of thing it is."],
    ["draft", "I wrote a first <i>draft</i> of my essay.", "an early version", ["a current of cold air", "a type of pencil"], "A first one comes before the final one."]
  ];
  const CONF25 = [
    ["She felt ___ about the long operation.", "anxious", ["eager", "anxous"]], ["I am ___ to see the results of the race.", "eager", ["anxious", "egar"]],
    ["The factory must not ___ harmful smoke.", "emit", ["omit", "emitt"]], ["Do not ___ any steps in the proof.", "omit", ["emit", "ommit"]],
    ["She plays the violin very ___.", "well", ["good", "wel"]], ["He is a ___ student who always asks questions.", "good", ["well", "gud"]],
    ["Her handwriting was ___, so I could not read it.", "illegible", ["ineligible", "illegable"]], ["A student with a failing grade is ___ for the team.", "ineligible", ["illegible", "inelligible"]],
    ["The library book is a week ___.", "overdue", ["overdo", "overdew"]], ["Do not ___ the exercise on the first day.", "overdo", ["overdue", "overdoo"]],
    ["The city is large and very ___.", "populous", ["popular", "populus"]], ["The singer is ___ with teenagers.", "popular", ["populous", "populer"]],
    ["A ___ in judgment cost the team the game.", "lapse", ["elapse", "lapce"]], ["Ten minutes will ___ before the bell rings.", "elapse", ["lapse", "ellapse"]],
    ["The doctor set a strict exercise ___.", "regimen", ["regime", "regimine"]], ["The new ___ changed the laws of the country.", "regime", ["regimen", "regeme"]]
  ];
  const SENT25 = [
    ["Her ___ writing, with no wasted words, made the report easy to read.", "concise", ["verbose", "ornate"]],
    ["The report's findings were so ___ that two experts read them in opposite ways.", "equivocal", ["definitive", "unanimous"]],
    ["The politician's promises sounded grand but proved ___.", "vacuous", ["substantial", "binding"]],
    ["Rather than ___ the plan, they supported it eagerly.", "undermine", ["endorse", "praise"]],
    ["The lecture was so ___ that half the audience fell asleep.", "tedious", ["gripping", "hilarious"]],
    ["Though the first results were only ___, later tests were clearly positive.", "provisional", ["final", "decisive"]],
    ["Her ___ schedule left no time for rest: classes, a job and a club every day.", "grueling", ["relaxed", "flexible"]],
    ["The new law was meant to ___ confusion, not add to it.", "alleviate", ["provoke", "increase"]],
    ["He was ___ about his success and never bragged about his awards.", "modest", ["boastful", "arrogant"]],
    ["The ___ of the old building, with its crumbling walls, made it unsafe.", "deterioration", ["decoration", "improvement"]]
  ];
  const ANA25 = [
    ["Thermometer", "temperature", "Barometer", "air pressure", ["wind speed", "rainfall"], "Each pair is an instrument and the thing it measures."],
    ["Author", "novel", "Composer", "symphony", ["concert", "orchestra"], "Each pair is a creator and the thing they create."],
    ["Frugal", "wasteful", "Brave", "cowardly", ["strong", "loud"], "Each pair is a pair of opposites."],
    ["Meticulous", "careful", "Frugal", "thrifty", ["wasteful", "generous"], "Each pair is two words with almost the same meaning."],
    ["Chapter", "book", "Act", "play", ["stage", "actor"], "Each pair is a part and the whole it belongs to."],
    ["Entomologist", "insects", "Ornithologist", "birds", ["fish", "rocks"], "Each pair is a scientist and what they study."],
    ["Cartographer", "maps", "Lexicographer", "dictionaries", ["novels", "recipes"], "Each pair is a worker and what they make."],
    ["Mutable", "changeable", "Immutable", "unchangeable", ["flexible", "dangerous"], "Each pair is a word and its meaning."]
  ];
  const ETY25 = [
    ["The word <b>quarantine</b> comes from an Italian phrase meaning...", "forty days", ["four doors", "strict rule"], "Look for a number in the old Italian phrase."],
    ["The word <b>muscle</b> comes from Latin <i>musculus</i>, which meant...", "little mouse", ["strong rope", "small hill"], "Long ago, people thought of a small animal moving under the skin."],
    ["The word <b>calculate</b> comes from Latin <i>calculus</i>, which meant...", "small pebble", ["counting finger", "wooden stick"], "Romans once used small stones for counting."],
    ["The word <b>companion</b> comes from Latin words meaning...", "with bread", ["with a friend", "in a ship"], "Think of people who share a meal."],
    ["The word <b>disaster</b> comes from Italian words meaning...", "bad star", ["bad weather", "broken plan"], "Long ago people believed the sky could bring good or bad luck."],
    ["The word <b>denim</b> comes from the French phrase <i>de Nimes</i>, which means...", "from Nimes, a city in France", ["made of cotton", "worn by workers"], "The phrase names a place."],
    ["The word <b>salad</b> comes from a Latin word meaning...", "salted", ["fresh", "mixed"], "Think about a seasoning shaken on vegetables long ago."],
    ["The word <b>tragedy</b> comes from Greek words often explained as...", "goat song", ["sad story", "stage mask"], "An animal may have been part of the early performances."]
  ];
  const PROOF25 = ["The committee reached a [concensus] after a long meeting.", "Her [arguement] was supported by three strong examples.", "The students need to [adress] the problem in their report.", "It is [neccessary] to cite every source you use.", "We found a [relevent] article in the journal.", "Writing a good essay takes [persistance].", "The experiment will [commense] on Monday morning.", "Our group had a [dissagreement] about the topic.", "The report gave an [acurate] summary of the results.", "He felt [embarassed] when he forgot his notes.", "The new library is [accesible] to every student.", "The professor was [pasionate] about her subject."];
  const DICT25 = dictG([["cafeteria", "Lunch is served in the ___."], ["tuition", "The ___ for one semester is high."], ["syllabus", "The ___ lists every reading and due date."], ["seminar", "The ___ met twice a week."], ["transcript", "Her ___ lists every course and grade."], ["registrar", "The ___ keeps student records."], ["fellowship", "He won a ___ to study abroad."], ["dissertation", "The student spent years on her ___."], ["humanities", "She studies the ___."], ["orientation", "___ week helps new students find their way."], ["internship", "He had a summer ___ at a bank."]]);
  const HUM25 = [["allegory", ["alegory", "alligory"]], ["anachronism", ["anacronism", "anachronizm"]], ["antithesis", ["antithesus", "antythesis"]], ["archetype", ["arketype", "archtype"]], ["epiphany", ["epifany", "epiphiny"]], ["juxtaposition", ["juxtapasition", "justaposition"]], ["renaissance", ["renaisance", "renaissence"]], ["aesthetic", ["esthetick", "aesthectic"]], ["chronicle", ["chronical", "cronicle"]], ["denouement", ["denoument", "denouemont"]], ["melodrama", ["melodramma", "melodrma"]], ["pastoral", ["pastorel", "pasteral"]], ["vernacular", ["vernaculer", "vernackular"]], ["zeitgeist", ["zeitgiest", "zietgeist"]]];
  const RES25 = [["methodology", ["methedology", "methodolegy"]], ["footnote", ["foodnote", "footnot"]], ["annotation", ["anotation", "annotashun"]], ["appendix", ["appendex", "apendix"]], ["anthology", ["anthalogy", "antology"]], ["manuscript", ["manuscrip", "mannuscript"]], ["abstract", ["abstrakt", "abstrac"]], ["periodical", ["periodicle", "perriodical"]], ["glossary", ["glosary", "glossery"]], ["redundancy", ["redundency", "redundansy"]], ["discourse", ["discource", "discorse"]]];

  const A25 = [
    L("Word roots 18", meaningG(ROOT25, ROOT25P, "root"),
      meanH("Example: the root <b>dent</b> means <b>tooth</b>, as in <i>dentist</i>. Find the meaning of yours the same way."),
      [S("Body roots", "ocul · crani · gastr · pulmon", "<b>ocul</b> = eye (binocular), <b>crani</b> = skull (cranium), <b>gastr</b> = stomach (gastric), <b>pulmon</b> = lung (pulmonary)."), S("More roots", "hepat · ren · thorac · cervic", "<b>hepat</b> = liver (hepatitis), <b>ren</b> = kidney (adrenal), <b>thorac</b> = chest (thoracic), <b>cervic</b> = neck (cervical)."), S("Law and stone", "culp · sanct · lith", "<b>culp</b> = fault (culprit), <b>sanct</b> = holy (sanctuary), <b>lith</b> = stone (monolith). Roots from Greek and Latin fill science and law.")]),
    L("Prefixes a-, para-, peri-, intra- and infra-", prefG(PREF25, PREF25P),
      prefH("Example: <b>bicycle</b> has two wheels, so <b>bi-</b> means two. Use your word the same way."),
      [S("Without and beside", "a- · para-", "<b>a-</b> means without (atypical is not typical). <b>para-</b> means beside (parallel lines run side by side)."), S("Around and within", "peri- · intra-", "<b>peri-</b> means around (perimeter is the distance around). <b>intra-</b> means within (intravenous is within a vein)."), S("Below", "infra-", "<b>infra-</b> means below (infrared light is just below red in the color spectrum).")]),
    L("Word endings -ectomy, -pathy, -phobia, -genic and -lysis", meaningG(END25, END25P, "ending"),
      meanH("Example: <b>-less</b> means without, as in <i>careless</i>. Find the meaning of your ending the same way."),
      [S("Medical endings", "-ectomy · -pathy", "<b>-ectomy</b> means cutting out (an operation). <b>-pathy</b> means feeling or disease (empathy, neuropathy)."), S("Fear and cause", "-phobia · -genic", "<b>-phobia</b> means fear (claustrophobia). <b>-genic</b> means producing or causing (pathogenic)."), S("Breaking down", "-lysis", "<b>-lysis</b> means breaking down or loosening (analysis, electrolysis).")]),
    L("Homophones 22", sentG(HOMO25),
      sentHints("Example: 'I will <b>wait</b> here' and 'the <b>weight</b> of a box'. Decide which meaning your sentence needs."),
      homoSlides("canvass · canvas · cede · seed", "idle · idol · pier · peer · nave · knave")),
    L("Commonly misspelled words 13", rightG(MIS25),
      misH("Example: <b>Wednesday</b> has a silent d and <b>government</b> has an n before the m. Check the middle of yours."),
      misSlides("ben·e·fit·ed · pi·geon", "phy·si·cian · rep·e·ti·tion")),
    L("Academic vocabulary 1", vocG(VOC25), vocabH("Example: 'The <b>lengthy</b> movie lasted four hours' ➜ lengthy means very long, because of the four hours."), vocabSlides),
    L("Physics words", rightG(PHYS25),
      misH("Example: <b>physics</b> starts with ph, which sounds like f. Many physics words end in -tion, -ity or -um, so check the ending."),
      wordSlides("Words of motion and energy", "Physics words come from Latin and Greek and describe motion, waves and forces.", "am·pli·tude · cen·trif·u·gal", "os·cil·la·tion · dif·frac·tion")),
    L("Courtroom and contract words", rightG(LAW25),
      misH("Example: <b>judgment</b> has a silent e before ment in many US spellings, and <b>lawyer</b> has a y. Check the middle of yours."),
      wordSlides("Words of the courtroom", "Legal words are often old French and Latin, so they have unusual letters.", "af·fi·da·vit · lit·i·ga·tion", "ar·raign·ment · in·junc·tion")),
    L("Look-alike words 4", sentG(LOOK25),
      sentHints("Example: <b>advice</b> is a noun ('good advice') and <b>advise</b> is a verb ('I advise you'). Decide what your sentence needs."),
      confSlides("allusion · illusion · anecdote · antidote", "averse · adverse · incite · insight · alternate · alternative")),
    L("Words with several meanings 6", vocG(MULT25), vocabH("Example: 'The <b>bat</b> flew out of the cave' ➜ here bat is an animal, not a baseball tool."), multSlides),
    L("Commonly confused words in college writing 1", sentG(CONF25),
      sentHints("Example: <b>advice</b> is a noun ('good advice') and <b>advise</b> is a verb ('I advise you'). Decide what your sentence needs."),
      confSlides("anxious · eager · emit · omit", "illegible · ineligible · overdue · overdo · lapse · elapse")),
    L("Sentence completion 4", sentG(SENT25), ssH("Example: 'Because the soup was so ___, she added more salt' ➜ bland, because she wanted more flavor."), ssSlides),
    L("Word analogies 6", anaG(ANA25), anaH("Example: <b>fish : swim :: bird : fly</b>. A fish swims, so a bird flies. Now do yours."), anaSlides),
    L("Etymology 4: stories behind words", etyG(ETY25), etyH("Example: <b>sandwich</b> is named after the Earl of Sandwich, who liked to eat bread and meat while he worked. Now think about yours."),
      etySlides("quarantine · muscle · calculate", "<b>Quarantine</b> is Italian for 'forty days'. <b>Muscle</b> is Latin for 'little mouse'. <b>Calculate</b> is Latin for 'small pebble'.")),
    L("Proofreading 15", proofG(PROOF25), proofH("Example: 'It was a <b>wierd</b> sound' ➜ 'wierd' should be 'weird'. Check each word like that."), proofSlides("🧐")),
    L("Listen and spell 21", tyG(DICT25), dictHints("Example: 'enthusiasm' = en + thu + si + asm. Write each part, then check the whole word."), dictSlides("syl·la·bus · sem·i·nar", "tran·script · fel·low·ship")),
    L("Literature and history words", rightG(HUM25),
      misH("Example: <b>metaphor</b> has ph for the f sound. Many literature words come from Greek, so watch for ph, ch and y."),
      wordSlides("Words of books and ideas", "Writers and historians use Greek and Latin words to name ideas.", "al·le·go·ry · an·ach·ro·nism", "an·tith·e·sis · ep·iph·a·ny")),
    L("Research and citation words", rightG(RES25),
      misH("Example: <b>reference</b> has only one r in the middle and ends in -ence. Check the middle and the ending of yours."),
      wordSlides("Words of research", "Research papers use special words for finding, quoting and listing sources.", "an·no·ta·tion · glos·sa·ry", "man·u·script · meth·od·ol·o·gy"))
  ];
  A25.push(MIX("Mixed practice", [A25[0], A25[3], A25[4], A25[5], A25[9], A25[14]]));
  A25.push(MIX("Level 25 Challenge", [A25[1], A25[2], A25[6], A25[7], A25[8], A25[10], A25[11], A25[12], A25[13], A25[15], A25[16], A25[17]]));

  // =================================================================
  // LEVEL 26 (12th grade, second half)
  // =================================================================
  const ROOT26 = [
    ["dormant", "dorm", "sleep", "A volcano that is not erupting is described this way."],
    ["fraternity", "frat", "brother", "A club at college is named with this word."],
    ["patriarch", "patr", "father", "The head of a family or tribe in a story from long ago."],
    ["omniscient", "omni", "all", "A narrator who sees into every character's mind."],
    ["ignite", "ign", "fire", "What you do to a match before lighting a campfire."],
    ["bellicose", "bell", "war", "Someone who is always looking for a fight."],
    ["nominal", "nom", "name", "A leader in title only holds this kind of position."],
    ["terrain", "terr", "land", "Hills, valleys and plains make up this."],
    ["aviary", "avi", "bird", "A large cage at a zoo where parrots can fly."],
    ["apiary", "api", "bee", "A place where honey is collected."]
  ];
  const ROOT26P = ["sleep", "brother", "father", "all", "fire", "war", "name", "land", "bird", "bee"];
  const PREF26 = [["pseudo-", "pseudoscience", "false"], ["pseudo-", "pseudocode", "false"], ["retro-", "retrospect", "backward"], ["retro-", "retroactive", "backward"], ["pan-", "panorama", "all"], ["pan-", "pandemic", "all"], ["hypo-", "hypothermia", "below or under"], ["hypo-", "hypodermic", "below or under"], ["circum-", "circumference", "around"], ["circum-", "circumnavigate", "around"]];
  const PREF26P = ["false", "backward", "all", "below or under", "around", "partly"];
  const END26 = [
    ["egocentric", "-centric", "centered on", "A person who thinks only about himself or herself."],
    ["geocentric", "-centric", "centered on", "An old model of the sky that put the planet we live on in the middle."],
    ["bilingual", "-lingual", "language", "A student who speaks both English and Spanish."],
    ["multilingual", "-lingual", "language", "A guide who can talk with tourists from many countries."],
    ["physiotherapy", "-therapy", "treatment", "Exercises that help an injured knee get better."],
    ["hydrotherapy", "-therapy", "treatment", "Swimming exercises done to heal a sore back."],
    ["planetarium", "-arium", "place for", "A domed room where you watch stars on the ceiling."],
    ["solarium", "-arium", "place for", "A sunny glass room in a house."],
    ["linguistics", "-ics", "the study of", "A university course about how languages work."],
    ["robotics", "-ics", "the study of", "A club that designs and builds machines that move."]
  ];
  const END26P = ["centered on", "language", "treatment", "place for", "the study of", "state of"];
  const HOMO26 = [
    ["The rope was pulled ___ between the posts.", "taut", ["taught", "tout"]], ["Our coach ___ us a new play.", "taught", ["taut", "tauht"]],
    ["We will ___ across the shallow stream.", "wade", ["weighed", "waid"]], ["The baker ___ the flour carefully.", "weighed", ["wade", "waid"]],
    ["The old book has ___ on the shelf for years.", "lain", ["lane", "layne"]], ["Stay in your ___ when you swim.", "lane", ["lain", "laine"]],
    ["Heavy storms can ___ havoc on a coast.", "wreak", ["reek", "wreek"]], ["Garbage left in the sun will ___.", "reek", ["wreak", "reeck"]],
    ["He ___ out the wet towel.", "wrung", ["rung", "wrong"]], ["The bell was ___ at noon.", "rung", ["wrung", "rong"]],
    ["Sweat comes out of each tiny ___ in the skin.", "pore", ["pour", "poor"]], ["Please ___ the milk slowly.", "pour", ["pore", "poor"]],
    ["He read the story in ___ form, one chapter a week.", "serial", ["cereal", "serrial"]], ["She ate a bowl of ___ for breakfast.", "cereal", ["serial", "serrial"]],
    ["The boat needs another ___.", "oar", ["ore", "oare"]], ["Miners dug ___ from the mountain.", "ore", ["oar", "ower"]]
  ];
  const MIS26 = [["camaraderie", ["camraderie", "camaradery"]], ["exhilarate", ["exhilerate", "exilarate"]], ["innocuous", ["inocuous", "innocuos"]], ["liaison", ["liason", "liaision"]], ["maneuver", ["manuever", "manouver"]], ["demeanor", ["demeaner", "demeenor"]], ["eccentric", ["excentric", "eccentrick"]], ["emphasis", ["emphisis", "emphasys"]], ["fascinating", ["facinating", "fasinating"]], ["fraudulent", ["fraudulant", "frauduelnt"]], ["guidance", ["guidence", "gidance"]], ["heinous", ["heinus", "hienous"]], ["hypocrisy", ["hypocracy", "hipocrisy"]], ["impromptu", ["impromtu", "impromptoo"]], ["irritable", ["irritible", "iritable"]], ["judicious", ["judicous", "juditious"]]];
  const VOC26 = [
    ["deleterious", "Too little sleep can have a <i>deleterious</i> effect on learning.", "harmful", ["helpful", "surprising"], "Lack of sleep hurts learning."],
    ["denigrate", "A good coach will never <i>denigrate</i> a player for making a mistake.", "speak badly of", ["praise loudly", "ignore"], "The coach treats a player kindly."],
    ["desultory", "The team's <i>desultory</i> practice had no plan and no energy.", "lacking purpose or order", ["fiercely focused", "carefully planned"], "It had no plan and no energy."],
    ["diffident", "The <i>diffident</i> new student rarely raised her hand.", "shy and lacking confidence", ["bold and loud", "rude and angry"], "She rarely raised her hand."],
    ["digress", "The speaker began to <i>digress</i>, telling a long story that had nothing to do with the topic.", "wander from the main subject", ["finish early", "speak louder"], "The story had nothing to do with the topic."],
    ["disparate", "The museum showed <i>disparate</i> objects, from a spoon to a spaceship.", "completely different", ["exactly the same", "very small"], "A spoon and a spaceship are very different."],
    ["dubious", "I am <i>dubious</i> about the claim, because there is no proof.", "doubtful", ["delighted", "certain"], "There is no proof."],
    ["ebullient", "The <i>ebullient</i> crowd cheered and laughed all night.", "bubbling with energy and joy", ["quiet and sad", "angry and bored"], "They cheered and laughed."],
    ["efficacy", "Doctors tested the <i>efficacy</i> of the new medicine on a small group.", "power to produce the wanted effect", ["cost to the buyer", "bad taste"], "They tested whether it worked."],
    ["elucidate", "The teacher drew a diagram to <i>elucidate</i> the difficult idea.", "make clear", ["hide", "make longer"], "Teachers draw diagrams to do this for hard ideas."],
    ["emulate", "Young athletes often try to <i>emulate</i> their heroes.", "copy in order to match", ["argue with", "forget"], "They try to be like their heroes."]
  ];
  const LAT26 = [
    ["pro bono", "done for the public good, without charge", ["paid at double rate", "done in secret"], "A lawyer might do this kind of work for someone who cannot pay."],
    ["habeas corpus", "a rule that a person cannot be held without being brought before a judge", ["a rule that a trial must be public", "a rule about who may serve as a judge"], "It protects a person from being locked up without a reason."],
    ["bona fide", "genuine and sincere", ["very costly", "kept secret"], "Think about the opposite of a fake offer."],
    ["ad hoc", "made for this particular purpose", ["lasting forever", "done by mistake"], "An ad hoc committee meets for one task and then ends."],
    ["de facto", "in fact, whether or not officially recognized", ["only by law", "long in the past"], "Think of the real situation as opposed to the official one."],
    ["quid pro quo", "something given in exchange for something else", ["a question with no answer", "a gift with no reason"], "It is a swap."],
    ["status quo", "the existing state of things", ["a high social rank", "a sudden change"], "Those who want no change favor it."],
    ["caveat emptor", "let the buyer beware", ["the seller is always right", "all sales are final"], "It is a warning given to shoppers."],
    ["per se", "by itself; in itself", ["once a year", "in every case"], "It points to the thing alone, apart from anything else."],
    ["prima facie", "at first sight; on first impression", ["beyond doubt", "in the past"], "The Latin words mean 'first face'."],
    ["in absentia", "while absent", ["while sleeping", "in secret"], "The person was not in the room."],
    ["mens rea", "a guilty mind", ["a clean record", "a hidden weapon"], "Courts ask whether a person meant to do wrong."]
  ];
  const PSY26 = [["conditioning", ["condishioning", "conditoning"]], ["dissonance", ["dissonence", "disonance"]], ["hypnosis", ["hypnosys", "hipnosis"]], ["inhibition", ["inibition", "inhibishun"]], ["introvert", ["intravert", "introvirt"]], ["extrovert", ["extravirt", "extrovirt"]], ["synapse", ["synaps", "sinapse"]], ["behaviorism", ["behavorism", "behaviorizm"]], ["anxiety", ["anxity", "anxeity"]], ["bystander", ["bystandar", "bistander"]], ["reinforcement", ["reinforcment", "reinforsement"]], ["attachment", ["attatchment", "attachement"]], ["cognition", ["cognision", "cogneetion"]], ["compulsion", ["compulshun", "compultion"]], ["gestalt", ["gestault", "geshtalt"]], ["impulse", ["impulce", "impuls"]]];
  const LOOK26 = [

    ["She sat ___ me during the lecture.", "beside", ["besides", "bisside"]], ["He studies math; ___, he likes art.", "besides", ["beside", "bessides"]],
    ["A ___ festival happens every two years.", "biennial", ["biannual", "bienial"]], ["The ___ sale happens twice a year, in spring and fall.", "biannual", ["biennial", "byannual"]],
    ["His ___ remarks insulted the guests.", "contemptuous", ["contemptible", "contemptous"]], ["The act was ___, beneath all respect.", "contemptible", ["contemptuous", "contemptable"]],
    ["The ___ palace had hundreds of rooms.", "imperial", ["imperious", "emperial"]], ["The manager spoke in an ___ tone.", "imperious", ["imperial", "imperius"]],
    ["The audience gave the ___ performance a standing ovation.", "incredible", ["incredulous", "incredable"]], ["She gave an ___ look at the unlikely story.", "incredulous", ["incredible", "incredulus"]],
    ["The museum is ___ for its collection of maps.", "notable", ["notorious", "notible"]], ["The outlaw was ___ across the whole region.", "notorious", ["notable", "notoreous"]],
    ["She was ___ to leave, so she stayed a little longer.", "reluctant", ["reticent", "reluctent"]], ["He was ___ about his past and spoke very little.", "reticent", ["reluctant", "reticant"]],
    ["Do not ___ bad motives to others without proof.", "ascribe", ["subscribe", "ascibe"]], ["I ___ to a science magazine.", "subscribe", ["ascribe", "subcribe"]]
  ];
  const MULT26 = [
    ["bound", "Visitors are <i>bound</i> by the library's rules.", "required by duty", ["leaping forward", "tied up with rope"], "Rules tell you what you must do."],
    ["content", "She was <i>content</i> to read quietly all afternoon.", "satisfied", ["the things inside", "full of energy"], "She did not want anything else."],
    ["conduct", "Copper can <i>conduct</i> electricity very well.", "carry or pass along", ["lead an orchestra", "behave in public"], "Think about how electricity moves through a wire."],
    ["figure", "I cannot <i>figure</i> out this puzzle.", "work out", ["draw a shape", "give a number"], "A puzzle is something you try to solve."],
    ["pitch", "The startup will <i>pitch</i> its idea to investors.", "present to persuade", ["throw a ball", "cover with tar"], "Investors are people who might fund an idea."],
    ["trace", "Scientists <i>trace</i> the river back to its source.", "follow back to the origin", ["copy by drawing over", "leave a tiny amount"], "The source is where the river starts."],
    ["address", "The president will <i>address</i> the graduates on Friday.", "speak to", ["write on an envelope", "give the street name"], "Graduates will be in the audience."],
    ["subject", "Researchers asked each <i>subject</i> to complete a survey.", "a person in a study", ["a school class", "the topic of a talk"], "Researchers use these people to collect information."],
    ["mean", "The <i>mean</i> of 4, 6 and 8 is 6.", "the average", ["unkind", "to intend"], "The sentence is about numbers."],
    ["culture", "Biologists <i>culture</i> bacteria in dishes to study them.", "grow in a lab", ["share customs and arts", "teach manners"], "A dish in a lab is a place where living things can grow."]
  ];
  const CONF26 = [
    ["The lawyer will ___ the case in court.", "prosecute", ["persecute", "prosecut"]], ["Long ago, rulers would ___ people for their beliefs.", "persecute", ["prosecute", "persicute"]],
    ["That is a ___ matter, so please do not ask.", "personal", ["personnel", "personel"]], ["The company hired new ___ for the office.", "personnel", ["personal", "personell"]],
    ["Please ___ me of any changes.", "apprise", ["appraise", "aprise"]], ["An expert will ___ the painting.", "appraise", ["apprise", "apraise"]],
    ["The reporter's story was ___ from many sources.", "compiled", ["complied", "compilled"]], ["The students ___ with the new rules.", "complied", ["compiled", "complyed"]],
    ["The board will ___ to the union's request.", "accede", ["exceed", "acede"]], ["Do not ___ the speed limit.", "exceed", ["accede", "excede"]],
    ["The driver is ___ for the damage.", "liable", ["libel", "liabel"]], ["A false printed claim about a person is ___.", "libel", ["liable", "libbel"]],
    ["A company car was a ___ of the job.", "perquisite", ["prerequisite", "perquesite"]], ["A first course is a ___ for the advanced one.", "prerequisite", ["perquisite", "prerequesite"]],
    ["Cake was served for ___.", "dessert", ["desert", "desset"]], ["The camel crossed the hot ___.", "desert", ["dessert", "dezert"]]
  ];
  const SENT26 = [
    ["The scientist was ___ to announce the results without more tests.", "hesitant", ["eager", "boastful"]],
    ["The two theories are ___: if one is true, the other must be false.", "incompatible", ["identical", "harmonious"]],
    ["Despite her ___ appearance, the gardener could lift heavy sacks with ease.", "frail", ["imposing", "sturdy"]],
    ["The explorer's ___ journal described every day in rich detail.", "comprehensive", ["sketchy", "hasty"]],
    ["To ___ costs, the school cut spending on non-essential items.", "curtail", ["expand", "ignore"]],
    ["The author's tone was ___, mocking the foolishness of the characters.", "satirical", ["sincere", "solemn"]],
    ["Her ___ attitude toward homework meant she always turned it in early.", "diligent", ["lazy", "indifferent"]],
    ["The treaty brought a ___ peace that lasted for decades.", "durable", ["fragile", "temporary"]],
    ["Because the rules were so ___, the students felt free to explore.", "lenient", ["strict", "complex"]],
    ["The evidence was ___, so the lawyer needed another witness.", "insufficient", ["overwhelming", "flawless"]]
  ];
  const ANA26 = [
    ["Seismograph", "earthquakes", "Anemometer", "wind", ["rain", "temperature"], "Each pair is an instrument and the thing it measures."],
    ["Bud", "blossom", "Caterpillar", "butterfly", ["cocoon", "leaf"], "Each pair is a young form and its grown-up form."],
    ["Famine", "food", "Drought", "water", ["heat", "farmland"], "Each pair is a shortage and the thing that is lacking."],
    ["Eulogy", "praise", "Tirade", "anger", ["humor", "advice"], "Each pair is a kind of speech and the feeling it shows."],
    ["Lawyer", "client", "Physician", "patient", ["nurse", "hospital"], "Each pair is a professional and the person they serve."],
    ["Whisper", "shout", "Trickle", "flood", ["drop", "puddle"], "Each pair is a mild form and a very strong form."],
    ["Pristine", "spotless", "Tarnished", "stained", ["shiny", "brand-new"], "Each pair is two words with almost the same meaning."],
    ["Library", "books", "Gallery", "paintings", ["artists", "frames"], "Each pair is a place and what is kept there."]
  ];
  const ETY26 = [
    ["The word <b>robot</b> comes from a Czech word that meant...", "forced work", ["metal man", "clever machine"], "It was first used in a 1920 play about machines doing jobs for people."],
    ["The word <b>panic</b> comes from the name of Pan, the Greek god of...", "shepherds and wild places", ["the sea", "the harvest"], "Travelers in lonely wild places were said to feel sudden fear from him."],
    ["The word <b>mentor</b> comes from a character named Mentor in Homer's <i>Odyssey</i>. What did he do?", "he advised and guided a young man", ["he sailed the ship", "he built a palace"], "A mentor today does the same job."],
    ["The word <b>volcano</b> comes from Vulcan, the Roman god of...", "fire and metalworking", ["storms", "music"], "Think of a mountain that throws out heat."],
    ["The word <b>cereal</b> comes from Ceres, the Roman goddess of...", "grain and farming", ["wind", "travel"], "Cereal is made from the plants she watched over."],
    ["The word <b>candidate</b> comes from a Latin word meaning...", "dressed in white", ["standing in line", "speaking loudly"], "Roman office seekers wore special togas."],
    ["The month <b>January</b> is named after Janus, a Roman god with...", "two faces, looking forward and back", ["wings on his feet", "a golden crown"], "It marks a door between the old year and the new."],
    ["The word <b>tantalize</b> comes from Tantalus, who in Greek myth could never reach...", "food and water that stayed just out of reach", ["the gates of a city", "the top of a mountain"], "To tantalize is to tease with something close but out of reach."]
  ];
  const PROOF26 = ["The scientist wrote a [sumary] of her findings.", "The two groups [colaborated] on the project.", "The company has a clear [stratagy] for next year.", "Her [curiousity] led her to study astronomy.", "A [responsable] citizen votes in every election.", "The [goverment] announced a new education policy.", "He gave a [convinceing] speech about recycling.", "The student's [grammer] improved after the course.", "We need more [evidense] before we draw a conclusion.", "The test measures [acheivement] in math.", "This [enviroment] supports many kinds of life.", "Please [forwerd] the article to everyone in the class."];
  const DICT26 = dictG([["semester", "Each ___ lasts about fifteen weeks."], ["undergraduate", "An ___ has not yet earned a first degree."], ["bachelor", "She earned a ___ of arts degree."], ["anthropologist", "An ___ studies human cultures."], ["archaeologist", "The ___ dug up ancient pottery."], ["economist", "The ___ explained why prices rose."], ["meteorologist", "The ___ predicted rain."], ["paleontologist", "A ___ studies fossils."], ["sociologist", "A ___ studies how societies work."], ["analytical", "An ___ mind breaks problems into parts."], ["biochemistry", "She majored in ___."], ["collaboration", "The project was a ___ between two schools."]]);
  const BUS26 = [["collateral", ["colateral", "collaterel"]], ["dividend", ["divident", "dividen"]], ["liquidity", ["liquidty", "liquiditty"]], ["merger", ["murger", "mergar"]], ["portfolio", ["portfollio", "portfolo"]], ["shareholder", ["sharholder", "shareholdar"]], ["stakeholder", ["stakeholdar", "stakholder"]], ["subsidiary", ["subsidary", "subsidery"]], ["warranty", ["warrenty", "warrantee"]], ["acquisition", ["aquisition", "acquistion"]], ["marketing", ["marketting", "markating"]], ["depreciation", ["depreciashun", "deprecation"]], ["contractor", ["contracter", "contractur"]], ["franchise", ["franchize", "francise"]], ["procurement", ["procurment", "procuremant"]], ["quarterly", ["quarterley", "quartarly"]]];
  const COMP26 = [["compiler", ["compilor", "compiller"]], ["hardware", ["hardwear", "hardwair"]], ["iteration", ["iterashun", "itteration"]], ["malware", ["malwear", "malwair"]], ["network", ["netwerk", "netwrok"]], ["software", ["softwear", "softwair"]], ["recursion", ["recurtion", "reccursion"]], ["authentication", ["authentification", "autentication"]], ["debugging", ["debuging", "debuggin"]], ["pixel", ["pixle", "pixell"]], ["router", ["rooter", "routor"]], ["server", ["servar", "surver"]], ["virtual", ["virchual", "virtuel"]], ["wireless", ["wirless", "wireles"]], ["peripheral", ["peripherel", "periferal"]], ["simulation", ["simulashun", "simulaton"]]];

  const A26 = [
    L("Word roots 19", meaningG(ROOT26, ROOT26P, "root"),
      meanH("Example: the root <b>dent</b> means <b>tooth</b>, as in <i>dentist</i>. Find the meaning of yours the same way."),
      [S("Family and fire", "frat · patr · ign · dorm", "<b>frat</b> = brother (fraternity), <b>patr</b> = father (patriarch), <b>ign</b> = fire (ignite), <b>dorm</b> = sleep (dormant, dormitory)."), S("War and name", "bell · nom · omni", "<b>bell</b> = war (bellicose), <b>nom</b> = name (nominal), <b>omni</b> = all (omniscient knows all)."), S("Land, birds and bees", "terr · avi · api", "<b>terr</b> = land (terrain), <b>avi</b> = bird (aviary), <b>api</b> = bee (apiary).")]),
    L("Prefixes pseudo-, retro-, pan-, hypo- and circum-", prefG(PREF26, PREF26P),
      prefH("Example: <b>bicycle</b> has two wheels, so <b>bi-</b> means two. Use your word the same way."),
      [S("False and backward", "pseudo- · retro-", "<b>pseudo-</b> means false (a pseudonym is a false name). <b>retro-</b> means backward (a retrospect looks back at the past)."), S("All and below", "pan- · hypo-", "<b>pan-</b> means all (a panorama shows the whole view). <b>hypo-</b> means below or under (hypothermia is a body temperature far under normal)."), S("Around", "circum-", "<b>circum-</b> means around (the circumference is the distance around a circle).")]),
    L("Word endings -centric, -lingual, -therapy, -arium and -ics", meaningG(END26, END26P, "ending"),
      meanH("Example: <b>-less</b> means without, as in <i>careless</i>. Find the meaning of your ending the same way."),
      [S("Centered and language", "-centric · -lingual", "<b>-centric</b> means centered on (egocentric is centered on the self). <b>-lingual</b> means about language (bilingual = two languages)."), S("Treatment and place", "-therapy · -arium", "<b>-therapy</b> means treatment. <b>-arium</b> means a place for something (a planetarium is a place for planets and stars)."), S("The study of", "-ics", "<b>-ics</b> often means the study of a subject (linguistics, robotics, genetics).")]),
    L("Homophones 23", sentG(HOMO26),
      sentHints("Example: 'I will <b>wait</b> here' and 'the <b>weight</b> of a box'. Decide which meaning your sentence needs."),
      homoSlides("taut · taught · wade · weighed", "wreak · reek · wrung · rung · pore · pour")),
    L("Commonly misspelled words 14", rightG(MIS26),
      misH("Example: <b>Wednesday</b> has a silent d and <b>government</b> has an n before the m. Check the middle of yours."),
      misSlides("ca·ma·ra·de·rie · ex·hil·a·rate", "li·ai·son · ma·neu·ver")),
    L("Academic vocabulary 2", vocG(VOC26), vocabH("Example: 'The <b>lengthy</b> movie lasted four hours' ➜ lengthy means very long, because of the four hours."), vocabSlides),
    L("Latin legal phrases", phraseG("Latin phrase", LAT26),
      phrH("Example: <b>et cetera</b> means 'and the rest'. Say what your Latin phrase means as a whole, not word by word."),
      [S("Latin in law", "⚖️", "Courts and lawyers still use short Latin phrases. They are also common in college reading."), S("Examples", "pro bono · ad hoc · bona fide", "<b>Pro bono</b> = for the public good, without charge. <b>Ad hoc</b> = for this one purpose. <b>Bona fide</b> = genuine."), S("Tip", "🧩", "Say the phrase aloud and think about where you have seen it. A Latin phrase is usually short, so learn its meaning as one chunk.")]),
    L("Psychology words", rightG(PSY26),
      misH("Example: <b>psychology</b> starts with ps, but the p is silent. Many mind words have Greek parts, so check the beginning and the middle."),
      wordSlides("Words about the mind", "Psychology is the study of thoughts, feelings and behavior.", "cog·ni·tion · dis·so·nance", "re·in·force·ment · syn·apse")),
    L("Look-alike words 5", sentG(LOOK26),
      sentHints("Example: <b>advice</b> is a noun ('good advice') and <b>advise</b> is a verb ('I advise you'). Decide what your sentence needs."),
      confSlides("beside · besides · biennial · biannual", "contemptuous · imperial · incredible · incredulous · notable · notorious")),
    L("Words with several meanings 7", vocG(MULT26), vocabH("Example: 'The <b>bat</b> flew out of the cave' ➜ here bat is an animal, not a baseball tool."), multSlides),
    L("Commonly confused words in college writing 2", sentG(CONF26),
      sentHints("Example: <b>advice</b> is a noun ('good advice') and <b>advise</b> is a verb ('I advise you'). Decide what your sentence needs."),
      confSlides("prosecute · persecute · personal · personnel", "accede · exceed · liable · libel · dessert · desert")),
    L("Sentence completion 5", sentG(SENT26), ssH("Example: 'Because the soup was so ___, she added more salt' ➜ bland, because she wanted more flavor."), ssSlides),
    L("Word analogies 7", anaG(ANA26), anaH("Example: <b>fish : swim :: bird : fly</b>. A fish swims, so a bird flies. Now do yours."), anaSlides),
    L("Etymology 5: stories behind words", etyG(ETY26), etyH("Example: <b>sandwich</b> is named after the Earl of Sandwich, who liked to eat bread and meat while he worked. Now think about yours."),
      etySlides("robot · panic · mentor", "<b>Robot</b> comes from a Czech word for forced work. <b>Panic</b> comes from the Greek god Pan. <b>Mentor</b> comes from a wise guide in an ancient Greek poem.")),
    L("Proofreading 16", proofG(PROOF26), proofH("Example: 'It was a <b>wierd</b> sound' ➜ 'wierd' should be 'weird'. Check each word like that."), proofSlides("🧐")),
    L("Listen and spell 22", tyG(DICT26), dictHints("Example: 'enthusiasm' = en + thu + si + asm. Write each part, then check the whole word."), dictSlides("an·thro·pol·o·gist · ar·chae·ol·o·gist", "pa·le·on·tol·o·gist · col·lab·o·ra·tion")),
    L("Business and finance words", rightG(BUS26),
      misH("Example: <b>employee</b> has a double e at the end, like <i>referee</i>. Check the middle and the ending of yours."),
      wordSlides("Words of business", "Companies use many words from French and Latin to talk about money and work.", "div·i·dend · col·lat·er·al", "sub·sid·i·ar·y · ac·qui·si·tion")),
    L("Computing words", rightG(COMP26),
      misH("Example: <b>keyboard</b> is two words joined with no space. Many computing words are compounds, so check each part."),
      wordSlides("Words of computers", "Computing mixes new compound words with older words from Greek and Latin.", "com·pil·er · it·er·a·tion", "au·then·ti·ca·tion · re·cur·sion"))
  ];
  A26.push(MIX("Mixed practice", [A26[0], A26[3], A26[4], A26[5], A26[9], A26[14]]));
  A26.push(MIX("Level 26 Challenge", [A26[1], A26[2], A26[6], A26[7], A26[8], A26[10], A26[11], A26[12], A26[13], A26[15], A26[16], A26[17]]));

  // =================================================================
  // LEVEL 27 (College year 1, first half)
  // =================================================================
  const ROOT27 = [
    ["otoscope", "ot", "ear", "A doctor looks into your head with this tool when you have an earache."],
    ["lexicon", "lex", "word", "Another name for a dictionary or the vocabulary of a language."],
    ["altitude", "alt", "high", "Pilots check this to know how far above the ground they are."],
    ["eradicate", "radic", "root", "To pull a weed out entirely so that it never comes back."],
    ["hemoglobin", "hem", "blood", "The red substance in your veins that carries oxygen."],
    ["osteopath", "oste", "bone", "A doctor who studies the skeleton."],
    ["altruism", "altr", "other", "Giving to charity with no thought of reward for yourself."],
    ["chlorophyll", "chlor", "green", "The pigment that gives leaves their color."],
    ["melanin", "melan", "dark", "The pigment that darkens skin in the sun."],
    ["erythrocyte", "eryth", "red", "A cell that gives blood its color."]
  ];
  const ROOT27P = ["ear", "word", "high", "root", "blood", "bone", "other", "green", "dark", "red"];
  const PREF27 = [["extra-", "extraordinary", "outside or beyond"], ["extra-", "extracurricular", "outside or beyond"], ["paleo-", "paleontology", "ancient"], ["paleo-", "paleolithic", "ancient"], ["geo-", "geology", "earth"], ["geo-", "geothermal", "earth"], ["eco-", "ecosystem", "home or environment"], ["eco-", "ecology", "home or environment"], ["socio-", "sociology", "society"], ["socio-", "socioeconomic", "society"]];
  const PREF27P = ["outside or beyond", "ancient", "earth", "home or environment", "society", "star"];
  const END27 = [
    ["antonym", "-onym", "name or word", "Hot and cold are an example of this pair."],
    ["acronym", "-onym", "name or word", "NASA and radar are examples."],
    ["oxygen", "-gen", "producing", "The gas we breathe in was named as the thing that 'makes acid'."],
    ["nitrogen", "-gen", "producing", "The most common gas in the air we breathe."],
    ["atmosphere", "-sphere", "ball or layer around", "The blanket of air around Earth."],
    ["biosphere", "-sphere", "ball or layer around", "All the parts of Earth where living things are found."],
    ["leukocyte", "-cyte", "cell", "A white blood ___ helps the body fight germs."],
    ["lymphocyte", "-cyte", "cell", "A tiny part of the immune system seen under a microscope."],
    ["osmosis", "-osis", "condition or process", "Water slowly moves through a thin membrane in this."],
    ["mitosis", "-osis", "condition or process", "The way one body cell divides into two."]
  ];
  const END27P = ["name or word", "producing", "ball or layer around", "cell", "condition or process", "fear of"];
  const HOMO27 = [
    ["The ancient musician played a ___.", "lyre", ["liar", "lier"]], ["A ___ is a person who does not tell the truth.", "liar", ["lyre", "lire"]],
    ["A chocolate ___ was served for dessert.", "torte", ["tort", "tourte"]], ["A ___ is a civil wrong that a court can fix.", "tort", ["torte", "tourt"]],
    ["A single ___ fell from the rose.", "petal", ["pedal", "pettle"]], ["Push the ___ to make the bike go.", "pedal", ["petal", "pedel"]],
    ["Each ___ of the cake was decorated with flowers.", "tier", ["tear", "tire"]], ["A single ___ rolled down her cheek.", "tear", ["tier", "tere"]],
    ["The dancer ___ across the stage.", "whirled", ["world", "whirld"]], ["She traveled all over the ___.", "world", ["whirled", "wurld"]],
    ["The ___ owned the castle and the farmland.", "baron", ["barren", "barron"]], ["The desert land was dry and ___.", "barren", ["baron", "baren"]],
    ["She climbed over the ___ in the fence.", "stile", ["style", "styl"]], ["Her ___ of writing is clear and warm.", "style", ["stile", "stiel"]],
    ["Builders plan to ___ the old shed.", "raze", ["raise", "rays"]], ["Please ___ your hand if you have a question.", "raise", ["raze", "rays"]]
  ];
  const MIS27 = [["deductible", ["deductable", "deductibel"]], ["sacrilegious", ["sacreligious", "sacrilegeous"]], ["withhold", ["withold", "wihthold"]], ["marriage", ["marraige", "mariage"]], ["memento", ["momento", "memmento"]], ["nauseous", ["nauseus", "nausious"]], ["nonchalant", ["nonchalent", "nonshalant"]], ["oblivious", ["oblivius", "obvlivious"]], ["permissible", ["permissable", "permisible"]], ["pursuit", ["persuit", "pursute"]], ["reminisce", ["reminis", "remenisce"]], ["resemblance", ["resemblence", "resemblanse"]], ["resistant", ["resistent", "resistint"]], ["sentinel", ["sentinal", "sentenel"]], ["thoroughly", ["thouroughly", "thoroghly"]]];
  const VOC27 = [
    ["enigmatic", "The <i>enigmatic</i> smile of the painting leaves viewers guessing.", "mysterious and puzzling", ["plain and obvious", "broad and cheerful"], "Viewers are left guessing."],
    ["equanimity", "He faced the bad news with <i>equanimity</i> and stayed calm.", "calm steadiness of mind", ["sudden fury", "great excitement"], "He stayed calm."],
    ["erudite", "The <i>erudite</i> professor could quote from hundreds of books.", "having great learning", ["knowing very little", "easily bored"], "She could quote hundreds of books."],
    ["exemplary", "Her <i>exemplary</i> behavior made her a model for the whole class.", "serving as a model", ["needing improvement", "surprising"], "She was a model for the class."],
    ["expedient", "Taking the shortcut was <i>expedient</i>, but it was not the fairest way.", "convenient for a purpose", ["very costly", "against the law"], "It was handy, but not fair."],
    ["extol", "Reviewers began to <i>extol</i> the film as the best of the year.", "praise highly", ["criticize harshly", "forget"], "They called it the best of the year."],
    ["fastidious", "The <i>fastidious</i> chef wiped the counter after every step.", "very careful about details and cleanliness", ["casual and messy", "slow and sleepy"], "He wiped the counter after every step."],
    ["furtive", "The cat gave a <i>furtive</i> glance before sneaking onto the table.", "secretive and sly", ["bold and open", "sleepy"], "It was sneaking."],
    ["hackneyed", "The movie's <i>hackneyed</i> plot had been used in hundreds of earlier films.", "overused and unoriginal", ["fresh and new", "confusing"], "It had been used in hundreds of films."],
    ["impetuous", "The <i>impetuous</i> shopper bought the first jacket she saw without thinking.", "acting quickly without thought", ["careful and slow", "generous"], "She bought it without thinking."],
    ["incessant", "The <i>incessant</i> rain lasted for six days without a break.", "never stopping", ["light and gentle", "rare"], "Six days without a break."],
    ["insidious", "The disease was <i>insidious</i>; it spread slowly and quietly before anyone noticed.", "spreading in a hidden, harmful way", ["loud and obvious", "quickly cured"], "It spread slowly and quietly."]
  ];
  const ANAT27 = [["aorta", ["aorda", "aortta"]], ["cartilage", ["cartilege", "cartlage"]], ["cerebellum", ["cerebelum", "cerebellem"]], ["cornea", ["cornia", "cornnea"]], ["ligament", ["ligiment", "ligement"]], ["pancreas", ["pancrius", "pancreus"]], ["retina", ["retinna", "retena"]], ["sternum", ["sternem", "stirnum"]], ["tendon", ["tendin", "tenden"]], ["trachea", ["trachia", "trakea"]], ["vertebrae", ["vertabrae", "vertebre"]], ["diaphragm", ["diaphram", "diafragm"]], ["hypothalamus", ["hypothalmus", "hipothalamus"]], ["thyroid", ["thyriod", "thyroyd"]], ["gallbladder", ["gallblader", "gallbladdar"]], ["lymphatic", ["lymphatik", "limphatic"]]];
  const SOC27 = [["demographic", ["demografic", "demographik"]], ["ethnicity", ["ethnisity", "ethnicitty"]], ["institution", ["instituion", "insitution"]], ["socialization", ["socialazation", "socilization"]], ["stratification", ["stratifcation", "stratificaton"]], ["urbanization", ["urbanizashun", "urbenization"]], ["subculture", ["subcultur", "subculchure"]], ["deviance", ["devience", "deviense"]], ["cohort", ["cohourt", "coheart"]], ["inequality", ["inequalty", "inequallity"]], ["kinship", ["kinshp", "kinnship"]], ["secular", ["seculer", "sekular"]], ["migration", ["migrashun", "migrasion"]], ["affluent", ["affluant", "afluent"]], ["hegemony", ["hegemoney", "hegamony"]], ["egalitarian", ["egalatarian", "egalitarean"]]];
  const LOOK27 = [
    ["The ___ child trusted everyone he met.", "ingenuous", ["ingenious", "ingenous"]], ["The ___ design solved the problem in one step.", "ingenious", ["ingenuous", "ingenius"]],
    ["Of the two plans, I prefer the ___.", "latter", ["later", "lattar"]], ["I will call you ___ this evening.", "later", ["latter", "lator"]],
    ["A large ___ of students attended the talk.", "number", ["amount", "numbr"]], ["A large ___ of water spilled on the floor.", "amount", ["number", "amunt"]],
    ["Doctors may ___ medicine for an infection.", "prescribe", ["proscribe", "prescibe"]], ["The new law will ___ smoking in school buildings.", "proscribe", ["prescribe", "proscibe"]],
    ["Please speak ___ to your elders.", "respectfully", ["respectively", "respectfuly"]], ["Anna and Ben are 8 and 10 years old, ___.", "respectively", ["respectfully", "respectivly"]],
    ["A sharp question can ___ even a calm speaker.", "discomfit", ["discomfort", "discomfet"]], ["The hard seat caused ___ during the long trip.", "discomfort", ["discomfit", "discomfert"]],
    ["The nurse tried to ___ her fears.", "allay", ["alley", "alay"]], ["A cat sat in the narrow ___.", "alley", ["allay", "ally"]],
    ["Her feelings ran the ___ from joy to sorrow.", "gamut", ["gambit", "gammut"]], ["Opening with a clever ___ put the opponent off balance.", "gambit", ["gamut", "gambet"]]
  ];
  const MULT27 = [
    ["bound", "The ship is <i>bound</i> for the southern coast.", "headed toward", ["required by duty", "tied up with rope"], "Think about where a ship is going."],
    ["culture", "The students studied the <i>culture</i> of ancient Egypt.", "the customs and arts of a society", ["bacteria grown in a lab", "good manners"], "It is about a whole society."],
    ["tender", "The cook simmered the beef until it was <i>tender</i>.", "soft and easy to chew", ["sore to the touch", "kind and gentle"], "It is about cooking."],
    ["stress", "A bridge must withstand the <i>stress</i> of heavy trucks.", "physical strain", ["feeling worried", "extra emphasis on a word"], "It is about engineering."],
    ["interest", "The bank pays <i>interest</i> on money kept in a savings account.", "money earned on savings", ["curiosity about something", "a favorite hobby"], "Banks pay it to people who keep money with them."],
    ["pitch", "The singer's <i>pitch</i> was perfect on every note.", "how high or low a sound is", ["a sales talk", "a throw of a ball"], "It is about music."],
    ["current", "The swimmer fought the strong <i>current</i>.", "a flow of water", ["happening now", "a flow of electricity"], "Swimmers struggle against it."],
    ["article", "The newspaper printed an <i>article</i> about the science fair.", "a piece of writing", ["a single object", "a word such as 'the'"], "Newspapers print them."],
    ["scale", "The map shows a <i>scale</i> of one inch to ten miles.", "a ratio used for size", ["a fish's outer plate", "a set of musical notes"], "Maps use it to show distances."],
    ["bank", "The picnic table sat on the <i>bank</i> of the river.", "the land beside a river", ["a place that keeps money", "a row of switches"], "The sentence names a river."]
  ];
  const CONF27 = [
    ["Calm words can ___ a tense argument.", "defuse", ["diffuse", "defuze"]], ["Light will ___ through the thin curtain.", "diffuse", ["defuse", "difuse"]],
    ["The answer stayed ___ no matter how hard she looked.", "elusive", ["illusive", "elusiv"]], ["The ___ promise of riches turned out to be false.", "illusive", ["elusive", "ilusive"]],
    ["The ___ outlaw was known for his crimes.", "infamous", ["famous", "infamus"]], ["The ___ actress won a major prize.", "famous", ["infamous", "famus"]],
    ["An ___ angle is wider than a right angle.", "obtuse", ["abstruse", "obtues"]], ["The ___ theory baffled almost everyone.", "abstruse", ["obtuse", "abstrus"]],
    ["She made a gloomy ___ about the weather.", "prophecy", ["prophesy", "prophesee"]], ["Some people claim they can ___ the future.", "prophesy", ["prophecy", "profesy"]],
    ["We would ___ called, but the phone was dead.", "have", ["of", "off"]], ["You are ___ to sign at the bottom.", "supposed", ["suppose", "supposted"]],
    ["We ___ to live near the river.", "used", ["use", "usd"]], ["The teacher's ___ helped with the field trip.", "aide", ["aid", "ade"]],
    ["Please ___ the injured player.", "aid", ["aide", "ayd"]], ["She should ___ studied earlier.", "have", ["of", "ov"]]
  ];
  const SENT27 = [
    ["The professor's explanation was ___; even the slowest student understood.", "lucid", ["obscure", "puzzling"]],
    ["The treaty was ___ by both nations, so it finally took effect.", "ratified", ["rejected", "forgotten"]],
    ["Unlike her ___ brother, she rarely spoke in meetings.", "garrulous", ["reserved", "timid"]],
    ["The scientist's ___ reasoning left no gaps in the argument.", "rigorous", ["sloppy", "casual"]],
    ["The ___ heat of the desert makes midday travel dangerous.", "sweltering", ["mild", "refreshing"]],
    ["The two witnesses gave ___ accounts, so the judge trusted their story.", "consistent", ["conflicting", "careless"]],
    ["She ___ the old rule and replaced it with a new one.", "abolished", ["kept", "repeated"]],
    ["A ___ of rainfall in the dry season made farming difficult.", "scarcity", ["surplus", "abundance"]],
    ["The ___ millionaire never gave interviews or appeared in public.", "reclusive", ["outgoing", "talkative"]],
    ["Though the plan seemed ___ at first, it turned out to be very practical.", "unrealistic", ["sensible", "popular"]]
  ];
  const ANA27 = [
    ["Entomology", "insects", "Seismology", "earthquakes", ["rocks", "stars"], "Each pair is a science and the thing it studies."],
    ["Scalpel", "surgeon", "Hammer", "carpenter", ["patient", "baker"], "Each pair is a tool and the worker who uses it."],
    ["Scarce", "plentiful", "Rigid", "flexible", ["stiff", "heavy"], "Each pair is a pair of opposites."],
    ["Hurricane", "storm", "Sonnet", "poem", ["song", "essay"], "Each pair is a kind of thing and the group it belongs to."],
    ["Letter", "word", "Word", "sentence", ["syllable", "vowel"], "Each pair is a part and the bigger thing built from it."],
    ["Detect", "notice", "Fabricate", "invent", ["destroy", "discover"], "Each pair is two words with almost the same meaning."],
    ["Drought", "rain", "Blackout", "electricity", ["darkness", "candles"], "Each pair is a problem and the thing that is missing."]
  ];
  const ETY27 = [
    ["The word <b>alphabet</b> comes from the names of the first two letters of the Greek alphabet. What are they?", "alpha and beta", ["delta and gamma", "omega and sigma"], "The word begins with the first letter's name."],
    ["The word <b>geometry</b> comes from Greek words meaning...", "earth measure", ["shape study", "line drawing"], "It first helped people measure land."],
    ["The word <b>tuxedo</b> comes from...", "Tuxedo Park, a place in New York", ["a French tailor's name", "the Latin word for formal"], "A place name became a clothing word."],
    ["The <b>cardigan</b> sweater is named after...", "an English earl", ["a Welsh sheep", "a French weaver"], "A person's title and name became a clothing word."],
    ["The word <b>Bluetooth</b> comes from the nickname of...", "a Danish king who united tribes", ["a famous inventor", "a Viking ship"], "The technology joins different devices, as he joined people."],
    ["The word <b>algorithm</b> comes from the name of...", "a Persian mathematician named al-Khwarizmi", ["a Greek philosopher", "a Roman general"], "A mathematician's name became a computer word."],
    ["The word <b>algebra</b> comes from the Arabic <i>al-jabr</i>, which meant...", "reuniting broken parts", ["counting by tens", "measuring land"], "Think of putting pieces of an equation back together."],
    ["The word <b>marathon</b> comes from a Greek town. What is the legend?", "a messenger ran from there to Athens with news", ["a king built a road there", "a famous poet lived there"], "A long run began in that place."],
    ["The word <b>gargoyle</b> comes from the French word for...", "throat", ["stone face", "rain"], "Water pours through the mouths of these stone carvings."]
  ];
  const PROOF27 = ["The [hypothises] was tested in the lab.", "A good scientist keeps [accurrate] records.", "Her [bibliograpy] listed twenty sources.", "The [phenominon] puzzled the researchers.", "He wrote a [thorogh] review of the book.", "The [sucess] of the project surprised everyone.", "We must [analize] the data carefully.", "The [principel] cause of the delay was the weather.", "She [recomended] the novel to her classmates.", "The team showed great [dedecation] all season.", "It is [imposible] to finish the essay tonight.", "The committee [eventualy] agreed on a plan."];
  const DICT27 = dictG([["accommodation", "The college offers free ___ for first-year students."], ["admissions", "The ___ office sent her a letter."], ["diploma", "She framed her ___."], ["enrollment", "___ opens in August."], ["freshman", "Every ___ must attend orientation."], ["interdisciplinary", "An ___ course mixes biology and history."], ["specialization", "Her ___ is marine biology."], ["tutorial", "The ___ explained each step."], ["verification", "The ___ of the results took a week."], ["academic", "Her ___ record is excellent."]]);
  const CALC27 = [["asymptote", ["asymtote", "asymptode"]], ["derivative", ["derivitive", "derivatave"]], ["differential", ["diferential", "differencial"]], ["exponential", ["exponencial", "expontial"]], ["integral", ["intagral", "integrel"]], ["converge", ["converje", "convirge"]], ["contrapositive", ["contrapositave", "contrapostive"]], ["corollary", ["corolary", "corollery"]], ["axiom", ["axeom", "axiomm"]], ["conjecture", ["conjecher", "conjeture"]], ["tautology", ["tautalogy", "tawtology"]], ["proposition", ["propostion", "proposision"]], ["permutation", ["permutashun", "permutaton"]], ["congruent", ["congruant", "congrouent"]], ["infinity", ["infinty", "infinaty"]], ["matrix", ["matrics", "mattrix"]], ["vector", ["vectur", "vecter"]]];
  const PL27 = [
    ["nucleus", "nuclei", ["nucleis", "nucleae"], "Latin words ending in -us often change to -i."],
    ["criterion", "criteria", ["criterias", "criteriums"], "Greek words ending in -on often change to -a."],
    ["phenomenon", "phenomena", ["phenomenas", "phenomenae"], "Greek words ending in -on often change to -a."],
    ["bacterium", "bacteria", ["bacterias", "bacteriums"], "Latin words ending in -um often change to -a."],
    ["alumnus", "alumni", ["alumnis", "alumnies"], "Latin words ending in -us often change to -i."],
    ["analysis", "analyses", ["analysises", "analysi"], "Greek words ending in -is often change to -es."],
    ["thesis", "theses", ["thesises", "thesi"], "Greek words ending in -is often change to -es."],
    ["hypothesis", "hypotheses", ["hypothesises", "hypothesi"], "Greek words ending in -is often change to -es."],
    ["crisis", "crises", ["crisises", "crisi"], "Greek words ending in -is often change to -es."],
    ["axis", "axes", ["axises", "axi"], "Greek and Latin words ending in -is often change to -es."],
    ["oasis", "oases", ["oasises", "oasi"], "Greek words ending in -is often change to -es."],
    ["larva", "larvae", ["larvas", "larvi"], "Latin words ending in -a sometimes change to -ae."],
    ["stimulus", "stimuli", ["stimulis", "stimulae"], "Latin words ending in -us often change to -i."],
    ["diagnosis", "diagnoses", ["diagnosises", "diagnosi"], "Greek words ending in -is often change to -es."],
    ["curriculum", "curricula", ["curriculae", "curriculi"], "Latin words ending in -um often change to -a."]
  ];

  const A27 = [
    L("Word roots 20", meaningG(ROOT27, ROOT27P, "root"),
      meanH("Example: the root <b>dent</b> means <b>tooth</b>, as in <i>dentist</i>. Find the meaning of yours the same way."),
      [S("Body roots", "ot · hem · oste · eryth", "<b>ot</b> = ear (otoscope), <b>hem</b> = blood (hemoglobin), <b>oste</b> = bone (osteopath), <b>eryth</b> = red (erythrocyte)."), S("Word roots", "lex · alt · altr", "<b>lex</b> = word (lexicon), <b>alt</b> = high (altitude), <b>altr</b> = other (altruism)."), S("Roots and colors", "radic · chlor · melan", "<b>radic</b> = root (eradicate means pull out by the roots). <b>chlor</b> = green (chlorophyll). <b>melan</b> = dark (melanin).")]),
    L("Prefixes extra-, paleo-, geo-, eco- and socio-", prefG(PREF27, PREF27P),
      prefH("Example: <b>bicycle</b> has two wheels, so <b>bi-</b> means two. Use your word the same way."),
      [S("Outside and ancient", "extra- · paleo-", "<b>extra-</b> means outside or beyond (extracurricular is outside the regular curriculum). <b>paleo-</b> means ancient (paleontology studies ancient life)."), S("Earth and home", "geo- · eco-", "<b>geo-</b> means earth (geology). <b>eco-</b> means home or environment (an ecosystem is a living community in its home)."), S("Society", "socio-", "<b>socio-</b> means society (sociology is the study of groups of people).")]),
    L("Word endings -onym, -gen, -sphere, -cyte and -osis", meaningG(END27, END27P, "ending"),
      meanH("Example: <b>-less</b> means without, as in <i>careless</i>. Find the meaning of your ending the same way."),
      [S("Names and makers", "-onym · -gen", "<b>-onym</b> means name or word (antonym, acronym). <b>-gen</b> means producing (oxygen, nitrogen)."), S("Layers and cells", "-sphere · -cyte", "<b>-sphere</b> means a ball or layer around (atmosphere). <b>-cyte</b> means cell (leukocyte)."), S("Processes", "-osis", "<b>-osis</b> means a condition or process (osmosis, mitosis).")]),
    L("Homophones 24", sentG(HOMO27),
      sentHints("Example: 'I will <b>wait</b> here' and 'the <b>weight</b> of a box'. Decide which meaning your sentence needs."),
      homoSlides("baron · barren · stile · style", "petal · pedal · tier · tear · whirled · world")),
    L("Commonly misspelled words 15", rightG(MIS27),
      misH("Example: <b>Wednesday</b> has a silent d and <b>government</b> has an n before the m. Check the middle of yours."),
      misSlides("de·duct·i·ble · sac·ri·le·gious", "per·mis·si·ble · re·sem·blance")),
    L("Academic vocabulary 3", vocG(VOC27), vocabH("Example: 'The <b>lengthy</b> movie lasted four hours' ➜ lengthy means very long, because of the four hours."), vocabSlides),
    L("Anatomy words", rightG(ANAT27),
      misH("Example: <b>muscle</b> has a silent c. Anatomy words come from Greek and Latin, so check the middle."),
      wordSlides("Words of the body", "Anatomy names the parts of the body, often with Greek and Latin words.", "car·ti·lage · cer·e·bel·lum", "hy·po·thal·a·mus · dia·phragm")),
    L("Sociology words", rightG(SOC27),
      misH("Example: <b>society</b> has a c that sounds like s. Many words about groups end in -ity, -tion or -ance."),
      wordSlides("Words about groups", "Sociology studies how people live and work together.", "de·mo·graph·ic · in·sti·tu·tion", "strat·i·fi·ca·tion · ur·ban·i·za·tion")),
    L("Look-alike words 6", sentG(LOOK27),
      sentHints("Example: <b>advice</b> is a noun ('good advice') and <b>advise</b> is a verb ('I advise you'). Decide what your sentence needs."),
      confSlides("ingenuous · ingenious · latter · later", "number · amount · prescribe · proscribe · allay · alley")),
    L("Words with several meanings 8", vocG(MULT27), vocabH("Example: 'The <b>bat</b> flew out of the cave' ➜ here bat is an animal, not a baseball tool."), multSlides),
    L("Commonly confused words in college writing 3", sentG(CONF27),
      sentHints("Example: <b>advice</b> is a noun ('good advice') and <b>advise</b> is a verb ('I advise you'). Decide what your sentence needs."),
      confSlides("defuse · diffuse · elusive · illusive", "infamous · famous · obtuse · abstruse · prophecy · prophesy")),
    L("Sentence completion 6", sentG(SENT27), ssH("Example: 'Because the soup was so ___, she added more salt' ➜ bland, because she wanted more flavor."), ssSlides),
    L("Word analogies 8", anaG(ANA27), anaH("Example: <b>fish : swim :: bird : fly</b>. A fish swims, so a bird flies. Now do yours."), anaSlides),
    L("Etymology 6: stories behind words", etyG(ETY27), etyH("Example: <b>sandwich</b> is named after the Earl of Sandwich, who liked to eat bread and meat while he worked. Now think about yours."),
      etySlides("alphabet · tuxedo · algorithm", "<b>Alphabet</b> joins the Greek letters alpha and beta. <b>Tuxedo</b> is named after Tuxedo Park in New York. <b>Algorithm</b> comes from the name of a Persian mathematician.")),
    L("Proofreading 17", proofG(PROOF27), proofH("Example: 'It was a <b>wierd</b> sound' ➜ 'wierd' should be 'weird'. Check each word like that."), proofSlides("🧐")),
    L("Listen and spell 23", tyG(DICT27), dictHints("Example: 'enthusiasm' = en + thu + si + asm. Write each part, then check the whole word."), dictSlides("ac·com·mo·da·tion · in·ter·dis·ci·plin·ar·y", "spe·cial·i·za·tion · ver·i·fi·ca·tion")),
    L("Calculus and logic words", rightG(CALC27),
      misH("Example: <b>equation</b> has a u after the q. Many math words end in -al, -ic or -em, so check the ending."),
      wordSlides("Words of higher math", "University math and logic use Greek and Latin words with unusual letter patterns.", "as·ymp·tote · de·riv·a·tive", "con·trap·o·si·tive · tau·tol·o·gy")),
    L("Plurals from Latin and Greek", plG(PL27),
      ["Many English words from Latin and Greek keep their old plural endings.", q => q.it[3], "Example: <b>datum</b> becomes <b>data</b> (-um changes to -a). Use the same kind of pattern for yours."],
      [S("Old plurals", "🏛️", "Some words keep the plural of their old language, so they do not just add -s."), S("Patterns", "-us ➜ -i · -um ➜ -a · -is ➜ -es", "<b>cactus</b> ➜ cacti. <b>datum</b> ➜ data. <b>basis</b> ➜ bases. <b>-on</b> often changes to <b>-a</b> too (<b>phenomenon</b> ➜ phenomena)."), S("Check the ending", "✅", "Say the plural aloud. Is the last syllable a long ee (-i), -ah (-a) or -eez (-es)? That sound shows the pattern.")])
  ];
  A27.push(MIX("Mixed practice", [A27[0], A27[3], A27[4], A27[5], A27[9], A27[14]]));
  A27.push(MIX("Level 27 Challenge", [A27[1], A27[2], A27[6], A27[7], A27[8], A27[10], A27[11], A27[12], A27[13], A27[15], A27[16], A27[17]]));

  Object.assign(SPELL_LEVELS, { 25: A25, 26: A26, 27: A27 });
})();
