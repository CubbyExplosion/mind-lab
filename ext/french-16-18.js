// ext/french-16-18.js : French, levels 16-18 (7th grade 2nd half, 8th grade).
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

  // ---------- generic makers ----------
  const vocab = bank => () => {
    const items = bank.items, cur = pick(items), [fr, en, e] = cur;
    const rest = items.filter(x => x[0] !== fr), ex = pick(rest), wr = shuf(rest);
    let m = pick(e && !bank.nopic ? ["fr2en", "en2fr", "pic"] : ["fr2en", "en2fr"]);
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
  // items: [text, answer, wrongs, visual]
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
  // typed answers: items [prompt, answer]
  const typed = (items, nudge, ex) => () => {
    const [text, ans] = pick(items), n = ans.replace(/[^A-Za-zÀ-ÿ]/g, "").length;
    return { text, textInput: true, answer: ans, hints: [nudge, `The answer starts with "${lead(ans)}" and has ${n} letters.`, ex] };
  };
  const readQ = ps => ps.flatMap(p => p.qs.map(q => [`<i>${p.t}</i><br><br>${q[0]}`, q[1], q[2]]));
  const readH = ["Read the text slowly. Which words from the question can you find in the text?", "The answer is in the text. Look at the sentence with the same key words as the question.", "Example: in 'Paul joue au foot le lundi', the question 'When does Paul play?' is answered by the words near 'lundi'. Now look in your text."];

  // ---------- numbers ----------
  const U = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];
  const T = { 2: "vingt", 3: "trente", 4: "quarante", 5: "cinquante", 6: "soixante" };
  const n100 = n => {
    if (n < 20) return U[n];
    const t = Math.floor(n / 10), u = n % 10;
    if (t <= 6) return T[t] + (u === 0 ? "" : u === 1 ? " et un" : "-" + U[u]);
    if (t === 7) return "soixante" + (u === 1 ? " et onze" : "-" + U[10 + u]);
    if (t === 8) return "quatre-vingt" + (u === 0 ? "s" : "-" + U[u]);
    return "quatre-vingt-" + U[10 + u];
  };
  const n1000 = n => {
    const h = Math.floor(n / 100), r = n % 100;
    if (h === 0) return n100(r);
    const base = h === 1 ? "cent" : U[h] + " cent" + (r === 0 ? "s" : "");
    return r === 0 ? base : base + " " + n100(r);
  };
  const numFr = n => {
    if (n === 0) return "zéro";
    const th = Math.floor(n / 1000), r = n % 1000;
    const a = th === 0 ? "" : (th === 1 ? "mille" : n1000(th) + " mille");
    const b = r === 0 ? "" : n1000(r);
    return (a + (a && b ? " " : "") + b).replace("quatre-vingts mille", "quatre-vingt mille");
  };
  const numGen = () => {
    const n = pick([ri(60, 99), ri(100, 999), ri(1000, 2999), ri(1900, 2099)]);
    const exN = n === 95 ? 77 : 95;
    if (Math.random() < 0.6) return {
      text: `Write this number with digits: <b>${numFr(n)}</b>`, answer: n,
      hints: ["Split it into parts: thousands, hundreds, then the last two digits.", "Remember: soixante-dix is 60 + 10, quatre-vingt is 4 × 20, and quatre-vingt-dix is 80 + 10.", `Example: ${numFr(exN)} = ${exN === 95 ? "4 × 20 + 15 = 95" : "60 + 17 = 77"}. Now do yours.`]
    };
    const wr = [...new Set([n + 10, n - 10, n + 1, n - 1, n + 100].filter(x => x > 0 && x !== n))];
    return {
      text: `How do you say <b>${n}</b> in French?`, choices: shuf([numFr(n), ...shuf(wr).slice(0, 2).map(numFr)]), answer: numFr(n),
      hints: ["Say the number in parts: thousands, hundreds, then the last two digits.", "Watch out for 70 to 99: they are built with 60, 80 and 20 (soixante-dix, quatre-vingts).", `Example: ${exN} is ${numFr(exN)}. Now do yours.`]
    };
  };

  // ---------- vocabulary banks ----------
  const B = {
    travel: BK("Travel and tourism", [["le voyage", "trip", "🧳"], ["la valise", "suitcase", "🧳"], ["le passeport", "passport", "🛂"], ["le billet", "ticket", "🎫"], ["l'aéroport", "airport", "✈️"], ["l'hôtel", "hotel", "🏨"], ["la réservation", "booking"], ["le touriste", "tourist"], ["la visite guidée", "guided tour"], ["le souvenir", "souvenir, memory"], ["le séjour", "stay"], ["la frontière", "border"]], { tip: "<b>Un souvenir</b> is both a gift you bring home and a memory. <b>Un billet</b> is a ticket (and also a banknote)." }),
    tech: BK("Technology", [["le logiciel", "software"], ["le mot de passe", "password"], ["télécharger", "to download"], ["l'application", "app", "📱"], ["le réseau", "network"], ["le clavier", "keyboard", "⌨️"], ["la souris", "computer mouse", "🖱️"], ["la batterie", "battery", "🔋"], ["le fichier", "file"], ["sauvegarder", "to save (a file)"], ["le moteur de recherche", "search engine"], ["l'écran tactile", "touchscreen"]], { tip: "<b>La souris</b> is also the animal! Context tells you which one. Keep your <b>mot de passe</b> secret." }),
    sport: BK("Sports and competition", [["l'entraîneur", "coach"], ["l'équipe", "team"], ["le match", "game"], ["le championnat", "championship"], ["la victoire", "victory"], ["la défaite", "defeat"], ["le but", "goal", "⚽"], ["l'arbitre", "referee"], ["le joueur", "player"], ["s'entraîner", "to train"], ["le spectateur", "spectator"], ["la médaille", "medal", "🏅"]], { tip: "<b>Un but</b> is a goal in a game, but also a goal in life. <b>Gagner</b> and <b>perdre</b> go with <b>la victoire</b> and <b>la défaite</b>." }),
    cook: BK("Cooking", [["la recette", "recipe"], ["l'ingrédient", "ingredient"], ["mélanger", "to mix"], ["éplucher", "to peel"], ["faire cuire", "to cook"], ["le four", "oven"], ["la casserole", "saucepan"], ["la poêle", "frying pan"], ["couper", "to cut"], ["la pincée", "pinch"], ["le goût", "taste"], ["la cuillère à soupe", "tablespoon", "🥄"]], { tip: "<b>Une recette</b> is a recipe, but <b>une réception</b> is a party. Do not mix up <b>cuisine</b> (kitchen, cooking) and <b>cuisiner</b> (to cook)." }),
    jobs: BK("Jobs and careers", [["l'ingénieur", "engineer"], ["l'avocat", "lawyer"], ["l'infirmière", "nurse"], ["le vétérinaire", "vet"], ["l'électricien", "electrician"], ["le boulanger", "baker"], ["l'architecte", "architect"], ["le comptable", "accountant"], ["le métier", "trade, profession"], ["l'entretien d'embauche", "job interview"], ["le salaire", "salary"], ["le stage", "internship"]], { tip: "Many job names have a girl form: <b>l'avocate</b>, <b>la boulangère</b>. Some stay the same: <b>l'architecte</b>." }),
    rel: BK("Friends and feelings", [["la confiance", "trust"], ["l'amitié", "friendship"], ["se disputer", "to argue"], ["se réconcilier", "to make up"], ["la jalousie", "jealousy"], ["s'entendre bien", "to get along"], ["le conseil", "advice"], ["soutenir", "to support"], ["se moquer de", "to make fun of"], ["le secret", "secret"], ["partager", "to share"], ["la déception", "disappointment"]], { tip: "<b>Un conseil</b> is advice (not a council). <b>Se réconcilier</b> is what good friends do after <b>se disputer</b>." }),
    shop: BK("Shopping and fashion", [["la mode", "fashion"], ["essayer", "to try on"], ["la taille", "size (clothes)"], ["la pointure", "shoe size"], ["le rayon", "department (in a store)"], ["la caisse", "checkout"], ["la marque", "brand"], ["la livraison", "delivery"], ["le panier", "basket"], ["la réduction", "discount"], ["le prix", "price"], ["le vêtement", "piece of clothing", "👕"]], { tip: "<b>La taille</b> is for clothes, <b>la pointure</b> is for shoes. Online, you put things in <b>le panier</b>." }),
    ill: BK("Health problems", [["le rhume", "cold"], ["la fièvre", "fever"], ["la toux", "cough"], ["le mal de tête", "headache"], ["l'ordonnance", "prescription"], ["le pharmacien", "pharmacist"], ["guérir", "to get better, to heal"], ["la blessure", "injury"], ["se reposer", "to rest"], ["les urgences", "emergency room"], ["le médicament", "medicine"], ["éternuer", "to sneeze"]], { tip: "<b>Avoir mal à</b> + body part: j'ai mal à la tête. <b>Le médicament</b> is medicine; <b>la médecine</b> is the science." }),
    city: BK("City and buildings", [["le gratte-ciel", "skyscraper"], ["le pont", "bridge"], ["la mairie", "town hall"], ["le quartier", "neighborhood"], ["le carrefour", "intersection"], ["le trottoir", "sidewalk"], ["l'immeuble", "apartment building"], ["la banlieue", "suburbs"], ["le feu rouge", "traffic light"], ["la place", "square (in a town)"], ["le monument", "monument"], ["le métro", "subway", "🚇"]], { tip: "<b>Un gratte-ciel</b> literally scrapes the sky (gratter = to scratch). <b>La mairie</b> is where the mayor works." }),
    cine: BK("Music and movies", [["le chanteur", "singer", "🎤"], ["le concert", "concert"], ["le film", "movie", "🎬"], ["l'acteur", "actor"], ["le réalisateur", "film director"], ["le scénario", "script"], ["la bande-annonce", "trailer"], ["le doublage", "dubbing"], ["les sous-titres", "subtitles"], ["le clip", "music video"], ["la chanson", "song"], ["l'instrument", "instrument", "🎸"]], { tip: "In France, foreign films are often shown <b>en version française</b> (dubbed) or <b>en version originale</b> with <b>sous-titres</b>." }),
    sci: BK("Science lab", [["l'expérience", "experiment"], ["l'hypothèse", "hypothesis"], ["la conclusion", "conclusion"], ["le microscope", "microscope", "🔬"], ["la découverte", "discovery"], ["inventer", "to invent"], ["la mesure", "measurement"], ["le chercheur", "researcher"], ["la preuve", "proof"], ["l'éprouvette", "test tube", "🧪"], ["la formule", "formula"], ["observer", "to observe"]], { tip: "<b>Une expérience</b> can also mean an experience, so look at the context. A scientist makes an <b>hypothèse</b>, then tests it." }),
    daily: BK("Daily routine", [["se réveiller", "to wake up"], ["se brosser les dents", "to brush your teeth"], ["s'habiller", "to get dressed"], ["se coucher", "to go to bed"], ["le réveil", "alarm clock", "⏰"], ["la grasse matinée", "sleeping in"], ["le trajet", "commute, journey"], ["la sieste", "nap"], ["le quotidien", "daily life"], ["en retard", "late"], ["en avance", "early"], ["ranger", "to tidy up"]], { tip: "Reflexive verbs (se réveiller, se coucher) use <b>me, te, se, nous, vous, se</b>: je me réveille à sept heures." }),
    society: BK("Society and citizens", [["le citoyen", "citizen"], ["la loi", "law"], ["le droit", "right"], ["le devoir", "duty"], ["voter", "to vote"], ["l'élection", "election"], ["le gouvernement", "government"], ["le maire", "mayor"], ["la démocratie", "democracy"], ["la république", "republic"], ["l'impôt", "tax"], ["le parlement", "parliament"]], { nopic: true, tip: "<b>Un droit</b> is a right, <b>un devoir</b> is a duty (but also homework). Every citizen has both." }),
    econ: BK("Work and economy", [["l'entreprise", "company"], ["le chômage", "unemployment"], ["l'emploi", "job, position"], ["l'économie", "economy"], ["l'industrie", "industry"], ["l'exportation", "export"], ["la croissance", "growth"], ["le commerce", "trade"], ["le client", "customer"], ["le fournisseur", "supplier"], ["le bénéfice", "profit"], ["embaucher", "to hire"]], { nopic: true, tip: "<b>Un emploi</b> is a job position, <b>le travail</b> is work in general. <b>Embaucher</b> (to hire) is the opposite of <b>licencier</b> (to lay off)." }),
    abstract: BK("Big ideas", [["la liberté", "freedom"], ["la justice", "justice"], ["l'égalité", "equality"], ["la vérité", "truth"], ["le bonheur", "happiness"], ["la paix", "peace"], ["la sagesse", "wisdom"], ["l'espoir", "hope"], ["la solidarité", "solidarity"], ["le respect", "respect"], ["la tolérance", "tolerance"], ["la mémoire", "memory"]], { nopic: true, tip: "Most of these big-idea nouns are feminine (la liberté, la paix). Words ending in <b>-té</b> are almost always feminine." }),
    debate: BK("Arguing a point", [["affirmer", "to claim"], ["prouver", "to prove"], ["réfuter", "to refute"], ["nier", "to deny"], ["soutenir", "to maintain, to back up"], ["souligner", "to point out"], ["admettre", "to admit"], ["convaincre", "to convince"], ["s'opposer à", "to be against"], ["conclure", "to conclude"], ["remarquer", "to notice"], ["justifier", "to justify"]], { nopic: true, tip: "In a good debate you <b>affirmer</b> an idea, <b>prouver</b> it with facts, and <b>conclure</b> at the end." }),
    airport: BK("Airport and hotel", [["l'enregistrement", "check-in"], ["la porte d'embarquement", "boarding gate"], ["le retard", "delay"], ["la correspondance", "connecting flight"], ["les bagages", "luggage"], ["la douane", "customs"], ["le vol", "flight", "✈️"], ["décoller", "to take off"], ["atterrir", "to land"], ["la chambre", "room (hotel)"], ["la clé", "key", "🔑"], ["le pourboire", "tip (money)"]], { tip: "<b>Le vol</b> is a flight, but also a theft! <b>Un retard</b> is a delay: the train is <b>en retard</b>." }),
    ai: BK("Technology and AI", [["l'intelligence artificielle", "artificial intelligence"], ["l'algorithme", "algorithm"], ["les données", "data"], ["la vie privée", "privacy"], ["l'abonnement", "subscription"], ["le robot", "robot", "🤖"], ["le piratage", "hacking"], ["la connexion", "connection, login"], ["hors ligne", "offline"], ["la mise à jour", "update"], ["le réseau social", "social network"], ["la désinformation", "false information"]], { tip: "<b>L'intelligence artificielle</b> is shortened to <b>l'IA</b>. Protect <b>ta vie privée</b> online and check facts to fight <b>la désinformation</b>." }),
    lit: BK("Words for stories and poems", [["la métaphore", "metaphor"], ["la comparaison", "simile"], ["la personnification", "personification"], ["l'hyperbole", "exaggeration"], ["le sens figuré", "figurative meaning"], ["le sens propre", "literal meaning"], ["le narrateur", "narrator"], ["le thème", "theme"], ["l'ironie", "irony"], ["le symbole", "symbol"], ["la rime", "rhyme"], ["le vers", "line of a poem"]], { nopic: true, tip: "<b>Le vers</b> (line of a poem) sounds like <b>le verre</b> (glass), <b>vert</b> (green) and <b>ver</b> (worm). Context is everything!" })
  };

  // ---------- meaning / knowledge data ----------
  const IDI1 = [
    ["Il pleut des cordes.", "It is raining very hard.", ["It is raining softly.", "It is snowing."]],
    ["Avoir le cafard", "To feel down", ["To be afraid of bugs", "To be hungry"]],
    ["Poser un lapin", "To stand someone up", ["To buy a pet", "To tell a joke"]],
    ["Coûter les yeux de la tête", "To be very expensive", ["To be very ugly", "To be free"]],
    ["Avoir un chat dans la gorge", "To have a scratchy voice", ["To love cats", "To be very hungry"]],
    ["Casser les pieds à quelqu'un", "To annoy someone", ["To hurt someone's foot", "To help someone walk"]],
    ["Être dans la lune", "To daydream", ["To travel to space", "To be very tall"]],
    ["Tomber dans les pommes", "To faint", ["To pick fruit", "To trip on purpose"]],
    ["Mettre son grain de sel", "To give an opinion nobody asked for", ["To cook with salt", "To be very generous"]],
    ["Passer du coq à l'âne", "To jump from one subject to another", ["To visit a farm", "To tell the truth"]]
  ];
  const READ16 = [
    { t: "Léa habite à Lyon avec sa famille. Chaque samedi, elle va au marché avec son père. Ils achètent des tomates, du fromage et du pain. Ensuite, ils boivent un chocolat chaud dans un café. Léa adore ce moment avec son père.", qs: [
      ["Where does Léa live?", "In Lyon", ["In Paris", "In Nice"]],
      ["Who goes to the market with her?", "Her father", ["Her mother", "Her brother"]],
      ["What do they drink in the café?", "Hot chocolate", ["Orange juice", "Tea"]]] },
    { t: "Hier, il a neigé toute la matinée. Mon frère et moi avons fait un bonhomme de neige devant la maison. Il avait un chapeau rouge et une carotte à la place du nez. L'après-midi, nous sommes rentrés boire du lait chaud.", qs: [
      ["What was the weather like?", "It snowed", ["It rained", "It was sunny"]],
      ["What was the snowman's nose?", "A carrot", ["A stone", "A button"]],
      ["What did the children do in the afternoon?", "Went inside and drank hot milk", ["Built another snowman", "Went to the market"]]] },
    { t: "Le musée du Louvre est à Paris. Il reçoit des millions de visiteurs chaque année. On y voit des tableaux célèbres, comme la Joconde. Pour éviter la foule, il vaut mieux y aller tôt le matin.", qs: [
      ["In which city is the Louvre?", "Paris", ["Lyon", "Marseille"]],
      ["How can you avoid the crowd?", "Go early in the morning", ["Go at night", "Go on a Sunday"]],
      ["What famous painting is mentioned?", "The Joconde (Mona Lisa)", ["A sunflower painting", "A water lily painting"]]] },
    { t: "Samedi prochain, ce sera l'anniversaire de Karim. Il a invité six amis. Sa mère préparera un gâteau au chocolat et son père organisera des jeux dans le jardin. S'il pleut, la fête aura lieu dans le salon.", qs: [
      ["How many friends did Karim invite?", "Six", ["Four", "Ten"]],
      ["Who will make the cake?", "His mother", ["His father", "His sister"]],
      ["Where will the party be if it rains?", "In the living room", ["In the garden", "In the kitchen"]]] }
  ];
  const MAIL = [
    ["How would you start a message to a close friend named Marie?", "Salut Marie,", ["Madame la Directrice,", "Monsieur le Maire,"]],
    ["How would you start a letter to a woman who is the school principal?", "Madame la Directrice,", ["Salut Directrice !", "Coucou Madame,"]],
    ["Which ending is polite and formal?", "Veuillez agréer, Madame, mes salutations distinguées.", ["Bises et à plus !", "Salut, à la prochaine !"]],
    ["Which ending is friendly, for a friend?", "Grosses bises, Théo", ["Veuillez agréer mes salutations", "Respectueusement, Monsieur Théo"]],
    ["Which sentence asks for information politely?", "Pourriez-vous m'envoyer des informations, s'il vous plaît ?", ["Envoie-moi des informations tout de suite !", "Je veux des informations."]],
    ["What does 'ci-joint' mean in an email?", "Attached", ["Above", "Urgent"]],
    ["What is the subject line of an email called?", "L'objet", ["Le mot", "La fin"]],
    ["Which sentence thanks someone formally?", "Je vous remercie de votre réponse.", ["Merci mille fois, mon pote !", "T'es sympa !"]],
    ["Which apology fits a formal message?", "Veuillez excuser mon retard.", ["Désolé, j'ai oublié lol.", "Oups, pas grave !"]]
  ];
  const FF = [
    ["la librairie", "bookstore", ["library", "librarian"]],
    ["actuellement", "currently", ["actually", "suddenly"]],
    ["attendre", "to wait", ["to attend", "to attack"]],
    ["la monnaie", "change, coins", ["money (all of it)", "the moon"]],
    ["rester", "to stay", ["to rest", "to rush"]],
    ["sensible", "sensitive", ["sensible", "sensational"]],
    ["assister à", "to attend", ["to assist", "to assure"]],
    ["demander", "to ask", ["to demand", "to delay"]],
    ["blesser", "to hurt, to injure", ["to bless", "to blame"]],
    ["la location", "rental", ["location", "locker"]],
    ["un car", "a coach bus", ["a car", "a card"]]
  ];
  const GEN = [
    ["le problème", "la problème"], ["la page", "le page"], ["le poème", "la poème"], ["la main", "le main"], ["la mer", "le mer"],
    ["le soleil", "la soleil"], ["la couleur", "le couleur"], ["l'idée (f.)", "l'idée (m.)"], ["le musée", "la musée"], ["la photo", "le photo"],
    ["le parapluie", "la parapluie"], ["la dent", "le dent"], ["le stylo", "la stylo"], ["la nuit", "le nuit"], ["le climat", "la climat"], ["le silence", "la silence"]
  ].map(([a, b]) => ["Which is correct?", a, [b]]);
  const HOM = [
    ["Paul ___ Marie sont amis. (and)", "et", ["est", "ait"]], ["Il ___ très content. (he is)", "est", ["et", "ait"]],
    ["Ils ___ très contents. (they are)", "sont", ["son", "sons"]], ["Il aime ___ chien. (his)", "son", ["sont", "sons"]],
    ["Les enfants ___ faim. (they have)", "ont", ["on", "ons"]], ["___ dit qu'il va neiger. (people say)", "On", ["Ont", "Un"]],
    ["Elle ___ lave les mains. (herself)", "se", ["ce", "ces"]], ["___ livre est très intéressant. (this)", "Ce", ["Se", "Ses"]],
    ["Léa range ___ livres. (her own)", "ses", ["ces", "ce"]], ["Regarde ___ fleurs ! (these)", "ces", ["ses", "se"]],
    ["Elle aime ___ maison. (her)", "sa", ["ça", "se"]], ["___ va bien aujourd'hui ! (that)", "Ça", ["Sa", "Se"]]
  ];
  const HOL = [
    ["What is celebrated in France on July 14?", "The national day (la fête nationale)", ["The start of school", "New Year"]],
    ["What do French families often eat on la Chandeleur (February 2)?", "Crêpes", ["Turkey", "Chocolate eggs"]],
    ["What is the French name for April Fools' Day?", "Le poisson d'avril", ["Le chat de mars", "Le lapin de mai"]],
    ["What flower do people offer on May 1?", "Muguet (lily of the valley)", ["Red roses", "Sunflowers"]],
    ["What is hidden in the galette des rois?", "A small figurine (la fève)", ["A coin", "A key"]],
    ["When is la fête de la musique?", "June 21", ["December 25", "September 1"]],
    ["What is la rentrée?", "The return to school and work in September", ["A summer holiday", "A winter festival"]],
    ["What is Noël?", "Christmas", ["Easter", "New Year's Eve"]],
    ["What is la Toussaint (November 1)?", "All Saints' Day, a holiday", ["A music festival", "A sports day"]]
  ];
  const FOOD = [
    ["Which bread is long and thin, and typical of France?", "La baguette", ["Le bagel", "La pita"]],
    ["Which region is famous for crêpes?", "Brittany (la Bretagne)", ["Alsace", "Corsica"]],
    ["What is ratatouille?", "A stew of vegetables", ["A fish soup", "A chocolate cake"]],
    ["Which cheese comes from Normandy?", "Camembert", ["Parmesan", "Cheddar"]],
    ["What is a croque-monsieur?", "A toasted ham and cheese sandwich", ["A fruit salad", "A frozen dessert"]],
    ["What is le déjeuner in France?", "Lunch", ["Breakfast", "Dinner"]],
    ["What is le dîner in France?", "Dinner (the evening meal)", ["Lunch", "A snack"]],
    ["What is a macaron?", "A small round almond cookie with filling", ["A type of pasta", "A kind of cheese"]],
    ["What is a pain au chocolat?", "A pastry with chocolate inside", ["A chocolate drink", "A chocolate sauce"]],
    ["What is bouillabaisse?", "A fish soup from Marseille", ["A meat pie", "A cold salad"]]
  ];
  const WORLD = [
    ["Montréal and Québec City are in which country?", "Canada", ["Belgium", "Switzerland"]],
    ["Brussels is the capital of which French-speaking country?", "Belgium", ["Senegal", "Haiti"]],
    ["Which island in the Indian Ocean has French as an official language?", "Madagascar", ["Iceland", "Cuba"]],
    ["Tahiti belongs to French Polynesia. In which ocean is it?", "The Pacific Ocean", ["The Atlantic Ocean", "The Arctic Ocean"]],
    ["Senegal is in which part of the world?", "West Africa", ["South America", "Northern Europe"]],
    ["Guadeloupe and Martinique are islands in which sea?", "The Caribbean Sea", ["The North Sea", "The Red Sea"]],
    ["Which Canadian product is famous and called le sirop d'érable?", "Maple syrup", ["Olive oil", "Honey"]],
    ["Mont Blanc is the highest mountain in which mountain chain?", "The Alps", ["The Pyrenees", "The Andes"]],
    ["Which country has the city of Genève (Geneva), where French is spoken?", "Switzerland", ["Italy", "Portugal"]]
  ];
  const TYP16 = [["Type in French: <b>suitcase</b> (la ___)", "valise"], ["Type in French: <b>ticket</b> (le ___)", "billet"], ["Type in French: <b>recipe</b> (la ___)", "recette"], ["Type in French: <b>team</b> (l'___)", "équipe"], ["Type in French: <b>lawyer</b> (l'___)", "avocat"], ["Type in French: <b>keyboard</b> (le ___)", "clavier"], ["Type in French: <b>victory</b> (la ___)", "victoire"], ["Type in French: <b>oven</b> (le ___)", "four"], ["Type in French: <b>border</b> (la ___)", "frontière"], ["Type in French: <b>to cut</b>", "couper"], ["Type in French: <b>medal</b> (la ___)", "médaille"], ["Type in French: <b>trust</b> (la ___)", "confiance"]];
  const PREF = [
    ["What does 'relire' mean?", "To read again", ["To read badly", "To stop reading"]],
    ["What does 'défaire' mean?", "To undo", ["To do again", "To do well"]],
    ["What does 'inutile' mean?", "Useless", ["Very useful", "Used often"]],
    ["What does 'malheureux' mean?", "Unhappy", ["Very happy", "Lucky"]],
    ["Which word is the opposite of 'possible'?", "impossible", ["repossible", "dépossible"]],
    ["Which word is the opposite of 'poli' (polite)?", "impoli", ["repoli", "dépoli"]],
    ["What does 'revenir' mean?", "To come back", ["To leave", "To come early"]],
    ["What does 'prévoir' mean?", "To foresee, to plan ahead", ["To see again", "To see badly"]],
    ["What does 'souterrain' mean?", "Underground", ["Overground", "Very dry"]],
    ["Which word means 'to start again'?", "recommencer", ["incommencer", "décommencer"]]
  ];
  const SIGN = [
    ["Défense de fumer", "No smoking", ["Smoking area", "No entry"]],
    ["Sortie de secours", "Emergency exit", ["Main entrance", "Parking"]],
    ["Entrée libre", "Free entry", ["Staff only", "Closed"]],
    ["À louer", "For rent", ["For sale", "Lost and found"]],
    ["Complet", "Full (no room left)", ["Open now", "Free gift"]],
    ["Ouvert 24h/24", "Open all day and night", ["Open 24 days a year", "Closed at night"]],
    ["Soldes", "Sale", ["Soldiers", "Soup of the day"]],
    ["Prière de ne pas toucher", "Please do not touch", ["Please touch gently", "Please pay here"]],
    ["Attention, travaux", "Careful, roadworks", ["Careful, school nearby", "Careful, slippery"]],
    ["Tirez", "Pull", ["Push", "Shoot"]]
  ];

  // L17
  const IDI2 = [
    ["Avoir le cœur sur la main", "To be generous", ["To be sick", "To be shy"]],
    ["Se mettre sur son 31", "To dress up in your best clothes", ["To be late", "To count to 31"]],
    ["Mettre les pieds dans le plat", "To say something tactless", ["To cook dinner", "To fall over"]],
    ["Prendre ses jambes à son cou", "To run away fast", ["To go for a walk", "To stretch your legs"]],
    ["Avoir un poil dans la main", "To be very lazy", ["To be very strong", "To have a rash"]],
    ["Chercher midi à quatorze heures", "To make things too complicated", ["To be late for lunch", "To check the clock"]],
    ["Donner sa langue au chat", "To give up guessing", ["To feed a pet", "To speak very quietly"]],
    ["Ce n'est pas la mer à boire.", "It is not that difficult.", ["It is too salty.", "It is a long way."]],
    ["Revenons à nos moutons.", "Let's get back to the subject.", ["Let's go to the farm.", "Let's count the sheep."]],
    ["Être au bout du rouleau", "To be exhausted", ["To finish a book", "To be very rich"]]
  ];
  const READ17 = [
    { t: "Chère Camille, je t'écris de Montréal où je passe les vacances chez mon oncle. Ici, il fait très froid en hiver, mais c'est magnifique avec toute cette neige. Hier, nous avons patiné sur un lac gelé. Demain, nous visiterons le Vieux-Montréal. Tu me manques ! Bises, Hugo.", qs: [
      ["Who is Hugo staying with?", "His uncle", ["His cousin", "His teacher"]],
      ["What did Hugo do yesterday?", "He skated on a frozen lake", ["He visited Old Montréal", "He built a snowman"]],
      ["What does 'Tu me manques' mean?", "I miss you", ["You are missing", "You are late"]]] },
    { t: "Le Tour de France est une grande course de vélo. Elle a lieu en juillet et dure trois semaines. Les coureurs traversent des montagnes et des villages. Le vainqueur porte le maillot jaune. Beaucoup de spectateurs regardent le passage des cyclistes au bord de la route.", qs: [
      ["Which sport is the Tour de France?", "Cycling", ["Running", "Swimming"]],
      ["What color is the winner's jersey?", "Yellow", ["Red", "Green"]],
      ["How long does the race last?", "Three weeks", ["Three days", "One month"]]] },
    { t: "Ma grand-mère n'aimait pas la technologie. Pourtant, l'année dernière, elle a acheté une tablette pour parler avec ses petits-enfants. Au début, elle appuyait sur tous les boutons sans comprendre. Maintenant, elle envoie des photos de son jardin chaque dimanche.", qs: [
      ["Why did she buy a tablet?", "To talk with her grandchildren", ["To read the news", "To play games"]],
      ["What did she do at first?", "She pressed all the buttons without understanding", ["She read the manual", "She gave it away"]],
      ["What does she send every Sunday?", "Photos of her garden", ["Recipes", "Videos of her cat"]]] }
  ];
  const CONN = [
    ["néanmoins", "nevertheless", ["therefore", "for example"]],
    ["par conséquent", "therefore, as a result", ["nevertheless", "in the beginning"]],
    ["certes", "admittedly, it is true that", ["never", "certainly not"]],
    ["en revanche", "on the other hand", ["as a result", "for instance"]],
    ["d'ailleurs", "besides, by the way", ["unfortunately", "meanwhile"]],
    ["en outre", "moreover", ["however", "instead"]],
    ["au contraire", "on the contrary", ["in addition", "in conclusion"]],
    ["quant à", "as for", ["as soon as", "as long as"]],
    ["en somme", "in short", ["at first", "above all"]]
  ];
  const REG = [
    ["le boulot (casual)", "work, job", ["boat", "ball"]],
    ["la bagnole (casual)", "car", ["bag", "bathroom"]],
    ["le bouquin (casual)", "book", ["bucket", "bouquet"]],
    ["le fric (casual)", "money", ["fridge", "fruit"]],
    ["la bouffe (casual)", "food", ["fog", "fluff"]],
    ["un mec (casual)", "a guy", ["a mess", "a mechanic"]],
    ["rigolo (casual)", "funny", ["rigid", "rich"]],
    ["Which is the formal word for 'la bagnole'?", "La voiture", ["Le bouquin", "Le boulot"]],
    ["You meet your teacher. Which greeting is polite?", "Bonjour Madame, comment allez-vous ?", ["Salut, ça roule ?", "Coucou, quoi de neuf ?"]],
    ["Which form do you use for a stranger or an adult you do not know well?", "Vous", ["Tu", "Toi"]]
  ].map(([a, b, w]) => a.startsWith("Which") ? [a, b, w] : [`What does ${a} mean?`, b, w]);
  const SUF = [
    ["déménager", "le déménagement", ["la déménagation", "le déménage"]],
    ["décider", "la décision", ["le décidement", "la décidage"]],
    ["nettoyer", "le nettoyage", ["la nettoyation", "le nettoyment"]],
    ["changer", "le changement", ["la changation", "le changeage"]],
    ["réfléchir", "la réflexion", ["le réfléchement", "la réfléchage"]],
    ["construire", "la construction", ["le construisement", "le construisage"]],
    ["inviter", "l'invitation", ["l'invitement", "l'invitage"]],
    ["stationner", "le stationnement", ["la stationnation", "le stationnage"]],
    ["organiser", "l'organisation", ["l'organisement", "l'organisage"]],
    ["voyager", "le voyage", ["la voyagation", "le voyagement"]]
  ].map(([v, n, w]) => [`Which noun comes from the verb "${v}"?`, n, w]);
  const ANT = [
    ["rapide", "lent", ["fort", "tôt"]], ["généreux", "avare", ["drôle", "poli"]], ["courageux", "lâche", ["calme", "gentil"]],
    ["l'avantage", "l'inconvénient", ["la solution", "la mode"]], ["la victoire", "la défaite", ["la fête", "la fin"]],
    ["accepter", "refuser", ["écouter", "inviter"]], ["construire", "détruire", ["réparer", "inventer"]],
    ["fort", "faible", ["lent", "grand"]], ["autoriser", "interdire", ["aider", "choisir"]], ["riche", "pauvre", ["triste", "vieux"]]
  ].map(([w, a, wr]) => [`What is the opposite of "${w}"?`, a, wr]);
  const SYN = [
    ["content", "heureux", ["triste", "fâché"]], ["commencer", "débuter", ["finir", "partir"]], ["fatigué", "épuisé", ["énergique", "affamé"]],
    ["un copain", "un ami", ["un voisin", "un inconnu"]], ["regarder", "observer", ["oublier", "chanter"]], ["difficile", "compliqué", ["amusant", "simple"]],
    ["terminer", "achever", ["essayer", "hésiter"]], ["un enfant", "un gamin", ["un adulte", "un voisin"]], ["la peur", "la crainte", ["la joie", "la colère"]]
  ].map(([w, a, wr]) => [`Which word has almost the same meaning as "${w}"?`, a, wr]);
  const FAM = [
    ["Louis Pasteur", "He created vaccines and the method of pasteurization", ["He built the Eiffel Tower", "He painted water lilies"]],
    ["Marie Curie", "She studied radioactivity and won two Nobel Prizes", ["She wrote Les Misérables", "She explored the oceans"]],
    ["Louis Braille", "He invented a reading system for blind people", ["He invented the telephone", "He painted portraits"]],
    ["Les frères Lumière", "They showed some of the first movies in 1895", ["They built the first airplane", "They wrote fables"]],
    ["Gustave Eiffel", "His company built the Eiffel Tower for the 1889 World's Fair", ["He built the Louvre", "He designed the Arc de Triomphe"]],
    ["Jacques Cousteau", "He explored the oceans and made films about them", ["He climbed Mont Blanc", "He invented the bicycle"]],
    ["Claude Monet", "He painted water lilies and helped start Impressionism", ["He composed operas", "He wrote detective novels"]],
    ["Les frères Montgolfier", "They built the first hot-air balloon that carried passengers (1783)", ["They invented the train", "They founded Paris"]],
    ["Blaise Pascal", "He was a mathematician and scientist (Pascal's triangle)", ["He was a famous chef", "He was a painter"]]
  ].map(([n, a, w]) => [`Who or what is known for this: ${n}?`, a, w]);
  const PRV = [
    ["Petit à petit, l'oiseau fait son nid.", "Patience and small steps lead to success.", ["Birds always fly south.", "Small things are not important."]],
    ["L'habit ne fait pas le moine.", "Do not judge by appearances.", ["Clothes are very important.", "Monks wear brown."]],
    ["Tel père, tel fils.", "Like father, like son.", ["Fathers are always right.", "Sons should obey."]],
    ["Après la pluie, le beau temps.", "After hard times come better ones.", ["It always rains in spring.", "Take an umbrella."]],
    ["Rome ne s'est pas faite en un jour.", "Big things take time.", ["Rome is far away.", "Do things quickly."]],
    ["Mieux vaut tard que jamais.", "Better late than never.", ["It is never too early.", "Time is money."]],
    ["L'union fait la force.", "Together we are stronger.", ["Strong people work alone.", "Unions are expensive."]],
    ["Chacun son goût.", "Everyone has their own taste.", ["Taste your food first.", "All foods taste the same."]],
    ["Qui sème le vent récolte la tempête.", "Your actions have consequences.", ["Farmers love storms.", "Wind helps plants grow."]]
  ].map(([p, a, w]) => [`What does the saying "${p}" mean?`, a, w]);
  const LITE = [
    ["Who wrote Le Petit Prince?", "Antoine de Saint-Exupéry", ["Jules Verne", "Victor Hugo"]],
    ["Who wrote Vingt mille lieues sous les mers (with Captain Nemo)?", "Jules Verne", ["Alexandre Dumas", "Hergé"]],
    ["Who wrote Les Trois Mousquetaires?", "Alexandre Dumas", ["Antoine de Saint-Exupéry", "Jules Verne"]],
    ["Who wrote Les Misérables?", "Victor Hugo", ["Alexandre Dumas", "Jean de La Fontaine"]],
    ["Tintin was created by a Belgian author. What is his pen name?", "Hergé", ["Goscinny", "Uderzo"]],
    ["Astérix the Gaul was created by Goscinny and who else?", "Uderzo", ["Hergé", "Sempé"]],
    ["Who wrote fables such as La Cigale et la Fourmi?", "Jean de La Fontaine", ["Charles Perrault", "Jules Verne"]],
    ["Who collected tales such as Cendrillon and Le Chat botté?", "Charles Perrault", ["Victor Hugo", "Jean de La Fontaine"]],
    ["In Le Petit Prince, where does the prince come from?", "A tiny planet (asteroid)", ["A big city", "The sea"]]
  ];
  const TYP17 = [["Type the opposite of <b>lent</b>", "rapide"], ["Type the opposite of <b>faible</b>", "fort"], ["Type the opposite of <b>pauvre</b>", "riche"], ["Type the opposite of <b>ouvrir</b>", "fermer"], ["Type the opposite of <b>gagner</b>", "perdre"], ["Type the opposite of <b>accepter</b>", "refuser"], ["Type the opposite of <b>construire</b>", "détruire"], ["Type the opposite of <b>vrai</b>", "faux"], ["Type the opposite of <b>le début</b>", "fin"], ["Type the opposite of <b>lourd</b>", "léger"], ["Type the opposite of <b>monter</b>", "descendre"], ["Type the opposite of <b>facile</b>", "difficile"]];

  // L18
  const IDI3 = [
    ["Avoir la main verte", "To be good at gardening", ["To be sick", "To be jealous"]],
    ["Se creuser la tête", "To think very hard", ["To dig a hole", "To have a headache"]],
    ["Mettre la main à la pâte", "To pitch in and help", ["To bake a cake alone", "To make a mess"]],
    ["Faire d'une pierre deux coups", "To do two things with one action", ["To throw stones", "To break a window"]],
    ["Tourner autour du pot", "To avoid getting to the point", ["To cook slowly", "To dance in the kitchen"]],
    ["Dormir comme un loir", "To sleep very deeply", ["To snore loudly", "To sleep outside"]],
    ["Rire aux éclats", "To burst out laughing", ["To laugh quietly", "To laugh at a mistake"]],
    ["Avoir du pain sur la planche", "To have a lot of work to do", ["To be hungry", "To be a baker"]],
    ["Être sur un petit nuage", "To be blissfully happy", ["To be in an airplane", "To be sad"]],
    ["Un coup de main", "A helping hand", ["A punch", "A handshake"]]
  ];
  const READ18 = [
    { t: "Il y a cent ans, beaucoup d'enfants français allaient à l'école à pied, même sous la pluie. Ils portaient une blouse grise et écrivaient à la plume avec de l'encre. Aujourd'hui, ils utilisent des stylos, des ordinateurs et des tablettes. Pourtant, une chose n'a pas changé : les élèves attendent toujours la sonnerie de la récréation avec impatience.", qs: [
      ["What did children wear to protect their clothes long ago?", "A gray smock (blouse)", ["A raincoat", "A red hat"]],
      ["What did they write with?", "A pen with ink", ["A computer", "A pencil only"]],
      ["What has NOT changed?", "Students wait eagerly for break time", ["Children walk to school", "Kids write with ink"]]] },
    { t: "Dans ma ville, on a planté deux cents arbres le long des rues l'an dernier. Les habitants ont aidé les employés de la mairie. Grâce à ces arbres, l'air est plus frais en été et les oiseaux reviennent. Le maire espère que d'autres quartiers feront la même chose.", qs: [
      ["How many trees were planted?", "Two hundred", ["Twenty", "Two thousand"]],
      ["Who helped the town hall workers?", "The residents", ["The students", "The firefighters"]],
      ["What is one result of the new trees?", "Cooler air in summer", ["Less rain", "More traffic"]],
      ["What does the mayor hope?", "That other neighborhoods do the same", ["That the trees grow taller", "That people move away"]]] },
    { t: "Certains disent que les devoirs sont inutiles. Selon moi, ils sont utiles s'ils sont courts, car ils aident à retenir la leçon. En revanche, trop de devoirs fatiguent les élèves et leur enlèvent du temps pour jouer ou lire. Je pense donc qu'il faut chercher un équilibre.", qs: [
      ["When are homework assignments useful, according to the author?", "When they are short", ["When they are long", "When they are done in groups"]],
      ["What is the problem with too much homework?", "Students get tired and lose free time", ["Students forget the lesson", "Teachers get tired"]],
      ["What does the author conclude?", "We should find a balance", ["Homework should be banned", "Homework should double"]]] }
  ];
  const LETR = [
    ["How do you start a letter when you do not know the person's name?", "Madame, Monsieur,", ["Salut tout le monde,", "Chers amis,"]],
    ["What does 'Je me permets de vous écrire pour…' mean?", "I am writing to you to…", ["I allow you to write to…", "I forgot to write to…"]],
    ["What does 'Je souhaiterais postuler' mean?", "I would like to apply", ["I would like to resign", "I would like to postpone"]],
    ["What does 'Dans l'attente de votre réponse' mean?", "Looking forward to your reply", ["Without any reply", "In the middle of your reply"]],
    ["What does 'Je reste à votre disposition' mean?", "I remain available to you", ["I am staying at your house", "I am on vacation"]],
    ["What does 'Veuillez trouver ci-joint mon CV' mean?", "Please find my résumé attached", ["Please join my CV club", "Please write my résumé"]],
    ["Which closing is standard and polite for an email?", "Cordialement", ["Bisous", "À plus"]],
    ["What is 'une lettre de motivation'?", "A cover letter", ["A motivational poster", "A thank-you card"]],
    ["What does 'Suite à votre annonce' mean?", "Following your ad", ["After your party", "Because of your angry letter"]]
  ];
  const NUA = [
    ["Je ___ très bien cette ville. (I know it well)", "connais", ["sais", "peux"]],
    ["Je ___ nager. (I know how to)", "sais", ["connais", "peux"]],
    ["How do you say 'He misses his sister'?", "Sa sœur lui manque.", ["Il manque sa sœur.", "Il rate sa sœur."]],
    ["How do you say 'That news made me happy'?", "Cette nouvelle m'a rendu heureux.", ["Cette nouvelle m'a fait heureux.", "Cette nouvelle m'a mis heureux."]],
    ["How do you say 'I spent two hours reading'?", "J'ai passé deux heures à lire.", ["J'ai dépensé deux heures à lire.", "J'ai gagné deux heures à lire."]],
    ["How do you say 'I visit my aunt'?", "Je rends visite à ma tante.", ["Je visite ma tante.", "Je visite à ma tante."]],
    ["How do you say 'I visit the museum'?", "Je visite le musée.", ["Je rends visite le musée.", "Je rends visite au musée."]],
    ["J'___ de la musique. (I listen to)", "écoute", ["entends", "regarde"]],
    ["J'___ un bruit dans la cuisine. (I hear)", "entends", ["écoute", "regarde"]],
    ["Le professeur ___ le français aux élèves. (teaches)", "enseigne", ["apprend", "étudie"]]
  ].map(([t, a, w]) => [t.endsWith("?") ? t : `Fill in: ${t}`, a, w]);
  const PREP = [
    ["Je pense ___ mes vacances.", "à", ["de", "sur"]], ["Il rêve ___ devenir pilote.", "de", ["à", "sur"]],
    ["Elle s'intéresse ___ l'histoire.", "à", ["de", "sur"]], ["Nous comptons ___ toi pour nous aider.", "sur", ["à", "de"]],
    ["Tu te souviens ___ ce jour-là ?", "de", ["à", "sur"]], ["Il a réussi ___ ouvrir la porte.", "à", ["de", "sur"]],
    ["J'ai besoin ___ ton aide.", "de", ["à", "sur"]], ["Elle s'habitue ___ la vie en ville.", "à", ["de", "sur"]],
    ["Cela dépend ___ la météo.", "de", ["à", "sur"]], ["Il a décidé ___ partir tôt.", "de", ["à", "sur"]],
    ["Nous participons ___ un concours.", "à", ["de", "sur"]]
  ];
  const FIG = [
    ["Il est fort comme un lion.", "A simile (comparison with comme)", ["A metaphor", "An exaggeration"]],
    ["Cette fille est un rayon de soleil.", "A metaphor", ["A simile", "Irony"]],
    ["Le vent murmure dans les arbres.", "Personification", ["A simile", "A rhyme"]],
    ["J'ai mille choses à faire !", "An exaggeration (hyperbole)", ["A metaphor", "Personification"]],
    ["Ses yeux sont des étoiles.", "A metaphor", ["A simile", "A rhyme"]],
    ["Elle est rapide comme l'éclair.", "A simile", ["A metaphor", "Personification"]],
    ["La lune sourit à la mer.", "Personification", ["An exaggeration", "A simile"]],
    ["Je meurs de faim !", "An exaggeration (hyperbole)", ["A simile", "A metaphor"]],
    ["Il fait un temps magnifique, dit-il sous la pluie.", "Irony", ["A simile", "Personification"]]
  ].map(([s, a, w]) => [`Which figure of speech is it? « ${s} »`, a, w]);
  const RHY = [
    ["jour", "amour", ["nuit", "matin"]], ["chat", "rat", ["chien", "souris"]], ["mer", "hiver", ["ciel", "lune"]],
    ["étoile", "voile", ["soleil", "nuage"]], ["lune", "fortune", ["ciel", "étoile"]], ["cœur", "fleur", ["ciel", "mer"]],
    ["nuit", "bruit", ["jour", "soleil"]], ["pain", "main", ["pied", "tête"]], ["chanson", "garçon", ["chanter", "chance"]],
    ["ciel", "miel", ["terre", "mer"]], ["rose", "chose", ["rire", "roue"]], ["jardin", "matin", ["maison", "jardinier"]]
  ].map(([w, a, wr]) => [`Which word rhymes with "${w}"?`, a, wr]);
  const REVO = [
    ["What is the motto of France?", "Liberté, Égalité, Fraternité", ["Paix, Amour, Joie", "Force, Honneur, Gloire"]],
    ["What is celebrated on July 14?", "The French national day, linked to the Bastille in 1789", ["The end of school", "The first day of spring"]],
    ["What are the colors of the French flag?", "Blue, white, red", ["Green, white, red", "Blue, yellow, red"]],
    ["What is La Marseillaise?", "The national anthem", ["A famous city", "A type of soup"]],
    ["Who is Marianne?", "A symbol of the French Republic", ["A queen of France", "A cartoon hero"]],
    ["What was the 1789 Déclaration des droits de l'homme et du citoyen?", "A text about the rights of all citizens", ["A recipe book", "A treaty about boats"]],
    ["Who built the Palace of Versailles and was called the Sun King?", "Louis XIV", ["Napoléon", "Charlemagne"]],
    ["Who became Emperor of the French in 1804?", "Napoléon Bonaparte", ["Louis XIV", "Charles de Gaulle"]],
    ["How long is a French president's term?", "Five years", ["Two years", "Ten years"]]
  ];
  const PARIS = [
    ["The Eiffel Tower was built for which event?", "The 1889 World's Fair", ["The Olympic Games of 1900", "A royal wedding"]],
    ["Which Paris museum shows the Joconde (Mona Lisa)?", "Le Louvre", ["Le Centre Pompidou", "Le Musée d'Orsay"]],
    ["Notre-Dame cathedral is on an island in which river?", "The Seine", ["The Rhône", "The Loire"]],
    ["Which monument stands at the top of the Champs-Élysées?", "L'Arc de Triomphe", ["La tour Eiffel", "Le Sacré-Cœur"]],
    ["The white church Sacré-Cœur sits on which hill?", "Montmartre", ["Montparnasse", "Belleville"]],
    ["Which building has pipes and tubes on the outside and is full of modern art?", "Le Centre Pompidou", ["Le Louvre", "Notre-Dame"]],
    ["The Musée d'Orsay was once what?", "A railway station", ["A castle", "A school"]],
    ["How many arrondissements (districts) does Paris have?", "20", ["10", "50"]],
    ["Which green space in Paris has a famous palace and a pond with toy sailboats?", "Le jardin du Luxembourg", ["Le Champ de Mars", "Le mont Blanc"]]
  ];
  const TYP18 = [["Type in French: <b>freedom</b> (la ___)", "liberté"], ["Type in French: <b>peace</b> (la ___)", "paix"], ["Type in French: <b>truth</b> (la ___)", "vérité"], ["Type in French: <b>hope</b> (l'___)", "espoir"], ["Type in French: <b>happiness</b> (le ___)", "bonheur"], ["Type in French: <b>law</b> (la ___)", "loi"], ["Type in French: <b>to vote</b>", "voter"], ["Type in French: <b>citizen</b> (le ___)", "citoyen"], ["Type in French: <b>wisdom</b> (la ___)", "sagesse"], ["Type in French: <b>equality</b> (l'___)", "égalité"], ["Type in French: <b>tax</b> (l'___)", "impôt"], ["Type in French: <b>customer</b> (le ___)", "client"]];
  const SPEL = [
    ["garçon", ["garson", "garsson"]], ["forêt", ["forrêt", "fourêt"]], ["hôpital", ["hôpitale", "hôpittal"]], ["français", ["françés", "fransais"]],
    ["à côté", ["à cotté", "à coster"]], ["mère", ["mèrre", "mairre"]], ["crème", ["crèmme", "craime"]], ["apporter", ["aporter", "apporté"]],
    ["personne", ["persone", "personnne"]], ["commencer", ["comencer", "commancer"]], ["développer", ["développper", "dévelloper"]], ["chaussette", ["chausette", "chosette"]]
  ].map(([a, w]) => ["Which spelling is correct?", a, w]);

  const spelH = ["Look at the accents (é è ê ç) and double letters. Say the word slowly.", "Think of a word from the same family or a rule: ç before a, o, u for the soft s sound; ê often replaces an old s.", "Example: 'élève' has è before a silent e, and 'pomme' has a double m. Now check yours."];

  // ====================== LEVEL 16 ======================
  const L16 = [
    les("Travel and tourism", vocab(B.travel), tVocab(B.travel)),
    les("Technology", vocab(B.tech), tVocab(B.tech)),
    les("Sports and competition", vocab(B.sport), tVocab(B.sport)),
    les("Cooking", vocab(B.cook), tVocab(B.cook)),
    les("Jobs and careers", vocab(B.jobs), tVocab(B.jobs)),
    les("Friends and feelings", vocab(B.rel), tVocab(B.rel)),
    les("French sayings: expressions", mean(IDI1, "Do not translate word by word! Imagine the picture, then ask what situation people use it in.", "An expression has a hidden meaning. Think about when someone would say it.", "Example: 'Avoir la pêche' means to feel full of energy, not to have a peach."),
      tg("Expressions", "🗣️", "French is full of sayings where the words and the meaning are very different. We call them <b>des expressions</b>.", "Il pleut des cordes<br>Poser un lapin<br>Être dans la lune", "Literally: it rains ropes, to put down a rabbit, to be in the moon. Real meaning: it pours, to stand someone up, to daydream.", "Learn each expression as one block, with a picture in your head.")),
    les("Reading and understanding", mc(readQ(READ16), readH, 2), [S("Reading", "📖", "You will read short French texts and answer questions about them in English."), S("How to read", "🔎", "First read the whole text once. Then read the question, and look for its key words in the text."), S("Tip", "🧠", "Notice time words (hier, demain, chaque samedi) and the tense of the verbs. They tell you when things happen.")]),
    les("Writing emails and letters", mc(MAIL, ["Think about who you write to: a friend or an adult you must respect?", "Friends: salut, bises. Adults and offices: Madame, Monsieur, Veuillez agréer, vous.", "Example: to a friend you write 'Salut Paul !'; to a doctor you write 'Docteur,' and end with 'Cordialement'. Now decide for yours."], 2),
      tg("Formal and friendly", "✉️", "French has two styles of writing: <b>friendly</b> (tu) and <b>formal</b> (vous).", "Salut Marie, … Bises !<br>Madame la Directrice, … Veuillez agréer mes salutations distinguées.", "Friendly messages are short. Formal ones use vous and polite phrases.", "Always check the person: friend, teacher, or office? Then pick the style.")),
    les("Tricky look-alikes (faux amis)", mean(FF, "Some French words look like English words but mean something else. Do not trust your first guess!", "Think: is this a real match, or a trap? Learn the traps by heart.", "Example: 'le pain' looks like 'pain' but means bread. Now think about yours."),
      tg("False friends", "🪤", "<b>Faux amis</b> are words that look the same in French and English but have different meanings.", "la librairie = bookstore<br>actuellement = currently<br>attendre = to wait", "A bookstore is <b>une librairie</b>. A library is <b>une bibliothèque</b>.", "Make a list of faux amis that trick you and test yourself every week.")),
    les("Boy word or girl word?", mc(GEN, ["Think about the ending of the word. Does it end like other girl or boy words you know?", "Endings -tion, -té, -ure, -ie tend to be girl words. Endings -ème, -age, -isme tend to be boy words. Not always!", "Example: 'la nation' (girl) and 'le fromage' (boy). Now choose for yours."], 1),
      tg("Gender of nouns", "🚹🚺", "Every French noun is <b>masculine</b> (le) or <b>feminine</b> (la). Some tricky ones surprise people.", "le problème, le poème, le climat<br>la main, la mer, la dent", "Learn each new noun together with its le or la.", "Words ending in -ème are usually masculine, even if they look soft.")),
    les("Sound-alike words", mc(HOM, ["Say the sentence out loud. Which little word fits the meaning?", "Test with other words: a = has (avoir), à = to or at, ou = or, où = where, on = one, ont = have, son = his, sont = are.", "Example: 'Il ___ faim' → a (he has hunger), because you can say 'il avait faim'. Now test yours."], 2),
      tg("Homophones", "👂", "Some French words sound the same but are spelled differently. Their meaning tells you which to write.", "Elle <b>a</b> un chat. Elle va <b>à</b> Paris.<br>Thé <b>ou</b> café ? <b>Où</b> es-tu ?", "a = has, à = to; ou = or, où = where.", "Try swapping in 'avait' for a/à: if it works, write a (no accent).")),
    les("French holidays and traditions", mc(HOL, ["Think about the calendar. What happens on that date or in that season?", "Many traditions are linked to food, flowers or music.", "Example: on December 25 families celebrate Christmas and eat a big meal. Now think about yours."], 2),
      [S("Traditions", "🎉", "France has many holidays. Some are national (la fête nationale), some are family traditions."), S("Examples", "🥞🌷🎶", "<b>La Chandeleur</b>: crêpes. <b>Le 1er mai</b>: muguet. <b>La fête de la musique</b>: June 21, free music in the streets."), S("Tip", "🧠", "Link each holiday with a food, a flower or a color to remember it.")]),
    les("Food and eating in France", mc(FOOD, ["Picture the food or the place it comes from.", "Many famous dishes are linked to one region of France.", "Example: a baguette is a long, thin loaf of bread bought fresh at the boulangerie. Now think about yours."], 2),
      [S("French food", "🥖🧀🥐", "French meals are a big part of the culture: breakfast (petit-déjeuner), lunch (déjeuner) and dinner (dîner)."), S("Famous foods", "🍳", "<b>Camembert</b> from Normandy, <b>crêpes</b> from Brittany, <b>bouillabaisse</b> from Marseille."), S("Tip", "🧠", "In France, déjeuner is lunch, not breakfast!")]),
    les("The French-speaking world", mc(WORLD, ["Picture a world map. Which part of the world is it?", "French is spoken on five continents.", "Example: Dakar is the capital of Senegal, in West Africa. Now think about yours."], 2),
      [S("French around the world", "🌍", "Over 300 million people speak French. It is official in many countries in Europe, Africa, North America and islands in the oceans."), S("Places", "🍁🏝️", "Québec (Canada), Belgium, Switzerland, Senegal, Madagascar, Tahiti, Guadeloupe…"), S("Tip", "🧠", "Each place has its own accent and special words.")]),
    les("Type the French word", typed(TYP16, "Think back to the words you learned in this level.", "Example: 'the bread' is 'le pain'. Now type yours. (Accents are optional.)"), [S("Typing practice", "⌨️", "This time you type the French word yourself."), S("Remember", "🧠", "The English word and its picture in your head help you find the French word."), S("Tip", "✍️", "Accents are optional here, but it is good to learn them.")]),
    les("Word building with prefixes", mc(PREF, ["Look at the beginning of the word. Re-, dé-, in-, mal-, pré-, sous- all change the meaning.", "Re- = again, dé- = undo, in-/im- = not, mal- = badly or not, pré- = before, sous- = under.", "Example: 'refaire' = to do again; 'impatient' = not patient. Now work out yours."], 2),
      tg("Prefixes", "🧩", "A <b>prefix</b> is a small piece at the start of a word that changes its meaning.", "re- = again: relire<br>dé- = undo: défaire<br>in- = not: inutile<br>mal- = badly: malheureux", "Break each word into prefix + base word.", "Before p, b, m the prefix in- becomes im-: impossible, imbattable.")),
    les("Signs and notices", mean(SIGN, "Read the notice. Where would you see it: in a shop, on a door, on the road?", "Look at the key word (défense, sortie, entrée, louer, complet).", "Example: 'Entrée interdite' means no entry. Now think about yours."),
      tg("Signs", "🪧", "Reading signs is a very useful skill when you travel.", "Sortie = exit<br>Entrée = entrance<br>Fermé = closed", "Short signs use few words.", "Look for the key word, and the meaning follows."))
  ];
  L16.push(MIX("Mixed practice", L16.slice(0, 18), [L16[0], L16[6], L16[9]]));
  L16.push(MIX("Level 16 Challenge", L16.slice(0, 18), [L16[8], L16[11], L16[13]]));

  // ====================== LEVEL 17 ======================
  const L17 = [
    les("Shopping and fashion", vocab(B.shop), tVocab(B.shop)),
    les("Health problems", vocab(B.ill), tVocab(B.ill)),
    les("City and buildings", vocab(B.city), tVocab(B.city)),
    les("Music and movies", vocab(B.cine), tVocab(B.cine)),
    les("Science lab", vocab(B.sci), tVocab(B.sci)),
    les("Daily routine", vocab(B.daily), tVocab(B.daily)),
    les("More French expressions", mean(IDI2, "Do not translate word by word! Picture the scene and ask what it means in real life.", "Think about the situation where people say it.", "Example: 'Avoir le trac' means to have stage fright, not to have a track. Now think about yours."),
      tg("Expressions, round two", "🗣️", "Here are more fun expressions that French people use every day.", "Se mettre sur son 31<br>Donner sa langue au chat", "Dress in your best / give up guessing.", "Learn them in blocks, not word by word.")),
    les("Reading: letters and stories", mc(readQ(READ17), readH, 2), [S("Reading", "📖", "More French texts: a postcard, a news item and a story."), S("How to read", "🔎", "Find who, what, when and where in the first read. Then answer the question."), S("Tip", "🧠", "A postcard often says what the writer did (past) and will do (future).")]),
    les("Linking your ideas", mean(CONN, "These words connect two ideas. Is the second idea adding, contrasting or concluding?", "Short linking words give your writing a clear shape.", "Example: 'cependant' means however. Now think about yours."),
      tg("Linking words, level up", "🔗", "Good writers use <b>connectors</b> to guide the reader.", "Néanmoins = nevertheless<br>Par conséquent = therefore<br>En revanche = on the other hand", "Use one connector per idea, not ten in a row.", "Place a connector at the start of the sentence, followed by a comma.")),
    les("Casual or formal?", mc(REG, ["Is this word used with friends, or with a teacher, a boss, a stranger?", "Casual (familier) words are fine with friends. For adults, use polite words and vous.", "Example: 'le gamin' (casual) = the kid; the polite word is 'l'enfant'. Now work out yours."], 2),
      tg("Registers", "🎚️", "French has several levels of language: <b>familier</b> (casual), <b>courant</b> (normal), <b>soutenu</b> (formal).", "le boulot = le travail<br>la bagnole = la voiture<br>le bouquin = le livre", "Same meaning, different feeling.", "With adults you do not know, use vous and avoid slang.")),
    les("Nouns from verbs", mc(SUF, ["Many nouns are built from a verb by adding a small ending.", "Common endings: -ment (le changement), -tion (la décision), -age (le voyage). Learn each noun with le or la.", "Example: from 'inventer' we get 'l'invention'; from 'loger' we get 'le logement'. Now work out yours."], 2),
      tg("Verb to noun", "🏗️", "You can turn many verbs into nouns with endings like <b>-ment, -tion, -age</b>.", "changer → le changement<br>décider → la décision<br>voyager → le voyage", "The ending also tells you if the noun is le or la: -ment and -age are masculine, -tion is feminine.", "Patterns help, but exceptions exist: learn the noun with its le or la.")),
    les("Opposites, level up", mc(ANT, ["Think of the idea that is the reverse.", "Opposites often come in pairs you can learn together.", "Example: the opposite of 'heureux' is 'malheureux', and of 'ouvrir' is 'fermer'. Now think about yours."], 2),
      tg("Opposites", "↔️", "Opposites help you remember words in pairs.", "rapide ↔ lent<br>l'avantage ↔ l'inconvénient<br>la victoire ↔ la défaite", "Learn both words together.", "Quiz yourself: say a word, then its opposite.")),
    les("Words with the same meaning", mc(SYN, ["Which word is close in meaning, not the opposite?", "Synonyms are alternatives. Make your writing richer by changing a word that you used too often.", "Example: 'joli' and 'beau' both describe something nice to look at. Now think about yours."], 2),
      tg("Synonyms", "🟰", "A <b>synonym</b> is a word with almost the same meaning.", "content = heureux<br>commencer = débuter", "Words are rarely exactly the same: one might be more formal.", "Use a synonym instead of repeating the same word.")),
    les("Famous French people", mc(FAM, ["Think about the field: science, art, building, exploring?", "Link each person with one famous thing they did.", "Example: Claude Debussy was a composer. Now think about yours."], 2),
      [S("French inventors and artists", "💡", "France has produced many famous scientists, artists and inventors."), S("Examples", "🔬🎨🎈", "Pasteur (vaccines), Curie (radioactivity), Monet (painting), Montgolfier (balloons)."), S("Tip", "🧠", "Link each name with one picture: a balloon, a paintbrush, a microscope.")]),
    les("Proverbs", mc(PRV, ["Proverbs give advice. What lesson is behind the picture?", "Think about the idea, not the exact words.", "Example: 'Tout vient à point à qui sait attendre' means good things come to those who wait. Now think about yours."], 2),
      tg("Proverbs", "📜", "<b>Un proverbe</b> is a short saying that gives advice.", "Rome ne s'est pas faite en un jour.<br>L'union fait la force.", "Big things take time. Together we are stronger.", "Many French proverbs have English cousins.")),
    les("Famous books and authors", mc(LITE, ["Think about the story or the hero.", "Link each author with their most famous book or character.", "Example: Charles Baudelaire wrote poems called Les Fleurs du mal. Now think about yours."], 2),
      [S("French literature", "📚", "French books are read around the world."), S("Examples", "🌹🚀🛡️", "Le Petit Prince, Vingt mille lieues sous les mers, Les Trois Mousquetaires."), S("Tip", "🧠", "Try the comic books (BD) Astérix and Tintin to practice reading.")]),
    les("Type the opposite", typed(TYP17, "Think about the word that is the reverse.", "Example: the opposite of 'grand' is 'petit'. Now type yours. (Accents are optional.)"), [S("Typing practice", "⌨️", "You type the opposite word in French."), S("Remember", "🧠", "Pairs are easier to remember."), S("Tip", "✍️", "Accents are optional here.")]),
    les("Big numbers and years", numGen, [S("Big numbers", "🔢", "French numbers above 60 are built in a special way."), S("Special builds", "🧮", "70 = soixante-dix (60 + 10). 80 = quatre-vingts (4 × 20). 90 = quatre-vingt-dix (80 + 10)."), S("Years", "📅", "1789 = mille sept cent quatre-vingt-neuf. 2025 = deux mille vingt-cinq. Say the number in parts: thousands, hundreds, tens.")])
  ];
  L17.push(MIX("Mixed practice", L17.slice(0, 18), [L17[0], L17[8], L17[11]]));
  L17.push(MIX("Level 17 Challenge", L17.slice(0, 18), [L17[6], L17[9], L17[17]]));

  // ====================== LEVEL 18 ======================
  const L18 = [
    les("Society and citizens", vocab(B.society), tVocab(B.society)),
    les("Work and economy", vocab(B.econ), tVocab(B.econ)),
    les("Big ideas", vocab(B.abstract), tVocab(B.abstract)),
    les("Arguing a point", vocab(B.debate), tVocab(B.debate)),
    les("Airport and hotel", vocab(B.airport), tVocab(B.airport)),
    les("Technology and AI", vocab(B.ai), tVocab(B.ai)),
    les("Even more expressions", mean(IDI3, "Do not translate word by word! Think about what people really mean when they say it.", "Picture a situation where someone could say this sentence.", "Example: 'Avoir le trac' means to have stage fright. Now think about yours."),
      tg("Expressions, round three", "🗣️", "More expressions to sound like a real French speaker.", "Faire d'une pierre deux coups<br>Dormir comme un loir", "Do two things at once. Sleep deeply.", "Try using one expression a day.")),
    les("Reading: longer texts", mc(readQ(READ18), readH, 2), [S("Reading", "📖", "Longer texts, with opinions and history."), S("How to read", "🔎", "Look for the main idea first, then for details."), S("Tip", "🧠", "Words like 'pourtant' and 'en revanche' signal a contrast.")]),
    les("Formal letters", mc(LETR, ["Think about who reads it: an employer or an office, so use vous and polite phrases.", "Formal letters have set phrases that you can reuse.", "Example: 'Je vous remercie par avance' means thank you in advance. Now think about yours."], 2),
      tg("Formal letters", "🧾", "A formal letter or an application email follows a pattern: greeting, reason, details, polite ending.", "Madame, Monsieur,<br>Je me permets de vous écrire…<br>Cordialement,", "Always use vous. Keep sentences clear.", "Check the name and spelling twice before you send.")),
    les("Tricky verb pairs", mc(NUA, ["Two verbs can look similar but are used differently. Think about what is being said.", "Check the context: a person or a place? a fact or a skill? hearing or listening?", "Example: savoir = to know a fact or skill (je sais lire); connaître = to be familiar with (je connais Paul). Now decide for yours."], 2),
      tg("Verb pairs", "⚖️", "Some verbs seem to mean the same in English but are different in French.", "savoir / connaître<br>écouter / entendre<br>visiter / rendre visite à", "Visiter is for places; rendre visite à is for people.", "Learn them as pairs with examples.")),
    les("Verbs with small words (à, de, sur)", mc(PREP, ["Which little word follows this verb? Think of verbs you know like penser ___, rêver ___.", "Verbs with prepositions must be memorized: penser à, rêver de, compter sur, avoir besoin de.", "Example: 'Il parle ___ son ami' → à (parler à quelqu'un). Now think about yours."], 2),
      tg("Verbs and prepositions", "🔗", "Many French verbs need a small word after them: <b>à, de, sur</b>.", "penser à<br>rêver de<br>compter sur", "The English verb may use another word (think about / dream of / count on).", "Learn the verb and the small word together.")),
    les("Words for stories and poems", vocab(B.lit), tVocab(B.lit)),
    les("Spot the figure of speech", mc(FIG, ["Does it compare with comme? Does it say one thing IS another? Does it give human actions to a non-human thing?", "Comme = simile. 'A is B' = metaphor. A non-human doing human things = personification. Too much = exaggeration.", "Example: 'Il est têtu comme une mule' uses comme, so it is a simile. Now decide for yours."], 2),
      tg("Figures of speech", "🎭", "Writers use figures of speech to make images in your mind.", "fort comme un lion (simile)<br>un rayon de soleil (metaphor)<br>le vent murmure (personification)", "Simile uses comme. Metaphor says one thing is another.", "Look for comme first.")),
    les("Rhymes", mc(RHY, ["Say the ending of the word out loud. Which other word ends with the same sound?", "A rhyme is about sound, not spelling.", "Example: 'soleil' rhymes with 'sommeil'. Now find yours."], 2),
      tg("Rhymes", "🎶", "In poems and songs, words at the end of lines often rhyme.", "jour / amour<br>pain / main", "The ending sound is the same.", "Close your eyes and listen to the ends of words.")),
    les("The Republic and its history", mc(REVO, ["Think about what you know about France: its flag, its holiday, its motto.", "Many symbols come from the Revolution of 1789.", "Example: the rooster (le coq) is a French emblem. Now think about yours."], 2),
      [S("The French Republic", "🇫🇷", "France is a republic. The motto is <b>Liberté, Égalité, Fraternité</b>."), S("Symbols", "🎺", "The flag is blue, white and red. The anthem is La Marseillaise. July 14 is the national day."), S("Tip", "🧠", "Know the symbols to understand the culture.")]),
    les("Paris and its landmarks", mc(PARIS, ["Picture a map of Paris, with the Seine in the middle.", "Link each landmark with one fact.", "Example: the Panthéon honors great French people. Now think about yours."], 2),
      [S("Paris", "🗼", "Paris has 20 districts called arrondissements, arranged like a snail."), S("Landmarks", "🏛️🎨", "La tour Eiffel, le Louvre, Notre-Dame, l'Arc de Triomphe, le Sacré-Cœur."), S("Tip", "🧠", "Link each landmark with one picture.")]),
    les("Type the big idea", typed(TYP18, "Think about the big ideas from this level.", "Example: 'the justice' is 'la justice'. Now type yours. (Accents are optional.)"), [S("Typing practice", "⌨️", "You type the French word for a big idea."), S("Remember", "🧠", "Most end in -té or -ce."), S("Tip", "✍️", "Accents are optional here.")]),
    les("Spelling and accents", mc(SPEL, spelH, 2), tg("Spelling", "✍️", "Accents and double letters are tricky, but patterns help.", "garçon, forêt, hôpital, français", "ç, ê, ô are all clues from older words.", "Write the word three times, then check it."))
  ];
  L18.push(MIX("Mixed practice", L18.slice(0, 18), [L18[0], L18[9], L18[13]]));
  L18.push(MIX("Level 18 Challenge", L18.slice(0, 18), [L18[7], L18[10], L18[14]]));

  Object.assign(FRENCH_LEVELS, { 16: L16, 17: L17, 18: L18 });
})();
