// ext/spanish-10-12.js  Mind Lab Spanish, levels 10-12 (60 lessons)
(() => {
  const SP = (name, items) => ({ name, items });
  const word = (es, en, e) => `<span class="word" data-say="${es}">${e ? e + " " : ""}<b>${es}</b> = ${en} 🔊</span>`;
  const L1 = s => s.replace(/[¿¡]/g, "")[0];
  const S3 = arr => arr.map(([h, v, t]) => ({ h, v, t }));
  const XL = (title, make, slides) => { if (slides) make.teach = () => S3(slides); return { title, make }; };
  const MIX = ms => {
    const f = () => pick(ms)();
    const step = Math.max(1, Math.floor(ms.length / 4));
    f.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes ideas you already know. Here is a quick reminder of some of them, then the quiz." }]
      .concat(ms.filter((_, i) => i % step === 0).slice(0, 4).map(m => m.teach()[0]));
    return f;
  };

  // ---------- vocabulary ----------
  const V = (bank, tip) => {
    const f = () => {
      const items = bank.items, [es, en, e] = pick(items);
      const rest = items.filter(x => x[0] !== es), exs = pick(rest);
      const m = pick(e ? ["es2en", "en2es", "pic"] : ["es2en", "en2es"]);
      const w = shuf(rest);
      if (m === "es2en") return { text: `What does "${es}" mean?`, say: es, lang: "es-ES", choices: shuf([en, ...w.slice(0, 2).map(x => x[1])]), answer: en,
        hints: ["Press 🔊 to hear the Spanish and say it out loud. Does it look or sound like an English word?", `The English answer starts with the letter "${en[0].toUpperCase()}".`, `Example: "${exs[0]}" means "${exs[1]}". Now think about yours.`] };
      if (m === "en2es") return { text: `How do you say "${en}" in Spanish?`, choices: shuf([es, ...w.slice(0, 2).map(x => x[0])]), answer: es,
        hints: ["Think back to the Spanish in the lesson. Which one matches the English?", `The Spanish starts with "${L1(es)}".`, `Example: "${exs[1]}" in Spanish is "${exs[0]}". Now find yours.`] };
      return { text: "How do you say this in Spanish?", visual: e, choices: shuf([es, ...w.slice(0, 2).map(x => x[0])]), answer: es,
        hints: ["Look at the picture. What is it in English?", `The Spanish word starts with "${L1(es)}".`, `Example: ${exs[2] || "another picture"} is "${exs[0]}" in Spanish. Now find yours.`] };
    };
    f.teach = () => [
      { h: bank.name, v: bank.items.slice(0, 3).map(x => x[2] || "💬").join(" "), t: `Today's topic: <b>${bank.name.toLowerCase()}</b>. Let's learn some new Spanish!` },
      { h: "Learn the words", v: bank.items.map(x => word(x[0], x[1], x[2])).join("<br>"), t: "<b>Tap any line to hear it</b> and say it out loud!" },
      { h: "How to remember", v: "🧠", t: tip || "Say each one out loud. Cover the English and test yourself. Make a picture in your head for each word." }
    ];
    return f;
  };
  // type the Spanish for an English word
  const TYE = (items, name) => {
    const its = items.filter(x => !/[ ¿?]/.test(x[0]));
    const f = () => {
      const [es, en, e] = pick(its), ex = pick(its.filter(x => x[0] !== es));
      return { text: `Type this in Spanish: <b>${en}</b>`, visual: e, textInput: true, answer: es,
        hints: ["Say the English word in your head. Then remember the Spanish word from the lessons.", `The Spanish word starts with "${L1(es)}" and has ${es.length} letters.`, `Example: "${ex[1]}" is "${ex[0]}" in Spanish. Now do yours. (You do not need to type accents.)`] };
    };
    f.teach = () => [
      { h: "Typing Spanish", v: "⌨️", t: `In this lesson you read an English word and type the Spanish word. The words come from ${name}.` },
      { h: "Accents are optional", v: "á é í ó ú ñ", t: "You can leave the accents off: <b>canción</b> and <b>cancion</b> both count." },
      { h: "Sound it out", v: "🔊", t: "Spanish is spelled the way it sounds. Say the word slowly and write the letters you hear." }
    ];
    return f;
  };
  // rows: [question, answer, [wrongs], optional clue]
  const RW = (rows, o) => {
    const f = () => {
      const [q, a, w, c] = pick(rows);
      let h2 = c || o.h2;
      if (!c && o.letter) h2 += ` The answer starts with "${L1(a)}".`;
      return { text: q, visual: o.vis, choices: shuf([a, ...w]), answer: a, hints: [o.h1, h2, o.h3] };
    };
    f.teach = () => S3(o.slides);
    return f;
  };
  // translate sentences: pairs [es, en]
  const TR = (pairs, slides, hint1) => {
    const f = () => {
      const [es, en] = pick(pairs), others = shuf(pairs.filter(p => p[0] !== es)), ex = others[0];
      if (Math.random() < 0.5) return { text: `What does "${es}" mean?`, say: es, lang: "es-ES", choices: shuf([en, others[1][1], others[2][1]]), answer: en,
        hints: [hint1 || "Press 🔊, then read it slowly word by word. Find the words you already know.", `The English starts with "${en[0]}" and has ${en.split(" ").length} words.`, `Example: "${ex[0]}" means "${ex[1]}". Now do yours.`] };
      return { text: `How do you say "${en}" in Spanish?`, choices: shuf([es, others[1][0], others[2][0]]), answer: es,
        hints: ["Find the key words in English, then think of their Spanish partners from the lesson.", `The Spanish starts with "${L1(es)}" and has ${es.split(" ").length} words.`, `Example: "${ex[1]}" in Spanish is "${ex[0]}". Now do yours.`] };
    };
    f.teach = () => S3(slides);
    return f;
  };
  // reading passages: [{t, qs:[[question, answer, [wrongs], clue]]}]
  const RD = (ps, slides) => {
    const f = () => {
      const p = pick(ps), [q, a, w, c] = pick(p.qs);
      return { text: `<i>${p.t}</i><br><br>${q}`, say: p.t, lang: "es-ES", choices: shuf([a, ...w]), answer: a,
        hints: ["Read the story again slowly, a few words at a time. Find the words you already know.", c || "Find the part of the story that matches the question. Look for the key words.",
          "Example: if a story says \"Ana come pan en la cocina\", the question \"What does Ana eat?\" is answered by finding the words after \"come\". Now do yours."] };
    };
    f.teach = () => S3(slides);
    return f;
  };

  // ---------- verbs ----------
  const PK = ["yo", "tú", "él", "nosotros", "ellos"];
  const PD = { yo: "yo", "tú": "tú", "él": "él / ella", nosotros: "nosotros", ellos: "ellos / ellas" };
  const PE = { yo: "I", "tú": "you", "él": "he / she", nosotros: "we", ellos: "they" };
  const vb = (inf, en, f, note) => ({ inf, en, f: Array.isArray(f) ? f : f.split(","), note });
  const ENDS = { cond: ["ía", "ías", "ía", "íamos", "ían"], sAr: ["e", "es", "e", "emos", "en"], sEr: ["a", "as", "a", "amos", "an"] };
  const cond = (inf, en) => vb(inf, en, ENDS.cond.map(e => inf + e));
  const condS = (inf, en, stem) => vb(inf, en, ENDS.cond.map(e => stem + e), `Special stem: <b>${stem}-</b> (not the whole infinitive).`);
  const sAr = (inf, en) => vb(inf, en, ENDS.sAr.map(e => inf.slice(0, -2) + e));
  const sEr = (inf, en) => vb(inf, en, ENDS.sEr.map(e => inf.slice(0, -2) + e));
  const had = (inf, en, part, note) => vb(inf, en, ["había", "habías", "había", "habíamos", "habían"].map(h => h + " " + part), note);
  const was = (inf, en, ger, note) => vb(inf, en, ["estaba", "estabas", "estaba", "estábamos", "estaban"].map(h => h + " " + ger), note);
  const CJ = o => {
    const vs = o.verbs;
    const f = () => {
      const v = pick(vs), i = ri(0, 4), k = PK[i], ans = v.f[i], ex = pick(vs.filter(x => x !== v));
      const shown = i === 2 ? pick(["él", "ella"]) : k;
      const hints = ["Spanish verbs change to match WHO does the action. Who is it here?", (v.note ? v.note + " " : "") + o.rule[k],
        `Example: with ${ex.inf} (${ex.en}): yo ${ex.f[0]}, tú ${ex.f[1]}, nosotros ${ex.f[3]}. Now find yours.`];
      const lead = (o.pre ? o.pre + " " : "") + shown, tag = o.tag ? ` <i>(${o.tag})</i>` : "";
      if (!o.mc && ans.replace(/ /g, "").length >= 5 && Math.random() < 0.5) return { text: `Type the right form: <b>${lead}</b> ___ (${v.inf}, ${v.en})${tag}`, textInput: true, answer: ans, hints };
      const wr = shuf([...new Set(v.f)].filter(x => x !== ans)).slice(0, 2);
      return { text: `${lead} ___ (${v.inf}, ${v.en})${tag}`, choices: shuf([ans, ...wr]), answer: ans, hints };
    };
    f.teach = () => {
      const v = vs[0], v2 = vs[1];
      const tab = u => PK.map((p, i) => word(u.f[i], PE[p]).replace("<b>", `${PD[p]} <b>`)).join("<br>");
      return [
        { h: `${v.inf} (${v.en})`, v: tab(v), t: o.t1 },
        { h: o.title, v: o.pat, t: o.t2 },
        { h: `Another one: ${v2.inf}`, v: tab(v2), t: "Say all the forms out loud like a song: yo, tú, él, nosotros, ellos." }
      ];
    };
    return f;
  };
  // which person does the form go with? (for any tense)
  const SUBRULE = {
    yo: "The <b>yo</b> form is the same as the <b>él / ella</b> form.",
    "tú": "The <b>tú</b> form is the él form plus an <b>-s</b>.",
    "él": "The <b>él / ella</b> form is the same as the <b>yo</b> form.",
    nosotros: "The <b>nosotros</b> form ends in <b>-mos</b>.",
    ellos: "The <b>ellos</b> form ends in <b>-n</b>."
  };

  // ---------- LEVEL 10 data ----------
  const COND_REG = [cond("hablar", "to speak"), cond("comer", "to eat"), cond("vivir", "to live"), cond("viajar", "to travel"), cond("bailar", "to dance"), cond("escribir", "to write"), cond("correr", "to run"), cond("estudiar", "to study")];
  const COND_RULE = {
    yo: "For <b>yo</b>, keep the whole infinitive and add <b>-ía</b>.",
    "tú": "For <b>tú</b>, keep the whole infinitive and add <b>-ías</b>.",
    "él": "For <b>él / ella</b>, keep the whole infinitive and add <b>-ía</b>.",
    nosotros: "For <b>nosotros</b>, keep the whole infinitive and add <b>-íamos</b>.",
    ellos: "For <b>ellos</b>, keep the whole infinitive and add <b>-ían</b>."
  };
  const condRegular = CJ({ verbs: COND_REG, rule: COND_RULE, tag: "would", title: "Add to the infinitive", pat: "hablar + ía<br>comer + ías<br>vivir + íamos",
    t1: "<b>Tap a line to hear it.</b> The conditional says what someone <b>would</b> do: hablaría = I would speak.",
    t2: "You do not remove anything from the infinitive. Keep <b>hablar</b> whole and add <b>-ía, -ías, -ía, -íamos, -ían</b>. The endings are the same for -ar, -er and -ir verbs." });
  const COND_IRR = [condS("tener", "to have", "tendr"), condS("hacer", "to do", "har"), condS("poder", "to be able", "podr"), condS("salir", "to leave", "saldr"), condS("querer", "to want", "querr"), condS("saber", "to know", "sabr"), condS("poner", "to put", "pondr"), condS("venir", "to come", "vendr"), condS("decir", "to say", "dir")];
  const condSpecial = CJ({ verbs: COND_IRR, rule: COND_RULE, tag: "would", title: "Special stems", pat: "tener → tendr + ía<br>hacer → har + ía<br>poder → podr + ía",
    t1: "<b>Tap a line to hear it.</b> The endings are the same as always, but the first part of the verb is different.",
    t2: "Some verbs lose a letter or change the stem: <b>tendr-, har-, podr-, saldr-, querr-, sabr-, pondr-, vendr-, dir-</b>. The endings stay <b>-ía, -ías, -ía, -íamos, -ían</b>. These are the same stems as the future tense!" });
  const SUB_AR = [sAr("hablar", "to speak"), sAr("bailar", "to dance"), sAr("cantar", "to sing"), sAr("caminar", "to walk"), sAr("estudiar", "to study"), sAr("ayudar", "to help"), sAr("cocinar", "to cook"), sAr("trabajar", "to work")];
  const SUB_ER = [sEr("comer", "to eat"), sEr("vivir", "to live"), sEr("escribir", "to write"), sEr("correr", "to run"), sEr("beber", "to drink"), sEr("aprender", "to learn"), sEr("abrir", "to open"), sEr("recibir", "to receive")];
  const RULE_SAR = {
    yo: "This is an -ar verb. Drop <b>-ar</b> and add <b>-e</b> for yo.", "tú": "This is an -ar verb. Drop <b>-ar</b> and add <b>-es</b> for tú.", "él": "This is an -ar verb. Drop <b>-ar</b> and add <b>-e</b> for él / ella.",
    nosotros: "This is an -ar verb. Drop <b>-ar</b> and add <b>-emos</b> for nosotros.", ellos: "This is an -ar verb. Drop <b>-ar</b> and add <b>-en</b> for ellos."
  };
  const RULE_SER = {
    yo: "This is an -er / -ir verb. Drop the ending and add <b>-a</b> for yo.", "tú": "This is an -er / -ir verb. Drop the ending and add <b>-as</b> for tú.", "él": "This is an -er / -ir verb. Drop the ending and add <b>-a</b> for él / ella.",
    nosotros: "This is an -er / -ir verb. Drop the ending and add <b>-amos</b> for nosotros.", ellos: "This is an -er / -ir verb. Drop the ending and add <b>-an</b> for ellos."
  };
  const SUBPRE = "Es importante que";
  const subAr = CJ({ verbs: SUB_AR, rule: RULE_SAR, pre: SUBPRE, title: "The switch", pat: "-ar verbs use <b>e</b><br>hablo → hable",
    t1: "<b>Tap a line to hear it.</b> This is the <b>wish form</b> (the subjunctive). It is used after phrases like <b>es importante que</b> or <b>quiero que</b>.",
    t2: "For -ar verbs, take the <b>-ar</b> off and add <b>-e, -es, -e, -emos, -en</b>. The vowel switches: -ar verbs use <b>e</b>." });
  const subEr = CJ({ verbs: SUB_ER, rule: RULE_SER, pre: SUBPRE, title: "The other switch", pat: "-er / -ir verbs use <b>a</b><br>como → coma",
    t1: "<b>Tap a line to hear it.</b> The wish form of -er and -ir verbs is the mirror image of the -ar verbs.",
    t2: "For -er and -ir verbs, take the ending off and add <b>-a, -as, -a, -amos, -an</b>. The vowel switches: -er and -ir verbs use <b>a</b>." });
  const SUB_SPEC = [
    vb("ser", "to be", "sea,seas,sea,seamos,sean", "Ser's wish forms all start with <b>se-</b>."), vb("ir", "to go", "vaya,vayas,vaya,vayamos,vayan", "Ir's wish forms all start with <b>vay-</b>."),
    vb("estar", "to be (place, feeling)", "esté,estés,esté,estemos,estén", "Estar's wish forms start with <b>est-</b>."), vb("dar", "to give", "dé,des,dé,demos,den", "Dar's wish forms are short and start with <b>d-</b>."),
    vb("saber", "to know", "sepa,sepas,sepa,sepamos,sepan", "Saber's wish forms all start with <b>sep-</b>.")
  ];
  const subSpecial = CJ({ verbs: SUB_SPEC, rule: SUBRULE, pre: SUBPRE, title: "Five special verbs", pat: "ser → sea<br>ir → vaya<br>estar → esté<br>dar → dé<br>saber → sepa",
    t1: "<b>Tap a line to hear it.</b> Five verbs do not follow the normal wish-form pattern. You just have to learn them.",
    t2: "<b>Ser, ir, estar, dar</b> and <b>saber</b> are special. Still, the endings of the persons are similar: tú adds <b>-s</b>, nosotros ends in <b>-mos</b>, and ellos ends in <b>-n</b>." });
  const wishes = RW([
    ["Quiero que tú ___ conmigo. (hablar)", "hables", ["hablas", "hablar"]], ["Espero que ella ___ pronto. (venir)", "venga", ["viene", "vienes"]],
    ["Es importante que nosotros ___ temprano. (llegar)", "lleguemos", ["llegamos", "llegar"]], ["Ojalá que ___ buen tiempo mañana. (hacer)", "haga", ["hace", "hacer"]],
    ["Mamá quiere que yo ___ mi cuarto. (limpiar)", "limpie", ["limpio", "limpiar"]], ["Prefiero que ellos ___ aquí. (comer)", "coman", ["comen", "comer"]],
    ["Quiero que tú ___ feliz. (ser)", "seas", ["eres", "ser"]], ["El maestro quiere que nosotros ___ la tarea. (hacer)", "hagamos", ["hacemos", "hacer"]],
    ["Espero que tú me ___ mañana. (llamar)", "llames", ["llamas", "llamar"]], ["Es mejor que él ___ ahora. (salir)", "salga", ["sale", "salir"]]
  ], { h1: "Look for a wish or hope word before <b>que</b>: quiero que, espero que, prefiero que, ojalá que, es importante que.", h2: "After a wish or hope with <b>que</b>, the verb uses the wish form, not the normal one. -ar verbs switch to an <b>e</b> ending. -er and -ir verbs switch to an <b>a</b> ending.",
    h3: "Example: \"Quiero que tú cantes\" (I want you to sing). Cantar is an -ar verb, so tú gets <b>-es</b>. Now do yours.",
    slides: [["Wishes and hopes", "🌠", "When you want, hope or prefer that <b>someone else</b> does something, Spanish uses two parts joined by <b>que</b>."], ["The wish form", "Quiero que tú hables.<br>Espero que ella venga.", "The second verb is in the <b>wish form</b>: <b>hables</b>, not hablas. -ar verbs use <b>e</b>, -er and -ir verbs use <b>a</b>."], ["Wish words", "quiero que · espero que<br>prefiero que · ojalá que<br>es importante que", "Spot these words and you know to use the wish form."]] });

  // vocabulary banks, level 10
  const GEO = SP("Land and maps", [["continente", "continent", "🌍"], ["valle", "valley"], ["costa", "coast"], ["frontera", "border"], ["cueva", "cave"], ["cascada", "waterfall"], ["península", "peninsula"], ["bahía", "bay"], ["puerto", "port", "⚓"], ["glaciar", "glacier", "🧊"]]);
  const SEA = SP("Sea animals", [["ballena", "whale", "🐋"], ["delfín", "dolphin", "🐬"], ["tiburón", "shark", "🦈"], ["pulpo", "octopus", "🐙"], ["medusa", "jellyfish"], ["cangrejo", "crab", "🦀"], ["langosta", "lobster", "🦞"], ["estrella de mar", "starfish"], ["caballito de mar", "seahorse"], ["foca", "seal"]]);
  const ENV = SP("Taking care of Earth", [["reciclar", "to recycle", "♻️"], ["basura", "trash", "🗑️"], ["energía solar", "solar energy", "☀️"], ["contaminación", "pollution"], ["proteger", "to protect"], ["ahorrar agua", "to save water", "💧"], ["reutilizar", "to reuse"], ["apagar la luz", "to turn off the light", "💡"], ["aire limpio", "clean air"], ["plástico", "plastic"]]);
  const COG = SP("Words that look alike", [["nación", "nation"], ["información", "information"], ["estudiante", "student"], ["delicioso", "delicious"], ["famoso", "famous"], ["diferente", "different"], ["importante", "important"], ["fotografía", "photograph", "📷"], ["increíble", "incredible"], ["organizar", "to organize"], ["decidir", "to decide"], ["universidad", "university"]]);
  const CAMP = SP("Camping", [["tienda de campaña", "tent", "⛺"], ["linterna", "flashlight", "🔦"], ["fogata", "campfire", "🔥"], ["saco de dormir", "sleeping bag"], ["sendero", "trail"], ["brújula", "compass", "🧭"], ["binoculares", "binoculars"], ["leña", "firewood"], ["mosquito", "mosquito", "🦟"]]);
  const opposites = RW([
    ["What is the opposite of <b>fácil</b> (easy)?", "difícil", ["rápido", "fuerte"]], ["What is the opposite of <b>rápido</b> (fast)?", "lento", ["ligero", "fuerte"]],
    ["What is the opposite of <b>nuevo</b> (new)?", "viejo", ["lleno", "alto"]], ["What is the opposite of <b>lleno</b> (full)?", "vacío", ["pesado", "nuevo"]],
    ["What is the opposite of <b>fuerte</b> (strong)?", "débil", ["lento", "difícil"]], ["What is the opposite of <b>alto</b> (tall)?", "bajo", ["viejo", "ancho"]],
    ["What is the opposite of <b>ligero</b> (light in weight)?", "pesado", ["vacío", "débil"]], ["What is the opposite of <b>temprano</b> (early)?", "tarde", ["lento", "bajo"]],
    ["What is the opposite of <b>ancho</b> (wide)?", "estrecho", ["pesado", "difícil"]], ["What is the opposite of <b>limpio</b> (clean)?", "sucio", ["lleno", "nuevo"]]
  ], { letter: true, h1: "First say what the word means in English. Then think of the word that means the opposite.", h2: "Think of a pair, like hot and cold or big and small. Which choice makes a pair with the word?",
    h3: "Example: the opposite of <b>grande</b> (big) is <b>pequeño</b> (small). Now find the opposite of yours.",
    slides: [["Opposites", "↔️", "Words with opposite meanings come in pairs. Learning them in pairs makes both easier to remember."], ["Pairs to learn", "fácil ↔ difícil<br>rápido ↔ lento<br>nuevo ↔ viejo<br>lleno ↔ vacío<br>fuerte ↔ débil", "Say each pair out loud. <b>Fácil</b> is easy, <b>difícil</b> is hard."], ["More pairs", "alto ↔ bajo<br>ligero ↔ pesado<br>temprano ↔ tarde<br>ancho ↔ estrecho<br>limpio ↔ sucio", "<b>Alto</b> means tall and <b>bajo</b> means short. Careful: they also describe how a thing is, so they change with <b>-a</b> for girl-words."]] });
  const tanComo = TR([
    ["Ana es tan alta como Luis.", "Ana is as tall as Luis."], ["Mi perro es tan rápido como tu gato.", "My dog is as fast as your cat."], ["Yo tengo tantos libros como tú.", "I have as many books as you."],
    ["Ella come tanta fruta como él.", "She eats as much fruit as he does."], ["Este libro es tan bueno como ese.", "This book is as good as that one."], ["No soy tan viejo como mi abuelo.", "I am not as old as my grandpa."],
    ["Tenemos tantas amigas como ellos.", "We have as many friends as they do."], ["Corro tan rápido como el viento.", "I run as fast as the wind."]
  ], [["Equal things", "🟰", "To say two things are the <b>same</b>, use <b>tan + describing word + como</b>: tan alto como = as tall as."], ["Counting things", "tanto + noun + como", "With nouns, use <b>tanto</b> (as much / as many). It matches the noun: <b>tantos libros</b>, <b>tanta fruta</b>, <b>tantas amigas</b>."], ["No change", "tan alto · tan alta", "<b>Tan</b> never changes. The describing word matches the noun, and <b>como</b> goes at the end: tan alta <b>como</b>."]], "Look for tan, tanto, tanta, tantos or tantas and the word como. What do they mean together?");
  const DIM = [["gato", "gatito", "cat"], ["perro", "perrito", "dog"], ["casa", "casita", "house"], ["libro", "librito", "book"], ["mesa", "mesita", "table"], ["niña", "niñita", "girl"], ["pájaro", "pajarito", "bird"], ["hermana", "hermanita", "sister"], ["plato", "platito", "plate"], ["gata", "gatita", "female cat"], ["abuelo", "abuelito", "grandpa"], ["vaso", "vasito", "glass"]];
  const diminutive = (() => {
    const f = () => {
      const [w, d, en] = pick(DIM), ex = pick(DIM.filter(x => x[0] !== w));
      if (Math.random() < 0.65) return { text: `Make <b>${w}</b> (${en}) into the "little" word with -ito or -ita.`, textInput: true, answer: d,
        hints: ["The ending -ito or -ita makes a word small or cute. -ito goes with el-words and -ita goes with la-words.", "Take off the last letter (-o or -a). Then add <b>-ito</b> if it was -o, or <b>-ita</b> if it was -a.", `Example: ${ex[0]} → ${ex[1]} (the last letter is replaced). Now do yours. (Accents are optional.)`] };
      const wr = shuf(DIM.filter(x => x[1] !== d)).slice(0, 2).map(x => `little ${x[2]}`);
      return { text: `What does <b>${d}</b> mean?`, say: d, lang: "es-ES", choices: shuf([`little ${en}`, ...wr]), answer: `little ${en}`,
        hints: ["The ending -ito or -ita often means little, small or cute.", `Take off -ito or -ita and put an o or a back. That gives the big word, which starts with "${w[0]}".`, `Example: ${ex[1]} means "little ${ex[2]}". Now do yours.`] };
    };
    f.teach = () => S3([["Little words", "🐱 → 🐈", "To make something small, cute or dear, Spanish speakers add <b>-ito</b> or <b>-ita</b>. This is called a <b>diminutive</b>."], ["How to make it", "gato → gatito<br>casa → casita", "Drop the last letter <b>-o</b> or <b>-a</b>, then add <b>-ito</b> or <b>-ita</b>. Boy-words get -ito, girl-words get -ita."], ["Not only size", "abuelo → abuelito", "Diminutives also show love: <b>abuelito</b> is a sweet way to say grandpa. People use them all the time!"]]);
    return f;
  })();
  const isimo = RW([
    ["El elefante es ___ (very, very big).", "grandísimo", ["grandito", "grandísima"]], ["La torre es ___ (very, very tall).", "altísima", ["altísimo", "altita"]],
    ["El pastel está ___ (very, very good).", "buenísimo", ["buenito", "buenísima"]], ["La casa es ___ (very, very pretty).", "bonitísima", ["bonitísimo", "bonitita"]],
    ["El libro es ___ (very, very expensive).", "carísimo", ["carito", "carísima"]], ["La tarea es ___ (very, very easy).", "facilísima", ["facilísimo", "fácilita"]],
    ["El examen es ___ (very, very hard).", "dificilísimo", ["dificilísima", "difícilito"]], ["La sopa está ___ (very, very tasty).", "riquísima", ["riquísimo", "ricasísima"]],
    ["La noche es ___ (very, very dark).", "oscurísima", ["oscurísimo", "oscurita"]], ["El camino es ___ (very, very bad).", "malísimo", ["malito", "malísima"]], ["La niña está ___ (very, very happy).", "felicísima", ["felizísima", "felicita"]]
  ], { h1: "The ending <b>-ísimo</b> means \"very, very\" or \"extremely\". Check if the noun is a boy-word or a girl-word.", h2: "Choose the one that means very very (not little, which is -ito). The ending must match the noun: el-words use -ísimo, la-words use -ísima.",
    h3: "Example: \"El perro es lentísimo\" (very, very slow) and \"La casa es grandísima\" (very, very big). Now do yours.",
    slides: [["Extra strong!", "grande → grandísimo", "To say \"very, very\" or \"extremely\", drop the last vowel of the describing word and add <b>-ísimo</b>."], ["Match the noun", "el libro carísimo<br>la tarea facilísima", "The ending changes: <b>-ísimo</b> for boy-words, <b>-ísima</b> for girl-words. It always has an accent on the í."], ["Small spelling changes", "rico → riquísimo<br>fácil → facilísimo", "Sometimes the spelling changes a little: <b>c → qu</b> in riquísimo, and fácil loses its accent mark."]] });
  const reading10 = RD([
    { t: "Hoy es sábado. Sofía y su hermano van a la playa. Ellos llevan agua, fruta y una pelota. Sofía nada en el mar. Su hermano juega con la pelota en la arena.",
      qs: [["Where do they go?", "to the beach", ["to the park", "to school"], "The place is the second word after \"van a la\"."], ["What day is it?", "Saturday", ["Sunday", "Friday"], "Look at the very first sentence."], ["Who swims in the sea?", "Sofía", ["her brother", "her mom"], "Look for the word nada, which means swims."], ["What does her brother play with?", "a ball", ["a book", "a hat"], "Find the word pelota. It is something round."]] },
    { t: "Mi abuela tiene un jardín muy grande. En el jardín hay flores rojas, árboles y un estanque con peces. Cada mañana mi abuela riega las plantas. A mí me gustaría vivir en una casa con un jardín así.",
      qs: [["Who has a big garden?", "the writer's grandma", ["the writer's mom", "the writer's teacher"], "Find the word abuela. Which family member is it?"], ["What animals are in the pond?", "fish", ["ducks", "frogs"], "The word peces is a plural of a word you learned."], ["What does grandma do every morning?", "she waters the plants", ["she reads a book", "she goes to school"], "Riega las plantas is about giving water."], ["What would the writer like?", "to live in a house with a garden", ["to travel to Spain", "to swim in a pond"], "The writer says me gustaría, which means I would like."]] },
    { t: "Pablo quiere ayudar a la naturaleza. Él recicla papel y botellas. También apaga la luz cuando sale de su cuarto. Dice: «Si todos ayudamos un poco, el planeta será más limpio».",
      qs: [["What does Pablo recycle?", "paper and bottles", ["food and toys", "clothes and shoes"], "Find the verb recicla. What comes right after it?"], ["What does he do when he leaves his room?", "he turns off the light", ["he opens the window", "he closes the door"], "Apaga la luz is in your environment words."], ["What does he say will happen if everyone helps?", "the planet will be cleaner", ["the planet will be bigger", "the room will be warmer"], "Look at the end, after Dice."]] },
    { t: "En el mar hay muchos animales. La ballena es muy grande, pero el delfín es más rápido. El pulpo tiene ocho brazos. Las medusas no tienen huesos.",
      qs: [["Which animal is faster, the whale or the dolphin?", "the dolphin", ["the whale", "the octopus"], "Más rápido means faster. It comes after \"pero\"."], ["How many arms does the octopus have?", "eight", ["six", "ten"], "Find the sentence with pulpo and a number."], ["Which animal is very big?", "the whale", ["the dolphin", "the jellyfish"], "Muy grande means very big."], ["Which animals have no bones?", "jellyfish", ["whales", "dolphins"], "The last sentence says no tienen huesos."]] }
  ], [["Reading in Spanish", "📖", "In this lesson you read a short story in Spanish and answer questions about it in English. Tap 🔊 to hear the story."], ["Reading tips", "🔍", "Do not worry about every word. Find the words you know first. Then use them to understand the rest."], ["Find the clue", "❓", "Read the question first, then go back to the story and look for the part that answers it."]]);

  const wouldLike = TR([
    ["Me gustaría viajar.", "I would like to travel."], ["¿Podrías ayudarme?", "Could you help me?"], ["Yo comería pizza.", "I would eat pizza."], ["Tendríamos más tiempo.", "We would have more time."],
    ["Ellos vivirían en la playa.", "They would live at the beach."], ["¿Te gustaría bailar?", "Would you like to dance?"], ["Yo no diría eso.", "I would not say that."], ["Sería muy divertido.", "It would be very fun."],
    ["Querría un jugo, por favor.", "I would like a juice, please."], ["Ella viajaría a España.", "She would travel to Spain."]
  ], [["Would", "💭", "The conditional says what <b>would</b> happen or what someone <b>would</b> do: <b>comería</b> = I would eat."], ["Polite words", "Me gustaría… · ¿Podrías…?", "<b>Me gustaría</b> (I would like) and <b>¿Podrías…?</b> (Could you…?) sound more polite than <b>quiero</b> and <b>¿puedes…?</b>."], ["Be polite", "🙏", "Use the conditional to ask for things nicely, like <b>Querría un jugo, por favor</b>."]],
    "Look for the endings -ía, -ías, -íamos or -ían. They tell you the sentence is about what someone would do.");

  // ---------- LEVEL 11 data ----------
  const PLUP = [had("hablar", "to speak", "hablado"), had("comer", "to eat", "comido"), had("vivir", "to live", "vivido"), had("escribir", "to write", "escrito", "The done word of this verb is special."),
    had("hacer", "to do", "hecho", "The done word of this verb is special."), had("ver", "to see", "visto", "The done word of this verb is special."), had("abrir", "to open", "abierto", "The done word of this verb is special."), had("decir", "to say", "dicho", "The done word of this verb is special.")];
  const HAD_RULE = {
    yo: "For <b>yo</b>, the helper word is <b>había</b>. Then add the done word (like hablado).",
    "tú": "For <b>tú</b>, the helper word is the yo helper plus an <b>-s</b>.", "él": "For <b>él / ella</b>, the helper word is the same as for yo.",
    nosotros: "For <b>nosotros</b>, the helper word ends in <b>-mos</b>.", ellos: "For <b>ellos</b>, the helper word ends in <b>-n</b>."
  };
  const pluperfect = CJ({ verbs: PLUP, rule: HAD_RULE, mc: true, tag: "had done", title: "Helper + done word", pat: "había + hablado<br>habías + comido<br>habíamos + vivido",
    t1: "<b>Tap a line to hear it.</b> This is the <b>past perfect</b>. It tells what someone <b>had</b> already done before something else.",
    t2: "Use the helper word <b>había, habías, había, habíamos, habían</b> and the <b>done word</b> (hablado, comido, vivido). The done word never changes." });
  const PROG = [was("hablar", "to speak", "hablando"), was("comer", "to eat", "comiendo"), was("vivir", "to live", "viviendo"), was("leer", "to read", "leyendo", "The -ing word of this verb has a spelling change."),
    was("dormir", "to sleep", "durmiendo", "The -ing word of this verb has a vowel change."), was("escribir", "to write", "escribiendo"), was("jugar", "to play", "jugando"), was("trabajar", "to work", "trabajando")];
  const WAS_RULE = {
    yo: "For <b>yo</b>, the helper word is <b>estaba</b>. Then add the -ing word (like hablando).", "tú": "For <b>tú</b>, the helper word is the yo helper plus an <b>-s</b>.",
    "él": "For <b>él / ella</b>, the helper word is the same as for yo.", nosotros: "For <b>nosotros</b>, the helper word ends in <b>-mos</b> and has an accent mark.", ellos: "For <b>ellos</b>, the helper word ends in <b>-n</b>."
  };
  const pastProg = CJ({ verbs: PROG, rule: WAS_RULE, mc: true, tag: "was doing", title: "Was doing", pat: "estaba + hablando<br>estabas + comiendo<br>estábamos + viviendo",
    t1: "<b>Tap a line to hear it.</b> This tells what someone <b>was doing</b> at a moment in the past.",
    t2: "Use <b>estaba, estabas, estaba, estábamos, estaban</b> with the -ing word (-ando for -ar verbs, -iendo for -er and -ir verbs). The -ing word never changes." });
  const seRule = RW([
    ["I give the book to Ana: <b>Le doy el libro</b> → ___ doy.", "Se lo", ["Le lo", "Lo se"]], ["I tell the story to them: <b>Les cuento la historia</b> → ___ cuento.", "Se la", ["Les la", "La se"]],
    ["I send the letters to him: <b>Le envío las cartas</b> → ___ envío.", "Se las", ["Le las", "Las se"]], ["I lend the pencil to you: <b>Te presto el lápiz</b> → ___ presto.", "Te lo", ["Se lo", "Lo te"]],
    ["They give the flowers to us: <b>Nos dan las flores</b> → ___ dan.", "Nos las", ["Se las", "Las nos"]], ["I show the photo to her: <b>Le muestro la foto</b> → ___ muestro.", "Se la", ["Le la", "La se"]],
    ["I read the books to them: <b>Les leo los libros</b> → ___ leo.", "Se los", ["Les los", "Los se"]], ["She brings the juice to me: <b>Me trae el jugo</b> → ___ trae.", "Me lo", ["Se lo", "Lo me"]]
  ], { h1: "The little word for \"it / them\" (lo, la, los, las) matches the thing you are giving. Find that thing first.", h2: "Order: the person word comes first, then lo / la / los / las. But le and les change to <b>se</b> before lo, la, los, las.",
    h3: "Example: \"Le doy la carta\" becomes \"Se la doy\" (le → se, and la matches carta). Now do yours.",
    slides: [["Two little words", "Te lo doy.", "You can replace both the person and the thing: <b>Te lo doy</b> = I give it to you. The person word comes first, then <b>lo, la, los, las</b>."], ["Le becomes se", "Le + lo → <b>Se lo</b>", "<b>Le</b> and <b>les</b> cannot stand before lo, la, los or las. They change to <b>se</b>: <b>Se lo doy</b> = I give it to him / her / them."], ["Match the thing", "lo · la · los · las", "<b>Lo / la / los / las</b> match the thing: el libro → lo, la carta → la, los libros → los, las flores → las."]] });
  const seTr = TR([
    ["Te lo doy.", "I give it to you."], ["Me lo dices.", "You tell it to me."], ["Se lo envío a ella.", "I send it to her."], ["Nos la compran.", "They buy it for us."],
    ["Ella me las trae.", "She brings them to me."], ["Se lo explico a él.", "I explain it to him."], ["Te los presto.", "I lend them to you."], ["Mamá nos lo cocina.", "Mom cooks it for us."]
  ], [["Two little words", "Te lo doy.", "You can replace both the person and the thing: <b>Te lo doy</b> = I give it to you."]]);
  seTr.teach = seRule.teach;
  const seLo = (() => { const f = () => pick([seRule, seTr, seRule])(); f.teach = seRule.teach; return f; })();
  const conmigo = RW([
    ["Ana viene ___. (with me)", "conmigo", ["contigo", "con mí"]], ["Quiero ir ___. (with you, tú)", "contigo", ["conmigo", "con ti"]], ["Este regalo es ___. (for me)", "para mí", ["para yo", "para me"]],
    ["Esto es para ___. (you, tú)", "ti", ["tú", "te"]], ["Hablan de ___. (him)", "él", ["lo", "su"]], ["Voy ___. (with her)", "con ella", ["con la", "con le"]],
    ["No puedo vivir sin ___. (you, tú)", "ti", ["tú", "te"]], ["¿Quieres jugar ___? (with me)", "conmigo", ["contigo", "con yo"]], ["La carta es para ___. (us)", "nosotros", ["nos", "nuestro"]]
  ], { h1: "Find who the word stands for, and check if there is a little word like con, para, de or sin before it.", h2: "After most little words (para, de, sin) use mí and ti for \"me\" and \"you\". But with <b>con</b>, those two words join with it and become one special word each.",
    h3: "Example: \"Ella baila conmigo\" (with me) and \"El regalo es para ti\" (for you). Now do yours.",
    slides: [["With me, with you", "conmigo · contigo", "<b>Conmigo</b> means with me. <b>Contigo</b> means with you. They are special single words."], ["After little words", "para mí · para ti", "After words like <b>para, de, sin, por</b>, use <b>mí</b> (me) and <b>ti</b> (you): para mí, sin ti."], ["The others stay", "él · ella · nosotros", "For he, she, we and they, the normal word is used: con <b>ella</b>, para <b>nosotros</b>, de <b>él</b>."]] });
  const seHabla = RW([
    ["Aquí ___ español. (Spanish is spoken)", "se habla", ["se hablan", "habla"]], ["Las puertas ___ a las nueve. (are opened)", "se abren", ["se abre", "abren"]],
    ["En México ___ tacos. (tacos are eaten)", "se comen", ["se come", "comen"]], ["Aquí ___ zapatos. (shoes are sold)", "se venden", ["se vende", "venden"]],
    ["¿Cómo ___ esto en español? (is it said)", "se dice", ["se dicen", "dice"]], ["En esta escuela ___ mucho. (one studies a lot)", "se estudia", ["se estudian", "estudia"]],
    ["___ casas nuevas aquí. (new houses are sold)", "Se venden", ["Se vende", "Venden"]], ["En la biblioteca ___ libros. (books are read)", "se leen", ["se lee", "leen"]]
  ], { h1: "Here the doer is not important. The sentence tells what is done, like \"Spanish is spoken here.\" Is the thing that is done one or many?", h2: "Use <b>se</b> plus the verb. The verb matches the thing: one thing → the él form, many things → the ellos form.",
    h3: "Example: \"Se cierra la tienda\" (the store is closed, one thing) and \"Se cierran las tiendas\" (the stores are closed, many things). Now do yours.",
    slides: [["Se: no doer", "Aquí se habla español.", "When we do not say <b>who</b> does the action, Spanish uses <b>se</b> + the verb. <b>Se habla español</b> = Spanish is spoken."], ["Match the thing", "Se vende casa<br>Se venden casas", "The verb matches the thing, not a person: one thing → <b>se vende</b>, many things → <b>se venden</b>."], ["Everywhere", "Se prohíbe correr aquí.", "You see this on signs, in recipes and in rules. <b>Se</b> + verb is a handy way to speak about what people usually do."]] });
  const queRel = RW([
    ["El libro ___ leo es divertido.", "que", ["quien", "donde"]], ["La niña con ___ juego es mi amiga.", "quien", ["que", "donde"]], ["Esta es la casa ___ vivo.", "donde", ["quien", "que"]],
    ["La chica ___ canta es famosa.", "que", ["donde", "quienes"]], ["Esa es la escuela ___ estudio.", "donde", ["que", "quien"]], ["Los niños con ___ juego son simpáticos.", "quienes", ["que", "donde"]],
    ["El perro ___ ladra es mío.", "que", ["donde", "quien"]], ["El parque ___ juego es grande.", "donde", ["quien", "que"]]
  ], { h1: "The missing word joins two parts of a sentence. Ask what it points back to: a thing, a person after a little word, or a place?", h2: "<b>Que</b> = that / who / which (things and people). <b>Quien</b> = who (people, mostly after a little word like con or a). <b>Donde</b> = where (places).",
    h3: "Example: \"La ciudad donde nací es grande\" (a place) and \"El amigo con quien hablo\" (a person after con). Now do yours.",
    slides: [["Joining with que", "El libro <b>que</b> leo", "<b>Que</b> joins a thing or person to more information: the book <b>that</b> I read."], ["Quien and donde", "con <b>quien</b> · <b>donde</b>", "<b>Quien</b> means who and is used for people (<b>quienes</b> for many people). <b>Donde</b> means where and is used for places."], ["Quick check", "🔍", "Is it a place? Use <b>donde</b>. Is it a person after con, a or de? Use <b>quien</b>. Otherwise <b>que</b> almost always works."]] });
  const posesivo = RW([
    ["Este lápiz es ___. (mine)", "mío", ["mía", "míos"]], ["Esa mochila es ___. (yours, tú)", "tuya", ["tuyo", "tuyas"]], ["Las casas son ___. (ours)", "nuestras", ["nuestros", "nuestra"]],
    ["El perro es ___. (his)", "suyo", ["suya", "suyos"]], ["Los libros son ___. (mine)", "míos", ["mío", "mías"]], ["La bicicleta es ___. (mine)", "mía", ["mío", "mías"]],
    ["Los zapatos son ___. (yours, tú)", "tuyos", ["tuyo", "tuyas"]], ["El jardín es ___. (ours)", "nuestro", ["nuestra", "nuestros"]], ["La casa es ___. (hers)", "suya", ["suyo", "suyas"]], ["Las mochilas son ___. (mine)", "mías", ["míos", "mía"]]
  ], { h1: "Say who owns it in English. Then look at the thing owned: is it a boy-word or a girl-word, one or many?", h2: "The word matches the <b>thing owned</b>: boy-word singular -o, girl-word singular -a, many boy-words -os, many girl-words -as.",
    h3: "Example: \"El coche es tuyo\" (the car is yours) and \"Las flores son nuestras\" (the flowers are ours). Now do yours.",
    slides: [["It is mine!", "mío · tuyo · suyo · nuestro", "To say something belongs to someone, use <b>mío</b> (mine), <b>tuyo</b> (yours), <b>suyo</b> (his / hers) and <b>nuestro</b> (ours)."], ["Match the thing", "mío · mía · míos · mías", "These words change like other describing words: <b>el libro es mío</b>, <b>la casa es mía</b>, <b>los libros son míos</b>, <b>las casas son mías</b>."], ["Not the owner", "🎯", "The ending depends on what is owned, not on who owns it. A girl says <b>el libro es mío</b> too, because libro is a boy-word."]] });
  const startTr = TR([
    ["Empiezo a leer.", "I begin to read."], ["Vuelvo a llamar.", "I call again."], ["Dejo de correr.", "I stop running."], ["Aprendemos a nadar.", "We learn to swim."],
    ["Ella termina de comer.", "She finishes eating."], ["Ayudo a mi mamá a cocinar.", "I help my mom cook."], ["Tratan de ganar.", "They try to win."], ["Él empieza a cantar.", "He starts to sing."], ["Ella vuelve a jugar.", "She plays again."]
  ], [["Verb + little word", "empezar <b>a</b> + verb", "Some verbs need a little word before the next verb: <b>empezar a</b> (to begin to), <b>aprender a</b> (to learn to), <b>volver a</b> (to do again)."], ["Other little words", "dejar <b>de</b> · terminar <b>de</b> · tratar <b>de</b>", "<b>Dejar de</b> means to stop. <b>Terminar de</b> means to finish. <b>Tratar de</b> means to try to."], ["Learn them together", "🧩", "Learn the verb and its little word as a pair. After the little word, the next verb stays in the infinitive (-ar, -er, -ir)."]],
    "Look for the little word (a or de) after the first verb. It changes what the pair means.");
  const OFTEN = SP("How often?", [["a menudo", "often"], ["casi nunca", "almost never"], ["casi siempre", "almost always"], ["de vez en cuando", "once in a while"], ["muchas veces", "many times"], ["rara vez", "rarely"], ["todos los días", "every day", "📅"], ["una vez por semana", "once a week"], ["cada año", "every year"], ["dos veces al mes", "twice a month"]]);
  const haceAgo = RW([
    ["What does <b>hace tres días</b> mean?", "three days ago", ["in three days", "for three days"]], ["What does <b>hace una semana</b> mean?", "a week ago", ["in a week", "for a week"]],
    ["What does <b>hace dos meses</b> mean?", "two months ago", ["in two months", "for two months"]], ["What does <b>hace cinco años</b> mean?", "five years ago", ["in five years", "for five years"]],
    ["What does <b>hace una hora</b> mean?", "an hour ago", ["in an hour", "for an hour"]], ["What does <b>hace diez minutos</b> mean?", "ten minutes ago", ["in ten minutes", "for ten minutes"]],
    ["What does <b>Llegué hace un mes</b> mean?", "I arrived a month ago.", ["I will arrive in a month.", "I arrive every month."]], ["What does <b>Aprendí a nadar hace dos años</b> mean?", "I learned to swim two years ago.", ["I will learn to swim in two years.", "I have swum for two years."]]
  ], { h1: "In this lesson <b>hace</b> is not \"makes\" or \"does\". Look at the time word after it.", h2: "<b>Hace</b> + a length of time looks <b>back</b> from now. It answers \"how long ago?\". The verb is usually in the past.",
    h3: "Example: \"hace dos horas\" = two hours ago, and \"hace un año\" = a year ago. Now do yours.",
    slides: [["Hace = ago", "hace dos días", "To say how long <b>ago</b> something happened, use <b>hace</b> + the time: <b>hace dos días</b> = two days ago."], ["In a sentence", word("Llegué hace una hora.", "I arrived an hour ago."), "You can put it at the start or the end: <b>Hace una hora llegué</b> or <b>Llegué hace una hora</b>."], ["Not the same", "hace ≠ en", "<b>Hace</b> looks back (ago). To say \"in three days\" (the future) Spanish uses <b>en tres días</b>."]] });
  const ACC_NEED = [["cancion", "canción"], ["arbol", "árbol"], ["telefono", "teléfono"], ["lapiz", "lápiz"], ["musica", "música"], ["cafe", "café"], ["azucar", "azúcar"], ["facil", "fácil"], ["medico", "médico"], ["jamas", "jamás"], ["tambien", "también"], ["leccion", "lección"]];
  const ACC_NO = ["mesa", "libro", "gato", "zapato", "amigo", "naranja", "perro", "flores", "lunes", "escuela", "ventana", "hablan"];
  const ACC_H = ["Say the word out loud. Which part do you say the loudest?", "Rule: if the word ends in a vowel, n or s, the loud part is usually the second-to-last part, and no mark is needed. A word needs a mark when it breaks that pattern.",
    "Example: \"pelota\" (pe-LO-ta) ends in a vowel and is loud on the second-to-last part, so no mark. \"balcón\" (bal-CÓN) is loud on the last part but ends in n, so it needs a mark."];
  const accents = (() => {
    const f = () => {
      if (Math.random() < 0.5) {
        const need = Math.random() < 0.5, [p] = pick(ACC_NEED), w = need ? p : pick(ACC_NO);
        return { text: `Does the word <b>${w}</b> need an accent mark when you write it correctly?`, choices: ["Yes", "No"], answer: need ? "Yes" : "No", hints: ACC_H };
      }
      const [p] = pick(ACC_NEED);
      return { text: "Which of these words needs an accent mark when you write it correctly?", choices: shuf([p, ...shuf(ACC_NO).slice(0, 2)]), answer: p, hints: ACC_H };
    };
    f.teach = () => S3([["Accent marks", "á é í ó ú", "An accent mark (´) shows which part of a word you say the loudest. It is not just decoration: it can change the meaning, like <b>papa</b> (potato) and <b>papá</b> (dad)."], ["The usual pattern", "ca-sa · li-bro · há-blan", "Words that end in a <b>vowel, n or s</b> are usually loud on the <b>second-to-last</b> part. They need no mark: <b>casa, libro, hablan, lunes</b>."], ["Breaking the pattern", "can-<b>CIÓN</b> · <b>ÁR</b>-bol", "If the loud part is <b>not</b> where the pattern says, you write the mark: <b>canción</b> (loud at the end, ends in n), <b>árbol</b> (loud at the start, ends in l). Words like <b>teléfono</b> and <b>música</b>, loud on the third-from-last part, always need a mark."]]);
    return f;
  })();
  const FEEL2 = SP("Big feelings", [["orgulloso", "proud"], ["nervioso", "nervous"], ["aburrido", "bored"], ["emocionado", "excited"], ["celoso", "jealous"], ["avergonzado", "embarrassed"], ["preocupado", "worried"], ["confundido", "confused"], ["agradecido", "thankful"], ["decepcionado", "disappointed"]]);
  const SCI = SP("In the science lab", [["microscopio", "microscope", "🔬"], ["experimento", "experiment", "🧪"], ["célula", "cell"], ["imán", "magnet", "🧲"], ["termómetro", "thermometer", "🌡️"], ["hipótesis", "hypothesis"], ["resultado", "result"], ["átomo", "atom"], ["laboratorio", "laboratory"]]);
  const BOOK = SP("Stories and books", [["personaje", "character"], ["autor", "author"], ["capítulo", "chapter"], ["poema", "poem"], ["título", "title"], ["aventura", "adventure"], ["ilustración", "illustration"], ["diccionario", "dictionary", "📚"], ["novela", "novel"], ["fábula", "fable"]]);
  const HIST = SP("Long ago", [["explorador", "explorer"], ["tesoro", "treasure", "💎"], ["castillo", "castle", "🏰"], ["pirámide", "pyramid"], ["imperio", "empire"], ["rey", "king", "👑"], ["reina", "queen"], ["antiguo", "ancient"], ["esqueleto", "skeleton"], ["mapa del tesoro", "treasure map", "🗺️"]]);
  const culture11 = RW([
    ["La Alhambra, a famous palace in Granada, is in which country?", "España", ["México", "Perú"], "Granada is a city in Europe."], ["Tikal, an ancient Maya city in the rainforest, is in which country?", "Guatemala", ["Cuba", "Chile"], "It is in Central America, just south of Mexico."],
    ["Pupusas, corn cakes filled with cheese, are the national dish of which country?", "El Salvador", ["Argentina", "España"], "It is a small country in Central America, on the Pacific coast."], ["Which country is home to the Panama Canal?", "Panamá", ["Chile", "Uruguay"], "The canal joins two oceans, in Central America."],
    ["Mariachi music comes from which country?", "México", ["Chile", "España"], "It is in North America."], ["The Salar de Uyuni, the world's biggest salt flat, is in which country?", "Bolivia", ["Cuba", "España"], "It is high in the Andes, in South America."],
    ["Piñatas full of candy are a popular party tradition in which country?", "México", ["Japón", "Egipto"], "It is a country where Spanish is spoken, in North America."], ["Don Quijote, a famous hero of a book, was created by a writer from which country?", "España", ["México", "Argentina"], "Think of Europe."],
    ["The Atacama, one of the driest deserts in the world, is in which country?", "Chile", ["Cuba", "España"], "It is a long, thin country between the Andes and the Pacific Ocean."], ["Angel Falls, the tallest waterfall in the world, is in which country?", "Venezuela", ["Costa Rica", "Paraguay"], "It is in the north of South America."]
  ], { h1: "Picture a world map. Which part of the world is it from: Europe, North America, Central America or South America?", h2: "Use what you know about the Spanish-speaking world.",
    h3: "Example: Machu Picchu is in Perú, in South America. Use your map to place yours.",
    slides: [["Wonders of the Spanish-speaking world", "🌎", "Spanish-speaking countries have amazing places, music and food. Some are very old, some are natural wonders."], ["Famous places", "Alhambra · Tikal · Atacama", "The <b>Alhambra</b> is a palace in España. <b>Tikal</b> is a Maya city in Guatemala. The <b>Atacama</b> desert is in Chile. <b>Angel Falls</b> is in Venezuela."], ["Culture", "🎶🌽🎉", "<b>Mariachi</b> music and <b>piñatas</b> are from México. <b>Pupusas</b> are from El Salvador. The <b>Panama Canal</b> is in Panamá."]] });
  const reading11 = RD([
    { t: "Ayer fui al museo con mi clase. Primero vimos esqueletos de dinosaurios. Después comimos en el patio. Antes de volver a la escuela, compré un libro sobre el espacio. Había aprendido mucho y estaba muy contento.",
      qs: [["Where did the class go?", "to a museum", ["to the zoo", "to the library"], "Find the word museo in the first sentence."], ["What did they see first?", "dinosaur skeletons", ["paintings", "planets"], "Primero means first."], ["Where did they eat?", "in the courtyard", ["at school", "on the bus"], "Find the word comimos. What place comes after it?"], ["What did the writer buy?", "a book about space", ["a toy dinosaur", "a map"], "Find compré, which means I bought."], ["How did the writer feel at the end?", "happy", ["tired", "scared"], "Contento is a feeling word, like feliz."]] },
    { t: "Los exploradores llegaron a la isla en un barco pequeño. Buscaban un tesoro antiguo. Caminaron por la selva durante tres días. Cuando encontraron una caja vieja, la abrieron con cuidado. Dentro había mapas y libros, no oro. Todos estaban felices porque habían descubierto algo importante.",
      qs: [["How did the explorers arrive?", "in a small boat", ["by plane", "on a bus"], "Find barco and its describing word."], ["What were they looking for?", "an old treasure", ["a new house", "a dog"], "Buscaban means they were looking for."], ["How long did they walk?", "three days", ["two weeks", "one hour"], "Find durante, which means for (a length of time)."], ["What was inside the box?", "maps and books", ["gold", "food"], "After dentro había look at what was there, and what was not."], ["Why were they happy?", "they had discovered something important", ["they found gold", "they saw a dolphin"], "Look at the last sentence, after porque."]] },
    { t: "Mi tía vive en Quito, la capital de Ecuador. Es una ciudad alta, entre montañas. Hace fresco casi todo el año. Mi tía trabaja en una escuela y habla español e inglés. Algún día quiero visitarla.",
      qs: [["Where does the aunt live?", "in Quito", ["in Lima", "in Madrid"], "It is after \"vive en\"."], ["Quito is the capital of which country?", "Ecuador", ["Perú", "Chile"], "Look for the word capital."], ["What is the weather like?", "cool", ["very hot", "snowy"], "Hace fresco is about the weather."], ["Where does the aunt work?", "at a school", ["at a hospital", "at a store"], "Find trabaja."], ["What does the writer want to do someday?", "visit her", ["live in a school", "learn Italian"], "Quiero visitarla means I want to visit her."]] },
    { t: "Laura practica el piano todos los días. Quiere que su familia escuche un concierto. El sábado, toca tres canciones. Su abuelo llora de alegría y dice: «¡Estoy muy orgulloso de ti!».",
      qs: [["Which instrument does Laura play?", "the piano", ["the guitar", "the violin"], "Find the word after practica."], ["How often does she practice?", "every day", ["once a week", "never"], "Todos los días is in the first sentence."], ["What does she play on Saturday?", "three songs", ["one song", "a game"], "Toca means plays, canciones are songs."], ["How does her grandfather feel?", "proud", ["bored", "angry"], "Look at what he says: orgulloso."]] }
  ], [["Reading in Spanish", "📖", "In this lesson you read a short story in Spanish and answer questions in English. Tap 🔊 to hear the story."], ["Past and future", "ayer · mañana", "Many stories tell what happened. Look for words like <b>ayer</b> (yesterday), <b>primero</b> (first) and <b>después</b> (afterwards)."], ["Find the clue", "❓", "Read the question first, then go back to the story and look for the part that answers it."]]);

  // ---------- LEVEL 10 and 11 lesson lists ----------
  const typ10 = TYE([].concat(GEO.items, SEA.items, ENV.items, COG.items, CAMP.items), "land and maps, sea animals, the Earth, look-alike words and camping");
  const typ11 = TYE([].concat(FEEL2.items, SCI.items, BOOK.items, HIST.items), "big feelings, the science lab, books and long ago");
  const L10 = [
    XL("The conditional", condRegular), XL("Special conditional verbs", condSpecial), XL("I would like...", wouldLike),
    XL("Wish form: -ar verbs", subAr), XL("Wish form: -er and -ir verbs", subEr), XL("Five special wish verbs", subSpecial),
    XL("Wishes and hopes", wishes), XL("Land and maps", V(GEO)), XL("Sea animals", V(SEA)),
    XL("Taking care of Earth", V(ENV)), XL("More opposites", opposites), XL("As ... as", tanComo),
    XL("Little words with -ito", diminutive), XL("Very, very with -ísimo", isimo), XL("Words that look alike", V(COG, "Many Spanish and English words have the same Latin roots. Look for the endings: -ción is -tion, -ante is -ant, -oso is -ous.")),
    XL("Camping", V(CAMP)), XL("Reading in Spanish", reading10), XL("Type it in Spanish", typ10),
    XL("Mixed practice", MIX([condRegular, condSpecial, subAr, subEr, wishes, V(SEA)])),
    XL("Level 10 Challenge", MIX([condRegular, condSpecial, wouldLike, subAr, subEr, subSpecial, wishes, opposites, tanComo, diminutive, isimo, V(GEO), V(ENV), V(COG), reading10, typ10]))
  ];
  const L11 = [
    XL("Had done: the past perfect", pluperfect), XL("Was doing", pastProg), XL("Se lo doy", seLo), XL("Conmigo, contigo, para mí", conmigo),
    XL("Se habla español", seHabla), XL("Que, quien, donde", queRel), XL("Mine, yours, ours", posesivo), XL("Begin to, stop, try to", startTr),
    XL("How often?", V(OFTEN)), XL("Hace: ago", haceAgo), XL("Accent marks", accents), XL("Big feelings", V(FEEL2)),
    XL("In the science lab", V(SCI)), XL("Stories and books", V(BOOK)), XL("Long ago", V(HIST)), XL("Wonders of the Spanish world", culture11),
    XL("Type it in Spanish", typ11), XL("A story in Spanish", reading11),
    XL("Mixed practice", MIX([pluperfect, pastProg, seLo, conmigo, accents, V(SCI)])),
    XL("Level 11 Challenge", MIX([pluperfect, pastProg, seLo, conmigo, seHabla, queRel, posesivo, startTr, haceAgo, accents, V(FEEL2), V(BOOK), V(HIST), culture11, reading11, typ11]))
  ];

  // ---------- LEVEL 12 data ----------
  const doubt = RW([
    ["Dudo que tú ___ la respuesta. (saber)", "sepas", ["sabes", "saber"]], ["Creo que él ___ en casa. (estar)", "está", ["esté", "estar"]], ["Me alegro de que ellos ___ aquí. (estar)", "estén", ["están", "estar"]],
    ["Sé que ella ___ inglés. (hablar)", "habla", ["hable", "hablar"]], ["No creo que nosotros ___ tiempo. (tener)", "tengamos", ["tenemos", "tener"]], ["Es verdad que tú ___ muy rápido. (correr)", "corres", ["corras", "correr"]],
    ["Siento que tú ___ enfermo. (estar)", "estés", ["estás", "estar"]], ["Es cierto que ellos ___ buenos. (ser)", "son", ["sean", "ser"]], ["Me alegra que tú ___ aquí. (vivir)", "vivas", ["vives", "vivir"]],
    ["Estoy seguro de que ella ___ la verdad. (decir)", "dice", ["diga", "decir"]]
  ], { h1: "Look at the first part. Is it a doubt or a feeling (dudo que, no creo que, me alegro de que), or is it something sure (creo que, sé que, es verdad que)?", h2: "Doubts, feelings and wishes use the <b>wish form</b> (subjunctive). Things you are sure of use the normal verb (indicative).",
    h3: "Example: \"Dudo que ella venga\" (doubt → wish form) and \"Sé que ella viene\" (sure → normal form). Now do yours.",
    slides: [["Sure or not sure?", "Sé que… / Dudo que…", "After words that show <b>certainty</b> (creo que, sé que, es verdad que) use the <b>normal</b> verb. After <b>doubt</b> or <b>feelings</b> use the <b>wish form</b>."], ["Doubt and feelings", "Dudo que tú sepas.<br>Me alegro de que estén aquí.", "<b>Dudo que, no creo que, me alegro de que, siento que</b> and <b>es posible que</b> are followed by the wish form."], ["Certain", "Creo que él está en casa.<br>Sé que ella habla inglés.", "<b>Creo que, sé que, es verdad que</b> and <b>estoy seguro de que</b> are followed by the normal verb. Watch out: <b>no creo que</b> (I don't think) is a doubt!"]] });
  const SP_VERBS = [
    vb("buscar", "to look for", "busque,busques,busque,busquemos,busquen", "Spelling change: <b>c → qu</b> before e."), vb("pagar", "to pay", "pague,pagues,pague,paguemos,paguen", "Spelling change: <b>g → gu</b> before e."),
    vb("llegar", "to arrive", "llegue,llegues,llegue,lleguemos,lleguen", "Spelling change: <b>g → gu</b> before e."), vb("tocar", "to touch, to play", "toque,toques,toque,toquemos,toquen", "Spelling change: <b>c → qu</b> before e."),
    vb("sacar", "to take out", "saque,saques,saque,saquemos,saquen", "Spelling change: <b>c → qu</b> before e."), vb("practicar", "to practice", "practique,practiques,practique,practiquemos,practiquen", "Spelling change: <b>c → qu</b> before e."),
    vb("cruzar", "to cross", "cruce,cruces,cruce,crucemos,crucen", "Spelling change: <b>z → c</b> before e."), vb("explicar", "to explain", "explique,expliques,explique,expliquemos,expliquen", "Spelling change: <b>c → qu</b> before e.")
  ];
  const RULE_SP = {
    yo: "These are -ar verbs: yo gets <b>-e</b> after the spelling change.", "tú": "These are -ar verbs: tú gets <b>-es</b> after the spelling change.", "él": "These are -ar verbs: él / ella gets <b>-e</b> after the spelling change.",
    nosotros: "These are -ar verbs: nosotros gets <b>-emos</b> after the spelling change.", ellos: "These are -ar verbs: ellos gets <b>-en</b> after the spelling change."
  };
  const subSpell = CJ({ verbs: SP_VERBS, rule: RULE_SP, pre: SUBPRE, title: "Keep the sound", pat: "buscar → busque<br>pagar → pague<br>cruzar → cruce",
    t1: "<b>Tap a line to hear it.</b> The -e ending of the wish form would change the sound of some letters, so the spelling changes to keep the sound.",
    t2: "Before <b>e</b>: <b>c → qu</b> (buscar → busque), <b>g → gu</b> (pagar → pague), <b>z → c</b> (cruzar → cruce). This keeps the same sound as in the infinitive." });
  const ST_VERBS = [
    vb("pensar", "to think", "piense,pienses,piense,pensemos,piensen", "Nosotros keeps the plain stem. The others change <b>e → ie</b>."), vb("volver", "to return", "vuelva,vuelvas,vuelva,volvamos,vuelvan", "Nosotros keeps the plain stem. The others change <b>o → ue</b>."),
    vb("dormir", "to sleep", "duerma,duermas,duerma,durmamos,duerman", "The others change <b>o → ue</b>. The nosotros form changes <b>o → u</b>."), vb("pedir", "to ask for", "pida,pidas,pida,pidamos,pidan", "All five persons change <b>e → i</b>."),
    vb("querer", "to want", "quiera,quieras,quiera,queramos,quieran", "Nosotros keeps the plain stem. The others change <b>e → ie</b>."), vb("poder", "to be able", "pueda,puedas,pueda,podamos,puedan", "Nosotros keeps the plain stem. The others change <b>o → ue</b>."),
    vb("empezar", "to begin", "empiece,empieces,empiece,empecemos,empiecen", "Nosotros keeps the plain stem (with z → c). The others change <b>e → ie</b>."), vb("contar", "to count, to tell", "cuente,cuentes,cuente,contemos,cuenten", "Nosotros keeps the plain stem. The others change <b>o → ue</b>.")
  ];
  const subStem = CJ({ verbs: ST_VERBS, rule: SUBRULE, pre: SUBPRE, title: "Boot verbs again", pat: "pensar → piense<br>volver → vuelva<br>dormir → duerma, durmamos",
    t1: "<b>Tap a line to hear it.</b> Boot verbs keep their vowel change in the wish form, but not in the nosotros form (except -ir verbs).",
    t2: "Draw the boot: yo, tú, él and ellos change the vowel in the stem. Nosotros stays plain. For -ir verbs like <b>dormir</b> and <b>pedir</b>, nosotros also changes (<b>durmamos, pidamos</b>)." });
  const NEG = [
    ["hablar", "speak", "hables", "habla", "hablas"], ["comer", "eat", "comas", "come", "comes"], ["escribir", "write", "escribas", "escribe", "escribes"], ["abrir", "open", "abras", "abre", "abres"],
    ["pagar", "pay", "pagues", "paga", "pagas", "The g becomes gu before e."], ["ir", "go", "vayas", "ve", "vas", "Ir is special: the wish form starts with <b>vay-</b>."], ["ser", "be", "seas", "sé", "eres", "Ser is special: the wish form starts with <b>se-</b>."],
    ["hacer", "do", "hagas", "haz", "haces", "The yo form is hago, so keep the g."], ["decir", "say", "digas", "di", "dices", "The yo form is digo, so keep the g."], ["poner", "put", "pongas", "pon", "pones", "The yo form is pongo, so keep the g."],
    ["correr", "run", "corras", "corre", "corres"], ["saltar", "jump", "saltes", "salta", "saltas"]
  ];
  const negCmd = (() => {
    const f = () => {
      const [inf, en, neg, aff, ind, clue] = pick(NEG);
      return { text: `Tell a friend NOT to ${en}: <b>No ___</b> (${inf})`, choices: shuf([neg, aff, ind]), answer: neg,
        hints: ["To tell a friend NOT to do something, use the wish form for tú. It is not the same as the friendly command that says to do it.", clue || "Take the yo form, drop the -o, and switch the vowel: -ar verbs get <b>-es</b>, -er and -ir verbs get <b>-as</b>.",
          "Example: cantar → \"¡Canta!\" (do it) but \"¡No cantes!\" (don't). Beber → \"¡Bebe!\" but \"¡No bebas!\" Now do yours."] };
    };
    f.teach = () => S3([["Don't do it!", "¡No hables!", "To tell a friend <b>not</b> to do something, use the <b>wish form</b> of tú: <b>No hables</b>, <b>No comas</b>, <b>No escribas</b>."], ["Yes or no", "¡Habla! → ¡No hables!<br>¡Come! → ¡No comas!", "The \"do it\" command (habla, come) and the \"don't\" command (hables, comas) are different. -ar verbs switch to <b>-es</b>, -er and -ir verbs switch to <b>-as</b>."], ["Special ones", "¡Ve! → ¡No vayas!<br>¡Haz! → ¡No hagas!", "The eight short commands (haz, di, ve, pon, sal, ten, ven, sé) all go back to the wish form for \"don't\": <b>no hagas, no digas, no vayas, no pongas, no seas</b>."]]);
    return f;
  })();
  const usted = RW([
    ["Tell Mr. López (usted) to speak slowly: \"___ más despacio, por favor.\" (hablar)", "Hable", ["Habla", "Hablas"]], ["Tell the doctor (usted) to come in: \"___, por favor.\" (pasar)", "Pase", ["Pasa", "Pasas"]],
    ["Tell Mrs. Ruiz (usted) to write her name: \"___ su nombre.\" (escribir)", "Escriba", ["Escribe", "Escribes"]], ["Tell Mr. Gómez (usted) to open the door: \"___ la puerta.\" (abrir)", "Abra", ["Abre", "Abres"]],
    ["Tell a guest (usted) to eat: \"___ usted, por favor.\" (comer)", "Coma", ["Come", "Comes"]], ["Tell Mrs. Díaz (usted) to wait: \"___ un momento.\" (esperar)", "Espere", ["Espera", "Esperas"]],
    ["Tell Mr. Torres (usted) to listen: \"___ con cuidado.\" (escuchar)", "Escuche", ["Escucha", "Escuchas"]], ["Tell a visitor (usted) to come here: \"___ aquí.\" (venir)", "Venga", ["Ven", "Viene"]],
    ["Tell Mrs. Soto (usted) to do the work: \"___ el trabajo.\" (hacer)", "Haga", ["Haz", "Hace"]]
  ], { h1: "Usted is the polite \"you\". Polite commands to usted are different from the friendly ones you use with a friend (tú).", h2: "Polite commands use the wish form: -ar verbs end in <b>-e</b>, and -er and -ir verbs end in <b>-a</b>. A few verbs need the yo-form stem (venir, hacer).",
    h3: "Example: \"¡Cante, por favor!\" (cantar → -e) and \"¡Beba agua!\" (beber → -a). Now do yours.",
    slides: [["Being polite", "usted", "To an adult you do not know, or to a teacher or doctor, you say <b>usted</b>. The polite command for usted is the wish form of él / ella."], ["Switch the vowel", "hable · coma · escriba", "-ar verbs end in <b>-e</b> (hable, espere, escuche). -er and -ir verbs end in <b>-a</b> (coma, escriba, abra)."], ["Special stems", "venga · haga · diga", "Verbs whose yo form ends in -go keep the g: <b>venga, haga, diga, ponga, salga, tenga</b>."]] });
  const siTr = TR([
    ["Si llueve, me quedaré en casa.", "If it rains, I will stay home."], ["Si estudias, aprenderás.", "If you study, you will learn."], ["Si tengo tiempo, te llamaré.", "If I have time, I will call you."],
    ["Si comemos ahora, llegaremos tarde.", "If we eat now, we will arrive late."], ["Si hace sol, iremos a la playa.", "If it is sunny, we will go to the beach."], ["Si ellos corren, ganarán.", "If they run, they will win."],
    ["Si tú me ayudas, terminaré pronto.", "If you help me, I will finish soon."], ["Si ella viene, haremos una fiesta.", "If she comes, we will have a party."]
  ], [["If... then...", "Si + present, future", "To say what <b>will</b> happen if something is true, use <b>si</b> + the present tense, then the future: <b>Si llueve, me quedaré</b>."], ["Two parts", "Si estudias, aprenderás.", "The first part (after <b>si</b>) says the condition, in the present. The second part says the result, in the future."], ["Order", "Me quedaré si llueve.", "You can swap the two parts: <b>Me quedaré si llueve</b> means the same. Just keep si + present together."]],
    "Find si (if). The part with si is in the present. The other part says what will happen.");
  const gustaLike = RW([
    ["A mí ___ los gatos. (I love cats)", "me encantan", ["me encanta", "yo encanto"]], ["Me ___ la música. (music interests me)", "interesa", ["interesan", "intereso"]],
    ["A ella le ___ los deportes. (sports interest her)", "interesan", ["interesa", "interesas"]], ["¿Te ___ el chocolate? (do you love chocolate?)", "encanta", ["encantan", "encantas"]],
    ["Me ___ las manos. (my hands hurt)", "duelen", ["duele", "duelo"]], ["A nosotros nos ___ el parque. (we love the park)", "encanta", ["encantan", "encantamos"]],
    ["Me ___ un lápiz. (I am missing a pencil)", "falta", ["faltan", "falto"]], ["A ellos les ___ las matemáticas. (math interests them)", "interesan", ["interesa", "interesamos"]],
    ["A mi hermano le ___ dos libros. (he is missing two books)", "faltan", ["falta", "faltas"]], ["A mí me ___ la cabeza. (my head hurts)", "duele", ["duelen", "duelo"]]
  ], { h1: "These verbs work like gustar. The thing that is loved, missing or sore is the subject. Is that thing one or many?", h2: "A single thing (or a verb) → the verb ends in <b>-a</b> (or duele). Many things → the verb ends in <b>-an</b> (or duelen). The verb never changes for the person.",
    h3: "Example: \"Me encantan los perros\" (many dogs, -an) and \"Me encanta el perro\" (one dog, -a). Now do yours.",
    slides: [["Like gustar", "Me gusta · Me encanta", "Some verbs work like <b>gustar</b>: <b>encantar</b> (to love), <b>interesar</b> (to interest), <b>faltar</b> (to be missing), <b>doler</b> (to hurt)."], ["Match the thing", "Me encanta el libro.<br>Me encantan los libros.", "The verb matches the <b>thing</b> that is loved: one thing → <b>-a</b>, many things → <b>-an</b>."], ["Who feels it", "me · te · le · nos · les", "Use <b>me, te, le, nos, les</b> to say who. They stay in front of the verb: <b>A ella le interesan los deportes</b>."]] });
  const verbPrep = RW([
    ["Pienso ___ mi familia.", "en", ["con", "de"]], ["Sueño ___ viajar a España.", "con", ["en", "a"]], ["Cuento ___ ti.", "con", ["en", "de"]], ["Dependo ___ mis padres.", "de", ["con", "a"]],
    ["Me preocupo ___ mi amigo.", "por", ["de", "en"]], ["Me olvido ___ la tarea.", "de", ["a", "por"]], ["Me acuerdo ___ tu cumpleaños.", "de", ["en", "con"]], ["Ella se fija ___ los detalles.", "en", ["de", "con"]], ["Él se queja ___ el ruido.", "de", ["en", "por"]]
  ], { h1: "Some Spanish verbs always need one little word after them. Which little word goes with this verb?", h2: "Learn the verb and its little word as a pair. Some pairs use <b>en</b>, some use <b>con</b>, some use <b>de</b> and some use <b>por</b>. Think of how you say it in English: think <i>about</i>, worry <i>about</i>.",
    h3: "Example: \"Hablo de música\" (talk about) and \"Cuento los días\" (just count). Pairs must be learned. Now do yours.",
    slides: [["Verb pairs", "pensar <b>en</b>", "In English we say think <b>about</b>. In Spanish, <b>pensar en</b> uses the little word <b>en</b>. Every verb has its own little word."], ["More pairs", "soñar con · contar con<br>depender de · olvidarse de<br>acordarse de · quejarse de<br>preocuparse por · fijarse en", "<b>Soñar con</b> (dream about), <b>contar con</b> (count on), <b>depender de</b> (depend on), <b>preocuparse por</b> (worry about), <b>fijarse en</b> (notice)."], ["Learn as a pair", "🧩", "Do not translate word for word. Learn the verb together with its little word, like a pair of shoes."]] });
  const FALSE = SP("Tricky look-alikes", [["actual", "current"], ["librería", "bookstore", "📚"], ["éxito", "success"], ["sensible", "sensitive"], ["asistir", "to attend"], ["carpeta", "folder", "📁"], ["colegio", "school"], ["pretender", "to try to"], ["soportar", "to put up with"], ["realizar", "to carry out"], ["molestar", "to bother"]]);
  const prefixes = RW([
    ["What is the opposite of <b>posible</b>?", "imposible", ["desposible", "reposible"]], ["What is the opposite of <b>feliz</b> (happy)?", "infeliz", ["desfeliz", "refeliz"]],
    ["What is the opposite of <b>ordenado</b> (tidy)?", "desordenado", ["inordenado", "reordenado"]], ["What is the opposite of <b>cómodo</b> (comfortable)?", "incómodo", ["descómodo", "recómodo"]],
    ["What is the opposite of <b>visible</b>?", "invisible", ["desvisible", "revisible"]], ["What is the opposite of <b>hacer</b> (to do)?", "deshacer", ["inhacer", "rehacer"]],
    ["What is the opposite of <b>cargar</b> (to load)?", "descargar", ["incargar", "recargar"]], ["To read again: ___ (leer)", "releer", ["deleer", "inleer"]],
    ["To do again: ___ (hacer)", "rehacer", ["deshacer", "inhacer"]], ["To fill again: ___ (llenar)", "rellenar", ["desllenar", "inllenar"]]
  ], { h1: "Look at the little piece at the start of each choice: des-, in- or re-. What does each one do?", h2: "<b>Des-</b> and <b>in-</b> make the opposite. <b>Re-</b> means again. Some words take in- (imposible), others take des- (desordenado).",
    h3: "Example: <b>conocido</b> → <b>desconocido</b> (unknown), <b>capaz</b> → <b>incapaz</b> (not able), <b>escribir</b> → <b>reescribir</b> (write again). Now do yours.",
    slides: [["Pieces of words", "des- · in- · re-", "You can change a word's meaning by adding a piece at the front. <b>Des-</b> and <b>in-</b> mean not or opposite. <b>Re-</b> means again."], ["Opposites", "posible → <b>im</b>posible<br>feliz → <b>in</b>feliz<br>ordenado → <b>des</b>ordenado", "<b>In-</b> goes with many describing words (infeliz, incómodo). Before <b>p</b> it becomes <b>im-</b> (imposible). <b>Des-</b> goes with many verbs and describing words (deshacer, desordenado)."], ["Again", "leer → <b>re</b>leer<br>hacer → <b>re</b>hacer", "<b>Re-</b> means again: <b>releer</b> (read again), <b>rehacer</b> (do again), <b>rellenar</b> (fill again)."]] });
  const MATH = SP("Math words", [["suma", "addition"], ["multiplicación", "multiplication"], ["división", "division"], ["fracción", "fraction"], ["mitad", "half"], ["doble", "double"], ["ángulo", "angle"], ["triángulo", "triangle", "🔺"], ["círculo", "circle", "⭕"], ["rectángulo", "rectangle"], ["promedio", "average"]]);
  const MONEY = SP("Money matters", [["ahorrar", "to save money"], ["gastar", "to spend"], ["cambio", "change"], ["tarjeta", "card", "💳"], ["propina", "tip"], ["descuento", "discount"], ["efectivo", "cash"], ["billetera", "wallet"], ["prestar", "to lend"], ["ganar", "to earn, to win"]]);
  const STORYW = SP("Story words", [["finalmente", "finally"], ["al final", "in the end"], ["por eso", "that is why"], ["además", "besides"], ["sin embargo", "however"], ["por ejemplo", "for example"], ["mientras tanto", "meanwhile"], ["por último", "lastly"], ["en primer lugar", "first of all"], ["de pronto", "all of a sudden"]]);
  const opinions = TR([
    ["Creo que es una buena idea.", "I think it is a good idea."], ["En mi opinión, el libro es mejor.", "In my opinion, the book is better."], ["Estoy de acuerdo contigo.", "I agree with you."],
    ["No estoy de acuerdo.", "I do not agree."], ["Me parece interesante.", "It seems interesting to me."], ["Pienso que tienes razón.", "I think you are right."], ["Tengo una idea diferente.", "I have a different idea."],
    ["Para mí, es muy importante.", "For me, it is very important."], ["¿Qué opinas tú?", "What do you think?"], ["Eso depende.", "That depends."]
  ], [["Saying what you think", "Creo que… · Pienso que…", "To give your opinion, start with <b>creo que</b> (I believe that), <b>pienso que</b> (I think that) or <b>en mi opinión</b> (in my opinion)."], ["Agree or not", "Estoy de acuerdo.<br>No estoy de acuerdo.", "<b>Estoy de acuerdo</b> means I agree. Add <b>no</b> in front to say you do not agree. <b>Tienes razón</b> means you are right."], ["Ask others", "¿Qué opinas?", "Ask a friend <b>¿Qué opinas?</b> or <b>¿Qué piensas?</b> to find out what they think. Be kind when you disagree!"]],
    "Look for the key words: creo, pienso, opinión, acuerdo, razón. They tell you it is about an opinion.");
  const idioms = TR([
    ["Estar en las nubes.", "To daydream."], ["Tomar el pelo.", "To pull someone's leg."], ["Dar en el clavo.", "To hit the nail on the head."], ["Llover a cántaros.", "To rain very hard."], ["Estar como pez en el agua.", "To feel right at home."],
    ["Hablar por los codos.", "To talk a lot."], ["Ponerse las pilas.", "To get going."], ["Echar una mano.", "To lend a hand."], ["Dormir como un tronco.", "To sleep like a log."]
  ], [["Idioms", "💬", "An <b>idiom</b> is a saying whose meaning is not the same as its words. English has them too, like \"it's raining cats and dogs\"."], ["Some Spanish idioms", "Estar en las nubes<br>Echar una mano<br>Llover a cántaros", "<b>Estar en las nubes</b> (to be in the clouds) means to daydream. <b>Echar una mano</b> (to throw a hand) means to help. <b>Llover a cántaros</b> (to rain by the jug) means to rain hard."], ["Do not translate", "🧩", "If you translate word for word, an idiom sounds silly. Learn what it means as a whole."]],
    "Do not translate it word for word! Think about what the saying is really about.");
  const worldGeo = RW([
    ["Spain and Portugal share a big piece of land called the Iberian ___.", "Peninsula", ["Island", "Canal"], "A piece of land with water on three sides has a special name."], ["The Pyrenees mountains are between Spain and which country?", "Francia", ["Italia", "Alemania"], "It is Spain's neighbor to the north."],
    ["The Canary Islands belong to which country?", "España", ["Cuba", "Perú"], "They are in the Atlantic Ocean, near Africa, but belong to a European country."], ["Easter Island (Rapa Nui) belongs to which country?", "Chile", ["Perú", "México"], "It is far out in the Pacific Ocean, west of a long, thin South American country."],
    ["Which of these countries has NO coast on the sea?", "Bolivia", ["Chile", "Perú"], "Two of them touch the Pacific Ocean."], ["Which of these is the biggest Spanish-speaking country in South America?", "Argentina", ["Uruguay", "Ecuador"], "It is a very long country that reaches far south."],
    ["The island of Hispaniola is shared by Haiti and which Spanish-speaking country?", "República Dominicana", ["Cuba", "Puerto Rico"], "It is in the Caribbean sea."], ["Which country is just south of Mexico, in Central America?", "Guatemala", ["Chile", "Cuba"], "Cuba is an island and Chile is in South America."],
    ["Which sea is north of Colombia and Venezuela?", "mar Caribe", ["océano Pacífico", "mar Mediterráneo"], "It is the warm sea where Cuba and Puerto Rico are."], ["The Andes mountains run along the west side of which continent?", "South America", ["Africa", "Europe"], "Think of Perú, Chile and Colombia."]
  ], { h1: "Picture a world map. Find the place in your mind and think of its neighbors.", h2: "Use what you know about maps and Spanish-speaking countries.",
    h3: "Example: Madrid is in Spain, which is in Europe. Quito is in Ecuador, which is in South America. Use your map to place yours.",
    slides: [["The Spanish-speaking map", "🗺️", "Spanish is spoken in Europe, North America, Central America, South America and the Caribbean."], ["Land and sea", "Pirineos · Andes · mar Caribe", "The <b>Pyrenees</b> separate España and Francia. The <b>Andes</b> run along South America. The <b>Caribbean Sea</b> is home to Cuba, Puerto Rico and the República Dominicana."], ["Islands and borders", "Canarias · Rapa Nui", "The <b>Canary Islands</b> belong to España. <b>Easter Island</b> belongs to Chile. <b>Bolivia</b> and <b>Paraguay</b> have no sea coast."]] });
  const reading12 = RD([
    { t: "Si queremos cuidar el planeta, necesitamos cambiar algunos hábitos. Es importante que reciclemos y que no gastemos demasiada agua. Mi escuela tiene un huerto donde los estudiantes plantan verduras. Los maestros esperan que otras escuelas hagan lo mismo.",
      qs: [["What do we need to do to take care of the planet?", "change some habits", ["buy more things", "build a new school"], "Look at the first sentence, after necesitamos."], ["What does the school have?", "a vegetable garden", ["a swimming pool", "a farm with cows"], "Verduras are vegetables. Find the place where they are planted."], ["Who plants vegetables?", "the students", ["the teachers", "the parents"], "Find plantan. Who does it?"], ["What do the teachers hope?", "that other schools do the same", ["that students stay home", "that the garden gets bigger"], "Find the word esperan, which means they hope."]] },
    { t: "Diego quería comprar una bicicleta nueva, pero costaba mucho dinero. Decidió ahorrar un poco cada semana. Después de seis meses, tenía suficiente. Cuando por fin la compró, se sintió muy orgulloso porque lo había hecho solo.",
      qs: [["What did Diego want?", "a new bike", ["a new phone", "a new book"], "The first sentence says what he wanted."], ["What was the problem?", "it cost a lot of money", ["it was broken", "it was too small"], "Find the word pero (but)."], ["How did Diego solve the problem?", "he saved a little each week", ["he borrowed money", "he found money"], "Find ahorrar, which is a money verb."], ["How long did it take?", "six months", ["six days", "six years"], "Look for the word after the number seis."], ["Why was he proud?", "he did it by himself", ["his friends helped him", "it was a gift"], "Solo means alone, by oneself."]] },
    { t: "Mi primo y yo hicimos un experimento en la cocina. Mezclamos vinagre con bicarbonato y apareció mucha espuma. Mi primo dudaba que funcionara, pero yo estaba seguro. Después escribimos lo que vimos en un cuaderno. Aprendí que la ciencia es divertida.",
      qs: [["Where did they do the experiment?", "in the kitchen", ["in the garden", "at the lab"], "Find the word cocina."], ["What did they mix?", "vinegar and baking soda", ["milk and juice", "sand and water"], "Find mezclamos, which means we mixed."], ["What appeared?", "a lot of foam", ["a lot of smoke", "a small flower"], "Find the word after apareció and mucha."], ["Who doubted the experiment would work?", "the cousin", ["the teacher", "the writer"], "Dudaba means doubted. Who is it about?"], ["Where did they write what they saw?", "in a notebook", ["on the wall", "on the computer"], "Find cuaderno."]] },
    { t: "Machu Picchu es una antigua ciudad en las montañas de Perú. Los incas la construyeron hace más de quinientos años. Hoy muchos turistas la visitan para ver sus muros de piedra y las vistas increíbles. Es importante que los visitantes cuiden este lugar.",
      qs: [["Where is Machu Picchu?", "in the mountains of Perú", ["on an island in Chile", "in a desert in México"], "Find en las montañas de..."], ["Who built it?", "the Incas", ["the Mayas", "the Spanish"], "Los incas la construyeron."], ["How long ago was it built?", "more than 500 years ago", ["10 years ago", "about 50 years ago"], "Find hace and the big number."], ["What are the walls made of?", "stone", ["wood", "glass"], "Find muros de..."], ["What should visitors do?", "take care of the place", ["leave quickly", "bring friends"], "The last sentence says it is important that they cuiden este lugar."]] }
  ], [["Longer stories", "📖", "At this level you read longer stories. The same trick works: find the words you know, then use them to understand the rest."], ["Clues", "si · porque · pero · después", "Small words like <b>si</b> (if), <b>porque</b> (because), <b>pero</b> (but) and <b>después</b> (afterwards) show how the ideas connect."], ["Find the clue", "❓", "Read the question first, then go back to the story and look for the part that answers it."]]);
  const typ12 = TYE([].concat(FALSE.items, MATH.items, MONEY.items, STORYW.items, [["frontera", "border"], ["cascada", "waterfall"], ["rey", "king"]]), "tricky look-alikes, math, money and story words");
  const L12 = [
    XL("Doubt, feelings, certainty", doubt), XL("Wish form: spelling changes", subSpell), XL("Wish form: boot verbs", subStem), XL("Don't do it!", negCmd),
    XL("Polite commands with usted", usted), XL("If it rains...", siTr), XL("Verbs like gustar", gustaLike), XL("Verb pairs", verbPrep),
    XL("Tricky look-alikes", V(FALSE, "These words look like English words but mean something different. Make up a silly sentence for each one to remember it.")), XL("Pieces of words", prefixes), XL("Math words", V(MATH)), XL("Money matters", V(MONEY)),
    XL("Story words", V(STORYW)), XL("Giving your opinion", opinions), XL("Idioms", idioms), XL("The Spanish-speaking map", worldGeo),
    XL("Type it in Spanish", typ12), XL("Reading longer stories", reading12),
    XL("Mixed practice", MIX([doubt, subSpell, subStem, negCmd, usted, V(MATH)])),
    XL("Level 12 Challenge", MIX([doubt, subSpell, subStem, negCmd, usted, siTr, gustaLike, verbPrep, V(FALSE), prefixes, V(MONEY), V(STORYW), opinions, idioms, worldGeo, reading12, typ12]))
  ];
  Object.assign(SPANISH_LEVELS, { 10: L10, 11: L11, 12: L12 });
})();
