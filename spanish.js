// Mind Lab Spanish. Levels 1-3 have 20 lessons each (60 lessons).
// Every lesson teaches first (3 slides), then quizzes. Every question has 3 hints
// (nudge, clue, worked example) and never shows the real answer.
// Needs math.js and spelling.js loaded first (uses ri, pick, shuf).

const SP = (name, items) => ({ name, items }); // item = [spanish, english, emoji?]

// ---------- word banks ----------
const B = {
  greet1: SP("Hello and goodbye", [["hola","hello","👋"],["adiós","goodbye","👋"],["buenos días","good morning","🌅"],["buenas noches","good night","🌙"],["sí","yes","✅"],["no","no","❌"]]),
  greet2: SP("Please and thank you", [["por favor","please","🙏"],["gracias","thank you","🙏"],["de nada","you're welcome","😊"],["perdón","sorry","😔"],["buenas tardes","good afternoon","☀️"],["lo siento","I'm sorry","😢"]]),
  animals1: SP("Animals", [["perro","dog","🐶"],["gato","cat","🐱"],["pájaro","bird","🐦"],["pez","fish","🐟"],["vaca","cow","🐮"],["caballo","horse","🐴"]]),
  animals2: SP("More animals", [["cerdo","pig","🐷"],["oveja","sheep","🐑"],["pato","duck","🦆"],["conejo","rabbit","🐰"],["tortuga","turtle","🐢"],["mono","monkey","🐵"]]),
  family: SP("My family", [["mamá","mom","👩"],["papá","dad","👨"],["hermano","brother","👦"],["hermana","sister","👧"],["abuelo","grandpa","👴"],["abuela","grandma","👵"],["bebé","baby","👶"]]),
  fruit: SP("Fruit", [["manzana","apple","🍎"],["plátano","banana","🍌"],["naranja","orange","🍊"],["uva","grape","🍇"],["fresa","strawberry","🍓"],["sandía","watermelon","🍉"]]),
  body: SP("My body", [["cabeza","head","🙂"],["mano","hand","✋"],["pie","foot","🦶"],["ojo","eye","👁️"],["nariz","nose","👃"],["boca","mouth","👄"],["oreja","ear","👂"]]),
  phrases1: SP("Hello, friend!", [["¿Cómo estás?","How are you?"],["Estoy bien.","I am fine."],["Me llamo Ana.","My name is Ana."],["¿Cómo te llamas?","What is your name?"],["Mucho gusto.","Nice to meet you."],["Hasta luego.","See you later."],["¡Hola, amigo!","Hello, friend!"]]),
  days: SP("Days of the week", [["lunes","Monday"],["martes","Tuesday"],["miércoles","Wednesday"],["jueves","Thursday"],["viernes","Friday"],["sábado","Saturday"],["domingo","Sunday"]]),
  school: SP("At school", [["libro","book","📖"],["lápiz","pencil","✏️"],["escuela","school","🏫"],["mochila","backpack","🎒"],["silla","chair","🪑"],["papel","paper","📄"],["computadora","computer","💻"]]),
  house: SP("Around the house", [["casa","house","🏠"],["puerta","door","🚪"],["ventana","window","🪟"],["cama","bed","🛏️"],["cocina","kitchen","🍳"],["baño","bathroom","🚿"],["sofá","couch","🛋️"]]),
  food: SP("Food and drinks", [["pan","bread","🍞"],["leche","milk","🥛"],["agua","water","💧"],["queso","cheese","🧀"],["huevo","egg","🥚"],["arroz","rice","🍚"],["pollo","chicken","🍗"]]),
  weather: SP("Weather", [["sol","sun","☀️"],["lluvia","rain","🌧️"],["nube","cloud","☁️"],["nieve","snow","❄️"],["viento","wind","💨"],["tormenta","storm","⛈️"]]),
  clothes: SP("Clothes", [["camisa","shirt","👕"],["zapatos","shoes","👟"],["sombrero","hat","🎩"],["pantalones","pants","👖"],["vestido","dress","👗"],["calcetines","socks","🧦"],["abrigo","coat","🧥"]]),
  nature: SP("Nature", [["árbol","tree","🌳"],["flor","flower","🌸"],["río","river","🏞️"],["montaña","mountain","⛰️"],["luna","moon","🌙"],["estrella","star","⭐"],["playa","beach","🏖️"]]),
  opposites: SP("Opposites", [["grande","big"],["pequeño","small"],["caliente","hot"],["frío","cold"],["arriba","up"],["abajo","down"],["abierto","open"],["cerrado","closed"]]),
  feelings: SP("Feelings", [["feliz","happy","😊"],["triste","sad","😢"],["enojado","angry","😠"],["cansado","tired","😴"],["asustado","scared","😨"],["sorprendido","surprised","😲"]]),
  phrases2: SP("Useful phrases", [["¿Cuántos años tienes?","How old are you?"],["Tengo seis años.","I am six years old."],["¿Dónde está el baño?","Where is the bathroom?"],["No entiendo.","I don't understand."],["Más despacio, por favor.","Slower, please."],["¿Puedo ir al baño?","May I go to the bathroom?"],["Tengo hambre.","I am hungry."]]),
  sent: SP("Short sentences", [["El gato es grande.","The cat is big."],["Me gusta el pan.","I like bread."],["La casa es roja.","The house is red."],["Tengo un perro.","I have a dog."],["Mi mamá está feliz.","My mom is happy."],["El libro es azul.","The book is blue."],["La flor es bonita.","The flower is pretty."]]),
  pron: SP("I, you, he, she", [["yo","I"],["tú","you"],["él","he"],["ella","she"],["nosotros","we"],["ellos","they"]]),
  gusta: SP("I like it", [["Me gusta el pan.","I like bread."],["Me gusta jugar.","I like to play."],["¿Te gusta la pizza?","Do you like pizza?"],["No me gusta la lluvia.","I don't like the rain."],["Me gusta mi escuela.","I like my school."],["Me gustan los gatos.","I like cats."]]),
  verbs: SP("Action words", [["comer","to eat","🍽️"],["beber","to drink","🥤"],["jugar","to play","🎮"],["leer","to read","📖"],["correr","to run","🏃"],["saltar","to jump","🤸"],["escribir","to write","✏️"],["cantar","to sing","🎤"]]),
  qwords: SP("Question words", [["¿qué?","what?"],["¿quién?","who?"],["¿dónde?","where?"],["¿cuándo?","when?"],["¿por qué?","why?"],["¿cómo?","how?"]]),
  places: SP("Places", [["parque","park","🏞️"],["tienda","store","🏪"],["biblioteca","library","📚"],["ciudad","city","🏙️"],["granja","farm","🚜"],["hospital","hospital","🏥"],["restaurante","restaurant","🍽️"]]),
  transport: SP("Getting around", [["carro","car","🚗"],["autobús","bus","🚌"],["bicicleta","bike","🚲"],["avión","airplane","✈️"],["tren","train","🚂"],["barco","boat","⛵"]]),
  jobs: SP("Jobs", [["maestro","teacher","🧑‍🏫"],["doctor","doctor","🧑‍⚕️"],["bombero","firefighter","🧑‍🚒"],["cocinero","cook","🧑‍🍳"],["artista","artist","🧑‍🎨"],["granjero","farmer","🧑‍🌾"],["piloto","pilot","🧑‍✈️"]]),
  seasons: SP("The seasons", [["primavera","spring","🌷"],["verano","summer","🏖️"],["otoño","fall","🍂"],["invierno","winter","☃️"]]),
  sent2: SP("Longer sentences", [["Yo soy feliz.","I am happy."],["Ella tiene un gato negro.","She has a black cat."],["Nosotros jugamos en el parque.","We play in the park."],["Ellos comen pan.","They eat bread."],["Tú eres mi amigo.","You are my friend."],["Él lee un libro.","He reads a book."],["Me gusta la playa.","I like the beach."]])
};
const PIC_ALL = SP("Picture words", [].concat(B.animals1.items, B.animals2.items, B.fruit.items, B.family.items, B.school.items, B.house.items, B.food.items, B.clothes.items, B.nature.items));
const TYPE_K = SP("Type the word", [].concat(B.animals1.items, B.animals2.items, B.fruit.items, B.family.items));
const TYPE_2 = SP("Type the word", [].concat(B.school.items, B.house.items, B.food.items, B.clothes.items, B.nature.items));
const TYPE_3 = SP("Type the word", [].concat(B.places.items, B.transport.items, B.jobs.items, B.seasons.items));
const ALL_WORDS = SP("Spanish words you know", [].concat(B.animals1.items, B.family.items, B.fruit.items, B.body.items, B.greet1.items));

