// Mind Lab Reading, levels 25-27 (12th grade, college year 1 first half). 20 lessons each.
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
  // rc: rows [text, right, wrong, wrong, clue]; hint 2 is the row's own clue
  const rc = (rows, h1, h3) => () => {
    const r = pick(rows);
    const cs = [r[1], r[2], r[3]].filter(x => x != null);
    return { text: r[0], choices: shuf(cs), answer: r[1], hints: [h1, r[4], h3] };
  };
  // roots: [root, meaning, [w1, w2, w3]] -> meaning rows
  const rootRows = (lang, roots) => roots.map((x, i) => {
    const ms = roots.map(y => y[1]).filter(m => m !== x[1]);
    return ["The " + lang + " root <b>" + x[0] + "</b> is in <i>" + x[2][0] + "</i>, <i>" + x[2][1] + "</i> and <i>" + x[2][2] + "</i>. What does it mean?", x[1], ms[i % ms.length], ms[(i + 2) % ms.length], "Think about what <i>" + x[2][0] + "</i> and <i>" + x[2][2] + "</i> have in common."];
  });
  const ROOTH1 = "Split the word into its parts. The root carries the core idea, so think of other words that share it.";
  const ROOTH3 = "Example: <b>port</b> is in <i>transport</i>, <i>export</i> and <i>portable</i>. All are about carrying, so the root means 'carry'. A <i>porter</i> is someone who carries bags. Now do yours.";
  const L25 = [], L26 = [], L27 = [];

  // ================= LEVEL 25 =================
  L25.push(mk("Latin roots: cap, cur, flect, greg, sect", rc([
      ...rootRows("Latin", [
        ["cap/capt", "take or seize", ["capture", "captive", "captor"]],
        ["cur/curs", "run", ["current", "recur", "cursor"]],
        ["flect/flex", "bend", ["flexible", "reflect", "flexor"]],
        ["greg", "flock or group", ["congregate", "segregate", "gregarious"]],
        ["sect", "cut", ["section", "dissect", "intersect"]]]),
      ["A <i>captive</i> is someone who has been...", "taken and held", "sent far away", "allowed to run free", "Think of a captive audience or a captive animal."],
      ["To <i>recur</i> is to...", "happen again", "stop for good", "bend backward", "The prefix <b>re-</b> means again. The root is about running."],
      ["A <i>flexible</i> plan is one that can be...", "bent or adjusted easily", "cut into pieces", "held tightly", "Think of a flexible branch or a flexible schedule."],
      ["A <i>gregarious</i> person likes to be...", "with other people", "completely alone", "running everywhere", "Think of animals that live in a flock or herd."],
      ["To <i>bisect</i> an angle is to...", "cut it in two", "bend it sharply", "seize it", "<b>bi-</b> means two. The root is about cutting."],
      ["A <i>cursory</i> glance at a page is a...", "quick, hurried look", "slow, careful study", "sad, long stare", "Your eyes 'run over' the page."],
      ["<i>Concurrent</i> events happen...", "at the same time", "one after another", "in a circle", "<b>con-</b> means together. The root means 'run'."],
      ["A bright mirror can <i>deflect</i> a beam of light. It...", "turns the beam aside", "swallows the beam", "cuts the beam into slices", "<b>de-</b> means away. The root is about bending."]],
    ROOTH1, ROOTH3),
    S("🌳", ["Five more Latin roots", "A root is the core of a word. Learn the root and you can guess many words."],
      ["The roots", "<b>cap/capt</b> = take (<b>capt</b>ure)<br><b>cur/curs</b> = run (<b>cur</b>rent)<br><b>flect/flex</b> = bend (<b>flex</b>ible)<br><b>greg</b> = flock (<b>greg</b>arious)<br><b>sect</b> = cut (<b>sect</b>ion)"],
      ["Build words", "<i>con</i> (together) + <i>greg</i> = <i>congregate</i>, 'flock together'. <i>Re</i> (back) + <i>flect</i> = <i>reflect</i>, 'bend back' (a mirror bends light back). <i>Ex</i> (out) + <i>cur</i> + <i>sion</i> = <i>excursion</i>, 'a run out', a short trip."])));

  L25.push(mk("Greek roots: lith, techn, myth, ethn, gram", rc([
      ...rootRows("Greek", [
        ["lith", "stone", ["monolith", "lithograph", "Neolithic"]],
        ["techn", "art or skill", ["technique", "technology", "technician"]],
        ["myth", "story or tale", ["mythology", "mythic", "mythical"]],
        ["ethn", "nation or people", ["ethnic", "ethnography", "ethnology"]],
        ["gram", "something written or drawn", ["diagram", "telegram", "grammar"]]]),
      ["A <i>monolith</i> is a very large block of...", "stone", "water", "glass", "<b>mono-</b> means one. The root is a material you could build a wall from."],
      ["<i>Technique</i> means a way of doing a task with...", "skill", "luck", "stone", "Think of what a master craftsman brings to the job."],
      ["An <i>ethnographer</i> studies...", "the ways of a people", "ancient rocks", "old letters", "<b>-grapher</b> means one who writes. The first part names a group of people."],
      ["The <i>Neolithic</i> age is the 'new' age of...", "stone tools", "iron machines", "glass towers", "<b>neo-</b> means new. Think of what early people made tools from."],
      ["A <i>diagram</i> is a drawing that...", "shows how something works", "tells a long story", "rhymes", "<b>dia-</b> means across or through. The root is about drawing or writing."]],
    ROOTH1, ROOTH3),
    S("🪨", ["Five Greek roots", "Greek roots build many science and school words."],
      ["The roots", "<b>lith</b> = stone (mono<b>lith</b>)<br><b>techn</b> = art, skill (<b>techn</b>ique)<br><b>myth</b> = story (<b>myth</b>ology)<br><b>ethn</b> = people, nation (<b>ethn</b>ic)<br><b>gram</b> = written (dia<b>gram</b>)"],
      ["Build words", "<i>Mono</i> (one) + <i>lith</i> = <i>monolith</i>, 'one stone'. <i>Tele</i> (far) + <i>gram</i> = <i>telegram</i>, 'a far writing', a message sent over a distance."])));

  L25.push(mk("Old English, French and Latin layers", rc([
      ["We say <i>cow</i>, <i>pig</i> and <i>sheep</i> for animals but <i>beef</i>, <i>pork</i> and <i>mutton</i> for meat. The meat words mostly came from...", "French", "Old English", "Greek", "After 1066 the ruling class in England spoke a certain language and ate the meat. Farmers kept the older animal names."],
      ["Which word is the older, everyday Old English word?", "house", "residence", "domicile", "Short, plain words that name basic things are often the oldest."],
      ["Which word is the more formal, Latin-based choice?", "commence", "start", "begin", "Longer words with Latin roots often sound more formal."],
      ["English has lots of word pairs, such as <i>ask / inquire</i>. Why?", "It borrowed from several languages over centuries", "Writers made them up last year", "Dictionaries require two words for each idea", "Think of the history of the island: invasions and trade over a thousand years."],
      ["Which word pair shows a plain word and a fancier Latin word?", "buy / purchase", "cat / dog", "red / blue", "Look for two words that mean the same thing but feel different."],
      ["A speaker who wants to sound warm and direct will usually choose...", "plain Old English words", "the longest Latin words", "words nobody knows", "Plain words feel close and honest."],
      ["Which of these is the Old English word?", "help", "assistance", "aid", "It is short, plain and very old."],
      ["Which word came into English from French after 1066?", "government", "bread", "eat", "Words about law, rule and rank often came from French."],
      ["Choosing <i>residence</i> over <i>home</i> changes the...", "tone and level of formality", "number of syllables only", "language of the sentence", "The meaning is nearly the same. What changes is how it feels."]],
    "Think about where each word comes from. Plain, short words are usually older. Longer ones often came from French or Latin.",
    "Example: <i>kingly</i> (Old English) feels everyday; <i>royal</i> (French) and <i>regal</i> (Latin) feel more formal. Same idea, three layers. Now do yours."),
    S("🧅", ["Layers of English", "English is like an onion with layers: <b>Old English</b> (plain), <b>French</b> (after 1066) and <b>Latin and Greek</b> (learned words)."],
      ["Same idea, different feel", "<i>ask</i> (Old English) / <i>question</i> (French) / <i>interrogate</i> (Latin)<br><i>help</i> / <i>aid</i> / <i>assist</i>"],
      ["Why it matters", "After 1066 French-speaking nobles ruled England, so words of law and rank came from French. Choose the layer that fits your tone: plain for warmth, Latin for formality."])));

  L25.push(mk("Tone words", rc([
      ["A <i>wistful</i> tone shows...", "gentle longing", "sharp anger", "wild excitement", "Picture someone gazing out a window, missing something."],
      ["A <i>sardonic</i> tone is...", "bitterly mocking", "warmly thankful", "calm and neutral", "Think of sarcasm with a sting."],
      ["A <i>reverent</i> tone shows deep...", "respect", "boredom", "fear of failing", "Picture how people speak in a quiet place of honor."],
      ["An <i>apathetic</i> tone shows...", "no interest or concern", "joyful energy", "rising anger", "The prefix <b>a-</b> means without; the root is about feeling."],
      ["An <i>indignant</i> tone shows anger at...", "something unfair", "a joke", "a long wait for lunch", "The anger has a reason: someone thinks a wrong has been done."],
      ["A <i>didactic</i> tone is meant to...", "teach or instruct", "tease", "frighten", "Think of the way a lecture or a lesson sounds."],
      ["A <i>whimsical</i> tone is...", "playful and fanciful", "grim and heavy", "formal and cold", "Think of a story with talking teapots."],
      ["A <i>candid</i> tone is...", "frank and honest", "secretive", "flowery", "A candid friend tells you plainly what they think."],
      ["'The old swing still creaked in the yard, and she wished she were small again.' The tone is...", "wistful", "sardonic", "indignant", "She is looking back with gentle longing, not anger."],
      ["'Oh, wonderful,' he said, rolling his eyes. 'Another meeting.' The tone is...", "sardonic", "reverent", "whimsical", "The words say one thing but the eyes say another."]],
    "Tone is the writer's attitude. Look at the word choices, the details and how the speaker seems to feel.",
    "Example: 'It was only the third time this week the train was late, and nobody said a word.' The tone is resigned: the speaker has given up hope of change. Now do yours."),
    S("🎭", ["Naming the tone", "<b>Tone</b> is the attitude of the writer or speaker. Precise tone words beat 'good' or 'bad'."],
      ["Useful words", "<b>wistful</b>: gently longing<br><b>sardonic</b>: bitterly mocking<br><b>reverent</b>: deeply respectful<br><b>apathetic</b>: uncaring<br><b>indignant</b>: angry at unfairness<br><b>didactic</b>: teaching"],
      ["How to find it", "Underline the strongest words. Ask, 'What attitude do they build together?' A tone word should fit the whole passage, not just one line."])));

  L25.push(mk("Literary present tense", () => {
    const r = pick([
      ["In <i>The Great Gatsby</i>, Gatsby", "throws lavish parties", "threw lavish parties", "will throw lavish parties"],
      ["In <i>Romeo and Juliet</i>, the Friar", "gives Juliet a sleeping potion", "gave Juliet a sleeping potion", "has been giving Juliet a sleeping potion"],
      ["In <i>Frankenstein</i>, the creature", "learns to speak by listening", "learned to speak by listening", "will learn to speak by listening"],
      ["In <i>To Kill a Mockingbird</i>, Scout", "narrates the story as a grown woman", "narrated the story as a grown woman", "will narrate the story as a grown woman"],
      ["In <i>Macbeth</i>, the witches", "predict that Macbeth will be king", "predicted that Macbeth will be king", "had predicted that Macbeth is king"],
      ["In <i>Hamlet</i>, the prince", "stages a play to test his uncle", "staged a play to test his uncle", "will stage a play to test his uncle"]]);
    return { text: "Which ending follows the usual rule for writing about a story?<br>" + r[0] + " ___.", choices: shuf([r[1], r[2], r[3]]), answer: r[1],
      hints: ["Events in a book, play or poem are treated as always happening on the page.", "Writers describe the plot as if it is happening now, whenever a reader opens the book.", "Example: 'In <i>Charlotte's Web</i>, Charlotte writes words in her web.' The story is always unfolding. Now do yours."] };
  }, S("📖", ["The literary present", "When you write about what happens in a story, use the <b>present tense</b>: 'Gatsby <b>throws</b> parties.'"],
      ["Why?", "The story lives on the page. Each time someone reads it, the events happen again."],
      ["Two exceptions", "Use the <b>past</b> for real history: 'Fitzgerald <b>published</b> the book in 1925.'<br>Use the <b>past</b> for events before the story begins: 'Before the play opens, Romeo <b>had</b> loved Rosaline.'"])));
  { // add history/earlier-event questions to literary present
    const base = L25[L25.length - 1].make, ex = [
      ["Choose the correct sentence:", "Fitzgerald published <i>The Great Gatsby</i> in 1925.", "Fitzgerald publishes <i>The Great Gatsby</i> in 1925.", "Fitzgerald will publish <i>The Great Gatsby</i> in 1925.", "Publishing a book was a real event in history."],
      ["Choose the correct sentence:", "Mary Shelley wrote <i>Frankenstein</i> as a young woman.", "Mary Shelley writes <i>Frankenstein</i> as a young woman.", "Mary Shelley will write <i>Frankenstein</i> as a young woman.", "The author's own life happened in the past."],
      ["Before the play opens, Romeo already ___ Rosaline.", "had loved", "loves", "will love", "The love came before the first scene."],
      ["Choose the correct sentence:", "Harper Lee grew up in Alabama.", "Harper Lee grows up in Alabama.", "Harper Lee will grow up in Alabama.", "This is about a real person's past."]];
    const make = () => Math.random() < 0.35 ? (r => ({ text: r[0], choices: shuf([r[1], r[2], r[3]]), answer: r[1], hints: ["Ask: is this about events inside the story, or about the real author or an earlier time?", r[4], "Example: 'Dickens wrote <i>Oliver Twist</i>' is real history, so use the past. Now do yours."] }))(pick(ex)) : base();
    make.teach = base.teach; L25[L25.length - 1].make = make;
  }

  L25.push(mk("Style guides: MLA, APA, Chicago", rc([
      ["A literature student cites a book with the in-text note (Woolf 112). Which style is this?", "MLA", "APA", "Chicago", "Author and page number, with no comma and no year."],
      ["A psychology student cites a study as (Lee, 2021). Which style is this?", "APA", "MLA", "Chicago", "The author and the year, separated by a comma."],
      ["A historian puts source details in numbered footnotes. Which style is this?", "Chicago", "MLA", "APA", "Think of the style named for a city and used often in history."],
      ["The list of sources at the end of an MLA paper is called...", "Works Cited", "References", "Index", "The title says that these are works you actually cited."],
      ["The list of sources at the end of an APA paper is called...", "References", "Works Cited", "Appendix", "It is a single plain word."],
      ["Engineering papers often use numbers in brackets such as [3]. This is called...", "IEEE style", "MLA style", "APA style", "A style named for a group of engineers."],
      ["Why should you use one style throughout a paper?", "It makes sources easy to find and the paper consistent", "It lets you skip some citations", "It makes the paper longer", "Think about the reader who wants to check your sources."],
      ["Which style do many English and language classes use?", "MLA", "APA", "IEEE", "Think of the Modern Language Association."],
      ["What is the first thing to do when a teacher says 'cite your sources'?", "Ask which style guide to use", "Pick the shortest style", "Skip the list", "Different subjects expect different styles."]],
    "Match the clues to the style: how the in-text citation looks and what the end list is called.",
    "Example: (Smith 45) is MLA: author and page. (Smith, 2019) is APA: author and year. A numbered footnote is Chicago. Now do yours."),
    S("📚", ["Three big styles", "<b>MLA</b>: languages and literature.<br><b>APA</b>: psychology and social sciences.<br><b>Chicago</b>: history and many books."],
      ["What each looks like", "MLA: (Woolf 112) and a <b>Works Cited</b> page.<br>APA: (Lee, 2021) and a <b>References</b> page.<br>Chicago: numbered footnotes and a bibliography."],
      ["Rule of thumb", "Always ask which style your class or journal expects, then follow it from start to finish. Consistency is the point."])));

  L25.push(mk("Classical argument: the parts of a speech", rc([
      ["In a classical argument, the <b>introduction</b> (exordium) is meant to...", "get attention and build trust", "list every fact", "say goodbye", "Think of the first words of a speech. The speaker wants listeners to care and to trust."],
      ["The <b>narration</b> (narratio) gives the audience...", "the background of the issue", "the final call to action", "the opponent's best answer", "Before arguing, the audience needs to know the story so far."],
      ["The <b>confirmation</b> (confirmatio) is where the speaker...", "gives the main proof for the claim", "tells a joke to start", "thanks the audience", "The word 'confirm' means to make firm."],
      ["The <b>refutation</b> (refutatio) is where the speaker...", "answers opposing arguments", "defines the topic", "states the first reason", "To refute is to prove something wrong."],
      ["The <b>conclusion</b> (peroratio) often ends with...", "a summary and an appeal to act or feel", "a new unrelated topic", "a long list of statistics", "A strong ending sums up and moves the audience."],
      ["A speaker starts: 'Let me tell you how this problem began.' This is the...", "narration", "refutation", "conclusion", "The speaker is giving background."],
      ["A speaker says: 'Some will say this costs too much. Here is why they are mistaken.' This is the...", "refutation", "introduction", "narration", "The speaker meets the other side's point."],
      ["Which part usually comes right before the conclusion?", "refutation", "introduction", "narration", "The speaker answers objections, then sums up."],
      ["Why include a refutation at all?", "It shows you took the other side seriously", "It makes the speech shorter", "It hides your own claim", "A fair-minded speaker earns trust."]],
    "Think about the job each part does in a speech: open, explain, prove, answer, close.",
    "Example: 'Our town needs a skate park.' Opening: grab attention with a story. Narration: where kids skate now. Confirmation: three reasons. Refutation: cost worries. Conclusion: ask for a vote. Now do yours."),
    S("🏛️", ["Rome's speech plan", "Ancient Roman speakers used five parts:<br><b>Introduction</b> (exordium), <b>Narration</b> (narratio), <b>Confirmation</b> (confirmatio), <b>Refutation</b> (refutatio), <b>Conclusion</b> (peroratio)."],
      ["Jobs", "Open and win trust. Give background. Prove your claim. Answer the other side. Close with a strong appeal."],
      ["Still used today", "Essays, op-eds and legal arguments still follow this pattern. The order can flex, but the five jobs are all there."])));

  L25.push(mk("Toulmin's model of argument", rc([
      ["'Test scores rose after the later start time, so schools should start later.' 'Test scores rose' is the...", "grounds (evidence)", "claim", "rebuttal", "It is the fact offered in support."],
      ["'Test scores rose after the later start time, so schools should start later.' 'Schools should start later' is the...", "claim", "grounds", "qualifier", "It is the conclusion the speaker wants you to accept."],
      ["The <b>warrant</b> in an argument is...", "the assumption that links grounds to claim", "the strongest word", "a list of sources", "It answers: why does this evidence prove that claim?"],
      ["'Anything that raises scores is worth adopting.' In the later-start argument, this is the...", "warrant", "claim", "rebuttal", "It is the unstated rule that connects the evidence to the conclusion."],
      ["The word <i>probably</i> in 'Schools should probably start later' is a...", "qualifier", "warrant", "ground", "It softens how strongly the claim is stated."],
      ["'...unless bus schedules cannot be changed.' This is a...", "rebuttal", "claim", "warrant", "It names an exception."],
      ["A study of 100 schools that supports the warrant is the...", "backing", "claim", "qualifier", "It supports the assumption itself, not the claim directly."],
      ["Why is the warrant often the weak point of an argument?", "It is usually unstated, so readers may not agree with it", "It is always false", "It is always printed in bold", "What people leave unsaid is what they do not defend."]],
    "Toulmin split an argument into parts. Ask what each part is doing: conclusion, evidence, link, support, limit or exception.",
    "Example: 'Rain is falling (grounds), so take an umbrella (claim), because umbrellas keep you dry (warrant).' Now do yours."),
    S("🧩", ["Six parts", "Stephen Toulmin broke arguments into: <b>claim</b>, <b>grounds</b>, <b>warrant</b>, <b>backing</b>, <b>qualifier</b>, <b>rebuttal</b>."],
      ["What each does", "<b>Claim</b>: the point.<br><b>Grounds</b>: the evidence.<br><b>Warrant</b>: the link between them.<br><b>Backing</b>: support for the warrant.<br><b>Qualifier</b>: 'usually', 'probably'.<br><b>Rebuttal</b>: exceptions."],
      ["Test an argument", "Find the warrant and ask, 'Would everyone accept that?' If not, the argument needs backing or a narrower claim."])));

  L25.push(mk("More fallacies: begging the question, equivocation", rc([
      ["'Our principal is always right, because she never makes mistakes.' This is...", "begging the question (circular)", "equivocation", "tu quoque", "The reason just repeats the claim in other words."],
      ["'Nothing is better than a good sleep. A sandwich is better than nothing. So a sandwich is better than a good sleep.' This is...", "equivocation", "begging the question", "composition", "A key word shifts its meaning in the middle."],
      ["'No true fan would leave early.' 'But Sam is a fan and he left.' 'Then he is not a true fan.' This is the...", "no true Scotsman fallacy", "tu quoque", "division", "The speaker changes the definition to dodge a counterexample."],
      ["'You tell me to recycle, but you tossed a bottle last week, so recycling does not matter.' This is...", "tu quoque ('you too')", "equivocation", "composition", "The speaker attacks the person's behavior instead of the idea."],
      ["'Every player on the team is excellent, so the team must be excellent.' This is the fallacy of...", "composition", "division", "begging the question", "A trait of the parts is assumed to belong to the whole."],
      ["'The school is famous, so every teacher in it must be famous.' This is the fallacy of...", "division", "composition", "equivocation", "A trait of the whole is assumed to belong to every part."],
      ["'The law is fair because it is just.' This is...", "begging the question", "tu quoque", "division", "'Fair' and 'just' say almost the same thing."],
      ["A feather is light. What is light cannot be dark. So a feather cannot be dark. What is wrong?", "<i>light</i> changes meaning", "The feather is too small", "Dark is not a real word", "Compare the two uses of the word 'light'."]],
    "Look at how the reasoning works, not at whether the conclusion is true. Does the reason repeat the claim? Does a word change? Does the speaker dodge the point?",
    "Example: 'This book is great because it is the best.' The reason only repeats the claim, so it begs the question. Now do yours."),
    S("🕵️", ["Sneakier fallacies", "<b>Begging the question</b>: the reason repeats the claim.<br><b>Equivocation</b>: a word changes meaning mid-argument.<br><b>No true Scotsman</b>: redefining a group to dodge an example."],
      ["More traps", "<b>Tu quoque</b> ('you too'): attacking the speaker's habits instead of the idea.<br><b>Composition</b>: what's true of the parts must be true of the whole.<br><b>Division</b>: what's true of the whole must be true of each part."],
      ["Spot-check", "A fallacy makes a conclusion look supported when it is not. Name the move, then ask for real evidence."])));

  L25.push(mk("Tricolon, asyndeton, polysyndeton, epistrophe", rc([
      ["'The river rose, and the dam creaked, and the town held its breath.' The repeated <i>and</i> is...", "polysyndeton", "asyndeton", "tricolon", "Count the conjunctions. There are more than usual."],
      ["'Pens, papers, books, bags, scattered everywhere.' The missing <i>and</i> is...", "asyndeton", "polysyndeton", "epistrophe", "No conjunctions between the items."],
      ["'He was brave in battle, wise in council and generous in peace.' This three-part pattern is a...", "tricolon", "polysyndeton", "epistrophe", "Three parallel parts."],
      ["'Nothing could stop the music. No wall could keep out the music. Not even silence could end the music.' The repeated ending is...", "epistrophe", "tricolon", "asyndeton", "Look at the last words of each sentence."],
      ["Polysyndeton often makes a sentence feel...", "slow and heaping", "fast and clipped", "short and cold", "Many 'and's pile things up one by one."],
      ["Asyndeton often makes a sentence feel...", "fast and urgent", "slow and dreamy", "formal and long", "Dropping the joining words speeds up the rhythm."],
      ["Epistrophe repeats words at the...", "ends of clauses", "starts of clauses", "middle of a page", "The prefix <b>epi-</b> means upon or at; <i>strophe</i> is a turn."],
      ["A tricolon is a series of...", "three parallel parts", "two opposite ideas", "five questions", "The root <i>tri-</i> means three."]],
    "Look at how the sentence is built: the joining words, the repeats and the count of parts.",
    "Example: 'She ran, she jumped, she soared.' No 'and', quick rhythm: asyndeton. 'She ran and ran and ran' is polysyndeton. Now do yours."),
    S("🥁", ["Rhythm tricks", "<b>Tricolon</b>: three parallel parts.<br><b>Asyndeton</b>: no joining words.<br><b>Polysyndeton</b>: many joining words.<br><b>Epistrophe</b>: repeating the ending."],
      ["Feel the effect", "Asyndeton: fast and sharp.<br>Polysyndeton: slow, piling up.<br>Tricolon: complete and memorable.<br>Epistrophe: hammering one idea home."],
      ["Use them", "When you read a speech, mark these patterns. When you write, use one at a key moment, not in every sentence."])));

  L25.push(mk("Summary or analysis?", () => {
    const r = pick([
      ["Macbeth kills King Duncan and becomes king.", "summary"],
      ["By repeating the word 'blood,' Shakespeare shows Macbeth's guilt spreading.", "analysis"],
      ["I really liked the book.", "opinion only"],
      ["Gatsby throws large parties at his mansion.", "summary"],
      ["The green light at the end of Daisy's dock stands for Gatsby's hope.", "analysis"],
      ["That scene was boring.", "opinion only"],
      ["The two families fight, and Romeo and Juliet die.", "summary"],
      ["Shakespeare's light imagery suggests that love is sudden and intense.", "analysis"],
      ["Victor creates a creature and then abandons it.", "summary"],
      ["Shelley gives the creature eloquent speech to challenge the idea that he is born a monster.", "analysis"]]);
    const cats = ["summary", "analysis", "opinion only"];
    return { text: "Which kind of sentence is this?<br><i>'" + r[0] + "'</i>", choices: shuf(cats), answer: r[1],
      hints: ["Summary tells what happens. Analysis explains how or why the author does something and what it means.", "Ask: does the sentence retell events, interpret a choice by the author, or just say how the writer felt?", "Example: 'Cinderella loses a shoe' retells (summary). 'The shoe stands for her hidden identity' interprets (analysis). 'I loved it' is an opinion only. Now do yours."] };
  }, S("🔍", ["Telling vs explaining", "<b>Summary</b> says what happens. <b>Analysis</b> says how the writer builds meaning and why it matters."],
      ["Spot the difference", "Summary: 'Scout meets Boo Radley.'<br>Analysis: 'Lee uses Scout's innocence to show how fear grows from rumor.'<br>Opinion only: 'I loved it.'"],
      ["The goal", "Good literary essays use a little summary to set the scene, and most of their space for analysis."])));

  L25.push(mk("Quantitative or qualitative?", () => {
    const r = pick([
      ["Counting how many students passed a test", 0], ["Measuring the heights of 50 plants", 0], ["Comparing average temperatures over 30 years", 0],
      ["A survey asking 2,000 people to rate a store from 1 to 5", 0], ["Interviewing ten nurses about how they feel at work", 1], ["Reading old diaries to find recurring themes", 1],
      ["Watching a classroom and writing detailed notes", 1], ["Sorting open-ended comments into themes", 1]]);
    const cats = ["quantitative", "qualitative"], ans = cats[r[1]];
    return { text: "Which kind of research is this?<br><i>" + r[0] + "</i>", choices: shuf(cats), answer: ans,
      hints: ["Quantitative research uses numbers and amounts. Qualitative research uses words, stories and descriptions.", "Ask: will the main result be a count or a measurement, or a description of experiences?", "Example: 'Timing 20 runners in a race' is quantitative. 'Asking runners how the race felt' is qualitative. Now do yours."] };
  }, S("📊", ["Numbers or words?", "<b>Quantitative</b> research measures and counts. <b>Qualitative</b> research describes experiences and meanings."],
      ["Examples", "Quantitative: test scores, averages, percentages.<br>Qualitative: interviews, observations, diary entries, themes."],
      ["Why both", "Numbers show <i>how much</i>. Words show <i>why</i> and <i>how it feels</i>. Many studies use both."])));

  L25.push(mk("Reading translations and world literature", rc([
      ["Why can two translations of the same poem look very different?", "Translators make different choices about meaning, sound and rhythm", "One of them is always a mistake", "Poems cannot be translated at all", "No translation can match every feature of the original at once."],
      ["A <b>literal</b> translation tries to...", "stay close to the original words", "change the story completely", "rhyme every line", "It follows the words closely, even if the result sounds stiff."],
      ["A <b>free</b> translation aims to...", "capture the meaning and feel in natural language", "copy each word in order", "shorten the text", "It cares more about sense and style than word-for-word match."],
      ["An idiom translated word for word into another language may...", "sound strange or confusing", "always sound perfect", "become a rhyme", "Think of translating 'it's raining cats and dogs' literally."],
      ["When you quote a translated book in an essay, you should...", "name the translator or edition", "act as if the author wrote it in English", "change the words to match", "The words you quote belong to the translator, too."],
      ["Why is a translator's note useful?", "It explains the choices the translator made", "It adds a new ending", "It lists the price", "Notes often explain puns and cultural references."],
      ["Why be careful when analyzing an author's exact word choice in a translation?", "Those words may be the translator's, not the author's", "Translations never use words", "Authors do not choose words", "Who actually chose the words you are reading?"],
      ["Reading world literature helps readers...", "see other cultures' stories and values", "avoid learning anything new", "skip the history", "Stories from many places widen your view."]],
    "Think about who chose the words you are reading and what gets lost or changed when words move between languages.",
    "Example: the French <i>avoir le cafard</i> literally means 'to have the cockroach' but means 'to feel gloomy'. A translator must choose between the two. Now do yours."),
    S("🌍", ["Reading across languages", "A <b>translation</b> is a new version of a work, made by someone who made many choices."],
      ["Two styles", "<b>Literal</b>: stays close to the original words.<br><b>Free</b>: keeps the meaning and feel in natural speech."],
      ["Good habits", "Compare two translations of a line. Read the translator's note. In an essay, say which edition you used."])));

  L25.push(mk("Abstract and concrete language", rc([
      ["Which sentence is the most concrete?", "The librarian stamped fourteen overdue books and sighed.", "Some negative things happened in the library.", "There were issues with materials.", "Look for numbers, names of real things and actions you could see."],
      ["Which sentence is the most vague and abstract?", "Various factors contributed to the outcome.", "Rain flooded the road and stopped the bus.", "The bus broke down at 7:40.", "Which one gives you nothing you could picture?"],
      ["Which pairs a general claim with a concrete example?", "Kindness matters: Dev gave his lunch to a new student.", "Kindness is a positive quality in many contexts.", "Many people value kindness.", "You want an idea followed by a real moment."],
      ["Which revision of 'The meeting had negative consequences' is more concrete?", "Two clients left the meeting and cancelled their orders.", "The meeting went poorly.", "Things did not go well.", "Swap the general words for details that can be seen."],
      ["Why is abstract language still useful in academic writing?", "It names big ideas such as justice or inflation", "It is always clearer than concrete words", "It replaces evidence", "Some ideas cannot be pointed at, but they still need names."],
      ["Which word is the most concrete?", "bicycle", "freedom", "importance", "Can you touch it or see it?"],
      ["A paragraph full of abstract words and no examples is likely to feel...", "vague and hard to remember", "full of evidence", "easy to picture", "Readers hold on to what they can imagine."],
      ["Which sentence moves from abstract to concrete?", "Poverty limits choices; for instance, a family may skip a doctor's visit to pay rent.", "Poverty is poverty.", "Poverty is a complex issue.", "The second half should give a real case."]],
    "Concrete words name things you can see, hear or touch. Abstract words name ideas. Strong writing uses both: the idea, then a picture.",
    "Example: 'The room was untidy' (vague) becomes 'Socks hung from the lamp and cereal crunched underfoot' (concrete). Now do yours."),
    S("🧱", ["Idea and picture", "<b>Abstract</b> words name ideas (freedom, importance). <b>Concrete</b> words name things you can sense (bicycle, thunder)."],
      ["Make it vivid", "Vague: 'The experience was negative.'<br>Concrete: 'The coach yelled for ten minutes, and my hands shook.'"],
      ["Balance", "State the big idea, then ground it in an example. Without the idea, details float; without examples, ideas fade."])));

  L25.push(mk("Reading graphic narratives", rc([
      ["In a comic or graphic novel, each framed picture is called a...", "panel", "gutter", "caption", "It is the box that holds one moment of the story."],
      ["The space between two panels is the...", "gutter", "balloon", "splash", "The reader uses imagination to link the pictures across this gap."],
      ["When readers fill in what happens between panels, this is called...", "closure", "foreshadowing", "irony", "The mind completes the action that is not drawn."],
      ["A box of narration text at the top of a panel is a...", "caption", "balloon", "panel border", "It often tells time, place or the narrator's thoughts."],
      ["A full-page image, often for a big moment, is called a...", "splash page", "gutter", "caption", "Think of a splash: big and dramatic."],
      ["A low-angle drawing, looking up at a character, often makes the character seem...", "powerful", "tiny", "silly", "Think of looking up at a tall statue."],
      ["A balloon with a tail points to...", "the speaker", "the last panel", "the title", "The tail connects words to a voice."],
      ["Why might an artist use a dull, gray color palette?", "to build a gloomy mood", "to show a joke", "to hide the story", "Colors set a mood before a single word is read."],
      ["Which tells you more when you read a graphic narrative?", "Both the words and the pictures together", "Only the words", "Only the page number", "Meaning comes from the combination."]],
    "In a graphic narrative, the pictures are part of the writing. Look at layout, angle, color and the way words and drawings work together.",
    "Example: three tiny panels followed by one huge panel can make a sudden moment feel big. Now do yours."),
    S("🖼️", ["Reading pictures and words", "A graphic narrative tells its story with <b>panels</b>, <b>gutters</b>, <b>captions</b> and <b>speech balloons</b>."],
      ["Closure", "Between two panels, your mind fills in the missing action. This is called <b>closure</b>."],
      ["Analyze it", "Ask: What does the angle make me feel? Why this color? Why a splash page here? Treat the art as evidence, just like words."])));

  L25.push(mk("Footnotes, endnotes and bibliographies", rc([
      ["A <b>footnote</b> appears...", "at the bottom of the same page", "at the end of the book", "only on the cover", "Look at the word 'foot'."],
      ["An <b>endnote</b> appears...", "at the end of a chapter or work", "at the bottom of every page", "inside the title", "Look at the word 'end'."],
      ["A small raised number in the text, such as <sup>3</sup>, tells you to...", "look for a note with the same number", "read the sentence twice", "skip the page", "It is a signpost to a note."],
      ["A <b>bibliography</b> is...", "a list of sources", "a list of characters", "a map", "The Greek root <i>biblio</i> means book."],
      ["The abbreviation <i>ibid.</i> means...", "in the same place (the same source as just before)", "and others", "compare", "It is Latin and saves repeating the last source."],
      ["The abbreviation <i>et al.</i> means...", "and others", "in the same place", "see above", "It is used when a source has many authors."],
      ["Why is it smart to read the notes in a scholarly book?", "They show the evidence and where it came from", "They are always jokes", "They replace the main text", "Notes can reveal how well the claims are supported."],
      ["Some notes give extra comments instead of a source. These are...", "content notes", "title pages", "indexes", "They add information that does not fit in the main text."]],
    "Think about where each note sits and what its job is: pointing to a source, adding a comment or listing every source used.",
    "Example: a raised 1 after a claim points to note 1 at the foot of the page, where the source is named. Now do yours."),
    S("🧾", ["Following the trail", "Scholars show their sources in notes. A <b>footnote</b> sits at the bottom of the page. An <b>endnote</b> comes at the end. A <b>bibliography</b> lists all sources."],
      ["Handy abbreviations", "<i>ibid.</i> = in the same place.<br><i>et al.</i> = and others.<br><i>cf.</i> = compare."],
      ["Read like a researcher", "Look at the notes. Do they point to strong, varied sources? That helps you decide how much to trust the claim."])));

  L25.push(mk("Titles, epigraphs and dedications", rc([
      ["A short quotation placed at the start of a book or chapter, hinting at its theme, is an...", "epigraph", "index", "abstract", "The prefix <b>epi-</b> means upon; it is 'written upon' the start."],
      ["A note at the start that names the person a work is for is a...", "dedication", "epigraph", "glossary", "Think of 'dedicated to' someone."],
      ["John Steinbeck's title <i>Of Mice and Men</i> comes from a poem by...", "Robert Burns", "William Shakespeare", "Walt Whitman", "It was a Scottish poet who wrote about the best-laid plans going wrong."],
      ["Aldous Huxley's title <i>Brave New World</i> echoes a line from...", "Shakespeare's <i>The Tempest</i>", "Charles Dickens", "Homer's <i>Odyssey</i>", "It is from a play about an island and a magician."],
      ["Steinbeck's <i>The Grapes of Wrath</i> takes its title from...", "a famous American hymn", "a cookbook", "a Greek myth", "Think of a patriotic song about the Civil War era."],
      ["A <b>preface</b> is usually written by...", "the author", "a stranger chosen at random", "the printer", "A <b>foreword</b> is the one written by someone else."],
      ["A title with a hidden meaning that you only understand at the end is often...", "symbolic or ironic", "meaningless", "the name of the printer", "The title becomes a clue to the theme."],
      ["Why do authors choose epigraphs?", "To frame a theme or connect to an earlier work", "To fill blank pages", "To reduce the length", "The quote makes you read the book through a lens."]],
    "Notice what comes before the story starts: the title, the dedication and any epigraph. They are clues from the author.",
    "Example: the title <i>Brave New World</i> sounds hopeful, but the book's story is not. The gap between title and story is a clue. Now do yours."),
    S("📖", ["Clues before page one", "A <b>title</b>, <b>epigraph</b> and <b>dedication</b> shape how you read."],
      ["Borrowed titles", "<i>Of Mice and Men</i> (Robert Burns, a poem about plans going wrong)<br><i>Brave New World</i> (Shakespeare, <i>The Tempest</i>)<br><i>The Grapes of Wrath</i> (a famous American hymn)"],
      ["Ask", "Why this title? What does the epigraph suggest? Do they match the story or contrast with it?"])));

  L25.push(mk("Wordplay: puns, malapropisms, spoonerisms", () => {
    const r = pick([
      ["'I used to be a banker, but I lost interest.'", "pun"],
      ["'She is the pineapple of politeness.'", "malapropism"],
      ["'You have hissed all my mystery lectures.'", "spoonerism"],
      ["'Level' and 'radar' read the same forward and backward.", "palindrome"],
      ["'Listen' and 'silent' use the same letters.", "anagram"],
      ["'I'm on a seafood diet. I see food and I eat it.'", "pun"],
      ["'She is a nice derangement of epitaphs.' (meant: 'arrangement of epithets')", "malapropism"],
      ["Saying 'a blushing crow' when you mean 'a crushing blow'", "spoonerism"]]);
    const cats = ["pun", "malapropism", "spoonerism", "palindrome", "anagram"];
    return { text: "What kind of wordplay is this?<br><i>" + r[0] + "</i>", choices: shuf([r[1]].concat(rest(cats, r[1], 2))), answer: r[1],
      hints: ["Ask what is being played with: a double meaning, a wrong word that sounds right, swapped sounds, or letters.", "A <b>pun</b> uses a double meaning. A <b>malapropism</b> swaps a similar-sounding wrong word. A <b>spoonerism</b> swaps the starting sounds of words. A <b>palindrome</b> reads the same backwards. An <b>anagram</b> rearranges letters.", "Example: 'I am reading a book about anti-gravity; it is impossible to put down' is a pun. Now do yours."] };
  }, S("🎲", ["Playing with words", "Writers play with sound and meaning for humor and surprise."],
      ["Five kinds", "<b>Pun</b>: double meaning.<br><b>Malapropism</b>: a similar word used by mistake (from Mrs. Malaprop in a play).<br><b>Spoonerism</b>: swapped sounds, named after Rev. William Spooner.<br><b>Palindrome</b>: same backward.<br><b>Anagram</b>: rearranged letters."],
      ["Why it matters", "Wordplay shows up in titles, headlines and dialogue. Spotting it helps you catch the joke and the meaning."])));

  L25.push(MIX("Mixed practice", L25[0], L25[2], L25[3], L25[6], L25[8], L25[10], L25[12], L25[14], L25[16]));
  L25.push(MIX("Level 25 Challenge", L25[1], L25[4], L25[5], L25[7], L25[9], L25[11], L25[13], L25[15], L25[17]));

  // ================= LEVEL 26 =================
  L26.push(mk("Latin roots: pel, sed, spir, val, urb", rc([
      ...rootRows("Latin", [
        ["pel/puls", "drive or push", ["propel", "repel", "impulse"]],
        ["sed/sess", "sit", ["sedentary", "session", "reside"]],
        ["spir", "breathe", ["inspire", "respire", "expire"]],
        ["val", "strong or worth", ["valid", "value", "valor"]],
        ["urb", "city", ["urban", "suburb", "urbane"]]]),
      ["A <i>sedentary</i> job is one where you mostly...", "sit", "run", "climb", "Think of a person at a desk all day."],
      ["To <i>propel</i> a boat is to...", "drive it forward", "tie it down", "paint it", "<b>pro-</b> means forward."],
      ["To <i>conspire</i> literally means to 'breathe together'. It now means to...", "plot secretly with others", "sing in a choir", "rest after a run", "People who whisper together are close enough to share a breath."],
      ["A <i>compulsory</i> class is one that is...", "required", "optional", "cancelled", "<b>com-</b> means together or strongly; the root is about being driven."],
      ["A <i>suburb</i> lies...", "near a city, on its edge", "far below the ground", "inside a mountain", "<b>sub-</b> can mean near or below, and the root names a city."],
      ["Sediment is material that...", "settles to the bottom", "floats to the top", "burns away", "The root means 'sit'. Where does something sit in a glass of muddy water?"],
      ["An <i>invalid</i> ticket is one that has no...", "worth or force", "price", "number", "<b>in-</b> means not."],
      ["To <i>expel</i> a rowdy visitor from a hall is to...", "drive them out", "invite them in", "greet them warmly", "<b>ex-</b> means out."]],
    ROOTH1, ROOTH3),
    S("🌳", ["Five more Latin roots", "These roots show up in essays, news and textbooks."],
      ["The roots", "<b>pel/puls</b> = drive (<b>pel</b>l, pro<b>pel</b>)<br><b>sed/sess</b> = sit (<b>sed</b>entary)<br><b>spir</b> = breathe (in<b>spir</b>e)<br><b>val</b> = strong, worth (<b>val</b>ue)<br><b>urb</b> = city (<b>urb</b>an)"],
      ["Build words", "<i>In</i> (into) + <i>spir</i> = <i>inspire</i>, 'breathe into'. <i>Com</i> + <i>pel</i> = <i>compel</i>, 'drive strongly', to force. <i>Sub</i> + <i>urb</i> = <i>suburb</i>, 'near the city'."])));

  L26.push(mk("Greek roots: dendr, ornith, ichthy, ophthalm, odont", rc([
      ...rootRows("Greek", [
        ["dendr", "tree", ["dendrology", "rhododendron", "dendrite"]],
        ["ornith", "bird", ["ornithology", "ornithologist", "ornithopter"]],
        ["ichthy", "fish", ["ichthyology", "ichthyologist", "ichthyic"]],
        ["ophthalm", "eye", ["ophthalmology", "ophthalmic", "ophthalmologist"]],
        ["odont", "tooth", ["orthodontist", "periodontal", "odontology"]]]),
      ["An <i>ornithologist</i> studies...", "birds", "stones", "trees", "<b>-ologist</b> means one who studies. The root names a creature that flies."],
      ["<i>Ichthyology</i> is the study of...", "fish", "teeth", "eyes", "Think of a scientist in a boat with a net."],
      ["An <i>ophthalmologist</i> is a doctor who treats...", "the eyes", "the bones", "the heart", "You visit this doctor for a sight test."],
      ["An <i>orthodontist</i> straightens...", "teeth", "bones", "hair", "<b>ortho-</b> means straight."],
      ["<i>Dendrology</i> is the study of...", "trees", "rocks", "stars", "A forest scientist might use this word."],
      ["An <i>ornithopter</i> is a machine that flies by...", "flapping wings like a bird", "spinning a propeller", "floating like a balloon", "Think of the root: it names a bird."]],
    ROOTH1, ROOTH3),
    S("🔬", ["Names of sciences", "Greek roots name many specialist fields."],
      ["The roots", "<b>dendr</b> = tree (<b>dendr</b>ology)<br><b>ornith</b> = bird (<b>ornith</b>ology)<br><b>ichthy</b> = fish (<b>ichthy</b>ology)<br><b>ophthalm</b> = eye (<b>ophthalm</b>ologist)<br><b>odont</b> = tooth (ortho<b>dont</b>ist)"],
      ["Build words", "root + <b>-ology</b> (study of) names a science. <i>Ortho</i> (straight) + <i>odont</i> = <i>orthodontist</i>, a 'straight-tooth' specialist."])));

  L26.push(mk("Doublespeak and weasel words", rc([
      ["A company says it is 'streamlining its workforce.' This most likely means it is...", "laying people off", "hiring more people", "giving everyone a holiday", "Doublespeak uses smooth words to soften a harsh fact."],
      ["'Revenue enhancement' is a smooth way to say...", "higher taxes or fees", "free gifts", "lower prices", "Think of what a government might call collecting more money."],
      ["'Negative growth' means the economy is...", "shrinking", "booming", "staying exactly level", "Growth is normally positive. What does a minus sign mean?"],
      ["Which phrase is a weasel phrase?", "Some experts say this works.", "A 2022 survey of 1,200 adults found this works.", "The test measured a 12% rise.", "Which one avoids naming who says it?"],
      ["Why is 'up to 50% off' tricky?", "Only a few items may be reduced that much", "Everything is half price", "It means the price is doubled", "'Up to' sets a ceiling, not a typical value."],
      ["'Mistakes were made.' This passive phrase avoids...", "saying who made the mistakes", "saying a mistake happened", "using a verb", "Who is the doer of the action?"],
      ["Compared with 'reduces,' the phrase 'helps reduce' is...", "weaker and less certain", "stronger and more certain", "exactly the same", "It claims only a share of the effect."],
      ["'Pre-owned' instead of 'used' is an example of...", "a gentler label that changes the feeling", "a scientific term", "a legal order", "The thing is the same; the word is softer."]],
    "Ask what is really being said and what is hidden. Smooth, vague or passive phrasing often avoids a plain fact.",
    "Example: 'We are right-sizing the team' hides 'We are cutting jobs.' Translate the phrase into plain words. Now do yours."),
    S("🌫️", ["Language that hides", "<b>Doublespeak</b> uses smooth or vague words to hide an unpleasant truth. <b>Weasel words</b> make a claim sound strong while promising little."],
      ["Examples", "'Streamlining' for layoffs.<br>'Some experts say' with no names.<br>'Up to 70% off', 'helps support', 'virtually spotless'."],
      ["Fight back", "Translate it into plain words. Ask: who says this, how much, compared with what? If a phrase will not answer, be careful."])));

  L26.push(mk("Coinage, back-formation and genericide", rc([
      ["The verb <i>edit</i> came from the noun <i>editor</i> by dropping an ending. This process is called...", "back-formation", "coinage", "genericide", "The shorter word was made from the longer one, backward."],
      ["The verb <i>burgle</i> came from <i>burglar</i>. This is...", "back-formation", "coinage", "genericide", "Which word came first, and which was cut from it?"],
      ["A nine-year-old, Milton Sirotta, invented the word <i>googol</i> for a huge number. Making up a word from scratch is...", "coinage", "back-formation", "genericide", "A brand-new word, not made from an old one."],
      ["When a brand name such as <i>escalator</i> becomes the ordinary word for the thing, it is called...", "genericide", "coinage", "back-formation", "The name 'dies' as a brand and becomes a common word."],
      ["Which of these started as a brand name?", "escalator", "staircase", "ramp", "It was invented as a product and trademarked."],
      ["Which of these is a back-formation?", "donate (from donation)", "doctor", "movie", "One of these was made by cutting an ending from a longer word."],
      ["Which of these was created by someone out of nothing?", "googol", "television", "babysit", "A playful new word, not formed from an older one."],
      ["<i>Babysit</i> came from <i>babysitter</i>. It is a...", "back-formation", "coinage", "genericide", "The verb was made from the noun."],
      ["Why do companies worry about genericide?", "They can lose the exclusive right to the name", "It makes the product cheaper", "It makes the product older", "A common word cannot be protected as a brand."]],
    "Ask how the word was formed: from nothing, from cutting a longer word or from a brand name that became common.",
    "Example: <i>enthuse</i> was cut from <i>enthusiasm</i> (back-formation). <i>Kodak</i> was invented with no earlier word (coinage). Now do yours."),
    S("🧪", ["How new words appear", "<b>Coinage</b>: invented from scratch (<i>googol</i>).<br><b>Back-formation</b>: a shorter word cut from a longer one (<i>edit</i> from <i>editor</i>).<br><b>Genericide</b>: a brand becomes a common word (<i>escalator</i>)."],
      ["Why it matters", "Language keeps growing. Knowing how words form helps you guess meanings and see how language changes."],
      ["Spot them", "If a verb sounds as if it came from a noun ending in -er, -or, -ion, it may be a back-formation."])));

  L26.push(mk("Phrases we owe to Shakespeare", rc([
      ["'Green-eyed monster,' a phrase for jealousy, appears in Shakespeare's...", "Othello", "Macbeth", "Hamlet", "It is a tragedy about a general and a villain who stirs up jealousy."],
      ["'A wild-goose chase' appears in Shakespeare's...", "Romeo and Juliet", "Julius Caesar", "King Lear", "The phrase is spoken by friends of Romeo."],
      ["'The be-all and end-all' appears in Shakespeare's...", "Macbeth", "Othello", "The Tempest", "A Scottish king, ambition and a dagger."],
      ["'There is method in his madness' appears in Shakespeare's...", "Hamlet", "Macbeth", "As You Like It", "A prince of Denmark who acts strangely."],
      ["'In a pickle' appears in Shakespeare's...", "The Tempest", "Romeo and Juliet", "Macbeth", "A play set on an island with a magician."],
      ["'Cruel to be kind' appears in Shakespeare's...", "Hamlet", "Macbeth", "The Tempest", "Spoken by a prince to his mother."],
      ["'A foregone conclusion' means a result that is...", "certain before it happens", "completely surprising", "very long", "The prefix <b>fore-</b> means before."],
      ["A 'wild-goose chase' is a...", "hopeless search", "cooking method", "race with a prize", "Chasing something you are unlikely ever to catch."],
      ["'Brave new world,' later the title of Aldous Huxley's novel, was first spoken in Shakespeare's...", "The Tempest", "Hamlet", "Othello", "The speaker is Miranda, who has grown up on an island."]],
    "Think about the plot or setting of each play, or about what the phrase would mean in plain words.",
    "Example: 'Break the ice' appears in <i>The Taming of the Shrew</i>, and means to start a conversation after an awkward silence. Now do yours."),
    S("🎭", ["Shakespeare's everyday words", "Many common phrases first appeared in Shakespeare's plays, or became popular through them."],
      ["A short list", "<b>Green-eyed monster</b>: jealousy (<i>Othello</i>)<br><b>Wild-goose chase</b> (<i>Romeo and Juliet</i>)<br><b>Be-all and end-all</b> (<i>Macbeth</i>)<br><b>Method in madness</b>, <b>cruel to be kind</b> (<i>Hamlet</i>)<br><b>In a pickle</b>, <b>brave new world</b> (<i>The Tempest</i>)"],
      ["Why it matters", "You already speak some Shakespeare. Spotting it helps you catch allusions in modern writing."])));

  L26.push(mk("Kairos, exigence and audience", rc([
      ["<b>Kairos</b> is the Greek word for...", "the right or opportune moment", "clock time", "a type of poem", "It is about timing, not minutes."],
      ["<b>Exigence</b> is...", "the problem or need that makes someone write or speak", "the final paragraph", "a type of evidence", "It is the spark that starts the message."],
      ["A student writes to the school board after the cafeteria cuts its vegetarian meals. The cuts are the...", "exigence", "kairos", "constraint", "What event made the student write?"],
      ["Giving a safety speech the week after a storm uses...", "good kairos", "poor kairos", "no audience", "The audience cares about the topic right now."],
      ["Which question helps you analyze the <b>audience</b>?", "Who will read this, and what do they already believe?", "How many pages is it?", "When was it printed?", "Think about the people who must be persuaded."],
      ["A word limit, a formal tone and a deadline are examples of...", "constraints", "exigence", "kairos", "Limits on what the writer can do."],
      ["Chronos is clock time. Which sentence describes kairos?", "The moment when people finally want to listen", "The speech lasts five minutes", "It is 3:15 p.m.", "Kairos is about opportunity, not the clock."],
      ["A poorly timed joke at a serious meeting shows a problem with...", "kairos", "grammar", "spelling", "The words may be fine, but the moment is wrong."]],
    "Think of the situation around the message: why it was written, who it is for and when.",
    "Example: a mayor's apology speech given a month late shows weak kairos; a flood is the exigence for a speech on water safety. Now do yours."),
    S("⏰", ["The rhetorical situation", "Every message answers a <b>situation</b>. Three big pieces: <b>exigence</b>, <b>audience</b> and <b>constraints</b>. Add <b>kairos</b>, the right moment."],
      ["Definitions", "<b>Exigence</b>: the problem that calls for a message.<br><b>Audience</b>: who must be reached.<br><b>Constraints</b>: limits such as length or tone.<br><b>Kairos</b>: the opportune time."],
      ["Use it", "When you read a speech, ask: what happened, who is listening and why now? Those answers explain many choices."])));

  L26.push(mk("Rogerian argument and common ground", rc([
      ["Rogerian argument aims to...", "find common ground and understanding", "defeat the opponent", "avoid the topic", "Think of a calm negotiator, not a debater."],
      ["Rogerian argument is named after the psychologist...", "Carl Rogers", "Aristotle", "Stephen Toulmin", "He was a counselor who stressed listening."],
      ["What should a Rogerian writer do first?", "State the other side's view fairly", "Attack the other side's weakest point", "Announce the winner", "To show respect, begin with their position."],
      ["Which opening sounds the most Rogerian?", "I understand why many families want later school start times.", "Anyone against later start times is wrong.", "Only fools like early mornings.", "Look for the sentence that respects the other view."],
      ["When is a Rogerian approach most useful?", "When the audience strongly disagrees", "When everyone already agrees", "When you have no evidence", "It lowers defensiveness."],
      ["Which phrase builds common ground?", "We both want students to be safe.", "You clearly never think.", "That idea is ridiculous.", "Look for a shared goal."],
      ["A Rogerian argument often ends with...", "a compromise or shared solution", "a loud insult", "a new problem", "It aims for cooperation."],
      ["Why might a Rogerian approach persuade better than a harsh attack?", "People listen when they feel understood", "People enjoy being shouted at", "It uses fewer words", "Think about how you respond when someone insults you."]],
    "Think about listening before arguing. What would calm an angry reader enough to hear you?",
    "Example: 'I know many neighbors worry about noise from a new park. I worry too. Here is a plan that keeps the park quiet at night.' Now do yours."),
    S("🤝", ["Argue by understanding", "A <b>Rogerian</b> argument starts by understanding the other side, then looks for shared ground."],
      ["Steps", "1. Fairly state their view.<br>2. Show where it makes sense.<br>3. State your view.<br>4. Show shared goals and a solution that serves both."],
      ["When to use it", "Best with strongly opposed audiences. It builds trust first, then asks them to move."])));

  L26.push(mk("Definitions in argument", () => {
    const r = pick([
      ["In this essay, 'screen time' means time spent looking at a phone or tablet, not television.", 0],
      ["'Democracy' is a system of government in which people vote for their leaders.", 1],
      ["'Well rested' means getting at least eight hours of sleep each night, as recorded by a wristband.", 2],
      ["For this study, 'frequent reader' means someone who reads at least two books a month.", 2],
      ["Here, 'success' means finishing the course with a passing grade, not winning prizes.", 0],
      ["A 'library' is a place where books and other materials are kept for borrowing.", 1],
      ["In this report, 'young adult' means a person aged 18 to 25.", 0],
      ["'Physically active' means 30 minutes of exercise on five days of the week.", 2]]);
    const cats = ["stipulative (set for this argument)", "lexical (dictionary-style)", "operational (how it is measured)"];
    return { text: "What kind of definition is this?<br><i>" + r[0] + "</i>", choices: shuf(cats), answer: cats[r[1]],
      hints: ["A definition can fix a meaning for one essay, report the common meaning or explain how something will be measured.", "If it says 'in this essay' or 'here', the writer is setting the meaning. If it tells how to measure or count, it is operational. If it is the common meaning, it is lexical.", "Example: 'Fast means running a mile in under seven minutes' is operational because it gives a measure. Now do yours."] };
  }, S("📏", ["Define your terms", "Arguments often fail because people use the same word in different ways. A clear definition prevents this."],
      ["Three kinds", "<b>Stipulative</b>: the writer sets the meaning for this argument.<br><b>Lexical</b>: the common dictionary meaning.<br><b>Operational</b>: how the term will be measured."],
      ["Use it", "Define key terms early. If your opponent uses a word differently, ask how they define it before you argue."])));

  L26.push(mk("Steel man, not straw man", rc([
      ["Mia says homework should be limited. Sam says, 'So you want kids to never learn anything?' This is a...", "straw man", "steel man", "fair summary", "Sam changed Mia's claim into something weaker."],
      ["A <b>steel man</b> is...", "the strongest fair version of an opposing argument", "a weak version of it", "a joke about it", "It is the opposite of the weak, easy-to-knock-down version."],
      ["The <b>principle of charity</b> says you should...", "read an opponent's argument in its strongest reasonable form", "assume your opponent is lying", "skip their evidence", "Treat the other side as sensible people."],
      ["Which is the best steel man of 'Schools should start later'?", "Later starts give teens more sleep, which can help health and learning.", "Teens just want to be lazy.", "Only sleepy people say that.", "Choose the version the other side would be glad to hear."],
      ["Why practice steel-manning?", "It helps you find the real disagreement", "It makes arguments longer", "It lets you ignore evidence", "You can only answer the real point once you understand it."],
      ["A writer says, 'Critics of the plan want to ruin the town.' The critics only asked for a cost study. This is a...", "straw man", "steel man", "citation", "The critics' view was exaggerated."],
      ["Which question is part of being charitable?", "What is the strongest reason someone would hold this view?", "How can I make them look foolish?", "What is the weakest example?", "Think about the best version of their case."],
      ["After you steel-man the other side, you can then...", "answer it honestly and show where you differ", "stop reading", "claim victory", "A fair reply meets the strongest point."]],
    "Ask whether the opposing view is being treated fairly. A fair summary is one the other side would accept.",
    "Example: 'Some want a bike lane to cut accidents' (fair). 'They want to ban cars' (straw man). Now do yours."),
    S("🛡️", ["Fair fights", "A <b>straw man</b> misstates an argument so it is easy to defeat. A <b>steel man</b> states it in its strongest form."],
      ["The principle of charity", "Read others in the strongest <i>reasonable</i> way. If you can state their view so well that they say 'Yes, exactly', you are ready to reply."],
      ["Why it pays", "A fair reply convinces readers that you are trustworthy and that your conclusion stands up to the best objections."])));

  L26.push(mk("Statistical or practical significance?", rc([
      ["A huge study finds a diet lowers weight by 0.1 kg, with p &lt; 0.001. The result is probably...", "statistically significant but practically tiny", "practically huge", "meaningless statistics", "A very large sample can detect very small effects."],
      ["A p-value below 0.05 is usually called...", "statistically significant", "proven certain", "practically important", "It is a convention about how surprising the result would be by chance."],
      ["A small p-value means the result...", "would be unlikely if chance alone were at work", "is definitely large", "is always true forever", "It speaks about chance, not about size."],
      ["Which number tells how big an effect is?", "effect size", "p-value", "sample size", "It measures the size of the difference."],
      ["A 95% confidence interval of '2 to 6 points' tells us...", "a plausible range for the true effect", "the exact true value", "that the study is wrong", "It is a range, not a single number."],
      ["A very wide confidence interval suggests...", "more uncertainty", "more certainty", "no data", "A wide net means a less precise estimate."],
      ["'Not statistically significant' means...", "the study did not find clear evidence of an effect", "there is definitely no effect", "the study was dishonest", "Absence of clear evidence is not proof of absence."],
      ["Which is a good question to ask about a result?", "How large is the effect, not just whether it is significant?", "What color is the graph?", "How long is the paper?", "Size matters as well as significance."]],
    "Separate two questions: is the result probably not due to chance, and is the difference large enough to matter?",
    "Example: a pill makes people sleep 2 minutes longer, and the study is huge. It may be 'significant', but nobody would notice. Now do yours."),
    S("📉", ["Two kinds of 'significant'", "<b>Statistically significant</b>: unlikely to be just chance.<br><b>Practically significant</b>: big enough to matter in real life."],
      ["Key terms", "<b>p-value</b>: how surprising the data would be if chance alone were at work.<br><b>Effect size</b>: how big the difference is.<br><b>Confidence interval</b>: a plausible range for the true value."],
      ["Reading wisely", "Large samples can make tiny effects 'significant'. Always ask how big the effect is."])));

  L26.push(mk("Peer review and replication", rc([
      ["In <b>peer review</b>, a paper is checked by...", "experts in the same field", "the author's family", "any reader on the street", "Think of 'peers' as other specialists."],
      ["<b>Replication</b> means...", "other researchers repeat a study to see if they get the same result", "copying the paper's words", "printing it twice", "A single result is stronger if it can be repeated."],
      ["A <b>preprint</b> is a paper that has...", "not yet been peer reviewed", "been withdrawn", "been translated", "The 'pre' means before."],
      ["A <b>retraction</b> happens when a journal...", "withdraws a paper because of serious problems", "prints the paper again", "gives the author a prize", "Think of pulling something back."],
      ["Does peer review guarantee a paper is correct?", "No, it improves quality but is not perfect", "Yes, always", "Only for short papers", "People can still miss errors."],
      ["Why is a result that many labs have confirmed more trustworthy?", "It has survived repeated testing", "It is older", "It is longer", "One lucky result could be an accident."],
      ["A <b>conflict of interest</b> is when...", "someone could gain from a particular result", "two papers disagree", "a graph is blurry", "Money or other benefits could bias judgment."],
      ["A news story says 'a new study suggests'. What should you check?", "Whether it was peer reviewed and how big it was", "How many pictures it has", "The font", "Look for quality checks."]],
    "Think about the checks that science uses to catch mistakes: other experts, repeated tests and honest disclosure.",
    "Example: a study of 12 people finds a surprising effect. Other labs try to repeat it and fail. The result is doubtful. Now do yours."),
    S("🧪", ["How science checks itself", "<b>Peer review</b>: experts review a paper before it is published.<br><b>Replication</b>: other teams repeat the study."],
      ["Warning signs", "<b>Preprint</b>: not yet reviewed.<br><b>Retraction</b>: a paper withdrawn after serious problems.<br><b>Conflict of interest</b>: a hidden benefit that could bias results."],
      ["Reading wisely", "No single study settles a question. Trust results that have been reviewed, repeated and openly funded."])));

  L26.push(mk("Literature reviews and research gaps", rc([
      ["A <b>literature review</b> mainly...", "summarizes and compares existing research on a topic", "describes the author's holiday", "lists only the author's own studies", "Literature here means published research."],
      ["A <b>research gap</b> is...", "a question that existing studies have not answered", "a blank page", "a missing citation", "It is what the new study will fill."],
      ["Which sentence signals a research gap?", "Few studies have looked at rural teenagers.", "Many studies agree on the results.", "This paper has three parts.", "Look for words such as 'few' or 'little is known'."],
      ["A good literature review is organized by...", "themes or debates", "the date each author was born", "the length of each article", "It groups sources by ideas, not just one-by-one."],
      ["Why include a literature review in a paper?", "To show what is known and where the new study fits", "To make the paper longer", "To avoid doing research", "It sets the scene for the new work."],
      ["'While many studies examine sleep in adults, few consider teens.' The word <i>while</i> sets up...", "a contrast leading to a gap", "a list of sources", "a conclusion", "It contrasts what is done with what is missing."],
      ["Which task is part of a good review?", "Comparing what different studies found", "Copying whole paragraphs", "Hiding sources that disagree", "A review weighs the evidence."],
      ["A gap in research can lead directly to...", "a research question", "a title page", "a bibliography only", "Questions grow from what is missing."]],
    "Think about what a review does: it maps the field and points to the open spot where new work belongs.",
    "Example: 'Many studies show that exercise helps adult memory. Few have tested children.' The gap is children. Now do yours."),
    S("🗺️", ["Mapping what is known", "A <b>literature review</b> surveys existing research on a topic."],
      ["Find the gap", "A <b>research gap</b> is a question that has not been answered. Phrases like 'few studies', 'little is known' and 'remains unclear' point to it."],
      ["Organize", "Group sources by theme, method or debate. Compare what they found, then say what is still missing."])));

  L26.push(mk("Valid or sound arguments?", () => {
    const r = pick([
      ["All birds can fly. Penguins are birds. So penguins can fly.", 1],
      ["All mammals have lungs. Whales are mammals. So whales have lungs.", 0],
      ["Some dogs are brown. Rex is a dog. So Rex is brown.", 2],
      ["If it rains, the ground gets wet. The ground is wet. So it rained.", 2],
      ["All squares have four sides. This shape is a square. So this shape has four sides.", 0],
      ["All fish live on land. Sharks are fish. So sharks live on land.", 1],
      ["If a number is even, it can be divided by 2. 10 is even. So 10 can be divided by 2.", 0],
      ["Some students like math. Ana is a student. So Ana likes math.", 2]]);
    const cats = ["valid and sound", "valid but not sound", "invalid"];
    return { text: "What best describes this argument?<br><i>" + r[0] + "</i>", choices: shuf(cats), answer: cats[r[1]],
      hints: ["Valid: if the premises were true, the conclusion would have to be true. Sound: valid, and the premises really are true.", "First ask whether the conclusion follows from the premises. Then ask whether each premise is actually true.", "Example: 'All cats are plants. Tom is a cat. So Tom is a plant' follows logically, but the first premise is false. It is valid but not sound. Now do yours."] };
  }, S("⚖️", ["Valid vs sound", "A <b>valid</b> argument has a conclusion that must follow if the premises are true. A <b>sound</b> argument is valid <i>and</i> has true premises."],
      ["Examples", "Valid and sound: all mammals breathe air; whales are mammals; so whales breathe air.<br>Valid but not sound: a premise is false.<br>Invalid: the conclusion does not follow."],
      ["Test it", "Step 1: does the conclusion follow? Step 2: are the premises true? You need both for sound."])));

  L26.push(mk("How historians argue", rc([
      ["A historian's <b>interpretation</b> is...", "an argument about what evidence means", "a list of dates only", "a story with invented facts", "History is more than facts: it explains them."],
      ["<b>Historiography</b> is...", "the study of how history has been written", "a type of map", "a kind of timeline", "It is history about history."],
      ["<b>Revisionism</b>, in history, means...", "re-examining an accepted view using new evidence or questions", "changing facts to suit one side", "forgetting the past", "The prefix <b>re-</b> means again; the root is about seeing."],
      ["<b>Presentism</b> is the mistake of...", "judging the past only by today's standards without context", "studying the present", "ignoring the future", "Imagine blaming someone in 1700 for not owning a phone."],
      ["Why do historians use many causes instead of one?", "Big events usually have several causes", "It is easier to write", "One cause is always true", "Consider why a war or revolution happens."],
      ["Two historians read the same letters and disagree. This is possible because...", "interpretations differ", "one is lying", "letters are never useful", "Evidence can be read in different ways."],
      ["A strong historical argument relies on...", "evidence from sources and clear reasoning", "guesses without proof", "popular opinion", "The claim must be supported."],
      ["<b>Periodization</b> means...", "dividing the past into named periods", "counting the years in a lifetime", "ignoring dates", "Think 'Middle Ages' or 'Renaissance'."]],
    "Think about how historians move from sources to claims, and how they compare each other's readings.",
    "Example: one historian says a revolt began because of taxes; another adds crop failure. Both use evidence, but they interpret it differently. Now do yours."),
    S("🏛️", ["History as argument", "Historians don't just list facts. They make <b>interpretations</b> and defend them with sources."],
      ["Terms", "<b>Historiography</b>: how history has been written.<br><b>Revisionism</b>: re-examining accepted views with new evidence.<br><b>Presentism</b>: judging the past by today's standards without context.<br><b>Periodization</b>: naming periods."],
      ["Read like a historian", "Ask: What is the claim? What sources support it? What would another historian say?"])));

  L26.push(mk("Choosing the best textual evidence", () => {
    const r = pick([
      ["The narrator is nervous.", "His hands shook as he reached for the door.", "The door was painted green.", "It was a Tuesday."],
      ["The town is poor.", "Half the windows were boarded, and the shop shelves stood empty.", "The church bell rang at noon.", "A dog slept in the road."],
      ["The two friends have grown apart.", "They sat side by side, but neither spoke a word.", "The cafe sold coffee and cake.", "Rain began to fall."],
      ["The mother is protective.", "She checked the lock three times before letting him leave.", "The kitchen smelled of bread.", "The stairs were steep."],
      ["The captain is a harsh leader.", "He barked orders and punished every small mistake.", "The ship was painted blue.", "The sea was calm that day."],
      ["The girl is curious.", "She opened every drawer, asked every question and read every sign.", "Her coat was red.", "The street was long."],
      ["The setting feels gloomy.", "A gray fog hung over the empty harbor.", "Gulls flew above the pier.", "A boat was tied to the dock."],
      ["The boy is generous.", "He split his lunch in half and handed the larger piece to a stranger.", "He walked home slowly.", "His shoes were muddy."]]);
    return { text: "Claim: <b>" + r[0] + "</b><br>Which line from the story is the best evidence?", choices: shuf([r[1], r[2], r[3]]), answer: r[1],
      hints: ["Good evidence is a detail that directly shows the claim, not just any detail from the story.", "Cross out lines that could appear in almost any story. Keep the one that makes you think of the claim.", "Example: Claim, 'She is shy.' Best evidence: 'She stared at her shoes and whispered her name.' Not: 'The room was warm.' Now do yours."] };
  }, S("💬", ["Pick quotes that prove", "Strong essays use <b>evidence</b> from the text that directly supports the claim."],
      ["Quote sandwich", "1. <b>Introduce</b> the quote ('Early on, the narrator seems anxious').<br>2. <b>Quote</b> it briefly.<br>3. <b>Explain</b> how it supports your claim."],
      ["Choosing", "Pick short, specific lines. A line should make the reader think of your point without help. Then explain the link."])));

  L26.push(mk("Free verse, prose poems and found poems", rc([
      ["<b>Free verse</b> is poetry with...", "no regular meter or rhyme scheme", "a strict rhyme in every line", "exactly fourteen lines", "It is free of fixed patterns, but not free of craft."],
      ["Walt Whitman, who wrote <i>Leaves of Grass</i>, is famous for...", "free verse", "sonnets only", "limericks", "He broke away from traditional rhyme and meter."],
      ["A <b>prose poem</b> looks like...", "a paragraph without line breaks", "a list of short lines", "a stage play", "It uses images and rhythm but sits in prose form."],
      ["A <b>found poem</b> is made from...", "words taken from another source, such as a sign or article", "a made-up dream", "a mathematical formula", "The poet 'finds' the words."],
      ["In <b>blackout poetry</b>, the poet...", "marks out most words on a page and leaves a few to form a poem", "adds many new words", "copies the page", "Think of a marker and a newspaper page."],
      ["Free verse still uses tools such as...", "line breaks, imagery and rhythm", "rhyme only", "page numbers", "Poets control the sound and the look."],
      ["Why might a poet choose free verse?", "To follow natural speech and flexible rhythm", "To make a poem unreadable", "Because rhyme is illegal", "Free verse can sound like speaking."],
      ["Which is the main difference between a prose poem and an ordinary paragraph?", "A prose poem uses the compression and imagery of poetry", "It is always shorter", "It has no words", "Think about language and intensity."]],
    "Think about the shape and the source. What gives the poem its form: lines, a paragraph or borrowed words?",
    "Example: a poem of short lines with no rhyme about waking up is free verse. A paragraph of dreamy images with no breaks is a prose poem. Now do yours."),
    S("✒️", ["Poems that break the mold", "<b>Free verse</b>: no regular rhyme or meter.<br><b>Prose poem</b>: poetry written as a paragraph.<br><b>Found poem</b>: made from words found elsewhere."],
      ["Still crafted", "Free verse uses line breaks, images, sound and silence. Whitman used it in <i>Leaves of Grass</i>."],
      ["Try it", "Cut words from a newspaper page or black out a page and keep a few. The choices you make are the poem."])));

  L26.push(mk("Parataxis and hypotaxis", () => {
    const r = pick([
      ["I came. I saw. I left.", "parataxis"],
      ["Although it was late, because the road was dark, we waited until the moon rose.", "hypotaxis"],
      ["The sun rose, the birds sang, the town woke.", "parataxis"],
      ["When the storm had passed, which had lasted all night, the villagers, who were tired, began to rebuild.", "hypotaxis"],
      ["He opened the door. He walked in. He sat down.", "parataxis"],
      ["Since she knew what the letter would say, she hesitated before she opened it.", "hypotaxis"],
      ["We ate. We talked. We slept.", "parataxis"],
      ["If the rain continues, as the forecast warns, the match, which was already delayed, will be cancelled.", "hypotaxis"]]);
    const cats = ["parataxis", "hypotaxis"];
    return { text: "Which style is this?<br><i>" + r[0] + "</i>", choices: shuf(cats), answer: r[1],
      hints: ["Look at how the clauses connect: side by side, or with words that make one depend on another?", "Parataxis places short clauses next to each other. Hypotaxis uses words such as when, because, although, which and since.", "Example: 'It rained. We stayed in.' is paratactic. 'Because it rained, we stayed in' is hypotactic. Now do yours."] };
  }, S("🧵", ["Two ways to build", "<b>Parataxis</b>: clauses side by side, with little linking.<br><b>Hypotaxis</b>: clauses linked and ranked with words such as because, although, which."],
      ["Effects", "Parataxis: plain, quick, direct, like a list of events. Hemingway is famous for it.<br>Hypotaxis: shows complicated relationships, reasons and conditions."],
      ["Choose", "Use parataxis for action and bare facts. Use hypotaxis for explanation and careful thought."])));

  L26.push(mk("Policy briefs and reports", rc([
      ["An <b>executive summary</b> is...", "a short overview of the whole report at the start", "a list of footnotes", "a blank page", "Busy readers need the key points up front."],
      ["Who is a policy brief written for?", "busy decision-makers", "small children", "poets", "Think of people who must act on the information."],
      ["Where does a brief usually put its main recommendation?", "near the beginning", "buried at the very end", "in the footnotes", "Decision-makers want it first."],
      ["BLUF stands for...", "bottom line up front", "begin long, understand fully", "big list under footnotes", "Put the point first."],
      ["Which section describes what is wrong?", "problem statement", "recommendations", "bibliography", "It sets out the issue."],
      ["A good recommendation is...", "specific and actionable", "vague and long", "hidden", "A reader should know what to do."],
      ["Why do reports offer several options before recommending one?", "To show alternatives and justify the choice", "To fill pages", "To confuse readers", "Decision-makers want to see the trade-offs."],
      ["Headings, bullet points and charts in a brief help readers...", "find key information quickly", "avoid reading", "feel confused", "Format guides the eye."]],
    "Think about the busy reader and where they look first. A brief is built for quick, confident decisions.",
    "Example: a city brief on bike lanes begins with: 'Recommendation: build two protected lanes this year.' Then it explains. Now do yours."),
    S("📑", ["Writing that gets action", "A <b>policy brief</b> or <b>report</b> helps someone decide what to do."],
      ["Typical parts", "<b>Executive summary</b> (the key points)<br><b>Problem statement</b><br><b>Background</b><br><b>Options</b><br><b>Recommendations</b>"],
      ["BLUF", "'Bottom line up front.' State the main recommendation early, then give the evidence."])));

  L26.push(MIX("Mixed practice", L26[0], L26[2], L26[4], L26[5], L26[8], L26[10], L26[12], L26[14], L26[16]));
  L26.push(MIX("Level 26 Challenge", L26[1], L26[3], L26[6], L26[7], L26[9], L26[11], L26[13], L26[15], L26[17]));

  // ================= LEVEL 27 =================
  L27.push(mk("Latin roots: sal, sanct, ocul, simil, dorm", rc([
      ...rootRows("Latin", [
        ["sal/sult", "leap or jump", ["assault", "result", "somersault"]],
        ["sanct", "holy or sacred", ["sanctuary", "sanctify", "sanctity"]],
        ["ocul", "eye", ["binocular", "oculist", "monocle"]],
        ["simil/simul", "like or same", ["similar", "simulate", "simultaneous"]],
        ["dorm", "sleep", ["dormant", "dormitory", "dormouse"]]]),
      ["A <i>dormant</i> volcano is one that is...", "inactive, as if asleep", "erupting now", "made of ice", "Think of animals that hibernate."],
      ["<i>Simultaneous</i> events happen...", "at the same time", "far apart in place", "one after another", "The root means 'like' or 'same'."],
      ["A <i>binocular</i> device lets you use...", "both eyes", "both ears", "both hands", "<b>bi-</b> means two."],
      ["A <i>sanctuary</i> is a place of...", "safety and protection", "noise", "trade", "Think of a refuge, once considered holy ground."],
      ["Something <i>salient</i> in a report is...", "the part that jumps out as most noticeable", "the part hidden at the back", "the part full of numbers", "The root pictures something leaping out."],
      ["To <i>simulate</i> a flight is to make something...", "that imitates the real thing", "that ends the flight", "that sits still", "The root means 'like'."],
      ["The word <i>sanction</i> can mean to approve or to penalize. Both senses come from a root about...", "making something holy or binding", "tasting food", "counting coins", "The root is about something solemn or settled by authority."],
      ["To <i>exult</i> is to leap with joy. The root is about...", "jumping", "sleeping", "seeing", "<b>ex-</b> means out; imagine jumping out of your seat."]],
    ROOTH1, ROOTH3),
    S("🌳", ["More Latin roots", "These roots appear in textbooks and news stories."],
      ["The roots", "<b>sal/sult</b> = leap (re<b>sult</b>)<br><b>sanct</b> = holy (<b>sanct</b>uary)<br><b>ocul</b> = eye (bin<b>ocul</b>ar)<br><b>simil/simul</b> = like, same (<b>simil</b>ar)<br><b>dorm</b> = sleep (<b>dorm</b>itory)"],
      ["Build words", "<i>Re</i> (back) + <i>sult</i> = <i>result</i>, 'leap back', what comes back from an action. <i>Sim</i> + <i>ul</i> + <i>taneous</i> = <i>simultaneous</i>, 'at the same moment'."])));

  L27.push(mk("Greek roots: tax, thes, lys, krit, phan", rc([
      ...rootRows("Greek", [
        ["tax/tac", "arrange or order", ["syntax", "taxonomy", "tactic"]],
        ["thes/the", "put or place", ["thesis", "synthesis", "hypothesis"]],
        ["lys", "loosen or break apart", ["analysis", "paralysis", "catalyst"]],
        ["krit", "judge or decide", ["critic", "criterion", "crisis"]],
        ["phan/phen", "show or appear", ["phenomenon", "phantom", "epiphany"]]]),
      ["<i>Analysis</i> literally means 'loosening up' something to see its parts. In practice it means...", "breaking a thing into parts to understand it", "putting parts together", "forgetting the parts", "The root is about loosening."],
      ["<i>Synthesis</i> literally means 'putting together'. In reading, it is...", "combining ideas from several sources", "taking an idea apart", "copying one source", "<b>syn-</b> means together."],
      ["A <i>criterion</i> is a standard used to...", "judge something", "paint something", "carry something", "The root is about judging."],
      ["<i>Syntax</i> is the way words are...", "arranged in sentences", "spelled", "pronounced", "The root is about arrangement."],
      ["A <i>hypothesis</i> is an idea 'placed under' an investigation. It is...", "a proposed explanation to test", "a final proof", "a footnote", "<b>hypo-</b> means under; the root means place."],
      ["A <i>phenomenon</i> is something that...", "can be observed", "cannot be seen at all", "is imaginary", "The root means 'show'."],
      ["<i>Taxonomy</i> is the science of...", "classifying living things into groups", "measuring distances", "writing poems", "The root is about arrangement."],
      ["A <i>catalyst</i> in a story is something that...", "triggers change", "stops all change", "ends the book", "The root is about loosening; a catalyst loosens things up."]],
    ROOTH1, ROOTH3),
    S("🏺", ["Greek roots for thinking", "Many words for thinking and studying come from Greek."],
      ["The roots", "<b>tax/tac</b> = arrange (<b>tax</b>onomy)<br><b>thes/the</b> = put (<b>thes</b>is)<br><b>lys</b> = loosen (ana<b>lys</b>is)<br><b>krit</b> = judge (<b>crit</b>ic)<br><b>phan/phen</b> = show (<b>phen</b>omenon)"],
      ["Build words", "<i>Ana</i> (up) + <i>lys</i> = <i>analysis</i>, 'loosening up'. <i>Syn</i> (together) + <i>thes</i> = <i>synthesis</i>, 'placing together'."])));

  L27.push(mk("Words from law, medicine and economics", rc([
      ["In a court case, the <b>plaintiff</b> is the person who...", "brings the case", "decides the case", "records the case", "The plaintiff 'complains' to the court."],
      ["A <b>statute</b> is...", "a written law passed by a legislature", "a type of statue", "a courtroom", "Think of a law book."],
      ["A <b>precedent</b> is...", "an earlier decision that guides later ones", "a type of crime", "a verdict that is secret", "The prefix <b>pre-</b> means before."],
      ["A <b>chronic</b> condition is one that...", "lasts a long time", "starts suddenly and ends fast", "is invented", "The Greek root <i>chron</i> means time."],
      ["An <b>acute</b> illness...", "comes on suddenly and is often short", "lasts for years", "never causes symptoms", "It is the opposite of chronic."],
      ["<b>Inflation</b> is...", "a general rise in prices over time", "a fall in all prices", "a type of bank", "Think of a balloon being filled."],
      ["A <b>subsidy</b> is...", "money from the government to support an activity", "a tax on goods", "a bank loan with interest", "<b>sub-</b> can mean support from below."],
      ["A <b>recession</b> is...", "a period when the economy shrinks", "a boom in trade", "a type of tax", "The root means going back."],
      ["A <b>benign</b> remark is...", "harmless or kindly", "dangerous", "confusing", "The root <i>ben</i> means good."]],
    "Think about which field the word belongs to and what it does there. Use the root or prefix as a clue.",
    "Example: <b>defendant</b> sounds like 'defend'. In court it is the person who must answer the charge. Now do yours."),
    S("⚖️", ["Words from three fields", "Law, medicine and economics each have their own vocabulary that often appears in news and textbooks."],
      ["Samples", "<b>Law</b>: plaintiff, defendant, statute, precedent.<br><b>Medicine</b>: chronic, acute, benign.<br><b>Economics</b>: inflation, subsidy, recession."],
      ["Strategy", "Use roots and prefixes, then check context. Keep a short list of field words for each course."])));

  L27.push(mk("False etymologies and folk etymology", rc([
      ["Many people think <i>sirloin</i> came from a king knighting a steak, 'Sir Loin.' It really comes from French words meaning...", "above the loin", "a knight's lunch", "six loins", "The first part of the French word means above."],
      ["<i>Hamburger</i> is named after...", "the city of Hamburg, Germany", "ham", "a person named Hamburg Burger", "Look at a map of Germany."],
      ["<i>Pineapple</i> got its name because the fruit looked like a...", "pine cone", "pine tree needle", "green apple", "In old English, 'pineapple' meant the cone of a pine tree."],
      ["The <i>s</i> in <i>island</i> was added because people wrongly linked it to...", "the word <i>isle</i>", "the word <i>sand</i>", "the word <i>slide</i>", "The word actually came from Old English <i>igland</i>."],
      ["<i>Fortnight</i> comes from...", "'fourteen nights'", "'forty nights'", "'fort and night'", "It is a very old way to say two weeks."],
      ["<i>Daisy</i> comes from Old English words meaning...", "'day's eye'", "'dazzling yellow'", "'dew and sky'", "The flower opens at sunrise."],
      ["A <b>folk etymology</b> is...", "a popular but wrong explanation of a word's origin", "the study of folk songs", "a dictionary", "It sounds right but is not what the records show."],
      ["<i>Asparagus</i> was once reshaped to 'sparrow grass'. This is an example of...", "folk etymology", "coinage", "genericide", "People changed the unfamiliar word to sound like familiar ones."]],
    "Be cautious with word-origin stories that sound too neat. Ask whether the story is backed by old records.",
    "Example: 'Posh' is often said to mean 'port out, starboard home', but there is no evidence. Neat stories can be myths. Now do yours."),
    S("🕵️", ["Word-origin myths", "A <b>folk etymology</b> is a popular but incorrect explanation of where a word comes from. It can also reshape the word itself."],
      ["True origins", "<i>Sirloin</i> = French for above the loin.<br><i>Hamburger</i> = from Hamburg.<br><i>Fortnight</i> = fourteen nights.<br><i>Daisy</i> = day's eye."],
      ["Check it", "Good etymologies come from dated written records, not from fun stories. A dictionary with etymologies is a safer source."])));

  L27.push(mk("Zeugma, paralipsis, anadiplosis, synesthesia", rc([
      ["'She lost her keys and her temper.' One verb governs two different objects. This is...", "zeugma", "paralipsis", "anadiplosis", "One word does double duty in two senses."],
      ["'I won't even mention his lateness.' The speaker mentions it while saying they won't. This is...", "paralipsis", "zeugma", "synesthesia", "Pretending to skip something while saying it."],
      ["'Fear leads to anger; anger leads to hate.' The last word of one clause starts the next. This is...", "anadiplosis", "zeugma", "paralipsis", "The prefix <b>ana-</b> means again; look at the join between clauses."],
      ["'A loud shirt' mixes sound with sight. This is...", "synesthesia (mixing senses)", "zeugma", "paralipsis", "Senses cross over."],
      ["Why might a writer use paralipsis?", "To point at something while seeming not to", "To avoid the topic completely", "To cut a sentence short", "It is a sly form of emphasis."],
      ["'He opened the door and his heart.' This is...", "zeugma", "anadiplosis", "paralipsis", "One verb, two kinds of object."],
      ["'The task takes patience; patience takes practice.' This is...", "anadiplosis", "paralipsis", "zeugma", "A word repeats at the end and then at the start."],
      ["'The sweet sound of the cello' mixes taste with hearing. This is...", "synesthesia", "paralipsis", "anadiplosis", "Taste words attached to a sound."]],
    "Look at how words are repeated, shared or mixed: across two clauses, across two objects, or across the senses.",
    "Example: 'He took his hat and his leave' is a zeugma: one verb, two different kinds of object. Now do yours."),
    S("🎩", ["Rare tricks", "<b>Zeugma</b>: one word works with two things in different senses.<br><b>Paralipsis</b>: mentioning by pretending not to.<br><b>Anadiplosis</b>: ending one clause with the word that starts the next.<br><b>Synesthesia</b>: mixing senses."],
      ["Examples", "'She lost her keys and her temper.'<br>'I won't mention his lateness.'<br>'Fear leads to anger; anger leads to hate.'<br>'A loud shirt.'"],
      ["Use them", "These figures stand out. Use them for humor, emphasis or surprise, one at a time."])));

  L27.push(mk("Schools of interpretation", rc([
      ["Which approach focuses on close reading of the words on the page, setting aside the author's life?", "New Criticism", "Biographical criticism", "Reader-response", "It argues that the text itself holds the evidence."],
      ["The <b>intentional fallacy</b> is the idea that...", "an author's intentions are not a reliable guide to a work's meaning", "authors never have intentions", "poems cannot be read", "New Critics used it to focus on the text."],
      ["Who wrote the essay 'The Death of the Author' (1967)?", "Roland Barthes", "Aristotle", "Jane Austen", "A French critic."],
      ["<b>Deconstruction</b> looks for...", "contradictions and unstable meanings in a text", "the one true meaning", "the author's diary", "It questions whether meaning is fixed."],
      ["A critic who reads a novel alongside the laws and events of its time uses a...", "historical approach", "purely formal approach", "reader-only approach", "Context is the main tool."],
      ["Which approach emphasizes how readers create meaning?", "reader-response", "New Criticism", "historicism", "It puts the reader in the center."],
      ["Which method best studies how a poem's imagery and structure work together?", "close reading", "reading the author's biography", "counting pages", "Look at words, form and image."],
      ["Why do critics use different schools?", "Different questions reveal different features of a text", "To confuse students", "Because only one is correct", "Each lens shows something different."]],
    "Match each approach to the question it asks: about the text, the author, the reader, the history, or the gaps in meaning.",
    "Example: asking 'How do the poem's images build tension?' is formal close reading. Asking 'What was happening when it was written?' is historical. Now do yours."),
    S("🔭", ["Lenses on literature", "<b>New Criticism</b>: close reading of the text itself.<br><b>Historical</b>: text in its time.<br><b>Reader-response</b>: the reader's role.<br><b>Deconstruction</b>: contradictions and shaky meanings."],
      ["Key ideas", "<b>Intentional fallacy</b>: do not use the author's intent as the final word on meaning.<br><b>The Death of the Author</b> (Barthes): readers, not authors, create meaning."],
      ["Use them", "You do not have to pick one forever. Use the lens that fits the question you are asking."])));

  L27.push(mk("Tragedy's vocabulary: hamartia, anagnorisis, peripeteia", rc([
      ["<b>Hamartia</b> is a tragic hero's...", "error or flaw", "victory", "friend", "It means 'missing the mark'."],
      ["<b>Anagnorisis</b> is the moment of...", "recognition or discovery", "celebration", "farewell", "The hero learns a crucial truth."],
      ["<b>Peripeteia</b> is a sudden...", "reversal of fortune", "song by the chorus", "change of costume", "Things turn the opposite way."],
      ["<b>Catharsis</b> is the audience's...", "release or cleansing of pity and fear", "boredom", "applause", "The word means cleansing."],
      ["<b>Hubris</b> is...", "excessive pride", "deep sadness", "great courage", "Pride that goes too far."],
      ["In a play, the hero discovers who he truly is. This moment is called...", "anagnorisis", "hamartia", "hubris", "A scene of recognition."],
      ["A king's pride leads him to ignore warnings and fall. His pride is his...", "hubris", "catharsis", "peripeteia", "It is the flaw that sets his fall in motion."],
      ["Who wrote about these terms in the <i>Poetics</i>?", "Aristotle", "Shakespeare", "Homer", "A Greek philosopher."]],
    "Match each Greek term to its role in a tragic story: flaw, discovery, reversal, pride and release.",
    "Example: a hero ignores a warning (hubris), a messenger brings terrible news (reversal), he sees the truth (recognition), and the audience feels cleansed (catharsis). Now do yours."),
    S("🎭", ["Aristotle's tragic vocabulary", "In the <i>Poetics</i>, Aristotle described how tragedy works."],
      ["Terms", "<b>Hamartia</b>: error or flaw.<br><b>Hubris</b>: excessive pride.<br><b>Peripeteia</b>: reversal of fortune.<br><b>Anagnorisis</b>: recognition.<br><b>Catharsis</b>: emotional cleansing."],
      ["Use them", "When you read a tragedy, find the flaw, the turning point, the moment of recognition and the effect on you."])));

  L27.push(mk("Modernism and postmodernism", rc([
      ["Modernism flourished in the...", "early 20th century", "1400s", "21st century only", "Think of the years around the First World War."],
      ["Which is a landmark modernist poem from 1922?", "<i>The Waste Land</i> by T. S. Eliot", "<i>Paradise Lost</i>", "<i>Leaves of Grass</i>", "Its title suggests a broken world."],
      ["Modernist writers often used...", "fragmentation and experiments with form", "only strict rhymes", "no writing at all", "They wanted new ways to show the mind."],
      ["Which is typical of postmodern writing?", "irony, pastiche and playing with genre", "strict classical form", "plain moral lessons", "Postmodern writers often mix styles."],
      ["<b>Pastiche</b> is...", "a work that imitates or mixes other styles", "an original fairy tale", "a legal term", "Think of a collage."],
      ["Postmodern writers are often skeptical of...", "single grand explanations of the world", "reading", "punctuation", "They question big stories about 'truth'."],
      ["A novel told in broken pieces with shifting voices is more likely...", "modernist", "medieval", "a nursery rhyme", "Fragmentation is a modernist hallmark."],
      ["A story that jokes about being a story, mixes genres and quotes other works is likely...", "postmodern", "classical", "a fable", "It plays with form and references."]],
    "Think about era, mood and technique: modernists fragment and search; postmodernists play and question.",
    "Example: a poem built from scraps of different voices and languages looks modernist. A novel that winks at the reader and mixes detective and comic styles looks postmodern. Now do yours."),
    S("🧩", ["Two big movements", "<b>Modernism</b> (early 1900s): fragmentation, new forms, a sense of a broken world.<br><b>Postmodernism</b> (later 1900s): irony, pastiche, playing with genre."],
      ["Examples", "Modernist: Eliot's <i>The Waste Land</i> (1922), Woolf's <i>Mrs Dalloway</i> (1925).<br>Postmodern: stories that mix genres and refer to other works."],
      ["Reading tip", "Look for signs: broken sequences and shifting voices (modernist) or playful mixing and winks to the reader (postmodern)."])));

  L27.push(mk("Metafiction and the fourth wall", rc([
      ["<b>Metafiction</b> is fiction that...", "draws attention to being fiction", "is based on a true story", "has no characters", "The prefix <b>meta-</b> means about itself."],
      ["Breaking the <b>fourth wall</b> means a character...", "speaks directly to the audience", "leaves the stage", "falls asleep", "The imaginary wall sits between stage and audience."],
      ["A narrator who says 'Dear reader, I have to admit this story is made up' is writing...", "metafiction", "a lab report", "an instruction manual", "The story talks about itself."],
      ["A novel in which a character reads the novel they are in is...", "metafictional", "historical", "scientific", "The book refers to itself."],
      ["Why might an author use metafiction?", "To make readers think about how stories work", "To avoid having a plot", "To save paper", "It invites questions about storytelling."],
      ["In many plays, a soliloquy is spoken...", "to the audience, as if thinking aloud", "to an enemy", "to a pet", "It is a form of direct address."],
      ["A film character who looks at the camera and says 'Can you believe this?' is...", "breaking the fourth wall", "following the script strictly", "hiding", "He addresses the viewer."],
      ["Metafiction often uses...", "narrators who comment on the story", "no words", "only numbers", "The story steps outside itself."]],
    "Ask whether the work is acknowledging that it is a story or speaking directly to the audience.",
    "Example: 'You might think this is where the hero escapes. Wait. This is only chapter three.' The narrator comments on the story itself. Now do yours."),
    S("🪞", ["Stories that know they are stories", "<b>Metafiction</b> draws attention to its own fictional nature."],
      ["Techniques", "Narrators who talk about the writing.<br>Characters who know they are in a book.<br><b>Breaking the fourth wall</b>: speaking directly to the audience."],
      ["Why", "It makes readers question how stories shape belief, and what is real."])));

  L27.push(mk("Signposts in dense reading", rc([
      ["Which phrase signals a restatement in simpler words?", "In other words", "However", "For instance", "It tells you the author is saying the same thing differently."],
      ["Which phrase signals a turn against the view just described?", "Yet this view overlooks", "In other words", "Moreover", "It introduces a counterpoint."],
      ["Which phrase signals the author's main claim?", "I contend that", "For example", "Some say", "It points to a position the author owns."],
      ["Which phrase signals a concession?", "Admittedly", "Therefore", "In summary", "The author grants a point before disagreeing."],
      ["Which phrase signals an example is coming?", "For instance", "On the contrary", "Finally", "It introduces a case."],
      ["When reading a dense theory article, a good first step is to...", "read the introduction and conclusion to find the thesis", "start at the last page and stop", "skip the headings", "Find the main point before wading in."],
      ["'Many scholars argue X, but I argue Y.' The words <i>but I argue</i> signal...", "the author's own claim", "a summary", "a footnote", "The author shifts from others' views to their own."],
      ["Which phrase signals a reason or cause?", "because", "meanwhile", "although", "It links effect to reason."]],
    "Look for the small linking words and phrases. They show how each part of the argument connects to the next.",
    "Example: 'Admittedly, the data are limited. Yet they point in one direction.' <i>Admittedly</i> grants a point; <i>Yet</i> turns back. Now do yours."),
    S("🧭", ["Follow the signs", "Dense writing is easier when you follow <b>signposts</b>, small phrases that tell you where the argument is going."],
      ["Types", "<b>Restate</b>: in other words<br><b>Contrast</b>: however, yet<br><b>Claim</b>: I contend that<br><b>Concede</b>: admittedly<br><b>Example</b>: for instance"],
      ["Strategy", "First find the thesis. Then mark signposts as you read. They show the path."])));

  L27.push(mk("Evaluating sources: CRAAP and lateral reading", rc([
      ["In the CRAAP test, the <b>C</b> stands for...", "currency (how recent)", "creativity", "cost", "It asks whether the information is up to date."],
      ["The <b>R</b> in CRAAP asks about...", "relevance to your topic", "reading speed", "rhyme", "Does the source actually fit your question?"],
      ["The <b>A</b> for authority asks...", "Who wrote it, and are they qualified?", "How many pages?", "Is it in color?", "It is about the creator's expertise."],
      ["The second <b>A</b> in CRAAP is...", "accuracy", "attitude", "audience", "It asks whether the claims are supported and checkable."],
      ["The <b>P</b> in CRAAP asks about...", "purpose", "price", "paper", "Why was the source made: to inform, sell, persuade?"],
      ["<b>Lateral reading</b> means...", "leaving the page to see what other sources say about it", "reading a page left to right", "reading only the About page", "Open new tabs to check the source."],
      ["A website's 'About' page says it is trustworthy. Is this enough?", "No, check what others say about it", "Yes, always", "Only if it is long", "Self-praise is not independent evidence."],
      ["Which is a sign of a stronger source?", "It names its authors and cites its evidence", "It uses only exclamation marks", "It hides its sources", "Transparency builds trust."]],
    "Think about the source's age, fit, creator, accuracy and purpose. Then step outside the page to check it.",
    "Example: an article from 2005 about phone safety may fail on currency. An ad for a gadget may have a selling purpose. Now do yours."),
    S("🔎", ["Testing a source", "<b>CRAAP</b> test: <b>C</b>urrency, <b>R</b>elevance, <b>A</b>uthority, <b>A</b>ccuracy, <b>P</b>urpose."],
      ["Lateral reading", "Professional fact-checkers do not stay on a page. They open new tabs and ask: who is behind it, and what do others say?"],
      ["Together", "Use CRAAP questions, then check outside the page. A good source survives both."])));

  L27.push(mk("Academic integrity and common knowledge", rc([
      ["Copying a paragraph word for word without credit is...", "plagiarism", "paraphrase", "common knowledge", "The words belong to someone else."],
      ["<b>Patchwriting</b> means...", "changing a few words of a source but keeping its structure, without credit", "writing with a patch", "using a thesaurus legally", "It is still too close to the original."],
      ["Reusing your own earlier paper for a new class without permission is...", "self-plagiarism", "common knowledge", "teamwork", "Even your own work needs to be disclosed."],
      ["Inventing data or quotes is called...", "fabrication", "paraphrase", "citation", "Making things up is its own violation."],
      ["Which fact usually needs no citation?", "Water boils at 100 degrees Celsius at sea level.", "A specific statistic from a 2023 survey", "A scholar's original theory", "It is widely known and easy to confirm."],
      ["Which usually needs a citation?", "A specific statistic or a unique idea", "That the sky looks blue", "That Paris is in France", "Specific data come from a source."],
      ["Which is the safest way to use an idea from a source?", "Paraphrase it in your own words and cite it", "Copy it and hope", "Change one word", "You need both your own wording and credit."],
      ["Why does academic integrity matter?", "It credits ideas and keeps trust in research", "It makes papers longer", "It is just a rule with no reason", "Scholars build on each other's work."]],
    "Ask: whose idea or words are these, and have I given credit? Anything specific or unique needs a source.",
    "Example: 'The Earth orbits the Sun' needs no citation. 'In 2022, 61% of teens slept under 8 hours' does. Now do yours."),
    S("🛡️", ["Giving credit", "<b>Plagiarism</b> is presenting someone else's words or ideas as your own."],
      ["Forms", "Copying, <b>patchwriting</b>, <b>self-plagiarism</b>, <b>fabrication</b>."],
      ["Common knowledge", "Widely known, easily checked facts need no citation. Specific numbers and original ideas do. When in doubt, cite."])));

  { // absolute vs relative risk: generated numbers plus ideas
    const PAIRS = [[8, 6], [20, 15], [12, 9], [10, 4], [5, 2], [15, 6], [20, 12], [30, 24], [25, 19], [40, 30]];
    const mkRisk = () => {
      const [a, b] = pick(PAIRS), abs = a - b, rel = Math.round(abs / a * 100);
      if (Math.random() < 0.5) {
        const right = abs + " percentage points";
        return { text: "A treatment lowers the chance of an illness from <b>" + a + "%</b> to <b>" + b + "%</b>. What is the <b>absolute</b> reduction?", choices: shuf([right, rel + " percentage points", b + " percentage points"]), answer: right,
          hints: ["Absolute change is the plain difference between the two percentages.", "Subtract the new percentage from the old one. The result is in percentage points.", "Example: 9% down to 7% is a drop of 2 percentage points. Now do yours."] };
      }
      const right = rel + "%";
      return { text: "A treatment lowers the chance of an illness from <b>" + a + "%</b> to <b>" + b + "%</b>. By what percent has the risk fallen <b>relatively</b>?", choices: shuf([right, abs + "%", (100 - rel) + "%"]), answer: right,
        hints: ["Relative change compares the drop with the starting risk.", "Divide the drop by the starting percentage, then turn it into a percent.", "Example: 10% down to 5%: the drop is 5, the start is 10, so the risk fell by half, or 50%. Now do yours."] };
    };
    const ideas = rc([
      ["A headline says 'Risk doubles!' but the risk went from 1 in 1,000 to 2 in 1,000. Why can this mislead?", "The absolute increase is tiny", "Doubling is impossible", "The numbers are not real", "Think about how large the actual risk is."],
      ["Which number helps you judge how much a risk matters in real life?", "the absolute risk", "the headline", "the font size", "It tells you the actual chance."],
      ["A company says 'cuts risk by 50%.' To judge this, you should ask:", "50% of what starting risk?", "What color is the box?", "Who drew the logo?", "A relative figure needs a starting point."],
      ["Going from 2% to 1% is a relative drop of 50%. The absolute drop is...", "1 percentage point", "50 percentage points", "2 percentage points", "Subtract the two percentages."],
      ["Which statement is the clearest?", "Out of 100 people, 2 will get ill without the drug and 1 with it.", "The drug is 50% effective.", "The drug changes everything.", "Natural frequencies help people see the real size."],
      ["Why do news headlines prefer relative risk?", "Large percentages look more dramatic", "They are always more accurate", "They are required by law", "Think of which number makes a bigger headline."]],
      "Compare absolute (plain difference) and relative (compared with the start). Always ask how big the starting risk is.",
      "Example: a risk of 2 in 100 falling to 1 in 100 is 'half the risk' (relative) but only one fewer case per hundred (absolute). Now do yours.");
    const make = () => Math.random() < 0.6 ? mkRisk() : ideas();
    L27.push(mkL("Absolute and relative risk", make, S("🎯", ["Two ways to say it", "<b>Absolute</b> change: the plain difference (8% to 6% is 2 percentage points).<br><b>Relative</b> change: the drop compared with the start (2 out of 8 is 25%)."],
      ["Why it matters", "'Risk cut by 50%' sounds big. But if the risk falls from 2 in 1,000 to 1 in 1,000, only one person in a thousand is affected."],
      ["Ask", "What was the starting risk? Report absolute numbers when you can: 'out of 100 people'."])));
  }

  L27.push(mk("Confounders and lurking variables", rc([
      ["Ice cream sales and drowning both rise in summer. The hidden factor is probably...", "hot weather", "ice cream", "swimming lessons", "What happens in summer that affects both?"],
      ["A <b>confounder</b> is a hidden factor that...", "affects both things being compared", "improves a graph", "ends a study", "It can create a false link."],
      ["In children, shoe size correlates with reading ability. A likely confounder is...", "age", "favorite color", "type of lunch", "Older kids have bigger feet and read better."],
      ["People who carry lighters have more lung disease. The likely confounder is...", "smoking", "pocket size", "shoe size", "The lighter is not the cause."],
      ["Simpson's paradox is when a trend...", "reverses when groups are combined", "stays the same always", "is a typing error", "Look at the groups separately."],
      ["How can researchers reduce confounding?", "Randomly assign people to groups", "Pick only friends", "Ignore the data", "Randomness spreads hidden factors evenly."],
      ["Coffee drinkers seem to have more heart disease, but many also smoke. Smoking is a...", "confounder", "control group", "placebo", "It could explain the link."],
      ["Why must you be careful when a headline says X 'is linked to' Y?", "A confounder may explain both", "Links are always false", "Y causes nothing", "A link is not proof of cause."]],
    "Look for a third factor that could affect both of the things being compared.",
    "Example: students with more books at home score higher on tests. A hidden factor, family income, might drive both. Now do yours."),
    S("🕸️", ["Hidden third factors", "A <b>confounder</b> or <b>lurking variable</b> influences both things you compare, making them look linked."],
      ["Examples", "Ice cream sales and drowning (hot weather).<br>Shoe size and reading skill (age)."],
      ["Fix", "Randomized experiments and careful comparison of groups reduce confounding. <b>Simpson's paradox</b>: a trend in each group can reverse when the groups are combined."])));

  L27.push(mk("Reading economics: trade-offs and incentives", rc([
      ["<b>Opportunity cost</b> is...", "the value of the next best thing you give up", "the price on the tag", "money you save", "Every choice means giving up something."],
      ["You spend Saturday at the movies instead of earning $60 at work. A key opportunity cost is...", "the $60 you could have earned", "the popcorn", "the weather", "What is the best alternative you gave up?"],
      ["<b>Scarcity</b> means...", "resources are limited while wants are not", "everything is free", "prices never change", "We cannot have everything."],
      ["An <b>incentive</b> is...", "a reward or penalty that influences choices", "a type of tax form", "a law book", "People respond to benefits and costs."],
      ["A factory's pollution harms neighbors who are not part of the deal. This is a...", "negative externality", "positive externality", "subsidy", "A cost lands on someone outside the trade."],
      ["A neighbor plants a garden that everyone on the street enjoys. This is a...", "positive externality", "negative externality", "recession", "A benefit spills over to others."],
      ["<b>Marginal</b> thinking asks about...", "the effect of one more unit", "the total of everything", "the past", "Think 'at the edge'."],
      ["Why do economics texts talk about trade-offs?", "Choosing one thing usually means giving up another", "Because prices are fixed", "Because choices are free", "Resources are limited."]],
    "Think about what is given up, who pays and how people respond to rewards and costs.",
    "Example: a city builds a park on land that could hold a library. The opportunity cost of the park is the library. Now do yours."),
    S("💰", ["Think like an economist", "Economics studies choices when resources are limited."],
      ["Key ideas", "<b>Scarcity</b>: limited resources.<br><b>Opportunity cost</b>: the best alternative given up.<br><b>Incentive</b>: reward or penalty that shapes behavior.<br><b>Externality</b>: a cost or benefit to others.<br><b>Marginal</b>: one more unit."],
      ["Reading tip", "When you read an economics text, ask: What is the trade-off? Who responds to which incentive? Who pays?"])));

  L27.push(mk("Error bars and log scales", rc([
      ["On a graph, <b>error bars</b> show...", "uncertainty in a measurement", "the title", "the average only", "They give a range around a value."],
      ["Short error bars suggest the estimate is...", "more precise", "less precise", "false", "A tight range means less spread."],
      ["Two bars differ a little, but their error bars overlap a lot. The safest conclusion is...", "the difference may be due to chance", "the difference is huge", "the graph is broken", "The uncertainty is as large as the gap."],
      ["On a log scale with ticks 1, 10, 100, 1000, why are the gaps equal?", "Each step multiplies by 10", "Each step adds 10", "The ticks are random", "Compare 10 to 100 and 100 to 1000."],
      ["A scale where each step multiplies the value by the same factor is called...", "logarithmic", "linear", "random", "The name rhymes with 'algorithm'."],
      ["A straight rising line on a log-scale graph usually shows...", "steady percentage growth", "no change", "shrinking", "Growth by the same factor each step."],
      ["Why would scientists use a log scale?", "To show values that range from tiny to huge", "To hide data", "To make graphs prettier", "A normal scale would squash small values."],
      ["When reading a log-scale graph you should check...", "that equal gaps mean multiplying, not adding", "the page number", "the paper color", "It is easy to misread the steps."]],
    "Check what the bars or axis really represent before drawing conclusions.",
    "Example: on a log scale, going up one step may mean 10 times as much. A normal-looking climb can hide huge growth. Now do yours."),
    S("📈", ["Reading finer graphs", "<b>Error bars</b> show uncertainty around a value. <b>Log scales</b> use steps that multiply."],
      ["Error bars", "Long bars: less precise.<br>Big overlap between bars: the difference may be small compared with the uncertainty."],
      ["Log scales", "On a log scale, equal gaps mean the same <i>factor</i> (1, 10, 100, 1000). Always read the axis labels first."])));

  L27.push(mk("Prose rhythm and sound", rc([
      ["Hard sounds such as <i>k</i>, <i>t</i> and <i>p</i> can create a feel that is...", "sharp or harsh", "soft and flowing", "silent", "Say 'clack, crack, pick' out loud."],
      ["Soft sounds such as <i>l</i>, <i>m</i> and <i>s</i> can create a feel that is...", "smooth and soothing", "sharp and harsh", "angry", "Say 'slowly, softly, simmer' out loud."],
      ["A very short sentence after several long ones tends to...", "give strong emphasis", "bore the reader", "make no difference", "Compare a long run with a sudden stop."],
      ["Reading your draft aloud helps you notice...", "awkward rhythm and missing words", "only spelling", "nothing", "Your ear catches what your eye misses."],
      ["<b>Euphony</b> is...", "pleasant, smooth sound", "harsh sound", "silence", "The prefix <b>eu-</b> means good."],
      ["<b>Cacophony</b> is...", "harsh, jarring sound", "pleasant sound", "a type of poem", "The prefix <b>caco-</b> means bad."],
      ["Ending a sentence on an important word makes it...", "stand out", "disappear", "confusing", "The end is a strong position."],
      ["A writer wants a calm, sleepy scene. Which style fits best?", "long, flowing sentences with soft sounds", "short, harsh bursts", "all questions", "Match the sound to the mood."]],
    "Think about how a sentence sounds when read aloud: its length, its sounds and its ending.",
    "Example: 'The tired river slipped slowly south' feels smooth. 'Crack! Rocks tumbled, clattered and split' feels sharp. Now do yours."),
    S("🎶", ["The music of prose", "Prose has rhythm and sound, too. Writers choose them on purpose."],
      ["Tools", "<b>Euphony</b>: smooth, pleasant sounds.<br><b>Cacophony</b>: harsh, jarring sounds.<br>Short sentences hit hard; long ones flow.<br>End on the important word."],
      ["Test", "Read your writing aloud. Does the sound match the mood? Fix what trips your tongue."])));

  L27.push(mk("Annotated bibliography entries", () => {
    const r = pick([
      ["The author, a professor of history, draws on letters from 1850 to 1870.", "evaluation (how reliable)"],
      ["The article explains how coastal towns respond to rising seas and offers three case studies.", "summary (what it says)"],
      ["This chapter will help my paper by supplying data on rainfall in the 1990s.", "reflection (how it will be used)"],
      ["The sample of 40 interviews is small, which limits what we can conclude.", "evaluation (how reliable)"],
      ["The book argues that early schools helped shape local identity.", "summary (what it says)"],
      ["I plan to use this survey to compare my town with national averages.", "reflection (how it will be used)"],
      ["The report is published by a research center and reviewed by independent experts.", "evaluation (how reliable)"],
      ["The study follows 200 students over four years and tracks their test scores.", "summary (what it says)"]]);
    const cats = ["summary (what it says)", "evaluation (how reliable)", "reflection (how it will be used)"];
    return { text: "An annotation has three jobs. Which job does this sentence do?<br><i>'" + r[0] + "'</i>", choices: shuf(cats), answer: r[1],
      hints: ["Ask whether the sentence tells what the source says, judges how trustworthy it is, or says how you will use it.", "Summary: content. Evaluation: strengths and limits. Reflection: how it fits your own project.", "Example: 'The article reports a rise in sea level' (summary). 'It relies on one tide gauge' (evaluation). 'I will use it for my intro' (reflection). Now do yours."] };
  }, S("🗂️", ["A list with notes", "An <b>annotated bibliography</b> lists sources and adds a short note, an <b>annotation</b>, for each."],
      ["Three jobs", "<b>Summary</b>: what the source says.<br><b>Evaluation</b>: its strengths and weaknesses.<br><b>Reflection</b>: how it will help your project."],
      ["Format", "Entries are usually alphabetical by author, each with a full citation followed by the annotation (about 100 to 200 words)."])));

  L27.push(MIX("Mixed practice", L27[0], L27[2], L27[4], L27[5], L27[8], L27[10], L27[12], L27[14], L27[16]));
  L27.push(MIX("Level 27 Challenge", L27[1], L27[3], L27[6], L27[7], L27[9], L27[11], L27[13], L27[15], L27[17]));

  Object.assign(READING_LEVELS, { 25: L25, 26: L26, 27: L27 });
})();
