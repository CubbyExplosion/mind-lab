// ext/spanish-13-15.js  Mind Lab Spanish, levels 13-15 (60 lessons)
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
  const TR = (pairs, slides, hint1) => {
    const f = () => {
      const [es, en] = pick(pairs), others = shuf(pairs.filter(p => p[0] !== es)), ex = others[0];
      if (Math.random() < 0.5) return { text: `What does "${es}" mean?`, say: es, lang: "es-ES", choices: shuf([en, others[1][1], others[2][1]]), answer: en,
        hints: [hint1 || "Press 🔊, then read it slowly word by word. Find the words you already know.", `The English starts with "${en[0]}" and has ${en.split(" ").length} words.`, `Example: "${ex[0]}" means "${ex[1]}". Now do yours.`] };
      return { text: `How do you say "${en}" in Spanish?`, choices: shuf([es, others[1][0], others[2][0]]), answer: es,
        hints: ["Find the key words in English, then think of their Spanish partners from the lesson.", `The Spanish starts with "${L1(es)}" and has ${es.split(" ").length} words.`, `Example: "${ex[1]}" in Spanish is "${ex[0]}". Now find yours.`] };
    };
    f.teach = () => S3(slides);
    return f;
  };
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
  const acc = s => s.slice(0, -1) + { a: "á", e: "é", i: "í", o: "ó", u: "ú" }[s.slice(-1)];
  const impS = (inf, en, st, note) => vb(inf, en, [st + "ra", st + "ras", st + "ra", acc(st) + "ramos", st + "ran"], note);
  const pp = (aux, inf, en, part, note) => vb(inf, en, aux.map(h => h + " " + part), note);
  const HAYA = ["haya", "hayas", "haya", "hayamos", "hayan"], FUT = ["habré", "habrás", "habrá", "habremos", "habrán"],
    CP = ["habría", "habrías", "habría", "habríamos", "habrían"], HUB = ["hubiera", "hubieras", "hubiera", "hubiéramos", "hubieran"];
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
  const SUBRULE = {
    yo: "The <b>yo</b> form is the same as the <b>él / ella</b> form.",
    "tú": "The <b>tú</b> form is the él form plus an <b>-s</b>.",
    "él": "The <b>él / ella</b> form is the same as the <b>yo</b> form.",
    nosotros: "The <b>nosotros</b> form ends in <b>-mos</b>.",
    ellos: "The <b>ellos</b> form ends in <b>-n</b>."
  };

  // ======================= LEVEL 13 =======================
  const IMP_REG = [impS("hablar", "to speak", "habla"), impS("comer", "to eat", "comie"), impS("vivir", "to live", "vivie"), impS("bailar", "to dance", "baila"), impS("escribir", "to write", "escribie"),
    impS("correr", "to run", "corrie"), impS("cantar", "to sing", "canta"), impS("aprender", "to learn", "aprendie"), impS("abrir", "to open", "abrie"), impS("ayudar", "to help", "ayuda"), impS("trabajar", "to work", "trabaja"), impS("beber", "to drink", "bebie")];
  const IMP_RULE = {
    yo: "Start with the <b>ellos</b> past form (like <i>bailaron</i>). Drop <b>-ron</b>, then add <b>-ra</b> for yo.",
    "tú": "Start with the <b>ellos</b> past form (like <i>bailaron</i>). Drop <b>-ron</b>, then add <b>-ras</b> for tú.",
    "él": "Start with the <b>ellos</b> past form (like <i>bailaron</i>). Drop <b>-ron</b>, then add <b>-ra</b> for él / ella.",
    nosotros: "Start with the <b>ellos</b> past form (like <i>bailaron</i>). Drop <b>-ron</b>, add <b>-ramos</b>, and put an accent on the vowel just before it.",
    ellos: "Start with the <b>ellos</b> past form (like <i>bailaron</i>). Drop <b>-ron</b>, then add <b>-ran</b> for ellos."
  };
  const impReg = CJ({ verbs: IMP_REG, rule: IMP_RULE, pre: "Quería que", tag: "I wanted... to", title: "Past wish form", pat: "hablaron → hablara<br>comieron → comiera<br>vivieron → viviera",
    t1: "<b>Tap a line to hear it.</b> This is the <b>past wish form</b> (the imperfect subjunctive). It is used after wishes that happened in the past: <b>quería que</b> = I wanted (someone) to.",
    t2: "Take the <b>ellos</b> form of the past tense (hablaron), drop <b>-ron</b> and add <b>-ra, -ras, -ra, -ramos, -ran</b>. For nosotros, put an accent on the vowel before -ramos: <b>habláramos</b>." });
  const IMP_IRR = [impS("ser / ir", "to be / to go", "fue", "Ser and ir share the same past forms."), impS("tener", "to have", "tuvie", "Its ellos past form is <i>tuvieron</i>."), impS("hacer", "to do", "hicie", "Its ellos past form is <i>hicieron</i>."),
    impS("decir", "to say", "dije", "Its ellos past form is <i>dijeron</i>."), impS("poder", "to be able", "pudie", "Its ellos past form is <i>pudieron</i>."), impS("estar", "to be", "estuvie", "Its ellos past form is <i>estuvieron</i>."),
    impS("venir", "to come", "vinie", "Its ellos past form is <i>vinieron</i>."), impS("querer", "to want", "quisie", "Its ellos past form is <i>quisieron</i>."), impS("poner", "to put", "pusie", "Its ellos past form is <i>pusieron</i>."),
    impS("dar", "to give", "die", "Its ellos past form is <i>dieron</i>."), impS("leer", "to read", "leye", "Its ellos past form is <i>leyeron</i>.")];
  const impIrr = CJ({ verbs: IMP_IRR, rule: IMP_RULE, pre: "Quería que", tag: "I wanted... to", title: "Special past wish verbs", pat: "tuvieron → tuviera<br>hicieron → hiciera<br>fueron → fuera",
    t1: "<b>Tap a line to hear it.</b> The rule is the same, but these verbs have a special past form that you must remember.",
    t2: "Always start from the <b>ellos</b> past form. If the verb is special in the past (tuvieron, hicieron, fueron, dijeron), it is special here too. Then drop <b>-ron</b> and add the same endings." });
  const siFuera = RW([
    ["Si ___ dinero, compraría un carro. (tener, yo)", "tuviera", ["tengo", "tendré"]], ["Si yo ___ pájaro, volaría. (ser)", "fuera", ["soy", "seré"]],
    ["Si ella ___ tiempo, viajaría. (tener)", "tuviera", ["tiene", "tendría"]], ["Si hiciera sol, ___ a la playa. (ir, nosotros)", "iríamos", ["fuimos", "vamos"]],
    ["Si yo ___ rico, ayudaría a todos. (ser)", "fuera", ["sería", "soy"]], ["Si ___ más tiempo, leería más libros. (tener, yo)", "tuviera", ["tendría", "tengo"]],
    ["Si pudiera, ___ por el mundo. (viajar, yo)", "viajaría", ["viajé", "viajo"]], ["Si ellos ___ aquí, jugarían con nosotros. (estar)", "estuvieran", ["estaban", "estarían"]],
    ["Si yo ___ el presidente, construiría más parques. (ser)", "fuera", ["soy", "seré"]], ["Si tú ___ más, ganarías el juego. (practicar)", "practicaras", ["practicas", "practicarías"]]
  ], { h1: "This is a pretend situation. Look at the two parts: one has <b>si</b> (if) and the other says what WOULD happen.", h2: "The part with <b>si</b> uses the past wish form (-ra). The other part uses the conditional (-ía) for what would happen.",
    h3: "Example: \"Si tuviera un perro, lo llamaría Max\" (If I had a dog, I would call him Max). Si-part = -ra, result = -ía. Now do yours.",
    slides: [["Pretend situations", "Si yo fuera...", "To say what you would do if something were true (but it is not), use <b>si</b> + the past wish form. Example: <b>Si fuera pájaro, volaría.</b>"], ["Two parts", "si + -ra<br>result + -ía", "The <b>si</b> part uses the past wish form (fuera, tuviera, pudiera). The result part uses the conditional (volaría, compraría, viajaría)."], ["Try it", "💭", "Make up your own: <b>Si yo tuviera un robot, ...</b> Finish it with a conditional verb. It is a fun way to practice!"]] });
  const letsDo = RW([
    ["Let's sing together! ¡___ juntos! (cantar)", "Cantemos", ["Cantamos", "Canten"]], ["Let's eat now! ¡___ ahora! (comer)", "Comamos", ["Comemos", "Coman"]],
    ["Let's write a letter! ¡___ una carta! (escribir)", "Escribamos", ["Escribimos", "Escriban"]], ["Let's dance! ¡___! (bailar)", "Bailemos", ["Bailamos", "Bailen"]],
    ["Let's study today! ¡___ hoy! (estudiar)", "Estudiemos", ["Estudiamos", "Estudien"]], ["Let's read a book! ¡___ un libro! (leer)", "Leamos", ["Leemos", "Lean"]],
    ["Let's leave now! ¡___ ahora! (salir)", "Salgamos", ["Salimos", "Salgan"]], ["Let's open the door! ¡___ la puerta! (abrir)", "Abramos", ["Abrimos", "Abran"]],
    ["Let's walk in the park! ¡___ en el parque! (caminar)", "Caminemos", ["Caminamos", "Caminen"]], ["Let's drink water! ¡___ agua! (beber)", "Bebamos", ["Bebemos", "Beban"]]
  ], { h1: "\"Let's...\" means all of us together. Which person is that: yo, tú or nosotros?", h2: "The let's-form uses the wish form with <b>nosotros</b>: -ar verbs end in <b>-emos</b>, and -er / -ir verbs end in <b>-amos</b> (the vowels switch).",
    h3: "Example: \"¡Cantemos!\" for the -ar verb cantar, and \"¡Vivamos!\" for the -ir verb vivir. Now do yours.",
    slides: [["Let's...!", "🙌", "To invite everyone, including yourself, to do something, use the <b>nosotros</b> wish form. It is called a \"let's\" command."], ["The switch", "-ar → -emos<br>-er / -ir → -amos", "<b>Hablar</b> → <b>Hablemos</b> (let's talk). <b>Comer</b> → <b>Comamos</b> (let's eat). <b>Escribir</b> → <b>Escribamos</b> (let's write)."], ["Another way", "Vamos a...", "You can also say <b>Vamos a cantar</b> (we are going to sing / let's sing). For \"let's go\" use just <b>Vamos</b>."]] });
  const cmdPron = RW([
    ["Tell a friend: \"Eat it!\" (el pan)", "Cómelo", ["Lo come", "Comerlo"]], ["Tell a friend: \"Don't eat it!\" (el pan)", "No lo comas", ["Cómelo", "No cómelo"]],
    ["Tell a friend: \"Call me!\"", "Llámame", ["Me llama", "Llamarme"]], ["Tell a friend: \"Don't call me!\"", "No me llames", ["No llámame", "Me llamas"]],
    ["Tell a friend: \"Give it to me!\" (el regalo)", "Dámelo", ["Dámela", "Me lo da"]], ["Tell a friend: \"Write to me!\"", "Escríbeme", ["Me escribe", "Escribirme"]],
    ["Tell a friend: \"Sit down!\" (sentarse)", "Siéntate", ["Te sientas", "Sentarte"]], ["Tell a friend: \"Don't open it!\" (la caja)", "No la abras", ["No ábrela", "No la abres"]],
    ["Tell a friend: \"Do it!\" (hacerlo)", "Hazlo", ["Lo haz", "Hacerlo"]], ["Tell a friend: \"Wash your hands!\" (lavarse las manos)", "Lávate las manos", ["Te lavas las manos", "Lavarte las manos"]]
  ], { h1: "Is the command saying to DO it, or NOT to do it? The little words (me, te, lo, la) go in a different place for each.", h2: "A \"do it\" command: stick the little word on the END of the verb (and add an accent if needed). A \"don't\" command: put the little word BEFORE the verb.",
    h3: "Example: \"Cómpralo\" (Buy it!) but \"No lo compres\" (Don't buy it!). Now do yours.",
    slides: [["Little words in commands", "-lo -la -me -te", "In a command, the pronouns (me, te, lo, la, se) have a special place. Where they go depends on yes or no."], ["Yes: stick them on", "Cómelo · Dámelo · Llámame", "A yes-command: attach the pronoun at the end. Add an <b>accent</b> to keep the stress in the same place: <b>come</b> → <b>cómelo</b>."], ["No: put them before", "No lo comas · No me llames", "A no-command: the pronoun goes in front of the verb, as separate words: <b>No lo comas.</b> No accent is needed."]] });
  const cuandoSub = RW([
    ["Cuando yo ___ grande, seré doctora. (ser)", "sea", ["soy", "era"], "It has not happened yet. The main part says \"seré\" (I will be). Which form is used after cuando for the future?"],
    ["Cuando ___ a casa, te llamaré. (llegar, yo)", "llegue", ["llego", "llegaba"], "The main part is in the future (llamaré), so the cuando part is not a fact yet."],
    ["Cuando yo era niño, siempre ___ al parque. (ir)", "iba", ["vaya", "iré"], "Era says it was in the past, and it was a habit. Facts and habits use normal forms."],
    ["Llámame cuando ___ la tarea. (terminar, tú)", "termines", ["terminas", "terminabas"], "This is a command about something in the future."],
    ["Cuando mi mamá ___ a casa, siempre cocina. (llegar)", "llega", ["llegue", "llegaba"], "Siempre means it happens every time. That is a habit."],
    ["Cuando ___ dinero, compraremos una casa. (tener, nosotros)", "tengamos", ["tenemos", "teníamos"], "Compraremos is future, so this \"when\" has not happened yet."],
    ["Siempre leo cuando ___ tiempo. (tener, yo)", "tengo", ["tenga", "tuve"], "Siempre means it is a habit, not a future plan."],
    ["Te lo diré cuando él ___ . (venir)", "venga", ["viene", "venía"], "Diré (I will tell) is future, so the \"when\" is in the future too."],
    ["Cuando ___ sol mañana, iremos al parque. (hacer)", "haga", ["hace", "hacía"], "Mañana (tomorrow) and iremos (we will go) are both future."]
  ], { h1: "Does the \"when\" part talk about something that has ALREADY happened or happens every time, or something that has NOT happened yet?", h2: "Future or not yet happened → wish form (subjunctive). Habit or past → normal form.",
    h3: "Example: \"Cuando llegue, comeré\" (When I arrive, I will eat; not yet) but \"Cuando llego, como\" (When I arrive, I eat; habit). Now do yours.",
    slides: [["Cuando = when", "⏰", "<b>Cuando</b> can use two kinds of verbs. The choice depends on the time: has it happened yet, or not?"], ["Not yet = wish form", "Cuando llegue, ...", "If the \"when\" is in the <b>future</b> (it has not happened yet), use the wish form: <b>Cuando sea grande, seré pintor.</b>"], ["Habit or past = normal", "Cuando llego, como.<br>Cuando llegué, comí.", "If it is a habit or already happened, use the normal form: <b>Cuando llego a casa, como.</b> Look for words like siempre, ayer, mañana, seré, iremos."]] });
  const paraQue = RW([
    ["Estudio para que mis padres ___ orgullosos. (estar)", "estén", ["están", "estaban"]], ["Te llamo para que ___ la verdad. (saber, tú)", "sepas", ["sabes", "sabías"]],
    ["Cierra la puerta antes de que ___ el perro. (salir)", "salga", ["sale", "salía"]], ["Iremos al parque a menos que ___ . (llover)", "llueva", ["llueve", "llovía"]],
    ["Hablo despacio para que todos me ___ . (entender)", "entiendan", ["entienden", "entendían"]], ["Voy a cocinar antes de que ___ mis abuelos. (llegar)", "lleguen", ["llegan", "llegaban"]],
    ["Te doy mi libro para que ___ el cuento. (leer, tú)", "leas", ["lees", "leías"]], ["Ayúdame, a menos que ___ ocupado. (estar, tú)", "estés", ["estás", "estabas"]],
    ["Quiero salir antes de que ___ la tormenta. (empezar)", "empiece", ["empieza", "empezaba"]], ["Practicamos para que nuestro equipo ___ . (ganar)", "gane", ["gana", "ganaba"]]
  ], { h1: "Look at the little group of words before the verb: para que, antes de que, a menos que. Do you know what kind of verb they need?", h2: "These phrases always need the wish form (subjunctive). The ending switches: -ar verbs use <b>e</b>, -er / -ir verbs use <b>a</b>.",
    h3: "Example: \"Hablo despacio para que me entiendas\" (so that you understand me). Entender is -er, so the wish form uses <b>a</b>. Now do yours.",
    slides: [["Always the wish form", "para que · antes de que · a menos que", "Some phrases always need the wish form (subjunctive), even for facts: <b>para que</b> (so that), <b>antes de que</b> (before), <b>a menos que</b> (unless)."], ["Examples", "Estudio para que ella aprenda.<br>Salgo antes de que llueva.", "<b>Para que</b> gives a purpose (so that). <b>Antes de que</b> is about time (before). <b>A menos que</b> is a condition (unless)."], ["Remember", "e ↔ a", "Use the usual switch: -ar verbs use <b>e</b> (hable), -er and -ir verbs use <b>a</b> (coma). Special verbs: sea, vaya, esté, sepa."]] });
  const seMe = RW([
    ["___ cayó el vaso. (I dropped the glass by accident)", "Se me", ["Me se", "Yo me"]], ["Se te ___ las llaves. (You lost the keys)", "perdieron", ["perdió", "perdí"], "The thing that got lost is \"las llaves\", which is plural. The verb agrees with the THING."],
    ["A Ana se le ___ el lápiz. (Ana's pencil broke)", "rompió", ["rompieron", "rompí"], "The thing that broke is \"el lápiz\", which is singular."], ["Se nos ___ el tiempo. (We ran out of time)", "acabó", ["acabaron", "acabamos"], "The thing that ran out is \"el tiempo\", which is one thing."],
    ["Se me ___ la tarea en casa. (I forgot my homework at home)", "olvidó", ["olvidé", "olvidaron"], "The thing that was forgotten is \"la tarea\", one thing."], ["A los niños se ___ cayeron los helados. (The kids dropped their ice creams)", "les", ["le", "nos"], "The little word matches WHO it happened to: los niños = them."],
    ["Se me ___ las galletas. (I ran out of cookies)", "acabaron", ["acabó", "acabé"], "The thing that ran out is \"las galletas\", which is plural."], ["Se ___ rompió el juguete. (Our toy broke)", "nos", ["me", "les"], "The little word matches WHO it happened to: we."],
    ["Se te ___ el sombrero. (Your hat fell off)", "cayó", ["cayeron", "caíste"], "The thing that fell is \"el sombrero\", which is singular."]
  ], { h1: "In these sentences, the thing \"did it by itself\". Find the THING (the object) and the PERSON it happened to.", h2: "The pattern is <b>se + me / te / le / nos / les + verb</b>. The little word shows who it happened to. The verb agrees with the thing (one thing or many).",
    h3: "Example: \"Se me olvidó el libro\" (I forgot the book; one thing) and \"Se me olvidaron los libros\" (many things). Now do yours.",
    slides: [["It just happened!", "Se me cayó...", "Spanish often says accidents as if the thing did it by itself: <b>Se me cayó el vaso</b> (the glass fell from me). It sounds less like blame."], ["The pattern", "se + me/te/le/nos/les + verb", "The little word tells who it happened to: <b>me</b> (to me), <b>te</b> (to you), <b>le</b> (to him / her), <b>nos</b> (to us), <b>les</b> (to them)."], ["Match the thing", "Se me cayó el vaso.<br>Se me cayeron los vasos.", "The verb agrees with what fell, broke or was forgotten: one thing → <b>-ó</b>, many things → <b>-eron</b>."]] });
  const algun = RW([
    ["¿Tienes ___ libro? (any)", "algún", ["alguno", "alguna"]], ["No tengo ___ amigo allí. (no)", "ningún", ["ninguno", "ninguna"]],
    ["No hay ___ pregunta. (no)", "ninguna", ["ningún", "ninguno"]], ["¿Hay ___ niños aquí? (some)", "algunos", ["algún", "alguna"]],
    ["Hay ___ naranjas en la mesa. (some)", "algunas", ["algún", "algunos"]], ["¿Quieres uno de estos libros? No, no quiero ___ . (not one)", "ninguno", ["ningún", "ninguna"]],
    ["___ día iremos a España. (some)", "Algún", ["Alguno", "Alguna"]], ["No veo ___ problema. (no)", "ningún", ["ninguno", "ninguna"]],
    ["¿Conoces a ___ de ellos? (any one)", "alguno", ["algún", "alguna"]], ["Quiero ___ idea nueva. (some)", "alguna", ["algún", "alguno"]]
  ], { h1: "Look at the word that comes after the blank. Is it a masculine or feminine word, one or many? Or is there no word after the blank?", h2: "Before a masculine singular noun, alguno / ninguno lose their last letter: <b>algún, ningún</b>. Before feminine nouns they stay -a. Alone (no noun), they keep the full form.",
    h3: "Example: \"algún perro\" but \"alguna casa\", and \"¿Hay alguno?\" (with no noun). Now do yours.",
    slides: [["Some and none", "alguno · ninguno", "<b>Alguno</b> means some or any. <b>Ninguno</b> means none or not one. They change to match the noun: alguna, algunos, algunas."], ["Cut the o", "algún libro<br>ningún problema", "Before a <b>masculine singular</b> noun, they lose the <b>-o</b> and get an accent: <b>algún, ningún</b>. Feminine words keep the -a: <b>alguna casa</b>."], ["No double trouble", "No hay ningún problema.", "Remember that Spanish uses a double negative: <b>no</b> + <b>ningún</b> is correct and normal."]] });
  const GOV = SP("Community and government", [["alcalde", "mayor"], ["ciudadano", "citizen"], ["ley", "law"], ["voto", "vote"], ["elección", "election"], ["presidente", "president"], ["derecho", "right"], ["deber", "duty"], ["bandera", "flag", "🚩"], ["impuesto", "tax"], ["gobierno", "government", "🏛️"], ["votar", "to vote", "🗳️"]]);
  const CLIM = SP("Weather and climate", [["clima", "climate"], ["temperatura", "temperature", "🌡️"], ["huracán", "hurricane", "🌀"], ["sequía", "drought"], ["inundación", "flood", "🌊"], ["pronóstico", "forecast"], ["humedad", "humidity"], ["niebla", "fog", "🌫️"], ["relámpago", "lightning", "⚡"], ["trueno", "thunder"], ["granizo", "hail"], ["calentamiento global", "global warming"]]);
  const JOBS13 = SP("Careers", [["ingeniero", "engineer", "👷"], ["arquitecto", "architect"], ["periodista", "journalist", "📰"], ["veterinario", "veterinarian", "🐾"], ["científico", "scientist", "🔬"], ["programador", "programmer", "💻"], ["piloto", "pilot", "✈️"], ["abogado", "lawyer"], ["enfermero", "nurse"], ["agricultor", "farmer", "🌾"], ["electricista", "electrician", "💡"], ["panadero", "baker", "🥖"]]);
  const families = RW([
    ["The person who makes bread (<b>pan</b>) is a ___ .", "panadero", ["panadería", "pancito"]], ["The place where shoes (<b>zapatos</b>) are sold is a ___ .", "zapatería", ["zapatero", "zapatilla"]],
    ["The place where fruit (<b>fruta</b>) is sold is a ___ .", "frutería", ["frutero", "frutal"]], ["The person who paints (<b>pintar</b>) is a ___ .", "pintor", ["pintura", "pintar"]],
    ["The place where ice cream (<b>helado</b>) is sold is a ___ .", "heladería", ["heladero", "helador"]], ["The person who sells flowers (<b>flor</b>) is a ___ .", "florista", ["florería", "florero"]],
    ["The place where flowers (<b>flor</b>) are sold is a ___ .", "florería", ["florista", "florero"]], ["The person who delivers letters (<b>carta</b>) is a ___ .", "cartero", ["cartón", "cartel"]],
    ["The person who cooks (<b>cocinar</b>) is a ___ .", "cocinero", ["cocina", "cocinar"]], ["The place where meat (<b>carne</b>) is sold is a ___ .", "carnicería", ["carnicero", "carnero"]]
  ], { h1: "Find the root word in the question (pan, flor, carne). Is the answer a PERSON or a PLACE?", h2: "A <b>person</b> usually ends in <b>-ero, -ista</b> or <b>-or</b>. A <b>place</b> that sells things usually ends in <b>-ería</b>.",
    h3: "Example: <b>libro</b> → a <b>librería</b> is where books are sold; <b>pastel</b> → a <b>pastelero</b> is a person who makes cakes. Now do yours.",
    slides: [["Word families", "pan → panadero → panadería", "Many Spanish words are built from a <b>root word</b> plus an ending. Learn the ending and you can understand many new words."], ["People", "-ero · -ista · -or", "<b>panadero</b> (baker), <b>florista</b> (florist), <b>pintor</b> (painter), <b>cartero</b> (mail carrier). These endings name the person who does the job."], ["Places", "-ería", "<b>panadería</b> (bakery), <b>zapatería</b> (shoe store), <b>frutería</b> (fruit shop), <b>heladería</b> (ice cream shop). The ending -ería is a shop or place."]] });
  const serEstar = RW([
    ["El libro ___ aburrido. (The book is boring.)", "es", ["está", "son"]], ["Yo ___ aburrido hoy. (I am bored today.)", "estoy", ["soy", "es"]],
    ["Ella ___ lista. (She is clever.)", "es", ["está", "son"]], ["La cena ___ lista. (Dinner is ready.)", "está", ["es", "son"]],
    ["Mi abuelo ___ bueno. (He is a kind man.)", "es", ["está", "soy"]], ["Ese niño ___ malo. (That child is naughty.)", "es", ["está", "son"]],
    ["Hoy mi amigo ___ malo. (My friend is sick today.)", "está", ["es", "son"]], ["Las manzanas ___ verdes. (They are the color green.)", "son", ["están", "es"]],
    ["Las bananas ___ verdes todavía. (They are not ripe yet.)", "están", ["son", "es"]], ["La fiesta ___ en mi casa. (The party takes place at my house.)", "es", ["está", "son"]],
    ["Mi casa ___ en esa calle. (My house is located on that street.)", "está", ["es", "son"]]
  ], { h1: "Read the English meaning in brackets. Is it about what someone or something IS LIKE, or about how it is RIGHT NOW?", h2: "<b>Ser</b> says what something is like (a lasting quality, an event). <b>Estar</b> says how it is now (a feeling, a condition, a place).",
    h3: "Example: \"Pedro es nervioso\" (he is a nervous person) but \"Pedro está nervioso\" (he is nervous right now). Now do yours.",
    slides: [["The meaning changes!", "ser ↔ estar", "Some describing words change their meaning when you use <b>ser</b> or <b>estar</b>. The choice of verb tells the listener the idea."], ["Pairs to know", "es aburrido = is boring<br>está aburrido = is bored<br>es listo = is clever<br>está listo = is ready", "Also: <b>es malo</b> (is bad / naughty) vs <b>está malo</b> (is sick); <b>es verde</b> (is green) vs <b>está verde</b> (is unripe)."], ["Events and places", "La fiesta <b>es</b> en mi casa.<br>Mi casa <b>está</b> en la calle.", "An <b>event</b> takes place with <b>ser</b>. The <b>location of a thing</b> uses <b>estar</b>."]] });
  const festivals = RW([
    ["On which day do many children in the Spanish-speaking world get gifts from the Reyes Magos (Three Kings)?", "January 6", ["December 25", "March 1"], "The Reyes Magos arrive twelve days after Christmas."],
    ["Las Posadas are Christmas-time parties with songs and walks. Which country is famous for them?", "México", ["Chile", "Argentina"]], ["La Tomatina is a street party where people throw tomatoes. It happens in which country?", "España", ["Perú", "Cuba"]],
    ["Inti Raymi is an old festival honoring the sun. Which people started it?", "The Incas", ["The Mayas", "The Aztecs"]], ["A quinceañera celebrates a girl's ___ birthday.", "fifteenth", ["fifth", "tenth"], "Quince means fifteen."],
    ["The Carnaval de Barranquilla is a very big yearly party in which country?", "Colombia", ["Chile", "Bolivia"]], ["México celebrates its Independence Day in the month of ___ .", "September", ["March", "June"]],
    ["In Spain, many people eat twelve grapes at midnight on which night?", "New Year's Eve", ["Easter", "the first day of school"]], ["Chile's Fiestas Patrias (national holidays) are in ___ .", "September", ["February", "July"]]
  ], { h1: "Think about the country or the season. Where and when does this celebration happen?", h2: "Use what you learned in the slides and what you know about the world. Look for words like \"twelve days\", \"sun\" or \"Spain\".",
    h3: "Example: The Día de la Hispanidad is October 12 and the Día de los Reyes is January 6: each date has its own tradition. Now do yours.",
    slides: [["Celebrations", "🎉", "Every Spanish-speaking country has its own special days. Learning about them helps you understand the culture behind the words."], ["Famous parties", "Reyes Magos · Posadas · Tomatina · Inti Raymi", "On <b>January 6</b>, children get gifts from the <b>Reyes Magos</b>. <b>Las Posadas</b> are Christmas parties in México. <b>La Tomatina</b> is in Spain. <b>Inti Raymi</b> is an Inca sun festival in Perú."], ["More to know", "Quinceañera · Carnaval · Fiestas Patrias", "A <b>quinceañera</b> is a 15th birthday party. <b>Barranquilla</b> (Colombia) has a famous carnival. México and Chile celebrate their national days in September."]] });
  const CONN2 = SP("Joining words, part 2", [["aunque", "although"], ["sino", "but rather"], ["mientras", "while"], ["así que", "so"], ["ya que", "since, because"], ["tampoco", "neither, either"], ["a pesar de", "in spite of"], ["por lo tanto", "therefore"], ["en cambio", "on the other hand"], ["de repente", "suddenly"], ["todavía", "still, yet"], ["ya", "already"]]);
  const reading13 = RD([
    { t: "En mi ciudad, el alcalde pidió que todos los ciudadanos ayudaran a limpiar el parque. Mis amigos y yo llevamos bolsas y guantes. Aunque hacía mucho sol, trabajamos durante tres horas. Al final, el parque estaba limpio y el alcalde nos dio las gracias.",
      qs: [["What did the mayor ask for?", "help cleaning the park", ["help building a school", "help planting a garden"], "Find ayudaran a limpiar."], ["What was the weather like?", "very sunny", ["very rainy", "very cold"], "Find hacía mucho sol."], ["How long did they work?", "three hours", ["one hour", "all day"], "Find durante... horas."]] },
    { t: "Si yo fuera astronauta, viajaría a la Luna. Allí caminaría con saltos muy largos porque la gravedad es menor. Antes de salir, estudiaría mucho para que todo saliera bien. Ojalá algún día pueda ver la Tierra desde el espacio.",
      qs: [["Where would the writer travel?", "to the Moon", ["to the Sun", "to a desert"], "Find viajaría a..."], ["Why would the jumps be long?", "the gravity is smaller", ["the shoes are special", "there is no sky"], "Find porque."], ["What would the writer do before leaving?", "study a lot", ["sleep all day", "build a rocket"], "Find antes de salir."]] },
    { t: "El huracán se acercaba a la costa. Mi familia escuchó el pronóstico en la radio y decidió irse a casa de mis abuelos, que viven lejos del mar. Mi papá cerró las ventanas y mi mamá guardó agua y comida. Cuando el huracán pasó, todos estábamos seguros.",
      qs: [["Where did the family go?", "to the grandparents' house", ["to a hotel", "to school"], "Find irse a casa de..."], ["How did they hear about the hurricane?", "on the radio", ["in a letter", "from a neighbor"], "Find en la radio."], ["How did the story end?", "everyone was safe", ["the house was lost", "they moved away"], "Look at the last sentence."]] },
    { t: "Mi tío es ingeniero y trabaja construyendo puentes. Dice que lo más difícil no es el trabajo, sino hacerlo con cuidado. Cuando termina un puente, siempre lo cruza caminando para sentir que ha hecho algo útil. Yo quiero ser ingeniera cuando sea grande.",
      qs: [["What does the uncle do?", "builds bridges", ["paints houses", "flies planes"], "Find construyendo."], ["What does he do when a bridge is finished?", "walks across it", ["paints it", "closes it"], "Find lo cruza caminando."], ["What does the writer want to be?", "an engineer", ["a pilot", "a nurse"], "Find yo quiero ser..."]] }
  ], [["Reading at 6th grade", "📖", "The stories are longer now. Look for the key words and the small joining words (aunque, porque, sino) to follow the ideas."], ["Past wishes", "pidió que ayudaran", "You will see the past wish form: <b>pidió que ayudaran</b> (asked that they help). Both parts are in the past."], ["Strategy", "🔍", "Read the question first. Then find the sentence in the story with the same key word. The answer is usually right next to it."]]);
  const typ13 = TYE([].concat(GOV.items, CLIM.items, JOBS13.items, CONN2.items), "community, climate, careers and joining words");
  const L13 = [
    XL("Past wish form", impReg), XL("Special past wish verbs", impIrr), XL("If I were...", siFuera), XL("Let's do it!", letsDo),
    XL("Commands with little words", cmdPron), XL("When it hasn't happened yet", cuandoSub), XL("So that, before, unless", paraQue), XL("It just happened!", seMe),
    XL("Some and none", algun), XL("Community and government", V(GOV)), XL("Weather and climate", V(CLIM)), XL("Careers", V(JOBS13)),
    XL("Word families", families), XL("Ser or estar? The meaning changes", serEstar), XL("Celebrations", festivals), XL("Joining words, part 2", V(CONN2)),
    XL("Type it in Spanish", typ13), XL("Reading longer stories", reading13),
    XL("Mixed practice", MIX([impReg, impIrr, siFuera, letsDo, cuandoSub, V(CLIM)])),
    XL("Level 13 Challenge", MIX([impReg, impIrr, siFuera, letsDo, cmdPron, cuandoSub, paraQue, seMe, algun, V(GOV), V(CLIM), V(JOBS13), families, serEstar, festivals, V(CONN2), reading13, typ13]))
  ];

  // ======================= LEVEL 14 =======================
  const PART = [["hablar", "to speak", "hablado"], ["comer", "to eat", "comido"], ["vivir", "to live", "vivido"], ["hacer", "to do", "hecho"], ["escribir", "to write", "escrito"], ["ver", "to see", "visto"],
    ["volver", "to return", "vuelto"], ["abrir", "to open", "abierto"], ["decir", "to say", "dicho"], ["poner", "to put", "puesto"], ["llegar", "to arrive", "llegado"], ["romper", "to break", "roto"]];
  const mkP = aux => PART.map(([i, e, p]) => pp(aux, i, e, p));
  const hayaH = CJ({ verbs: mkP(HAYA), rule: SUBRULE, pre: "Espero que", tag: "I hope that... has done", title: "Haya + done word", pat: "he hablado → haya hablado<br>has comido → hayas comido",
    t1: "<b>Tap a line to hear it.</b> This is the <b>present perfect wish form</b>: it says that something HAS happened, and you hope, doubt or feel something about it.",
    t2: "Use the helper <b>haya, hayas, haya, hayamos, hayan</b> (the wish form of haber) + the done word (hablado, comido, vivido). The done word never changes. Use it after: <b>espero que, dudo que, me alegro de que</b>." });
  const FUT_RULE = {
    yo: "Use <b>hab-</b> plus the future ending. For yo, the ending is <b>-é</b> (with an accent). Then add the done word.", "tú": "Use <b>hab-</b> plus the future ending. For tú, the ending is <b>-ás</b>. Then add the done word.",
    "él": "Use <b>hab-</b> plus the future ending. For él / ella, the ending is <b>-á</b>. Then add the done word.", nosotros: "Use <b>hab-</b> plus the future ending. For nosotros, the ending is <b>-emos</b>. Then add the done word.",
    ellos: "Use <b>hab-</b> plus the future ending. For ellos, the ending is <b>-án</b>. Then add the done word."
  };
  const futPerf = CJ({ verbs: mkP(FUT), rule: FUT_RULE, pre: "Para el viernes,", tag: "will have done", title: "Habré + done word", pat: "habré terminado<br>habrás comido<br>habremos llegado",
    t1: "<b>Tap a line to hear it.</b> The <b>future perfect</b> says what WILL HAVE happened before a future time: <b>Para el viernes, habré terminado</b> = By Friday, I will have finished.",
    t2: "Use the future of <b>haber</b> (habré, habrás, habrá, habremos, habrán) + the done word. It is the same helper idea as \"he hablado\", but in the future." });
  const COND_RULE2 = {
    yo: "Use <b>habr-</b> plus the conditional ending. For yo, the ending is <b>-ía</b>. Then add the done word.", "tú": "Use <b>habr-</b> plus the conditional ending. For tú, the ending is <b>-ías</b>. Then add the done word.",
    "él": "Use <b>habr-</b> plus the conditional ending. For él / ella, the ending is <b>-ía</b>. Then add the done word.", nosotros: "Use <b>habr-</b> plus the conditional ending. For nosotros, the ending is <b>-íamos</b>. Then add the done word.",
    ellos: "Use <b>habr-</b> plus the conditional ending. For ellos, the ending is <b>-ían</b>. Then add the done word."
  };
  const condPerf = CJ({ verbs: mkP(CP), rule: COND_RULE2, pre: "Con más tiempo,", tag: "would have done", title: "Habría + done word", pat: "habría hablado<br>habrías comido<br>habríamos ido",
    t1: "<b>Tap a line to hear it.</b> The <b>conditional perfect</b> says what you WOULD HAVE done: <b>Con más tiempo, habría terminado</b> = With more time, I would have finished.",
    t2: "Use the conditional of <b>haber</b> (habría, habrías, habría, habríamos, habrían) + the done word. It is the \"would\" helper plus the done word." });
  const passive = RW([
    ["La carta fue ___ por Ana. (escribir)", "escrita", ["escrito", "escritas"]], ["Los libros fueron ___ por el maestro. (leer)", "leídos", ["leído", "leídas"]],
    ["La casa fue ___ en 1990. (construir)", "construida", ["construido", "construidas"]], ["Los cuadros fueron ___ por una artista. (pintar)", "pintados", ["pintado", "pintadas"]],
    ["El premio fue ___ por el equipo. (ganar)", "ganado", ["ganada", "ganados"]], ["Las puertas fueron ___ por el viento. (abrir)", "abiertas", ["abiertos", "abierta"]],
    ["Las pizzas fueron ___ por el cocinero. (preparar)", "preparadas", ["preparados", "preparada"]], ["La ciudad fue ___ hace mucho tiempo. (fundar)", "fundada", ["fundado", "fundadas"]],
    ["Los dibujos fueron ___ por los niños. (hacer)", "hechos", ["hecho", "hechas"]], ["La canción fue ___ por millones de personas. (cantar)", "cantada", ["cantado", "cantadas"]]
  ], { h1: "In these sentences, the action is done TO the subject. Find the subject (the thing that received the action). Is it masculine or feminine, one or many?", h2: "The done word works like an adjective: it must match the subject. -o for masculine, -a for feminine, and add -s for many.",
    h3: "Example: \"El cuento fue escrito por mi hermana\" (masculine, one) and \"Las cartas fueron escritas por mi hermana\" (feminine, many). Now do yours.",
    slides: [["The passive voice", "La casa fue construida.", "Sometimes the focus is on what RECEIVED the action: <b>La casa fue construida por mi abuelo</b> (The house was built by my grandfather)."], ["The pattern", "ser + done word + por", "Use <b>ser</b> + the done word + <b>por</b> (by). Ser can be in any tense: <b>fue</b> (was), <b>es</b> (is), <b>será</b> (will be)."], ["Match it!", "escrito · escrita · escritos · escritas", "The done word agrees with the subject: <b>El libro fue escrito</b>, <b>La carta fue escrita</b>, <b>Los libros fueron escritos</b>, <b>Las cartas fueron escritas</b>."]] });
  const estarPart = RW([
    ["La puerta está ___ . (abrir)", "abierta", ["abierto", "abiertas"]], ["Los niños están ___ después de correr. (cansar)", "cansados", ["cansado", "cansadas"]],
    ["La mesa está ___ . (poner)", "puesta", ["puesto", "puestas"]], ["Las ventanas están ___ . (romper)", "rotas", ["roto", "rotos"]],
    ["El trabajo está ___ . (terminar)", "terminado", ["terminada", "terminados"]], ["Mi hermana está ___ en el sofá. (sentar)", "sentada", ["sentado", "sentadas"]],
    ["Las luces están ___ . (apagar)", "apagadas", ["apagado", "apagados"]], ["El carro está ___ . (lavar)", "lavado", ["lavada", "lavados"]],
    ["La cena está ___ . (preparar)", "preparada", ["preparado", "preparadas"]], ["Los regalos están ___ . (envolver)", "envueltos", ["envuelto", "envueltas"]]
  ], { h1: "The sentence says what condition something is in. Who or what is it about: masculine or feminine, one or many?", h2: "<b>Estar</b> + the done word tells the RESULT of an action. The done word acts like an adjective: it matches the noun in gender and number.",
    h3: "Example: \"La ventana está cerrada\" (feminine, one) and \"Los libros están cerrados\" (masculine, many). Now do yours.",
    slides: [["Estar + done word", "La puerta está abierta.", "To say what condition something is in after an action is finished, use <b>estar</b> + the done word: <b>La puerta está abierta</b> (The door is open)."], ["It agrees", "cerrado · cerrada · cerrados · cerradas", "The done word is like an adjective. It matches the noun: <b>el libro está cerrado</b>, <b>las puertas están cerradas</b>."], ["Special ones", "abierto · roto · puesto · escrito · envuelto", "Some done words are irregular: <b>abrir → abierto</b>, <b>romper → roto</b>, <b>poner → puesto</b>, <b>escribir → escrito</b>, <b>envolver → envuelto</b>."]] });
  const cuyo = RW([
    ["Ese es el niño ___ madre es doctora. (whose)", "cuya", ["cuyo", "que"], "Cuyo agrees with the thing that belongs: \"madre\" is feminine singular."], ["Esa es la casa ___ techo es rojo. (whose)", "cuyo", ["cuya", "que"], "Cuyo agrees with the thing that belongs: \"techo\" is masculine singular."],
    ["Conozco a una niña ___ perro es muy grande. (whose)", "cuyo", ["cuya", "cuyos"], "Cuyo agrees with the thing that belongs: \"perro\" is masculine singular, not the girl."], ["No entiendo ___ dices. (what)", "lo que", ["el que", "cuyo"]],
    ["___ más me gusta es leer. (What)", "Lo que", ["Cuyo", "Quien"]], ["Dime ___ necesitas. (what)", "lo que", ["cuya", "quien"]],
    ["El libro, ___ compré ayer, es muy bueno. (that)", "que", ["cuyo", "lo que"]], ["Los amigos con ___ juego son simpáticos. (whom)", "quienes", ["lo que", "cuyo"]],
    ["Los vecinos, ___ casas son grandes, son amables. (whose)", "cuyas", ["cuyos", "que"], "Cuyas agrees with the thing that belongs: \"casas\" is feminine plural."], ["Eso es todo ___ sé. (what)", "lo que", ["cuyo", "quien"]]
  ], { h1: "Read the English hint in brackets. Is it \"what\" (a whole idea), \"whose\" (belonging to someone), \"whom\" (a person) or just \"that\"?", h2: "<b>Lo que</b> = what (an idea). <b>Cuyo / cuya</b> = whose, and it agrees with the thing that belongs. <b>Quien / quienes</b> = who, whom, for people.",
    h3: "Example: \"El niño cuyo libro está aquí\" (the boy whose book is here) and \"Es lo que quiero\" (it is what I want). Now do yours.",
    slides: [["Joining words that point back", "que · lo que · quien · cuyo", "These words join two ideas. <b>Que</b> = that. <b>Lo que</b> = what. <b>Quien</b> = who. <b>Cuyo</b> = whose."], ["Cuyo", "el niño cuya madre...", "<b>Cuyo</b> means \"whose\". It matches the thing that belongs, not the owner: <b>cuyo libro</b>, <b>cuya casa</b>, <b>cuyos libros</b>, <b>cuyas casas</b>."], ["Lo que", "Lo que quiero es agua.", "<b>Lo que</b> means \"what\" or \"the thing that\". It does not change. <b>No entiendo lo que dices</b> = I don't understand what you say."]] });
  const loAdj = RW([
    ["How do you say \"the good thing\"?", "lo bueno", ["el bueno", "buenamente"]], ["How do you say \"the important thing\"?", "lo importante", ["el importante", "importantemente"]],
    ["How do you say \"the difficult thing\"?", "lo difícil", ["la difícil", "difícilmente"]], ["What does \"lo mejor\" mean?", "the best thing", ["the best person", "better"]],
    ["What does \"lo malo\" mean?", "the bad thing", ["the bad person", "badly"]], ["Lo ___ de la escuela son los amigos. (the fun thing)", "divertido", ["divertida", "divertidos"]],
    ["Lo ___ es que todos ayudaron. (the good thing)", "bueno", ["buena", "buenos"]], ["Lo ___ de la tarea es que es larga. (the bad thing)", "malo", ["mala", "malos"]],
    ["Lo ___ fue ver a mi abuela. (the best thing)", "mejor", ["mejores", "mejoras"]], ["What does \"lo que más me gusta\" mean?", "what I like most", ["who I like most", "where I like most"]]
  ], { h1: "The little word <b>lo</b> turns a describing word into \"the ___ thing\". Does it talk about a thing or a person?", h2: "<b>Lo + describing word</b> always uses the masculine singular form. It never changes to -a or -s, because it is not about one particular noun.",
    h3: "Example: \"lo bonito\" (the pretty thing), \"lo triste\" (the sad thing). The describing word stays the same. Now do yours.",
    slides: [["Lo + adjective", "lo bueno · lo malo", "Put <b>lo</b> before a describing word to talk about an idea: <b>lo bueno</b> (the good thing), <b>lo malo</b> (the bad thing)."], ["Never changes", "lo importante · lo difícil", "After <b>lo</b>, the describing word stays masculine and singular: <b>lo importante</b>, <b>lo bonito</b>, <b>lo divertido</b>."], ["In a sentence", "Lo mejor es el final.", "<b>Lo mejor de mi día es el recreo.</b> (The best thing about my day is recess.) <b>Lo que más me gusta</b> = what I like most."]] });
  const reported = RW([
    ["Ana dijo: \"Tengo hambre.\" → Ana dijo que ___ hambre.", "tenía", ["tiene", "tendrá"]], ["Juan dijo: \"Voy al parque.\" → Juan dijo que ___ al parque.", "iba", ["va", "fue"]],
    ["Mi mamá dijo: \"Estoy cansada.\" → Mi mamá dijo que ___ cansada.", "estaba", ["está", "estuvo"]], ["Ellos dijeron: \"Queremos pizza.\" → Dijeron que ___ pizza.", "querían", ["quieren", "quisieron"]],
    ["El maestro dijo: \"Hablo español.\" → Dijo que ___ español.", "hablaba", ["habla", "habló"]], ["Yo dije: \"Me gusta el helado.\" → Dije que me ___ el helado.", "gustaba", ["gusta", "gustó"]],
    ["Ella preguntó: \"¿Dónde vives?\" → Ella preguntó dónde ___ .", "vivía", ["vives", "vivió"]], ["Mi hermano dijo: \"Leo un libro.\" → Dijo que ___ un libro.", "leía", ["lee", "leyó"]],
    ["Carlos dijo: \"Vivimos aquí.\" → Carlos dijo que ___ aquí.", "vivían", ["viven", "vivimos"]], ["Tú dijiste: \"Tengo una idea.\" → Dijiste que ___ una idea.", "tenías", ["tienes", "tuviste"]]
  ], { h1: "You are telling what someone SAID earlier. So the story is told in the past. Which kind of past is used for a state or an ongoing action?", h2: "When you report with \"dijo que\", move the verb back one step: the present becomes the <b>imperfect</b> (-aba, -ía). The verb must also match the new speaker.",
    h3: "Example: Pedro dijo: \"Como pan\" → Pedro dijo que <b>comía</b> pan. Present (como) becomes imperfect (comía). Now do yours.",
    slides: [["Telling what someone said", "dijo que...", "To report words, use <b>dijo que</b> (said that) or <b>preguntó</b> (asked), then change the verb to match the past."], ["Present → imperfect", "\"Tengo\" → dijo que tenía<br>\"Voy\" → dijo que iba", "The present tense turns into the <b>imperfect</b>: tengo → tenía, voy → iba, estoy → estaba, quiero → quería."], ["Check the person!", "Yo dije: \"Me gusta\" → Dije que me gustaba", "Also check who is talking. If you say \"Dijiste: tengo\", it becomes \"Dijiste que tenías\" because the speaker is now \"tú\"."]] });
  const impers = RW([
    ["___ estudiar para sacar buenas notas. (One must)", "Hay que", ["Hay de", "Hace que"]], ["___ más sillas en la sala. (We need more chairs)", "Hacen falta", ["Hace falta", "Hay falta"], "\"Hacer falta\" means \"to be needed\". The thing that is needed is \"sillas\" (plural)."],
    ["___ lavarse las manos. (It is necessary)", "Es necesario", ["Es necesaria", "Ser necesario"]], ["Se ___ respetar a los demás. (One should)", "debe", ["debo", "deben"]],
    ["Está prohibido ___ en la biblioteca. (to shout)", "gritar", ["grito", "gritando"]], ["No ___ correr en la piscina. (One must not)", "hay que", ["se hay", "es hay"]],
    ["___ paciencia para aprender un idioma. (Patience is needed)", "Hace falta", ["Hacen falta", "Hacemos falta"], "\"Hacer falta\" means \"to be needed\". The thing that is needed is \"paciencia\" (singular)."], ["Es importante ___ mucha agua. (to drink)", "beber", ["bebo", "bebiendo"]],
    ["Se ___ muchas frutas en este mercado. (are sold)", "venden", ["vende", "vendo"], "The thing being sold is \"muchas frutas\" (plural)."], ["En esta casa se ___ español. (is spoken)", "habla", ["hablan", "hablo"], "The thing being spoken is \"español\" (singular)."]
  ], { h1: "These sentences talk about rules and needs for everyone, not for one person. Which phrase fits the meaning in brackets?", h2: "<b>Hay que</b> + infinitive = one must. <b>Es necesario</b> + infinitive = it is necessary. <b>Hace falta</b> = is needed (it agrees with what is needed). <b>Se</b> + verb = people do it.",
    h3: "Example: \"Hay que dormir ocho horas\" (One must sleep eight hours) and \"Hace falta agua\" (Water is needed). Now do yours.",
    slides: [["Rules for everyone", "Hay que · Es necesario", "To say what ANYONE should do, use <b>hay que</b> + infinitive: <b>Hay que respetar</b> (One must respect). Or <b>Es necesario</b> + infinitive."], ["What is needed", "Hace falta · Hacen falta", "<b>Hace falta paciencia</b> (patience is needed). <b>Hacen falta sillas</b> (chairs are needed). The verb agrees with the thing that is needed."], ["Se + verb", "Se habla español.<br>Se venden frutas.", "<b>Se</b> + verb says what people do in general: <b>Se habla español</b> (Spanish is spoken)."]] });
  const SAFE = SP("Staying safe online", [["contraseña", "password", "🔑"], ["usuario", "user"], ["privado", "private"], ["seguro", "safe, secure"], ["red", "network"], ["descargar", "to download"], ["enlace", "link"], ["mensaje", "message", "💬"], ["cuenta", "account"], ["proteger", "to protect"], ["navegador", "browser"], ["compartir", "to share"]]);
  const ECO = SP("Ecosystems", [["ecosistema", "ecosystem"], ["hábitat", "habitat"], ["especie", "species"], ["cadena alimenticia", "food chain"], ["selva", "jungle", "🌴"], ["desierto", "desert", "🏜️"], ["arrecife", "coral reef", "🪸"], ["pantano", "swamp"], ["pradera", "prairie"], ["bosque", "forest", "🌲"], ["glaciar", "glacier", "🧊"], ["extinción", "extinction"]]);
  const BUILD = SP("Buildings and bridges", [["rascacielos", "skyscraper", "🏙️"], ["puente", "bridge", "🌉"], ["edificio", "building", "🏢"], ["plaza", "square"], ["estatua", "statue", "🗽"], ["museo", "museum", "🏛️"], ["acera", "sidewalk"], ["semáforo", "traffic light", "🚦"], ["torre", "tower", "🗼"], ["castillo", "castle", "🏰"], ["catedral", "cathedral", "⛪"], ["fuente", "fountain", "⛲"], ["mercado", "market"]]);
  const PERS = SP("What kind of person?", [["amable", "kind"], ["generoso", "generous"], ["honesto", "honest"], ["paciente", "patient"], ["tímido", "shy"], ["valiente", "brave"], ["perezoso", "lazy"], ["curioso", "curious"], ["orgulloso", "proud"], ["trabajador", "hard-working"], ["travieso", "mischievous"], ["creativo", "creative"]]);
  const famous = RW([
    ["Who wrote the famous book <i>Don Quijote</i>?", "Miguel de Cervantes", ["Pablo Neruda", "Gabriel García Márquez"]], ["Gabriela Mistral won the Nobel Prize in Literature in 1945. She was a poet from which country?", "Chile", ["Cuba", "España"]],
    ["Frida Kahlo, famous for her colorful self-portraits, was from which country?", "México", ["Argentina", "Perú"]], ["Which artist from Spain made many famous paintings and sculptures during the 1900s?", "Pablo Picasso", ["Frida Kahlo", "Antoni Gaudí"], "He was born in Málaga, Spain, in 1881."],
    ["Antoni Gaudí designed the Sagrada Familia, a famous church in which city?", "Barcelona", ["Madrid", "Sevilla"]], ["Gabriel García Márquez, who wrote <i>Cien años de soledad</i>, was from which country?", "Colombia", ["Argentina", "Perú"]],
    ["Diego Rivera is famous for his giant wall paintings, called ___ .", "murals", ["portraits", "sculptures"]], ["In <i>Don Quijote</i>, the knight's helper is named ___ .", "Sancho Panza", ["Santiago Pérez", "Simón Bolívar"]],
    ["Simón Bolívar, called \"El Libertador\", helped free several countries in ___ .", "South America", ["Europe", "Africa"]], ["Pablo Neruda, who won the Nobel Prize in 1971, was a famous ___ from Chile.", "poet", ["pilot", "painter"]]
  ], { h1: "Think about who made each famous work, and which country or city they are connected to.", h2: "Use what you learned in the slides. Think of a map: where is each person from?",
    h3: "Example: Isabel Allende is a writer from Chile who wrote <i>La casa de los espíritus</i>. Match people to their country and their art. Now do yours.",
    slides: [["Famous names", "📚🎨", "Spanish-speaking countries have given the world great writers, painters and builders. Knowing them helps you understand the culture."], ["Writers", "Cervantes · Mistral · Neruda · García Márquez", "<b>Cervantes</b> (Spain) wrote <i>Don Quijote</i>. <b>Gabriela Mistral</b> and <b>Pablo Neruda</b> (Chile) were poets and Nobel winners. <b>García Márquez</b> (Colombia) wrote <i>Cien años de soledad</i>."], ["Artists and builders", "Picasso · Kahlo · Rivera · Gaudí", "<b>Picasso</b> (Spain) painted. <b>Frida Kahlo</b> and <b>Diego Rivera</b> (México) made famous paintings and murals. <b>Gaudí</b> designed the Sagrada Familia in Barcelona."]] });
  const rhymes = RW([
    ["Which word rhymes with <b>gato</b>?", "zapato", ["perro", "pelota"]], ["Which word rhymes with <b>luna</b>?", "cuna", ["sol", "mar"]],
    ["Which word rhymes with <b>canción</b>?", "corazón", ["cantar", "cama"]], ["Which word rhymes with <b>flor</b>?", "color", ["flora", "fuego"]],
    ["Which word rhymes with <b>mar</b>?", "cantar", ["mano", "luz"]], ["Which word rhymes with <b>sol</b>?", "farol", ["luna", "cielo"]],
    ["Which word rhymes with <b>casa</b>?", "masa", ["cosa", "mesa"]], ["Which word rhymes with <b>pelo</b>?", "caramelo", ["pelota", "pie"]],
    ["Which word rhymes with <b>amigo</b>?", "abrigo", ["amiga", "amar"]], ["Which word rhymes with <b>día</b>?", "alegría", ["noche", "mes"]]
  ], { h1: "Rhymes sound the same at the END. Say each word out loud and listen to the last sounds.", h2: "Look at the last two or three letters. A rhyme has the same ending, from the last stressed vowel to the end of the word.",
    h3: "Example: <b>corazón</b> and <b>canción</b> both end in <b>-ón</b>, and <b>rosa</b> and <b>hermosa</b> both end in <b>-osa</b>. Now do yours.",
    slides: [["Rhymes in poems", "🎶", "Many Spanish songs and poems use rhymes. Words rhyme when their endings sound the same."], ["Same ending", "canción · corazón<br>flor · color", "<b>Canción</b> and <b>corazón</b> both end in <b>-ón</b>. <b>Flor</b> and <b>color</b> both end in <b>-or</b>. Say them out loud to hear it."], ["A tiny poem", "Brilla la luna<br>sobre la cuna.", "<b>Luna</b> and <b>cuna</b> rhyme. Try to make your own two-line poem with a pair of rhyming words!"]] });
  const building = RW([
    ["A person who works (<b>trabajar</b>) is a ___ .", "trabajador", ["trabajo", "trabajar"]], ["A person who sells (<b>vender</b>) is a ___ .", "vendedor", ["venta", "vendido"]],
    ["The act of creating (<b>crear</b>) is the ___ .", "creación", ["creativo", "crear"]], ["Informing (<b>informar</b>) gives us the ___ .", "información", ["informado", "informar"]],
    ["The act of moving (<b>mover</b>) is a ___ .", "movimiento", ["movedor", "movido"]], ["The quality of being free (<b>libre</b>) is ___ .", "libertad", ["libremente", "liberar"]],
    ["The quality of being happy (<b>feliz</b>) is ___ .", "felicidad", ["feliz", "felizmente"]], ["A person who plays (<b>jugar</b>) is a ___ .", "jugador", ["juego", "jugado"]],
    ["A person who explores (<b>explorar</b>) is an ___ .", "explorador", ["exploración", "explorado"]], ["The act of building (<b>construir</b>) is the ___ .", "construcción", ["constructor", "construido"]],
    ["The quality of being sad (<b>triste</b>) is ___ .", "tristeza", ["tristemente", "tristes"]]
  ], { h1: "Find the root word, then decide: is the answer a PERSON, an ACTION, or a QUALITY?", h2: "A <b>person</b> ends in <b>-dor</b>. An <b>action</b> ends in <b>-ción</b> or <b>-miento</b>. A <b>quality</b> ends in <b>-dad</b> or <b>-eza</b>.",
    h3: "Example: <b>hablar</b> → <b>hablador</b> (a talker); <b>sentir</b> → <b>sentimiento</b> (a feeling); <b>bueno</b> → <b>bondad</b> (kindness). Now do yours.",
    slides: [["Building words", "verb + ending = noun", "Spanish builds new nouns from verbs and adjectives by adding endings. If you know the ending, you can guess the meaning."], ["From verbs", "-dor · -ción · -miento", "<b>trabajar → trabajador</b> (worker), <b>crear → creación</b> (creation), <b>mover → movimiento</b> (movement)."], ["From adjectives", "-dad · -eza", "<b>libre → libertad</b> (freedom), <b>feliz → felicidad</b> (happiness), <b>triste → tristeza</b> (sadness). Many match English: -dad = -ty, -ción = -tion."]] });
  const reading14 = RD([
    { t: "En la selva viven miles de especies de animales y plantas. Cada una tiene un papel importante en el ecosistema. Si una especie desaparece, otras pueden tener problemas. Por eso muchos científicos trabajan para proteger los hábitats antes de que sea demasiado tarde.",
      qs: [["What lives in the jungle?", "thousands of species", ["only a few animals", "only plants"], "Find miles de especies."], ["What can happen if one species disappears?", "other species can have problems", ["nothing changes", "the jungle gets bigger"], "Find si una especie desaparece."], ["What do scientists try to protect?", "habitats", ["buildings", "roads"], "Find proteger."]] },
    { t: "Lucía recibió un mensaje de alguien que no conocía. Le pedía su contraseña y su dirección. Lucía no respondió. Se lo mostró a su papá y bloquearon el mensaje. Su papá dijo que había hecho lo correcto.",
      qs: [["What did the message ask for?", "her password and address", ["her favorite color", "her homework"], "Find le pedía."], ["What did Lucía do?", "she did not answer and showed her dad", ["she sent her password", "she deleted her account"], "Find no respondió."], ["What did her dad say?", "she did the right thing", ["she was in trouble", "she should have answered"], "Look at the last sentence."]] },
    { t: "Antoni Gaudí fue un arquitecto español. Diseñó edificios con formas que parecen olas, flores y animales. Su obra más famosa es la Sagrada Familia, una iglesia en Barcelona que todavía se está construyendo. Muchas personas viajan a la ciudad para verla.",
      qs: [["What was Gaudí?", "an architect", ["a painter", "a singer"], "Find fue un..."], ["What is his most famous work?", "the Sagrada Familia", ["a bridge", "a museum"], "Find su obra más famosa."], ["What is special about the Sagrada Familia?", "it is still being built", ["it is very small", "it is underwater"], "Find todavía."]] },
    { t: "Mateo encontró una billetera en la calle. Tenía dinero y una tarjeta con un nombre. Aunque quería comprar un videojuego nuevo, decidió llevarla a la estación de policía. Al día siguiente, el dueño vino a darle las gracias. Mateo se sintió orgulloso de haber sido honesto.",
      qs: [["What did Mateo find?", "a wallet", ["a phone", "a dog"], "Find encontró."], ["What did he do with it?", "he took it to the police station", ["he kept it", "he spent the money"], "Find decidió llevarla."], ["How did he feel in the end?", "proud", ["angry", "scared"], "Find se sintió."]] }
  ], [["Longer reading", "📖", "Stories keep getting longer. Read the whole thing once, then read each question and look for the key words."], ["Clues", "aunque · por eso · antes de que", "Joining words show how ideas connect: <b>aunque</b> (although), <b>por eso</b> (that is why), <b>antes de que</b> (before)."], ["Strategy", "🔍", "If you do not know a word, look at the words around it. Many Spanish words look like English ones."]]);
  const typ14 = TYE([].concat(SAFE.items, ECO.items, BUILD.items, PERS.items), "staying safe online, ecosystems, buildings and personality");
  const L14 = [
    XL("I hope you have...", hayaH), XL("I will have done", futPerf), XL("I would have done", condPerf), XL("It was done by...", passive),
    XL("Estar + done word", estarPart), XL("Whose? What?", cuyo), XL("Lo bueno, lo malo", loAdj), XL("Telling what someone said", reported),
    XL("Rules for everyone", impers), XL("Staying safe online", V(SAFE, "Never share your password with anyone except a parent. If a message asks for private information, do not answer and tell an adult.")), XL("Ecosystems", V(ECO)), XL("Buildings and bridges", V(BUILD)),
    XL("What kind of person?", V(PERS)), XL("Famous names", famous), XL("Rhymes and poems", rhymes), XL("Building words", building),
    XL("Type it in Spanish", typ14), XL("Reading longer stories", reading14),
    XL("Mixed practice", MIX([hayaH, futPerf, condPerf, passive, estarPart, V(ECO)])),
    XL("Level 14 Challenge", MIX([hayaH, futPerf, condPerf, passive, estarPart, cuyo, loAdj, reported, impers, V(SAFE), V(ECO), V(BUILD), V(PERS), famous, rhymes, building, reading14, typ14, impReg, siFuera]))
  ];

  // ======================= LEVEL 15 =======================
  const PART15 = [["estudiar", "to study", "estudiado"], ["saber", "to know", "sabido"], ["venir", "to come", "venido"], ["hacer", "to do", "hecho"], ["ver", "to see", "visto"], ["ir", "to go", "ido"],
    ["escribir", "to write", "escrito"], ["comer", "to eat", "comido"], ["llamar", "to call", "llamado"], ["salir", "to leave", "salido"], ["decir", "to say", "dicho"], ["tener", "to have", "tenido"]];
  const hubV = CJ({ verbs: PART15.map(([i, e, p]) => pp(HUB, i, e, p)), rule: SUBRULE, pre: "Si", tag: "if... had done", title: "Hubiera + done word", pat: "había estudiado → hubiera estudiado<br>habías venido → hubieras venido",
    t1: "<b>Tap a line to hear it.</b> This is the <b>past perfect wish form</b>. It imagines what could have been different in the past: <b>Si hubiera estudiado...</b> = If I had studied...",
    t2: "Use the helper <b>hubiera, hubieras, hubiera, hubiéramos, hubieran</b> + the done word. It is the past wish form of <b>haber</b> (the -ra form) plus the done word." });
  const thirdCond = RW([
    ["Si hubiera sabido, te ___ antes. (llamar, yo)", "habría llamado", ["llamaría", "llamé"]], ["Si ___ más temprano, habríamos llegado a tiempo. (salir, nosotros)", "hubiéramos salido", ["salimos", "saldríamos"]],
    ["Si ella hubiera estudiado, ___ el examen. (aprobar)", "habría aprobado", ["aprobaría", "aprobó"]], ["Si hubieras venido, ___ mucho. (divertirse, tú)", "te habrías divertido", ["te divertirías", "te divertiste"]],
    ["Si ___ dinero, habría comprado la bici. (tener, yo)", "hubiera tenido", ["tuve", "tendría"]], ["Si no hubiera llovido, ___ al parque. (ir, nosotros)", "habríamos ido", ["iríamos", "fuimos"]],
    ["Si ellos ___ el mapa, no se habrían perdido. (llevar)", "hubieran llevado", ["llevaron", "llevarían"]], ["Si hubieras llamado, yo te ___ ayudado. (helper: haber)", "habría", ["hubiste", "había"]],
    ["Si hubiera hecho sol, ___ la playa. (visitar, yo)", "habría visitado", ["visitaría", "visité"]], ["Si ___ el autobús, no habría llegado tarde. (tomar, yo)", "hubiera tomado", ["tomé", "tomaría"]]
  ], { h1: "This is about the PAST and about something that did NOT happen. Look at both parts of the sentence.", h2: "The <b>si</b> part uses <b>hubiera + done word</b> (what you wish had happened). The result part uses <b>habría + done word</b> (what would have happened).",
    h3: "Example: \"Si hubiera comido, no habría tenido hambre\" (If I had eaten, I would not have been hungry). Si-part = hubiera, result = habría. Now do yours.",
    slides: [["What could have been", "Si hubiera...", "Use this to imagine a different past: <b>Si hubiera estudiado, habría aprobado</b> (If I had studied, I would have passed)."], ["Two helpers", "si + hubiera + done word<br>habría + done word", "The <b>si</b> part uses <b>hubiera</b> + done word. The result part uses <b>habría</b> + done word."], ["Compare", "Si tuviera... → Si hubiera tenido...", "<b>Si tuviera tiempo, viajaría</b> (pretend, now). <b>Si hubiera tenido tiempo, habría viajado</b> (pretend, in the past)."]] });
  const aunqueR = RW([
    ["Aunque ___ frío, salgo. (it IS cold right now; hacer)", "hace", ["haga", "hacía"], "The English says it IS cold: that is a fact, so use the normal form."], ["Aunque ___ mañana, iremos. (it MIGHT rain; llover)", "llueva", ["llueve", "llovió"], "The English says it might rain: it is not sure, so use the wish form."],
    ["Aunque ella ___ cansada ahora, sigue trabajando. (she IS tired; estar)", "está", ["esté", "estuvo"], "She is tired right now: that is a fact."], ["Aunque no ___ tiempo mañana, te ayudaré. (maybe I won't have time; tener)", "tenga", ["tengo", "tenía"], "Maybe means it is not sure."],
    ["Aunque ___ mucho dinero, no lo gasto. (I DO have a lot; tener)", "tengo", ["tenga", "tuve"], "It says I do have it: a fact."], ["Aunque ellos no ___ , empezaremos. (maybe they won't come; venir)", "vengan", ["vienen", "venían"], "We do not know if they will come."],
    ["Aunque ___ difícil, lo intentaré. (it IS difficult; ser)", "es", ["sea", "fue"], "It is difficult: that is a fact."], ["Aunque él se ___ , diré la verdad. (maybe he'll get angry; enojar)", "enoje", ["enoja", "enojó"], "Maybe means it is not sure yet."],
    ["Aunque ___ tarde, quiero terminar. (it IS late right now; ser)", "es", ["sea", "era"], "It is late right now: that is a fact."]
  ], { h1: "Read the English clue in brackets. Is the \"although\" part a FACT, or something that MIGHT be true?", h2: "<b>Aunque</b> + a fact (you know it is true) → normal form. <b>Aunque</b> + something uncertain (maybe) → wish form (subjunctive).",
    h3: "Example: \"Aunque llueve, salgo\" (it is raining: fact) but \"Aunque llueva, saldré\" (even if it rains: maybe). Now do yours.",
    slides: [["Aunque = although, even if", "aunque", "<b>Aunque</b> joins two ideas that seem opposite. It can mean \"although\" (a fact) or \"even if\" (not sure)."], ["Fact or maybe?", "Aunque hace frío, salgo.<br>Aunque haga frío, saldré.", "A <b>fact</b> uses the normal form: <b>Aunque hace frío</b> (although it is cold). A <b>maybe</b> uses the wish form: <b>Aunque haga frío</b> (even if it is cold)."], ["Tip", "🧭", "Ask yourself: do I know that it is true? Yes → normal. Not sure → wish form."]] });
  const adjClause = RW([
    ["Busco un libro que ___ interesante. (I don't know if it exists; ser)", "sea", ["es", "fue"], "I am looking for it, so I have not found it: it may not exist."], ["Tengo un libro que ___ interesante. (I own it; ser)", "es", ["sea", "fue"], "I have it, so it is a known thing."],
    ["Necesito un maestro que ___ español. (hablar)", "hable", ["habla", "habló"], "I need one, but I have not found one yet."], ["Conozco a una niña que ___ cinco idiomas. (hablar)", "habla", ["hable", "habló"], "I know her, so she exists."],
    ["¿Hay alguien que me ___ ayudar? (poder)", "pueda", ["puede", "podía"], "I don't know if anyone exists who can help."], ["No hay nadie que ___ la respuesta. (saber)", "sepa", ["sabe", "sabía"], "Nobody exists, so it is not a known person."],
    ["Quiero un carro que ___ rápido. (I haven't chosen one; ser)", "sea", ["es", "era"], "I have not chosen one yet."], ["Vivo en una casa que ___ un jardín. (tener)", "tiene", ["tenga", "tuvo"], "I live in it, so it is a real, known house."],
    ["Buscamos una escuela que ___ música. (enseñar)", "enseñe", ["enseña", "enseñó"], "We are searching for it, so it may not exist."], ["Tengo una amiga que ___ en México. (vivir)", "vive", ["viva", "vivía"], "I have her, so she exists."]
  ], { h1: "Does the thing the sentence describes definitely EXIST, or is it something someone is looking for, wants or doubts?", h2: "A known, real thing → normal form. A thing you are looking for, need or want (maybe it doesn't exist) → wish form (subjunctive). \"Nobody / nothing\" also uses the wish form.",
    h3: "Example: \"Tengo un amigo que juega\" (I have him) but \"Busco un amigo que juegue\" (I am looking for one). Now do yours.",
    slides: [["Known or unknown?", "que + ?", "When you describe a thing with <b>que</b>, the verb depends on whether you know the thing exists."], ["Known = normal", "Tengo un amigo que habla francés.", "If the thing or person exists and you know it, use the normal verb: <b>Tengo un amigo que habla francés.</b>"], ["Unknown = wish form", "Busco un amigo que hable francés.<br>No hay nadie que sepa.", "If you are looking for it, want it, or it may not exist, use the wish form: <b>Busco un amigo que hable francés.</b>"]] });
  const sequence = RW([
    ["Mi mamá quiere que yo ___ la cena hoy. (preparar)", "prepare", ["preparara", "preparo"], "Quiere is in the present."], ["Mi mamá quería que yo ___ la cena. (preparar)", "preparara", ["prepare", "preparo"], "Quería is in the past."],
    ["Espero que ___ buen tiempo hoy. (hacer)", "haga", ["hiciera", "hace"], "Espero is in the present."], ["Esperaba que ___ buen tiempo. (hacer)", "hiciera", ["haga", "hace"], "Esperaba is in the past."],
    ["El maestro pidió que nosotros ___ en silencio. (trabajar)", "trabajáramos", ["trabajemos", "trabajamos"], "Pidió is in the past."], ["Ellos dudan que ___ verdad. (ser)", "sea", ["fuera", "es"], "Dudan is in the present."],
    ["Ellos dudaban que ___ verdad. (ser)", "fuera", ["sea", "es"], "Dudaban is in the past."], ["Prefiero que tú me ___ hoy. (llamar)", "llames", ["llamaras", "llamas"], "Prefiero is in the present."],
    ["Le dije a Ana que ___ la puerta. (cerrar)", "cerrara", ["cierre", "cierra"], "Dije is in the past."], ["Es importante que tú ___ temprano. (llegar)", "llegues", ["llegaras", "llegas"], "Es is in the present."]
  ], { h1: "Look at the first verb in the sentence (the one before <b>que</b>). Is it in the present or in the past?", h2: "A <b>present</b> first verb → the present wish form (-e / -a). A <b>past</b> first verb → the past wish form (-ra).",
    h3: "Example: \"Quiero que vengas\" (present) but \"Quería que vinieras\" (past). Venir: vengas → vinieras. Now do yours.",
    slides: [["Matching times", "Quiero que... / Quería que...", "In a sentence with <b>que</b>, the two verbs usually match in time. If the first one is in the present, the wish verb is in the present wish form."], ["Present", "Espero que llueva.<br>Quiero que vengas.", "<b>Present</b> wish → present wish form: <b>espero que llueva</b>, <b>quiero que vengas</b>."], ["Past", "Esperaba que lloviera.<br>Quería que vinieras.", "<b>Past</b> wish → past wish form (-ra): <b>esperaba que lloviera</b>, <b>quería que vinieras</b>."]] });
  const interrupt = RW([
    ["Mientras yo ___ , sonó el teléfono. (leer)", "leía", ["leí", "leo"], "A long action in the background."], ["Cuando llegué, ellos ___ la cena. (preparar)", "preparaban", ["prepararon", "prepararán"], "They were in the middle of it when I arrived."],
    ["Ayer ___ a las ocho. (despertarse, yo)", "me desperté", ["me despertaba", "me despierto"], "One finished action at a certain time."], ["Todos los veranos ___ a la playa. (ir, nosotros)", "íbamos", ["fuimos", "iremos"], "Todos los veranos is a repeated habit in the past."],
    ["De repente, ___ una luz. (apagarse)", "se apagó", ["se apagaba", "se apagará"], "De repente (suddenly) is one quick action."], ["Hacía sol y los pájaros ___ . (cantar)", "cantaban", ["cantaron", "cantan"], "It describes the scene."],
    ["Un día, mi abuelo me ___ un regalo. (dar)", "dio", ["daba", "da"], "Un día (one day) is a single event."], ["Cuando era niña, ___ miedo de la oscuridad. (tener, yo)", "tenía", ["tuve", "tengo"], "Cuando era niña describes a long period."],
    ["Ayer ___ tres películas. (ver, nosotros)", "vimos", ["veíamos", "veremos"], "Ayer (yesterday) is a finished action."], ["Mientras comíamos, mi hermano ___ un chiste. (contar)", "contó", ["contaba", "cuenta"], "One quick event happened while we were eating."]
  ], { h1: "Is the verb a background / repeated action, or one finished action that happened at a certain moment?", h2: "<b>Imperfect</b> (-aba, -ía): the scene, a habit, an action in progress. <b>Preterite</b> (-é, -ó, -aron): one finished event, a sudden interruption.",
    h3: "Example: \"Yo dormía cuando sonó el teléfono\": dormía (in progress), sonó (interruption). Now do yours.",
    slides: [["Telling a story", "imperfect + preterite", "A good story mixes two past tenses: one paints the <b>scene</b>, the other tells the <b>events</b>."], ["The background", "Hacía sol.<br>Leía un libro.", "<b>Imperfect</b> is for the background: weather, feelings, habits, what was going on: <b>hacía sol, leía, íbamos</b>."], ["The interruption", "Leía cuando sonó el teléfono.", "<b>Preterite</b> is for something that happened and was done, or suddenly interrupted: <b>sonó, llegué, vimos</b>. Look for: de repente, ayer, un día."]] });
  const seguirEtc = RW([
    ["Sigo ___ el piano. (I still play)", "tocando", ["tocar", "toco"]], ["Llevo dos horas ___ . (I've been studying)", "estudiando", ["estudiar", "estudio"]],
    ["Suelo ___ temprano. (I usually wake up)", "levantarme", ["levantando", "levanté"]], ["Acabo de ___ la tarea. (I just finished)", "terminar", ["terminando", "terminé"]],
    ["Volvió a ___ . (It rained again)", "llover", ["lloviendo", "llovió"]], ["Mis amigos siguen ___ en el parque. (still playing)", "jugando", ["jugar", "juegan"]],
    ["Ella suele ___ un libro antes de dormir. (usually reads)", "leer", ["leyendo", "leyó"]], ["Acabamos de ___ a casa. (we just arrived)", "llegar", ["llegando", "llegamos"]],
    ["Llevamos tres años ___ español. (studying)", "aprendiendo", ["aprender", "aprendemos"]], ["Vuelvo a ___ el examen mañana. (I take it again)", "hacer", ["haciendo", "hice"]]
  ], { h1: "Look at the helper verb before the blank (sigo, llevo, suelo, acabo de, vuelvo a). Each one needs a certain kind of verb after it.", h2: "<b>Seguir</b> and <b>llevar</b> + time are followed by <b>-ando / -iendo</b>. <b>Soler</b>, <b>acabar de</b> and <b>volver a</b> are followed by the <b>infinitive</b> (-ar, -er, -ir).",
    h3: "Example: \"Sigo cantando\" (I keep singing) and \"Acabo de cantar\" (I just sang). Now do yours.",
    slides: [["Helper verbs", "seguir · llevar · soler · acabar de · volver a", "Some verbs help another verb. They tell us if an action goes on, repeats or has just happened."], ["With -ando / -iendo", "Sigo estudiando.<br>Llevo dos horas leyendo.", "<b>Seguir</b> (to keep on) and <b>llevar</b> + time (have been ...-ing) use the -ando / -iendo form."], ["With the infinitive", "Suelo correr.<br>Acabo de comer.<br>Vuelvo a intentar.", "<b>Soler</b> (usually), <b>acabar de</b> (just did) and <b>volver a</b> (do again) use the infinitive."]] });
  const reciprocal = RW([
    ["Mis hermanos ___ quieren mucho. (love each other)", "se", ["nos", "les"]], ["Tú y yo ___ vemos todos los días. (see each other)", "nos", ["se", "te"]],
    ["Los amigos ___ escriben cartas. (write to each other)", "se", ["me", "nos"]], ["Las niñas ___ abrazan. (hug each other)", "se", ["nos", "les"]],
    ["Nosotros ___ ayudamos con la tarea. (help each other)", "nos", ["se", "me"]], ["Ana y Luis ___ hablan por teléfono. (talk to each other)", "se", ["les", "nos"]],
    ["What does \"Ellos se ayudan\" mean?", "They help each other.", ["They help themselves.", "He helps them."]], ["What does \"Nos saludamos\" mean?", "We greet each other.", ["We greet them.", "I greet you."]],
    ["Ustedes ___ conocen bien. (know each other)", "se", ["nos", "les"]], ["Mi mejor amiga y yo ___ contamos todo. (tell each other)", "nos", ["se", "me"]]
  ], { h1: "\"Each other\" means two or more people do the same thing to one another. Who is doing it: nosotros, ellos or ustedes?", h2: "For <b>nosotros</b> (we), use <b>nos</b>. For <b>ellos / ellas / ustedes</b>, use <b>se</b>. The verb is always plural.",
    h3: "Example: \"Mis primos se visitan\" (my cousins visit each other) and \"Nos visitamos\" (we visit each other). Now do yours.",
    slides: [["Each other", "se · nos", "When two or more people do something to each other, use the plural reflexive words <b>nos</b> or <b>se</b>."], ["Examples", "Nos ayudamos.<br>Se quieren mucho.", "<b>Nos ayudamos</b> = We help each other. <b>Se quieren mucho</b> = They love each other very much. The verb is always plural."], ["Compare", "Me lavo. · Nos lavamos.", "Compare: <b>Ellos se lavan</b> can mean \"they wash themselves\" or \"they wash each other\". The rest of the sentence tells you which."]] });
  const maybe = RW([
    ["A lo mejor Ana ___ a la fiesta. (ir)", "va", ["vaya", "fuera"]], ["Ojalá que ___ buen tiempo mañana. (hacer)", "haga", ["hace", "hacer"]],
    ["Quizás nosotros ___ al cine. (ir)", "vayamos", ["ir", "yendo"]], ["A lo mejor mis abuelos ___ hoy. (llegar)", "llegan", ["lleguen", "llegaran"]],
    ["Ojalá tú ___ la prueba. (pasar)", "pases", ["pasas", "pasar"]], ["Tal vez él ___ la respuesta. (saber)", "sepa", ["saber", "sabiendo"]],
    ["A lo mejor ___ tiempo mañana. (tener, nosotros)", "tenemos", ["tengamos", "tuviéramos"]], ["Ojalá mis amigos ___ venir. (poder)", "puedan", ["pueden", "podían"]],
    ["Quizás yo ___ un perro. (comprar)", "compre", ["comprar", "comprando"]], ["A lo mejor ___ mañana. (llover)", "llueve", ["llueva", "lloviera"]]
  ], { h1: "Look at the words that mean \"maybe\" or \"I hope\" at the start: a lo mejor, ojalá, quizás, tal vez.", h2: "<b>A lo mejor</b> uses the normal form. <b>Ojalá, quizás</b> and <b>tal vez</b> are used with the wish form when you are unsure.",
    h3: "Example: \"A lo mejor llega\" (normal) but \"Ojalá llegue\" and \"Quizás llegue\" (wish form). Now do yours.",
    slides: [["Maybe and I hope", "a lo mejor · quizás · tal vez · ojalá", "Spanish has several ways to say \"maybe\". They are followed by different verb forms."], ["A lo mejor", "A lo mejor llueve.", "<b>A lo mejor</b> is followed by the normal verb: <b>A lo mejor llueve mañana</b> (Maybe it will rain tomorrow)."], ["Quizás, tal vez, ojalá", "Quizás llueva.<br>Ojalá llueva.", "<b>Quizás</b> and <b>tal vez</b> (maybe) and <b>ojalá</b> (I hope) are used with the wish form when the idea is uncertain: <b>Quizás llueva</b>, <b>Ojalá llueva</b>."]] });
  const GRAM = SP("Grammar words", [["sustantivo", "noun"], ["verbo", "verb"], ["adjetivo", "adjective"], ["adverbio", "adverb"], ["pronombre", "pronoun"], ["oración", "sentence"], ["párrafo", "paragraph"], ["sílaba", "syllable"], ["vocal", "vowel"], ["consonante", "consonant"], ["mayúscula", "capital letter"], ["signo de puntuación", "punctuation mark"]]);
  const EARTH = SP("Earth science", [["volcán", "volcano", "🌋"], ["terremoto", "earthquake"], ["placa tectónica", "tectonic plate"], ["roca", "rock", "🪨"], ["mineral", "mineral"], ["atmósfera", "atmosphere"], ["erosión", "erosion"], ["lava", "lava"], ["cráter", "crater"], ["núcleo", "core"], ["capa", "layer"], ["océano", "ocean", "🌊"]]);
  const FIT = SP("Health and fitness", [["entrenar", "to train"], ["ejercicio", "exercise", "🏋️"], ["dieta equilibrada", "balanced diet"], ["descansar", "to rest"], ["sueño", "sleep, dream", "😴"], ["vitamina", "vitamin"], ["salud", "health"], ["estirarse", "to stretch"], ["resistencia", "stamina"], ["fuerza", "strength", "💪"], ["calentamiento", "warm-up"], ["hidratarse", "to drink enough water"]]);
  const ARTV = SP("Art and theater", [["pintura", "painting", "🖼️"], ["escultura", "sculpture"], ["escenario", "stage", "🎭"], ["actor", "actor"], ["obra de teatro", "play"], ["guion", "script"], ["ensayo", "rehearsal, essay"], ["aplauso", "applause", "👏"], ["público", "audience"], ["director", "director"], ["disfraz", "costume"], ["telón", "curtain"]]);
  const ancient = RW([
    ["The Maya built stone pyramids such as Chichén Itzá. In which country is it today?", "México", ["Perú", "Chile"]], ["Tenochtitlán was the capital city of the ___ .", "Aztecs", ["Incas", "Mayas"]],
    ["Which modern city stands where Tenochtitlán once was?", "Mexico City", ["Lima", "Bogotá"]], ["The Incas built a huge network of ___ across the Andes mountains.", "roads", ["railways", "harbors"]],
    ["The Incas used cords with knots, called quipus, to ___ .", "keep records", ["play music", "catch fish"]], ["The Maya were great at ___ and had a very clever calendar.", "astronomy", ["cooking", "fishing"]],
    ["The Nazca Lines are giant drawings in the desert of which country?", "Perú", ["Chile", "España"]], ["Chocolate comes from the seeds of the ___ tree, first grown in Mexico and Central America.", "cacao", ["olive", "apple"]],
    ["Which crop was first grown by people in Mexico thousands of years ago?", "corn", ["wheat", "rice"]], ["Potatoes first came from the Andes mountains in ___ .", "South America", ["Asia", "Africa"]]
  ], { h1: "Think of where each civilization lived: Maya (Mexico and Central America), Aztecs (central Mexico), Incas (the Andes in South America).", h2: "Use the map in your mind and what you learned in the slides.",
    h3: "Example: The Incas lived in the Andes mountains and built Machu Picchu, in Perú. Match each people to its place. Now do yours.",
    slides: [["Three great civilizations", "🏛️", "Long before Spain arrived, three great civilizations lived in what we now call Latin America: the <b>Maya</b>, the <b>Aztecs</b> and the <b>Incas</b>."], ["Maya and Aztecs", "pirámides · calendario · Tenochtitlán", "The <b>Maya</b> built pyramids like Chichén Itzá and studied the stars. The <b>Aztecs</b> built the city <b>Tenochtitlán</b>, where Mexico City is now."], ["The Incas", "Machu Picchu · quipus · caminos", "The <b>Incas</b> lived in the Andes. They built roads, grew potatoes, and used knotted cords called <b>quipus</b> to keep records."]] });
  const borrowed = RW([
    ["The word <b>tomate</b> comes from the Nahuatl (Aztec) word <i>tomatl</i>. What is it in English?", "tomato", ["potato", "pepper"]], ["Spanish borrowed <b>chile</b> (hot pepper) from which language?", "Nahuatl", ["Arabic", "Latin"]],
    ["Spanish words like <b>almohada</b> (pillow), <b>algodón</b> (cotton) and <b>azúcar</b> (sugar) came from ___ .", "Arabic", ["Chinese", "Greek"]], ["The word <b>canoa</b> came from the ___ people of the Caribbean.", "Taíno", ["Roman", "Chinese"]],
    ["<b>Maíz</b> comes from a Taíno word. What does it mean in English?", "corn", ["rice", "beans"]], ["Most Spanish words come from ___ .", "Latin", ["Chinese", "Russian"]],
    ["<b>Aceite</b> (oil) and <b>aceituna</b> (olive) came into Spanish from ___ .", "Arabic", ["Nahuatl", "English"]], ["Which of these English words came from Spanish?", "mosquito", ["pizza", "sushi"]],
    ["The English word <b>canyon</b> came from the Spanish word ___ .", "cañón", ["caña", "camino"]]
  ], { h1: "Think about where the thing came from: foods like tomatoes from the Americas, and words like al- from Arabic.", h2: "Use the slides. Words from the Americas often name foods or things found there. Many Spanish words that start with <b>al-</b> came from Arabic.",
    h3: "Example: <b>Chocolate</b> came from Nahuatl, and <b>almohada</b> came from Arabic. Every word has a history. Now do yours.",
    slides: [["Words with a story", "📚", "Spanish is mostly built from <b>Latin</b>. But it also borrowed words from other languages, because people met and traded."], ["From Arabic", "azúcar · almohada · aceite", "Arabic-speaking people lived in Spain for hundreds of years. Words that start with <b>al-</b>, like <b>almohada</b> and <b>algodón</b>, and also <b>azúcar</b> and <b>aceite</b> come from Arabic."], ["From the Americas", "tomate · chocolate · maíz · canoa", "Words for things from the Americas came from local languages: <b>tomate, chocolate, chile</b> (Nahuatl) and <b>maíz, canoa</b> (Taíno). English borrowed some words from Spanish too: <b>canyon, mosquito, patio</b>."]] });
  const dialects = RW([
    ["In Spain people say <b>ordenador</b> for computer. In Latin America people say ___ .", "computadora", ["ordenanza", "computar"]], ["In Spain a car is <b>coche</b>. In much of Latin America it is ___ .", "carro", ["carta", "caro"]],
    ["Spain says <b>zumo</b> for juice. Latin America says ___ .", "jugo", ["zumbo", "juego"]], ["Spain says <b>patata</b> for potato. Latin America says ___ .", "papa", ["pata", "pato"]],
    ["Spain says <b>móvil</b> for cell phone. Latin America says ___ .", "celular", ["cellar", "cebolla"]], ["In Spain, \"you all\" is <b>vosotros</b>. In Latin America it is ___ .", "ustedes", ["nosotros", "ellos"]],
    ["Spain says <b>melocotón</b> for peach. Many Latin American countries say ___ .", "durazno", ["manzana", "uva"]], ["In Chile and Perú, avocado is called ___ .", "palta", ["pila", "plato"]],
    ["Spain says <b>gafas</b> for glasses. Latin America often says ___ .", "lentes", ["lentos", "gafes"]]
  ], { h1: "Spanish is spoken on three continents, so some words change from place to place. Which word do you use in Latin America?", h2: "Think about which word you have already seen in this course for each thing. Latin American words often sound like English: computadora, celular.",
    h3: "Example: bus = <b>autobús</b> in Spain but <b>guagua</b>, <b>camión</b> or <b>colectivo</b> in different Latin American places. Both are correct. Now do yours.",
    slides: [["One language, many words", "🌎", "Spanish speakers all understand each other, but some words change from country to country, like English words in Britain and America."], ["Spain and Latin America", "coche / carro<br>zumo / jugo<br>patata / papa", "<b>ordenador / computadora</b>, <b>móvil / celular</b>, <b>coche / carro</b>, <b>zumo / jugo</b>, <b>patata / papa</b>. Both words in each pair are correct."], ["You all", "vosotros / ustedes", "Spain also uses <b>vosotros</b> for \"you all\". Latin America uses only <b>ustedes</b>. The best rule: use the word that the people around you use."]] });
  const formal = TR([
    ["Estimado señor López,", "Dear Mr. López,"], ["Atentamente,", "Sincerely,"], ["Un abrazo,", "A hug, (a friendly closing)"], ["Le escribo para pedirle información.", "I am writing to ask you for information."],
    ["¿Podría ayudarme, por favor?", "Could you help me, please?"], ["Gracias de antemano.", "Thank you in advance."], ["Hola, ¿qué tal?", "Hi, how's it going?"], ["Espero su respuesta.", "I look forward to your reply."],
    ["Nos vemos pronto.", "See you soon."], ["Quedo a su disposición.", "I remain at your disposal."]
  ], [["Formal or friendly?", "usted · tú", "When you write to a teacher, a boss or a stranger, use <b>usted</b> and polite words. With friends and family, use <b>tú</b> and friendly words."], ["Formal letters", "Estimado · Atentamente · Gracias de antemano", "Start with <b>Estimado señor</b> or <b>Estimada señora</b> (Dear). End with <b>Atentamente</b> (Sincerely). Use <b>podría</b> (could you) to be polite."], ["Friendly messages", "Hola, ¿qué tal? · Un abrazo", "With friends, you can say <b>Hola, ¿qué tal?</b> and end with <b>Un abrazo</b> or <b>Nos vemos pronto</b>."]],
    "Think about who is writing to whom. Is it polite and formal, or friendly?");
  const reading15 = RD([
    { t: "Si los antiguos mayas hubieran tenido máquinas, quizás habrían construido aún más ciudades. Sin embargo, con piedra y herramientas simples crearon pirámides, observatorios y un calendario muy preciso. Hoy los científicos todavía estudian sus escritos para entender cómo vivían.",
      qs: [["What did the Maya build with simple tools?", "pyramids and observatories", ["airplanes", "skyscrapers"], "Find crearon."], ["What was very precise?", "their calendar", ["their roads", "their boats"], "Find un calendario muy preciso."], ["What do scientists study today?", "their writings", ["their machines", "their clothes"], "Find sus escritos."]] },
    { t: "Cuando Sofía empezó a entrenar, apenas podía correr un kilómetro. Siguió practicando tres veces por semana, descansó lo suficiente y comía de forma equilibrada. Después de seis meses, corrió diez kilómetros sin parar. Sofía dice que lo más importante es no rendirse.",
      qs: [["How far could Sofía run at first?", "one kilometer", ["ten kilometers", "five kilometers"], "Find apenas podía correr."], ["How often did she practice?", "three times a week", ["every day", "once a month"], "Find tres veces por semana."], ["What does she say is most important?", "not giving up", ["running fast", "winning prizes"], "Find lo más importante."]] },
    { t: "El sábado vi una obra de teatro en la escuela. Los actores habían ensayado durante dos meses. Cuando se abrió el telón, el público guardó silencio. Al final, todos aplaudimos mucho. Mi hermana, que hacía de reina, llevaba un disfraz precioso.",
      qs: [["What did the writer see?", "a play", ["a soccer game", "a movie"], "Find obra de teatro."], ["How long did the actors rehearse?", "two months", ["two days", "two years"], "Find habían ensayado."], ["What did the audience do at the end?", "applauded", ["left", "slept"], "Find aplaudimos."]] },
    { t: "Muchas palabras en español vienen de otras lenguas. Del árabe tenemos azúcar y almohada. Del náhuatl, chocolate y tomate. Por eso, aprender español también es aprender historia. Quizás la próxima palabra nueva que aprendas tenga una historia fascinante.",
      qs: [["Which language gave Spanish the word almohada?", "Arabic", ["Nahuatl", "English"], "Find Del árabe."], ["Which language did tomate come from?", "Nahuatl", ["Arabic", "French"], "Find Del náhuatl."], ["What else does learning Spanish teach you?", "history", ["music", "cooking"], "Find aprender historia."]] }
  ], [["Seventh grade reading", "📖", "Now the stories use many kinds of verbs. Look for the main idea of each sentence first, then the details."], ["Clues", "sin embargo · por eso · quizás", "Joining words show how ideas connect: <b>sin embargo</b> (however), <b>por eso</b> (that is why), <b>quizás</b> (maybe)."], ["Strategy", "🔍", "Read the question, find the matching words in the story, and check the sentence before and after."]]);
  const L15 = [
    XL("If I had known...", hubV), XL("What would have happened?", thirdCond), XL("Although: fact or maybe?", aunqueR), XL("Looking for something that...", adjClause),
    XL("Matching the times", sequence), XL("Scene and interruption", interrupt), XL("Keep going, usually, just did", seguirEtc), XL("Each other", reciprocal),
    XL("Maybe and I hope", maybe), XL("Grammar words", V(GRAM)), XL("Earth science", V(EARTH)), XL("Health and fitness", V(FIT)),
    XL("Art and theater", V(ARTV)), XL("Three great civilizations", ancient), XL("Words with a story", borrowed), XL("Spain and Latin America", dialects),
    XL("Formal or friendly?", formal), XL("Reading Spanish stories", reading15),
    XL("Mixed practice", MIX([hubV, thirdCond, aunqueR, adjClause, sequence, V(FIT)])),
    XL("Level 15 Challenge", MIX([hubV, thirdCond, aunqueR, adjClause, sequence, interrupt, seguirEtc, reciprocal, maybe, V(GRAM), V(EARTH), V(FIT), V(ARTV), ancient, borrowed, dialects, formal, reading15]))
  ];
  Object.assign(SPANISH_LEVELS, { 13: L13, 14: L14, 15: L15 });
})();
