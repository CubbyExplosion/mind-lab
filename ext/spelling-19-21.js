// ext/spelling-19-21.js : Spelling & Words, levels 19-21 (9th grade, 10th grade first half).
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

  // ================= LEVEL 19 =================
  const ROOT12 = [
    ["consecutive", "sequ", "follow", "Three wins in a row, one coming right after the other, are described this way."],
    ["exclude", "clud", "shut", "If you leave a classmate out of a game, you do this to them."],
    ["extend", "tend", "stretch", "A telescope can be pulled out to be longer in this way."],
    ["propel", "pel", "drive", "A propeller makes a boat move forward with great force."],
    ["ascend", "scend", "climb", "A hot air balloon rising into the sky does this."],
    ["submerge", "merg", "plunge", "A diver goes beneath the surface of the water."],
    ["assume", "sum", "take", "To pick up a new job or role and begin using it is to do this."],
    ["recognize", "cogn", "know", "When you see an old friend and remember who they are, you do this."],
    ["valid", "val", "strong", "A ticket that is still good to use, and an argument that holds up well, are both this."],
    ["certify", "cert", "sure", "A teacher signs a paper so everyone can be confident that a fact is true."]
  ];
  const ROOT12P = ["follow", "shut", "stretch", "drive", "climb", "plunge", "take", "know", "strong", "sure"];
  const PREF19 = [["contra-", "contradict", "against"], ["contra-", "contrast", "against"], ["ambi-", "ambidextrous", "both"], ["ambi-", "ambiguous", "both"], ["neo-", "neonatal", "new"], ["neo-", "neon", "new"], ["proto-", "prototype", "first"], ["proto-", "protagonist", "first"], ["macro-", "macroeconomics", "large"], ["macro-", "macrocosm", "large"]];
  const PREF19P = ["against", "both", "new", "first", "large", "small"];
  const END19 = [
    ["democracy", "-cracy", "rule by", "In this system, citizens vote to choose their leaders."],
    ["bureaucracy", "-cracy", "rule by", "A system run by many officials and offices, with lots of forms."],
    ["bibliophile", "-phile", "lover of", "Someone who owns shelves and shelves of books and reads them all."],
    ["audiophile", "-phile", "lover of", "A person who cares a great deal about how music sounds on speakers."],
    ["omnivore", "-vore", "eater of", "Humans, bears and pigs eat both plants and animals."],
    ["insectivore", "-vore", "eater of", "An anteater or a bat that dines on bugs."],
    ["dialogue", "-logue", "speech or talk", "Two characters in a play take turns speaking."],
    ["monologue", "-logue", "speech or talk", "One actor stands alone and speaks for several minutes."],
    ["telegram", "-gram", "something written or drawn", "A message sent long ago by electric wire."],
    ["diagram", "-gram", "something written or drawn", "A labeled drawing that explains how something works."]
  ];
  const END19P = ["rule by", "lover of", "eater of", "speech or talk", "something written or drawn", "fear of"];
  const HOMO19 = [
    ["The police tried to ___ a confession from the suspect.", "elicit", ["illicit", "solicit"]], ["The thief was caught selling ___ goods.", "illicit", ["elicit", "implicit"]],
    ["She has a real ___ for fashion design.", "flair", ["flare", "fair"]], ["The rescue team fired a ___ into the night sky.", "flare", ["flair", "fair"]],
    ["The two knights agreed to a ___ at sunrise.", "duel", ["dual", "dueal"]], ["The car has ___ airbags, one for each front seat.", "dual", ["duel", "dule"]],
    ["The company made a large ___ this year.", "profit", ["prophet", "prophit"]], ["The ___ warned the people about the coming drought.", "prophet", ["profit", "prophit"]],
    ["The hikers hid their food in a ___ under the rocks.", "cache", ["cash", "cashe"]], ["He paid for the book in ___.", "cash", ["cache", "cach"]],
    ["The horse's ___ was smooth and steady.", "gait", ["gate", "gaite"]], ["Please close the garden ___.", "gate", ["gait", "gaight"]],
    ["The planes were kept in a huge ___.", "hangar", ["hanger", "hangor"]], ["Hang your coat on the ___.", "hanger", ["hangar", "hangor"]],
    ["Blue eyes are passed down through ___.", "genes", ["jeans", "geans"]], ["He wore faded blue ___.", "jeans", ["genes", "geans"]],
    ["We waited in the ___ for the movie.", "queue", ["cue", "kew"]], ["The actor waited for his ___ to enter.", "cue", ["queue", "kew"]],
    ["A huge ___ blocked the road after the landslide.", "boulder", ["bolder", "bouldar"]], ["The ___ climber tried the hardest route.", "bolder", ["boulder", "boalder"]]
  ];
  const MIS19 = [["acquaintance", ["aquaintance", "acquaintence"]], ["bureaucracy", ["beaurocracy", "bureaucracey"]], ["camouflage", ["camoflage", "camouflauge"]], ["chauffeur", ["chaufeur", "chauffer"]], ["entrepreneur", ["entrepeneur", "entreprenuer"]], ["fluorescent", ["flourescent", "flouresent"]], ["guarantee", ["garantee", "guarentee"]], ["humorous", ["humerous", "humorus"]], ["jewelry", ["jewlery", "jewelery"]], ["miniature", ["minature", "miniture"]], ["mischievous", ["mischievious", "mischevious"]], ["nuisance", ["nuisence", "nusance"]], ["occasionally", ["occassionally", "ocasionally"]], ["perseverance", ["perseverence", "perserverance"]], ["questionnaire", ["questionaire", "questionnair"]], ["silhouette", ["silhouete", "siluette"]], ["sovereign", ["soverign", "sovereing"]], ["surveillance", ["surveilance", "survaillance"]], ["vengeance", ["vengance", "vengence"]], ["vacuum", ["vaccum", "vacum"]]];
  const ESSAY19 = [["plagiarism", ["plagarism", "plagiarsim"]], ["bibliography", ["bibliograpy", "biblography"]], ["rebuttal", ["rebutal", "rebuttel"]], ["counterargument", ["counterarguement", "counterargment"]], ["persuasive", ["persuasave", "perswasive"]], ["paraphrase", ["parafrase", "paraphraze"]], ["evidence", ["evidance", "evedence"]], ["citation", ["citeation", "citaton"]], ["transition", ["transision", "transtion"]], ["introduction", ["introducton", "intoduction"]], ["analysis", ["analisis", "analasis"]], ["argument", ["arguement", "arguhment"]], ["revision", ["revison", "revission"]], ["credible", ["credable", "credibel"]]];
  const HEALTH19 = [["esophagus", ["esophogus", "esofagus"]], ["cardiovascular", ["cardiovasular", "cardiovascualr"]], ["respiratory", ["respritory", "respiratery"]], ["nutrition", ["nutrician", "nutrision"]], ["cholesterol", ["cholestrol", "colesterol"]], ["immune", ["imune", "imunne"]], ["metabolism", ["metabolizm", "metabollism"]], ["hygiene", ["hygeine", "higiene"]], ["vaccination", ["vacination", "vaccinasion"]], ["diagnosis", ["daignosis", "diagnosus"]], ["antibiotic", ["antibiotick", "anitbiotic"]], ["allergy", ["alergy", "allergey"]], ["digestion", ["digesion", "digeston"]], ["calories", ["calaries", "caloris"]], ["vitamin", ["vitimin", "vittamin"]], ["infection", ["infecsion", "infectoin"]], ["stethoscope", ["stethascope", "stethoscop"]]];
  const ART19 = [["crescendo", ["cresendo", "crescendoe"]], ["staccato", ["stacatto", "staccatto"]], ["symphony", ["symfony", "symphonie"]], ["sculpture", ["sculpter", "scullpture"]], ["perspective", ["perspectave", "prespective"]], ["portrait", ["portriat", "portrate"]], ["mosaic", ["mosiac", "mozaic"]], ["ensemble", ["ensamble", "ensembel"]], ["soprano", ["sopprano", "soprono"]], ["saxophone", ["saxaphone", "saxofone"]], ["percussion", ["percusion", "percushion"]], ["charcoal", ["charcole", "charcoel"]], ["choreography", ["choreograpy", "coreography"]], ["rehearsal", ["rehersal", "rehearcal"]], ["auditorium", ["auditoreum", "auditorum"]]];
  const TRANS19 = [
    ["I wanted to play outside. ___, it was raining.", "However", ["Therefore", "Similarly"]], ["She studied hard all week. ___, she passed the test.", "Therefore", ["However", "Meanwhile"]],
    ["The park is free to enter. ___, parking costs five dollars.", "However", ["Likewise", "Therefore"]], ["Dogs need daily exercise. ___, cats like to play every day.", "Similarly", ["However", "Otherwise"]],
    ["Sam cooked the dinner. ___, Maria set the table.", "Meanwhile", ["Nevertheless", "Otherwise"]], ["Wear a helmet. ___, you could hurt your head.", "Otherwise", ["Furthermore", "Likewise"]],
    ["The soup was cheap. ___, it was delicious.", "Moreover", ["Otherwise", "Instead"]], ["It was raining hard. ___, the match went ahead.", "Nevertheless", ["Consequently", "Similarly"]],
    ["He missed the bus. ___, he was late for school.", "Consequently", ["Nevertheless", "Meanwhile"]], ["I did not want pizza. ___, I ordered a salad.", "Instead", ["Moreover", "Likewise"]],
    ["The museum is big and beautiful. ___, it has a great cafe.", "Furthermore", ["Otherwise", "However"]]
  ];
  const SIL19 = [["Add <b>-ation</b> to <b>condemn</b>.", "condemnation"], ["Add <b>-ist</b> to <b>column</b>.", "columnist"], ["Add <b>-al</b> to <b>hymn</b>.", "hymnal"], ["Add <b>-ity</b> to <b>solemn</b>.", "solemnity"], ["Add <b>-ature</b> to <b>sign</b>.", "signature"], ["Add <b>-ation</b> to <b>resign</b>.", "resignation"], ["Add <b>-al</b> to <b>autumn</b>.", "autumnal"], ["Add <b>-ation</b> to <b>design</b>.", "designation"]];
  const PART19 = [["She has ___ (write) three pages.", "written"], ["He has ___ (drive) all day.", "driven"], ["We have ___ (choose) a name.", "chosen"], ["Someone has ___ (break) the window.", "broken"], ["They have ___ (speak) to the principal.", "spoken"], ["The lake has ___ (freeze) overnight.", "frozen"], ["He has ___ (wear) the same coat all winter.", "worn"], ["The show has ___ (begin) already.", "begun"], ["She has ___ (swim) fifty laps.", "swum"], ["The bell has ___ (ring) twice.", "rung"], ["The mosquito has ___ (bite) me.", "bitten"], ["The squirrel has ___ (hide) its nuts.", "hidden"], ["She has ___ (forgive) her brother.", "forgiven"], ["I have ___ (ride) that horse before.", "ridden"]];
  const PREP19 = [
    ["She is afraid ___ spiders.", "of", ["at", "for", "with"], "afraid"], ["He is very good ___ chess.", "at", ["of", "with", "on"], "good"],
    ["We depend ___ the bus to get to school.", "on", ["of", "to", "at"], "depend"], ["The cake is different ___ the one I ordered.", "from", ["with", "by", "of"], "different"],
    ["Our team is responsible ___ the clean-up.", "for", ["of", "at", "with"], "responsible"], ["She apologized ___ being late.", "for", ["of", "to", "at"], "apologized"],
    ["I am not familiar ___ this game.", "with", ["for", "to", "of"], "familiar"], ["They are very interested ___ astronomy.", "in", ["on", "at", "for"], "interested"],
    ["He is similar ___ his father in many ways.", "to", ["with", "of", "at"], "similar"], ["We are grateful ___ your help.", "for", ["of", "to", "at"], "grateful"],
    ["Everyone should participate ___ the discussion.", "in", ["on", "to", "at"], "participate"], ["This book belongs ___ the library.", "to", ["for", "of", "with"], "belongs"],
    ["He is capable ___ running a marathon.", "of", ["at", "for", "to"], "capable"]
  ];
  const prepG = () => { const it = pick(PREP19), [t, a, d] = it; return { text: t.replace("___", "<b>___</b>"), choices: shuf([a, ...shuf(d).slice(0, 2)]), answer: a, it }; };
  const VOC19 = [
    ["ambiguous", "Her answer was <b>ambiguous</b>, so nobody knew if she meant yes or no.", "unclear, with more than one meaning", ["very rude", "extremely loud"], "Nobody could tell which she meant."],
    ["benevolent", "The <b>benevolent</b> king gave food to every poor family.", "kind and generous", ["cruel and greedy", "shy and quiet"], "He gave food to people in need."],
    ["candid", "I want your <b>candid</b> opinion, even if it is not what I hoped to hear.", "honest and open", ["polite but false", "short and quick"], "Even a hard truth is welcome here."],
    ["eloquent", "The <b>eloquent</b> speaker moved the whole crowd with her words.", "clear and powerful in speaking", ["very soft and shy", "too long and boring"], "Her words had a strong effect on the crowd."],
    ["meticulous", "The <b>meticulous</b> artist checked every tiny detail of the painting.", "very careful about details", ["quick and careless", "famous and rich"], "The artist looked at every tiny part."],
    ["pragmatic", "Being <b>pragmatic</b>, she picked the cheaper laptop that did everything she needed.", "practical and sensible", ["dreamy and unrealistic", "angry and stubborn"], "She chose what worked, not what looked fancy."],
    ["tenacious", "The <b>tenacious</b> dog would not let go of the stick.", "holding on and never giving up", ["lazy and slow", "gentle and calm"], "The dog kept a firm grip."],
    ["lucid", "After a good night's sleep, his thinking was <b>lucid</b> again.", "clear and easy to follow", ["foggy and confused", "fast and angry"], "Sleep cleared his head."],
    ["mundane", "Washing dishes is a <b>mundane</b> job, with nothing exciting about it.", "ordinary and dull", ["thrilling and new", "dangerous and rare"], "The sentence says there is nothing exciting."],
    ["versatile", "A <b>versatile</b> player can play many positions on the team.", "able to do many different things", ["able to do only one thing", "too tired to play"], "She can play many positions."]
  ];
  const LAT19 = [
    ["et cetera", "and so on", ["for example", "at the end"], "A list that finishes with this tells you more items could follow in the same way."],
    ["vice versa", "the other way around", ["at the same time", "once more"], "If A helps B, then B helps A: the order is swapped."],
    ["per capita", "for each person", ["for each year", "in total"], "Per capita income is the money earned, shared out over all the people in a country."],
    ["bona fide", "genuine", ["secret", "temporary"], "A bona fide doctor really has a medical degree."],
    ["ad lib", "make up on the spot", ["read from notes", "repeat slowly"], "An actor forgets a line and invents new words right then."],
    ["status quo", "the way things are now", ["a big change", "a loud protest"], "Someone who wants to keep the status quo does not want anything to change."],
    ["alma mater", "the school you once attended", ["your hometown", "your first teacher"], "At a reunion, old friends sing the song of this place."],
    ["pro bono", "done for free to help others", ["paid at double rate", "done in secret"], "A lawyer helps a family without charging any money."],
    ["de facto", "in reality, even if not official", ["by law only", "in the future"], "A leader who acts as the boss every day, without the official title, is this kind of leader."],
    ["carpe diem", "seize the day", ["beware of the dog", "time flies"], "A poster tells you not to waste today, but to make good use of it right now."],
    ["quid pro quo", "something given in return for something", ["a rule nobody follows", "a lucky guess"], "I give you a ticket and you give me a sandwich: a fair trade."]
  ];
  const ENV19 = [["sustainability", ["sustainibility", "sustanability"]], ["biodiversity", ["biodiversety", "biodivercity"]], ["renewable", ["renewible", "reneweable"]], ["deforestation", ["deforestasion", "deforrestation"]], ["emissions", ["emmisions", "emisions"]], ["conservation", ["conservasion", "conservacion"]], ["pollution", ["polution", "pollusion"]], ["habitat", ["habbitat", "habitate"]], ["endangered", ["endangerd", "endangared"]], ["recycling", ["recyling", "recycleing"]], ["contamination", ["contaminasion", "contaminnation"]], ["erosion", ["erosian", "errosion"]], ["climate", ["climite", "clymate"]], ["extinction", ["extinktion", "extinsion"]], ["irrigation", ["irigation", "irrigasion"]]];
  const SPACE19 = [["constellation", ["constelation", "consellation"]], ["asteroid", ["asteriod", "astroid"]], ["galaxy", ["galaxey", "galexy"]], ["meteorite", ["meteroite", "meteorit"]], ["satellite", ["satelite", "sattelite"]], ["supernova", ["supernovva", "supernoba"]], ["eclipse", ["eclipce", "eclypse"]], ["gravity", ["gravaty", "gravitty"]], ["comet", ["commet", "comit"]], ["nebula", ["nebbula", "nebulla"]], ["planetarium", ["planatarium", "planetarum"]], ["astronomer", ["astronimer", "astromoner"]], ["spacecraft", ["spacecrapht", "spacecraf"]], ["universe", ["univerce", "universse"]], ["cosmos", ["cosmoss", "cosmus"]]];
  const PROOF19 = ["The scientist wrote a [hypothesus] before starting the experiment.", "Her [persistance] finally paid off when she won the prize.", "The museum has a rare [colection] of old coins.", "He felt a deep [responsability] to take care of the garden.", "The team showed great [enthusiasim] before the final match.", "We watched the [sunrize] from the top of the hill.", "The [libary] is open until eight o'clock tonight.", "It is [neccessary] to wear a coat in the snow.", "She gave a [thoughful] answer to the difficult question.", "The students formed a [circel] around the teacher.", "My brother is [definitly] coming to the party.", "The [temperture] dropped quickly after sunset."];
  const DICT19 = dictG([["perseverance", "Her ___ helped her finish the long race."], ["responsible", "A ___ pet owner feeds the dog every day."], ["environment", "We must protect the ___."], ["opportunity", "This trip is a great ___ to learn."], ["technique", "She learned a new ___ for painting."], ["ceremony", "The graduation ___ lasted an hour."], ["separate", "Please ___ the paper from the plastic."], ["literature", "We read classic ___ in English class."], ["vocabulary", "She is building her ___ by reading daily."], ["curiosity", "His ___ led him to ask many questions."], ["necessary", "Is it ___ to bring a pencil?"], ["restaurant", "We ate dinner at a small ___."]]);

  const A19 = [
    L("Word roots 12", meaningG(ROOT12, ROOT12P, "root"),
      meanH("Example: the root <b>ped</b> means <b>foot</b>, as in <i>pedal</i>. Find the meaning of yours the same way."),
      [S("Roots to know", "sequ · clud · tend", "<b>sequ</b> = follow (consecutive), <b>clud</b> = shut (exclude), <b>tend</b> = stretch (extend)."), S("More roots", "pel · scend · merg", "<b>pel</b> = drive (propel), <b>scend</b> = climb (ascend), <b>merg</b> = plunge (submerge)."), S("Last four", "sum · cogn · val · cert", "<b>sum</b> = take (assume), <b>cogn</b> = know (recognize), <b>val</b> = strong (valid), <b>cert</b> = sure (certify).")]),
    L("Prefixes contra-, ambi-, neo-, proto- and macro-", prefG(PREF19, PREF19P),
      ["Split the word into the prefix and the rest. What does the rest of the word mean?", "Picture the real thing the word names. How does the prefix alter the base word?", "Example: <b>semicircle</b> is half of a circle, so <b>semi-</b> means half. Use your word the same way."],
      [S("Against and both", "contra- · ambi-", "<b>contra-</b> means against (contradict, contrast). <b>ambi-</b> means both (ambidextrous: skillful with both hands)."), S("New and first", "neo- · proto-", "<b>neo-</b> means new (neonatal, neon). <b>proto-</b> means first (prototype: the first model)."), S("Large", "macro-", "<b>macro-</b> means large (macroeconomics: the big picture of a country's money). Its opposite is <b>micro-</b>, which means small.")]),
    L("Word endings -cracy, -phile, -vore, -logue and -gram", meaningG(END19, END19P, "ending"),
      meanH("Example: <b>-ology</b> means study of, as in <i>zoology</i>. Find the meaning of your ending the same way."),
      [S("Ending clues", "-cracy · -phile", "<b>-cracy</b> = rule by (democracy). <b>-phile</b> = lover of (bibliophile: a book lover)."), S("Eaters and talkers", "-vore · -logue", "<b>-vore</b> = eater of (omnivore). <b>-logue</b> = speech or talk (dialogue, monologue)."), S("Written things", "-gram", "<b>-gram</b> = something written or drawn (telegram, diagram). The ending tells you what kind of word it is.")]),
    L("Homophones 16", sentG(HOMO19),
      sentHints("Example: 'I will <b>wait</b> here' and 'the <b>weight</b> of a box'. Decide which meaning your sentence needs."),
      homoSlides("elicit · illicit · flair · flare", "dual · duel · cache · cash")),
    L("Commonly misspelled words 7", rightG(MIS19),
      misH("Example: <b>Wednesday</b> has a silent d and <b>government</b> has an n before the m. Check the middle of yours."),
      misSlides("ac·quaint·ance · bu·reauc·ra·cy", "en·tre·pre·neur · mis·chie·vous")),
    L("Essay and argument words", rightG(ESSAY19),
      misH("Example: <b>conclusion</b> ends in -sion, not -tion. Look at the endings and middles of the choices."),
      wordSlides("Writing an argument", "A strong essay has a claim, evidence, a rebuttal and a conclusion. Spell these key words with care.", "pla·gia·rism · bib·li·og·ra·phy", "re·but·tal · per·sua·sive")),
    L("Health and body words", rightG(HEALTH19),
      misH("Example: <b>stomach</b> has a ch that sounds like k. Health words come from Greek and Latin, so watch for ph, ch and double letters."),
      wordSlides("Health words", "Health and medicine use many Greek and Latin words. Their spellings follow patterns you can learn.", "car·di·o·vas·cu·lar · nu·tri·tion", "me·tab·o·lism · vac·ci·na·tion")),
    L("Art and music words", rightG(ART19),
      misH("Example: <b>violin</b> is spelled the way it sounds, but <b>orchestra</b> has a ch that sounds like k. Many music words come from Italian."),
      wordSlides("Art and music words", "Many music words come from Italian, such as crescendo and staccato. Art words often come from French.", "cre·scen·do · stac·ca·to", "sculp·ture · cho·re·og·ra·phy")),
    L("Linking words that connect ideas", sentG(TRANS19),
      ["Read both sentences. Do they agree, disagree, follow in time, or does one cause the other?", "Ask what the second sentence does: does it clash with the first, give a result, add a point, give a warning, or happen at the same time?", "Example: 'It was cold. ___, we wore coats.' needs a result word, so 'Therefore' fits. Now find what your sentences need."],
      [S("Linking words", "🔗", "Linking words (transitions) show how two ideas connect, and they help writing flow."), S("Contrast and result", "however · therefore", "<b>However</b> shows a contrast. <b>Therefore</b> and <b>consequently</b> show a result."), S("Add and warn", "moreover · otherwise", "<b>Moreover</b> and <b>furthermore</b> add a point. <b>Otherwise</b> warns what happens if you do not. <b>Meanwhile</b> shows two things at the same time.")]),
    L("Hear the silent letter", tyG(SIL19.map(([t, a]) => [t, a, "", ""])),
      ["Silent letters in a short word often come alive in a longer word from the same family. Say the longer word out loud.", q => info(q.answer), "Example: the silent b in <b>crumb</b> can be heard in <b>crumble</b>. Add the ending to yours and listen for the hidden letter."],
      [S("Hidden letters", "🤫", "Some letters are silent in a short word but speak up in a longer one."), S("Family words", "column ➜ columnist", "The n in <b>column</b> is silent, but you hear it in <b>columnist</b>. The same happens with <b>hymn</b> and <b>hymnal</b>."), S("Use it to spell", "sign ➜ signature", "If you are not sure whether a word has a silent letter, think of a longer relative: <b>sign</b> and <b>signature</b>.")]),
    L("Past participles", tyG(PART19.map(([t, a]) => [t, a, "", ""])),
      ["Use the form of the verb that follows 'has' or 'have'. It is not always the same as the simple past.", q => info(q.answer), "Example: <b>take</b> ➜ I have <b>taken</b>, and <b>see</b> ➜ I have <b>seen</b>. Now do yours."],
      [S("Has, have, had", "have + ?", "After <b>has</b>, <b>have</b> or <b>had</b>, we use the past participle: I have <b>written</b>, she has <b>driven</b>."), S("The -en family", "broken · chosen · spoken", "Many participles end in <b>-en</b>: broken, chosen, spoken, frozen, hidden, bitten."), S("Odd ones", "begun · swum · rung · worn", "Some change the vowel: <b>begin ➜ begun</b>, <b>swim ➜ swum</b>, <b>ring ➜ rung</b>, and <b>wear ➜ worn</b>.")]),
    L("Words that need partners", prepG,
      ["Many words need a small partner word right after them. Say the whole phrase in your head.", q => `Focus on the word <b>${q.it[3]}</b>. Which little word do we usually say right after it?`, "Example: we say 'proud <b>of</b>', 'good <b>at</b>' and 'listen <b>to</b>'. Test each choice with your word the same way."],
      [S("Word partners", "afraid of · good at", "Some adjectives and verbs always go with one small word: <b>afraid of</b>, <b>good at</b>, <b>depend on</b>."), S("More pairs", "different from · similar to", "<b>Different from</b>, <b>similar to</b>, <b>familiar with</b>, <b>interested in</b>, <b>responsible for</b>."), S("Learn them whole", "📦", "Learn the pair together as one chunk, like a single word.")]),
    L("Vocabulary builders 1", vocG(VOC19), vocabH("Example: 'The <b>lengthy</b> movie lasted four hours' ➜ lengthy means very long, because of the four hours."), vocabSlides),
    L("Latin phrases in English", phraseG("Latin phrase", LAT19),
      ["Latin phrases are used in English just as they are. Think of where you may have seen the phrase.", q => q.it[3], "Example: <b>ad hoc</b> means 'for this purpose', like an ad hoc committee made for one job. Use the clue to work out yours."],
      [S("Latin lives on", "📜", "English kept many Latin phrases. We use them in books, news and law."), S("Common ones", "et cetera · vice versa", "<b>Et cetera</b> means 'and so on'. <b>Vice versa</b> means 'the other way around'."), S("More phrases", "bona fide · pro bono · carpe diem", "<b>Bona fide</b> means genuine. <b>Pro bono</b> means done for free to help others. <b>Carpe diem</b> means 'seize the day'.")]),
    L("Proofreading 9", proofG(PROOF19), proofH("Example: 'It was a <b>wierd</b> sound' ➜ 'wierd' should be 'weird'. Check each word like that."), proofSlides("🧐")),
    L("Listen and spell 15", tyG(DICT19), dictHints("Example: 'enthusiasm' = en + thu + si + asm. Write each part, then check the whole word."), dictSlides("per·se·ver·ance · re·spon·si·ble", "en·vi·ron·ment · lit·er·a·ture")),
    L("Environment words", rightG(ENV19),
      misH("Example: <b>environment</b> has an n before the m. Long science words are easier when you split them into parts."),
      wordSlides("Words about nature", "Words about caring for the planet are used in science class and in the news.", "sus·tain·a·bil·i·ty · bi·o·di·ver·si·ty", "de·for·es·ta·tion · con·tam·i·na·tion")),
    L("Space words", rightG(SPACE19),
      misH("Example: <b>planet</b> has an e before the t. Many space words come from Greek and Latin."),
      wordSlides("Words about space", "Astronomy has many words from Greek and Latin. Learn the parts and the words get easy.", "con·stel·la·tion · as·ter·oid", "su·per·no·va · plan·e·tar·i·um"))
  ];
  A19.push(MIX("Mixed practice", [A19[0], A19[3], A19[4], A19[9], A19[10], A19[12]]));
  A19.push(MIX("Level 19 Challenge", [A19[1], A19[2], A19[5], A19[6], A19[7], A19[8], A19[11], A19[13], A19[14], A19[15], A19[16], A19[17]]));

  // ================= LEVEL 20 =================
  const ROOT13 = [
    ["migrate", "migr", "move", "Geese fly to a warmer place every winter and return in spring."],
    ["pacify", "pac", "peace", "A parent sings softly to calm a crying baby."],
    ["chromatic", "chrom", "color", "A rainbow shows this in many shades."],
    ["epidemic", "dem", "people", "When a sickness sweeps through a whole community, it is called this."],
    ["optical", "opt", "eye", "An illusion plays tricks on what you see."],
    ["toxic", "tox", "poison", "Warning labels on dangerous cleaning chemicals use this word."],
    ["dermatologist", "derm", "skin", "A doctor who treats rashes and sunburns."],
    ["heliocentric", "helio", "sun", "A model where the planets circle the star at the center of our solar system."],
    ["pyrotechnics", "pyr", "fire", "A holiday show with colorful bursts in the night sky."],
    ["neurology", "neur", "nerve", "The study of the body's messages that travel to the brain."],
    ["orthodontist", "ortho", "straight", "A dentist who fixes crooked teeth with braces."]
  ];
  const ROOT13P = ["move", "peace", "color", "people", "eye", "poison", "skin", "sun", "fire", "nerve", "straight"];
  const PREF20 = [["hetero-", "heterogeneous", "different"], ["hetero-", "heteronym", "different"], ["homo-", "homonym", "same"], ["homo-", "homogeneous", "same"], ["iso-", "isosceles", "equal"], ["iso-", "isometric", "equal"], ["endo-", "endoskeleton", "inside"], ["endo-", "endoscope", "inside"], ["exo-", "exoskeleton", "outside"], ["exo-", "exoplanet", "outside"]];
  const PREF20P = ["different", "same", "equal", "inside", "outside", "above"];
  const END20 = [
    ["booklet", "-let", "small", "A thin handout with only a few pages."],
    ["piglet", "-let", "small", "A baby pig on the farm."],
    ["duckling", "-ling", "young", "A baby duck following its mother."],
    ["gosling", "-ling", "young", "A baby goose."],
    ["picturesque", "-esque", "in the style of", "A village so pretty that it looks like a painting."],
    ["statuesque", "-esque", "in the style of", "A tall, graceful person who looks like a carved figure."],
    ["homeward", "-ward", "in the direction of", "After school we walked toward our houses."],
    ["upward", "-ward", "in the direction of", "The balloon floated toward the sky."],
    ["clockwise", "-wise", "in the manner of", "Turn the key the way the hands on a clock move."],
    ["likewise", "-wise", "in the manner of", "'I will help, and you should do the same.'"]
  ];
  const END20P = ["small", "young", "in the style of", "in the direction of", "in the manner of", "full of"];
  const HOMO20 = [
    ["Phones are not ___ in the exam hall.", "allowed", ["aloud", "alowed"]], ["She read the poem ___ to the class.", "aloud", ["allowed", "alowd"]],
    ["The ship waited at its ___ in the harbor.", "berth", ["birth", "burth"]], ["The ___ of a baby is a joyful time.", "birth", ["berth", "burth"]],
    ["Many colorful fish live in a ___ reef.", "coral", ["choral", "corral"]], ["The ___ group sang in perfect harmony.", "choral", ["coral", "corral"]],
    ["Nothing could ___ the calm pilot.", "faze", ["phase", "fase"]], ["The moon goes through each ___ every month.", "phase", ["faze", "fase"]],
    ["My voice was ___ after cheering all day.", "hoarse", ["horse", "hoarce"]], ["The farmer rode his ___ across the field.", "horse", ["hoarse", "horce"]],
    ["We got lost in a corn ___.", "maze", ["maize", "mase"]], ["The farmers harvest ___, also called corn.", "maize", ["maze", "maise"]],
    ["Your library book is ___ and you must return it.", "overdue", ["overdo", "overdew"]], ["Do not ___ the salt in the soup.", "overdo", ["overdue", "overdoo"]],
    ["The ocean ___ comes in twice a day.", "tide", ["tied", "tyde"]], ["He ___ his shoelaces in a double knot.", "tied", ["tide", "tyed"]],
    ["A ___ person looks in the mirror all day.", "vain", ["vein", "vane"]], ["A blood ___ carries blood to the heart.", "vein", ["vain", "vane"]], ["The weather ___ on the roof points north.", "vane", ["vain", "vein"]]
  ];
  const MIS20 = [["pronunciation", ["pronounciation", "pronunciaton"]], ["restaurant", ["restaraunt", "resturant"]], ["thorough", ["thourough", "thorogh"]], ["unanimous", ["unanamous", "unanimus"]], ["accessible", ["accessable", "accesible"]], ["apparent", ["apparant", "aparent"]], ["calendar", ["calender", "calandar"]], ["committee", ["commitee", "comittee"]], ["convenience", ["convienence", "convenince"]], ["dilemma", ["dilema", "dillemma"]], ["exaggerate", ["exagerate", "exaggarate"]], ["fascinate", ["facinate", "fasinate"]], ["handkerchief", ["handkerchef", "hankerchief"]], ["independent", ["independant", "indepandent"]], ["knowledge", ["knowlege", "knowladge"]], ["maintenance", ["maintainance", "maintenence"]], ["pastime", ["pasttime", "pastyme"]], ["persuade", ["perswade", "persuede"]], ["possession", ["posession", "possesion"]], ["recommend", ["reccomend", "recomend"]], ["schedule", ["shedule", "schedual"]], ["sergeant", ["sargeant", "sergant"]], ["succeed", ["suceed", "succede"]]];
  const SCI20 = [["chromosome", ["chromasome", "cromosome"]], ["mitochondria", ["mitocondria", "mitochondrea"]], ["respiration", ["respiratoin", "resperation"]], ["circulatory", ["circulatary", "circulitory"]], ["condensation", ["condensasion", "condencation"]], ["equilibrium", ["equilibrum", "equilibreum"]], ["magnetism", ["magnitism", "magnatism"]], ["precipitation", ["percipitation", "precipatation"]], ["hemisphere", ["hemmisphere", "hemisfere"]], ["genetics", ["genitics", "genetiks"]], ["bacteria", ["bacteriah", "backteria"]], ["ultraviolet", ["ultravioliet", "ultraviolett"]], ["seismograph", ["seismagraph", "sieismograph"]], ["velocity", ["velocitty", "vellocity"]], ["acceleration", ["accelleration", "acceleratoin"]]];
  const MATH20 = [["coefficient", ["coeficient", "coefficent"]], ["exponent", ["exponant", "exponet"]], ["polynomial", ["polynominal", "polynomeal"]], ["quadratic", ["quadradic", "quadratik"]], ["integer", ["integar", "inteager"]], ["equation", ["equasion", "equashun"]], ["logarithm", ["logrithm", "logarythm"]], ["trigonometry", ["trigonomitry", "trignometry"]], ["reciprocal", ["reciprical", "resiprocal"]], ["theorem", ["theorom", "theorum"]], ["parabola", ["parabolla", "perabola"]], ["probability", ["probablity", "probabilty"]], ["statistics", ["statistcs", "statisitics"]], ["variable", ["varable", "variabel"]], ["symmetry", ["symetry", "symmetri"]], ["ellipse", ["ellipce", "elipse"]]];
  const JOB20 = [["pharmacist", ["farmacist", "pharmasist"]], ["electrician", ["electritian", "electrican"]], ["technician", ["techician", "technition"]], ["veterinarian", ["vetrinarian", "veterinaran"]], ["mechanic", ["mecanic", "mechanik"]], ["librarian", ["librarien", "libarian"]], ["surgeon", ["surgun", "sergeon"]], ["journalist", ["jounalist", "journalest"]], ["engineer", ["engeneer", "enginear"]], ["photographer", ["photografer", "photographor"]], ["psychologist", ["sychologist", "psycologist"]], ["paramedic", ["paramedik", "parramedic"]], ["carpenter", ["carpentar", "carpender"]], ["firefighter", ["firefigther", "firefiter"]], ["scientist", ["scientest", "sceintist"]], ["dentist", ["dentest", "dentis"]]];
  const CONJ20 = [
    ["___ it was cold, we went swimming anyway.", "Although", ["Because", "Unless"]], ["We will cancel the picnic ___ the weather improves.", "unless", ["although", "because"]],
    ["She was late ___ the bus broke down.", "because", ["although", "unless"]], ["My brother loves math, ___ I prefer art.", "whereas", ["because", "unless"]],
    ["___ he practiced every day, he won the contest.", "Because", ["Although", "Unless"]], ["I will lend you my bike ___ you wear a helmet.", "as long as", ["although", "whereas"]],
    ["Call me ___ you arrive.", "as soon as", ["unless", "whereas"]], ["I cannot go outside ___ I finish my chores.", "until", ["although", "whereas"]],
    ["He kept running ___ his legs were sore.", "even though", ["because", "unless"]], ["Wash your hands ___ you eat.", "before", ["unless", "whereas"]]
  ];
  const PAIR20 = [
    ["I like neither tea ___ coffee.", "nor", ["or", "and"]], ["You can have either soup ___ salad.", "or", ["nor", "but"]],
    ["She is both smart ___ kind.", "and", ["or", "nor"]], ["Not only is the soup tasty, ___ it is also healthy.", "but", ["and", "or"]],
    ["Whether you win ___ lose, play fair.", "or", ["nor", "and"]], ["He was so tired ___ he fell asleep at once.", "that", ["than", "which"]],
    ["I would rather walk ___ ride.", "than", ["that", "then"]], ["Both the teacher ___ the students were happy.", "and", ["or", "nor"]]
  ];
  const MARK20 = [
    ["He had one goal <b>—</b> to win.", "dash"], ["A <i>well</i><b>-</b><i>known</i> author visited the school.", "hyphen"], ["The cake <b>(</b>baked by Mia<b>)</b> was gone.", "parentheses"],
    ["Well<b>...</b> I am not sure.", "ellipsis"], ["She said, <b>\"</b>Come in.<b>\"</b>", "quotation marks"], ["That is my sister<b>'</b>s bike.", "apostrophe"],
    ["The answer <b>—</b> surprisingly <b>—</b> was no.", "dash"], ["A two<b>-</b>year<b>-</b>old child laughed.", "hyphen"], ["The storm <b>(</b>and it was a big one<b>)</b> passed.", "parentheses"]
  ];
  const MARKP = ["dash", "hyphen", "parentheses", "ellipsis", "quotation marks", "apostrophe"];
  const VOC20 = [
    ["arduous", "Climbing the steep mountain was an <b>arduous</b> task that took all day.", "difficult and tiring", ["easy and quick", "boring and dull"], "It took all day and needed great effort."],
    ["brevity", "The teacher praised the <b>brevity</b> of the report: it was only one page.", "shortness", ["length", "humor"], "The report was only one page."],
    ["catalyst", "The new coach was a <b>catalyst</b> for change in the team.", "something that causes change", ["something that stops change", "a kind of trophy"], "Because of the coach, many things began to change."],
    ["diminish", "The pain will <b>diminish</b> over the next few days.", "become smaller", ["become sharper", "stay the same"], "The sentence says the pain will ease."],
    ["hinder", "Thick fog can <b>hinder</b> the rescue crews.", "make it harder to move forward", ["help a great deal", "speed up"], "Fog makes it hard to see the way."],
    ["inevitable", "With dark clouds overhead, rain was <b>inevitable</b>.", "certain to happen", ["unlikely", "already over"], "The clouds made rain a sure thing."],
    ["skeptical", "Anna was <b>skeptical</b> of the claim and asked for proof.", "doubtful", ["delighted", "forgetful"], "She asked for proof."],
    ["substantial", "She earned a <b>substantial</b> amount of money from the sale.", "large", ["tiny", "secret"], "It was a lot of money."],
    ["ubiquitous", "Smartphones are <b>ubiquitous</b>; you see them everywhere.", "found everywhere", ["very expensive", "hard to find"], "The part after the semicolon explains it."],
    ["vindicate", "The video evidence helped to <b>vindicate</b> the accused player.", "clear from blame", ["blame more", "interview"], "The evidence showed the player had done nothing wrong."]
  ];
  const FR20 = [
    ["cliché", "an overused idea or phrase", ["a fancy dessert", "a loud noise"], "'Easy as pie' has been said so many times that it sounds tired."],
    ["faux pas", "an embarrassing social mistake", ["a dance step", "a polite greeting"], "Calling a new teacher by the wrong name in front of everyone."],
    ["déjà vu", "the feeling that you have lived this moment before", ["a sudden fear", "a bright idea"], "You enter a room for the first time but it seems familiar."],
    ["en route", "on the way", ["at the end", "in a hurry"], "We stopped for snacks while traveling to the lake."],
    ["à la carte", "ordered as separate items from a menu", ["served at midnight", "paid in advance"], "At a restaurant, you pick each dish separately instead of a set meal."],
    ["encore", "once more", ["the first act", "the final bow"], "The crowd claps and shouts for the band to play another song."],
    ["rendezvous", "a planned meeting", ["a surprise gift", "a long trip"], "The two scouts agreed to meet at the old oak tree at noon."],
    ["bon voyage", "have a good trip", ["good morning", "see you later"], "Friends wave and say this as the ship leaves the dock."],
    ["RSVP", "please reply", ["bring a gift", "arrive early"], "A party invitation asks for an answer by Friday."],
    ["cul-de-sac", "a dead-end street", ["a busy highway", "a small shop"], "A road that ends in a circle with no way through."]
  ];
  const FORM20 = [
    ["The ___ of the new bridge took two years.", "construction", ["constructive", "constructed"]], ["Her ___ comments helped me improve.", "constructive", ["construction", "construct"]],
    ["He made a ___ to join the club.", "decision", ["decisive", "decide"]], ["The coach is very ___ and chooses quickly.", "decisive", ["decision", "decided"]],
    ["Is the room ___ today?", "available", ["availability", "availably"]], ["The ___ of clean water saves lives.", "availability", ["available", "avail"]],
    ["We admire her ___ in the face of danger.", "bravery", ["brave", "bravely"]], ["She faced the storm ___.", "bravely", ["bravery", "brave"]],
    ["The teacher gave a clear ___ of the rule.", "explanation", ["explain", "explanatory"]], ["The ___ video showed how to bake bread.", "explanatory", ["explanation", "explained"]],
    ["Please ___ the form carefully.", "complete", ["completion", "completely"]], ["The ___ of the project is due Friday.", "completion", ["complete", "completely"]]
  ];
  const FOOD20 = [["cuisine", ["cuisene", "quisine"]], ["ingredient", ["ingrediant", "ingredeint"]], ["marinate", ["marinait", "marenate"]], ["vinegar", ["vinager", "vinigar"]], ["cinnamon", ["cinamon", "cinnamin"]], ["zucchini", ["zuchini", "zucchinni"]], ["broccoli", ["brocoli", "brocolli"]], ["cappuccino", ["capuccino", "cappucino"]], ["tortilla", ["tortila", "tortia"]], ["casserole", ["cassarole", "caserole"]], ["spaghetti", ["spagetti", "spaghetty"]], ["pomegranate", ["pomegranite", "pomogranate"]], ["avocado", ["avacado", "avocodo"]], ["asparagus", ["asparagas", "aspargus"]]];
  const SPORT20 = [["gymnasium", ["gymnasuim", "gymnasim"]], ["marathon", ["marithon", "maraton"]], ["archery", ["archary", "archerie"]], ["lacrosse", ["lacross", "lacrose"]], ["badminton", ["badmitton", "badmington"]], ["referee", ["refferee", "referree"]], ["athlete", ["athelete", "athlette"]], ["spectator", ["spectater", "spectetor"]], ["javelin", ["javalin", "jaevelin"]], ["decathlon", ["decathalon", "dekathlon"]], ["triathlon", ["triathalon", "triathelon"]], ["wrestling", ["wrestleing", "wresling"]], ["gymnastics", ["gymnasitcs", "gymnastiks"]], ["championship", ["champeonship", "championshp"]], ["stadium", ["stadeum", "staduim"]], ["fencing", ["fenceing", "fensing"]]];
  const PROOF20 = ["The [goverment] building stands in the center of town.", "She was [embarassed] when she dropped her tray.", "Please [seperate] the laundry into two piles.", "He [recieved] a letter from his cousin.", "The [dinning] room was set for twelve guests.", "Our team [definately] deserves the trophy.", "The drummer kept a steady [rythm] all night.", "We had [excellant] weather for the trip.", "The [bussiness] opened its doors at nine.", "She is [writting] a long essay on volcanoes.", "It was an [intresting] book about explorers.", "The teacher [explaned] the rule twice."];
  const DICT20 = dictG([["ambitious", "The ___ student planned to finish early."], ["dilemma", "She faced a ___: stay or go."], ["essential", "Sleep is ___ for good health."], ["guarantee", "The store will ___ the repair."], ["illustrate", "Use a diagram to ___ the idea."], ["laboratory", "The experiment took place in the ___."], ["maintain", "We try to ___ a clean room."], ["particular", "Is there a ___ song you like?"], ["reference", "Add a ___ to show where you found the fact."], ["sufficient", "Is there ___ time to finish?"], ["unfortunately", "___, the show was cancelled."], ["accomplish", "What do you hope to ___ today?"]]);

  const A20 = [
    L("Word roots 13", meaningG(ROOT13, ROOT13P, "root"),
      meanH("Example: the root <b>aud</b> means <b>hear</b>, as in <i>audio</i>. Find the meaning of yours the same way."),
      [S("Roots to know", "migr · pac · chrom · dem", "<b>migr</b> = move (migrate), <b>pac</b> = peace (pacify), <b>chrom</b> = color (chromatic), <b>dem</b> = people (epidemic)."), S("Body and eyes", "opt · tox · derm · neur", "<b>opt</b> = eye (optical), <b>tox</b> = poison (toxic), <b>derm</b> = skin (dermatologist), <b>neur</b> = nerve (neurology)."), S("Sun, fire and straight", "helio · pyr · ortho", "<b>helio</b> = sun (heliocentric), <b>pyr</b> = fire (pyrotechnics), <b>ortho</b> = straight (orthodontist).")]),
    L("Prefixes hetero-, homo-, iso-, endo- and exo-", prefG(PREF20, PREF20P),
      ["Split the word into the prefix and the rest. What does the rest of the word mean?", "Picture the real thing the word names. How does the prefix alter the base word?", "Example: <b>semicircle</b> is half of a circle, so <b>semi-</b> means half. Use your word the same way."],
      [S("Different and same", "hetero- · homo-", "<b>hetero-</b> means different (heterogeneous: made of different parts). <b>homo-</b> means same (homonym: same sound or spelling)."), S("Equal", "iso-", "<b>iso-</b> means equal (isosceles: a triangle with two equal sides)."), S("Inside and outside", "endo- · exo-", "<b>endo-</b> means inside (endoskeleton: a skeleton inside). <b>exo-</b> means outside (exoskeleton: a skeleton outside).")]),
    L("Word endings -let, -ling, -esque, -ward and -wise", meaningG(END20, END20P, "ending"),
      meanH("Example: <b>-less</b> means without, as in <i>careless</i>. Find the meaning of your ending the same way."),
      [S("Small and young", "-let · -ling", "<b>-let</b> means small (booklet, piglet). <b>-ling</b> means young (duckling, gosling)."), S("Style and direction", "-esque · -ward", "<b>-esque</b> means in the style of (picturesque). <b>-ward</b> means in the direction of (homeward, upward)."), S("Manner", "-wise", "<b>-wise</b> means in the manner of (clockwise, likewise).")]),
    L("Homophones 17", sentG(HOMO20),
      sentHints("Example: 'I will <b>wait</b> here' and 'the <b>weight</b> of a box'. Decide which meaning your sentence needs."),
      homoSlides("allowed · aloud · berth · birth", "maze · maize · vain · vein · vane")),
    L("Commonly misspelled words 8", rightG(MIS20),
      misH("Example: <b>Wednesday</b> has a silent d and <b>government</b> has an n before the m. Check the middle of yours."),
      misSlides("pro·nun·ci·a·tion · res·tau·rant", "in·de·pen·dent · rec·om·mend")),
    L("Science words 2", rightG(SCI20),
      misH("Example: <b>photosynthesis</b> is photo + synthesis. Split long science words into parts."),
      wordSlides("Science words", "Biology, chemistry and physics use long words made from Greek and Latin parts.", "chro·mo·some · mi·to·chon·dri·a", "pre·cip·i·ta·tion · ac·cel·er·a·tion")),
    L("Math words 2", rightG(MATH20),
      misH("Example: <b>diagonal</b> is dia + gon + al. Split long math words into parts."),
      wordSlides("Math words", "Math words often come from Greek and Latin. The parts tell you what the word means.", "co·ef·fi·cient · ex·po·nent", "trig·o·nom·e·try · prob·a·bil·i·ty")),
    L("Job and career words", rightG(JOB20),
      misH("Example: <b>musician</b> ends in -ian, and <b>teacher</b> ends in -er. People endings can be -ian, -ist, -er, -or or -ant."),
      wordSlides("Job words", "Many jobs end in -ian, -ist, -er or -or. Learn the ending along with the word.", "phar·ma·cist · elec·tri·cian", "vet·er·i·nar·i·an · pho·tog·ra·pher")),
    L("Linking words: although, unless, whereas", sentG(CONJ20),
      ["Read the whole sentence. Does the second part agree with the first part, contrast with it, or depend on it?", "Ask what the second part does: does it show a surprise, give a reason, set a condition, mark a time, or compare two things?", "Example: 'We stayed home ___ it rained.' needs a reason, so 'because' fits. Find what your sentence needs."],
      [S("Joining ideas", "🔗", "Words like <b>although</b>, <b>because</b> and <b>unless</b> join two ideas in one sentence."), S("Contrast and reason", "although · because", "<b>Although</b> and <b>even though</b> show a surprise. <b>Because</b> gives a reason."), S("Condition and time", "unless · until · as soon as", "<b>Unless</b> means 'if not'. <b>Until</b> and <b>as soon as</b> tell about time. <b>Whereas</b> compares two things.")]),
    L("Pairs that go together", mcG(PAIR20.map(([t, a, d]) => [t.replace("___", "<b>___</b>"), a, d])),
      ["Some words work in pairs. Look at the first half of the sentence for the first word of the pair.", "The first word of the pair decides its partner. Say the whole pair out loud with each choice.", "Example: 'Both the cat ___ the dog slept' uses 'both ... and'. Find the pair in yours."],
      [S("Word pairs", "either ... or", "<b>Either ... or</b> gives a choice. <b>Neither ... nor</b> says no to both."), S("Adding", "both ... and", "<b>Both ... and</b> joins two things. <b>Not only ... but also</b> adds a second point."), S("Comparing", "rather ... than", "We say <b>rather ... than</b> and <b>so ... that</b>.")]),
    L("Dashes, hyphens, parentheses and quotes", poolG(MARK20.map(([t, a]) => ["Which mark is shown in bold?<br>" + t, a]), MARKP),
      ["Look at the shape of the mark and what it does: joins, interrupts, trails off, or shows speech.", "A short mark joins words, a long mark sets off a sudden break, and curved marks hold extra information that could be left out.", "Example: 'Wait... what?' has an ellipsis because the voice trails off. Now find the job of your mark."],
      [S("Short and long", "- and —", "A <b>hyphen</b> (-) joins words, as in well-known. A <b>dash</b> (—) sets off an extra thought or a sudden break."), S("Curves", "( )", "<b>Parentheses</b> hold extra information that could be left out."), S("Dots and quotes", "... and \" \"", "An <b>ellipsis</b> (...) shows a pause or a trailing off. <b>Quotation marks</b> show the exact words someone says.")]),
    L("Vocabulary builders 2", vocG(VOC20), vocabH("Example: 'The <b>lengthy</b> movie lasted four hours' ➜ lengthy means very long, because of the four hours."), vocabSlides),
    L("French phrases in English", phraseG("French phrase", FR20),
      ["French phrases are used in English just as they are. Think of where you may have heard the phrase.", q => q.it[3], "Example: <b>bon appétit</b> means 'enjoy your meal'. Use the clue to work out yours."],
      [S("French in English", "🥐", "English uses many French phrases, especially for food, manners and travel."), S("Everyday ones", "en route · encore", "<b>En route</b> means on the way. <b>Encore</b> means once more."), S("More phrases", "faux pas · RSVP · cliché", "A <b>faux pas</b> is an embarrassing mistake. <b>RSVP</b> means please reply. A <b>cliché</b> is an overused phrase.")]),
    L("Choose the right word form", sentG(FORM20),
      ["Look at the words around the gap. Does the gap need a naming word (noun), a describing word (adjective) or an action word (verb)?", "The three choices come from the same root but have different endings. Match the ending to the job the word does.", "Example: 'The ___ was loud' needs a noun (<b>noise</b>), but 'The ___ dog barked' needs an adjective (<b>noisy</b>). Decide what your sentence needs."],
      [S("One root, many forms", "decide · decision · decisive", "One root can make a verb (<b>decide</b>), a noun (<b>decision</b>) and an adjective (<b>decisive</b>)."), S("Endings help", "-ion · -ive · -ly", "<b>-ion</b> usually makes a noun. <b>-ive</b> and <b>-ful</b> make adjectives. <b>-ly</b> makes adverbs."), S("Check the job", "✅", "Ask what job the word does in the sentence, then choose the form that does it.")]),
    L("Proofreading 10", proofG(PROOF20), proofH("Example: 'It was a <b>wierd</b> sound' ➜ 'wierd' should be 'weird'. Check each word like that."), proofSlides("🧐")),
    L("Listen and spell 16", tyG(DICT20), dictHints("Example: 'enthusiasm' = en + thu + si + asm. Write each part, then check the whole word."), dictSlides("am·bi·tious · di·lem·ma", "lab·o·ra·to·ry · suf·fi·cient")),
    L("Food and cooking words", rightG(FOOD20),
      misH("Example: <b>sandwich</b> has a d in the middle. Food words from other languages keep their spellings, so look at the middle."),
      wordSlides("Food words", "Many food words come from Italian, Spanish and French, and keep their old spellings.", "zuc·chi·ni · broc·co·li", "cap·puc·ci·no · pome·gran·ate")),
    L("Sports words", rightG(SPORT20),
      misH("Example: <b>gymnastics</b> has a y after the g. Many sports words come from Greek, so look for y, th and ch."),
      wordSlides("Sports words", "Sports words come from many languages. Greek gave us marathon, athlete and gymnasium.", "gym·na·si·um · ath·lete", "dec·ath·lon · ref·er·ee"))
  ];
  A20.push(MIX("Mixed practice", [A20[0], A20[3], A20[4], A20[8], A20[10], A20[13]]));
  A20.push(MIX("Level 20 Challenge", [A20[1], A20[2], A20[5], A20[6], A20[7], A20[9], A20[11], A20[12], A20[14], A20[15], A20[16], A20[17]]));

  // ================= LEVEL 21 =================
  const ROOT14 = [
    ["jurisdiction", "jur", "law", "A police officer in one town cannot make arrests in a faraway country, because of this limit."],
    ["precede", "ced", "go", "The opening act comes before the main show: it moves ahead of it."],
    ["nocturnal", "noct", "night", "Owls and bats are awake in the dark hours."],
    ["insomnia", "somn", "sleep", "Trouble drifting off at bedtime."],
    ["carnivore", "carn", "meat", "A lion hunts for its food."],
    ["herbivore", "herb", "plant", "A cow eats grass all day."],
    ["refrigerate", "frig", "cold", "A kitchen appliance keeps milk and eggs from spoiling."],
    ["verify", "ver", "truth", "Check a fact twice to be certain it is right."],
    ["fortify", "fort", "strong", "Builders add thick walls to a castle to make it harder to attack."],
    ["replenish", "plen", "full", "A tank that was empty is topped up again."],
    ["textile", "text", "weave", "Cloth is made on a loom."],
    ["miracle", "mir", "wonder", "A surprising event that nobody can explain."]
  ];
  const ROOT14P = ["law", "go", "night", "sleep", "meat", "plant", "cold", "truth", "strong", "full", "weave", "wonder"];
  const PREF21 = [["ob-", "obstacle", "against"], ["ob-", "obstruct", "against"], ["ad-", "advance", "toward"], ["ad-", "adhere", "toward"], ["meta-", "metamorphosis", "change"], ["meta-", "metabolism", "change"], ["amphi-", "amphibian", "both"], ["amphi-", "amphitheater", "around"], ["cata-", "catalogue", "down"], ["cata-", "catastrophe", "down"]];
  const PREF21P = ["against", "toward", "change", "both", "around", "down"];
  const END21 = [
    ["troublesome", "-some", "tending to cause", "A cranky cat that keeps scratching the sofa."],
    ["burdensome", "-some", "tending to cause", "A heavy job that weighs on you."],
    ["employee", "-ee", "person who receives the action", "The person who is given a job by a company."],
    ["interviewee", "-ee", "person who receives the action", "The person who is asked questions in a job talk."],
    ["optimism", "-ism", "belief or practice", "Always expecting that things will turn out well."],
    ["heroism", "-ism", "belief or practice", "Brave, selfless acts that save others."],
    ["threefold", "-fold", "times as many", "The club now has triple the members it had before."],
    ["tenfold", "-fold", "times as many", "Sales rose to ten times what they were."],
    ["reddish", "-ish", "somewhat like", "A sunset that is not quite red but near it."],
    ["childish", "-ish", "somewhat like", "Behavior that seems like what a small child would do."]
  ];
  const END21P = ["tending to cause", "person who receives the action", "belief or practice", "times as many", "somewhat like", "without"];
  const HOMO21 = [
    ["The farmer stacked a ___ of hay.", "bale", ["bail", "bayl"]], ["The judge set the ___ at one hundred dollars.", "bail", ["bale", "bayl"]],
    ["He had a blister on his ___.", "heel", ["heal", "hele"]], ["The cut will ___ in a week.", "heal", ["heel", "hele"]],
    ["Bakers ___ the dough before it rises.", "knead", ["need", "kneed"]], ["I ___ a new pencil.", "need", ["knead", "kneed"]],
    ["The tailor sewed a neat ___.", "seam", ["seem", "sime"]], ["You ___ tired today.", "seem", ["seam", "seme"]],
    ["The king sat on his golden ___.", "throne", ["thrown", "throan"]], ["The ball was ___ over the fence.", "thrown", ["throne", "throan"]],
    ["Add fresh ___ to the stew.", "thyme", ["time", "thime"]], ["What ___ is it?", "time", ["thyme", "tyme"]],
    ["The ___ curtains let the light through.", "sheer", ["shear", "shere"]], ["The farmer will ___ the sheep.", "shear", ["sheer", "shere"]],
    ["The plumber checks if the wall is ___.", "plumb", ["plum", "plumm"]], ["I ate a juicy ___.", "plum", ["plumb", "plumm"]],
    ["A wave of ___ came over her after the lie.", "guilt", ["gilt", "gilte"]], ["The frame was covered in ___ paint.", "gilt", ["guilt", "gelt"]],
    ["The player was sent off for a ___ play.", "foul", ["fowl", "fowel"]], ["The hen is a farm ___.", "fowl", ["foul", "fowll"]]
  ];
  const MIS21 = [["accidentally", ["accidently", "accidentaly"]], ["achievement", ["acheivement", "achievment"]], ["acknowledge", ["acknowlege", "aknowledge"]], ["advertisement", ["advertisment", "advertizement"]], ["aggressive", ["agressive", "aggresive"]], ["ambiguous", ["ambigious", "ambiguos"]], ["category", ["catagory", "categorey"]], ["cemetery", ["cemetary", "semetery"]], ["collaborate", ["colaborate", "collabrate"]], ["competition", ["compitition", "competiton"]], ["criticism", ["critisism", "critcism"]], ["disappoint", ["dissappoint", "disapoint"]], ["environment", ["enviroment", "enviornment"]], ["extraordinary", ["extrordinary", "extraordinery"]], ["fiery", ["firey", "fiyery"]], ["harassment", ["harrassment", "harasment"]], ["irrelevant", ["irrelevent", "irrelavant"]], ["occurrence", ["occurence", "occurrance"]], ["parliament", ["parliment", "parlament"]], ["playwright", ["playwrite", "playright"]], ["politician", ["politican", "polititian"]]];
  const LAW21 = [["jury", ["jurry", "jurey"]], ["verdict", ["verdick", "verdect"]], ["testimony", ["testamony", "testimoney"]], ["defendant", ["defendent", "defendint"]], ["plaintiff", ["plantiff", "plaintif"]], ["jurisdiction", ["jurisdition", "jursidiction"]], ["amendment", ["ammendment", "amendmint"]], ["subpoena", ["subpeona", "supoena"]], ["acquittal", ["aquittal", "acquital"]], ["perjury", ["purjury", "perjery"]], ["legislature", ["legeslature", "legislaturre"]], ["constitution", ["constitusion", "consitution"]], ["attorney", ["attourney", "atorney"]], ["witness", ["witnes", "whitness"]], ["innocent", ["inocent", "innocint"]], ["justice", ["justise", "jusitce"]]];
  const MIND21 = [["empathy", ["empathie", "emphathy"]], ["perception", ["percepshun", "preception"]], ["motivation", ["motivasion", "motovation"]], ["stereotype", ["steriotype", "stereotipe"]], ["prejudice", ["predjudice", "prejudise"]], ["conformity", ["conformaty", "comformity"]], ["adolescence", ["adolescense", "adollescence"]], ["cognitive", ["cognative", "cogntive"]], ["behavior", ["behaivor", "behavor"]], ["sociology", ["sosiology", "socioligy"]], ["anthropology", ["anthropolgy", "antropology"]], ["subconscious", ["subconcious", "subconsious"]], ["instinct", ["instinkt", "instint"]], ["emotion", ["emmotion", "emoshion"]], ["personality", ["personalty", "personallity"]], ["intelligence", ["inteligence", "intelligance"]], ["attitude", ["atitude", "attitute"]], ["reputation", ["repution", "repatation"]]];
  const LANG21 = [["dialect", ["dialact", "dialekt"]], ["syntax", ["sintax", "syntacs"]], ["etymology", ["etymolgy", "etimology"]], ["connotation", ["conotation", "connotasion"]], ["denotation", ["denotasion", "dennotation"]], ["idiom", ["idiam", "idiomm"]], ["synonym", ["sinonym", "synonim"]], ["antonym", ["antanym", "antonymm"]], ["punctuation", ["punctuasion", "punctation"]], ["bilingual", ["bilinguel", "bylingual"]], ["phonetic", ["fonetic", "phonetick"]], ["paragraph", ["paragragh", "paragrapf"]], ["consonant", ["consinant", "consenant"]], ["metaphor", ["metafor", "metaphour"]], ["narrative", ["narative", "narrativ"]], ["literally", ["literaly", "litteraly"]]];
  const TONE21 = [
    ["<i>Dear Sir, I am writing to formally request a meeting at your earliest convenience.</i><br>Which word best describes the tone?", "formal", ["playful", "angry", "bored"]],
    ["<i>Oh sure, because waiting in line for two hours is exactly how I wanted to spend my day.</i><br>Which word best describes the tone?", "sarcastic", ["joyful", "thankful", "formal"]],
    ["<i>I remember those long summer evenings on Grandma's porch, and how I wish I could go back.</i><br>Which word best describes the tone?", "nostalgic", ["fearful", "bored", "angry"]],
    ["<i>Don't worry, next season we will be even stronger, and I know we will win.</i><br>Which word best describes the tone?", "optimistic", ["bitter", "confused", "sarcastic"]],
    ["<i>Nothing ever works out for me, so why even try?</i><br>Which word best describes the tone?", "pessimistic", ["cheerful", "formal", "excited"]],
    ["<i>Hurry! The bridge is closing in five minutes, and we must go now!</i><br>Which word best describes the tone?", "urgent", ["calm", "humorous", "bored"]],
    ["<i>I am so sorry you lost your pet. I am here if you want to talk.</i><br>Which word best describes the tone?", "sympathetic", ["sarcastic", "bored", "angry"]],
    ["<i>The penguin waddled in, tripped on its own feet, and bowed as if it had planned the whole thing.</i><br>Which word best describes the tone?", "humorous", ["grim", "serious", "formal"]],
    ["<i>The ancient forest stood silent, vast and unchanged for a thousand years.</i><br>Which word best describes the tone?", "calm", ["angry", "excited", "sarcastic"]],
    ["<i>How dare they ignore our request again! This is completely unacceptable.</i><br>Which word best describes the tone?", "angry", ["calm", "grateful", "playful"]],
    ["<i>Thank you so much for the lovely gift. It was exactly what I wanted.</i><br>Which word best describes the tone?", "grateful", ["bitter", "bored", "formal"]]
  ];
  const RHET21 = [
    ["Who doesn't love a sunny day? (The speaker does not expect an answer.)", "rhetorical question"], ["A fire station burns to the ground.", "irony"],
    ["'It's a bit warm,' said the man in the middle of the hot desert at noon.", "understatement"], ["'The more I learn, the more I realize how little I know.'", "paradox"],
    ["'Careful, you are about to open a Pandora's box.'", "allusion"], ["'A cell is to a body what a brick is to a wall.'", "analogy"],
    ["A pilot who is afraid of heights.", "irony"], ["Can anyone really say that homework is fun?", "rhetorical question"],
    ["Calling a giant hurricane 'a bit of wind'.", "understatement"], ["'Less is more.'", "paradox"]
  ];
  const RHETP = ["rhetorical question", "irony", "understatement", "paradox", "allusion", "analogy"];
  const WEATH21 = [["meteorology", ["meterology", "meteorlogy"]], ["hurricane", ["hurricain", "huricane"]], ["tornado", ["tornato", "tornedo"]], ["avalanche", ["avalance", "avelanche"]], ["volcano", ["volcanoe", "vulcano"]], ["glacier", ["glaicer", "glacior"]], ["drought", ["drowt", "drougth"]], ["humidity", ["humiditty", "humidty"]], ["barometer", ["baramiter", "barometor"]], ["blizzard", ["blizzerd", "blizard"]], ["sediment", ["sedement", "sedimant"]], ["tsunami", ["tsunammi", "sunami"]], ["monsoon", ["monsoun", "monsune"]], ["stalactite", ["stalagtite", "stalactight"]], ["peninsula", ["penninsula", "peninsulla"]], ["plateau", ["plateu", "platoe"]], ["tundra", ["tundrah", "tundera"]]];
  const VOC21 = [
    ["altruistic", "The <b>altruistic</b> nurse worked extra shifts only to help others.", "caring about the needs of others", ["caring only about herself", "afraid of hard work"], "She did it to help others, not for herself."],
    ["arbitrary", "Choosing a number by pointing at random was an <b>arbitrary</b> decision.", "based on chance, not reason", ["carefully planned", "strictly required"], "There was no plan, only random pointing."],
    ["concise", "Keep your answer <b>concise</b>: two sentences is plenty.", "short and clear", ["long and detailed", "funny and loud"], "Two sentences is not much."],
    ["credible", "A witness who saw everything is a <b>credible</b> source.", "believable", ["invisible", "unreliable"], "Seeing everything makes the person easy to trust."],
    ["deplete", "Campers can <b>deplete</b> the firewood if they burn too much.", "use up", ["collect", "hide"], "Burning too much leaves little behind."],
    ["impartial", "A referee must be <b>impartial</b> and favor neither team.", "fair, not taking sides", ["loud and bossy", "biased toward one side"], "The sentence says what a referee must not favor."],
    ["lethargic", "After the long trip she felt <b>lethargic</b> and only wanted to lie down.", "slow and without energy", ["full of energy", "very angry"], "She only wanted to lie down."],
    ["obsolete", "Floppy disks are <b>obsolete</b>; hardly anyone uses them now.", "no longer used", ["brand new", "very costly"], "The part after the semicolon explains it."],
    ["resilient", "A <b>resilient</b> plant bounces back after a storm.", "able to recover quickly", ["easily broken", "very tall"], "It bounces back after the storm."],
    ["scrutinize", "The inspector will <b>scrutinize</b> every part of the bridge.", "examine very closely", ["quickly ignore", "paint"], "An inspector checks every part."]
  ];
  const OPP21 = [
    ["transparent", "opaque", ["clear", "shiny"]], ["expand", "contract", ["enlarge", "extend"]], ["ascend", "descend", ["climb", "rise"]], ["voluntary", "compulsory", ["willing", "generous"]],
    ["victory", "defeat", ["triumph", "challenge"]], ["temporary", "permanent", ["brief", "practical"]], ["scatter", "gather", ["spread", "throw"]], ["praise", "criticize", ["compliment", "announce"]],
    ["genuine", "counterfeit", ["authentic", "generous"]], ["vague", "precise", ["unclear", "vacant"]], ["include", "exclude", ["contain", "invite"]], ["optimist", "pessimist", ["dreamer", "realist"]],
    ["mandatory", "optional", ["required", "various"]], ["ancient", "modern", ["old", "rusty"]]
  ];
  const oppG = () => { const it = pick(OPP21), [w, a, d] = it; return { text: `What is the opposite of <b>${w}</b>?`, choices: shuf([a, ...shuf(d).slice(0, 2)]), answer: a, it }; };
  const ADJ21 = [
    ["The movie was so ___ that I fell asleep.", "boring", ["bored", "bore"]], ["I was ___ by the long lecture.", "bored", ["boring", "bore"]],
    ["The ___ news made everyone cheer.", "exciting", ["excited", "excite"]], ["The ___ children could not sit still.", "excited", ["exciting", "excite"]],
    ["The directions were ___ and I got lost.", "confusing", ["confused", "confuse"]], ["He felt ___ when he saw the map.", "confused", ["confusing", "confuse"]],
    ["It was a ___ story with a surprise ending.", "surprising", ["surprised", "surprise"]], ["She was ___ to see her friends at the door.", "surprised", ["surprising", "surprise"]],
    ["A ___ day of hiking left us sleepy.", "tiring", ["tired", "tire"]], ["We were ___ after the hike.", "tired", ["tiring", "tire"]],
    ["The noise from the street is ___.", "annoying", ["annoyed", "annoy"]], ["My brother was ___ when I used his pen.", "annoyed", ["annoying", "annoy"]],
    ["The giant roller coaster looked ___ to the little kids.", "frightening", ["frightened", "fright"]]
  ];
  const DAYS21 = [
    ["<b>Monday</b> comes from 'moon day'. What is it named after?", "the Moon", ["the Sun", "Mars"], "Look up at the night sky for a bright night light."],
    ["<b>Sunday</b> is named after which body in the sky?", "the Sun", ["the Moon", "Saturn"], "Think of the bright star that warms the day."],
    ["<b>Saturday</b> is named after the Roman god...", "Saturn", ["Mars", "Janus"], "The Romans also named a ringed planet after him."],
    ["<b>Thursday</b> is named after Thor, a thunder god. Which people told stories about him?", "the Norse", ["the Romans", "the Egyptians"], "Stories about him come from Scandinavia long ago."],
    ["<b>March</b> is named after Mars, the Roman god of...", "war", ["farming", "the sea"], "Armies of ancient Rome began their campaigns in this month."],
    ["<b>January</b> is named after Janus, the Roman god of...", "doors and new beginnings", ["thunder", "harvest"], "January opens the year like a door."],
    ["<b>July</b> is named after which Roman leader?", "Julius Caesar", ["Augustus", "Nero"], "He was a famous general whose calendar we still use in a changed form."],
    ["<b>August</b> is named after the first Roman emperor, who was called...", "Augustus", ["Julius Caesar", "Nero"], "His title meant 'honored'."],
    ["<b>Wednesday</b> is named after Woden, who is also called...", "Odin", ["Thor", "Zeus"], "He was the chief of the Norse gods and had one eye."],
    ["<b>September</b> comes from the Latin word <i>septem</i>. What does it mean?", "seven", ["nine", "ten"], "In the old Roman year, which began in March, this month was counted with a Latin number."],
    ["<b>October</b> comes from the Latin word <i>octo</i>. What does it mean?", "eight", ["six", "ten"], "An octopus has this many arms."],
    ["<b>December</b> comes from the Latin word <i>decem</i>. What does it mean?", "ten", ["twelve", "nine"], "A decade has this many years."]
  ];
  const daysG = () => { const it = pick(DAYS21), [t, a, d] = it; return { text: t, choices: shuf([a, ...shuf(d).slice(0, 2)]), answer: a, it }; };
  const AR21 = [["calendar", ["calender", "calandar"]], ["vinegar", ["vinager", "vinigar"]], ["burglar", ["burgler", "burglor"]], ["similar", ["similer", "simular"]], ["familiar", ["familier", "familar"]], ["popular", ["populer", "popilar"]], ["regular", ["regulor", "reguler"]], ["peculiar", ["peculier", "pecular"]], ["particular", ["particuler", "particlar"]], ["circular", ["circuler", "circlar"]], ["cellar", ["celler", "cellor"]], ["beggar", ["begger", "beggor"]], ["dollar", ["dollor", "doller"]], ["pillar", ["piller", "pillor"]], ["scholar", ["scholer", "scholor"]], ["sugar", ["suger", "sugor"]], ["spectacular", ["spectacler", "spectaculer"]]];
  const PROOF21 = ["The [reserch] paper took three weeks to write.", "We need to [prepair] for the exam on Friday.", "The [committe] voted to change the rules.", "He gave a [convinceing] speech about recycling.", "The [mathmatics] club meets on Tuesday.", "The shop had a [wonderfull] sale on shoes.", "They [achived] their goal after months of work.", "Please [adress] the envelope clearly.", "A [healty] breakfast gives you energy.", "The [explination] was clear and short.", "He was [thankfull] for the help.", "It is [importent] to drink water."];
  const DICT21 = dictG([["analysis", "The ___ of the data took a week."], ["ancestor", "My ___ came to this country long ago."], ["authentic", "This is an ___ painting, not a copy."], ["beneficial", "Exercise is ___ for your heart."], ["coincidence", "Meeting you here was a happy ___."], ["controversial", "The new rule is ___ and many people disagree."], ["demonstrate", "Let me ___ how the machine works."], ["distinguish", "Can you ___ one twin from the other?"], ["enthusiastic", "The fans were ___ about the game."], ["implement", "The school will ___ the new plan in May."], ["inevitable", "Change is ___ in every life."], ["legitimate", "She gave a ___ reason for being late."], ["prejudice", "We should not judge people with ___."], ["spontaneous", "The crowd gave a ___ cheer."]]);

  const A21 = [
    L("Word roots 14", meaningG(ROOT14, ROOT14P, "root"),
      meanH("Example: the root <b>aud</b> means <b>hear</b>, as in <i>audio</i>. Find the meaning of yours the same way."),
      [S("Roots to know", "jur · ced · noct · somn", "<b>jur</b> = law (jurisdiction), <b>ced</b> = go (precede), <b>noct</b> = night (nocturnal), <b>somn</b> = sleep (insomnia)."), S("Food and cold", "carn · herb · frig · ver", "<b>carn</b> = meat (carnivore), <b>herb</b> = plant (herbivore), <b>frig</b> = cold (refrigerate), <b>ver</b> = truth (verify)."), S("Last four", "fort · plen · text · mir", "<b>fort</b> = strong (fortify), <b>plen</b> = full (replenish), <b>text</b> = weave (textile), <b>mir</b> = wonder (miracle).")]),
    L("Prefixes ob-, ad-, meta-, amphi- and cata-", prefG(PREF21, PREF21P),
      ["Split the word into the prefix and the rest. What does the rest of the word mean?", "Picture the real thing the word names. How does the prefix alter the base word?", "Example: <b>semicircle</b> is half of a circle, so <b>semi-</b> means half. Use your word the same way."],
      [S("Against and toward", "ob- · ad-", "<b>ob-</b> means against or in the way (obstacle, obstruct). <b>ad-</b> means toward (advance, adhere)."), S("Change and both", "meta- · amphi-", "<b>meta-</b> means change (metamorphosis: a change of form). <b>amphi-</b> means both or around (amphibian: lives both on land and in water)."), S("Down", "cata-", "<b>cata-</b> means down (catalogue: a list written down, catastrophe: a sudden downturn).")]),
    L("Word endings -some, -ee, -ism, -fold and -ish", meaningG(END21, END21P, "ending"),
      meanH("Example: <b>-less</b> means without, as in <i>careless</i>. Find the meaning of your ending the same way."),
      [S("Causing and receiving", "-some · -ee", "<b>-some</b> means tending to cause (troublesome). <b>-ee</b> means the person who receives the action (employee, interviewee)."), S("Belief and number", "-ism · -fold", "<b>-ism</b> means a belief or practice (optimism, heroism). <b>-fold</b> means times as many (threefold, tenfold)."), S("Nearly", "-ish", "<b>-ish</b> means somewhat like (reddish, childish).")]),
    L("Homophones 18", sentG(HOMO21),
      sentHints("Example: 'I will <b>wait</b> here' and 'the <b>weight</b> of a box'. Decide which meaning your sentence needs."),
      homoSlides("bale · bail · heel · heal", "throne · thrown · thyme · time")),
    L("Commonly misspelled words 9", rightG(MIS21),
      misH("Example: <b>Wednesday</b> has a silent d and <b>government</b> has an n before the m. Check the middle of yours."),
      misSlides("ac·com·plish·ment · col·lab·o·rate", "ir·rel·e·vant · par·lia·ment")),
    L("Law and justice words", rightG(LAW21),
      misH("Example: <b>judge</b> has a d before the g. Law words come from Latin and French, so watch for silent letters and double letters."),
      wordSlides("Law words", "Courts and governments use special words, many from Latin and French.", "ju·ry · ver·dict · wit·ness", "ju·ris·dic·tion · leg·is·la·ture")),
    L("Mind and society words", rightG(MIND21),
      misH("Example: <b>psychology</b> starts with a silent p. Many words about people come from Greek, so look for ps, ch, ph and th."),
      wordSlides("Words about people", "Psychology and sociology have many long words. Learn them in parts.", "em·pa·thy · ster·e·o·type", "ad·o·les·cence · sub·con·scious")),
    L("Language words", rightG(LANG21),
      misH("Example: <b>alphabet</b> has a ph that sounds like f. Many language words come from Greek, so watch for ph, y and double letters."),
      wordSlides("Words about words", "Linguistics is the study of language. Its terms often come from Greek.", "syn·tax · et·y·mol·o·gy", "con·no·ta·tion · pho·net·ic")),
    L("Tone words", mcG(TONE21, 3),
      ["Read the passage twice and imagine the voice of the person speaking.", "Look at the choice of words and the punctuation, such as exclamation marks or polite phrases. They show how the writer feels.", "Example: 'Ha! What a silly hat!' sounds playful, because of the exclamation and the teasing. Find the feeling in yours."],
      [S("What is tone?", "🎭", "<b>Tone</b> is the writer's attitude. It is shown by word choice, punctuation and details."), S("Tone words", "formal · sarcastic · urgent", "<b>Formal</b> is polite and proper. <b>Sarcastic</b> says one thing and means the opposite. <b>Urgent</b> says to hurry."), S("More tone words", "nostalgic · optimistic · sympathetic", "<b>Nostalgic</b> longs for the past. <b>Optimistic</b> expects good things. <b>Sympathetic</b> shows care for someone's trouble.")]),
    L("Rhetorical devices", poolG(RHET21.map(([t, a]) => ["Which device is shown?<br><i>" + t + "</i>", a]), RHETP),
      ["Think about what the sentence is doing: asking, contrasting, shrinking, pointing to a story, or comparing.", "Ask: does it expect no answer, say the opposite of what you expect, make something seem smaller, seem to contradict itself, point to a known story, or compare two relationships?", "Example: 'Winter is just a little bit chilly in the North Pole' is an understatement, because it makes something huge sound small. Now name the device in yours."],
      [S("Making a point", "🎤", "Writers and speakers use <b>rhetorical devices</b> to make their words powerful."), S("Questions and surprise", "rhetorical question · irony", "A <b>rhetorical question</b> is asked for effect, not for an answer. <b>Irony</b> is when the result is the opposite of what you would expect."), S("Shrinking and stories", "understatement · allusion · paradox", "An <b>understatement</b> makes something sound smaller. An <b>allusion</b> points to a famous story. A <b>paradox</b> seems to contradict itself but holds truth.")]),
    L("Weather and Earth words", rightG(WEATH21),
      misH("Example: <b>earthquake</b> is earth + quake, and <b>thunderstorm</b> is thunder + storm. Split long weather words into parts."),
      wordSlides("Earth words", "Weather and geography words come from Greek, Latin and other languages.", "me·te·or·ol·o·gy · bar·om·e·ter", "pen·in·su·la · pla·teau")),
    L("Vocabulary builders 3", vocG(VOC21), vocabH("Example: 'The <b>lengthy</b> movie lasted four hours' ➜ lengthy means very long, because of the four hours."), vocabSlides),
    L("Opposites 6", oppG,
      ["Think of the meaning of the word, then flip it.", "Be careful: a word that means the same thing is not the opposite. Cross out any choice that has the same meaning.", "Example: the opposite of <b>brave</b> is <b>cowardly</b>; <b>fearless</b> is a synonym, not an opposite."],
      [S("Opposites", "↔", "<b>Antonyms</b> are words with opposite meanings."), S("Watch out", "synonym ≠ antonym", "A synonym means the same. An antonym means the opposite. Choices often include a synonym as a trap."), S("Prefix clues", "in- · un- · dis-", "Some opposites are made with a prefix, but many are different words, such as <b>victory</b> and <b>defeat</b>.")]),
    L("-ed or -ing describing words", sentG(ADJ21),
      ["Ask: is the gap describing a feeling inside a person, or the thing that causes the feeling?", "An -ed word says how someone feels. An -ing word describes what causes the feeling.", "Example: 'The game was ___' needs the cause (<b>thrilling</b>), but 'I was ___' needs the feeling (<b>thrilled</b>). Decide which your sentence needs."],
      [S("Feelings and causes", "bored · boring", "<b>-ed</b> words describe how a person feels: I am <b>bored</b>. <b>-ing</b> words describe the cause: the film is <b>boring</b>."), S("More pairs", "excited · exciting", "<b>Excited/exciting</b>, <b>confused/confusing</b>, <b>surprised/surprising</b>, <b>tired/tiring</b>."), S("Check", "✅", "Ask who feels it. A person feels <b>-ed</b>. A thing causes <b>-ing</b>.")]),
    L("Proofreading 11", proofG(PROOF21), proofH("Example: 'It was a <b>wierd</b> sound' ➜ 'wierd' should be 'weird'. Check each word like that."), proofSlides("🧐")),
    L("Listen and spell 17", tyG(DICT21), dictHints("Example: 'enthusiasm' = en + thu + si + asm. Write each part, then check the whole word."), dictSlides("an·al·y·sis · an·ces·tor", "co·in·ci·dence · con·tro·ver·sial")),
    L("Names of days and months", daysG,
      ["Many names come from gods, rulers, the sky or number words. Think about which kind this name is.", q => q.it[3], "Example: the word <b>triangle</b> starts with <b>tri</b>, which means three. Names often hide clues like this."],
      [S("Days with stories", "Sun · Moon · Thor", "<b>Sunday</b> is the Sun's day and <b>Monday</b> is the Moon's day. <b>Thursday</b> honors Thor, the Norse thunder god."), S("Months with gods and rulers", "Janus · Mars · Julius · Augustus", "<b>January</b> honors Janus, <b>March</b> honors Mars, <b>July</b> honors Julius Caesar and <b>August</b> honors Emperor Augustus."), S("Number months", "septem · octo · decem", "<b>September</b>, <b>October</b> and <b>December</b> come from the Latin words for seven, eight and ten. In the old Roman year, they really were the 7th, 8th and 10th months.")]),
    L("Words ending in -ar", rightG(AR21),
      misH("Example: <b>sugar</b> and <b>dollar</b> end in -ar, but <b>teacher</b> ends in -er. The ending sounds the same, so you must remember it."),
      wordSlides("The -ar ending", "The ending sound in these words is a short 'er', but the spelling is -ar. You must remember each one.", "cal·en·dar · vin·e·gar", "fa·mil·iar · pe·cu·liar"))
  ];
  A21.push(MIX("Mixed practice", [A21[0], A21[3], A21[4], A21[8], A21[11], A21[14]]));
  A21.push(MIX("Level 21 Challenge", [A21[1], A21[2], A21[5], A21[6], A21[7], A21[9], A21[10], A21[12], A21[13], A21[15], A21[16], A21[17]]));

  Object.assign(SPELL_LEVELS, { 19: A19, 20: A20, 21: A21 });
})();
