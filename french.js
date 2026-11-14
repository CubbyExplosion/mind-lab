// Mind Lab French. Levels 1-3 have 20 lessons each (60 lessons).
// Every lesson teaches first (3 slides), then quizzes. Every question has 3 hints
// (nudge, clue, worked example) and never shows the real answer.
const FRENCH_LEVELS = (() => {
  const SP = (name, items) => ({ name, items }); // item = [french, english, emoji?]
  const L = "fr-FR";

  const B = {
    greet1: SP("Hello and goodbye", [["bonjour","hello","👋"],["au revoir","goodbye","👋"],["bonsoir","good evening","🌆"],["bonne nuit","good night","🌙"],["oui","yes","✅"],["non","no","❌"]]),
    greet2: SP("Please and thank you", [["s'il vous plaît","please","🙏"],["merci","thank you","🙏"],["de rien","you're welcome","😊"],["pardon","excuse me","🙋"],["salut","hi","👋"],["désolé","I'm sorry","😢"]]),
    animals1: SP("Animals", [["chien","dog","🐶"],["chat","cat","🐱"],["oiseau","bird","🐦"],["poisson","fish","🐟"],["vache","cow","🐮"],["cheval","horse","🐴"]]),
    animals2: SP("More animals", [["cochon","pig","🐷"],["mouton","sheep","🐑"],["canard","duck","🦆"],["lapin","rabbit","🐰"],["tortue","turtle","🐢"],["singe","monkey","🐵"]]),
    family: SP("My family", [["maman","mom","👩"],["papa","dad","👨"],["frère","brother","👦"],["sœur","sister","👧"],["grand-père","grandpa","👴"],["grand-mère","grandma","👵"],["bébé","baby","👶"]]),
    fruit: SP("Fruit", [["pomme","apple","🍎"],["banane","banana","🍌"],["orange","orange","🍊"],["raisin","grape","🍇"],["fraise","strawberry","🍓"],["pastèque","watermelon","🍉"]]),
    body: SP("My body", [["tête","head","🙂"],["main","hand","✋"],["pied","foot","🦶"],["œil","eye","👁️"],["nez","nose","👃"],["bouche","mouth","👄"],["oreille","ear","👂"]]),
    phrases1: SP("Hello, friend!", [["Comment ça va ?","How are you?"],["Ça va bien.","I am fine."],["Je m'appelle Ana.","My name is Ana."],["Comment tu t'appelles ?","What is your name?"],["Enchanté.","Nice to meet you."],["À bientôt.","See you soon."],["Bonjour, mon ami !","Hello, my friend!"]]),
    days: SP("Days of the week", [["lundi","Monday"],["mardi","Tuesday"],["mercredi","Wednesday"],["jeudi","Thursday"],["vendredi","Friday"],["samedi","Saturday"],["dimanche","Sunday"]]),
    school: SP("At school", [["livre","book","📖"],["crayon","pencil","✏️"],["école","school","🏫"],["sac à dos","backpack","🎒"],["chaise","chair","🪑"],["papier","paper","📄"],["ordinateur","computer","💻"]]),
    house: SP("Around the house", [["maison","house","🏠"],["porte","door","🚪"],["fenêtre","window","🪟"],["lit","bed","🛏️"],["cuisine","kitchen","🍳"],["salle de bains","bathroom","🚿"],["canapé","couch","🛋️"]]),
    food: SP("Food and drinks", [["pain","bread","🍞"],["lait","milk","🥛"],["eau","water","💧"],["fromage","cheese","🧀"],["œuf","egg","🥚"],["riz","rice","🍚"],["poulet","chicken","🍗"]]),
    weather: SP("Weather", [["soleil","sun","☀️"],["pluie","rain","🌧️"],["nuage","cloud","☁️"],["neige","snow","❄️"],["vent","wind","💨"],["orage","storm","⛈️"]]),
    clothes: SP("Clothes", [["chemise","shirt","👕"],["chaussures","shoes","👟"],["chapeau","hat","🎩"],["pantalon","pants","👖"],["robe","dress","👗"],["chaussettes","socks","🧦"],["manteau","coat","🧥"]]),
    nature: SP("Nature", [["arbre","tree","🌳"],["fleur","flower","🌸"],["rivière","river","🏞️"],["montagne","mountain","⛰️"],["lune","moon","🌙"],["étoile","star","⭐"],["plage","beach","🏖️"]]),
    opposites: SP("Opposites", [["grand","big"],["petit","small"],["chaud","hot"],["froid","cold"],["en haut","up"],["en bas","down"],["ouvert","open"],["fermé","closed"]]),
    feelings: SP("Feelings", [["content","happy","😊"],["triste","sad","😢"],["fâché","angry","😠"],["fatigué","tired","😴"],["effrayé","scared","😨"],["surpris","surprised","😲"]]),
    phrases2: SP("Useful phrases", [["Quel âge as-tu ?","How old are you?"],["J'ai six ans.","I am six years old."],["Où sont les toilettes ?","Where is the bathroom?"],["Je ne comprends pas.","I don't understand."],["Plus lentement, s'il vous plaît.","Slower, please."],["Puis-je aller aux toilettes ?","May I go to the bathroom?"],["J'ai faim.","I am hungry."]]),
    sent: SP("Short sentences", [["Le chat est grand.","The cat is big."],["J'aime le pain.","I like bread."],["La maison est rouge.","The house is red."],["J'ai un chien.","I have a dog."],["Maman est contente.","Mom is happy."],["Le livre est bleu.","The book is blue."],["La fleur est jolie.","The flower is pretty."]]),
    pron: SP("I, you, he, she", [["je","I"],["tu","you"],["il","he"],["elle","she"],["nous","we"],["ils","they"]]),
    gusta: SP("I like it", [["J'aime le pain.","I like bread."],["J'aime jouer.","I like to play."],["Tu aimes la pizza ?","Do you like pizza?"],["Je n'aime pas la pluie.","I don't like the rain."],["J'aime mon école.","I like my school."],["J'aime les chats.","I like cats."]]),
    verbs: SP("Action words", [["manger","to eat","🍽️"],["boire","to drink","🥤"],["jouer","to play","🎮"],["lire","to read","📖"],["courir","to run","🏃"],["sauter","to jump","🤸"],["écrire","to write","✏️"],["chanter","to sing","🎤"]]),
    qwords: SP("Question words", [["quoi ?","what?"],["qui ?","who?"],["où ?","where?"],["quand ?","when?"],["pourquoi ?","why?"],["comment ?","how?"]]),
    places: SP("Places", [["parc","park","🏞️"],["magasin","store","🏪"],["bibliothèque","library","📚"],["ville","city","🏙️"],["ferme","farm","🚜"],["hôpital","hospital","🏥"],["restaurant","restaurant","🍽️"]]),
    transport: SP("Getting around", [["voiture","car","🚗"],["autobus","bus","🚌"],["vélo","bike","🚲"],["avion","airplane","✈️"],["train","train","🚂"],["bateau","boat","⛵"]]),
    jobs: SP("Jobs", [["professeur","teacher","🧑‍🏫"],["médecin","doctor","🧑‍⚕️"],["pompier","firefighter","🧑‍🚒"],["cuisinier","cook","🧑‍🍳"],["artiste","artist","🧑‍🎨"],["fermier","farmer","🧑‍🌾"],["pilote","pilot","🧑‍✈️"]]),
    seasons: SP("The seasons", [["printemps","spring","🌷"],["été","summer","🏖️"],["automne","fall","🍂"],["hiver","winter","☃️"]]),
    sent2: SP("Longer sentences", [["Je suis content.","I am happy."],["Elle a un chat noir.","She has a black cat."],["Nous jouons dans le parc.","We play in the park."],["Ils mangent du pain.","They eat bread."],["Tu es mon ami.","You are my friend."],["Il lit un livre.","He reads a book."],["J'aime la plage.","I like the beach."]])
  };
  const PIC_ALL = SP("Picture words", [].concat(B.animals1.items, B.animals2.items, B.fruit.items, B.family.items, B.school.items, B.house.items, B.food.items, B.clothes.items, B.nature.items));
  // typing: only words made of plain letters (accents are fine, hyphens, spaces and the letters oe are not)
  const typable = items => items.filter(x => x[2] && /^[a-zàâçéèêëîïôûùü]+$/i.test(x[0]));
  const TYPE_K = SP("Type the word", typable([].concat(B.animals1.items, B.animals2.items, B.fruit.items, B.family.items)));
  const TYPE_2 = SP("Type the word", typable([].concat(B.school.items, B.house.items, B.food.items, B.clothes.items, B.nature.items)));
  const TYPE_3 = SP("Type the word", typable([].concat(B.places.items, B.transport.items, B.jobs.items, B.seasons.items)));
  const ALL_WORDS = SP("French words you know", [].concat(B.animals1.items, B.family.items, B.fruit.items, B.body.items, B.greet1.items));

  const NUM = [null,"un","deux","trois","quatre","cinq","six","sept","huit","neuf","dix","onze","douze","treize","quatorze","quinze","seize","dix-sept","dix-huit","dix-neuf","vingt"];
  const COL = [
    { fr: "rouge", en: "red", hex: "#e53935" }, { fr: "bleu", en: "blue", hex: "#1e88e5" }, { fr: "vert", en: "green", hex: "#43a047" }, { fr: "jaune", en: "yellow", hex: "#fdd835" },
    { fr: "orange", en: "orange", hex: "#fb8c00" }, { fr: "violet", en: "purple", hex: "#8e24aa" }, { fr: "rose", en: "pink", hex: "#f48fb1" }, { fr: "noir", en: "black", hex: "#212121" },
    { fr: "blanc", en: "white", hex: "#fafafa" }, { fr: "gris", en: "gray", hex: "#9e9e9e" }
  ];
  const DAYS = B.days.items.map(x => x[0]);
  const GENDER = [["chat","le","🐱"],["chien","le","🐶"],["livre","le","📖"],["crayon","le","✏️"],["arbre","le","🌳"],["lit","le","🛏️"],["maison","la","🏠"],["table","la","🍽️"],["chaise","la","🪑"],["pomme","la","🍎"],["fleur","la","🌸"],["fenêtre","la","🪟"],["porte","la","🚪"],["voiture","la","🚗"]];
  const ELIDE = [["école","🏫"],["arbre","🌳"],["avion","✈️"],["orange","🍊"],["oiseau","🐦"],["ami","🧒"],["eau","💧"],["ordinateur","💻"]];
  const CONS = [["chat","🐱"],["maison","🏠"],["livre","📖"],["fleur","🌸"],["chien","🐶"],["table","🍽️"]];
  const UNUNE = [["chat","un","🐱"],["livre","un","📖"],["chien","un","🐶"],["crayon","un","✏️"],["arbre","un","🌳"],["maison","une","🏠"],["table","une","🍽️"],["fleur","une","🌸"],["pomme","une","🍎"],["école","une","🏫"],["chaise","une","🪑"],["voiture","une","🚗"]];
  const PLURALS = [["chat","🐱"],["maison","🏠"],["livre","📖"],["chaise","🪑"],["chien","🐶"],["fleur","🌸"],["arbre","🌳"],["école","🏫"],["pomme","🍎"],["crayon","✏️"],["fenêtre","🪟"],["porte","🚪"]];
  const PRON = ["je", "tu", "il", "elle", "nous", "ils"];
  const PRON_EN = { je: "I", tu: "you", il: "he", elle: "she", nous: "we", ils: "they" };
  const VERB = {
    "être": { inf: "être", en: "to be", f: { je: "suis", tu: "es", il: "est", elle: "est", nous: "sommes", ils: "sont" } },
    avoir: { inf: "avoir", en: "to have", vow: true, f: { je: "ai", tu: "as", il: "a", elle: "a", nous: "avons", ils: "ont" } },
    parler: { inf: "parler", en: "to speak", f: { je: "parle", tu: "parles", il: "parle", elle: "parle", nous: "parlons", ils: "parlent" } },
    aimer: { inf: "aimer", en: "to like or love", vow: true, f: { je: "aime", tu: "aimes", il: "aime", elle: "aime", nous: "aimons", ils: "aiment" } },
    manger: { inf: "manger", en: "to eat", f: { je: "mange", tu: "manges", il: "mange", elle: "mange", nous: "mangeons", ils: "mangent" } },
    finir: { inf: "finir", en: "to finish", f: { je: "finis", tu: "finis", il: "finit", elle: "finit", nous: "finissons", ils: "finissent" } }
  };
  const label = (v, p) => (p === "je" && v.vow ? "j'" : p);
  const PRON_RULE = {
    je: "For <b>je</b> (I), the verb often ends in <b>-e</b> (or <b>-s</b>). A few are special, like <b>suis</b> and <b>ai</b>.",
    tu: "For <b>tu</b> (you), the verb usually ends in <b>-s</b>.",
    il: "For <b>il</b> (he), the verb often ends in <b>-e</b> or <b>-t</b>. Some are special, like <b>est</b> and <b>a</b>.",
    elle: "For <b>elle</b> (she), the verb is the same as for il: often <b>-e</b> or <b>-t</b>.",
    nous: "For <b>nous</b> (we), the verb usually ends in <b>-ons</b>. A few are special, like <b>sommes</b>.",
    ils: "For <b>ils</b> (they), the verb often ends in <b>-ent</b>. A few are special, like <b>sont</b> and <b>ont</b>."
  };
  const BLANKS = [
    ["Tu ___ un chat.", "as", ["a", "ai"]], ["Elle ___ un sac.", "a", ["ai", "as"]], ["Tu ___ mon ami.", "es", ["suis", "est"]],
    ["Nous ___ amis.", "sommes", ["sont", "suis"]], ["Ils ___ contents.", "sont", ["sommes", "est"]], ["Je ___ content.", "suis", ["es", "est"]],
    ["Il ___ un livre.", "a", ["as", "ai"]], ["Ils ___ un chat.", "ont", ["a", "avons"]]
  ];
  const ADJ = [["le chat", "noir", "noire", "black"], ["la maison", "blanche", "blanc", "white"], ["le livre", "bleu", "bleue", "blue"], ["la chaise", "verte", "vert", "green"], ["le crayon", "gris", "grise", "gray"], ["la voiture", "grise", "gris", "gray"], ["la fleur", "violette", "violet", "purple"], ["le sac", "vert", "verte", "green"]];
  const CULTURE = [
    { q: "Which of these countries speaks French?", a: "France", w: ["Japan", "Brazil"] },
    { q: "In which country is Paris the capital?", a: "France", w: ["Italy", "Spain"] },
    { q: "Which Canadian province mostly speaks French?", a: "Quebec", w: ["Alberta", "Saskatchewan"] },
    { q: "Belgium has three official languages. Which is one of them?", a: "French", w: ["Spanish", "Japanese"] },
    { q: "Switzerland has four national languages. Which is one of them?", a: "French", w: ["Spanish", "Chinese"] },
    { q: "Which of these is a country in Africa where people speak French?", a: "Senegal", w: ["Mexico", "Australia"] },
    { q: "What famous tower is in Paris?", a: "The Eiffel Tower", w: ["Big Ben", "The Leaning Tower"] },
    { q: "Which country is famous for baguettes?", a: "France", w: ["Japan", "Egypt"] }
  ];

  // ---------- question makers ----------
  const lead = s => String(s).replace(/^[^A-Za-zÀ-ÿ0-9]+/, "")[0];
  const Q = {
    vocab(bank, mode = "mix") {
      return () => {
        const items = bank.items, cur = pick(items), [fr, en, e] = cur;
        const rest = items.filter(x => x[0] !== fr), exs = pick(rest);
        let m = mode === "mix" ? pick(e ? ["fr2en", "en2fr", "pic"] : ["fr2en", "en2fr"]) : mode;
        if (m === "pic" && !e) m = "fr2en";
        const wrongs = shuf(rest);
        if (m === "fr2en") return {
          text: `What does "${fr}" mean?`, say: fr, lang: L, choices: shuf([en, ...wrongs.slice(0, 2).map(x => x[1])]), answer: en,
          hints: ["Press 🔊 to hear the French word and say it out loud. Does it remind you of an English word?", `The English answer starts with the letter "${lead(en).toUpperCase()}".`, `Example: "${exs[0]}" means "${exs[1]}". Now think about yours.`]
        };
        if (m === "en2fr") return {
          text: `How do you say "${en}" in French?`, choices: shuf([fr, ...wrongs.slice(0, 2).map(x => x[0])]), answer: fr,
          hints: ["Think back to the French words from the lesson. Which one matches the English?", `The French word starts with "${lead(fr)}".`, `Example: "${exs[1]}" in French is "${exs[0]}". Now find yours.`]
        };
        return {
          text: "How do you say this in French?", visual: e, choices: shuf([fr, ...wrongs.slice(0, 2).map(x => x[0])]), answer: fr,
          hints: ["Look at the picture. What is it in English?", `The French word starts with "${lead(fr)}".`, `Example: ${exs[2] || ""} is "${exs[0]}" in French. Now find yours.`]
        };
      };
    },
    typedVocab(bank) {
      return () => {
        const items = bank.items, [fr, en, e] = pick(items), exs = pick(items.filter(x => x[0] !== fr));
        return {
          text: "Type this word in French.", visual: e, textInput: true, answer: fr, say: fr, lang: L,
          hints: ["Think of the English word for the picture. Then remember the French word from the lessons.", `The French word starts with "${fr[0]}" and has ${fr.length} letters.`, `Example: ${exs[2]} is "${exs[0]}" in French. Now do yours. (You don't need to type accents!)`]
        };
      };
    },
    numberFr(min, max) {
      return () => {
        const n = ri(min, max), w = NUM[n], ex = n === 3 ? 2 : 3;
        if (Math.random() < 0.5) return {
          text: `Which number is "${w}"?`, say: w, lang: L, answer: n,
          hints: ["Press 🔊 to hear the number. Count in French from the start: un, deux, trois…", n <= 1 ? "This is the very first number you say when you count!" : `Count in French until you reach "${w}". The numbers just before it are: ${NUM.slice(Math.max(1, n - 3), n).join(", ")}.`, `Example: "${NUM[ex]}" is ${ex}, because un is 1, deux is 2${ex === 3 ? ", and trois is 3" : ""}. Now find yours.`]
        };
        const pool = []; for (let i = min; i <= max; i++) if (i !== n) pool.push(NUM[i]);
        return {
          text: `How do you say ${n} in French?`, choices: shuf([w, ...shuf(pool).slice(0, 2)]), answer: w,
          hints: ["Count in French from the start: un, deux, trois…", `The French word starts with the letter "${w[0]}".`, `Example: 5 in French is "cinq", and 4 is "quatre". Now find yours.`]
        };
      };
    },
    colorOf(list) {
      return () => {
        const c = pick(list), others = COL.filter(x => x.fr !== c.fr), ex = pick(others);
        return {
          text: "What color is this? Pick the French word.", visual: `<span class="swatch" style="background:${c.hex}"></span>`, choices: shuf([c.fr, ...shuf(others).slice(0, 2).map(x => x.fr)]), answer: c.fr,
          hints: ["Look at the color. What is it in English?", `The French word starts with "${c.fr[0]}".`, `Example: "${ex.fr}" means ${ex.en}. Now find the French word for yours.`]
        };
      };
    },
    countFr(max) {
      return () => {
        const n = ri(1, max), e = pick(["🍎", "⭐", "🐱", "🎈"]), ex = n === 3 ? 2 : 3;
        const near = shuf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(i => i !== n && i <= max + 2)).slice(0, 2).map(i => NUM[i]);
        return {
          text: "How many are there? Pick the French number.", visual: e.repeat(n), choices: shuf([NUM[n], ...near]), answer: NUM[n],
          hints: ["Count the pictures first, in English.", "Now find that number in French. Count in French: un, deux, trois…", `Example: ${e.repeat(ex)} is "${NUM[ex]}". Now count yours the same way.`]
        };
      };
    },
    dayNext() {
      return () => {
        const i = ri(0, 6), after = Math.random() < 0.5, d = DAYS[i], ans = DAYS[(i + (after ? 1 : 6)) % 7];
        const wrongs = shuf(DAYS.filter(x => x !== ans && x !== d)).slice(0, 2);
        return {
          text: `Which day comes ${after ? "after" : "before"} ${d}?`, choices: shuf([ans, ...wrongs]), answer: ans,
          hints: ["Think about the order of the days of the week.", `Find "${d}" in the week. ${after ? "The next day" : "The day just earlier"} is your answer.`, "Example: the day after lundi is mardi, and the day before mercredi is mardi."]
        };
      };
    },
    genderArticle() {
      return () => {
        const [w, a, e] = pick(GENDER);
        return {
          text: `Which one goes with "${w}": le or la?`, visual: e, choices: ["le", "la"], answer: a,
          hints: ["Every French noun is either masculine (le) or feminine (la). Le and la both mean \"the\".", "There is no perfect rule, so you learn each word with its le or la. Try saying the words out loud, like a song.", "Example: le garçon (the boy) and la fille (the girl)."]
        };
      };
    },
    elide() {
      return () => {
        const useV = Math.random() < 0.6, [w, e] = useV ? pick(ELIDE) : pick(CONS), ans = useV ? "l'" : (GENDER.find(x => x[0] === w) || [0, "le"])[1];
        return {
          text: `Pick the right word: ___ ${w}`, visual: e, choices: ["le", "la", "l'"], answer: ans,
          hints: ["Look at the first letter of the noun. Is it a vowel (a, e, i, o, u) or a consonant?", "When a noun starts with a vowel, le and la both change to <b>l'</b>. With a consonant, use le or la.", "Example: l'étoile (the star) starts with a vowel, but la lune (the moon) starts with a consonant."]
        };
      };
    },
    unUne() {
      return () => {
        const [w, a, e] = pick(UNUNE);
        return {
          text: `Which one goes with "${w}": un or une?`, visual: e, choices: ["un", "une"], answer: a,
          hints: ["Un and une both mean \"a\" or \"one\". Un goes with le words. Une goes with la words.", "Ask yourself: would you say le or la with this word? Then match: le goes with un, la goes with une.", "Example: le garçon, so un garçon (a boy). La fille, so une fille (a girl)."]
        };
      };
    },
    pluralFr() {
      return () => {
        const [w, e] = pick(PLURALS), ans = w + "s", ex = pick(["livre", "table", "lit"].filter(x => x !== w));
        return {
          text: `One ${w}, two ___ .`, visual: e + " → " + e + e, textInput: true, answer: ans,
          hints: ["Plural means more than one.", "In French, you usually just add <b>-s</b> at the end of the word. You often don't say the s out loud!", `Example: ${ex} → ${ex}s (add an s). Now do yours.`]
        };
      };
    },
    verbForm(key) {
      const v = VERB[key];
      return () => {
        const p = pick(PRON), ans = v.f[p];
        const wrongs = shuf([...new Set(PRON.map(x => v.f[x]))].filter(x => x !== ans)).slice(0, 2);
        const exV = key === "parler" ? VERB.manger : VERB.parler;
        return {
          text: `${label(v, p)}${p === "je" && v.vow ? "" : " "}___ (${v.inf}, ${v.en})`, choices: shuf([ans, ...wrongs]), answer: ans,
          hints: ["French verbs change their ending to match WHO is doing the action.", PRON_RULE[p], `Example: with ${exV.inf} (${exV.en}): je ${exV.f.je}, tu ${exV.f.tu}, nous ${exV.f.nous}. Now find yours.`]
        };
      };
    },
    fillBlank() {
      return () => {
        const [s, a, w] = pick(BLANKS);
        return {
          text: s, choices: shuf([a, ...w]), answer: a,
          hints: ["Read the sentence. Who is doing the action: je, tu, il, elle, nous or ils?", "Match the verb to the person. Tu goes with a verb ending in -s, nous goes with -ons, and ils goes with -ent or a special form.", "Example: \"Je suis content\" means \"I am happy\". Je goes with suis."]
        };
      };
    },
    adjAgree() {
      return () => {
        const [np, right, wrong, en] = pick(ADJ);
        return {
          text: `${np} ___ (${en})`, choices: shuf([right, wrong]), answer: right,
          hints: ["In French, a describing word usually comes <b>after</b> the noun and must match it.", "With le words, use the basic form. With la words, the describing word usually adds an <b>-e</b> at the end.", "Example: le sac noir (the black bag) and la porte noire (the black door)."]
        };
      };
    },
    culture() {
      return () => {
        const it = pick(CULTURE);
        return {
          text: it.q, choices: shuf([it.a, ...it.w]), answer: it.a,
          hints: ["French is spoken in many places around the world, not just in France.", "Think about the French-speaking places you learned: France, Quebec in Canada, Belgium, Switzerland and countries in Africa like Senegal.", "Example: people in France and Quebec speak French. People in Japan speak Japanese."]
        };
      };
    }
  };

  // ---------- teaching slides ----------
  const word = (fr, en, e) => `<span class="word" data-say="${fr}" data-lang="${L}">${e ? e + " " : ""}<b>${fr}</b> = ${en} 🔊</span>`;
  const TEACH = {
    vocab: (bank) => [
      { h: bank.name, v: bank.items.slice(0, 3).map(x => x[2] || "💬").join(" "), t: `French is spoken by hundreds of millions of people around the world. Today you'll learn French words and phrases about <b>${bank.name.toLowerCase()}</b>.` },
      { h: "Learn the words", v: bank.items.map(x => word(x[0], x[1], x[2])).join("<br>"), t: "<b>Tap any word to hear it</b> and say it out loud!" },
      { h: "How to remember", v: "🧠", t: "Say each word out loud. Cover the English and see if you remember. Looking for words that sound like English words helps a lot." }
    ],
    typedVocab: () => [
      { h: "Typing French", v: "⌨️", t: "In this lesson you'll type French words. Look at the picture, remember the French word, and spell it out." },
      { h: "Accents are optional", v: "é è ê à ç ô", t: "French has special letters with accents. When you type here, you can leave the accents off: <b>ecole</b> counts as <b>école</b>." },
      { h: "Listen and spell", v: "🔊", t: "Press the speaker to hear the word. French spelling has silent letters, so remember each word as a whole." }
    ],
    numberFr: (min, max) => [
      { h: "Numbers in French", v: NUM.slice(min, max + 1).map((w, i) => word(w, min + i)).join("<br>"), t: "<b>Tap a number to hear it.</b> Count along out loud!" },
      max > 10
        ? { h: "Patterns", v: "dix + sept = dix-sept", t: "11 to 16 end in <b>-ze</b>. From 17 to 19 you say <b>dix</b> (ten) and then the number: dix-sept, dix-huit, dix-neuf. 20 is <b>vingt</b>." }
        : { h: "Count it out", v: "un · deux · trois · quatre · cinq", t: "Numbers are always in the same order. Count on your fingers in French: un, deux, trois…" },
      { h: "Tip", v: "🖐️", t: "Count things you see around you in French, like your fingers or the steps you take!" }
    ],
    colorOf: (list) => [
      { h: "Colors in French", v: list.map(c => `<span class="swatch small" style="background:${c.hex}"></span>`).join(" "), t: "French has a word for every color you know." },
      { h: "Learn the colors", v: list.map(c => `<span class="word" data-say="${c.fr}" data-lang="${L}"><span class="swatch tiny" style="background:${c.hex}"></span> <b>${c.fr}</b> = ${c.en} 🔊</span>`).join("<br>"), t: "<b>Tap a color word to hear it.</b>" },
      { h: "Tip", v: "🌈", t: "Look around you and name colors in French. Your shirt, the sky, your pencil!" }
    ],
    countFr: () => [
      { h: "Counting things", v: "🍎🍎🍎 = trois", t: "Count the things first. Then say that number in French." },
      { h: "The numbers", v: NUM.slice(1, 11).map((w, i) => word(w, i + 1)).join("<br>"), t: "<b>Tap a number to hear it.</b>" },
      { h: "Tip", v: "🖐️", t: "Point to each thing as you count: un, deux, trois…" }
    ],
    dayNext: () => [
      { h: "Days of the week", v: DAYS.map((d, i) => word(d, B.days.items[i][1])).join("<br>"), t: "<b>Tap a day to hear it.</b> In French, day names start with a small letter." },
      { h: "In order", v: "lundi → mardi → mercredi → jeudi → vendredi → samedi → dimanche", t: "The days always go in this order. After dimanche it starts again with lundi." },
      { h: "Tip", v: "🗓️", t: "Say the days in order, out loud, and then try them backwards!" }
    ],
    genderArticle: () => [
      { h: "Two ways to say \"the\"", v: "le chat &nbsp; la maison", t: "In French every noun is either <b>masculine</b> (use <b>le</b>) or <b>feminine</b> (use <b>la</b>). Both mean \"the\"." },
      { h: "Learn them together", v: "le livre · la table", t: "There is no perfect rule. The best way is to learn each word <b>with its le or la</b>." },
      { h: "Tip", v: "🎵", t: "Say the little word and the noun together, again and again: le chat, la fleur, le livre." }
    ],
    elide: () => [
      { h: "L' before a vowel", v: "l'école · l'arbre", t: "When a noun starts with a vowel (a, e, i, o, u), le and la both become <b>l'</b>. We say l'école (the school), not la école." },
      { h: "Consonants stay", v: "le chat · la maison", t: "When a noun starts with a consonant, you still use le or la." },
      { h: "Tip", v: "👂", t: "Say it out loud: l'avion sounds smooth. 'Le avion' would sound bumpy, so French uses l'." }
    ],
    unUne: () => [
      { h: "Two ways to say \"a\"", v: "un chat &nbsp; une maison", t: "In French, \"a\" or \"one\" is <b>un</b> for le words and <b>une</b> for la words." },
      { h: "Match le and la", v: "le chat → un chat<br>la maison → une maison", t: "If you know le or la, you know un or une too!" },
      { h: "Tip", v: "💡", t: "Learn the word with its little word: un livre, une table." }
    ],
    pluralFr: () => [
      { h: "More than one", v: "chat → chats", t: "To say more than one in French, you usually add <b>-s</b>: chat → chats, maison → maisons." },
      { h: "The silent s", v: "chat · chats", t: "Most of the time the final <b>s</b> is silent. The word sounds the same. You hear the difference in the little word: le chat → les chats." },
      { h: "Tip", v: "💡", t: "Le and la both change to <b>les</b> when there is more than one." }
    ],
    verbForm: (key) => {
      const v = VERB[key];
      return [
        { h: `The verb "${v.inf}" (${v.en})`, v: PRON.map(p => word(label(v, p) + (p === "je" && v.vow ? "" : " ") + v.f[p], `${PRON_EN[p]}`)).join("<br>"), t: "<b>Tap a verb to hear it.</b> The verb changes depending on <b>who</b> is doing it." },
        { h: "Endings", v: "je -e · tu -s · il/elle -e · nous -ons · ils -ent", t: "Many verbs follow this pattern of endings. A few verbs, like <b>être</b> and <b>avoir</b>, are special and you have to learn them." },
        { h: "Tip", v: "🧠", t: "Say all the forms out loud like a song: je, tu, il, elle, nous, ils." }
      ];
    },
    fillBlank: () => [
      { h: "Fill in the verb", v: "Tu ___ un chien.", t: "Read the sentence. The person doing the action tells you which verb form to use." },
      { h: "Match the person", v: "Je suis · Tu es · Il est<br>Tu as · Elle a", t: "<b>Tu</b> goes with <b>es</b> (to be) and <b>as</b> (to have). <b>Il / elle</b> goes with <b>est</b> and <b>a</b>." },
      { h: "Tip", v: "🔍", t: "Find the person word first. Then pick the verb form that goes with it." }
    ],
    adjAgree: () => [
      { h: "Describing words", v: "le chat noir &nbsp; la porte noire", t: "In French, describing words (adjectives) usually come <b>after</b> the noun and <b>match</b> it." },
      { h: "Match the ending", v: "le … · la … + e", t: "With <b>le</b> words, use the basic form. With <b>la</b> words, the describing word usually adds <b>-e</b>." },
      { h: "Tip", v: "💡", t: "Look at the le or la first, then choose the ending that matches." }
    ],
    culture: () => [
      { h: "The French-speaking world", v: "🌍", t: "French is spoken in <b>many countries</b> and places, like France, Quebec in Canada, Belgium, Switzerland and Senegal." },
      { h: "Where is it?", v: "France · Québec · Belgique · Suisse · Sénégal", t: "France, Belgium and Switzerland are in Europe. Quebec is in Canada. Senegal is in Africa." },
      { h: "Fun fact", v: "🥖", t: "France is famous for baguettes, and the Eiffel Tower is in Paris!" }
    ]
  };
  for (const key of Object.keys(Q)) {
    const orig = Q[key];
    Q[key] = (...args) => {
      const f = orig(...args);
      f.teach = () => TEACH[key](...args);
      return f;
    };
  }
  Q.mixed = (...makers) => {
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
  const V = Q.vocab;
  return {
    1: [
      XL("Hello and goodbye", V(B.greet1)), XL("Please and thank you", V(B.greet2)),
      XL("Numbers 1 to 5", Q.numberFr(1, 5)), XL("Numbers 6 to 10", Q.numberFr(6, 10)),
      XL("Colors", Q.colorOf(COL.slice(0, 4))), XL("More colors", Q.colorOf(COL.slice(4, 9))),
      XL("Animals", V(B.animals1)), XL("More animals", V(B.animals2)),
      XL("My family", V(B.family)), XL("Fruit", V(B.fruit)),
      XL("My body", V(B.body)), XL("Count in French", Q.countFr(10)),
      XL("Type the word", Q.typedVocab(TYPE_K)), XL("Hello, friend!", V(B.phrases1)),
      XL("Numbers 1 to 10", Q.numberFr(1, 10)), XL("Picture quiz", V(PIC_ALL, "pic")),
      XL("Say it in French", V(ALL_WORDS, "en2fr")), XL("What does it mean?", V(ALL_WORDS, "fr2en")),
      XL("Mixed practice", Q.mixed(V(B.animals1), V(B.fruit), Q.numberFr(1, 10), Q.colorOf(COL.slice(0, 8)))), XL("Level 1 Challenge", Q.mixed(V(B.greet1), V(B.family), Q.numberFr(1, 10), Q.colorOf(COL.slice(0, 8)), Q.typedVocab(TYPE_K), Q.countFr(10)))
    ],
    2: [
      XL("Numbers 11 to 20", Q.numberFr(11, 20)), XL("Days of the week", V(B.days)),
      XL("Days in order", Q.dayNext()), XL("At school", V(B.school)),
      XL("Around the house", V(B.house)), XL("Food and drinks", V(B.food)),
      XL("Weather", V(B.weather)), XL("Clothes", V(B.clothes)),
      XL("Nature", V(B.nature)), XL("Opposites", V(B.opposites)),
      XL("Feelings", V(B.feelings)), XL("Le or la?", Q.genderArticle()),
      XL("L' before a vowel", Q.elide()), XL("Un or une?", Q.unUne()),
      XL("More than one", Q.pluralFr()), XL("Type it in French", Q.typedVocab(TYPE_2)),
      XL("Useful phrases", V(B.phrases2)), XL("Short sentences", V(B.sent)),
      XL("Mixed practice", Q.mixed(V(B.school), V(B.house), Q.dayNext(), Q.genderArticle())), XL("Level 2 Challenge", Q.mixed(V(B.food), V(B.weather), V(B.clothes), Q.dayNext(), Q.pluralFr(), Q.genderArticle(), Q.unUne(), Q.typedVocab(TYPE_2)))
    ],
    3: [
      XL("I, you, he, she", V(B.pron)), XL("The verb être", Q.verbForm("être")),
      XL("The verb avoir", Q.verbForm("avoir")), XL("I like it", V(B.gusta)),
      XL("Action words", V(B.verbs)), XL("Verbs that end in -er", Q.verbForm("parler")),
      XL("More -er verbs", Q.verbForm("manger")), XL("The verb aimer", Q.verbForm("aimer")),
      XL("The French-speaking world", Q.culture()),
      XL("Verbs that end in -ir", Q.verbForm("finir")), XL("Question words", V(B.qwords)),
      XL("Places", V(B.places)), XL("Getting around", V(B.transport)),
      XL("Jobs", V(B.jobs)), XL("The seasons", V(B.seasons)),
      XL("Matching endings", Q.adjAgree()), XL("Fill in the verb", Q.fillBlank()),
      XL("Longer sentences", V(B.sent2)),
      XL("Mixed practice", Q.mixed(Q.verbForm("être"), Q.verbForm("avoir"), V(B.places), Q.adjAgree())), XL("Level 3 Challenge", Q.mixed(Q.verbForm("parler"), Q.verbForm("finir"), Q.fillBlank(), V(B.jobs), V(B.transport), Q.adjAgree(), Q.culture()))
    ]
  };
})();
