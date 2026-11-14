// ext/writing-28-30.js  Mind Lab Writing & Grammar, levels 28-30 (60 lessons)
(() => {
  // rows: "question|answer|wrong1|wrong2|..." (no | inside text)
  const mk = (title, vis, rows, hints, slides) => {
    const rs = rows.map(r => r.split("|"));
    const make = () => {
      const [text, ans, ...wr] = pick(rs);
      return { text, visual: vis, choices: shuf([ans, ...wr]), answer: ans, hints: hints.slice() };
    };
    make.teach = () => slides.map(([h, v, t]) => ({ h, v, t }));
    return { title, make };
  };
  const MIX = (title, ...ls) => {
    const f = () => pick(ls).make();
    f.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here is a quick reminder of each idea, then the quiz." }].concat(ls.map(l => l.make.teach()[0]));
    return { title, make: f };
  };

  // =============== LEVEL 28 ===============
  const A1 = mk("Logos and pathos", "⚖️", [
    "An appeal built on statistics and a clear chain of reasons is mainly...|logos|pathos|ethos",
    "A story about one patient's struggle, told to move readers, is mainly...|pathos|logos|kairos",
    "Which sentence leans on logos?|Tests show the new lamp uses 40 percent less power.|Think of the children who sit in the dark.|Trust me, I am a lamp expert.",
    "Which sentence leans on pathos?|Picture her small hands shaking in the cold.|The rate fell from 9 percent to 6 percent.|If A is larger than B, and B is larger than C, A is larger than C.",
    "Too much pathos with no evidence can make an argument seem...|manipulative|too logical|too short",
    "Which pairing is right?|logos: reason, pathos: emotion|logos: emotion, pathos: reason|logos: speaker, pathos: timing",
    "A cause-and-effect chain with clear steps is a use of...|logos|pathos|a style sheet",
    "Vivid sensory details meant to stir pity or hope appeal to...|pathos|logos|a warrant"],
    ["Ask whether the sentence tries to persuade through reasoning and evidence, or through feeling.", "Logos appeals to logic and evidence (numbers, reasons, clear steps). Pathos appeals to the audience's emotions (stories, vivid images, values).", "Example: 'Seatbelts cut deaths by about half' is evidence; 'Imagine the empty chair at dinner' stirs feeling. Now do yours."],
    [["Two classic appeals", "⚖️", "Aristotle named three ways to persuade. <b>Logos</b> is reason and evidence. <b>Pathos</b> is emotion."], ["Spot them", "🔍", "Numbers, definitions and step-by-step reasons are logos. Stories, vivid images and loaded values are pathos."], ["Balance", "🤝", "Strong writing mixes them. Emotion with no evidence feels manipulative; evidence with no feeling can leave readers cold."]]);

  const A2 = mk("Kairos and exigence", "⏰", [
    "<b>Kairos</b> means...|the right moment to make an argument|a type of evidence|a punctuation mark",
    "<b>Exigence</b> is...|the problem or need that prompts someone to write|the final paragraph|a citation style",
    "A letter about snow removal sent in July has poor...|kairos|exigence only|grammar only",
    "A flood damages a town, and a resident writes to the council asking for repairs. The flood is the...|exigence|thesis|appendix",
    "Why does timing matter in persuasion?|The same message can land well or badly depending on the moment|Timing never changes how readers respond|Only the font matters",
    "Which is a strong sense of kairos?|Proposing a recycling plan right after the city announces a budget review|Sending the plan a year after the vote|Never sending the plan",
    "The rhetorical situation includes writer, audience, purpose and...|context|spelling|keyboard",
    "A writer asks, 'Why now?' This question is about...|kairos and exigence|word count|font choice"],
    ["Think about the moment and the reason behind a text, not its grammar.", "Exigence is the need or problem that calls for a response. Kairos is the fitting or opportune moment to respond.", "Example: A school bans phones; a student writes an essay about it the same week. The ban is the exigence, and the week is good timing. Now do yours."],
    [["Why now?", "⏰", "Every piece of writing answers some pressing need. That need is its <b>exigence</b>."], ["The right moment", "🎯", "<b>Kairos</b> is Greek for the opportune moment. A good argument arrives when audiences can act on it."], ["Rhetorical situation", "🧩", "Writer, audience, purpose, context, exigence and kairos together shape what you say and how you say it."]]);

  const A3 = mk("Introductions that hook", "🪝", [
    "Which is a common way to open an essay?|A striking fact, question or short anecdote tied to the topic|A dictionary definition of every word|An apology for writing",
    "Which opening is weakest?|Since the dawn of time, humans have communicated.|Last winter, my town's only clinic closed overnight.|Fewer than half of first-year students read the syllabus.",
    "An introduction usually moves from...|broad context to a specific thesis|thesis to a hook to a title|evidence to a conclusion",
    "A good hook should be...|relevant to the thesis|as dramatic as possible|unrelated but funny",
    "Which opening is the most specific?|In 2019, one county library cut hours and saw checkouts drop by a third.|Libraries are important.|Many people use libraries.",
    "Why avoid starting with 'Webster's Dictionary defines...'?|It is overused and rarely adds insight|Dictionaries are banned|It makes the paper too long",
    "The sentence that tells the reader your main claim is the...|thesis|hook|bibliography",
    "A road map sentence in an introduction...|previews the order of main points|lists all your sources|repeats the title"],
    ["Think about what an introduction must do: attract, set context, and state a claim.", "A good opening is specific and connected to your argument. Clichés and vague statements about all of history do not earn the reader's attention.", "Example: 'Since forever, people have eaten' is vague; 'The average school lunch gets 20 minutes' is concrete. Now do yours."],
    [["Hook and context", "🪝", "Open with something concrete: a fact, a short story, a question. Then widen into the context your reader needs."], ["Avoid the cliché", "🚫", "'Since the dawn of time' and dictionary openers say little. Be specific."], ["Land on the thesis", "🎯", "The introduction narrows to your thesis, often followed by a brief road map."]]);

  const A4 = mk("Conclusions that matter", "🏁", [
    "A strong conclusion answers the question...|So what? Why does this matter?|What is my name?|How long is this?",
    "Which should a conclusion avoid?|Introducing a brand-new major argument|Restating the main idea in fresh words|Showing the larger significance",
    "Merely copying the thesis word for word is...|a weak conclusion|the best practice|required",
    "A conclusion can end by...|pointing to implications or next steps|adding a new unrelated source|apologizing",
    "Which closing sentence has the most impact?|If towns skip this step, the next flood will find them unready.|In conclusion, this essay was about floods.|That is all I have to say.",
    "Which closing line feels the emptiest?|In conclusion, I have shown that I wrote an essay.|These findings suggest a wider change is needed.|Seen this way, the problem looks different.",
    "Synthesis in a conclusion means...|bringing the points together into a larger insight|listing each paragraph in order|quoting the introduction",
    "A conclusion that circles back to the opening image creates...|a sense of closure|a grammar error|plagiarism"],
    ["Think about what the reader should take away after the last paragraph.", "A conclusion pulls the points together and shows significance. It should not add a new major argument or just repeat the thesis word for word.", "Example: Instead of repeating 'School lunch is short,' write 'Longer lunches may be the cheapest way to help students learn.' Now do yours."],
    [["More than a summary", "🏁", "The conclusion answers <b>so what?</b> It shows why the argument matters."], ["Do and don't", "✅", "Do synthesize, point to implications, or return to your opening image. Don't introduce a new big claim or just copy your thesis."], ["Strong last line", "🔔", "End on something memorable and specific, not 'In conclusion, I have written an essay.'"]]);

  const A5 = mk("Parallel structure", "🪜", [
    "Which sentence is parallel?|She likes hiking, swimming and reading.|She likes hiking, to swim and reading.|She likes to hike, swimming and read.",
    "Which fixes <i>He wanted to eat, to sleep, and playing games.</i>?|He wanted to eat, to sleep and to play games.|He wanted eat, sleep and play games.|He wanted eating, sleeping and to play.",
    "Parallel structure means...|matching grammatical form for similar ideas|using the same word every time|writing short sentences",
    "Which is parallel?|The report was clear, brief and accurate.|The report was clear, brief and it had accuracy.|The report was clearly, briefly and accurate.",
    "Which is parallel?|Not only did she write the plan, but she also presented it.|Not only did she write the plan, but also presenting it.|Not only writing the plan, but she presented it.",
    "Parallelism matters most in...|lists and paired ideas|titles only|page numbers",
    "Which is parallel?|Applicants must submit a résumé, a letter and two references.|Applicants must submit a résumé, writing a letter and two references.|Applicants must submit résumés, a letter, and to give two references.",
    "<i>The coach told us to stretch, hydrate, and that we should rest.</i> What is the problem?|The last item breaks the pattern|The commas are missing|The verb is the wrong tense"],
    ["Look at each item in the list. Do they all start the same way grammatically?", "Parallel structure gives items in a list or pair the same grammatical form: all -ing words, all infinitives, or all nouns. Change the odd one out.", "Example: 'She enjoys painting, to dance, and sings' becomes 'She enjoys painting, dancing and singing.' Now do yours."],
    [["Same shape", "🪜", "Items in a series should have the same form: all nouns, all -ing words, or all infinitives."], ["Spot the odd one", "🔍", "If one item changes form, the sentence feels bumpy. Rewrite it to match the others."], ["Pairs too", "🔗", "With both...and, either...or, not only...but also, match what follows each part."]]);

  const A6 = mk("Misplaced and dangling modifiers", "🧲", [
    "Which has a dangling modifier?|Walking to class, the rain began.|Walking to class, I felt the rain begin.|While I walked to class, the rain began.",
    "Which fixes <i>Reading the report, the errors were obvious.</i>?|Reading the report, I found the errors obvious.|Reading the report, the errors obvious.|The errors reading the report were obvious.",
    "A misplaced modifier is...|a modifier too far from the word it describes|a missing comma|a wrong verb",
    "Which is clear?|She served sandwiches on paper plates to the guests.|Eating lunch, the dog barked at me.|Covered in frosting, the baker handed me the cake.",
    "Which sentence is clear?|The student, tired from the long exam, left early.|Tired from the long exam, the bell rang.|Left early, the exam tired the student.",
    "Dangling means...|the word being described is missing from the sentence|the modifier is too long|the punctuation is wrong",
    "Which fixes <i>Running for the bus, my backpack fell off.</i>?|Running for the bus, I dropped my backpack.|Running for the bus, my backpack dropped.|My backpack, running for the bus, fell off.",
    "<i>He almost drove for six hours.</i> Which rewrite says he drove nearly six hours?|He drove for almost six hours.|He drove almost for six hours.|Almost, he drove six hours."],
    ["Ask: who or what is doing the action in the opening phrase? Does the sentence name that person?", "An opening phrase needs the right subject right after the comma. Move the modifier next to its target or rewrite so the doer appears.", "Example: 'Opening the door, the cat ran out' makes the cat the door-opener. Better: 'When I opened the door, the cat ran out.' Now do yours."],
    [["Modifiers need a partner", "🧲", "A modifier should sit right next to the word it describes."], ["Dangling", "🪝", "Dangling means the word it should describe is missing: 'Walking home, the sun set' has no walker."], ["Fix it", "🛠️", "Add the doer right after the comma, or turn the opening phrase into a full clause."]]);

  const A7 = mk("Semicolons and colons", "⏸️", [
    "A semicolon can join...|two closely related independent clauses|a verb and its subject|any two words",
    "Which is correct?|We packed light; the trip was only two days.|We packed light; because the trip was short.|We packed; light the trip.",
    "A colon after a full sentence can introduce...|a list, quote or explanation|a new paragraph only|a question mark",
    "Which uses a colon correctly?|The recipe needs three things: flour, eggs and milk.|The recipe needs: flour, eggs and milk.|Flour, eggs and milk: the recipe needs three things.",
    "Items in a list that already contain commas are best separated by...|semicolons|colons|dashes only",
    "Which uses a semicolon correctly in a list?|We visited Lyon, France; Turin, Italy; and Porto, Portugal.|We visited Lyon, France, Turin, Italy, Porto, and Portugal.|We visited: Lyon, France; and Turin.",
    "Which is incorrect?|The tools were: a hammer, a saw and nails.|Three tools were needed: a hammer, a saw and nails.|The tools needed were simple: a hammer, a saw and nails.",
    "After a semicolon, a word like 'however' is usually followed by...|a comma|a colon|nothing"],
    ["Check what comes before the mark. Could it stand alone as a sentence?", "A semicolon joins two complete, related sentences, or separates list items that contain commas. A colon follows a complete sentence and introduces what the sentence promised.", "Example: 'The soup was cold; we asked for another bowl.' Both halves stand alone. Now do yours."],
    [["Semicolon", "⏸️", "Use <b>;</b> between two related independent clauses, or to organize a list whose items have commas."], ["Colon", "👉", "Use <b>:</b> after a complete sentence to introduce a list, quote or explanation."], ["Watch out", "⚠️", "Do not put a colon right after a verb or 'such as.' Do not use a semicolon before a dependent clause."]]);

  const A8 = mk("Zombie nouns", "🧟", [
    "A <b>nominalization</b> is...|a verb or adjective turned into a noun|a proper noun|a plural form",
    "Which rewrite is stronger for <i>We made a decision about the purchase of the equipment.</i>?|We decided to buy the equipment.|There was a decision regarding purchase.|The purchase decision of equipment was made.",
    "Which is the nominalization in <i>The investigation of the error took weeks</i>?|investigation|error|weeks",
    "Too many nominalizations can make prose...|abstract and heavy|too lively|too short",
    "Turn <i>conduct an analysis of the data</i> into a verb phrase.|analyze the data|do analysis data|make data an analysis",
    "Which version is clearer?|The committee approved the plan.|The approval of the plan was given by the committee.|Plan approval occurred by the committee.",
    "Nominalizations are useful when...|a noun summarizes a previous idea, as in 'This decision...'|you want fewer verbs always|you write poetry only",
    "Which word is a zombie noun?|implementation|dog|quickly"],
    ["Look for a verb hiding inside a long noun, such as one ending in -tion, -ment or -ance.", "Turn the abstract noun back into a verb and let the real actor be the subject. Keep a nominalization only when it helps link ideas.", "Example: 'The utilization of tools by workers' becomes 'Workers use tools.' Now do yours."],
    [["Verbs in disguise", "🧟", "A <b>nominalization</b> turns an action into a noun: decide becomes decision, analyze becomes analysis."], ["Rewrite", "✍️", "Find the buried verb, make the doer the subject. 'We performed an evaluation' becomes 'We evaluated.'"], ["Not always bad", "⚖️", "A noun like 'this decision' can neatly sum up an earlier sentence. Use them on purpose."]]);

  const A9 = mk("Compare and contrast structure", "🔀", [
    "In a <b>block</b> structure, you...|discuss all of A, then all of B|alternate point by point|write only similarities",
    "In a <b>point-by-point</b> structure, you...|compare A and B on one point, then the next point|describe A fully before B|only contrast",
    "Which structure makes direct comparisons easiest to see?|point-by-point|block|neither",
    "A compare-and-contrast thesis should do more than...|list similarities and differences|make a claim|state significance",
    "Which thesis is strongest?|Although both programs teach coding, the online course builds independence while the class builds teamwork.|The two programs are alike and different.|There are many similarities and differences.",
    "Words that signal contrast include...|however, whereas, in contrast|similarly, likewise, also|first, next, finally",
    "Words that signal similarity include...|likewise, similarly, both|however, but, yet|therefore, thus, hence",
    "Why compare two things at all?|To show something new about both|To make the essay longer|To avoid a thesis"],
    ["Think about how the paragraphs are organized: by subject, or by shared points?", "Block structure covers one subject at a time. Point-by-point structure moves back and forth on each point of comparison. Either way, end with a claim about why the comparison matters.", "Example: Comparing cats and dogs on cost, then time, then space is point-by-point. Now do yours."],
    [["Two layouts", "🔀", "<b>Block</b>: all about A, then all about B. <b>Point-by-point</b>: cost for both, then time for both."], ["Signal words", "🚦", "Use 'similarly' and 'both' for likeness. Use 'however', 'whereas' and 'in contrast' for difference."], ["So what?", "💡", "A strong thesis says what the comparison reveals, not just that there are differences."]]);

  const A10 = mk("Analysis, not plot summary", "📖", [
    "Which sentence analyzes?|The repeated storms mirror the narrator's growing fear.|The narrator walks to the shore, then goes home.|The book has twelve chapters.",
    "Plot summary tells...|what happens|why it matters|how it is written",
    "Analysis answers...|how and why a text works|only who the characters are|the page count",
    "Which claim is interpretive?|The empty house symbolizes the family's loss.|The house has two floors.|The family lives in a house.",
    "In a literature essay, summary should be...|brief and in support of the claim|the main body|the whole essay",
    "Which sentence is a plot summary?|First, Mia finds a map, and then she follows it to the lighthouse.|The map represents Mia's search for belonging.|The lighthouse glows to suggest hope.",
    "To move from summary to analysis, ask...|What does this detail suggest, and why does the author include it?|What happens next?|Who is the author's neighbor?",
    "A close reading focuses on...|specific words, images and structure|the cover art|the author's biography only"],
    ["Decide whether the sentence only retells events or explains meaning and technique.", "Summary says what happens. Analysis explains how choices of language, imagery and structure create meaning. Use plot only to support an interpretive claim.", "Example: 'The boy leaves the village' is summary; 'His silent exit shows how little he feels at home' is analysis. Now do yours."],
    [["Summary vs analysis", "📖", "Summary says <b>what</b> happens. Analysis explains <b>how and why</b> the text makes its effect."], ["Ask questions", "❓", "Why this word? What does this image suggest? What changes after this scene?"], ["Use plot as support", "🧱", "Include only the events your claim needs, then interpret them."]]);

  const A11 = mk("The quote sandwich", "🥪", [
    "In a quote sandwich, the quotation sits between...|your introduction and your explanation|two quotations|a title and a heading",
    "After a quotation, you should...|explain what it shows and link it to your claim|move to a new topic silently|repeat it word for word",
    "What does a lead-in (signal) do?|Introduces who said it or why it matters|Replaces the quote|Hides the source",
    "A 'dropped' quotation is one that...|stands alone with no lead-in or explanation|is too short|has a citation",
    "Which is the best sequence?|Claim, introduction of quote, quote, explanation|Quote, quote, claim|Explanation, title, quote",
    "Why explain a quote after giving it?|Readers need your interpretation, not just the evidence|It adds length|Quotes are always unclear",
    "Which lead-in is strongest?|As the study's author notes,|Quote:|Here it is.",
    "If a quote is long and you need only part, you can...|quote only the key words and blend them into your sentence|cut random words without marks|paraphrase and call it a quote"],
    ["Think about what comes before and after the quotation to help the reader.", "Introduce the quotation, give it, then analyze it. Your explanation shows how the evidence supports your claim.", "Example: Smith argues schools lack funds. She states that many labs have no equipment. This shows the shortage is practical, not abstract. Now do yours."],
    [["The sandwich", "🥪", "Top bun: a lead-in. Filling: the quotation. Bottom bun: your explanation."], ["No dropped quotes", "🚫", "A quote on its own leaves the reader guessing. Say who, why, and what it shows."], ["Blend", "🔗", "Often, short quoted words fit smoothly into your own sentence."]]);

  const A12 = mk("Primary, secondary, tertiary sources", "🗃️", [
    "A diary written during the event is a...|primary source|secondary source|tertiary source",
    "A historian's book analyzing the diary is a...|secondary source|primary source|tertiary source",
    "An encyclopedia entry summarizing many studies is typically a...|tertiary source|primary source|raw data",
    "Which is a primary source?|A recorded interview with a witness|A textbook chapter|A magazine review of the interview",
    "Which is a secondary source?|A journal article interpreting old letters|The letters themselves|A photograph taken at the event",
    "Raw data from your own experiment is...|primary|tertiary|secondary",
    "For original evidence, you would prefer a...|primary source|tertiary source|summary of a summary",
    "Which is a tertiary source?|A handbook that lists key facts from many studies|An original speech|A researcher's own survey results"],
    ["Ask how close the source is to the event or data: original, interpretation of the original, or a summary of interpretations?", "Primary sources are firsthand evidence. Secondary sources analyze primary ones. Tertiary sources collect and summarize, like encyclopedias and handbooks.", "Example: A soldier's letter is primary; a book about the war is secondary; a timeline reference book is tertiary. Now do yours."],
    [["Three levels", "🗃️", "<b>Primary</b>: firsthand (letters, data, interviews). <b>Secondary</b>: analysis of primary sources. <b>Tertiary</b>: summaries like encyclopedias."], ["Depends on the question", "🔍", "A newspaper article can be primary for a study of how the news reported an event, and secondary for the event itself."], ["Use them together", "🧩", "Strong research layers primary evidence with expert secondary interpretation."]]);

  const A13 = mk("Research questions", "❔", [
    "Which is the strongest research question?|How did the 2016 library hours change affect teen borrowing in our county?|What is a library?|Are libraries good?",
    "A good research question is...|focused, researchable and open to analysis|answerable with yes or no|about everything",
    "Which question is too broad?|What causes pollution?|How does road salt change the chemistry of Lake Erie streams?|How did the 1970 act change factory emissions in Ohio?",
    "Which question can be answered with a quick fact (too narrow)?|When was the school founded?|Why did the school's founding spark local debate?|How did the founding change the town's economy?",
    "A 'how' or 'why' question usually leads to...|analysis|a simple fact|a list",
    "Narrowing a topic can involve adding...|a place, a time period or a group|a longer title|extra adjectives only",
    "A working thesis often comes from...|your tentative answer to the research question|the bibliography|the page count",
    "Which question shows a clear scope?|How have school start times affected teen sleep in three U.S. districts since 2015?|What about sleep?|Is sleep good?"],
    ["Check whether the question is neither too wide to handle nor so narrow that a fact answers it.", "Strong questions are focused, arguable, and usually begin with how or why. Add place, time or group to narrow a broad topic.", "Example: 'Sports' is broad; 'How did youth soccer funding change in Denver after 2010?' is focused. Now do yours."],
    [["Question first", "❔", "Research starts with a question that cannot be answered with one fact or a yes or no."], ["Narrow it", "🔬", "Add a place, time period or group so you can cover the topic well."], ["Becomes a thesis", "🎯", "Your tentative answer to the question becomes a working thesis you test against sources."]]);

  const A14 = mk("Qualitative and quantitative", "📊", [
    "Quantitative research mostly uses...|numbers and statistics|interviews only|poems",
    "Qualitative research mostly uses...|words, observations and themes|only graphs|random numbers",
    "Which is a qualitative method?|In-depth interviews about students' study habits|Counting how many students attend|Calculating the mean score",
    "Which is a quantitative finding?|62 percent of respondents said yes.|Participants described feeling anxious before exams.|Several students mentioned loneliness.",
    "A study that mixes both is called...|mixed-methods|double-blind|random",
    "To understand why people feel a certain way, you might choose...|qualitative methods|only large surveys with yes and no|none",
    "To measure how many people feel a certain way, you might choose...|quantitative methods|a single interview|a diary",
    "A coded transcript of interviews belongs to...|qualitative analysis|quantitative analysis only|a bibliography"],
    ["Think about whether the data are mainly numbers or mainly descriptions in words.", "Quantitative work measures and counts so it can compare and test. Qualitative work explores meaning through interviews, observations and texts. Mixed-methods combines them.", "Example: Average test scores are quantitative; open-ended comments about stress are qualitative. Now do yours."],
    [["Numbers", "🔢", "<b>Quantitative</b>: counts, averages and statistics. Good for 'how many' and 'how much.'"], ["Words", "💬", "<b>Qualitative</b>: interviews, observations, open comments. Good for 'why' and 'how it feels.'"], ["Both", "🤝", "<b>Mixed-methods</b> uses both so numbers and stories can explain each other."]]);

  const A15 = mk("Project proposals", "📝", [
    "A project proposal usually states...|the problem, goals, plan, timeline and budget|only a title|a poem",
    "The 'rationale' in a proposal explains...|why the project is needed|the font|the budget total only",
    "What makes goals strong?|They are specific and measurable|They are vague|They are secret",
    "Which is a measurable goal?|Increase student volunteers from 20 to 50 by May.|Make students happier.|Do something nice.",
    "A timeline helps the reader see...|what happens when|the writer's age|the bibliography",
    "A budget section lists...|expected costs and their purpose|nothing|every word used",
    "Who is the main audience of a proposal?|Decision makers who must approve or fund it|The author's friends only|Nobody",
    "Which is a stronger need statement?|Only 3 of 10 buses reach the south side after 6 p.m., leaving workers stranded.|Buses are bad.|People want change."],
    ["Think about what a decision maker needs before saying yes.", "A proposal shows a clear problem, a specific plan, measurable goals, a timeline and a realistic budget. It persuades by being concrete.", "Example: 'Add two evening bus runs for $8,000 by October' is concrete. Now do yours."],
    [["The ask", "📝", "A proposal asks someone to approve or fund a plan. It states the <b>problem</b>, <b>goals</b>, <b>plan</b>, <b>timeline</b> and <b>budget</b>."], ["Make goals measurable", "📏", "'Raise attendance by 15 percent by June' is better than 'improve attendance.'"], ["Think of the reader", "🧑‍💼", "Decision makers want to know the need, the cost and how you will measure success."]]);

  const A16 = mk("Asyndeton and polysyndeton", "🔗", [
    "<b>Asyndeton</b> means...|leaving out conjunctions in a series|using many conjunctions|repeating a first word",
    "<b>Polysyndeton</b> means...|using many conjunctions in a row|leaving out all verbs|a rhyme",
    "Which example is asyndeton?|I came, I saw, I conquered.|I came and I saw and I conquered.|I came, saw, and quickly conquered.",
    "Which example is polysyndeton?|We ran and jumped and laughed and sang.|We ran, jumped, laughed, sang.|We ran.",
    "Asyndeton often creates...|speed and punch|a slow, flowing feel|confusion only",
    "Polysyndeton often creates...|a sense of abundance or breathless flow|an abrupt stop|a list of rules",
    "Which is polysyndeton?|The river rose and the wind howled and the sky went dark.|The river rose, the wind howled, the sky went dark.|The river rose.",
    "Which is asyndeton?|Veni, vidi, vici.|And then and then and then.|The end."],
    ["Check the conjunctions (and, or, but). Are they missing, or piled up?", "Asyndeton drops conjunctions for speed. Polysyndeton adds extra conjunctions for a rolling, abundant feel.", "Example: 'Stop, look, listen' drops 'and' for a quick pulse. 'The tea and the cake and the jam and the cream' adds them for a leisurely pile-up. Now do yours."],
    [["Fewer conjunctions", "⚡", "<b>Asyndeton</b> cuts the 'and': 'I came, I saw, I conquered.' It feels fast and forceful."], ["Many conjunctions", "🌊", "<b>Polysyndeton</b> piles them on: 'and the rain and the wind and the night.' It feels full and flowing."], ["Choose for effect", "🎛️", "Neither is an error. They are tools for rhythm and emphasis."]]);

  const A17 = mk("Types of irony", "🎭", [
    "<b>Verbal irony</b> is when...|someone says the opposite of what they mean|the audience knows more than a character|a surprise outcome happens",
    "<b>Dramatic irony</b> is when...|the audience knows something a character does not|a character says the opposite of the truth|an event is unlucky",
    "<b>Situational irony</b> is when...|the outcome is the opposite of what was expected|a speaker uses a metaphor|two words rhyme",
    "A fire station burns down. This is...|situational irony|verbal irony|dramatic irony",
    "On a stormy day, someone says, 'Lovely weather!' This is...|verbal irony|dramatic irony|situational irony",
    "We see the villain hiding behind the door while the hero walks in, unaware. This is...|dramatic irony|verbal irony|a metaphor",
    "A marriage counselor files for divorce. Which irony?|situational|verbal|dramatic",
    "Sarcasm is closest to...|verbal irony|dramatic irony|alliteration"],
    ["Ask who knows what: the speaker, the characters, or the audience.", "Verbal irony: words say the opposite of the meaning. Situational irony: the result is the opposite of what we expect. Dramatic irony: the audience knows more than the characters.", "Example: A pilot afraid of heights is situational. Telling a messy room 'Nice and tidy' is verbal. Now do yours."],
    [["Three kinds", "🎭", "<b>Verbal</b>: say the opposite. <b>Situational</b>: outcome opposite to expectation. <b>Dramatic</b>: audience knows more than characters."], ["Not just coincidence", "🎲", "Bad luck alone is not irony. There must be a gap between expectation and reality."], ["Why writers use it", "🌟", "Irony creates humor, tension and criticism without saying things outright."]]);

  const A18 = mk("Diction and tone", "🎚️", [
    "<b>Diction</b> means...|a writer's choice of words|the number of pages|a type of rhyme",
    "<b>Tone</b> is...|the writer's attitude toward the subject|the topic itself|the font used",
    "Which word has the most positive connotation?|slender|skinny|scrawny",
    "Which word suggests a stern tone?|reprimand|chat|nudge",
    "Which choice is the most formal?|commence|start up|kick off",
    "Which tone words fit: 'The mayor's speech was long, hollow, and self-congratulating'?|critical or mocking|joyful|neutral",
    "Changing one word from 'house' to 'mansion' changes...|connotation and impression|only the grammar|nothing",
    "Which word choice is most informal?|buddy|colleague|associate"],
    ["Think about the feeling or attitude carried by the exact words, not just their meaning.", "Diction is word choice. Tone is the attitude that comes through those choices. Words with the same dictionary meaning can carry different feelings.", "Example: 'thrifty' sounds positive; 'cheap' sounds negative; both describe someone careful with money. Now do yours."],
    [["Words matter", "🎚️", "<b>Diction</b> is the choice of words. <b>Tone</b> is the attitude they create."], ["Connotation", "💭", "Words with similar meanings can feel warm, cold, formal or casual."], ["Read for tone", "🔍", "Notice the strongest words and ask what attitude they show: admiring, critical, humorous, serious."]]);

  const L28 = [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18];

  // =============== LEVEL 29 ===============
  const B1 = mk("Genre conventions", "🏷️", [
    "A <b>genre</b> is...|a type of text with shared expectations|a single word|a punctuation rule",
    "Which genre usually has an abstract, methods and results?|a scientific research article|a personal letter|a movie review",
    "Which genre expects a headline and the key facts first?|a news report|a lab report|a sonnet",
    "Why learn a genre's conventions?|Readers expect them, and they help you communicate clearly|They stop all creativity|They are only for teachers",
    "Which element is typical of a cover letter?|Addressing a specific job and explaining your fit|A list of references only|An abstract",
    "An executive summary belongs to which genre?|a business report|a haiku|a diary",
    "Breaking a genre rule on purpose can...|surprise readers when done with skill|never work|be required",
    "A recipe typically lists ingredients before steps because...|readers need to gather things first|it is a legal rule|it saves ink"],
    ["Think about what readers of that kind of text expect to find and where.", "A genre is a recurring kind of text with typical structure, tone and content. Following conventions helps readers; breaking them should be a choice.", "Example: A wedding toast is short, warm and personal; a lab report is precise and structured. Now do yours."],
    [["Kinds of texts", "🏷️", "A <b>genre</b> such as a lab report, news story or cover letter has shared features that readers expect."], ["Conventions", "📋", "Structure, tone, length and evidence differ by genre. Study samples before you write."], ["Choice", "🎛️", "Know the rules first. Then you can bend them with purpose."]]);

  const B2 = mk("Discourse communities", "🏘️", [
    "A <b>discourse community</b> is...|a group with shared goals and ways of communicating|a chat room only|a dictionary",
    "Specialized vocabulary used by a group is called...|jargon|slang for no one|a thesis",
    "Which is an example of a discourse community?|a team of nurses who share charts and terms|strangers passing on a street|a blank page",
    "New members of a community learn its writing norms by...|reading examples and getting feedback|ignoring them|guessing",
    "Why does jargon help experts but hurt outsiders?|It is a precise shorthand only insiders know|It is always wrong|It is always longer",
    "To write for a new community, a good first step is to...|study its texts and ask what it values|use your own style only|avoid all feedback",
    "Which community likely values precise citations?|academic historians|a casual group chat|a cooking show",
    "If your audience is outside the community, you should...|define technical terms|add more jargon|skip explanation"],
    ["Think about a group of people who share goals and ways of writing and speaking.", "A discourse community has shared goals, genres and vocabulary. To write well for one, study how it writes and what it values; for outsiders, explain the terms.", "Example: Chess players say 'fork' and 'zugzwang'; a newcomer needs definitions. Now do yours."],
    [["Shared ways of writing", "🏘️", "Scientists, lawyers, gamers and fans each have a <b>discourse community</b> with its own genres and words."], ["Jargon", "🔤", "Insider vocabulary saves time for experts but can confuse outsiders."], ["Join the conversation", "🗣️", "Read what the community publishes, notice its habits, then write in a way it will accept."]]);

  const B3 = mk("Replacing weak be-verbs", "💪", [
    "Which is stronger?|The storm destroyed the bridge.|The destruction of the bridge was done by the storm.|There was destruction of the bridge in the storm.",
    "Which sentence uses a strong verb?|The committee rejected the plan.|The committee was in rejection of the plan.|The rejection of the plan came from the committee.",
    "Rewrite <i>She is a supporter of the idea.</i>|She supports the idea.|She is supportive of idea.|She has support idea.",
    "Which opening is weakest?|There are many reasons that students quit.|Many students quit for several reasons.|Students quit for several reasons.",
    "Why prefer active, specific verbs?|They make prose clear and energetic|They make sentences longer|They hide the actor",
    "Which is stronger?|The findings contradict earlier work.|The findings are in contradiction to earlier work.|The findings have a contradiction with earlier work.",
    "Is every use of 'is' bad?|No, it is fine for simple definitions and states|Yes, never use it|Only in titles",
    "Which replaces 'make a decision'?|decide|to decision|deciding of"],
    ["Look for a bland verb like is, was or make that hides the real action in a noun.", "Pick the verb that names the action directly. Put the doer first and cut the filler 'there is' and 'make a ___.'", "Example: 'There was a rise in prices' becomes 'Prices rose.' Now do yours."],
    [["Strong verbs", "💪", "Specific verbs (argue, reject, reveal) carry more meaning than <b>is</b>, <b>was</b> or <b>make</b>."], ["Cut the filler", "✂️", "'There are' and 'It is' openers often delay the real subject."], ["Keep be-verbs where they fit", "⚖️", "Definitions and states need them: 'The test is short.' Just don't overuse."]]);

  const B4 = mk("Sentence combining", "🧩", [
    "Combine: <i>The lab opened. It was new.</i> Which is smoothest?|The new lab opened.|The lab opened it was new.|The lab opened new.",
    "Which combines with subordination?|Because the road flooded, we turned back.|The road flooded. We turned back.|The road flooded and we turned back and.",
    "Which uses a relative clause?|The book that I borrowed was long.|The book was long. I borrowed it.|The long book borrowed.",
    "Choppy sentences are best fixed by...|combining related ideas|adding more periods|removing all verbs",
    "Which combines these? <i>Maya studied. She passed.</i>|Maya studied hard and passed.|Maya studied she passed.|Maya studied, passed she.",
    "Subordination shows that one idea is...|less central or dependent on another|equal to another|unrelated",
    "Coordination (and, but, so) joins ideas of...|equal weight|unequal weight|no weight",
    "Which is best for a cause-and-effect link?|Since the pipe burst, the floor flooded.|The pipe burst. The floor flooded.|Pipe burst floor.",],
    ["Ask which ideas are equal and which one depends on another.", "Combine short sentences with coordination for equal ideas or subordination (because, although, who, that) to show relationships. Cut repeated words.", "Example: 'Leo ran. He was late.' becomes 'Leo ran because he was late.' Now do yours."],
    [["Smooth it out", "🧩", "Strings of short sentences feel choppy. Join related ideas to show how they connect."], ["Equal or unequal", "⚖️", "<b>Coordination</b>: and, but, so (equal). <b>Subordination</b>: because, although, who, which (one idea depends on another)."], ["Vary the rhythm", "🎵", "Mix short and long sentences, so the combined ones don't all sound the same."]]);

  const B5 = mk("Cumulative and periodic sentences", "🌀", [
    "A <b>cumulative</b> sentence...|begins with the main clause and adds details after|saves the main clause for the end|has no verb",
    "A <b>periodic</b> sentence...|delays the main clause until the end|starts with the main clause|is always short",
    "Which is periodic?|After years of waiting, and countless setbacks, she finally won.|She finally won after years of waiting and countless setbacks.|She won.",
    "Which is cumulative?|He left the room, shoulders slumped, eyes on the floor, silent.|Shoulders slumped, eyes on the floor, in silence, he left.|He left.",
    "A periodic sentence builds...|suspense|nothing|a list of sources",
    "A cumulative sentence often feels...|natural and flowing, like speech|abrupt|confusing",
    "Which is cumulative?|The train rolled through the valley, steaming and rattling, scattering the sheep.|Through the valley, steaming and rattling, the train rolled.|Steaming, rattling, scattering sheep, through the valley the train.",
    "Where is the main clause in a periodic sentence?|at or near the end|at the start|nowhere"],
    ["Find the main clause (who did what). Does it come first, or last?", "Cumulative sentences start with the main clause and pile on details. Periodic sentences hold the main idea until the end.", "Example: 'Despite the rain, the cold, and the crowd, we stayed' is periodic; 'We stayed despite the rain, the cold, and the crowd' is cumulative. Now do yours."],
    [["Cumulative", "🌀", "Main clause first, then details trail after. It sounds like thinking aloud."], ["Periodic", "⏳", "Details come first and the main clause arrives at the end. It builds suspense."], ["Use sparingly", "🎛️", "A periodic sentence has the most impact when the sentences around it are plain."]]);

  const B6 = mk("Appositives", "🏷️", [
    "An <b>appositive</b> is...|a noun phrase that renames another noun|a verb|a conjunction",
    "Which has an appositive?|My sister, a nurse, works nights.|My sister works nights.|My sister is tired.",
    "Which sentence contains an appositive?|Mr. Lee, our principal, spoke first.|Mr. Lee spoke first and left quickly.|Mr. Lee spoke because he was invited.",
    "A nonessential appositive is set off with...|commas|colons|no punctuation",
    "In <i>The poet Maya Angelou wrote in many forms</i>, why are there no commas?|The appositive is essential to identify the poet|It is an error|Poets never need commas",
    "Which combines <i>Paris is a city. It is the capital.</i>?|Paris, the capital, is a city.|Paris, is the capital a city.|Paris the capital, city.",
    "Find the appositive: <i>Her dog, a shaggy collie, barked.</i>|a shaggy collie|Her dog|barked",
    "Appositives help writers to...|add information concisely|lengthen sentences needlessly|replace verbs"],
    ["Look for a noun phrase placed beside another noun to rename or explain it.", "An appositive renames the noun next to it. Use commas if it is extra information; no commas if it is needed to tell which one you mean.", "Example: 'My neighbor, a baker, wakes at four.' The commas show the appositive is extra. Now do yours."],
    [["Renaming", "🏷️", "An <b>appositive</b> sits next to a noun and renames it: 'Jo, my cousin, plays cello.'"], ["Commas", "✂️", "Extra info gets commas on both sides. Essential info (which one?) gets none."], ["Concise", "⚡", "An appositive can fold a whole sentence into a phrase."]]);

  const B7 = mk("Restrictive and nonrestrictive clauses", "🔖", [
    "A <b>restrictive</b> clause...|is essential and has no commas|is extra and has commas|has a colon",
    "A <b>nonrestrictive</b> clause...|adds extra information and is set off by commas|is needed to identify the noun|is never a clause",
    "Which sentence has a nonrestrictive clause?|My brother, who lives in Ohio, is a pilot.|Anyone who lives in Ohio is welcome.|Students who finish early may leave.",
    "Which sentence suggests the speaker has several sisters?|My sister who studies law called.|My only sister called.|My sister, a nurse, called.",
    "Which sentence suggests the speaker has only one brother?|My brother, who plays tuba, won.|Of my brothers, the one who plays tuba won.|The brothers who play tuba won.",
    "Which has a restrictive clause?|Students who finish early may leave.|Ms. Cho, who teaches art, is kind.|The lake, which is frozen, is quiet.",
    "Why do commas change meaning in <i>The cars, which were parked outside, were towed</i>?|They show all the cars were parked outside and towed|They mean only some cars|They have no effect",
    "<i>The cars that were parked outside were towed.</i> This means...|only the cars parked outside were towed|all cars were towed|no cars were towed"],
    ["Ask: if I remove the clause, does the sentence still identify the same person or thing?", "Restrictive clauses are needed to identify the noun, so no commas. Nonrestrictive clauses add extra information, so commas.", "Example: 'Dogs that bark annoy me' (only some dogs) versus 'Dogs, which bark, annoy me' (all dogs). Now do yours."],
    [["Needed or extra?", "🔖", "<b>Restrictive</b>: needed to say which one, no commas. <b>Nonrestrictive</b>: extra detail, set off with commas."], ["Meaning changes", "🔄", "'Students who study pass' means only some. 'Students, who study, pass' means all."], ["Test", "🧪", "Cover the clause. If the noun is unclear without it, it is restrictive."]]);

  const B8 = mk("Dashes, parentheses, brackets", "➖", [
    "An em dash (—) is often used to...|set off an emphasized aside or break|end a sentence|show a list in order",
    "Parentheses usually contain...|less important information|the most important point|a thesis",
    "Brackets [ ] inside a quotation show...|words added or changed by the writer|the author's name|a page number",
    "In a quotation, a writer adds clarifying words using...|brackets|slashes|exclamation points",
    "Which mark is used twice in: The result—after years of work—surprised everyone?|em dash|comma|bracket",
    "Which mark is best for a quick, emphatic turn?|dash|parentheses|brackets",
    "[sic] after a quoted word means...|the error is in the original|the writer made the error|the word was removed",
    "Which mark quiets an aside the most?|parentheses|em dash|exclamation point"],
    ["Think about how loud or quiet the aside should be.", "Dashes add emphasis or a sharp break. Parentheses quiet an aside. Brackets mark the writer's changes inside quoted words.", "Example: 'My uncle—a retired pilot—teaches' is loud; 'My uncle (a retired pilot) teaches' is soft. Now do yours."],
    [["Dash", "➖", "The <b>em dash</b> sets off an emphatic aside, or marks a sudden break in thought."], ["Parentheses", "( )", "<b>Parentheses</b> hold less important extras. They whisper."], ["Brackets", "[ ]", "<b>Brackets</b> show your own words inside a quotation. [sic] marks an error in the original."]]);

  const B9 = mk("The literary present", "📚", [
    "When writing about what happens in a novel, use...|the present tense|the future tense always|any tense randomly",
    "Which is correct in a literature essay?|Hamlet delays his revenge.|Hamlet delayed his revenge.|Hamlet will delay his revenge.",
    "Why use present tense for literature?|The work exists now and its events are always on the page|It is a rule of math|Past tense is banned",
    "Events that happened before the story's main action can use...|the past tense|the future tense|no tense",
    "Which is correct?|In the poem, the speaker describes a field.|In the poem, the speaker described a field.|In the poem, the speaker will describe a field.",
    "Which describes the author's historical life correctly?|Austen wrote the novel in 1813.|Austen writes the novel in 1813.|Austen will write the novel.",
    "Which sentence mixes tenses wrongly?|Elizabeth meets Darcy, and she refused him.|Elizabeth meets Darcy, and she refuses him.|Elizabeth met Darcy, and she refused him.",
    "When describing what the author does in the text, use...|the present tense|the past perfect|the future"],
    ["Think: does the action live in the text, which is read now, or in history?", "The literary present uses the present tense for events in a work and for what authors do on the page. Use past tense for the author's real-life past and for events before the story's action.", "Example: 'Romeo meets Juliet at a party.' 'Shakespeare wrote it in the 1590s.' Now do yours."],
    [["Present for stories", "📚", "Describe a book's events in the <b>present tense</b>: 'Hamlet delays.'"], ["Past for history", "🕰️", "Use the past for real events: 'Austen wrote in 1813.'"], ["Stay consistent", "🔒", "Don't slide between tenses within the same summary."]]);

  const B10 = mk("Agendas and minutes", "🗓️", [
    "An <b>agenda</b> is...|a list of topics for a meeting, made in advance|the record of what was decided|a speech",
    "Meeting <b>minutes</b> are...|an official record of what was discussed and decided|a schedule for next week|a seating plan",
    "Minutes should focus on...|decisions, actions and who is responsible|every word spoken|jokes",
    "When is an agenda usually sent?|Before the meeting|After the meeting|Never",
    "Which is a good action item?|Priya will send the budget to the board by Friday.|Someone should look at the budget.|The budget is important.",
    "Minutes are usually written in...|a neutral, past-tense style|a very emotional style|rhyme",
    "A good agenda includes...|times, topics and who leads each|only the date|a poem",
    "Why record the date, attendees and motions?|They make the record accurate and official|They are decoration|They are optional jokes"],
    ["Think about what comes before a meeting and what comes after it.", "An agenda previews topics and time. Minutes record attendees, decisions and action items, with owners and deadlines, in a neutral past tense.", "Example: 'Action: Tom to book the hall by May 3.' Now do yours."],
    [["Before and after", "🗓️", "An <b>agenda</b> is the plan for a meeting. <b>Minutes</b> are the record afterward."], ["What matters", "✅", "Minutes capture decisions and action items: who does what by when."], ["Tone", "🎙️", "Neutral and brief. Do not write every word that was said."]]);

  const B11 = mk("Press releases", "📣", [
    "A press release is written to...|give news to journalists and the public|sell a house|argue a thesis",
    "The most important information in a press release comes...|first|last|in the footer",
    "A press release usually includes...|a headline, a dateline, key facts and a contact|a sonnet|a bibliography",
    "Which headline is best?|Library Opens Free Coding Lab for Teens|Big News Today!!!|Something Happening at the Library",
    "A quote from an official in a press release...|adds a human voice|replaces the facts|is not allowed",
    "A press release should answer...|who, what, when, where, why|only who|only when",
    "What does the contact line do?|Lets reporters ask follow-up questions|Lists the author's hobbies|Ends the story",
    "The tone of a press release is usually...|clear, factual and brief|poetic|angry"],
    ["Think about what a busy reporter needs to see in the first few lines.", "A press release gives the news at the top (who, what, when, where, why), then supporting detail, a quote and contact information. Write it clearly and factually.", "Example: 'City Opens Free Bike Repair Stand on Main Street, May 5.' Now do yours."],
    [["News first", "📣", "A <b>press release</b> announces news. Put the key facts at the top."], ["Parts", "🧱", "Headline, dateline, lead paragraph, details, a quote, and contact information."], ["Style", "🎯", "Clear, factual and brief. Avoid hype and exclamation marks."]]);

  const B12 = mk("Bottom line up front", "🎯", [
    "BLUF stands for...|bottom line up front|best letter under fire|brief language, useful format",
    "A BLUF memo puts the conclusion or request...|in the first lines|at the end|in a footnote",
    "Why use BLUF?|Busy readers decide quickly|It lengthens the memo|It hides the point",
    "Which is a BLUF opening?|I recommend we switch vendors, which will save $12,000 a year.|Let me tell you a story about vendors.|There are many things to consider.",
    "After the bottom line, you give...|supporting reasons and details|a new subject|an apology",
    "Reports for executives often start with...|an executive summary|an index|a glossary",
    "A subject line should...|state the topic or action clearly|be left blank|be a joke",
    "BLUF differs from a mystery story because...|the answer comes first|the answer comes last|there is no answer"],
    ["Think about a busy reader who might only read the first two lines.", "Put the conclusion, recommendation or request first, then the evidence and details. A clear subject line helps too.", "Example: 'Approve the new schedule by Friday; it cuts overtime by 10 percent.' Now do yours."],
    [["Answer first", "🎯", "<b>BLUF</b>: put the bottom line up front. The reader learns the point immediately."], ["Then support", "🧱", "Reasons, data and options follow the opening."], ["Clear subject lines", "📬", "Say what you need: 'Decision needed: vendor change by May 1.'"]]);

  const B13 = mk("Writing instructions", "🛠️", [
    "Good instructions use steps that are...|numbered and in order|random|in a paragraph with no order",
    "Each step should usually begin with...|a command verb|an adjective|a question",
    "Which step is best?|Press the red button for three seconds.|You might want to maybe press things.|The button, red, is where it is.",
    "Warnings should appear...|before the risky step|after the user is done|never",
    "Which is clearer?|Remove the cover, then unplug the cable.|The cover is something to remove and a cable unplug happens.|One may consider removal.",
    "How many actions per step is best?|one|ten|none",
    "Why define a term the first time?|Beginners may not know it|It is a law|It fills space",
    "Instructions are best tested by...|having a new user try them|reading them aloud to yourself only|printing them"],
    ["Think about a reader following each step with tools in hand.", "Instructions use short numbered steps, each starting with a command verb and containing one action. Put warnings before the risky step, and test with a real user.", "Example: '1. Unplug the lamp. 2. Remove the bulb.' Now do yours."],
    [["One action per step", "🔢", "Number each step and keep it to a single action."], ["Command verbs", "👉", "Start with the action: Press, Remove, Attach."], ["Warn early", "⚠️", "Place cautions right before the step where they matter. Then test the instructions with someone new."]]);

  const B14 = mk("Misleading graphs", "📉", [
    "A y-axis that starts at a number well above zero in a bar chart can...|exaggerate differences|show the data fairly|hide the title",
    "A bar chart should usually start its axis at...|zero|any number|the largest value",
    "A 3D pie chart can mislead because...|slices nearer the front look bigger|it uses color|it has labels",
    "Cherry-picking dates means...|showing only the period that supports your point|using all the data|rounding numbers",
    "A graph with no labels on its axes is...|hard to interpret|ideal|always accurate",
    "To keep a graph honest, you should...|label axes and show the full scale|crop the data you dislike|add decoration",
    "A truncated axis is one that...|does not start at zero|is too long|has no ticks",
    "Which makes a small change look huge?|a zoomed-in vertical scale|a zero-based scale|clear labels"],
    ["Think about how the axes and scale shape what the eye sees.", "Honest graphs label axes, show a fair scale (zero for bars), include enough of the data, and avoid distorting effects. Truncated axes and cherry-picked ranges exaggerate.", "Example: If bars for 91 and 95 sit on an axis starting at 90, one bar looks five times taller even though the values are almost equal. Now do yours."],
    [["Check the axis", "📉", "A bar chart that doesn't start at <b>zero</b> exaggerates differences."], ["Look for tricks", "🔍", "3D effects, cherry-picked date ranges and missing labels can mislead."], ["Be honest", "🤝", "Label everything, show the whole scale and let the data speak."]]);

  const B15 = mk("Writing about statistics", "🧮", [
    "A <b>p-value</b> below 0.05 is often called...|statistically significant|proof of truth|a mistake",
    "Statistically significant results mean...|the result is unlikely to be due to chance alone|the result is important in everyday life|the study is perfect",
    "A <b>confidence interval</b> shows...|a range likely to contain the true value|the exact answer|the mean only",
    "Which is cautious wording?|The data suggest a link between sleep and grades.|Sleep causes high grades, case closed.|Sleep always proves grades.",
    "<b>Effect size</b> tells you...|how big the difference or relationship is|whether the sample is random|the author's name",
    "A small sample often makes results...|less reliable|always correct|unnecessary",
    "Which statement mixes up correlation and causation?|Ice cream sales rise with drownings, so ice cream causes drowning.|Ice cream sales and drownings both rise in summer.|The two measures are correlated.",
    "Which claim is best phrased?|Participants in the group scored 8 points higher on average (p = .03).|The group was way better.|Obviously smarter."],
    ["Think about how certain the numbers really let you be.", "Report numbers precisely, say how big an effect is, and use careful words like 'suggest.' Significance shows a result is unlikely from chance alone, not that it is large or important.", "Example: 'Scores rose by 4 points on average (95% CI 1 to 7).' Now do yours."],
    [["Be precise", "🧮", "Give the number, the group and the measure: 'average score rose by 4 points.'"], ["Significance isn't size", "📏", "A small p-value says chance is an unlikely explanation. <b>Effect size</b> says how large the difference is."], ["Careful verbs", "🪶", "Use 'suggest' and 'is associated with' unless the design supports a causal claim."]]);

  const B16 = mk("Pitching: problem, solution, ask", "🚀", [
    "A pitch usually begins by describing...|a problem the audience cares about|the writer's biography|a long history",
    "The 'ask' in a pitch is...|the specific thing you want the audience to do|a trick question|a question about spelling",
    "Which is a clear ask?|Please approve $5,000 for a pilot in May.|Maybe think about it sometime.|It would be nice.",
    "A strong pitch is usually...|short, specific and focused on the audience's needs|long and vague|full of jargon",
    "Why include evidence in a pitch?|It shows the problem is real and the solution works|It fills time|It is not needed",
    "What order do most pitches follow?|problem, solution, benefit, ask|ask, apology, history|history, history, history",
    "Which opener is strongest for a pitch to a school board?|Forty percent of our students miss breakfast.|I have a thing to say.|Hello hello.",
    "Anticipating objections in a pitch helps because...|it builds trust|it weakens the pitch|it is rude"],
    ["Think about what your listener cares about and what you want them to do.", "A pitch states a problem, offers a specific solution with evidence, explains the benefit, and ends with a clear ask. Keep it short and audience-centered.", "Example: 'Many riders wait 40 minutes. Add two buses for $9,000. Approve it Tuesday.' Now do yours."],
    [["Four moves", "🚀", "<b>Problem</b>, <b>solution</b>, <b>benefit</b>, <b>ask</b>."], ["Make it specific", "🎯", "Use numbers, names and dates. Vague pitches get vague answers."], ["Know your audience", "👂", "Say why it matters to them, and answer their likely objections."]]);

  const B17 = mk("Copyright, fair use, Creative Commons", "©️", [
    "<b>Copyright</b> gives creators...|legal rights over their original work|the right to ignore citations|ownership of all ideas",
    "<b>Fair use</b> may allow limited use of copyrighted work for...|criticism, commentary, teaching or research|any copying at all|selling copies",
    "Which is a factor in judging fair use?|how much of the work is used and the effect on its market|the user's age|the day of the week",
    "A <b>Creative Commons</b> license lets creators...|share work with specific permissions|remove all rights forever|hide the work",
    "Citing a source...|does not by itself give permission to copy the whole work|always makes any copying legal|is never needed",
    "Ideas themselves are...|not copyrighted, though their exact expression is|always copyrighted|illegal",
    "A work in the <b>public domain</b> is...|free to use, with no copyright restrictions|always banned|only for schools",
    "Plagiarism and copyright infringement are...|related but different issues|exactly the same|unrelated to writing"],
    ["Think about the difference between what a creator owns and what others may do with it.", "Copyright protects original expression. Fair use allows limited uses such as commentary or teaching. Creative Commons licenses and the public domain give clearer permission. Citing is about honesty, not permission.", "Example: Quoting two lines of a poem in a review is likely fair use; posting the whole poem may not be. Now do yours."],
    [["Copyright", "©️", "Original works (writing, music, images) are protected. The creator controls copying and sharing."], ["Exceptions and licenses", "🔓", "<b>Fair use</b> allows limited use. <b>Creative Commons</b> and <b>public domain</b> works come with clear permissions."], ["Cite and respect", "🤝", "Citing credits the author, but you may still need permission."]]);

  const B18 = mk("Weighing kinds of evidence", "⚖️", [
    "Which is typically the strongest evidence for a general claim?|A large, well-designed study|One person's story|A guess",
    "An <b>anecdote</b> is...|a short personal story|a statistical test|a bibliography",
    "Why can anecdotes mislead?|They may not be typical|They are always false|They are too long",
    "An expert's testimony is stronger when...|the expert has relevant credentials and no conflict of interest|the expert is famous|the expert agrees with you",
    "Evidence from many independent studies pointing the same way is called...|a convergence of evidence|a coincidence|an anecdote",
    "Which is the weakest support for a health claim?|A single testimonial|A systematic review|A controlled trial",
    "Statistics are strongest when they...|come from a representative sample and a clear source|are rounded randomly|have no source",
    "Evidence should be...|relevant, sufficient and credible|short only|emotional only"],
    ["Think about how typical, large and trustworthy the evidence is.", "Good evidence is relevant, sufficient and credible. Large, well-designed studies and reviews outweigh single stories or opinions, though stories can illustrate.", "Example: A review of 30 trials outweighs one friend's testimonial. Now do yours."],
    [["Not all evidence equal", "⚖️", "Anecdotes, expert opinion, single studies and reviews carry different weight."], ["Questions to ask", "❔", "Is it relevant? Enough? Credible? Free of conflicts of interest?"], ["Use stories wisely", "📖", "An anecdote can illustrate a point, but data should carry the claim."]]);

  const L29 = [B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17, B18];

  // =============== LEVEL 30 ===============
  const C1 = mk("Kinds of editing", "✏️", [
    "<b>Developmental editing</b> focuses on...|big-picture structure, argument and content|commas only|page numbers",
    "<b>Line editing</b> focuses on...|style, flow and word choice in sentences|the book cover|marketing",
    "<b>Copyediting</b> focuses on...|grammar, punctuation, spelling and consistency|plot changes|new chapters",
    "<b>Proofreading</b> is...|the final check for typos and formatting errors|rewriting the thesis|brainstorming",
    "Which should usually come first?|developmental editing|proofreading|copyediting",
    "Why not proofread before reorganizing?|Text may be cut or moved, wasting the effort|Proofreading is illegal|It is always too late",
    "Moving a chapter to a better place is...|developmental editing|proofreading|copyediting",
    "Checking that 'email' is spelled the same everywhere is...|copyediting|developmental editing|brainstorming"],
    ["Think about the size of the change: whole structure, sentences, or tiny errors?", "Editing goes from large to small: developmental (structure and ideas), line (style and flow), copyediting (grammar and consistency), then proofreading (final typos).", "Example: Reordering sections is developmental; fixing a stray apostrophe is proofreading. Now do yours."],
    [["Big to small", "✏️", "Edit in stages: <b>developmental</b>, <b>line</b>, <b>copyedit</b>, <b>proofread</b>."], ["Why the order", "🧭", "Fixing commas in a paragraph you may cut is wasted work."], ["Do it yourself", "🪞", "You can edit your own work in the same passes, one focus at a time."]]);

  const C2 = mk("Style sheets and consistency", "🧾", [
    "A <b>style sheet</b> records...|decisions about spelling, capitalization and formatting|the writer's income|the book's price",
    "Why use a style sheet?|To keep choices consistent across a long document|To avoid reading|To change the topic",
    "Which is an inconsistency?|Using 'e-mail' on page 1 and 'email' on page 9|Using 'email' throughout|Using one font",
    "Which belongs on a style sheet?|Whether to use the serial comma|The writer's favorite color|The price of paper",
    "Which is an inconsistency in one document?|Writing 12 percent in one place and 12 % in another|Using percent every time|Using one spelling of a name throughout",
    "A style guide chosen for a journal is called its...|house style|plot|footnote",
    "If a name has two spellings in your draft, you should...|pick one and use it everywhere|keep both|delete the name",
    "Consistency matters because inconsistent text...|can look careless and confuse readers|looks creative|is required"],
    ["Think about decisions a reader should never have to wonder about.", "Pick one option for each recurring choice (spelling, capitalization, numbers, punctuation) and record it. Apply it everywhere.", "Example: Decide 'percent' versus '%' and note it on the sheet. Now do yours."],
    [["Decide once", "🧾", "A <b>style sheet</b> is your list of choices: spelling variants, capitalization, number style, hyphenation."], ["House style", "🏠", "Journals and companies have their own rules. Follow theirs."], ["Search and check", "🔎", "Use find tools to catch variants of the same word."]]);

  const C3 = mk("Accessible documents", "♿", [
    "<b>Alt text</b> is...|a text description of an image for people who can't see it|a spelling checker|a table of contents",
    "Why use real headings (not just bold text)?|Screen readers use them to navigate|They make text colorful|They are decoration",
    "Which link text is more accessible?|Read the 2024 annual report|Click here|Here",
    "Which choice improves readability for color-blind readers?|Do not rely on color alone to carry meaning|Use red and green only|Remove all labels",
    "Good contrast between text and background...|helps people with low vision|has no effect|is only decoration",
    "A good alt text for a bar chart of rising sales says...|what the chart shows|chart|image001",
    "Plain, clear sentences benefit...|everyone, including readers with cognitive differences|only experts|nobody",
    "Captions on videos help...|deaf and hard-of-hearing viewers and others in noisy places|only musicians|nobody"],
    ["Imagine someone using a screen reader or a high-contrast display.", "Accessible writing uses real headings, descriptive link text, alt text, good contrast, clear language, and does not rely on color alone.", "Example: Write 'Photo: volunteers planting trees' instead of 'img1.' Now do yours."],
    [["Structure", "♿", "Use real <b>headings</b> and lists so assistive tools can navigate."], ["Describe", "🖼️", "Give images <b>alt text</b> and links meaningful text instead of 'click here.'"], ["Don't rely on color", "🎨", "Add labels or patterns. Keep strong contrast and clear language."]]);

  const C4 = mk("Readability", "📏", [
    "Readability formulas often count...|sentence length and word length|font style|page color",
    "Shorter sentences and shorter words generally make a text...|easier to read|harder to read|longer",
    "A high grade-level score means the text is...|harder to read|easier to read|empty",
    "Formulas cannot judge...|whether the ideas are clear or accurate|the number of words|the number of sentences",
    "Which sentence is likely easier to read?|We should plant more trees.|It is incumbent upon us to effect a substantial increase in arboreal planting.|Arboreal planting augmentation is necessary.",
    "To lower the reading level for a general audience you can...|use shorter sentences and everyday words|add more jargon|merge paragraphs",
    "Should you always aim for the lowest reading level?|No, aim for your audience and purpose|Yes, always|No, always the highest",
    "Which also helps readability?|Clear headings and short paragraphs|Longer paragraphs|Smaller margins"],
    ["Think about what the formula measures, and what it cannot.", "Readability scores estimate difficulty from sentence and word length. They are rough guides; the right level depends on your audience and purpose, and clear ideas matter more than any number.", "Example: Replacing 'utilize' with 'use' and splitting a long sentence usually lowers the score. Now do yours."],
    [["Rough guide", "📏", "Tools estimate reading level from sentence length and word length."], ["Limits", "⚠️", "They can't tell if your ideas are clear or true. Use them as a hint."], ["Know your audience", "🎯", "A policy brief for the public needs plainer words than a journal article for experts."]]);

  const C5 = mk("Rhythm in prose", "🥁", [
    "Writing several short sentences in a row creates...|a quick, tense rhythm|a flowing, slow rhythm|no rhythm",
    "A long sentence with clauses can create...|a flowing, reflective rhythm|a clipped rhythm|nothing",
    "Why vary sentence length?|It prevents monotony and guides emphasis|It is required by law|It increases word count",
    "Reading your draft aloud helps you...|hear awkward rhythm|check the spelling of foreign names|measure the paper",
    "A short sentence after several long ones tends to...|stand out for emphasis|vanish|confuse",
    "Which has the most clipped rhythm?|He ran. He fell. He rose.|He ran, and when he fell, he rose again, determined.|Running, falling, rising, he went on.",
    "Repeated sentence openings, like starting four in a row with 'The', feel...|monotonous|musical|required",
    "Stressed and unstressed syllables in prose...|affect how a sentence sounds|are not heard|are only in poems"],
    ["Imagine reading the passage aloud. Where does it speed up, slow down or stall?", "Rhythm comes from sentence length, repetition and syllable stress. Vary it on purpose, and read aloud to find bumps.", "Example: Three long sentences then 'It stopped.' lands hard. Now do yours."],
    [["Hear it", "🥁", "Prose has rhythm even without rhyme. Read your writing aloud."], ["Vary", "🎚️", "Mix short and long sentences. A short one after long ones adds punch."], ["Avoid ruts", "🔁", "If every sentence opens or lengthens the same way, the page drones."]]);

  const C6 = mk("Finding your voice", "🗣️", [
    "A writer's <b>voice</b> is...|the personality that comes through word choice and rhythm|the loudness when read aloud|the font",
    "Which helps develop a voice?|Reading widely and writing often|Copying one author exactly|Never revising",
    "Voice in an academic paper is usually...|clear and confident, yet professional|slangy|silly",
    "Which is more voice-driven?|My grandmother's kitchen smelled like cinnamon and argument.|The kitchen contained several objects.|There was a kitchen.",
    "Why does overly formal, padded writing lose voice?|It hides the writer behind stiff phrases|It is too short|It uses verbs",
    "Specific detail and honest word choice give writing...|personality|plagiarism|a word count",
    "Can your voice change with audience?|Yes, you adjust tone while staying yourself|No, never|Only in poetry",
    "Imitating a writer you admire can...|teach techniques, if you then develop your own style|replace your own work|always be plagiarism"],
    ["Think about what makes one writer sound different from another, even on the same topic.", "Voice comes from specific details, honest word choices, rhythm and attitude. It adapts to audience but stays recognizably yours. Read widely, write often, revise for clarity.", "Example: 'The room was untidy' versus 'Socks colonized every chair.' Now do yours."],
    [["Sounds like you", "🗣️", "<b>Voice</b> is the personality that comes through your choices of words, details and rhythm."], ["Grow it", "🌱", "Read widely, write often, notice what you like, and keep revising."], ["Adjust, don't hide", "🎛️", "Academic and professional writing can still sound human: clear, specific and direct."]]);

  const C7 = mk("Creative nonfiction", "🖋️", [
    "<b>Creative nonfiction</b> is...|true stories told with literary techniques|invented stories|only lists",
    "A memoir is...|a nonfiction account of part of the writer's life|a novel|a science report",
    "Which technique is common in creative nonfiction?|scenes with dialogue and sensory detail|fabricated events|invented quotes",
    "In creative nonfiction, a writer should...|stay truthful about facts and events|invent evidence|hide the genre",
    "A personal essay often mixes...|story and reflection|only data|only lists",
    "Which is a hallmark of this genre?|a distinctive narrative voice|no point of view|no details",
    "'Showing' in nonfiction means...|using concrete details rather than only stating conclusions|writing less|lying",
    "If you can't remember exact words in a conversation, you should...|be honest, e.g. note you are recalling the gist|invent dramatic quotes silently|delete the scene"],
    ["Think about writing that reads like a story but is about real events.", "Creative nonfiction uses scenes, detail, voice and reflection to tell true stories. The writer must stay honest about facts, and be open about uncertain memory.", "Example: A memoir scene with real setting and honest note that dialogue is paraphrased. Now do yours."],
    [["True and artful", "🖋️", "<b>Creative nonfiction</b> (memoir, personal essay, literary journalism) uses story techniques but stays factual."], ["Tools", "🧰", "Scene, sensory detail, dialogue, reflection and a clear voice."], ["Honesty", "🔒", "Don't invent events or quotes. Say when memory is uncertain."]]);

  const C8 = mk("Inverted pyramid and nut graf", "🔻", [
    "The <b>inverted pyramid</b> puts...|the most important information first|the least important first|a joke first",
    "The <b>lede</b> is...|the opening of a news story|the headline|the byline",
    "A <b>nut graf</b> in a feature story...|explains the story's main point and why it matters|lists sources|is the headline",
    "Why use the inverted pyramid?|Readers get key facts fast and editors can cut from the bottom|It makes stories longer|It hides facts",
    "A good news lede answers...|who, what, when, where (and often why)|only how|nothing",
    "A <b>byline</b> is...|the writer's name on a story|a type of link|a quote",
    "A feature story often opens with...|a scene or character, followed by a nut graf|the corrections|nothing",
    "Which is the strongest news lede?|The city council voted 6-3 on Tuesday to close the pool.|There was a meeting.|Interesting things happened.",],
    ["Think about a reader who may stop after the first paragraph.", "News stories put the most important facts first (inverted pyramid) so readers and editors can stop or cut. Features often open with a scene, then a nut graf states the point.", "Example: 'Fire closes Main Street bridge until June' is a lede; details follow in order of importance. Now do yours."],
    [["Most important first", "🔻", "In the <b>inverted pyramid</b>, key facts open the story and details follow in decreasing importance."], ["Lede", "🪝", "The <b>lede</b> gives who, what, when, where and why in the first lines."], ["Nut graf", "🥜", "Feature stories use a <b>nut graf</b> to say what the story is about and why it matters."]]);

  const C9 = mk("Attribution", "💬", [
    "In journalism, <b>attribution</b> means...|saying where information came from|adding adjectives|changing quotes",
    "Which verb is most neutral for attribution?|said|insisted|admitted",
    "Why is 'admitted' risky?|It implies guilt|It is too short|It is a noun",
    "An <b>on-the-record</b> source...|can be named and quoted|must stay secret|is invented",
    "A direct quote must be...|exactly what was said|improved by the writer|invented",
    "Paraphrase still needs...|attribution|no source|a joke",
    "Why attribute opinions and claims?|So readers can judge who is saying what|To lengthen stories|To confuse readers",
    "Which attribution is clearest?|Mayor Rosa Diaz said the budget is balanced.|It is said the budget is balanced.|Some say the budget is balanced."],
    ["Think about telling readers who said it, in neutral words.", "Attribute facts, opinions and quotes to named sources. Use plain verbs like 'said,' keep quotes exact, and avoid loaded verbs that add judgment.", "Example: 'The coach said the team practiced hard' not 'The coach admitted...' Now do yours."],
    [["Name the source", "💬", "Tell readers who said or measured something so they can judge it."], ["Neutral verbs", "🧊", "<b>said</b> is best. Words like <b>admitted</b> or <b>claimed</b> add judgment."], ["Exact quotes", "🎯", "Never change quoted words. Paraphrases still need attribution."]]);

  const C10 = mk("Posters and conference talks", "🎤", [
    "A research poster should be...|visual and easy to scan from a distance|a full paper in tiny type|blank",
    "Which is best on a poster?|Short phrases, clear headings and a key figure|Whole paragraphs|Only a title",
    "A conference talk usually has time to cover...|only a few main points|every detail of the study|nothing",
    "Slides should generally have...|little text and big ideas|dense paragraphs|no title",
    "A strong talk starts by stating...|the question and why it matters|the acknowledgments|an apology",
    "Practicing a talk aloud helps with...|timing and clarity|spelling only|nothing",
    "Why prepare for questions after a talk?|Audiences often ask about methods and limits|They never ask|It wastes time",
    "A conference abstract must be...|short and state the question, method and finding|a full paper|a poem"],
    ["Think about what an audience can absorb in a few minutes or at a glance.", "Posters and talks distill research to the question, method, key findings and meaning. Use visuals and little text, practice for timing, and prepare for questions.", "Example: One headline finding with one clear chart beats ten small tables. Now do yours."],
    [["Less is more", "🎤", "Pick the few main points. Posters and slides should be scannable."], ["Structure", "🧱", "Question, method, key result, meaning."], ["Practice", "⏱️", "Rehearse aloud, keep to time, and expect questions on methods and limits."]]);

  const C11 = mk("Responding to reviewers", "📬", [
    "A good response to peer reviewers is...|polite, point-by-point and specific|angry|silent",
    "If you disagree with a reviewer, you should...|explain your reasoning politely with evidence|ignore the comment|insult the reviewer",
    "A <b>response letter</b> usually lists...|each comment and how you addressed it|only your résumé|new sources only",
    "Which opening is best?|We thank the reviewers for their helpful comments.|Your review was wrong.|Whatever.",
    "If a comment is unclear, you may...|politely ask or state how you interpreted it|delete it silently|blame the editor",
    "Which response is best?|We added a paragraph on limitations (page 12).|We fixed it.|Done.",
    "Peer reviewers give feedback to...|improve the work and judge whether it should be published|punish authors|copy ideas",
    "Revising after review often means...|changing the text and explaining the changes|only changing the title|nothing"],
    ["Think about being professional and specific when answering criticism.", "Respond to every comment, in order, politely. Say what you changed and where, or give a reasoned explanation if you did not. Thank reviewers.", "Example: 'Comment 2: add data. Response: We added Table 3 (page 8).' Now do yours."],
    [["Thank and answer", "📬", "Thank the reviewers, then reply to <b>every</b> comment."], ["Point by point", "📋", "Quote the comment, then say what you changed and where."], ["Disagree kindly", "🤝", "If you didn't change something, give a clear, respectful reason."]]);

  const C12 = mk("Argument maps", "🗺️", [
    "An <b>argument map</b> shows...|how claims, reasons and evidence connect|only the title|word counts",
    "In an argument map, the main claim is the...|conclusion|footnote|decoration",
    "Reasons that support a claim are called...|premises|footers|conclusions only",
    "An objection in a map is...|a point that challenges the claim or a premise|a typo|a link",
    "Why make an argument map?|It reveals gaps and weak links in reasoning|It adds citations automatically|It lengthens papers",
    "A premise with no evidence behind it is...|an unsupported assumption|always true|a title",
    "A rebuttal in a map...|answers an objection|repeats the title|deletes the claim",
    "Mapping before writing helps you...|plan a logical structure|avoid all revision|skip research"],
    ["Think of a diagram of boxes and arrows linking a conclusion to its reasons.", "An argument map lays out the conclusion, supporting premises, evidence, objections and rebuttals, so you can see which links are strong or missing.", "Example: Claim: ban cars downtown. Reasons: less pollution, safer streets. Objection: shops lose customers. Rebuttal: studies show foot traffic helps. Now do yours."],
    [["Boxes and arrows", "🗺️", "An <b>argument map</b> links a conclusion to its premises and evidence."], ["Add the opposition", "⚔️", "Show objections and rebuttals too."], ["Find gaps", "🔍", "Unsupported premises and missing links stand out. Fix them before you write."]]);

  const C13 = mk("Theses and dissertations", "🎓", [
    "A <b>dissertation</b> is typically...|a long original research document for a doctorate|a short memo|a quiz",
    "A literature review chapter...|surveys what is already known|presents your new data|thanks your family",
    "The methods chapter explains...|how the research was done|the final conclusion only|the table of contents",
    "A <b>thesis advisor</b> helps by...|guiding and giving feedback on research|writing the entire thesis|grading quizzes",
    "The conclusion chapter usually discusses...|findings, limitations and future work|a new unrelated study|nothing",
    "Why include limitations?|Honest scholarship acknowledges what the study cannot show|To lower the grade|It is a trick",
    "An <b>abstract</b> in a thesis...|summarizes the whole work briefly|replaces the work|lists the references",
    "The <b>bibliography</b> or reference list shows...|the sources cited|the writer's biography|the budget"],
    ["Think about the parts of a long research project, from background to results.", "Theses and dissertations typically include an abstract, introduction, literature review, methods, results, discussion, conclusion and references. Advisors give guidance; the work is the student's own.", "Example: Chapter 2 reviews prior studies; Chapter 3 explains method. Now do yours."],
    [["Big project", "🎓", "A <b>dissertation</b> is a long original study. A thesis can be shorter, such as a master's or honors thesis."], ["Chapters", "📚", "Introduction, literature review, methods, results, discussion, conclusion."], ["Honest limits", "🧭", "Good scholars say what their study can and cannot show."]]);

  const C14 = mk("DOIs and stable links", "🔗", [
    "A <b>DOI</b> is...|a permanent identifier for a digital document|a type of font|a footnote",
    "Why cite a DOI instead of a web address that may change?|A DOI keeps pointing to the same item|DOIs are shorter in every case|It is prettier",
    "In APA reference lists, a DOI is usually given...|as a link at the end of the entry|before the author|in the title",
    "A link that no longer works is called...|a broken link (link rot)|a DOI|a footnote",
    "Which helps readers find your source later?|Complete reference details and a DOI if there is one|Only the author's first name|Just 'online'",
    "DOI stands for...|digital object identifier|document of information|direct online index",
    "If an article has no DOI, you should...|give the stable URL or database information required by your style guide|skip the citation|invent a DOI",
    "Why might a web page change over time?|Sites are edited or removed|The internet shrinks|Readers delete them"],
    ["Think about how a citation keeps working years later.", "A DOI is a permanent identifier that leads to a document even if its web address changes. Include it when available, following your style guide. If there is none, give the stable URL or database details.", "Example: A reference ending in https://doi.org/10.xxxx lets readers find the paper. Now do yours."],
    [["Permanent ID", "🔗", "A <b>DOI</b> (digital object identifier) points to one item and stays stable."], ["Link rot", "🍂", "Ordinary web links break when pages move or vanish."], ["Follow your guide", "📘", "Citation styles say how to format DOIs and what to do without one."]]);

  const C15 = mk("Preprints, retractions, replication", "🔬", [
    "A <b>preprint</b> is...|a research paper shared before peer review|a printed poster|a final book",
    "A <b>retraction</b> means...|a published paper is withdrawn due to errors or misconduct|a paper is praised|a paper is translated",
    "<b>Replication</b> is...|repeating a study to see if results hold|copying someone's text|a type of citation",
    "Why treat a preprint cautiously?|It has not yet been peer reviewed|It is always false|It is always better",
    "If a paper you cite is later retracted, you should...|stop relying on it and note the retraction|ignore it|cite it as strong evidence",
    "Results that replicate across labs are...|more trustworthy|less trustworthy|irrelevant",
    "Peer review means...|experts evaluate a paper before publication|friends say it's nice|a student grades it",
    "How can you check if a source has been corrected or retracted?|Look for notices on the publisher's page or in a database|Guess|Ask a stranger online"],
    ["Think about the stages a paper goes through and what can happen after publication.", "Preprints appear before peer review, so treat them with care. Peer-reviewed papers can still be corrected or retracted. Replication across studies strengthens confidence.", "Example: A preprint reports a result; a later peer-reviewed version adds corrections. Now do yours."],
    [["Before review", "📄", "A <b>preprint</b> is public before peer review. Useful, but less checked."], ["After publication", "🔄", "Papers can get <b>corrections</b> or be <b>retracted</b>. Check status before citing."], ["Repeat to trust", "🔬", "<b>Replication</b>: when other teams get similar results, confidence grows."]]);

  const C16 = mk("Authorship and credit", "🤝", [
    "Who deserves author credit on a research paper?|Those who made significant intellectual contributions|Anyone who walked by|Only the oldest person",
    "An acknowledgments section thanks...|people who helped but are not authors|the reviewers only|nobody",
    "Writing a paper for someone and hiding that fact is...|ghostwriting, which is unethical in academic work|always allowed|required",
    "Author order often reflects...|each person's contribution, by field convention|alphabet only, always|height",
    "Listing someone who did no work as an author is...|gift authorship, which is unethical|good practice|required",
    "Why agree on authorship early?|It prevents disputes later|It saves ink|It is not helpful",
    "If you used help from a tutor on ideas, you should...|acknowledge them appropriately|hide it|lie",
    "Good collaboration includes...|clear roles and fair credit|silence|secret changes"],
    ["Think about who really contributed and how that should be recognized.", "Authorship should reflect real intellectual contribution. Others who helped are acknowledged. Agree on roles and credit early, and never list or hide people dishonestly.", "Example: The lab technician is thanked in the acknowledgments; the two who designed and wrote the study are authors. Now do yours."],
    [["Fair credit", "🤝", "Authors made significant intellectual contributions: ideas, design, analysis, writing."], ["Acknowledge helpers", "🙏", "Others who helped get thanked in an <b>acknowledgments</b> section."], ["Be honest", "🔒", "No gift authorship, no hidden ghostwriting. Talk about roles early."]]);

  const C17 = mk("Writing portfolios", "🗂️", [
    "A writing <b>portfolio</b> is...|a curated collection of your best work|every scrap you have written|a single sentence",
    "A reflective introduction to a portfolio...|explains your choices and growth|lists page numbers|is never included",
    "Which piece belongs in a professional portfolio?|Polished work that shows range and skill|Every rough draft|Unfinished notes only",
    "Why include drafts sometimes?|They show your process and revision|They make the portfolio longer|They hide mistakes",
    "A portfolio for a job in technical writing should include...|clear samples such as instructions or reports|only poems|nothing",
    "Good organization of a portfolio means...|a logical order with labels and a table of contents|random order|no labels",
    "Why get feedback before finalizing?|Fresh eyes catch gaps and errors|It is required by law|It lowers quality",
    "When you reflect on your work in a portfolio, you should...|say what you learned and what you would improve|brag only|apologize"],
    ["Think about showing your best, most relevant work with a story of your growth.", "Choose polished pieces that fit the audience, organize them clearly, and add a reflection on your choices, process and growth. Ask for feedback before finalizing.", "Example: Include a report, an article and a proposal, each with a short note on the goal. Now do yours."],
    [["Curate", "🗂️", "A <b>portfolio</b> is selective: your best and most relevant work, not everything."], ["Organize", "🧭", "Order and label the pieces. Add a contents list and brief notes."], ["Reflect", "🪞", "Explain your choices, what you learned and how you revised."]]);

  const C18 = mk("Editing your own work", "🔍", [
    "Reading your draft aloud helps you...|catch awkward phrasing and missing words|translate it|shorten the title",
    "Why step away from a draft before editing?|You return with fresh eyes|The draft improves itself|It is a rule",
    "Reading backward, sentence by sentence, helps with...|spotting spelling and punctuation errors|improving the argument|choosing a topic",
    "A personal checklist of your usual mistakes is useful because...|you can target your own habits|it replaces proofreading|it is required",
    "Printing a draft can help because...|you notice errors you miss on screen|paper fixes grammar|it saves time always",
    "Spell check cannot catch...|a real word used wrongly, such as 'their' for 'there'|any typo|every misspelling",
    "Editing in separate passes means...|focusing on one kind of problem at a time|fixing everything at once|skipping revision",
    "Asking a peer to read your draft helps because...|they see what you can no longer see|they write it for you|it is cheating"],
    ["Think about tricks that make your own writing look unfamiliar so errors stand out.", "Take a break, read aloud, read backward for surface errors, print, and work in passes. Keep a list of your own frequent errors. Spell check misses real words used wrongly.", "Example: Read the last sentence first, then the one before, to hunt for typos. Now do yours."],
    [["Fresh eyes", "🔍", "Wait a bit, change the format (print it, change the font) and read aloud."], ["One pass at a time", "🧹", "First big ideas, then style, then grammar, then typos."], ["Know your habits", "📝", "Track the errors you often make and hunt for them. Software won't catch everything."]]);

  const L30 = [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, C17, C18];

  const lvl = (n, L) => L.concat([MIX("Mixed practice", ...L.slice(0, 6)), MIX("Level " + n + " Challenge", ...L.slice(6))]);
  Object.assign(WRITING_LEVELS, { 28: lvl(28, L28), 29: lvl(29, L29), 30: lvl(30, L30) });
})();

