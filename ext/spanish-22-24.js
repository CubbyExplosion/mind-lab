// ext/spanish-22-24.js  Mind Lab Spanish, levels 22-24 (60 lessons)
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
        hints: ["Look at the picture. What idea does it show?", `The Spanish word starts with "${L1(es)}".`, `Example: ${exs[2] || "another picture"} is "${exs[0]}" in Spanish. Now find yours.`] };
    };
    f.teach = () => [
      { h: bank.name, v: bank.items.slice(0, 3).map(x => x[2] || "💬").join(" "), t: `Today's topic: <b>${bank.name.toLowerCase()}</b>. These words appear in essays, readings and conversations.` },
      { h: "Learn the words", v: bank.items.map(x => word(x[0], x[1], x[2])).join("<br>"), t: "<b>Tap any line to hear it</b> and say it out loud!" },
      { h: "How to remember", v: "🧠", t: tip || "Use each word in your own sentence. Look for English cousins (many come from Latin) and cover the English to test yourself." }
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
      { h: "Accents are optional", v: "á é í ó ú ñ", t: "You can leave the accents off: <b>conclusión</b> and <b>conclusion</b> both count." },
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
        hints: ["Read (or listen to) the text again slowly, a few words at a time. Find the words you already know.", c || "Find the part of the text that matches the question. Look for the key words.",
          "Example: if a text says \"Ana come pan en la cocina\", the question \"What does Ana eat?\" is answered by finding the words after \"come\". Now do yours."] };
    };
    f.teach = () => S3(slides);
    return f;
  };
  const READ_SLIDES = [["Reading like an AP student", "📖", "First read for the main idea and the purpose of the text. Then read again for details, tone and the writer's point of view."], ["Use the clue", "🔍", "Each question points to a key word. Find it, then read the sentence before and after it. Watch for contrast words like <b>sin embargo</b> and <b>en cambio</b>."], ["Tip", "💡", "You do not need every word. Guess new words from context, from English cousins and from the words around them."]];
  const LISTEN_SLIDES = [["Listening-style practice", "🎧", "Press 🔊 to hear the passage, as in a real listening task. Listen once for the main idea, then again for numbers, names and places."], ["Catch the details", "🔢", "Announcements and messages are full of <b>times, days, places and things to bring</b>. Notice them as you listen."], ["Tip", "💡", "Say the numbers and days out loud in Spanish as you hear them. It helps you remember."]];

  // ---------- LEVEL 22 banks ----------
  const LITDEV = SP("Literary devices", [["metáfora", "metaphor", "🎭"], ["símil", "simile", "➗"], ["personificación", "personification", "🧍"], ["ironía", "irony", "🙃"], ["narrador", "narrator", "🎙️"], ["trama", "plot", "🧵"], ["personaje", "character", "🦸"], ["tema", "theme", "💭"]]);
  const POEM = SP("Poetry words", [["verso", "line of a poem", "✍️"], ["estrofa", "stanza", "🧱"], ["rima", "rhyme", "🎵"], ["soneto", "sonnet", "📜"], ["poeta", "poet", "🖋️"], ["ritmo", "rhythm", "🥁"], ["lector", "reader", "📖"], ["mensaje", "message", "💌"]]);
  const ARGU = SP("Essay and argument words", [["tesis", "thesis", "🎯"], ["argumento", "argument", "🗣️"], ["evidencia", "evidence", "🔎"], ["conclusión", "conclusion", "🏁"], ["ejemplo", "example", "✏️"], ["contraargumento", "counterargument", "↩️"], ["resumen", "summary", "📝"], ["párrafo", "paragraph", "📄"]]);
  const POLI = SP("Society and citizenship", [["ciudadano", "citizen", "🧑"], ["elecciones", "elections", "🗳️"], ["voto", "vote", "✅"], ["gobierno", "government", "🏛️"], ["alcalde", "mayor", "🏙️"], ["manifestación", "peaceful protest", "📣"], ["desigualdad", "inequality", "⚖️"], ["libertad", "freedom", "🕊️"]]);
  const ARTE = SP("Visual art", [["pintura", "painting", "🖼️"], ["escultura", "sculpture", "🗿"], ["retrato", "portrait", "🧑‍🎨"], ["paisaje", "landscape", "🏞️"], ["mural", "mural", "🎨"], ["lienzo", "canvas", "🧵"], ["pincel", "paintbrush", "🖌️"], ["exposición", "exhibition", "🏛️"]]);
  const ENVI = SP("Environment and sustainability", [["energía renovable", "renewable energy", "🌞"], ["contaminación", "pollution", "🏭"], ["reciclaje", "recycling", "🔄"], ["deforestación", "deforestation", "🪓"], ["calentamiento global", "global warming", "🌡️"], ["escasez", "shortage", "🚱"], ["especie en peligro", "endangered species", "🐼"], ["sostenible", "sustainable", "♻️"]]);
  const L22B = [].concat(LITDEV.items, POEM.items, ARGU.items, POLI.items, ARTE.items, ENVI.items);

  // ---------- LEVEL 22 lessons ----------
  const authors22 = RW([
    ["Who wrote <i>Don Quijote de la Mancha</i>?", "Miguel de Cervantes", ["Federico García Lorca", "Pablo Neruda"]],
    ["<i>Cien años de soledad</i> was written by the Colombian author ___ .", "Gabriel García Márquez", ["Isabel Allende", "Jorge Luis Borges"]],
    ["Pablo Neruda, who won the Nobel Prize in Literature in 1971, was from ___ .", "Chile", ["Argentina", "Spain"]],
    ["Jorge Luis Borges, famous for short stories about libraries and labyrinths, was from ___ .", "Argentina", ["Uruguay", "México"]],
    ["Gabriela Mistral, the first Latin American to win the Nobel Prize in Literature (1945), was from ___ .", "Chile", ["Cuba", "Perú"]],
    ["Sor Juana Inés de la Cruz, a poet and scholar of the 1600s, lived in what is now ___ .", "México", ["Chile", "Spain"]],
    ["Federico García Lorca, author of the play <i>La casa de Bernarda Alba</i>, was a poet from ___ .", "España", ["Perú", "Colombia"]],
    ["Isabel Allende wrote <i>La casa de los espíritus</i>. What kind of work is it?", "a novel", ["a dictionary", "a cookbook"]],
    ["Pablo Neruda's <i>Odas elementales</i> praise everyday things such as ___ .", "tomatoes and socks", ["castles and knights", "planets and robots"]],
    ["José Martí, who wrote <i>Versos sencillos</i>, was a poet and independence hero from ___ .", "Cuba", ["Chile", "Spain"]],
    ["Rubén Darío, a leader of the <i>modernismo</i> movement, was from ___ .", "Nicaragua", ["Uruguay", "Ecuador"]]
  ], "Link each writer to a country and a famous work. Which clue in the question do you recognize?", "Think of the title, the country, or the century. Writers are often remembered for one famous work.",
    "Example: <b>Octavio Paz</b> was a Mexican poet who won the Nobel Prize in 1990. Connect the name, the country and the work. Now do yours.",
    [["Giants of Spanish literature", "📚", "Spanish-language literature spans Spain and the Americas: novels, poems, plays and stories read all over the world."], ["Names to know", "Cervantes · García Márquez · Neruda · Borges", "<b>Cervantes</b> (<i>Don Quijote</i>), <b>García Márquez</b> (<i>Cien años de soledad</i>), <b>Neruda</b> (poems, Chile), <b>Borges</b> (stories, Argentina)."], ["More voices", "Mistral · Sor Juana · Lorca · Allende", "<b>Gabriela Mistral</b> (Nobel 1945), <b>Sor Juana</b> (poet of the 1600s), <b>Lorca</b> (poet and playwright), <b>Isabel Allende</b> (novelist)."]]);

  const quijote = RW([
    ["In his most famous adventure, Don Quijote attacks ___ because he thinks they are giants.", "windmills", ["bridges", "castles"]],
    ["Don Quijote's loyal squire is ___ .", "Sancho Panza", ["Rocinante", "Dulcinea"]],
    ["Don Quijote's thin horse is named ___ .", "Rocinante", ["Dulcinea", "Sancho"]],
    ["The lady Don Quijote imagines and admires is called ___ .", "Dulcinea", ["Rocinante", "Sancho"]],
    ["The adjective <i>quijotesco</i> describes a person who is ___ .", "idealistic and unrealistic", ["very lazy", "very rude"]],
    ["Don Quijote reads so many books about ___ that he decides to become one.", "knights", ["pirates", "doctors"]],
    ["The book begins: «En un lugar de ___ , de cuyo nombre no quiero acordarme».", "La Mancha", ["Andalucía", "Aragón"]],
    ["Cervantes published the first part of <i>Don Quijote</i> in the year ___ .", "1605", ["1492", "1810"]],
    ["The saying <i>luchar contra molinos de viento</i> means to ___ .", "fight imaginary enemies", ["win easily", "run away fast"]]
  ], "Think about the famous scenes and characters of the book.", "Remember the pair: a dreamer on a thin horse and a practical friend who goes along. Match the clue to the character or place.",
    "Example: The funny, practical friend often speaks in proverbs, while the dreamer speaks like a book. Match each clue to a character. Now do yours.",
    [["A book that changed literature", "🛡️", "<i>Don Quijote</i> (1605 and 1615) is often called the first modern novel. It is funny, clever and moving."], ["The characters", "Don Quijote · Sancho Panza · Rocinante · Dulcinea", "A dreamer who thinks he is a knight, his down-to-earth squire <b>Sancho Panza</b>, the horse <b>Rocinante</b> and the imaginary lady <b>Dulcinea</b>."], ["Words from the book", "quijotesco · molinos de viento", "<b>Quijotesco</b> means idealistic to the point of being unrealistic. <b>Luchar contra molinos de viento</b> means to fight imaginary enemies."]]);

  const register22 = RW([
    ["Which greeting is best for a letter to a school principal you have never met?", "Estimado señor director:", ["¡Qué onda, director!", "Hola, colega,"]],
    ["Which closing is formal?", "Atentamente,", ["Un abrazo,", "Chao,"]],
    ["Which closing is best for an email to a close friend?", "Un abrazo,", ["Atentamente,", "Le saluda cordialmente,"]],
    ["Which sentence is formal?", "Le agradecería su respuesta.", ["Contesta ya.", "Dime rápido."]],
    ["Which question is formal?", "¿Podría ayudarme, por favor?", ["¿Me ayudas?", "¿Me echas una mano?"]],
    ["Which message to your cousin sounds natural?", "¿Qué tal? ¿Vienes mañana?", ["Estimado primo: ¿Tendría la amabilidad de venir?", "Le informo de que nos veremos."]],
    ["Which request fits an email to a teacher you respect?", "¿Puede ayudarme, profesor?", ["¿Puedes ayudarme, tío?", "¿Podéis ayudarme, chicos?"]],
    ["Which phrase begins a formal request?", "Me dirijo a usted para…", ["Oye, mira…", "¿Qué pasó?"]],
    ["What does <b>Quedo a su disposición</b> mean at the end of an email?", "I remain at your service", ["I am leaving now", "I am still waiting for you"]],
    ["What does <b>Adjunto el documento</b> mean?", "I am attaching the document", ["I am deleting the document", "I am reading the document"]]
  ], "Ask yourself: who is reading this? A friend, or someone you should treat with respect?", "Formal writing uses <b>usted</b>, polite verbs and set phrases. Informal writing uses <b>tú</b>, short questions and friendly closings.",
    "Example: \"Estimada señora Rojas\" fits a stranger. \"Hola, Marta\" fits a friend. Pick the one that fits the reader. Now do yours.",
    [["One language, many registers", "🎩", "A <b>register</b> is the level of formality. You speak differently to a friend, a teacher and a future employer."], ["Formal tools", "usted · podría · le agradecería", "Use <b>usted</b>, the conditional for politeness (<b>¿Podría…?</b>) and openings like <b>Estimado/a…</b> or <b>Me dirijo a usted para…</b>."], ["Closings", "Atentamente · Un abrazo", "<b>Atentamente</b> and <b>Quedo a su disposición</b> are formal. <b>Un abrazo</b> and <b>Hasta pronto</b> are friendly."]]);

  const spainLat = RW([
    ["In Spain, a computer is an <b>ordenador</b>. In most of Latin America people say ___ .", "computadora", ["ordenanza", "calculadora"]],
    ["A cell phone is a <b>móvil</b> in Spain. In México it is a ___ .", "celular", ["portátil", "celador"]],
    ["Which word for \"car\" is typical of Spain?", "coche", ["carro", "guagua"]],
    ["Juice is <b>zumo</b> in Spain. In Latin America people say ___ .", "jugo", ["juego", "jungla"]],
    ["Latin America often says <b>manejar</b> for \"to drive\". Spain says ___ .", "conducir", ["mandar", "caminar"]],
    ["A peach is a <b>melocotón</b> in Spain. Many Latin American countries say ___ .", "durazno", ["duro", "dulce"]],
    ["A swimming pool is a <b>piscina</b> in Spain, an <b>alberca</b> in México and a ___ in Argentina.", "pileta", ["piedra", "pelota"]],
    ["A transport ticket is a <b>billete</b> in Spain. In Latin America you may hear <b>boleto</b> or ___ .", "pasaje", ["paisaje", "pasillo"]],
    ["Which pronoun is used for \"you all\" among friends in Spain, but not in Latin America?", "vosotros", ["ustedes", "vos"]],
    ["In Latin America, <b>c</b> before e/i and <b>z</b> sound like English ___ .", "s", ["k", "ch"]]
  ], "Think: is this a Spain word, or a Latin American word? Remember the pairs from the lesson.", "Spain and Latin America often use two different words for the same thing. Match the word with the place named in the question.",
    "Example: <b>Gafas</b> (Spain) and <b>lentes</b> (Latin America) both mean eyeglasses. Match the place with the word. Now do yours.",
    [["One language, many words", "🌍", "Spanish is the same language everywhere, but some everyday words change from region to region."], ["Pairs to know", "ordenador / computadora<br>coche / carro<br>zumo / jugo", "<b>Ordenador</b> and <b>coche</b> are typical of Spain. <b>Computadora</b> and <b>carro</b> are common in Latin America."], ["Stay flexible", "💬", "In a test or a conversation, either is fine as long as you understand both. Pick one style and stay consistent."]]);

  const falseFriends22 = RW([
    ["<b>Actualmente</b> means ___ .", "currently", ["actually", "exactly"]],
    ["<b>Realizar un proyecto</b> means to ___ .", "carry out a project", ["understand a project", "cancel a project"]],
    ["<b>Asistir a clase</b> means to ___ .", "attend class", ["help the teacher", "skip class"]],
    ["<b>Soportar el ruido</b> means to ___ .", "put up with the noise", ["make the noise", "hold up the noise"]],
    ["A <b>librería</b> is a ___ .", "bookstore", ["library", "school"]],
    ["<b>Éxito</b> means ___ .", "success", ["exit", "excitement"]],
    ["<b>Estoy constipado</b> usually means ___ .", "I have a cold", ["I am very strong", "I am stuck"]],
    ["A <b>sensible</b> person is ___ .", "sensitive", ["reasonable", "senseless"]],
    ["<b>Pretendo ganar</b> means ___ .", "I intend to win", ["I pretend to win", "I prevent winning"]],
    ["A <b>carpeta</b> is a ___ .", "folder", ["rug", "garage"]],
    ["A <b>fábrica</b> is a ___ .", "factory", ["fabric", "fable"]],
    ["<b>Largo</b> means ___ .", "long", ["large", "wide"]]
  ], "Careful! These words look like English words, but the meaning may be different.", "If the English look-alike does not make sense in the sentence, the Spanish word probably means something else. Think of the Spanish word for the English meaning.",
    "Example: <b>Embarazada</b> means pregnant, not embarrassed (embarrassed is <b>avergonzado</b>). Now do yours.",
    [["Translation traps", "🪤", "<b>False friends</b> (<i>falsos amigos</i>) look like English words but mean something else."], ["Watch out", "actualmente · éxito · librería", "<b>Actualmente</b> = currently (not actually). <b>Éxito</b> = success (not exit). <b>Librería</b> = bookstore (not library)."], ["More traps", "asistir · soportar · largo", "<b>Asistir a</b> = attend. <b>Soportar</b> = put up with. <b>Largo</b> = long (large is <b>grande</b>)."]]);

  const subjReview22 = RW([
    ["Es esencial que los estudiantes ___ la verdad. (decir)", "digan", ["dicen", "dirán"]],
    ["Buscamos un autor que ___ historias para jóvenes. (escribir; we don't know if he exists)", "escriba", ["escribe", "escribió"]],
    ["Aunque ___ mucho ahora mismo, salimos. (llover; it IS raining, a fact)", "llueve", ["llueva", "lloverá"]],
    ["Aunque ___ mañana, iremos al museo. (llover; maybe)", "llueva", ["llueve", "llovió"]],
    ["En cuanto ___ la novela, te la presto. (terminar, yo; future)", "termine", ["termino", "terminaré"]],
    ["Si ___ más tiempo, leería más. (tener, yo)", "tuviera", ["tengo", "tendría"]],
    ["Dudo que el autor ___ esa idea. (inventar; present)", "invente", ["inventa", "inventó"]],
    ["Me sorprendió que ella no ___ la respuesta. (saber)", "supiera", ["sabe", "sepa"]],
    ["Es evidente que la poesía ___ emociones fuertes. (provocar; certainty)", "provoca", ["provoque", "provocara"]],
    ["Camina en silencio como si ___ un fantasma. (ser)", "fuera", ["es", "era"]],
    ["Ojalá ___ llegado a tiempo ayer. (yo; a wish about the past)", "hubiera", ["haya", "había"]]
  ], "Look for the trigger: doubt, wish, emotion, an unknown person or thing, a future time word, or <b>si</b> with an imaginary situation.", "Certainty and facts use the normal tenses. Doubt, wishes, feelings, unknown things and future time words use the wish form (subjunctive). An imaginary <b>si</b> uses the past wish form.",
    "Example: \"Quiero que mi hermano ___ (venir)\" uses <b>venga</b>, because a wish about someone else triggers the wish form. Now do yours.",
    [["Graded review: the wish form", "🎯", "You already know the subjunctive. Now spot it in new places: essays, news and stories."], ["Triggers", "dudo que · cuando (future) · como si", "<b>Dudo que</b>, <b>ojalá</b>, <b>me sorprende que</b>, <b>cuando</b> (future), and <b>como si</b> call for the wish form."], ["Facts vs. maybe", "aunque llueve / aunque llueva", "<b>Aunque llueve</b> = a fact (it is raining). <b>Aunque llueva</b> = it may or may not rain. Evidence words like <b>es evidente que</b> take the normal tenses."]]);

  const narr22 = RW([
    ["Era una noche tranquila cuando de repente ___ un grito. (oírse)", "se oyó", ["se oía", "se oiga"]],
    ["Mientras la abuela ___ el cuento, los niños escuchaban. (contar)", "contaba", ["contó", "cuenta"]],
    ["Ayer ___ tres horas en la biblioteca. (estar, yo)", "estuve", ["estaba", "estuviera"]],
    ["De niña, siempre ___ cuentos antes de dormir. (leer)", "leía", ["leyó", "leí"]],
    ["El caballero ___ su espada y entró en el castillo. (sacar)", "sacó", ["sacaba", "saque"]],
    ["El pueblo ___ pequeño y callado, rodeado de montañas. (ser; description)", "era", ["fue", "sea"]],
    ["Esa tarde Ana ___ la noticia y se puso a llorar. (saber: found out)", "supo", ["sabía", "supiera"]],
    ["Yo no ___ la respuesta, pero la adiviné. (saber: state of knowledge)", "sabía", ["supe", "sepa"]],
    ["Cuando llegamos, la película ya ___ . (empezar: had begun)", "había empezado", ["empezó", "empezaba"]],
    ["Llovía y hacía frío cuando ___ a casa. (llegar, yo)", "llegué", ["llegaba", "llegando"]]
  ], "Is the verb a scene or description (background), or a single event that moves the story forward?", "Imperfect: background, habits and actions in progress. Preterite: a finished event. Pluperfect (<b>había</b> + done word): something that happened before another past event.",
    "Example: \"Dormía cuando sonó el teléfono\": the first verb is the background, the second is the interrupting event. Now do yours.",
    [["Telling a story", "📖", "Good storytellers mix two past tenses: one for the scene, one for the action."], ["Imperfect vs. preterite", "era · llovía / llegué · sonó", "<b>Imperfect</b>: setting, feelings, habits, actions in progress. <b>Preterite</b>: a finished event that moves the plot."], ["Meaning changes", "sabía / supo", "<b>Sabía</b> = I knew. <b>Supe / supo</b> = I found out. <b>Había empezado</b> = it had already begun."]]);

  const idioms22 = TR([
    ["A caballo regalado no se le mira el diente", "don't look a gift horse in the mouth"], ["Matar dos pájaros de un tiro", "to kill two birds with one stone"], ["Dormirse en los laureles", "to rest on your laurels"],
    ["Estar en el quinto pino", "to be in the middle of nowhere"], ["Irse por las ramas", "to beat around the bush"], ["Quedarse de piedra", "to be stunned"],
    ["Hacer oídos sordos", "to turn a deaf ear"], ["Poner el grito en el cielo", "to hit the roof"]
  ], [["Sayings with a twist", "💬", "Spanish sayings paint funny pictures. <b>Irse por las ramas</b> is not about trees: it means to go off topic."], ["Examples", "matar dos pájaros de un tiro<br>quedarse de piedra", "<b>Matar dos pájaros de un tiro</b> = solve two problems with one action. <b>Quedarse de piedra</b> (stay like stone) = to be too shocked to move."], ["Learn the meaning", "🧠", "Learn each saying as one whole piece. Do not translate it word by word."]],
    "These sayings are not literal. Think about the whole meaning, not each word.");

  const connect22 = TR([
    ["no obstante", "nevertheless"], ["por consiguiente", "consequently"], ["dado que", "given that"], ["a pesar de que", "even though"], ["con respecto a", "regarding"],
    ["en cuanto a", "as for"], ["en definitiva", "in short"], ["por ende", "hence"], ["así pues", "thus"], ["puesto que", "since (because)"]
  ], [["Connectors for strong writing", "🔗", "Connectors show how your ideas relate: contrast, cause, result or summary. They lift an essay from good to excellent."], ["Cause and result", "dado que · puesto que / por consiguiente · por ende", "<b>Dado que</b> and <b>puesto que</b> give a reason. <b>Por consiguiente</b> and <b>por ende</b> give a result."], ["Contrast and focus", "no obstante · a pesar de que · con respecto a", "<b>No obstante</b> = nevertheless. <b>A pesar de que</b> = even though. <b>Con respecto a</b> and <b>en cuanto a</b> introduce a topic."]],
    "Think about the job of the connector: reason, result, contrast or topic.");

  const read22a = RD([
    { t: "En la novela, un joven llamado Mateo llega a un pueblo donde nadie recuerda la fecha. Los relojes de la plaza están rotos y la gente vive sin prisa. Mateo, que antes siempre corría, aprende a escuchar el río y a esperar. Al final, el narrador dice que el tiempo no desaparece, sino que cambia de ritmo. La autora usa los relojes como símbolo de la prisa moderna.",
      qs: [["Where does Mateo arrive?", "a village where nobody remembers the date", ["a big modern city", "a school by the sea"], "Find un pueblo."], ["What is broken in the plaza?", "the clocks", ["the bridges", "the lights"], "Find los relojes."], ["What does Mateo learn to do?", "listen to the river and wait", ["run faster", "paint pictures"], "Find aprende a."], ["What do the clocks symbolize?", "modern hurry", ["a fairy tale", "old friendship"], "Find como símbolo de."]] },
    { t: "La ciudad de Medellín plantó miles de árboles en sus calles para bajar la temperatura. Los llaman «corredores verdes». Según los expertos, algunas zonas son ahora dos o tres grados más frescas. Además, los pájaros han vuelto a los parques. Los vecinos ayudan a cuidar las plantas, y los colegios organizan visitas. Otras ciudades quieren copiar la idea.",
      qs: [["Why did the city plant the trees?", "to lower the temperature", ["to sell wood", "to hide the buildings"], "Find para bajar."], ["How much cooler are some zones?", "two or three degrees", ["twenty degrees", "one degree"], "Find grados más frescas."], ["What has returned to the parks?", "birds", ["bicycles", "rivers"], "Find han vuelto."], ["Who helps take care of the plants?", "the neighbors", ["only the mayor", "tourists"], "Find los vecinos."]] },
    { t: "—Buenos días, señora Vega. Le llamo por la beca de verano. —Sí, dígame. —Quisiera saber hasta cuándo puedo entregar la solicitud. —Hasta el quince de marzo, pero necesita dos cartas de recomendación. —Perfecto. Se las enviaré por correo electrónico esta semana. —Muy bien, le agradezco su interés.",
      qs: [["Why is the caller phoning?", "about a summer scholarship", ["about a lost dog", "about a concert"], "Find la beca."], ["What is the deadline?", "March 15", ["June 15", "the end of the week"], "Find hasta el quince."], ["What else is needed?", "two letters of recommendation", ["a photo and a map", "a new passport"], "Find necesita."], ["Does the caller use tú or usted?", "usted", ["tú", "vos"], "Look at Le llamo and Quisiera."]] }
  ], READ_SLIDES);

  const read22b = RD([
    { t: "El veintitrés de abril es el Día del Libro. En Cataluña, la tradición es regalar una rosa y un libro. Las calles se llenan de puestos y los escritores firman ejemplares. Marta, que prefiere las novelas de aventuras, compró un libro de leyendas y una rosa para su abuela. «Un libro es un regalo que se puede compartir», dijo.",
      qs: [["What is the date of Book Day?", "April 23", ["March 23", "April 3"], "Find el veintitrés."], ["Where is the rose-and-book tradition famous?", "Cataluña", ["Chile", "Cuba"], "Find En Cataluña."], ["What gifts are given?", "a rose and a book", ["candy and a card", "a scarf and a hat"], "Find regalar."], ["Who is Marta's gift for?", "her grandmother", ["her teacher", "her brother"], "Find para su abuela."]] },
    { t: "Atención, pasajeros. El tren con destino a Sevilla sale de la vía seis a las nueve y diez, con diez minutos de retraso. Les recordamos que deben vigilar su equipaje en todo momento. Pedimos disculpas por las molestias.",
      qs: [["Where is the train going?", "Sevilla", ["Madrid", "Bilbao"], "Find con destino a."], ["Which platform does it leave from?", "number six", ["number ten", "number nine"], "Find la vía."], ["How late is the train?", "ten minutes", ["one hour", "not late"], "Find retraso."], ["What are passengers reminded to do?", "watch their luggage", ["buy tickets", "turn off lights"], "Find vigilar."]] },
    { t: "Mi nombre es Camila y crecí hablando español en casa e inglés en la escuela. A veces mezclo los dos idiomas sin darme cuenta: «voy a parquear el carro». Mis profesores me corrigen, pero mi abuela se ríe. Con el tiempo entendí que hablar dos lenguas no es un problema: es una ventaja, porque puedo pensar de dos maneras.",
      qs: [["Where does Camila speak Spanish?", "at home", ["only in class", "on the bus"], "Find en casa."], ["How does she mix the languages?", "without noticing", ["on purpose to joke", "only in writing"], "Find sin darme cuenta."], ["How does her grandmother react?", "She laughs", ["She gets angry", "She cries"], "Find se ríe."], ["What does Camila conclude?", "Two languages are an advantage", ["Mixing is a big problem", "English is better"], "Find es una ventaja."]] }
  ], LISTEN_SLIDES);

  const t22 = TYE(L22B, "literature, poetry, essays, society, art and the environment");

  const L22 = [
    XL("Literary devices", V(LITDEV)), XL("Poetry words", V(POEM)), XL("Essay and argument words", V(ARGU)), XL("Society and citizenship", V(POLI)),
    XL("Visual art", V(ARTE)), XL("Environment and sustainability", V(ENVI)), XL("Giants of Spanish literature", authors22), XL("Don Quijote", quijote),
    XL("Formal or informal?", register22), XL("Spain or Latin America?", spainLat), XL("False friends", falseFriends22), XL("Review: the wish form", subjReview22),
    XL("Telling a story", narr22), XL("More sayings with a twist", idioms22), XL("Connectors for essays", connect22), XL("Reading: books, trees, scholarships", read22a),
    XL("Listening: festivals, trains, two languages", read22b), XL("Type it in Spanish", t22),
    XL("Mixed practice", MIX([V(LITDEV), V(ARGU), authors22, quijote, register22, spainLat, falseFriends22, subjReview22])),
    XL("Level 22 Challenge", MIX([V(LITDEV), V(POEM), V(ARGU), V(POLI), V(ARTE), V(ENVI), authors22, quijote, register22, spainLat, falseFriends22, subjReview22, narr22, idioms22, connect22, read22a, read22b]))
  ];

  // ---------- LEVEL 23 banks ----------
  const HIST = SP("History words", [["independencia", "independence", "🕊️"], ["colonia", "colony", "🏰"], ["conquista", "conquest", "🗺️"], ["libertador", "liberator", "🦅"], ["revolución", "revolution", "✊"], ["imperio", "empire", "👑"], ["reforma", "reform", "📜"], ["tratado", "treaty", "🤝"]]);
  const TECHE = SP("Technology and ethics", [["algoritmo", "algorithm", "🧮"], ["privacidad", "privacy", "🔒"], ["desinformación", "misinformation", "📰"], ["brecha digital", "digital divide", "📶"], ["datos", "data", "💾"], ["innovación", "innovation", "💡"], ["avance", "breakthrough", "🚀"], ["vigilancia", "surveillance", "👁️"]]);
  const MIGR = SP("Migration and identity", [["inmigrante", "immigrant", "🧳"], ["frontera", "border", "🛂"], ["ciudadanía", "citizenship", "🪪"], ["bilingüe", "bilingual", "🗣️"], ["raíces", "roots", "🌱"], ["herencia", "heritage", "🏺"], ["comunidad", "community", "🏘️"], ["acogida", "welcome", "🤗"]]);
  const WELL = SP("Health and well-being", [["bienestar", "well-being", "🧘"], ["salud mental", "mental health", "🧠"], ["ansiedad", "anxiety", "😟"], ["sueño", "sleep", "😴"], ["nutrición", "nutrition", "🥗"], ["ejercicio", "exercise", "🏃"], ["prevención", "prevention", "🛡️"], ["equilibrio", "balance", "⚖️"]]);
  const EDU = SP("School and careers", [["beca", "scholarship", "🎓"], ["matrícula", "enrollment", "📝"], ["carrera", "degree program", "🏫"], ["pasantía", "internship", "💼"], ["solicitud", "application", "📄"], ["entrevista", "interview", "🎤"], ["título", "diploma", "📜"], ["currículum", "résumé", "📋"]]);
  const TRAD = SP("Legends and traditions", [["leyenda", "legend", "📖"], ["mito", "myth", "🐉"], ["refrán", "proverb", "💬"], ["cuentacuentos", "storyteller", "🎙️"], ["antepasado", "ancestor", "👴"], ["folclore", "folklore", "💃"], ["costumbre", "custom", "🎎"], ["tradición", "tradition", "🎊"]]);
  const L23B = [].concat(HIST.items, TECHE.items, MIGR.items, WELL.items, EDU.items, TRAD.items);

  // ---------- LEVEL 23 lessons ----------
  const authors23 = RW([
    ["Magical realism mixes everyday life with ___ .", "magical events told as normal", ["robots and spaceships", "only true facts"]],
    ["Macondo, a made-up town, appears in the novels of ___ .", "Gabriel García Márquez", ["Julio Cortázar", "Laura Esquivel"]],
    ["Julio Cortázar's novel <i>Rayuela</i> is named after ___ .", "hopscotch", ["a kite", "a staircase"]],
    ["Mario Vargas Llosa, Nobel Prize winner in 2010, is from ___ .", "Perú", ["Chile", "Bolivia"]],
    ["Laura Esquivel's <i>Como agua para chocolate</i> connects feelings with ___ .", "cooking and recipes", ["sports", "space travel"]],
    ["Juan Rulfo, who wrote <i>Pedro Páramo</i>, was a writer from ___ .", "México", ["Cuba", "Argentina"]],
    ["Carlos Fuentes, author of <i>La muerte de Artemio Cruz</i>, was a novelist from ___ .", "México", ["Spain", "Venezuela"]],
    ["Julia Álvarez, who writes about the Mirabal sisters, has family roots in the ___ .", "Dominican Republic", ["Colombia", "Uruguay"]],
    ["Horacio Quiroga, a master of the short story, was from ___ .", "Uruguay", ["Venezuela", "Chile"]]
  ], "Connect each writer with a country and a famous book. What clue do you recognize?", "Think of the title and its meaning. Many Latin American novels of the 1960s are called the \"Boom\".",
    "Example: <b>Isabel Allende</b> (Chile) wrote <i>La casa de los espíritus</i>, which blends family history and magic. Now do yours.",
    [["The Boom and magical realism", "✨", "In the 1960s, Latin American novelists became famous worldwide with a style called <b>realismo mágico</b>."], ["Names to know", "García Márquez · Cortázar · Vargas Llosa · Fuentes", "<b>García Márquez</b> (Colombia), <b>Cortázar</b> (Argentina), <b>Vargas Llosa</b> (Perú) and <b>Carlos Fuentes</b> (México)."], ["Short stories and more", "Rulfo · Quiroga · Esquivel · Álvarez", "<b>Rulfo</b> (México), <b>Quiroga</b> (Uruguay), <b>Esquivel</b> (México) and <b>Julia Álvarez</b> (Dominican roots)."]]);

  const poetry23 = RW([
    ["«Caminante, no hay camino, se hace camino al andar» is by Antonio Machado, from ___ .", "Spain", ["Argentina", "Chile"]],
    ["What does <i>se hace camino al andar</i> suggest?", "You create your path as you go", ["Roads are always built first", "Walking is dangerous"]],
    ["Gustavo Adolfo Bécquer wrote his short poems, the <i>Rimas</i>, in the ___ century.", "19th", ["15th", "21st"]],
    ["A <b>soneto</b> has ___ lines.", "14", ["8", "20"]],
    ["A <b>cuarteto</b> is a stanza of ___ lines.", "4", ["2", "6"]],
    ["A <b>décima</b> has ___ lines.", "10", ["4", "14"]],
    ["«Verde que te quiero verde» is a famous line by ___ .", "Federico García Lorca", ["Miguel de Cervantes", "Jorge Luis Borges"]],
    ["In <b>rima asonante</b>, the ___ sounds match.", "vowel", ["consonant", "number"]],
    ["The song <i>Guantanamera</i> uses verses by ___ .", "José Martí", ["Pablo Neruda", "Gabriela Mistral"]],
    ["A poem with two <b>cuartetos</b> and two <b>tercetos</b> is a ___ .", "sonnet", ["letter", "recipe"]]
  ], "Think about the poem's form or its author. What famous line or structure does the question describe?", "Spanish poetry counts lines and syllables, and rhymes either all sounds (consonante) or only vowels (asonante).",
    "Example: A <b>terceto</b> is a stanza of 3 lines. Now think about how many lines the form in your question has.",
    [["Reading poetry", "🖋️", "Poems use rhyme, rhythm and images. Knowing a few forms and famous lines helps you recognize them."], ["Forms", "soneto · cuarteto · terceto · décima", "A <b>soneto</b> has 14 lines (two <b>cuartetos</b> of 4 and two <b>tercetos</b> of 3). A <b>décima</b> has 10."], ["Famous voices", "Machado · Bécquer · Lorca · Martí", "<b>Machado</b>: «Caminante, no hay camino». <b>Bécquer</b>: the <i>Rimas</i>. <b>Lorca</b>: «Verde que te quiero verde». <b>Martí</b>: <i>Versos sencillos</i>."]]);

  const languages23 = RW([
    ["<b>Chocolate</b>, <b>tomate</b> and <b>aguacate</b> come from ___ .", "Náhuatl (the Aztec language)", ["Latin", "German"]],
    ["<b>Papa</b> (potato), <b>llama</b> and <b>cóndor</b> come from ___ .", "Quechua", ["Arabic", "Basque"]],
    ["<b>Huracán</b>, <b>hamaca</b> and <b>canoa</b> come from the ___ language of the Caribbean.", "Taíno", ["Latin", "French"]],
    ["<b>Ojalá</b>, <b>azúcar</b> and <b>aceite</b> come from ___ .", "Arabic", ["Greek", "English"]],
    ["Spanish itself mostly developed from ___ .", "Latin", ["Arabic", "Greek"]],
    ["<b>Cenote</b>, a natural sinkhole, comes from the ___ language, spoken in southern México and Guatemala.", "Maya", ["Taíno", "Quechua"]],
    ["<b>Guaraní</b> is an official language of ___ along with Spanish.", "Paraguay", ["Uruguay", "Cuba"]],
    ["<b>Quechua</b> is spoken by millions of people in the Andes, including in Perú and ___ .", "Bolivia", ["Cuba", "Costa Rica"]],
    ["<b>Basque</b>, which is not related to Spanish, is spoken in ___ .", "northern Spain", ["the Canary Islands", "Andalucía"]]
  ], "Think about where the word came from: the Americas, Arabic-speaking Spain, or Latin?", "Spanish borrowed words from Indigenous languages of the Americas (food, animals, nature) and from Arabic (many words that start with <b>al-</b>).",
    "Example: <b>Almohada</b> (pillow) starts with <b>al-</b>, a sign of Arabic origin. <b>Coyote</b> comes from Náhuatl. Now do yours.",
    [["A language full of other languages", "🗣️", "Spanish grew from Latin, then borrowed words from Arabic (Spain) and from Indigenous languages of the Americas."], ["Words from the Americas", "tomate · papa · huracán", "<b>Tomate</b> and <b>chocolate</b> (Náhuatl), <b>papa</b> and <b>cóndor</b> (Quechua), <b>huracán</b> and <b>hamaca</b> (Taíno)."], ["Words from Arabic", "ojalá · azúcar · aceite · almohada", "Arabic left hundreds of words in Spanish, many beginning with <b>al-</b>. <b>Ojalá</b> comes from an Arabic phrase meaning roughly \"if God wills\"."]]);

  const accents23 = RW([
    ["In most of Spain, <b>cielo</b> starts with a sound like English ___ (as in \"think\").", "th", ["k", "sh"]],
    ["In <i>seseo</i>, the words <b>casa</b> and <b>caza</b> sound ___ .", "the same", ["different", "silent"]],
    ["In Argentina and Uruguay, the <b>ll</b> in <b>calle</b> often sounds like English ___ .", "sh", ["k", "th"]],
    ["In many Caribbean accents, the final <b>s</b> in <b>los amigos</b> is often ___ .", "weakened or dropped", ["doubled", "shouted"]],
    ["<i>Yeísmo</i> means that <b>ll</b> and <b>y</b> sound ___ .", "the same", ["totally different", "silent"]],
    ["Do accents change how Spanish is spelled?", "No, the written Spanish is the same", ["Yes, everything changes", "Only in books"]],
    ["In Spanish, the letter <b>j</b> is pronounced like a strong ___ sound.", "h (as in hat)", ["j (as in jam)", "sh"]],
    ["Which word has its stress on the LAST syllable?", "ciudad", ["mesa", "árbol"]],
    ["Which is spelled correctly?", "camión", ["kamión", "camioón"]]
  ], "Pronunciation changes by region, but the spelling stays the same. Which region does the question mention?", "Remember the big features: Spain's <i>th</i> sound for z/ce/ci, Latin America's <i>seseo</i>, Argentina's <i>sh</i> for ll/y, and the soft <b>s</b> in the Caribbean.",
    "Example: In Mexico <b>zapato</b> starts with an <b>s</b> sound, while in central Spain it starts with a <i>th</i> sound. Now do yours.",
    [["Accents around the world", "🎧", "Spanish sounds different in Madrid, Mexico City, Buenos Aires and San Juan, but everyone reads the same spelling."], ["Big differences", "seseo · distinción · yeísmo", "<b>Seseo</b>: z/c sound like s. <b>Distinción</b> (Spain): z/c sound like <i>th</i>. <b>Yeísmo</b>: ll and y sound the same."], ["Spelling rules", "ciu-DAD · ca-MIÓN", "Words ending in a consonant (not n or s) stress the last syllable: <b>ciudad</b>. If the stress breaks the rule, it gets a written accent: <b>camión</b>."]]);

  const opinion23 = RW([
    ["No es verdad que los robots ___ todo. (poder)", "puedan", ["pueden", "podían"]],
    ["Es importante que los jóvenes se ___ libres para opinar. (sentir)", "sientan", ["sienten", "sentirán"]],
    ["Es obvio que las redes sociales ___ rápido. (cambiar)", "cambian", ["cambien", "cambiaran"]],
    ["Me molesta que la gente no ___ el reciclaje. (apoyar)", "apoye", ["apoya", "apoyó"]],
    ["Creo que ese libro ___ muy bueno. (ser)", "es", ["sea", "fuera"]],
    ["No creo que ese libro ___ muy bueno. (ser)", "sea", ["es", "fue"]],
    ["Esperamos que el equipo ya ___ llegado. (haber)", "haya", ["ha", "había"]],
    ["Si el gobierno ___ más escuelas, habría menos desigualdad. (construir)", "construyera", ["construye", "construirá"]],
    ["Si hubiéramos estudiado, ___ aprobado. (haber)", "habríamos", ["hubiéramos", "hemos"]],
    ["Ojalá ___ más tiempo para leer anoche. (tener)", "hubiera tenido", ["tuviera", "tendría"]],
    ["Busco una escuela que ___ clases de arte. (ofrecer)", "ofrezca", ["ofrece", "ofreció"]],
    ["Quiero que mis padres ___ orgullosos de mí. (estar)", "estén", ["están", "estarán"]]
  ], "Opinion verbs decide the mood. Ask: is the speaker sure, or doubtful, hopeful or emotional?", "Certainty (<b>creo que</b>, <b>es obvio que</b>) takes the normal tenses. Doubt, feelings, wishes and unknown things take the wish form. <b>Si</b> + imaginary: past wish form, then the conditional.",
    "Example: \"Pienso que ella ___ razón (tener)\" is a certainty, but \"No pienso que ___ razón\" is a doubt. Decide which mood each needs. Now do yours.",
    [["Opinion and the wish form", "🗳️", "When you give opinions, the verb tells your reader how sure you are."], ["Sure or not sure", "creo que es · no creo que sea", "<b>Creo que es</b> (sure). <b>No creo que sea</b> (doubt). <b>Es obvio que cambian</b> (fact). <b>Es importante que cambien</b> (wish or judgment)."], ["Past and perfect forms", "hubiera tenido · haya llegado", "<b>Ojalá hubiera tenido</b> = I wish I had had. <b>Espero que haya llegado</b> = I hope he has arrived. <b>Si hubiéramos estudiado, habríamos aprobado.</b>"]]);

  const formal23 = TR([
    ["Estimado señor", "Dear Sir"], ["Me dirijo a usted para", "I am writing to you to"], ["Le agradecería que", "I would appreciate it if you"], ["En respuesta a su carta", "In response to your letter"],
    ["Quedo a su disposición", "I remain at your disposal"], ["Adjunto", "I am attaching"], ["Atentamente", "Sincerely"], ["A quien corresponda", "To whom it may concern"],
    ["Quisiera solicitar", "I would like to request"], ["Con motivo de", "On the occasion of"]
  ], [["Writing a formal letter", "✉️", "A formal letter has an opening, a clear purpose, polite requests and a closing."], ["Openings and requests", "Estimado señor · Me dirijo a usted para · Le agradecería que", "<b>Estimado señor</b> = Dear Sir. <b>Me dirijo a usted para</b> = I am writing to you to. <b>Le agradecería que + wish form</b> = I would appreciate it if you…"], ["Closings", "Quedo a su disposición · Atentamente", "<b>Quedo a su disposición</b> = I remain at your disposal. <b>Atentamente</b> = Sincerely."]],
    "Think about a polite letter to someone you do not know.");

  const idioms23 = TR([
    ["Estar entre la espada y la pared", "to be between a rock and a hard place"], ["Llover sobre mojado", "when it rains, it pours (more trouble)"], ["Ser coser y cantar", "to be a piece of cake"], ["Dar la talla", "to measure up"],
    ["Armar un lío", "to cause a mess"], ["Pillar con las manos en la masa", "to catch red-handed"], ["Por si las moscas", "just in case"], ["Estar al tanto", "to be up to date"]
  ], [["Sayings with a twist", "💬", "Idioms make speech vivid. <b>Por si las moscas</b> has nothing to do with flies: it means \"just in case\"."], ["Examples", "estar entre la espada y la pared<br>ser coser y cantar", "<b>Estar entre la espada y la pared</b> = to be trapped between two bad choices. <b>Ser coser y cantar</b> = to be very easy."], ["Learn the meaning", "🧠", "Learn each saying as one whole piece. Do not translate it word by word."]],
    "These sayings are not literal. Think about the whole meaning, not each word.");

  const independence = RW([
    ["Miguel Hidalgo's <i>Grito de Dolores</i> (1810) began the fight for independence in ___ .", "México", ["Chile", "Cuba"]],
    ["México celebrates its Independence Day on September ___ .", "16", ["5", "30"]],
    ["Simón Bolívar, <i>El Libertador</i>, was born in ___ .", "Venezuela", ["Argentina", "Spain"]],
    ["José de San Martín helped free Argentina, Chile and ___ .", "Perú", ["Cuba", "Costa Rica"]],
    ["The country of Bolivia is named in honor of ___ .", "Simón Bolívar", ["José de San Martín", "Miguel Hidalgo"]],
    ["José Martí, a poet and thinker, worked for the independence of ___ .", "Cuba", ["Chile", "Uruguay"]],
    ["Most Spanish colonies in South America won independence in the early ___ .", "1800s", ["1500s", "1900s"]],
    ["Central American countries such as Costa Rica and Guatemala celebrate independence on September ___ .", "15", ["1", "25"]],
    ["Benito Juárez was the first ___ president of México.", "Indigenous", ["Spanish", "military"]],
    ["Spain lost its last colonies, including Cuba and Puerto Rico, in the year ___ .", "1898", ["1810", "1936"]],
    ["The Moors ruled parts of Spain from 711 and left a famous palace in Granada: the ___ .", "Alhambra", ["Prado", "Escorial"]]
  ], "Link each person or date to a country. Which national story do you remember?", "Many national holidays in Latin America remember the declarations of independence in the early 1800s. Match the hero, the country and the date.",
    "Example: <b>Bernardo O'Higgins</b> helped Chile become independent (declared in 1818). Match the hero with the place. Now do yours.",
    [["Independence and heroes", "🕊️", "In the early 1800s, many Spanish colonies in the Americas became independent countries."], ["Leaders", "Hidalgo · Bolívar · San Martín · Martí", "<b>Hidalgo</b> (México), <b>Bolívar</b> (northern South America), <b>San Martín</b> (Argentina, Chile, Perú), <b>Martí</b> (Cuba)."], ["Dates", "16 de septiembre · 15 de septiembre", "México celebrates on <b>September 16</b>. Central American countries celebrate on <b>September 15</b>."]]);

  const artists23 = RW([
    ["Frida Kahlo is famous for her ___ .", "self-portraits", ["comic books", "landscape photos"]],
    ["Diego Rivera painted large ___ about México's history and workers.", "murals", ["sculptures", "cartoons"]],
    ["Pablo Picasso, born in Málaga, Spain, helped invent ___ .", "Cubism", ["Pop art", "Impressionism"]],
    ["Salvador Dalí is famous for ___ paintings, such as melting clocks.", "surrealist", ["realistic", "abstract"]],
    ["Diego Velázquez painted <i>Las Meninas</i>, which hangs in the ___ in Madrid.", "Prado", ["Louvre", "Alhambra"]],
    ["Antoni Gaudí designed the Sagrada Familia in ___ .", "Barcelona", ["Sevilla", "Lima"]],
    ["Fernando Botero, from Colombia, is known for figures with ___ .", "round, exaggerated shapes", ["tiny stick bodies", "only black lines"]],
    ["Joan Miró, from Catalonia, painted with bright colors and playful ___ .", "shapes and symbols", ["photographs", "portraits of kings"]],
    ["Oswaldo Guayasamín, famous for expressive paintings, was from ___ .", "Ecuador", ["Cuba", "Panamá"]]
  ], "Think of the painter's most famous style, work or city.", "Match each artist with a style (Cubism, Surrealism, murals), a museum or a building. Spain and Latin America both have great art traditions.",
    "Example: <b>Joaquín Sorolla</b> painted sunny beach scenes in Valencia, known for his light. Now do yours.",
    [["Artists of the Spanish world", "🎨", "Painters, sculptors and architects from Spain and Latin America changed world art."], ["Spain", "Velázquez · Picasso · Dalí · Miró · Gaudí", "<b>Velázquez</b> (<i>Las Meninas</i>), <b>Picasso</b> (Cubism), <b>Dalí</b> (Surrealism), <b>Gaudí</b> (Sagrada Familia)."], ["Latin America", "Kahlo · Rivera · Botero · Guayasamín", "<b>Frida Kahlo</b> (self-portraits), <b>Diego Rivera</b> (murals), <b>Botero</b> (round figures), <b>Guayasamín</b> (Ecuador)."]]);

  const listen23 = RD([
    { t: "Atención, estudiantes. Mañana, la feria de ciencias empieza a las nueve en el gimnasio. Cada grupo tiene diez minutos para presentar su proyecto. Traigan sus carteles y lleguen quince minutos antes. Las familias pueden visitar la feria desde las once. ¡Les deseamos mucho éxito!",
      qs: [["Where is the science fair?", "in the gym", ["in the library", "in the cafeteria"], "Find en el gimnasio."], ["What time does it begin?", "nine o'clock", ["eleven o'clock", "ten o'clock"], "Find empieza."], ["How long does each group have?", "ten minutes", ["fifteen minutes", "one hour"], "Find cada grupo."], ["When can families visit?", "from eleven", ["from nine", "in the evening"], "Find las familias."]] },
    { t: "Hola, Pedro. Soy Laura. Te llamo porque el ensayo de la banda cambió: ya no es el jueves, sino el viernes a las cinco, en la casa de Tomás. No olvides tu guitarra. Si no puedes venir, avísame antes del miércoles. ¡Hasta pronto!",
      qs: [["Who left the message?", "Laura", ["Pedro", "Tomás"], "Find Soy."], ["What is the new rehearsal day?", "Friday", ["Thursday", "Wednesday"], "Find sino el."], ["Where is the rehearsal?", "at Tomás's house", ["at school", "at Laura's house"], "Find en la casa de."], ["What should Pedro bring?", "his guitar", ["a drum", "a microphone"], "Find No olvides."]] },
    { t: "Buenas tardes. El pronóstico para esta noche: cielo nublado, vientos fuertes del norte y temperaturas bajas, de cinco grados. Mañana habrá lluvia por la mañana, pero por la tarde saldrá el sol. Recomendamos llevar abrigo y paraguas.",
      qs: [["What will tonight be like?", "cloudy, windy and cold", ["sunny and hot", "foggy and calm"], "Find esta noche."], ["What is the temperature tonight?", "five degrees", ["fifteen degrees", "zero degrees"], "Find de cinco."], ["When will it rain tomorrow?", "in the morning", ["in the evening", "all night"], "Find por la mañana."], ["What do they recommend?", "a coat and an umbrella", ["sunglasses", "a swimsuit"], "Find Recomendamos."]] }
  ], LISTEN_SLIDES);

  const read23 = RD([
    { t: "En el cuento, una niña encuentra una llave dorada en el jardín de su abuela. Nadie sabe qué puerta abre. La niña la busca durante semanas. Al final descubre que la llave abre una pequeña caja con cartas antiguas de la familia. El autor escribe: «La puerta más importante no es de madera: es la memoria». La llave simboliza el pasado y la familia.",
      qs: [["Where does the girl find the key?", "in her grandmother's garden", ["at school", "on a beach"], "Find en el jardín."], ["How long does she search?", "for weeks", ["for one hour", "for years"], "Find durante."], ["What is inside the box?", "old family letters", ["gold coins", "toys"], "Find cartas antiguas."], ["What does the key symbolize?", "the past and family", ["money and power", "travel"], "Find simboliza."]] },
    { t: "Un instituto de Valencia prohibió los móviles durante las clases. Al principio, muchos estudiantes protestaron. Tres meses después, los profesores notaron que los alumnos hablaban más en los recreos y prestaban más atención. Sin embargo, algunos padres opinan que los móviles también sirven para aprender. El director propone una solución intermedia: usarlos solo en actividades con permiso del profesor.",
      qs: [["What did the school ban?", "phones during class", ["homework", "recess"], "Find prohibió."], ["How did students first react?", "Many protested", ["They celebrated", "They did not notice"], "Find Al principio."], ["What changed after three months?", "Students talked more and paid more attention", ["Grades dropped", "Teachers quit"], "Find Tres meses después."], ["What does the director propose?", "Use phones only with the teacher's permission", ["Allow phones always", "Ban all computers"], "Find solución intermedia."]] },
    { t: "Mis abuelos llegaron de Ecuador sin hablar inglés. Hoy mi familia celebra dos fiestas nacionales y cocina platos de dos países. A veces me siento entre dos mundos, pero he aprendido que la identidad no es una frontera, sino un puente. Por eso mantengo mi español: es la lengua que me conecta con mis raíces.",
      qs: [["Where did the grandparents come from?", "Ecuador", ["Spain", "Cuba"], "Find llegaron de."], ["What does the family celebrate?", "two national holidays", ["only birthdays", "no holidays"], "Find celebra."], ["How does the writer describe identity?", "as a bridge", ["as a wall", "as a game"], "Find un puente."], ["Why does the writer keep Spanish?", "It connects with their roots", ["It is easier than English", "Teachers require it"], "Find raíces."]] }
  ], READ_SLIDES);

  const t23 = TYE(L23B, "history, technology, migration, health, school and traditions");

  const L23 = [
    XL("History words", V(HIST)), XL("Technology and ethics", V(TECHE)), XL("Migration and identity", V(MIGR)), XL("Health and well-being", V(WELL)),
    XL("School and careers", V(EDU)), XL("Legends and traditions", V(TRAD)), XL("Magical realism and the Boom", authors23), XL("Reading poetry", poetry23),
    XL("A language full of languages", languages23), XL("Accents around the world", accents23), XL("Opinion and the wish form", opinion23), XL("Writing a formal letter", formal23),
    XL("Idioms in action", idioms23), XL("Independence and heroes", independence), XL("Artists of the Spanish world", artists23), XL("Listening: fairs, messages, weather", listen23),
    XL("Reading: keys, phones, bridges", read23), XL("Type it in Spanish", t23),
    XL("Mixed practice", MIX([V(HIST), V(TECHE), V(MIGR), authors23, poetry23, languages23, opinion23, independence])),
    XL("Level 23 Challenge", MIX([V(HIST), V(TECHE), V(MIGR), V(WELL), V(EDU), V(TRAD), authors23, poetry23, languages23, accents23, opinion23, formal23, idioms23, independence, artists23, listen23, read23]))
  ];

  // ---------- LEVEL 24 banks ----------
  const GLOB = SP("Global challenges", [["globalización", "globalization", "🌐"], ["pobreza", "poverty", "📉"], ["desarrollo", "development", "🏗️"], ["refugiado", "refugee", "🏕️"], ["ayuda humanitaria", "humanitarian aid", "📦"], ["cambio climático", "climate change", "🌡️"], ["acceso", "access", "🚪"], ["sostenibilidad", "sustainability", "♻️"]]);
  const ACADV = SP("Academic verbs", [["analizar", "to analyze", "🔬"], ["comparar", "to compare", "⚖️"], ["argumentar", "to argue (a point)", "🗣️"], ["sugerir", "to suggest", "💡"], ["demostrar", "to demonstrate", "📊"], ["destacar", "to highlight", "⭐"], ["cuestionar", "to question", "❓"], ["plantear", "to raise or pose", "🧩"]]);
  const IDENT = SP("Identity and community", [["identidad", "identity", "🪪"], ["pertenencia", "belonging", "🫂"], ["estereotipo", "stereotype", "🏷️"], ["prejuicio", "prejudice", "🚧"], ["diversidad", "diversity", "🌈"], ["tolerancia", "tolerance", "🤲"], ["mestizaje", "cultural mixing", "🎨"], ["convivencia", "coexistence", "🏘️"]]);
  const TECH24 = SP("Technology and society", [["teletrabajo", "remote work", "🏡"], ["ciberseguridad", "cybersecurity", "🛡️"], ["plataforma", "platform", "🖥️"], ["dispositivo", "device", "📱"], ["conexión", "connection", "📡"], ["contraseña", "password", "🔑"], ["videollamada", "video call", "📹"], ["aplicación", "app", "📲"]]);
  const LIT24 = SP("Analyzing a story", [["simbolismo", "symbolism", "🔣"], ["tono", "tone", "🎭"], ["desenlace", "outcome or ending", "🏁"], ["conflicto", "conflict", "⚡"], ["protagonista", "main character", "🦸"], ["antagonista", "antagonist", "🦹"], ["punto de vista", "point of view", "👀"], ["fragmento", "excerpt", "✂️"]]);
  const WORK = SP("Work life", [["sueldo", "salary", "💵"], ["contrato", "contract", "📃"], ["desempleo", "unemployment", "📉"], ["jubilación", "retirement", "🏖️"], ["huelga", "strike", "✊"], ["emprendedor", "entrepreneur", "🚀"], ["plantilla", "staff", "👥"], ["ascenso", "promotion", "📈"]]);
  const L24B = [].concat(GLOB.items, ACADV.items, IDENT.items, TECH24.items, LIT24.items, WORK.items);

  // ---------- LEVEL 24 lessons ----------
  const convo24 = RW([
    ["Friend: ¿Quieres ir al cine esta noche?<br>Best reply:", "Me encantaría, pero tengo un examen mañana.", ["Me encantó, pero tengo un examen ayer.", "Me encantaría, pero tuve un examen mañana."]],
    ["Teacher: ¿Por qué llegó tarde, señor Díaz?<br>Best reply:", "Lo siento, profesora; el autobús se retrasó.", ["Lo sientes, profesora; el autobús se retrasó.", "Perdona, chaval; el autobús se retrasó."]],
    ["Interviewer: ¿Qué experiencia tiene usted con niños?<br>Best reply:", "He trabajado como monitor en un campamento durante dos veranos.", ["Tengo trabajado como monitor en un campamento dos veranos.", "Soy trabajado como monitor en un campamento dos veranos."]],
    ["Friend: ¿Qué te pareció la novela?<br>Best reply:", "Me pareció muy interesante, aunque un poco larga.", ["Me parecí muy interesante, aunque un poco larga.", "Me pareció muy interesante, aunque un poco largo."]],
    ["Mother: ¿Ya hiciste la tarea?<br>Best reply:", "Todavía no, pero la haré después de cenar.", ["Todavía no, pero lo haré después de cenar.", "Todavía no, pero la hice después de cenar."]],
    ["Stranger: Disculpe, ¿dónde está la biblioteca?<br>Best reply:", "Siga recto y gire a la izquierda en la esquina.", ["Sigues recto y gira a la izquierda en la esquina.", "Sigue recto y giras a la izquierda en la esquina."]],
    ["Classmate: ¿Me puedes prestar tu cuaderno?<br>Best reply:", "Claro, te lo presto hasta mañana.", ["Claro, se lo presto hasta mañana.", "Claro, lo te presto hasta mañana."]]
  ], "Read the question and choose the answer that fits the speaker, the register and the time.", "A good reply matches the person (tú or usted), the tense (past, present or future) and the gender of the nouns. Check each answer for those three things.",
    "Example: Asked \"¿Dónde viviste de niño?\", a good reply is \"Viví en Lima hasta los diez años\", because the question is in the past and the reply is too. Now do yours.",
    [["Simulated conversations", "💬", "In a conversation task you must reply quickly, naturally and in the right register."], ["Reply checklist", "register · tense · agreement", "Check <b>tú or usted</b>, the <b>tense</b> that matches the question, and <b>agreement</b> (la tarea → <b>la</b> haré)."], ["Natural phrases", "Me encantaría, pero… · Lo siento, pero…", "Use polite openers: <b>Me encantaría, pero…</b>, <b>Claro que sí</b>, <b>Lo siento, pero…</b>, <b>No te preocupes</b>."]]);

  const compare24 = TR([
    ["mientras que", "whereas"], ["en cambio", "on the other hand"], ["al igual que", "just like"], ["a diferencia de", "unlike"], ["tanto… como…", "both… and…"],
    ["ambos", "both"], ["cada vez más", "more and more"], ["de la misma manera", "in the same way"], ["a su vez", "in turn"], ["asimismo", "likewise"]
  ], [["Comparing cultures", "⚖️", "A strong comparison says what is similar, what is different, and why it matters."], ["Similar and different", "al igual que · a diferencia de · mientras que", "<b>Al igual que</b> = just like (similar). <b>A diferencia de</b> = unlike. <b>Mientras que</b> = whereas (different)."], ["Adding and linking", "asimismo · a su vez · tanto… como…", "<b>Asimismo</b> = likewise. <b>A su vez</b> = in turn. <b>Tanto… como…</b> = both… and…"]],
    "Think about whether the phrase shows similarity, difference or addition.");

  const colloc24 = TR([
    ["hacer una pregunta", "to ask a question"], ["tomar una decisión", "to make a decision"], ["prestar atención", "to pay attention"], ["tener en cuenta", "to take into account"], ["llevar a cabo", "to carry out"],
    ["echar un vistazo", "to take a look"], ["desempeñar un papel", "to play a role"], ["dar un paseo", "to take a walk"], ["hacer caso", "to listen to (follow advice)"], ["sacar una conclusión", "to draw a conclusion"]
  ], [["Verb partners", "🤝", "Some verbs go with certain nouns. In English you <i>make</i> a decision and <i>take</i> a walk; Spanish chooses differently."], ["Examples", "tomar una decisión · dar un paseo · hacer una pregunta", "You <b>tomas</b> a decision (take), <b>das</b> a walk (give) and <b>haces</b> a question (do). Learn them as pairs."], ["Handy ones", "tener en cuenta · llevar a cabo · prestar atención", "<b>Tener en cuenta</b> = take into account. <b>Llevar a cabo</b> = carry out. <b>Prestar atención</b> = pay attention (literally lend)."]],
    "Do not translate word by word. Think of the Spanish verb partner.");

  const englishHabits = RW([
    ["How do you say \"Running is fun\"?", "Correr es divertido.", ["Corriendo es divertido.", "Corro es divertido."]],
    ["How do you say \"The news is good\"?", "Las noticias son buenas.", ["Las noticias es buenas.", "La noticias son bueno."]],
    ["How do you say \"I'm sixteen years old\"?", "Tengo dieciséis años.", ["Soy dieciséis años.", "Estoy dieciséis años."]],
    ["How do you say \"I'm cold\"?", "Tengo frío.", ["Soy frío.", "Estoy frío."]],
    ["How do you say \"my friend's house\"?", "la casa de mi amigo", ["la casa mi amigo", "mi amigo casa"]],
    ["How do you say \"I have been studying Spanish for six years\"?", "Estudio español desde hace seis años.", ["Tengo estudiado español por seis años.", "He sido estudiando español seis años."]],
    ["How do you say \"I like to read\"?", "Me gusta leer.", ["Me gusto leer.", "Yo gusta leer."]],
    ["How do you say \"I will call you when I arrive\"?", "Te llamaré cuando llegue.", ["Te llamaré cuando llegaré.", "Te llamo cuando llegué."]],
    ["How do you say \"He is looking for his keys\"?", "Busca sus llaves.", ["Busca por sus llaves.", "Busca para sus llaves."]],
    ["How do you say \"She listens to music\"?", "Escucha música.", ["Escucha a música.", "Escucha de música."]],
    ["How do you say \"We are going to eat\"?", "Vamos a comer.", ["Vamos comer.", "Vamos de comer."]]
  ], "Do not copy the English pattern. Ask what Spanish does in this situation.", "English habits that trip people up: <b>-ing</b> as a subject, \"to be\" for age and weather feelings, extra prepositions, and future time words.",
    "Example: \"I am hungry\" is <b>Tengo hambre</b> (I have hunger), not \"Estoy hambre\". Think Spanish first. Now do yours.",
    [["Translation traps", "🪤", "A word-by-word translation often gives wrong Spanish. Think in Spanish patterns."], ["Patterns", "tener frío · tengo 16 años · correr es divertido", "Use <b>tener</b> for age, hunger, cold and heat. Use the <b>infinitive</b> (<b>correr</b>), not -ing, as a subject."], ["Little words", "busca ___ llaves · escucha ___ música", "<b>Buscar</b>, <b>escuchar</b>, <b>mirar</b> and <b>esperar</b> already include \"for\" or \"to\". Do not add <b>por</b>, <b>para</b> or <b>a</b>. Use the wish form after <b>cuando</b> about the future."]]);

  const famous24 = RW([
    ["«En un lugar de la Mancha, de cuyo nombre no quiero acordarme…» begins which book?", "Don Quijote", ["Cien años de soledad", "Rayuela"]],
    ["<i>La vida es sueño</i> is a famous play by ___ .", "Calderón de la Barca", ["Miguel de Cervantes", "Lope de Vega"]],
    ["Lope de Vega was a prolific playwright of Spain's ___ .", "Golden Age (Siglo de Oro)", ["Romantic era", "Industrial age"]],
    ["<i>Lazarillo de Tormes</i> (1554) is an early ___ novel about a poor boy serving many masters.", "picaresque", ["fantasy", "detective"]],
    ["Garcilaso de la Vega brought the ___ form to Spanish poetry.", "sonnet", ["haiku", "limerick"]],
    ["Horacio Quiroga's <i>Cuentos de la selva</i> features animals living in the ___ .", "jungle", ["desert", "ocean"]],
    ["Gabriela Mistral's poem <i>Piececitos de niño</i> is about a child's ___ .", "little feet", ["big dreams", "school bus"]],
    ["Borges's story <i>La biblioteca de Babel</i> imagines a library that is ___ .", "almost endless", ["very small", "always closed"]],
    ["Cortázar's story <i>Casa tomada</i> is about a brother and sister whose house is slowly ___ .", "taken over by something unseen", ["sold to neighbors", "painted new"]],
    ["The title <i>Cien años de soledad</i> means ___ .", "One Hundred Years of Solitude", ["Ten Years of Silence", "A Hundred Friends"]]
  ], "Connect the line or title to its writer, its form or its theme.", "Think of the period: the Golden Age (1500s-1600s, Spain), Romanticism (1800s), or the 20th century Latin American boom.",
    "Example: <i>Fuenteovejuna</i> is a play by Lope de Vega about a whole village acting together. Now do yours.",
    [["Famous lines and titles", "📜", "AP-level reading expects you to recognize great works and what they are about."], ["Golden Age Spain", "Cervantes · Lope de Vega · Calderón · Lazarillo", "<b>Cervantes</b> (<i>Quijote</i>), <b>Lope de Vega</b> (theater), <b>Calderón</b> (<i>La vida es sueño</i>) and the anonymous <i>Lazarillo de Tormes</i>."], ["Latin America", "Mistral · Quiroga · Borges · Cortázar", "<b>Mistral</b> (poems for children and mothers), <b>Quiroga</b> (jungle stories), <b>Borges</b> (labyrinths, libraries), <b>Cortázar</b> (fantastic stories)."]]);

  const serEstar24 = RW([
    ["La reunión ___ en el auditorio a las tres. (location of an event)", "es", ["está", "sea"]],
    ["La autora ___ muy cansada después del viaje. (condition)", "está", ["es", "sea"]],
    ["Este poema fue escrito ___ una mujer de Chile. (the doer)", "por", ["para", "de"]],
    ["Estudio ___ ser ingeniera. (purpose)", "para", ["por", "de"]],
    ["Gracias ___ la ayuda. (reason)", "por", ["para", "de"]],
    ["Salimos ___ Madrid mañana. (destination)", "para", ["por", "en"]],
    ["Compré este libro ___ mi hermana. (a gift for her)", "para", ["por", "de"]],
    ["Cambié mi bicicleta ___ una más nueva. (exchange)", "por", ["para", "a"]],
    ["Mi tío ___ alto y muy simpático. (traits)", "es", ["está", "sea"]],
    ["¡La sopa ___ fría! (how it feels now)", "está", ["es", "sea"]],
    ["Caminamos ___ el parque. (through)", "por", ["para", "a"]],
    ["___ ser extranjero, habla muy bien. (considering that)", "Para", ["Por", "De"]],
    ["Fue ___ eso que no vine. (because of that)", "por", ["para", "de"]]
  ], "Decide what the sentence is doing: describing a trait, a condition, a purpose, a reason or an exchange?", "<b>Ser</b>: traits, identity, where an event happens. <b>Estar</b>: conditions and location. <b>Por</b>: cause, through, exchange, doer. <b>Para</b>: purpose, recipient, destination, deadline.",
    "Example: \"Hablo ___ teléfono\" (by means of) uses the word for means or cause. Match the idea in brackets to the right word. Now do yours.",
    [["Graded review: ser, estar, por, para", "🔁", "These four small words cause the most mistakes. Review them in longer sentences."], ["Ser or estar?", "es alto · está cansada · es en el auditorio", "<b>Ser</b>: traits and where an event happens. <b>Estar</b>: how someone or something is now, and where things are."], ["Por or para?", "por eso · para ser · para mi hermana", "<b>Por</b>: because of, through, in exchange for, by. <b>Para</b>: in order to, for someone, toward a place, considering that."]]);

  const pronouns24 = RW([
    ["¿Me das el libro? — Sí, ___ doy.", "te lo", ["me lo", "lo te"]],
    ["Le dije la verdad a Ana. → ___ dije.", "Se la", ["Le la", "La se"]],
    ["Voy a comprar el regalo. → Voy a ___ .", "comprarlo", ["lo comprarlo", "comprarle"]],
    ["Dame el cuaderno. → ___ .", "Dámelo", ["Me lo da", "Lo dame"]],
    ["No quiero decir el secreto a mis padres. → No quiero ___ .", "decírselo", ["decírlelo", "decirlosle"]],
    ["Estoy leyendo la novela. → Estoy ___ .", "leyéndola", ["leyéndolo", "leyéndole"]],
    ["Mis amigos me regalaron un libro. → Mis amigos ___ regalaron.", "me lo", ["lo me", "se lo"]],
    ["Tú escribes cartas a tu abuela. → Tú ___ escribes.", "se las", ["las se", "les las"]],
    ["No digas el secreto a Pablo. → No ___ digas.", "se lo", ["lo se", "le lo"]]
  ], "Ask: what is the thing (direct object) and who receives it (indirect object)? The person comes first.", "Order: indirect (person) + direct (thing) + verb. <b>Le/les</b> becomes <b>se</b> before <b>lo, la, los, las</b>. With infinitives, gerunds and commands, the pronouns attach to the end (and may need an accent).",
    "Example: \"Doy el regalo a mi madre\" becomes a two-pronoun sentence where le + lo changes form. Work out the order for yours. Now do yours.",
    [["Two pronouns together", "🔀", "Spanish often uses two small pronouns before the verb: one for the person and one for the thing."], ["The order", "me lo · te la · se los", "<b>Person first, thing second</b>: <b>Me lo da</b>. And <b>le/les + lo</b> becomes <b>se lo</b>."], ["Attached pronouns", "dámelo · decírselo · leyéndola", "With commands, infinitives and gerunds, attach the pronouns: <b>Dámelo</b>, <b>decírselo</b>, <b>leyéndola</b> (add a written accent to keep the stress)."]]);

  const hypo24 = RW([
    ["Si hubiera llegado antes, ___ el principio. (ver)", "habría visto", ["vería", "había visto"]],
    ["Si tengo tiempo, ___ a visitarte. (ir)", "iré", ["fuera", "iría"]],
    ["Si fuera presidente, ___ más escuelas. (construir)", "construiría", ["construyera", "construiré"]],
    ["Me pidió que ___ la ventana. (cerrar)", "cerrara", ["cierre", "cerraré"]],
    ["Es probable que ___ mañana. (llover)", "llueva", ["llueve", "llovió"]],
    ["Habría ido si me ___ invitado. (haber)", "hubieran", ["habrían", "habían"]],
    ["Dijo que ___ al día siguiente. (venir)", "vendría", ["viene", "vendrá"]],
    ["Aunque ___ rico, no sería feliz. (ser; imaginary)", "fuera", ["es", "sea"]],
    ["Espero que ya ___ terminado. (haber)", "hayan", ["han", "hubieran"]],
    ["Antes de que ___ la película, apaga el celular. (empezar)", "empiece", ["empieza", "empezó"]]
  ], "Match the tense of the main verb with the tense of the other verb. Real or imaginary? Past or present?", "Real <b>si</b>: present + future. Imaginary <b>si</b>: imperfect wish form + conditional. Impossible past <b>si</b>: <b>hubiera</b> + done word, then <b>habría</b> + done word. After a past request, use the past wish form.",
    "Example: \"Si ___ rica, viajaría (ser)\" is an imaginary situation, so it needs the past wish form. Now do yours.",
    [["Graded review: sequence of tenses", "⏳", "Hard sentences need the right tense in each part. The first verb helps you pick the second."], ["Three kinds of 'if'", "si tengo → iré · si tuviera → iría · si hubiera → habría", "Real: <b>tengo → iré</b>. Imaginary: <b>tuviera → iría</b>. Impossible past: <b>hubiera ido → habría ido</b>."], ["Past requests", "pidió que cerrara · dijo que vendría", "After a past verb of request, use the past wish form: <b>pidió que cerrara</b>. Reported future becomes the conditional: <b>dijo que vendría</b>."]]);

  const idioms24 = TR([
    ["Volver a la carga", "to insist again"], ["Ser un pez gordo", "to be a big shot"], ["No dar pie con bola", "to get everything wrong"], ["Pasárselo bomba", "to have a great time"],
    ["Hacer borrón y cuenta nueva", "to wipe the slate clean"], ["Ir al grano", "to get to the point"], ["Estar como una cabra", "to be a little crazy"], ["Hacer de tripas corazón", "to make the best of a bad situation"]
  ], [["Sayings with a twist", "💬", "Using an idiom in the right place shows deep command of the language. <b>Ir al grano</b> means to skip the extras and get to the point."], ["Examples", "hacer borrón y cuenta nueva<br>ser un pez gordo", "<b>Hacer borrón y cuenta nueva</b> = start fresh, forgetting past mistakes. <b>Ser un pez gordo</b> = to be an important person."], ["Learn the meaning", "🧠", "Learn each saying as one whole piece. Do not translate it word by word."]],
    "These sayings are not literal. Think about the whole meaning, not each word.");

  const read24a = RD([
    { t: "En España, la cena suele ser tarde, alrededor de las nueve o las diez, mientras que en muchos países de América Latina se cena más temprano. En cambio, el almuerzo es la comida principal en ambos lugares. Marisol, que vive en Madrid, explica que la sobremesa, la conversación después de comer, es sagrada para su familia. «No es perder el tiempo —dice—, es ganar compañía».",
      qs: [["When is dinner usually eaten in Spain?", "around nine or ten", ["around five", "around noon"], "Find la cena suele ser."], ["What is the main meal in both places?", "lunch", ["breakfast", "dinner"], "Find la comida principal."], ["What is la sobremesa?", "conversation after eating", ["a kind of dessert", "a kitchen table"], "Find la conversación después de comer."], ["How does Marisol see it?", "As gaining company, not wasting time", ["As wasting time", "As a rule from school"], "Find ganar compañía."]] },
    { t: "Nuria acaba de empezar una pasantía en una empresa de energía solar. Su jefe le pidió que preparara un informe sobre los paneles. Aunque tuvo dificultades con los términos técnicos, pidió ayuda y entregó el informe a tiempo. Su jefe elogió su iniciativa, pero le recomendó que fuera más breve. «Un buen informe no es largo, es claro», le dijo.",
      qs: [["What kind of company is it?", "a solar energy company", ["a restaurant", "a bank"], "Find energía solar."], ["What was Nuria asked to prepare?", "a report about panels", ["a meal", "a song"], "Find un informe."], ["What was difficult for her?", "technical terms", ["the commute", "the salary"], "Find términos técnicos."], ["What did her boss recommend?", "to be shorter", ["to be louder", "to quit"], "Find más breve."]] },
    { t: "Algunos creen que la tecnología resolverá por sí sola el cambio climático. Sin embargo, los expertos señalan que las decisiones individuales también importan. Si cada familia redujera su consumo de energía, el impacto sería notable. Por lo tanto, la solución no depende solo de los gobiernos ni de las empresas, sino de todos. Es un reto colectivo.",
      qs: [["What do some people believe?", "Technology alone will solve climate change", ["Nothing can be done", "Families already solved it"], "Find Algunos creen."], ["What do experts add?", "Individual decisions matter too", ["Only governments matter", "Decisions do not matter"], "Find las decisiones individuales."], ["What would happen if each family used less energy?", "The impact would be notable", ["Nothing would change", "Prices would double"], "Find redujera."], ["What does the text conclude?", "It is a challenge for everyone", ["Only companies can help", "Governments should do nothing"], "Find reto colectivo."]] }
  ], READ_SLIDES);

  const read24b = RD([
    { t: "—Hoy tenemos con nosotros a la escritora Inés Montero. Inés, su novela cuenta la historia de una familia de pescadores. ¿Por qué eligió ese tema? —Mi abuelo era pescador, y de niña pasaba los veranos en su barco. Quería que los lectores sintieran el olor del mar. —¿Cuánto tiempo tardó en escribirla? —Casi cuatro años, porque reescribí el final tres veces.",
      qs: [["What is the novel about?", "a family of fishers", ["a school team", "a group of doctors"], "Find familia de pescadores."], ["Why did she choose the topic?", "Her grandfather was a fisher", ["A friend asked her", "She won a prize"], "Find Mi abuelo."], ["How long did she take to write it?", "almost four years", ["almost four days", "almost forty years"], "Find Casi cuatro años."], ["How many times did she rewrite the ending?", "three times", ["once", "ten times"], "Find reescribí."]] },
    { t: "El viejo Anselmo miraba el mar cada tarde. No decía nada; solo esperaba. Los niños del pueblo pensaban que esperaba un barco, pero nadie se atrevía a preguntar. Un día, una niña le preguntó: «¿A quién espera, abuelo?». Él sonrió: «A nadie, hija. Espero que el mar me cuente algo nuevo».",
      qs: [["When does Anselmo watch the sea?", "every afternoon", ["every morning", "once a year"], "Find cada tarde."], ["What do the children think?", "He is waiting for a boat", ["He is angry", "He is lost"], "Find esperaba un barco."], ["Who finally asks him?", "a girl", ["a sailor", "the mayor"], "Find una niña."], ["What is the tone of the passage?", "calm and thoughtful", ["angry and loud", "silly and fast"], "Think about how Anselmo speaks and acts."]] },
    { t: "Estimada señora Rojas: Me dirijo a usted para solicitar información sobre el programa de intercambio en Costa Rica. Soy estudiante de último año y tengo un buen nivel de español. Le agradecería que me indicara los requisitos y las fechas límite. Quedo a su disposición para cualquier duda. Atentamente, Pablo Ruiz.",
      qs: [["What is the purpose of the letter?", "to ask about an exchange program", ["to complain about food", "to invite her to a party"], "Find solicitar información."], ["Where is the program?", "Costa Rica", ["Chile", "Cuba"], "Find intercambio en."], ["What does he want to know?", "requirements and deadlines", ["prices of flights only", "the weather"], "Find requisitos."], ["What is the register?", "formal", ["slang", "very casual"], "Look at Estimada, usted and Atentamente."]] }
  ], LISTEN_SLIDES);

  const t24 = TYE(L24B, "global issues, academic verbs, identity, technology, story analysis and work");

  const L24 = [
    XL("Global challenges", V(GLOB)), XL("Academic verbs", V(ACADV)), XL("Identity and community", V(IDENT)), XL("Technology and society", V(TECH24)),
    XL("Analyzing a story", V(LIT24)), XL("Work life", V(WORK)), XL("Simulated conversations", convo24), XL("Comparing cultures", compare24),
    XL("Verb partners", colloc24), XL("English habits to avoid", englishHabits), XL("Famous lines and titles", famous24), XL("Review: ser, estar, por, para", serEstar24),
    XL("Two pronouns together", pronouns24), XL("Review: hypothetical sentences", hypo24), XL("Expert sayings", idioms24), XL("Reading: dinner, internships, climate", read24a),
    XL("Listening: interviews, stories, letters", read24b), XL("Type it in Spanish", t24),
    XL("Mixed practice", MIX([V(GLOB), V(ACADV), V(LIT24), convo24, compare24, colloc24, englishHabits, serEstar24])),
    XL("Level 24 Challenge", MIX([V(GLOB), V(ACADV), V(IDENT), V(TECH24), V(LIT24), V(WORK), convo24, compare24, colloc24, englishHabits, famous24, serEstar24, pronouns24, hypo24, idioms24, read24a, read24b]))
  ];

  Object.assign(SPANISH_LEVELS, { 22: L22, 23: L23, 24: L24 });
})();