const NUM = [null,"uno","dos","tres","cuatro","cinco","seis","siete","ocho","nueve","diez","once","doce","trece","catorce","quince","dieciséis","diecisiete","dieciocho","diecinueve","veinte"];
const COL = [
  { es: "rojo", en: "red", hex: "#e53935" }, { es: "azul", en: "blue", hex: "#1e88e5" }, { es: "verde", en: "green", hex: "#43a047" }, { es: "amarillo", en: "yellow", hex: "#fdd835" },
  { es: "naranja", en: "orange", hex: "#fb8c00" }, { es: "morado", en: "purple", hex: "#8e24aa" }, { es: "rosa", en: "pink", hex: "#f48fb1" }, { es: "negro", en: "black", hex: "#212121" },
  { es: "blanco", en: "white", hex: "#fafafa" }, { es: "gris", en: "gray", hex: "#9e9e9e" }
];
const DAYS = B.days.items.map(x => x[0]);
const GENDER = [["gato","el","🐱"],["perro","el","🐶"],["libro","el","📖"],["lápiz","el","✏️"],["árbol","el","🌳"],["carro","el","🚗"],["casa","la","🏠"],["mesa","la","🍽️"],["silla","la","🪑"],["manzana","la","🍎"],["flor","la","🌸"],["escuela","la","🏫"],["mochila","la","🎒"],["cama","la","🛏️"]];
const PLURALS = [["gato","🐱"],["casa","🏠"],["libro","📖"],["silla","🪑"],["perro","🐶"],["flor","🌸"],["árbol","🌳"],["escuela","🏫"],["mochila","🎒"],["pájaro","🐦"],["cama","🛏️"],["pez","🐟"]];
const PRON = ["yo", "tú", "él", "ella", "nosotros", "ellos"];
const PRON_EN = { yo: "I", "tú": "you", "él": "he", ella: "she", nosotros: "we", ellos: "they" };
const VERB = {
  ser: { inf: "ser", en: "to be", f: { yo: "soy", "tú": "eres", "él": "es", ella: "es", nosotros: "somos", ellos: "son" } },
  tener: { inf: "tener", en: "to have", f: { yo: "tengo", "tú": "tienes", "él": "tiene", ella: "tiene", nosotros: "tenemos", ellos: "tienen" } },
  hablar: { inf: "hablar", en: "to speak", f: { yo: "hablo", "tú": "hablas", "él": "habla", ella: "habla", nosotros: "hablamos", ellos: "hablan" } },
  comer: { inf: "comer", en: "to eat", f: { yo: "como", "tú": "comes", "él": "come", ella: "come", nosotros: "comemos", ellos: "comen" } },
  vivir: { inf: "vivir", en: "to live", f: { yo: "vivo", "tú": "vives", "él": "vive", ella: "vive", nosotros: "vivimos", ellos: "viven" } }
};
const PRON_RULE = {
  yo: "For <b>yo</b> (I), the verb usually ends in <b>-o</b>. A few are special, like <b>soy</b>.",
  "tú": "For <b>tú</b> (you), the verb usually ends in <b>-s</b>.",
  "él": "For <b>él</b> (he), the verb usually ends in <b>-a</b> or <b>-e</b>. Some are special, like <b>es</b>.",
  ella: "For <b>ella</b> (she), the verb is the same as for él: it usually ends in <b>-a</b> or <b>-e</b>.",
  nosotros: "For <b>nosotros</b> (we), the verb usually ends in <b>-mos</b>.",
  ellos: "For <b>ellos</b> (they), the verb usually ends in <b>-n</b>."
};
const BLANKS = [
  ["Yo ___ un gato.", "tengo", ["tiene", "tienen"]], ["Ella ___ una mochila.", "tiene", ["tengo", "tienes"]], ["Tú ___ mi amigo.", "eres", ["soy", "es"]],
  ["Nosotros ___ amigos.", "somos", ["son", "soy"]], ["Ellos ___ felices.", "son", ["somos", "es"]], ["Yo ___ feliz.", "soy", ["eres", "es"]],
  ["Me ___ la pizza.", "gusta", ["gustan", "gustas"]], ["Tú ___ un libro.", "tienes", ["tengo", "tiene"]]
];
const ADJ = [["el gato", "negro", "negra", "black"], ["la casa", "blanca", "blanco", "white"], ["el libro", "rojo", "roja", "red"], ["la flor", "bonita", "bonito", "pretty"], ["el perro", "pequeño", "pequeña", "small"], ["la silla", "roja", "rojo", "red"], ["el carro", "blanco", "blanca", "white"], ["la mochila", "negra", "negro", "black"]];
const CULTURE = [
  { q: "Which of these countries speaks Spanish?", a: "México", w: ["Japón", "Alemania"] },
  { q: "In which country is Madrid the capital?", a: "España", w: ["México", "Perú"] },
  { q: "What language do people speak in Argentina?", a: "Spanish", w: ["French", "German"] },
  { q: "Which is a Spanish-speaking country in South America?", a: "Colombia", w: ["Canadá", "Francia"] },
  { q: "Tacos come from which country?", a: "México", w: ["Japón", "Egipto"] },
  { q: "What is the capital of Mexico?", a: "Ciudad de México", w: ["Madrid", "Lima"] },
  { q: "Which of these is a Spanish-speaking country in Central America?", a: "Costa Rica", w: ["Australia", "Italia"] }
];

