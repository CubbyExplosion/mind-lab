// ext/spanish-4-6.js  Mind Lab Spanish, levels 4-6 (60 lessons)
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
    if (n === 1000) return "mil";
    const h = Math.floor(n / 100), r = n % 100;
    return (h === 1 ? "ciento" : HUN[h]) + (r ? " " + numEs(r) : "");
  };

  // ---------- generic makers ----------
  const V = (bank, mode = "mix", tip) => {
    const f = () => {
      const items = bank.items, cur = pick(items), [es, en, e] = cur;
      const rest = items.filter(x => x[0] !== es), exs = pick(rest);
      let m = mode === "mix" ? pick(e ? ["es2en", "en2es", "pic"] : ["es2en", "en2es"]) : mode;
      if (m === "pic" && !e) m = "es2en";
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
      { h: "How to remember", v: "🧠", t: tip || "Say each one out loud. Cover the English and test yourself. Find ones that look like English words." }
    ];
    return f;
  };
  const TY = bank => {
    const items = bank.items.filter(x => x[2]);
    const f = () => {
      const [es, , e] = pick(items), exs = pick(items.filter(x => x[0] !== es));
      return { text: "Type this word in Spanish.", visual: e, textInput: true, answer: es,
        hints: ["Think of the English word for the picture. Then remember the Spanish word.", `The Spanish word starts with "${L1(es)}" and has ${es.replace(/ /g, "").length} letters.`, `Example: ${exs[2]} is "${exs[0]}" in Spanish. Now do yours. (You do not need to type accents!)`] };
    };
    f.teach = () => [
      { h: "Typing Spanish", v: "⌨️", t: "In this lesson you look at a picture and type the Spanish word." },
      { h: "Accents are optional", v: "á é í ó ú ñ", t: "You can leave the accents off: <b>jirafa</b> or <b>canción</b> and <b>cancion</b> both count." },
      { h: "Sound it out", v: "🔊", t: "Spanish is spelled the way it sounds. Say the word slowly and write the letters you hear." }
    ];
    return f;
  };
  const R = (rows, hints, slides, vis) => {
    const rs = rows.map(r => r.split("|"));
    const f = () => { const [text, ans, ...wr] = pick(rs); return { text, visual: vis, choices: shuf([ans, ...wr]), answer: ans, hints: hints.slice() }; };
    f.teach = () => slides.map(([h, v, t]) => ({ h, v, t }));
    return f;
  };
  const MIX = (...ms) => {
    const f = () => pick(ms)();
    f.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here is a quick reminder of each idea, then the quiz." }].concat(ms.map(m => m.teach()[0]));
    return f;
  };

  // ---------- verbs ----------
  const P6 = ["yo", "tú", "él", "ella", "nosotros", "ellos"];
  const PEN = { yo: "I", "tú": "you", "él": "he", ella: "she", nosotros: "we", ellos: "they" };
  const PRULE = {
    yo: "For <b>yo</b> (I), the verb usually ends in <b>-o</b>.",
    "tú": "For <b>tú</b> (you), the verb usually ends in <b>-s</b>.",
    "él": "For <b>él</b> (he), the verb usually ends in <b>-a</b> or <b>-e</b>.",
    ella: "For <b>ella</b> (she), the verb is the same as for él: it usually ends in <b>-a</b> or <b>-e</b>.",
    nosotros: "For <b>nosotros</b> (we), the verb usually ends in <b>-mos</b>.",
    ellos: "For <b>ellos</b> (they), the verb usually ends in <b>-n</b>."
  };
  const mkV = (inf, en, a, note, ex) => ({ inf, en, f: { yo: a[0], "tú": a[1], "él": a[2], ella: a[2], nosotros: a[3], ellos: a[4] }, note, ex });
  const VB = {
    hablar: mkV("hablar", "to speak", ["hablo", "hablas", "habla", "hablamos", "hablan"]),
    comer: mkV("comer", "to eat", ["como", "comes", "come", "comemos", "comen"]),
    ir: mkV("ir", "to go", ["voy", "vas", "va", "vamos", "van"], "But <b>ir</b> is very special. Learn its forms by heart.", ["Voy al parque.", "I go to the park."]),
    estar: mkV("estar", "to be (feelings, places)", ["estoy", "estás", "está", "estamos", "están"], "But <b>estar</b> is special, and most forms have an accent mark.", ["Estoy en casa.", "I am at home."]),
    querer: mkV("querer", "to want", ["quiero", "quieres", "quiere", "queremos", "quieren"], "This verb changes its middle: <b>e</b> becomes <b>ie</b>, except for nosotros.", ["Quiero un helado.", "I want an ice cream."]),
    poder: mkV("poder", "can, to be able to", ["puedo", "puedes", "puede", "podemos", "pueden"], "This verb changes its middle: <b>o</b> becomes <b>ue</b>, except for nosotros.", ["Puedo nadar.", "I can swim."]),
    hacer: mkV("hacer", "to do, to make", ["hago", "haces", "hace", "hacemos", "hacen"], "The yo form of this verb is special.", ["Hago mi tarea.", "I do my homework."]),
    ver: mkV("ver", "to see", ["veo", "ves", "ve", "vemos", "ven"], "", ["Veo un pájaro.", "I see a bird."]),
    leer: mkV("leer", "to read", ["leo", "lees", "lee", "leemos", "leen"], "", ["Leo un libro.", "I read a book."]),
    escribir: mkV("escribir", "to write", ["escribo", "escribes", "escribe", "escribimos", "escriben"], "", ["Escribo una carta.", "I write a letter."]),
    nadar: mkV("nadar", "to swim", ["nado", "nadas", "nada", "nadamos", "nadan"], "", ["Nado en el lago.", "I swim in the lake."]),
    bailar: mkV("bailar", "to dance", ["bailo", "bailas", "baila", "bailamos", "bailan"], "", ["Bailo con mi hermana.", "I dance with my sister."]),
    jugar: mkV("jugar", "to play", ["juego", "juegas", "juega", "jugamos", "juegan"], "This verb changes its middle: <b>u</b> becomes <b>ue</b>, except for nosotros.", ["Juego al fútbol.", "I play soccer."]),
    dormir: mkV("dormir", "to sleep", ["duermo", "duermes", "duerme", "dormimos", "duermen"], "This verb changes its middle: <b>o</b> becomes <b>ue</b>, except for nosotros.", ["Duermo en mi cama.", "I sleep in my bed."])
  };
  const CJ = keys => {
    const f = () => {
      const v = VB[pick(keys)], p = pick(P6), ans = v.f[p];
      const exV = v.inf === "hablar" ? VB.comer : VB.hablar;
      const typed = ans.length >= 5 && Math.random() < 0.5;
      const hints = ["Spanish verbs change to match WHO does the action. Who is it here?", PRULE[p] + (v.note ? " " + v.note : ""), `Example: with ${exV.inf} (${exV.en}): yo ${exV.f.yo}, tú ${exV.f["tú"]}, nosotros ${exV.f.nosotros}. Now find yours.`];
      if (typed) return { text: `Type the right form: <b>${p}</b> ___ (${v.inf}, ${v.en})`, textInput: true, answer: ans, hints };
      const wr = shuf([...new Set(P6.map(x => v.f[x]))].filter(x => x !== ans)).slice(0, 2);
      return { text: `${p} ___ (${v.inf}, ${v.en})`, choices: shuf([ans, ...wr]), answer: ans, hints };
    };
    f.teach = () => {
      const v = VB[keys[0]];
      return [
        { h: `The verb "${v.inf}" (${v.en})`, v: P6.map(p => word(v.f[p], PEN[p]).replace("<b>", `${p} <b>`)).join("<br>"), t: "<b>Tap a line to hear it.</b> The verb changes depending on <b>who</b> does it." },
        { h: "Endings", v: "yo -o · tú -s · él/ella -a/-e · nosotros -mos · ellos -n", t: "Most verbs follow these endings. " + (v.note || "Check each form carefully.") },
        { h: "In a sentence", v: v.ex ? word(v.ex[0], v.ex[1]) : "🧠", t: "Say all the forms out loud like a song: yo, tú, él, ella, nosotros, ellos." }
      ];
    };
    return f;
  };

  // ---------- numbers, time, months ----------
  const NW = vals => {
    const f = () => {
      const n = pick(vals), w = numEs(n);
      const exN = pick([42, 67, 35, 58, 73, 91, 24, 80].filter(x => x !== n));
      if (Math.random() < 0.5) return { text: `What number is "${w}"?`, say: w, lang: "es-ES", answer: n,
        hints: ["Split the word into parts: the tens first, then the ones. Numbers in the twenties are one word starting with <b>veinti-</b>.", "Learn the tens: veinte, treinta, cuarenta, cincuenta, sesenta, setenta, ochenta, noventa. They go up by ten each time. The word <b>y</b> means \"and\" and adds the ones.", `Example: "${numEs(exN)}" is ${exN}. Now do yours.`] };
      const pool = shuf(vals.filter(x => x !== n)).slice(0, 2);
      return { text: `How do you say ${n} in Spanish?`, choices: shuf([w, ...pool.map(numEs)]), answer: w,
        hints: ["Split the number into tens and ones. Say the tens word, then <b>y</b>, then the ones.", `The Spanish starts with the letter "${w[0]}".`, `Example: ${exN} in Spanish is "${numEs(exN)}". Now do yours.`] };
    };
    return f;
  };
  const clk = ["🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚", "🕛"];
  const MIN = { 5: "cinco", 10: "diez", 15: "cuarto", 30: "media" };
  const tp = (h, m) => (h === 1 ? "Es la una" : "Son las " + NUM[h]) + (m ? " y " + MIN[m] : "");
  const TIME = mins => {
    const f = () => {
      const h = ri(1, 12), m = pick(mins), ans = tp(h, m);
      const wr = shuf([tp(h % 12 + 1, m), tp((h + 5) % 12 + 1, m), tp(h, m === 0 ? 30 : 0), tp(h, m === 30 ? 15 : 30)].filter((x, i, a) => x !== ans && a.indexOf(x) === i)).slice(0, 2);
      const eh = (h + 3) % 12 + 1, em = mins.length > 1 ? mins.find(x => x !== m) : 0;
      return { text: `What time is it? <b>${h}:${m < 10 ? "0" + m : m}</b>`, visual: m === 0 ? clk[h - 1] : "🕰️", choices: shuf([ans, ...wr]), answer: ans,
        hints: ["Say the hour first. Then add the minutes.", "Use <b>Es la una</b> only for one o'clock. For every other hour say <b>Son las</b>. For :15 say <b>y cuarto</b>, and for :30 say <b>y media</b>.", `Example: ${eh}:${em < 10 ? "0" + em : em} is "${tp(eh, em)}". Now do yours.`] };
    };
    f.teach = () => [
      { h: "Telling time", v: "Es la una · Son las dos", t: "For one o'clock say <b>Es la una</b>. For all other hours say <b>Son las</b> and the number: <b>Son las tres</b>." },
      { h: "The hours", v: [1, 2, 3, 4, 5, 6].map(h => word(tp(h, 0), h + ":00")).join("<br>"), t: "<b>Tap to hear them.</b>" + (mins.length > 1 ? " Add <b>y cinco</b>, <b>y diez</b>, <b>y cuarto</b> (15) or <b>y media</b> (30)." : " The hours go up to doce (12).") },
      { h: "Tip", v: "⏰", t: mins.length > 1 ? "Say the hour, then <b>y</b>, then the minutes: Son las siete y media = 7:30." : "Look at a clock at home and say the time in Spanish!" }
    ];
    return f;
  };
  const MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const MEN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthNext = () => {
    const f = () => {
      const i = ri(0, 11), after = Math.random() < 0.5, ans = MONTHS[(i + (after ? 1 : 11)) % 12];
      return { text: `Which month comes ${after ? "after" : "before"} ${MONTHS[i]}?`, choices: shuf([ans, ...shuf(MONTHS.filter(x => x !== ans && x !== MONTHS[i])).slice(0, 2)]), answer: ans,
        hints: ["Think about the order of the months in a year, starting with enero.", `Find "${MONTHS[i]}" in the year. ${after ? "The next month" : "The month just earlier"} is your answer.`, "Example: the month after enero is febrero, and the month before marzo is febrero."] };
    };
    f.teach = () => [
      { h: "Months in order", v: MONTHS.map((m, i) => word(m, MEN[i])).join("<br>"), t: "<b>Tap a month to hear it.</b> After diciembre the year starts again with enero." },
      { h: "Small letters", v: "enero · febrero · marzo", t: "In Spanish, month names start with a <b>small letter</b>." },
      { h: "Tip", v: "📅", t: "Say the months in order out loud, then try to say them backwards!" }
    ];
    return f;
  };

  // ---------- word banks ----------
  const B = {
    fam: SP("Aunts, uncles and cousins", [["tío", "uncle"], ["tía", "aunt"], ["primo", "cousin (boy)"], ["prima", "cousin (girl)"], ["hijo", "son"], ["hija", "daughter"], ["abuelos", "grandparents", "👴👵"], ["padres", "parents"], ["familia", "family", "👨‍👩‍👧‍👦"]]),
    rooms: SP("Rooms in a house", [["sala", "living room"], ["comedor", "dining room"], ["dormitorio", "bedroom"], ["jardín", "garden", "🌷"], ["garaje", "garage"], ["habitación", "room"], ["escaleras", "stairs"], ["techo", "roof"]]),
    things: SP("Things at home", [["lámpara", "lamp", "💡"], ["televisión", "television", "📺"], ["teléfono", "phone", "📞"], ["reloj", "clock", "⏰"], ["espejo", "mirror", "🪞"], ["llave", "key", "🔑"], ["alfombra", "rug"], ["cortina", "curtain"]]),
    adj: SP("Describing people", [["alto", "tall"], ["bajo", "short"], ["simpático", "friendly"], ["divertido", "fun"], ["fuerte", "strong"], ["rápido", "fast"], ["lento", "slow"], ["joven", "young"], ["viejo", "old"], ["inteligente", "smart"]]),
    meals: SP("Meals and treats", [["desayuno", "breakfast", "🥞"], ["almuerzo", "lunch", "🥪"], ["cena", "dinner", "🍝"], ["sopa", "soup", "🍲"], ["ensalada", "salad", "🥗"], ["galleta", "cookie", "🍪"], ["jugo", "juice", "🧃"], ["helado", "ice cream", "🍦"]]),
    wild: SP("Wild animals", [["león", "lion", "🦁"], ["tigre", "tiger", "🐯"], ["elefante", "elephant", "🐘"], ["jirafa", "giraffe", "🦒"], ["oso", "bear", "🐻"], ["lobo", "wolf", "🐺"], ["zorro", "fox", "🦊"], ["serpiente", "snake", "🐍"], ["rana", "frog", "🐸"], ["mariposa", "butterfly", "🦋"], ["abeja", "bee", "🐝"]]),
    fun: SP("Fun action words", [["caminar", "to walk", "🚶"], ["nadar", "to swim", "🏊"], ["bailar", "to dance", "💃"], ["dibujar", "to draw", "🎨"], ["ayudar", "to help", "🤝"], ["mirar", "to look at", "👀"], ["escuchar", "to listen", "👂"], ["cocinar", "to cook", "🍳"]]),
    meet: SP("Meeting people", [["¿De dónde eres?", "Where are you from?"], ["Soy de México.", "I am from Mexico."], ["Vivo en una ciudad.", "I live in a city."], ["Tengo siete años.", "I am seven years old."], ["¿Cuál es tu color favorito?", "What is your favorite color?"], ["Mi cumpleaños es en mayo.", "My birthday is in May."], ["Encantado de conocerte.", "Pleased to meet you."], ["¿Tienes hermanos?", "Do you have brothers or sisters?"]]),
    timew: SP("Time words", [["hoy", "today"], ["mañana", "tomorrow"], ["ayer", "yesterday"], ["ahora", "now"], ["siempre", "always"], ["nunca", "never"], ["a veces", "sometimes"], ["pronto", "soon"], ["temprano", "early"], ["tarde", "late"]]),
    wthr: SP("Weather talk", [["¿Qué tiempo hace?", "What is the weather like?"], ["Hace calor.", "It is hot."], ["Hace frío.", "It is cold."], ["Hace sol.", "It is sunny."], ["Hace viento.", "It is windy."], ["Llueve.", "It rains."], ["Nieva.", "It snows."], ["Está nublado.", "It is cloudy."]]),
    shop: SP("Shopping", [["comprar", "to buy", "🛍️"], ["vender", "to sell"], ["dinero", "money", "💵"], ["precio", "price"], ["caro", "expensive"], ["barato", "cheap"], ["bolsa", "bag", "👜"], ["tienda de ropa", "clothes store"]]),
    town: SP("Around town", [["banco", "bank", "🏦"], ["correo", "post office"], ["supermercado", "supermarket"], ["panadería", "bakery", "🥖"], ["farmacia", "pharmacy"], ["museo", "museum"], ["cine", "movie theater", "🎬"], ["zoológico", "zoo", "🦓"]]),
    dir: SP("Directions", [["izquierda", "left"], ["derecha", "right"], ["todo recto", "straight ahead"], ["la calle", "the street"], ["la esquina", "the corner"], ["Dobla a la derecha.", "Turn right."], ["Dobla a la izquierda.", "Turn left."], ["¿Dónde está?", "Where is it?"]]),
    prep: SP("Where is it?", [["en", "in, on"], ["sobre", "on top of"], ["debajo de", "under"], ["detrás de", "behind"], ["delante de", "in front of"], ["al lado de", "next to"], ["entre", "between"], ["cerca de", "near"], ["lejos de", "far from"]]),
    subj: SP("School subjects", [["matemáticas", "math"], ["ciencias", "science"], ["historia", "history"], ["arte", "art", "🎨"], ["música", "music", "🎵"], ["inglés", "English"], ["educación física", "P.E."], ["lectura", "reading", "📖"], ["geografía", "geography", "🗺️"], ["tarea", "homework"]]),
    sport: SP("Sports", [["fútbol", "soccer", "⚽"], ["béisbol", "baseball", "⚾"], ["baloncesto", "basketball", "🏀"], ["tenis", "tennis", "🎾"], ["natación", "swimming", "🏊"], ["voleibol", "volleyball", "🏐"], ["ciclismo", "cycling", "🚴"], ["equipo", "team"]]),
    body2: SP("More body parts", [["brazo", "arm", "💪"], ["pierna", "leg", "🦵"], ["dedo", "finger"], ["cuello", "neck"], ["espalda", "back"], ["rodilla", "knee"], ["estómago", "stomach"], ["diente", "tooth", "🦷"], ["pelo", "hair"], ["cara", "face"]]),
    veg: SP("Vegetables", [["zanahoria", "carrot", "🥕"], ["tomate", "tomato", "🍅"], ["papa", "potato", "🥔"], ["lechuga", "lettuce", "🥬"], ["cebolla", "onion", "🧅"], ["maíz", "corn", "🌽"], ["brócoli", "broccoli", "🥦"], ["pepino", "cucumber", "🥒"], ["ajo", "garlic", "🧄"], ["frijoles", "beans"]]),
    rest: SP("At a restaurant", [["La cuenta, por favor.", "The check, please."], ["El menú, por favor.", "The menu, please."], ["Tengo sed.", "I am thirsty."], ["Tengo mucha hambre.", "I am very hungry."], ["Quisiera una sopa.", "I would like a soup."], ["Está delicioso.", "It is delicious."], ["¿Qué hay de comer?", "What is there to eat?"], ["Más agua, por favor.", "More water, please."]]),
    ord: SP("First, second, third", [["primero", "first"], ["segundo", "second"], ["tercero", "third"], ["cuarto", "fourth"], ["quinto", "fifth"], ["sexto", "sixth"], ["séptimo", "seventh"], ["octavo", "eighth"], ["noveno", "ninth"], ["décimo", "tenth"]]),
    jobs2: SP("More jobs", [["enfermera", "nurse"], ["policía", "police officer", "👮"], ["mecánico", "mechanic", "🧑‍🔧"], ["panadero", "baker"], ["científico", "scientist", "🧑‍🔬"], ["músico", "musician"], ["escritor", "writer"], ["dentista", "dentist"], ["veterinario", "vet"], ["ingeniero", "engineer"]]),
    land: SP("Nature and places", [["bosque", "forest", "🌲"], ["desierto", "desert", "🏜️"], ["isla", "island", "🏝️"], ["lago", "lake"], ["océano", "ocean", "🌊"], ["volcán", "volcano", "🌋"], ["cielo", "sky"], ["planeta", "planet", "🪐"], ["selva", "jungle"]]),
    fiesta: SP("Holidays and parties", [["Navidad", "Christmas", "🎄"], ["cumpleaños", "birthday", "🎂"], ["fiesta", "party", "🎉"], ["regalo", "gift", "🎁"], ["pastel", "cake", "🍰"], ["globo", "balloon", "🎈"], ["Año Nuevo", "New Year", "🎆"], ["canción", "song", "🎶"]])
  };
  const TY4 = SP("", [].concat(B.wild.items, B.meals.items, B.things.items));
  const TY6 = SP("", [].concat(B.veg.items, B.sport.items, B.fiesta.items, B.land.items));

  // ---------- rows lessons ----------
  const SERESTAR = R([
    "Mi mamá ___ doctora.|es|está", "Yo ___ cansado.|estoy|soy", "El gato ___ en la casa.|está|es", "Nosotros ___ amigos.|somos|estamos",
    "Tú ___ alto.|eres|estás", "Ellos ___ en el parque.|están|son", "Ella ___ de México.|es|está", "El libro ___ en la mesa.|está|es",
    "Yo ___ feliz hoy.|estoy|soy", "Mi abuelo ___ muy simpático.|es|está", "Los niños ___ en la escuela.|están|son"
  ], ["Ask: is it WHO or WHAT someone is like (ser), or HOW or WHERE they are right now (estar)?", "Use <b>ser</b> for who you are, jobs, where you are from and what you are like. Use <b>estar</b> for feelings and where things are.", "Example: \"Mi hermano ___ en el jardín\" tells a place, so use estar. \"Mi hermano ___ alto\" tells what he is like, so use ser. Now do yours."],
    [["Two verbs for \"to be\"", "ser · estar", "Spanish has <b>two</b> verbs that mean \"to be\": <b>ser</b> and <b>estar</b>."], ["Use ser for...", "👩‍🏫 🌎 🎨", "<b>Ser</b> tells who or what someone <b>is</b>: jobs, where you are from, and what you are like. <i>Soy alto. Ella es de Perú.</i>"], ["Use estar for...", "😴 📍", "<b>Estar</b> tells how you <b>feel</b> and where things <b>are</b>. <i>Estoy cansado. El gato está en la casa.</i>"]]);
  const GOING = R([
    "How do you say: <b>I go to the park.</b>|Voy al parque.|Vas al parque.|Van al parque.", "How do you say: <b>You go to school.</b>|Vas a la escuela.|Voy a la escuela.|Vamos a la escuela.",
    "How do you say: <b>She goes to the store.</b>|Ella va a la tienda.|Ella vas a la tienda.|Ella van a la tienda.", "How do you say: <b>We go to the beach.</b>|Vamos a la playa.|Voy a la playa.|Van a la playa.",
    "How do you say: <b>They go to the library.</b>|Ellos van a la biblioteca.|Ellos va a la biblioteca.|Ellos vas a la biblioteca.", "How do you say: <b>He goes to the farm.</b>|Él va a la granja.|Él vas a la granja.|Él van a la granja.",
    "How do you say: <b>I go to the city.</b>|Voy a la ciudad.|Vas a la ciudad.|Vamos a la ciudad.", "How do you say: <b>We go to the park.</b>|Vamos al parque.|Voy al parque.|Van al parque."
  ], ["Find who is going. Then pick the form of <b>ir</b> for that person.", "The words after the verb: <b>a la</b> goes with feminine places and <b>al</b> (a + el) goes with masculine places.", "Example: \"You go to the zoo\" is \"Vas al zoológico\". Now do yours."],
    [["Going places", "🚶➡️🏫", "Use <b>ir a</b> to say where you go: <i>Voy a la escuela.</i> (I go to school.)"], ["A + el = al", "a + el = al", "<b>A la</b> goes with la words: <i>a la playa</i>. For el words, a + el joins into <b>al</b>: <i>al parque</i>."], ["Tip", "🧠", "First pick the right form of ir (voy, vas, va, vamos, van), then add where you are going."]]);
  const GUSTA = R([
    "Me ___ los perros.|gustan|gusta", "Me ___ el helado.|gusta|gustan", "Me ___ las fresas.|gustan|gusta", "Me ___ la playa.|gusta|gustan",
    "Me ___ los libros.|gustan|gusta", "Me ___ jugar.|gusta|gustan", "Me ___ las flores.|gustan|gusta", "Me ___ el parque.|gusta|gustan"
  ], ["Is the thing you like ONE thing, or MORE than one?", "<b>Gusta</b> goes with one thing (or with a verb like jugar). <b>Gustan</b> goes with more than one thing.", "Example: \"Me ___ el gato\" is one cat, so <b>gusta</b>. \"Me ___ los gatos\" is many cats, so <b>gustan</b>. Now do yours."],
    [["Me gusta", "😍", "<b>Me gusta</b> means \"I like it\". Use it for ONE thing: <i>Me gusta el pan.</i>"], ["Me gustan", "😍😍", "Use <b>me gustan</b> for MORE than one thing: <i>Me gustan los perros.</i>"], ["Tip", "💡", "Look at the thing after the blank. Is it los or las (many)? Then use gustan."]]);
  const MEGUSTA6 = R([
    "How do you say: <b>I like to swim.</b>|Me gusta nadar.|Me gustan nadar.|Te gusta nadar.", "How do you say: <b>Do you like to dance?</b>|¿Te gusta bailar?|¿Me gusta bailar?|¿Te gustan bailar?",
    "How do you say: <b>I like to draw.</b>|Me gusta dibujar.|Me gustan dibujar.|Te gusta dibujar.", "How do you say: <b>I like to read.</b>|Me gusta leer.|Me gustan leer.|Te gusta leer.",
    "How do you say: <b>I like to cook.</b>|Me gusta cocinar.|Me gustan cocinar.|Te gusta cocinar.", "How do you say: <b>Do you like to play?</b>|¿Te gusta jugar?|¿Me gusta jugar?|¿Te gustan jugar?",
    "How do you say: <b>I like to sing.</b>|Me gusta cantar.|Me gustan cantar.|Te gusta cantar.", "How do you say: <b>I like to run.</b>|Me gusta correr.|Me gustan correr.|Te gusta correr."
  ], ["Who likes it: I (me) or you (te)? And is it ONE action?", "<b>Me gusta</b> means I like. <b>Te gusta</b> means you like. After <b>gusta</b> put the action word (the infinitive).", "Example: \"I like to eat\" is \"Me gusta comer\". Now do yours."],
    [["Like + action", "💃🏊📖", "Say what you like to do with <b>me gusta</b> and an action word: <i>Me gusta bailar.</i>"], ["Me or te?", "me · te", "<b>Me gusta</b> = I like. <b>¿Te gusta?</b> = Do you like? Always <b>gusta</b> with an action."], ["Tip", "💡", "An action word is one thing, so we never say gustan before it."]]);
  const AGO = R([
    "How do you say: <b>I am going to swim.</b>|Voy a nadar.|Vas a nadar.|Va a nadar.", "How do you say: <b>We are going to eat.</b>|Vamos a comer.|Voy a comer.|Van a comer.",
    "How do you say: <b>She is going to read.</b>|Ella va a leer.|Ella voy a leer.|Ella vamos a leer.", "How do you say: <b>They are going to play.</b>|Ellos van a jugar.|Ellos va a jugar.|Ellos vamos a jugar.",
    "How do you say: <b>You are going to dance.</b>|Vas a bailar.|Voy a bailar.|Vamos a bailar.", "How do you say: <b>I am going to write.</b>|Voy a escribir.|Vas a escribir.|Van a escribir.",
    "How do you say: <b>We are going to help.</b>|Vamos a ayudar.|Voy a ayudar.|Van a ayudar.", "How do you say: <b>He is going to cook.</b>|Él va a cocinar.|Él vas a cocinar.|Él van a cocinar."
  ], ["Find who is doing it. Then pick the right form of <b>ir</b>.", "The pattern is: form of <b>ir</b> + <b>a</b> + action word. The action word does not change.", "Example: \"I am going to sing\" is \"Voy a cantar\". Now do yours."],
    [["The near future", "➡️", "To say what you are going to do, use <b>ir a</b> and an action word."], ["The pattern", "voy a · vas a · va a", "<i>Voy a jugar.</i> = I am going to play. <i>Vamos a comer.</i> = We are going to eat."], ["Tip", "💡", "Change <b>ir</b> to match who is going. The action word stays the same."]]);
  const MYYOUR = R([
    "<b>my</b> dog = ___ perro|mi|tu|su", "<b>your</b> book = ___ libro|tu|mi|su", "<b>our</b> house = ___ casa|nuestra|nuestro|mi", "<b>his</b> cat = ___ gato|su|mi|tu",
    "<b>my</b> friends = ___ amigos|mis|mi|tu", "<b>your</b> shoes = ___ zapatos|tus|tu|mis", "<b>our</b> teacher (boy) = ___ maestro|nuestro|nuestra|mi", "<b>their</b> dog = ___ perro|su|mi|tu", "<b>her</b> mom = ___ mamá|su|mi|tus"
  ], ["Whose is it: mine, yours, his/hers/theirs or ours?", "<b>mi</b> = my, <b>tu</b> = your, <b>su</b> = his, her or their, <b>nuestro/nuestra</b> = our. For more than one thing, add <b>-s</b>.", "Example: \"my cat\" is \"mi gato\", and \"my cats\" is \"mis gatos\". Now do yours."],
    [["My, your, his", "mi · tu · su", "<b>mi</b> = my. <b>tu</b> = your. <b>su</b> = his, her or their."], ["Our", "nuestro · nuestra", "<b>Nuestro</b> goes with el words and <b>nuestra</b> goes with la words: <i>nuestra casa</i>."], ["More than one", "mis · tus · sus", "If there is more than one thing, add <b>s</b>: <i>mis amigos</i> (my friends)."]]);
  const UNUNA = R([
    "a cat = ___ gato|un|una|unas", "a house = ___ casa|una|un|unos", "some books = ___ libros|unos|unas|un", "some flowers = ___ flores|unas|unos|una",
    "a book = ___ libro|un|una|unas", "a chair = ___ silla|una|un|unos", "some dogs = ___ perros|unos|unas|una", "some apples = ___ manzanas|unas|unos|un"
  ], ["Is it one thing or more than one? Is it an el word or a la word?", "<b>un</b> = a (el word), <b>una</b> = a (la word), <b>unos</b> = some (el words), <b>unas</b> = some (la words).", "Example: \"a bird\" is \"un pájaro\", and \"some birds\" is \"unos pájaros\". Now do yours."],
    [["A and some", "un · una", "<b>un</b> and <b>una</b> mean \"a\". Use <b>un</b> with el words and <b>una</b> with la words."], ["Some", "unos · unas", "For \"some\", use <b>unos</b> (el words) and <b>unas</b> (la words)."], ["Tip", "💡", "Match the ending: -o words often use un, -a words often use una."]]);
  const SENT5 = R([
    "How do you say: <b>I want a cookie.</b>|Quiero una galleta.|Quieres una galleta.|Quiere una galleta.", "How do you say: <b>She can swim.</b>|Ella puede nadar.|Ella puedo nadar.|Ella pueden nadar.",
    "How do you say: <b>We do homework.</b>|Hacemos la tarea.|Hago la tarea.|Hacen la tarea.", "How do you say: <b>They can read.</b>|Ellos pueden leer.|Ellos puede leer.|Ellos puedo leer.",
    "How do you say: <b>You see the bird.</b>|Ves el pájaro.|Veo el pájaro.|Vemos el pájaro.", "How do you say: <b>I write a letter.</b>|Escribo una carta.|Escribes una carta.|Escriben una carta.",
    "How do you say: <b>We want water.</b>|Queremos agua.|Quiero agua.|Quieren agua.", "How do you say: <b>Today is hot.</b>|Hoy hace calor.|Hoy hace frío.|Hoy llueve."
  ], ["Find who does the action. Then choose the verb form for that person.", "Match the ending to the person: yo -o, tú -s, él/ella -e or -a, nosotros -mos, ellos -n. Watch out for special verbs.", "Example: \"He eats bread\" is \"Él come pan\". Now do yours."],
    [["Build a sentence", "🧱", "A Spanish sentence usually goes: <b>who</b> + <b>verb</b> + <b>the rest</b>."], ["Match the verb", "yo quiero · nosotros queremos", "The verb changes for each person: <i>Quiero</i> (I want), <i>Queremos</i> (we want)."], ["Tip", "💡", "In Spanish you can often leave out yo, tú and nosotros because the verb already tells you who."]]);
  const SENT6 = R([
    "What does this mean?<br><b>Me gusta la música.</b>|I like music.|I play music.|I hear music.", "What does this mean?<br><b>Mi hermano es alto.</b>|My brother is tall.|My brother is old.|My brother is happy.",
    "What does this mean?<br><b>Vamos a la playa.</b>|We go to the beach.|We eat at the beach.|I go to the beach.", "What does this mean?<br><b>Tengo dos tíos.</b>|I have two uncles.|I have two cousins.|I have two dogs.",
    "What does this mean?<br><b>Ellos juegan al fútbol.</b>|They play soccer.|They watch soccer.|He plays soccer.", "What does this mean?<br><b>Mañana voy a nadar.</b>|Tomorrow I am going to swim.|Yesterday I swam.|Today I swim.",
    "What does this mean?<br><b>Me duele la cabeza.</b>|My head hurts.|My head is big.|I like my head.", "What does this mean?<br><b>La sopa está caliente.</b>|The soup is hot.|The soup is cold.|The soup is bad."
  ], ["Find the verb first. Who does it? Then read the rest.", "Look for words you know: nouns, numbers, and time words like <b>hoy</b> and <b>mañana</b>.", "Example: \"Ella lee un libro\" means \"She reads a book\". Now do yours."],
    [["Read the sentence", "👀", "Find the <b>verb</b>, then find <b>who</b> does it, then read the rest."], ["Clues", "mañana · hoy · ayer", "Time words tell you when. Words like <b>no</b> and <b>muy</b> (very) change the meaning."], ["Tip", "💡", "Say the sentence out loud and look for words that look like English."]]);
  const THE6 = R([
    "the dogs = ___ perros|los|las|el", "the flowers = ___ flores|las|los|la", "the book = ___ libro|el|la|los", "the house = ___ casa|la|el|las",
    "the books = ___ libros|los|las|el", "the chairs = ___ sillas|las|los|la", "the trees = ___ árboles|los|las|el", "the school = ___ escuela|la|el|las"
  ], ["Is it one thing or more than one? Is it an el word or a la word?", "<b>el</b> and <b>la</b> are for one thing. <b>los</b> and <b>las</b> are for many things (los for el words, las for la words).", "Example: \"the cat\" is \"el gato\" and \"the cats\" is \"los gatos\". Now do yours."],
    [["Four ways to say the", "el · la · los · las", "<b>el</b> and <b>la</b> go with ONE thing. <b>los</b> and <b>las</b> go with MORE than one."], ["Match the word", "los gatos · las casas", "<b>Los</b> goes with el words. <b>Las</b> goes with la words."], ["Tip", "💡", "Look at the end of the noun: -s means more than one."]]);
  const COLORS6 = R([
    "la camisa ___ (white)|blanca|blanco|blancos", "el sombrero ___ (red)|rojo|roja|rojos", "los zapatos ___ (black)|negros|negro|negras", "las flores ___ (yellow)|amarillas|amarillos|amarilla",
    "la casa ___ (green)|verde|verdes", "los carros ___ (blue)|azules|azul", "las mochilas ___ (purple)|moradas|morados|morada", "los perros ___ (white)|blancos|blanco|blancas"
  ], ["Look at the noun. Is it el or la? Is it one or many?", "A color matches its noun: <b>-o</b> for el words, <b>-a</b> for la words, and add <b>-s</b> for many. Colors like <b>verde</b> and <b>azul</b> only add <b>-s</b> (or <b>-es</b>) for many.", "Example: \"la casa roja\" and \"las casas rojas\". Now do yours."],
    [["Colors match", "la casa roja · el carro rojo", "A color word comes <b>after</b> the noun and matches it: <i>el gato negro, la casa negra</i>."], ["More than one", "los gatos negros", "If the noun is plural, the color is plural too: <i>las casas blancas</i>."], ["Special colors", "verde · azul · gris", "<b>Verde, azul</b> and <b>gris</b> are the same for el and la words. Add <b>s</b> or <b>es</b> for many: <i>verdes, azules</i>."]]);
  const DUELE = R([
    "Me ___ la cabeza.|duele|duelen", "Me ___ los pies.|duelen|duele", "Me ___ el brazo.|duele|duelen", "Me ___ las manos.|duelen|duele",
    "Me ___ el estómago.|duele|duelen", "Me ___ los dientes.|duelen|duele", "Me ___ la espalda.|duele|duelen", "Me ___ las piernas.|duelen|duele"
  ], ["How many body parts hurt: one, or more than one?", "<b>Duele</b> goes with ONE body part. <b>Duelen</b> goes with MORE than one.", "Example: \"Me ___ la nariz\" uses <b>duele</b>. \"Me ___ los ojos\" uses <b>duelen</b>. Now do yours."],
    [["Ouch!", "🤕", "To say something hurts, use <b>me duele</b> and the body part: <i>Me duele la cabeza.</i>"], ["More than one", "me duelen", "For more than one part, use <b>me duelen</b>: <i>Me duelen los pies.</i>"], ["Tip", "💡", "It works like <b>me gusta / me gustan</b>: one thing or many things."]]);
  const CAP = R([
    "What is the capital of Spain?|Madrid|Lima|Santiago", "What is the capital of Mexico?|Ciudad de México|Madrid|Bogotá", "What is the capital of Peru?|Lima|Quito|Madrid",
    "What is the capital of Colombia?|Bogotá|Lima|La Habana", "What is the capital of Argentina?|Buenos Aires|Santiago|Madrid", "What is the capital of Chile?|Santiago|Buenos Aires|Lima",
    "What is the capital of Cuba?|La Habana|San José|Bogotá", "What is the capital of Costa Rica?|San José|Quito|Santiago", "What is the capital of Ecuador?|Quito|Lima|Bogotá",
    "Madrid is the capital of which country?|España|Perú|Chile", "Lima is the capital of which country?|Perú|España|Cuba", "Bogotá is the capital of which country?|Colombia|Argentina|México"
  ], ["Spanish is spoken in Spain, in Latin America and on islands like Cuba. Each country has one capital city.", "Think of the map: Spain is in Europe. Mexico is in North America. Cuba is an island. Peru, Colombia, Chile, Argentina and Ecuador are in South America.", "Example: the capital of Costa Rica is San José, and the capital of Spain is Madrid. Think about yours."],
    [["Capital cities", "🏙️", "Every country has a <b>capital city</b>. Spanish-speaking countries have capitals too."], ["Some capitals", "Madrid · Lima · Bogotá · Santiago", "<b>Madrid</b> is in España. <b>Lima</b> is in Perú. <b>Bogotá</b> is in Colombia. <b>Santiago</b> is in Chile."], ["More capitals", "Buenos Aires · La Habana · San José · Quito", "<b>Buenos Aires</b>: Argentina. <b>La Habana</b>: Cuba. <b>San José</b>: Costa Rica. <b>Quito</b>: Ecuador. <b>Ciudad de México</b>: México."]]);

  // ---------- slides for numbers ----------
  const NSL = {
    twenties: [{ h: "Twenty-something", v: [21, 22, 23, 24, 25, 26].map(n => word(numEs(n), n)).join("<br>"), t: "From 21 to 29 the number is <b>one word</b> starting with <b>veinti-</b>. <b>Tap to hear.</b>" }, { h: "Accent marks", v: "veintidós · veintitrés · veintiséis", t: "Three of them have an accent mark: <b>22, 23 and 26</b>." }, { h: "Thirty", v: word("treinta", 30), t: "30 is <b>treinta</b>. Count up: veintiocho, veintinueve, treinta." }],
    tens: [{ h: "The tens", v: [10, 20, 30, 40, 50].map(n => word(numEs(n), n)).join("<br>"), t: "<b>Tap to hear.</b> Count by tens: diez, veinte, treinta…" }, { h: "More tens", v: [60, 70, 80, 90, 100].map(n => word(numEs(n), n)).join("<br>"), t: "100 is <b>cien</b>." }, { h: "Tip", v: "🖐️🖐️", t: "Count by tens on your fingers: ten, twenty, thirty… in Spanish!" }],
    big: [{ h: "Tens and ones", v: "cuarenta y dos = 42", t: "From 31 on, say the tens, then <b>y</b> (and), then the ones: <b>cuarenta y dos</b>." }, { h: "Examples", v: [31, 45, 58, 67, 79, 93].map(n => word(numEs(n), n)).join("<br>"), t: "<b>Tap to hear them.</b>" }, { h: "Tip", v: "💡", t: "Learn the tens words well: treinta, cuarenta, cincuenta, sesenta, setenta, ochenta, noventa." }],
    hundreds: [{ h: "Hundreds", v: [100, 200, 300, 400, 500].map(n => word(numEs(n), n)).join("<br>"), t: "<b>Tap to hear.</b> 100 is <b>cien</b>. From 200 the word ends in <b>-cientos</b>." }, { h: "More hundreds", v: [600, 700, 800, 900, 1000].map(n => word(numEs(n), n)).join("<br>"), t: "1000 is <b>mil</b>. Watch out: 500 is <b>quinientos</b>, 700 is <b>setecientos</b>, 900 is <b>novecientos</b>." }, { h: "Tip", v: "💡", t: "Say the hundreds out loud like counting by hundreds: cien, doscientos, trescientos…" }],
    hund2: [{ h: "Hundreds and more", v: "ciento cincuenta = 150", t: "From 101 to 199, 100 changes to <b>ciento</b>: <i>ciento veinte</i> is 120." }, { h: "Examples", v: [120, 250, 340, 475, 680, 910].map(n => word(numEs(n), n)).join("<br>"), t: "<b>Tap to hear.</b> Say the hundreds word, then the rest." }, { h: "Tip", v: "💡", t: "Read it from left to right: hundreds, then tens, then ones." }]
  };
  const NH = vals => {
    const f = () => {
      const n = pick(vals), w = numEs(n);
      const exN = pick([300, 500, 700, 900, 200, 600].filter(x => x !== n));
      if (Math.random() < 0.5) return { text: `What number is "${w}"?`, say: w, lang: "es-ES", answer: n,
        hints: ["Find the hundreds word first, then add the tens and ones if there are any.", "Hundreds end in <b>-cientos</b> (from two hundred up). The word <b>ciento</b> is for numbers a little over one hundred, and <b>mil</b> is a thousand.", `Example: "${numEs(exN)}" is ${exN}. Now do yours.`] };
      const pool = shuf(vals.filter(x => x !== n)).slice(0, 2);
      return { text: `How do you say ${n} in Spanish?`, choices: shuf([w, ...pool.map(numEs)]), answer: w,
        hints: ["Split the number into hundreds, tens and ones. Say the hundreds first.", `The Spanish starts with the letter "${w[0]}".`, `Example: ${exN} in Spanish is "${numEs(exN)}". Now do yours.`] };
    };
    return f;
  };
  const withT = (f, slides) => { f.teach = () => slides; return f; };

  // ---------- lessons ----------
  const XL = (title, make) => ({ title, make });
  const hundVals = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  const hund2Vals = []; for (let h = 1; h <= 9; h++) for (let t = 1; t <= 9; t++) hund2Vals.push(h * 100 + t * 10);
  const range = (a, b) => { const o = []; for (let i = a; i <= b; i++) o.push(i); return o; };

  const L4 = [
    XL("Aunts, uncles, cousins", V(B.fam)), XL("Rooms in a house", V(B.rooms)), XL("Things at home", V(B.things)),
    XL("Numbers 21 to 30", withT(NW(range(21, 30)), NSL.twenties)), XL("Counting by tens", withT(NW([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]), NSL.tens)),
    XL("Months of the year", V(SP("Months of the year", MONTHS.map((m, i) => [m, MEN[i]])), "mix", "Months are not capitalized in Spanish. Say them in order as a song.")), XL("Months in order", monthNext()),
    XL("What time is it?", TIME([0])), XL("The verb ir", CJ(["ir"])), XL("Going places", GOING),
    XL("The verb estar", CJ(["estar"])), XL("Ser or estar?", SERESTAR), XL("Describing people", V(B.adj)),
    XL("Meals and treats", V(B.meals)), XL("Me gusta or me gustan", GUSTA), XL("Wild animals", V(B.wild)),
    XL("Fun action words", V(B.fun)), XL("Type it in Spanish", TY(TY4)),
    XL("Mixed practice", MIX(V(B.fam), V(B.rooms), CJ(["ir"]), TIME([0]))),
    XL("Level 4 Challenge", MIX(V(B.wild), V(B.meals), V(B.things), CJ(["estar"]), SERESTAR, GUSTA, monthNext(), withT(NW(range(21, 30)), NSL.twenties), TY(TY4)))
  ];
  const L5 = [
    XL("Meeting people", V(B.meet)), XL("Numbers 31 to 99", withT(NW(range(31, 99)), NSL.big)), XL("The verb querer", CJ(["querer"])),
    XL("The verb poder", CJ(["poder"])), XL("The verb hacer", CJ(["hacer"])), XL("The verb ver", CJ(["ver"])),
    XL("Regular verbs", CJ(["leer", "escribir", "nadar", "bailar"])), XL("Jugar and dormir", CJ(["jugar", "dormir"])),
    XL("Time words", V(B.timew)), XL("Half past and quarter past", TIME([5, 10, 15, 30])), XL("Weather talk", V(B.wthr)),
    XL("Shopping", V(B.shop)), XL("Around town", V(B.town)), XL("Directions", V(B.dir)),
    XL("Where is it?", V(B.prep)), XL("My, your, our", MYYOUR), XL("Un, una, unos, unas", UNUNA),
    XL("Sentences in Spanish", SENT5),
    XL("Mixed practice", MIX(CJ(["querer"]), CJ(["poder"]), V(B.timew), TIME([5, 10, 15, 30]))),
    XL("Level 5 Challenge", MIX(CJ(["hacer"]), CJ(["ver"]), CJ(["jugar", "dormir"]), V(B.town), V(B.wthr), MYYOUR, UNUNA, SENT5, withT(NW(range(31, 99)), NSL.big)))
  ];
  const L6 = [
    XL("School subjects", V(B.subj)), XL("Sports", V(B.sport)), XL("More body parts", V(B.body2)),
    XL("Ouch! Me duele", DUELE), XL("Vegetables", V(B.veg)), XL("At a restaurant", V(B.rest)),
    XL("Going to do something", AGO), XL("I like to...", MEGUSTA6), XL("Hundreds", withT(NH(hundVals), NSL.hundreds)),
    XL("Hundreds and tens", withT(NH(hund2Vals), NSL.hund2)), XL("First, second, third", V(B.ord)), XL("El, la, los, las", THE6),
    XL("Colors that match", COLORS6), XL("More jobs", V(B.jobs2)), XL("Nature and places", V(B.land)),
    XL("Holidays and parties", V(B.fiesta)), XL("Capital cities", CAP), XL("Type it in Spanish", TY(TY6)),
    XL("Mixed practice", MIX(V(B.subj), V(B.veg), DUELE, THE6)),
    XL("Level 6 Challenge", MIX(V(B.sport), V(B.body2), AGO, MEGUSTA6, withT(NH(hundVals), NSL.hundreds), COLORS6, CAP, SENT6, TY(TY6)))
  ];
  Object.assign(SPANISH_LEVELS, { 4: L4, 5: L5, 6: L6 });
})();
