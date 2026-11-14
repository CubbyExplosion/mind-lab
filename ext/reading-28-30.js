// Mind Lab Reading, levels 28-30 (College year 1 second half, College year 2). 20 lessons each.
(() => {
  const T = (h, v, t) => ({ h, v, t });
  const mkL = (title, make, slides) => { make.teach = () => slides; return { title, make }; };
  const MIX = (title, ...ls) => {
    const f = () => pick(ls).make();
    f.teach = () => [T("Review time!", "🔄", "This lesson mixes things you already know. Here is a quick reminder of each idea, then the quiz.")].concat(ls.map(l => l.make.teach()[0]));
    return { title, make: f };
  };
  const S = (v, ...a) => a.map(([h, t], i) => T(h, i ? ["✏️", "💡", "⭐"][(i - 1) % 3] : v, t));
  const mk = (title, f, slides) => mkL(title, f, slides);
  // rc: rows [text, right, wrong, wrong, clue]; hint 2 is the row's own clue
  const rc = (rows, h1, h3) => () => {
    const r = pick(rows);
    const cs = [r[1], r[2], r[3]].filter(x => x != null);
    return { text: r[0], choices: shuf(cs), answer: r[1], hints: [h1, r[4], h3] };
  };
  // cr: items [text, index of right category, clue]; every question offers all the categories
  const cr = (intro, cats, items, h1, h3) => () => {
    const r = pick(items);
    return { text: intro + "<br>" + r[0], choices: shuf(cats), answer: cats[r[1]], hints: [h1, r[2], h3] };
  };
  const rootRows = (lang, roots) => roots.map((x, i) => {
    const ms = roots.map(y => y[1]).filter(m => m !== x[1]);
    return ["The " + lang + " root <b>" + x[0] + "</b> is in <i>" + x[2][0] + "</i>, <i>" + x[2][1] + "</i> and <i>" + x[2][2] + "</i>. What does it mean?", x[1], ms[i % ms.length], ms[(i + 2) % ms.length], "Think about what <i>" + x[2][0] + "</i> and <i>" + x[2][2] + "</i> have in common."];
  });
  const ROOTH1 = "Split the word into its parts. The root carries the core idea, so think of other words that share it.";
  const ROOTH3 = "Example: <b>port</b> is in <i>transport</i>, <i>export</i> and <i>portable</i>. All are about carrying, so the root means 'carry'. A <i>porter</i> is someone who carries bags. Now do yours.";
  const L28 = [], L29 = [], L30 = [];

  // ================= LEVEL 28 =================
  L28.push(mk("Latin roots: strict, press, pon, lud, ten", rc([
      ...rootRows("Latin", [
        ["strict/string", "bind tight", ["restrict", "constrict", "stringent"]],
        ["press", "push or squeeze", ["compress", "depress", "impressive"]],
        ["pon/pos", "put or place", ["component", "deposit", "postpone"]],
        ["lud/lus", "play or trick", ["prelude", "illusion", "ludicrous"]],
        ["ten/tin", "hold", ["tenacious", "retain", "detention"]]]),
      ["A <i>tenacious</i> climber is one who...", "holds on firmly", "gives up quickly", "plays around", "Picture a grip that will not let go."],
      ["To <i>postpone</i> a meeting is to...", "place it at a later time", "cut it short", "squeeze more into it", "<b>post-</b> means after."],
      ["An <i>illusion</i> is something that...", "plays a trick on the mind", "holds the mind tight", "pushes the mind down", "Think of a magician's act."],
      ["A <i>stringent</i> rule is one that is...", "tight and demanding", "loose and easy", "old and forgotten", "Picture a rope pulled hard."],
      ["To <i>compress</i> a file is to...", "squeeze it into less space", "make it grow", "split it into pages", "<b>com-</b> means together."]],
    ROOTH1, ROOTH3),
    S("🌳", ["Five more Latin roots", "Each root is a small tool. Learn it once and you can unlock many long words in textbooks."],
      ["The roots", "<b>strict/string</b> = bind tight (<b>strict</b>)<br><b>press</b> = push (<b>press</b>ure)<br><b>pon/pos</b> = place (com<b>pos</b>e)<br><b>lud/lus</b> = play (pre<b>lud</b>e)<br><b>ten/tin</b> = hold (<b>ten</b>ant)"],
      ["Build words", "<i>re</i> (back) + <i>tain</i> = <i>retain</i>, 'hold back', keep. <i>Ex</i> (out) + <i>press</i> = <i>express</i>, 'press out', say. <i>Pre</i> (before) + <i>lud</i> = <i>prelude</i>, 'before-play', an opening piece."])));

  L28.push(mk("Greek roots: dem, phag, gastr, hem, oste", rc([
      ...rootRows("Greek", [
        ["dem", "people", ["democracy", "epidemic", "demographic"]],
        ["phag", "eat or swallow", ["esophagus", "phagocyte", "bacteriophage"]],
        ["gastr", "stomach", ["gastric", "gastronomy", "gastropod"]],
        ["hem/hemat", "blood", ["hemoglobin", "hematology", "hemophilia"]],
        ["oste", "bone", ["osteology", "osteoporosis", "osteopath"]]]),
      ["An <i>epidemic</i> is a disease that spreads among...", "the people of a region", "a single bone", "one family's pets", "<b>epi-</b> means upon. The root names a group."],
      ["<i>Gastronomy</i> is the art of...", "good eating", "setting bones", "counting people", "The root names the part of the body that digests."],
      ["An <i>osteologist</i> would most likely study...", "skeletons", "blood cells", "voting habits", "<b>-ologist</b> means a student of a subject."],
      ["A <i>phagocyte</i> is a cell that...", "swallows other particles", "carries oxygen", "builds a skeleton", "<b>-cyte</b> means cell. Think of a cell with a big appetite."],
      ["A <i>hematologist</i> studies...", "blood", "bones", "stomachs", "Think of what a syringe draws from an arm at a clinic."]],
    ROOTH1, ROOTH3),
    S("🧬", ["Five Greek roots", "Greek roots fill biology and social science. Many name a body part or a group of people."],
      ["The roots", "<b>dem</b> = people (<b>dem</b>ocracy)<br><b>phag</b> = eat (esopha<b>g</b>us)<br><b>gastr</b> = stomach (<b>gastr</b>ic)<br><b>hem</b> = blood (<b>hem</b>oglobin)<br><b>oste</b> = bone (<b>oste</b>oporosis)"],
      ["Build words", "<i>Demos</i> (people) + <i>kratos</i> (rule) = <i>democracy</i>, rule by the people. <i>Osteo</i> + <i>porosis</i> (full of holes) = a condition where bones become thin and porous."])));

  L28.push(mk("Fabula and syuzhet: story vs. telling", rc([
      ["Russian formalists split a narrative into <i>fabula</i> and <i>syuzhet</i>. The events in the order they happened in the story world are the...", "fabula", "syuzhet", "epigraph", "One word names the raw chronology; the other names the way the text arranges it."],
      ["A novel opens with a murder and then jumps back a year to show why. The order the novel uses is the...", "syuzhet", "fabula", "theme", "Ask whether this is the order of events or the order of telling."],
      ["If you list the events of a novel in strict order of time, you have rebuilt its...", "fabula", "syuzhet", "tone", "You are un-scrambling the telling to get the raw sequence."],
      ["Which choice changes the <i>syuzhet</i> but not the <i>fabula</i>?", "Telling the ending first", "Making the hero die earlier in the story world", "Adding a new villain to the events", "Only the arrangement of the telling changes."],
      ["A detective story hides the culprit until the end. Hiding information is a decision about the...", "syuzhet", "fabula", "title", "The events already happened; the question is what the text reveals, and when."],
      ["Two retellings of Cinderella give the same events but start at the ball. They share the same...", "fabula", "syuzhet", "diction", "Same events, different arrangement."],
      ["A film shows scenes 3, 1, 2 of a chronology. Putting them back as 1, 2, 3 reconstructs the...", "fabula", "syuzhet", "rhyme scheme", "You are recovering the order of events, not the order of showing."],
      ["Why do critics care about the gap between fabula and syuzhet?", "The gap shows how a text controls suspense and meaning", "The gap proves the author lied", "The gap means the plot is poor", "Arranging events differently can change what a reader feels."]],
    "Ask two questions: in what order did events happen, and in what order does the text tell them?",
    "Example: a book begins with a wedding, then flashes back to how the couple met. Chronological order (met, then wed) is the fabula; the order of the pages (wed, then met) is the syuzhet. Now do yours."),
    S("🧩", ["Two layers of a narrative", "Narrative theorists separate <b>what happened</b> from <b>how it is told</b>."],
      ["The terms", "<b>Fabula</b> (story): events in their real time order.<br><b>Syuzhet</b> (plot or discourse): the order and manner in which the text presents them."],
      ["Why it matters", "Flashbacks, delays and secrets are choices about the syuzhet. The same fabula can feel funny, tragic or mysterious depending on how it is told."])));

  L28.push(mk("Focalization: whose eyes?", cr("Which type of focalization is this?", ["zero (all-knowing)", "internal (one mind)", "external (outside only)"], [
      ["'Mara watched the clock and felt her stomach tighten; surely they would blame her.'", 1, "We get Mara's private worry."],
      ["'The man entered, took off his hat and sat. He did not speak.'", 2, "Only what a camera could record."],
      ["'Neither knew that, across the sea, the letter had already been lost.'", 0, "The narrator knows things neither character knows."],
      ["'Leo saw the cake and thought it the finest thing in the world.'", 1, "A feeling is reported from inside one character."],
      ["'The door opened. A tall figure stood there and said nothing for a long time.'", 2, "No thoughts, only visible actions and silence."],
      ["'Years later the town would forget them, though both had changed it forever.'", 0, "It looks ahead beyond what any character could know."],
      ["'Nina smelled smoke and wondered whether the stove was still on.'", 1, "We share what one person senses and wonders."],
      ["'The guard stared at the visitor's papers, then waved him through.'", 2, "We see the behavior but never learn what the guard thinks."]],
      "Ask whose perception the sentence shows: no one in particular, one character's mind, or only outward behavior.",
      "Example: 'Omar frowned and hoped the test would be easy' enters one mind (internal). 'Omar frowned and sat down' only shows behavior (external). 'Omar did not know the test was cancelled' knows more than Omar (zero). Now do yours."),
    S("👁️", ["Who sees?", "<b>Focalization</b> (Gérard Genette) asks: through whose perception do we get the story? It is not the same as who speaks."],
      ["Three types", "<b>Zero</b>: the narrator knows more than any character.<br><b>Internal</b>: we see and feel through one character.<br><b>External</b>: only outward actions and speech, like a camera."],
      ["Why it matters", "A narrator may speak in 'she' but focalize through her. Shifts in focalization change how much we trust, pity or fear a character."])));

  L28.push(mk("Narrative time: order, duration, frequency", rc([
      ["<i>Analepsis</i> is the technical word for a...", "flashback", "glimpse of the future", "skipped period", "<b>ana-</b> means back."],
      ["'Years later she would remember this day with shame.' This glimpse ahead is a...", "prolepsis", "analepsis", "ellipsis", "It leaps forward past the present moment of the tale."],
      ["'Two summers passed.' Leaving out a stretch of time is called...", "ellipsis", "prolepsis", "pause", "The text simply omits the time."],
      ["A long description of a sunset while the plot stands still is a descriptive...", "pause", "ellipsis", "summary", "Story time stops while the text keeps going."],
      ["'Every morning she walked the same road.' Telling once what happened many times is...", "iterative narration", "scene", "ellipsis", "One telling stands for repeated events."],
      ["A conversation shown line by line, close to real time, is a...", "scene", "summary", "pause", "The telling takes about as long as the events."],
      ["'The war lasted ten years.' Covering a decade in one line is...", "summary", "scene", "pause", "Story time is much longer than reading time."],
      ["Retelling one event several times from different angles is...", "repeated narration", "ellipsis", "iterative narration", "The same event comes back more than once."]],
    "Sort the clue: is it about the order of events, how long the text spends, or how often an event is told?",
    "Example: 'Before the trip, he had never seen the sea' goes back in time (analepsis). 'Ten minutes later, nothing had changed' is real time. 'It rained for a week' compresses time (summary). Now do yours."),
    S("⏱️", ["Telling time", "Genette studied how a text handles time in three ways: <b>order</b>, <b>duration</b> and <b>frequency</b>."],
      ["Order and duration", "<b>Analepsis</b> = flashback; <b>prolepsis</b> = flash-forward.<br><b>Ellipsis</b> skips time; <b>summary</b> compresses it; <b>scene</b> matches it; <b>pause</b> stops it."],
      ["Frequency", "<b>Singulative</b>: tell once what happened once.<br><b>Iterative</b>: tell once what happened often.<br><b>Repeated</b>: tell many times what happened once."])));

  L28.push(mk("New Criticism and the intentional fallacy", rc([
      ["The New Critics (mid-20th century) wanted readers to focus mainly on...", "the words of the text itself", "the author's private letters", "the reader's mood that day", "Their method was close reading of the page."],
      ["Wimsatt and Beardsley's 'intentional fallacy' warns against...", "judging a work by what the author says was intended", "reading any poem closely", "writing without a plan", "The fallacy ties meaning too closely to the author's goal."],
      ["Their 'affective fallacy' warns against judging a poem by...", "the feelings it stirs in readers", "its rhyme scheme", "its length", "It confuses the poem with its effect."],
      ["Cleanth Brooks's 'heresy of paraphrase' says a poem...", "cannot be fully replaced by a summary of its ideas", "should always be paraphrased", "has no meaning", "Form and meaning are bound together."],
      ["'Organic unity' means that in a good work...", "every part contributes to the whole", "the plot is about nature", "each stanza says the same thing", "Like a living body, parts depend on each other."],
      ["Which evidence would a New Critic prize most when discussing a poem?", "A pattern of water images across the poem", "A newspaper interview with the poet", "A survey of readers' favorite lines", "It must be found in the text."],
      ["Which of these qualities did New Critics especially value in poems?", "Irony, paradox and tension", "Simple morals", "Historical accuracy", "They liked complexity held in balance."],
      ["A critic argues, 'The poem must mean X because the poet told us so in a diary.' A New Critic would say this...", "relies on authorial intention instead of the text", "is the best kind of proof", "is a close reading", "Where does the evidence come from?"]],
    "Ask where the evidence comes from: the text on the page, or outside it (author, readers, history)?",
    "Example: a student says a poem about winter is sad because the poet was sad that year. A New Critic would reply: show where the words, images and sounds create sadness. Now do yours."),
    S("📖", ["Back to the page", "<b>New Criticism</b> treated a poem as a self-contained object to be studied by close reading."],
      ["Key ideas", "<b>Intentional fallacy</b>: do not settle meaning by the author's stated aim.<br><b>Affective fallacy</b>: do not judge by the reader's feelings.<br><b>Heresy of paraphrase</b>: a summary loses what the form does."],
      ["Strength and limit", "It trains careful attention to words. Later schools asked whether history, power and readers also shape meaning."])));

  L28.push(mk("Structuralism and the sign", rc([
      ["In Saussure's terms, the written or spoken word 'tree' is the...", "signifier", "signified", "referent", "It is the sound or mark, not the idea."],
      ["The mental concept of a tree that the word calls up is the...", "signified", "signifier", "parole", "It lives in the mind, not on paper."],
      ["Different languages use different words for the same animal. This shows the link between word and meaning is...", "arbitrary", "natural", "required by nature", "Nothing about the sounds forces the meaning."],
      ["<i>Langue</i> in Saussure's theory is...", "the shared system of a language", "one person's particular utterance", "a kind of poem", "Think of the whole rule book everyone shares."],
      ["The particular sentence you say today is an example of...", "parole", "langue", "binary opposition", "It is one use of the system."],
      ["Pairs such as hot/cold or nature/culture are called...", "binary oppositions", "intertexts", "paraphrases", "Each term gets meaning from its opposite."],
      ["Structuralists say meaning arises mainly from...", "differences within a system", "each author's inner spirit", "single objects in the world", "A sign means something because of what it is not."],
      ["A structuralist studying hundreds of fairy tales is most likely looking for...", "shared underlying patterns", "the biography of each teller", "the best-written version", "They search for deep structures."]],
    "Separate the form (sound or mark), the concept, and the system that links them.",
    "Example: the word 'dog' on a page is the signifier; the idea of a dog is the signified; English as a whole is langue; your sentence 'The dog barked' is parole. Now do yours."),
    S("🔣", ["Signs and systems", "<b>Structuralism</b> grew from Ferdinand de Saussure's linguistics and spread to literature and culture."],
      ["The sign", "A sign = <b>signifier</b> (sound or mark) + <b>signified</b> (concept). The link is <b>arbitrary</b>, set by convention.<br><b>Langue</b> = the system; <b>parole</b> = a use of it."],
      ["Meaning by difference", "Words and stories mean through contrasts: hot/cold, hero/villain. Structuralist critics hunt for the patterns beneath many texts."])));

  L28.push(mk("Reader-response theory", rc([
      ["Reader-response critics hold that meaning is made in...", "the meeting of text and reader", "the author's mind alone", "the paper and ink alone", "The reader is an active partner."],
      ["Louise Rosenblatt called reading a recipe to get instructions an <i>efferent</i> reading. Reading a poem for the experience itself is...", "aesthetic reading", "efferent reading", "skimming", "She contrasted two stances."],
      ["Wolfgang Iser said texts leave 'gaps' that...", "readers fill in", "editors must correct", "authors regret", "Readers supply what is unsaid."],
      ["Stanley Fish's 'interpretive communities' are groups that...", "share ways of reading", "publish the same books", "write together", "Shared habits shape what counts as a good reading."],
      ["The 'implied reader' is...", "the kind of reader a text seems to expect", "the author's best friend", "any reader who buys the book", "The text itself shapes a role for us."],
      ["Two readers disagree about a story's ending. A reader-response critic would most likely say...", "differences in background help shape each reading", "one of them did not read", "the author must decide", "The reader's context matters."],
      ["Which claim does reader-response theory NOT support?", "Only the author's intention counts", "Readers help create meaning", "Texts leave gaps", "Which claim shuts the reader out?"],
      ["Which question comes from reader-response criticism?", "What does the text ask me to imagine as I read?", "What year was the poem printed?", "Who inspired the poet?", "Look for the question about the act of reading."]],
    "Ask who is doing the meaning-making in the claim: only the author, only the text, or the reader too.",
    "Example: 'A mystery withholds the culprit so readers guess along' stresses the reader's active role. 'The author planned the clue' stresses intention. Now do yours."),
    S("🧑‍🎓", ["The reader matters", "<b>Reader-response</b> theories shifted attention from the author and text to the act of reading."],
      ["Key names", "<b>Rosenblatt</b>: efferent vs. aesthetic reading.<br><b>Iser</b>: gaps and the implied reader.<br><b>Fish</b>: interpretive communities."],
      ["Careful use", "This does not mean 'anything goes'. Communities and texts limit readings. Good critics still support claims with the text."])));

  L28.push(mk("Intertextuality and dialogism", rc([
      ["<i>Intertextuality</i> is the idea that every text...", "echoes and responds to other texts", "stands completely alone", "is written for one reader", "The prefix <b>inter-</b> means between."],
      ["The term 'intertextuality' was coined by...", "Julia Kristeva", "Ferdinand de Saussure", "Cleanth Brooks", "She built on Bakhtin's ideas in the 1960s."],
      ["Bakhtin called a novel <i>dialogic</i> because it...", "puts many voices in conversation", "uses only one voice", "is written as a dialogue play", "Think of voices answering each other."],
      ["<i>Heteroglossia</i> refers to...", "many varieties of speech within a language", "a single standard dialect", "a long poem", "<b>hetero-</b> means different."],
      ["The 'carnivalesque' in Bakhtin's work is...", "festival humor that turns rank upside down", "a type of rhyme", "a formal debate", "Think of a festival where a fool is crowned king."],
      ["A modern novel retells Homer's Odyssey in a single day in Dublin. This is an example of...", "intertextuality", "heresy of paraphrase", "affective fallacy", "It answers an older text."],
      ["A 'monologic' text is one in which...", "a single authoritative voice dominates", "several voices disagree", "poems are mixed with prose", "<b>mono-</b> means one."],
      ["Why might a critic trace a novel's allusions to older books?", "To show how it enters a conversation with earlier texts", "To prove the author copied", "To count the pages", "Allusions link texts."]],
    "Think of texts as a conversation. Ask which other voices or texts the passage answers.",
    "Example: a cartoon that borrows lines from a well-known fairy tale and changes the ending is in dialogue with that tale. Now do yours."),
    S("🗣️", ["Texts talk to texts", "No text is written in a vacuum. It borrows words, forms and ideas from earlier texts."],
      ["Key terms", "<b>Intertextuality</b> (Kristeva): texts connect to other texts.<br><b>Dialogism</b> (Bakhtin): a novel holds many voices in tension.<br><b>Heteroglossia</b>: the many kinds of speech in a society."],
      ["Reading tip", "Notice allusions, quotations and borrowed forms. Ask what changes when an old story is placed in a new setting."])));

  L28.push(mk("Enthymemes: the hidden premise", rc([
      ["An <i>enthymeme</i> is an argument in which...", "a premise is left unstated", "the conclusion is left out of a poem", "every premise is proved", "Part of the reasoning is silent."],
      ["'She has a biology degree, so she should manage the lab.' Which hidden premise is needed?", "A biology degree prepares someone to manage a lab", "Labs are often expensive", "She likes science", "Look for the bridge between the evidence and the conclusion."],
      ["'Sales fell after the new logo, so we should bring back the old one.' Hidden premise:", "The logo caused the fall in sales", "Logos are colorful", "Sales usually rise in spring", "What must be true for the conclusion to follow?"],
      ["'The medicine is natural, so it is safe.' Hidden premise:", "Natural things are safe", "Medicine is expensive", "Some people prefer it", "Fill the gap between 'natural' and 'safe'."],
      ["'He is older, so his advice is better.' Hidden premise:", "Older people give better advice", "He has gray hair", "Advice is free", "What link makes age relevant?"],
      ["'The park is free, so it will be crowded.' Hidden premise:", "Free places attract many visitors", "Parks are green", "Crowds are noisy", "Think of the rule connecting price and attendance."],
      ["Why do critics search for hidden premises?", "They may be doubtful and need testing", "They make arguments shorter", "They prove the conclusion", "What if the unstated premise is false?"],
      ["'The book is long, so it must be boring.' The hidden premise is weak because...", "some long books are gripping", "books have chapters", "boring is a feeling", "Can you think of a counterexample?"]],
    "Ask: what must also be true for the evidence to support the conclusion? That unstated idea is the hidden premise.",
    "Example: 'It's raining, so the game will be cancelled.' Hidden premise: games are cancelled when it rains. You can test it: are all games? Now do yours."),
    S("🔍", ["The silent part", "Most everyday arguments skip a step. A skipped step is often a <b>hidden premise</b>."],
      ["Spot it", "Write the argument as: evidence, so conclusion. Then ask what general belief connects them.<br>'It's a bargain, so buy it' assumes bargains are worth buying."],
      ["Test it", "Once you state the hidden premise, you can judge it. If it is false or too broad, the argument is weak even if the evidence is true."])));

  L28.push(mk("Inference to the best explanation", rc([
      ["Inference to the best explanation means choosing the explanation that...", "best accounts for all the evidence", "is the oldest", "is the most exciting", "It compares rival accounts against the facts."],
      ["Every light on one street goes out at 9 pm nightly; the rest of town is fine. The best explanation is...", "a timer or fault on that street's circuit", "all lights in the country are broken", "a hidden conspiracy", "Which cause fits the narrow pattern?"],
      ["A rival explanation that needs many new unproven assumptions is usually...", "weaker", "stronger", "the winner", "Extra assumptions are costly."],
      ["Good explanations explain the evidence and also...", "fit what we already know well", "avoid all testing", "stay vague", "Ask whether it clashes with solid knowledge."],
      ["A garden is flattened after a storm. Which explanation fits the evidence best?", "Strong wind knocked the plants over", "The plants decided to rest", "A single snail did it all overnight", "Match cause and size of effect."],
      ["An explanation that fits some evidence but ignores other clues is weak because...", "it leaves part of the evidence unexplained", "it is too short", "it uses technical words", "Check how much of the evidence it covers."],
      ["Which explanation can you test further?", "A leaking pipe caused the stain, so the wall below will be damp", "Mysterious forces made the stain", "It just is that way", "A testable claim predicts something new."],
      ["Detectives often use this kind of reasoning because it...", "weighs rival accounts of the clues", "guarantees a certain answer", "ignores clues", "It points to the likeliest account, not a proof."]],
    "List the rival explanations. Which one fits the most evidence, with the fewest extra assumptions?",
    "Example: a classroom plant droops. Rivals: no water, or too little light. If the soil is dry, 'no water' explains the evidence; light does not. Now do yours."),
    S("🕵️", ["Choosing among stories", "Often several explanations fit the facts. <b>Inference to the best explanation</b> (abduction) picks the best one."],
      ["What makes it best", "It explains <b>more of the evidence</b>, needs <b>fewer new assumptions</b>, fits <b>what we already know</b> and can be <b>tested</b>."],
      ["Stay humble", "The best explanation is the best so far. New evidence can overturn it. That is why scientists keep testing."])));

  L28.push(mk("Falsifiability and Ockham's razor", rc([
      ["Karl Popper said a scientific claim should be...", "falsifiable, able to be shown wrong by evidence", "impossible to test", "popular", "A good claim takes a risk."],
      ["Which claim is falsifiable?", "All swans on this lake are white", "Everything happens for a hidden reason we can never detect", "Fate cannot be measured", "Which claim could a single observation contradict?"],
      ["A theory that can explain any outcome whatever happens is...", "weak, because it forbids nothing", "very strong", "guaranteed true", "What would count against it?"],
      ["Ockham's razor says that, between explanations that fit equally well, prefer the one with...", "fewer assumptions", "more assumptions", "the longest story", "It trims what is not needed."],
      ["Ockham's razor is best described as...", "a rule of thumb for choosing", "a proof that the simple answer is true", "a law of physics", "Does it guarantee the truth?"],
      ["One genuine black swan falsifies the claim 'All swans are white' because...", "a single counterexample breaks a universal claim", "black is more common", "swans change color", "'All' is a very strong word."],
      ["A horoscope is vague enough to fit anyone. This makes it...", "hard to falsify", "well tested", "highly precise", "Could any day count against it?"],
      ["Which prediction makes a theory easier to falsify?", "The test will show exactly 12 grams", "The result will be something or other", "It might change", "Precise predictions can fail."]],
    "Ask what observation would count against the claim. If nothing could, be cautious.",
    "Example: 'It will rain in Seattle on some day next year' can hardly be shown wrong. 'It will rain in Seattle exactly 100 days' can. The second is more falsifiable. Now do yours."),
    S("✂️", ["Two thinking tools", "<b>Falsifiability</b> (Popper): a scientific claim must risk being proved wrong.<br><b>Ockham's razor</b>: do not multiply assumptions without need."],
      ["Examples", "'All metals expand when heated' can be tested with a single counterexample.<br>'Something unseen is responsible' cannot be tested at all."],
      ["Limits", "Ockham's razor guides choices; it does not prove the simple answer true. Real science weighs evidence, not only elegance."])));

  L28.push(mk("Burden of proof", rc([
      ["The burden of proof usually rests on...", "the person making the claim", "the person who doubts it", "whoever speaks last", "The one who asserts must supply support."],
      ["'There is a teapot orbiting Mars. Prove me wrong!' This tries to...", "shift the burden of proof", "meet the burden of proof", "cite a source", "Who made the claim?"],
      ["'No one has proved ghosts don't exist, so they do.' This is an appeal to...", "ignorance", "authority", "pity", "The argument treats lack of disproof as proof."],
      ["In a criminal trial, the burden of proof is on...", "the prosecution", "the defendant", "the jury", "The accused is presumed innocent."],
      ["In a debate about changing a rule, the burden usually lies with...", "those proposing the change", "those keeping the current rule", "neither side", "Presumption favors the status quo until reasons are given."],
      ["Carl Sagan's 'extraordinary claims require extraordinary evidence' means...", "the stranger the claim, the stronger the proof needed", "ordinary claims need no support", "evidence is not important", "How surprising is it compared with what we know?"],
      ["Russell's teapot is used to show that...", "the claimant, not the doubter, must give evidence", "teapots are in space", "doubt is rude", "Think of who has to prove what."],
      ["Which reply is fair when someone makes a claim?", "What evidence supports that?", "You can't prove I'm wrong.", "Everyone believes it.", "Which reply asks for support rather than dodging?"]],
    "Ask who is asserting something new or surprising. That person normally owes the evidence.",
    "Example: 'My dog can read, and you can't show he can't' dodges the burden. A fair version: 'Here is a video of him reading new words.' Now do yours."),
    S("⚖️", ["Who must prove it?", "In reasoned discussion, the <b>burden of proof</b> lies with the person making a claim, especially a surprising one."],
      ["Common tricks", "<b>Shifting the burden</b>: 'Prove me wrong!'<br><b>Appeal to ignorance</b>: 'No one has disproved it, so it's true.'"],
      ["Context matters", "Courts, debates and science set different standards. Always ask: what is claimed, who claims it, and how strong is the support?"])));

  L28.push(mk("Methods sections: controls and blinding", rc([
      ["A <i>control group</i> is a group that...", "does not get the treatment being tested", "gets double the treatment", "is chosen by the researcher's friends", "It gives a baseline for comparison."],
      ["Random assignment means participants are placed in groups...", "by chance", "by their preference", "by their age order", "It spreads hidden differences evenly."],
      ["In a <i>single-blind</i> study...", "participants do not know which group they are in", "the study has one participant", "results are kept secret forever", "Someone is kept uninformed."],
      ["In a <i>double-blind</i> study, who is unaware of the group?", "Both participants and the researchers who measure outcomes", "Only the participants", "Only the funders", "Two parties are in the dark."],
      ["A <i>placebo</i> is...", "a dummy treatment with no active ingredient", "a stronger drug", "a measuring tool", "It looks real but has no active effect."],
      ["Why do researchers use blinding?", "To keep expectations from shaping results", "To save money", "To make the study shorter", "What might a person's beliefs change?"],
      ["Which method detail best helps others repeat the study?", "Exact steps, materials and measures", "A dramatic title", "The authors' degrees", "Replication needs precise steps."],
      ["A study tests a tutoring program and compares only students who chose it with those who did not. What is the weakness?", "The groups may differ from the start", "The group sizes are equal", "The tests were written down", "Self-selection is not random assignment."]],
    "Ask how the groups were formed and who knew what. Good methods reduce bias.",
    "Example: to test a new fertilizer, give it to half the plants chosen at random and give the rest none. Random choice plus a no-treatment group make a fair comparison. Now do yours."),
    S("🧪", ["Reading the methods", "The <b>methods</b> section of a paper tells how the study was done, so readers can judge and repeat it."],
      ["Key features", "<b>Control group</b>: baseline.<br><b>Random assignment</b>: fairness.<br><b>Blinding</b>: single (participants) or double (participants and researchers).<br><b>Placebo</b>: dummy treatment."],
      ["What to look for", "Ask: who took part, how were they chosen, how was the outcome measured, and could someone repeat it exactly?"])));

  L28.push(mk("Results and discussion: staying within the data", rc([
      ["A survey of 40 students at one college finds most prefer morning classes. Which conclusion stays within the data?", "Most of the 40 surveyed students prefer morning classes", "All students everywhere prefer mornings", "Mornings make students smarter", "Match the claim to the group studied."],
      ["A study finds that people who sleep more also score higher on tests. Which wording is careful?", "Sleep is associated with higher scores", "Sleep causes higher scores", "Tests make people sleep", "Association and cause are different."],
      ["Researchers write that a result 'approached significance.' A careful reader should...", "treat it as unproven", "treat it as certain", "ignore the paper", "Close is not the same as reached."],
      ["The discussion section usually does what?", "Interprets the results and notes limits", "Lists the references only", "Describes the equipment", "It explains what the findings mean."],
      ["Which sentence is a limitation?", "The sample came from a single city, so results may not apply elsewhere.", "The results were exciting.", "We thank our funders.", "A limitation names what could weaken the claim."],
      ["A paper tested a drug in mice and then says it will cure people. This is...", "overreach beyond the data", "properly cautious", "a methods detail", "Does the evidence match the claim's scope?"],
      ["Which phrase signals caution?", "The findings suggest", "The findings prove beyond any doubt", "It is obvious that", "Cautious verbs leave room for doubt."],
      ["Why read the results section yourself and not only the abstract?", "Abstracts may simplify or stress favorable parts", "Abstracts are always wrong", "Results are always shorter", "A summary can leave details out."]],
    "Compare the size and kind of evidence with the size and kind of the claim. Does the claim go further than the data?",
    "Example: 'In a class of 25, students who ate breakfast scored higher' supports a claim about that class, not 'breakfast raises scores for everyone'. Now do yours."),
    S("📊", ["Do the claims fit?", "In the <b>results</b>, authors report what they found; in the <b>discussion</b>, they interpret it and admit limits."],
      ["Match claim to data", "Small sample: modest claim. Correlation: say 'associated with', not 'causes'. Mice or one city: do not claim all people."],
      ["Watch the verbs", "'Suggests' and 'is consistent with' are careful. 'Proves' is rarely earned. Look for the limitations paragraph."])));

  L28.push(mk("Reading a philosophical argument", cr("What role does this sentence play in a philosophical argument?", ["premise", "objection", "reply"], [
      ["'All humans are mortal.'", 0, "It is a statement offered as support."],
      ["'One might object that this proves too much, since it would also make every promise worthless.'", 1, "It pushes against the claim."],
      ["'This objection fails, because promises have a point even when keeping them is costly.'", 2, "It answers an earlier challenge."],
      ["'Socrates is a human.'", 0, "It supplies a fact to build on."],
      ["'But surely a thief might say the same thing.'", 1, "It raises a problem for the view."],
      ["'The objector overlooks a key distinction, which I now draw.'", 2, "It defends the original view."],
      ["'Suppose that happiness were the only good.'", 0, "It sets up an assumption for the argument."],
      ["'Critics will say this rule cannot handle emergencies.'", 1, "It introduces a challenge."]],
      "Ask: is the sentence supporting the claim, challenging it, or answering a challenge?",
      "Example: 'Lying harms trust' supports a claim (premise). 'But some lies save lives' challenges it (objection). 'Those cases are rare and still cost trust' answers (reply). Now do yours."),
    S("🏛️", ["How philosophers write", "Philosophical papers state a thesis, give premises, consider objections and reply to them."],
      ["Signals", "Premises: 'since', 'because', 'suppose'.<br>Objections: 'one might object', 'critics say', 'but surely'.<br>Replies: 'this overlooks', 'however, this fails'."],
      ["Thought experiments and counterexamples", "A <b>thought experiment</b> imagines a case to test a principle. A <b>counterexample</b> is a case where the principle gives a bad result."])));

  L28.push(mk("Citation chaining", rc([
      ["Looking through a source's reference list to find older work is called...", "backward chaining", "forward chaining", "paraphrasing", "You move toward the past."],
      ["Finding newer papers that cite a key article uses a 'cited by' list. This is...", "forward chaining", "backward chaining", "proofreading", "You move toward the present."],
      ["A <i>review article</i> is useful early in research because it...", "summarizes the state of a field", "gives raw data only", "is always the newest word", "It is a map of what is known."],
      ["A paper that many later articles keep citing is likely a...", "foundational or seminal work", "novelty item", "typo", "Frequent citation shows influence."],
      ["You find three useful sources that all cite the same 2009 article. What should you do?", "Read the 2009 article", "Ignore it", "Cite it without reading", "Repeated citations point to something important."],
      ["Subject headings or keywords from one good article help you...", "search for related work", "check the spelling", "format your title", "They are search handles."],
      ["Why is chaining better than relying on a single search?", "It follows the scholarly conversation from source to source", "It is quicker than reading", "It avoids all errors", "Scholars refer to one another."],
      ["Before citing something you found through a footnote, you should...", "try to read the original source", "trust the footnote entirely", "copy the footnote as your own", "Check it yourself."]],
    "Ask which direction you are moving: to the sources a paper used, or to the later work that used it.",
    "Example: you read a 2020 paper on sleep. Its reference list leads to a 2005 study (backward). A database shows 50 papers citing it since (forward). Now do yours."),
    S("🔗", ["Follow the trail", "Scholars cite one another. You can use those links to find sources."],
      ["Two directions", "<b>Backward chaining</b>: read the reference list.<br><b>Forward chaining</b>: find who cited the paper since ('cited by')."],
      ["Good habits", "Start with a review article. Note repeated names and titles. Read originals rather than trusting a second-hand description."])));

  L28.push(mk("Thesis and stance in scholarly texts", rc([
      ["In a scholarly article, the thesis usually appears...", "near the end of the introduction", "in the bibliography", "in the acknowledgments", "Readers expect the main claim early."],
      ["Which sentence is most likely a thesis?", "I argue that early printing shaped how Europeans thought about authorship.", "This article has four sections.", "Printing began in the fifteenth century.", "Look for 'I argue' and a debatable claim."],
      ["'Earlier scholars have claimed X, but evidence shows Y.' The author's position is...", "Y", "X", "neither", "The word 'but' marks the pivot."],
      ["Which phrase signals the author's own claim?", "This essay contends that", "Smith describes how", "It is widely reported that", "Choose the phrase that claims, not reports."],
      ["A thesis differs from a topic because a thesis...", "makes a claim someone could dispute", "names a general subject", "lists sources", "A topic is an area; a thesis takes a stand."],
      ["Which is a topic, not a thesis?", "Urban parks in the 1800s", "Urban parks improved public health more than doctors admitted", "Parks needed money", "Which one could not be argued?"],
      ["Authors often open with 'Although many assume ...' to show...", "that they will challenge a common view", "that they agree with everyone", "that the topic is boring", "'Although' sets up a contrast."],
      ["Why identify the thesis before reading closely?", "It gives you a frame for judging each section", "It lets you skip the evidence", "It replaces the conclusion", "Each section should serve the claim."]],
    "Look for a claim that someone could dispute, often marked by phrases like 'I argue' or 'this essay shows'.",
    "Example: 'Social media was invented in the 2000s' is a fact; 'Social media has reshaped how teenagers form friendships' is a disputable thesis. Now do yours."),
    S("🎯", ["Find the claim", "Scholarly texts are built around a <b>thesis</b>: a debatable claim the author defends."],
      ["Where to look", "End of the introduction, the abstract and the conclusion. Signals: 'I argue', 'this paper contends', 'in contrast to earlier work'."],
      ["Stance", "Notice how the author positions themselves: agreeing with, correcting or extending earlier scholars. That stance frames the whole article."])));

  L28.push(MIX("Mixed practice", L28[2], L28[3], L28[5], L28[7], L28[9], L28[10], L28[13], L28[14], L28[15]));
  L28.push(MIX("Level 28 Challenge", L28[0], L28[1], L28[4], L28[6], L28[8], L28[11], L28[12], L28[16], L28[17]));

  // ================= LEVEL 29 =================
  L29.push(mk("Latin roots: grad, fus, terr, vor, scend", rc([
      ...rootRows("Latin", [
        ["grad/gress", "step or go", ["gradual", "progress", "regress"]],
        ["fus", "pour or melt", ["fusion", "transfusion", "infusion"]],
        ["terr", "earth or land", ["territory", "terrain", "terrestrial"]],
        ["vor", "eat or devour", ["carnivore", "voracious", "devour"]],
        ["scend/scens", "climb", ["ascend", "descend", "transcend"]]]),
      ["A <i>voracious</i> reader is one who...", "devours books eagerly", "reads very slowly", "dislikes stories", "Picture a reader with a huge appetite."],
      ["To <i>regress</i> is to...", "step backward", "pour out", "climb higher", "<b>re-</b> means back."],
      ["A <i>terrestrial</i> animal lives...", "on the land", "in the clouds", "deep in the ocean", "Think of the Latin word for earth."],
      ["To <i>transcend</i> a limit is to...", "climb beyond it", "pour into it", "step back from it", "<b>trans-</b> means across or beyond."],
      ["An <i>infusion</i> of cash into a business is a...", "pouring in of money", "taking away of money", "step toward it", "<b>in-</b> means into."]],
    ROOTH1, ROOTH3),
    S("🌳", ["Five more Latin roots", "Textbooks reuse these roots again and again. Learn the root and the unfamiliar word often opens up."],
      ["The roots", "<b>grad/gress</b> = step (<b>grad</b>ual)<br><b>fus</b> = pour (con<b>fus</b>e)<br><b>terr</b> = earth (<b>terr</b>ain)<br><b>vor</b> = eat (omni<b>vor</b>e)<br><b>scend</b> = climb (a<b>scend</b>)"],
      ["Build words", "<i>Con</i> + <i>fuse</i> = 'pour together', to mix up. <i>Trans</i> + <i>gress</i> = 'step across', to break a rule. <i>Omni</i> (all) + <i>vor</i> = an animal that eats all kinds of food."])));

  L29.push(mk("Greek roots: cephal, pneum, nephr, glyph, pod", rc([
      ...rootRows("Greek", [
        ["cephal", "head", ["cephalopod", "hydrocephalus", "encephalon"]],
        ["pneum", "breath or air", ["pneumonia", "pneumatic", "pneumothorax"]],
        ["nephr", "kidney", ["nephritis", "nephrology", "nephron"]],
        ["glyph", "carving", ["hieroglyph", "petroglyph", "glyph"]],
        ["pod", "foot", ["podium", "tripod", "arthropod"]]]),
      ["A <i>cephalopod</i>, such as an octopus, has feet attached to its...", "head", "back", "tail", "The name joins two roots: one for the top of the body, one for the foot."],
      ["A <i>petroglyph</i> is a...", "carving in rock", "kind of kidney", "foot-shaped tool", "<b>petr</b> means rock."],
      ["A <i>tripod</i> is a stand with...", "three feet", "three heads", "three lungs", "<b>tri-</b> means three."],
      ["A <i>pneumatic</i> drill is driven by...", "compressed air", "a heavy foot", "a carved gear", "Think of air tools and tires."],
      ["A <i>nephrologist</i> is a doctor who treats the...", "kidneys", "lungs", "feet", "<b>-ologist</b> means a student of a field."]],
    ROOTH1, ROOTH3),
    S("🐙", ["Five Greek roots", "These roots mix biology, medicine and writing systems."],
      ["The roots", "<b>cephal</b> = head (en<b>cephal</b>itis)<br><b>pneum</b> = breath (<b>pneum</b>onia)<br><b>nephr</b> = kidney (<b>nephr</b>ology)<br><b>glyph</b> = carve (hiero<b>glyph</b>)<br><b>pod</b> = foot (<b>pod</b>ium)"],
      ["Build words", "<i>Cephalo</i> (head) + <i>pod</i> (foot) = <i>cephalopod</i>, 'head-foot': squid and octopus. <i>Hiero</i> (sacred) + <i>glyph</i> (carving) = 'sacred carving', Egyptian writing."])));

  L29.push(mk("Deconstruction: reading against the grain", rc([
      ["Deconstruction, associated with Jacques Derrida, looks for places where a text...", "undermines its own stated claims", "perfectly proves its thesis", "repeats an older text exactly", "It reads for tensions inside the text."],
      ["Derrida's coined word <i>différance</i> plays on 'differ' and 'defer' to suggest that meaning is...", "never fully fixed but always postponed", "decided once by the author", "found in a dictionary", "Meaning depends on other words and is never final."],
      ["Many binary oppositions (speech/writing, man/woman) are hierarchies. Deconstruction shows that the favored term...", "depends on the one it puts down", "has nothing to do with the other", "is always correct", "Each term needs the other to mean anything."],
      ["Logocentrism is the belief that...", "language rests on a stable, fixed center of meaning", "words mean nothing", "writing is older than speech", "<b>logos</b> means word or reason."],
      ["Deconstruction is best described as...", "a careful reading that shows how meaning is unstable", "a way to destroy books", "a style of architecture only", "The word does not mean demolition."],
      ["An <i>aporia</i> in a text is...", "a moment of unresolved doubt or contradiction", "the final rhyme", "an author's signature", "The Greek word means 'no way through'."],
      ["Derrida's remark 'there is nothing outside the text' is best understood as saying...", "we reach reality through language and context, not that the world is unreal", "only books exist", "all books are lies", "It is a point about how meaning works."],
      ["'Reading against the grain' means...", "noticing what the text tries to hide or play down", "reading backward", "reading quickly", "Go beyond the surface message."]],
    "Ask what the text claims, then look for a place where its own words or oppositions pull the other way.",
    "Example: an essay praises 'natural' beauty but relies on art and cosmetics to describe it. The favored term (nature) needs its opposite (art). Now do yours."),
    S("🧵", ["Pulling at the thread", "<b>Deconstruction</b> is a way of reading that notices how texts depend on oppositions and how those oppositions unsettle themselves."],
      ["Key ideas", "<b>Binary oppositions</b> are hierarchies.<br><b>Différance</b>: meaning is delayed and depends on difference.<br><b>Aporia</b>: a knot the text cannot untie."],
      ["Careful use", "It is a close-reading method, not 'anything means anything'. A good deconstruction stays tied to the exact words."])));

  L29.push(mk("Postcolonial reading", rc([
      ["Edward Said's <i>Orientalism</i> argues that Western writing often portrayed the East as...", "exotic and fixed, in a way that served Western power", "a model of modern science", "the center of all trade", "He studied how images of 'the East' were made."],
      ["In postcolonial criticism, 'the Other' is a group...", "defined as different and lesser by the dominant group", "chosen as the hero of the story", "that writes the laws", "Think of who is seen as 'us' and who as 'them'."],
      ["Homi Bhabha's <i>hybridity</i> describes...", "the mixing of cultures in colonial and postcolonial contact", "a single pure culture", "a kind of poem", "Cultures meet and blend."],
      ["'Subaltern' refers to people...", "who lack power and whose voices are rarely heard", "who rule others", "who write textbooks", "The word means 'of lower rank'."],
      ["Chinua Achebe criticized <i>Heart of Darkness</i> because it...", "presents Africa and its people mainly as a backdrop", "was too short", "contained no description", "He asked whose voices and humanity the book allows."],
      ["'Writing back' means that authors from formerly colonized places...", "retell canonical stories from their own perspective", "avoid all older books", "write only in the former colonizer's style", "They answer the old text."],
      ["A postcolonial reader of an adventure novel set abroad would ask:", "Whose perspective is missing?", "How many pages are there?", "Is the cover colorful?", "Consider voice and power."],
      ["Why does language choice matter in postcolonial writing?", "Writing in a colonial language raises questions of power and identity", "Language never matters", "Every writer picks at random", "Which language carries which history?"]],
    "Ask who holds power in the text, whose voice is heard, and who is described by others.",
    "Example: a travel book describes villagers only as 'quaint'. A postcolonial reader notes that the villagers never speak for themselves. Now do yours."),
    S("🌍", ["Power and perspective", "<b>Postcolonial criticism</b> studies how empire, power and culture shape texts, and how writers from colonized places respond."],
      ["Key terms", "<b>Orientalism</b> (Said): stereotyped images of the East.<br><b>The Other</b>: a group cast as different.<br><b>Hybridity</b> (Bhabha): cultures mixing.<br><b>Subaltern</b>: those without voice."],
      ["Questions", "Who speaks? Who is silent? Who benefits from this picture of the world? Support answers with the text's words."])));

  L29.push(mk("New Historicism", rc([
      ["New Historicism, developed by Stephen Greenblatt, reads literary texts alongside...", "other documents from the same culture", "only other poems", "modern advertisements", "Think of laws, sermons, letters and records."],
      ["Older historical criticism treated history as 'background'. New Historicism sees literature and history as...", "shaping each other", "unrelated", "identical", "Texts are part of culture, not just a view of it."],
      ["Which source would a New Historicist place beside a play about kingship?", "A royal speech or a record of court ceremonies of the time", "A modern movie review", "A cooking guide from today", "Choose a document from the play's own era."],
      ["Anthropologist Clifford Geertz's 'thick description' influenced the movement. It means describing...", "an action along with its cultural meaning", "only the numbers", "only the words spoken", "Not just what happened but what it meant."],
      ["New Historicists often begin with a small anecdote because it can...", "reveal larger cultural concerns", "replace the main text", "avoid evidence", "A small story can open a big question."],
      ["A key idea is that texts both reflect and help to shape...", "the culture of their time", "the weather", "the printing press only", "Both arrows point in two directions."],
      ["Which question comes from New Historicism?", "What did the culture believe about power that this play also shows?", "Is the rhyme perfect?", "How many acts are there?", "It links the text to its society's beliefs."],
      ["A criticism sometimes made of this approach is that it can...", "choose evidence that fits a pattern already imagined", "ignore all documents", "avoid the past", "How might a critic use links too freely?"]],
    "Think of the text and its time as a conversation in which each shapes the other.",
    "Example: a critic reads a play about a ghost-haunted court next to records of real court fears of plots. Both reveal anxieties about trust. Now do yours."),
    S("🏰", ["Text in its time", "<b>New Historicism</b> reads a work next to non-literary writing from its era."],
      ["Key ideas", "Literature and history shape each other.<br>Small anecdotes can open large questions.<br><b>Thick description</b> explains actions and their meanings."],
      ["Caution", "Link evidence carefully. A strong reading shows real connections, not just a lucky resemblance."])));

  L29.push(mk("Genre theory", rc([
      ["A genre works like a contract between writer and reader because it sets up...", "shared expectations", "a legal agreement", "the price of the book", "Readers know what to look for."],
      ["Hans Robert Jauss's 'horizon of expectations' is the set of...", "assumptions readers bring from earlier reading", "pages in a novel", "the author's plans", "It is built from earlier works."],
      ["A detective story that reveals the culprit in chapter one before the investigation begins...", "breaks a genre convention", "obeys every convention", "is not a story", "What do readers normally expect?"],
      ["A novel that blends a detective plot with space travel is a...", "hybrid genre", "pure form", "lyric poem", "Two traditions meet."],
      ["Genres change over time because writers...", "keep reworking and challenging conventions", "never read old books", "must follow fixed laws", "New works change expectations."],
      ["Parody depends on genre because it...", "imitates familiar conventions in a funny way", "avoids convention", "is a type of nonfiction", "The reader must recognize what is being copied."],
      ["Which element is a typical convention of fairy tales?", "'Once upon a time' and a magical helper", "Footnotes and statistics", "A scientific hypothesis", "Think of the openings and figures the form expects."],
      ["Why might a critic say a book 'subverts' its genre?", "It sets up conventions, then turns them upside down", "It copies another book exactly", "It has a late ending", "It plays against expectation on purpose."]],
    "Think about what a reader expects from this kind of text, and whether the text meets or defies it.",
    "Example: a Western has a lone hero and a showdown. A film that has the hero lose at the showdown plays against that convention. Now do yours."),
    S("🎭", ["Rules we recognise", "<b>Genres</b> are families of texts with shared conventions: tragedy, detective story, epic, fairy tale."],
      ["How they work", "Genres create a <b>horizon of expectations</b>. Writers can <b>follow</b>, <b>blend</b> or <b>subvert</b> conventions."],
      ["Reading tip", "Name the genre, list its conventions, then see where the text meets or breaks them. Surprises often carry the meaning."])));

  L29.push(mk("The sublime, the uncanny and the grotesque", rc([
      ["Edmund Burke and Immanuel Kant described the <i>sublime</i> as a feeling of...", "awe before something vast or powerful", "mild amusement", "boredom", "Think of mountains and storms seen from safety."],
      ["Standing in a lodge, watching a huge thunderstorm roll over mountains, most closely matches the...", "sublime", "uncanny", "grotesque", "Awe, a little fear, and safe distance."],
      ["Freud's <i>uncanny</i> describes something that is...", "familiar yet strangely unsettling", "completely new", "very funny", "The German word means 'un-homely'."],
      ["A shop mannequin that seems almost alive is a classic image of the...", "uncanny", "sublime", "picturesque", "It is close to human but not quite right."],
      ["The <i>grotesque</i> mixes the...", "comic and the disturbing, often with distorted forms", "plain and the ordinary", "gentle and the calm", "Think of gargoyles on old buildings."],
      ["Medieval gargoyles with animal-human faces are an example of the...", "grotesque", "sublime", "beautiful", "They distort and mix forms in a half-funny, half-strange way."],
      ["The <i>beautiful</i> in classical theory stresses...", "harmony, proportion and calm pleasure", "overwhelming power", "unsettling strangeness", "Beauty soothes; the sublime shakes."],
      ["Which scene is best described as uncanny?", "A familiar house where every room seems slightly wrong", "A giant canyon at sunrise", "A cheerful parade", "Choose the one that makes the familiar strange."]],
    "Match the feeling: awe at vastness, strangeness in the familiar, or a mix of comic and disturbing distortion.",
    "Example: a fairground funhouse mirror that stretches faces into odd shapes is closer to the grotesque than to the sublime. Now do yours."),
    S("🏔️", ["Aesthetic categories", "Critics use special words for kinds of experience that art can create."],
      ["Three terms", "<b>Sublime</b>: awe before the vast and powerful.<br><b>Uncanny</b>: the familiar made strange.<br><b>Grotesque</b>: distorted mixtures, comic and disturbing."],
      ["Use them with care", "Name the feeling the text creates and point to the details that cause it. These are tools for reading, not labels to stick on at random."])));

  L29.push(mk("How a canon is made", rc([
      ["A <i>literary canon</i> is...", "a body of works widely regarded as important", "a type of cannon", "a book's index", "It is a kind of 'must-read' list."],
      ["Which does NOT help form a canon?", "The weather on a publication day", "School syllabi", "Prizes and anthologies", "Think of the institutions that choose books."],
      ["Canons change over time because...", "values and readers change", "books vanish at random", "paper wears out", "What counts as important is debated."],
      ["'Recovery' projects aim to...", "bring back overlooked authors and works", "ban old books", "burn poor copies", "They search archives for neglected writers."],
      ["Zora Neale Hurston's novel <i>Their Eyes Were Watching God</i> was brought back to wide attention in the 1970s partly through...", "the work of Alice Walker and other readers", "a movie in the 1930s", "a school ban", "Writers and scholars championed it."],
      ["Critics of old canons often say they left out...", "many women, writers of color and non-Western authors", "all poetry", "all long novels", "Whose voices were less represented?"],
      ["Defenders of a canon may argue that it...", "preserves works with lasting artistic power", "should never change", "is chosen by accident", "They stress shared standards of quality."],
      ["A sensible way to use a canon is to...", "read widely and ask who chose the list and why", "treat it as final", "ignore it completely", "Both respect and questioning help."]],
    "Ask who chooses, by what standards, and what might be missing.",
    "Example: a school list of 'great books' with no writers from outside Europe prompts the question: whose books were counted as great, and why? Now do yours."),
    S("📚", ["Who gets read?", "A <b>canon</b> is a set of works treated as central. It is made by teachers, critics, publishers, prizes and readers."],
      ["Changing lists", "Canons shift. Critics in the later 20th century argued that many lists left out women, people of color and non-Western writers. Scholars recovered many works."],
      ["Balanced view", "Some argue canons keep standards of quality; others say standards reflect power. Reading widely lets you judge for yourself."])));

  L29.push(mk("Simpson's paradox", rc([
      ["Simpson's paradox occurs when a trend in several groups...", "reverses when the groups are combined", "grows stronger when combined", "never appears in data", "Combining data can flip the picture."],
      ["Treatment A beats B for both small and large kidney stones, yet B looks better overall. The likely cause is that...", "A was given to more of the harder cases", "B is always better", "stones do not matter", "Group sizes and difficulty differ across treatments."],
      ["A hidden variable that changes the picture when ignored is a...", "lurking or confounding variable", "title", "footnote", "It sits behind the numbers."],
      ["To avoid being fooled, you should...", "look at the subgroups as well as the totals", "trust totals only", "ignore percentages", "Break the data into meaningful groups."],
      ["A university department admits a higher share of women than men in every department, but overall admits a lower share of women. Why is this possible?", "More women applied to the harder-to-enter departments", "Admissions are random", "Percentages never add up", "Compare the mix of applicants across groups."],
      ["Which fact would you want first when a total conflicts with the groups?", "How the cases were divided among the groups", "The color of the chart", "The author's age", "Ask how the groups differ in size and type."],
      ["The 'paradox' is not a mathematical error. It happens because...", "totals mix groups of different sizes", "numbers are wrong", "averages are illegal", "Weights matter."],
      ["Which summary shows awareness of the paradox?", "The overall figure hides differences between groups, so look closer", "The overall figure is always the truth", "Subgroups are unimportant", "A careful reader checks the parts."]],
    "Ask whether combining groups of different sizes or types might hide or flip a pattern.",
    "Example: Team X wins a higher share of its easy games and its hard games than Team Y, yet has a lower overall record because it plays far more hard games. The mix of games matters. Now do yours."),
    S("🔀", ["When totals mislead", "In <b>Simpson's paradox</b>, a trend present in each group disappears or reverses when the groups are merged."],
      ["Why it happens", "The groups differ in size or in a hidden factor. A group with many hard cases can drag down an overall rate."],
      ["What to do", "Look at the subgroups. Ask which comparison answers your question, and what other variable might be hiding."])));

  L29.push(mk("Confidence intervals", rc([
      ["A poll reports 52% support with a 95% confidence interval from 49% to 55%. Can you say a majority supports the plan?", "Not clearly, since the interval includes values below 50%", "Yes, because 52 is above 50", "Yes, because it is 95%", "Look at the whole range, not only the middle."],
      ["A wider interval tells you the estimate is...", "less precise", "more precise", "certain", "A wide range means more uncertainty."],
      ["Which change usually narrows a confidence interval?", "A larger sample", "A smaller sample", "A longer title", "More data gives a steadier estimate."],
      ["A 95% confidence interval is best described as a method that...", "captures the true value in about 95% of repeated studies", "holds exactly 95% of the data", "makes the result 95% important", "It describes the long-run performance of the method."],
      ["A study of a diet reports an average loss of 2 kg with an interval from -1 kg to 5 kg. What can you say?", "A true change of zero or a gain is still plausible", "Everyone lost 2 kg", "The diet is proven", "Check whether zero lies inside the range."],
      ["Two groups' intervals do not overlap at all. This suggests their difference is...", "likely real", "impossible", "unknown", "Separated ranges are strong evidence."],
      ["Why report an interval, not only an average?", "It shows how uncertain the estimate is", "It makes the study shorter", "It hides the sample", "One number hides the range."],
      ["The '±3 points' in a poll is called the...", "margin of error", "median", "bias", "It describes how far results might wander by chance."]],
    "Look at the whole range of the interval and ask whether an important value (such as zero or 50%) lies inside it.",
    "Example: a test improves scores by 4 points, interval 1 to 7. Zero is outside the range, so a real gain is plausible. If the interval were -2 to 10, zero would be inside. Now do yours."),
    S("📏", ["Estimates with a range", "A <b>confidence interval</b> gives a range of plausible values for a quantity, not just a single guess."],
      ["Reading one", "Wide = imprecise; narrow = precise. Larger samples narrow it. If the range includes 'no effect', the data do not rule out no effect."],
      ["Careful wording", "A 95% interval is a method that works about 95% of the time over many studies. It does not mean 95% of the data are inside it."])));

  L29.push(mk("Meta-analysis and publication bias", rc([
      ["A <i>meta-analysis</i> is a study that...", "combines the results of many earlier studies", "repeats one experiment once", "collects opinions", "It is a study of studies."],
      ["The 'file drawer problem' happens when studies with unexciting results...", "are never published", "are published twice", "are always correct", "Findings that stay in a drawer cannot be counted."],
      ["Publication bias can make a treatment look...", "better than it really is", "worse than it really is", "unchanged", "Only the successes are seen."],
      ["A funnel plot with missing small studies on one side suggests...", "some results may be missing", "the sample is perfect", "the studies are identical", "It checks whether the published pattern looks lopsided."],
      ["'Garbage in, garbage out' warns that a meta-analysis is only as good as...", "the studies it combines", "its title", "its length", "Pooling bad data does not repair it."],
      ["Pre-registering a study (stating the plan in advance) helps because it...", "makes it harder to hide unwelcome results", "guarantees a positive result", "removes the need for data", "The public record shows what was planned."],
      ["A systematic review differs from a casual literature summary because it...", "follows a stated, repeatable search and selection method", "uses only favorite papers", "ignores sample size", "The method is planned and open."],
      ["Combining studies with very different methods can be a problem because...", "the studies may not measure the same thing", "bigger is always worse", "it is illegal", "Are the results comparable?"]],
    "Ask whether the studies pooled are a fair and complete picture, or whether it is lopsided or mixes things that do not belong together.",
    "Example: twelve trials of a vitamin are published showing a benefit; five trials showing no benefit were never published. A pooled result will overstate the benefit. Now do yours."),
    S("🗄️", ["Studies of studies", "A <b>meta-analysis</b> pools results from many studies to get a clearer estimate."],
      ["The danger", "<b>Publication bias</b>: exciting results get published and null results stay in the 'file drawer', so the pooled picture is skewed."],
      ["Safeguards", "Systematic searches, funnel plots, pre-registration and checking study quality. Always ask what is missing."])));

  L29.push(mk("Construct validity and measurement", rc([
      ["An <i>operational definition</i> turns an abstract idea into...", "something you can measure", "a poem", "a rule of grammar", "It says exactly how you will measure."],
      ["A study measures 'happiness' by counting how many times people smile. The weakness is that smiling...", "may not capture happiness", "is easy to count", "needs no tools", "Does the measure match the concept?"],
      ["<i>Reliability</i> means a measure gives...", "consistent results", "surprising results", "only high scores", "Same thing measured again, same result."],
      ["<i>Validity</i> asks whether a measure...", "really measures what it claims to", "is cheap", "is popular", "Accuracy to the idea, not just consistency."],
      ["A bathroom scale always reads 2 kg too high. It is...", "reliable but not valid", "valid but not reliable", "neither", "It is steady, yet wrong."],
      ["A test of 'reading skill' that only checks how fast students turn pages has poor...", "construct validity", "punctuation", "grading", "The test does not measure the skill it names."],
      ["Using several measures of the same concept helps because it...", "gives a fuller picture", "wastes time", "removes all errors", "One measure may miss something."],
      ["Which is the best operational definition of 'physical fitness' for a school study?", "Time to run 1 mile plus number of push-ups in one minute", "How cool someone looks", "Whether they own sneakers", "Choose a clear, measurable set of tests."]],
    "Ask whether the number really captures the idea, and whether the same measure would give the same answer again.",
    "Example: 'Reading skill' could be measured by a comprehension test with questions on a passage, not by how many books a child owns. Now do yours."),
    S("📐", ["Measuring ideas", "Concepts such as intelligence, stress or fitness cannot be seen directly. Researchers give them <b>operational definitions</b>."],
      ["Two checks", "<b>Reliability</b>: consistent.<br><b>Validity</b>: measures the right thing. <b>Construct validity</b> asks whether the measure fits the idea."],
      ["Reading tip", "Whenever a study reports on a big concept, find the actual measure. The conclusions are only as strong as the measure."])));

  L29.push(mk("Internal and external validity", rc([
      ["<i>Internal validity</i> asks whether...", "the study shows what caused the effect within the study", "the results apply to everyone", "the report is short", "Can we trust the cause-and-effect claim here?"],
      ["<i>External validity</i> asks whether the results...", "generalize to other people and settings", "are well written", "were funded", "Do they travel beyond the study?"],
      ["Random assignment mainly strengthens...", "internal validity", "external validity", "the title", "It balances hidden differences between groups."],
      ["Random sampling from a whole population mainly strengthens...", "external validity", "internal validity", "reliability", "It makes the sample represent the group."],
      ["A study of 80 first-year psychology students at one university may have limited external validity because...", "the sample is narrow", "the students are random", "the study is controlled", "Who else might differ from them?"],
      ["A lab experiment can have strong internal validity yet weak external validity because...", "real life is messier than the lab", "labs are unscientific", "labs have no controls", "Control gives clarity but may lose realism."],
      ["A confound is a threat to...", "internal validity", "external validity", "spelling", "A hidden factor could explain the effect."],
      ["Which is a good reason to doubt generalizing a drug trial to children?", "The trial included only adults", "The trial was blind", "The drug had a name", "Check who was in the study."]],
    "Ask two questions: can we trust the cause within the study, and can we apply it to others?",
    "Example: a study of a new teaching method in one small private school may show it works there (internal) but not that it will work in every school (external). Now do yours."),
    S("🧭", ["Two kinds of trust", "<b>Internal validity</b>: did the treatment really cause the result in this study?<br><b>External validity</b>: do the results hold for other people, places and times?"],
      ["Helpers", "Random assignment and good controls protect internal validity. Random, diverse samples and real-world settings protect external validity."],
      ["Trade-offs", "Tight lab control may sacrifice realism. Good readers weigh both before using a result."])));

  L29.push(mk("Stasis theory: what is the question?", cr("Which stasis (kind of question) is this?", ["fact (did it happen?)", "definition (what is it?)", "quality (how good or serious?)", "policy (what should we do?)"], [
      ["'Did the factory release the chemicals into the river?'", 0, "It asks whether something occurred."],
      ["'Does leaving a bag in a hallway count as littering?'", 1, "It asks how a term applies."],
      ["'Was the flood response a serious failure?'", 2, "It asks about the degree or value of an event."],
      ["'Should the city build a new bridge?'", 3, "It asks for a course of action."],
      ["'Is a hot dog a sandwich?'", 1, "The dispute is over what a word covers."],
      ["'Did the team really break the record last year?'", 0, "It asks whether a claim is true."],
      ["'How harmful is a ten-minute commute by car to the climate?'", 2, "It asks about the weight or seriousness of an effect."],
      ["'What steps should schools take to reduce absences?'", 3, "It seeks solutions."]],
      "Ask what the argument is really about: whether it happened, what it is called, how much it matters, or what to do.",
      "Example: 'Was the storm a hurricane?' is a definition question. 'Did the storm occur?' is fact. 'Should we evacuate?' is policy. Now do yours."),
    S("🧱", ["Find the real dispute", "<b>Stasis theory</b> (from ancient rhetoric) says arguments move through questions in order."],
      ["Four questions", "<b>Fact</b>: did it happen?<br><b>Definition</b>: what is it?<br><b>Quality</b>: how good, bad or serious?<br><b>Policy</b>: what should be done?"],
      ["Why use it", "People often argue past each other because they are at different stases. Settle the earlier question first."])));

  L29.push(mk("Dialectic: thesis and counter-thesis", rc([
      ["The Socratic method moves toward truth by...", "asking questions that test someone's claims", "giving a long lecture", "voting", "Socrates drew out contradictions."],
      ["In a Hegelian-style summary, the three steps are often called...", "thesis, antithesis, synthesis", "claim, proof, stop", "start, middle, end", "Three beats: a claim, its opposite, and a combination."],
      ["A <i>synthesis</i> in this pattern usually...", "keeps what is sound in both sides", "ignores both sides", "repeats the first claim", "It is not a mere compromise."],
      ["Thesis: 'Art should be free of any rules.' Antithesis: 'Art should serve society.' Which is a reasonable synthesis?", "Art can be free and still engage society's concerns", "Art must be banned", "Art is only a game", "Look for a view that keeps part of each."],
      ["A dialectical reader of an essay asks:", "What is the strongest opposing view, and how does the argument deal with it?", "How many paragraphs are there?", "Is the font plain?", "Look for the other side."],
      ["Why can a one-sided essay be weaker?", "It never tests its claim against serious objections", "It is too short", "It is too sure of the sources", "What has it not faced?"],
      ["In dialectic, a contradiction between two views is seen as...", "a chance to reach a better understanding", "proof that both are worthless", "a spelling error", "Tension can lead forward."],
      ["Which move is dialectical?", "Stating an objection fairly and then answering it", "Ignoring the objection", "Repeating the claim louder", "It engages the opposite."]],
    "Ask what the opposing view is, then look for a position that keeps what is true on both sides.",
    "Example: Thesis 'Homework builds habits.' Antithesis 'Homework steals family time.' Synthesis: 'Short, focused homework can build habits without crowding family life.' Now do yours."),
    S("♻️", ["Truth through opposition", "<b>Dialectic</b> began as a way of arguing by question and answer (Socrates and Plato)."],
      ["A common pattern", "<b>Thesis</b>: a claim.<br><b>Antithesis</b>: the best opposing claim.<br><b>Synthesis</b>: a new view that keeps what is sound in each."],
      ["Use it", "When you read a debate, name the thesis and antithesis. Then ask what a fair synthesis would look like."])));

  L29.push(mk("Moral reasoning: three traditions", cr("Which tradition of moral reasoning does this resemble?", ["consequentialist (results)", "deontological (duties)", "virtue ethics (character)"], [
      ["'I keep my promises because breaking a promise is wrong, whatever happens.'", 1, "The rule matters more than the outcome."],
      ["'I donated because it would help the greatest number of people.'", 0, "It weighs outcomes."],
      ["'I acted as a brave and honest person would.'", 2, "It asks what a good character does."],
      ["'Lying is acceptable here only if it leads to the best overall outcome.'", 0, "Results decide."],
      ["'Everyone has a duty to respect others, and no goal can excuse using a person as a mere tool.'", 1, "It speaks of duties owed."],
      ["'The question is not only what to do, but what sort of person I become by doing it.'", 2, "It centers on character."],
      ["'We should choose the policy with the lowest total harm.'", 0, "It adds up effects."],
      ["'Some acts are forbidden even if they would produce good results.'", 1, "Some rules hold regardless."]],
      "Ask what the speaker treats as the key test: outcomes, duties or rules, or character.",
      "Example: 'I told the truth because honesty is part of who I want to be' fits virtue ethics. 'I told the truth because it led to the best results' fits consequentialism. Now do yours."),
    S("🧭", ["Three ways to reason about right", "Philosophers have long grouped ethical thinking into broad traditions."],
      ["The three", "<b>Consequentialism</b>: judge by results (utilitarianism).<br><b>Deontology</b>: judge by duties and rules (Kant).<br><b>Virtue ethics</b>: judge by character (Aristotle)."],
      ["Reading tip", "When an essay argues about right and wrong, name the test it uses. Different tests can give different answers about the same case."])));

  L29.push(mk("Reading dense theoretical prose", rc([
      ["Faced with a very long, abstract sentence, a good first step is to find...", "the main subject and verb", "the longest word", "the author's photo", "Strip it down to the core."],
      ["Authors of theory often define 'terms of art'. You should...", "note the definition and track how the term is used", "skip the term", "replace it with any synonym", "Specialized words carry specific meaning."],
      ["Reading the introduction and conclusion before the middle helps you to...", "know where the argument is heading", "avoid the evidence", "memorize the page count", "A map makes the journey easier."],
      ["The pattern 'not X but Y' often signals...", "the author's own position, Y", "that X is the thesis", "a list of sources", "The author is correcting a view."],
      ["A paragraph-by-paragraph paraphrase in your own words helps because it...", "tests whether you actually understood", "shortens the book", "replaces reading", "If you cannot restate it, you may not follow it."],
      ["When a theoretical text uses a concrete example, you should...", "use it to test your grasp of the abstract idea", "ignore it", "treat it as the thesis", "Examples anchor abstractions."],
      ["If a term keeps recurring in an unfamiliar text, you should...", "work out its meaning from the way it is used", "assume it is unimportant", "skip every sentence containing it", "Repetition marks key concepts."],
      ["The best response to a passage you do not understand is to...", "reread it slowly with these strategies", "give up at once", "memorize it unchanged", "Hard texts reward patient rereading."]],
    "Break the text down: main clause first, then terms, then the overall move of the argument.",
    "Example: 'The commodification of attention reconfigures labor.' Core: 'commodification reconfigures labor.' Then ask what 'commodification' means: turning something into a product. Now do yours."),
    S("🔬", ["Tough reading made manageable", "Theory and research writing is dense because it packs many ideas into few words."],
      ["Strategies", "Find the main subject and verb. Mark key terms and their definitions. Read the abstract, introduction and conclusion first. Paraphrase every paragraph."],
      ["Patience", "Expect to reread. After each section, say in one sentence what it adds to the argument."])));

  L29.push(mk("Joining the scholarly conversation", cr("What does this sentence do in a scholarly paper?", ["reports others' view", "states the author's claim", "agrees and disagrees"], [
      ["'Many critics have argued that the novel is a satire of wealth.'", 0, "It reports what others say."],
      ["'I contend that the novel also criticizes the ideal of self-reliance.'", 1, "It puts forward the author's own view."],
      ["'Although Lee is right that the plot is circular, she overlooks how the ending breaks the loop.'", 2, "It accepts part and challenges part."],
      ["'Previous studies have focused mainly on urban schools.'", 0, "It describes earlier research."],
      ["'This paper shows that rural schools face a different problem.'", 1, "The author announces a result."],
      ["'Smith's data are useful, but they cannot support his broad conclusion.'", 2, "It credits and criticizes."],
      ["'A common assumption holds that students learn best alone.'", 0, "It states a view held by others."],
      ["'In this essay, I argue for a third explanation.'", 1, "A direct statement of position."]],
      "Look for who is speaking: 'many critics' (others), 'I argue' (author), or 'although ... but' (both).",
      "Example: 'Some say homework helps' reports others. 'I argue homework should be shorter' states the claim. 'Homework helps, but not as much as claimed' agrees and disagrees. Now do yours."),
    S("💬", ["They say, I say", "Scholarly writing is a conversation. Authors report what others say and then add their own voice (Graff and Birkenstein's 'They Say / I Say')."],
      ["Three moves", "<b>Summarize</b> others' view.<br><b>Claim</b> your own view.<br><b>Agree and disagree</b>: 'yes, but', crediting what is sound."],
      ["Reading tip", "Mark which sentences voice others and which voice the author. Never mistake a view the author reports for the author's own claim."])));

  L29.push(MIX("Mixed practice", L29[2], L29[3], L29[5], L29[7], L29[9], L29[11], L29[13], L29[15], L29[17]));
  L29.push(MIX("Level 29 Challenge", L29[0], L29[1], L29[4], L29[6], L29[8], L29[10], L29[12], L29[14], L29[16]));

  // ================= LEVEL 30 =================
  L30.push(mk("Latin roots: lingu, cord, pug, nounc, dign", rc([
      ...rootRows("Latin", [
        ["lingu", "tongue or language", ["linguist", "bilingual", "linguistics"]],
        ["cord", "heart", ["cordial", "accord", "concord"]],
        ["pug", "fight", ["pugnacious", "repugnant", "impugn"]],
        ["nounc/nunc", "announce or declare", ["pronounce", "denounce", "renounce"]],
        ["dign", "worthy", ["dignity", "indignant", "dignitary"]]]),
      ["A <i>bilingual</i> person speaks...", "two languages", "two dialects of silence", "very loudly", "<b>bi-</b> means two."],
      ["A <i>cordial</i> welcome is...", "warm and hearty", "cold and formal", "loud and fast", "Think of welcome 'from the heart'."],
      ["A <i>pugnacious</i> debater is one who...", "loves to argue and fight", "avoids every argument", "speaks very quietly", "The root is about fighting."],
      ["To <i>denounce</i> a policy is to...", "declare publicly that it is wrong", "make it secret", "quietly accept it", "<b>de-</b> can mean down or against."],
      ["To feel <i>indignant</i> is to feel...", "angry at something unworthy or unfair", "very sleepy", "proud of a friend", "<b>in-</b> here means not; the root names worth."]],
    ROOTH1, ROOTH3),
    S("🌳", ["Five more Latin roots", "Many of these roots appear in the words used in law, politics and debate."],
      ["The roots", "<b>lingu</b> = tongue (<b>lingu</b>ist)<br><b>cord</b> = heart (<b>cord</b>ial)<br><b>pug</b> = fight (<b>pug</b>nacious)<br><b>nounc</b> = declare (an<b>nounc</b>e)<br><b>dign</b> = worthy (<b>dign</b>ity)"],
      ["Build words", "<i>Re</i> (back) + <i>nounce</i> = 'declare back', to give up. <i>Con</i> + <i>cord</i> = 'hearts together', agreement. <i>Dis</i> + <i>cord</i> = 'hearts apart', disagreement."])));

  L30.push(mk("Greek roots: iatr, aesth, typ, plas, nom", rc([
      ...rootRows("Greek", [
        ["iatr", "healing or medical treatment", ["pediatrics", "psychiatrist", "geriatrics"]],
        ["aesth", "feeling or perception", ["aesthetic", "anesthesia", "synesthesia"]],
        ["typ", "mark, model or type", ["prototype", "stereotype", "typography"]],
        ["plas", "mold or form", ["plastic", "plasticity", "cytoplasm"]],
        ["nom", "law or order", ["astronomy", "economy", "autonomy"]]]),
      ["<i>Anesthesia</i> is the loss of...", "feeling", "memory", "speech", "<b>an-</b> means without."],
      ["A <i>prototype</i> is the...", "first model of something", "last version", "copy of a copy", "<b>proto-</b> means first."],
      ["<i>Autonomy</i> is the right to...", "govern oneself", "copy others", "mold clay", "<b>auto-</b> means self."],
      ["<i>Plasticity</i> of the brain means it can...", "change its form with experience", "never change", "turn into plastic", "Think of something that can be molded."],
      ["A <i>geriatrician</i> is a doctor who treats...", "older people", "children", "animals", "<b>ger-</b> relates to old age; the other root is about healing."]],
    ROOTH1, ROOTH3),
    S("🌳", ["Five Greek roots", "Greek roots are common in medicine, art and the social sciences."],
      ["The roots", "<b>iatr</b> = healing (pe<b>diatr</b>ics)<br><b>aesth</b> = feeling (<b>aesth</b>etic)<br><b>typ</b> = model (proto<b>typ</b>e)<br><b>plas</b> = mold (<b>plas</b>tic)<br><b>nom</b> = law (astro<b>nom</b>y)"],
      ["Build words", "<i>Astro</i> (star) + <i>nomos</i> (law) = <i>astronomy</i>, the laws of the stars. <i>Pais</i> (child) + <i>iatr</i> = <i>pediatrics</i>, healing of children."])));

  L30.push(mk("Discourse and power", rc([
      ["Michel Foucault used <i>discourse</i> to mean...", "a system of ways of speaking that shapes what counts as knowledge", "a single speech", "a type of rhyme", "It is a system, not an event."],
      ["The phrase 'power/knowledge' suggests that...", "what counts as knowledge is tied up with who holds power", "power and knowledge never meet", "only scientists have power", "Each shapes the other."],
      ["A <i>genealogy</i>, in Foucault's sense, is...", "a history of how an idea came to seem natural", "a family tree", "a list of rulers", "It shows ideas have beginnings."],
      ["Bentham's <i>panopticon</i>, a prison designed so that guards can see all cells, became Foucault's image for...", "surveillance that shapes behavior", "a library", "a hospital", "People act differently when they might be watched."],
      ["To say a category such as 'normal' is socially constructed means it...", "is shaped by history and culture, not just nature", "is imaginary", "is always false", "Its meaning has a history."],
      ["A critic who asks 'Who gets to define what is acceptable in this text?' is thinking about...", "discourse and power", "meter", "rhyme", "The question is about authority."],
      ["Foucault did NOT claim that...", "all knowledge is meaningless", "discourse shapes what is thinkable", "power works through institutions", "Which statement goes far beyond his claims?"],
      ["Which source would show a historical change in discourse?", "How official documents describe a topic across 150 years", "A single author's diary", "A modern recipe", "Compare how the language changes over time."]],
    "Ask who is allowed to define terms, and how the language used makes some ideas easy to say and others hard.",
    "Example: old school rules describe students as 'idle' or 'diligent'. The words shape what teachers see and reward. Tracking such words is a study of discourse. Now do yours."),
    S("🕸️", ["Words, knowledge and power", "<b>Foucault</b> argued that language and institutions together shape what a society treats as true or normal."],
      ["Key ideas", "<b>Discourse</b>: a system of statements.<br><b>Power/knowledge</b>: they shape each other.<br><b>Genealogy</b>: tracing how ideas became 'natural'."],
      ["Use with care", "This is a lens for questions, not a verdict. Support any claim with exact words from the documents you study."])));

  L30.push(mk("Strict forms: villanelle, sestina, ghazal, pantoum", rc([
      ["A <i>villanelle</i> has 19 lines and two lines that...", "repeat as refrains", "never repeat", "must rhyme with 'love'", "The form is built on repetition."],
      ["Dylan Thomas's 'Do Not Go Gentle into That Good Night' is a famous...", "villanelle", "sestina", "haiku", "Look for its two refrain lines."],
      ["A <i>sestina</i> repeats six end-words in a rotating order across...", "six stanzas and a short closing envoi", "two stanzas", "one long stanza", "Thirty-nine lines in all."],
      ["The total number of lines in a sestina is...", "39", "14", "19", "Six stanzas of six lines, plus a three-line envoi."],
      ["A <i>ghazal</i> is made of couplets and a repeated...", "refrain word or phrase at the end of the second line", "title", "number", "It comes from Arabic and Persian poetry."],
      ["In a <i>pantoum</i>, lines 2 and 4 of one stanza become...", "lines 1 and 3 of the next", "the closing couplet", "the title", "The poem keeps looping back."],
      ["Why might a poet choose a form built on repetition?", "Repeating lines can show obsession, memory or grief", "It makes the poem shorter", "It removes the need for imagery", "Form can carry meaning."],
      ["The refrain in a villanelle can change meaning because...", "the lines around it change its context", "the words are different", "it is censored", "Same words, new setting."]],
    "Count lines and spot repeats. Ask what pattern of repetition the form demands.",
    "Example: a sonnet has 14 lines. A haiku has three short lines. A villanelle has 19 lines with two refrains. Count and look for the repeating pattern. Now do yours."),
    S("🔁", ["Forms with rules", "Some poems follow strict patterns of repetition. The form shapes the meaning."],
      ["Four forms", "<b>Villanelle</b>: 19 lines, two refrains.<br><b>Sestina</b>: 39 lines, six rotating end-words.<br><b>Ghazal</b>: couplets with a repeated refrain.<br><b>Pantoum</b>: lines return in the next stanza."],
      ["Reading tip", "Notice what returns and how its meaning shifts each time. The pattern is part of the poem's message."])));

  L30.push(mk("Reading a translation", rc([
      ["Lawrence Venuti calls a smooth translation that hides its foreign origin a...", "domesticating translation", "foreignizing translation", "word-for-word gloss", "It makes the text feel at home in the new language."],
      ["A <i>foreignizing</i> translation tries to...", "keep traces of the original language and culture", "hide the translator", "change every name", "It lets the reader feel the distance."],
      ["'The translator's invisibility' describes translations that...", "read as if originally written in the new language", "list the translator's name big", "skip the middle", "You forget a translator was involved."],
      ["Why can no translation be perfect?", "Languages carve up meaning, sound and culture differently", "Translators are lazy", "Words never have meanings", "Think of puns and sounds."],
      ["Comparing two translations of the same poem helps you see...", "choices the translators made", "which is longer", "nothing", "Differences reveal decisions."],
      ["When you quote a translated work in an essay, you should...", "note that you are using a translation and name the translator", "never quote", "present it as the original words", "Credit the person whose words you are reading."],
      ["A <i>literal</i> translation stays close to the original...", "words and structure", "meaning only", "sound only", "The word links to 'letter'."],
      ["A translator of a rhyming poem must decide between...", "keeping the exact words or keeping the sound and feel", "ink and paper", "short and long titles", "Two things often cannot both be kept."]],
    "Ask what the translator kept and what was changed, and what that choice does for the reader.",
    "Example: translating a French idiom word for word gives nonsense, so a translator may replace it with an English idiom. That choice favors readers' ease over closeness. Now do yours."),
    S("🌐", ["Reading in translation", "A translation is an interpretation, not a clear window."],
      ["Two strategies", "<b>Domesticating</b>: smooth, familiar.<br><b>Foreignizing</b>: keeps some strangeness of the original (Venuti)."],
      ["Good habits", "Name the translator. Compare translations when you can. Be careful when you analyze small word choices that may belong to the translator."])));

  L30.push(mk("Metaphors in science", rc([
      ["Richard Dawkins's phrase 'the selfish gene' is a metaphor that...", "pictures genes as if they had motives", "proves that genes feel", "names a disease", "It uses a human trait for a molecule."],
      ["A risk of the 'selfish gene' phrase is that readers may think genes...", "make conscious choices", "exist", "are made of DNA", "Metaphors can suggest more than intended."],
      ["The name 'Big Bang' was first used by Fred Hoyle, who did not favor that theory. This shows that a name can be...", "memorable without being a precise description", "a mathematical proof", "an official law", "It was catchy, not exact."],
      ["The 'greenhouse effect' compares the atmosphere to a greenhouse. A limit of the comparison is that...", "the atmosphere traps heat by a different process than glass does", "greenhouses are not warm", "gases are plants", "A metaphor fits in some ways and not others."],
      ["'Junk DNA' suggested that some DNA is useless. Later work found some of it has functions, so the label...", "can mislead", "was perfect", "proved useful", "Names can hide later discoveries."],
      ["A 'black hole' was a name popularized by John Wheeler in the 1960s. Why do scientists adopt vivid names?", "They make ideas easy to remember and discuss", "They prove the theory", "They replace equations", "Images stick."],
      ["A good critical question about a science metaphor is:", "What does it highlight and what does it hide?", "Is it colorful?", "Is it short?", "Every picture shows some things and hides others."],
      ["Metaphors in science are best treated as...", "helpful tools that need checking against the evidence", "exact facts", "mistakes", "They guide thought but do not replace data."]],
    "Ask what the picture lets you see and what it leaves out or exaggerates.",
    "Example: calling the heart a 'pump' helps explain blood flow, but it hides that the heart is also a living tissue with its own needs. Now do yours."),
    S("💡", ["Pictures that explain", "Scientists use metaphor to make unfamiliar ideas graspable: waves, fields, bottlenecks, bugs."],
      ["Strengths and risks", "A metaphor highlights a likeness but may suggest false ones. 'Selfish gene' is about effects on inheritance, not feelings."],
      ["Reading tip", "Find the metaphor, list where it fits and where it breaks, and check what the data actually show."])));

  L30.push(mk("Paradigm shifts", rc([
      ["In Thomas Kuhn's account, 'normal science' is research that...", "works inside an accepted framework", "overthrows all theories", "avoids evidence", "Most science solves puzzles inside a paradigm."],
      ["An <i>anomaly</i> is a result that...", "does not fit the current framework", "confirms everything", "is always a mistake", "It is the odd result that nags."],
      ["When anomalies pile up and the framework strains, Kuhn spoke of a...", "crisis", "celebration", "tradition", "The old approach loses confidence."],
      ["A <i>paradigm shift</i> is a change in...", "the basic framework scientists use", "a lab's address", "a journal's title", "The shift is deep and broad."],
      ["Which is often cited as a paradigm shift?", "From an Earth-centered to a Sun-centered model of the solar system", "Buying a new microscope", "A new journal issue", "Think of the Copernican revolution."],
      ["Kuhn said that rival paradigms can be partly <i>incommensurable</i>, meaning they...", "lack a common measure and are hard to compare directly", "are identical", "never meet", "Standards and terms shift between them."],
      ["Critics of Kuhn argue that his view may make science seem too...", "dependent on social agreement", "mathematical", "slow to change", "They worried about irrational shifts."],
      ["Why is the idea useful to a reader of history of science?", "It explains why big changes come in bursts, not only in small steps", "It shows science never changes", "It proves all theories are wrong", "It highlights sudden restructuring."]],
    "Ask whether the case describes work inside an accepted framework or a replacement of the framework itself.",
    "Example: measuring a planet's orbit more exactly is normal science. Showing that Newton's laws fail at high speeds and giving relativity is a shift. Now do yours."),
    S("🔭", ["How science changes", "Thomas Kuhn's <i>The Structure of Scientific Revolutions</i> (1962) proposed that science moves in phases."],
      ["The cycle", "<b>Normal science</b> inside a paradigm, then <b>anomalies</b>, then <b>crisis</b>, then a <b>revolution</b> that gives a new paradigm."],
      ["Debate", "Many historians find the picture helpful, but critics say it overstates the breaks. Use it as a lens, not a law."])));

  L30.push(mk("Spotting pseudoscience", rc([
      ["Which is a warning sign of pseudoscience?", "Claims that cannot be tested or shown wrong", "Careful statements of limits", "Published data", "Real science risks being wrong."],
      ["A product's promotion relies mainly on personal stories. This is weak because anecdotes...", "cannot show how common or typical a result is", "always prove the claim", "are illegal", "Ask how many were tried and what happened to the rest."],
      ["A group says scientists reject its idea because of a cover-up. This avoids the question of...", "whether the evidence supports the idea", "who is rich", "the weather", "A claim must still be backed by data."],
      ["'It is ancient wisdom, so it works.' This is a version of...", "appeal to tradition", "careful measurement", "controlled testing", "Old does not mean tested."],
      ["Cherry-picking means...", "citing only data that support a favored claim", "picking fruit", "listing all results", "What happened to the contrary data?"],
      ["Which source is the strongest guide to whether a health treatment works?", "A well-run trial reviewed by independent experts", "A dramatic testimonial", "A celebrity's praise", "Choose the one with controls and checks."],
      ["Science changes its mind when new evidence arrives. Pseudoscience tends to...", "stick to its claims whatever the evidence", "update eagerly", "publish its mistakes", "Check how a field handles disconfirming evidence."],
      ["Why does the word 'natural' not prove a product is safe?", "Many natural substances are harmful", "Natural means chemical-free", "Natural things are always weak", "Think of natural poisons."]],
    "Ask whether the claim can be tested, whether the evidence is open and reviewed, and how the group responds to criticism.",
    "Example: a bracelet 'balances your energy' but the maker gives no test and says critics 'don't understand'. Untestable plus dodging criticism are warning signs. Now do yours."),
    S("🚩", ["Warning signs", "Pseudoscience looks like science but skips its checks."],
      ["Red flags", "Untestable or vague claims.<br>Only anecdotes and testimonials.<br>Cherry-picked evidence.<br>Claims of a cover-up when criticized.<br>No independent review."],
      ["Green flags", "Clear predictions, open data, independent replication, and willingness to change the view."])));

  L30.push(mk("Reading a mathematical proof", rc([
      ["In mathematics, a <i>theorem</i> is a statement that...", "has been proved", "is a guess", "is an example", "It earns the name by a proof."],
      ["A <i>conjecture</i> is a statement that...", "is believed true but not yet proved", "is proved", "is false", "Think of an educated guess."],
      ["An <i>axiom</i> is a statement that...", "is taken as a starting point without proof", "is proved last", "is always false", "Every proof has to begin somewhere."],
      ["A <i>lemma</i> is a...", "helping result used to prove a larger theorem", "final conclusion", "poem", "It is a stepping stone."],
      ["A <i>corollary</i> is a result that...", "follows easily from a theorem", "contradicts it", "begins the paper", "It comes along with a theorem."],
      ["The letters QED at the end of a proof stand for a Latin phrase meaning...", "which was to be shown", "quickly end the document", "quite easy to do", "It marks the end of the argument."],
      ["In a <i>proof by contradiction</i> you assume the claim is false and show that this...", "leads to an impossible result", "leads to a spelling error", "gives more examples", "The assumption breaks."],
      ["Why do examples not prove a general statement?", "They show some cases, not every case", "They are always false", "They are too long", "Check all cases or give a general argument."]],
    "Ask what role the statement plays: starting point, helper, main result, or follow-on.",
    "Example: 'Two points determine a line' is taken as an axiom. A lemma might prepare a bigger result; the theorem is the main claim. Now do yours."),
    S("➗", ["The language of proofs", "Mathematical writing has special terms that show the role of each statement."],
      ["Terms", "<b>Axiom</b>: starting assumption.<br><b>Lemma</b>: helper result.<br><b>Theorem</b>: proved result.<br><b>Corollary</b>: easy consequence.<br><b>Conjecture</b>: unproved guess."],
      ["Reading tip", "Read slowly, check each step follows from earlier ones, and ask where each assumption is used. QED marks the end."])));

  L30.push(mk("Qualitative rigor: triangulation and coding", rc([
      ["<i>Triangulation</i> in research means checking a finding using...", "several sources or methods", "one clever method", "a friend's opinion", "Three points fix a position."],
      ["<i>Coding</i> interview transcripts means...", "labeling passages with themes", "converting them to computer programs", "deleting them", "It organizes material by ideas."],
      ["<i>Saturation</i> is reached when...", "new interviews stop adding new themes", "the researcher is tired", "the budget runs out", "Nothing fresh appears."],
      ["<i>Reflexivity</i> asks the researcher to...", "consider how their own background shapes the study", "reflect light", "repeat the interviews", "The researcher is part of the story."],
      ["<i>Member checking</i> means...", "sharing findings with participants to see if they ring true", "counting the members of a club", "hiding results", "Participants are asked to confirm the interpretation."],
      ["A study uses interviews, observation and documents to examine one school. This is an example of...", "triangulation", "random assignment", "a placebo", "Three kinds of evidence."],
      ["A reader should be careful about a qualitative study that...", "quotes only the most dramatic voices", "includes a method section", "describes its coding steps", "Are the quotes representative?"],
      ["Qualitative research is especially good for finding out...", "how people understand and experience something", "the exact average of a number", "the mass of an object", "Its strength is meaning and context."]],
    "Ask how the researchers made sure their interpretation is trustworthy and not just one person's impression.",
    "Example: a researcher studying a library checks interview claims against visit logs and posted rules. Using several sources to cross-check is triangulation. Now do yours."),
    S("🗂️", ["Rigor without numbers", "Qualitative studies use interviews, observation and documents. They earn trust by method."],
      ["Tools", "<b>Triangulation</b>: cross-check sources.<br><b>Coding</b>: tag themes.<br><b>Saturation</b>: new data add no new themes.<br><b>Reflexivity</b>: examine your own bias."],
      ["Reading tip", "Look for how participants were chosen, how themes were found, and whether quotes show the range of views."])));

  L30.push(mk("Holding, dicta and precedent", rc([
      ["The <i>holding</i> of a court case is...", "the rule needed to decide that case", "any comment the judge made", "the lawyers' fee", "It is the necessary core."],
      ["<i>Dicta</i> (obiter dicta) are remarks in an opinion that...", "are not necessary to the decision", "decide the case", "set the sentence", "They are said 'by the way'."],
      ["<i>Precedent</i> means that courts...", "follow the reasoning of earlier decisions in similar cases", "ignore the past", "vote every year", "Think of consistency."],
      ["The Latin phrase <i>stare decisis</i> means roughly...", "to stand by decided matters", "to leave quickly", "to read twice", "It states the principle of following precedent."],
      ["A later court 'distinguishes' an earlier case when it...", "explains why the facts differ enough that the earlier rule does not apply", "agrees with it", "destroys the records", "The facts are not the same."],
      ["A <i>binding</i> precedent comes from...", "a higher court in the same system", "a newspaper", "a lower court", "Think of authority."],
      ["Which of these is most likely dicta?", "A judge's passing thoughts on a different situation", "The ruling on the facts before the court", "The final order", "It goes beyond the facts of the case."],
      ["When reading a case, why do lawyers separate holding from dicta?", "Only the holding is firmly relied on as law", "Dicta are always wrong", "The holding is longer", "One carries authority and the other less."]],
    "Ask whether a statement was needed to decide the case, or merely an extra remark.",
    "Example: a court rules that a shop must pay damages because its sign was broken. A comment about how all signs should be checked monthly goes beyond that case and may be dicta. Now do yours."),
    S("🏛️", ["Reading a court opinion", "Court opinions combine the decision, reasons and extra comments."],
      ["Key terms", "<b>Holding</b>: the rule needed for the outcome.<br><b>Dicta</b>: remarks not needed for it.<br><b>Precedent</b>: earlier decisions guiding later ones.<br><b>Distinguish</b>: show the facts differ."],
      ["Reading tip", "Find the facts, the question, the holding and the reasons. Mark anything that says 'we need not decide'."])));

  L30.push(mk("p-hacking and multiple comparisons", rc([
      ["<i>p-hacking</i> means...", "trying many analyses until one gives a significant result", "reporting all tests", "pre-registering a plan", "The search for significance is the problem."],
      ["If a researcher runs 20 independent tests with a 5% false-positive rate and no real effects exist, about how many will appear significant by chance?", "1", "10", "20", "Multiply 20 by 0.05."],
      ["Reporting only the one test that 'worked' out of many is a problem because...", "it hides the other results", "it saves space", "it is more accurate", "A single hit among many is not strong."],
      ["The 'garden of forking paths' describes...", "many possible analysis choices that can bend a result", "a landscape", "a flowchart for paper submission", "Each choice opens another branch."],
      ["A <i>Bonferroni correction</i> deals with multiple tests by...", "making the significance cut-off stricter", "making it looser", "dropping the data", "More tests need a tougher standard."],
      ["Pre-registration helps against p-hacking because it...", "fixes the analysis plan before the data are seen", "ensures a significant result", "hides the plan", "Plans on record limit later changes."],
      ["A result that fails to replicate when other teams repeat it suggests the first result may have been...", "a chance finding", "proof", "a typo", "Check whether it holds again."],
      ["Which phrase should make a careful reader suspicious?", "We tested many outcomes and report the significant ones", "We pre-registered our single outcome", "We report all tests", "Which one hints at selection?"]],
    "Ask how many tests were run and whether the reported one was chosen after seeing the results.",
    "Example: test 10 foods for a link to headaches; at a 5% level, about half a false hit is expected. If only the 'guilty' food is reported, the claim is weak. Now do yours."),
    S("🎰", ["Too many tries", "With enough tests, some results look significant by pure chance. <b>p-hacking</b> exploits this, knowingly or not."],
      ["Warnings", "Many outcomes but only one reported.<br>Analysis choices made after seeing the data.<br>A surprising result no one else can repeat."],
      ["Remedies", "Pre-registration, stricter thresholds when testing many things, sharing all results and replication."])));

  L30.push(mk("Research ethics and conflicts of interest", rc([
      ["<i>Informed consent</i> means participants...", "understand the study and agree freely to join", "are told nothing", "are paid in secret", "Knowledge and choice come first."],
      ["An <i>institutional review board</i> (IRB) exists to...", "check that studies with people are ethical", "sell journals", "fund labs", "It reviews plans before they begin."],
      ["A <i>conflict of interest</i> is when a researcher...", "has a stake that might bias the work", "disagrees with a colleague", "works late", "Money or other ties can matter."],
      ["Why should authors disclose their funding?", "Readers can judge whether it might shape results", "It is only a tradition", "It shortens the paper", "Transparency lets readers weigh the claim."],
      ["Fabrication means...", "making up data", "citing sources", "repeating a test", "It is serious misconduct."],
      ["Falsification means...", "changing or omitting data to mislead", "being honest", "pre-registering", "Results are twisted to fit."],
      ["When a journal <i>retracts</i> a paper, it...", "withdraws it because of serious problems", "prints it again", "improves it", "The paper is formally taken back."],
      ["<i>Confidentiality</i> means researchers...", "protect participants' private information", "publish names", "sell data", "Participants' identities are guarded."]],
    "Ask whether the participants are protected and whether readers have the information to judge possible bias.",
    "Example: a company funds a study of its own snack and the authors do not say so. Readers cannot weigh the possible bias. Disclosure would fix that. Now do yours."),
    S("🛡️", ["Doing research honestly", "Research with people must protect them, and the reporting must be honest."],
      ["Key terms", "<b>Informed consent</b>, <b>IRB review</b>, <b>confidentiality</b>, <b>disclosure</b> of funding and ties, and the ban on <b>fabrication</b>, <b>falsification</b> and plagiarism."],
      ["Reading tip", "Check the funding and conflicts statements. Ask whether the study followed ethical review."])));

  L30.push(mk("Argument maps: main and sub-conclusions", rc([
      ["'The park should stay open at night because it is safe. It is safe because it is well lit.' The <i>main conclusion</i> is that...", "the park should stay open at night", "it is well lit", "it is safe", "Ask which claim all the others support."],
      ["In the same passage, 'it is safe' is a...", "sub-conclusion", "main conclusion", "objection", "It is supported and supports something else."],
      ["In the same passage, 'it is well lit' is a...", "basic premise", "main conclusion", "sub-conclusion", "It is not supported by anything else here."],
      ["Two separate reasons that each independently support a conclusion are called...", "convergent premises", "linked premises", "objections", "Each stands on its own."],
      ["Premises that work only together are called...", "linked premises", "convergent premises", "conclusions", "Remove one and the support is gone."],
      ["Words like 'therefore', 'so' and 'thus' usually signal a...", "conclusion", "premise", "objection", "They point to what follows."],
      ["Words like 'since', 'because' and 'given that' usually signal a...", "premise", "conclusion", "title", "They point to support."],
      ["Why do argument maps help?", "They show how the reasons connect to the conclusion", "They shorten the text", "They remove objections", "A picture of the structure reveals weak links."]],
    "Find the claim that everything else supports, then trace which statements back which.",
    "Example: 'Cars should be banned downtown, since they are noisy and cause crashes.' Main conclusion: ban cars. 'Noisy' and 'cause crashes' are two convergent premises. Now do yours."),
    S("🗺️", ["Draw the argument", "An <b>argument map</b> shows how premises support a conclusion."],
      ["Parts", "<b>Main conclusion</b>: the point of it all.<br><b>Sub-conclusion</b>: both supported and supporting.<br><b>Premises</b>: basic reasons.<br><b>Linked</b> vs <b>convergent</b> support."],
      ["Reading tip", "Look for indicator words, number the claims, and draw arrows from reasons to conclusions."])));

  L30.push(mk("Writing a research question", rc([
      ["Which is the strongest research question?", "How did the 1936 radio coverage of local elections affect voter turnout in rural counties?", "Why is radio good?", "Is history important?", "Choose the one that is focused and answerable."],
      ["A research question that can be answered 'yes' or 'no' is usually...", "too simple to guide deep research", "perfect", "unanswerable", "Good questions ask how or why."],
      ["A question like 'What caused World War I?' is probably too...", "broad for a short paper", "narrow", "easy", "Think about how many books answer it."],
      ["A good question is <i>researchable</i>, meaning...", "evidence exists that can help answer it", "no one has studied it", "it has no answer", "Sources and data must be available."],
      ["A good question is <i>arguable</i>, meaning...", "reasonable people could answer it differently", "it has one factual answer", "it is a joke", "You can take a position."],
      ["Which question is arguable?", "To what extent did social media change how young adults get news?", "What year was a platform founded?", "How many users did it have?", "Look for a question that invites reasons."],
      ["You can narrow a broad question by adding...", "a time period, place or group", "more adjectives", "more questions", "Limit the scope."],
      ["Which signal tells you a question is a good fit for a gap in the literature?", "Earlier studies leave this group or period unexamined", "Everyone has already answered it", "No sources exist at all", "A gap is a space for new work."]],
    "Check three things: is it focused, is it arguable, and can evidence answer it?",
    "Example: 'Pollution' is a topic. 'How has air pollution changed school absences in one city since 2000?' is a focused, researchable question. Now do yours."),
    S("❓", ["From topic to question", "Strong research starts with a strong question."],
      ["Test it", "<b>Focused</b>: limited in scope.<br><b>Arguable</b>: not just yes/no or a fact.<br><b>Researchable</b>: evidence is available."],
      ["Improve it", "Add limits (time, place, group). Turn 'what' into 'how' or 'why'. Check the literature for a gap."])));

  L30.push(mk("Applying a critical lens", cr("Which approach is this critic using?", ["formalist (the text's form)", "reader-response (the reader)", "historicist (the era)", "deconstructive (self-undermining)"], [
      ["'The repeated image of a river links the opening and the close, giving the poem unity.'", 0, "It stays inside the poem's patterns."],
      ["'The novel's praise of order is undermined by the disorder of its own sentences.'", 3, "The text works against its own claim."],
      ["'Read next to newspaper reports from the 1930s, the story shows fears about losing farmland.'", 2, "Evidence is drawn from the time period."],
      ["'Gaps in the plot invite the reader to supply the missing motive.'", 1, "Attention falls on the act of reading."],
      ["'The sonnet's turn in line 9 changes the rhythm and the mood.'", 0, "It analyses structure."],
      ["'Different communities of readers have understood the ending in opposite ways.'", 1, "It looks at interpretive groups."],
      ["'The play echoes debates over succession that worried the court at the time.'", 2, "The social setting explains the play."],
      ["'The distinction between hero and villain collapses as each depends on the other.'", 3, "Binary terms unsettle themselves."]],
      "Ask where the critic looks for evidence: in the form, in the reader, in the era, or in tensions that undermine the text.",
      "Example: 'The rhyme scheme tightens as the speaker panics' is formalist; 'The poem reflects fears in 1850' is historicist. Now do yours."),
    S("🔎", ["Choosing a lens", "Each critical approach asks different questions and collects different evidence."],
      ["Review", "<b>Formalist</b>: form, image, structure.<br><b>Reader-response</b>: gaps, readers, communities.<br><b>Historicist</b>: the era's documents and beliefs.<br><b>Deconstructive</b>: contradictions in the text."],
      ["Use them", "A strong essay names its lens, uses its questions and supports every claim with the text's own words."])));

  L30.push(mk("Reading a scholarly book review", rc([
      ["A good academic book review usually has these parts:", "summary, evaluation and a judgment of contribution", "only praise", "only the table of contents", "It informs and judges."],
      ["A fair reviewer judges a book against...", "the aims the author set out", "the reviewer's favorite topic", "the cover", "Aims give a fair standard."],
      ["'The author's sources are thin on the later period.' This sentence is...", "an evaluation", "a summary", "a quotation from the book", "It judges quality."],
      ["'The book examines three port cities between 1800 and 1850.' This sentence is a...", "summary", "evaluation", "complaint", "It reports content."],
      ["When a reviewer writes 'a major contribution', they mean the book...", "adds important new knowledge to the field", "is long", "is cheap", "Think of the field's progress."],
      ["Which phrase signals a reservation?", "Yet the argument falters when", "The book offers", "The author describes", "Look for a turn against."],
      ["Why read reviews before choosing sources?", "They help you judge a book's strengths and limits quickly", "They replace the book", "They always agree", "A review is a guide, not a replacement."],
      ["A reviewer who attacks the author's character rather than the argument is committing...", "an ad hominem", "a careful evaluation", "a summary", "The criticism is aimed at the person."]],
    "Sort what you read into the three jobs a review does (reporting, judging, placing the book in its field), and keep the author's aims in mind.",
    "Example: 'The book tracks how three towns built libraries' is summary. 'Its argument is persuasive but depends on few documents' is evaluation. Now do yours."),
    S("📝", ["Weighing a book", "Scholars use reviews to learn what a book argues and how well it does it."],
      ["Parts", "<b>Summary</b> of content.<br><b>Evaluation</b> of argument, evidence and clarity.<br><b>Contribution</b> to the field."],
      ["Reading tip", "Look for balanced judgments tied to specific evidence. Compare two reviews of the same book to see how judgments differ."])));

  L30.push(mk("Reading peer-review feedback", rc([
      ["A reviewer recommends 'major revisions'. This means the paper...", "needs substantial changes before it could be accepted", "is accepted as it is", "is rejected permanently", "The work is promising but incomplete."],
      ["'Please clarify how participants were selected.' This is a request for...", "clarification of the method", "a new study", "rejection", "It asks for more detail."],
      ["'The conclusion does not follow from the data in Table 2.' This comment challenges the paper's...", "reasoning", "font", "title", "It questions the link between evidence and claim."],
      ["A good author's response to a reviewer comment is to...", "answer each point and say what was changed", "ignore it", "argue about the reviewer's identity", "Respond point by point."],
      ["Which comment is a minor point?", "A typo in the third reference", "The sampling method is unsuitable", "The main claim lacks evidence", "Which would not change the argument?"],
      ["Peer review aims to...", "improve quality and catch errors before publication", "guarantee that a paper is true", "make papers longer", "It is a check, not a guarantee."],
      ["When two reviewers disagree, an editor...", "weighs their reasons and decides", "flips a coin", "publishes both reports unseen", "The editor considers the arguments."],
      ["Reading peer review comments teaches you that scholarship is...", "an ongoing process of testing and refining", "finished once printed", "free of disagreement", "Claims are challenged before publication."]],
    "Sort each comment by how much it affects the argument: small fix, request for clarity, or challenge to the claim.",
    "Example: 'Fix the axis label' is a minor fix. 'Explain why you chose this sample' asks for clarity. 'Your claim is too strong for the data' challenges the claim. Now do yours."),
    S("📬", ["Feedback before publication", "Before a paper is published, outside experts review it and recommend accept, minor revisions, major revisions or reject."],
      ["Kinds of comments", "<b>Minor</b>: typos, formatting.<br><b>Clarification</b>: more detail.<br><b>Major</b>: problems with method, evidence or reasoning."],
      ["Reading tip", "Authors respond point by point, making changes or politely explaining why not. The exchange makes the paper stronger."])));

  L30.push(MIX("Mixed practice", L30[2], L30[4], L30[6], L30[7], L30[9], L30[11], L30[13], L30[15], L30[17]));
  L30.push(MIX("Level 30 Challenge", L30[0], L30[1], L30[3], L30[5], L30[8], L30[10], L30[12], L30[14], L30[16]));

  Object.assign(READING_LEVELS, { 28: L28, 29: L29, 30: L30 });
})();