// ---------- question makers ----------
const SQP = {
  vocab(bank, mode = "mix") {
    return () => {
      const items = bank.items, cur = pick(items), [es, en, e] = cur;
      const rest = items.filter(x => x[0] !== es), exs = pick(rest);
      let m = mode === "mix" ? pick(e ? ["es2en", "en2es", "pic"] : ["es2en", "en2es"]) : mode;
      if (m === "pic" && !e) m = "es2en";
      const wrongs = shuf(rest);
      if (m === "es2en") return {
        text: `What does "${es}" mean?`, say: es, lang: "es-ES", choices: shuf([en, ...wrongs.slice(0, 2).map(x => x[1])]), answer: en,
        hints: ["Press 🔊 to hear the Spanish word and say it out loud. Does it remind you of an English word?", `The English answer starts with the letter "${en[0].toUpperCase()}".`, `Example: "${exs[0]}" means "${exs[1]}". Now think about "${es}".`]
      };
      if (m === "en2es") return {
        text: `How do you say "${en}" in Spanish?`, choices: shuf([es, ...wrongs.slice(0, 2).map(x => x[0])]), answer: es,
        hints: ["Think back to the Spanish words from the lesson. Which one matches the English?", `The Spanish word starts with "${es[0]}".`, `Example: "${exs[1]}" in Spanish is "${exs[0]}". Now find yours.`]
      };
      return {
        text: "How do you say this in Spanish?", visual: e, choices: shuf([es, ...wrongs.slice(0, 2).map(x => x[0])]), answer: es,
        hints: ["Look at the picture. What is it in English?", `The Spanish word starts with "${es[0]}".`, `Example: ${exs[2] || ""} is "${exs[0]}" in Spanish. Now find yours.`]
      };
    };
  },
  typedVocab(bank) {
    return () => {
      const items = bank.items.filter(x => x[2]), [es, en, e] = pick(items), exs = pick(items.filter(x => x[0] !== es));
      return {
        text: "Type this word in Spanish.", visual: e, textInput: true, answer: es,
        hints: ["Think of the English word for the picture. Then remember the Spanish word from the lessons.", `The Spanish word starts with "${es[0]}" and has ${es.replace(/ /g, "").length} letters.`, `Example: ${exs[2]} is "${exs[0]}" in Spanish. Now do yours. (You don't need to type accents!)`]
      };
    };
  },
  numberEs(min, max) {
    return () => {
      const n = ri(min, max), w = NUM[n], ex = n === 3 ? 2 : 3;
      if (Math.random() < 0.5) return {
        text: `Which number is "${w}"?`, say: w, lang: "es-ES", answer: n,
        hints: ["Press 🔊 to hear the number. Count in Spanish from the start: uno, dos, tres…", n <= 1 ? "This is the very first number you say when you count!" : `Count in Spanish until you reach "${w}". The numbers just before it are: ${NUM.slice(Math.max(1, n - 3), n).join(", ")}.`, `Example: "${NUM[ex]}" is ${ex}, because uno is 1, dos is 2${ex === 3 ? ", and tres is 3" : ""}. Now find yours.`]
      };
      const pool = []; for (let i = min; i <= max; i++) if (i !== n) pool.push(NUM[i]);
      return {
        text: `How do you say ${n} in Spanish?`, choices: shuf([w, ...shuf(pool).slice(0, 2)]), answer: w,
        hints: ["Count in Spanish from the start: uno, dos, tres…", `The Spanish word starts with the letter "${w[0]}".`, `Example: 5 in Spanish is "cinco", and 4 is "cuatro". Now find yours.`]
      };
    };
  },
  colorOf(list) {
    return () => {
      const c = pick(list), others = COL.filter(x => x.es !== c.es), ex = pick(others);
      return {
        text: "What color is this? Pick the Spanish word.", visual: `<span class="swatch" style="background:${c.hex}"></span>`, choices: shuf([c.es, ...shuf(others).slice(0, 2).map(x => x.es)]), answer: c.es,
        hints: ["Look at the color. What is it in English?", `The Spanish word starts with "${c.es[0]}".`, `Example: "${ex.es}" means ${ex.en}. Now find the Spanish word for ${c.en}.`]
      };
    };
  },
  countEs(max) {
    return () => {
      const n = ri(1, max), e = pick(["🍎", "⭐", "🐱", "🎈"]), ex = n === 3 ? 2 : 3;
      const near = shuf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(i => i !== n && i <= max + 2)).slice(0, 2).map(i => NUM[i]);
      return {
        text: "How many are there? Pick the Spanish number.", visual: e.repeat(n), choices: shuf([NUM[n], ...near]), answer: NUM[n],
        hints: ["Count the pictures first, in English.", "Now find that number in Spanish. Count in Spanish: uno, dos, tres…", `Example: ${e.repeat(ex)} is "${NUM[ex]}". Now count yours the same way.`]
      };
    };
  },
  dayNext() {
    return () => {
      const i = ri(0, 6), after = Math.random() < 0.5, d = DAYS[i], ans = DAYS[(i + (after ? 1 : 6)) % 7];
      const wrongs = shuf(DAYS.filter(x => x !== ans && x !== d)).slice(0, 2);
      return {
        text: `Which day comes ${after ? "after" : "before"} ${d}?`, choices: shuf([ans, ...wrongs]), answer: ans,
        hints: ["Think about the order of the days of the week.", `Find "${d}" in the week. ${after ? "The next day" : "The day just earlier"} is your answer.`, "Example: the day after lunes is martes, and the day before miércoles is martes."]
      };
    };
  },
  genderArticle() {
    return () => {
      const [w, a, e] = pick(GENDER);
      return {
        text: `Which one goes with "${w}": el or la?`, visual: e, choices: ["el", "la"], answer: a,
        hints: ["Every Spanish noun is either masculine (el) or feminine (la). El and la both mean \"the\".", "Many words that end in -o use el, and many words that end in -a use la.", "Example: el gato (the cat) and la casa (the house)."]
      };
    };
  },
  pluralEs() {
    return () => {
      const [w, e] = pick(PLURALS), ans = /[aeiouáéíóú]$/.test(w) ? w + "s" : w + "es";
      return {
        text: `One ${w}, two ___ .`, visual: e + " → " + e + e, textInput: true, answer: ans,
        hints: ["Plural means more than one.", "If a word ends in a vowel (a, e, i, o, u), add <b>-s</b>. If it ends in a consonant, add <b>-es</b>.", "Example: gato → gatos (ends in o, add s) and flor → flores (ends in r, add es)."]
      };
    };
  },
  verbForm(key) {
    const v = VERB[key];
    return () => {
      const p = pick(PRON), ans = v.f[p];
      const wrongs = shuf([...new Set(PRON.map(x => v.f[x]))].filter(x => x !== ans)).slice(0, 2);
      const exV = key === "hablar" ? VERB.comer : VERB.hablar;
      return {
        text: `${p} ___ (${v.inf}, ${v.en})`, choices: shuf([ans, ...wrongs]), answer: ans,
        hints: ["Spanish verbs change their ending to match WHO is doing the action.", PRON_RULE[p], `Example: with ${exV.inf} (${exV.en}): yo ${exV.f.yo}, tú ${exV.f["tú"]}, nosotros ${exV.f.nosotros}. Now find yours.`]
      };
    };
  },
  fillBlank() {
    return () => {
      const [s, a, w] = pick(BLANKS);
      return {
        text: s, choices: shuf([a, ...w]), answer: a,
        hints: ["Read the sentence. Who is doing the action: yo, tú, él, ella, nosotros or ellos?", "Match the verb to the person. Yo goes with -o (or soy), tú with -s, él and ella with -a or -e, nosotros with -mos, ellos with -n.", "Example: \"Yo soy feliz\" means \"I am happy\". Yo goes with soy."]
      };
    };
  },
  adjAgree() {
    return () => {
      const [np, right, wrong, en] = pick(ADJ);
      return {
        text: `${np} ___ (${en})`, choices: shuf([right, wrong]), answer: right,
        hints: ["In Spanish, the describing word must match the noun.", "Words with \"el\" usually take an -o ending. Words with \"la\" usually take an -a ending.", "Example: el gato negro (the black cat) and la casa negra (the black house)."]
      };
    };
  },
  culture() {
    return () => {
      const it = pick(CULTURE);
      return {
        text: it.q, choices: shuf([it.a, ...it.w]), answer: it.a,
        hints: ["Spanish is spoken in many countries around the world, like Spain, Mexico and lots of countries in South America and Central America.", "Think about which choices are Spanish-speaking places. Use what you learned in the lesson.", "Example: people in Spain and Mexico speak Spanish. People in Japan speak Japanese."]
      };
    };
  },
  mixed(...makers) { return () => pick(makers)(); }
};

