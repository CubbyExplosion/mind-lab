// ext/spelling-28-30.js : Spelling & Words, levels 28-30 (College year 1 second half, College year 2).
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
  // LEVEL 28 (College year 1, second half)
  // =================================================================
  const ROOT28 = [
    ["chronology", "chron", "time", "A list of events in the order they happened."],
    ["metamorphosis", "morph", "shape", "A caterpillar goes through this big change of form."],
    ["mortality", "mort", "death", "Hospitals track this rate to see how many patients do not survive an illness."],
    ["insomnia", "somn", "sleep", "Lying awake in bed all night with your eyes wide open."],
    ["jurisdiction", "jur", "law", "The area where a court has the power to decide cases."],
    ["eloquent", "loqu", "speak", "A talk so graceful and moving that the whole hall listened closely."],
    ["philanthropist", "anthrop", "human", "A donor who gives money to help people in need."],
    ["gratitude", "grat", "pleasing", "The warm feeling you have after a friend does you a big favor."],
    ["confluence", "flu", "flow", "The spot where two rivers join into one."],
    ["prenatal", "nat", "birth", "Doctor visits for a mother before her baby arrives."],
    ["maternal", "mater", "mother", "Describes the side of the family that your mom's relatives belong to."],
    ["paternity", "pater", "father", "The state of being a dad, as in paternity leave."],
    ["conscience", "sci", "know", "The inner sense that tells you something is right or wrong."]
  ];
  const ROOT28P = ["time", "shape", "death", "sleep", "law", "speak", "human", "pleasing", "flow", "birth", "mother", "father", "know"];
  const PREF28 = [["apo-", "apogee", "away from"], ["apo-", "apostrophe", "away from"], ["ortho-", "orthodontist", "straight or correct"], ["ortho-", "orthography", "straight or correct"], ["quasi-", "quasi-official", "seemingly"], ["quasi-", "quasi-scientific", "seemingly"], ["tetra-", "tetrahedron", "four"], ["tetra-", "tetrapod", "four"], ["octo-", "octopus", "eight"], ["octo-", "octagon", "eight"]];
  const PREF28P = ["away from", "straight or correct", "seemingly", "four", "eight", "three", "six"];
  const END28 = [
    ["laboratory", "-ory", "place for", "Scientists run tests and experiments here."],
    ["dormitory", "-ory", "place for", "Students sleep here on a college campus."],
    ["observatory", "-ory", "place for", "Astronomers watch the sky from this building."],
    ["assistant", "-ant", "one who or that which", "Someone who helps a boss."],
    ["participant", "-ant", "one who or that which", "A person who takes part in a study."],
    ["consultant", "-ant", "one who or that which", "An expert hired to give advice."],
    ["simplify", "-ify", "to make", "Rewrite a hard sentence in easier words."],
    ["purify", "-ify", "to make", "What a filter does to muddy water."],
    ["molecule", "-cule", "small", "A tiny group of atoms joined together."],
    ["follicle", "-cle", "small", "A tiny pocket in the skin from which a hair grows."],
    ["creative", "-ive", "tending to", "A person full of fresh ideas has this quality."],
    ["decisive", "-ive", "tending to", "A leader who chooses quickly and firmly."]
  ];
  const END28P = ["place for", "one who or that which", "to make", "small", "tending to", "without", "full of"];
  const HOMO28 = [
    ["The tourists wandered through the busy ___ in the old city.", "bazaar", ["bizarre", "bazar"]], ["The magician's trick was truly ___.", "bizarre", ["bazaar", "bizzare"]],
    ["The computer stores a ___ of recent files.", "cache", ["cash", "cach"]], ["He paid in ___ at the counter.", "cash", ["cache", "cashe"]],
    ["Please wait in the ___ for the ticket window.", "queue", ["cue", "qeue"]], ["The actor waited for his ___ to enter the stage.", "cue", ["queue", "kew"]],
    ["Nothing could ___ the calm pilot.", "faze", ["phase", "fase"]], ["The moon passes through each ___ every month.", "phase", ["faze", "fase"]],
    ["She has a ___ for designing bold hats.", "flair", ["flare", "flaire"]], ["The rescuers shot a ___ into the night sky.", "flare", ["flair", "flaer"]],
    ["The medicine will ___ the pain.", "lessen", ["lesson", "lessan"]], ["The teacher gave a ___ on fractions.", "lesson", ["lessen", "lessin"]],
    ["The ___ officer saluted the captain.", "naval", ["navel", "nayval"]], ["The baby's ___ healed quickly.", "navel", ["naval", "navle"]],
    ["The street vendor will ___ lemonade at the fair.", "peddle", ["pedal", "pedle"]], ["She had to ___ hard to climb the hill.", "pedal", ["peddle", "pedel"]],
    ["The gift was ___ in blue paper.", "wrapped", ["rapt", "rapped"]], ["The crowd listened, ___ with attention.", "rapt", ["wrapped", "rappt"]],
    ["There is a ___ chance of rain today.", "slight", ["sleight", "slite"]], ["The magician amazed us with quick ___ of hand.", "sleight", ["slight", "slite"]],
    ["The bike stayed ___ on its stand.", "stationary", ["stationery", "stationarey"]], ["She bought pens and paper at the ___ shop.", "stationery", ["stationary", "stationerry"]],
    ["He showed great ___ when he handled the angry customer.", "tact", ["tacked", "tackt"]], ["She ___ the poster to the wall.", "tacked", ["tact", "tackt"]]
  ];
  const MIS28 = [["acquaintance", ["aquaintance", "acquaintence"]], ["bureaucracy", ["beaurocracy", "bureaucrasy"]], ["conscientious", ["consciencious", "conscientous"]], ["connoisseur", ["connoiseur", "conoisseur"]], ["entrepreneur", ["entreprenuer", "entrepeneur"]], ["guarantee", ["garantee", "guarentee"]], ["harassment", ["harrassment", "harasment"]], ["hierarchy", ["heirarchy", "hierarcy"]], ["idiosyncrasy", ["idiosyncracy", "idiosyncrasie"]], ["lieutenant", ["leutenant", "lieutenent"]], ["maintenance", ["maintainance", "maintenence"]], ["mischievous", ["mischievious", "mischevous"]], ["questionnaire", ["questionaire", "questionnare"]], ["rhythm", ["rythm", "rhythem"]], ["surveillance", ["surveilance", "surveillence"]], ["threshold", ["threshhold", "thresold"]], ["unanimous", ["unanamous", "unanimus"]], ["withhold", ["withold", "withhould"]]];
  const ACAD28 = [
    ["ambiguous", "The <i>ambiguous</i> instructions could be read in two different ways.", "open to more than one meaning", ["perfectly clear", "very long"], "The instructions could be read in two ways."],
    ["coherent", "Her essay was <i>coherent</i>, with each paragraph leading naturally to the next.", "logical and well connected", ["full of errors", "very short"], "Each paragraph leads to the next."],
    ["conjecture", "Without data, their idea about the ancient road was only <i>conjecture</i>.", "a guess without proof", ["a proven law", "a final report"], "There was no data to back it up."],
    ["corroborate", "A second witness could <i>corroborate</i> her story.", "support with evidence", ["deny completely", "forget quickly"], "A second witness adds backing."],
    ["discrepancy", "There was a <i>discrepancy</i> between the two reports of the experiment.", "a difference between things that should match", ["a perfect copy", "a new discovery"], "Two reports of the same results did not agree."],
    ["empirical", "The theory needs <i>empirical</i> evidence from careful experiments.", "based on observation or experiment", ["based on rumor", "based on opinion"], "Careful experiments are mentioned."],
    ["exacerbate", "Skipping meals will only <i>exacerbate</i> your headache.", "make worse", ["cure", "explain"], "Skipping meals does not help the headache."],
    ["inherent", "Some risk is <i>inherent</i> in every business.", "a natural, permanent part", ["completely absent", "added by accident"], "Every business has it from the very start."],
    ["juxtapose", "The museum chose to <i>juxtapose</i> an old painting with a modern one.", "place together to compare", ["hide behind a curtain", "sell for money"], "Two paintings from different times are put near each other."],
    ["nuance", "A good translator notices every <i>nuance</i> of meaning.", "a subtle shade of difference", ["a loud mistake", "a long list"], "Good translators notice very small details of meaning."],
    ["paradigm", "The discovery shifted the <i>paradigm</i> of how scientists viewed the universe.", "a model or pattern of thinking", ["a small mistake", "a kind of instrument"], "It is about the big picture of how scientists think."],
    ["plausible", "Her excuse sounded <i>plausible</i>, so the teacher believed her.", "believable and reasonable", ["impossible to hear", "extremely rude"], "The teacher accepted it."],
    ["pragmatic", "A <i>pragmatic</i> leader picks the plan that works, not the one that sounds grand.", "practical and realistic", ["dreamy and unrealistic", "angry and impatient"], "The plan that works beats the grand one."],
    ["substantiate", "Can you <i>substantiate</i> your claim with a source?", "back up with proof", ["state again loudly", "take back"], "A source is being asked for."],
    ["tenuous", "The link between the two events was <i>tenuous</i>.", "weak and thin", ["strong and clear", "long and famous"], "Think of a thread that could snap."],
    ["viable", "The team found a <i>viable</i> plan to finish on time.", "able to work successfully", ["too costly to try", "already finished"], "The plan could be carried out."]
  ];
  const LING28 = [["phoneme", ["fonem", "phonem"]], ["morpheme", ["morfeme", "morpheem"]], ["syntax", ["sintax", "syntaks"]], ["semantics", ["symantics", "semantiks"]], ["dialect", ["dialekt", "dialact"]], ["lexicon", ["lexacon", "lexikon"]], ["phonetics", ["fonetics", "phonitics"]], ["inflection", ["inflecktion", "inflaction"]], ["vernacular", ["vernakular", "vernaccular"]], ["pidgin", ["pidgen", "pigdin"]], ["creole", ["creol", "kreole"]], ["diphthong", ["dipthong", "difthong"]], ["articulation", ["articulashun", "artikulation"]], ["bilingual", ["bilingul", "billingual"]]];
  const EDU28 = [["curriculum", ["curiculum", "curriculem"]], ["pedagogy", ["pedagogie", "padagogy"]], ["syllabus", ["sylabus", "syllubus"]], ["assessment", ["assesment", "asessment"]], ["literacy", ["litteracy", "literasy"]], ["rubric", ["rubrick", "rubrik"]], ["seminar", ["seminer", "semminar"]], ["practicum", ["practicim", "practikum"]], ["accreditation", ["acreditation", "accredetation"]], ["prerequisite", ["prerequesite", "prerequisit"]], ["semester", ["semestre", "semmester"]], ["transcript", ["transcrip", "transcrpt"]], ["undergraduate", ["undergradute", "undergradutate"]], ["kinesthetic", ["kinesthetik", "kinasthetic"]]];
  const LOOK28 = [
    ["The teacher tried to ___ answers from the shy class.", "elicit", ["illicit", "elisit"]], ["Selling stolen goods is an ___ act.", "illicit", ["elicit", "ilicit"]],
    ["A storm is ___, so bring the picnic indoors.", "imminent", ["eminent", "iminent"]], ["The ___ scientist won a major prize.", "eminent", ["imminent", "emenent"]],
    ["The spy was careful and ___ about her plans.", "discreet", ["discrete", "discreat"]], ["The data fell into three ___ groups.", "discrete", ["discreet", "discrette"]],
    ["Only ___ may enter the staff room.", "personnel", ["personal", "personel"]], ["Keep your ___ belongings in a locker.", "personal", ["personnel", "personall"]],
    ["A green light tells cars they may ___.", "proceed", ["precede", "procede"]], ["A title page will ___ the main text.", "precede", ["proceed", "preceed"]],
    ["The prosecutor will ___ the case in court.", "prosecute", ["persecute", "prosecut"]], ["It is wrong to ___ people for their beliefs.", "persecute", ["prosecute", "persicute"]],
    ["A ___ student visited the campus for a tour.", "prospective", ["perspective", "prospectiv"]], ["From my ___, the plan looks risky.", "perspective", ["prospective", "prespective"]],
    ["From her tone, I ___ that she was unhappy.", "infer", ["imply", "inver"]], ["By raising her eyebrows, she meant to ___ doubt.", "imply", ["infer", "impli"]],
    ["The doctor prescribed a daily exercise ___.", "regimen", ["regiment", "regimin"]], ["The army ___ marched past the flag.", "regiment", ["regimen", "regement"]]
  ];
  const MULT28 = [
    ["interest", "The bank pays three percent <i>interest</i> on savings.", "money paid for the use of money", ["curiosity about something", "a hobby"], "It is about a bank."],
    ["plot", "The farmer sold a small <i>plot</i> beside the river.", "a small piece of land", ["the storyline of a novel", "a secret plan"], "A farmer and a river suggest an outdoor area."],
    ["scale", "Use the <i>scale</i> to weigh the flour.", "a device for weighing", ["a fish's skin plate", "a series of musical notes"], "Flour is being weighed."],
    ["draft", "The wind made a cold <i>draft</i> across the room.", "a current of air", ["a first version of writing", "a call-up to serve"], "It is about the temperature inside a room."],
    ["foot", "She left the book at the <i>foot</i> of the stairs.", "the bottom", ["a unit of twelve inches", "the body part for walking"], "Stairs go up from a lowest point."],
    ["stake", "The company has a large <i>stake</i> in the project.", "a share or interest", ["a pointed wooden post", "a type of meat dish"], "A company is invested in the project."],
    ["yield", "The farm's corn <i>yield</i> was higher this year.", "the amount produced", ["to give way", "a road sign"], "This year's corn crop is being measured."],
    ["fine", "The library charged a <i>fine</i> for the late book.", "money paid as a penalty", ["of very good quality", "thin and delicate"], "The book was returned late."],
    ["table", "The committee voted to <i>table</i> the proposal until next month.", "set aside for later", ["list in rows", "serve food"], "The vote delays the proposal."],
    ["fair", "The judge was <i>fair</i> to both sides.", "treating everyone the same way", ["light in color", "a carnival with rides"], "Both sides got the same treatment."],
    ["current", "The <i>current</i> of the river carried the leaf away.", "a steady flow of water", ["happening now", "a small dried berry"], "A leaf is being carried along."],
    ["mean", "The <i>mean</i> of 4, 6 and 8 is 6.", "the average", ["unkind", "to intend"], "It is a number found by adding and then sharing equally."],
    ["novel", "Her <i>novel</i> approach solved the old puzzle.", "new and original", ["a long book of fiction", "very old"], "It solved an old puzzle in a different way."]
  ];
  const CONF28 = [
    ["The speaker will ___ to the old poem in her talk.", "allude", ["elude", "alude"]], ["The fox managed to ___ the hunters.", "elude", ["allude", "elood"]],
    ["She felt a thrill during the ___ up the mountain.", "ascent", ["assent", "ascend"]], ["He nodded to show his ___ to the plan.", "assent", ["ascent", "asent"]],
    ["The detective found the witness reliable and ___.", "credible", ["credulous", "credable"]], ["The ___ buyer believed every false claim.", "credulous", ["credible", "credilous"]],
    ["People who ___ from a country leave it for good.", "emigrate", ["immigrate", "emigrait"]], ["Many families ___ to Canada each year.", "immigrate", ["emigrate", "imigrate"]],
    ["The ___ of illness dropped last year.", "incidence", ["incident", "incidents"]], ["A small ___ delayed the train.", "incident", ["incidence", "incidant"]],
    ["Reading the ___ for the decision helped me understand it.", "rationale", ["rational", "rationnale"]], ["A ___ person weighs facts before choosing.", "rational", ["rationale", "rashional"]],
    ["Do not ___ the safety rules.", "flout", ["flaunt", "flowt"]], ["Do not ___ your wealth to others.", "flaunt", ["flout", "flawnt"]],
    ["The path was ___, full of twists and turns.", "tortuous", ["torturous", "tortous"]], ["The long wait in the heat was ___.", "torturous", ["tortuous", "torchurous"]],
    ["The ___ judge had no stake in the case.", "disinterested", ["uninterested", "disinterrested"]], ["He was ___ in the lecture and yawned.", "uninterested", ["disinterested", "unintrested"]],
    ["There were ___ mistakes this time than last.", "fewer", ["less", "fewar"]], ["There is ___ water in the lake now.", "less", ["fewer", "lessr"]]
  ];
  const SENT28 = [
    ["The scientist's findings were ___; no other lab could repeat them.", "dubious", ["settled", "exciting"]],
    ["Although the plan seemed ___ at first, it turned out to be simple.", "daunting", ["trivial", "pleasant"]],
    ["The senator's speech was so ___ that half the audience fell asleep.", "tedious", ["thrilling", "brief"]],
    ["Unlike her ___ brother, Maya spoke up in every meeting.", "reticent", ["talkative", "generous"]],
    ["The mayor's ___ promises convinced no one, because he had broken so many before.", "hollow", ["sincere", "binding"]],
    ["The glacier retreated ___, a few meters every year.", "gradually", ["suddenly", "noisily"]],
    ["Her ___ attention to detail caught every error in the contract.", "meticulous", ["careless", "casual"]],
    ["Despite the ___ weather, the hikers pressed on.", "inclement", ["balmy", "pleasant"]],
    ["The new law was designed to ___ pollution in the river.", "curb", ["encourage", "ignore"]],
    ["The twins were so ___ that even their parents confused them.", "indistinguishable", ["unmistakable", "unforgettable"]],
    ["Because the evidence was ___, the jury could not reach a decision.", "inconclusive", ["overwhelming", "ready"]],
    ["His ___ remarks hurt her feelings.", "caustic", ["flattering", "thoughtful"]]
  ];
  const NUT28 = [["carbohydrate", ["carbohydrait", "carbohidrate"]], ["cholesterol", ["colesterol", "cholesteral"]], ["metabolism", ["metabolizm", "metabalism"]], ["antioxidant", ["antioxident", "antioxidunt"]], ["calorie", ["calorrie", "calary"]], ["nutrient", ["nutriant", "nutrent"]], ["aerobic", ["arobic", "aerobick"]], ["anaerobic", ["anarobic", "anaerobick"]], ["cardiovascular", ["cardiovasular", "cardiovascuiar"]], ["hydration", ["hidration", "hydrashun"]], ["supplement", ["suplement", "suppliment"]], ["glucose", ["glucouse", "gloucose"]], ["rehabilitation", ["rehabilitaton", "reabilitation"]], ["endurance", ["endurence", "endurunce"]]];
  const ANA28 = [
    ["Ornithology", "birds", "Herpetology", "reptiles", ["fish", "trees"], "Each pair is a science and the animals it studies."],
    ["Pharmacist", "medicine", "Cartographer", "maps", ["books", "rocks"], "Each pair is a worker and the thing the worker prepares or deals with."],
    ["Whisper", "shout", "Drizzle", "downpour", ["puddle", "umbrella"], "Each pair shows a gentle version and a very strong version of the same thing."],
    ["Thermometer", "temperature", "Barometer", "air pressure", ["rainfall", "wind speed"], "Each pair is an instrument and what it measures."],
    ["Prologue", "beginning", "Epilogue", "ending", ["middle", "title"], "Each pair is a part of a book and where it sits."],
    ["Cacophony", "harmony", "Chaos", "order", ["noise", "trouble"], "Each pair are opposites."],
    ["Painter", "brush", "Sculptor", "chisel", ["canvas", "clay"], "Each pair is an artist and a main tool."],
    ["Mile", "distance", "Hour", "time", ["clock", "speed"], "Each pair is a unit and the thing it measures."],
    ["Author", "manuscript", "Composer", "score", ["piano", "concert"], "Each pair is a creator and the written work they produce."],
    ["Hungry", "ravenous", "Tired", "exhausted", ["rested", "bored"], "Each pair shows an ordinary feeling and a much stronger feeling."],
    ["Judge", "courtroom", "Surgeon", "operating room", ["classroom", "kitchen"], "Each pair is a worker and the place where the work is done."],
    ["Fossil", "paleontologist", "Star", "astronomer", ["chemist", "poet"], "Each pair is a thing and the expert who studies it."]
  ];
  const ETY28 = [
    ["The word <b>quarantine</b> comes from an Italian phrase about how many days of waiting?", "forty days", ["ten days", "one hundred days"], "The number is between thirty and fifty."],
    ["The word <b>salary</b> comes from the Latin word for...", "salt", ["gold", "bread"], "It is a common kitchen seasoning."],
    ["<b>Tantalize</b> comes from King Tantalus of Greek myth, whose food always moved just out of reach. To tantalize means to...", "tease with something out of reach", ["feed generously", "hide carefully"], "The king could see the fruit but never get it."],
    ["The word <b>boycott</b> is named after Captain Boycott, an Irish land agent in the 1880s. His neighbors...", "refused to deal with him", ["gave him gifts", "elected him mayor"], "He was shunned by the community."],
    ["The word <b>muscle</b> comes from Latin <i>musculus</i>, meaning a little...", "mouse", ["bird", "snake"], "Picture a muscle rippling under the skin like a small animal under a blanket."],
    ["The word <b>disaster</b> comes from Italian roots meaning 'bad...'", "star", ["luck", "weather"], "Ancient people looked to the night sky to explain misfortune."],
    ["<b>Nostalgia</b> comes from Greek words meaning 'return home' and...", "pain", ["joy", "map"], "Homesick people feel it deeply."],
    ["<b>Trivia</b> comes from Latin words meaning 'three roads'. Long ago, such places were where people...", "chatted about small matters", ["built forts", "held big markets"], "Small talk happened at busy crossings."],
    ["<b>Pedigree</b> comes from French <i>pied de grue</i>, meaning a crane's...", "foot", ["wing", "beak"], "Family trees have branching lines that look like a bird's track."],
    ["The word <b>maverick</b> is named after Samuel Maverick, a Texas rancher who...", "did not brand his cattle", ["sold his land", "fenced his farm"], "Other ranchers marked their animals; he did not."]
  ];
  const PROOF28 = ["The [bureacracy] slowed the approval of the permit.", "She was [conscientous] about every deadline.", "The [questionaire] had twenty items.", "A [threshhold] marks the edge of a doorway.", "The company offered a [guarentee] on every product.", "The [heirarchy] of the organization was clear.", "The students reached a [unanamous] decision.", "He was a [connoiseur] of fine art.", "Security [surveilence] cameras covered the lot.", "Her [mischevious] grin gave her away.", "The [maintainance] crew arrived at dawn.", "The [entrepeneur] launched her company.", "The [lieutenent] gave the order.", "An [acquaintence] introduced them.", "The manager did not [withold] the news.", "Her [rythm] on the drums was steady."];
  const DICT28 = dictG([["bureaucracy", "The ___ required six signatures."], ["entrepreneur", "The young ___ opened a bakery."], ["questionnaire", "Please fill out the ___."], ["conscientious", "A ___ student rarely misses a deadline."], ["hierarchy", "The ___ of the company has five levels."], ["surveillance", "Cameras provided ___ of the parking lot."], ["connoisseur", "A ___ of tea can taste small differences."], ["maintenance", "Regular ___ keeps the car running."], ["acquaintance", "He is an ___ from my chemistry class."], ["idiosyncrasy", "Humming while he works is his ___."], ["guarantee", "The store offers a money-back ___."], ["threshold", "She paused at the ___ of the door."]]);
  const ASTRO28 = [["nebula", ["nebbula", "nebulla"]], ["supernova", ["supernovah", "supernuva"]], ["constellation", ["constelation", "constellashun"]], ["exoplanet", ["exoplannet", "exsoplanet"]], ["redshift", ["redshif", "redshifft"]], ["quasar", ["quasarr", "kwasar"]], ["pulsar", ["pulsor", "pulsarr"]], ["parallax", ["paralax", "parallex"]], ["luminosity", ["luminocity", "luminosty"]], ["cosmology", ["cosmalogy", "cosmolagy"]], ["interstellar", ["interstelar", "intrastellar"]], ["magnetosphere", ["magnetospere", "magnitosphere"]], ["singularity", ["singularitty", "singulerity"]], ["asteroid", ["asteriod", "asterroid"]]];

  const A28 = [
    L("Word roots 21", meaningG(ROOT28, ROOT28P, "root"),
      meanH("Example: the root <b>dent</b> means <b>tooth</b>, as in <i>dentist</i>. Find the meaning of yours the same way."),
      [S("Roots of time and change", "chron · morph · mort · somn", "<b>chron</b> = time (chronicle), <b>morph</b> = shape (morphology), <b>mort</b> = death (mortal), <b>somn</b> = sleep (somnolent)."), S("Roots of speech and people", "jur · loqu · anthrop · grat", "<b>jur</b> = law or swear (jury), <b>loqu</b> = speak (loquacious), <b>anthrop</b> = human (anthropology), <b>grat</b> = pleasing (gratify)."), S("Flow, birth and family", "flu · nat · mater · pater · sci", "<b>flu</b> = flow (fluid), <b>nat</b> = birth (native), <b>mater</b> = mother, <b>pater</b> = father, <b>sci</b> = know (science).")]),
    L("Prefixes apo-, ortho-, quasi-, tetra- and octo-", prefG(PREF28, PREF28P),
      prefH("Example: <b>bicycle</b> has two wheels, so <b>bi-</b> means two. Use your word the same way."),
      [S("Away and straight", "apo- · ortho-", "<b>apo-</b> means away from (apogee is the point farthest from Earth). <b>ortho-</b> means straight or correct (orthodontists straighten teeth)."), S("Seeming", "quasi-", "<b>quasi-</b> means seemingly or almost. A quasi-official group looks official but is not quite."), S("Four and eight", "tetra- · octo-", "<b>tetra-</b> means four (a tetrahedron has four faces). <b>octo-</b> means eight (an octopus has eight arms).")]),
    L("Word endings -ory, -ant, -ify, -cle and -ive", meaningG(END28, END28P, "ending"),
      meanH("Example: <b>-less</b> means without, as in <i>careless</i>. Find the meaning of your ending the same way."),
      [S("Places and people", "-ory · -ant", "<b>-ory</b> means a place for something (laboratory). <b>-ant</b> names one who does something (assistant)."), S("Making and tiny", "-ify · -cle", "<b>-ify</b> means to make (purify means to make pure). <b>-cule</b> or <b>-cle</b> means small (molecule, follicle)."), S("Tending to", "-ive", "<b>-ive</b> means tending to do something. A <i>creative</i> person tends to create.")]),
    L("Homophones 25", sentG(HOMO28),
      sentHints("Example: 'I will <b>wait</b> here' and 'the <b>weight</b> of a box'. Decide which meaning your sentence needs."),
      homoSlides("bazaar · bizarre · cache · cash · queue · cue", "faze · phase · flair · flare · lessen · lesson · naval · navel")),
    L("Commonly misspelled words 16", rightG(MIS28),
      misH("Example: <b>Wednesday</b> has a silent d and <b>government</b> has an n before the m. Check the middle of yours."),
      misSlides("con·sci·en·tious · ac·quain·tance", "en·tre·pre·neur · hi·er·ar·chy")),
    L("Academic vocabulary 4", vocG(ACAD28), vocabH("Example: 'The <b>bat</b> flew out of the cave' ➜ here bat is an animal, not a baseball tool."), vocabSlides),
    L("Linguistics words", rightG(LING28),
      misH("Example: <b>rhythm</b> has no vowel except y, so check the h's. Many language-science words have ph, y or th in them."),
      wordSlides("The science of language", "Linguists study how people speak, build sentences and change words over time.", "pho·neme · mor·pheme", "se·man·tics · ver·nac·u·lar")),
    L("Education and teaching words", rightG(EDU28),
      misH("Example: <b>calendar</b> ends in -ar, not -er. Check the middle and the ending of yours."),
      wordSlides("Words of the classroom", "Teachers and college students use many special words about learning.", "cur·ric·u·lum · syl·la·bus", "pre·req·ui·site · prac·ti·cum")),
    L("Look-alike words 7", sentG(LOOK28),
      sentHints("Example: <b>advice</b> is a noun ('good advice') and <b>advise</b> is a verb ('I advise you'). Decide what your sentence needs."),
      confSlides("elicit · illicit · eminent · imminent", "discreet · discrete · personnel · personal · precede · proceed")),
    L("Words with several meanings 9", vocG(MULT28), vocabH("Example: 'The <b>bat</b> flew out of the cave' ➜ here bat is an animal, not a baseball tool."), multSlides),
    L("Commonly confused words in college writing 4", sentG(CONF28),
      sentHints("Example: <b>advice</b> is a noun ('good advice') and <b>advise</b> is a verb ('I advise you'). Decide what your sentence needs."),
      confSlides("allude · elude · ascent · assent", "credible · credulous · emigrate · immigrate · flout · flaunt")),
    L("Sentence completion 7", sentG(SENT28), ssH("Example: 'Because the soup was so ___, she added more salt' ➜ bland, because she wanted more flavor."), ssSlides),
    L("Nutrition and fitness words", rightG(NUT28),
      misH("Example: <b>vitamin</b> has an i in both the first and the last syllable. Check the vowels in yours."),
      wordSlides("Food and exercise science", "Sports scientists and dietitians use many long Greek and Latin words.", "car·bo·hy·drate · cho·les·ter·ol", "an·aer·o·bic · car·dio·vas·cu·lar")),
    L("Word analogies 9", anaG(ANA28), anaH("Example: <b>fish : swim :: bird : fly</b>. A fish swims, so a bird flies. Now do yours."), anaSlides),
    L("Etymology 7: stories behind words", etyG(ETY28), etyH("Example: <b>sandwich</b> is named after the Earl of Sandwich, who liked to eat bread and meat while he worked. Now think about yours."),
      etySlides("quarantine · salary · boycott", "<b>Quarantine</b> comes from the Italian for forty days. <b>Salary</b> comes from the Latin word for salt. <b>Boycott</b> is named after a land agent whose neighbors shunned him.")),
    L("Proofreading 18", proofG(PROOF28), proofH("Example: 'It was a <b>wierd</b> sound' ➜ 'wierd' should be 'weird'. Check each word like that."), proofSlides("🧐")),
    L("Listen and spell 24", tyG(DICT28), dictHints("Example: 'enthusiasm' = en + thu + si + asm. Write each part, then check the whole word."), dictSlides("bu·reau·cra·cy · en·tre·pre·neur", "ques·tion·naire · sur·veil·lance")),
    L("Astrophysics words", rightG(ASTRO28),
      misH("Example: <b>galaxy</b> has an x and ends in -y. Check the middle of yours, where Greek and Latin letters hide."),
      wordSlides("Words of the universe", "Astronomers borrow many words from Latin and Greek for stars, light and space.", "su·per·no·va · con·stel·la·tion", "par·al·lax · lu·mi·nos·i·ty"))
  ];
  A28.push(MIX("Mixed practice", [A28[0], A28[1], A28[3], A28[4], A28[8], A28[14]]));
  A28.push(MIX("Level 28 Challenge", [A28[2], A28[5], A28[6], A28[7], A28[9], A28[10], A28[11], A28[12], A28[13], A28[15], A28[16], A28[17]]));

  // =================================================================
  // LEVEL 29 (College year 2, first half)
  // =================================================================
  const ROOT29 = [
    ["gerontology", "ger", "old age", "The study of people as they grow into later years."],
    ["nutrition", "nutri", "feed", "What a dietitian studies to plan healthy meals."],
    ["cognitive", "cogn", "know", "Describes mental skills such as thinking, remembering and learning."],
    ["vitality", "vit", "life", "Energy and liveliness, as in a healthy athlete."],
    ["arboretum", "arbor", "tree", "A garden where many kinds of woody plants are grown and labeled."],
    ["aviary", "avi", "bird", "A large enclosure at a zoo for feathered creatures."],
    ["apiary", "api", "bee", "A place where hives are kept for making honey."],
    ["convention", "ven", "come", "A gathering where many people arrive for a big event."],
    ["temporary", "tempor", "time", "Lasting only for a short while, not forever."],
    ["population", "popul", "people", "The total count living in a city or country."],
    ["nomenclature", "nomen", "name", "The set of official labels used in a science."],
    ["terminate", "termin", "end", "What you do when you cancel a contract completely."]
  ];
  const ROOT29P = ["old age", "feed", "know", "life", "tree", "bird", "bee", "come", "time", "people", "name", "end"];
  const PREF29 = [["tri-", "triathlon", "three"], ["tri-", "tripod", "three"], ["uni-", "unicycle", "one"], ["uni-", "unify", "one"], ["demi-", "demigod", "half"], ["demi-", "demitasse", "half"], ["sesqui-", "sesquicentennial", "one and a half"], ["sesqui-", "sesquipedalian", "one and a half"], ["hexa-", "hexagon", "six"], ["hexa-", "hexapod", "six"]];
  const PREF29P = ["three", "one", "half", "one and a half", "six", "four", "two"];
  const END29 = [
    ["monetize", "-ize", "to make or turn into", "A company does this when it finds a way to earn money from a free app."],
    ["prioritize", "-ize", "to make or turn into", "To decide what comes first on a to-do list."],
    ["hypothesize", "-ize", "to make or turn into", "A scientist does this before running a test."],
    ["closure", "-ure", "act or result of", "A feeling that a painful chapter has finally ended."],
    ["exposure", "-ure", "act or result of", "Photographers worry about this with light and a camera."],
    ["departure", "-ure", "act or result of", "A board at the airport lists this for every flight."],
    ["youngster", "-ster", "person connected with", "A child or teenager."],
    ["prankster", "-ster", "person connected with", "Someone who loves to play harmless tricks."],
    ["historic", "-ic", "relating to or like", "An event important enough to be remembered for years."],
    ["metallic", "-ic", "relating to or like", "A shiny, hard coating on a new car."],
    ["urgency", "-ency", "state or quality of", "The feeling that something must be done right now."],
    ["fluency", "-ency", "state or quality of", "Speaking a language smoothly and easily."]
  ];
  const END29P = ["to make or turn into", "act or result of", "person connected with", "relating to or like", "state or quality of", "place for", "small"];
  const HOMO29 = [
    ["The ___ gown was made of white silk.", "bridal", ["bridle", "bridel"]], ["The rider adjusted the horse's ___.", "bridle", ["bridal", "bridl"]],
    ["The lab installed a ___ to measure heat.", "sensor", ["censor", "sensur"]], ["A ___ removed parts of the film.", "censor", ["sensor", "cencer"]],
    ["The drummer struck the ___ with a stick.", "cymbal", ["symbol", "cimbal"]], ["A dove is a ___ of peace.", "symbol", ["cymbal", "simbol"]],
    ["The car has ___ exhaust pipes.", "dual", ["duel", "dule"]], ["In old stories, two knights fought a ___.", "duel", ["dual", "dewl"]],
    ["A ___ of tourists filled the square.", "horde", ["hoard", "hord"]], ["The squirrel kept a ___ of acorns.", "hoard", ["horde", "hourd"]],
    ["The photos stood on the ___ above the fireplace.", "mantel", ["mantle", "mantal"]], ["Below the Earth's crust lies the ___.", "mantle", ["mantel", "mantl"]],
    ["A chef's ___ can detect subtle flavors.", "palate", ["palette", "pallete"]], ["The painter mixed colors on her ___.", "palette", ["palate", "pallette"]],
    ["The business made a large ___ this year.", "profit", ["prophet", "proffit"]], ["The ___ warned the people in an ancient tale.", "prophet", ["profit", "prophit"]],
    ["Eat a bowl of ___ for breakfast.", "cereal", ["serial", "cerial"]], ["The TV show was a ___ with a new episode weekly.", "serial", ["cereal", "serrial"]],
    ["The sailors steered through the narrow ___.", "strait", ["straight", "strate"]], ["Draw a ___ line with a ruler.", "straight", ["strait", "straite"]],
    ["The school will ___ the fee for students in need.", "waive", ["wave", "waiv"]], ["She will ___ to the crowd from the stage.", "wave", ["waive", "wafe"]],
    ["All the effort seemed ___ without a result.", "vain", ["vein", "vane"]], ["The nurse found a ___ in his arm.", "vein", ["vain", "vane"]], ["The weather ___ spun in the wind.", "vane", ["vain", "vein"]]
  ];
  const MIS29 = [["ambiguity", ["ambiguety", "ambigiuty"]], ["anonymous", ["anonomous", "annonymous"]], ["autonomous", ["autonamous", "autonomus"]], ["chronological", ["cronological", "chronilogical"]], ["dilemma", ["dilema", "dilemna"]], ["exhilarate", ["exilarate", "exhilirate"]], ["fluorescent", ["flourescent", "fluorescant"]], ["hypocrisy", ["hypocracy", "hipocrisy"]], ["inoculate", ["innoculate", "inocculate"]], ["jeopardy", ["jeapardy", "jeopardie"]], ["liaison", ["liason", "liaision"]], ["millennium", ["milennium", "millenium"]], ["perseverance", ["perseverence", "perserverance"]], ["pneumonia", ["pnuemonia", "neumonia"]], ["resilience", ["resilliance", "resiliance"]], ["rhetoric", ["rhetorick", "retoric"]], ["subpoena", ["supoena", "subpena"]], ["supersede", ["supercede", "supersead"]], ["vacuum", ["vaccum", "vacume"]]];
  const ACAD29 = [
    ["anomaly", "The warm day in January was an <i>anomaly</i>.", "something that departs from the usual", ["a common event", "a planned holiday"], "Warm weather in January is not normal."],
    ["arbitrary", "The rule seemed <i>arbitrary</i> because nobody could explain the reason for it.", "based on whim, not reason", ["carefully planned", "very strict"], "No reason could be given."],
    ["benign", "The tests showed the lump was <i>benign</i>, so no treatment was needed.", "harmless", ["dangerous", "growing fast"], "No treatment was needed."],
    ["catalyst", "The protest was a <i>catalyst</i> for change across the country.", "something that sparks change", ["a lasting obstacle", "a final result"], "It started change across the country."],
    ["concede", "After seeing the evidence, she had to <i>concede</i> that he was right.", "admit as true", ["argue louder", "refuse to hear"], "She changed her stance after seeing proof."],
    ["convoluted", "The <i>convoluted</i> plot of the film left viewers confused.", "extremely complicated", ["short and simple", "funny and light"], "Viewers were confused."],
    ["delineate", "The report will <i>delineate</i> the duties of each team member.", "describe or outline precisely", ["erase quickly", "praise highly"], "It sets out each member's duties."],
    ["ephemeral", "Soap bubbles are beautiful but <i>ephemeral</i>.", "lasting a very short time", ["very heavy", "permanently fixed"], "A bubble pops soon."],
    ["extrapolate", "Scientists <i>extrapolate</i> from today's trends to predict future populations.", "estimate beyond the known data", ["copy exactly", "count carefully"], "They predict the future from today's trends."],
    ["facilitate", "A good moderator can <i>facilitate</i> a lively discussion.", "make easier", ["ruin completely", "delay"], "A moderator helps the talk go smoothly."],
    ["implicit", "Her silence was an <i>implicit</i> agreement, though she never spoke the word yes.", "understood without being stated", ["shouted loudly", "written in a contract"], "She never spoke the word yes."],
    ["incongruous", "A tall glass tower looked <i>incongruous</i> beside the tiny village cottages.", "out of place", ["perfectly matched", "very old"], "The tower and the cottages do not belong together."],
    ["scrutinize", "Auditors <i>scrutinize</i> every receipt for mistakes.", "examine closely", ["glance at", "throw away"], "They check every receipt for mistakes."],
    ["superfluous", "Cut every <i>superfluous</i> word to make your essay concise.", "more than needed", ["very important", "hard to spell"], "Cutting them makes the essay shorter."],
    ["tangible", "The team wanted <i>tangible</i> results, not promises.", "real and able to be measured", ["imaginary", "delayed"], "Promises were not enough."],
    ["unequivocal", "The judge gave an <i>unequivocal</i> answer: no.", "clear, leaving no doubt", ["unsure", "confusing"], "She said no, plainly."]
  ];
  const ABBR29 = [
    ["e.g.", "for example", ["that is", "and so on"], "It introduces only a few of many."],
    ["i.e.", "that is", ["for example", "and others"], "It restates an idea in other words."],
    ["etc.", "and so on", ["and others of people", "note well"], "It ends a list that could keep going."],
    ["et al.", "and others", ["and so on", "in the same place"], "It is used after a first author's name when a book has many authors."],
    ["cf.", "compare", ["see below", "note well"], "It asks you to look at another source for contrast."],
    ["ibid.", "in the same place", ["in the book", "and others"], "A footnote uses it to point back to the source just cited."],
    ["N.B.", "note well", ["new book", "not before"], "It tells readers to pay special attention."],
    ["p.s.", "written after the main letter", ["please send", "pages sent"], "Latin <i>post scriptum</i>: a late addition."],
    ["c. or ca.", "about or around", ["exactly", "after"], "Latin <i>circa</i>; historians use it for dates they are unsure of."],
    ["vs.", "against", ["together with", "instead of"], "It appears in a court case name such as Smith vs. Jones."],
    ["sic", "exactly as originally written", ["with a correction", "in brackets"], "A writer places it in brackets after a quoted error."],
    ["ad hoc", "for this particular purpose", ["without any thought", "after the event"], "An ad hoc committee is formed to handle one specific problem."],
    ["status quo", "the existing state of affairs", ["a high rank", "a fine reward"], "People who resist change want to keep it."],
    ["bona fide", "genuine", ["made of gold", "very old"], "A bona fide expert is not a fake one."]
  ];
  const ENV29 = [["biodiversity", ["biodiversety", "bioddiversity"]], ["ecosystem", ["ecosistem", "ecossystem"]], ["sustainability", ["sustainabilty", "sustanability"]], ["deforestation", ["deforestashun", "deforestaton"]], ["emissions", ["emmissions", "emisions"]], ["watershed", ["watersched", "watershead"]], ["renewable", ["renewible", "renewabel"]], ["conservation", ["conservashun", "conservaton"]], ["ozone", ["ozon", "ozoen"]], ["habitat", ["habbitat", "habitate"]], ["pollutant", ["pollutent", "polutant"]], ["atmosphere", ["atmosfere", "atmospher"]], ["biodegradable", ["biodegradible", "biodegradeable"]]];
  const PUB29 = [["epidemic", ["epedemic", "epidemick"]], ["pandemic", ["pandemick", "pandemmic"]], ["vaccination", ["vacination", "vaccinashun"]], ["immunity", ["imunity", "immunnity"]], ["sanitation", ["sanatation", "sanitashun"]], ["epidemiology", ["epidemeology", "epidimiology"]], ["incubation", ["encubation", "incubashun"]], ["contagious", ["contageous", "contagius"]], ["prevalence", ["prevalance", "prevelence"]], ["chronic", ["cronic", "chronick"]], ["hygiene", ["hygeine", "higiene"]], ["pathogen", ["pathagen", "pathojen"]], ["antibiotic", ["antibiotick", "antibyotic"]], ["symptom", ["symtom", "symptum"]], ["asymptomatic", ["asymtomatic", "asymptomatik"]]];
  const ART29 = [["renaissance", ["renaisance", "renaissence"]], ["baroque", ["baroke", "barroque"]], ["impressionism", ["impresionism", "impressionizm"]], ["fresco", ["fresko", "frescoe"]], ["curator", ["curater", "kurator"]], ["surrealism", ["surealism", "surrealizm"]], ["cubism", ["cubizm", "cubbism"]], ["mosaic", ["mosiac", "mosaik"]], ["montage", ["montaj", "montague"]], ["tapestry", ["tapistry", "tapesty"]], ["iconography", ["iconograpy", "ikonography"]], ["sarcophagus", ["sarcofagus", "sarcophogus"]], ["gallery", ["galery", "gallary"]], ["mural", ["murral", "mureal"]]];
  const LOOK29 = [
    ["Animals ___ to cold weather by growing thick fur.", "adapt", ["adopt", "adept"]], ["The family decided to ___ a puppy.", "adopt", ["adapt", "adept"]], ["She is ___ at fixing engines.", "adept", ["adapt", "adopt"]],
    ["The coach hoped the speech would ___ the team to try harder.", "inspire", ["insight", "inspyre"]], ["Her talk gave us a deep ___ into the problem.", "insight", ["incite", "inside"]],
    ["The coach said team ___ was high after the win.", "morale", ["moral", "morael"]], ["The fable ends with a ___.", "moral", ["morale", "morral"]],
    ["A marble ___ stood in the park.", "statue", ["statute", "stature"]], ["The new ___ bans litter.", "statute", ["statue", "stature"]], ["She is a woman of great ___ in her field.", "stature", ["statue", "statute"]],
    ["The ___ pays rent each month.", "tenant", ["tenet", "tenent"]], ["One ___ of science is that claims must be tested.", "tenet", ["tenant", "tennet"]],
    ["The old woman made a ___ about the harvest.", "prophecy", ["prophesy", "prophesie"]], ["She claimed she could ___ the future.", "prophesy", ["prophecy", "prophisy"]],
    ["The doctor made a quick ___ of the illness.", "diagnosis", ["prognosis", "diagnoses"]], ["The ___ for a full recovery is excellent.", "prognosis", ["diagnosis", "prognoses"]],
    ["His ___ told him not to cheat.", "conscience", ["conscious", "consience"]], ["She was ___ of the noise around her.", "conscious", ["conscience", "consious"]],
    ["The two countries became close ___ after the talks.", "allies", ["alleys", "allys"]], ["The cat slipped down the narrow ___.", "alley", ["ally", "alle"]]
  ];
  const MULT29 = [
    ["bank", "Wild grasses grew along the <i>bank</i> of the stream.", "the sloping side of a river", ["a place to keep money", "to tilt an airplane"], "A stream's edge is described."],
    ["bill", "The Senate will vote on the <i>bill</i> next week.", "a proposed law", ["a request for payment", "a bird's beak"], "A senate votes on it."],
    ["cast", "The surgeon put a <i>cast</i> on her broken arm.", "a hard covering that holds a bone in place", ["the actors in a play", "a throw of a fishing line"], "The arm was broken."],
    ["board", "The company's <i>board</i> approved the new budget.", "a group that directs an organization", ["a flat piece of wood", "to get on a train"], "It approves the company's budget."],
    ["degree", "She earned a <i>degree</i> in biology.", "an award for finishing a course of study", ["a unit of temperature", "an amount or level"], "She finished college."],
    ["article", "The <i>article</i> in the newspaper described the election.", "a piece of writing in a publication", ["a thing or object", "a section of a law"], "The newspaper printed it."],
    ["chair", "She was asked to <i>chair</i> the meeting.", "lead as the person in charge", ["sit down", "carry on shoulders"], "A meeting needs someone in charge."],
    ["pitch", "The salesperson gave her <i>pitch</i> to the investors.", "a talk meant to persuade", ["a sticky black tar", "a throw in baseball"], "She was trying to win over investors."],
    ["strike", "Workers voted to <i>strike</i> for better hours.", "stop work as a protest", ["hit hard", "find oil"], "They wanted better hours."],
    ["sound", "The bridge was <i>sound</i>, so engineers allowed trucks on it.", "strong and in good condition", ["a noise", "a narrow channel of water"], "Trucks were allowed on it."],
    ["relative", "The <i>relative</i> cost of rent is lower in small towns.", "compared with something else", ["a family member", "a close friend"], "A comparison between towns is being made."],
    ["base", "The company has its <i>base</i> in Chicago.", "the main place of operations", ["the bottom part", "a low sound"], "It is where the company is headquartered."]
  ];
  const CONF29 = [
    ["The store is ___ down the road.", "farther", ["further", "farthur"]], ["Let's discuss this ___ tomorrow.", "further", ["farther", "furthur"]],
    ["The signing was a ___ moment for the nation.", "historic", ["historical", "historik"]], ["She read a ___ novel set in 1800.", "historical", ["historic", "histrical"]],
    ["The student ___ planned the school dance.", "council", ["counsel", "counsil"]], ["He sought legal ___ before signing.", "counsel", ["council", "counsell"]],
    ["The two cousins are ten and twelve, ___.", "respectively", ["respectfully", "respectivly"]], ["She bowed ___ to the judge.", "respectfully", ["respectively", "respectfuly"]],
    ["The ___ struck the old oak tree.", "lightning", ["lightening", "lightming"]], ["Painting the walls white is ___ the mood of the room.", "lightening", ["lightning", "lightnin"]],
    ["The helmet will ___ your safety.", "ensure", ["insure", "ensur"]], ["I need to ___ my car against damage.", "insure", ["ensure", "insur"]],
    ["Seven members ___ the committee.", "compose", ["comprise", "compise"]], ["The committee will ___ seven members.", "comprise", ["compose", "comprize"]],
    ["I like to ___ down after lunch.", "lie", ["lay", "lye"]], ["Please ___ the book on the desk.", "lay", ["lie", "laye"]]
  ];
  const SENT29 = [
    ["The politician's ___ answers avoided every direct question.", "evasive", ["candid", "lengthy"]],
    ["Because the results were so ___, the lab repeated the test three times.", "anomalous", ["predictable", "routine"]],
    ["The ___ student, although talented, rarely tried hard.", "indolent", ["diligent", "ambitious"]],
    ["In contrast to her ___ manner, her writing was bold and passionate.", "reserved", ["flamboyant", "noisy"]],
    ["The negotiators reached a ___ after weeks of talks, with each side giving up something.", "compromise", ["stalemate", "quarrel"]],
    ["The professor's lecture was so ___ that students stopped taking notes.", "rambling", ["concise", "vivid"]],
    ["The vaccine was ___ at preventing the illness; almost no one got sick.", "efficacious", ["useless", "costly"]],
    ["Despite his ___ confidence, he privately worried he would fail.", "feigned", ["genuine", "growing"]],
    ["The ancient manuscript was ___; its ink had faded so far that few words could be read.", "illegible", ["flawless", "colorful"]],
    ["The speaker was ___ about the plan, praising every detail.", "effusive", ["skeptical", "indifferent"]],
    ["The scientist remained ___ about the claim until she saw proof.", "skeptical", ["convinced", "thrilled"]],
    ["Rainfall in the desert is ___, falling only a few days each year.", "sparse", ["abundant", "constant"]]
  ];
  const ANA29 = [
    ["Archaeologist", "artifacts", "Botanist", "plants", ["telescopes", "oceans"], "Each pair is an expert and the things the expert studies."],
    ["Generous", "stingy", "Brave", "cowardly", ["bold", "kind"], "Each pair are opposites."],
    ["Chapter", "novel", "Scene", "play", ["actor", "stage"], "Each pair is a smaller part and the larger work it belongs to."],
    ["Odometer", "distance", "Speedometer", "speed", ["fuel", "tires"], "Each pair is an instrument and what it measures."],
    ["Tadpole", "frog", "Caterpillar", "butterfly", ["leaf", "spider"], "Each pair is a young stage and the adult it becomes."],
    ["Orchestra", "conductor", "Ship", "captain", ["sail", "harbor"], "Each pair is a group and the person who leads it."],
    ["Famine", "food", "Drought", "water", ["rain", "crops"], "Each pair is a shortage and the thing that is missing."],
    ["Transparent", "opaque", "Rigid", "flexible", ["solid", "hard"], "Each pair are opposites."],
    ["Poet", "stanza", "Novelist", "chapter", ["rhyme", "plot"], "Each pair is a writer and a main unit of the writer's work."],
    ["Hurricane", "storm", "Sonnet", "poem", ["wind", "rhyme"], "Each pair is a specific kind and the larger group it belongs to."],
    ["Telescope", "distant stars", "Microscope", "tiny organisms", ["bright lenses", "large rocks"], "Each pair is a tool and the very far or very small things it helps you see."],
    ["Verdict", "jury", "Diagnosis", "doctor", ["patient", "nurse"], "Each pair is a decision and the person or group who makes it."]
  ];
  const ETY29 = [
    ["The word <b>clue</b> comes from Old English <i>clew</i>, a ball of...", "thread", ["wax", "clay"], "In a Greek myth, a hero used one to find his way out of a maze."],
    ["The word <b>panic</b> comes from the Greek god Pan, god of...", "the wild and shepherds", ["the sea and storms", "fire and metal"], "He lived in the countryside, and his sudden shout was said to scare flocks."],
    ["The word <b>calculate</b> comes from the Latin word for a small...", "pebble", ["coin", "stick"], "Romans moved little round bits of stone to count."],
    ["The word <b>vaccine</b> comes from Latin <i>vacca</i>, meaning...", "cow", ["fever", "needle"], "The first vaccine used a virus from a farm animal."],
    ["The word <b>bankrupt</b> comes from Italian <i>banca rotta</i>, meaning a broken...", "bench", ["door", "coin"], "Money lenders sat at one in a market."],
    ["The word <b>robot</b> comes from the Czech word <i>robota</i>, meaning...", "hard work", ["silver metal", "clever machine"], "A play from 1920 used it for artificial workers."],
    ["The word <b>jovial</b> comes from the Roman god Jove, whose planet people thought made them...", "cheerful", ["gloomy", "sleepy"], "Astrologers linked Jupiter with a good mood."],
    ["A book of maps is called an <b>atlas</b>, after a Greek Titan who...", "held up the sky", ["sailed the seas", "built a great wall"], "In myth he carried a heavy load high above the world."],
    ["The word <b>cardigan</b> is named after the Earl of Cardigan, a British officer, and is a kind of...", "knitted jacket", ["tall hat", "long cloak"], "It buttons down the front and is worn over a shirt."],
    ["The word <b>glamour</b> first meant...", "a magic spell", ["a bright color", "a type of dress"], "In old Scottish stories it was cast by a witch."],
    ["The word <b>window</b> comes from Old Norse words meaning 'wind' and...", "eye", ["door", "glass"], "A hole in the wall was seen as something like a part of a face."],
    ["The word <b>algebra</b> comes from an Arabic book title about the reunion of broken...", "parts", ["numbers", "lines"], "It is about putting back together what was split."]
  ];
  const PROOF29 = ["The [anonomous] donor gave a large gift.", "Her [dilema] was whether to study or work.", "The [hypocracy] of the politician was obvious.", "The lab uses [flourescent] lights.", "He listed the events in [cronological] order.", "The [retoric] of the speech moved the crowd.", "The new law will [supercede] the old one.", "A [vaccum] cleaner hummed in the hall.", "He showed [resiliance] after the failure.", "Doctors treated the [pnuemonia] quickly.", "The [liason] between the two teams was helpful.", "The city celebrated the [milennium] with fireworks.", "The [supoena] ordered her to appear in court.", "The company faces [jeapardy] after the loss.", "The [ambiguety] of the question confused everyone.", "She kept up her [perseverence] through the long winter."];
  const DICT29 = dictG([["ambiguity", "The ___ of the question confused everyone."], ["anonymous", "The ___ author used a pen name."], ["chronological", "List the events in ___ order."], ["dilemma", "She faced a difficult ___."], ["fluorescent", "A ___ tube lit the lab."], ["hypocrisy", "He was accused of ___."], ["liaison", "She acted as a ___ between the groups."], ["millennium", "A ___ is one thousand years."], ["pneumonia", "He stayed home with ___."], ["resilience", "Her ___ helped her recover."], ["supersede", "Newer rules ___ the old ones."], ["rhetoric", "The speaker's ___ was powerful."]]);

  const A29 = [
    L("Word roots 22", meaningG(ROOT29, ROOT29P, "root"),
      meanH("Example: the root <b>dent</b> means <b>tooth</b>, as in <i>dentist</i>. Find the meaning of yours the same way."),
      [S("Roots of life", "ger · nutri · vit · cogn", "<b>ger</b> = old age (geriatric), <b>nutri</b> = feed (nutrient), <b>vit</b> = life (vitamin), <b>cogn</b> = know (recognize)."), S("Roots of nature", "arbor · avi · api", "<b>arbor</b> = tree (arborist), <b>avi</b> = bird (aviation), <b>api</b> = bee (apiculture)."), S("Roots of society", "ven · tempor · popul · nomen · termin", "<b>ven</b> = come (event), <b>tempor</b> = time (contemporary), <b>popul</b> = people (popular), <b>nomen</b> = name, <b>termin</b> = end (terminal).")]),
    L("Prefixes tri-, uni-, demi-, sesqui- and hexa-", prefG(PREF29, PREF29P),
      prefH("Example: <b>bicycle</b> has two wheels, so <b>bi-</b> means two. Use your word the same way."),
      [S("Three and one", "tri- · uni-", "<b>tri-</b> means three (a triathlon has three sports). <b>uni-</b> means one (a unicycle has one wheel)."), S("Half and one and a half", "demi- · sesqui-", "<b>demi-</b> means half (a demigod is half god). <b>sesqui-</b> means one and a half (a sesquicentennial is a 150th anniversary)."), S("Six", "hexa-", "<b>hexa-</b> means six. A hexagon has six sides and a hexapod has six legs, like an insect.")]),
    L("Word endings -ize, -ure, -ster, -ic and -ency", meaningG(END29, END29P, "ending"),
      meanH("Example: <b>-less</b> means without, as in <i>careless</i>. Find the meaning of your ending the same way."),
      [S("Making and results", "-ize · -ure", "<b>-ize</b> makes a verb that means to make or turn into (modernize). <b>-ure</b> names an act or result (closure)."), S("People and likeness", "-ster · -ic", "<b>-ster</b> names a person connected with something (youngster). <b>-ic</b> means relating to or like (metallic)."), S("States", "-ency", "<b>-ency</b> names a state or quality (urgency, fluency). It often goes with a word ending in -ent.")]),
    L("Homophones 26", sentG(HOMO29),
      sentHints("Example: 'I will <b>wait</b> here' and 'the <b>weight</b> of a box'. Decide which meaning your sentence needs."),
      homoSlides("bridal · bridle · sensor · censor · cymbal · symbol", "dual · duel · horde · hoard · mantel · mantle · strait · straight")),
    L("Commonly misspelled words 17", rightG(MIS29),
      misH("Example: <b>Wednesday</b> has a silent d and <b>government</b> has an n before the m. Check the middle of yours."),
      misSlides("per·se·ver·ance · res·il·ience", "pneu·mo·nia · mil·len·ni·um")),
    L("Academic vocabulary 5", vocG(ACAD29), vocabH("Example: 'The <b>bat</b> flew out of the cave' ➜ here bat is an animal, not a baseball tool."), vocabSlides),
    L("Latin abbreviations in college writing", phraseG("abbreviation or phrase", ABBR29),
      phrH("Example: <b>a.m.</b> comes from Latin and marks the hours before noon. Think of what your abbreviation is used for."),
      [S("Latin in papers", "e.g. · i.e. · etc.", "<b>e.g.</b> means for example, <b>i.e.</b> means that is, and <b>etc.</b> means and so on."), S("Citations", "et al. · ibid. · cf.", "<b>et al.</b> means and others, <b>ibid.</b> means in the same place and <b>cf.</b> means compare."), S("Other Latin", "sic · ad hoc · bona fide", "<b>sic</b> means exactly as written, <b>ad hoc</b> means for this purpose and <b>bona fide</b> means genuine.")]),
    L("Environmental science words", rightG(ENV29),
      misH("Example: <b>glacier</b> has an a before the c. Check the middle of yours."),
      wordSlides("Words about nature and climate", "Environmental scientists study how living things and their surroundings work together.", "bio·di·ver·si·ty · eco·sys·tem", "sus·tain·a·bil·i·ty · de·for·es·ta·tion")),
    L("Public health words", rightG(PUB29),
      misH("Example: <b>fever</b> has the e before the v. Check the vowels and the middle of yours."),
      wordSlides("Words about health and disease", "Public health workers track illness in whole communities and look for ways to prevent it.", "ep·i·dem·ic · pan·dem·ic", "con·ta·gious · asymp·to·mat·ic")),
    L("Art history words", rightG(ART29),
      misH("Example: <b>sculpture</b> has a p after the l. Check the middle of yours, where French and Italian letters hide."),
      wordSlides("Words about art", "Art words often come from Italian and French, so they have unusual letter groups.", "re·nais·sance · ba·roque", "im·pres·sion·ism · sur·re·al·ism")),
    L("Look-alike words 8", sentG(LOOK29),
      sentHints("Example: <b>advice</b> is a noun ('good advice') and <b>advise</b> is a verb ('I advise you'). Decide what your sentence needs."),
      confSlides("adapt · adopt · adept · morale · moral", "statue · statute · stature · tenant · tenet · prophecy · prophesy")),
    L("Words with several meanings 10", vocG(MULT29), vocabH("Example: 'The <b>bat</b> flew out of the cave' ➜ here bat is an animal, not a baseball tool."), multSlides),
    L("Commonly confused words in college writing 5", sentG(CONF29),
      sentHints("Example: <b>advice</b> is a noun ('good advice') and <b>advise</b> is a verb ('I advise you'). Decide what your sentence needs."),
      confSlides("farther · further · historic · historical", "council · counsel · respectively · respectfully · lightning · lightening")),
    L("Sentence completion 8", sentG(SENT29), ssH("Example: 'Because the soup was so ___, she added more salt' ➜ bland, because she wanted more flavor."), ssSlides),
    L("Word analogies 10", anaG(ANA29), anaH("Example: <b>fish : swim :: bird : fly</b>. A fish swims, so a bird flies. Now do yours."), anaSlides),
    L("Etymology 8: stories behind words", etyG(ETY29), etyH("Example: <b>sandwich</b> is named after the Earl of Sandwich, who liked to eat bread and meat while he worked. Now think about yours."),
      etySlides("clue · vaccine · robot", "<b>Clue</b> began as a ball of thread. <b>Vaccine</b> comes from the Latin word for cow. <b>Robot</b> comes from a Czech word for hard work.")),
    L("Proofreading 19", proofG(PROOF29), proofH("Example: 'It was a <b>wierd</b> sound' ➜ 'wierd' should be 'weird'. Check each word like that."), proofSlides("🧐")),
    L("Listen and spell 25", tyG(DICT29), dictHints("Example: 'enthusiasm' = en + thu + si + asm. Write each part, then check the whole word."), dictSlides("am·bi·gu·i·ty · chron·o·log·i·cal", "hy·poc·ri·sy · li·ai·son"))
  ];
  A29.push(MIX("Mixed practice", [A29[0], A29[1], A29[3], A29[4], A29[10], A29[14]]));
  A29.push(MIX("Level 29 Challenge", [A29[2], A29[5], A29[6], A29[7], A29[8], A29[9], A29[11], A29[12], A29[13], A29[15], A29[16], A29[17]]));

  // =================================================================
  // LEVEL 30 (College year 2, second half)
  // =================================================================
  const ROOT30 = [
    ["ambulatory", "ambul", "walk", "Describes a patient who is well enough to move about rather than stay in bed."],
    ["construct", "stru", "build", "Engineers do this to a bridge, piece by piece."],
    ["fidelity", "fid", "faith or trust", "Being loyal and true to a promise."],
    ["stringent", "string", "bind or tighten", "Rules that are very strict and hard to bend."],
    ["invincible", "vinc", "conquer", "A champion with an unbroken record of wins would be called this."],
    ["seclusion", "clus", "close", "Living far from everyone in a quiet cabin."],
    ["consecutive", "secut", "follow", "Three wins in a row."],
    ["progress", "gress", "step", "Moving forward, one stage after another."],
    ["transfusion", "fus", "pour", "A hospital procedure that gives blood from one person to another."],
    ["suspend", "pend", "hang", "To hold something up on a cord, or to pause a lesson for a while."],
    ["elevate", "lev", "lift", "An elevator does this to people in a tall building."],
    ["transfer", "fer", "carry", "To move a student from one school to another."],
    ["cursor", "curs", "run", "The little arrow that scurries across the screen."]
  ];
  const ROOT30P = ["walk", "build", "faith or trust", "bind or tighten", "conquer", "close", "follow", "step", "pour", "hang", "lift", "carry", "run"];
  const PREF30 = [["crypto-", "cryptography", "hidden"], ["crypto-", "cryptic", "hidden"], ["biblio-", "bibliography", "book"], ["biblio-", "bibliophile", "book"], ["astro-", "astronomy", "star"], ["astro-", "astronaut", "star"], ["ichthyo-", "ichthyology", "fish"], ["ichthyo-", "ichthyosaur", "fish"], ["hippo-", "hippopotamus", "horse"], ["hippo-", "hippodrome", "horse"]];
  const PREF30P = ["hidden", "book", "star", "fish", "horse", "bird", "insect"];
  const END30 = [
    ["administrator", "-ator", "one who or device that", "The person who runs the daily business of a school or hospital."],
    ["translator", "-ator", "one who or device that", "Someone who turns a Spanish book into English."],
    ["generator", "-ator", "one who or device that", "A machine that makes electricity when the power goes out."],
    ["adolescent", "-escent", "becoming", "A teenager is on the way from childhood to adulthood."],
    ["fluorescent", "-escent", "becoming", "A lamp that gives off light after absorbing energy."],
    ["convalescent", "-escent", "becoming", "A patient slowly getting well again."],
    ["agile", "-ile", "able to or relating to", "A gymnast who can twist and move quickly."],
    ["mobile", "-ile", "able to or relating to", "A phone you can carry anywhere."],
    ["fertile", "-ile", "able to or relating to", "Rich soil in which crops grow well."],
    ["testimony", "-mony", "result or state", "What a witness says under oath in court."],
    ["harmony", "-mony", "result or state", "Notes that sound pleasant together."],
    ["ceremony", "-mony", "result or state", "A graduation is a formal one."]
  ];
  const END30P = ["one who or device that", "becoming", "able to or relating to", "result or state", "small", "place for", "full of"];
  const HOMO30 = [
    ["The test had an ___ part where students listened to a recording.", "aural", ["oral", "aurel"]], ["The ___ exam required her to speak aloud.", "oral", ["aural", "orral"]],
    ["The pianist played a beautiful ___.", "chord", ["cord", "chorde"]], ["He tied the box with a strong ___.", "cord", ["chord", "cored"]],
    ["Each ___ in the contract must be read carefully.", "clause", ["claws", "clawse"]], ["The cat sharpened its ___ on the post.", "claws", ["clause", "clauz"]],
    ["The sand felt ___ under her bare feet.", "coarse", ["course", "corse"]], ["She enrolled in a chemistry ___.", "course", ["coarse", "coarce"]],
    ["Moss and ___ grow on the rocks.", "lichen", ["liken", "lighken"]], ["The poet tried to ___ the sunset to a painting.", "liken", ["lichen", "licken"]],
    ["The ___ is a shellfish that clings to rocks.", "mussel", ["muscle", "mussle"]], ["She pulled a ___ in her leg.", "muscle", ["mussel", "musle"]],
    ["Builders will ___ the old building to make room.", "raze", ["raise", "rase"]], ["Please ___ your hand if you know.", "raise", ["raze", "rais"]],
    ["The hikers had to ___ through shallow water.", "wade", ["weighed", "waid"]], ["The package ___ two kilograms.", "weighed", ["wade", "weied"]],
    ["The smell of cooking will ___ your appetite.", "whet", ["wet", "whett"]], ["The rain made the road ___.", "wet", ["whet", "wett"]],
    ["He used every ___ to win the argument.", "wile", ["while", "wyle"]], ["Read ___ you wait.", "while", ["wile", "whyle"]]
  ];
  const MIS30 = [["catastrophe", ["catastrofe", "catistrophe"]], ["colleague", ["collegue", "collaegue"]], ["desiccate", ["dessicate", "desicate"]], ["exuberant", ["exhuberant", "exuberent"]], ["gauge", ["guage", "gauje"]], ["genealogy", ["geneology", "genealogie"]], ["gratuitous", ["gratutious", "gratuitus"]], ["irresistible", ["irresistable", "irrisistible"]], ["knowledgeable", ["knowledgable", "knowlegeable"]], ["meticulous", ["meticulus", "metaculous"]], ["oblivious", ["oblivous", "obblivious"]], ["paraphernalia", ["paraphenalia", "paraphernailia"]], ["parliament", ["parliment", "parlament"]], ["pseudonym", ["psuedonym", "pseudonim"]], ["reconnaissance", ["reconaissance", "reconnaisance"]], ["restaurateur", ["restaurater", "restaraunteur"]], ["sovereign", ["soverign", "sovreign"]], ["spontaneous", ["spontanious", "spontaneus"]], ["unprecedented", ["unpresedented", "unprecidented"]], ["plagiarism", ["plagerism", "plagarism"]]];
  const ACAD30 = [
    ["ameliorate", "New laws were passed to <i>ameliorate</i> working conditions.", "improve", ["worsen", "ignore"], "Laws were passed to help, because conditions at work were poor."],
    ["cogent", "She made a <i>cogent</i> argument that persuaded the committee.", "clear and convincing", ["long and rambling", "angry and loud"], "The committee was persuaded."],
    ["clandestine", "The two nations held <i>clandestine</i> talks, away from the press.", "kept secret", ["open to all", "very noisy"], "The press was kept away."],
    ["deleterious", "Too little sleep has <i>deleterious</i> effects on memory.", "harmful", ["helpful", "surprising"], "Too little sleep affects memory in a bad way."],
    ["disseminate", "The agency will <i>disseminate</i> the safety guide to every school.", "spread widely", ["hide away", "rewrite"], "The guide will go out to every school."],
    ["egregious", "Forgetting to tell the client was an <i>egregious</i> error.", "shockingly bad", ["tiny and harmless", "clever and wise"], "It was a very serious mistake."],
    ["equivocate", "Politicians sometimes <i>equivocate</i> instead of giving a straight answer.", "use vague language to avoid committing", ["speak with great clarity", "argue for hours"], "They do not give a straight answer."],
    ["esoteric", "The <i>esoteric</i> terms of the field confused outsiders.", "understood by only a few", ["known by everyone", "very old"], "Outsiders were confused."],
    ["fastidious", "The <i>fastidious</i> editor checked each comma twice.", "very careful about details", ["careless and quick", "easily bored"], "She checked each comma twice."],
    ["galvanize", "The speech helped <i>galvanize</i> the community into action.", "shock or stir into action", ["put to sleep", "drive apart"], "The community took action afterward."],
    ["insidious", "The <i>insidious</i> spread of the weed went unnoticed until the garden was full.", "slowly harmful without being noticed", ["obvious and fast", "helpful and kind"], "It went unnoticed."],
    ["judicious", "A <i>judicious</i> investor weighs the risks first.", "showing good judgment", ["quick to panic", "fond of travel"], "She weighs the risks first."],
    ["lucrative", "Selling software proved a <i>lucrative</i> business.", "producing a lot of money", ["very difficult", "poorly planned"], "The business did very well."],
    ["myriad", "A <i>myriad</i> of stars glittered in the desert sky.", "a vast number", ["a single one", "a few"], "The sky had stars beyond counting."],
    ["obsolete", "Floppy disks are <i>obsolete</i> in most offices today.", "no longer in use", ["newly invented", "very cheap"], "Most offices no longer use them."],
    ["pernicious", "The <i>pernicious</i> rumor harmed her reputation for years.", "causing slow, serious harm", ["amusing and brief", "true and fair"], "It harmed her reputation for years."],
    ["pivotal", "The vote was a <i>pivotal</i> moment in the campaign.", "of central importance", ["of little importance", "of poor quality"], "The whole campaign turned on it."],
    ["scrupulous", "A <i>scrupulous</i> accountant never fudges the numbers.", "careful to do what is right", ["willing to cheat", "too busy to check"], "He never fudges the numbers."],
    ["verbose", "The <i>verbose</i> report could have been half as long.", "using more words than needed", ["very short", "well illustrated"], "It could have been half as long."]
  ];
  const MGMT30 = [["recruitment", ["recruitmant", "reqruitment"]], ["onboarding", ["onbording", "onboardeng"]], ["delegation", ["delagation", "delegashun"]], ["stakeholder", ["stakeholdar", "steakholder"]], ["productivity", ["productivty", "produktivity"]], ["appraisal", ["apraisal", "appraisel"]], ["compensation", ["compensashun", "compesation"]], ["negotiation", ["negociation", "negotiashun"]], ["succession", ["sucession", "succesion"]], ["accountability", ["acountability", "accountabilty"]], ["mentorship", ["mentorshp", "mentership"]], ["retention", ["retension", "retenshun"]], ["collaboration", ["colaboration", "collabaration"]], ["logistics", ["logistiks", "logisitcs"]], ["strategic", ["stratagic", "strategik"]]];
  const MKT30 = [["advertisement", ["advertisment", "advertizement"]], ["demographic", ["demografic", "demographik"]], ["branding", ["brandeng", "brandin"]], ["consumer", ["consumor", "consummer"]], ["promotion", ["promoshun", "promotian"]], ["merchandise", ["merchendise", "merchandice"]], ["endorsement", ["endorsment", "endorcement"]], ["segmentation", ["segmentashun", "sigmentation"]], ["campaign", ["campain", "campaing"]], ["testimonial", ["testimonal", "testamonial"]], ["competitor", ["competiter", "compeditor"]], ["distribution", ["distrabution", "distribushun"]], ["retailer", ["retailor", "retailler"]], ["wholesale", ["holesale", "wholsale"]], ["sponsorship", ["sponsership", "sponsorsip"]]];
  const CYBER30 = [["encryption", ["encription", "enkryption"]], ["firewall", ["firewal", "firewaul"]], ["malware", ["mallware", "malwear"]], ["phishing", ["phising", "phishin"]], ["authentication", ["authentification", "authenticaton"]], ["vulnerability", ["vulnerabilty", "vunerability"]], ["bandwidth", ["bandwith", "bandwidht"]], ["protocol", ["protocal", "protecol"]], ["ransomware", ["ransomwear", "ransomewere"]], ["spyware", ["spywear", "spiware"]], ["credential", ["credencial", "credentail"]], ["biometric", ["biometrick", "bioometric"]], ["decryption", ["decription", "decrytion"]], ["malicious", ["malicius", "maliscious"]], ["verification", ["verifacation", "verificaton"]], ["firmware", ["firmwear", "firmwair"]]];
  const ARCH30 = [["excavation", ["excavashun", "excavaton"]], ["stratigraphy", ["stratigrafy", "stratography"]], ["radiocarbon", ["radiocarbin", "radiocarben"]], ["ethnography", ["ethnografy", "ethnogrophy"]], ["kinship", ["kinshp", "kinshipp"]], ["nomadic", ["nomatic", "nomadick"]], ["Neolithic", ["Neolithik", "Neolitic"]], ["hieroglyphics", ["heiroglyphics", "hieroglyphicks"]], ["cuneiform", ["cunieform", "cuneaform"]], ["ancestor", ["ancester", "ancestur"]], ["settlement", ["settelment", "settlment"]], ["relic", ["relik", "relick"]], ["anthropologist", ["anthropoligist", "anthrapologist"]], ["pottery", ["poterry", "pottary"]], ["sediment", ["sedement", "sedimint"]]];
  const LOOK30 = [
    ["The Senate meets in the ___ building.", "capitol", ["capital", "capitul"]], ["Paris is the ___ of France.", "capital", ["capitol", "capitel"]],
    ["Take a quick ___ at the menu.", "peek", ["peak", "pique"]], ["The explorer climbed to the highest ___.", "peak", ["peek", "pique"]], ["The mystery will ___ your curiosity.", "pique", ["peak", "peek"]],
    ["A school ___ helps students plan their classes.", "counselor", ["councilor", "counseler"]], ["The city ___ voted for the new park.", "councilor", ["counselor", "councelor"]],
    ["Please ___ your sources in the paper.", "cite", ["site", "sight"]], ["The builders chose a ___ for the new library.", "site", ["cite", "sight"]], ["The Grand Canyon is a wonderful ___.", "sight", ["site", "cite"]],
    ["The hero was ___ to the end.", "loyal", ["royal", "loial"]], ["The ___ family lived in a palace.", "royal", ["loyal", "roiyal"]],
    ["I gladly ___ your invitation.", "accept", ["except", "acept"]], ["Everyone ___ Sam came to the party.", "except", ["accept", "execpt"]]
  ];
  const MULT30 = [
    ["bank", "The tellers at the <i>bank</i> counted the coins.", "a place that keeps and lends money", ["the side of a river", "to tilt an airplane"], "Tellers and coins are mentioned."],
    ["operate", "Surgeons <i>operate</i> in a sterile room.", "perform surgery", ["run a machine", "manage a business"], "A sterile room points to medicine."],
    ["tender", "The steak was <i>tender</i> and easy to cut.", "soft and easy to chew", ["to offer formally", "sore to touch"], "It was easy to cut."],
    ["grave", "The doctor spoke in a <i>grave</i> voice about the news.", "serious", ["very quiet", "very happy"], "The news was important."],
    ["lead", "Please <i>lead</i> the group down the trail.", "guide from the front", ["a soft gray metal", "a pencil's core"], "A group follows down a trail."],
    ["spring", "The <i>spring</i> in the old mattress had broken.", "a coiled piece of metal", ["the season after winter", "a stream of water from the ground"], "It is part of a mattress."],
    ["property", "Water has an unusual <i>property</i>: it expands when it freezes.", "a characteristic", ["land and buildings", "something stolen"], "It is a trait of a substance."],
    ["court", "The team practiced on the <i>court</i> all afternoon.", "a marked area for a game", ["a place where trials are held", "to try to win someone's love"], "A team practices on it."],
    ["conduct", "Copper can <i>conduct</i> electricity.", "carry or transmit", ["behavior", "lead a band"], "Wires made of copper are used for this."],
    ["express", "She took the <i>express</i> train to save time.", "fast, with few stops", ["to say or show", "a quick delivery"], "She wanted to save time."],
    ["fast", "The monks chose to <i>fast</i> for a day.", "go without food", ["firmly in place", "quick"], "They chose not to eat."],
    ["coach", "The airline sold tickets in first class and <i>coach</i>.", "the standard, cheaper seating", ["a trainer for a team", "a horse-drawn carriage"], "Airlines have two kinds of seats."]
  ];
  const CONF30 = [
    ["Seeing the sunrise from the summit was a ___ experience.", "memorable", ["memorial", "memorible"]], ["The town built a ___ for the lost sailors.", "memorial", ["memorable", "memoral"]],
    ["The new ___ of the app is faster.", "version", ["vision", "vershun"]], ["Her ___ of the future guided every choice.", "vision", ["version", "visshun"]],
    ["The company will ___ five thousand bikes this year.", "produce", ["product", "prodoose"]], ["The factory's best-selling ___ is a bike.", "product", ["produce", "prodect"]],
    ["A large ___ of money was donated.", "amount", ["number", "amunt"]], ["A large ___ of people came to the fair.", "number", ["amount", "numbar"]],
    ["The pilot made a smooth ___ onto the runway.", "descent", ["decent", "dissent"]], ["The neighbors were ___ people.", "decent", ["descent", "dissent"]], ["The judge's ___ was published with the ruling.", "dissent", ["decent", "descent"]],
    ["Do not ___ your keys.", "lose", ["loose", "looze"]], ["The screw came ___ from the shelf.", "loose", ["lose", "luse"]],
    ["She is taller ___ her brother.", "than", ["then", "thann"]], ["First mix the batter, ___ bake it.", "then", ["than", "thenn"]]
  ];
  const SENT30 = [
    ["The manager's ___ approach, hearing every view before deciding, won the team's trust.", "consultative", ["dictatorial", "hasty"]],
    ["Her proposal was both ___ and affordable, so the board approved it quickly.", "feasible", ["impractical", "outdated"]],
    ["Although the first results looked ___, later tests showed they were wrong.", "promising", ["discouraging", "irrelevant"]],
    ["The company's rapid growth proved ___; within two years it had collapsed.", "unsustainable", ["lasting", "modest"]],
    ["The auditor was ___, accepting nothing without a receipt.", "rigorous", ["lenient", "hasty"]],
    ["Rather than seek the spotlight, the founder preferred to remain ___.", "anonymous", ["prominent", "famous"]],
    ["Because the instructions were ___, each person followed them differently.", "vague", ["precise", "strict"]],
    ["The new software will ___ our work by automating routine tasks.", "streamline", ["complicate", "interrupt"]],
    ["The court's decision set a ___ for future cases.", "precedent", ["delay", "rumor"]],
    ["A ___ editor catches mistakes that others overlook.", "discerning", ["careless", "hurried"]],
    ["The two experts' views were ___; they agreed on almost nothing.", "irreconcilable", ["identical", "compatible"]],
    ["Years of ___ saving finally let her buy a small home.", "frugal", ["wasteful", "reckless"]]
  ];
  const ANA30 = [
    ["Cartographer", "map", "Architect", "blueprint", ["building", "brick"], "Each pair is a professional and what the professional draws or designs."],
    ["Auditor", "accounts", "Editor", "manuscripts", ["screens", "speeches"], "Each pair is a worker and what the worker carefully checks."],
    ["Sapling", "tree", "Foal", "horse", ["stable", "farm"], "Each pair is a young one and the grown-up it becomes."],
    ["Premise", "conclusion", "Cause", "effect", ["reason", "action"], "Each pair shows what comes first and what follows from it."],
    ["Frugal", "thrifty", "Candid", "honest", ["secretive", "careful"], "Each pair are synonyms (words with almost the same meaning)."],
    ["Dehydrated", "water", "Malnourished", "nutrients", ["sleep", "exercise"], "Each pair is a condition and what is lacking."],
    ["Minute", "time", "Meter", "length", ["weight", "volume"], "Each pair is a unit and the kind of quantity it measures."],
    ["Overture", "opera", "Preface", "book", ["chapter", "author"], "Each pair is an opening part and the whole work it begins."],
    ["Meager", "abundant", "Barren", "fertile", ["empty", "dry"], "Each pair are opposites."],
    ["Telescope", "astronomer", "Microscope", "biologist", ["tourist", "author"], "Each pair is a tool and the scientist who relies on it."],
    ["Ascend", "descend", "Precede", "follow", ["lead", "arrive"], "Each pair are opposites."],
    ["Vaccine", "immunity", "Fertilizer", "growth", ["soil", "farm"], "Each pair is a thing and the result it is meant to produce."]
  ];
  const ETY30 = [
    ["The word <b>tycoon</b> comes from Japanese <i>taikun</i>, a title meaning great...", "lord", ["river", "teacher"], "It was a title for a powerful ruler."],
    ["The word <b>karaoke</b> joins Japanese words meaning 'empty' and...", "orchestra", ["voice", "stage"], "Singers perform with the backing music but no live players."],
    ["The word <b>safari</b> comes from an Arabic word, later used in Swahili, meaning a...", "journey", ["feast", "camp"], "The Swahili word was first used for long caravans."],
    ["The word <b>companion</b> comes from Latin words meaning 'with' and...", "bread", ["road", "sword"], "A friend is someone you share meals with."],
    ["The word <b>dandelion</b> comes from French <i>dent de lion</i>, meaning lion's...", "tooth", ["mane", "paw"], "The jagged leaves look like part of a big cat's mouth."],
    ["The word <b>panorama</b> comes from Greek words meaning 'all' and...", "sight", ["sound", "map"], "Think of a wide, sweeping scenic picture."],
    ["The word <b>breakfast</b> first meant breaking a...", "fast", ["bread", "bone"], "You have not eaten all night."],
    ["The word <b>curfew</b> comes from French <i>couvre-feu</i>, meaning 'cover the...'", "fire", ["door", "bell"], "Medieval towns made people cover their hearths at night."],
    ["The word <b>hurricane</b> comes from a Caribbean word for a god of...", "storms", ["harvest", "music"], "Native people of the Caribbean named a spirit of strong winds."],
    ["The word <b>embarrass</b> comes from a word meaning to put a...", "barrier in the way", ["mirror in the hall", "coat on someone"], "Think of something that blocks a path."],
    ["The word <b>cereal</b> is named after Ceres, the Roman goddess of...", "grain and farming", ["war and wisdom", "the sea"], "She was a Roman goddess linked to crops."],
    ["The word <b>planet</b> comes from a Greek word meaning...", "wanderer", ["circle", "burning one"], "In the night sky, these lights move differently than the fixed stars."]
  ];
  const PROOF30 = ["The [catastrofe] was caused by a broken valve.", "My [collegue] shared the schedule.", "Check the [guage] before you start.", "The speech included a [gratutious] insult.", "A [pseudonim] hid the writer's real name.", "The [parliment] debated the budget.", "The [soverign] ruled for fifty years.", "He is very [knowlegeable] about birds.", "The [geneology] of the family went back six generations.", "The class discussed [plagerism] in research.", "She was [oblivous] to the noise.", "The [reconaissance] mission mapped the valley.", "The [paraphenalia] of camping filled the car.", "The group made a [spontanious] decision.", "The [unprecidented] storm broke every record.", "The [exhuberant] crowd cheered."];
  const DICT30 = dictG([["catastrophe", "The flood was a ___ for the town."], ["colleague", "I asked a ___ for help."], ["genealogy", "Her ___ project traced her family."], ["irresistible", "The smell of fresh bread was ___."], ["knowledgeable", "He is very ___ about birds."], ["meticulous", "A ___ editor checks every comma."], ["paraphernalia", "The hiking ___ filled the car."], ["parliament", "The ___ voted on the new law."], ["plagiarism", "___ is copying someone else's work."], ["sovereign", "A ___ nation makes its own laws."], ["spontaneous", "The ___ party was great fun."], ["unprecedented", "The heat was ___."]]);

  const A30 = [
    L("Word roots 23", meaningG(ROOT30, ROOT30P, "root"),
      meanH("Example: the root <b>dent</b> means <b>tooth</b>, as in <i>dentist</i>. Find the meaning of yours the same way."),
      [S("Roots of movement", "ambul · gress · curs · fer", "<b>ambul</b> = walk (ambulance), <b>gress</b> = step (progress), <b>curs</b> = run (current), <b>fer</b> = carry (transfer)."), S("Roots of building and holding", "stru · fid · string · pend", "<b>stru</b> = build (structure), <b>fid</b> = faith (confide), <b>string</b> = bind or tighten, <b>pend</b> = hang (pendant)."), S("Roots of action", "vinc · clus · secut · fus · lev", "<b>vinc</b> = conquer (victory), <b>clus</b> = close (include), <b>secut</b> = follow (persecute), <b>fus</b> = pour (fusion), <b>lev</b> = lift (lever).")]),
    L("Combining forms crypto-, biblio-, astro-, ichthyo- and hippo-", prefG(PREF30, PREF30P),
      prefH("Example: <b>bicycle</b> has two wheels, so <b>bi-</b> means two. Use your word the same way."),
      [S("Secret and books", "crypto- · biblio-", "<b>crypto-</b> means hidden (cryptography is secret writing). <b>biblio-</b> means book (a bibliography lists books and articles)."), S("Sky and sea", "astro- · ichthyo-", "<b>astro-</b> means star (astronomy). <b>ichthyo-</b> means fish (ichthyology is the study of fish)."), S("Horses", "hippo-", "<b>hippo-</b> means horse. A hippodrome was a Greek horse-racing track, and hippopotamus means river horse.")]),
    L("Word endings -ator, -escent, -ile and -mony", meaningG(END30, END30P, "ending"),
      meanH("Example: <b>-less</b> means without, as in <i>careless</i>. Find the meaning of your ending the same way."),
      [S("Doers", "-ator", "<b>-ator</b> names one who does something or a device that does it (translator, generator)."), S("Becoming", "-escent", "<b>-escent</b> means becoming or beginning to be (adolescent: becoming an adult)."), S("Able and results", "-ile · -mony", "<b>-ile</b> means able to or relating to (mobile, fertile). <b>-mony</b> names a result or state (harmony, testimony).")]),
    L("Homophones 27", sentG(HOMO30),
      sentHints("Example: 'I will <b>wait</b> here' and 'the <b>weight</b> of a box'. Decide which meaning your sentence needs."),
      homoSlides("aural · oral · chord · cord · clause · claws", "coarse · course · lichen · liken · raze · raise · whet · wet")),
    L("Commonly misspelled words 18", rightG(MIS30),
      misH("Example: <b>Wednesday</b> has a silent d and <b>government</b> has an n before the m. Check the middle of yours."),
      misSlides("pseu·do·nym · rec·on·nais·sance", "par·lia·ment · res·tau·ra·teur")),
    L("Academic vocabulary 6", vocG(ACAD30), vocabH("Example: 'The <b>bat</b> flew out of the cave' ➜ here bat is an animal, not a baseball tool."), vocabSlides),
    L("Management and HR words", rightG(MGMT30),
      misH("Example: <b>manager</b> has a g that sounds like a j. Check the middle and the ending of yours."),
      wordSlides("Words of the workplace", "People who run teams and hire workers use many long words that end in -tion or -ity.", "re·cruit·ment · del·e·ga·tion", "ac·count·a·bil·i·ty · col·lab·o·ra·tion")),
    L("Marketing words", rightG(MKT30),
      misH("Example: <b>customer</b> has an o before the m. Check the middle and the ending of yours."),
      wordSlides("Words of selling", "Marketing words describe how products reach people and why people choose them.", "ad·ver·tise·ment · de·mo·graph·ic", "seg·men·ta·tion · en·dorse·ment")),
    L("Cybersecurity and network words", rightG(CYBER30),
      misH("Example: <b>keyboard</b> has a y in the middle. Check the vowels and the ending of yours."),
      wordSlides("Words of safe computing", "Security experts protect information from loss and misuse, so many of their words are about keeping things safe.", "en·cryp·tion · fire·wall", "vul·ner·a·bil·i·ty · au·then·ti·ca·tion")),
    L("Look-alike words 9", sentG(LOOK30),
      sentHints("Example: <b>advice</b> is a noun ('good advice') and <b>advise</b> is a verb ('I advise you'). Decide what your sentence needs."),
      confSlides("capitol · capital · peek · peak · pique", "counselor · councilor · cite · site · sight · accept · except")),
    L("Words with several meanings 11", vocG(MULT30), vocabH("Example: 'The <b>bat</b> flew out of the cave' ➜ here bat is an animal, not a baseball tool."), multSlides),
    L("Commonly confused words in college writing 6", sentG(CONF30),
      sentHints("Example: <b>advice</b> is a noun ('good advice') and <b>advise</b> is a verb ('I advise you'). Decide what your sentence needs."),
      confSlides("memorable · memorial · version · vision · produce · product", "amount · number · descent · decent · dissent · lose · loose · than · then")),
    L("Sentence completion 9", sentG(SENT30), ssH("Example: 'Because the soup was so ___, she added more salt' ➜ bland, because she wanted more flavor."), ssSlides),
    L("Archaeology and anthropology words", rightG(ARCH30),
      misH("Example: <b>fossil</b> has a double s in the middle. Check the middle of yours, where the old Greek letters hide."),
      wordSlides("Words about the human past", "Scientists who dig up the past and study human cultures use many Greek words.", "ex·ca·va·tion · strat·ig·ra·phy", "hi·er·o·glyph·ics · cu·ne·i·form")),
    L("Word analogies 11", anaG(ANA30), anaH("Example: <b>fish : swim :: bird : fly</b>. A fish swims, so a bird flies. Now do yours."), anaSlides),
    L("Etymology 9: stories behind words", etyG(ETY30), etyH("Example: <b>sandwich</b> is named after the Earl of Sandwich, who liked to eat bread and meat while he worked. Now think about yours."),
      etySlides("tycoon · karaoke · companion", "<b>Tycoon</b> comes from a Japanese title for a great lord. <b>Karaoke</b> means empty orchestra. <b>Companion</b> means someone you share bread with.")),
    L("Proofreading 20", proofG(PROOF30), proofH("Example: 'It was a <b>wierd</b> sound' ➜ 'wierd' should be 'weird'. Check each word like that."), proofSlides("🧐")),
    L("Listen and spell 26", tyG(DICT30), dictHints("Example: 'enthusiasm' = en + thu + si + asm. Write each part, then check the whole word."), dictSlides("cat·as·tro·phe · col·league", "ge·ne·al·o·gy · par·lia·ment"))
  ];
  A30.push(MIX("Mixed practice", [A30[0], A30[1], A30[3], A30[4], A30[9], A30[14]]));
  A30.push(MIX("Level 30 Challenge", [A30[2], A30[5], A30[6], A30[7], A30[8], A30[10], A30[11], A30[12], A30[13], A30[15], A30[16], A30[17]]));

  Object.assign(SPELL_LEVELS, { 28: A28, 29: A29, 30: A30 });
})();
