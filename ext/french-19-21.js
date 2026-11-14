// ext/french-19-21.js : French, levels 19-21 (9th grade, 10th grade first half).
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

  // =====================================================  LEVEL 19
  const B19 = {
    weather: BK("Weather and natural events", [["la canicule", "heatwave"], ["le verglas", "black ice"], ["le brouillard", "fog"], ["l'averse", "rain shower"], ["la grêle", "hail"], ["la tempête", "storm"], ["le séisme", "earthquake"], ["l'éclair", "flash of lightning", "⚡"], ["le tonnerre", "thunder"], ["la brume", "mist"], ["la rafale", "gust of wind"], ["le dégel", "thaw"]], { tip: "<b>La canicule</b> is the hot-weather word you hear in summer news. <b>Le verglas</b> makes roads slippery in winter." }),
    body: BK("Inside the body", [["le cœur", "heart", "❤️"], ["le poumon", "lung"], ["le cerveau", "brain", "🧠"], ["l'estomac", "stomach"], ["le foie", "liver"], ["le rein", "kidney"], ["le squelette", "skeleton", "💀"], ["le muscle", "muscle", "💪"], ["la veine", "vein"], ["la peau", "skin"], ["l'os", "bone", "🦴"], ["l'articulation", "joint"]], { tip: "<b>Le cerveau</b> and <b>le squelette</b> look a bit like English words. <b>Le foie</b> (liver) sounds like \"fwah\"." }),
    studies: BK("Studies and exams", [["le bulletin", "report card"], ["la moyenne", "average mark"], ["le brevet", "exam at the end of middle school"], ["le baccalauréat", "high-school diploma exam"], ["la mention", "honors (on a result)"], ["redoubler", "to repeat a school year"], ["le concours", "competitive exam"], ["le stage", "internship"], ["l'orientation", "career and course guidance"], ["la filière", "course track"], ["l'épreuve", "test, exam part"], ["réviser", "to revise, to study again"]], { tip: "In France most students say <b>le bac</b> for <b>le baccalauréat</b>. <b>Réviser</b> means to study again, not to \"review\" a movie." }),
    elect: BK("Elections and democracy", [["voter", "to vote"], ["l'élection", "election"], ["le candidat", "candidate"], ["le scrutin", "ballot, voting"], ["le bulletin de vote", "ballot paper"], ["l'isoloir", "polling booth"], ["le maire", "mayor"], ["le député", "member of parliament"], ["le gouvernement", "government"], ["le parti", "political party"], ["la majorité", "majority"], ["la campagne", "campaign"]], { tip: "<b>Le maire</b> runs a town (la mairie is the town hall). <b>Le député</b> sits in the National Assembly." }),
    housing: BK("Housing and moving", [["déménager", "to move house"], ["louer", "to rent"], ["le loyer", "rent"], ["le propriétaire", "owner, landlord"], ["le locataire", "tenant"], ["l'immeuble", "apartment building"], ["l'étage", "floor (of a building)"], ["l'ascenseur", "elevator"], ["le voisin", "neighbor"], ["le quartier", "neighborhood"], ["le déménageur", "mover"], ["les charges", "building costs (heating, water…)"]], { tip: "<b>Le rez-de-chaussée</b> is the ground floor, so <b>le premier étage</b> is what an American calls the second floor." }),
    help: BK("Helping others", [["le bénévole", "volunteer"], ["l'association", "club, charity group"], ["le don", "donation"], ["aider", "to help"], ["partager", "to share"], ["la solidarité", "solidarity, standing together"], ["l'entraide", "mutual help"], ["soutenir", "to support"], ["la collecte", "collection drive"], ["le refuge", "shelter"], ["l'accueil", "welcome"], ["encourager", "to encourage"]], { tip: "<b>Un bénévole</b> works for free. <b>Une association</b> in French is often a club or a charity." }),
    pic: BK("Describing a picture", [["sur la photo", "in the photo"], ["au premier plan", "in the foreground"], ["à l'arrière-plan", "in the background"], ["au centre", "in the center"], ["en haut", "at the top"], ["en bas", "at the bottom"], ["à gauche de", "to the left of"], ["à droite de", "to the right of"], ["au milieu de", "in the middle of"], ["derrière", "behind"], ["à côté de", "next to"], ["en face de", "opposite, facing"]], { tip: "Start with <b>Sur la photo, on voit…</b> (In the photo, we see…), then say where things are." })
  };
  const ANI = [
    ["Avoir une faim de loup", "To be very hungry", ["To be afraid of wolves", "To have no appetite"]],
    ["Être têtu comme une mule", "To be very stubborn", ["To be very strong", "To be very slow"]],
    ["Un froid de canard", "Bitterly cold weather", ["A cold dish of duck", "A quiet pond"]],
    ["Avoir d'autres chats à fouetter", "To have more important things to do", ["To own many cats", "To be angry at pets"]],
    ["Avoir une mémoire d'éléphant", "To have a very good memory", ["To be very heavy", "To forget everything"]],
    ["Être fier comme un paon", "To be very proud", ["To be very colorful", "To be afraid of birds"]],
    ["Faire l'autruche", "To ignore a problem on purpose", ["To run fast", "To lay a big egg"]],
    ["Appeler un chat un chat", "To say things plainly", ["To give a pet a name", "To call a cat"]],
    ["Parler français comme une vache espagnole", "To speak French very badly", ["To speak French very fast", "To speak two languages"]],
    ["Avoir une fièvre de cheval", "To have a very high fever", ["To feel like riding a horse", "To be a fast runner"]]
  ];
  const BOD = [
    ["Avoir le bras long", "To have a lot of influence", ["To have long arms", "To be good at sports"]],
    ["Se mettre le doigt dans l'œil", "To be completely wrong", ["To have an eye problem", "To point at something"]],
    ["Avoir les dents longues", "To be very ambitious", ["To need a dentist", "To be very hungry"]],
    ["Ne pas avoir froid aux yeux", "To be bold and not afraid", ["To keep eyes warm", "To be tired"]],
    ["Avoir la langue bien pendue", "To be very talkative", ["To be sick", "To be unable to talk"]],
    ["Avoir les yeux plus gros que le ventre", "To take more food than you can eat", ["To have big eyes", "To eat very slowly"]],
    ["Faire la tête", "To sulk", ["To draw a face", "To win a race"]],
    ["Avoir du nez", "To have good instincts", ["To have a cold", "To smell something bad"]],
    ["Rester bouche bée", "To be left speechless in surprise", ["To eat with an open mouth", "To feel very hungry"]],
    ["Tenir la jambe à quelqu'un", "To keep someone talking for too long", ["To help someone stand", "To trip someone"]]
  ];
  const POL = [
    ["You want someone to pass you the salt at a dinner with your friend's parents.", "Pourriez-vous me passer le sel, s'il vous plaît ?", ["Donne le sel !", "Je veux le sel."]],
    ["You ask a stranger for the time.", "Excusez-moi, auriez-vous l'heure ?", ["Dis, l'heure ?", "Il est quelle heure, toi ?"]],
    ["You did not hear your teacher and want it repeated.", "Pourriez-vous répéter, s'il vous plaît ?", ["Répète !", "Quoi ?"]],
    ["You ask a teacher if you may open the window.", "Puis-je ouvrir la fenêtre, s'il vous plaît ?", ["J'ouvre la fenêtre.", "Ouvre la fenêtre !"]],
    ["You say no thanks to a second helping.", "Non, merci, ça ira.", ["Non, beurk.", "Pas question !"]],
    ["You want the bill at a restaurant.", "L'addition, s'il vous plaît.", ["Donnez-moi l'addition maintenant !", "Je veux payer vite."]],
    ["You need to interrupt a conversation.", "Excusez-moi de vous interrompre.", ["Tais-toi !", "Arrête de parler."]],
    ["You ask an adult to speak more slowly.", "Pourriez-vous parler plus lentement ?", ["Parle moins vite !", "Tu parles trop."]],
    ["You thank someone for their help.", "Je vous remercie de votre aide.", ["Ouais, merci.", "C'est bon."]],
    ["You ask a stranger how to reach the station.", "Pourriez-vous m'indiquer le chemin pour la gare ?", ["La gare, c'est où ?", "Dis-moi la gare !"]]
  ];
  const READ19 = [
    { t: "Samedi 12 mars. Aujourd'hui, nous avons déménagé. Le camion est arrivé à huit heures, mais il pleuvait, alors les cartons sont tous mouillés. Ma chambre est plus petite qu'avant, mais elle a un grand balcon. Notre voisine, Mme Roux, nous a apporté un gâteau pour nous souhaiter la bienvenue. Demain, je vais explorer le quartier à vélo.", qs: [
      ["What happened today?", "The family moved house", ["The family went on vacation", "The writer bought a bike"]],
      ["Why are the boxes wet?", "It was raining", ["The truck was dirty", "A pipe broke"]],
      ["What did the neighbor bring?", "A cake", ["Some bread", "Some flowers"]],
      ["What will the writer do tomorrow?", "Explore the neighborhood by bike", ["Unpack all the boxes", "Visit Mme Roux"]]] },
    { t: "Mon blog de cuisine. Cette semaine, j'ai essayé une recette de crêpes bretonnes à la farine de sarrasin. Au début, mes crêpes se cassaient, parce que la poêle n'était pas assez chaude. Après deux essais ratés, j'ai enfin réussi. Mon frère en a mangé six ! Conseil : attendez que la poêle soit bien chaude avant de verser la pâte.", qs: [
      ["What did the writer cook?", "Buckwheat crêpes", ["A chocolate cake", "A vegetable soup"]],
      ["Why did the first crêpes break?", "The pan was not hot enough", ["There was too much flour", "The recipe was missing"]],
      ["How many crêpes did the brother eat?", "Six", ["Two", "Ten"]],
      ["What is the writer's advice?", "Wait until the pan is very hot", ["Use less flour", "Cook them very slowly"]]] },
    { t: "Chers élèves, la sortie au musée des sciences aura lieu jeudi prochain. Le car partira à 8 h 30 devant l'école. N'oubliez pas votre pique-nique et une veste, car il fera frais. Les élèves qui n'ont pas rendu l'autorisation signée ne pourront pas venir.", qs: [
      ["Where is the class going?", "To the science museum", ["To the zoo", "To a park"]],
      ["What will the bus do at 8:30?", "Leave from in front of the school", ["Arrive at the museum", "Pick up the picnic"]],
      ["What should students bring?", "A picnic and a jacket", ["A camera and a map", "Money and a pen"]],
      ["Who cannot come?", "Students without the signed permission", ["Students who forgot lunch", "Students who are late"]]] }
  ];
  const AFR = [
    ["What is the capital of Senegal?", "Dakar", ["Bamako", "Abidjan"]],
    ["Which city is the biggest city and business center of Côte d'Ivoire?", "Abidjan", ["Dakar", "Accra"]],
    ["What is the capital of Morocco?", "Rabat", ["Algiers", "Tunis"]],
    ["What is the capital of Algeria?", "Algiers (Alger)", ["Rabat", "Tunis"]],
    ["What is the capital of Tunisia?", "Tunis", ["Alger", "Rabat"]],
    ["Which huge desert covers a large part of North Africa?", "The Sahara", ["The Gobi", "The Kalahari"]],
    ["Which ocean surrounds the French-speaking island of Madagascar?", "The Indian Ocean", ["The Atlantic Ocean", "The Arctic Ocean"]],
    ["What is the capital of the Democratic Republic of the Congo, a country where French is an official language?", "Kinshasa", ["Dakar", "Bamako"]],
    ["Which country is part of the Maghreb (North-West Africa)?", "Tunisia", ["Senegal", "Cameroon"]],
    ["What is the capital of Mali?", "Bamako", ["Dakar", "Rabat"]]
  ];
  const QUE = [
    ["What is the main language of the Canadian province of Québec?", "French", ["English", "Spanish"]],
    ["What is the capital of Canada?", "Ottawa", ["Montréal", "Québec"]],
    ["Which is the biggest city in Québec?", "Montréal", ["Ottawa", "Québec City"]],
    ["What is Québec's motto, found on its license plates: « Je me ... »?", "souviens (I remember)", ["tais (I am quiet)", "lève (I get up)"]],
    ["What is <i>la poutine</i>?", "Fries with cheese curds and gravy", ["A kind of pancake", "A cold fish soup"]],
    ["In Québec, <i>le déjeuner</i> means...", "Breakfast", ["Dinner", "A snack"]],
    ["In Québec, <i>le souper</i> means...", "Dinner (evening meal)", ["Breakfast", "Lunch"]],
    ["In Québec, <i>un courriel</i> is...", "An email", ["A courier", "A small bird"]],
    ["What is <i>le sirop d'érable</i>?", "Maple syrup", ["Cough syrup", "Tree sap soup"]],
    ["Which long river runs through Québec: <i>le fleuve Saint-...</i>?", "Laurent", ["Louis", "Pierre"]],
    ["What is the Québec word <i>magasiner</i>?", "To go shopping", ["To store things", "To read magazines"]]
  ];
  const PCI = [
    ["Hier soir, je ___ mes devoirs quand le téléphone a sonné. (faire)", "faisais", ["ai fait", "fais"]],
    ["Soudain, la lumière ___. (s'éteindre)", "s'est éteinte", ["s'éteignait", "s'éteint"]],
    ["Quand j'étais petit, nous ___ toujours chez ma grand-mère en été. (aller)", "allions", ["sommes allés", "irons"]],
    ["Il ___ très froid ce matin-là, alors nous avons mis nos manteaux. (faire)", "faisait", ["a fait", "fait"]],
    ["Samedi dernier, ils ___ au cinéma. (aller)", "sont allés", ["allaient", "vont"]],
    ["Elle ___ un livre quand elle s'est endormie. (lire)", "lisait", ["a lu", "lit"]],
    ["D'abord, il ___ la porte, puis il est entré. (ouvrir)", "a ouvert", ["ouvrait", "ouvre"]],
    ["Pendant que nous ___, les enfants jouaient dans le jardin. (manger)", "mangions", ["avons mangé", "mangeons"]],
    ["Tout à coup, un chien ___ devant la voiture. (traverser)", "a traversé", ["traversait", "traverse"]],
    ["Le ciel ___ gris et les oiseaux ne chantaient pas. (être)", "était", ["a été", "sera"]]
  ];
  const YEN = [
    ["– Tu as des frères ? – Oui, j'___ ai deux.", "en", ["y", "lui"]],
    ["– Tu vas souvent à Paris ? – Oui, j'___ vais chaque été.", "y", ["en", "lui"]],
    ["– Tu penses à ton examen ? – Oui, j'___ pense tout le temps.", "y", ["en", "lui"]],
    ["– Tu as besoin de ce livre ? – Oui, j'___ ai besoin.", "en", ["y", "lui"]],
    ["– Il parle de son voyage ? – Oui, il ___ parle souvent.", "en", ["y", "lui"]],
    ["– Elle s'intéresse à la musique ? – Oui, elle s'___ intéresse.", "y", ["en", "lui"]],
    ["– Tu reviens de la boulangerie ? – Oui, j'___ reviens.", "en", ["y", "lui"]],
    ["– Vous avez assez de pain ? – Non, nous n'___ avons pas assez.", "en", ["y", "lui"]],
    ["– Tu réponds à ce message ? – Oui, j'___ réponds ce soir.", "y", ["en", "lui"]],
    ["– Il joue à ce jeu ? – Oui, il ___ joue souvent.", "y", ["en", "lui"]]
  ];
  const REL = [
    ["Le livre ___ j'ai lu hier est passionnant.", "que", ["qui", "où"]],
    ["La fille ___ chante dans la chorale est ma cousine.", "qui", ["que", "dont"]],
    ["La ville ___ nous habitons est très calme.", "où", ["que", "dont"]],
    ["Voilà le garçon ___ le père est médecin.", "dont", ["que", "qui"]],
    ["Le jour ___ il est parti, il neigeait.", "où", ["que", "dont"]],
    ["Les amis ___ je t'ai parlé arrivent demain.", "dont", ["que", "qui"]],
    ["La chanson ___ passe à la radio est très connue.", "qui", ["que", "où"]],
    ["Le film ___ nous avons vu hier était long.", "que", ["qui", "dont"]],
    ["C'est un outil ___ on a besoin pour réparer le vélo.", "dont", ["que", "où"]],
    ["L'école ___ elle travaille est près de la gare.", "où", ["que", "qui"]]
  ];
  const REF = [
    ["Elles se sont ___ ce matin. (laver)", "lavées", ["lavé", "lavés"]],
    ["Elles se sont ___ les mains. (laver)", "lavé", ["lavées", "lavés"]],
    ["Marie s'est ___ très tôt. (réveiller)", "réveillée", ["réveillé", "réveillés"]],
    ["Les deux amis se sont ___ hier. (parler)", "parlé", ["parlés", "parlées"]],
    ["Les filles se sont ___ pendant une heure. (téléphoner)", "téléphoné", ["téléphonées", "téléphonés"]],
    ["Marc et Paul se sont ___ dans le parc. (promener)", "promenés", ["promené", "promenées"]],
    ["Elle s'est ___ le doigt. (couper)", "coupé", ["coupée", "coupés"]],
    ["Léa et Zoé se sont ___ dans le miroir. (regarder)", "regardées", ["regardé", "regardés"]],
    ["Les enfants se sont bien ___ hier soir. (amuser)", "amusés", ["amusé", "amusées"]],
    ["Elles se sont ___ en se croisant. (sourire)", "souri", ["souries", "sourit"]]
  ];
  const TYP19 = [
    [T("tenant", "(le ___)"), "locataire"], [T("rent", "(le ___)"), "loyer"], [T("lung", "(le ___)"), "poumon"], [T("brain", "(le ___)"), "cerveau"],
    [T("heatwave", "(la ___)"), "canicule"], [T("fog", "(le ___)"), "brouillard"], [T("volunteer", "(le ___)"), "bénévole"], [T("candidate", "(le ___)"), "candidat"],
    [T("scholarship", "(la ___)"), "bourse"], [T("to move house"), "déménager"], [T("neighbor", "(le ___)"), "voisin"], [T("polling booth", "(l'___)"), "isoloir"]
  ];
  const L19 = [
    les("Weather and natural events", vocab(B19.weather), tVocab(B19.weather)),
    les("Inside the body", vocab(B19.body), tVocab(B19.body)),
    les("Studies and exams", vocab(B19.studies), tVocab(B19.studies)),
    les("Elections and democracy", vocab(B19.elect), tVocab(B19.elect)),
    les("Housing and moving", vocab(B19.housing), tVocab(B19.housing)),
    les("Helping others", vocab(B19.help), tVocab(B19.help)),
    les("Describing a picture", vocab(B19.pic), tVocab(B19.pic)),
    les("Animal sayings", mean(ANI, "Do not translate word by word! Think about what people really mean when they say it.", "Think about the animal's famous trait (a wolf is hungry, a mule is stubborn…) and how it could describe a person.", "Example: 'Être malin comme un singe' means to be very clever. Now think about yours."),
      tg("Animals in sayings", "🐺", "French sayings love animals. The animal usually stands for one famous quality.", "Une faim de loup<br>Fier comme un paon", "A hungry wolf, a proud peacock.", "Ask yourself: what is this animal famous for?")),
    les("Body sayings", mean(BOD, "Do not translate word by word. Picture a situation where someone could say this.", "A body part in a saying often stands for a feeling or a skill (eyes = courage or care, tongue = talking).", "Example: 'Avoir le cœur sur la main' means to be generous. Now think about yours."),
      tg("Body parts in sayings", "🖐️", "Lots of French expressions use the body.", "Avoir le bras long<br>Rester bouche bée", "To have influence. To be speechless.", "Learn the real meaning, not the word-for-word one.")),
    les("Polite requests", mc(POL, ["Think about who you are talking to. A stranger, a teacher or an adult needs vous and polite words.", "Polite French often uses the conditional (pourriez-vous…), s'il vous plaît and excusez-moi. Orders and very casual words are not polite.", "Example: to ask a neighbor to be quiet politely, you could say 'Pourriez-vous faire moins de bruit ?'. Now pick the polite option for yours."], 2),
      tg("Being polite", "🙏", "In French, how you ask matters as much as what you ask.", "Pourriez-vous… ?<br>Auriez-vous… ?<br>Excusez-moi…", "Could you…? Would you have…? Excuse me…", "Use vous and s'il vous plaît with adults and strangers. Never just give an order.")),
    les("Reading: diary, blog, notice", mc(readQ(READ19), readH, 2), [S("Different kinds of text", "📖", "A diary tells your day. A blog shares a hobby. A notice gives information."), S("How to read", "🔎", "Ask: who writes? who is it for? what are the key facts (when, where, what)?"), S("Tip", "🧠", "Words like 'mais', 'parce que' and 'alors' tell you how ideas connect.")]),
    les("Africa and the Maghreb", mc(AFR, ["Picture a map of Africa. Is it in the north, west or center?", "Link each capital with its country. Many French-speaking countries are in North and West Africa.", "Example: the capital of Niger is Niamey, and the capital of Gabon is Libreville. Now think about yours."], 2),
      [S("French in Africa", "🌍", "More French speakers live in Africa than in France! French is official in many countries, from Senegal to the Congo."), S("The Maghreb", "🏜️", "<b>Le Maghreb</b> means \"the west\" in Arabic. It includes Morocco, Algeria and Tunisia, along the Mediterranean."), S("Tip", "🧠", "Learn capitals in pairs with their countries: Rabat-Maroc, Tunis-Tunisie, Dakar-Sénégal.")]),
    les("Québec and Canada", mc(QUE, ["Think about Canada: its capital, its winters, its French-speaking province.", "Québec French has its own words and its own foods. Many words are different from France.", "Example: in Québec, <i>un chandail</i> is a sweater and <i>la fin de semaine</i> is the weekend. Now think about yours."], 2),
      [S("French in North America", "🍁", "Québec is the biggest French-speaking region in North America. Canada has two official languages: French and English."), S("Words and food", "🥞", "Québec has its own sayings: breakfast is <b>le déjeuner</b>, lunch is <b>le dîner</b> and dinner is <b>le souper</b>. People love <b>la poutine</b> and <b>le sirop d'érable</b>."), S("Tip", "🧠", "The city of Québec is the provincial capital, but Montréal is bigger.")]),
    les("Imparfait or passé composé?", mc(PCI, ["Is it a background scene or a habit (imparfait), or a single event that happened (passé composé)?", "Words like 'soudain', 'd'abord', 'hier' point to one finished event. 'Pendant que', 'toujours', 'quand j'étais petit' point to a scene or habit.", "Example: 'Il ___ (dormir) quand je suis entré.' The sleeping was going on, so use the imparfait: il dormait. Now do yours."], 2),
      tg("Two past tenses", "⏪", "The <b>imparfait</b> describes the scene or a habit. The <b>passé composé</b> tells what happened, one event at a time.", "Il pleuvait. Soudain, j'ai entendu un bruit.", "Rain was falling (scene). I heard a noise (event).", "Imagine a film: the imparfait is the background, the passé composé is the action.")),
    les("Y or en?", mc(YEN, ["Look at the little word that goes with the verb: à (or a place you go to) or de (or a quantity)?", "Y replaces à + a thing or a place. En replaces de + a thing, or a number or amount of something. For people after à, French uses lui or leur.", "Example: '– Tu as des cousins ? – Oui, j'___ ai trois.' Des cousins is an amount, so use en. Now do yours."], 2),
      tg("Y and en", "🔄", "<b>Y</b> and <b>en</b> save you from repeating words.", "Je vais à Lyon → J'y vais.<br>Je parle de mon chat → J'en parle.", "Y = there / to it. En = of it / some.", "Think à → y, de → en.")),
    les("Qui, que, où or dont?", mc(REL, ["Look at what comes right after the blank: a verb, a subject (like je or nous), or a noun?", "Qui is the subject of the next verb. Que is its object. Où is for places and times. Dont replaces something with de.", "Example: 'La femme ___ parle est ma tante.' The woman does the talking, so she is the subject: qui. Now do yours."], 2),
      tg("Relative pronouns", "🧩", "These little words join two ideas and replace a noun.", "L'élève qui chante<br>Le livre que je lis<br>La ville où j'habite", "Subject, object, place.", "Qui + verb. Que + subject. Où = place or time. Dont = de + noun.")),
    les("Reflexive verbs in the past", mc(REF, ["Reflexive verbs use être in the past. Does the participle agree with the subject here?", "It agrees only if se stands for the direct object (se laver). If something is named after the verb (les mains, le doigt) or the verb takes à (se parler, se téléphoner, se sourire), do not agree.", "Example: 'Nous (girls) nous sommes ___ (dépêcher).' The participle agrees: dépêchées. Now do yours."], 2),
      tg("Agreement with se", "🔁", "In the passé composé, a reflexive verb uses <b>être</b>. The participle often agrees with the subject.", "Elle s'est levée.<br>Elles se sont lavées.", "Feminine and plural endings added.", "No agreement when a thing follows (Elle s'est lavé les mains) or with se parler, se téléphoner, se sourire.")),
    les("Type the word", typed(TYP19, "Think about the vocabulary of this level: housing, body, weather, elections, helping others.", "Example: 'Type in French: neighbor' would be 'voisin'. Now type yours. (Accents are optional.)"), [S("Typing practice", "⌨️", "You type the French word for what you see."), S("Remember", "🧠", "Some words are masculine (le) and some feminine (la), but you type only the word."), S("Tip", "✍️", "Accents are optional here.")])
  ];
  L19.push(MIX("Mixed practice", L19.slice(0, 18), [L19[0], L19[7], L19[13]]));
  L19.push(MIX("Level 19 Challenge", L19.slice(0, 18), [L19[3], L19[10], L19[15]]));

  // =====================================================  LEVEL 20
  const B20 = {
    time: BK("Time words for stories", [["autrefois", "in the past, formerly"], ["désormais", "from now on"], ["auparavant", "before, previously"], ["soudain", "suddenly"], ["dès que", "as soon as"], ["pendant ce temps", "meanwhile"], ["longtemps", "for a long time"], ["bientôt", "soon"], ["enfin", "finally"], ["jadis", "long ago"], ["aussitôt", "immediately"], ["d'abord", "first of all"]], { tip: "Use <b>d'abord</b>, <b>ensuite</b>, <b>enfin</b> to order a story. <b>Soudain</b> introduces a surprise." }),
    feel: BK("Verbs of feelings", [["se réjouir", "to be delighted"], ["s'inquiéter", "to worry"], ["se méfier", "to be wary, to distrust"], ["s'ennuyer", "to be bored"], ["se fâcher", "to get angry"], ["se moquer de", "to make fun of"], ["s'impatienter", "to lose patience"], ["s'étonner", "to be surprised"], ["se plaindre", "to complain"], ["se calmer", "to calm down"], ["s'émerveiller", "to marvel"], ["se décourager", "to lose heart"]], { tip: "Most feelings verbs are reflexive: <b>se</b> or <b>s'</b> comes before the verb. <b>S'ennuyer</b> is to be bored, not to miss someone!" }),
    qty: BK("Amounts and fractions", [["une douzaine", "a dozen"], ["la moitié", "half"], ["le tiers", "one third"], ["le quart", "one quarter"], ["une paire", "a pair"], ["la plupart", "most"], ["un tas", "a heap"], ["une poignée", "a handful"], ["le double", "double"], ["un millier", "about a thousand"], ["une dizaine", "about ten"], ["une vingtaine", "about twenty"]], { tip: "Add <b>-aine</b> to a number for \"about\": une dizaine (10), une vingtaine (20), une centaine (100)." }),
    math: BK("Words for math", [["additionner", "to add"], ["soustraire", "to subtract"], ["multiplier", "to multiply"], ["diviser", "to divide"], ["la somme", "sum"], ["le produit", "product"], ["le quotient", "quotient"], ["le pourcentage", "percentage"], ["l'angle", "angle"], ["le rayon", "radius"], ["la racine carrée", "square root"], ["l'équation", "equation"]], { tip: "Many math words look like English: <b>angle</b>, <b>équation</b>, <b>quotient</b>. Beware: <b>le produit</b> is also a store product." }),
    review: BK("Writing a review", [["l'intrigue", "plot"], ["le personnage", "character"], ["le dénouement", "ending, resolution"], ["le scénario", "script, screenplay"], ["l'ambiance", "atmosphere"], ["le rythme", "pace"], ["captivant", "gripping"], ["décevant", "disappointing"], ["émouvant", "moving"], ["ennuyeux", "boring"], ["recommander", "to recommend"], ["la critique", "review, criticism"]], { tip: "Start a review with <b>J'ai adoré…</b> or <b>J'ai été déçu par…</b>, then give a reason with <b>parce que</b>." })
  };
  const ADV = [
    ["lent", "lentement", ["lentment", "lentiment"]], ["heureux", "heureusement", ["heureuxment", "heureusment"]],
    ["rapide", "rapidement", ["rapidment", "rapidemant"]], ["gentil", "gentiment", ["gentilment", "gentillement"]],
    ["évident", "évidemment", ["évidentement", "évidement"]], ["constant", "constamment", ["constantement", "constament"]],
    ["vrai", "vraiment", ["vraiement", "vraiemant"]], ["poli", "poliment", ["polement", "polimant"]],
    ["seul", "seulement", ["seulment", "seulemant"]], ["fréquent", "fréquemment", ["fréquentement", "fréquement"]]
  ].map(([a, b, w]) => [`Make an adverb from the adjective <b>${a}</b>.`, b, w]);
  const FOOD = [
    ["Avoir la pêche", "To be full of energy", ["To go fishing", "To love fruit"]],
    ["Raconter des salades", "To tell tall tales", ["To make a salad", "To talk about food"]],
    ["Être dans les choux", "To be in a mess, to have failed", ["To be in the garden", "To be very healthy"]],
    ["C'est la fin des haricots !", "It's the end, all is lost!", ["The beans are ready!", "Dinner is over!"]],
    ["Mettre du beurre dans les épinards", "To improve your income", ["To cook vegetables", "To be generous with food"]],
    ["Ça ne mange pas de pain.", "It costs nothing, it does no harm.", ["It is not edible.", "It is too hard."]],
    ["Être une bonne poire", "To be gullible, too easy to fool", ["To like fruit", "To be very kind in cooking"]],
    ["Les carottes sont cuites.", "It is too late, the die is cast.", ["The vegetables are ready.", "Dinner is late."]],
    ["Se vendre comme des petits pains", "To sell very fast", ["To work in a bakery", "To sell bread cheaply"]],
    ["Pour des prunes", "For nothing, in vain", ["For a fruit salad", "For a good price"]]
  ];
  const COLO = [
    ["Voir la vie en rose", "To look at life cheerfully", ["To like the color pink", "To be shy"]],
    ["Avoir une peur bleue", "To be terrified", ["To be cold", "To be sad"]],
    ["Rire jaune", "To laugh in a forced way", ["To laugh a lot", "To laugh at a joke"]],
    ["Passer une nuit blanche", "To have a sleepless night", ["To sleep in the snow", "To paint a room"]],
    ["Broyer du noir", "To feel gloomy", ["To mix paint", "To work at night"]],
    ["Voir rouge", "To get very angry", ["To see a stop sign", "To be color-blind"]],
    ["Donner le feu vert", "To give the go-ahead", ["To light a fire", "To turn traffic lights green"]],
    ["Être un cordon bleu", "To be an excellent cook", ["To wear a ribbon", "To be a fashion expert"]],
    ["Être blanc comme un linge", "To be as pale as a sheet", ["To be very clean", "To be a good washer"]],
    ["Être rouge comme une tomate", "To blush, to turn bright red", ["To love tomatoes", "To be very sick"]]
  ];
  const READ20 = [
    { t: "Un nouveau parc a ouvert ses portes samedi dernier dans le centre de Nantes. Il compte plus de deux cents arbres et un grand bassin où les enfants peuvent faire naviguer de petits bateaux. Les habitants du quartier ont aidé à planter les fleurs. Selon le maire, le parc sera ouvert tous les jours, de sept heures à vingt et une heures.", qs: [
      ["What opened last Saturday?", "A new park", ["A new school", "A new museum"]],
      ["Where is it?", "In the center of Nantes", ["Near the sea", "Outside the city"]],
      ["Who helped plant the flowers?", "People from the neighborhood", ["The mayor", "A school class"]],
      ["When will the park be open?", "Every day, from 7 a.m. to 9 p.m.", ["Only on weekends", "Every day, from 9 a.m. to 7 p.m."]]] },
    { t: "Le matin se lève doucement, le vent berce les roseaux, un oiseau chante au bord de l'eau, et le jour sourit au monde.", qs: [
      ["What time of day does the poem describe?", "The morning", ["The evening", "The night"]],
      ["What does the wind do to the reeds?", "It rocks them gently", ["It breaks them", "It dries them"]],
      ["Where is the bird?", "At the water's edge", ["In a tree in the city", "In a cage"]],
      ["What is the mood of the poem?", "Calm and peaceful", ["Scary and dark", "Loud and angry"]]] },
    { t: "Beaucoup d'élèves pensent qu'il faut commencer l'école plus tard le matin. Ils disent que les adolescents sont fatigués et qu'ils apprennent mieux après neuf heures. Pourtant, certains parents objectent que les cours finiraient trop tard et qu'ils ne pourraient pas conduire leurs enfants avant leur travail.", qs: [
      ["What do many students think?", "School should start later", ["School should start earlier", "School days should be shorter"]],
      ["Why do they say so?", "Teenagers are tired and learn better after nine", ["They want more sleep on weekends", "They dislike the first class"]],
      ["What is the parents' objection?", "Classes would end too late and they could not drive their children", ["School would cost more", "Teachers would be tired"]],
      ["What does the word <i>pourtant</i> show?", "A contrast with the previous idea", ["An example", "A conclusion"]]] }
  ];
  const BD = [
    ["Which hero is a young reporter who travels with a little white dog named Milou?", "Tintin", ["Astérix", "Lucky Luke"]],
    ["In which country was Tintin's creator, Hergé, born?", "Belgium", ["France", "Canada"]],
    ["What gives the villagers in <i>Astérix</i> their super strength?", "A magic potion (la potion magique)", ["A secret sword", "Lots of spinach"]],
    ["Who do Astérix and Obélix fight?", "The Romans", ["The Vikings", "The English"]],
    ["What is Obélix famous for carrying?", "Menhirs (huge standing stones)", ["Barrels of fruit", "Swords"]],
    ["What are <i>les Schtroumpfs</i> in English?", "The Smurfs", ["The Minions", "The Trolls"]],
    ["Where is the comic <i>Lucky Luke</i> set?", "In the American Wild West", ["In medieval France", "In ancient Rome"]],
    ["What does <i>une bande dessinée</i> (BD) mean?", "A comic book or comic strip", ["A music band", "A drawing teacher"]],
    ["What is a speech bubble called in French?", "Une bulle", ["Une bande", "Une case"]],
    ["Which French city holds a famous international comics festival each year?", "Angoulême", ["Bordeaux", "Marseille"]]
  ];
  const BEL = [
    ["What is the capital of Belgium?", "Brussels (Bruxelles)", ["Paris", "Geneva"]],
    ["Which language is NOT an official language of Belgium?", "Spanish", ["Dutch", "German"]],
    ["How many national languages does Switzerland have?", "Four", ["Two", "Six"]],
    ["Which of these is a national language of Switzerland?", "Romansh", ["Welsh", "Basque"]],
    ["What is the capital city of Switzerland?", "Bern", ["Geneva", "Zurich"]],
    ["In Belgium and Switzerland, many people say <i>septante</i> instead of soixante-dix. What number is it?", "70", ["17", "7"]],
    ["Which Swiss city lies on Lake Léman (Lake Geneva) and is mostly French-speaking?", "Geneva (Genève)", ["Zurich", "Basel"]],
    ["Which food is a Belgian favorite?", "Frites and waffles (gaufres)", ["Poutine", "Couscous"]],
    ["Which mountains are a big part of the Swiss landscape?", "The Alps", ["The Pyrenees", "The Andes"]],
    ["In which small country is French one of three official languages, with German and Luxembourgish?", "Luxembourg", ["Monaco", "Andorra"]]
  ];
  const INV = [
    ["Louis Braille, a young Frenchman, invented a reading system for people who are...", "Blind", ["Deaf", "Left-handed"]],
    ["Heating milk to kill germs is called <i>pasteurisation</i>. Whose name is in the word?", "Louis Pasteur", ["Marie Curie", "Louis Braille"]],
    ["What did the Montgolfier brothers launch in 1783?", "A hot-air balloon", ["A steam train", "A parachute"]],
    ["The Lumière brothers gave the first paid public film show in 1895. They are linked with...", "The cinema", ["Radio", "Photography of the moon"]],
    ["Marie Curie, who worked in Paris, studied which kind of science?", "Radioactivity", ["Plants", "Volcanoes"]],
    ["Blaise Pascal built one of the first mechanical...", "Calculators", ["Clocks for ships", "Telephones"]],
    ["The metric system (meter, kilogram) was created in which country in the 1790s?", "France", ["Germany", "Italy"]],
    ["Since 1981, the TGV in France has been a famous...", "High-speed train", ["Space rocket", "Underwater boat"]],
    ["Daguerre's <i>daguerréotype</i> was an early form of...", "Photography", ["Printing", "Telephone"]],
    ["The unit of electric current, the ampere, is named after a French scientist. Who?", "André-Marie Ampère", ["Louis Pasteur", "Blaise Pascal"]]
  ];
  const IMP = [
    ["How do you say \"Give it to me!\" (tu form)", "Donne-le-moi !", ["Donne-moi-le !", "Me le donne !"]],
    ["How do you say \"Don't give it to me!\" (tu form)", "Ne me le donne pas !", ["Ne donne-le-moi pas !", "Ne le donne-moi pas !"]],
    ["How do you say \"Tell me!\" (tu form)", "Dis-moi !", ["Me dis !", "Dis-me !"]],
    ["How do you say \"Let's go there!\"", "Allons-y !", ["Y allons !", "Allons-lui !"]],
    ["How do you say \"Take some!\" (tu form, prendre)", "Prends-en !", ["Prends-y !", "En prends !"]],
    ["How do you say \"Wash your hands!\" (tu form)", "Lave-toi les mains !", ["Te lave les mains !", "Lave-te les mains !"]],
    ["How do you say \"Don't get up!\" (tu form)", "Ne te lève pas !", ["Ne lève-toi pas !", "Lève-toi pas !"]],
    ["How do you say \"Show it to them!\" (tu form, le plan)", "Montre-le-leur !", ["Montre-leur-le !", "Leur le montre !"]],
    ["How do you say \"Call her!\" (tu form)", "Appelle-la !", ["La appelle !", "Appelle-elle !"]],
    ["How do you say \"Go (there)!\" (tu form, aller + y)", "Vas-y !", ["Va-y !", "Y va !"]]
  ];
  const TNS = [
    ["Demain, nous ___ au musée. (aller)", "irons", ["allons", "irions"]],
    ["Si j'avais plus de temps, je ___ davantage. (voyager)", "voyagerais", ["voyagerai", "voyage"]],
    ["Dans dix ans, elle ___ médecin. (être)", "sera", ["serait", "est"]],
    ["En ce moment, il ___ le français. (étudier)", "étudie", ["étudiera", "étudierait"]],
    ["Si tu étudies, tu ___. (réussir)", "réussiras", ["réussirais", "réussis"]],
    ["À ta place, je lui ___. (parler)", "parlerais", ["parlerai", "parle"]],
    ["Quand il fera beau, nous ___ dehors. (jouer)", "jouerons", ["jouions", "jouerions"]],
    ["Lundi prochain, ils ___ en vacances. (partir)", "partiront", ["partiraient", "partaient"]],
    ["Si elle savait la vérité, elle ne ___ pas. (rester)", "resterait", ["restera", "reste"]],
    ["Chaque matin, je ___ le bus. (prendre)", "prends", ["prendrai", "prendrais"]]
  ];
  const ADJ = [
    ["un ___ arbre (beau)", "bel", ["beau", "belle"]],
    ["un ___ homme (vieux)", "vieil", ["vieux", "vieille"]],
    ["un ___ ami (nouveau)", "nouvel", ["nouveau", "nouvelle"]],
    ["des chaussures ___ (marron)", "marron", ["marrons", "marronnes"]],
    ["des yeux ___ (bleu clair)", "bleu clair", ["bleus clairs", "bleus clair"]],
    ["une ___ histoire (beau)", "belle", ["bel", "beau"]],
    ["des chemises ___ (orange)", "orange", ["oranges", "orangées"]],
    ["un ___ appartement (nouveau)", "nouvel", ["nouveau", "nouvelles"]],
    ["de ___ amis (vieux)", "vieux", ["vieils", "vieilles"]],
    ["une jupe ___ (vert foncé)", "vert foncé", ["verte foncée", "verts foncés"]]
  ];
  const NEG = [
    ["How do you say \"I did not eat\"?", "Je n'ai pas mangé.", ["Je n'ai mangé pas.", "Je ne pas ai mangé."]],
    ["How do you say \"He does not want to leave\"?", "Il ne veut pas partir.", ["Il ne veut partir pas.", "Il ne pas veut partir."]],
    ["How do you say \"We never went\"?", "Nous ne sommes jamais allés.", ["Nous ne sommes allés jamais.", "Nous jamais ne sommes allés."]],
    ["How do you say \"She saw nobody\"?", "Elle n'a vu personne.", ["Elle n'a personne vu.", "Elle n'a pas vu personne."]],
    ["How do you say \"I saw nothing\"?", "Je n'ai rien vu.", ["Je n'ai vu rien.", "Je ne rien ai vu."]],
    ["How do you say \"I don't want to say anything\"?", "Je ne veux rien dire.", ["Je ne veux dire rien.", "Je ne rien veux dire."]],
    ["How do you say \"He is not here anymore\"?", "Il n'est plus là.", ["Il n'est là plus.", "Il ne plus est là."]],
    ["How do you say \"I did not call anyone\"?", "Je n'ai appelé personne.", ["Je n'ai personne appelé.", "Je ne personne ai appelé."]],
    ["How do you say \"Don't do that!\"?", "Ne fais pas ça !", ["Fais ne pas ça !", "Ne pas fais ça !"]]
  ];
  const E2F = [
    ["How do you say \"I have lived here for three years\"?", "J'habite ici depuis trois ans.", ["J'ai habité ici depuis trois ans.", "J'habite ici pour trois ans."]],
    ["How do you say \"I just ate\"?", "Je viens de manger.", ["Je viens manger.", "Je suis juste mangé."]],
    ["How do you say \"I miss you\"?", "Tu me manques.", ["Je te manque.", "Je manque toi."]],
    ["How do you say \"I am cold\"?", "J'ai froid.", ["Je suis froid.", "Je fais froid."]],
    ["How do you say \"She is fifteen years old\"?", "Elle a quinze ans.", ["Elle est quinze ans.", "Elle a quinze années."]],
    ["How do you say \"It is eight o'clock\"?", "Il est huit heures.", ["C'est huit heures.", "Il a huit heures."]],
    ["How do you say \"I am in a hurry\"?", "Je suis pressé.", ["J'ai pressé.", "Je fais pressé."]],
    ["How do you say \"He is taller than me\"?", "Il est plus grand que moi.", ["Il est plus grand de moi.", "Il est plus grand comme moi."]],
    ["How do you say \"I went to the doctor's\"?", "Je suis allé chez le médecin.", ["Je suis allé à le médecin.", "Je suis allé au médecin."]],
    ["How do you say \"I am learning to swim\"?", "J'apprends à nager.", ["J'apprends nager.", "J'apprends de nager."]],
    ["How do you say \"The weather is nice\"?", "Il fait beau.", ["Il est beau.", "Il a beau."]]
  ];
  const TYP20 = [
    [T("suddenly"), "soudain"], [T("in the past, formerly"), "autrefois"], [T("from now on"), "désormais"], [T("plot of a story", "(l'___)"), "intrigue"],
    [T("ending of a story", "(le ___)"), "dénouement"], [T("before, previously"), "auparavant"], [T("speech bubble", "(la ___)"), "bulle"], [T("pace, rhythm", "(le ___)"), "rythme"],
    [T("atmosphere", "(l'___)"), "ambiance"], [T("quickly"), "rapidement"], [T("slowly"), "lentement"], [T("half", "(la ___)"), "moitié"]
  ];
  const L20 = [
    les("Time words for stories", vocab(B20.time), tVocab(B20.time)),
    les("Verbs of feelings", vocab(B20.feel), tVocab(B20.feel)),
    les("Amounts and fractions", vocab(B20.qty), tVocab(B20.qty)),
    les("Words for math", vocab(B20.math), tVocab(B20.math)),
    les("Writing a review", vocab(B20.review), tVocab(B20.review)),
    les("Adverbs in -ment", mc(ADV, ["Look at the end of the adjective: does it end in a vowel, in -ent / -ant, or in a consonant?", "After a vowel, add -ment. After a consonant, use the feminine form plus -ment. For -ent and -ant, the ending becomes -emment and -amment. Some adjectives are irregular.", "Example: 'doux' → feminine 'douce' → 'doucement'. And 'prudent' → 'prudemment'. Now do yours."], 2),
      tg("Adverbs with -ment", "⚡", "Many adverbs come from adjectives and end in <b>-ment</b> (like -ly in English).", "lent → lentement<br>vrai → vraiment<br>patient → patiemment", "Feminine + -ment, or a vowel + -ment.", "-ent becomes -emment and -ant becomes -amment, but both sound the same.")),
    les("Food sayings", mean(FOOD, "Do not translate word by word! Think about what people really mean when they say it.", "Food in sayings stands for energy, money or a situation. Think about what each food is like.", "Example: 'Avoir un cœur d'or' is not about food, but 'Être soupe au lait' means to get angry easily. Now think about yours."),
      tg("Food in sayings", "🥕", "French loves to put food in its sayings.", "Avoir la pêche<br>Raconter des salades", "To have energy. To tell tall tales.", "Say it in a scene to remember it.")),
    les("Color sayings", mean(COLO, "Do not translate word by word. Think about what each color suggests (fear, anger, calm).", "Colors stand for feelings or actions: red often means anger or shame, blue can mean fear, white is pale or empty.", "Example: 'Être vert de jalousie' means to be very jealous. Now think about yours."),
      tg("Colors in sayings", "🎨", "Colors show up in many French expressions.", "Voir la vie en rose<br>Passer une nuit blanche", "Cheerful view. A sleepless night.", "Think: what feeling does the color suggest?")),
    les("Reading: news, poem, debate", mc(readQ(READ20), readH, 2), [S("Three kinds of text", "📰", "A news report gives facts. A poem paints feelings. A debate gives opinions."), S("How to read", "🔎", "News: who, what, where, when. Poem: images and mood. Debate: reasons for and against."), S("Tip", "🧠", "Words like 'pourtant' and 'cependant' signal a contrast.")]),
    les("Comics and BD", mc(BD, ["Think about the famous comic heroes from Belgium and France.", "Each comic has a trademark: a dog, a magic potion, a cowboy. Match hero and detail.", "Example: the Smurfs are small, blue and live in mushroom houses. Now think about yours."], 2),
      [S("La bande dessinée", "💭", "Franco-Belgian comics are a big part of the culture. People call them <b>la BD</b> and read them at any age."), S("Famous series", "📚", "<b>Tintin</b> (Belgian reporter), <b>Astérix</b> (Gauls vs Romans), <b>Lucky Luke</b> (cowboy), <b>Les Schtroumpfs</b> (the Smurfs)."), S("Tip", "🧠", "A speech bubble is <b>une bulle</b>.")]),
    les("Belgium and Switzerland", mc(BEL, ["Think about the map of Europe: which small countries lie next to France?", "Both countries have several languages. Link each fact with one country.", "Example: Monaco is a tiny country on the French coast. Now think about yours."], 2),
      [S("Belgium", "🇧🇪", "Belgium has three official languages: Dutch, French and German. Its capital Brussels is also the center of the European Union."), S("Switzerland", "🇨🇭", "Switzerland has four national languages: German, French, Italian and Romansh. Its capital is Bern."), S("Fun fact", "🧠", "In Belgium and Switzerland, people say <b>septante</b> (70) and <b>nonante</b> (90). It is simpler than soixante-dix!")]),
    les("Inventions and discoveries", mc(INV, ["Think about the person's name and the topic: medicine, flight, film, math?", "Many inventions have a name inside them, like pasteurisation or ampère.", "Example: a unit called the 'volt' honors an Italian scientist named Volta. Now think about yours."], 2),
      [S("French inventors", "💡", "France gave the world many inventions: the hot-air balloon, cinema, Braille and the metric system."), S("Science stars", "🔬", "Louis Pasteur and Marie Curie were pioneers of medicine and science."), S("Tip", "🧠", "Link each invention with one name.")]),
    les("Commands with pronouns", mc(IMP, ["Is it a command that says yes or no? That changes where the little words go.", "Yes-command: verb, then pronouns joined by hyphens. No-command: ne, then the pronouns, then the verb, then pas.", "Example: 'Send it to him' → Envoie-le-lui. 'Don't send it to him' → Ne le lui envoie pas. Now do yours."], 2),
      tg("Commands and pronouns", "📣", "In a positive command, pronouns come <b>after</b> the verb with hyphens. In a negative command, they go <b>before</b> the verb.", "Prends-le !<br>Ne le prends pas !", "Take it! Don't take it!", "me becomes moi at the end: Donne-moi. Tu form of -er verbs keeps the s before y and en: Vas-y, Penses-y.")),
    les("Which tense? Clues", mc(TNS, ["Look for clue words: demain, dans dix ans, si + the past, en ce moment.", "Si + present → future. Si + imparfait → conditional. 'Demain' and 'quand' + future → future. Habits and 'now' → present.", "Example: 'Si j'avais un vélo, je ___ (venir).' Si + imparfait calls for the conditional: viendrais. Now do yours."], 2),
      tg("Choosing the tense", "🕰️", "Clue words tell you which tense to use.", "Demain, je partirai.<br>Si j'avais le temps, je partirais.", "Future. Imaginary, so conditional.", "Look at the little word 'si' first.")),
    les("Special adjective forms", mc(ADJ, ["Look at the noun after the blank: does it start with a vowel sound or a consonant sound? Is the adjective a color?", "A few adjectives have a special masculine form before a vowel sound. Colors named after things, and colors with a second word (like clair, foncé), do not agree.", "Example: 'un ___ ordinateur' with nouveau needs a special form before the vowel sound: nouvel. Now do yours."], 2),
      tg("beau, nouveau, vieux and colors", "👓", "Before a masculine noun that starts with a vowel sound, three adjectives change.", "un beau garçon / un bel enfant<br>un vieux pull / un vieil ami", "Same word, different sound before a vowel.", "Colors like marron and orange never change, and neither do bleu clair, vert foncé.")),
    les("Where does ne… pas go?", mc(NEG, ["Find the verb that is conjugated. Where do ne and the second word go around it?", "With two-part verbs, ne goes before the helper verb and pas, jamais, rien or plus go right after it. Personne goes after the participle.", "Example: 'We never ate there' → Nous n'avons jamais mangé là. Now do yours."], 2),
      tg("Negative sentences", "🚫", "Ne goes before the conjugated verb. The second part comes right after it.", "Je ne mange pas.<br>Je n'ai pas mangé.<br>Je n'ai vu personne.", "Simple tense. Passé composé. Personne goes last.", "Rien, jamais, plus stay next to the helper verb; personne goes after the participle.")),
    les("English-to-French traps", mc(E2F, ["Do not translate word by word. Think how a French speaker really says it.", "Many ages and feelings use a different verb than English 'to be'. Time that started in the past and continues uses depuis with the present. Some verbs flip subject and object.", "Example: 'I am hungry' is 'J'ai faim', not 'Je suis faim'. Now do yours."], 2),
      tg("Traps to avoid", "🪤", "Some English sentences cannot be translated word by word.", "J'ai faim.<br>Il fait chaud.<br>Je viens d'arriver.", "I am hungry. It is hot. I just arrived.", "Learn these as ready-made phrases.")),
    les("Type the word", typed(TYP20, "Think about the words from this level: time words, story words, math and review words.", "Example: 'Type in French: finally' would be 'enfin'. Now type yours. (Accents are optional.)"), [S("Typing practice", "⌨️", "You type the French word."), S("Remember", "🧠", "Think about the lesson where you met it."), S("Tip", "✍️", "Accents are optional here.")])
  ];
  L20.push(MIX("Mixed practice", L20.slice(0, 18), [L20[0], L20[7], L20[12]]));
  L20.push(MIX("Level 20 Challenge", L20.slice(0, 18), [L20[5], L20[9], L20[14]]));

  // =====================================================  LEVEL 21
  const B21 = {
    mind: BK("The mind and habits", [["la mémoire", "memory"], ["le comportement", "behavior"], ["la confiance en soi", "self-confidence"], ["le stress", "stress"], ["la motivation", "motivation"], ["la personnalité", "personality"], ["l'habitude", "habit"], ["se concentrer", "to concentrate"], ["l'attention", "attention"], ["l'inquiétude", "worry"], ["la pensée", "thought"], ["le caractère", "character, temper"]], { tip: "<b>Une habitude</b> is something you do often. <b>Le caractère</b> can mean your personality or your temper." }),
    law: BK("Law and rules", [["la loi", "law"], ["le tribunal", "court"], ["le juge", "judge"], ["le témoin", "witness"], ["le jury", "jury"], ["le droit", "right, law (as a subject)"], ["innocent", "innocent"], ["coupable", "guilty"], ["l'amende", "fine"], ["le procès", "trial"], ["la règle", "rule"], ["la preuve", "proof, evidence"]], { tip: "<b>Un droit</b> is a right (le droit de vote). <b>Une preuve</b> is evidence; <b>éprouver</b> is something else, so be careful." }),
    heritage: BK("Buildings and heritage", [["la cathédrale", "cathedral"], ["le château", "castle"], ["la façade", "front of a building"], ["le vitrail", "stained-glass window"], ["la voûte", "vault, arched ceiling"], ["le clocher", "bell tower"], ["le patrimoine", "heritage"], ["le monument", "monument"], ["restaurer", "to restore"], ["la place", "town square"], ["l'escalier", "staircase"], ["la colonne", "column"]], { tip: "<b>Le patrimoine</b> is everything a country wants to protect: old buildings, art, traditions." }),
    theatre: BK("The theater", [["la pièce", "play"], ["la scène", "stage"], ["le rideau", "curtain"], ["l'entracte", "intermission"], ["le comédien", "actor"], ["la mise en scène", "staging, directing"], ["la répétition", "rehearsal"], ["le décor", "set, scenery"], ["le costume", "costume"], ["le public", "audience"], ["applaudir", "to clap"], ["les coulisses", "backstage"]], { tip: "<b>Une pièce</b> is a play, but also a coin or a room! <b>Une répétition</b> is a rehearsal (not just \"repeat\")." }),
    job: BK("Applying for a job", [["le CV", "résumé"], ["la lettre de motivation", "cover letter"], ["l'entretien", "interview"], ["le stage", "internship"], ["l'embauche", "hiring"], ["le salaire", "salary"], ["la compétence", "skill"], ["l'expérience", "experience"], ["le poste", "job position"], ["l'employeur", "employer"], ["le contrat", "contract"], ["postuler", "to apply"]], { tip: "<b>Un entretien</b> is a job interview. <b>Postuler à un poste</b> is to apply for a job." }),
    speech: BK("Verbs for dialogue", [["murmurer", "to whisper"], ["s'exclamer", "to exclaim"], ["répliquer", "to reply sharply"], ["s'écrier", "to cry out"], ["soupirer", "to sigh"], ["ajouter", "to add"], ["déclarer", "to declare"], ["hurler", "to yell"], ["bégayer", "to stammer"], ["avouer", "to admit"], ["prétendre", "to claim"], ["objecter", "to object"]], { tip: "Instead of always writing <b>dit</b>, use stronger verbs: « Non ! », s'écria-t-il." })
  };
  const PRE = [
    ["Prendre son temps", "To take one's time", ["To check the clock", "To lose time"]],
    ["Prendre la parole", "To start speaking (to take the floor)", ["To catch a word", "To stay silent"]],
    ["Prendre froid", "To catch a cold", ["To feel cold", "To refuse a cold drink"]],
    ["Prendre en compte", "To take into account", ["To count money", "To open a bank account"]],
    ["Prendre au sérieux", "To take seriously", ["To get serious", "To take a serious book"]],
    ["Mettre en valeur", "To highlight, to show off", ["To save money", "To value a gift"]],
    ["Mettre au point", "To perfect, to fine-tune", ["To put a dot", "To stop working"]],
    ["Se mettre d'accord", "To agree on something", ["To get in a car", "To argue"]],
    ["Mettre de côté", "To put aside, to save", ["To turn left", "To ignore"]],
    ["Mettre fin à", "To put an end to", ["To finish a book", "To be at the end"]],
    ["Mettre en garde", "To warn", ["To protect a guard", "To invite someone"]],
    ["Prendre part à", "To take part in", ["To take a piece away", "To split a dessert"]]
  ];
  const READ21 = [
    { t: "Selon moi, les téléphones devraient rester dans le sac pendant les cours. D'abord, ils distraient les élèves. De plus, certains s'en servent pour copier. Cependant, je reconnais qu'un téléphone peut être utile en cas d'urgence. C'est pourquoi je propose de les laisser éteints dans le sac.", qs: [
      ["What is the writer's main opinion?", "Phones should stay away during lessons", ["Phones should be used in class", "Phones should be banned from school"]],
      ["What is the first reason given?", "Phones distract students", ["Phones are expensive", "Phones break easily"]],
      ["Which word introduces an opposite idea?", "Cependant", ["D'abord", "De plus"]],
      ["What compromise does the writer suggest?", "Keep phones switched off in the bag", ["Give phones to the teacher", "Use phones only at lunch"]]] },
    { t: "Il était une fois un vieux jardinier qui rêvait de voir son jardin fleurir en hiver. Chaque matin, il arrosait la terre gelée et chantait doucement aux graines. Les voisins se moquaient de lui. Mais un jour de février, un petit crocus violet perça la neige. Le jardinier sourit : la patience avait gagné.", qs: [
      ["What did the gardener dream of?", "A garden in bloom in winter", ["A bigger house", "A trip to the sea"]],
      ["What did he do each morning?", "He watered the soil and sang to the seeds", ["He cut the grass", "He built a fence"]],
      ["What appeared in February?", "A small purple crocus", ["A red rose", "A green tree"]],
      ["What is the lesson of the story?", "Patience wins in the end", ["Winter is too cold", "Neighbors are always right"]]] },
    { t: "Les abeilles jouent un rôle essentiel dans la nature. En allant de fleur en fleur, elles transportent le pollen, ce qui permet aux plantes de produire des fruits. Si les abeilles disparaissaient, beaucoup de nos aliments deviendraient rares. C'est pourquoi on recommande de planter des fleurs sur les balcons et dans les jardins.", qs: [
      ["What do bees carry from flower to flower?", "Pollen", ["Water", "Seeds of grass"]],
      ["Why is this important?", "It helps plants make fruit", ["It cleans the flowers", "It makes the grass grow"]],
      ["What would happen if bees disappeared?", "Many foods would become rare", ["Flowers would grow bigger", "Fruit would be sweeter"]],
      ["What does the text recommend?", "Planting flowers on balconies and in gardens", ["Building more beehives in town", "Cutting down trees"]]] }
  ];
  const FAB = [
    ["Who wrote the famous French <i>Fables</i> in the 1600s?", "Jean de La Fontaine", ["Victor Hugo", "Molière"]],
    ["What is a fable?", "A short story, often with animals, that teaches a lesson", ["A long adventure novel", "A newspaper report"]],
    ["What does <i>la morale</i> mean in a fable?", "The lesson", ["The mood of the animals", "The title"]],
    ["In <i>La Cigale et la Fourmi</i>, who works hard all summer?", "The ant (la fourmi)", ["The cicada (la cigale)", "The fox"]],
    ["In <i>La Cigale et la Fourmi</i>, what does the cicada do all summer?", "She sings", ["She builds a house", "She sleeps in the sun"]],
    ["In <i>Le Corbeau et le Renard</i>, what does the fox want?", "The raven's cheese", ["The raven's nest", "A drink of water"]],
    ["What is the lesson of <i>Le Corbeau et le Renard</i>?", "Beware of people who flatter you", ["Always share your food", "Birds can sing well"]],
    ["In <i>Le Lièvre et la Tortue</i>, who wins the race?", "The tortoise (la tortue)", ["The hare (le lièvre)", "Nobody"]],
    ["What does <i>Rien ne sert de courir ; il faut partir à point</i> say?", "Running is not enough; start at the right time", ["Always run as fast as possible", "Never go to a race"]],
    ["In <i>Le Rat de ville et le Rat des champs</i>, which rat prefers a quiet life?", "The country rat", ["The city rat", "Both of them"]]
  ];
  const HIS = [
    ["Who was Vercingétorix?", "A Gaulish chief who fought against the Romans", ["A king of the Middle Ages", "A famous painter"]],
    ["Charlemagne was crowned emperor in the year...", "800", ["1000", "1500"]],
    ["Joan of Arc (Jeanne d'Arc) lived in which century?", "The 15th century (1400s)", ["The 12th century", "The 18th century"]],
    ["Which king was called <i>le Roi-Soleil</i> (the Sun King)?", "Louis XIV", ["Louis XVI", "Charlemagne"]],
    ["Which famous room of the Palace of Versailles is full of mirrors?", "La Galerie des Glaces (Hall of Mirrors)", ["La Salle de Bains", "Le Grand Escalier"]],
    ["Napoleon Bonaparte became emperor of the French in...", "1804", ["1789", "1889"]],
    ["For which event was the Eiffel Tower built?", "The 1889 World's Fair", ["The 1789 Revolution", "The 1900 Olympics"]],
    ["What does <i>le Moyen Âge</i> mean?", "The Middle Ages", ["The modern age", "The Stone Age"]],
    ["The Statue of Liberty was a gift from France to which country?", "The United States", ["Canada", "Britain"]],
    ["In which French cave were prehistoric paintings of animals found?", "Lascaux", ["Versailles", "Chambord"]]
  ];
  const OUT = [
    ["Martinique and Guadeloupe are islands in which region?", "The Caribbean (les Antilles)", ["The Pacific", "The Mediterranean"]],
    ["In which ocean is the French island of La Réunion?", "The Indian Ocean", ["The Atlantic Ocean", "The Pacific Ocean"]],
    ["Tahiti is part of French Polynesia, in which ocean?", "The Pacific Ocean", ["The Indian Ocean", "The Arctic Ocean"]],
    ["On which continent is French Guiana (la Guyane)?", "South America", ["Africa", "Asia"]],
    ["What is Kourou in French Guiana known for?", "A space center that launches rockets", ["A famous volcano", "A big fashion market"]],
    ["Which French islands lie near the coast of Canada?", "Saint-Pierre-et-Miquelon", ["Martinique", "Tahiti"]],
    ["What does <i>l'outre-mer</i> mean?", "Overseas", ["Over the mountain", "Under the sea"]],
    ["Which island has an active volcano called Piton de la Fournaise?", "La Réunion", ["Corsica", "Saint-Pierre"]],
    ["Which language, mixed from French and others, is spoken in Martinique, Guadeloupe and La Réunion?", "Créole", ["Latin", "Basque"]],
    ["Nouvelle-Calédonie (New Caledonia) is in which ocean?", "The Pacific Ocean", ["The Atlantic Ocean", "The Indian Ocean"]]
  ];
  const PUN = [
    ["Which of these is normally written with a capital letter in French?", "Marie", ["mardi", "mars"]],
    ["Which of these is normally written with a small letter in French?", "lundi", ["Marie", "Paris"]],
    ["How is the language of France written inside a sentence?", "français (small f)", ["Français (capital F)", "FRANÇAIS (all capitals)"]],
    ["Where does a French writer put a space?", "Before ? ! : and ;", ["Never before punctuation", "Before every comma"]],
    ["What does French use as a decimal mark in 3,5?", "A comma", ["A period", "A dash"]],
    ["Which is a common French way to write half past two in the afternoon?", "14 h 30", ["2:30 pm", "230 hours"]],
    ["What do French quotation marks look like?", "« guillemets »", ["“ double commas ”", "' single quotes '"]],
    ["What is the abbreviation of <i>Madame</i>?", "Mme", ["Md", "Mad"]],
    ["How do you write May 1st in French?", "le 1er mai", ["le 1ème mai", "le un Mai"]],
    ["Which date is in the French order?", "le 14 juillet 1789", ["juillet le 14, 1789", "1789 juillet 14"]],
    ["A person from France is <i>un Français</i>. How is the adjective written in <i>un film ___</i>?", "français (small f)", ["Français (capital F)", "FRANÇAIS (all capitals)"]]
  ];
  const HOM = [
    ["Which spelling means \"rather\" (as in: I prefer tea ___ than coffee)?", "plutôt (one word)", ["plus tôt (two words)", "plus tard (two words)"]],
    ["Which spelling means \"earlier\" (as in: wake up ___ tomorrow)?", "plus tôt (two words)", ["plutôt (one word)", "plus tard (two words)"]],
    ["Elle a ___ amis à Lyon.", "quelques", ["quelle", "quand"]],
    ["Il est parti ___ rien dire.", "sans", ["sens", "cent"]],
    ["Cette phrase n'a aucun ___.", "sens", ["sans", "cent"]],
    ["Il y a ___ élèves dans la cour.", "cent", ["sans", "sens"]],
    ["Il ___ va à pied.", "s'en", ["sans", "c'en"]],
    ["___ à moi, je reste ici.", "Quant", ["Quand", "Qu'en"]],
    ["___ viendras-tu ?", "Quand", ["Quant", "Qu'en"]],
    ["___ penses-tu ?", "Qu'en", ["Quand", "Quant"]]
  ];
  const BEF = [
    ["___ manger, lave-toi les mains.", "Avant de", ["Avant que", "Avant"]],
    ["Il a quitté la salle ___ dire un mot.", "sans", ["pour", "avant que"]],
    ["Elle étudie ___ réussir son examen.", "pour", ["sans", "avant de"]],
    ["___ rester au lit, lève-toi !", "Au lieu de", ["Avant de", "Sans que"]],
    ["Je t'appelle ___ partir.", "avant de", ["avant que", "sans que"]],
    ["Il est entré ___ frapper.", "sans", ["pour", "avant que"]],
    ["Nous économisons ___ acheter un vélo.", "pour", ["sans", "avant que"]],
    ["Je l'ai fait ___ on me le demande.", "sans qu'", ["sans", "pour"]],
    ["Pars ___ il pleuve.", "avant qu'", ["avant de", "sans"]],
    ["Réfléchis bien ___ répondre.", "avant de", ["avant que", "sans que"]]
  ];
  const CAU = [
    ["How do you say \"I am having my car repaired\"?", "Je fais réparer ma voiture.", ["Je répare faire ma voiture.", "Je fais ma voiture réparer."]],
    ["How do you say \"She makes us laugh\"?", "Elle nous fait rire.", ["Elle fait nous rire.", "Elle nous rit."]],
    ["How do you say \"He had his hair cut\"?", "Il s'est fait couper les cheveux.", ["Il a coupé les cheveux.", "Il s'est coupé fait les cheveux."]],
    ["How do you say \"The teacher makes them read\"?", "Le professeur les fait lire.", ["Le professeur fait lire les.", "Le professeur les lit."]],
    ["How do you say \"We had a house built\"?", "Nous avons fait construire une maison.", ["Nous avons construit faire une maison.", "Nous faisons une maison construit."]],
    ["How do you say \"Don't make me cry\"?", "Ne me fais pas pleurer.", ["Ne fais pas me pleurer.", "Ne me pleure pas."]],
    ["How do you say \"She had a dress made\"?", "Elle a fait faire une robe.", ["Elle a fait une robe faire.", "Elle a fabriqué faire une robe."]],
    ["How do you say \"That makes me think\"?", "Cela me fait penser.", ["Cela fait penser moi.", "Cela me pense."]]
  ];
  const APR = [
    ["___ fini ses devoirs, il a joué.", "Après avoir", ["Après être", "Après avait"]],
    ["___ arrivés, nous avons posé nos valises.", "Après être", ["Après avoir", "Après étions"]],
    ["___ lu le livre, elle a vu le film.", "Après avoir", ["Après être", "Après s'être"]],
    ["___ levée, Marie a pris son café.", "Après s'être", ["Après être", "Après avoir"]],
    ["___ parti, il a téléphoné.", "Après être", ["Après avoir", "Après s'être"]],
    ["___ mangé, nous avons fait la vaisselle.", "Après avoir", ["Après être", "Après s'être"]],
    ["___ lavés, les enfants ont dîné.", "Après s'être", ["Après avoir", "Après être"]],
    ["___ compris la leçon, il a répondu.", "Après avoir", ["Après être", "Après s'être"]],
    ["___ tombé, il s'est relevé.", "Après être", ["Après avoir", "Après s'être"]]
  ];
  const WSH = [
    ["Si seulement j'___ plus de temps !", "avais", ["aurais", "ai"]],
    ["J'___ dû étudier davantage.", "aurais", ["avais", "ai"]],
    ["J'aimerais que tu ___ à ma fête.", "viennes", ["viens", "viendras"]],
    ["Si seulement il ___ moins froid !", "faisait", ["fait", "ferait"]],
    ["Nous ___ aimé voyager en Italie, mais c'était trop cher.", "aurions", ["aurons", "irions"]],
    ["Je souhaite que vous ___ heureux.", "soyez", ["êtes", "serez"]],
    ["Si seulement tu m'___ écouté !", "avais", ["aurais", "as"]],
    ["Il ___ mieux valu partir plus tôt.", "aurait", ["aura", "aurais"]],
    ["Ah, si j'étais riche, je ___ un château !", "achèterais", ["achète", "achetais"]]
  ];
  const TYP21 = [
    [T("memory", "(la ___)"), "mémoire"], [T("court", "(le ___)"), "tribunal"], [T("witness", "(le ___)"), "témoin"], [T("stage curtain", "(le ___)"), "rideau"],
    [T("rehearsal", "(la ___)"), "répétition"], [T("salary", "(le ___)"), "salaire"], [T("skill", "(la ___)"), "compétence"], [T("to whisper"), "murmurer"],
    [T("to apply for a job"), "postuler"], [T("bell tower", "(le ___)"), "clocher"], [T("stained-glass window", "(le ___)"), "vitrail"], [T("heritage", "(le ___)"), "patrimoine"]
  ];
  const L21 = [
    les("The mind and habits", vocab(B21.mind), tVocab(B21.mind)),
    les("Law and rules", vocab(B21.law), tVocab(B21.law)),
    les("The theater", vocab(B21.theatre), tVocab(B21.theatre)),
    les("Buildings and heritage", vocab(B21.heritage), tVocab(B21.heritage)),
    les("Applying for a job", vocab(B21.job), tVocab(B21.job)),
    les("Verbs for dialogue", vocab(B21.speech), tVocab(B21.speech)),
    les("Expressions with prendre and mettre", mean(PRE, "Do not translate word by word. Think about what people really mean when they say it.", "Prendre and mettre have many meanings. Picture a situation where you would say this.", "Example: 'Prendre rendez-vous' means to make an appointment. Now think about yours."),
      tg("Prendre and mettre", "🧰", "Two very busy verbs: <b>prendre</b> (to take) and <b>mettre</b> (to put) appear in lots of fixed expressions.", "Prendre son temps<br>Mettre de côté", "To take one's time. To put aside.", "Learn each expression as one block.")),
    les("Reading: opinion, tale, science", mc(readQ(READ21), readH, 2), [S("Three kinds of text", "📖", "An opinion text gives reasons, a tale tells a story with a lesson, a science text explains facts."), S("How to read", "🔎", "Find the main idea first. In an opinion, find the reasons and the contrast word."), S("Tip", "🧠", "'Cependant' and 'mais' bring a contrast. 'C'est pourquoi' brings a result.")]),
    les("La Fontaine's fables", mc(FAB, ["Think about the animals in the story. What do they stand for?", "Each fable has a lesson (la morale). Match the animal with its quality: the ant works, the fox is sly, the tortoise is steady.", "Example: in 'Le Loup et l'Agneau', a stronger animal bullies a weaker one. Now think about yours."], 2),
      [S("Fables", "🦊", "Jean de La Fontaine wrote famous fables in the 1600s. French children still learn them at school."), S("Famous fables", "🐜", "<b>La Cigale et la Fourmi</b>, <b>Le Corbeau et le Renard</b>, <b>Le Lièvre et la Tortue</b>."), S("Tip", "🧠", "In every fable, animals act like people, and the ending has a lesson.")]),
    les("France through time", mc(HIS, ["Put the events on a timeline: ancient, Middle Ages, kings, Revolution, modern.", "Link each event with one name, a place or a date.", "Example: the Bastille was stormed on July 14, 1789. Now think about yours."], 2),
      [S("A long story", "⏳", "France's story goes from the Gauls and the Romans to kings and emperors."), S("Key names", "👑", "Charlemagne (800), Jeanne d'Arc (1400s), Louis XIV (1600s), Napoléon (1804)."), S("Tip", "🧠", "Use a timeline and add one fact to each point.")]),
    les("Overseas France", mc(OUT, ["Picture a world map: France has islands and regions far from Europe.", "Match each place with its ocean: the Caribbean, the Indian Ocean, the Pacific.", "Example: Mayotte is a French island in the Indian Ocean. Now think about yours."], 2),
      [S("France around the world", "🌴", "France has regions and territories far from Europe, called <b>l'outre-mer</b> (overseas)."), S("Where?", "🗺️", "The Caribbean: Martinique, Guadeloupe. The Indian Ocean: La Réunion. The Pacific: Tahiti, Nouvelle-Calédonie. South America: la Guyane."), S("Tip", "🧠", "Learn them by ocean: one group for each.")]),
    les("Writing rules in French", mc(PUN, ["French has its own habits for capital letters, spaces and numbers.", "Days, months and languages have no capital letter. A space goes before ? ! : ;. The decimal mark is a comma.", "Example: 'Il parle anglais' (not 'Anglais'), and 'Pourquoi ?' with a space. Now choose yours."], 2),
      tg("French typography", "✍️", "French writing has its own rules, different from English.", "mardi 3 mars<br>le français<br>Quelle heure ?", "No capitals for days, months, languages. Space before ?", "A person is capitalized (un Français) but the language is not (le français).")),
    les("Sound-alike words, round two", mc(HOM, ["These words sound the same, so listening will not help. Use the meaning.", "Try replacing the blank with a short English meaning: 'rather', 'earlier', 'some', 'without', 'as for', 'when'…", "Example: 'Léa et ___ amis' needs ses (her own friends), not ces (these). Now think about yours."], 2),
      tg("Look-alikes and sound-alikes", "👂", "Some French words sound identical but are written differently.", "plutôt (rather) / plus tôt (earlier)<br>quant à (as for) / quand (when)", "Same sounds, different jobs.", "Say what each word means in English to choose correctly.")),
    les("Avant de, pour, sans + infinitive", mc(BEF, ["Look at the verb after the blank. Is it an infinitive or is there a new subject with a conjugated verb?", "With the same subject, use a preposition + infinitive. With a new subject, use a conjunction + subjunctive (avant que, sans que).", "Example: 'Je mange ___ je sorte' has a new subject, so you need a conjunction with the subjunctive. Now do yours."], 2),
      tg("Before, instead, without", "🔀", "Prepositions like <b>avant de</b>, <b>pour</b>, <b>sans</b>, <b>au lieu de</b> are followed by an infinitive.", "Avant de partir…<br>Sans parler…", "Before leaving. Without speaking.", "If the subject changes, use avant que / sans que + subjunctive.")),
    les("Faire + infinitive", mc(CAU, ["Faire + infinitive means 'to make someone do something' or 'to have something done'. Which verb is conjugated?", "Only faire is conjugated. The second verb stays in the infinitive right after faire, and object pronouns go before faire.", "Example: 'I make him sing' → Je le fais chanter. Now do yours."], 2),
      tg("Making things happen", "🛠️", "Use <b>faire + infinitive</b> to say that someone makes or has something done.", "Je fais réparer mon vélo.<br>Elle me fait rire.", "I have my bike repaired. She makes me laugh.", "Never put a noun between faire and the infinitive when it is a pronoun: Elle me fait rire.")),
    les("After doing: après avoir", mc(APR, ["Look at the verb after the blank, which is a past participle. Which helper verb does it need in the passé composé?", "Après + the helper verb in the infinitive + participle. Movement verbs take être, reflexive verbs take s'être, most others take avoir.", "Example: 'Après avoir chanté' (sing uses avoir). 'Après être sorti' (sortir uses être). Now do yours."], 2),
      tg("The past infinitive", "⏮️", "To say \"after doing something\", use <b>après</b> + <b>avoir / être</b> + past participle.", "Après avoir mangé, je sors.<br>Après être arrivé, il a dormi.", "After eating. After arriving.", "The subject of both verbs must be the same person.")),
    les("Wishes and regrets", mc(WSH, ["Is it a wish about now, a regret about the past, or a wish for another person?", "Si seulement + imparfait wishes for a change now. A regret about the past needs a past form. After j'aimerais que or je souhaite que, use the subjunctive.", "Example: 'Si seulement il ___ (pleuvoir).' A wish about now: pleuvait. Now do yours."], 2),
      tg("Wishes and regrets", "💭", "Wishes and regrets use special patterns.", "Si seulement j'avais un chien !<br>J'aurais dû t'écouter.<br>J'aimerais que tu viennes.", "A wish now. A regret. A wish for someone else.", "Imparfait for wishes, past conditional for regrets, subjunctive after 'que'.")),
    les("Type the word", typed(TYP21, "Think about the vocabulary of this level: the mind, law, theater, buildings, jobs.", "Example: 'Type in French: staircase' would be 'escalier'. Now type yours. (Accents are optional.)"), [S("Typing practice", "⌨️", "You type the French word."), S("Remember", "🧠", "Think about the lesson where you met the word."), S("Tip", "✍️", "Accents are optional here.")])
  ];
  L21.push(MIX("Mixed practice", L21.slice(0, 18), [L21[2], L21[8], L21[14]]));
  L21.push(MIX("Level 21 Challenge", L21.slice(0, 18), [L21[6], L21[12], L21[16]]));

  Object.assign(FRENCH_LEVELS, { 19: L19, 20: L20, 21: L21 });
})();
