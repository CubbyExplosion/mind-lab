// ext/french-22-24.js : French, levels 22-24 (10th grade second half, 11th grade; AP French level).
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
    const items = bank.items, cur = pick(items), [fr, en, e] = cur;
    const rest = items.filter(x => x[0] !== fr), ex = pick(rest), wr = shuf(rest);
    const m = pick(e && !bank.nopic ? ["fr2en", "en2fr", "pic"] : ["fr2en", "en2fr"]);
    if (m === "fr2en") return {
      text: `What does "${fr}" mean?`, say: fr, lang: FR, choices: shuf([en, ...wr.slice(0, 2).map(x => x[1])]), answer: en,
      hints: ["Press 🔊 to hear it. Does it look like an English word, or does it have a famous part (like a prefix)?", `The English answer starts with the letter "${lead(en).toUpperCase()}".`, `Example: "${ex[0]}" means "${ex[1]}". Now think about yours.`]
    };
    if (m === "en2fr") return {
      text: `How do you say "${en}" in French?`, choices: shuf([fr, ...wr.slice(0, 2).map(x => x[0])]), answer: fr,
      hints: ["Think back to the words from the lesson. Which one fits the English?", `The French answer starts with "${lead(fr)}".`, `Example: "${ex[1]}" in French is "${ex[0]}". Now find yours.`]
    };
    const ex2 = pick(rest.filter(x => x[2])) || ex;
    return {
      text: "How do you say this in French?", visual: e, choices: shuf([fr, ...wr.slice(0, 2).map(x => x[0])]), answer: fr,
      hints: ["Look at the picture. What is it in English?", `The French answer starts with "${lead(fr)}".`, `Example: ${ex2[2] || ""} is "${ex2[0]}" in French. Now find yours.`]
    };
  };
  const mc = (items, hints, n = 2) => () => {
    const it = pick(items), [text, ans, wr, vis] = it;
    const q = { text, choices: shuf([ans, ...shuf(wr).slice(0, n)]), answer: ans, hints };
    if (vis) q.visual = vis;
    return q;
  };
  const mean = (arr, nudge, rule, ex) => mc(arr.map(([f, a, w]) => [`What does "${f}" mean?`, a, w]), [nudge, rule, ex]);
  const tVocab = bank => [
    S(bank.name, bank.items.slice(0, 3).map(x => x[2] || "💬").join(" "), `In this lesson you will learn French about <b>${bank.name.toLowerCase()}</b>. Listen, say it out loud, and then try the quiz.`),
    S("Learn the words", bank.items.map(x => word(x[0], x[1], x[2])).join("<br>"), "<b>Tap any word to hear it</b> and say it out loud!"),
    S("How to remember", "🧠", bank.tip || "Say each word out loud. Cover the English and see if you remember.")
  ];
  const typed = (items, nudge, ex) => () => {
    const [text, ans] = pick(items), n = ans.replace(/[^A-Za-zÀ-ÿ]/g, "").length;
    return { text, textInput: true, answer: ans, hints: [nudge, `The answer starts with "${lead(ans)}" and has ${n} letters.`, ex] };
  };
  const readQ = ps => ps.flatMap(p => p.qs.map(q => [`<i>${p.t}</i><br><br>${q[0]}`, q[1], q[2]]));
  const readH = ["Read the text slowly. Which words from the question can you find in the text?", "The answer is in the text. Look at the sentence with the same key words as the question.", "Example: in 'Paul joue au foot le lundi', the question 'When does Paul play?' is answered by the words near 'lundi'. Now look in your text."];
  const T = (e, x) => `Type in French: <b>${e}</b>${x ? " " + x : ""}`;

  // =====================================================  LEVEL 22
  const B22 = {
    lit: BK("Literary terms", [["le narrateur", "narrator"], ["le vers", "line of poetry"], ["la strophe", "stanza"], ["la rime", "rhyme"], ["l'incipit", "opening lines of a book"], ["le récit", "narrative, story"], ["le registre", "tone, style (comic, tragic…)"], ["la métaphore", "metaphor"], ["le roman", "novel"], ["la nouvelle", "short story"], ["le recueil", "collection (of poems)"], ["le personnage principal", "main character"]], { tip: "<b>La nouvelle</b> is a short story, but it is also \"a piece of news\". <b>Un vers</b> is one line of a poem." }),
    media: BK("Newspapers and media", [["la une", "front page"], ["le titre", "headline"], ["le journaliste", "journalist"], ["le reportage", "report, feature"], ["l'éditorial", "editorial"], ["la chronique", "column (regular article)"], ["le fait divers", "minor news story"], ["la rubrique", "section (of a paper)"], ["l'actualité", "current events"], ["le quotidien", "daily newspaper"], ["le démenti", "denial, retraction"], ["l'abonné", "subscriber"]], { tip: "<b>L'actualité</b> is singular and means the news of the day. <b>Un quotidien</b> comes out every day." }),
    env: BK("Environment and sustainability", [["le réchauffement", "warming (global warming)"], ["la sécheresse", "drought"], ["le tri sélectif", "sorting of recycling"], ["les énergies renouvelables", "renewable energy"], ["le gaspillage", "waste (misuse)"], ["la biodiversité", "biodiversity"], ["l'empreinte carbone", "carbon footprint"], ["polluer", "to pollute"], ["le déchet", "piece of waste"], ["durable", "sustainable, lasting"], ["la fonte des glaces", "melting of the ice"], ["reboiser", "to replant forests"]], { tip: "<b>Le développement durable</b> is sustainable development. <b>Le gaspillage</b> is wasting food or energy." }),
    tech: BK("Technology and the internet", [["le réseau social", "social network"], ["le mot de passe", "password"], ["télécharger", "to download"], ["le pirate informatique", "hacker"], ["la panne", "breakdown, outage"], ["le logiciel", "software"], ["l'appli", "app"], ["la connexion", "connection, login"], ["l'écran tactile", "touchscreen"], ["sauvegarder", "to back up, to save"], ["le fil d'actualité", "news feed"], ["l'abonnement", "subscription"]], { tip: "<b>Le logiciel</b> is software. French often avoids English words: un courriel, un téléchargement, un mot de passe." }),
    char: BK("Character traits", [["têtu", "stubborn"], ["rancunier", "resentful, holding grudges"], ["sournois", "sly, underhanded"], ["bienveillant", "kind, well-meaning"], ["audacieux", "bold"], ["méfiant", "distrustful"], ["lunatique", "moody"], ["orgueilleux", "proud, arrogant"], ["avare", "stingy"], ["serviable", "helpful"], ["mesquin", "petty"], ["pudique", "modest, discreet"]], { tip: "<b>Bienveillant</b> comes from \"wishing well\". <b>Lunatique</b> comes from \"lune\", the moon, which changes all the time." }),
    econ: BK("Economy and work", [["le chômage", "unemployment"], ["l'entreprise", "company"], ["le salaire", "salary"], ["licencier", "to lay off, to fire"], ["embaucher", "to hire"], ["la grève", "strike"], ["le syndicat", "trade union"], ["l'inflation", "inflation"], ["la croissance", "growth"], ["le budget", "budget"], ["l'impôt", "tax"], ["la dette", "debt"]], { tip: "<b>Embaucher</b> (hire) and <b>licencier</b> (lay off) are opposites. <b>Un syndicat</b> defends workers." })
  };
  const MON = [
    ["Coûter les yeux de la tête", "To be extremely expensive", ["To be hard to see", "To be a fair price"]],
    ["Être fauché comme les blés", "To be completely broke", ["To be a farmer", "To be rich"]],
    ["Tuer le temps", "To pass the time doing something", ["To stop a clock", "To be always late"]],
    ["Le temps, c'est de l'argent.", "Time is valuable, do not waste it.", ["Banks are open all day.", "Money grows over time."]],
    ["Ne pas avoir un sou", "To have no money at all", ["To be unable to pay attention", "To have one coin"]],
    ["Payer les pots cassés", "To pay for the damage others caused", ["To clean up the kitchen", "To buy new dishes"]],
    ["Faire des économies de bouts de chandelles", "To save tiny amounts in a foolish way", ["To light a lot of candles", "To spend all one's money"]],
    ["Avoir du temps devant soi", "To have plenty of time ahead", ["To stand in front of a clock", "To be early to school"]],
    ["Mettre de l'argent de côté", "To save money", ["To hide money from others", "To lend money"]],
    ["Être dans le rouge", "To be overdrawn, in debt", ["To be angry", "To be blushing"]]
  ];
  const READ22 = [
    { t: "Hier soir, un incendie s'est déclaré dans un entrepôt de la zone industrielle de Lille. Les pompiers sont arrivés en moins de dix minutes et ont réussi à protéger les maisons voisines. Personne n'a été blessé. Selon la mairie, une enquête déterminera la cause du feu. Les habitants du quartier ont été invités à garder leurs fenêtres fermées jusqu'à demain.", qs: [
      ["What happened last night?", "A fire in a warehouse", ["A flood in a school", "A storm in a park"]],
      ["How quickly did the firefighters arrive?", "In under ten minutes", ["After an hour", "In under one minute"]],
      ["Was anyone hurt?", "No, nobody", ["Yes, several people", "Only the firefighters"]],
      ["What are residents asked to do?", "Keep their windows closed", ["Leave their homes", "Water their gardens"]]] },
    { t: "Chère Camille, merci pour ta lettre ! Ici, tout va bien, même si je suis très occupée par mes examens. Le week-end dernier, j'ai quand même trouvé le temps d'aller à la montagne avec mes cousins. Nous avons fait une longue randonnée, et le paysage était magnifique. J'espère que tu pourras venir nous voir pendant les vacances de printemps. Écris-moi vite ! Inès", qs: [
      ["Why is Inès busy?", "She has exams", ["She is moving house", "She is on vacation"]],
      ["What did she do last weekend?", "She went hiking in the mountains", ["She studied all weekend", "She visited Camille"]],
      ["What does she hope?", "That Camille can visit in spring", ["That the exams will be canceled", "That her cousins will write"]],
      ["What kind of text is this?", "A personal letter to a friend", ["A newspaper article", "A school notice"]]] },
    { t: "J'ai vu hier le nouveau film d'animation dans mon cinéma de quartier. L'histoire, celle d'un renard qui rêve de voyager dans l'espace, est charmante, et les images sont superbes. En revanche, le milieu du film traîne un peu et certaines blagues sont trop faciles. Malgré ces défauts, je le recommande aux familles : petits et grands passeront un bon moment.", qs: [
      ["What is the film about?", "A fox who dreams of space travel", ["A dog lost in the city", "A boy building a boat"]],
      ["What does the reviewer praise?", "The pictures", ["The music", "The price"]],
      ["What is the criticism?", "The middle drags and some jokes are too easy", ["The ending is too sad", "The film is too short"]],
      ["What is the overall opinion?", "A recommendation for families", ["A warning to stay away", "Only for adults"]]] }
  ];
  const AUT22 = [
    ["Who wrote <i>Les Misérables</i>?", "Victor Hugo", ["Molière", "Jules Verne"]],
    ["Who wrote <i>Le Petit Prince</i>?", "Antoine de Saint-Exupéry", ["Victor Hugo", "Alexandre Dumas"]],
    ["Which author wrote <i>Le Bourgeois gentilhomme</i>, a comedy for the theater?", "Molière", ["Voltaire", "Jean de La Fontaine"]],
    ["Who wrote <i>Les Trois Mousquetaires</i>?", "Alexandre Dumas", ["Jules Verne", "Victor Hugo"]],
    ["Who wrote <i>Vingt mille lieues sous les mers</i>?", "Jules Verne", ["Alexandre Dumas", "Molière"]],
    ["Which author wrote <i>Notre-Dame de Paris</i>, with the bell-ringer Quasimodo?", "Victor Hugo", ["Jules Verne", "Voltaire"]],
    ["Who wrote the play <i>Cyrano de Bergerac</i>, about a poet with a very long nose?", "Edmond Rostand", ["Molière", "Alexandre Dumas"]],
    ["Who wrote <i>Candide</i>, a short satirical tale?", "Voltaire", ["Edmond Rostand", "Victor Hugo"]],
    ["Who wrote <i>Le Comte de Monte-Cristo</i>?", "Alexandre Dumas", ["Voltaire", "Antoine de Saint-Exupéry"]],
    ["Who wrote <i>Le Tour du monde en quatre-vingts jours</i>?", "Jules Verne", ["Molière", "Edmond Rostand"]]
  ];
  const FIG = [
    ["« Cet enfant est un lion. »", "A metaphor", ["A comparison", "An exaggeration"]],
    ["« Il est fort comme un lion. »", "A comparison (simile)", ["A metaphor", "A contradiction"]],
    ["« Le vent murmure dans les arbres. »", "Personification", ["A metaphor", "An exaggeration"]],
    ["« J'ai mille choses à faire ! »", "Hyperbole (exaggeration)", ["Personification", "A comparison"]],
    ["« Petit par la taille, grand par le cœur. »", "Antithesis (opposites)", ["A metaphor", "Alliteration"]],
    ["« Six chats sifflent sans cesse. » (the sound s repeats)", "Alliteration", ["Rhyme", "Antithesis"]],
    ["« Cette obscure clarté. » (two opposite words together)", "Oxymoron", ["Hyperbole", "A comparison"]],
    ["« Le soleil est un grand sourire dans le ciel. »", "A metaphor", ["A comparison", "Antithesis"]],
    ["« Elle est douce comme un agneau. »", "A comparison (simile)", ["Personification", "Alliteration"]],
    ["« La ville dort. »", "Personification", ["Oxymoron", "A comparison"]]
  ].map(([q, a, w]) => [`What figure of speech is this? ${q}`, a, w]);
  const REG22 = [
    ["Which word is <b>familiar</b> (informal) for \"book\"?", "bouquin", ["livre", "ouvrage"]],
    ["Which word is <b>familiar</b> (informal) for \"job, work\"?", "boulot", ["travail", "labeur"]],
    ["Which word is <b>familiar</b> (informal) for \"car\"?", "bagnole", ["voiture", "automobile"]],
    ["Which word is <b>familiar</b> (informal) for \"to eat\"?", "bouffer", ["manger", "se restaurer"]],
    ["Which word is <b>familiar</b> (informal) for \"house\"?", "baraque", ["maison", "demeure"]],
    ["Which word is <b>familiar</b> (informal) for \"boring\"?", "barbant", ["ennuyeux", "fastidieux"]],
    ["Which word is <b>familiar</b> (informal) for \"fear\"?", "la trouille", ["la peur", "l'effroi"]],
    ["Which word is <b>familiar</b> (informal) for \"food\"?", "la bouffe", ["la nourriture", "les victuailles"]],
    ["You write to a company director you do not know. Which opening is right?", "Madame, Monsieur,", ["Salut tout le monde,", "Coucou !"]],
    ["Which closing suits a formal letter?", "Veuillez agréer, Madame, mes salutations distinguées.", ["Gros bisous !", "À+ !"]],
    ["You text a close friend. Which message suits best?", "Tu viens ce soir ?", ["Seriez-vous disposé à venir ce soir ?", "Daignerez-vous nous honorer de votre présence ce soir ?"]]
  ];
  const REGN = [
    ["In Québec, what is <i>une tuque</i>?", "A winter hat", ["A small truck", "A kind of soup"]],
    ["In Québec, what is <i>un dépanneur</i>?", "A corner store", ["A car mechanic", "A plumber"]],
    ["In Québec, what does <i>un char</i> usually mean in everyday speech?", "A car", ["A tank", "A market cart"]],
    ["In Québec, someone says <i>Bienvenue !</i> after you thank them. What do they mean?", "You're welcome", ["Welcome to my house", "See you soon"]],
    ["Which number word is used in Belgium and Switzerland, but not in France, for 90?", "nonante", ["quatre-vingt-dix", "septante"]],
    ["In Switzerland, what is <i>un natel</i>?", "A mobile phone", ["A hotel room", "A small boat"]],
    ["In Belgium, <i>une drache</i> is...", "A heavy rain shower", ["A dragon", "A strong wind"]],
    ["In Belgium, <i>un GSM</i> is...", "A mobile phone", ["A group of students", "A tax form"]],
    ["Who are the Cajuns of Louisiana?", "Descendants of French-speaking Acadians", ["Spanish sailors", "Settlers from Switzerland"]],
    ["Louisiana was named after which French king?", "Louis XIV", ["Louis IX", "Henri IV"]],
    ["Which Louisiana city is famous for French-style streets and Mardi Gras?", "New Orleans", ["Houston", "Miami"]]
  ];
  const GEN = [
    ["la tour", "A tower", ["A trip", "A turn in a game"]],
    ["le tour", "A turn or a tour", ["A tower", "A round building"]],
    ["la mode", "Fashion", ["A way of doing", "A mood"]],
    ["le mode", "A way, a mode", ["Fashion", "A rule"]],
    ["la poste", "The post office", ["A job position", "A radio set"]],
    ["le poste", "A job position, or a set (radio, TV)", ["The post office", "A mailbox"]],
    ["la livre", "A pound (weight or money)", ["A book", "A page"]],
    ["le livre", "A book", ["A pound", "A library"]],
    ["la mémoire", "The ability to remember", ["A written report", "A souvenir shop"]],
    ["le mémoire", "A written report or thesis", ["The ability to remember", "A souvenir"]],
    ["la vase", "Mud", ["A flower container", "A glass"]],
    ["la moule", "A mussel", ["A mold", "A muscle"]],
    ["le moule", "A mold (for baking)", ["A mussel", "A muscle"]],
    ["la critique", "Criticism, a review", ["A person who reviews", "A newspaper"]],
    ["le critique", "A critic (the person)", ["A review", "A newspaper"]]
  ].map(([w, a, wr]) => [`What does <i>${w}</i> mean?`, a, wr]);
  const SUB22 = [
    ["Je ne pense pas qu'elle ___ raison. (avoir)", "ait", ["a", "aurait"]],
    ["Il est évident que tu ___ raison. (avoir)", "as", ["aies", "aurais"]],
    ["Il faut que nous ___ à la gare. (aller)", "allions", ["allons", "irons"]],
    ["Je crois qu'il ___ demain. (venir)", "viendra", ["vienne", "venait"]],
    ["Je doute qu'il ___ la réponse. (savoir)", "sache", ["sait", "saura"]],
    ["Je veux que tu ___ patient. (être)", "sois", ["es", "seras"]],
    ["Il est certain qu'elle ___ de son mieux. (faire)", "fait", ["fasse", "faisons"]],
    ["Bien qu'il ___ froid, nous sortons. (faire)", "fasse", ["fait", "fera"]],
    ["Il est possible que vous ___ venir. (pouvoir)", "puissiez", ["pouvez", "pourrez"]],
    ["Je sais que tu ___ le faire. (pouvoir)", "peux", ["puisses", "pouvons"]]
  ];
  const SI22 = [
    ["Si j'avais su, je ne ___ pas venu.", "serais", ["étais", "aurais"]],
    ["Si tu m'avais prévenu, je t'___ aidé.", "aurais", ["avais", "aie"]],
    ["Si elle s'___ levée plus tôt, elle aurait pris le train.", "était", ["serait", "avait"]],
    ["S'il ___ fait beau, nous serions allés à la plage.", "avait", ["aurait", "a"]],
    ["Nous ___ gagné si nous avions mieux joué.", "aurions", ["avions", "aurons"]],
    ["Si vous aviez écouté, vous ne vous ___ pas trompés.", "seriez", ["étiez", "auriez"]],
    ["Si j'étais riche, je ___ le tour du monde.", "ferais", ["ferai", "ai fait"]],
    ["Si tu viens, nous ___ au parc.", "irons", ["irions", "serions allés"]],
    ["Elle ___ partie plus tôt si elle avait su.", "serait", ["était", "aurait"]],
    ["Si nous avions de l'argent, nous ___ une maison.", "achèterions", ["achèterons", "avons acheté"]]
  ];
  const PAR22 = [
    ["Les fleurs que j'ai ___ sont belles. (acheter)", "achetées", ["acheté", "achetés"]],
    ["La lettre qu'elle a ___ est longue. (écrire)", "écrite", ["écrit", "écrits"]],
    ["Les livres que nous avons ___ étaient bons. (lire)", "lus", ["lu", "lues"]],
    ["Je les ai ___ hier. (voir ; les = deux amies)", "vues", ["vu", "vus"]],
    ["Elle a ___ la porte. (fermer)", "fermé", ["fermée", "fermés"]],
    ["Quelle chanson as-tu ___ ? (choisir)", "choisie", ["choisi", "choisis"]],
    ["Les photos qu'il a ___ sont floues. (prendre)", "prises", ["pris", "prise"]],
    ["Ils sont ___ au cinéma. (aller)", "allés", ["allé", "allées"]],
    ["Les efforts qu'il a ___ ont payé. (faire)", "faits", ["fait", "faites"]],
    ["Voici les clés que tu as ___. (perdre)", "perdues", ["perdu", "perdus"]]
  ];
  const CON22 = [
    ["Il a étudié toute la nuit ; ___, il a raté l'examen. (contrast)", "pourtant", ["donc", "ainsi"]],
    ["Il pleuvait ; ___, nous sommes restés à la maison. (result)", "par conséquent", ["cependant", "en revanche"]],
    ["Mon frère aime le sport ; ___, ma sœur préfère lire. (opposition)", "en revanche", ["par conséquent", "d'ailleurs"]],
    ["Je ne veux pas y aller ; ___, je suis trop fatigué. (another reason)", "d'ailleurs", ["néanmoins", "pourtant"]],
    ["___ il soit jeune, il est très sage. (although)", "Bien qu'", ["Parce qu'", "Pour qu'"]],
    ["Nous sommes partis tôt ___ éviter les embouteillages. (in order to)", "pour", ["car", "mais"]],
    ["Il est parti ___ il était malade. (because)", "car", ["donc", "mais"]],
    ["Le prix est élevé ; ___, la qualité est excellente. (however)", "néanmoins", ["car", "ainsi"]],
    ["J'ai oublié mon livre ; ___, je dois emprunter le tien. (so)", "donc", ["or", "mais"]],
    ["Tout le monde est venu, ___ Paul. (except)", "sauf", ["avec", "dès"]]
  ];
  const TYP22 = [
    [T("unemployment", "(le ___)"), "chômage"], [T("strike", "(la ___)"), "grève"], [T("tax", "(l'___)"), "impôt"], [T("headline", "(le ___)"), "titre"],
    [T("narrator", "(le ___)"), "narrateur"], [T("drought", "(la ___)"), "sécheresse"], [T("password", "(le mot de ___)"), "passe"], [T("stanza", "(la ___)"), "strophe"],
    [T("to hire"), "embaucher"], [T("to download"), "télécharger"], [T("debt", "(la ___)"), "dette"], [T("stubborn"), "têtu"], [T("front page", "(la ___)"), "une"]
  ];
  const L22 = [
    les("Literary terms", vocab(B22.lit), tVocab(B22.lit)),
    les("Newspapers and media", vocab(B22.media), tVocab(B22.media)),
    les("Environment and sustainability", vocab(B22.env), tVocab(B22.env)),
    les("Technology and the internet", vocab(B22.tech), tVocab(B22.tech)),
    les("Character traits", vocab(B22.char), tVocab(B22.char)),
    les("Economy and work", vocab(B22.econ), tVocab(B22.econ)),
    les("Sayings about money and time", mean(MON, "Do not translate word by word. Picture a real situation where a person could say this.", "Money and time are used as pictures: the sentence points to a feeling about spending, saving or wasting.", "Example: 'Être près de ses sous' means to be careful, even stingy, with money. Now think about yours."),
      tg("Money and time sayings", "💶", "French has many sayings about money and time. They are about <b>meaning</b>, not about the words.", "Coûter les yeux de la tête<br>Tuer le temps", "Very expensive. To pass the time.", "Learn the real meaning as a whole sentence, like a vocabulary word.")),
    les("Reading: news, letter, review", mc(readQ(READ22), readH, 2), [S("Three kinds of text", "📰", "A news report gives facts (what, where, when). A letter is personal. A review gives an opinion."), S("How to read", "🔎", "Ask first: who writes, who reads, and why? Then find the key facts."), S("Tip", "🧠", "In a review, words like <i>en revanche</i> and <i>malgré</i> bring in a different view.")]),
    les("French writers and their works", mc(AUT22, ["Think of the type of work: a play, a novel, an adventure story, a fable?", "Match the title with a famous name. Some authors wrote many famous books, so think of the century and the style.", "Example: Charles Perrault wrote fairy tales such as <i>Cendrillon</i>. Now think about yours."], 2),
      [S("Great French authors", "📚", "Victor Hugo wrote novels and poems. Molière wrote comedies. Jules Verne and Alexandre Dumas wrote adventures."), S("Titles to know", "📖", "<i>Les Misérables</i>, <i>Le Petit Prince</i>, <i>Le Comte de Monte-Cristo</i>, <i>Cyrano de Bergerac</i>."), S("Tip", "🧠", "Link each title to a picture: a bell-ringer, a little prince, three musketeers.")]),
    les("Figures of speech", mc(FIG, ["Does the sentence compare using a word like <i>comme</i>, state a direct identity, give life to an object, or exaggerate?", "Names to know: metaphor, comparison, personification, hyperbole, antithesis, alliteration, oxymoron. Match the pattern, not the topic.", "Example: « Il pleut des cordes » is an exaggeration, because rain does not really fall as ropes. Now think about yours."], 2),
      tg("Poets' tools", "🖋️", "Writers use <b>figures of speech</b> to make their text vivid.", "Un lion (métaphore)<br>Comme un lion (comparaison)<br>Le vent murmure (personnification)", "Direct picture. Picture with <i>comme</i>. Objects act like people.", "A metaphor has no <i>comme</i>. A comparison needs one.")),
    les("Familiar, neutral, formal", mc(REG22, ["Who is speaking to whom? A friend, a stranger, an official?", "A familiar word sounds like street speech. A formal one is elegant and rarer. Neutral is the normal dictionary word.", "Example: <i>pote</i> is familiar, <i>ami</i> is neutral. Now look at what your question asks for."], 2),
      tg("Registers", "🎭", "French has three main <b>registers</b>: <i>familier</i> (friends), <i>courant</i> (everyday) and <i>soutenu</i> (formal).", "un bouquin / un livre / un ouvrage", "Familiar, neutral, formal.", "A formal letter starts with <i>Madame, Monsieur,</i> and never with <i>Salut</i>.")),
    les("Regional French", mc(REGN, ["Where is this word or fact from: Québec, Belgium, Switzerland or Louisiana?", "Regional words can look like France's words but mean something else. Think of the place first.", "Example: in Québec, <i>un chandail</i> is a sweater and <i>la fin de semaine</i> is the weekend. Now think about yours."], 2),
      [S("French is not one-size-fits-all", "🗺️", "People in Québec, Belgium, Switzerland and Louisiana have their own words, numbers and foods."), S("Examples", "🍁", "Belgium and Switzerland say <b>nonante</b> for 90. Québec says <b>tuque</b> for a winter hat."), S("Tip", "🧠", "None of these is \"wrong\" French. They are regional varieties.")]),
    les("Same word, two genders", mc(GEN, ["Look at le or la. In French, it can change the meaning.", "Think of both meanings of the word. Which one goes with la, and which with le?", "Example: <i>le manche</i> is a handle and <i>la manche</i> is a sleeve. Now think about yours."], 2),
      tg("Gender changes meaning", "🔀", "Some words are spelled the same but change meaning with <b>le</b> or <b>la</b>.", "le livre / la livre<br>le poste / la poste", "A book / a pound. A position / the post office.", "When learning one of these words, always learn it with its article.")),
    les("Subjunctive or indicative?", mc(SUB22, ["Does the first part show a fact, or a wish, doubt or feeling?", "Facts and certainty take the indicative. Wishes, doubts, orders and <i>bien que</i> take the subjunctive. Watch out for negatives.", "Example: 'Il faut que tu ___ (faire) tes devoirs' needs the subjunctive: fasses. Now do yours."], 2),
      tg("Mood choice", "🎚️", "The <b>indicative</b> says what is real. The <b>subjunctive</b> says what is wanted, doubted or felt.", "Je sais qu'il vient.<br>Je veux qu'il vienne.", "A fact. A wish.", "After <i>penser que</i> and <i>croire que</i> use the indicative, but in the negative often the subjunctive.")),
    les("If-clauses, past and present", mc(SI22, ["Which tense is in the <i>si</i> part: present, imparfait or plus-que-parfait?", "Si + present gives the future. Si + imparfait gives the present conditional. Si + plus-que-parfait gives the past conditional.", "Example: 'Si elle avait vu le film, elle l'___ aimé.' The si part is the past, so use the past conditional: aurait. Now do yours."], 2),
      tg("Si clauses", "🤔", "<b>Si</b> sentences follow patterns.", "Si je peux, je viendrai.<br>Si je pouvais, je viendrais.<br>Si j'avais pu, je serais venu.", "Real. Imagined. Regret about the past.", "Never put a conditional right after <i>si</i>.")),
    les("Past participle agreement", mc(PAR22, ["Which auxiliary is used, avoir or être? Is there a direct object before the verb?", "With être, the participle agrees with the subject. With avoir, it agrees with a direct object placed <b>before</b> the verb.", "Example: 'Les pommes que j'ai ___ (manger)' - the object les pommes comes first: mangées. Now do yours."], 2),
      tg("Agreement rules", "✍️", "The participle changes depending on the auxiliary.", "Elles sont parties.<br>Les clés que j'ai trouvées.", "Être: agree with the subject. Avoir: agree with an earlier object.", "Ask: <i>que</i> or a pronoun before the verb? Then agree.")),
    les("Connectors for writing", mc(CON22, ["What link is needed: result, cause, contrast, addition or exception?", "Result words show 'so'. Cause words show 'because'. Contrast words show 'but'. Match the small hint in brackets.", "Example: 'Il est petit ; ___, il joue bien au basket.' This is a contrast: cependant. Now do yours."], 2),
      tg("Linking ideas", "🔗", "Good writers link their ideas with <b>connectors</b>.", "cependant, pourtant, en revanche<br>donc, par conséquent<br>car, d'ailleurs", "Contrast. Result. Cause or addition.", "Use a different connector in each sentence, not just <i>et</i> and <i>mais</i>.")),
    les("Type the word", typed(TYP22, "Think about the vocabulary of this level: economy, media, technology, literature, environment.", "Example: 'Type in French: salary (le ___)' would be 'salaire'. Now type yours. (Accents are optional.)"), [S("Typing practice", "⌨️", "You type the French word for what you see."), S("Remember", "🧠", "Some words are masculine (le) and some feminine (la), but you type only the word."), S("Tip", "✍️", "Accents are optional here.")])
  ];
  L22.push(MIX("Mixed practice", L22.slice(0, 18), [L22[6], L22[9], L22[13]]));
  L22.push(MIX("Level 22 Challenge", L22.slice(0, 18), [L22[10], L22[14], L22[16]]));

  // =====================================================  LEVEL 23
  const B23 = {
    phil: BK("Ideas and philosophy", [["la liberté", "freedom"], ["le devoir", "duty"], ["la vérité", "truth"], ["la conscience", "conscience, awareness"], ["le préjugé", "prejudice"], ["l'esprit critique", "critical thinking"], ["le raisonnement", "reasoning"], ["la croyance", "belief"], ["le doute", "doubt"], ["la morale", "morals, ethics"], ["l'égalité", "equality"], ["la justice", "justice"]], { tip: "<b>Le devoir</b> is duty, and also a homework assignment (les devoirs). <b>La conscience</b> means both conscience and awareness." }),
    sci: BK("Science and research", [["l'hypothèse", "hypothesis"], ["l'expérience", "experiment, experience"], ["la découverte", "discovery"], ["le chercheur", "researcher"], ["le laboratoire", "laboratory"], ["la preuve", "proof, evidence"], ["la théorie", "theory"], ["le résultat", "result"], ["la mesure", "measurement"], ["l'échantillon", "sample"], ["observer", "to observe"], ["démontrer", "to demonstrate, to prove"]], { tip: "<b>Une expérience</b> can be a science experiment or a life experience. The context tells you which." }),
    cine: BK("Cinema and film-making", [["le réalisateur", "film director"], ["le tournage", "filming, shoot"], ["la bande-annonce", "trailer"], ["le doublage", "dubbing"], ["les sous-titres", "subtitles"], ["l'affiche", "poster"], ["le scénariste", "screenwriter"], ["le décor", "set, scenery"], ["le montage", "editing"], ["le générique", "credits"], ["la séance", "showing, screening"], ["le court-métrage", "short film"]], { tip: "French cinema words: <b>version originale</b> (VO) is the film in its original language, with subtitles. <b>VF</b> is the French dubbed version." }),
    travel: BK("Travel and journeys", [["le dépaysement", "feeling of being somewhere new"], ["l'étape", "stage of a trip"], ["l'hébergement", "accommodation"], ["la correspondance", "connection (train, plane)"], ["le séjour", "stay"], ["l'itinéraire", "route"], ["la douane", "customs"], ["la traversée", "crossing"], ["le dépliant", "leaflet, brochure"], ["l'escale", "stopover"], ["le retard", "delay"], ["l'aller-retour", "round trip"]], { tip: "<b>Le dépaysement</b> is a lovely word for the feeling of changing scenery, with no exact English word." }),
    shop: BK("Consumers and advertising", [["la publicité", "advertising"], ["la marque", "brand"], ["le consommateur", "consumer"], ["la garantie", "warranty"], ["le remboursement", "refund"], ["la réclamation", "complaint"], ["les soldes", "sales (discounts)"], ["la livraison", "delivery"], ["le devis", "quote, estimate"], ["la facture", "bill, invoice"], ["le bon de commande", "order form"], ["l'échange", "exchange"]], { tip: "<b>Les soldes</b> are the official sales seasons in France. A <b>réclamation</b> is a complaint made to a company." }),
    memo: BK("Memory and storytelling", [["le souvenir", "memory, souvenir"], ["le témoignage", "testimony, account"], ["la mémoire", "memory (ability)"], ["évoquer", "to evoke, to mention"], ["se remémorer", "to recall"], ["l'oubli", "forgetting"], ["la nostalgie", "nostalgia"], ["l'anecdote", "anecdote"], ["l'ancêtre", "ancestor"], ["les archives", "archives"], ["commémorer", "to commemorate"], ["la génération", "generation"]], { tip: "<b>Un souvenir</b> is a memory (of the past) and also a souvenir (object). <b>Se souvenir de</b> means to remember." })
  };
  const EFF = [
    ["Mettre la main à la pâte", "To pitch in and help", ["To bake bread", "To get messy"]],
    ["Casser les pieds à quelqu'un", "To annoy someone", ["To hurt someone's feet", "To dance with someone"]],
    ["Avoir un poil dans la main", "To be very lazy", ["To be a hairy person", "To be good with tools"]],
    ["Poser un lapin à quelqu'un", "To stand someone up", ["To give someone a pet", "To tell a joke"]],
    ["Avoir le cafard", "To feel down, blue", ["To have insects at home", "To love coffee"]],
    ["Être au bout du rouleau", "To be completely worn out", ["To finish a paper roll", "To be at the end of a road"]],
    ["Marcher comme sur des roulettes", "To go very smoothly", ["To go skating", "To move very slowly"]],
    ["Tomber dans les pommes", "To faint", ["To pick apples", "To trip on fruit"]],
    ["C'est du gâteau !", "It's very easy!", ["It's delicious!", "It's too sweet!"]],
    ["Se creuser la tête", "To think very hard", ["To have a headache", "To dig a hole"]]
  ];
  const READ23 = [
    { t: "Chaque année, des millions de téléphones sont jetés alors qu'ils fonctionnent encore. Les fabricants nous poussent à acheter le dernier modèle, mais cela coûte cher à la planète. Il serait pourtant simple de réparer, de réutiliser ou de revendre nos anciens appareils. Les consommateurs ont le pouvoir de changer les choses : si nous exigeons des produits durables, les entreprises devront nous écouter.", qs: [
      ["What is the author's main point?", "People should keep, repair and reuse their devices", ["Phones are too cheap", "Factories should close"]],
      ["What does the author criticize about manufacturers?", "They push people to buy the newest model", ["They make phones too small", "They sell too slowly"]],
      ["What solution does the author suggest?", "Repair, reuse or resell old devices", ["Stop using phones", "Buy a new phone each year"]],
      ["What is the tone of the text?", "Persuasive, a call to action", ["Funny and light", "Sad and nostalgic"]]] },
    { t: "Quand j'étais enfant, l'été commençait toujours par la même odeur : celle du foin coupé dans les champs de mon grand-père. Je courais pieds nus jusqu'au ruisseau, sans penser à rien. Aujourd'hui, en fermant les yeux, je retrouve ce parfum et ces journées sans fin. Le temps a passé, mais ce souvenir est resté intact.", qs: [
      ["What did summer always start with?", "The smell of cut hay", ["A trip to the sea", "A school party"]],
      ["Where did the narrator run barefoot?", "To the stream", ["To the village", "To the barn"]],
      ["How does the narrator find these days again today?", "By closing the eyes and remembering the smell", ["By looking at old photos", "By visiting the fields"]],
      ["What is the mood of the text?", "Nostalgic", ["Angry", "Frightened"]]] },
    { t: "– Vous êtes réalisatrice depuis vingt ans. Qu'est-ce qui vous a donné envie de faire des films ? – Enfant, je passais mes samedis au cinéma de mon village. J'ai compris que les images pouvaient faire rire et pleurer en même temps. – Et votre conseil aux jeunes ? – Soyez curieux, regardez beaucoup de films, mais surtout, osez raconter vos propres histoires.", qs: [
      ["For how long has she been a director?", "Twenty years", ["Two years", "Fifty years"]],
      ["What made her want to make films?", "Her Saturdays at the village cinema", ["A school project", "A TV show"]],
      ["What did she learn about images?", "They can make people laugh and cry at once", ["They always tell the truth", "They need no words"]],
      ["What is her advice to young people?", "Be curious, watch films and dare to tell their own stories", ["Study law first", "Copy famous directors"]]] }
  ];
  const MOV = [
    ["Voltaire, Rousseau and Diderot belong to which period?", "The Enlightenment (Siècle des Lumières)", ["Romanticism", "Surrealism"]],
    ["Who wrote <i>Madame Bovary</i>, a famous realist novel?", "Gustave Flaubert", ["Émile Zola", "Victor Hugo"]],
    ["Who wrote the poems of <i>Les Fleurs du mal</i>?", "Charles Baudelaire", ["Arthur Rimbaud", "Alphonse de Lamartine"]],
    ["Which playwright wrote the tragedy <i>Phèdre</i>?", "Jean Racine", ["Molière", "Pierre Corneille"]],
    ["Which playwright wrote <i>Le Cid</i>?", "Pierre Corneille", ["Jean Racine", "Molière"]],
    ["Which author wrote <i>Germinal</i>, a novel about coal miners?", "Émile Zola", ["Stendhal", "Gustave Flaubert"]],
    ["Which author wrote <i>Le Rouge et le Noir</i>?", "Stendhal", ["Honoré de Balzac", "Alexandre Dumas"]],
    ["Romanticism put strong feelings and nature at the center. Which poet is a romantic?", "Alphonse de Lamartine", ["Émile Zola", "Jean Racine"]],
    ["Surrealism, with André Breton, explored...", "Dreams and the unconscious", ["Strict rules of theater", "Scientific realism"]],
    ["Which huge work, led by Diderot, tried to gather the knowledge of its time?", "L'Encyclopédie", ["Le Petit Larousse", "Les Fables"]],
    ["Classicism (17th century) valued order and rules. Which writer is a classic?", "Molière", ["Arthur Rimbaud", "Émile Zola"]]
  ];
  const FRL = [
    ["Léopold Sédar Senghor was a poet and also the first president of which country?", "Senegal", ["Mali", "Côte d'Ivoire"]],
    ["Aimé Césaire, a poet and politician, came from which island?", "Martinique", ["Haiti", "Madagascar"]],
    ["Who wrote <i>Une si longue lettre</i> (1979), a novel from Senegal?", "Mariama Bâ", ["Assia Djebar", "Gabrielle Roy"]],
    ["Gabrielle Roy wrote <i>Bonheur d'occasion</i>. Which country was she from?", "Canada", ["Belgium", "Senegal"]],
    ["Amin Maalouf, a member of the Académie française, was born in which country?", "Lebanon", ["Morocco", "Haiti"]],
    ["Maryse Condé, a famous novelist, came from which French island region?", "Guadeloupe", ["Corsica", "La Réunion"]],
    ["Assia Djebar, writer and filmmaker, came from which country?", "Algeria", ["Tunisia", "Mali"]],
    ["What is the Académie française?", "An institution of 40 members that watches over the French language", ["A French school of art", "A national library"]],
    ["Which day each year celebrates the French language and the Francophonie around the world?", "March 20", ["July 14", "January 1"]],
    ["What does <i>la négritude</i>, a movement started by Césaire and Senghor, celebrate?", "Black identity and culture", ["French railways", "Mountain sports"]],
    ["Tahar Ben Jelloun, who writes in French, was born in which country?", "Morocco", ["Egypt", "Congo"]]
  ];
  const ESS = [
    ["What is the <i>introduction</i> of an essay for?", "To present the topic and the plan", ["To give the final verdict only", "To list quotations"]],
    ["What is <i>la problématique</i>?", "The main question the essay will explore", ["The conclusion", "A list of sources"]],
    ["What does <i>une accroche</i> do?", "It catches the reader's interest at the start", ["It ends the essay", "It lists the evidence"]],
    ["What is <i>la thèse</i> in an essay?", "The position or idea you defend", ["The last paragraph", "A summary of someone else's text"]],
    ["What is <i>l'antithèse</i>?", "The opposite point of view, which you consider", ["The first example", "A synonym"]],
    ["What is <i>la synthèse</i>?", "A resolution that weighs and combines both views", ["A copy of the introduction", "A list of quotations"]],
    ["What is <i>une citation</i>?", "Words from another person, quoted exactly", ["A date", "A footnote"]],
    ["What is a <i>paragraphe</i> usually built around?", "One main idea with support", ["Ten ideas at once", "Only quotations"]],
    ["What goes in <i>la conclusion</i>?", "An answer to the question and an opening to a wider idea", ["New long arguments", "Only the title"]],
    ["What is <i>un connecteur logique</i>?", "A word linking ideas, such as donc, mais, car", ["A type of verb", "A kind of rhyme"]]
  ];
  const TR23 = [
    ["How do you say \"I'm going to the dentist's\"?", "Je vais chez le dentiste.", ["Je vais au dentiste.", "Je vais à dentiste."]],
    ["How do you say \"She is a doctor\"?", "Elle est médecin.", ["Elle est un médecin.", "Elle a médecin."]],
    ["How do you say \"I play the guitar\"?", "Je joue de la guitare.", ["Je joue à la guitare.", "Je joue la guitare."]],
    ["How do you say \"I play soccer\"?", "Je joue au foot.", ["Je joue du foot.", "Je joue le foot."]],
    ["How do you say \"Everyone is here\"?", "Tout le monde est là.", ["Tout le monde sont là.", "Tous les monde est là."]],
    ["How do you say \"on Mondays\" (every Monday)?", "le lundi", ["lundi", "sur lundi"]],
    ["How do you say \"in 2020\"?", "en 2020", ["dans 2020", "à 2020"]],
    ["How do you say \"I want you to come\"?", "Je veux que tu viennes.", ["Je veux toi venir.", "Je veux que tu viens."]],
    ["How do you say \"She told me to wait\"?", "Elle m'a dit d'attendre.", ["Elle m'a dit attendre.", "Elle m'a dit à attendre."]],
    ["How do you say \"I like swimming\"?", "J'aime nager.", ["J'aime nageant.", "J'aime la nager."]]
  ];
  const SUB23 = [
    ["Bien qu'il ___ fatigué, il travaille encore. (être)", "soit", ["est", "sera"]],
    ["Je reste ici parce que tu ___ mon ami. (être)", "es", ["sois", "serais"]],
    ["Parle plus fort pour que tout le monde t'___. (entendre)", "entende", ["entend", "entendra"]],
    ["Après que nous ___ mangé, nous sommes sortis. (avoir)", "avons", ["ayons", "avions"]],
    ["Attends jusqu'à ce qu'il ___. (venir)", "vienne", ["vient", "viendra"]],
    ["Je viendrai à condition que tu ___ aussi. (venir)", "viennes", ["viens", "viendras"]],
    ["Puisque tu ___ libre, aide-moi. (être)", "es", ["sois", "serais"]],
    ["Il est parti sans que personne le ___. (voir)", "voie", ["voit", "verra"]],
    ["Dès que j'___ fini, je t'appelle. (avoir)", "ai", ["aie", "aurais"]],
    ["Avant qu'il ne ___ trop tard, décide-toi. (être)", "soit", ["est", "sera"]],
    ["Quoique nous ___ pauvres, nous sommes heureux. (être)", "soyons", ["sommes", "serons"]]
  ];
  const REP23 = [
    ["Il a dit : « Je suis fatigué. » → Il a dit qu'il ___ fatigué.", "était", ["est", "sera"]],
    ["Elle a dit : « Je viendrai demain. » → Elle a dit qu'elle ___ le lendemain.", "viendrait", ["viendra", "vient"]],
    ["Marc a demandé : « Tu as fini ? » → Marc a demandé si j'___ fini.", "avais", ["ai", "aurai"]],
    ["Il a dit : « Je pars ce soir. » → Il a dit qu'il ___ ce soir-là.", "partait", ["part", "partira"]],
    ["Elle a dit : « J'ai mangé hier. » → Elle a dit qu'elle ___ mangé la veille.", "avait", ["a", "aura"]],
    ["Il a dit : « Il pleut. » → Il a dit qu'il ___.", "pleuvait", ["pleut", "pleuvra"]],
    ["Elle a dit : « J'irai à Paris. » → Elle a dit qu'elle ___ à Paris.", "irait", ["ira", "va"]],
    ["Il m'a demandé : « Que fais-tu ? » → Il m'a demandé ce que je ___.", "faisais", ["fais", "ferai"]],
    ["Ils ont dit : « Nous n'avons pas compris. » → Ils ont dit qu'ils n'___ pas compris.", "avaient", ["ont", "auront"]]
  ].map(([q, a, w]) => ["Reported speech after a past verb (follow the tense-shift rule). " + q, a, w]);
  const PASV = [
    ["Ce roman ___ par des millions de lecteurs. (lire, present passive)", "est lu", ["lit", "a lu"]],
    ["La tour Eiffel a été ___ en 1889. (construire)", "construite", ["construit", "construits"]],
    ["Les devoirs seront ___ demain. (corriger)", "corrigés", ["corrigé", "corrigées"]],
    ["Le voleur a été ___ par la police. (arrêter)", "arrêté", ["arrêtée", "arrêtés"]],
    ["En Belgique, le français ___. (se parler)", "se parle", ["se parlent", "parle"]],
    ["Ces produits ___ partout. (se vendre)", "se vendent", ["se vend", "vendent"]],
    ["Les fenêtres ont été ___ par le vent. (ouvrir)", "ouvertes", ["ouverts", "ouvert"]],
    ["Rewrite in the passive : « Le maire ouvre la fête. »", "La fête est ouverte par le maire.", ["La fête ouvre le maire.", "Le maire est ouvert la fête."]],
    ["Rewrite in the passive : « On a volé mon vélo. »", "Mon vélo a été volé.", ["Mon vélo a volé.", "Mon vélo avait volé par moi."]]
  ];
  const DBL = [
    ["– Tu m'envoies le fichier ? – Oui, je ___ envoie.", "te l'", ["me l'", "le te"]],
    ["– Il donne des fleurs à Marie ? – Oui, il ___ donne.", "lui en", ["en lui", "leur le"]],
    ["– Tu prêtes ton vélo à tes amis ? – Oui, je ___ prête.", "le leur", ["leur le", "les leur"]],
    ["– Elle te montre les photos ? – Oui, elle ___ montre.", "me les", ["les me", "m'en"]],
    ["– Il y a des pommes dans le panier ? – Oui, il ___ a.", "y en", ["en y", "y les"]],
    ["– Tu as donné le cadeau à Paul ? – Oui, je ___ ai donné.", "le lui", ["lui le", "l'en"]],
    ["– Ils vous ont expliqué la règle ? – Oui, ils ___ ont expliquée.", "nous l'", ["l'nous", "nous la"]],
    ["Donne-moi du pain ! → Donne-___ !", "m'en", ["moi-en", "en-moi"]],
    ["Ne me donne pas le livre ! → Ne ___ donne pas !", "me le", ["le me", "moi le"]],
    ["Montre-nous les cartes ! → Montre-___ !", "les-nous", ["nous-les", "moi-les"]]
  ];
  const NEGP = [
    ["possible", "impossible", ["inpossible", "dépossible"]], ["lisible", "illisible", ["inlisible", "dislisible"]],
    ["content", "mécontent", ["incontent", "décontent"]], ["heureux", "malheureux", ["inheureux", "déheureux"]],
    ["faire", "défaire", ["infaire", "mafaire"]], ["connu", "inconnu", ["déconnu", "illconnu"]],
    ["légal", "illégal", ["inlégal", "délégal"]], ["responsable", "irresponsable", ["inresponsable", "déresponsable"]],
    ["poli", "impoli", ["inpoli", "mapoli"]], ["habiller", "déshabiller", ["inhabiller", "mahabiller"]],
    ["réel", "irréel", ["inréel", "illréel"]], ["mobile", "immobile", ["inmobile", "démobile"]],
    ["régulier", "irrégulier", ["inrégulier", "illrégulier"]]
  ].map(([a, b, w]) => [`Make the opposite of <b>${a}</b> with a prefix.`, b, w]);
  const TYP23 = [
    [T("researcher", "(le ___)"), "chercheur"], [T("proof", "(la ___)"), "preuve"], [T("subtitles", "(les ___)"), "sous-titres"], [T("customs", "(la ___)"), "douane"],
    [T("refund", "(le ___)"), "remboursement"], [T("complaint", "(la ___)"), "réclamation"], [T("freedom", "(la ___)"), "liberté"], [T("truth", "(la ___)"), "vérité"],
    [T("doubt", "(le ___)"), "doute"], [T("delay", "(le ___)"), "retard"], [T("brand", "(la ___)"), "marque"], [T("film director", "(le ___)"), "réalisateur"], [T("result", "(le ___)"), "résultat"]
  ];
  const L23 = [
    les("Ideas and philosophy", vocab(B23.phil), tVocab(B23.phil)),
    les("Science and research", vocab(B23.sci), tVocab(B23.sci)),
    les("Cinema and film-making", vocab(B23.cine), tVocab(B23.cine)),
    les("Travel and journeys", vocab(B23.travel), tVocab(B23.travel)),
    les("Consumers and advertising", vocab(B23.shop), tVocab(B23.shop)),
    les("Memory and storytelling", vocab(B23.memo), tVocab(B23.memo)),
    les("Sayings about effort and mood", mean(EFF, "Do not translate word by word. Imagine the situation and the feeling behind it.", "The saying describes effort, laziness, mood or ease with a funny picture. Which feeling or situation fits?", "Example: 'Avoir la tête dans les nuages' means to daydream. Now think about yours."),
      tg("Effort and mood", "💪", "These sayings talk about work, laziness and feelings with surprising pictures.", "Mettre la main à la pâte<br>Avoir le cafard", "To help with the work. To feel blue.", "Think of a story where you could say it.")),
    les("Reading: editorial, memoir, interview", mc(readQ(READ23), readH, 2), [S("Reading harder texts", "📖", "An editorial wants to convince you. A memoir remembers the past. An interview uses questions and answers."), S("Tone and purpose", "🎯", "Ask: is the writer trying to convince, to remember, or to inform?"), S("Tip", "🧠", "Verbs like <i>il faut</i>, <i>devoir</i> and <i>exiger</i> often show a call to action.")]),
    les("Literary periods and writers", mc(MOV, ["Think about the century and the style: rules and order, feelings, daily-life realism, or dreams.", "Link a famous title or name to its period. Classic: 1600s. Enlightenment: 1700s. Romantic, realist: 1800s. Surrealist: 1900s.", "Example: George Sand wrote <i>La Mare au diable</i>, a 19th-century novel. Now think about yours."], 2),
      [S("Periods", "🕰️", "French literature is taught by period: Classicism, Enlightenment, Romanticism, Realism, Symbolism, Surrealism."), S("Names", "✒️", "Racine, Corneille and Molière are classics. Voltaire and Diderot are Enlightenment. Hugo is a Romantic. Zola and Flaubert are realists."), S("Tip", "🧠", "Each movement reacts to the one before it.")]),
    les("Francophone writers", mc(FRL, ["Which part of the French-speaking world: Africa, the Caribbean, Canada, or the Middle East?", "Many great authors write in French outside France. Match the author to the place or the idea.", "Example: Ahmadou Kourouma was a novelist from Côte d'Ivoire. Now think about yours."], 2),
      [S("French beyond France", "🌍", "French literature is written all over the world: Senegal, Martinique, Québec, Lebanon, Algeria and more."), S("A voice", "📣", "Senghor and Césaire started <b>la négritude</b>, a movement about Black identity and culture."), S("Tip", "🧠", "Link each author to a country on the map.")]),
    les("Building an essay", mc(ESS, ["Think about where the part appears in an essay: the start, the middle or the end.", "An essay has an introduction with a question, a development with arguments and a conclusion that answers. Pick the best role.", "Example: 'Le plan' shows the order in which the ideas will appear. Now think about yours."], 2),
      [S("Parts of an essay", "📝", "An essay has an <b>introduction</b>, a <b>développement</b> and a <b>conclusion</b>."), S("Debate shape", "⚖️", "A classic plan has a <b>thèse</b> (your idea), an <b>antithèse</b> (the other side) and a <b>synthèse</b> (a balanced answer)."), S("Tip", "🧠", "Use one paragraph for each main idea.")]),
    les("English habits, French rules", mc(TR23, ["Do not translate word by word. Which preposition or structure does French really use?", "Watch for prepositions (à, de, chez, en), articles, and verbs after vouloir que or dire de.", "Example: 'I'm going to Paris' is 'Je vais à Paris', and 'I'm going to Anna's' is 'Je vais chez Anna'. Now do yours."], 2),
      tg("Translation traps", "🪤", "English structures often fail when copied into French.", "Je vais chez le médecin.<br>Elle est professeur.", "Chez + person. No article for jobs.", "Learn whole phrases, not words.")),
    les("Subjunctive after conjunctions", mc(SUB23, ["Does the conjunction show a fact (because, since, as soon as) or a purpose, condition or limit (so that, although, until)?", "Fact conjunctions take the indicative. Bien qu', pour que, jusqu'à ce que, à condition que, sans que, avant que and quoique take the subjunctive.", "Example: 'Pour que tu ___ (comprendre), je répète.' Purpose, so the subjunctive: comprennes. Now do yours."], 2),
      tg("Conjunctions and mood", "🎚️", "Some conjunctions need the subjunctive, others the indicative.", "Bien qu'il pleuve…<br>Parce qu'il pleut…", "Although (subjunctive). Because (indicative).", "<i>Après que</i> takes the indicative, even though many people say it wrongly.")),
    les("Reported speech", mc(REP23, ["Is the introducing verb in the past? Then the tenses inside the sentence also move back.", "Present becomes imparfait. Futur becomes conditionnel. Passé composé becomes plus-que-parfait. Time words change too (demain → le lendemain).", "Example: 'Il a dit : « Je mange. »' becomes 'Il a dit qu'il mangeait.' Now do yours."], 2),
      tg("Indirect speech", "💬", "When you report words, the tenses shift back.", "« Je pars. » → Il a dit qu'il partait.", "Present becomes imparfait.", "Time words shift too: <i>hier</i> becomes <i>la veille</i>.")),
    les("Passive voice and alternatives", mc(PASV, ["Who does the action? Is the subject doing the action or receiving it?", "The passive is être + past participle, which agrees with the subject. French often avoids it with <i>se</i> + verb or with <i>on</i>.", "Example: 'Le livre a été ___ (écrire) par Hugo' - the participle agrees with 'le livre': écrit. Now do yours."], 2),
      tg("Passive and its friends", "🔄", "The passive uses <b>être + participle</b>. French often prefers <b>on</b> or <b>se</b> + verb.", "La porte est fermée.<br>Ça se dit comme ça.", "Passive. Pronominal with a passive meaning.", "The participle agrees with the subject.")),
    les("Double pronouns", mc(DBL, ["Which pronouns replace the direct object (le, la, les) and the indirect one (me, te, lui, nous, vous, leur)? Which goes first?", "Order: me, te, nous, vous come before le, la, les; le, la, les come before lui and leur; y comes before en. For commands without 'ne', switch the order.", "Example: 'Je donne le livre à Léa' becomes 'Je le lui donne'. Now do yours."], 2),
      tg("Pronoun order", "🧩", "You can use two pronouns together. The order is fixed.", "Je te le dis.<br>Il le lui donne.<br>Il y en a.", "me/te/nous/vous + le/la/les, then lui/leur, then y, then en.", "Say it aloud. French pronoun order sounds natural once you know it.")),
    les("Prefixes of opposites", mc(NEGP, ["Which prefix gives the opposite idea: in-, im-, il-, ir-, dé-, mé-, mal-?", "Before b, m, p use im-; before l use il-; before r use ir-. Many verbs use dé- to reverse an action.", "Example: 'mortel' becomes 'immortel', and 'monter' becomes 'démonter'. Now do yours."], 2),
      tg("Making opposites", "↔️", "Prefixes can reverse the meaning.", "possible → impossible<br>habiller → déshabiller<br>content → mécontent", "Same root, opposite sense.", "Check the spelling: <i>ill-</i>, <i>imm-</i>, <i>irr-</i> are doubled.")),
    les("Type the word", typed(TYP23, "Think about the vocabulary of this level: science, film, travel, shopping, ideas.", "Example: 'Type in French: stay (le ___)' would be 'séjour'. Now type yours. (Accents are optional.)"), [S("Typing practice", "⌨️", "You type the French word for what you see."), S("Remember", "🧠", "Some words are masculine (le) and some feminine (la), but you type only the word."), S("Tip", "✍️", "Accents are optional here.")])
  ];
  L23.push(MIX("Mixed practice", L23.slice(0, 18), [L23[7], L23[12], L23[15]]));
  L23.push(MIX("Level 23 Challenge", L23.slice(0, 18), [L23[9], L23[13], L23[16]]));

  // =====================================================  LEVEL 24
  const B24 = {
    pol: BK("Politics and the world", [["l'ONU", "the UN (United Nations)"], ["l'Union européenne", "the European Union"], ["le traité", "treaty"], ["la frontière", "border"], ["l'immigration", "immigration"], ["la citoyenneté", "citizenship"], ["la souveraineté", "sovereignty"], ["la diplomatie", "diplomacy"], ["le sommet", "summit"], ["la mondialisation", "globalization"], ["l'accord", "agreement"], ["l'ambassade", "embassy"]], { tip: "<b>Un sommet</b> is a mountain top and also a meeting of leaders. <b>L'ONU</b> is said \"loh-nü\"." }),
    soc: BK("Society and social issues", [["l'inégalité", "inequality"], ["la précarité", "insecurity (job, money)"], ["l'intégration", "integration"], ["le harcèlement", "harassment, bullying"], ["la fracture numérique", "digital divide"], ["l'exclusion", "exclusion"], ["l'engagement", "commitment, involvement"], ["la laïcité", "secularism"], ["la parité", "gender parity"], ["le vivre-ensemble", "living together (social harmony)"], ["la cohésion", "cohesion"], ["la discrimination", "discrimination"]], { tip: "<b>La laïcité</b> is a key French idea: the state is neutral about religion. <b>Le vivre-ensemble</b> is about how different people live side by side." }),
    arts: BK("Art and museums", [["la peinture", "painting (the art)"], ["le chef-d'œuvre", "masterpiece"], ["le vernissage", "opening of an exhibition"], ["l'exposition", "exhibition"], ["la sculpture", "sculpture"], ["le courant", "movement, trend"], ["le tableau", "painting (a picture)"], ["la toile", "canvas"], ["le portrait", "portrait"], ["le paysage", "landscape"], ["l'atelier", "studio, workshop"], ["le mécène", "patron of the arts"]], { tip: "<b>Un tableau</b> is a painting you can hang, <b>la peinture</b> is the art or the paint. <b>Un vernissage</b> is a party for the opening of an exhibition." }),
    health: BK("Health and science today", [["le vaccin", "vaccine"], ["la recherche", "research"], ["le don d'organes", "organ donation"], ["la santé publique", "public health"], ["le dépistage", "screening, testing"], ["l'intelligence artificielle", "artificial intelligence"], ["la génétique", "genetics"], ["l'ordonnance", "prescription"], ["le traitement", "treatment"], ["l'espérance de vie", "life expectancy"], ["la prévention", "prevention"], ["le médicament", "medication"]], { tip: "<b>L'intelligence artificielle</b> is often shortened to <b>l'IA</b>. <b>Une ordonnance</b> is what a doctor writes for a pharmacy." }),
    opin: BK("Verbs for arguing", [["nuancer", "to add nuance, to qualify"], ["avancer", "to put forward (an argument)"], ["réfuter", "to refute"], ["contester", "to challenge, to dispute"], ["admettre", "to admit, to concede"], ["remettre en question", "to call into question"], ["souligner", "to underline, to stress"], ["déplorer", "to deplore, to regret"], ["prôner", "to advocate"], ["dénoncer", "to denounce, to expose"], ["plaider pour", "to argue in favor of"], ["nier", "to deny"]], { tip: "Good essays use precise verbs: instead of \"dire que\", try <b>souligner que</b>, <b>admettre que</b> or <b>nuancer</b>." }),
    jobs: BK("Professions", [["l'avocat", "lawyer"], ["l'ingénieur", "engineer"], ["le comptable", "accountant"], ["l'infirmier", "nurse"], ["l'architecte", "architect"], ["le traducteur", "translator"], ["l'artisan", "craftsperson"], ["le fonctionnaire", "civil servant"], ["le cadre", "manager, executive"], ["l'entrepreneur", "entrepreneur"], ["le notaire", "notary"], ["le pharmacien", "pharmacist"]], { tip: "Many jobs have a feminine form: <b>une avocate</b>, <b>une ingénieure</b>, <b>une infirmière</b>. Some stay the same: <b>une architecte</b>." })
  };
  const PRV = [
    ["Petit à petit, l'oiseau fait son nid.", "Slowly, with patience, you reach a goal.", ["Birds are always busy.", "Small things are not important."]],
    ["Qui ne tente rien n'a rien.", "If you never try, you will gain nothing.", ["Whoever has nothing does not try.", "Trying costs a lot."]],
    ["L'appétit vient en mangeant.", "The more you do something, the more you want to.", ["Eat before you get hungry.", "Good chefs are hungry."]],
    ["Chat échaudé craint l'eau froide.", "Once burned, twice shy.", ["Cats hate water.", "Cold water is harmless."]],
    ["Pierre qui roule n'amasse pas mousse.", "Someone who keeps moving does not settle or collect things.", ["Stones are heavy.", "Moss grows on rocks."]],
    ["Mieux vaut tard que jamais.", "Doing something late is better than never.", ["Late is better than early.", "Never be late."]],
    ["L'habit ne fait pas le moine.", "You cannot judge by appearances.", ["Monks wear plain clothes.", "Clothes are important."]],
    ["Rira bien qui rira le dernier.", "Whoever laughs last laughs best.", ["Laughing is good for you.", "The last one to arrive wins."]],
    ["Tel père, tel fils.", "Children often resemble their parents.", ["Fathers are always right.", "Sons never listen."]],
    ["Les petits ruisseaux font les grandes rivières.", "Small contributions add up to big results.", ["Rivers always start in the mountains.", "Streams are better than rivers."]]
  ];
  const READ24 = [
    { t: "Dans une enquête fictive menée dans un lycée, 62 % des élèves disent lire au moins un livre par mois, mais seulement 28 % lisent un journal. Les auteurs de l'enquête notent que les élèves passent plus de trois heures par jour sur leur téléphone. Certains s'en inquiètent ; d'autres soulignent que les écrans donnent aussi accès à une grande quantité de textes. L'enquête ne permet pas de conclure que l'écran remplace le livre : elle montre plutôt que les habitudes de lecture changent.", qs: [
      ["What percentage of students read at least one book a month?", "62 %", ["28 %", "3 %"]],
      ["How much time do students spend on their phones, according to the text?", "More than three hours a day", ["About thirty minutes a day", "Only on weekends"]],
      ["What can the survey NOT conclude?", "That screens replace books", ["That students read nothing", "That phones are free"]],
      ["What is the attitude of the author?", "Balanced and nuanced", ["Angry and critical", "Sad and hopeless"]]] },
    { t: "Certains disent que la poésie est inutile. Quelle erreur ! Un poème n'a pas besoin de servir à quelque chose pour compter : il nous apprend à regarder le monde autrement. Sans poètes, nos mots seraient plus pauvres, et nos émotions aussi.", qs: [
      ["Who is the author arguing against?", "People who say poetry is useless", ["People who write poems", "Teachers of French"]],
      ["What is the author's main argument?", "Poems teach us to see the world differently", ["Poems are easy to write", "Poems earn money"]],
      ["What would happen without poets?", "Our words and emotions would be poorer", ["We would speak more clearly", "We would read less news"]],
      ["What is the tone?", "Passionate and persuasive", ["Neutral and scientific", "Funny and silly"]]] },
    { t: "Monsieur Dupont, grand amateur de ponctualité, arriva à la réunion avec une heure de retard. « Excusez-moi, dit-il, j'ai mis très longtemps à régler mon réveil pour être à l'heure ! » Tout le monde éclata de rire, sauf le directeur, qui regarda sa montre en soupirant.", qs: [
      ["What does Monsieur Dupont claim to love?", "Being on time", ["Meetings", "Clocks as gifts"]],
      ["How late was he?", "One hour", ["Ten minutes", "A whole day"]],
      ["What makes his excuse ironic?", "He spent a long time setting his alarm and was still late", ["He lied about the meeting", "He forgot his watch"]],
      ["How does the director react?", "He sighs and looks at his watch", ["He laughs loudly", "He congratulates Dupont"]]] }
  ];
  const MOD = [
    ["Which author wrote <i>La Peste</i> and received the Nobel Prize in Literature in 1957?", "Albert Camus", ["Marcel Proust", "Jean-Paul Sartre"]],
    ["Who wrote <i>À la recherche du temps perdu</i>, a very long novel about memory?", "Marcel Proust", ["Albert Camus", "Annie Ernaux"]],
    ["Which French writer won the Nobel Prize in Literature in 2022?", "Annie Ernaux", ["Patrick Modiano", "Simone de Beauvoir"]],
    ["Which writer won the Nobel Prize in Literature in 2014?", "Patrick Modiano", ["Annie Ernaux", "Albert Camus"]],
    ["Who wrote <i>Le Deuxième Sexe</i>, an essay about women's place in society?", "Simone de Beauvoir", ["Marguerite Duras", "Annie Ernaux"]],
    ["Who was the first woman elected to the Académie française, in 1980?", "Marguerite Yourcenar", ["Simone de Beauvoir", "Colette"]],
    ["Which philosopher wrote <i>L'existentialisme est un humanisme</i>?", "Jean-Paul Sartre", ["Albert Camus", "Marcel Proust"]],
    ["Which film festival awards the Palme d'or each year?", "The Cannes Film Festival", ["The Angoulême Festival", "The Avignon Festival"]],
    ["Which director made <i>Les Quatre Cents Coups</i> (1959), a landmark of the French New Wave?", "François Truffaut", ["Jean-Pierre Jeunet", "Luc Besson"]],
    ["Which 2001 film by Jean-Pierre Jeunet follows a dreamy young woman in Montmartre?", "Le Fabuleux Destin d'Amélie Poulain", ["Les Choristes", "Intouchables"]],
    ["Which 2011 French comedy-drama about an unlikely friendship was a huge international hit?", "Intouchables", ["Les Choristes", "La Haine"]]
  ];
  const RHE = [
    ["« Ce n'est pas mauvais ! » (meaning: it is very good)", "Litotes (saying less to mean more)", ["Hyperbole", "Metonymy"]],
    ["« Je bois un verre. » (verre = the drink inside)", "Metonymy", ["Oxymoron", "Irony"]],
    ["« Quel temps magnifique ! » said during a storm", "Irony", ["Litotes", "Gradation"]],
    ["« Il a marché, il a couru, il a volé vers la ligne d'arrivée. »", "Gradation (increasing intensity)", ["Antithesis", "Metonymy"]],
    ["« Je veux la paix. Je veux la justice. Je veux l'égalité. » (same start repeated)", "Anaphora", ["Oxymoron", "Litotes"]],
    ["« Il nous a quittés » said instead of saying that someone died", "Euphemism", ["Hyperbole", "Anaphora"]],
    ["A text that mocks society's faults with humor is...", "Satirical", ["Lyrical", "Nostalgic"]],
    ["A text full of personal emotion, as in many poems, has which tone?", "Lyrical", ["Satirical", "Polemical"]],
    ["A text that praises someone is...", "Eulogistic (élogieux)", ["Polemical", "Ironic"]],
    ["A text that attacks an idea in a heated debate is...", "Polemical", ["Lyrical", "Eulogistic"]],
    ["A text expressing sad longing for the past is...", "Nostalgic", ["Satirical", "Polemical"]]
  ].map(([q, a, w]) => ["Name the device or tone. " + q, a, w]);
  const AGR = [
    ["Which phrase expresses complete agreement?", "Je suis tout à fait d'accord.", ["Je ne suis pas convaincu.", "Ça dépend."]],
    ["Which phrase expresses total disagreement?", "Pas du tout !", ["Absolument !", "Tout à fait."]],
    ["Which phrase expresses partial agreement, 'yes, but'?", "Certes, mais…", ["Bien sûr, évidemment !", "Jamais de la vie !"]],
    ["Which phrase expresses doubt?", "Je n'en suis pas si sûr.", ["C'est évident.", "Sans aucun doute."]],
    ["Which phrase means 'it depends'?", "Cela dépend des cas.", ["Cela va de soi.", "Cela ne fait aucun doute."]],
    ["Which phrase introduces your personal opinion?", "À mon avis,", ["Selon les médias hier,", "Il paraît que"]],
    ["Which phrase politely disagrees?", "Je ne partage pas tout à fait votre point de vue.", ["Vous avez tort !", "Vous ne comprenez rien !"]],
    ["Which phrase gives a counter-argument?", "On pourrait objecter que…", ["Il est évident que…", "Tout le monde sait que…"]],
    ["Which phrase asks for clarification?", "Que voulez-vous dire exactement ?", ["Cela va sans dire.", "Je m'en doutais."]],
    ["Which phrase means 'on the other hand'?", "D'un autre côté,", ["Du même coup,", "Dans ce cas,"]],
    ["Which phrase gives yourself a moment to think?", "Eh bien… comment dire…", ["Absolument pas.", "Tout à fait d'accord."]]
  ];
  const CRE = [
    ["In 1804, which country became the first independent Black-led republic and a French-speaking nation?", "Haiti", ["Senegal", "Jamaica"]],
    ["What is the capital of Haiti?", "Port-au-Prince", ["Fort-de-France", "Pointe-à-Pitre"]],
    ["Haitian Creole is a language that mixes...", "French-based vocabulary with African influences", ["Spanish with English", "Latin with German"]],
    ["The Cajuns of Louisiana are descended from people who left which region?", "Acadia (Acadie)", ["Alsace", "Brittany"]],
    ["Which Indian Ocean country, with a French-based Creole, has Port-Louis as its capital?", "Mauritius", ["Madagascar", "Comoros"]],
    ["Which Pacific island group, with Papeete as its main city, belongs to France?", "French Polynesia (Tahiti)", ["Hawaii", "Fiji"]],
    ["What does the <i>Organisation internationale de la Francophonie</i> bring together?", "Countries and governments that share the French language", ["French car makers", "European airlines"]],
    ["Which Southeast Asian country has a famous baguette sandwich, a trace of French history?", "Vietnam", ["Japan", "India"]],
    ["In Lebanon, French is widely used alongside which language?", "Arabic", ["Turkish", "Hebrew"]],
    ["Which country on the Gulf of Guinea, with Yaoundé as capital, uses both French and English officially?", "Cameroon", ["Gabon", "Benin"]],
    ["Which Indian Ocean island is a French overseas department and has the volcano Piton de la Fournaise?", "La Réunion", ["Mauritius", "Seychelles"]]
  ];
  const CEQ = [
    ["___ me plaît, c'est ta franchise.", "Ce qui", ["Ce que", "Ce dont"]],
    ["Je ne comprends pas ___ tu dis.", "ce que", ["ce qui", "ce dont"]],
    ["Voilà ___ j'ai besoin.", "ce dont", ["ce que", "ce qui"]],
    ["Dis-moi ___ s'est passé hier.", "ce qui", ["ce que", "ce dont"]],
    ["Elle a oublié ___ je lui avais demandé.", "ce que", ["ce qui", "ce dont"]],
    ["C'est exactement ___ nous rêvions.", "ce dont", ["ce qui", "ce que"]],
    ["Tout ___ brille n'est pas or.", "ce qui", ["ce que", "ce dont"]],
    ["Je sais ___ tu penses.", "ce que", ["ce qui", "ce dont"]],
    ["C'est ___ elle se souvient le mieux.", "ce dont", ["ce qui", "ce que"]],
    ["___ est surprenant, c'est sa patience.", "Ce qui", ["Ce que", "Ce dont"]]
  ];
  const VRB = [
    ["How do you say \"to take an exam\"?", "passer un examen", ["prendre un examen", "manquer un examen"]],
    ["How do you say \"to spend time\" with friends?", "passer du temps", ["dépenser du temps", "finir du temps"]],
    ["How do you say \"to miss the train\"?", "rater le train", ["manquer au train", "oublier le train"]],
    ["How do you say \"to make a decision\"?", "prendre une décision", ["faire une décision", "donner une décision"]],
    ["How do you say \"to make a mistake\"?", "faire une erreur", ["prendre une erreur", "donner une erreur"]],
    ["How do you say \"to become a doctor\"?", "devenir médecin", ["venir médecin", "obtenir médecin"]],
    ["How do you say \"to attend a class\" (follow it)?", "suivre un cours", ["attendre un cours", "regarder un cours"]],
    ["How do you say \"to pay attention\"?", "faire attention", ["payer attention", "donner attention"]],
    ["How do you say \"to take a photo\"?", "prendre une photo", ["porter une photo", "tenir une photo"]],
    ["How do you say \"to ask a question\"?", "poser une question", ["demander une question", "faire une question"]],
    ["How do you say \"to get better\" (after being ill)?", "aller mieux", ["obtenir mieux", "devenir bon"]]
  ];
  const SUB24 = [
    ["Il faut que nous ___ à l'heure. (être)", "soyons", ["sommes", "serons"]],
    ["Il faut que vous ___ patient. (être)", "soyez", ["êtes", "serez"]],
    ["Je veux qu'ils ___ du courage. (avoir)", "aient", ["ont", "auront"]],
    ["Il est important que tu ___ la vérité. (savoir)", "saches", ["sais", "sauras"]],
    ["Il faut que je ___ mes devoirs. (faire)", "fasse", ["fais", "ferai"]],
    ["Je ne crois pas qu'elle ___ venir. (pouvoir)", "puisse", ["peut", "pourra"]],
    ["Il faut que nous ___ plus tôt. (partir)", "partions", ["partons", "partirons"]],
    ["Il est nécessaire que vous ___ de l'eau. (boire)", "buviez", ["buvez", "boirez"]],
    ["Je veux que tu ___ au marché. (aller)", "ailles", ["vas", "iras"]],
    ["Il faut qu'on ___ ce film. (voir)", "voie", ["voit", "verra"]]
  ];
  const PSI = [
    ["Which form is the passé simple of <b>être</b> (il)?", "fut", ["est", "était"]],
    ["Which form is the passé simple of <b>avoir</b> (il)?", "eut", ["a eu", "avait"]],
    ["Which form is the passé simple of <b>faire</b> (ils)?", "firent", ["font", "faisaient"]],
    ["Which form is the passé simple of <b>venir</b> (il)?", "vint", ["vient", "venait"]],
    ["Which form is the passé simple of <b>voir</b> (elle)?", "vit", ["voit", "voyait"]],
    ["Which form is the passé simple of <b>prendre</b> (il)?", "prit", ["prend", "prenait"]],
    ["Which form is the passé simple of <b>aller</b> (ils)?", "allèrent", ["allaient", "vont"]],
    ["Which form is the passé simple of <b>pouvoir</b> (il)?", "put", ["peut", "pouvait"]],
    ["Which form is the passé simple of <b>vouloir</b> (ils)?", "voulurent", ["veulent", "voulaient"]],
    ["In « Il ouvrit la porte et entra. », which tense is used?", "Passé simple (a literary past tense)", ["Passé composé", "Imparfait"]],
    ["Where do you mostly see the passé simple?", "In novels and history books", ["In text messages", "In everyday speech"]]
  ];
  const PQP = [
    ["Quand il est arrivé, nous ___ déjà mangé. (avoir)", "avions", ["avons", "aurons"]],
    ["Dès que j'___ terminé, je t'appellerai. (avoir, futur antérieur)", "aurai", ["avais", "aurais"]],
    ["Elle a dit qu'elle s'___ trompée. (être)", "était", ["sera", "est"]],
    ["Demain à midi, ils ___ déjà partis. (être, futur antérieur)", "seront", ["étaient", "sont"]],
    ["Si j'___ su, je serais venu. (avoir)", "avais", ["aurai", "ai"]],
    ["Quand tu ___ fini tes devoirs, tu pourras jouer. (avoir, futur antérieur)", "auras", ["avais", "aurais"]],
    ["Il cherchait ses clés parce qu'il les ___ perdues. (avoir)", "avait", ["aura", "a"]],
    ["Avant mon départ, j'___ fermé toutes les fenêtres. (avoir)", "avais", ["aurai", "ai"]],
    ["Lorsqu'elle ___ rentrée, nous dînerons. (être, futur antérieur)", "sera", ["était", "serait"]],
    ["Nous ne savions pas qu'il ___ parti. (être)", "était", ["sera", "est"]]
  ];
  const TYP24 = [
    [T("treaty", "(le ___)"), "traité"], [T("border", "(la ___)"), "frontière"], [T("lawyer", "(l'___)"), "avocat"], [T("engineer", "(l'___)"), "ingénieur"],
    [T("vaccine", "(le ___)"), "vaccin"], [T("prescription", "(l'___)"), "ordonnance"], [T("canvas", "(la ___)"), "toile"], [T("masterpiece", "(le ___-d'œuvre)"), "chef"],
    [T("to deny"), "nier"], [T("embassy", "(l'___)"), "ambassade"], [T("landscape", "(le ___)"), "paysage"], [T("accountant", "(le ___)"), "comptable"], [T("inequality", "(l'___)"), "inégalité"]
  ];
  const L24 = [
    les("Politics and the world", vocab(B24.pol), tVocab(B24.pol)),
    les("Society and social issues", vocab(B24.soc), tVocab(B24.soc)),
    les("Art and museums", vocab(B24.arts), tVocab(B24.arts)),
    les("Health and science today", vocab(B24.health), tVocab(B24.health)),
    les("Verbs for arguing", vocab(B24.opin), tVocab(B24.opin)),
    les("Professions", vocab(B24.jobs), tVocab(B24.jobs)),
    les("Proverbs", mean(PRV, "Do not translate word by word. A proverb gives advice about life.", "Ask yourself what general lesson the proverb teaches: patience, courage, caution, fairness?", "Example: 'Après la pluie, le beau temps' means good times follow bad ones. Now think about yours."),
      tg("French proverbs", "📜", "A <b>proverbe</b> is a short saying that gives advice.", "Petit à petit, l'oiseau fait son nid.", "Patience brings results.", "Learn each proverb with its meaning, then try to find an English one that is similar.")),
    les("Reading: survey, opinion, short story", mc(readQ(READ24), readH, 2), [S("AP-style reading", "📖", "You may meet data, opinion and fiction. Always ask: what is the main idea and what does the author think?"), S("Author's view", "🎯", "Look for strong words, repeated ideas and contrasts. Do they show anger, humor, balance?"), S("Tip", "🧠", "Irony says one thing and means another. Look for the gap.")]),
    les("Modern authors and films", mc(MOD, ["Think about the century: these works are from the 1900s and 2000s.", "Match the title to the person or the prize. Some works are novels, others essays or films.", "Example: Jean Anouilh wrote the play <i>Antigone</i>. Now think about yours."], 2),
      [S("Modern French culture", "🎬", "Writers like Camus, Beauvoir and Ernaux, and films by Truffaut and Jeunet, are known all over the world."), S("Prizes", "🏆", "Camus won the Nobel Prize in 1957. Annie Ernaux won it in 2022. The Cannes festival gives the Palme d'or."), S("Tip", "🧠", "Link a title to a face you can imagine, such as a plague, a big memory, a girl in Montmartre.")]),
    les("Rhetoric and tone", mc(RHE, ["Does the text say more, less, the opposite, or something else than it means?", "Names to know: irony (opposite meaning), litotes (understatement), euphemism (soft words), metonymy (a container for its content), gradation, anaphora.", "Example: « Il pleut des cordes » is an exaggeration, so it is hyperbole. Now think about yours."], 2),
      tg("Rhetorical devices", "🎤", "Authors use devices and a tone to influence their readers.", "Ce n'est pas mauvais ! (litote)<br>Quel beau temps ! (ironie, in a storm)", "Understatement. Opposite meaning.", "To find the tone, ask: is the author moved, mocking, angry, or praising?")),
    les("Agree, disagree, nuance", mc(AGR, ["What does the speaker want to do: agree, disagree, doubt, nuance or ask?", "Each phrase has a purpose. Match the purpose and the strength: tout à fait is very strong, certes… mais is partial.", "Example: 'Je suis convaincu que…' expresses strong belief. Now think about yours."], 2),
      tg("Debate phrases", "🗣️", "In a debate you agree, disagree and nuance.", "Je suis d'accord.<br>Certes, mais…<br>Pas du tout.", "Agreement. Partial agreement. Disagreement.", "Nuance is a sign of a good speaker.")),
    les("Creole, Cajun, Francophonie", mc(CRE, ["Which region of the world: Caribbean, Indian Ocean, Pacific, North America, Africa or Asia?", "These places use French or a French-based Creole because of their history. Match the place to its clue.", "Example: Dakar is the capital of Senegal, where French is the official language. Now think about yours."], 2),
      [S("Creoles and variants", "🌴", "A Creole is a language that grew from French (or another language) mixed with local ones, such as Haitian Creole."), S("A big family", "🌍", "The Francophonie links countries that share French. The Cajuns of Louisiana come from Acadia."), S("Tip", "🧠", "Think of the map: each place has its own story.")]),
    les("Ce qui, ce que, ce dont", mc(CEQ, ["Look after the blank: is there a verb with its own subject, or does the verb need a subject?", "Ce qui is the subject. Ce que is the object. Ce dont replaces de + something. Check whether the verb needs de.", "Example: 'Je sais ___ tu veux' - tu is the subject, so the blank is the object. Now do yours."], 2),
      tg("Indefinite relatives", "🧩", "These words mean \"what\" when you join clauses.", "Ce qui me plaît…<br>Ce que je veux…<br>Ce dont j'ai besoin…", "Subject. Object. With de.", "Qui = subject, que = object, dont = de.")),
    les("Verbs that do not translate", mc(VRB, ["Do not translate word by word. Which verb does French use with this noun?", "French verb choices are fixed: you pass an exam, take a photo, make a decision in a French way. Learn them as pairs.", "Example: 'to give a talk' is 'faire un exposé'. Now do yours."], 2),
      tg("Verb partners", "🔗", "Some verb + noun pairs are fixed in French.", "passer un examen<br>prendre une photo<br>faire une erreur", "Pass, take, make.", "Learn verb + noun together.")),
    les("The subjunctive of irregular verbs", mc(SUB24, ["The subject and phrase before the blank need the subjunctive. Think of the stem of the verb.", "Nous and vous often look like the imparfait. Être, avoir, savoir, aller, faire and pouvoir have special stems.", "Example: 'Il faut que tu ___ (venir)' needs the subjunctive: viennes. Now do yours."], 2),
      tg("Tricky subjunctives", "🎚️", "Irregular verbs have special subjunctive stems.", "que je sois, que j'aie<br>que je fasse, que je puisse", "Être, avoir, faire, pouvoir.", "For nous and vous, think of the imparfait form.")),
    les("The passé simple", mc(PSI, ["The passé simple is a literary tense. Think about novels and history.", "Third-person forms: -a / -it / -ut / -int endings, or -èrent / -irent / -urent for ils.", "Example: the passé simple of dire (il) is dit, and of savoir (il) is sut. Now do yours."], 2),
      tg("A tense for stories", "📘", "The <b>passé simple</b> is used in novels and history books for finished actions.", "Il ouvrit la porte.<br>Elle fut surprise.", "He opened. She was.", "You need to recognize it when you read, not use it when you speak.")),
    les("Plus-que-parfait and futur antérieur", mc(PQP, ["Does the action happen before another past moment, or before a future moment?", "Plus-que-parfait = avoir/être in the imparfait + participle (before a past moment). Futur antérieur = avoir/être in the future + participle (before a future moment).", "Example: 'Quand il ___ (finir), il est parti.' Finished before the past moment: avait fini. Now do yours."], 2),
      tg("Two tenses of 'before'", "⏳", "Both tenses show something done <b>before</b> another moment.", "Il avait fini avant mon arrivée.<br>J'aurai fini avant midi.", "Before a past moment. Before a future moment.", "Pick the auxiliary (avoir or être), then the tense.")),
    les("Type the word", typed(TYP24, "Think about the vocabulary of this level: politics, law, art, health, professions.", "Example: 'Type in French: citizenship (la ___)' would be 'citoyenneté'. Now type yours. (Accents are optional.)"), [S("Typing practice", "⌨️", "You type the French word for what you see."), S("Remember", "🧠", "Some words are masculine (le) and some feminine (la), but you type only the word."), S("Tip", "✍️", "Accents are optional here.")])
  ];
  L24.push(MIX("Mixed practice", L24.slice(0, 18), [L24[6], L24[10], L24[15]]));
  L24.push(MIX("Level 24 Challenge", L24.slice(0, 18), [L24[9], L24[13], L24[16]]));

  Object.assign(FRENCH_LEVELS, { 22: L22, 23: L23, 24: L24 });
})();
