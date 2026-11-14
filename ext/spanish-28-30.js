// ext/spanish-28-30.js  Mind Lab Spanish, levels 28-30 (60 lessons)
// College year 1 (second half) and College year 2: literature, cultural studies, linguistics, advanced writing and translation,
// business and professional Spanish, media and current affairs.
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
      { h: bank.name, v: bank.items.slice(0, 3).map(x => x[2] || "💬").join(" "), t: `Today's topic: <b>${bank.name.toLowerCase()}</b>. These words appear in university readings, reports and discussions.` },
      { h: "Learn the words", v: bank.items.map(x => word(x[0], x[1], x[2])).join("<br>"), t: "<b>Tap any line to hear it</b> and say it out loud!" },
      { h: "How to remember", v: "🧠", t: tip || "Use each word in your own sentence. Look for English cousins (many come from Latin or Greek) and cover the English to test yourself." }
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
      { h: "Accents are optional", v: "á é í ó ú ñ", t: "You can leave the accents off: <b>ambigüedad</b> and <b>ambiguedad</b> both count." },
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
  const K = (rows, h3, slides) => RW(rows, "Re-read the question slowly. Which choices can you cross out first?", "Think back to the lesson slides: which choice fits the key idea best?", h3, slides);
  const FB = (rows, h1, h2, h3, slides) => RW(rows.map(([s, a, w, c]) => ["Complete the sentence:<br><b>" + s + "</b>", a, w, c]), h1, h2, h3, slides);
  const F = (rows, h3, slides) => FB(rows, "Read the whole sentence. What is missing: a connector, a verb form, a noun, a small word?", "Look at the words around the gap for a signal: a time word, a trigger phrase or the subject.", h3, slides);
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
          "Example: if a text says 'Ana come pan en la cocina', the question 'What does Ana eat?' is answered by finding the words after 'come'. Now do yours."] };
    };
    f.teach = () => S3(slides);
    return f;
  };
  const READ_SLIDES = [["Reading at college level", "📖", "First find the main idea and the author's purpose. Then reread for details, tone and how the argument is built."], ["Use the clue", "🔍", "Each question points to a key word. Find it, then read the sentence before and after it. Contrast words such as <b>sin embargo</b> and <b>en cambio</b> change the direction of an idea."], ["Tip", "💡", "You do not need every word. Guess new words from context, from English cousins and from the words around them."]];
  const LISTEN_SLIDES = [["Listening-style practice", "🎧", "Press 🔊 to hear the passage, as in a real listening task. Listen once for the main idea, then again for numbers, names, places and reasons."], ["Catch the details", "🔢", "Lectures, calls and broadcasts are full of <b>times, days, places, tasks and reasons</b>. Notice them as you listen."], ["Tip", "💡", "Say the numbers and days out loud in Spanish as you hear them. It helps you remember."]];
  const TRANS_SLIDES = [["Translate ideas, not words", "🔁", "A good translation keeps the <b>meaning, tone and register</b>. Word-for-word versions often sound strange. Read the whole sentence first."], ["Watch the structures", "🧩", "Look at the verb forms (subjunctive, conditional, perfect tenses) and little words such as <b>aunque, por más que, cuanto más</b>. They change the meaning."], ["Proverbs and idioms", "💬", "Idioms are translated by <b>equivalent</b> sayings, not literally. 'Más vale tarde que nunca' is 'Better late than never'."]];

  // =====================================================================
  // LEVEL 28 (College year 1, second half)
  // =====================================================================
  const LIT = SP("Analysing a story", [["narrador", "narrator", "🗣️"], ["trama", "plot", "🧵"], ["personaje", "character", "🎭"], ["ambiente", "setting", "🏞️"], ["tema", "theme", "💡"], ["conflicto", "conflict", "⚔️"], ["desenlace", "ending, resolution", "🏁"], ["ironía", "irony", "🙃"]]);
  const MORPH = SP("Parts of words", [["raíz", "root", "🌱"], ["prefijo", "prefix", "⬅️"], ["sufijo", "suffix", "➡️"], ["morfema", "morpheme", "🧱"], ["derivación", "derivation", "🌿"], ["palabra compuesta", "compound word", "🔗"], ["flexión", "inflection", "🔀"], ["familia de palabras", "word family", "👪"]]);
  const BUS = SP("In the office", [["empresa", "company", "🏢"], ["contrato", "contract", "📄"], ["presupuesto", "budget", "💰"], ["factura", "invoice", "🧾"], ["plazo", "deadline, term", "⏳"], ["ventas", "sales", "📈"], ["gerente", "manager", "🧑‍💼"], ["reunión", "meeting", "🤝"], ["ganancias", "profits", "💵"]]);
  const MEDIA = SP("News and media", [["noticia", "news item", "📰"], ["titular", "headline", "🔠"], ["periodista", "journalist", "🖊️"], ["encuesta", "survey, poll", "📊"], ["medios de comunicación", "the media", "📺"], ["rueda de prensa", "press conference", "🎤"], ["corresponsal", "correspondent", "🌍"], ["fuente", "source", "🔎"]]);
  const L28B = [].concat(LIT.items, MORPH.items, BUS.items, MEDIA.items);

  const baroque28 = K([
    ["Which Baroque poet wrote the <i>Soledades</i> in a very ornate, difficult style called culteranismo?", "Luis de Góngora", ["Francisco de Quevedo", "Garcilaso de la Vega"], "He was born in Córdoba and loved Latin-style syntax and rich images."],
    ["Conceptismo, a Baroque style of witty ideas and wordplay, is linked above all to which writer?", "Francisco de Quevedo", ["Luis de Góngora", "Lope de Vega"], "He was famous for sharp satire and for being a rival of the poet of the <i>Soledades</i>."],
    ["Which nun of colonial New Spain wrote <i>Primero sueño</i> and defended women's right to study?", "Sor Juana Inés de la Cruz", ["Santa Teresa de Ávila", "Rosalía de Castro"], "She lived in what is now Mexico in the 1600s."],
    ["Which picaresque novel did Quevedo write?", "<i>El Buscón</i>", ["<i>Lazarillo de Tormes</i>", "<i>Guzmán de Alfarache</i>"], "The title is a nickname for a sly rogue; the other two have different authors."],
    ["What does the Baroque theme of <i>desengaño</i> express?", "disillusion: seeing through appearances", ["pure joy in life", "love of nature"], "Think of the opposite of an illusion."],
    ["Which of these plays was written by Calderón de la Barca?", "<i>La vida es sueño</i>", ["<i>Fuenteovejuna</i>", "<i>Don Juan Tenorio</i>"], "It is about a prince locked in a tower and the question of what is real."],
    ["Roughly when was the Siglo de Oro (Golden Age) of Spanish literature?", "the 16th and 17th centuries", ["the 12th and 13th centuries", "the 19th and 20th centuries"], "Cervantes and Lope de Vega both lived in it."],
    ["In what year did Cervantes publish Part 2 of <i>Don Quijote</i>?", "1615", ["1605", "1700"], "It came about ten years after Part 1."]
  ], "Example: 'Which author wrote <i>La Celestina</i>?' is answered by Fernando de Rojas, the author linked to the late 1400s. Now do yours.",
  [["The Baroque", "🎭", "The <b>Barroco</b> (1600s) is full of contrast, ornament and doubt. Two styles stand out: <b>culteranismo</b> (Góngora: beauty and difficulty) and <b>conceptismo</b> (Quevedo: wit and compressed ideas)."], ["Key figures", "✍️", "<b>Calderón</b> wrote philosophical theatre (<i>La vida es sueño</i>). <b>Sor Juana</b> wrote poetry, plays and defended education for women. <b>Cervantes</b> and the picaresque novel give a realistic view of society."], ["Remember", "💡", "Baroque writers often ask: what is real and what is appearance? The word <b>desengaño</b> names the moment when illusions fall away."]]);

  const poets28 = K([
    ["Which Generation of '27 poet wrote <i>Romancero gitano</i>?", "Federico García Lorca", ["Antonio Machado", "Miguel Hernández"], "He was born near Granada and also wrote theatre."],
    ["Who wrote the line 'Caminante, no hay camino, se hace camino al andar'?", "Antonio Machado", ["Federico García Lorca", "Juan Ramón Jiménez"], "It comes from his <i>Campos de Castilla</i> period."],
    ["Who wrote <i>Platero y yo</i>, the lyrical prose about a little donkey, and won the Nobel Prize in 1956?", "Juan Ramón Jiménez", ["Rafael Alberti", "Miguel de Unamuno"], "He was from Moguer, in Andalusia."],
    ["Which poet wrote <i>Marinero en tierra</i>, filled with sea images from his Andalusian coast?", "Rafael Alberti", ["Gerardo Diego", "Luis Cernuda"], "He grew up in the Bay of Cádiz area."],
    ["Which shepherd-poet from Orihuela wrote <i>Nanas de la cebolla</i>?", "Miguel Hernández", ["Vicente Aleixandre", "Jorge Guillén"], "His lullaby poem was written for his baby son."],
    ["In 1927 these poets met to honour the 300th anniversary of the death of which Baroque poet?", "Luis de Góngora", ["Francisco de Quevedo", "Garcilaso de la Vega"], "His difficult, rich style inspired them."],
    ["Which Generation of '27 poet won the Nobel Prize in 1977?", "Vicente Aleixandre", ["Dámaso Alonso", "Jorge Guillén"], "His book <i>Sombra del paraíso</i> is one of his best known."],
    ["The Generation of '27 mixed which two traditions?", "folk tradition and avant-garde art", ["only classical epics", "only business writing"], "Think of ballads (romances) and surrealism."]
  ], "Example: 'Which poet wrote <i>Cántico</i>?' is Jorge Guillén, a poet of pure, joyful poetry. Now do yours.",
  [["The Generation of '27", "📜", "A group of Spanish poets (Lorca, Alberti, Aleixandre, Cernuda, Guillén...) who combined <b>popular songs and ballads</b> with modern, avant-garde images."], ["Before them", "🌅", "<b>Antonio Machado</b> and <b>Juan Ramón Jiménez</b> wrote simple, deep lyric poetry. Machado's Castile and Jiménez's Andalusia are full of landscape and silence."], ["Remember", "💡", "In 1927 the group honoured <b>Góngora</b>, the Baroque poet. The group name comes from that year."]]);

  const boom28 = K([
    ["Which Argentine author wrote the experimental novel <i>Rayuela</i> (Hopscotch), which can be read in different orders?", "Julio Cortázar", ["Jorge Luis Borges", "Ernesto Sabato"], "He also wrote stories such as 'Casa tomada'."],
    ["Which Mexican author wrote <i>La muerte de Artemio Cruz</i>?", "Carlos Fuentes", ["Juan Rulfo", "Octavio Paz"], "He was also a diplomat and essayist."],
    ["Which Peruvian novelist wrote <i>La ciudad y los perros</i>?", "Mario Vargas Llosa", ["Gabriel García Márquez", "Alejo Carpentier"], "The story is set in a military school in Lima."],
    ["Which Mexican writer's novel <i>Pedro Páramo</i>, set in the ghostly town of Comala, influenced magical realism?", "Juan Rulfo", ["Carlos Fuentes", "Julio Cortázar"], "He wrote very little, but it changed Latin American fiction."],
    ["Which Cuban writer used the phrase 'lo real maravilloso' for the strange reality of Latin America?", "Alejo Carpentier", ["José Lezama Lima", "Reinaldo Arenas"], "His novel <i>El reino de este mundo</i> is set in Haiti."],
    ["What is the main idea of magical realism?", "extraordinary events are told as if they were normal", ["only scientific facts are allowed", "everything is a dream and nothing is real"], "Think of yellow butterflies or a girl flying away, said in a calm voice."],
    ["Which Guatemalan author wrote <i>El señor presidente</i> and won the Nobel Prize in 1967?", "Miguel Ángel Asturias", ["Augusto Roa Bastos", "Ernesto Cardenal"], "The novel is about a dictator."],
    ["The 'Boom' of Latin American literature happened mainly in which decades?", "the 1960s and 1970s", ["the 1700s", "the 2010s"], "It brought writers such as Cortázar and Vargas Llosa to world readers."]
  ], "Example: 'Who wrote <i>Ficciones</i>?' is Jorge Luis Borges, from Buenos Aires, famous for labyrinths. Now do yours.",
  [["The Boom", "💥", "In the 1960s-70s a group of Latin American novelists became famous worldwide: <b>García Márquez, Vargas Llosa, Cortázar, Fuentes</b>. They broke the rules of time and narration."], ["Magical realism", "🦋", "The unreal is told <b>calmly, as part of daily life</b>. Rulfo and Carpentier prepared the ground; García Márquez made it world famous."], ["Remember", "💡", "Pair each author with a title and a country: Cortázar-<i>Rayuela</i>-Argentina; Fuentes-<i>Artemio Cruz</i>-Mexico; Vargas Llosa-Peru."]]);

  const women28 = K([
    ["Which Chilean author wrote <i>La casa de los espíritus</i> (1982)?", "Isabel Allende", ["Gabriela Mistral", "Laura Esquivel"], "Her family saga mixes politics and magical elements."],
    ["Which Mexican author wrote <i>Como agua para chocolate</i>, a novel built around recipes?", "Laura Esquivel", ["Elena Poniatowska", "Rosario Castellanos"], "Each chapter begins with a recipe."],
    ["Which Chilean poet was the first Latin American writer to win the Nobel Prize in Literature (1945)?", "Gabriela Mistral", ["Isabel Allende", "Alfonsina Storni"], "She was also a teacher and wrote lullabies."],
    ["Which Galician poet wrote <i>Cantares gallegos</i> (1863) in Galician, helping its literary revival?", "Rosalía de Castro", ["Emilia Pardo Bazán", "Carmen Laforet"], "Her statue stands in Santiago de Compostela."],
    ["Which Galician novelist wrote <i>Los pazos de Ulloa</i> and brought naturalism to Spain?", "Emilia Pardo Bazán", ["Rosalía de Castro", "Carmen Martín Gaite"], "She was a countess and a strong defender of women's education."],
    ["Which author wrote <i>Nada</i> (1944), a postwar novel set in Barcelona?", "Carmen Laforet", ["Rosario Castellanos", "Almudena Grandes"], "She was only 23 when it won the Nadal Prize."],
    ["Which Mexican author wrote <i>Balún Canán</i> about indigenous communities in Chiapas?", "Rosario Castellanos", ["Laura Esquivel", "Elena Poniatowska"], "She was also a diplomat and poet."],
    ["Which Mexican journalist and writer won the Cervantes Prize in 2013?", "Elena Poniatowska", ["Isabel Allende", "Rosario Castellanos"], "Her chronicle <i>La noche de Tlatelolco</i> gathers testimonies."]
  ], "Example: 'Who wrote <i>Ternura</i>, songs for children?' is Gabriela Mistral. Now do yours.",
  [["Women writers", "✍️", "Spanish-language literature has many major women authors, from the 1800s (<b>Rosalía de Castro, Pardo Bazán</b>) to today (<b>Allende, Esquivel, Poniatowska</b>)."], ["Themes", "🌎", "They write about <b>family, memory, identity, social justice and language</b>. Many mix fiction with history and cooking, letters or testimony."], ["Remember", "💡", "Learn one title per author: Allende-<i>La casa de los espíritus</i>; Esquivel-<i>Como agua para chocolate</i>; Laforet-<i>Nada</i>."]]);

  const wordform28 = K([
    ["The prefix <b>des-</b> in <i>deshacer</i> or <i>desconfiar</i> usually expresses...", "the opposite or undoing", ["repetition", "a time before"], "Compare hacer and deshacer."],
    ["The prefix <b>re-</b> in <i>reconstruir</i> or <i>releer</i> usually means...", "again", ["against", "under"], "You read it again."],
    ["The suffix <b>-ción</b> (creación, educación) usually forms...", "nouns from verbs", ["adverbs", "adjectives of colour"], "Crear becomes creación, the action of doing it."],
    ["The suffix <b>-mente</b> in <i>rápidamente</i> forms...", "adverbs", ["verbs", "diminutives"], "It is added to the feminine form of an adjective."],
    ["The word <i>paraguas</i> (para + aguas) is an example of...", "a compound word", ["a loanword", "an acronym"], "Two words were joined into one."],
    ["In 'Los estudiantes leen novelas', which part is the subject?", "Los estudiantes", ["leen", "novelas"], "Who does the action?"],
    ["In 'Ana escribió una reseña', which part is the direct object?", "una reseña", ["Ana", "escribió"], "What did Ana write?"],
    ["In 'Dudo que venga', which part is the subordinate clause?", "que venga", ["Dudo", "Dudo que venga"], "It depends on the main verb and begins with <i>que</i>."]
  ], "Example: in 'inútil' the prefix in- means 'not', so 'inútil' means 'not useful'. Now do yours.",
  [["Building words", "🧱", "Words are built from a <b>raíz</b> (root) plus <b>prefijos</b> and <b>sufijos</b>: <i>des-hacer</i>, <i>crea-ción</i>, <i>rápida-mente</i>."], ["Parts of a sentence", "🧩", "The <b>sujeto</b> does the action; the <b>predicado</b> says what happens. The <b>objeto directo</b> answers 'what?' or 'whom?'. A <b>subordinate clause</b> depends on a main verb."], ["Remember", "💡", "Break unknown words into pieces. Prefix + root + suffix often gives you the meaning."]]);

  const letter28 = F([
    ["____ a usted para solicitar información sobre el puesto de analista.", "Me dirijo", ["Te dirijo", "Me diriges"], "A formal letter starts from the writer: 'I am addressing you'."],
    ["Le agradecería que me ____ una cotización.", "enviara", ["enviaría", "enviamos"], "After 'Le agradecería que' (conditional) use imperfect subjunctive."],
    ["Adjunto a este correo la ____ del mes pasado.", "factura", ["reunión", "empresa"], "Which one can you attach to an email as a document?"],
    ["Quedamos a la espera de ____ pronta respuesta.", "su", ["tu", "mi"], "A formal letter uses usted, so the possessive is for 'your' in formal register."],
    ["Lamentamos informarle ____ el pedido llegará con retraso.", "que", ["cual", "quien"], "A small word that introduces the news."],
    ["Si no ____ el plazo, tendremos que cancelar el contrato.", "cumplen", ["cumplieran", "cumplirán"], "Real condition: si + present, then future."],
    ["Le ruego que ____ la factura antes del viernes.", "revise", ["revisa", "revisará"], "A request with 'ruego que' needs the subjunctive."],
    ["Con referencia ____ su carta del cinco de mayo, le escribimos para confirmar la fecha.", "a", ["de", "en"], "The fixed phrase is 'con referencia ___ ...'."]
  ], "Example: 'Le pido que me ____ la lista' (to send) takes the subjunctive form 'envíe'. Now do yours.",
  [["Formal letters", "✉️", "A business letter has a greeting (<b>Estimado señor López:</b>), a clear purpose, polite requests and a closing (<b>Atentamente</b>)."], ["Polite phrases", "🙏", "<b>Me dirijo a usted para...</b>, <b>Le agradecería que + subjunctive</b>, <b>Le ruego que...</b>, <b>Quedo a la espera de su respuesta</b>."], ["Remember", "💡", "Use <b>usted</b> and the subjunctive or conditional to sound polite. Avoid slang and short forms."]]);

  const news28 = RD([
    { t: "El Gobierno anunció ayer un plan para ampliar la red de trenes de cercanías. La obra costará unos dos mil millones de euros y durará cuatro años. Los sindicatos aplaudieron la medida, pero los vecinos temen que haya ruido y retrasos durante la construcción.",
      qs: [["What will the plan expand?", "the commuter train network", ["the airports", "the highways"], "Find red de trenes."], ["How long will the work take?", "four years", ["two years", "ten years"], "Find durará."], ["Who applauded the plan?", "the unions", ["the neighbours", "the ministers"], "Find aplaudieron."], ["What are the neighbours afraid of?", "noise and delays", ["higher taxes", "empty trains"], "Find temen que."], ["About how much will it cost?", "two billion euros", ["two million euros", "four billion euros"], "Find costará."]] },
    { t: "Una encuesta reciente revela que el sesenta por ciento de los jóvenes lee las noticias en el móvil y solo el diez por ciento compra el periódico en papel. Los expertos advierten de que muchas personas no verifican las fuentes antes de compartir una noticia.",
      qs: [["How do most young people read the news?", "on their phones", ["on paper", "on the radio"], "Find en el móvil."], ["What share buys the paper newspaper?", "ten percent", ["sixty percent", "half"], "Find en papel."], ["What do the experts warn about?", "sharing news without checking sources", ["buying too many papers", "reading too slowly"], "Find verifican las fuentes."], ["What is the main idea?", "young people read news digitally and often do not check sources", ["newspapers are growing fast", "phones are cheap"], "Think about both numbers and the warning."]] },
    { t: "La actriz colombiana recibió un premio en el festival de cine de San Sebastián por su papel en una película sobre una familia migrante. En su discurso, agradeció a su madre y pidió más apoyo para el cine independiente.",
      qs: [["Where was the festival?", "San Sebastián", ["Bogotá", "Buenos Aires"], "Find el festival de cine de."], ["What is the film about?", "a migrant family", ["a football team", "a detective"], "Find sobre una familia."], ["Whom did she thank?", "her mother", ["her director", "the president"], "Find agradeció a."], ["What did she ask for?", "more support for independent cinema", ["higher ticket prices", "fewer festivals"], "Find pidió más apoyo."]] }
  ], READ_SLIDES);

  const transMedia28 = TR([
    ["La empresa presentó el presupuesto anual.", "The company presented the annual budget."],
    ["El periodista citó varias fuentes fiables.", "The journalist cited several reliable sources."],
    ["Los precios han subido más de lo esperado.", "Prices have risen more than expected."],
    ["Si hubiera más tiempo, revisaríamos el contrato.", "If there were more time, we would review the contract."],
    ["Se espera que la reunión termine antes de mediodía.", "The meeting is expected to end before noon."],
    ["El titular no refleja lo que dice el artículo.", "The headline does not reflect what the article says."],
    ["Nos pondremos en contacto con usted en cuanto sea posible.", "We will contact you as soon as possible."],
    ["La encuesta se realizó entre mil personas.", "The survey was carried out among a thousand people."],
    ["Los ingresos aumentaron un cinco por ciento.", "Revenue increased by five percent."]
  ], TRANS_SLIDES);

  const register28 = K([
    ["Which opening is best for an email to a professor you do not know?", "Estimada profesora Ruiz:", ["¡Hola, Ruiz!", "¿Qué tal, profe?"], "Choose a formal greeting with a title."],
    ["Which is the polite, formal way to ask a stranger for help?", "¿Podría ayudarme, por favor?", ["¿Me ayudas?", "Ayúdame ya."], "Use the conditional and 'usted'."],
    ["The informal word <i>vale</i> (OK) is especially typical of which country?", "Spain", ["Mexico", "Argentina"], "It is very common in Madrid."],
    ["In Mexico, what does the colloquial '¡Qué padre!' mean?", "How cool!", ["How awful!", "How expensive!"], "It is an enthusiastic comment, not about parents."],
    ["Which closing is best for a formal letter?", "Atentamente", ["Un abrazo", "Chao"], "You are writing to a stranger or a company."],
    ["Which word means 'cool' in everyday Spanish from Spain?", "guay", ["chamba", "guagua"], "Think of a word young people in Madrid say."],
    ["With whom would you normally use <i>tú</i> in Spain?", "a friend or a classmate", ["a stranger in a bank", "the director of a company, on first meeting"], "Think about closeness and respect."],
    ["Which sentence has a formal register?", "Me gustaría solicitar una reunión.", ["Quiero una reunión ya.", "¿Hacemos una reu?"], "Look for the conditional and a complete word."]
  ], "Example: to be formal, change 'Dame la fecha' into '¿Podría indicarme la fecha?'. Now do yours.",
  [["Registers", "🎚️", "A <b>register</b> is the level of formality: <b>formal</b> (letters, offices), <b>neutral</b> and <b>informal</b> (friends, slang). The same idea changes with the situation."], ["Signs of formality", "🎩", "Formal: <b>usted</b>, conditional ('podría'), complete words, set phrases ('Atentamente'). Informal: <b>tú</b>, slang (<i>guay, vale</i>), short forms."], ["Remember", "💡", "Slang changes by country. Choose neutral words if you do not know your reader."]]);

  const connect28 = F([
    ["El texto es breve; ____, es muy profundo.", "sin embargo", ["por lo tanto", "además"], "The second idea contrasts with 'breve'."],
    ["La inflación subió; ____, los salarios perdieron valor.", "por consiguiente", ["en cambio", "aunque"], "The second idea is the result of the first."],
    ["____ que el autor fue censurado, publicó sus obras.", "A pesar de", ["Puesto que", "Para"], "The author did it even though there was an obstacle."],
    ["Escribió la reseña ____ los lectores conocieran la novela.", "para que", ["porque", "aunque"], "The goal of the action; the verb that follows is subjunctive."],
    ["La novela es innovadora; ____, algunos críticos la rechazan.", "no obstante", ["así pues", "es decir"], "It introduces a contrast."],
    ["Se trata de un género nuevo, ____, de una mezcla de poesía y ensayo.", "es decir", ["sin embargo", "en cambio"], "The second part explains the first."],
    ["En primer lugar, definiré los términos; ____, analizaré el texto.", "en segundo lugar", ["por el contrario", "a pesar de"], "It continues the order of the essay."],
    ["____ a la crisis económica, muchas empresas cerraron.", "Debido", ["Pese", "Mediante"], "It gives the cause: 'owing to'."]
  ], "Example: 'Estudió mucho; ____, aprobó.' takes 'por eso' because the second idea is the result. Now do yours.",
  [["Connectors", "🔗", "Connectors show how ideas relate: <b>contrast</b> (sin embargo, no obstante, en cambio), <b>result</b> (por lo tanto, por consiguiente), <b>cause</b> (debido a, puesto que), <b>addition</b> (además, asimismo), <b>order</b> (en primer lugar...)."], ["Purpose", "🎯", "<b>para que</b> + subjunctive expresses purpose. <b>A pesar de que</b> and <b>aunque</b> express concession."], ["Remember", "💡", "Before choosing, ask: does the second idea add, contrast, explain or follow from the first?"]]);

  const indig28 = K([
    ["Which language was the main language of the Inca Empire and is still spoken in the Andes?", "Quechua", ["Guaraní", "Nahuatl"], "It is spoken in Peru, Bolivia and Ecuador."],
    ["Which indigenous language is an official language of Paraguay, together with Spanish?", "Guaraní", ["Quechua", "Mapudungun"], "Many Paraguayans are bilingual in it."],
    ["Which Spanish word comes from Nahuatl, the language of the Aztecs?", "chocolate", ["guitarra", "azúcar"], "The other two come from other languages, one of them Arabic."],
    ["Which word comes from Taíno, spoken in the Caribbean?", "huracán", ["chocolate", "cóndor"], "It names a powerful tropical storm."],
    ["Which word comes from Quechua?", "llama", ["tomate", "canoa"], "It names an animal of the high Andes."],
    ["Mapudungun is the language of which people?", "the Mapuche, in Chile and Argentina", ["the Maya, in Guatemala", "the Aztecs, in Mexico"], "Think of southern Chile."],
    ["What is the <i>Popol Vuh</i>?", "a sacred book of the K'iche' Maya", ["a Spanish epic poem", "a Quechua dictionary"], "It tells the creation stories of a Maya people of Guatemala."],
    ["Around which lake is Aymara spoken in Bolivia and Peru?", "Lake Titicaca", ["Lake Maracaibo", "Lake Nicaragua"], "It is the highest large navigable lake in the world."]
  ], "Example: 'tomate' comes from Nahuatl 'tomatl', like 'aguacate' from 'ahuacatl'. Now do yours.",
  [["Living languages", "🗺️", "Millions of people in Latin America speak <b>indigenous languages</b>: Quechua, Aymara, Guaraní, Nahuatl, Maya languages, Mapudungun."], ["Gifts to Spanish", "🔁", "Spanish borrowed many words: <b>chocolate, tomate, aguacate</b> (Nahuatl), <b>papa, llama, cóndor</b> (Quechua), <b>hamaca, huracán, canoa</b> (Taíno)."], ["Remember", "💡", "Match language + place: Quechua-Andes, Guaraní-Paraguay, Nahuatl-Mexico, Taíno-Caribbean."]]);

  const subj28 = F([
    ["Es importante que los estudiantes ____ la bibliografía.", "citen", ["citan", "citarán"], "'Es importante que' triggers the subjunctive."],
    ["Buscamos un traductor que ____ tres idiomas.", "hable", ["habla", "hablará"], "The translator is not known yet: subjunctive."],
    ["Cuando ____ a Madrid, visitaré el Prado.", "llegue", ["llego", "llegaré"], "Future time after 'cuando' takes the subjunctive."],
    ["Si ____ más tiempo, leería toda la obra de Borges.", "tuviera", ["tengo", "tendría"], "Unlikely condition: imperfect subjunctive."],
    ["Si hubieras leído el ensayo, ____ la tesis.", "habrías entendido", ["entendías", "entenderás"], "Impossible past condition: conditional perfect."],
    ["Ojalá que el editor ____ mi manuscrito.", "acepte", ["acepta", "aceptará"], "'Ojalá que' expresses a wish."],
    ["Dudo que el autor ____ la verdad.", "diga", ["dice", "dirá"], "Doubt triggers the subjunctive."],
    ["No creo que esa teoría ____ correcta.", "sea", ["es", "será"], "Negative opinion verb: subjunctive."]
  ], "Example: 'Espero que ella ____ pronto' (to come) takes 'venga'. Now do yours.",
  [["Subjunctive in new contexts", "🔄", "You know the subjunctive. Now spot it in <b>academic and professional</b> sentences: wishes, doubts, emotions, impersonal opinions, future time and unknown people or things."], ["Triggers", "⚡", "<b>Es importante que, dudo que, no creo que, ojalá, cuando (future), para que, buscamos un... que</b>."], ["Remember", "💡", "Real, known facts use the indicative. Wishes, doubts, goals and hypotheses use the subjunctive."]]);

  const listen28 = RD([
    { t: "Hoy hablaremos de la poesía de Pablo Neruda. Nació en Chile en mil novecientos cuatro y recibió el Premio Nobel en mil novecientos setenta y uno. Para el próximo martes, lean tres odas del libro Odas elementales.",
      qs: [["Which poet is the lecture about?", "Pablo Neruda", ["Octavio Paz", "César Vallejo"], "Find la poesía de."], ["In what year did he win the Nobel Prize?", "1971", ["1904", "1917"], "Listen for the second year."], ["Where was he born?", "Chile", ["Peru", "Mexico"], "Find Nació en."], ["What is the homework for Tuesday?", "read three odes", ["write a poem", "watch a film"], "Find lean tres."]] },
    { t: "Buenos días, señora Torres. Le llamo de la empresa Solmar para confirmar nuestra reunión del jueves a las nueve y media. Por favor, traiga el presupuesto y el contrato firmado. Si no puede venir, llámenos al número que le enviamos por correo.",
      qs: [["Why is the caller phoning?", "to confirm a meeting", ["to sell a product", "to cancel a trip"], "Find para confirmar."], ["When is the meeting?", "Thursday at 9:30", ["Tuesday at 9:00", "Thursday at 3:30"], "Find del jueves."], ["What should she bring?", "the budget and the signed contract", ["a new logo", "lunch for the team"], "Find traiga."], ["What should she do if she cannot come?", "phone the company", ["send a letter", "come the next day"], "Find llámenos."]] },
    { t: "En el programa de hoy hablamos con una traductora de novelas. Dice que lo más difícil es mantener el humor y el ritmo del original. Para ella, traducir no es cambiar palabras, sino recrear una voz.",
      qs: [["Who is the guest?", "a literary translator", ["a chef", "a politician"], "Find traductora de novelas."], ["What is hardest, according to her?", "keeping the humour and rhythm", ["finding a publisher", "reading fast"], "Find lo más difícil."], ["For her, translating is...", "recreating a voice", ["changing words one by one", "shortening the book"], "Find sino."]] }
  ], LISTEN_SLIDES);

  const t28 = TYE(L28B, "literary analysis, word building, business and the media");

  const L28 = [
    XL("Analysing a story", V(LIT)), XL("The Baroque", baroque28), XL("Spanish poets of the 1900s", poets28), XL("The Boom and magical realism", boom28),
    XL("Women writers", women28), XL("Parts of words", V(MORPH)), XL("Building words and sentences", wordform28), XL("In the office", V(BUS)),
    XL("A formal business letter", letter28), XL("News and media", V(MEDIA)), XL("Reading: the news", news28), XL("Translating business and media", transMedia28),
    XL("Registers in action", register28), XL("Advanced connectors", connect28), XL("Indigenous languages and Spanish", indig28), XL("Review: the subjunctive in new contexts", subj28),
    XL("Listening: lecture, call, radio", listen28), XL("Type it in Spanish", t28),
    XL("Mixed practice", MIX([V(LIT), baroque28, poets28, boom28, women28, wordform28, register28, indig28])),
    XL("Level 28 Challenge", MIX([V(LIT), baroque28, poets28, boom28, women28, V(MORPH), wordform28, V(BUS), letter28, V(MEDIA), news28, transMedia28, register28, connect28, indig28, subj28, listen28]))
  ];

  // =====================================================================
  // LEVEL 29 (College year 2, first half)
  // =====================================================================
  const RHET = SP("Arguments and rhetoric", [["tesis", "thesis", "📌"], ["argumento", "argument", "🗣️"], ["premisa", "premise", "🧱"], ["evidencia", "evidence", "🔬"], ["refutar", "to refute", "🚫"], ["postura", "position, stance", "🧍"], ["persuadir", "to persuade", "🎯"], ["conclusión", "conclusion", "🏁"]]);
  const SEM = SP("Meaning in language", [["significado", "meaning", "💭"], ["sinónimo", "synonym", "🟰"], ["antónimo", "antonym", "↔️"], ["polisemia", "polysemy (many meanings)", "🔀"], ["connotación", "connotation", "🎨"], ["ambigüedad", "ambiguity", "❓"], ["contexto", "context", "🧭"], ["registro", "register", "🎚️"]]);
  const PROF = SP("Medicine and law", [["diagnóstico", "diagnosis", "🩺"], ["receta", "prescription", "💊"], ["tratamiento", "treatment", "🏥"], ["abogado", "lawyer", "⚖️"], ["juicio", "trial", "🏛️"], ["ley", "law", "📜"], ["derecho", "law (as a subject), right", "📚"], ["ingeniero", "engineer", "👷"]]);
  const POLI = SP("Current affairs", [["elecciones", "elections", "🗳️"], ["gobierno", "government", "🏛️"], ["candidato", "candidate", "🧑‍💼"], ["huelga", "strike", "✊"], ["manifestación", "demonstration, march", "📣"], ["partido político", "political party", "🏳️"], ["congreso", "congress", "🏢"], ["votar", "to vote", "✅"]]);
  const L29B = [].concat(RHET.items, SEM.items, PROF.items, POLI.items);

  const quijote29 = K([
    ["Who is Don Quijote's loyal squire?", "Sancho Panza", ["Rocinante", "Dulcinea"], "He is practical and fond of proverbs and food."],
    ["What is the name of Don Quijote's horse?", "Rocinante", ["Sancho", "Babieca"], "It is thin and old."],
    ["What does Don Quijote mistake for giants?", "windmills", ["castles", "sheep"], "They have long arms that turn in the wind."],
    ["Who is Dulcinea del Toboso?", "the lady he imagines and honours", ["his horse", "the village priest"], "She is the object of his idealised devotion."],
    ["In which region of Spain is the story set?", "La Mancha", ["Galicia", "Catalonia"], "The title says 'de la ___'."],
    ["Why do many critics call <i>Don Quijote</i> the first modern novel?", "it plays with fiction and its characters change", ["it was the first printed book", "it is written entirely in verse"], "Think of narrators who discuss their own book."],
    ["Cervantes died in 1616. Which English writer is said to have died in the same year?", "William Shakespeare", ["Charles Dickens", "Jane Austen"], "April 23 is World Book Day because of both."],
    ["The Cervantes Prize is the highest honour for...", "a lifetime of work in Spanish", ["the best film in Spanish", "the best scientific paper"], "It is given each year to a writer."]
  ], "Example: 'Who is the hero of <i>Lazarillo de Tormes</i>?' is answered by finding the poor boy who serves many masters. Now do yours.",
  [["Don Quijote", "🏇", "<i>Don Quijote de la Mancha</i> (1605, 1615) tells of a gentleman who reads so many chivalry books that he goes out as a knight with his squire <b>Sancho Panza</b>."], ["Idealism vs realism", "⚖️", "Quijote sees <b>giants</b>; Sancho sees <b>windmills</b>. The book is funny and sad, and asks what is real and what we choose to believe."], ["Remember", "💡", "Cervantes is honoured every year with the <b>Premio Cervantes</b>, the top prize for writers in Spanish."]]);

  const modern29 = K([
    ["Which Nicaraguan poet is the father of <i>modernismo</i> and wrote <i>Azul...</i> (1888)?", "Rubén Darío", ["José Martí", "José Asunción Silva"], "His musical verse changed poetry in Spanish."],
    ["Which Cuban poet and patriot wrote <i>Versos sencillos</i> and the essay <i>Nuestra América</i>?", "José Martí", ["Nicolás Guillén", "Rubén Darío"], "He is a national hero of Cuba."],
    ["Which writer of the Generation of '98 wrote <i>Niebla</i> and was rector at Salamanca?", "Miguel de Unamuno", ["Pío Baroja", "Azorín"], "He was a philosopher as well as a novelist."],
    ["The Generation of '98 was shaped by which event?", "Spain's loss of its last colonies", ["the Spanish Armada", "the invention of film"], "It happened in the year that names the group."],
    ["What is the <i>esperpento</i> of Valle-Inclán in <i>Luces de bohemia</i>?", "a style that distorts reality to show it as grotesque", ["a gentle love poem", "a realistic travel diary"], "Like a deforming mirror."],
    ["Which novelist of the Generation of '98 wrote <i>El árbol de la ciencia</i>?", "Pío Baroja", ["Ramón del Valle-Inclán", "Miguel de Unamuno"], "He was a doctor before being a writer."],
    ["Modernista poets were especially interested in...", "beauty, music and exotic images", ["business news", "scientific reports"], "They believed in 'art for art's sake'."],
    ["Which of these is NOT a modernista concern?", "writing only legal documents", ["musical rhythm", "refined images"], "Look for the one that is not literary."]
  ], "Example: 'Who wrote <i>Campos de Castilla</i>?' is Antonio Machado, linked with Castilian landscape. Now do yours.",
  [["Modernismo", "💎", "<b>Modernismo</b> (late 1800s) began in Latin America with <b>Rubén Darío</b> and <b>José Martí</b>. It loved music, colour, exotic images and refined language."], ["Generation of '98", "🇪🇸", "After Spain lost Cuba, Puerto Rico and the Philippines in <b>1898</b>, writers such as <b>Unamuno, Baroja, Azorín and Machado</b> reflected on Spain's identity. Valle-Inclán created the <b>esperpento</b>."], ["Remember", "💡", "Modernismo is a Hispanic movement (not 'modernism' in English). It started in America and influenced Spain."]]);

  const lpoetry29 = K([
    ["Which Chilean poet wrote <i>Canto general</i> and won the Nobel Prize in 1971?", "Pablo Neruda", ["Vicente Huidobro", "Nicanor Parra"], "He also wrote <i>Odas elementales</i>."],
    ["Which Mexican poet and essayist wrote <i>Piedra de sol</i> and <i>El laberinto de la soledad</i>?", "Octavio Paz", ["Carlos Fuentes", "Juan Rulfo"], "He won the Nobel Prize in 1990."],
    ["Which Peruvian poet wrote <i>Trilce</i> and <i>Los heraldos negros</i>?", "César Vallejo", ["Mario Vargas Llosa", "José María Arguedas"], "His poems are daring and deeply human."],
    ["Which Cuban poet wrote Afro-Cuban poems such as those in <i>Sóngoro cosongo</i>?", "Nicolás Guillén", ["José Martí", "Alejo Carpentier"], "He used the rhythms of son music."],
    ["Which Puerto Rican poet wrote <i>Río Grande de Loíza</i>?", "Julia de Burgos", ["Gabriela Mistral", "Alfonsina Storni"], "Her poems celebrate a river of her island."],
    ["Which of Gabriela Mistral's books collects lullabies and songs for children?", "<i>Ternura</i>", ["<i>Desolación</i>", "<i>Trilce</i>"], "The title means 'tenderness'."],
    ["Which Chilean poet is known for 'antipoetry'?", "Nicanor Parra", ["Pablo Neruda", "Octavio Paz"], "He used everyday, ironic language."],
    ["Which Chilean poet founded <i>creacionismo</i>, the idea that a poet creates a new world?", "Vicente Huidobro", ["Nicanor Parra", "Pablo Neruda"], "He was a pioneer of avant-garde poetry."]
  ], "Example: 'Who wrote <i>Cántico</i>?' is a Spanish poet, not a Latin American one, so match each book with its poet's country first. Now do yours.",
  [["Poets of Latin America", "🌎", "From <b>Neruda</b> (Chile) to <b>Paz</b> (Mexico), <b>Vallejo</b> (Peru) and <b>Guillén</b> (Cuba), Latin American poetry is rich, political and musical."], ["Avant-garde and everyday voices", "🎙️", "<b>Huidobro</b> founded creacionismo. <b>Parra</b> invented antipoetry with plain, ironic speech. <b>Julia de Burgos</b> and <b>Mistral</b> wrote from a woman's voice."], ["Remember", "💡", "Link each poet to a book and a country."]]);

  const stage29 = K([
    ["Which play by Lorca is set in a house where a strict mother keeps her daughters in mourning?", "<i>La casa de Bernarda Alba</i>", ["<i>Don Juan Tenorio</i>", "<i>La vida es sueño</i>"], "It happens in a closed Andalusian house."],
    ["Which Lorca tragedy's title means 'Blood Wedding'?", "<i>Bodas de sangre</i>", ["<i>Fuenteovejuna</i>", "<i>El alcalde de Zalamea</i>"], "Translate the title into Spanish words you know."],
    ["Which Spanish filmmaker made the surrealist film <i>Un perro andaluz</i> (1929) with Salvador Dalí?", "Luis Buñuel", ["Pedro Almodóvar", "Carlos Saura"], "He was born in Aragon."],
    ["Which Spanish director won an Oscar for <i>Todo sobre mi madre</i> (1999)?", "Pedro Almodóvar", ["Luis Buñuel", "Guillermo del Toro"], "His films are colourful and full of family drama."],
    ["Which Mexican director made the dark fantasy <i>El laberinto del fauno</i> (2006)?", "Guillermo del Toro", ["Alfonso Cuarón", "Pedro Almodóvar"], "He loves monsters and fairy tales."],
    ["Which Mexican director made <i>Roma</i> (2018), set in Mexico City in the 1970s?", "Alfonso Cuarón", ["Guillermo del Toro", "Luis Buñuel"], "The film is based on his childhood."],
    ["What is a <i>telenovela</i>?", "a serialised TV drama that ends after a set run", ["a TV news show", "a long poem"], "It has one story that continues every day."],
    ["What is a <i>zarzuela</i>?", "Spanish musical theatre that mixes songs and speech", ["a type of bullfight", "a modern art style"], "It is like an operetta."]
  ], "Example: 'Who directed <i>Volver</i>?' is Pedro Almodóvar, a Spanish director known for melodrama. Now do yours.",
  [["Theatre and cinema", "🎬", "<b>Lorca</b> wrote powerful plays about Spain's rural society. In cinema, <b>Buñuel</b> was a surrealist pioneer, <b>Almodóvar</b> a modern Spanish master, and <b>del Toro</b> and <b>Cuarón</b> are Mexican directors with international fame."], ["Popular forms", "📺", "The <b>telenovela</b> is a TV drama with a beginning and an end. The <b>zarzuela</b> is a traditional Spanish musical theatre."], ["Remember", "💡", "Link each name to a work: Lorca-<i>Bodas de sangre</i>, Buñuel-<i>Un perro andaluz</i>, Cuarón-<i>Roma</i>."]]);

  const history29 = K([
    ["Spanish developed mainly from which language?", "Vulgar Latin", ["Classical Greek", "Arabic"], "Think of the Roman Empire."],
    ["Which language gave Spanish words such as <i>aceite</i>, <i>almohada</i> and <i>ojalá</i>?", "Arabic", ["Basque", "German"], "Arabic-speaking peoples lived in Iberia for centuries."],
    ["In what year did Antonio de Nebrija publish the first Spanish grammar?", "1492", ["1713", "1812"], "It is the year of Columbus's first voyage."],
    ["In what year was the Real Academia Española (RAE) founded?", "1713", ["1492", "1898"], "It was in the 1700s."],
    ["What is Ladino (Judeo-Spanish)?", "the language of Sephardic Jews, based on medieval Spanish", ["a Quechua dialect", "a language of Equatorial Guinea"], "It was carried by Jews who left Spain in 1492."],
    ["What is true of Basque (<i>euskera</i>)?", "it is not related to Spanish or Latin", ["it comes from Latin", "it comes from Arabic"], "It is a language of the Pyrenees region with very old origins."],
    ["What did the Reconquista help spread?", "Castilian across the peninsula", ["Greek", "Quechua"], "Castile expanded south over several centuries."],
    ["Who produces the <i>Diccionario de la lengua española</i> together with the Association of Academies?", "the RAE", ["the Instituto Cervantes alone", "the United Nations"], "It is the 'Real Academia'."]
  ], "Example: 'Which language gave the word <i>azúcar</i>?' is Arabic, as with many words that begin with 'al-'. Now do yours.",
  [["From Latin to Spanish", "🏛️", "Spanish grew from <b>Vulgar Latin</b>, then added words from <b>Arabic</b>, Basque, Greek, French and Indigenous languages."], ["Standardising", "📘", "<b>Nebrija</b> wrote the first grammar (1492). The <b>RAE</b> (1713) created a dictionary and a grammar that today are shared with all Spanish-speaking academies."], ["Remember", "💡", "Dates help: 1492 Nebrija, 1713 RAE."]]);

  const world29 = K([
    ["In which continent is Equatorial Guinea, the only Spanish-speaking country there?", "Africa", ["Asia", "Oceania"], "It is on the west coast, near the equator."],
    ["Which Spanish-based creole is spoken in parts of the Philippines?", "Chavacano", ["Ladino", "Papiamento"], "The Philippines were a Spanish colony until 1898."],
    ["Which Spanish-speaking place is a territory of the United States?", "Puerto Rico", ["Cuba", "Costa Rica"], "It is in the Caribbean."],
    ["Roughly how many native speakers does Spanish have worldwide?", "about 480-500 million", ["about 50 million", "about 5 billion"], "It is one of the most spoken languages in the world."],
    ["Which country has the most Spanish speakers?", "Mexico", ["Spain", "Argentina"], "Its population is larger than Spain's."],
    ["Which country governs Easter Island (Rapa Nui)?", "Chile", ["Peru", "Spain"], "It lies far out in the Pacific, west of South America."],
    ["What does the Instituto Cervantes do?", "teaches and promotes Spanish and Hispanic cultures", ["publishes sports news", "grants visas"], "It has centres in many countries."],
    ["Spanish is one of the official languages of which organisation?", "the United Nations", ["the Olympic Games only", "the World Bank only"], "It has six official languages."]
  ], "Example: 'Which language is also official in Peru?' Quechua. Now do yours.",
  [["A global language", "🌍", "Spanish is spoken on four continents. It is the main language of 20 countries and one of the six official languages of the <b>UN</b>."], ["Unusual places", "📍", "<b>Equatorial Guinea</b> (Africa), <b>Puerto Rico</b> (US territory) and the Philippines (Chavacano creole) show Spanish beyond Spain and Latin America."], ["Remember", "💡", "Mexico has the most native speakers; Spain is the origin of the language."]]);

  const profMail29 = F([
    ["Adjunto mi currículum ____ solicitar el puesto de analista.", "para", ["por", "sin"], "It gives the purpose."],
    ["Tengo cinco años de ____ en el sector financiero.", "experiencia", ["experimento", "expediente"], "A word for what you have learned by working."],
    ["Estaré encantado de ____ una entrevista.", "concertar", ["concentrar", "convertir"], "You arrange or set up a meeting."],
    ["Me ____ del proyecto durante dos años.", "encargué", ["encargo", "encargaré"], "A completed period in the past: preterite."],
    ["Domino varios idiomas, ____ mi lengua materna.", "además de", ["a pesar de", "antes de"], "It adds information."],
    ["Le informo de que he ____ el curso de contabilidad.", "completado", ["completo", "completaré"], "After 'he' you need a past participle."],
    ["En la reunión se ____ el nuevo plan.", "aprobó", ["aprobaron", "aprobé"], "The plan is singular, so the verb is singular."],
    ["Agradezco de antemano su ____ y atención.", "tiempo", ["temporada", "hora"], "A standard thanks phrase at the end of formal emails."]
  ], "Example: 'Quisiera ____ una cita' (to request) uses 'solicitar'. Now do yours.",
  [["Professional emails", "💼", "A CV or cover email states <b>your purpose</b>, your <b>experience</b> and your <b>availability</b>, always in a formal register."], ["Useful structures", "🧩", "<b>Adjunto mi currículum para...</b>, <b>Tengo X años de experiencia en...</b>, <b>Me encargué de...</b>, <b>Quedo a su disposición</b>."], ["Remember", "💡", "Use preterite for finished tasks (<b>me encargué</b>), present perfect for results that still matter (<b>he completado</b>)."]]);

  const transLit29 = TR([
    ["Nadie sabía de dónde venía el viento que movía las hojas.", "Nobody knew where the wind that moved the leaves came from."],
    ["Aunque llegara tarde, la esperarían.", "Even if she arrived late, they would wait for her."],
    ["Me gustaría que el narrador fuera más sincero.", "I would like the narrator to be more honest."],
    ["El pueblo parecía dormido bajo el calor del mediodía.", "The town seemed asleep under the midday heat."],
    ["No hay mal que por bien no venga.", "Every cloud has a silver lining."],
    ["Se lo dio sin que nadie lo notara.", "He gave it to him without anyone noticing."],
    ["De haberlo sabido, habría vuelto antes.", "Had he known, he would have returned sooner."],
    ["Cuanto más leía, más entendía.", "The more he read, the more he understood."],
    ["Le dolía el alma, pero no lo dijo.", "His soul ached, but he did not say so."]
  ], TRANS_SLIDES);

  const pitfall29 = K([
    ["What does <i>actualmente</i> mean?", "currently", ["actually", "eventually"], "It is a false friend of an English adverb."],
    ["What does <i>realizar</i> usually mean?", "to carry out", ["to realise (understand)", "to make real estate"], "'Realizar un proyecto' means doing it."],
    ["What does <i>constipado</i> mean?", "having a cold", ["constipated", "very tired"], "Think of the winter."],
    ["What does <i>embarazada</i> mean?", "pregnant", ["embarrassed", "excited"], "Do not use it for feeling shy."],
    ["What does <i>asistir a</i> mean in 'Asistí a la clase'?", "to attend", ["to assist", "to avoid"], "You were present."],
    ["What does <i>soportar</i> mean in 'No soporto el ruido'?", "to stand, to bear", ["to support", "to listen to"], "It is about tolerance."],
    ["In 'Estudia una carrera de ingeniería', what is <i>una carrera</i>?", "a university degree programme", ["a competition", "a salary"], "She is a student."],
    ["Which is the natural translation of 'I look forward to seeing you' (informal)?", "Tengo ganas de verte.", ["Miro adelante a verte.", "Estoy mirando adelante a ti."], "Translate the idea, not word for word."]
  ], "Example: 'librería' is a bookstore, not a library (that is 'biblioteca'). Now do yours.",
  [["False friends", "⚠️", "Some Spanish words look like English ones but mean something else: <b>actualmente</b> (currently), <b>constipado</b> (with a cold), <b>embarazada</b> (pregnant)."], ["Calques", "🪞", "A calque is a word-for-word copy of another language's expression. 'Miro adelante a verte' is a calque of 'I look forward to seeing you'. Use <b>tengo ganas de verte</b>."], ["Remember", "💡", "When a Spanish word looks too similar to English, check a dictionary before trusting it."]]);

  const money29 = K([
    ["What is the currency of Guatemala?", "quetzal", ["colón", "lempira"], "It is named after a bird."],
    ["What is the currency of Costa Rica?", "colón", ["quetzal", "córdoba"], "It is named after Columbus (Colón)."],
    ["What is the currency of Honduras?", "lempira", ["córdoba", "balboa"], "It is named after an indigenous leader."],
    ["What is the currency of Nicaragua?", "córdoba", ["lempira", "guaraní"], "The name honours a Spanish conquistador from Córdoba."],
    ["What is the currency of Paraguay?", "guaraní", ["sol", "quetzal"], "It shares its name with a language and a people."],
    ["What is the currency of Peru?", "sol", ["peso", "colón"], "Its name means 'sun'."],
    ["Which country uses the US dollar as its main currency?", "Ecuador", ["Chile", "Colombia"], "It adopted it in 2000."],
    ["Mercosur is a trade bloc whose founding members include...", "Argentina and Brazil", ["Chile and Peru", "Mexico and Cuba"], "It was created in 1991 with Paraguay and Uruguay."]
  ], "Example: 'What is the currency of Mexico?' is the peso. Now do yours.",
  [["Money and trade", "💰", "Many Latin American countries use the <b>peso</b> (Mexico, Argentina, Colombia, Chile). Others have their own names: <b>quetzal, colón, lempira, córdoba, guaraní, sol</b>."], ["Blocs and agreements", "🤝", "<b>Mercosur</b> links Argentina, Brazil, Paraguay and Uruguay. Spain uses the <b>euro</b> and belongs to the European Union."], ["Remember", "💡", "Many currency names honour people or birds: quetzal (bird), colón (Columbus), lempira (leader)."]]);

  const cond29 = F([
    ["Si el autor hubiera vivido hoy, ____ la novela de otra manera.", "habría escrito", ["escribió", "escriba"], "Impossible past condition: conditional perfect."],
    ["Cuando era niño, mi abuela me ____ cuentos cada noche.", "contaba", ["contó", "contará"], "A repeated habit in the past: imperfect."],
    ["Para cuando llegamos, la película ya ____.", "había empezado", ["empieza", "empezará"], "An action earlier than another past action: pluperfect."],
    ["Me pidió que le ____ el contrato.", "mandara", ["mando", "mandaré"], "Past request: imperfect subjunctive."],
    ["Habrá terminado el informe antes de que ____ el director.", "llegue", ["llega", "llegará"], "'Antes de que' takes the subjunctive."],
    ["Quería un puesto en el que ____ viajar.", "pudiera", ["puedo", "podré"], "An unknown, wished-for job in the past."],
    ["No sabía que ellos ya ____ la oferta.", "habían aceptado", ["aceptan", "aceptarán"], "Past perspective, earlier action."],
    ["Ayer ____ una reseña muy crítica del libro.", "leí", ["leo", "leeré"], "'Ayer' marks a finished past action."]
  ], "Example: 'Cuando llegué, ella ya ____' (salir) takes 'había salido'. Now do yours.",
  [["Review: past and hypothetical", "⏪", "Use <b>imperfect</b> for habits and background, <b>preterite</b> for finished events, <b>pluperfect</b> for earlier past actions, <b>conditional perfect</b> for impossible past results."], ["Trigger words", "🔔", "<b>Ayer</b> (preterite); <b>cada noche, de niño</b> (imperfect); <b>ya, antes de</b> (pluperfect); <b>si hubiera... habría...</b>."], ["Remember", "💡", "Decide first: finished, habitual, earlier, or imaginary?"]]);

  const read29 = RD([
    { t: "Don Elías vivía solo en una casa vieja junto al río. Cada tarde escribía cartas que nunca enviaba. Decía que no importaba si alguien las leía, porque escribirlas le daba compañía. Cuando murió, sus vecinos encontraron cientos de sobres cerrados debajo de la cama.",
      qs: [["Where did Don Elías live?", "in an old house by the river", ["in a city flat", "in a village inn"], "Find junto al río."], ["What did he do each afternoon?", "wrote letters he never sent", ["read the newspaper", "fished"], "Find cada tarde."], ["Why did he write?", "writing gave him company", ["to win a prize", "to teach others"], "Find le daba compañía."], ["What did the neighbours find?", "hundreds of sealed envelopes", ["a lot of money", "an old map"], "Find debajo de la cama."]] },
    { t: "Algunos críticos sostienen que la traducción siempre traiciona el original. Otros, en cambio, piensan que una buena traducción es una nueva creación que amplía la vida de la obra. Yo creo que ambas posturas tienen algo de razón.",
      qs: [["What do some critics claim?", "translation always betrays the original", ["translation is easy", "originals are worthless"], "Find traiciona."], ["What do others think?", "a good translation is a new creation", ["translation should be banned", "translators are not needed"], "Find una nueva creación."], ["What is the author's position?", "both views have some truth", ["only the first view is right", "neither view matters"], "Find ambas posturas."], ["Which phrase introduces the contrast?", "en cambio", ["algunos críticos", "tienen algo de razón"], "It starts the second view."]] },
    { t: "La familia Quispe cultiva papas en los Andes desde hace generaciones. Hablan quechua en casa y español en la escuela. La hija mayor quiere estudiar agronomía en la ciudad, pero promete volver para ayudar a su comunidad.",
      qs: [["What does the family grow?", "potatoes", ["coffee", "corn only"], "Find cultiva."], ["Which language do they speak at home?", "Quechua", ["Spanish", "English"], "Find en casa."], ["Where do they use Spanish?", "at school", ["at home", "in the fields"], "Find en la escuela."], ["What does the eldest daughter want to study?", "agronomy", ["law", "music"], "Find quiere estudiar."], ["What does she promise?", "to come back and help her community", ["to move abroad", "to open a shop"], "Find promete."]] }
  ], READ_SLIDES);

  const listen29 = RD([
    { t: "Bienvenidos al Museo del Prado. Hoy veremos tres obras: Las Meninas, de Velázquez; El jardín de las delicias, de El Bosco; y El caballero de la mano en el pecho, de El Greco. La visita dura una hora y media. Por favor, no usen flash.",
      qs: [["Which museum is it?", "the Prado", ["the Louvre", "the Guggenheim"], "Find Bienvenidos al Museo."], ["How long is the visit?", "an hour and a half", ["half an hour", "three hours"], "Find la visita dura."], ["What must visitors not use?", "flash", ["pencils", "audio guides"], "Find no usen."], ["Who painted <i>Las Meninas</i>?", "Velázquez", ["El Greco", "El Bosco"], "Find de Velázquez."]] },
    { t: "Esta semana, el club de debate de la universidad discutirá si las redes sociales mejoran o empeoran la comunicación. El debate será el miércoles a las seis de la tarde en el aula magna. Cada equipo hablará durante diez minutos.",
      qs: [["What is the debate about?", "social media and communication", ["sports", "the weather"], "Find las redes sociales."], ["When is it?", "Wednesday at 6 p.m.", ["Monday at 6 a.m.", "Wednesday at 10 a.m."], "Find el miércoles."], ["Where is it?", "in the main hall", ["in the library", "online only"], "Find aula magna."], ["How long does each team speak?", "ten minutes", ["two minutes", "an hour"], "Find cada equipo."]] },
    { t: "Habla Marta Ruiz, de recursos humanos. Hemos revisado su solicitud y nos gustaría invitarle a una entrevista el lunes veinte, a las once de la mañana. La entrevista será en nuestras oficinas del centro. Por favor, confirme su asistencia.",
      qs: [["Which department is calling?", "human resources", ["sales", "the bank"], "Find recursos humanos."], ["When is the interview?", "Monday the 20th at 11 a.m.", ["Friday the 20th at 11 a.m.", "Monday the 11th at 20:00"], "Find el lunes veinte."], ["Where is it?", "in the downtown offices", ["by video only", "at the airport"], "Find oficinas del."], ["What should the listener do?", "confirm attendance", ["send a gift", "cancel the application"], "Find confirme."]] }
  ], LISTEN_SLIDES);

  const t29 = TYE(L29B, "arguments, meaning, medicine, law and current affairs");

  const L29 = [
    XL("Arguments and rhetoric", V(RHET)), XL("Don Quijote", quijote29), XL("Modernismo and the Generation of '98", modern29), XL("Poets of Latin America", lpoetry29),
    XL("Theatre and cinema", stage29), XL("Meaning in language", V(SEM)), XL("How Spanish took shape", history29), XL("Spanish around the world", world29),
    XL("Medicine and law", V(PROF)), XL("Professional emails and CVs", profMail29), XL("Current affairs", V(POLI)), XL("Translating literary sentences", transLit29),
    XL("False friends and calques", pitfall29), XL("Money and trade", money29), XL("Review: past and hypothetical", cond29), XL("Reading: letters, translation, Quispe family", read29),
    XL("Listening: museum, debate, interview", listen29), XL("Type it in Spanish", t29),
    XL("Mixed practice", MIX([V(RHET), quijote29, modern29, lpoetry29, stage29, history29, world29, pitfall29])),
    XL("Level 29 Challenge", MIX([V(RHET), quijote29, modern29, lpoetry29, stage29, V(SEM), history29, world29, V(PROF), profMail29, V(POLI), transLit29, pitfall29, money29, cond29, read29, listen29]))
  ];

  // =====================================================================
  // LEVEL 30 (College year 2, second half)
  // =====================================================================
  const ACAD = SP("Academic writing", [["tesis", "thesis", "📌"], ["bibliografía", "bibliography", "📚"], ["cita", "quotation, citation", "💬"], ["resumen", "summary, abstract", "📝"], ["párrafo", "paragraph", "¶"], ["borrador", "draft", "✏️"], ["plagio", "plagiarism", "🚫"], ["apéndice", "appendix", "📎"]]);
  const FIN = SP("Money matters", [["inversión", "investment", "📈"], ["interés", "interest", "🏦"], ["ahorro", "savings", "🐷"], ["deuda", "debt", "📉"], ["impuesto", "tax", "🧾"], ["préstamo", "loan", "💳"], ["bolsa", "stock market", "📊"], ["ingresos", "income, revenue", "💵"]]);
  const GLOB = SP("Global issues", [["cambio climático", "climate change", "🌡️"], ["desarrollo sostenible", "sustainable development", "♻️"], ["desigualdad", "inequality", "⚖️"], ["migración", "migration", "🧳"], ["energía renovable", "renewable energy", "☀️"], ["desempleo", "unemployment", "📉"], ["derechos humanos", "human rights", "🕊️"], ["salud pública", "public health", "🏥"]]);
  const L30B = [].concat(ACAD.items, FIN.items, GLOB.items, SEM.items.slice(0, 4));

  const dict30 = K([
    ["Which García Márquez novel portrays an aging dictator?", "<i>El otoño del patriarca</i>", ["<i>Cien años de soledad</i>", "<i>Crónica de una muerte anunciada</i>"], "The title mentions a season and a 'patriarch'."],
    ["Which Paraguayan author wrote <i>Yo el Supremo</i>, a novel about a dictator?", "Augusto Roa Bastos", ["Miguel Ángel Asturias", "Mario Benedetti"], "He won the Cervantes Prize in 1989."],
    ["Which Vargas Llosa novel (2000) is about the dictator Trujillo of the Dominican Republic?", "<i>La fiesta del Chivo</i>", ["<i>La ciudad y los perros</i>", "<i>Pantaleón y las visitadoras</i>"], "'El Chivo' was the dictator's nickname."],
    ["Which Guatemalan author wrote the early dictator novel <i>El señor presidente</i>?", "Miguel Ángel Asturias", ["Augusto Roa Bastos", "Alejo Carpentier"], "He won the Nobel Prize in 1967."],
    ["Which Chilean author wrote <i>Los detectives salvajes</i> (1998) and <i>2666</i>?", "Roberto Bolaño", ["José Donoso", "Isabel Allende"], "He is often linked with a new generation after the Boom."],
    ["What do 'novels of the dictator' usually explore?", "power, fear and memory", ["gardening and cooking only", "space travel"], "They show life under an authoritarian ruler."],
    ["Which Argentine writer is famous for labyrinths, mirrors and the story collection <i>Ficciones</i>?", "Jorge Luis Borges", ["Julio Cortázar", "Ernesto Sabato"], "He was a librarian before becoming blind."],
    ["Which Uruguayan author wrote <i>Las venas abiertas de América Latina</i>?", "Eduardo Galeano", ["Mario Benedetti", "Juan Carlos Onetti"], "It is a book of history and essay about the region's resources."]
  ], "Example: 'Who wrote <i>Pedro Páramo</i>?' is Juan Rulfo of Mexico. Now do yours.",
  [["The novel of the dictator", "📖", "A major theme in Latin American fiction: <b>power and memory</b> under authoritarian rule. Examples: <i>El señor presidente</i>, <i>Yo el Supremo</i>, <i>El otoño del patriarca</i>, <i>La fiesta del Chivo</i>."], ["Beyond the Boom", "🔭", "After the Boom, writers such as <b>Roberto Bolaño</b> brought new styles, humour and global themes."], ["Remember", "💡", "Match each title with its country: Roa Bastos-Paraguay; Vargas Llosa-Peru; García Márquez-Colombia."]]);

  const now30 = K([
    ["Which Spanish author wrote the mystery <i>La sombra del viento</i>, set in Barcelona?", "Carlos Ruiz Zafón", ["Javier Marías", "Almudena Grandes"], "It features a Cemetery of Forgotten Books."],
    ["Which Argentine author wrote <i>Distancia de rescate</i>?", "Samanta Schweblin", ["Laura Esquivel", "Mariana Enriquez"], "Her short novel is unsettling and set in the countryside."],
    ["Which Cuban author wrote <i>El hombre que amaba a los perros</i>?", "Leonardo Padura", ["Alejo Carpentier", "Reinaldo Arenas"], "He also writes detective novels with Mario Conde."],
    ["Which Colombian novelist wrote <i>El ruido de las cosas al caer</i> (2011)?", "Juan Gabriel Vásquez", ["Gabriel García Márquez", "Santiago Gamboa"], "He belongs to a younger generation than García Márquez."],
    ["Which Uruguayan author wrote the novel <i>La tregua</i> (1960)?", "Mario Benedetti", ["Eduardo Galeano", "Juan Carlos Onetti"], "He was also a poet and a journalist."],
    ["Which Spanish author wrote <i>El cuarto de atrás</i> (1978), which mixes memory and dream?", "Carmen Martín Gaite", ["Carmen Laforet", "Rosa Montero"], "She won the Nadal Prize for it."],
    ["Which Chilean author wrote <i>Los detectives salvajes</i>?", "Roberto Bolaño", ["Isabel Allende", "Pablo Neruda"], "He died in Spain in 2003."],
    ["The label 'post-Boom' refers to authors who...", "wrote after the Boom, with new styles and themes", ["wrote before the year 1500", "only wrote poetry"], "Post means 'after'."]
  ], "Example: 'Who wrote <i>El Aleph</i>?' is Borges, but for new writers look at recent decades. Now do yours.",
  [["Today's voices", "🆕", "Contemporary Spanish-language fiction is varied: crime fiction (<b>Padura, Zafón</b>), psychological and fantastic stories (<b>Schweblin</b>), historical memory (<b>Vásquez, Martín Gaite</b>)."], ["Trends", "🌐", "Many authors write about <b>migration, identity, memory and technology</b>. Many publish across countries, and their books are translated worldwide."], ["Remember", "💡", "Pair title + country: Padura-Cuba, Schweblin-Argentina, Vásquez-Colombia, Zafón-Spain."]]);

  const nobel30 = K([
    ["Who was the first Latin American writer to win the Nobel Prize in Literature (1945)?", "Gabriela Mistral", ["Pablo Neruda", "Octavio Paz"], "She was Chilean and a teacher."],
    ["Which Spanish poet won the Nobel Prize in Literature in 1956?", "Juan Ramón Jiménez", ["Vicente Aleixandre", "Camilo José Cela"], "He wrote <i>Platero y yo</i>."],
    ["Which Guatemalan author won the Nobel Prize in 1967?", "Miguel Ángel Asturias", ["Gabriel García Márquez", "Octavio Paz"], "He wrote <i>El señor presidente</i>."],
    ["Which Chilean poet won the Nobel Prize in 1971?", "Pablo Neruda", ["Gabriela Mistral", "Nicanor Parra"], "He wrote <i>Canto general</i>."],
    ["Which Colombian author won the Nobel Prize in 1982?", "Gabriel García Márquez", ["Mario Vargas Llosa", "Álvaro Mutis"], "He wrote <i>Cien años de soledad</i>."],
    ["Which Spanish novelist who wrote <i>La familia de Pascual Duarte</i> won the Nobel Prize in 1989?", "Camilo José Cela", ["Miguel Delibes", "Juan Benet"], "He published his first novel in 1942."],
    ["Which Mexican poet and essayist won the Nobel Prize in 1990?", "Octavio Paz", ["Carlos Fuentes", "Juan Rulfo"], "He wrote <i>El laberinto de la soledad</i>."],
    ["Which Peruvian novelist won the Nobel Prize in 2010?", "Mario Vargas Llosa", ["Julio Ramón Ribeyro", "César Vallejo"], "He wrote <i>La ciudad y los perros</i>."]
  ], "Example: 'Who won the Nobel Prize in 1977?' is Vicente Aleixandre. Now do yours.",
  [["Nobel Prizes in Spanish", "🏅", "Writers in Spanish have won the Nobel Prize in Literature for many decades: <b>Mistral (1945), Jiménez (1956), Asturias (1967), Neruda (1971), Aleixandre (1977), García Márquez (1982), Cela (1989), Paz (1990), Vargas Llosa (2010)</b>."], ["How to remember", "🧠", "Group them: 1945-1971 (Mistral, Jiménez, Asturias, Neruda), 1977-1990 (Aleixandre, García Márquez, Cela, Paz), then 2010 (Vargas Llosa)."], ["Remember", "💡", "Use the book to remember the author: <i>Canto general</i> for Neruda, <i>Platero y yo</i> for Jiménez."]]);

  const art30 = K([
    ["Which court painter of Philip IV painted <i>Las Meninas</i>?", "Diego Velázquez", ["Francisco de Goya", "El Greco"], "He worked in the 1600s."],
    ["Which Spanish artist created the satirical series <i>Los caprichos</i>?", "Francisco de Goya", ["Diego Velázquez", "Salvador Dalí"], "He worked around 1800."],
    ["Which architect designed the Sagrada Familia in Barcelona?", "Antoni Gaudí", ["Santiago Calatrava", "Pablo Picasso"], "He loved natural, curving forms."],
    ["Which Picasso painting of 1937 is a famous antiwar work?", "<i>Guernica</i>", ["<i>Las Meninas</i>", "<i>La persistencia de la memoria</i>"], "It is a huge black, white and grey painting."],
    ["Which surrealist painter painted melting clocks in <i>La persistencia de la memoria</i>?", "Salvador Dalí", ["Joan Miró", "Diego Rivera"], "He was from Figueres, Catalonia."],
    ["Which Mexican artist is famous for her self-portraits?", "Frida Kahlo", ["Remedios Varo", "Julia de Burgos"], "She painted in Mexico City, in the Blue House."],
    ["Which Mexican artist painted large public murals about Mexican history?", "Diego Rivera", ["Fernando Botero", "Joan Miró"], "He was a leader of the Mexican muralist movement."],
    ["Which Colombian artist is famous for paintings and sculptures of round, voluminous figures?", "Fernando Botero", ["Diego Rivera", "Frida Kahlo"], "Born in Medellín in 1932."]
  ], "Example: 'Who painted <i>El caballero de la mano en el pecho</i>?' is El Greco. Now do yours.",
  [["Spanish and Latin American art", "🎨", "<b>Velázquez</b> and <b>Goya</b> are giants of Spanish painting. <b>Picasso</b> and <b>Dalí</b> shaped modern art. <b>Gaudí</b> transformed architecture in Barcelona."], ["Mexico and Colombia", "🖼️", "<b>Kahlo</b> (portraits), <b>Rivera</b> (murals) and <b>Botero</b> (round figures) are among the best known Latin American artists."], ["Remember", "💡", "Always link the work to the artist and the century: Velázquez-1600s; Goya-1700s/1800s; Picasso-1900s."]]);

  const socio30 = K([
    ["What is <i>code-switching</i> (cambio de código)?", "moving between two languages in one conversation", ["translating a text word for word", "learning a new alphabet"], "Bilinguals do it naturally."],
    ["What is Spanglish?", "a mixture of Spanish and English used by some US Latinos", ["a dialect of Portuguese", "an ancient Latin form"], "It combines two languages in speech."],
    ["What is a <i>lingua franca</i>?", "a common language used between groups with different mother tongues", ["a dead language", "a secret code"], "It lets people from different groups communicate."],
    ["Which of these is an <i>anglicismo</i> (English borrowing) in Spanish?", "el marketing", ["la mesa", "el caballo"], "It is a word that came from English."],
    ["What is a <i>calco</i> (calque)?", "a word-for-word copy of a foreign expression", ["a rare spelling", "a loud accent"], "Think of 'look forward to' copied word by word."],
    ["What is a <i>neologismo</i>?", "a newly created word", ["an obsolete word", "a proverb"], "'Neo' means new."],
    ["What is a <i>heritage speaker</i> (hablante de herencia)?", "someone who grew up hearing a family language but studied mostly in another", ["a person who never speaks", "a language teacher"], "Think of the grandparents' language."],
    ["What is the difference between an official and a national language?", "an official language is used by the government; a national language is a recognised language of a country's culture", ["there is no difference", "an official language is always spoken by everyone"], "Think about government and identity."]
  ], "Example: 'bilingüe' describes a person who uses two languages. Now do yours.",
  [["Language in society", "🗣️", "Sociolinguistics studies how language works in society. <b>Code-switching</b>, <b>Spanglish</b> and <b>heritage speakers</b> show living bilingualism."], ["Borrowing and creating", "🔁", "<b>Anglicismos</b> are borrowings; <b>calcos</b> copy structures; <b>neologismos</b> are newly created words (like 'tuitear')."], ["Remember", "💡", "Language change is normal. Each community decides what sounds natural."]]);

  const phon30 = K([
    ["What is <i>seseo</i>?", "pronouncing z and c (before e, i) like s", ["pronouncing s like th everywhere", "dropping all vowels"], "It is the usual pronunciation in Latin America."],
    ["What is <i>distinción</i> in Spanish pronunciation?", "pronouncing z/c as 'th' and s as 's'", ["pronouncing every letter the same", "pronouncing h as j"], "It is typical in northern and central Spain."],
    ["What is <i>yeísmo</i>?", "pronouncing ll like y", ["pronouncing y like ll", "pronouncing b like v"], "Most speakers do it today."],
    ["In which areas is the final -s often pronounced softly or aspirated?", "the Caribbean and parts of Andalusia", ["the Andean highlands only", "Equatorial Guinea only"], "Think of coastal accents."],
    ["How is ll or y often pronounced in Argentina and Uruguay?", "like 'sh' or 'zh'", ["like 'k'", "like 'th'"], "Think of Buenos Aires."],
    ["What is <i>lleísmo</i>?", "keeping a different sound for ll and y", ["mixing b and v", "pronouncing ñ as n"], "Some Andean and northern regions keep it."],
    ["What is <i>ceceo</i>?", "pronouncing s like 'th'", ["pronouncing z like s", "dropping the final vowel"], "It is found in parts of southern Spain."],
    ["Which statement about Andean Spanish is typical?", "consonants and final -s are usually clearly pronounced", ["all s sounds disappear", "every word is whispered"], "Think of the highlands in Peru, Bolivia and Ecuador."]
  ], "Example: 'seseo' means 'casa' and 'caza' can sound the same. Now do yours.",
  [["Variation in sounds", "🔈", "Spanish sounds vary: <b>seseo</b> (z, c = s), <b>distinción</b> (th vs s), <b>yeísmo</b> (ll = y), <b>aspiration</b> of -s in coastal areas, <b>sh</b> sound in Río de la Plata."], ["All are correct", "✅", "Every variety is valid. A good listener recognises the main patterns and does not judge them."], ["Remember", "💡", "Link a feature with a region: seseo-Latin America; distinción-Spain; sh-Argentina."]]);

  const negot30 = F([
    ["Estaríamos dispuestos a bajar el precio ____ ustedes aumentaran el pedido.", "si", ["porque", "mientras"], "A condition: 'if'."],
    ["Nos ____ muy bien que firmaran hoy.", "vendría", ["viene", "vino"], "Polite hypothesis: conditional."],
    ["¿Le ____ posible entregar el pedido antes del lunes?", "sería", ["serías", "seríamos"], "Formal 'usted': third person singular."],
    ["Lamentablemente, no podemos aceptar esas ____.", "condiciones", ["condenas", "condicionales"], "Terms of a deal."],
    ["Proponemos que ambas partes ____ a un acuerdo.", "lleguen", ["llegan", "llegarán"], "'Proponemos que' takes the subjunctive."],
    ["El contrato será válido ____ ambas partes lo firmen.", "siempre que", ["puesto que", "dado que"], "Condition about the future, followed by the subjunctive."],
    ["Les ruego que ____ nuestras disculpas.", "acepten", ["aceptan", "aceptarán"], "A polite request with 'ruego que'."],
    ["Quedamos a su entera ____ para cualquier duda.", "disposición", ["posición", "disponible"], "A fixed formal closing phrase."]
  ], "Example: 'Les agradeceríamos que ____ el pago' (hacer) takes 'hicieran'. Now do yours.",
  [["Negotiating politely", "🤝", "Use the <b>conditional</b> and <b>imperfect subjunctive</b> for polite proposals: <b>Nos vendría bien que...</b>, <b>Estaríamos dispuestos a...</b>, <b>¿Le sería posible...?</b>"], ["Conditions", "📋", "<b>Siempre que</b> and <b>con tal de que</b> introduce a condition and take the subjunctive. <b>Si</b> uses the indicative or the imperfect subjunctive."], ["Remember", "💡", "A polite tone is part of the deal. Be firm but courteous."]]);

  const transBiz30 = TR([
    ["El contrato entra en vigor el primero de enero.", "The contract takes effect on January 1st."],
    ["Las partes se comprometen a respetar los plazos.", "The parties agree to respect the deadlines."],
    ["La empresa registró pérdidas durante el último trimestre.", "The company recorded losses during the last quarter."],
    ["Agradecemos su confianza en nuestros servicios.", "We thank you for your trust in our services."],
    ["Los accionistas votarán en la junta del jueves.", "Shareholders will vote at Thursday's meeting."],
    ["Sírvase enviar la documentación a la mayor brevedad.", "Please send the documents as soon as possible."],
    ["Se prohíbe la reproducción total o parcial de esta obra.", "Total or partial reproduction of this work is prohibited."],
    ["Las exportaciones crecieron gracias a los nuevos mercados.", "Exports grew thanks to the new markets."],
    ["El banco ofrece préstamos con un interés bajo.", "The bank offers loans with a low interest rate."]
  ], TRANS_SLIDES);

  const oped30 = RD([
    { t: "Cada vez más ciudades prohíben los coches en el centro. Los defensores sostienen que así se reduce la contaminación y se mejora la vida de los vecinos. Los comerciantes, sin embargo, temen perder clientes. Quizá la solución sea un equilibrio: más transporte público y zonas peatonales graduales.",
      qs: [["What do more and more cities do?", "ban cars in the centre", ["build more car parks", "close all shops"], "Find prohíben."], ["What do supporters argue?", "pollution goes down and neighbours' lives improve", ["shops will earn more", "taxes will fall"], "Find sostienen."], ["What do shopkeepers fear?", "losing customers", ["more noise", "fewer buses"], "Find temen."], ["What solution does the author suggest?", "a balance with public transport and gradual pedestrian zones", ["ban everything at once", "do nothing"], "Find un equilibrio."]] },
    { t: "La novela comienza con una prosa luminosa, pero su segunda mitad se pierde en digresiones. Aun así, el retrato de la abuela es inolvidable. Recomendable para quien disfrute de la lectura pausada.",
      qs: [["How does the review describe the beginning?", "luminous prose", ["boring and dull", "full of errors"], "Find luminosa."], ["What is the weakness?", "the second half wanders into digressions", ["the title", "the cover"], "Find se pierde."], ["What is unforgettable?", "the portrait of the grandmother", ["the ending", "the narrator's voice"], "Find inolvidable."], ["Who is the book recommended to?", "readers who enjoy slow reading", ["people in a hurry", "children under six"], "Find recomendable."]] },
    { t: "El español es hoy una lengua de ciencia y de tecnología, y no solo de literatura. Sin embargo, solo una pequeña parte de los artículos científicos se publica en español. Por eso algunas universidades promueven revistas científicas en nuestro idioma.",
      qs: [["What is the main idea?", "Spanish is also a language of science, though it is underused there", ["Spanish is only for poetry", "Science has no language"], "Compare the first two sentences."], ["Which word introduces a contrast?", "sin embargo", ["por eso", "hoy"], "It changes direction."], ["What do some universities do?", "support scientific journals in Spanish", ["ban English", "stop publishing"], "Find promueven."]] }
  ], READ_SLIDES);

  const listen30 = RD([
    { t: "Hoy estudiaremos el cambio lingüístico. Las lenguas no son estáticas: las palabras cambian de sonido y de significado con el tiempo. Por ejemplo, la palabra latina FILIUM dio hijo en español, mientras que en italiano dio figlio. Para el examen, preparen una página sobre un cambio fonético.",
      qs: [["What is today's topic?", "language change", ["poetry", "grammar tests"], "Find hoy estudiaremos."], ["What did the Latin word FILIUM become in Spanish?", "hijo", ["figlio", "filho"], "Find dio hijo."], ["What did it become in Italian?", "figlio", ["hijo", "fils"], "Find en italiano."], ["What should students prepare for the exam?", "one page on a sound change", ["a poem", "a dictionary"], "Find preparen."]] },
    { t: "El ministro de Educación presentó hoy un programa de becas para que quinientos estudiantes de zonas rurales estudien en la universidad. Las solicitudes se abrirán el primero de marzo y se cerrarán el treinta y uno de mayo.",
      qs: [["Who presented the programme?", "the education minister", ["the mayor", "a journalist"], "Find el ministro."], ["How many students will benefit?", "five hundred", ["fifty", "five thousand"], "Find quinientos."], ["Who are the students?", "from rural areas", ["from big cities", "foreign tourists"], "Find zonas rurales."], ["When do applications close?", "May 31", ["March 1", "May 1"], "Listen for se cerrarán."]] },
    { t: "En este episodio, un guía de Oaxaca explica por qué el mole es más que una salsa: cada familia tiene su receta, y se prepara para celebraciones importantes. Algunas recetas llevan más de veinte ingredientes.",
      qs: [["Where is the guide from?", "Oaxaca", ["Madrid", "Lima"], "Find un guía de."], ["Why is mole more than a sauce?", "families have their own recipes for celebrations", ["it is very cheap", "it is eaten only by tourists"], "Find cada familia."], ["How many ingredients can some recipes have?", "more than twenty", ["exactly two", "about five"], "Find más de."]] }
  ], LISTEN_SLIDES);

  const regshift30 = K([
    ["Which is the formal version of 'Dame el informe'?", "¿Podría darme el informe, por favor?", ["¿Me das el informe ya?", "Dame el informe, vale."], "Use the conditional and 'usted'."],
    ["Which closing is the formal version of 'Un abrazo'?", "Reciba un cordial saludo.", ["Besos y abrazos.", "Hasta luego, tío."], "It is suitable for a business letter."],
    ["Which is the formal version of 'Perdona el retraso'?", "Le ruego que disculpe el retraso.", ["Perdona, tío.", "Lo siento un montón."], "Use 'usted' in the request."],
    ["Which academic phrase replaces 'Creo que'?", "Se puede afirmar que", ["Me parece guay que", "A lo mejor"], "A formal, impersonal opinion."],
    ["Which is the formal replacement for 'un montón de gente'?", "un gran número de personas", ["mogollón de gente", "tela de gente"], "Use a precise, neutral phrase."],
    ["Which connector is a formal replacement for 'también'?", "asimismo", ["además guay", "o sea"], "It is common in essays."],
    ["Which connector is a formal replacement for 'pero'?", "no obstante", ["pues nada", "bueno"], "It introduces a contrast in formal writing."],
    ["Which sentence is academic in tone?", "Este estudio analiza la influencia del quechua en el español andino.", ["Voy a contar algo guay del quechua.", "El quechua mola un montón."], "It is objective and uses precise vocabulary."]
  ], "Example: 'Dime la hora' becomes '¿Podría decirme la hora?' in formal register. Now do yours.",
  [["Shifting register", "🎚️", "You can say the same idea in different registers. <b>Formal</b>: conditional, 'usted', set phrases. <b>Informal</b>: 'tú', slang, short forms."], ["Academic vocabulary", "🎓", "Use <b>asimismo, no obstante, cabe señalar que, se puede afirmar que</b> instead of 'también, pero, creo que'."], ["Remember", "💡", "Match your register to your reader and purpose."]]);

  const grammar30 = F([
    ["El informe, ____ autor es anónimo, circuló en la prensa.", "cuyo", ["que su", "donde"], "A relative word that links the report and its author."],
    ["Se ____ varios errores en el texto.", "detectaron", ["detectó", "detectaste"], "'Errores' is plural."],
    ["Los cuentos ____ fueron publicados en 1950 son famosos.", "que", ["quien", "donde"], "A relative word for things."],
    ["Es probable que el narrador ____ mintiendo.", "esté", ["está", "estará"], "'Es probable que' takes the subjunctive."],
    ["Habría sido mejor que ____ la verdad.", "dijeras", ["dices", "dirás"], "Imperfect subjunctive after a past conditional."],
    ["Con tal de que ____ a tiempo, puedes entregarlo mañana.", "llegues", ["llegas", "llegarás"], "'Con tal de que' takes the subjunctive."],
    ["Se lo ____ ayer a los estudiantes.", "expliqué", ["explico", "explicaré"], "'Ayer' marks a finished past action."],
    ["La carta fue ____ por el director.", "firmada", ["firmado", "firmando"], "The participle agrees with the feminine noun in a passive."]
  ], "Example: 'El libro, ____ página final falta, es raro' takes 'cuya'. Now do yours.",
  [["Final grammar review", "🧰", "Mix everything: <b>relatives (cuyo, que)</b>, <b>passive and impersonal se</b>, <b>subjunctive</b> after conjunctions, <b>past tenses</b>."], ["Strategy", "🧭", "Find the subject, the time, and the trigger. Then choose the form."], ["Remember", "💡", "'Cuyo' agrees with the noun that follows it, not the owner."]]);

  const transLit30 = TR([
    ["La memoria es un territorio que se reinventa cada día.", "Memory is a territory that reinvents itself every day."],
    ["Quien mucho abarca, poco aprieta.", "Do not bite off more than you can chew."],
    ["Su voz, grave y pausada, llenaba la sala.", "His voice, deep and slow, filled the room."],
    ["Por más que lo intentó, no logró convencerlos.", "No matter how hard he tried, he could not convince them."],
    ["Se vende bien, aunque nadie lo reconozca.", "It sells well, even if nobody admits it."],
    ["Más vale tarde que nunca.", "Better late than never."],
    ["El poeta se negó a que le cambiaran ni una coma.", "The poet refused to let them change a single comma."],
    ["Tan pronto como termine el curso, empezaré la traducción.", "As soon as the course ends, I will begin the translation."],
    ["Lo que importa no es el destino, sino el camino.", "What matters is not the destination but the journey."]
  ], TRANS_SLIDES);

  const essay30 = K([
    ["Which sentence is the strongest thesis statement?", "La traducción literaria es un acto de creación, no solo de copia.", ["La traducción es muy interesante.", "Voy a hablar de la traducción."], "A thesis states a clear, arguable claim."],
    ["What is the role of a <i>oración temática</i> (topic sentence)?", "to state the main idea of a paragraph", ["to give the bibliography", "to end the essay"], "It usually opens the paragraph."],
    ["Which phrase usually begins the final paragraph?", "En conclusión,", ["Por ejemplo,", "En primer lugar,"], "It signals the end."],
    ["How can you avoid plagiarism?", "cite your sources", ["copy and change a few words", "use only the first source"], "Give credit to the author."],
    ["What is a <i>contraargumento</i>?", "an opposing point you answer in your essay", ["a spelling mistake", "a thank-you note"], "It helps your argument look fair and strong."],
    ["Where does the thesis normally appear?", "in the introduction", ["in the bibliography", "in the appendix"], "It guides the reader from the start."],
    ["Which is the best final step before handing in an essay?", "proofread spelling, accents and agreement", ["add more slang", "delete the sources"], "Look at the small details."],
    ["Which register is best for an academic essay?", "formal and impersonal", ["slang and jokes", "text-message abbreviations"], "A university reader expects it."]
  ], "Example: 'Where do quotes and sources go at the end?' In the bibliography. Now do yours.",
  [["Planning an essay", "🗂️", "An essay has an <b>introduction</b> (with the <b>tesis</b>), <b>body paragraphs</b> (each with a topic sentence, evidence and a link) and a <b>conclusion</b>."], ["Writing well", "✍️", "Use connectors, precise vocabulary and a formal register. Always <b>cite your sources</b> to avoid <b>plagio</b>."], ["Remember", "💡", "Draft, revise, proofread. Good writing is rewriting."]]);

  const t30 = TYE(L30B, "academic writing, finance, global issues and meaning");

  const L30 = [
    XL("Academic writing", V(ACAD)), XL("Novels of the dictator and beyond", dict30), XL("Writers of today", now30), XL("Nobel Prizes in Spanish", nobel30),
    XL("Art and architecture", art30), XL("Language in society", socio30), XL("Sound variation", phon30), XL("Money matters", V(FIN)),
    XL("Negotiating politely", negot30), XL("Translating business texts", transBiz30), XL("Global issues", V(GLOB)), XL("Reading: opinion, review, science", oped30),
    XL("Listening: lecture, news, podcast", listen30), XL("Changing register", regshift30), XL("Final grammar review", grammar30), XL("Translating literary and cultural sentences", transLit30),
    XL("Planning an essay", essay30), XL("Type it in Spanish", t30),
    XL("Mixed practice", MIX([V(ACAD), dict30, now30, nobel30, art30, socio30, phon30, regshift30, essay30])),
    XL("Level 30 Challenge", MIX([V(ACAD), dict30, now30, nobel30, art30, socio30, phon30, V(FIN), negot30, transBiz30, V(GLOB), oped30, listen30, regshift30, grammar30, transLit30, essay30]))
  ];

  Object.assign(SPANISH_LEVELS, { 28: L28, 29: L29, 30: L30 });
})();
