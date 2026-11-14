// ext/french-7-9.js : French, levels 7-9 (3rd grade, 4th grade first half).
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
    if (n === 1000) return "mille";
    if (n >= 100) {
      const h = Math.floor(n / 100), r = n % 100, hw = h === 1 ? "cent" : NUM[h] + " cent" + (r === 0 ? "s" : "");
      return r ? hw + " " + numFr(r) : hw;
    }
    if (n <= 20) return NUM[n];
    if (n < 70) { const t = Math.floor(n / 10) * 10, u = n % 10; return u === 0 ? TENS[t] : u === 1 ? TENS[t] + " et un" : TENS[t] + "-" + NUM[u]; }
    if (n < 80) { const r = n - 60; return r === 11 ? "soixante et onze" : "soixante-" + NUM[r]; }
    const r = n - 80; return r === 0 ? "quatre-vingts" : "quatre-vingt-" + NUM[r];
  };
  const pad = m => String(m).padStart(2, "0");

  // ---------- banks ----------
  const B = {
    town: BK("Places in town", [["la mairie", "town hall", "🏛️"], ["la poste", "post office", "📮"], ["la gare", "train station", "🚉"], ["le marché", "market", "🛒"], ["la piscine", "swimming pool", "🏊"], ["le cinéma", "movie theater", "🎬"], ["le musée", "museum", "🖼️"], ["la pharmacie", "pharmacy", "💊"], ["le pont", "bridge", "🌉"], ["la place", "town square"], ["l'hôtel", "hotel", "🏨"], ["le stade", "stadium", "🏟️"]], { tip: "To ask where something is: <b>Où est la poste ?</b> To say you are going there: <b>Je vais à la poste.</b>" }),
    shops: BK("Shops", [["la boulangerie", "bakery", "🥖"], ["la boucherie", "butcher shop", "🥩"], ["la pâtisserie", "pastry shop", "🍰"], ["la librairie", "bookstore", "📚"], ["le supermarché", "supermarket", "🛒"], ["la poissonnerie", "fish shop", "🐟"], ["l'épicerie", "grocery store", "🥫"], ["la fromagerie", "cheese shop", "🧀"], ["le fleuriste", "flower shop", "💐"], ["la papeterie", "stationery shop", "✏️"]], { tip: "Careful! <b>La librairie</b> sells books, but it is not a library. A library is <b>une bibliothèque</b>." }),
    jobs2: BK("More jobs", [["infirmier", "nurse", "🧑‍⚕️"], ["facteur", "mail carrier", "📮"], ["boulanger", "baker", "🥖"], ["vétérinaire", "vet", "🐾"], ["ingénieur", "engineer", "🔧"], ["agriculteur", "farmer", "🚜"], ["dentiste", "dentist", "🦷"], ["coiffeur", "hairdresser", "💇"], ["journaliste", "journalist", "📰"], ["électricien", "electrician", "💡"], ["mécanicien", "mechanic", "🔩"], ["chanteur", "singer", "🎤"]], { tip: "To say a job, drop the little word: <b>Il est boulanger.</b> (He is a baker.) For a girl, many jobs add -e or change: <b>coiffeuse, chanteuse</b>." }),
    hobbies: BK("Hobbies", [["faire du vélo", "to ride a bike", "🚲"], ["faire de la natation", "to swim (sport)", "🏊"], ["faire de la randonnée", "to go hiking", "🥾"], ["jouer aux échecs", "to play chess", "♟️"], ["écouter de la musique", "to listen to music", "🎧"], ["regarder la télé", "to watch TV", "📺"], ["faire de la peinture", "to paint", "🎨"], ["jouer au basket", "to play basketball", "🏀"], ["faire du judo", "to do judo", "🥋"], ["lire des bandes dessinées", "to read comics", "📚"]], { tip: "With <b>faire</b>, you say <b>du</b>, <b>de la</b> or <b>des</b> before the activity: faire du vélo, faire de la natation." }),
    likes: BK("Likes and dislikes", [["J'adore", "I love", "😍"], ["J'aime beaucoup", "I like a lot", "😀"], ["J'aime", "I like", "🙂"], ["Je n'aime pas", "I don't like", "🙁"], ["Je déteste", "I really dislike", "😖"], ["Je préfère", "I prefer", "👍"], ["Ça m'est égal", "I don't mind", "😐"], ["C'est ennuyeux", "It is boring", "🥱"], ["C'est génial !", "It is great!", "🤩"]], { nopic: false, tip: "After these, use a verb that ends in -er: <b>J'adore danser.</b> (I love dancing.)" }),
    travel: BK("Travel words", [["un billet", "ticket", "🎫"], ["une valise", "suitcase", "🧳"], ["un passeport", "passport", "🛂"], ["l'aéroport", "airport", "🛫"], ["les vacances", "vacation", "🏖️"], ["une carte", "map", "🗺️"], ["le départ", "departure"], ["l'arrivée", "arrival"], ["voyager", "to travel", "✈️"], ["un appareil photo", "camera", "📷"]], { tip: "<b>Les vacances</b> is always plural. Say <b>Bonnes vacances !</b> to wish someone a nice vacation." }),
    sport: BK("Sports words", [["l'équipe", "team", "👥"], ["le match", "game", "🏟️"], ["le ballon", "ball", "⚽"], ["le but", "goal", "🥅"], ["gagner", "to win", "🏆"], ["perdre", "to lose"], ["courir", "to run", "🏃"], ["sauter", "to jump"], ["le joueur", "player"], ["l'entraîneur", "coach"], ["la course", "race", "🏁"], ["la médaille", "medal", "🥇"]], { tip: "<b>Gagner</b> = to win, <b>perdre</b> = to lose. Say <b>Bravo !</b> to the winners." }),
    env: BK("Looking after Earth", [["recycler", "to recycle", "♻️"], ["la poubelle", "trash can", "🗑️"], ["les déchets", "waste"], ["la pollution", "pollution", "🏭"], ["l'énergie", "energy", "⚡"], ["économiser", "to save", "💡"], ["protéger", "to protect", "🛡️"], ["l'eau", "water", "💧"], ["l'air", "air", "🌬️"], ["planter", "to plant", "🌱"]], { tip: "<b>Économiser l'eau</b> = to save water. Small actions help the planet!" }),
    school2: BK("School subjects", [["les maths", "math", "🔢"], ["l'histoire", "history", "📜"], ["la géographie", "geography", "🗺️"], ["les sciences", "science", "🔬"], ["l'anglais", "English", "🔤"], ["les arts plastiques", "art class", "🎨"], ["la récréation", "recess", "🛝"], ["la cantine", "school cafeteria", "🍽️"], ["le cahier", "notebook", "📓"], ["la règle", "ruler", "📏"], ["la trousse", "pencil case", "✏️"], ["l'élève", "student", "🧑‍🎓"]], { tip: "Ask a friend: <b>Quelle est ta matière préférée ?</b> (What is your favorite subject?)" }),
    polite: BK("Being polite", [["Excusez-moi", "Excuse me"], ["Je voudrais de l'aide", "I would like some help"], ["Pourriez-vous m'aider ?", "Could you help me?"], ["Avec plaisir", "With pleasure"], ["Je vous en prie", "You are welcome (polite)"], ["Pouvez-vous répéter ?", "Can you repeat?"], ["Ça ne fait rien", "It doesn't matter"], ["Merci beaucoup", "Thank you very much"], ["Bonne journée !", "Have a good day!"]], { nopic: true, tip: "To a grown-up you don't know, use <b>vous</b>. <b>Je voudrais</b> and <b>pourriez-vous</b> are extra polite." }),
    tech: BK("Computers and phones", [["l'écran", "screen", "🖥️"], ["le clavier", "keyboard", "⌨️"], ["la souris", "computer mouse", "🖱️"], ["le téléphone", "phone", "📱"], ["le message", "message", "✉️"], ["le mot de passe", "password", "🔑"], ["la photo", "photo", "📷"], ["la vidéo", "video", "🎬"], ["l'imprimante", "printer", "🖨️"], ["la batterie", "battery", "🔋"], ["envoyer", "to send", "📤"], ["télécharger", "to download", "📥"]], { tip: "<b>La souris</b> also means the animal mouse! The meaning comes from the sentence." }),
    cook: BK("In the kitchen", [["la recette", "recipe", "📖"], ["la farine", "flour"], ["le sucre", "sugar"], ["le sel", "salt", "🧂"], ["les œufs", "eggs", "🥚"], ["le beurre", "butter", "🧈"], ["le four", "oven"], ["la poêle", "frying pan", "🍳"], ["mélanger", "to mix"], ["ajouter", "to add", "➕"], ["verser", "to pour", "🫗"], ["éplucher", "to peel"]], { tip: "In a recipe, the commands end in <b>-ez</b>: <b>Mélangez la farine et le sucre.</b>" }),
    opin: BK("Giving your opinion", [["à mon avis", "in my opinion"], ["je pense que", "I think that"], ["je crois que", "I believe that"], ["d'accord", "OK, I agree"], ["pas d'accord", "I disagree"], ["parce que", "because"], ["par exemple", "for example"], ["d'abord", "first"], ["ensuite", "then"], ["enfin", "finally"]], { nopic: true, tip: "Use <b>d'abord, ensuite, enfin</b> to put your ideas in order, like a story." }),
    timex: BK("Time expressions", [["il y a deux jours", "two days ago"], ["dans deux jours", "in two days"], ["la semaine dernière", "last week"], ["la semaine prochaine", "next week"], ["le mois prochain", "next month"], ["l'année dernière", "last year"], ["tout de suite", "right away"], ["tout à l'heure", "in a little while"], ["pendant", "during, for"], ["depuis", "since, for"]], { nopic: true, tip: "<b>Dernier / dernière</b> = last (in the past). <b>Prochain / prochaine</b> = next (in the future)." })
  };

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
  const mc = (items, hints, n = 2) => () => {
    const it = pick(items), [text, ans, wr, vis] = it;
    return { text, visual: vis, choices: shuf([ans, ...shuf(wr).slice(0, n)]), answer: ans, hints: hints.map(h => typeof h === "function" ? h(it) : h) };
  };
  const tVocab = bank => [
    S(bank.name, bank.items.slice(0, 3).map(x => x[2] || "💬").join(" "), `In this lesson you will learn French about <b>${bank.name.toLowerCase()}</b>. Listen, say it out loud, and then try the quiz.`),
    S("Learn the words", bank.items.map(x => word(x[0], x[1], x[2])).join("<br>"), "<b>Tap any word to hear it</b> and say it out loud!"),
    S("How to remember", "🧠", bank.tip || "Say each word out loud. Cover the English and see if you remember.")
  ];
  const tNum = (title, sample, pat) => [
    S(title, "🔢", "Let's count higher in French. Say each number out loud as you read it."),
    S("The numbers", sample.map(n => word(numFr(n), n)).join("<br>"), "<b>Tap a number to hear it.</b>"),
    S("The pattern", "🧩", pat)
  ];

  // ----- numbers up to 1000 -----
  const numQ2 = () => {
    let n, r;
    do { n = ri(1, 9) * 100 + (Math.random() < 0.25 ? 0 : ri(1, 99)); r = n % 100; } while (r === 80);
    const w = numFr(n), pool = [n + 10, n - 10, n + 100, n - 100, n + 1, n - 1].filter(x => x >= 100 && x <= 999 && x !== n && x % 100 !== 80);
    const e = pick([150, 230, 365, 408, 720, 515].filter(x => x !== n));
    if (Math.random() < 0.5) return {
      text: `Which number is "${w}"?`, say: w, lang: FR, choices: shuf([n, ...shuf(pool).slice(0, 2)]), answer: n,
      hints: ["Find the word <b>cent</b> (hundred). The word before it tells you how many hundreds.", "Then read the small number at the end (the tens and ones) and add it.", `Example: "${numFr(e)}" is ${e}. Break yours into the same pieces. Now do yours.`]
    };
    return {
      text: `How do you say ${n} in French?`, choices: shuf([w, ...shuf(pool).slice(0, 2).map(numFr)]), answer: w,
      hints: ["Say the hundreds first (deux cents = 200), then the rest.", "Look at each digit: hundreds, tens and ones. Say each part in French.", `Example: ${e} in French is "${numFr(e)}". Now do yours.`]
    };
  };

  // ----- time -----
  const hr = h => h === 1 ? "une heure" : NUM[h] + " heures";
  const MINW = { 5: "cinq", 10: "dix", 20: "vingt", 25: "vingt-cinq" };
  const clockM = () => {
    const m = pick([5, 10, 20, 25]), minus = Math.random() < 0.5, fm = (h, mm) => `${h}:${pad(mm)}`;
    let H, ans, wr, txt;
    if (!minus) {
      H = ri(1, 12); ans = fm(H, m); txt = `Il est ${hr(H)} ${MINW[m]}.`;
      wr = [fm(H, 60 - m), fm(H === 1 ? 12 : H - 1, 60 - m)];
    } else {
      H = ri(2, 12); ans = fm(H - 1, 60 - m); txt = `Il est ${hr(H)} moins ${MINW[m]}.`;
      wr = [fm(H, m), fm(H - 1, m)];
    }
    return {
      text: `"${txt}" What time is it?`, say: txt, lang: FR, choices: shuf([ans, ...wr]), answer: ans,
      hints: ["Find the hour word first. Then look at what comes after it: a number alone, or <b>moins</b> and a number.", "A number alone means that many minutes <b>after</b> the hour. <b>Moins</b> (minus) means that many minutes <b>before</b> the next hour.", "Example: \"Il est sept heures quinze\" is 7:15. \"Il est huit heures moins cinq\" is 7:55 (five minutes before eight). Now do yours."]
    };
  };
  const clock24 = () => {
    const H = ri(13, 23), m = pick([0, 15, 30, 45]), mw = { 0: "", 15: " quinze", 30: " trente", 45: " quarante-cinq" }[m];
    const fr = `${numFr(H)} heures${mw}`, ans = `${H - 12}:${pad(m)} p.m.`;
    if (Math.random() < 0.5) return {
      text: `Le train part à ${fr}. What time is that on a 12-hour clock?`, say: fr, lang: FR, choices: shuf([ans, `${H - 12}:${pad(m)} a.m.`, `${H - 11}:${pad(m)} p.m.`]), answer: ans,
      hints: ["In France, people often use the 24-hour clock. After noon the hours keep going: 13, 14, 15...", "To change to the 12-hour clock after noon, subtract 12 from the hour. Then decide a.m. or p.m.", "Example: \"dix-sept heures\" is 17:00, and 17 − 12 = 5, so it is 5:00 p.m. Now do yours."]
    };
    const wr = [`${numFr(H - 1)} heures${mw}`, `${numFr(H - 12)} heures${mw}`].filter(x => x !== fr);
    return {
      text: `How do you say ${H - 12}:${pad(m)} p.m. on the 24-hour clock in French?`, choices: shuf([fr, ...wr]), answer: fr,
      hints: ["For p.m. times, the 24-hour clock adds 12 to the hour.", "Add 12 to the hour, say that number in French, then say <b>heures</b>.", "Example: 4:00 p.m. is 16:00, which is \"seize heures\". Now do yours."]
    };
  };

  // ----- dates -----
  const MONTHS = [["janvier", "January"], ["février", "February"], ["mars", "March"], ["avril", "April"], ["mai", "May"], ["juin", "June"], ["juillet", "July"], ["août", "August"], ["septembre", "September"], ["octobre", "October"], ["novembre", "November"], ["décembre", "December"]];
  const dayW = d => d === 1 ? "premier" : numFr(d);
  const dateQ = () => {
    const d = ri(1, 30), mi = ri(0, 11), [mf, me] = MONTHS[mi];
    let d2 = ri(2, 30); if (d2 === d) d2 = d === 30 ? 29 : d + 1;
    const mj = MONTHS[(mi + ri(1, 11)) % 12][0], f = (dd, mm) => `le ${dayW(dd)} ${mm}`, ans = f(d, mf);
    const ex = pick([[5, "mars"], [12, "juin"], [1, "mai"]].filter(x => x[0] !== d || x[1] !== mf));
    return {
      text: `How do you say "${me} ${d}" in French?`, choices: shuf([ans, f(d2, mf), f(d, mj)]), answer: ans,
      hints: ["In French the date goes: <b>le</b> + number + month. The day comes BEFORE the month.", "The first day of the month is special: it uses <b>premier</b>. All other days use normal numbers.", `Example: ${ex[1]} ${ex[0]} is "${f(ex[0], ex[1])}". Now do yours.`]
    };
  };

  // ----- verbs -----
  const VB = {};
  const en6 = (b, t) => ["I " + b, "you " + b, "he " + t, "we " + b, "you " + b, "they " + b];
  const defV = (key, inf, en, f, e6, o = {}) => { VB[key] = Object.assign({ inf, en, e6, vow: false, ex: "être", f: { je: f[0], tu: f[1], il: f[2], elle: f[2], nous: f[3], vous: f[4], ils: f[5] } }, o); };
  defV("être", "être", "to be", ["suis", "es", "est", "sommes", "êtes", "sont"], ["I am", "you are", "he is", "we are", "you are", "they are"], { ex: "parler" });
  defV("parler", "parler", "to speak", ["parle", "parles", "parle", "parlons", "parlez", "parlent"], en6("speak", "speaks"), { ex: "être" });
  defV("voir", "voir", "to see", ["vois", "vois", "voit", "voyons", "voyez", "voient"], en6("see", "sees"), { note: "This verb is special, and the stem changes to <b>voy-</b> for nous and vous." });
  defV("pouvoir", "pouvoir", "to be able to, can", ["peux", "peux", "peut", "pouvons", "pouvez", "peuvent"], ["I can", "you can", "he can", "we can", "you can", "they can"], { note: "This verb is special, so you have to learn its forms." });
  defV("choisir", "choisir", "to choose", ["choisis", "choisis", "choisit", "choisissons", "choisissez", "choisissent"], en6("choose", "chooses"), { ex: "parler", note: "This is an -ir verb. Its endings have <b>-iss-</b> for nous, vous and ils." });
  defV("venir", "venir", "to come", ["viens", "viens", "vient", "venons", "venez", "viennent"], en6("come", "comes"), { note: "This verb is special: the stem changes for je, tu, il and ils." });
  defV("devoir", "devoir", "to have to, must", ["dois", "dois", "doit", "devons", "devez", "doivent"], ["I must", "you must", "he must", "we must", "you must", "they must"], { note: "This verb is special, so you have to learn its forms." });
  defV("dire", "dire", "to say", ["dis", "dis", "dit", "disons", "dites", "disent"], en6("say", "says"), { note: "This verb is special. Watch out for <b>vous dites</b>." });
  defV("savoir", "savoir", "to know (a fact)", ["sais", "sais", "sait", "savons", "savez", "savent"], en6("know", "knows"), { note: "This verb is special, so you have to learn its forms." });
  defV("mettre", "mettre", "to put, to place", ["mets", "mets", "met", "mettons", "mettez", "mettent"], en6("put", "puts"), { note: "This is an -re verb, and it keeps the double <b>tt</b> for nous, vous and ils." });
  defV("boire", "boire", "to drink", ["bois", "bois", "boit", "buvons", "buvez", "boivent"], en6("drink", "drinks"), { note: "This verb is special: the stem changes to <b>buv-</b> for nous and vous." });
  defV("partir", "partir", "to leave", ["pars", "pars", "part", "partons", "partez", "partent"], en6("leave", "leaves"), { note: "This -ir verb drops the last letter of the stem for je, tu and il." });
  defV("lire", "lire", "to read", ["lis", "lis", "lit", "lisons", "lisez", "lisent"], en6("read", "reads"), { note: "This verb is special, but the endings are easy to learn." });
  const PR = ["je", "tu", "il", "elle", "nous", "vous", "ils"];
  const verbQ = key => () => {
    const v = VB[key], p = pick(PR), ans = v.f[p], ex = VB[v.ex];
    const wr = shuf([...new Set(PR.map(x => v.f[x]))].filter(x => x !== ans)).slice(0, 2);
    const pre = p === "je" && v.vow ? "j'" : p + " ";
    return {
      text: `${pre}___ (${v.inf}, ${v.en})`, choices: shuf([ans, ...wr]), answer: ans,
      hints: ["French verbs change to match WHO is doing the action. Find the person word.", `${v.note || ""} ${ans.length > 3 ? `The right form ends in "-${ans.slice(-2)}".` : `The right form is short, only ${ans.length} letters, and starts with "${ans[0]}".`}`.trim(), `Example: with ${ex.inf} (${ex.en}): je ${ex.f.je}, nous ${ex.f.nous}, vous ${ex.f.vous}. Now find yours.`]
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
  const typeVerb = (keys) => () => {
    const v = VB[pick(keys)], p = pick(PR), ans = v.f[p], ex = VB[v.ex], pre = p === "je" && v.vow ? "j'" : p + " ";
    return {
      text: `${pre}___ (${v.inf}, ${v.en}) Type the missing verb form.`, textInput: true, answer: ans,
      hints: ["Find who is doing the action, then think about how this verb changes for that person.", `The answer has ${ans.length} letters and starts with "${ans[0]}".`, `Example: with ${ex.inf}: nous ${ex.f.nous}, vous ${ex.f.vous}. Now do yours. (Accents are optional.)`]
    };
  };

  // ----- reflexive pronouns -----
  const REFL = [["laver", "wash", "lav"], ["coucher", "go to bed", "couch"], ["réveiller", "wake up", "réveill"], ["dépêcher", "hurry", "dépêch"], ["reposer", "rest", "repos"], ["brosser", "brush", "bross"], ["doucher", "take a shower", "douch"]];
  const RP = { je: "me", tu: "te", il: "se", nous: "nous", vous: "vous", ils: "se" };
  const RE = { je: "e", tu: "es", il: "e", nous: "ons", vous: "ez", ils: "ent" };
  const reflQ = () => {
    const [inf, en, stem] = pick(REFL), p = pick(Object.keys(RP)), ans = RP[p];
    const wr = shuf(["me", "te", "se", "nous", "vous"].filter(x => x !== ans)).slice(0, 2);
    return {
      text: `${p} ___ ${stem}${RE[p]} (se ${inf}, to ${en})`, choices: shuf([ans, ...wr]), answer: ans,
      hints: ["A reflexive verb needs a little extra word that matches the person. Who is doing the action?", "The pairs go in order: je → <b>me</b>, tu → <b>te</b>, il/elle/ils/elles → <b>se</b>, nous → <b>nous</b>, vous → <b>vous</b>.", "Example: Tu te lèves (You get up). Nous nous levons (We get up). Now find yours."]
    };
  };

  // ----- past, imperfect, future -----
  const PP = [["finir", "to finish", "fini"], ["choisir", "to choose", "choisi"], ["réussir", "to succeed", "réussi"], ["grandir", "to grow", "grandi"], ["vendre", "to sell", "vendu"], ["attendre", "to wait", "attendu"], ["répondre", "to answer", "répondu"], ["perdre", "to lose", "perdu"], ["entendre", "to hear", "entendu"], ["rendre", "to give back", "rendu"]];
  const ppIrReQ = () => {
    const [inf, en, part] = pick(PP), ex = pick(PP.filter(x => x[0] !== inf && x[0].slice(-2) === inf.slice(-2)));
    return {
      text: `Hier, j'ai ___. (${inf}, ${en}) Type the past word.`, textInput: true, answer: part,
      hints: [inf.endsWith("ir") ? "For -ir verbs, take off the last letter <b>r</b>." : "For -re verbs, take off the <b>-re</b> and add a new ending.", inf.endsWith("ir") ? "The past word of an -ir verb ends in a vowel with no accent." : "The past word of an -re verb ends in <b>-u</b>.", `Example: ${ex[0]} → ${ex[2]}. So: "Hier, j'ai ${ex[2]}." Now do yours.`]
    };
  };
  const IRR = [["avoir", "to have", "eu"], ["être", "to be", "été"], ["faire", "to do", "fait"], ["prendre", "to take", "pris"], ["voir", "to see", "vu"], ["dire", "to say", "dit"], ["vouloir", "to want", "voulu"], ["pouvoir", "to be able to", "pu"], ["lire", "to read", "lu"], ["écrire", "to write", "écrit"], ["mettre", "to put", "mis"], ["boire", "to drink", "bu"]];
  const irrQ = () => {
    const [inf, en, part] = pick(IRR), ex = pick(IRR.filter(x => x[0] !== inf));
    return {
      text: `Hier, j'ai ___. (${inf}, ${en}) Type the past word.`, textInput: true, answer: part,
      hints: ["These verbs are irregular. Their past word does not follow the usual rule, so it has to be learned.", `It starts with "${part[0]}" and has ${part.length} letter${part.length > 1 ? "s" : ""}.`, `Example: ${ex[0]} → ${ex[2]}. So: "Hier, j'ai ${ex[2]}." Now do yours.`]
    };
  };
  const IMP = [["parler", "speak", "parl"], ["jouer", "play", "jou"], ["chanter", "sing", "chant"], ["regarder", "watch", "regard"], ["habiter", "live", "habit"], ["aimer", "like", "aim"], ["danser", "dance", "dans"], ["finir", "finish", "finiss"], ["prendre", "take", "pren"], ["faire", "do", "fais"], ["aller", "go", "all"], ["avoir", "have", "av"]];
  const IE = { je: "ais", tu: "ais", il: "ait", elle: "ait", nous: "ions", vous: "iez", ils: "aient" };
  const impQ = () => {
    const [inf, en, stem] = pick(IMP), p = pick(PR), ans = stem + IE[p];
    const wr = shuf([...new Set(PR.map(x => stem + IE[x]))].filter(x => x !== ans)).slice(0, 2);
    const pre = p === "je" && /^[aeiouhéè]/.test(stem) ? "j'" : p + " ";
    const ex = pick([["chanter", "chant"], ["finir", "finiss"]].filter(x => x[0] !== inf));
    return {
      text: `Quand j'étais petit, ${pre}___ souvent. (${inf}, to ${en})`, choices: shuf([ans, ...wr]), answer: ans,
      hints: ["The imperfect tells what used to happen. Start with the <b>nous</b> form of the verb, and drop <b>-ons</b>.", "Then add the ending for the person: -ais, -ais, -ait, -ions, -iez, -aient (je, tu, il, nous, vous, ils).", `Example: ${ex[0]} → nous ${ex[1]}ons → ${ex[1]}. So: je ${ex[1]}ais, nous ${ex[1]}ions. Now do yours.`]
    };
  };
  const FUT = ["parler", "jouer", "chanter", "regarder", "manger", "danser", "finir", "choisir", "habiter", "voyager"];
  const FE = { je: "ai", tu: "as", il: "a", elle: "a", nous: "ons", vous: "ez", ils: "ont" };
  const futQ = () => {
    const inf = pick(FUT), p = pick(PR), ans = inf + FE[p], pre = p === "je" && /^[aeiouh]/.test(inf) ? "j'" : p + " ";
    const ex = pick(["aimer", "chercher", "finir"].filter(x => x !== inf));
    if (Math.random() < 0.5) {
      const wr = shuf([...new Set(PR.map(x => inf + FE[x]))].filter(x => x !== ans)).slice(0, 2);
      return {
        text: `Demain, ${pre}___ (${inf}).`, choices: shuf([ans, ...wr]), answer: ans,
        hints: ["Demain (tomorrow) tells you to use the future. The future starts with the whole verb, like in the dictionary.", "Keep the whole infinitive and add an ending: -ai, -as, -a, -ons, -ez, -ont. Which one matches the person?", `Example: ${ex} + ons = ${ex}ons (nous), and ${ex} + ai = ${ex}ai (je). Now do yours.`]
      };
    }
    return {
      text: `Demain, ${pre}___ (${inf}). Type the future form.`, textInput: true, answer: ans,
      hints: ["The future starts with the whole verb, like in the dictionary. Then you add an ending.", `The endings are -ai, -as, -a, -ons, -ez, -ont. The word has ${ans.length} letters.`, `Example: ${ex} + ons = ${ex}ons (nous), and ${ex} + ai = ${ex}ai (je). Now do yours.`]
    };
  };

  // ----- adverbs -----
  const ADV = [["lent", "slow", "lentement", "slowly"], ["rapide", "fast", "rapidement", "quickly"], ["heureux", "happy", "heureusement", "luckily"], ["doux", "gentle", "doucement", "gently"], ["facile", "easy", "facilement", "easily"], ["calme", "calm", "calmement", "calmly"], ["sérieux", "serious", "sérieusement", "seriously"], ["complet", "complete", "complètement", "completely"], ["tranquille", "quiet", "tranquillement", "quietly"], ["malheureux", "unhappy", "malheureusement", "unfortunately"]];
  const advQ = () => {
    const [adj, en, adv, ena] = pick(ADV), ex = pick([["lent", "lentement"], ["facile", "facilement"], ["heureux", "heureusement"]].filter(x => x[0] !== adj));
    return {
      text: `Type the French word for "${ena}". It comes from <b>${adj}</b> (${en}).`, textInput: true, answer: adv,
      hints: ["Most adverbs that end in -ment (like -ly in English) are built from the describing word.", "Use the <b>feminine</b> form of the describing word, then add <b>-ment</b>.", `Example: ${ex[0]} → ${ex[1]}. Now do yours. (Accents are optional.)`]
    };
  };

  // ----- special -----
  const A = {};
  const feats = (a, b) => a;

  // ================= LEVEL 7 =================
  const CONTR = [["Je vais ___ cinéma. (to the)", "au", ["à la", "aux"]], ["Nous allons ___ piscine. (to the)", "à la", ["au", "aux"]], ["Elle parle ___ enfants. (to the)", "aux", ["au", "à la"]], ["Tu vas ___ école. (to the)", "à l'", ["au", "à la"]], ["Le chat ___ voisin. (of the)", "du", ["de la", "des"]], ["La porte ___ maison. (of the)", "de la", ["du", "des"]], ["Les jouets ___ enfants. (of the)", "des", ["du", "de la"]], ["La couleur ___ ordinateur. (of the)", "de l'", ["du", "de la"]], ["Je donne le livre ___ professeur. (to the)", "au", ["à la", "aux"]], ["Le nom ___ garçon. (of the)", "du", ["de la", "des"]]];
  const ADJB = [["a big house", "une grande maison", ["une maison grande", "un grande maison"]], ["a small dog", "un petit chien", ["un chien petit", "une petit chien"]], ["a good friend (boy)", "un bon ami", ["un ami bon", "une bon ami"]], ["a pretty flower", "une jolie fleur", ["une fleur jolie", "un joli fleur"]], ["a new bike", "un nouveau vélo", ["un vélo nouveau", "une nouveau vélo"]], ["a bad day", "une mauvaise journée", ["une journée mauvaise", "un mauvaise journée"]], ["a young girl", "une jeune fille", ["une fille jeune", "un jeune fille"]], ["a long story", "une longue histoire", ["une histoire longue", "un long histoire"]], ["a beautiful garden", "un beau jardin", ["un jardin beau", "une beau jardin"]], ["an old book", "un vieux livre", ["un livre vieux", "une vieux livre"]]].map(x => [`Which is right? <b>${x[0]}</b>`, x[1], x[2]]);
  const COLQ = [["a green skirt", "une jupe verte", ["une jupe vert", "une verte jupe"]], ["white cats", "des chats blancs", ["des chats blanc", "des blancs chats"]], ["a blue book", "un livre bleu", ["un livre bleue", "un bleu livre"]], ["yellow flowers", "des fleurs jaunes", ["des fleurs jaune", "des jaunes fleurs"]], ["a red car", "une voiture rouge", ["une voiture rouges", "une rouge voiture"]], ["black bags", "des sacs noirs", ["des sacs noir", "des noirs sacs"]], ["a gray house", "une maison grise", ["une maison gris", "une grise maison"]], ["orange shoes", "des chaussures orange", ["des chaussures oranges", "des orange chaussures"]]].map(x => [`Which is right? <b>${x[0]}</b>`, x[1], x[2]]);
  const OURQ = [["___ maison (our house)", "notre", ["nos", "leur"]], ["___ amis (our friends)", "nos", ["notre", "vos"]], ["___ chien (your dog, you are talking to several people)", "votre", ["vos", "leur"]], ["___ livres (their books)", "leurs", ["leur", "nos"]], ["___ voiture (their car)", "leur", ["leurs", "notre"]], ["___ parents (your parents, you are talking to a teacher)", "vos", ["votre", "leurs"]], ["___ classe (our class)", "notre", ["nos", "votre"]], ["___ enfants (their children)", "leurs", ["leur", "vos"]], ["___ père (your father, polite)", "votre", ["vos", "notre"]], ["___ jardin (our garden)", "notre", ["nos", "leur"]]];
  const ESTQ = [["Do you like pizza?", "Est-ce que tu aimes la pizza ?", ["Tu est-ce que aimes la pizza ?", "Est-ce tu aimes que la pizza ?"]], ["Does she live here?", "Est-ce qu'elle habite ici ?", ["Est-ce que elle habite ici ?", "Elle est-ce qu'habite ici ?"]], ["Do you have a dog? (polite)", "Est-ce que vous avez un chien ?", ["Vous est-ce que avez un chien ?", "Est-ce vous que avez un chien ?"]], ["Are they coming?", "Est-ce qu'ils viennent ?", ["Est-ce que ils viennent ?", "Ils est-ce qu'viennent ?"]], ["Where do you live?", "Où est-ce que tu habites ?", ["Est-ce que où tu habites ?", "Tu où est-ce que habites ?"]], ["What do you eat?", "Qu'est-ce que tu manges ?", ["Que est-ce que tu manges ?", "Est-ce que qu' tu manges ?"]], ["Why is he sad?", "Pourquoi est-ce qu'il est triste ?", ["Est-ce que pourquoi il est triste ?", "Il pourquoi est-ce que est triste ?"]], ["Do we play today?", "Est-ce que nous jouons aujourd'hui ?", ["Nous est-ce que jouons aujourd'hui ?", "Est-ce nous jouons que aujourd'hui ?"]]].map(x => ["How do you ask: <b>" + x[0] + "</b>", x[1], x[2]]);
  const JOUEQ = [["Je joue ___ football.", "au", ["du", "de la"]], ["Elle joue ___ piano.", "du", ["au", "de la"]], ["Nous jouons ___ guitare.", "de la", ["à la", "du"]], ["Tu joues ___ tennis.", "au", ["du", "aux"]], ["Il joue ___ violon.", "du", ["au", "de la"]], ["Ils jouent ___ échecs.", "aux", ["au", "des"]], ["Je joue ___ flûte.", "de la", ["à la", "du"]], ["Vous jouez ___ basket.", "au", ["du", "de la"]], ["Je joue ___ trompette.", "de la", ["à la", "au"]], ["Elle joue ___ batterie (drums).", "de la", ["à la", "du"]]];
  A.l7 = [
    les("Numbers up to 1000", numQ2, tNum("Numbers up to 1000", [100, 101, 150, 200, 250, 365, 408, 500, 720, 999, 1000], "<b>Cent</b> is 100. Say the hundreds first: <b>deux cents</b> (200), <b>trois cents</b> (300). Put the small number after: <b>deux cent vingt-cinq</b>. The <b>s</b> on cents only stays when nothing follows. <b>Mille</b> is 1000.")),
    les("The verb voir", verbQ("voir"), tVerb("voir", "<b>Voir</b> has the stem <b>voi-</b> for je, tu and il, and <b>voy-</b> for nous and vous.", "Je vois un oiseau = I see a bird.")),
    les("The verb pouvoir", verbQ("pouvoir"), tVerb("pouvoir", "<b>Pouvoir</b> is special. Je and tu are the same: <b>peux</b>.", "Use it with another verb: Je peux jouer = I can play.")),
    les("Verbs that end in -ir", verbQ("choisir"), tVerb("choisir", "Regular -ir verbs drop the <b>-ir</b> and add: -is, -is, -it, -issons, -issez, -issent. Like finir: je finis, nous finissons.", "Other -ir verbs like this: réussir, grandir, remplir.")),
    les("Au, à la, du, des", mc(CONTR, ["<b>à</b> means \"to\" and <b>de</b> means \"of\" or \"from\". Look at the English: to the, or of the?", "With <b>à</b>: au (masculine), à la (feminine), à l' (vowel), aux (many). With <b>de</b>: du, de la, de l', des.", "Example: Je vais au parc (to the park). Le nom de la fille (the girl's name). Now find yours."], 2),
      [S("Little words join up", "à + le = au", "When <b>à</b> meets <b>le</b>, they join: <b>au</b>. When <b>à</b> meets <b>les</b>, they join: <b>aux</b>. Je vais <b>au</b> parc."), S("Of the", "de + le = du", "In the same way, <b>de + le = du</b> and <b>de + les = des</b>. La, and l' do not join: la porte <b>de la</b> maison."), S("Tip", "🏠", "Use a table: à la / au / aux / à l'  and  de la / du / des / de l'. Check if the noun is masculine, feminine, or many.")]),
    les("Places in town", vocab(B.town), tVocab(B.town)),
    les("Shops", vocab(B.shops), tVocab(B.shops)),
    les("More jobs", vocab(B.jobs2), tVocab(B.jobs2)),
    les("Describing words before the noun", mc(ADJB, ["Some short, common describing words go <b>before</b> the noun, not after it. Is this one of them?", "Remember the short words about Beauty, Age, Goodness and Size: beau, joli, jeune, vieux, nouveau, bon, mauvais, grand, petit, long. Also match masculine or feminine.", "Example: un gros chat (a big cat), une petite fille (a little girl). Now find yours."]),
      [S("Before the noun", "un petit chien · une grande maison", "A few short describing words go <b>before</b> the noun: petit, grand, beau, joli, bon, mauvais, jeune, vieux, nouveau, long."), S("BAGS", "B · A · G · S", "Remember <b>BAGS</b>: Beauty (beau, joli), Age (jeune, vieux, nouveau), Goodness (bon, mauvais), Size (grand, petit, long)."), S("Tip", "🎒", "They still match the noun: un <b>beau</b> garçon, une <b>belle</b> fille, un <b>bon</b> ami, une <b>bonne</b> idée.")]),
    les("Colors go after the noun", mc(COLQ, ["Colors go <b>after</b> the noun. They also match the noun in gender and number.", "A feminine noun adds <b>-e</b> to the color. Many things add <b>-s</b>. A few colors, like orange, never change.", "Example: une chaise bleue (a blue chair), des livres rouges (red books). Now find yours."]),
      [S("Colors come after", "une voiture rouge", "A color goes <b>after</b> the noun: une voiture <b>rouge</b>, un chat <b>noir</b>."), S("Colors match too", "verte · vertes · verts", "A color agrees: une jupe <b>verte</b> (feminine), des sacs <b>noirs</b> (many). But <b>orange</b> and <b>marron</b> never change."), S("Tip", "🎨", "Say the noun first, then paint it with its color!")]),
    les("Notre, votre, leur", mc(OURQ, ["Who owns it: we, you (several people or polite), or they? And is the thing one or many?", "<b>notre / nos</b> = our, <b>votre / vos</b> = your (vous), <b>leur / leurs</b> = their. The short one is for one thing, the one with an s is for many things.", "Example: notre école (our school), vos cahiers (your notebooks), leurs idées (their ideas). Now find yours."]),
      [S("Our, your, their", "notre · votre · leur", "For one thing use <b>notre</b> (our), <b>votre</b> (your, with vous), <b>leur</b> (their)."), S("Many things", "nos · vos · leurs", "For many things use <b>nos</b>, <b>vos</b>, <b>leurs</b>. Here masculine and feminine are the same!"), S("Tip", "💡", "Match the thing owned: notre maison, nos maisons.")]),
    les("Asking with est-ce que", mc(ESTQ, ["A simple way to ask a question is to put <b>est-ce que</b> at the start.", "<b>Est-ce que</b> comes first, then the usual sentence. Before il, elle, ils or a vowel it becomes <b>est-ce qu'</b>. Question words go before it.", "Example: Est-ce que tu chantes ? Où est-ce que vous allez ? Now find yours."]),
      [S("Est-ce que", "Est-ce que tu joues ?", "Put <b>Est-ce que</b> before a sentence and your voice goes up. It turns a sentence into a question."), S("With a question word", "Où est-ce que tu habites ?", "Question words (où, quand, pourquoi, comment) go first. Then comes <b>est-ce que</b>."), S("Tip", "❓", "Before il, elle, ils or a vowel: <b>Est-ce qu'il vient ?</b>")]),
    les("Time with minutes", clockM, [S("Minutes after", "🕒 Il est trois heures dix.", "Say the hour, then the minutes: <b>Il est trois heures dix</b> = 3:10. <b>Cinq</b>, <b>dix</b>, <b>vingt</b>, <b>vingt-cinq</b> are minutes after the hour."), S("Minutes before", "Il est quatre heures moins dix.", "<b>Moins</b> means minus. Quatre heures <b>moins dix</b> = ten minutes before four = 3:50."), S("Tip", "⏰", "Moins always points to the NEXT hour. Count back from it!")]),
    les("Saying the date", dateQ, [S("Le + number + month", "le cinq mars", "In French the date is: <b>le</b>, then the day number, then the month. 5 March is <b>le cinq mars</b>."), S("The first of the month", "le premier mai", "The first day is special: <b>le premier</b>. All other days use normal numbers: le deux, le trois..."), S("Ask", "Quelle est la date ?", "<b>Quelle est la date ?</b> or <b>Quel jour sommes-nous ?</b> Answer: <b>Nous sommes le douze juin.</b>")]),
    les("Hobbies", vocab(B.hobbies), tVocab(B.hobbies)),
    les("Jouer au or jouer de la", mc(JOUEQ, ["Is it a <b>sport or game</b>, or an <b>instrument</b>? They use different little words.", "Sports and games use <b>jouer à</b> (au, à la, aux). Instruments use <b>jouer de</b> (du, de la, de l').", "Example: Il joue au tennis (sport). Il joue de la harpe (instrument). Now find yours."]),
      [S("Sports and games", "jouer au foot · jouer aux cartes", "For sports and games say <b>jouer à</b>: jouer <b>au</b> football, jouer <b>aux</b> échecs."), S("Instruments", "jouer du piano · jouer de la guitare", "For instruments say <b>jouer de</b>: jouer <b>du</b> piano, jouer <b>de la</b> flûte."), S("Tip", "⚽🎹", "Ask yourself: Do I kick or hit it, or do I make music with it?")]),
    les("Likes and dislikes", vocab(B.likes), tVocab(B.likes)),
    les("Past words: -ir and -re verbs", ppIrReQ, [S("-ir verbs", "finir → fini", "To talk about the past with <b>avoir</b>, -ir verbs drop the <b>-r</b>: finir → fini, choisir → choisi."), S("-re verbs", "vendre → vendu", "-re verbs drop the <b>-re</b> and add <b>-u</b>: vendre → vendu, attendre → attendu."), S("Use it", "J'ai fini. Il a vendu sa bicyclette.", "Put the helper <b>avoir</b> first: j'ai fini, tu as fini, nous avons attendu.")])
  ];
  A.l7.push(MIX("Mixed practice", [A.l7[0], A.l7[2], A.l7[4], A.l7[8], A.l7[12]]));
  A.l7.push(MIX("Level 7 Challenge", [A.l7[0], A.l7[1], A.l7[2], A.l7[3], A.l7[4], A.l7[8], A.l7[9], A.l7[10], A.l7[11], A.l7[12], A.l7[13], A.l7[15]]));

  // ================= LEVEL 8 =================
  const ETRE = [["Hier, je ___ allé au parc. (a boy)", "suis", ["ai", "es"]], ["Hier, tu ___ arrivée à midi. (a girl)", "es", ["as", "est"]], ["Ce matin, il ___ parti tôt.", "est", ["a", "es"]], ["Hier, nous ___ rentrés à la maison.", "sommes", ["avons", "sont"]], ["Samedi, vous ___ venus chez moi.", "êtes", ["avez", "sont"]], ["Elles ___ restées à la maison.", "sont", ["ont", "êtes"]], ["Elle ___ tombée dans l'herbe.", "est", ["a", "sont"]], ["Ils ___ sortis après le dîner.", "sont", ["ont", "sommes"]], ["Mon frère ___ entré dans la classe.", "est", ["a", "sont"]], ["Nous ___ montés dans le train.", "sommes", ["avons", "êtes"]]];
  const DIRQ = [["Je vois le chat. → Je ___ vois.", "le", ["la", "les", "l'"]], ["Tu prends la clé ? → Tu ___ prends ?", "la", ["le", "les", "l'"]], ["Nous regardons les films. → Nous ___ regardons.", "les", ["le", "la", "l'"]], ["Elle aime le chocolat. → Elle ___ aime.", "l'", ["le", "la", "les"]], ["Il mange la pomme. → Il ___ mange.", "la", ["le", "les", "l'"]], ["J'écoute les chansons. → Je ___ écoute.", "les", ["le", "la", "l'"]], ["Vous achetez le pain. → Vous ___ achetez.", "le", ["la", "les", "l'"]], ["Je lis la lettre. → Je ___ lis.", "la", ["le", "les", "l'"]], ["Tu ouvres les fenêtres. → Tu ___ ouvres.", "les", ["le", "la", "l'"]], ["Nous aimons l'école. → Nous ___ aimons.", "l'", ["le", "la", "les"]]];
  const MALQ = [["tête", "à la"], ["dos", "au"], ["dents", "aux"], ["ventre", "au"], ["gorge", "à la"], ["pieds", "aux"], ["bras", "au"], ["main", "à la"], ["genou", "au"], ["yeux", "aux"], ["oreille", "à l'"]].map(x => [`J'ai mal ___ ${x[0]}.`, x[1], ["au", "à la", "aux", "à l'"].filter(y => y !== x[1])]);
  const QTYQ = [["un kilo ___ pommes", "de", ["du", "des", "d'"]], ["une bouteille ___ eau", "d'", ["de", "du", "de l'"]], ["beaucoup ___ amis", "d'", ["de", "des", "du"]], ["un verre ___ lait", "de", ["du", "d'", "des"]], ["assez ___ pain", "de", ["du", "d'", "des"]], ["une boîte ___ chocolats", "de", ["des", "du", "d'"]], ["trop ___ sucre", "de", ["du", "d'", "des"]], ["un morceau ___ gâteau", "de", ["du", "d'", "des"]], ["un litre ___ jus", "de", ["du", "d'", "des"]], ["un paquet ___ biscuits", "de", ["des", "du", "d'"]]].map(x => [`Fill in: <b>${x[0]}</b>`, x[1], x[2]]);
  const PLQ = [["J'habite ___ Paris.", "à", ["en", "au", "aux"]], ["J'habite ___ France.", "en", ["à", "au", "aux"]], ["J'habite ___ Canada.", "au", ["en", "à", "aux"]], ["J'habite ___ États-Unis.", "aux", ["au", "en", "à"]], ["Il va ___ Japon.", "au", ["en", "à", "aux"]], ["Elle va ___ Espagne.", "en", ["au", "à", "aux"]], ["Nous allons ___ Brésil.", "au", ["en", "à", "aux"]], ["Ils vont ___ Londres.", "à", ["en", "au", "aux"]], ["Tu vas ___ Mexique.", "au", ["en", "à", "aux"]], ["Elle habite ___ Belgique.", "en", ["au", "à", "aux"]], ["Je voyage ___ Italie.", "en", ["au", "à", "aux"]]];
  const MEILQ = [["Ce gâteau est ___ que l'autre. (better)", "meilleur", ["mieux", "meilleure", "meilleurs"]], ["Elle chante ___ que moi. (better)", "mieux", ["meilleur", "meilleure", "meilleurs"]], ["Mes notes sont ___ que l'an dernier. (better)", "meilleures", ["meilleur", "mieux", "meilleure"]], ["Ma soupe est ___ que la tienne. (better)", "meilleure", ["meilleur", "mieux", "meilleurs"]], ["Il joue ___ au foot. (better)", "mieux", ["meilleur", "meilleure", "meilleurs"]], ["C'est le ___ jour de ma vie. (best)", "meilleur", ["mieux", "meilleure", "meilleurs"]], ["Tu parles ___ français que moi. (better)", "mieux", ["meilleur", "meilleure", "meilleurs"]], ["Ce sont mes ___ amis. (best)", "meilleurs", ["meilleur", "mieux", "meilleure"]]];
  A.l8 = [
    les("The verb venir", verbQ("venir"), tVerb("venir", "<b>Venir</b> is special: viens, viens, vient, then venons, venez and <b>viennent</b>. Je viens de + verb means \"I just did it\".", "Je viens de manger = I have just eaten.")),
    les("The verb devoir", verbQ("devoir"), tVerb("devoir", "<b>Devoir</b> means \"must\" or \"have to\" when it is followed by another verb. Je dois partir = I must leave.", "Without another verb it can also mean \"to owe\": Je te dois un euro.")),
    les("The verb dire", verbQ("dire"), tVerb("dire", "<b>Dire</b> is special. Watch the vous form: <b>vous dites</b>, not \"vous disez\".", "Qu'est-ce que tu dis ? = What are you saying?")),
    les("Reflexive verbs: me, te, se", reflQ, [S("Do it to yourself", "Je me lave.", "Reflexive verbs have an extra word: <b>je me lave</b> (I wash myself), <b>tu te laves</b>."), S("The little words", "me · te · se · nous · vous · se", "The pairs: je <b>me</b>, tu <b>te</b>, il/elle <b>se</b>, nous <b>nous</b>, vous <b>vous</b>, ils/elles <b>se</b>."), S("Tip", "🪥", "Before a vowel: je <b>m'</b>habille, tu <b>t'</b>habilles.")]),
    les("The past with être", mc(ETRE, ["Some verbs use <b>être</b> instead of <b>avoir</b> in the past. These are verbs of movement, like aller, venir, partir, arriver, tomber, rester.", "Use the form of <b>être</b> that matches the person: suis, es, est, sommes, êtes, sont.", "Example: Marie est allée à Paris. Les garçons sont arrivés. Now find yours."]),
      [S("A special group", "aller · venir · partir · arriver", "Verbs of coming and going use <b>être</b> to talk about the past: <b>Je suis allé</b> (I went), <b>Elle est partie</b> (She left)."), S("The past word agrees", "il est allé · elle est allée · ils sont allés", "With être, the past word acts like a describing word: add <b>-e</b> for a girl and <b>-s</b> for many."), S("Tip", "🏠", "Think of a little house with the verbs inside: aller, venir, arriver, partir, sortir, entrer, rester, tomber.")]),
    les("Irregular past words", irrQ, [S("Not the usual -é", "faire → fait", "Many very common verbs do not follow the -é rule. You just have to learn them."), S("The list", "avoir → eu<br>être → été<br>faire → fait<br>prendre → pris<br>voir → vu<br>dire → dit", "Also: vouloir → voulu, pouvoir → pu, lire → lu, écrire → écrit, mettre → mis, boire → bu."), S("Tip", "🧠", "Make flash cards: the verb on one side and the past word on the other. Use them with <b>j'ai</b>.")]),
    les("What used to happen: the imperfect", impQ, [S("Used to", "Je jouais au parc.", "The imperfect tells what <b>used to</b> happen, or what things were like. Quand j'étais petit, je jouais au parc."), S("How to make it", "nous parlons → parl- + ais", "Take the <b>nous</b> form, drop <b>-ons</b>, and add: -ais, -ais, -ait, -ions, -iez, -aient."), S("Tip", "🕰️", "Words like <b>autrefois</b>, <b>souvent</b> and <b>toujours</b> go with the imperfect.")]),
    les("Travel words", vocab(B.travel), tVocab(B.travel)),
    les("Sports words", vocab(B.sport), tVocab(B.sport)),
    les("J'ai mal: au, à la, aux", mc(MALQ, ["Say what hurts with <b>J'ai mal à...</b>. Is the body part masculine, feminine, or many?", "<b>à + le = au</b>, <b>à la</b> for feminine, <b>à l'</b> before a vowel, <b>aux</b> for many.", "Example: J'ai mal au nez (nose is masculine). J'ai mal à la jambe (feminine). Now find yours."], 2),
      [S("Where does it hurt?", "J'ai mal à la tête.", "To say something hurts, use <b>J'ai mal à</b> and the body part. J'ai mal <b>à la</b> tête = I have a headache."), S("Au, à la, aux", "au dos · à la main · aux dents", "Use <b>au</b> for masculine, <b>à la</b> for feminine, <b>à l'</b> before a vowel, and <b>aux</b> for many."), S("Tip", "🩺", "Tell the doctor: <b>Où as-tu mal ?</b> (Where does it hurt?)")]),
    les("Looking after Earth", vocab(B.env), tVocab(B.env)),
    les("Direct pronouns: le, la, les", mc(DIRQ, ["The little word replaces the thing in the sentence. Is that thing masculine, feminine, one, or many?", "<b>le</b> = him or it (masculine), <b>la</b> = her or it (feminine), <b>les</b> = them, <b>l'</b> before a vowel.", "Example: Je prends le livre → Je le prends. Je vois les chats → Je les vois. Now find yours."], 3),
      [S("Don't repeat the noun", "Je mange la pomme → Je la mange.", "Instead of repeating a noun, use <b>le, la, les</b>. They go <b>before</b> the verb."), S("The little words", "le · la · l' · les", "<b>Le</b> for masculine, <b>la</b> for feminine, <b>les</b> for many. Before a vowel use <b>l'</b>: Je l'aime."), S("Tip", "🔁", "In English the pronoun goes after the verb (I eat it), but in French it goes before.")]),
    les("Making adverbs with -ment", advQ, [S("Like -ly", "lent → lentement", "In English many adverbs end in <b>-ly</b>. In French they end in <b>-ment</b>."), S("How to make one", "lent → lente + ment", "Take the <b>feminine</b> form of the describing word and add <b>-ment</b>: heureuse → heureusement, douce → doucement."), S("Tip", "🐢", "A few adverbs are special (like vraiment, gentiment), but most follow this rule.")]),
    les("The 24-hour clock", clock24, [S("Hours after noon", "15 h = 3 p.m.", "In France, schedules often use the <b>24-hour clock</b>. After noon the hours continue: 13, 14, 15..."), S("Say it", [13, 15, 18, 20, 23].map(h => word(`${numFr(h)} heures`, `${h}:00 = ${h - 12}:00 p.m.`)).join("<br>"), "<b>Tap to hear.</b> To go back to the 12-hour clock, subtract 12."), S("Tip", "🚆", "Train and bus times use it. Le train part à <b>seize heures trente</b> = 4:30 p.m.")]),
    les("A kilo of, a bottle of", mc(QTYQ, ["After a word for an amount (a kilo, a bottle, lots), French uses <b>de</b> alone, with no le/la/les.", "Do not use du, de la or des after a quantity. If the next word starts with a vowel, <b>de</b> becomes <b>d'</b>.", "Example: un kilo de riz, une tasse de thé, beaucoup d'enfants. Now find yours."], 3),
      [S("Amounts", "un kilo de · une bouteille de · beaucoup de", "After an amount, use <b>de</b>: un kilo <b>de</b> pommes, un verre <b>de</b> lait, beaucoup <b>de</b> temps."), S("Before a vowel", "beaucoup d'amis · une bouteille d'eau", "If the next word starts with a vowel, <b>de</b> becomes <b>d'</b>."), S("Tip", "🛒", "Remember: du, de la, des disappear after an amount!")]),
    les("À Paris, en France, au Canada", mc(PLQ, ["Is it a city, a feminine country, a masculine country, or a country with a plural name?", "<b>à</b> for cities, <b>en</b> for feminine countries (they usually end in -e), <b>au</b> for masculine countries, <b>aux</b> for plural ones.", "Example: à Rome, en Allemagne, au Sénégal, aux Pays-Bas. Now find yours."], 3),
      [S("Cities", "à Paris · à Londres", "Use <b>à</b> for cities: J'habite <b>à</b> Paris."), S("Countries", "en France · au Canada · aux États-Unis", "Use <b>en</b> for feminine countries (they end in -e), <b>au</b> for masculine countries, and <b>aux</b> for plural countries."), S("Tip", "🗺️", "Most countries that end in -e are feminine: la France, l'Italie. Le Mexique is an exception!")]),
    les("Better: meilleur and mieux", mc(MEILQ, ["Is the English word describing a noun (a better cake) or an action (sings better)?", "<b>meilleur</b> describes a noun and agrees with it (meilleure, meilleurs). <b>mieux</b> describes an action and never changes.", "Example: C'est un meilleur film. Il court mieux que moi. Now find yours."], 3),
      [S("Two words for better", "meilleur · mieux", "<b>Bon</b> (good) becomes <b>meilleur</b> (better). <b>Bien</b> (well) becomes <b>mieux</b> (better)."), S("Meilleur changes", "meilleur · meilleure · meilleurs · meilleures", "<b>Meilleur</b> agrees with the noun. <b>Mieux</b> never changes."), S("Tip", "🏆", "<b>Le meilleur</b> = the best. C'est le meilleur gâteau!")]),
    les("School subjects", vocab(B.school2), tVocab(B.school2))
  ];
  A.l8.push(MIX("Mixed practice", [A.l8[0], A.l8[4], A.l8[5], A.l8[10], A.l8[12]]));
  A.l8.push(MIX("Level 8 Challenge", [A.l8[0], A.l8[1], A.l8[3], A.l8[4], A.l8[5], A.l8[6], A.l8[9], A.l8[11], A.l8[13], A.l8[14], A.l8[16], A.l8[15]]));

  // ================= LEVEL 9 =================
  const TENSE = [["Hier, nous ___ au cinéma. (aller)", "sommes allés", ["allions", "allons"]], ["Quand j'étais petit, je ___ au parc tous les jours. (jouer)", "jouais", ["ai joué", "joue"]], ["Hier soir, elle ___ un livre. (lire)", "a lu", ["lisait", "lit"]], ["Chaque été, nous ___ chez mamie. (aller)", "allions", ["sommes allés", "allons"]], ["Samedi dernier, ils ___ un gâteau. (faire)", "ont fait", ["faisaient", "font"]], ["Autrefois, il ___ du vélo chaque jour. (faire)", "faisait", ["a fait", "fait"]], ["Hier, tu ___ ta chambre. (ranger)", "as rangé", ["rangeais", "ranges"]], ["Quand j'avais cinq ans, j'___ un chien. (avoir)", "avais", ["ai eu", "ai"]], ["Lundi dernier, je ___ au musée. (aller)", "suis allé", ["allais", "vais"]], ["Tous les matins, elle ___ du pain. (acheter)", "achetait", ["a acheté", "achète"]]];
  const YEN = [["Elle va au cinéma. → Elle ___ va.", "y", ["en", "le"]], ["Nous mangeons du pain. → Nous ___ mangeons.", "en", ["y", "le"]], ["Je vais à l'école. → J'___ vais.", "y", ["en", "le"]], ["Tu veux des bonbons ? → Tu ___ veux ?", "en", ["y", "la"]], ["Ils sont dans le jardin. → Ils ___ sont.", "y", ["en", "les"]], ["J'ai trois frères. → J'___ ai trois.", "en", ["y", "le"]], ["Il boit du lait. → Il ___ boit.", "en", ["y", "le"]], ["Vous allez en France. → Vous ___ allez.", "y", ["en", "la"]], ["Je prends de la soupe. → J'___ prends.", "en", ["y", "la"]]];
  const RELQ = [["Le garçon ___ chante est mon ami.", "qui", ["que", "où"]], ["Le livre ___ je lis est drôle.", "que", ["qui", "où"]], ["La ville ___ j'habite est grande.", "où", ["qui", "que"]], ["J'ai une amie ___ parle trois langues.", "qui", ["que", "où"]], ["La chanson ___ elle chante est belle.", "que", ["qui", "où"]], ["Voici la maison ___ nous vivons.", "où", ["qui", "que"]], ["Le chat ___ dort sur le lit est noir.", "qui", ["que", "où"]], ["Le film ___ nous regardons est amusant.", "que", ["qui", "où"]], ["C'est le parc ___ je joue.", "où", ["qui", "que"]], ["Les enfants ___ jouent sont contents.", "qui", ["que", "où"]]];
  const NEGPC = [["I didn't eat.", "Je n'ai pas mangé.", ["Je ne pas ai mangé.", "J'ai ne pas mangé."]], ["She never went there.", "Elle n'est jamais allée là.", ["Elle jamais n'est allée là.", "Elle n'est allée jamais là."]], ["We saw nothing.", "Nous n'avons rien vu.", ["Nous n'avons vu rien.", "Nous ne rien avons vu."]], ["They didn't finish.", "Ils n'ont pas fini.", ["Ils n'ont fini pas.", "Ils ne pas ont fini."]], ["He never came.", "Il n'est jamais venu.", ["Il n'est venu jamais.", "Il jamais n'est venu."]], ["You didn't listen.", "Tu n'as pas écouté.", ["Tu ne pas as écouté.", "Tu as n'pas écouté."]], ["I saw nobody.", "Je n'ai vu personne.", ["Je n'ai personne vu.", "Je ne personne ai vu."]], ["She didn't go.", "Elle n'est pas allée.", ["Elle ne pas est allée.", "Elle n'est allée pas."]]].map(x => ["Which sentence is right? <b>" + x[0] + "</b>", x[1], x[2]]);
  const EXPRQ = [["I am eleven years old.", "J'ai onze ans.", ["Je suis onze ans.", "Je fais onze ans."]], ["I am hungry.", "J'ai faim.", ["Je suis faim.", "Je fais faim."]], ["I am cold.", "J'ai froid.", ["Je suis froid.", "Je fais froid."]], ["I am thirsty.", "J'ai soif.", ["Je suis soif.", "Je fais soif."]], ["The weather is nice.", "Il fait beau.", ["Il est beau.", "Il a beau."]], ["I am sleepy.", "J'ai sommeil.", ["Je suis sommeil.", "Je fais sommeil."]], ["She is a doctor.", "Elle est médecin.", ["Elle a médecin.", "Elle fait médecin."]], ["I am scared.", "J'ai peur.", ["Je suis peur.", "Je fais peur."]], ["It is hot (weather).", "Il fait chaud.", ["Il a chaud.", "Il est chaud."]], ["I like to read.", "J'aime lire.", ["J'aime lis.", "Je aime lire."]]].map(x => ["Which sentence is correct? <b>" + x[0] + "</b>", x[1], x[2]]);
  const CULT2 = [["What is the capital of Senegal, a country in West Africa?", "Dakar", ["Nairobi", "Lagos"], "It is on the western coast of Africa."], ["What is the capital of Canada?", "Ottawa", ["Montréal", "Toronto"], "It is not the biggest city. It is in the province of Ontario."], ["What is the capital of Belgium?", "Bruxelles (Brussels)", ["Anvers (Antwerp)", "Genève (Geneva)"], "French is one of the official languages there."], ["What is the capital of Switzerland?", "Berne (Bern)", ["Zurich", "Genève (Geneva)"], "It is not the biggest city. Its name is short."], ["Mont Blanc is the highest mountain in which mountain range?", "The Alps", ["The Pyrenees", "The Andes"], "It is in the middle of Europe, near France, Italy and Switzerland."], ["La Corse (Corsica) is a French island in which sea?", "The Mediterranean Sea", ["The Baltic Sea", "The Red Sea"], "It is the warm sea to the south of France."], ["Which two languages are official in Canada?", "French and English", ["French and Spanish", "English and German"], "One of them is the language of this course."], ["Haiti is an island country where French is spoken. In which sea is it?", "The Caribbean Sea", ["The Baltic Sea", "The North Sea"], "It is a warm sea near Cuba and Jamaica."], ["Louis Braille, a boy from France, invented a way for blind people to read. They read by...", "touching raised dots", ["listening to a bell", "smelling the page"], "Think about fingers."], ["Which animal lives wild only on Madagascar, an island where French is spoken?", "The lemur", ["The kangaroo", "The panda"], "It has a long, striped tail and big eyes."], ["Poutine is a favorite food in Québec. It is made of fries, cheese curds and...", "gravy", ["chocolate", "jam"], "It is a hot brown sauce."], ["Which is the longest river in France?", "The Loire", ["The Seine", "The Rhône"], "It flows through the middle of the country and is famous for its castles."]];
  A.l9 = [
    les("The verb savoir", verbQ("savoir"), tVerb("savoir", "<b>Savoir</b> is special. Je and tu are the same: <b>sais</b>.", "Use it for facts and skills: Je sais nager = I know how to swim.")),
    les("The verb mettre", verbQ("mettre"), tVerb("mettre", "<b>Mettre</b> is an -re verb with a double <b>t</b> in mettons, mettez, mettent.", "Mettre la table = to set the table. Mettre un pull = to put on a sweater.")),
    les("The verb boire", verbQ("boire"), tVerb("boire", "<b>Boire</b> changes its stem: <b>boi-</b> for je, tu, il, ils and <b>buv-</b> for nous and vous.", "Je bois de l'eau = I drink water.")),
    les("The verb partir", verbQ("partir"), tVerb("partir", "<b>Partir</b> drops the last letter of the stem for je, tu, il: pars, pars, part.", "Other verbs like it: sortir, dormir (je dors).")),
    les("The verb lire", verbQ("lire"), tVerb("lire", "<b>Lire</b> is special, but the endings are easy: -s, -s, -t, then -sons, -sez, -sent.", "Je lis un livre = I am reading a book.")),
    les("Imparfait or passé composé?", mc(TENSE, ["Is it one single event, or something that happened again and again (or was a description)?", "Words like <b>hier</b> and <b>lundi dernier</b> tell about one moment. Words like <b>autrefois</b>, <b>chaque</b>, <b>tous les</b> and <b>quand j'étais petit</b> tell about habits.", "Example: Hier, j'ai mangé une pizza (one time). Chaque soir, je mangeais de la soupe (habit). Now find yours."], 2),
      [S("One time", "Hier, j'ai mangé.", "Use the <b>passé composé</b> for something that happened once and is finished: Hier, nous <b>avons mangé</b>."), S("A habit", "Chaque jour, je mangeais.", "Use the <b>imparfait</b> for habits and descriptions in the past: Quand j'étais petit, je <b>jouais</b>."), S("Clue words", "hier · un jour  |  souvent · chaque · toujours", "Clue words help: <b>hier</b>, <b>un jour</b> → passé composé. <b>souvent</b>, <b>toujours</b>, <b>chaque jour</b> → imparfait.")]),
    les("The future tense", futQ, [S("Tomorrow", "Demain, je parlerai.", "The future tells what <b>will</b> happen. For most verbs, keep the whole infinitive and add an ending."), S("The endings", "-ai · -as · -a · -ons · -ez · -ont", "Je jouer<b>ai</b>, tu jouer<b>as</b>, il jouer<b>a</b>, nous jouer<b>ons</b>, vous jouer<b>ez</b>, ils jouer<b>ont</b>."), S("Tip", "🔮", "These endings look like the verb <b>avoir</b>! Clue words: demain, bientôt, la semaine prochaine.")]),
    les("The little words y and en", mc(YEN, ["<b>y</b> and <b>en</b> replace words so you don't repeat them. Does the sentence talk about a place, or an amount of something?", "<b>y</b> replaces a place (à Paris, dans le jardin). <b>en</b> replaces <b>du / de la / des + noun</b> (some of it).", "Example: Je vais à Lyon → J'y vais. Je mange des pâtes → J'en mange. Now find yours."], 2),
      [S("Y for places", "Je vais à Paris → J'y vais.", "<b>Y</b> means \"there\". It replaces a place with à, dans, en or chez. It goes before the verb."), S("En for some", "Je mange du pain → J'en mange.", "<b>En</b> means \"some of it\" or \"of them\". It replaces du / de la / des + noun."), S("Tip", "📍", "Y = where? En = how much or how many?")]),
    les("Qui, que, où", mc(RELQ, ["These words join two parts of a sentence. Ask: is the missing word the doer, the thing the verb acts on, or a place?", "<b>qui</b> = who or which, the doer (it is followed by a verb). <b>que</b> = whom or which, the thing acted on (followed by a subject). <b>où</b> = where.", "Example: Le chien qui court (the dog that runs). Le livre que je lis (the book that I read). La ville où je vis. Now find yours."], 2),
      [S("Joining sentences", "le garçon qui chante", "<b>Qui</b> is the doer: Le garçon <b>qui</b> chante (the boy who sings)."), S("The thing acted on", "le livre que je lis", "<b>Que</b> comes before a new person: Le livre <b>que</b> je lis (the book that I read)."), S("Place", "la ville où j'habite", "<b>Où</b> means where: La ville <b>où</b> j'habite.")]),
    les("Being polite", vocab(B.polite), tVocab(B.polite)),
    les("Time expressions", vocab(B.timex), tVocab(B.timex)),
    les("Computers and phones", vocab(B.tech), tVocab(B.tech)),
    les("In the kitchen", vocab(B.cook), tVocab(B.cook)),
    les("Giving your opinion", vocab(B.opin), tVocab(B.opin)),
    les("Francophone world", mc(CULT2, ["Think about what you know about French-speaking places.", it => it[3], "Example: Rome is the capital of Italy, and Madrid is the capital of Spain. Now think about yours."]),
      [S("French around the world", "🌍", "Millions of people speak French on many continents: Europe, Africa, North America, the Caribbean and the Indian Ocean."), S("Capitals", "Paris · Ottawa · Bruxelles · Berne · Dakar", "France is Paris, Canada is Ottawa, Belgium is Bruxelles, Switzerland is Berne, and Senegal is Dakar."), S("Fun things", "🏔️ 🍟 🦎", "Mont Blanc is in the Alps, Québec loves poutine, and Madagascar is home to lemurs.")]),
    les("Type the verb", typeVerb(["être", "parler", "voir", "pouvoir", "choisir", "venir", "devoir", "dire", "savoir", "mettre", "boire", "partir", "lire"]), [S("Typing verbs", "⌨️", "In this lesson you type the correct form of the verb. First find who is doing the action."), S("Accents are optional", "é è ê à ç ô", "You can leave the accents off: <b>etes</b> counts as <b>êtes</b>."), S("Tip", "🧠", "Say the whole list in your head: je, tu, il, nous, vous, ils. Find the form that fits.")]),
    les("Negatives in the past", mc(NEGPC, ["In the past (avoir or être + past word), the negative words go around the helper verb.", "<b>ne</b> goes before the helper, <b>pas / jamais / rien</b> go right after it. <b>Personne</b> goes after the past word.", "Example: Je n'ai pas dormi. Tu n'es jamais venu. Elle n'a rien dit. Now find yours."]),
      [S("Around the helper", "Je n'ai pas mangé.", "<b>Ne ... pas</b> wraps around the helper verb, not the past word: Je <b>n'ai pas</b> mangé."), S("Never and nothing", "Il n'est jamais venu · Elle n'a rien dit", "<b>Ne ... jamais</b> (never) and <b>ne ... rien</b> (nothing) work the same way."), S("Tip", "👤", "<b>Personne</b> (nobody) goes after the past word: Je n'ai vu personne.")]),
    les("Which sentence is correct?", mc(EXPRQ, ["Some French expressions do not match the English word for word. Which helper verb does French use here?", "In French you <b>have</b> hunger, thirst, cold, fear, sleep, and age (J'ai ... ans). But you say <b>Il fait</b> for the weather.", "Example: J'ai chaud (I am hot). Il fait froid (It is cold). Now find yours."]),
      [S("Have, not be", "J'ai faim · J'ai soif · J'ai froid", "In French you <b>have</b> hunger, thirst, cold, heat, fear and sleep: J'ai faim, j'ai peur, j'ai sommeil."), S("Age and weather", "J'ai dix ans · Il fait beau", "You <b>have</b> years: J'ai dix ans. The weather uses <b>faire</b>: Il fait chaud."), S("Tip", "⚠️", "Never say \"je suis faim\". That is a classic mistake!")])
  ];
  A.l9.push(MIX("Mixed practice", [A.l9[0], A.l9[5], A.l9[6], A.l9[7], A.l9[8]]));
  A.l9.push(MIX("Level 9 Challenge", [A.l9[0], A.l9[1], A.l9[2], A.l9[5], A.l9[6], A.l9[7], A.l9[8], A.l9[9], A.l9[13], A.l9[14], A.l9[15], A.l9[16]]));

  Object.assign(FRENCH_LEVELS, { 7: A.l7, 8: A.l8, 9: A.l9 });
})();
