// ext/spanish-25-27.js  Mind Lab Spanish, levels 25-27 (60 lessons)
// 12th grade and College year 1 (first half): literature, culture, linguistics, registers, translation, reading and listening.
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
      { h: bank.name, v: bank.items.slice(0, 3).map(x => x[2] || "💬").join(" "), t: `Today's topic: <b>${bank.name.toLowerCase()}</b>. These words appear in university readings, essays and discussions.` },
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
      { h: "Accents are optional", v: "á é í ó ú ñ", t: "You can leave the accents off: <b>etimología</b> and <b>etimologia</b> both count." },
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
  const FB = (rows, h1, h2, h3, slides) => RW(rows.map(([s, a, w, c]) => ["Complete the sentence:<br><b>" + s + "</b>", a, w, c]), h1, h2, h3, slides);
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
  const READ_SLIDES = [["Reading at college level", "📖", "First find the main idea and the author's purpose. Then reread for details, tone and how the argument is built."], ["Use the clue", "🔍", "Each question points to a key word. Find it, then read the sentence before and after it. Contrast words such as <b>sin embargo</b> and <b>en cambio</b> change the direction of an idea."], ["Tip", "💡", "You do not need every word. Guess new words from context, from English cousins and from the words around them."]];
  const LISTEN_SLIDES = [["Listening-style practice", "🎧", "Press 🔊 to hear the passage, as in a real listening task. Listen once for the main idea, then again for numbers, names, places and reasons."], ["Catch the details", "🔢", "Announcements, talks and messages are full of <b>times, days, places and things to do</b>. Notice them as you listen."], ["Tip", "💡", "Say the numbers and days out loud in Spanish as you hear them. It helps you remember."]];

  // =====================================================================
  // LEVEL 25 (12th grade, first half)
  // =====================================================================
  const LING = SP("The sounds of language", [["fonética", "phonetics", "🔈"], ["fonema", "phoneme (a sound unit)", "🔤"], ["sílaba", "syllable", "👏"], ["acento", "stress or accent mark", "´"], ["vocal", "vowel", "🅰️"], ["consonante", "consonant", "🅱️"], ["diptongo", "diphthong", "🔗"], ["entonación", "intonation", "🎶"]]);
  const HISTL = SP("How languages grow", [["latín", "Latin", "🏛️"], ["dialecto", "dialect", "🗺️"], ["préstamo", "loanword", "🔁"], ["etimología", "etymology", "🌱"], ["idioma", "language", "💬"], ["lengua materna", "mother tongue", "👪"], ["bilingüe", "bilingual", "🌐"], ["variante", "variety, variant", "🔀"]]);
  const GENR = SP("Kinds of texts", [["crónica", "chronicle, news feature", "📰"], ["reseña", "review", "⭐"], ["ensayo", "essay", "📝"], ["cuento", "short story", "📕"], ["novela", "novel", "📚"], ["reportaje", "feature report", "🎥"], ["editorial", "editorial", "🗞️"], ["entrevista", "interview", "🎙️"]]);
  const L25B = [].concat(LING.items, HISTL.items, GENR.items);

  const early25 = RW([
    ["Which medieval epic poem tells of a Castilian hero and his exile?", "Cantar de mio Cid", ["La Celestina", "Lazarillo de Tormes"], "It is the oldest major epic poem in Spanish."],
    ["Who wrote <i>La vida es sueño</i>, a Golden Age play about a prince kept in a tower?", "Pedro Calderón de la Barca", ["Lope de Vega", "Garcilaso de la Vega"], "He wrote in the 1600s; the title says life is a dream."],
    ["Which prolific Golden Age playwright wrote <i>Fuenteovejuna</i>?", "Lope de Vega", ["Calderón de la Barca", "Francisco de Quevedo"], "He is said to have written hundreds of plays."],
    ["<i>Lazarillo de Tormes</i> (1554) began which kind of novel?", "the picaresque novel", ["the detective novel", "the science-fiction novel"], "Its hero is a clever boy who serves many masters and survives by his wits."],
    ["Which nun of New Spain (Mexico) wrote <i>Hombres necios</i>?", "Sor Juana Inés de la Cruz", ["Gabriela Mistral", "Rosalía de Castro"], "She lived in the 1600s and defended women's right to learn."],
    ["Which Renaissance poet helped bring the Italian sonnet into Spanish?", "Garcilaso de la Vega", ["Luis de Góngora", "Lope de Vega"], "He lived in the 1500s, earlier than the Baroque poets."],
    ["Which Baroque writer was famous for his sharp satires and his rivalry with Góngora?", "Francisco de Quevedo", ["Garcilaso de la Vega", "Fernando de Rojas"], "Think of the 1600s and of witty, biting poems."],
    ["<i>La Celestina</i> (1499) was written by...", "Fernando de Rojas", ["Miguel de Cervantes", "Jorge Manrique"], "It is a dialogue-novel from the end of the Middle Ages."]
  ], "Think about the century first: Middle Ages, Renaissance (1500s) or Baroque (1600s). Then match the title with its writer.",
    "Link each work with its kind (epic, play, sonnet, satire) and with its century.",
    "Example: <i>Don Quijote</i> (1605) was written by Cervantes, a novelist of the Golden Age. Now match yours.",
    [["Golden Age and before", "📜", "Spanish literature has a long chain: <b>medieval epic</b> (the Cid), <b>Renaissance</b> poets such as Garcilaso, and the <b>Siglo de Oro</b> (1500s-1600s) with Cervantes, Lope, Calderón and Quevedo."], ["Genres to know", "🎭", "The <b>picaresque</b> (Lazarillo) follows a clever outsider. The <b>comedia</b> was the great theater of Lope and Calderón. The <b>sonnet</b> came from Italy."], ["A voice from the Americas", "🔔", "<b>Sor Juana</b> (New Spain, 1600s) was a poet, thinker and scholar. She is a bridge between Spain and the Americas."]]);

  const langsSpain = RW([
    ["Which language of Spain is NOT descended from Latin?", "euskera (Basque)", ["gallego (Galician)", "catalán (Catalan)"], "It is an old language of unknown family, spoken in the north."],
    ["In which region is Galician (gallego) spoken?", "Galicia, in the northwest", ["Andalusia, in the south", "Catalonia, in the northeast"], "Think of the Atlantic coast, next to Portugal."],
    ["What is the language of Spain that most people call 'Spanish' also called?", "castellano (Castilian)", ["aragonés (Aragonese)", "valenciano (Valencian)"], "It takes its name from a historic kingdom in the center of the country."],
    ["Which two languages share official status with Castilian in Catalonia?", "Catalan (and Aranese in the Aran Valley)", ["Basque and Galician", "Portuguese and French"], "One of them is spoken in Barcelona."],
    ["Which of these is a Romance language spoken in Spain?", "catalán", ["euskera", "inglés"], "Romance languages come from Latin."],
    ["Rosalía de Castro wrote <i>Cantares gallegos</i> in...", "Galician", ["Catalan", "Basque"], "Look at the adjective in the title."],
    ["Why is the existence of several languages in Spain called 'plurilingüismo'?", "Many languages live in the same country", ["Only one language is allowed", "Everyone speaks Latin"], "The prefix pluri- means many."],
    ["The Real Academia Española is based in which city?", "Madrid", ["Barcelona", "Santiago de Compostela"], "It is the capital of Spain."]
  ], "Think about the geography: north, northwest, northeast, center. Then think about whether the language comes from Latin.",
    "Remember: Castilian, Galician and Catalan come from Latin; Basque does not.",
    "Example: Portuguese is also a Romance language, because it comes from Latin. Now decide about yours.",
    [["More than one language", "🗺️", "Spain has a <b>castellano</b> majority and regional languages: <b>catalán, gallego, euskera</b> (and others such as aranés)."], ["Latin family", "🏛️", "Castilian, Catalan and Galician are <b>Romance languages</b> from Latin. <b>Euskera</b> (Basque) is different: it pre-dates Latin and has no known relatives."], ["Why it matters", "💡", "Writers such as Rosalía de Castro chose a regional language for their literature. Language and identity are closely connected."]]);

  const latam25 = RW([
    ["Which Chilean poet wrote <i>Veinte poemas de amor y una canción desesperada</i> and won the Nobel Prize in 1971?", "Pablo Neruda", ["Octavio Paz", "Rubén Darío"], "He was from Chile."],
    ["Which Colombian author wrote <i>Cien años de soledad</i>?", "Gabriel García Márquez", ["Mario Vargas Llosa", "Julio Cortázar"], "The novel is set in the fictional town of Macondo."],
    ["Which Argentine writer is famous for the story collection <i>El Aleph</i>, full of labyrinths and mirrors?", "Jorge Luis Borges", ["Juan Rulfo", "Isabel Allende"], "He was from Buenos Aires."],
    ["Which Nicaraguan poet led the movement called Modernismo?", "Rubén Darío", ["Gabriela Mistral", "Octavio Paz"], "His book <i>Azul...</i> opened a new era in the 1880s."],
    ["Who wrote <i>Pedro Páramo</i>, a short novel set in a village of ghosts?", "Juan Rulfo", ["Carlos Fuentes", "Horacio Quiroga"], "He was a Mexican writer of the 1950s."],
    ["Which Mexican poet and essayist won the Nobel Prize for Literature in 1990?", "Octavio Paz", ["Pablo Neruda", "José Martí"], "He wrote <i>El laberinto de la soledad</i>."],
    ["Which Chilean author wrote <i>La casa de los espíritus</i>?", "Isabel Allende", ["Gabriela Mistral", "Rosario Castellanos"], "Her first novel became famous worldwide in the 1980s."],
    ["Who wrote the experimental novel <i>Rayuela</i> (Hopscotch), which can be read in different orders?", "Julio Cortázar", ["Jorge Luis Borges", "Mario Benedetti"], "He was born in Belgium but is considered Argentine."]
  ], "Think of the country first, then the title. Several of these writers won the Nobel Prize.",
    "Link each author to a famous title and to a country.",
    "Example: Gabriela Mistral, from Chile, was the first Latin American to win the Nobel Prize for Literature (1945). Now match yours.",
    [["Voices of Latin America", "🌎", "Modern Latin American literature is rich: Darío (Nicaragua), Mistral and Neruda (Chile), Paz and Rulfo (Mexico), Borges and Cortázar (Argentina), García Márquez (Colombia)."], ["Two big ideas", "✨", "<b>Modernismo</b> renewed poetry in the late 1800s. The <b>Boom</b> of the 1960s made Latin American novels famous around the world."], ["Tip", "💡", "Learn each writer with one title and one country. Three facts are enough to place them."]]);

  const phonetics25 = RW([
    ["In most of the Spanish-speaking world, the letters b and v are pronounced...", "the same way", ["differently: v like English v", "v is always silent"], "Think of 'bote' and 'vote'."],
    ["The letter h in 'hospital' is...", "silent", ["like English h", "like Spanish j"], "Spanish h has no sound of its own."],
    ["Where does the stress fall in 'mesa' (no written accent)?", "second-to-last syllable", ["last syllable", "third-to-last syllable"], "The word ends in a vowel."],
    ["Where does the stress fall in 'ciudad' (no written accent)?", "the last syllable", ["second-to-last syllable", "third-to-last syllable"], "The word ends in a consonant that is not n or s."],
    ["Why does 'teléfono' need a written accent?", "It is stressed on the third-to-last syllable", ["It ends in a vowel", "It has two syllables"], "Words stressed this way always carry a mark."],
    ["Why does 'país' have a written accent?", "The stressed í breaks the pair of vowels into two syllables", ["It ends in s", "It is a question word"], "Notice the a and the i next to each other."],
    ["In 'queso' the letter u is...", "silent", ["pronounced like oo", "pronounced like w"], "Compare 'que' and 'qué'... the u only keeps the k sound."],
    ["The sound of ñ in 'año' is like...", "ny in 'canyon'", ["n in 'nine'", "ng in 'sing'"], "Think of the middle of an English word with two letters for the sound."],
    ["What difference does the accent make in 'sí' and 'si'?", "It separates two words (yes / if)", ["It changes the stress only", "It makes the word plural"], "This is called a diacritic accent."]
  ], "Spanish spelling is very regular. Think about the rule for that letter or for that word ending.",
    "Remember: words ending in a vowel, n or s are stressed on the second-to-last syllable; others on the last. A written accent marks every exception.",
    "Example: 'canción' has a written accent because it ends in n but is stressed on the last syllable. Now apply the rule to yours.",
    [["Sounds and spelling", "🔈", "Spanish has about five vowel sounds and very regular spelling. <b>b/v</b> sound the same, <b>h</b> is silent, and <b>u</b> is silent in <b>que/qui/gue/gui</b>."], ["Stress rules", "👏", "No mark: words ending in <b>vowel, n, s</b> are stressed on the next-to-last syllable; other words on the last. A written accent shows any exception; <b>esdrújulas</b> (teléfono) always have one."], ["Diphthongs and hiatus", "🔗", "Two weak vowels or a weak and a strong one usually share a syllable (<b>cie-lo</b>). A stressed weak vowel breaks them apart: <b>pa-ís</b>, <b>dí-a</b>."]]);

  const register25 = RW([
    ["Which request is the most formal?", "¿Podría usted indicarme dónde está la biblioteca?", ["Oye, ¿dónde está la biblioteca?", "Dime dónde está la biblioteca."], "Look for usted and the conditional."],
    ["Which greeting suits an email to a professor?", "Estimado profesor Vega:", ["¡Ey, profe!", "¿Qué onda, Vega?"], "Choose the polite, traditional opening."],
    ["Which closing is formal?", "Atentamente,", ["Besos,", "Chao,"], "It is used in official letters."],
    ["Which sentence uses usted correctly?", "¿Cómo está usted?", ["¿Cómo estás usted?", "¿Cómo está tú?"], "Usted takes the third-person verb form."],
    ["Which phrase refuses an invitation politely?", "Se lo agradezco, pero no puedo.", ["Ni hablar.", "Qué va, ni loco."], "The best answer thanks the person first."],
    ["Which expression sounds like casual slang?", "¡Qué guay!", ["Resulta muy interesante.", "Me parece admirable."], "Think of what a friend in Spain might say."],
    ["Which form makes a request softer and more polite?", "the conditional: ¿Podría...?", ["the command: ¡Puede!", "the past: ¿Pudo...?"], "Compare 'Puedo' with a verb that means 'would be able'."],
    ["Which sentence is best for a formal essay?", "Cabe destacar que la novela tiene dos partes.", ["Mira, la novela tiene dos partes.", "Oye, la novela tiene dos partes, ¿no?"], "Avoid filler words and direct address."]
  ], "Ask yourself: would I say this to a friend, or to a teacher or stranger? Look for usted, the conditional and polite words.",
    "Formal Spanish uses usted, longer polite phrases and the conditional. Casual Spanish uses tú, short words and slang.",
    "Example: 'Quisiera pedir un favor' is more polite than 'Quiero pedir un favor'. Now choose the most formal one in yours.",
    [["Register", "🎚️", "The <b>register</b> is how formal your language is. A message to a friend is not written like a letter to an office."], ["Formal tools", "🎩", "Use <b>usted</b>, the conditional (<b>podría, quisiera</b>), polite openings (<b>Estimado/a</b>) and closings (<b>Atentamente</b>)."], ["Casual tools", "😎", "With friends use <b>tú</b>, short phrases and slang such as <b>guay</b> (Spain) or <b>qué onda</b> (Mexico). Adapt to your reader."]]);

  const regional25 = RW([
    ["How do you say 'car' in Spain?", "coche", ["carro", "auto"], "Latin America prefers carro or auto."],
    ["Which word for 'computer' is typical of Spain?", "ordenador", ["computadora", "computador"], "The Latin American word looks like the English one."],
    ["Which word for 'cell phone' is typical of Spain?", "móvil", ["celular", "teléfono público"], "The other usual word is used in Latin America."],
    ["'Juice' is 'zumo' in Spain. What is it in most of Latin America?", "jugo", ["caldo", "crema"], "It looks like the English word 'juice'."],
    ["'Potato' is 'patata' in Spain. What is it in Latin America?", "papa", ["tomate", "batata"], "It comes from Quechua."],
    ["Which verb for 'to drive' is typical of Latin America?", "manejar", ["conducir", "coger"], "In Spain people usually say conducir."],
    ["Which Spanish word for 'cool, great' is typical of Spain?", "guay", ["chévere", "padre"], "The other two are from Colombia/Venezuela and Mexico."],
    ["Which word for 'peach' is typical of Latin America?", "durazno", ["melocotón", "albaricoque"], "Spain uses melocotón."],
    ["Which pronoun is used in Spain for informal 'you all'?", "vosotros", ["ustedes", "vos"], "Latin America uses ustedes for this."]
  ], "Think about the two sides of the Atlantic: Spain (península) and Latin America. Many everyday words are different.",
    "Both words are correct. Which one belongs to the region the question names?",
    "Example: 'bus' is 'autobús' almost everywhere but 'guagua' in Cuba and 'colectivo' in Argentina. Now think about yours.",
    [["One language, many words", "🗺️", "Spanish has many varieties. <b>Spain:</b> coche, ordenador, móvil, zumo, patata. <b>Latin America:</b> carro/auto, computadora, celular, jugo, papa."], ["Even more variation", "🚌", "A bus is <b>autobús</b>, <b>guagua</b> (Cuba), <b>colectivo</b> (Argentina) or <b>camión</b> (Mexico). All are correct in their region."], ["Tip", "💡", "No variety is wrong. Learn the common word and notice the local ones as you read and listen."]]);

  const voseo25 = RW([
    ["Which pronoun replaces 'tú' in Argentina and Uruguay?", "vos", ["vosotros", "usted"], "It also has its own verb forms."],
    ["What is the vos form that matches 'tú tienes'?", "vos tenés", ["vos teneis", "vos tiene"], "The stress falls on the last syllable."],
    ["Which pronoun is used in Spain for informal 'you all'?", "vosotros", ["ustedes", "vos"], "Its verbs end in -áis, -éis, -ís."],
    ["What does 'vosotros habláis' end in?", "-áis", ["-an", "-ás"], "Look at the plural 'you' of Spain."],
    ["In most of Latin America, informal 'you all' is...", "ustedes", ["vosotros", "vos"], "It takes third-person plural verbs."],
    ["'Vos sos' corresponds to which tú form?", "tú eres", ["tú estás", "tú vas"], "The verb is ser."],
    ["Which pronoun is the formal singular 'you'?", "usted", ["vos", "vosotros"], "It takes third-person singular verbs."],
    ["Besides Argentina, where is voseo also common?", "parts of Central America", ["the Canary Islands", "only in Spain"], "Think of Costa Rica and Guatemala."],
    ["'Vos querés' means...", "you want", ["we want", "they want"], "The subject pronoun tells you who."]
  ], "Think about who is being addressed (one person or several) and where. Spain and Latin America handle this differently.",
    "Remember: vos replaces tú in some regions; vosotros is the Spain plural; ustedes is the Latin American plural.",
    "Example: 'vos hablás' means 'you speak' and is used in Argentina. Now think about yours.",
    [["Ways to say 'you'", "💬", "Spanish has <b>tú, vos, usted</b> (singular) and <b>vosotros, ustedes</b> (plural). Which ones people use depends on the region and on the relationship."], ["Voseo", "🇦🇷", "In Argentina, Uruguay and parts of Central America people say <b>vos</b>: <b>vos tenés, vos sos, vos querés</b>. It is standard there, not a mistake."], ["Plural 'you'", "👥", "Spain: <b>vosotros</b> (hablá<b>is</b>) for friends and <b>ustedes</b> for formal. Latin America and the Canary Islands: <b>ustedes</b> for both."]]);

  const translate25 = RW([
    ["How do you say 'I am 17 years old'?", "Tengo diecisiete años.", ["Soy diecisiete años.", "Estoy diecisiete años."], "Spanish uses 'have' for age."],
    ["How do you say 'It is cold today'?", "Hace frío hoy.", ["Es frío hoy.", "Tiene frío hoy."], "Weather expressions use a different verb."],
    ["Which is natural for 'I miss you' in Spain?", "Te echo de menos.", ["Te pierdo.", "Te falto mucho."], "The verb is 'echar'; in Latin America people also say 'te extraño'."],
    ["How do you say 'to make a decision'?", "tomar una decisión", ["hacer una decisión", "poner una decisión"], "The Spanish verb is the one you use for 'take'."],
    ["How do you say 'to make a mistake'?", "cometer un error", ["hacer un error", "tomar un error"], "It is a verb that also appears with 'crimen'."],
    ["How do you say 'I am looking for my keys'?", "Busco mis llaves.", ["Busco por mis llaves.", "Miro por mis llaves."], "The Spanish verb already includes 'for'."],
    ["How do you say 'I am waiting for the bus'?", "Espero el autobús.", ["Espero por el autobús.", "Espero para el autobús."], "Do not translate 'for'."],
    ["How do you say 'He is good at math'?", "Es bueno en matemáticas.", ["Es bueno a matemáticas.", "Es bueno de matemáticas."], "Choose the preposition that means 'in'."],
    ["How do you say 'I like it a lot'?", "Me gusta mucho.", ["Gusto mucho.", "Me gusto mucho."], "The thing liked is the subject."]
  ], "Do not translate word by word. Ask how a Spanish speaker would express the idea.",
    "Spanish often uses different verbs and prepositions than English. Think about the whole expression.",
    "Example: 'I'm hungry' is 'Tengo hambre' (I have hunger), not 'Soy hambriento'. Now choose the natural phrase for yours.",
    [["Translate ideas, not words", "🔁", "A good translator keeps the meaning. 'I am 17' becomes <b>Tengo 17 años</b>, and 'It's cold' becomes <b>Hace frío</b>."], ["Verb partners", "🧩", "English says 'make a decision'; Spanish says <b>tomar una decisión</b>. English says 'make a mistake'; Spanish says <b>cometer un error</b>."], ["No extra 'for'", "🔎", "<b>Buscar</b> = to look for. <b>Esperar</b> = to wait for. <b>Escuchar</b> = to listen to. The preposition is already inside the verb."]]);

  const idioms25 = RW([
    ["What does «meter la pata» mean?", "to make a blunder", ["to kick a ball", "to walk fast"], "Think of putting your foot where it does not belong."],
    ["What does «estar en las nubes» mean?", "to daydream, not pay attention", ["to travel by plane", "to be very happy"], "Where is your head?"],
    ["What does «costar un ojo de la cara» mean?", "to be very expensive", ["to hurt your eyes", "to be a bargain"], "Think about the price."],
    ["What does «dar en el clavo» mean?", "to hit the mark, be exactly right", ["to build a house", "to hurt yourself"], "It is the same image as in English."],
    ["What does «ser pan comido» mean?", "to be very easy", ["to be delicious", "to be very old"], "A piece of cake."],
    ["What does «tomar el pelo» mean?", "to tease or trick someone", ["to cut hair", "to take a bath"], "It is a friendly joke at someone's expense."],
    ["What does «hablar por los codos» mean?", "to talk non-stop", ["to talk very quietly", "to be shy"], "Think of someone who never stops."],
    ["What does «ser uña y carne» mean?", "to be inseparable friends", ["to be very strong", "to be enemies"], "Fingernail and flesh cannot be separated."],
    ["What does «echar una mano» mean?", "to help", ["to wave goodbye", "to shake hands"], "Think about what a hand does."]
  ], "Idioms do not mean what the words say. Picture the image, then ask what idea it stands for.",
    "Think about the situation where a native speaker would say this phrase.",
    "Example: «llover a cántaros» does not mean jugs fall from the sky; it means 'to rain heavily'. Now explain yours.",
    [["Idioms", "🗣️", "An <b>idiom</b> (modismo) is a fixed expression whose meaning is not the sum of its words: <b>meter la pata</b> = to make a blunder."], ["Easy to remember", "🖼️", "Picture it: <b>estar en las nubes</b> (head in the clouds), <b>costar un ojo de la cara</b> (cost an eye), <b>ser pan comido</b> (easy as eating bread)."], ["Use them", "💡", "Idioms make your speech sound natural. Try one a day in your own sentence."]]);

  const proverbs25 = RW([
    ["«Más vale tarde que nunca» means...", "It is better to do it late than never", ["Hurry up or you will be late", "Night is better than day"], "Think of someone who arrives late but arrives."],
    ["«A caballo regalado no se le mira el diente» means...", "Do not criticize a gift", ["Always buy a strong horse", "Horses need dental care"], "It is about gifts."],
    ["«En boca cerrada no entran moscas» means...", "Sometimes it is wiser to stay silent", ["Flies are dangerous", "Always keep your windows closed"], "Think about speaking and silence."],
    ["«Quien mucho abarca poco aprieta» means...", "If you take on too much, you do little well", ["The strongest person wins", "Big hands are best"], "It warns against doing too many things."],
    ["«Dime con quién andas y te diré quién eres» means...", "You are judged by the company you keep", ["Walking is healthy", "Always tell your friends the truth"], "Think of friends."],
    ["«Al mal tiempo, buena cara» means...", "Keep a good attitude in hard times", ["Hide when it rains", "Complain about the weather"], "Think of how to face difficulties."],
    ["«No hay mal que por bien no venga» means...", "Bad things can bring something good", ["Nothing good ever happens", "Trouble always returns"], "It is an optimistic proverb."],
    ["«Camarón que se duerme se lo lleva la corriente» means...", "If you are not alert, you lose out", ["Shrimp love sleeping", "Rivers are dangerous"], "It praises being awake and active."]
  ], "Proverbs give advice. Ask what lesson the little story teaches.",
    "Look at the main image (a gift, a closed mouth, a sleeping shrimp) and think what advice it hides.",
    "Example: «Al que madruga, Dios le ayuda» means that people who start early get ahead. Now explain yours.",
    [["Refranes", "📜", "A <b>refrán</b> is a short traditional saying with advice. Spanish has thousands of them."], ["How to read them", "🔍", "Do not translate word for word. Find the image, then the lesson: <b>quien mucho abarca poco aprieta</b> = do not take on too much."], ["Use them", "💡", "In essays and speeches a well-chosen proverb adds color and shows cultural knowledge."]]);

  const subj25 = FB([
    ["Es importante que (tú) ___ la verdad.", "digas", ["dices", "decir"], "The phrase 'es importante que' expresses a need or opinion."],
    ["Busco un libro que ___ historias de misterio.", "tenga", ["tiene", "tendrá"], "The book may or may not exist."],
    ["Dudo que ellos ___ a tiempo.", "lleguen", ["llegan", "llegarán"], "Doubt triggers the wish form."],
    ["Cuando ___ a Madrid, te llamaré.", "llegue", ["llego", "llegaré"], "The arrival is in the future."],
    ["Ojalá que mañana ___ sol.", "haya", ["hay", "habrá"], "Ojalá expresses a wish."],
    ["Si yo ___ más tiempo, leería más.", "tuviera", ["tengo", "tendré"], "The 'if' part of an unreal situation."],
    ["Me alegro de que ___ aquí.", "estés", ["estás", "estar"], "An emotion about someone else's action."],
    ["No creo que ella ___ la respuesta.", "sepa", ["sabe", "sabrá"], "Negated belief."],
    ["Quiero que mi hermano me ___.", "ayude", ["ayuda", "ayudar"], "One person wants another to act."]
  ], "Look at the trigger: a wish, doubt, emotion, an unknown thing, 'cuando' about the future or 'si' with an unreal situation. These call for the wish form (subjunctive).",
    "Decide if the sentence is a fact (indicative) or something wished, doubted or not yet real (subjunctive).",
    "Example: 'Espero que ella cante' uses the subjunctive because of 'espero que'. Now do yours.",
    [["Review: the wish form", "🌠", "The <b>subjunctive</b> appears after wishes, doubt, emotion, opinion (<b>es importante que</b>) and unknown things."], ["Time and unreal 'if'", "⏰", "<b>Cuando llegue, ...</b> (future). <b>Si tuviera tiempo, ...</b> (unreal). The imperfect subjunctive pairs with the conditional."], ["Quick tip", "💡", "Ask: is this real and known (indicative), or wished, doubted, or not yet real (subjunctive)?"]]);

  const pastNarr25 = FB([
    ["Cuando yo ___ niño, vivíamos en Sevilla.", "era", ["fui", "soy"], "It describes a state in the background."],
    ["Ayer ___ una novela de Borges.", "leí", ["leía", "leo"], "A completed action."],
    ["Mientras ella ___, sonó el teléfono.", "leía", ["leyó", "lee"], "The action was in progress when another happened."],
    ["De repente, la puerta ___.", "se abrió", ["se abría", "se abre"], "'De repente' signals a sudden event."],
    ["Todos los veranos, mis abuelos nos ___ a la playa.", "llevaban", ["llevaron", "llevarán"], "'Todos los veranos' signals a habit."],
    ["El año pasado, mi tía ___ a Perú.", "viajó", ["viajaba", "viaja"], "One finished trip."],
    ["Eran las ocho y ___ mucho frío.", "hacía", ["hizo", "hace"], "Describing the scene."],
    ["Anoche (nosotros) ___ hasta las doce.", "bailamos", ["bailábamos", "bailaremos"], "A specific finished event."]
  ], "Is the action finished at one moment (preterite), or is it background, description or habit (imperfect)?",
    "Look for time clues: 'de repente', 'ayer', 'anoche' (preterite) versus 'siempre', 'todos los veranos', 'mientras' (imperfect).",
    "Example: 'Ayer comí pan' (one finished action) but 'De niño comía pan' (habit). Now do yours.",
    [["Narrating in the past", "📖", "The <b>preterite</b> moves the story forward (<b>abrió, llegó</b>). The <b>imperfect</b> paints the scene (<b>era, hacía, vivían</b>) and shows habits."], ["Signal words", "🚦", "Preterite: <b>ayer, anoche, de repente, una vez</b>. Imperfect: <b>siempre, todos los días, mientras, a menudo</b>."], ["Together", "🎬", "<b>Leía cuando sonó el teléfono.</b> The imperfect is the background; the preterite is the interruption."]]);

  const read25 = RD([
    { t: "En la Edad Media, los juglares viajaban de pueblo en pueblo para cantar poemas épicos. Como pocas personas sabían leer, la gente aprendía las historias de memoria al escucharlas en plazas y mercados. El Cantar de mio Cid probablemente se recitó así antes de ser escrito.",
      qs: [["Who traveled from town to town?", "the juglares (minstrels)", ["the merchants", "the kings"], "Find viajaban de pueblo en pueblo."], ["Why did people learn the stories by listening?", "Few people could read", ["There were no stories in writing", "They had no time"], "Find pocas personas sabían leer."], ["Where did people listen to the poems?", "in squares and markets", ["in schools", "in castles only"], "Find plazas y mercados."], ["What does «probablemente» show?", "The writer is not completely sure", ["The writer is certain", "The poem is false"], "Think about what 'probably' does."]] },
    { t: "Muchos estudiantes creen que el español de España es el «correcto» y que el de América es una variante. Sin embargo, los lingüistas explican que ninguna variedad es superior. Cada una tiene su historia y sus reglas, y todas se entienden entre sí. La diversidad no divide la lengua: la hace más rica.",
      qs: [["What do many students believe?", "Spain's Spanish is the correct one", ["American Spanish is older", "All Spanish is the same"], "Find el «correcto»."], ["What do linguists say?", "No variety is superior", ["Spain is superior", "America is superior"], "Find ninguna variedad es superior."], ["How does the writer end?", "Diversity makes the language richer", ["Diversity divides the language", "Everyone must speak the same way"], "Read the last sentence."], ["What does «Sin embargo» signal?", "A contrast", ["An example", "A conclusion"], "It means 'however'."]] },
    { t: "Sor Juana Inés de la Cruz nació en el siglo XVII en la Nueva España. Desde niña quiso estudiar, pero en esa época las mujeres tenían pocas oportunidades. Leyó cuanto pudo en la biblioteca de su abuelo y escribió poemas, obras de teatro y ensayos. Hoy se la recuerda como una de las grandes voces de la lengua española.",
      qs: [["When did Sor Juana live?", "in the 1600s", ["in the 1900s", "in the Middle Ages"], "Find siglo XVII."], ["Where did she read as a child?", "in her grandfather's library", ["in a school", "in a church only"], "Find la biblioteca de su abuelo."], ["What did she write?", "poems, plays and essays", ["only songs", "only newspapers"], "Find poemas, obras de teatro y ensayos."], ["What obstacle did she face?", "Women had few opportunities", ["She could not read", "She had no books"], "Find las mujeres tenían pocas oportunidades."]] }
  ], READ_SLIDES);

  const listen25 = RD([
    { t: "Atención, pasajeros del vuelo 214 a Buenos Aires. Por problemas técnicos, la salida se retrasa cuarenta minutos. El nuevo horario es las ocho y veinte. Les rogamos que permanezcan en la puerta 12. Disculpen las molestias.",
      qs: [["How long is the delay?", "forty minutes", ["fourteen minutes", "four hours"], "Listen for the number."], ["What is the new departure time?", "8:20", ["8:40", "7:20"], "Find el nuevo horario."], ["Which gate should passengers wait at?", "gate 12", ["gate 2", "gate 21"], "Find la puerta."], ["Where is the flight going?", "Buenos Aires", ["Bogotá", "Barcelona"], "Find vuelo 214 a."]] },
    { t: "—Buenos días, profesora Vega. Hoy hablamos de su libro sobre el lenguaje de los jóvenes. —Gracias. Descubrí que los jóvenes inventan palabras para sentirse parte de un grupo. Eso siempre ha pasado: cada generación tiene su jerga. —¿Eso empobrece el idioma? —No, al contrario: demuestra que la lengua está viva.",
      qs: [["What is the book about?", "the language of young people", ["old poems", "grammar rules only"], "Find el lenguaje de los jóvenes."], ["Why do young people invent words?", "To feel part of a group", ["To confuse teachers", "Because they forget words"], "Find sentirse parte de un grupo."], ["Is this a new phenomenon?", "No, every generation does it", ["Yes, it began recently", "Only in Spain"], "Find cada generación."], ["What is the professor's view?", "It shows the language is alive", ["It ruins the language", "It is not important"], "Find la lengua está viva."]] },
    { t: "Hola, Daniel, soy Carmen. Te llamo para avisarte de que la reunión del club de lectura cambió al jueves a las seis. Ya no es en la biblioteca, sino en el café de la plaza. Recuerda traer el libro de Cortázar. ¡Hasta el jueves!",
      qs: [["When is the meeting now?", "Thursday at six", ["Tuesday at six", "Thursday at ten"], "Find cambió al."], ["Where is it now?", "at the café in the square", ["at the library", "at school"], "Find sino en."], ["What should Daniel bring?", "the book by Cortázar", ["a notebook", "his lunch"], "Find Recuerda traer."], ["Who is calling?", "Carmen", ["Daniel", "a librarian"], "Find soy."]] }
  ], LISTEN_SLIDES);

  const t25 = TYE(L25B, "linguistics, the history of language and kinds of texts");

  const L25 = [
    XL("The sounds of language", V(LING)), XL("How languages grow", V(HISTL)), XL("Medieval to Golden Age", early25), XL("The languages of Spain", langsSpain),
    XL("Writers of Latin America", latam25), XL("Sounds, accents and stress", phonetics25), XL("Formal or casual?", register25), XL("Words that change by region", regional25),
    XL("Tú, vos, usted, vosotros", voseo25), XL("Translating ideas", translate25), XL("Idioms", idioms25), XL("Refranes", proverbs25),
    XL("Kinds of texts", V(GENR)), XL("Review: the wish form", subj25), XL("Review: telling it in the past", pastNarr25), XL("Reading: minstrels, varieties, Sor Juana", read25),
    XL("Listening: airport, interview, message", listen25), XL("Type it in Spanish", t25),
    XL("Mixed practice", MIX([V(LING), V(HISTL), early25, latam25, phonetics25, register25, regional25, idioms25])),
    XL("Level 25 Challenge", MIX([V(LING), V(HISTL), V(GENR), early25, langsSpain, latam25, phonetics25, register25, regional25, voseo25, translate25, idioms25, proverbs25, subj25, pastNarr25, read25, listen25]))
  ];

  // =====================================================================
  // LEVEL 26 (12th grade, second half)
  // =====================================================================
  const HISTW = SP("History and heritage", [["conquista", "conquest", "⚔️"], ["colonia", "colony", "🏴"], ["virreinato", "viceroyalty", "👑"], ["independencia", "independence", "🕊️"], ["mestizaje", "blending of peoples and cultures", "🤝"], ["imperio", "empire", "🏰"], ["patrimonio", "heritage", "🏺"], ["revolución", "revolution", "🔄"]]);

  const civ26 = RW([
    ["Which civilization built Machu Picchu?", "the Inca", ["the Maya", "the Aztecs"], "Their empire stretched along the Andes."],
    ["Tenochtitlan, the Aztec (Mexica) capital, stood where which modern city is?", "Mexico City", ["Lima", "Bogotá"], "It is the capital of Mexico today."],
    ["Chichén Itzá is a Maya site in which part of Mexico?", "the Yucatán Peninsula", ["Baja California", "Patagonia"], "Think of the southeast of the country."],
    ["The Inca recorded numbers and information with knotted cords called...", "quipus", ["códices", "glifos"], "Its name is Quechua."],
    ["The Popol Vuh is a sacred book of which people?", "the K'iche' Maya", ["the Inca", "the Aztecs"], "They lived in what is now Guatemala."],
    ["Which language of the Andes is still spoken by millions in Peru and Bolivia?", "Quechua", ["Nahuatl", "Guaraní"], "It was the language of the Inca empire."],
    ["Which indigenous language is an official language of Paraguay together with Spanish?", "Guaraní", ["Quechua", "Maya"], "Most Paraguayans speak it."],
    ["Cusco was the capital of which empire?", "the Inca empire", ["the Aztec empire", "the Spanish empire"], "It was in the Andes."],
    ["Nahuatl was the language of which people?", "the Aztecs (Mexica)", ["the Inca", "the Taíno"], "Chocolate and tomate come from it."]
  ], "Place each civilization on the map: Mexico and Guatemala (Aztec, Maya) or the Andes (Inca).",
    "Remember: Aztec = central Mexico; Maya = Yucatán and Guatemala; Inca = Andes (Peru).",
    "Example: the Taíno lived on Caribbean islands, and gave Spanish the words hamaca and huracán. Now place yours.",
    [["Before Spain", "🏺", "Great civilizations existed before 1492. The <b>Maya</b> (Yucatán, Guatemala), the <b>Aztecs/Mexica</b> (central Mexico) and the <b>Inca</b> (Andes)."], ["Achievements", "🌟", "Maya: glyph writing and a precise calendar. Aztecs: the city of Tenochtitlan. Inca: roads, Machu Picchu and the <b>quipu</b>."], ["Still alive", "🗣️", "<b>Quechua, Guaraní, Nahuatl</b> and many Maya languages are spoken today by millions of people."]]);

  const loan26 = RW([
    ["The word «aceite» (oil) comes from which language?", "Arabic", ["Nahuatl", "Quechua"], "Many words starting with al- or a- came from it."],
    ["«Chocolate» and «tomate» come from...", "Nahuatl", ["Arabic", "Basque"], "It was the language of the Aztecs."],
    ["«Hamaca» and «huracán» came from...", "Taíno, a Caribbean language", ["Arabic", "Latin"], "The Taíno met Columbus."],
    ["«Papa» (potato) in Latin America comes from...", "Quechua", ["Arabic", "Nahuatl"], "It is an Andean crop."],
    ["«Ojalá» comes from an Arabic phrase meaning...", "'if God wills'", ["'good luck to you'", "'never again'"], "It still expresses a wish."],
    ["The word «almohada» (pillow) starts with al-, a clue that it comes from...", "Arabic", ["Greek", "Quechua"], "Arabic left about 4,000 words in Spanish."],
    ["The word «aguacate» comes from Nahuatl and became which English word?", "avocado", ["apricot", "artichoke"], "Think of the green fruit used in guacamole."],
    ["English words like 'patio', 'canyon' and 'mosquito' come from...", "Spanish", ["Nahuatl", "German"], "These are words English borrowed."],
    ["«Azúcar» (sugar) comes from...", "Arabic", ["Nahuatl", "Basque"], "Look at the beginning, az-."]
  ], "Think about the history: Arabic in Spain (711-1492), and Native American languages after 1492.",
    "Remember: al-/a- words are often Arabic; chocolate and tomate are Nahuatl; hamaca and huracán are Taíno; papa is Quechua.",
    "Example: «café» came into Spanish through Arabic and Turkish, while «canoa» came from Taíno. Now choose the source of yours.",
    [["Loanwords", "🔁", "A <b>préstamo</b> is a word borrowed from another language. Spanish has borrowed from many."], ["Arabic", "🌙", "Because Arabic speakers lived in Spain for centuries, Spanish has words like <b>aceite, azúcar, almohada, ojalá</b>."], ["Americas", "🌽", "<b>Nahuatl:</b> chocolate, tomate, aguacate. <b>Taíno:</b> hamaca, huracán, canoa. <b>Quechua:</b> papa, puma."]]);

  const indep26 = RW([
    ["Simón Bolívar, «El Libertador», was born in...", "Venezuela", ["Colombia", "Argentina"], "Think of the north coast of South America."],
    ["José de San Martín is honored as a liberator of...", "Argentina, Chile and Peru", ["Mexico, Cuba and Spain", "Brazil, Portugal and Angola"], "He crossed the Andes."],
    ["The «Grito de Dolores» (1810) began Mexico's fight for...", "independence from Spain", ["a new king", "a trade treaty"], "Miguel Hidalgo called people to rise."],
    ["Which Cuban poet and thinker is called the «apóstol de la independencia»?", "José Martí", ["Benito Juárez", "Rubén Darío"], "He wrote <i>Versos sencillos</i>."],
    ["Benito Juárez was president of which country?", "Mexico", ["Chile", "Peru"], "He is honored there as a national hero."],
    ["Most Latin American countries became independent mainly in which period?", "the early 1800s", ["the 1500s", "the 1950s"], "Think of the years after 1808."],
    ["Spain divided its American colonies into large regions called...", "virreinatos", ["repúblicas", "condados"], "A virrey governed each one."],
    ["September 16 is Independence Day in which country?", "Mexico", ["Argentina", "Colombia"], "It remembers the Grito de Dolores."]
  ], "Think about the period: independence movements began around 1808-1825.",
    "Link each leader to a country: Bolívar (Venezuela), San Martín (Argentina), Hidalgo and Juárez (Mexico), Martí (Cuba).",
    "Example: Bernardo O'Higgins is a founding hero of Chile. Now match yours.",
    [["Colonies", "🏰", "For about 300 years, Spain governed large parts of the Americas in <b>virreinatos</b> (viceroyalties)."], ["Independence", "🕊️", "From 1808 to the 1820s many colonies became independent. Leaders included <b>Bolívar, San Martín</b> and <b>Hidalgo</b>."], ["Later heroes", "📚", "<b>José Martí</b> (Cuba) used poetry and essays to fight for freedom. <b>Benito Juárez</b> led Mexico in the 1800s."]]);

  const sites26 = RW([
    ["La Alhambra is a palace-fortress in which Spanish city?", "Granada", ["Sevilla", "Bilbao"], "It sits at the foot of the Sierra Nevada."],
    ["Who designed the Sagrada Familia in Barcelona?", "Antoni Gaudí", ["Pablo Picasso", "Diego Rivera"], "He is the great Catalan architect."],
    ["The Prado Museum is in which city?", "Madrid", ["Barcelona", "Lima"], "It is the capital of Spain."],
    ["The Camino de Santiago, a pilgrimage route, ends in...", "Santiago de Compostela", ["Toledo", "Segovia"], "Look at the name of the route."],
    ["Which waterfalls lie on the border of Argentina and Brazil?", "Iguazú Falls", ["Niagara Falls", "Victoria Falls"], "Their name comes from Guaraní."],
    ["The world's largest salt flat, the Salar de Uyuni, is in...", "Bolivia", ["Chile", "Spain"], "It is in the Andes."],
    ["The Galápagos Islands belong to which country?", "Ecuador", ["Peru", "Chile"], "The name of the country means 'equator'."],
    ["The Atacama, one of the driest deserts on Earth, is mainly in...", "Chile", ["Spain", "Cuba"], "It lies between the Andes and the Pacific."],
    ["La Giralda is a famous tower in which city?", "Sevilla", ["Granada", "Valencia"], "It rises beside a great cathedral in Andalusia."]
  ], "Place each site on the map: country first, then region or city.",
    "Link landmarks to people or ideas: Gaudí - Barcelona; Alhambra - Granada; Uyuni - Bolivia.",
    "Example: Machu Picchu is in Peru, in the Andes near Cusco. Now place yours.",
    [["Landmarks of Spain", "🏛️", "<b>La Alhambra</b> (Granada), <b>Sagrada Familia</b> (Barcelona, Gaudí), <b>Museo del Prado</b> (Madrid), <b>La Giralda</b> (Sevilla)."], ["Wonders of the Americas", "🏔️", "<b>Machu Picchu</b> (Peru), <b>Chichén Itzá</b> (Mexico), <b>Iguazú</b> (Argentina/Brazil), <b>Salar de Uyuni</b> (Bolivia), <b>Galápagos</b> (Ecuador)."], ["Heritage", "🏺", "Many are UNESCO sites. The word for heritage is <b>patrimonio</b>."]]);

  const arts26 = RW([
    ["Who painted <i>Las Meninas</i>?", "Diego Velázquez", ["Francisco Goya", "Salvador Dalí"], "He was the court painter of the 1600s."],
    ["Who painted <i>Guernica</i>?", "Pablo Picasso", ["Joan Miró", "Diego Rivera"], "It is a huge black-and-white painting of the 1900s."],
    ["Which Mexican painter is famous for her self-portraits?", "Frida Kahlo", ["Fernando Botero", "Diego Velázquez"], "She lived in a blue house in Mexico City."],
    ["Diego Rivera is best known for his large...", "murals", ["sonnets", "sculptures of stone"], "They cover walls of public buildings."],
    ["Which Colombian artist painted and sculpted round, plump figures?", "Fernando Botero", ["Frida Kahlo", "Salvador Dalí"], "He is from Medellín."],
    ["Which music and dance come from Andalusia in southern Spain?", "flamenco", ["tango", "mariachi"], "It uses guitar, clapping and strong footwork."],
    ["Tango was born in the Río de la Plata area, in which two countries?", "Argentina and Uruguay", ["Spain and Portugal", "Mexico and Peru"], "Buenos Aires and Montevideo."],
    ["Mariachi music is strongly linked to which country?", "Mexico", ["Cuba", "Chile"], "Think of violins, trumpets and big hats."],
    ["Which artist painted melting clocks in a dream-like landscape?", "Salvador Dalí", ["Francisco Goya", "Fernando Botero"], "He was a Surrealist from Catalonia."]
  ], "Link the artist to a country and a style (Baroque, Surrealism, muralism).",
    "Remember: Velázquez and Goya - older Spanish painters; Picasso and Dalí - modern Spanish painters; Kahlo and Rivera - Mexico.",
    "Example: Goya painted both elegant portraits and dark, dramatic scenes in Spain around 1800. Now match yours.",
    [["Painters", "🎨", "<b>Velázquez</b> (Baroque), <b>Goya</b> (1800s), <b>Picasso</b> and <b>Dalí</b> (1900s) from Spain. <b>Kahlo, Rivera</b> (Mexico), <b>Botero</b> (Colombia)."], ["Music and dance", "💃", "<b>Flamenco</b> (Andalusia), <b>tango</b> (Argentina/Uruguay), <b>mariachi</b> (Mexico), <b>salsa</b> and <b>cumbia</b> (Caribbean and Colombia)."], ["Art tells culture", "🖼️", "Murals, music and dance carry history and identity. Practice describing a work: who, when, where and what it shows."]]);

  const tech26 = RW([
    ["What is magical realism (realismo mágico)?", "Everyday life mixed with magical events told as normal", ["A story set only in space", "A poem with no verbs"], "Think of García Márquez."],
    ["What is a flashback in a story?", "A scene from earlier in time", ["A scene from the future", "The author's biography"], "The story jumps backwards."],
    ["What is hyperbole (hipérbole)?", "A deliberate exaggeration", ["A mild understatement", "A repeated sound"], "Think of 'I'm dying of hunger'."],
    ["What is an allegory (alegoría)?", "A story whose characters and events stand for bigger ideas", ["A very short poem", "A list of facts"], "The story has a second meaning."],
    ["What is an omniscient narrator?", "One who knows everything, even characters' thoughts", ["A character who tells only what he sees", "The reader of the book"], "Omni- means all."],
    ["What is foreshadowing (presagio)?", "Hints about what will happen later", ["A summary at the end", "A description of the setting"], "Think of an early warning in the story."],
    ["«Me muero de hambre» is an example of...", "hyperbole", ["simile", "personification"], "Nobody is really dying."],
    ["«El viento susurraba» is an example of...", "personification", ["hyperbole", "irony"], "The wind does a human action."],
    ["What is an interior monologue (monólogo interior)?", "A character's thoughts shown directly", ["A speech to a crowd", "A conversation between two people"], "It happens inside the mind."]
  ], "Match the technique to what it does: exaggerates, gives human traits, hints at the future, jumps in time or stands for another idea.",
    "Think of an everyday example of each technique in English, then match it.",
    "Example: «Sus ojos son estrellas» is a metaphor, because it says one thing IS another. Now identify yours.",
    [["Tools of the writer", "🧰", "<b>Hipérbole</b> exaggerates. <b>Personificación</b> gives human traits to things. <b>Alegoría</b> gives a story a second meaning."], ["Structure", "🧵", "A <b>flashback</b> goes back in time; <b>presagio</b> hints at the future; a <b>narrador omnisciente</b> knows everything; <b>monólogo interior</b> shows thoughts."], ["Magical realism", "🦋", "<b>Realismo mágico</b> presents magical events as ordinary. It is linked to García Márquez, Allende and Carpentier's 'real maravilloso'."]]);

  const poetry26 = RW([
    ["How many lines does a sonnet (soneto) have?", "14", ["8", "10"], "It has two quartets and two tercets."],
    ["A line of 11 syllables is called...", "endecasílabo", ["octosílabo", "alejandrino"], "Endeca- means eleven."],
    ["A line of 8 syllables is called...", "octosílabo", ["endecasílabo", "decasílabo"], "Octo- means eight."],
    ["In «rima asonante», which sounds match?", "only the vowels after the stress", ["only the consonants", "none of them"], "As- is related to 'assonance'."],
    ["A group of lines in a poem is called a...", "estrofa", ["párrafo", "capítulo"], "In English, a stanza."],
    ["The traditional Spanish «romance» uses lines of...", "eight syllables", ["eleven syllables", "fourteen syllables"], "It is the meter of old ballads."],
    ["A «décima» has how many lines?", "10", ["4", "14"], "Think of the root déci-."],
    ["«Verso libre» means...", "no fixed rhyme or meter", ["a rhyme in every line", "a poem of one word"], "Libre means free."],
    ["In a «sinalefa», two vowels in neighboring words...", "count as one syllable", ["count as three syllables", "are deleted from the page"], "It happens when a word ends and the next begins with a vowel."]
  ], "Use the roots: octo- = 8, endeca- = 11, déci- = 10. For rhyme, ask which sounds must match.",
    "Remember: consonant rhyme matches everything after the stress; assonant rhyme matches only the vowels.",
    "Example: a «cuarteto» has four lines, and a «terceto» has three. Now answer yours.",
    [["Counting syllables", "🔢", "Spanish verse is counted by syllables: <b>octosílabo</b> (8), <b>endecasílabo</b> (11). A <b>sinalefa</b> joins two vowels across words."], ["Forms", "📜", "The <b>soneto</b> has 14 lines, the <b>décima</b> 10, the <b>romance</b> uses 8-syllable lines. <b>Verso libre</b> has no set pattern."], ["Rhyme", "🎵", "<b>Rima consonante:</b> vowels and consonants match. <b>Rima asonante:</b> only vowels match (casa/palma)."]]);

  const wordform26 = RW([
    ["The suffix -mente (rápida → rápidamente) forms...", "adverbs", ["nouns", "verbs"], "It answers 'how?'."],
    ["Adding -ísimo to 'bueno' (buenísimo) means...", "extremely good", ["a little good", "not good"], "It intensifies the adjective."],
    ["The prefix des- (hacer → deshacer) usually means...", "undoing, the opposite", ["again", "before"], "Think of 'undo'."],
    ["The suffix -ería in «panadería» names...", "a shop", ["a person", "an action"], "Also zapatería, librería."],
    ["The suffix -ero/-era in «panadero» names...", "the person who works with it", ["the place", "the quality"], "A baker."],
    ["The diminutive -ito in «casita» means...", "small, often affectionate", ["huge", "ancient"], "It shrinks and softens."],
    ["The suffix -ción in «creación» turns a verb into...", "a noun", ["an adverb", "an adjective"], "Crear becomes creación."],
    ["The prefix re- in «releer» means...", "again", ["without", "against"], "Think of re-read."],
    ["The suffix -dad in «felicidad» turns an adjective into...", "a noun for a quality", ["a verb", "an adverb"], "Feliz becomes felicidad."]
  ], "Break the word into pieces: prefix + root + suffix.",
    "Remember the family: -mente (adverb), -ción/-dad (nouns), -ero/-ería (person/shop), -ito (small), des-/in-/re- (prefixes).",
    "Example: 'zapato' + -ería = 'zapatería', a shoe store. Now work out yours.",
    [["Building words", "🧱", "Spanish builds new words with <b>prefixes</b> and <b>suffixes</b>. One root can give a whole family: pan, panadero, panadería, empanada."], ["Common endings", "🔧", "<b>-mente</b> (adverbs), <b>-ción, -dad</b> (nouns), <b>-ero/-a</b> (person), <b>-ería</b> (shop), <b>-ito</b> (small), <b>-ísimo</b> (very)."], ["Prefixes", "🧩", "<b>des-</b> (undo), <b>in-</b> (not), <b>re-</b> (again), <b>pre-</b> (before). With them you can guess unknown words."]]);

  const falseFr26 = RW([
    ["In Spanish «embarazada» means...", "pregnant", ["embarrassed", "excited"], "The word for 'embarrassed' is avergonzado."],
    ["«Éxito» means...", "success", ["exit", "excitement"], "An exit is salida."],
    ["«Constipado» means...", "having a cold", ["constipated", "confused"], "Think of winter."],
    ["«Actualmente» means...", "currently", ["actually", "eventually"], "'Actually' is 'en realidad'."],
    ["«Librería» is a...", "bookstore", ["library", "bookshelf"], "A library is biblioteca."],
    ["«Asistir a clase» means...", "to attend class", ["to assist the class", "to skip class"], "Asistir a = to be present at."],
    ["«Sensible» means...", "sensitive", ["sensible", "noticeable"], "'Sensible' is sensato."],
    ["«Soportar» means...", "to put up with, to bear", ["to support", "to report"], "'To support' is apoyar."],
    ["«Carpeta» means...", "folder", ["carpet", "car"], "You keep papers in it."],
    ["«Pretender» means...", "to try, to aim to", ["to pretend", "to predict"], "'To pretend' is fingir."]
  ], "Do not trust the English look-alike! Think about whether the Spanish word really means the same.",
    "Remember the real Spanish word for the English look-alike: biblioteca (library), fingir (to pretend), sensato (sensible).",
    "Example: «Realizar» usually means 'to carry out'; 'to realize' is darse cuenta. Now think about yours.",
    [["False friends", "🎭", "<b>Falsos amigos</b> look like English words but mean something else: <b>embarazada</b> = pregnant, <b>éxito</b> = success."], ["More traps", "⚠️", "<b>constipado</b> = has a cold, <b>actualmente</b> = currently, <b>librería</b> = bookstore, <b>carpeta</b> = folder."], ["Verbs too", "🔎", "<b>asistir a</b> = attend, <b>soportar</b> = put up with, <b>pretender</b> = try or aim to."]]);

  const academic26 = RW([
    ["What does «Cabe destacar que...» mean?", "It is worth pointing out that...", ["It cannot be destroyed that...", "There is room to leave that..."], "Used in essays to highlight an idea."],
    ["What does «En definitiva» mean?", "in short, all in all", ["definitely not", "for the first time"], "It introduces a conclusion."],
    ["What does «Con respecto a» mean?", "regarding", ["in spite of", "instead of"], "It introduces a topic."],
    ["What does «A lo largo de» mean?", "throughout", ["at the end of", "far from"], "It covers a stretch of time or space."],
    ["What does «No obstante» mean?", "nevertheless", ["therefore", "for example"], "It signals contrast."],
    ["What does «Dicho de otro modo» mean?", "in other words", ["as someone said", "in another place"], "It rephrases an idea."],
    ["What does «De hecho» mean?", "in fact", ["of course not", "from the facts"], "It reinforces what was said."],
    ["What does «Por lo tanto» mean?", "therefore", ["by the way", "all in all"], "It introduces a result."],
    ["What does «En cuanto a» mean?", "as for", ["as soon as", "in how much"], "It changes to a new topic."]
  ], "These are connectors used in essays. Think about what the phrase does: contrast, result, example or conclusion.",
    "Look at the Spanish words inside the phrase; some parts look like English words (definitiva, respecto, hecho).",
    "Example: «Es decir» means 'that is to say'; it introduces an explanation. Now translate yours.",
    [["Academic phrases", "🎓", "Essays use phrases that guide the reader: <b>con respecto a</b> (regarding), <b>cabe destacar que</b> (it is worth noting), <b>a lo largo de</b> (throughout)."], ["Logic words", "🧭", "<b>No obstante</b> (nevertheless), <b>por lo tanto</b> (therefore), <b>de hecho</b> (in fact), <b>en definitiva</b> (in short)."], ["Beware", "⚠️", "<b>De hecho</b> means 'in fact', not 'indeed in a legal sense'. Always read the whole phrase."]]);

  const se26 = FB([
    ["___ alquilan habitaciones. (Rooms are rented here.)", "Se", ["Le", "Los"], "The sign has no named person doing the action."],
    ["Se ___ muchos libros en esta tienda.", "venden", ["vende", "vendes"], "The thing sold is plural."],
    ["Se ___ un piso en el centro. (Apartment for rent)", "alquila", ["alquilan", "alquilas"], "The thing rented is singular."],
    ["En España ___ cena tarde.", "se", ["te", "lo"], "Impersonal: people in general."],
    ["No ___ fuma en el edificio.", "se", ["le", "nos"], "A sign for everyone."],
    ["Se me ___ el vaso. (The glass slipped out of my hands.)", "cayó", ["cayeron", "caí"], "The glass is singular."],
    ["Se me ___ los lentes. (My glasses broke on me.)", "rompieron", ["rompió", "rompí"], "The glasses are plural."],
    ["En ese país ___ habla portugués.", "se", ["les", "nos"], "It describes what people in general do."]
  ], "Find the thing that is sold, rented or spoken about. Does it agree with a singular or a plural verb?",
    "The impersonal 'se' means 'people in general'; with 'se me...' the event happened by accident.",
    "Example: 'Se venden flores' (flowers are sold) but 'Se vende una casa' (a house is sold). Now do yours.",
    [["Impersonal se", "🪧", "Use <b>se</b> + verb for signs and general facts: <b>Se habla español</b>, <b>Se venden libros</b>, <b>No se fuma</b>."], ["Agreement", "🔗", "In the passive 'se', the verb agrees with the thing: <b>se vende una casa</b>, <b>se venden casas</b>."], ["Accidents", "😅", "<b>Se me cayó el vaso</b> means the glass fell and it was not my fault. This avoids blaming the person."]]);

  const perfect26 = FB([
    ["Cuando llegamos, el tren ya ___.", "había salido", ["ha salido", "habrá salido"], "It is already past when we arrived."],
    ["Para el viernes, ya ___ todo el trabajo.", "habré terminado", ["he terminado", "había terminado"], "A future deadline: 'by Friday'."],
    ["Si hubiera estudiado más, ___ mejor nota.", "habría sacado", ["había sacado", "he sacado"], "The result of an unreal past situation."],
    ["Nunca ___ tanta nieve en mi vida.", "he visto", ["había visto", "habré visto"], "My life up to now."],
    ["No sabía que tú ya ___ el libro.", "habías leído", ["has leído", "habrás leído"], "It was before another past moment."],
    ["Dudo que ___ llegado todavía.", "hayan", ["han", "habrán"], "Doubt calls for the wish form of haber."],
    ["Ojalá que ___ aprobado el examen.", "hayas", ["has", "habrás"], "A wish about something already done."],
    ["Antes de las diez, nosotros ya ___.", "habremos comido", ["hemos comido", "habíamos comido"], "A future time limit."]
  ], "Look at the time clue: 'ya', 'para el viernes', 'si hubiera', 'nunca... en mi vida'. Which time frame is it?",
    "Haber changes with the time frame: había (past of the past), he (up to now), habré (future), habría (would have), haya (wish).",
    "Example: 'Cuando llamé, ya habías salido' - you left before my call. Now do yours.",
    [["Perfect tenses", "⏳", "The <b>perfect tenses</b> use <b>haber</b> + participle. <b>He visto</b> (present perfect), <b>había visto</b> (past of the past), <b>habré visto</b> (future perfect)."], ["Would have", "🌀", "<b>Habría ido</b> = I would have gone. <b>Si hubiera sabido, habría ido.</b> Use the imperfect subjunctive perfect with <b>si</b>."], ["With the wish form", "🌠", "<b>Dudo que hayan llegado.</b> <b>Ojalá hayas aprobado.</b> The wish form of haber is <b>haya, hayas, hayan...</b>"]]);

  const relatives26 = FB([
    ["El autor ___ novela leímos nació en Chile.", "cuya", ["que", "quien"], "The novel belongs to the author."],
    ["Esto es ___ me dijo.", "lo que", ["el que", "cuyo"], "You are referring to an idea, not a noun."],
    ["La ciudad ___ nací es muy antigua.", "donde", ["quien", "cuyo"], "A place."],
    ["Mis amigos, ___ viven en Quito, vienen mañana.", "que", ["cuyo", "donde"], "Extra information about people; a simple connector."],
    ["La mujer con ___ hablé es profesora.", "quien", ["que", "cuyo"], "A person after a preposition."],
    ["Todo ___ dijo era verdad.", "lo que", ["el que", "cuyo"], "A general 'all that'."],
    ["Los estudiantes ___ libros están aquí son nuevos.", "cuyos", ["cuya", "que"], "It must agree with 'libros'."],
    ["Los poemas de ___ te hablé son de Neruda.", "los que", ["cuyo", "donde"], "The noun is repeated by a pronoun."]
  ], "Decide what the missing word does: connect a person, a place, an idea, or show ownership (whose).",
    "Cuyo = whose (agrees with the thing owned); lo que = what; donde = where; quien = who (people, after prepositions).",
    "Example: 'La casa donde vivo es vieja' uses donde for a place. Now do yours.",
    [["Relative words", "🔗", "<b>que</b> (who, that, which), <b>quien</b> (who, for people), <b>donde</b> (where), <b>lo que</b> (what), <b>cuyo</b> (whose)."], ["Cuyo", "🔑", "<b>Cuyo</b> agrees with the thing owned: <b>el autor cuya novela leímos</b>, <b>los niños cuyos padres...</b>."], ["Tip", "💡", "After a preposition, people take <b>quien</b>; things take <b>el que / la que / los que</b>."]]);

  const trans26 = TR([
    ["La lengua es el espejo de una cultura.", "Language is the mirror of a culture."],
    ["Cada región tiene su propia manera de hablar.", "Each region has its own way of speaking."],
    ["Aunque llueva, saldremos a caminar.", "Even if it rains, we will go out for a walk."],
    ["Me encantaría que vinieras a la exposición.", "I would love for you to come to the exhibition."],
    ["Se dice que el castellano nació en Castilla.", "It is said that Castilian was born in Castile."],
    ["Gracias a la traducción, leemos libros de todo el mundo.", "Thanks to translation, we read books from all over the world."],
    ["Sin leer mucho, no se aprende a escribir bien.", "Without reading a lot, you do not learn to write well."],
    ["Mientras más viajas, más entiendes a los demás.", "The more you travel, the more you understand others."],
    ["El poema fue escrito por una joven poeta.", "The poem was written by a young poet."],
    ["Hace tres años que estudio español.", "I have been studying Spanish for three years."]
  ], [["Longer sentences", "📄", "At this level you translate whole sentences with subjunctive, passive and time expressions. Read for the main idea first."], ["Patterns to spot", "🔎", "<b>Aunque + subjunctive</b> = even if. <b>Mientras más..., más...</b> = the more..., the more.... <b>Hace + time + que</b> = for a length of time."], ["Tip", "💡", "Translate the meaning, not each word. Reread your English to be sure it sounds natural."]]);

  const read26 = RD([
    { t: "Traducir no es cambiar palabras una por una. Una buena traducción busca que el lector sienta lo mismo que sintió el lector original. Por eso, a veces el traductor tiene que cambiar una expresión por otra completamente distinta. Por ejemplo, «llueve a cántaros» se traduce como «it's pouring», no como «it rains jugs».",
      qs: [["Is translation word for word?", "No, it looks for the same effect", ["Yes, always", "Only in poetry"], "Find no es cambiar palabras una por una."], ["What is the goal of a good translation?", "The reader feels what the original reader felt", ["Use the shortest words", "Avoid all idioms"], "Find que el lector sienta lo mismo."], ["Which example does the text give?", "llueve a cántaros", ["me muero de hambre", "meter la pata"], "Find Por ejemplo."], ["Why might a translator replace an expression?", "To keep the meaning and effect", ["To make the text shorter", "Because the original is wrong"], "Find completamente distinta."]] },
    { t: "Los mayas desarrollaron un sistema de escritura con glifos y un calendario muy preciso. Observaban el cielo con atención y construyeron templos alineados con el sol. Hoy, millones de personas en Guatemala, México y otros países hablan lenguas mayas. Su cultura no es solo del pasado: sigue viva.",
      qs: [["What did the Maya develop?", "glyph writing and a precise calendar", ["gunpowder and ships", "paper money"], "Find escritura con glifos."], ["What did they observe carefully?", "the sky", ["the sea", "the markets"], "Find Observaban."], ["What is true today?", "Millions speak Maya languages", ["No one speaks Maya", "Only scholars speak Maya"], "Find hablan lenguas mayas."], ["What is the main idea?", "Maya culture is still alive", ["Maya temples are lost", "The calendar is wrong"], "Read the last sentence."]] },
    { t: "Cervantes publicó la primera parte del Quijote en 1605. En ella, un hombre que ha leído demasiados libros de caballerías decide convertirse en caballero andante. La novela mezcla humor y crítica, y muchos la consideran la primera novela moderna. Su influencia llega hasta hoy.",
      qs: [["When was the first part published?", "1605", ["1505", "1705"], "Find publicó."], ["Why does the man become a knight?", "He read too many chivalry books", ["He was ordered by a king", "He lost his house"], "Find demasiados libros de caballerías."], ["What does the novel mix?", "humor and criticism", ["war and politics only", "science and magic"], "Find mezcla."], ["How do many people see the novel?", "As the first modern novel", ["As a history book", "As a dictionary"], "Find la primera novela moderna."]] }
  ], READ_SLIDES);

  const listen26 = RD([
    { t: "Boletín del tiempo para el fin de semana. El sábado habrá lluvias fuertes en el norte, con temperaturas de doce grados. El domingo saldrá el sol, aunque soplará un viento fresco. Se recomienda llevar paraguas el sábado y una chaqueta el domingo.",
      qs: [["What is the weather on Saturday in the north?", "heavy rain", ["sunshine", "snow"], "Find lluvias fuertes."], ["What is the temperature?", "12 degrees", ["2 degrees", "22 degrees"], "Listen for doce."], ["What will Sunday be like?", "sunny with a cool wind", ["rainy and warm", "foggy"], "Find saldrá el sol."], ["What is recommended for Saturday?", "an umbrella", ["a jacket", "sunglasses"], "Find paraguas."]] },
    { t: "Bienvenidos al museo. Estamos ante un mural pintado en 1945. El artista quiso mostrar la vida del campo y el trabajo de las familias. Observen los colores cálidos: el pintor los usó para transmitir esperanza. Pueden hacer fotos, pero sin flash.",
      qs: [["When was the mural painted?", "1945", ["1954", "1495"], "Listen for the year."], ["What does the mural show?", "country life and family work", ["a city at night", "a battle"], "Find la vida del campo."], ["What do the warm colors express?", "hope", ["fear", "silence"], "Find esperanza."], ["What are the rules for photos?", "Photos are allowed without flash", ["No photos at all", "Flash is required"], "Find sin flash."]] },
    { t: "Hoy voy a hablar de las lenguas de España. Además del castellano, en España se hablan el catalán, el gallego y el euskera. El euskera es especial porque no viene del latín. Mi objetivo es mostrar que la diversidad lingüística es parte de la identidad del país.",
      qs: [["What is the topic of the talk?", "the languages of Spain", ["the history of Rome", "the Spanish economy"], "Find las lenguas de España."], ["Which language does not come from Latin?", "euskera", ["catalán", "gallego"], "Find no viene del latín."], ["What is the speaker's goal?", "To show that diversity is part of identity", ["To say one language is best", "To teach Latin"], "Find Mi objetivo."], ["How many languages besides Castilian are named?", "three", ["two", "five"], "Count: catalán, gallego, euskera."]] }
  ], LISTEN_SLIDES);

  const L26B = [].concat(HISTW.items, LING.items.slice(0, 4), GENR.items.slice(0, 4));
  const t26 = TYE(L26B, "history, language and kinds of texts");

  const L26 = [
    XL("History and heritage", V(HISTW)), XL("Before the Spanish arrived", civ26), XL("Words from other languages", loan26), XL("Colonies and independence", indep26),
    XL("Landmarks", sites26), XL("Art and music", arts26), XL("The writer's toolbox", tech26), XL("Reading poetry: verse and rhyme", poetry26),
    XL("Building words", wordform26), XL("More false friends", falseFr26), XL("Academic phrases", academic26), XL("Impersonal and accidental se", se26),
    XL("Perfect tenses", perfect26), XL("Relative words", relatives26), XL("Translating whole sentences", trans26), XL("Reading: translation, Maya, Cervantes", read26),
    XL("Listening: forecast, museum, talk", listen26), XL("Type it in Spanish", t26),
    XL("Mixed practice", MIX([V(HISTW), civ26, loan26, indep26, sites26, arts26, tech26, poetry26])),
    XL("Level 26 Challenge", MIX([V(HISTW), civ26, loan26, indep26, sites26, arts26, tech26, poetry26, wordform26, falseFr26, academic26, se26, perfect26, relatives26, trans26, read26, listen26]))
  ];

  // =====================================================================
  // LEVEL 27 (College year 1, first half)
  // =====================================================================
  const CRIT = SP("Talking about literature", [["análisis", "analysis", "🔬"], ["interpretación", "interpretation", "💭"], ["simbolismo", "symbolism", "🔱"], ["contexto", "context", "🧭"], ["motivo", "motif (a repeated image or idea)", "🔁"], ["perspectiva", "point of view", "👁️"], ["crítica", "criticism, review", "🧐"], ["canon", "canon (the accepted great works)", "🏛️"]]);

  const medieval27 = RW([
    ["Which 15th-century poet wrote famous verses on death and the passing of time after his father died?", "Jorge Manrique", ["Garcilaso de la Vega", "Fray Luis de León"], "The poem is <i>Coplas por la muerte de su padre</i>."],
    ["Which king, nicknamed «El Sabio», promoted translation and learning in Toledo?", "Alfonso X", ["Felipe II", "Fernando VII"], "He ruled in the 1200s."],
    ["Which medieval book of short moral tales (exempla) was written by Don Juan Manuel?", "El conde Lucanor", ["Libro de buen amor", "La Celestina"], "A count asks his advisor for lessons."],
    ["Who wrote the <i>Libro de buen amor</i>, a medieval work mixing humor and morals?", "the Arcipreste de Hita (Juan Ruiz)", ["Jorge Manrique", "Fernando de Rojas"], "He was an archpriest of the 1300s."],
    ["The «jarchas» are...", "short closing verses with early Romance words", ["long Latin epics", "court plays"], "They are among the earliest written traces of Spanish-like language."],
    ["Which Spanish mystic wrote spiritual poems such as <i>Noche oscura</i>?", "San Juan de la Cruz", ["Francisco de Quevedo", "Luis de Góngora"], "He lived in the 1500s and wrote about spiritual life."],
    ["Besides <i>Don Quijote</i>, Cervantes wrote a collection of stories called...", "Novelas ejemplares", ["Rimas y leyendas", "Cantares gallegos"], "The title says they teach by example."],
    ["Which Renaissance poet and friar praised a quiet, simple life in his <i>Oda a la vida retirada</i>?", "Fray Luis de León", ["Lope de Vega", "Calderón de la Barca"], "He lived in the 1500s."]
  ], "Place the writer in time: 1200s-1300s (Middle Ages), 1400s (late medieval), 1500s (Renaissance).",
    "Remember: Manrique (death and time), Don Juan Manuel (moral tales), Fray Luis (quiet life), San Juan (mystic poetry).",
    "Example: Garcilaso de la Vega is the Renaissance poet of sonnets. Now match yours.",
    [["Middle Ages", "🏰", "Alfonso X promoted Castilian prose and translation. <b>Don Juan Manuel</b> wrote <b>El conde Lucanor</b>; the Arcipreste de Hita wrote <b>Libro de buen amor</b>."], ["Late Middle Ages", "⏳", "<b>Jorge Manrique</b> wrote the <b>Coplas</b>, a meditation on life, death and fame. <b>La Celestina</b> ends the era."], ["Renaissance and mysticism", "🕯️", "<b>Fray Luis de León</b> and <b>San Juan de la Cruz</b> wrote spiritual and contemplative poetry in the 1500s. <b>Cervantes</b> wrote the Novelas ejemplares."]]);

  const spain27 = RW([
    ["Who wrote <i>Rimas y leyendas</i>, a Romantic work of poems and tales?", "Gustavo Adolfo Bécquer", ["Antonio Machado", "Benito Pérez Galdós"], "He lived in the 1800s."],
    ["Which poet wrote <i>Cantares gallegos</i> in Galician?", "Rosalía de Castro", ["Ana María Matute", "Carmen Laforet"], "Her work helped revive Galician literature."],
    ["<i>Fortunata y Jacinta</i> by Galdós belongs to which movement?", "Realism", ["Baroque", "Surrealism"], "It shows everyday life in Madrid."],
    ["In Unamuno's <i>Niebla</i>, what unusual thing happens?", "A character meets and argues with the author", ["The narrator is a cat", "The story is told backwards"], "The author becomes a character."],
    ["Antonio Machado's <i>Campos de Castilla</i> focuses on...", "the landscape of Castile and Spain's future", ["life at sea", "city nightlife"], "The title says which landscape."],
    ["Federico García Lorca belonged to which group of poets?", "the Generación del 27", ["the Generación del 98", "the Boom"], "The group is named after a year in the 1920s."],
    ["Which Spanish novelist won the Nobel Prize in 1989?", "Camilo José Cela", ["Miguel Delibes", "Juan Ramón Jiménez"], "He is known for <i>La colmena</i>."],
    ["Juan Ramón Jiménez wrote <i>Platero y yo</i> about...", "a little donkey", ["a ship captain", "a talking tree"], "Platero is the title character."],
    ["The writers of the «Generación del 98» reflected on...", "Spain's identity after losing its last colonies", ["space travel", "sports"], "Look at the date in the name."]
  ], "Place each writer by century: 1800s (Bécquer, Rosalía, Galdós), early 1900s (Unamuno, Machado, Lorca, Jiménez).",
    "Match the writer to the title and to the movement (Romanticism, Realism, Generación del 98, Generación del 27).",
    "Example: Federico García Lorca wrote <i>Romancero gitano</i> and plays, and was born near Granada. Now match yours.",
    [["Romanticism and Realism", "🌅", "<b>Bécquer</b> and <b>Rosalía de Castro</b> wrote with emotion and nature. <b>Galdós</b> portrayed everyday society in his realist novels."], ["Generación del 98", "📘", "After 1898, writers like <b>Unamuno</b> and <b>Antonio Machado</b> asked: what is Spain? Their themes: identity, landscape, existence."], ["Generación del 27", "🎼", "A brilliant group of poets including <b>Lorca</b>. <b>Juan Ramón Jiménez</b> (Nobel 1956) and <b>Cela</b> (Nobel 1989) won the Nobel Prize."]]);

  const latam27 = RW([
    ["José Hernández's <i>Martín Fierro</i> is an epic poem about...", "a gaucho of Argentina", ["a sailor of Chile", "a Maya king"], "The gaucho is a cowboy of the pampas."],
    ["Who wrote <i>Cuentos de la selva</i>, stories with animals, in Uruguay and Argentina?", "Horacio Quiroga", ["Julio Cortázar", "Mario Benedetti"], "He is a master of the Latin American short story."],
    ["Which Cuban novelist wrote about «lo real maravilloso»?", "Alejo Carpentier", ["Pablo Neruda", "José Martí"], "He is linked to magical realism."],
    ["Miguel Ángel Asturias won the Nobel Prize in 1967. He was from...", "Guatemala", ["Bolivia", "Spain"], "He wrote about Maya myths and politics."],
    ["Laura Esquivel's <i>Como agua para chocolate</i> begins each chapter with...", "a recipe", ["a poem", "a map"], "Think about the title."],
    ["Jorge Luis Borges often wrote about labyrinths, mirrors and...", "infinity", ["football", "cooking"], "Think of <i>El Aleph</i>."],
    ["Mario Vargas Llosa won the Nobel Prize in 2010. He is from...", "Peru", ["Chile", "Colombia"], "He wrote <i>La ciudad y los perros</i>."],
    ["In which novel does the fictional town of Macondo appear?", "Cien años de soledad", ["Pedro Páramo", "Rayuela"], "It is by García Márquez."],
    ["Who was the first Latin American writer to win the Nobel Prize in Literature?", "Gabriela Mistral", ["Pablo Neruda", "Octavio Paz"], "She won in 1945."]
  ], "Think of the country first, then the genre (epic, short story, novel).",
    "Match each name to a book and a country: Quiroga (Uruguay), Carpentier (Cuba), Asturias (Guatemala), Esquivel (Mexico).",
    "Example: Isabel Allende (Chile) wrote <i>La casa de los espíritus</i>. Now match yours.",
    [["Beyond the famous names", "🌎", "Latin America also gave <b>Quiroga</b> (short stories), <b>Carpentier</b> (Cuba), <b>Asturias</b> (Guatemala, Nobel 1967), <b>Esquivel</b> (Mexico)."], ["The gaucho tradition", "🐎", "<b>Martín Fierro</b> (Argentina, 1872) is the national epic of the gauchos of the pampas."], ["Nobel Prizes", "🏅", "<b>Mistral</b> (1945), <b>Asturias</b> (1967), <b>Neruda</b> (1971), <b>García Márquez</b> (1982), <b>Paz</b> (1990), <b>Vargas Llosa</b> (2010)."]]);

  const moves27 = RW([
    ["Which movement of the 1800s stressed emotion, nature and freedom?", "Romanticismo", ["Realismo", "Barroco"], "Think of strong feelings."],
    ["Which movement aimed to show daily life as it really was?", "Realismo", ["Romanticismo", "Barroco"], "The name says it."],
    ["Modernismo, led by Rubén Darío, began in...", "Latin America in the late 1800s", ["Spain in the 1500s", "France in the 1700s"], "Darío was from Nicaragua."],
    ["The Spanish Baroque is known for...", "an ornate, complex style", ["plain, simple language", "never using metaphor"], "Think of Góngora."],
    ["The «Boom latinoamericano» of the 1960s made famous...", "Latin American novelists", ["medieval chroniclers", "Spanish playwrights"], "García Márquez, Cortázar and Vargas Llosa."],
    ["The «Vanguardias» of the early 1900s broke from tradition by...", "experimenting with new forms", ["copying older styles", "avoiding all art"], "Vanguard means in front."],
    ["The Renaissance revived interest in...", "classical Greece and Rome", ["medieval epics only", "modern technology"], "Renacimiento = rebirth."],
    ["Which order is chronological?", "Renacimiento, Barroco, Romanticismo, Realismo", ["Realismo, Romanticismo, Barroco, Renacimiento", "Barroco, Renacimiento, Realismo, Romanticismo"], "Start with the 1500s."]
  ], "Think about the century and the main idea of each movement.",
    "Chronology: Renaissance (1500s), Baroque (1600s), Romanticism (early 1800s), Realism (mid-1800s), Modernismo (late 1800s), Vanguardias (early 1900s), Boom (1960s).",
    "Example: Neoclassicism (1700s) valued reason and order. Now answer yours.",
    [["A map of movements", "🗺️", "<b>Renacimiento</b> (1500s) - <b>Barroco</b> (1600s) - <b>Romanticismo</b> (early 1800s) - <b>Realismo</b> (mid 1800s) - <b>Modernismo</b> (late 1800s)."], ["The 1900s", "🚀", "<b>Vanguardias</b> experimented with form. The <b>Boom</b> (1960s) brought Latin American novels to the world."], ["Each movement has a feel", "🎭", "Romanticism - emotion. Realism - everyday life. Baroque - ornate style. Modernismo - beauty and musical language."]]);

  const us27 = RW([
    ["In the United States, Spanish is...", "the most widely spoken language after English", ["not spoken at all", "spoken only in schools"], "Millions of people use it at home."],
    ["«Spanglish» is...", "mixing English and Spanish in speech", ["a school exam", "an old Latin dialect"], "Think of a bilingual conversation."],
    ["Which writer wrote <i>The House on Mango Street</i>, set in Chicago?", "Sandra Cisneros", ["Julia Álvarez", "Isabel Allende"], "It is written in English."],
    ["«Chicano» or «Chicana» refers to people of which descent in the US?", "Mexican", ["Cuban", "Spanish"], "It comes from the Mexican American community."],
    ["«Nuyorican» refers to Puerto Ricans in...", "New York", ["Miami", "Madrid"], "The word blends two place names."],
    ["César Chávez is remembered for helping...", "farm workers win fair treatment", ["build ships", "paint murals"], "He led a labor movement."],
    ["Which Dominican American author wrote <i>How the García Girls Lost Their Accents</i>?", "Julia Álvarez", ["Sandra Cisneros", "Esmeralda Santiago"], "She was born in New York and raised in the Dominican Republic."],
    ["US place names like Los Ángeles, San Antonio and Colorado come from...", "Spanish", ["Latin", "French"], "They are Spanish words."],
    ["Día de los Muertos is a Mexican tradition of...", "remembering loved ones with joy and offerings", ["a harvest only", "a sports victory"], "Families set up altars."]
  ], "Think about the Spanish-speaking communities in the US and how language and culture mix.",
    "Link each word to a community: Chicano (Mexican American), Nuyorican (Puerto Rican in New York), Spanglish (mixed speech).",
    "Example: Esmeralda Santiago, a Puerto Rican writer, wrote <i>When I Was Puerto Rican</i>. Now match yours.",
    [["Spanish in the US", "🇺🇸", "Spanish has been spoken in what is now the US for centuries. Place names (<b>Los Ángeles, Colorado</b>) show it."], ["Identities", "🗽", "<b>Chicano/a</b> (Mexican American), <b>Nuyorican</b> (Puerto Rican New Yorker), and many other communities each have a literature and a culture."], ["Language mixing", "🔀", "<b>Spanglish</b> and <b>code-switching</b> are natural in bilingual communities. Writers like Cisneros and Álvarez write in English with a Hispanic heart."]]);

  const socio27 = RW([
    ["What does RAE stand for?", "Real Academia Española", ["Registro Académico Europeo", "Red de Artes Españolas"], "It publishes the dictionary."],
    ["Together with the other academies (ASALE), the RAE helps guide...", "the Spanish language across many countries", ["only the law of Spain", "English translations"], "There are academies in Latin America too."],
    ["The Instituto Cervantes promotes...", "the Spanish language and Hispanic cultures worldwide", ["Spanish airlines", "soccer clubs"], "Its centers teach Spanish abroad."],
    ["Code-switching means...", "alternating between languages in one conversation", ["writing without punctuation", "learning Latin"], "Bilingual speakers do it naturally."],
    ["A heritage speaker is someone who...", "grew up hearing a family language at home", ["only studied a language in school", "is a tour guide"], "Think about the grandparents' language."],
    ["Spanish, Portuguese, Italian and French are...", "Romance languages", ["Germanic languages", "Slavic languages"], "They come from Latin."],
    ["Spanish is an official language in about how many countries?", "about 20", ["about 5", "about 60"], "Think of Spain, Mexico and most of South America."],
    ["Spanish is official in which African country?", "Equatorial Guinea", ["Nigeria", "Kenya"], "The country's name contains a line on the globe."],
    ["A lingua franca is...", "a language used between speakers of different mother tongues", ["a dead language", "a regional accent"], "Think of a bridge language."]
  ], "Think of words from linguistics: official institutions, bilingual speakers and language families.",
    "Remember: RAE = dictionary and norms; Instituto Cervantes = teaching; Romance = from Latin.",
    "Example: a dialect is a regional variety of a language, not a different language. Now answer yours.",
    [["Institutions", "🏛️", "The <b>RAE</b> (Real Academia Española) and the <b>ASALE</b> keep the norm and publish the dictionary. The <b>Instituto Cervantes</b> teaches Spanish abroad."], ["Bilingual life", "🌐", "<b>Code-switching</b> means alternating languages. A <b>heritage speaker</b> grew up with the language at home."], ["Spanish in the world", "🌍", "Spanish is official in about 20 countries, including Equatorial Guinea in Africa. It is one of the <b>Romance languages</b>."]]);

  const dialect27 = RW([
    ["«Seseo» means pronouncing z and c (before e, i) like...", "s", ["th as in 'think'", "ch"], "It is typical of Latin America."],
    ["In central and northern Spain, z and c (before e, i) are often pronounced like...", "th as in 'think'", ["English j", "sh"], "This pattern is called distinción."],
    ["«Yeísmo» means pronouncing ll the same as...", "y", ["r", "j"], "Most speakers today do it."],
    ["In Caribbean Spanish, a final s is often...", "weakened or dropped", ["doubled", "stressed"], "'Los amigos' sounds like 'lo amigo'."],
    ["In Río de la Plata Spanish, y and ll often sound like...", "sh or the s in 'measure'", ["j", "k"], "It is a very recognizable Argentine sound."],
    ["In casual speech, the d between vowels (hablado) is often...", "weakened or dropped", ["pronounced like English j", "doubled"], "'Hablado' sounds like 'hablao'."],
    ["«Ceceo» (s pronounced like th) is mainly heard in...", "parts of southern Spain", ["Chile and Peru", "Cuba"], "Think of Andalusia."],
    ["Why can two Spanish speakers sound very different yet understand each other?", "Pronunciation varies, but grammar and vocabulary are largely shared", ["They speak different languages", "One of them is wrong"], "Think of accents in English."]
  ], "Think about where the speaker is from: Spain (center/north/south), Caribbean, Río de la Plata, the Andes or Mexico.",
    "Remember: seseo = s for z/c; distinción = th for z/c; yeísmo = ll like y; Caribbean = weak final s.",
    "Example: in Mexico and the Andes, s is usually pronounced clearly at the end of a word. Now answer yours.",
    [["Accents", "👂", "Spanish pronunciation varies by region. <b>Seseo</b> (Latin America, parts of Spain) pronounces z/c like s. <b>Distinción</b> (most of Spain) uses a th sound."], ["Other patterns", "🌴", "The Caribbean often weakens final <b>s</b>. The Río de la Plata makes <b>y/ll</b> sound like <b>sh</b>. <b>Yeísmo</b> makes ll = y."], ["Understanding", "🤝", "Accents differ, but speakers understand each other. Listening to many accents trains your ear."]]);

  const poemRd27 = RD([
    { t: "La luna es un barco blanco / que cruza el cielo sin prisa. / Yo la sigo con los ojos / y el mundo entero respira.",
      qs: [["What is the moon compared to?", "a white ship", ["a lamp", "a coin"], "Find un barco blanco."], ["What does the speaker do?", "follows the moon with his eyes", ["sails the ship", "sleeps"], "Find la sigo con los ojos."], ["Which device is «La luna es un barco»?", "a metaphor", ["a simile", "irony"], "There is no word 'como'."], ["What is the mood?", "calm and peaceful", ["angry", "frightened"], "Notice «sin prisa» and «respira»."]] },
    { t: "Mi abuela guarda el tiempo / en un cajón de madera: / fotos, cartas y botones / que huelen a primavera.",
      qs: [["What does the grandmother keep?", "photos, letters and buttons", ["coins and keys", "books and maps"], "Find fotos, cartas y botones."], ["Where does she keep them?", "in a wooden drawer", ["in a metal box", "in a bag"], "Find cajón de madera."], ["What does the drawer symbolize?", "memories", ["money", "a school"], "She keeps 'el tiempo' in it."], ["What do the objects smell like?", "spring", ["rain", "smoke"], "Find huelen a."]] },
    { t: "Si el río hablara, diría / lo que no dicen los hombres: / que todo pasa y regresa, / que el agua nunca se cansa.",
      qs: [["What does the river say?", "Everything passes and returns", ["Everything stays the same", "Nothing matters"], "Find que todo pasa y regresa."], ["Which device is in «Si el río hablara»?", "personification and a hypothetical", ["hyperbole only", "a list"], "A river cannot really speak."], ["What quality of water does the poem praise?", "It never gets tired", ["It is cold", "It is fast"], "Find nunca se cansa."], ["Which verb forms appear in «Si el río hablara, diría»?", "imperfect subjunctive and conditional", ["preterite and future", "two commands"], "The pattern is si + hablara..., diría."]] }
  ], [["Reading a poem", "🪶", "Read aloud first. Then ask: who speaks? what image? what feeling? what device (metaphor, personification, repetition)?"], ["Slashes", "➗", "In this lesson a slash / marks the end of each line of verse."], ["Tip", "💡", "In short poems, every word matters. Look at verbs, colors and nouns that repeat."]]);

  const closeRd27 = RD([
    { t: "Marta abrió la ventana y vio que la lluvia había borrado el camino. Pensó en su padre, que siempre decía que los caminos no desaparecen, solo esperan. Entonces cerró el cuaderno, se puso el abrigo amarillo y salió a buscarlo.",
      qs: [["What had erased the path?", "the rain", ["the wind", "the snow"], "Find la lluvia."], ["What did the father say about roads?", "They do not disappear, they wait", ["They are always long", "They lead nowhere"], "Find los caminos no desaparecen."], ["What does the road most likely represent?", "the hope of returning to something lost", ["a school rule", "a sports game"], "Think about her father and what she does at the end."], ["What color is her coat?", "yellow", ["blue", "red"], "Find abrigo."]] },
    { t: "Nunca supe por qué mi tío vendió el piano. Yo era pequeño y creía que el silencio de la casa era culpa mía. Años después encontré, dentro de un libro, una nota: «Lo vendo para pagar tu escuela». Esa tarde toqué, sobre la mesa, la música que él no pudo tocar.",
      qs: [["Who tells the story?", "the nephew, in the first person", ["an omniscient narrator", "the uncle"], "Find Nunca supe and Yo era pequeño."], ["Why did the uncle sell the piano?", "To pay for the boy's school", ["Because it was broken", "Because he moved"], "Find Lo vendo para pagar."], ["Where did the narrator find the note?", "inside a book", ["under the piano", "in a letter box"], "Find dentro de un libro."], ["What is the tone of the ending?", "grateful and moving", ["angry", "comic"], "He plays the music his uncle could not play."]] },
    { t: "El alcalde inauguró la biblioteca con un discurso larguísimo sobre la importancia de leer. Al terminar, preguntó: «¿Alguien tiene alguna pregunta?». Nadie respondió; todos estaban dormidos o buscando la salida. Solo una niña, desde la última fila, levantó la mano: «¿Y cuándo empezamos a leer?».",
      qs: [["What did the mayor inaugurate?", "a library", ["a school", "a park"], "Find la biblioteca."], ["How was the speech?", "very long", ["very short", "very funny"], "Find larguísimo."], ["What is ironic in the scene?", "A long speech about reading puts people to sleep", ["The mayor was late", "The library was closed"], "Think about the topic of the speech and the audience."], ["What does the girl ask?", "When they will start reading", ["Where the exit is", "Who the mayor is"], "Find ¿Y cuándo empezamos a leer?"]] }
  ], [["Close reading", "🔍", "Read slowly and ask: who tells the story? what happens? what image or object repeats? what is the tone?"], ["Narrator", "🎙️", "A <b>first-person</b> narrator says «yo». An <b>omniscient</b> narrator knows everything. This changes how reliable the story feels."], ["Irony and symbols", "🎭", "<b>Irony</b> is the gap between what is said and what happens. A <b>symbol</b> stands for a larger idea."]]);

  const analysis27 = RW([
    ["In a literary analysis, what does a «tesis» state?", "the main claim you will prove", ["a summary of the plot", "your favorite quote"], "It guides the whole essay."],
    ["What is the best way to support a claim?", "with a short quotation or detail from the text", ["with a personal feeling only", "with a plot summary"], "Evidence comes from the text."],
    ["Which verb best completes «La imagen del mar ___ la libertad del personaje»?", "simboliza", ["olvida", "prohíbe"], "The sea stands for something."],
    ["Which connector shows contrast?", "En cambio", ["Por ejemplo", "Por lo tanto"], "It is similar to 'on the other hand'."],
    ["Which connector introduces an example?", "Por ejemplo", ["En cambio", "Sin embargo"], "Look for the word ejemplo."],
    ["Where does the conclusion go?", "in the last paragraph", ["before the thesis", "in the title"], "It closes the essay."],
    ["The «tono» of a text means...", "the author's attitude", ["the length of the text", "the number of characters"], "Is it serious, ironic, tender, angry?"],
    ["What is a «motivo» in literature?", "an image or idea that repeats in a work", ["a reason for writing", "a type of rhyme"], "Think of repetition."],
    ["Which phrase sounds most academic?", "Se podría argumentar que...", ["Yo creo que me gusta...", "Dicen por ahí que..."], "Avoid 'I like' and vague rumors."]
  ], "Think about the structure of an analysis: claim, evidence, explanation, conclusion.",
    "In analysis, use impersonal and precise verbs (simboliza, sugiere, revela) and support everything with evidence.",
    "Example: «Por lo tanto» introduces a result, while «Por ejemplo» introduces an example. Now answer yours.",
    [["Structure", "🏗️", "<b>Tesis</b> (claim) → <b>evidencia</b> (quotation) → <b>explicación</b> → <b>conclusión</b>. Each paragraph repeats this small chain."], ["Useful verbs", "🧰", "<b>sugiere, simboliza, revela, refleja, contrasta con, evoca</b>. They show how a detail creates meaning."], ["Tone and motifs", "🎼", "The <b>tono</b> is the author's attitude. A <b>motivo</b> is a repeated image. Spotting both gives you something to analyze."]]);

  const trans27 = TR([
    ["La novela refleja los conflictos de la sociedad de su época.", "The novel reflects the conflicts of the society of its time."],
    ["El poeta recurre a imágenes de la naturaleza para expresar su tristeza.", "The poet turns to images of nature to express his sadness."],
    ["Aunque fue escrita hace siglos, la obra sigue siendo actual.", "Although it was written centuries ago, the work is still relevant."],
    ["El traductor debe conservar el sentido, no solo las palabras.", "The translator must keep the meaning, not just the words."],
    ["No se puede entender el poema sin conocer su contexto histórico.", "The poem cannot be understood without knowing its historical context."],
    ["Cuanto más leo, más preguntas tengo.", "The more I read, the more questions I have."],
    ["Los personajes se enfrentan a decisiones difíciles.", "The characters face difficult decisions."],
    ["La autora, que nació en Chile, escribió gran parte de su obra en el exilio.", "The author, who was born in Chile, wrote much of her work in exile."],
    ["Habría sido imposible publicar el libro sin su ayuda.", "It would have been impossible to publish the book without her help."],
    ["Ese tema aparece una y otra vez en sus cuentos.", "That theme appears again and again in his stories."]
  ], [["Academic sentences", "🎓", "University texts use longer sentences with relative clauses, subjunctive and conditional. Find the main verb first."], ["Patterns", "🔎", "<b>Cuanto más..., más...</b> = the more..., the more.... <b>Habría sido</b> = it would have been. <b>Una y otra vez</b> = again and again."], ["Tip", "💡", "Translate the meaning, then reread your English to make sure it sounds natural."]]);

  const etiquette27 = RW([
    ["In Spain, a common greeting between friends is...", "two kisses on the cheek", ["a deep bow", "only a wave"], "It is a friendly custom."],
    ["What is the «sobremesa»?", "relaxed conversation at the table after a meal", ["a table set before the meal", "a kind of dessert"], "Sobre = over, after."],
    ["Why do people say «ingeniero Pérez» or «doctora Ruiz» in many Latin American countries?", "To show respect for a profession or title", ["Because they cannot remember names", "It is a nickname"], "Titles are used as a form of address."],
    ["What do «don» and «doña» before a first name show?", "respect", ["anger", "distance from the family"], "They are often used for older people."],
    ["In Spain, dinner is usually eaten...", "late, around nine or ten", ["at five", "at noon"], "Spanish schedules are later than in many countries."],
    ["What is «ustedeo»?", "using usted even with close people, as in parts of Colombia and Costa Rica", ["using tú with strangers", "using vos only"], "It shows warmth and respect."],
    ["When meeting an older person for the first time, which form is safest?", "usted", ["vos", "tú"], "It is the formal 'you'."],
    ["What is a «merienda»?", "a light afternoon snack", ["the main dinner", "breakfast"], "It is eaten between lunch and dinner."],
    ["The midday main meal in Spain is «la comida». The evening meal is...", "la cena", ["el desayuno", "la merienda"], "It happens late."]
  ], "Think about politeness and daily life. Customs vary by country, so choose the best fit.",
    "When unsure, formal address (usted, titles, don/doña) is the safe choice.",
    "Example: «tertulia» is a lively gathering to talk about ideas, often in a café. Now answer yours.",
    [["Respect in address", "🎩", "Use <b>usted</b> with older people and strangers. Titles like <b>doctor, ingeniero, licenciado</b>, and <b>don/doña</b> show respect."], ["Meals", "🍽️", "In Spain: <b>desayuno, comida</b> (midday), <b>merienda</b>, <b>cena</b> (late). The <b>sobremesa</b> is time to talk after eating."], ["Customs vary", "🌎", "Greetings, schedules and the use of <b>tú/vos/usted</b> differ by country. Observe and adapt."]]);

  const seqTense27 = FB([
    ["Mi madre quería que yo ___ médico.", "fuera", ["sea", "seré"], "The main verb is in the past."],
    ["Me pidió que le ___ la puerta.", "abriera", ["abra", "abrí"], "A past request."],
    ["Dudaba que ellos ___ a tiempo.", "llegaran", ["lleguen", "llegan"], "Past doubt."],
    ["Si hubiéramos sabido, ___ antes.", "habríamos venido", ["vendremos", "hemos venido"], "An unreal past condition."],
    ["Era necesario que todos ___ el examen.", "hicieran", ["hagan", "hacen"], "'Era necesario que' sets the past."],
    ["Me sorprende que ___ terminado tan pronto.", "hayan", ["han", "habrán"], "A present emotion about something finished."],
    ["Le dije que ___ más despacio.", "hablara", ["hablaré", "habla"], "A past command reported."],
    ["Esperaba que ella me ___.", "llamara", ["llame", "llama"], "A past hope."]
  ], "Look at the main verb. If it is in the past, the second verb usually shifts to the imperfect subjunctive.",
    "Present main verb: present subjunctive (quiero que vengas). Past main verb: imperfect subjunctive (quería que vinieras).",
    "Example: 'Quiero que comas' becomes 'Quería que comieras' in the past. Now apply it to yours.",
    [["Sequence of tenses", "🔗", "The tense of the first verb tells you the tense of the second. <b>Quiero que vengas</b> → <b>Quería que vinieras</b>."], ["Imperfect subjunctive", "🧩", "Take the <b>ellos</b> preterite, drop <b>-ron</b>, add <b>-ra</b>: <b>llegaron → llegara</b>, <b>hicieron → hiciera</b>."], ["Unreal past", "🌀", "<b>Si hubiéramos sabido, habríamos venido.</b> Use pluperfect subjunctive after <b>si</b> and the conditional perfect in the result."]]);

  const serEstar27 = RW([
    ["What does «Está lista» mean?", "She is ready", ["She is smart", "She is late"], "Estar changes the meaning of listo."],
    ["What does «Es lista» mean?", "She is smart", ["She is ready", "She is tired"], "Ser describes a characteristic."],
    ["What does «Está aburrido» mean?", "He is bored", ["He is boring", "He is lazy"], "A condition, not a trait."],
    ["What does «Es aburrido» mean?", "He (or it) is boring", ["He is bored", "He is sleepy"], "A characteristic."],
    ["What does «La banana está verde» mean?", "The banana is unripe", ["The banana is a green kind", "The banana is rotten"], "A temporary state."],
    ["What does «La paella está rica» suggest?", "The paella tastes delicious", ["The paella belongs to a rich person", "The paella is expensive"], "Estar rico is about taste."],
    ["What does «El puente es seguro» mean?", "The bridge is safe", ["The bridge is sure", "The bridge is old"], "A quality of the bridge."],
    ["What does «Está vivo» mean?", "He is alive", ["He is clever", "He is hungry"], "Ser vivo means clever."],
    ["What does «Es rico» mean?", "He is wealthy", ["He tastes good", "He is happy"], "A lasting trait."]
  ], "The adjective's meaning changes with ser or estar: ser = lasting trait; estar = state, condition or result.",
    "Think: is this a permanent characteristic (ser) or a state, how something is right now (estar)?",
    "Example: «Es malo» means 'he is bad' but «Está malo» can mean 'he is sick'. Now answer yours.",
    [["Same adjective, new meaning", "🔄", "<b>Ser listo</b> = smart; <b>estar listo</b> = ready. <b>Ser aburrido</b> = boring; <b>estar aburrido</b> = bored."], ["More pairs", "🍌", "<b>Ser rico</b> = wealthy; <b>estar rico</b> = tasty. <b>Ser vivo</b> = clever; <b>estar vivo</b> = alive. <b>Estar verde</b> = unripe."], ["The rule", "📏", "<b>Ser</b> defines what someone or something is. <b>Estar</b> describes how it is now. With these adjectives, your choice changes the meaning."]]);

  const read27 = RD([
    { t: "Los críticos suelen decir que la literatura no solo cuenta historias, sino que las interpreta. Un cuento sobre una familia pobre puede hablar también de la injusticia o de la esperanza. Leer con atención significa preguntarse no solo qué ocurre, sino por qué el autor lo cuenta de esa manera.",
      qs: [["What do critics say literature does?", "It interprets stories as well as telling them", ["It only entertains", "It only teaches grammar"], "Find no solo cuenta historias, sino que las interpreta."], ["What can a story about a poor family also talk about?", "injustice or hope", ["sports", "geography"], "Find injusticia."], ["What does attentive reading ask?", "Why the author tells it that way", ["How long the book is", "Who printed it"], "Find por qué el autor."], ["What does «no solo... sino» do?", "It adds a second idea", ["It denies the first idea", "It gives an order"], "It means 'not only... but also'."]] },
    { t: "El spanglish no es un error, sino una forma de comunicación natural entre personas que viven entre dos lenguas. Un hablante puede decir «Voy a parquear el carro» porque ambas lenguas forman parte de su vida diaria. Algunos puristas lo critican, pero muchos lingüistas lo estudian como un fenómeno cultural.",
      qs: [["What does the writer claim about Spanglish?", "It is a natural form of communication", ["It is always a mistake", "It is an old language"], "Find no es un error."], ["Which example is given?", "Voy a parquear el carro", ["Hola, amigo", "Me gusta el pan"], "Find Un hablante puede decir."], ["Who criticizes Spanglish?", "purists", ["linguists", "children"], "Find puristas."], ["How do many linguists view it?", "As a cultural phenomenon", ["As a joke", "As a rule of grammar"], "Find fenómeno cultural."]] },
    { t: "En muchos países hispanos, la comida no termina cuando se acaba el plato. Después viene la sobremesa, un tiempo de conversación tranquila alrededor de la mesa. Para muchas familias, ese rato es tan importante como la comida misma, porque allí se cuentan historias y se fortalece la unión.",
      qs: [["What is the sobremesa?", "relaxed conversation after the meal", ["a kind of dessert", "a table decoration"], "Find un tiempo de conversación."], ["When does it happen?", "after the food is finished", ["before cooking", "at breakfast only"], "Find Después viene."], ["Why is it important for families?", "Stories are told and unity grows", ["It saves money", "It is required by law"], "Find se cuentan historias."], ["How important is it compared to the meal?", "as important as the meal itself", ["less important", "more important than sleeping"], "Find tan importante como."]] }
  ], READ_SLIDES);

  const listen27 = RD([
    { t: "Buenas tardes. En la clase de hoy vamos a comparar dos poemas sobre el mar, uno del siglo diecinueve y otro del siglo veinte. Primero los leeremos en voz alta. Después trabajarán en parejas y entregarán el viernes un párrafo con una tesis clara.",
      qs: [["What will the class compare?", "two poems about the sea", ["two novels", "two paintings"], "Find dos poemas sobre el mar."], ["What will they do first?", "read them aloud", ["write a paragraph", "watch a film"], "Find Primero."], ["How will students work next?", "in pairs", ["alone", "in groups of five"], "Find en parejas."], ["What is due on Friday?", "a paragraph with a clear thesis", ["a full novel", "a poem"], "Find entregarán el viernes."]] },
    { t: "Crecí hablando español en casa e inglés en la escuela. A veces mezclo las dos lenguas, y eso me daba vergüenza. Ahora sé que es normal en las personas bilingües. Mi abuela me contaba cuentos en español, y gracias a ella hoy estudio literatura hispánica.",
      qs: [["Where did the speaker use Spanish?", "at home", ["at school", "at work"], "Find en casa."], ["Why was the speaker embarrassed?", "Mixing the languages", ["Speaking too slowly", "Not knowing English"], "Find vergüenza."], ["Who told the speaker stories?", "the grandmother", ["a teacher", "a cousin"], "Find Mi abuela."], ["What does the speaker study now?", "Hispanic literature", ["math", "biology"], "Find hoy estudio."]] },
    { t: "La Feria del Libro abre sus puertas el sábado a las diez de la mañana. Habrá lecturas de poesía, talleres para escritores jóvenes y una charla con una novelista argentina. La entrada es gratuita para estudiantes. Los talleres requieren inscripción previa.",
      qs: [["When does the book fair open?", "Saturday at 10 a.m.", ["Sunday at 10 a.m.", "Saturday at 10 p.m."], "Find abre sus puertas."], ["Who gets free entry?", "students", ["teachers", "everyone"], "Find gratuita."], ["What requires registration in advance?", "the workshops", ["the poetry readings", "the talk"], "Find inscripción previa."], ["Who is the guest speaker?", "an Argentine novelist", ["a Chilean poet", "a Mexican painter"], "Find una charla con."]] }
  ], LISTEN_SLIDES);

  const L27B = [].concat(CRIT.items, LING.items.slice(4), HISTL.items.slice(0, 4), GENR.items.slice(4));
  const t27 = TYE(L27B, "literary criticism, linguistics and kinds of texts");

  const L27 = [
    XL("Talking about literature", V(CRIT)), XL("From the Middle Ages to the Renaissance", medieval27), XL("Spain: 1800s and 1900s", spain27), XL("More Latin American writers", latam27),
    XL("Literary movements", moves27), XL("Hispanic voices in the US", us27), XL("Language and society", socio27), XL("Accents around the Spanish world", dialect27),
    XL("Reading a poem", poemRd27), XL("Close reading", closeRd27), XL("Writing a literary analysis", analysis27), XL("Translating academic sentences", trans27),
    XL("Customs and politeness", etiquette27), XL("Sequence of tenses", seqTense27), XL("Ser and estar change meaning", serEstar27), XL("Reading: criticism, Spanglish, sobremesa", read27),
    XL("Listening: lecture, story, book fair", listen27), XL("Type it in Spanish", t27),
    XL("Mixed practice", MIX([V(CRIT), medieval27, spain27, latam27, moves27, socio27, dialect27, serEstar27])),
    XL("Level 27 Challenge", MIX([V(CRIT), medieval27, spain27, latam27, moves27, us27, socio27, dialect27, poemRd27, closeRd27, analysis27, trans27, etiquette27, seqTense27, serEstar27, read27, listen27]))
  ];

  Object.assign(SPANISH_LEVELS, { 25: L25, 26: L26, 27: L27 });
})();
