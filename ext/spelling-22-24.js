// ext/spelling-22-24.js : Spelling & Words, levels 22-24 (10th grade second half, 11th grade).
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
  // phrase -> meaning with a clue in position 3: [phrase, meaning, [wrong, wrong], clue]
  const phraseG = (label, items) => () => {
    const it = pick(items), [p, m, d] = it;
    return { text: `What does the ${label} <b>${p}</b> mean?`, choices: shuf([m, ...shuf(d).slice(0, 2)]), answer: m, it };
  };

  const proofH = ex => ["Read the sentence slowly, one word at a time. Do not read ahead.", "Look for a word with a missing, extra or swapped letter. The wrong word is one that you can fix by changing a letter or two.", ex];
  const proofSlides = a => [S("Proofreading", "🕵️", "A proofreader reads slowly to find spelling mistakes."), S("Check the tricky spots", a, "Look at double letters, silent letters, endings and the middle of long words."), S("Fix it", "✏️", "Write the word the right way, then read the sentence again.")];
  const dictHints = ex => ["Press the speaker and listen. Say the word in parts, then write each part.", q => info(q.answer) + " Say it in parts and write each one.", ex];
  const dictSlides = (a, b) => [S("Spell in parts", a, "Break a long word into syllables and spell one part at a time."), S("Tricky spots", b, "Look for double letters, silent letters and parts that do not sound the way they are spelled."), S("Check", "✅", "Write the word, then say it again in parts. Does every part appear in your spelling?")];
  const sentHints = ex => ["Read the whole sentence. Think about what the missing word means.", "The choices sound alike or look alike. Match the meaning to the sentence.", ex];
  const misH = ex => ["Say each choice slowly. Look for missing, extra or swapped letters in the middle of the word.", q => info(q.answer), ex];
  const wordSlides = (h, t, a, b) => [S(h, "📚", t), S("Look closely", a, "Check the middle of the word. That is where most mistakes hide."), S("Learn by parts", b, "Split the word into parts and say each part. Then picture the whole word.")];
  const misSlides = (a, b) => wordSlides("Tricky words", "Some words are hard because of double letters, silent letters or letters that sound like others.", a, b);
  const vocabH = ex => ["Use the other words in the sentence to guess what the word means.", q => q.it[4] || "Think about whether the word feels positive or negative.", ex];
  const vocabSlides = [S("Context clues", "🔎", "The words around a new word often tell you its meaning."), S("Parts help", "🧩", "Look for a root, prefix or suffix you know inside the word."), S("Use it", "✍️", "After you learn a word, use it in your own sentence to make it stick.")];
  const meanH = ex => ["Break the word into parts. One part carries the main meaning.", q => q.it[3], ex];
  const homoSlides = (a, b) => [S("Same sound, different word", "👂", "Homophones sound the same but have different spellings and meanings."), S("Pair up", a, "Learn each pair together and tie a memory trick to each word."), S("More pairs", b, "Decide what the sentence needs, then pick the spelling that has that meaning.")];

  const anaG = items => () => { const it = pick(items), [a, b, c, ans, d] = it; return { text: `<b>${a}</b> is to <b>${b}</b> as <b>${c}</b> is to ...?`, choices: shuf([ans, ...shuf(d).slice(0, 2)]), answer: ans, it }; };
  const anaH = ex => ["An analogy has two pairs. First find how the first two words are linked.", q => q.it[5], ex];
  const anaSlides = [S("Word pairs", "🔗", "An <b>analogy</b> shows that two pairs of words are linked in the same way."), S("Find the link", "A : B :: C : ?", "Say the link as a sentence, such as 'a ___ is a tool for ___' or 'this is the opposite of that'."), S("Use it twice", "✅", "Test your answer by saying the same sentence for the second pair. If it works, you have the match.")];
  const etyG = items => () => { const it = pick(items), [t, a, d] = it; return { text: t, choices: shuf([a, ...shuf(d).slice(0, 2)]), answer: a, it }; };
  const etyH = ex => ["Many words hide a short story: a person, a place, a thing or a few old words joined together.", q => q.it[3], ex];
  const etySlides = (a, b) => [S("Word stories", "📜", "<b>Etymology</b> is the study of where words come from. Many English words began as names, places or old phrases."), S("Stories to know", a, b), S("Why it helps", "🧠", "If you know the story behind a word, the spelling and the meaning are much easier to remember.")];
  const phrH = ex => ["Do not read the words one by one. Ask what the whole phrase means when people say it.", q => q.it[3], ex];
  const phrSlides = (a, b) => [S("Idioms", "💬", "An <b>idiom</b> is a phrase whose meaning is different from its words."), S("Examples", a, b), S("Tip", "🧩", "If the words make no sense on their own, look for the idea behind the picture.")];
  const multSlides = [S("Many meanings", "🔀", "Lots of words have more than one meaning. The sentence tells you which one is used."), S("Test each meaning", "🔎", "Put each meaning into the sentence. Only one will make sense."), S("SAT tip", "✍️", "Tests often use a common word in an uncommon way. Read the whole sentence before you decide.")];
  const ssSlides = [S("Complete the thought", "🧩", "A sentence-completion question gives a sentence with a missing word. The best word fits the meaning of the whole sentence."), S("Look for clue words", "because · although · but", "<b>Because</b> and <b>so</b> point to a similar idea. <b>Although</b> and <b>but</b> point to an opposite idea."), S("Try each choice", "✅", "Put every choice into the blank and read it aloud. Cross out the ones that make no sense.")];
  const ssH = ex => ["Read the whole sentence, then say in your own words what the blank should mean.", "Look for clue words such as because, although or but. They tell you if the blank agrees with the rest of the sentence or goes against it.", ex];
  const idiG = items => () => { const it = pick(items), [p, m, d] = it; return { text: `What does the idiom <b>${p}</b> mean?`, choices: shuf([m, ...shuf(d).slice(0, 2)]), answer: m, it }; };

  // ================= LEVEL 22 =================
  const HOMO22 = [
    ["The fried egg had a bright ___.", "yolk", ["yoke", "yolke"]], ["The oxen wore a wooden ___.", "yoke", ["yolk", "yoak"]],
    ["The motion ___ turns on the light.", "sensor", ["censor", "senser"]], ["A film ___ may cut parts out of a movie.", "censor", ["sensor", "senser"]],
    ["The ___ gown was made of white lace.", "bridal", ["bridle", "bridel"]], ["The rider pulled gently on the horse's ___.", "bridle", ["bridal", "bridel"]],
    ["He gave a ___ smile and shrugged.", "wry", ["rye", "rie"]], ["She made a sandwich on ___ bread.", "rye", ["wry", "ry"]],
    ["The lion stalked its ___ through the tall grass.", "prey", ["pray", "prai"]], ["The villagers gathered to ___ for rain.", "pray", ["prey", "prae"]],
    ["The audience was ___ as the magician began his trick.", "rapt", ["wrapped", "rapped"]], ["She ___ the gift in shiny blue paper.", "wrapped", ["rapt", "rapped"]],
    ["The nurse put a ___ of medicine on the tray.", "vial", ["vile", "viel"]], ["The smell from the garbage can was ___.", "vile", ["vial", "viel"]],
    ["Each ___ in the contract must be read carefully.", "clause", ["claws", "clawse"]], ["The cat sharpened its ___ on the post.", "claws", ["clause", "clauz"]]
  ];
  const MIS22 = [["acquiesce", ["aquiesce", "acquiese"]], ["belligerent", ["beligerent", "belligerant"]], ["chrysanthemum", ["crysanthemum", "chrysanthamum"]], ["colloquial", ["coloquial", "colloquail"]], ["corroborate", ["corraborate", "coroborate"]], ["hierarchy", ["heirarchy", "hierachy"]], ["hypocrite", ["hypocrit", "hipocrite"]], ["indispensable", ["indispensible", "indispenseable"]], ["inoculate", ["innoculate", "inocculate"]], ["labyrinth", ["labrynth", "labyrinthe"]], ["luxurious", ["luxurius", "luxuriuos"]], ["precarious", ["precarius", "percarious"]], ["predecessor", ["predecesor", "predessesor"]], ["surreptitious", ["surreptitous", "sureptitious"]], ["vigilant", ["vigilent", "vigalant"]]];
  const MED22 = [["cardiologist", ["cardeologist", "cardiolgist"]], ["neurologist", ["nurologist", "neurolgist"]], ["pediatrician", ["pediatrition", "peditrician"]], ["rehabilitation", ["rehabilitaton", "rehabilatation"]], ["transplant", ["transplent", "tranplant"]], ["specimen", ["specimin", "speciman"]], ["sterilize", ["sterelize", "steralize"]], ["dosage", ["dosege", "dossage"]], ["syringe", ["syrenge", "sirynge"]], ["scalpel", ["scalpal", "scalple"]], ["incision", ["incission", "insicion"]], ["concussion", ["concusion", "consussion"]], ["inflammation", ["inflamation", "inflammashun"]], ["hemorrhage", ["hemmorage", "hemorrage"]], ["prognosis", ["prognosus", "prognosys"]], ["immunization", ["imunization", "immunazation"]]];
  const ENG22 = [["blueprint", ["blueprent", "bluprint"]], ["bulldozer", ["bulldoser", "bulldozor"]], ["combustion", ["combustian", "combuston"]], ["conveyor", ["conveyer", "convayor"]], ["electrode", ["electrod", "electroad"]], ["excavate", ["excavait", "exavate"]], ["friction", ["frikshun", "frixion"]], ["insulator", ["insulater", "insullator"]], ["kinetic", ["kinetick", "kynetic"]], ["lubricant", ["lubricent", "lubrikant"]], ["pneumatic", ["pnuematic", "neumatic"]], ["propulsion", ["propulsian", "propultion"]], ["scaffolding", ["scafolding", "scaffoldeng"]], ["specification", ["specifacation", "specificashun"]], ["transistor", ["transister", "transitor"]], ["vibration", ["vibrashun", "vibraton"]]];
  const SAT22 = [
    ["aloof", "The new student seemed <i>aloof</i>, standing alone and rarely speaking to anyone.", "distant and unfriendly", ["warm and chatty", "tired and sleepy"], "Think about someone who stays apart from the group."],
    ["ameliorate", "The city built new parks to <i>ameliorate</i> life for people in crowded neighborhoods.", "make better", ["make smaller", "make louder"], "Parks are meant to help the people who live nearby."],
    ["audacious", "The <i>audacious</i> plan to cross the desert on bicycles surprised everyone.", "boldly daring", ["very careful", "completely boring"], "Everyone was surprised by how risky it sounded."],
    ["austere", "The monk lived in an <i>austere</i> room with a bed, a table and nothing else.", "plain and simple", ["bright and cheerful", "huge and fancy"], "Look at how few things are in the room."],
    ["bolster", "A few encouraging words can <i>bolster</i> a nervous player's confidence.", "strengthen", ["weaken", "ignore"], "Encouraging words are given to help."],
    ["capricious", "The <i>capricious</i> weather changed from sun to snow and back in a single morning.", "changing suddenly for no clear reason", ["steady and dependable", "cold and wet"], "Notice how fast and how often the weather changes."],
    ["circumspect", "Be <i>circumspect</i> before signing; look carefully at all the risks first.", "careful and watchful", ["quick and eager", "angry and rude"], "The speaker wants you to look at risks before acting."],
    ["clandestine", "The spies held a <i>clandestine</i> meeting that no one else knew about.", "kept secret", ["open to all", "very short"], "No one else knew about the meeting."],
    ["cogent", "Her <i>cogent</i> argument was so clear and strong that the whole class agreed.", "clear and convincing", ["confusing", "very long"], "Everyone agreed, which tells you something about the argument."],
    ["complacent", "The champions grew <i>complacent</i> and stopped practicing, so they lost the next game.", "too satisfied to try harder", ["very nervous", "angry at others"], "They stopped practicing, and then something bad happened."]
  ];
  const LOOK22 = [
    ["It took the animals a few weeks to ___ to the colder climate.", "adapt", ["adopt", "adept"]], ["The family decided to ___ a puppy from the shelter.", "adopt", ["adapt", "adept"]],
    ["Many people ___ from their home country to look for a better life elsewhere.", "emigrate", ["immigrate", "emmigrate"]], ["She came to ___ to Canada last spring and found a new job.", "immigrate", ["emigrate", "imigrate"]],
    ["Dark clouds warned that a storm was ___.", "imminent", ["eminent", "iminent"]], ["The ___ scientist won three awards for her research.", "eminent", ["imminent", "emminent"]],
    ["Please ___ that the gate is locked before you leave.", "ensure", ["insure", "ensur"]], ["The owner will ___ the old violin against theft.", "insure", ["ensure", "insur"]],
    ["The noise from the road was ___, never stopping all night.", "continuous", ["continual", "continous"]], ["The phone rang ___ during dinner, again and again with long gaps between rings.", "continually", ["continuously", "continualy"]],
    ["A judge must be ___, with no interest in who wins.", "disinterested", ["uninterested", "disinterrested"]], ["He was ___ in the lecture and yawned the whole time.", "uninterested", ["disinterested", "uninterrested"]],
    ["The fox managed to ___ the hunters by hiding in a hollow log.", "elude", ["allude", "elood"]], ["In her speech she did ___ to the earlier debate without naming it.", "allude", ["elude", "alude"]],
    ["Please ___ the gift in colorful paper.", "envelop", ["envelope", "envellop"]], ["She sealed the letter in an ___.", "envelope", ["envelop", "envelup"]]
  ];
  const DICT22 = dictG([["gratitude", "She wrote a note to show her ___."], ["jeopardy", "The rising flood put the village in ___."], ["judgment", "The referee used good ___ in making the call."], ["ingenious", "The inventor came up with an ___ solution."], ["temperament", "The dog has a calm and gentle ___."], ["tentative", "We made ___ plans, but they might change."], ["questionable", "The shop's claims sounded ___ to me."], ["dissatisfied", "The customer was ___ with the service."], ["rhetoric", "The senator's ___ stirred the crowd."], ["suffrage", "The right to vote is also called ___."], ["reminiscence", "Grandpa's ___ about school made us laugh."], ["inadvertent", "It was an ___ mistake; she did not mean it."], ["paralleled", "The road ___ the river for ten miles."], ["clientele", "The restaurant has a loyal ___."]]);
  const ETY22 = [
    ["Where does the word <b>boycott</b> come from?", "A landlord named Captain Boycott, whom neighbors refused to work for", ["A town where a famous protest began", "A Latin word for 'to refuse'"], "Think of a person's name that became an everyday word."],
    ["The word <b>curfew</b> comes from French <i>couvre-feu</i>. What did that mean?", "cover the fire", ["close the door", "ring the bell"], "Long ago, people had to take care of their fires at night so a house would not burn."],
    ["The word <b>dandelion</b> comes from French <i>dent de lion</i>. What does that mean?", "lion's tooth", ["lion's mane", "sun's flower"], "The jagged leaves reminded people of something in an animal's mouth."],
    ["The 'mare' in <b>nightmare</b> comes from an old word for...", "an evil spirit", ["a female horse", "a dark forest"], "It is not the animal; it comes from an old folk belief."],
    ["<b>Goodbye</b> began as a short form of...", "God be with ye", ["Go on, bye now", "Good be your way"], "It was originally a kind wish said when people parted."],
    ["<b>Aftermath</b> first meant...", "the new grass that grows after a field is cut", ["a test that comes after math class", "the end of a long journey"], "The 'math' here has nothing to do with numbers; think of a farm."],
    ["<b>Trivial</b> comes from Latin words meaning 'three roads'. Why?", "common talk happened where roads met", ["a triangle was drawn at crossroads", "three kings met on the road"], "Think about where ordinary people chatted long ago."],
    ["French <i>pied de grue</i> means 'crane's foot'. Why was that used for <b>pedigree</b>?", "the branching lines of a family tree looked like a bird's foot", ["cranes were the first animals bred by farmers", "a crane was the symbol of speed"], "Picture a chart with lines that split into three."],
    ["<b>Ostracize</b> comes from the Greek word for a piece of pottery. Why?", "citizens wrote a name on a pottery piece to vote someone out", ["people threw old pots at those they disliked", "the punishment was making pots for a year"], "Pottery pieces were used like scraps of paper."],
    ["<b>Mortgage</b> comes from French for 'dead pledge'. Why 'dead'?", "the pledge ends, or 'dies', when the loan is paid off", ["the pledge could only be made after a death", "the pledge was written on very old paper"], "Think about what happens to a promise once it is finished."]
  ];
  const OCEAN22 = [["plankton", ["planckton", "planton"]], ["estuary", ["estuery", "estuarey"]], ["crustacean", ["crustation", "crustacian"]], ["salinity", ["salinty", "sallinity"]], ["navigator", ["navagator", "navigater"]], ["buoy", ["bouy", "boui"]], ["barnacle", ["barnicle", "barnackle"]], ["undertow", ["undertoe", "undertoh"]], ["anchorage", ["ankorage", "anchorege"]], ["horizon", ["horizen", "horison"]], ["cephalopod", ["cephalapod", "sephalopod"]], ["algae", ["algee", "algea"]], ["abyss", ["abiss", "abyse"]], ["anemone", ["anenome", "anemoni"]], ["fjord", ["fyord", "fjorde"]], ["lagoon", ["lagune", "lagoone"]], ["maritime", ["maratime", "maritine"]], ["whirlpool", ["whirpool", "wirlpool"]]];
  const PHIL22 = [["assumption", ["assumtion", "asumption"]], ["contradiction", ["contradicsion", "contradiktion"]], ["conviction", ["convicsion", "convition"]], ["criteria", ["criterea", "crieteria"]], ["doctrine", ["doctrin", "doctrene"]], ["fallacy", ["falacy", "fallicy"]], ["inference", ["inferance", "infrence"]], ["intuition", ["intuision", "intuishun"]], ["premise", ["premice", "premize"]], ["rationalism", ["rationalizm", "rasionalism"]], ["relativism", ["relativizm", "relitivism"]], ["syllogism", ["sylogism", "syllogizm"]], ["theory", ["theorie", "thoery"]], ["ethical", ["ethicle", "ethicall"]], ["dogma", ["dogmah", "doggma"]]];
  const STAT22 = [["correlation", ["corelation", "corrolation"]], ["histogram", ["histagram", "histrogram"]], ["regression", ["regresion", "regreshion"]], ["variance", ["varience", "varyance"]], ["scatterplot", ["scaterplot", "scatterplott"]], ["distribution", ["distrabution", "distribusion"]], ["sampling", ["sampeling", "samplin"]], ["observation", ["observashun", "obsevation"]], ["parameter", ["paramater", "parameeter"]], ["representative", ["representitive", "reprisentative"]], ["spreadsheet", ["spredsheet", "spreadsheat"]], ["uncertainty", ["uncertanty", "unsertainty"]], ["prediction", ["predicsion", "predicton"]], ["interval", ["intervel", "intirval"]], ["cluster", ["clustor", "clustar"]], ["dataset", ["datasett", "datasete"]]];

  // ================= LEVEL 22 =================
  const ROOT22 = [
    ["contribute", "trib", "give", "Everyone brought a little money to help pay for the class trip."],
    ["gravity", "grav", "heavy", "This force pulls a dropped apple toward the ground."],
    ["transfusion", "fus", "pour", "In a hospital, blood flows from a donor into a patient."],
    ["resonate", "son", "sound", "A bell keeps ringing long after it is struck."],
    ["protrude", "trud", "push", "A nail that sticks out of a board does this."],
    ["vitamin", "vit", "life", "A small pill your body needs each day to stay healthy and strong."],
    ["prelude", "lud", "play", "A short piece of music that comes first, before the main performance."],
    ["zoology", "zo", "animal", "Students in this class study lions, frogs and beetles."],
    ["distort", "tort", "twist", "A funhouse mirror bends your reflection out of shape."],
    ["florist", "flor", "flower", "A shop worker arranges roses and tulips into bouquets."]
  ];
  const ROOT22P = ["give", "heavy", "pour", "sound", "push", "life", "play", "animal", "twist", "flower"];
  const PREF22 = [["auto-", "automobile", "self"], ["auto-", "autobiography", "self"], ["poly-", "polygon", "many"], ["poly-", "polyglot", "many"], ["hydro-", "hydroelectric", "water"], ["hydro-", "hydroplane", "water"], ["thermo-", "thermometer", "heat"], ["thermo-", "thermostat", "heat"], ["equi-", "equilateral", "equal"], ["equi-", "equivalent", "equal"]];
  const PREF22P = ["self", "many", "water", "heat", "equal", "across"];
  const END22 = [
    ["monarchy", "-archy", "rule", "One king or queen heads the whole country."],
    ["anarchy", "-archy", "rule", "A land where nobody is in charge and there are no laws."],
    ["pesticide", "-cide", "killer", "Farmers spray it on crops to stop harmful bugs."],
    ["herbicide", "-cide", "killer", "A gardener spreads it to clear unwanted weeds."],
    ["arthritis", "-itis", "swelling of", "This condition makes the joints stiff and sore."],
    ["tonsillitis", "-itis", "swelling of", "The doctor looks at a red, sore throat."],
    ["microscope", "-scope", "tool for viewing", "Scientists use it to study tiny cells."],
    ["periscope", "-scope", "tool for viewing", "A submarine crew uses it to look above the waves."],
    ["asteroid", "-oid", "looking like", "A chunk of rock orbiting the Sun between Mars and Jupiter."],
    ["spheroid", "-oid", "looking like", "A rugby ball is this stretched ball-shaped solid."]
  ];
  const END22P = ["rule", "killer", "swelling of", "tool for viewing", "looking like", "fear of"];
  const ANA22 = [
    ["author", "novel", "architect", "building", ["blueprint", "painter"], "The first word names a maker, and the second names what the maker creates."],
    ["glove", "hand", "sock", "foot", ["shoe", "leg"], "The first word is worn on the body part named by the second."],
    ["thermometer", "temperature", "ruler", "length", ["wood", "draw"], "The first word is a tool, and the second is what the tool measures."],
    ["timid", "bold", "generous", "stingy", ["kind", "rich"], "The two words are opposites."],
    ["foal", "horse", "calf", "cow", ["farm", "milk"], "The first word names a baby animal and the second names its kind."],
    ["petal", "flower", "page", "book", ["paper", "write"], "The first word is a part of the second."],
    ["whisper", "shout", "stroll", "sprint", ["walk", "hike"], "The second word is a much stronger version of the first."],
    ["drought", "water", "famine", "food", ["hunger", "farm"], "The first word means a serious lack of the second."]
  ];
  const MULT22 = [
    ["novel", "The inventor had a <i>novel</i> idea that nobody had tried before.", "new and different", ["long and boring", "written as a story"], "Think about an idea nobody had tried."],
    ["fine", "The spider spun a <i>fine</i> thread, almost too thin to see.", "very thin", ["of high quality", "a payment for breaking a rule"], "Look at how well you can see the thread."],
    ["content", "After a big dinner, the cat was <i>content</i> to sleep by the fire.", "happy and satisfied", ["what is inside a box", "the topic of a book"], "Think about how a well-fed cat feels."],
    ["spare", "Take a <i>spare</i> key in case you lose the first one.", "extra, kept in reserve", ["to show mercy", "thin and bare"], "The sentence talks about losing the first one."],
    ["bear", "I cannot <i>bear</i> the loud noise any longer.", "put up with", ["carry a heavy load", "a large furry animal"], "Think about a noise that is too much."],
    ["mean", "The <i>mean</i> of 2, 4 and 6 is 4.", "the average", ["unkind", "to intend"], "Numbers are being combined here."],
    ["firm", "She works for a law <i>firm</i> downtown.", "a business", ["hard and solid", "strict"], "Think about where a lawyer works."],
    ["board", "The family will <i>board</i> the train at noon.", "get on", ["a flat piece of wood", "a group of leaders"], "A train is something you step onto."],
    ["pitch", "The campers will <i>pitch</i> their tent by the lake.", "set up", ["throw hard", "a musical tone"], "Think about what campers do with a tent."],
    ["fair", "The judge was <i>fair</i> to both sides.", "just and equal", ["a carnival with rides", "light in color"], "Think about how a judge should treat people."]
  ];
  const SENT22 = [
    ["The scientist was ___ about her results, so she repeated the experiment to be sure.", "wary", ["careless", "boastful"]],
    ["The hikers faced an ___ climb that left them exhausted.", "strenuous", ["effortless", "brief"]],
    ["After weeks of rain, the ___ river flooded the fields.", "swollen", ["shrunken", "frozen"]],
    ["Her ___ nature made her the first to help any stranger in trouble.", "compassionate", ["indifferent", "hostile"]],
    ["The new law was ___ because it treated every citizen the same way.", "impartial", ["biased", "secret"]],
    ["His ___ remarks hurt his friend's feelings, even though he did not mean them to.", "thoughtless", ["thoughtful", "cheerful"]],
    ["The old map was so ___ that the towns were barely readable.", "faded", ["colorful", "brand-new"]],
    ["Even a small amount of the ___ chemical can cause harm.", "toxic", ["harmless", "fragrant"]],
    ["The teacher's ___ praise made the shy student smile.", "sincere", ["insincere", "bitter"]],
    ["The movie was so ___ that the audience could guess the ending in the first five minutes.", "predictable", ["surprising", "confusing"]]
  ];
  const PROOF22 = ["The [mecanic] fixed the engine in an hour.", "She felt [nervus] before the big speech.", "The [librery] closes at six o'clock.", "We had [diffrent] ideas about the project.", "A [sucessful] business needs a good plan.", "He [recieved] a prize for his science project.", "The [enviroment] needs our care.", "Our [goverment] makes laws for the country.", "That was a [fascinateing] story.", "The [temprature] dropped below freezing.", "They had to [seperate] the red socks from the white ones.", "He felt [embarassed] when he forgot his lines.", "The [apropriate] shoes for hiking are strong boots.", "The [curiousity] of the child led to many questions."];

  const A22 = [
    L("Word roots 15", meaningG(ROOT22, ROOT22P, "root"),
      meanH("Example: the root <b>aud</b> means <b>hear</b>, as in <i>audience</i>. Find the meaning of yours the same way."),
      [S("Roots to know", "trib · grav · fus · son", "<b>trib</b> = give (tribute), <b>grav</b> = heavy (gravity), <b>fus</b> = pour (fusion), <b>son</b> = sound (sonic)."), S("More roots", "trud · vit · lud · zo", "<b>trud</b> = push (intrude), <b>vit</b> = life (vital), <b>lud</b> = play (ludicrous), <b>zo</b> = animal (zoo)."), S("Last two", "tort · flor", "<b>tort</b> = twist (contort), <b>flor</b> = flower (floral).")]),
    L("Prefixes auto-, poly-, hydro-, thermo- and equi-", prefG(PREF22, PREF22P),
      ["Split the word into the prefix and the rest. What does the rest of the word tell you?", "Picture the real thing the word names. How does the prefix describe it?", "Example: <b>semicircle</b> is half of a circle, so <b>semi-</b> means half. Use your word the same way."],
      [S("Self and many", "auto- · poly-", "<b>auto-</b> means self (automatic works by itself). <b>poly-</b> means many (a polygon has many sides)."), S("Water and heat", "hydro- · thermo-", "<b>hydro-</b> means water (hydrant). <b>thermo-</b> means heat (a thermos keeps drinks hot)."), S("Equal", "equi-", "<b>equi-</b> means equal (the equator splits Earth into two equal halves).")]),
    L("Word endings -archy, -cide, -itis, -scope and -oid", meaningG(END22, END22P, "ending"),
      meanH("Example: <b>-less</b> means without, as in <i>careless</i>. Find the meaning of your ending the same way."),
      [S("Rule and killer", "-archy · -cide", "<b>-archy</b> means rule (monarchy). <b>-cide</b> means a killer or killing (insecticide kills insects)."), S("Swelling and viewing", "-itis · -scope", "<b>-itis</b> means swelling of a body part (bronchitis). <b>-scope</b> names a tool for viewing (telescope)."), S("Like", "-oid", "<b>-oid</b> means looking like or shaped like (humanoid looks human).")]),
    L("Homophones 19", sentG(HOMO22),
      sentHints("Example: 'I will <b>wait</b> here' and 'the <b>weight</b> of a box'. Decide which meaning your sentence needs."),
      homoSlides("lessen · lesson · medal · meddle", "stationary · stationery · bridal · bridle")),
    L("Commonly misspelled words 10", rightG(MIS22),
      misH("Example: <b>Wednesday</b> has a silent d and <b>government</b> has an n before the m. Check the middle of yours."),
      misSlides("ques·tion·naire · main·te·nance", "con·nois·seur · rec·on·nais·sance")),
    L("Medicine and hospital words", rightG(MED22),
      misH("Example: <b>surgery</b> has a g that sounds like j. Many medical words come from Greek, so watch for ph, th, ch and y."),
      wordSlides("Medical words", "Doctors and nurses use long words from Greek and Latin. Learn them in parts.", "steth·o·scope · phar·ma·cist", "or·tho·pe·dic · an·es·the·sia")),
    L("Engineering and technology words", rightG(ENG22),
      misH("Example: <b>engineer</b> ends in -eer, like <i>volunteer</i>. Check the ending and the middle of long words."),
      wordSlides("Engineer's words", "Many words about machines and computers come from Greek and Latin.", "tur·bine · hy·drau·lic", "in·fra·struc·ture · al·go·rithm")),
    L("SAT words 1", vocG(SAT22), vocabH("Example: 'The <b>lengthy</b> movie lasted four hours' ➜ lengthy means very long, because of the four hours."), vocabSlides),
    L("Look-alike words 1", sentG(LOOK22),
      sentHints("Example: <b>advice</b> is a noun ('good advice') and <b>advise</b> is a verb ('I advise you'). Decide what your sentence needs."),
      [S("Words that look alike", "👀", "Some words differ by only one or two letters but mean very different things."), S("Pairs to know", "adapt · adopt · eminent · imminent · ensure · insure", "<b>Adapt</b> = change to fit. <b>Adopt</b> = take as your own. <b>Eminent</b> = famous and respected. <b>Imminent</b> = about to happen."), S("More pairs", "disinterested · uninterested · elude · allude", "<b>Emigrate</b> = leave a country. <b>Immigrate</b> = arrive in a new country. <b>Disinterested</b> = fair, with nothing to gain. <b>Uninterested</b> = bored. <b>Elude</b> = escape. <b>Allude</b> = hint at.")]),
    L("Word analogies 4", anaG(ANA22), anaH("Example: <b>fish : swim :: bird : fly</b>. A fish swims, so a bird flies. Now do yours."), anaSlides),
    L("Ocean words", rightG(OCEAN22),
      misH("Example: <b>ocean</b> has a c that sounds like sh. Ocean words often have Latin and Greek parts, so check the middle."),
      wordSlides("Words of the sea", "Ocean science uses many long words from Latin and Greek.", "plank·ton · es·tu·ar·y", "ar·chi·pel·a·go · crus·ta·cean")),
    L("Philosophy and ethics words", rightG(PHIL22),
      misH("Example: <b>philosophy</b> starts with ph, which sounds like f. Many words about ideas end in -ity, -ence or -ics."),
      wordSlides("Words about ideas", "Philosophy is the study of big questions about right, wrong and truth.", "phi·los·o·phy · in·teg·ri·ty", "di·lem·ma · re·spon·si·bil·i·ty")),
    L("Statistics and data words", rightG(STAT22),
      misH("Example: <b>average</b> has three a's. Many data words end in -tion, -ile or -ian, so check the ending."),
      wordSlides("Words about data", "Statistics is the science of collecting and understanding numbers.", "me·di·an · fre·quen·cy", "cor·re·la·tion · per·cen·tile")),
    L("Words with several meanings 3", vocG(MULT22), vocabH("Example: 'The <b>bat</b> flew out of the cave' ➜ here bat is an animal, not a baseball tool."), multSlides),
    L("Sentence completion 1", sentG(SENT22), ssH("Example: 'Because the soup was so ___, she added more salt' ➜ bland, because she wanted more flavor."), ssSlides),
    L("Proofreading 12", proofG(PROOF22), proofH("Example: 'It was a <b>wierd</b> sound' ➜ 'wierd' should be 'weird'. Check each word like that."), proofSlides("🧐")),
    L("Listen and spell 18", tyG(DICT22), dictHints("Example: 'enthusiasm' = en + thu + si + asm. Write each part, then check the whole word."), dictSlides("suf·fi·cient · pes·si·mis·tic", "phe·nom·e·non · per·se·ver·ance")),
    L("Etymology 1: stories behind words", etyG(ETY22), etyH("Example: <b>sandwich</b> is named after the Earl of Sandwich, who liked to eat bread and meat while he worked. Now think about yours."),
      etySlides("boycott · curfew · dandelion", "<b>Boycott</b> comes from Captain Boycott. <b>Curfew</b> is from French for 'cover the fire'. <b>Dandelion</b> is from French for 'lion's tooth'."))
  ];
  A22.push(MIX("Mixed practice", [A22[0], A22[3], A22[4], A22[7], A22[8], A22[13]]));
  A22.push(MIX("Level 22 Challenge", [A22[1], A22[2], A22[5], A22[6], A22[9], A22[10], A22[11], A22[12], A22[14], A22[15], A22[16], A22[17]]));

  // ================= LEVEL 23 =================
  const ROOT23 = [
    ["cryptic", "crypt", "hidden", "The message was a puzzle that nobody could understand at first."],
    ["orthodox", "dox", "belief", "A very traditional way of thinking that follows long-held ideas."],
    ["petition", "pet", "seek", "A group asks the mayor, in writing, to build a new park."],
    ["metropolis", "pol", "city", "A huge place where millions of people live and work."],
    ["sedentary", "sed", "sit", "A job at a desk all day, with very little moving around."],
    ["simulate", "simil", "like", "A pilot practices on a machine that imitates a real flight."],
    ["multitude", "mult", "many", "A huge crowd filled the stadium."],
    ["loquacious", "loqu", "speak", "A neighbor who loves a long chat over the fence."],
    ["sacred", "sacr", "holy", "A temple is treated with deep respect."],
    ["captive", "capt", "take", "A bird kept in a cage cannot leave."]
  ];
  const ROOT23P = ["hidden", "belief", "seek", "city", "sit", "like", "many", "speak", "holy", "take"];
  const PREF23 = [["sur-", "surpass", "over"], ["sur-", "surplus", "over"], ["vice-", "vice president", "in place of"], ["vice-", "vice captain", "in place of"], ["cosmo-", "cosmopolitan", "world"], ["cosmo-", "cosmos", "world"], ["hemi-", "hemisphere", "half"], ["bio-", "biosphere", "life"], ["bio-", "biography", "life"]];
  const PREF23P = ["over", "in place of", "world", "half", "life", "against"];
  const END23 = [
    ["biography", "-ography", "writing or recording", "A book that tells the story of a person's life."],
    ["photography", "-ography", "writing or recording", "A camera captures light to make a picture."],
    ["astronomy", "-nomy", "laws or science of", "Scientists who study the stars and planets work in this field."],
    ["agronomy", "-nomy", "laws or science of", "Experts in this field help farmers grow better crops."],
    ["geometry", "-metry", "measuring", "The math class that studies angles, triangles and circles."],
    ["optometry", "-metry", "measuring", "A professional checks how well your eyes see letters on a chart."],
    ["mountaineer", "-eer", "person who works with", "Someone who climbs high peaks for a hobby or a living."],
    ["volunteer", "-eer", "person who works with", "A person who offers free help at an animal shelter."],
    ["kitchenette", "-ette", "small", "A tiny cooking area in a studio apartment."],
    ["statuette", "-ette", "small", "A little figure given as a trophy at an awards night."]
  ];
  const END23P = ["writing or recording", "laws or science of", "measuring", "person who works with", "small", "state of being"];
  const HOMO23 = [
    ["The bear slept in its ___ all winter.", "lair", ["layer", "lare"]], ["Put a ___ of paper towel under the dish.", "layer", ["lair", "laier"]],
    ["It was only a ___ cold, so she went to school.", "slight", ["sleight", "slite"]], ["The magician used ___ of hand to hide the coin.", "sleight", ["slight", "slieght"]],
    ["The ship will ___ along the coast for a week.", "cruise", ["crews", "cruize"]], ["Two ___ worked in shifts to sail the ship.", "crews", ["cruise", "cruse"]],
    ["Miners found a rich ___ of silver deep underground.", "lode", ["load", "lowed"]], ["The truck carried a heavy ___ of bricks.", "load", ["lode", "lowd"]],
    ["A tall ___ stood on one leg in the marsh.", "stork", ["stalk", "storke"]], ["The farmer cut each corn ___ at the base.", "stalk", ["stork", "stawk"]],
    ["The music touched her ___.", "soul", ["sole", "sowl"]], ["The ___ of my shoe has a hole in it.", "sole", ["soul", "soal"]],
    ["The ancient ___ sang tales of heroes.", "bard", ["barred", "bared"]], ["The guard ___ the door so no one could enter.", "barred", ["bard", "bared"]],
    ["The school may ___ the late fee this once.", "waive", ["wave", "waiv"]], ["The crowd began to ___ flags.", "wave", ["waive", "wavve"]]
  ];
  const MIS23 = [["ecstasy", ["ecstacy", "ekstasy"]], ["exuberant", ["exhuberant", "exuberent"]], ["facetious", ["facetous", "facitious"]], ["forfeit", ["forfiet", "forfit"]], ["grievous", ["grievious", "greivous"]], ["idiosyncrasy", ["idiosyncracy", "idiosyncrasey"]], ["incidentally", ["incidently", "incidentaly"]], ["irresistible", ["irresistable", "irrisistible"]], ["omission", ["ommission", "omision"]], ["ostentatious", ["ostentatous", "ostentacious"]], ["paraphernalia", ["paraphenalia", "paraphernailia"]], ["persistent", ["persistant", "persitent"]], ["plagiarize", ["plagerize", "plaigiarize"]], ["quandary", ["quandry", "quandery"]], ["simultaneous", ["simultanious", "simultaneus"]], ["unscrupulous", ["unscrupulus", "unscrupolous"]]];
  const POL23 = [["ballot", ["balot", "ballott"]], ["campaign", ["campane", "campain"]], ["constituency", ["constituancy", "constitutency"]], ["delegate", ["delagate", "delegat"]], ["electorate", ["electrate", "electorat"]], ["filibuster", ["filabuster", "filibustor"]], ["incumbent", ["incumbant", "incumbunt"]], ["legislator", ["legeslator", "legislater"]], ["lobbyist", ["lobbiest", "lobyist"]], ["nominee", ["nominy", "nominnee"]], ["partisan", ["partizan", "partisen"]], ["referendum", ["refferendum", "referandum"]], ["senator", ["senater", "senetor"]], ["manifesto", ["manafesto", "manifestoe"]], ["caucus", ["cawcus", "caucas"]], ["bipartisan", ["bipartizan", "bipartisen"]], ["coalition", ["coalision", "colition"]]];
  const CHEM23 = [["acidity", ["acidty", "asidity"]], ["alkaline", ["alkalyne", "alkeline"]], ["beaker", ["beeker", "beakar"]], ["crystallize", ["cristalize", "crystalize"]], ["filtration", ["filtrasion", "filtraton"]], ["flammable", ["flamable", "flammible"]], ["isotope", ["isotop", "isotoap"]], ["neutron", ["nutron", "neutrun"]], ["oxidation", ["oxydation", "oxidashun"]], ["precipitate", ["percipitate", "precipitait"]], ["proton", ["protton", "protan"]], ["solvent", ["solvant", "sovlent"]], ["sublimation", ["sublimashun", "sublimaton"]], ["titration", ["titrasion", "tytration"]], ["valence", ["valense", "valanse"]], ["hydrogen", ["hydrogin", "hydrojen"]]];
  const ARCH23 = [["balcony", ["balconey", "balkony"]], ["buttress", ["butress", "buttriss"]], ["cathedral", ["cathedrel", "catheedral"]], ["colonnade", ["colonade", "collonade"]], ["cornice", ["cornis", "cornise"]], ["gable", ["gabel", "gabble"]], ["girder", ["gerder", "girdur"]], ["lintel", ["lintle", "lintell"]], ["mezzanine", ["mezanine", "mezzanene"]], ["pavilion", ["pavillion", "pavillian"]], ["portico", ["porticoe", "portiko"]], ["rotunda", ["rotundah", "rotonda"]], ["skyscraper", ["skyscrapper", "skyscrapor"]], ["turret", ["turet", "turrit"]], ["veranda", ["verranda", "verander"]], ["terrace", ["terace", "terrase"]]];
  const THEA23 = [["audition", ["auditon", "auddition"]], ["choreographer", ["coreographer", "choreografer"]], ["intermission", ["intermision", "intermishun"]], ["producer", ["produser", "prodducer"]], ["screenplay", ["screnplay", "screenplai"]], ["soliloquy", ["soliloqui", "soliloqy"]], ["spotlight", ["spotliet", "spotlyte"]], ["understudy", ["understudie", "understuddy"]], ["cinematography", ["cinematograpy", "cinemotography"]], ["documentary", ["documentery", "docummentary"]], ["animation", ["animashun", "animaton"]], ["sequel", ["sequal", "sequil"]], ["trailer", ["trailor", "trailar"]], ["stagehand", ["stagehande", "stagehend"]]];
  const GEN23 = [["dominant", ["dominent", "domanant"]], ["enzyme", ["enzime", "enzyne"]], ["evolution", ["evolushun", "evolusion"]], ["genome", ["genom", "genomme"]], ["heredity", ["heridity", "hereditie"]], ["inherit", ["inherrit", "inherat"]], ["mutation", ["mutashun", "mutaton"]], ["recessive", ["recesive", "receessive"]], ["symbiosis", ["symbeosis", "symbiosus"]], ["membrane", ["membran", "membrain"]], ["cytoplasm", ["cytoplazm", "citoplasm"]], ["adaptation", ["adaptashun", "adaptaton"]], ["vertebrate", ["vertabrate", "vertibrate"]], ["invertebrate", ["invertabrate", "invertibrate"]], ["mammal", ["mamal", "mammel"]], ["reptile", ["reptyle", "reptille"]]];
  const SAT23 = [
    ["conciliatory", "After the argument, she made a <i>conciliatory</i> offer to share the prize.", "meant to make peace", ["meant to start a fight", "very expensive"], "She wants the argument to end."],
    ["convoluted", "The directions were so <i>convoluted</i> that we got lost twice.", "complicated and hard to follow", ["short and clear", "written in red ink"], "Think about why people would get lost."],
    ["copious", "She took <i>copious</i> notes, filling twenty pages in one lecture.", "plentiful", ["very few", "messy"], "Count the pages mentioned in the sentence."],
    ["credulous", "The <i>credulous</i> shopper believed every claim in the advertisement.", "too ready to believe", ["too suspicious to buy", "very rich"], "Notice how many claims were believed."],
    ["deference", "Out of <i>deference</i> to the elders, the young people stood while the grandparents sat.", "polite respect", ["fear of the dark", "strong disagreement"], "Think about why the young people stood."],
    ["deride", "Good teammates never <i>deride</i> someone for missing a shot.", "make fun of", ["praise loudly", "copy exactly"], "The sentence is about how good teammates should not act."],
    ["disparage", "Please do not <i>disparage</i> his work; he did his very best.", "speak of as unimportant", ["pay for", "make longer"], "He did his best, so what should you not say?"],
    ["dogmatic", "He was so <i>dogmatic</i> that he would not listen to any other idea.", "stubbornly sure of one's own opinion", ["open-minded", "easily frightened"], "He would not listen to others."],
    ["eclectic", "Her <i>eclectic</i> music collection included jazz, opera, rock and folk.", "drawn from many different sources", ["all in one style", "very old"], "Count the kinds of music listed."],
    ["enigma", "The missing painting remains an <i>enigma</i>; no one has ever explained it.", "a mystery", ["a famous song", "a clear answer"], "No one has explained it."]
  ];
  const LOOK23 = [
    ["He tried to ___ his new sports car by driving past every house on the street.", "flaunt", ["flout", "flaunte"]], ["Drivers who ___ the traffic laws can lose their licenses.", "flout", ["flaunt", "flowt"]],
    ["Her silence seemed to ___ that she disagreed.", "imply", ["infer", "inply"]], ["From the clues, I can ___ that the thief used the back door.", "infer", ["imply", "infere"]],
    ["The ___ of the island is only about two hundred people.", "populace", ["populous", "populas"]], ["The city is very ___, with millions of residents.", "populous", ["populace", "populus"]],
    ["The principal will ___ the crowd after the assembly.", "disperse", ["disburse", "dispurse"]], ["The bank will ___ the money on Friday.", "disburse", ["disperse", "dissburse"]],
    ["A mistake in the newspaper can lead to a ___ lawsuit.", "libel", ["liable", "libell"]], ["You are ___ for any damage you cause.", "liable", ["libel", "liabel"]],
    ["The garden was ___ with flowers, thick and overflowing.", "luxuriant", ["luxurious", "luxuriont"]], ["The hotel offered a ___ suite with a hot tub.", "luxurious", ["luxuriant", "luxurius"]],
    ["The ___ of the story is that honesty matters.", "moral", ["morale", "morral"]], ["Good ___ among the team helped them win.", "morale", ["moral", "morrale"]],
    ["The ___ diplomat spoke with polished charm.", "urbane", ["urban", "urbain"]], ["A busy ___ area has many shops and buses.", "urban", ["urbane", "urben"]]
  ];
  const MULT23 = [
    ["bank", "The hikers rested on the grassy <i>bank</i> of the stream.", "the land beside a river", ["a place that keeps money", "to tilt an airplane"], "Look at the word 'stream' and 'grassy'."],
    ["kind", "What <i>kind</i> of music do you like best?", "type or sort", ["gentle and caring", "a king's rule"], "The question asks about categories."],
    ["light", "The suitcase was so <i>light</i> that she could lift it with one finger.", "not heavy", ["bright", "pale in color"], "Think about lifting it with one finger."],
    ["rock", "The boat began to <i>rock</i> gently on the waves.", "move back and forth", ["a hard piece of stone", "a kind of music"], "Picture a boat on the waves."],
    ["match", "The red socks do not <i>match</i> the blue shoes.", "go well together", ["a contest between teams", "a tool for lighting a flame"], "Think about socks and shoes."],
    ["plot", "The author spent months planning the <i>plot</i> of the mystery.", "the story's events", ["a small area of land", "to plan in secret"], "An author is planning a book."],
    ["trunk", "The elephant sprayed water with its <i>trunk</i>.", "a long nose", ["the back storage of a car", "the main stem of a tree"], "Think about how an elephant sprays water."],
    ["palm", "She held the coin in the <i>palm</i> of her hand.", "the inside of the hand", ["a tropical tree", "to hide in the hand"], "The words 'of her hand' tell you."],
    ["current", "The <i>current</i> president attended the opening.", "happening now", ["a flow of water", "a small dried fruit"], "Think about who is president at this moment."],
    ["swallow", "It is hard to <i>swallow</i> such a silly excuse.", "believe", ["pass food down the throat", "a small bird"], "Is the excuse something you eat?"]
  ];
  const SENT23 = [
    ["Although the plan seemed ___ at first, it turned out to be quite simple.", "complicated", ["easy", "cheap"]],
    ["The speaker was so ___ that the audience listened without a single cough.", "captivating", ["dull", "hurried"]],
    ["The ___ lighthouse still stands, though it has not been used for fifty years.", "abandoned", ["crowded", "brand-new"]],
    ["Because the evidence was ___, the jury could not decide who was right.", "inconclusive", ["overwhelming", "hilarious"]],
    ["She was ___ in her kindness, giving food to every stranger who came by.", "generous", ["stingy", "careless"]],
    ["His ___ answer showed he had not studied at all.", "vague", ["detailed", "confident"]],
    ["The scientist remained ___ even when others laughed at her theory.", "unwavering", ["hesitant", "ashamed"]],
    ["The sudden storm made the picnic ___, so they went home.", "impractical", ["delightful", "unnecessary"]],
    ["Their ___ cooperation allowed the project to finish early.", "enthusiastic", ["reluctant", "accidental"]],
    ["Despite the ___ heat, the runners kept a steady pace.", "oppressive", ["pleasant", "cooling"]]
  ];
  const IDI23 = [
    ["a red herring", "something that distracts from the real issue", ["a very rare fish", "a warning sign"], "Think of a trick that sends people the wrong way."],
    ["the elephant in the room", "an obvious problem nobody wants to discuss", ["a very large guest", "a loud noise outside"], "Everyone sees it, but nobody mentions it."],
    ["the tip of the iceberg", "a small, visible part of a much bigger problem", ["a very cold snack", "the coldest place on a ship"], "Most of an iceberg is hidden under the water."],
    ["a wild-goose chase", "a pointless search", ["a trip to a farm", "a fast race"], "Think about chasing something you can never catch."],
    ["back to the drawing board", "start again with a new plan", ["return to art class", "draw a bigger picture"], "The first plan did not work out."],
    ["the cold shoulder", "unfriendly treatment", ["a chilly arm", "a warm hug"], "Think about how it feels when someone ignores you."],
    ["face the music", "accept the results of what you did", ["listen to a concert", "turn around quickly"], "It is not about sound at all."],
    ["throw in the towel", "give up", ["clean up a mess", "start a race"], "Think about a boxer whose coach does this."],
    ["sit on the fence", "avoid choosing a side", ["build a wall", "rest in a garden"], "Picture someone who cannot decide which side to step down on."],
    ["barking up the wrong tree", "blaming or asking the wrong person", ["training a dog badly", "climbing too high"], "A dog chases a squirrel but looks in the wrong place."],
    ["add insult to injury", "make a bad situation even worse", ["pay a medical bill", "tell a joke"], "First one bad thing happens, then another is added."],
    ["steal the show", "get the most attention", ["take a ticket", "perform a magic trick"], "Everyone remembers one performer more than the rest."],
    ["play it by ear", "decide as things happen, without a plan", ["listen to music carefully", "hurt an ear"], "You are making it up as you go."]
  ];
  const PROOF23 = ["The [occassion] called for a formal dress.", "They [beleived] the story was true.", "The [diference] between the two plans was small.", "They had to [wiegh] the package at the post office.", "It was an [unusal] sight in our town.", "Our [forign] guests arrived on Monday.", "The [begining] of the book was slow.", "She was [suprised] by the gift.", "He gave an [excelent] performance.", "Her [writting] improved every month.", "We saw a [beautifull] sunset over the lake.", "The [peice] of cake was huge.", "He is [truely] sorry for the mistake.", "The [necesary] tools were packed in the van."];
  const DICT23 = dictG([["appropriate", "Wear ___ shoes for the hike."], ["articulate", "She is an ___ speaker."], ["comprehensive", "The guide has a ___ list of rules."], ["incentive", "A small prize is a good ___ to work hard."], ["indicate", "Arrows ___ the way to the exit."], ["inherent", "Some risk is ___ in climbing."], ["pertinent", "Only ___ facts belong in the essay."], ["rigorous", "The training course is very ___."], ["subsequent", "In ___ years, the town grew quickly."], ["unprecedented", "The flood was ___ in our history."], ["consensus", "The group reached a ___ after talking."], ["empirical", "Scientists want ___ evidence."]]);
  const ETY23 = [
    ["<b>Karaoke</b> comes from Japanese words meaning...", "empty orchestra", ["happy voice", "sing along"], "Something that normally plays the music is missing."],
    ["<b>Jeopardy</b> comes from French <i>jeu parti</i>. What did that mean?", "a divided game, where the result could go either way", ["a dangerous race", "a game with too many players"], "Think about a game where nobody knows who will win."],
    ["<b>Avatar</b> comes from the Sanskrit word <i>avatara</i>. What did it first mean?", "a descent, such as a god coming down to Earth", ["a mask", "a painted face"], "Think about something moving from above to below."],
    ["<b>Vaccine</b> comes from Latin <i>vacca</i>. What does that word mean?", "cow", ["needle", "safe"], "The first vaccine was made using something from a farm animal."],
    ["<b>Calculate</b> comes from Latin <i>calculus</i>, a small ___ used for counting.", "pebble", ["bead", "stick"], "Ancient people counted with something they found on the ground."],
    ["<b>Dilapidated</b> comes from Latin <i>lapis</i>. What is a <i>lapis</i>?", "a stone", ["a roof", "a window"], "A dilapidated building looks as if it is falling apart."],
    ["<b>Supercilious</b> (looking down on others) comes from Latin <i>supercilium</i>. What does that mean?", "eyebrow", ["high hill", "tall hat"], "People raise a part of the face when they look down on you."],
    ["<b>Sophomore</b> comes from Greek words meaning...", "wise and foolish", ["second and first", "young and strong"], "It is a mix of two opposite ideas."],
    ["<b>Maverick</b> (a person who does things differently) is named after...", "a Texas rancher who did not brand his cattle", ["a wild horse", "a mountain in Texas"], "Think of a person's name that became a word."],
    ["<b>Galvanize</b> (to shock into action) is named after...", "an Italian scientist who studied electricity", ["a French chef", "a Greek builder"], "The word has to do with a spark of energy."]
  ];

  const A23 = [
    L("Word roots 16", meaningG(ROOT23, ROOT23P, "root"),
      meanH("Example: the root <b>aud</b> means <b>hear</b>, as in <i>audience</i>. Find the meaning of yours the same way."),
      [S("Roots to know", "crypt · dox · pet · pol", "<b>crypt</b> = hidden (cryptic), <b>dox</b> = belief (paradox), <b>pet</b> = seek (compete), <b>pol</b> = city (politics)."), S("More roots", "sed · simil · mult · loqu", "<b>sed</b> = sit (sediment), <b>simil</b> = like (similar), <b>mult</b> = many (multiply), <b>loqu</b> = speak (eloquent)."), S("Last two", "sacr · capt", "<b>sacr</b> = holy (sacrifice), <b>capt</b> = take (capture).")]),
    L("Prefixes sur-, vice-, cosmo-, hemi- and bio-", prefG(PREF23, PREF23P),
      ["Split the word into the prefix and the rest. What does the rest of the word tell you?", "Picture the real thing the word names. How does the prefix describe it?", "Example: <b>semicircle</b> is half of a circle, so <b>semi-</b> means half. Use your word the same way."],
      [S("Over and instead", "sur- · vice-", "<b>sur-</b> means over or above (surface). <b>vice-</b> means in place of (a vice principal stands in for the principal)."), S("World and life", "cosmo- · bio-", "<b>cosmo-</b> means world or universe (cosmopolitan). <b>bio-</b> means life (biology)."), S("Half", "hemi-", "<b>hemi-</b> means half (a hemisphere is half of Earth).")]),
    L("Word endings -ography, -nomy, -metry, -eer and -ette", meaningG(END23, END23P, "ending"),
      meanH("Example: <b>-less</b> means without, as in <i>careless</i>. Find the meaning of your ending the same way."),
      [S("Writing and science", "-ography · -nomy", "<b>-ography</b> means writing or recording (geography). <b>-nomy</b> means the laws or science of (economy)."), S("Measuring and people", "-metry · -eer", "<b>-metry</b> means measuring (symmetry). <b>-eer</b> names a person who works with something (engineer)."), S("Small", "-ette", "<b>-ette</b> means small (a dinette is a small dining area).")]),
    L("Homophones 20", sentG(HOMO23),
      sentHints("Example: 'I will <b>wait</b> here' and 'the <b>weight</b> of a box'. Decide which meaning your sentence needs."),
      homoSlides("lair · layer · slight · sleight", "stalk · stork · bard · barred")),
    L("Commonly misspelled words 11", rightG(MIS23),
      misH("Example: <b>Wednesday</b> has a silent d and <b>government</b> has an n before the m. Check the middle of yours."),
      misSlides("ec·sta·sy · ex·u·ber·ant", "par·a·pher·na·lia · si·mul·ta·ne·ous")),
    L("Politics and elections words", rightG(POL23),
      misH("Example: <b>government</b> has an n before the m. Many politics words come from Latin, so check the middle and the ending."),
      wordSlides("Words about voting", "Elections and government use special words, many from Latin.", "bal·lot · cam·paign", "ref·er·en·dum · bi·par·ti·san")),
    L("Chemistry and lab words", rightG(CHEM23),
      misH("Example: <b>laboratory</b> has an a after the b. Science words often end in -tion, -ate or -ent."),
      wordSlides("Lab words", "Chemistry words come from Greek and Latin. Learn them in parts.", "crys·tal·lize · flam·ma·ble", "pre·cip·i·tate · sub·li·ma·tion")),
    L("Architecture and building words", rightG(ARCH23),
      misH("Example: <b>architect</b> has a ch that sounds like k. Many building words come from French and Italian, so watch the double letters."),
      wordSlides("Building words", "Architects use words from Latin, French and Italian.", "bal·co·ny · ca·the·dral", "mez·za·nine · pa·vil·ion")),
    L("Theater and film words", rightG(THEA23),
      misH("Example: <b>rehearsal</b> has an ear in the middle. Stage and film words come from French and Greek, so watch the double letters."),
      wordSlides("Stage and screen words", "Plays and films have a big vocabulary of their own.", "au·di·tion · in·ter·mis·sion", "so·lil·o·quy · cin·e·ma·tog·ra·phy")),
    L("Genetics and biology words", rightG(GEN23),
      misH("Example: <b>biology</b> has the letters b-i-o. Most biology words come from Greek and Latin, so look for ph, y and double letters."),
      wordSlides("Words about life", "Biology uses Greek and Latin parts. Learn them one piece at a time.", "re·ces·sive · mu·ta·tion", "sym·bi·o·sis · in·ver·te·brate")),
    L("SAT words 2", vocG(SAT23), vocabH("Example: 'The <b>lengthy</b> movie lasted four hours' ➜ lengthy means very long, because of the four hours."), vocabSlides),
    L("Look-alike words 2", sentG(LOOK23),
      sentHints("Example: <b>advice</b> is a noun ('good advice') and <b>advise</b> is a verb ('I advise you'). Decide what your sentence needs."),
      [S("Words that look alike", "👀", "Some words differ by only one or two letters but mean very different things."), S("Show off and break", "flaunt · flout · imply · infer", "<b>Flaunt</b> = show off. <b>Flout</b> = ignore a rule. <b>Imply</b> = hint. <b>Infer</b> = work out from clues."), S("More pairs", "libel · liable · moral · morale", "<b>Libel</b> = a false written statement. <b>Liable</b> = responsible. <b>Moral</b> = a lesson. <b>Morale</b> = team spirit.")]),
    L("Words with several meanings 4", vocG(MULT23), vocabH("Example: 'The <b>bat</b> flew out of the cave' ➜ here bat is an animal, not a baseball tool."), multSlides),
    L("Sentence completion 2", sentG(SENT23), ssH("Example: 'Because the soup was so ___, she added more salt' ➜ bland, because she wanted more flavor."), ssSlides),
    L("Idioms 4", idiG(IDI23), phrH("Example: 'It is raining cats and dogs' means it is raining very hard. The words are a picture, not the meaning."),
      phrSlides("red herring · cold shoulder", "A <b>red herring</b> is a false clue. The <b>cold shoulder</b> means unfriendly treatment. <b>The elephant in the room</b> is a problem everyone ignores.")),
    L("Proofreading 13", proofG(PROOF23), proofH("Example: 'It was a <b>wierd</b> sound' ➜ 'wierd' should be 'weird'. Check each word like that."), proofSlides("🧐")),
    L("Listen and spell 19", tyG(DICT23), dictHints("Example: 'enthusiasm' = en + thu + si + asm. Write each part, then check the whole word."), dictSlides("ap·pro·pri·ate · ar·tic·u·late", "un·prec·e·dent·ed · con·sen·sus")),
    L("Etymology 2: stories behind words", etyG(ETY23), etyH("Example: <b>sandwich</b> is named after the Earl of Sandwich, who liked to eat bread and meat while he worked. Now think about yours."),
      etySlides("karaoke · vaccine · calculate", "<b>Karaoke</b> is Japanese for 'empty orchestra'. <b>Vaccine</b> comes from the Latin word for cow. <b>Calculate</b> comes from a Latin word for a counting pebble."))
  ];
  A23.push(MIX("Mixed practice", [A23[0], A23[3], A23[4], A23[5], A23[9], A23[14]]));
  A23.push(MIX("Level 23 Challenge", [A23[1], A23[2], A23[6], A23[7], A23[8], A23[10], A23[11], A23[12], A23[13], A23[15], A23[16], A23[17]]));

  // ================= LEVEL 24 =================
  const ROOT24 = [
    ["primitive", "prim", "first", "Early tools made long ago from stone are called this."],
    ["interrogate", "rog", "ask", "A lawyer cross-examines a witness on the stand."],
    ["constrict", "string", "tight", "A belt that is too small does this to your waist."],
    ["dominate", "dom", "master", "One team is so strong that it controls the whole game."],
    ["exclaim", "claim", "shout", "A loud, sudden cry of delight at a surprise party."],
    ["somersault", "sult", "leap", "A gymnast flips head over heels in the air."],
    ["compassion", "pass", "feel", "You share the sadness of a friend who lost a pet."],
    ["invincible", "vinc", "conquer", "A hero nobody could ever beat."],
    ["nutrient", "nutr", "feed", "Vitamins and minerals in food that help your body grow."],
    ["lucrative", "lucr", "profit", "A job that pays very well and earns a lot of money."]
  ];
  const ROOT24P = ["first", "ask", "tight", "master", "shout", "leap", "feel", "conquer", "feed", "profit"];
  const PREF24 = [["kilo-", "kilometer", "one thousand"], ["kilo-", "kilogram", "one thousand"], ["milli-", "millimeter", "one thousandth"], ["milli-", "milliliter", "one thousandth"], ["nano-", "nanosecond", "one billionth"], ["nano-", "nanometer", "one billionth"], ["giga-", "gigabyte", "one billion"], ["giga-", "gigawatt", "one billion"], ["tera-", "terabyte", "one trillion"], ["tera-", "terahertz", "one trillion"]];
  const PREF24P = ["one thousand", "one thousandth", "one billionth", "one billion", "one trillion", "one hundredth"];
  const END24 = [
    ["solitude", "-tude", "state or quality of", "Being alone in a quiet place."],
    ["magnitude", "-tude", "state or quality of", "How large or strong an earthquake is."],
    ["storage", "-age", "act or result of", "Keeping boxes in the attic."],
    ["coverage", "-age", "act or result of", "How much of an area a news report or a phone signal reaches."],
    ["librarian", "-arian", "person connected with", "Someone who helps you find a book."],
    ["humanitarian", "-arian", "person connected with", "Someone who works to help people in need."],
    ["circular", "-ular", "relating to", "Shaped like a ring."],
    ["cellular", "-ular", "relating to", "Having to do with the tiny units that make up living things."],
    ["residential", "-ial", "relating to", "A quiet street with houses and no factories."],
    ["financial", "-ial", "relating to", "Matters of banks, budgets and savings."]
  ];
  const END24P = ["state or quality of", "act or result of", "person connected with", "relating to", "small", "measuring"];
  const HOMO24 = [
    ["Only one council member voiced ___ about the plan.", "dissent", ["descent", "disent"]], ["The plane began its slow ___ toward the runway.", "descent", ["dissent", "decent"]],
    ["The artist chose a deep blue ___ for the sky.", "hue", ["hew", "hoo"]], ["The pioneers had to ___ logs to build the cabin.", "hew", ["hue", "hough"]],
    ["She learned to ___ her hair into one long braid.", "plait", ["plate", "plaite"]], ["He set a ___ of pasta on the table.", "plate", ["plait", "platte"]],
    ["The chef topped the pie with chocolate ___.", "mousse", ["moose", "mouse"]], ["A ___ walked slowly through the northern forest.", "moose", ["mousse", "moos"]],
    ["The ring held a one-___ diamond.", "carat", ["caret", "carrat"]], ["Use the ___ symbol to show where to add a missing word.", "caret", ["carat", "carett"]],
    ["Ships must pass through the narrow ___ to reach the sea.", "strait", ["straight", "strate"]], ["Draw a ___ line with a ruler.", "straight", ["strait", "straite"]],
    ["Her ___ loved spicy food.", "palate", ["palette", "pallet"]], ["The painter mixed colors on her ___.", "palette", ["palate", "pallet"]],
    ["The workers stacked boxes on a wooden ___.", "pallet", ["palate", "palette"]]
  ];
  const MIS24 = [["adolescent", ["adolecent", "adolesent"]], ["indict", ["indite", "indight"]], ["auxiliary", ["auxillary", "auxilary"]], ["bourgeois", ["bourgoise", "burgeois"]], ["delinquent", ["delinquant", "deliquent"]], ["dissipate", ["disipate", "dissapate"]], ["sacrilege", ["sacrilage", "sacrelige"]], ["succinct", ["succint", "sucsinct"]], ["threshold", ["threshhold", "thresold"]], ["tyranny", ["tyrrany", "tyranney"]], ["whimsical", ["whimsicle", "wimsical"]], ["zealous", ["zelous", "zealus"]], ["ambiguity", ["ambiguety", "ambigiuty"]], ["bureaucrat", ["beurocrat", "bureacrat"]], ["courteous", ["courtious", "curteous"]]];
  const JOUR24 = [["headline", ["headlin", "hedline"]], ["editorial", ["editoral", "editorail"]], ["reporter", ["reportor", "reporer"]], ["deadline", ["deadlin", "dedline"]], ["newscast", ["newcast", "newscasst"]], ["publication", ["publicaton", "publikation"]], ["censorship", ["censorshp", "sensorship"]], ["tabloid", ["tabloyd", "tabloide"]], ["byline", ["biline", "byeline"]], ["archive", ["archeve", "arkive"]], ["circulation", ["circulashun", "cirkulation"]], ["commentary", ["commentery", "comentary"]], ["objectivity", ["objectivty", "objectivety"]], ["propaganda", ["propoganda", "propagana"]], ["sensationalism", ["sensationalizm", "sensasionalism"]], ["syndicate", ["sindicate", "syndikate"]], ["bulletin", ["bulletn", "bullatin"]]];
  const GEO24 = [["magma", ["magmah", "magna"]], ["igneous", ["ignious", "igneus"]], ["sedimentary", ["sedimentery", "sedamentary"]], ["metamorphic", ["metamorfic", "metamorphik"]], ["fossil", ["fosil", "fossel"]], ["tectonic", ["tectonik", "tektonic"]], ["seismic", ["siesmic", "seismik"]], ["mineral", ["minaral", "minerall"]], ["granite", ["granit", "granete"]], ["limestone", ["lymestone", "limestoan"]], ["obsidian", ["obsidean", "obsidion"]], ["stalagmite", ["stalagmight", "stalagmyte"]], ["moraine", ["moraigne", "morain"]], ["geyser", ["gyser", "geysir"]], ["basalt", ["basalte", "bassalt"]], ["quartz", ["quarts", "quartze"]]];
  const ECON24 = [["recession", ["recesion", "recessian"]], ["deficit", ["defecit", "deficite"]], ["commodity", ["comodity", "commoditty"]], ["consumer", ["consummer", "consumor"]], ["monopoly", ["monopoley", "monnopoly"]], ["tariff", ["tarriff", "tarif"]], ["revenue", ["revenew", "revinue"]], ["fiscal", ["fiscle", "physcal"]], ["inventory", ["inventry", "inventorey"]], ["productivity", ["productivty", "producktivity"]], ["stimulus", ["stimulas", "stimmulus"]], ["subsidy", ["subsidie", "subcidy"]], ["taxation", ["taxashun", "taxaton"]], ["unemployment", ["unemployement", "unemploymant"]], ["wholesale", ["holesale", "wholsale"]]];
  const DIP24 = [["ambassador", ["ambassadore", "ambasador"]], ["embassy", ["embasy", "embassie"]], ["diplomacy", ["diplomasy", "diplomicy"]], ["treaty", ["treety", "treatie"]], ["alliance", ["allience", "aliance"]], ["negotiation", ["negociation", "negotation"]], ["summit", ["summitt", "sumit"]], ["delegation", ["delagation", "delegashun"]], ["consulate", ["consolate", "consulait"]], ["protocol", ["protocal", "protacol"]], ["neutrality", ["neutrallity", "nuetrality"]], ["mediation", ["medeation", "mediashun"]], ["asylum", ["asylem", "asilum"]], ["peacekeeping", ["peacekeping", "pecekeeping"]], ["humanitarian", ["humaniterian", "humanatarian"]], ["convention", ["convension", "convenshun"]], ["immunity", ["imunity", "immunnity"]]];
  const TRAV24 = [["itinerary", ["itinerery", "itinary"]], ["passport", ["pasport", "passpart"]], ["luggage", ["luggege", "lugage"]], ["destination", ["destanation", "destinaton"]], ["excursion", ["excurtion", "excurson"]], ["reservation", ["reservashun", "resevation"]], ["expedition", ["expidition", "expeditian"]], ["navigation", ["navigashun", "navagation"]], ["layover", ["laiover", "layovar"]], ["baggage", ["bagage", "baggege"]], ["turbulence", ["turbalence", "turbulance"]], ["hostel", ["hostle", "hostell"]], ["pilgrimage", ["pilgrimege", "pilgramage"]], ["commute", ["comute", "commoot"]], ["transit", ["transet", "tranzit"]]];
  const SAT24 = [
    ["equivocal", "His <i>equivocal</i> answer left us unsure whether he meant yes or no.", "unclear, with more than one possible meaning", ["clear and firm", "very loud"], "We could not tell what he meant."],
    ["esoteric", "The professor's <i>esoteric</i> lecture was understood by only a handful of experts.", "understood by only a few", ["famous around the world", "very funny"], "Only a handful of people could follow it."],
    ["exonerate", "The new evidence will <i>exonerate</i> the accused man.", "clear of blame", ["punish", "forget"], "New evidence helps the accused person."],
    ["extraneous", "Delete any <i>extraneous</i> details that do not help the story.", "not needed", ["essential", "colorful"], "These details do not help the story."],
    ["garrulous", "My <i>garrulous</i> uncle talked non-stop for the whole trip.", "talking too much", ["silent", "forgetful"], "Think about someone who talks for the whole trip."],
    ["iconoclast", "As an <i>iconoclast</i>, she challenged traditions that others never questioned.", "a person who attacks accepted beliefs", ["a painter of portraits", "a lover of history"], "She questioned traditions that others accepted."],
    ["indolent", "The <i>indolent</i> cat spent every afternoon sleeping in the sun.", "lazy", ["energetic", "angry"], "What does the cat do all afternoon?"],
    ["magnanimous", "The <i>magnanimous</i> winner praised her rival and shared the trophy photo.", "generous and forgiving", ["boastful", "jealous"], "She is kind to the person she beat."],
    ["obstinate", "The <i>obstinate</i> mule refused to move, no matter how hard they pulled.", "stubborn", ["eager to please", "very fast"], "It would not move, however hard they tried."],
    ["perfunctory", "He gave the room a <i>perfunctory</i> glance and walked right out.", "done quickly without care", ["thorough and slow", "suspicious"], "He walked out right away."]
  ];
  const LOOK24 = [
    ["Her voice did not ___ even when the crowd shouted.", "waver", ["waiver", "wavver"]], ["Parents must sign a ___ before the field trip.", "waiver", ["waver", "wayver"]],
    ["What is the ___ for this rule? Please explain.", "rationale", ["rational", "rationel"]], ["A ___ person thinks things through calmly.", "rational", ["rationale", "rashional"]],
    ["He used a calm joke to ___ the tense situation.", "defuse", ["diffuse", "defews"]], ["Sunlight can ___ through thin clouds, spreading softly.", "diffuse", ["defuse", "diffews"]],
    ["I will ___ dessert tonight to save room for tomorrow's party.", "forgo", ["forego", "forgoe"]], ["It was a ___ conclusion that the champions would win.", "foregone", ["forgone", "foregon"]],
    ["The ___ cook burned every dinner he tried to make.", "inept", ["inapt", "inet"]], ["An ___ remark does not fit the moment.", "inapt", ["inept", "innapt"]],
    ["She was ___ to leave her friends and move away.", "loath", ["loathe", "loth"]], ["I ___ the smell of burnt toast.", "loathe", ["loath", "loathee"]],
    ["The old story told of a ___ that a great flood would come.", "prophecy", ["prophesy", "prophecee"]], ["Some people claim they can ___ the future.", "prophesy", ["prophecy", "prophesie"]],
    ["The two schools asked a teacher to ___ the dispute.", "mediate", ["meditate", "medeate"]], ["Monks ___ in silence every morning.", "meditate", ["mediate", "meditait"]],
    ["The old ___ on the castle wall pointed over the sea.", "cannon", ["canon", "canin"]], ["The ___ of the author's works includes twelve novels.", "canon", ["cannon", "canan"]]
  ];
  const ANA24 = [
    ["hungry", "ravenous", "tired", "exhausted", ["sleepy", "bed"], "The second word is a much stronger form of the first."],
    ["cautious", "reckless", "frugal", "wasteful", ["thrifty", "rich"], "The two words are opposites."],
    ["chapter", "book", "scene", "play", ["actor", "stage"], "The first word is one section of the second."],
    ["pen", "write", "knife", "cut", ["sharp", "kitchen"], "The first word is a tool, and the second is its job."],
    ["audience", "theater", "students", "classroom", ["teacher", "school"], "The first word names the people found in the second place."],
    ["sapling", "tree", "tadpole", "frog", ["pond", "fish"], "The first word names a young stage of the second."],
    ["pride", "lions", "fleet", "ships", ["sailors", "ocean"], "The first word names a group of the things in the second."],
    ["blueprint", "building", "recipe", "meal", ["kitchen", "chef"], "The first word is a plan for making the second."]
  ];
  const MULT24 = [
    ["scale", "The map's <i>scale</i> shows that one inch equals ten miles.", "a ratio used to size a drawing", ["a flat plate on a fish", "a tool for weighing"], "The sentence is about a map."],
    ["degree", "She earned a <i>degree</i> in chemistry from the state university.", "an award given by a college", ["a unit of temperature", "a level of strength"], "Think about what a university gives you."],
    ["stern", "The captain's <i>stern</i> voice made everyone listen at once.", "strict and serious", ["the back of a ship", "kind and gentle"], "Everyone listened at once."],
    ["lean", "The tall tree began to <i>lean</i> in the wind.", "tilt to one side", ["thin and fit", "meat without fat"], "Picture a tree in the wind."],
    ["yield", "The sign told the driver to <i>yield</i> to oncoming cars.", "give way", ["speed up", "the amount of crops grown"], "Think about what a driver does at such a sign."],
    ["foil", "The detective's clever plan would <i>foil</i> the thief.", "stop or prevent", ["thin shiny metal sheet", "a sword used in fencing"], "A clever plan is used against a thief."],
    ["tip", "The waiter earned a big <i>tip</i> for his service.", "extra money for service", ["the pointed end", "to tilt over"], "Think about what a waiter is given for good service."],
    ["grave", "The doctor gave us <i>grave</i> news about the storm damage.", "serious and worrying", ["happy and light", "very short"], "It was not good news."],
    ["reserve", "Please <i>reserve</i> a table for six on Friday night.", "book ahead", ["a quiet and shy manner", "a park for wild animals"], "You do this before the day you eat out."],
    ["trying", "It was a <i>trying</i> week, full of problems and delays.", "difficult and tiresome", ["attempting", "very exciting"], "The week was full of problems."]
  ];
  const SENT24 = [
    ["The mayor's ___ promises were soon forgotten by the voters.", "empty", ["binding", "fulfilled"]],
    ["The ___ sky promised a calm afternoon.", "cloudless", ["stormy", "crowded"]],
    ["Though the villain seemed ___, he had secretly planned a trick.", "harmless", ["frightening", "famous"]],
    ["The tiny village was so ___ that its name appeared on few maps.", "obscure", ["famous", "enormous"]],
    ["The museum guard was ___, noticing every sound and movement.", "alert", ["drowsy", "careless"]],
    ["The coach's ___ lecture left the team feeling angry rather than motivated.", "harsh", ["gentle", "humorous"]],
    ["Their ___ friendship lasted for fifty years without a single quarrel.", "enduring", ["fleeting", "uncertain"]],
    ["The new rules were meant to ___ the confusion, not add to it.", "reduce", ["increase", "describe"]],
    ["Because the author was ___, her book was full of surprising details nobody else had noticed.", "observant", ["careless", "bored"]],
    ["Even the ___ critic had to admit that the performance was wonderful.", "skeptical", ["adoring", "sleepy"]]
  ];
  const PROOF24 = ["A [sargent] led the march across the field.", "The [acomodation] was warm and comfortable.", "His [handwritting] was neat and clear.", "They enjoyed the [entertainement] at the fair.", "That fact is not [relevent] to our topic.", "The [conveniant] store is open late.", "The [oppurtunity] was too good to miss.", "Please [colect] the papers from the desk.", "A [thourough] check was made of the bridge.", "The [misterious] stranger left no clue.", "A warm [vegtable] soup is perfect on a cold day.", "A [dangerus] storm moved over the coast.", "The [intresting] fact surprised the whole class.", "She wrote a short [paragrapf] about her trip."];
  const DICT24 = dictG([["autonomy", "Teenagers often want more ___."], ["discrepancy", "The ___ in the numbers puzzled us."], ["fluctuate", "Prices may ___ from week to week."], ["hypothetical", "Imagine a ___ case where it never rains."], ["obligatory", "Wearing a helmet is ___ on this track."], ["precedent", "The ruling set a ___ for future cases."], ["conundrum", "The riddle was a real ___."], ["dichotomy", "There is a clear ___ between work and play."], ["intricate", "The lace had an ___ pattern."], ["nuance", "A good translator notices every ___ of meaning."], ["pinnacle", "She reached the ___ of her career."], ["sporadic", "We had ___ rain, only a few drops now and then."], ["tenuous", "The link between the two events was ___."], ["paradigm", "The discovery changed the whole ___ of science."]]);
  const ETY24 = [
    ["<b>Lilliputian</b> (meaning tiny) comes from...", "the tiny people in the story Gulliver's Travels", ["a tiny island in Greece", "a flower called lily"], "Think of a book character, not a place on a map."],
    ["<b>Gargantuan</b> (meaning huge) comes from...", "Gargantua, a giant in a French story", ["a Roman general", "a mountain in Spain"], "Think of a giant from a book."],
    ["<b>Mesmerize</b> is named after...", "Franz Mesmer, a doctor whose treatments seemed to put people in a trance", ["a French painter", "a Greek storyteller"], "A person's name became a word for a spell."],
    ["<b>Quixotic</b> (idealistic and impractical) comes from...", "Don Quixote, a hero of a Spanish novel who chased impossible dreams", ["a Spanish explorer", "a Mexican village"], "The word describes someone who chases dreams."],
    ["<b>Serendipity</b> comes from a fairy tale about...", "three princes of Serendip who kept making lucky discoveries", ["a fisherman who found gold", "a king who loved music"], "It means a happy accident."],
    ["<b>Gerrymander</b> mixes a governor's name with...", "salamander, because a district was drawn in that odd shape", ["gerbil, because of its tiny size", "calendar, because of its dates"], "A map once looked like an animal."],
    ["<b>Dunce</b> comes from the name of...", "John Duns Scotus, a scholar whose followers were later mocked", ["a famous stone", "a village in Wales"], "A person's name became a word for someone slow to learn."],
    ["<b>Nostalgia</b> comes from Greek words for...", "homecoming and ache", ["new and age", "night and sleep"], "Think about missing a place you love."],
    ["<b>Malaria</b> comes from Italian <i>mala aria</i>. What does that mean?", "bad air", ["bad water", "hot sun"], "People once blamed something they breathed."],
    ["<b>Influenza</b> comes from Italian for...", "the influence of the stars", ["the wind of winter", "a flow of water"], "Long ago, people blamed the sky."],
    ["<b>Tycoon</b> comes from the Japanese word <i>taikun</i>. What did it first mean?", "great lord", ["tall tower", "lucky coin"], "The first meaning was about rank, not money."],
    ["<b>Pajamas</b> comes from words meaning...", "leg clothing", ["night shirt", "soft bed"], "The first pajamas were worn on a different part of the body."]
  ];

  const A24 = [
    L("Word roots 17", meaningG(ROOT24, ROOT24P, "root"),
      meanH("Example: the root <b>aud</b> means <b>hear</b>, as in <i>audience</i>. Find the meaning of yours the same way."),
      [S("Roots to know", "prim · rog · string · dom", "<b>prim</b> = first (primary), <b>rog</b> = ask (interrogate), <b>string</b> = tight (stringent), <b>dom</b> = master (dominate)."), S("More roots", "claim · sult · pass · vinc", "<b>claim</b> = shout (proclaim), <b>sult</b> = leap (result), <b>pass</b> = feel (passion), <b>vinc</b> = conquer (convince)."), S("Last two", "nutr · lucr", "<b>nutr</b> = feed (nutrition), <b>lucr</b> = profit (lucrative).")]),
    L("Measuring prefixes kilo-, milli-, nano-, giga- and tera-", prefG(PREF24, PREF24P),
      ["These prefixes tell you how big or how small a unit is. Is the unit bigger or smaller than the base unit?", "Picture the unit: a kilometer is a long way, a millimeter is tiny. Decide if the prefix makes the unit larger or smaller, and by how much.", "Example: <b>centi-</b> as in <i>centimeter</i> means one hundredth, since 100 centimeters make a meter. Use your word the same way."],
      [S("Big prefixes", "kilo- · giga- · tera-", "<b>kilo-</b> = one thousand (a kilometer is 1,000 meters). <b>giga-</b> = one billion (a gigabyte). <b>tera-</b> = one trillion (a terabyte)."), S("Tiny prefixes", "milli- · nano-", "<b>milli-</b> = one thousandth (a millimeter). <b>nano-</b> = one billionth (a nanosecond)."), S("Why they matter", "🔬", "Scientists, engineers and computer experts use these prefixes every day, so learn the spelling too.")]),
    L("Word endings -tude, -age, -arian, -ular and -ial", meaningG(END24, END24P, "ending"),
      meanH("Example: <b>-less</b> means without, as in <i>careless</i>. Find the meaning of your ending the same way."),
      [S("State and result", "-tude · -age", "<b>-tude</b> means state or quality of (attitude). <b>-age</b> means act or result of (usage)."), S("Person", "-arian", "<b>-arian</b> names a person connected with something (grammarian)."), S("Relating to", "-ular · -ial", "<b>-ular</b> and <b>-ial</b> mean relating to (muscular, social).")]),
    L("Homophones 21", sentG(HOMO24),
      sentHints("Example: 'I will <b>wait</b> here' and 'the <b>weight</b> of a box'. Decide which meaning your sentence needs."),
      homoSlides("dissent · descent · hue · hew", "palate · palette · pallet · moose · mousse")),
    L("Commonly misspelled words 12", rightG(MIS24),
      misH("Example: <b>Wednesday</b> has a silent d and <b>government</b> has an n before the m. Check the middle of yours."),
      misSlides("ad·o·les·cent · de·lin·quent", "thresh·old · bu·reauc·ra·cy")),
    L("Journalism and media words", rightG(JOUR24),
      misH("Example: <b>journalist</b> starts with the sound j but is spelled jour. Media words often end in -ship, -tion or -ism."),
      wordSlides("News words", "Reporters and editors use special words for how news is made.", "head·line · dead·line", "cen·sor·ship · prop·a·gan·da")),
    L("Geology and Earth science words", rightG(GEO24),
      misH("Example: <b>volcano</b> has an o at the end. Rock words come from Greek and Latin, so look for ph, y and ch."),
      wordSlides("Rock and Earth words", "Geologists name rocks and Earth movements with Greek and Latin words.", "ig·ne·ous · sed·i·men·ta·ry", "meta·mor·phic · tec·ton·ic")),
    L("Economics words", rightG(ECON24),
      misH("Example: <b>economy</b> starts with eco. Many money words end in -tion, -ity or -ary, so check the ending."),
      wordSlides("Money and trade words", "Economics studies how people make, spend and share money.", "re·ces·sion · def·i·cit", "pro·duc·tiv·i·ty · sub·si·dy")),
    L("Diplomacy and world affairs words", rightG(DIP24),
      misH("Example: <b>foreign</b> has a silent g. Many words about countries come from French and Latin, so watch the double letters."),
      wordSlides("Words about nations", "Diplomats from different countries use special words to work together.", "am·bas·sa·dor · em·bas·sy", "ne·go·ti·a·tion · neu·tral·i·ty")),
    L("Travel and transport words", rightG(TRAV24),
      misH("Example: <b>vehicle</b> has a silent h in the middle. Travel words come from French and Latin, so check the double letters."),
      wordSlides("Words for the journey", "Airports, hotels and maps all use their own words.", "it·in·er·ar·y · pass·port", "turb·u·lence · pil·grim·age")),
    L("SAT words 3", vocG(SAT24), vocabH("Example: 'The <b>lengthy</b> movie lasted four hours' ➜ lengthy means very long, because of the four hours."), vocabSlides),
    L("Look-alike words 3", sentG(LOOK24),
      sentHints("Example: <b>advice</b> is a noun ('good advice') and <b>advise</b> is a verb ('I advise you'). Decide what your sentence needs."),
      [S("Words that look alike", "👀", "Some words differ by only one or two letters but mean very different things."), S("Pairs to know", "waver · waiver · rational · rationale", "<b>Waver</b> = shake or hesitate. <b>Waiver</b> = a signed paper giving up a right. <b>Rational</b> = sensible. <b>Rationale</b> = the reason for something."), S("More pairs", "inept · inapt · loath · loathe", "<b>Inept</b> = clumsy. <b>Inapt</b> = not suitable. <b>Loath</b> (adjective) = unwilling. <b>Loathe</b> (verb) = to hate.")]),
    L("Words with several meanings 5", vocG(MULT24), vocabH("Example: 'The <b>bat</b> flew out of the cave' ➜ here bat is an animal, not a baseball tool."), multSlides),
    L("Sentence completion 3", sentG(SENT24), ssH("Example: 'Because the soup was so ___, she added more salt' ➜ bland, because she wanted more flavor."), ssSlides),
    L("Word analogies 5", anaG(ANA24), anaH("Example: <b>fish : swim :: bird : fly</b>. A fish swims, so a bird flies. Now do yours."), anaSlides),
    L("Proofreading 14", proofG(PROOF24), proofH("Example: 'It was a <b>wierd</b> sound' ➜ 'wierd' should be 'weird'. Check each word like that."), proofSlides("🧐")),
    L("Listen and spell 20", tyG(DICT24), dictHints("Example: 'enthusiasm' = en + thu + si + asm. Write each part, then check the whole word."), dictSlides("au·ton·o·my · dis·crep·an·cy", "hy·po·thet·i·cal · prec·e·dent")),
    L("Etymology 3: stories behind words", etyG(ETY24), etyH("Example: <b>sandwich</b> is named after the Earl of Sandwich, who liked to eat bread and meat while he worked. Now think about yours."),
      etySlides("quixotic · serendipity · gerrymander", "<b>Quixotic</b> comes from Don Quixote, a dreamer in a Spanish novel. <b>Serendipity</b> comes from a fairy tale about the princes of Serendip. <b>Gerrymander</b> blends a governor's name with salamander."))
  ];
  A24.push(MIX("Mixed practice", [A24[0], A24[3], A24[4], A24[5], A24[9], A24[14]]));
  A24.push(MIX("Level 24 Challenge", [A24[1], A24[2], A24[6], A24[7], A24[8], A24[10], A24[11], A24[12], A24[13], A24[15], A24[16], A24[17]]));

  Object.assign(SPELL_LEVELS, { 22: A22, 23: A23, 24: A24 });
})();
