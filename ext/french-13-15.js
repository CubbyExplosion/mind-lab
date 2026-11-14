// ext/french-13-15.js : French, levels 13-15 (6th grade, 7th grade first half).
(() => {
  const FR = "fr-FR";
  const S = (h, v, t) => ({ h, v, t });
  const lead = s => String(s).replace(/^[^A-Za-zÀ-ÿ0-9]+/, "")[0];
  const word = (fr, en, e) => `<span class="word" data-say="${fr}" data-lang="${FR}">${e ? e + " " : ""}<b>${fr}</b> = ${en} 🔊</span>`;
  const les = (title, gen, slides) => { gen.teach = () => slides; return { title, make: gen }; };
  const MIX = (title, ls, show) => {
    const make = () => pick(ls).make();
    make.teach = () => [S("Review time!", "🔄", "This lesson mixes ideas you already know. Here is a quick reminder of some of them, then the quiz.")].concat((show || ls.slice(0, 3)).map(l => { const t = l.make.teach(); return t[1] || t[0]; }));
    return { title, make };
  };
  const BK = (name, items, o = {}) => Object.assign({ name, items }, o);
  const vow = s => /^[aeiouhéèêâîôûàAEIOUH]/.test(s);
  const tg = (h, e, intro, ex, exnote, tip) => [S(h, e, intro), S("Examples", ex, exnote), S("Tip", "🧠", tip)];

  // ---------- generic makers ----------
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
  // items: [text, answer, wrongs, visual, clue]
  const mc = (items, hints, n = 2) => () => {
    const it = pick(items), [text, ans, wr, vis] = it;
    const q = { text, choices: shuf([ans, ...shuf(wr).slice(0, n)]), answer: ans, hints: hints.map(h => typeof h === "function" ? h(it) : h) };
    if (vis) q.visual = vis;
    return q;
  };
  const mq = (items, nudge, rule, ex, n = 2) => mc(items, [nudge, it => it[4] || rule, ex], n);
  const tVocab = bank => [
    S(bank.name, bank.items.slice(0, 3).map(x => x[2] || "💬").join(" "), `In this lesson you will learn French about <b>${bank.name.toLowerCase()}</b>. Listen, say it out loud, and then try the quiz.`),
    S("Learn the words", bank.items.map(x => word(x[0], x[1], x[2])).join("<br>"), "<b>Tap any word to hear it</b> and say it out loud!"),
    S("How to remember", "🧠", bank.tip || "Say each word out loud. Cover the English and see if you remember.")
  ];

  // ---------- vocabulary banks ----------
  const B = {
    money: BK("Saving and spending", [["économiser", "to save (money)"], ["dépenser", "to spend"], ["gagner de l'argent", "to earn money", "💰"], ["l'argent de poche", "pocket money"], ["la tirelire", "piggy bank", "🐷"], ["le porte-monnaie", "coin purse", "👛"], ["le distributeur", "cash machine"], ["les soldes", "the sales"], ["bon marché", "cheap"], ["rembourser", "to pay back"], ["le reçu", "receipt", "🧾"], ["la banque", "bank", "🏦"]], { tip: "<b>Économiser</b> and <b>dépenser</b> are opposites: one keeps money, the other uses it. Une tirelire is where you save coins." }),
    media: BK("News and media", [["le journal", "newspaper", "📰"], ["les informations", "the news"], ["la chaîne", "TV channel", "📺"], ["l'émission", "TV or radio show"], ["le reportage", "news report"], ["la météo", "weather forecast", "🌦️"], ["le titre", "headline, title"], ["la publicité", "advertisement"], ["le journaliste", "journalist"], ["la radio", "radio", "📻"], ["le podcast", "podcast", "🎧"], ["l'écran", "screen", "🖥️"]], { tip: "<b>Les informations</b> is often shortened to <b>les infos</b>. <b>Le journal télévisé</b> is the TV news." }),
    art: BK("Art and museums", [["le tableau", "painting", "🖼️"], ["le peintre", "painter", "🎨"], ["la peinture", "paint"], ["le pinceau", "paintbrush", "🖌️"], ["la sculpture", "sculpture", "🗿"], ["l'exposition", "exhibition"], ["le dessin", "drawing", "✏️"], ["l'artiste", "artist"], ["le portrait", "portrait"], ["le paysage", "landscape"], ["l'atelier", "art studio"], ["le chef-d'œuvre", "masterpiece"]], { tip: "<b>Un chef-d'œuvre</b> is a masterpiece. <b>Une exposition</b> is NOT an exposure: it is a show of art." }),
    school: BK("Middle school life", [["le collège", "middle school", "🏫"], ["l'emploi du temps", "timetable"], ["la cantine", "school canteen", "🍽️"], ["la récréation", "break time"], ["la note", "grade, mark"], ["le bulletin", "report card"], ["le devoir", "homework or test"], ["l'examen", "exam"], ["le casier", "locker"], ["le délégué", "class representative"], ["la cour", "playground"], ["la rentrée", "start of the school year", "🎒"]], { tip: "In France, <b>le collège</b> is for ages 11 to 15. <b>La rentrée</b> in September is a big day for everyone." }),
    perso: BK("Personality words", [["courageux", "brave"], ["généreux", "generous"], ["honnête", "honest"], ["paresseux", "lazy"], ["patient", "patient"], ["curieux", "curious"], ["drôle", "funny", "😄"], ["sérieux", "serious"], ["poli", "polite"], ["têtu", "stubborn"], ["travailleur", "hard-working"], ["bavard", "chatty"]], { tip: "For a girl, <b>-eux</b> becomes <b>-euse</b>: courageux → courageuse. <b>Honnête</b> and <b>drôle</b> stay the same." }),
    env: BK("Protecting the planet", [["le réchauffement", "global warming"], ["la pollution", "pollution"], ["le recyclage", "recycling", "♻️"], ["l'énergie solaire", "solar energy", "☀️"], ["l'éolienne", "wind turbine"], ["le gaspillage", "waste (of food, water)"], ["la biodiversité", "biodiversity"], ["durable", "sustainable"], ["les déchets", "trash"], ["le compost", "compost"], ["protéger", "to protect", "🛡️"], ["la planète", "planet", "🌍"]], { tip: "<b>Gaspiller</b> means to waste. <b>Le gaspillage alimentaire</b> is food waste. Small actions help the planet!" }),
    hist: BK("History words", [["le siècle", "century"], ["le roi", "king", "👑"], ["la reine", "queen", "👸"], ["le château", "castle", "🏰"], ["le chevalier", "knight"], ["l'époque", "era, period"], ["l'empire", "empire"], ["la cathédrale", "cathedral", "⛪"], ["le Moyen Âge", "the Middle Ages"], ["la Révolution", "the Revolution"], ["l'ancêtre", "ancestor"], ["découvrir", "to discover", "🔭"]], { tip: "A <b>siècle</b> is 100 years. The 21st century is <b>le vingt et unième siècle</b>." }),
    books: BK("Books and stories", [["le roman", "novel", "📖"], ["l'auteur", "author"], ["le personnage", "character"], ["le chapitre", "chapter"], ["le poème", "poem"], ["la bande dessinée", "comic book"], ["le conte", "tale"], ["la fable", "fable"], ["le héros", "hero"], ["le résumé", "summary"], ["la page", "page", "📄"], ["la bibliothèque", "library", "📚"]], { tip: "Careful: <b>la bibliothèque</b> is a library, <b>la librairie</b> is a bookstore. <b>La BD</b> is short for bande dessinée." }),
    essay: BK("Organizing what you say", [["tout d'abord", "first of all"], ["ensuite", "next"], ["enfin", "finally"], ["en conclusion", "in conclusion"], ["par exemple", "for example"], ["selon moi", "in my opinion"], ["je suis d'accord", "I agree"], ["je ne suis pas d'accord", "I disagree"], ["en effet", "indeed"], ["de plus", "moreover"], ["d'un côté", "on one hand"], ["de l'autre côté", "on the other hand"]], { nopic: true, tip: "A good speech or essay has a beginning, a middle and an end: <b>tout d'abord… ensuite… enfin… en conclusion.</b>" })
  };

  // ---------- verbs ----------
  const VB = {};
  const en6 = (b, t) => ["I " + b, "you " + b, "he " + t, "we " + b, "you " + b, "they " + b];
  const defV = (key, inf, en, f, e6, o = {}) => { VB[key] = Object.assign({ inf, en, e6, vow: false, ex: "parler", f: { je: f[0], tu: f[1], il: f[2], elle: f[2], nous: f[3], vous: f[4], ils: f[5] } }, o); };
  defV("être", "être", "to be", ["suis", "es", "est", "sommes", "êtes", "sont"], ["I am", "you are", "he is", "we are", "you are", "they are"]);
  defV("parler", "parler", "to speak", ["parle", "parles", "parle", "parlons", "parlez", "parlent"], en6("speak", "speaks"), { ex: "être" });
  defV("sortir", "sortir", "to go out", ["sors", "sors", "sort", "sortons", "sortez", "sortent"], en6("go out", "goes out"), { note: "The je, tu and il forms drop the last letter of the stem (sor-), then add -s, -s, -t." });
  defV("dormir", "dormir", "to sleep", ["dors", "dors", "dort", "dormons", "dormez", "dorment"], en6("sleep", "sleeps"), { note: "Like sortir, the singular forms lose the m of the stem." });
  defV("servir", "servir", "to serve", ["sers", "sers", "sert", "servons", "servez", "servent"], en6("serve", "serves"), { note: "Like sortir and dormir, the singular forms lose the last stem letter (the v)." });
  defV("offrir", "offrir", "to offer, to give", ["offre", "offres", "offre", "offrons", "offrez", "offrent"], en6("offer", "offers"), { vow: true, note: "This verb ends in -ir, but it takes the same endings as an -er verb." });
  defV("comprendre", "comprendre", "to understand", ["comprends", "comprends", "comprend", "comprenons", "comprenez", "comprennent"], en6("understand", "understands"), { note: "It follows the same pattern as prendre: the ils form doubles the n." });
  defV("tenir", "tenir", "to hold", ["tiens", "tiens", "tient", "tenons", "tenez", "tiennent"], en6("hold", "holds"), { note: "It follows the same pattern as venir: ie in the singular and in ils, but not in nous and vous." });
  defV("attendre", "attendre", "to wait for", ["attends", "attends", "attend", "attendons", "attendez", "attendent"], en6("wait for", "waits for"), { vow: true, note: "In the il form there is no t at the end: the d is already there." });
  defV("rire", "rire", "to laugh", ["ris", "ris", "rit", "rions", "riez", "rient"], en6("laugh", "laughs"), { note: "This is a short verb. The stem is only r-, then i and the ending." });
  defV("plaire", "plaire", "to please, to be liked", ["plais", "plais", "plaît", "plaisons", "plaisez", "plaisent"], ["I please", "you please", "he pleases", "we please", "you please", "they please"], { note: "Watch the circumflex on the il form (î). We often say: Ça me plaît (I like it)." });
  defV("conduire", "conduire", "to drive, to lead", ["conduis", "conduis", "conduit", "conduisons", "conduisez", "conduisent"], en6("drive", "drives"), { note: "The stem changes to condui- and then adds an s sound for nous, vous and ils." });
  defV("peindre", "peindre", "to paint", ["peins", "peins", "peint", "peignons", "peignez", "peignent"], en6("paint", "paints"), { note: "The nous, vous and ils forms change to peign- (with a gn)." });
  defV("envoyer", "envoyer", "to send", ["envoie", "envoies", "envoie", "envoyons", "envoyez", "envoient"], en6("send", "sends"), { vow: true, note: "The y changes to i when the ending is silent (je, tu, il, ils)." });
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
  const vl = (key, pattern, tip) => les(`The verb ${VB[key].inf}`, verbQ(key), tVerb(key, pattern, tip));
  const typeVerb = keys => () => {
    const v = VB[pick(keys)], p = pick(PR), ans = v.f[p], ex = VB[v.ex], pre = p === "je" && v.vow ? "j'" : p + " ";
    return {
      text: `${pre}___ (${v.inf}, ${v.en}) Type the missing verb form.`, textInput: true, answer: ans,
      hints: ["Find who is doing the action, then think about how this verb changes for that person.", `The answer has ${ans.length} letters and starts with "${ans[0]}".`, `Example: with ${ex.inf}: nous ${ex.f.nous}, vous ${ex.f.vous}. Now do yours. (Accents are optional.)`]
    };
  };

  // ---------- subjunctive forms ----------
  const SB = [
    ["être", "to be", ["sois", "sois", "soit", "soyons", "soyez", "soient"], ["suis", "es", "est", "sommes", "êtes", "sont"]],
    ["avoir", "to have", ["aie", "aies", "ait", "ayons", "ayez", "aient"], ["ai", "as", "a", "avons", "avez", "ont"]],
    ["aller", "to go", ["aille", "ailles", "aille", "allions", "alliez", "aillent"], ["vais", "vas", "va", "allons", "allez", "vont"]],
    ["faire", "to do", ["fasse", "fasses", "fasse", "fassions", "fassiez", "fassent"], ["fais", "fais", "fait", "faisons", "faites", "font"]],
    ["pouvoir", "to be able", ["puisse", "puisses", "puisse", "puissions", "puissiez", "puissent"], ["peux", "peux", "peut", "pouvons", "pouvez", "peuvent"]],
    ["savoir", "to know", ["sache", "saches", "sache", "sachions", "sachiez", "sachent"], ["sais", "sais", "sait", "savons", "savez", "savent"]],
    ["vouloir", "to want", ["veuille", "veuilles", "veuille", "voulions", "vouliez", "veuillent"], ["veux", "veux", "veut", "voulons", "voulez", "veulent"]]
  ];
  const QP = ["que je ", "que tu ", "qu'il ", "que nous ", "que vous ", "qu'ils "];
  const qpre = (i, form) => i === 0 && vow(form) ? "que j'" : QP[i];
  const subjQ = () => {
    const [inf, en, sj, ind] = pick(SB), i = ri(0, 5), ans = sj[i];
    const others = shuf(sj.filter(x => x !== ans && x !== ind[i]));
    return {
      text: `Il faut ${qpre(i, ans)}___ (${inf}, ${en})`, choices: shuf([ans, ind[i], others[0]]), answer: ans,
      hints: ["After 'il faut que' we use the subjunctive, not the normal present tense.", "This verb has irregular subjunctive forms. For nous and vous, they look like the imparfait (-ions, -iez).", "Example: with prendre: que je prenne, que nous prenions, qu'ils prennent. Now do yours."]
    };
  };
  const typeSubj = () => {
    const [inf, en, sj] = pick(SB), i = ri(0, 5), ans = sj[i];
    return {
      text: `Il faut ${qpre(i, ans)}___ (${inf}, ${en}) Type the subjunctive form.`, textInput: true, answer: ans,
      hints: ["After 'il faut que' we need the subjunctive. Who is the person?", `The answer has ${ans.length} letters and starts with "${ans[0]}".`, "Example: with prendre: que je prenne, que nous prenions. Now do yours. (Accents are optional.)"]
    };
  };

  // ---------- item lists ----------
  const AGR = [
    ["Elle est ___ au cinéma. (aller)", "allée", ["allé", "allés"]], ["Ils sont ___ en vacances. (partir)", "partis", ["parti", "partie"]],
    ["Nous (des filles) sommes ___ tôt. (arriver)", "arrivées", ["arrivé", "arrivés"]], ["Marie est ___ à huit heures. (sortir)", "sortie", ["sorti", "sortis"]],
    ["Les garçons sont ___ à la maison. (rentrer)", "rentrés", ["rentré", "rentrées"]], ["Mon frère est ___ hier. (tomber)", "tombé", ["tombée", "tombés"]],
    ["Ma sœur est ___ ce matin. (venir)", "venue", ["venu", "venus"]], ["Les filles sont ___ au parc. (descendre)", "descendues", ["descendu", "descendus"]],
    ["Paul et Léa sont ___ à Paris. (rester)", "restés", ["resté", "restées"]]
  ];
  const POS = [
    ["Mon vélo est vert. Le ___ est bleu. (yours, tu)", "tien", ["tienne", "sien"]], ["Ma chambre est grande. La ___ est petite. (hers)", "sienne", ["sien", "tienne"]],
    ["Mes amis sont ici. Les ___ sont là-bas. (mine)", "miens", ["mien", "miennes"]], ["Ta robe est jolie. La ___ est vieille. (mine)", "mienne", ["mien", "miennes"]],
    ["Vos livres sont ici. Les ___ sont là. (ours)", "nôtres", ["nôtre", "vôtres"]], ["Leur maison est grande. La ___ est petite. (ours)", "nôtre", ["nôtres", "vôtre"]],
    ["Notre classe est bruyante. La ___ est calme. (yours, vous)", "vôtre", ["vôtres", "nôtre"]], ["Mon père travaille. Le ___ voyage. (his)", "sien", ["sienne", "tien"]],
    ["Tes chaussures sont neuves. Les ___ sont vieilles. (mine)", "miennes", ["miens", "mienne"]]
  ];
  const DEM = [
    ["Quel livre ? ___ de Paul.", "Celui", ["Celle", "Ceux"]], ["Quelle robe ? ___ de ma sœur.", "Celle", ["Celui", "Celles"]],
    ["Quels amis ? ___ de l'école.", "Ceux", ["Celui", "Celles"]], ["Quelles chaussures ? ___ qui sont rouges.", "Celles", ["Ceux", "Celle"]],
    ["Je prends ce stylo-ci. Tu prends ___-là.", "celui", ["celle", "ceux"]], ["J'aime cette maison, mais je préfère ___ de mon oncle.", "celle", ["celui", "celles"]],
    ["Mes cousins et ___ de Marie jouent ensemble.", "ceux", ["celui", "celle"]], ["Voici mes clés et ___ de papa.", "celles", ["celle", "ceux"]]
  ];
  const DEMEX = { Celui: "Example: 'Quelle fleur ? Celle de maman.' (a girl word, one thing).", Celle: "Example: 'Quel chat ? Celui de Léa.' (a boy word, one thing).", Ceux: "Example: 'Quelles clés ? Celles de papa.' (girl words, many things).", Celles: "Example: 'Quels chats ? Ceux de Léa.' (boy words, many things).", celui: "Example: 'Quelle fleur ? Celle de maman.' Ask: boy or girl word, one or many?", celle: "Example: 'Quels chats ? Ceux de Léa.' Ask: boy or girl word, one or many?", ceux: "Example: 'Quelle fleur ? Celle de maman.' Ask: boy or girl word, one or many?", celles: "Example: 'Quel chat ? Celui de Léa.' Ask: boy or girl word, one or many?" };
  const LEQ = [
    ["J'ai deux sacs. ___ est à toi ?", "Lequel", ["Laquelle", "Lesquels"]], ["Voici des robes. ___ aimes-tu ?", "Laquelle", ["Lequel", "Lesquelles"]],
    ["Voici des fleurs. ___ préfères-tu ?", "Lesquelles", ["Laquelle", "Lesquels"]], ["Voici des films. ___ veux-tu voir ?", "Lesquels", ["Lesquelles", "Lequel"]],
    ["Il y a deux tartes. ___ est pour moi ?", "Laquelle", ["Lequel", "Lesquelles"]], ["Tu as trois chats. ___ dort ici ?", "Lequel", ["Laquelle", "Lesquels"]],
    ["Ces filles sont sympas. ___ est ta cousine ?", "Laquelle", ["Lequel", "Lesquelles"]], ["Ces garçons jouent bien. ___ est ton frère ?", "Lequel", ["Laquelle", "Lesquels"]]
  ];
  const LEQEX = { Lequel: "Example: 'Quelle fleur ? Laquelle ?' (girl word, one thing).", Laquelle: "Example: 'Quel livre ? Lequel ?' (boy word, one thing).", Lesquelles: "Example: 'Quels livres ? Lesquels ?' (boy word, many things).", Lesquels: "Example: 'Quelles fleurs ? Lesquelles ?' (girl word, many things)." };
  const IND = [
    ["Il y a ___ à la porte. (someone)", "quelqu'un", ["quelque chose", "chacun"]], ["J'ai ___ à te dire. (something)", "quelque chose", ["quelqu'un", "plusieurs"]],
    ["___ élève a un livre. (each, before a noun)", "Chaque", ["Chacun", "Plusieurs"]], ["Les trois enfants ont un cahier. ___ a le sien. (each one)", "Chacun", ["Chaque", "Quelqu'un"]],
    ["J'ai lu ___ livres cet été. (a few)", "quelques", ["quelqu'un", "chacun"]], ["___ de mes amis habitent à Lyon. (several)", "Plusieurs", ["Chacun", "Quelque chose"]],
    ["Tu veux ___ à boire ? (something)", "quelque chose", ["quelqu'un", "chaque"]], ["Il cherche ___ pour l'aider. (someone)", "quelqu'un", ["quelque chose", "plusieurs"]]
  ];
  const INDEX = { "quelqu'un": "Example: 'personne' = nobody, so the opposite (a person) is a different word. Is it a person or a thing?", "quelque chose": "Example: 'rien' = nothing, so the opposite (a thing) is a different word. Is it a person or a thing?", Chaque: "Example: 'chaque jour' means every day; the word comes before a noun. Is there a noun after the blank?", Chacun: "Example: 'chacune de mes sœurs' means each of my sisters; the word stands alone. Is there a noun after the blank?", quelques: "Example: 'quelques jours' means a few days. Is the blank about a small number?", Plusieurs: "Example: 'plusieurs fois' means several times. Is the blank about more than two?" };
  const DUR = [
    ["J'habite ici ___ trois ans. (and I still live here)", "depuis", ["pendant", "il y a"]], ["J'ai dormi ___ dix heures. (finished, a length of time)", "pendant", ["depuis", "il y a"]],
    ["Il est parti ___ deux jours. (two days ago)", "il y a", ["depuis", "pendant"]], ["Elle apprend le piano ___ 2020. (still learning)", "depuis", ["pendant", "il y a"]],
    ["Nous avons voyagé ___ une semaine. (a length of time, over now)", "pendant", ["depuis", "il y a"]], ["Mon oncle est né ___ cinquante ans. (fifty years ago)", "il y a", ["depuis", "pendant"]],
    ["Je suis malade ___ lundi. (still sick)", "depuis", ["pendant", "il y a"]], ["Il a plu ___ la nuit. (during the night)", "pendant", ["depuis", "il y a"]]
  ];
  const IMP = [
    ["___ partir maintenant. (we must)", "Il faut", ["Il y a", "Il pleut"]], ["___ mieux attendre. (it is better)", "Il vaut", ["Il faut", "Il fait"]],
    ["___ un chat dans le jardin. (there is)", "Il y a", ["Il faut", "Il suffit"]], ["___ beaucoup aujourd'hui. (it is raining)", "Il pleut", ["Il vaut", "Il y a"]],
    ["Dans ce livre, ___ d'un garçon perdu. (it is about)", "il s'agit", ["il faut", "il y a"]], ["Il ___ de cliquer ici. (it is enough)", "suffit", ["pleut", "vaut"]],
    ["Il ___ nuit. (it is night)", "fait", ["a", "est"]]
  ];
  const PAS = [
    ['Change to the passive: "Marie ferme la porte."', "La porte est fermée par Marie.", ["La porte ferme par Marie.", "La porte est fermé par Marie."]],
    ['Change to the passive: "Le chef prépare le repas."', "Le repas est préparé par le chef.", ["Le repas est préparée par le chef.", "Le repas a préparé par le chef."]],
    ['Change to the passive: "Les élèves lisent les livres."', "Les livres sont lus par les élèves.", ["Les livres est lus par les élèves.", "Les livres sont lu par les élèves."]],
    ['Change to the passive: "Papa lave la voiture."', "La voiture est lavée par papa.", ["La voiture est lavé par papa.", "La voiture lave par papa."]],
    ['Change to the passive: "Les artistes finissent les tableaux."', "Les tableaux sont finis par les artistes.", ["Les tableaux sont fini par les artistes.", "Les tableaux est finis par les artistes."]],
    ['Change to the passive: "Le maître félicite les filles."', "Les filles sont félicitées par le maître.", ["Les filles sont félicités par le maître.", "Les filles est félicitées par le maître."]],
    ['Change to the passive: "Ma mère écrit la lettre."', "La lettre est écrite par ma mère.", ["La lettre est écrit par ma mère.", "La lettre écrite par ma mère."]],
    ['Change to the passive: "Les enfants construisent le château."', "Le château est construit par les enfants.", ["Le château est construite par les enfants.", "Le château sont construit par les enfants."]]
  ];
  const PRO = [
    ["Replace the underlined words: <u>Je donne le livre à Paul.</u>", "Je le lui donne.", ["Je lui le donne.", "Je le leur donne."]],
    ["Replace the underlined words: <u>Elle montre les photos à ses parents.</u>", "Elle les leur montre.", ["Elle leur les montre.", "Elle les lui montre."]],
    ["Replace the underlined words: <u>Tu envoies la lettre à Marie.</u>", "Tu la lui envoies.", ["Tu lui la envoies.", "Tu la leur envoies."]],
    ["Replace the underlined words: <u>Nous prêtons nos jeux à nos amis.</u>", "Nous les leur prêtons.", ["Nous leur les prêtons.", "Nous les lui prêtons."]],
    ["Replace the underlined words: <u>Il donne des fleurs à sa mère.</u>", "Il lui en donne.", ["Il en lui donne.", "Il leur en donne."]],
    ["Replace the underlined words: <u>Je te donne la clé.</u>", "Je te la donne.", ["Je la te donne.", "Je lui la donne."]],
    ["Replace the underlined words: <u>Il nous montre les images.</u>", "Il nous les montre.", ["Il les nous montre.", "Il leur les montre."]],
    ["Replace the underlined words: <u>Vous écrivez une carte à vos cousins.</u>", "Vous la leur écrivez.", ["Vous leur la écrivez.", "Vous la lui écrivez."]]
  ];
  const REP = [
    ['Il dit : « Je suis fatigué. » → Il dit qu\'___ est fatigué.', "il", ["je", "tu"]], ['Elle dit : « J\'ai faim. » → Elle dit qu\'___ a faim.', "elle", ["j'", "tu"]],
    ['Il a dit : « Je suis content. » → Il a dit qu\'il ___ content.', "était", ["est", "sera"]], ['Elle a dit : « Je vais à Paris. » → Elle a dit qu\'elle ___ à Paris.', "allait", ["va", "ira"]],
    ['Paul a dit : « J\'ai mangé. » → Paul a dit qu\'il ___ mangé.', "avait", ["a", "aura"]], ['Ils ont dit : « Nous partirons. » → Ils ont dit qu\'ils ___.', "partiraient", ["partiront", "partaient"]],
    ['Il demande : « Où habites-tu ? » → Il demande ___ j\'habite.', "où", ["qui", "si"]], ['Elle demande : « Tu viens ? » → Elle demande ___ je viens.', "si", ["que", "où"]]
  ];
  const AVA = [
    ["La lettre que j'ai ___. (écrire)", "écrite", ["écrit", "écrits"]], ["Les pommes que Léa a ___. (manger)", "mangées", ["mangé", "mangée"]],
    ["Où sont les clés que tu as ___ ? (prendre)", "prises", ["pris", "prise"]], ["J'ai ___ la lettre. (lire)", "lu", ["lue", "lus"]],
    ["Elle a ___ ses amis. (voir)", "vu", ["vue", "vus"]], ["Les films que nous avons ___ étaient longs. (voir)", "vus", ["vu", "vue"]],
    ["La robe qu'elle a ___ est bleue. (choisir)", "choisie", ["choisi", "choisies"]], ["Il a ___ la porte. (ouvrir)", "ouvert", ["ouverte", "ouverts"]],
    ["Les fleurs ? Je les ai ___. (acheter)", "achetées", ["acheté", "achetée"]]
  ];
  const SUB = [
    ["Bien que je ___ fatigué, je joue. (être)", "sois", ["suis", "serai"]], ["Pour qu'elle ___ contente, nous chantons. (être)", "soit", ["est", "sera"]],
    ["Avant que nous ___, il faut manger. (partir)", "partions", ["partons", "partirons"]], ["Il parle fort pour que tout le monde ___. (entendre)", "entende", ["entend", "entendra"]],
    ["Bien qu'ils ___ du temps, ils restent. (avoir)", "aient", ["ont", "auront"]], ["Je reste jusqu'à ce que tu ___. (venir)", "viennes", ["viens", "viendras"]],
    ["Quoiqu'il ___ froid, nous sortons. (faire)", "fasse", ["fait", "fera"]], ["Je t'aide pour que tu ___ réussir. (pouvoir)", "puisses", ["peux", "pourras"]]
  ];
  const PRP = [
    ["Le chat dort ___ la table. (under)", "sous", ["sur", "devant"]], ["Je vais ___ mon ami ce soir. (to my friend's home)", "chez", ["parmi", "vers"]],
    ["___ le mauvais temps, nous sortons. (despite)", "Malgré", ["Selon", "Parmi"]], ["Tous sont là ___ Paul. (except)", "sauf", ["selon", "entre"]],
    ["___ le journal, il va pleuvoir. (according to)", "Selon", ["Malgré", "Sauf"]], ["Il est assis ___ Léa et Marc. (between two people)", "entre", ["parmi", "vers"]],
    ["Le chien est ___ nous. (in front of)", "devant", ["derrière", "sous"]], ["Elle est la plus grande ___ mes amies. (among many)", "parmi", ["entre", "chez"]],
    ["Nous allons ___ la mer. (toward)", "vers", ["chez", "sauf"]]
  ];
  const INV = [
    ['Make a question with "vous": Vous avez faim.', "Avez-vous faim ?", ["Vous-avez faim ?", "Avez-faim vous ?"]], ["Where do you (tu) live?", "Où habites-tu ?", ["Où tu-habites ?", "Habites où-tu ?"]],
    ["What does he (il) eat?", "Que mange-t-il ?", ["Que mange-il ?", "Que il-mange ?"]], ["Are they (ils) playing?", "Jouent-ils ?", ["Jouent-t-ils ?", "Ils-jouent ?"]],
    ["When do we (nous) leave?", "Quand partons-nous ?", ["Quand nous-partons ?", "Partons quand-nous ?"]], ["Does she (elle) speak French?", "Parle-t-elle français ?", ["Parle-elle français ?", "Elle-parle français ?"]],
    ["Why are you (tu) crying?", "Pourquoi pleures-tu ?", ["Pourquoi-tu pleures ?", "Pleures pourquoi-tu ?"]], ["Do you (vous) want some water?", "Voulez-vous de l'eau ?", ["Vous-voulez de l'eau ?", "Voulez de l'eau-vous ?"]]
  ];
  const GEO = [
    ["Which region is in the northwest of France and is famous for crêpes?", "la Bretagne", ["l'Alsace", "la Provence"]], ["Which region is in the east of France, next to Germany?", "l'Alsace", ["la Normandie", "la Bretagne"]],
    ["Which region in the southeast is known for lavender fields?", "la Provence", ["l'Alsace", "la Normandie"]], ["Which French island region is in the Mediterranean Sea?", "la Corse", ["la Bretagne", "la Provence"]],
    ["Which river flows through Paris?", "la Seine", ["la Loire", "le Rhône"]], ["Which is the longest river in France?", "la Loire", ["la Seine", "la Garonne"]],
    ["Which mountains form the border between France and Spain?", "les Pyrénées", ["les Alpes", "les Vosges"]], ["In which mountain range is Mont Blanc?", "les Alpes", ["les Pyrénées", "les Vosges"]],
    ["Which sea is on the south coast of France?", "la Méditerranée", ["la mer Noire", "la mer Rouge"]], ["Which region is famous for apples, cider and Camembert cheese?", "la Normandie", ["la Provence", "la Corse"]]
  ];
  const CAP = [
    ["Senegal", "le Sénégal", "Dakar", "It is in West Africa."], ["Belgium", "la Belgique", "Bruxelles", "It is in Europe, next to the Netherlands."], ["Switzerland", "la Suisse", "Berne", "It is in Europe, in the Alps."],
    ["Morocco", "le Maroc", "Rabat", "It is in North Africa."], ["Tunisia", "la Tunisie", "Tunis", "It is in North Africa."], ["Mali", "le Mali", "Bamako", "It is in West Africa."],
    ["Cameroon", "le Cameroun", "Yaoundé", "It is in Central Africa."], ["Madagascar", "Madagascar", "Antananarivo", "It is a big island off the east coast of Africa."], ["Haiti", "Haïti", "Port-au-Prince", "It shares an island in the Caribbean."],
    ["Canada", "le Canada", "Ottawa", "It is in North America."], ["Algeria", "l'Algérie", "Alger", "It is in North Africa."]
  ];
  const capQ = () => {
    const it = pick(CAP), others = shuf(CAP.filter(x => x[2] !== it[2]));
    return {
      text: `What is the capital of ${it[0]} (${it[1]})?`, choices: shuf([it[2], others[0][2], others[1][2]]), answer: it[2],
      hints: ["A capital is the city where the government sits. Think of where this country is on a map.", `${it[3]} The capital starts with the letter "${it[2][0]}".`, "Example: the capital of France is Paris. The capital of Italy is Rome. Now find yours."]
    };
  };
  const FUA = [
    ["Quand j'___ fini mes devoirs, je jouerai. (avoir)", "aurai", ["ai", "avais"]], ["Dès qu'elle ___ arrivée, nous mangerons. (être)", "sera", ["est", "était"]],
    ["Quand tu ___ lu ce livre, prête-le-moi. (avoir)", "auras", ["as", "avais"]], ["Après que nous ___ partis, il pleuvra. (être)", "serons", ["sommes", "étions"]],
    ["Demain à midi, ils ___ fini. (avoir)", "auront", ["ont", "avaient"]], ["Quand vous ___ mangé, on sortira. (avoir)", "aurez", ["avez", "aviez"]],
    ["Dès que je ___ rentré, je t'appellerai. (être)", "serai", ["suis", "étais"]], ["Elle sera contente quand elle ___ gagné. (avoir)", "aura", ["a", "avait"]]
  ];
  const CPA = [
    ["Si j'avais su, je ___ venu. (être)", "serais", ["suis", "étais"]], ["À ta place, j'___ mangé. (avoir)", "aurais", ["ai", "avais"]],
    ["Il ___ aimé voir ce film. (avoir)", "aurait", ["a", "avait"]], ["Nous ___ partis plus tôt. (être)", "serions", ["sommes", "étions"]],
    ["Elles ___ allées au parc. (être)", "seraient", ["sont", "étaient"]], ["Vous ___ dû prévenir. (avoir)", "auriez", ["avez", "aviez"]],
    ["Ils ___ voulu rester. (avoir)", "auraient", ["ont", "avaient"]], ["Elle ___ restée à la maison. (être)", "serait", ["est", "était"]]
  ];
  const PSI = [
    ["Il parla.", "He spoke.", ["He speaks.", "He will speak."]], ["Ils furent heureux.", "They were happy.", ["They are happy.", "They will be happy."]],
    ["Elle eut peur.", "She got scared.", ["She is scared.", "She will be scared."]], ["Le roi dit non.", "The king said no.", ["The king says no.", "The king will say no."]],
    ["Ils mangèrent.", "They ate.", ["They eat.", "They will eat."]], ["Elle vit un chat.", "She saw a cat.", ["She sees a cat.", "She will see a cat."]],
    ["Elle fit un gâteau.", "She made a cake.", ["She makes a cake.", "She will make a cake."]], ["Ils vinrent.", "They came.", ["They come.", "They will come."]],
    ["Il alla au château.", "He went to the castle.", ["He goes to the castle.", "He will go to the castle."]]
  ];
  const SPC = [
    ["Je ___ (acheter) du pain.", "achète", ["achetes", "achetons"]], ["Nous ___ (manger) ensemble.", "mangeons", ["mangons", "mangeont"]],
    ["Elle ___ (appeler) son chat.", "appelle", ["apelle", "appelles"]], ["Nous ___ (commencer) à huit heures.", "commençons", ["commensons", "commençeons"]],
    ["Tu ___ (préférer) le thé ?", "préfères", ["préférons", "préfèrent"]], ["Elle ___ (nettoyer) sa chambre.", "nettoie", ["nettoye", "nettoit"]],
    ["Je ___ (jeter) la balle.", "jette", ["jete", "jettes"]], ["Nous ___ (voyager) en train.", "voyageons", ["voyagons", "voyageont"]],
    ["Il ___ (espérer) gagner.", "espère", ["espères", "espèrent"]]
  ];
  const SJI = [
    ["Je pense que tu ___ raison. (avoir)", "as", ["aies", "ayes"]], ["Je veux que tu ___ raison. (avoir)", "aies", ["as", "ayes"]],
    ["Il faut que nous ___. (partir)", "partions", ["partons", "partions-nous"]], ["Je sais que vous ___ prêts. (être)", "êtes", ["soyez", "êtez"]],
    ["Il est certain que tu ___ gagner. (pouvoir)", "peux", ["puisses", "pouvons"]], ["Il est possible qu'elle ___ en retard. (être)", "soit", ["est", "êtes"]],
    ["Je suis content que tu ___ ici. (être)", "sois", ["es", "êtes"]], ["Je doute qu'il ___ la réponse. (savoir)", "sache", ["sait", "savent"]]
  ];
  const CEQ = [
    ["Je ne comprends pas ___ tu dis. (what, object)", "ce que", ["ce qui", "ce dont"]], ["Dis-moi ___ se passe. (what, subject)", "ce qui", ["ce que", "ce dont"]],
    ["Voilà ___ j'ai besoin. (what I need: avoir besoin DE)", "ce dont", ["ce que", "ce qui"]], ["Je sais ___ tu veux. (what, object)", "ce que", ["ce qui", "ce dont"]],
    ["Je vois ___ brille dans le ciel. (what, subject)", "ce qui", ["ce que", "ce dont"]], ["C'est exactement ___ je rêve. (rêver DE)", "ce dont", ["ce qui", "ce que"]],
    ["Tout ___ brille n'est pas or. (everything that, subject)", "ce qui", ["ce que", "ce dont"]], ["Montre-moi ___ tu as acheté. (what, object)", "ce que", ["ce qui", "ce dont"]]
  ];
  const ADJ = [
    ["Which means 'a former teacher'?", "un ancien professeur", ["un professeur ancien", "un vieux professeur"]], ["Which means 'a poor man' (to be pitied)?", "un pauvre homme", ["un homme pauvre", "un homme riche"]],
    ["Which means 'a poor man' (he has no money)?", "un homme pauvre", ["un pauvre homme", "un homme riche"]], ["Which means 'my own room'?", "ma propre chambre", ["ma chambre propre", "ma chambre sale"]],
    ["Which means 'a clean room'?", "une chambre propre", ["une propre chambre", "une chambre sale"]], ["Which means 'a great man' (important, famous)?", "un grand homme", ["un homme grand", "un petit homme"]],
    ["Which means 'a tall man'?", "un homme grand", ["un grand homme", "un homme petit"]], ["Which means 'an expensive dress' (costs a lot)?", "une robe chère", ["une chère robe", "une robe chérie"]],
    ["Which means 'a dear friend' (much loved)?", "un cher ami", ["un ami cher", "un ami coûteux"]]
  ];
  const CAU = [
    ["Je reste à la maison ___ je suis malade. (because)", "parce que", ["donc", "malgré"]], ["Il pleut, ___ nous restons à l'intérieur. (so)", "donc", ["parce que", "afin de"]],
    ["Nous avons gagné ___ ton aide. (thanks to)", "grâce à", ["à cause de", "malgré"]], ["Le match est annulé ___ la tempête. (because of, a bad cause)", "à cause de", ["grâce à", "afin de"]],
    ["Il étudie ___ réussir. (in order to)", "afin de", ["parce que", "donc"]], ["___ il est tard, nous partons. (since)", "Puisque", ["Donc", "Afin de"]],
    ["J'ai oublié mon livre, ___ je ne peux pas lire. (that is why)", "c'est pourquoi", ["parce que", "grâce à"]]
  ];
  const OPP = [
    ["___ la pluie, nous allons au parc. (despite)", "Malgré", ["Bien que", "Pourtant"]], ["___ tu sois fatigué, tu viens. (although)", "Bien que", ["Malgré", "Parce que"]],
    ["Il est petit, ___ il est très fort. (yet)", "pourtant", ["donc", "parce que"]], ["Moi, j'aime le thé, ___ mon frère préfère le café. (whereas)", "tandis que", ["donc", "parce que"]],
    ["Je voudrais venir ; ___, je n'ai pas le temps. (however)", "cependant", ["donc", "puisque"]], ["Il est sorti ___ l'orage. (despite)", "malgré", ["donc", "parce que"]]
  ];
  const FACT = [
    ["Which tall iron tower in Paris was finished in 1889?", "la tour Eiffel", ["le Louvre", "le Mont-Saint-Michel"]], ["What gift did France give to the United States in 1886?", "la Statue de la Liberté", ["la tour Eiffel", "le pont du Gard"]],
    ["Which Paris museum has the Mona Lisa?", "le Louvre", ["le Stade de France", "le Mont-Saint-Michel"]], ["Who wrote Le Petit Prince?", "Antoine de Saint-Exupéry", ["Jules Verne", "Victor Hugo"]],
    ["Who wrote Vingt mille lieues sous les mers?", "Jules Verne", ["Victor Hugo", "Molière"]], ["Which French scientist made vaccines and gave his name to pasteurization?", "Louis Pasteur", ["Marie Curie", "Louis Braille"]],
    ["Who invented a reading system of raised dots for blind people?", "Louis Braille", ["Louis Pasteur", "Jules Verne"]], ["Which brothers showed the first public movie screening in Paris in 1895?", "les frères Lumière", ["les frères Montgolfier", "les frères Grimm"]],
    ["Which palace near Paris was the home of King Louis XIV?", "Versailles", ["Chambord", "Chenonceau"]], ["Which brothers invented the hot-air balloon in 1783?", "les frères Montgolfier", ["les frères Lumière", "les frères Wright"]],
    ["Which scientist, born in Poland, won two Nobel prizes while working in France?", "Marie Curie", ["Louis Pasteur", "Louis Braille"]]
  ];
  const SENT13 = [
    ["She left yesterday.", "Elle est partie hier.", ["Elle est parti hier.", "Elle a parti hier."]], ["The girls went out.", "Les filles sont sorties.", ["Les filles sont sortis.", "Les filles ont sorties."]],
    ["I sleep well.", "Je dors bien.", ["Je dormes bien.", "Je dort bien."]], ["We wait for the bus.", "Nous attendons le bus.", ["Nous attendont le bus.", "Nous attendez le bus."]],
    ["He has lived here for two years.", "Il habite ici depuis deux ans.", ["Il habite ici pendant deux ans.", "Il habite ici il y a deux ans."]], ["Which one of these books?", "Lequel de ces livres ?", ["Laquelle de ces livres ?", "Lesquel de ces livres ?"]],
    ["Someone is at the door.", "Quelqu'un est à la porte.", ["Quelque chose est à la porte.", "Quelqu'une est à la porte."]], ["The waiter serves the soup.", "Le serveur sert la soupe.", ["Le serveur serve la soupe.", "Le serveur serts la soupe."]],
    ["You understand.", "Tu comprends.", ["Tu comprend.", "Tu comprendes."]], ["Mine is bigger (my house).", "La mienne est plus grande.", ["Le mienne est plus grande.", "La mien est plus grande."]]
  ];
  const SENT15 = [
    ["She will have finished tomorrow.", "Elle aura fini demain.", ["Elle sera fini demain.", "Elle a fini demain."]], ["I would have come.", "Je serais venu.", ["J'aurais venu.", "Je suis venu."]],
    ["You must be careful.", "Il faut que tu sois prudent.", ["Il faut que tu es prudent.", "Il faut que tu être prudent."]], ["I think that she is right.", "Je pense qu'elle a raison.", ["Je pense qu'elle ait raison.", "Je pense qu'elle avoir raison."]],
    ["We begin at eight.", "Nous commençons à huit heures.", ["Nous commençont à huit heures.", "Nous commençeons à huit heures."]], ["I buy bread.", "J'achète du pain.", ["J'achetes du pain.", "J'achetons du pain."]],
    ["I do not understand what you say.", "Je ne comprends pas ce que tu dis.", ["Je ne comprends pas ce qui tu dis.", "Je ne comprends pas ce dont tu dis."]], ["Despite the rain, we play.", "Malgré la pluie, nous jouons.", ["Bien que la pluie, nous jouons.", "Parce que la pluie, nous jouons."]],
    ["The letter is written by Anna.", "La lettre est écrite par Anna.", ["La lettre est écrit par Anna.", "La lettre sont écrite par Anna."]], ["He sends a message.", "Il envoie un message.", ["Il envoit un message.", "Il envoye un message."]]
  ];
  const SENT14 = [
    ["The photos? I gave them to him.", "Les photos ? Je les lui ai données.", ["Les photos ? Je lui les ai données.", "Les photos ? Je les lui ai donné."]], ["The book was read by the class.", "Le livre est lu par la classe.", ["Le livre est lue par la classe.", "Le livre lu par la classe est."]],
    ["Although he is tired, he works.", "Bien qu'il soit fatigué, il travaille.", ["Bien qu'il est fatigué, il travaille.", "Bien qu'il sera fatigué, il travaille."]], ["Where do you live?", "Où habites-tu ?", ["Où tu-habites ?", "Habites où-tu ?"]],
    ["It is better to wait.", "Il vaut mieux attendre.", ["Il faut mieux attendre.", "Il vaux mieux attendre."]], ["He said that he was happy.", "Il a dit qu'il était content.", ["Il a dit qu'il est content.", "Il a dit qu'il sera content."]],
    ["The paintings that I saw.", "Les tableaux que j'ai vus.", ["Les tableaux que j'ai vu.", "Les tableaux que j'ai vue."]], ["We laugh a lot.", "Nous rions beaucoup.", ["Nous rient beaucoup.", "Nous rions-nous beaucoup."]],
    ["She paints a picture.", "Elle peint un tableau.", ["Elle peigne un tableau.", "Elle peins un tableau."]]
  ];
  const PASS = {
    p1: { t: "Hier, Camille est allée au marché avec sa grand-mère. Elles ont acheté des pommes, du pain et du fromage. Camille a choisi un petit gâteau au chocolat. Ensuite, elles sont rentrées à pied car il faisait beau.", qs: [["Avec qui Camille est-elle allée au marché ?", "Avec sa grand-mère", ["Avec son frère", "Avec sa maîtresse"]], ["Qu'est-ce que Camille a choisi ?", "Un gâteau au chocolat", ["Du fromage", "Des pommes"]], ["Pourquoi sont-elles rentrées à pied ?", "Il faisait beau", ["Il pleuvait", "Le bus était en retard"]]] },
    p2: { t: "Samedi prochain, nous irons à la montagne. Mon père a déjà réservé un petit chalet. Nous apporterons des vêtements chauds, car il fera froid. Si la neige tombe, ma sœur et moi ferons du ski.", qs: [["Quand vont-ils à la montagne ?", "Samedi prochain", ["Hier", "Samedi dernier"]], ["Qui a réservé le chalet ?", "Le père", ["La sœur", "La grand-mère"]], ["Pourquoi apportent-ils des vêtements chauds ?", "Il fera froid", ["Il fait chaud", "Il pleut"]]] },
    p3: { t: "Le petit chien de Léo s'appelle Biscotte. Chaque matin, elle attend Léo devant la porte. Quand il rentre de l'école, elle court vers lui en remuant la queue. Léo dit toujours : « Tu es mon meilleur ami ! »", qs: [["Comment s'appelle le chien ?", "Biscotte", ["Léo", "Bouboule"]], ["Où attend Biscotte ?", "Devant la porte", ["Dans le jardin", "Sous la table"]], ["Que fait Biscotte quand Léo rentre ?", "Elle court vers lui", ["Elle dort", "Elle mange"]]] },
    p4: { t: "Dans notre ville, il y a un nouveau parc. On y trouve des jeux pour les petits, un terrain de foot et un grand lac. Le dimanche, beaucoup de familles viennent pique-niquer. On ne peut pas y entrer avec une voiture.", qs: [["Qu'est-ce qu'il y a pour les petits ?", "Des jeux", ["Un lac", "Un cinéma"]], ["Quel jour viennent beaucoup de familles ?", "Le dimanche", ["Le lundi", "Le mercredi"]], ["Peut-on entrer dans le parc en voiture ?", "Non", ["Oui", "Seulement le soir"]]] }
  };
  const readItems = keys => [].concat(...keys.map(k => PASS[k].qs.map(q => [`<i>${PASS[k].t}</i><br><br>${q[0]}`, q[1], q[2], "", null])));
  const readHints = ["Read the text again slowly. Which sentence talks about what the question asks?", "Find the key word from the question in the text, then read the words around it.", "Example: Text: 'Tom mange une orange.' Question: Que mange Tom ? The text says it right there. Now find yours."];
  const SENTH = (e) => ["Check each sentence one word at a time. Which rule from your lessons applies?", "Look at the endings, the little words and the tense of the verb.", e];
  const sentGen = (items, ex) => mc(items.map(x => [`How do you say it in French: "${x[0]}"`, x[1], x[2]]), SENTH(ex), 2);

  // ====================== LEVEL 13 ======================
  const L13 = [
    vl("sortir", "Verbs like sortir (partir, dormir, servir) drop the end of the stem in the singular: je sors, tu sors, il sort."),
    vl("dormir", "Same family as sortir: je dors, tu dors, il dort, then nous dormons, vous dormez, ils dorment."),
    vl("servir", "Same family again: je sers, tu sers, il sert. In nous, vous and ils the full stem comes back."),
    vl("offrir", "Offrir, ouvrir and souffrir end in -ir but use -e, -es, -e like an -er verb.", "Remember: j'offre un cadeau!"),
    vl("comprendre", "Comprendre is built on prendre, so it works the same way: je comprends, nous comprenons, ils comprennent."),
    vl("tenir", "Tenir and venir are twins: je tiens, nous tenons, ils tiennent."),
    vl("attendre", "Regular -re verbs take -s, -s, nothing, -ons, -ez, -ent: j'attends, il attend."),
    les("Girl or boy with être", mq(AGR, "Does the sentence use être? Then the past participle must match the subject, like an adjective.", "Add -e for one girl or woman, -s for more than one boy or mixed group, -es for more than one girl.", "Example: 'monter': il est monté, elle est montée, ils sont montés, elles sont montées."),
      tg("Agreement with être", "🚶‍♀️", "In the past, verbs of movement (aller, venir, partir, arriver, sortir, tomber, rester…) use <b>être</b>. With être, the past participle <b>agrees</b> with the subject.", "il est allé<br>elle est allée<br>ils sont allés<br>elles sont allées", "Add <b>-e</b> for a girl, <b>-s</b> for many.", "A group with boys and girls together counts as masculine plural: Paul et Léa sont <b>restés</b>.")),
    les("Mine, yours, his: le mien…", mq(POS, "Which noun is being replaced: boy or girl word, one or many?", "The pronoun matches the thing owned, not the owner. A girl word takes -ne at the end, and many things take -s.", "Example: 'leur ami' → le leur, 'leur amie' → la leur, 'leurs amis' → les leurs."),
      tg("Possessive pronouns", "👜", "A possessive pronoun replaces <b>my book</b>, <b>your house</b>... It means <b>mine, yours, his, hers, ours, theirs</b>.", "le mien, la mienne<br>les miens, les miennes<br>le tien, la sienne<br>le nôtre, la vôtre, le leur", "Use <b>le / la / les</b> before them.", "Notice the hat on <b>nôtre</b> and <b>vôtre</b>. It helps you say them well!")),
    les("Celui, celle, ceux, celles", mc(DEM, ["Is the thing a boy word or a girl word? One or many?", "These words replace 'the one' or 'the ones'. They match the noun in gender and number.", it => DEMEX[it[1]]], 2),
      tg("The one(s) of...", "👆", "<b>Celui, celle, ceux, celles</b> mean <b>the one</b> or <b>the ones</b>. They match the noun they replace.", "celui = one, boy word<br>celle = one, girl word<br>ceux = many, boy words<br>celles = many, girl words", "Often followed by <b>de</b> or <b>qui</b>: celui de Paul, celle qui chante.", "Add -ci (here) or -là (there) to point: celui-ci, celle-là.")),
    les("Which one? Lequel", mc(LEQ, ["Look at the noun being asked about: is it a boy or girl word, one or many?", "These question words match the noun, like le, la, les.", it => LEQEX[it[1]]], 2),
      tg("Lequel, laquelle...", "❓", "<b>Lequel</b> means <b>which one</b>. It stands for a noun already named.", "lequel (boy, one)<br>laquelle (girl, one)<br>lesquels (boy, many)<br>lesquelles (girl, many)", "Lequel de ces livres ? = Which one of these books?", "Each form starts like le, la or les, and ends with <b>quel</b>.")),
    les("Someone, something, each", mc(IND, ["Is the blank about a person, a thing, or a number of things?", "Some words stand alone, and some come before a noun. Look at what follows the blank.", it => INDEX[it[1]]], 2),
      tg("Little words with big jobs", "🔎", "These words talk about people or things without naming them.", "quelqu'un = someone<br>quelque chose = something<br>chacun = each one<br>chaque + noun = each<br>plusieurs = several<br>quelques = a few", "Quelqu'un is for people, quelque chose is for things.", "<b>Chaque</b> is always followed by a noun (chaque jour). <b>Chacun</b> stands alone.")),
    les("For, since, ago: depuis, pendant", mq(DUR, "Ask: is it still going on now? Is it over, with a length of time? Or is it a point in the past?", "Still going on = one word. Finished length of time = another. Time before now = 'ago' word.", "Example: 'J'ai vécu à Nice pendant cinq ans' (finished) vs 'Je vis à Nice depuis cinq ans' (still). Now decide yours."),
      tg("Talking about time", "⏳", "French has three words for time that English translates as 'for', 'since' and 'ago'.", "depuis = since / for (still true)<br>pendant = for / during (finished)<br>il y a = ago", "J'habite ici <b>depuis</b> 2020 (and I still do).", "Careful: with depuis we use the PRESENT tense in French, even though English says 'have been'.")),
    les("Saving and spending", vocab(B.money), tVocab(B.money)),
    les("News and media", vocab(B.media), tVocab(B.media)),
    les("Art and museums", vocab(B.art), tVocab(B.art)),
    les("Type the verb", typeVerb(["sortir", "dormir", "servir", "offrir", "comprendre", "tenir", "attendre"]), [S("Type it!", "⌨️", "This time you type the verb form yourself. Think about who is doing the action."), S("Reminders", "sortir: je sors, nous sortons<br>comprendre: ils comprennent<br>tenir: ils tiennent", "Short stems in the singular, full stems in nous and vous."), S("Tip", "🧠", "Accents are optional when you type, but try to add them for practice!")]),
    les("Which sentence is correct?", sentGen(SENT13, "Example: 'We are eating' → 'Nous mangeons' (nous + -ons), not 'Nous mange'. Now check yours."), [S("Spot the mistake", "🕵️", "Choose the correct French sentence out of three."), S("Checklist", "✔️ verb ending<br>✔️ girl / boy, one / many<br>✔️ depuis / pendant<br>✔️ little words", "Go through each sentence like a detective."), S("Tip", "🧠", "Say each sentence out loud. A wrong one often sounds odd!")])
  ];
  L13.push(MIX("Mixed practice", L13.slice(0, 18), [L13[0], L13[7], L13[12]]));
  L13.push(MIX("Level 13 Challenge", L13.slice(0, 18), [L13[3], L13[9], L13[11]]));

  // ====================== LEVEL 14 ======================
  const L14 = [
    vl("rire", "A short verb: je ris, tu ris, il rit, nous rions, vous riez, ils rient."),
    vl("plaire", "Plaire is how French says 'to like': Ça me plaît = I like it (it pleases me)."),
    vl("conduire", "Conduire, construire and produire all follow this pattern.", "J'ai appris à conduire = I learned to drive."),
    vl("peindre", "Peindre, éteindre and craindre change -ind- to -ign- in nous, vous and ils."),
    les("It is necessary: il faut...", mc(IMP, ["Some French verbs only exist with il (it). Which idea fits the clue in brackets?", "These 'it' expressions do not talk about a real person. Match the clue in brackets with the meaning.", "Example: 'Il neige' = it is snowing; 'Il y a' = there is. Match the meaning of yours."], 2),
      tg("Impersonal expressions", "🌧️", "Some expressions always use <b>il</b> (it). The il does not mean a real person.", "il faut = it is necessary, we must<br>il vaut mieux = it is better<br>il y a = there is, there are<br>il pleut = it is raining<br>il suffit de = it is enough to<br>il s'agit de = it is about", "These are very common in French!", "Il faut is followed by an infinitive: il faut manger. Il faut que is followed by the subjunctive.")),
    les("The passive: done by someone", mq(PAS, "In the passive, the person who gets the action becomes the new subject.", "Passive = être (in the same tense as the original verb) + past participle that agrees with the new subject + par.", "Example: 'Luc ouvre la fenêtre' → 'La fenêtre est ouverte par Luc.' Now do yours."),
      tg("The passive voice", "🔄", "In a normal sentence the subject does the action: <b>Marie ferme la porte</b>. In the <b>passive</b>, the subject receives it: <b>La porte est fermée par Marie</b>.", "Le chat mange la souris.<br>La souris est mangée par le chat.", "être + past participle (agrees!) + par.", "The participle agrees with the NEW subject: la porte est ferm<b>ée</b>, les portes sont ferm<b>ées</b>.")),
    les("Two pronouns together", mq(PRO, "Replace the thing and the person. Which small word comes first?", "Order: me/te/nous/vous first, then le/la/les, then lui/leur, then y, then en.", "Example: 'Je prête le stylo à Léa.' → 'Je le lui prête.' Now do yours."),
      tg("Pronoun order", "🧩", "You can use two pronouns in one sentence. They go before the verb in a set order.", "Je donne le livre à Paul.<br>→ Je <b>le lui</b> donne.<br>Il te donne la clé.<br>→ Il <b>te la</b> donne.", "me, te, nous, vous → le, la, les → lui, leur → y → en.", "Try the chain: <b>me te nous vous - le la les - lui leur - y - en</b>. Say it like a song.")),
    les("Telling what someone said", mq(REP, "Look at the verb that says 'said'. If it is in the past, the next verb moves back in time.", "Pronouns change to fit the speaker. After a past 'said': present → imparfait, past → plus-que-parfait, future → conditional. A yes/no question uses si.", "Example: Il a dit : « Je chante. » → Il a dit qu'il chantait. Now do yours."),
      tg("Reported speech", "💬", "Reported speech tells what someone said without quoting. French adds <b>que</b> (or <b>si</b> for a yes/no question).", "Il dit : « J'ai faim. »<br>→ Il dit qu'il a faim.<br>Il a dit : « J'ai faim. »<br>→ Il a dit qu'il avait faim.", "When the main verb is in the past, the next verb steps back in time.", "Yes/no question → <b>si</b>. Question with a word like où or quand → keep that word.")),
    les("Participles with avoir", mq(AVA, "Is the thing (the object) before the verb or after it?", "With avoir, the participle agrees with the object only if the object comes BEFORE the verb. Otherwise it does not change.", "Example: 'J'ai fini les devoirs' (no change) but 'Les devoirs que j'ai finis' (agrees). Now do yours."),
      tg("When avoir agrees", "🔗", "With <b>avoir</b>, the past participle usually does not change: <b>J'ai écrit la lettre</b>.", "J'ai écrit la lettre.<br>La lettre que j'ai écrit<b>e</b>.", "It changes only when the object comes <b>before</b> the verb (often with que, or with le, la, les).", "Ask: <b>What did I write?</b> If the answer is already in front of the verb, add -e / -s / -es.")),
    les("Subjunctive helpers", mc(SUB, ["These little words (bien que, pour que, avant que, jusqu'à ce que) need a special verb form.", "The verb after these words is in the subjunctive. Regular -er verbs look like the present; others change.", "Example: Bien que tu saches: savoir becomes sache- in the subjunctive. Now do yours."], 2),
      tg("More subjunctive", "🔔", "Some words are always followed by the <b>subjunctive</b>.", "pour que = so that<br>avant que = before<br>bien que = although<br>quoique = although<br>jusqu'à ce que = until", "Bien que je <b>sois</b> fatigué, je viens.", "Learn the key forms: sois, aie, aille, fasse, puisse, sache.")),
    les("Little place words", mc(PRP, ["Translate the clue in brackets into a small French word.", "Check which choice matches the meaning in brackets.", "Example: avec = with, sans = without, pour = for. Match the clue the same way."], 2),
      tg("Prepositions", "📍", "Prepositions connect words and show place, relation or idea.", "sous = under<br>chez = at the home of<br>malgré = despite<br>sauf = except<br>selon = according to<br>entre = between<br>parmi = among<br>vers = toward", "Chez moi = at my place.", "<b>Entre</b> is for two things, <b>parmi</b> is for many.")),
    les("Questions the formal way", mq(INV, "In formal questions, the verb comes first and the person word follows.", "Flip the verb and pronoun and join them with a hyphen. If the verb ends in a vowel and the pronoun is il or elle, add -t- between.", "Example: 'Tu chantes' → 'Chantes-tu ?' and 'Il aime' → 'Aime-t-il ?'. Now do yours."),
      tg("Inversion", "🔀", "A polite or formal way to ask a question: swap the verb and the person word.", "Tu parles anglais.<br>→ Parles-tu anglais ?<br>Où habite-t-elle ?", "Join them with a hyphen. Add <b>-t-</b> when two vowels would meet.", "In everyday speech people use <b>est-ce que</b> or just a rising voice. Inversion sounds more formal.")),
    les("Regions and rivers", mq(GEO, "Picture a map of France. Is it north, south, east or west? Is it a sea, a river or mountains?", "Think about what this place is famous for: food, borders, coast, or height.", "Example: the Rhône flows through Lyon to the Mediterranean. Link each name to a place on the map."),
      tg("Geography of France", "🗺️", "France has many regions, rivers and mountains.", "la Bretagne (northwest)<br>l'Alsace (east)<br>la Provence (southeast)<br>la Corse (island)<br>la Seine · la Loire", "The Loire is the longest river. The Seine flows through Paris.", "The <b>Alpes</b> are in the east and the <b>Pyrénées</b> are in the south, next to Spain.")),
    les("Capitals of French-speaking countries", capQ, [S("French around the world", "🌍", "French is spoken in many countries, in Europe, Africa, North America and the Caribbean."), S("Capitals", ["Dakar", "Bruxelles", "Berne", "Rabat", "Tunis", "Bamako", "Yaoundé"].map((c, i) => word(c, ["capital of Senegal", "capital of Belgium", "capital of Switzerland", "capital of Morocco", "capital of Tunisia", "capital of Mali", "capital of Cameroon"][i])).join("<br>"), "<b>Tap any city to hear it.</b>"), S("Tip", "🧠", "Match each capital to its country and its part of the world. Algiers is <b>Alger</b> in French.")]),
    les("Middle school life", vocab(B.school), tVocab(B.school)),
    les("Personality words", vocab(B.perso), tVocab(B.perso)),
    les("Type the verb", () => Math.random() < 0.6 ? typeVerb(["rire", "plaire", "conduire", "peindre"])() : typeVerb(["sortir", "dormir", "servir", "offrir", "comprendre", "tenir", "attendre"])(), [S("Type it!", "⌨️", "This time you type the verb form yourself."), S("Reminders", "rire: nous rions<br>peindre: ils peignent<br>conduire: nous conduisons", "Watch the stem changes in nous, vous and ils."), S("Tip", "🧠", "Accents are optional when you type, but try to add them for practice!")]),
    les("Reading and understanding", mc(readItems(["p1", "p2", "p3", "p4"]), readHints, 2), [S("Reading", "📖", "Here you read short French texts and answer questions about them."), S("How to read", "🔎", "Notice the tense: <b>est allée</b> (past), <b>irons</b> (future). Then find the sentence that answers the question."), S("Tip", "🧠", "The question often uses the same key words as the text. Spot them, then read around them.")])
  ];
  L14.push(MIX("Mixed practice", L14.slice(0, 18), [L14[4], L14[5], L14[6]]));
  L14.push(MIX("Level 14 Challenge", L14.slice(0, 18), [L14[8], L14[10], L14[12]]));

  // ====================== LEVEL 15 ======================
  const L15 = [
    les("The future perfect", mq(FUA, "The action happens before another future action. Which helper verb is it: avoir or être, in the future?", "Future perfect = avoir or être in the FUTURE + past participle. Quand / dès que / après que often come before it.", "Example: 'Quand nous aurons fini, nous partirons.' Now do yours."),
      tg("Finished before the future", "⏭️", "The <b>future perfect</b> shows an action that will be finished before another future moment.", "Quand j'<b>aurai fini</b>, je jouerai.<br>Dès qu'elle <b>sera arrivée</b>, nous mangerons.", "avoir or être in the <b>future</b> + past participle.", "Same verbs as the passé composé: aller, venir, partir… use être.")),
    les("The past conditional", mq(CPA, "This sentence is about something that did NOT happen. Which helper verb is used?", "Past conditional = avoir or être in the CONDITIONAL (-ais, -ait, -ions, -iez, -aient) + past participle.", "Example: 'Nous aurions fini' = we would have finished. Now do yours."),
      tg("What would have happened", "🕰️", "The <b>past conditional</b> says what <b>would have</b> happened.", "J'<b>aurais mangé</b>. (I would have eaten)<br>Elle <b>serait venue</b>. (She would have come)", "avoir or être in the <b>conditional</b> + past participle.", "Often used after <b>si + plus-que-parfait</b>: Si j'avais su, je serais venu.")),
    les("Reading old stories: passé simple", mq(PSI, "This is a story form. The action already happened and is finished.", "In books, the passé simple tells finished past actions. Endings like -a, -ent, -it, -urent, -èrent, -irent mean it is in the past.", "Example: 'Il chanta' = he sang; 'Ils vinrent' belongs to venir. Now translate yours."),
      tg("The tense of storybooks", "📜", "In novels and fairy tales, you will see the <b>passé simple</b>. We rarely speak with it, but we need to <b>recognize</b> it.", "Il parla = he spoke<br>Ils mangèrent = they ate<br>Elle fit = she made<br>Elle vit = she saw", "It means a finished action in the past, like the passé composé.", "Usually you only meet the il / elle and ils / elles forms.")),
    vl("envoyer", "Verbs in -oyer, -uyer, -ayer change y → i before a silent ending: j'envoie, mais nous envoyons."),
    les("Spelling-change verbs", mq(SPC, "Say the verb out loud. Does the sound change in the part with the blank?", "Spelling changes keep the sound: -ger → -geons, -cer → -çons, e → è, double the consonant (appeler, jeter), y → i (nettoyer).", "Example: 'lancer' → nous lançons; 'lever' → je lève. Now do yours."),
      tg("Verbs that change spelling", "✍️", "Some verbs change their spelling to keep the right sound.", "manger → nous mangeons<br>commencer → nous commençons<br>acheter → j'achète<br>appeler → j'appelle<br>nettoyer → je nettoie", "The pattern follows the sound, not just the letters.", "A soft g or c before o needs help: <b>-geons</b>, <b>-çons</b>.")),
    les("Subjunctive: the key verbs", subjQ, [S("Irregular subjunctive", "🔔", "Some verbs have special subjunctive forms. You must learn them by heart."), S("The key forms", "être: que je sois, que nous soyons<br>avoir: que j'aie, que nous ayons<br>aller: que j'aille, que nous allions<br>faire: que je fasse", "Add <b>pouvoir</b> (puisse), <b>savoir</b> (sache), <b>vouloir</b> (veuille)."), S("Tip", "🧠", "For nous and vous, the subjunctive often looks like the imparfait: que nous allions, que vous fassiez.")]),
    les("Subjunctive or normal tense?", mq(SJI, "Is the first part about certainty or a fact, or about a wish, a feeling, a doubt?", "Wish, feeling, doubt, possibility and 'il faut que' need the subjunctive. Fact and certainty use the normal tense.", "Example: 'Je veux qu'il vienne' (wish: subjunctive) but 'Je crois qu'il vient' (belief: normal). Now decide yours."),
      tg("Two moods", "⚖️", "After some expressions, French uses the <b>subjunctive</b>; after others, the normal tense (<b>indicative</b>).", "Je veux que tu sois là. (wish)<br>Je pense que tu es là. (belief)", "Wish, order, feeling, doubt → subjunctive. Certainty → normal.", "After <b>penser que</b> (affirmative) and <b>savoir que</b>, no subjunctive.")),
    les("What: ce qui, ce que, ce dont", mq(CEQ, "Look at what comes right after the blank: a verb, a person word like tu or je, or a verb that needs 'de'?", "If a verb follows, it is the subject kind. If a person word follows, it is the object kind. If the verb needs de, use the 'of which' kind.", "Example: 'Je sais ce que tu fais' (tu follows). 'Je vois ce qui bouge' (verb follows). Now decide yours."),
      tg("Long relative words", "🔗", "<b>Ce qui, ce que, ce dont</b> mean <b>what</b> or <b>the thing that</b>.", "Je sais <b>ce que</b> tu veux.<br>Dis-moi <b>ce qui</b> se passe.<br>C'est <b>ce dont</b> j'ai besoin.", "ce qui = subject, ce que = object, ce dont = with de.", "Ask: what comes next? A verb → qui. A subject → que. A verb with de → dont.")),
    les("Adjectives that change meaning", mc(ADJ, ["Think: is the word before or after the noun?", "Before the noun, the adjective often has a figurative or personal meaning. After the noun, it has a literal meaning.", "Example: un homme brave = a courageous man; un brave homme = a kind, good man. Now decide yours."], 2),
      tg("Position changes meaning", "🔁", "Some adjectives change meaning when you move them.", "un ancien prof = a former teacher<br>un prof ancien = an old teacher<br>un pauvre homme = a sad case<br>un homme pauvre = no money<br>ma propre chambre = my own", "Before the noun: figurative. After: literal.", "Also: <b>grand homme</b> = a great man; <b>homme grand</b> = a tall man.")),
    les("Because, so, thanks to", mq(CAU, "Does the blank give a reason, a result, or a goal?", "Reason = why it happens. Result = what follows. Goal = what you want to do. Good cause = thanks to; bad cause = because of.", "Example: 'Je dors car je suis fatigué.' (car gives a reason). Now decide yours."),
      tg("Cause and consequence", "🧱", "These words explain why things happen and what follows.", "parce que = because<br>puisque = since<br>grâce à = thanks to<br>à cause de = because of (bad)<br>donc = so<br>c'est pourquoi = that is why<br>afin de = in order to", "Use <b>grâce à</b> for good things, <b>à cause de</b> for bad ones.", "Use <b>parce que</b> before a verb and <b>à cause de</b> before a noun.")),
    les("Although, despite, whereas", mq(OPP, "Look at what comes after the blank: a noun, a verb in the subjunctive, or a whole new sentence?", "Noun after = a preposition. Subjunctive verb after = a conjunction needing the subjunctive. A full sentence after = a linking word.", "Example: 'Il est jeune, mais il est sage.' (mais joins two ideas). Now decide yours."),
      tg("Opposing ideas", "↔️", "These words show a contrast or a surprise.", "malgré = despite<br>bien que = although<br>pourtant = yet<br>cependant = however<br>tandis que = whereas", "<b>Malgré</b> + noun. <b>Bien que</b> + subjunctive.", "Bien que il → <b>bien qu'il</b>. The que loses its e before a vowel.")),
    les("Protecting the planet", vocab(B.env), tVocab(B.env)),
    les("History words", vocab(B.hist), tVocab(B.hist)),
    les("Famous names and places", mq(FACT, "Think about what this person or place is known for.", "Link the name to the invention, the book, the building or the discovery.", "Example: Claude Monet painted water lilies. Link each name to what it is known for."),
      tg("Discover France", "🇫🇷", "France is full of famous scientists, writers, inventors and monuments.", "Louis Pasteur · vaccines<br>Marie Curie · science<br>Jules Verne · adventure books<br>la tour Eiffel · Paris", "Each name has a story!", "Try to remember one fact about each name, and you will remember the name.")),
    les("Books and stories", vocab(B.books), tVocab(B.books)),
    les("Organizing what you say", vocab(B.essay), tVocab(B.essay)),
    les("Type the verb", () => Math.random() < 0.55 ? typeSubj() : typeVerb(["envoyer", "tenir", "peindre", "conduire", "comprendre", "attendre"])(), [S("Type it!", "⌨️", "This time you type the answer. It can be a present tense verb or a subjunctive form."), S("Reminders", "présent: j'envoie, nous envoyons<br>subjonctif: que je sois, que j'aille", "After <b>il faut que</b> use the subjunctive."), S("Tip", "🧠", "Accents are optional when you type, but try to add them for practice!")]),
    les("Which sentence is correct?", sentGen(SENT15, "Example: 'We are eating' → 'Nous mangeons' (nous + -ons), not 'Nous mange'. Now check yours."), [S("Spot the mistake", "🕵️", "Choose the correct French sentence out of three."), S("Checklist", "✔️ tense<br>✔️ subjunctive or not<br>✔️ spelling changes<br>✔️ ce qui / ce que", "Go through each sentence like a detective."), S("Tip", "🧠", "Say each sentence out loud. A wrong one often sounds odd!")])
  ];
  L15.push(MIX("Mixed practice", L15.slice(0, 18), [L15[0], L15[5], L15[7]]));
  L15.push(MIX("Level 15 Challenge", L15.slice(0, 18), [L15[1], L15[8], L15[9]]));

  Object.assign(FRENCH_LEVELS, { 13: L13, 14: L14, 15: L15 });
})();
