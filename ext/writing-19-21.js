// ext/writing-19-21.js  Mind Lab Writing & Grammar, levels 19-21 (60 lessons)
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
  const bq = (q, rows) => rows.map(r => { const p = r.split("|"); p[0] = q + "<br><br><b>" + p[0] + "</b>"; return p.join("|"); });
  const bs = (q, rows) => rows.map(r => q + "<br><br>" + r);

  // =============== LEVEL 19 ===============
  const A1 = mk("That or which?", "🧷", [
    "Complete the sentence.<br><br><b>My bike, ___ is red, needs air.</b>|which|that|what",
    "Complete the sentence.<br><br><b>The dog ___ barked all night is mine.</b>|that|which|what",
    "Complete the sentence.<br><br><b>Paris, ___ is in France, has a famous tower.</b>|which|that|what",
    "Complete the sentence.<br><br><b>The shirt ___ I wore yesterday is dirty.</b>|that|which|what",
    "Complete the sentence.<br><br><b>Our school, ___ opened in 1950, is large.</b>|which|that|what",
    "Complete the sentence.<br><br><b>The girl ___ won the race is my cousin.</b>|who|which|what",
    "Complete the sentence.<br><br><b>The Nile, ___ is in Africa, is very long.</b>|which|that|who",
    "Complete the sentence.<br><br><b>Fruit ___ is ripe tastes sweeter.</b>|that|which|what",
    "Do the underlined words need commas around them?<br><br><b>The book that I borrowed was great.</b> (The words 'that I borrowed' tell which book.)|no, they are essential|yes, they are a bonus|yes, after every word",
    "Should the clause be set off with commas?<br><br><b>Mount Everest which is in Asia is the tallest mountain.</b>|yes, it is a bonus fact|no, it is essential|no commas ever"],
    ["Ask: if I took the clause out, would the reader still know exactly which thing I mean? Essential details and bonus details are handled differently.", "A bonus detail that could be dropped is set off with commas (and usually uses 'which'). An essential detail that tells WHICH one has no commas (and usually uses 'that', or 'who' for people).", "Example: <b>The hat ___ I lost was blue.</b> 'I lost' tells which hat, so no commas, and the word is the one for essential clauses. <b>My hat, ___ is blue, is new.</b> The clause is a bonus, so commas and the other word. Now do yours."],
    [["Two kinds of clause", "🧷", "A <b>restrictive</b> clause is essential: it tells <b>which</b> one. A <b>nonrestrictive</b> clause is a bonus fact that could be removed."], ["Commas and words", "✏️", "Essential: <b>no commas</b>, use <b>that</b> (or who). Bonus: <b>commas</b> around it, use <b>which</b> (or who)."], ["The removal test", "✂️", "Cross the clause out. If the sentence still means the same thing, it was a bonus, so it needs commas."]]);

  const A2 = mk("Pronoun and antecedent", "🔗", [
    "Choose the pronoun.<br><br><b>The birds built ___ nest in the tree.</b>|their|its|his",
    "Choose the pronoun.<br><br><b>A dog wagged ___ tail.</b>|its|their|our",
    "Choose the pronoun.<br><br><b>Mia and Ben left ___ coats at home.</b>|their|her|its",
    "Choose the pronoun.<br><br><b>My brother lost ___ keys.</b>|his|their|its",
    "Choose the pronoun.<br><br><b>The students handed in ___ essays.</b>|their|his|its",
    "Choose the pronoun.<br><br><b>The flower opened ___ petals.</b>|its|their|her",
    "Find the antecedent of <b>they</b>.<br><br><b>The runners said they were ready.</b>|runners|said|ready",
    "Find the antecedent of <b>her</b>.<br><br><b>Ana told Ben that her bike was fixed.</b>|Ana|Ben|bike",
    "Find the antecedent of <b>it</b>.<br><br><b>The movie was long, but it was funny.</b>|movie|long|funny"],
    ["Find the noun the pronoun is pointing back to. Is that noun one thing or more than one?", "The pronoun must match its antecedent (the noun it replaces) in number (one or many) and in gender when it matters.", "Example: <b>The girls forgot ___ umbrellas.</b> 'girls' is plural, so use a plural pronoun. Now do yours."],
    [["Pronouns need partners", "🔗", "An <b>antecedent</b> is the noun a pronoun stands for. In <b>Sam lost his hat</b>, 'Sam' is the antecedent of 'his'."], ["Match them", "🤝", "One antecedent needs a singular pronoun. Many need a plural pronoun. People can use he/she; things use it/its."], ["Be clear", "🔍", "If a pronoun could point to two nouns, rewrite the sentence so the reader is never unsure."]]);

  const A3 = mk("Possessive before a gerund", "🏃", bs("Choose the best word.", [
    "We were surprised by ___ winning.|his|him|he",
    "She was upset about ___ leaving early.|their|them|they",
    "Do you mind ___ opening the window?|my|me|I",
    "Everyone loved ___ singing.|her|she|hers",
    "The teacher praised ___ working so hard.|our|us|we",
    "I remember ___ calling me last night.|his|him|he",
    "Nobody liked ___ shouting.|Maria's|Maria|Maria was",
    "I can't stand ___ chewing so loudly.|his|him|he"]),
    ["Find the -ing word that works like a noun (it names an action). Whose action is it?", "When an -ing word works as a noun (a gerund), the word right before it should show ownership, like my, your, his, her, their or a name with 's.", "Example: <b>I dislike ___ tapping.</b> The tapping belongs to someone, so: I dislike <b>your</b> tapping. Now do yours."],
    [["Gerunds are nouns", "🏃", "In <b>I enjoyed his singing</b>, 'singing' is a noun naming what was enjoyed. It is a <b>gerund</b>."], ["Show who owns it", "🏷️", "Put a <b>possessive</b> before a gerund: <b>my, your, his, her, our, their</b> or <b>Sam's</b>."], ["A quick test", "✅", "Ask: what did I enjoy? <i>His singing</i>, not <i>him</i>. The thing enjoyed is the singing."]]);

  const A4 = mk("Keep the tense steady", "⏳", bs("Choose the verb that keeps the tense consistent.", [
    "Last night Ana opened the door and ___ outside.|stepped|steps|will step",
    "Every morning Jo wakes up, brushes her teeth and ___ breakfast.|eats|ate|eaten",
    "When the bell rang, the students packed up and ___ the room.|left|leave|leaves",
    "The hero enters the cave, lights a torch and ___ forward.|moves|moved|had moved",
    "We were tired, so we ___ home early.|went|go|will go",
    "She cooks dinner while he ___ the dishes.|washes|washed|was washed",
    "Dad grabbed the umbrella and ___ into the rain.|ran|runs|run",
    "In the novel, Mr. Lee builds a boat and then ___ across the sea.|sails|sailed|had sailed"]),
    ["Look at the verbs already in the sentence. Are they telling about the past or the present?", "Verbs in one connected sequence should stay in the same time. Match the verb in the blank to the time of the verbs around it.", "Example: <b>Tia opened the box and ___ the toy.</b> 'opened' is past, so the next verb is past too: pulled out. Now do yours."],
    [["Stay in one time", "⏳", "If you start telling something in the <b>past</b>, keep it in the past. If you start in the <b>present</b>, stay in the present."], ["Only shift on purpose", "🔀", "Change tense only when time really changes: <b>She <u>lives</u> here now, but she <u>grew up</u> in Spain.</b>"], ["About books", "📖", "When you write about what happens in a book, use the <b>present tense</b> all the way through."]]);

  const A5 = mk("Where to put 'only' and 'just'", "🎯", [
    "Which sentence means Sam, and no one else, ate the pie?|Only Sam ate the pie.|Sam ate only the pie.|Sam ate the only pie.",
    "Which sentence means Sam ate the pie and nothing else?|Sam ate only the pie.|Only Sam ate the pie.|Sam ate the only pie.",
    "Which sentence says there was exactly one pie?|Sam ate the only pie.|Only Sam ate the pie.|Sam ate only the pie.",
    "Which sentence means Lena, and nobody else, found a coin?|Only Lena found a coin.|Lena found only a coin.|Lena found the only coin.",
    "Which sentence means Lena found a coin and nothing else?|Lena found only a coin.|Only Lena found a coin.|Lena found the only coin.",
    "Which sentence says there was a single coin in the whole room?|Lena found the only coin.|Only Lena found a coin.|Lena found only a coin.",
    "Which sentence means Ty ate the apple and not the pear?|Ty ate just the apple.|Just Ty ate the apple.|Ty just ate the apple.",
    "Which sentence means nobody but Kim can swim?|Only Kim can swim.|Kim can only swim.|Kim can swim only fast."],
    ["Words like only and just limit the word right after them. Decide exactly what you want limited: the person, the thing, or the action.", "Put the limiting word right next to what it limits. Moving it by one place can change who or what is limited.", "Example: <b>Only Ben saw the bird</b> means no one else saw it. <b>Ben saw only the bird</b> means he saw nothing else. Now do yours."],
    [["Limiting words", "🎯", "<b>Only, just, almost, nearly</b> and <b>even</b> limit the word that comes right after them."], ["Same words, new meaning", "🔄", "<b>Only Ben saw the bird</b> (nobody else). <b>Ben saw only the bird</b> (nothing else)."], ["Place with care", "📍", "Read your sentence and ask: what does this word limit? Move it until it sits next to the right word."]]);

  const A6 = mk("Metonymy and synecdoche", "👑", bq("Which figure of speech is this?", [
    "The pen is mightier than the sword.|metonymy|synecdoche|hyperbole",
    "The White House announced a new plan.|metonymy|synecdoche|hyperbole",
    "All hands on deck!|synecdoche|metonymy|hyperbole",
    "Nice wheels! (said about a car)|synecdoche|metonymy|hyperbole",
    "The crown ruled the land for years.|metonymy|synecdoche|hyperbole",
    "Hollywood loves a sequel.|metonymy|synecdoche|hyperbole",
    "Count the heads in the room.|synecdoche|metonymy|hyperbole",
    "Washington passed a new law.|metonymy|synecdoche|hyperbole"]),
    ["Ask what the bold words really stand for. Is the name swapped for something closely connected, or is a small piece standing for the whole?", "Metonymy swaps a thing's name for something closely linked to it. Synecdoche uses a part to stand for the whole (or the whole for a part).", "Example: <b>The kettle is boiling</b> uses the container to mean the water inside, a closely linked thing. <b>Nice set of wheels</b> uses a part for the whole car. Now do yours."],
    [["Words that stand for more", "👑", "Writers sometimes replace a name with something connected to it. This makes language short and vivid."], ["Metonymy", "🏛️", "<b>Metonymy</b> uses a closely linked thing: <b>the crown</b> for the king or queen, <b>the White House</b> for the president's team."], ["Synecdoche", "🧩", "<b>Synecdoche</b> uses a <b>part for the whole</b>: <b>all hands</b> for all the workers, <b>wheels</b> for a car."]]);

  const A7 = mk("Kinds of rhyme", "🎶", bs("Which kind of rhyme is shown?", [
    "Two lines end with <b>shape</b> and <b>tape</b>.|end rhyme|internal rhyme|slant rhyme",
    "Two lines end with <b>worm</b> and <b>storm</b>.|slant rhyme|end rhyme|internal rhyme",
    "One line: <b>I felt the cold air melt away.</b> (felt and melt)|internal rhyme|end rhyme|slant rhyme",
    "Two lines end with <b>hall</b> and <b>hill</b>.|slant rhyme|end rhyme|internal rhyme",
    "Two lines end with <b>night</b> and <b>light</b>.|end rhyme|slant rhyme|internal rhyme",
    "One line: <b>Down by the town, the clown wore a crown.</b>|internal rhyme|end rhyme|slant rhyme",
    "Two lines end with <b>stone</b> and <b>moan</b>.|end rhyme|slant rhyme|internal rhyme",
    "Two lines end with <b>bed</b> and <b>bad</b>.|slant rhyme|end rhyme|internal rhyme"]),
    ["Say the matching words out loud. Where do they sit: at the ends of lines, or inside one line? And do the sounds match exactly or only nearly?", "End rhyme: exact matching sounds at the ends of lines. Internal rhyme: matching sounds inside a line. Slant rhyme: sounds that are close but not exact.", "Example: <b>sing</b> and <b>song</b> at line ends have the same ending consonants but a different vowel, so they only almost match. Now do yours."],
    [["Rhyme everywhere", "🎶", "Poets use more than one kind of rhyme to make music with words."], ["Three kinds", "3️⃣", "<b>End rhyme</b>: lines end with matching sounds. <b>Internal rhyme</b>: rhymes inside one line. <b>Slant rhyme</b>: near rhyme, like <i>home</i> and <i>room</i>... close, not exact."], ["Trust your ears", "👂", "Spelling can fool you. Judge rhyme by <b>sound</b>, not by letters."]]);

  const A8 = mk("Imagery and the senses", "👁️", bs("Which sense does this image appeal to most?", [
    "The warm, yeasty smell of baking bread filled the kitchen.|smell|taste|touch|sound",
    "The sandpaper scraped rough against her palm.|touch|sight|sound|taste",
    "Thunder cracked and rumbled across the valley.|sound|sight|touch|smell",
    "The lemon was so sour it made her lips pucker.|taste|smell|sound|sight",
    "A flash of scarlet feathers swooped past the window.|sight|sound|touch|taste",
    "Ice-cold water numbed his fingers.|touch|taste|smell|sound",
    "The scent of pine drifted through the cabin.|smell|taste|sight|touch",
    "Sizzling bacon popped and crackled in the pan.|sound|taste|sight|touch"]),
    ["Imagine you are really there. Which part of your body would notice this detail?", "Imagery uses words that appeal to the senses. Look for clues about colors and shapes, loud or quiet noises, scents, flavors, or textures and temperature.", "Example: <b>The velvet curtain felt soft and cool.</b> You notice this with your skin, so it is a feeling image. Now do yours."],
    [["Words that paint", "🎨", "<b>Imagery</b> is language that helps readers see, hear, smell, taste or feel what is happening."], ["Five senses", "🖐️", "<b>Sight, sound, smell, taste, touch.</b> Strong writing often uses more than just sight."], ["Be specific", "🔍", "Not <i>a nice smell</i> but <i>the smoky scent of burning leaves</i>. Specific details make images vivid."]]);

  const A9 = mk("Deductive or inductive?", "🧪", bs("Which kind of reasoning is this?", [
    "All mammals breathe air. Whales are mammals. So whales breathe air.|deductive|inductive|circular",
    "Every crow I have seen is black, so all crows are probably black.|inductive|deductive|circular",
    "All squares have four sides. This shape is a square. So it has four sides.|deductive|inductive|circular",
    "The last five buses were late, so the next bus will probably be late.|inductive|deductive|circular",
    "Three green apples I tried were sour, so green apples are likely sour.|inductive|deductive|circular",
    "All birds have feathers. A robin is a bird. So a robin has feathers.|deductive|inductive|circular",
    "Both my neighbors' cats purr when happy, so cats probably purr when happy.|inductive|deductive|circular",
    "If it rains, the ground gets wet. It is raining. So the ground is getting wet.|deductive|inductive|circular"]),
    ["Ask: if the starting facts are true, MUST the conclusion be true, or is it only likely?", "Deductive reasoning goes from a general rule to a specific case, and the conclusion is certain. Inductive reasoning goes from specific examples to a general idea that is only probable.", "Example: <b>Every dog I met was friendly, so dogs are probably friendly.</b> It builds a big idea from a few examples and says only 'probably'. Now do yours."],
    [["Two ways to reason", "🧪", "Writers and scientists build arguments by <b>deduction</b> or by <b>induction</b>."], ["Deductive", "⬇️", "General rule → specific case. <b>All fish swim. A trout is a fish. So a trout swims.</b> If the rule is true, the conclusion must be true."], ["Inductive", "⬆️", "Specific examples → general idea. <b>Three trout swam, so fish probably swim.</b> It is likely, not certain."]]);

  const A10 = mk("Named fallacies", "🧐", bq("Which fallacy is this?", [
    "You can't trust Mia's idea about recycling. She's only in ninth grade.|ad hominem|straw man|bandwagon",
    "Either we ban all phones at school, or students will never learn.|false dilemma|slippery slope|ad hominem",
    "Everyone is buying this game, so it must be the best.|bandwagon|circular reasoning|straw man",
    "If we let students choose one book, soon they will choose all their classes and nobody will learn anything.|slippery slope|false dilemma|bandwagon",
    "Sam: We should have a longer lunch. Lee: So you think students should skip class all day? That's silly.|straw man|ad hominem|slippery slope",
    "This book is the best because it is better than all the others.|circular reasoning|bandwagon|false dilemma",
    "Don't listen to her argument about homework; she wears weird clothes.|ad hominem|straw man|circular reasoning",
    "You're either with us or against us.|false dilemma|bandwagon|slippery slope"]),
    ["Look at HOW the argument tries to win. Does it attack a person, twist someone's words, warn of a chain of disasters, offer only two choices, follow the crowd, or go in a circle?", "Ad hominem attacks the person. Straw man twists the other side's view. Slippery slope claims one small step leads to disaster. False dilemma offers only two options. Bandwagon says everyone does it. Circular reasoning repeats the claim as its own proof.", "Example: <b>If we add one more rule, soon there will be rules for everything!</b> It claims one small step leads to a huge result. Now do yours."],
    [["Tricks that break arguments", "🧐", "A <b>fallacy</b> is a mistake in reasoning that can fool readers. Learn to name them."], ["Attacks and twists", "🥊", "<b>Ad hominem</b>: attacks the person, not the idea. <b>Straw man</b>: makes the other side sound silly, then attacks that fake version."], ["Pressure and shortcuts", "🛤️", "<b>Slippery slope</b>: one step means disaster. <b>False dilemma</b>: only two choices. <b>Bandwagon</b>: everyone does it. <b>Circular</b>: the claim proves itself."]]);

  const A11 = mk("Lateral reading", "🧭", [
    "You find a surprising claim on a website you have never heard of. What is lateral reading?|opening new tabs to see what other sources say about the site|reading the page slowly from top to bottom|reading only the comments under the page",
    "What is the best first step to check an unknown website?|search for what other trusted sources say about it|admire how professional it looks|count how many ads it has",
    "A post says a famous study proved cats are smarter than dogs. What is the best check?|find the study or reports about it from reliable outlets|share it right away|check how many likes it has",
    "Why is a professional-looking design not proof that a site is reliable?|anyone can make a site look professional|good designs are always true|only experts can build sites",
    "Which is a strong sign that a claim is reliable?|several trusted sources confirm it|the post has many shares|the title is in capital letters",
    "A photo goes viral. What can you do to check it?|use a reverse image search to find where it first appeared|decide by how colorful it is|trust it if it is funny",
    "When you check who is behind a page, you look for...|who runs it and what they want|the font it uses|the color of the page",
    "Several unrelated, reliable sources report the same fact. That suggests the fact is...|probably accurate|surely false|just a joke"],
    ["Think about leaving the page you are on. Where else could you look to learn about it?", "Lateral reading means checking a source by looking at what OTHER sources say about it and about its claim, instead of only trusting the page itself.", "Example: a blog says a volcano just appeared. You open two new tabs to see what a science museum and a news outlet say. Now do yours."],
    [["Read sideways", "🧭", "Experts do not stay on a strange page. They leave it and check what <b>other sources</b> say. This is <b>lateral reading</b>."], ["Three questions", "❓", "Who is behind this? What is the evidence? What do other trusted sources say?"], ["Do not be fooled by looks", "🎭", "Nice design, many shares and confident words do not make a claim true. Confirm it somewhere else."]]);

  const A12 = mk("What does the prompt ask?", "📝", [
    "The prompt says <b>compare</b> two poems. What should you show?|how they are alike and different|only which one is better|a list of unrelated facts",
    "The prompt says <b>summarize</b> the chapter. What do you write?|a short version of the main points|a long list of every detail|your opinion only",
    "The prompt says <b>explain</b> why the character changes. What do you write?|reasons and how it happened|only what the character looks like|a list of other books",
    "The prompt says <b>evaluate</b> the author's argument. What do you do?|judge how strong it is, with reasons|retell it|copy sentences from it",
    "The prompt says <b>describe</b> the setting. What do you do?|tell what it is like using details|argue about it|judge it",
    "The prompt says <b>analyze</b> the poem's imagery. What do you do?|break it into parts and show how they create meaning|only list the images|write a summary",
    "The prompt says <b>argue</b> for or against school uniforms. What do you do?|take a side and defend it with reasons|list pros and cons without choosing|describe what uniforms look like",
    "The prompt says <b>contrast</b> two characters. What do you focus on?|how they are different|how they are the same|retelling their stories"],
    ["Underline the action word in the prompt. It tells you what job to do with your ideas.", "Some task words ask you to retell (summarize, describe), some to show how or why (explain, analyze), some to judge (evaluate), some to look at likeness or difference, and some to take a side (argue).", "Example: <b>Describe your school.</b> You tell what it is like with details, not whether it is good or bad. Now do yours."],
    [["Read the prompt first", "📝", "The <b>task word</b> in a prompt tells you what kind of answer to write. Missing it is the most common reason for a weak essay."], ["Common task words", "🔑", "<b>Describe</b>: tell what it is like. <b>Summarize</b>: short version. <b>Explain</b>: how or why. <b>Compare/contrast</b>: alike/different."], ["Bigger task words", "🏋️", "<b>Analyze</b>: break into parts. <b>Evaluate</b>: judge with reasons. <b>Argue</b>: take a side and prove it."]]);

  const A13 = mk("Prewriting strategies", "💡", [
    "You write nonstop for five minutes without fixing anything. This is...|freewriting|clustering|outlining",
    "You put the topic in a circle and draw bubbles of linked ideas around it. This is...|clustering (mapping)|freewriting|proofreading",
    "You list main points and sub-points in order. This is...|outlining|freewriting|clustering",
    "You ask who, what, when, where, why and how about your topic. This is...|questioning|outlining|editing",
    "Which strategy helps most when you have no idea what to write?|freewriting|proofreading|citing sources",
    "Which strategy shows how ideas connect, like a web?|clustering|outlining|listing",
    "Which of these is NOT prewriting?|proofreading|brainstorming|clustering",
    "Why do writers prewrite?|to gather and organize ideas before drafting|to fix spelling mistakes|to publish their work"],
    ["Think about what you do BEFORE you write the first real sentence of a draft.", "Prewriting helps you find and organize ideas: writing freely, drawing idea webs, making lists and outlines, or asking questions.", "Example: <b>Drawing a topic in the middle of the page with branching bubbles</b> is mapping ideas as a web. Now do yours."],
    [["Before the draft", "💡", "<b>Prewriting</b> is everything you do to find and shape ideas before you draft."], ["Idea finders", "🔎", "<b>Freewriting</b>: write nonstop. <b>Listing</b>: jot ideas. <b>Questioning</b>: ask who, what, when, where, why, how."], ["Idea organizers", "🗂️", "<b>Clustering</b>: an idea web. <b>Outlining</b>: put ideas in order with main points and details."]]);

  const A14 = mk("Story archetypes", "🦸", [
    "A wise older guide who trains the hero, like Yoda in Star Wars. Which archetype?|the mentor|the trickster|the shadow",
    "A mischievous character who breaks rules and plays tricks, like Anansi the spider. Which archetype?|the trickster|the mentor|the hero",
    "A dark figure who stands for what the hero fears and must face. Which archetype?|the shadow|the mentor|the trickster",
    "A young person leaves home, faces trials, and grows brave. Which archetype?|the hero|the trickster|the mentor",
    "Gandalf guides Frodo in The Lord of the Rings. Which archetype is Gandalf?|the mentor|the shadow|the hero",
    "Merlin guides the young King Arthur. Which archetype is Merlin?|the mentor|the trickster|the shadow",
    "What is an archetype?|a character, symbol or pattern found in stories across many cultures|a spelling rule|a kind of rhyme",
    "A hero leaves a quiet village to save the world. This repeated pattern in stories is a(n)...|archetype|symbol|plot twist"],
    ["Think about the job the character or pattern does in the story: guide, rule-breaker, opponent, or main adventurer.", "Archetypes are patterns that show up in stories from many cultures. The hero goes on the quest, the mentor guides, the trickster causes mischief, and the shadow stands against the hero.", "Example: Baloo the bear teaches Mowgli the ways of the jungle in The Jungle Book, which makes him a guide figure. Now do yours."],
    [["Patterns in stories", "🦸", "An <b>archetype</b> is a character type, symbol or pattern that appears again and again in stories around the world."], ["Common ones", "🎭", "<b>Hero</b>: goes on the quest. <b>Mentor</b>: guides. <b>Trickster</b>: causes mischief. <b>Shadow</b>: opposes the hero."], ["Why they matter", "💭", "Writers use archetypes because readers recognize them. Great writers also give them surprising details."]]);

  const A15 = mk("Tragedy words", "🎭", [
    "In a tragedy, a flaw or mistake that leads to the hero's downfall is called...|hamartia|catharsis|comic relief",
    "Too much pride that leads to a fall (as with Icarus flying too near the sun) is called...|hubris|catharsis|hamartia",
    "The emotional release an audience feels at the end of a tragedy is called...|catharsis|hubris|irony",
    "A character who is admirable but falls because of a flaw is a...|tragic hero|villain|narrator",
    "Which Greek thinker wrote about tragedy in a work called Poetics?|Aristotle|Homer|Plato",
    "A play where the hero falls and ends in sorrow is a...|tragedy|comedy|farce",
    "Which of these is a tragedy by Shakespeare?|Romeo and Juliet|A Midsummer Night's Dream|Twelfth Night",
    "Comic relief is a funny moment that...|eases tension in a serious story|ends the play|names the hero"],
    ["Think about the part of a tragedy the question is describing: the hero, the flaw, the fall, or the audience's feeling.", "Tragedy words come from ancient Greece. One means a flaw or error, one means too much pride, and one means an emotional cleansing for the audience.", "Example: <b>A king ignores every warning because he thinks he is always right.</b> His excessive pride is the problem. Now do yours."],
    [["Tragedy", "🎭", "A <b>tragedy</b> is a serious story where a main character falls, often because of their own choices."], ["Key words", "🔑", "<b>Tragic hero</b>: admirable but flawed. <b>Hamartia</b>: the flaw or error. <b>Hubris</b>: too much pride."], ["The audience", "😢", "<b>Catharsis</b> is the release of strong feelings an audience gets at the end. <b>Comic relief</b> lightens a heavy story."]]);

  const A16 = mk("Plain language or jargon?", "🗣️", [
    "Which word is plainer than <b>commence</b>?|begin|initiate|inaugurate",
    "Which word is plainer than <b>terminate</b>?|end|conclude|cease operations",
    "Which phrase is plainer than <b>in the event that</b>?|if|should the circumstance arise|supposing that",
    "Which phrase is plainer than <b>at this point in time</b>?|now|at the present juncture|presently speaking",
    "Which phrase is plainer than <b>due to the fact that</b>?|because|owing to the circumstance that|in light of the fact that",
    "Which word is plainer than <b>prior to</b>?|before|preceding|antecedent to",
    "Which word is plainer than <b>ascertain</b>?|find out|determine conclusively|establish",
    "What is jargon?|special words used by a particular group or job|a kind of poem|a punctuation mark"],
    ["Which choice would a younger reader understand right away?", "Plain language uses short, common words. Pick the one you would say out loud in a normal conversation, not the one that sounds formal and puffed up.", "Example: <b>purchase</b> becomes <b>buy</b>, and <b>utilize</b> becomes <b>use</b>. Now do yours."],
    [["Say it simply", "🗣️", "<b>Plain language</b> uses short, common words so more readers understand quickly."], ["Puffed-up words", "🎈", "Replace <b>commence</b> with <b>begin</b>, <b>prior to</b> with <b>before</b>, <b>due to the fact that</b> with <b>because</b>."], ["Jargon", "🧰", "<b>Jargon</b> is the special vocabulary of a group, like doctors or gamers. Explain it, or skip it, when writing for outsiders."]]);

  const A17 = mk("Words that changed meaning", "🕰️", bs("Long ago, what did this word mean?", [
    "<b>nice</b>|foolish or not knowing|kind and friendly|tasty",
    "<b>awful</b>|full of awe, causing wonder and fear|very boring|very sweet",
    "<b>silly</b>|happy or blessed|loud|clumsy",
    "<b>terrific</b>|causing terror|very small|very funny",
    "<b>meat</b>|food in general|only beef|a drink",
    "<b>naughty</b>|having nothing, poor|very clever|sleepy",
    "<b>computer</b>|a person who did calculations|a type of clock|a kind of book",
    "<b>manufacture</b>|to make by hand|to sell|to repair"]),
    ["Words can drift in meaning over hundreds of years. Does the word's old meaning match how we use it today, or was it something different?", "The old meanings often came from the word's roots or from how people used it back then. Think about what the word was built from, or what people did in earlier times.", "Example: <b>pretty</b> once meant clever or cunning, not good-looking. Now do yours."],
    [["Words change", "🕰️", "The meaning of a word can shift over time. This is called <b>semantic change</b>."], ["Surprising shifts", "😲", "<b>Nice</b> once meant foolish. <b>Silly</b> once meant happy. <b>Awful</b> once meant full of awe."], ["Why it matters", "📖", "When you read old books, a familiar word may not mean what you think. Check a good dictionary's word history."]]);

  const A18 = mk("Annotating a text", "🖍️", [
    "What is annotating?|marking a text with notes as you read|copying the text word for word|erasing the text",
    "What should you usually underline?|key ideas or evidence|every single word|the page numbers",
    "A question mark in the margin usually means...|I have a question or I am confused|the author is right|this is the end",
    "Circling a word you do not know helps you later with...|vocabulary|handwriting|printing",
    "A star in the margin might mark...|an important idea|a spelling error|an advertisement",
    "A short note in the margin that sums up a paragraph is called a...|margin summary|title page|plagiarism",
    "Why annotate?|to read actively and find evidence later|to make the book look nice|to read faster without thinking",
    "You are reading a library book. How can you annotate without damaging it?|use sticky notes|write in pen|tear out pages",
    "Which margin note is most useful?|Shows the author's anger: 'slammed the door'|good|ok"],
    ["Think about what an active reader does with a pencil while reading.", "Annotating means leaving marks and notes: underlines for key ideas, circles for new words, question marks for confusion, short notes that sum up or react.", "Example: next to a surprising fact you could write 'Why?' or underline it and add a star. Now do yours."],
    [["Talk back to the text", "🖍️", "<b>Annotating</b> means marking a text with notes while you read, so you read actively."], ["Your marks", "✍️", "<b>Underline</b> key ideas, <b>circle</b> new words, add <b>?</b> for questions, <b>★</b> for big ideas, and write short notes."], ["Be kind to books", "📚", "Only write in books you own. For library or borrowed books, use sticky notes or a notebook."]]);

  // =============== LEVEL 20 ===============
  const B1 = mk("Between you and me", "🤝", bs("Choose the correct pronoun.", [
    "The gift is from Dad and ___ .|me|I|myself",
    "Between you and ___, I am nervous.|me|I|myself",
    "Mia sat next to Ben and ___ .|me|I|mine",
    "Ben and ___ won the prize.|I|me|myself",
    "Mom took Sara and ___ to the park.|me|I|myself",
    "Ana and ___ painted the fence.|I|me|mine",
    "The teacher gave Ty and ___ extra time.|me|I|mine",
    "Sam and ___ went to the lake.|I|me|myself"]),
    ["Take the other person out and read the sentence with only the pronoun. Does it sound right?", "Use the subject form (the one that does the action) before a verb. Use the object form (the one that receives the action) after a verb or a preposition like to, with, from or between.", "Example: <b>Dad drove Zoe and ___ home.</b> Test it: Dad drove ___ home. That calls for the object form. Now do yours."],
    [["Two people, one pronoun", "🤝", "When a pronoun is paired with a name, it is easy to choose the wrong one."], ["The one-person test", "✅", "Remove the other person. <b>Ben and I won</b> works because <b>I won</b> works. <b>Give it to Ben and me</b> works because <b>give it to me</b> works."], ["Prepositions", "📍", "After <b>between, to, with, for, from</b> use <b>me, him, her, us, them</b>: <b>between you and me</b>."]]);

  const B2 = mk("Collective nouns and verbs", "🐑", [
    "Choose the verb.<br><br><b>The class ___ taking a test today (as one group).</b>|is|are|were",
    "Choose the verb.<br><br><b>The flock of geese ___ over the lake.</b>|flies|fly|flying",
    "Choose the verb.<br><br><b>A herd of cattle ___ in the field.</b>|grazes|graze|grazing",
    "Choose the verb.<br><br><b>The team ___ a game tonight.</b>|has|have|are",
    "Choose the verb.<br><br><b>The audience ___ seated.</b>|is|are|were",
    "Choose the verb.<br><br><b>The family ___ going on a trip together.</b>|is|are|were",
    "Choose the verb.<br><br><b>Our band ___ the best in town.</b>|is|are|were",
    "Choose the verb.<br><br><b>A pack of wolves ___ through the woods.</b>|moves|move|moving",
    "A collective noun names...|a group acting as one|a single tiny thing|a describing word"],
    ["Find the group noun (class, team, herd, flock...). Is the group acting together, as one unit?", "In American English, when the members act together as one unit, the collective noun takes a singular verb.", "Example: <b>The choir ___ on stage.</b> One group, acting as one, so use the singular verb: <b>stands</b>. Now do yours."],
    [["Group nouns", "🐑", "A <b>collective noun</b> names a group: <b>team, flock, class, family, band, audience</b>."], ["One unit", "1️⃣", "If the group acts <b>together</b>, use a singular verb: <b>The team is ready.</b> <b>The flock flies south.</b>"], ["Stay steady", "🔒", "Match the pronoun too: <b>The team lost its game.</b> Do not switch between singular and plural in one sentence."]]);

  const B3 = mk("Inclusive language", "🌍", [
    "Which word names the job for anyone?|firefighter|fireman|firewoman",
    "Which word is more inclusive?|chair|chairman|chairlady",
    "Which word is more inclusive?|mail carrier|mailman|mailwoman",
    "Which word is more inclusive?|police officer|policeman|policewoman",
    "Which word is more inclusive?|flight attendant|stewardess|steward",
    "Which word is more inclusive?|humankind|mankind|menkind",
    "Which wording avoids assuming anyone's gender?|Ask each student to bring their lunch.|Ask each student to bring his lunch.|Ask each boy to bring a lunch.",
    "The booth will be ___ by volunteers all day.|staffed|manned|bossed"],
    ["Does the word name the job, or does it also name who is assumed to do it?", "Inclusive wording names the role, not the gender, so it fits anyone who does the job. Pick the choice that would be true for anyone.", "Example: <b>salesman</b> becomes <b>salesperson</b>, and <b>cameraman</b> becomes <b>camera operator</b>. Now do yours."],
    [["Words for everyone", "🌍", "<b>Inclusive language</b> avoids words that assume who does a job or who is in a group."], ["Swap the word", "🔁", "<b>fireman → firefighter</b>, <b>mailman → mail carrier</b>, <b>chairman → chair</b>, <b>mankind → humankind</b>."], ["Singular they", "👥", "Major style guides now accept <b>they</b> for one person when gender is unknown or when that person uses it: <b>Each student should bring their lunch.</b>"]]);

  const B4 = mk("Quotation marks and other punctuation", "💬", [
    "Where does the period go in American style?<br><br><b>He called the movie “boring”</b>|inside the quotation marks|outside the quotation marks|there is no period",
    "Where should the comma go in American style?<br><br><b>“Let’s go” said Ana.</b>|inside the quotation marks|outside the quotation marks|nowhere",
    "Where does the question mark go?<br><br><b>Did she say, “I’m leaving”</b>|outside the quotation marks|inside the quotation marks|nowhere",
    "Where does the question mark go?<br><br><b>She asked, “Where are you going”</b>|inside the quotation marks|outside the quotation marks|nowhere",
    "Where does the semicolon go?<br><br><b>He said, “I will come” then he changed his mind.</b>|outside the quotation marks|inside the quotation marks|nowhere",
    "Where does the exclamation mark go?<br><br><b>He shouted, “Stop”</b>|inside the quotation marks|outside the quotation marks|nowhere",
    "Where does the question mark go?<br><br><b>Have you read “The Gift of the Magi”</b>|outside the quotation marks|inside the quotation marks|nowhere",
    "Where does the colon go?<br><br><b>Here are the words I memorized “Roses are red”</b>|outside the quotation marks|inside the quotation marks|nowhere"],
    ["Decide whether the mark belongs to the quoted words or to the whole sentence around them.", "In American style, periods and commas go inside the closing quotation mark. Semicolons and colons go outside. A question mark or exclamation point goes inside only if it belongs to the quoted words.", "Example: <b>Did he say “hello”</b> is a question as a whole, while <b>He asked, “Are you here”</b> has a question inside the quote. Decide which one yours is."],
    [["Always inside", "📥", "In American writing, <b>periods and commas</b> go <b>inside</b> the closing quotation mark: <b>“Hello,” she said.</b>"], ["Always outside", "📤", "<b>Semicolons and colons</b> go <b>outside</b>: <b>I read “Dreams”; it was short.</b>"], ["It depends", "⚖️", "A <b>?</b> or <b>!</b> goes <b>inside</b> if it belongs to the quote, <b>outside</b> if it belongs to the whole sentence."]]);

  const B5 = mk("Sentence length for effect", "📏", [
    "Why might a writer use a very short sentence after several long ones?|to create emphasis or surprise|to fill space|to confuse readers",
    "Long, flowing sentences often create a feeling of...|ongoing motion or deep thought|sharp shock|total silence",
    "Read: <b>The door creaked. Silence.</b> What does the one-word sentence do?|adds tension|adds a joke|adds a date",
    "A paragraph has ten sentences of six words each. What is the problem?|it can sound choppy and monotonous|it is too long|it has no nouns",
    "To slow a moment down so readers linger, use...|a longer sentence with rich detail|a one-word sentence|a question",
    "Mixing short and long sentences makes writing...|rhythmic and interesting|shorter|always correct",
    "A writer wants an action scene to feel fast. Which choice fits best?|short, quick sentences|long, winding sentences with many details|no punctuation at all",
    "A one-word sentence used on purpose, such as <b>Gone.</b>, is called a...|fragment used for effect|comma splice|run-on"],
    ["Think about the feeling the sentence length creates: speed, slowness, shock or flow.", "Short sentences speed things up or hit hard. Long sentences slow things down or let thoughts flow. A mix keeps writing lively.", "Example: <b>He opened the box. Empty.</b> The short ending sentence lands like a thud. Now do yours."],
    [["Length has a job", "📏", "Sentence length changes how writing <b>feels</b> and <b>sounds</b>."], ["Short and long", "↔️", "<b>Short</b> sentences feel fast, sharp or shocking. <b>Long</b> sentences feel slow, calm or thoughtful."], ["Mix them", "🎶", "Varying lengths gives your writing rhythm. A short sentence after a long one can be a powerful punch."]]);

  const B6 = mk("Anaphora, antithesis, chiasmus", "🎤", [
    "Which device is this?<br><br><b>I have a dream... I have a dream... I have a dream today.</b>|anaphora|chiasmus|antithesis",
    "Which device is this?<br><br><b>Never let a fool kiss you or a kiss fool you.</b>|chiasmus|anaphora|tricolon",
    "Which device is this?<br><br><b>It was the best of times, it was the worst of times.</b>|antithesis|chiasmus|tricolon",
    "Which device is this?<br><br><b>Veni, vidi, vici.</b> (I came, I saw, I conquered.)|tricolon|chiasmus|antithesis",
    "Which device is this?<br><br><b>That's one small step for man, one giant leap for mankind.</b>|antithesis|anaphora|tricolon",
    "Which device is this?<br><br><b>To err is human; to forgive, divine.</b>|antithesis|chiasmus|anaphora",
    "Which device is this?<br><br><b>Stop. Look. Listen.</b>|tricolon|chiasmus|antithesis",
    "Which device is this?<br><br><b>In the morning we study, in the afternoon we study, in the evening we study.</b>|anaphora|chiasmus|antithesis"],
    ["Look at the pattern, not the topic. Do the lines start the same way, set opposites side by side, flip the order of words, or come in a group of three?", "Anaphora repeats a word or phrase at the start of lines. Antithesis puts opposite ideas side by side. Chiasmus reverses the order of words in the second part. A tricolon is a series of three.", "Example: <b>Work hard, play hard</b> sets up two matching halves, but <b>You can take the boy out of the city, but you can't take the city out of the boy</b> flips the words. Now do yours."],
    [["Patterns that stick", "🎤", "Great speakers use <b>word patterns</b> that people remember."], ["Repeat and contrast", "↔️", "<b>Anaphora</b>: repeat the opening words. <b>Antithesis</b>: opposite ideas side by side."], ["Flip and group", "🔀", "<b>Chiasmus</b>: the second half reverses the first (A B, B A). <b>Tricolon</b>: a list of three."]]);

  const B7 = mk("When to use italics", "🔤", [
    "Which should be italicized in print?|the title of a novel|the title of a poem|the name of a country",
    "Which should be italicized in print?|the name of a ship, such as the Titanic|the name of a river|the name of a school",
    "In which sentence is italics used correctly for a word used as a word?|The word <i>love</i> has four letters.|The <i>word</i> love has four letters.|The word love <i>has</i> four letters.",
    "Which is a good reason to use italics?|to stress one word, used sparingly|to decorate every sentence|to show the end of a paragraph",
    "Which kind of title is italicized in print?|a movie|a song|a chapter",
    "Which is italicized in print?|a newspaper name|an article name|a short story",
    "When you write by hand, what do you use instead of italics?|underlining|circling|crossing out",
    "A foreign phrase not yet common in English, like <i>carpe diem</i>, is usually...|italicized|capitalized|put in brackets"],
    ["Think about whether the thing is a big, whole work or a small part, and whether it is a word used as a word.", "Italicize the titles of long, whole works (books, movies, newspapers), names of ships, words used as words, and unfamiliar foreign phrases. Short works go in quotation marks.", "Example: the album <i>Thriller</i> is a whole work, but one track from it goes in quotes. A magazine is italicized; a single article from it is in quotes. Now do yours."],
    [["Italics at work", "🔤", "Italics slant letters to mark special kinds of words."], ["What to italicize", "📚", "<b>Long works</b> (novels, movies, newspapers), <b>ship names</b>, <b>words as words</b>, and <b>foreign phrases</b> that are not yet common in English."], ["By hand", "✍️", "In handwriting, <u>underline</u> instead. Do not overuse italics for emphasis."]]);

  const B8 = mk("Subordinators and meaning", "🔗", bs("Choose the word that fits the meaning.", [
    "___ it was raining, the game went on.|Although|Because|Unless",
    "We stayed inside ___ it was raining.|because|although|unless",
    "___ you finish your homework, you can play.|After|Although|Unless",
    "You will be late ___ you leave now.|unless|because|after",
    "She was happy ___ she lost the match.|even though|because|unless",
    "He studied hard ___ he could pass the exam.|so that|although|unless",
    "___ I was walking home, it began to snow.|While|Unless|Although",
    "She runs every day ___ she wants to stay healthy.|because|although|unless"]),
    ["Ask what the first idea has to do with the second: does it give a reason, a surprise, a requirement, or a time?", "Reason words explain why. Contrast words show a surprise. Condition words set a requirement. Time words show when.", "Example: <b>___ it was cold, we swam anyway.</b> A swim in the cold is a surprise, so a contrast word fits: though. Now do yours."],
    [["Little words, big jobs", "🔗", "A <b>subordinating conjunction</b> starts a dependent clause and shows how it connects to the main clause."], ["Kinds", "🗂️", "<b>Reason</b>: because, since. <b>Contrast</b>: although, though, even though. <b>Condition</b>: if, unless. <b>Time</b>: when, while, after, until."], ["Pick by meaning", "🎯", "Read both ideas and decide how they relate before you choose the word."]]);

  const B9 = mk("Ways to build a paragraph", "🧱", bq("Which method of development is used?", [
    "A paragraph gives three examples of kind acts at school.|examples|process|definition",
    "A paragraph explains how to plant a seed, step by step.|process|comparison|description",
    "A paragraph explains what the word empathy means.|definition|process|cause and effect",
    "A paragraph shows how two phones are alike and different.|comparison|process|definition",
    "A paragraph explains why a lake's level dropped and what happened to the fish.|cause and effect|description|process",
    "A paragraph paints a picture of a busy market with colors, sounds and smells.|description|process|definition",
    "A paragraph sorts music into rock, jazz and classical.|classification|process|description",
    "A paragraph uses first, next, then and finally to show how to bake bread.|process|definition|classification"]),
    ["Ask what the paragraph is mostly DOING: showing steps, giving meaning, sorting, comparing, giving causes, or painting a picture.", "Examples: several cases. Process: steps in order. Definition: what a word means. Classification: sorting into groups. Comparison: alike and different. Cause and effect: why and what resulted. Description: sensory details.", "Example: <b>A paragraph tells how a bill becomes law, step by step.</b> Steps in order make it a process paragraph. Now do yours."],
    [["Choose your method", "🧱", "A good paragraph is built in a <b>pattern</b> that suits its purpose."], ["Common patterns", "🗂️", "<b>Examples</b>, <b>process</b> (steps), <b>definition</b>, <b>classification</b> (groups), <b>comparison</b>."], ["More patterns", "➕", "<b>Cause and effect</b> (why and result) and <b>description</b> (details that paint a picture). Paragraphs can combine them."]]);

  const B10 = mk("The hero's journey", "🗺️", [
    "The hero lives a normal life at home. This stage is...|the ordinary world|the ordeal|the return",
    "A message arrives that invites the hero to an adventure. This stage is...|the call to adventure|the reward|the ordeal",
    "The hero first hesitates and says no. This stage is...|refusal of the call|the reward|crossing the threshold",
    "An experienced guide gives the hero advice or a gift. This stage is...|meeting the mentor|the ordeal|the return",
    "The hero leaves home and enters the new, strange world. This stage is...|crossing the threshold|the ordinary world|the reward",
    "The hero faces the greatest challenge or danger. This stage is...|the ordeal|the call to adventure|the ordinary world",
    "The hero returns home changed, bringing something useful for others. This stage is...|return with the elixir|refusal of the call|the call to adventure",
    "Who described the hero's journey pattern in myths in the book The Hero with a Thousand Faces (1949)?|Joseph Campbell|Aristotle|Homer"],
    ["Think about where in the adventure this happens: at the start, in the middle, or at the end.", "The hero's journey begins at home, moves through a call, a guide, a crossing into a new world and a big challenge, and ends with a return.", "Example: <b>A farm boy finds a map and is invited on a quest.</b> The invitation to adventure is an early stage. Now do yours."],
    [["A pattern in myths", "🗺️", "Many stories follow a pattern called the <b>hero's journey</b>, described by Joseph Campbell."], ["Beginning", "🏠", "<b>Ordinary world</b> → <b>call to adventure</b> → <b>refusal</b> → <b>meeting the mentor</b> → <b>crossing the threshold</b>."], ["Middle and end", "🏔️", "<b>Tests and allies</b> → <b>ordeal</b> → <b>reward</b> → <b>road back</b> → <b>return with the elixir</b>."]]);

  const B11 = mk("Correlation or causation?", "📈", [
    "Ice cream sales and sunburns both rise in summer. Does ice cream cause sunburn?|no, hot sunny weather affects both|yes, ice cream causes it|no, but only in winter",
    "Correlation means...|two things change together|one thing causes the other|they are opposites",
    "What can scientists use to test whether one thing causes another?|a controlled experiment|a guess|a poll of friends",
    "A rooster crows before sunrise. Does the rooster cause the sun to rise?|no, the two just happen together|yes|only on weekends",
    "Cities with more fire trucks have more fire damage. What is the best explanation?|bigger fires bring more trucks|fire trucks start fires|nothing can explain it",
    "'After this, therefore because of this' is a fallacy called...|post hoc|bandwagon|straw man",
    "Which word signals a claim of cause?|causes|is linked to|goes with",
    "Which wording is safer when you only know two things are related?|is linked to|causes|proves"],
    ["Ask: did one thing really make the other happen, or did they just happen together?", "A link between two things does not prove one causes the other. A third factor may cause both, or it may be a coincidence. Experiments help test cause.", "Example: <b>People who carry umbrellas see more rain.</b> Umbrellas do not cause rain; people carry them because rain is expected. Now do yours."],
    [["Together is not cause", "📈", "<b>Correlation</b> means two things change together. <b>Causation</b> means one makes the other happen."], ["Hidden factors", "🌤️", "Ice cream and sunburn both rise in summer because of <b>sunny weather</b>, not because of each other."], ["Careful words", "🔬", "Use <b>is linked to</b> or <b>is associated with</b> unless an experiment shows cause. Do not say <b>causes</b> without proof."]]);

  const B12 = mk("Abstract or concrete?", "🧱", [
    "Which noun is abstract?|freedom|bicycle|mountain",
    "Which noun is concrete (you can see or touch it)?|pencil|honesty|courage",
    "Which noun is abstract?|loyalty|backpack|river",
    "Which noun is concrete?|sandwich|bravery|wisdom",
    "Which sentence is more concrete?|The soup steamed in a chipped blue bowl.|The meal was good.|It was a nice thing.",
    "Which sentence is more concrete?|Wet footprints led to the muddy gate.|Something happened outside.|It was messy.",
    "Which noun is abstract?|justice|ladder|kitten",
    "Why add concrete details to writing?|they help readers picture and believe the scene|they make sentences longer|they replace grammar"],
    ["Ask: could I see, hear, smell, taste or touch this? If yes, it is probably concrete.", "Concrete words name things the senses can notice. Abstract words name ideas, qualities or feelings that you cannot touch.", "Example: <b>kindness</b> is an idea you cannot touch (abstract), but <b>a warm blanket</b> is something you can feel (concrete). Now do yours."],
    [["Two kinds of words", "🧱", "<b>Concrete</b> words name things you can sense: <b>apple, rain, drum</b>. <b>Abstract</b> words name ideas: <b>freedom, fear, justice</b>."], ["Why concrete?", "🔎", "Concrete details help readers <b>picture</b> your writing. <b>The meal was good</b> says little; <b>steam curled from the warm bread</b> shows it."], ["Use both", "⚖️", "Explain an abstract idea by pairing it with a concrete example."]]);

  const B13 = mk("Look-alike words 6", "🔎", bq("Choose the right word.", [
    "Please be ___ and keep the surprise a secret.|discreet|discrete|discrit",
    "The experiment has two ___ (separate) groups.|discrete|discreet|discrite",
    "A good question can ___ a thoughtful answer.|elicit|illicit|elisit",
    "The referee should be ___ (fair, with no stake in the game).|disinterested|uninterested|disenterested",
    "She was ___ in the boring lecture and yawned.|uninterested|disinterested|uninterest",
    "Her family will ___ from Spain to Chile next year (leave a country).|emigrate|immigrate|emmigrate",
    "An ___ scientist won the prize (famous and respected).|eminent|imminent|immanent",
    "Dark clouds mean a storm is ___ (about to happen).|imminent|eminent|iminent",
    "The ___ cut the offensive words from the film.|censor|sensor|censer",
    "The thermostat has a ___ that measures temperature.|sensor|censor|sensar"]),
    ["Say each word aloud and think about its meaning, not just its spelling.", "These pairs sound almost the same but mean different things. Think about the job of the word in the sentence, and about its parts: dis- and un-, e- (out) and im- (in), the letter c or s.", "Example: the prefixes help: <b>e-</b> means out and <b>im-</b> means in, so one word is about leaving and the other about arriving. Now do yours."],
    [["Close but different", "🔎", "Some words look and sound almost alike but have different meanings."], ["Pairs to know", "👯", "<b>discreet</b> (careful) / <b>discrete</b> (separate). <b>elicit</b> (draw out) / <b>illicit</b> (illegal). <b>eminent</b> (famous) / <b>imminent</b> (about to happen)."], ["More pairs", "➕", "<b>emigrate</b> (exit a country) / <b>immigrate</b> (come into one). <b>censor</b> (remove) / <b>sensor</b> (detector). <b>disinterested</b> (fair) / <b>uninterested</b> (bored)."]]);

  const B14 = mk("Prefixes: circum-, contra-, mal-, retro-, ultra-", "🧩", [
    "In <b>circumnavigate</b>, to sail ___ the world. What does <b>circum-</b> mean?|around|against|under",
    "In <b>contradict</b>, to speak ___ someone. What does <b>contra-</b> mean?|against|with|for",
    "In <b>malfunction</b>, to work ___. What does <b>mal-</b> mean?|badly|well|twice",
    "In <b>retrospect</b>, looking ___. What does <b>retro-</b> mean?|back|ahead|up",
    "In <b>ultraviolet</b>, light ___ the violet end of the rainbow. What does <b>ultra-</b> mean?|beyond|before|under",
    "The <b>circumference</b> of a circle is the distance ___ it. What is the answer?|around|across|inside",
    "<b>Malnutrition</b> means ___ nutrition. What is the answer?|poor|extra|no",
    "<b>Retroactive</b> laws affect the ___. What is the answer?|past|future|present"],
    ["Split the word: prefix + root. What does the prefix add to the root?", "Circum- means 'around', contra- means 'against', mal- means 'bad', retro- means 'back', and ultra- means 'beyond'. Match the prefix in the word to its meaning.", "Example: <b>circumvent</b> means to go around an obstacle; <b>contraband</b> is goods against the law. Now do yours."],
    [["Prefix power", "🧩", "A <b>prefix</b> at the start of a word changes its meaning. Learn prefixes and you can decode new words."], ["Five prefixes", "5️⃣", "<b>circum-</b> around, <b>contra-</b> against, <b>mal-</b> bad, <b>retro-</b> back, <b>ultra-</b> beyond."], ["Try them", "🔬", "<b>Circumference</b>: around a circle. <b>Contradict</b>: speak against. <b>Malfunction</b>: bad function. <b>Retrospect</b>: look back. <b>Ultrasound</b>: beyond hearing."]]);

  const B15 = mk("Flow within a paragraph", "🌊", [
    "<b>The storm hit at midnight. It knocked out power.</b> The word 'It' connects the sentences by...|a pronoun pointing back|a transition|a question",
    "<b>Plants need light. However, too much light can burn leaves.</b> 'However' is a...|transition showing contrast|pronoun|title",
    "<b>I bought a kite. The kite was red.</b> Repeating 'kite' links the sentences by...|repeating a key word|a transition|a conclusion",
    "Which sentence helps a reader move smoothly from a paragraph about cats to one about dogs?|While cats prefer to be alone, dogs love company.|Dogs.|Another paragraph begins here.",
    "'Old to new' order means each sentence starts with...|something the reader already knows|brand-new information|a quotation",
    "Which transition shows time order?|Meanwhile|Instead|Otherwise",
    "A paragraph jumps from topic to topic with no links. It lacks...|coherence (flow)|rhyme|margins",
    "Which transition shows an example?|For instance|In contrast|Nevertheless"],
    ["Ask how each sentence connects to the one before it. What is the link: a word repeated, a pronoun, or a small linking word?", "Writers link sentences by repeating key words, using pronouns that point back, ordering ideas from known to new, and adding transitions that show time, contrast or examples.", "Example: <b>Maya trained hard. She won.</b> 'She' points back to Maya, so the sentences feel connected. Now do yours."],
    [["Smooth paragraphs", "🌊", "<b>Coherence</b> means a paragraph flows: each sentence connects to the one before."], ["Linking tools", "🔗", "<b>Repeat a key word</b>, use a <b>pronoun</b> that points back, and add <b>transitions</b> like <b>for instance, meanwhile, however</b>."], ["Old to new", "➡️", "Start with something readers already know, then add the new idea at the end of the sentence."]]);

  const B16 = mk("Who is speaking in a poem?", "🎙️", [
    "In a poem, who is the speaker?|the voice telling the poem, who may not be the poet|always the poet|the reader",
    "A poem says, 'I am an old oak tree standing on a hill.' Who is the speaker?|the oak tree|the poet's mother|a mountain",
    "A poet writes a poem in the voice of a child lost in a storm. The speaker is...|the child|the poet|the storm",
    "Which clue helps you find the speaker's feelings?|word choice and tone|the page number|the font size",
    "A speaker who says 'we' and 'us' speaks for...|a group|only one person|nobody",
    "A poem uses the words 'gloomy, heavy, gray.' What is the speaker's tone?|sad or gloomy|joyful|excited",
    "Is the speaker always the same as the poet?|no, poets can create characters|yes, always|only in haiku",
    "A poem says 'You should have seen it!' The word 'you' addresses...|a listener|the title|the poet only"],
    ["Think about who is 'talking' inside the poem. Is it the poet, or a voice the poet imagined?", "The speaker is the voice that tells the poem. Clues are the pronouns (I, we, you), the words chosen, and the feelings shown.", "Example: a poem in the voice of a snowman who says 'I melt in the sun' has a snowman as the speaker, not the poet. Now do yours."],
    [["The voice in the poem", "🎙️", "The <b>speaker</b> is the voice that tells a poem. It can be the poet or a character the poet creates."], ["Find the clues", "🔍", "Look at <b>I, we, you</b> and at the <b>word choice</b>. They show who is speaking and to whom."], ["Tone", "🎭", "The speaker's <b>tone</b> shows their attitude: sad, joyful, angry or calm."]]);

  const B17 = mk("Plot devices", "🧩", [
    "A clue that leads readers to suspect the wrong person.|red herring|MacGuffin|deus ex machina",
    "A sudden, unlikely event solves the problem at the very end.|deus ex machina|red herring|Chekhov's gun",
    "A mysterious briefcase everyone chases, and we never learn what is inside.|MacGuffin|red herring|plot twist",
    "A key hangs on a nail in chapter 1 and opens the secret door in the last chapter.|Chekhov's gun|red herring|MacGuffin",
    "Which device says every detail you introduce should matter later?|Chekhov's gun|red herring|MacGuffin",
    "'Deus ex machina' is Latin for...|god from the machine|hidden clue|golden key",
    "Which device is meant to mislead readers on purpose?|red herring|Chekhov's gun|setting",
    "A treasure map that drives everyone's quest, though the treasure matters little to the story, is a...|MacGuffin|red herring|flashback"],
    ["Think about the job the story detail does: misleads, rescues, motivates, or pays off later.", "A red herring misleads. A MacGuffin is the object everyone wants, which drives the plot. Chekhov's gun is a detail set up early that pays off later. Deus ex machina is a sudden, unearned rescue.", "Example: <b>A detective story points at the butler, but he is innocent.</b> The false trail is meant to mislead. Now do yours."],
    [["Tools of the plot", "🧩", "Writers use <b>plot devices</b> to move a story along."], ["Four to know", "4️⃣", "<b>Red herring</b>: false clue. <b>MacGuffin</b>: the object that drives the chase. <b>Chekhov's gun</b>: early detail that pays off. <b>Deus ex machina</b>: a sudden rescue."], ["Use with care", "⚠️", "A <b>deus ex machina</b> can feel like cheating. Plant clues early so the ending feels earned."]]);

  const B18 = mk("Literary movements", "🏛️", [
    "Which movement celebrated emotion, nature and imagination?|Romanticism|Realism|Modernism",
    "Which movement showed ordinary people and everyday life truthfully?|Realism|Romanticism|Gothic",
    "Which early-1900s movement broke old rules with experimental forms?|Modernism|Realism|Romanticism",
    "Mary Shelley's Frankenstein (1818) uses dark, mysterious settings. That style is called...|Gothic|Realism|Modernism",
    "Langston Hughes was a leading writer of the...|Harlem Renaissance|Romantic movement|Gothic period",
    "Wordsworth's poems about daffodils and lakes belong to...|Romanticism|Modernism|Realism",
    "Mark Twain's stories of everyday life along the Mississippi are linked to...|Realism|Romanticism|Modernism",
    "Virginia Woolf experimented with how a story is told. Her style is called...|Modernism|Realism|Romanticism"],
    ["Think about when the writer lived and what the writing was trying to do: feel deeply, show real life, or break the rules.", "Romanticism (1800s) loved emotion and nature. Realism showed everyday life as it is. Modernism (early 1900s) experimented with form. Gothic uses dark, mysterious settings. The Harlem Renaissance was a 1920s flowering of Black arts.", "Example: a poem full of mountains, wild feelings and imagination fits the movement that prized nature and emotion. Now do yours."],
    [["Movements in writing", "🏛️", "A <b>literary movement</b> is a group of writers who share ideas and style during a period."], ["Three big ones", "3️⃣", "<b>Romanticism</b>: emotion and nature. <b>Realism</b>: ordinary life, told truthfully. <b>Modernism</b>: experiments with form."], ["More", "➕", "<b>Gothic</b>: dark, mysterious settings. <b>Harlem Renaissance</b>: 1920s Black writers, artists and musicians such as Langston Hughes."]]);

  // =============== LEVEL 21 ===============
  const C1 = mk("Professional emails", "📧", [
    "Which is the best subject line for an email to your teacher?|Question about Friday's science project|Hi|URGENT!!!",
    "How should you greet your teacher, Ms. Lee, in an email?|Dear Ms. Lee,|Hey Lee!!|Yo teacher,",
    "Which closing is professional?|Sincerely, Sam|later!|bye bye lol",
    "Reply all should be used when...|everyone on the email needs the information|never|you want to be loud",
    "Writing in ALL CAPS in an email looks like...|shouting|a code|a title",
    "Before sending an email you should...|proofread it and check the recipient|add many emojis|forward it to friends",
    "Which opening line is best?|I am writing to ask about the due date.|Sup, so about that...|Listen.",
    "Which attachment name is best?|Sam-Lee-Essay.docx|final-final2|asdf"],
    ["Think about how a polite, busy reader wants to receive a message: clear, short and respectful.", "A professional email has a clear subject, a greeting with the person's name, a short body that says what you need, a polite closing and your name. Avoid slang and shouting.", "Example: a good subject for a note to a coach is 'Absent from Thursday practice'. It tells the reader the topic at a glance. Now do yours."],
    [["Write it right", "📧", "A <b>professional email</b> is clear, short and polite. It helps busy readers act quickly."], ["Parts", "🧩", "<b>Subject line</b> (the topic), <b>greeting</b> (Dear Ms. Lee,), <b>body</b> (what you need), <b>closing</b> (Sincerely,) and your <b>name</b>."], ["Check it", "✅", "No slang, no ALL CAPS, check the recipient, and proofread before you send."]]);

  const C2 = mk("Resumes and cover letters", "📄", [
    "Which resume section lists schools and degrees?|education|references|objective",
    "A cover letter is...|a short letter introducing yourself and explaining why you fit a job|a list of every class you took|a thank-you card",
    "A good resume length for a teen is usually...|one page|ten pages|one sentence",
    "Which belongs on a resume?|skills and volunteer work|your favorite song|a secret password",
    "Which bullet is stronger?|Managed the school store's money and schedule|Was at the school store|Did stuff at school",
    "Which section lists abilities such as typing or first aid?|skills|references|education",
    "At the end of a cover letter you should...|thank the reader for their time|insult the competition|add a joke",
    "Which opening best starts a cover letter?|I am writing to apply for the library assistant position.|Hey, got a job?|I am the best ever."],
    ["Think about what an employer wants to learn quickly: who you are, what you can do, and why you are right for the job.", "A resume lists facts in sections such as education, experience and skills. A cover letter is a short letter that connects those facts to one specific job.", "Example: a section called 'Experience' lists past jobs and volunteer work with action verbs like 'organized' or 'led'. Now do yours."],
    [["Two documents", "📄", "A <b>resume</b> lists your education, experience and skills. A <b>cover letter</b> introduces you and explains why you fit the job."], ["Make it strong", "💪", "Start bullets with <b>action verbs</b>: <b>organized, led, built, taught</b>. Keep it to one page."], ["Be honest", "🤝", "Only include true facts, and keep private details out. Ask a trusted adult to read it before you send it anywhere."]]);

  const C3 = mk("Inverted word order", "🔃", [
    "Which sentence puts the verb before the subject?|Down the street ran the dog.|The dog ran down the street.|The dog down the street ran.",
    "Which sentence puts the verb before the subject?|Never have I seen such a view.|I have never seen such a view.|I never saw such a view.",
    "<b>Here comes the bus.</b> In this sentence, the subject is...|bus|Here|comes",
    "<b>Over the hill came the riders.</b> The subject is...|riders|hill|Over",
    "Why might a writer use inverted order?|for emphasis or a dramatic effect|to fix spelling|to make the sentence shorter",
    "<b>Rarely does she complain.</b> The subject is...|she|Rarely|does",
    "Which is a normal-order sentence?|The wind howled.|Howled the wind.|Rarely howled the wind.",
    "Questions often invert the verb and subject. Which sentence does?|Can you swim?|You can swim.|You swim can."],
    ["To find the subject, ask who or what does the action or is being described.", "In a normal sentence the subject comes first, then the verb. In an inverted sentence the verb (or helper verb) comes first and the subject follows.", "Example: <b>Into the cave crept the explorer.</b> Who crept? The explorer, so that is the subject, even though it comes last. Now do yours."],
    [["Flip the order", "🔃", "Normal order is <b>subject → verb</b>: <b>The dog ran.</b> Inverted order puts the verb first: <b>Ran the dog</b>."], ["Why invert?", "✨", "Inversion adds <b>emphasis</b> or drama: <b>Never had she felt so free.</b> Questions also invert: <b>Can you swim?</b>"], ["Find the subject", "🔍", "Ask <b>who or what</b> does the verb. The answer is the subject, wherever it sits."]]);

  const C4 = mk("Overstatement and understatement", "🎚️", bq("Which device is this?", [
    "I've told you a million times!|hyperbole|understatement|litotes",
    "The Sahara is a bit warm in summer.|understatement|hyperbole|litotes",
    "That was not a bad meal. (meaning it was good)|litotes|hyperbole|simile",
    "I'm so hungry I could eat a horse.|hyperbole|understatement|litotes",
    "After the flood, he called his soaked house 'a little damp.'|understatement|hyperbole|litotes",
    "It is no small achievement. (meaning it is a big one)|litotes|hyperbole|metaphor",
    "This bag weighs a ton.|hyperbole|understatement|litotes",
    "Climbing Mount Everest is a bit of a walk.|understatement|hyperbole|litotes"]),
    ["Decide: is the statement made bigger than the truth, smaller than the truth, or said by denying the opposite?", "Hyperbole exaggerates to make something bigger. Understatement makes something sound smaller than it is. Litotes says something by denying its opposite, like 'not bad'.", "Example: <b>It is not a small house</b> means it is big, said by denying the opposite. Now do yours."],
    [["Louder and softer", "🎚️", "Writers can make a point by saying <b>too much</b> or <b>too little</b>."], ["Hyperbole", "📣", "<b>Hyperbole</b> is a big exaggeration: <b>I've waited forever!</b>"], ["Understatement and litotes", "🤫", "<b>Understatement</b> plays something down: <b>a bit chilly</b> at the North Pole. <b>Litotes</b> denies the opposite: <b>not bad</b>."]]);

  const C5 = mk("Parts of a book", "📖", [
    "A short quote placed at the start of a book or chapter is called a(n)...|epigraph|epilogue|glossary",
    "A section at the end that tells what happens later is a(n)...|epilogue|prologue|preface",
    "A section at the start that sets up the story, before chapter 1, is a(n)...|prologue|epilogue|index",
    "An alphabetical list at the back of topics and page numbers is an...|index|glossary|appendix",
    "A mini-dictionary of hard words in the book is a...|glossary|index|foreword",
    "Extra material at the end, such as maps or tables, is an...|appendix|prologue|preface",
    "An introduction written by someone other than the author is a...|foreword|preface|epilogue",
    "Where do you find chapter titles with page numbers, near the front?|table of contents|index|glossary"],
    ["Think about where the part appears in the book (front, middle, back) and what job it does.", "Front parts introduce the book (foreword, preface, prologue, table of contents). Back parts add or help find things (epilogue, appendix, glossary, index).", "Example: a list at the back showing where each topic appears, from A to Z, helps you look things up fast. Now do yours."],
    [["Front matter", "📖", "<b>Table of contents</b>: chapters and pages. <b>Foreword</b>: intro by someone else. <b>Preface</b>: intro by the author."], ["Story parts", "📕", "<b>Epigraph</b>: a short quote at the start. <b>Prologue</b>: opening scene before chapter 1. <b>Epilogue</b>: closing scene after the story."], ["Back matter", "📚", "<b>Appendix</b>: extra material. <b>Glossary</b>: hard words explained. <b>Index</b>: topics with page numbers."]]);

  const C6 = mk("Observation, interpretation or opinion?", "🔍", bq("What kind of statement is this?", [
    "The poem has three stanzas.|observation|interpretation|opinion",
    "The short lines create a feeling of hurry.|interpretation|observation|opinion",
    "I did not enjoy this poem.|opinion|observation|interpretation",
    "The author uses the word gray twelve times.|observation|interpretation|opinion",
    "The gray imagery suggests the town is lifeless.|interpretation|observation|opinion",
    "The ending is the best part of the story.|opinion|observation|interpretation",
    "In chapter 3, Mia slams the door.|observation|interpretation|opinion",
    "Her slammed door shows she is hiding anger behind politeness.|interpretation|observation|opinion"]),
    ["Ask: can anyone see this directly in the text, or does it explain what the text means, or does it say what someone likes?", "An observation states what is actually on the page. An interpretation explains what it means or suggests, using the evidence. An opinion says what you like or dislike.", "Example: <b>The poem has 14 lines</b> can be counted (observation). <b>The 14 lines suggest a love of order</b> explains meaning (interpretation). <b>I love it</b> is an opinion. Now do yours."],
    [["Three kinds of statements", "🔍", "Strong literary writing keeps these apart."], ["Observation", "👀", "<b>Observation</b>: a fact you can point to in the text. <b>The speaker repeats the word rain.</b>"], ["Interpretation and opinion", "💭", "<b>Interpretation</b>: what it means, backed by evidence. <b>Opinion</b>: what you like. Essays need observations and interpretations."]]);

  const C7 = mk("Parts of an argument", "🏗️", [
    "'Schools should start later.' This is the...|claim|warrant|qualifier",
    "'Studies show teens need more sleep.' This is the...|grounds (evidence)|claim|rebuttal",
    "'Rested students learn better.' This explains why the evidence supports the claim. It is the...|warrant|qualifier|claim",
    "The word 'usually' or 'probably' in a claim is a...|qualifier|warrant|backing",
    "'Some say buses cannot change schedules, but they can adjust.' This answers an objection, so it is the...|rebuttal|claim|grounds",
    "Which part gives extra support for the warrant, such as a research report?|backing|qualifier|claim",
    "The link between the evidence and the claim is the...|warrant|rebuttal|qualifier",
    "The main point you want readers to accept is the...|claim|backing|warrant"],
    ["Ask what job the sentence does in the argument: the main point, the proof, the reason that connects them, or a response to doubt.", "The Toulmin model has a claim (the point), grounds (evidence), a warrant (why the evidence supports the claim), backing (support for the warrant), a qualifier (how certain) and a rebuttal (an answer to objections).", "Example: <b>Most people probably prefer summer.</b> The word 'probably' limits how certain the claim is, which is the qualifier's job. Now do yours."],
    [["A map of arguments", "🏗️", "Philosopher Stephen Toulmin broke arguments into parts."], ["Core parts", "🧱", "<b>Claim</b>: the point. <b>Grounds</b>: the evidence. <b>Warrant</b>: the reason that links evidence to claim."], ["Extra parts", "➕", "<b>Backing</b>: support for the warrant. <b>Qualifier</b>: how certain (probably). <b>Rebuttal</b>: answers to objections."]]);

  const C8 = mk("Hedging and certainty", "🎛️", [
    "Which sentence is more accurate when the evidence is limited?|Screen time may reduce sleep.|Screen time destroys sleep.|Screen time always ruins sleep.",
    "Which phrase hedges (softens) a claim?|tends to|definitely|certainly",
    "When is it wise to hedge?|when evidence shows a trend but not a certainty|never|when you have no idea",
    "Too much hedging makes writing...|weak and unclear|more powerful|shorter and stronger",
    "'Always' and 'never' are risky because...|a single exception can disprove them|they are long|they are rude",
    "Which verb makes the strongest claim?|proves|suggests|implies",
    "Which verb is best for a study with a small sample?|suggests|proves|guarantees",
    "Which sentence is hedged?|Most students seem to benefit from sleep.|All students benefit from sleep.|Sleep always works."],
    ["Think about how strong the evidence is. Does it support a certain claim or only a likely one?", "Hedging words (may, might, tends to, suggests, often) match your claim to your evidence. Absolute words (always, never, proves, all) need very strong evidence.", "Example: a survey of 20 people can show what <b>suggests</b> a trend, but it cannot <b>prove</b> it for everyone. Now do yours."],
    [["How sure are you?", "🎛️", "<b>Hedging</b> means softening a claim so it matches the evidence."], ["Hedge words", "🧶", "<b>may, might, often, tends to, seems to, suggests</b>. They keep a claim honest."], ["Not too much", "⚖️", "Hedge where the evidence is limited, but be bold where it is strong. Too many hedges make writing weak."]]);

  const C9 = mk("Parts of a research paper", "🔬", [
    "Which part explains how the study was done?|methods|abstract|results",
    "Which part presents what was found, with data?|results|methods|introduction",
    "Which part interprets findings and talks about limits?|discussion|methods|references",
    "A short summary at the very start of a paper is the...|abstract|references|methods",
    "Which part states the question and why it matters?|introduction|results|methods",
    "Which part lists all the sources used?|references|abstract|results",
    "A scientist wants to repeat your experiment. Which part helps most?|methods|abstract|discussion",
    "Where do you look first to decide quickly if a paper is relevant?|abstract|references|methods"],
    ["Think about the question each part answers: why, how, what, and so what.", "Many science papers follow the IMRaD pattern: Introduction (why), Methods (how), Results (what was found), Discussion (what it means). An abstract summarizes it all, and references list sources.", "Example: the section that tells exactly which tools and steps were used answers the 'how' question. Now do yours."],
    [["The IMRaD shape", "🔬", "<b>I</b>ntroduction (why), <b>M</b>ethods (how), <b>R</b>esults (what), <b>D</b>iscussion (so what)."], ["Extra parts", "➕", "The <b>abstract</b> is a short summary at the start. <b>References</b> list the sources at the end."], ["Reading fast", "⚡", "Read the abstract first, then skim results and discussion to see if the paper fits your question."]]);

  const C10 = mk("Capital letters in titles", "🔠", bq("One word in this title has the wrong capital letter (or lack of one). Which word is it?", [
    "A Walk In the Park|In|Walk|Park",
    "Journey to the Center of the earth|earth|Journey|Center",
    "The Cat in the hat|hat|Cat|The",
    "What To Do When It Rains|To|Do|Rains",
    "waiting for the Bus|waiting|Bus|for",
    "The Sun And the Moon|And|Sun|Moon",
    "Why Do We dream?|dream|We|Why",
    "a Tale of Two Cities|a|Tale|Cities"]),
    ["Check the first word and the last word first, then look at the small words in the middle.", "In title case, capitalize the first and last words and all important words (nouns, verbs, adjectives, adverbs). Keep articles, short prepositions and short conjunctions lowercase unless they are first or last.", "Example: in <b>Lord Of the Flies</b>, the small word 'Of' should be lowercase. In <b>Gone with the wind</b>, the last word 'wind' needs a capital. Now do yours."],
    [["Title case", "🔠", "Titles have their own capital letters pattern called <b>title case</b>."], ["Capitalize", "⬆️", "Always capitalize the <b>first word</b>, the <b>last word</b>, and the main words: <b>nouns, verbs, adjectives, adverbs</b>."], ["Keep small", "⬇️", "Keep <b>a, an, the</b>, short prepositions (<b>in, of, to, for</b>) and short conjunctions (<b>and, but, or</b>) lowercase in the middle."]]);

  const C11 = mk("Shakespeare's English", "🪶", [
    "In the old line 'Wherefore do you laugh?', what does <b>wherefore</b> mean?|why|where|which",
    "In Shakespeare's time, <b>thy</b> meant...|your|they|this",
    "<b>Hath</b> meant...|has|hate|had been",
    "<b>Anon</b> meant...|soon|never|again",
    "<b>Thou</b> meant...|you|the|those",
    "In 'Thou art kind,' <b>art</b> means...|are|painting|craft",
    "<b>Doth</b> meant...|does|dot|dote",
    "In 'Get thee hence,' <b>hence</b> means...|from here|toward here|yesterday"],
    ["Say the old word out loud and compare its sound or shape to a modern word you know.", "Many old words are close cousins of modern ones: th- words often match you or your, and -th endings match modern -s endings on verbs. Others (anon, hence, wherefore) have separate meanings.", "Example: <b>Whither goest thou?</b> means 'Where are you going?' Old words often map to simple modern ones. Now do yours."],
    [["Old English that is not so old", "🪶", "Shakespeare wrote about 400 years ago in <b>Early Modern English</b>. It looks odd, but it is close to ours."], ["You and your", "👥", "<b>Thou</b> = you, <b>thee</b> = you (object), <b>thy</b> = your, <b>art</b> = are."], ["Verbs and words", "📜", "<b>Hath</b> = has, <b>doth</b> = does, <b>wherefore</b> = why, <b>anon</b> = soon, <b>hence</b> = from here."]]);

  const C12 = mk("Writing for the ear", "🎙️", [
    "Which is better for a speech?|short, clear sentences|very long sentences with many clauses|rare abbreviations only",
    "Why repeat key points in a speech?|listeners cannot re-read|to fill time|to confuse listeners",
    "'First... second... finally...' in a speech are called...|signposts|rhymes|footnotes",
    "Before giving a speech, you should practice by...|reading it aloud|reading silently only|skipping practice",
    "A pause in a speech helps by...|letting listeners think and stressing a point|losing time|hiding mistakes",
    "Which sounds better spoken aloud?|We need clean water. We need it now.|The necessity of potable water is of paramount significance at present.|Water, as it were, is, in point of fact, needed.",
    "A speaker looks up from notes to...|connect with the audience|hide|read faster",
    "The 'rule of three' means...|groups of three make a point memorable|a speech should be three pages|three speakers are needed"],
    ["Imagine listening, not reading. You cannot go back to reread a line. What helps you follow along?", "Spoken writing uses short sentences, simple words, repetition of key ideas, signposts like 'first' and 'finally', and strategic pauses.", "Example: 'There are three reasons. First, ... Second, ... Finally, ...' tells listeners where they are. Now do yours."],
    [["Words for listening", "🎙️", "A speech is <b>heard</b>, not read, so listeners cannot go back."], ["Make it easy", "👂", "Use <b>short sentences</b>, simple words, and <b>repeat</b> key ideas. Use <b>signposts</b>: first, next, finally."], ["Practice", "🔁", "Read your speech <b>aloud</b>. Mark places to pause, and build in groups of three."]]);

  const C13 = mk("Visual rhetoric", "🖼️", [
    "Large, bold text on a poster tells viewers...|this is the most important part|it is an error|it is a footnote",
    "In many places, red in a warning sign signals...|danger or urgency|calm|nature",
    "White space around items helps by...|giving the eye room and focus|wasting paper|hiding words",
    "A chart whose y-axis starts at 90 instead of 0 can...|exaggerate small differences|prove nothing|be perfectly fair",
    "Which font choice helps readability for body text?|a simple, clear font|an ornate decorative script|all-caps italics",
    "A photo of smiling kids in an ad is meant to create...|a happy feeling about the product|data|a deadline",
    "Too many colors and fonts make a design...|messy and hard to read|clearer|more professional",
    "Contrast between text and background matters because...|text is easier to read|it saves ink|colors look alike"],
    ["Imagine the poster, chart or ad. What is the designer trying to make you notice or feel?", "Designers guide the eye with size, color, contrast, layout and images. These choices can make a message clearer, or can mislead.", "Example: a bright yellow sale tag grabs attention because of strong color contrast. Now do yours."],
    [["Design persuades", "🖼️", "<b>Visual rhetoric</b> is how images, color, layout and type persuade us."], ["Tools", "🧰", "<b>Size</b> shows importance. <b>Color</b> sets mood. <b>Contrast</b> aids reading. <b>White space</b> gives focus."], ["Be careful", "⚠️", "Charts can mislead: a cut-off axis makes small differences look huge. Always check the numbers."]]);

  const C14 = mk("Headlines and clickbait", "📰", [
    "Which headline is clickbait?|You Won't Believe What This Cat Did Next!|City Council Approves New Park Budget|School Library Adds 500 Books",
    "A clickbait headline mainly aims to...|get clicks by teasing|inform clearly|summarize the article",
    "A good headline should...|accurately reflect the story|hide the topic|use as many capitals as possible",
    "A study of 20 students found lunch changes helped mood. Which headline is most accurate?|Small Study Links Lunch Changes to Better Mood|Lunch Cures Sadness|Scientists Prove Lunch Fixes All Moods",
    "Which word is a warning sign of clickbait?|shocking|reported|announced",
    "If a headline makes a big claim, you should...|read the article and check the evidence|share it at once|ignore the claim",
    "Headlines about recent news usually use which tense?|present tense|past perfect|future perfect",
    "Headline style often leaves out...|small words like the and a|the main noun|every verb"],
    ["Ask: does this headline tell me what the story is about, or does it tease me to click?", "Honest headlines are clear, accurate and specific. Clickbait uses strong emotion, mystery or huge claims to get clicks, often without the facts.", "Example: <b>Mayor Opens New Bridge</b> tells you exactly what happened. <b>This Will Shock You!</b> tells you nothing. Now do yours."],
    [["Headlines have jobs", "📰", "A headline tells what a story is about in a few words."], ["Headline style", "✏️", "Headlines often use the <b>present tense</b> for recent news and drop small words: <b>Team Wins Title</b>."], ["Watch for clickbait", "🎣", "Words like <b>shocking, you won't believe</b> and huge claims can signal clickbait. Read the story and check the facts."]]);

  const C15 = mk("Useful feedback", "🗨️", [
    "Which comment is most useful?|Your second paragraph needs evidence; add a quote from the text.|Good job.|I did not like it.",
    "A kind and helpful way to start feedback is to...|name something that works well|point out the biggest mistake|say it is bad",
    "Specific feedback means...|pointing to exact places and ideas|general praise|giving only a grade",
    "What should a writer do with feedback?|consider it and decide what to change|ignore all of it|accept every note",
    "Which question helps a writer most?|What do you want readers to feel in this scene?|Why did you write this?|Is this all?",
    "A reverse outline means...|writing the main point of each paragraph after drafting to check structure|writing the title last|making an outline before drafting",
    "A reverse outline can reveal...|paragraphs that wander or repeat|spelling mistakes|font size",
    "When giving feedback, focus first on...|big ideas and organization, then small errors|commas|spelling"],
    ["Think about what would help the writer make the piece better, not just feel good or bad.", "Useful feedback is kind, specific and about the writing. Start with what works, point to exact places, and focus on big ideas before small errors.", "Example: 'I got lost in paragraph 3; what is its main point?' is specific and helpful. Now do yours."],
    [["Help each other write", "🗨️", "<b>Peer feedback</b> helps writers see what readers experience."], ["Good feedback", "👍", "Be <b>kind</b>, <b>specific</b> and <b>helpful</b>. Name a strength, point to exact spots, and ask questions."], ["Reverse outline", "🔄", "After drafting, write the main point of each paragraph. Gaps, repeats and wandering paragraphs show what to revise."]]);

  const C16 = mk("Proofreader's marks", "✂️", [
    "The mark ¶ means...|start a new paragraph|delete|insert a comma",
    "The word 'stet' means...|let it stand, ignore the correction|delete|capitalize",
    "Three short lines under a letter mean...|make it a capital|make it italic|make it bold",
    "A caret ^ shows where to...|insert something|delete something|start a new page",
    "A slash through a capital letter means...|make it lowercase|make it capital|delete the word",
    "The letters 'tr' or a curved line over two letters mean...|transpose (swap) them|delete them|capitalize them",
    "The symbol # in the text means...|add a space|delete a space|start a new line",
    "To delete a word, you...|strike through it and add a delete mark|circle it|underline it"],
    ["Picture the mark on a printed page. What change does the editor want to see?", "Proofreader's marks are a shared code: ¶ for a new paragraph, ^ to insert, a strike-through to delete, a slash to lowercase, three lines to capitalize, 'stet' to cancel a change.", "Example: a curved line over 'teh' tells the printer to swap the two letters (transpose) to make 'the'. Now do yours."],
    [["A shared code", "✂️", "<b>Proofreader's marks</b> are standard symbols editors use to show corrections."], ["Common marks", "🖊️", "<b>¶</b> new paragraph, <b>^</b> insert, strike-through = delete, <b>/</b> through a letter = lowercase."], ["More marks", "➕", "Three lines under a letter = capital. <b>tr</b> or a curved line = swap. <b>#</b> = add space. <b>stet</b> = let it stand."]]);

  const C17 = mk("Look-alike words 7", "🔍", bq("Choose the right word.", [
    "She will ___ to the new school quickly.|adapt|adopt|adept",
    "The family plans to ___ a puppy.|adopt|adapt|adept",
    "He is ___ at chess (skilled).|adept|adapt|adopt",
    "The artist mixed colors on her ___.|palette|palate|pallet",
    "The soup pleased my ___ (sense of taste).|palate|palette|pallet",
    "The team's ___ was high after the win.|morale|moral|mural",
    "The story's ___ is to be honest.|moral|morale|mural",
    "I ___ you the bus will be on time (promise).|assure|ensure|insure",
    "Please ___ that the door is locked (make certain).|ensure|assure|insure",
    "We bought an ___ to mail the card.|envelope|envelop|envellope"]),
    ["Say each word aloud and think about what it means in this sentence.", "These words sound almost alike, so match the meaning: adjust, take in, skilled; sense of taste, paint board, wooden platform; spirit, lesson; promise a person, make certain.", "Example: <b>The dancer is ___ at spinning.</b> This means skilled, so the word with the 'e' fits. Now do yours."],
    [["More look-alikes", "🔍", "These pairs trip up even good writers."], ["Pairs", "👯", "<b>adapt</b> (adjust) / <b>adopt</b> (take in) / <b>adept</b> (skilled). <b>palate</b> (taste) / <b>palette</b> (paint board)."], ["More", "➕", "<b>morale</b> (spirit) / <b>moral</b> (lesson). <b>assure</b> (promise a person) / <b>ensure</b> (make certain). <b>envelope</b> (noun) / <b>envelop</b> (to wrap)."]]);

  const C18 = mk("Unpacking long sentences", "📦", [
    "<b>The old clock on the wall of the empty hallway ticked.</b> What is the main subject?|clock|wall|hallway",
    "<b>The tired hikers who had climbed all day finally reached camp.</b> What is the main subject?|hikers|day|camp",
    "<b>The tired hikers who had climbed all day finally reached camp.</b> What is the main verb?|reached|climbed|had",
    "<b>Although it was late, the librarian, who loved books, stayed to help us.</b> What is the subject of the main clause?|librarian|it|books",
    "<b>Although it was late, the librarian, who loved books, stayed to help us.</b> What is the main verb?|stayed|was|loved",
    "Which parts can you usually remove to find the core sentence?|extra describing phrases|the subject|the verb",
    "When a long sentence confuses you, a good first step is to...|find the subject and the verb|skip it|read faster",
    "Paraphrasing a hard sentence means...|saying it again in simpler words|copying it|deleting it"],
    ["Strip the sentence down. Which words are the core (who or what, and what they did), and which words are extras?", "Cross out describing phrases (starting with of, who, which, although, in, on). What is left is the core: the subject and the main verb.", "Example: <b>The brave firefighter from the north station climbed the ladder.</b> Without the extras: firefighter climbed. Now do yours."],
    [["Take it apart", "📦", "Long sentences are easier when you find the <b>core</b>: the <b>subject</b> and its <b>main verb</b>."], ["Peel away extras", "🧅", "Describing phrases and clauses (<b>of the hallway, who loved books, although it was late</b>) add detail but are not the core."], ["Say it simply", "💬", "Then <b>paraphrase</b>: say the idea in your own simple words to check you understood."]]);

  const L19 = [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18];
  const L20 = [B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17, B18];
  const L21 = [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, C17, C18];

  const lvl = (n, L) => L.concat([MIX("Mixed practice", ...L.slice(0, 6)), MIX("Level " + n + " Challenge", ...L.slice(6))]);
  Object.assign(WRITING_LEVELS, { 19: lvl(19, L19), 20: lvl(20, L20), 21: lvl(21, L21) });
})();
