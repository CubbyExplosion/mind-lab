// ext/spanish-19-21.js  Mind Lab Spanish, levels 19-21 (60 lessons)
(() => {
  const SP = (name, items) => ({ name, items });
  const word = (es, en, e) => `<span class="word" data-say="${es}">${e ? e + " " : ""}<b>${es}</b> = ${en} 🔊</span>`;
  const L1 = s => s.replace(/[¿¡]/g, "")[0];
  const S3 = arr => arr.map(([h, v, t]) => ({ h, v, t }));
  const XL = (title, make) => ({ title, make });
  const MIX = ms => {
    const f = () => pick(ms)();
    const step = Math.max(1, Math.floor(ms.length / 4));
    f.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes ideas you already know. Here is a quick reminder of some of them, then the quiz." }]
      .concat(ms.filter((_, i) => i % step === 0).slice(0, 4).map(m => m.teach()[0]));
    return f;
  };

  // ---------- makers ----------
  const V = (bank, tip) => {
    const f = () => {
      const items = bank.items, [es, en, e] = pick(items);
      const rest = items.filter(x => x[0] !== es), exs = pick(rest), w = shuf(rest);
      const m = pick(e ? ["es2en", "en2es", "pic"] : ["es2en", "en2es"]);
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
      { h: "Accents are optional", v: "á é í ó ú ñ", t: "You can leave the accents off: <b>vergüenza</b> and <b>verguenza</b> both count." },
      { h: "Sound it out", v: "🔊", t: "Spanish is spelled the way it sounds. Say the word slowly and write the letters you hear." }
    ];
    return f;
  };
  // rows: [question, answer, [wrong, wrong], optional clue]
  const RW = (rows, h1, h2, h3, slides) => {
    const f = () => {
      const [q, a, w, c] = pick(rows);
      return { text: q, choices: shuf([a, ...w]), answer: a, hints: [h1, c || h2, h3] };
    };
    f.teach = () => S3(slides);
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
  const READ_SLIDES = [["Reading a longer text", "📖", "Read the whole passage once for the big idea. Then read again for the details the question asks about."], ["Use the clue", "🔍", "Each question has a key word in the story. Find that word, then read the words just before and after it."], ["Tip", "💡", "You do not need to know every word. Guess new words from the words around them and from English."]];

  // ---------- LEVEL 19 banks ----------
  const FAM = SP("Relatives and in-laws", [["suegra", "mother-in-law", "👵"], ["suegro", "father-in-law", "👴"], ["cuñado", "brother-in-law", "🧔"], ["yerno", "son-in-law", "🧑"], ["sobrino", "nephew", "👦"], ["nieto", "grandson", "🧒"], ["padrino", "godfather", "🎩"], ["gemelos", "twins", "👯"]]);
  const PERS = SP("Personality", [["terco", "stubborn", "🐂"], ["tímido", "shy", "🙈"], ["amable", "kind", "💛"], ["perezoso", "lazy", "🦥"], ["atrevido", "bold", "🦁"], ["sensato", "sensible", "🧠"], ["travieso", "mischievous", "😜"], ["ingenioso", "clever and witty", "💡"]]);
  const ONLINE = SP("Online life", [["seguidor", "follower", "👥"], ["publicación", "post", "📝"], ["enlace", "link", "🔗"], ["descargar", "to download", "⬇️"], ["subir", "to upload", "⬆️"], ["perfil", "profile", "🪪"], ["bloquear", "to block", "🚫"], ["etiqueta", "tag or label", "🏷️"]]);
  const MONEY = SP("Banks and money", [["cuenta bancaria", "bank account", "🏦"], ["ahorros", "savings", "🐷"], ["préstamo", "loan", "🤝"], ["tarjeta de crédito", "credit card", "💳"], ["cajero automático", "ATM", "🏧"], ["deuda", "debt", "📉"], ["intereses", "interest", "➕"], ["presupuesto", "budget", "🧮"]]);
  const FEEL = SP("Complex feelings", [["alivio", "relief", "😮‍💨"], ["vergüenza", "embarrassment", "😳"], ["celos", "jealousy", "😒"], ["orgullo", "pride", "🦚"], ["culpa", "guilt", "😞"], ["ilusión", "excited hope", "🤩"], ["aburrimiento", "boredom", "🥱"], ["agradecimiento", "gratitude", "🙏"]]);
  const NATEV = SP("Natural events", [["terremoto", "earthquake", "🌍"], ["huracán", "hurricane", "🌀"], ["sequía", "drought", "🏜️"], ["inundación", "flood", "🌊"], ["incendio forestal", "wildfire", "🔥"], ["relámpago", "lightning", "⚡"], ["trueno", "thunder", "🌩️"], ["niebla", "fog", "🌫️"]]);
  const L19B = [].concat(FAM.items, PERS.items, ONLINE.items, MONEY.items, FEEL.items, NATEV.items);

  // ---------- LEVEL 19 lessons ----------
  const slang = RW([
    ["Which country is famous for the slang word <b>pibe</b> (guy or kid)?", "Argentina", ["España", "México"]],
    ["Which country is famous for the slang word <b>chavo</b> (guy or kid)?", "México", ["Argentina", "Chile"]],
    ["Which country is famous for the slang word <b>chaval</b> (guy or kid)?", "España", ["México", "Argentina"]],
    ["In Argentina, money is jokingly called <b>guita</b>. In Mexico, people say <b>___</b> for money.", "lana", ["luna", "lata"]],
    ["In Colombia, a very common word for money is <b>___</b>.", "plata", ["plato", "plaza"]],
    ["In Spain, <b>guay</b> means...", "cool", ["rainy", "far away"]],
    ["In Chile and Perú, <b>bacán</b> means...", "great or cool", ["boring", "hungry"]],
    ["In Colombia and Venezuela, <b>chévere</b> means...", "great or cool", ["tired", "very rich"]],
    ["In Mexico, <b>¡Qué padre!</b> means...", "How cool!", ["How sad!", "How old!"]],
    ["In Cuba, Puerto Rico and the Dominican Republic, a city bus is a <b>___</b>.", "guagua", ["guante", "guapo"]],
    ["In Mexico, a drinking straw is a <b>___</b>.", "popote", ["pozole", "postre"]],
    ["In Argentina, a city bus is often called a <b>___</b>.", "colectivo", ["colegio", "colador"]]
  ], "Slang is different in each country. Which country do you connect with this word?", "Think of the songs, shows or friends you know from each country. Slang words are for friends, not for formal writing.",
    "Example: <b>Guagua</b> is a bus in the Caribbean but a baby in some Andean countries. The same word can change from place to place. Now do yours.",
    [["Same Spanish, different slang", "🌎", "Every country adds its own colorful words (slang). Speakers still understand each other."], ["Examples", "pibe · chavo · chaval", "<b>Pibe</b> (Argentina), <b>chavo</b> (México) and <b>chaval</b> (España) all mean a young guy or kid."], ["Tip", "🎧", "Slang is for talking with friends. In class and in writing, use standard words."]]);

  const foodNames = RW([
    ["In Mexico, <b>elote</b> is corn on the cob. In Perú and Chile it is called <b>___</b>.", "choclo", ["cloro", "chocolate"]],
    ["In Chile, beans are often called <b>___</b>.", "porotos", ["potros", "poros"]],
    ["In the Caribbean, many people say <b>habichuelas</b> for ___ .", "beans", ["peaches", "cherries"]],
    ["In Chile and Argentina, strawberries are often called <b>___</b>.", "frutilla", ["fruta", "frito"]],
    ["In Venezuela, a banana is a <b>cambur</b>. In Spain, people say <b>___</b>.", "plátano", ["pepino", "melón"]],
    ["In Argentina, popcorn is <b>pochoclo</b>. In Spain, people say <b>___</b>.", "palomitas", ["palomas", "palmitas"]],
    ["A Mexican <b>torta</b> is ___ .", "a sandwich", ["a cake", "a soup"]],
    ["A Spanish <b>tortilla española</b> is ___ .", "an omelet with eggs and potato", ["a corn flatbread", "a fruit salad"]],
    ["In Mexico, a <b>tortilla</b> is usually ___ .", "a thin flatbread of corn or wheat", ["an omelet with potato", "a kind of soup"]],
    ["Perú's famous dish <b>ceviche</b> is fish \"cooked\" by ___ .", "lime juice", ["hot oil", "the oven"]],
    ["Argentina is famous for its <b>asado</b>, which is ___ .", "a barbecue", ["a dessert", "a salad"]],
    ["The Mexican <b>mole</b> is ___ .", "a rich sauce with many ingredients", ["a kind of fruit", "a cold drink"]]
  ], "Same food, different name or a different dish. Think about the country in the question.", "Names travel with the people who cook the food, so one word can mean two foods in two countries. Look for the country clue in the question.",
    "Example: <b>Palta</b> is avocado in Chile, but <b>aguacate</b> is avocado in México. Both are the same fruit. Now do yours.",
    [["Same food, different name", "🍽️", "A food can have a different name in each country, and one name can be two different foods!"], ["Watch out", "torta · tortilla", "<b>Torta</b> is a sandwich in México but a cake in other places. <b>Tortilla</b> is an omelet in España but a flatbread in México."], ["Tip", "🗺️", "When you travel, ask what a dish is. People love to explain their food."]]);

  const spotErr = RW([
    ["Which sentence is correct?", "Las manos están frías.", ["Las manos están frío.", "Los manos están frías."]],
    ["Which sentence is correct?", "El problema es difícil.", ["La problema es difícil.", "Los problema es difícil."]],
    ["Which sentence is correct?", "Me duelen los pies.", ["Me duele los pies.", "Me duelen el pie."]],
    ["Which sentence is correct?", "Ayer fuimos al cine.", ["Ayer iremos al cine.", "Ayer vamos al cine."]],
    ["Which sentence is correct?", "Hay muchas personas en la plaza.", ["Hay muchos personas en la plaza.", "Hay muchas persona en la plaza."]],
    ["Which sentence is correct?", "Ella y su amiga están contentas.", ["Ella y su amiga está contentas.", "Ella y su amiga están contento."]],
    ["Which sentence is correct?", "Quiero que vengas mañana.", ["Quiero que vienes mañana.", "Quiero que vendrás mañana."]],
    ["Which sentence is correct?", "Conozco a tu primo.", ["Conozco tu primo.", "Conozco de tu primo."]],
    ["Which sentence is correct?", "Tengo que hacer la tarea.", ["Tengo de hacer la tarea.", "Tengo hacer la tarea."]],
    ["Which sentence is correct?", "No veo a nadie en la calle.", ["No veo a alguien en la calle.", "Veo a nadie en la calle."]]
  ], "Check each sentence part by part: the noun and its describing word, then the verb.", "Look for the slip: a describing word that does not match, a verb with the wrong ending or tense, or a missing little word like <b>a</b> or <b>que</b>.",
    "Example: \"Los libros son interesante\" has a slip, because <b>interesantes</b> must be plural to match <b>libros</b>. Now check yours.",
    [["Be your own editor", "🔍", "Before you finish writing, check: does every describing word match its noun? Is the verb in the right tense or mood?"], ["Common slips", "el problema · conozco a tu primo", "Words ending in <b>-ma</b> are often masculine (<b>el problema</b>). Use the personal <b>a</b> before a person you know."], ["Negatives", "no ... nadie", "After <b>no</b> you need another negative word: <b>no veo a nadie</b>. Also remember <b>tener que</b> + verb."]]);

  const chat = RW([
    ["Ana: ¿Vienes a la fiesta?<br>Leo: Ojalá ___ ir, pero tengo examen. (poder)", "pueda", ["puedo", "podía"]],
    ["Si ___ tiempo esta tarde, te ayudo con la tarea. (tener)", "tengo", ["tuviera", "tendría"]],
    ["Te escribiré cuando ___ a casa. (llegar, yo)", "llegue", ["llego", "llegaba"]],
    ["Me alegra que ___ mejor hoy. (estar, tú)", "estés", ["estás", "estarás"]],
    ["No creo que Pablo ___ razón. (tener)", "tenga", ["tiene", "tenía"]],
    ["¡No me ___ mentiras! (decir, tú; a command)", "digas", ["dices", "dijiste"]],
    ["¿Ya ___ la tarea? (hacer, tú; present perfect)", "has hecho", ["has hacido", "haces hecho"]],
    ["Cuando era pequeño, no ___ miedo de la oscuridad. (tener; a habit in the past)", "tenía", ["tuve", "tengo"]],
    ["Mamá: ¿Por qué no contestaste?<br>Sofía: Lo siento, ___ el teléfono en la mochila. (dejar, yo; one finished action)", "dejé", ["dejaba", "dejo"]],
    ["Quiero que mi hermana me ___ a la estación. (llevar)", "lleve", ["lleva", "llevará"]]
  ], "Messages are short, but the grammar rules are the same. Look for the clue word in the sentence.", "Clue words: <b>ojalá</b>, <b>no creo que</b>, <b>me alegra que</b> and <b>quiero que</b> need the wish form. A future <b>cuando</b> needs it too. A likely <b>si</b> uses the present.",
    "Example: \"No creo que ellos ___ hoy (venir)\" uses <b>vengan</b>, because <b>no creo que</b> brings doubt. Now do yours.",
    [["Grammar in messages", "💬", "Texts are short, but the grammar rules are the same. First find the clue word."], ["Clue words", "ojalá · no creo que · cuando (future)", "These call for the wish form (subjunctive): <b>Ojalá pueda</b>, <b>No creo que tenga</b>, <b>Te escribiré cuando llegue</b>."], ["Real 'if'", "si + present → present", "A likely <b>si</b> uses the present: <b>Si tengo tiempo, te ayudo</b>. Habits in the past use the imperfect: <b>no tenía miedo</b>."]]);

  const twoMean = RW([
    ["\"Voy al <b>banco</b> a sacar dinero.\" Here, banco means...", "bank", ["bench", "bed"]],
    ["\"Me siento en el <b>banco</b> del parque.\" Here, banco means...", "bench", ["bank", "desk"]],
    ["\"Escribo en una <b>hoja</b> de papel.\" Here, hoja means...", "sheet", ["leaf", "knife"]],
    ["\"En otoño, cada <b>hoja</b> del árbol cae.\" Here, hoja means...", "leaf", ["sheet", "branch"]],
    ["\"Abre la <b>llave</b> del agua.\" Here, llave means...", "faucet", ["key", "lock"]],
    ["\"Perdí la <b>llave</b> de mi casa.\" Here, llave means...", "key", ["faucet", "door"]],
    ["\"Enciende una <b>vela</b> en la mesa.\" Here, vela means...", "candle", ["sail", "lamp"]],
    ["\"El barco tiene una <b>vela</b> blanca.\" Here, vela means...", "sail", ["candle", "anchor"]],
    ["\"Mi perro mueve la <b>cola</b>.\" Here, cola means...", "tail", ["line", "glue"]],
    ["\"Hay una <b>cola</b> larga en el cine.\" Here, cola means...", "line (queue)", ["tail", "ticket"]],
    ["\"Vivo en la tercera <b>planta</b> del edificio.\" Here, planta means...", "floor", ["plant", "roof"]],
    ["\"Riego la <b>planta</b> del balcón.\" Here, planta means...", "plant", ["floor", "pot"]],
    ["\"Los niños vuelan una <b>cometa</b>.\" Here, cometa means...", "kite", ["comet", "bird"]],
    ["\"El <b>cometa</b> pasa cerca de la Tierra.\" Here, cometa means...", "comet", ["kite", "planet"]],
    ["\"La <b>capital</b> de Chile es Santiago.\" Here, capital means...", "capital city", ["money to start a business", "a capital letter"]],
    ["\"La empresa necesita más <b>capital</b> para crecer.\" Here, capital means...", "money (funds)", ["capital city", "leader"]],
    ["\"Subimos la <b>sierra</b> en bicicleta.\" Here, sierra means...", "mountain range", ["saw", "river"]],
    ["\"El carpintero corta la madera con una <b>sierra</b>.\" Here, sierra means...", "saw", ["mountain range", "hammer"]]
  ], "The other words in the sentence tell you which meaning the word has.", "Ask: what is happening in the sentence? Money, a park, a tree, a boat, a kitchen, a building? Pick the meaning that fits that scene.",
    "Example: \"Pongo mi libro en la <b>mesa</b>\" and \"La <b>mesa</b> del consejo decide\" both use mesa, but one is furniture and one is a group. Now do yours.",
    [["One word, two meanings", "📚", "Many Spanish words have more than one meaning. The sentence around the word tells you which one."], ["Examples", "banco · hoja · llave", "<b>Banco</b>: bank or bench. <b>Hoja</b>: leaf or sheet. <b>Llave</b>: key or faucet."], ["The article can change the meaning", "el cometa / la cometa", "<b>El cometa</b> (comet), <b>la cometa</b> (kite). <b>El capital</b> (money), <b>la capital</b> (city)."]]);

  const idioms19 = TR([
    ["Costar un ojo de la cara", "to cost a fortune"], ["Ser pan comido", "to be very easy"], ["Tener la mosca detrás de la oreja", "to be suspicious"],
    ["Meterse en camisa de once varas", "to take on more than you can handle"], ["Ser un cero a la izquierda", "to be useless"], ["Buscar una aguja en un pajar", "to look for a needle in a haystack"],
    ["Pedir peras al olmo", "to ask for the impossible"], ["Llevarse como el perro y el gato", "to not get along at all"], ["Estar con el agua al cuello", "to be in serious trouble"], ["Echar leña al fuego", "to add fuel to the fire"]
  ], [["Sayings with a twist", "💬", "Spanish sayings paint funny pictures. <b>Costar un ojo de la cara</b> is not about eyes: it means it costs a fortune."], ["Examples", "ser pan comido<br>pedir peras al olmo", "<b>Ser pan comido</b> (be eaten bread) = very easy. <b>Pedir peras al olmo</b> (ask pears from an elm) = ask for the impossible, because elms do not grow pears."], ["Learn the meaning", "🧠", "Learn each saying as one whole piece. Do not translate it word by word."]],
    "These sayings are not literal. Think about the whole meaning, not each word.");

  const festivals = RW([
    ["La Tomatina, a giant tomato fight, takes place in a town in which country?", "España", ["México", "Chile"]],
    ["Día de los Muertos, when families remember loved ones with flowers and photos, is a famous tradition in ___ .", "México", ["Argentina", "Chile"]],
    ["Inti Raymi, the Festival of the Sun, is celebrated in Cusco, in ___ .", "Perú", ["España", "Costa Rica"]],
    ["Las Fallas in Valencia are famous for ___ .", "giant artistic figures", ["bicycle races", "snow sculptures"]],
    ["The Carnaval de Barranquilla, with music, dance and costumes, is a huge party in ___ .", "Colombia", ["Uruguay", "Honduras"]],
    ["Fiestas Patrias in Chile include dancing the national dance, the ___ .", "cueca", ["tango", "salsa"]],
    ["On January 6, <b>Día de Reyes</b>, children in many Spanish-speaking countries receive ___ .", "gifts", ["homework", "fireworks"]],
    ["A <b>quinceañera</b> celebrates a girl's ___ birthday.", "15th", ["10th", "18th"]],
    ["The <b>Feria de Abril</b> is a spring fair with flamenco dresses and music in the Spanish city of ___ .", "Sevilla", ["Lima", "Bogotá"]]
  ], "Think about the country or city that goes with each special day.", "Match the clue (tomatoes, the Sun, flowers and photos, giant figures, a national dance) with the place where you have learned that tradition happens.",
    "Example: The <b>Posadas</b> are Christmas-time parties with songs in México. Each festival belongs to a place. Now do yours.",
    [["Festivals of the Spanish world", "🎉", "Every country celebrates special days with its own food, music and costumes."], ["Examples", "La Tomatina · Día de los Muertos · Inti Raymi", "<b>La Tomatina</b> (España), <b>Día de los Muertos</b> (México) and <b>Inti Raymi</b> (Perú) are three famous celebrations."], ["Tip", "🌍", "Festivals tell you what people value: family, nature, music and community."]]);

  const photo = TR([
    ["al fondo", "in the background"], ["en primer plano", "in the foreground"], ["a la izquierda", "on the left"], ["a la derecha", "on the right"], ["a lo lejos", "in the distance"],
    ["en el centro", "in the center"], ["Parece que", "It seems that"], ["Se ve", "You can see"], ["Me da la impresión de que", "I get the impression that"], ["La foto muestra", "The photo shows"]
  ], [["Describing a photo", "📷", "To describe a picture, say where things are, then what they look like, then what you think is happening."], ["Place phrases", "al fondo · a lo lejos · en primer plano", "<b>En primer plano</b> = in front. <b>Al fondo</b> = in the back. <b>A lo lejos</b> = far away. <b>A la izquierda</b> and <b>a la derecha</b> = left and right."], ["Opinion phrases", "Parece que · Me da la impresión de que", "Use <b>parece que</b> or <b>me da la impresión de que</b> when you are guessing what is happening."]]);

  const review = TR([
    ["Lo recomiendo", "I recommend it"], ["No vale la pena", "It is not worth it"], ["Lo mejor fue", "The best part was"], ["Me decepcionó", "It disappointed me"], ["En general", "Overall"],
    ["Por un lado… por otro lado", "On one hand… on the other hand"], ["Sin embargo", "However"], ["Me sorprendió", "It surprised me"], ["Tiene buena relación calidad-precio", "It is good value for the money"]
  ], [["Writing a review", "⭐", "A good review says what you liked, what you did not like, and whether you recommend it."], ["Useful phrases", "Lo mejor fue · Me decepcionó", "<b>Lo mejor fue</b> = the best part was. <b>Me decepcionó</b> = it disappointed me. <b>Sin embargo</b> = however."], ["Finish strongly", "Lo recomiendo", "End with your advice: <b>Lo recomiendo</b> (I recommend it) or <b>No vale la pena</b> (it is not worth it)."]]);

  const read19a = RD([
    { t: "Mi tío Raúl es muy terco. Cuando decide algo, nadie puede cambiar su opinión. Ayer quería arreglar el grifo sin llamar al plomero. Después de dos horas, el agua salía por todas partes y la cocina estaba mojada. Finalmente, mi tía llamó al plomero. Mi tío se puso colorado, pero se rio con nosotros.",
      qs: [["How would you describe Raúl?", "stubborn", ["shy", "lazy"], "Find terco."], ["What did Raúl want to fix?", "a faucet", ["a car", "a window"], "Find el grifo."], ["Who called the plumber?", "the narrator's aunt", ["Raúl", "the narrator"], "Find mi tía llamó."], ["What happened to Raúl at the end?", "He blushed and laughed", ["He cried", "He fell asleep"], "Find se puso colorado."]] },
    { t: "Lucía tiene doscientos seguidores en su red social. Esta semana publicó una foto de su perro Canela con un sombrero. Muchos amigos le dieron un me gusta y escribieron comentarios simpáticos. Pero Lucía recuerda una regla de su familia: nunca publica su dirección ni el nombre de su escuela. «Compartir es divertido, pero la privacidad es importante», dice.",
      qs: [["How many followers does Lucía have?", "two hundred", ["twenty", "two thousand"], "Find doscientos."], ["What did she post?", "a photo of her dog in a hat", ["a video of a trip", "a drawing of a house"], "Find publicó una foto."], ["What does she never post?", "her address or school name", ["her pets", "her favorite songs"], "Find nunca publica."], ["What does Lucía say is important?", "privacy", ["followers", "speed"], "Find la privacidad."]] },
    { t: "Diego recibe una mesada de veinte dólares al mes. Quiere comprar una bicicleta nueva que cuesta ciento sesenta dólares. Hizo un presupuesto: gasta cinco dólares en meriendas y ahorra quince. Su hermana le dijo que con ese plan necesitará más de diez meses. Diego decidió ayudar a sus vecinos a cortar el césped para ganar más.",
      qs: [["How much does the bicycle cost?", "160 dollars", ["60 dollars", "20 dollars"], "Find ciento sesenta."], ["How much does Diego save each month?", "15 dollars", ["5 dollars", "20 dollars"], "Find ahorra."], ["How long will his plan take?", "more than ten months", ["two months", "exactly five months"], "Find más de diez meses."], ["How will he earn extra money?", "by cutting his neighbors' grass", ["by selling snacks", "by walking dogs"], "Find cortar el césped."]] }
  ], READ_SLIDES);

  const read19b = RD([
    { t: "En México, el primero y el dos de noviembre, muchas familias recuerdan a sus seres queridos. Preparan un altar con fotos, flores amarillas, velas y la comida favorita de la persona. Para Camila, es un día alegre, no triste. Su abuela cuenta historias del bisabuelo de Camila, y toda la familia escucha, ríe y recuerda.",
      qs: [["Which days do families remember loved ones?", "November 1 and 2", ["January 1 and 2", "July 1 and 2"], "Find el primero y el dos de noviembre."], ["What is on the altar?", "photos, yellow flowers and candles", ["toys and balloons", "books and maps"], "Find Preparan un altar."], ["How does Camila feel about the day?", "It is a joyful day", ["It is a scary day", "It is a boring day"], "Find alegre."], ["What does Camila's grandmother tell?", "stories about Camila's great-grandfather", ["jokes about school", "the news"], "Find historias."]] },
    { t: "En Chile, los temblores son comunes. En la escuela de Martín hacen un simulacro cada mes. Los estudiantes se protegen debajo de sus mesas y después caminan en fila hacia el patio. El maestro dice: «La calma es la mejor herramienta». Martín aprendió que no debe usar el ascensor durante un temblor.",
      qs: [["How often is there a drill?", "every month", ["every day", "once a year"], "Find cada mes."], ["Where do students protect themselves?", "under their tables", ["in the hallway", "on the roof"], "Find debajo de sus mesas."], ["What is the best tool, according to the teacher?", "calm", ["speed", "a flashlight"], "Find La calma."], ["What should Martín not use during a tremor?", "the elevator", ["the stairs", "his shoes"], "Find el ascensor."]] },
    { t: "Elena es de Madrid y su amigo Tomás es de Buenos Aires. Cuando hablan, a veces se divierten con las diferencias. Elena dice «chaval» y Tomás dice «pibe». Ella dice «vale» y él dice «dale». Los dos se entienden sin problema. «Es como tener dos sabores del mismo helado», dice Tomás.",
      qs: [["Where is Tomás from?", "Buenos Aires", ["Madrid", "Lima"], "Find Tomás es de."], ["What do Elena and Tomás find funny?", "the differences in their words", ["their homework", "the weather"], "Find se divierten."], ["Do they understand each other?", "Yes, without a problem", ["No, never", "Only with help"], "Find sin problema."], ["Tomás compares their Spanish to...", "two flavors of the same ice cream", ["two kinds of cars", "two different books"], "Find dos sabores."]] }
  ], READ_SLIDES);

  const t19 = TYE(L19B, "family, personality, online life, money, feelings and natural events");

  const L19 = [
    XL("Relatives and in-laws", V(FAM)), XL("Personality", V(PERS)), XL("Online life", V(ONLINE)), XL("Banks and money", V(MONEY)),
    XL("Complex feelings", V(FEEL)), XL("Natural events", V(NATEV)), XL("Slang around the world", slang), XL("Food names by country", foodNames),
    XL("Be your own editor", spotErr), XL("Grammar in messages", chat), XL("One word, two meanings", twoMean), XL("Sayings with a twist", idioms19),
    XL("Festivals of the Spanish world", festivals), XL("Describing a photo", photo), XL("Writing a review", review), XL("Reading: tempers and teens", read19a),
    XL("Reading: traditions and talk", read19b), XL("Type it in Spanish", t19),
    XL("Mixed practice", MIX([V(FAM), V(PERS), V(FEEL), slang, foodNames, spotErr, chat, twoMean])),
    XL("Level 19 Challenge", MIX([V(FAM), V(PERS), V(ONLINE), V(MONEY), V(FEEL), V(NATEV), slang, foodNames, spotErr, chat, twoMean, idioms19, festivals, photo, review, read19a, read19b]))
  ];

  // ---------- LEVEL 20 banks ----------
  const LAW = SP("Law and justice", [["juez", "judge", "⚖️"], ["abogado", "lawyer", "👔"], ["tribunal", "court", "🏛️"], ["ley", "law", "📜"], ["testigo", "witness", "👁️"], ["jurado", "jury", "👥"], ["sentencia", "ruling", "📄"], ["derechos", "rights", "✊"]]);
  const ECON = SP("Economy and trade", [["empresa", "company", "🏢"], ["mercado", "market", "🛒"], ["exportar", "to export", "🚢"], ["importar", "to import", "📦"], ["impuesto", "tax", "🧾"], ["inversión", "investment", "📈"], ["demanda", "demand", "🙋"], ["producción", "production", "🏭"]]);
  const FILM = SP("Movies", [["guion", "script", "📝"], ["director", "director", "🎬"], ["escena", "scene", "🎞️"], ["rodaje", "filming", "🎥"], ["estreno", "premiere", "🌟"], ["subtítulos", "subtitles", "💬"], ["efectos especiales", "special effects", "✨"], ["taquilla", "box office", "🎟️"]]);
  const IDEAS = SP("Ideas and arguments", [["ventaja", "advantage", "➕"], ["desventaja", "disadvantage", "➖"], ["consecuencia", "consequence", "➡️"], ["solución", "solution", "✅"], ["propósito", "purpose", "🎯"], ["desafío", "challenge", "🧗"], ["riesgo", "risk", "⚠️"], ["resultado", "result", "📊"]]);
  const HABIT = SP("Habits and goals", [["hábito", "habit", "🔁"], ["meta", "goal", "🥅"], ["disciplina", "discipline", "🕰️"], ["esfuerzo", "effort", "💪"], ["descanso", "rest", "😴"], ["estrés", "stress", "😰"], ["motivación", "motivation", "🔥"], ["constancia", "persistence", "🐢"]]);
  const PLACES = SP("Describing places", [["antiguo", "ancient or old", "🏺"], ["moderno", "modern", "🏙️"], ["ruidoso", "noisy", "📢"], ["tranquilo", "peaceful", "🕊️"], ["abarrotado", "crowded", "👥"], ["lujoso", "luxurious", "💎"], ["acogedor", "cozy", "🛋️"], ["espacioso", "spacious", "🏟️"]]);
  const L20B = [].concat(LAW.items, ECON.items, FILM.items, IDEAS.items, HABIT.items, PLACES.items);

  // ---------- LEVEL 20 lessons ----------
  const youForms = RW([
    ["In most of Latin America, a group of friends is addressed as ___ .", "ustedes", ["vosotros", "vos"]],
    ["In Spain, friends talking to a group say ___ .", "vosotros", ["ustedes", "vos"]],
    ["In Argentina and Uruguay, many people say ___ instead of <b>tú</b>.", "vos", ["usted", "ustedes"]],
    ["Which pronoun is the polite \"you\" for one person?", "usted", ["vos", "vosotros"]],
    ["Vosotros ___ en la clase de arte. (estar)", "estáis", ["están", "estamos"]],
    ["Vosotros ___ pizza los viernes. (comer)", "coméis", ["comen", "comemos"]],
    ["Ustedes ___ muy simpáticos. (ser)", "son", ["sois", "somos"]],
    ["Vosotras ___ muy altas. (ser)", "sois", ["son", "somos"]],
    ["In Argentina, <b>Vos hablás</b> means ___ .", "you speak", ["I speak", "they speak"]],
    ["¿ ___ quiere un café, señora Pérez? (the polite word)", "Usted", ["Tú", "Vos"]],
    ["In the vos form, \"you are\" is <b>vos ___</b>.", "sos", ["eres", "sois"]]
  ], "Think: who is speaking to whom, and where? Friend or older person? One person or a group? Spain or Latin America?", "Tú and vos are informal for one person. Usted is polite for one person. Ustedes is for a group everywhere. Vosotros is informal for a group in Spain only.",
    "Example: In Spain, to a group of friends, \"you eat\" is <b>coméis</b>; in Mexico it is <b>comen</b> (ustedes). Now do yours.",
    [["Five ways to say you", "tú · vos · usted · vosotros · ustedes", "<b>Tú</b> and <b>vos</b>: one friend. <b>Usted</b>: one person, politely. <b>Vosotros</b>: a group of friends in Spain. <b>Ustedes</b>: a group in Latin America (and polite in Spain)."], ["The vosotros endings", "habláis · coméis · vivís · sois · estáis", "<b>Vosotros</b> verbs end in <b>-áis</b>, <b>-éis</b>, <b>-ís</b>. Special ones: <b>sois</b> (ser), <b>estáis</b> (estar)."], ["Vos in Argentina", "vos hablás · vos tenés · vos sos", "In Argentina and nearby countries, <b>vos</b> has its own verb forms: <b>hablás</b>, <b>tenés</b>, <b>sos</b>. Everyone still understands <b>tú</b>."]]);

  const usa = RW([
    ["The state name <b>Nevada</b> comes from Spanish and means ___ .", "snowy (snow-covered)", ["sandy", "very hot"]],
    ["<b>Colorado</b> means ___ in Spanish.", "colored (reddish)", ["very cold", "river"]],
    ["<b>Florida</b> means ___ in Spanish.", "flowery", ["floating", "fruity"]],
    ["<b>Los Ángeles</b> means ___ in Spanish.", "the angels", ["the lions", "the stars"]],
    ["The words <b>San</b> and <b>Santa</b> in <b>San Francisco</b> and <b>Santa Fe</b> mean ___ .", "saint", ["sand", "summer"]],
    ["<b>Montana</b> comes from the Spanish word for ___ .", "mountain", ["money", "river"]],
    ["<b>Sierra Nevada</b> means \"snowy ___ \".", "mountain range", ["river", "desert"]],
    ["<b>Rio Grande</b> means ___ in Spanish.", "big river", ["red river", "long road"]],
    ["<b>Santa Cruz</b> means \"holy ___ \".", "cross", ["rock", "sun"]],
    ["English borrowed <b>canyon</b>, <b>patio</b> and <b>rodeo</b> from ___ .", "Spanish", ["Italian", "Arabic"]]
  ], "Break the place name into Spanish words you know: San, Santa, Los, Las, Río, Sierra...", "Many places in the United States were named by Spanish explorers, so their names are Spanish words describing the land.",
    "Example: <b>Sacramento</b> is Spanish for \"the sacrament\" and <b>Las Cruces</b> means \"the crosses\". Names describe things. Now do yours.",
    [["Spanish in the USA", "🗺️", "Millions of people speak Spanish in the United States, and many places have Spanish names from explorers and settlers."], ["Name meanings", "Nevada · Colorado · Florida", "<b>Nevada</b> = snowy. <b>Colorado</b> = colored red. <b>Florida</b> = flowery. <b>Los Ángeles</b> = the angels."], ["Spanish words in English", "canyon · patio · rodeo · mosquito", "English also borrowed everyday words from Spanish: <b>canyon</b>, <b>patio</b>, <b>rodeo</b>, <b>mosquito</b>."]]);

  const become = RW([
    ["De repente, el cielo ___ oscuro. (a change in condition)", "se puso", ["se hizo", "se convirtió"]],
    ["Ella ___ médica después de estudiar mucho. (by her own effort)", "se hizo", ["se puso", "se volvió"]],
    ["La oruga ___ en mariposa. (a full change into something else)", "se convirtió", ["se puso", "se hizo"]],
    ["Mi primo quiere ___ piloto algún día. (to become, by work)", "hacerse", ["ponerse", "volverse"]],
    ["Ella ___ nerviosa antes del examen. (a temporary mood)", "se pone", ["se hace", "se convierte"]],
    ["El agua ___ hielo a cero grados. (a full change of form)", "se convierte en", ["se pone", "se hace"]],
    ["Con el éxito, el cantante ___ famoso. (by his own work)", "se hizo", ["se puso", "se convirtió"]],
    ["Si no comes bien, ___ enfermo. (a change in condition)", "te pones", ["te haces", "te conviertes"]],
    ["Mi hermano ___ rojo de vergüenza. (a body reaction)", "se puso", ["se hizo", "se convirtió"]]
  ], "There are several ways to say \"become\". Ask: is it a mood, an effort, or a complete change?", "Ponerse: moods, colors and conditions that can change back. Hacerse: becoming something by effort. Convertirse en: a complete change into something else.",
    "Example: \"El niño ___ triste\" uses <b>se puso</b> (a mood), while \"El niño ___ ingeniero\" uses <b>se hizo</b> (by effort). Now do yours.",
    [["Many ways to become", "ponerse · hacerse · convertirse · volverse", "English has one word, <b>become</b>. Spanish has several, and each shows how the change happens."], ["Ponerse and hacerse", "se puso rojo · se hizo médico", "<b>Ponerse</b> + feeling or condition: <b>se puso triste</b>. <b>Hacerse</b> + job or goal: <b>se hizo médica</b>."], ["Convertirse and volverse", "se convirtió en mariposa · se volvió loco", "<b>Convertirse en</b> + noun: a complete change. <b>Volverse</b>: a sudden or lasting change, often in character."]]);

  const cuyo = RW([
    ["El escritor ___ libro leímos ganó un premio. (whose)", "cuyo", ["cuya", "quien"]],
    ["La niña ___ madre es doctora es mi amiga. (whose)", "cuya", ["cuyo", "cuyas"]],
    ["Los niños ___ padres viajan mucho hablan tres idiomas. (whose)", "cuyos", ["cuyo", "cuya"]],
    ["No entiendo ___ dices. (what)", "lo que", ["quien", "cual"]],
    ["Llegó tarde, ___ me molestó. (which, referring to the whole idea)", "lo cual", ["el cual", "la cual"]],
    ["Esa es la persona con ___ trabajo. (who)", "quien", ["lo que", "cuyo"]],
    ["Todo ___ necesitas está en la caja. (everything that)", "lo que", ["cuyo", "quien"]],
    ["Es un museo en ___ hay arte de todo el mundo. (the museum)", "el que", ["lo que", "quien"]],
    ["Mi amigo, ___ hermana vive en Quito, viaja mucho. (whose)", "cuya", ["cuyo", "quien"]],
    ["Ayudó a todos, ___ es muy generoso. (which, referring to the whole idea)", "lo cual", ["cuyo", "quien"]]
  ], "Ask: what is the word pointing to? A whole idea, a person, a thing, or something that belongs to someone?", "Cuyo/cuya/cuyos/cuyas = whose, and it matches the thing owned. Lo que and lo cual point to a whole idea. Quien points to a person.",
    "Example: \"El pintor ___ cuadros vi es chileno\" uses <b>cuyos</b>, because <b>cuadros</b> is plural. Now do yours.",
    [["Who, which and whose", "cuyo · lo que · lo cual", "These little words join two parts of a sentence. Each one points back to something."], ["Cuyo = whose", "la niña cuya madre", "<b>Cuyo</b> agrees with the thing owned, not the owner: <b>la niña cuya madre</b>, <b>los niños cuyos padres</b>."], ["Lo que and lo cual", "no entiendo lo que dices", "<b>Lo que</b> = what / the thing that. <b>Lo cual</b> = which, about a whole idea: <b>Llegó tarde, lo cual me molestó</b>."]]);

  const prepInf = RW([
    ["___ comer, me lavo las manos. (before)", "Antes de", ["Después de", "Sin"]],
    ["___ terminar la tarea, juego un rato. (after)", "Después de", ["Antes de", "Para"]],
    ["Salió ___ decir adiós. (without)", "sin", ["para", "al"]],
    ["Estudio ___ aprender más. (in order to)", "para", ["sin", "al"]],
    ["___ llegar a casa, vi una carta en la mesa. (upon)", "Al", ["Por", "Hasta"]],
    ["Prefiero caminar ___ tomar el autobús. (instead of)", "en vez de", ["antes de", "después de"]],
    ["Se fue ___ hablar con nadie. (without)", "sin", ["al", "para"]],
    ["Lee un poco ___ dormir. (before)", "antes de", ["en vez de", "al"]],
    ["___ ver la película, escribí mi opinión. (after)", "Después de", ["Sin", "Para"]],
    ["Se cansó ___ correr tanto. (from)", "de", ["en", "a"]]
  ], "After a little word like antes de or sin, Spanish uses the plain verb (the infinitive), not an -ing word.", "Antes de = before. Después de = after. Sin = without. Para = in order to. Al + verb = upon doing it. En vez de = instead of.",
    "Example: \"___ cenar, vimos la tele (after)\" uses <b>Después de</b>. Look at the meaning in brackets. Now do yours.",
    [["Little words + verbs", "antes de · después de · sin · para", "In English you say \"before eating\". In Spanish you use the infinitive: <b>antes de comer</b>."], ["Al + verb", "al llegar · al salir", "<b>Al</b> + infinitive means \"upon doing\" or \"when doing\": <b>Al llegar, vi una carta</b>."], ["Also remember", "en vez de · sin · para", "<b>En vez de</b> = instead of. <b>Sin</b> = without. <b>Para</b> = in order to. They all go with the infinitive."]]);

  const colorSay = TR([
    ["Estar en el séptimo cielo", "to be on cloud nine"], ["Ser la oveja negra", "to be the black sheep"], ["Ver todo de color de rosa", "to see everything through rose-colored glasses"],
    ["Ponerse verde de envidia", "to turn green with envy"], ["Más vale pájaro en mano que ciento volando", "a bird in the hand is worth two in the bush"], ["Una golondrina no hace verano", "one swallow does not make a summer"],
    ["Tener sangre azul", "to be of noble blood"], ["Estar sin blanca", "to be broke"], ["Dar luz verde", "to give the green light"]
  ], [["Colors and numbers in sayings", "🌈", "Colors and numbers appear in many Spanish sayings, and they often match English ones."], ["Examples", "estar en el séptimo cielo<br>ser la oveja negra", "<b>Estar en el séptimo cielo</b> = to be extremely happy. <b>Ser la oveja negra</b> = to be the one who is different in a family or group."], ["Look for the picture", "🧠", "Picture the saying, then ask what it means for a person. Do not translate word by word."]],
    "These sayings are not literal. Think about the whole meaning, not each word.");

  const sports = RW([
    ["Which Spanish-speaking country hosted and won the very first men's World Cup, in 1930?", "Uruguay", ["Argentina", "Chile"]],
    ["Baseball is hugely popular in the Caribbean, for example in ___ .", "the Dominican Republic", ["Bolivia", "Paraguay"]],
    ["The Vuelta a España is a famous ___ race.", "bicycle", ["horse", "swimming"]],
    ["<b>Pelota vasca</b> (a ball game played against a wall) comes from the ___ Country in Spain.", "Basque", ["Mexican", "Andean"]],
    ["<b>Charrería</b>, a tradition with horses and skilled riders, is Mexico's ___ sport.", "national", ["winter", "water"]],
    ["The Estadio Azteca, which hosted World Cup finals in 1970 and 1986, is in ___ .", "Mexico City", ["Madrid", "Lima"]],
    ["The Copa América is a soccer tournament mainly for national teams from ___ .", "South America", ["Europe", "Asia"]],
    ["Which Spanish-speaking country won the men's World Cup in 2010?", "España", ["Chile", "Perú"]]
  ], "Think about which country or region is famous for that sport or place.", "Match the clue (bicycles, baseball, a wall and a ball, horses, a stadium) with the place you have learned goes with it.",
    "Example: <b>Fútbol</b> is the most popular sport in almost every Spanish-speaking country. Now match yours to its place.",
    [["Sports in the Spanish world", "⚽", "Soccer (<b>fútbol</b>) is loved almost everywhere, but each place has its own special sports."], ["Examples", "béisbol · pelota vasca · charrería", "<b>Béisbol</b> in the Caribbean, <b>pelota vasca</b> in the Basque Country, and <b>charrería</b> in México."], ["Big events", "Copa América · Vuelta a España", "The <b>Copa América</b> is for South American teams. The <b>Vuelta a España</b> is a bicycle race around Spain."]]);

  const speech = TR([
    ["Buenos días a todos", "Good morning, everyone"], ["Quisiera agradecerles", "I would like to thank you"], ["En primer lugar", "First of all"], ["Es por eso que", "That is why"],
    ["Les invito a pensar", "I invite you to think"], ["Para terminar", "To finish"], ["Muchas gracias por su atención", "Thank you for your attention"], ["Como todos sabemos", "As we all know"],
    ["Permítanme explicar", "Allow me to explain"], ["Imaginen que", "Imagine that"]
  ], [["Giving a speech", "🎤", "A good speech has an opening, a middle with your main ideas, and a strong ending."], ["Open and connect", "Buenos días a todos · En primer lugar · Es por eso que", "Greet the audience, say <b>en primer lugar</b> for your first point, and use <b>es por eso que</b> to link ideas."], ["Close well", "Para terminar · Muchas gracias por su atención", "End with <b>Para terminar</b> and thank people: <b>Muchas gracias por su atención</b>."]]);

  const instr = TR([
    ["Primero", "First"], ["Después", "Then"], ["Por último", "Finally"], ["Asegúrate de", "Make sure to"], ["Ten cuidado", "Be careful"],
    ["Añade", "Add"], ["Déjalo reposar", "Let it rest"], ["Mezcla bien", "Mix well"], ["Sigue estos pasos", "Follow these steps"], ["Necesitas", "You need"]
  ], [["Writing instructions", "📋", "Instructions are clear and short. Use order words and friendly commands."], ["Order words", "primero · después · por último", "<b>Primero</b>, <b>después</b> and <b>por último</b> put the steps in order."], ["Friendly commands", "añade · mezcla · asegúrate de", "Use the <b>tú</b> command: <b>añade</b> (add), <b>mezcla</b> (mix), <b>asegúrate de</b> (make sure to)."]]);

  const read20a = RD([
    { t: "En la clase de ciudadanía, la maestra organizó un juicio imaginario. Marcos fue el juez, Sofía fue la abogada y otros estudiantes fueron testigos y jurado. El caso era sobre un gato que se llevó un sándwich de la cafetería. Todos se rieron, pero aprendieron que cada persona tiene derecho a ser escuchada.",
      qs: [["Who was the judge?", "Marcos", ["Sofía", "the teacher"], "Find fue el juez."], ["Who was the lawyer?", "Sofía", ["Marcos", "the cat"], "Find la abogada."], ["What was the case about?", "a cat that took a sandwich", ["a missing book", "a broken window"], "Find un gato."], ["What did the students learn?", "everyone has the right to be heard", ["cats are clever", "judges are always right"], "Find derecho a ser escuchada."]] },
    { t: "La familia de Valeria tiene una pequeña panadería. Compran harina de otra región y venden pan en el mercado del barrio. El año pasado el precio de la harina subió, y tuvieron que pensar en una solución. Decidieron hacer menos tipos de pan, pero de mejor calidad. Valeria piensa que un desafío puede ser también una oportunidad.",
      qs: [["What does Valeria's family have?", "a small bakery", ["a flower shop", "a bank"], "Find una pequeña panadería."], ["What went up in price?", "flour", ["milk", "rent"], "Find el precio de la harina."], ["What was their solution?", "fewer kinds of bread, better quality", ["more kinds of bread", "closing the shop"], "Find menos tipos de pan."], ["What does Valeria think a challenge can be?", "an opportunity", ["a mistake", "a secret"], "Find una oportunidad."]] },
    { t: "El sábado se estrenó una película de aventuras en el cine del centro. La directora trabajó tres años en el guion. En el rodaje usaron paisajes de Costa Rica, y los efectos especiales son impresionantes. La película tiene subtítulos en inglés. Bruno y sus amigos hicieron fila para ver la primera función, y a todos les encantó.",
      qs: [["When did the movie premiere?", "on Saturday", ["on Monday", "on Friday"], "Find El sábado."], ["How long did the director work on the script?", "three years", ["three months", "one year"], "Find tres años."], ["Where did they film the landscapes?", "Costa Rica", ["Chile", "Spain"], "Find paisajes de."], ["What language are the subtitles in?", "English", ["French", "Spanish"], "Find subtítulos."]] }
  ], READ_SLIDES);

  const read20b = RD([
    { t: "Julia quiere correr diez kilómetros en la carrera de su barrio. Su meta es grande, así que creó un hábito: corre treinta minutos tres veces por semana. Al principio se cansaba mucho y quería abandonar, pero su entrenador le dijo: «La constancia vale más que la velocidad». Después de dos meses, Julia corría sin parar durante una hora.",
      qs: [["How far does Julia want to run?", "ten kilometers", ["one kilometer", "forty kilometers"], "Find diez kilómetros."], ["How often does she run?", "three times a week", ["every day", "once a month"], "Find tres veces por semana."], ["What did the coach say is worth more than speed?", "persistence", ["luck", "shoes"], "Find La constancia."], ["What could she do after two months?", "run for an hour without stopping", ["run only five minutes", "win the race"], "Find sin parar."]] },
    { t: "Camila es de Buenos Aires y su prima Alba es de Madrid. Cuando hablan por videollamada, Camila dice «vos sos muy simpática» y Alba saluda a toda la familia de Camila diciendo «vosotros sois geniales». Las dos se ríen porque usan formas distintas, pero se entienden perfectamente. «Lo importante es comunicarnos», dice Alba.",
      qs: [["Where is Camila from?", "Buenos Aires", ["Madrid", "Bogotá"], "Find Camila es de."], ["Which pronoun does Camila use for \"you\"?", "vos", ["vosotros", "usted"], "Find Camila dice."], ["Why do they laugh?", "they use different forms", ["they are lost", "they dislike the call"], "Find usan formas distintas."], ["What does Alba say is important?", "to communicate", ["to use the same words", "to talk fast"], "Find comunicarnos."]] },
    { t: "Hoy visitamos el mercado antiguo de la ciudad. Es un lugar abarrotado y ruidoso, lleno de colores y olores. Pero al fondo hay un pequeño café acogedor donde la gente toma chocolate caliente y conversa con tranquilidad. Mi mamá dice que el mercado es como la ciudad: movido por fuera y tranquilo por dentro.",
      qs: [["How is the market?", "crowded and noisy", ["empty and silent", "new and modern"], "Find abarrotado y ruidoso."], ["How is the café?", "small and cozy", ["huge and luxurious", "loud and crowded"], "Find pequeño café."], ["What do people drink in the café?", "hot chocolate", ["orange juice", "milk shakes"], "Find chocolate caliente."], ["Mom compares the market to...", "the city", ["a school", "a farm"], "Find como la ciudad."]] }
  ], READ_SLIDES);

  const t20 = TYE(L20B, "law, the economy, movies, ideas, habits and places");

  const L20 = [
    XL("Law and justice", V(LAW)), XL("Economy and trade", V(ECON)), XL("Movies", V(FILM)), XL("Ideas and arguments", V(IDEAS)),
    XL("Habits and goals", V(HABIT)), XL("Describing places", V(PLACES)), XL("Tú, vos, usted, vosotros", youForms), XL("Spanish in the USA", usa),
    XL("Ways to say become", become), XL("Whose and which", cuyo), XL("Little words + verbs", prepInf), XL("Colors and numbers in sayings", colorSay),
    XL("Sports of the Spanish world", sports), XL("Giving a speech", speech), XL("Writing instructions", instr), XL("Reading: court, bakery, cinema", read20a),
    XL("Reading: goals and places", read20b), XL("Type it in Spanish", t20),
    XL("Mixed practice", MIX([V(LAW), V(IDEAS), V(HABIT), youForms, become, cuyo, prepInf, usa])),
    XL("Level 20 Challenge", MIX([V(LAW), V(ECON), V(FILM), V(IDEAS), V(HABIT), V(PLACES), youForms, usa, become, cuyo, prepInf, colorSay, sports, speech, instr, read20a, read20b]))
  ];

  // ---------- LEVEL 21 banks ----------
  const MIND = SP("The mind", [["memoria", "memory", "🧠"], ["pensamiento", "thought", "💭"], ["personalidad", "personality", "🎭"], ["conducta", "behavior", "🚸"], ["emoción", "emotion", "💓"], ["inteligencia", "intelligence", "🔬"], ["creatividad", "creativity", "🎨"], ["atención", "attention", "👀"]]);
  const BIZ = SP("Starting a business", [["emprendedor", "entrepreneur", "🚀"], ["negocio", "business", "🏪"], ["ganancia", "profit", "📈"], ["pérdida", "loss", "📉"], ["socio", "partner", "🤝"], ["marca", "brand", "🏷️"], ["publicidad", "advertising", "📢"], ["competencia", "competition", "🏁"]]);
  const LIT = SP("Talking about stories", [["tema", "theme", "💬"], ["metáfora", "metaphor", "🪞"], ["desenlace", "ending (outcome)", "🏁"], ["protagonista", "main character", "⭐"], ["antagonista", "opposing character", "🦹"], ["conflicto", "conflict", "⚔️"], ["ambiente", "setting or atmosphere", "🏞️"], ["narrador", "narrator", "🎙️"]]);
  const COOK = SP("Cooking actions", [["freír", "to fry", "🍳"], ["hornear", "to bake", "🥖"], ["picar", "to chop", "🔪"], ["batir", "to whisk", "🥣"], ["amasar", "to knead", "🍞"], ["asar", "to roast or grill", "🍖"], ["pelar", "to peel", "🥔"], ["rallar", "to grate", "🧀"]]);
  const EMERG = SP("Emergencies and safety", [["ambulancia", "ambulance", "🚑"], ["socorro", "help!", "🆘"], ["herida", "wound", "🩹"], ["primeros auxilios", "first aid", "⛑️"], ["salida de emergencia", "emergency exit", "🚪"], ["simulacro", "emergency drill", "🔔"], ["botiquín", "first-aid kit", "🧰"], ["linterna", "flashlight", "🔦"]]);
  const LIFE = SP("Stages of life", [["infancia", "childhood", "🧒"], ["adolescencia", "adolescence", "🧑"], ["juventud", "youth", "🎓"], ["madurez", "adulthood or maturity", "🧑‍💼"], ["vejez", "old age", "👵"], ["nacimiento", "birth", "👶"], ["jubilación", "retirement", "🏖️"], ["generación", "generation", "👨‍👩‍👧‍👦"]]);
  const L21B = [].concat(MIND.items, BIZ.items, LIT.items, COOK.items, EMERG.items, LIFE.items);

  // ---------- LEVEL 21 lessons ----------
  const langs = RW([
    ["Besides Spanish, which language is spoken in Cataluña (Spain)?", "Catalan", ["Quechua", "Guaraní"]],
    ["<b>Euskera</b>, an ancient language unrelated to Spanish, is spoken in ___ .", "the Basque Country", ["Patagonia", "Cuba"]],
    ["<b>Gallego</b> is spoken in the northwest of Spain, in ___ .", "Galicia", ["Valencia", "Andalucía"]],
    ["<b>Quechua</b>, the language of the Inca Empire, is still spoken today in the ___ .", "Andes", ["Caribbean", "Pampas"]],
    ["In Paraguay, Spanish and ___ are both official languages.", "Guaraní", ["Quechua", "Catalan"]],
    ["<b>Náhuatl</b> is an indigenous language of ___ .", "México", ["Uruguay", "Cuba"]],
    ["The Maya languages are spoken today in Guatemala and southern ___ .", "México", ["Chile", "Argentina"]],
    ["<b>Mapudungun</b> is the language of the Mapuche people in Chile and ___ .", "Argentina", ["España", "Cuba"]],
    ["In Bolivia, besides Spanish, official languages include Quechua and ___ .", "Aymara", ["Catalan", "Basque"]],
    ["Spanish is also called <b>castellano</b> because it began in the kingdom of ___ .", "Castilla", ["Cataluña", "Portugal"]]
  ], "Think about the region: northern Spain, the Andes, Paraguay, Mexico, southern Chile.", "Spanish is not the only language in the Spanish-speaking world. Match each language with the region where its speakers live.",
    "Example: <b>Guaraní</b> is spoken in Paraguay, and most Paraguayans speak both Guaraní and Spanish. Now match yours.",
    [["Many languages, one world", "🗣️", "Spanish shares its home with many other languages, both in Spain and in the Americas."], ["In Spain", "catalán · gallego · euskera", "<b>Catalán</b> (Cataluña), <b>gallego</b> (Galicia) and <b>euskera</b> (País Vasco) are official languages alongside Spanish in their regions."], ["In the Americas", "quechua · guaraní · náhuatl · maya · aymara", "Millions of people speak <b>quechua</b> (Andes), <b>guaraní</b> (Paraguay), <b>náhuatl</b> and <b>maya</b> (México and Guatemala), <b>aymara</b> (Bolivia and Perú)."]]);

  const scientists = RW([
    ["Santiago Ramón y Cajal, from Spain, won a Nobel Prize for studying the ___ .", "nervous system (neurons)", ["stars", "oceans"]],
    ["Mario Molina, from México, won a Nobel Prize in Chemistry for research on the ozone ___ .", "layer", ["lake", "island"]],
    ["Bernardo Houssay, from Argentina, won the Nobel Prize in 1947 in ___ .", "Medicine", ["Literature", "Peace"]],
    ["Leonardo Torres Quevedo, a Spanish engineer, built an early ___ over Niagara Falls.", "cable car", ["lighthouse", "airport"]],
    ["Carlos Finlay, a doctor from Cuba, found that ___ spread yellow fever.", "mosquitoes", ["birds", "water"]],
    ["Luis Federico Leloir, from Argentina, won the Nobel Prize in Chemistry in 1970 for studying how the body processes ___ .", "sugars", ["metals", "gases"]],
    ["Franklin Chang-Díaz, from Costa Rica, was an ___ .", "astronaut", ["architect", "chef"]],
    ["Isaac Peral, a Spanish engineer, built an early electric ___ in 1888.", "submarine", ["airplane", "car"]]
  ], "Think about each person's field: medicine, chemistry, engineering or space.", "The clue is in the field: neurons are in the body, ozone is in the air, a cable car moves people, mosquitoes carry disease.",
    "Example: Gabriela Mistral, from Chile, was the first Latin American to win the Nobel Prize in Literature (1945). Now do yours.",
    [["Spanish-speaking scientists", "🔬", "Scientists and inventors from Spain and Latin America have changed medicine, chemistry and engineering."], ["Examples", "Ramón y Cajal · Molina · Houssay", "<b>Ramón y Cajal</b> (España) studied neurons. <b>Mario Molina</b> (México) studied the ozone layer. <b>Bernardo Houssay</b> (Argentina) won the Nobel Prize in Medicine."], ["Engineers and explorers", "Torres Quevedo · Peral · Chang-Díaz", "<b>Torres Quevedo</b> built a cable car, <b>Isaac Peral</b> a submarine, and <b>Franklin Chang-Díaz</b> flew in space."]]);

  const adjPos = RW([
    ["Which phrase means \"a great man\" (an important man)?", "un gran hombre", ["un hombre grande", "un hombre gran"]],
    ["Which phrase means \"a big man\" (large in size)?", "un hombre grande", ["un gran hombre", "un grande hombre"]],
    ["Which phrase means \"a poor man\" (pitiable, unlucky)?", "un pobre hombre", ["un hombre pobre", "una pobre hombre"]],
    ["Which phrase means \"a man with little money\"?", "un hombre pobre", ["un pobre hombre", "un hombre pobres"]],
    ["Which phrase means \"the very day itself\"?", "el día mismo", ["el mismo día", "el día misma"]],
    ["Which phrase means \"another car, a different one\"?", "un nuevo carro", ["un carro nuevo", "un carro nueva"]],
    ["Which phrase means \"a sure thing\" (it is true)?", "una cosa cierta", ["una cierta cosa", "un cosa cierta"]],
    ["Which phrase means \"a former city\" (it used to be)?", "una antigua ciudad", ["una ciudad antigua", "un antigua ciudad"]],
    ["Which phrase means \"an elderly friend\"?", "un amigo viejo", ["un viejo amigo", "una amigo viejo"]],
    ["Which phrase means \"a long-time friend\"?", "un viejo amigo", ["un amigo viejo", "un viejos amigo"]]
  ], "In Spanish, where the describing word goes can change the meaning. Look at the English meaning in the question.", "After the noun, the adjective tells how something is (size, money, age). Before the noun, it often shows importance, feeling or \"former\" or \"another\".",
    "Example: <b>un libro nuevo</b> is a brand-new book, but <b>un nuevo libro</b> is another book. Now do yours.",
    [["Position changes meaning", "un gran hombre ↔ un hombre grande", "Some adjectives change meaning when they move before or after the noun."], ["Pairs to know", "pobre · viejo · nuevo · antiguo · cierto · mismo", "<b>un pobre hombre</b> = pitiable man, <b>un hombre pobre</b> = no money. <b>un viejo amigo</b> = long-time friend, <b>un amigo viejo</b> = elderly friend."], ["Gran and grande", "gran + noun · noun + grande", "<b>Grande</b> becomes <b>gran</b> before a singular noun: <b>un gran día</b> (a great day), <b>un perro grande</b> (a big dog)."]]);

  const lookalike = RW([
    ["Quiero ___ qué dice la carta. (let's see)", "a ver", ["haber", "aber"]],
    ["Debe ___ más sillas en la sala. (there should be)", "haber", ["a ver", "aber"]],
    ["No es azul, ___ verde. (but rather)", "sino", ["pero", "aunque"]],
    ["Iré al parque ___ llueve. (if it does not)", "si no", ["pero", "porque"]],
    ["Ella canta ___ como su madre. (so well)", "tan bien", ["también", "tampoco"]],
    ["Mi hermano ___ juega al fútbol. (also)", "también", ["tan bien", "tampoco"]],
    ["How do you write \"why\" in a question like \"¿___ no viniste?\"", "two words with an accent (por qué)", ["one word with no accent (porque)", "one word with an accent (porqué)"]],
    ["How do you write \"because\" in \"No fui ___ estaba enfermo\"?", "one word with no accent (porque)", ["two words with an accent (por qué)", "one word with an accent (porqué)"]],
    ["How do you write the noun \"the reason\" in \"No sé el ___ de su enojo\"?", "one word with an accent (porqué)", ["one word with no accent (porque)", "two words with an accent (por qué)"]]
  ], "These pairs sound the same, but they have different spellings and jobs. Look at the meaning in brackets.", "A ver = let's see. Haber = to have (helper) or there is. Sino = but rather. Si no = if not. Tan bien = so well. También = also.",
    "Example: \"___ lo hace tan bien\" with the meaning \"why\" uses <b>por qué</b> in a question. Now do yours.",
    [["Sound-alikes", "a ver · haber · sino · si no", "Some Spanish words sound the same but are spelled differently. The meaning tells you which to write."], ["Two pairs", "a ver / haber · sino / si no", "<b>A ver</b> = let's see. <b>Haber</b> = to have (helper) or there is. <b>Sino</b> = but rather. <b>Si no</b> = if not."], ["Four porques", "por qué · porque · porqué · por que", "<b>¿Por qué?</b> = why (a question). <b>Porque</b> = because. <b>El porqué</b> = the reason (a noun)."]]);

  const howLong = RW([
    ["___ tres años que vivo aquí. (It has been)", "Hace", ["Desde", "Hacen"]],
    ["Vivo aquí ___ 2021. (since)", "desde", ["hace", "por"]],
    ["Vivo aquí ___ tres años. (for)", "desde hace", ["desde", "hasta"]],
    ["___ dos horas estudiando. (I have been)", "Llevo", ["Estoy", "Tengo"]],
    ["Ella ___ cinco años tocando el violín. (has been)", "lleva", ["está", "tiene"]],
    ["Hace una semana ___ a mi abuela. (I visited)", "visité", ["visitaba", "visito"]],
    ["¿Cuánto tiempo ___ que no ves a tu primo? (has it been)", "hace", ["haces", "hay"]],
    ["Estudio español ___ el año pasado. (since)", "desde", ["hace", "durante"]],
    ["Trabajó allí ___ diez años y luego se mudó. (for, then it ended)", "durante", ["desde", "hace"]],
    ["No lo veo ___ ayer. (since)", "desde", ["hace", "por"]]
  ], "Ask: are you counting from a point in time (since) or counting an amount of time (for/ago)?", "Desde + a point in time. Hace + an amount of time = ago. Desde hace/llevar + amount = for. Durante = for a finished stretch.",
    "Example: \"Estudio ___ lunes\" uses <b>desde</b>, a point in time. \"Estudio ___ dos días\" uses <b>desde hace</b>. Now do yours.",
    [["How long?", "desde · hace · llevar · durante", "Spanish has several ways to talk about how long something has been going on."], ["Since and for", "desde 2021 · desde hace tres años", "<b>Desde</b> + a date or time: since. <b>Desde hace</b> + an amount of time: for. <b>Hace</b> + time + <b>que</b>: it has been that long."], ["Llevar and durante", "llevo dos horas estudiando · durante diez años", "<b>Llevar</b> + time + -ing: have been doing. <b>Durante</b> = during or for, when it is finished."]]);

  const bodyIdioms = TR([
    ["Tener mano izquierda", "to be tactful"], ["Meter las narices", "to nose into other people's business"], ["Con el corazón en un puño", "very anxious"], ["Dar la espalda", "to turn one's back on"],
    ["Hacerse la boca agua", "to make one's mouth water"], ["Con los pelos de punta", "with hair standing on end"], ["Romper el hielo", "to break the ice"], ["Ser un cabeza de chorlito", "to be scatterbrained"],
    ["Quedarse con la boca abierta", "to be astonished"], ["Tener buen ojo", "to be a good judge of things"]
  ], [["Body sayings", "🫀", "Spanish loves body parts in its sayings. <b>Tener mano izquierda</b> is about being tactful, not about a hand."], ["Examples", "con el corazón en un puño<br>hacerse la boca agua", "<b>Con el corazón en un puño</b> = very worried (heart in a fist). <b>Hacerse la boca agua</b> = your mouth waters at tasty food."], ["Learn the meaning", "🧠", "Learn each saying as one whole piece. Do not translate it word by word."]],
    "These sayings are not literal. Think about the whole meaning, not each word.");

  const manners = RW([
    ["In Spain, friends often greet each other with <b>dos besos</b>, which means ___ .", "two kisses on the cheek", ["a bow", "a high five"]],
    ["In Spain, the main meal, <b>la comida</b>, is usually eaten around ___ .", "2 p.m.", ["10 a.m.", "5 p.m."]],
    ["<b>La sobremesa</b> is the time when people ___ .", "stay at the table talking after a meal", ["wash the dishes quickly", "order the food"]],
    ["Ana García López uses two surnames. García comes from her ___ .", "father", ["teacher", "street"]],
    ["When you meet an older person you do not know, the polite word for \"you\" is ___ .", "usted", ["vos", "tú"]],
    ["A <b>siesta</b> is ___ .", "a short rest after lunch", ["a type of soup", "a holiday parade"]],
    ["When invited to a Latin American home, it is polite to ___ .", "bring a small gift like flowers or sweets", ["bring your own dinner", "eat before you arrive"]],
    ["<b>Buen provecho</b> is said to people who ___ .", "are about to eat", ["are traveling", "are going to sleep"]],
    ["On a birthday in México, family and friends often sing ___ .", "Las mañanitas", ["La cucaracha", "Cielito lindo"]]
  ], "Think about what is polite and normal in many Spanish-speaking places.", "Customs are habits that a community shares: greetings, meals, names and polite words. Pick the answer that sounds like a friendly custom.",
    "Example: In many countries, people say <b>Buen provecho</b> before a meal, like \"enjoy your meal\". Now do yours.",
    [["Customs and manners", "🤝", "Every culture has habits that feel normal to its people. Knowing them helps you be polite."], ["Examples", "dos besos · usted · sobremesa", "In Spain friends greet with <b>dos besos</b>. Use <b>usted</b> with older people. After a meal, enjoy the <b>sobremesa</b>, the time to chat at the table."], ["Names", "Ana García López", "Many people have two surnames: first the father's, then the mother's."]]);

  const summary = TR([
    ["En resumen", "In summary"], ["El texto trata de", "The text is about"], ["La idea principal es", "The main idea is"], ["Según el autor", "According to the author"], ["En conclusión", "In conclusion"],
    ["Por lo tanto", "Therefore"], ["Cabe destacar que", "It is worth noting that"], ["Además", "Besides"], ["En otras palabras", "In other words"], ["Por ejemplo", "For example"]
  ], [["Writing a summary", "📝", "A summary is short. It gives the main idea first, then the key details, and leaves out the small ones."], ["Starting phrases", "El texto trata de · La idea principal es", "Open with <b>El texto trata de</b> (the text is about) or <b>La idea principal es</b> (the main idea is)."], ["Linking phrases", "según el autor · por lo tanto · en conclusión", "Use <b>según el autor</b> for the writer's view, <b>por lo tanto</b> for a result, and <b>en conclusión</b> to finish."]]);

  const debate = TR([
    ["Estoy a favor de", "I am in favor of"], ["Estoy en contra de", "I am against"], ["No estoy de acuerdo", "I do not agree"], ["Tienes razón, pero", "You are right, but"], ["Un argumento sólido es", "A strong argument is"],
    ["Respeto tu opinión", "I respect your opinion"], ["Eso depende de", "That depends on"], ["Me gustaría añadir que", "I would like to add that"], ["Los datos demuestran que", "The data show that"], ["Quizás tengas razón", "Maybe you are right"]
  ], [["A respectful debate", "🗣️", "In a good debate, you give reasons, listen carefully, and stay polite even when you disagree."], ["Take a side", "estoy a favor de · estoy en contra de", "Say <b>estoy a favor de</b> (in favor) or <b>estoy en contra de</b> (against). Then give your reasons."], ["Answer politely", "tienes razón, pero · respeto tu opinión", "<b>Tienes razón, pero…</b> and <b>respeto tu opinión</b> keep the conversation friendly."]]);

  const read21a = RD([
    { t: "En la clase de literatura, leímos un cuento sobre una niña, Inés, que encuentra una caja misteriosa en el desván. El narrador describe el ambiente con detalles: polvo, luz dorada y olor a madera vieja. El conflicto aparece cuando Inés descubre que la caja guarda cartas de su bisabuela. El desenlace es emotivo: Inés decide escribir una carta de respuesta. El tema del cuento es la importancia de la memoria familiar.",
      qs: [["Who is the main character?", "Inés", ["the narrator", "the teacher"], "Find una niña, Inés."], ["Where does she find the box?", "in the attic", ["in the kitchen", "at school"], "Find en el desván."], ["What is in the box?", "letters from her great-grandmother", ["old toys", "photos of friends"], "Find cartas de su bisabuela."], ["What is the theme of the story?", "the importance of family memory", ["the fear of the dark", "how to cook"], "Find El tema."]] },
    { t: "En el barrio de Pablo, los vecinos organizaron una charla sobre primeros auxilios. Una enfermera explicó cómo limpiar una herida pequeña y cómo usar el botiquín. También dijo que, en una emergencia grave, lo primero es llamar a la ambulancia y mantener la calma. Al final, cada familia recibió una lista de números importantes para pegar en la nevera.",
      qs: [["Who gave the talk?", "a nurse", ["a firefighter", "a teacher"], "Find Una enfermera."], ["What did she show how to clean?", "a small wound", ["a window", "a floor"], "Find una herida pequeña."], ["What is the first thing to do in a serious emergency?", "call the ambulance and stay calm", ["run away", "post about it online"], "Find lo primero."], ["Where should families put the list of numbers?", "on the fridge", ["in the car", "under the bed"], "Find en la nevera."]] },
    { t: "Marta y su primo Iván fundaron un pequeño negocio de jabones naturales. Al principio tuvieron pérdidas porque gastaron mucho en publicidad. Después cambiaron su estrategia: crearon una marca con un diseño sencillo y vendieron en ferias locales. En seis meses, sus ganancias subieron. Marta dice que un buen emprendedor aprende de sus errores.",
      qs: [["What does their business sell?", "natural soaps", ["toys", "bread"], "Find jabones naturales."], ["Why did they lose money at first?", "they spent a lot on advertising", ["nobody liked soap", "they lost their shop"], "Find gastaron mucho."], ["Where did they sell after changing the plan?", "at local fairs", ["only online", "in another country"], "Find ferias locales."], ["What does Marta say a good entrepreneur does?", "learns from mistakes", ["never takes risks", "works alone"], "Find aprende de sus errores."]] }
  ], READ_SLIDES);

  const read21b = RD([
    { t: "Mi abuelo Tomás cuenta que, en su infancia, jugaba en la calle hasta la noche. En su juventud trabajó en una fábrica y estudió de noche. Ahora, en su jubilación, cuida un huerto y enseña a sus nietos a plantar tomates. Dice que cada etapa de la vida tiene sus alegrías. Mi generación usa mucha tecnología, pero él cree que los abrazos son iguales en todas las épocas.",
      qs: [["What did Tomás do as a child?", "played in the street until night", ["worked in a factory", "studied at night"], "Find en su infancia."], ["What did he do in his youth?", "worked in a factory and studied at night", ["traveled the world", "grew tomatoes"], "Find En su juventud."], ["What does he do now?", "tends a garden and teaches his grandchildren", ["works at a bank", "drives a bus"], "Find en su jubilación."], ["What does he believe is the same in every era?", "hugs", ["technology", "clothes"], "Find los abrazos."]] },
    { t: "En Perú viven personas que hablan español y quechua. Rosa, una estudiante de Cusco, habla los dos idiomas. En casa conversa en quechua con su abuela y en la escuela usa el español. Rosa cree que hablar dos lenguas es como tener dos ventanas para mirar el mundo. Sueña con escribir un libro que tenga palabras de ambos idiomas.",
      qs: [["Where is Rosa from?", "Cusco", ["Madrid", "Buenos Aires"], "Find de Cusco."], ["Which language does she speak with her grandmother?", "Quechua", ["English", "Catalan"], "Find con su abuela."], ["Rosa says speaking two languages is like...", "having two windows to see the world", ["having two houses", "having two bicycles"], "Find dos ventanas."], ["What is her dream?", "to write a book with words from both languages", ["to move to Spain", "to become a pilot"], "Find Sueña con."]] },
    { t: "Para estudiar mejor, la profesora Salas recomienda tres hábitos. Primero, repasar un poco cada día en lugar de estudiar todo en una noche. Segundo, dormir ocho horas, porque el cerebro organiza la memoria mientras descansamos. Tercero, explicar la lección en voz alta a otra persona. Según ella, la atención y la constancia son más importantes que la inteligencia.",
      qs: [["How many habits does Professor Salas recommend?", "three", ["two", "ten"], "Find tres hábitos."], ["How many hours should you sleep?", "eight", ["four", "twelve"], "Find dormir."], ["Why is sleep important for studying?", "the brain organizes memory while we rest", ["it makes you taller", "it saves money"], "Find organiza la memoria."], ["What does she say matters more than intelligence?", "attention and persistence", ["luck", "speed"], "Find Según ella."]] }
  ], READ_SLIDES);

  const t21 = TYE(L21B, "the mind, business, stories, cooking, safety and stages of life");

  const L21 = [
    XL("The mind", V(MIND)), XL("Starting a business", V(BIZ)), XL("Talking about stories", V(LIT)), XL("Cooking actions", V(COOK)),
    XL("Emergencies and safety", V(EMERG)), XL("Stages of life", V(LIFE)), XL("Many languages, one world", langs), XL("Spanish-speaking scientists", scientists),
    XL("Position changes meaning", adjPos), XL("Sound-alikes", lookalike), XL("How long?", howLong), XL("Body sayings", bodyIdioms),
    XL("Customs and manners", manners), XL("Writing a summary", summary), XL("A respectful debate", debate), XL("Reading: stories, safety, business", read21a),
    XL("Reading: generations, languages, study tips", read21b), XL("Type it in Spanish", t21),
    XL("Mixed practice", MIX([V(MIND), V(LIT), V(EMERG), langs, adjPos, lookalike, howLong, manners])),
    XL("Level 21 Challenge", MIX([V(MIND), V(BIZ), V(LIT), V(COOK), V(EMERG), V(LIFE), langs, scientists, adjPos, lookalike, howLong, bodyIdioms, manners, summary, debate, read21a, read21b]))
  ];

  Object.assign(SPANISH_LEVELS, { 19: L19, 20: L20, 21: L21 });
})();
