// ext/spanish-16-18.js  Mind Lab Spanish, levels 16-18 (60 lessons)
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


  // ---------- word banks ----------
  const TRAVEL = SP("Travel and airports", [["aeropuerto", "airport", "✈️"], ["maleta", "suitcase", "🧳"], ["pasaporte", "passport", "🛂"], ["boleto", "ticket", "🎫"], ["vuelo", "flight", "🛫"], ["llegada", "arrival", "🛬"], ["salida", "departure", "🚪"], ["equipaje", "luggage", "🎒"]]);
  const HOTEL = SP("At the hotel", [["habitación", "room", "🛏️"], ["llave", "key", "🔑"], ["recepción", "front desk", "🛎️"], ["ascensor", "elevator", "🛗"], ["reserva", "reservation", "📅"], ["huésped", "guest", "🧑"], ["piscina", "swimming pool", "🏊"], ["desayuno", "breakfast", "🥐"]]);
  const RESTO = SP("At the restaurant", [["menú", "menu", "📋"], ["mesero", "waiter", "🤵"], ["cuenta", "bill", "🧾"], ["propina", "tip", "💵"], ["plato", "dish", "🍽️"], ["postre", "dessert", "🍰"], ["bebida", "drink", "🥤"], ["mesa", "table", "🪑"]]);
  const TECH = SP("Technology", [["pantalla", "screen", "🖥️"], ["teclado", "keyboard", "⌨️"], ["contraseña", "password", "🔒"], ["archivo", "file", "📁"], ["aplicación", "app", "📱"], ["cargador", "charger", "🔌"], ["auriculares", "headphones", "🎧"], ["ratón", "computer mouse", "🖱️"]]);
  const SPACE = SP("Space", [["planeta", "planet", "🪐"], ["estrella", "star", "⭐"], ["cohete", "rocket", "🚀"], ["luna", "moon", "🌙"], ["galaxia", "galaxy", "🌌"], ["astronauta", "astronaut", "🧑‍🚀"], ["órbita", "orbit", "🛰️"], ["telescopio", "telescope", "🔭"]]);
  const ENVIRO = SP("Helping the planet", [["reciclar", "to recycle", "♻️"], ["basura", "trash", "🗑️"], ["contaminación", "pollution", "🏭"], ["ahorrar", "to save", "💰"], ["energía solar", "solar energy", "☀️"], ["botella", "bottle", "🍾"], ["reutilizar", "to reuse", "🔁"], ["bosque", "forest", "🌲"]]);
  const INVENT = SP("Inventions", [["invento", "invention", "🛠️"], ["rueda", "wheel", "🛞"], ["imprenta", "printing press", "🖨️"], ["bombilla", "light bulb", "💡"], ["brújula", "compass", "🧭"], ["teléfono", "telephone", "📞"], ["reloj", "clock", "⏰"], ["microscopio", "microscope", "🔬"]]);
  const HOBBY = SP("Hobbies", [["pasatiempo", "hobby", "🎯"], ["coleccionar", "to collect", "🪙"], ["dibujar", "to draw", "✏️"], ["fotografía", "photography", "📷"], ["jardinería", "gardening", "🌱"], ["ajedrez", "chess", "♟️"], ["rompecabezas", "puzzle", "🧩"], ["tejer", "to knit", "🧶"]]);

  const KITCHEN = SP("In the kitchen", [["sartén", "frying pan", "🍳"], ["olla", "pot", "🍲"], ["tenedor", "fork", "🍴"], ["cuchara", "spoon", "🥄"], ["horno", "oven", "♨️"], ["receta", "recipe", "📖"], ["ingrediente", "ingredient", "🥕"], ["hervir", "to boil", "🫕"]]);
  const SPORTS = SP("Sports and teams", [["equipo", "team", "👥"], ["campeonato", "championship", "🏆"], ["árbitro", "referee", "📣"], ["entrenador", "coach", "📋"], ["partido", "match", "⚽"], ["estadio", "stadium", "🏟️"], ["medalla", "medal", "🏅"], ["ganar", "to win", "🥇"]]);
  const MED = SP("Health and the doctor", [["fiebre", "fever", "🌡️"], ["tos", "cough", "😷"], ["resfriado", "cold", "🤧"], ["dolor", "pain", "🤕"], ["medicina", "medicine", "💊"], ["enfermera", "nurse", "🧑‍⚕️"], ["hospital", "hospital", "🏥"], ["cita", "appointment", "📅"]]);
  const CITY = SP("Getting around the city", [["autobús", "bus", "🚌"], ["metro", "subway", "🚇"], ["semáforo", "traffic light", "🚦"], ["esquina", "street corner", "🏙️"], ["puente", "bridge", "🌉"], ["acera", "sidewalk", "🚶"], ["tráfico", "traffic", "🚗"], ["estación", "station", "🚉"]]);
  const SHOP = SP("Shopping", [["tienda", "store", "🏬"], ["precio", "price", "🏷️"], ["descuento", "discount", "💸"], ["oferta", "special offer", "🛍️"], ["cliente", "customer", "🧑"], ["vendedor", "salesperson", "🧑‍💼"], ["caja", "cash register", "🧾"], ["recibo", "receipt", "📃"]]);
  const OFFICE = SP("Work and offices", [["oficina", "office", "🏢"], ["reunión", "meeting", "🗣️"], ["jefe", "boss", "👔"], ["empleado", "employee", "🧑‍💻"], ["horario", "schedule", "🗓️"], ["sueldo", "salary", "💵"], ["entrevista", "job interview", "🎤"], ["currículum", "résumé", "📄"]]);
  const PLANTS = SP("Plants and gardens", [["semilla", "seed", "🌰"], ["raíz", "root", "🌿"], ["hoja", "leaf", "🍃"], ["flor", "flower", "🌸"], ["tronco", "trunk", "🪵"], ["jardín", "garden", "🌷"], ["regar", "to water", "🚿"], ["cosecha", "harvest", "🌾"]]);
  const TIMEW = SP("Time words", [["ayer", "yesterday"], ["anteayer", "the day before yesterday"], ["anoche", "last night"], ["pasado mañana", "the day after tomorrow"], ["el año que viene", "next year"], ["la semana pasada", "last week"], ["hace un rato", "a little while ago"], ["dentro de poco", "soon"]]);

  const ORGANS = SP("Inside the body", [["corazón", "heart", "❤️"], ["pulmones", "lungs", "🫁"], ["cerebro", "brain", "🧠"], ["hueso", "bone", "🦴"], ["músculo", "muscle", "💪"], ["estómago", "stomach"], ["sangre", "blood"], ["piel", "skin", "✋"]]);
  const PHYS = SP("Physics words", [["átomo", "atom", "⚛️"], ["energía", "energy", "⚡"], ["fuerza", "force", "💪"], ["velocidad", "speed", "🏎️"], ["gravedad", "gravity", "🍎"], ["calor", "heat", "🔥"], ["electricidad", "electricity", "🔌"], ["imán", "magnet", "🧲"]]);
  const HISTW = SP("History words", [["independencia", "independence", "🕊️"], ["imperio", "empire", "👑"], ["colonia", "colony", "🏘️"], ["siglo", "century", "📅"], ["descubrimiento", "discovery", "🔍"], ["tratado", "treaty", "📜"], ["república", "republic", "🏛️"], ["explorador", "explorer", "🧭"]]);
  const NEWSW = SP("News and media", [["noticia", "news item", "📰"], ["periódico", "newspaper", "🗞️"], ["periodista", "journalist", "🎙️"], ["reportaje", "report", "🗒️"], ["titular", "headline", "🔠"], ["artículo", "article", "📄"], ["anuncio", "advertisement", "📢"], ["encuesta", "survey", "📊"]]);
  const CHARITY = SP("Helping others", [["voluntario", "volunteer", "🙋"], ["donar", "to donate", "🎁"], ["refugio", "shelter", "🏠"], ["caridad", "charity", "💝"], ["generoso", "generous", "🤲"], ["solidaridad", "solidarity", "🤝"], ["colecta", "fundraiser", "💰"], ["apoyo", "support", "🫶"]]);
  const VALUES = SP("Values and virtues", [["libertad", "freedom", "🕊️"], ["justicia", "justice", "⚖️"], ["esperanza", "hope", "🌈"], ["amistad", "friendship", "🤝"], ["respeto", "respect", "🙏"], ["honestidad", "honesty", "💎"], ["valentía", "courage", "🦁"], ["paz", "peace", "☮️"]]);
  const THINKV = SP("Thinking verbs", [["pensar", "to think", "🤔"], ["opinar", "to give an opinion", "💬"], ["creer", "to believe"], ["suponer", "to suppose"], ["dudar", "to doubt"], ["imaginar", "to imagine", "💭"], ["recordar", "to remember"], ["olvidar", "to forget"]]);

  // ---------- grammar review (fill in) ----------
  const GR = (rows, o) => RW(rows, o);
  const serEstar = RW([
    ["Mi tía ___ doctora. (her job)", "es", ["está", "son"]], ["La sopa ___ fría ahora. (right now)", "está", ["es", "son"]],
    ["Los lagos de Chile ___ muy bonitos. (always true)", "son", ["están", "es"]], ["Hoy mi hermano ___ cansado.", "está", ["es", "son"]],
    ["La fiesta ___ en el parque. (where an event happens)", "es", ["está", "son"]], ["Nosotros ___ de Colombia. (where we are from)", "somos", ["estamos", "son"]],
    ["El museo ___ cerca de la plaza. (where it is)", "está", ["es", "son"]], ["Ellas ___ muy simpáticas. (their personality)", "son", ["están", "es"]],
    ["Las ventanas ___ abiertas. (right now)", "están", ["son", "es"]], ["¿Qué hora ___ ? (the time)", "es", ["está", "son"]]
  ], { h1: "Ask yourself: is it a lasting trait (who or what it is), or a place or a mood that can change?", h2: "Ser is for identity, jobs, origin, time and traits. Estar is for places, feelings and temporary states.",
    h3: "Example: \"Mi gato ___ negro\" uses <b>es</b> (color is a lasting trait), but \"Mi gato ___ en el sofá\" uses <b>está</b> (a place). Now do yours.",
    slides: [["Two verbs for 'to be'", "ser · estar", "Spanish has two verbs for <b>to be</b>. You choose by meaning, not by how the sentence sounds."], ["Ser", "es · son · somos", "<b>Ser</b>: who or what something is, jobs, where you are from, personality, time, and where an event happens (<b>La fiesta es en mi casa</b>)."], ["Estar", "está · están · estamos", "<b>Estar</b>: where something is, how you feel, and things that can change soon (<b>La sopa está fría</b>)."]] });
  const porPara = RW([
    ["Este regalo es ___ mi abuela. (who gets it)", "para", ["por", "de"]], ["Gracias ___ tu ayuda. (the reason)", "por", ["para", "de"]],
    ["Estudio ___ ser ingeniero. (a goal)", "para", ["por", "a"]], ["Caminamos ___ el parque. (through)", "por", ["para", "en"]],
    ["Salgo ___ Madrid mañana. (heading toward)", "para", ["por", "en"]], ["Pagué diez dólares ___ el libro. (in exchange for)", "por", ["para", "con"]],
    ["La tarea es ___ el lunes. (a deadline)", "para", ["por", "en"]], ["Hablamos ___ teléfono. (by means of)", "por", ["para", "de"]],
    ["Estudio ___ la noche. (during)", "por", ["para", "a"]], ["Uso esta caja ___ guardar mis juguetes. (purpose)", "para", ["por", "de"]]
  ], { h1: "Think about the idea: is it a goal or a receiver (looking ahead), or a reason, a path or an exchange (looking back)?", h2: "Para: goal, purpose, receiver, deadline, destination. Por: reason, through, by means of, in exchange for, during.",
    h3: "Example: \"Trabajo ___ ganar dinero\" uses <b>para</b> (the goal), but \"Gracias ___ el dinero\" uses <b>por</b> (the reason). Now do yours.",
    slides: [["Por or para?", "por ↔ para", "Both can mean <b>for</b> in English, but Spanish uses each one for different ideas."], ["Para = goal", "para → 🎯", "<b>Para</b> looks forward: a goal (<b>para ser médico</b>), a receiver (<b>para ti</b>), a deadline and a destination."], ["Por = reason", "por → 🔙", "<b>Por</b> looks back or moves through: a reason (<b>por la lluvia</b>), a path (<b>por el parque</b>), an exchange, and <b>por la noche</b> (during)."]] });
  const pretImp = RW([
    ["Ayer yo ___ al cine. (ir; one finished trip)", "fui", ["iba", "voy"]], ["Cuando era niño, ___ al parque todos los días. (ir, yo; a habit)", "iba", ["fui", "voy"]],
    ["Mientras yo leía, mi hermano ___ la tele. (ver; was in the middle of)", "veía", ["vio", "vi"]], ["De repente, la luz ___ . (apagarse; a sudden event)", "se apagó", ["se apagaba", "se apaga"]],
    ["Hacía calor y el cielo ___ azul. (estar; description)", "estaba", ["estuvo", "está"]], ["El sábado pasado nosotros ___ una pizza. (comer; finished)", "comimos", ["comíamos", "comemos"]],
    ["De pequeña, ella siempre ___ canciones. (cantar; a habit)", "cantaba", ["cantó", "canta"]], ["Cuando sonó el teléfono, yo ___ . (dormir; was sleeping)", "dormía", ["dormí", "duermo"]],
    ["Ayer ellos ___ el partido. (ganar; it ended)", "ganaron", ["ganaban", "ganan"]]
  ], { h1: "Is it one finished event, or a description, habit or something that was in progress?", h2: "Preterite: a finished event or a sudden interruption. Imperfect: habits, descriptions, and actions in progress.",
    h3: "Example: \"Ayer ella ___ una carta\" uses <b>escribió</b> (finished), but \"Siempre ella ___ cartas\" uses <b>escribía</b> (a habit). Now do yours.",
    slides: [["Two past tenses", "pretérito · imperfecto", "Telling a story in Spanish needs both past tenses. They do different jobs."], ["Preterite = it happened", "fui · comí · llegó", "Use the <b>preterite</b> for finished events and sudden changes: <b>De repente, sonó el teléfono</b>."], ["Imperfect = the scene", "iba · comía · era", "Use the <b>imperfect</b> for habits, descriptions and actions in progress: <b>Hacía sol y yo leía</b>."]] });
  const subjTrig = RW([
    ["Espero que tú ___ bien. (estar)", "estés", ["estás", "estar"]], ["Quiero que ellos ___ a la fiesta. (venir)", "vengan", ["vienen", "venir"]],
    ["Es importante que nosotros ___ temprano. (llegar)", "lleguemos", ["llegamos", "llegar"]], ["Dudo que ella ___ la verdad. (saber)", "sepa", ["sabe", "saber"]],
    ["Es posible que mañana ___ . (llover)", "llueva", ["llueve", "llover"]], ["Mi mamá quiere que yo ___ mi cuarto. (limpiar)", "limpie", ["limpio", "limpiar"]],
    ["Ojalá que ___ buen tiempo. (hacer)", "haga", ["hace", "hacer"]], ["Es verdad que ellos ___ aquí. (vivir; it is a fact)", "viven", ["vivan", "vivir"]],
    ["Recomiendo que tú ___ más agua. (beber)", "bebas", ["bebes", "beber"]]
  ], { h1: "Look at the first part of the sentence. Is it a wish, a doubt or a feeling, or is it a fact?", h2: "After wishes, doubts, advice and 'it is important that', use the wish form (subjunctive). After facts, use the normal form.",
    h3: "Example: \"Quiero que él ___ (cantar)\" uses <b>cante</b> (a wish). \"Sé que él ___ (cantar)\" uses <b>canta</b> (a fact). Now do yours.",
    slides: [["Wish form review", "que + ?", "After <b>que</b>, the verb changes depending on the first part of the sentence."], ["Wish form triggers", "quiero que · espero que · dudo que", "Use the wish form (subjunctive) after wishes, hopes, doubts, advice, <b>ojalá</b> and <b>es importante que</b>."], ["Facts stay normal", "es verdad que · sé que", "After facts and certainty (<b>es verdad que</b>, <b>sé que</b>), use the normal form."]] });
  const pronouns = RW([
    ["¿Ves la película? Sí, ___ veo.", "la", ["lo", "le"]], ["Doy el regalo a mi mamá. → ___ doy el regalo.", "Le", ["Lo", "La"]],
    ["Escribo la carta a Juan. → ___ escribo.", "Se la", ["Le la", "Lo la"]], ["¿Compraste los boletos? Sí, ___ compré.", "los", ["las", "les"]],
    ["Doy la tarea a los niños. → ___ doy la tarea.", "Les", ["Los", "Las"]], ["Veo a mis primas. → ___ veo.", "Las", ["Los", "Les"]],
    ["Mi papá me da el dinero. → Mi papá ___ da.", "me lo", ["lo me", "se lo"]], ["¿Tienes mi lápiz? Sí, ___ tengo.", "lo", ["la", "le"]],
    ["Mando las fotos a ti. → ___ mando.", "Te las", ["Las te", "Se las"]]
  ], { h1: "Which word does the pronoun replace: a thing or a person? Is it masculine, feminine, singular or plural?", h2: "Lo, la, los, las replace the THING (or a person you see). Le and les replace the person who RECEIVES. When le comes before lo or la, it becomes se.",
    h3: "Example: \"Veo el árbol\" → \"<b>Lo</b> veo\". \"Doy el libro a Rosa\" → \"<b>Se lo</b> doy\". Now do yours.",
    slides: [["Little words that replace", "lo · la · los · las", "<b>Lo, la, los, las</b> replace a thing. They match its gender and number: <b>Veo la luna → La veo</b>."], ["Who receives it?", "le · les · me · te", "<b>Le, les, me, te</b> show the person who receives: <b>Le doy un libro</b>."], ["Two together", "se lo · se la · me lo", "The receiver comes first, then the thing: <b>me lo</b>, <b>te la</b>. Never say <b>le lo</b>: it becomes <b>se lo</b>."]] });

  // ---------- sayings, phrases ----------
  const idioms1 = TR([
    ["Estar hecho polvo", "to be exhausted"], ["Quedarse en blanco", "to go blank (forget everything)"], ["Tirar la toalla", "to give up"], ["Ponerse colorado", "to blush"],
    ["Tener buena pinta", "to look good"], ["Pasar la noche en blanco", "to not sleep a wink"], ["Estar harto", "to be fed up"], ["Dar la lata", "to be a pest"]
  ], [["Sayings with a twist", "💬", "Many Spanish sayings do not mean what the words say. <b>Estar hecho polvo</b> is not about dust: it means <b>to be exhausted</b>."], ["Examples", "tirar la toalla<br>quedarse en blanco", "<b>Tirar la toalla</b> (throw the towel) = to give up. <b>Quedarse en blanco</b> (stay in white) = your mind goes blank on a test."], ["Learn the meaning", "🧠", "Learn each saying as one whole piece. Do not translate it word by word."]],
    "These sayings are not literal. Think about the whole meaning, not each word.");
  const foodCulture = RW([
    ["Paella is a rice dish famous in which country?", "Spain", ["Chile", "Cuba"]], ["Tacos and guacamole are famous foods from which country?", "Mexico", ["Spain", "Chile"]],
    ["Ceviche, fish \"cooked\" in lime juice, is a national dish of which country?", "Perú", ["Spain", "Cuba"]], ["Arepas, round corn cakes, are loved in Colombia and which other country?", "Venezuela", ["Spain", "Chile"]],
    ["Pupusas, thick tortillas filled with cheese or beans, are the national dish of which country?", "El Salvador", ["Spain", "Uruguay"]], ["Churros, long fried dough sticks, are often dipped in what?", "hot chocolate", ["soup", "salsa"]],
    ["Gazpacho is a cold Spanish soup made mostly from which vegetable?", "tomatoes", ["beans", "carrots"]], ["The Spanish tortilla (tortilla española) is made with eggs and what?", "potatoes", ["rice", "beans"]],
    ["Dulce de leche is a sweet spread. What is it made from?", "milk and sugar", ["rice and beans", "corn and cheese"]]
  ], { h1: "Think about where in the Spanish-speaking world the food is from, or what it is made of.", h2: "Rice and seafood go with the coast of Spain. Corn is a big food in Mexico and Central America. Seafood and lime go with the Pacific coast of South America.",
    h3: "Example: <b>Empanadas</b> are small pies with a filling. Many countries make them. Now do yours.",
    slides: [["Food is culture", "🍽️", "Every Spanish-speaking country has foods that tell its story. A recipe can show you the land, the sea and the history."], ["Foods and places", "paella · tacos · ceviche", "<b>Paella</b> (Spain), <b>tacos</b> (Mexico), <b>ceviche</b> (Perú), <b>arepas</b> (Colombia, Venezuela), <b>pupusas</b> (El Salvador)."], ["Sweet and simple", "churros · dulce de leche", "<b>Churros</b> are fried dough. <b>Dulce de leche</b> is caramel made from milk and sugar. <b>Gazpacho</b> is a cold tomato soup."]] });
  const postcard = TR([
    ["Querida abuela,", "Dear Grandma,"], ["Estoy de vacaciones en la playa.", "I am on vacation at the beach."], ["Lo estoy pasando muy bien.", "I am having a great time."], ["Te extraño mucho.", "I miss you a lot."],
    ["Ojalá estuvieras aquí.", "I wish you were here."], ["Escríbeme pronto.", "Write to me soon."], ["Con cariño,", "With love,"], ["Saludos a todos.", "Greetings to everyone."], ["Hace buen tiempo aquí.", "The weather is nice here."]
  ], [["Writing a postcard", "✉️", "A postcard is short and friendly. It says who you write to, where you are, and how you feel."], ["Open and close", "Querida · Con cariño", "Begin with <b>Querido</b> (to a boy) or <b>Querida</b> (to a girl). End with <b>Con cariño</b> or <b>Un abrazo</b>."], ["Say how it is going", "Lo estoy pasando muy bien", "<b>Lo estoy pasando bien</b> = I am having a good time. <b>Te extraño</b> = I miss you. <b>Ojalá estuvieras aquí</b> = I wish you were here."]],
    "Find the key words. Querida is a greeting and cariño is a loving closing.");

  const reading16 = RD([
    { t: "Marcos viajó con su familia a Cusco, en Perú. Llegaron al aeropuerto muy temprano porque su vuelo salía a las seis de la mañana. En el hotel, la recepcionista les dio las llaves de su habitación. Al día siguiente subieron en tren hasta Machu Picchu, una ciudad antigua de los incas. Marcos sacó muchas fotos y compró una pequeña llama de lana para su hermana.",
      qs: [["Where did Marcos travel?", "Perú", ["Chile", "Cuba"], "Find en Perú."], ["Why did they arrive early?", "their flight left at six", ["the hotel was closed", "it was raining"], "Find su vuelo salía."], ["What did Marcos buy for his sister?", "a little wool llama", ["a hat", "a book"], "Find compró."], ["What did they visit?", "an old Inca city", ["a beach", "a farm"], "Find ciudad antigua."]] },
    { t: "La astronauta Elena miraba la Tierra desde la estación espacial. Desde allí, el planeta parecía una canica azul. Cada día hacía experimentos con plantas y hacía ejercicio durante dos horas para mantener fuertes sus músculos. En su diario escribió: \"Cuidar la Tierra es cuidar nuestra casa.\"",
      qs: [["What did the Earth look like to Elena?", "a blue marble", ["a red ball", "a yellow coin"], "Find una canica azul."], ["Why does she exercise?", "to keep her muscles strong", ["to win a race", "to get hungry"], "Find para mantener."], ["What does she write in her diary?", "Taking care of Earth is taking care of our home", ["Space is too far", "I want to go home now"], "Find cuidar."]] },
    { t: "En la escuela de Lucía, los estudiantes empezaron un club de reciclaje. Pusieron tres cajas de colores: azul para el papel, verde para el vidrio y amarilla para el plástico. En un mes, recogieron más de doscientas botellas. Con el dinero de lo que vendieron, compraron plantas para el jardín de la escuela.",
      qs: [["What did the students start?", "a recycling club", ["a soccer team", "a band"], "Find club de reciclaje."], ["What color box is for paper?", "blue", ["green", "yellow"], "Find para el papel."], ["What did they buy with the money?", "plants for the garden", ["new computers", "pizza"], "Find compraron."], ["How many bottles did they collect?", "more than two hundred", ["about ten", "over a thousand"], "Find recogieron."]] },
    { t: "Antes de la imprenta, los libros se copiaban a mano y eran muy caros. Con la imprenta, que se inventó hace unos quinientos años, se podían hacer muchos libros rápidamente. Gracias a eso, más personas aprendieron a leer y las ideas viajaron más lejos. Hoy leemos libros en papel y también en pantallas.",
      qs: [["How were books made before the press?", "copied by hand", ["painted on walls", "spoken only"], "Find a mano."], ["What could the press do?", "make many books quickly", ["fly", "cook"], "Find muchos libros."], ["What happened because of it?", "more people learned to read", ["fewer books existed", "schools closed"], "Find aprendieron a leer."], ["How do we read today?", "on paper and on screens", ["only on paper", "only on stone"], "Find en papel y también."]] }
  ], [["Eighth grade is coming", "📖", "These stories are about trips, space, the planet and inventions. Read slowly and look for the people and the places first."], ["Use word families", "viajar → viaje · reciclar → reciclaje", "If you do not know a word, look for a part you know. <b>Reciclaje</b> comes from <b>reciclar</b>."], ["Match the question", "🔍", "Read the question, find the same words in the story, and read the sentence around them."]]);

  // ---------- level 17 ----------
  const indSubj = RW([
    ["Cuando ___ a casa, comeré algo. (llegar, yo; it has not happened yet)", "llegue", ["llego", "llegaba"]], ["Cuando ___ a casa, siempre como algo. (llegar, yo; every day)", "llego", ["llegue", "llegaré"]],
    ["Busco un libro que ___ interesante. (ser; I do not know if it exists)", "sea", ["es", "fue"]], ["Tengo un libro que ___ muy interesante. (ser; I have it)", "es", ["sea", "fuera"]],
    ["Aunque ___ frío mañana, saldremos. (hacer; maybe it will)", "haga", ["hace", "hizo"]], ["No creo que él ___ razón. (tener)", "tenga", ["tiene", "tenía"]],
    ["Creo que él ___ razón. (tener)", "tiene", ["tenga", "tuviera"]], ["Es obvio que ellos ___ cansados. (estar)", "están", ["estén", "estarían"]],
    ["Te lo explico otra vez para que tú ___ . (entender)", "entiendas", ["entiendes", "entendiste"]], ["Te llamo en cuanto ___ ella. (llegar; future)", "llegue", ["llega", "llegó"]]
  ], { h1: "Has it happened or is it certain, or is it unknown, not yet happened, or doubted?", h2: "Use the normal form for facts and routines. Use the wish form (subjunctive) for things not yet happened, unknown, doubted, or after 'para que'.",
    h3: "Example: \"Cuando ___ (comer) pan, soy feliz\" is a habit: <b>como</b>. \"Cuando ___ (comer) pan, seré feliz\" is future: <b>coma</b>. Now do yours.",
    slides: [["Normal or wish form?", "indicative ↔ subjunctive", "The same starting words can take two different verb forms. The meaning decides."], ["Not yet or unknown", "cuando + future · busco algo que...", "Use the <b>subjunctive</b> after <b>cuando</b> when the event is in the future, and when you talk about something you are not sure exists."], ["Facts and routines", "siempre · tengo · creo que", "Use the <b>normal form</b> for habits (<b>siempre</b>), things you have, and after <b>creo que</b> or <b>es obvio que</b>. After <b>no creo que</b>, switch back to the subjunctive."]] });
  const imperfMem = RW([
    ["Antes nosotros ___ buenos amigos. (ser)", "éramos", ["fuimos", "somos"]], ["Mis abuelos ___ al mercado cada sábado. (ir)", "iban", ["fueron", "van"]],
    ["De niño, yo ___ muchos dibujos animados. (ver)", "veía", ["vi", "veo"]], ["Cuando tú tenías cinco años, ___ muy tímido. (ser)", "eras", ["fuiste", "eres"]],
    ["Ella ___ al parque todos los veranos. (ir)", "iba", ["fue", "va"]], ["Nosotros ___ a nuestros primos cada domingo. (ver)", "veíamos", ["vimos", "vemos"]],
    ["Mi casa vieja ___ muy grande. (ser; description)", "era", ["fue", "es"]], ["Ustedes siempre ___ juntos a la escuela. (ir)", "iban", ["fueron", "van"]],
    ["Yo ___ la luna desde mi ventana cada noche. (ver)", "veía", ["vi", "veo"]]
  ], { h1: "This is a memory about long ago, a habit or a description. Which past tense tells memories?", h2: "Only three verbs are irregular in the imperfect: ser (era), ir (iba) and ver (veía). All other verbs follow the regular -aba / -ía endings.",
    h3: "Example: ser → <b>era, eras, era, éramos, eran</b>. ir → <b>iba, ibas, iba, íbamos, iban</b>. Now do yours.",
    slides: [["Memories: Cuando era niño...", "🧒", "To talk about how life used to be, use the <b>imperfect</b>."], ["Three irregular verbs", "ser · ir · ver", "<b>ser</b>: era, eras, era, éramos, eran. <b>ir</b>: iba, ibas, iba, íbamos, iban. <b>ver</b>: veía, veías, veía, veíamos, veían."], ["Everything else is regular", "-aba · -ía", "<b>-ar</b> verbs: -aba, -abas, -aba, -ábamos, -aban. <b>-er / -ir</b> verbs: -ía, -ías, -ía, -íamos, -ían."]] });
  const siClauses = RW([
    ["Si ___ mañana, nos quedaremos en casa. (llover)", "llueve", ["lloviera", "lloverá"]], ["Si ___ mucho dinero, viajaría. (tener, yo)", "tuviera", ["tengo", "tendré"]],
    ["Si estudias, ___ el examen. (aprobar)", "aprobarás", ["aprobarías", "aprobabas"]], ["Si yo fuera tú, ___ la verdad. (decir)", "diría", ["digo", "dije"]],
    ["Si ellos ___ temprano, llegarán a tiempo. (salir)", "salen", ["salieran", "saldrán"]], ["Si ella ___ más joven, correría el maratón. (ser)", "fuera", ["es", "será"]],
    ["Si ___ hambre, come una fruta. (tener, tú)", "tienes", ["tuvieras", "tendrás"]], ["Si pudiéramos volar, ___ a la luna. (ir, nosotros)", "iríamos", ["vamos", "fuimos"]],
    ["Si no ___ tarea, jugaré afuera. (tener, yo)", "tengo", ["tuviera", "tendría"]]
  ], { h1: "Is the 'if' something that could really happen, or just imaginary?", h2: "Real 'if': si + normal form, then future or command. Imaginary 'if': si + past wish form (-ra), then the conditional (-ía).",
    h3: "Example: \"Si ___ (llover), llevaré paraguas\" is real: <b>llueve</b>. \"Si ___ (ser) rico, compraría una isla\" is imaginary: <b>fuera</b>. Now do yours.",
    slides: [["If... then...", "si → ?", "Sentences with <b>si</b> (if) come in two kinds: real and imaginary."], ["Real: could happen", "si llueve, me quedaré", "Real: <b>si + present</b>, then the <b>future</b> or a command: <b>Si estudias, aprobarás</b>."], ["Imaginary: just a dream", "si tuviera, viajaría", "Imaginary: <b>si + past wish form</b> (tuviera), then the <b>conditional</b> (viajaría). Never put -ría after <b>si</b>."]] });
  const commands = RW([
    ["(tú) ___ la puerta, por favor. (cerrar)", "Cierra", ["Cierre", "Cerrar"]], ["(tú, no) No ___ tarde. (llegar)", "llegues", ["llegas", "llega"]],
    ["(usted) ___ por aquí, señora. (pasar)", "Pase", ["Pasa", "Pases"]], ["(tú) ___ la verdad. (decir)", "Di", ["Dice", "Dices"]],
    ["(tú) ___ aquí, por favor. (venir)", "Ven", ["Viene", "Vienes"]], ["(tú, no) No ___ eso. (hacer)", "hagas", ["haces", "haz"]],
    ["(ustedes) ___ su tarea. (hacer)", "Hagan", ["Hacen", "Haz"]], ["(tú) ___ amable con todos. (ser)", "Sé", ["Eres", "Sea"]],
    ["(usted) ___ cuidado. (tener)", "Tenga", ["Tiene", "Ten"]]
  ], { h1: "Who are you talking to: tú, usted or ustedes? And is it a yes command or a no command?", h2: "Tú yes-commands look like the él form (cierra), with 8 irregular ones. Usted, ustedes and all no-commands use the wish form.",
    h3: "Example: (tú) <b>Habla</b> más despacio. (usted) <b>Hable</b> más despacio. (tú, no) No <b>hables</b> tan rápido. Now do yours.",
    slides: [["Commands review", "¡Haz! ¡Haga! ¡No hagas!", "Which form to use depends on <b>who</b> you talk to and <b>yes or no</b>."], ["Tú, yes", "habla · come · ven · di · haz · sé", "Tú yes-commands copy the <b>él</b> form (<b>cierra</b>). Eight are special: <b>di, haz, ve, ten, sal, sé, pon, ven</b>."], ["Everything else", "hable · no hables · hagan", "<b>Usted, ustedes</b> and every <b>no</b> command use the wish form: <b>pase, hagan, no llegues</b>."]] });
  const questionWords = RW([
    ["Which word needs an accent mark? <b>¿Donde vives?</b>", "Donde", ["vives", "Es"]], ["Which word needs an accent mark? <b>¿Como te llamas?</b>", "Como", ["llamas", "te"]],
    ["Which word needs an accent mark? <b>Dime que quieres comer.</b>", "que", ["Dime", "comer"]], ["Which word needs an accent mark? <b>¿Quien es tu amigo?</b>", "Quien", ["amigo", "es"]],
    ["Which word needs an accent mark? <b>¿Cuando es la fiesta?</b>", "Cuando", ["fiesta", "es"]], ["Which word needs an accent mark? <b>Pregunto donde vive Ana.</b>", "donde", ["Pregunto", "vive"]],
    ["Which word needs an accent mark? <b>¿Cuanto cuesta el libro?</b>", "Cuanto", ["cuesta", "libro"]], ["Which word needs an accent mark? <b>¿Por que lloras?</b>", "que", ["Por", "lloras"]],
    ["Which word needs an accent mark? <b>Quiero saber quien llegó.</b>", "quien", ["saber", "llegó"]]
  ], { h1: "Look for the word that asks a question, or hides a question inside the sentence.", h2: "Question words (qué, cómo, dónde, cuándo, quién, cuánto) take an accent, also inside sentences like 'Dime...' or 'Pregunto...'. Other words do not.",
    h3: "Example: in \"¿Cual es tu color?\" the word <b>Cual</b> needs the accent (¿Cuál...?). In \"Dime adonde vas\" the word after Dime needs it too. Now do yours.",
    slides: [["Accents on question words", "qué · cómo · dónde", "Question words always carry an accent: <b>¿Qué? ¿Cómo? ¿Dónde? ¿Cuándo? ¿Quién?</b>"], ["Hidden questions", "No sé qué hacer", "Even inside a statement, if you ask something inside, keep the accent: <b>No sé dónde vive</b>."], ["Connecting words", "que · donde · cuando · porque", "When the word just joins parts (<b>la casa donde vivo</b>, <b>porque estoy cansado</b>), there is no accent. <b>Por qué</b> (why) is two words."]] });
  const refranes = TR([
    ["Camarón que se duerme se lo lleva la corriente.", "If you fall asleep, you lose out."], ["En boca cerrada no entran moscas.", "Silence is golden."], ["Al mal tiempo, buena cara.", "Face hard times with a smile."],
    ["El que madruga, Dios lo ayuda.", "The early bird gets the worm."], ["Perro que ladra no muerde.", "His bark is worse than his bite."], ["Dime con quién andas y te diré quién eres.", "You are known by the company you keep."],
    ["A buen entendedor, pocas palabras.", "A wise person needs few words."], ["No hay mal que por bien no venga.", "Every cloud has a silver lining."], ["Quien mucho abarca, poco aprieta.", "Do not take on too much."]
  ], [["Wise sayings", "📜", "A <b>refrán</b> is a short saying that holds wisdom, passed down for hundreds of years. Spanish speakers use them every day."], ["Examples", "Al mal tiempo, buena cara", "<b>Al mal tiempo, buena cara</b> = when times are hard, keep a happy face. <b>El que madruga...</b> = the early bird gets the worm."], ["Meaning, not words", "🧠", "Do not translate a refrán word by word. Ask: what lesson is it teaching?"]],
    "A saying teaches a lesson. Find the key words, then think what lesson fits.");
  const musicDance = RW([
    ["Flamenco is a passionate music and dance from which country?", "Spain", ["Chile", "Cuba"]], ["Tango was born near Buenos Aires, in which country?", "Argentina", ["Spain", "Mexico"]],
    ["Mariachi bands with trumpets, violins and guitars come from which country?", "Mexico", ["Perú", "Spain"]], ["Merengue and bachata are popular music from which country?", "the Dominican Republic", ["Chile", "Spain"]],
    ["Cumbia, a dance with drums, began in which country?", "Colombia", ["Spain", "Japan"]], ["Salsa has roots in the music of Cuba and which other island?", "Puerto Rico", ["Iceland", "Ireland"]],
    ["A classical Spanish guitar has how many strings?", "6", ["4", "12"]], ["Dancers click castanets (castañuelas) when they dance which style?", "flamenco", ["tango", "mariachi"]],
    ["The charango is a small stringed instrument from which mountains?", "the Andes", ["the Alps", "the Himalayas"]]
  ], { h1: "Think about the region and the sound. Which country is known for each kind of music?", h2: "Flamenco is from the south of Spain. Tango is from the Río de la Plata. Mariachi is from Jalisco in western Mexico.",
    h3: "Example: <b>Samba</b> is a lively dance from Brazil, where people speak Portuguese. Now do yours.",
    slides: [["Music of the Spanish world", "🎵", "Every Spanish-speaking region has music and dances. They tell stories about its people and history."], ["Famous styles", "flamenco · tango · mariachi", "<b>Flamenco</b> (Spain), <b>tango</b> (Argentina), <b>mariachi</b> (Mexico), <b>cumbia</b> (Colombia), <b>merengue</b> (Dominican Republic)."], ["Instruments", "🎸 guitarra · charango", "The <b>guitarra</b> came to be loved in Spain. The <b>charango</b> comes from the Andes. <b>Castañuelas</b> click in flamenco."]] });
  const essay = TR([
    ["En mi opinión,", "In my opinion,"], ["Para empezar,", "To begin with,"], ["Por ejemplo,", "For example,"], ["Además,", "Also,"], ["Por un lado... por otro lado...", "On one hand... on the other hand..."],
    ["En resumen,", "In summary,"], ["Por último,", "Lastly,"], ["En conclusión,", "In conclusion,"], ["Estoy de acuerdo.", "I agree."], ["No estoy de acuerdo.", "I disagree."]
  ], [["Building a paragraph", "📝", "A good paragraph has a start, a middle and an end. Special phrases show the reader where you are."], ["Start and middle", "Para empezar · Por ejemplo · Además", "<b>Para empezar</b> opens. <b>Por ejemplo</b> gives an example. <b>Además</b> adds one more idea."], ["Finish strong", "Por último · En conclusión", "<b>Por último</b> introduces the last point. <b>En conclusión</b> and <b>En resumen</b> wrap everything up."]],
    "Think about where in an essay the phrase would go: beginning, middle, or end?");
  const reading17 = RD([
    { t: "Daniel se despertó con fiebre y tos. Su mamá lo llevó a la clínica, donde la enfermera le tomó la temperatura. El doctor dijo que tenía un resfriado y que debía descansar, beber mucha agua y tomar la medicina dos veces al día. Después de tres días, Daniel se sintió mucho mejor y volvió a la escuela.",
      qs: [["What was wrong with Daniel at first?", "a fever and a cough", ["a broken arm", "a toothache"], "Find fiebre y tos."], ["What did the nurse do?", "took his temperature", ["gave him a toy", "cooked lunch"], "Find la enfermera."], ["How often should he take medicine?", "twice a day", ["once a week", "every hour"], "Find veces al día."], ["When did he go back to school?", "after three days", ["the next morning", "after a month"], "Find Después de."]] },
    { t: "El equipo de Valeria jugó la final del campeonato en el estadio de la ciudad. Al principio perdían uno a cero, pero en el segundo tiempo Valeria metió dos goles. El entrenador estaba tan contento que abrazó a todas las jugadoras. Al final, recibieron una medalla y una copa. Valeria dijo: \"Ganamos porque jugamos como un equipo\".",
      qs: [["Where was the final played?", "in the city stadium", ["at the beach", "at school"], "Find el estadio."], ["How many goals did Valeria score?", "two", ["one", "five"], "Find dos goles."], ["Why did they win, according to Valeria?", "they played as a team", ["the referee helped", "the weather was nice"], "Find Ganamos porque."], ["What did the players receive?", "a medal and a cup", ["a car", "a pizza"], "Find recibieron."]] },
    { t: "Mi abuela tiene un jardín grande con flores, tomates y hierbas. En primavera planta las semillas y las riega cada mañana. Me enseñó que las raíces toman agua de la tierra y las hojas reciben la luz del sol. En verano recogemos la cosecha y hacemos una ensalada fresca. Dice que la paciencia es el secreto de un buen jardín.",
      qs: [["When does grandmother plant seeds?", "in spring", ["in winter", "in autumn"], "Find En primavera."], ["What do the roots take?", "water from the soil", ["sunlight", "wind"], "Find las raíces."], ["What do the leaves receive?", "sunlight", ["milk", "sand"], "Find las hojas."], ["What is the secret of a good garden?", "patience", ["money", "speed"], "Find el secreto."]] },
    { t: "Sofía vive en una ciudad grande y va a la escuela en metro. Antes, su papá la llevaba en carro, pero había mucho tráfico y siempre llegaban tarde. Ahora ella camina hasta la estación, cruza el puente por la acera y toma el tren a las siete y media. Dice que el metro es rápido, barato y mejor para el planeta.",
      qs: [["How does Sofía go to school now?", "by subway", ["by boat", "by plane"], "Find en metro."], ["Why did they stop going by car?", "there was a lot of traffic", ["the car broke", "it was too far"], "Find había mucho tráfico."], ["What time is her train?", "7:30", ["6:00", "9:15"], "Find a las siete y media."], ["What does she say about the subway?", "it is fast, cheap and better for the planet", ["it is slow and loud", "it is too expensive"], "Find rápido, barato."]] }
  ], [["Longer stories", "📖", "These stories use many tenses and joining words. Read the first sentence to find out who and where."], ["Clues", "pero · porque · ahora", "<b>Pero</b> (but) shows a change. <b>Porque</b> (because) gives a reason. <b>Ahora</b> (now) compares with before."], ["Strategy", "🔍", "Read the question first, find the matching words in the story, and read the whole sentence around them."]]);

  // ---------- level 18 ----------
  const mente = RW([
    ["Make an adverb from <b>rápido</b> (fast): ___", "rápidamente", ["rápidomente", "rápidamento"]], ["Make an adverb from <b>fácil</b> (easy): ___", "fácilmente", ["fácilamente", "fáciles"]],
    ["Make an adverb from <b>feliz</b> (happy): ___", "felizmente", ["felizamente", "felicemente"]], ["Make an adverb from <b>claro</b> (clear): ___", "claramente", ["claromente", "claramento"]],
    ["Make an adverb from <b>lento</b> (slow): ___", "lentamente", ["lentomente", "lentomento"]], ["Make an adverb from <b>tranquilo</b> (calm): ___", "tranquilamente", ["tranquilomente", "tranquilamento"]],
    ["Make an adverb from <b>cuidadoso</b> (careful): ___", "cuidadosamente", ["cuidadosomente", "cuidadosamento"]], ["Make an adverb from <b>triste</b> (sad): ___", "tristemente", ["tristamente", "tristomente"]],
    ["Make an adverb from <b>final</b>: ___ (at last)", "finalmente", ["finalamente", "finalomente"]], ["Make an adverb from <b>general</b>: ___ (usually)", "generalmente", ["generalomente", "generalamente"]]
  ], { h1: "Start with the adjective. What happens to the -o ending of a masculine adjective before -mente?", h2: "Use the feminine form of the adjective, then add -mente. Adjectives ending in -e, -l or -z do not change. Accents stay.",
    h3: "Example: <b>lento</b> → lenta → <b>lentamente</b>. <b>valiente</b> → <b>valientemente</b>. Now do yours.",
    slides: [["Adverbs with -mente", "lento → lentamente", "In English you add <b>-ly</b>. In Spanish you add <b>-mente</b> to the feminine form of an adjective."], ["How to build one", "claro → clara + mente", "<b>claro → claramente</b>. <b>fácil → fácilmente</b> (no change). <b>feliz → felizmente</b>. The accent of the adjective stays: <b>rápido → rápidamente</b>."], ["Use them to describe actions", "Habla claramente.", "<b>Habla claramente</b> = speak clearly. <b>Corre rápidamente</b> = runs fast. They tell how something is done."]] });
  const perfects = RW([
    ["Ya ___ la tarea cuando mamá llegó. (hacer, yo)", "había hecho", ["he hecho", "habré hecho"]], ["Hoy yo ___ tres libros. (leer)", "he leído", ["había leído", "habría leído"]],
    ["Para mañana ___ el proyecto. (terminar, nosotros)", "habremos terminado", ["hemos terminado", "habíamos terminado"]], ["Si hubiera estudiado, ___ el examen. (aprobar, yo)", "habría aprobado", ["he aprobado", "había aprobado"]],
    ["¿Alguna vez ___ a México? (ir, tú)", "has ido", ["habías ido", "habrás ido"]], ["Cuando llegué, el tren ya ___ . (salir)", "había salido", ["ha salido", "habrá salido"]],
    ["Espero que ella ya ___ llegado. (haber)", "haya", ["ha", "había"]], ["Mañana a esta hora ya ___ en casa. (llegar, yo)", "habré llegado", ["he llegado", "había llegado"]]
  ], { h1: "When does the action fit in time: before now, before a past moment, before a future moment, or in an imaginary 'if'?", h2: "he/has/ha = up to now. había = before a past moment. habré = before a future moment. habría = would have. haya = after wishes.",
    h3: "Example: \"Ayer ya ___ (comer)\" → <b>había comido</b>. \"Hoy ___ (comer)\" → <b>he comido</b>. \"Mañana ya ___ (comer)\" → <b>habré comido</b>. Now do yours.",
    slides: [["The perfect family", "haber + done word", "All the perfect tenses use <b>haber</b> plus a done word (comido, hecho). The form of <b>haber</b> shows the time."], ["Which time?", "he · había · habré · habría", "<b>he comido</b> (have eaten), <b>había comido</b> (had eaten), <b>habré comido</b> (will have eaten), <b>habría comido</b> (would have eaten)."], ["Wish form", "haya · hubiera", "<b>Espero que haya llegado</b> (I hope he has arrived). <b>Si hubiera sabido...</b> (If I had known...)."]] });
  const gender = RW([
    ["Pick the right word: ___ mapa", "el", ["la", "lo"], "Many words that end in -a but come from Greek, like mapa, are masculine."], ["Pick the right word: ___ mano", "la", ["el", "lo"], "Mano is a shortened word and it is feminine, even though it ends in -o."],
    ["Pick the right word: ___ problema", "el", ["la", "lo"], "Words ending in -ma are usually masculine."], ["Pick the right word: ___ foto", "la", ["el", "lo"], "Foto is short for fotografía, a feminine word."],
    ["Pick the right word: ___ idioma", "el", ["la", "lo"], "Words ending in -ma are usually masculine."], ["Pick the right word: ___ día", "el", ["la", "lo"], "Día ends in -a but it is masculine."],
    ["Pick the right word: ___ moto", "la", ["el", "lo"], "Moto is short for motocicleta, a feminine word."], ["Pick the right word: ___ clima", "el", ["la", "lo"], "Words ending in -ma are usually masculine."],
    ["Pick the right word: ___ planeta", "el", ["la", "lo"], "Planeta ends in -a but it is masculine."], ["Pick the right word: ___ radio (the device)", "la", ["el", "lo"], "Radio is a feminine word in most places, like la televisión."]
  ], { h1: "The ending does not always tell the gender. Think about the word's origin or its long form.", h2: "Masculine surprises: words in -ma (problema, tema), día, mapa, planeta. Feminine surprises: mano, foto, moto.",
    h3: "Example: <b>el sistema</b> (a -ma word), <b>la radio</b> (short word). Now do yours.",
    slides: [["Gender surprises", "el mapa · la mano", "Usually -o is masculine and -a is feminine, but some words break the pattern."], ["Masculine with -a", "el día · el mapa · el problema", "<b>el día, el mapa, el planeta, el clima</b>, and words ending in <b>-ma</b> like <b>el problema, el tema, el idioma, el sistema</b>."], ["Feminine with -o", "la mano · la foto · la moto", "<b>la mano, la foto, la moto, la radio</b>. Some are short for longer feminine words: <b>fotografía, motocicleta</b>."]] });
  const verbPrep = RW([
    ["Sueño ___ viajar a España.", "con", ["de", "a"]], ["Dependo ___ mis padres.", "de", ["con", "en"]], ["Pienso ___ mis vacaciones.", "en", ["de", "a"]],
    ["Aprendo ___ nadar.", "a", ["de", "en"]], ["Acabo ___ llegar.", "de", ["a", "en"]], ["Ella insiste ___ ayudar.", "en", ["a", "con"]],
    ["Cuento ___ ti para el proyecto.", "con", ["en", "de"]], ["Trato ___ hacer mi mejor trabajo.", "de", ["en", "a"]],
    ["Me acuerdo ___ ese día.", "de", ["a", "con"]], ["Ayudo a mi hermano ___ estudiar.", "a", ["de", "en"]]
  ], { h1: "Some verbs always travel with one little word. You just have to remember the pair.", h2: "Soñar con, depender de, pensar en, aprender a, acabar de, insistir en, contar con, tratar de, acordarse de, ayudar a.",
    h3: "Example: \"Confío ___ ti\" uses <b>en</b> (confiar en). \"Empiezo ___ leer\" uses <b>a</b> (empezar a). Now do yours.",
    slides: [["Verb partners", "soñar con · pensar en", "Many Spanish verbs need a little word after them. It is often different from English."], ["Learn the pairs", "con · de · en · a", "<b>soñar con</b> (dream of), <b>depender de</b>, <b>pensar en</b>, <b>contar con</b> (count on), <b>acordarse de</b>."], ["Before another verb", "acabar de · aprender a", "<b>acabar de</b> (just did), <b>tratar de</b> (try to), <b>aprender a</b>, <b>ayudar a</b>, <b>insistir en</b>."]] });
  const superl = RW([
    ["Este perro es ___ que aquel. (better)", "mejor", ["más bueno", "mejores"]], ["Mi hermano tiene 12 años y yo 10: él es ___ que yo. (older)", "mayor", ["más mayor", "mayores"]],
    ["Esta película es ___ que la otra. (worse)", "peor", ["más malo", "peores"]], ["Pedro es ___ alto de la clase. (the tallest)", "el más", ["más", "la más"]],
    ["Ana es ___ simpática de todas. (the nicest)", "la más", ["el más", "más"]], ["Mi hermana tiene 8 años y yo 10: ella es ___ que yo. (younger)", "menor", ["más menor", "menos"]],
    ["Soy tan alto ___ mi papá. (as tall as)", "como", ["que", "de"]], ["Tengo tantos libros ___ tú. (as many as)", "como", ["que", "de"]],
    ["Fue ___ día de mi vida. (the best)", "el mejor", ["el más bueno", "mejor"]]
  ], { h1: "Are you comparing two things, or picking the top one? Does the word match masculine or feminine?", h2: "Special words: bueno → mejor, malo → peor, viejo (age) → mayor, joven → menor. Top one: el / la / los / las + más + adjective.",
    h3: "Example: \"Ella es ___ lista de la clase\" → <b>la más</b>. \"Esta sopa es ___ que esa\" (better) → <b>mejor</b>. Now do yours.",
    slides: [["Comparing", "más ... que · tan ... como", "<b>más que</b> (more than), <b>menos que</b>, <b>tan... como</b> (as... as), <b>tanto/a/os/as... como</b> (as much/many as)."], ["Special comparisons", "mejor · peor · mayor · menor", "<b>bueno → mejor</b>, <b>malo → peor</b>, <b>mayor</b> (older), <b>menor</b> (younger). Never say <i>más bueno</i>."], ["The best of all", "el más · la más · el mejor", "Add <b>el / la / los / las</b> before: <b>el más alto</b>, <b>la más simpática</b>, <b>el mejor</b> (the best)."]] });
  const idioms2 = TR([
    ["Meter la pata", "to make a blunder"], ["Ir al grano", "to get to the point"], ["Ser uña y carne", "to be inseparable best friends"], ["No tener pelos en la lengua", "to speak your mind"],
    ["Tirar la casa por la ventana", "to spend big on something special"], ["Dar gato por liebre", "to trick someone with a fake"], ["Hacer la vista gorda", "to pretend not to see"], ["Ahogarse en un vaso de agua", "to get upset over something small"]
  ], [["More sayings", "💬", "Spanish loves colorful sayings. <b>Meter la pata</b> (put the paw in) means to make a blunder."], ["Examples", "ir al grano<br>ser uña y carne", "<b>Ir al grano</b> (go to the grain) = get to the point. <b>Ser uña y carne</b> (be nail and flesh) = to be best friends."], ["Use them", "🗣️", "Native speakers use these every day. Listen for them in songs and shows, and learn each one as a whole piece."]],
    "These sayings are not literal. Think about the whole meaning, not each word.");
  const inEnglish = RW([
    ["English <b>canyon</b> comes from the Spanish word...", "cañón", ["canción", "campo"]], ["English <b>vanilla</b> comes from the Spanish word...", "vainilla", ["villa", "valle"]],
    ["English <b>lasso</b> comes from the Spanish word...", "lazo", ["lago", "lana"]], ["English <b>alligator</b> comes from the Spanish <b>el lagarto</b>, which means...", "the lizard", ["the lake", "the alley"]],
    ["The word <b>armadillo</b> means \"little ___ one\" in Spanish.", "armored", ["striped", "speedy"]], ["The word <b>mosquito</b> means \"little ___\" in Spanish.", "fly", ["mouse", "bee"]],
    ["The word <b>sombrero</b> comes from <b>sombra</b>, which means...", "shade", ["sun", "head"]], ["The English word <b>stampede</b> comes from the Spanish word...", "estampida", ["estación", "escalera"]],
    ["The English word <b>patio</b> is the Spanish word for a...", "courtyard", ["roof", "kitchen"]]
  ], { h1: "Say the English word out loud, then say the Spanish one. Which one sounds like it?", h2: "Many English words come from Spanish, especially for animals, land and ranch life in the American Southwest.",
    h3: "Example: English <b>plaza</b> is the Spanish word for a town square. Now do yours.",
    slides: [["Spanish hides in English", "canyon · patio · plaza", "Millions of English words come from Spanish. Some look almost the same!"], ["Look closer", "mosquito = little fly", "<b>Mosquito</b> means little fly (mosca). <b>Armadillo</b> means little armored one. <b>Sombrero</b> comes from shade (sombra)."], ["More", "vainilla · lazo · estampida", "<b>Vainilla</b> became <i>vanilla</i>, <b>lazo</b> became <i>lasso</i>, <b>cañón</b> became <i>canyon</i>."]] });
  const natureLA = RW([
    ["The Andes are the longest ___ range on land.", "mountain", ["desert", "river"]], ["The Amazon is the world's largest tropical ___ .", "rainforest", ["desert", "ocean"]],
    ["The Atacama in Chile is one of the driest ___ on Earth.", "deserts", ["forests", "lakes"]], ["Lake Titicaca lies between Perú and which country?", "Bolivia", ["Chile", "Argentina"]],
    ["The Pampas are wide grasslands in which country?", "Argentina", ["Cuba", "Spain"]], ["Aconcagua, the tallest mountain in the Americas, is in which country?", "Argentina", ["Mexico", "Cuba"]],
    ["The Galápagos Islands, home of giant tortoises, belong to which country?", "Ecuador", ["Spain", "Cuba"]], ["Iguazú Falls lie on the border of Argentina and which country?", "Brazil", ["Chile", "Spain"]],
    ["Patagonia is a cool, windy region at the ___ of South America.", "south", ["north", "center"]]
  ], { h1: "Picture a map of South America. Where is each place, and what kind of land is it?", h2: "The Andes run along the west coast. The Amazon is in the north-center. Patagonia is at the very bottom.",
    h3: "Example: <b>Machu Picchu</b> is an Inca city high in the Andes of Perú. Now do yours.",
    slides: [["Wild places", "🏔️ 🌴 🏜️", "Latin America has some of the most amazing nature on Earth: mountains, rainforests, deserts and lakes."], ["Big places", "Andes · Amazon · Atacama", "The <b>Andes</b> (longest mountain range on land), the <b>Amazon</b> (largest rainforest), the <b>Atacama</b> (one of the driest deserts)."], ["More to know", "Titicaca · Pampas · Galápagos", "<b>Lake Titicaca</b> (Perú and Bolivia), the <b>Pampas</b> (Argentina), the <b>Galápagos</b> (Ecuador), <b>Iguazú Falls</b> (Argentina and Brazil)."]] });
  const storyStart = TR([
    ["Había una vez...", "Once upon a time..."], ["De repente...", "Suddenly..."], ["Mientras tanto...", "Meanwhile..."], ["Al día siguiente...", "The next day..."], ["Por fin...", "At last..."],
    ["Desde entonces...", "Since then..."], ["Poco a poco...", "Little by little..."], ["Al final...", "In the end..."], ["Años después...", "Years later..."]
  ], [["Telling a story", "📚", "A good story uses joining phrases to move through time. They guide the reader from start to end."], ["Start and change", "Había una vez · De repente", "<b>Había una vez</b> opens a story. <b>De repente</b> shows a sudden change."], ["Time passes", "Mientras tanto · Al día siguiente · Por fin", "<b>Mientras tanto</b> (meanwhile), <b>al día siguiente</b> (the next day), <b>por fin</b> (at last), <b>desde entonces</b> (since then)."]],
    "Think about when in a story you would say it: beginning, middle, or end?");
  const reading18 = RD([
    { t: "Carmen quiere ser periodista. Cada semana escribe un artículo para el periódico de su escuela. Antes de escribir, hace una encuesta y entrevista a sus compañeros. Su maestro le enseñó que un buen titular debe ser corto y claro, y que una noticia siempre debe ser verdadera. Carmen revisa cada dato dos veces antes de publicar.",
      qs: [["What does Carmen want to be?", "a journalist", ["a doctor", "a pilot"], "Find periodista."], ["What does she do before writing?", "a survey and interviews", ["a nap", "a trip"], "Find Antes de escribir."], ["A good headline must be...", "short and clear", ["long and funny", "secret"], "Find un buen titular."], ["How many times does she check each fact?", "twice", ["once", "ten times"], "Find dos veces."]] },
    { t: "En el siglo diecinueve, varios países de América Latina buscaron su independencia de España. México celebra su independencia el 16 de septiembre. Hoy, esos países son repúblicas con sus propios gobiernos y banderas. Aunque sus historias son diferentes, todos comparten el idioma español y muchas tradiciones.",
      qs: [["In which century did these countries seek independence?", "the nineteenth century", ["the fifteenth century", "the twenty-first century"], "Find siglo diecinueve."], ["When does Mexico celebrate independence?", "September 16", ["January 1", "July 4"], "Find el 16 de."], ["What are these countries today?", "republics with their own governments", ["part of one empire", "colonies"], "Find repúblicas."], ["What do they share?", "the Spanish language and traditions", ["the same flag", "the same weather"], "Find comparten."]] },
    { t: "Todos los sábados, Tomás es voluntario en un banco de alimentos de su barrio. Ayuda a clasificar las latas y a preparar bolsas de comida para las familias. Al principio estaba nervioso, pero ahora conoce a todos los voluntarios. Tomás cree que ayudar a otros no es una obligación, sino una oportunidad para ser generoso. Su sueño es organizar una colecta en toda su escuela.",
      qs: [["When does Tomás volunteer?", "every Saturday", ["every day", "once a year"], "Find Todos los sábados."], ["What does he do there?", "sorts cans and prepares food bags", ["cooks dinner", "fixes cars"], "Find clasificar las latas."], ["How does Tomás see helping others?", "as a chance to be generous", ["as a punishment", "as a game"], "Find una oportunidad."], ["What is his dream?", "to organize a fundraiser at his school", ["to be a chef", "to move away"], "Find organizar una colecta."]] },
    { t: "Un grupo de estudiantes hizo un experimento con imanes. Descubrieron que los polos iguales se rechazan y los polos opuestos se atraen. Después construyeron un carrito que se movía con la fuerza de un imán. Midieron su velocidad tres veces y escribieron los resultados en una tabla. Concluyeron que repetir las medidas hace los datos más confiables.",
      qs: [["What do equal poles do?", "push each other away", ["attract each other", "melt"], "Find se rechazan."], ["What do opposite poles do?", "attract each other", ["push each other away", "disappear"], "Find se atraen."], ["How many times did they measure the speed?", "three times", ["once", "ten times"], "Find tres veces."], ["What did they conclude?", "repeating measurements makes data more reliable", ["magnets are heavy", "tables are boring"], "Find Concluyeron."]] }
  ], [["Long reading", "📖", "Eighth-grade stories have longer sentences and more ideas. Break each one into small parts."], ["Look for", "aunque · pero · después", "<b>Aunque</b> (although), <b>pero</b> (but) and <b>después</b> (after) show how ideas connect."], ["Strategy", "🔍", "Read the question, find the matching words, then check the answers against the story. Cross out answers that cannot be right."]]);

  // ---------- typing banks ----------
  const L16B = [TRAVEL, HOTEL, RESTO, TECH, SPACE, ENVIRO, INVENT, HOBBY].flatMap(b => b.items);
  const L17B = [KITCHEN, SPORTS, MED, CITY, SHOP, OFFICE, PLANTS].flatMap(b => b.items);
  const L18B = [ORGANS, PHYS, HISTW, NEWSW, CHARITY, VALUES].flatMap(b => b.items);

  // ======================= LEVEL 16 =======================
  const t16 = TYE(L16B, "travel, space, technology, hobbies and more");
  const L16 = [
    XL("Travel and airports", V(TRAVEL)), XL("At the hotel", V(HOTEL)), XL("At the restaurant", V(RESTO)), XL("Technology", V(TECH)),
    XL("Space", V(SPACE)), XL("Helping the planet", V(ENVIRO)), XL("Inventions", V(INVENT)), XL("Hobbies", V(HOBBY)),
    XL("Ser or estar?", serEstar), XL("Por or para?", porPara), XL("Finished or ongoing?", pretImp), XL("Wish form review", subjTrig),
    XL("Replacing with little words", pronouns), XL("Sayings with a twist", idioms1), XL("Foods of the Spanish world", foodCulture), XL("Type it in Spanish", t16),
    XL("Writing a postcard", postcard), XL("Reading: trips and inventions", reading16),
    XL("Mixed practice", MIX([serEstar, porPara, pretImp, subjTrig, pronouns, V(TRAVEL), V(SPACE)])),
    XL("Level 16 Challenge", MIX([V(TRAVEL), V(HOTEL), V(RESTO), V(TECH), V(SPACE), V(ENVIRO), V(INVENT), V(HOBBY), serEstar, porPara, pretImp, subjTrig, pronouns, idioms1, foodCulture, postcard, reading16]))
  ];

  // ======================= LEVEL 17 =======================
  const t17 = TYE(L17B, "the kitchen, sports, health, the city and work");
  const L17 = [
    XL("In the kitchen", V(KITCHEN)), XL("Sports and teams", V(SPORTS)), XL("Health and the doctor", V(MED)), XL("Getting around the city", V(CITY)),
    XL("Shopping", V(SHOP)), XL("Work and offices", V(OFFICE)), XL("Plants and gardens", V(PLANTS)), XL("Time words", V(TIMEW)),
    XL("Normal or wish form?", indSubj), XL("When I was little", imperfMem), XL("Real or imaginary 'if'", siClauses), XL("Commands review", commands),
    XL("Question words and accents", questionWords), XL("Wise sayings", refranes), XL("Music and dance", musicDance), XL("Type it in Spanish", t17),
    XL("Essay phrases", essay), XL("Reading: city, sport and garden", reading17),
    XL("Mixed practice", MIX([indSubj, imperfMem, siClauses, commands, questionWords, V(MED), V(CITY)])),
    XL("Level 17 Challenge", MIX([V(KITCHEN), V(SPORTS), V(MED), V(CITY), V(SHOP), V(OFFICE), V(PLANTS), V(TIMEW), indSubj, imperfMem, siClauses, commands, questionWords, refranes, musicDance, essay, reading17]))
  ];

  // ======================= LEVEL 18 =======================
  const t18 = TYE(L18B, "the body, physics, history, news and values");
  const L18 = [
    XL("Inside the body", V(ORGANS)), XL("Physics words", V(PHYS)), XL("History words", V(HISTW)), XL("News and media", V(NEWSW)),
    XL("Helping others", V(CHARITY)), XL("Values and virtues", V(VALUES)), XL("Thinking verbs", V(THINKV)), XL("Adverbs with -mente", mente),
    XL("All the perfect tenses", perfects), XL("Gender surprises", gender), XL("Verbs with little partners", verbPrep), XL("Better, worst, the most", superl),
    XL("More sayings", idioms2), XL("Spanish hiding in English", inEnglish), XL("Wild Latin America", natureLA), XL("Type it in Spanish", t18),
    XL("Story phrases", storyStart), XL("Reading: news, history and science", reading18),
    XL("Mixed practice", MIX([mente, perfects, gender, verbPrep, superl, V(VALUES), V(HISTW)])),
    XL("Level 18 Challenge", MIX([V(ORGANS), V(PHYS), V(HISTW), V(NEWSW), V(CHARITY), V(VALUES), V(THINKV), mente, perfects, gender, verbPrep, superl, idioms2, inEnglish, natureLA, storyStart, reading18]))
  ];

  Object.assign(SPANISH_LEVELS, { 16: L16, 17: L17, 18: L18 });
})();
