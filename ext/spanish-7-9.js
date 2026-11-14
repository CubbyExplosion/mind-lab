// ext/spanish-7-9.js  Mind Lab Spanish, levels 7-9 (60 lessons)
(() => {
  const SP = (name, items) => ({ name, items });
  const word = (es, en, e) => `<span class="word" data-say="${es}">${e ? e + " " : ""}<b>${es}</b> = ${en} 🔊</span>`;
  const L1 = s => s.replace(/[¿¡]/g, "")[0];
  const NUM = [null,"uno","dos","tres","cuatro","cinco","seis","siete","ocho","nueve","diez","once","doce","trece","catorce","quince","dieciséis","diecisiete","dieciocho","diecinueve","veinte"];
  const V20 = { 21: "veintiuno", 22: "veintidós", 23: "veintitrés", 24: "veinticuatro", 25: "veinticinco", 26: "veintiséis", 27: "veintisiete", 28: "veintiocho", 29: "veintinueve" };
  const TENS = { 30: "treinta", 40: "cuarenta", 50: "cincuenta", 60: "sesenta", 70: "setenta", 80: "ochenta", 90: "noventa" };
  const HUN = { 2: "doscientos", 3: "trescientos", 4: "cuatrocientos", 5: "quinientos", 6: "seiscientos", 7: "setecientos", 8: "ochocientos", 9: "novecientos" };
  const numEs = n => {
    if (n <= 20) return NUM[n];
    if (n < 30) return V20[n];
    if (n < 100) return TENS[n - n % 10] + (n % 10 ? " y " + NUM[n % 10] : "");
    if (n === 100) return "cien";
    if (n < 1000) { const h = Math.floor(n / 100), r = n % 100; return (h === 1 ? "ciento" : HUN[h]) + (r ? " " + numEs(r) : ""); }
    const k = Math.floor(n / 1000), r = n % 1000;
    return (k === 1 ? "mil" : NUM[k] + " mil") + (r ? " " + numEs(r) : "");
  };
  const MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const MEN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const S3 = arr => arr.map(([h, v, t]) => ({ h, v, t }));
  const XL = (title, make, slides) => { if (slides) make.teach = () => S3(slides); return { title, make }; };
  const MIX = (ms, slides) => {
    const f = () => pick(ms)();
    f.teach = () => S3(slides);
    return f;
  };
  const hv = (h, a, row) => (typeof h === "function" ? h(a, row) : h);

  // ---------- vocabulary (es -> en, en -> es, picture) ----------
  const V = (bank, tip) => {
    const f = () => {
      const items = bank.items, [es, en, e] = pick(items);
      const rest = items.filter(x => x[0] !== es), exs = pick(rest);
      let m = pick(e ? ["es2en", "en2es", "pic"] : ["es2en", "en2es"]);
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
      { h: "How to remember", v: "🧠", t: tip || "Say each one out loud. Cover the English and test yourself. Look for ones that look like English words." }
    ];
    return f;
  };
  // type the Spanish for an English word
  const TYE = (items, name) => {
    const its = items.filter(x => !/[ ¿?]/.test(x[0]));
    const f = () => {
      const [es, en, e] = pick(its), ex = pick(its.filter(x => x[0] !== es));
      return { text: `Type this in Spanish: <b>${en}</b>`, visual: e, textInput: true, answer: es,
        hints: ["Say the English word in your head. Then remember the Spanish word from the lessons.", `The Spanish word starts with "${L1(es)}" and has ${es.length} letters.`, `Example: "${ex[1]}" is "${ex[0]}" in Spanish. Now do yours. (You do not need to type accents!)`] };
    };
    f.teach = () => [
      { h: "Typing Spanish", v: "⌨️", t: `In this lesson you read an English word and type the Spanish word. The words come from ${name}.` },
      { h: "Accents are optional", v: "á é í ó ú ñ", t: "You can leave the accents off: <b>volcán</b> and <b>volcan</b> both count." },
      { h: "Sound it out", v: "🔊", t: "Spanish is spelled the way it sounds. Say the word slowly and write the letters you hear." }
    ];
    return f;
  };
  // rows: "question|answer|wrong|wrong[|~clue]"; hints may be functions of the answer
  const R = (rows, hints, slides, o = {}) => {
    const rs = rows.map(r => r.split("|"));
    const f = () => {
      const parts = pick(rs).slice(); let clue = null;
      if (parts[parts.length - 1].startsWith("~")) clue = parts.pop().slice(1);
      const [text, ans, ...wr] = parts;
      const h = hints.map(x => hv(x, ans));
      if (clue) h[1] = clue; else if (o.letter) h[1] += ` It starts with "${L1(ans)}".`;
      return { text, visual: o.vis, choices: shuf([ans, ...wr]), answer: ans, hints: h };
    };
    f.teach = () => S3(slides);
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

  // ---------- verbs ----------
  const PK = ["yo", "tú", "él", "nosotros", "ellos"];
  const PD = { yo: "yo", "tú": "tú", "él": "él / ella", nosotros: "nosotros", ellos: "ellos" };
  const PE = { yo: "I", "tú": "you", "él": "he / she", nosotros: "we", ellos: "they" };
  const forms = (inf, kind) => {
    const stem = inf.slice(0, -2), ar = inf.endsWith("ar"), ir = inf.endsWith("ir");
    const add = e => e.split(",").map(x => stem + x);
    if (kind === "pret") return add(ar ? "é,aste,ó,amos,aron" : "í,iste,ió,imos,ieron");
    if (kind === "imp") return add(ar ? "aba,abas,aba,ábamos,aban" : "ía,ías,ía,íamos,ían");
    if (kind === "pres") return add(ar ? "o,as,a,amos,an" : ir ? "o,es,e,imos,en" : "o,es,e,emos,en");
    if (kind === "fut") return "é,ás,á,emos,án".split(",").map(x => inf + x);
    if (kind === "perf") return ["he", "has", "ha", "hemos", "han"].map(h => h + " " + stem + (ar ? "ado" : "ido"));
    return [];
  };
  const mk = (inf, en, f, note, ex) => ({ inf, en, f, note: note || "", ex });
  const reg = (kind, list) => { const o = {}; list.forEach(([inf, en, ex]) => { o[inf] = mk(inf, en, forms(inf, kind), "", ex); }); return o; };
  const AR = [["hablar", "to speak", ["Ayer hablé con mi abuela.", "Yesterday I talked with my grandma."]], ["caminar", "to walk"], ["bailar", "to dance"], ["nadar", "to swim"], ["cocinar", "to cook"], ["mirar", "to look at"], ["comprar", "to buy"], ["cantar", "to sing"], ["trabajar", "to work"], ["estudiar", "to study"], ["viajar", "to travel"], ["dibujar", "to draw"]];
  const ER = [["comer", "to eat", ["Ayer comí una manzana.", "Yesterday I ate an apple."]], ["beber", "to drink"], ["correr", "to run"], ["aprender", "to learn"], ["vender", "to sell"], ["vivir", "to live"], ["escribir", "to write"], ["abrir", "to open"], ["subir", "to go up"], ["recibir", "to receive"], ["salir", "to go out"]];
  const ARi = [["jugar", "to play"], ["cantar", "to sing"], ["nadar", "to swim"], ["trabajar", "to work"], ["bailar", "to dance"], ["cocinar", "to cook"], ["caminar", "to walk"], ["hablar", "to speak"]];
  const ERi = [["comer", "to eat"], ["vivir", "to live"], ["beber", "to drink"], ["correr", "to run"], ["escribir", "to write"], ["aprender", "to learn"], ["tener", "to have"], ["hacer", "to do, to make"], ["leer", "to read"]];
  const rul = (a, b, c, d, e) => ({ yo: a, "tú": b, "él": c, nosotros: d, ellos: e });

  const TP = {};
  TP.PRa = { tag: "past", title: "The past tense: -ar verbs", pat: "yo -é · tú -aste · él/ella -ó · nosotros -amos · ellos -aron", intro: "yesterday",
    rule: rul("For <b>yo</b>, an -ar verb in the past ends in <b>-é</b> (with an accent).", "For <b>tú</b>, it ends in <b>-aste</b>.", "For <b>él / ella</b>, it ends in <b>-ó</b> (with an accent).", "For <b>nosotros</b>, it ends in <b>-amos</b>.", "For <b>ellos</b>, it ends in <b>-aron</b>."),
    v: reg("pret", AR.map(x => x.slice())) };
  TP.PRe = { tag: "past", title: "The past tense: -er and -ir verbs", pat: "yo -í · tú -iste · él/ella -ió · nosotros -imos · ellos -ieron",
    rule: rul("For <b>yo</b>, an -er or -ir verb in the past ends in <b>-í</b> (with an accent).", "For <b>tú</b>, it ends in <b>-iste</b>.", "For <b>él / ella</b>, it ends in <b>-ió</b> (with an accent).", "For <b>nosotros</b>, it ends in <b>-imos</b>.", "For <b>ellos</b>, it ends in <b>-ieron</b>."),
    v: reg("pret", ER.map(x => x.slice())) };
  const irrRule = rul("In the past, these special verbs have <b>no accent marks</b>. The <b>yo</b> form is short.", "For <b>tú</b>, the form ends in <b>-ste</b>.", "For <b>él / ella</b>, the form is short and ends in a vowel.", "For <b>nosotros</b>, the form ends in <b>-mos</b>.", "For <b>ellos</b>, the form ends in <b>-ron</b>.");
  TP.PRir = { tag: "past", title: "Ir and ser in the past", pat: "fue and fuimos are the same for ir and ser!", rule: irrRule,
    v: { ir: mk("ir", "to go", ["fui", "fuiste", "fue", "fuimos", "fueron"], "Ir and ser look exactly the same in the past. You learn which one it is from the sentence.", ["Ayer fui al parque.", "Yesterday I went to the park."]),
      ser: mk("ser", "to be", ["fui", "fuiste", "fue", "fuimos", "fueron"], "Ser and ir look exactly the same in the past.", ["La fiesta fue divertida.", "The party was fun."]) } };
  TP.PRir2 = { tag: "past", title: "Special past verbs", pat: "yo -e · tú -iste · él/ella -o · nosotros -imos · ellos -ieron", rule: irrRule,
    v: { hacer: mk("hacer", "to do, to make", ["hice", "hiciste", "hizo", "hicimos", "hicieron"], "The stem is <b>hic-</b>, but for él / ella it is <b>hiz-</b>.", ["Ayer hice mi tarea.", "Yesterday I did my homework."]),
      tener: mk("tener", "to have", ["tuve", "tuviste", "tuvo", "tuvimos", "tuvieron"], "The stem is <b>tuv-</b>.", ["Tuve un día largo.", "I had a long day."]),
      estar: mk("estar", "to be (places, feelings)", ["estuve", "estuviste", "estuvo", "estuvimos", "estuvieron"], "The stem is <b>estuv-</b>.", ["Estuve en casa.", "I was at home."]),
      venir: mk("venir", "to come", ["vine", "viniste", "vino", "vinimos", "vinieron"], "The stem is <b>vin-</b>.", ["Vine a la escuela.", "I came to school."]),
      poder: mk("poder", "can, to be able to", ["pude", "pudiste", "pudo", "pudimos", "pudieron"], "The stem is <b>pud-</b>.") } };
  const reflRule = rul("The little word for <b>yo</b> is <b>me</b>. Then comes the usual yo form.", "The little word for <b>tú</b> is <b>te</b>. Then comes the usual tú form.", "The little word for <b>él / ella</b> is <b>se</b>. Then comes the usual él / ella form.", "The little word for <b>nosotros</b> is <b>nos</b>. Then comes the usual nosotros form.", "The little word for <b>ellos</b> is <b>se</b>. Then comes the usual ellos form.");
  TP.REF = { tag: "now", title: "Reflexive verbs", pat: "me · te · se · nos · se + the verb", rule: reflRule,
    v: { levantarse: mk("levantarse", "to get up", ["me levanto", "te levantas", "se levanta", "nos levantamos", "se levantan"], "", ["Me levanto a las siete.", "I get up at seven."]),
      lavarse: mk("lavarse", "to wash (yourself)", ["me lavo", "te lavas", "se lava", "nos lavamos", "se lavan"], "", ["Me lavo las manos.", "I wash my hands."]),
      ducharse: mk("ducharse", "to take a shower", ["me ducho", "te duchas", "se ducha", "nos duchamos", "se duchan"], "", ["Me ducho por la mañana.", "I take a shower in the morning."]),
      peinarse: mk("peinarse", "to comb your hair", ["me peino", "te peinas", "se peina", "nos peinamos", "se peinan"]),
      vestirse: mk("vestirse", "to get dressed", ["me visto", "te vistes", "se viste", "nos vestimos", "se visten"], "This verb changes its middle: <b>e</b> becomes <b>i</b>, except for nosotros."),
      despertarse: mk("despertarse", "to wake up", ["me despierto", "te despiertas", "se despierta", "nos despertamos", "se despiertan"], "This verb changes its middle: <b>e</b> becomes <b>ie</b>, except for nosotros."),
      acostarse: mk("acostarse", "to go to bed", ["me acuesto", "te acuestas", "se acuesta", "nos acostamos", "se acuestan"], "This verb changes its middle: <b>o</b> becomes <b>ue</b>, except for nosotros.") },
    ex: mk("cepillarse", "to brush", ["me cepillo", "te cepillas", "se cepilla", "nos cepillamos", "se cepillan"]), ex2: mk("peinarse", "to comb", ["me peino", "te peinas", "se peina", "nos peinamos", "se peinan"]) };
  TP.IMa = { tag: "used to", title: "The imperfect: -ar verbs", pat: "yo -aba · tú -abas · él/ella -aba · nosotros -ábamos · ellos -aban",
    rule: rul("For <b>yo</b>, an -ar verb in the imperfect ends in <b>-aba</b>.", "For <b>tú</b>, it ends in <b>-abas</b>.", "For <b>él / ella</b>, it ends in <b>-aba</b> (same as yo!).", "For <b>nosotros</b>, it ends in <b>-ábamos</b> (with an accent).", "For <b>ellos</b>, it ends in <b>-aban</b>."),
    v: reg("imp", ARi.map(x => x.slice())) };
  TP.IMe = { tag: "used to", title: "The imperfect: -er and -ir verbs", pat: "yo -ía · tú -ías · él/ella -ía · nosotros -íamos · ellos -ían",
    rule: rul("For <b>yo</b>, an -er or -ir verb in the imperfect ends in <b>-ía</b>.", "For <b>tú</b>, it ends in <b>-ías</b>.", "For <b>él / ella</b>, it ends in <b>-ía</b> (same as yo!).", "For <b>nosotros</b>, it ends in <b>-íamos</b>.", "For <b>ellos</b>, it ends in <b>-ían</b>."),
    v: reg("imp", ERi.map(x => x.slice())) };
  TP.IMir = { tag: "used to", title: "Ir, ser and ver in the imperfect", pat: "These three are the only special ones!",
    rule: rul("For <b>yo</b>, these special verbs end in <b>-a</b>. The form is the same as for él / ella.", "For <b>tú</b>, the form ends in <b>-s</b>.", "For <b>él / ella</b>, the form ends in <b>-a</b> (same as yo!).", "For <b>nosotros</b>, the form has an accent mark and ends in <b>-mos</b>.", "For <b>ellos</b>, the form ends in <b>-n</b>."),
    v: { ir: mk("ir", "to go", ["iba", "ibas", "iba", "íbamos", "iban"], "It starts with <b>ib-</b> and uses the -ar endings.", ["Yo iba a la playa cada verano.", "I used to go to the beach every summer."]),
      ser: mk("ser", "to be", ["era", "eras", "era", "éramos", "eran"], "It starts with <b>er-</b>.", ["Mi casa era pequeña.", "My house was small."]),
      ver: mk("ver", "to see", ["veía", "veías", "veía", "veíamos", "veían"], "It keeps the <b>ve-</b> and uses the -er/-ir endings.", ["Veía dibujos todos los días.", "I used to watch cartoons every day."]) } };
  const eiRule = rul("For <b>yo</b>, the middle changes, then the ending is <b>-o</b>.", "For <b>tú</b>, the middle changes, then the ending is <b>-es</b>.", "For <b>él / ella</b>, the middle changes, then the ending is <b>-e</b>.", "For <b>nosotros</b> the middle does NOT change. Use the stem and the ending of the infinitive.", "For <b>ellos</b>, the middle changes, then the ending is <b>-en</b>.");
  TP.EI = { tag: "now", title: "Verbs that change e to i", pat: "pido · pides · pide · pedimos · piden", rule: eiRule,
    v: { pedir: mk("pedir", "to ask for", ["pido", "pides", "pide", "pedimos", "piden"], "Here <b>e</b> becomes <b>i</b>.", ["Pido un jugo.", "I ask for a juice."]),
      servir: mk("servir", "to serve", ["sirvo", "sirves", "sirve", "servimos", "sirven"], "Here <b>e</b> becomes <b>i</b>."),
      repetir: mk("repetir", "to repeat", ["repito", "repites", "repite", "repetimos", "repiten"], "Here <b>e</b> becomes <b>i</b>."),
      seguir: mk("seguir", "to follow, to keep going", ["sigo", "sigues", "sigue", "seguimos", "siguen"], "Here <b>e</b> becomes <b>i</b>, and the yo form drops the u.") },
    ex: mk("vestir", "to dress", ["visto", "vistes", "viste", "vestimos", "visten"]), ex2: mk("competir", "to compete", ["compito", "compites", "compite", "competimos", "compiten"]) };
  TP.EIE = { tag: "now", title: "Verbs that change their middle", pat: "pienso · piensas · piensa · pensamos · piensan", rule: rul("For <b>yo</b>, the middle changes, then the ending is <b>-o</b>.", "For <b>tú</b>, the middle changes, then the ending is <b>-s</b> (with an e before it).", "For <b>él / ella</b>, the middle changes, then the ending is <b>-a</b> or <b>-e</b>.", "For <b>nosotros</b> the middle does NOT change. Use the stem and the ending of the infinitive.", "For <b>ellos</b>, the middle changes, then the ending is <b>-n</b>."),
    v: { pensar: mk("pensar", "to think", ["pienso", "piensas", "piensa", "pensamos", "piensan"], "Here <b>e</b> becomes <b>ie</b>.", ["Pienso en mis amigos.", "I think about my friends."]),
      empezar: mk("empezar", "to begin", ["empiezo", "empiezas", "empieza", "empezamos", "empiezan"], "Here <b>e</b> becomes <b>ie</b>."),
      entender: mk("entender", "to understand", ["entiendo", "entiendes", "entiende", "entendemos", "entienden"], "Here <b>e</b> becomes <b>ie</b>."),
      preferir: mk("preferir", "to prefer", ["prefiero", "prefieres", "prefiere", "preferimos", "prefieren"], "Here <b>e</b> becomes <b>ie</b>."),
      volver: mk("volver", "to return", ["vuelvo", "vuelves", "vuelve", "volvemos", "vuelven"], "Here <b>o</b> becomes <b>ue</b>."),
      encontrar: mk("encontrar", "to find", ["encuentro", "encuentras", "encuentra", "encontramos", "encuentran"], "Here <b>o</b> becomes <b>ue</b>."),
      contar: mk("contar", "to count, to tell", ["cuento", "cuentas", "cuenta", "contamos", "cuentan"], "Here <b>o</b> becomes <b>ue</b>."),
      almorzar: mk("almorzar", "to eat lunch", ["almuerzo", "almuerzas", "almuerza", "almorzamos", "almuerzan"], "Here <b>o</b> becomes <b>ue</b>.") },
    ex: mk("cerrar", "to close", ["cierro", "cierras", "cierra", "cerramos", "cierran"]), ex2: mk("recordar", "to remember", ["recuerdo", "recuerdas", "recuerda", "recordamos", "recuerdan"]) };
  const futRule = rul("For <b>yo</b>, add <b>-é</b> (with an accent) to the end.", "For <b>tú</b>, add <b>-ás</b> to the end.", "For <b>él / ella</b>, add <b>-á</b> (with an accent) to the end.", "For <b>nosotros</b>, add <b>-emos</b> to the end.", "For <b>ellos</b>, add <b>-án</b> to the end.");
  const FUTV = ["hablar", "comer", "vivir", "viajar", "bailar", "escribir", "correr", "estudiar"];
  TP.FU = { tag: "future", title: "The future tense", pat: "the whole verb + é · ás · á · emos · án", rule: futRule,
    v: Object.assign(reg("fut", FUTV.map(x => [x, { hablar: "to speak", comer: "to eat", vivir: "to live", viajar: "to travel", bailar: "to dance", escribir: "to write", correr: "to run", estudiar: "to study" }[x]])), {}) };
  TP.FU.v.hablar.ex = ["Mañana hablaré con mi maestra.", "Tomorrow I will talk with my teacher."];
  TP.FU.v.comer.ex = ["Comeremos pizza el sábado.", "We will eat pizza on Saturday."];
  const futIrr = (inf, en, stem) => mk(inf, en, "é,ás,á,emos,án".split(",").map(x => stem + x), `This verb has a special stem: <b>${stem}-</b>.`);
  TP.FUi = { tag: "future", title: "Special future verbs", pat: "special stem + é · ás · á · emos · án", rule: futRule,
    v: { tener: futIrr("tener", "to have", "tendr"), hacer: futIrr("hacer", "to do, to make", "har"), poder: futIrr("poder", "can, to be able to", "podr"), salir: futIrr("salir", "to go out", "saldr"), venir: futIrr("venir", "to come", "vendr"), decir: futIrr("decir", "to say", "dir"), poner: futIrr("poner", "to put", "pondr") } };
  TP.FUi.v.tener.ex = ["Tendré un perro.", "I will have a dog."]; TP.FUi.v.hacer.ex = ["Haré una torta.", "I will make a cake."];
  const perfRule = rul("The helper word for <b>yo</b> is very short and starts with <b>h</b>. Then add the -ado / -ido word.", "The helper word for <b>tú</b> has three letters and ends in <b>-s</b>. Then add the -ado / -ido word.", "The helper word for <b>él / ella</b> has two letters. Then add the -ado / -ido word.", "The helper word for <b>nosotros</b> ends in <b>-mos</b>. Then add the -ado / -ido word.", "The helper word for <b>ellos</b> has three letters and ends in <b>-n</b>. Then add the -ado / -ido word.");
  TP.PF = { tag: "present perfect", title: "I have spoken: the present perfect", pat: "he · has · ha · hemos · han + -ado / -ido", rule: perfRule,
    v: reg("perf", [["hablar", "to speak", ["He hablado con mi tío.", "I have talked with my uncle."]], ["bailar", "to dance"], ["caminar", "to walk"], ["terminar", "to finish"], ["comer", "to eat", ["Hemos comido mucho.", "We have eaten a lot."]], ["vivir", "to live"], ["beber", "to drink"], ["aprender", "to learn"], ["subir", "to go up"]]) };
  const pgRule = rul("For <b>yo</b>, the verb ends in <b>-o</b>, but this one is special: its yo form is different from the others.", "For <b>tú</b>, the verb ends in <b>-s</b> and looks regular.", "For <b>él / ella</b>, the verb ends in <b>-e</b> or <b>-a</b> and looks regular.", "For <b>nosotros</b>, the verb ends in <b>-mos</b> and looks regular.", "For <b>ellos</b>, the verb ends in <b>-n</b> and looks regular.");
  TP.YG = { tag: "now", title: "Verbs with a special yo form", pat: "salgo · pongo · traigo · caigo", rule: pgRule,
    v: { salir: mk("salir", "to go out", ["salgo", "sales", "sale", "salimos", "salen"], "Only the yo form is special. It adds a <b>g</b>.", ["Salgo de casa a las ocho.", "I leave home at eight."]),
      poner: mk("poner", "to put", ["pongo", "pones", "pone", "ponemos", "ponen"], "Only the yo form is special. It adds a <b>g</b>."),
      traer: mk("traer", "to bring", ["traigo", "traes", "trae", "traemos", "traen"], "Only the yo form is special. It adds <b>ig</b>."),
      caer: mk("caer", "to fall", ["caigo", "caes", "cae", "caemos", "caen"], "Only the yo form is special. It adds <b>ig</b>.") },
    ex: mk("hacer", "to do", ["hago", "haces", "hace", "hacemos", "hacen"]), ex2: mk("hablar", "to speak", ["hablo", "hablas", "habla", "hablamos", "hablan"]) };
  TP.VD = { tag: "now", title: "Venir, decir, dar and oír", pat: "vengo · digo · doy · oigo", rule: rul("For <b>yo</b>, this verb has a special form. Think about the yo form you practiced.", "For <b>tú</b>, the verb ends in <b>-s</b>.", "For <b>él / ella</b>, the verb is short and ends in a vowel.", "For <b>nosotros</b>, the verb ends in <b>-mos</b>.", "For <b>ellos</b>, the verb ends in <b>-n</b>."),
    v: { venir: mk("venir", "to come", ["vengo", "vienes", "viene", "venimos", "vienen"], "The middle changes (<b>e</b> to <b>ie</b>) except for nosotros, and yo adds a <b>g</b>.", ["Vengo de la escuela.", "I come from school."]),
      decir: mk("decir", "to say, to tell", ["digo", "dices", "dice", "decimos", "dicen"], "The middle changes (<b>e</b> to <b>i</b>) except for nosotros, and yo adds a <b>g</b>."),
      dar: mk("dar", "to give", ["doy", "das", "da", "damos", "dan"], "The yo form is very short."),
      oír: mk("oír", "to hear", ["oigo", "oyes", "oye", "oímos", "oyen"], "This one is special in most forms.") },
    ex: mk("hacer", "to do", ["hago", "haces", "hace", "hacemos", "hacen"]), ex2: mk("hablar", "to speak", ["hablo", "hablas", "habla", "hablamos", "hablan"]) };
  // fill in default example verbs for tenses that have none
  TP.PRa.ex = TP.PRe.v.comer; TP.PRa.ex2 = TP.PRe.v.vivir; TP.PRe.ex = TP.PRa.v.hablar; TP.PRe.ex2 = TP.PRa.v.cantar;
  TP.PRir.ex = TP.PRa.v.hablar; TP.PRir.ex2 = TP.PRe.v.comer; TP.PRir2.ex = TP.PRa.v.hablar; TP.PRir2.ex2 = TP.PRe.v.comer;
  TP.IMa.ex = TP.IMe.v.comer; TP.IMa.ex2 = TP.IMe.v.vivir; TP.IMe.ex = TP.IMa.v.hablar; TP.IMe.ex2 = TP.IMa.v.cantar;
  TP.IMir.ex = TP.IMa.v.hablar; TP.IMir.ex2 = TP.IMe.v.comer;
  TP.FU.ex = TP.FUi.v.tener; TP.FU.ex2 = TP.FUi.v.hacer; TP.FUi.ex = TP.FU.v.hablar; TP.FUi.ex2 = TP.FU.v.comer;
  TP.PF.ex = TP.PF.v.terminar; TP.PF.ex2 = TP.PF.v.caminar;

  const CJ = (T, keys) => {
    const f = () => {
      const key = pick(keys), v = T.v[key], i = ri(0, 4), k = PK[i], ans = v.f[i];
      const exv = T.ex === v ? T.ex2 : T.ex, shown = i === 2 ? pick(["él", "ella"]) : k;
      const rule = (v.note ? v.note + " " : "") + T.rule[k];
      const hints = ["Spanish verbs change to match WHO does the action, and WHEN. Who is it here?", rule, `Example: with ${exv.inf} (${exv.en || "another verb"}): yo ${exv.f[0]}, tú ${exv.f[1]}, nosotros ${exv.f[3]}. Now find yours.`];
      const label = `<i>(${T.tag})</i>`;
      if (ans.replace(/ /g, "").length >= 5 && Math.random() < 0.5) return { text: `Type the right form: <b>${shown}</b> ___ (${v.inf}, ${v.en}) ${label}`, textInput: true, answer: ans, hints };
      const wr = shuf([...new Set(v.f)].filter(x => x !== ans)).slice(0, 2);
      return { text: `${shown} ___ (${v.inf}, ${v.en}) ${label}`, choices: shuf([ans, ...wr]), answer: ans, hints };
    };
    f.teach = () => {
      const v = T.v[keys[0]], v2 = T.v[keys[1] || keys[0]];
      const tab = u => PK.map((p, i) => word(u.f[i], PE[p]).replace("<b>", `${PD[p]} <b>`)).join("<br>");
      return [
        { h: `${v.inf} (${v.en})`, v: tab(v), t: "<b>Tap a line to hear it.</b> The verb changes depending on <b>who</b> does it." },
        { h: T.title, v: T.pat, t: (v.note ? v.note + " " : "") + "Learn the pattern, then check the other verbs that follow it." },
        { h: keys.length > 1 ? `Another one: ${v2.inf}` : "In a sentence", v: keys.length > 1 ? tab(v2) : (v.ex ? word(v.ex[0], v.ex[1]) : "🧠"), t: "Say all the forms out loud like a song: yo, tú, él, nosotros, ellos." }
      ];
    };
    return f;
  };
  // which person does this verb form go with?
  const WHO = () => {
    const sets = [[TP.PRa, "past"], [TP.PRe, "past"], [TP.FU, "future"], [TP.FUi, "future"]];
    const f = () => {
      const [T, tag] = pick(sets), v = T.v[pick(Object.keys(T.v))], i = ri(0, 4), ans = PD[PK[i]];
      const oth = shuf([0, 1, 2, 3, 4].filter(x => x !== i)), ex = T.v[pick(Object.keys(T.v).filter(x => x !== v.inf))], j = oth[0];
      const wr = oth.slice(1, 3).map(x => PD[PK[x]]);
      return { text: `Which person does <b>${v.f[i]}</b> go with? <i>(${tag})</i>`, say: v.f[i], lang: "es-ES", choices: shuf([ans, ...wr]), answer: ans,
        hints: ["Look at the last letters of the verb. Each person has its own ending.", "Clue: the <b>nosotros</b> ending always has <b>-mos</b>. The <b>ellos</b> ending finishes with <b>-n</b>. The <b>tú</b> ending has an <b>-s</b>.", `Example: "${ex.f[j]}" goes with "${PD[PK[j]]}", because of its ending. Now do yours.`] };
    };
    f.teach = () => [
      { h: "Endings tell you who", v: "🕵️", t: "A Spanish verb ending is a clue. You can often tell WHO is doing the action from the last letters, even without a pronoun." },
      { h: "Ending detective", v: "nosotros -mos<br>ellos -n<br>tú -s", t: "Look for these. In the past tense, tú ends in <b>-ste</b> and ellos in <b>-ron</b>." },
      { h: "Try it", v: word("hablamos", "we speak").replace("<b>", "nosotros <b>"), t: "<b>hablamos</b> ends in <b>-mos</b>, so it is <b>nosotros</b>. Easy!" }
    ];
    return f;
  };
  // -ing words
  const GER = () => {
    const vs = [["cantar", "to sing"], ["bailar", "to dance"], ["nadar", "to swim"], ["mirar", "to look"], ["caminar", "to walk"], ["comer", "to eat"], ["beber", "to drink"], ["correr", "to run"], ["aprender", "to learn"], ["escribir", "to write"], ["vivir", "to live"], ["abrir", "to open"], ["subir", "to go up"]];
    const f = () => {
      const [inf, en] = pick(vs), ar = inf.endsWith("ar"), ans = inf.slice(0, -2) + (ar ? "ando" : "iendo");
      const ex = ar ? "hablar" : "comer", exA = ar ? "hablando" : "comiendo";
      const hints = ["In Spanish, the \"-ing\" word of a verb is made by changing its ending.", "Verbs that end in <b>-ar</b> use one special ending. Verbs that end in <b>-er</b> or <b>-ir</b> use another one. Look at the end of your verb.", `Example: ${ex} → ${exA}. Take off the last two letters and add the new ending. Now do yours.`];
      if (Math.random() < 0.5) return { text: `Type the "-ing" form of <b>${inf}</b> (${en}).`, textInput: true, answer: ans, hints };
      const stem = inf.slice(0, -2), wr = ar ? [stem + "iendo", stem + "ado"] : [stem + "ando", stem + "ido"];
      return { text: `Which one means "${en.replace("to ", "")}ing"? <b>${inf}</b> →`, choices: shuf([ans, ...wr]), answer: ans, hints };
    };
    f.teach = () => [
      { h: "The -ing word", v: "cantar → cantando", t: "In English we add <b>-ing</b>: singing. In Spanish: -ar verbs change to <b>-ando</b>." },
      { h: "-er and -ir verbs", v: "comer → comiendo<br>vivir → viviendo", t: "Verbs ending in <b>-er</b> or <b>-ir</b> change to <b>-iendo</b>." },
      { h: "Use it", v: word("Estoy cantando.", "I am singing."), t: "You will use this word with <b>estar</b> in the next lesson." }
    ];
    return f;
  };
  // tú commands from regular verbs
  const COM = () => {
    const vs = [["hablar", "speak", "habla"], ["comer", "eat", "come"], ["abrir", "open", "abre"], ["mirar", "look", "mira"], ["escuchar", "listen", "escucha"], ["leer", "read", "lee"], ["cantar", "sing", "canta"], ["correr", "run", "corre"], ["beber", "drink", "bebe"], ["saltar", "jump", "salta"], ["escribir", "write", "escribe"], ["ayudar", "help", "ayuda"]];
    const f = () => {
      const [inf, en, ans] = pick(vs), ex = pick(vs.filter(x => x[0] !== inf));
      const hints = ["A command tells your friend to do something. In Spanish, a friendly command for <b>tú</b> is easy for regular verbs.", "A regular command looks exactly like the <b>él / ella</b> form of the verb in the present tense. Do not add an -s.", `Example: ${ex[0]} → ${ex[2]}. Now do yours.`];
      if (Math.random() < 0.5) return { text: `Tell your friend to ${en}! Type the tú command for <b>${inf}</b>.`, textInput: true, answer: ans, hints };
      return { text: `Tell your friend to ${en}! Which is the tú command for <b>${inf}</b>?`, choices: shuf([ans, ans + "s", inf]), answer: ans, hints };
    };
    f.teach = () => [
      { h: "Friendly commands", v: "¡Habla! ¡Come! ¡Abre!", t: "To tell a friend to do something, use the <b>tú command</b>." },
      { h: "The easy rule", v: "habla · come · abre", t: "For regular verbs, the command is the same as the <b>él / ella</b> form: <b>hablar → habla</b>, <b>comer → come</b>." },
      { h: "Not the same as tú", v: "hablas ❌ → habla ✅", t: "The normal tú form ends in <b>-s</b> (hablas = you speak). The command drops the -s." }
    ];
    return f;
  };
  // past participles
  const PP = () => {
    const irr = [["hacer", "do", "hecho", "It ends in -cho."], ["escribir", "write", "escrito", "It ends in -ito."], ["ver", "see", "visto", "It starts with a v and ends in -to."], ["decir", "say", "dicho", "It ends in -cho."], ["abrir", "open", "abierto", "It starts with ab- and ends in -to."], ["poner", "put", "puesto", "It starts with pu- and ends in -to."], ["volver", "return", "vuelto", "The o of the verb changes to ue, and it ends in -to."], ["romper", "break", "roto", "It is short: four letters."]];
    const reg = [["hablar", "speak"], ["cantar", "sing"], ["bailar", "dance"], ["comer", "eat"], ["beber", "drink"], ["vivir", "live"], ["subir", "go up"], ["aprender", "learn"], ["terminar", "finish"]];
    const f = () => {
      if (Math.random() < 0.55) {
        const [inf, en] = pick(reg), ar = inf.endsWith("ar"), st = inf.slice(0, -2), ans = st + (ar ? "ado" : "ido");
        const ex = ar ? "caminar → caminado" : "recibir → recibido";
        return { text: `What is the past participle of <b>${inf}</b> (${en})? It is the word after "he", like "I have ___".`, choices: shuf([ans, st + (ar ? "ido" : "ado"), st + "ando"]).filter((x, i, a) => a.indexOf(x) === i), answer: ans,
          hints: ["The past participle is the \"done\" word, like spoken, eaten or lived.", "Verbs that end in <b>-ar</b> use one ending. Verbs that end in <b>-er</b> or <b>-ir</b> use another one.", `Example: ${ex}. Take off the last two letters and add the new ending. Now do yours.`] };
      }
      const [inf, en, ans, clue] = pick(irr), others = shuf(irr.filter(x => x[2] !== ans));
      const bad = inf.slice(0, -2) + (inf.endsWith("ar") ? "ado" : "ido");
      return { text: `This verb is irregular. What is the past participle of <b>${inf}</b> (to ${en})?`, choices: shuf([ans, bad, others[0][2]]), answer: ans,
        hints: ["Some verbs are irregular. Their \"done\" word does not follow the -ado / -ido rule.", clue, "Example: the verb <b>cubrir</b> (to cover) becomes <b>cubierto</b>, not cubrido. Irregular ones must be remembered. Now do yours."] };
    };
    f.teach = () => [
      { h: "The \"done\" word", v: "hablar → hablado<br>comer → comido", t: "The past participle works like <b>spoken</b> or <b>eaten</b>. -ar verbs use <b>-ado</b>. -er and -ir verbs use <b>-ido</b>." },
      { h: "Irregular ones", v: "hecho · escrito · visto · dicho", t: "Some verbs are special: <b>hacer → hecho</b>, <b>escribir → escrito</b>, <b>ver → visto</b>, <b>decir → dicho</b>." },
      { h: "More special ones", v: "abierto · puesto · vuelto · roto", t: "<b>abrir → abierto</b>, <b>poner → puesto</b>, <b>volver → vuelto</b>, <b>romper → roto</b>. Many end in <b>-to</b>." }
    ];
    return f;
  };
  // adverbs
  const ADV = () => {
    const it = [["rápido", "rápida", "quick", "rápidamente", "quickly"], ["lento", "lenta", "slow", "lentamente", "slowly"], ["claro", "clara", "clear", "claramente", "clearly"], ["tranquilo", "tranquila", "calm", "tranquilamente", "calmly"], ["cuidadoso", "cuidadosa", "careful", "cuidadosamente", "carefully"], ["fácil", "fácil", "easy", "fácilmente", "easily"], ["feliz", "feliz", "happy", "felizmente", "happily"], ["triste", "triste", "sad", "tristemente", "sadly"], ["fuerte", "fuerte", "strong", "fuertemente", "strongly"]];
    const f = () => {
      const [a, fem, en, ans, enAdv] = pick(it), ex = pick(it.filter(x => x[0] !== a));
      const hints = ["An adverb tells HOW something is done. In English many end in -ly.", "Take the adjective (use the girl form, ending in -a, if it has one) and add <b>-mente</b>.", `Example: ${ex[0]} (${ex[2]}) → ${ex[3]} (${ex[4]}). Now do yours.`];
      if (Math.random() < 0.5) return { text: `Make an adverb from <b>${a}</b> (${en}). It means "${enAdv}".`, textInput: true, answer: ans, hints };
      const wr = shuf([fem + "ente", a + "mente", a.replace(/o$/, "a") + "ente"].filter(x => x !== ans)).filter((x, i, ar) => ar.indexOf(x) === i).slice(0, 2);
      while (wr.length < 2) wr.push(a + "ado");
      return { text: `Which word means "${enAdv}"? (from <b>${a}</b>)`, choices: shuf([ans, ...wr]), answer: ans, hints };
    };
    f.teach = () => [
      { h: "How? -mente!", v: "lenta → lentamente", t: "Add <b>-mente</b> to the adjective to say HOW. It works like <b>-ly</b> in English: slow → slowly." },
      { h: "Use the girl form", v: "rápido → rápida → rápidamente", t: "If the adjective ends in <b>-o</b>, change it to <b>-a</b> first. If it ends in <b>-e</b> or a consonant, just add -mente." },
      { h: "Examples", v: word("fácilmente", "easily") + "<br>" + word("felizmente", "happily"), t: "Adverbs never change for boys, girls or many." }
    ];
    return f;
  };
  // dates
  const DT = () => {
    const f = () => {
      let d, m; do { d = ri(2, 28); m = ri(0, 11); } while (d === 3 && m === 3);
      const es = `el ${numEs(d)} de ${MONTHS[m]}`, d2 = d === 28 ? 27 : d + 1, m2 = (m + 3) % 12;
      const hints = ["Dates in Spanish go in this order: the day first, then the month.", "The pattern is <b>el</b> + the number + <b>de</b> + the month. Months start with a small letter.", "Example: April 3 is <b>el tres de abril</b>. Now do yours."];
      if (Math.random() < 0.5) return { text: `How do you say "${MEN[m]} ${d}" in Spanish?`, choices: shuf([es, `el ${numEs(d2)} de ${MONTHS[m]}`, `el ${numEs(d)} de ${MONTHS[m2]}`]), answer: es, hints };
      return { text: `What date is <b>${es}</b>?`, say: es, lang: "es-ES", choices: shuf([`${MEN[m]} ${d}`, `${MEN[m]} ${d2}`, `${MEN[m2]} ${d}`]), answer: `${MEN[m]} ${d}`, hints };
    };
    f.teach = () => [
      { h: "Saying the date", v: "el cinco de mayo", t: "In Spanish the <b>day comes first</b>: <b>el cinco de mayo</b> = May 5." },
      { h: "The pattern", v: "el + number + de + month", t: "Say <b>el</b>, then the number, then <b>de</b>, then the month: <b>el doce de junio</b> = June 12." },
      { h: "Practice words", v: word("el catorce de febrero", "February 14").replace("🔊", "🔊"), t: "Tap it to hear it. Remember: month names use small letters in Spanish." }
    ];
    return f;
  };
  // thousands
  const NT = () => {
    const f = () => {
      const k = ri(1, 9), r = pick([0, 0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 50, 20, 75, 15]);
      let n = k * 1000 + r; if (n === 3400) n = 3500;
      const n1 = n + 1000 > 9999 ? n - 1000 : n + 1000, n2 = k * 1000 + ((n % 1000) === 200 ? 300 : 200 + (n % 1000 === 0 ? 100 : 0)) + (n % 1000 === 300 || n % 1000 === 0 ? 0 : 0);
      const n2b = [n2, k * 1000 + 700, k * 1000 + 100].find(x => x !== n && x !== n1);
      const w = numEs(n), alt = [numEs(n1), numEs(n2b)];
      const hints = ["Thousands come first. Say how many thousands, then the rest.", "<b>mil</b> means a thousand. For 1,000 just say <b>mil</b> (never \"uno mil\"). For two thousand or more say the number first: <b>dos mil</b>.", "Example: 3,400 is <b>tres mil cuatrocientos</b>: three thousand, four hundred. Now do yours."];
      if (Math.random() < 0.5) return { text: `What number is "${w}"?`, say: w, lang: "es-ES", choices: shuf([n, n1, n2b]), answer: n, hints };
      return { text: `How do you say ${n} in Spanish?`, choices: shuf([w, ...alt]), answer: w, hints };
    };
    f.teach = () => [
      { h: "A thousand: mil", v: "1000 = mil", t: "<b>mil</b> is a thousand. We never say \"uno mil\", just <b>mil</b>." },
      { h: "Two thousand and up", v: "2000 = dos mil<br>5000 = cinco mil", t: "Say the number, then <b>mil</b>. Mil never changes: <b>tres mil</b>, not \"tres miles\"." },
      { h: "Add the rest", v: "3400 = tres mil cuatrocientos", t: "After <b>mil</b> say the hundreds and tens like before: <b>1500 = mil quinientos</b>." }
    ];
    return f;
  };

  // ====================== LEVEL 7 ======================
  const YEST = SP("Words for the past", [["ayer", "yesterday"], ["anoche", "last night"], ["anteayer", "the day before yesterday"], ["la semana pasada", "last week"], ["el mes pasado", "last month"], ["el año pasado", "last year"], ["hace dos días", "two days ago"], ["esta mañana", "this morning"], ["de repente", "suddenly"], ["entonces", "then"]]);
  const ROUT = SP("My daily routine", [["despertarse", "to wake up", "⏰"], ["levantarse", "to get up", "🛏️"], ["ducharse", "to take a shower", "🚿"], ["vestirse", "to get dressed", "👕"], ["peinarse", "to comb your hair", "💇"], ["desayunar", "to eat breakfast", "🥞"], ["acostarse", "to go to bed", "😴"], ["dormirse", "to fall asleep", "💤"], ["cepillarse los dientes", "to brush your teeth", "🦷"], ["lavarse las manos", "to wash your hands", "🧼"]]);
  const KIT = SP("In the kitchen", [["cuchara", "spoon", "🥄"], ["tenedor", "fork", "🍴"], ["plato", "plate", "🍽️"], ["vaso", "glass", "🥛"], ["taza", "cup", "☕"], ["olla", "pot", "🍲"], ["sartén", "frying pan", "🍳"], ["horno", "oven"], ["refrigerador", "refrigerator"], ["servilleta", "napkin"]]);
  const MUS = SP("Music", [["guitarra", "guitar", "🎸"], ["piano", "piano", "🎹"], ["tambor", "drum", "🥁"], ["violín", "violin", "🎻"], ["trompeta", "trumpet", "🎺"], ["flauta", "flute"], ["orquesta", "orchestra"], ["banda", "band"], ["cantante", "singer", "🎤"], ["ritmo", "rhythm"]]);
  const HEAL = SP("Feeling sick", [["fiebre", "fever", "🤒"], ["tos", "cough"], ["resfriado", "cold (sickness)", "🤧"], ["dolor", "pain"], ["medicina", "medicine", "💊"], ["enfermo", "sick"], ["sano", "healthy"], ["garganta", "throat"], ["descansar", "to rest", "🛌"], ["Me siento mal.", "I feel bad."]]);
  const TENP = SP("Tener expressions", [["tener hambre", "to be hungry", "🍽️"], ["tener sed", "to be thirsty", "🥤"], ["tener frío", "to be cold", "🥶"], ["tener calor", "to be hot", "🥵"], ["tener sueño", "to be sleepy", "😴"], ["tener miedo", "to be scared", "😨"], ["tener prisa", "to be in a hurry", "🏃"], ["tener razón", "to be right", "✅"]]);

  const pastPick = R([
    "Which one tells about the PAST?|Ayer comí pizza.|Mañana como pizza.|Ahora como pizza.", "Which one tells about the PAST?|Anoche dormí bien.|Esta noche duermo bien.|Mañana duermo bien.",
    "Which one tells about the PAST?|La semana pasada viajé a Madrid.|La próxima semana viajo a Madrid.|Hoy viajo a Madrid.", "Which one tells about the PAST?|Anteayer escribí una carta.|Mañana escribo una carta.|Ahora escribo una carta.",
    "Which one tells about the PAST?|El año pasado aprendí a nadar.|El año próximo aprendo a nadar.|Ahora aprendo a nadar.", "Which one tells about the PAST?|Hace dos días vi a mi tío.|Dentro de dos días veo a mi tío.|Hoy veo a mi tío.",
    "Which one tells about the PAST?|Ayer caminé al parque.|Mañana camino al parque.|Hoy camino al parque."
  ], ["Find the time clue in each sentence. Does it look back at yesterday, or ahead to tomorrow?", "Time words like the ones in the lesson that end in \"pasada\" or start with \"hace\" look back. Past verbs also often end with an accent mark.", "Example: \"Ayer hablé con Ana\" is about the past, but \"Mañana hablo con Ana\" is about tomorrow. Now do yours."], [
    ["Time words", "⏰", "Past time words tell us <b>when</b> something already happened: <b>ayer</b> (yesterday), <b>anoche</b> (last night)."], ["More past words", "📅", "<b>la semana pasada</b> = last week, <b>el año pasado</b> = last year, <b>hace dos días</b> = two days ago."], ["Spot the past", "👀", "When you see a past time word, the verb is in the past too: <b>comí</b>, <b>caminé</b>, <b>escribí</b>."]]);
  const comp = R([
    "El elefante es ___ grande que el gato.|más|menos|tan|~Think about it: is an elephant bigger or smaller than a cat?", "La tortuga es ___ rápida que el conejo.|menos|más|como|~Which animal is faster? Does the turtle have more or less speed?",
    "El sol es ___ caliente que la nieve.|más|menos|como|~Is the sun hotter or colder than snow?", "Una bicicleta es ___ rápida que un avión.|menos|más|tan|~Compare the speed of a bike and an airplane.",
    "Una montaña es ___ alta que una casa.|más|menos|como|~Which one is taller, a mountain or a house?", "Un lápiz es ___ grande que un autobús.|menos|más|tan|~Compare the size of a pencil and a bus.",
    "Mi mochila es ___ pesada que tu mochila. (They weigh the same.)|tan|más|menos|~The two bags weigh the same. Which word means \"as ... as\"?", "Ana es tan alta ___ Luis. (They are the same height.)|como|que|de|~With \"tan\" you finish with the little word for \"as\".",
    "El hielo es ___ frío que el fuego.|más|menos|como|~Is ice colder or hotter than fire?"
  ], ["Comparing two things? Ask yourself which one has MORE of the quality, which has LESS, or if they are the same.", "ok", a => a === "más" ? "Example: \"La nieve es menos caliente que el fuego.\" uses the word for LESS. Now do yours." : a === "menos" ? "Example: \"La jirafa es más alta que la vaca.\" uses the word for MORE. Now do yours." : "Example: \"La jirafa es más alta que la vaca.\" compares two things that are different. Yours says they are equal. Now do yours."], [
    ["Comparing", "⚖️", "To compare two things use <b>más ... que</b> (more than) or <b>menos ... que</b> (less than)."], ["Example", "🐘", word("El elefante es más grande que el gato.", "The elephant is bigger than the cat."), ], ["The same", "🟰", "To say they are equal use <b>tan ... como</b>: <b>Ana es tan alta como Luis</b>."]]);
  const sup = R([
    "How do you say \"the tallest\"?|el más alto|el más bajo|más alto", "How do you say \"the smallest\"?|el más pequeño|el más grande|menos pequeño",
    "How do you say \"the fastest\"?|el más rápido|el más lento|más rápido que", "How do you say \"the best\"?|el mejor|el peor|mejor que",
    "How do you say \"the worst\"?|el peor|el mejor|peor que", "How do you say \"older\" (for people)?|mayor|menor|mejor",
    "How do you say \"younger\" (for people)?|menor|mayor|peor", "How do you say \"the oldest\" (person)?|el mayor|el menor|el peor",
    "How do you say \"the most intelligent\"?|el más inteligente|el menos inteligente|más inteligente que", "How do you say \"the slowest\"?|el más lento|el más rápido|más lento que"
  ], ["Is it \"the most\" (the top one) or just a comparison? Look for the word \"the\" at the front.", "For \"the most ...\" put <b>el</b> in front of the word for MORE and then the quality. Some words are special and have their own form: good, bad, old, young.", "Example: \"the most beautiful\" is <b>el más bonito</b>. Now do yours."], [
    ["The most...", "🏆", "To say \"the most\" use <b>el más</b> + a quality: <b>el más alto</b> (the tallest)."], ["Special words", "⭐", "Four are special: <b>mejor</b> (better, best), <b>peor</b> (worse, worst), <b>mayor</b> (older), <b>menor</b> (younger)."], ["Remember", "🧠", "We say <b>el mejor</b>, not \"el más bueno\". Say the special ones out loud!"]], { letter: true });
  const adjAg = R([
    "Las casas son ___. (blanco)|blancas|blanco|blancos", "Las flores son ___. (rojo)|rojas|rojos|roja", "Los libros son ___. (nuevo)|nuevos|nuevas|nuevo",
    "La mochila es ___. (nuevo)|nueva|nuevo|nuevas", "El perro es ___. (pequeño)|pequeño|pequeña|pequeños", "Mis hermanas son ___. (alto)|altas|altos|alta",
    "Los niños son ___. (feliz)|felices|feliz|felizes", "La clase es ___. (grande)|grande|grando|grandas", "Los carros son ___. (rápido)|rápidos|rápido|rápidas",
    "Las ventanas están ___. (abierto)|abiertas|abierto|abiertos"
  ], ["Look at the noun. Is it a boy-word (el, los) or a girl-word (la, las)? Is it one or many?", "The adjective must match: <b>-o</b> for boy words, <b>-a</b> for girl words, and add an <b>-s</b> if there are many. Adjectives that end in <b>-e</b> only add -s (or -es after a consonant) and do not change for boys and girls.", "Example: <b>el árbol bonito</b>, <b>la flor bonita</b>, <b>los árboles bonitos</b>. Now do yours."], [
    ["Matching words", "🎯", "In Spanish the adjective must <b>match</b> the noun in gender (boy or girl) and number (one or many)."], ["Four forms", "🔤", "<b>bonito · bonita · bonitos · bonitas</b>. Tap-and-say them in a row!"], ["Special ones", "✨", "Adjectives ending in <b>-e</b> like <b>grande</b> do not change for boys and girls: <b>el árbol grande</b>, <b>la casa grande</b>. For many: <b>grandes</b>."]]);
  const tenerR = R([
    "Yo ___ hambre después de correr.|tengo|tiene|tienes", "Tú ___ frío en la nieve.|tienes|tengo|tiene", "Mi gato ___ sueño.|tiene|tengo|tienen", "Nosotros ___ calor en el verano.|tenemos|tienen|tengo",
    "Los niños ___ sed.|tienen|tiene|tenemos", "Ella ___ miedo de la tormenta.|tiene|tengo|tienes", "Yo ___ prisa porque llego tarde.|tengo|tienes|tenemos", "Tú ___ razón.|tienes|tiene|tengo"
  ], ["The verb <b>tener</b> changes to match WHO. Who is it here?", "Tener is special in the yo form, and its middle changes (e becomes ie) except for nosotros. Look at the pronoun first.", "Example: \"Ellos tienen un perro\" uses the ellos form; \"Yo tengo un perro\" uses the yo form. Now do yours."], [
    ["Tener", "🙂", "<b>tener</b> means to have: yo tengo, tú tienes, él tiene, nosotros tenemos, ellos tienen."], ["Not \"to be\"", "🥶", "Spanish says \"I HAVE cold\" for \"I am cold\": <b>Tengo frío</b>."], ["Remember", "🧠", "The whole group: hambre, sed, frío, calor, sueño, miedo, prisa, razón."]]);
  const dirObj = R([
    "Leo el libro. → ___ leo.|Lo|La|Los", "Como la manzana. → ___ como.|La|Lo|Las", "Veo los pájaros. → ___ veo.|Los|Las|Lo", "Compro las flores. → ___ compro.|Las|Los|La",
    "Tengo el lápiz. → ___ tengo.|Lo|La|Los", "Abro la puerta. → ___ abro.|La|Lo|Las", "Miro los dibujos. → ___ miro.|Los|Las|La", "Escucho las canciones. → ___ escucho.|Las|La|Los",
    "Bebo el jugo. → ___ bebo.|Lo|Los|La", "Quiero la galleta. → ___ quiero.|La|Las|Lo"
  ], ["Look at the word before the noun (el, la, los or las). The little replacement word matches it.", "Replace the noun with a little word that has the same gender and number. It goes right before the verb.", "Example: \"Veo el gato\" becomes \"Lo veo\", and \"Veo las casas\" becomes \"Las veo\". Now do yours."], [
    ["Replacing nouns", "🔁", "To avoid saying the noun again, use a <b>direct object pronoun</b>: <b>lo, la, los, las</b>."], ["They match", "🎯", "<b>el libro → lo</b> · <b>la casa → la</b> · <b>los libros → los</b> · <b>las casas → las</b>."], ["Where it goes", "📍", "Put it <b>before</b> the verb: <b>Compro el pan → Lo compro</b>."]]);
  const T7 = TP;
  const typ7 = TYE([].concat(ROUT.items, KIT.items, MUS.items, HEAL.items, YEST.items.slice(0, 4)), "this level");
  const L7 = [
    XL("Past tense: -ar verbs", CJ(T7.PRa, ["hablar", "caminar", "bailar", "nadar", "cocinar", "mirar"])),
    XL("Past tense: -er and -ir", CJ(T7.PRe, ["comer", "beber", "correr", "vivir", "escribir", "abrir"])),
    XL("Words for the past", MIX([V(YEST), pastPick], [["Past time words", "📅", "These words show something already happened: ayer, anoche, anteayer, la semana pasada."], ["Learn them", YEST.items.map(x => word(x[0], x[1])).join("<br>"), "<b>Tap to hear them.</b>"], ["Past or not?", "👀", "Look for the time clue first. It tells you if the verb must be in the past."]])),
    XL("Ir and ser in the past", CJ(T7.PRir, ["ir", "ser"])),
    XL("Special past verbs", CJ(T7.PRir2, ["hacer", "tener", "estar", "venir", "poder"])),
    XL("Reflexive verbs", CJ(T7.REF, ["levantarse", "lavarse", "ducharse", "peinarse", "vestirse", "despertarse", "acostarse"])),
    XL("My daily routine", V(ROUT)),
    XL("Making the -ing word", GER()),
    XL("I am doing it now", R([
      "Yo ___ cantando.|estoy|está|estamos", "Ella ___ cocinando.|está|estoy|estás", "Nosotros ___ jugando.|estamos|están|estoy", "Ellos ___ comiendo.|están|estamos|está",
      "Tú ___ leyendo un libro.|estás|estoy|está", "I am eating.|Estoy comiendo.|Estás comiendo.|Está comiendo.", "We are playing.|Estamos jugando.|Estoy jugando.|Están jugando.", "They are swimming.|Están nadando.|Estamos nadando.|Está nadando.",
      "She is dancing.|Ella está bailando.|Ella estoy bailando.|Ella estamos bailando."
    ], ["To say what is happening right now, use <b>estar</b> + the -ing word. Who is doing it?", "The helper verb <b>estar</b> changes for WHO (yo, tú, él, nosotros, ellos). The -ando / -iendo word never changes.", "Example: \"Tú estás hablando\" and \"Nosotros estamos hablando\". Now do yours."], [
      ["Right now", "▶️", "To say what is happening <b>right now</b>, use <b>estar</b> + the -ing word."], ["Put it together", word("Estoy comiendo.", "I am eating."), "<b>estoy, estás, está, estamos, están</b> + <b>-ando / -iendo</b>."], ["The -ing never changes", "🧱", "Only <b>estar</b> changes. The -ando / -iendo word stays the same."]])),
    XL("Lo, la, los, las", dirObj),
    XL("More or less than", comp),
    XL("The biggest and the best", sup),
    XL("Matching adjectives", adjAg),
    XL("In the kitchen", V(KIT)),
    XL("Music", V(MUS)),
    XL("Feeling sick", V(HEAL, "Say the words, and think of how they sound like English: fiebre ≈ fever, medicina ≈ medicine.")),
    XL("Tener expressions", MIX([V(TENP), tenerR], [["Spanish says \"have\"", "🥶", "To say how you feel, Spanish uses <b>tener</b> (to have): <b>Tengo frío</b> = I am cold."], ["The group", TENP.items.map(x => word(x[0], x[1], x[2])).join("<br>"), "<b>Tap to hear them.</b>"], ["Change the verb", "🔁", "Change <b>tener</b> to match who feels it: <b>tengo, tienes, tiene, tenemos, tienen</b>."]])),
    XL("Type it in Spanish", typ7),
    XL("Mixed practice", MIX([CJ(T7.PRa, ["hablar", "caminar", "bailar", "nadar", "cocinar", "mirar"]), CJ(T7.PRe, ["comer", "beber", "correr", "vivir", "escribir", "abrir"]), dirObj, comp, V(ROUT)], [["Past tense", "⏪", "-ar verbs: -é, -aste, -ó, -amos, -aron. -er/-ir verbs: -í, -iste, -ió, -imos, -ieron."], ["Little words", "🔁", "<b>lo, la, los, las</b> replace a noun. <b>más ... que</b> and <b>menos ... que</b> compare."], ["Daily routine", "⏰", "despertarse, levantarse, ducharse, vestirse, acostarse."]])),
    XL("Level 7 Challenge", MIX([CJ(T7.PRa, ["hablar", "caminar", "bailar"]), CJ(T7.PRe, ["comer", "vivir", "escribir"]), CJ(T7.PRir, ["ir", "ser"]), CJ(T7.PRir2, ["hacer", "tener", "estar", "venir"]), CJ(T7.REF, ["levantarse", "lavarse", "ducharse", "peinarse"]), GER(), dirObj, comp, sup, adjAg, tenerR, V(KIT), V(MUS), V(HEAL)],
      [["Level 7 review", "🏅", "You learned the past tense, reflexive verbs, the -ing word, little replacement words and comparing."], ["Past and now", "⏪", "Past: hablé, comí, fui, hice. Now: me levanto, estoy comiendo."], ["Take your time", "🧠", "Use the hints if you need them. Good luck!"]]))
  ];

  // ====================== LEVEL 8 ======================
  const TRAV = SP("Travel", [["aeropuerto", "airport", "✈️"], ["estación", "station", "🚉"], ["maleta", "suitcase", "🧳"], ["boleto", "ticket", "🎫"], ["pasaporte", "passport", "🛂"], ["viaje", "trip"], ["hotel", "hotel", "🏨"], ["mapa", "map", "🗺️"], ["salida", "exit"], ["llegada", "arrival"]]);
  const HOB = SP("Hobbies", [["pintar", "to paint", "🎨"], ["coleccionar", "to collect"], ["patinar", "to skate", "🛼"], ["pescar", "to fish", "🎣"], ["acampar", "to camp", "⛺"], ["ajedrez", "chess", "♟️"], ["videojuegos", "video games", "🎮"], ["fotografía", "photography", "📷"], ["tejer", "to knit"], ["armar rompecabezas", "to do puzzles", "🧩"]]);
  const NEG = SP("Negative words", [["nunca", "never"], ["nada", "nothing"], ["nadie", "nobody"], ["tampoco", "neither, not either"], ["también", "also"], ["algo", "something"], ["alguien", "someone"], ["todavía", "still, yet"], ["ya", "already"], ["jamás", "never ever"]]);
  const negT = [["No tengo nada.", "I do not have anything."], ["Nadie está en casa.", "Nobody is at home."], ["Nunca como pescado.", "I never eat fish."], ["Yo tampoco quiero ir.", "I do not want to go either."], ["No veo a nadie.", "I do not see anyone."], ["Tengo algo para ti.", "I have something for you."], ["Alguien toca la puerta.", "Someone knocks on the door."], ["Todavía no termino.", "I have not finished yet."], ["Ya terminé mi tarea.", "I already finished my homework."]];
  const obl = TR([["Tengo que estudiar.", "I have to study."], ["Debes escuchar a tu maestra.", "You should listen to your teacher."], ["Hay que beber agua.", "One must drink water."], ["Acabo de comer.", "I just ate."], ["Necesito ayuda.", "I need help."], ["Mi mamá tiene que trabajar.", "My mom has to work."], ["Vamos a salir.", "We are going to go out."], ["Voy a leer un libro.", "I am going to read a book."], ["Ellos acaban de llegar.", "They just arrived."], ["Debemos cuidar el planeta.", "We should take care of the planet."]], [
    ["Have to", "📋", "<b>tener que</b> + a verb means have to: <b>Tengo que estudiar</b>. <b>Hay que</b> means one must."], ["Should and need", "✅", "<b>deber</b> + a verb means should. <b>necesitar</b> means to need."], ["Just did it", "🕐", "<b>acabar de</b> + a verb means just did it: <b>Acabo de comer</b> = I just ate. Plans: <b>ir a</b> + verb."]]);
  const pvi = R([
    "Todos los días yo ___ al parque.|iba|fui|va|~The clue words \"todos los días\" tell you it was a habit that repeated.", "Ayer yo ___ al parque.|fui|iba|voy|~The word \"ayer\" points to one time, finished.",
    "Cuando era niño, yo ___ mucho.|jugaba|jugué|juego|~\"Cuando era niño\" talks about a long time in the past, like a habit.", "Anoche nosotros ___ una película.|vimos|veíamos|vemos|~\"Anoche\" is one particular night, and it is finished.",
    "Siempre ___ pan en el desayuno.|comía|comí|como|~\"Siempre\" means every time, again and again.", "El sábado pasado ellos ___ en el lago.|nadaron|nadaban|nadan|~\"El sábado pasado\" is one specific day.",
    "Cada verano mi abuela ___ galletas.|hacía|hizo|hace|~\"Cada verano\" means it repeated each time.", "Ayer mi mamá ___ una sopa.|cocinó|cocinaba|cocina|~\"Ayer\" is one specific time, finished.",
    "Cuando vivía en México, yo ___ tacos todos los días.|comía|comí|como|~\"Todos los días\" means a repeated habit in the past.", "Hoy a las ocho yo ___ el desayuno.|comí|comía|como|~\"A las ocho\" is one specific moment that is done."
  ], ["Ask: did it happen ONE time and finish, or did it happen again and again (a habit, \"used to\")?", "ok", "Example: \"Ayer hablé con Ana\" (one time) and \"Siempre hablaba con Ana\" (a habit). Now do yours."], [
    ["Two past tenses", "⏪", "Spanish has two past tenses. The <b>preterite</b> (hablé) is for one finished event. The <b>imperfect</b> (hablaba) is for habits and \"used to\"."], ["Clue words", "🔎", "<b>ayer, anoche, el sábado pasado</b> → preterite. <b>siempre, todos los días, cada verano, cuando era niño</b> → imperfect."], ["Decide", "🤔", "Read the time clue first. Then pick the tense that fits it."]]);
  const porpara = R([
    "Este regalo es ___ ti.|para|por|de|~Is the gift going TO someone? That is the person who receives it.", "Gracias ___ tu ayuda.|por|para|con|~You thank someone BECAUSE of what they did.",
    "Camino ___ el parque.|por|para|de|~You walk THROUGH or along the park.", "Estudio ___ ser doctor.|para|por|de|~This is the goal, the reason you do it: in order to.",
    "Pago diez pesos ___ el libro.|por|para|de|~It is an exchange: money in return for a book.", "Hablamos ___ teléfono.|por|para|con|~This is the way or means you use to talk.",
    "El pastel es ___ la fiesta.|para|por|con|~It is for an event, the purpose of the cake.", "Una carta ___ mi abuela.|para|por|de|~Think: who gets the letter?"
  ], ["<b>Por</b> and <b>para</b> both can mean \"for\". Ask: is it a goal or a receiver, or a way, a reason or an exchange?", "ok", "Example: \"Un regalo para Ana\" (Ana receives it) and \"Gracias por la comida\" (thanks because of the food). Now do yours."], [
    ["Para", "🎯", "<b>para</b> = for someone, in order to, a goal: <b>para ti</b> (for you), <b>para ser</b> (in order to be)."], ["Por", "🔀", "<b>por</b> = through, because of, by means of, in exchange for: <b>por el parque</b>, <b>gracias por</b>, <b>por teléfono</b>."], ["Test", "🧪", "Ask yourself: who gets it, or what is the goal? That is <b>para</b>. How, through where, or why? That is <b>por</b>."]]);
  const savcon = R([
    "Yo ___ hablar español.|sé|conozco|soy|~You can do it. It is something you have learned (a skill).", "Yo ___ a tu hermana.|conozco|sé|soy|~You are familiar with a person.",
    "¿___ tú dónde está el baño?|Sabes|Conoces|Eres|~You are asking about a fact or information.", "Nosotros ___ la ciudad de Madrid.|conocemos|sabemos|somos|~You are familiar with a place.",
    "Ella ___ leer muy bien.|sabe|conoce|es|~Reading is a skill she has learned.", "Ellos ___ al maestro nuevo.|conocen|saben|son|~They have met a person.",
    "Yo ___ la respuesta.|sé|conozco|soy|~The answer is a piece of information.", "Mi familia ___ un buen restaurante.|conoce|sabe|es|~They know a place well.",
    "¿___ tú nadar?|Sabes|Conoces|Eres|~Swimming is a skill."
  ], ["Both verbs mean \"to know\". Think: is it a fact or a skill, or is it a person or place you are familiar with?", "ok", "Example: \"Sé cantar\" (I know how to sing) and \"Conozco a Ana\" (I know Ana, I have met her). Now do yours."], [
    ["Saber", "🧠", "<b>saber</b> = to know facts or know how to do something: <b>Sé nadar</b>. Forms: sé, sabes, sabe, sabemos, saben."], ["Conocer", "🤝", "<b>conocer</b> = to know or be familiar with people and places: <b>Conozco Madrid</b>. Forms: conozco, conoces, conoce, conocemos, conocen."], ["Rule", "🔑", "Fact or skill → <b>saber</b>. Person or place → <b>conocer</b>."]]);
  const indObj = R([
    "Mi mamá ___ da una galleta a mí.|me|te|le", "Yo ___ escribo una carta a ti.|te|me|le", "Papá ___ compra un helado a mi hermana.|le|les|me", "El maestro ___ da tarea a los niños.|les|le|nos",
    "Tú ___ das un regalo a nosotros.|nos|les|te", "Nosotros ___ cantamos a la abuela.|le|les|nos", "Yo ___ doy agua a los perros.|les|le|me", "Ella ___ lee un cuento a mí.|me|te|le", "Él ___ presta su lápiz a ti.|te|me|le"
  ], ["The little word says WHO gets the thing. Who is that here?", "The little words are: me (to me), te (to you), le (to him / her), nos (to us), les (to them). Find who receives it.", "Example: \"Yo le doy pan a Ana\" (to her) and \"Yo les doy pan a los niños\" (to them). Now do yours."], [
    ["Who gets it?", "🎁", "An <b>indirect object pronoun</b> tells who gets something: <b>Mi mamá me da un libro</b>."], ["The five", "🖐️", "<b>me, te, le, nos, les</b>. Say them like a song."], ["Place", "📍", "Put it before the verb: <b>Te escribo una carta</b> = I write you a letter."]]);
  const mandSl = [["Special commands", "⚡", "Eight verbs have short, special tú commands. You must remember them."], ["The eight", "haz · di · ve · pon<br>sal · ten · ven · sé", "<b>hacer → haz</b>, <b>decir → di</b>, <b>ir → ve</b>, <b>poner → pon</b>, <b>salir → sal</b>, <b>tener → ten</b>, <b>venir → ven</b>, <b>ser → sé</b>."], ["Use them", word("¡Haz tu tarea!", "Do your homework!"), "Say them out loud: haz, di, ve, pon, sal, ten, ven, sé!"]];
  const mandIrr2 = R([
    "Tú command of <b>hacer</b> (to do)|haz|hace|hago", "Tú command of <b>decir</b> (to say)|di|dice|digo", "Tú command of <b>ir</b> (to go)|ve|va|voy", "Tú command of <b>poner</b> (to put)|pon|pone|pongo",
    "Tú command of <b>salir</b> (to go out)|sal|sale|salgo", "Tú command of <b>tener</b> (to have)|ten|tiene|tengo", "Tú command of <b>venir</b> (to come)|ven|viene|vengo", "Tú command of <b>ser</b> (to be)|sé|es|soy"
  ], ["A few common verbs are irregular in the tú command. They are very short!", "These commands are one beat long. Think of the infinitive, then of the short command you memorized.", "Example: the regular verb <b>hablar</b> gives <b>habla</b>, but special verbs have their own short command, like the eight you learned. Now do yours."], mandSl, { letter: true });
  const dates = DT();
  const typ8 = TYE([].concat(TRAV.items, HOB.items, NEG.items.slice(0, 5)), "this level");
  const L8 = [
    XL("Imperfect: -ar verbs", CJ(T7.IMa, ["jugar", "cantar", "nadar", "trabajar", "bailar", "cocinar", "caminar", "hablar"])),
    XL("Imperfect: -er and -ir", CJ(T7.IMe, ["comer", "vivir", "beber", "correr", "escribir", "aprender", "tener", "hacer", "leer"])),
    XL("Ir, ser and ver then", CJ(T7.IMir, ["ir", "ser", "ver"])),
    XL("Once or again and again?", pvi),
    XL("Have to, should, just did", obl),
    XL("Por or para?", porpara),
    XL("Verbs that change e to i", CJ(T7.EI, ["pedir", "servir", "repetir", "seguir"])),
    XL("Verbs that change their middle", CJ(T7.EIE, ["pensar", "empezar", "entender", "preferir", "volver", "encontrar", "contar", "almorzar"])),
    XL("Saber or conocer?", savcon),
    XL("Me, te, le, nos, les", indObj),
    XL("Negative words", MIX([V(NEG), TR(negT, [["Negative words", "🚫", "<b>nunca</b> = never, <b>nada</b> = nothing, <b>nadie</b> = nobody, <b>tampoco</b> = neither."], ["Double negatives", "➖", "In Spanish you can use two negatives: <b>No tengo nada</b> means I do not have anything."], ["Positives", "➕", "<b>algo</b> = something, <b>alguien</b> = someone, <b>también</b> = also, <b>ya</b> = already."]])], [["Negative words", "🚫", "<b>nunca</b> = never, <b>nada</b> = nothing, <b>nadie</b> = nobody, <b>tampoco</b> = neither."], ["Learn them", NEG.items.map(x => word(x[0], x[1])).join("<br>"), "<b>Tap to hear them.</b>"], ["Double negatives", "➖", "Spanish loves double negatives: <b>No tengo nada</b> = I do not have anything."]])),
    XL("Friendly commands", COM()),
    XL("Special commands", mandIrr2),
    XL("The date", dates),
    XL("Thousands", NT()),
    XL("Travel", V(TRAV)),
    XL("Hobbies", V(HOB, "Many hobby words look like English: fotografía ≈ photography, ajedrez is the new one to remember.")),
    XL("Type it in Spanish", typ8),
    XL("Mixed practice", MIX([CJ(T7.IMa, ["jugar", "cantar", "nadar", "trabajar"]), CJ(T7.IMe, ["comer", "vivir", "tener", "hacer"]), pvi, savcon, indObj, COM()], [["Imperfect", "🔁", "Habits in the past: -ar verbs use -aba, -er/-ir verbs use -ía."], ["Two past tenses", "⏪", "One finished event → preterite. Habit or \"used to\" → imperfect."], ["Little words", "🧩", "saber (facts, skills) or conocer (people, places). me, te, le, nos, les."]])),
    XL("Level 8 Challenge", MIX([CJ(T7.IMa, ["jugar", "cantar", "nadar", "trabajar"]), CJ(T7.IMe, ["comer", "vivir", "tener", "hacer"]), CJ(T7.IMir, ["ir", "ser", "ver"]), CJ(T7.EI, ["pedir", "servir", "repetir", "seguir"]), CJ(T7.EIE, ["pensar", "empezar", "entender", "volver", "encontrar", "almorzar"]), pvi, porpara, savcon, indObj, obl, COM(), mandIrr2, dates, NT(), V(TRAV), V(HOB)],
      [["Level 8 review", "🏅", "You learned the imperfect, stem-changing verbs, por and para, saber and conocer, and commands."], ["Remember", "🧠", "One finished event: ayer comí. A habit: siempre comía."], ["Go!", "🚀", "Use the hints if you need them. Good luck!"]]))
  ];

  // ====================== LEVEL 9 ======================
  const SPACE = SP("Space", [["cohete", "rocket", "🚀"], ["astronauta", "astronaut", "🧑‍🚀"], ["galaxia", "galaxy", "🌌"], ["espacio", "space"], ["Tierra", "Earth", "🌍"], ["Marte", "Mars", "🔴"], ["Saturno", "Saturn", "🪐"], ["telescopio", "telescope", "🔭"], ["cometa", "comet", "☄️"], ["satélite", "satellite", "🛰️"]]);
  const TECH = SP("Technology", [["pantalla", "screen", "🖥️"], ["teclado", "keyboard", "⌨️"], ["ratón", "mouse (computer)", "🖱️"], ["archivo", "file"], ["impresora", "printer", "🖨️"], ["aplicación", "app", "📱"], ["contraseña", "password"], ["cámara", "camera", "📷"], ["auriculares", "headphones", "🎧"], ["batería", "battery", "🔋"]]);
  const CONN = SP("Joining words", [["porque", "because"], ["pero", "but"], ["entonces", "so, then"], ["aunque", "although"], ["cuando", "when"], ["mientras", "while"], ["también", "also"], ["después", "after, afterwards"], ["antes", "before"], ["primero", "first"]]);
  const connT = [["Quiero ir, pero llueve.", "I want to go, but it is raining."], ["Como pan porque tengo hambre.", "I eat bread because I am hungry."], ["Primero leo, después juego.", "First I read, then I play."], ["Canto mientras cocino.", "I sing while I cook."], ["Cuando llego a casa, estudio.", "When I get home, I study."], ["¿Quieres té o jugo?", "Do you want tea or juice?"], ["Mi hermano también baila.", "My brother also dances."], ["Voy a la escuela aunque estoy cansado.", "I go to school although I am tired."], ["Tengo frío, entonces busco mi abrigo.", "I am cold, so I look for my coat."]];
  const polite = TR([["Quisiera un vaso de agua.", "I would like a glass of water."], ["¿Podría ayudarme?", "Could you help me?"], ["Me gustaría visitar México.", "I would like to visit Mexico."], ["¿Me puede decir la hora?", "Can you tell me the time?"], ["¿Podría repetir, por favor?", "Could you repeat, please?"], ["Quisiera comprar un libro.", "I would like to buy a book."], ["Me gustaría aprender a nadar.", "I would like to learn to swim."], ["¿Podría abrir la ventana?", "Could you open the window?"], ["Disculpe, ¿dónde está la biblioteca?", "Excuse me, where is the library?"], ["Con permiso.", "Excuse me (to pass by)."]], [
    ["Being polite", "🎩", "To ask for something nicely, Spanish uses special \"would\" words: <b>quisiera</b> (I would like), <b>me gustaría</b> (I would like), <b>¿podría...?</b> (could you...?)."], ["Examples", word("Quisiera un helado.", "I would like an ice cream.") + "<br>" + word("¿Podría ayudarme?", "Could you help me?"), "<b>Tap to hear them.</b>"], ["Magic words", "✨", "Add <b>por favor</b> and <b>gracias</b>. Use <b>disculpe</b> or <b>con permiso</b> when you need to get by."]]);
  const letters = TR([["Querido Juan,", "Dear Juan,"], ["Querida abuela,", "Dear grandma,"], ["Gracias por tu carta.", "Thank you for your letter."], ["Te extraño mucho.", "I miss you a lot."], ["Con cariño,", "With love,"], ["Tu amigo,", "Your friend,"], ["Espero verte pronto.", "I hope to see you soon."], ["Escríbeme pronto.", "Write to me soon."], ["Feliz cumpleaños.", "Happy birthday."], ["Saludos a tu familia.", "Greetings to your family."]], [
    ["Writing a letter", "✉️", "A Spanish letter starts with <b>Querido</b> (to a boy) or <b>Querida</b> (to a girl), then the name."], ["Useful lines", word("Gracias por tu carta.", "Thank you for your letter.") + "<br>" + word("Espero verte pronto.", "I hope to see you soon."), "<b>Tap to hear them.</b>"], ["Goodbyes", "👋", "End with <b>Con cariño,</b> (with love), <b>Tu amigo,</b> (your friend) or <b>Un saludo,</b> (greetings)."]]);
  const qw = R([
    "¿___ es tu color favorito?|Cuál|Qué|Quién|~You are choosing from a group of colors: \"which one?\"", "¿___ años tienes?|Cuántos|Cuánto|Cuál|~You are asking about an amount you can count.",
    "¿___ vives?|Dónde|Cuándo|Quién|~You are asking about a place.", "¿___ es tu cumpleaños?|Cuándo|Dónde|Cómo|~You are asking about a time.",
    "¿___ se llama tu mamá?|Cómo|Cuál|Cuándo|~This question asks \"how\" a person is called.", "¿___ es tu maestro?|Quién|Qué|Cuánto|~You want to know about a person.",
    "¿___ hermanos tienes?|Cuántos|Cuánto|Quiénes|~You count brothers and sisters, and it is a boy-plural word.", "¿Por ___ estás triste?|qué|quién|cómo|~After \"por\" you ask for a reason: \"why\".",
    "¿___ cuesta el libro?|Cuánto|Cuántos|Cuándo|~You want to know an amount of money.", "¿___ van ustedes?|Adónde|Cuándo|Quién|~You are asking \"to where\"."
  ], ["Think about what the question is asking for: a person, a place, a time, a number or a reason?", "ok", "Example: \"¿Dónde está el parque?\" asks for a place, and \"¿Cuándo es la fiesta?\" asks for a time. Now do yours."], [
    ["Question words", "❓", "<b>quién</b> (who), <b>qué</b> (what), <b>dónde</b> (where), <b>cuándo</b> (when), <b>cómo</b> (how)."], ["More", "➕", "<b>cuál</b> (which one), <b>cuánto</b> (how much), <b>cuántos</b> (how many), <b>adónde</b> (to where), <b>por qué</b> (why)."], ["Accents!", "✏️", "Question words always have an accent mark and a ¿ at the start: <b>¿Cuántos años tienes?</b>"]]);
  const dem = R([
    "___ libro (this one, here with me)|Este|Esta|Estos", "___ casa (that one over there)|Esa|Ese|Esas", "___ gatos (these, here)|Estos|Estas|Este", "___ flores (those, over there)|Esas|Esos|Estas",
    "___ mochila (this one, here)|Esta|Este|Estas", "___ lápices (these, here)|Estos|Estas|Esos", "___ silla (that one over there)|Esa|Ese|Esta", "___ niños (those, over there)|Esos|Esas|Estos",
    "___ manzanas (these, here)|Estas|Estos|Esta", "___ árbol (that one over there)|Ese|Esa|Este"
  ], ["Check two things: is the noun a boy-word or a girl-word, and is it one or many? Then think about near or far.", "<b>Est-</b> words point to things near me. <b>Es-</b> words (like ese) point to things farther away. The ending matches gender and number: -e / -a / -os / -as.", "Example: <b>este perro</b> (this dog, near), <b>esas ventanas</b> (those windows, far). Now do yours."], [
    ["This and that", "👉", "<b>este / esta</b> = this (near me). <b>estos / estas</b> = these (near me)."], ["Farther away", "🔭", "<b>ese / esa</b> = that. <b>esos / esas</b> = those. They point to things farther away."], ["Match", "🎯", "They match the noun: <b>este libro</b>, <b>esta casa</b>, <b>estos libros</b>, <b>estas casas</b>."]]);
  const cult = R([
    "Paella is a famous dish from which country?|España|Alemania|Canadá|~It is in Europe, on the Mediterranean sea.", "Ceviche is a famous dish from which country?|Perú|Alemania|Japón|~It is in South America, on the Pacific coast.",
    "Machu Picchu, an old Inca city, is in which country?|Perú|España|Canadá|~It is in the Andes mountains of South America.", "Chichén Itzá, a Maya pyramid, is in which country?|México|Perú|Francia|~It is in North America, south of the United States.",
    "The Galápagos Islands, home of giant tortoises, belong to which country?|Ecuador|Chile|España|~The country is named after the equator.", "La Sagrada Familia, a famous church in Barcelona, is in which country?|España|México|Argentina|~It is in Europe.",
    "Flamenco music and dance come from which country?|España|Canadá|Alemania|~Its home is in Europe, near Portugal.", "Tango music and dance come from which country?|Argentina|Alemania|Japón|~It is in South America, at the southern end of the continent.",
    "Which country is an island in the Caribbean where Spanish is spoken?|Cuba|Perú|Chile|~Think of a country surrounded by sea.", "Which country is home to part of the Amazon rainforest?|Colombia|España|Cuba|~Think of a country in northern South America."
  ], ["Picture a world map. Which part of the world is it from: Europe, North America or South America?", "ok", "Example: Bogotá is the capital of Colombia, and Lima is the capital of Perú. Use what you know about the world. Now do yours."], [
    ["Spanish around the world", "🌎", "Over twenty countries speak Spanish, in Europe, North America, Central America, South America and the Caribbean."], ["Famous places", "🏛️", "<b>Machu Picchu</b> is in Perú. <b>Chichén Itzá</b> is in México. The <b>Galápagos</b> belong to Ecuador."], ["Food and dance", "💃", "<b>Paella</b> and <b>flamenco</b> are from España. <b>Ceviche</b> is from Perú. <b>Tango</b> is from Argentina."]]);
  const sayings = TR([["Más vale tarde que nunca.", "Better late than never."], ["Poco a poco.", "Little by little."], ["Manos a la obra.", "Let's get to work."], ["Ser pan comido.", "To be a piece of cake (very easy)."], ["Costar un ojo de la cara.", "To cost a fortune."], ["La práctica hace al maestro.", "Practice makes perfect."], ["No hay mal que por bien no venga.", "Every cloud has a silver lining."], ["El que la sigue la consigue.", "If you keep trying, you will succeed."], ["Perro que ladra no muerde.", "A barking dog does not bite."], ["Del dicho al hecho hay mucho trecho.", "Saying and doing are very different things."]], [
    ["Sayings", "💬", "Spanish has many <b>refranes</b> (sayings). They do not always translate word by word."], ["Learn some", word("Poco a poco.", "Little by little.") + "<br>" + word("Manos a la obra.", "Let's get to work."), "<b>Tap to hear them.</b>"], ["Funny ones", "🍰", "<b>Ser pan comido</b> = to be a piece of cake. <b>Costar un ojo de la cara</b> = to cost a fortune."]], "Press 🔊 and think about the idea, not just the words. Many sayings are about life lessons.");
  const typ9 = TYE([].concat(SPACE.items, TECH.items, CONN.items.slice(0, 6)), "this level");
  const L9 = [
    XL("I have spoken", CJ(T7.PF, ["hablar", "bailar", "caminar", "terminar", "comer", "vivir", "beber", "aprender"])),
    XL("The done word", PP()),
    XL("The future tense", CJ(T7.FU, ["hablar", "comer", "vivir", "viajar", "bailar", "escribir", "correr", "estudiar"])),
    XL("Special future verbs", CJ(T7.FUi, ["tener", "hacer", "poder", "salir", "venir", "decir", "poner"])),
    XL("Polite requests", polite),
    XL("Which person?", WHO()),
    XL("Joining words", MIX([V(CONN), TR(connT, [["Join ideas", "🔗", "Joining words connect ideas: <b>pero</b> (but), <b>porque</b> (because), <b>entonces</b> (so)."], ["Time order", "⏱️", "<b>primero</b> (first), <b>después</b> (after), <b>antes</b> (before), <b>mientras</b> (while), <b>cuando</b> (when)."], ["Try", word("Primero leo, después juego.", "First I read, then I play."), "<b>Tap it to hear it.</b>"]])], [["Joining words", "🔗", "Joining words connect ideas: <b>pero</b> (but), <b>porque</b> (because), <b>entonces</b> (so)."], ["Learn them", CONN.items.map(x => word(x[0], x[1])).join("<br>"), "<b>Tap to hear them.</b>"], ["Longer sentences", "📝", "With these words you can say longer, more interesting sentences."]])),
    XL("How? Adverbs with -mente", ADV()),
    XL("This, that, these, those", dem),
    XL("Food, art and places", cult),
    XL("Space", V(SPACE)),
    XL("Technology", V(TECH, "Many tech words are close to English: batería ≈ battery, cámara ≈ camera. Keep your contraseña secret!")),
    XL("Writing a letter", letters),
    XL("Question words", qw),
    XL("Special yo forms", CJ(T7.YG, ["salir", "poner", "traer", "caer"])),
    XL("Venir, decir, dar, oír", CJ(T7.VD, ["venir", "decir", "dar", "oír"])),
    XL("Sayings", sayings),
    XL("Type it in Spanish", typ9),
    XL("Mixed practice", MIX([CJ(T7.PF, ["hablar", "comer", "vivir"]), PP(), CJ(T7.FU, ["hablar", "comer", "vivir", "viajar"]), WHO(), dem, qw, V(SPACE)], [["Perfect and future", "⏩", "Perfect: he hablado. Future: hablaré, comeré, viviré."], ["Ending detective", "🕵️", "The ending tells you who: -mos is nosotros, -n is ellos."], ["Pointing words", "👉", "este/esta (near), ese/esa (far), estos/estas, esos/esas."]])),
    XL("Level 9 Challenge", MIX([CJ(T7.PF, ["hablar", "comer", "vivir", "bailar"]), PP(), CJ(T7.FU, ["hablar", "comer", "vivir", "viajar"]), CJ(T7.FUi, ["tener", "hacer", "poder", "salir"]), WHO(), ADV(), dem, qw, cult, CJ(T7.YG, ["salir", "poner", "traer", "caer"]), CJ(T7.VD, ["venir", "decir", "dar", "oír"]), polite, sayings, V(SPACE), V(TECH)],
      [["Level 9 review", "🏅", "You learned the present perfect, the future, special verbs, adverbs and more."], ["Remember", "🧠", "he comido (I have eaten) · comeré (I will eat) · rápidamente (quickly)."], ["Go!", "🚀", "Use the hints if you need them. Good luck!"]]))
  ];

  Object.assign(SPANISH_LEVELS, { 7: L7, 8: L8, 9: L9 });
})();
