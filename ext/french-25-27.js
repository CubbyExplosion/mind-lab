// ext/french-25-27.js : French, levels 25-27 (12th grade, then college year 1 first half).
// Literature, culture, linguistics, reading and listening-style passages, registers, idioms, translation, graded review.
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
  // pairs: [a, b, optional wrongs]; wrongs default to the other items' b
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

  // =====================================================  LEVEL 25
  const B25 = {
    poet: BK("Poetry words", [["l'alexandrin", "twelve-syllable line"], ["l'hémistiche", "half of a line"], ["la césure", "pause in the middle of a line"], ["le quatrain", "four-line stanza"], ["le tercet", "three-line stanza"], ["le sonnet", "14-line poem"], ["le vers libre", "free verse"], ["l'enjambement", "sentence running over a line break"], ["l'allitération", "repeated consonant sound"], ["l'assonance", "repeated vowel sound"], ["le refrain", "repeated line or chorus"], ["l'ode", "poem of praise"]], { tip: "A <b>sonnet</b> usually has two quatrains and two tercets. The classic French line is the <b>alexandrin</b>: 12 syllables, split by the <b>césure</b>." }),
    thea: BK("Theatre words", [["la réplique", "line spoken by an actor"], ["la tirade", "long speech"], ["l'aparté", "aside to the audience"], ["le dénouement", "final resolution of the plot"], ["l'intrigue", "plot"], ["le coup de théâtre", "sudden plot twist"], ["la mise en scène", "staging, direction"], ["les coulisses", "backstage"], ["le dramaturge", "playwright"], ["la didascalie", "stage direction"], ["l'entracte", "intermission"], ["le monologue", "speech by one character alone"]], { tip: "A <b>didascalie</b> is written for the actors, not spoken. A <b>coup de théâtre</b> changes everything in one moment." })
  };
  const MOVE = [
    ["Which 18th-century movement praised reason, science and tolerance?", "les Lumières", ["le romantisme", "le surréalisme", "le symbolisme"]],
    ["Which early-19th-century movement put feelings, nature and the individual first (Hugo, Lamartine)?", "le romantisme", ["le classicisme", "le naturalisme", "les Lumières"]],
    ["Which 19th-century movement tried to describe society as it really is (Flaubert, Balzac)?", "le réalisme", ["le romantisme", "le surréalisme", "l'humanisme"]],
    ["Which movement, led by Zola, used science-like observation of heredity and environment?", "le naturalisme", ["le symbolisme", "le classicisme", "le romantisme"]],
    ["Which movement, launched by André Breton in 1924, explored dreams and the unconscious?", "le surréalisme", ["le réalisme", "l'humanisme", "le classicisme"]],
    ["Which 20th-century school of thought (Sartre, Beauvoir) says we give our lives meaning by our choices?", "l'existentialisme", ["le classicisme", "le symbolisme", "le naturalisme"]],
    ["Which 17th-century movement valued order, rules and good taste (Racine, Molière)?", "le classicisme", ["le romantisme", "le surréalisme", "le naturalisme"]],
    ["Which Renaissance movement rediscovered ancient texts and put human beings at the centre (Rabelais)?", "l'humanisme", ["le réalisme", "l'existentialisme", "le symbolisme"]],
    ["Which late-19th-century movement (Mallarmé, Verlaine) used suggestion, symbols and the music of words?", "le symbolisme", ["le naturalisme", "le classicisme", "les Lumières"]],
    ["Which 1950s theatre style (Ionesco, Beckett) showed life as meaningless and language as breaking down?", "le théâtre de l'absurde", ["le théâtre classique", "le mélodrame romantique", "le réalisme social"]]
  ];
  const AUT = [
    ["Phèdre", "Jean Racine"], ["Le Cid", "Pierre Corneille"], ["Le Misanthrope", "Molière"], ["Les Fables", "Jean de La Fontaine"], ["L'Étranger", "Albert Camus"], ["La Nausée", "Jean-Paul Sartre"],
    ["Le Deuxième Sexe", "Simone de Beauvoir"], ["Du côté de chez Swann", "Marcel Proust"], ["Bonjour tristesse", "Françoise Sagan"], ["Vingt mille lieues sous les mers", "Jules Verne"], ["Les Trois Mousquetaires", "Alexandre Dumas"], ["En attendant Godot", "Samuel Beckett"], ["La Cantatrice chauve", "Eugène Ionesco"]
  ];
  const READ25 = [
    { t: "Le vieux Marcel s'assit sur le banc, comme chaque matin. Il regarda les pigeons, puis la fontaine, puis l'horloge de l'église. Rien n'avait changé depuis cinquante ans, sauf lui.", qs: [
      ["What does « sauf lui » suggest?", "The place stays the same, but the man has aged.", ["The fountain is broken.", "Marcel is angry at the pigeons."]],
      ["Where does the scene take place?", "In a public square", ["On a train", "In a school"]],
      ["The tone of the passage is mostly…", "quiet and nostalgic", ["furious and violent", "comic and noisy"]]] },
    { t: "— Tu n'as rien dit ? demanda Léa. — À quoi bon ? répondit son frère en haussant les épaules. Personne ne m'aurait écouté.", qs: [
      ["How does Léa's brother feel?", "Discouraged", ["Proud", "Excited"]],
      ["« À quoi bon ? » means…", "What is the point?", ["How good is it?", "Who is it for?"]],
      ["The conditional « aurait écouté » shows…", "an imagined situation that did not happen", ["a habit in the future", "a polite command"]]] },
    { t: "La pluie tombait depuis trois jours sur le village. Les rues étaient désertes, les volets fermés. Seule la boulangerie, au coin, répandait une odeur de pain chaud qui semblait défier le mauvais temps.", qs: [
      ["« Défier le mauvais temps » suggests the bakery smell…", "seems to resist the gloom", ["is spoiled by the rain", "comes from the storm"]],
      ["Which details create a sad, quiet atmosphere?", "Empty streets and closed shutters", ["The warm smell of bread", "The bakery on the corner"]],
      ["What contrast does the author create?", "A gloomy village and a cosy bakery", ["A big city and a small village", "Rain in the morning and sun at night"]]] },
    { t: "Camille avait quitté la Guadeloupe à dix-huit ans. Trente ans plus tard, le parfum d'un fruit suffisait encore à la ramener dans la cuisine de sa grand-mère.", qs: [
      ["What brings back Camille's memory?", "The smell of a fruit", ["A photograph", "A song on the radio"]],
      ["How long has Camille been away?", "Thirty years", ["Eighteen years", "Three years"]],
      ["The central theme of the passage is…", "memory and roots", ["a quarrel between friends", "a journey by boat"]]] }
  ];
  const BODY = [
    ["avoir le bras long", "to have a lot of influence"], ["avoir le cœur sur la main", "to be very generous"], ["casser les pieds à quelqu'un", "to annoy someone"], ["se mettre le doigt dans l'œil", "to be badly mistaken"],
    ["avoir un poil dans la main", "to be extremely lazy"], ["mettre la main à la pâte", "to pitch in and help"], ["avoir la tête dans les nuages", "to daydream"], ["prendre ses jambes à son cou", "to run away fast"],
    ["tomber sur un os", "to hit a snag"], ["se faire du mauvais sang", "to worry a lot"], ["avoir la langue bien pendue", "to be talkative"], ["ne pas avoir froid aux yeux", "to be bold"], ["en avoir plein le dos", "to be fed up"], ["faire la tête", "to sulk"]
  ];
  const ANIM = [
    ["avoir un chat dans la gorge", "to be hoarse (a frog in the throat)"], ["poser un lapin à quelqu'un", "to stand someone up"], ["appeler un chat un chat", "to call things by their real name"], ["quand les poules auront des dents", "never"],
    ["avoir le cafard", "to feel down"], ["être connu comme le loup blanc", "to be known by everybody"], ["revenons à nos moutons", "let's get back to the subject"], ["donner sa langue au chat", "to give up guessing"],
    ["avoir d'autres chats à fouetter", "to have more important things to do"], ["un temps de chien", "awful weather"], ["mettre la charrue avant les bœufs", "to put the cart before the horse"], ["passer du coq à l'âne", "to jump from topic to topic"], ["avoir une faim de loup", "to be ravenous"]
  ];
  const FALSE = [
    ["actuellement", "currently", "actually"], ["assister à", "to attend", "to assist"], ["blesser", "to injure", "to bless"], ["déçu", "disappointed", "deceived"], ["éventuellement", "possibly", "eventually"], ["la librairie", "bookstore", "library"],
    ["sensible", "sensitive", "sensible"], ["ignorer", "to not know", "to ignore"], ["large", "wide", "large"], ["le collège", "middle school", "college"], ["la lecture", "reading", "lecture"], ["la monnaie", "change (coins)", "money"],
    ["prétendre", "to claim", "to pretend"], ["rester", "to stay", "to rest"], ["achever", "to finish", "to achieve"], ["la location", "rental", "location"]
  ];
  const LIA = ["les enfants", "nous avons", "ils ont", "un petit ami", "chez elle", "dans un jardin", "très intéressant", "un grand arbre", "vous êtes", "mon ami"];
  const NOLIA = ["les haricots", "un héros", "et elle", "et ici", "un hibou", "les halls", "le chat est parti", "un livre intéressant"];
  const HASP = ["héros", "haricot", "hibou", "hockey", "honte", "hamster", "hasard", "haut", "héron", "hache"];
  const HMUET = ["homme", "hôtel", "heure", "histoire", "hiver", "hôpital", "horloge", "herbe", "hôte", "habitude"];
  const liaison = () => {
    const t = ri(0, 3), a = shuf, p = pick;
    if (t === 0) { const ans = p(LIA); return { text: "In which phrase must a <b>liaison</b> be made between the words?", choices: a([ans, ...a(NOLIA).slice(0, 2)]), answer: ans, hints: ["A liaison links a final silent consonant to a vowel sound that follows. Which phrase has a vowel sound after a word that is closely tied to it?", "Liaisons are required after articles, possessives, short adjectives, pronouns and short prepositions. They are not made after <i>et</i> or before an <i>h aspiré</i>.", "Example: in « des idées » the s is pronounced as z before the vowel. Now look for the same pattern in yours."] }; }
    if (t === 1) { const ans = p(NOLIA); return { text: "In which phrase is there <b>no</b> liaison?", choices: a([ans, ...a(LIA).slice(0, 2)]), answer: ans, hints: ["Look for a word that blocks the link: a conjunction, a word beginning with an aspirated h, or a singular noun followed by its verb.", "No liaison after <i>et</i>, before an h aspiré (like « le huit »), or after a singular noun.", "Example: « et alors » has no liaison, but « des amis » has one. Now look at yours."] }; }
    if (t === 2) { const ans = p(HASP); return { text: "Which word begins with an <b>h aspiré</b> (no elision, no liaison)?", choices: a([ans, ...a(HMUET).slice(0, 2)]), answer: ans, hints: ["With a mute h we say l'___ and make a liaison. With an aspirated h we say le/la ___ and separate the words.", "Say « le » or « la » before each word. The one that sounds natural without dropping the vowel has an aspirated h.", "Example: « le huit » (aspirated) but « l'huile » (mute). Now test yours."] }; }
    const ans = p(HMUET); return { text: "Which word begins with a <b>mute h</b> (so we say l'___ and link the words)?", choices: a([ans, ...a(HASP).slice(0, 2)]), answer: ans, hints: ["A mute h acts like a vowel, so « le » or « la » becomes l'.", "Try putting l' before each word. Only the mute-h word accepts it.", "Example: « l'huile » has a mute h, while « le huit » has an aspirated h. Now test yours."] };
  };
  const HOMO = [
    ["Elle ___ trompée de route.", "s'est", ["ces", "ses", "c'est"]], ["___ une belle journée.", "C'est", ["Ces", "Ses", "S'est"]], ["Il range ___ livres sur l'étagère.", "ses", ["ces", "c'est", "s'est"]],
    ["Regarde ___ fleurs, là-bas !", "ces", ["ses", "c'est", "s'est"]], ["Ils ___ perdus en forêt.", "sont", ["son", "on", "ont"]], ["Elle a perdu ___ sac.", "son", ["sont", "on", "ont"]],
    ["Elles ___ du talent.", "ont", ["on", "sont", "son"]], ["___ va au cinéma ce soir.", "On", ["Ont", "Sont", "Son"]], ["Il me ___ le café sur la table.", "met", ["mais", "mets", "mes"]],
    ["Je voudrais venir, ___ je suis malade.", "mais", ["met", "mets", "mes"]], ["Je ne ___ pas de sucre dans mon thé.", "mets", ["met", "mais", "mes"]], ["___ livre est à moi.", "Ce", ["Se", "Ceux", "Sa"]],
    ["Il ___ lave les mains.", "se", ["ce", "ceux", "sa"]], ["___ à moi, je reste ici.", "Quant", ["Quand", "Qu'en", "Quan"]], ["___ il arrivera, appelle-moi.", "Quand", ["Quant", "Qu'en", "Quan"]]
  ];
  const CULT = [
    ["Which brothers held the first paid public film screening in Paris in 1895?", "les frères Lumière", ["les frères Montgolfier", "les frères Goncourt", "les frères Pathé-Gaumont"]],
    ["Which French festival awards the Palme d'or?", "le festival de Cannes", ["le festival d'Avignon", "le festival d'Angoulême", "le festival de Deauville"]],
    ["The « Nouvelle Vague » of the late 1950s and 1960s was a movement in…", "cinema", ["architecture", "cooking", "fashion design"]],
    ["Which singer, nicknamed « la Môme », made « La Vie en rose » famous?", "Édith Piaf", ["Céline Dion", "Stromae", "Charles Aznavour"]],
    ["Which Belgian singer wrote « Ne me quitte pas »?", "Jacques Brel", ["Georges Brassens", "Édith Piaf", "Serge Gainsbourg"]],
    ["Which singer from Québec became a worldwide pop star?", "Céline Dion", ["Édith Piaf", "Jacques Brel", "Charles Trenet"]],
    ["Which Belgian artist is known for the 2009 hit « Alors on danse »?", "Stromae", ["Jacques Brel", "Zaz", "Charles Aznavour"]],
    ["Who created the Belgian comic hero Tintin?", "Hergé", ["Goscinny", "Uderzo", "Franquin"]],
    ["Which pair created the comic hero Astérix?", "Goscinny and Uderzo", ["Hergé and Peyo", "Franquin and Morris", "Sempé and Hergé"]],
    ["What is the French word for the Franco-Belgian comic book tradition?", "la bande dessinée", ["le dessin animé", "la caricature", "le feuilleton"]],
    ["Which city hosts a famous international comics festival each January?", "Angoulême", ["Cannes", "Avignon", "Strasbourg"]],
    ["Which director made the film « Les Quatre Cents Coups » (1959)?", "François Truffaut", ["Jean Renoir", "Luc Besson", "Claude Lelouch"]]
  ];
  const REG25 = [
    ["J'ai pas envie d'y aller.", "Je n'ai pas envie d'y aller.", "Je ne souhaite pas m'y rendre."], ["Tu veux quoi ?", "Qu'est-ce que tu veux ?", "Que désires-tu ?"], ["Il fait un froid de canard.", "Il fait très froid.", "Le froid est rigoureux."],
    ["On bouffe où ce soir ?", "Où mange-t-on ce soir ?", "Où dînerons-nous ce soir ?"], ["Il est vachement fort.", "Il est très fort.", "Il est remarquablement doué."], ["J'ai un pote qui bosse là-bas.", "J'ai un ami qui travaille là-bas.", "Un de mes amis y exerce son métier."],
    ["Elle est trop sympa.", "Elle est très gentille.", "Elle est fort aimable."], ["Je me suis planté à l'exam.", "J'ai raté mon examen.", "J'ai échoué à mon examen."], ["Passe-moi le bouquin.", "Donne-moi le livre.", "Veuillez me remettre l'ouvrage."], ["Il a plus de thunes que moi.", "Il a plus d'argent que moi.", "Il est plus fortuné que moi."]
  ];
  const regQ = () => {
    const [f, n, s] = pick(REG25), t = pick([["familiar (casual, close to slang)", f], ["neutral (everyday standard French)", n], ["formal (elevated, careful)", s]]);
    return { text: `Which sentence is <b>${t[0]}</b>?`, choices: shuf([f, n, s]), answer: t[1], hints: ["Think about who is speaking to whom: friends, classmates, or an official?", "Casual French drops <i>ne</i>, uses slang and short forms. Formal French uses richer, more careful vocabulary and full structures.", "Example: « Il est crevé » (familiar), « Il est fatigué » (neutral), « Il est épuisé » (formal). Now sort yours."] };
  };
  const LETT = [
    ["Which closing suits a formal letter to someone you do not know?", "Veuillez agréer, Madame, Monsieur, mes salutations distinguées.", ["Bises et à bientôt !", "Bonne journée, ciao !"]],
    ["How do you open a formal letter to an unknown reader?", "Madame, Monsieur,", ["Salut tout le monde,", "Coucou !"]],
    ["Which opening suits a letter to a close friend?", "Cher Paul,", ["Madame, Monsieur,", "À l'attention de Monsieur le Directeur,"]],
    ["Which phrase explains why you are writing in a formal letter?", "Je me permets de vous écrire au sujet de…", ["Alors voilà, je te raconte…", "Devine quoi !"]],
    ["Which phrase politely asks for a reply?", "Dans l'attente de votre réponse,", ["Réponds vite !", "Écris-moi quand tu veux, hein."]],
    ["Which sentence thanks someone formally in advance?", "Je vous remercie par avance de votre aide.", ["Merci les gars, t'es top !", "Cool, merci à toi."]],
    ["Which closing fits an email to a colleague you know a little (neutral)?", "Cordialement,", ["Veuillez agréer l'expression de mon profond respect,", "Gros bisous !"]],
    ["What does « P.J. » mean at the end of a letter?", "pièce jointe (attachment)", ["pour jeudi", "petite joie"]],
    ["Which pronoun do you use for « you » in a formal letter?", "vous", ["tu", "on"]],
    ["Which sentence formally apologizes for a delay?", "Je vous prie de bien vouloir m'excuser pour ce retard.", ["Pardon, j'étais à la bourre !", "Désolé, hein !"]],
    ["Which sentence announces an attached document?", "Veuillez trouver ci-joint mon curriculum vitæ.", ["Regarde mon CV, là !", "Mon CV est parti, ciao."]]
  ];
  const EN2FR = [
    ["I miss you.", "Tu me manques.", ["Je te manque.", "Je manque toi."]], ["I just arrived.", "Je viens d'arriver.", ["Je viens arriver.", "J'ai juste arrivé."]],
    ["I have been living here for three years.", "J'habite ici depuis trois ans.", ["J'ai habité ici pour trois ans.", "J'habite ici il y a trois ans."]], ["She is about to leave.", "Elle est sur le point de partir.", ["Elle est à propos de partir.", "Elle est environ de partir."]],
    ["I am cold.", "J'ai froid.", ["Je suis froid.", "Je suis froide."]], ["Do you know this song?", "Tu connais cette chanson ?", ["Tu sais cette chanson ?", "Tu peux cette chanson ?"]],
    ["We spent two hours at the museum.", "Nous avons passé deux heures au musée.", ["Nous avons dépensé deux heures au musée.", "Nous avons fait deux heures au musée."]], ["It takes ten minutes.", "Il faut dix minutes.", ["Il prend dix minutes.", "Il y a dix minutes."]],
    ["He is good at math.", "Il est fort en maths.", ["Il est bon à maths.", "Il est bien à maths."]], ["I am seventeen years old.", "J'ai dix-sept ans.", ["Je suis dix-sept ans.", "J'ai dix-sept années."]],
    ["I am looking for my keys.", "Je cherche mes clés.", ["Je regarde pour mes clés.", "Je cherche pour mes clés."]], ["I like to swim.", "J'aime nager.", ["J'aime pour nager.", "J'aime nageant."]],
    ["Do not forget to call me.", "N'oublie pas de m'appeler.", ["N'oublie pas à m'appeler.", "N'oublie pas m'appeler."]], ["I am going to the dentist's.", "Je vais chez le dentiste.", ["Je vais dans le dentiste.", "Je vais à le dentiste."]]
  ];
  const FR2EN = [
    ["Il y a deux ans que j'étudie le français.", "I have been studying French for two years.", ["There are two years of French.", "I studied French two years ago."]], ["J'ai failli tomber.", "I almost fell.", ["I failed to get up.", "I tripped on purpose."]],
    ["Il a beau pleuvoir, nous sortons.", "No matter how much it rains, we are going out.", ["It is lovely weather, so we go out.", "It would be nice to rain, but we are leaving."]], ["Ça m'est égal.", "I do not mind.", ["That is my equal.", "I disagree with that."]],
    ["Je me suis fait couper les cheveux.", "I got my hair cut.", ["I cut my own hair.", "I cut myself with scissors."]], ["Elle fait construire une maison.", "She is having a house built.", ["She is building a house herself.", "She is pretending to build a house."]],
    ["Je viens de le voir.", "I just saw him.", ["I am about to see him.", "I am coming to see him."]], ["Cela fait trois heures qu'il dort.", "He has been sleeping for three hours.", ["He will sleep for three hours.", "He slept three hours ago."]],
    ["Il vaut mieux partir tôt.", "It is better to leave early.", ["He is worth leaving early.", "It is worse to leave early."]], ["Je n'y suis pour rien.", "It is not my fault.", ["I am there for nothing.", "I am not there at all."]],
    ["Peu importe.", "It does not matter.", ["A little is important.", "It is very important."]], ["Il s'en est fallu de peu.", "It was a close call.", ["He was missing something small.", "It was far too late."]]
  ];
  const TENSE = [
    ["Quand il était petit, il ___ (aller) chaque été chez sa grand-mère.", "allait", ["est allé", "ira"]], ["Hier soir, nous ___ (rentrer) à minuit.", "sommes rentrés", ["rentrions", "rentrerons"]], ["Il ___ (pleuvoir) quand je suis sorti.", "pleuvait", ["a plu", "pleuvra"]],
    ["Soudain, la porte ___ (s'ouvrir).", "s'est ouverte", ["s'ouvrait", "s'ouvre"]], ["Elle ___ (lire) un roman quand son frère est entré.", "lisait", ["a lu", "lira"]], ["Pendant mon enfance, mes parents ___ (voyager) beaucoup.", "voyageaient", ["ont voyagé", "voyageront"]],
    ["Il ___ (se lever) à sept heures ce matin-là.", "s'est levé", ["se levait", "se lèvera"]], ["Il faisait beau et les oiseaux ___ (chanter).", "chantaient", ["ont chanté", "chanteront"]], ["Le 14 juillet 1789, le peuple ___ (prendre) la Bastille.", "a pris", ["prenait", "prendra"]],
    ["Nous ___ (habiter) à Lyon quand j'ai rencontré Paul.", "habitions", ["avons habité", "habiterons"]], ["Il ___ (savoir) la vérité depuis longtemps, mais il n'a rien dit.", "savait", ["a su", "saura"]], ["Après qu'elle ___ (partir), il a pleuré.", "est partie", ["partait", "partirait"]]
  ];
  const PRON = [
    ["— Tu as parlé à Marie ? — Oui, je ___ ai parlé.", "lui", ["l'", "y"]], ["— Tu vas à Paris ? — Oui, j'___ vais demain.", "y", ["en", "lui"]], ["— Vous voulez du café ? — Oui, j'___ veux bien.", "en", ["y", "le"]],
    ["— Tu écris à tes parents ? — Oui, je ___ écris souvent.", "leur", ["les", "y"]], ["— Tu penses à ton examen ? — Oui, j'___ pense.", "y", ["en", "lui"]], ["— Tu as peur des araignées ? — Oui, j'___ ai peur.", "en", ["y", "les"]],
    ["— Tu connais ce film ? — Oui, je ___ connais.", "le", ["lui", "y"]], ["— Tu as vu tes cousins ? — Oui, je ___ ai vus hier.", "les", ["leur", "eux"]], ["— Combien de livres as-tu ? — J'___ ai trois.", "en", ["y", "les"]],
    ["— Il s'intéresse à la musique ? — Oui, il s'___ intéresse.", "y", ["en", "lui"]], ["— Tu te souviens de cette histoire ? — Oui, je m'___ souviens.", "en", ["y", "la"]], ["— Tu as répondu à ton prof ? — Oui, je ___ ai répondu.", "lui", ["y", "le"]]
  ];
  const TYP25 = [
    ["Type in French: <b>stanza</b> (une ___)", "strophe"], ["Type in French: <b>rhyme</b> (une ___)", "rime"], ["Type in French: <b>novel</b> (un ___)", "roman"], ["Type in French: <b>writer</b> (un ___)", "écrivain"],
    ["Type in French: <b>poem</b> (un ___)", "poème"], ["Type in French: <b>stage</b> or <b>scene</b> (une ___)", "scène"], ["Type in French: <b>actor</b> (un ___)", "acteur"], ["Type in French: <b>plot</b> (une ___)", "intrigue"],
    ["Type in French: <b>chapter</b> (un ___)", "chapitre"], ["Type in French: <b>title</b> (un ___)", "titre"], ["Type in French: <b>reader</b> (un ___)", "lecteur"], ["Type in French: <b>sonnet</b> (un ___)", "sonnet"]
  ];

  const L25 = [
    les("Poetry words", vocab(B25.poet), tVocab(B25.poet)),
    les("Theatre words", vocab(B25.thea), tVocab(B25.thea)),
    les("Literary movements", mc(MOVE, ["Think about the century and the main idea of the movement: reason, feeling, reality, dreams, choice, order, symbols?", "Match the key words in the question (reason, feelings, observation, dreams…) to the movement whose name carries the same idea.", "Example: Dada (1916) rejected logic and tradition and played with nonsense and chance. Now match yours."], 2),
      tg("Movements in French literature", "🏛️", "French literature is often taught as a chain of <b>movements</b>: each one reacts to the one before it.", "Classicisme → Lumières → romantisme → réalisme → symbolisme → surréalisme", "From order and reason, to feeling, to reality, to dreams.", "Learn each movement with one author and one keyword.")),
    les("Famous works and authors", pq(AUT, a => `Who wrote « ${a} »?`, ["Think of the type of work: a tragedy, a comedy, a novel, an adventure story, a philosophical text?", "Think of the century and the style. Some works were written for the stage, others were novels or essays.", "Example: « Les Misérables » is a novel by Victor Hugo and « Cyrano de Bergerac » is a play by Edmond Rostand. Now think about yours."]),
      tg("Titles and authors", "📚", "At this level you recognize a work by its title and place it in time.", "« Phèdre » is a tragedy in verse.<br>« L'Étranger » is a 20th-century novel.", "Different centuries, different styles.", "Link each title to one image or idea, then to the author's name.")),
    les("Reading: four literary passages", mc(readQ(READ25), readH, 2), readT("Reading literature", "Literary prose is full of images and implied feelings. A short sentence can say a lot.", "Ask yourself: who is speaking, what feeling is hidden, and what is the effect of the last words?")),
    les("Idioms with the body", pq(BODY, a => `What does « ${a} » mean?`, ["Do not translate word by word. Picture a situation in which someone could say this.", "The body part is a picture for a feeling or attitude, such as laziness, anger, courage or effort.", "Example: « avoir un cœur d'or » means to be very kind. Now think about yours."]),
      tg("Idioms with the body", "🖐️", "French idioms often use body parts as pictures. Their meaning is not in the single words.", "avoir le bras long<br>prendre ses jambes à son cou", "Having influence. Running away.", "Learn each idiom as one block, like a vocabulary word.")),
    les("Idioms with animals", pq(ANIM, a => `What does « ${a} » mean?`, ["Do not picture a real animal. The animal stands for a quality, mood or situation.", "Ask: is the idiom about speaking, waiting, mood or work?", "Example: « avoir une mémoire d'éléphant » means to have a great memory. Now think about yours."]),
      tg("Animals in speech", "🐾", "Animals appear in many French idioms: the cat, the wolf, the cock, the rabbit.", "poser un lapin<br>un temps de chien", "To stand someone up. Awful weather.", "Say the idiom aloud and imagine a real situation where you would use it.")),
    les("False friends", mc(FALSE.map(([f, a, trap]) => [`What does « ${f} » really mean?`, a, [trap, ...shuf(FALSE.filter(x => x[1] !== a)).slice(0, 2).map(x => x[1])]]), ["This word looks like an English word, but French and English have grown apart.", "Do not choose the English look-alike without checking. It is often the trap.", "Example: « la journée » is not a journey. It means the whole day. Now think about yours."], 2),
      tg("Faux amis", "🪤", "<b>False friends</b> look like English words but mean something different.", "actuellement = at present<br>la librairie = bookstore", "Not « actually », not « library ».", "When a French word looks too easy, double-check it.")),
    les("Liaison and the aspirated h", liaison,
      tg("Linking sounds", "🔗", "A <b>liaison</b> links a silent final consonant to a vowel sound that follows: <i>les‿amis</i> is said with a z sound.", "nous‿avons, un petit‿ami<br>et elle (no liaison)", "Required. Never after et.", "A mute h works like a vowel (l'homme). An <b>h aspiré</b> blocks liaison and elision (le héros).")),
    les("Sound-alike words", mc(HOMO, ["Read the whole sentence. What is the role of the missing word: a verb, a possessive, a pointer, a conjunction?", "Think about replacements: can you swap in « cela », « mon/ma », « était », « mais » or « maintenant »?", "Example: « Ils ___ des idées » needs a verb, so « ont » (have), not « on ». Now work out yours."], 3),
      tg("Homophones", "👂", "French has many words that sound the same but are spelled differently. The sentence tells you which one.", "ces / ses / c'est / s'est<br>on / ont, son / sont", "Pointer, possessive, verb phrases.", "Test by replacing: « ses » → « mes », « ont » → « avaient », « sont » → « étaient ».")),
    les("Culture: music, film and comics", mc(CULT, ["Think of the place (France, Belgium, Québec) and the field (music, film, comics).", "Associate each famous name with one work or place. Names that share a field can still belong to different countries.", "Example: Georges Méliès was a pioneer of special effects in early cinema. Now think about yours."], 2),
      tg("Francophone arts", "🎬", "French and Belgian culture has given the world cinema, chanson and the bande dessinée.", "Lumière → cinéma<br>Brel and Stromae → chanson<br>Hergé → BD", "Three art forms, many countries.", "Belgium is a major source of comics. Québec has a strong music scene.")),
    les("Familiar, neutral or formal?", regQ,
      tg("Choosing a register", "🎭", "Every sentence has a <b>register</b>: familiar with friends, neutral in daily life, formal in writing and official speech.", "J'ai pas envie. / Je n'ai pas envie. / Je ne souhaite pas.", "Familiar, neutral, formal.", "Dropping <i>ne</i> and using slang marks the familiar register.")),
    les("Letters and emails", mc(LETT, ["Who is the reader: a friend, a colleague, or an official you do not know?", "Formal letters use <i>vous</i>, set phrases and long closings. Friendly notes are short and warm.", "Example: « Bien à vous » suits a friendly-formal email. Now think about yours."], 2),
      tg("Letter formulas", "✉️", "Formal French has fixed phrases for opening, explaining and closing.", "Madame, Monsieur,<br>Je me permets de vous écrire…", "Opening and reason for writing.", "Match the closing to the opening: a formal opening needs a formal closing.")),
    les("Translate into French", mc(EN2FR.map(([e, a, w]) => [`Which is the best French for: "${e}"`, a, w]), ["Do not translate word by word. Find how French expresses the idea.", "Check the verb, the preposition and the tense. English and French often choose differently.", "Example: « I'm hungry » is « J'ai faim », not « Je suis faim ». Now translate yours."], 2),
      tg("Thinking in French", "🔄", "Many English sentences need a new structure in French.", "I miss you → Tu me manques.<br>I have lived here for 3 years → J'habite ici depuis trois ans.", "The subject changes. The tense changes.", "Learn the whole structure, not the single words.")),
    les("Translate into English", mc(FR2EN.map(([f, a, w]) => [`What does this French sentence mean? « ${f} »`, a, w]), ["Do not translate word by word. Find the structure first: a tense, a set phrase, or a fixed construction.", "Pay attention to little words like <i>beau</i>, <i>failli</i>, <i>venir de</i> and <i>il y a</i>.", "Example: « Elle vient de sortir » means She has just gone out. Now work on yours."], 2),
      tg("Set structures", "🧩", "Some French structures have a special meaning.", "venir de + infinitive<br>avoir beau + infinitive<br>faire + infinitive", "Just done. No matter how. Have something done.", "Learn each structure with one example sentence.")),
    les("Past tenses in a story", mc(TENSE, ["Is the verb describing a background situation, or a single finished event?", "Imparfait = background, habit, description. Passé composé = a precise event that happens in the story.", "Example: « Il neigeait quand nous sommes arrivés » uses the imparfait for the weather and the passé composé for the arrival. Now do yours."], 2),
      tg("Narrating in the past", "📖", "Stories mix the <b>imparfait</b> (the scene) and the <b>passé composé</b> (the events).", "Il pleuvait quand je suis sorti.", "Scene, then event.", "Ask: is it a movie background, or something that happens in the movie?")),
    les("Pronouns y, en, lui, leur", mc(PRON, ["Is the missing pronoun about a place, a quantity, a thing, or a person?", "Y = à + thing or place. En = de + thing or quantity. Lui and leur replace à + person.", "Example: « Tu parles à ton frère ? — Oui, je lui parle » uses lui for a person. Now do yours."], 2),
      tg("Pronoun replacements", "🔁", "Pronouns replace a phrase that was already mentioned.", "J'y vais. / J'en veux. / Je lui parle.", "Place, quantity, person.", "Check the preposition: à + person → lui/leur, à + thing → y, de → en.")),
    les("Type the word", typed(TYP25, "Think about the vocabulary of literature and theatre.", "Example: 'Type in French: <b>verse</b>' would be 'vers'. Now type yours. (Accents are optional.)"), [S("Typing practice", "⌨️", "You type the French word for the English you see."), S("Remember", "🧠", "Some words are masculine (le) and some feminine (la), but you type only the word."), S("Tip", "✍️", "Accents are optional here.")])
  ];
  L25.push(MIX("Mixed practice", L25.slice(0, 18), [L25[2], L25[5], L25[11]]));
  L25.push(MIX("Level 25 Challenge", L25.slice(0, 18), [L25[3], L25[8], L25[14]]));

  // =====================================================  LEVEL 26
  const B26 = {
    anal: BK("Analysing a text", [["le champ lexical", "group of words on one theme"], ["le thème", "theme"], ["le ton", "tone"], ["le point de vue", "point of view"], ["l'implicite", "what is implied, not said"], ["le sous-entendu", "hint, implied meaning"], ["le procédé", "technique, device"], ["la progression", "development of the text"], ["la citation", "quotation"], ["la visée", "aim, intention"], ["l'ironie", "irony"], ["la reformulation", "rewording"], ["le sens figuré", "figurative meaning"], ["le sens propre", "literal meaning"]], { tip: "To comment on a text, name a <b>procédé</b>, quote it (<b>citation</b>) and explain its <b>effet</b>." })
  };
  const LUM = [
    ["Who wrote the satirical tale « Candide » (1759)?", "Voltaire", ["Rousseau", "Diderot", "Montesquieu"]],
    ["Which book by Montesquieu (1748) proposed the separation of powers?", "De l'esprit des lois", ["Le Contrat social", "Candide", "Les Confessions"]],
    ["Who wrote « Le Contrat social » (1762)?", "Rousseau", ["Voltaire", "Diderot", "Montesquieu"]],
    ["Who directed the great Encyclopédie with d'Alembert?", "Diderot", ["Voltaire", "Rousseau", "Montesquieu"]],
    ["What was the Encyclopédie?", "A large work collecting knowledge of the arts and sciences", ["A royal law code", "A novel about travel"]],
    ["What was an 18th-century « salon »?", "A regular gathering, often hosted by a woman, to discuss ideas and literature", ["A royal army camp", "A public market"]],
    ["Which 1789 text proclaimed the rights of all citizens?", "La Déclaration des droits de l'homme et du citoyen", ["Le Code civil", "Le Contrat social"]],
    ["Which book by Montesquieu (1721) shows French society through the eyes of two visitors?", "Les Lettres persanes", ["Les Fleurs du mal", "Les Misérables"]],
    ["Which woman wrote the 1791 Declaration of the Rights of Woman and the Female Citizen?", "Olympe de Gouges", ["George Sand", "Madame de Sévigné", "Simone de Beauvoir"]],
    ["Which Rousseau book (1762) is about education?", "Émile", ["Candide", "Zadig"]],
    ["What did Voltaire defend in his « Traité sur la tolérance » (1763)?", "Tolerance and fair trials", ["Absolute royal power", "Strict religious rules"]]
  ];
  const XIX = [
    ["Who wrote « Les Fleurs du mal » (1857)?", "Charles Baudelaire", ["Paul Verlaine", "Alfred de Musset", "Alphonse de Lamartine"]],
    ["Which teenage poet wrote « Le Bateau ivre »?", "Arthur Rimbaud", ["Paul Verlaine", "Stéphane Mallarmé", "Alfred de Musset"]],
    ["Who wrote « Madame Bovary » (1857)?", "Gustave Flaubert", ["Stendhal", "Émile Zola", "Honoré de Balzac"]],
    ["Who wrote the twenty-volume cycle « Les Rougon-Macquart »?", "Émile Zola", ["Gustave Flaubert", "Maupassant", "Balzac"]],
    ["Who wrote the vast series « La Comédie humaine »?", "Honoré de Balzac", ["Stendhal", "Victor Hugo", "Alexandre Dumas"]],
    ["Which poet wrote « Le Lac » (1820), a famous romantic poem?", "Alphonse de Lamartine", ["Arthur Rimbaud", "Baudelaire", "Paul Éluard"]],
    ["Which short-story writer wrote « La Parure » and « Boule de Suif »?", "Guy de Maupassant", ["Alphonse Daudet", "Prosper Mérimée", "Flaubert"]],
    ["Which woman writer used the pen name George Sand?", "Aurore Dupin", ["Colette", "Marguerite Duras", "Madame de Staël"]],
    ["Who wrote « Le Rouge et le Noir » (1830)?", "Stendhal", ["Flaubert", "Zola", "Balzac"]],
    ["Who wrote « Notre-Dame de Paris » (1831)?", "Victor Hugo", ["Alexandre Dumas", "Jules Verne", "Stendhal"]],
    ["Which poet wrote « Un coup de dés jamais n'abolira le hasard »?", "Stéphane Mallarmé", ["Charles Baudelaire", "Paul Verlaine", "Arthur Rimbaud"]]
  ];
  const XX = [
    ["Who launched surrealism with his 1924 manifesto?", "André Breton", ["Jean-Paul Sartre", "Albert Camus", "Marcel Proust"]],
    ["Which movement of Black writers (Césaire, Senghor, Damas) celebrated African identity?", "la Négritude", ["le Nouveau Roman", "l'Oulipo", "le romantisme"]],
    ["Which poet-president of Senegal sat in the Académie française?", "Léopold Sédar Senghor", ["Aimé Césaire", "Ahmadou Kourouma", "Mongo Beti"]],
    ["Which Martinican poet wrote « Cahier d'un retour au pays natal »?", "Aimé Césaire", ["Léopold Sédar Senghor", "Édouard Glissant", "Frantz Fanon"]],
    ["Which group, founded in 1960 by Queneau and Le Lionnais, wrote with playful constraints?", "l'Oulipo", ["la Négritude", "la Pléiade", "le Surréalisme"]],
    ["Which Oulipo novel by Georges Perec is written without the letter e?", "La Disparition", ["La Vie mode d'emploi", "Les Choses", "Un homme qui dort"]],
    ["Who wrote « Exercices de style », telling one little story in 99 ways?", "Raymond Queneau", ["Georges Perec", "Boris Vian", "Jacques Prévert"]],
    ["Which author of « La Peste » won the Nobel Prize in Literature in 1957?", "Albert Camus", ["Jean-Paul Sartre", "André Gide", "François Mauriac"]],
    ["Which writer of the « Nouveau Roman » wrote « La Jalousie » (1957)?", "Alain Robbe-Grillet", ["Albert Camus", "Marguerite Yourcenar", "Raymond Radiguet"]],
    ["Which French writer won the Nobel Prize in Literature in 2022?", "Annie Ernaux", ["Marguerite Duras", "Leïla Slimani", "Simone de Beauvoir"]],
    ["Which poet published « Alcools » (1913) without any punctuation?", "Guillaume Apollinaire", ["Paul Éluard", "Jacques Prévert", "Louis Aragon"]],
    ["Which prize is the best-known French literary award, announced each November?", "le prix Goncourt", ["le prix Pulitzer", "la Palme d'or", "le prix César"]]
  ];
  const FLIT = [
    ["Which Senegalese author wrote « Une si longue lettre » (1979)?", "Mariama Bâ", ["Assia Djebar", "Maryse Condé", "Leïla Slimani"]],
    ["Which Québec author wrote « Bonheur d'occasion » (1945)?", "Gabrielle Roy", ["Anne Hébert", "Michel Tremblay", "Dany Laferrière"]],
    ["Which Haitian-born writer joined the Académie française in 2013?", "Dany Laferrière", ["Patrick Chamoiseau", "Amin Maalouf", "Michel Tremblay"]],
    ["Which Martinican author won the Prix Goncourt in 1992 for « Texaco »?", "Patrick Chamoiseau", ["Édouard Glissant", "Aimé Césaire", "Maryse Condé"]],
    ["Which Guadeloupean author wrote « Moi, Tituba sorcière… »?", "Maryse Condé", ["Mariama Bâ", "Assia Djebar", "Gisèle Pineau"]],
    ["Which Lebanese-born author wrote « Léon l'Africain »?", "Amin Maalouf", ["Tahar Ben Jelloun", "Dany Laferrière", "Yasmina Reza"]],
    ["Which author won the Prix Goncourt in 2016 for « Chanson douce »?", "Leïla Slimani", ["Annie Ernaux", "Mariama Bâ", "Delphine de Vigan"]],
    ["Which Algerian author wrote « L'Amour, la fantasia » (1985)?", "Assia Djebar", ["Mariama Bâ", "Maryse Condé", "Colette"]],
    ["Which Ivorian novelist wrote « Les Soleils des indépendances » (1968)?", "Ahmadou Kourouma", ["Ousmane Sembène", "Mongo Beti", "Camara Laye"]],
    ["Which Québec playwright wrote « Les Belles-sœurs » (1968)?", "Michel Tremblay", ["Gabrielle Roy", "Réjean Ducharme", "Anne Hébert"]],
    ["Which Belgian-born author created the detective Maigret?", "Georges Simenon", ["Hergé", "Jacques Brel", "Amélie Nothomb"]]
  ];
  const READ26a = [
    { t: "Certains affirment que les réseaux sociaux isolent les jeunes. Or, une étude récente montre que beaucoup les utilisent surtout pour garder le contact avec des amis éloignés. Il faut donc nuancer ce jugement.", qs: [
      ["What does « Or » do in the text?", "It introduces a contrast with the first claim", ["It gives an example", "It ends the argument"]],
      ["What is the writer's position?", "Balanced: it is not so simple", ["Fully against social networks", "Fully in favour of them"]],
      ["« Il faut donc nuancer ce jugement » means…", "We must not judge too simply", ["We must forbid the study", "We should repeat the claim"]]] },
    { t: "Le vélo est bon pour la santé, il ne pollue pas et il coûte peu. Cependant, dans une ville sans pistes cyclables, il peut être dangereux. La mairie devrait donc agir.", qs: [
      ["Which word introduces a limit to the first idea?", "Cependant", ["donc", "et"]],
      ["What does the writer ask the town to do?", "Build safer routes for cyclists", ["Ban cars completely", "Sell cheaper bikes"]],
      ["This text is…", "an argument with a call to action", ["a poem", "a weather report"]]] },
    { t: "Lire sur écran n'est pas lire sur papier, dit l'auteur: la lecture y devient plus rapide, mais aussi plus superficielle. Pourtant, il refuse d'opposer les deux: chacun a sa place.", qs: [
      ["According to the author, reading on screen is…", "faster but more superficial", ["slower but deeper", "impossible"]],
      ["« Pourtant » introduces…", "a more nuanced attitude", ["a new example", "a date"]],
      ["What is his conclusion?", "Both ways of reading have their place", ["Paper must disappear", "Screens must be banned"]]] },
    { t: "Je ne suis pas contre les devoirs, écrit un professeur, mais trop de devoirs tuent le plaisir d'apprendre. Mieux vaut peu, mais bien choisi.", qs: [
      ["What does the teacher think of homework?", "It is fine but should be limited", ["It should be banned", "There should be more of it"]],
      ["« Mieux vaut peu, mais bien choisi » means…", "A small, well-chosen amount is better", ["More is always better", "Choose nothing at all"]],
      ["« Tuent » is used…", "figuratively, to mean destroy", ["literally, about people", "as a past tense"]]] }
  ];
  const LIST26 = [
    ["Mesdames et messieurs, le train à destination de Lyon aura vingt minutes de retard. Nous vous prions de nous excuser.", "How late is the train to Lyon?", "20 minutes", ["12 minutes", "50 minutes"]],
    ["Bonjour, vous êtes bien sur la messagerie du cabinet Dupont. Nous sommes ouverts du lundi au vendredi, de neuf heures à dix-sept heures.", "When is the office open?", "Monday to Friday, 9 to 5", ["Every day, 9 to 5", "Monday to Saturday, 9 to 7"]],
    ["Demain, le ciel sera nuageux le matin, puis de belles éclaircies viendront l'après-midi.", "What will the afternoon be like?", "Sunny spells", ["Rainy", "Stormy"]],
    ["Ce soir, la bibliothèque ferme exceptionnellement à dix-huit heures, à cause d'une réunion.", "Why does the library close early?", "There is a meeting", ["It is a holiday", "There is a storm"]],
    ["Prenez la deuxième rue à gauche, puis allez tout droit jusqu'à la pharmacie.", "Where should you turn?", "Second street on the left", ["First street on the right", "Second street on the right"]],
    ["Le concert commence à vingt heures trente. Les portes ouvrent une heure avant. N'oubliez pas votre billet.", "When do the doors open?", "At 7:30 pm", ["At 8:30 pm", "At 9:30 pm"]],
    ["Allô, c'est Sophie. Je ne pourrai pas venir ce soir, j'ai un examen demain. On se voit samedi ?", "Why can't Sophie come?", "She has an exam tomorrow", ["She is sick", "She is travelling"]],
    ["Les magasins du centre-ville seront fermés dimanche. En revanche, le marché restera ouvert jusqu'à midi.", "What stays open on Sunday?", "The market, until noon", ["The shops, until noon", "Nothing"]],
    ["Pour réserver une table, appuyez sur un. Pour parler à un conseiller, appuyez sur deux.", "Which key do you press to speak to an adviser?", "2", ["1", "3"]],
    ["Le vol numéro quatre cent douze pour Montréal embarque porte sept.", "Which gate is the flight to Montréal at?", "Gate 7", ["Gate 4", "Gate 12"]]
  ];
  const FOOD = [
    ["avoir la patate", "to be full of energy"], ["raconter des salades", "to tell tall tales"], ["ce n'est pas la fin des haricots", "it is not the end of the world"], ["mettre son grain de sel", "to butt in"],
    ["être dans les choux", "to be in a mess"], ["la cerise sur le gâteau", "the icing on the cake"], ["tomber dans les pommes", "to faint"], ["les carottes sont cuites", "it is all over"],
    ["en faire tout un fromage", "to make a big fuss"], ["avoir du pain sur la planche", "to have a lot of work to do"], ["c'est du gâteau", "it is a piece of cake"], ["ne pas être dans son assiette", "to feel off"], ["noyer le poisson", "to muddy the issue"], ["pour une bouchée de pain", "for next to nothing"]
  ];
  const COLOR = [
    ["voir la vie en rose", "to see life through rose-colored glasses"], ["rire jaune", "to laugh without real amusement"], ["avoir une peur bleue", "to be scared stiff"], ["une nuit blanche", "a sleepless night"],
    ["broyer du noir", "to feel gloomy"], ["être sur son trente et un", "to be dressed up"], ["faire d'une pierre deux coups", "to kill two birds with one stone"], ["tous les trente-six du mois", "almost never"],
    ["en moins de deux", "very quickly"], ["un de ces quatre", "one of these days"], ["voir trente-six chandelles", "to see stars"], ["couper les cheveux en quatre", "to split hairs"], ["être aux anges", "to be delighted"], ["de but en blanc", "abruptly"]
  ];
  const QUE = [
    ["un dépanneur", "a convenience store"], ["magasiner", "to go shopping"], ["un char", "a car"], ["le souper", "the evening meal"], ["le déjeuner", "breakfast"], ["le dîner", "lunch"],
    ["une tuque", "a knitted winter hat"], ["un courriel", "an email"], ["bienvenue (in reply to merci)", "you are welcome"], ["le stationnement", "parking"], ["la fin de semaine", "the weekend"], ["clavarder", "to chat online"], ["un chandail", "a sweater"], ["une poutine", "fries with cheese curds and gravy"]
  ];
  const CAP = [
    ["le Sénégal", "Dakar"], ["le Mali", "Bamako"], ["le Cameroun", "Yaoundé"], ["Madagascar", "Antananarivo"], ["le Maroc", "Rabat"], ["la Tunisie", "Tunis"], ["l'Algérie", "Alger"], ["la Belgique", "Bruxelles"],
    ["la Suisse", "Berne"], ["le Burkina Faso", "Ouagadougou"], ["le Niger", "Niamey"], ["le Gabon", "Libreville"], ["le Rwanda", "Kigali"], ["la Guinée", "Conakry"], ["le Togo", "Lomé"], ["le Liban", "Beyrouth"], ["le Canada", "Ottawa"]
  ];
  const GAST = [
    ["Which region is the home of the crêpe and the galette?", "la Bretagne", ["l'Alsace", "la Provence", "la Corse"]],
    ["Which port city is famous for bouillabaisse, a fish soup?", "Marseille", ["Strasbourg", "Lille", "Bordeaux"]],
    ["Camembert comes from which region?", "la Normandie", ["la Provence", "l'Alsace", "la Bretagne"]],
    ["Which cheese is made of sheep's milk and aged in caves in the south of France?", "le roquefort", ["le camembert", "le brie", "le comté"]],
    ["Which Alsace speciality is sauerkraut served with meats?", "la choucroute", ["le cassoulet", "la ratatouille", "la bouillabaisse"]],
    ["Which slow-cooked bean stew is linked to the south-west (Toulouse)?", "le cassoulet", ["la choucroute", "la quiche", "le pot-au-feu"]],
    ["In 2010, UNESCO recognized as world heritage…", "the gastronomic meal of the French", ["the French language", "the baguette only"]],
    ["In 2022, UNESCO recognized the craft know-how of making…", "la baguette", ["le croissant", "la brioche", "le macaron"]],
    ["Who wrote « Le Guide culinaire » (1903) and modernized French cuisine?", "Auguste Escoffier", ["Paul Bocuse", "Alain Ducasse", "Louis Pasteur"]],
    ["What does the Michelin Guide give to top restaurants?", "stars (étoiles)", ["flags", "medals"]],
    ["What is « le goûter »?", "an afternoon snack", ["a late dinner", "a breakfast drink"]],
    ["A « plat du jour » is…", "the dish of the day", ["a plate you wash", "a Sunday cake"]],
    ["Which cheese dish is scraped onto potatoes?", "la raclette", ["la quiche", "le gratin"]]
  ];
  const FAM = [
    ["ouvrir", "l'ouverture"], ["arriver", "l'arrivée"], ["partir", "le départ"], ["changer", "le changement"], ["naître", "la naissance"], ["vendre", "la vente"], ["lire", "la lecture"],
    ["voler (to fly)", "le vol"], ["choisir", "le choix"], ["décider", "la décision"], ["aider", "l'aide"], ["entrer", "l'entrée"], ["réussir", "la réussite"], ["construire", "la construction"]
  ];
  const ANGL = [
    ["le footing", "jogging"], ["le smoking", "a tuxedo (dinner jacket)"], ["le baby-foot", "table football"], ["le parking", "a parking lot"], ["le pressing", "a dry cleaner's"], ["le zapping", "channel surfing"],
    ["le relooking", "a makeover"], ["le brushing", "a blow-dry"], ["le lifting", "a facelift"], ["un pin's", "a badge"], ["les tennis", "sneakers"]
  ];
  const READ26b = [
    { t: "Le tri des déchets s'est généralisé en France en vingt ans. Aujourd'hui, la plupart des habitants trient le verre et le papier. En revanche, les emballages en plastique restent souvent mal triés, car les règles changent d'une ville à l'autre.", qs: [
      ["Best summary:", "Sorting has become common, but plastic is still badly sorted because rules vary.", ["Nobody sorts waste in France.", "Glass and paper are forbidden in cities."]],
      ["Why is plastic badly sorted?", "Rules differ from town to town", ["It is too heavy", "It cannot be recycled at all"]],
      ["« En revanche » introduces…", "a contrast", ["a cause", "a conclusion"]]] },
    { t: "Le Festival d'Avignon, créé en 1947 par Jean Vilar, accueille chaque été des spectacles venus du monde entier. La ville se transforme alors en immense scène: on joue dans les cours, les églises et les rues.", qs: [
      ["Best summary:", "Every summer Avignon becomes a giant stage for world theatre, a tradition since 1947.", ["Avignon is a quiet town in summer.", "A theatre closed in 1947."]],
      ["Who created the festival?", "Jean Vilar", ["Molière", "Victor Hugo"]],
      ["Where are the shows performed?", "Courtyards, churches and streets as well as theatres", ["Only in one big hall", "Only on television"]]] },
    { t: "Beaucoup de jeunes Québécois étudient en anglais ou en français selon leur famille et leur quartier. Pourtant, la loi garantit que le français reste la langue officielle du Québec.", qs: [
      ["Main idea:", "Although practices vary, French is the official language of Québec.", ["English is the official language of Québec.", "Nobody studies French in Québec."]],
      ["« Pourtant » shows…", "a contrast", ["a time", "an example"]],
      ["What does the law guarantee?", "That French stays the official language", ["That English is banned", "That schools are free"]]] },
    { t: "Marie Curie, née en Pologne, a étudié à Paris. Elle a reçu deux prix Nobel, l'un de physique, l'autre de chimie. Elle reste un modèle de persévérance.", qs: [
      ["Best summary:", "A Polish-born scientist studied in Paris, won two Nobel Prizes and is a model of perseverance.", ["A French painter won a prize in Poland.", "A student failed her exams in Paris."]],
      ["In which two fields did she win Nobel Prizes?", "Physics and chemistry", ["Medicine and literature", "Peace and economics"]],
      ["What quality does the text link to her?", "Perseverance", ["Luck", "Wealth"]]] }
  ];
  const SUBJ = [
    ["Je pense qu'il ___ raison.", "a", ["ait", "aurait"]], ["Je ne pense pas qu'il ___ raison.", "ait", ["a", "avait"]], ["Il est possible qu'elle ___ en retard.", "soit", ["est", "sera"]],
    ["Il est certain qu'elle ___ en retard.", "est", ["soit", "serait"]], ["Bien qu'il ___ fatigué, il continue.", "soit", ["est", "sera"]], ["Je veux que tu ___ à l'heure.", "sois", ["es", "seras"]],
    ["Après qu'il ___ parti, nous avons mangé.", "est", ["soit", "était"]], ["Il faut que nous ___ ce livre avant demain.", "finissions", ["finirons", "finissons"]], ["Je doute qu'ils ___ la réponse.", "sachent", ["savent", "sauront"]],
    ["Elle cherche un hôtel qui ___ près de la gare.", "soit", ["est", "sera"]], ["C'est le plus beau film que j'___ jamais vu.", "aie", ["ai", "avais"]], ["Pourvu qu'il ___ beau demain !", "fasse", ["fait", "fera"]]
  ];
  const REL = [
    ["Le livre ___ je parle est sur la table.", "dont", ["que", "qui"]], ["La ville ___ je suis né est très belle.", "où", ["que", "dont"]], ["L'ami ___ j'ai invité vient de Dakar.", "que", ["qui", "dont"]],
    ["L'ami ___ habite à Dakar est médecin.", "qui", ["que", "dont"]], ["Le film ___ elle a besoin pour son cours est introuvable.", "dont", ["que", "où"]], ["La table sur ___ j'ai posé le vase est ancienne.", "laquelle", ["lequel", "lesquelles"]],
    ["Les amis avec ___ je voyage sont drôles.", "lesquels", ["lesquelles", "lequel"]], ["Ce ___ m'intéresse, c'est la musique.", "qui", ["que", "dont"]], ["Je ne comprends pas ce ___ tu veux dire.", "que", ["qui", "dont"]],
    ["Voici tout ce ___ j'ai besoin.", "dont", ["que", "qui"]], ["Le jour ___ nous sommes arrivés, il pleuvait.", "où", ["que", "dont"]], ["Les raisons pour ___ il est parti sont tristes.", "lesquelles", ["lesquels", "lequel"]]
  ];

  const L26 = [
    les("Analysing a text", vocab(B26.anal), tVocab(B26.anal)),
    les("The Enlightenment", mc(LUM, ["Think of the century: the 1700s, the age of reason, salons and the Encyclopédie.", "Each thinker is linked to one famous book or one idea: tolerance, separation of powers, the social contract, knowledge.", "Example: Beaumarchais wrote the comedy « Le Mariage de Figaro », and Buffon wrote about natural history. Now think about yours."], 2),
      tg("Les Lumières", "💡", "In the 18th century, writers fought ignorance and intolerance with reason. This was called <b>le siècle des Lumières</b>.", "Voltaire → tolérance<br>Montesquieu → séparation des pouvoirs<br>Rousseau → le Contrat social", "Three ideas that shaped modern democracy.", "Link every name to one book and one idea.")),
    les("The 19th century", mc(XIX, ["Think of the type of work: a novel, a collection of poems, a short story?", "Many writers belong to a movement: romantic poets, realist novelists, symbolist poets.", "Example: Alfred de Vigny wrote « La Mort du loup ». Now think about yours."], 2),
      tg("From Romanticism to Symbolism", "📜", "The 19th century gave French literature poets and novelists who still shape what we read.", "Hugo → romantisme<br>Flaubert → réalisme<br>Baudelaire → poésie moderne", "Three directions.", "Do not learn names alone: add a title for each.")),
    les("The 20th century", mc(XX, ["Think of the century: wars, new movements, experimental groups, prizes.", "Match each name to the movement or group it belongs to, and each work to its author.", "Example: Marguerite Yourcenar was the first woman elected to the Académie française, in 1980. Now think about yours."], 2),
      tg("Modern voices", "✍️", "The 20th century invented new ways of writing: surrealism, existentialism, the Oulipo, the Nouveau Roman.", "Breton → surréalisme<br>Camus → absurde<br>Perec → Oulipo", "Dreams, the absurd, constraints.", "A group name usually points to a single, simple idea.")),
    les("Francophone literature", mc(FLIT, ["Think of the country or region: Africa, the Caribbean, the Maghreb, Québec, Belgium?", "Match each work to its author. Many Francophone writers draw on their own region and history.", "Example: Ousmane Sembène was a Senegalese writer and filmmaker. Now think about yours."], 2),
      tg("Writers beyond France", "🌍", "French is a world literature: writers from Africa, the Caribbean, the Maghreb, Québec and Belgium shaped it.", "Bâ → Sénégal<br>Chamoiseau → Martinique<br>Roy → Québec", "Three regions, three voices.", "Link each author to a place first, then a book.")),
    les("Reading: literary prose", mc(readQ(READ25.slice(0, 0).concat([
      { t: "Quand Nadia ouvrit la lettre, ses mains tremblaient. Elle la lut deux fois, puis la posa sur la table et sourit. Elle était acceptée à l'université de Montréal.", qs: [
        ["Why do her hands tremble?", "She is nervous and emotional", ["She is cold", "She is angry"]],
        ["What does the letter say?", "She has been accepted to university", ["She has lost her job", "A trip is cancelled"]],
        ["Her smile shows…", "joy and relief", ["boredom", "fear"]]] },
      { t: "Le facteur s'arrêta devant la dernière maison du village. La porte était entrouverte; il hésita, puis frappa. Une petite voix répondit: « Entrez, je vous attendais. »", qs: [
        ["Who arrives at the house?", "The postman", ["A doctor", "A neighbour"]],
        ["Which words show he was unsure?", "« il hésita, puis frappa »", ["« la dernière maison »", "« une petite voix »"]],
        ["What is the effect of the last line?", "It creates mystery", ["It makes the scene funny", "It ends the story happily"]]] },
      { t: "— Papa, pourquoi la mer est-elle salée ? — Parce que les poissons y pleurent quand ils s'ennuient, répondit-il en riant. Mais, plus sérieusement, les rivières y apportent du sel depuis des millions d'années.", qs: [
        ["The father's first answer is…", "a joke", ["a scientific explanation", "a rule"]],
        ["His second answer is…", "a scientific explanation", ["another joke", "a lie"]],
        ["« Plus sérieusement » signals…", "a change from joke to serious", ["a question", "an ending"]]] },
      { t: "Dans le métro, Hugo remarqua un livre oublié sur un siège. Il le ramassa, lut la première page, et ne put plus s'arrêter. Il manqua son arrêt, puis le suivant.", qs: [
        ["What did Hugo find?", "A forgotten book", ["A lost phone", "A wallet"]],
        ["Why did he miss his stop?", "He was absorbed in reading", ["He fell asleep", "The train was late"]],
        ["The verb tense of « remarqua » is…", "the passé simple, a literary past tense", ["the future", "the imperative"]]] }
    ])), readH, 2), readT("Reading short stories", "A story shows feelings through actions and details. Notice small signs.", "Ask: what does the character do, what does it show, and how does the ending change the mood?")),
    les("Reading: opinions and arguments", mc(readQ(READ26a), readH, 2), readT("Reading an argument", "Opinion texts have a claim, a reason and sometimes a limit or a call to action.", "Find the claim first. Then find the connector that brings in a contrast (<i>or</i>, <i>cependant</i>, <i>pourtant</i>).")),
    les("Listening-style: announcements", listen(LIST26), lisT),
    les("Idioms with food", pq(FOOD, a => `What does « ${a} » mean?`, ["Do not picture the real food. The expression is a picture for a feeling or situation.", "Is it about energy, work, a surprise, or a mistake? Think of a situation where people might say it.", "Example: « mettre de l'eau dans son vin » means to moderate one's demands. Now think about yours."]),
      tg("Food in speech", "🥖", "Food gives French some of its most colorful idioms.", "avoir du pain sur la planche<br>c'est du gâteau", "A lot of work. Very easy.", "Learn each idiom as a whole phrase.")),
    les("Idioms with colors and numbers", pq(COLOR, a => `What does « ${a} » mean?`, ["Do not translate each color or number. The expression has a fixed meaning.", "Is it about feelings, time, effort or appearance? Think of the situation.", "Example: « être vert de rage » means to be furious. Now think about yours."]),
      tg("Colors and numbers", "🎨", "Colors and numbers appear in many fixed expressions. The meanings are not always logical.", "voir la vie en rose<br>en moins de deux", "Optimism. Very fast.", "Number idioms like « trente-six » just mean « a lot » or « many ».")),
    les("Québec French", pq(QUE, a => `In Québec French, what does « ${a} » mean?`, ["Think of the place: Québec has its own everyday words, and some are older French or local creations.", "Some Québec words differ from France's words even for meals and clothes.", "Example: « un breuvage » is a drink in Québec. Now think about yours."]),
      tg("Québécois words", "🍁", "French in Québec has its own words, some from old French, some created to avoid English.", "un courriel<br>magasiner", "An email. To shop.", "Meals differ: in Québec, déjeuner = breakfast, dîner = lunch, souper = dinner.")),
    les("Capitals of the Francophonie", typed(CAP.map(([c, a]) => [`Type the capital of <b>${c}</b>.`, a]), "Think of the French-speaking world: Africa, Europe, North America and the Middle East.", "Example: the capital of la France is 'Paris' and of la Hongrie is 'Budapest'. Now type yours. (Accents are optional.)"),
      [S("Francophone capitals", "🗺️", "French is an official language in dozens of countries. Each has its own capital."), S("Examples", "📍", "<b>Dakar</b> (le Sénégal)<br><b>Rabat</b> (le Maroc)<br><b>Bruxelles</b> (la Belgique)<br><b>Ottawa</b> (le Canada)"), S("Tip", "🧠", "Some spellings are French: Bruxelles, Berne, Alger, Beyrouth. Accents are optional here.")]),
    les("Food and regions", mc(GAST, ["Think of the region, city or tradition. French food is closely tied to place.", "Link each dish or cheese to its region, or each person to their field.", "Example: « la tarte tatin » comes from the Loire valley. Now think about yours."], 2),
      tg("Gastronomy", "🧀", "French cuisine is famous. Each region has its specialities, and the meal itself is part of the culture.", "Bretagne → crêpes<br>Alsace → choucroute", "Regions and dishes.", "Link a dish to a place and you will remember both.")),
    les("Word families", pq(FAM, a => `Which noun comes from the verb « ${a} »?`, ["Think of the common endings of nouns: -ure, -ment, -tion, -ée, -ance, or no ending at all.", "Some nouns come from the verb stem or the participle. Check which one sounds like a real French word.", "Example: « parler » gives « la parole » and « penser » gives « la pensée ». Now think about yours."]),
      tg("Verb to noun", "🔧", "Many French nouns come from verbs. The pattern varies.", "changer → le changement<br>réussir → la réussite", "Different suffixes.", "Learn the noun together with its article.")),
    les("English words in French", pq(ANGL, a => `In French, « ${a} » is used to mean…`, ["French has borrowed English words, but sometimes with a different meaning.", "Do not assume the English meaning. Some borrowed words changed their sense.", "Example: « un slip » means underpants, not a slip of paper. Now think about yours."]),
      tg("Borrowed words", "🔀", "French borrows many English words, but gives some of them new meanings.", "le smoking = tuxedo<br>le parking = parking lot", "Not « smoking ».", "Official language bodies often propose French alternatives, like « courriel ».")),
    les("Reading: finding the main idea", mc(readQ(READ26b), readH, 2), readT("Summary and main idea", "A summary keeps the main idea and drops the details.", "Ask: what is the text about, what does the writer say about it, and which sentence sums it up?")),
    les("Subjunctive or indicative?", mc(SUBJ, ["Is the first part a fact, or an opinion, doubt, wish or condition?", "Facts take the indicative. Doubt, wishes, concessions and negative opinions take the subjunctive. Look at the conjunction.", "Example: « Il faut que tu ___ (venir) » needs the subjunctive: viennes. Now think about yours."], 2),
      tg("Mood choice", "🎚️", "Choosing between <b>indicative</b> and <b>subjunctive</b> depends on the meaning before the blank.", "Je pense qu'il vient.<br>Je ne pense pas qu'il vienne.", "Opinion = indicative. Negative opinion = subjunctive.", "Tricky: après que takes the indicative, avant que the subjunctive.")),
    les("Relative pronouns", mc(REL, ["Look at what follows the blank: a subject, a verb, a preposition?", "Qui = subject. Que = object. Dont = de + something. Où = place or time. Lequel (and forms) follow a preposition.", "Example: « La femme ___ parle est ma tante » needs qui, because it is the subject. Now do yours."], 2),
      tg("Relative pronouns", "🔗", "A relative pronoun links two ideas and replaces a noun.", "L'homme qui chante<br>La ville où j'habite<br>Le livre dont je parle", "Subject, place, de + noun.", "Ask: what does the pronoun do in its own clause?"))
  ];
  L26.push(MIX("Mixed practice", L26.slice(0, 18), [L26[1], L26[8], L26[13]]));
  L26.push(MIX("Level 26 Challenge", L26.slice(0, 18), [L26[4], L26[10], L26[16]]));

  // =====================================================  LEVEL 27
  const B27 = {
    ling: BK("Linguistics words", [["le phonème", "smallest sound unit"], ["le morphème", "smallest unit of meaning"], ["la syntaxe", "sentence structure"], ["la sémantique", "study of meaning"], ["le lexique", "vocabulary of a language"], ["le dialecte", "regional variety of a language"], ["l'étymologie", "origin of a word"], ["le néologisme", "newly created word"], ["l'emprunt", "loanword"], ["la polysémie", "a word having several meanings"], ["l'homonyme", "word with the same sound or spelling as another"], ["le calque", "word-for-word copy of a foreign expression"], ["la phonétique", "study of speech sounds"], ["la locution", "set phrase"]], { tip: "<b>Un calque</b> copies the structure of another language (« fin de semaine » from « weekend » is debated). <b>Un emprunt</b> takes the word itself." })
  };
  const MEDI = [
    ["Which epic poem tells of Charlemagne's rear guard and the hero Roland?", "La Chanson de Roland", ["Le Roman de Renart", "Les Contes de Perrault", "La Princesse de Clèves"]],
    ["Which 15th-century poet wrote the « Testament » and the « Ballade des pendus »?", "François Villon", ["Pierre de Ronsard", "Joachim du Bellay", "Clément Marot"]],
    ["Who wrote the comic adventures of the giants Gargantua and Pantagruel?", "Rabelais", ["Montaigne", "Ronsard", "Villon"]],
    ["Who wrote the « Essais », a new kind of personal writing?", "Montaigne", ["Rabelais", "Pascal", "Descartes"]],
    ["Which group of 16th-century poets, with Ronsard and Du Bellay, wanted to enrich French?", "La Pléiade", ["L'Oulipo", "Les Parnassiens", "Les Surréalistes"]],
    ["Which medieval writer told the stories of Lancelot and Perceval?", "Chrétien de Troyes", ["Christine de Pizan", "François Villon", "Jean de La Fontaine"]],
    ["Which legend tells of two lovers separated by duty and a magic potion?", "Tristan et Iseut", ["Roméo et Juliette", "Cyrano de Bergerac", "Le Cid"]],
    ["Which writer, one of the first women to live by her pen, wrote « La Cité des dames »?", "Christine de Pizan", ["Marguerite de Navarre", "Madame de Sévigné", "George Sand"]],
    ["What did Du Bellay defend in his « Défense et illustration de la langue française » (1549)?", "The value of French compared with Latin", ["The use of Latin in schools", "A ban on poetry"]],
    ["Which queen of Navarre wrote the short-story collection « L'Heptaméron »?", "Marguerite de Navarre", ["Christine de Pizan", "Madame de La Fayette", "Catherine de Médicis"]],
    ["Which French king invited Leonardo da Vinci to France and supported the arts?", "François Ier", ["Louis XIV", "Charlemagne", "Napoléon"]]
  ];
  const CLAS = [
    ["Which king, called the Roi-Soleil, ruled while classical theatre flourished?", "Louis XIV", ["Louis XVI", "François Ier", "Napoléon"]],
    ["Which cardinal founded the Académie française in 1635?", "Richelieu", ["Mazarin", "Colbert", "Talleyrand"]],
    ["Which philosopher wrote « Je pense, donc je suis »?", "Descartes", ["Pascal", "Montaigne", "Voltaire"]],
    ["Which writer left the fragments called « Pensées »?", "Pascal", ["Descartes", "La Bruyère", "Boileau"]],
    ["Which 1678 novel is often called the first French psychological novel?", "La Princesse de Clèves", ["Madame Bovary", "Candide", "Gargantua"]],
    ["Who is famous for her lively letters to her daughter?", "Madame de Sévigné", ["Madame de Staël", "George Sand", "Colette"]],
    ["Which tragedy in verse did Racine write?", "Andromaque", ["Le Cid", "Le Tartuffe", "Cyrano de Bergerac"]],
    ["Which comedy by Molière mocks a false religious man?", "Le Tartuffe", ["Phèdre", "Andromaque", "Le Cid"]],
    ["The unities of time, place and action are rules of…", "classical theatre", ["romantic poetry", "the Nouveau Roman", "modern cinema"]],
    ["Which author used animals in verse fables to teach lessons?", "La Fontaine", ["Boileau", "Corneille", "Perrault"]],
    ["Which poet and critic wrote « L'Art poétique » (1674)?", "Boileau", ["Racine", "Pascal", "La Fontaine"]],
    ["Which palace became the centre of Louis XIV's court?", "Versailles", ["Fontainebleau", "Chambord", "Le Louvre"]]
  ];
  const HIST = [
    ["Which language is the main ancestor of French?", "Latin", ["Greek", "Gaulish", "Arabic"]],
    ["Which Celtic language was spoken in Gaul before the Romans?", "Gaulish", ["Basque", "Latin", "Frankish"]],
    ["Which Germanic people gave their name to France?", "the Franks", ["the Normans", "the Gauls", "the Romans"]],
    ["The Serments de Strasbourg (842) are among the oldest texts in…", "an early form of French", ["Latin", "Old English"]],
    ["In the Middle Ages, the « langue d'oïl » was spoken in…", "the north", ["the south", "Britain only"]],
    ["The « langue d'oc » (Occitan) was spoken in…", "the south", ["the north", "Paris only"]],
    ["Which institution publishes a dictionary and guards the language?", "L'Académie française", ["La Sorbonne", "Le Conseil d'État", "Le Collège de France"]],
    ["The 1539 ordonnance of Villers-Cotterêts required which language in legal documents?", "French", ["Latin", "Occitan"]],
    ["A word taken from another language, such as « week-end », is called…", "un emprunt", ["un calque", "un dialecte"]],
    ["The Norman Conquest of 1066 brought many French words into…", "English", ["German", "Spanish"]],
    ["Which French word comes from Latin « aqua »?", "eau", ["feu", "terre"]],
    ["Which French word comes from Latin « cantare »?", "chanter", ["danser", "manger"]]
  ];
  const READ27a = [
    { t: "Selon un linguiste, une langue vivante change toujours: elle perd des mots, en emprunte d'autres et modifie sa prononciation. Vouloir la figer, dit-il, revient à vouloir arrêter une rivière.", qs: [
      ["What is the linguist's view?", "A living language always changes", ["A language should never change", "Only dead languages change"]],
      ["What does the river image suggest?", "Stopping change is impossible", ["Language flows from the sea", "Rivers are dangerous"]],
      ["Which is NOT a change mentioned?", "Inventing new alphabets", ["Losing words", "Borrowing words"]]] },
    { t: "Dans certaines familles de Louisiane, le français se transmet à la maison depuis des générations. Les écoles d'immersion aident aujourd'hui les enfants à le parler aussi dehors.", qs: [
      ["How is the language passed on?", "At home, within families", ["Only in universities", "Only on television"]],
      ["What do immersion schools do?", "Help children use French outside the home", ["Replace French with English", "Teach only writing"]],
      ["The tone of the text is…", "hopeful", ["angry", "mocking"]]] },
    { t: "Le mot « courriel » a été proposé au Québec pour remplacer « e-mail ». En France, « mél » ou « e-mail » sont plus courants. Chaque pays francophone fait donc ses propres choix.", qs: [
      ["Where was « courriel » proposed?", "In Québec", ["In Belgium", "In Switzerland"]],
      ["Main idea:", "Francophone countries make their own word choices", ["All countries use the same words", "English words are banned"]],
      ["What is more common in France, according to the text?", "« mél » or « e-mail »", ["« clavarder »", "« dépanneur »"]]] },
    { t: "L'argot, qui était d'abord le langage secret de certains groupes, enrichit aujourd'hui le français de tous les jours. Le verlan, qui inverse les syllabes, en est un exemple: « meuf » vient de « femme ».", qs: [
      ["What is verlan?", "A way of speaking that reverses syllables", ["A kind of poem", "A regional accent"]],
      ["« Meuf » comes from…", "femme", ["fille", "mère"]],
      ["Argot was first…", "a secret language of certain groups", ["a language of the court", "a Latin dialect"]]] }
  ];
  const READ27b = [
    { t: "Le soir tombait sur le port. Les pêcheurs rangeaient leurs filets en silence, et seul le cri des mouettes rompait le calme. Anaïs, assise sur un cordage, attendait le bateau de son père.", qs: [
      ["What time of day is it?", "Evening", ["Morning", "Noon"]],
      ["What breaks the silence?", "The cry of the seagulls", ["The fishermen's songs", "A church bell"]],
      ["What is Anaïs doing?", "Waiting for her father's boat", ["Mending a net", "Selling fish"]]] },
    { t: "« Je n'y retournerai jamais », avait-elle juré. Pourtant, quelques années plus tard, elle se retrouva devant la vieille maison, la clé à la main, incapable de dire pourquoi elle était revenue.", qs: [
      ["What had she promised?", "Never to go back", ["To write every year", "To sell the house"]],
      ["« Pourtant » shows that…", "she did not keep her promise", ["she was invited", "she forgot the key"]],
      ["Her mood is…", "hesitant, with mixed feelings", ["cheerful", "furious"]]] },
    { t: "Le professeur posa sa craie. « Comprendre un poème, dit-il, ce n'est pas le traduire en phrases simples; c'est écouter ce qu'il fait avec les mots. »", qs: [
      ["What does the teacher say about understanding a poem?", "Listen to what it does with words", ["Rewrite it in simple sentences", "Learn it by heart"]],
      ["What kind of text is this?", "A short scene with dialogue about literature", ["A recipe", "A news report"]],
      ["What does the verb « posa » show?", "He stops writing to make a point", ["He is leaving the room", "He is angry"]]] },
    { t: "Il y avait, dans la ville de mon enfance, une librairie minuscule où l'odeur du papier remplaçait toute conversation. J'y ai appris que le silence, lui aussi, peut être une forme d'amitié.", qs: [
      ["Who is speaking?", "An adult remembering childhood", ["A child today", "A bookseller"]],
      ["What fills the bookstore?", "The smell of paper", ["Loud music", "Many customers"]],
      ["The last sentence suggests that…", "silence can be a kind of friendship", ["friends should speak more", "the bookstore is closing"]]] }
  ];
  const READ27c = [
    { t: "Cours FRA 201 : Introduction aux littératures francophones. Lectures obligatoires : trois romans et un recueil de poèmes. Évaluation : un exposé oral (30 %), une dissertation (40 %), un examen final (30 %).", qs: [
      ["How many novels are required?", "Three", ["One", "Four"]],
      ["Which task counts the most?", "The essay (dissertation), 40 %", ["The oral presentation", "The final exam"]],
      ["How much is the oral presentation worth?", "30 %", ["40 %", "10 %"]]] },
    { t: "Les étudiants de première année sont invités à une réunion d'information le mardi 4 septembre à 14 h, dans l'amphithéâtre B. La présence est vivement conseillée mais non obligatoire.", qs: [
      ["Where is the meeting?", "In lecture hall B", ["In the library", "In the cafeteria"]],
      ["Is attendance required?", "No, but it is strongly advised", ["Yes, always", "No, and it is discouraged"]],
      ["Who is invited?", "First-year students", ["Teachers only", "All graduates"]]] },
    { t: "Résumé: cet article examine l'influence de la musique sur la mémoire des élèves. Les résultats suggèrent que l'écoute d'airs familiers facilite la mémorisation de listes de mots, sans pour autant remplacer la révision.", qs: [
      ["What is the topic?", "Music and students' memory", ["Sports and sleep", "Reading and eyesight"]],
      ["What do the results suggest?", "Familiar tunes help memorize word lists", ["Music harms memory", "Music has no effect at all"]],
      ["What limit does the text give?", "Music does not replace revision", ["Music is too expensive", "Music works only for adults"]]] },
    { t: "La bibliothèque universitaire prête jusqu'à dix livres pour trois semaines. En cas de retard, une pénalité de 0,50 € par jour est appliquée. Les ouvrages peuvent être prolongés une fois en ligne.", qs: [
      ["How many books can you borrow?", "Up to ten", ["Up to three", "Up to thirty"]],
      ["What is the late fee?", "0.50 € per day", ["5 € per week", "No fee"]],
      ["How often can a book be renewed online?", "Once", ["Never", "Three times"]]] }
  ];
  const LIST27 = [
    ["Bonjour à tous. Le cours de ce matin est déplacé en salle trois cent douze. Merci de vous y rendre directement.", "Where is the class today?", "Room 312", ["Room 212", "Room 321"]],
    ["Votre dissertation est à rendre avant le quinze novembre, à minuit, sur la plateforme du cours.", "When is the essay due?", "November 15, at midnight", ["November 5, at midnight", "November 15, at noon"]],
    ["Pour l'examen, vous aurez droit à un dictionnaire papier, mais pas de téléphone.", "What may you bring to the exam?", "A paper dictionary", ["A phone", "A laptop"]],
    ["La conférence de la professeure Diallo portera sur la poésie d'Afrique de l'Ouest et aura lieu jeudi à seize heures.", "What is the lecture about?", "West African poetry", ["Caribbean cinema", "Québec history"]],
    ["Le restaurant universitaire propose aujourd'hui un menu végétarien à trois euros cinquante.", "How much is the vegetarian menu?", "€3.50", ["€2.50", "€5.30"]],
    ["Nous cherchons des étudiants volontaires pour accueillir les nouveaux étudiants étrangers à la gare, samedi matin.", "What will the volunteers do?", "Welcome new international students at the station", ["Teach French classes", "Clean the campus"]],
    ["Attention, la ligne de bus numéro neuf est déviée jusqu'à vendredi à cause de travaux.", "Why is bus line 9 diverted?", "Because of roadworks", ["Because of snow", "Because of a festival"]],
    ["Merci d'écrire à votre professeur avant d'envoyer un courriel groupé. Utilisez toujours une formule de politesse.", "What should students always use in emails?", "A polite closing formula", ["Emoji", "Only first names"]],
    ["Pour vous inscrire au club de théâtre, présentez-vous au bureau des étudiants avec une pièce d'identité.", "What must you bring to sign up?", "An ID", ["A script", "A photo of yourself"]],
    ["Les cours reprendront normalement lundi prochain, après la semaine de relâche.", "When do classes resume?", "Next Monday, after reading week", ["This Friday", "In two weeks"]]
  ];
  const REP = [
    ["What is the motto of the French Republic?", "Liberté, Égalité, Fraternité", ["Dieu et mon droit", "Unité, Travail, Progrès"]],
    ["What does the 14th of July celebrate?", "The French national holiday, linked to the Bastille in 1789", ["The end of a world war", "The founding of the Académie"]],
    ["Which song is the French national anthem?", "La Marseillaise", ["Le Chant des partisans", "La Vie en rose"]],
    ["Who is Marianne?", "The symbol of the French Republic", ["A queen of France", "A character of Molière"]],
    ["What does « laïcité » mean?", "Neutrality of the State toward religion", ["A state religion", "A national holiday"]],
    ["Which law of 1905 separated churches and State?", "La loi de 1905", ["Le Code civil", "La Constitution de 1958"]],
    ["Which emperor created the Code civil in 1804?", "Napoléon Ier", ["Louis XIV", "Charlemagne"]],
    ["In what year did the Cinquième République begin?", "1958", ["1789", "1870"]],
    ["What was « Mai 68 »?", "A wave of student and worker protests", ["A royal wedding", "A world fair"]],
    ["Which two chambers form the French Parliament?", "L'Assemblée nationale and le Sénat", ["Le Conseil d'État and la Cour des comptes", "La mairie and la préfecture"]],
    ["What is the French president's term of office?", "Five years", ["Seven years", "Ten years"]],
    ["In 1944, French women gained…", "the right to vote", ["the right to drive", "the right to own a bank"]],
    ["Where does the French president work?", "Le palais de l'Élysée", ["Le palais de Versailles", "Le Louvre"]]
  ];
  const FH = [
    ["Who founded Québec City in 1608?", "Samuel de Champlain", ["Jacques Cartier", "Louis Joliet", "René Descartes"]],
    ["Which navigator claimed the Canadian shores for France in 1534?", "Jacques Cartier", ["Samuel de Champlain", "Christophe Colomb"]],
    ["Which period of the 1960s modernized Québec society?", "la Révolution tranquille", ["le Grand Dérangement", "la Belle Époque"]],
    ["What did the « Charte de la langue française » (Loi 101, 1977) make official in Québec?", "French", ["English", "Bilingualism everywhere"]],
    ["In what year did Haiti become independent?", "1804", ["1789", "1962"]],
    ["Haiti is known as the first independent…", "Black republic", ["colony of Spain", "kingdom in Africa"]],
    ["What happened to Louisiana in 1803?", "France sold it to the United States", ["It became a French republic", "Spain bought it back"]],
    ["Which country became independent from France in 1962 after a long war?", "l'Algérie", ["le Sénégal", "la Belgique"]],
    ["In what year did Senegal gain independence?", "1960", ["1830", "1914"]],
    ["In what year did Belgium become independent?", "1830", ["1960", "1789"]],
    ["How many national languages does Switzerland have?", "Four", ["Two", "Six"]],
    ["What does OIF stand for?", "Organisation internationale de la Francophonie", ["Office international du français", "Ordre impérial des francophones"]],
    ["Which Canadian province is officially bilingual?", "le Nouveau-Brunswick", ["le Québec", "l'Alberta"]],
    ["Which people, deported from Acadie in 1755, partly settled in Louisiana?", "les Acadiens (Cajuns)", ["les Normands", "les Bretons"]]
  ];
  const SCHL = [
    ["sécher un cours", "to skip a class"], ["bûcher", "to study hard, to cram"], ["avoir la bosse des maths", "to have a gift for math"], ["mettre les points sur les i", "to spell things out clearly"],
    ["passer l'éponge", "to forgive and forget"], ["avoir un coup de barre", "to suddenly feel exhausted"], ["faire le point", "to take stock of the situation"], ["ne pas y aller par quatre chemins", "to get straight to the point"],
    ["prendre le taureau par les cornes", "to tackle a problem head on"], ["se creuser la tête", "to rack one's brain"], ["avoir le trac", "to have stage fright"], ["être à la bourre", "to be running late"], ["décrocher un diplôme", "to get a degree"]
  ];
  const PROV = [
    ["Petit à petit, l'oiseau fait son nid.", "Patience and steady effort bring results."], ["Qui sème le vent récolte la tempête.", "Bad actions bring even worse consequences."], ["L'habit ne fait pas le moine.", "Appearances can be misleading."],
    ["Chat échaudé craint l'eau froide.", "A bad experience makes you cautious."], ["Les chiens aboient, la caravane passe.", "Ignore critics and keep going."], ["Rien ne sert de courir, il faut partir à point.", "Plan and start in time rather than rush."],
    ["Il n'y a pas de fumée sans feu.", "Rumours usually have some cause."], ["La nuit porte conseil.", "Sleep on it before deciding."], ["Les petits ruisseaux font les grandes rivières.", "Small things add up."],
    ["Tout vient à point à qui sait attendre.", "Good things come to those who wait."], ["À l'impossible nul n'est tenu.", "No one can be forced to do the impossible."], ["L'union fait la force.", "Together we are stronger."]
  ];
  const LITS = [
    ["Il fallait que je parte.", "I had to leave.", ["I wanted to stay.", "I will have to leave."]], ["Qu'il vienne, et nous verrons.", "Let him come, and we will see.", ["He came, and we saw.", "He is coming, so we are leaving."]],
    ["Ne serait-ce que pour un instant.", "If only for a moment.", ["Not even for a moment.", "It will not be a moment."]], ["Ce n'est pas faute d'avoir essayé.", "It is not for lack of trying.", ["It is the fault of trying.", "It is not worth trying."]],
    ["Il n'a de cesse de se plaindre.", "He never stops complaining.", ["He has no reason to complain.", "He ceased to complain."]], ["Elle ne fait que parler.", "She does nothing but talk.", ["She never talks.", "She can only talk once."]],
    ["À peine était-il arrivé qu'il repartit.", "He had barely arrived when he left again.", ["He arrived painfully.", "He arrived after he left."]], ["Tant bien que mal, ils ont fini.", "Somehow or other, they finished.", ["Well and badly, they began.", "They finished both good and bad."]],
    ["Peu s'en faut.", "Very nearly.", ["Very little is needed.", "A little is missing."]], ["Soit dit en passant.", "By the way.", ["Let it be said in passing out.", "Be said while passing."]], ["Autant dire qu'il a perdu.", "One might as well say he lost.", ["As much as he lost.", "As many as he said."]]
  ];
  const EN2FR2 = [
    ["I have been waiting for two hours.", "J'attends depuis deux heures.", ["J'ai attendu pour deux heures.", "J'attends il y a deux heures."]], ["She had her car repaired.", "Elle a fait réparer sa voiture.", ["Elle a eu réparé sa voiture.", "Elle a fait réparée sa voiture."]],
    ["I am used to getting up early.", "J'ai l'habitude de me lever tôt.", ["Je suis utilisé à me lever tôt.", "Je suis habitude de me lever tôt."]], ["It is important that you come.", "Il est important que tu viennes.", ["Il est important que tu viens.", "Il est important de tu viennes."]],
    ["He does not know what to do.", "Il ne sait pas quoi faire.", ["Il ne sait pas ce faire.", "Il ne sait quoi à faire."]], ["The more I read, the more I learn.", "Plus je lis, plus j'apprends.", ["Le plus je lis, le plus j'apprends.", "Plus que je lis, plus que j'apprends."]],
    ["I wish you a good trip.", "Je te souhaite un bon voyage.", ["Je souhaite toi un bon voyage.", "Je te veux un bon voyage à toi."]], ["Both of them are tired.", "Tous les deux sont fatigués.", ["Tout les deux sont fatigués.", "Tous les deux est fatigués."]],
    ["I do not feel like going out.", "Je n'ai pas envie de sortir.", ["Je ne sens pas comme sortir.", "Je n'aime pas sortir envie."]], ["My grandparents live far from here.", "Mes grands-parents habitent loin d'ici.", ["Mes grands-parents habitent loin de ici.", "Mes grands-parents habitent longtemps d'ici."]]
  ];
  const ACAD = [
    ["force est de constater que", "one must admit that"], ["dans la mesure où", "insofar as, given that"], ["à cet égard", "in this respect"], ["quant à", "as for"], ["or (as a connector)", "now, yet (introduces a turn in the argument)"],
    ["d'une part… d'autre part", "on the one hand… on the other hand"], ["en l'occurrence", "in this case"], ["il s'agit de", "it is a question of"], ["à savoir", "namely"], ["c'est-à-dire", "that is to say"],
    ["en somme", "in short"], ["en revanche", "on the other hand, however"], ["néanmoins", "nevertheless"], ["d'ailleurs", "besides, by the way"]
  ];
  const INST = [
    ["How many members (« immortels ») sit in the Académie française?", "40", ["12", "100"]],
    ["What is the « baccalauréat »?", "The exam at the end of lycée, giving access to university", ["A cooking diploma", "A driving permit"]],
    ["What are the « grandes écoles »?", "Highly selective higher-education schools", ["Nursery schools", "Evening classes"]],
    ["Which famous Paris university dates back to the 13th century?", "la Sorbonne", ["le Louvre", "l'Opéra"]],
    ["Which Paris building honors great figures like Voltaire and Marie Curie?", "le Panthéon", ["la Bourse", "le Grand Palais"]],
    ["Which former palace now houses the Mona Lisa?", "le Louvre", ["le Panthéon", "Versailles"]],
    ["What does the « Conseil constitutionnel » check?", "That laws agree with the Constitution", ["The weather forecast", "School exams"]],
    ["What is a « préfet »?", "The State's representative in a département", ["A school director", "A mayor's assistant"]],
    ["How many régions does metropolitan France have (since 2016)?", "13", ["9", "22"]],
    ["What is the SNCF?", "The national railway company", ["The national radio", "The tax office"]],
    ["What is « la Sécurité sociale »?", "The national health and welfare insurance system", ["A police force", "A bank"]]
  ];
  const COND = [
    ["Si j'avais plus de temps, je ___ plus souvent.", "lirais", ["lis", "lirai"]], ["S'il avait étudié, il ___ l'examen.", "aurait réussi", ["réussirait", "a réussi"]], ["Si tu viens demain, nous ___ au musée.", "irons", ["irions", "serions allés"]],
    ["Je ne ___ pas ça à ta place.", "ferais", ["fais", "ferai"]], ["Tu ___ m'aider, s'il te plaît ?", "pourrais", ["pourras", "pouvais"]], ["Si elle ___ plus tôt, elle aurait vu le début.", "était arrivée", ["arrivait", "serait arrivée"]],
    ["Au cas où il ___, prends ton parapluie.", "pleuvrait", ["pleut", "pleuvra"]], ["Même si tu ___ riche, tu ne serais pas heureux.", "étais", ["es", "serais"]], ["Il a dit qu'il ___ le lendemain.", "viendrait", ["viendra", "vient"]],
    ["Elle a promis qu'elle nous ___ dès son arrivée.", "appellerait", ["appellera", "appelle"]], ["À ta place, j'___ plus tôt.", "aurais commencé", ["avais commencé", "ai commencé"]], ["Si seulement je ___ la réponse !", "connaissais", ["connais", "connaîtrai"]]
  ];
  const CORR = [
    ["Elle s'est lavé les mains.", ["Elle s'est lavée les mains.", "Elle s'a lavé les mains."]], ["Les lettres que j'ai écrites sont parties.", ["Les lettres que j'ai écrit sont parties.", "Les lettres que j'ai écrits sont parties."]],
    ["Elles se sont téléphoné.", ["Elles se sont téléphonées.", "Elles se sont téléphoner."]], ["Ils sont allés à Lyon.", ["Ils ont allé à Lyon.", "Ils sont allé à Lyon."]],
    ["Je voudrais que tu viennes.", ["Je voudrais que tu viens.", "Je voudrais que tu viendras."]], ["Bien qu'il pleuve, nous sortons.", ["Bien qu'il pleut, nous sortons.", "Bien qu'il pleuvra, nous sortons."]],
    ["Les enfants que j'ai vus jouer riaient.", ["Les enfants que j'ai vu jouer riaient.", "Les enfants que j'ai vues jouer riaient."]], ["Je regrette qu'il ne soit pas venu.", ["Je regrette qu'il n'est pas venu.", "Je regrette qu'il ne sera pas venu."]],
    ["Elle est partie sans que je la voie.", ["Elle est partie sans que je la vois.", "Elle est partie sans que je la verrai."]], ["Quels livres as-tu lus ?", ["Quels livres as-tu lu ?", "Quels livres as-tu lue ?"]], ["Voici la maison dont je t'ai parlé.", ["Voici la maison que je t'ai parlé.", "Voici la maison où je t'ai parlé."]]
  ];
  const corrQ = () => {
    const [ok, wr] = pick(CORR);
    return { text: "Which sentence is <b>correct</b>?", choices: shuf([ok, ...wr]), answer: ok, hints: ["Read each sentence slowly. Look at the verb endings and the small words.", "Check agreement of the participle, the mood after the conjunction, and the right relative pronoun.", "Example: « Les fleurs qu'elle a cueillies » needs -ies because the object comes before the verb. Now compare your three choices."] };
  };

  const L27 = [
    les("Medieval and Renaissance writers", mc(MEDI, ["Think of the period: the Middle Ages (epics, courtly tales) or the Renaissance (humanism, new poetry).", "Match each title or idea to the period it belongs to, then to its author.", "Example: Ronsard's friend Marot wrote epigrams for the court. Now think about yours."], 2),
      tg("From Roland to Montaigne", "🏰", "French literature starts with epics and love stories, then the Renaissance brings humanism and new poetry.", "Chanson de Roland → Moyen Âge<br>Rabelais, Montaigne → Renaissance", "Two great periods.", "Link each author to a book: Rabelais (Gargantua), Montaigne (Essais).")),
    les("The Grand Siècle", mc(CLAS, ["Think of the 17th century and Louis XIV: theatre, philosophy, letters and fables.", "Match each work with its author and the genre: tragedy, comedy, fable, novel, essay.", "Example: Corneille wrote « Horace » and « Cinna ». Now think about yours."], 2),
      tg("The classical age", "👑", "In the 17th century, order, reason and good taste ruled in the arts.", "Racine → tragedy<br>Molière → comedy<br>La Fontaine → fables", "Three genres.", "The three unities (time, place, action) are the rules of classical theatre.")),
    les("How French developed", mc(HIST, ["Think about the history of the language, from its earliest roots and peoples to its first official texts.", "Each answer fits a time and a place in that story: roots, peoples, regions, institutions, borrowings.", "Example: the Vikings settled in Normandy and left a few words about the sea. Now think about yours."], 2),
      tg("A language with a history", "📜", "French comes mainly from spoken Latin. Gaulish and Frankish added words and sounds.", "Latin → ancien français → français moderne", "Over a thousand years.", "In 1539 the ordonnance de Villers-Cotterêts made French the legal language.")),
    les("Linguistics words", vocab(B27.ling), tVocab(B27.ling)),
    les("Reading: about language", mc(readQ(READ27a), readH, 2), readT("Reading about language", "Texts about language often use examples and images.", "Find the writer's main idea, then see which examples support it.")),
    les("Reading: scenes and memories", mc(readQ(READ27b), readH, 2), readT("Reading literary scenes", "A scene paints a picture with small details.", "Ask what each detail shows about the characters or the mood.")),
    les("Reading: university texts", mc(readQ(READ27c), readH, 2), readT("Reading college documents", "Syllabi, notices and library rules use numbers, dates and conditions.", "Underline numbers, dates and words like <i>obligatoire</i>, <i>conseillé</i> and <i>sauf</i>.")),
    les("Listening-style: campus notices", listen(LIST27), lisT),
    les("Republic and institutions", mc(REP, ["Think about French civic life: symbols, laws, parliament and the president.", "Match each symbol or law with its role or its date.", "Example: the French flag has three vertical bands: blue, white and red. Now think about yours."], 2),
      tg("French civic culture", "🇫🇷", "France is a republic with its own symbols, its own principle of laïcité and its own institutions.", "Liberté, Égalité, Fraternité<br>La Marseillaise<br>Marianne", "Motto, anthem and symbol.", "Learn each symbol with one date or event.")),
    les("The Francophone world: history", mc(FH, ["Think of the region: North America, the Caribbean, Africa, Europe.", "Match each date and event with its place. Independence dates differ from country to country.", "Example: Vietnam and Laos were French colonies in Indochina. Now think about yours."], 2),
      tg("French around the world", "🌐", "The history of French is also a history of exploration, colonization, independence and migration.", "Québec 1608<br>Haïti 1804<br>Sénégal 1960", "Three places, three moments.", "Francophone does not mean French: each country has its own story.")),
    les("Idioms for school and work", pq(SCHL, a => `What does « ${a} » mean?`, ["Do not translate word by word. Think of a school or work situation.", "Is it about effort, honesty, timing or tiredness? Picture a student or worker saying it.", "Example: « avoir du pain sur la planche » means to have a lot of work. Now think about yours."]),
      tg("Student and work speech", "🎓", "Daily life in college and at work is full of idioms.", "sécher un cours<br>faire le point", "Skip a class. Take stock.", "Many of these are familiar: avoid them in formal writing.")),
    les("Proverbs and what they teach", pq(PROV, a => `What does the proverb « ${a} » teach?`, ["A proverb gives a general lesson through a picture. Do not take it literally.", "Is it about patience, caution, appearances or teamwork?", "Example: « Après la pluie, le beau temps » means hard times end. Now think about yours."]),
      tg("Wisdom in a sentence", "💭", "French proverbs give short lessons about life.", "L'union fait la force.<br>La nuit porte conseil.", "Together we are stronger. Sleep on it.", "Learn the lesson, not the exact words.")),
    les("Literary and formal structures", mc(LITS.map(([f, a, w]) => [`What does this mean? « ${f} »`, a, w]), ["These are formal or literary structures. Do not translate word by word.", "Look for fixed expressions: a subjunctive of order, an inverted subject, or a set phrase.", "Example: « Pour peu que tu le veuilles » means if you merely want to. Now think about yours."], 2),
      tg("Written French", "🖋️", "Written and literary French uses fixed structures that look strange in English.", "À peine… que…<br>ne… que…", "Hardly… when…. Only.", "Learn each structure as a block and recognize it when you read.")),
    les("Translate into French, round 2", mc(EN2FR2.map(([e, a, w]) => [`Which is the best French for: "${e}"`, a, w]), ["Do not translate word by word. Find the French structure.", "Check the tense, the preposition and the expression. English and French do not match word for word.", "Example: « the sooner the better » is « le plus tôt sera le mieux ». Now translate yours."], 2),
      tg("More structures", "🔄", "Some structures need a different pattern in French.", "faire + infinitive<br>depuis + present<br>Plus… plus…", "Have something done. For. The more… the more.", "Check how French expresses duration and causes.")),
    les("Academic connectors", pq(ACAD, a => `What does « ${a} » mean?`, ["Think about the role of the phrase in an argument: adding, contrasting, concluding or specifying?", "Academic connectors guide the reader. Match the function to the English meaning.", "Example: « en outre » means moreover. Now think about yours."]),
      tg("Academic writing", "📝", "College essays use connectors to guide the reader.", "force est de constater que…<br>d'une part… d'autre part…", "One must admit that. On the one hand… on the other.", "Use each connector in a sentence of your own to remember it.")),
    les("Culture: institutions and society", mc(INST, ["Think of the institution: school, State, health, transport, culture.", "Link each institution to its role. Many have acronyms or nicknames.", "Example: « la Poste » is the national postal service. Now think about yours."], 2),
      tg("French institutions", "🏛️", "Studying in French means knowing how France is organized.", "le baccalauréat<br>les grandes écoles<br>la Sécurité sociale", "School, higher education, health.", "Learn the acronym and the role together.")),
    les("Conditional and if-clauses", mc(COND, ["Look at the tense in the other part of the sentence. Is the condition real, imagined or already past?", "If + imparfait → conditional. If + plus-que-parfait → past conditional. If + present → future. Reported future in the past → conditional.", "Example: « Si j'avais le temps, je voyagerais » uses imparfait + conditional. Now do yours."], 2),
      tg("If and the conditional", "🌗", "The tense after <b>si</b> and the tense in the main clause go together.", "Si tu viens, nous partirons.<br>Si tu venais, nous partirions.", "Real. Imagined.", "Never use the conditional right after <i>si</i>.")),
    les("Spot the correct sentence", corrQ,
      tg("Check your French", "🔍", "Good writers proofread for agreement, mood and pronouns.", "Les lettres que j'ai écrites<br>Bien qu'il pleuve", "Participle agreement. Subjunctive.", "Ask three questions: agreement? mood? pronoun?"))
  ];
  L27.push(MIX("Mixed practice", L27.slice(0, 18), [L27[1], L27[9], L27[14]]));
  L27.push(MIX("Level 27 Challenge", L27.slice(0, 18), [L27[2], L27[10], L27[16]]));

  Object.assign(FRENCH_LEVELS, { 25: L25, 26: L26, 27: L27 });
})();
