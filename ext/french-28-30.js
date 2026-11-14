// ext/french-28-30.js : French, levels 28-30 (College year 1 second half, College year 2).
// Francophone literature and cultural studies, linguistics, advanced writing and translation, business and professional French, media and current affairs.
(() => {
  const FR = "fr-FR";
  const S = (h, v, t) => ({ h, v, t });
  const lead = s => String(s).replace(/^[^A-Za-zÀ-ÿ0-9]+/, "")[0];
  const word = (fr, en, e) => `<span class="word" data-say="${fr}" data-lang="${FR}">${e ? e + " " : ""}<b>${fr}</b> = ${en} 🔊</span>`;
  const les = (title, gen, slides) => { gen.teach = () => slides; return { title, make: gen }; };
  const MIX = (title, ls, show) => {
    const make = () => pick(ls).make();
    make.teach = () => [S("Review time!", "🔄", "This lesson mixes ideas you already know. Here is a quick reminder of some of them, then the quiz.")].concat((show || ls.slice(0, 3)).map(l => { const t = l.make.teach(); return t[1] || t[0]; }));
    return { title, make };
  };
  const BK = (name, items, o = {}) => Object.assign({ name, items }, o);
  const tg = (h, e, intro, ex, exnote, tip) => [S(h, e, intro), S("Examples", ex, exnote), S("Tip", "🧠", tip)];

  const vocab = bank => () => {
    const items = bank.items, cur = pick(items), [fr, en] = cur;
    const rest = items.filter(x => x[0] !== fr), ex = pick(rest), wr = shuf(rest);
    if (Math.random() < 0.5) return {
      text: `What does "${fr}" mean?`, say: fr, lang: FR, choices: shuf([en, ...wr.slice(0, 2).map(x => x[1])]), answer: en,
      hints: ["Press 🔊 to hear it. Does it look like an English word, or share a root with one you know?", `The English answer starts with the letter "${lead(en).toUpperCase()}".`, `Example: "${ex[0]}" means "${ex[1]}". Now think about yours.`]
    };
    return {
      text: `How do you say "${en}" in French?`, choices: shuf([fr, ...wr.slice(0, 2).map(x => x[0])]), answer: fr,
      hints: ["Think back to the words from the lesson. Which one fits the English?", `The French answer starts with "${lead(fr)}".`, `Example: "${ex[1]}" in French is "${ex[0]}". Now find yours.`]
    };
  };
  const mc = (items, hints, n = 2) => () => {
    const it = pick(items), [text, ans, wr, vis] = it;
    const q = { text, choices: shuf([ans, ...shuf(wr).slice(0, n)]), answer: ans, hints };
    if (vis) q.visual = vis;
    return q;
  };
  const pq = (items, qfn, hints, n = 2) => mc(items.map(([a, b, w]) => [qfn(a), b, w || items.filter(x => x[1] !== b).map(x => x[1])]), hints, n);
  const tVocab = bank => [
    S(bank.name, "📚", `In this lesson you will learn French about <b>${bank.name.toLowerCase()}</b>. Listen, say it out loud, and then try the quiz.`),
    S("Learn the words", bank.items.map(x => word(x[0], x[1], x[2])).join("<br>"), "<b>Tap any word to hear it</b> and say it out loud!"),
    S("How to remember", "🧠", bank.tip || "Say each word out loud. Cover the English and see if you remember.")
  ];
  const typed = (items, nudge, ex) => () => {
    const [text, ans] = pick(items), n = ans.replace(/[^A-Za-zÀ-ÿ]/g, "").length;
    return { text, textInput: true, answer: ans, hints: [nudge, `The answer starts with "${lead(ans)}" and has ${n} letters.`, ex] };
  };
  const readQ = ps => ps.flatMap(p => p.qs.map(q => [`<i>${p.t}</i><br><br>${q[0]}`, q[1], q[2]]));
  const readH = ["Read the text slowly. Which words from the question can you find in the text?", "The answer is in the text, but sometimes you must read between the lines. Look at the sentence with the same key words as the question.", "Example: in 'Paul joue au foot le lundi', the question 'When does Paul play?' is answered by the words near 'lundi'. Now look in your text."];
  const listen = items => () => {
    const [s, q, a, w] = pick(items);
    return {
      text: `🔊 Press the speaker and listen.<br><i>Transcript: « ${s} »</i><br><br>${q}`, say: s, lang: FR, choices: shuf([a, ...shuf(w).slice(0, 2)]), answer: a,
      hints: ["Listen again with 🔊. Focus on numbers, times, places and the key nouns.", "Ignore words you do not know. Find the words that answer the question.", "Example: in 'Le magasin ferme à six heures', the closing time is the number you hear. Now listen for yours."]
    };
  };
  const lisT = [S("Listening-style practice", "🎧", "Press the 🔊 button and listen. The transcript is shown so you can check what you heard, but try listening first!"), S("How to listen", "👂", "Catch numbers, times, places and names first. Then work out the reason or the request."), S("Tip", "🧠", "You do not need every word. Announcements repeat the important information in a clear order.")];
  const readT = (a, b, c) => [S(a, "📖", b), S("How to read", "🔎", c), S("Tip", "🧠", "Find the question words in the text first, then check the sentences around them. Watch small words like <i>pourtant</i>, <i>or</i> and <i>donc</i>.")];
  const typT = [S("Typing practice", "⌨️", "You type the French word for the English you see."), S("Remember", "🧠", "Some words are masculine (le) and some feminine (la), but you type only the word."), S("Tip", "✍️", "Accents are optional here.")];

  // =====================================================  LEVEL 28
  const SURR = [
    ["Who published the first « Manifeste du surréalisme » in 1924?", "André Breton", ["Louis Aragon", "Paul Éluard", "Tristan Tzara"]],
    ["Which technique lets the hand write without conscious control, to free the unconscious?", "l'écriture automatique", ["l'alexandrin", "la tirade", "le pastiche"]],
    ["What does the Oulipo group (Ouvroir de littérature potentielle) explore?", "Writing under chosen constraints", ["Realistic reports of daily life", "Strict classical stage rules", "Dreams told exactly as dreamt"]],
    ["Who wrote « La Disparition », a novel that never uses the letter e?", "Georges Perec", ["Raymond Queneau", "Boris Vian", "André Breton"]],
    ["Who wrote « Exercices de style », telling one small story in 99 different ways?", "Raymond Queneau", ["Georges Perec", "Jacques Prévert", "Louis Aragon"]],
    ["Tristan Tzara was a leading figure of which anti-art movement born in Zurich in 1916?", "Dada", ["le romantisme", "le classicisme", "le Parnasse"]],
    ["Who wrote « Nadja » (1928), a prose work of the surrealist movement?", "André Breton", ["Boris Vian", "Jacques Prévert", "Raymond Queneau"]],
    ["Who wrote the poetic novel « L'Écume des jours » (1947)?", "Boris Vian", ["Raymond Queneau", "Jean Genet", "Albert Camus"]],
    ["Who wrote the popular poems of « Paroles » (1946), in simple everyday language?", "Jacques Prévert", ["Paul Valéry", "Guillaume Apollinaire", "Charles Baudelaire"]],
    ["Which poet invented the word « surréaliste » in 1917 for a ballet programme?", "Guillaume Apollinaire", ["André Breton", "Paul Éluard", "Jean Cocteau"]]
  ];
  const NEG = [
    ["Which poet from Martinique wrote « Cahier d'un retour au pays natal »?", "Aimé Césaire", ["Léopold Sédar Senghor", "Léon-Gontran Damas", "Frantz Fanon"]],
    ["Which poet from Senegal became his country's first president?", "Léopold Sédar Senghor", ["Aimé Césaire", "Birago Diop", "Léon-Gontran Damas"]],
    ["Which poet from Guyane wrote « Pigments » (1937) and co-founded négritude?", "Léon-Gontran Damas", ["Aimé Césaire", "Édouard Glissant", "Frantz Fanon"]],
    ["What does the négritude movement affirm?", "Pride in Black identity and culture", ["A return to Latin as the language of poetry", "A ban on foreign words", "A new rhyme scheme for sonnets"]],
    ["Which author wrote « Peau noire, masques blancs » (1952) and « Les Damnés de la terre » (1961)?", "Frantz Fanon", ["Aimé Césaire", "Albert Memmi", "Édouard Glissant"]],
    ["Who was the first African elected to the Académie française, in 1983?", "Léopold Sédar Senghor", ["Aimé Césaire", "Ahmadou Kourouma", "Camara Laye"]],
    ["Which essay by Césaire (1950) attacks the colonial system?", "Discours sur le colonialisme", ["Le Deuxième Sexe", "Tristes Tropiques", "La Nausée"]],
    ["Which student magazine launched the négritude movement in Paris in 1934?", "L'Étudiant noir", ["Le Canard enchaîné", "La Revue blanche", "Le Figaro littéraire"]],
    ["On which island was Aimé Césaire born?", "Martinique", ["Haïti", "La Réunion", "Cuba"]]
  ];
  const MAGH = [
    ["Which author, born in Algeria, wrote « L'Étranger » (1942)?", "Albert Camus", ["Jean-Paul Sartre", "André Gide", "André Malraux"]],
    ["Which Algerian author wrote the experimental novel « Nedjma » (1956)?", "Kateb Yacine", ["Mouloud Feraoun", "Albert Memmi", "Driss Chraïbi"]],
    ["Which Algerian novelist and filmmaker, author of « L'Amour, la fantasia », joined the Académie française in 2005?", "Assia Djebar", ["Leïla Slimani", "Marguerite Duras", "Simone de Beauvoir"]],
    ["Which Moroccan writer won the Goncourt in 1987 for « La Nuit sacrée »?", "Tahar Ben Jelloun", ["Driss Chraïbi", "Kateb Yacine", "Albert Camus"]],
    ["Which French-Moroccan author won the Goncourt in 2016 for « Chanson douce »?", "Leïla Slimani", ["Assia Djebar", "Annie Ernaux", "Amélie Nothomb"]],
    ["Which Tunisian writer wrote « La Statue de sel » (1953)?", "Albert Memmi", ["Tahar Ben Jelloun", "Mouloud Feraoun", "Kateb Yacine"]],
    ["Which Kabyle writer from Algeria wrote « Le Fils du pauvre » (1950)?", "Mouloud Feraoun", ["Driss Chraïbi", "Albert Camus", "Albert Memmi"]],
    ["Which Moroccan writer shocked readers in 1954 with « Le Passé simple »?", "Driss Chraïbi", ["Tahar Ben Jelloun", "Kateb Yacine", "Mouloud Feraoun"]],
    ["Which region of North Africa is called « le Maghreb »?", "Morocco, Algeria and Tunisia (and neighbours)", ["Egypt, Kenya and Senegal", "Haïti, Cuba and Martinique", "Belgium, Luxembourg and Switzerland"]]
  ];
  const EXIS = [
    ["Which philosopher and novelist wrote « La Nausée » (1938)?", "Jean-Paul Sartre", ["Albert Camus", "Simone de Beauvoir", "André Gide"]],
    ["Which author wrote « Le Deuxième Sexe » (1949), a landmark of feminist thought?", "Simone de Beauvoir", ["Marguerite Duras", "Nathalie Sarraute", "George Sand"]],
    ["Which formula sums up Sartre's existentialism?", "L'existence précède l'essence", ["Je pense, donc je suis", "L'enfer, c'est les autres", "Le cœur a ses raisons"]],
    ["Which Camus essay (1942) presents the idea of the absurd with a mythological figure?", "Le Mythe de Sisyphe", ["La Peste", "Les Mains sales", "Huis clos"]],
    ["Who wrote « Les Gommes » (1953), a leading Nouveau Roman?", "Alain Robbe-Grillet", ["Michel Butor", "Albert Camus", "Boris Vian"]],
    ["Which writer published « Tropismes » (1939) and became a figure of the Nouveau Roman?", "Nathalie Sarraute", ["Marguerite Duras", "Simone de Beauvoir", "Colette"]],
    ["What did the Nouveau Roman writers question?", "The traditional plot and the all-knowing narrator", ["The use of printed paper", "The rule of rhyme in prose", "The idea of having a title"]],
    ["Which play by Ionesco (1950) is a landmark of the theatre of the absurd?", "La Cantatrice chauve", ["Le Cid", "Tartuffe", "Cyrano de Bergerac"]],
    ["Which Irish author wrote « En attendant Godot » (1952) in French?", "Samuel Beckett", ["Eugène Ionesco", "Jean Genet", "Jean Anouilh"]],
    ["Which play by Sartre takes place in a room where three people are locked together?", "Huis clos", ["Les Mouches", "Antigone", "La Cantatrice chauve"]]
  ];
  const FIG = [
    ["Which figure of speech is in: « Cette obscure clarté »?", "un oxymore", ["une litote", "une hyperbole", "une métonymie"]],
    ["Which figure of speech is in: « Je meurs de faim »?", "une hyperbole", ["une litote", "un oxymore", "une comparaison"]],
    ["Which figure of speech is in: « Ce n'est pas mal » (meaning: it is very good)?", "une litote", ["une hyperbole", "une antithèse", "une personnification"]],
    ["Which figure of speech is in: « Boire un verre » (the container for the content)?", "une métonymie", ["une métaphore", "une litote", "un oxymore"]],
    ["Which figure of speech is in: « Cet homme est un lion »?", "une métaphore", ["une comparaison", "une litote", "une anaphore"]],
    ["Which figure of speech is in: « Il est fort comme un lion »?", "une comparaison", ["une métaphore", "une métonymie", "une litote"]],
    ["Which figure of speech is in: « La mer sourit au soleil »?", "une personnification", ["une antithèse", "une litote", "une métonymie"]],
    ["Which figure of speech is in: « Un silence assourdissant »?", "un oxymore", ["une comparaison", "une anaphore", "une métonymie"]],
    ["Which figure of speech is in: « Je veux la paix. Je veux le calme. Je veux la liberté. »?", "une anaphore", ["un oxymore", "une litote", "une métonymie"]],
    ["Which figure of speech is in: « Il est jeune de corps, vieux d'esprit »?", "une antithèse", ["une anaphore", "une comparaison", "une litote"]],
    ["Which figure of speech is in: « Cinquante voiles entraient dans le port » (voiles = ships)?", "une synecdoque", ["une antithèse", "un oxymore", "une comparaison"]],
    ["Someone says « Quel beau temps ! » in the middle of a storm. Which figure is this?", "l'ironie", ["l'anaphore", "la comparaison", "l'hyperbole"]]
  ];
  const CINE = [
    ["Which director made « Les 400 coups » (1959), a landmark of the Nouvelle Vague?", "François Truffaut", ["Jean Renoir", "Jacques Tati", "Agnès Varda"]],
    ["Which director made « À bout de souffle » (1960)?", "Jean-Luc Godard", ["François Truffaut", "Jean Renoir", "Georges Méliès"]],
    ["Who gave the first public paid film screening in Paris in 1895?", "Les frères Lumière", ["Georges Méliès", "Les frères Pathé", "Léon Gaumont"]],
    ["Who made « Le Voyage dans la Lune » (1902), a pioneer of special effects?", "Georges Méliès", ["Louis Lumière", "Jacques Tati", "Jean Renoir"]],
    ["What is the highest prize of the Festival de Cannes called?", "la Palme d'or", ["le César", "l'Oscar", "le Lion d'or"]],
    ["What are the main French film awards called?", "les César", ["les Molières", "les Goncourt", "les Palmes d'or"]],
    ["Which comic filmmaker created the character of Monsieur Hulot?", "Jacques Tati", ["Jean Renoir", "Louis Malle", "François Truffaut"]],
    ["Which director made « Cléo de 5 à 7 » (1962), a Nouvelle Vague film?", "Agnès Varda", ["Jean-Luc Godard", "Jacques Tati", "Jean Renoir"]],
    ["Which Senegalese director is often called the father of African cinema?", "Ousmane Sembène", ["Jean Renoir", "Georges Méliès", "Jacques Tati"]],
    ["Which French director made « La Grande Illusion » (1937)?", "Jean Renoir", ["Jacques Tati", "Jean-Luc Godard", "Agnès Varda"]]
  ];
  const PHON = [
    ["Which word contains a nasal vowel?", "vent", ["veine", "vérité", "mère"]],
    ["Which two words differ only by the vowel sounds /u/ and /y/?", "tout / tu", ["tout / tous", "pain / pin", "mer / mère"]],
    ["How is « gn » pronounced in « montagne »?", "Like the ny in « canyon »", ["Like the g in « go »", "It is silent", "Like the n in « no »"]],
    ["In which word is « ill » NOT pronounced like a y sound?", "ville", ["fille", "famille", "gentille"]],
    ["Which word contains the sound /ʃ/?", "chat", ["sac", "jour", "gare"]],
    ["Which word contains the sound /ʒ/?", "jour", ["chat", "sac", "gare"]],
    ["Which word contains the semi-vowel /ɥ/ (as in « lui »)?", "huit", ["oui", "pas", "tout"]],
    ["In « les amis », how is the final s of « les » said in the liaison?", "As a /z/ sound", ["As an /s/ sound", "As a /t/ sound", "It stays silent"]],
    ["Which word has a silent final consonant?", "petit", ["sac", "bol", "bus"]],
    ["Where does the stress normally fall in a French rhythmic group?", "On the last syllable of the group", ["On the first syllable", "On the vowel e", "It changes at random"]]
  ];
  const READ28a = [
    { t: "La mairie a annoncé hier la création de trois nouvelles pistes cyclables, afin de réduire la circulation en centre-ville. Les travaux commenceront en mars et dureront huit mois. Certains commerçants craignent de perdre des clients, mais la municipalité promet des places de stationnement près des rues commerçantes.", qs: [
      ["What is the aim of the new bike lanes?", "To reduce traffic in the city centre", ["To attract tourists", "To replace the bus service"]],
      ["How long will the works last?", "Eight months", ["Three months", "One year"]],
      ["Why are some shopkeepers worried?", "They might lose customers", ["They will have to move", "Their rents will double"]]] },
    { t: "Selon une étude publiée lundi, les jeunes de 15 à 25 ans passent en moyenne quatre heures par jour sur leur téléphone. Les chercheurs soulignent toutefois que la durée compte moins que l'usage : lire ou apprendre n'a pas les mêmes effets que faire défiler des vidéos sans fin.", qs: [
      ["How much time do young people spend on their phones, on average?", "Four hours a day", ["One hour a day", "Eight hours a day"]],
      ["What matters more than the time, according to the researchers?", "How the phone is used", ["Which brand it is", "The price of the phone"]],
      ["The word « toutefois » introduces…", "a nuance", ["an example", "a conclusion"]]] },
    { t: "Le nombre de librairies indépendantes a augmenté de deux pour cent en un an, ce qui surprend les experts. Selon eux, les lecteurs recherchent des conseils personnalisés que les sites internet ne peuvent pas toujours offrir.", qs: [
      ["What surprises the experts?", "More independent bookshops are open", ["Fewer people read books", "Websites sell more books"]],
      ["Why, according to them, do readers go to bookshops?", "To get personal advice", ["To pay less", "To avoid reading online"]],
      ["By how much did the number increase?", "Two percent", ["Twenty percent", "Half"]]] }
  ];
  const READ28b = [
    { t: "Le soir tombe sur la mer<br>et la mer se tait.<br>Mon cœur, plus lourd que l'air,<br>garde un vieux secret.", qs: [
      ["What is the mood of the poem?", "calm and slightly sad", ["joyful and noisy", "angry and violent"]],
      ["What does « la mer se tait » do to the sea?", "It gives it a human action (personification)", ["It compares it to a lion", "It states a date"]],
      ["What is the rhyme scheme (mer, tait, air, secret)?", "ABAB", ["AABB", "ABBA"]]] },
    { t: "Mon grand-père plantait des tilleuls<br>pour des gens qu'il ne verrait pas.<br>Aujourd'hui, je m'assieds à l'ombre<br>et je lui dis merci tout bas.", qs: [
      ["What did the grandfather do?", "He planted trees for the future", ["He cut down old trees", "He sold wood"]],
      ["What is the main theme?", "Gratitude across generations", ["Fear of the dark", "The joy of winning"]],
      ["Why does the speaker say thank you?", "To thank him for the shade he planted", ["For a gift of money", "For a trip abroad"]]] },
    { t: "Paris s'éveille. Les volets claquent,<br>le boulanger sourit au jour.<br>Sur le pont, un violon bavarde<br>avec le vent, comme un vieil ami.", qs: [
      ["What time of day is it?", "Early morning", ["Midnight", "Late evening"]],
      ["Which image gives the violin a human quality?", "un violon bavarde", ["les volets claquent", "le boulanger sourit"]],
      ["What does « comme un vieil ami » create?", "A comparison", ["An oxymoron", "A litotes"]]] }
  ];
  const MEDIA = BK("Media words", [["la une", "front page"], ["le titre", "headline"], ["le rédacteur en chef", "editor-in-chief"], ["le reportage", "news report"], ["l'éditorial", "editorial"], ["la chronique", "regular column"], ["la presse écrite", "print press"], ["l'abonnement", "subscription"], ["le démenti", "official denial"], ["l'enquête", "investigation"], ["l'audience", "audience ratings"], ["le correspondant", "correspondent"], ["le fait divers", "minor news item"], ["la rumeur", "rumour"], ["le journal télévisé", "TV news bulletin"]], { tip: "<b>La une</b> is the front page; <b>le titre</b> is the headline. A <b>fait divers</b> is a small local story, like a minor accident." });
  const CURR = BK("Current affairs words", [["le chômage", "unemployment"], ["la grève", "strike"], ["le scrutin", "vote, ballot"], ["la réforme", "reform"], ["l'inflation", "inflation"], ["le pouvoir d'achat", "purchasing power"], ["le développement durable", "sustainable development"], ["le réchauffement climatique", "global warming"], ["la fracture numérique", "digital divide"], ["le télétravail", "remote working"], ["la mondialisation", "globalisation"], ["la manifestation", "demonstration"], ["le logement", "housing"], ["la citoyenneté", "citizenship"], ["le sondage", "opinion poll"]], { tip: "Newspapers love these words. <b>Une grève</b> and <b>une manifestation</b> are not the same: a strike stops work, a demonstration is a march." });
  const BUS = BK("Business words", [["le chiffre d'affaires", "turnover"], ["le bénéfice", "profit"], ["la perte", "loss"], ["le fournisseur", "supplier"], ["la facture", "invoice"], ["le devis", "estimate, quote"], ["la commande", "order"], ["la livraison", "delivery"], ["l'échéance", "due date"], ["le salarié", "employee"], ["le cahier des charges", "specifications"], ["la concurrence", "competition"], ["la PME", "small or medium business"], ["l'actionnaire", "shareholder"], ["les frais", "costs, expenses"]], { tip: "<b>Un devis</b> comes before the order; <b>une facture</b> comes after the delivery." });
  const LIST28 = [
    ["Bonjour, ici Madame Girard de la société Delmas. Je vous rappelle au sujet du devis. Pourriez-vous me renvoyer le document signé avant jeudi midi ?", "What does she ask?", "To return the signed quote before Thursday noon", ["To cancel the order", "To send a new invoice"]],
    ["Notre réunion de demain est reportée à quatorze heures en raison d'un retard de livraison. Merci de confirmer votre présence.", "What is the new time of the meeting?", "2 p.m.", ["12 p.m.", "4 p.m."]],
    ["Vous êtes bien chez Optima Services. Pour joindre le service commercial, tapez un ; pour la comptabilité, tapez deux ; pour le support technique, tapez trois.", "Which key do you press for accounting?", "2", ["1", "3"]],
    ["Monsieur Lefèvre, votre commande est bloquée à la douane. Nous attendons un document supplémentaire. Elle arrivera avec trois jours de retard.", "Why is the order delayed?", "A document is missing at customs", ["The supplier closed", "The address is wrong"]],
    ["Bonjour, je suis candidate au poste d'assistante de direction. Je serais disponible pour un entretien lundi ou mardi matin.", "What job is she applying for?", "Executive assistant", ["Accountant", "Sales manager"]],
    ["Attention : le serveur sera en maintenance ce soir de vingt-deux heures à minuit. Merci d'enregistrer votre travail avant.", "What should employees do?", "Save their work before the maintenance", ["Switch off all phones", "Come in at midnight"]],
    ["Je vous informe que la facture numéro quarante-deux a été payée par virement ce matin.", "How was the invoice paid?", "By bank transfer", ["By cheque", "In cash"]],
    ["Le stand de notre entreprise se trouve au hall B, à côté de l'entrée principale. Nous vous attendons nombreux.", "Where is the company's stand?", "In hall B, near the main entrance", ["In hall A, at the back", "In hall C, upstairs"]]
  ];
  const EN2FR28 = [
    ["I would like to apply for the position.", "Je souhaite postuler au poste.", ["Je voudrais appliquer au poste.", "Je veux faire une application pour le poste."]],
    ["Please find attached the invoice.", "Veuillez trouver ci-joint la facture.", ["Je vous prie trouver attaché la facture.", "Voici attaché la facture, s'il te plaît."]],
    ["He has been living here for ten years.", "Il habite ici depuis dix ans.", ["Il a habité ici pour dix ans.", "Il habite ici pendant dix ans."]],
    ["I actually think he is right.", "En fait, je pense qu'il a raison.", ["Actuellement, je pense qu'il a raison.", "Réellement, je pense qu'il est droit."]],
    ["The meeting was cancelled.", "La réunion a été annulée.", ["La réunion a annulé.", "La réunion était annulé."]],
    ["She asked me to wait.", "Elle m'a demandé d'attendre.", ["Elle m'a demandé à attendre.", "Elle m'a demandé attendre."]],
    ["I look forward to hearing from you.", "J'espère avoir de vos nouvelles bientôt.", ["Je regarde en avant pour vous entendre.", "J'attends vous entendre bientôt."]],
    ["It depends on the weather.", "Cela dépend du temps.", ["Cela dépend au temps.", "Cela est dépendant le temps."]],
    ["We have to make the decision soon.", "Nous devons prendre la décision bientôt.", ["Nous devons faire la décision bientôt.", "Nous avons à prendre décision bientôt."]],
    ["I used to read a lot as a child.", "Je lisais beaucoup quand j'étais enfant.", ["Je lirais beaucoup quand j'étais enfant.", "Je lus beaucoup quand j'étais enfant."]]
  ];
  const FR2EN28 = [
    ["Il a beau essayer, il n'y arrive pas.", "No matter how hard he tries, he does not succeed.", ["He tries nicely, so he succeeds.", "He tried but he was beautiful."]],
    ["Elle a failli tomber.", "She almost fell.", ["She failed to fall.", "She did fall."]],
    ["Je viens de le voir.", "I have just seen him.", ["I am coming to see him.", "I came from his place."]],
    ["Cela fait deux ans que j'étudie le français.", "I have been studying French for two years.", ["I will study French in two years.", "Two years ago I stopped French."]],
    ["Tant qu'à faire, prenons le train.", "If we are doing it anyway, let's take the train.", ["There is so much to do, so we take the train.", "As much as to do, the train is taken."]],
    ["Il s'en est fallu de peu.", "It was a close call.", ["He needed very little.", "It was very small."]],
    ["Elle ne fait que parler.", "She does nothing but talk.", ["She never talks.", "She does not talk at all."]],
    ["Il n'a pas arrêté de pleuvoir.", "It kept on raining.", ["It never rained.", "It stopped raining."]],
    ["Faute de temps, nous avons annulé.", "For lack of time, we cancelled.", ["Without a fault of time, we cancelled.", "On time, we cancelled."]],
    ["J'ai du mal à le croire.", "I find it hard to believe.", ["I have pain believing him.", "I wish to believe it."]]
  ];
  const FORM28 = [
    ["Which sentence is the most formal version of: « Je veux une réponse vite. »?", "Je souhaiterais obtenir une réponse dans les meilleurs délais.", ["Donne-moi ta réponse vite !", "Réponds-moi tout de suite, ok ?"]],
    ["Which sentence is the most formal version of: « On a un problème avec la commande. »?", "Nous rencontrons un problème concernant la commande.", ["Y'a un souci avec la commande.", "Ça coince avec la commande."]],
    ["Which sentence is the most formal version of: « Désolé du retard ! »?", "Nous vous prions de bien vouloir excuser ce retard.", ["Pardon pour le retard, hein !", "Dsl du retard."]],
    ["Which sentence is the most formal version of: « Tu peux m'envoyer le doc ? »?", "Pourriez-vous m'envoyer le document ?", ["Envoie-moi le doc !", "Tu m'envoies le doc, s'il te plaît ?"]],
    ["Which greeting suits a first email to a company director?", "Bonjour Monsieur, comment allez-vous ?", ["Coucou, ça roule ?", "Salut, quoi de neuf ?"]],
    ["Which sentence is the most formal version of: « Je ne suis pas d'accord. »?", "Je me permets de ne pas partager cet avis.", ["Pas du tout, t'as tort.", "Ça marche pas pour moi."]],
    ["Which sentence is the most formal version of: « Merci beaucoup pour tout. »?", "Je vous remercie vivement de votre aide.", ["Merci mille fois, cool !", "Super merci les gars."]],
    ["Which ending suits a formal business email?", "Cordialement,", ["Bises !", "À plus !"]]
  ];
  const CONN = [
    ["Complete: « ___ il soit fatigué, il a continué à travailler. »", "Bien qu'", ["Parce qu'", "Pendant qu'", "Dès qu'"]],
    ["Complete: « Il est compétent ; ___, il manque d'expérience. »", "néanmoins", ["donc", "car", "ainsi"]],
    ["Complete: « Il a raté le train ; ___ il est arrivé en retard. »", "par conséquent", ["néanmoins", "en revanche", "malgré"]],
    ["Complete: « Le premier film est drôle ; ___, le second est triste. »", "en revanche", ["par conséquent", "afin que", "c'est pourquoi"]],
    ["Complete: « ___ la pluie, le match a eu lieu. »", "Malgré", ["Grâce à", "Faute de", "À cause de"]],
    ["Complete: « Il a réussi ___ son travail sérieux. »", "grâce à", ["malgré", "faute de", "au lieu de"]],
    ["Complete: « Elle travaille beaucoup ___ de réussir. »", "afin", ["malgré", "depuis", "bien"]],
    ["Complete: « Nous partirons ___ tu sois prêt. »", "à condition que", ["parce que", "alors que", "tandis que"]],
    ["Complete: « Il n'est pas venu ___ il était malade. »", "car", ["bien que", "afin que", "pour que"]]
  ];
  const TYP28 = [
    ["Type in French: <b>newspaper</b> (un ___)", "journal"], ["Type in French: <b>headline</b> (un ___)", "titre"], ["Type in French: <b>editor-in-chief</b> (le rédacteur en ___)", "chef"],
    ["Type in French: <b>turnover</b> (le chiffre d'___)", "affaires"], ["Type in French: <b>invoice</b> (une ___)", "facture"], ["Type in French: <b>estimate, quote</b> (un ___)", "devis"],
    ["Type in French: <b>supplier</b> (un ___)", "fournisseur"], ["Type in French: <b>strike</b> (une ___)", "grève"], ["Type in French: <b>ballot, vote</b> (un ___)", "scrutin"],
    ["Type in French: <b>irony</b> (l'___)", "ironie"], ["Type in French: <b>metaphor</b> (une ___)", "métaphore"], ["Type in French: <b>surrealism</b> (le ___)", "surréalisme"]
  ];

  const L28 = [
    les("Surrealism and Oulipo", mc(SURR, ["Think of the 20th-century avant-gardes: dream and the unconscious, or play with rules.", "Match each work or technique to its movement, then to its author.", "Example: Apollinaire's « Calligrammes » arranged poems into pictures. Now think about yours."], 2),
      tg("Breaking the rules", "🎨", "The surrealists (Breton, Éluard) explored dreams and the unconscious. The Oulipo group (Queneau, Perec) played with strict constraints.", "écriture automatique<br>« La Disparition » (no e)", "A technique. A famous constraint.", "Surrealism frees the mind; Oulipo frees creativity through rules.")),
    les("Négritude and Caribbean voices", mc(NEG, ["Think of the 1930s in Paris and of poets from the Caribbean and Africa.", "Link each name with an island or country and a key work.", "Example: Frantz Fanon was born in Martinique and became a thinker of decolonisation. Now think about yours."], 2),
      tg("Négritude", "✊", "Three students in Paris, Césaire, Senghor and Damas, created négritude to affirm Black identity and culture.", "Césaire → Martinique<br>Senghor → Sénégal<br>Damas → Guyane", "Three founders.", "Learn each founder with his country and one title.")),
    les("Maghreb writers", mc(MAGH, ["Think of Algeria, Morocco and Tunisia, and of writing in French in the 20th and 21st centuries.", "Match each writer to his or her country and one famous title.", "Example: Mohammed Dib, an Algerian writer, wrote « La Grande Maison » (1952). Now think about yours."], 2),
      tg("Literature of the Maghreb", "🕌", "Many Maghreb writers write in French, creating powerful work about identity, memory and history.", "Camus → Algérie<br>Ben Jelloun → Maroc<br>Memmi → Tunisie", "Three countries.", "Think of one title per author, and the country too.")),
    les("Existentialism and the Nouveau Roman", mc(EXIS, ["Think of France after 1940: philosophy in novels and plays, then experiments with narration.", "Match the work to its author and to its movement: existentialism, absurd or Nouveau Roman.", "Example: Sartre's « Les Mots » (1964) is his autobiography of childhood. Now think about yours."], 2),
      tg("Philosophy meets fiction", "🪑", "Sartre, Beauvoir and Camus put philosophical ideas into novels and plays. Later, the Nouveau Roman rejected old rules of plot and character.", "La Nausée → Sartre<br>Les Gommes → Robbe-Grillet", "Two movements.", "Existentialism: choice and freedom. Absurd: meaning is missing. Nouveau Roman: new narration.")),
    les("Figures of speech", mc(FIG, ["Look at the words: is it an exaggeration, a comparison, a contrast, an image without « comme »?", "Check whether the sentence says less than it means, more than it means, or the opposite of what it means.", "Example: « Il est blanc comme neige » uses the word « comme »: a comparison. Now analyse yours."], 2),
      tg("Named techniques", "🎭", "To comment on a text you must name its figures of speech and say what they do.", "Hyperbole → exaggeration<br>Litote → says less<br>Oxymore → opposites together", "Three figures.", "No « comme » in an image means metaphor; with « comme » it is a comparison.")),
    les("French cinema", mc(CINE, ["Think of the history of cinema in France: pioneers, the Nouvelle Vague and festivals.", "Match each film or director with the era and the movement.", "Example: Claude Lelouch made « Un homme et une femme » (1966). Now think about yours."], 2),
      tg("Le cinéma français", "🎬", "Cinema was invented in France in 1895. In the 1950s-60s the Nouvelle Vague changed how films were made.", "Lumière → 1895<br>Truffaut, Godard → Nouvelle Vague", "A beginning. A revolution.", "Link directors to one film title each.")),
    les("The sounds of French", mc(PHON, ["Think about how the word is said, not only how it is spelled.", "Say each choice quietly. Check the vowel or the consonant sound that the question asks about.", "Example: in « bon » the o is nasal; in « bonne » it is not. Now think about yours."], 2),
      tg("Phonetics", "🗣️", "French spelling and sound differ. Nasal vowels, liaisons and silent letters follow patterns.", "vent /vɑ̃/<br>chat /ʃa/<br>jour /ʒuʁ/", "Three transcriptions.", "Use the phonetic alphabet to see the sound, not the spelling.")),
    les("Reading: newspaper articles", mc(readQ(READ28a), readH, 2), readT("Reading the press", "News articles give the main facts first: who, what, when, why. Then they add reactions and details.", "Find the facts, then the opinions of those quoted. Notice words like <i>toutefois</i> that add a nuance.")),
    les("Reading: poems", mc(readQ(READ28b), readH, 2), readT("Reading poetry", "A poem says a lot in a few words. Notice rhyme, images and the mood.", "Ask who speaks, what is described, and what the images suggest.")),
    les("Media words", vocab(MEDIA), tVocab(MEDIA)),
    les("Current affairs words", vocab(CURR), tVocab(CURR)),
    les("Business words", vocab(BUS), tVocab(BUS)),
    les("Listening-style: business messages", listen(LIST28), lisT),
    les("Translate into French, round 3", mc(EN2FR28.map(([e, a, w]) => [`Which is the best French for: "${e}"`, a, w]), ["Do not translate word by word. Find how French expresses the idea.", "Check the verb, the preposition and the tense. English and French often choose differently.", "Example: « I'm cold » is « J'ai froid », not « Je suis froid ». Now translate yours."], 2),
      tg("Careful translation", "🔄", "Professional translation keeps the meaning, the tone and the register, not just the words.", "I used to read → Je lisais<br>since ten years → depuis dix ans", "Tense and preposition.", "Beware of false friends such as <i>actuellement</i> (currently).")),
    les("Translate into English, round 2", mc(FR2EN28.map(([f, a, w]) => [`What does this French sentence mean? « ${f} »`, a, w]), ["Do not translate word by word. Find the structure first.", "Look for set phrases like <i>avoir beau</i>, <i>faillir</i>, <i>venir de</i> and <i>faute de</i>.", "Example: « Il a failli partir » means He almost left. Now work on yours."], 2),
      tg("Structures to recognize", "🧩", "Some French structures have no word-for-word English match.", "avoir beau → no matter how<br>faillir → almost", "Two structures.", "Learn the structure as a block, not word by word.")),
    les("Formal or casual?", mc(FORM28, ["Think about who you are writing to: a friend or a director?", "Formal French uses full phrases, the conditional and polite verbs.", "Example: « Salut » is casual; « Bonjour Madame » is formal. Now choose yours."], 2),
      tg("Switching registers", "🎩", "In professional French you must choose your register: casual, neutral or formal.", "Tu peux… ? → Pourriez-vous… ?", "Casual to formal.", "Formal French is longer and more polite.")),
    les("Connectors and nuance", mc(CONN, ["Is the idea a contrast, a cause, a consequence or a condition?", "Check the verb after the gap: a subjunctive often follows a concession or condition.", "Example: « Il pleut ; pourtant nous sortons » shows a contrast. Now think about yours."], 2),
      tg("Linking ideas", "🔗", "Connectors show the logic of your ideas: cause, contrast, consequence, aim, condition.", "bien que + subjunctive<br>par conséquent<br>en revanche", "Concession, consequence, contrast.", "Name the logic first, then pick the connector.")),
    les("Type the word", typed(TYP28, "Think about the vocabulary of media, business and literature.", "Example: 'Type in French: <b>verse</b>' would be 'vers'. Now type yours. (Accents are optional.)"), typT)
  ];
  L28.push(MIX("Mixed practice", L28.slice(0, 18), [L28[0], L28[4], L28[11]]));
  L28.push(MIX("Level 28 Challenge", L28.slice(0, 18), [L28[1], L28[9], L28[15]]));

  // =====================================================  LEVEL 29
  const CARIB = [
    ["Which Martinican thinker wrote « Poétique de la Relation » (1990)?", "Édouard Glissant", ["Aimé Césaire", "Frantz Fanon", "Patrick Chamoiseau"]],
    ["Which author won the Goncourt in 1992 for « Texaco »?", "Patrick Chamoiseau", ["Édouard Glissant", "Maryse Condé", "Dany Laferrière"]],
    ["What does « la créolité » celebrate?", "The mixed cultural heritage of the Caribbean", ["The purity of one single origin", "Classical French theatre", "Medieval epic poems"]],
    ["Which Haitian writer wrote « Gouverneurs de la rosée » (1944)?", "Jacques Roumain", ["Dany Laferrière", "Aimé Césaire", "Édouard Glissant"]],
    ["Which Haitian-born writer from Montréal was elected to the Académie française in 2013?", "Dany Laferrière", ["Patrick Chamoiseau", "Maryse Condé", "Jacques Roumain"]],
    ["Which Guadeloupean author wrote « Ségou » and « Moi, Tituba sorcière… »?", "Maryse Condé", ["Simone Schwarz-Bart", "Annie Ernaux", "Leïla Slimani"]],
    ["Which Guadeloupean novelist wrote « Pluie et vent sur Télumée Miracle » (1972)?", "Simone Schwarz-Bart", ["Maryse Condé", "Marguerite Duras", "Colette"]],
    ["What is a créole language?", "A language born from contact between languages, such as French and African languages", ["A strict school variety of standard French", "A written code invented by teachers", "A dead language of ancient Rome"]],
    ["Which city is the capital of Haïti?", "Port-au-Prince", ["Fort-de-France", "Pointe-à-Pitre", "Cayenne"]],
    ["Which city is the main town of Martinique?", "Fort-de-France", ["Port-au-Prince", "Pointe-à-Pitre", "Saint-Denis"]]
  ];
  const WAFR = [
    ["Which Senegalese writer wrote « Une si longue lettre » (1979)?", "Mariama Bâ", ["Léonora Miano", "Maryse Condé", "Assia Djebar"]],
    ["Which Guinean author wrote the autobiographical « L'Enfant noir » (1953)?", "Camara Laye", ["Ahmadou Kourouma", "Ousmane Sembène", "Birago Diop"]],
    ["Which Ivorian novelist wrote « Les Soleils des indépendances » (1968)?", "Ahmadou Kourouma", ["Camara Laye", "Alain Mabanckou", "Léopold Senghor"]],
    ["Which Senegalese writer and filmmaker wrote « Les Bouts de bois de Dieu » (1960)?", "Ousmane Sembène", ["Birago Diop", "Camara Laye", "Alain Mabanckou"]],
    ["Which Malian writer said that when an old person dies in Africa, a library burns?", "Amadou Hampâté Bâ", ["Ahmadou Kourouma", "Léopold Senghor", "Mariama Bâ"]],
    ["Which Senegalese writer collected tales in « Les Contes d'Amadou Koumba » (1947)?", "Birago Diop", ["Ousmane Sembène", "Camara Laye", "Mariama Bâ"]],
    ["Which writer from the Republic of the Congo wrote « Verre Cassé » (2005)?", "Alain Mabanckou", ["Ahmadou Kourouma", "Léonora Miano", "Ousmane Sembène"]],
    ["What is a griot in West African tradition?", "A storyteller who keeps oral history", ["A colonial official", "A kind of drum used at school", "A rhyming pattern"]],
    ["What does « la tradition orale » rely on?", "Spoken stories passed from person to person", ["Printed books only", "Television programmes", "Newspaper articles"]]
  ];
  const BELG = [
    ["Which Belgian author created the detective Inspector Maigret?", "Georges Simenon", ["Hergé", "Amélie Nothomb", "Maurice Maeterlinck"]],
    ["Which Belgian artist (real name Georges Remi) created Tintin?", "Hergé", ["Georges Simenon", "Jacques Brel", "Maurice Maeterlinck"]],
    ["Which Belgian dramatist won the Nobel Prize in 1911 and wrote « L'Oiseau bleu »?", "Maurice Maeterlinck", ["Georges Simenon", "Hergé", "Émile Verhaeren"]],
    ["Which Belgian novelist wrote « Stupeur et tremblements »?", "Amélie Nothomb", ["Annie Ernaux", "Leïla Slimani", "Marguerite Yourcenar"]],
    ["Which Belgian singer-songwriter performed « Ne me quitte pas »?", "Jacques Brel", ["Georges Brassens", "Charles Aznavour", "Édith Piaf"]],
    ["Which Swiss-born writer wrote « La Prose du Transsibérien »?", "Blaise Cendrars", ["Charles-Ferdinand Ramuz", "Georges Simenon", "Hergé"]],
    ["Which Swiss writer from Vaud wrote « La Grande Peur dans la montagne »?", "Charles-Ferdinand Ramuz", ["Blaise Cendrars", "Maurice Maeterlinck", "Georges Simenon"]],
    ["How many national languages does Switzerland have?", "Four", ["Two", "Three", "Five"]],
    ["Which southern region of Belgium is mainly French-speaking?", "la Wallonie", ["la Flandre", "la Savoie", "l'Alsace"]],
    ["Which word do many Belgians and Swiss use instead of « soixante-dix »?", "septante", ["huitante", "vingt-dix", "cinquante-dix"]]
  ];
  const SOC = BK("Sociolinguistics words", [["la diglossie", "two varieties with different status"], ["le bilinguisme", "use of two languages"], ["le sociolecte", "speech of a social group"], ["l'idiolecte", "one person's own speech style"], ["le registre", "level of formality"], ["la norme", "accepted standard"], ["le locuteur", "speaker"], ["l'alternance codique", "code-switching"], ["la langue maternelle", "mother tongue"], ["le patois", "local speech"], ["l'argot", "slang"], ["le jargon", "specialist vocabulary"], ["la langue minoritaire", "minority language"], ["la variation", "variation"]], { tip: "<b>Un idiolecte</b> is individual; <b>un sociolecte</b> is shared by a social group. <b>L'alternance codique</b> means switching between languages in one conversation." });
  const WF = BK("Word formation", [["le préfixe", "prefix"], ["le suffixe", "suffix"], ["la dérivation", "adding prefixes or suffixes"], ["la composition", "joining two words"], ["la troncation", "shortening a word"], ["le sigle", "initials, like SNCF"], ["l'acronyme", "initials said as a word"], ["l'apocope", "cutting the end of a word"], ["l'aphérèse", "cutting the start of a word"], ["le mot-valise", "portmanteau word"], ["la racine", "root"], ["la base", "base word"], ["la lexicalisation", "turning a phrase into a word"]], { tip: "<b>Prof</b> from <i>professeur</i> is an apocope. <b>Bus</b> from <i>autobus</i> is an aphérèse. <b>Franglais</b> is a mot-valise." });
  const VERL = [
    ["Verlan flips syllables. What is the standard French behind « meuf »?", "femme", ["fille", "mère", "veuve"]],
    ["What is the standard French behind the verlan « ouf »?", "fou", ["fort", "faux", "fin"]],
    ["What is the standard French behind the verlan « relou »?", "lourd", ["lent", "long", "loup"]],
    ["What is the standard French behind the verlan « chelou »?", "louche", ["lourd", "lent", "long"]],
    ["What is the standard French behind the verlan « zarbi »?", "bizarre", ["barbare", "brave", "bazar"]],
    ["What is the standard French behind the verlan « teuf »?", "fête", ["feu", "tête", "fée"]],
    ["What is the standard French behind the verlan « féca »?", "café", ["facile", "façade", "faucon"]],
    ["What is the standard French behind the verlan « vénère »?", "énervé", ["vénérable", "vendu", "vert"]],
    ["What is the standard French behind the verlan « cimer »?", "merci", ["mercredi", "ciment", "mercure"]],
    ["What does the verlan « à donf » stand for?", "à fond", ["à dos", "à don", "à fait"]]
  ];
  const POL = [
    ["Which sentence turns an order into a polite request?", "Pourriez-vous fermer la fenêtre ?", ["Ferme la fenêtre !", "Fermez la fenêtre tout de suite !"]],
    ["Which sentence softens a refusal?", "Malheureusement, je ne pourrai pas venir.", ["Non.", "Je ne viendrai pas, c'est tout."]],
    ["Which phrase politely interrupts someone?", "Excusez-moi de vous interrompre, mais…", ["Tais-toi !", "Ça suffit !"]],
    ["What is the best reply to « Merci beaucoup » in a formal setting?", "Je vous en prie.", ["Ouais, ouais.", "Pas de quoi, mec."]],
    ["Which phrase asks someone politely to repeat?", "Pardon, pourriez-vous répéter ?", ["Quoi ?", "Hein ?"]],
    ["Why use « Je voudrais » instead of « Je veux »?", "It sounds more polite", ["It is a past tense", "It sounds ruder", "It changes the meaning to the future"]],
    ["Which closing suits a letter to a professor you do not know?", "Veuillez agréer, Monsieur, l'expression de mes salutations distinguées.", ["Bises !", "À plus !"]],
    ["Which opening suits a letter to an unknown reader?", "Madame, Monsieur,", ["Salut tout le monde,", "Mon cher ami,"]],
    ["Which sentence shows more respect in a meeting?", "Auriez-vous l'amabilité de répéter votre question ?", ["Répète ta question !", "Tu dis quoi ?"]]
  ];
  const DISC = [
    ["In casual speech, what does « du coup » mean?", "so, as a result", ["although", "never", "in the past"]],
    ["What does « bref » do in a story?", "It sums up: in short", ["It asks a question", "It starts a quarrel", "It adds a long detail"]],
    ["What does « en fait » signal?", "A correction or the real situation: actually", ["The time: at present", "A question", "A wish"]],
    ["What does « tu vois » at the end of a sentence do?", "It seeks the listener's agreement", ["It ends the conversation", "It gives an order", "It names a place"]],
    ["What does « enfin » do in: « Il est gentil, enfin, il essaie de l'être »?", "It corrects or softens what was said", ["It gives the date", "It adds a new topic", "It asks a favor"]],
    ["What is the role of « quoi » at the end of a spoken sentence?", "A filler that adds emphasis", ["A question about time", "A past tense marker", "A sign of respect"]],
    ["What does « voilà » often signal at the end of an explanation?", "That is it, that is all", ["Let us start again", "I do not know", "Do you agree?"]],
    ["What does « genre » mean in: « C'était, genre, énorme »?", "like, sort of", ["gender", "never", "because"]],
    ["What function does « bon » have at the start of a speech turn?", "It marks a transition or a move on", ["It ends all discussion", "It means good news only", "It signals a question"]]
  ];
  const READ29a = [
    { t: "Certains affirment que la lecture sur écran appauvrit la concentration. Or, les études montrent que ce n'est pas le support qui compte, mais l'attention que le lecteur y consacre. Il serait donc exagéré de condamner le numérique ; mieux vaut apprendre à l'utiliser.", qs: [
      ["What is the author's position?", "Screens are not the problem in themselves", ["Screens ruin reading completely", "Paper should be banned"]],
      ["The word « Or » introduces…", "a counter-argument", ["an example", "a date"]],
      ["What does the author finally recommend?", "Learning to use digital tools well", ["Avoiding all screens", "Reading only once a week"]]] },
    { t: "Les villes ne doivent pas seulement être efficaces ; elles doivent aussi être agréables à vivre. Les espaces verts, par exemple, réduisent le stress et favorisent les rencontres. Pourtant, ils disparaissent souvent au profit de parkings.", qs: [
      ["What is the main claim?", "Cities should be pleasant, not only efficient", ["Cities should have no cars at all", "Cities should be smaller"]],
      ["Which example does the author give?", "Green spaces", ["Museums", "Shopping centres"]],
      ["« Pourtant » shows…", "a gap between the ideal and reality", ["a cause", "an addition"]]] },
    { t: "Les puristes redoutent que les mots anglais n'appauvrissent le français. Mais l'histoire montre que la langue s'est toujours nourrie d'emprunts : le français lui-même a beaucoup pris à l'italien et à l'arabe. Une langue vivante change, et c'est signe de santé.", qs: [
      ["What do the purists fear?", "That English words weaken French", ["That nobody learns Latin", "That French will become too formal"]],
      ["What historical argument is given?", "French has always borrowed words", ["French never changed", "English comes from French only"]],
      ["What is the author's conclusion?", "Change shows a language is healthy", ["Change must be stopped", "Only Latin is correct"]]] }
  ];
  const READ29b = [
    { t: "Quand Inès arriva à la gare, le train venait de partir. Elle regarda le quai vide, puis son billet froissé dans sa main. Elle éclata de rire : c'était la troisième fois cette année. Au fond, elle se demandait si elle ne le faisait pas exprès.", qs: [
      ["What happened to Inès?", "She missed her train", ["She lost her ticket", "She arrived early"]],
      ["How did she react?", "She laughed", ["She cried", "She shouted at someone"]],
      ["« ne le faisait pas exprès » suggests that…", "she may secretly not want to leave", ["she is always on time", "she hates trains"]]] },
    { t: "Le vieux phare ne servait plus à personne, mais Gaspard continuait de l'entretenir. Chaque soir, il montait les cent douze marches, allumait la lampe et attendait. Il ne savait pas pour qui il le faisait, sinon pour la mer.", qs: [
      ["Why does Gaspard keep the lighthouse running?", "Out of habit and attachment, though it is useless", ["Because ships need it", "Because he is paid well"]],
      ["How many steps does he climb?", "112", ["12", "102"]],
      ["What is the tone of the passage?", "gentle and a little melancholic", ["comic and noisy", "angry"]]] },
    { t: "— Tu viens ? demanda Hugo à sa sœur.<br>— Je ne sais pas encore.<br>— Il va pleuvoir. Alors prends mon parapluie, ajouta-t-il.", qs: [
      ["What does Hugo offer?", "His umbrella", ["His coat", "A taxi"]],
      ["How does his sister feel?", "Undecided", ["Furious", "Very excited"]],
      ["Why does Hugo mention the rain?", "To make her ready or to help her decide", ["To cancel the trip", "To change the subject"]]] }
  ];
  const READ29c = [
    { t: "Madame, Monsieur, suite à notre entretien du 12 mars, j'ai le plaisir de vous confirmer mon intérêt pour le poste de chef de projet. Je reste à votre disposition pour tout renseignement complémentaire. Dans l'attente de votre réponse, je vous prie d'agréer, Madame, Monsieur, mes salutations distinguées.", qs: [
      ["What is the purpose of this message?", "To confirm interest in a job after an interview", ["To cancel an application", "To complain about a delay"]],
      ["« Dans l'attente de votre réponse » means…", "while waiting for your answer", ["in answer to your wait", "I am not waiting"]],
      ["When was the interview?", "12 March", ["12 May", "2 March"]]] },
    { t: "Chers collaborateurs, à compter du 1er septembre, le télétravail sera possible deux jours par semaine, sous réserve de l'accord du responsable d'équipe. Les modalités seront précisées dans une note ultérieure.", qs: [
      ["How many days of remote work will be possible?", "Two days a week", ["Five days a week", "One day a month"]],
      ["What is the condition?", "The team manager must agree", ["The employee must live nearby", "The company must move"]],
      ["« à compter du 1er septembre » means…", "starting from 1 September", ["until 1 September", "before 1 September"]]] },
    { t: "Notre chiffre d'affaires a progressé de huit pour cent au dernier trimestre, mais nos frais ont augmenté plus vite. Le bénéfice est donc en baisse. Nous devons réduire nos coûts sans sacrifier la qualité.", qs: [
      ["What happened to turnover?", "It rose by 8 percent", ["It fell by 8 percent", "It stayed the same"]],
      ["What happened to profit?", "It fell", ["It rose", "It doubled"]],
      ["What does the company want to do?", "Cut costs while keeping quality", ["Raise prices only", "Stop selling"]]] }
  ];
  const LIST29a = [
    ["Chers auditeurs, la circulation est très dense sur l'autoroute du sud à cause d'un accident près de la sortie douze. Prévoyez trente minutes de retard.", "Why is the traffic heavy?", "There was an accident", ["Road works", "A football match"]],
    ["Et maintenant, la météo : de la pluie sur tout le nord du pays, avec des températures en baisse. Le soleil reviendra dimanche.", "When will the sun return?", "Sunday", ["Saturday", "Monday"]],
    ["Le musée d'art moderne propose une exposition gratuite chaque premier dimanche du mois.", "When is the exhibition free?", "On the first Sunday of each month", ["Every Sunday", "On the last day of the month"]],
    ["Les résultats du concours seront publiés vendredi sur le site de l'université. Les candidats admis devront s'inscrire avant le trente juin.", "When must successful candidates register?", "Before 30 June", ["After 30 June", "Before Friday"]],
    ["Cette émission est présentée par Claire Morel. Aujourd'hui, nous recevons une romancière pour son nouveau livre sur la vie au bord de la mer.", "Who is today's guest?", "A novelist", ["A doctor", "A politician"]],
    ["Le festival de musique aura lieu du douze au quatorze juillet. Les billets sont en vente dès demain matin.", "When do tickets go on sale?", "Tomorrow morning", ["On 12 July", "Today at noon"]],
    ["Une grève des transports est prévue jeudi. Un train sur deux seulement circulera.", "How many trains will run?", "One in two", ["All of them", "One in ten"]],
    ["Nous vous rappelons que la bibliothèque municipale fermera exceptionnellement à seize heures samedi.", "When will the library close on Saturday?", "At 4 p.m.", ["At 6 p.m.", "At noon"]]
  ];
  const LIST29b = [
    ["— Pourquoi avez-vous choisi d'étudier la linguistique ? — Par curiosité. J'ai toujours été fasciné par la façon dont les langues changent.", "Why did he choose linguistics?", "He is fascinated by how languages change", ["It was his parents' idea", "He wanted a high salary"]],
    ["— Vous travaillez dans l'édition depuis longtemps ? — Quinze ans. J'ai commencé comme correctrice.", "How did she begin her career?", "As a proofreader", ["As an editor-in-chief", "As a translator"]],
    ["— Que pensez-vous du télétravail ? — C'est pratique, mais on perd le contact avec les collègues.", "What is the speaker's opinion?", "Practical but isolating", ["Completely useless", "Perfect in every way"]],
    ["— Où passez-vous vos vacances ? — D'habitude en Bretagne, mais cette année nous irons au Québec.", "Where will they go this year?", "Quebec", ["Brittany", "Switzerland"]],
    ["— Le rendez-vous est à quelle heure ? — À dix heures et quart, devant la gare.", "What time is the appointment?", "10:15", ["10:45", "9:15"]],
    ["— Tu as lu le roman dont on parle tant ? — Pas encore, mais la critique est excellente.", "What does the speaker say?", "Not read yet, but reviews are excellent", ["Read it and hated it", "Never heard of it"]],
    ["— Combien coûte l'abonnement ? — Neuf euros par mois, et le premier mois est gratuit.", "What is free?", "The first month", ["The last month", "The whole year"]],
    ["— Désolée, je n'ai pas pu venir, ma voiture est tombée en panne. — Ce n'est pas grave, nous avons commencé sans vous.", "Why was she absent?", "Her car broke down", ["She was ill", "She forgot"]]
  ];
  const BUS2 = BK("Work and money words", [["l'embauche", "hiring"], ["le licenciement", "dismissal"], ["l'entretien d'embauche", "job interview"], ["le CDI", "permanent contract"], ["le CDD", "fixed-term contract"], ["le salaire", "salary"], ["la prime", "bonus"], ["le congé", "leave, holiday"], ["la retraite", "retirement"], ["l'investissement", "investment"], ["l'emprunt", "loan"], ["la dette", "debt"], ["l'impôt", "tax"], ["la TVA", "value-added tax"]], { tip: "<b>CDI</b> = contrat à durée indéterminée (no end date); <b>CDD</b> = contrat à durée déterminée (fixed end date)." });
  const CV = [
    ["What is « une lettre de motivation »?", "A cover letter explaining why you want the job", ["A reference letter from a friend", "A complaint letter"]],
    ["On a CV, which heading lists your schools and diplomas?", "Formation", ["Expérience professionnelle", "Centres d'intérêt"]],
    ["On a CV, which heading lists your past jobs?", "Expérience professionnelle", ["Formation", "Compétences"]],
    ["On a CV, which heading lists your hobbies?", "Centres d'intérêt", ["Formation", "Références"]],
    ["On a CV, which heading lists what you can do (languages, software…)?", "Compétences", ["Centres d'intérêt", "Coordonnées"]],
    ["What does « Coordonnées » contain on a CV?", "Name, address, phone and email", ["Your previous salary", "The names of your teachers"]],
    ["What does « pièces jointes » mean in an email?", "attachments", ["spare parts", "greetings"]],
    ["What does « ci-joint » mean?", "enclosed, attached", ["below the line", "as soon as possible"]],
    ["What is « un poste à pourvoir »?", "A job vacancy", ["A post office", "A work contract"]],
    ["What does « Je me tiens à votre disposition pour un entretien » mean?", "I am available for an interview", ["I am leaving the company", "I will interview you"]]
  ];
  const MEET = [
    ["à l'ordre du jour", "on the agenda"], ["prendre la parole", "to speak, take the floor"], ["mettre aux voix", "to put to a vote"], ["faire le point", "to review the situation"],
    ["un compte rendu", "minutes, written report"], ["lever la séance", "to close the meeting"], ["un tour de table", "round of comments from everyone"], ["parvenir à un accord", "to reach an agreement"],
    ["conclure un marché", "to seal a deal"], ["une contre-proposition", "a counter-offer"], ["rester sur ses positions", "to stick to one's position"], ["trouver un compromis", "to find a middle ground"]
  ];
  const EN2FR29 = [
    ["I would like to make an appointment.", "Je voudrais prendre rendez-vous.", ["Je voudrais faire un appointement.", "Je veux donner un rendez-vous."]],
    ["The company is hiring.", "L'entreprise recrute.", ["L'entreprise licencie.", "L'entreprise rejette."]],
    ["He gave up smoking.", "Il a arrêté de fumer.", ["Il a donné de fumer.", "Il a abandonné fumer."]],
    ["It is worth reading.", "Cela vaut la peine d'être lu.", ["Cela est valeur de lire.", "Cela vaut lire."]],
    ["The more I read, the more I understand.", "Plus je lis, plus je comprends.", ["Le plus je lis, le plus je comprends.", "Plus je lis, plus comprenant."]],
    ["Despite the delay, the show went on.", "Malgré le retard, le spectacle a continué.", ["Bien que le retard, le spectacle a continué.", "Pendant le retard, le spectacle a continué."]],
    ["I wish I had known.", "J'aurais aimé le savoir.", ["J'ai souhaité savoir.", "Je souhaitais je savais."]],
    ["I have not seen her for a month.", "Je ne l'ai pas vue depuis un mois.", ["Je ne l'ai pas vu depuis un mois.", "Je ne la vois pas pour un mois."]],
    ["He takes care of the project.", "Il s'occupe du projet.", ["Il prend soin le projet.", "Il s'occupe le projet."]]
  ];
  const FR2EN29 = [
    ["Il me tarde de vous revoir.", "I can't wait to see you again.", ["It is late for me to see you.", "I am late to see you again."]],
    ["Je n'ai pas pu m'empêcher de rire.", "I couldn't help laughing.", ["I was prevented from laughing.", "I was not able to laugh."]],
    ["Elle a fini par accepter.", "She ended up accepting.", ["She finally refused.", "She was finished accepting."]],
    ["Il y va de ton avenir.", "Your future is at stake.", ["He is going to your future.", "Your future is going away."]],
    ["Je me suis fait avoir.", "I was fooled.", ["I had myself.", "I made myself have it."]],
    ["On ne peut pas tout avoir.", "You can't have everything.", ["One cannot do anything.", "We cannot all have it."]],
    ["Quoi qu'il arrive, je serai là.", "Whatever happens, I will be there.", ["What he arrives, I will be there.", "Because it happens, I will be there."]],
    ["Il s'agit d'un roman policier.", "It is a detective novel.", ["He acts in a police novel.", "It acts as a police novel."]],
    ["Il est temps que tu partes.", "It is time for you to leave.", ["It is the time you left earlier.", "He is on time to leave."]]
  ];

  const L29 = [
    les("The Caribbean: créolité and Relation", mc(CARIB, ["Think of Martinique, Guadeloupe and Haïti, and of writers who mix French and Creole.", "Match the writer to an island and to a title or idea.", "Example: Raphaël Confiant co-signed « Éloge de la créolité » (1989). Now think about yours."], 2),
      tg("Antillean voices", "🌴", "After négritude, Glissant and Chamoiseau stressed mixing: créolité and Relation.", "Glissant → Relation<br>Chamoiseau → Texaco", "Two Martinican writers.", "Link each author to an island.")),
    les("Writers of West and Central Africa", mc(WAFR, ["Think of Senegal, Guinea, Mali, Côte d'Ivoire and Congo, and of novels, tales and oral tradition.", "Match each title to its writer and country.", "Example: Cheikh Hamidou Kane wrote « L'Aventure ambiguë » (1961). Now think about yours."], 2),
      tg("African voices in French", "🌍", "African writers use French to tell stories about tradition, colonisation, family and independence.", "Camara Laye → L'Enfant noir<br>Kourouma → Les Soleils des indépendances", "Two novels.", "Remember writer, country and one title.")),
    les("Belgium and Switzerland", mc(BELG, ["Think of Brussels, Wallonia, Geneva and the Swiss cantons where French is spoken.", "Match the name to Belgium or Switzerland and to the genre.", "Example: Georges Rodenbach, a Belgian poet, wrote « Bruges-la-Morte » (1892). Now think about yours."], 2),
      tg("Francophone neighbours", "🏔️", "Belgium and Switzerland are French-speaking in part, with their own writers and words.", "Simenon, Hergé → Belgique<br>Ramuz, Cendrars → Suisse", "Writers.", "Septante and nonante are standard in Belgium and Switzerland.")),
    les("Sociolinguistics words", vocab(SOC), tVocab(SOC)),
    les("Word formation", vocab(WF), tVocab(WF)),
    les("Verlan and slang", mc(VERL, ["Verlan reverses syllables. Say the word backwards in your head.", "Split the verlan word in syllables and swap them to find the original.", "Example: « louche » turned around gives « chelou ». Now do yours."], 2),
      tg("Flipping syllables", "🔁", "Verlan is a playful way of speaking that reverses syllables. Some verlan words are now common.", "bizarre → zarbi<br>fête → teuf", "Two examples.", "Say the word in syllables, then swap them.")),
    les("Politeness in French", mc(POL, ["Think about the person you are speaking to and how to show respect.", "Polite French often uses the conditional, <i>vous</i> and softening phrases.", "Example: « Pourriez-vous m'aider ? » is polite; « Aide-moi ! » is not. Now choose yours."], 2),
      tg("Being polite", "🙏", "Polite French uses the conditional, <i>vous</i> and set phrases.", "Je voudrais…<br>Excusez-moi de…<br>Je vous en prie.", "Polite formulas.", "A softer verb form makes a request more respectful.")),
    les("Spoken French: discourse markers", mc(DISC, ["Discourse markers are small words that organise speech more than carry meaning.", "Think about their role: correcting, concluding, seeking agreement or moving on.", "Example: « Bon, alors… » begins a new part of the conversation. Now think about yours."], 2),
      tg("Little words, big role", "💬", "In speech, words like <i>bon</i>, <i>ben</i>, <i>quoi</i> and <i>du coup</i> structure the conversation.", "du coup → so<br>en fait → actually", "Two markers.", "They are common in speech but not in formal writing.")),
    les("Reading: arguments", mc(readQ(READ29a), readH, 2), readT("Reading an argument", "Essays state a claim, give reasons and an example, then conclude.", "Mark the connectors (<i>or</i>, <i>pourtant</i>, <i>donc</i>) to follow the argument.")),
    les("Reading: short stories", mc(readQ(READ29b), readH, 2), readT("Reading fiction", "Short stories hide feelings in actions. Read between the lines.", "Ask what a character does, what that suggests, and what the last line adds.")),
    les("Reading: professional texts", mc(readQ(READ29c), readH, 2), readT("Reading at work", "Letters, notes and reports follow set formulas.", "Find the purpose, the figures and the dates first.")),
    les("Listening-style: radio", listen(LIST29a), lisT),
    les("Listening-style: conversations", listen(LIST29b), lisT),
    les("Work and money words", vocab(BUS2), tVocab(BUS2)),
    les("CV and cover letter", mc(CV, ["Think about the layout of a French CV and the formulas in a formal letter.", "Match the heading or phrase to what follows it.", "Example: « Langues » lists the languages you speak. Now think about yours."], 2),
      tg("Applying for a job", "📄", "A French CV has standard headings, and a lettre de motivation uses formal formulas.", "Formation<br>Expérience professionnelle<br>Compétences", "Three headings.", "Keep your CV clear and your letter formal.")),
    les("Meetings and negotiations", pq(MEET, a => `What does « ${a} » mean?`, ["Think of a meeting at work: agenda, discussion, vote, minutes.", "Look at each verb or noun: who speaks, who decides, who writes?", "Example: « fixer un rendez-vous » means to set up a meeting. Now think about yours."]),
      tg("In the meeting room", "🏢", "Meetings have an agenda, discussion, decisions and minutes. French has set phrases for each stage.", "à l'ordre du jour<br>un compte rendu", "Two phrases.", "Learn the phrases as blocks.")),
    les("Translate into French, round 4", mc(EN2FR29.map(([e, a, w]) => [`Which is the best French for: "${e}"`, a, w]), ["Do not translate word by word. Find how French expresses the idea.", "Check the verb, the preposition and the agreement.", "Example: « I'm afraid of dogs » is « J'ai peur des chiens ». Now translate yours."], 2),
      tg("Translating accurately", "🔄", "Watch word order, prepositions and agreement of the participle.", "Plus… plus…<br>depuis + present", "Two structures.", "Check that the French sounds natural to a native speaker.")),
    les("Translate into English, round 3", mc(FR2EN29.map(([f, a, w]) => [`What does this French sentence mean? « ${f} »`, a, w]), ["Find the structure first, then the words.", "Watch small expressions: <i>il me tarde</i>, <i>finir par</i>, <i>il s'agit de</i>.", "Example: « Il s'agit de ta santé » means It is about your health. Now work on yours."], 2),
      tg("Natural English", "🧩", "Good translation uses the natural English phrase, not a word-for-word copy.", "finir par → end up<br>il s'agit de → it's about", "Two structures.", "Read the English aloud: does it sound natural?"))
  ];
  L29.push(MIX("Mixed practice", L29.slice(0, 18), [L29[0], L29[5], L29[15]]));
  L29.push(MIX("Level 29 Challenge", L29.slice(0, 18), [L29[2], L29[8], L29[16]]));

  // =====================================================  LEVEL 30
  const THINK = [
    ["Who wrote « Mythologies » (1957), analysing the myths hidden in everyday life?", "Roland Barthes", ["Michel Foucault", "Claude Lévi-Strauss", "Pierre Bourdieu"]],
    ["Who wrote « Surveiller et punir » (1975), about power and prisons?", "Michel Foucault", ["Roland Barthes", "Jacques Derrida", "Pierre Bourdieu"]],
    ["Which sociologist wrote « La Distinction » (1979)?", "Pierre Bourdieu", ["Michel Foucault", "Claude Lévi-Strauss", "Guy Debord"]],
    ["Which anthropologist wrote « Tristes Tropiques » (1955)?", "Claude Lévi-Strauss", ["Pierre Bourdieu", "Roland Barthes", "Jacques Derrida"]],
    ["Which philosopher is linked to « déconstruction » and wrote « De la grammatologie » (1967)?", "Jacques Derrida", ["Michel Foucault", "Roland Barthes", "Jean-Paul Sartre"]],
    ["Who wrote « L'Être et le néant » (1943)?", "Jean-Paul Sartre", ["Albert Camus", "Simone de Beauvoir", "Maurice Merleau-Ponty"]],
    ["Which sociologist developed the idea of « habitus »?", "Pierre Bourdieu", ["Roland Barthes", "Guy Debord", "Michel Foucault"]],
    ["Who wrote « La Société du spectacle » (1967)?", "Guy Debord", ["Pierre Bourdieu", "Roland Barthes", "Albert Camus"]],
    ["Which thinker wrote « Les Mots et les Choses » (1966)?", "Michel Foucault", ["Jacques Derrida", "Roland Barthes", "Claude Lévi-Strauss"]],
    ["Which author wrote « L'Homme révolté » (1951)?", "Albert Camus", ["Jean-Paul Sartre", "Simone de Beauvoir", "Roland Barthes"]]
  ];
  const SAUS = BK("Saussure's vocabulary", [["le signe", "sign"], ["le signifiant", "sound or form of a sign"], ["le signifié", "concept the sign stands for"], ["la langue", "the language system"], ["la parole", "individual act of speaking"], ["la synchronie", "language at one moment"], ["la diachronie", "language through time"], ["l'arbitraire du signe", "no natural link between sound and meaning"], ["le syntagme", "group of words forming a unit"], ["le paradigme", "set of interchangeable elements"], ["la valeur", "meaning defined by contrast with others"], ["le structuralisme", "view of language as a system"]], { tip: "Ferdinand de Saussure, a Swiss linguist, taught that a sign is a <b>signifiant</b> (form) plus a <b>signifié</b> (meaning). His « Cours de linguistique générale » appeared in 1916, after his death." });
  const POLI = [
    ["Which international organisation groups French-speaking states and governments?", "l'Organisation internationale de la Francophonie", ["l'Union européenne", "l'UNESCO", "l'OTAN"]],
    ["Which 1994 law requires the use of French in advertising, workplaces and public information?", "la loi Toubon", ["la loi Veil", "la loi 101", "la loi Taubira"]],
    ["Which 1977 law made French the official language of Québec?", "la Charte de la langue française (loi 101)", ["la loi Toubon", "l'ordonnance de Villers-Cotterêts", "la loi Falloux"]],
    ["Which TV channel broadcasts French-language programmes around the world?", "TV5Monde", ["Arte", "Eurosport", "Canal Plus"]],
    ["Which institution, created in 1635, watches over the French language and publishes a dictionary?", "l'Académie française", ["l'Alliance française", "l'Institut Pasteur", "le Collège de France"]],
    ["Which network, founded in 1883, promotes French teaching and culture abroad?", "l'Alliance française", ["l'Académie française", "la Sorbonne", "l'Institut français du pétrole"]],
    ["On which date is the International Day of the Francophonie celebrated?", "20 mars", ["14 juillet", "1er janvier", "21 juin"]],
    ["Which exams certify French as a foreign language?", "le DELF et le DALF", ["le baccalauréat", "le CAPES", "le Goncourt"]],
    ["Which word was recommended officially for « e-mail » in French?", "courriel", ["pourriel", "clavardage", "télécarte"]],
    ["Which Québec term designates spam?", "pourriel", ["courriel", "clavardage", "baladodiffusion"]]
  ];
  const NOB = [
    ["Which author, born in Algeria, received the Nobel Prize in Literature in 1957?", "Albert Camus", ["Jean-Paul Sartre", "André Gide", "François Mauriac"]],
    ["Which French writer received the Nobel Prize in 2014?", "Patrick Modiano", ["Annie Ernaux", "J. M. G. Le Clézio", "Albert Camus"]],
    ["Which French writer received the Nobel Prize in 2008?", "J. M. G. Le Clézio", ["Patrick Modiano", "Claude Simon", "Annie Ernaux"]],
    ["Which French writer received the Nobel Prize in 2022?", "Annie Ernaux", ["Marguerite Duras", "Amélie Nothomb", "Leïla Slimani"]],
    ["Which French philosopher and writer declined the Nobel Prize in 1964?", "Jean-Paul Sartre", ["Albert Camus", "André Malraux", "André Gide"]],
    ["Which poet-diplomat received the Nobel Prize in 1960?", "Saint-John Perse", ["Paul Valéry", "Paul Claudel", "Louis Aragon"]],
    ["Which French writer of the Nouveau Roman received the Nobel Prize in 1985?", "Claude Simon", ["Alain Robbe-Grillet", "Michel Butor", "Nathalie Sarraute"]],
    ["Who won the very first Nobel Prize in Literature, in 1901?", "Sully Prudhomme", ["Victor Hugo", "Émile Zola", "Anatole France"]],
    ["Which novelist wrote « La Place » and « Les Années »?", "Annie Ernaux", ["Patrick Modiano", "Colette", "Marguerite Yourcenar"]],
    ["Which novelist wrote « Rue des boutiques obscures » (Goncourt 1978)?", "Patrick Modiano", ["J. M. G. Le Clézio", "Albert Camus", "Claude Simon"]]
  ];
  const PRIZE = [
    ["Which prize is awarded each autumn by the Académie Goncourt for the best prose of the year?", "le prix Goncourt", ["le prix Nobel", "le prix Renaudot", "le César"]],
    ["Which prize is traditionally announced on the same day as the Goncourt, by a jury of critics?", "le prix Renaudot", ["le prix Femina", "le prix Médicis", "le prix Interallié"]],
    ["Which prize, created in 1904, is awarded by a jury of women?", "le prix Femina", ["le prix Renaudot", "le prix Goncourt", "le prix Médicis"]],
    ["Which prize rewards new, bold or experimental writing?", "le prix Médicis", ["le prix Femina", "le prix Goncourt", "le prix Interallié"]],
    ["Which prize is chosen by high-school students?", "le Goncourt des lycéens", ["le prix Médicis", "le prix Renaudot", "le César"]],
    ["Who created the Goncourt prize in his will?", "Edmond de Goncourt", ["Jules Verne", "Émile Zola", "Alfred Nobel"]],
    ["Which writer won the Goncourt in 1919 for « À l'ombre des jeunes filles en fleurs »?", "Marcel Proust", ["André Gide", "Colette", "Paul Valéry"]],
    ["Which writer won the Goncourt twice, once under the name Émile Ajar?", "Romain Gary", ["Albert Camus", "Marcel Proust", "Patrick Modiano"]],
    ["Which prize for journalists-turned-novelists has the name of a meeting place?", "le prix Interallié", ["le prix Femina", "le prix Médicis", "le Goncourt"]]
  ];
  const DIS = BK("Essay-writing words", [["l'accroche", "opening hook"], ["la problématique", "central question"], ["la thèse", "position defended"], ["l'antithèse", "opposite position"], ["la synthèse", "reconciling conclusion"], ["le plan", "outline"], ["l'argument", "argument"], ["l'exemple", "example"], ["la transition", "link between parts"], ["le développement", "main body"], ["l'annonce du plan", "announcing the outline"], ["la dissertation", "structured school essay"], ["le sujet", "essay question"], ["le paragraphe", "paragraph"]], { tip: "A good dissertation: <b>introduction</b> (accroche, problématique, annonce du plan), <b>développement</b> (thèse, antithèse, synthèse), <b>conclusion</b>." });
  const SUM = [
    ["What must a « résumé de texte » do?", "Reformulate the main ideas in fewer words", ["Copy the best sentences", "Add your own opinion", "Translate the text"]],
    ["What should you NOT include in a text summary?", "Your personal opinion", ["The author's main idea", "The text's logical order", "A shorter version of the argument"]],
    ["What is « une synthèse de documents »?", "A single text that compares several documents on one theme", ["A translation of one document", "A copy of the longest document", "A list of titles"]],
    ["Which verb best introduces a warning in a summary?", "mettre en garde", ["féliciter", "plaisanter", "énumérer"]],
    ["What does « reformuler » mean?", "To say again in different words", ["To repeat word for word", "To delete", "To translate into English"]],
    ["What does « citer » mean?", "To quote exact words, in quotation marks", ["To summarize without quotes", "To invent a source", "To change a text"]],
    ["What does « la thèse de l'auteur » refer to?", "The main position he defends", ["His age", "The title of the book", "The number of pages"]],
    ["Which connector adds an idea in a summary?", "de plus", ["cependant", "donc", "malgré"]],
    ["Which verb reports an author's stress on something?", "souligner", ["oublier", "gommer", "ignorer"]]
  ];
  const FORM30 = [
    ["Which is the most formal version of: « Les gens ne lisent plus beaucoup. »?", "La pratique de la lecture tend à diminuer.", ["Les gens lisent plus pas.", "Y'a plus personne qui lit."]],
    ["Which is the most formal version of: « Il y a plein de problèmes. »?", "De nombreuses difficultés subsistent.", ["Y'a plein de trucs qui vont pas.", "Il y a beaucoup de choses."]],
    ["Which is the most formal version of: « Ça veut dire que… »?", "Cela signifie que…", ["Ça fait dire que…", "Ça montre ben que…"]],
    ["Which is the most formal version of: « On peut dire que c'est vrai. »?", "Il convient de reconnaître que cela est exact.", ["Ouais, c'est vrai, quoi.", "On peut dire ça, c'est cool."]],
    ["Which is the most formal version of: « C'est pas clair. »?", "Ce point n'est pas clairement établi.", ["C'est flou, non ?", "Ça se voit pas bien."]],
    ["Which is the most formal version of: « Les profs sont fatigués. »?", "Le corps enseignant est épuisé.", ["Les profs sont crevés.", "Les enseignants sont naze."]],
    ["Which is the most formal version of: « On verra ça plus tard. »?", "Nous y reviendrons ultérieurement.", ["On verra ça après, hein.", "On en reparle un de ces quatre."]],
    ["Which opening is suitable for a formal essay?", "À mon sens,", ["Moi je dis que", "J'sais pas mais"]]
  ];
  const NOM = [
    ["Rewrite as a noun phrase: « Les prix augmentent. »", "L'augmentation des prix", ["La diminution des prix", "La stabilité des prix"]],
    ["Rewrite as a noun phrase: « Le ministre démissionne. »", "La démission du ministre", ["La nomination du ministre", "L'élection du ministre"]],
    ["Rewrite as a noun phrase: « Le chômage a baissé. »", "La baisse du chômage", ["La hausse du chômage", "La création du chômage"]],
    ["Rewrite as a noun phrase: « Ils ont découvert un vaccin. »", "La découverte d'un vaccin", ["La perte d'un vaccin", "L'interdiction d'un vaccin"]],
    ["Rewrite as a noun phrase: « La population vieillit. »", "Le vieillissement de la population", ["Le rajeunissement de la population", "La croissance de la population"]],
    ["Rewrite as a noun phrase: « La température monte. »", "La hausse de la température", ["La baisse de la température", "La mesure de la température"]],
    ["Rewrite as a noun phrase: « On a ouvert un musée. »", "L'ouverture d'un musée", ["La fermeture d'un musée", "La visite d'un musée"]],
    ["Rewrite as a noun phrase: « Le train arrive. »", "L'arrivée du train", ["Le départ du train", "L'annulation du train"]]
  ];
  const PREC = [
    ["Which verb is a more precise, formal synonym of « penser » (to hold an opinion)?", "estimer", ["dormir", "ranger", "ouvrir"]],
    ["Which verb is a more formal synonym of « commencer »?", "entamer", ["achever", "interrompre", "reporter"]],
    ["Which verb is a more formal synonym of « finir »?", "achever", ["entamer", "repousser", "ignorer"]],
    ["Which adjective is a stronger, formal synonym of « très grand »?", "considérable", ["minime", "banal", "rare"]],
    ["Which verb is a more formal synonym of « aider »?", "soutenir", ["freiner", "refuser", "ignorer"]],
    ["Which verb is a more formal synonym of « empêcher »?", "entraver", ["favoriser", "permettre", "encourager"]],
    ["Which verb is a more formal synonym of « changer »?", "modifier", ["maintenir", "conserver", "figer"]],
    ["Which expression is a more formal synonym of « beaucoup de »?", "de nombreux", ["quelques", "aucun", "très peu"]],
    ["Which verb is a more formal synonym of « montrer »?", "révéler", ["cacher", "contester", "ignorer"]]
  ];
  const READ30a = [
    { t: "Depuis les années 1980, les chercheurs en sciences du langage s'intéressent aux interactions orales plutôt qu'aux seules phrases écrites. Ils constatent que l'hésitation, la reprise et l'interruption, longtemps jugées fautives, structurent en réalité la conversation.", qs: [
      ["What has changed in language research?", "Researchers study spoken interaction, not only written sentences", ["They have stopped studying language", "They study only ancient texts"]],
      ["Which features were long seen as faulty?", "Hesitation, restarts and interruptions", ["Rhyme and rhythm", "Spelling and handwriting"]],
      ["What do researchers now find?", "These features give structure to conversation", ["They should be removed from speech", "They only appear in children"]]] },
    { t: "L'urbanisation rapide des pays francophones d'Afrique transforme les pratiques linguistiques : dans les grandes villes, le français se mêle aux langues nationales, donnant naissance à des variétés urbaines vivantes, comme le nouchi à Abidjan.", qs: [
      ["What is transforming language practices?", "Rapid urbanisation", ["The decline of cities", "A ban on French"]],
      ["Which example is given?", "Le nouchi in Abidjan", ["Le verlan in Paris", "Le joual in Montréal"]],
      ["« se mêle » means…", "mixes", ["disappears", "competes"]]] },
    { t: "Il serait réducteur de présenter la traduction comme un simple transfert de mots d'une langue à l'autre. Le traducteur doit restituer un ton, un rythme, une culture. C'est pourquoi on parle souvent de trahison, mais aussi de création.", qs: [
      ["« réducteur » here means…", "too simple, oversimplified", ["very accurate", "highly creative"]],
      ["What must a translator also render?", "Tone, rhythm and culture", ["Only spelling", "Only dictionary meanings"]],
      ["« C'est pourquoi » introduces…", "a consequence", ["a contrast", "an example"]]] }
  ];
  const READ30b = [
    { t: "Le téléphone sonna trois fois avant que Camille ne décroche. À l'autre bout du fil, personne ne parlait, mais elle reconnut aussitôt le souffle de sa mère. Elles restèrent ainsi, longtemps, sans rien se dire, comme deux personnes qui se comprennent trop bien pour avoir besoin de mots.", qs: [
      ["Who is on the phone?", "Camille's mother", ["A stranger", "A friend from school"]],
      ["What does the scene express?", "Closeness that needs no words", ["An argument", "A problem with the line"]],
      ["« décroche » means…", "picks up the phone", ["hangs up", "falls"]]] },
    { t: "À quarante ans, Paul n'avait toujours pas quitté la ville de son enfance. Il connaissait chaque rue, chaque visage, et pourtant, certains soirs, il avait l'impression d'être un étranger parmi les siens.", qs: [
      ["What is true about Paul?", "He has never left his hometown", ["He just moved to a new city", "He lives abroad"]],
      ["« et pourtant » introduces…", "a contrast", ["a cause", "a date"]],
      ["How does he sometimes feel?", "Like a stranger among his own people", ["Proud of everyone", "Afraid of the dark"]]] },
    { t: "La maison sentait la cire et le café froid. Dans le salon, les volets clos fabriquaient un crépuscule permanent. Marthe y avait vécu soixante ans ; elle y avait appris à ne plus attendre personne.", qs: [
      ["What is the atmosphere of the house?", "Quiet, closed and nostalgic", ["Noisy and festive", "Brand new and bright"]],
      ["« un crépuscule permanent » means…", "a constant dim light", ["a sunrise", "a storm"]],
      ["What does the last sentence suggest about Marthe?", "A long life of solitude and resignation", ["A busy social life", "A recent move"]]] }
  ];
  const READ30c = [
    { t: "On nous répète que la réussite se mesure en diplômes. C'est oublier que l'école ne forme pas seulement des employés, mais aussi des citoyens capables de penser par eux-mêmes. Réduire l'éducation à son utilité économique, c'est appauvrir la société tout entière.", qs: [
      ["« C'est oublier que » signals…", "a criticism of a common idea", ["a date", "a definition"]],
      ["What is the author's view of education?", "It should also form thinking citizens", ["It should only prepare workers", "It is useless"]],
      ["« appauvrir » means…", "to make poorer", ["to make richer", "to organise"]]] },
    { t: "Les réseaux sociaux ont démocratisé la parole, certes. Mais ils ont aussi multiplié les rumeurs. Il appartient à chacun de vérifier avant de partager : la responsabilité est collective.", qs: [
      ["The structure « certes… mais » is…", "a concession followed by an objection", ["a list of examples", "a conclusion"]],
      ["What does the author call for?", "Checking before sharing", ["Closing all accounts", "Sharing everything fast"]],
      ["« rumeurs » are…", "unverified stories", ["official news", "advertisements"]]] },
    { t: "Le vélo est-il le grand oublié de la politique des transports ? Les chiffres sont éloquents : un déplacement sur deux en ville fait moins de cinq kilomètres. Pourtant, les budgets continuent de favoriser la voiture.", qs: [
      ["How does the editorial begin?", "With a rhetorical question", ["With a quotation", "With a joke"]],
      ["What evidence is given?", "Half of urban trips are under five kilometres", ["Most trips are over fifty kilometres", "Nobody owns a bike"]],
      ["What does the author criticize?", "Budgets still favour cars", ["Bike prices", "Public parks"]]] }
  ];
  const LIST30a = [
    ["Aujourd'hui, nous allons étudier le passage du latin à l'ancien français. Retenez trois dates : les Serments de Strasbourg en huit cent quarante-deux, l'ordonnance de Villers-Cotterêts en quinze cent trente-neuf, et la création de l'Académie en seize cent trente-cinq.", "In which year was the ordonnance de Villers-Cotterêts?", "1539", ["842", "1635"]],
    ["Pour la prochaine séance, vous lirez les chapitres deux et trois, et vous rédigerez une page de commentaire. Le rendu est fixé au quinze novembre.", "What is the homework?", "Read chapters 2 and 3 and write a one-page commentary", ["Write a whole book", "Translate a poem"]],
    ["Le sujet de la dissertation est le suivant : le roman peut-il changer le monde ? Vous avez quatre heures.", "How long do students have?", "Four hours", ["Two hours", "One day"]],
    ["Contrairement à une idée reçue, le français est l'une des quatre langues nationales de la Suisse, aux côtés de l'allemand, de l'italien et du romanche.", "Which language is named besides German and Italian?", "Romansh", ["Spanish", "English"]],
    ["Le structuralisme ne s'intéresse pas à l'histoire d'un mot, mais à sa place dans un système de relations.", "What does structuralism study?", "A word's place in a system of relations", ["The history of each word", "Only spelling"]],
    ["La bibliothèque universitaire propose des ateliers de recherche documentaire tous les mardis à midi. Inscription obligatoire sur place.", "When are the workshops?", "Tuesdays at noon", ["Fridays at noon", "Mondays at six"]],
    ["Selon notre intervenant, le traducteur est avant tout un lecteur attentif : avant de traduire, il doit comprendre le ton et les intentions du texte.", "What must a translator be, first of all?", "An attentive reader", ["A fast typist", "A dictionary"]],
    ["L'examen oral portera sur un texte tiré au sort. Vous aurez vingt minutes de préparation, puis dix minutes de présentation.", "How long is the preparation time?", "20 minutes", ["10 minutes", "30 minutes"]]
  ];
  const LIST30b = [
    ["À la une ce soir : le gouvernement présente son projet de budget. Les dépenses pour l'éducation augmenteront de trois pour cent.", "What will happen to education spending?", "It will rise by 3 percent", ["It will fall by 3 percent", "It will stay the same"]],
    ["Un nouveau musée consacré à l'histoire de la Francophonie ouvrira ses portes en septembre.", "When will the museum open?", "In September", ["In March", "In December"]],
    ["Le prix du pain a augmenté de dix centimes en un an, selon l'institut de la statistique.", "By how much did bread go up?", "Ten centimes", ["One euro", "Fifty centimes"]],
    ["Les bibliothèques municipales prolongent leurs horaires pendant la période des examens.", "What is changing?", "Opening hours are longer", ["The libraries close", "Books are free"]],
    ["Les secours ont retrouvé sain et sauf un randonneur qui s'était perdu dans le brouillard.", "What happened to the hiker?", "He was found safe", ["He is still missing", "He was hurt badly"]],
    ["L'équipe nationale de handball s'est qualifiée pour la finale après une victoire de deux points.", "By how many points did the team win?", "Two", ["Ten", "Five"]],
    ["La température moyenne de l'année a dépassé la normale d'un degré, indique le service météorologique.", "By how much was the average above normal?", "One degree", ["Ten degrees", "Half a degree"]],
    ["Un sondage indique que soixante pour cent des étudiants préfèrent travailler en bibliothèque plutôt que chez eux.", "What percentage prefer the library?", "Sixty percent", ["Sixteen percent", "Ninety percent"]]
  ];
  const LAW = BK("Contracts and law", [["le contrat", "contract"], ["la clause", "clause"], ["la signature", "signature"], ["résilier", "to terminate a contract"], ["le délai", "time limit"], ["le préavis", "notice period"], ["la responsabilité", "liability"], ["le litige", "dispute"], ["la garantie", "guarantee"], ["les dommages-intérêts", "damages"], ["la partie", "party to a contract"], ["la mise en demeure", "formal notice"], ["le tribunal", "court"], ["l'avocat", "lawyer"], ["le brevet", "patent"], ["le droit d'auteur", "copyright"]], { tip: "<b>Résilier</b> ends a contract; <b>le préavis</b> is the notice you must give before ending it." });
  const IDI = [
    ["To call a spade a spade (speak plainly)", "Appeler un chat un chat", ["Appeler une pelle une pelle", "Appeler un chien un chien"]],
    ["To butt in uninvited", "Mettre son grain de sel", ["Mettre son sucre", "Mettre son poivre en travers"]],
    ["To jump from one topic to another", "Passer du coq à l'âne", ["Passer du chat au chien", "Passer du lion au singe"]],
    ["To take the bull by the horns", "Prendre le taureau par les cornes", ["Prendre le cheval par la queue", "Prendre la vache par le nez"]],
    ["To get back to the subject", "Revenons à nos moutons", ["Revenons à nos chevaux", "Rentrons avec nos moutons"]],
    ["To sleep soundly", "Dormir sur ses deux oreilles", ["Dormir sur un seul œil", "Dormir debout sur le sol"]],
    ["The last straw", "La goutte d'eau qui fait déborder le vase", ["La paille qui casse le chameau", "La dernière goutte du seau"]],
    ["To have influence (a long reach)", "Avoir le bras long", ["Avoir la main longue", "Avoir le pied large"]],
    ["To dress up in your best clothes", "Se mettre sur son trente et un", ["Se mettre sur son cent vingt", "Se mettre dans son quarante"]]
  ];
  const IDI2 = [
    ["Avoir le bras long", "to have influence", ["to have a long arm injury", "to be very tall"]],
    ["Passer du coq à l'âne", "to jump from one subject to another", ["to buy farm animals", "to move house"]],
    ["Mettre son grain de sel", "to butt in uninvited", ["to cook with salt", "to make a good deal"]],
    ["Dormir sur ses deux oreilles", "to sleep soundly", ["to hear very well", "to sleep badly"]],
    ["Prendre le taureau par les cornes", "to face a problem directly", ["to run away from a farm", "to buy a bull"]],
    ["Appeler un chat un chat", "to speak plainly", ["to name your pet", "to joke"]],
    ["Revenons à nos moutons", "let's get back to the subject", ["let's feed the sheep", "let's go home"]],
    ["Se mettre sur son trente et un", "to dress up smartly", ["to turn thirty-one", "to count to thirty-one"]]
  ];
  const TYP30 = [
    ["Type in French: <b>position defended in an essay</b> (une ___)", "thèse"], ["Type in French: <b>summary</b> (un ___)", "résumé"], ["Type in French: <b>court</b> (le ___)", "tribunal"],
    ["Type in French: <b>contract</b> (un ___)", "contrat"], ["Type in French: <b>lawyer</b> (un ___)", "avocat"], ["Type in French: <b>patent</b> (un ___)", "brevet"],
    ["Type in French: <b>quotation</b> (une ___)", "citation"], ["Type in French: <b>sign</b>, in Saussure's theory (le ___)", "signe"], ["Type in French: <b>individual speech</b>, in Saussure's theory (la ___)", "parole"],
    ["Type in French: <b>translator</b> (un ___)", "traducteur"], ["Type in French: <b>notice period</b> (le ___)", "préavis"], ["Type in French: <b>school essay</b> (une ___)", "dissertation"]
  ];

  const L30 = [
    les("French thinkers of the 20th century", mc(THINK, ["Think of philosophy, sociology, anthropology and literary theory in post-war France.", "Match each book with its field and author.", "Example: Simone Weil wrote « La Pesanteur et la grâce ». Now think about yours."], 2),
      tg("Ideas that shaped the world", "💡", "From the 1940s to the 1980s, French thinkers renewed philosophy, social science and literary theory.", "Barthes → Mythologies<br>Foucault → Surveiller et punir", "Two books.", "Link each name to a field and a book.")),
    les("Saussure and linguistics", vocab(SAUS), tVocab(SAUS)),
    les("Language policy and the Francophonie", mc(POLI, ["Think of institutions, laws and networks that protect or spread French.", "Match each body or law to its country and its role.", "Example: the Office québécois de la langue française supports French in Québec. Now think about yours."], 2),
      tg("French in the world", "🌐", "Institutions and laws protect French and spread it abroad.", "Académie française → 1635<br>loi Toubon → 1994", "Two dates.", "Each institution has a date and a role.")),
    les("Nobel Prize winners in French", mc(NOB, ["Think of the Nobel Prize in Literature and French-language winners.", "Match the year, the prize and the book.", "Example: Roger Martin du Gard won in 1937. Now think about yours."], 2),
      tg("Nobel laureates", "🏅", "Many French-language writers have won the Nobel Prize in Literature.", "Camus → 1957<br>Modiano → 2014<br>Ernaux → 2022", "Three laureates.", "Use dates and books to remember them.")),
    les("Literary prizes", mc(PRIZE, ["Think of the autumn prize season in France and of the jury behind each prize.", "Match each prize to its jury and its special feature.", "Example: the prix de l'Académie française is awarded by the Académie française. Now think about yours."], 2),
      tg("The prize season", "🏆", "Each autumn, French juries announce the Goncourt, Renaudot, Femina, Médicis and other prizes.", "Goncourt → best prose<br>Femina → women's jury", "Two prizes.", "The Goncourt brings the greatest fame and sales.")),
    les("Essay-writing words", vocab(DIS), tVocab(DIS)),
    les("Summaries and syntheses", mc(SUM, ["Think about what a summary keeps: ideas, order, and neutrality.", "A summary reformulates; it does not add your opinion or copy long parts.", "Example: « Résumer » means to give the main points briefly. Now think about yours."], 2),
      tg("Short and faithful", "✂️", "A résumé is shorter but faithful to the text. A synthèse compares several documents.", "Reformuler<br>Ne pas donner son avis", "Two rules.", "Keep the author's logic, in your own words.")),
    les("Formal rewriting", mc(FORM30, ["Think of academic French: no slang, full sentences, precise words.", "Choose the option that sounds like a university essay.", "Example: « C'est nul » becomes « Cela manque de qualité ». Now choose yours."], 2),
      tg("Academic register", "🎓", "In essays, replace casual phrases with precise formal ones.", "Ça veut dire → Cela signifie", "Casual to formal.", "Avoid <i>on</i>, <i>ça</i> and slang in formal writing.")),
    les("Nominal style", mc(NOM, ["Newspapers often turn a verb into a noun to be concise.", "Find the noun that matches the verb in the sentence and its meaning.", "Example: « Le prix baisse » becomes « La baisse du prix ». Now rewrite yours."], 2),
      tg("Verbs into nouns", "📰", "Nominalisation turns a clause into a noun phrase: concise and formal.", "Le musée ferme → La fermeture du musée", "A typical headline.", "Check the direction: rise, fall, opening, closing.")),
    les("Precise vocabulary", mc(PREC, ["Look for a word with the same meaning but a higher register.", "Eliminate choices that mean the opposite.", "Example: « montrer » can become « démontrer ». Now think about yours."], 2),
      tg("The right word", "🎯", "A good writer replaces vague verbs (<i>faire</i>, <i>mettre</i>) with precise ones.", "penser → estimer<br>changer → modifier", "Two upgrades.", "Learn the verbs in pairs.")),
    les("Reading: academic texts", mc(readQ(READ30a), readH, 2), readT("Reading research", "Academic texts state a claim, give evidence and nuance it.", "Underline the verbs that report findings: <i>constatent</i>, <i>montrent</i>.")),
    les("Reading: contemporary fiction", mc(readQ(READ30b), readH, 2), readT("Reading modern fiction", "Modern novels show feelings through small details.", "Ask what the details suggest about the characters' feelings.")),
    les("Reading: editorials", mc(readQ(READ30c), readH, 2), readT("Reading an editorial", "An editorial takes a clear position and tries to persuade.", "Look for the claim, the evidence and the rhetorical devices.")),
    les("Listening-style: lectures", listen(LIST30a), lisT),
    les("Listening-style: news bulletins", listen(LIST30b), lisT),
    les("Contracts and law", vocab(LAW), tVocab(LAW)),
    les("Translating idioms", mc(IDI.map(([e, a, w]) => [`What is the French idiom for: "${e}"?`, a, w]).concat(IDI2.map(([f, a, w]) => [`What does the idiom « ${f} » mean?`, a, w])), ["Do not translate idioms word by word. Think of the image and the meaning behind it.", "Match the meaning to the French image. The animal or object is part of the fixed phrase.", "Example: « Poser un lapin » means to stand someone up. Now think about yours."], 2),
      tg("Idioms across languages", "🐓", "Idioms use pictures that differ from language to language. Translate the meaning, not the words.", "Passer du coq à l'âne<br>Mettre son grain de sel", "Two idioms.", "Learn each idiom as one block.")),
    les("Type the word", typed(TYP30, "Think about writing, law and linguistics.", "Example: 'Type in French: <b>verse</b>' would be 'vers'. Now type yours. (Accents are optional.)"), typT)
  ];
  L30.push(MIX("Mixed practice", L30.slice(0, 18), [L30[1], L30[7], L30[15]]));
  L30.push(MIX("Level 30 Challenge", L30.slice(0, 18), [L30[3], L30[9], L30[16]]));

  Object.assign(FRENCH_LEVELS, { 28: L28, 29: L29, 30: L30 });
})();
