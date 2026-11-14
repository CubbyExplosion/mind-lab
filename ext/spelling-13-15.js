// ext/spelling-13-15.js : Spelling & Words, levels 13-15 (6th grade, and 7th grade first half).
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
  const gap = (w, a) => { const i = w.lastIndexOf(a); return w.slice(0, i) + "__" + w.slice(i + a.length); };

  // ----- question makers -----
  const mcG = (items, n = 3) => () => { const it = pick(items); const [t, a, d, v] = it; const q = { text: t, choices: shuf([a, ...shuf(d).slice(0, n - 1)]), answer: a, it }; if (v) q.visual = v; return q; };
  const tyG = items => () => { const it = pick(items); const [t, a, v, s] = it; const q = { text: t, textInput: true, answer: a, it }; if (v) q.visual = v; if (s) q.say = s; return q; };
  const tyS = items => tyG(items.map(([t, a]) => [t, a, "", a]));
  const tyH = (h1, ex) => [h1, q => info(q.answer), ex];
  const blankG = (items, opts) => () => {
    const it = pick(items), [w, e, a] = it;
    const q = { text: `Fill the gap: <b>${gap(w, a)}</b>`, say: w, choices: shuf([a, ...shuf(opts.filter(o => o !== a)).slice(0, 2)]), answer: a, it };
    if (e) q.visual = e;
    return q;
  };
  const rightG = items => () => {
    const it = pick(items), [r, w, v] = it;
    const q = { text: "Which one is spelled correctly?", say: r, choices: shuf([r, ...shuf(w).slice(0, 2)]), answer: r, it };
    if (v) q.visual = v;
    return q;
  };
  const sentG = items => () => { const it = pick(items), [t, a, d] = it; return { text: t.replace("___", "<b>___</b>"), choices: shuf([a, ...shuf(d).slice(0, 2)]), answer: a, it }; };
  const dictG = items => items.map(([w, s]) => [`Listen and spell the missing word: ${s.replace("___", "<b>___</b>")}`, w, "", w]);
  const meaningG = (items, pool, label) => () => {
    const it = pick(items), [word, part, mean] = it;
    return { text: `The word <b>${word}</b> has the ${label} <b>${part}</b>. What does it mean?`, choices: shuf([mean, ...shuf(pool.filter(m => m !== mean)).slice(0, 2)]), answer: mean, it };
  };
  const prefG = (items, pool) => () => {
    const it = pick(items), [p, w, m] = it;
    return { text: `What does the prefix <b>${p}</b> mean, as in <b>${w}</b>?`, choices: shuf([m, ...shuf(pool.filter(x => x !== m)).slice(0, 2)]), answer: m, it };
  };
  const clueH = ex => ["Break the word into parts. One part carries the main meaning.", q => q.it[3], ex];
  const proofG = list => () => {
    const s = pick(list), wrong = s.match(/\[(\w+)\]/)[1], clean = s.replace(/[\[\]]/g, "");
    const good = [...new Set(clean.replace(/[.,]/g, "").split(" ").filter(w => w.length > 3 && w !== wrong))];
    return { text: `Which word is spelled wrong?<br><b>${clean}</b>`, choices: shuf([wrong, ...shuf(good).slice(0, 2)]), answer: wrong, it: [wrong] };
  };
  const proofH = ex => ["Read the sentence slowly, one word at a time. Do not read ahead.", "Look for a word with a missing, extra or swapped letter. The wrong word is one that you can fix by changing a letter or two.", ex];
  const dictHints = ex => ["Press the speaker and listen. Say the word in parts, then write each part.", q => info(q.answer) + " Say it in parts and write each one.", ex];
  const dictSlides = (a, b) => [S("Spell in parts", a, "Break a long word into syllables and spell one part at a time."), S("Tricky spots", b, "Look for double letters, silent letters and parts that do not sound the way they are spelled."), S("Check", "✅", "After you write it, read your word and compare it to what you heard.")];
  const sentHints = ex => ["Read the sentence. Think about what the missing word means.", "These words sound alike but are spelled differently. Match the meaning to the sentence.", ex];
  const misH = ex => ["Say each choice slowly. Look for missing, extra or swapped letters in the middle of the word.", q => info(q.answer), ex];
  const misSlides = (a, b) => [S("Tricky words", "✏️", "Some words are hard because of double letters, silent letters or letters that sound like others."), S("Look closely", a, "Check the middle of the word. That is where most mistakes hide."), S("Learn by parts", b, "Split the word into chunks and say each one, even the silent letters, as you spell.")];

  // ================= LEVEL 13 =================
  const ROOT6 = [
    ["dentist", "dent", "tooth", "You visit this person to keep your smile healthy."],
    ["cardiology", "cardi", "heart", "Doctors in this field look after a body part that beats all day long."],
    ["corporation", "corp", "body", "It is a large group of people working together like one team."],
    ["fracture", "fract", "break", "A doctor sees this on an X-ray when a bone is cracked."],
    ["translucent", "luc", "light", "Frosted glass is like this: some of it shines through, but you cannot see clearly."],
    ["animate", "anim", "life", "Cartoon makers do this to a drawing so that it can move and play."],
    ["inspire", "spir", "breathe", "A great speech can do this to a crowd, like filling them with fresh air."],
    ["section", "sect", "cut", "Each slice of an orange is one of these."],
    ["durable", "dur", "last", "A sturdy backpack that survives years of school is this."]
  ];
  const ROOT6POOL = ["tooth", "heart", "body", "break", "light", "life", "breathe", "cut", "last"];
  const rootRevG = () => {
    const it = pick(ROOT6), [w, , m] = it;
    const others = shuf(ROOT6.filter(r => r[0] !== w)).slice(0, 2).map(r => r[0]);
    return { text: `Which word is built on a root that means <b>${m}</b>?`, choices: shuf([w, ...others]), answer: w, it };
  };
  const PREF13 = [["ultra-", "ultraviolet", "beyond"], ["ultra-", "ultrasound", "beyond"], ["retro-", "retrospect", "backward"], ["retro-", "retroactive", "backward"], ["peri-", "perimeter", "around"], ["peri-", "periscope", "around"], ["syn-", "synchronize", "together"], ["sym-", "symphony", "together"], ["pan-", "panorama", "all"], ["pan-", "panoramic", "all"]];
  const PREF13POOL = ["beyond", "backward", "around", "together", "all"];
  const SUF13 = [
    ["biology", "-ology", "study of", "A biologist learns all about living things."],
    ["geology", "-ology", "study of", "A geologist learns about rocks and mountains."],
    ["claustrophobia", "-phobia", "fear of", "Someone who has this dislikes tiny, closed-in rooms a lot."],
    ["arachnophobia", "-phobia", "fear of", "Someone who has this gets very upset when a spider appears."],
    ["optimism", "-ism", "a belief, quality or practice", "An optimist always hopes for the best."],
    ["heroism", "-ism", "a belief, quality or practice", "Brave rescuers show this."],
    ["musician", "-ician", "a person skilled in a job or art", "She plays the violin in a concert for a living."],
    ["electrician", "-ician", "a person skilled in a job or art", "He fixes the wires in your walls."],
    ["trainee", "-ee", "a person who receives the action", "Someone being taught on the job is this."],
    ["employee", "-ee", "a person who receives the action", "A shop owner hires her, and she works there."],
    ["homeward", "-ward", "in the direction of", "Turning your bike this way means heading to where you live."],
    ["skyward", "-ward", "in the direction of", "Birds flying up are heading this way."]
  ];
  const SUF13POOL = ["study of", "fear of", "a belief, quality or practice", "a person skilled in a job or art", "a person who receives the action", "in the direction of"];
  const NADJ = [["nation", "national"], ["danger", "dangerous"], ["athlete", "athletic"], ["attract", "attractive"], ["music", "musical"], ["mystery", "mysterious"], ["history", "historic"], ["create", "creative"], ["fame", "famous"], ["person", "personal"], ["poison", "poisonous"], ["volcano", "volcanic"], ["environment", "environmental"], ["compete", "competitive"]].map(([n, a]) => [`Make an adjective from the noun <b>${n}</b>.`, a]);
  const HOMO10 = [["The town ___ voted to build a park.", "council", ["counsel"]], ["The lawyer gave her client wise ___.", "counsel", ["council"]], ["The bike stayed ___ while the wheels were locked.", "stationary", ["stationery"]], ["I bought paper and envelopes at the ___ shop.", "stationery", ["stationary"]], ["A fence marks the ___ between two yards.", "border", ["boarder"]], ["The ___ rented a room in our house.", "boarder", ["border"]], ["A squirrel will ___ nuts for winter.", "hoard", ["horde"]], ["A ___ of fans rushed to the stage.", "horde", ["hoard"]], ["She won a gold ___ at the race.", "medal", ["meddle"]], ["Please do not ___ in other people's business.", "meddle", ["medal"]], ["We shopped at the busy ___.", "bazaar", ["bizarre"]], ["The costume looked strange and ___.", "bizarre", ["bazaar"]], ["Be ___ when you are told a secret.", "discreet", ["discrete"]], ["The blocks were ___ pieces, not joined together.", "discrete", ["discreet"]], ["The senators met at the ___ building.", "capitol", ["capital"]], ["Paris is the ___ of France.", "capital", ["capitol"]], ["The climbers began their ___ of the mountain.", "ascent", ["assent"]], ["She nodded in ___ to show she agreed.", "assent", ["ascent"]], ["The medicine will ___ the pain.", "lessen", ["lesson"]], ["Today's ___ was about fractions.", "lesson", ["lessen"]]];
  const MIS13 = [["calendar", ["calender", "calandar"]], ["restaurant", ["restraunt", "resteraunt"]], ["library", ["libary", "librery"]], ["February", ["Febuary", "Febrary"]], ["recommend", ["reccommend", "recomend"]], ["surprise", ["suprise", "surprize"]], ["immediately", ["immediatly", "imediately"]], ["disappear", ["dissapear", "disapear"]], ["privilege", ["priviledge", "privelege"]], ["lightning", ["lightening", "lightnning"]], ["achievement", ["acheivement", "achievment"]], ["exercise", ["excercise", "exersise"]], ["knowledge", ["knowlege", "knoledge"]]];
  const SCHWA = [["elephant", "🐘", "a"], ["pencil", "✏️", "i"], ["lemon", "🍋", "o"], ["family", "👪", "i"], ["animal", "🐾", "a"], ["problem", "", "e"], ["button", "🔘", "o"], ["different", "", "e"], ["pilot", "✈️", "o"], ["garden", "🌷", "e"], ["tunnel", "🚇", "e"], ["hospital", "🏥", "a"], ["melody", "🎵", "o"]];
  const CAPS = [["Our class went to the lake on tuesday.", "tuesday", ["lake", "class"]], ["My aunt flew to canada last week.", "canada", ["aunt", "week"]], ["In march, the snow finally melted.", "march", ["snow", "finally"]], ["She speaks french at home with her grandmother.", "french", ["home", "grandmother"]], ["My friend sam has a puppy.", "sam", ["friend", "puppy"]], ["We celebrate thanksgiving with a big dinner.", "thanksgiving", ["celebrate", "dinner"]], ["The river flows through egypt to the sea.", "egypt", ["river", "sea"]], ["My best friend moved to texas.", "texas", ["friend", "moved"]], ["Our teacher gave us homework on friday.", "friday", ["teacher", "homework"]], ["My cousin ava loves to draw.", "ava", ["cousin", "draw"]], ["Do you celebrate halloween at your school?", "halloween", ["celebrate", "school"]], ["We learned about the sun and jupiter in science.", "jupiter", ["sun", "science"]]].map(([t, a, d]) => [`Which word needs a capital letter?<br><b>${t}</b>`, a, d]);
  const COMP = [["a spinning carnival ride with horses", "with a hyphen", "🎠", "merry go round"], ["the school after middle school", "as two words", "", "high school"], ["a frozen dessert", "as two words", "🍦", "ice cream"], ["a book where you write notes", "as one word", "📓", "notebook"], ["a shirt shaped like a T", "with a hyphen", "👕", "tee shirt"], ["the place where we mail a letter", "as two words", "📮", "post office"], ["the room where we sit and watch TV", "as two words", "", "living room"], ["a piece of furniture with shelves for books", "as one word", "", "bookcase"], ["a glowing bug on summer nights", "as one word", "✨", "firefly"], ["a tall yellow flower that follows the sun", "as one word", "🌻", "sunflower"], ["the mother of your husband or wife", "with a hyphen", "", "mother in law"], ["a sport played with bats and bases", "as one word", "⚾", "baseball"], ["the phrase that means very many", "as two words", "", "a lot"]];
  const compG = () => { const it = pick(COMP), [d, a, v, s] = it; const q = { text: `How is the word for <b>${d}</b> usually written?`, choices: shuf(["as one word", "as two words", "with a hyphen"]), answer: a, say: s, it }; if (v) q.visual = v; return q; };
  const MYTH = [
    ["The word <b>cereal</b> comes from Ceres, a Roman goddess of grain. What is a cereal today?", "a breakfast food made from grain", ["a kind of soup", "a sweet drink"]],
    ["The word <b>volcano</b> comes from Vulcan, the Roman god of fire. What is a volcano?", "a mountain that can erupt with hot lava", ["a deep cave in the sea", "a river in the desert"], "🌋"],
    ["The word <b>museum</b> comes from the Muses, goddesses of the arts. What is a museum?", "a place that keeps and shows art and objects", ["a store for toys", "a place where trains stop"], "🏛️"],
    ["The word <b>panic</b> comes from Pan, a Greek god of the woods whose sudden shout scared travelers. What is panic?", "sudden strong fear", ["a happy surprise", "a long nap"]],
    ["The word <b>echo</b> comes from a nymph named Echo, who could only repeat words. What is an echo?", "a sound that bounces back", ["a loud drum", "a quiet song"], "🗣️"],
    ["The word <b>atlas</b> comes from Atlas, a Titan who held up the sky. What is an atlas?", "a book of maps", ["a book of jokes", "a kind of ladder"], "🗺️"],
    ["The month <b>January</b> comes from Janus, the Roman god of doors and beginnings. Which month is it?", "the first month of the year", ["the last month of the year", "the shortest month"]],
    ["The word <b>titanic</b> comes from the Titans, giants in Greek myths. What does titanic mean?", "huge and powerful", ["tiny and weak", "quiet and calm"]],
    ["The word <b>odyssey</b> comes from a Greek story about the hero Odysseus. What is an odyssey today?", "a long adventurous journey", ["a short nap", "a quick snack"], "⛵"]
  ];
  const ANALOG = [
    ["<b>Hot</b> is to <b>cold</b> as <b>up</b> is to ___.", "down", ["over", "high"]],
    ["<b>Bird</b> is to <b>nest</b> as <b>bee</b> is to ___.", "hive", ["honey", "flower"]],
    ["<b>Pen</b> is to <b>write</b> as <b>knife</b> is to ___.", "cut", ["sharp", "kitchen"]],
    ["<b>Finger</b> is to <b>hand</b> as <b>toe</b> is to ___.", "foot", ["shoe", "leg"]],
    ["<b>Paw</b> is to <b>cat</b> as <b>hoof</b> is to ___.", "horse", ["dog", "bird"]],
    ["<b>Author</b> is to <b>book</b> as <b>painter</b> is to ___.", "painting", ["brush", "museum"]],
    ["<b>Teacher</b> is to <b>school</b> as <b>doctor</b> is to ___.", "hospital", ["medicine", "patient"]],
    ["<b>Angry</b> is to <b>furious</b> as <b>cold</b> is to ___.", "freezing", ["warm", "winter"]],
    ["<b>Calf</b> is to <b>cow</b> as <b>foal</b> is to ___.", "horse", ["sheep", "goat"]],
    ["<b>Sunrise</b> is to <b>morning</b> as <b>sunset</b> is to ___.", "evening", ["noon", "dawn"]]
  ];
  const HETERO = [
    ["The shop is <b>close</b> to my house. What does <b>close</b> mean here?", "near", ["to shut", "far away"]],
    ["She will <b>wind</b> the clock every night. What does <b>wind</b> mean here?", "to turn or twist", ["air moving outside", "a loud sound"]],
    ["He put a <b>bow</b> on the gift. What does <b>bow</b> mean here?", "a ribbon tied in loops", ["to bend forward", "the front of a ship"]],
    ["The actor will <b>bow</b> at the end. What does <b>bow</b> mean here?", "to bend forward to show respect", ["a ribbon tied in loops", "a tool for shooting arrows"]],
    ["A <b>tear</b> ran down her cheek. What does <b>tear</b> mean here?", "a drop from the eye", ["to rip", "a hole"]],
    ["Do not <b>tear</b> the paper. What does <b>tear</b> mean here?", "to rip", ["a drop from the eye", "to fold"]],
    ["A <b>bass</b> swam in the lake. What does <b>bass</b> mean here?", "a kind of fish", ["a low sound or instrument", "a kind of boat"]],
    ["He plays the <b>bass</b> in the band. What does <b>bass</b> mean here?", "a low-sounding instrument", ["a kind of fish", "a loud whistle"]],
    ["The <b>lead</b> pipe was heavy. What does <b>lead</b> mean here?", "a soft, heavy metal", ["to guide", "first place"]],
    ["She will <b>lead</b> us to the park. What does <b>lead</b> mean here?", "to guide", ["a soft, heavy metal", "to follow behind"]],
    ["The <b>refuse</b> was taken away on Monday. What does <b>refuse</b> mean here?", "trash", ["to say no", "a party"]],
    ["The swimmer <b>dove</b> into the pool. What does <b>dove</b> mean here?", "jumped in headfirst", ["a white bird", "floated on top"]]
  ];
  const VERBS = [
    ["A cat ___ across the roof, moving slowly and quietly.", "crept", ["stomped", "galloped"]],
    ["The tired hikers ___ up the hill, one slow step at a time.", "trudged", ["sprinted", "skipped"]],
    ["The little brother ___ happily down the hall, bouncing along.", "skipped", ["trudged", "crawled"]],
    ["The thunder ___ across the sky.", "rumbled", ["whispered", "tinkled"]],
    ["He ___ the answer so quietly that only his friend could hear.", "whispered", ["shouted", "bellowed"]],
    ["The crowd ___ when the team scored.", "cheered", ["muttered", "grumbled"]],
    ["The cook ___ the vegetables into tiny pieces.", "chopped", ["poured", "stirred"]],
    ["He ___ the heavy box across the floor.", "dragged", ["tossed", "tapped"]],
    ["The rabbit ___ into its burrow in a hurry.", "dashed", ["strolled", "drifted"]],
    ["The river ___ gently through the quiet valley.", "meandered", ["charged", "crashed"]]
  ];
  const PREFOPP = [["unhappy", "😞", "un"], ["disagree", "", "dis"], ["misspell", "✏️", "mis"], ["nonsense", "", "non"], ["unfair", "", "un"], ["dislike", "👎", "dis"], ["misplace", "", "mis"], ["disappear", "", "dis"], ["unlock", "🔓", "un"], ["mislead", "", "mis"], ["dishonest", "", "dis"], ["unusual", "", "un"], ["nonfiction", "📚", "non"], ["misbehave", "", "mis"]];
  const SYLL = [["pumpkin", "pump·kin", ["pum·pkin", "pumpk·in"], "🎃"], ["river", "riv·er", ["ri·ver", "rive·r"], "🏞️"], ["napkin", "nap·kin", ["na·pkin", "napk·in"]], ["tiger", "ti·ger", ["tig·er", "tige·r"], "🐯"], ["robot", "ro·bot", ["rob·ot", "robo·t"], "🤖"], ["planet", "plan·et", ["pla·net", "plane·t"], "🪐"], ["seven", "sev·en", ["se·ven", "seve·n"]], ["basket", "bas·ket", ["ba·sket", "bask·et"], "🧺"], ["music", "mu·sic", ["mus·ic", "musi·c"], "🎵"], ["paper", "pa·per", ["pap·er", "pape·r"], "📄"], ["window", "win·dow", ["wi·ndow", "wind·ow"], "🪟"]];
  const syllG = () => {
    const it = pick(SYLL), others = shuf(SYLL.filter(x => x[0] !== it[0])).slice(0, 2);
    const q = { text: "Which word is split into syllables correctly?", choices: shuf([it[1], ...others.map(o => pick(o[2]))]), answer: it[1], it };
    return q;
  };
  const PROOF13 = ["I will [recieve] my prize on Friday.", "Please protect the [enviroment] for our future.", "He will [probaly] come to the party.", "My [freind] lives across the street.", "It was a [truely] wonderful show.", "This is only a [temporery] sign.", "The teacher gave us a [diffrent] book.", "The whole school met in the [assambly] hall.", "The [tomorow] forecast says rain.", "We saw a [beautifull] sunset.", "Her [favourate] color is blue.", "The [intresting] story kept everyone listening."];
  const DICT13 = dictG([["calendar", "Mark the date on the ___."], ["environment", "We must protect the ___."], ["restaurant", "We ate dinner at a ___."], ["occasion", "A birthday is a special ___."], ["competition", "She won the spelling ___."], ["equipment", "The team keeps its ___ in a shed."], ["guarantee", "The shop gave a ___ with the toy."], ["privilege", "It is a ___ to help the class."], ["vegetable", "Carrots are a healthy ___."], ["original", "Her story was fresh and ___."], ["committee", "The ___ planned the school fair."], ["interrupt", "Please do not ___ when I speak."]]);

  const A13 = [
    L("Word roots 6", meaningG(ROOT6, ROOT6POOL, "root"),
      clueH("Example: the root <b>ped</b> means <b>foot</b>, as in <i>pedal</i>. Find the meaning of yours the same way."),
      [S("Body roots", "dent · cardi · corp", "<b>dent</b> = tooth (dentist), <b>cardi</b> = heart (cardiology), <b>corp</b> = body (corporation)."), S("Action roots", "fract · spir · sect", "<b>fract</b> = break (fracture), <b>spir</b> = breathe (inspire), <b>sect</b> = cut (section)."), S("More roots", "luc · anim · dur", "<b>luc</b> = light (translucent), <b>anim</b> = life (animate), <b>dur</b> = last (durable).")]),
    L("Words from roots", rootRevG,
      ["Think about the meaning in the question. Which word could be part of that word family?", "Say each word and think about what it is about. A root is a small part hidden inside a word.", "Example: the root <b>aud</b> means hear, so <b>audio</b> belongs to that family and <b>garden</b> does not. Check your choices the same way."],
      [S("Word families", "👪", "Words with the same root belong to one family and share a meaning."), S("Work backward", "dent ➜ dentist", "If you know the meaning of a root, you can find the family: tooth ➜ <b>dentist</b>, break ➜ <b>fracture</b>."), S("Spelling help", "💡", "Knowing the root helps you spell too: <b>section</b> and <b>dissect</b> both keep <b>sect</b>.")]),
    L("Prefixes ultra-, retro-, peri-, syn- and pan-", prefG(PREF13, PREF13POOL),
      ["Break the word into the prefix and the rest of the word. What does the rest of the word mean?", "Think of a real object or idea the word names, and how the prefix changes it.", "Example: <b>submarine</b> goes under the sea, so the prefix <b>sub-</b> means under. Use the same method for yours."],
      [S("Beyond and back", "ultra- · retro-", "<b>ultra-</b> means beyond (ultraviolet). <b>retro-</b> means backward (retrospect, retroactive)."), S("Around and together", "peri- · syn- · sym-", "<b>peri-</b> means around (perimeter). <b>syn-</b> and <b>sym-</b> mean together (synchronize, symphony)."), S("All", "pan-", "<b>pan-</b> means all: a <b>panorama</b> is a view of everything around you.")]),
    L("Suffix meanings", meaningG(SUF13, SUF13POOL, "ending"),
      ["Cover the ending. What does the first part of the word tell you? Then think about what the ending adds.", q => q.it[3], "Example: <b>-less</b> means without, so <b>careless</b> means without care. Use the ending the same way."],
      [S("Subjects and fears", "-ology · -phobia", "<b>-ology</b> means study of (biology). <b>-phobia</b> means fear of (claustrophobia)."), S("People and ideas", "-ism · -ician · -ee", "<b>-ism</b> is a belief or practice (optimism). <b>-ician</b> is a skilled person (musician). <b>-ee</b> is a person who receives the action (employee)."), S("Direction", "-ward", "<b>-ward</b> means in the direction of: <b>homeward</b>, <b>skyward</b>, <b>forward</b>.")]),
    L("Noun to adjective", tyG(NADJ.map(([t, a]) => [t, a, "", a])),
      tyH("The adjective ends in -al, -ous, -ic or -ive. Think about which ending sounds right for the noun.", "Example: <b>science</b> ➜ <b>scientific</b> and <b>brain</b> ➜ <b>brainy</b>. Watch for letters that drop off or change. Now do yours."),
      [S("Make adjectives", "nation ➜ national", "An <b>adjective</b> describes a noun. Many are made by adding <b>-al</b>, <b>-ous</b>, <b>-ic</b> or <b>-ive</b>."), S("Letters change", "danger ➜ dangerous", "Sometimes a letter drops: <b>fame</b> ➜ <b>famous</b>, <b>create</b> ➜ <b>creative</b>."), S("Say it out loud", "🗣️", "Say the word to hear the ending. Then check that your spelling has every sound.")]),
    L("Homophones 10", sentG(HOMO10),
      sentHints("Example: 'I will <b>wait</b> here' and 'the <b>weight</b> of a box'. Decide which meaning your sentence needs."),
      [S("Same sound", "council · counsel", "A <b>council</b> is a group that makes decisions. <b>Counsel</b> is advice."), S("More pairs", "stationary · stationery", "<b>Stationary</b> means not moving. <b>Stationery</b> is paper and envelopes: it has an <b>e</b> like <b>envelope</b>."), S("Tip", "💡", "Make up a quick meaning for each word and test the sentence.")]),
    L("Commonly misspelled words", rightG(MIS13),
      misH("Example: <b>Wednesday</b> has a silent d and <b>government</b> has an n before the m. Check the middle of yours."),
      misSlides("cal·en·dar · res·tau·rant", "Feb·ru·ar·y · im·me·di·ate·ly")),
    L("The hidden schwa", blankG(SCHWA, ["a", "e", "i", "o", "u"]),
      ["In some words a vowel in a weak syllable sounds like a lazy 'uh'. Say the word slowly and clearly.", q => `The whole word has ${q.it[0].length} letters. Try each vowel in the gap.`, "Example: say <b>cap-i-tal</b> and <b>nick-el</b> in a slow way to hear which vowel hides in the 'uh' part. Do the same for yours."],
      [S("The lazy vowel", "ə", "Many weak syllables have an 'uh' sound called the <b>schwa</b>. Any vowel can make it."), S("Which letter?", "lem·on · pen·cil", "In <b>lemon</b> it is an <b>o</b>, and in <b>pencil</b> it is an <b>i</b>. You cannot hear the difference, so you must remember."), S("Trick", "🗣️", "Say the word in a silly, slow way, like <b>pen-SIL</b> or <b>lem-ON</b>, to hear the real vowel.")]),
    L("Capital letters", mcG(CAPS),
      ["Read the sentence. Look for the name of a special person, place, day, month, holiday or language.", "Everyday nouns like lake and teacher stay small. The name of one particular person, place or day gets a capital.", "Example: in 'Our trip to italy was fun', <b>italy</b> needs a capital because it is the name of a country."],
      [S("Always capital", "Sam · Paris · Monday", "Capitalize names of <b>people, places, days, months, holidays and languages</b>."), S("Stay small", "winter · lake · mom", "Seasons stay small. Words like <b>lake</b> and <b>school</b> stay small unless part of a name. <b>Mom</b> is capital only when used as a name."), S("Titles and quotes", "Dr. Lee · \"Hello,\" said Mia.", "A title before a name is capital (Dr. Lee). The first word of a quotation is capital too.")]),
    L("One word, two words or a hyphen?", compG,
      ["Some compound words are one word, some are two words and some use hyphens. Think about how you see it in books.", "Picture the word on a sign or in a book. Was it joined, spaced or linked with a dash?", "Example: <b>mailbox</b> is one word, <b>fire station</b> is two words and <b>runner-up</b> has a hyphen."],
      [S("Three kinds", "snowball · hot dog · runner-up", "A compound can be <b>closed</b> (snowball), <b>open</b> (hot dog) or <b>hyphenated</b> (runner-up)."), S("Check a dictionary", "📖", "There is no easy rule. A dictionary shows you which one is right."), S("Often confused", "every day · everyday", "<b>Every day</b> (two words) means each day. <b>Everyday</b> (one word) means ordinary. <b>A lot</b> is always two words.")]),
    L("Words from myths", mcG(MYTH),
      ["Think about what the god, goddess or hero in the question was known for.", "The meaning today is still linked to the old story. Look for the choice that matches the story.", "Example: <b>hygiene</b> comes from Hygieia, a Greek goddess of health, so it means keeping clean and healthy."],
      [S("Old stories", "🏛️", "Many English words come from the names of gods and heroes in Greek and Roman myths."), S("Examples", "cereal · volcano", "<b>Cereal</b> from Ceres (grain). <b>Volcano</b> from Vulcan (fire). <b>Museum</b> from the Muses (arts)."), S("Months too", "January", "<b>January</b> comes from Janus, the Roman god of doors and beginnings.")]),
    L("Word analogies", mcG(ANALOG),
      ["Find how the first two words are connected, then use the same link for the second pair.", "Say the link in a sentence, like 'A ___ is the opposite of a ___' or 'A ___ lives in a ___'.", "Example: <b>Wheel</b> is to <b>car</b> as <b>wing</b> is to <b>airplane</b>, because each is a part of the whole. Find your link first."],
      [S("What is an analogy?", "A : B :: C : D", "An <b>analogy</b> says two pairs of words are linked in the same way."), S("Kinds of links", "opposite · part · home", "Links can be <b>opposites</b> (hot : cold), <b>part and whole</b> (page : book) or <b>animal and home</b> (bird : nest)."), S("Try it", "🔗", "Say the link out loud: 'a toe is part of a ___'. Then fill the gap.")]),
    L("Same spelling, new sound", mcG(HETERO),
      ["Some words are spelled the same but sound different and mean different things.", "Read the whole sentence. What is the word doing in the sentence?", "Example: in 'The <b>row</b> of seats' row means a line, but in 'Let's <b>row</b> the boat' it means to paddle."],
      [S("Two words in one", "tear · tear", "<b>Tear</b> (a drop from the eye) and <b>tear</b> (to rip) are spelled alike but sound different."), S("The sentence tells", "wind · wind", "A <b>wind</b> blows. You <b>wind</b> a clock. The rest of the sentence tells you which one."), S("Examples", "bass · lead · bow", "<b>bass</b> (fish) or (low sound), <b>lead</b> (metal) or (guide), <b>bow</b> (ribbon) or (bend).")]),
    L("Choose the strongest verb", mcG(VERBS),
      ["Think about how fast, how loud or how strong the action is in the sentence.", "Picture the scene. Cross out words that do not match the mood.", "Example: a bear moving heavily through the forest <b>lumbered</b>, while a hummingbird <b>zipped</b>. Pick the verb that matches the scene."],
      [S("Precise verbs", "walk ➜ trudge", "A strong verb shows exactly how something happens: <b>trudge</b> shows heavy, tired steps."), S("Match the mood", "creep · dash · stroll", "<b>Creep</b> is quiet and slow. <b>Dash</b> is quick. <b>Stroll</b> is relaxed."), S("Better writing", "✍️", "Pick one exact verb instead of a plain verb plus extra words.")]),
    L("Prefixes un-, dis-, mis-, non-", blankG(PREFOPP, ["un", "dis", "mis", "non"]),
      ["A prefix at the front can change a word to mean 'not' or 'wrongly'. Say the word with each prefix.", q => `The whole word has ${q.it[0].length} letters. Which prefix makes a real word?`, "Example: <b>__connected</b> takes <b>dis</b> (disconnected) and <b>__aware</b> takes <b>un</b> (unaware). Now do yours."],
      [S("Not", "un- · dis- · non-", "<b>un-</b>, <b>dis-</b> and <b>non-</b> often mean not: unhappy, dislike, nonsense."), S("Wrongly", "mis-", "<b>mis-</b> means wrongly or badly: misspell, mislead, misplace."), S("Test it", "🔍", "Each base word likes one prefix. Say it with each prefix and keep the one that sounds real.")]),
    L("Dividing words into syllables", syllG,
      ["Each syllable has one vowel sound. Say the word and clap the beats.", "Look at the letters between the two vowels. How many consonants are there, and where would you cut?", "Example: <b>rabbit</b> splits <b>rab·bit</b> (two consonants, cut between them) and <b>pilot</b> splits <b>pi·lot</b> (one consonant, cut before it)."],
      [S("Count the beats", "pump·kin", "A <b>syllable</b> is a beat with one vowel sound. <b>Pumpkin</b> has two."), S("Two consonants", "nap·kin", "When two consonants sit between two vowels, cut <b>between</b> them: nap·kin, bas·ket."), S("One consonant", "ti·ger · plan·et", "With one consonant, try cutting before it (<b>ti·ger</b>). If that sounds wrong, cut after it (<b>plan·et</b>).")]),
    L("Proofreading 3", proofG(PROOF13),
      proofH("Example: 'The <b>teecher</b> smiled' ➜ 'teecher' should be 'teacher'. Check each word like that."),
      [S("Be a word detective", "🕵️", "A proofreader finds spelling mistakes before anyone else sees them."), S("How to do it", "👀", "Read slowly. Point at each word. Ask: does this look right?"), S("Fix it", "✏️", "Think of how the word should look, then check the middle and the end.")]),
    L("Listen and spell 9", tyG(DICT13),
      dictHints("Example: 'adventure' = ad + ven + ture. Write each part, then check the whole word."),
      dictSlides("cal·en·dar", "equip·ment · com·mit·tee"))
  ];
  A13.push(MIX("Mixed practice", [A13[0], A13[2], A13[3], A13[5], A13[7], A13[12]]));
  A13.push(MIX("Level 13 Challenge", [A13[1], A13[4], A13[6], A13[8], A13[10], A13[11], A13[14], A13[15], A13[17]]));

  // ================= LEVEL 14 =================
  const ROOT7 = [
    ["native", "nat", "born", "A person who is this to a country first came into the world there."],
    ["metamorphosis", "morph", "shape", "A caterpillar goes through this big change of form into a butterfly."],
    ["generation", "gen", "family or kind", "Your grandparents, parents and you are three of these."],
    ["philosophy", "phil", "love", "Its name comes from Greek words for caring deeply about wisdom."],
    ["anthropology", "anthrop", "human", "People who study this learn how societies live and what they make."],
    ["psychology", "psych", "mind", "Experts in this field study thinking, feelings and behavior."],
    ["herbivore", "vor", "eat", "A cow is one, because it feeds only on plants."],
    ["factory", "fact", "make", "Cars and toys are produced here in big numbers."]
  ];
  const ROOT7POOL = ["born", "shape", "family or kind", "love", "human", "mind", "eat", "make"];
  const PREF14 = [["ab-", "absent", "away"], ["ab-", "abnormal", "away"], ["dia-", "diameter", "across"], ["dia-", "diagonal", "across"], ["para-", "parallel", "beside"], ["para-", "paramedic", "beside"], ["epi-", "epicenter", "upon or on top of"], ["epi-", "epidermis", "upon or on top of"], ["per-", "perspire", "through"], ["per-", "perforate", "through"], ["se-", "separate", "apart"], ["se-", "seclude", "apart"]];
  const PREF14POOL = ["away", "across", "beside", "upon or on top of", "through", "apart"];
  const LATIN = [["e.g.", "for example", ["that is", "and so on"]], ["i.e.", "that is", ["for example", "and so on"]], ["etc.", "and so on", ["for example", "after noon"]], ["a.m.", "before noon", ["after noon", "at midnight"]], ["p.m.", "after noon", ["before noon", "at dawn"]], ["vs.", "against", ["with", "before"]], ["P.S.", "a note added after the letter", ["please send", "a title for a boss"]], ["N.B.", "note well (pay special attention)", ["no bags allowed", "next block"]]].map(([a, m, d]) => [`What does the short form <b>${a}</b> mean?`, m, d]);
  const HOMO11 = [["Please ___ your sources in the report.", "cite", ["site", "sight"]], ["The building ___ is huge.", "site", ["cite", "sight"]], ["The mountain view was a wonderful ___.", "sight", ["cite", "site"]], ["The wind turned the weather ___ on the barn.", "vane", ["vain", "vein"]], ["The nurse found a ___ in my arm.", "vein", ["vain", "vane"]], ["The peacock was too ___ to stop looking at itself.", "vain", ["vein", "vane"]], ["We heard the ___ of the bells.", "peal", ["peel"]], ["Please ___ the orange for me.", "peel", ["peal"]], ["The little boat floated on the ___.", "tide", ["tied"]], ["She ___ her shoes in a double knot.", "tied", ["tide"]], ["The king sat on his ___.", "throne", ["thrown"]], ["The ball was ___ over the fence.", "thrown", ["throne"]], ["A ___ of lions rested in the shade.", "pride", ["pried"]], ["He ___ the lid off the jar.", "pried", ["pride"]], ["The ___ of the story was a secret.", "plot", ["plod"]], ["She will ___ along the muddy road.", "plod", ["plot"]], ["The rain made the path ___.", "slippery", ["slipery"]]].filter(x => x[2][0] !== "slipery");
  const MIS14 = [["calendar", ["calender", "calandar"]], ["separate", ["seperate", "separete"]], ["definitely", ["definately", "definitly"]], ["necessary", ["neccessary", "necesary"]], ["government", ["goverment", "govenment"]], ["Wednesday", ["Wensday", "Wedensday"]], ["different", ["diffrent", "diferent"]], ["interesting", ["intresting", "interesing"]], ["beautiful", ["beutiful", "beautifull"]], ["tomorrow", ["tommorow", "tomorow"]], ["favorite", ["favorit", "favourate"]], ["people", ["peaple", "peopel"]], ["because", ["becuase", "becouse"]], ["quiet", ["quite", "quiat"]]].filter(x => x[0] !== "calendar" && x[0] !== "tomorrow" && x[0] !== "quiet");
  const CPLUR = [["mother-in-law", "mothers-in-law", ["mother-in-laws", "mothers-in-laws"]], ["runner-up", "runners-up", ["runner-ups", "runners-ups"]], ["passerby", "passersby", ["passerbys", "passersbys"]], ["brother-in-law", "brothers-in-law", ["brother-in-laws", "brothers-in-laws"]], ["sister-in-law", "sisters-in-law", ["sister-in-laws", "sisters-in-laws"]], ["spoonful", "spoonfuls", ["spoonsful", "spoonfuless"]], ["cupful", "cupfuls", ["cupsful", "cupfules"]], ["handful", "handfuls", ["handsful", "handfulls"]], ["toothbrush", "toothbrushes", ["toothbrushs", "teethbrushes"]], ["by-product", "by-products", ["bys-product", "by-productes"]]].map(([s, a, d]) => [`What is the plural of <b>${s}</b>?`, a, d]);
  const JOINP = [["un + necessary", "unnecessary"], ["dis + satisfy", "dissatisfy"], ["mis + spell", "misspell"], ["il + legal", "illegal"], ["im + mature", "immature"], ["ir + regular", "irregular"], ["ir + responsible", "irresponsible"], ["un + natural", "unnatural"], ["dis + service", "disservice"], ["mis + step", "misstep"], ["il + logical", "illogical"], ["im + mortal", "immortal"], ["over + rule", "overrule"]].map(([p, a]) => [`Join the parts: <b>${p}</b>`, a]);
  const FORMAL = [["buy", "purchase", ["snag", "pick up"]], ["kids", "children", ["kiddos", "little guys"]], ["start", "commence", ["kick off", "get going"]], ["help", "assist", ["give a hand", "pitch in"]], ["tired", "fatigued", ["wiped out", "beat"]], ["ask", "inquire", ["shoot a question", "poke around"]], ["fix", "repair", ["patch up", "sort out"]], ["need", "require", ["gotta have", "want a lot"]], ["show", "demonstrate", ["flash", "pull out"]], ["end", "conclude", ["wrap up", "call it a day"]], ["hard", "difficult", ["tough", "rough"]]].map(([w, a, d]) => [`Which is the most formal way to say <b>${w}</b>?`, a, d]);
  const ADJN = [["wise", "wisdom"], ["proud", "pride"], ["strong", "strength"], ["long", "length"], ["young", "youth"], ["deep", "depth"], ["high", "height"], ["wide", "width"], ["safe", "safety"], ["brave", "bravery"], ["free", "freedom"], ["true", "truth"]].map(([a, n]) => [`Write the noun for the adjective <b>${a}</b>.`, n]);
  const IRR = [["seek", "sought"], ["bring", "brought"], ["teach", "taught"], ["catch", "caught"], ["lead", "led"], ["hide", "hid"], ["shake", "shook"], ["swing", "swung"], ["sweep", "swept"], ["build", "built"], ["feel", "felt"], ["forgive", "forgave"], ["creep", "crept"], ["deal", "dealt"], ["lend", "lent"], ["sting", "stung"]].map(([a, b]) => [`Write the past tense of <b>${a}</b>.`, b]);
  const NVSP = [["Please give me some good ___.", "advice", ["advise"]], ["I ___ you to wear a helmet.", "advise", ["advice"]], ["Take a deep ___.", "breath", ["breathe"]], ["Slowly ___ in and out.", "breathe", ["breath"]], ["The new ___ cleans the floor by itself.", "device", ["devise"]], ["We must ___ a plan.", "devise", ["device"]], ["I ___ in you.", "believe", ["belief"]], ["It was her ___ that kindness matters.", "belief", ["believe"]], ["Show me the ___.", "proof", ["prove"]], ["Can you ___ it?", "prove", ["proof"]], ["It is hard to ___ one.", "choose", ["choice"]], ["I made a good ___.", "choice", ["choose"]]];
  const PEOPLEW = ["braille", "diesel", "saxophone", "cardigan", "sandwich", "pasteurize", "leotard", "volt", "watt"];
  const PLACEW = ["cheddar", "hamburger", "marathon", "sardine", "denim", "tuxedo"];
  const PLAINW = ["table", "window", "garden", "pencil", "river", "button", "ticket", "castle"];
  const namedG = () => {
    const person = Math.random() < 0.6, a = pick(person ? PEOPLEW : PLACEW);
    return { text: `Which of these words was named after a <b>${person ? "person" : "place"}</b>?`, choices: shuf([a, ...shuf(PLAINW).slice(0, 2)]), answer: a, it: [a] };
  };
  const ACRO = [["ASAP", "as soon as possible", ["all students are present", "always stay at play"]], ["DIY", "do it yourself", ["did it yesterday", "dance in your yard"]], ["FAQ", "frequently asked questions", ["fast and quick", "find a quiet room"]], ["TBA", "to be announced", ["to be added", "time before arrival"]], ["ETA", "estimated time of arrival", ["every train arrives", "early time alert"]], ["UFO", "unidentified flying object", ["under the first ocean", "unknown fast orbit"]], ["NASA", "National Aeronautics and Space Administration", ["North American Science Academy", "National Astronomy and Star Association"]], ["SCUBA", "self-contained underwater breathing apparatus", ["swim carefully under blue water", "sea creature underwater base area"]], ["radar", "radio detection and ranging", ["rapid direction and recording", "radio data and reading"]]].map(([a, m, d]) => [`What does <b>${a}</b> stand for?`, m, d]);
  const FIG = [["The wind whispered through the trees.", "personification"], ["I have told you a million times!", "hyperbole"], ["The bees buzzed and the bacon sizzled.", "onomatopoeia"], ["Peter Piper picked a peck of pickled peppers.", "alliteration"], ["The sunflower danced in the breeze.", "personification"], ["I am so hungry I could eat a horse.", "hyperbole"], ["Boom! The balloon popped.", "onomatopoeia"], ["Silly snakes slither slowly.", "alliteration"], ["My backpack weighs a ton.", "hyperbole"], ["The old car coughed and groaned up the hill.", "personification"], ["Crash! The pan hit the floor.", "onomatopoeia"], ["Big blue balloons bounced by the bridge.", "alliteration"]];
  const FIGTYPES = ["personification", "hyperbole", "onomatopoeia", "alliteration"];
  const FIGCLUE = { personification: "Ask: is something that is not a person doing what a living person would do?", hyperbole: "Ask: is the sentence stretching the truth on purpose, so much that it could not really be true?", onomatopoeia: "Ask: which word in the sentence copies a sound?", alliteration: "Ask: do several words in the sentence begin with the same sound?" };
  const figG = () => { const it = pick(FIG), [t, a] = it; return { text: `What kind of figurative language is this?<br><b>${t}</b>`, choices: shuf([a, ...shuf(FIGTYPES.filter(x => x !== a)).slice(0, 2)]), answer: a, it }; };
  const TRICK = [["It has a rat in the middle.", "separate"], ["Think of pie: the word has 'pie' inside it.", "piece"], ["Never ___ a lie: the word has 'lie' inside it.", "believe"], ["One collar and two sleeves.", "necessary"], ["The word for a pal ends with 'end'.", "friend"], ["A piece of land surrounded by water. The s is silent and was added by mistake long ago.", "island"], ["Your pal at the head of the school has the 'pal' inside.", "principal"], ["If you want seconds of the sweet treat, you need two s's.", "dessert"], ["Paper for writing letters has 'er' in it, like 'letter' and 'paper'.", "stationery"], ["Great Elephants Often Go Rolling Along Playing Happy Yodels.", "geography"], ["A big hotel has room for two cots (cc) and two mattresses (mm).", "accommodate"], ["It has 'miss' and 'spell' inside.", "misspell"]];
  const TRICKWORDS = TRICK.map(x => x[1]);
  const trickG = () => { const it = pick(TRICK), [t, a] = it; return { text: `A memory trick says: <b>${t}</b><br>Which word does it help you spell?`, choices: shuf([a, ...shuf(TRICKWORDS.filter(x => x !== a)).slice(0, 2)]), answer: a, it }; };
  const PROOF14 = ["Please keep your [reciept] in a safe place.", "He wrote my [adress] on the envelope.", "The [comittee] will vote on Monday.", "My [grammer] teacher is very kind.", "Do not [interupt] when someone is talking.", "The [jewlery] box sparkled.", "There was a [noticable] change in the weather.", "She ate a [sandwhich] for lunch.", "[Unfortunatly], the game was canceled.", "He plugged in the [vaccum] cleaner.", "The drummer kept a steady [rythm].", "The [athelete] ran the last lap."];
  const DICT14 = dictG([["pronunciation", "Say it with the right ___."], ["mischievous", "The ___ puppy chewed my shoe."], ["parallel", "Draw two ___ lines."], ["sincerely", "Sign the letter, 'Yours ___.'"], ["signature", "Write your ___ at the bottom."], ["persuade", "Can you ___ him to come?"], ["permanent", "A ___ marker does not wash off."], ["convenient", "The shop is ___ to our home."], ["especially", "I like soup, ___ in winter."], ["hygiene", "Good ___ means keeping clean."], ["independent", "She is very ___ and does her own work."], ["exaggerate", "Do not ___ the story."]]);
  const ABLY = [["comfortable", "comfortably"], ["possible", "possibly"], ["terrible", "terribly"], ["reasonable", "reasonably"], ["noticeable", "noticeably"], ["horrible", "horribly"], ["sensible", "sensibly"], ["probable", "probably"], ["capable", "capably"], ["visible", "visibly"], ["incredible", "incredibly"], ["responsible", "responsibly"]].map(([a, b]) => [`Add <b>-ly</b> to <b>${a}</b>.`, b]);

  const A14 = [
    L("Word roots 7", meaningG(ROOT7, ROOT7POOL, "root"),
      clueH("Example: the root <b>port</b> means <b>carry</b>, as in <i>airport</i>. Find the meaning of yours the same way."),
      [S("People and minds", "anthrop · psych · phil", "<b>anthrop</b> = human (anthropology), <b>psych</b> = mind (psychology), <b>phil</b> = love (philosophy)."), S("Life and shape", "nat · gen · morph", "<b>nat</b> = born (native), <b>gen</b> = family or kind (generation), <b>morph</b> = shape (metamorphosis)."), S("Eat and make", "vor · fact", "<b>vor</b> = eat (herbivore), <b>fact</b> = make (factory, manufacture).")]),
    L("Prefixes ab-, dia-, para-, epi-, per-, se-", prefG(PREF14, PREF14POOL),
      ["Break the word into the prefix and the rest of the word. What does the rest of the word mean?", "Think of a real object or idea the word names, and how the prefix changes it.", "Example: <b>transport</b> carries things from one side to the other, so <b>trans-</b> means across. Use the same method for yours."],
      [S("Away and apart", "ab- · se-", "<b>ab-</b> means away (absent, abnormal). <b>se-</b> means apart (separate, seclude)."), S("Across and through", "dia- · per-", "<b>dia-</b> means across (diameter). <b>per-</b> means through (perspire, perforate)."), S("Beside and upon", "para- · epi-", "<b>para-</b> means beside (parallel lines run side by side). <b>epi-</b> means upon (the epicenter is the spot on top of the center).")]),
    L("Abbreviations from Latin", mcG(LATIN),
      ["Many short forms come from Latin. Think about where you have seen it: a time, a list or a letter.", "Try the short form inside a sentence and see which meaning makes sense.", "Example: <b>a.k.a.</b> means 'also known as' and <b>Mr.</b> is short for Mister."],
      [S("Short forms", "e.g. · i.e.", "<b>e.g.</b> means for example. <b>i.e.</b> means that is (it explains what you just said)."), S("Lists and times", "etc. · a.m. · p.m.", "<b>etc.</b> means and so on. <b>a.m.</b> is before noon and <b>p.m.</b> is after noon."), S("In letters", "P.S. · N.B. · vs.", "<b>P.S.</b> is a note added after a letter. <b>N.B.</b> means note well. <b>vs.</b> means against.")]),
    L("Homophones 11", sentG(HOMO11),
      sentHints("Example: 'The <b>mane</b> of a lion' vs 'the <b>main</b> road'. Decide which meaning your sentence needs."),
      [S("Same sound", "cite · site · sight", "<b>cite</b> = name a source, <b>site</b> = a place, <b>sight</b> = something you see."), S("Three-way", "vain · vein · vane", "<b>vain</b> = too proud of how you look. <b>vein</b> carries blood. A <b>vane</b> shows the wind direction."), S("Tip", "💡", "Make up a quick meaning for each word and test the sentence.")]),
    L("Commonly misspelled words 2", rightG(MIS14),
      misH("Example: <b>February</b> has an r before the u, and <b>library</b> has an r after the b. Check the middle of yours."),
      misSlides("sep·a·rate · def·i·nite·ly", "gov·ern·ment · Wednes·day")),
    L("Plurals of compound nouns", mcG(CPLUR),
      ["In a compound noun the 'main' word is the one that gets the plural s.", "Find the main noun. Is it at the beginning, or is the whole thing one word with an ending like -ful?", "Example: <b>attorney-at-law</b> ➜ <b>attorneys-at-law</b>, but <b>blackbird</b> ➜ <b>blackbirds</b>."],
      [S("The main noun", "mothers-in-law", "When a compound has hyphens, the main noun gets the s: <b>mothers</b>-in-law, <b>runners</b>-up."), S("One-word compounds", "spoonfuls · handfuls", "When the compound is one word, add the s at the very end: spoonful<b>s</b>, handful<b>s</b>."), S("By-products", "by-products", "If there is no main noun, add the s at the end: <b>by-products</b>.")]),
    L("Joining prefix and base", tyS(JOINP),
      tyH("Do not drop any letters: write the prefix, then the base word.", "Example: <b>dis + solve</b> = <b>dissolve</b> (the s's meet, so both stay) and <b>re + build</b> = <b>rebuild</b>. Now do yours."),
      [S("Keep every letter", "un + natural", "When a prefix meets a base word, keep every letter: <b>un + natural</b> = <b>unnatural</b> (two n's)."), S("Double letters", "mis + spell · dis + satisfy", "Double letters are normal: <b>misspell</b>, <b>dissatisfy</b>, <b>illegal</b>, <b>irregular</b>."), S("Count the letters", "🔢", "Count the letters in each part. The new word has the same total.")]),
    L("Formal and informal words", mcG(FORMAL),
      ["Formal words are used in school writing, letters and speeches. Informal words are for friends.", "The formal word usually sounds more serious and is less likely to be said on the playground.", "Example: the formal way to say <b>pal</b> is <b>friend</b>, and the formal way to say <b>mad</b> is <b>upset</b>."],
      [S("Two styles", "👔 / 👕", "<b>Formal</b> words fit essays, letters and speeches. <b>Informal</b> words fit texts and talking with friends."), S("Swap them", "buy ➜ purchase", "Many everyday words have formal partners: <b>buy</b> ➜ <b>purchase</b>, <b>start</b> ➜ <b>commence</b>."), S("Choose well", "🎯", "Think about who will read your writing. A teacher expects more formal words.")]),
    L("Adjective to noun", tyS(ADJN),
      tyH("These are special pairs. The noun names the quality, and the spelling changes.", "Example: <b>cruel</b> ➜ <b>cruelty</b> and <b>bold</b> ➜ <b>boldness</b>. Some pairs change more, so think about the sound. Now do yours."),
      [S("Name the quality", "wise ➜ wisdom", "A noun can name a quality: <b>wise</b> ➜ <b>wisdom</b>, <b>brave</b> ➜ <b>bravery</b>."), S("Spelling changes", "strong ➜ strength", "Some words change: <b>long</b> ➜ <b>length</b>, <b>deep</b> ➜ <b>depth</b>, <b>proud</b> ➜ <b>pride</b>."), S("Endings", "-dom · -th · -ty", "Look for endings: <b>-dom</b> (freedom), <b>-th</b> (truth, width), <b>-ty</b> (safety).")]),
    L("Irregular past tense", tyS(IRR),
      tyH("Irregular verbs do not just add -ed. Look at the vowel or the ending.", "Example: <b>sleep</b> ➜ <b>slept</b> and <b>fight</b> ➜ <b>fought</b>. Now do yours."),
      [S("No -ed", "go ➜ went", "Some past tense verbs change their spelling a lot: <b>go</b> ➜ <b>went</b>, <b>buy</b> ➜ <b>bought</b>."), S("Pairs that rhyme", "teach ➜ taught · catch ➜ caught", "<b>bring ➜ brought, seek ➜ sought, teach ➜ taught, catch ➜ caught</b> all use <b>-ought</b> or <b>-aught</b>."), S("Short vowel", "sweep ➜ swept", "<b>sweep ➜ swept, creep ➜ crept, feel ➜ felt, deal ➜ dealt</b> shorten the vowel and add t.")]),
    L("Noun or verb spelling", sentG(NVSP),
      sentHints("Example: 'to <b>speak</b>' is a verb and 'a <b>speech</b>' is a noun. Decide whether your sentence needs an action or a thing."),
      [S("Pairs", "advice · advise", "<b>Advice</b> (noun) is help you get. <b>Advise</b> (verb) is to give that help. The noun has a <b>c</b> like <b>ice</b>."), S("Breath", "breath · breathe", "A <b>breath</b> is a noun. To <b>breathe</b> is a verb, and it has the extra e."), S("More", "device · devise · belief · believe", "<b>Device</b> (noun) and <b>devise</b> (verb). <b>Belief</b> (noun) and <b>believe</b> (verb).")]),
    L("Words named after people or places", namedG,
      ["Some words come from a person's name or a place's name because of something they did or made.", "The other two choices are everyday words that do not come from anyone's name. Which choice has a person or place behind it?", "Example: a <b>Ferris wheel</b> is named after the engineer George Ferris, who built the first one."],
      [S("Names turned into words", "🔤", "Some words come from the name of the person who made or loved something. The <b>sandwich</b> is named after the Earl of Sandwich."), S("People", "braille · diesel · saxophone", "<b>Braille</b> (Louis Braille), <b>diesel</b> (Rudolf Diesel), <b>saxophone</b> (Adolphe Sax), <b>cardigan</b> (an English earl), <b>volt</b> and <b>watt</b> (scientists)."), S("Places", "cheddar · denim · marathon", "<b>Cheddar</b> is a village in England. <b>Denim</b> comes from Nîmes in France. <b>Marathon</b> is a town in Greece.")]),
    L("Acronyms and short forms", mcG(ACRO),
      ["Each letter stands for a word. Think of words that could begin with those letters and make sense together.", "Try the short form inside a sentence you know and see what makes sense.", "Example: <b>PTA</b> stands for Parent Teacher Association, and <b>AKA</b> stands for also known as."],
      [S("Letters as words", "NASA", "An <b>acronym</b> is a word made from the first letters of other words, like <b>NASA</b> or <b>radar</b>."), S("Said as letters", "DIY · FAQ · ETA", "An <b>initialism</b> is said letter by letter: <b>DIY</b> (do it yourself), <b>FAQ</b>, <b>ETA</b>."), S("Words in disguise", "scuba · radar", "<b>Scuba</b> and <b>radar</b> are acronyms that became everyday words, so we write them in small letters.")]),
    L("Figurative language", figG,
      ["Read the sentence aloud and notice what is unusual or special about it.", q => FIGCLUE[q.answer], "Example: 'The moon winked at me' ➜ the moon does something a person does, so it is personification."],
      [S("Personification", "🌬️", "<b>Personification</b> gives a human action to something that is not human: 'The wind whispered.'"), S("Hyperbole", "🍎", "<b>Hyperbole</b> is a big stretch on purpose: 'I'm so hungry I could eat a horse.'"), S("Sounds", "💥", "<b>Onomatopoeia</b> is a word that sounds like what it means (boom, buzz). <b>Alliteration</b> repeats a first sound (Silly snakes slither).")]),
    L("Memory tricks for spelling", trickG,
      ["Look for a small word hiding inside the answer, or the first letters of a silly sentence.", q => `The answer has ${q.answer.length} letters.`, "Example: a trick uses a picture, a rhyme or a small word inside. 'A <b>cup</b> of <b>tea</b> in <b>teacup</b>' tells you the word is made of two small words."],
      [S("Mnemonics", "🧠", "A <b>mnemonic</b> is a trick that helps you remember. You can use a picture, a rhyme or a small word."), S("Tricks", "necessary · separate", "<b>Necessary</b>: one collar and two sleeves (1 c, 2 s). <b>Separate</b>: there is a rat in the middle."), S("Make your own", "✨", "Make a silly sentence or find a small word inside. Your own trick works best.")]),
    L("Proofreading 4", proofG(PROOF14),
      proofH("Example: 'The <b>jungel</b> was loud' ➜ 'jungel' should be 'jungle'. Check each word like that."),
      [S("Proofreading", "🕵️", "A proofreader reads slowly to find spelling mistakes."), S("Use what you know", "📚", "Think of rules: doubled letters, silent letters, endings. Check the word against them."), S("Fix it", "✏️", "Write the word the right way, then read the sentence again.")]),
    L("Listen and spell 10", tyG(DICT14),
      dictHints("Example: 'mathematics' = math + e + mat + ics. Write each part, then check the whole word."),
      dictSlides("pro·nun·ci·a·tion", "ex·ag·ger·ate · hy·giene")),
    L("Adding -ly to -able and -ible words", tyS(ABLY),
      tyH("Look at the end of the word: -able and -ible both end in -le.", "Example: <b>suitable</b> ➜ <b>suitably</b> (the -le becomes -ly). Now do yours."),
      [S("Drop the le", "comfortable ➜ comfortably", "Words ending in <b>-able</b> or <b>-ible</b> lose the <b>e</b> and the <b>l</b> stays: <b>-ably</b> and <b>-ibly</b>."), S("-ible ends -ibly", "possible ➜ possibly", "<b>-ible</b> words turn into <b>-ibly</b>: <b>terribly</b>, <b>horribly</b>, <b>visibly</b>."), S("Silent e kept?", "noticeable ➜ noticeably", "Some -able words keep the silent e before the le: <b>noticeable</b> ➜ <b>noticeably</b>.")])
  ];
  A14.push(MIX("Mixed practice", [A14[0], A14[1], A14[3], A14[4], A14[8], A14[9]]));
  A14.push(MIX("Level 14 Challenge", [A14[2], A14[5], A14[6], A14[7], A14[10], A14[11], A14[12], A14[13], A14[14], A14[17]]));

  // ================= LEVEL 15 =================
  const ROOT8 = [
    ["describe", "scrib", "write", "To do this to a picture, you put it into words on paper."],
    ["ambulance", "ambul", "walk", "It carries a patient who cannot get around."],
    ["synonym", "nym", "name", "Two of these mean almost the same thing."],
    ["confide", "fid", "trust", "You tell a secret to someone you rely on."],
    ["memory", "mem", "remember", "It is where your brain stores last summer's trip."],
    ["science", "sci", "know", "A subject where we learn facts about nature by testing ideas."],
    ["fluid", "flu", "flow", "Water and juice are this kind of thing, not solid."],
    ["equator", "equ", "equal", "An imaginary line that splits the Earth into two matching halves."],
    ["current", "cur", "run", "A swift one in a river carries sticks along fast."],
    ["collect", "lect", "gather", "You do this with stamps or shells."]
  ];
  const ROOT8POOL = ["write", "walk", "name", "trust", "remember", "know", "flow", "equal", "run", "gather"];
  const DETECT = [
    ["Use the parts to work out what <b>inaudible</b> means.<br>in- = not · aud = hear · -ible = able to be", "not able to be heard", ["able to be heard", "able to hear very well"]],
    ["Use the parts to work out what <b>invisible</b> means.<br>in- = not · vis = see · -ible = able to be", "not able to be seen", ["able to be seen clearly", "able to see in the dark"]],
    ["Use the parts to work out what <b>retract</b> means.<br>re- = back · tract = pull", "to pull back", ["to push forward", "to pull apart"]],
    ["Use the parts to work out what <b>disrupt</b> means.<br>dis- = apart · rupt = break", "to break apart or interrupt", ["to put together", "to build up"]],
    ["Use the parts to work out what <b>interject</b> means.<br>inter- = between · ject = throw", "to throw a remark in between", ["to throw far away", "to catch"]],
    ["Use the parts to work out what <b>reject</b> means.<br>re- = back · ject = throw", "to throw back or refuse", ["to accept", "to build again"]],
    ["Use the parts to work out what <b>contradict</b> means.<br>contra- = against · dict = say", "to say the opposite", ["to say again", "to say quietly"]],
    ["Use the parts to work out what <b>incredible</b> means.<br>in- = not · cred = believe · -ible = able to be", "not able to be believed", ["able to be believed", "able to be bought"]],
    ["Use the parts to work out what a <b>spectator</b> is.<br>spect = look · -or = person", "a person who watches", ["a person who throws", "a person who builds"]],
    ["Use the parts to work out what an <b>autograph</b> is.<br>auto = self · graph = write", "a person's own handwritten name", ["a machine that writes", "a picture of a car"]],
    ["Use the parts to work out what <b>export</b> means.<br>ex- = out of · port = carry", "to carry out of a country", ["to carry into a country", "to carry up"]]
  ];
  const ASSIM = [["ad + tend", "attend", ["adtend", "atend"]], ["ad + count", "account", ["adcount", "acount"]], ["ad + rest", "arrest", ["adrest", "arest"]], ["ad + firm", "affirm", ["adfirm", "afirm"]], ["con + rect", "correct", ["conrect", "corect"]], ["con + lapse", "collapse", ["conlapse", "colapse"]], ["sub + port", "support", ["subport", "suport"]], ["sub + ply", "supply", ["subply", "suply"]], ["ob + pose", "oppose", ["obpose", "opose"]], ["dis + fer", "differ", ["disfer", "difer"]], ["ad + point", "appoint", ["adpoint", "apoint"]], ["ad + plaud", "applaud", ["adplaud", "aplaud"]]].map(([p, a, d]) => [`Join the parts: <b>${p}</b>. Which is the real spelling?`, a, d]);
  const OUS = [["fame", "famous"], ["disaster", "disastrous"], ["mountain", "mountainous"], ["humor", "humorous"], ["ridicule", "ridiculous"], ["danger", "dangerous"], ["mystery", "mysterious"], ["adventure", "adventurous"], ["poison", "poisonous"], ["nerve", "nervous"], ["space", "spacious"]].map(([n, a]) => [`Change <b>${n}</b> into an adjective that ends in <b>-ous</b>.`, a]);
  const HOMO12 = [["Play the ___ on your guitar.", "chord", ["cord"]], ["She tied the package with a ___.", "cord", ["chord"]], ["The ___ in the army gave an order.", "colonel", ["kernel"]], ["Pop the corn ___ into the pot.", "kernel", ["colonel"]], ["I strained a ___ in my leg.", "muscle", ["mussel"]], ["We cooked a ___ in garlic sauce.", "mussel", ["muscle"]], ["The doctor looked at my belly button, my ___.", "navel", ["naval"]], ["The ___ ship sailed into port.", "naval", ["navel"]], ["A heart is a ___ of love.", "symbol", ["cymbal"]], ["The drummer crashed the ___.", "cymbal", ["symbol"]], ["The eagle will ___ over the valley.", "soar", ["sore"]], ["My throat is ___.", "sore", ["soar"]], ["The weather ___ on the roof turns with the wind.", "vane", ["vain", "vein"]], ["He was too ___ and looked in the mirror all day.", "vain", ["vein", "vane"]]];
  const MIS15 = [["guarantee", ["garantee", "guarentee"]], ["lieutenant", ["leutenant", "lieutenent"]], ["millennium", ["milennium", "millenium"]], ["parliament", ["parliment", "parlament"]], ["sergeant", ["sargeant", "sergent"]], ["maintenance", ["maintainance", "maintenence"]], ["occurrence", ["occurence", "occurance"]], ["questionnaire", ["questionaire", "questionnare"]], ["rhythm", ["rythm", "rhythem"]], ["apparent", ["apparant", "aparent"]], ["anonymous", ["anonomous", "anonymus"]], ["psychology", ["psycology", "sychology"]]];
  const QUE = [["unique", "", "que"], ["technique", "", "que"], ["antique", "🏺", "que"], ["boutique", "🛍️", "que"], ["plaque", "", "que"], ["mosque", "🕌", "que"], ["critique", "", "que"], ["league", "⚽", "gue"], ["fatigue", "😴", "gue"], ["vague", "", "gue"], ["tongue", "👅", "gue"], ["dialogue", "💬", "gue"], ["colleague", "", "gue"], ["intrigue", "", "gue"]];
  const ABIL = [["flexibility", "", "ibility"], ["reliability", "", "ability"], ["possibility", "", "ibility"], ["responsibility", "", "ibility"], ["availability", "", "ability"], ["capability", "", "ability"], ["visibility", "", "ibility"], ["stability", "", "ability"], ["durability", "", "ability"], ["probability", "", "ability"], ["credibility", "", "ibility"], ["accessibility", "", "ibility"], ["adaptability", "", "ability"]];
  const ANALOG2 = [
    ["<b>Seed</b> is to <b>plant</b> as <b>egg</b> is to ___.", "bird", ["nest", "shell"]],
    ["<b>Whisper</b> is to <b>shout</b> as <b>walk</b> is to ___.", "run", ["stroll", "stand"]],
    ["<b>Key</b> is to <b>piano</b> as <b>page</b> is to ___.", "book", ["pencil", "desk"]],
    ["<b>Thermometer</b> is to <b>temperature</b> as <b>ruler</b> is to ___.", "length", ["weight", "time"]],
    ["<b>Chef</b> is to <b>kitchen</b> as <b>pilot</b> is to ___.", "cockpit", ["suitcase", "ticket"]],
    ["<b>Brave</b> is to <b>courage</b> as <b>kind</b> is to ___.", "kindness", ["unkind", "friend"]],
    ["<b>Author</b> is to <b>novel</b> as <b>composer</b> is to ___.", "symphony", ["canvas", "stage"]],
    ["<b>Drought</b> is to <b>dry</b> as <b>flood</b> is to ___.", "wet", ["cold", "hot"]],
    ["<b>Warm</b> is to <b>scorching</b> as <b>cool</b> is to ___.", "freezing", ["chilly", "mild"]],
    ["<b>Caterpillar</b> is to <b>butterfly</b> as <b>tadpole</b> is to ___.", "frog", ["pond", "fish"]]
  ];
  const USAGE = [["There are ___ cookies left than before.", "fewer", ["less"]], ["I have ___ water than you.", "less", ["fewer"]], ["The prize will be shared ___ the two of us.", "between", ["among"]], ["The prize will be shared ___ all ten players.", "among", ["between"]], ["May I ___ a pencil from you?", "borrow", ["lend"]], ["Can you ___ me a pencil?", "lend", ["borrow"]], ["The sun will ___ at six.", "rise", ["raise"]], ["Please ___ your hand if you know the answer.", "raise", ["rise"]], ["Please ___ the book on the table.", "lay", ["lie"]], ["I like to ___ down after lunch.", "lie", ["lay"]], ["She is taller ___ I am.", "than", ["then"]], ["First we ran, ___ we rested.", "then", ["than"]]];
  const STORY = [
    ["Pandora's box", "something that starts many troubles when opened", ["a gift that makes you rich", "a very old treasure chest"]],
    ["the Midas touch", "an ability to turn things into money or success", ["a gentle hand", "a cold hand"]],
    ["a Trojan horse", "something that looks harmless but hides a danger", ["a very fast horse", "a big wooden toy"]],
    ["David and Goliath", "a small underdog facing a much bigger opponent", ["two best friends", "a tall story"]],
    ["a Cinderella story", "a big change from being overlooked to being honored", ["a story about cleaning", "a story about midnight"]],
    ["a Scrooge", "a person who hates spending money", ["a very cheerful person", "a person who loves parties"]],
    ["a Herculean task", "a very hard job needing great strength", ["a very easy job", "a short job"]],
    ["sour grapes", "pretending you don't want something you can't have", ["being very sweet", "growing a garden"]],
    ["crying wolf", "giving false alarms so that people stop believing you", ["calling a pet", "singing very loudly"]],
    ["an Achilles' heel", "a weak spot in someone who is otherwise strong", ["a sore foot", "a lucky charm"]]
  ].map(([p, m, d]) => [`What does the phrase <b>${p}</b> mean?`, m, d]);
  const STRESS = [["present", "a gift", "to give or show"], ["record", "a saved list or disc", "to save sound or video"], ["contract", "a written agreement", "to shrink or get smaller"], ["object", "a thing", "to disagree"], ["produce", "fruits and vegetables", "to make"], ["desert", "a dry, sandy place", "to leave behind"], ["permit", "a paper that allows something", "to allow"], ["increase", "a rise in amount", "to grow bigger"], ["rebel", "a person who fights against rules", "to go against rules"], ["conduct", "behavior", "to lead"], ["project", "a big school assignment", "to throw forward or show on a screen"]];
  const strG = () => {
    const it = pick(STRESS), [w, nd, vd] = it, verb = Math.random() < 0.5;
    return { text: `The word <b>${w}</b> can be a noun or a verb. As a <b>${verb ? "verb" : "noun"}</b> (${verb ? vd : nd}), which part is stressed?`, choices: shuf(["the first syllable", "the second syllable"]), answer: verb ? "the second syllable" : "the first syllable", say: w, it };
  };
  const PALS = ["kayak", "level", "radar", "civic", "refer", "rotor", "noon", "madam", "racecar", "tenet"];
  const NOTPALS = ["planet", "garden", "tablet", "butter", "castle", "window", "pencil", "river", "basket", "lemon"];
  const REVS = [["stop", "pots"], ["star", "rats"], ["draw", "ward"], ["flow", "wolf"], ["spot", "tops"], ["keep", "peek"], ["was", "saw"], ["tub", "but"], ["net", "ten"], ["pan", "nap"], ["live", "evil"], ["reward", "drawer"]];
  const palG = () => {
    if (Math.random() < 0.5) {
      const a = pick(PALS);
      return { kind: "p", text: "Which word reads the same forwards and backwards?", choices: shuf([a, ...shuf(NOTPALS).slice(0, 2)]), answer: a, it: [a] };
    }
    const it = pick(REVS);
    return { kind: "r", text: `Read <b>${it[0]}</b> backwards, letter by letter. Which word do you get?`, textInput: true, answer: it[1], it };
  };
  const GROUPS = [["lions", "pride", "🦁"], ["fish", "school", "🐟"], ["wolves", "pack", "🐺"], ["whales", "pod", "🐋"], ["bees", "swarm", "🐝"], ["ants", "colony", "🐜"], ["sheep", "flock", "🐑"], ["cows", "herd", "🐄"], ["owls", "parliament", "🦉"], ["puppies", "litter", "🐶"], ["butterflies", "kaleidoscope", "🦋"], ["flamingos", "flamboyance", "🦩"]];
  const GROUPPOOL = GROUPS.map(x => x[1]);
  const grpG = () => { const it = pick(GROUPS), [an, a, v] = it; return { text: `What do you call a group of <b>${an}</b>?`, visual: v, choices: shuf([a, ...shuf(GROUPPOOL.filter(x => x !== a)).slice(0, 2)]), answer: a, it }; };
  const FULLY = [["beauty", "beautifully"], ["mercy", "mercifully"], ["pity", "pitifully"], ["plenty", "plentifully"], ["duty", "dutifully"], ["fancy", "fancifully"], ["joy", "joyfully"], ["care", "carefully"], ["hope", "hopefully"], ["use", "usefully"], ["grace", "gracefully"], ["peace", "peacefully"], ["thank", "thankfully"], ["wonder", "wonderfully"], ["cheer", "cheerfully"], ["power", "powerfully"]].map(([a, b]) => [`Add <b>-ful</b> and then <b>-ly</b> to <b>${a}</b>.`, b]);
  const PROOF15 = ["She will [acomplish] her goals.", "The [bussiness] opened on Main Street.", "It was an [excelent] performance.", "He gave a [convinceing] speech.", "The [wheather] was warm all week.", "My [cousen] is visiting this weekend.", "The path is [dangerus] at night.", "That is [compleatly] true.", "She [apoligized] to the class.", "She grabbed the [oppurtunity] to speak.", "The [secretery] answered the phone.", "The soup was [delishous]."];
  const VOCAB = [
    ["The farm had an <b>abundant</b> harvest this year, with piles of corn and apples everywhere. What does <b>abundant</b> mean?", "plentiful", ["rare", "spoiled"]],
    ["Mia was <b>meticulous</b>, checking every tiny detail of her project twice. What does <b>meticulous</b> mean?", "very careful about details", ["messy", "quick"]],
    ["The sign was <b>ambiguous</b>. Some people read it one way and others read it another. What does <b>ambiguous</b> mean?", "having more than one possible meaning", ["very clear", "very loud"]],
    ["Be <b>candid</b> with me. I want the honest truth. What does <b>candid</b> mean?", "honest and direct", ["secretive", "shy"]],
    ["A <b>diligent</b> student, Leo studied a little every night and never gave up. What does <b>diligent</b> mean?", "hard-working and careful", ["lazy", "bossy"]],
    ["The <b>eloquent</b> speaker used clear, beautiful words, and everyone listened. What does <b>eloquent</b> mean?", "speaking clearly and beautifully", ["silent", "confused"]],
    ["Handle the <b>fragile</b> vase carefully, or it may crack. What does <b>fragile</b> mean?", "easily broken", ["very heavy", "shiny"]],
    ["The <b>hostile</b> neighbor glared and would not say hello. What does <b>hostile</b> mean?", "unfriendly", ["welcoming", "sleepy"]],
    ["With dark clouds overhead, rain was <b>inevitable</b>. What does <b>inevitable</b> mean?", "sure to happen", ["impossible", "unlikely"]],
    ["The book had a <b>profound</b> message that made her think for days. What does <b>profound</b> mean?", "very deep", ["shallow", "funny"]],
    ["A <b>resilient</b> player, she fell, got up and tried again each time. What does <b>resilient</b> mean?", "able to recover quickly", ["easily broken", "very slow"]],
    ["The lake was <b>tranquil</b>, with no wind and no waves. What does <b>tranquil</b> mean?", "calm and peaceful", ["noisy", "dangerous"]],
    ["She painted in <b>vivid</b> reds and yellows that almost glowed. What does <b>vivid</b> mean?", "bright and clear", ["dull", "tiny"]]
  ];
  const DICT15 = dictG([["extraordinary", "She did something ___ to help her town."], ["fluorescent", "The classroom has ___ lights."], ["miniature", "He built a ___ model of a ship."], ["silhouette", "We saw the ___ of a tree against the sunset."], ["camouflage", "A chameleon uses ___ to hide."], ["thesaurus", "Look in a ___ for a synonym."], ["bibliography", "List your sources in a ___."], ["reservoir", "The town stores water in a ___."], ["perseverance", "Her ___ helped her finish the race."], ["tremendous", "The crowd gave a ___ cheer."], ["catastrophe", "The flood was a ___ for the town."], ["hippopotamus", "A ___ rested in the river."]]);

  const A15 = [
    L("Word roots 8", meaningG(ROOT8, ROOT8POOL, "root"),
      clueH("Example: the root <b>vis</b> means <b>see</b>, as in <i>vision</i>. Find the meaning of yours the same way."),
      [S("Write, name, know", "scrib · nym · sci", "<b>scrib</b> = write (describe), <b>nym</b> = name (synonym), <b>sci</b> = know (science)."), S("Trust and remember", "fid · mem · lect", "<b>fid</b> = trust (confide), <b>mem</b> = remember (memory), <b>lect</b> = gather (collect)."), S("Move and equal", "ambul · flu · cur · equ", "<b>ambul</b> = walk, <b>flu</b> = flow, <b>cur</b> = run, <b>equ</b> = equal.")]),
    L("Word detective", mcG(DETECT),
      ["Say what each part means, then put the meanings together in order.", "Tell yourself the meaning in your own words: first the prefix, then the root, then the ending.", "Example: <b>unbreakable</b>: un (not) + break + able = 'not able to be broken'. Now do yours."],
      [S("Parts add up", "pre + fix + ...", "A long word is often parts that add up: prefix + root + suffix."), S("Example", "in + vis + ible", "<b>invisible</b> = <b>in-</b> (not) + <b>vis</b> (see) + <b>-ible</b> (able to be) = not able to be seen."), S("Check the sense", "✅", "After you join the meanings, ask if the answer sounds like a real meaning.")]),
    L("Prefixes that change to match", mcG(ASSIM),
      ["Sometimes the end of the prefix changes to match the first letter of the base. Then you get a double letter.", "Say the joined word aloud. It is easier to say with a double letter than with the plain parts glued together.", "Example: <b>ad + sign</b> becomes <b>assign</b> and <b>sub + fix</b> becomes <b>suffix</b>. Now do yours."],
      [S("Easier to say", "ad + tend", "<b>ad + tend</b> is hard to say, so the d changes to a t: <b>attend</b>."), S("Double letters", "con + lapse · sub + port", "The letter changes to match the next letter: <b>collapse</b>, <b>support</b>, <b>supply</b>, <b>oppose</b>."), S("Why it helps", "💡", "If you know the prefix, you know why the double letter is there.")]),
    L("Adding -ous to nouns", tyS(OUS),
      tyH("Look at the last letter of the noun. Some letters drop off or change before -ous.", "Example: <b>glory</b> ➜ <b>glorious</b> (y becomes i) and <b>joy</b> ➜ <b>joyous</b>. Now do yours."),
      [S("Adjective maker", "fame ➜ famous", "<b>-ous</b> turns a noun into an adjective that means full of: <b>famous</b>, <b>dangerous</b>."), S("Drop the e", "adventure ➜ adventurous", "Drop a silent <b>e</b>: <b>adventure</b> ➜ <b>adventurous</b>, <b>nerve</b> ➜ <b>nervous</b>. Keep the e after c or g to keep the soft sound."), S("Surprises", "disaster ➜ disastrous", "<b>Disaster</b> loses an e: <b>disastrous</b>. <b>Mystery</b> changes the y: <b>mysterious</b>. <b>Humor</b> ➜ <b>humorous</b>.")]),
    L("Homophones 12", sentG(HOMO12),
      sentHints("Example: 'The <b>mane</b> of a lion' and 'the <b>main</b> road'. Decide which meaning your sentence needs."),
      [S("Same sound", "chord · cord", "A musician plays a <b>chord</b>. You tie something with a <b>cord</b>."), S("Odd pairs", "colonel · kernel", "<b>Colonel</b> sounds like <b>kernel</b> but is spelled very differently. A <b>kernel</b> is a seed, like in corn."), S("Tip", "💡", "Make up a quick meaning for each word and test the sentence.")]),
    L("Commonly misspelled words 3", rightG(MIS15),
      misH("Example: <b>Wednesday</b> has a silent d and <b>environment</b> has an n before the m. Check the middle of yours."),
      misSlides("lieu·ten·ant · ser·geant", "oc·cur·rence · rhy·thm")),
    L("Endings -que and -gue", blankG(QUE, ["que", "gue"]),
      ["The ending sounds like 'k' or 'g'. Which looks right for the word?", q => `The whole word has ${q.it[0].length} letters. Try each ending in the gap.`, "Example: <b>opaque</b> ends in -que and <b>vogue</b> ends in -gue. Say yours and think of a word it looks like."],
      [S("Silent ue", "unique · league", "Both endings have a silent <b>ue</b>. The word before them sets the sound."), S("-que says k", "unique · antique · mosque", "<b>-que</b> says <b>k</b>: unique, technique, antique, boutique, plaque, mosque."), S("-gue says g", "league · fatigue · tongue", "<b>-gue</b> says <b>g</b>: league, fatigue, vague, dialogue, colleague, intrigue. <b>Tongue</b> is odd: it says <b>ng</b>.")]),
    L("Endings -ability and -ibility", blankG(ABIL, ["ability", "ibility"]),
      ["Think of the adjective ending -able or -ible. The noun usually keeps the same vowel.", q => `The whole word has ${q.it[0].length} letters. If the adjective ends in -ible, the noun ends in -ibility.`, "Example: <b>sociable</b> ➜ <b>sociability</b> and <b>audible</b> ➜ <b>audibility</b>. Think of the adjective for yours."],
      [S("Same vowel", "reliable ➜ reliability", "The vowel stays the same: <b>-able</b> ➜ <b>-ability</b> and <b>-ible</b> ➜ <b>-ibility</b>."), S("-ibility", "possible ➜ possibility", "<b>flexible</b> ➜ <b>flexibility</b>, <b>visible</b> ➜ <b>visibility</b>, <b>responsible</b> ➜ <b>responsibility</b>."), S("-ability", "stable ➜ stability", "<b>capable</b> ➜ <b>capability</b>, <b>available</b> ➜ <b>availability</b>. A few, like <b>stability</b>, lose letters.")]),
    L("Word analogies 2", mcG(ANALOG2),
      ["Find how the first two words are connected, then use the same link for the second pair.", "Say the link in a sentence, like 'A ___ is the tool for a ___' or 'A ___ turns into a ___'.", "Example: <b>Chapter</b> is to <b>book</b> as <b>scene</b> is to <b>play</b>, because each is a part of the whole. Find your link first."],
      [S("Same link", "A : B :: C : D", "In an <b>analogy</b>, the link between the first pair is the same as the link between the second pair."), S("More links", "tool · degree · change", "Links can be <b>tool and job</b> (ruler : length), <b>degree</b> (warm : scorching) or <b>change</b> (tadpole : frog)."), S("Try it", "🔗", "Say the link out loud first. Then check each choice.")]),
    L("Words that get mixed up", sentG(USAGE),
      ["Read the sentence. Think about what the missing word means.", "Each word has its own meaning. Say the sentence with each choice and listen for the one that makes sense.", "Example: 'I <b>accept</b> the gift' (take it) but 'everyone <b>except</b> me' (leaving out)."],
      [S("Fewer or less", "fewer cookies · less milk", "Use <b>fewer</b> for things you can count. Use <b>less</b> for things you cannot count."), S("Between or among", "between two · among many", "Use <b>between</b> for two. Use <b>among</b> for three or more."), S("Lend, borrow, rise, raise", "🔁", "You <b>lend</b> to someone, and you <b>borrow</b> from someone. The sun <b>rises</b>, but you <b>raise</b> your hand. You <b>lay</b> something down, but you <b>lie</b> down.")]),
    L("Phrases from stories", mcG(STORY),
      ["Think of the story behind the phrase.", "The phrase is a short way of pointing to a lesson from the story. What lesson would it teach?", "Example: a <b>Goldilocks</b> choice is the one in the middle that is 'just right', from the story of the three bears."],
      [S("Story shortcuts", "📖", "Some phrases are shortcuts to old stories from myths, fairy tales and fables."), S("Examples", "Pandora's box · Trojan horse", "<b>Pandora's box</b>: opening it lets out troubles. <b>Trojan horse</b>: looks harmless but hides a surprise."), S("From fables", "crying wolf · sour grapes", "<b>Crying wolf</b> is a false alarm. <b>Sour grapes</b> is pretending you did not want it.")]),
    L("Stress: noun or verb?", strG,
      ["Say the word both ways out loud and listen to which part is louder.", "Nouns and verbs with the same spelling often stress different syllables.", "Example: <b>import</b>: IM-port is a noun (goods) and im-PORT is a verb (to bring in). Use the same idea for yours."],
      [S("Stress", "REcord · reCORD", "In a word with two syllables, one is said louder. That is the <b>stress</b>."), S("Moving stress", "PREsent · preSENT", "Many words are a <b>noun</b> when the first part is stressed, and a <b>verb</b> when the second is stressed."), S("More", "OBject · obJECT", "<b>desert, permit, increase, project, conduct</b> all work this way.")]),
    L("Palindromes and reversals", palG,
      [q => q.kind === "p" ? "Read each choice from the last letter to the first." : "Write the word backwards one letter at a time, starting at the last letter.",
      q => q.kind === "p" ? "A palindrome has matching letters from the front and from the back." : info(q.answer),
      "Example: <b>mom</b> and <b>pop</b> are palindromes, and <b>part</b> backwards is <b>trap</b>. Now do yours."],
      [S("Palindromes", "kayak", "A <b>palindrome</b> reads the same forwards and backwards: kayak, level, radar, noon."), S("Reversals", "stop ➜ pots", "Some words turn into a new word when you reverse them: <b>stop</b> ➜ <b>pots</b>, <b>star</b> ➜ <b>rats</b>."), S("Spelling help", "🔄", "Reading a word backwards slowly is a good way to check each letter.")]),
    L("Names for groups", grpG,
      ["Think of a group word you have heard with this animal.", q => `The answer has ${q.answer.length} letters.`, "Example: a <b>bouquet</b> of flowers and a <b>fleet</b> of ships. Special groups have special words."],
      [S("Collective nouns", "👥", "A <b>collective noun</b> is a word for a group of things: a <b>herd</b> of cows."), S("Animals", "pride · pod · pack", "A <b>pride</b> of lions, a <b>pod</b> of whales, a <b>pack</b> of wolves, a <b>school</b> of fish."), S("Fun ones", "parliament · kaleidoscope", "A <b>parliament</b> of owls and a <b>kaleidoscope</b> of butterflies are real group names.")]),
    L("Adding -fully", tyS(FULLY),
      tyH("First add -ful, then add -ly. Watch what happens to a y at the end of the base word.", "Example: <b>fear</b> ➜ <b>fearful</b> ➜ <b>fearfully</b>, and <b>bounty</b> ➜ <b>bountifully</b> (y becomes i). Now do yours."),
      [S("Two steps", "care ➜ careful ➜ carefully", "Add <b>-ful</b> first (one l), then add <b>-ly</b>. The result has two l's: <b>carefully</b>."), S("Y to i", "beauty ➜ beautifully", "If the base word ends in a consonant plus y, change y to i first: <b>beautiful</b>, <b>beautifully</b>."), S("Silent e stays", "hope ➜ hopefully", "A silent <b>e</b> before <b>-ful</b> stays: <b>hopeful</b>, <b>hopefully</b>.")]),
    L("Proofreading 5", proofG(PROOF15),
      proofH("Example: 'She sat <b>quitely</b> at her desk' ➜ 'quitely' should be 'quietly'. Check each word like that."),
      [S("Proofreading", "🕵️", "A proofreader reads slowly to find spelling mistakes."), S("Use what you know", "📚", "Use rules you know: doubled letters, endings, silent letters. Check the word against them."), S("Fix it", "✏️", "Write the word the right way, then read the sentence again.")]),
    L("Strong vocabulary", mcG(VOCAB),
      ["Use the other words in the sentence to guess what the word means.", "Think about whether the word feels positive or negative. Match that feeling with a choice.", "Example: in 'The <b>timid</b> mouse hid behind the door', the clue is <b>hid</b>, so timid means shy and easily scared."],
      [S("Context clues", "🔎", "The words around a new word often tell you its meaning."), S("Feeling", "👍 / 👎", "Decide whether the word feels positive or negative. That already removes a choice."), S("Use it", "✍️", "After you learn a word, use it in your own sentence to make it stick.")]),
    L("Listen and spell 11", tyG(DICT15),
      dictHints("Example: 'enthusiasm' = en + thu + si + asm. Write each part, then check the whole word."),
      dictSlides("ex·tra·or·di·nar·y", "cam·ou·flage · sil·hou·ette"))
  ];
  A15.push(MIX("Mixed practice", [A15[0], A15[2], A15[3], A15[4], A15[5], A15[9]]));
  A15.push(MIX("Level 15 Challenge", [A15[1], A15[6], A15[7], A15[8], A15[10], A15[11], A15[12], A15[13], A15[14], A15[16], A15[17]]));

  Object.assign(SPELL_LEVELS, { 13: A13, 14: A14, 15: A15 });
})();
