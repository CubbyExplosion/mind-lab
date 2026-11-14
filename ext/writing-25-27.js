// ext/writing-25-27.js  Mind Lab Writing & Grammar, levels 25-27 (60 lessons)
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

  // =============== LEVEL 25 ===============
  const A1 = mk("Arguable theses", "🎯", [
    "Which is an arguable thesis?|Schools should start later because teens need more sleep.|Many schools start at 8 a.m.|Sleep is something people do at night.",
    "Which is only a fact, not a thesis?|The library closes at nine.|The library should stay open later.|Closing the library hurts learning.",
    "Which thesis takes a clear position?|Social media weakens close friendships.|Social media is popular.|This essay is about social media.",
    "What is wrong with <b>This paper is about climate.</b>?|It announces a topic but makes no claim.|It is too specific.|It has a spelling error.",
    "A good thesis is...|specific and debatable|a question only|a quotation from a source",
    "Which thesis is most specific?|City buses should be free for students because it raises attendance.|Buses are good.|Transport matters a lot.",
    "Which one is a thesis, not a topic?|Remote work improves focus for most office staff.|Remote work|The history of remote work",
    "Where does a thesis usually go in a short essay?|At the end of the introduction|In the last sentence of the essay only|In the title only"],
    ["Ask whether a thoughtful person could disagree. A thesis makes a claim that needs support.", "A strong thesis is a full sentence that takes a position, is specific, and can be argued with evidence. A fact or a topic alone is not enough.", "Example: 'Dogs are mammals' is a fact; 'Cities should allow dogs on public transit' is arguable. Now do yours."],
    [["More than a topic", "🎯", "A <b>thesis</b> is the main claim of an essay. 'Pollution' is a topic; 'Cities should tax plastic bags' is a thesis."], ["Three tests", "✅", "Is it <b>arguable</b>, <b>specific</b>, and <b>supportable</b> with evidence? If a fact settles it, it is not a thesis."], ["Place it", "📍", "In most college essays the thesis ends the introduction, so the reader knows the claim before the evidence."]]);

  const A2 = mk("Reverse outlining", "🔁", [
    "A reverse outline is made...|after drafting, by listing each paragraph's main point|before any ideas exist|only by the teacher",
    "What is the main use of a reverse outline?|To check structure and find gaps or off-topic parts|To fix commas|To pick a font",
    "In a reverse outline, you write beside each paragraph...|a short note of what it says and does|its page number|a new title",
    "If two paragraphs make the same point, you may...|combine them|add more of the same|delete the thesis",
    "If a paragraph does not connect to your thesis, you should...|cut it or revise it to connect|leave it alone|move it to the title",
    "A reverse outline shows...|the order of ideas as they are actually written|only spelling errors|the word count",
    "When does a normal outline happen?|Before drafting|Only after submission|Never",
    "Which note best summarizes a paragraph in a reverse outline?|Explains the first cause of the shortage, with data|Paragraph about stuff|Good paragraph"],
    ["Think about when you draw it: before the paper exists, or after? What would it tell you that your plan did not?", "A reverse outline lets you see the real structure of a draft. It helps you spot repeats, gaps and paragraphs that wander from your claim.", "Example: a student lists 'P1: intro; P2: cause; P3: cause again; P4: unrelated story.' She sees P3 repeats P2 and P4 drifts. Now do yours."],
    [["Outline backwards", "🔁", "A <b>reverse outline</b> starts from a finished draft. You list what each paragraph really says."], ["Spot the problems", "🔍", "Repeats, missing steps, and paragraphs that do not serve the thesis show up fast."], ["Then revise", "🛠️", "Combine, cut, move or add paragraphs so the order of ideas builds toward your claim."]]);

  const A3 = mk("Revising, editing, proofreading", "🧰", [
    "Which task is <b>revising</b>?|Reorganizing paragraphs to strengthen the argument|Fixing a missing comma|Checking a typo in a name",
    "Which task is <b>editing</b>?|Improving word choice and sentence flow|Rewriting the whole thesis idea|Choosing a topic",
    "Which task is <b>proofreading</b>?|Catching typos and formatting slips in the final copy|Adding a new section|Changing the argument",
    "Which order is best?|Revise, edit, proofread|Proofread, edit, revise|Edit, proofread, revise",
    "Why not proofread first?|You may polish sentences you later cut|Proofreading is harmful|It takes no time",
    "Adding a stronger piece of evidence is...|revising|proofreading|formatting",
    "Fixing a misspelled word is...|proofreading|revising|brainstorming",
    "Reading aloud helps most with...|editing for rhythm and clarity|choosing a thesis|printing"],
    ["Think big to small: ideas first, sentences next, tiny errors last.", "Revising changes content and structure; editing refines sentences and words; proofreading catches surface errors at the end.", "Example: moving a paragraph is revising; swapping 'big' for 'significant' is editing; fixing 'teh' is proofreading. Now do yours."],
    [["Three passes", "🧰", "<b>Revise</b> the big ideas, <b>edit</b> the sentences, <b>proofread</b> the surface."], ["Order matters", "🔢", "Fixing commas in a paragraph you later delete wastes time. Work from large to small."], ["Fresh eyes", "👀", "Take a break, print the draft, or read aloud to notice what you missed."]]);

  const A4 = mk("Signal phrases for quotes", "📣", [
    "Which is a signal phrase?|According to Dr. Lee,|\"The results were clear.\"|(Lee 22)",
    "Why use a signal phrase before a quotation?|To introduce who is speaking and why it matters|To make the paper longer|To avoid citing",
    "Which verb signals a writer's strong claim?|argues|mentions|goes",
    "Which verb signals neutral reporting?|states|insists|warns",
    "Which is a dropped quote (no introduction)?|Cities need trees. \"Shade lowers heat by ten degrees.\"|Lee notes that \"shade lowers heat by ten degrees.\"|According to Lee, \"shade lowers heat.\"",
    "Which sentence blends the quote smoothly?|Lee explains that shade \"lowers heat\" in crowded streets.|\"Shade lowers heat.\" Lee.|Quote: shade lowers heat.",
    "After a quote, a good writer usually...|explains what it shows|starts a new topic at once|adds another quote only",
    "A signal phrase usually includes...|the source's name and a verb|only a page number|a joke"],
    ["Imagine a quote dropped in with no warning. What does the reader need to know first and after?", "Introduce quotes with the speaker and a fitting verb, then explain how the quote supports your point. Quotes should not stand alone.", "Example: 'Rivera argues that \"sleep fuels memory\"; this supports my claim that later start times help learning.' Now do yours."],
    [["Introduce it", "📣", "A <b>signal phrase</b> names the source: <i>According to Ruiz,</i> or <i>Ruiz argues that</i>."], ["Pick the verb", "🎚️", "<b>Suggests</b> is soft; <b>insists</b> is strong; <b>reports</b> is neutral. The verb shows how the source speaks."], ["Quote sandwich", "🥪", "Introduce the quote, give it, then <b>explain</b> why it matters to your argument."]]);

  const A5 = mk("Ellipses and quotations", "✂️", [
    "What does an ellipsis (...) show in a quotation?|Words were left out|A word was added|A spelling error",
    "Original: 'The park, which opened in 1920, is huge.' Which shortened quote uses an ellipsis correctly?|\"The park ... is huge.\"|\"The park is.\"|\"The ... park huge.\"",
    "An ellipsis must NOT...|change the meaning of the original|show omitted words|use three dots",
    "How many dots form a standard ellipsis?|three|two|five",
    "Which change would be misleading?|Cutting 'not' from 'We did not agree'|Cutting 'very' from 'a very old map'|Cutting a long example",
    "Square brackets in a quote show...|words you added or changed|a page number|an error by the source",
    "Which is a fair use of an ellipsis?|Removing an extra detail that does not change the meaning|Removing a word like 'never'|Reversing the claim",
    "Do you need an ellipsis at the very start of a quote that begins mid-sentence in your own sentence?|Usually no|Always yes|Only in poems"],
    ["Think about whether the cut changes what the author meant. A cut must stay honest.", "An ellipsis marks omitted words inside a quotation. Use it only when the remaining words still carry the author's real meaning.", "Example: 'We will meet, if the rain stops, at noon' can become 'We will meet ... at noon' only if the weather condition is not essential. Now do yours."],
    [["Three dots", "✂️", "An <b>ellipsis</b> (...) shows that you left words out of a quotation."], ["Stay honest", "⚖️", "Never cut words like <b>not</b> or <b>never</b> so that the author seems to say the opposite."], ["Brackets add", "➕", "Use [brackets] for words you add, such as [the mayor], to make a quote clear."]]);

  const A6 = mk("Hyphens in compound modifiers", "➖", [
    "Which is correct before a noun?|a well-known author|a well known, author|a known-well author",
    "Which is correct?|a ten-page paper|a ten pages paper|a ten-pages paper",
    "Which is correct after the noun?|The author is well known.|The author is known-well.|The author is a well-known.",
    "Which is correct?|a high-school student|a high school-student|a highschool, student",
    "Which pair needs no hyphen?|very tired child|well-read child|long-term plan",
    "Which is correct?|a fast-moving train|a fast moving-train|a fastmoving train",
    "Which is correct?|a four-year-old girl|a four year-old girl|a four-year old girl",
    "Why hyphenate a compound modifier before a noun?|To show the words work together as one idea|To lengthen the sentence|To mark a name"],
    ["Check whether the two words team up to describe the noun that follows. Does position matter?", "Hyphenate two or more words that work together as one adjective before a noun. After the noun, they often need no hyphen. Do not hyphenate -ly adverbs or 'very'.", "Example: 'a long-term plan' has a hyphen but 'The plan is long term' does not. Now do yours."],
    [["Words that team up", "➖", "<b>Compound modifiers</b> join words to describe a noun: <i>a part-time job</i>."], ["Position matters", "↔️", "Before the noun, hyphenate. After it, drop the hyphen: <i>The job is part time</i>."], ["No hyphen for -ly", "🚫", "Write <i>a highly rated film</i>, not highly-rated, because -ly already links the words."]]);

  const A7 = mk("Agreement traps", "🪤", [
    "Choose the verb.<br><br><b>The box of pencils ___ on the desk.</b>|is|are|were",
    "Choose the verb.<br><br><b>Neither the teacher nor the students ___ ready.</b>|were|was|is",
    "Choose the verb.<br><br><b>The data ___ clear.</b> (formal)|are|is a|was an",
    "Choose the verb.<br><br><b>Each of the essays ___ a thesis.</b>|has|have|are having",
    "Choose the verb.<br><br><b>The committee ___ its decision.</b>|made|make|were making",
    "Choose the verb.<br><br><b>Either the coach or the players ___ late.</b>|are|is|was",
    "Choose the verb.<br><br><b>The group of scientists ___ new results.</b>|has|have|are",
    "Choose the verb.<br><br><b>Mathematics ___ my favorite subject.</b>|is|are|were"],
    ["Find the real subject. Cross out any phrase between the subject and the verb.", "Words like 'of ...' do not change the subject. With 'either/or' and 'neither/nor' the verb agrees with the nearer subject. Words like each, committee and mathematics are singular.", "Example: 'The bag of apples ___ heavy.' The subject is bag, so 'is'. Now do yours."],
    [["Find the subject", "🔎", "Ignore phrases between subject and verb: <i>The list of rules</i> <b>is</b> long."], ["Either / or", "⚖️", "The verb matches the <b>nearer</b> subject: <i>Neither the cat nor the dogs</i> <b>were</b> home."], ["Singular surprises", "☝️", "<b>Each, everyone, mathematics, news</b> take singular verbs. A group acting as one does too."]]);

  const A8 = mk("Scene or summary?", "🎬", [
    "Which is a <b>scene</b>?|She slammed the door and shouted, \"Never again!\"|Over the next year, things changed.|The summer passed quickly.",
    "Which is <b>summary</b>?|The next three winters were quiet.|He hissed, \"Not here.\"|The cup shattered on the tile.",
    "Scenes usually include...|specific action, dialogue and detail|only background|only dates",
    "Summary is best for...|moving quickly over less important time|key emotional moments|showing a face",
    "A writer wants the reader to feel a big moment. Best choice?|Write it as a scene|Summarize it in one line|Skip it",
    "Which sentence is summary?|Years went by without a letter.|The envelope trembled in her hand.|\"Open it,\" he whispered.",
    "Which is a scene?|The kettle whistled; Tom jumped and spilled the tea.|Tom made tea most mornings.|Tom liked tea.",
    "Mixing scene and summary...|keeps pace and focus|is always wrong|breaks every rule"],
    ["Ask: does this slow down to show a moment, or speed past time?", "Scenes happen in a specific time and place, with action and often dialogue. Summary compresses time and facts. Strong writing uses both on purpose.", "Example: 'We drove for hours.' is summary; 'The engine coughed twice, and Dad swore softly.' is scene. Now do yours."],
    [["Slow or fast", "🎬", "A <b>scene</b> slows time to show a moment. <b>Summary</b> moves fast over time."], ["Use scene for", "⭐", "Turning points, strong feelings and conflict. Let the reader be there."], ["Use summary for", "⏩", "Travel, waiting and background. It keeps the story from dragging."]]);

  const A9 = mk("Dialogue formatting", "💬", [
    "Which dialogue is punctuated correctly?|\"I'm ready,\" she said.|\"I'm ready.\" she said.|\"I'm ready\", she said, and left.",
    "When a new person speaks, you should...|start a new paragraph|stay in the same line|use no quotation marks",
    "Which dialogue is correct?|\"Where are you going?\" he asked.|\"Where are you going,\" he quietly asked?|He asked where are you going?",
    "Which is correct?|She said, \"Let's go.\"|She said; go now.|She said that, let us go quickly",
    "Which is correct?|\"Wait,\" said Mia, \"I forgot my coat.\"|\"Wait\" said Mia and forgot my coat.|Mia said wait I forgot, my coat",
    "In US style, commas and periods go...|inside the closing quotation mark|outside it always|nowhere",
    "Which is correct?|\"Stop!\" he cried.|\"Stop!\" He cried loudly.|Stop he cried exclaiming.",
    "A speaker's quote of another quote uses...|single quotation marks inside double|brackets|dashes only"],
    ["Think about where the speaker's words end and where the comma, period or question mark belongs.", "In US style, punctuation goes inside the quotation mark. A dialogue tag after a comma or ? or ! is lowercase. Start a new paragraph for each new speaker.", "Example: \"Come here,\" Sam said. The comma sits inside the quote and 'said' is lowercase. Now do yours."],
    [["Inside the marks", "💬", "In US style, commas and periods go <b>inside</b> closing quotation marks."], ["Tags stay lowercase", "🏷️", "After a comma, ?, or !, the tag continues the sentence: <i>\"Go!\" she said.</i>"], ["New voice, new line", "↩️", "Begin a new paragraph each time a different person speaks."]]);

  const A10 = mk("College application essays", "🎓", [
    "A good application essay mostly shows...|who you are through a specific story|a list of grades|a copy of your resume",
    "Which opening is strongest?|The smell of burnt toast taught me patience.|I have always been passionate.|Since the dawn of time...",
    "What does a reader want to learn from your essay?|Your voice, values and thinking|Facts already in your transcript|How long you can write",
    "Which is best to avoid?|Clichés like 'I want to change the world'|Specific details|A clear focus",
    "Should you write someone else's voice?|No, use your own honest voice|Yes, sound as fancy as possible|Yes, copy a sample",
    "Which topic is best handled?|A small moment that shows growth|Everything you ever did|A summary of your resume",
    "Before sending, you should...|proofread and ask for feedback|add more adjectives|remove your name",
    "A strong ending...|shows what you learned or how you'll grow|repeats the first line only|apologizes"],
    ["Think about what the reader cannot find anywhere else in your application.", "Admissions readers already see grades and activities. The essay adds personal voice, a specific moment, honest reflection and clear writing.", "Example: Instead of 'I love science', describe the afternoon you rebuilt a broken radio and what it taught you. Now do yours."],
    [["Show a person", "🎓", "A <b>personal essay</b> lets the reader hear your voice and see how you think."], ["Go small", "🔍", "One specific moment beats a list of everything you have done."], ["Stay honest", "🤝", "Skip clichés and big claims. Reflect on what you learned, then proofread carefully."]]);

  const A11 = mk("Note-taking methods", "📝", [
    "In Cornell notes, the narrow left column is used for...|cues and questions|page numbers|doodles only",
    "In Cornell notes, the bottom section holds...|a short summary in your own words|the title|the date only",
    "Which method uses indents to show main ideas and details?|Outline method|Charting method|Mapping method",
    "Which is best for comparing facts across categories?|Charting method|Sentence method|Highlighting only",
    "Why put notes in your own words?|It helps you understand and avoid accidental copying|It is required by law|It is faster to copy",
    "Reviewing notes soon after a lecture...|strengthens memory|has no effect|erases them",
    "A good note-taker records...|key ideas and the source|every word|only the jokes",
    "When taking notes from a source, you should also write down...|author, title, page or link|nothing else|only your opinion"],
    ["Think about what the method is built to help you do: find, compare, review or summarize.", "Cornell notes use three zones (notes, cues, summary). Outlines show levels of ideas. Charts compare. Always note the source for later citing.", "Example: In a chart, rows = countries and columns = population, capital, language. Now do yours."],
    [["Cornell notes", "📝", "Divide the page: <b>notes</b> on the right, <b>cues</b> on the left, <b>summary</b> at the bottom."], ["Other methods", "🗂️", "<b>Outlines</b> show ideas and details. <b>Charts</b> compare. <b>Maps</b> show links."], ["Keep the source", "🔖", "Write author, title and page with each note so citing later is easy."]]);

  const A12 = mk("Scholarly or popular?", "📚", [
    "Which is a scholarly source?|A peer-reviewed journal article|A celebrity gossip site|A product ad",
    "Peer review means...|experts check the work before publication|friends like the post|the author edits it alone",
    "Scholarly articles usually include...|references and an author's credentials|only photos|slang",
    "A magazine written for the general public is...|popular|scholarly|a primary document",
    "Who is the audience for scholarly work?|Experts and students in the field|Anyone casually scrolling|Advertisers",
    "Which is the best source for a college research paper?|A peer-reviewed study|An anonymous forum post|A promotional video",
    "A trade publication is written for...|people working in a profession|only children|nobody",
    "What helps you spot a scholarly article?|A methods section and a bibliography|Bright colors|Many ads"],
    ["Ask who wrote it, who reviewed it, and who it is written for.", "Scholarly sources are written by experts, reviewed by other experts, and cite their sources. Popular sources aim at a general audience and may not.", "Example: A journal on marine biology with a bibliography is scholarly; a travel magazine's beach feature is popular. Now do yours."],
    [["Two kinds", "📚", "<b>Scholarly</b> sources are written by experts for experts. <b>Popular</b> sources are for general readers."], ["Clues", "🔎", "Look for author credentials, references, a methods section, and <b>peer review</b>."], ["Choose wisely", "✅", "Use scholarly sources for evidence; popular ones can give background or news."]]);

  const A13 = mk("Searching with Boolean words", "🔎", [
    "Which word narrows a search to results with BOTH terms?|AND|OR|NOT",
    "Which word broadens a search to include either term?|OR|AND|NOT",
    "Which word excludes a term from results?|NOT|AND|OR",
    "Quotation marks around \"climate change\" make the database...|search for that exact phrase|ignore it|search each letter",
    "Which search gives the fewest results?|teens AND sleep AND grades|teens OR sleep|sleep",
    "An asterisk in teen* usually finds...|teen, teens, teenager|only teen|nothing",
    "Which keywords could replace 'kids' to widen a search?|children OR youth OR adolescents|kids kids kids|NOT kids",
    "If you get too many results, you should...|add a narrowing term with AND|remove all keywords|use OR with everything"],
    ["Think about whether you want results to contain all the terms, any of them, or to exclude something.", "AND narrows, OR broadens, NOT removes. Quotation marks keep phrases together and an asterisk can cover word endings.", "Example: 'coffee AND memory' narrows; 'coffee OR tea' broadens. Now do yours."],
    [["Search words", "🔎", "<b>AND</b> narrows, <b>OR</b> broadens, <b>NOT</b> removes."], ["Phrase and wildcard", "✨", "<b>\"exact phrase\"</b> keeps words together; <b>teen*</b> finds teen, teens, teenager."], ["Adjust", "🎛️", "Too many results? Add terms. Too few? Try synonyms with OR."]]);

  const A14 = mk("Numbers as evidence", "🔢", [
    "Which kind of evidence is quantitative?|A survey of 500 students|A single interview quote|A poem",
    "Which is qualitative evidence?|A detailed interview about feelings|The average test score|A percentage",
    "A study with only 6 people gives a ___ sample.|small|large|random",
    "Which claim is stronger?|A study of 3,000 people found a link.|My cousin says it works.|Everyone knows it.",
    "A statistic without a source is...|weak, because you cannot check it|automatically true|more convincing",
    "Which combination often persuades best?|Numbers plus a human story|Only slogans|Only adjectives",
    "Cherry-picking data means...|using only the numbers that fit your claim|collecting every number|averaging",
    "When using a statistic, you should say...|where it came from and what it measures|nothing; numbers speak alone|it is secret"],
    ["Ask what kind of evidence it is: numbers, or descriptions and experiences? Then ask if it is trustworthy.", "Quantitative evidence uses numbers; qualitative uses words, stories and observations. Good writers check the source and sample, and combine both.", "Example: 'Seventy percent of 1,000 voters' is quantitative; 'One voter described waiting two hours' is qualitative. Now do yours."],
    [["Two types", "🔢", "<b>Quantitative</b> = numbers. <b>Qualitative</b> = descriptions, interviews and observations."], ["Check it", "🧐", "How large is the sample? Who collected it? Is the source named?"], ["Blend them", "🤝", "A statistic shows scale; a story shows what it means to real people."]]);

  const A15 = mk("Chicago notes", "🗒️", [
    "In Chicago style, a footnote appears...|at the bottom of the page|only at the end|in the title",
    "A superscript number in the text points to...|a note|a page break|a new chapter",
    "Chicago notes-bibliography style puts sources in...|notes plus a bibliography|only parentheses|only the title page",
    "Which field is used mostly in history papers?|Chicago style|APA style|Bluebook only",
    "Where do superscript note numbers go?|After the punctuation, usually at the end of the clause or sentence|Before the first word|In the middle of a word",
    "What does 'Ibid.' mean?|The same source as the note just before|A new source|The author's name",
    "The bibliography is arranged...|alphabetically by author|by date added|by length",
    "Notes are numbered...|in order through the paper|starting again each line|randomly"],
    ["Think about where the reader looks to find a source: in the text, at the bottom, or in an alphabetical list.", "Chicago notes style marks a source with a raised number. The note gives full details at the bottom (footnote) or end (endnote), and a bibliography lists all sources alphabetically.", "Example: A raised 1 after a quote leads to note 1 listing author, title and page. Now do yours."],
    [["Raised numbers", "🗒️", "A small number in the text sends the reader to a <b>footnote</b> with the source."], ["Bibliography", "📖", "At the end, a bibliography lists all sources alphabetically by author's last name."], ["Used in history", "🏛️", "<b>Chicago</b> is common in history and some humanities. Check your instructor's choice."]]);

  const A16 = mk("Clichés and mixed metaphors", "🪄", [
    "Which phrase is a cliché?|at the end of the day|the bridge hummed with rain|a quiet engine of hope",
    "Why avoid clichés?|They are worn out and add no fresh meaning|They are rude|They are illegal",
    "Which is a mixed metaphor?|We'll burn that bridge when we come to it.|She was as quiet as snow.|Time is a thief.",
    "Fix the cliché 'busy as a bee' with something fresher:|busy as a lighthouse keeper in a storm|busy as a bee|busy bee",
    "Which is a cliché?|think outside the box|he whistled like a kettle|the street swallowed the sunset",
    "A mixed metaphor...|blends two images that clash|is a simile|is a pun",
    "Which is best when you spot a cliché in your draft?|Say it in plain, specific words|Add another cliché|Leave it",
    "Which is a cliché?|only time will tell|light rain slicked the window|the ink dried like a promise"],
    ["Ask whether you have heard the phrase hundreds of times, or whether two images are fighting each other.", "A cliché is an overused expression. A mixed metaphor jumbles images that do not fit. Replace both with plain words or one fresh, consistent image.", "Example: 'Taking the bull by the horns and sailing into the sunset' mixes images; pick one. Now do yours."],
    [["Worn-out phrases", "🪄", "A <b>cliché</b> is an expression used so often it has lost its power."], ["Clashing images", "💥", "A <b>mixed metaphor</b> blends images that don't match, like <i>a tide of fire</i> falling flat."], ["Fix it", "✍️", "Say exactly what you mean, or build one fresh image and keep it consistent."]]);

  const A17 = mk("Euphemism and doublespeak", "🎭", [
    "A euphemism is...|a mild word replacing a harsh one|a loud word|a rhyme",
    "Which is a euphemism for 'died'?|passed away|ran fast|woke up",
    "Doublespeak is language that...|hides or twists the truth|is very clear|is poetic",
    "Which phrase is doublespeak for 'firing people'?|workforce optimization|hiring event|team lunch",
    "Why do writers sometimes use euphemisms?|To be gentle or polite|To confuse always|To rhyme",
    "A euphemism becomes a problem when...|it hides an important truth from the reader|it is kind|it is short",
    "'Between jobs' is a euphemism for...|unemployed|promoted|retired rich",
    "To write clearly in an essay, prefer...|plain words that name the thing|vague phrases|jargon"],
    ["Think about whether the soft phrase is polite or whether it hides something the reader deserves to know.", "A euphemism softens a harsh idea. Doublespeak goes further and makes something unpleasant sound pleasant or disguises it. Clear writers name things honestly.", "Example: 'Downsizing' for 'laying off workers' can hide who is affected. Now do yours."],
    [["Soft words", "🎭", "A <b>euphemism</b> replaces a harsh word with a gentler one: <i>passed away</i>."], ["Hidden truth", "🙈", "<b>Doublespeak</b> blurs or twists meaning to avoid blame or detail."], ["Be clear", "🔦", "In academic writing, choose words that tell the reader what actually happened."]]);

  const A18 = mk("Definition arguments", "📖", [
    "A definition argument debates...|what something is or counts as|how much it costs|who wrote it",
    "Which question is a definition question?|Is online learning really 'school'?|When was the school built?|How many students enrolled?",
    "To argue a definition, you first...|state the criteria for the category|attack the reader|list random facts",
    "A writer says a video game is a sport. Which support fits?|Comparing it to the criteria for sports|Listing prices|Naming a sponsor",
    "Why define key terms in an essay?|So readers know exactly what you mean|To fill space|To sound strict",
    "Which term most needs defining in a paper on 'success'?|success|Tuesday|the|table",
    "A strong definition argument usually uses...|criteria and examples|insults|guesses",
    "The 'criteria' in a definition argument are...|the standards a thing must meet|its price|its color"],
    ["Think about the question: not 'what happened' but 'what does this word really cover?'", "Definition arguments set criteria for a category, then show whether the thing meets them using examples and comparisons.", "Example: Is a hot dog a sandwich? Set criteria (food between bread), then test it. Now do yours."],
    [["What counts?", "📖", "A <b>definition argument</b> claims something does or does not belong in a category."], ["Set criteria", "📏", "State the standards for the category, then test your example against them."], ["Define terms", "🔑", "In any paper, define slippery words like <i>success</i> or <i>freedom</i> so readers share your meaning."]]);

  const L25 = [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18];

  // =============== LEVEL 26 ===============
  const B1 = mk("Stasis questions", "❓", [
    "'Did it happen?' is a question of...|fact|definition|policy",
    "'What is it, exactly?' is a question of...|definition|fact|policy",
    "'How good or bad is it?' is a question of...|quality (value)|fact|definition",
    "'What should we do about it?' is a question of...|policy (action)|fact|quality",
    "Which is a question of fact?|Did the river flood last spring?|Is the flood a disaster or an emergency?|Should the town build a wall?",
    "Which is a question of policy?|Should the town ban building on the floodplain?|Did it rain?|Is rain pleasant?",
    "Which is a question of quality?|Was the city's response good enough?|Did the city respond?|Should the city respond differently next time?",
    "Why use stasis questions?|To find exactly what the disagreement is about|To avoid evidence|To end all debate"],
    ["Match the kind of question to its job: Did it happen? What is it? How good is it? What should we do?", "Stasis theory sorts disagreements into fact, definition, quality and policy. Knowing which one you face tells you what kind of evidence you need.", "Example: 'Should phones be banned in class?' is policy, because it asks what to do. Now do yours."],
    [["Where do we disagree?", "❓", "<b>Stasis questions</b> help people find the exact point of conflict in an argument."], ["Four types", "4️⃣", "<b>Fact</b> (did it happen?), <b>definition</b> (what is it?), <b>quality</b> (how good?), <b>policy</b> (what to do?)."], ["Match evidence", "🧩", "Facts need data, definitions need criteria, quality needs standards, policy needs plans and results."]]);

  const B2 = mk("Proposal arguments", "📋", [
    "A proposal argument says...|what should be done|what was done|what is true",
    "Which is a strong proposal element?|A clear problem and a workable solution|Only a complaint|Only the history",
    "Which question must a proposal answer?|Will this solution actually work?|Who is the tallest?|What is the weather?",
    "Which sentence is a proposal claim?|The district should add a 30-minute reading block each day.|Reading is old.|Many students read.",
    "Why mention cost and feasibility?|The reader needs to know it can be done|To hide the plan|To pad the length",
    "Which is a weakness in a proposal?|No evidence the plan will help|A named audience|A clear deadline",
    "A good proposal also addresses...|objections and alternatives|only praise|nothing",
    "A proposal usually begins by...|showing there is a real problem|asking for money|listing credits"],
    ["Think of what a reader needs to approve a plan: a problem, a solution, proof and practicality.", "A proposal argument names a problem, offers a specific solution, shows why it will work, covers cost and obstacles, and answers objections.", "Example: 'Our library should open Sundays' needs data on demand, a staffing plan and a cost. Now do yours."],
    [["Problem to plan", "📋", "A <b>proposal argument</b> shows a problem, then argues for a specific solution."], ["Prove it works", "🛠️", "Use evidence, examples and a clear plan. Say who does what, when, and for what cost."], ["Face objections", "🛡️", "Compare your plan with alternatives and answer likely doubts."]]);

  const B3 = mk("Evaluation arguments", "⚖️", [
    "An evaluation argument judges...|how good or bad something is|what to do next|when it happened",
    "Criteria in an evaluation are...|the standards used to judge|the author's name|its price",
    "Which is a good criterion for judging a restaurant?|food quality and service|the color of the door only|its zip code",
    "A strong evaluation needs...|criteria and evidence|only opinion|only adjectives",
    "Which review sentence supports a judgment with evidence?|The pasta was fresh and served hot within ten minutes.|It was nice.|Everyone knows it's good.",
    "Why state criteria first?|So the reader can accept your standards|To avoid judging|To lengthen the text",
    "A fair evaluation admits...|strengths and weaknesses|only flaws|only praise",
    "Which is NOT evidence?|I just feel it's great.|Fifty test results|A direct quote"],
    ["Ask: what standard am I using to judge, and what proof do I show?", "An evaluation argument sets criteria, applies them to the subject with evidence, and reaches a judgment. Fair writers acknowledge both strengths and weaknesses.", "Example: To judge a bike, use criteria like safety, comfort and price, then show how it measures up. Now do yours."],
    [["Judging well", "⚖️", "An <b>evaluation</b> argues how good, bad or useful something is."], ["Criteria", "📏", "Name the standards first, such as <i>safety, cost, effectiveness</i>."], ["Evidence", "🔬", "Show how the subject meets or misses each criterion. Be fair about weaknesses."]]);

  const B4 = mk("Rhetorical analysis essays", "🔍", [
    "A rhetorical analysis essay explains...|how a text persuades, not whether you agree|what you did last week|the plot only",
    "Which sentence belongs in a rhetorical analysis?|The speaker builds trust by citing her years of experience.|I disagree with the speaker.|The speech was long.",
    "Which pair of words describes the author's choices to analyze?|diction and structure|price and size|color and weight",
    "What question guides the analysis?|How does the writer try to convince this audience?|What is my favorite part?|Who is tallest?",
    "A thesis for this essay might say...|how the writer uses appeals to reach the audience|that the topic is boring|only the date",
    "Which is analysis rather than summary?|The repeated question builds urgency for the audience.|The speaker talks about voting.|The speech begins with a story.",
    "Evidence in this essay comes from...|the text itself|your personal opinion only|rumors",
    "After each quote, you should...|explain the effect on the audience|add another quote|change topic"],
    ["Think about the how and why of the text, not the what. Whom is it meant to move?", "A rhetorical analysis looks at the writer's purpose, audience and choices (appeals, tone, structure) and explains how those choices work. It judges effectiveness, not agreement.", "Example: 'The poster uses a child's face to stir sympathy, which pushes viewers to donate.' Now do yours."],
    [["How it persuades", "🔍", "A <b>rhetorical analysis</b> explains the writer's choices and their effect on an audience."], ["Look closely", "🔬", "Study appeals, word choice, tone, structure and evidence. Quote the text."], ["Explain effects", "🎯", "Do not just name a technique. Say what it does to the reader and why it works."]]);

  const B5 = mk("Literature reviews", "📚", [
    "A literature review...|surveys and compares existing research on a topic|is a book report|presents only new data",
    "A good literature review is organized by...|themes or debates|alphabet of titles|word count",
    "What gap does a review try to find?|Something not yet studied or answered|A typo|A missing page",
    "Which is the better sentence?|Several studies link sleep and memory, but few test teens.|Smith wrote a paper. Jones wrote a paper.|There are many papers.",
    "A literature review should...|synthesize sources and show how they connect|only list summaries|ignore disagreement",
    "Where does a lit review often appear?|Near the start of a research paper or thesis|Only after the conclusion|Never",
    "Why do researchers write one?|To show what is known and why their work is needed|To copy others|To skip research",
    "Which verb helps compare studies?|contrasts|goes|likes"],
    ["Think about what the review does for the reader: it maps what is already known and what is missing.", "A literature review is not a list of summaries. It groups sources by theme, compares findings, notes debates and points out the gap your project fills.", "Example: 'Three studies find X, but none test Y' sets up a new study on Y. Now do yours."],
    [["Map the research", "📚", "A <b>literature review</b> surveys what scholars have already found on a topic."], ["Organize by idea", "🧩", "Group by theme or debate, not source by source. Compare and contrast findings."], ["Find the gap", "🕳️", "End by showing what is still unknown. That is where your work fits."]]);

  const B6 = mk("Common knowledge", "💡", [
    "Which usually needs no citation (common knowledge)?|Water boils at 100 degrees Celsius at sea level.|A 2021 study found 43 percent of teens sleep under 7 hours.|A scientist's exact quote",
    "Which needs a citation?|A specific statistic|The Earth orbits the Sun|Paris is in France",
    "If unsure whether something is common knowledge, you should...|cite it|skip it|guess",
    "Common knowledge is...|widely known and easily found in many sources|a secret|a quotation",
    "A direct quote always needs...|a citation|no mark|a new title",
    "Someone else's original idea or interpretation needs...|credit|no credit|a joke",
    "Which does NOT need a citation?|The United States has fifty states.|A researcher's survey results|A famous critic's opinion",
    "Why is it safer to over-cite than under-cite?|It prevents accidental plagiarism|It lowers your grade|It is shorter"],
    ["Ask whether a reader could verify it in many places without anyone owning the idea.", "Common knowledge is widely known facts. Specific data, quotes, someone else's ideas and anything surprising need citations. When in doubt, cite.", "Example: 'Dogs are mammals' needs no source; 'Dogs can smell 100,000 times better than humans' does. Now do yours."],
    [["Everyone knows", "💡", "<b>Common knowledge</b> is basic information widely known and found in many sources."], ["Always cite", "📌", "Quotes, statistics, research results and other people's ideas or interpretations."], ["When unsure", "🤔", "Cite it, or ask your instructor. A citation never hurts."]]);

  const B7 = mk("Academic integrity", "🛡️", [
    "Turning in the same paper for two classes without permission is...|self-plagiarism|good time management|allowed always",
    "Which is a form of academic dishonesty?|Having someone else write your essay|Visiting the writing center|Using a citation tool",
    "Working with a friend when the instructor says 'individual work' is...|a violation of the rules|always fine|a citation",
    "Which is acceptable?|Asking a tutor to explain your thesis|Buying a paper online|Copying a classmate's draft",
    "What is fabrication?|Making up data or sources|Revising a draft|Quoting properly",
    "If you are unsure about a rule, you should...|ask the instructor|guess|ignore it",
    "Citing every source shows...|honesty and respect for others' work|weakness|laziness",
    "Why does integrity matter?|It builds trust in your work and in scholarship|Only to avoid fines|It doesn't matter"],
    ["Think about whether the work and ideas are honestly yours, with credit for others.", "Academic integrity means doing your own work, crediting others, and not faking data or sources. Reusing your old paper or sharing answers without permission also counts as a violation.", "Example: Inventing a survey result to fit your claim is fabrication. Now do yours."],
    [["Honest work", "🛡️", "<b>Academic integrity</b> means your work is honestly yours and borrowed ideas are credited."], ["Common violations", "🚧", "Plagiarism, fabricating data, unauthorized help, and reusing a paper without permission."], ["Ask first", "🙋", "If rules are unclear, ask your instructor or writing center before you submit."]]);

  const B8 = mk("Old before new", "🔗", [
    "Smooth sentences usually start with...|information the reader already knows|brand-new technical terms|a quote",
    "Choose the smoother second sentence.<br><br><b>The team studied a rare frog.</b>|The frog's skin contains a surprising chemical.|A surprising chemical is in some skin of the frog.|Surprising is the chemical of skin.",
    "Choose the smoother second sentence.<br><br><b>A storm hit the coast on Monday.</b>|The storm flooded three towns.|Three towns flooded because of weather.|Flooding came at three towns.",
    "'Old before new' helps with...|flow between sentences|spelling|margins",
    "New or important information is best placed...|at the end of a sentence|in the middle always|in a footnote",
    "Which pair flows better?|The museum bought a painting. The painting was found in an attic.|The museum bought a painting. Attic was where it was found by someone.|A painting. The museum.",
    "Starting a sentence with a pronoun like <i>this</i> or <i>that</i> works best when...|it clearly refers back to the last idea|it could mean many things|nothing came before",
    "A sentence feels disconnected when...|its start has no link to the previous sentence|it is short|it has a verb"],
    ["Check how each sentence begins. Does it link to something the reader just saw?", "Start with familiar information from the sentence before, then add the new fact at the end. This chain makes writing flow.", "Example: 'The lab built a robot. The robot can climb stairs.' Now do yours."],
    [["A chain of ideas", "🔗", "Open a sentence with something the reader <b>already knows</b>."], ["End with the new", "🏁", "Place new, important information at the <b>end</b> where it gets emphasis."], ["Check links", "🔍", "If a sentence starts with something strange and unfamiliar, the reader may feel lost."]]);

  const B9 = mk("Characters as subjects", "🧑‍🏫", [
    "Which is clearer?|The mayor decided to close the park.|The decision to close the park was made by the mayor.|Closing of the park was a decision.",
    "Which has a clear character as the subject?|Researchers measured the temperature.|Measurement of temperature was done.|There was a measurement.",
    "Which sentence hides the doer?|Mistakes were made.|We made mistakes.|The manager made mistakes.",
    "Which is clearer?|Students need to review more.|There is a need for review among students.|Review is needed by students.",
    "Clear writing often makes the subject...|the doer of the action|a long abstract noun|a pronoun with no referent",
    "Which verb carries the action best?|We analyzed the data.|We did an analysis of the data.|We gave consideration to the data.",
    "Which is clearer?|The council approved the budget.|The approval of the budget was by the council.|There was approval from the council.",
    "Why put people or things as subjects?|Readers picture who does what|It adds more words|It hides actions"],
    ["Ask: who or what is acting? Is that doer at the start of the sentence, and is the action a verb?", "Make the main character the subject and the main action the verb. Avoid turning actions into abstract nouns and burying the doer.", "Example: 'The investigation of the leak by engineers was conducted' becomes 'Engineers investigated the leak.' Now do yours."],
    [["Who does what", "🧑‍🏫", "Clear sentences name a <b>character</b> as subject and show the action as the <b>verb</b>."], ["Weak pattern", "🚫", "Abstract subject plus 'was' plus the doer at the end: <i>The approval was given by the board</i>."], ["Better", "✅", "<i>The board approved it.</i> Short, direct, easy to picture."]]);

  const B10 = mk("End focus and emphasis", "📍", [
    "The strongest spot for emphasis in a sentence is usually...|the end|the middle|a parenthesis",
    "Which version stresses <i>courage</i> most?|Above all else, what the firefighter showed was courage.|The courage of the firefighter, above all else, was shown.|Showing, the firefighter had courage.",
    "Which version ends with the key idea 'failure'?|After years of effort, the plan ended in failure.|Failure ended the plan after years of effort, finally.|The plan after years failure ended.",
    "A short sentence after long ones can...|create emphasis|confuse the reader always|remove meaning",
    "Burying the key idea in the middle of a long sentence...|weakens it|strengthens it|has no effect",
    "Which sentence uses a dash for emphasis?|She had one goal—victory.|She had one goal and (victory).|She had one goal, then: victory.",
    "Why place new information last?|The reader finishes on what is most important|It saves ink|It prevents questions",
    "Which ending feels strongest?|…and that changed everything.|…and so on and so forth.|…etc."],
    ["Where does the reader's eye land last? That is where weight falls.", "Place the key idea at the end of a sentence or paragraph. A short sentence after longer ones, or a dash before a final word, adds emphasis.", "Example: 'The test is over, and I passed' ends on the good news. Now do yours."],
    [["The last word", "📍", "The <b>end</b> of a sentence gets the most weight. Put your key idea there."], ["Short after long", "✂️", "A short sentence after longer ones makes a point stand out."], ["Dash it", "➖", "A dash can set up a final word or phrase for impact."]]);

  const B11 = mk("When passive voice helps", "🔄", [
    "The passive voice is useful when...|the doer is unknown or unimportant|you want to hide nothing|you have a strong verb",
    "Which sentence is passive?|The vase was broken.|The cat broke the vase.|Break the vase.",
    "In lab reports, passive is common because...|the process matters more than who did it|authors are unknown always|it is shorter always",
    "Which is a good use of passive?|The bridge was completed in 1932.|It was decided by me that I would go.|Mistakes were made by me.",
    "Which sentence hides who is responsible?|The window was broken.|Jo broke the window.|I broke the window.",
    "Which is the active version of 'The cake was eaten by Sam'?|Sam ate the cake.|The cake Sam ate.|Eating was done by Sam.",
    "Overusing passive can make writing...|vague and wordy|more exact|more lively",
    "Passive voice moves the receiver of the action to...|the subject position|the end only|the title"],
    ["Find who or what receives the action and who does it. Does the reader need to know the doer?", "Active voice puts the doer first. Passive puts the receiver first. It is helpful when the doer is unknown, unimportant, or when the receiver is the topic, but it can make prose vague if overused.", "Example: 'The painting was stolen overnight' fits when the thief is unknown. Now do yours."],
    [["Two voices", "🔄", "<b>Active</b>: The dog chased the ball. <b>Passive</b>: The ball was chased by the dog."], ["Use it well", "👍", "Good when the doer is unknown or unimportant, or when the topic is the receiver."], ["Beware", "⚠️", "Passive can hide responsibility and add extra words. Prefer active by default."]]);

  const B12 = mk("Signposting your paper", "🪧", [
    "Signposting means...|telling the reader where the paper is going|adding road maps|using pictures",
    "Which is a signpost?|First, I will examine the causes.|The sky is blue.|Dogs bark.",
    "Which phrase signals a shift to a contrast?|On the other hand,|For example,|In addition,",
    "Which phrase signals an example?|For instance,|However,|In conclusion,",
    "Which phrase signals a conclusion?|In summary,|Meanwhile,|Although,",
    "A road-map sentence in an introduction...|previews the order of main points|ends the paper|lists sources",
    "Which phrase signals an added point?|Moreover,|Despite this,|Instead,",
    "Too many signposts can...|sound mechanical|improve every paper|replace evidence"],
    ["Think about what the phrase tells the reader: more, contrast, example or wrap-up?", "Signposts help readers follow the structure. Use them to preview, add, contrast, give examples and conclude, but vary them so they do not sound robotic.", "Example: 'Next, I will show how cost affects use' tells the reader what comes next. Now do yours."],
    [["Guide the reader", "🪧", "<b>Signposting</b> uses words and sentences to show the structure of a paper."], ["Common signals", "🚦", "<b>Moreover</b> adds, <b>however</b> contrasts, <b>for instance</b> gives an example, <b>in summary</b> wraps up."], ["Light touch", "🪶", "Use signposts to help, not to repeat. Let your ideas do most of the work."]]);

  const B13 = mk("Weasel words and intensifiers", "🦊", [
    "Which phrase is a weasel word?|some experts say|a 2020 study of 400 adults found|according to the CDC",
    "Which word is an intensifier?|extremely|study|because",
    "Why are weasel words weak?|They sound like evidence without naming a source|They are precise|They are formal",
    "Which version is stronger?|The report found a 12 percent rise.|It is often said that numbers rise a lot.|Many say things rise.",
    "Replace 'very tired' with a stronger word:|exhausted|tired very|tire",
    "Overusing 'really' and 'very' makes writing...|weaker|more exact|shorter and sharper always",
    "Which is vague?|Studies show that...|A 2019 Stanford study showed that...|The author notes that...",
    "A better fix for 'Many people believe...' is...|name who believes it and cite them|add 'truly'|add 'obviously'"],
    ["Ask: who says so? How much is 'many'? A precise source or number beats a vague claim.", "Weasel words (some say, many experts) hide the source. Intensifiers (very, really, extremely) add little. Use specific evidence and strong precise words.", "Example: 'Many doctors recommend it' becomes 'The American X Association recommends it (2022).' Now do yours."],
    [["Vague voices", "🦊", "<b>Weasel words</b> like <i>some say</i> sound like evidence but name no one."], ["Empty boosters", "📢", "<b>Intensifiers</b> such as <i>very</i> and <i>really</i> rarely add meaning."], ["Be exact", "🎯", "Name the source, give the number, and choose one strong word instead of two weak ones."]]);

  const B14 = mk("Writing numbers", "🔟", [
    "In many style guides, numbers under ten are...|spelled out|always digits|roman numerals",
    "Which is a common rule for starting a sentence?|Spell out the number|Use digits|Use a symbol",
    "Which is usually correct in an essay?|There were five students.|There were 5 students.|There were V students.",
    "Which is correct for a measurement in a science paper?|The sample weighed 7 grams.|The sample weighed seven gram.|The sample weighed about, seven g.",
    "Which is correct at the start of a sentence?|Twenty students passed.|20 students passed.|Twenty, students passed because.",
    "Which style often uses digits for all numbers 10 and above?|Most general styles|None|Only poetry",
    "A percentage in text is often written as...|45 percent|forty-five percent always|%45",
    "It is best to be...|consistent|random|creative with numbers"],
    ["Think about the style guide: small numbers are usually spelled out, larger ones use digits, and sentences never begin with digits.", "Common rule: spell out numbers under 10 and at the start of a sentence; use digits for 10 and above and for measurements. Always follow your assigned style guide and be consistent.", "Example: 'Three cats and 12 dogs' follows the general rule. Now do yours."],
    [["Words or digits", "🔟", "Many styles spell out numbers <b>below ten</b> and use digits from <b>10</b> upward."], ["Sentence starters", "🏁", "Never begin a sentence with a digit. Spell it out or reword."], ["Be consistent", "📏", "Follow your assigned style and apply it the same way throughout."]]);

  const B15 = mk("Style guides compared", "📘", [
    "Which style is most common in English and literature classes?|MLA|APA|Chicago footnotes only",
    "Which style is most common in psychology and the social sciences?|APA|MLA|AP",
    "Which style is used by newspapers and news writers?|AP|APA|MLA",
    "In APA, the in-text citation usually shows...|author and year|author and page only|title only",
    "In MLA, the in-text citation usually shows...|author and page|year only|nothing",
    "Chicago style is often used in...|history|physics labs|math proofs",
    "A style guide mostly decides...|format, citations and conventions|your thesis|your topic",
    "When your instructor names a style, you should...|follow it exactly|choose another|ignore it"],
    ["Match each style to the field that uses it most. Then recall what each puts in parentheses.", "MLA: humanities; in-text author and page. APA: social sciences; author and year. Chicago: history and some humanities. AP: journalism.", "Example: A psychology report cites (Lee, 2020). Now do yours."],
    [["Different fields", "📘", "<b>MLA</b> for English, <b>APA</b> for social sciences, <b>Chicago</b> for history, <b>AP</b> for news."], ["In-text clues", "🔍", "MLA: (Author page). APA: (Author, Year)."], ["Follow the assignment", "📌", "Always use the style your instructor requires and keep it consistent."]]);

  const B16 = mk("Reflective writing", "🪞", [
    "Reflective writing mainly...|thinks about what you learned from an experience|reports a news event|argues a political claim",
    "Which sentence is reflective?|I realized that revising teaches me more than drafting does.|The paper had five pages.|Reflection is a word.",
    "A reflection often answers...|What did I learn and what will I do differently?|Who is the author?|What is the price?",
    "A portfolio is...|a collection of your work with reflection|a single test|a font",
    "Which belongs in a portfolio reflection?|Why you chose this piece and what it shows about your growth|A list of friends|A joke",
    "Reflective writing often uses...|first person|only third person|no verbs",
    "Which is stronger?|My thesis improved after I tested each claim against evidence.|It was good.|I did stuff.",
    "Specific examples in reflection...|make growth believable|are unneeded|replace thinking"],
    ["Think about looking back: what happened, what you learned, what changes next.", "Reflective writing uses first person to examine your own learning with specific examples. Portfolios pair work samples with reflections that show growth.", "Example: 'When I cut my intro in half, I saw my thesis more clearly.' Now do yours."],
    [["Looking back", "🪞", "<b>Reflective writing</b> examines your own experience and what it taught you."], ["Be specific", "🔍", "Point to a draft, a change or a moment, not just 'I learned a lot.'"], ["Portfolio", "🗂️", "A <b>portfolio</b> gathers your work plus reflection that explains your choices and growth."]]);

  const B17 = mk("Case studies and policy briefs", "🗃️", [
    "A case study examines...|one example in depth|a hundred examples briefly|only numbers",
    "A policy brief is written for...|decision makers who need a quick, clear recommendation|poets|children only",
    "A policy brief usually includes...|a problem, evidence and a recommendation|a rhyme|a plot twist",
    "Which is a good policy brief feature?|Short sections and clear headings|A very long story|No sources",
    "A case study is useful because it...|shows details of how a general issue plays out|replaces all data|proves every rule",
    "Which sentence is a recommendation?|The city should install bike lanes on Main Street.|Bikes have two wheels.|Main Street is long.",
    "Which first part helps a busy reader?|A one-paragraph summary|A long preface|A blank page",
    "Both genres rely on...|evidence|decoration|guesses"],
    ["Ask who reads it and what they need: depth on one example, or a quick recommendation.", "A case study studies a single situation in depth. A policy brief gives decision makers a clear problem, evidence and a recommended action, in short, organized sections.", "Example: A brief might say 'Problem: bus delays; Evidence: 30% late; Recommendation: add two buses.' Now do yours."],
    [["Case study", "🗃️", "Looks closely at <b>one</b> person, place or event to learn about a bigger issue."], ["Policy brief", "📄", "A short document that gives leaders a <b>problem</b>, <b>evidence</b> and <b>recommendation</b>."], ["Make it scannable", "👀", "Use headings, short paragraphs and a summary at the top."]]);

  const B18 = mk("Memos and reports", "🗂️", [
    "A memo is usually...|short and focused on one purpose|a long novel|a poem",
    "A memo header usually shows...|To, From, Date and Subject|a rhyme scheme|a cover page only",
    "The best place for the main point in a memo is...|the first paragraph|the last line only|the footer",
    "Which subject line is best?|Budget Request for Library Computers|Hi|Important stuff",
    "A formal report often includes...|summary, findings, and recommendations|only a joke|only images",
    "Bullet points in a memo help by...|making lists easy to scan|adding decoration|hiding ideas",
    "A memo's tone is usually...|clear and professional|silly|rude",
    "Reports use headings to...|let readers find sections quickly|fill space|confuse"],
    ["Think about a busy reader. Where do they need the point and how do they find details?", "Memos are short, direct documents with a header (To, From, Date, Subject) and the main point first. Reports are longer, with headings, summaries, findings and recommendations.", "Example: Subject: 'Schedule Change for Friday Meeting' tells the reader exactly why you wrote. Now do yours."],
    [["Memo basics", "🗂️", "A <b>memo</b> has a header (To, From, Date, Subject) and puts the main point first."], ["Reports", "📊", "<b>Reports</b> are longer: summary, findings, and recommendations under clear headings."], ["Be scannable", "👀", "Bullets and short paragraphs help busy readers."]]);

  const L26 = [B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17, B18];

  // =============== LEVEL 27 ===============
  const C1 = mk("Writing in the disciplines", "🏫", [
    "Which field most often asks for lab reports?|Natural sciences|Poetry|Music history",
    "Which field often asks for close readings of texts?|Literature|Chemistry|Engineering",
    "What do history essays rely on heavily?|Primary and secondary sources|Experiments|Spreadsheets only",
    "Why do disciplines differ in writing?|Each has its own questions, evidence and conventions|Teachers dislike variety|All fields are the same",
    "A business report most values...|clear recommendations for decision makers|rhyming|long descriptions of scenery",
    "In science writing, the 'Methods' section explains...|how the study was done|the author's life|the conclusion only",
    "Which style is typical for a psychology paper?|APA|MLA footnotes|None",
    "A good first step in a new class is to...|read the assignment and look at sample papers|guess|skip the instructions"],
    ["Ask what the field studies and what counts as good evidence in it.", "Every discipline has its own questions, evidence, structures and style guide. Learning those expectations is part of learning the subject.", "Example: A biology paper uses Introduction, Methods, Results, Discussion; an English paper builds an argument about a text. Now do yours."],
    [["Different fields, different rules", "🏫", "<b>Writing in the disciplines</b> means each subject has its own expectations."], ["Look for patterns", "🔎", "Notice the structure, evidence and style guide that your field uses."], ["Ask and study", "🙋", "Read the assignment, check samples and ask your instructor what counts as strong work."]]);

  const C2 = mk("Academic voice and first person", "🗣️", [
    "Is first person ever allowed in academic writing?|Yes, in many fields when it is purposeful|Never|Only in titles",
    "Which sentence sounds more academic?|This study examines how sleep affects memory.|I just really wanted to look at sleep stuff.|So, like, sleep and memory.",
    "Which should be avoided in most academic writing?|Slang and contractions|Precise terms|Evidence",
    "Which is a good way to state your position?|I argue that the policy fails.|I feel like the policy is kind of bad.|The policy sucks.",
    "Academic writing values...|precision and evidence|exaggeration|humor in every line",
    "Which phrase is too casual?|a ton of data|a large body of data|extensive data",
    "In some disciplines, 'we' refers to...|the researchers or the author and reader|the whole world|nobody",
    "Why avoid 'you' in a formal essay?|It can sound informal or too general|It is a spelling error|It is illegal"],
    ["Think about tone: confident, precise, and professional, but not stuffy.", "Academic voice is clear, precise and evidence-based. First person is acceptable in many fields when it helps state your argument or describe your method, but avoid slang and vague phrases.", "Example: 'I argue that the data support X' is direct and academic. Now do yours."],
    [["Formal, not stiff", "🗣️", "<b>Academic voice</b> is clear, precise and professional."], ["First person", "☝️", "Many fields allow <i>I argue</i> or <i>we found</i>. Check your instructor's preference."], ["Avoid", "🚫", "Slang, vague intensifiers and chatty asides."]]);

  const C3 = mk("Close reading steps", "🔬", [
    "Close reading starts with...|noticing details of language and structure|skimming only|looking up the author's age",
    "Which step comes after noticing a pattern?|Asking what it means or does|Ignoring it|Counting pages",
    "Which detail would a close reader examine?|word choice and repetition|font size|page margin",
    "A close reader asks...|Why did the author choose this?|How fast can I finish?|Who is taller?",
    "Close reading helps you build...|an interpretation supported by the text|a summary only|a table of contents",
    "A good close reading connects details to...|a larger idea or theme|a random fact|a title page",
    "Which is a close-reading observation?|The poem repeats the word 'light' four times.|The poem is on page 12.|The poet is famous.",
    "After observing, the next step is to...|interpret the pattern|erase notes|stop reading"],
    ["Think: notice, question, interpret, connect.", "Close reading means noticing details (words, repetition, structure), asking why they matter, and building an interpretation supported by quotes.", "Example: Notice 'light' repeats; ask why; interpret it as hope. Now do yours."],
    [["Look slowly", "🔬", "<b>Close reading</b> studies a short passage in detail."], ["Notice, ask, interpret", "🧭", "Spot patterns, ask why they matter, then explain what they suggest."], ["Use proof", "📎", "Tie each idea to specific words from the text."]]);

  const C4 = mk("From working thesis to final thesis", "🌱", [
    "A working thesis is...|a draft claim you can refine|your final claim|a title",
    "When evidence disagrees with your thesis, you should...|revise the thesis|hide the evidence|ignore it",
    "Which revised thesis is stronger?|Though remote work boosts focus, it weakens teamwork for new staff.|Remote work is an issue.|Many work remotely.",
    "A thesis may change because...|research reveals new complexity|you forgot|a printer jammed",
    "A more complex thesis often uses...|a concession (although, while)|only 'and'|no verb",
    "Which is the best time to finalize your thesis?|After you know what your evidence shows|Before reading anything|Never",
    "A vague working thesis can be improved by...|making it more specific|making it shorter always|removing the claim",
    "A thesis that cannot change is...|not responding to evidence|ideal|always correct"],
    ["Think of a thesis as a living claim that improves as you learn more.", "A working thesis guides drafting. As research shows more, revise it to be more specific, more accurate and more nuanced.", "Example: 'Social media is bad' becomes 'Social media harms sleep in teens who use it after midnight.' Now do yours."],
    [["A first draft of a claim", "🌱", "A <b>working thesis</b> is a starting claim you expect to refine."], ["Let evidence talk", "🔬", "If sources complicate your claim, revise rather than ignore."], ["Add nuance", "🎚️", "Concessions like <i>although</i> help show the whole picture."]]);

  const C5 = mk("Using feedback and the writing center", "🧑‍🏫", [
    "A writing center tutor can help you...|improve your own writing and ideas|do your homework for you|choose your grade",
    "Which is a good question for a tutor?|Is my argument clear in paragraph two?|Can you write this for me?|What's my grade?",
    "When you get feedback, first...|read it all and look for patterns|get upset and quit|argue immediately",
    "Comments on 'unclear thesis' are about...|a global concern|a comma|a font",
    "Feedback about commas is a ___ concern.|local|global|big-picture",
    "Which response to feedback is best?|Make a plan to revise|Delete the paper|Ignore all of it",
    "Visiting office hours helps because...|you can clarify expectations|it counts as plagiarism|it is required",
    "Revising with feedback shows...|growth as a writer|weakness|cheating"],
    ["Think about who owns the work. You do, and feedback helps you improve it.", "Tutors and instructors give feedback to help you revise. Look for patterns, handle big-picture (global) issues first, then smaller (local) ones, and ask for clarity when needed.", "Example: Repeated comments about 'evidence' mean a global issue to fix before commas. Now do yours."],
    [["Help, not shortcuts", "🧑‍🏫", "Writing centers help you <b>improve</b> your writing; they do not write it for you."], ["Global first", "🌍", "Fix thesis, organization and evidence before sentence-level details."], ["Make a plan", "📝", "List the comments, rank them, and revise step by step."]]);

  const C6 = mk("APA reference lists", "📑", [
    "In an APA reference list, entries are ordered...|alphabetically by author|by date added|by length",
    "The reference list in APA is titled...|References|Works Cited|Notes",
    "In APA, the date appears...|after the author in parentheses|at the very end|never",
    "A DOI is used to...|give a permanent link to an article|show the author's age|mark the page",
    "APA reference entries use a hanging indent, meaning...|the first line is flush left and the rest are indented|every line is centered|all lines are bold",
    "Which entry begins correctly in APA?|Lee, A. (2021). Sleep and learning.|2021, Lee A. Sleep and learning|Sleep and learning, Lee.",
    "In-text (Lee, 2021) must match...|an entry in the reference list|a footnote|the title page",
    "In APA, the title of an article is capitalized...|sentence style (first word and proper nouns)|every word always|no capitals"],
    ["Think about how APA arranges its entries: who, when, what, where.", "APA reference lists are alphabetical with a hanging indent. Each entry gives the author, year in parentheses, title, and source details (with DOI when available).", "Example: Ortiz, J. (2020). Reading habits of teens. Journal of Youth Studies, 8(2), 11-20. Now do yours."],
    [["The References page", "📑", "APA lists every source you cite on a page called <b>References</b>."], ["Entry order", "🔢", "<b>Author. (Year). Title. Source.</b> Entries are alphabetical with a hanging indent."], ["Match them", "🔗", "Every in-text citation needs a reference entry, and every entry needs an in-text citation."]]);

  const C7 = mk("MLA containers", "📦", [
    "In MLA, a 'container' is...|the larger work that holds the source|a box for notes|the page number",
    "A poem inside an anthology: the anthology is the...|container|author|title page",
    "An article inside a journal: the journal is the...|container|source of the page|author",
    "The MLA list at the end is titled...|Works Cited|References|Bibliography Notes",
    "Which element comes first in an MLA entry?|Author|Date|Publisher",
    "MLA in-text citations usually give...|author and page|year and title|DOI only",
    "A website article's container is often...|the website|the author's name|its date",
    "MLA Works Cited entries are arranged...|alphabetically|by length|randomly"],
    ["Ask: is this source sitting inside something bigger, such as a journal, a website or a book of collected works?", "MLA entries use core elements: author, title, container, contributor, version, number, publisher, date, location. The container is the bigger work that holds the source.", "Example: A song on an album: the album is the container. Now do yours."],
    [["Boxes inside boxes", "📦", "An MLA <b>container</b> is the larger work that holds your source, like a journal or website."], ["Core elements", "🧩", "Author, title, container, publisher, date, location."], ["Works Cited", "📜", "List entries alphabetically on a page called <b>Works Cited</b>."]]);

  const C8 = mk("Paraphrase or patchwriting?", "🧵", [
    "Patchwriting means...|copying a source with a few words swapped|a thorough summary|quoting correctly",
    "A good paraphrase...|restates ideas in your own words and structure, with credit|changes a few words only|needs no citation",
    "Which is patchwriting of 'Sleep strengthens memory in teens'?|Rest strengthens recollection in teenagers.|Teens who rest well often recall facts better, researchers report (Lee, 2020).|Lee argues rest matters.",
    "Do you need to cite a paraphrase?|Yes|No|Only quotes",
    "To paraphrase well, you should...|read, look away, then write from memory|copy and replace words|change only the verbs",
    "A paraphrase is usually...|about the same length as the original|much longer|a single word",
    "Which is the best next step after paraphrasing?|Check it against the source for accuracy|Throw away the source|Add quotation marks to every word",
    "Why can patchwriting count as plagiarism?|It uses the author's structure and phrasing without quotes|It is original|It is cited"],
    ["Ask whether the sentence structure and key phrases still follow the source too closely.", "A real paraphrase uses your own wording and sentence structure to restate the idea and still needs a citation. Swapping a few words is patchwriting.", "Example: Original 'Bees pollinate crops.' Patchwriting: 'Bees fertilize crops.' Better: 'Many harvests depend on bees moving pollen (Ruiz, 2019).' Now do yours."],
    [["Not just synonyms", "🧵", "<b>Patchwriting</b> swaps words but keeps the source's structure. It is not true paraphrase."], ["The recipe", "👩‍🍳", "Read, close the source, restate from memory, then check accuracy."], ["Cite it", "📌", "Even in your own words, an idea from a source needs a citation."]]);

  const C9 = mk("Figures, tables and captions", "📊", [
    "A figure caption usually...|explains what the figure shows|replaces the figure|adds a joke",
    "In many styles, tables are labeled...|above the table|inside the title|nowhere",
    "Figures are usually labeled...|Figure 1, Figure 2|a, b, c in the text only|with random names",
    "Before showing a figure, you should...|refer to it in the text|hide it|avoid explaining",
    "A table is best for...|exact values organized in rows and columns|telling a story|showing a map",
    "A good graph includes...|labeled axes and a title|a rainbow|no numbers",
    "If a figure comes from another source, you should...|credit the source|claim it|crop the citation",
    "Why should visuals be introduced in your text?|The reader must know what to notice|They are decoration|It adds length"],
    ["Think about what the reader needs to understand the visual without guessing.", "Number visuals, refer to them in the text, add a clear caption or title, label axes and units, and credit sources. Explain what the visual shows.", "Example: 'Figure 1 shows enrollment doubling from 2015 to 2020.' Now do yours."],
    [["Visuals need words", "📊", "Every <b>figure</b> or <b>table</b> needs a number, a caption or title, and a mention in the text."], ["Make it readable", "🏷️", "Label axes, units and categories."], ["Give credit", "📌", "If you did not create the data or image, cite the source."]]);

  const C10 = mk("Using AI tools responsibly", "🤖", [
    "Before using an AI tool on an assignment, you should...|check the instructor's policy|assume it's allowed|hide it",
    "AI tools can make up facts. You should...|verify claims in reliable sources|trust everything|copy and paste",
    "Submitting AI-written text as your own work without permission is...|academic dishonesty|good practice|a citation",
    "If allowed, a responsible use might be...|asking for feedback on clarity, then revising yourself|having it write the whole paper|hiding the use",
    "Why check AI-given citations?|They can be fake or wrong|They are always right|They are optional",
    "If a policy says to disclose AI use, you should...|state how you used it|keep it secret|delete your drafts",
    "Your own thinking is still important because...|you are responsible for the final ideas|AI always cares|nobody reads it",
    "Which action is risky?|Pasting private information into a tool|Asking what a term means|Reading the policy"],
    ["Think about three things: the rules, the facts, and who is responsible for the final work.", "Follow your instructor's policy, disclose use if required, verify every fact and citation, and remember the ideas and the words you submit must be your responsibility.", "Example: If the syllabus bans AI drafting, using it to write a paragraph breaks the rule. Now do yours."],
    [["Rules first", "📜", "Check the syllabus or assignment for what is allowed."], ["Verify", "✅", "Tools can invent facts and sources. Check everything in reliable sources."], ["Own your work", "✍️", "You are responsible for the ideas, honesty and quality of what you hand in."]]);

  const C11 = mk("Evaluating sources: CRAAP", "🧪", [
    "In the CRAAP test, the first C stands for...|Currency|Credit|Caption",
    "The A for 'Authority' asks...|Who is the author and what are their credentials?|How long is it?|What color is it?",
    "'Accuracy' asks whether the information is...|supported by evidence and checkable|funny|short",
    "'Purpose' asks why the source exists, for example...|to inform, sell or persuade|to rhyme|to fill space",
    "'Relevance' asks if the source...|fits your research question|is long|has pictures",
    "Which source has the best authority on heart surgery?|A cardiac surgeon's peer-reviewed article|An anonymous comment|An ad",
    "A medical source from 1950 may fail on...|currency|authority automatically|purpose",
    "A blog selling a supplement likely has a purpose of...|selling|peer review|neutral teaching"],
    ["Match each letter to its question: how recent, how related, who wrote it, how accurate, why it exists.", "CRAAP: Currency, Relevance, Authority, Accuracy, Purpose. Check each before trusting a source.", "Example: A 2005 article on a fast-changing technology may fail currency. Now do yours."],
    [["Test a source", "🧪", "<b>CRAAP</b>: Currency, Relevance, Authority, Accuracy, Purpose."], ["Ask each question", "❓", "How recent? How related? Who wrote it? Is it supported? Why was it made?"], ["Decide", "⚖️", "Use sources that pass for your topic, and watch for bias."]]);

  const C12 = mk("Concession and rebuttal phrases", "🤝", [
    "Which phrase begins a concession?|Admittedly,|Therefore,|In conclusion,",
    "Which phrase begins a rebuttal?|Nevertheless,|Furthermore,|First,",
    "Choose the best word.<br><br><b>___ the plan is costly, it will save money later.</b>|Although|Because|Unless",
    "Choose the best word.<br><br><b>Critics claim it fails; ___, the data show gains.</b>|however|moreover|for example",
    "A concession shows that you...|understand the other side|have no argument|are lost",
    "A rebuttal...|answers the objection with reasons|repeats your thesis only|ignores the reader",
    "Which sentence concedes and rebuts?|True, tuition is high, but aid covers most costs.|Tuition is high.|Aid exists.",
    "Why include concessions?|They build credibility|They weaken every argument|They fill space"],
    ["Is the sentence granting a point or answering it? Words change meaning.", "A concession admits a fair point from the other side; a rebuttal answers it. Phrases like admittedly, although, true... but, however and nevertheless help.", "Example: 'Admittedly the trip is long; however, it is worth it.' Now do yours."],
    [["Fair play", "🤝", "A <b>concession</b> grants a fair point to the other side."], ["Then answer", "🛡️", "A <b>rebuttal</b> responds with reasons and evidence."], ["Handy words", "🧰", "<b>Admittedly, true, although</b> (concede); <b>however, nevertheless, yet</b> (rebut)."]]);

  const C13 = mk("This + noun", "👉", [
    "Which is clearer after a long idea?|This policy reduced costs.|This reduced costs.|It reduced.",
    "Why add a noun after 'this'?|It tells the reader exactly what 'this' refers to|It makes the sentence longer only|It hides the idea",
    "Fix the vague 'this'.<br><br><b>The city raised bus fares. This angered riders.</b>|This increase angered riders.|This angry riders.|That it angered.",
    "Which is clearer?|This approach improves accuracy.|This improves.|That is it.",
    "'This' alone can be unclear when...|several ideas came before it|only one noun came before|it is capitalized",
    "Which word best follows 'this' here?<br><br><b>Researchers surveyed 2,000 teens. This ___ shows a clear trend.</b>|survey|green|sandwich",
    "Which word best follows 'these'?<br><br><b>Studies found higher yields and lower costs. These ___ support the plan.</b>|findings|dreams|chairs",
    "'This + noun' also helps...|link sentences into a chain|spell words|number pages"],
    ["Ask what 'this' is pointing at. If you cannot say in one word, add the word.", "Pair this, that, these or those with a clear noun to name what you mean, such as this decision, this trend, these results. It links sentences and prevents confusion.", "Example: 'The team lost. This hurt morale' becomes 'This loss hurt morale.' Now do yours."],
    [["Point clearly", "👉", "A bare <b>this</b> can point at too many things."], ["Add a noun", "🏷️", "<i>This trend, this decision, these results</i> label the idea."], ["Link ideas", "🔗", "It creates a bridge from one sentence to the next."]]);

  const C14 = mk("Analogies in arguments", "🧩", [
    "An argument by analogy claims...|two things are alike, so what is true of one is true of the other|a fact never changes|an opinion is a fact",
    "A good analogy depends on...|relevant similarities|any similarity|bright colors",
    "Which is a weak analogy?|Running a country is exactly like running a lemonade stand.|Training a team is like teaching a class.|A map is like a guide.",
    "A false analogy happens when...|the differences matter more than the similarities|two things are similar|a writer explains",
    "Analogies are useful because they...|make hard ideas easier to grasp|prove everything|replace evidence",
    "To test an analogy, ask...|Are the key features really alike?|Is it funny?|Is it long?",
    "Which is a literal comparison rather than an analogy?|Both treaties ended wars between neighbors.|Life is a river.|Time is a thief.",
    "An analogy alone...|is rarely enough proof|always proves a claim|is the only evidence"],
    ["Check whether the points of similarity are the ones that matter for the claim.", "An analogy compares two cases and argues that what holds for one holds for the other. It is only as strong as the relevant similarities and should be backed by other evidence.", "Example: Comparing a school's rules to a city's laws may break down because the aims differ. Now do yours."],
    [["Like with like", "🧩", "An <b>analogy</b> says two situations are alike in important ways."], ["Test it", "🔬", "Do the similarities that matter really match? Do differences undercut it?"], ["Don't rely on it", "⚠️", "Use analogies to illustrate and support, not as your only proof."]]);

  const C15 = mk("Building credibility (ethos)", "🏅", [
    "Which builds credibility?|Citing reliable sources accurately|Using insults|Guessing",
    "A writer loses trust by...|exaggerating or misquoting|admitting limits|using evidence",
    "Which tone helps an argument?|Respectful and fair|Sarcastic|Angry",
    "Admitting a limit in your evidence can...|increase trust|ruin your argument always|bore the reader",
    "Which is an ethos strategy?|Show your expertise or experience when relevant|Hide your sources|Attack the reader",
    "Careless typos can reduce credibility because...|they suggest carelessness|they are fun|they are rare",
    "Which is a credible source line?|According to a 2022 report by the national statistics office,|Everyone knows that|I read somewhere that",
    "Fair treatment of opposing views shows...|good character and honesty|weakness|disagreement only"],
    ["Think about why a reader would trust you: knowledge, honesty, fairness and care.", "Ethos is credibility. Build it with accurate evidence, fair treatment of other views, careful editing and a respectful tone.", "Example: Naming the report and year shows research. Now do yours."],
    [["Why trust you?", "🏅", "<b>Ethos</b> is the reader's sense that the writer is knowledgeable, fair and honest."], ["How to build it", "🧱", "Reliable sources, accurate quotes, a respectful tone and careful editing."], ["How to lose it", "💔", "Exaggeration, unfair attacks, vague claims and sloppy errors."]]);

  const C16 = mk("Narrative or parenthetical?", "🎙️", [
    "Which is a narrative citation (APA)?|Lee (2021) found that sleep helps memory.|Sleep helps memory (Lee, 2021).|Sleep helps memory.",
    "Which is a parenthetical citation (APA)?|Sleep helps memory (Lee, 2021).|Lee (2021) found sleep helps memory.|According to Lee, sleep helps.",
    "A narrative citation puts the author's name...|in the sentence|only in a footnote|nowhere",
    "Which citation is in MLA parenthetical form?|(Lee 45)|(Lee, 2021)|[1]",
    "Which would you choose to emphasize the author?|A narrative citation|A parenthetical citation|No citation",
    "Which would you choose to emphasize the idea?|A parenthetical citation|A narrative citation|A footnote only",
    "Why vary the two types?|It keeps the prose smooth and varied|It's required in every sentence|It hides sources",
    "If you name the author in the sentence in APA, you still give...|the year in parentheses|nothing|a footnote"],
    ["See whether the author's name is part of the sentence or tucked in parentheses.", "Narrative citations make the author part of the sentence. Parenthetical citations tuck the source at the end. Varying them helps flow and emphasis.", "Example: 'Ortiz (2020) argues...' versus '...(Ortiz, 2020).' Now do yours."],
    [["Two ways", "🎙️", "<b>Narrative</b>: the author is in the sentence. <b>Parenthetical</b>: the source sits in parentheses."], ["Choose for emphasis", "🔦", "Put the author up front to stress who said it, and use parentheses to stress the idea."], ["Mix them", "🎛️", "Variety keeps writing smooth."]]);

  const C17 = mk("Global and local revision", "🌍", [
    "Which is a global concern?|The thesis is unclear|A missing comma|A misspelled word",
    "Which is a local concern?|Subject-verb agreement|A weak argument|Missing evidence",
    "You should usually fix ___ concerns first.|global|local|font",
    "Reorganizing paragraphs is...|global revision|local editing|proofreading",
    "Changing 'effect' to 'affect' is...|local editing|global revision|restructuring",
    "A missing counterargument is...|a global concern|a local concern|a typo",
    "Why fix global first?|Local fixes may vanish when you rewrite|Commas matter more|It's faster to start small",
    "A comment like 'Where is your evidence?' points to...|a global concern|a local concern|an apostrophe"],
    ["Think about the size of the problem: whole-paper or word-level?", "Global concerns involve the argument, structure, evidence and audience. Local concerns involve sentence style, grammar, spelling and punctuation. Fix global first.", "Example: Rewriting a thesis is global; fixing a comma splice is local. Now do yours."],
    [["Big and small", "🌍", "<b>Global</b>: thesis, organization, evidence. <b>Local</b>: grammar, spelling, word choice."], ["Order matters", "🔢", "Fix the big problems first so you don't polish sentences you will cut."], ["Use feedback", "💬", "Sort comments into global and local to plan revision."]]);

  const C18 = mk("Overcoming writer's block", "🧱", [
    "Freewriting means...|writing without stopping or editing for a set time|writing only perfect sentences|reading only",
    "Which helps if you cannot start?|Write a rough, ugly first draft|Wait for inspiration|Quit",
    "Breaking a paper into smaller tasks...|makes it manageable|makes it harder|adds nothing",
    "Setting a timer for 20 minutes uses...|short focused sessions|multitasking|a long break",
    "A deadline plan might include...|dates for research, draft and revision|only the due date|no steps",
    "Talking through your idea with a friend can...|clarify your thinking|replace writing|be a violation",
    "Perfectionism can block writing because...|you judge each sentence before it exists|you write too much|you are overconfident",
    "Which is a good first draft goal?|Get ideas down|Perfect grammar|Final polish"],
    ["Think about lowering the pressure: what is the smallest step you can take?", "Start messy: freewrite, outline, or write the easy part first. Break work into small timed steps and save polishing for later.", "Example: Write a rough paragraph in 10 minutes without editing. Now do yours."],
    [["Start rough", "🧱", "A first draft is for ideas, not perfection. <b>Freewriting</b> helps you begin."], ["Small steps", "🪜", "Split the paper into tasks with dates, such as research, outline, draft, revise."], ["Short sessions", "⏱️", "Work in focused timed bursts, then rest."]]);

  const L27 = [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, C17, C18];

  const lvl = (n, L) => L.concat([MIX("Mixed practice", ...L.slice(0, 6)), MIX("Level " + n + " Challenge", ...L.slice(6))]);
  Object.assign(WRITING_LEVELS, { 25: lvl(25, L25), 26: lvl(26, L26), 27: lvl(27, L27) });
})();
