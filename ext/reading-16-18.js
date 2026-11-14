// Mind Lab Reading, levels 16-18 (7th grade second half, 8th grade). 20 lessons each.
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
  const oq = (qtext, rows, hs) => rq(rows.map(r => [qtext, r[0], r[1], r[2]]), hs);
  const pq = (rows, hs) => rq(rows.map(r => [`<i>${r[0]}</i><br><br>${r[1]}`, r[2], r[3], r[4]]), hs);
  const ROOTH = (ex) => ["Think of another word that uses the same root. What idea do all those words share?", "Split the word into prefix + root + ending. The root gives the core idea and the prefix adds direction. Guess the core idea from words you already know.", ex + " Now do yours."];
  const L16 = [], L17 = [], L18 = [];

  // ================= LEVEL 16 =================
  L16.push(mk("Latin roots: ven, cede, pend, sequ, duc", rq([
      ["The Latin root <b>ven/vent</b> is in <i>prevent</i>, <i>event</i> and <i>adventure</i>. What does it mean?", "come", "hang", "follow"],
      ["The Latin root <b>cede/ceed/cess</b> is in <i>precede</i>, <i>proceed</i> and <i>recede</i>. What does it mean?", "go", "hang", "lead"],
      ["The Latin root <b>pend</b> is in <i>pendulum</i>, <i>suspend</i> and <i>pendant</i>. What does it mean?", "hang", "come", "go"],
      ["The Latin root <b>sequ/secu</b> is in <i>sequence</i>, <i>sequel</i> and <i>consecutive</i>. What does it mean?", "follow", "lead", "hang"],
      ["The Latin root <b>duc/duct</b> is in <i>produce</i>, <i>conduct</i> and <i>introduce</i>. What does it mean?", "lead", "follow", "come"],
      ["Which word means 'a series of things that follow one another'?", "sequence", "pendulum", "invention"],
      ["A <i>pendulum</i> is a weight that...", "hangs and swings", "leads a parade", "follows a path"],
      ["To <i>conduct</i> an orchestra is to...", "lead it", "follow it", "hang it up"],
      ["A <i>sequel</i> is a story that...", "follows an earlier story", "hangs on a wall", "leads a team"],
      ["To <i>precede</i> something is to...", "go before it", "come after it", "hang over it"],
      ["To <i>intervene</i> in an argument is to...", "come between the people", "go behind them", "hang back"],
      ["To <i>suspend</i> a lamp from the ceiling is to...", "hang it", "lead it", "follow it"],
      ["A <i>convention</i> is a big meeting where people...", "come together", "hang decorations", "walk behind each other"]],
    ROOTH("Example: <b>port</b> is in <i>import</i>, <i>export</i> and <i>portable</i>. Each word is about carrying, so <b>port</b> means 'carry'.")),
    S("🧩", ["Roots do the heavy lifting", "Many big words are built on <b>Latin roots</b>. A root carries the main idea."],
      ["Five roots", "<b>ven/vent</b> = come (<b>ven</b>ture)<br><b>cede/ceed</b> = go (pre<b>cede</b>)<br><b>pend</b> = hang (<b>pend</b>ulum)<br><b>sequ</b> = follow (<b>sequ</b>el)<br><b>duc/duct</b> = lead (con<b>duct</b>)"],
      ["Use them", "Spot the root, then guess. <i>inter</i> (between) + <i>ven</i> (come) = <i>intervene</i>, to come between."])));

  L16.push(mk("Greek roots: chron, hydr, arch, gen, crypt", rq([
      ["The Greek root <b>chron</b> is in <i>chronological</i> and <i>synchronize</i>. What does it mean?", "time", "water", "rule"],
      ["The Greek root <b>hydr</b> is in <i>hydrant</i> and <i>dehydrate</i>. What does it mean?", "water", "time", "hidden"],
      ["The Greek root <b>arch</b> is in <i>monarch</i> and <i>anarchy</i>. What does it mean?", "rule", "water", "birth"],
      ["The Greek root <b>gen</b> is in <i>generation</i> and <i>genesis</i>. What does it mean?", "birth or kind", "time", "hidden"],
      ["The Greek root <b>crypt</b> is in <i>cryptic</i> and <i>encrypt</i>. What does it mean?", "hidden", "rule", "water"],
      ["A <i>chronological</i> list is arranged...", "in time order", "alphabetically", "by size"],
      ["To <i>dehydrate</i> something is to...", "take the water out", "add time to it", "hide it"],
      ["A <i>monarch</i> is a...", "single ruler", "water spirit", "time keeper"],
      ["A <i>cryptic</i> message is...", "hard to understand, as if hidden", "easy to read", "very long"],
      ["A <i>chronic</i> illness is one that...", "lasts a long time", "starts suddenly", "is very small"],
      ["To <i>synchronize</i> two watches is to make them...", "show the same time", "hold water", "rule together"],
      ["A <i>generation</i> is a group of people born around the same...", "time", "place", "rule"],
      ["The <i>hydrant</i> on a street corner gives firefighters...", "water", "time", "rules"]],
    ROOTH("Example: <b>photo</b> is in <i>photograph</i> and <i>photosynthesis</i>. Both involve light, so <b>photo</b> means 'light'.")),
    S("🏛️", ["Greek roots", "Science and history words are full of <b>Greek roots</b>. Learn the root and you can decode new words."],
      ["Five roots", "<b>chron</b> = time (<b>chron</b>ology)<br><b>hydr</b> = water (<b>hydr</b>ant)<br><b>arch</b> = rule or chief (mon<b>arch</b>)<br><b>gen</b> = birth, kind (<b>gen</b>eration)<br><b>crypt</b> = hidden (<b>crypt</b>ic)"],
      ["Use them", "<i>an</i> means 'without', so <i>anarchy</i> = 'without a ruler'. <i>De</i> means 'remove', so <i>dehydrate</i> = 'remove water'."])));

  const EP = [["sandwich", "the Earl of Sandwich, an English nobleman"], ["diesel engine", "Rudolf Diesel, a German engineer"], ["saxophone", "Adolphe Sax, an instrument maker"], ["pasteurize", "Louis Pasteur, a French scientist"], ["volt", "Alessandro Volta, an Italian scientist"], ["boycott", "Charles Boycott, a land agent in Ireland"], ["cardigan", "the Earl of Cardigan, a British officer"], ["braille", "Louis Braille, a French teacher who made a reading system"]];
  const epMake = () => {
    const r = pick(EP);
    const hs = ["Many words are 'eponyms': they are named after a real person. Which person matches the word's story?", "Think about what each person did or made (an invention, a science idea, a food). Match the job to the word.", "Example: the <b>Ferris wheel</b> is named for engineer George Ferris, who built the first one. Now do yours."];
    const k = ri(1, 7);
    if (k === 1) {
      const defs = ["comes from a person's name", "imitates a sound", "is the opposite of another word", "is spelled the same backward"];
      return { text: "An <b>eponym</b> is a word that...", choices: shuf(defs.slice(0, 3)), answer: defs[0], hints: ["Look at the first part of the word: it comes from Greek for 'upon' or 'named after'.", "Think of words like <i>sandwich</i> or <i>boycott</i>. What do they have in common?", "Example: the unit <i>watt</i> is named for the inventor James Watt, so <i>watt</i> is an eponym. Now do yours."] };
    }
    if (k <= 4) return { visual: "🏷️", text: "The word <b>" + r[0] + "</b> is named after...", choices: shuf([r[1]].concat(rest(EP.map(e => e[1]), r[1], 2))), answer: r[1], hints: hs };
    return { visual: "🏷️", text: "Which word is named after " + r[1] + "?", choices: shuf([r[0]].concat(rest(EP.map(e => e[0]), r[0], 2))), answer: r[0], hints: hs };
  };
  L16.push(mk("Eponyms: words from people's names", epMake,
    S("🏷️", ["Words named after people", "An <b>eponym</b> is a word that comes from a real person's name."],
      ["Examples", "<b>sandwich</b>: the Earl of Sandwich<br><b>pasteurize</b>: Louis Pasteur<br><b>saxophone</b>: Adolphe Sax<br><b>boycott</b>: Charles Boycott<br><b>volt</b>: Alessandro Volta"],
      ["Spot them", "Inventors, scientists and nobles often get words. Ask: could a person have made or done this?"])));

  L16.push(mk("Who or whom?", rq([
      ["The girl ___ won the race is my neighbor.", "who", "whom"], ["To ___ should I send the card?", "whom", "who"], ["___ left the door open?", "Who", "Whom"],
      ["He is the actor ___ everyone admires.", "whom", "who"], ["With ___ did you walk to school?", "whom", "who"], ["Do you know ___ wrote this poem?", "who", "whom"],
      ["The coach ___ we trusted gave a speech.", "whom", "who"], ["___ will you invite to the party?", "Whom", "Who"], ["Give the prize to ___ earns it.", "whoever", "whomever"],
      ["I will help ___ needs it most.", "whoever", "whomever"], ["She asked ___ I was waiting for.", "whom", "who"], ["The woman ___ lives next door is a pilot.", "who", "whom"]],
    ["Try the swap test: put <i>he</i> or <i>him</i> in the blank. Which one sounds right?", "If <i>he</i> fits, you need the subject form. If <i>him</i> fits, you need the object form. Remember: <i>him</i> and <i>whom</i> both end in <b>m</b>.", "Example: 'The man ___ I met was kind.' We say 'I met <i>him</i>', not 'I met he', so the <i>m</i> word is needed. Now do yours."]),
    S("❓", ["Two forms", "<b>Who</b> is a subject: it does the action. <b>Whom</b> is an object: the action happens to it or it follows a preposition."],
      ["The swap test", "Replace with <b>he</b> or <b>him</b>.<br>'___ called?' → <i>He</i> called. → <b>Who</b><br>'To ___ did you speak?' → to <i>him</i>. → <b>Whom</b>"],
      ["-ever words", "<b>Whoever</b> is a subject; <b>whomever</b> is an object. Look at the job the word does in <i>its own</i> part of the sentence."])));

  L16.push(mk("Direct and indirect objects", rq([
      ["Find the direct object: 'Mia threw the ball.'", "the ball", "Mia", "threw"],
      ["Find the direct object: 'The chef baked a cake.'", "a cake", "The chef", "baked"],
      ["Find the indirect object: 'Dad gave Sam a book.'", "Sam", "a book", "Dad"],
      ["Find the indirect object: 'Ms. Kim handed the students their tests.'", "the students", "their tests", "Ms. Kim"],
      ["Find the direct object: 'She sent her cousin a postcard.'", "a postcard", "her cousin", "She"],
      ["Find the direct object: 'We painted the fence.'", "the fence", "We", "painted"],
      ["A direct object answers the question...", "'what?' or 'whom?' after the action verb", "'when?' after the verb", "'where?' after the verb"],
      ["An indirect object tells...", "to whom or for whom the action is done", "when the action happens", "how the action is done"],
      ["Find the indirect object: 'The coach tossed Ravi the whistle.'", "Ravi", "the whistle", "The coach"],
      ["Which sentence has an indirect object?", "Grandma knitted me a scarf.", "Grandma knitted a scarf.", "Grandma knitted slowly."],
      ["Find the direct object: 'The wind knocked down the old fence.'", "the old fence", "The wind", "down"]],
    ["Find the action verb first. Then ask: verb + <i>what?</i> or verb + <i>whom?</i>", "The direct object receives the action. The indirect object comes before it and tells who got it or who it was for: you could move it after the direct object and add <i>to</i> or <i>for</i>.", "Example: 'Tom lent Jo his pen.' Lent what? <i>his pen</i> (direct). Lent it to whom? <i>Jo</i> (indirect). Now do yours."]),
    S("🎯", ["Who gets the action?", "Some verbs pass their action to a noun. That noun is the <b>direct object</b>."],
      ["Direct object", "'Ana kicked the ball.' Kicked what? <b>the ball</b>."],
      ["Indirect object", "'Ana gave Ben the ball.' Gave it to whom? <b>Ben</b> is the indirect object. It sits between the verb and the direct object."])));

  L16.push(mk("Linking verbs and predicate words", rq([
      ["Which word is the linking verb? 'The soup smells delicious.'", "smells", "soup", "delicious"],
      ["'Mr. Ortiz is a pilot.' What is 'a pilot'?", "a predicate nominative (renames the subject)", "a predicate adjective", "a direct object"],
      ["'The sky grew dark.' What is 'dark'?", "a predicate adjective (describes the subject)", "a predicate nominative", "a direct object"],
      ["Which verb is a linking verb?", "seem", "jump", "build"],
      ["Which sentence uses a linking verb?", "The pie tastes sweet.", "The cook tasted the soup.", "The dog ate the pie."],
      ["'Her brother became a doctor.' What is 'a doctor'?", "a predicate nominative (renames the subject)", "a predicate adjective", "an indirect object"],
      ["'The twins felt nervous.' What is 'nervous'?", "a predicate adjective (describes the subject)", "a predicate nominative", "a direct object"],
      ["Linking verbs connect the subject to...", "a word that renames or describes it", "an object that receives action", "a time or place only"],
      ["In 'Lena grew tomatoes,' the verb <i>grew</i> is...", "an action verb", "a linking verb", "a helping verb"],
      ["In 'The milk turned sour,' the verb <i>turned</i> is...", "a linking verb", "an action verb", "a helping verb"]],
    ["Try swapping the verb with <i>is</i> or <i>was</i>. Does the sentence still make sense?", "A linking verb works like an equal sign. It joins the subject to a word that renames it (a noun) or describes it (an adjective).", "Example: 'The room became quiet.' Swap in <i>was</i>: 'The room was quiet' works, so <i>became</i> is linking and <i>quiet</i> describes <i>room</i>. Now do yours."]),
    S("🔗", ["Linking verbs", "Most verbs show action. A <b>linking verb</b> does not. It links the subject to more information about it."],
      ["Common ones", "<b>is, am, are, was, were, be, become, seem, feel, look, smell, taste, grow, turn</b><br>Some, like <i>taste</i> or <i>grow</i>, can be action or linking."],
      ["Predicate words", "'Sam <b>is</b> a <u>drummer</u>.' (renames Sam: nominative)<br>'Sam <b>seems</b> <u>happy</u>.' (describes Sam: adjective)"])));

  L16.push(mk("Kinds of pronouns", rq([
      ["In 'This is my favorite song,' the word <i>this</i> is a...", "demonstrative pronoun", "relative pronoun", "indefinite pronoun"],
      ["In 'Everyone cheered,' the word <i>everyone</i> is a...", "indefinite pronoun", "demonstrative pronoun", "interrogative pronoun"],
      ["In 'The girl who won smiled,' the word <i>who</i> is a...", "relative pronoun", "interrogative pronoun", "demonstrative pronoun"],
      ["In 'Which do you want?' the word <i>which</i> is an...", "interrogative pronoun", "relative pronoun", "indefinite pronoun"],
      ["In 'Those are mine,' the word <i>those</i> is a...", "demonstrative pronoun", "indefinite pronoun", "relative pronoun"],
      ["In 'Someone left a note,' the word <i>someone</i> is an...", "indefinite pronoun", "interrogative pronoun", "relative pronoun"],
      ["In 'The book that I read was long,' the word <i>that</i> is a...", "relative pronoun", "demonstrative pronoun", "interrogative pronoun"],
      ["In 'Whose coat is this?' the word <i>whose</i> is an...", "interrogative pronoun", "relative pronoun", "demonstrative pronoun"],
      ["Which word is a demonstrative pronoun?", "these", "any", "whom"],
      ["Which group has only indefinite pronouns?", "some, many, few", "who, whom, whose", "this, that, these"]],
    ["Ask what job the pronoun does in its sentence.", "There are four jobs here: pointing out something, asking a question, joining a clause to a noun, or standing for people or things that are not named.", "Example: 'Nobody knew the answer.' <i>Nobody</i> does not name anyone in particular. Now do yours."]),
    S("👉", ["More pronoun types", "Pronouns do more than replace names. They come in <b>kinds</b>."],
      ["Four kinds", "<b>Demonstrative</b>: this, that, these, those<br><b>Interrogative</b>: who, whom, whose, which, what (questions)<br><b>Relative</b>: who, which, that (join clauses)<br><b>Indefinite</b>: everyone, someone, nobody, all, many"],
      ["Same word, two jobs", "'Who is there?' (<i>who</i> asks a question.)<br>'The man who called left.' (<i>who</i> joins a clause to <i>man</i>.)"])));

  L16.push(mk("Formal letters and emails", rq([
      ["Which greeting fits a letter to a principal you don't know well?", "Dear Principal Jones,", "Hey Jones,", "Yo!"],
      ["Which closing is formal?", "Sincerely,", "Later!", "See ya"],
      ["In a formal letter, the 'body' is...", "the main message", "the date", "the signature"],
      ["Which email subject line is clearest?", "Request for library tour on May 3", "Hi", "Question!!!"],
      ["Which opening sentence states the purpose?", "I am writing to ask whether our class may visit the museum.", "How are you? I am fine.", "Hello hello hello."],
      ["Which line is polite and formal?", "Thank you for your time and consideration.", "Thx, bye.", "Whatever you decide."],
      ["Where does the date go in a block-style letter?", "at the top", "after the signature", "in the middle of the body"],
      ["Which sentence is more formal?", "I would appreciate a reply by Friday.", "Write back by Friday or else.", "Reply asap pls."],
      ["What should you avoid in a formal email?", "emoji and slang", "a greeting", "a clear subject line"],
      ["Which closing goes right above your typed name?", "Respectfully,", "Okay then", "The end"]],
    ["Think about who will read it. A teacher, a mayor or a company expects respect and clarity.", "Formal writing uses a title in the greeting, complete sentences, polite words and a proper closing. Slang, emoji and rushing belong to messages between friends.", "Example: To a librarian, 'Dear Ms. Patel,' beats 'Hey!' because it shows respect. Now do yours."]),
    S("✉️", ["Formal writing", "A <b>formal letter or email</b> is for someone you do not know well, like a principal, a mayor or a company."],
      ["Parts", "<b>Date</b> (top) · <b>Greeting</b> (Dear Mr. Lee,) · <b>Body</b> (your purpose, details) · <b>Closing</b> (Sincerely,) · <b>Name</b>"],
      ["Tone and tips", "Say why you are writing in the first sentence. Use polite words, full sentences and a clear subject line for email. No slang or emoji."])));

  L16.push(mk("Main plot and subplots", rq([
      ["A <b>subplot</b> is...", "a smaller story that runs alongside the main plot", "the final scene", "the author's summary"],
      ["Kai is trying to win the school robot contest. His little sister is teaching their dog a trick. Which is the subplot?", "his sister teaching the dog a trick", "Kai's robot contest", "Kai's school"],
      ["A knight quests to find a lost crown. Along the way, the knight's friend learns to read. Which is the subplot?", "the friend learning to read", "the search for the crown", "the knight's armor"],
      ["A play follows a family's move to a new town. A side story shows a neighbor trying to win a baking contest. The main plot is...", "the family's move", "the baking contest", "the neighbor's recipe"],
      ["Why do authors add subplots?", "To add depth, show more characters and support the theme", "To confuse readers on purpose", "To make the story shorter"],
      ["Subplots often...", "connect to or affect the main plot", "never involve the main characters", "have nothing to do with the theme"],
      ["A team is chasing the championship. One player is also worried about a hurt friend. The hurt friend is the...", "subplot", "main plot", "setting"],
      ["The sister's dog helps Kai fix his robot in the end. This shows that subplots can...", "come together with the main plot", "never touch the main plot", "be cut out without any change"],
      ["The <b>main plot</b> is...", "the central series of events that drives the story", "a side story", "the story's title"]],
    ["Ask: which storyline would you retell first if someone asked what the story is about?", "The main plot is the central problem. A subplot is a smaller storyline that runs alongside it, often about a different character or a related problem.", "Example: In a story about a girl entering a spelling bee, her brother also tries to win a pie-eating prize. The brother's tale is a side story. Now do yours."]),
    S("🧵", ["Two storylines", "Most long stories weave a <b>main plot</b> with one or more <b>subplots</b>."],
      ["Main vs sub", "The <b>main plot</b> is the big problem the story is about. A <b>subplot</b> is a smaller storyline running beside it."],
      ["Why use them?", "Subplots add depth and surprise. They often echo the theme or crash into the main plot at the end."])));

  L16.push(mk("Mystery clues and red herrings", rq([
      ["A <b>red herring</b> is...", "a false clue that leads readers the wrong way", "the answer to the mystery", "the detective's name"],
      ["A <b>clue</b> is...", "a detail that helps solve the mystery", "a detail with no purpose", "the final solution"],
      ["A pie vanished from a windowsill. (1) Small paw prints are on the sill. (2) Aunt Lee wore a red scarf. (3) Crumbs lead to the dog's bed. Which is probably a red herring?", "Aunt Lee wore a red scarf.", "Small paw prints are on the sill.", "Crumbs lead to the dog's bed."],
      ["A bike is missing. (1) A chain lock was cut. (2) Bolt cutters lie in the bushes. (3) It rained on Monday. Which is probably a red herring?", "It rained on Monday.", "A chain lock was cut.", "Bolt cutters lie in the bushes."],
      ["A window was smashed. (1) Glass is on the inside floor. (2) A baseball is under the couch. (3) The cat sleeps in the sun. Which is probably a red herring?", "The cat sleeps in the sun.", "A baseball is under the couch.", "Glass is on the inside floor."],
      ["A cake is missing. (1) Frosting is on Leo's sleeve. (2) A fork sits on the floor. (3) The radio plays a song. Which is probably a red herring?", "The radio plays a song.", "Frosting is on Leo's sleeve.", "A fork sits on the floor."],
      ["Why do mystery writers use red herrings?", "To keep readers guessing", "To give away the ending", "To make the story shorter"],
      ["In a good mystery, the real clues are usually...", "placed fairly so readers can follow them", "kept secret until the last line", "never mentioned at all"]],
    ["Ask which detail would actually help solve the puzzle and which one only looks important.", "A clue connects to what really happened. A red herring seems important but has no real link, or it points away from the truth.", "Example: 'The door was forced from outside. Mud was on the hall floor. The clock ticked loudly.' The mud helps. The clock is a distraction. Now do yours."]),
    S("🔍", ["Solving mysteries", "A mystery gives <b>clues</b>. Readers try to work out what happened before the ending."],
      ["Clues vs red herrings", "A <b>clue</b> points toward the truth. A <b>red herring</b> is a false trail that looks important but leads nowhere."],
      ["How to read one", "Collect each detail, then ask: does this connect to the crime or problem? If not, it may be a red herring."])));

  L16.push(mk("Epics, ballads, odes and elegies", rq([
      ["A long poem that tells the adventures of a hero is an...", "epic", "ode", "limerick"],
      ["A poem that praises a person, a thing or an idea is an...", "ode", "epic", "limerick"],
      ["A poem that mourns someone who has died is an...", "elegy", "ode", "limerick"],
      ["A song-like poem that tells a story, often in four-line stanzas, is a...", "ballad", "ode", "elegy"],
      ["<i>The Odyssey</i> is an ancient Greek epic. What is it mostly about?", "a hero's long journey home", "a farmer's harvest", "a sailor who never leaves port"],
      ["Which is most likely an epic?", "a very long poem about a hero's quest across the seas", "a four-line poem about a cat", "a short thank-you note"],
      ["Which is most likely an ode?", "'Ode to My Old Bike,' a poem full of praise for the bike", "a news report about a flood", "a recipe for soup"],
      ["Which feature is common in ballads?", "a story with repeated lines (a refrain)", "no story at all", "a list of rules"],
      ["Which is a funny five-line poem with an AABBA rhyme pattern?", "limerick", "elegy", "epic"],
      ["The poem 'In Memory of a Dear Old Dog' is a quiet poem of sadness and love. It is closest to an...", "elegy", "epic", "ode"]],
    ["Ask what the poem is doing: telling a story, honoring something, or expressing sadness after a loss?", "Match the job of the poem to its type. Some poems tell a story (long or short), some praise, and some mourn.", "Example: A forty-page poem about a brave sailor's voyage is huge and about a hero, so it is that big story type. Now do yours."]),
    S("📜", ["Kinds of poems", "Poems come in <b>types</b>. Each type has a purpose."],
      ["Four types", "<b>Epic</b>: a long poem about a hero's adventures.<br><b>Ballad</b>: a song-like story poem.<br><b>Ode</b>: a poem of praise.<br><b>Elegy</b>: a poem of sorrow for someone who died."],
      ["Fun one", "A <b>limerick</b> has five funny lines that rhyme AABBA."])));

  L16.push(mk("Assumptions in an argument", rq([
      ["'It is raining, so the game will be canceled.' What is assumed?", "Games are canceled in the rain.", "Rain is wet.", "The team is good."],
      ["'Mia studied all week, so she will ace the test.' What is assumed?", "Studying leads to a good score.", "Mia is tall.", "Tests are on Fridays."],
      ["'Our school has the best lunch menu because it serves pizza.' What is assumed?", "Pizza makes a lunch menu the best.", "Pizza is cheap.", "Other schools have no lunch."],
      ["'The bakery is packed, so the bread must be great.' What is assumed?", "Crowds mean good quality.", "Bakeries open early.", "Bread is round."],
      ["'He drives a fancy car, so he must be a great driver.' What is assumed?", "Expensive cars belong to skillful drivers.", "Cars have four wheels.", "He lives nearby."],
      ["'This game costs a lot, so it must be high quality.' What is assumed?", "Higher price means better quality.", "Games are fun.", "The game is new."],
      ["An <b>assumption</b> is...", "an idea taken for granted without being stated", "a proven fact", "the title of an essay"],
      ["Why should you check an argument's assumptions?", "They may be false and make the argument weak.", "They always prove the argument.", "They make the argument longer."]],
    ["Ask: what must be true for the reason to prove the conclusion?", "The assumption is the hidden step between the reason and the conclusion. The writer does not say it out loud.", "Example: 'Her jacket is wet, so it must be raining.' Hidden step: only rain makes jackets wet. (That might not be true!) Now do yours."]),
    S("🕵️", ["The hidden step", "Many arguments skip a step. That missing idea is an <b>assumption</b>."],
      ["Example", "'The line is long, so the movie is good.'<br>Unstated idea: <b>long lines mean good movies</b>."],
      ["Test it", "Ask: is the assumption always true? If not, the argument has a weak spot."])));

  L16.push(mk("Correlation or cause?", rq([
      ["Ice cream sales and sunburns both rise in summer. What is the best explanation?", "Hot, sunny weather affects both.", "Ice cream causes sunburn.", "Sunburn causes people to buy ice cream."],
      ["Kids with bigger feet score higher on reading tests. What is the best explanation?", "Older kids have bigger feet and more reading practice.", "Big feet make you smarter.", "Reading makes feet grow."],
      ["<b>Correlation</b> means...", "two things happen together", "one thing makes the other happen", "nothing links the two things"],
      ["<b>Causation</b> means...", "one thing makes another happen", "two things just happen together", "two things are opposites"],
      ["A rooster crows, and then the sun rises. Does the crowing cause the sunrise?", "No, the two just happen at about the same time", "Yes, the sound makes the sun rise", "Yes, the sun listens"],
      ["Which sentence shows a cause?", "Because the pipe froze, it burst.", "Pipes and winter go together.", "Many pipes are metal."],
      ["Cities with more fire trucks have more fires. What is the best explanation?", "Bigger cities have both more trucks and more fires.", "Fire trucks cause fires.", "Fires make trucks appear."],
      ["How could you best test whether a fertilizer makes plants taller?", "Grow two matching groups, one with it and one without", "Ask a neighbor what they think", "Use it and hope"]],
    ["Ask: could a third thing explain why both happen?", "Two things that happen together are <b>correlated</b>. That does not prove one <b>causes</b> the other. A fair test or a clear process is needed to prove a cause.", "Example: Umbrellas and puddles show up on the same days. Umbrellas do not make puddles. Rain explains both. Now do yours."]),
    S("🔗", ["Together is not 'because'", "Two things can rise and fall together without one causing the other."],
      ["Correlation", "<b>Correlation</b>: two things happen together.<br><b>Causation</b>: one thing really makes the other happen."],
      ["Beware", "A hidden third cause (a <i>lurking</i> cause) often explains both. Look for it before you trust 'X causes Y'."])));

  L16.push(mk("Active reading: annotate and question", rq([
      ["You reach a hard paragraph and reread it slowly. This strategy is...", "clarifying", "predicting", "summarizing"],
      ["After a chapter, you tell the main events in three sentences. This is...", "summarizing", "predicting", "connecting"],
      ["From the title, you guess what the article will say. This is...", "predicting", "summarizing", "clarifying"],
      ["You think, 'This reminds me of when I moved.' This is...", "connecting", "visualizing", "predicting"],
      ["You picture the stormy scene in your mind. This is...", "visualizing", "clarifying", "summarizing"],
      ["In the margin you write, 'Why did she lie?' This is...", "questioning", "summarizing", "visualizing"],
      ["Which is best to mark with a highlighter?", "main ideas and key facts", "every word on the page", "only the title"],
      ["A good annotation is...", "short and shows your thinking", "a copy of the whole sentence", "a drawing unrelated to the text"],
      ["Circling a word you don't know helps you...", "come back and figure out its meaning", "skip the whole page", "forget the paragraph"]],
    ["Ask what your brain is doing as you read: guessing, picturing, asking, linking, fixing confusion, or retelling?", "Active readers talk back to the text. Each habit has a name: questioning, predicting, connecting, visualizing, clarifying and summarizing.", "Example: Pausing to think 'I bet the dog will escape' is a guess about what comes next. Now do yours."]),
    S("✏️", ["Talk back to the text", "Good readers do not just read. They <b>annotate</b>: mark and note as they go."],
      ["Six habits", "<b>Question</b> · <b>Predict</b> · <b>Connect</b> · <b>Visualize</b> · <b>Clarify</b> (reread) · <b>Summarize</b>"],
      ["Marking the page", "Underline key ideas, circle new words, jot <b>?</b> for questions and <b>!</b> for surprises. Keep notes short."])));

  L16.push(mk("Motifs: repeating ideas", rq([
      ["A <b>motif</b> is...", "an image, sound or idea that repeats to support the theme", "the last line of a story", "the narrator's name"],
      ["A story shows birds in almost every chapter: caged birds, birds flying away, a nest. This motif probably connects to...", "freedom and being trapped", "farm life", "the weather forecast"],
      ["A story keeps mentioning clocks: ticking, broken, late. This motif probably connects to...", "time running out", "cooking", "friendship"],
      ["A poem repeats the image of a river: rushing, calm, frozen. Rivers may show...", "change and the passing of time", "hunger", "tall mountains"],
      ["A <b>motif</b> and a <b>symbol</b> differ because...", "a motif repeats, while a symbol can appear just once", "a motif appears only once", "they are exactly the same"],
      ["Why do authors use motifs?", "To strengthen the theme through repetition", "To fill space", "To avoid describing characters"],
      ["A red scarf appears whenever a character feels brave. The scarf is a...", "motif", "plot twist", "rhyme"],
      ["Light shows up in every hopeful scene and darkness in every fearful one. These motifs show...", "the contrast between hope and fear", "a busy city", "the author's age"]],
    ["Ask: does the image or idea show up again and again? What does it seem to stand for?", "A motif repeats. Each time it appears, it adds to the meaning or the theme.", "Example: In a story, rain falls in every sad scene. The repeating rain adds to the feeling of sorrow. Now do yours."]),
    S("🔁", ["Patterns in stories", "A <b>motif</b> is an image, sound or idea that <b>repeats</b> in a work."],
      ["Examples", "Birds that keep appearing might show <b>freedom</b>. Clocks might show <b>time running out</b>."],
      ["Motif vs symbol", "A <b>symbol</b> can stand for an idea once. A <b>motif</b> repeats and builds meaning."])));

  const VOC = [
    ["ecosystem", "living things and their environment together", "a type of rock", "a kind of machine"],
    ["hypothesis", "an idea or prediction you can test", "a proven law", "a measuring tool"],
    ["erosion", "the wearing away of rock and soil by wind or water", "the building of a new mountain", "the growth of plants"],
    ["democracy", "a government where the people vote", "a government run by one king", "a trading route"],
    ["immigrant", "a person who moves to a new country to live", "a visitor who stays a day", "a ship's captain"],
    ["peninsula", "land surrounded by water on three sides", "a lake in the desert", "a mountain top"],
    ["perimeter", "the distance around a shape", "the space inside a shape", "the corner of a shape"],
    ["habitat", "the place where an animal or plant lives", "a food chain", "a kind of weather"],
    ["treaty", "a formal agreement between countries", "a long journey", "a school test"],
    ["variable", "something that can change in an experiment", "the final answer", "a type of graph"],
    ["tributary", "a small river that flows into a larger one", "a very tall wave", "a kind of forest"],
    ["circumference", "the distance around a circle", "the middle of a circle", "half a circle"]];
  L16.push(mk("Vocabulary from science, history and math", rq(VOC.map(r => ["In school subjects, what does <b>" + r[0] + "</b> mean?", r[1], r[2], r[3]]),
      ["Does the word look like a part you know? Break it apart and think about which school subject it belongs to.", "Use the sentence or the subject as a clue. Science words often describe nature, history words describe people and governments, and math words describe numbers and shapes.", "Example: <b>glacier</b> is a science word. It is a huge, slow-moving river of ice. Now do yours."]),
    S("📚", ["Subject words", "Every school subject has its own <b>special words</b>. Knowing them makes textbooks much easier."],
      ["Examples", "<b>habitat</b> (science): where a living thing lives<br><b>treaty</b> (history): an agreement between countries<br><b>perimeter</b> (math): distance around a shape"],
      ["Tips", "Look at word parts (<i>peri</i> = around, <i>meter</i> = measure). Check bold words and glossaries."])));

  L16.push(mk("Thesis statements and introductions", rq([
      ["Which is the best thesis statement for an essay?", "Schools should start later in the morning because teens need more sleep.", "Schools start in the morning.", "This essay is about school."],
      ["Which is the best thesis statement?", "Cities should require recycling because it reduces waste.", "Recycling is a thing people do.", "I am going to write about recycling."],
      ["Which thesis can be argued?", "Video games can teach problem-solving skills.", "Video games were invented in the 1900s.", "I like video games."],
      ["Which sentence only announces a topic and is NOT a strong thesis?", "In this essay I will talk about libraries.", "Libraries remain vital because they offer free learning for everyone.", "Public libraries deserve more funding."],
      ["Where does a thesis usually go?", "at the end of the introduction", "in the middle of the last paragraph", "in the title only"],
      ["A good conclusion should...", "restate the main idea in a fresh way and leave the reader thinking", "bring in brand-new evidence", "apologize for the essay"],
      ["Which is the strongest hook for an essay about space?", "Did you know a day on Venus lasts longer than its year?", "Space is big.", "I will now write about space."],
      ["Which thesis takes a clear position?", "Zoos should focus on protecting animals, not just displaying them.", "Zoos exist in many cities.", "Zoos have animals."]],
    ["A thesis is the main point of the whole essay. Can someone agree or disagree with it?", "A strong thesis takes a position and often gives a reason. It is not just a topic, a plain fact or an announcement like 'I will write about...'.", "Example: Topic: homework. Weak: 'Homework is given at school.' Strong: 'Teachers should assign less homework so students can rest.' Now do yours."]),
    S("🏛️", ["The main point", "A <b>thesis statement</b> is one sentence that tells the reader your main point."],
      ["Strong vs weak", "Weak: 'Pets are popular.' (a fact)<br>Weak: 'I will write about pets.' (an announcement)<br>Strong: 'Every family should consider adopting a shelter pet.'"],
      ["Introductions and endings", "An introduction has a <b>hook</b>, background and the thesis. A conclusion restates the thesis in new words and leaves a final thought."])));

  L16.push(mk("Stanzas and meter", rq([
      ["A stanza with 2 lines is a...", "couplet", "tercet", "quatrain"],
      ["A stanza with 3 lines is a...", "tercet", "couplet", "quatrain"],
      ["A stanza with 4 lines is a...", "quatrain", "couplet", "tercet"],
      ["What is <b>meter</b> in a poem?", "the pattern of stressed and unstressed syllables", "the rhymes at the end of lines", "the number of poems in a book"],
      ["A foot with an unstressed syllable followed by a stressed one (da-DUM) is an...", "iamb", "trochee", "couplet"],
      ["A foot with a stressed syllable followed by an unstressed one (DUM-da) is a...", "trochee", "iamb", "quatrain"],
      ["Which word follows an iamb pattern (da-DUM)?", "today", "monkey", "garden"],
      ["Which word follows a trochee pattern (DUM-da)?", "monkey", "today", "behind"],
      ["Iambic pentameter has how many iambs in a line?", "five", "four", "ten"],
      ["What is <b>free verse</b>?", "poetry with no regular rhyme or meter", "poetry with five beats per line", "poetry only about nature"],
      ["Which word follows an iamb pattern (da-DUM)?", "repeat", "winter", "happy"]],
    ["Count carefully, or tap out the beat as you say the words aloud.", "Poets name their patterns with word parts and beats. Say the word naturally and notice which syllable you push harder.", "Example: a stanza of five lines is a cinquain (<i>cinq</i> is French for five). Say 'again' aloud: a-GAIN, soft then loud. Now do yours."]),
    S("🎼", ["Poem music", "Poems have <b>stanzas</b> (groups of lines) and <b>meter</b> (a beat pattern)."],
      ["Stanza names", "<b>Couplet</b>: 2 lines<br><b>Tercet</b>: 3 lines<br><b>Quatrain</b>: 4 lines"],
      ["Beats", "An <b>iamb</b> is da-DUM (re-PEAT). A <b>trochee</b> is DUM-da (WIN-ter). <b>Pentameter</b> means five feet in a line."])));

  L16.push(MIX("Mixed practice", L16[0], L16[3], L16[5], L16[8], L16[11], L16[14]));
  L16.push(MIX("Level 16 Challenge", L16[1], L16[2], L16[4], L16[6], L16[9], L16[10], L16[12], L16[16], L16[17]));

  // ================= LEVEL 17 =================
  L17.push(mk("Latin roots: voc, cept, fer, mot, liber", rq([
      ["The Latin root <b>voc/vok</b> is in <i>vocal</i>, <i>advocate</i> and <i>invoke</i>. What does it mean?", "voice or call", "take", "free"],
      ["The Latin root <b>cept/cap</b> is in <i>capture</i>, <i>accept</i> and <i>receive</i>. What does it mean?", "take", "carry", "move"],
      ["The Latin root <b>fer</b> is in <i>transfer</i>, <i>refer</i> and <i>ferry</i>. What does it mean?", "carry", "call", "free"],
      ["The Latin root <b>mot/mov</b> is in <i>motion</i>, <i>remove</i> and <i>motor</i>. What does it mean?", "move", "take", "voice"],
      ["The Latin root <b>liber</b> is in <i>liberty</i> and <i>liberate</i>. What does it mean?", "free", "carry", "move"],
      ["To <i>transfer</i> money is to...", "carry it from one place to another", "call it by name", "set it free"],
      ["A <i>vocal</i> singer is one who uses a...", "voice", "map", "hammer"],
      ["To <i>capture</i> a butterfly is to...", "take hold of it", "set it free", "call it"],
      ["To <i>liberate</i> a town is to...", "set it free", "move it", "carry it"],
      ["A <i>motor</i> is a machine that makes things...", "move", "call out", "stay still"],
      ["To <i>accept</i> a gift is to...", "take it", "carry it away", "call it"],
      ["To <i>remove</i> a stain is to...", "move it away", "take it back", "set it free"]],
    ROOTH("Example: <b>phon</b> is in <i>telephone</i>, <i>microphone</i> and <i>symphony</i>. All are about sound, so <b>phon</b> means 'sound'.")),
    S("🧩", ["More Latin roots", "Knowing roots lets you decode words you have never seen."],
      ["Five roots", "<b>voc/vok</b> = voice, call (<b>voc</b>al)<br><b>cept/cap</b> = take (<b>cap</b>ture)<br><b>fer</b> = carry (trans<b>fer</b>)<br><b>mot/mov</b> = move (<b>mot</b>or)<br><b>liber</b> = free (<b>liber</b>ty)"],
      ["Use them", "<i>ad</i> (to) + <i>voc</i> (call) = <i>advocate</i>, a person who calls out for someone's cause."])));

  L17.push(mk("Greek roots: onym, pseudo, morph, therm, cycl", rq([
      ["The Greek root <b>onym</b> is in <i>synonym</i> and <i>anonymous</i>. What does it mean?", "name", "shape", "heat"],
      ["The Greek root <b>pseudo</b> is in <i>pseudonym</i> and <i>pseudoscience</i>. What does it mean?", "false", "circle", "name"],
      ["The Greek root <b>morph</b> is in <i>metamorphosis</i> and <i>morph</i>. What does it mean?", "shape or form", "heat", "false"],
      ["The Greek root <b>therm</b> is in <i>thermometer</i> and <i>thermal</i>. What does it mean?", "heat", "circle", "shape"],
      ["The Greek root <b>cycl</b> is in <i>bicycle</i> and <i>cyclone</i>. What does it mean?", "circle", "heat", "name"],
      ["A <i>pseudonym</i> is a...", "false name, such as a pen name", "kind of thermometer", "type of storm"],
      ["Someone who is <i>anonymous</i> is...", "without a name", "very hot", "shaped like a circle"],
      ["A <i>thermometer</i> measures...", "temperature", "circles", "names"],
      ["A caterpillar's <i>metamorphosis</i> into a butterfly is a change of...", "form", "name", "heat"],
      ["A <i>cyclone</i> is a storm that...", "spins in a circle", "stays cold", "has no name"],
      ["A <i>synonym</i> is a word that has the same...", "meaning as another word", "shape as another word", "heat as another word"],
      ["A <i>thermal</i> jacket is made to keep you...", "warm", "round", "hidden"]],
    ROOTH("Example: <b>scope</b> is in <i>microscope</i> and <i>telescope</i>. Both are tools for viewing, so <b>scope</b> means 'look at'.")),
    S("🏛️", ["Greek roots", "Science and everyday words borrow from <b>Greek</b>."],
      ["Five roots", "<b>onym</b> = name (syn<b>onym</b>)<br><b>pseudo</b> = false (<b>pseudo</b>nym)<br><b>morph</b> = shape (meta<b>morph</b>osis)<br><b>therm</b> = heat (<b>therm</b>ometer)<br><b>cycl</b> = circle (bi<b>cycl</b>e)"],
      ["Use them", "<i>anti</i> (against) + <i>onym</i> (name) = <i>antonym</i>, a word with the opposite meaning."])));

  const BL = [["brunch", "breakfast", "lunch"], ["smog", "smoke", "fog"], ["motel", "motor", "hotel"], ["spork", "spoon", "fork"], ["emoticon", "emotion", "icon"], ["chortle", "chuckle", "snort"], ["infomercial", "information", "commercial"], ["webinar", "web", "seminar"]];
  const CL = [["gym", "gymnasium"], ["phone", "telephone"], ["exam", "examination"], ["fridge", "refrigerator"], ["bike", "bicycle"], ["photo", "photograph"], ["lab", "laboratory"], ["flu", "influenza"]];
  const blMake = () => {
    const hs = ["A <b>blend</b> glues pieces of two words together. A <b>clipped word</b> chops a long word shorter.", "Say the new word slowly and listen for the beginning of one word and the end of another. For a short word, ask which long word it could be chopped from.", "Example: <i>Chunnel</i> is <i>channel</i> + <i>tunnel</i> (a blend). <i>Ad</i> is <i>advertisement</i> cut short (a clipped word). Now do yours."];
    const k = ri(1, 4);
    if (k === 1) { const r = pick(BL); return { text: "Which two words make up the blend <b>" + r[0] + "</b>?", choices: shuf([r[1] + " + " + r[2]].concat(rest(BL, r, 2).map(x => x[1] + " + " + x[2]))), answer: r[1] + " + " + r[2], hints: hs }; }
    if (k === 2) { const r = pick(BL); return { text: "Which word is a blend of <i>" + r[1] + "</i> and <i>" + r[2] + "</i>?", choices: shuf([r[0]].concat(rest(BL, r, 2).map(x => x[0]))), answer: r[0], hints: hs }; }
    if (k === 3) { const r = pick(CL); return { text: "The word <b>" + r[0] + "</b> is a clipped form of...", choices: shuf([r[1]].concat(rest(CL, r, 2).map(x => x[1]))), answer: r[1], hints: hs }; }
    const r = pick(CL); return { text: "Which short word is a clipped form of <i>" + r[1] + "</i>?", choices: shuf([r[0]].concat(rest(CL, r, 2).map(x => x[0]))), answer: r[0], hints: hs };
  };
  L17.push(mk("Blends and clipped words", blMake,
    S("✂️", ["Word shortcuts", "English makes new words by <b>blending</b> two words or <b>clipping</b> a long one."],
      ["Blends", "<b>brunch</b> = breakfast + lunch<br><b>smog</b> = smoke + fog<br><b>motel</b> = motor + hotel"],
      ["Clipped words", "<b>gym</b> from gymnasium<br><b>exam</b> from examination<br><b>fridge</b> from refrigerator"])));

  const MY = [["cereal", "Ceres, the Roman goddess of grain"], ["volcano", "Vulcan, the Roman god of fire"], ["museum", "the Muses, Greek goddesses of the arts"], ["panic", "Pan, the Greek god of the wild"], ["herculean", "Hercules, a hero famous for his strength"], ["echo", "Echo, a nymph in a Greek myth"], ["atlas (a book of maps)", "Atlas, a Titan who held up the sky"]];
  const myMake = () => {
    const r = pick(MY);
    const hs = ["Many English words come from the names of gods and heroes in old myths. Think about what each myth figure was known for.", "Match the word's meaning to the figure's job: grain, fire, the arts, wild places, strength, voices, or holding up the world.", "Example: the word <b>jovial</b> (cheerful) comes from <i>Jove</i>, another name for Jupiter, who was thought to bring happy times. Now do yours."];
    if (ri(1, 3) === 1) return { visual: "🏺", text: "Which word comes from " + r[1] + "?", choices: shuf([r[0]].concat(rest(MY, r, 2).map(x => x[0]))), answer: r[0], hints: hs };
    return { visual: "🏺", text: "The word <b>" + r[0] + "</b> comes from...", choices: shuf([r[1]].concat(rest(MY, r, 2).map(x => x[1]))), answer: r[1], hints: hs };
  };
  L17.push(mk("Myths hiding in our words", myMake,
    S("🏺", ["Ancient names, modern words", "Many English words come from the gods, heroes and creatures in <b>Greek and Roman myths</b>."],
      ["Examples", "<b>cereal</b>: Ceres, goddess of grain<br><b>volcano</b>: Vulcan, god of fire<br><b>museum</b>: the Muses<br><b>herculean</b>: Hercules"],
      ["Why it helps", "Knowing the story makes the word easier to remember. A <i>herculean</i> task takes a hero's strength."])));

  L17.push(mk("Transitive and intransitive verbs", rq([
      ["In 'The boy kicked the ball,' the verb <i>kicked</i> is...", "transitive", "intransitive", "linking"],
      ["In 'The baby slept soundly,' the verb <i>slept</i> is...", "intransitive", "transitive", "linking"],
      ["In 'Leah opened the window,' the verb <i>opened</i> is...", "transitive", "intransitive", "linking"],
      ["In 'The sun rose,' the verb <i>rose</i> is...", "intransitive", "transitive", "linking"],
      ["In 'My dog barks loudly,' the verb <i>barks</i> is...", "intransitive", "transitive", "linking"],
      ["In 'She carried a heavy box,' the verb <i>carried</i> is...", "transitive", "intransitive", "linking"],
      ["In 'The audience clapped,' the verb <i>clapped</i> is...", "intransitive", "transitive", "linking"],
      ["In 'He is a writer,' the verb <i>is</i> is...", "linking", "transitive", "intransitive"],
      ["A <b>transitive verb</b> needs...", "a direct object to complete its meaning", "an adverb", "an adjective"],
      ["An <b>intransitive verb</b>...", "does not take a direct object", "always takes two objects", "is always a form of 'be'"],
      ["In 'The train arrived at noon,' the verb <i>arrived</i> is...", "intransitive", "transitive", "linking"],
      ["In 'Our class sold cookies,' the verb <i>sold</i> is...", "transitive", "intransitive", "linking"]],
    ["Ask the verb a question: did what? Does something receive the action?", "A transitive verb has a direct object that receives the action. An intransitive verb makes sense without one. A linking verb joins the subject to a word that renames or describes it.", "Example: 'Birds sing.' Sing what? Nothing receives it. But 'Birds sing songs' has songs receiving the action. Now do yours."]),
    S("🚦", ["Does the action land?", "Verbs can be <b>transitive</b> (they pass action to an object) or <b>intransitive</b> (they do not)."],
      ["Test", "'Mia <b>ate</b> lunch.' Ate what? lunch. → transitive<br>'Mia <b>laughed</b>.' Laughed what? nothing. → intransitive"],
      ["Watch out", "Many verbs can be both: 'She <b>reads</b> a book' (transitive) and 'She <b>reads</b> every night' (intransitive)."])));

  L17.push(mk("Clichés and fresh language", rq([
      ["Which phrase is a cliché (overused)?", "busy as a bee", "the fog swallowed the street", "a gull's cry stitched the sky"],
      ["Which phrase is a cliché?", "cold as ice", "his laugh rattled like loose change", "the sunset spilled orange across the roof"],
      ["Which phrase is a cliché?", "at the end of the day", "her voice was a warm blanket", "the old clock coughed twelve times"],
      ["Which phrase is a cliché?", "easy as pie", "the road unrolled like a gray ribbon", "rain tapped the glass like impatient fingers"],
      ["Which phrase is a cliché?", "last but not least", "the lunchroom hummed like a hive", "dust drifted through the sunbeam"],
      ["Which phrase is a cliché?", "think outside the box", "the kettle muttered on the stove", "her shoes squeaked down the empty hall"],
      ["Why should writers avoid clichés?", "They are so overused they lose their power.", "They are rude words.", "They are hard to spell."],
      ["Which rewrite is fresher than 'cold as ice'?", "cold as a metal handrail in January", "cold as ice", "very cold"],
      ["Which rewrite is fresher than 'busy as a bee'?", "busy as a cook on a holiday morning", "busy as a bee", "very busy"],
      ["Which phrase is NOT a cliché?", "the moon hung like a dropped coin", "fit as a fiddle", "better late than never"]],
    ["A cliché is a phrase you have heard a thousand times. Which one sounds too familiar?", "Fresh language makes a new picture from details that only fit this moment. If you could finish the phrase without thinking, it is probably a cliché.", "Example: 'light as a feather' is a cliché. 'Light as a soap bubble drifting off the porch' is fresh. Now do yours."]),
    S("🆕", ["Fresh words", "A <b>cliché</b> is a phrase so overused that it has lost its spark."],
      ["Spot them", "busy as a bee · cold as ice · easy as pie · last but not least"],
      ["Fix them", "Replace a cliché with a <b>specific picture</b> from your own scene. 'Quiet as a mouse' → 'quiet as snow settling on the porch roof'."])));

  L17.push(mk("Direct and indirect speech", rq([
      ["Leo said, “I like soccer.” Which is the indirect version?", "Leo said that he liked soccer.", "Leo said that I like soccer.", "Leo said, he likes soccer."],
      ["Mom asked, “Did you finish?” Which is the indirect version?", "Mom asked if I had finished.", "Mom asked did you finish.", "Mom asked, if you finish."],
      ["“I will call you,” promised Dana. Which is the indirect version?", "Dana promised that she would call me.", "Dana promised that I will call you.", "Dana promised she will call you."],
      ["Which sentence is a direct quotation?", "Ava said, “Let's go.”", "Ava said they should go.", "Ava said she would leave."],
      ["The coach shouted, “Run faster!” Which is the indirect version?", "The coach shouted for us to run faster.", "The coach shouted, run faster.", "The coach shouted that “run faster.”"],
      ["Sara said, “We are late.” Which is the indirect version?", "Sara said that they were late.", "Sara said that we are late.", "Sara said, they were late."],
      ["Indirect speech reports what was said...", "without the exact words and without quotation marks", "in exact words with quotation marks", "only in a question"],
      ["Which kind of speech needs quotation marks?", "direct speech", "indirect speech", "both"],
      ["Tim told her, “I am hungry.” Which is the indirect version?", "Tim told her that he was hungry.", "Tim told her that I am hungry.", "Tim told her, he is hungry."]],
    ["Direct speech repeats exact words inside quotation marks. Indirect speech reports the idea without them.", "When you report speech, pronouns shift (I becomes he or she) and the verb often moves back in time (am becomes was, will becomes would).", "Example: Jo said, “I can swim.” → Jo said that she could swim. Now do yours."]),
    S("💬", ["Two ways to report speech", "<b>Direct speech</b> gives the exact words in quotes. <b>Indirect speech</b> tells what was said."],
      ["Changes", "Direct: Ben said, “I am tired.”<br>Indirect: Ben said that <b>he was</b> tired.<br>Pronoun and tense shift. No quotation marks."],
      ["Questions", "Ask: “Are you ready?” → She asked <b>if</b> I was ready. Use <i>if</i> or <i>whether</i>, and no question mark inside the report."])));

  L17.push(mk("Appositives", rq([
      ["Which sentence contains an appositive?", "My cousin, a talented painter, won an award.", "My cousin painted a portrait and won an award.", "My cousin won an award last night."],
      ["Find the appositive: 'Mr. Lee, our coach, was proud.'", "our coach", "Mr. Lee", "was proud"],
      ["Find the appositive: 'Jupiter, the largest planet, has many moons.'", "the largest planet", "Jupiter", "has many moons"],
      ["Which combines 'Max is my dog. Max loves fetch.' using an appositive?", "Max, my dog, loves fetch.", "Max is my dog loves fetch.", "Max, loves my dog fetch."],
      ["Find the appositive: 'We visited Lisbon, the capital of Portugal.'", "the capital of Portugal", "Lisbon", "We visited"],
      ["An appositive is a noun phrase that...", "renames the noun next to it", "tells when something happened", "shows an action"],
      ["Which combines 'Ms. Ortiz is a nurse. She helped us.' using an appositive?", "Ms. Ortiz, a nurse, helped us.", "Ms. Ortiz was a nurse and she helped us.", "Ms. Ortiz helped us because she helped."],
      ["Find the appositive: 'Our mascot, a friendly eagle, waved.'", "a friendly eagle", "Our mascot", "waved"],
      ["Which sentence contains an appositive?", "Her brother, a chef, cooked dinner.", "Her brother cooked dinner quickly.", "Her brother cooked and served dinner."]],
    ["An appositive sits right next to a noun and renames it. Cover it up: the sentence should still work.", "It is usually a noun phrase with no verb of its own, and it is set off with commas (one before it and one after it if it is in the middle of the sentence).", "Example: 'Saturn, a ringed planet, is gassy.' The phrase 'a ringed planet' renames Saturn, with commas on both sides. Now do yours."]),
    S("🏷️", ["A renaming phrase", "An <b>appositive</b> is a noun or noun phrase that sits next to another noun and <b>renames</b> it."],
      ["Example", "My dog, <b>a spotted beagle</b>, loves mud.<br>'a spotted beagle' renames <i>my dog</i>."],
      ["Combining sentences", "'Ana is our captain. Ana is fast.' → <b>Ana, our captain, is fast.</b> Use commas around the appositive."])));

  L17.push(mk("The unreliable narrator", rq([
      ["An <b>unreliable narrator</b> is one whose account...", "may not be fully truthful or accurate", "is always true", "never appears in the story"],
      ["A narrator brags, 'I am the best runner ever,' but the story shows him losing every race. Why is he unreliable?", "His words do not match what happens.", "He runs fast.", "He is the author."],
      ["A young child narrates an argument between adults but misunderstands it. The narrator is unreliable because...", "she does not fully understand what she sees", "she lies on purpose", "she is very old"],
      ["Which clue suggests a narrator cannot be trusted?", "He contradicts himself.", "He describes the weather.", "He uses the word 'I'."],
      ["Why do authors use unreliable narrators?", "To make readers question what is true and think harder", "To save time", "To avoid writing dialogue"],
      ["A narrator says, 'I never get angry,' and then slams a door. The narrator is...", "unreliable", "reliable", "omniscient"],
      ["A narrator describes events fairly and sees clearly what happens. This narrator is...", "reliable", "unreliable", "unknown"],
      ["First-person narrators are more likely to be unreliable than all-knowing narrators because...", "they only tell what they know and feel", "they know everything", "they never speak"]],
    ["Ask: do the narrator's words match what the story shows? Does the narrator have a reason to bend the truth?", "Narrators can be unreliable because they are biased, young, confused, forgetful or lying. Look for contradictions, big claims and details the narrator misses.", "Example: A narrator insists 'Nobody was mad at me,' while everyone around him stomps off. The gap between words and events is a warning sign. Now do yours."]),
    S("🪞", ["Can you trust the storyteller?", "The <b>narrator</b> is the voice that tells the story. Not every narrator tells the whole truth."],
      ["Unreliable", "An <b>unreliable narrator</b> may be biased, confused, too young, or even lying."],
      ["Clues", "Contradictions · bragging · missing details · other characters who react differently than the narrator says."])));

  L17.push(mk("Story structures", rq([
      ["A story told through letters, diary entries or emails is...", "epistolary", "chronological", "a frame story"],
      ["A story that begins in the middle of the action starts <i>in medias res</i>. This means...", "in the middle of things", "at the very end", "before anything happens"],
      ["A story inside another story, like a grandmother telling tales to her grandchildren, uses a...", "frame story", "epistolary format", "chronological order"],
      ["A story told in the order that events happen is...", "chronological", "epistolary", "in medias res"],
      ["A novel told entirely through text messages and emails is...", "epistolary", "a frame story", "chronological"],
      ["A novel opens with two characters already running from a flood. The author used...", "in medias res", "a frame story", "an epistolary format"],
      ["Why use a frame story?", "to link several smaller tales or give them a setting", "to shorten the plot", "to remove the narrator"],
      ["Why start <i>in medias res</i>?", "to hook the reader quickly", "to explain the setting first", "to hide the main character"],
      ["A story that jumps back and forth between past and present is...", "nonlinear", "chronological", "epistolary"]],
    ["Ask how the author chose to arrange or deliver the story: in order, in letters, in the middle of action, or a tale inside a tale?", "The structure is the story's frame. Notice the order of events and the form the story takes (letters, a storyteller, a jump into action).", "Example: A book told as a series of diary pages is built from personal writing, and the pages are its structure. Now do yours."]),
    S("🏗️", ["Shapes of stories", "Authors choose how to <b>build</b> a story, not only what happens."],
      ["Four structures", "<b>Chronological</b>: events in order.<br><b>In medias res</b>: starts mid-action.<br><b>Epistolary</b>: told in letters or diaries.<br><b>Frame story</b>: a story inside a story."],
      ["Why it matters", "Structure changes how the reader feels: tension, mystery or closeness."])));

  L17.push(mk("Utopia and dystopia", rq([
      ["A <b>utopia</b> is...", "an imagined perfect society", "a real city", "a type of poem"],
      ["A <b>dystopia</b> is...", "an imagined society where life is unfair or controlled", "a perfect, joyful world", "a kind of map"],
      ["A city where citizens must obey strict rules, cannot choose their jobs, and are watched by cameras all day is a...", "dystopia", "utopia", "legend"],
      ["A village in a story where everyone shares, no one is hungry and all are kind is a...", "utopia", "dystopia", "memoir"],
      ["Dystopian stories often warn readers about...", "dangers in how society might go if problems are ignored", "the best recipes", "ancient history facts"],
      ["Dystopian main characters often...", "question or resist the rules", "love the rules without thinking", "never appear in the story"],
      ["In a dystopian story, who might control all the information people see?", "a powerful government or company", "the weather", "the heroes only"],
      ["The word <i>utopia</i> comes from Greek words that can mean 'no place'. This hints that a perfect place...", "may not really exist", "is easy to find", "is in Greece"]],
    ["Ask whether the imagined world is a perfect place or a place where something has gone wrong.", "In a dystopia, rules, fear or control hide problems. In a utopia, the society seems perfect, though some writers suggest perfection has a cost.", "Example: A world where everyone has the same job and nobody may disagree sounds orderly but hides a problem. Now do yours."]),
    S("🌆", ["Imagined worlds", "A <b>utopia</b> is an imagined perfect society. A <b>dystopia</b> is an imagined society that has gone wrong."],
      ["In dystopias", "Strict control, hidden truths, fear, and a hero who starts asking questions."],
      ["Why read them", "They are warnings. They make us think about fairness, freedom and truth in our own world."])));

  L17.push(mk("If-then reasoning", rq([
      ["All birds have feathers. A robin is a bird. So...", "a robin has feathers", "a robin can sing", "feathers are birds"],
      ["If it rains, the picnic is canceled. It is raining. So...", "the picnic is canceled", "the picnic is on", "it is Tuesday"],
      ["All squares are rectangles. Shape Z is a square. So...", "Z is a rectangle", "Z is a circle", "Z has five sides"],
      ["No reptiles are mammals. A snake is a reptile. So...", "a snake is not a mammal", "a snake is a mammal", "a snake is not a reptile"],
      ["Which argument is valid?", "All cats are animals. Milo is a cat. So Milo is an animal.", "All cats are animals. Milo is an animal. So Milo is a cat.", "Some animals are cats. Milo is an animal. So Milo is a cat."],
      ["If you study, you pass. Ana passed. Can we conclude she studied?", "No, she may have passed for another reason", "Yes, she must have studied", "Yes, because she is Ana"],
      ["All dogs bark. Rex barks. Is Rex a dog?", "We cannot be sure", "Yes, Rex is a dog", "No, Rex is a cat"],
      ["A <b>premise</b> is...", "a statement that supports a conclusion", "the conclusion itself", "a question"],
      ["A <b>conclusion</b> is...", "the point an argument reaches", "a fact to start with", "a title"]],
    ["Treat the first statements as true. What must follow from them?", "Follow the pattern: All A are B; C is an A; so C is B. Be careful: going backward ('C is B, so C is A') does not work.", "Example: All oaks are trees. This is an oak. So this is a tree. But 'This is a tree' does not prove 'This is an oak'. Now do yours."]),
    S("🧮", ["Reasoning in steps", "A logical argument has <b>premises</b> (starting statements) and a <b>conclusion</b> that follows."],
      ["A good pattern", "All mammals breathe air. A whale is a mammal. So a whale breathes air."],
      ["A trap", "If the premises are true and the pattern is valid, the conclusion must be true. Reversing the pattern is a mistake."])));

  L17.push(mk("Misleading graphs and numbers", rq([
      ["A bar graph starts its side numbers at 90 instead of 0 so tiny differences look huge. This is a...", "misleading scale", "helpful title", "clear legend"],
      ["An ad says '9 out of 10 users love it,' but only 10 people were asked. What is the problem?", "The sample is too small.", "The ad is too colorful.", "The number 9 is odd."],
      ["A poll about favorite sports asks only people leaving a soccer game. What is the problem?", "The sample is biased.", "The poll is too long.", "Soccer is boring."],
      ["'Sales doubled!' But sales went from 1 to 2. What is misleading?", "The starting number was tiny.", "The word 'sales'.", "The year."],
      ["An ad shows only the best test results and hides the rest. This is...", "cherry-picking data", "fair reporting", "a complete survey"],
      ["Which graph feature should you check first?", "the scale (the numbers on the axis)", "the color of the bars", "the font"],
      ["A graph has no labels on its axes. Why is that a problem?", "You cannot tell what is being measured.", "It makes the graph prettier.", "It makes the numbers bigger."],
      ["A larger sample usually makes results...", "more reliable", "less reliable", "unrelated to the question"],
      ["3-D bars on a graph look larger than they are. The problem is...", "distorted size", "missing color", "too much text"]],
    ["Ask: could the way the numbers were chosen or shown change how I feel about them?", "Check the scale, the size and type of the sample, whether the data are complete, and whether the labels tell you exactly what was measured.", "Example: A chart's axis starts at 50, not 0, so a rise from 51 to 53 looks like a giant jump. The trick is in the starting number. Now do yours."]),
    S("📉", ["Numbers can mislead", "Graphs and statistics can be honest or sneaky. Learn to check them."],
      ["Four checks", "<b>Scale</b>: does it start at zero?<br><b>Sample</b>: big enough and fair?<br><b>Cherry-picking</b>: is any data left out?<br><b>Labels</b>: what is measured?"],
      ["Stay curious", "Ask: who made this graph, and what do they want me to believe?"])));

  L17.push(mk("Speechmaking tools", rq([
      ["'We will not tire, we will not fail, we will not give up.' This uses...", "parallelism", "a rhetorical question", "a simile"],
      ["'Who wouldn't want cleaner air?' This is a...", "rhetorical question", "statistic", "metaphor"],
      ["'It was the best snack ever, the best, truly the best.' This uses...", "repetition", "antithesis", "direct address"],
      ["'Easy to start, hard to finish.' This uses...", "antithesis (opposites side by side)", "repetition", "an anecdote"],
      ["'You, yes you, can make a difference.' This uses...", "direct address", "antithesis", "a statistic"],
      ["A rhetorical question is asked to...", "make the audience think, not to get an answer", "get a quick vote", "end the speech"],
      ["'Not words, but deeds; not talk, but action.' This uses...", "parallelism and opposites", "a simile only", "a statistic"],
      ["Why do speakers repeat key phrases?", "to make them memorable and stress the main idea", "to fill time", "to hide mistakes"],
      ["'Ask yourself: what kind of town do we want?' This is a...", "rhetorical question", "metaphor", "fact"]],
    ["Say the line out loud. Does a pattern repeat, a question get asked, or does the speaker talk right to the audience?", "Notice the pattern of the line: repeated words, repeated structure, opposite ideas, a question that needs no answer, or speaking straight to the listener.", "Example: 'Fast food, fast cars, fast lives.' The same word again and again is a pattern that sticks. Now do yours."]),
    S("🎤", ["Words that move a crowd", "Speakers use <b>rhetorical devices</b> to be clear and unforgettable."],
      ["Tools", "<b>Repetition</b>: say it again.<br><b>Parallelism</b>: same sentence pattern.<br><b>Antithesis</b>: opposites together.<br><b>Rhetorical question</b>: a question that makes you think.<br><b>Direct address</b>: talking to 'you'."],
      ["Spot them", "Read aloud. If it has rhythm or repeats a shape, it is probably a device."])));

  L17.push(mk("Book and film adaptations", rq([
      ["Which is something a book can do more easily than a film?", "share a character's private thoughts in words", "play music", "show a wide view of a mountain"],
      ["Which can a film do easily?", "use music and camera angles to build mood", "write pages of inner thoughts", "let the reader imagine every face"],
      ["A movie made from a book is called an...", "adaptation", "allusion", "anthology"],
      ["A director shows a character is nervous by...", "a close-up of shaking hands", "a long page of narration", "a footnote"],
      ["To compare a book and its film, you should look at...", "characters, setting, events and how each tells the story", "only the title", "only the length"],
      ["In a film, a <b>close-up</b> shows...", "a small part of a scene, like a face, in detail", "a far-away view", "the credits"],
      ["In a film, a <b>wide shot</b> shows...", "the whole setting", "one tiny object", "only a voice"],
      ["Why might a film change events from the book?", "A film has limited time and must show things visually.", "Filmmakers cannot read.", "Books are always wrong."]],
    ["Think about what each form can do: words on a page versus pictures, music and sound.", "A book can say what a character thinks. A film shows faces, places, sound and music. Adaptations often change or cut events to fit the screen.", "Example: A book says 'Mia felt a cold fear.' A film might show her pale face and the dark hallway to show it. Now do yours."]),
    S("🎬", ["Page to screen", "An <b>adaptation</b> turns one form (like a book) into another (like a film)."],
      ["Different tools", "Books: words, thoughts, descriptions.<br>Films: images, sound, music, camera angles, actors."],
      ["Comparing", "Look at what was kept, changed or left out, and ask how that changes the story's feeling."])));

  const EVT = [
    ["Last year, 82% of our class finished the reading challenge.", "statistic"], ["Data from 2,000 families showed that dinner together raises reading scores.", "statistic"],
    ["My uncle tried the app and said it helped him sleep.", "anecdote"], ["I knew a boy who never studied and still passed, so studying is not needed.", "anecdote"],
    ["Dr. Ahn, who has studied sleep for twenty years, says teens need about nine hours.", "expert testimony"], ["A veteran firefighter explained that smoke alarms save lives.", "expert testimony"],
    ["In 1903 the Wright brothers made the first powered airplane flights.", "historical fact"], ["Water boils at 100 degrees Celsius at sea level.", "historical fact"]];
  L17.push(mk("Kinds of evidence", () => {
    const k = ri(1, 5);
    const names = ["statistic", "anecdote", "expert testimony", "historical fact"];
    if (k === 1) { const r = pick([["Which kind of evidence is only one person's story and might not be typical?", "anecdote", "statistic", "expert testimony"], ["Which kind of evidence is a number gathered from many cases?", "statistic", "anecdote", "expert testimony"], ["Which kind of evidence comes from a person with special training?", "expert testimony", "anecdote", "statistic"]]); return { text: r[0], choices: shuf([r[1], r[2], r[3]]), answer: r[1], hints: ["Ask: where does the evidence come from? One story, a pile of numbers, a specialist or a checkable fact?", "Check who is speaking and what they are using: numbers from many cases, one person's story, or the words of a specialist.", "Example: 'My aunt grew tomatoes in coffee grounds and loved them' is one person's story. Now do yours."] }; }
    const r = pick(EVT);
    return { text: "<i>" + r[0] + "</i><br><br>What kind of evidence is this?", choices: shuf([r[1]].concat(rest(names, r[1], 2))), answer: r[1], hints: ["Ask: is it a number from many cases, a personal story, a specialist's word, or a checkable fact?", "Check who is speaking and what they are using. A number gathered from many cases, one person's story, the word of someone trained in the subject, or a fact anyone could look up.", "Example: 'My aunt grew tomatoes in coffee grounds and loved them' is one person's story. Now do yours."] };
  }, S("🧾", ["Proof comes in kinds", "A strong argument uses <b>different kinds of evidence</b>."],
      ["Four kinds", "<b>Statistic</b>: a number from many cases.<br><b>Anecdote</b>: a short personal story.<br><b>Expert testimony</b>: what a trained specialist says.<br><b>Fact</b>: something that can be checked."],
      ["Strength", "Statistics and facts are usually stronger than a single anecdote. Experts help when they know the topic well."])));

  const dtMake = () => {
    const k = ri(1, 4);
    const hs = ["Write the numbers in a list. Think about what the question word asks for.", "Mean = add them up, then divide by how many. Median = the middle number once they are in order. Range = biggest minus smallest. Mode = the number that appears most often.", "Example: 2, 4, 4, 6, 9. Sorted already. Middle number (3rd of 5) = 4 for the median. Biggest minus smallest = 9 - 2 = 7 for the range. Now do yours."];
    if (k === 1) {
      let a, s; do { a = [ri(2, 20), ri(2, 20), ri(2, 20), ri(2, 20), ri(2, 20)]; s = a.reduce((x, y) => x + y); } while (s % 5);
      return { visual: "📊", text: "Five students read " + a.join(", ") + " pages. What is the <b>mean</b> (average) number of pages?", answer: s / 5, hints: hs };
    }
    if (k === 2) {
      const a = shuf([ri(1, 9), ri(10, 19), ri(20, 29), ri(30, 39), ri(40, 49)]);
      const sorted = a.slice().sort((x, y) => x - y);
      return { visual: "📊", text: "Five runners finished with these times in minutes: " + a.join(", ") + ". What is the <b>median</b>?", answer: sorted[2], hints: hs };
    }
    if (k === 3) {
      const a = [ri(3, 15), ri(16, 30), ri(31, 45), ri(46, 60), ri(5, 55)];
      return { visual: "📊", text: "Daily steps (in hundreds) for five days were " + a.join(", ") + ". What is the <b>range</b>?", answer: Math.max(...a) - Math.min(...a), hints: hs };
    }
    const m = ri(3, 12), others = rest([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], m, 3);
    return { visual: "📊", text: "Test scores: " + shuf([m, m, m, others[0], others[1], others[2]]).join(", ") + ". What is the <b>mode</b>?", answer: m, hints: hs };
  };
  L17.push(mk("Mean, median, range and mode", dtMake,
    S("📊", ["Describing a set of numbers", "Articles often use <b>averages</b> to sum up data. Know what each one means."],
      ["Four measures", "<b>Mean</b>: add all, divide by how many.<br><b>Median</b>: the middle number in order.<br><b>Range</b>: biggest minus smallest.<br><b>Mode</b>: the most common number."],
      ["Example", "Numbers 2, 4, 4, 6, 9: mean = 25 ÷ 5 = 5; median = 4; range = 7; mode = 4."])));

  L17.push(mk("Pacing and narrative techniques", rq([
      ["To slow down an important moment, a writer can...", "describe each small action in detail", "write one short summary sentence", "skip to the next chapter"],
      ["To speed up time, a writer can use a summary like...", "'Weeks passed.'", "a page of slow description", "a long speech"],
      ["Short, choppy sentences usually make a scene feel...", "fast and tense", "slow and dreamy", "boring and flat"],
      ["Long, flowing sentences often make a scene feel...", "calm or slow", "sudden and tense", "unfinished"],
      ["Which opening is the strongest hook?", "The door that had been locked for fifty years was open.", "This is a story.", "I will tell you about my day."],
      ["Which sentence uses sensory detail?", "The warm bread smelled of butter and cinnamon.", "The bread was good.", "I ate bread."],
      ["Which sentence best builds suspense?", "The footsteps stopped right outside the door.", "The hallway was long.", "Everyone was at lunch."],
      ["Dialogue in a story helps to...", "show character and move the plot along", "replace the setting", "slow the story to a stop"],
      ["A <b>scene</b> in a story is usually...", "a moment told in detail, moment by moment", "a quick summary", "the title"]],
    ["Ask what the writer wants the reader to feel: rushed, tense, calm, curious?", "Pacing is the speed of the story. Slow it down with detail and long sentences. Speed it up with summary and short sentences. Hooks, senses and dialogue make it vivid.", "Example: 'The bell rang. I ran. The door slammed.' Short bursts make it feel rushed. Now do yours."]),
    S("⏱️", ["Story speed", "<b>Pacing</b> is how fast or slow a story moves. Writers control it on purpose."],
      ["Speed up, slow down", "<b>Speed up</b>: summary ('Years passed'), short sentences.<br><b>Slow down</b>: detail, senses, long sentences, slow action."],
      ["Hooks", "Begin with something surprising or puzzling so the reader has to keep going."])));

  L17.push(MIX("Mixed practice", L17[0], L17[4], L17[6], L17[8], L17[11], L17[13]));
  L17.push(MIX("Level 17 Challenge", L17[1], L17[2], L17[3], L17[5], L17[7], L17[9], L17[12], L17[15], L17[16]));

  // ================= LEVEL 18 =================
  L18.push(mk("Latin roots: cred, dur, jur, vac, ann", rq([
      ["The Latin root <b>cred</b> is in <i>incredible</i>, <i>credit</i> and <i>credible</i>. What does it mean?", "believe", "last", "empty"],
      ["The Latin root <b>dur</b> is in <i>endure</i>, <i>duration</i> and <i>durable</i>. What does it mean?", "last or hard", "year", "law"],
      ["The Latin root <b>jur/jus</b> is in <i>justice</i>, <i>jury</i> and <i>injure</i>. What does it mean?", "law or right", "believe", "empty"],
      ["The Latin root <b>vac</b> is in <i>vacant</i>, <i>evacuate</i> and <i>vacuum</i>. What does it mean?", "empty", "law", "year"],
      ["The Latin root <b>ann/enn</b> is in <i>annual</i>, <i>anniversary</i> and <i>centennial</i>. What does it mean?", "year", "empty", "believe"],
      ["A <i>vacant</i> house is one that is...", "empty", "yearly", "believable"],
      ["An <i>annual</i> festival happens every...", "year", "day", "hour"],
      ["Something <i>durable</i> is...", "made to last", "empty", "easy to believe"],
      ["A story that is not <i>credible</i> is hard to...", "believe", "last", "empty"],
      ["A <i>jury</i> in a courtroom helps decide what is...", "right under the law", "empty", "yearly"],
      ["To <i>evacuate</i> a building is to...", "empty it of people", "make it last", "believe in it"],
      ["A <i>centennial</i> celebration marks one hundred...", "years", "laws", "beliefs"]],
    ROOTH("Example: <b>aqua</b> is in <i>aquarium</i> and <i>aquatic</i>. Both are about water, so <b>aqua</b> means 'water'.")),
    S("🧩", ["More Latin roots", "These roots hide in school, law and calendar words."],
      ["Five roots", "<b>cred</b> = believe (<b>cred</b>ible)<br><b>dur</b> = last (<b>dur</b>ation)<br><b>jur/jus</b> = law, right (<b>jus</b>tice)<br><b>vac</b> = empty (<b>vac</b>ant)<br><b>ann/enn</b> = year (<b>ann</b>ual)"],
      ["Use them", "<i>bi</i> (two) + <i>enn</i> (year) = <i>biennial</i>, happening every two years."])));

  const LP = [["et cetera", "and so on"], ["vice versa", "the other way around"], ["per capita", "for each person"], ["ad hoc", "for this purpose only"], ["status quo", "the way things are now"], ["bona fide", "genuine"], ["alias", "otherwise known as"], ["verbatim", "word for word"], ["versus", "against"], ["circa", "around that time, about"], ["i.e.", "that is"], ["e.g.", "for example"]];
  const lpMake = () => {
    const r = pick(LP);
    const hs = ["Latin phrases have been used in English for hundreds of years. Think about where you have seen or heard this one.", "Say the phrase in a sentence and ask which meaning makes the sentence work. Some are abbreviations of longer Latin phrases.", "Example: <i>ad infinitum</i> means 'without end', as in 'The song went on ad infinitum.' Now do yours."];
    if (ri(1, 2) === 1) return { text: "What does the Latin phrase <b>" + r[0] + "</b> mean in English?", choices: shuf([r[1]].concat(rest(LP.map(x => x[1]), r[1], 2))), answer: r[1], hints: hs };
    return { text: "Which Latin phrase means '" + r[1] + "'?", choices: shuf([r[0]].concat(rest(LP.map(x => x[0]), r[0], 2))), answer: r[0], hints: hs };
  };
  L18.push(mk("Latin phrases in English", lpMake,
    S("🏛️", ["Latin in daily writing", "English keeps many <b>Latin phrases</b> and abbreviations."],
      ["Common ones", "<b>et cetera</b> (etc.): and so on<br><b>vice versa</b>: the other way around<br><b>per capita</b>: for each person<br><b>ad hoc</b>: for this purpose only<br><b>status quo</b>: the way things are now"],
      ["Abbreviations", "<b>e.g.</b> = for example<br><b>i.e.</b> = that is<br><b>circa</b> (c.) = about, around that time"])));

  L18.push(mk("Words that changed meaning", rq([
      ["The word <b>awful</b> once meant...", "full of awe, inspiring wonder", "very funny", "tiny"],
      ["The word <b>nice</b> once meant...", "foolish or silly", "kind", "sweet-smelling"],
      ["The word <b>silly</b> once meant...", "happy or blessed", "angry", "sleepy"],
      ["The word <b>manufacture</b> originally meant...", "to make by hand", "to destroy", "to sell"],
      ["The word <b>villain</b> first meant...", "a farm worker", "a king", "a thief"],
      ["The word <b>pretty</b> in Old English meant...", "clever or crafty", "tiny", "loud"],
      ["The word <b>nervous</b> once meant...", "strong and full of sinew", "afraid", "talkative"],
      ["The word <b>girl</b> once meant...", "a young person of either sex", "a queen", "a teacher"],
      ["When a word's meaning changes over time, this shows that...", "languages change", "dictionaries are wrong", "words never change"],
      ["Today, the word <b>awful</b> means...", "very bad", "inspiring", "round"]],
    ["Words change slowly as people use them in new ways. The old meaning is often more literal.", "Look inside the word for parts you recognize (like <i>manu</i> or <i>fact</i>), and think about how an older sense could drift into the one we use now.", "Example: <b>decimate</b> once meant to take one in ten, but now often means to destroy a large part. Now do yours."]),
    S("⏳", ["Meanings drift", "Words do not stand still. Their meanings can <b>shift</b> over hundreds of years."],
      ["Examples", "<b>awful</b>: once 'full of awe'<br><b>silly</b>: once 'blessed, happy'<br><b>nice</b>: once 'foolish'<br><b>manufacture</b>: once 'made by hand'"],
      ["Why it happens", "People use words in new ways. Over time, the new use becomes the normal one."])));

  L18.push(mk("Academic vocabulary", rq([
      ["What does <b>analyze</b> mean in 'Analyze this poem'?", "examine it closely, part by part", "copy it out", "sing it"],
      ["What does <b>evaluate</b> mean?", "judge how good or well something is", "make a copy", "count the words"],
      ["What does <b>infer</b> mean?", "figure something out from clues", "read aloud", "ignore the details"],
      ["What does <b>summarize</b> mean?", "tell the main points briefly", "retell every detail", "make a list of questions"],
      ["What does <b>justify</b> mean in 'Justify your answer'?", "give reasons to show it is right", "change your answer", "erase your answer"],
      ["What does <b>compare</b> mean?", "tell how things are alike", "tell how things are different only", "put things in a pile"],
      ["What does <b>contrast</b> mean as a verb?", "show how things are different", "show how things are the same", "make things match"],
      ["What does <b>cite</b> mean?", "name your source or point to the text", "make up evidence", "skip the evidence"],
      ["What does <b>elaborate</b> mean?", "add more detail", "cut details", "end the paragraph"],
      ["What does <b>illustrate</b> mean in 'Illustrate your point'?", "show it with an example", "hide it", "repeat it twice"]],
    ["These are the words in test questions and assignments. Which action does the word ask you to do?", "Look at the word's parts or think of related words (like <i>analysis</i> or <i>inference</i>). The right choice is a thinking action, not just copying.", "Example: <b>predict</b> means to say what you think will happen next, using clues. Now do yours."]),
    S("🎓", ["Words from assignments", "Teachers use <b>academic words</b> over and over. Know them and you will know what to do."],
      ["Key words", "<b>analyze</b>: examine closely<br><b>evaluate</b>: judge<br><b>infer</b>: figure out from clues<br><b>summarize</b>: give main points<br><b>justify</b>: give reasons"],
      ["More", "<b>compare/contrast</b>: alike/different · <b>cite</b>: point to the source · <b>elaborate</b>: add detail · <b>illustrate</b>: give an example"])));

  const TY = ["simple", "compound", "complex", "compound-complex"];
  const SENT = [["Birds sing.", "simple"], ["My brother and I play chess.", "simple"], ["I like tea, and she likes coffee.", "compound"], ["The sun set, but the party continued.", "compound"],
    ["Because it rained, we stayed in.", "complex"], ["Although she was tired, Ana finished her homework.", "complex"], ["We waited until the train arrived.", "complex"],
    ["When the bell rang, the students left, and the teacher locked the door.", "compound-complex"], ["Mia studies hard, and she passes every test because she plans ahead.", "compound-complex"],
    ["After the storm ended, we cleaned the yard, but the fence stayed broken.", "compound-complex"]];
  L18.push(mk("Complex and compound-complex sentences", rq(SENT.map(r => ["What kind of sentence is this?<br><i>" + r[0] + "</i>", r[1]].concat(rest(TY, r[1], 2))),
      ["Count the independent clauses (they can stand alone) and the dependent clauses (they start with words like because, although, when, until).", "One independent clause alone is simple. Two or more independent clauses is compound. One independent plus a dependent clause is complex. Two or more independent plus a dependent clause is compound-complex.", "Example: 'We ate, and then we walked because it was nice.' Two independent clauses plus one dependent clause tells you the type. Now do yours."]),
    S("🧱", ["Four sentence types", "Sentences are built from <b>clauses</b>. Count and combine them."],
      ["The types", "<b>Simple</b>: one independent clause.<br><b>Compound</b>: two independent clauses.<br><b>Complex</b>: one independent + one dependent.<br><b>Compound-complex</b>: two or more independent + at least one dependent."],
      ["Clue words", "Dependent clauses start with <i>because, although, when, if, until, who, which</i>. They cannot stand alone."])));

  L18.push(mk("Fewer or less? Farther or further?", rq([
      ["There are ___ cookies left on the plate.", "fewer", "less"], ["I have ___ water in my bottle than you.", "less", "fewer"],
      ["A large ___ of students came to the game.", "number", "amount"], ["Add a small ___ of sugar.", "amount", "number"],
      ["The park is ___ down the road than the school.", "farther", "further"], ["We need to talk about this ___ tomorrow.", "further", "farther"],
      ["The girl ___ won the race is my cousin.", "who", "which"], ["The tree ___ fell during the storm was old.", "that", "who"],
      ["Divide the candy ___ the three of us.", "among", "between"], ["The secret stays ___ you and me.", "between", "among"],
      ["She made ___ mistakes on this test than on the last.", "fewer", "less"], ["There is ___ traffic today than yesterday.", "less", "fewer"]],
    ["Ask yourself what kind of word is being compared: can you count it, is it a person or a thing, is it a distance, or how many are involved?", "Each pair has its own rule about counting, people versus things, real distance versus degree, or the number of people. Decide which rule fits your blank.", "Example: 'We have ___ chairs than people.' You can count chairs, so choose the word for countable things. Now do yours."]),
    S("⚖️", ["Pairs that trip people up", "These word pairs look alike but follow rules."],
      ["Rules", "<b>fewer</b> (countable) vs <b>less</b> (amounts you can't count)<br><b>number</b> vs <b>amount</b> (same idea)<br><b>farther</b> (distance) vs <b>further</b> (more, extra)"],
      ["More", "<b>who</b> for people, <b>that/which</b> for things.<br><b>between</b> two, <b>among</b> three or more."])));

  L18.push(mk("Proofreading: find the clean sentence", rq([
      ["Which sentence has no errors?", "The dogs' bowls were empty, so Dad filled them.", "The dogs bowls was empty, so Dad filled them.", "The dogs' bowl were empty, so Dad filled them."],
      ["Which sentence has no errors?", "Their team won, and they're proud of it.", "There team won, and their proud of it.", "Their team won, and there proud of it."],
      ["Which sentence has no errors?", "She doesn't have any time left.", "She doesn't have no time left.", "She don't have any time left."],
      ["Which sentence has no errors?", "Jon and I went to the museum, and we learned a lot.", "Jon and me went to the museum, and we learned alot.", "Jon and I goed to the museum, and we learned a lot."],
      ["Which sentence has no errors?", "If I were taller, I could reach the shelf.", "If I am taller I could reached the shelf.", "If I were taller I could of reached the shelf."],
      ["Which sentence has no errors?", "Each of the students has a laptop.", "Each of the students have a laptop.", "Each of the student has a laptop."],
      ["Which sentence has no errors?", "The class, which was noisy, finally settled down.", "The class, who was noisy, finally settled down.", "The class, which were noisy, finally settled down."],
      ["Which sentence has no errors?", "I would have gone if I had known about it.", "I would of gone if I had known about it.", "I would have went if I had known about it."],
      ["Which sentence has no errors?", "Its leash is broken, but it's still wagging its tail.", "Its leash is broken, but it still wagging its tail.", "Its leash are broken, but it's still wagging its tail."],
      ["Which sentence has no errors?", "She spoke quietly to the audience.", "She spoke quiet to the audience.", "She speaked quietly to the audience."],
      ["Which sentence has no errors?", "Having finished the test, Ana handed in her paper.", "Having finished the test, the paper was handed in by Ana.", "Having finished the test, Ana's paper handed in."]],
    ["Check one thing at a time: spelling, then apostrophes, then verbs and pronouns, then commas.", "Look for classic slips: their/there/they're, its/it's, double negatives, <i>of</i> after <i>would</i>, subject-verb agreement, a modifier that doesn't match the right noun.", "Example: 'Theirs a mistake in this line.' It should be 'There's' (there is). Spotting the wrong word is how you find the error. Now do yours."]),
    S("🔎", ["Be your own editor", "Great writers <b>proofread</b>: they hunt for small mistakes."],
      ["A checklist", "1. Spelling · 2. Apostrophes (its/it's, possessives) · 3. Verb agreement and tense · 4. Pronouns · 5. Commas and end marks"],
      ["Tip", "Read the sentence slowly, even backward word by word, so your eyes don't skip over errors."])));

  const MS = [["separate", "seperate", "separete"], ["definitely", "definately", "definitly"], ["necessary", "neccessary", "necesary"], ["occurrence", "occurence", "ocurrence"], ["embarrass", "embarass", "embarasse"], ["rhythm", "rythm", "rhythem"],
    ["restaurant", "restaurent", "resturant"], ["government", "goverment", "govermnent"], ["environment", "enviroment", "envirnment"], ["February", "Febuary", "Februery"], ["library", "libary", "liberry"], ["calendar", "calender", "calandar"],
    ["privilege", "priviledge", "privelege"], ["guarantee", "garantee", "guarentee"], ["conscience", "consience", "conscence"], ["recommend", "reccomend", "recomend"]];
  L18.push(mk("Tricky spellings", rq(MS.map(r => ["Which word is spelled correctly?", r[0], r[1], r[2]]),
      ["Say the word slowly, one syllable at a time, and picture any double letters or silent letters.", "Make a memory trick: <i>a rat</i> in sep<b>a</b>r<b>a</b>te; two c's and one s in necessary; there's 'ment' in govern<b>ment</b> and environ<b>ment</b>. Pick the spelling that matches the trick for your word.", "Example: <b>accommodate</b> has two c's and two m's (it is roomy enough to fit both). Now do yours."]),
    S("✍️", ["Words that fool spellers", "Some words are often misspelled because we don't hear every letter."],
      ["Tricks", "<b>separate</b>: 'a rat' in the middle<br><b>necessary</b>: one collar (c), two sleeves (s)<br><b>rhythm</b>: rhythm helps your two hips move<br><b>February</b>: sound out the 'r' in 'Feb-ru-ary'"],
      ["Strategy", "Write the word three times, make a silly memory trick, and check the dictionary when unsure."])));

  L18.push(mk("Universal themes", pq([
      ["Story A: A boy leaves home to find work and learns he is stronger than he thought. Story B: A girl moves to a new city and learns to make her own way.", "What theme do both stories share?", "Facing new places can reveal your own strength.", "Cities are noisy.", "Home is always best."],
      ["Story A: A king hoards gold and ends up lonely. Story B: A dragon hoards treasure and cannot keep a single friend.", "What theme do both stories share?", "Greed can cost you friendship and happiness.", "Gold is shiny.", "Dragons are lonely animals."],
      ["Story A: A sailor ignores a storm warning and nearly loses his boat. Story B: A hiker ignores the weather report and gets stuck on the mountain.", "What theme do both stories share?", "Ignoring warnings can lead to trouble.", "Weather is always bad.", "Boats are safer than hikes."],
      ["Story A: A girl shares her lunch with a stranger who later helps her. Story B: A farmer feeds a hungry traveler who later saves his farm.", "What theme do both stories share?", "Kindness is often repaid.", "Strangers are dangerous.", "Lunch is important."],
      ["Story A: A boy tells a lie to look brave, and it grows bigger. Story B: A mermaid pretends to be human, and the secret grows harder to keep.", "What theme do both stories share?", "Lies tend to grow and cause problems.", "Mermaids live in oceans.", "Being brave is easy."],
      ["Story A: A soccer team that argues loses the match. Story B: A band that argues cannot play one song together.", "What theme do both stories share?", "Working together matters.", "Arguing is fun.", "Music is loud."],
      ["", "A <b>universal theme</b> is...", "an idea found in stories from many times and places", "an idea found in one story only", "a theme about science only"],
      ["", "Which is a universal theme?", "the struggle between good and evil", "the price of a candy bar", "the color of a car"],
      ["", "Why do fairy tales from different countries often share themes?", "People everywhere face similar struggles and hopes.", "They were copied word for word.", "They were all written in the same year."]].map(r => r[0] ? r : ["", r[1], r[2], r[3], r[4]]),
    ["Look at what happens in BOTH stories and what each character learns.", "Ignore the details such as names and places. Ask what lesson is the same underneath, and say it as a message about life.", "Example: Story A: a boy loses his kite by being careless. Story B: a girl loses her ring by being careless. Shared lesson: carelessness can lead to loss. Now do yours."]),
    S("🌍", ["Themes that travel", "A <b>universal theme</b> shows up in stories from many cultures and eras."],
      ["Examples", "Courage in the face of fear · The cost of greed · Love of family · Good versus evil · Growing up and finding yourself"],
      ["Compare", "To find a shared theme, strip away names and places and ask: what does this story say about life?"])));

  L18.push(mk("Hero, mentor, trickster: archetypes", rq([
      ["A wise older guide who helps the hero is a...", "mentor", "trickster", "villain"],
      ["A character who plays tricks and breaks rules for fun is a...", "trickster", "mentor", "hero"],
      ["A brave character who leaves home to face a challenge is the...", "hero", "villain", "mentor"],
      ["A character who opposes the hero is the...", "villain", "mentor", "hero"],
      ["Anansi the spider in West African folktales is a famous...", "trickster", "mentor", "villain"],
      ["A fairy godmother who helps Cinderella is acting as a...", "mentor", "trickster", "villain"],
      ["The hero's journey often begins with a...", "call to adventure", "final feast", "long nap"],
      ["After tests and challenges, the hero often returns home...", "changed", "exactly the same", "with no memory"],
      ["An <b>archetype</b> is...", "a pattern or character type found in stories everywhere", "a one-time character", "a poem form"],
      ["A loyal friend who stays beside the hero is a...", "sidekick", "villain", "trickster"]],
    ["Ask what job the character does in the story: guide, challenger, joker, friend or leader?", "Archetypes are patterns that repeat in stories from all over the world. Match the role to the pattern.", "Example: A fox in a folktale who outsmarts bigger animals by playing jokes fits the joker-with-a-plan pattern. Now do yours."]),
    S("🗡️", ["Patterns in characters", "Story characters often follow <b>archetypes</b>, patterns found around the world."],
      ["Common ones", "<b>Hero</b>: leaves home to face a challenge<br><b>Mentor</b>: wise guide<br><b>Trickster</b>: clever rule-breaker<br><b>Villain</b>: opposes the hero<br><b>Sidekick</b>: loyal helper"],
      ["The hero's journey", "Call to adventure → tests and helpers → big challenge → return, changed."])));

  L18.push(mk("Voice, diction and syntax", rq([
      ["<b>Diction</b> is...", "an author's choice of words", "the number of paragraphs", "the story's setting"],
      ["<b>Syntax</b> is...", "how words are arranged into sentences", "a poem's rhyme", "the author's age"],
      ["An author's <b>voice</b> is...", "the unique personality that comes through the writing", "the volume of a reading", "the title"],
      ["Which sentence has more formal diction?", "The committee will convene at noon.", "The group's gonna meet at noon."],
      ["Which uses short, choppy syntax to create tension?", "He ran. Stopped. Listened. Nothing.", "He ran through the forest and, after a while, paused to listen carefully for any sounds that might be near."],
      ["Which is the most casual diction?", "That movie was totally awesome!", "The film was highly commendable."],
      ["Long, winding sentences often create a feeling of...", "calm or reflection", "sudden danger", "confusion about the facts"],
      ["A writer chooses <i>stroll</i> instead of <i>walk</i> to...", "give a relaxed, leisurely feeling", "make the sentence longer", "confuse readers"],
      ["An author with a playful voice might...", "use jokes, surprising words and lively rhythm", "use only statistics", "avoid all adjectives"],
      ["Changing 'The dog ate the bone' to 'The bone was eaten by the dog' changes the...", "syntax", "diction", "setting"]],
    ["Ask: is this about the words chosen, how the sentences are built, or the overall personality?", "Diction = word choice. Syntax = sentence structure and length. Voice = the mix of both that makes a writer sound like themselves.", "Example: 'Kid' versus 'child' is a difference in word choice. 'Rain fell. Hard.' versus 'The rain fell heavily on the roof' is a difference in sentence structure. Now do yours."]),
    S("🎨", ["How a writer sounds", "Three tools shape a writer's style: <b>diction</b>, <b>syntax</b> and <b>voice</b>."],
      ["Definitions", "<b>Diction</b>: the words chosen (formal, casual, sharp).<br><b>Syntax</b>: how sentences are built (short, long, questions).<br><b>Voice</b>: the personality that results."],
      ["Effects", "Short sentences speed things up. Long ones slow down. Fancy words sound formal. Slang sounds friendly or casual."])));

  L18.push(mk("Audience, purpose and occasion", rq([
      ["The <b>audience</b> of a text is...", "the people who read or hear it", "the writer's goal", "the place where it is stored"],
      ["The <b>purpose</b> of a text is...", "why the author writes it", "who reads it", "its length"],
      ["The <b>occasion</b> of a speech is...", "the event or situation that prompts it", "the title", "the number of listeners"],
      ["You are explaining recycling to first graders. Which style fits best?", "simple words and short sentences with examples", "long technical terms", "slang only"],
      ["You are writing a request to the city council. Which tone fits?", "respectful and formal", "jokey and casual", "angry and rude"],
      ["A letter that urges readers to adopt shelter dogs has which main purpose?", "to persuade", "to entertain", "to give directions"],
      ["Which detail should you add for readers who have never seen snow?", "describe how snow looks and feels", "assume they already know", "skip all details"],
      ["A thank-you speech at a retirement party is likely to be...", "warm and personal", "cold and technical", "full of statistics"],
      ["You tell the same news in a text to a friend and in an email to your boss. What changes?", "the tone and word choice", "the facts of the event", "the number of letters"]],
    ["Ask who is reading or listening, why the text exists, and what event or situation led to it.", "Match the style to the audience: simple for young readers, formal for officials, personal for friends. Match the content to the purpose: inform, persuade or entertain.", "Example: A recipe for a young cook should use easy steps and safety tips. The audience (a beginner) shapes the writing. Now do yours."]),
    S("🎯", ["Fit the message", "Good writers think about three things before they write: <b>audience, purpose, occasion</b>."],
      ["Three questions", "<b>Audience</b>: who will read it?<br><b>Purpose</b>: why am I writing (inform, persuade, entertain)?<br><b>Occasion</b>: what event is it for?"],
      ["Adjust", "Change your words, tone and details to suit the audience and purpose."])));

  L18.push(mk("Choosing the right source", rq([
      ["To learn how volcanoes form, the best source is...", "a science textbook or museum website", "a joke forum", "a stranger's comment"],
      ["To learn yesterday's weather in your town, the best source is...", "a weather service's records", "a friend's memory", "a cartoon"],
      ["To find today's game score, the best source is...", "the league's live scoreboard", "last year's yearbook", "an old atlas"],
      ["To learn about ancient Rome's history, the best source is...", "a book by a historian", "a movie ad", "a rumor"],
      ["<b>Currency</b> of a source means...", "how up to date the information is", "how much it costs", "how long it is"],
      ["<b>Authority</b> of a source means...", "whether the author is qualified on the topic", "whether the page is colorful", "the number of pages"],
      ["A page that sells a product might be biased because...", "the author wants you to buy it", "it uses long words", "it has pictures"],
      ["For current events, the best choice is...", "recent articles from established news organizations", "a textbook from 1990", "a social post with no author"],
      ["Who is best qualified to explain how bones heal?", "a bone doctor", "a game designer", "a travel writer"],
      ["A 2005 book about a 2025 rule is probably...", "out of date", "up to date", "a primary source"]],
    ["Ask what you need to know, and who would know it best.", "Check four things: Is the author qualified? Is the information recent enough? Does the author want to sell or persuade? Can the facts be checked in other places?", "Example: To learn about a local park's opening hours, the park's own website is better than a rumor. Now do yours."]),
    S("🧭", ["Pick sources wisely", "Not all sources are equal. A good researcher chooses carefully."],
      ["Checklist", "<b>Authority</b>: is the author qualified?<br><b>Currency</b>: is it up to date?<br><b>Purpose</b>: is it trying to sell or persuade?<br><b>Accuracy</b>: can the facts be checked?"],
      ["Match source to question", "Weather data for weather, a historian for history, a live scoreboard for today's score."])));

  L18.push(mk("Instructions, manuals and warnings", rq([
      ["Where in a manual would you find the meaning of a special word?", "the glossary", "the cover", "the warranty"],
      ["Which part lists chapters in order at the front of a book?", "the table of contents", "the index", "the appendix"],
      ["Which part is an alphabetical list at the back that shows page numbers for topics?", "the index", "the table of contents", "the title page"],
      ["A line that starts with WARNING means...", "there is a danger, so follow it carefully", "this is optional", "this is a joke"],
      ["A 'note' in instructions gives...", "extra helpful information", "a rule that you must ignore", "the price"],
      ["The steps say: 1. Plug in the lamp. 2. Flip the switch. 3. If the bulb stays dark, replace it. What should you do if the bulb stays dark?", "replace the bulb", "unplug the wall", "buy a new lamp"],
      ["Why are steps in instructions numbered?", "they should be done in order", "they are in random order", "only the last matters"],
      ["Steps in instructions usually begin with...", "a command verb like 'Press' or 'Insert'", "a long story", "a question"],
      ["A <b>caution</b> label tells you to...", "be careful to avoid a problem", "ignore the item", "skip to the end"],
      ["A diagram in a manual helps by...", "showing what the parts look like and where they go", "making the book thicker", "replacing every word"]],
    ["Think about what each part of a manual is for, and read the steps in order.", "Manuals use headings, numbered steps, diagrams and labeled warnings so you can find and follow information safely.", "Example: A recipe card with numbered steps: you must follow step 2 before step 3. Order matters. Now do yours."]),
    S("🔧", ["Reading instructions", "Manuals and how-to texts have special <b>features</b> that help you do things safely and correctly."],
      ["Features", "<b>Numbered steps</b> · <b>Diagrams</b> · <b>Table of contents</b> · <b>Index</b> · <b>Glossary</b>"],
      ["Labels", "<b>Note</b>: extra info.<br><b>Caution</b>: be careful.<br><b>Warning</b>: danger, follow exactly."])));

  L18.push(mk("Untangling long sentences", pq([
      ["The old lighthouse, which had stood on the cliff for two hundred years, finally went dark.", "What went dark?", "the lighthouse", "the cliff", "two hundred years"],
      ["Although the storm was fierce, the sailors, who had trained for months, brought the ship home.", "What did the sailors do?", "brought the ship home", "trained for months", "were fierce"],
      ["Because she wanted to be ready, Lena, a determined girl, studied every night.", "Who studied every night?", "Lena", "a determined girl", "the ready one"],
      ["The book that my aunt gave me for my birthday was about whales.", "What was the book about?", "whales", "birthdays", "my aunt"],
      ["When the music stopped and the lights came on, everyone clapped.", "What did everyone do?", "clapped", "stopped the music", "turned on the lights"],
      ["The scientist who discovered the new plant in the remote valley published her findings in a famous journal.", "What did the scientist do?", "published her findings", "discovered a valley", "visited a journal"],
      ["Despite the heavy rain that fell throughout the afternoon, the festival, which had been planned for months, went ahead.", "What went ahead?", "the festival", "the rain", "the afternoon"],
      ["", "In a long sentence, the main clause is the part that...", "could stand alone as a sentence", "begins with because or although", "is set off by commas"]].map(r => r[0] ? r : ["", r[1], r[2], r[3], r[4]]),
    ["Find the main subject and main verb first. Who or what is the sentence mostly about, and what do they do?", "Cross out extra phrases set off by commas or beginning with words like <i>which, although, when</i>. What is left is the core.", "Example: 'The cat, which was sleeping on the warm porch, woke up.' Cross out the middle phrase: 'The cat woke up.' Now do yours."]),
    S("🧶", ["Sort out the knots", "Long sentences pile extra information around a short <b>core</b>."],
      ["Find the core", "Ask <b>who/what</b> (subject) and <b>did what</b> (verb). Cross out the extra phrases."],
      ["Example", "'The old lighthouse, which stood on the cliff, went dark.' → <b>The lighthouse went dark.</b>"])));

  const CER = [
    ["Students should read every day.", "Daily reading exposes readers to thousands of new words each year.", "A bigger vocabulary helps students understand harder texts, so daily reading builds skills for every class."],
    ["Cities should plant more trees.", "Trees give shade that can cool streets by several degrees.", "Cooler streets mean less need for air conditioning, so trees save energy and make summers easier."],
    ["Sleep is important for learning.", "While we sleep, the brain stores the day's memories.", "Without enough sleep, memories are stored poorly, so students who sleep well remember more."],
    ["Libraries are still important today.", "Libraries lend books, computers and quiet study space for free.", "Because many families cannot buy these things, libraries give everyone the same chance to learn."],
    ["Walking to school is good for kids.", "Walking is exercise that gets the heart pumping.", "Regular exercise keeps bodies healthy and helps students focus, so walking benefits them in class."],
    ["Zoos can help save species.", "Some zoos breed endangered animals and return them to the wild.", "Returning animals adds to wild populations, which helps the species survive."]];
  const cerMake = () => {
    const r = pick(CER), roles = ["claim", "evidence", "reasoning"];
    const hs = ["Ask what each sentence is doing: stating a point, giving a fact, or explaining why the fact matters?", "A claim is a point that can be argued. Evidence is a fact or detail that can be checked. Reasoning explains how the evidence supports the claim, often using words like <i>because</i> or <i>so</i>.", "Example: 'Bikes are great.' (claim) 'Biking burns calories.' (evidence) 'Burning calories keeps people healthy, so biking is good for everyone.' (reasoning). Now do yours."];
    const k = ri(0, 2);
    if (ri(1, 2) === 1) return { text: "<i>" + r[0] + " " + r[1] + " " + r[2] + "</i><br><br>Which sentence is the <b>" + roles[k] + "</b>?", choices: shuf(r.slice()), answer: r[k], hints: hs };
    return { text: "<i>" + r[0] + " " + r[1] + " " + r[2] + "</i><br><br>The sentence “" + r[k] + "” is the...", choices: shuf(roles.slice()), answer: roles[k], hints: hs };
  };
  L18.push(mk("Claim, evidence, reasoning", cerMake,
    S("🧱", ["Building a strong paragraph", "A strong paragraph has three jobs: <b>claim</b>, <b>evidence</b> and <b>reasoning</b>."],
      ["The three parts", "<b>Claim</b>: your main point.<br><b>Evidence</b>: a fact, number or quote that backs it up.<br><b>Reasoning</b>: why the evidence proves the claim."],
      ["Example", "Claim: Reading helps. Evidence: Readers meet thousands of new words. Reasoning: More words help you understand harder texts."])));

  L18.push(mk("Reading a sonnet", rq([
      ["A sonnet has how many lines?", "14", "12", "16"],
      ["A Shakespearean sonnet is made of three quatrains and a...", "couplet", "tercet", "stanza of six lines"],
      ["The usual rhyme scheme of the first quatrain in a Shakespearean sonnet is...", "ABAB", "AABB", "ABCD"],
      ["The <b>volta</b> in a sonnet is...", "the turn where the thought or tone shifts", "the last rhyme", "the title"],
      ["A Petrarchan sonnet splits into an octave and a sestet. How many lines in the octave?", "8", "6", "4"],
      ["Most English sonnets use which meter?", "iambic pentameter", "free verse", "haiku syllables"],
      ["How many syllables are in a normal line of iambic pentameter?", "10", "8", "12"],
      ["The final couplet of a Shakespearean sonnet usually...", "wraps up or comments on the poem's idea", "starts a new subject", "repeats the title only"],
      ["Which rhyme scheme fits a whole Shakespearean sonnet?", "ABAB CDCD EFEF GG", "AABB CCDD EEFF GG", "ABCD ABCD ABCD AB"],
      ["In a Petrarchan sonnet, how many lines make the sestet?", "6", "8", "2"]],
    ["Think about the shape of the poem: how many lines, how they group, and where the thought turns.", "A sonnet has a set shape: lines grouped into smaller units, a pattern of rhymes, and a turn in the thought.", "Example: A haiku has three lines of 5, 7 and 5 syllables. Counting the shape is how you recognize a form. Now do yours."]),
    S("🪶", ["The sonnet shape", "A <b>sonnet</b> is a short poem with a strict shape."],
      ["Shakespearean", "Three quatrains (4 lines each) plus a couplet. Rhymes: ABAB CDCD EFEF GG."],
      ["Petrarchan and the turn", "An octave (8 lines) and a sestet (6 lines). Both kinds have a <b>volta</b>, a turn in thought. Lines use iambic pentameter."])));

  L18.push(mk("Reading Shakespeare's language", rq([
      ["In old plays, <b>thou</b> means...", "you", "they", "who"],
      ["In old plays, <b>thy</b> means...", "your", "my", "their"],
      ["In old plays, <b>hath</b> means...", "has", "hates", "hurts"],
      ["In old plays, <b>wherefore</b> means...", "why", "where", "whether"],
      ["In old plays, <b>ere</b> means...", "before", "here", "ever"],
      ["In old plays, <b>hither</b> means...", "here", "there", "never"],
      ["What does 'Thou hast a kind heart' mean?", "You have a kind heart.", "He has a kind heart.", "You had a kind heart."],
      ["What does 'Wherefore dost thou weep?' mean?", "Why do you cry?", "Where do you sleep?", "Who will you tell?"],
      ["What does 'Art thou ready?' mean?", "Are you ready?", "Is it art?", "Who is ready?"],
      ["What does 'I shall return anon' mean?", "I will return soon.", "I will never return.", "I returned yesterday."],
      ["What does 'Come hither' mean?", "Come here.", "Go away.", "Come tomorrow."],
      ["Shakespeare's plays are mostly written in...", "verse (poetry-like lines)", "text messages", "newspaper style"]],
    ["Read it aloud and think about which modern word sounds like it, or what the sentence is trying to do.", "The old words are mostly old forms of pronouns and of the verbs <i>to be</i>, <i>to have</i> and <i>to do</i>. Say the sentence in modern English, word by word, keeping the ones you already know.", "Example: 'Whence comest thou?' means 'Where do you come from?' (whence = from where). Now do yours."]),
    S("🎭", ["Old English in plays", "Shakespeare lived about 400 years ago. Some words he used are no longer common."],
      ["Old pronouns", "<b>thou/thee</b> = you · <b>thy/thine</b> = your · <b>art</b> = are · <b>hath</b> = has · <b>doth</b> = does"],
      ["More words", "<b>wherefore</b> = why · <b>hither</b> = here · <b>thither</b> = there · <b>ere</b> = before · <b>anon</b> = soon"])));

  L18.push(MIX("Mixed practice", L18[0], L18[3], L18[5], L18[8], L18[10], L18[12]));
  L18.push(MIX("Level 18 Challenge", L18[1], L18[2], L18[4], L18[6], L18[7], L18[9], L18[11], L18[14], L18[15], L18[17]));

  Object.assign(READING_LEVELS, { 16: L16, 17: L17, 18: L18 });
})();
