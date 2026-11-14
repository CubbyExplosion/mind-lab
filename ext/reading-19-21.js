// Mind Lab Reading, levels 19-21 (9th grade, 10th grade first half). 20 lessons each.
(() => {
  const T = (h, v, t) => ({ h, v, t });
  const rest = (arr, x, n) => shuf(arr.filter(y => y !== x)).slice(0, n);
  const mkL = (title, make, slides) => { make.teach = () => slides; return { title, make }; };
  const MIX = (title, ...ls) => {
    const f = () => pick(ls).make();
    f.teach = () => [T("Review time!", "🔄", "This lesson mixes things you already know. Here is a quick reminder of each idea, then the quiz.")].concat(ls.map(l => l.make.teach()[0]));
    return { title, make: f };
  };
  const S = (v, ...a) => a.map(([h, t], i) => T(h, i ? ["✏️", "💡", "⭐"][(i - 1) % 3] : v, t));
  const mk = (title, f, slides) => mkL(title, f, slides);
  // rows: [text, right, wrong, (wrong), optional visual]; hs = array of 3 hints or a function of the row
  const rq = (rows, hs) => () => {
    const r = pick(rows);
    const cs = [r[1], r[2], r[3]].filter(x => x != null);
    const q = { text: r[0], choices: shuf(cs), answer: r[1], hints: typeof hs === "function" ? hs(r) : hs };
    if (r[4]) q.visual = r[4];
    return q;
  };
  // classify: stem has {} for the item; items = [text, categoryIndex]
  const cl = (stem, cats, items, hs) => () => {
    const r = pick(items), ans = cats[r[1]];
    return { text: stem.replace("{}", r[0]), choices: shuf([ans].concat(rest(cats, ans, 2))), answer: ans, hints: typeof hs === "function" ? hs(r) : hs };
  };
  const alt = (...fs) => () => pick(fs)();
  const ROOTH = (ex) => ["Think of another word that uses the same root. What idea do all those words share?", "Split the word into prefix + root + ending. The root gives the core idea. Guess the core idea from words you already know.", ex + " Now do yours."];
  const L19 = [], L20 = [], L21 = [];

  // ================= LEVEL 19 =================
  L19.push(mk("Latin roots: solv, fid, corp, tempor, viv", rq([
      ["The Latin root <b>solv/solut</b> is in <i>dissolve</i>, <i>solve</i> and <i>resolution</i>. What does it mean?", "loosen or free", "trust", "body"],
      ["The Latin root <b>fid</b> is in <i>confide</i>, <i>fidelity</i> and <i>confident</i>. What does it mean?", "trust or faith", "time", "alive"],
      ["The Latin root <b>corp</b> is in <i>corporation</i>, <i>corps</i> and <i>incorporate</i>. What does it mean?", "body", "loosen", "time"],
      ["The Latin root <b>tempor</b> is in <i>temporary</i>, <i>contemporary</i> and <i>temporal</i>. What does it mean?", "time", "body", "trust"],
      ["The Latin root <b>viv/vit</b> is in <i>vivid</i>, <i>survive</i> and <i>vital</i>. What does it mean?", "alive or life", "loosen", "body"],
      ["A <i>solvent</i> is a liquid that can...", "dissolve other substances", "tell the time", "build a body"],
      ["A <i>temporary</i> job is one that lasts...", "for a limited time", "forever", "only at night"],
      ["<i>Fidelity</i> to a friend means...", "loyalty", "speed", "distance"],
      ["A <i>corporation</i> is a business the law treats as a single...", "body", "road", "season"],
      ["To <i>revive</i> a wilted plant is to...", "bring it back to life", "put it away", "hang it up"],
      ["To <i>confide</i> in a friend is to...", "trust them with a secret", "run away from them", "copy their work"],
      ["A <i>contemporary</i> of Mozart lived at the same...", "time", "address", "school"],
      ["To <i>resolve</i> a problem is to...", "solve it", "hang it", "follow it"]],
    ROOTH("Example: <b>mand</b> is in <i>command</i>, <i>demand</i> and <i>mandate</i>. Each word is about giving an order, so <b>mand</b> means 'order'.")),
    S("🧩", ["More Latin roots", "Five more <b>Latin roots</b> help you decode hard words."],
      ["The roots", "<b>solv/solut</b> = loosen (<b>solv</b>e)<br><b>fid</b> = trust (con<b>fid</b>e)<br><b>corp</b> = body (<b>corp</b>oration)<br><b>tempor</b> = time (<b>tempor</b>ary)<br><b>viv/vit</b> = alive (<b>viv</b>id, <b>vit</b>al)"],
      ["Use them", "<i>con</i> (with) + <i>temporary</i> = <i>contemporary</i>, 'of the same time'. <i>Re</i> (again) + <i>viv</i> = <i>revive</i>, 'make alive again'."])));

  L19.push(mk("Greek roots: soph, derm, neur, cardi, ortho", rq([
      ["The Greek root <b>soph</b> is in <i>philosophy</i> and <i>sophisticated</i>. What does it mean?", "wisdom", "skin", "heart"],
      ["The Greek root <b>derm</b> is in <i>epidermis</i> and <i>dermatologist</i>. What does it mean?", "skin", "nerve", "straight"],
      ["The Greek root <b>neur</b> is in <i>neuron</i> and <i>neurology</i>. What does it mean?", "nerve", "wisdom", "skin"],
      ["The Greek root <b>cardi</b> is in <i>cardiac</i> and <i>cardiologist</i>. What does it mean?", "heart", "nerve", "wisdom"],
      ["The Greek root <b>ortho</b> is in <i>orthodontist</i> and <i>orthography</i>. What does it mean?", "straight or correct", "heart", "skin"],
      ["A <i>dermatologist</i> is a doctor who treats the...", "skin", "heart", "nerves"],
      ["A <i>cardiologist</i> is a doctor who studies the...", "heart", "skin", "teeth"],
      ["<i>Neurology</i> is the study of the...", "nerves and brain", "skin", "bones"],
      ["<i>Orthography</i> is the study of correct...", "spelling", "weather", "music"],
      ["<i>Philosophy</i> literally means 'love of'...", "wisdom", "music", "nature"],
      ["The <i>epidermis</i> is the outer layer of...", "skin", "bone", "wood"],
      ["An <i>orthodontist</i> helps to straighten...", "teeth", "bones", "hair"]],
    ROOTH("Example: <b>gastr</b> is in <i>gastric</i> and <i>gastritis</i>. Both words are about the stomach, so <b>gastr</b> means 'stomach'.")),
    S("🏛️", ["Body and mind roots", "Many medical and thinking words come from <b>Greek roots</b>."],
      ["The roots", "<b>soph</b> = wisdom (<b>soph</b>isticated)<br><b>derm</b> = skin (<b>derm</b>atologist)<br><b>neur</b> = nerve (<b>neur</b>on)<br><b>cardi</b> = heart (<b>cardi</b>ac)<br><b>ortho</b> = straight, correct (<b>ortho</b>dontist)"],
      ["Use them", "<i>-ologist</i> means 'a person who studies'. So a <i>neurologist</i> studies nerves. <i>Epi</i> means 'upon', so the <i>epidermis</i> lies upon the skin."])));

  const AS = [["ask", "inquire"], ["buy", "purchase"], ["help", "assist"], ["begin", "commence"], ["end", "terminate"], ["show", "demonstrate"], ["need", "require"], ["house", "residence"], ["think", "contemplate"], ["try", "attempt"]];
  const asMake = () => {
    const p = pick(AS), o = pick(AS.filter(x => x !== p));
    const hs = ["Imagine saying the word to a friend, then imagine reading it in a legal document. Which one fits where?", "Short everyday words usually come from Old English. Longer, formal-sounding words usually came into English from Latin or French.", "Example: <i>rise</i> is the plain everyday word and <i>ascend</i> is the formal one. Now do yours."];
    const k = ri(1, 8);
    if (k === 1) return { visual: "🐄", text: "English has <i>cow, pig, sheep</i> for animals but <i>beef, pork, mutton</i> for the meat. Why?", choices: shuf(["English farmers kept the animals while French-speaking nobles ate the meat", "The animals and meats were named by chance", "Farmers spoke Latin and nobles spoke Greek"]), answer: "English farmers kept the animals while French-speaking nobles ate the meat", hints: ["Think about who looked after the animals and who sat at the dinner table after 1066.", "After the Normans took over England, the ruling class spoke French. Ordinary farmers kept speaking English.", "Example: the word <i>calf</i> (animal) is English, while <i>veal</i> (meat) is French in origin. Now do yours."] };
    if (k <= 5) return { text: "Which word is the more <b>formal</b>, Latin-based choice?", choices: shuf([p[1], p[0], o[0]]), answer: p[1], hints: hs };
    return { text: "Which word is the plain, everyday <b>Old English</b> choice?", choices: shuf([p[0], p[1], o[1]]), answer: p[0], hints: hs };
  };
  L19.push(mk("Plain words and formal words", asMake,
    S("📜", ["Two layers of English", "English has plain, short words from <b>Old English</b> (ask, buy, help) and longer, formal words from <b>Latin and French</b> (inquire, purchase, assist)."],
      ["Why?", "In 1066 the Normans from France ruled England. Their words went into law and government. So: <b>cow</b> (English farmers) and <b>beef</b> (French-speaking nobles)."],
      ["Choosing", "Plain words sound friendly and clear. Formal words sound official. Pick the layer that fits your reader."])));

  const SH = [["slender", "thin", "scrawny"], ["thrifty", "economical", "stingy"], ["curious", "inquisitive", "nosy"], ["confident", "self-assured", "arrogant"], ["determined", "persistent", "stubborn"], ["youthful", "young", "childish"], ["unique", "different", "odd"], ["assertive", "firm", "bossy"], ["aroma", "smell", "stench"], ["cozy", "small", "cramped"], ["famous", "well-known", "notorious"]];
  const shMake = () => {
    const r = pick(SH), pos = ri(0, 1) === 0;
    return { text: "These words mean nearly the same thing. Which one has the most <b>" + (pos ? "positive" : "negative") + "</b> feeling?", choices: shuf(r.slice()), answer: pos ? r[0] : r[2], hints: ["Imagine the word in a compliment, then in a complaint. Which word would you be glad to hear about yourself?", "The three words point at almost the same thing, but each carries a different feeling (its connotation). Decide which word is warm and which is harsh.", "Example: <i>proud</i> sounds positive, <i>conceited</i> sounds negative, and <i>pleased with oneself</i> is in the middle. Now do yours."] };
  };
  L19.push(mk("Shades of meaning", shMake,
    S("🎨", ["Same meaning, different feeling", "Synonyms are not perfect twins. Words carry a <b>feeling</b> beyond their dictionary meaning."],
      ["An example", "<b>slender</b> (positive), <b>thin</b> (neutral), <b>scrawny</b> (negative). All describe a body with little fat, but they feel different."],
      ["Choose with care", "Writers pick the word with the right feeling. A good reader asks: <i>why did the author choose this word instead of another?</i>"])));

  L19.push(mk("Acronyms and initialisms", rq([
      ["Letters from a phrase that you say as a new word, like <i>NASA</i>, form an...", "acronym", "initialism", "synonym"],
      ["Letters from a phrase that you say one by one, like <i>FBI</i>, form an...", "initialism", "acronym", "synonym"],
      ["Which of these is said letter by letter?", "FBI", "NASA", "laser"],
      ["Which of these is said as one word?", "laser", "DVD", "ATM"],
      ["<b>Radar</b> stands for 'radio detection and ranging'. Radar is an...", "acronym", "initialism", "antonym"],
      ["<b>SCUBA</b> stands for self-contained underwater breathing...", "apparatus", "animal", "angle"],
      ["In <i>laser</i>, the L stands for...", "light", "long", "loud"],
      ["<b>ATM</b> stands for automated teller...", "machine", "method", "motor"],
      ["<b>DVD</b> is an initialism, so you say it...", "letter by letter", "as one word", "only in writing"],
      ["<b>UNESCO</b> is said as 'yoo-NES-ko', so it is an...", "acronym", "initialism", "antonym"]],
    ["Say the letters out loud. Do they make a word you could pronounce, or do you have to spell them out?", "If you can say it as a new word, it is one kind. If you must say each letter separately, it is the other kind. Many acronyms use the first letters of important words.", "Example: <b>PIN</b> (personal identification number) is usually said as the word 'pin', while <b>USA</b> is said U-S-A. Now do yours."]),
    S("🔤", ["Letters that stand for words", "An <b>acronym</b> is made from the first letters of a phrase and said as a word: <b>NASA</b>, <b>laser</b>, <b>scuba</b>."],
      ["Initialisms", "An <b>initialism</b> is said letter by letter: <b>FBI</b>, <b>DVD</b>, <b>ATM</b>."],
      ["Check", "Can you say it like a word? Then it is an acronym. Do you spell it out? Then it is an initialism."])));

  L19.push(mk("Tricky subject-verb agreement", rq([
      ["Each of the players ___ a uniform.", "has", "have"],
      ["Neither the coach nor the players ___ ready.", "are", "is"],
      ["Either the twins or Maya ___ going to win.", "is", "are"],
      ["There ___ two reasons for the delay.", "are", "is"],
      ["The team ___ practicing today.", "is", "are"],
      ["The news ___ surprising.", "was", "were"],
      ["Mathematics ___ my favorite subject.", "is", "are"],
      ["A bouquet of roses ___ on the table.", "is", "are"],
      ["Everyone ___ here.", "is", "are"],
      ["The scissors ___ on the desk.", "are", "is"],
      ["Ten dollars ___ a fair price.", "is", "are"],
      ["My friends, along with Sam, ___ coming.", "are", "is"]],
    ["Find the real subject of the sentence. Ignore phrases like 'of the players' or 'along with Sam'.", "Words like each, everyone, news and mathematics are singular. With 'or' and 'nor', the verb matches the closer subject. In 'There is/are', the subject comes after the verb.", "Example: 'The stack of books ___ heavy.' The subject is <i>stack</i> (one thing), so the verb is singular. Now do yours."]),
    S("✅", ["Match the verb to the real subject", "A singular subject takes a singular verb. The tricky part is finding the real subject."],
      ["Tricky cases", "<b>each, everyone, neither</b> = singular<br><b>news, mathematics</b> = singular<br><b>scissors, pants</b> = plural<br><b>either/or</b>, <b>neither/nor</b>: match the closer subject"],
      ["There is / there are", "In 'There ___ two reasons', the subject (reasons) comes <i>after</i> the verb. Flip it around: 'Two reasons ___ there.'"])));

  L19.push(mk("Perfect and progressive tenses", rq([
      ["I ___ this book twice already. (present perfect)", "have read", "am reading", "will read"],
      ["By the time we arrived, the movie ___. (past perfect)", "had started", "has started", "will have started"],
      ["Tomorrow at noon, I ___ the test. (future progressive)", "will be taking", "have taken", "took"],
      ["Right now, they ___ the stage. (present progressive)", "are building", "have built", "built"],
      ["She ___ here since 2020. (present perfect)", "has lived", "lived", "had lived"],
      ["By 2035, he ___ college. (future perfect)", "will have finished", "will finish", "had finished"],
      ["We ___ dinner when the phone rang. (past progressive)", "were eating", "have eaten", "will eat"],
      ["Before she moved, she ___ in three different schools. (past perfect)", "had studied", "studies", "will have studied"]],
    ["Check the label in parentheses and the clue words (already, since, by the time, right now, when).", "Perfect tenses use have/has/had/will have + the past participle. Progressive tenses use a form of <i>be</i> + an -ing verb.", "Example: 'By noon, we ___ lunch. (future perfect)' becomes 'will have eaten'. Now do yours."]),
    S("⏳", ["Tenses with helpers", "Beyond past, present and future, helper verbs add timing. <b>Perfect</b>: an action finished before another time. <b>Progressive</b>: an action in progress."],
      ["The forms", "Present perfect: <b>have/has walked</b><br>Past perfect: <b>had walked</b><br>Future perfect: <b>will have walked</b><br>Progressive: <b>am/was/will be walking</b>"],
      ["Clue words", "<i>already, since, for</i> point to perfect tenses. <i>right now, while, when</i> often point to progressive."])));

  L19.push(mk("Modal verbs", rq([
      ["'It <b>might</b> rain.' How sure is the speaker?", "not very sure", "completely sure", "giving an order"],
      ["'You <b>must</b> wear a helmet.' This expresses...", "a requirement", "a wish", "a past habit"],
      ["'You <b>should</b> read more.' This expresses...", "advice", "a law", "a certainty"],
      ["'She ___ swim 50 meters.' Which modal shows ability?", "can", "must", "might"],
      ["Which sentence is the most certain?", "It will rain tomorrow.", "It might rain tomorrow.", "It could rain tomorrow."],
      ["Which is the most polite request?", "Could you pass the salt?", "Pass the salt.", "You will pass the salt."],
      ["'His coat is gone, so he ___ have left.' Which modal shows a logical guess?", "must", "can", "shall"],
      ["'I <b>would</b> visit if I had time.' <i>Would</i> shows...", "an imagined situation", "a past fact", "a command"],
      ["'Visitors <b>may</b> enter after nine.' <i>May</i> shows...", "permission", "ability", "a guess"],
      ["Which modal expresses the strongest necessity?", "must", "may", "might"]],
    ["Ask how sure, how strong or how polite the speaker wants to be.", "Modals (can, could, may, might, must, should, would, will) never change form. Sort them from weak and unsure to strong and certain.", "Example: 'Students <b>may</b> bring a snack' gives permission, while 'Students <b>must</b> bring a snack' makes it a rule. Now do yours."]),
    S("🔧", ["Helping verbs with meaning", "<b>Modal verbs</b> (can, could, may, might, must, should, would, will) change how sure, strong or polite a sentence is."],
      ["Strength", "Unsure: <b>might, could, may</b><br>Probable: <b>should</b><br>Certain: <b>will, must</b><br>Ability: <b>can</b><br>Permission: <b>may, can</b>"],
      ["Polite requests", "<i>Could you...?</i> and <i>Would you...?</i> sound softer than <i>Do it.</i>"])));

  const IR = ["verbal irony", "situational irony", "dramatic irony"];
  L19.push(mk("Kinds of irony", cl("<i>{}</i><br><br>What kind of irony is this?", IR, [
      ["On a freezing, stormy day, Lena says, 'Lovely weather for a picnic!'", 0],
      ["After tripping three times, Sam says, 'Wow, I'm so graceful.'", 0],
      ["After waiting two hours in line, Dev says, 'That was quick!'", 0],
      ["A fire station burns down.", 1],
      ["A man buys an expensive lock, then locks his keys inside the house.", 1],
      ["A lifeguard has to be rescued from a puddle.", 1],
      ["The audience sees the thief hiding in the closet while the owner says, 'I'm all alone.'", 2],
      ["The reader knows the treasure map is a fake, but the characters keep digging happily.", 2],
      ["The audience knows the bridge is broken, but the hero cheerfully drives toward it.", 2]],
    ["Ask who knows what, and what was expected compared with what actually happened.", "Verbal irony: someone says the opposite of what they mean. Situational irony: the outcome is the opposite of what you expect. Dramatic irony: the audience knows something the characters do not.", "Example: a baker who is allergic to flour is an unexpected outcome, so it is situational irony. Now do yours."]),
    S("🎭", ["Three kinds of irony", "<b>Irony</b> is a gap between what seems true and what is true."],
      ["The kinds", "<b>Verbal</b>: saying the opposite of what you mean ('Great weather!' in a storm)<br><b>Situational</b>: an outcome opposite to what you expect<br><b>Dramatic</b>: the audience knows what the characters do not"],
      ["Tip", "Verbal irony is about <i>words</i>. Situational irony is about <i>events</i>. Dramatic irony is about <i>who knows what</i>."])));

  L19.push(mk("Allegory and parable", rq([
      ["An <b>allegory</b> is a story in which characters and events stand for...", "bigger ideas about people or society", "only real events", "a list of facts"],
      ["A <b>parable</b> is a short story that teaches...", "a moral or lesson", "a science fact", "a recipe"],
      ["In George Orwell's <i>Animal Farm</i>, the farm animals stand for...", "real people and groups, showing how power can be misused", "nothing but farm animals", "a cooking lesson"],
      ["In an allegory, a character named 'Greed' who grabs everything is probably...", "a personification of an idea", "a real historical person", "the narrator"],
      ["In Plato's 'Allegory of the Cave', prisoners who watch shadows on a wall stand for people who...", "mistake appearances for reality", "love gardening", "are afraid of the dark only"],
      ["Which is the best sign that a story is an allegory?", "Characters and places seem to stand for ideas", "It has many rhymes", "It is very short"],
      ["How is a parable different from a long allegory?", "A parable is brief and teaches one lesson", "A parable has no characters", "A parable is always a poem"],
      ["In John Bunyan's <i>The Pilgrim's Progress</i>, the long journey stands for...", "a person's spiritual path through life", "a train trip", "a school year"],
      ["If a story's lazy king stands for a lazy government, the story is working as an...", "allegory", "acronym", "index"]],
    ["Ask whether the story means only what it says, or whether it also stands for something bigger.", "In an allegory, people, places and events are symbols that together form a second, hidden meaning. A parable usually teaches one clear lesson.", "Example: in a tale where a tiny ant who works hard stands for steady effort and a loud grasshopper stands for wasted time, the story has a second meaning. Now do yours."]),
    S("🗝️", ["Stories with a second meaning", "An <b>allegory</b> has a surface story and a hidden meaning. The characters stand for ideas."],
      ["Examples", "<i>Animal Farm</i> (Orwell): animals stand for people and groups in a real revolution.<br>Plato's cave: shadows stand for appearances; the sun stands for truth."],
      ["Parable", "A <b>parable</b> is a short story with one moral. Allegories are usually longer and have many symbols."])));

  L19.push(mk("Tragedy and comedy", rq([
      ["In drama, a <b>tragedy</b> usually ends with...", "suffering or the downfall of the main character", "a wedding and a party", "an unanswered riddle"],
      ["In drama, a <b>comedy</b> usually ends...", "happily, with problems solved", "with the hero's downfall", "with no ending"],
      ["A <b>tragic flaw</b> is...", "a weakness in a hero's character that helps cause the downfall", "a printing mistake in the script", "a plot hole"],
      ["<b>Hubris</b> means...", "excessive pride", "deep sadness", "great humor"],
      ["<b>Catharsis</b> is the feeling an audience gets when...", "strong emotions are released at the end", "they fall asleep", "the lights come on"],
      ["Which is a Shakespeare comedy?", "A Midsummer Night's Dream", "Macbeth", "Hamlet"],
      ["Which is a Shakespeare tragedy?", "Hamlet", "Twelfth Night", "As You Like It"],
      ["Comedies often include...", "mix-ups, misunderstandings and a happy ending", "a hero's downfall", "no jokes at all"],
      ["Which ancient Greek thinker wrote about tragedy in his book <i>Poetics</i>?", "Aristotle", "Shakespeare", "Homer"],
      ["A <b>tragic hero</b> is usually...", "a person of high standing whose flaw leads to a fall", "a clown", "a narrator"]],
    ["Think about how the story ends and what happens to the main character.", "Match the word to its theater mask: one mask cries and one laughs. Words like flaw, hubris and catharsis belong with the serious mask.", "Example: in a comedy, two sets of twins are mistaken for each other, and everything is sorted out by the last scene. Now do yours."]),
    S("🎭", ["Two masks of drama", "Drama has two classic types: <b>tragedy</b> and <b>comedy</b>. The famous theater masks show them."],
      ["Tragedy", "A serious story where a hero of high standing falls, often because of a <b>tragic flaw</b> such as <b>hubris</b> (excessive pride). The audience feels <b>catharsis</b>."],
      ["Comedy", "A lighter story with mix-ups and humor, ending happily. Shakespeare wrote both: <i>Hamlet</i> (tragedy), <i>A Midsummer Night's Dream</i> (comedy)."])));

  L19.push(mk("Metonymy and synecdoche", cl("<i>{}</i><br><br>Which figure of speech is this?", ["metonymy", "synecdoche", "personification"], [
      ["The pen is mightier than the sword.", 0],
      ["The White House issued a statement.", 0],
      ["Wall Street panicked today.", 0],
      ["I read some Shakespeare last night.", 0],
      ["All hands on deck!", 1],
      ["Nice wheels! (said about a car)", 1],
      ["Fifty sails appeared on the horizon.", 1],
      ["I need a hand with these boxes.", 1],
      ["The wind whispered through the trees.", 2],
      ["The sun smiled down on us.", 2],
      ["The old house groaned in the night.", 2]],
    ["Look for a word that stands for something else, and ask how the two are connected.", "Metonymy: something is named by a closely connected thing. Synecdoche: a part stands for the whole. Personification: a non-human thing acts like a person.", "Example: 'The crown announced new laws' uses <i>crown</i> for the king or queen, so it is metonymy. Now do yours."]),
    S("🔀", ["Naming one thing by another", "Writers sometimes name a thing by something connected to it."],
      ["Metonymy and synecdoche", "<b>Metonymy</b>: 'the White House' = the president's team.<br><b>Synecdoche</b>: a part stands for the whole ('all hands on deck' = all sailors)."],
      ["Personification", "Do not mix these up with <b>personification</b>, which gives human actions to things: 'the sun smiled'."])));

  L19.push(mk("Anaphora, antithesis and chiasmus", cl("<i>{}</i><br><br>Which rhetorical device is this?", ["anaphora", "antithesis", "chiasmus"], [
      ["Every voice matters, every vote counts, every person belongs.", 0],
      ["Not for fame, not for money, not for glory, but for home.", 0],
      ["We will learn, we will grow, we will lead.", 0],
      ["To err is human; to forgive, divine.", 1],
      ["That's one small step for man, one giant leap for mankind.", 1],
      ["United we stand, divided we fall.", 1],
      ["Ask not what your country can do for you; ask what you can do for your country.", 2],
      ["Fair is foul, and foul is fair.", 2],
      ["You can take the boy out of the country, but you can't take the country out of the boy.", 2]],
    ["Look at the pattern of the words: are they repeated at the start, set against each other, or flipped?", "Anaphora: the same words repeated at the start of lines. Antithesis: opposite ideas placed side by side. Chiasmus: the order of words is reversed (A B, B A).", "Example: 'We came, we saw, we conquered' repeats the same start word, so it is anaphora. Now do yours."]),
    S("📣", ["Patterns that make speeches stick", "Speechmakers use patterns in words. Three famous ones:"],
      ["The three", "<b>Anaphora</b>: repeat the opening words ('Every voice... every vote...')<br><b>Antithesis</b>: set opposites side by side ('united we stand, divided we fall')<br><b>Chiasmus</b>: reverse the order (A B, B A)"],
      ["Spot them", "Anaphora is about the <i>start</i>. Antithesis is about <i>opposites</i>. Chiasmus is a <i>mirror</i>."])));

  L19.push(mk("The inverted pyramid of news", rq([
      ["In a news story, the <b>lede</b> is...", "the opening sentence with the most important facts", "the last line", "the picture caption"],
      ["The <b>inverted pyramid</b> puts...", "the most important facts first and details later", "the details first", "the opinion first"],
      ["Why do news stories use the inverted pyramid?", "Readers get the key facts fast, and editors can cut from the end", "It makes stories rhyme", "It hides the main point"],
      ["A <b>headline</b> should...", "sum up the story briefly", "tell the whole story", "give the writer's opinion"],
      ["A <b>byline</b> tells you...", "who wrote the story", "which page it is on", "where the story happened"],
      ["A <b>dateline</b> gives...", "the place and date of the report", "the writer's name", "the topic"],
      ["The five W questions are who, what, when, where and...", "why", "whether", "while"],
      ["Which is the best lede?", "The school board voted 5-2 on Tuesday to extend the school day by 20 minutes.", "It was a dark and stormy night in a school board room.", "Many people have opinions about schools."],
      ["Where do the least important details go in an inverted-pyramid story?", "near the end", "in the headline", "in the lede"]],
    ["Think about a reader who only has time to read the first sentence. What should they learn?", "Picture a pyramid turned upside down: the wide, heavy part is on top. Think about what belongs in the wide part and why that helps a busy reader and a busy editor.", "Example: 'A fire damaged the town library on Monday; no one was hurt.' tells the key facts in one line. Now do yours."]),
    S("📰", ["How a news story is built", "News stories use the <b>inverted pyramid</b>: the most important facts at the top, smaller details below."],
      ["Parts", "<b>Headline</b>: short summary<br><b>Byline</b>: the writer<br><b>Dateline</b>: place and date<br><b>Lede</b>: the opening that answers who, what, when, where, why"],
      ["Why", "Readers may stop reading at any point, and editors can cut from the bottom without losing the key facts."])));

  L19.push(mk("News, opinion or feature?", cl("What kind of article is likely to carry this headline?<br><i>{}</i>", ["news report", "opinion piece", "feature story"], [
      ["City council approves new bike lanes on Main Street, 6 to 1", 0],
      ["Heavy rain closes two highways; crews expect to reopen them Friday", 0],
      ["School library to open on Saturdays, officials announce", 0],
      ["The city must build more bike lanes: anything less is a failure", 1],
      ["Our school day is far too long, and it is time to shorten it", 1],
      ["Why every student deserves a free breakfast", 1],
      ["Meet the 12-year-old who restores antique clocks in her garage", 2],
      ["Inside the bakery that has baked the same bread for 100 years", 2],
      ["A day in the life of a lighthouse keeper's family", 2]],
    ["Ask whether the headline reports a fact, argues a position, or tells an interesting human story.", "News reports who/what/when/where. Opinion pieces (editorials and columns) argue with words like <i>must</i> and <i>should</i>. Features explore people and places in a story style.", "Example: 'Mayor says park will reopen in June' reports a fact, so it is a news report. Now do yours."]),
    S("🗞️", ["Three kinds of articles", "A newspaper has different kinds of writing. Each has a different purpose."],
      ["The kinds", "<b>News report</b>: facts, no opinion<br><b>Opinion piece</b> (editorial, column): an argument, with words like <i>should</i> and <i>must</i><br><b>Feature</b>: a longer story about people, places or trends"],
      ["Tip", "Words like <i>must</i>, <i>should</i>, <i>failure</i> and <i>why we need</i> signal opinion. Neutral facts signal news."])));

  const DI = ["deductive reasoning", "inductive reasoning", "a circular argument"];
  L19.push(mk("Deductive and inductive reasoning", alt(
      cl("<i>{}</i><br><br>What kind of reasoning is this?", DI, [
        ["All mammals have lungs. A whale is a mammal. So a whale has lungs.", 0],
        ["All squares have four sides. This shape is a square. So it has four sides.", 0],
        ["Every prime number greater than 2 is odd. 13 is prime and greater than 2. So 13 is odd.", 0],
        ["Every swan I have seen is white, so all swans are probably white.", 1],
        ["The first five times I took this bus it was late, so it is probably often late.", 1],
        ["Every dog on my street barks at the mail carrier, so most dogs probably do.", 1],
        ["I am always right because I never make mistakes, and I never make mistakes because I am always right.", 2]],
        ["Ask: does the argument go from a general rule to a case, or from several cases to a general rule?", "Deductive: from a general rule to a specific case, with a certain conclusion if the rule is true. Inductive: from many specific cases to a general conclusion that is only probable. Circular: the conclusion is used to prove itself.", "Example: 'Every coin I flipped today landed heads, so this coin is probably biased' moves from cases to a general idea. Now do yours."]),
      rq([
        ["Which kind of reasoning moves from a general rule to a specific case?", "deductive", "inductive", "circular"],
        ["Which kind of reasoning moves from specific observations to a general conclusion?", "inductive", "deductive", "circular"],
        ["If the premises are true and the logic is valid, which reasoning guarantees a true conclusion?", "deductive", "inductive", "circular"],
        ["The conclusion of inductive reasoning is best described as...", "probable, not certain", "always certain", "meaningless"]],
        ["Think of the direction: from the whole rule down to one case, or from cases up to a rule?", "Look at the Latin: <i>de-</i> means 'down from' and <i>in-</i> means 'into', like gathering things in. Which way does the question's reasoning move?", "Example: a scientist who watches many birds fly south and concludes birds migrate is using one of these kinds of reasoning (the one that builds up from examples). Now do yours."])),
    S("🔍", ["Two ways to reason", "<b>Deductive</b> reasoning starts with a general rule and applies it. <b>Inductive</b> reasoning collects examples and builds a general conclusion."],
      ["Examples", "Deductive: All birds have feathers. A robin is a bird. So a robin has feathers.<br>Inductive: Every robin I have seen has feathers, so all birds probably do."],
      ["Strength", "A valid deductive argument with true premises is <b>certain</b>. Inductive conclusions are only <b>probable</b>: one white swan after another did not prove all swans are white (black swans exist)."])));

  const PR = ["bandwagon", "testimonial", "fear appeal", "name-calling", "glittering generality"];
  L19.push(mk("Propaganda techniques", cl("<i>{}</i><br><br>Which persuasion technique is this?", PR, [
      ["Everyone in town is switching to Zippy Sneakers. Don't be left out!", 0],
      ["Nine out of ten kids on our street love Crunchy-O's, so you will too!", 0],
      ["Star quarterback Jake Rivers says, 'I only drink Power Fizz!'", 1],
      ["Famous singer Mia Lane uses Glow shampoo, so you should too.", 1],
      ["If you don't buy our alarm system tonight, you could lose everything!", 2],
      ["Without Brand X vitamins, you'll be sick all winter!", 2],
      ["Only a fool or a coward would oppose the new park.", 3],
      ["My opponent is a lazy know-nothing.", 3],
      ["Vote for Maria: she stands for freedom, greatness and all that is good!", 4],
      ["Our school is the best! It stands for everything wonderful!", 4]],
    ["Ask what the message uses to persuade: the crowd, a famous face, worry, an insult, or big happy words with no facts?", "Bandwagon: everyone is doing it. Testimonial: a famous person says so. Fear appeal: be afraid. Name-calling: insult the other side. Glittering generality: huge, positive words with no details.", "Example: 'Don't miss out, the whole country is wearing these hats!' pushes you to join a crowd. Now do yours."]),
    S("📢", ["Tricks that persuade without proof", "<b>Propaganda</b> techniques push your feelings instead of giving good reasons."],
      ["Five tricks", "<b>Bandwagon</b>: 'everyone is doing it'<br><b>Testimonial</b>: a famous person says so<br><b>Fear appeal</b>: scare you into acting<br><b>Name-calling</b>: insult instead of arguing<br><b>Glittering generality</b>: grand words, no facts"],
      ["Defense", "Ask: <i>What is the evidence? Who gains if I believe this?</i>"])));

  const SEC = ["abstract", "introduction", "methods", "results", "discussion", "references"];
  const secQ = (text, ans) => [text, ans].concat(rest(SEC, ans, 2));
  L19.push(mk("Parts of a science article", rq([
      secQ("Which section briefly summarizes the whole study at the start?", "abstract"),
      secQ("Which section explains how the experiment was done so others can repeat it?", "methods"),
      secQ("Which section reports the data that was found?", "results"),
      secQ("Which section explains what the results mean and what the limits are?", "discussion"),
      secQ("Which section lists the sources the authors used?", "references"),
      secQ("Which section explains why the study matters and what is already known?", "introduction"),
      secQ("'Plants in sunlight grew 30 percent taller (Table 2).' belongs in the...", "results"),
      secQ("'We watered 20 plants daily and measured each with a ruler.' belongs in the...", "methods"),
      secQ("'These results suggest light affects growth, but more trials are needed.' belongs in the...", "discussion")],
    ["Ask what job the sentence or section does: summarize, explain the plan, report numbers, interpret, or list sources.", "A science article usually goes in this order: abstract, introduction, methods, results, discussion, references. The numbers go in one section and the meaning of the numbers goes in another.", "Example: 'We surveyed 100 students by email' tells how the study was done, so it fits the section about the plan. Now do yours."]),
    S("🔬", ["How a science article is organized", "Scientific papers follow a standard order so readers can find things fast."],
      ["The sections", "<b>Abstract</b>: a short summary<br><b>Introduction</b>: the question and background<br><b>Methods</b>: how it was done<br><b>Results</b>: what was found<br><b>Discussion</b>: what it means<br><b>References</b>: sources"],
      ["Reading smartly", "Read the abstract first. Then look at the results and discussion. Go to the methods when you want to judge how trustworthy the study is."])));

  L19.push(MIX("Mixed practice", L19[0], L19[3], L19[5], L19[8], L19[11], L19[13]));
  L19.push(MIX("Level 19 Challenge", L19[1], L19[2], L19[4], L19[6], L19[7], L19[9], L19[10], L19[12], L19[14], L19[15], L19[16], L19[17]));

  // ================= LEVEL 20 =================
  L20.push(mk("Latin roots: mem, nov, pot, mar, pub", rq([
      ["The Latin root <b>mem</b> is in <i>memory</i>, <i>memorial</i> and <i>memento</i>. What does it mean?", "remember", "new", "sea"],
      ["The Latin root <b>nov</b> is in <i>novel</i>, <i>innovation</i> and <i>renovate</i>. What does it mean?", "new", "power", "people"],
      ["The Latin root <b>pot</b> is in <i>potent</i>, <i>potential</i> and <i>omnipotent</i>. What does it mean?", "power", "remember", "sea"],
      ["The Latin root <b>mar</b> is in <i>marine</i>, <i>submarine</i> and <i>maritime</i>. What does it mean?", "sea", "new", "power"],
      ["The Latin root <b>pub</b> is in <i>public</i>, <i>publish</i> and <i>republic</i>. What does it mean?", "people", "sea", "remember"],
      ["To <i>commemorate</i> an event is to...", "remember it in a special way", "make it new", "hide it"],
      ["To <i>renovate</i> an old house is to make it...", "new again", "smaller", "quieter"],
      ["A <i>potent</i> medicine is...", "very strong", "very old", "very cheap"],
      ["A <i>submarine</i> travels...", "under the sea", "above the clouds", "along a road"],
      ["A <i>novice</i> is a...", "beginner", "king", "sailor"],
      ["A <i>memento</i> is an object that...", "helps you remember something", "tells the time", "floats on water"],
      ["<i>Maritime</i> law deals with...", "the sea and ships", "airplanes", "farms"],
      ["To <i>publish</i> a book is to make it...", "known to the people", "secret", "shorter"]],
    ROOTH("Example: <b>aqu</b> is in <i>aquarium</i>, <i>aquatic</i> and <i>aqueduct</i>. All are about water, so <b>aqu</b> means 'water'.")),
    S("🧩", ["Five more Latin roots", "These roots appear in many school words."],
      ["The roots", "<b>mem</b> = remember (<b>mem</b>ory)<br><b>nov</b> = new (<b>nov</b>el, inno<b>v</b>ation)<br><b>pot</b> = power (<b>pot</b>ent)<br><b>mar</b> = sea (sub<b>mar</b>ine)<br><b>pub</b> = people (<b>pub</b>lic)"],
      ["Use them", "<i>re</i> (again) + <i>nov</i> (new) + <i>ate</i> = <i>renovate</i>, 'make new again'. <i>Omni</i> (all) + <i>pot</i> = <i>omnipotent</i>, 'all-powerful'."])));

  L20.push(mk("Greek roots: log, crac, polis, theo, pan", rq([
      ["The Greek root <b>log</b> is in <i>dialogue</i>, <i>prologue</i> and <i>biology</i>. What does it mean?", "word or study", "rule", "city"],
      ["The Greek root <b>crac/crat</b> is in <i>democracy</i>, <i>aristocrat</i> and <i>bureaucracy</i>. What does it mean?", "rule or power", "word", "all"],
      ["The Greek root <b>polis</b> is in <i>metropolis</i>, <i>politics</i> and <i>acropolis</i>. What does it mean?", "city", "god", "rule"],
      ["The Greek root <b>theo</b> is in <i>theology</i>, <i>atheist</i> and <i>monotheism</i>. What does it mean?", "god", "city", "word"],
      ["The Greek root <b>pan</b> is in <i>panorama</i>, <i>pandemic</i> and <i>panacea</i>. What does it mean?", "all", "god", "rule"],
      ["A <i>metropolis</i> is a major...", "city", "river", "mountain"],
      ["An <i>autocrat</i> is a ruler who...", "holds total power alone", "is chosen by everyone", "never speaks"],
      ["A <i>pandemic</i> affects people...", "in many countries", "in one house", "in one class"],
      ["<i>Theology</i> is the study of...", "god and religious belief", "cities", "rocks"],
      ["<i>Democracy</i> means rule by the...", "people", "king", "army"],
      ["A <i>prologue</i> comes...", "before the main story", "after the main story", "in the middle of a chapter"],
      ["A <i>monologue</i> is a speech by...", "one person", "two people", "a whole crowd"]],
    ROOTH("Example: <b>phon</b> is in <i>telephone</i>, <i>microphone</i> and <i>symphony</i>. All are about sound, so <b>phon</b> means 'sound'.")),
    S("🏛️", ["Greek roots for ideas", "Words about government, speech and belief often use <b>Greek roots</b>."],
      ["The roots", "<b>log</b> = word, study (dia<b>log</b>ue)<br><b>crac/crat</b> = rule (demo<b>crac</b>y)<br><b>polis</b> = city (metro<b>polis</b>)<br><b>theo</b> = god (<b>theo</b>logy)<br><b>pan</b> = all (<b>pan</b>orama)"],
      ["Use them", "<i>demos</i> (people) + <i>crat</i> (rule) = <i>democracy</i>. <i>Auto</i> (self) + <i>crat</i> = <i>autocrat</i>, one who rules alone."])));

  L20.push(mk("Taking big words apart", rq([
      ["In <b>unbreakable</b>, which part is the root?", "break", "un-", "-able"],
      ["Which suffix turns the verb <i>create</i> into a noun naming the act?", "-ion", "-less", "-able"],
      ["<b>Transatlantic</b> means 'across the Atlantic'. What does <b>trans-</b> mean?", "across", "under", "against"],
      ["<b>Hyperactive</b> means 'too active'. What does <b>hyper-</b> mean?", "over or too much", "under", "between"],
      ["<b>Subterranean</b> means 'under the earth'. What does <b>sub-</b> mean?", "under", "above", "around"],
      ["Which word has a prefix, a root and a suffix?", "unfriendly", "friendly", "unfriend"],
      ["The suffix <b>-less</b> in <i>careless</i> means...", "without", "full of", "able to"],
      ["What does <b>inter-</b> mean in <i>international</i>?", "between", "inside", "before"],
      ["What does the suffix <b>-ment</b> do in <i>government</i>?", "makes a noun from a verb", "makes a verb from a noun", "makes an adverb"],
      ["In <b>reconstruction</b>, which part carries the core meaning 'build'?", "construct", "re-", "-ion"]],
    ["Cover one part of the word at a time. Which part could stand alone or carries the main idea?", "Prefixes come before the root and change its meaning. Suffixes come after and often change the part of speech.", "Example: in <i>disagreement</i>, <b>dis-</b> means 'not', <b>agree</b> is the root, and <b>-ment</b> makes it a noun. Now do yours."]),
    S("🔧", ["Prefix + root + suffix", "Long words are built from parts. Take them apart and the meaning appears."],
      ["Parts", "<b>Prefix</b> (before): un-, re-, trans-, inter-<br><b>Root</b> (core): break, construct, terra<br><b>Suffix</b> (after): -able, -ion, -less, -ment"],
      ["Example", "<i>un</i> (not) + <i>break</i> + <i>able</i> (can be) = <i>unbreakable</i>, 'cannot be broken'."])));

  const PV = [["walked slowly with heavy, tired steps", "trudged", "darted", "skipped"], ["looked quickly and briefly", "glanced", "stared", "studied"], ["said in a very quiet voice", "murmured", "bellowed", "shrieked"], ["ate quickly and greedily", "gobbled", "nibbled", "sipped"], ["laughed in a high, silly way", "giggled", "sobbed", "grumbled"], ["walked in steady, regular steps like a soldier", "marched", "tiptoed", "wandered"], ["moved quietly on the tips of the toes", "tiptoed", "stomped", "galloped"], ["spoke sharply and suddenly in anger", "snapped", "whispered", "chuckled"], ["looked at for a long time with wonder", "gazed", "blinked", "glimpsed"], ["ate slowly in tiny bites", "nibbled", "gulped", "devoured"]];
  L20.push(mk("Precise verbs", rq(PV.map(r => ["Which verb means <i>" + r[0] + "</i>?", r[1], r[2], r[3]]),
    r => ["Picture the action in your head. Is it fast or slow, loud or quiet, big or small?", "Each verb has its own picture. Cross out the verbs whose picture does not match the speed and feeling in the question.", "Example: <i>strolled</i> means walked slowly and without hurry, while <i>sprinted</i> means ran very fast. Now do yours."]),
    S("🎯", ["The exact word", "A weak verb needs help from adverbs: <i>walked slowly and tiredly</i>. A strong verb does the work alone: <b>trudged</b>."],
      ["Examples", "said quietly = <b>murmured</b><br>looked quickly = <b>glanced</b><br>ate quickly = <b>gobbled</b><br>moved on tiptoe = <b>tiptoed</b>"],
      ["Tip", "When you see 'walked' or 'said' plus an adverb, look for one stronger verb instead."])));

  L20.push(mk("Essential and extra clauses", rq([
      ["'My sister, who lives in Ohio, is a nurse.' The commas show that the clause is...", "extra information", "needed to identify which sister", "a question"],
      ["'The students, who finished early, read quietly.' What does this sentence say?", "All the students finished early.", "Only some students finished early.", "No students finished early."],
      ["'The students who finished early read quietly.' What does this sentence say?", "Only some of the students finished early.", "All the students finished early.", "No students read quietly."],
      ["The laptop ___ I use for school is old. (essential clause)", "that", "which"],
      ["My laptop, ___ I bought last year, is fast. (extra clause)", "which", "that"],
      ["A clause that can be removed without changing the sentence's basic meaning is...", "nonrestrictive", "restrictive", "a fragment"],
      ["A clause that is needed to identify who or what is meant is...", "restrictive", "nonrestrictive", "a fragment"],
      ["'The book that won the prize is on the shelf.' Why are there no commas around the clause?", "The clause is needed to tell which book", "The clause is extra information", "Commas are never used with <i>that</i>"],
      ["'My brother, who is a doctor, lives nearby.' What does this suggest?", "The speaker has only one brother.", "The speaker has several brothers.", "The speaker has no brothers."],
      ["'My brother who is a doctor lives nearby.' What does this suggest?", "The speaker has more than one brother.", "The speaker has only one brother.", "The speaker is a doctor."]],
    ["Ask: if I delete the clause, do I still know exactly who or what is meant?", "Try deleting the clause and see whether you lose track of which one is meant. Commas are a signal that something could be lifted out of the sentence. For the that/which blanks, only one of the two words goes with commas.", "Example: 'My cat, which is orange, naps all day' still makes sense without the clause, so it gets commas. Now do yours."]),
    S("✂️", ["Needed or extra?", "Some clauses are <b>essential</b>: they tell which one you mean. Others are <b>extra</b>: they just add a fact."],
      ["The rules", "<b>Essential</b> (restrictive): no commas, use <i>that</i> or <i>who</i>.<br><b>Extra</b> (nonrestrictive): commas, use <i>which</i> or <i>who</i>."],
      ["Meaning changes", "'Students who finish early may read' means only some. 'Students, who finish early, may read' means all of them finish early."])));

  const SC = [["The test was difficult", "nevertheless", "most students passed"], ["It was raining", "however", "the game went on"], ["She studied hard", "consequently", "she earned an A"], ["Hurry up", "otherwise", "we will miss the train"], ["The soup was hot", "moreover", "it was delicious"], ["Dad cooked dinner", "meanwhile", "I set the table"], ["The museum is free", "furthermore", "it is open late"], ["He forgot his umbrella", "therefore", "he got wet"]];
  const scMake = () => {
    const r = pick(SC);
    const ok = "semicolon before, comma after";
    return { text: r[0] + " ___ " + r[1] + " ___ " + r[2] + ".<br>Which punctuation belongs in the two blanks (first blank, second blank)?", choices: shuf([ok, "comma before, nothing after", "nothing before, comma after"]), answer: ok,
      hints: ["Look at what comes before the blank: it is a complete sentence. And what comes after: another complete sentence.", "The word in the middle is not a joining word like <i>and</i> or <i>but</i>, so a comma alone cannot join the two sentences. Think about which mark can join them, and which small mark usually follows an introductory word.", "Example: 'The pool was closed ___ instead ___ we went to the park.' Mark the join first, then the pause after <i>instead</i>. Now do yours."] };
  };
  L20.push(mk("Semicolons with however and therefore", scMake,
    S("⚡", ["Joining sentences with a semicolon", "A <b>semicolon</b> (;) can join two complete sentences that are closely related."],
      ["The pattern", "Use <b>; word,</b> with words like <i>however, therefore, moreover, consequently, otherwise, meanwhile</i>:<br>'It was raining; however, the game went on.'"],
      ["Avoid", "A comma alone cannot join the two sentences. 'It was raining, however the game went on' is a comma splice."])));

  L20.push(mk("Ambiguous sentences", rq([
      ["'I saw the man with the telescope.' Why is this ambiguous?", "'with the telescope' could describe the man or how I saw him", "'saw' is misspelled", "there is no verb"],
      ["The headline 'Include your children when baking cookies' is confusing because...", "children could be read as an ingredient", "it is too long", "it has no verb"],
      ["'The teacher told the student she was late.' What is unclear?", "who 'she' refers to", "what 'late' means", "who the teacher is"],
      ["Which rewrite removes the ambiguity in 'Visiting relatives can be annoying'?", "It can be annoying when relatives visit.", "Annoying visiting relatives can.", "Visiting annoying can relatives."],
      ["Which sentence is ambiguous?", "She hit the man with the umbrella.", "She hit the ball over the net.", "He opened the window."],
      ["'Let's eat, Grandma' differs from 'Let's eat Grandma' because the comma shows...", "that Grandma is being spoken to", "that the sentence is a list", "that the sentence is a question"],
      ["'Flying planes can be dangerous' is ambiguous because...", "planes in flight or the act of piloting could be meant", "planes are always dangerous", "the word 'flying' is rude"],
      ["What is the best way to fix an ambiguous pronoun like 'it' or 'she'?", "Replace the pronoun with the noun it stands for", "Add more pronouns", "Remove all verbs"]],
    ["Read the sentence twice and try to find a second way to read it.", "Ambiguity usually comes from a pronoun with two possible targets, a phrase that could attach to two words, or a word with two meanings.", "Example: 'Maya told Lia she won' could mean Maya won or Lia won, because <i>she</i> is unclear. Now do yours."]),
    S("❓", ["When a sentence has two meanings", "A sentence is <b>ambiguous</b> if it can be understood in more than one way."],
      ["Causes", "A pronoun with two targets ('Maya told Lia she won').<br>A phrase that attaches in two places ('the man with the telescope').<br>A word with two meanings."],
      ["Fix it", "Reword so only one meaning is possible, or replace the pronoun with the noun."])));

  L20.push(mk("Gothic, magical realism and more", rq([
      ["A story with gloomy settings, mystery and a feeling of dread is called...", "gothic fiction", "a biography", "a how-to guide"],
      ["<i>Frankenstein</i> by Mary Shelley is a famous example of...", "gothic fiction with early science fiction", "a modern comedy", "a travel diary"],
      ["In <b>magical realism</b>, magical events are...", "treated as ordinary parts of everyday life", "explained by science at the end", "always a dream"],
      ["<i>One Hundred Years of Solitude</i> by Gabriel Garcia Marquez is a famous example of...", "magical realism", "a mystery novel", "a field guide"],
      ["A <b>bildungsroman</b> is a novel about...", "a young person growing up and learning about life", "a detective solving a crime", "a trip through space"],
      ["Which novel is a coming-of-age story?", "To Kill a Mockingbird", "The Time Machine", "Dracula"],
      ["<i>The Time Machine</i> by H. G. Wells is a classic of...", "science fiction", "poetry", "biography"],
      ["What separates magical realism from fantasy?", "The magic appears in a realistic setting and is treated as normal", "It has no characters", "It takes place only in space"],
      ["A creepy castle and a haunted hallway are typical of...", "gothic fiction", "science fiction", "realistic fiction"]],
    ["Think about the setting and mood, and how the story treats strange events.", "Gothic = gloom and dread. Magical realism = magic inside a normal world. Bildungsroman = growing up. Science fiction = imagined science and technology.", "Example: a novel where a girl grows from child to young woman while learning hard lessons about life fits the 'growing up' kind. Now do yours."]),
    S("📚", ["More fiction genres", "Genres are families of stories with shared features."],
      ["Four genres", "<b>Gothic</b>: gloomy settings, mystery, dread (<i>Frankenstein</i>)<br><b>Magical realism</b>: magic treated as normal (<i>One Hundred Years of Solitude</i>)<br><b>Bildungsroman</b>: coming of age (<i>To Kill a Mockingbird</i>)<br><b>Science fiction</b>: imagined science (<i>The Time Machine</i>)"],
      ["Tip", "Many books mix genres. Ask which features stand out the most."])));

  L20.push(mk("Unusual ways to tell a story", cl("<i>{}</i><br><br>Which storytelling technique is this?", ["stream of consciousness", "epistolary form (letters or diary)", "second-person narration"], [
      ["and then the bus and the smell of rain and I forgot my keys did I lock the door the blue door like the sea like grandma's kitchen", 0],
      ["Tired, hungry, wait, was that the bell, no, coffee, I need coffee, did I pack my, where did I put", 0],
      ["Dear Amy, I arrived safely. The ship was cold and the sea was gray. Write soon. Your brother, Tom.", 1],
      ["June 3. Dear diary, the new neighbors moved in today. Mother says I must be polite.", 1],
      ["From: Ben. To: Jo. Subject: The lost key. Hi Jo, I found it under the porch.", 1],
      ["You open the door. You step into a dark hallway, and you hear something move.", 2],
      ["You wake up late. You grab your bag and run for the bus.", 2],
      ["You are the new student, and nobody knows your name.", 2]],
    ["Ask how the writer is speaking: as a rush of thoughts, as a letter or diary, or as 'you'?", "Stream of consciousness copies the flow of a mind, with little punctuation. Epistolary stories are told through letters, diaries or messages. Second-person narration speaks to 'you'.", "Example: 'Dear Mom, camp is great. Love, Kai' is written as a message, so it is told through letters. Now do yours."]),
    S("✉️", ["Beyond the usual narrator", "Authors sometimes break the usual 'he said, she said' style."],
      ["Three styles", "<b>Stream of consciousness</b>: the flow of thoughts, often without punctuation<br><b>Epistolary</b>: told through letters, diary entries or messages<br><b>Second person</b>: the narrator calls the reader 'you'"],
      ["Why", "These styles put the reader inside a mind, inside a private record, or inside the story itself."])));

  const POEMS = {
    A: "The clock above the kitchen door<br>still ticks, though no one's home.<br>Its hands go round the empty floor,<br>a patient, steady drone.",
    B: "I begged the rain to stay away,<br>to spare my picnic day.<br>But when it drummed the roof like drums,<br>I wished it long to stay.",
    C: "The old oak holds its branches wide,<br>a roof for every bird.<br>It asks for nothing, takes no side,<br>and speaks without a word.",
    D: "Day one: the hill was steep as a wall.<br>Day nine: it was only a hill.<br>By day thirty I ran it all,<br>and wished the hill were taller still."
  };
  const poemRow = (p, q, a, w1, w2) => ["<i>" + POEMS[p] + "</i><br><br>" + q, a, w1, w2];
  L20.push(mk("Close reading a poem", rq([
      poemRow("A", "The mood of this poem is mostly...", "lonely and quiet", "joyful and busy", "angry and loud"),
      poemRow("A", "Calling the clock <i>patient</i> is an example of...", "personification", "alliteration", "hyperbole"),
      poemRow("B", "How does the speaker's feeling change?", "from annoyance to delight", "from joy to anger", "It does not change."),
      poemRow("B", "In line 3, the word <b>But</b> signals...", "a turn in the poem", "a rhyme", "the title"),
      poemRow("C", "The oak is portrayed as...", "generous and calm", "greedy and loud", "weak and afraid"),
      poemRow("C", "What is the rhyme scheme of this poem?", "ABAB", "AABB", "ABCB"),
      poemRow("D", "The main idea of this poem is that...", "practice makes hard things feel easier", "hills are dangerous", "running is boring"),
      poemRow("D", "How does the speaker feel about the hill at the end?", "confident and ready for more", "afraid", "bored")],
    ["Read the poem aloud twice. Notice the title, the speaker, the images and any word that signals a change.", "Ask: What is happening? What feeling do the images give? Does the speaker's attitude change, and which word shows it? What larger idea could the poem be about?", "Example: in 'The kite pulled hard, then rose, and my worry rose with it, and flew', the feeling moves from worry to freedom. Now do yours."]),
    S("🔎", ["How to read a poem closely", "Close reading means looking at the details to find the meaning."],
      ["Steps", "1. Read it aloud.<br>2. Who is speaking?<br>3. What images and words stand out?<br>4. Where does the mood <b>turn</b> (often at <i>but</i> or <i>yet</i>)?<br>5. What is the big idea?"],
      ["Tip", "The title is a clue. Rhyme scheme: give each new end-sound a letter. A, B, A, B means lines 1 and 3 rhyme, and lines 2 and 4 rhyme."])));

  const TS = ["chronological order", "compare and contrast", "cause and effect", "problem and solution", "description"];
  L20.push(mk("How a passage is organized", cl("<i>{}</i><br><br>How is this passage organized?", TS, [
      ["First, settlers arrived. Then the town built a mill. Later, a railroad connected it to the city.", 0],
      ["In 1990 the school opened. By 2005 it had doubled in size. Today it has 900 students.", 0],
      ["Frogs and toads are both amphibians, but frogs have smooth skin while toads have bumpy skin.", 1],
      ["Unlike a laptop, a tablet has no keyboard; however, both can browse the web.", 1],
      ["Because the river flooded, the crops were ruined, and prices rose.", 2],
      ["The ice melted early, so the lake warmed quickly, which led to more algae.", 2],
      ["Many students struggle to wake up on time. One fix is to move bedtime earlier.", 3],
      ["The park had too little shade. The city solved it by planting forty trees.", 3],
      ["The attic was dusty and dim, with cobwebs in every corner and a single round window.", 4],
      ["The cat was small and gray, with white paws, green eyes and a long, curved tail.", 4]],
    ["Look for signal words and ask what the passage mostly does: order events, compare, explain why, solve, or describe.", "Signals: <i>first, then, later</i> (time order); <i>unlike, both, however</i> (compare/contrast); <i>because, so, led to</i> (cause/effect); <i>problem, solution, fix</i>; sensory details (description).", "Example: 'Unlike a lake, an ocean is salty, but both hold fish' compares two things. Now do yours."]),
    S("🧭", ["Five text structures", "Writers organize a passage in a pattern. Knowing it helps you follow and remember."],
      ["The patterns", "<b>Chronological</b>: events in time order<br><b>Compare/contrast</b>: how things are alike and different<br><b>Cause/effect</b>: why things happen and what follows<br><b>Problem/solution</b><br><b>Description</b>: details about a person, place or thing"],
      ["Signal words", "<i>first, then</i> | <i>unlike, both</i> | <i>because, so</i> | <i>problem, fix</i>"])));

  L20.push(mk("Surveys and samples", rq([
      ["A school surveys only the basketball team about favorite sports. The problem is that the sample...", "is not representative", "is too big", "has too short a question"],
      ["Which is the best way to get a fair sample of all 900 students?", "Choose 50 names at random from the whole class list", "Ask 50 friends", "Ask the first 50 students at the gym"],
      ["The question 'Don't you agree that homework is awful?' is...", "a leading question", "a random question", "a fair question"],
      ["Why is a larger sample usually more reliable?", "Chance variation shrinks as the sample grows", "Large samples are always right", "Large samples are cheaper"],
      ["A poll of 10 people says '80% love pizza.' Why be careful?", "The sample is tiny", "Pizza is not popular", "Percentages cannot be used"],
      ["Call-in polls are biased because...", "mostly people with strong opinions respond", "everyone responds equally", "they only ask short questions"],
      ["In statistics, the <b>population</b> is...", "the whole group you want to learn about", "the people who answered", "a random number"],
      ["In statistics, a <b>sample</b> is...", "a smaller part of the group that is studied", "the whole group", "a prediction"]],
    ["Ask who was asked, how they were chosen, and how many there were.", "A fair sample is chosen at random from the whole group and is large enough. A biased sample leaves some people out, and a leading question pushes the answer.", "Example: asking only people at a pet store whether they like pets gives a biased sample. Now do yours."]),
    S("📋", ["Can you trust the survey?", "A survey studies a small <b>sample</b> to learn about a larger <b>population</b>."],
      ["Good samples", "Chosen <b>at random</b>, from the whole group, and big enough."],
      ["Warning signs", "Sample from only one place or type of person<br>Volunteer or call-in polls<br>Leading questions ('Don't you agree...?')<br>Very small samples"])));

  const TB = [
    { h: ["Club", "Books read"], n: ["Reading Club", "Chess Club", "Art Club", "Robotics Club", "Drama Club", "Choir"] },
    { h: ["Team", "Points scored"], n: ["Hawks", "Wolves", "Falcons", "Tigers", "Comets", "Rockets"] },
    { h: ["Class", "Cans collected"], n: ["Room 4", "Room 7", "Room 9", "Room 12", "Room 15", "Room 18"] }];
  const tbMake = () => {
    const t = pick(TB), names = shuf(t.n).slice(0, 4);
    const vals = shuf([12, 14, 17, 19, 22, 25, 28, 31, 34, 38, 41, 45, 49, 53, 57]).slice(0, 4);
    const tbl = "<table style='margin:6px auto;border-collapse:collapse'><tr><th style='border:1px solid #888;padding:2px 12px'>" + t.h[0] + "</th><th style='border:1px solid #888;padding:2px 12px'>" + t.h[1] + "</th></tr>" +
      names.map((n, i) => "<tr><td style='border:1px solid #888;padding:2px 12px'>" + n + "</td><td style='border:1px solid #888;padding:2px 12px;text-align:center'>" + vals[i] + "</td></tr>").join("") + "</table>";
    const k = ri(1, 5);
    const order = vals.map((v, i) => i).sort((a, b) => vals[b] - vals[a]);
    if (k <= 2) {
      const top = k === 1, i = top ? order[0] : order[3];
      return { visual: "📊", text: tbl + "Which " + t.h[0].toLowerCase() + " has the <b>" + (top ? "highest" : "lowest") + "</b> number?", choices: shuf(names.slice()), answer: names[i],
        hints: ["Scan only the number column first. Ignore the names for now.", "Find the " + (top ? "biggest" : "smallest") + " number, then slide your eye across to the name beside it.", "Example: in a table with Mia 8, Leo 12 and Ana 5, find the number you want, then read the name next to it. Now do yours."] };
    }
    if (k === 3) {
      const a = order[0], b = order[1];
      return { visual: "📊", text: tbl + "How many more does <b>" + names[a] + "</b> have than <b>" + names[b] + "</b>? (type a number)", answer: vals[a] - vals[b],
        hints: ["Find both rows in the table.", "Subtract the smaller number from the larger number.", "Example: if one row says 20 and another says 14, you subtract the smaller from the larger. Now do yours."] };
    }
    if (k === 4) {
      return { visual: "📊", text: tbl + "What is the <b>total</b> of all four numbers? (type a number)", answer: vals.reduce((x, y) => x + y, 0),
        hints: ["Total means add everything together.", "Add one number at a time and keep a running total.", "Example: for 4, 6 and 9, do 4 + 6 = 10, then 10 + 9 = 19. Now do yours with four numbers."] };
    }
    const a = order[0], c = order[3];
    return { visual: "📊", text: tbl + "What is the <b>range</b> (highest minus lowest)? (type a number)", answer: vals[a] - vals[c],
      hints: ["The range tells how spread out the numbers are.", "Find the biggest and smallest numbers, then subtract.", "Example: for 5, 12 and 9, the biggest and smallest numbers are used. Now do yours."] };
  };
  L20.push(mk("Reading tables", tbMake,
    S("📊", ["Tables organize facts", "A table has <b>rows</b> (across) and <b>columns</b> (down). Headings tell you what each column means."],
      ["How to read", "1. Read the title and headings.<br>2. Find the row you need.<br>3. Slide across to the column you need.<br>4. Check the units."],
      ["Questions", "<b>Highest/lowest</b>: scan one column.<br><b>Difference</b>: subtract.<br><b>Total</b>: add.<br><b>Range</b>: highest minus lowest."])));

  L20.push(mk("Reading rules and formal texts", rq([
      ["A rule says: 'Entries must be submitted by May 1. Late entries will not be accepted unless a teacher approves.' Can a late entry ever be accepted?", "Yes, with a teacher's approval", "No, never", "Yes, if the student asks"],
      ["'Participants <b>shall</b> wear a badge.' Here <i>shall</i> means...", "it is required", "it is only allowed", "it is a guess"],
      ["'Visitors <b>may</b> bring a camera.' This means...", "it is allowed but not required", "it is required", "it is forbidden"],
      ["'Visitors <b>may not</b> bring food inside.' This means...", "it is forbidden", "it is allowed", "it is required"],
      ["In a contract, 'the <b>parties</b>' are...", "the people or groups making the agreement", "the celebrations", "the pages"],
      ["'Refunds are given <b>provided that</b> the receipt is shown.' When do you get a refund?", "only if you show the receipt", "always", "never"],
      ["A contract that is <b>void</b> is...", "not legally valid", "very long", "signed twice"],
      ["The <b>fine print</b> of an agreement is...", "small-type details about conditions and limits", "the title page", "the signature"],
      ["'The offer ends <b>no later than</b> June 5.' What is the last day?", "June 5", "June 4", "June 6"]],
    ["Read slowly. Underline words like must, may, unless, provided that, and no later than.", "Small words decide the meaning. <i>Must/shall</i> = required. <i>May</i> = allowed. <i>May not</i> = forbidden. <i>Unless</i> and <i>provided that</i> add conditions.", "Example: 'You may park here unless a sign says otherwise' means parking is allowed except when a sign forbids it. Now do yours."]),
    S("📄", ["Small words, big meaning", "Rules, contracts and terms use careful words."],
      ["Key words", "<b>must / shall</b>: required<br><b>may</b>: allowed<br><b>may not / shall not</b>: forbidden<br><b>unless</b>: except if<br><b>provided that</b>: only if<br><b>void</b>: not valid"],
      ["Tip", "Read the fine print. Clicking 'I agree' means you accept the conditions."])));

  L20.push(mk("Building a body paragraph", rq([
      ["In a paragraph, the <b>topic sentence</b> usually...", "states the main point of the paragraph", "gives the final example", "quotes a source"],
      ["In a paragraph about kindness: 'In the story, Lena shares her lunch with a stranger.' This is...", "evidence", "a topic sentence", "a conclusion about the whole essay"],
      ["'This shows that real kindness costs little but means a lot.' This sentence is...", "commentary", "evidence", "a title"],
      ["Which is the strongest topic sentence for a paragraph about school start times?", "Later start times help teens get more sleep and focus better.", "School starts in the morning.", "Sleep is a thing people do."],
      ["A transition sentence at the end of a paragraph...", "links to the next paragraph's idea", "repeats the title", "adds an unrelated topic"],
      ["A paragraph that jumps between different topics lacks...", "unity", "rhyme", "a title"],
      ["Which is evidence?", "Last year, attendance rose from 82% to 91% after the change.", "I think it is great.", "Everyone knows it is better."],
      ["What does <b>commentary</b> do?", "explains how the evidence supports the point", "repeats the evidence word for word", "starts a new topic"]],
    ["Ask what job the sentence does: make the point, prove it, explain it, or connect to the next idea.", "A strong paragraph has a topic sentence (point), evidence (facts, quotes, examples), commentary (explanation of how the evidence proves the point), and sometimes a transition.", "Example: 'Dogs are loyal. (point) One dog waited at the station for years. (evidence) This shows loyalty can last. (commentary)'. Now do yours."]),
    S("🧱", ["Parts of a paragraph", "A good body paragraph is built like a small argument."],
      ["The parts", "<b>Topic sentence</b>: the point<br><b>Evidence</b>: facts, quotes, examples<br><b>Commentary</b>: explains how the evidence proves the point<br><b>Transition</b>: leads to the next idea"],
      ["Unity", "Everything in a paragraph should support the one point in the topic sentence."])));

  const SV = ["a dependent clause", "a participial phrase", "a prepositional phrase", "a single adverb"];
  L20.push(mk("Sentence variety", alt(
      cl("How does this sentence begin?<br><i>{}</i>", SV, [
        ["Because the bridge was closed, we took the ferry.", 0],
        ["When the bell rang, everyone cheered.", 0],
        ["Laughing loudly, the children ran outside.", 1],
        ["Tired from the climb, Maya sat down.", 1],
        ["In the morning, the fog lifted.", 2],
        ["After lunch, we walked home.", 2],
        ["Quickly, she grabbed her bag.", 3],
        ["Suddenly, the lights went out.", 3]],
        ["Look at the words before the first comma. Is there a subject and verb, an -ing/-ed word, a preposition like in or after, or one lone word?", "A dependent clause has its own subject and verb but cannot stand alone (because, when, if). A participial phrase starts with an -ing or -ed word. A prepositional phrase starts with a preposition.", "Example: 'Singing softly, he painted the fence' begins with a word ending in -ing that describes him. Now do yours."]),
      rq([
        ["A string of many very short sentences often feels...", "choppy", "smooth", "formal"],
        ["A short sentence after several long ones is often used to...", "create emphasis", "cut the paragraph", "add a rhyme"],
        ["A long sentence with many phrases can create a feeling of...", "flowing movement", "sudden shock", "silence"],
        ["Why vary how sentences begin?", "To avoid a monotonous rhythm", "To make sentences longer", "To remove verbs"]],
        ["Say the sentences aloud and listen to the rhythm.", "Short sentences punch. Long ones flow. Mixing them keeps readers interested.", "Example: 'The storm came. It was loud. It was dark.' sounds repetitive, but one long sentence can blend them. Now do yours."])),
    S("🎼", ["Rhythm in writing", "If every sentence starts the same way, writing sounds like a drum with one beat."],
      ["Ways to begin", "<b>Dependent clause</b>: Because it rained, ...<br><b>Participial phrase</b>: Laughing loudly, ...<br><b>Prepositional phrase</b>: In the morning, ...<br><b>Adverb</b>: Quickly, ..."],
      ["Length", "Mix short and long sentences. A short sentence after long ones lands like a drumbeat."])));

  L20.push(mk("Premises and conclusions", rq([
      ["Find the conclusion: 'Because the library is quiet and has free Wi-Fi, it is the best place to study.'", "It is the best place to study.", "The library is quiet.", "The library has free Wi-Fi."],
      ["Which word usually signals a conclusion?", "therefore", "because", "since"],
      ["Which word usually signals a reason (premise)?", "because", "therefore", "thus"],
      ["Find the conclusion: 'Cats are mammals, and all mammals are warm-blooded, so cats are warm-blooded.'", "cats are warm-blooded", "cats are mammals", "all mammals are warm-blooded"],
      ["Find a premise: 'We should recycle more, since landfills are filling up.'", "landfills are filling up", "we should recycle more", "recycling is fun"],
      ["In 'Our team practices daily; thus, we will probably win,' the conclusion is...", "we will probably win", "our team practices daily", "thus"],
      ["An argument is made of...", "premises that support a conclusion", "only opinions", "only questions"],
      ["Which sentence is the main conclusion? 'Homework should be shorter. Students need sleep, and tired students learn less.'", "Homework should be shorter.", "Students need sleep.", "Tired students learn less."]],
    ["Ask: which statement is the claim, and which statements are the reasons for it?", "Look for signal words. <i>Because, since, for</i> introduce reasons. <i>Therefore, so, thus, hence</i> introduce the conclusion.", "Example: 'It is cold, so I will wear a coat.' The reason is that it is cold, and the claim comes after the word <i>so</i>. Now do yours."]),
    S("🧮", ["Reasons and claims", "An argument has <b>premises</b> (reasons) and a <b>conclusion</b> (the claim they support)."],
      ["Signal words", "Premise signals: <b>because, since, for</b><br>Conclusion signals: <b>therefore, so, thus, hence</b>"],
      ["Tip", "Ask: <i>What is the writer trying to convince me of?</i> That is the conclusion. The rest are the premises."])));

  L20.push(mk("Reading a script", rq([
      ["In a script, words in brackets like [she slams the door] are...", "stage directions", "the title", "the audience's lines"],
      ["The name in capital letters before a line of a script shows...", "who is speaking", "where the scene happens", "how long the scene is"],
      ["Stage direction: <b>Exit</b> means a character...", "leaves the stage", "enters the stage", "starts singing"],
      ["An <b>act</b> in a play is made of several...", "scenes", "paragraphs", "stanzas"],
      ["<b>Offstage</b> means...", "out of the audience's sight", "in front of the audience", "in the middle of the stage"],
      ["<b>Downstage</b> is the part of the stage...", "closest to the audience", "farthest from the audience", "behind the curtain"],
      ["The <b>dramatis personae</b> is...", "the list of characters", "the list of props", "the audience"],
      ["A playwright uses stage directions to...", "describe actions, settings and how lines are spoken", "give the plot summary", "name the audience"]],
    ["Think about what an actor, director or reader needs to know: who speaks, what happens, and where.", "Scripts have speaker names, dialogue, stage directions in brackets or italics, and acts and scenes. Stage terms such as <i>upstage</i> and <i>downstage</i> describe positions on the stage.", "Example: '(whispering)' before a line tells the actor how to say it. Now do yours."]),
    S("🎬", ["How scripts are laid out", "A play is mostly <b>dialogue</b> with <b>stage directions</b> that guide actors."],
      ["Parts", "Speaker's NAME in capitals<br>[Stage directions] in brackets or italics<br><b>Act</b> = big part; <b>scene</b> = smaller part<br><b>Enter / Exit</b>: coming on and off stage"],
      ["Positions", "<b>Downstage</b> = near the audience. <b>Upstage</b> = far from the audience. <b>Offstage</b> = out of sight."])));

  L20.push(MIX("Mixed practice", L20[0], L20[3], L20[4], L20[5], L20[8], L20[10]));
  L20.push(MIX("Level 20 Challenge", L20[1], L20[2], L20[6], L20[7], L20[9], L20[11], L20[12], L20[13], L20[14], L20[15], L20[16], L20[17]));

  // ================= LEVEL 21 =================
  L21.push(mk("Latin roots: fort, stell, manu, nav, aqu", rq([
      ["The Latin root <b>fort</b> is in <i>fortify</i>, <i>fortitude</i> and <i>fortress</i>. What does it mean?", "strong", "star", "ship"],
      ["The Latin root <b>stell</b> is in <i>constellation</i>, <i>stellar</i> and <i>interstellar</i>. What does it mean?", "star", "hand", "water"],
      ["The Latin root <b>manu</b> is in <i>manual</i>, <i>manufacture</i> and <i>manuscript</i>. What does it mean?", "hand", "strong", "ship"],
      ["The Latin root <b>nav</b> is in <i>navy</i>, <i>navigate</i> and <i>naval</i>. What does it mean?", "ship", "water", "star"],
      ["The Latin root <b>aqu</b> is in <i>aquarium</i>, <i>aquatic</i> and <i>aqueduct</i>. What does it mean?", "water", "hand", "strong"],
      ["To <i>fortify</i> a wall is to make it...", "stronger", "taller only", "invisible"],
      ["A <i>constellation</i> is a pattern of...", "stars", "clouds", "islands"],
      ["A <i>manuscript</i> was originally...", "written by hand", "printed by machine", "sung"],
      ["<i>Interstellar</i> travel is travel...", "between the stars", "under the sea", "along a coast"],
      ["A <i>navigator</i> helps steer a...", "ship or vehicle", "garden", "classroom"],
      ["An <i>aqueduct</i> carries...", "water", "light", "sound"],
      ["<i>Fortitude</i> is mental...", "strength in hard times", "weakness", "boredom"]],
    ROOTH("Example: <b>lun</b> is in <i>lunar</i> and <i>lunar eclipse</i>. Both are about the moon, so <b>lun</b> means 'moon'.")),
    S("🧩", ["More Latin roots", "Five more <b>Latin roots</b> for science and everyday words."],
      ["The roots", "<b>fort</b> = strong (<b>fort</b>ress)<br><b>stell</b> = star (con<b>stell</b>ation)<br><b>manu</b> = hand (<b>manu</b>al)<br><b>nav</b> = ship (<b>nav</b>igate)<br><b>aqu</b> = water (<b>aqu</b>arium)"],
      ["Use them", "<i>Inter</i> (between) + <i>stell</i> + <i>ar</i> = <i>interstellar</i>, 'between the stars'. <i>Manu</i> + <i>script</i> (written) = <i>manuscript</i>, 'written by hand'."])));

  L21.push(mk("Greek roots: syn, macro, hetero, bibli, chrom", rq([
      ["The Greek prefix/root <b>syn/sym</b> is in <i>synonym</i>, <i>synthesis</i> and <i>sympathy</i>. What does it mean?", "together or with", "large", "book"],
      ["The Greek root <b>macro</b> is in <i>macroeconomics</i> and <i>macrocosm</i>. What does it mean?", "large", "together", "color"],
      ["The Greek root <b>hetero</b> is in <i>heterogeneous</i> and <i>heterodox</i>. What does it mean?", "different", "large", "book"],
      ["The Greek root <b>bibli</b> is in <i>bibliography</i> and <i>bibliophile</i>. What does it mean?", "book", "different", "color"],
      ["The Greek root <b>chrom</b> is in <i>monochrome</i> and <i>chromatic</i>. What does it mean?", "color", "book", "together"],
      ["A <i>bibliography</i> is a list of...", "books and sources", "colors", "places"],
      ["<i>Monochrome</i> means having one...", "color", "book", "size"],
      ["<i>Sympathy</i> is feeling ___ someone.", "with", "against", "far from"],
      ["<i>Macroeconomics</i> studies the economy as a...", "large whole", "tiny part", "color chart"],
      ["A <i>heterogeneous</i> group is made of ___ kinds.", "different", "identical", "tiny"],
      ["A <i>bibliophile</i> loves...", "books", "paints", "boats"],
      ["<i>Synthesis</i> means putting parts...", "together", "apart", "away"]],
    ROOTH("Example: <b>micro</b> is in <i>microscope</i> and <i>microbe</i>. Both involve something tiny, so <b>micro</b> means 'small'.")),
    S("🏛️", ["More Greek roots", "These <b>Greek roots</b> appear in school and library words."],
      ["The roots", "<b>syn/sym</b> = together (<b>syn</b>thesis, <b>sym</b>pathy)<br><b>macro</b> = large (<b>macro</b>economics)<br><b>hetero</b> = different (<b>hetero</b>geneous)<br><b>bibli</b> = book (<b>bibli</b>ography)<br><b>chrom</b> = color (mono<b>chrom</b>e)"],
      ["Use them", "<i>Mono</i> (one) + <i>chrom</i> = one color. <i>Biblio</i> + <i>phile</i> (lover) = a book lover."])));

  const SCL = [["annoyed", "angry", "furious"], ["warm", "hot", "scorching"], ["chilly", "cold", "freezing"], ["damp", "wet", "soaked"], ["nervous", "anxious", "terrified"], ["large", "huge", "gigantic"], ["pleased", "delighted", "ecstatic"], ["tired", "weary", "exhausted"]];
  const sclMake = () => {
    const r = pick(SCL), k = ri(0, 2);
    const text = ["Which word is the <b>strongest</b>?", "Which word is the <b>weakest</b>?", "Which word is in the <b>middle</b> in strength?"][k];
    return { text: text, choices: shuf(r.slice()), answer: k === 0 ? r[2] : k === 1 ? r[0] : r[1],
      hints: ["All three words are about the same thing. Imagine a dial from a little to a lot.", "Picture each word on a line from mild to extreme. Which sits at the end, and which sits in the center?", "Example: <i>cool, chilly, frozen</i> run from mild to extreme. Cool is the weakest and frozen the strongest. Now do yours."] };
  };
  L21.push(mk("Word scales", sclMake,
    S("🌡️", ["Words on a dial", "Many words describe the same thing at different strengths."],
      ["A scale", "annoyed → angry → <b>furious</b><br>warm → hot → <b>scorching</b><br>tired → weary → <b>exhausted</b>"],
      ["Why it matters", "Choosing the right strength is the difference between <i>annoyed</i> and <i>furious</i>. Exact words make writing truthful and vivid."])));

  L21.push(mk("Periodic and cumulative sentences", cl("<i>{}</i><br><br>What kind of sentence is this?", ["periodic sentence", "cumulative sentence", "short simple sentence"], [
      ["When the final bell rang and the doors burst open, the students cheered.", 0],
      ["Despite the rain, the cold and the long road, we reached the summit.", 0],
      ["After years of training and one last tough season, she finally won.", 0],
      ["We reached the summit, tired and cold, with the clouds spread below us.", 1],
      ["The students cheered, shouting and waving as the doors burst open.", 1],
      ["She finally won, after years of training and one last tough season.", 1],
      ["The dog barked.", 2],
      ["Rain fell.", 2],
      ["We left.", 2]],
    ["Find the main clause (the part that could stand alone). Is it at the very end, at the start, or is the whole sentence tiny?", "A periodic sentence saves its main idea until the end for suspense. A cumulative sentence starts with the main idea and adds details after it.", "Example: 'Though weary, hungry and far from home, they pressed on.' keeps the main idea for the end. Now do yours."]),
    S("🎢", ["Where does the main idea go?", "Writers choose where to place the main clause."],
      ["Two patterns", "<b>Periodic</b>: details first, main idea last (suspense): 'After years of training, she finally won.'<br><b>Cumulative</b>: main idea first, details added: 'She finally won, after years of training.'"],
      ["Effect", "Periodic sentences build suspense. Cumulative sentences feel natural and flowing. A short simple sentence hits hard."])));

  L21.push(mk("Literary movements", rq([
      ["Which movement of the early 1800s valued emotion, imagination and nature?", "Romanticism", "Realism", "Modernism"],
      ["Which movement tried to show ordinary life as it really is?", "Realism", "Romanticism", "Transcendentalism"],
      ["Which early 1900s movement broke with tradition by experimenting with form, such as stream of consciousness?", "Modernism", "Realism", "Romanticism"],
      ["<i>Walden</i> by Henry David Thoreau is linked with...", "Transcendentalism", "Modernism", "Gothic fiction"],
      ["The Harlem Renaissance of the 1920s celebrated...", "Black art, music and literature", "medieval knights", "space travel"],
      ["Langston Hughes was a major poet of the...", "Harlem Renaissance", "Romantic period", "Medieval period"],
      ["Virginia Woolf is associated with...", "Modernism", "Romanticism", "Realism"],
      ["William Wordsworth wrote about nature and feeling and belongs to...", "Romanticism", "Modernism", "Realism"],
      ["Ralph Waldo Emerson, who urged people to trust themselves, was a leader of...", "Transcendentalism", "Realism", "Modernism"]],
    ["Think about the time period and what the movement cared about most.", "Romanticism: feeling and nature (early 1800s). Realism: everyday life (mid 1800s). Transcendentalism: self-reliance and nature (American, 1800s). Modernism: experiments (early 1900s). Harlem Renaissance: 1920s Black arts.", "Example: Mark Twain wrote about ordinary people in believable settings, which is the focus of one of these movements. Now do yours."]),
    S("🕰️", ["Eras of writing", "Literature changes with each era. A <b>literary movement</b> is a group of writers sharing ideas and style."],
      ["Five movements", "<b>Romanticism</b>: feeling, imagination, nature (Wordsworth)<br><b>Realism</b>: ordinary life (Mark Twain)<br><b>Transcendentalism</b>: self-reliance, nature (Emerson, Thoreau)<br><b>Modernism</b>: experiments, new forms (Virginia Woolf)<br><b>Harlem Renaissance</b>: 1920s Black arts (Langston Hughes)"],
      ["Tip", "Match the movement to its big idea and its time."])));

  L21.push(mk("Kinds of literary nonfiction", cl("<i>{}</i><br><br>What kind of nonfiction is this?", ["personal essay", "opinion column", "profile", "speech"], [
      ["Last summer, learning to fish with my grandfather taught me more about patience than any class ever did.", 0],
      ["I have always been a terrible dancer, and I have finally made peace with it.", 0],
      ["Our town should ban single-use plastic bags, and the council must act now.", 1],
      ["It is time to give our schools more funding for music.", 1],
      ["At 78, Mrs. Alvarez still bakes bread at 4 a.m. for the whole neighborhood, as she has for fifty years.", 2],
      ["Meet the teenager who built a telescope from scrap parts.", 2],
      ["Friends, classmates, teachers: today we celebrate what we have built together.", 3],
      ["Ladies and gentlemen, thank you for joining us this evening.", 3]],
    ["Ask who is speaking and why: sharing a personal experience, arguing a position, describing another person, or addressing a crowd?", "A personal essay reflects on the writer's own life. An opinion column argues. A profile describes another person. A speech talks directly to a live audience.", "Example: 'My neighbor has repaired bikes for kids for thirty years' describes someone else, so it is a profile. Now do yours."]),
    S("✒️", ["True stories, told with style", "<b>Literary nonfiction</b> uses storytelling and voice to share real things."],
      ["Forms", "<b>Personal essay</b>: reflection on your own experience<br><b>Opinion column / op-ed</b>: an argument<br><b>Profile</b>: a portrait of a person<br><b>Speech</b>: spoken to an audience"],
      ["Clues", "'I' and memory → personal essay. 'Should' and 'must' → opinion. A person's life and work → profile. 'Friends, ...' → speech."])));

  L21.push(mk("Hedging and qualifiers", rq([
      ["Which sentence is the most cautious claim?", "The data suggest that sleep may improve memory.", "Sleep improves memory in every person.", "Sleep proves memory always works."],
      ["Why do scientists write 'the data suggest' instead of 'the data prove'?", "One study rarely proves something with total certainty", "They do not know grammar", "They want shorter reports"],
      ["Which word is a hedge?", "possibly", "always", "never"],
      ["Which claim overstates the evidence?", "This proves that all teenagers need more sleep.", "This suggests many teenagers may need more sleep.", "This is consistent with teens needing more sleep."],
      ["'The results <b>appear</b> to show a link.' The word <i>appear</i> makes the claim...", "less certain", "more certain", "angrier"],
      ["Which pair of words is hedging?", "may, likely", "always, never", "must, definitely"],
      ["A study of 12 students finds that a new method works. The best cautious statement is...", "The method may help, but a larger study is needed.", "The method works for everyone.", "The method is proven."],
      ["Too much hedging in writing can make it...", "vague and unconvincing", "too confident", "too poetic"]],
    ["Ask how sure the writer sounds and how strong the evidence is.", "Hedges such as <i>may, might, suggests, appears, likely, possibly</i> soften a claim. Absolute words such as <i>always, never, proves</i> make claims very strong.", "Example: 'This will cure everyone' is absolute; 'This might help some people' is hedged. Now do yours."]),
    S("🪁", ["Saying how sure you are", "Careful writers match the strength of a claim to the strength of the evidence."],
      ["Hedges", "<b>may, might, could, suggests, appears, likely, possibly</b> = cautious<br><b>always, never, proves, all, everyone</b> = absolute"],
      ["Balance", "One small study can <i>suggest</i> but rarely <i>prove</i>. But too many hedges make writing vague, so use them where the evidence is thin."])));

  L21.push(mk("Scholarly and popular sources", rq([
      ["A <b>peer-reviewed</b> article has been...", "checked by other experts before publication", "printed in color", "written by a famous person"],
      ["Which source is most likely scholarly?", "a journal article with citations and an abstract", "a celebrity gossip magazine", "a social media post"],
      ["A popular magazine article is usually written for...", "general readers", "only experts", "only young children"],
      ["Which clue suggests a source is scholarly?", "a bibliography and the authors' university affiliations", "bright ads and clickbait headlines", "no author listed"],
      ["A <b>secondary source</b> is...", "a work that analyzes or summarizes primary sources", "a diary written at the time", "a photograph taken at the event"],
      ["Why do scholars cite sources?", "so readers can check the evidence", "to make writing longer", "to hide their ideas"],
      ["A <b>tertiary source</b> such as an encyclopedia...", "summarizes information from other sources", "reports new experiments", "contains original diaries"],
      ["Where is the best place to find peer-reviewed research?", "a library database of academic journals", "an advertisement", "a comment section"]],
    ["Ask who wrote it, who checked it, and who it was written for.", "Scholarly sources have named expert authors, citations and peer review. Popular sources aim at general readers and may not show their evidence.", "Example: a magazine feature with no sources listed is popular, while an article with a long reference list is scholarly. Now do yours."]),
    S("🎓", ["Choosing strong sources", "Not all sources are equal. Researchers prefer <b>scholarly</b> sources."],
      ["Scholarly clues", "Expert author with a university or institute<br>Abstract and references<br><b>Peer review</b>: other experts check it before it is published"],
      ["Source types", "<b>Primary</b>: original evidence (diary, data)<br><b>Secondary</b>: analysis of primary sources<br><b>Tertiary</b>: summaries (encyclopedias)"])));

  L21.push(mk("Reading images, ads and cartoons", rq([
      ["In an ad, a close-up of a smiling face is meant to...", "create a positive emotional connection", "show the price", "give the history of the product"],
      ["A cartoon that exaggerates a person's features or actions uses...", "caricature", "citation", "alliteration"],
      ["A drawing of balanced scales usually symbolizes...", "justice", "speed", "music"],
      ["A dove usually symbolizes...", "peace", "danger", "money"],
      ["An hourglass in a picture often symbolizes...", "time passing", "cooking", "water"],
      ["In an image, a huge figure next to a tiny one suggests...", "the large one has more power", "they are friends", "the picture is old"],
      ["Warm colors such as red and orange often create a feeling of...", "energy or urgency", "calm sleep", "coldness"],
      ["A caption's job is to...", "explain or guide how to read the image", "replace the image", "hide the image"],
      ["Where does the eye usually go first in a picture?", "to the brightest, largest or most contrasting part", "to the corner", "to the frame"]],
    ["Look at size, color, position and what is exaggerated. Ask what the creator wants you to feel or think.", "Images use symbols (scales = justice, dove = peace), color, size and exaggeration to persuade without words.", "Example: a lone small tree beside a huge factory might show nature being overwhelmed. Now do yours."]),
    S("🖼️", ["Pictures persuade too", "<b>Visual rhetoric</b> is how images, ads and cartoons make a point."],
      ["Tools", "<b>Symbols</b>: scales, dove, hourglass<br><b>Color</b>: warm = energy, cool = calm<br><b>Size and position</b>: big = powerful<br><b>Exaggeration</b>: caricature<br><b>Captions</b> guide the reading"],
      ["Ask", "What is the first thing I notice? What is exaggerated? What does the creator want me to feel or do?"])));

  const SUMS = [
    ["Coral reefs cover less than one percent of the ocean floor, yet they support about a quarter of all marine species. Their complex structures shelter fish from predators, and algae living inside coral provide food. When ocean temperatures rise, corals expel this algae and turn white, a process called bleaching.",
      "Coral reefs shelter huge numbers of species, but warming water can damage them through bleaching.", "Corals turn white when the water gets hot.", "The ocean is important to living things.", "Algae living inside coral provide food."],
    ["The printing press, developed by Johannes Gutenberg in the 1400s, made books far cheaper and faster to produce than copying by hand. As books spread, more people learned to read, ideas moved faster between countries, and scholars could compare each other's work.",
      "The printing press made books cheaper, which helped reading and ideas spread.", "Gutenberg developed the press in the 1400s.", "Technology changes the world.", "Scholars could compare each other's work."],
    ["Many cities have added bike lanes in recent years. Supporters say they reduce traffic and pollution and make riders safer. Critics argue that they remove parking spaces and slow cars. Studies so far show mixed results, depending on how the lanes are designed.",
      "Bike lanes bring benefits and drawbacks, and the results depend on their design.", "Critics say bike lanes remove parking spaces.", "Cities have many transportation choices.", "Supporters say bike lanes make riders safer."],
    ["Sleep is not simply rest. During sleep the brain sorts the day's memories, clearing some and storing others. Students who sleep well after studying often remember more than those who stay up late cramming.",
      "Sleep helps the brain organize memories, so it supports learning.", "Cramming is a bad idea.", "Everyone needs rest.", "Students who sleep well often remember more."],
    ["Honeybees communicate with a 'waggle dance.' The angle of the dance shows the direction of food relative to the sun, and the length of the waggle shows the distance. Other bees in the hive use this information to find flowers.",
      "Honeybees use a dance to tell hive mates where food is.", "The waggle dance has an angle.", "Animals communicate in many ways.", "The length of the waggle shows distance."]];
  const sumMake = () => {
    const r = pick(SUMS);
    const hs = ["Read the paragraph, then ask: what is the one idea that all the sentences are about?", "A good summary is not too narrow (one detail) and not too broad (a huge topic). It covers the whole paragraph in one sentence.", "Example: 'Penguins huddle together in the cold. The ones in the middle get warm, then rotate to the outside.' Summary: Penguins share warmth by taking turns in the middle. Now do yours."];
    if (ri(0, 1) === 0) return { text: "<i>" + r[0] + "</i><br><br>Which is the best one-sentence <b>summary</b>?", choices: shuf([r[1], r[2], r[3]]), answer: r[1], hints: hs };
    return { text: "<i>" + r[0] + "</i><br><br>Which statement is a <b>supporting detail</b>, not the main idea?", choices: shuf([r[4], r[1], r[3]]), answer: r[4], hints: ["Ask which sentence adds a fact to prove the point rather than stating the point itself.", "The main idea covers the whole paragraph. A supporting detail is a smaller fact, example or number inside it.", "Example: in a paragraph about how ants cooperate, 'Some ants carry leaves' is a detail, while 'Ants work as a team' is the main idea. Now do yours."] };
  };
  L21.push(mk("Summarizing dense paragraphs", sumMake,
    S("📝", ["Squeeze a paragraph", "A <b>summary</b> states the main idea of a text in your own words and much more briefly."],
      ["Three kinds of statements", "<b>Main idea / summary</b>: covers the whole paragraph<br><b>Detail</b>: one smaller fact<br><b>Too broad</b>: so general it could go with any text"],
      ["Method", "1. Read.<br>2. Find the topic.<br>3. Find what the author says about the topic.<br>4. Write one sentence."])));

  L21.push(mk("Making sentences connect", rq([
      ["The first telescopes were small and blurry. ___", "Later designs used larger lenses, which showed far more detail.", "Galileo was born in Pisa in 1564.", "Stars are very far away."],
      ["Maya trained for months. ___", "Her hard work paid off when she won the race.", "Races are held in many countries.", "Running shoes were on sale."],
      ["The council proposed a new park. ___ would open next spring.", "It", "They", "He"],
      ["Teachers and students met in the hall. ___ discussed the new schedule.", "They", "It", "She"],
      ["Honeybees build hives from wax. ___", "The hives hold honey and young bees.", "Many animals build homes.", "Wax is expensive."],
      ["The experiment failed. ___, the team learned what to change.", "Even so", "For example", "Similarly"],
      ["Cats sleep up to sixteen hours a day. ___, dogs sleep about twelve.", "By comparison", "As a result", "For instance"],
      ["Libraries have changed. ___ now lend e-books and host workshops.", "Many", "Which", "Each of"]],
    ["Look at the end of the sentence before the blank. What word or idea should the next sentence pick up?", "Smooth writing links sentences by repeating a key word, using a pronoun that clearly points back, or using a transition. Start with what the reader already knows, then add something new.", "Example: 'The museum opened in 1900. ___' The next sentence might begin with <i>It</i> or <i>The museum</i> to keep the link. Now do yours."]),
    S("🔗", ["Old news first, new news next", "Each sentence should connect to the one before it."],
      ["Three links", "<b>Repeat</b> a key word: 'hives... The hives...'<br><b>Pronoun</b>: 'The park... It...'<br><b>Transition</b>: 'However, Even so, By comparison'"],
      ["Principle", "Begin with something the reader already knows, then end with the new information."])));

  L21.push(mk("Words that get mixed up", rq([
      ["From her smile, I ___ that she was pleased.", "inferred", "implied"],
      ["His tone ___ that he was unhappy.", "implied", "inferred"],
      ["She gave me a ___ on my handwriting.", "compliment", "complement"],
      ["The red scarf is a perfect ___ to your coat.", "complement", "compliment"],
      ["A judge must be ___, with no stake in the case.", "disinterested", "uninterested"],
      ["I am ___ in baseball; it bores me.", "uninterested", "disinterested"],
      ["The rain fell ___ all night, without a single pause.", "continuously", "continually"],
      ["The phone rang ___ during dinner, again and again with breaks.", "continually", "continuously"],
      ["The prize was shared ___ the three winners.", "among", "between"],
      ["The secret stays ___ you and me.", "between", "among"],
      ["I am happy to ___ your invitation.", "accept", "except"],
      ["Everyone ___ Mia has finished the test.", "except", "accept"]],
    ["Say what each word means in your own words, then test them in the sentence.", "A speaker <i>implies</i>; a listener <i>infers</i>. <i>Complement</i> completes; <i>compliment</i> praises. <i>Between</i> is for two, <i>among</i> for three or more. <i>Accept</i> receives; <i>except</i> leaves out.", "Example: 'Her speech ___ that she was upset' needs the word used by the speaker, not by the listener. Now do yours."]),
    S("🔀", ["Look-alike words", "Some word pairs look or sound alike but have different jobs."],
      ["Pairs", "<b>imply</b> (hint) / <b>infer</b> (conclude)<br><b>compliment</b> (praise) / <b>complement</b> (complete)<br><b>disinterested</b> (fair) / <b>uninterested</b> (bored)<br><b>continually</b> (again and again) / <b>continuously</b> (without stopping)<br><b>between</b> (two) / <b>among</b> (three+)"],
      ["Tip", "<i>Accept</i> means to receive or agree to; <i>except</i> means leaving out."])));

  const PP = [[20, 30], [10, 12], [40, 50], [50, 60], [25, 30], [20, 25], [10, 15], [40, 44]];
  const numMake = () => {
    const p = pick(PP), rel = (p[1] - p[0]) / p[0] * 100;
    if (ri(0, 1) === 0) return { visual: "📈", text: "A rate rose from <b>" + p[0] + "%</b> to <b>" + p[1] + "%</b>. By how many <b>percentage points</b> did it rise? (type a number)", answer: p[1] - p[0],
      hints: ["Percentage points compare two percentages by simple subtraction.", "Subtract the smaller percentage from the bigger one.", "Example: from 5% to 8% is 8 - 5 = 3 percentage points. Now do yours."] };
    return { visual: "📈", text: "A rate rose from <b>" + p[0] + "%</b> to <b>" + p[1] + "%</b>. By what <b>percent</b> did it rise compared with where it started? (type a number)", answer: rel,
      hints: ["Relative change compares the increase to the starting value.", "First find the increase, then divide it by the starting percentage and multiply by 100.", "Example: from 5% to 8% is an increase of 3; 3 divided by 5 is 0.6, which is 60 percent. Now do yours."] };
  };
  L21.push(mk("Numbers in the news", alt(numMake, rq([
      ["<b>Per capita</b> means...", "per person", "per year", "per country"],
      ["A town's count rose from 4 to 8. In relative terms, that is a...", "100 percent increase", "4 percent increase", "50 percent increase"],
      ["A headline says 'Risk of X doubles.' What else do you need to know?", "the original risk", "the headline's font", "the author's name"],
      ["One billionaire moves into a small town. Which measure of typical income resists being distorted?", "median", "mean", "range"],
      ["'Cases doubled' can mislead because...", "the starting number may have been tiny", "doubling is impossible", "cases never change"],
      ["Which gives the fairest comparison of two cities of different sizes?", "cases per 100,000 people", "total cases", "the city names"]],
      ["Ask: compared with what? What was the starting number? Is it a total or a rate?", "Totals can mislead when groups differ in size. Rates (per person, per 100,000) and the original numbers give context.", "Example: 2 cases becoming 4 is a 100 percent rise, but only 2 more cases. Now do yours."])),
    S("📰", ["Reading numbers carefully", "News stories use numbers in ways that can mislead if you skip the context."],
      ["Key ideas", "<b>Percentage points</b>: subtract (5% to 8% = 3 points)<br><b>Percent change</b>: increase ÷ starting value (60%)<br><b>Per capita</b>: per person"],
      ["Ask", "Compared with what? What was the starting number? Is a total being compared to a rate?"])));

  L21.push(mk("Reading a flowchart", rq([
      ["START → Is it raining? → YES: take an umbrella → END; NO: wear sunglasses → END.<br>It is sunny. What does the flowchart say to do?", "wear sunglasses", "take an umbrella", "stay home"],
      ["START → Is the number even? → YES: divide by 2 → END; NO: add 1 → END.<br>Start with 7. What is the result?", "8", "3", "14"],
      ["START → Is the number even? → YES: divide by 2 → END; NO: add 1 → END.<br>Start with 10. What is the result?", "5", "11", "20"],
      ["START → Is the password correct? → YES: open account → END; NO: try again (go back to the start).<br>After a wrong password, what happens?", "you go back and try again", "the account opens", "the program ends"],
      ["START → Is the light green? → YES: go; NO: Is it yellow? → YES: slow down; NO: stop.<br>The light is yellow. What do you do?", "slow down", "go", "stop"],
      ["START → Is the light green? → YES: go; NO: Is it yellow? → YES: slow down; NO: stop.<br>The light is red. What do you do?", "stop", "go", "slow down"],
      ["In a flowchart, a diamond shape usually shows a...", "decision (yes/no question)", "starting point", "list of names"],
      ["In a flowchart, an oval usually shows...", "the start or end", "a decision", "a picture"],
      ["In a flowchart, arrows show...", "the direction of the steps", "the speed", "the size"],
      ["In a flowchart, a rectangle usually shows...", "a step or action", "a decision", "the end"]],
    ["Start at START and follow the arrows one step at a time. Answer each question in the chart using the information given.", "At each decision (diamond), choose the arrow that matches your situation (YES or NO). Do exactly what the box says.", "Example: START → Is it cold? → YES: wear a coat; NO: wear a T-shirt. If it is cold, follow the YES arrow. Now do yours."]),
    S("🔀", ["Pictures of a process", "A <b>flowchart</b> shows the steps of a process with shapes and arrows."],
      ["Shapes", "<b>Oval</b>: start or end<br><b>Rectangle</b>: a step<br><b>Diamond</b>: a yes/no decision<br><b>Arrows</b>: the direction to follow"],
      ["How to read", "Begin at START. At each diamond pick the YES or NO arrow that fits. Keep following arrows until END."])));

  L21.push(mk("Extended metaphor", rq([
      ["<i>Hope is a lantern: it lights only the next step, flickers in the wind, and must be carried through the dark.</i><br><br>What is being compared?", "hope and a lantern", "wind and darkness", "steps and walking"],
      ["<i>Hope is a lantern: it lights only the next step, flickers in the wind, and must be carried through the dark.</i><br><br>'Flickers in the wind' suggests that hope can be...", "fragile", "heavy", "loud"],
      ["<i>Life is a library. Each day is a page, each year a chapter, and the shelves hold stories no one has opened yet.</i><br><br>What is being compared?", "life and a library", "pages and chapters", "books and shelves"],
      ["<i>Life is a library. Each day is a page, each year a chapter, and the shelves hold stories no one has opened yet.</i><br><br>'Stories no one has opened yet' suggests...", "the future is full of unknown experiences", "books are old", "reading is boring"],
      ["<i>Her mind was a crowded attic: boxes of memories stacked to the beams, dust on forgotten dreams, and one small window letting in light.</i><br><br>The attic stands for...", "her mind", "her house", "her dreams only"],
      ["<i>Her mind was a crowded attic: boxes of memories stacked to the beams, dust on forgotten dreams, and one small window letting in light.</i><br><br>The small window of light suggests...", "a little hope or clarity", "danger", "a loud noise"],
      ["An <b>extended metaphor</b> is a comparison that...", "continues for several lines or a whole passage", "uses the word 'like'", "has only one word"],
      ["A <b>conceit</b> is...", "an elaborate, surprising extended comparison", "a short rhyme", "a kind of footnote"]],
    ["Find the two things being compared, then see how the writer keeps adding details from the same comparison.", "In an extended metaphor, every detail belongs to the picture. Ask what each detail says about the real subject.", "Example: 'Time is a river: it carries us, and we cannot swim upstream.' The current stands for how time moves one way only. Now do yours."]),
    S("🌊", ["A comparison that keeps going", "A metaphor says one thing <i>is</i> another. An <b>extended metaphor</b> keeps going for lines or paragraphs."],
      ["Example", "'Hope is a lantern': it lights the next step (hope guides), it flickers (hope is fragile), it must be carried (we must keep hope alive)."],
      ["Conceit", "A <b>conceit</b> is a surprising, elaborate extended comparison, often in poetry."])));

  const OP = [
    ["It is a truth too seldom remembered that the quietest persons are frequently the most observant.", "People who say little often notice the most.", "Quiet people never notice anything.", "Observant people are always noisy."],
    ["Though he possessed neither fortune nor friends, he was by no means unhappy, for he had his books.", "He had no money or friends but was happy because of his books.", "He was sad because he had no books.", "He had money and friends but liked books."],
    ["Scarcely had the travelers reached the inn when the storm broke upon them in all its fury.", "The travelers had just arrived at the inn when a violent storm began.", "The storm ended as soon as they arrived.", "The travelers were in the storm for hours before the inn."],
    ["Such was her industry that, ere the clock struck noon, the whole house had been set in order.", "She worked so hard that the house was tidy before noon.", "The house was tidy only after noon.", "She refused to work."],
    ["I confess I had expected a warmer welcome, yet I would not for the world have shown my disappointment.", "He expected a warmer welcome but hid his disappointment.", "He was delighted by the welcome.", "He loudly complained about the welcome."],
    ["Whatever may be said of the old town's faults, none could deny the beauty of its harbor at dawn.", "Though the town had flaws, everyone agreed its harbor was beautiful at dawn.", "Everyone agreed the harbor was ugly.", "The town had no flaws."],
    ["Not until he had read the letter thrice did he comprehend its meaning.", "He understood the letter only after reading it three times.", "He understood it immediately.", "He never read the letter."]];
  L21.push(mk("Reading older prose", alt(
      rq(OP.map(r => ["<i>" + r[0] + "</i><br><br>Which is the best paraphrase?", r[1], r[2], r[3]]),
        ["Break the long sentence into its main action and its extra details. Who did what?", "Older writing often puts a time word or adverb first (<i>scarcely, not until</i>) and uses long, formal clauses. Reorder it in your head into subject + verb + object.", "Example: 'Seldom had she seen such a view' becomes 'She had rarely seen such a view.' Now do yours."]),
      rq([
        ["Why do older writers often start with words like <i>scarcely</i> or <i>not until</i>?", "for emphasis and a formal rhythm", "because grammar required it", "to save paper"],
        ["In older prose, <i>ere</i> means...", "before", "after", "during"],
        ["In older prose, <i>whence</i> means...", "from where", "to where", "why"],
        ["In older prose, a <i>thrice</i> repeated action happened...", "three times", "twice", "once"]],
        ["Think about how the word sounds like a modern word you know, or what the sentence is trying to say.", "Many old words are short for common ideas: ere = before, whence = from where, thrice = three times, anon = soon.", "Example: <i>twice</i> means two times, so <i>thrice</i> follows the same pattern. Now do yours."])),
    S("📜", ["Reading older books", "Writers of the 1800s often used long sentences and formal word order."],
      ["Strategy", "1. Find the main subject and verb.<br>2. Treat extra phrases as details.<br>3. Look up unfamiliar words.<br>4. Restate it in modern words."],
      ["Old words", "<b>ere</b> = before · <b>thrice</b> = three times · <b>whence</b> = from where · <b>anon</b> = soon"])));

  const NM = [
    ["The committee approved the plan.", "The committee made the decision to approve the plan.", "The committee came to a decision about the approval of the plan."],
    ["We discussed the problem.", "We had a discussion about the problem.", "We held a discussion regarding the matter of the problem."],
    ["She applied for the job.", "She made an application for the job.", "She submitted an application with regard to the job."],
    ["Please explain your answer.", "Please provide an explanation of your answer.", "Please make an explanation concerning your answer."],
    ["I suggest we leave early.", "I make the suggestion that we leave early.", "I would like to make a suggestion about leaving early."],
    ["The mayor will announce the results.", "The mayor will make an announcement of the results.", "The mayor will give an announcement concerning the results."],
    ["The team failed to reach the goal.", "The team experienced a failure in the reaching of the goal.", "The team had a failure when it came to reaching the goal."],
    ["The scientists observed the birds.", "The scientists conducted an observation of the birds.", "The scientists made observations with respect to the birds."]];
  L21.push(mk("Strong verbs, not wordy nouns", rq(NM.map(r => ["Which version says the same thing most clearly and concisely?", r[0], r[1], r[2]]),
    ["Look for a plain action hiding inside a long noun, like <i>decision</i>, <i>discussion</i> or <i>application</i>.", "Turn the noun back into a verb. 'Made a decision' becomes 'decided'. Cut extra phrases like 'with regard to'.", "Example: 'We gave consideration to the idea' becomes 'We considered the idea.' Now do yours."]),
    S("✂️", ["Wordy nouns weigh sentences down", "A <b>nominalization</b> turns a verb into a noun (decide → decision). It often makes sentences longer."],
      ["Fix it", "'made a decision to approve' → <b>approved</b><br>'had a discussion about' → <b>discussed</b><br>'gave an explanation of' → <b>explained</b>"],
      ["Rule", "Put the action in the verb. Shorter, stronger sentences are easier to read."])));

  L21.push(mk("Writing strong conclusions", rq([
      ["A good conclusion should...", "reflect on the main point and leave the reader with something to think about", "introduce a brand-new argument", "apologize for the essay"],
      ["Which conclusion opening is the weakest?", "In conclusion, this essay was about my topic.", "Taken together, these examples show why the change matters.", "Looking ahead, the stakes of this choice only grow."],
      ["Which belongs in a conclusion?", "a restatement of the thesis in fresh words", "a new piece of evidence never discussed", "a list of every quote"],
      ["Which sentence should be avoided in a conclusion?", "I am not sure if I proved my point.", "These results suggest a larger lesson.", "The evidence points one way."],
      ["An effective ending often links back to...", "the opening image or question", "an unrelated joke", "the bibliography"],
      ["The 'so what?' of an essay is answered in the...", "conclusion", "title", "table of contents"],
      ["What should a conclusion NOT do?", "raise a brand-new major point", "sum up main ideas", "echo the thesis"],
      ["A call to action at the end of a persuasive essay asks readers to...", "do something specific", "forget the topic", "skip the evidence"]],
    ["Ask what the reader should walk away with after the last line.", "A conclusion echoes the thesis in fresh words, pulls the main points together and answers 'so what?'. It does not add big new evidence.", "Example: an essay on recycling might end with how small daily choices add up to a cleaner town. Now do yours."]),
    S("🏁", ["Finishing well", "The conclusion is your last chance to leave an impression."],
      ["Do", "Restate the thesis in fresh words<br>Pull the main points together<br>Answer <i>so what?</i><br>Link back to the opening"],
      ["Don't", "Add a brand-new major point<br>Apologize<br>Open with 'In conclusion, this essay was about...'"])));

  L21.push(MIX("Mixed practice", L21[0], L21[2], L21[3], L21[6], L21[11], L21[12]));
  L21.push(MIX("Level 21 Challenge", L21[1], L21[4], L21[5], L21[7], L21[8], L21[9], L21[10], L21[13], L21[14], L21[15], L21[16], L21[17]));

  Object.assign(READING_LEVELS, { 19: L19, 20: L20, 21: L21 });
})();
