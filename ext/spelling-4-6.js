// ext/spelling-4-6.js : Spelling & Words, levels 4-6 (1st grade 2nd half, 2nd grade).
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
  const mcG = (items, n = 3) => () => { const it = pick(items); const [t, a, d, v] = it; return { text: t, visual: v, choices: shuf([a, ...shuf(d).slice(0, n - 1)]), answer: a, it }; };
  const tyG = items => () => { const it = pick(items); const [t, a, v, s] = it; const q = { text: t, textInput: true, answer: a, it }; if (v) q.visual = v; if (s) q.say = s; return q; };
  const spellG = bank => () => {
    const it = pick(bank), [w, e] = it;
    return { text: "Spell the word.", visual: e, say: w, textInput: true, answer: w, it, wrong: g => (typeof g === "string" && g.length !== w.length ? `The word has ${w.length} letters. Yours has ${g.length}.` : null) };
  };
  const blankG = (items, opts, n = 3) => () => {
    const it = pick(items), [w, e, a] = it;
    return { text: `Fill the gap: <b>${w.replace(a, "__")}</b>`, visual: e, say: w, choices: shuf([a, ...shuf(opts.filter(o => o !== a)).slice(0, n - 1)]), answer: a, it };
  };
  const rightG = items => () => { const it = pick(items), [r, w, v] = it; return { text: "Which one is spelled correctly?", visual: v, say: r, choices: shuf([r, ...shuf(w).slice(0, 2)]), answer: r, it }; };

  // ================= LEVEL 4 =================
  const BLENDS = [["frog","🐸"],["crab","🦀"],["drum","🥁"],["flag","🚩"],["plane","✈️"],["snake","🐍"],["sled","🛷"],["spoon","🥄"],["clock","🕐"],["block","🧱"],["train","🚂"],["truck","🚚"],["swan","🦢"],["snail","🐌"],["crown","👑"],["bread","🍞"]];
  const MAGIC = [["cake","🎂"],["bike","🚲"],["home","🏠"],["kite","🪁"],["rope","🪢"],["bone","🦴"],["nose","👃"],["snake","🐍"],["plane","✈️"],["globe","🌍"],["rose","🌹"],["cone","🍦"]];
  const ADD_E = [["cap","cape"],["tap","tape"],["kit","kite"],["hop","hope"],["cub","cube"],["pin","pine"],["mat","mate"],["not","note"],["rob","robe"],["bit","bite"],["cut","cute"],["hid","hide"],["rod","rode"]].map(([a, b]) => [`Add a magic <b>e</b> to <b>${a}</b>. What new word do you make?`, b]);
  const DOUBLE_L = [["bell","🔔","ll"],["doll","🪆","ll"],["grass","🌿","ss"],["puff","💨","ff"],["buzz","🐝","zz"],["dress","👗","ss"],["hill","⛰️","ll"],["glass","🥛","ss"],["stuff","🧸","ff"],["smell","👃","ll"],["chess","♟️","ss"],["fizz","🥤","zz"]];
  const CK = [["duck","duk","dukk"],["sock","sok","sokk"],["brick","brik","brikk"],["truck","truk","trukk"],["clock","clok","clokk"],["black","blak","blakk"],["snack","snak","snakk"],["stick","stik","stikk"],["quick","quik","quikk"],["pack","pak","pakk"],["neck","nek","nekk"]].map(([r, a, b]) => [r, [a, b]]);
  const NGNK = [["ring","🔔","ng"],["king","🤴","ng"],["song","🎵","ng"],["wing","🪽","ng"],["swing","🛝","ng"],["bank","🏦","nk"],["pink","🩷","nk"],["drink","🥤","nk"],["trunk","🐘","nk"],["sink","🚰","nk"],["skunk","🦨","nk"],["tank","🛢️","nk"]];
  const VTEAMS = [["rain",["rane","rayn"]],["train",["trane","trayn"]],["play",["plai","plae"]],["day",["dai","dae"]],["sheep",["sheap","shep"]],["toast",["tost","towst"]],["boat",["bote","bowt"]],["snow",["snoe","snoa"]],["light",["liet","lyte"]],["feet",["fet","feit"]]];
  const PLUR = [["box","boxes"],["dish","dishes"],["bus","buses"],["fox","foxes"],["glass","glasses"],["brush","brushes"],["watch","watches"],["church","churches"],["dress","dresses"],["cat","cats"],["dog","dogs"],["book","books"]].map(([a, b]) => [`More than one <b>${a}</b> is …`, b]);
  const EDW = ["walk","jump","play","look","help","talk","cook","paint","call","want","plant","wash","kick"].map(w => [`It happened in the past. Add <b>-ed</b> to <b>${w}</b>.`, w + "ed"]);
  const INGE = [["make","making"],["ride","riding"],["take","taking"],["bake","baking"],["hope","hoping"],["dance","dancing"],["write","writing"],["smile","smiling"],["use","using"],["close","closing"],["give","giving"],["hide","hiding"]].map(([a, b]) => [`Add <b>-ing</b> to <b>${a}</b>.`, b]);
  const DBL = [["hop","hopping"],["run","running"],["sit","sitting"],["swim","swimming"],["stop","stopping"],["clap","clapping"],["jog","jogging"],["hug","hugging"],["get","getting"],["dig","digging"],["cut","cutting"],["skip","skipping"]].map(([a, b]) => [`Add <b>-ing</b> to <b>${a}</b>.`, b]);
  const COMP = [["sun","flower","🌻"],["rain","bow","🌈"],["cup","cake","🧁"],["foot","ball","🏈"],["butter","fly","🦋"],["pop","corn","🍿"],["snow","man","⛄"],["bed","room","🛏️"],["sail","boat","⛵"],["tooth","brush","🪥"],["pan","cake","🥞"],["air","plane","✈️"],["gold","fish","🐠"],["back","pack","🎒"],["lunch","box","🍱"],["note","book","📓"]].map(([a, b, e]) => [`<b>${a}</b> + <b>${b}</b> = ?`, a + b, e]);
  const CONTR = [["do not","don't",["can't","isn't"]],["can not","can't",["don't","won't"]],["I am","I'm",["I'll","I've"]],["we are","we're",["we'll","we've"]],["he is","he's",["I'm","we're"]],["did not","didn't",["don't","isn't"]],["is not","isn't",["didn't","wasn't"]],["they are","they're",["they'll","they've"]],["I will","I'll",["I'm","I've"]],["she is","she's",["I'm","they're"]],["let us","let's",["that's","what's"]],["was not","wasn't",["isn't","didn't"]],["you are","you're",["you'll","you've"]]].map(([a, b, d]) => [`What is the short way to write <b>${a}</b>?`, b, d]);
  const SIGHT = [["said",["sed","siad"]],["they",["thay","thei"]],["want",["wont","wnat"]],["many",["meny","manny"]],["any",["eny","anny"]],["very",["verry","vrey"]],["what",["wat","whut"]],["where",["whare","wher"]],["every",["evry","evrey"]],["again",["agen","agian"]],["mother",["mothr","muther"]],["school",["scool","skool"]],["friend",["freind","frend"]],["people",["peple","peeple"]]];
  const OPP4 = [["thick","thin",["wide","tall"]],["clean","dirty",["shiny","wet"]],["early","late",["slow","quick"]],["strong","weak",["tough","heavy"]],["rich","poor",["rude","big"]],["above","below",["around","near"]],["start","stop",["begin","jump"]],["buy","sell",["pay","keep"]],["push","pull",["throw","pick"]],["come","go",["run","walk"]],["always","never",["often","soon"]],["inside","outside",["under","over"]],["brave","scared",["strong","kind"]],["lost","found",["gone","small"]]].map(([a, b, d]) => [`What is the opposite of <b>${a}</b>?`, b, d]);
  const SYLB = { 1: ["dog","ship","stamp","bread","street","chair"], 2: ["rabbit","pencil","window","garden","happy","monkey"], 3: ["banana","elephant","butterfly","tomato","computer","umbrella"], 4: ["watermelon","alligator","helicopter","caterpillar"] };
  const SYLL_ALL = [].concat(...[1, 2, 3, 4].map(n => SYLB[n].map(w => [w, n])));
  const FAMS = { "-ack": ["back","pack","black","snack","quack","track"], "-ill": ["hill","fill","will","spill","chill","drill"], "-ell": ["bell","tell","shell","smell","well","yell"], "-ing": ["ring","sing","king","swing","wing","bring"], "-ink": ["pink","sink","drink","think","wink","blink"], "-ock": ["clock","sock","block","rock","lock","dock"], "-ake": ["cake","lake","snake","bake","shake","make"] };
  const FAM_Q = () => { const k = Object.keys(FAMS), f = pick(k), ans = pick(FAMS[f]), d = shuf(k.filter(x => x !== f)).slice(0, 2).map(x => pick(FAMS[x])); return { text: `Which word is in the <b>${f}</b> family?`, choices: shuf([ans, ...d]), answer: ans, it: [f] }; };
  const TWO = [["rabbit","🐰"],["pencil","✏️"],["window","🪟"],["rocket","🚀"],["turtle","🐢"],["carrot","🥕"],["banana","🍌"],["cookie","🍪"],["guitar","🎸"],["pumpkin","🎃"],["spider","🕷️"],["monkey","🐒"],["flower","🌸"],["basket","🧺"]];

  const A4 = [
    L("Spell blend words", spellG(BLENDS),
      ["Press 🔊 and say the word slowly. It starts with two sounds that sit side by side.", q => `The word begins with <b>${q.it[0].slice(0, 2)}</b> and has ${q.it[0].length} letters.`, "Example: sound out 'plum' 🍑: p-l-u-m. Blend pl, then u, then m. Now do yours."],
      [S("Blends", "<b>fr</b>og · <b>cl</b>ock · <b>st</b>ar", "A blend is two letters side by side where you hear <b>both</b> sounds."), S("Say it slowly", "🐸 f - r - o - g", "Stretch the word out. Write one letter for every sound you hear."), S("Check it", "✏️", "When you finish, say the word again and check each sound.")]),
    L("Add the magic e", tyG(ADD_E),
      ["The magic e at the end makes the vowel say its name.", "Write the whole word, then put an <b>e</b> on the end. Say the new word to check it.", "Example: 'plan' + e = 'plane'. The a now says its name. Now do yours."],
      [S("The magic e", "cap ➜ ca<b>pe</b>", "A silent <b>e</b> at the end of a word makes the vowel before it say its own name."), S("Short or long?", "kit → kite", "Without the e the vowel is short (kit). With the e it is long (kite). The e is silent."), S("Tip", "✨", "Write the word first, then add the e at the very end.")]),
    L("Spell magic-e words", spellG(MAGIC),
      ["Press 🔊. Listen for the long vowel that says its own name.", q => `It has ${q.it[0].length} letters and ends with <b>e</b>.`, "Example: sound out 'stone' 🪨: s-t-o-n-e. The o says its name, so there is a silent e at the end."],
      [S("Long vowel sounds", "c<b>a</b>ke · b<b>i</b>ke · h<b>o</b>me", "Long vowels say their names: a, e, i, o, u."), S("Silent e", "kit<b>e</b>", "When you hear a long vowel and one consonant after it, there is often a silent <b>e</b> at the end."), S("Tip", "👂", "Say the word slowly, then write the sounds, and add the e last.")]),
    L("Double letters: ff, ll, ss, zz", blankG(DOUBLE_L, ["ff", "ll", "ss", "zz"]),
      ["Press 🔊 and look at the picture. Which double letters end the word?", "Short word, short vowel, and f, l, s or z at the end? Those letters often come as a pair.", "Example: 'mess' ends with ss. 'Hill' ends with ll. Try each choice on your word."],
      [S("Double letters", "be<b>ll</b> · gra<b>ss</b> · pu<b>ff</b>", "At the end of a short word with one short vowel, the letters <b>f, l, s</b> and <b>z</b> are often doubled."), S("Z too", "bu<b>zz</b>", "The letter <b>z</b> doubles as well: buzz, fizz."), S("Tip", "🎯", "Say the word, then see which double letter makes it look right.")]),
    L("Words that end in ck", rightG(CK),
      ["Say the word. It ends with a hard k sound right after a short vowel.", "After a short vowel, the k sound at the end is spelled <b>ck</b> (two letters, one sound).", "Example: 'luck' is spelled l-u-ck, not 'luk'. Now find yours."],
      [S("The ck ending", "du<b>ck</b> · so<b>ck</b>", "<b>ck</b> makes one k sound. It comes right after a short vowel at the end of a word."), S("More ck words", "bri<b>ck</b> · tru<b>ck</b> · clo<b>ck</b>", "Brick, truck, clock, snack. All of them have a short vowel and then <b>ck</b>."), S("Tip", "👀", "Look at the choices and pick the one that looks right.")]),
    L("Endings ng and nk", blankG(NGNK, ["ng", "nk"], 2),
      ["Press 🔊 and say the ending. Do you hear a g sound or a k sound?", "<b>ng</b> sounds soft, like in 'sing'. <b>nk</b> has a hard k sound, like in 'sink'.", "Example: 'long' ends with ng. 'Bank' ends with nk. Now try yours."],
      [S("The ng ending", "ri<b>ng</b> · so<b>ng</b>", "<b>ng</b> makes one soft sound in the back of your mouth."), S("The nk ending", "pi<b>nk</b> · tru<b>nk</b>", "<b>nk</b> sounds like n and k together."), S("Tip", "👂", "Listen to the end of the word: is there a hard k?")]),
    L("Long vowel teams", rightG(VTEAMS),
      ["Press 🔊 and say the word. Listen for the long vowel sound.", "Think of the vowel team you know: ai, ay, ee, oa, ow, igh. Which one belongs in this word?", "Example: 'peek' has a long e, spelled ee, not 'pek'. Now find yours."],
      [S("Vowel teams", "r<b>ai</b>n · pl<b>ay</b> · f<b>ee</b>t", "Some vowels work together as a team to make one long sound."), S("Teams to learn", "oa · ow · igh", "<b>oa</b> in boat, <b>ow</b> in snow, <b>igh</b> in light."), S("Tip", "🧠", "Remember the word as a picture, not just sounds.")]),
    L("Plurals: s and es", tyG(PLUR),
      ["Plural means more than one. Look at how the word ends.", "Words that end in <b>s, x, ch</b> or <b>sh</b> add <b>es</b>. Most other words just add <b>s</b>.", "Example: 'wish' ends in sh, so 'wishes'. 'Pen' just adds s: 'pens'. Now do yours."],
      [S("Add s", "cat ➜ cats", "Most words just add <b>s</b> to mean more than one."), S("Add es", "box ➜ boxes", "Words ending in <b>s, x, ch, sh</b> add <b>es</b> so you can say it."), S("Tip", "🗣️", "If it is hard to say with just s, add es!")]),
    L("Past tense: -ed", tyG(EDW),
      ["-ed shows that it already happened.", "Write the base word and add <b>ed</b>. Do not change the base word.", "Example: 'pick' ➜ 'picked'. Now do yours."],
      [S("Past tense", "yesterday ➜ <b>-ed</b>", "When something already happened, we often add <b>-ed</b>."), S("Different sounds", "jump<b>ed</b> · play<b>ed</b> · want<b>ed</b>", "The ending can sound like t, d or id, but it is always spelled <b>ed</b>."), S("Tip", "⏪", "Ask: did it happen already? Then add -ed.")]),
    L("-ing: drop the silent e", tyG(INGE),
      ["Look at the end of the word. Is there a silent e?", "When a word ends in silent e, take the <b>e</b> away, then add <b>ing</b>.", "Example: 'love' ➜ drop e ➜ 'lov' + 'ing' = 'loving'. Now do yours."],
      [S("Silent e rule", "make ➜ mak<b>ing</b>", "If a word ends with silent e, drop the e before adding <b>-ing</b>."), S("Why?", "ride ➜ riding", "Two vowels together would look odd: 'rideing'. So the e goes away."), S("Tip", "✂️", "Cut the e, then add ing.")]),
    L("-ing: double the last letter", tyG(DBL),
      ["Look at the word. It has one vowel then one consonant at the end.", "Short word, one vowel, one consonant at the end: double the last letter, then add <b>ing</b>.", "Example: 'tap' ➜ 'tapp' + 'ing' = 'tapping'. Now do yours."],
      [S("Doubling rule", "hop ➜ ho<b>pp</b>ing", "In a short word with one vowel and one consonant at the end, double the consonant before <b>-ing</b>."), S("Why?", "hoping vs hopping", "Doubling keeps the vowel short. 'Hoping' (hope) and 'hopping' (hop) are different words!"), S("Tip", "✌️", "Count: one vowel, one consonant at the end? Double it.")]),
    L("Compound words", tyG(COMP),
      ["A compound word is two small words stuck together.", "Write the first word, then the second word right next to it with no space.", "Example: 'door' + 'bell' = 'doorbell'. Now do yours."],
      [S("Compound words", "sun + flower", "Two small words join together to make one new word."), S("No space", "sunflower", "Write them with no space and no change."), S("Tip", "🧩", "Say each small word, then put them together.")]),
    L("Contractions", mcG(CONTR),
      ["A contraction squishes two words into one.", "An apostrophe (') takes the place of the letters that go missing. Which choice has the right pair of words?", "Example: 'could not' ➜ 'couldn't': the o in 'not' is gone. Now find yours."],
      [S("Contractions", "do not ➜ don<b>'</b>t", "A contraction is a short way to write two words."), S("The apostrophe", "I am ➜ I<b>'</b>m", "The apostrophe (') shows where letters are missing."), S("Tip", "🔎", "Say the two words quickly. They make the short word!")]),
    L("Tricky sight words", rightG(SIGHT),
      ["Some words do not spell the way they sound. Say it slowly.", "Picture the word in your mind. Which spelling have you seen in books?", "Example: 'does' is not spelled 'duz'. You just have to learn it. Now find yours."],
      [S("Tricky words", "said · friend · people", "Some words are spelled in surprising ways. We learn them by heart."), S("Look, say, cover, write", "👀 ➜ 🗣️ ➜ 🙈 ➜ ✏️", "Look at the word, say it, cover it, write it, then check."), S("Tip", "📚", "The more you read these words, the more they look right.")]),
    L("Opposites 2", mcG(OPP4),
      ["Opposites are words that mean the very different thing.", "Think of the word and its opposite, like hot and cold. Which choice is the opposite?", "Example: the opposite of 'tall' is 'short'. Now find yours."],
      [S("Opposites", "hot ↔ cold", "Opposites are words with meanings that are as different as can be."), S("Examples", "early ↔ late", "Day and night, up and down. Look for the word that goes the other way."), S("Tip", "↔️", "Picture the word, then picture the exact opposite.")]),
    L("Count the syllables", () => { const [w, n] = pick(SYLL_ALL); return { text: `How many syllables are in <b>${w}</b>?`, say: w, choices: [1, 2, 3, 4], answer: n, it: [w] }; },
      ["A syllable is one beat of a word. Say the word slowly.", "Put your hand under your chin and say the word. Your chin drops once for every syllable.", "Example: 'sunflower' = sun-flow-er, 3 syllables. Now do yours."],
      [S("Syllables", "ba·na·na", "A syllable is a beat in a word. Every syllable has a vowel sound."), S("Chin trick", "🧑", "Your chin drops down once for each syllable you say."), S("Tip", "👏", "Clap each beat. The number of claps is the number of syllables.")]),
    L("Word families", FAM_Q,
      ["Words in a family end with the same letters.", "Look at the last letters of each choice. Which one matches the family ending?", "Example: in the -at family: cat, hat, mat. 'Cup' is not in it."],
      [S("Word families", "c<b>at</b> · h<b>at</b> · m<b>at</b>", "Words in a word family end with the same letters and rhyme."), S("Change the start", "-ock ➜ clock, sock, rock", "Change just the first letters and you make new words."), S("Tip", "🏠", "Look at how the word ends. That is its family.")]),
    L("Spell two-part words", spellG(TWO),
      ["Say the word in parts (syllables) and spell one part at a time.", q => `${info(q.it[0])} Spell it part by part.`, "Example: 'basket' = bas + ket. Write b-a-s, then k-e-t. Now do yours."],
      [S("Spell in parts", "rab · bit", "Long words are easier in parts. Say each syllable and write it."), S("Watch the middle", "pen · cil", "The middle of the word is where people slip up. Go slowly."), S("Tip", "🔍", "Check each part again when you finish.")])
  ];
  A4.push(MIX("Mixed practice", [A4[1], A4[3], A4[7], A4[12]]));
  A4.push(MIX("Level 4 Challenge", [A4[2], A4[5], A4[9], A4[11], A4[13], A4[14]]));

  // ================= LEVEL 5 =================
  const C_WORDS = [["cat","k"],["city","s"],["cent","s"],["cup","k"],["face","s"],["circle","s"],["candy","k"],["ice","s"],["cake","k"],["pencil","s"],["corn","k"],["dance","s"],["cycle","s"],["camel","k"]];
  const G_WORDS = [["gem","j"],["giant","j"],["cage","j"],["page","j"],["gym","j"],["giraffe","j"],["goat","g"],["game","g"],["green","g"],["bag","g"],["gate","g"],["goose","g"],["grass","g"],["magic","j"]];
  const softQ = (letter, hard, soft, hardLbl, softLbl, items) => () => {
    const [w, s] = pick(items);
    return { text: `What sound does the <b>${letter}</b> make in <b>${w}</b>?`, say: w, choices: shuf([hardLbl, softLbl]), answer: s === hard ? hardLbl : softLbl, it: [w] };
  };
  const SOFT_SPELL = [["ice","🧊"],["dice","🎲"],["face","🙂"],["circle","⭕"],["pencil","✏️"],["gem","💎"],["giraffe","🦒"],["page","📄"],["bridge","🌉"],["city","🏙️"],["bicycle","🚲"],["cent","🪙"]];
  const SIL_START = [["knee","🦵","kn"],["knot","🪢","kn"],["knock","🚪","kn"],["knit","🧶","kn"],["wrap","🎁","wr"],["write","✍️","wr"],["wrist","⌚","wr"],["wrench","🔧","wr"],["gnat","🦟","gn"],["gnaw","🐭","gn"]];
  const SIL_B = [["lamb",["lam","lamm"],"🐑"],["thumb",["thum","thumm"],"👍"],["comb",["com","comm"],"💇"],["climb",["clim","climm"],"🧗"],["crumb",["crum","crumm"],"🍞"],["numb",["num","numm"]],["limb",["lim","limm"]],["plumber",["plumer","plummer"],"🔧"]];
  const SIL_MIX = [["castle","t"],["listen","t"],["whistle","t"],["island","s"],["knife","k"],["write","w"],["lamb","b"],["walk","l"],["half","l"],["talk","l"],["gnat","g"],["hour","h"],["honest","h"],["wrong","w"]];
  const SIL_Q = () => {
    const it = pick(SIL_MIX), [w, a] = it, others = [...new Set(w.split(""))].filter(c => c !== a);
    return { text: `Which letter is <b>silent</b> in <b>${w}</b>?`, say: w, choices: shuf([a, ...shuf(others).slice(0, 2)]), answer: a, it };
  };
  const LONG_A = [["cake",["caik","cayk"]],["rain",["rane","rayn"]],["play",["plai","plae"]],["make",["maik","mayk"]],["snail",["snale","snayl"]],["day",["dai","dae"]],["late",["layt","lait"]],["paint",["paynt","paente"]],["tray",["trai","trae"]],["chain",["chane","chayn"]],["brave",["braive","brayv"]],["stay",["stai","stae"]]];
  const LONG_E = [["green",["grene","grean"]],["sleep",["sleap","slepe"]],["beach",["beatch","beche"]],["tree",["trea","tre"]],["eat",["eet","ete"]],["seed",["sead","sede"]],["happy",["happee","hapy"]],["baby",["babee","babi"]],["leaf",["leef","leaff"]],["sweet",["sweit","swete"]],["jelly",["jelee","jely"]]];
  const LONG_IO = [["night",["nite","nyte"]],["light",["liet","lyte"]],["fly",["fli","flie"]],["pie",["pi","pye"]],["cry",["cri","crie"]],["boat",["bote","bowt"]],["snow",["snoe","snoa"]],["home",["hoam","hohm"]],["toast",["toest","tost"]],["goat",["gote","gowt"]],["window",["windoe","windo"]],["yellow",["yelow","yello"]]];
  const AEA = [["chair","🪑","air"],["stair","🪜","air"],["hair","💇","air"],["fair","🎡","air"],["square","◼️","are"],["share","🤝","are"],["hare","🐇","are"],["bear","🐻","ear"],["pear","🍐","ear"],["wear","👕","ear"]];
  const AUAW = [["paw","🐾","aw"],["claw","🦞","aw"],["straw","🥤","aw"],["draw","✏️","aw"],["yawn","🥱","aw"],["lawn","🌱","aw"],["dawn","🌅","aw"],["sauce","🥫","au"],["autumn","🍂","au"],["launch","🚀","au"],["pause","⏸️","au"],["author","📚","au"]];
  const UN = ["happy","lock","fair","kind","tie","safe","lucky","clear","well","do","pack","fold"].map(w => [`Add <b>un-</b> ("not" or "the opposite") to <b>${w}</b>.`, "un" + w]);
  const RE = ["play","do","tell","write","build","read","fill","open","paint","use","start","name"].map(w => [`Add <b>re-</b> ("again") to <b>${w}</b>.`, "re" + w]);
  const FUL = [["care","ful","full of care","careful"],["care","less","without care","careless"],["help","ful","full of help","helpful"],["help","less","without help","helpless"],["hope","ful","full of hope","hopeful"],["hope","less","without hope","hopeless"],["use","ful","full of use","useful"],["use","less","without use","useless"],["color","ful","full of color","colorful"],["pain","ful","full of pain","painful"],["pain","less","without pain","painless"],["fear","less","without fear","fearless"],["harm","less","without harm","harmless"],["wonder","ful","full of wonder","wonderful"]].map(([b, s, m, a]) => [`<b>${b}</b> + <b>-${s}</b> means "${m}". Spell the new word.`, a]);
  const ER_EST = [["tall","taller","tallest"],["big","bigger","biggest"],["hot","hotter","hottest"],["fast","faster","fastest"],["happy","happier","happiest"],["funny","funnier","funniest"],["nice","nicer","nicest"],["large","larger","largest"],["slow","slower","slowest"],["sad","sadder","saddest"],["easy","easier","easiest"],["busy","busier","busiest"]];
  const ER_Q = [];
  ER_EST.forEach(([b, e, s]) => { ER_Q.push([`Add <b>-er</b> to <b>${b}</b> (more ${b}).`, e]); ER_Q.push([`Add <b>-est</b> to <b>${b}</b> (the most ${b}).`, s]); });
  const PLUR2 = [["baby","babies"],["puppy","puppies"],["city","cities"],["story","stories"],["family","families"],["berry","berries"],["leaf","leaves"],["wolf","wolves"],["knife","knives"],["loaf","loaves"],["child","children"],["mouse","mice"],["man","men"],["woman","women"],["foot","feet"],["tooth","teeth"],["goose","geese"]].map(([a, b]) => [`More than one <b>${a}</b> is …`, b]);
  const HOMO1 = [["I can ___ a bird in the tree.","see",["sea"]],["We swam in the ___.","sea",["see"]],["Can you ___ the music?","hear",["here"]],["Come over ___!","here",["hear"]],["I ___ the answer.","know",["no"]],["There is ___ milk left.","no",["know"]],["I ___ a letter to Gran.","write",["right"]],["Turn ___ at the corner.","right",["write"]],["I have ___ eyes.","two",["to","too"]],["We walked ___ the park.","to",["two","too"]],["I want some, ___!","too",["two","to"]],["___ is a cat on the mat.","There",["Their","They're"]],["The kids put on ___ coats.","their",["there","they're"]],["___ going to school.","They're",["There","Their"]],["A ___ landed on the flower.","bee",["be"]],["I want to ___ a pilot.","be",["bee"]]].map(([t, a, d]) => [t.replace("___", "<b>___</b>"), a, d.slice(0, 2)]);
  const ABC_G = { s: ["sun","sand","sea","ship","star","soap","snow","spoon","swim","slide"], c: ["cat","cow","cup","city","clap","cheese","crab","cube"], b: ["bat","bed","big","box","bus","bird","blue","brush"], p: ["pan","pen","pig","pot","pup","play","plum","peach"], t: ["tab","ten","tip","top","tub","tree","train","thumb"], m: ["map","men","mix","mop","mud","moon","milk","mule"], f: ["fan","fed","fin","fox","fun","fish","flag","frog"] };
  const ABC_Q = () => {
    const g = pick(Object.keys(ABC_G)), used = new Set(), ws = [];
    for (const w of shuf(ABC_G[g])) { if (!used.has(w[1])) { used.add(w[1]); ws.push(w); if (ws.length === 3) break; } }
    const sorted = [...ws].sort(), first = Math.random() < 0.5;
    return { text: `Which word comes <b>${first ? "first" : "last"}</b> in ABC order?`, choices: shuf(ws), answer: first ? sorted[0] : sorted[2], it: [ws[0]] };
  };

  const A5 = [
    L("Soft c: s or k?", softQ("c", "k", "s", "k (like cat)", "s (like sun)", C_WORDS),
      ["Look at the letter right after the <b>c</b>.", "When c comes before e, i or y it usually says s. Before a, o or u it says k.", "Example: 'cent' has e after c, so c says s. 'Cot' has o after c, so c says k."],
      [S("Two sounds for c", "<b>c</b>at · <b>c</b>ity", "The letter <b>c</b> can say k (cat) or s (city)."), S("The rule", "ce · ci · cy ➜ s", "When c is followed by <b>e, i or y</b>, it says s: cent, city, cycle."), S("Otherwise", "ca · co · cu ➜ k", "Before a, o, u, it says k: cat, corn, cup.")]),
    L("Soft g: g or j?", softQ("g", "g", "j", "g (like goat)", "j (like jam)", G_WORDS),
      ["Look at the letter right after the <b>g</b>.", "When g comes before e, i or y it often says j. Before a, o, u it says g.", "Example: 'germ' has e after g, so it says j. 'Gum' has u after g, so it says g."],
      [S("Two sounds for g", "<b>g</b>oat · <b>g</b>em", "The letter <b>g</b> can say g (goat) or j (gem)."), S("The rule", "ge · gi · gy ➜ j", "Before <b>e, i or y</b>, g often says j: gem, giant, gym."), S("Careful", "ga · go · gu ➜ g", "Before a, o, u it says g: game, goat, gum.")]),
    L("Spell soft c and g words", spellG(SOFT_SPELL),
      ["Press 🔊. Listen for an s sound or a j sound in the word.", q => `${info(q.it[0])} The s or j sound uses c or g followed by e, i or y.`, "Example: 'fence': f-e-n-c-e: the s sound is spelled with c before e. Now do yours."],
      [S("Soft sounds", "ice · gem", "When you hear s or j, it may be a soft <b>c</b> or <b>g</b>."), S("Look for e, i, y", "c<b>e</b>nt · g<b>i</b>ant", "A soft c or g is followed by e, i or y."), S("Tip", "✏️", "Say the word slowly, then think: could this be a soft c or g?")]),
    L("Silent letters at the start", blankG(SIL_START, ["kn", "wr", "gn"]),
      ["Press 🔊 and look at the picture. The first letter of these words is silent.", "kn says n, wr says r, gn says n. Which start gives the sound you hear?", "Example: 'wreck' starts with the r sound, spelled wr. 'Knob' starts with n, spelled kn."],
      [S("Silent k", "<b>k</b>nee · <b>k</b>not", "In <b>kn</b> words the k is silent. You only say n."), S("Silent w", "<b>w</b>rite · <b>w</b>rap", "In <b>wr</b> words the w is silent. You only say r."), S("Silent g", "<b>g</b>nat · <b>g</b>naw", "In <b>gn</b> words the g is silent. You only say n.")]),
    L("Silent b", rightG(SIL_B),
      ["Say the word out loud. Is there a b sound at the end?", "In these words the <b>b</b> comes after an m at the end and stays quiet.", "Example: 'dumb' is spelled d-u-m-b with a silent b. Now find yours."],
      [S("Silent b", "lam<b>b</b> · thum<b>b</b>", "After <b>m</b> at the end of a word, a <b>b</b> is often silent."), S("More words", "comb · climb · crumb", "You say the m but not the b."), S("Tip", "🧠", "Learn the look of the word: m then b.")]),
    L("Which letter is silent?", SIL_Q,
      ["Say the word out loud and listen to each letter.", "One letter does not make any sound at all. Which one can you not hear?", "Example: in 'comb' you hear c-o-m but not the b. The silent letter is b."],
      [S("Silent letters", "<b>k</b>nife · cas<b>t</b>le", "Some letters are written but not said."), S("Where?", "wa<b>l</b>k · <b>h</b>our", "They can be at the start, middle or end of a word."), S("Tip", "👂", "Say it slowly and listen for every sound.")]),
    L("Long a spellings", rightG(LONG_A),
      ["Press 🔊 and say the word. Listen for the long a sound.", "Long a can be spelled <b>a_e</b>, <b>ai</b> or <b>ay</b>. ai is in the middle, ay is at the end.", "Example: 'tray' ends with ay. 'Train' has ai in the middle. Now find yours."],
      [S("Three ways", "c<b>a</b>k<b>e</b> · r<b>ai</b>n · pl<b>ay</b>", "The long a sound can be spelled <b>a_e</b>, <b>ai</b> or <b>ay</b>."), S("Where?", "ai in the middle", "<b>ai</b> is usually in the middle. <b>ay</b> is usually at the end."), S("Tip", "👀", "Pick the spelling that looks right.")]),
    L("Long e spellings", rightG(LONG_E),
      ["Press 🔊 and say the word. Listen for the long e sound.", "Long e can be <b>ee</b>, <b>ea</b>, or <b>y</b> at the end of a longer word.", "Example: 'peach' uses ea. 'Funny' ends in y that says e. Now find yours."],
      [S("Long e", "tr<b>ee</b> · l<b>ea</b>f · happ<b>y</b>", "The long e sound can be <b>ee</b>, <b>ea</b>, or <b>y</b> at the end."), S("Words ending in y", "baby · jelly", "At the end of a word with two syllables, y often says long e."), S("Tip", "🌳", "Say the word, then picture how it looks in a book.")]),
    L("Long i and long o spellings", rightG(LONG_IO),
      ["Press 🔊 and say the word. Is it a long i or a long o?", "Long i can be <b>igh</b>, <b>y</b> or <b>ie</b>. Long o can be <b>oa</b>, <b>ow</b> or <b>o_e</b>.", "Example: 'high' uses igh. 'Coat' uses oa. Now find yours."],
      [S("Long i", "n<b>igh</b>t · fl<b>y</b> · p<b>ie</b>", "Long i can be <b>igh, y</b> or <b>ie</b>."), S("Long o", "b<b>oa</b>t · sn<b>ow</b> · h<b>o</b>m<b>e</b>", "Long o can be <b>oa, ow</b> or <b>o_e</b>."), S("Tip", "🔎", "Think of a word you know that rhymes and spell it the same way.")]),
    L("air, are and ear", blankG(AEA, ["air", "are", "ear"]),
      ["Press 🔊 and look at the picture. All three endings make the same sound.", "Use the picture. Think about which spelling you have seen in this word.", "Example: 'stare' uses are. 'Fair' uses air. 'Tear' (to rip) uses ear."],
      [S("Same sound", "ch<b>air</b> · sh<b>are</b> · b<b>ear</b>", "<b>air, are</b> and <b>ear</b> can all make the same sound."), S("Look at the picture", "🪑 🐻", "Many are different words that sound alike. The picture tells you which one."), S("Tip", "🧠", "Learn the common ones: chair, stair, share, square, bear, pear.")]),
    L("au and aw", blankG(AUAW, ["au", "aw"], 2),
      ["Press 🔊 and look at the picture. Both spellings make the same sound.", "<b>aw</b> is often at the end of a word or before n or l. <b>au</b> is usually in the middle.", "Example: 'saw' ends with aw. 'Haul' has au in the middle."],
      [S("Same sound", "p<b>aw</b> · s<b>au</b>ce", "<b>au</b> and <b>aw</b> make the same sound."), S("aw", "claw · lawn · yawn", "<b>aw</b> comes at the end of a word, or before <b>n</b> or <b>l</b>."), S("au", "sauce · pause", "<b>au</b> is usually in the middle of a word.")]),
    L("Prefix un-", tyG(UN),
      ["un- means 'not' or 'the opposite of'.", "Put <b>un</b> in front of the word. The base word stays the same.", "Example: un + 'clean' = 'unclean'. Now do yours."],
      [S("A prefix", "<b>un</b>happy", "A prefix is a small word part added to the <b>start</b> of a word."), S("un- means not", "unlock = not locked", "<b>un-</b> means 'not' or 'the opposite of'."), S("Tip", "🔄", "Do not change the base word. Just add un- at the front.")]),
    L("Prefix re-", tyG(RE),
      ["re- means 'again'.", "Put <b>re</b> in front of the word. The base word stays the same.", "Example: re + 'heat' = 'reheat' (heat again). Now do yours."],
      [S("Prefix re-", "<b>re</b>play", "<b>re-</b> means 'again'."), S("Examples", "redo · retell · rewrite", "Redo = do again. Retell = tell again."), S("Tip", "🔁", "Add re- to the front and keep the base word the same.")]),
    L("Endings -ful and -less", tyG(FUL),
      ["-ful means 'full of'. -less means 'without'.", "Write the base word and add the ending. Only one l in -ful!", "Example: 'thought' + ful = 'thoughtful'. 'Spot' + less = 'spotless'. Now do yours."],
      [S("-ful", "care<b>ful</b>", "<b>-ful</b> means 'full of'. Careful = full of care. It has only <b>one l</b>."), S("-less", "care<b>less</b>", "<b>-less</b> means 'without'. Careless = without care."), S("Tip", "⚖️", "Full of or without? Choose the ending that fits.")]),
    L("Endings -er and -est", tyG(ER_Q),
      ["-er compares two things. -est compares three or more.", "Ends in e: just add r or st. Ends in y: change y to i. Short vowel + consonant: double the consonant.", "Example: 'thin' ➜ 'thinner' (double the n). 'Dry' ➜ 'drier' (y to i)."],
      [S("Comparing", "tall<b>er</b> · tall<b>est</b>", "<b>-er</b> compares two things. <b>-est</b> means the most."), S("Spelling changes", "big ➜ bigger · happy ➜ happier", "Double the last letter in short words (big). Change y to i (happy)."), S("Silent e", "nice ➜ nicer, nicest", "If the word already ends in e, just add r or st.")]),
    L("Plurals: ies, ves and odd ones", tyG(PLUR2),
      ["Look at the end of the word. Is it a y, an f, or a special word?", "After a consonant, change y to i + es. For f or fe, change to ves. Some are special and you just learn them.", "Example: 'lady' ➜ 'ladies'. 'Elf' ➜ 'elves'. 'Ox' ➜ 'oxen'."],
      [S("y to ies", "baby ➜ bab<b>ies</b>", "If a word ends in a consonant and y, change the y to <b>i</b> and add <b>es</b>."), S("f to ves", "leaf ➜ lea<b>ves</b>", "Some words ending in f or fe change to <b>ves</b>: wolf, knife, loaf."), S("Odd ones", "child ➜ children · mouse ➜ mice", "Some plurals just change. Learn them by heart: man/men, foot/feet, tooth/teeth.")]),
    L("Homophones 1", mcG(HOMO1),
      ["Homophones sound the same but are spelled differently.", "Read the sentence and think about the meaning of the missing word.", "Example: 'I ___ you.' means to look at someone: 'see'. 'The ___ is blue' is the water: 'sea'."],
      [S("Homophones", "see · sea", "Homophones sound the same but have <b>different spellings and meanings</b>."), S("Examples", "to · two · too", "to the park, two cats, me too!"), S("Tip", "📖", "Read the whole sentence. The meaning tells you which one fits.")]),
    L("ABC order: three words", ABC_Q,
      ["Look at the first letters of the words. They might all be the same.", "If the first letters match, look at the second letters. Which one is earliest in the alphabet?", "Example: cat, cow, cup. Second letters a, o, u. A comes first, so 'cat' is first and 'cup' is last."],
      [S("ABC order", "A B C D E F G …", "Words in a dictionary are in alphabet order."), S("Same first letter?", "<b>c</b>at · <b>c</b>ow · <b>c</b>up", "Look at the <b>second letter</b>: a, o, u."), S("Tip", "🎵", "Sing the alphabet song to see which letter comes first.")])
  ];
  A5.push(MIX("Mixed practice", [A5[0], A5[3], A5[11], A5[13]]));
  A5.push(MIX("Level 5 Challenge", [A5[1], A5[5], A5[7], A5[9], A5[15], A5[16]]));

  // ================= LEVEL 6 =================
  const TION = [["station",["stashun","stasion"]],["nation",["nashun","nasion"]],["action",["akshun","acsion"]],["vacation",["vacashun","vakasion"]],["lotion",["loshun","losion"]],["motion",["moshun","mosion"]],["mention",["menshun","mension"]],["section",["secshun","secsion"]],["fiction",["fikshun","ficsion"]],["question",["questun","kwestion"]]];
  const SIL2 = [["knight",["nite","knite"]],["island",["iland","ieland"]],["castle",["cassle","castel"]],["listen",["lissen","listin"]],["whistle",["whissle","wistle"]],["wrong",["rong","wrnog"]],["half",["haf","halv"]],["walk",["wawk","wolk"]],["talk",["tawk","tolk"]],["gnat",["nat","gnatt"]],["honest",["onest","honist"]]];
  const IGH = [["night","the time when it is dark"],["light","what a lamp gives so you can see"],["right","the opposite of left"],["bright","very shiny"],["flight","a trip on a plane"],["tight","not loose"],["sight","the sense you use your eyes for"],["high","not low"],["fright","a sudden scare"],["sigh","a long breath out when you are tired or sad"]].map(([w, c]) => [`Spell the word that means: <i>${c}</i>.`, w]);
  const VY = [["try","tried"],["cry","cried"],["hurry","hurried"],["carry","carried"],["study","studied"],["worry","worried"],["copy","copied"],["dry","dried"],["play","played"],["enjoy","enjoyed"],["stay","stayed"],["spy","spied"]].map(([a, b]) => [`Yesterday I ___ my best. Add <b>-ed</b> to <b>${a}</b> for the past tense.`, b]);
  const HOMO2 = [["Is this ___ coat?","your",["you're"]],["I think ___ right.","you're",["your"]],["I will ___ you at the gate.","meet",["meat"]],["We had ___ for dinner.","meat",["meet"]],["She is my ___.","daughter",["dotter"]],["The ___ is shining.","sun",["son"]],["He is my brother, her ___.","son",["sun"]],["I have ___ cats.","four",["for"]],["This gift is ___ you.","for",["four"]],["The sky is ___.","blue",["blew"]],["The wind ___ hard.","blew",["blue"]],["I ___ an apple.","ate",["eight"]],["I have ___ crayons.","eight",["ate"]],["We ___ the game!","won",["one"]],["I have ___ pet.","one",["won"]]].map(([t, a, d]) => [t.replace("___", "<b>___</b>"), a, d]);
  HOMO2.splice(4, 1); // remove the unclear item
  const HOMO3 = [["Mom baked bread with ___.","flour",["flower"]],["I picked a ___ for her.","flower",["flour"]],["The rabbit is a ___.","hare",["hair"]],["She brushed her ___.","hair",["hare"]],["The dog wagged its ___.","tail",["tale"]],["Gran read me a ___.","tale",["tail"]],["I ate the ___ pie.","whole",["hole"]],["The mole dug a ___.","hole",["whole"]],["The ___ is red.","pear",["pair"]],["I got a ___ of socks.","pair",["pear"]],["I had to ___ for the bus.","wait",["weight"]],["The ___ of the rock is heavy.","weight",["wait"]],["The ___ flew by.","plane",["plain"]],["That shirt is ___ white.","plain",["plane"]]].map(([t, a, d]) => [t.replace("___", "<b>___</b>"), a, d]);
  const POSS = [["Which sentence uses 's to show that something <b>belongs</b> to someone?","That is Mia's hat.",["Mia's happy today.","Mia's going home."]],["Which sentence uses 's to show that something <b>belongs</b> to someone?","The dog's bone is big.",["The dog's hungry.","The dog's running fast."]],["Which sentence uses 's to show that something <b>belongs</b> to someone?","Tom's bike is red.",["Tom's late for school.","Tom's eating lunch."]],["Which sentence uses 's to show that something <b>belongs</b> to someone?","I like my teacher's desk.",["My teacher's very kind.","My teacher's coming now."]],["In which sentence does 's mean <b>is</b>, not belonging?","She's my best friend.",["That is Ben's seat.","The bird's nest is high."]],["In which sentence does 's mean <b>is</b>, not belonging?","It's a sunny day.",["The cat's tail is long.","Sam's coat is blue."]],["In which sentence does 's mean <b>is</b>, not belonging?","He's reading a book.",["Anna's book is new.","The bear's cave is deep."]],["Which sentence uses 's to show that something <b>belongs</b> to someone?","The girl's backpack is green.",["The girl's tired.","The girl's playing outside."]]];
  const PRE = [["to not agree","disagree",["misagree","preagree"]],["to not like","dislike",["mislike","prelike"]],["to go out of sight","disappear",["misappear","preappear"]],["to spell wrong","misspell",["prespell","dispell"]],["to put in the wrong place","misplace",["preplace","displace"]],["to behave badly","misbehave",["prebehave","disbehave"]],["to look at before","preview",["misview","disview"]],["to heat before","preheat",["misheat","disheat"]],["a school before first grade","preschool",["misschool","disschool"]],["not honest","dishonest",["mishonest","prehonest"]]].map(([m, a, d]) => [`Which word means "${m}"?`, a, d]);
  const SUF = [["slow","ly","slowly"],["quiet","ly","quietly"],["soft","ly","softly"],["sad","ness","sadness"],["kind","ness","kindness"],["dark","ness","darkness"],["happy","ness","happiness"],["move","ment","movement"],["enjoy","ment","enjoyment"],["pay","ment","payment"],["happy","ly","happily"],["easy","ly","easily"],["lazy","ness","laziness"],["busy","ness","business"]].map(([b, s, a]) => [`Add <b>-${s}</b> to <b>${b}</b>.`, a]);
  const ROOT = [["unhappy","happy",["hap","unhap"]],["replay","play",["pla","re"]],["careful","care",["car","full"]],["runner","run",["runn","ner"]],["hopping","hop",["hopp","ping"]],["happily","happy",["happ","ily"]],["played","play",["plai","ed"]],["boxes","box",["boxe","es"]],["babies","baby",["bab","babi"]],["bigger","big",["bigg","er"]],["kindness","kind",["kin","ness"]],["disagree","agree",["dis","gree"]],["misspell","spell",["miss","mis"]],["quickly","quick",["qui","ly"]]].map(([w, r, d]) => [`What is the base (root) word in <b>${w}</b>?`, r, d]);
  const SPLIT = [["rab-bit",["ra-bbit","rabb-it"]],["pen-cil",["pe-ncil","penc-il"]],["win-dow",["wi-ndow","wind-ow"]],["bas-ket",["ba-sket","bask-et"]],["sun-set",["su-nset","suns-et"]],["pump-kin",["pum-pkin","pu-mpkin"]],["ti-ger",["tig-er","tige-r"]],["ba-by",["bab-y","b-aby"]],["o-pen",["op-en","ope-n"]],["pa-per",["pap-er","pape-r"]],["hap-py",["ha-ppy","happ-y"]],["mon-key",["mo-nkey","monk-ey"]]].map(([r, w]) => ["Which word is split into syllables the <b>right</b> way?", r, w]);
  const MEAN = [["The <b>bat</b> flew out of the cave at night.","a flying animal",["a stick used in baseball","a kind of fruit"]],["He hit the ball with a <b>bat</b>.","a stick used in baseball",["a flying animal","a kind of shoe"]],["The dog's <b>bark</b> was loud.","the sound a dog makes",["the skin of a tree","a small boat"]],["The <b>bark</b> of the tree is rough.","the outside of a tree",["the sound a dog makes","a kind of leaf"]],["She wears a gold <b>ring</b> on her finger.","a circle worn on a finger",["to make a bell sound","a kind of fruit"]],["The school bell will <b>ring</b>.","to make a bell sound",["a circle worn on a finger","to jump up high"]],["This bag is very <b>light</b>.","not heavy",["a lamp that shines","very loud"]],["Please turn on the <b>light</b>.","something that shines so we can see",["not heavy","a kind of bird"]],["Flowers bloom in <b>spring</b>.","a season of the year",["a bouncy coil","to fall down"]],["The toy has a metal <b>spring</b> inside.","a bouncy coil",["a season of the year","a kind of flower"]],["A <b>fly</b> sat on the table.","a small insect",["to move through the air","a kind of bird"]],["Birds can <b>fly</b>.","to move through the air",["a small insect","a big tree"]]];
  const SYN3 = [["huge","giant",["tiny","quiet"]],["rock","stone",["leaf","water"]],["road","street",["house","tree"]],["glad","happy",["sad","angry"]],["angry","mad",["calm","glad"]],["smart","clever",["silly","slow"]],["scared","afraid",["brave","warm"]],["shout","yell",["whisper","sleep"]],["talk","speak",["listen","run"]],["close","near",["far","late"]],["sick","ill",["well","tall"]],["gift","present",["lunch","price"]],["loud","noisy",["quiet","soft"]],["cold","chilly",["hot","warm"]]].map(([a, b, d]) => [`Which word means almost the same as <b>${a}</b>?`, b, d]);
  const ANT3 = [["smooth","rough",["flat","soft"]],["heavy","light",["large","thick"]],["cheap","expensive",["small","fast"]],["shallow","deep",["wide","low"]],["noisy","silent",["busy","loud"]],["narrow","wide",["thin","long"]],["ancient","modern",["old","dusty"]],["sweet","sour",["sticky","warm"]],["tidy","messy",["clean","small"]],["polite","rude",["quiet","funny"]],["awake","asleep",["alert","tired"]],["enter","exit",["arrive","open"]],["remember","forget",["think","learn"]],["tight","loose",["small","strong"]]].map(([a, b, d]) => [`What is the opposite of <b>${a}</b>?`, b, d]);
  const ANALOGY = [["Hot is to cold as up is to ___.","down",["high","top"]],["Puppy is to dog as kitten is to ___.","cat",["mouse","bird"]],["Bird is to nest as bee is to ___.","hive",["honey","wing"]],["Fish is to swim as bird is to ___.","fly",["sing","nest"]],["Day is to night as sun is to ___.","moon",["sky","star"]],["Teacher is to school as doctor is to ___.","hospital",["house","store"]],["Eye is to see as ear is to ___.","hear",["smell","look"]],["Cow is to moo as dog is to ___.","bark",["meow","quack"]],["Pen is to write as scissors are to ___.","cut",["draw","read"]],["Page is to book as petal is to ___.","flower",["tree","grass"]],["Hand is to glove as foot is to ___.","sock",["hat","coat"]]].map(([t, a, d]) => [t.replace("___", "<b>___</b>"), a, d]);
  const ABC_P = { ca: ["cab","can","cap","car","cat","cave","camp"], bo: ["boat","bone","book","bow","box","boy","bold"], st: ["star","step","stick","stop","stuck"], sp: ["spin","spot","spend","span","spud"], pa: ["pad","pan","pat","paw","pay","pass"], ba: ["bad","bag","ban","bat","back","bake"] };
  const ABC3 = () => {
    const g = pick(Object.keys(ABC_P)), used = new Set(), ws = [];
    for (const w of shuf(ABC_P[g])) { if (!used.has(w[2])) { used.add(w[2]); ws.push(w); if (ws.length === 3) break; } }
    const sorted = [...ws].sort(), mode = pick(["first", "last", "middle"]), ans = mode === "first" ? sorted[0] : mode === "last" ? sorted[2] : sorted[1];
    return { text: `Put these words in ABC order. Which one comes <b>${mode === "middle" ? "in the middle" : mode}</b>?`, choices: shuf(ws), answer: ans, it: [ws[0]] };
  };
  const DICT = ["ant","bat","bell","cake","cat","cow","dog","door","duck","egg","fish","frog","goat","hat","hill","jam","kite","lamp","lion","mop","moon","nest","owl","pig","rain","sun","tree","van","web","zoo"].sort();
  const GUIDE = () => {
    const i = ri(1, DICT.length - 9), j = i + ri(5, 8), inside = Math.random() < 0.5;
    let w;
    if (inside) w = DICT[ri(i + 1, j - 1)]; else w = (Math.random() < 0.5 || j >= DICT.length - 1) ? DICT[ri(0, i - 1)] : DICT[ri(j + 1, DICT.length - 1)];
    return { text: `The guide words on a dictionary page are <b>${DICT[i]}</b> and <b>${DICT[j]}</b>. Would you find <b>${w}</b> on this page?`, choices: ["Yes", "No"], answer: inside ? "Yes" : "No", it: [w] };
  };
  const DICTATE = [["beautiful","The rainbow was ___."],["together","We played ___ all day."],["everyone","___ in the class clapped."],["favorite","Blue is my ___ color."],["different","A cat is ___ from a dog."],["library","We got books at the ___."],["sometimes","___ I walk to school."],["tomorrow","Today is Monday, so ___ is Tuesday."],["yesterday","Today is Monday, so ___ was Sunday."],["surprise","We planned a ___ party."],["enough","I have ___ food to share."],["weather","The ___ is sunny today."],["animal","A lion is an ___."],["believe","I ___ you."],["answer","Raise your hand to ___ the question."]].map(([w, s]) => [`Listen and spell the missing word: ${s.replace("___", "<b>___</b>")}`, w, "", w]);

  const A6 = [
    L("Words ending in -tion", rightG(TION),
      ["Press 🔊 and say the word. Listen to the ending: it sounds like 'shun'.", "The 'shun' sound at the end of many words is spelled <b>tion</b> (not shun).", "Example: 'potion' is spelled with tion at the end. Now find yours."],
      [S("The shun sound", "sta<b>tion</b> · na<b>tion</b>", "The ending that sounds like 'shun' is usually spelled <b>-tion</b>."), S("More words", "action · lotion · motion", "Say the word, then write the sound as t-i-o-n."), S("Tip", "🧠", "Look at the choices. Which one looks like a word from a book?")]),
    L("Silent letters: tricky words", rightG(SIL2),
      ["Say the word out loud. One letter is written but not said.", "Think about which letter is silent: k in kn, w in wr, t in -stle, l in -alk, h in hon-.", "Example: 'wrist' has a silent w. 'Salmon' has a silent l. Now find yours."],
      [S("Silent letters", "<b>k</b>night · <b>w</b>rong", "Some letters are in the spelling but you do not say them."), S("In the middle", "cas<b>t</b>le · lis<b>t</b>en", "A silent t hides in castle, listen and whistle."), S("Tip", "👀", "Learn the look of these words and say them with every letter in your head.")]),
    L("Words with igh", tyG(IGH),
      ["The long i sound in these words is spelled <b>igh</b>.", "Most of these words have the letters <b>igh</b> in them. Think of the clue, then spell it.", "Example: for 'a strong fighter' you write 'mighty': m + igh + ty. Now do yours."],
      [S("igh", "n<b>igh</b>t · l<b>igh</b>t", "The letters <b>igh</b> make the long i sound."), S("Often ends with t", "right · bright · flight", "Many igh words end with <b>t</b>: night, light, right."), S("Tip", "💡", "Read the clue, then add igh to the sound you hear.")]),
    L("Verbs ending in y", tyG(VY),
      ["Look at the letter before the y. Is it a vowel (a, e, i, o, u) or a consonant?", "After a consonant, change y to i and add <b>ed</b>. After a vowel, just add <b>ed</b>.", "Example: 'bury' ➜ 'buried'. 'Obey' ➜ 'obeyed'. Now do yours."],
      [S("y after a consonant", "cry ➜ cr<b>ied</b>", "If a word ends in a consonant plus y, change the <b>y to i</b> and add <b>-ed</b>."), S("y after a vowel", "play ➜ played", "If a vowel comes before the y, just add <b>-ed</b>."), S("Tip", "🔍", "Check the letter before the y first.")]),
    L("Homophones 2", mcG(HOMO2),
      ["Homophones sound the same but have different spellings.", "Read the whole sentence and think about what the missing word means.", "Example: 'The wind ___' is 'blew'. 'The ___ sky' is 'blue'. Now do yours."],
      [S("Same sound", "meet · meat", "Homophones sound alike but mean different things."), S("Use the meaning", "I meet a friend. I eat meat.", "Think about what the sentence says to choose the right spelling."), S("Tip", "📖", "Read the sentence with each choice and see which one makes sense.")]),
    L("Homophones 3", mcG(HOMO3),
      ["Both choices sound the same. Think about what the sentence means.", "Read the sentence and decide which word fits the meaning.", "Example: 'The ___ of a dog wags' is 'tail'. 'A good ___' to tell is 'tale'. Now do yours."],
      [S("More homophones", "tail · tale", "Many words sound alike: tail/tale, hair/hare, pear/pair."), S("Meaning is the key", "whole pie · hole in the ground", "The sentence tells you which spelling to use."), S("Tip", "🔎", "Picture what the sentence is about.")]),
    L("Apostrophes: belonging or is?", mcG(POSS),
      ["An apostrophe + s can show belonging or can mean 'is'.", "If you can swap 's for 'is' and it still makes sense, it is a contraction. If not, it shows belonging.", "Example: 'Sam's hat' (the hat of Sam) shows belonging. 'Sam's here' means 'Sam is here'."],
      [S("Belonging", "Tom<b>'s</b> bike", "An apostrophe + s can show that something belongs to someone: Tom's bike."), S("Or 'is'", "She<b>'s</b> happy", "It can also be a short way to say <b>is</b>: she's = she is."), S("Test it", "Try 'is'", "Say 'is' instead of 's. If it still makes sense, it is a contraction.")]),
    L("Prefixes dis-, mis- and pre-", mcG(PRE),
      ["Prefixes go at the start of a word and change its meaning.", "dis- means 'not' or 'opposite', mis- means 'wrong', pre- means 'before'.", "Example: 'misread' = read wrong. 'Pre' + 'view' = 'preview' (view before)."],
      [S("dis-", "<b>dis</b>like", "<b>dis-</b> means 'not' or 'the opposite of': dislike, disagree."), S("mis-", "<b>mis</b>spell", "<b>mis-</b> means 'wrong' or 'badly': misspell, misplace."), S("pre-", "<b>pre</b>school", "<b>pre-</b> means 'before': preschool, preheat.")]),
    L("Endings -ly, -ness and -ment", tyG(SUF),
      ["Add the ending to the end of the base word.", "If the word ends in a consonant + y, change the y to i first. Otherwise just add the ending.", "Example: 'lucky' + ly = 'luckily'. 'Pay' + ment = 'payment'. Now do yours."],
      [S("-ly", "slow<b>ly</b>", "<b>-ly</b> tells how something is done: slowly, softly."), S("-ness and -ment", "kind<b>ness</b> · move<b>ment</b>", "<b>-ness</b> names a feeling or state. <b>-ment</b> names an action or result."), S("y to i", "happy ➜ happ<b>iness</b>", "If a word ends in consonant + y, change y to i: happily, happiness.")]),
    L("Find the base word", mcG(ROOT),
      ["A base (root) word is the main word with no prefix or ending.", "Take off any beginning (un-, re-, dis-) or ending (-ed, -ing, -er, -ly). What word is left?", "Example: 'unlock' ➜ take off 'un' ➜ 'lock'. 'Running' ➜ 'run' (the doubled n goes too)."],
      [S("Base words", "<b>play</b>ing · re<b>play</b>", "The base word is what is left when you remove prefixes and endings."), S("Careful with changes", "babies ➜ baby", "Sometimes the spelling changed (y became i, a letter doubled). Undo it."), S("Tip", "✂️", "Cut off the front and the end, and fix the spelling.")]),
    L("Split words into syllables", mcG(SPLIT),
      ["Syllables are the beats in a word. Say the word slowly.", "Two consonants in the middle? Split between them. One consonant between two vowels? Often split before it.", "Example: 'letter' ➜ let-ter (split between the tt). 'Tiger' ➜ ti-ger (one consonant)."],
      [S("Syllables", "pen · cil", "A syllable has one vowel sound. Say the word and listen for beats."), S("Two in the middle", "rab-bit", "When two consonants are in the middle, split <b>between</b> them."), S("One in the middle", "ti-ger", "When there is only one consonant between vowels, it often goes with the second part.")]),
    L("Words with two meanings", mcG(MEAN),
      ["Some words have more than one meaning. Read the whole sentence.", "The other words in the sentence give clues about which meaning is being used.", "Example: 'The tree <b>trunk</b> is wide.' means the main stem. 'The elephant's <b>trunk</b> is long' means its nose."],
      [S("Same word, different meaning", "bat 🦇 · bat 🏏", "Some words are spelled the same but mean different things."), S("Use clues", "He hit the ball with a bat.", "Other words in the sentence tell you the meaning."), S("Tip", "🔎", "Ask: which meaning makes sense here?")]),
    L("Synonyms 2", mcG(SYN3),
      ["Synonyms are words that mean almost the same thing.", "Think about what the word means, then look for the choice with nearly the same meaning.", "Example: 'big' and 'large' are synonyms. 'Small' is the opposite."],
      [S("Synonyms", "big = large", "Synonyms are different words with nearly the <b>same meaning</b>."), S("More examples", "glad = happy · quick = fast", "Using different synonyms makes your writing more interesting."), S("Tip", "🔄", "Try the choice in a sentence. Does it say the same thing?")]),
    L("Opposites 3", mcG(ANT3),
      ["Opposites (antonyms) have the most different meaning.", "Think of the word, then think of its exact opposite, not just a different word.", "Example: 'wide' and 'narrow' are opposites. Now do yours."],
      [S("Antonyms", "tight ↔ loose", "Antonyms are words with opposite meanings."), S("Careful", "heavy ↔ light", "Pick the word that goes exactly the other way, not just a similar word."), S("Tip", "↔️", "Check the choices: which one is truly the opposite?")]),
    L("Word pairs (analogies)", mcG(ANALOGY),
      ["An analogy shows how two words are connected, then asks for a matching pair.", "Figure out the connection in the first pair. Then use the same connection for the second pair.", "Example: 'Fish is to water as bird is to ___': fish lives in water, bird lives in the air. Now do yours."],
      [S("Word pairs", "hot : cold :: up : down", "'Hot is to cold as up is to down.' Both pairs are opposites."), S("Find the link", "puppy : dog", "A puppy is a baby dog. The link is baby and grown-up."), S("Tip", "🔗", "Say the link in a sentence, then use it again.")]),
    L("ABC order: three words", ABC3,
      ["Look at the first two letters. Are they the same?", "If the first letters match, check the second. If those match too, check the <b>third</b> letter.", "Example: 'cab', 'cap', 'cat'. Third letters b, p, t. B comes first, so 'cab' is first."],
      [S("Same start", "<b>ca</b>b · <b>ca</b>n · <b>ca</b>t", "When two letters match, look at the <b>third</b> letter."), S("Use the alphabet", "b ➜ n ➜ t", "b comes before n, and n comes before t."), S("Tip", "🎵", "Sing the alphabet to check which letter comes first.")]),
    L("Dictionary guide words", GUIDE,
      ["Guide words are the first and last words on a dictionary page.", "Is the word after the first guide word AND before the last? Check both in ABC order.", "Example: guide words 'bat' and 'cow'. 'Cake' is after bat and before cow, so yes. 'Dog' is after cow, so no."],
      [S("Guide words", "bat ... cow", "At the top of a dictionary page, two guide words show the <b>first and last</b> word on that page."), S("Between them", "cake ✔", "A word is on the page if it comes <b>after</b> the first guide word and <b>before</b> the last."), S("Tip", "📖", "Compare in ABC order. Use the second and third letters if the first letters match.")]),
    L("Listen and spell", tyG(DICTATE),
      ["Press 🔊 and listen. Say the word in parts (syllables), then write each part.", q => `${info(q.answer)} Say it in parts and write each one.`, "Example: 'holiday' = hol + i + day. Write each part, then check the whole word."],
      [S("Spell it in parts", "to·mor·row", "Break a long word into syllables and spell one part at a time."), S("Tricky spots", "friend · beautiful", "Look out for double letters, silent letters and vowel teams."), S("Check", "✅", "After you write it, read your word and compare it with how it sounds.")])
  ];
  A6.push(MIX("Mixed practice", [A6[0], A6[3], A6[7], A6[8]]));
  A6.push(MIX("Level 6 Challenge", [A6[1], A6[4], A6[9], A6[11], A6[14], A6[16], A6[17]]));

  Object.assign(SPELL_LEVELS, { 4: A4, 5: A5, 6: A6 });
})();