// ---------- teaching slides ----------
const word = (es, en, e) => `<span class="word" data-say="${es}">${e ? e + " " : ""}<b>${es}</b> = ${en} 🔊</span>`;
const STEACH_ES = {
  vocab: (bank) => [
    { h: bank.name, v: bank.items.slice(0, 3).map(x => x[2] || "💬").join(" "), t: `Spanish is spoken by hundreds of millions of people around the world. Today you'll learn Spanish words and phrases about <b>${bank.name.toLowerCase()}</b>.` },
    { h: "Learn the words", v: bank.items.map(x => word(x[0], x[1], x[2])).join("<br>"), t: "<b>Tap any word to hear it</b> and say it out loud!" },
    { h: "How to remember", v: "🧠", t: "Say each word out loud. Cover the English and see if you remember. Looking for words that sound like English words helps a lot." }
  ],
  typedVocab: (bank) => [
    { h: "Typing Spanish", v: "⌨️", t: "In this lesson you'll type Spanish words. Look at the picture, remember the Spanish word, and spell it out." },
    { h: "Accents are optional", v: "á é í ó ú ñ", t: "Spanish has special letters with accents. When you type here, you can leave the accents off: <b>pajaro</b> counts as <b>pájaro</b>." },
    { h: "Sound it out", v: "🔊", t: "Spanish is spelled the way it sounds. Say the word slowly and write the letters you hear." }
  ],
  numberEs: (min, max) => [
    { h: "Numbers in Spanish", v: NUM.slice(min, max + 1).map((w, i) => word(w, min + i)).join("<br>"), t: "<b>Tap a number to hear it.</b> Count along out loud!" },
    max > 10
      ? { h: "Patterns", v: "dieci + seis = dieciséis", t: "From 16 to 19 the numbers are made from <b>dieci</b> (ten and) plus a number. 11 to 15 end in <b>-ce</b>. 20 is <b>veinte</b>." }
      : { h: "Count it out", v: "uno · dos · tres · cuatro · cinco", t: "Numbers are always in the same order. Count on your fingers in Spanish: uno, dos, tres…" },
    { h: "Tip", v: "🖐️", t: "Count things you see around you in Spanish, like your fingers or the steps you take!" }
  ],
  colorOf: (list) => [
    { h: "Colors in Spanish", v: list.map(c => `<span class="swatch small" style="background:${c.hex}"></span>`).join(" "), t: "Spanish has a word for every color you know." },
    { h: "Learn the colors", v: list.map(c => `<span class="word" data-say="${c.es}"><span class="swatch tiny" style="background:${c.hex}"></span> <b>${c.es}</b> = ${c.en} 🔊</span>`).join("<br>"), t: "<b>Tap a color word to hear it.</b>" },
    { h: "Tip", v: "🌈", t: "Look around you and name colors in Spanish. Your shirt, the sky, your pencil!" }
  ],
  countEs: () => [
    { h: "Counting things", v: "🍎🍎🍎 = tres", t: "Count the things first. Then say that number in Spanish." },
    { h: "The numbers", v: NUM.slice(1, 11).map((w, i) => word(w, i + 1)).join("<br>"), t: "<b>Tap a number to hear it.</b>" },
    { h: "Tip", v: "🖐️", t: "Point to each thing as you count: uno, dos, tres…" }
  ],
  dayNext: () => [
    { h: "Days of the week", v: DAYS.map((d, i) => word(d, B.days.items[i][1])).join("<br>"), t: "<b>Tap a day to hear it.</b> In Spanish, day names start with a small letter." },
    { h: "In order", v: "lunes → martes → miércoles → jueves → viernes → sábado → domingo", t: "The days always go in this order. After domingo it starts again with lunes." },
    { h: "Tip", v: "🗓️", t: "Say the days in order, out loud, and then try them backwards!" }
  ],
  genderArticle: () => [
    { h: "Two ways to say \"the\"", v: "el gato &nbsp; la casa", t: "In Spanish every noun is either <b>masculine</b> (use <b>el</b>) or <b>feminine</b> (use <b>la</b>). Both mean \"the\"." },
    { h: "Look at the ending", v: "el libro · la mesa", t: "Many nouns ending in <b>-o</b> use <b>el</b>. Many nouns ending in <b>-a</b> use <b>la</b>." },
    { h: "Some are tricky", v: "el árbol · la flor", t: "Not every word follows the pattern, so learn each word with its <b>el</b> or <b>la</b>." }
  ],
  pluralEs: () => [
    { h: "More than one", v: "gato → gatos", t: "To say more than one in Spanish, add <b>-s</b> to words that end in a <b>vowel</b> (a, e, i, o, u): gato → gatos." },
    { h: "Words that end in a consonant", v: "flor → flores", t: "If a word ends in a <b>consonant</b>, add <b>-es</b>: flor → flores, árbol → árboles." },
    { h: "Tip", v: "💡", t: "Look at the last letter of the word, then decide: add s or add es." }
  ],
  verbForm: (key) => {
    const v = VERB[key];
    return [
      { h: `The verb "${v.inf}" (${v.en})`, v: PRON.map(p => word(v.f[p], `${PRON_EN[p]}`).replace("<b>", `${p} <b>`)).join("<br>"), t: "<b>Tap a verb to hear it.</b> The verb changes depending on <b>who</b> is doing it." },
      { h: "Endings", v: "yo -o · tú -s · él/ella -a/-e · nosotros -mos · ellos -n", t: "Most verbs follow this pattern of endings. A few verbs, like <b>ser</b> and <b>tener</b>, are special and you have to learn them." },
      { h: "Tip", v: "🧠", t: "Say all the forms out loud like a song: yo, tú, él, ella, nosotros, ellos." }
    ];
  },
  fillBlank: () => [
    { h: "Fill in the verb", v: "Yo ___ un perro.", t: "Read the sentence. The person doing the action tells you which verb form to use." },
    { h: "Match the person", v: "Yo tengo · Tú tienes · Ella tiene", t: "<b>Yo</b> goes with <b>tengo</b>. <b>Tú</b> goes with <b>tienes</b>. <b>Él / ella</b> goes with <b>tiene</b>." },
    { h: "Tip", v: "🔍", t: "Find the person word first. Then pick the verb form that goes with it." }
  ],
  adjAgree: () => [
    { h: "Describing words", v: "el gato negro &nbsp; la casa negra", t: "In Spanish, describing words (adjectives) come <b>after</b> the noun and <b>match</b> it." },
    { h: "Match the ending", v: "el … -o · la … -a", t: "With <b>el</b> words, use the <b>-o</b> ending. With <b>la</b> words, use the <b>-a</b> ending." },
    { h: "Tip", v: "💡", t: "Look at the el or la first, then choose the ending that matches." }
  ],
  culture: () => [
    { h: "The Spanish-speaking world", v: "🌎", t: "Spanish is spoken in <b>many countries</b>, like Spain, Mexico, Argentina, Colombia, Peru and Costa Rica." },
    { h: "Where is it?", v: "España · México · Argentina · Colombia · Perú · Costa Rica", t: "Spain is in Europe. The others are in North, Central or South America." },
    { h: "Fun fact", v: "🌮", t: "Foods like tacos come from Mexico. People all over the world eat them!" }
  ]
};
for (const key of Object.keys(SQP)) {
  if (key === "mixed") continue;
  const orig = SQP[key];
  SQP[key] = (...args) => {
    const f = orig(...args);
    f.teach = () => STEACH_ES[key](...args);
    return f;
  };
}
SQP.mixed = (...makers) => {
  const f = () => pick(makers)();
  f.teach = () => {
    const slides = [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here's a quick reminder of each idea, then the quiz." }];
    makers.forEach(m => { if (m.teach) slides.push(m.teach()[0]); });
    return slides;
  };
  return f;
};

// ---------- lessons ----------
const XL = (title, make) => ({ title, make });
const V = SQP.vocab;
const SPANISH_LEVELS = {
  1: [ // Kindergarten, first half: first Spanish words
    XL("Hello and goodbye", V(B.greet1)), XL("Please and thank you", V(B.greet2)),
    XL("Numbers 1 to 5", SQP.numberEs(1, 5)), XL("Numbers 6 to 10", SQP.numberEs(6, 10)),
    XL("Colors", SQP.colorOf(COL.slice(0, 4))), XL("More colors", SQP.colorOf(COL.slice(4, 9))),
    XL("Animals", V(B.animals1)), XL("More animals", V(B.animals2)),
    XL("My family", V(B.family)), XL("Fruit", V(B.fruit)),
    XL("My body", V(B.body)), XL("Count in Spanish", SQP.countEs(10)),
    XL("Type the word", SQP.typedVocab(TYPE_K)), XL("Hello, friend!", V(B.phrases1)),
    XL("Numbers 1 to 10", SQP.numberEs(1, 10)), XL("Picture quiz", V(PIC_ALL, "pic")),
    XL("Say it in Spanish", V(ALL_WORDS, "en2es")), XL("What does it mean?", V(ALL_WORDS, "es2en")),
    XL("Mixed practice", SQP.mixed(V(B.animals1), V(B.fruit), SQP.numberEs(1, 10), SQP.colorOf(COL.slice(0, 8)))), XL("Level 1 Challenge", SQP.mixed(V(B.greet1), V(B.family), SQP.numberEs(1, 10), SQP.colorOf(COL.slice(0, 8)), SQP.typedVocab(TYPE_K), SQP.countEs(10)))
  ],
  2: [ // Kindergarten, second half: school, home, days
    XL("Numbers 11 to 20", SQP.numberEs(11, 20)), XL("Days of the week", V(B.days)),
    XL("Days in order", SQP.dayNext()), XL("At school", V(B.school)),
    XL("Around the house", V(B.house)), XL("Food and drinks", V(B.food)),
    XL("Weather", V(B.weather)), XL("Clothes", V(B.clothes)),
    XL("Nature", V(B.nature)), XL("Opposites", V(B.opposites)),
    XL("Feelings", V(B.feelings)), XL("El or la?", SQP.genderArticle()),
    XL("More than one", SQP.pluralEs()), XL("Type it in Spanish", SQP.typedVocab(TYPE_2)),
    XL("Useful phrases", V(B.phrases2)), XL("Count to 20", SQP.numberEs(1, 20)),
    XL("Short sentences", V(B.sent)), XL("Colors again", SQP.colorOf(COL)),
    XL("Mixed practice", SQP.mixed(V(B.school), V(B.house), SQP.dayNext(), SQP.genderArticle())), XL("Level 2 Challenge", SQP.mixed(V(B.food), V(B.weather), V(B.clothes), SQP.dayNext(), SQP.pluralEs(), SQP.genderArticle(), SQP.typedVocab(TYPE_2)))
  ],
  3: [ // 1st grade, first half: verbs and sentences
    XL("I, you, he, she", V(B.pron)), XL("The verb ser", SQP.verbForm("ser")),
    XL("The verb tener", SQP.verbForm("tener")), XL("I like it", V(B.gusta)),
    XL("Action words", V(B.verbs)), XL("Verbs that end in -ar", SQP.verbForm("hablar")),
    XL("Verbs that end in -er", SQP.verbForm("comer")), XL("Verbs that end in -ir", SQP.verbForm("vivir")),
    XL("Question words", V(B.qwords)), XL("Places", V(B.places)),
    XL("Getting around", V(B.transport)), XL("Jobs", V(B.jobs)),
    XL("The seasons", V(B.seasons)), XL("Matching endings", SQP.adjAgree()),
    XL("Fill in the verb", SQP.fillBlank()), XL("Longer sentences", V(B.sent2)),
    XL("Type it in Spanish", SQP.typedVocab(TYPE_3)), XL("The Spanish-speaking world", SQP.culture()),
    XL("Mixed practice", SQP.mixed(SQP.verbForm("ser"), SQP.verbForm("tener"), V(B.places), SQP.adjAgree())), XL("Level 3 Challenge", SQP.mixed(SQP.verbForm("hablar"), SQP.verbForm("comer"), SQP.fillBlank(), V(B.jobs), V(B.transport), SQP.adjAgree(), SQP.culture()))
  ]
};
