// ext/french-4-6.js : French, levels 4-6 (1st grade 2nd half, 2nd grade).
(() => {
  const FR = "fr-FR";
  const S = (h, v, t) => ({ h, v, t });
  const lead = s => String(s).replace(/^[^A-Za-zÀ-ÿ0-9]+/, "")[0];
  const word = (fr, en, e) => `<span class="word" data-say="${fr}" data-lang="${FR}">${e ? e + " " : ""}<b>${fr}</b> = ${en} 🔊</span>`;
  const les = (title, gen, slides) => { gen.teach = () => slides; return { title, make: gen }; };
  const MIX = (title, ls) => {
    const make = () => pick(ls).make();
    make.teach = () => [S("Review time!", "🔄", "This lesson mixes ideas you already know. Here is a quick reminder of each one, then the quiz.")].concat(ls.slice(0, 4).map(l => { const t = l.make.teach(); return t[1] || t[0]; }));
    return { title, make };
  };
  const BK = (name, items, o = {}) => Object.assign({ name, items }, o);

  const NUM = [null, "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf", "vingt"];
  const TENS = { 20: "vingt", 30: "trente", 40: "quarante", 50: "cinquante", 60: "soixante" };
  const numFr = n => {
    if (n <= 20) return NUM[n];
    if (n === 100) return "cent";
    if (n < 70) { const t = Math.floor(n / 10) * 10, u = n % 10; return u === 0 ? TENS[t] : u === 1 ? TENS[t] + " et un" : TENS[t] + "-" + NUM[u]; }
    if (n < 80) { const r = n - 60; return r === 11 ? "soixante et onze" : "soixante-" + NUM[r]; }
    const r = n - 80; return r === 0 ? "quatre-vingts" : "quatre-vingt-" + NUM[r];
  };
  const cap = s => s[0].toUpperCase() + s.slice(1);

  // ---------- banks ----------
  const B = {
    months: BK("The months", [["janvier", "January"], ["février", "February"], ["mars", "March"], ["avril", "April"], ["mai", "May"], ["juin", "June"], ["juillet", "July"], ["août", "August"], ["septembre", "September"], ["octobre", "October"], ["novembre", "November"], ["décembre", "December"]], { tip: "In French, month names start with a small letter. Say them in order, like a song!" }),
    wx: BK("Talking about the weather", [["Il fait beau.", "The weather is nice.", "🌤️"], ["Il fait chaud.", "It is hot.", "🥵"], ["Il fait froid.", "It is cold.", "🥶"], ["Il pleut.", "It is raining.", "🌧️"], ["Il neige.", "It is snowing.", "❄️"], ["Il y a du vent.", "It is windy.", "💨"], ["Il y a du soleil.", "It is sunny.", "☀️"], ["Il y a des nuages.", "It is cloudy.", "☁️"]], { nopic: true, tip: "To ask, say <b>Quel temps fait-il ?</b> (What is the weather like?). Most answers start with <b>Il</b>." }),
    veg: BK("Fruit and vegetables", [["carotte", "carrot", "🥕"], ["tomate", "tomato", "🍅"], ["pomme de terre", "potato", "🥔"], ["maïs", "corn", "🌽"], ["oignon", "onion", "🧅"], ["salade", "lettuce", "🥬"], ["citron", "lemon", "🍋"], ["cerise", "cherry", "🍒"], ["poire", "pear", "🍐"], ["ananas", "pineapple", "🍍"], ["pêche", "peach", "🍑"], ["brocoli", "broccoli", "🥦"]]),
    meals: BK("Meals and treats", [["petit déjeuner", "breakfast", "🥣"], ["déjeuner", "lunch", "🥪"], ["dîner", "dinner", "🍝"], ["goûter", "afternoon snack", "🍎"], ["gâteau", "cake", "🎂"], ["glace", "ice cream", "🍦"], ["jus", "juice", "🧃"], ["soupe", "soup", "🍲"], ["chocolat", "chocolate", "🍫"], ["croissant", "croissant", "🥐"]], { tip: "In France, children often have a <b>goûter</b> after school, like bread with chocolate or a piece of fruit." }),
    cmd: BK("In the classroom", [["Écoutez !", "Listen!", "👂"], ["Regardez !", "Look!", "👀"], ["Lisez !", "Read!", "📖"], ["Écrivez !", "Write!", "✏️"], ["Levez la main !", "Raise your hand!", "🙋"], ["Asseyez-vous !", "Sit down!", "🪑"], ["Levez-vous !", "Stand up!", "🧍"], ["Répétez !", "Repeat!", "🔁"], ["Silence !", "Quiet!", "🤫"], ["Ouvrez le livre.", "Open the book.", "📕"]], { tip: "These are commands a French teacher might say. The ending <b>-ez</b> is the polite way to speak to a class." }),
    desc: BK("Describing words", [["rapide", "fast", "🐇"], ["lent", "slow", "🐌"], ["long", "long", "📏"], ["court", "short (not long)", "🩳"], ["joli", "pretty", "🌺"], ["vieux", "old", "👴"], ["nouveau", "new", "🆕"], ["fort", "strong", "💪"], ["drôle", "funny", "😂"], ["gentil", "kind", "🤗"]], { tip: "Describing words usually come after the noun: un chat <b>rapide</b>." }),
    erv: BK("More action verbs", [["regarder", "to watch", "👀"], ["écouter", "to listen", "👂"], ["danser", "to dance", "💃"], ["nager", "to swim", "🏊"], ["marcher", "to walk", "🚶"], ["travailler", "to work", "💼"], ["dessiner", "to draw", "🖍️"], ["voyager", "to travel", "🧳"], ["cuisiner", "to cook", "🧑‍🍳"], ["acheter", "to buy", "🛒"]], { tip: "All of these end in <b>-er</b>. You already know how to change -er verbs: je parle, tu parles, nous parlons." }),
    body2: BK("More about the body", [["bras", "arm", "💪"], ["jambe", "leg", "🦵"], ["dos", "back"], ["ventre", "tummy"], ["cheveux", "hair", "💇"], ["dent", "tooth", "🦷"], ["doigt", "finger", "👆"], ["genou", "knee"], ["coude", "elbow"], ["cou", "neck"], ["épaule", "shoulder"]], { tip: "<b>Cheveux</b> (hair) is always plural: les cheveux." }),
    clo2: BK("More clothes", [["jupe", "skirt", "👗"], ["short", "shorts", "🩳"], ["pull", "sweater"], ["écharpe", "scarf", "🧣"], ["gants", "gloves", "🧤"], ["bottes", "boots", "🥾"], ["lunettes", "glasses", "👓"], ["casquette", "cap", "🧢"], ["maillot de bain", "swimsuit", "🩱"], ["pyjama", "pajamas", "😴"]]),
    rooms: BK("Rooms and things at home", [["salon", "living room", "🛋️"], ["chambre", "bedroom", "🛏️"], ["jardin", "garden", "🌷"], ["garage", "garage", "🚗"], ["escalier", "stairs"], ["toit", "roof"], ["mur", "wall", "🧱"], ["lampe", "lamp", "💡"], ["tapis", "rug"], ["miroir", "mirror", "🪞"]]),
    wild: BK("Wild animals", [["lion", "lion", "🦁"], ["éléphant", "elephant", "🐘"], ["girafe", "giraffe", "🦒"], ["ours", "bear", "🐻"], ["loup", "wolf", "🐺"], ["renard", "fox", "🦊"], ["serpent", "snake", "🐍"], ["grenouille", "frog", "🐸"], ["tigre", "tiger", "🐯"], ["souris", "mouse", "🐭"], ["papillon", "butterfly", "🦋"], ["abeille", "bee", "🐝"]]),
    prep: BK("Where is it?", [["sur", "on"], ["sous", "under"], ["dans", "in"], ["devant", "in front of"], ["derrière", "behind"], ["entre", "between"], ["à côté de", "next to"], ["avec", "with"], ["sans", "without"]], { tip: "Try it: <b>Le chat est sous la table.</b> (The cat is under the table.)" }),
    qphr: BK("Asking questions", [["Qu'est-ce que c'est ?", "What is it?"], ["Qui est-ce ?", "Who is it?"], ["Où est la maison ?", "Where is the house?"], ["Quelle heure est-il ?", "What time is it?"], ["Combien ça coûte ?", "How much does it cost?"], ["Pourquoi ?", "Why?"], ["Quel jour sommes-nous ?", "What day is it?"], ["Tu parles français ?", "Do you speak French?"]], { tip: "Your voice goes up at the end of a question." }),
    ilya: BK("There is, there are", [["Il y a un chat.", "There is a cat.", "🐱"], ["Il y a deux chiens.", "There are two dogs.", "🐶🐶"], ["Il y a une fleur.", "There is a flower.", "🌸"], ["Il y a trois pommes.", "There are three apples.", "🍎🍎🍎"], ["Il y a un arbre.", "There is a tree.", "🌳"], ["Il y a des étoiles.", "There are stars.", "✨"], ["Il n'y a pas de pain.", "There is no bread."], ["Il y a beaucoup d'oiseaux.", "There are lots of birds."]], { tip: "<b>Il y a</b> works for one thing or many things. It never changes!" }),
    money: BK("Money and shopping", [["un euro", "one euro", "💶"], ["un centime", "one cent", "🪙"], ["Combien ça coûte ?", "How much is it?"], ["C'est cher.", "It is expensive."], ["C'est bon marché.", "It is cheap."], ["Je voudrais acheter ça.", "I would like to buy this."], ["la monnaie", "change"], ["un magasin", "a shop", "🏪"], ["payer", "to pay"]], { tip: "In France and many other countries, people pay with <b>euros</b>." }),
    cafe: BK("At the café", [["Je voudrais un jus d'orange.", "I would like an orange juice.", "🧃"], ["Je voudrais de l'eau.", "I would like some water.", "💧"], ["L'addition, s'il vous plaît.", "The check, please."], ["Une table pour deux.", "A table for two."], ["C'est délicieux !", "It is delicious!", "😋"], ["Le menu, s'il vous plaît.", "The menu, please.", "📋"], ["Je n'ai plus faim.", "I am not hungry anymore."], ["Un croissant, s'il vous plaît.", "A croissant, please.", "🥐"]], { nopic: true, tip: "<b>Je voudrais</b> means \"I would like\". It is a very polite way to ask." }),
    countries: BK("Countries", [["la France", "France", "🇫🇷"], ["le Canada", "Canada", "🇨🇦"], ["la Belgique", "Belgium", "🇧🇪"], ["la Suisse", "Switzerland", "🇨🇭"], ["le Sénégal", "Senegal", "🇸🇳"], ["les États-Unis", "the United States", "🇺🇸"], ["l'Espagne", "Spain", "🇪🇸"], ["l'Italie", "Italy", "🇮🇹"], ["l'Allemagne", "Germany", "🇩🇪"], ["le Japon", "Japan", "🇯🇵"], ["le Mexique", "Mexico", "🇲🇽"], ["le Brésil", "Brazil", "🇧🇷"]], { tip: "Say where you live with <b>J'habite</b>: J'habite en France, J'habite au Canada." }),
    nat: BK("Nationalities", [["français", "French", "🇫🇷"], ["canadien", "Canadian", "🇨🇦"], ["belge", "Belgian", "🇧🇪"], ["suisse", "Swiss", "🇨🇭"], ["sénégalais", "Senegalese", "🇸🇳"], ["américain", "American", "🇺🇸"], ["espagnol", "Spanish", "🇪🇸"], ["italien", "Italian", "🇮🇹"], ["allemand", "German", "🇩🇪"], ["japonais", "Japanese", "🇯🇵"], ["mexicain", "Mexican", "🇲🇽"], ["brésilien", "Brazilian", "🇧🇷"]], { tip: "In French, nationalities start with a small letter. For a girl, they usually add an <b>-e</b>: français → française." }),
    routine: BK("My day", [["se réveiller", "to wake up", "⏰"], ["se lever", "to get up", "🧍"], ["se laver", "to wash", "🧼"], ["se brosser les dents", "to brush your teeth", "🪥"], ["s'habiller", "to get dressed", "👕"], ["prendre le petit déjeuner", "to eat breakfast", "🥣"], ["aller à l'école", "to go to school", "🏫"], ["faire ses devoirs", "to do homework", "📝"], ["se coucher", "to go to bed", "🛏️"]], { tip: "Verbs that start with <b>se</b> or <b>s'</b> are called reflexive verbs. You do the action to yourself." }),
    when: BK("Time words", [["hier", "yesterday", "⏪"], ["aujourd'hui", "today", "📅"], ["demain", "tomorrow", "⏩"], ["maintenant", "now", "⏱️"], ["bientôt", "soon"], ["toujours", "always"], ["souvent", "often"], ["parfois", "sometimes"], ["jamais", "never"], ["le matin", "in the morning", "🌅"], ["le soir", "in the evening", "🌆"]]),
    fam2: BK("My big family", [["oncle", "uncle"], ["tante", "aunt"], ["cousin", "cousin (boy)"], ["cousine", "cousin (girl)"], ["parents", "parents", "👪"], ["enfants", "children", "🧒"], ["grands-parents", "grandparents", "👵"], ["fils", "son"], ["fille", "daughter"], ["neveu", "nephew"], ["nièce", "niece"], ["famille", "family", "🏡"]], { tip: "In French, <b>parents</b> means mom and dad, not all your relatives." }),
    music: BK("Music", [["la guitare", "guitar", "🎸"], ["le piano", "piano", "🎹"], ["le violon", "violin", "🎻"], ["la trompette", "trumpet", "🎺"], ["le tambour", "drum", "🥁"], ["la flûte", "flute"], ["le saxophone", "saxophone", "🎷"], ["la chanson", "song", "🎵"], ["chanter", "to sing", "🎤"], ["la musique", "music", "🎶"]], { tip: "To say you play an instrument: <b>Je joue du piano</b>, <b>Je joue de la guitare</b>." }),
    earth: BK("Earth and sky", [["le ciel", "sky", "🌤️"], ["la terre", "Earth", "🌍"], ["la mer", "sea", "🌊"], ["le désert", "desert", "🏜️"], ["la forêt", "forest", "🌲"], ["l'île", "island", "🏝️"], ["le volcan", "volcano", "🌋"], ["la planète", "planet", "🪐"], ["la fusée", "rocket", "🚀"], ["le feu", "fire", "🔥"]]),
    people: BK("Describing people", [["gentil", "kind"], ["drôle", "funny"], ["timide", "shy"], ["courageux", "brave"], ["intelligent", "smart"], ["sympa", "nice"], ["paresseux", "lazy"], ["curieux", "curious"], ["calme", "calm"], ["bavard", "talkative"]], { tip: "Use <b>Il est</b> for a boy and <b>Elle est</b> for a girl: Elle est gentille." }),
    dir: BK("Directions", [["tout droit", "straight ahead", "⬆️"], ["à gauche", "to the left", "⬅️"], ["à droite", "to the right", "➡️"], ["tournez", "turn", "↪️"], ["près de", "near", "📍"], ["loin de", "far from"], ["la rue", "street", "🛣️"], ["le coin", "corner"], ["traversez", "cross"]], { tip: "To ask the way: <b>Où est la bibliothèque ?</b> (Where is the library?)" }),
    neg: BK("Never, no more, nothing", [["Je ne mange jamais de poisson.", "I never eat fish."], ["Il ne pleut plus.", "It is not raining anymore."], ["Je ne vois rien.", "I see nothing."], ["Il n'y a personne ici.", "There is nobody here."], ["Nous ne jouons jamais le matin.", "We never play in the morning."], ["Tu ne manges plus de glace.", "You don't eat ice cream anymore."], ["Elle ne dit rien.", "She says nothing."], ["Ils ne chantent jamais.", "They never sing."]], { nopic: true, tip: "Same pattern as ne ... pas: <b>ne</b> goes before the verb, and the second word goes after it." })
  };
  const TYPE4 = BK("Type it", [].concat(B.months.items, B.veg.items, B.meals.items, B.desc.items, B.wild.items).filter(x => /^[a-zàâçéèêëîïôûùü]+$/i.test(x[0])));

  // ---------- makers ----------
  const vocab = (bank, mode = "mix") => () => {
    const items = bank.items, cur = pick(items), [fr, en, e] = cur;
    const rest = items.filter(x => x[0] !== fr), ex = pick(rest), wr = shuf(rest);
    let m = mode === "mix" ? pick(e && !bank.nopic ? ["fr2en", "en2fr", "pic"] : ["fr2en", "en2fr"]) : mode;
    if (m === "pic" && !e) m = "fr2en";
    if (m === "fr2en") return {
      text: `What does "${fr}" mean?`, say: fr, lang: FR, choices: shuf([en, ...wr.slice(0, 2).map(x => x[1])]), answer: en,
      hints: ["Press 🔊 to hear it and say it out loud. Does it remind you of an English word?", `The English answer starts with the letter "${lead(en).toUpperCase()}".`, `Example: "${ex[0]}" means "${ex[1]}". Now think about yours.`]
    };
    if (m === "en2fr") return {
      text: `How do you say "${en}" in French?`, choices: shuf([fr, ...wr.slice(0, 2).map(x => x[0])]), answer: fr,
      hints: ["Think back to the French words from the lesson. Which one matches the English?", `The French answer starts with "${lead(fr)}".`, `Example: "${ex[1]}" in French is "${ex[0]}". Now find yours.`]
    };
    const ex2 = pick(rest.filter(x => x[2])) || ex;
    return {
      text: "How do you say this in French?", visual: e, choices: shuf([fr, ...wr.slice(0, 2).map(x => x[0])]), answer: fr,
      hints: ["Look at the picture. What is it in English?", `The French answer starts with "${lead(fr)}".`, `Example: ${ex2[2] || ""} is "${ex2[0]}" in French. Now find yours.`]
    };
  };
  const typed = bank => () => {
    const items = bank.items.filter(x => /^[a-zàâçéèêëîïôûùü]+$/i.test(x[0])), [fr, en, e] = pick(items), ex = pick(items.filter(x => x[0] !== fr));
    return {
      text: `Type "${en}" in French.`, visual: e, textInput: true, answer: fr,
      hints: ["Think back to the French word you learned for this meaning.", `It starts with "${fr[0]}" and has ${fr.length} letters.`, `Example: "${ex[1]}" in French is "${ex[0]}". Now do yours. (You don't need to type accents!)`]
    };
  };
  const mc = (items, hints, n = 2) => () => {
    const it = pick(items), [text, ans, wr, vis] = it;
    return { text, visual: vis, choices: shuf([ans, ...shuf(wr).slice(0, n)]), answer: ans, hints: hints.map(h => typeof h === "function" ? h(it) : h) };
  };
  const ty = (items, hints) => () => {
    const it = pick(items), [text, ans, vis] = it;
    return { text, visual: vis, textInput: true, answer: ans, hints: hints.map(h => typeof h === "function" ? h(it) : h) };
  };

  const numQ = (lo, hi, exs) => () => {
    const n = ri(lo, hi), w = numFr(n), pool = [];
    for (let i = Math.max(lo, n - 12); i <= Math.min(hi, n + 12); i++) if (i !== n) pool.push(i);
    const e = pick(exs.filter(x => x !== n));
    if (Math.random() < 0.5) return {
      text: `Which number is "${w}"?`, say: w, lang: FR, choices: shuf([n, ...shuf(pool).slice(0, 2)]), answer: n,
      hints: ["Split the French number into parts: the tens word first, then the small number.", `The answer is a number between ${n - 6} and ${n + 6}.`, `Example: "${numFr(e)}" is ${e}. Break yours into pieces the same way. Now do yours.`]
    };
    return {
      text: `How do you say ${n} in French?`, choices: shuf([w, ...shuf(pool).slice(0, 2).map(numFr)]), answer: w,
      hints: ["Split the number into tens and ones, like 20 + 4. Say each part in French.", `The French answer starts with the letter "${w[0]}".`, `Example: ${e} in French is "${numFr(e)}". Now do yours.`]
    };
  };
  const tNum = (title, sample, pat, tip) => [
    S(title, "🔢", "Let's count higher in French. Say each number out loud as you read it."),
    S("The numbers", sample.map(n => word(numFr(n), n)).join("<br>"), "<b>Tap a number to hear it.</b>"),
    S("The pattern", "🧩", pat + (tip ? " " + tip : ""))
  ];

  const mathQ = () => {
    const plus = Math.random() < 0.6;
    let a, b;
    if (plus) { a = ri(1, 10); b = ri(1, 10); } else { a = ri(2, 20); b = ri(1, a - 1); }
    const ans = plus ? a + b : a - b;
    let ea = plus ? 4 : 10, eb = plus ? 1 : 6;
    if (ea === a && eb === b) { ea = plus ? 6 : 12; eb = plus ? 2 : 7; }
    return {
      text: `${cap(NUM[a])} ${plus ? "plus" : "moins"} ${NUM[b]} font combien ? (Type the number.)`, answer: ans,
      hints: [`<b>plus</b> means add (+) and <b>moins</b> means take away (−). Say the numbers in English first.`, `Start at ${NUM[a]} and count ${plus ? "up" : "back"} by ${NUM[b]}.`, `Example: ${NUM[ea]} ${plus ? "plus" : "moins"} ${NUM[eb]} font ${NUM[plus ? ea + eb : ea - eb]}. Now do yours.`]
    };
  };

  const CL = ["🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚", "🕛"];
  const hr = h => h === 1 ? "une heure" : NUM[h] + " heures";
  const clockO = () => {
    const h = ri(1, 12), t = `Il est ${hr(h)}.`, ex = pick([2, 4, 7, 9, 11].filter(x => x !== h));
    const oth = shuf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter(x => x !== h)).slice(0, 2);
    const hs = ["<b>heure(s)</b> means hour, and <b>Il est</b> means It is.", null];
    if (Math.random() < 0.5) return {
      text: "What time is it? Pick the French sentence.", visual: CL[h - 1], choices: shuf([t, ...oth.map(x => `Il est ${hr(x)}.`)]), answer: t,
      hints: [hs[0] + " Look at the little hand on the clock.", "Say the hour number in French, then add <b>heures</b>. Only one o'clock is special.", `Example: ${CL[ex - 1]} is "Il est ${hr(ex)}." Now do yours.`]
    };
    return {
      text: `"${t}" What time is it?`, say: t, lang: FR, choices: shuf([`${h} o'clock`, ...oth.map(x => `${x} o'clock`)]), answer: `${h} o'clock`,
      hints: [hs[0] + " Find the number word.", `The number word starts with the letter "${(h === 1 ? "une" : NUM[h])[0]}".`, `Example: "Il est ${hr(ex)}." means it is ${ex} o'clock. Now do yours.`]
    };
  };
  const clockH = () => {
    const h = ri(2, 11), kinds = [["et demie", h, 30], ["et quart", h, 15], ["moins le quart", h - 1, 45]];
    const k = pick(kinds), fm = (hh, mm) => `${hh}:${mm}`, ans = fm(k[1], k[2]);
    const wr = kinds.filter(x => x !== k).map(x => fm(x[1], x[2]));
    const ex = pick([8, 6, 10].filter(x => x !== h));
    return {
      text: `"Il est ${hr(h)} ${k[0]}." What time is it?`, say: `Il est ${hr(h)} ${k[0]}`, lang: FR, choices: shuf([ans, ...wr]), answer: ans,
      hints: ["<b>et demie</b> = half past, <b>et quart</b> = quarter past, <b>moins le quart</b> = quarter to.", "Find the hour word first. Remember that \"quarter to\" counts back from the next hour.", `Example: "Il est ${hr(ex)} et demie." is ${ex}:30, and "Il est ${hr(ex)} moins le quart." is ${ex - 1}:45. Now do yours.`]
    };
  };

  const NOUNS = [["chat", "m", "cat", "cats", "🐱"], ["chien", "m", "dog", "dogs", "🐶"], ["livre", "m", "book", "books", "📖"], ["crayon", "m", "pencil", "pencils", "✏️"], ["jardin", "m", "garden", "gardens", "🌷"], ["sac", "m", "bag", "bags", "👜"], ["garçon", "m", "boy", "boys", "👦"],
    ["maison", "f", "house", "houses", "🏠"], ["table", "f", "table", "tables", "🍽️"], ["fleur", "f", "flower", "flowers", "🌸"], ["chaise", "f", "chair", "chairs", "🪑"], ["pomme", "f", "apple", "apples", "🍎"], ["fille", "f", "girl", "girls", "👧"], ["voiture", "f", "car", "cars", "🚗"], ["porte", "f", "door", "doors", "🚪"]];
  const artQ = () => {
    const [w, g, en, enp, e] = pick(NOUNS), kind = pick(["the1", "thepl", "a", "some"]);
    let text, choices, ans, vis = e;
    if (kind === "the1") { text = `___ ${w} (the ${en})`; choices = ["le", "la", "les"]; ans = g === "m" ? "le" : "la"; }
    else if (kind === "thepl") { text = `___ ${w}s (the ${enp})`; choices = ["les", "le", "la"]; ans = "les"; vis = e + e; }
    else if (kind === "a") { text = `___ ${w} (a ${en})`; choices = ["un", "une", "des"]; ans = g === "m" ? "un" : "une"; }
    else { text = `___ ${w}s (some ${enp})`; choices = ["des", "un", "une"]; ans = "des"; vis = e + e; }
    return {
      text, visual: vis, choices: shuf(choices), answer: ans,
      hints: ["Look at the end of the French word. Is there an <b>s</b>? That means more than one.", kind === "the1" || kind === "thepl" ? "For \"the\": <b>le</b> (masculine), <b>la</b> (feminine), <b>les</b> (more than one)." : "For \"a\": <b>un</b> (masculine) or <b>une</b> (feminine). For \"some\" (more than one): <b>des</b>.", "Example: le frère (the brother), la sœur (the sister), les frères. Then: un frère, une sœur, des sœurs."]
    };
  };
  const POSS = [["frère", "m", "brother"], ["père", "m", "father"], ["ami", "m", "friend"], ["livre", "m", "book"], ["chat", "m", "cat"], ["sac", "m", "bag"], ["sœur", "f", "sister"], ["maison", "f", "house"], ["mère", "f", "mother"], ["chambre", "f", "bedroom"], ["table", "f", "table"], ["famille", "f", "family"], ["frères", "p", "brothers"], ["sœurs", "p", "sisters"], ["amis", "p", "friends"], ["livres", "p", "books"], ["chats", "p", "cats"]];
  const possQ = () => {
    const [w, g, en] = pick(POSS), your = Math.random() < 0.5, set = your ? ["ton", "ta", "tes"] : ["mon", "ma", "mes"];
    const ans = g === "m" ? set[0] : g === "f" ? set[1] : set[2];
    return {
      text: `___ ${w} (${your ? "your" : "my"} ${en})`, choices: shuf(set), answer: ans,
      hints: ["Is the noun one thing or many things? If it is one thing, is it masculine or feminine?", your ? "For \"your\": <b>ton</b> (masculine), <b>ta</b> (feminine), <b>tes</b> (many)." : "For \"my\": <b>mon</b> (masculine), <b>ma</b> (feminine), <b>mes</b> (many).", "Example: mon stylo (my pen), ma classe (my class), mes cousins (my cousins)."]
    };
  };
  const ceQ = () => {
    const [w, g, en, enp] = pick(NOUNS), pl = Math.random() < 0.35;
    const ans = pl ? "ces" : g === "m" ? "ce" : "cette";
    return {
      text: pl ? `___ ${w}s (these ${enp})` : `___ ${w} (this ${en})`, choices: shuf(["ce", "cette", "ces"]), answer: ans,
      hints: ["Does the English say \"this\" (one thing) or \"these\" (many things)?", "<b>ce</b> = this (masculine), <b>cette</b> = this (feminine), <b>ces</b> = these (many).", "Example: ce stylo (this pen), cette classe (this class), ces stylos (these pens)."]
    };
  };

  // ----- verbs -----
  const VB = {};
  const en6 = (b, t) => ["I " + b, "you " + b, "he " + t, "we " + b, "you " + b, "they " + b];
  const defV = (key, inf, en, f, e6, o = {}) => { VB[key] = Object.assign({ inf, en, e6, vow: false, ex: "parler", f: { je: f[0], tu: f[1], il: f[2], elle: f[2], nous: f[3], vous: f[4], ils: f[5] } }, o); };
  defV("parler", "parler", "to speak", ["parle", "parles", "parle", "parlons", "parlez", "parlent"], en6("speak", "speaks"), { ex: "vendre" });
  defV("être", "être", "to be", ["suis", "es", "est", "sommes", "êtes", "sont"], ["I am", "you are", "he is", "we are", "you are", "they are"]);
  defV("vendre", "vendre", "to sell", ["vends", "vends", "vend", "vendons", "vendez", "vendent"], en6("sell", "sells"));
  defV("laver", "se laver", "to wash", ["me lave", "te laves", "se lave", "nous lavons", "vous lavez", "se lavent"], ["I wash", "you wash", "he washes", "we wash", "you wash", "they wash"]);
  defV("jouer", "jouer", "to play", ["joue", "joues", "joue", "jouons", "jouez", "jouent"], en6("play", "plays"), { note: "This is an -er verb, so it follows the regular pattern." });
  defV("aller", "aller", "to go", ["vais", "vas", "va", "allons", "allez", "vont"], en6("go", "goes"), { ex: "être", note: "This verb is special, so it does not follow the -er pattern." });
  defV("faire", "faire", "to do or make", ["fais", "fais", "fait", "faisons", "faites", "font"], ["I do", "you do", "he does", "we do", "you do", "they do"], { ex: "être", note: "This verb is special, so you have to learn its forms." });
  defV("vouloir", "vouloir", "to want", ["veux", "veux", "veut", "voulons", "voulez", "veulent"], en6("want", "wants"), { ex: "être", note: "This verb is special, so you have to learn its forms." });
  defV("attendre", "attendre", "to wait", ["attends", "attends", "attend", "attendons", "attendez", "attendent"], en6("wait", "waits"), { vow: true, ex: "vendre", note: "This is an -re verb. Its endings are different from -er verbs." });
  defV("prendre", "prendre", "to take", ["prends", "prends", "prend", "prenons", "prenez", "prennent"], en6("take", "takes"), { ex: "vendre", note: "This verb is a bit special, especially for ils." });
  defV("appeler", "s'appeler", "to be called", ["m'appelle", "t'appelles", "s'appelle", "nous appelons", "vous appelez", "s'appellent"], ["my name is", "your name is", "his name is", "our names are", "your names are", "their names are"], { ex: "laver", note: "This is a reflexive verb, so there is a little extra word (me, te, se, nous, vous) before it." });
  const PR = ["je", "tu", "il", "elle", "nous", "vous", "ils"];
  const PEN = { je: "I", tu: "you", il: "he", elle: "she", nous: "we", vous: "you", ils: "they" };
  const verbQ = key => () => {
    const v = VB[key], p = pick(PR), ans = v.f[p], ex = VB[v.ex];
    const wr = shuf([...new Set(PR.map(x => v.f[x]))].filter(x => x !== ans)).slice(0, 2);
    const pre = p === "je" && v.vow ? "j'" : p + " ";
    return {
      text: `${pre}___ (${v.inf}, ${v.en})`, choices: shuf([ans, ...wr]), answer: ans,
      hints: ["French verbs change their ending to match WHO is doing the action. Find the person word.", `${v.note || ""} ${ans.length > 3 ? `The right form ends in "-${ans.slice(-2)}".` : `The right form is short, only ${ans.length} letters, and starts with "${ans[0]}".`}`.trim(), `Example: with ${ex.inf} (${ex.en}): je ${ex.f.je}, nous ${ex.f.nous}, vous ${ex.f.vous}. Now find yours.`]
    };
  };
  const tVerb = (key, pattern, tip) => {
    const v = VB[key];
    return [
      S(`The verb "${v.inf}"`, "🗣️", `<b>${v.inf}</b> means <b>${v.en}</b>. Like every French verb, it changes depending on <b>who</b> is doing it.`),
      S("All the forms", ["je", "tu", "il", "nous", "vous", "ils"].map((p, i) => word(p === "je" && v.vow ? "j'" + v.f.je : (p === "il" ? "il/elle " : p === "ils" ? "ils/elles " : p + " ") + v.f[p], v.e6[i])).join("<br>"), "<b>Tap any form to hear it.</b>"),
      S("Remember", "🧠", pattern + " " + (tip || "Say all the forms out loud like a song: je, tu, il, nous, vous, ils."))
    ];
  };
  const goQ = () => {
    const vs = [["jouer", "play"], ["manger", "eat"], ["danser", "dance"], ["nager", "swim"], ["chanter", "sing"], ["regarder", "watch"], ["dessiner", "draw"], ["voyager", "travel"]];
    const [inf, en] = pick(vs), p = pick(PR), ans = VB.aller.f[p], am = { je: "am", tu: "are", il: "is", elle: "is", nous: "are", vous: "are", ils: "are" }[p];
    const wr = shuf([...new Set(PR.map(x => VB.aller.f[x]))].filter(x => x !== ans)).slice(0, 2);
    return {
      text: `${p} ___ ${inf}. (${PEN[p]} ${am} going to ${en}.)`, choices: shuf([ans, ...wr]), answer: ans,
      hints: ["To say what you are going to do, use a form of <b>aller</b> (to go) and then the verb that ends in -er.", "Find who is doing the action, then choose the form of aller (to go) for that person.", "Example: Il va chanter = He is going to sing. Ils vont lire = They are going to read. Now find yours."]
    };
  };
  const PPS = [["parler", "to speak", "parlé"], ["jouer", "to play", "joué"], ["manger", "to eat", "mangé"], ["regarder", "to watch", "regardé"], ["chanter", "to sing", "chanté"], ["danser", "to dance", "dansé"], ["nager", "to swim", "nagé"], ["écouter", "to listen", "écouté"], ["aimer", "to like", "aimé"], ["travailler", "to work", "travaillé"], ["dessiner", "to draw", "dessiné"], ["acheter", "to buy", "acheté"]];
  const AV = { je: "ai", tu: "as", il: "a", elle: "a", nous: "avons", vous: "avez", ils: "ont" };
  const passeQ = () => {
    const [inf, en, part] = pick(PPS);
    if (Math.random() < 0.5) {
      const p = pick(PR), ans = AV[p], wr = shuf([...new Set(PR.map(x => AV[x]))].filter(x => x !== ans)).slice(0, 2);
      return {
        text: `Hier, ${p === "je" ? "j'" : p + " "}___ ${part}. (${inf}, ${en})`, choices: shuf([ans, ...wr]), answer: ans,
        hints: ["To talk about the past, French uses a helper verb: <b>avoir</b> + a past word. Which person is speaking?", "Remember avoir now: ai, as, a, avons, avez, ont. They go in order with je, tu, il, nous, vous, ils.", "Example: Hier, nous avons chanté (Yesterday, we sang). Hier, tu as dansé (Yesterday, you danced). Now find yours."]
      };
    }
    const p = pick(["j'ai", "tu as", "il a", "elle a", "nous avons", "vous avez", "ils ont"]);
    return {
      text: `Hier, ${p} ___. (${inf}, ${en})`, choices: shuf([part, inf, inf.slice(0, -2) + "ez"]), answer: part,
      hints: ["After avoir, French uses a special past word, not the plain verb that you find in the dictionary.", "For verbs ending in -er, take off the -er and add <b>é</b>.", "Example: chanter → chant + é = chanté. Hier, nous avons chanté. Now do yours."]
    };
  };
  const ppTyped = () => {
    const [inf, en, part] = pick(PPS), ex = pick(PPS.filter(x => x[0] !== inf));
    return {
      text: `Hier, j'ai ___. (${inf}, ${en}) Type the past word.`, textInput: true, answer: part,
      hints: ["After avoir, French uses a special past word. For -er verbs it ends in <b>é</b>.", `Take off the -er ending. What is left is "${inf.slice(0, -2)}". Now add the new ending.`, `Example: ${ex[0]} → ${ex[0].slice(0, -2)} + é = ${ex[2]}. Now do yours. (Accents are optional here.)`]
    };
  };

  // ----- special makers -----
  const FEM = [["content", "contente", "happy"], ["petit", "petite", "small"], ["grand", "grande", "tall"], ["fatigué", "fatiguée", "tired"], ["gentil", "gentille", "kind"], ["français", "française", "French"], ["heureux", "heureuse", "happy (lucky)"], ["bon", "bonne", "good"], ["mignon", "mignonne", "cute"], ["noir", "noire", "black"], ["vert", "verte", "green"], ["blanc", "blanche", "white"], ["froid", "froide", "cold"], ["intelligent", "intelligente", "smart"]];
  const femQ = () => {
    const [m, f, en] = pick(FEM), ex = pick([["grand", "grande"], ["joli", "jolie"], ["petit", "petite"]].filter(x => x[0] !== m));
    return {
      text: `Il est ${m}. Elle est ___ . (${en})`, textInput: true, answer: f,
      hints: ["For a girl, the describing word usually ends with an <b>-e</b>.", `Start with the boy's word "${m}" and look at its last letters. If it already ends in -e, it stays the same. Some endings change a little: -on, -eux, -c, -il.`, `Example: ${ex[0]} → ${ex[1]}. Now do yours.`]
    };
  };

  const A = {};
  // ================= LEVEL 4 =================
  const tuQ = mc([["your best friend", "tu", ["vous"]], ["your teacher", "vous", ["tu"]], ["your little brother", "tu", ["vous"]], ["a shopkeeper you don't know", "vous", ["tu"]], ["your cousin", "tu", ["vous"]], ["the school principal", "vous", ["tu"]], ["an adult you have just met", "vous", ["tu"]], ["two of your friends together", "vous", ["tu"]], ["your pet dog", "tu", ["vous"]]].map(x => [`You talk to <b>${x[0]}</b>. Which word for "you" do you use?`, x[1], x[2]]),
    ["Think: is it one person you know well, or is it polite or more than one person?", "<b>tu</b> is for one friend, a family member, or a child. <b>vous</b> is polite, or for more than one person.", "Example: you say \"Tu es mon ami\" to a friend, and \"Vous êtes gentil\" to a grown-up you don't know."]);
  A.l4 = [
    les("Numbers 21 to 30", numQ(21, 30, [22, 25, 28]), tNum("Numbers 21 to 30", [21, 22, 23, 24, 25, 26, 27, 28, 29, 30], "21 is <b>vingt et un</b> (with <b>et</b>). From 22 you say vingt, then a hyphen, then the number: vingt-deux, vingt-trois. 30 is <b>trente</b>.")),
    les("Counting to 60", numQ(30, 60, [34, 45, 52]), tNum("Counting to 60", [30, 31, 40, 41, 50, 51, 60, 45, 58], "The tens are <b>trente</b> (30), <b>quarante</b> (40), <b>cinquante</b> (50) and <b>soixante</b> (60). Say the tens, then the ones. For 1, add <b>et un</b>.")),
    les("The months", vocab(B.months), tVocab(B.months)),
    les("Months in order", () => {
      const M = B.months.items.map(x => x[0]), i = ri(0, 11), after = Math.random() < 0.5, d = M[i], ans = M[(i + (after ? 1 : 11)) % 12];
      return { text: `Which month comes ${after ? "after" : "before"} ${d}?`, choices: shuf([ans, ...shuf(M.filter(x => x !== ans && x !== d)).slice(0, 2)]), answer: ans,
        hints: ["Think about the order of the months of the year.", `Find "${d}" in the year. ${after ? "The next month" : "The month just earlier"} is your answer.`, "Example: the month after mars is avril, and the month before juin is mai."] };
    }, [S("Months in order", "🗓️", "A year has twelve months. They always go in the same order."), S("The whole year", "janvier · février · mars · avril · mai · juin<br>juillet · août · septembre · octobre · novembre · décembre", "After <b>décembre</b> a new year begins with <b>janvier</b>."), S("Tip", "🎵", "Say the months from janvier to décembre, and then try going backwards!")]),
    les("The weather", vocab(B.wx), tVocab(B.wx)),
    les("Fruit and vegetables", vocab(B.veg), tVocab(B.veg)),
    les("Meals and treats", vocab(B.meals), tVocab(B.meals)),
    les("In the classroom", vocab(B.cmd), tVocab(B.cmd)),
    les("Describing words", vocab(B.desc), tVocab(B.desc)),
    les("More action verbs", vocab(B.erv), tVocab(B.erv)),
    les("The verb jouer", verbQ("jouer"), tVerb("jouer", "Regular -er verbs end in: -e, -es, -e, -ons, <b>-ez</b>, -ent. The new one is <b>vous</b> (you, polite or many): vous jouez.")),
    les("The verb aller", verbQ("aller"), tVerb("aller", "<b>Aller</b> is special. You have to learn its forms by heart.", "Use it to say where you go: Je vais à l'école.")),
    les("Les and des", artQ, [S("More than one", "les chats · des chats", "When there is more than one, <b>le</b> and <b>la</b> become <b>les</b> (the). And <b>un</b> and <b>une</b> become <b>des</b> (some)."), S("All the little words", "le · la · les<br>un · une · des", "One masculine thing: <b>le / un</b>. One feminine thing: <b>la / une</b>. Many things: <b>les / des</b>."), S("Tip", "💡", "Look for the <b>s</b> at the end of the noun. It tells you there is more than one.")]),
    les("Saying no: ne ... pas", mc([["I don't eat.", "Je ne mange pas.", ["Je ne pas mange.", "Je mange ne pas."]], ["I don't like rain.", "Je n'aime pas la pluie.", ["Je aime ne pas la pluie.", "Je ne aime pas la pluie."]], ["She doesn't play.", "Elle ne joue pas.", ["Elle joue ne pas.", "Elle pas ne joue."]], ["We don't speak French.", "Nous ne parlons pas français.", ["Nous parlons ne pas français.", "Nous ne pas parlons français."]], ["He isn't big.", "Il n'est pas grand.", ["Il ne est pas grand.", "Il est ne pas grand."]], ["You don't have a pencil.", "Tu n'as pas de crayon.", ["Tu ne as pas de crayon.", "Tu as ne pas de crayon."]], ["They don't run.", "Ils ne courent pas.", ["Ils courent ne pas.", "Ils ne pas courent."]], ["I am not tired.", "Je ne suis pas fatigué.", ["Je suis ne pas fatigué.", "Je ne pas suis fatigué."]], ["Mom doesn't sing.", "Maman ne chante pas.", ["Maman chante ne pas.", "Maman ne pas chante."]], ["The cat isn't here.", "Le chat n'est pas ici.", ["Le chat ne est pas ici.", "Le chat est n'pas ici."]]].map(x => ["Which sentence means: " + x[0], x[1], x[2]]),
      ["In French, you make a sentence negative with two little words around the verb: <b>ne ... pas</b>.", "Put <b>ne</b> before the verb and <b>pas</b> right after it. If the verb starts with a vowel, ne becomes <b>n'</b>.", "Example: Je ne dors pas = I don't sleep. Il n'a pas faim = He is not hungry. Now find yours."]),
      [S("Saying no", "ne ... pas", "To say what is NOT true, wrap the verb with <b>ne</b> and <b>pas</b>: Je mange (I eat) → Je <b>ne</b> mange <b>pas</b> (I don't eat)."), S("Before a vowel", "n'aime pas · n'est pas", "When the verb starts with a vowel or h, <b>ne</b> becomes <b>n'</b>: Je <b>n'</b>aime <b>pas</b>."), S("Tip", "🥪", "Think of the verb as the filling of a sandwich, with <b>ne</b> and <b>pas</b> as the bread.")]),
    les("Tu or vous?", tuQ, [S("Two ways to say \"you\"", "tu · vous", "French has two words for \"you\": <b>tu</b> and <b>vous</b>."), S("When to use them", "tu = friends 👫<br>vous = polite or many 🎩", "Use <b>tu</b> for one friend, a family member, or a child. Use <b>vous</b> for a grown-up you don't know, a teacher, or when you talk to two or more people."), S("Tip", "🤝", "If you are not sure, <b>vous</b> is the safe, polite choice.")]),
    les("What time is it?", clockO, [S("O'clock", "🕒 Il est trois heures.", "To tell the time, say <b>Il est</b> (It is), then the number, then <b>heures</b> (hours)."), S("Say it", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(h => word(`Il est ${hr(h)}.`, `It is ${h} o'clock.`, CL[h - 1])).join("<br>"), "<b>Tap a sentence to hear it.</b> One o'clock is <b>une heure</b>, with no s."), S("Special times", "☀️ midi · 🌙 minuit", "<b>Midi</b> means noon (12 o'clock in the day). <b>Minuit</b> means midnight.")]),
    les("Mon, ma, mes", possQ, [S("My and your", "mon frère · ma sœur · mes amis", "In French, \"my\" changes. Use <b>mon</b> for a masculine thing, <b>ma</b> for a feminine thing, and <b>mes</b> for many things."), S("Your too", "ton · ta · tes", "\"Your\" (when you say tu) works the same way: <b>ton</b>, <b>ta</b>, <b>tes</b>."), S("Tip", "💡", "The word matches the thing you own, not the person who owns it.")]),
    les("Type it in French", typed(TYPE4), [S("Typing French", "⌨️", "In this lesson you type French words. Read the English, remember the French word, and spell it."), S("Accents are optional", "é è ê à ç ô", "You can leave the accents off: <b>fevrier</b> counts as <b>février</b>."), S("Tip", "🔊", "Say the word in your head as you type it. Remember each letter.")])
  ];
  A.l4.push(MIX("Mixed practice", [A.l4[2], A.l4[5], A.l4[10], A.l4[11], A.l4[12]]));
  A.l4.push(MIX("Level 4 Challenge", [A.l4[0], A.l4[1], A.l4[4], A.l4[6], A.l4[10], A.l4[11], A.l4[12], A.l4[13], A.l4[14], A.l4[15], A.l4[16], A.l4[17]]));

  // ================= LEVEL 5 =================
  const PLADJ = [["les chats", "noirs", ["noir", "noires"], "black"], ["les maisons", "blanches", ["blanche", "blancs"], "white"], ["les livres", "bleus", ["bleu", "bleues"], "blue"], ["les fleurs", "jolies", ["jolie", "jolis"], "pretty"], ["les chiens", "petits", ["petit", "petites"], "small"], ["les chaises", "vertes", ["verte", "verts"], "green"], ["les voitures", "grises", ["grise", "gris"], "gray"], ["les garçons", "contents", ["content", "contentes"], "happy"], ["les filles", "contentes", ["contente", "contents"], "happy"], ["les crayons", "jaunes", ["jaune", "jaunnes"], "yellow"]].map(x => [`${x[0]} ___ (${x[3]})`, x[1], x[2]]);
  A.l5 = [
    les("More about the body", vocab(B.body2), tVocab(B.body2)),
    les("More clothes", vocab(B.clo2), tVocab(B.clo2)),
    les("Rooms and things at home", vocab(B.rooms), tVocab(B.rooms)),
    les("Wild animals", vocab(B.wild), tVocab(B.wild)),
    les("Counting to 100", numQ(61, 100, [62, 75, 84]), tNum("Counting to 100", [60, 61, 70, 71, 75, 80, 81, 90, 99, 100], "From 60 to 79 you keep counting from <b>soixante</b> (60): soixante-dix is 70. For 80 you say <b>quatre-vingts</b> (4 × 20). 90 is quatre-vingt-dix. <b>Cent</b> is 100. In Belgium and Switzerland, 70 is <b>septante</b> and 90 is <b>nonante</b>.")),
    les("Math in French", mathQ, [S("Plus and moins", "2 + 3 = 5", "In French, <b>plus</b> means add and <b>moins</b> means take away. The answer comes after <b>font</b>."), S("Say it", word("Deux plus trois font cinq.", "2 + 3 = 5") + "<br>" + word("Huit moins quatre font quatre.", "8 − 4 = 4"), "<b>Tap a sentence to hear it.</b>"), S("Tip", "🧮", "Say the numbers in English in your head, solve it, then check that you know the French word.")]),
    les("The verb faire", verbQ("faire"), tVerb("faire", "<b>Faire</b> is special. Watch out for <b>faites</b> (vous) and <b>font</b> (ils).", "You use it a lot: faire du sport, faire un gâteau, faire ses devoirs.")),
    les("The verb vouloir", verbQ("vouloir"), tVerb("vouloir", "<b>Vouloir</b> is special. The je and tu forms are the same: <b>veux</b>.", "Je veux un gâteau = I want a cake.")),
    les("Verbs that end in -re", verbQ("attendre"), tVerb("attendre", "Verbs that end in <b>-re</b> drop the -re and add: -s, -s, nothing, -ons, -ez, -ent.", "Il attend, with a d at the end, but you don't say the d out loud.")),
    les("Ce, cette, ces", ceQ, [S("This and these", "ce livre · cette fleur · ces chats", "To say \"this\" or \"these\", use <b>ce</b> (masculine), <b>cette</b> (feminine) or <b>ces</b> (many things)."), S("Match the noun", "ce chat 🐱<br>cette maison 🏠<br>ces fleurs 🌸🌸", "Just like le and la, you match the word to the noun."), S("Tip", "👉", "Point at the thing as you say it: ce stylo, cette porte!")]),
    les("Where is it?", vocab(B.prep, "fr2en"), tVocab(B.prep)),
    les("Many things: describing words", mc(PLADJ, ["Is the noun masculine or feminine? And how many things are there?", "For many things, add <b>-s</b> to the describing word. If the noun is feminine, the describing word also has an <b>e</b>: the ending is -es.", "Example: les ballons rouges (the red balloons), les pommes rouges (the red apples). Now find yours."]),
      [S("Many things", "les chats noirs", "When the noun is plural, the describing word is plural too. Add <b>-s</b>."), S("Feminine plural", "les maisons blanches", "For feminine nouns, the describing word has the <b>e</b> and then the <b>s</b>: noire → noires."), S("Tip", "💡", "Describing words copy the noun: masculine or feminine, one or many.")]),
    les("Asking questions", vocab(B.qphr, "fr2en"), tVocab(B.qphr)),
    les("There is, there are", vocab(B.ilya), tVocab(B.ilya)),
    les("Half past and quarter past", clockH, [S("More than o'clock", "🕞 Il est trois heures et demie.", "<b>Et demie</b> means \"and a half\": 30 minutes past the hour."), S("Quarters", "et quart · moins le quart", "<b>Et quart</b> means a quarter past (15 minutes). <b>Moins le quart</b> means a quarter to (the hour minus 15 minutes)."), S("Example", "Il est huit heures et quart = 8:15<br>Il est neuf heures moins le quart = 8:45", "<b>Moins</b> means \"minus\", so you count back from the next hour.")]),
    les("Money and shopping", vocab(B.money), tVocab(B.money)),
    les("At the café", vocab(B.cafe), tVocab(B.cafe)),
    les("Going to do something", goQ, [S("Near future", "Je vais manger.", "To say what you <b>are going to</b> do, use <b>aller</b> and then the verb that ends in -er: Je vais jouer."), S("The pattern", "Tu vas · Il va · Nous allons · Ils vont", "Only <b>aller</b> changes. The second verb stays the same, like \"to play\": Nous allons jouer."), S("Tip", "🚀", "Use it for plans: Demain, je vais nager.")])
  ];
  A.l5.push(MIX("Mixed practice", [A.l5[0], A.l5[4], A.l5[6], A.l5[9], A.l5[11]]));
  A.l5.push(MIX("Level 5 Challenge", [A.l5[2], A.l5[4], A.l5[5], A.l5[6], A.l5[7], A.l5[8], A.l5[9], A.l5[10], A.l5[11], A.l5[14], A.l5[15], A.l5[17]]));

  // ================= LEVEL 6 =================
  const CULT = [["What is the capital of France?", "Paris", ["Lyon", "Marseille"], "It is a big city with a famous iron tower."], ["Which river flows through the middle of Paris?", "The Seine", ["The Thames", "The Nile"], "It is a river in northern France."], ["What colors are on the French flag?", "Blue, white and red", ["Green, white and red", "Yellow and black"], "It is called the \"tricolore\", which means three colors."], ["France's national day is the 14th of which month?", "July", ["May", "December"], "It is in the middle of summer."], ["Which famous museum in Paris holds the Mona Lisa?", "The Louvre", ["The Prado", "The Met"], "It used to be a castle and is next to the river."], ["In the Tour de France, what do the racers ride?", "Bicycles", ["Boats", "Horses"], "Think of something with two wheels and pedals."], ["What is a croissant?", "A buttery pastry", ["A kind of soup", "A fruit"], "People often eat it for breakfast."], ["Which French word means Christmas?", "Noël", ["Pâques", "Été"], "It is celebrated on December 25."], ["Which French word means Easter?", "Pâques", ["Noël", "Hiver"], "Think of colorful eggs and chocolate in spring."], ["What is the capital of Québec, the French-speaking province in Canada?", "Québec City", ["Vancouver", "Calgary"], "It shares its name with the province."], ["Which sea is on the south coast of France?", "The Mediterranean Sea", ["The Baltic Sea", "The Black Sea"], "It is warm, and many people go there on holiday."], ["On which continent is Senegal, where people speak French?", "Africa", ["Antarctica", "South America"], "Senegal is on the western coast of this continent."]];
  const COMPS = [["The elephant is bigger than the mouse.", "L'éléphant est ___ grand que la souris.", "plus"], ["The mouse is smaller than the elephant.", "La souris est ___ grande que l'éléphant.", "moins"], ["My cat is as big as your cat.", "Mon chat est ___ grand que ton chat.", "aussi"], ["The sun is hotter than the moon.", "Le soleil est ___ chaud que la lune.", "plus"], ["A turtle is slower than a rabbit.", "La tortue est ___ rapide que le lapin.", "moins"], ["The train is faster than the bike.", "Le train est ___ rapide que le vélo.", "plus"], ["I am as tall as my sister.", "Je suis ___ grand que ma sœur.", "aussi"], ["Snow is colder than rain.", "La neige est ___ froide que la pluie.", "plus"], ["The bike is less fast than the plane.", "Le vélo est ___ rapide que l'avion.", "moins"], ["Summer is hotter than winter.", "L'été est ___ chaud que l'hiver.", "plus"]].map(x => [`${x[0]}<br><b>${x[1]}</b>`, x[2], ["plus", "moins", "aussi"].filter(y => y !== x[2])]);
  const PART = [["Je mange ___ pain.", "du"], ["Elle boit ___ eau.", "de l'"], ["Nous mangeons ___ salade.", "de la"], ["Tu veux ___ fromage ?", "du"], ["J'ai ___ pommes.", "des"], ["Il boit ___ lait.", "du"], ["Je veux ___ glace.", "de la"], ["Vous avez ___ amis.", "des"], ["Elle mange ___ légumes.", "des"], ["Je bois ___ jus d'orange.", "du"], ["Ils mangent ___ soupe.", "de la"]].map(x => [x[0], x[1], ["du", "de la", "de l'", "des"].filter(y => y !== x[1])]);
  A.l6 = [
    les("Countries", vocab(B.countries), tVocab(B.countries)),
    les("Nationalities", vocab(B.nat), tVocab(B.nat)),
    les("The verb prendre", verbQ("prendre"), tVerb("prendre", "<b>Prendre</b> is a bit special: prends, prends, prend, then prenons, prenez and <b>prennent</b> with two n's.", "Je prends le bus = I take the bus.")),
    les("The verb s'appeler", verbQ("appeler"), tVerb("appeler", "A reflexive verb has an extra little word before it: <b>me, te, se, nous, vous, se</b>. Before a vowel it becomes <b>m', t', s'</b>.", "Je m'appelle Léa = My name is Léa.")),
    les("My day", vocab(B.routine), tVocab(B.routine)),
    les("Yesterday: avoir + a past word", passeQ, [S("The past", "Hier, j'ai mangé.", "To say what you did, use <b>avoir</b> and a special past word. This is called the <b>passé composé</b>."), S("Two parts", "j'ai + mangé<br>nous avons + chanté", "The first part is <b>avoir</b> (it changes with the person). The second part is the past word (it ends in <b>é</b> for -er verbs)."), S("Tip", "⏪", "Look for the word <b>hier</b> (yesterday). It tells you to use the past.")]),
    les("Making the past word", ppTyped, [S("Past words", "manger → mangé", "For verbs ending in <b>-er</b>, drop the <b>-er</b> and add <b>é</b>."), S("Practice", "jouer → joué<br>chanter → chanté<br>danser → dansé", "Say them out loud. The new ending sounds like \"ay\"."), S("Tip", "✏️", "You can type without accents here, but in real French the é is important!")]),
    les("Time words", vocab(B.when), tVocab(B.when)),
    les("My big family", vocab(B.fam2), tVocab(B.fam2)),
    les("Music", vocab(B.music), tVocab(B.music)),
    les("Earth and sky", vocab(B.earth), tVocab(B.earth)),
    les("Describing people", vocab(B.people), tVocab(B.people)),
    les("Boy to girl words", femQ, [S("For a girl", "content → contente", "Many describing words add an <b>-e</b> for a girl: petit → petite."), S("Special endings", "gentil → gentille<br>bon → bonne<br>heureux → heureuse<br>blanc → blanche", "Some words change a bit more. These are worth learning."), S("Tip", "👀", "If the word already ends in <b>-e</b>, it does not change: triste stays triste.")]),
    les("Never, no more, nothing", vocab(B.neg), tVocab(B.neg)),
    les("More, less, as much", mc(COMPS, ["Read the English sentence. Is the first thing more, less, or equal to the second?", "<b>plus ... que</b> = more than. <b>moins ... que</b> = less than. <b>aussi ... que</b> = as ... as.", "Example: Le chien est plus grand que le chat (The dog is bigger than the cat). Now find yours."]), [S("Comparing", "plus · moins · aussi", "To compare, put a small word before the describing word and <b>que</b> after it."), S("Three ways", "plus grand que = bigger than<br>moins grand que = less big than<br>aussi grand que = as big as", "The word <b>que</b> means \"than\" or \"as\"."), S("Tip", "⚖️", "Think of a balance: plus is heavier, moins is lighter, aussi is equal.")]),
    les("Directions", vocab(B.dir), tVocab(B.dir)),
    les("Du, de la, des", mc(PART, ["<b>Du, de la, des</b> mean \"some\". Is the food masculine, feminine, or more than one?", "<b>du</b> = some (masculine). <b>de la</b> = some (feminine). <b>de l'</b> = some, before a vowel. <b>des</b> = some (many).", "Example: Je mange du riz (rice is masculine). Elle boit de la limonade (feminine). Now find yours."], 3),
      [S("Some of it", "du pain · de la soupe", "In French you say <b>some</b> before food and drinks: Je mange <b>du</b> pain."), S("Pick the right one", "du · de la · de l' · des", "<b>Du</b> goes with masculine. <b>De la</b> goes with feminine. <b>De l'</b> goes before a vowel. <b>Des</b> goes with many things."), S("Tip", "🥖", "Learn the food with its little word: du fromage, de la glace.")]),
    les("France and beyond", mc(CULT, ["Think about what you have learned about France and French-speaking places.", it => it[3], "Example: Brussels is the capital of Belgium, where people also speak French."]),
      [S("French around the world", "🌍", "French is spoken in France, Belgium, Switzerland, Québec in Canada, and many countries in Africa."), S("Fun things about France", "🥐 🗼 🚴 🖼️", "France is known for croissants, the Eiffel Tower, the Tour de France bike race and great museums like the Louvre."), S("Holidays", "Noël · Pâques · le 14 juillet", "<b>Noël</b> is Christmas, <b>Pâques</b> is Easter, and the 14th of July is France's national day.")])
  ];
  A.l6.push(MIX("Mixed practice", [A.l6[0], A.l6[2], A.l6[5], A.l6[14], A.l6[16]]));
  A.l6.push(MIX("Level 6 Challenge", [A.l6[1], A.l6[2], A.l6[3], A.l6[5], A.l6[6], A.l6[7], A.l6[12], A.l6[14], A.l6[15], A.l6[16], A.l6[17], A.l6[4]]));

  function tVocab(bank) {
    return [
      S(bank.name, bank.items.slice(0, 3).map(x => x[2] || "💬").join(" "), `In this lesson you will learn French about <b>${bank.name.toLowerCase()}</b>. Listen, say it out loud, and then try the quiz.`),
      S("Learn the words", bank.items.map(x => word(x[0], x[1], x[2])).join("<br>"), "<b>Tap any word to hear it</b> and say it out loud!"),
      S("How to remember", "🧠", bank.tip || "Say each word out loud. Cover the English and see if you remember. Words that look like English words are easy to remember!")
    ];
  }

  Object.assign(FRENCH_LEVELS, { 4: A.l4, 5: A.l5, 6: A.l6 });
})();
