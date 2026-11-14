// ext/writing-16-18.js  Mind Lab Writing & Grammar, levels 16-18 (60 lessons)
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

  // =============== LEVEL 16 ===============
  const A1 = mk("Verbal phrases", "🧩", bq("What kind of phrase is the <b>first group of words</b> in the sentence?", [
    "Walking to school, Mia saw a fox.|participial phrase|gerund phrase|infinitive phrase",
    "Walking to school is good exercise.|gerund phrase|participial phrase|infinitive phrase",
    "Mia likes to walk to school.|infinitive phrase|gerund phrase|participial phrase",
    "The boy holding the balloon waved.|participial phrase|gerund phrase|infinitive phrase",
    "She is proud of winning the race.|gerund phrase|participial phrase|infinitive phrase",
    "We hope to finish the project today.|infinitive phrase|participial phrase|gerund phrase",
    "Painting landscapes is her hobby.|gerund phrase|infinitive phrase|participial phrase",
    "Tired from the long hike, Sam fell asleep.|participial phrase|gerund phrase|infinitive phrase"]),
    ["Look at the first word of the phrase. Is it a to + verb, an -ing word acting as a noun, or a verb form describing a person or thing?", "A gerund phrase works as a noun (a subject or object). A participial phrase describes a noun. An infinitive phrase starts with 'to' plus a verb.", "Example: <b>Eating slowly, Ben enjoyed his meal.</b> 'Eating slowly' describes Ben, so it is a participial phrase. Now do yours."],
    [["Verbals with helpers", "🧩", "A verbal (gerund, participle or infinitive) can bring other words along. That group is a <b>verbal phrase</b>."], ["Three kinds", "🔀", "<b>Gerund phrase</b>: acts as a noun (<b>Reading comics</b> is fun). <b>Participial phrase</b>: describes (The girl <b>reading comics</b> laughed). <b>Infinitive phrase</b>: <b>to + verb</b> (I want <b>to read comics</b>)."], ["Test it", "✅", "Can you swap the phrase for 'it'? Then it is a gerund phrase. Does it describe a noun? Then it is participial."]]);

  const A2 = mk("Compound-complex sentences", "🧱", bq("What kind of sentence is this?", [
    "I called Ben, and he came when he heard the news.|compound-complex|compound|complex",
    "The dog barked because it saw a cat.|complex|compound|simple",
    "The sun set, and the stars appeared.|compound|complex|compound-complex",
    "Birds sing.|simple|compound|complex",
    "Although it rained, we played outside, and we had fun.|compound-complex|complex|compound",
    "We left early, but the bus was late.|compound|complex|simple",
    "If you study, you will pass.|complex|compound|compound-complex",
    "Mom cooked dinner while Dad set the table, and I washed the dishes.|compound-complex|compound|simple",
    "The old clock on the wall ticks loudly.|simple|complex|compound"]),
    ["Count the clauses. How many could stand alone as sentences? How many start with words like because, when or if and cannot stand alone?", "Simple = 1 independent clause. Compound = 2 or more independent clauses. Complex = 1 independent + at least 1 dependent. Compound-complex = 2 or more independent + at least 1 dependent.", "Example: <b>I ran, and she walked because she was tired.</b> Two independent clauses (I ran / she walked) + one dependent (because she was tired) = compound-complex. Now do yours."],
    [["Four sentence types", "🧱", "<b>Simple</b>: one independent clause. <b>Compound</b>: two or more independent clauses. <b>Complex</b>: one independent and one or more dependent clauses."], ["Putting it together", "🏗️", "A <b>compound-complex</b> sentence has <b>two or more independent clauses</b> and <b>at least one dependent clause</b>."], ["Count them", "🔢", "<b>Independent</b> clauses can stand alone. <b>Dependent</b> clauses start with words like <b>because, when, although, if, while</b>."]]);

  const A3 = mk("Predicate nominative or adjective", "🔗", bq("What kind of word or phrase follows the linking verb?", [
    "My uncle is a pilot.|predicate nominative|predicate adjective|adverb",
    "The soup tastes salty.|predicate adjective|predicate nominative|adverb",
    "The winner was Jada.|predicate nominative|predicate adjective|adverb",
    "The night grew cold.|predicate adjective|predicate nominative|adverb",
    "She became a doctor.|predicate nominative|predicate adjective|adverb",
    "The room smells fresh.|predicate adjective|predicate nominative|adverb",
    "Our captain is Leo.|predicate nominative|predicate adjective|adverb",
    "The children seemed excited.|predicate adjective|predicate nominative|adverb"]),
    ["Find the linking verb (is, was, became, seems, tastes...). Then look at what comes right after it.", "A predicate nominative is a noun or pronoun that renames the subject. A predicate adjective describes the subject. Ask: does it rename, or does it describe?", "Example: <b>The lake is calm.</b> 'Calm' describes the lake, so it is a predicate adjective. In <b>The lake is a reservoir</b>, 'reservoir' renames the lake. Now do yours."],
    [["Words after linking verbs", "🔗", "A linking verb (<b>is, was, seem, become, taste, smell, grow</b>) connects the subject to a word that tells more about it."], ["Renaming", "🏷️", "A <b>predicate nominative</b> is a noun that renames the subject: My aunt is a <b>chef</b>."], ["Describing", "🎨", "A <b>predicate adjective</b> describes the subject: My aunt is <b>talented</b>."]]);

  const A4 = mk("Transitive or intransitive?", "🎯", bq("Is the verb <b>transitive</b> (has a direct object) or <b>intransitive</b> (no direct object)?", [
    "She kicked the ball.|transitive|intransitive|linking",
    "The baby slept.|intransitive|transitive|linking",
    "He opened the door.|transitive|intransitive|linking",
    "The snow melted.|intransitive|transitive|linking",
    "We painted a mural.|transitive|intransitive|linking",
    "Birds flew overhead.|intransitive|transitive|linking",
    "The chef tasted the soup.|transitive|intransitive|linking",
    "The audience laughed.|intransitive|transitive|linking",
    "My brother plays guitar.|transitive|intransitive|linking"]),
    ["Find the action verb. Then ask 'what?' or 'whom?' after it.", "If a word answers 'what?' or 'whom?' after the verb, the verb is transitive. If nothing answers it, the verb is intransitive.", "Example: <b>Maya wrote a story.</b> Wrote what? A story, so 'wrote' is transitive. In <b>Maya wrote carefully</b>, nothing answers 'what?', so it is intransitive. Now do yours."],
    [["Does the action land?", "🎯", "A <b>transitive</b> verb passes its action to something: She <b>threw</b> the ball. (Threw what? The ball.)"], ["Action stops", "🛑", "An <b>intransitive</b> verb needs no object: The ball <b>rolled</b>."], ["The 'what?' test", "❓", "After the verb, ask <b>what?</b> or <b>whom?</b>. An answer means <b>transitive</b>. No answer means <b>intransitive</b>."]]);

  const A5 = mk("Look-alike words 4", "👯", bq("Choose the right word.", [
    "The bike stayed ___ against the wall.|stationary|stationery|stationnary",
    "Pens, cards and envelopes are called ___.|stationery|stationary|stationerry",
    "Her sister gave her a nice ___ on her drawing.|compliment|complement|complamint",
    "A blue scarf is a perfect ___ to a yellow coat.|complement|compliment|complament",
    "The ___ of France is Paris.|capital|capitol|capitel",
    "The ___ building in Washington, D.C. has a big dome.|Capitol|Capital|Capitel",
    "The student ___ voted to plan a dance.|council|counsel|counsil",
    "A lawyer's advice is called legal ___.|counsel|council|counsle",
    "Use a ___ letter to start a name.|capital|capitol|capitel"]),
    ["These words sound alike but mean different things. Decide what meaning the blank needs.", "Memory tricks: stationEry has an E like envelope; stationAry has an A like stAy. A complEment completEs; a complIment is something nIce. A capitOl has a dOme. A councIL is a group; counSEL is advice.", "Example: <b>The ___ was loud and the teacher gave good ___.</b> A group that meets is a council; advice is counsel. Pick by meaning. Now do yours."],
    [["Same sound, new meaning", "👯", "Some words are almost twins. One wrong letter changes the meaning completely."], ["Pairs to know", "📚", "<b>stationary</b> = not moving / <b>stationery</b> = paper and pens. <b>compliment</b> = praise / <b>complement</b> = completes. <b>capital</b> = city or main letter / <b>Capitol</b> = building."], ["More pairs", "🏛️", "<b>council</b> = a group that decides / <b>counsel</b> = advice. Use the memory trick: the <b>e</b> in complEment helps it completE."]]);

  const A6 = mk("Look-alike words 5", "🔍", bq("Choose the right word.", [
    "The magician created an ___ of floating.|illusion|allusion|elusion",
    "The poem makes an ___ to a Greek myth.|allusion|illusion|ellusion",
    "A speaker can ___ something without saying it directly.|imply|infer|impley",
    "A listener can ___ a meaning from clues.|infer|imply|inver",
    "The next town is ___ down the road (more distance).|farther|further|fahther",
    "I will not talk ___ about it (any more).|further|farther|furthur",
    "Please ___ to the next room.|proceed|precede|procede",
    "Monday ___ Tuesday.|precedes|proceeds|preceeds",
    "She ate chocolate cake for ___.|dessert|desert|desart"]),
    ["Think about what the sentence needs the word to mean, not how it sounds.", "An illusion tricks the eye; an allusion is a reference. Speakers imply; listeners infer. Farther is for distance you can measure; further is for 'more'. Precede = come before; proceed = go on. Dessert has two s's, like 'sweet stuff'.", "Example: <b>The writer's ___ to Hercules meant strength.</b> A reference to a story is an allusion. Now do yours."],
    [["Fooling the eye or the mind", "🎩", "<b>illusion</b> = a false picture. <b>allusion</b> = a quick reference to a story, person or event."], ["Imply and infer", "🔁", "A speaker <b>implies</b> (hints). A listener <b>infers</b> (figures out)."], ["Going on", "🚶", "<b>farther</b> = more distance. <b>further</b> = more of something. <b>precede</b> = go before. <b>proceed</b> = go on."]]);

  const A7 = mk("Kinds of characters", "🎭", [
    "Marcus is selfish at first but learns to share by the end. He is a ___ character.|dynamic|static|flat",
    "A villain is evil from page one to the last page and never changes. He is a ___ character.|static|dynamic|round",
    "A character with many sides, strengths and faults who feels real is ___.|round|flat|minor",
    "A shopkeeper who appears once and has just one trait (grumpy) is ___.|flat|round|protagonist",
    "Which word means a character who changes during the story?|dynamic|static|flat",
    "Which word means a character who stays the same?|static|dynamic|round",
    "The main character is the ___.|protagonist|antagonist|foil",
    "The character or force that works against the hero is the ___.|antagonist|protagonist|narrator",
    "A character who contrasts with another to highlight differences is a ___.|foil|protagonist|narrator"],
    ["Think about what the question asks: does the character change, how many sides do they show, or what role do they play?", "Dynamic = changes. Static = stays the same. Round = many sides. Flat = one or two traits. Protagonist = main. Antagonist = opposes. Foil = contrast.", "Example: <b>A ghost who is gloomy in every chapter and never changes.</b> That is a static character. Now do yours."],
    [["Change or no change", "🔄", "A <b>dynamic</b> character changes inside (learns, grows). A <b>static</b> character stays the same."], ["Deep or shallow", "🧅", "A <b>round</b> character has many traits and feels real. A <b>flat</b> character has just one or two traits."], ["Roles", "🎬", "The <b>protagonist</b> is the main character. The <b>antagonist</b> works against them. A <b>foil</b> is a contrast that makes someone stand out."]]);

  const A8 = mk("Oxymoron, paradox, pun", "🤪", bq("Which is it: an <b>oxymoron</b>, a <b>paradox</b> or a <b>pun</b>?", [
    "Jumbo shrimp|oxymoron|paradox|pun",
    "Deafening silence|oxymoron|paradox|pun",
    "I used to be a banker, but I lost interest.|pun|oxymoron|paradox",
    "Less is more.|paradox|oxymoron|pun",
    "Why did the scarecrow win an award? He was outstanding in his field.|pun|paradox|oxymoron",
    "Bittersweet|oxymoron|paradox|pun",
    "You must be cruel to be kind.|paradox|pun|oxymoron",
    "The more you learn, the more you realize you do not know.|paradox|oxymoron|pun",
    "Seriously funny|oxymoron|paradox|pun"]),
    ["An oxymoron puts two opposite words side by side. A paradox is a whole statement that seems false but holds truth. A pun plays on words with two meanings.", "Two clashing words in a row = oxymoron. A sentence that seems to argue with itself but makes sense when you think = paradox. A joke using a word that sounds or means two ways = pun.", "Example: <b>Old news</b> is an oxymoron (two clashing words). <b>I'm reading a book about anti-gravity. It's impossible to put down</b> is a pun. Now do yours."],
    [["Oxymoron", "⚡", "Two <b>opposite words</b> together: <b>bittersweet</b>, <b>living dead</b>, <b>open secret</b>."], ["Paradox", "🌀", "A <b>statement</b> that seems to contradict itself yet reveals a truth: <b>The more you give, the more you have.</b>"], ["Pun", "😄", "A joke that plays on a word with <b>two meanings</b> or sounds: <b>The bakery's bread was on a roll.</b>"]]);

  const A9 = mk("Topic sentences and unity", "📌", [
    "Topic: <b>Exercise is good for you.</b> Which sentence does <b>not</b> belong?|My cat likes tuna.|Running makes your heart strong.|It helps you sleep better.",
    "Topic: <b>Libraries are useful places.</b> Which sentence does <b>not</b> belong?|Pizza is my favorite food.|You can borrow books for free.|They have quiet places to study.",
    "Topic: <b>Honeybees help farms.</b> Which sentence does <b>not</b> belong?|Volcanoes can erupt.|Bees carry pollen between flowers.|Fruit grows after flowers are pollinated.",
    "Topic: <b>Our school has a great garden.</b> Which sentence does <b>not</b> belong?|The football game starts at six.|Students grow tomatoes there.|Bees visit the flowers.",
    "Topic: <b>Reading builds vocabulary.</b> Which sentence does <b>not</b> belong?|Summer days are long.|New words appear in stories.|Context helps you learn what they mean.",
    "Topic: <b>Rivers shape the land.</b> Which sentence does <b>not</b> belong?|Pencils come in many colors.|Moving water carves valleys.|Rivers carry soil to new places.",
    "Topic: <b>Saving money takes planning.</b> Which sentence does <b>not</b> belong?|Dolphins are mammals.|Set a goal for what you want to buy.|Put a little aside each week.",
    "Which sentence is the best <b>topic sentence</b> for a paragraph about why sleep matters?|Sleep is important for both your body and your mind.|I went to bed at nine.|Beds come in many sizes.",
    "Which is the best <b>topic sentence</b> for a paragraph about tree benefits?|Trees help people and animals in many ways.|I saw a tree.|There are some leaves."],
    ["Read the topic first. Then ask of each sentence: does this one help explain the topic?", "A paragraph has unity when every sentence supports the main idea. A sentence about something else breaks the unity. A topic sentence names the main idea of the whole paragraph.", "Example: Topic: <b>Dogs make good pets.</b> 'Dogs are loyal.' fits. 'Tuesday is rainy.' does not belong. Now do yours."],
    [["One main idea", "📌", "A good paragraph has one big idea, stated in the <b>topic sentence</b> (often the first sentence)."], ["Every sentence helps", "🤝", "The other sentences give <b>details, facts or examples</b> that support the topic sentence."], ["Unity", "🧹", "If a sentence is about something else, it breaks the paragraph's <b>unity</b>. Take it out!"]]);

  const A10 = mk("Introductions and conclusions", "🚪", [
    "Which is the strongest <b>opening</b> for an essay about recycling?|Every minute, people throw away thousands of plastic bottles.|Hi, my name is Sam and I'm writing about recycling.|This essay is about recycling.",
    "Which is the strongest <b>opening</b> for an essay about sleep?|Did you know that kids who sleep well do better on tests?|I will now write about sleep.|Sleep is a thing.",
    "Which is the best <b>conclusion</b> sentence for an essay on school uniforms?|In short, uniforms save time and keep the focus on learning.|Also, I like blue.|Here is another fact about shirts.",
    "Which is the best <b>conclusion</b> for an essay on volunteering?|Giving a little time can make a big difference for a whole community.|That is all I have to say.|Volunteers wear name tags.",
    "Which opening gives <b>background</b> before the main claim?|For a hundred years, bicycles have helped people travel without fuel. Today, cities should build more bike lanes.|Bike lanes. Build them.|I rode my bike once.",
    "Which part of an essay states the main claim near the start?|the thesis in the introduction|the last sentence of the conclusion|the title page",
    "A good conclusion should ___.|remind the reader of the main idea and leave a final thought|add a brand-new unrelated topic|apologize for writing",
    "Which is a weak ending to avoid?|Well, that's about it, I guess.|Overall, the evidence shows that reading daily helps students grow.|So the next time you open a book, remember what it can do for you.",
    "Which is the best <b>hook</b> for an essay about space travel?|Imagine looking back at Earth from a window in the sky.|Space is big.|My essay is about space travel."],
    ["Think about what the reader needs: an introduction should make them curious, and a conclusion should leave them satisfied.", "Strong openings use a surprising fact, a question or a picture in the mind, then lead to the thesis. Strong conclusions return to the main idea and end with a last thought. Weak ones announce ('I will write about') or trail off.", "Example: a weak opening is <b>This is about dogs.</b> A stronger one is <b>A dog can smell something a mile away.</b> Now do yours."],
    [["Hook, background, thesis", "🪝", "An introduction <b>hooks</b> the reader (a fact, question or image), gives <b>background</b>, and states the <b>thesis</b>."], ["What to avoid", "🚫", "Do not announce your essay ('I will now write about...'). Show your topic instead."], ["Closing well", "🔚", "A conclusion <b>restates the main idea in new words</b> and leaves a final thought. It never adds a brand-new topic."]]);

  const A11 = mk("Cause and effect words", "💥", [
    "It rained all day, ___ the game was canceled.|so|but|although",
    "___ the road was icy, the buses ran late.|Because|However|Although",
    "The power went out. As a ___, we used candles.|result|contrast|rule",
    "Plants need light; ___, they grow toward windows.|therefore|however|meanwhile",
    "He studied hard; ___, he passed the test.|consequently|nevertheless|instead",
    "The flight was late ___ the fog.|because of|in spite of|instead of",
    "The pipe froze, so the water stopped. What is the <b>cause</b>?|The pipe froze|The water stopped|The word 'so'",
    "The pipe froze, so the water stopped. What is the <b>effect</b>?|The water stopped|The pipe froze|The word 'so'",
    "Which word signals an <b>effect</b>?|therefore|because|since"],
    ["Ask: which part happened first and made the other part happen?", "A cause tells why something happened; an effect tells what happened because of it. Contrast words (like but, however, although) show a difference instead of cause.", "Example: <b>The glass fell, so it broke.</b> Cause: the glass fell. Effect: it broke. The word 'so' links them. Now do yours."],
    [["Why and what", "💥", "A <b>cause</b> is why something happens. An <b>effect</b> is what happens because of it."], ["Cause words", "🔗", "<b>because, since, due to, because of</b> point to the cause."], ["Effect words", "➡️", "<b>so, therefore, as a result, consequently</b> point to the effect."]]);

  const A12 = mk("Persuasion tricks in ads", "📢", bq("Which persuasion trick is this?", [
    "A famous singer says, 'I use only SparkleSmile toothpaste.'|testimonial|glittering generality|card stacking|plain folks",
    "'Our school is the best, the greatest, the most wonderful place on Earth!' (no facts given)|glittering generality|testimonial|card stacking|plain folks",
    "An ad lists every good thing about a snack but hides that it is full of sugar.|card stacking|testimonial|plain folks|urgency",
    "A candidate in jeans says, 'I'm just an ordinary farm kid like you.'|plain folks|testimonial|card stacking|urgency",
    "'Hurry! Only two hours left to buy!'|urgency|testimonial|plain folks|glittering generality",
    "A well-known chef says this pan is the only one she trusts.|testimonial|card stacking|plain folks|urgency",
    "A brochure shows only sunny days at a park and leaves out that it floods each spring.|card stacking|glittering generality|plain folks|testimonial",
    "'Last chance! Buy today or miss out forever!'|urgency|plain folks|glittering generality|card stacking"]),
    ["Ask what the ad is doing: using a famous person, using big happy words, hiding facts, acting ordinary, or rushing you?", "Testimonial = a famous person says it. Glittering generality = big vague happy words. Card stacking = tells only the good, hides the bad. Plain folks = 'I'm just like you'. Urgency = hurry!", "Example: <b>'An Olympic swimmer drinks this juice!'</b> A famous person is vouching for it, so it is a testimonial. Now do yours."],
    [["Ads are made to persuade", "📢", "Ads use <b>tricks</b>. Spotting them helps you think for yourself."], ["Common tricks", "🎣", "<b>Testimonial</b>: a famous person says it. <b>Glittering generality</b>: big, vague, happy words. <b>Plain folks</b>: 'I'm just like you.'"], ["More tricks", "🃏", "<b>Card stacking</b>: only the good facts are shown. <b>Urgency</b>: 'Hurry, it ends today!' to stop you from thinking."]]);

  const A13 = mk("Trustworthy sources", "🔎", [
    "Which source is most trustworthy for facts about volcanoes?|a science museum page written by volcano scientists|a stranger's comment under a video|an ad for a volcano tour",
    "Which is most trustworthy for facts about the planets?|a space agency's learning pages|a rumor on a message board|a joke website",
    "Which is most trustworthy for how bridges are built?|an engineering textbook|a post with no author|a poster for a bridge toy",
    "Which is most trustworthy for the history of ancient Rome?|a book by a history professor|an anonymous blog|a movie trailer",
    "Which is most trustworthy for facts about bees?|an article by a university's insect experts|a post that says 'trust me'|an ad for honey",
    "Which clue makes a source <b>more</b> trustworthy?|the author is an expert and lists sources|there is no author|it makes you feel angry",
    "Which clue makes a source <b>less</b> trustworthy?|it is trying to sell you something|it names its author|it was updated recently",
    "A website ends in .edu or .gov. What can you say?|it is often reliable, but still check the facts|it is always right|it is always wrong",
    "Why check the <b>date</b> of a source?|facts and discoveries can change over time|dates make pages longer|it does not matter"],
    ["Ask who wrote it, why they wrote it, and whether they show proof.", "Good sources have a named expert author, give their own sources, are current, and are trying to inform, not to sell or to trick you.", "Example: for facts about sharks, a marine biologist's article beats an anonymous joke page. Now do yours."],
    [["Who wrote it?", "✍️", "A trustworthy source has an <b>author who knows the topic</b>, like an expert, a museum or a university."], ["Why was it written?", "🎯", "If it is trying to <b>sell</b> something or make you angry, be careful."], ["Is it current and proven?", "📅", "Check the <b>date</b> and whether it shows <b>evidence and sources</b>. Compare with another good source."]]);

  const A14 = mk("Strong verbs", "💪", bq("Pick the <b>most exact, vivid</b> verb.", [
    "She ___ the door in anger.|slammed|closed|moved",
    "The thunder ___ across the valley.|rumbled|went|made noise",
    "He ___ the last cookie from the plate.|snatched|took|got",
    "The tired hikers ___ up the hill.|trudged|walked|went",
    "The kitten ___ at the string.|pounced|looked|went",
    "The wind ___ through the trees.|whistled|was|moved",
    "My brother ___ his sandwich in two bites.|devoured|ate|had",
    "The boy ___ with joy when he saw his puppy.|squealed|said|made"]),
    ["Weak verbs like went, got, was, had and made are fuzzy. Which choice paints a clearer picture?", "A strong verb shows how something happened (speed, sound, feeling) in one word, so you do not need extra adverbs.", "Example: <b>The bird ___ over the lake.</b> 'Soared' paints a clearer picture than 'went'. Now do yours."],
    [["Weak verbs", "😴", "Words like <b>go, get, make, have, be, say</b> are everywhere. They do not paint a picture."], ["Strong verbs", "💪", "<b>Trudged</b>, <b>snatched</b>, <b>whispered</b>, <b>sprinted</b> show exactly how something happened."], ["Trade up", "🔁", "Instead of 'walked slowly', try <b>shuffled</b>. Instead of 'said loudly', try <b>shouted</b>. One strong verb beats verb + adverb."]]);

  const A15 = mk("Meter and rhyme scheme", "🎵", [
    "What is the rhyme scheme?<br><br><b>I walk along the shore<br>The waves are cold and blue<br>I hear the seagulls roar<br>The sky is fresh and new</b>|ABAB|AABB|ABBA",
    "What is the rhyme scheme?<br><br><b>The frog sat on a log<br>Beside a foggy bog<br>The moon came up so bright<br>It filled the pond with light</b>|AABB|ABAB|ABBA",
    "What is the rhyme scheme?<br><br><b>Snow falls on the hill<br>The trees stand tall and white<br>The lake is calm and bright<br>The air is cold and still</b>|ABBA|ABAB|AABB",
    "What is the rhyme scheme?<br><br><b>The leaves are red and gold<br>They tumble to the ground<br>The wind begins to blow<br>And whirls them all around</b>|ABCB|ABAB|AABB",
    "What is the rhyme scheme?<br><br><b>The stars come out at night<br>And dance across the dome<br>They fill the dark with light<br>And guide the travelers home</b>|ABAB|AABB|ABBA",
    "What is the rhyme scheme?<br><br><b>We built a little boat<br>It learned to stay afloat<br>We sailed beyond the bay<br>And watched the end of day</b>|AABB|ABAB|ABBA",
    "A group of lines in a poem is a ___.|stanza|meter|refrain",
    "The pattern of strong and weak beats in a line is its ___.|meter|stanza|theme",
    "Which word has the stress pattern da-<b>DUM</b> (an iamb)?|beyond|garden|silver",
    "Which word has the stress pattern <b>DUM</b>-da (a trochee)?|garden|beyond|ahead"],
    ["For rhyme schemes, give the same letter to lines that end with the same sound. For meter, say the word aloud and feel which syllable is strongest.", "Go line by line: the first end sound is A. A new sound is B. If a later line matches an earlier sound, reuse that letter. For stress, tap the beat as you say the word.", "Example: <b>day / sky / play / high</b> ends A B A B (day-play, sky-high). Now do yours."],
    [["Rhyme scheme", "🔤", "Label each line's end sound with a letter. Same sound, same letter: <b>ABAB</b>, <b>AABB</b>, <b>ABBA</b>."], ["Stanza", "📜", "A <b>stanza</b> is a group of lines in a poem, like a paragraph in a story."], ["Meter", "🥁", "<b>Meter</b> is the beat. An <b>iamb</b> is da-DUM (be-YOND). A <b>trochee</b> is DUM-da (GAR-den)."]]);

  const A16 = mk("Parts of a play", "🎭", [
    "Words in a script that tell actors how to move or speak, often in italics or parentheses, are ___.|stage directions|dialogue|acts",
    "A long speech by one character to other characters is a ___.|monologue|soliloquy|aside",
    "When a character is alone on stage and speaks their thoughts aloud, it is a ___.|soliloquy|dialogue|scene",
    "A large section of a play, made of scenes, is an ___.|act|aside|prop",
    "A short remark to the audience that other characters do not hear is an ___.|aside|act|epilogue",
    "What the characters say to each other is the ___.|dialogue|stage directions|set",
    "Objects actors use, like a sword or a cup, are ___.|props|acts|scenes",
    "A part of an act set in one place and time is a ___.|scene|aside|cast",
    "A list of the characters at the start of a script is the ___.|cast of characters|epilogue|soliloquy"],
    ["Think about who is speaking, to whom, and whether it is words or instructions.", "Dialogue is spoken words. Stage directions are for the actors. A monologue is to other characters; a soliloquy is alone; an aside is a quick secret to the audience.", "Example: <b>(He walks to the window.)</b> is written for the actor, so it is a stage direction. Now do yours."],
    [["Reading a script", "📜", "<b>Dialogue</b> is what characters say. <b>Stage directions</b> tell actors what to do, often in (parentheses)."], ["Big pieces", "🏗️", "A play is split into <b>acts</b>, and each act into <b>scenes</b>. <b>Props</b> are objects on stage."], ["Special speeches", "🗣️", "<b>Monologue</b>: a long speech to others. <b>Soliloquy</b>: thoughts spoken alone. <b>Aside</b>: a quick remark to the audience."]]);

  const A17 = mk("Finding the subject", "🕵️", bq("Find the <b>subject</b> of the sentence.", [
    "There are three birds on the roof.|birds|There|roof",
    "Over the hill came a herd of sheep.|herd|sheep|hill",
    "Here comes the bus.|bus|Here|comes",
    "Down the road ran the little dog.|dog|road|ran",
    "Is your sister coming?|sister|Is|coming",
    "In the box were old photos.|photos|box|In",
    "Where is the key to the shed?|key|shed|Where",
    "Behind the door stood a tall man.|man|door|Behind"]),
    ["In these sentences the subject does not come first. Find the verb, then ask 'who or what is doing it or being described?'", "Put the sentence in the usual order (subject first). Words like there, here and where are never the subject, and a subject is not inside a phrase like 'in the box'.", "Example: <b>Under the bed hid a cat.</b> Reorder: A cat hid under the bed. The subject is 'cat'. Now do yours."],
    [["Not always first", "🕵️", "Usually the subject comes first, but not in sentences that start with <b>There, Here</b> or a place phrase."], ["Flip it", "🔃", "Rearrange: <b>In the barn lived a goat</b> becomes <b>A goat lived in the barn</b>. Now the subject is easy to spot."], ["Questions", "❓", "In a question, find the verb then ask who or what: <b>Is Jo ready?</b> becomes <b>Jo is ready</b>."]]);

  const A18 = mk("Commas in dates, places and letters", "✉️", [
    "In <b>July 4, 1776</b>, the comma separates...|the day and the year|the month and the day|the year and the month",
    "In <b>Austin, Texas</b>, the comma separates...|the city and the state|the state and the country|two cities",
    "Which mark follows the greeting in a friendly letter (Dear Grandma___)?|a comma|a semicolon|a period",
    "Which mark follows the closing in a friendly letter (Your friend___)?|a comma|a period|a colon",
    "In <b>We moved to Paris, France___ last year.</b> what goes after France?|a comma|nothing|a period",
    "<b>On May 5 2020 we moved.</b> Where are the missing commas?|after 5 and after 2020|after On|after we",
    "In <b>Denver, Colorado 80202</b>, is there a comma between the state and the ZIP code?|no|yes|only in letters",
    "Which date needs a comma between its parts?|May 5 2021|May 2021|Tuesday"],
    ["Commas separate the parts: weekday, month and day, year, city and state.", "In a full date like March 3, 2024, put a comma between day and year, and another after the year if the sentence continues. The same goes for a city and state in a sentence.", "Example: <b>On May 5, 2020, we moved to Tulsa, Oklahoma, for work.</b> Commas follow 5, 2020 and Tulsa and Oklahoma. Now do yours."],
    [["Dates", "📅", "Put a comma between the <b>day and year</b>: <b>June 6, 2019</b>. If the sentence goes on, add one after the year too."], ["Places", "📍", "Put a comma between <b>city and state or country</b>: <b>Miami, Florida</b>. In a sentence, add a comma after the state too."], ["Letters", "✉️", "A friendly letter's greeting and closing take commas: <b>Dear Sam,</b> and <b>Your friend,</b>."]]);

  const L16 = [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18];

  // =============== LEVEL 17 ===============
  const B1 = mk("Conditional sentences", "🔀", [
    "If it ___ tomorrow, we will stay home.|rains|rained|would rain",
    "If I had a million dollars, I ___ buy a boat.|would|will|am going to",
    "If I had studied, I ___ passed the test.|would have|would|will have",
    "If you heat ice, it ___.|melts|would melt|melted",
    "If we leave now, we ___ be on time.|will|would|would have",
    "If she had known, she ___ helped us.|would have|will have|would",
    "Unless you hurry, you ___ miss the bus.|will|would have|are",
    "If I were you, I ___ say sorry.|would|will|did"],
    ["Decide whether the 'if' part is a fact, a real possibility, an imaginary present, or an imaginary past.", "Real future: if + present, will. Imaginary now: if + past, would. Imaginary past: if + had + verb, would have. General facts: if + present, present.", "Example: <b>If it snows, we ___ build a snowman.</b> A real possibility, so 'will'. Now do yours."],
    [["If this, then that", "🔀", "A <b>conditional</b> sentence has an <b>if</b> part (the condition) and a result part."], ["Real and imaginary", "💭", "<b>Real</b>: If it rains, we <b>will</b> stay in. <b>Imaginary now</b>: If I had wings, I <b>would</b> fly."], ["Imaginary past", "⏪", "<b>If I had left earlier, I would have caught the bus.</b> Use <b>had + verb</b> in the if part and <b>would have + verb</b> in the result."]]);

  const B2 = mk("Progressive tenses", "⏳", bq("Name the tense.", [
    "She is reading.|present progressive|past progressive|future progressive",
    "They were playing.|past progressive|present progressive|future progressive",
    "We will be traveling.|future progressive|present progressive|past progressive",
    "He has been waiting for an hour.|present perfect progressive|present progressive|past perfect progressive",
    "I had been sleeping when you called.|past perfect progressive|present perfect progressive|past progressive",
    "The kids are building a fort.|present progressive|past progressive|future progressive",
    "It was snowing all night.|past progressive|present progressive|present perfect progressive",
    "She will be singing tonight.|future progressive|past progressive|present progressive"]),
    ["Find the helping verb and the -ing word. The helper's time (am/is/are, was/were, will be, have been, had been) tells the tense.", "Present: am/is/are + -ing. Past: was/were + -ing. Future: will be + -ing. Perfect progressive adds have/has/had been + -ing.", "Example: <b>They have been working.</b> 'Have been' + -ing is present perfect progressive. Now do yours."],
    [["Actions in progress", "⏳", "<b>Progressive</b> tenses show an action that is <b>happening over time</b>."], ["The simple ones", "🕒", "<b>is walking</b> (present), <b>was walking</b> (past), <b>will be walking</b> (future)."], ["Perfect progressive", "⌛", "<b>has been walking</b> (started before and still going), <b>had been walking</b> (before another past moment)."]]);

  const B3 = mk("Absolute phrases", "🌤️", bq("Find the <b>absolute phrase</b> (a noun + a describing word group that modifies the whole sentence).", [
    "The sun having set, we lit the fire.|The sun having set|we lit the fire|having set, we",
    "Arms crossed, he waited.|Arms crossed|he waited|crossed, he",
    "Weather permitting, we will picnic.|Weather permitting|we will picnic|will picnic",
    "The test over, the class cheered.|The test over|the class cheered|cheered",
    "She walked in, her hair dripping with rain.|her hair dripping with rain|She walked in|walked in",
    "He stood at the door, his hands full of bags.|his hands full of bags|He stood at the door|stood at the door",
    "The race complete, the runners rested.|The race complete|the runners rested|runners rested",
    "Eyes wide, the child watched the magician.|Eyes wide|the child watched|watched the magician"]),
    ["An absolute phrase has a noun and a describing word (often an -ing or -ed word), but no true verb of its own.", "It is set off with a comma and adds extra detail about the whole sentence. Find the group that has a noun plus a participle or adjective but cannot be a sentence by itself.", "Example: <b>Her work done, Ana went home.</b> 'Her work done' = noun (work) + participle (done). That is the absolute phrase. Now do yours."],
    [["Extra detail", "🌤️", "An <b>absolute phrase</b> adds a detail to a whole sentence."], ["Its parts", "🧩", "It has a <b>noun</b> plus a <b>participle or other modifier</b>: <b>The rain stopped</b> becomes <b>The rain having stopped</b>."], ["Commas", "✂️", "Set it off with commas: <b>Her bag packed, Jo left.</b> It cannot stand alone as a sentence."]]);

  const B4 = mk("Making inferences", "🧠", bq("What can you <b>infer</b> from these clues?", [
    "Maya grabbed her umbrella and put on her boots.|It is raining or about to rain.|It is very hot.|It is her birthday.",
    "Tim yawned, rubbed his eyes, and dragged himself to bed.|He is tired.|He is excited.|He is hungry.",
    "The crowd leaped up and cheered as the ball sailed over the fence.|Someone hit a home run.|The game was canceled.|It started to rain.",
    "Lena checked her watch again and again and tapped her foot.|She is impatient.|She is relaxed.|She is asleep.",
    "The dog's tail wagged as soon as the key turned in the door.|The dog is happy someone is home.|The dog is scared.|The dog is asleep.",
    "Sam's backpack was packed, and his passport lay on the table.|He is about to travel.|He is going to bed.|He lost his keys.",
    "The sign on the shop door read 'Back at 2:00.'|The owner is out right now.|The shop is closed forever.|The shop is open.",
    "Her hands shook as she stepped up to the microphone.|She feels nervous.|She feels bored.|She feels sleepy."]),
    ["The text does not say the answer straight out. What do the details tell you?", "An inference combines clues in the text with what you already know about the world. Ask: what would usually cause these actions?", "Example: <b>Ben put on a coat and hat and rubbed his hands.</b> Clues + what you know = it is cold. Now do yours."],
    [["Reading between the lines", "🧠", "An <b>inference</b> is a smart guess based on <b>clues</b> in the text."], ["Clues + what you know", "➕", "Text clues plus your own knowledge lead to the answer the writer does not say outright."], ["Check it", "✅", "A good inference has <b>evidence</b>. Ask: which words made me think that?"]]);

  const B5 = mk("Square brackets in quotes", "🔲", [
    "Original: 'He signed it.' You write: 'He [the mayor] signed it.' The brackets show...|words you added to explain|words the speaker said|a spelling mistake",
    "What does [sic] after a misspelled word in a quote mean?|the mistake was in the original|the writer of the essay made the mistake|the word is a name",
    "Which kind of brackets show your own added words inside a direct quote?|square brackets [ ]|parentheses ( )|curly braces { }",
    "Brackets [ ] are also called...|square brackets|curly braces|parentheses",
    "A quote says 'Thier dog barked.' To show the typo is the speaker's, add...|[sic]|[ ]|(oops)",
    "Original: 'The team won it.' You want to explain what 'it' is. What do you do?|put the added words in square brackets|put the added words in quotation marks|say nothing and change the quote",
    "[sic] comes from a Latin word meaning 'thus'. It tells readers...|I copied this exactly as written|I made this mistake|This word is a joke",
    "Should you put [sic] after your own spelling mistakes?|No, just fix them|Yes, always|Only in titles"],
    ["Think about who wrote the words inside the brackets: the speaker or you.", "Square brackets inside a quote mark words YOU added or changed so the quote makes sense. [sic] marks a mistake that was already in the original.", "Example: <b>“They [the explorers] found land.”</b> The writer added 'the explorers' to explain 'They'. Now do yours."],
    [["Your words inside a quote", "🔲", "<b>Square brackets [ ]</b> mark words YOU add to a quote to make its meaning clear."], ["Example", "✍️", "<b>“She [the principal] smiled.”</b> The original said only 'She'."], ["[sic]", "📌", "<b>[sic]</b> means 'exactly as written'. Use it after a mistake in someone else's words so readers know you did not make it."]]);

  const B6 = mk("Words you can't compare", "🎯", [
    "Which is correct?|This snowflake is unique.|This snowflake is very unique.|This snowflake is most unique.",
    "The glass is completely ___.|empty|emptier|more empty",
    "Her score was ___: 100 out of 100.|perfect|most perfect|more perfect",
    "The battery is totally ___.|dead|deader|more dead",
    "Which word can <b>not</b> sensibly be compared with 'more' or 'most'?|dead|tall|kind",
    "Which word <b>can</b> be compared (taller, tallest)?|tall|unique|complete",
    "Fix it: <b>It was the most perfect day.</b>|It was a perfect day.|It was a perfecter day.|It was the most perfectest day.",
    "Which is correct?|The room is completely empty.|The room is more empty.|The room is emptiest of all."],
    ["Some words already mean 'all the way'. Can something be more than all the way?", "Absolute adjectives (unique, perfect, empty, dead, complete) are already at the top, so we do not add more, most, very or -er.", "Example: <b>The bag is very full</b> is fine, but <b>The test was the most perfect</b> sounds off because perfect cannot go higher. Now do yours."],
    [["Already at the top", "🎯", "<b>Absolute adjectives</b> name a limit: <b>unique, perfect, empty, dead, complete, final</b>."], ["No more or most", "🚫", "Things are not 'more perfect' or 'very unique'. They either are, or they are not."], ["Words that compare", "📏", "Words like <b>tall, kind, quick</b> can change: <b>taller, kindest, quicker</b>."]]);

  const B7 = mk("-able/-ible and -ance/-ence", "✍️", [
    "Which is spelled correctly?|comfortable|comfortible|comfortabel",
    "Which is spelled correctly?|visible|visable|visibel",
    "Which is spelled correctly?|possible|possable|posible",
    "Which is spelled correctly?|reliable|reliible|relyable",
    "Which is spelled correctly?|flexible|flexable|flexibel",
    "Which is spelled correctly?|independent|independant|indepandent",
    "Which is spelled correctly?|patience|patiance|pationce",
    "Which is spelled correctly?|performance|performence|performanse",
    "Which is spelled correctly?|difference|differance|diffrence",
    "Which is spelled correctly?|incredible|incredable|incredibel"],
    ["The ending sounds the same, but the spelling differs. Think about the whole word.", "-able usually follows a whole word you can say alone (comfort, enjoy, rely). -ible usually follows a root that is not a word alone (vis-, poss-, flex-). For -ance and -ence, some words must simply be learned.", "Example: <b>enjoy</b> is a whole word, so <b>enjoyable</b>. <b>vis</b> is not a word, so <b>visible</b>. Now do yours."],
    [["Same sound, different spelling", "👂", "<b>-able</b> and <b>-ible</b> sound alike. <b>-ance</b> and <b>-ence</b> do too."], ["The -able clue", "🔑", "If you can take off the ending and still have a word (<b>comfort</b>, <b>rely</b>), it is usually <b>-able</b>."], ["The -ible clue", "🧩", "If what is left is not a word (<b>vis</b>, <b>poss</b>), it is usually <b>-ible</b>. Learn tricky ones: <b>patience</b>, <b>difference</b>, <b>independent</b>."]]);

  const B8 = mk("-tion, -sion, -cian and ie/ei", "🔤", bq("Choose the correct spelling.", [
    "A person who does magic tricks is a magi___.|magician|magission|magition",
    "She made a ___ about the trip.|decision|decition|decicion",
    "We saw an art ___ at the museum.|exhibition|exhibision|exhibishun",
    "A person who plays music is a ___.|musician|musision|musition",
    "At the end of the essay is the ___.|conclusion|conclution|conclushun",
    "She wanted more ___ about the trip.|information|informasion|informacion",
    "To get something is to ___ it.|receive|recieve|receeve",
    "To think something is true is to ___ it.|believe|beleive|beleeve",
    "The one who lives next door is your ___.|neighbor|nieghbor|neighbur",
    "Something strange is ___.|weird|wierd|wiurd",
    "A place outside your country is ___.|foreign|foriegn|forrain",
    "A roof over your head, high up, is the ___.|ceiling|cieling|seeling"]),
    ["Say the word slowly and picture how it looks. Which letters make the sound?", "Use -cian for a person with a skill (musician, magician). Use -tion after most letters and -sion after l, n, r, s. For ie/ei: i before e, except after c, or when it sounds like 'ay'. Weird and foreign are exceptions.", "Example: <b>decis___</b> Check the rule: -sion for a word like decide. Also <b>c + ei</b> in receive. Now do yours."],
    [["Endings that sound like 'shun'", "🔤", "<b>-tion</b> (information), <b>-sion</b> (decision), <b>-cian</b> (musician)."], ["Who does it?", "🧑‍🎨", "A person with a skill usually takes <b>-cian</b>: <b>magician</b>, <b>electrician</b>."], ["ie or ei?", "📏", "<b>i before e, except after c</b>: believe, but receive, ceiling. Or when it says 'ay': neighbor. Exceptions: weird, foreign."]]);

  const B9 = mk("Eponyms and acronyms", "🏷️", [
    "A word named after a person is an ___.|eponym|acronym|palindrome",
    "NASA is formed from first letters and said as a word. It is an ___.|acronym|eponym|initialism",
    "FBI is said letter by letter. It is an ___.|initialism|acronym|eponym",
    "The word 'sandwich' comes from the Earl of Sandwich. It is an ___.|eponym|acronym|initialism",
    "SCUBA stands for Self-Contained Underwater Breathing Apparatus. It is an ___.|acronym|eponym|initialism",
    "DVD is said letter by letter. It is an ___.|initialism|acronym|eponym",
    "Braille is named after Louis Braille. What kind of word is it?|eponym|acronym|abbreviation",
    "Which is an acronym (said as a word)?|laser|USA|TV",
    "Which is an eponym?|diesel|window|rocket",
    "Which is an initialism (said letter by letter)?|FBI|NASA|radar"],
    ["Ask: is the word named after a person, or made from first letters? If from letters, is it said as a word or one letter at a time?", "Eponym = named for a person. Acronym = letters pronounced as a word (NASA). Initialism = letters pronounced one by one (FBI).", "Example: <b>UNICEF</b> is said 'YOU-ni-sef', as a word, so it is an acronym. <b>USA</b> is said U-S-A, so it is an initialism. Now do yours."],
    [["Words from names", "🏷️", "An <b>eponym</b> is a word named after a person: <b>sandwich</b>, <b>diesel</b>, <b>Braille</b>."], ["Said as a word", "🗣️", "An <b>acronym</b> is made from first letters and said as a word: <b>NASA</b>, <b>laser</b>, <b>scuba</b>."], ["Said letter by letter", "🔠", "An <b>initialism</b> is said one letter at a time: <b>FBI</b>, <b>DVD</b>, <b>USA</b>."]]);

  const B10 = mk("Same spelling, new sound", "🔊", [
    "'close' in <b>Please close the door</b> rhymes with...|nose|dose|boss",
    "'close' in <b>Our house is close to the park</b> rhymes with...|dose|nose|cows",
    "'tear' in <b>A tear ran down her cheek</b> rhymes with...|ear|air|bar",
    "'tear' in <b>Don't tear the paper</b> rhymes with...|air|ear|ore",
    "'wind' in <b>The wind blew hard</b> rhymes with...|pinned|find|mind",
    "'wind' in <b>Wind the clock</b> rhymes with...|find|pinned|bend",
    "'lead' in <b>Lead the way</b> rhymes with...|feed|bed|said",
    "'lead' for the heavy metal rhymes with...|bed|feed|bead"],
    ["Read the whole sentence first. The other words tell you which meaning, and which sound, is right.", "Some words are spelled the same but sound different and mean different things. These are called heteronyms. Use the context to choose the meaning, then say it aloud.", "Example: <b>The bass was big</b> (a fish, rhymes with class) vs <b>The bass was loud</b> (music, rhymes with place). Now do yours."],
    [["Heteronyms", "🔊", "Words spelled the <b>same</b> but said <b>differently</b>, with different meanings."], ["Examples", "📖", "<b>tear</b> (a drop from the eye) vs <b>tear</b> (to rip). <b>wind</b> (moving air) vs <b>wind</b> (to turn)."], ["Context is the key", "🔍", "Look at the other words in the sentence. They tell you which meaning, and which sound, the writer wants."]]);

  const B11 = mk("Proverbs and sayings", "📜", [
    "'A stitch in time saves nine.' means...|fix small problems early|sewing is hard|nine is lucky",
    "'Don't count your chickens before they hatch.' means...|don't count on something before it happens|chickens are hard to count|eggs break easily",
    "'Many hands make light work.' means...|teamwork makes jobs easier|gloves are useful|work is easy when hands are clean",
    "'The early bird catches the worm.' means...|people who start early get the best chance|birds like worms|mornings are cold",
    "'Don't judge a book by its cover.' means...|looks do not show what is inside|read covers first|books should be covered",
    "'Actions speak louder than words.' means...|what you do matters more than what you say|loud people are right|talking is quiet",
    "'A rolling stone gathers no moss.' means...|someone always on the move does not settle in one place|moss likes stones|stones are heavy",
    "'Better late than never.' means...|doing it late is better than not at all|never be late|late is always bad",
    "'Look before you leap.' means...|think before you act|jumping is fun|never jump",
    "'Rome wasn't built in a day.' means...|big things take time|Rome was small|builders are slow"],
    ["A proverb is not about the objects it names. What lesson about life could it teach?", "Take away the animals or objects and ask: what advice is hiding underneath?", "Example: <b>'Too many cooks spoil the broth.'</b> is not about soup, it means too many people in charge can spoil the job. Now do yours."],
    [["Short wisdom", "📜", "A <b>proverb</b> is a short, well-known saying that gives <b>advice or a truth</b>."], ["Not literal", "🪄", "<b>Don't count your chickens before they hatch</b> is not about chickens. It is about waiting for results."], ["Find the lesson", "💡", "Ask: what real-life situation does this fit? That is its meaning."]]);

  const B12 = mk("Allusions", "🏺", [
    "'Her Achilles' heel was shyness.' An Achilles' heel is...|a hidden weakness|a strength|a shoe",
    "'Opening that file was a Pandora's box.' This means...|it caused many unexpected troubles|it gave a gift|it was a jewelry case",
    "'He has the Midas touch.' This means...|everything he tries turns out well, especially for money|he is cold|he loves gold coins",
    "A small team beating a giant champion is called a 'David and Goliath' match. It means...|a small underdog against a big strong rival|a game with two giants|a quiet game",
    "Calling someone a 'Scrooge' comes from A Christmas Carol and means...|a stingy person|a kind person|a sleepy person",
    "'This beach is a real Garden of Eden.' It means...|a perfect, beautiful place|a dull place|a dangerous place",
    "'The gift was a Trojan horse.' It means...|something harmless-looking that hides trouble|a toy|a fast animal",
    "Calling a very strong person 'a Hercules' alludes to...|a hero of Greek myth|a kind of tree|a city",
    "What is an <b>allusion</b>?|a quick reference to a well-known story, person or event|a long speech|a spelling mistake"],
    ["An allusion points to a famous story or person. Think about what that story is known for.", "The writer counts on you knowing the story. Recall the famous part (the weakness, the troubles, the touch of gold) to get the meaning.", "Example: <b>'Calling it a Herculean task'</b> alludes to the hero Hercules, famous for hard labors. It means a very hard job. Now do yours."],
    [["A hint at a famous story", "🏺", "An <b>allusion</b> is a short reference to a <b>well-known</b> story, person, place or event."], ["Why use them", "✨", "They pack a lot of meaning into a few words: <b>Pandora's box</b> says 'opening this may cause many troubles'."], ["Know the source", "📚", "Reading myths, fables and classic stories helps you catch allusions: <b>Achilles' heel</b>, <b>Midas touch</b>, <b>Scrooge</b>."]]);

  const B13 = mk("Satire and parody", "🃏", [
    "A writer jokes that school lunches are made by 'robot chefs who never taste anything' to point out how bland they are. This is...|satire|a biography|a legend",
    "A silly movie that copies a famous superhero film to make fun of it is a ___.|parody|biography|diary",
    "Satire uses humor to ___.|point out flaws in people or society|list facts|give directions",
    "A cartoon shows leaders arguing endlessly while a pile of work grows. It is probably...|satire|a fairy tale|a map",
    "A song that copies a hit song but changes the words to be about homework is a ___.|parody|elegy|sonnet",
    "What is the main goal of a parody?|to imitate something in a funny way|to teach history|to scare people",
    "Which is satire?|A funny story making fun of people who never look up from their phones|A recipe for soup|A weather report",
    "Satire is different from plain teasing because it often...|makes a point about something that should change|is only mean|is always facts"],
    ["Is the writing just being silly, or is it making fun of something real to make a point?", "Parody copies the style of one specific work for laughs. Satire uses humor, exaggeration or irony to criticize a habit, person or society.", "Example: <b>A cartoon of a town where the mayor spends the whole budget on hats</b> exaggerates to criticize wasteful spending. That is satire. Now do yours."],
    [["Laughing with a point", "🃏", "<b>Satire</b> uses <b>humor and exaggeration</b> to point out something foolish or wrong."], ["Copycat comedy", "🎭", "A <b>parody</b> imitates a specific song, film or book in a funny way."], ["Spot the difference", "🔎", "Parody copies a style. Satire has a <b>message</b> about how things could be better."]]);

  const B14 = mk("Fable, parable, allegory", "🦊", [
    "A short story with talking animals that ends with a moral is a ___.|fable|allegory|biography",
    "A story where characters and events stand for bigger ideas (like greed or courage) throughout is an ___.|allegory|fable|diary",
    "A short, simple story that teaches a lesson about life, usually with people, is a ___.|parable|myth|riddle",
    "'The Tortoise and the Hare' is a ___.|fable|parable|autobiography",
    "The lesson at the end of a fable is the ___.|moral|plot|setting",
    "A story that explains how something began, with gods or heroes, is a ___.|myth|fable|parable",
    "Which has talking animals and a moral?|The Ant and the Grasshopper|A weather report|A map",
    "Paul Bunyan, whose axe cuts down a forest in one swing, is from a ___.|tall tale|fable|parable"],
    ["Think about who is in the story (animals, people, gods) and what the story is for.", "Fable = animals + moral. Parable = short lesson with people. Allegory = whole story is a symbol for bigger ideas. Myth = explains the world with gods. Tall tale = wild exaggeration.", "Example: <b>A fox and some sour grapes that teaches how people sneer at what they can't have</b> is a fable. Now do yours."],
    [["Stories with lessons", "🦊", "A <b>fable</b> has talking animals and a <b>moral</b>. A <b>parable</b> is a short lesson story about people."], ["Stories that stand for ideas", "🔑", "In an <b>allegory</b>, characters and events stand for bigger ideas, like courage, greed or kindness."], ["Other old tales", "🏔️", "A <b>myth</b> explains how things began. A <b>tall tale</b> wildly exaggerates a hero's deeds."]]);

  const B15 = mk("Motifs", "🔁", [
    "A repeating image, sound or idea that supports a theme is a ___.|motif|plot|title",
    "A story keeps showing storms before bad events. The storms are a ___.|motif|character|climax",
    "How is a motif different from a theme?|a motif repeats; a theme is the big message|they are exactly the same|a theme is only a word",
    "In a tale, doors keep opening at turning points. The repeated door is a ___.|motif|narrator|rhyme",
    "Which could be a motif?|repeated images of light and shadow|one sentence|the title page",
    "A motif of birds flying free could support the theme of ___.|freedom|taxes|homework",
    "Motifs help readers ___.|notice and understand a deeper message|skip chapters|count pages",
    "A song keeps repeating the sound of a ringing bell. The bell is a ___.|motif|stanza|plot"],
    ["Ask: does this thing keep coming back? A motif repeats.", "A motif is smaller and repeats (an image or sound). A theme is the whole message. Repeated things hint at the theme.", "Example: <b>A story keeps mentioning clocks stopping.</b> The clocks are a motif that may support a theme about time. Now do yours."],
    [["Again and again", "🔁", "A <b>motif</b> is an image, sound, object or idea that <b>repeats</b> in a story or poem."], ["Motif and theme", "🧵", "The motif is the thread; the <b>theme</b> is the message it helps show."], ["Notice patterns", "🔎", "When something shows up three or four times, ask: <b>why does the author keep returning to it?</b>"]]);

  const B16 = mk("Narrators and point of view", "🎙️", [
    "'I knew the answer but kept quiet.' The point of view is...|first person|third person limited|omniscient",
    "'Lena felt nervous. She did not know what Max was thinking.' We only know Lena's thoughts. This is...|third person limited|first person|omniscient",
    "'Lena felt nervous. Max, meanwhile, was secretly proud of her, and the teacher worried about the clock.' This is...|omniscient|first person|third person limited",
    "A narrator who tells the story but cannot be fully trusted is ___.|unreliable|omniscient|limited",
    "A narrator who knows everything about every character is ___.|omniscient|limited|first person",
    "'I'm the best player ever; the other team just cheated,' says Zed, but the scoreboard says he lost 10-0. This narrator is...|unreliable|omniscient|third person limited",
    "Which words signal first person?|I, me, my|he, she, they|you, your",
    "A story with 'he' and 'she' that stays inside one character's head is...|third person limited|first person|omniscient"],
    ["Ask who is telling the story, and how much does the narrator know?", "First person uses I/me. Third person limited follows one character's thoughts. Omniscient sees into many minds. Unreliable means the facts do not match what the narrator says.", "Example: <b>'She hoped no one would notice.'</b> We know only her feelings, so it is third person limited. Now do yours."],
    [["Who is telling it?", "🎙️", "<b>First person</b> uses <b>I</b>. <b>Third person</b> uses <b>he, she, they</b>."], ["How much do they know?", "🧠", "<b>Limited</b>: only one character's thoughts. <b>Omniscient</b>: all characters' thoughts."], ["Can you trust them?", "🤔", "An <b>unreliable narrator</b> may be mistaken, biased or hiding something. Compare what they say with the clues."]]);

  const B17 = mk("Compare and contrast writing", "⚖️", [
    "Writing all about cats first, then all about dogs, is the ___ method.|block|point-by-point|chronological",
    "Discussing food for both, then size for both, then habits for both is the ___ method.|point-by-point|block|chronological",
    "Which word signals a <b>difference</b>?|whereas|similarly|likewise",
    "Which word signals a <b>likeness</b>?|similarly|however|on the other hand",
    "A Venn diagram's overlapping middle shows what is...|the same in both|different in each|only true of one",
    "Which thesis suits a compare-and-contrast essay?|Though cats and dogs are both popular pets, they differ in care needs and independence.|Cats are fluffy.|I have a dog.",
    "Which word signals a <b>difference</b>?|but|also|too",
    "'Unlike Mars, Earth has liquid water.' The word 'unlike' shows...|a difference|a likeness|a cause",
    "'Both frogs and toads are amphibians.' The word 'both' shows...|a likeness|a difference|an effect"],
    ["Decide if the question is about how to organize the essay, or about words that show a likeness or difference.", "Block = all of subject A, then all of B. Point-by-point = one feature at a time for both. Likeness words: both, similarly, likewise. Difference words: but, whereas, unlike, however.", "Example: <b>'Apples are sweet, whereas lemons are sour.'</b> 'Whereas' shows a difference. Now do yours."],
    [["Two ways to organize", "🗂️", "<b>Block</b>: tell everything about A, then everything about B. <b>Point-by-point</b>: compare A and B on one feature at a time."], ["Likeness words", "🤝", "<b>both, similarly, likewise, also, like</b>"], ["Difference words", "↔️", "<b>but, however, unlike, whereas, on the other hand</b>"]]);

  const B18 = mk("Research questions and keywords", "🔬", [
    "Which is the best <b>research question</b>?|How do honeybees communicate where flowers are?|Bees|Do bees exist?",
    "The topic 'Animals' is too broad. Which narrows it best?|How do arctic foxes survive winter?|Animals of Earth|All animals",
    "Which keywords are best for finding how volcanoes form?|volcano formation tectonic plates|volcanoes are cool|I want volcano stuff",
    "Which question can be answered with only 'yes' or 'no' (weak for research)?|Is the moon made of rock?|How did the moon form?|Why does the moon change shape?",
    "Which keyword is most specific?|monarch butterfly migration|insects|nature",
    "Which topic is too narrow for a two-page report?|the color of one bee on one day|honeybees' life cycle|why bees matter",
    "Questions that begin with 'how' or 'why' usually need...|more thinking and research|a yes or no|no research",
    "After you collect facts, you should note the source and write the facts in...|your own words|someone else's exact words|any words",
    "Which question is best for a report on volcanoes?|What causes some volcanoes to erupt more powerfully than others?|Volcanoes|Are volcanoes red?"],
    ["A good research question cannot be answered by one word, but it is not so huge you could never finish.", "Open questions (how, why, what causes) are better than yes/no ones. Specific keywords (names, places, processes) work better than one big word.", "Example: <b>Weather</b> is too broad. <b>How do hurricanes form over warm oceans?</b> is just right. Now do yours."],
    [["Start with a question", "❓", "A good <b>research question</b> begins with <b>how</b> or <b>why</b> and is not answered by yes or no."], ["Not too big, not too small", "📏", "<b>Animals</b> is too broad. <b>The color of one bee</b> is too narrow. Aim for the middle."], ["Pick the best keywords", "🔑", "Choose <b>specific</b> words: names, places, processes. <b>monarch butterfly migration</b> beats <b>insects</b>."]]);

  const L17 = [B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17, B18];

  // =============== LEVEL 18 ===============
  const C1 = mk("Grammar rules or myths?", "🧐", bq("Is this a <b>real rule</b> or a <b>myth</b>?", [
    "You can never start a sentence with 'But'.|myth|real rule",
    "You must never end a sentence with a preposition.|myth|real rule",
    "You must never split an infinitive (to boldly go).|myth|real rule",
    "A sentence needs a subject and a verb to be complete.|real rule|myth",
    "A comma alone cannot join two independent clauses.|real rule|myth",
    "A pronoun must match the noun it replaces in number.|real rule|myth",
    "A subject and its verb must agree in number.|real rule|myth",
    "You can never use 'and' to start a sentence.|myth|real rule"]),
    ["Ask: does breaking this 'rule' ever cause confusion or an error, or is it only a style preference?", "Real rules prevent errors (agreement, complete sentences, comma splices). Myths are old style preferences that good writers often ignore on purpose.", "Example: <b>'Never use I in an essay.'</b> It is a style choice, not a grammar rule, so it is a myth. Now do yours."],
    [["Rules you can trust", "✅", "<b>Real rules</b> keep writing clear: subjects and verbs agree, sentences are complete, and commas do not splice sentences."], ["Old myths", "🧐", "Many teachers once said: never start with <b>And</b> or <b>But</b>, never end with a <b>preposition</b>, never <b>split an infinitive</b>. Good writers do all three."], ["Think for yourself", "💭", "Ask whether a sentence is clear and fits its audience, not just whether an old saying allows it."]]);

  const C2 = mk("Periodic and cumulative sentences", "🧶", [
    "Which is a <b>periodic</b> sentence (main idea saved for the end)?|After hours of climbing through snow and wind, the hikers reached the top.|The hikers reached the top after hours of climbing through snow and wind.|The hikers reached the top.",
    "Which is a <b>periodic</b> sentence?|Despite the rain, the cold, and the late hour, the crowd stayed to cheer.|The crowd stayed to cheer despite the rain, the cold, and the late hour.|The crowd stayed.",
    "Which is a <b>periodic</b> sentence?|Through dust and dark and years of silence, the old piano still played.|The old piano still played through dust and dark and years of silence.|The old piano played.",
    "Which is a <b>periodic</b> sentence?|With a shaky hand and a racing heart, she opened the letter.|She opened the letter with a shaky hand and a racing heart.|She opened it.",
    "Which is a <b>cumulative</b> sentence (main clause first, details after)?|The dog ran across the yard, tail wagging, ears flapping, tongue out.|Tail wagging, ears flapping, tongue out, the dog ran across the yard.|The dog ran.",
    "Which is a <b>cumulative</b> sentence?|We walked home slowly, kicking leaves, laughing at nothing, and counting the stars.|Kicking leaves, laughing at nothing, and counting the stars, we walked home slowly.|We walked.",
    "Which is a <b>cumulative</b> sentence?|The baker worked through the night, kneading, shaping, and baking until dawn.|Kneading, shaping, and baking until dawn, the baker worked through the night.|The baker worked.",
    "Which is a <b>cumulative</b> sentence?|The storm rolled in, dark and loud, shaking windows, flooding the street.|Dark and loud, shaking windows, flooding the street, the storm rolled in.|The storm rolled in."],
    ["Find the main clause (the part that could be a sentence alone). Does it come early or last?", "Cumulative: main clause first, then details added on. Periodic: details first, and the main clause (the point) arrives at the very end.", "Example: <b>Through mud and rain, the runners finished.</b> The main idea comes last, so it is periodic. Now do yours."],
    [["Where is the main idea?", "🧶", "In a <b>cumulative</b> sentence the main clause comes <b>first</b>, then extra details pile on."], ["Saving it for last", "⏳", "In a <b>periodic</b> sentence the details come first and the <b>main clause waits until the end</b>, building suspense."], ["Choose on purpose", "🎯", "Cumulative feels natural and flowing. Periodic feels dramatic. Mix them for good rhythm."]]);

  const C3 = mk("The rhetorical situation", "🎤", [
    "A student writes a speech to convince the principal to add a garden. Who is the <b>audience</b>?|the principal|the student|the garden",
    "A student writes a speech to convince the principal to add a garden. What is the <b>purpose</b>?|to persuade|to entertain|to describe",
    "Which tone fits a note to a close friend?|casual and friendly|stiff and formal|angry and rude",
    "Which opening is best for a letter to a city mayor?|Dear Mayor Lopez, I respectfully request a new crosswalk.|Yo Mayor, we need a crosswalk.|Hey boss, crosswalk please.",
    "In a letter you sign, who is the <b>speaker</b> (writer)?|you|the reader|the mail carrier",
    "The time, place and event that shape a message are its ___.|context|plot|rhyme",
    "A text meant to teach young children about recycling should use...|simple words and clear examples|complicated terms|inside jokes for adults",
    "When you write the same message for different audiences, what should change most?|tone and word choice|the true facts|the alphabet"],
    ["Think about who is speaking, who is listening, and what the message is meant to do.", "The rhetorical situation has a speaker, an audience, a purpose and a context. Good writers adjust their tone and words to fit all four.", "Example: <b>A thank-you note to a grandparent</b> has a warm tone; <b>a job application</b> needs a formal one. Same writer, different audience. Now do yours."],
    [["Four parts", "🎤", "<b>Speaker</b> (who writes), <b>audience</b> (who reads), <b>purpose</b> (why), <b>context</b> (when and where)."], ["Match the audience", "🎯", "A letter to a friend and a letter to a mayor need different <b>tone</b> and <b>word choice</b>."], ["Keep the facts true", "📏", "Style can change for different readers. The <b>facts</b> should not."]]);

  const C4 = mk("Reading charts and graphs", "📊", [
    "A bar graph shows books read: Mia 8, Leo 12, Zoe 5. Who read the most?|Leo|Mia|Zoe",
    "A line graph shows 10 degrees at 8 a.m., 15 at 10 a.m., and 22 at noon. What is the trend?|rising|falling|steady",
    "A pie chart shows pizza 50%, tacos 30% and salad 20%. Which is the smallest slice?|salad|tacos|pizza",
    "A bar graph shows 6 cats, 9 dogs and 3 fish. How many more dogs than cats?|3|6|9",
    "On a graph titled 'Rainfall by Month', the bottom axis lists months and the side axis shows inches. The bottom axis shows...|months|inches|colors",
    "A graph's legend (key) tells you...|what the colors or symbols mean|who drew it|the date",
    "A table shows goals: Mon 2, Tue 4, Wed 3. What is the total?|9|8|7",
    "A graph shows ice cream sales falling in winter and rising in summer. Which conclusion fits?|sales depend on the season|ice cream is bad|people dislike winter",
    "The slices of a pie chart add up to...|100%|50%|10%"],
    ["Read the title and labels first. What exactly does the graph measure?", "Look at the axes, the key, and the numbers. For comparisons, find the biggest and smallest. For a trend, see which direction it goes over time.", "Example: <b>Bar graph: apples 4, pears 7.</b> The pear bar is taller, so pears are more. 7 minus 4 is 3 more. Now do yours."],
    [["Title and labels", "🏷️", "Always start with the <b>title</b>, the <b>axes</b> and the <b>key</b>. They tell you what the picture means."], ["Kinds of graphs", "📈", "<b>Bar</b>: compares amounts. <b>Line</b>: shows change over time. <b>Pie</b>: shows parts of a whole (100%)."], ["Draw a conclusion", "🧠", "Use the data to say what it shows, but stay with what the numbers really prove."]]);

  const C5 = mk("Comparing like with like", "⚖️", [
    "Which is correct?|The weather in Maine is colder than the weather in Texas.|The weather in Maine is colder than Texas.",
    "Which is correct?|Her voice is stronger than her sister's.|Her voice is stronger than her sister.",
    "Which is correct?|The population of Canada is smaller than that of China.|The population of Canada is smaller than China.",
    "Which is correct?|My backpack is heavier than Tom's.|My backpack is heavier than Tom.",
    "Which is correct?|A cheetah's speed is greater than a horse's.|A cheetah's speed is greater than a horse.",
    "Which is correct?|The ideas in this essay are stronger than those in that one.|The ideas in this essay are stronger than that one.",
    "Which is correct?|The streets in Paris are older than those in New York.|The streets in Paris are older than New York.",
    "Which is correct?|The cookies at Bo's shop are fresher than the cookies at the mall.|The cookies at Bo's shop are fresher than the mall."],
    ["Check what is being compared. Are both sides the same kind of thing?", "Compare like with like: a speed with a speed, a voice with a voice. Fix a faulty comparison by adding a word such as 'that of', 'those in', or an apostrophe-s to show the second thing.", "Example: <b>Her hair is longer than Mia.</b> Hair is being compared with a person. Fix: <b>longer than Mia's.</b> Now do yours."],
    [["Fair comparisons", "⚖️", "When you compare, both sides should be the <b>same kind of thing</b>."], ["A faulty one", "🙃", "<b>The weather in Maine is colder than Texas</b> compares weather with a state. It should be <b>than the weather in Texas</b>."], ["Easy fixes", "🔧", "Add <b>that of</b>, <b>those in</b>, or <b>'s</b>: colder than <b>that of Texas</b>, taller than <b>Sam's</b>."]]);

  const C6 = mk("Fixing mixed-up sentences", "🔧", [
    "Which is correct?|A hurricane is a storm with strong winds and heavy rain.|A hurricane is when a storm has strong winds.|A hurricane is where a storm has strong winds.",
    "Which is correct?|The reason I was late is that the bus broke down.|The reason I was late is because the bus broke down.|The reason I was late, because the bus broke down.",
    "Which is correct?|Courage is the ability to act despite fear.|Courage is when you act despite fear.|Courage is where you act despite fear.",
    "Which is correct?|A symphony is a long piece of music for an orchestra.|A symphony is when an orchestra plays long music.|A symphony is where an orchestra plays.",
    "Which is correct?|Photosynthesis is the process by which plants make food from light.|Photosynthesis is when plants make food from light.|Photosynthesis is where plants make food.",
    "Which is correct?|Because I was tired, I forgot my keys.|Because I was tired is why I forgot my keys.|Being because tired, I forgot my keys.",
    "Which is correct?|An introvert is a person who prefers quiet time.|An introvert is when a person prefers quiet time.|An introvert is where a person prefers quiet.",
    "Which is correct?|The reason for the delay was a storm.|The reason for the delay was because of a storm.|The reason for the delay, a storm because."],
    ["Check whether the sentence stays on one track: does the end fit the beginning?", "Defining with 'is when' or 'is where' mixes up a thing with a time or place. Use 'is a...' or 'is the...'. 'The reason is because' repeats itself; use 'the reason is that'.", "Example: <b>Democracy is when people vote.</b> Better: <b>Democracy is a system in which people vote.</b> Now do yours."],
    [["A thing is not a time", "🧩", "<b>A tornado is when...</b> mixes up a thing and a time. Say <b>A tornado is a spinning column of air</b>."], ["Reason is that", "💬", "<b>The reason is because</b> says the same thing twice. Use <b>The reason is that...</b>."], ["Stay on one track", "🛤️", "Start a sentence one way, finish it the same way. Read it aloud to hear mix-ups."]]);

  const C7 = mk("Finding the central idea", "🎯", [
    "<b>Bees pollinate flowers. Bees make honey. Bees help farms grow fruit. Without bees, many foods would disappear.</b><br><br>What is the central idea?|Bees are important to people and nature.|Bees make honey.|Flowers are pretty.",
    "<b>Trees give shade. They clean the air. Their roots hold soil in place. Birds nest in their branches.</b><br><br>What is the central idea?|Trees help the environment and living things.|Trees give shade.|Birds build nests.",
    "<b>Libraries lend books for free. They offer quiet places to study. Many run story times and classes.</b><br><br>What is the central idea?|Libraries serve communities in many ways.|Libraries have story times.|Books are free.",
    "<b>Sleep helps your brain store memories. It lets your body repair itself. Tired people struggle to focus.</b><br><br>What is the central idea?|Sleep is vital for health and learning.|Tired people struggle.|Memories are stored.",
    "<b>Sharks eat sick fish and keep fish numbers in balance. Healthy shark numbers help coral reefs. Without them, food webs break down.</b><br><br>What is the central idea?|Sharks keep ocean life healthy.|Sharks eat fish.|Coral reefs are colorful.",
    "<b>Recycling cuts trash. It saves energy. It protects forests by reusing paper.</b><br><br>What is the central idea?|Recycling helps the planet.|Recycling saves paper.|Forests are big.",
    "<b>Reading aloud builds vocabulary. It helps kids listen well. It grows a love of books.</b><br><br>What is the central idea?|Reading aloud benefits children.|Kids listen.|Books are fun.",
    "<b>On a soccer team, players pass to each other. Choir singers blend their voices. Builders share tools.</b><br><br>What is the central idea?|Working together achieves more.|Soccer is fun.|Tools are useful."],
    ["Read all the sentences. What one big idea do they all support?", "The central idea is bigger than any single detail. It covers all of them. Details support the central idea; they are not the central idea.", "Example: <b>Dogs fetch. Dogs guard. Dogs guide the blind.</b> All the details show dogs help people. That is the central idea. Now do yours."],
    [["The big idea", "🎯", "The <b>central idea</b> is the main point the whole text is about."], ["Details support it", "🧱", "Facts and examples are <b>supporting details</b>. They are smaller than the central idea."], ["Test it", "✅", "A good central idea covers <b>all</b> the details, not just one."]]);

  const C8 = mk("Enjambment and caesura", "📜", [
    "When a line of poetry runs on into the next line without a pause or punctuation, it is called...|enjambment|caesura|refrain",
    "A pause in the middle of a line, shown by a comma, period or dash, is a...|caesura|enjambment|stanza",
    "Which line has a <b>caesura</b>?|I walked home. It was late.|The sun rose over the quiet hills|Birds sang above the trees",
    "Which shows <b>enjambment</b>?|The river runs past the old<br>stone bridge and out to sea|The river runs. It sings.<br>The sea waits.|The river sings.<br>The bridge stands still.",
    "Why might a poet use enjambment?|to make the poem flow and build momentum|to stop the poem|to add a title",
    "Why might a poet use a caesura?|to create a pause or emphasis|to make the poem rush|to add rhyme",
    "A line that ends with a period or comma is called...|end-stopped|enjambed|rhymed",
    "Which line ends with a full stop (end-stopped)?|The day was done.|The day was done and the|Night came on and|The"],
    ["Think about where the pauses are: at the end of a line, in the middle of a line, or nowhere at all?", "Enjambment = the sentence flows over the line break. Caesura = a pause inside a line. End-stopped = the line ends with punctuation.", "Example: <b>The moon was high / above the sleeping town</b> flows across the line break, so it uses enjambment. Now do yours."],
    [["Running on", "🏃", "<b>Enjambment</b>: a thought runs over the end of a line into the next one with no pause."], ["A pause inside", "⏸️", "<b>Caesura</b>: a pause in the middle of a line. Often shown by a comma, dash or period."], ["Stopping at the end", "🛑", "<b>End-stopped</b> lines end with punctuation. Poets mix these to control speed and mood."]]);

  const C9 = mk("Diction and syntax", "🔤", [
    "Diction means a writer's ___.|word choice|handwriting|book length",
    "Syntax means ___.|how words are arranged into sentences|the meaning of one word|the story's setting",
    "Calling a house a 'mansion' instead of a 'shack' is a difference in...|diction|syntax|rhyme",
    "Short, choppy sentences make the pace feel...|fast and tense|slow and calm|sleepy",
    "Long, flowing sentences with many commas can feel...|dreamy or slow|sudden|like quick bursts",
    "Which is <b>formal</b> diction?|I request your assistance.|Gimme a hand.|Help me out, pal.",
    "Which is <b>informal</b> diction?|Gimme a hand.|I would be grateful for your assistance.|Kindly assist me.",
    "Which is a question about <b>syntax</b>?|How long are the sentences?|Which words feel gloomy?|Where is the story set?",
    "Which is a question about <b>diction</b>?|What feeling do the chosen words create?|How many commas are used?|Are the sentences short?"],
    ["Is the question about which words were picked, or about how the sentences are built?", "Diction = word choice and level (formal, casual, gloomy, cheerful). Syntax = sentence structure, length and order. Both shape tone.", "Example: <b>'Dusk crept in.'</b> shows diction ('crept') and short syntax. Now do yours."],
    [["Word choice", "🔤", "<b>Diction</b> is the words the writer chooses: <b>formal or casual, harsh or gentle</b>."], ["Sentence shape", "📐", "<b>Syntax</b> is how sentences are built: <b>short or long, simple or complex</b>."], ["How they work", "🎼", "Short sentences speed things up. Long ones slow things down. Word choice sets the tone."]]);

  const C10 = mk("Story-telling techniques", "🎢", [
    "Starting a story in the middle of the action is called...|in medias res|a prologue|an epilogue",
    "A clue meant to mislead readers in a mystery is a ___.|red herring|moral|stanza",
    "Ending a chapter at a tense moment so readers must read on is a ___.|cliffhanger|epilogue|moral",
    "Slowing time with many details of one moment changes the story's ___.|pacing|rhyme|title",
    "Building worry about what will happen next is ___.|suspense|irony|rhyme",
    "A surprising change of direction near the end is a ___.|plot twist|simile|setting",
    "A short scene that closes the story after the main plot is the ___.|epilogue|prologue|climax",
    "Short quick sentences and fast events speed up the story's ___.|pacing|setting|moral",
    "A short opening section that comes before chapter one is a ___.|prologue|epilogue|moral"],
    ["Think about when the technique happens (beginning, middle, end) and what effect it has on the reader.", "In medias res = start in the action. Red herring = false clue. Cliffhanger = stop at a tense spot. Pacing = speed. Suspense = worry. Twist = surprise. Epilogue = after; prologue = before.", "Example: <b>A story opens with a chase, then explains how it began.</b> That is in medias res. Now do yours."],
    [["Speed and worry", "🎢", "<b>Pacing</b> is how fast a story moves. <b>Suspense</b> is the worry about what comes next."], ["Tricking the reader", "🕵️", "A <b>red herring</b> is a false clue. A <b>plot twist</b> is a surprise turn."], ["Starting and ending", "🚪", "<b>In medias res</b>: start in the action. <b>Cliffhanger</b>: stop at a tense moment. <b>Prologue</b> comes before; <b>epilogue</b> comes after."]]);

  const C11 = mk("Kinds of nonfiction", "📘", [
    "A book about a person's life written by another person is a ___.|biography|autobiography|encyclopedia",
    "A person's life story written by that same person is an ___.|autobiography|biography|editorial",
    "A writer shares a special memory or part of their life, like a summer on a farm. That is a ___.|memoir|encyclopedia|manual",
    "A newspaper piece giving the paper's opinion is an ___.|editorial|biography|diary",
    "A true story told with scenes and characters, like a story, is ___.|narrative nonfiction|a fable|a sonnet",
    "Step-by-step directions to build a birdhouse are a ___.|how-to text|memoir|myth",
    "A short piece sharing the writer's thoughts on one topic is an ___.|essay|epic|riddle",
    "Which is nonfiction?|a biography of a scientist|a talking-animal fable|a fairy tale"],
    ["Ask: is it about real events and people? Who wrote it, and what is it for?", "Biography = someone else's life. Autobiography = your own life. Memoir = a slice of your own life. Editorial = opinion. How-to = directions.", "Example: <b>'My Life as a Mountain Guide'</b> by the guide herself is an autobiography. Now do yours."],
    [["True stories", "📘", "<b>Nonfiction</b> is about real people, events and facts."], ["Life stories", "🧑", "<b>Biography</b>: by someone else. <b>Autobiography</b>: by the person. <b>Memoir</b>: a part of the writer's life."], ["Other kinds", "🗞️", "<b>Editorial</b>: opinion. <b>Essay</b>: thoughts on a topic. <b>How-to</b>: steps. <b>Narrative nonfiction</b>: true story told like a story."]]);

  const C12 = mk("Describing or analyzing?", "🔬", [
    "Which sentence <b>analyzes</b> (explains how or why)?|The three short stanzas mirror the speaker's growing calm.|The poem has three stanzas.|The poem is about a river.",
    "Which sentence <b>analyzes</b>?|The word 'crept' makes the fog seem alive and a little sinister.|The author mentions fog in chapter two.|There is fog in the story.",
    "Which sentence <b>analyzes</b>?|Maya's careful packing shows how afraid she is to leave anything behind.|Maya packs her bag.|Maya is in her room.",
    "Which sentence <b>analyzes</b>?|The harsh winter setting reflects the family's struggle.|The story is set in winter.|The family lives in a cabin.",
    "What does analysis answer?|how and why|only who and what|only when",
    "'The text says the dog barked.' This sentence is a...|summary of what happened|analysis|prediction",
    "Which verb is good for analysis?|suggests|goes|has",
    "Which thesis <b>analyzes</b>?|Through repeated images of water, the author shows that change cannot be stopped.|The author wrote a story with water.|The story has water in it."],
    ["Does the sentence tell what is there, or does it explain what it means or why it matters?", "Describing says what happens. Analyzing says how the author does something and why it matters. Analysis uses verbs like suggests, reveals, shows and reflects.", "Example: <b>'The poem uses the word dark.'</b> describes. <b>'The word dark creates a feeling of fear.'</b> analyzes. Now do yours."],
    [["What vs how and why", "🔬", "<b>Describing</b> tells what is in the text. <b>Analyzing</b> tells how it works and <b>why it matters</b>."], ["Analysis verbs", "🔑", "<b>suggests, reveals, emphasizes, reflects, creates</b>"], ["Aim higher", "🪜", "After you name a detail, ask 'so what?'. The answer is analysis."]]);

  const C13 = mk("Explaining your evidence", "🧱", [
    "<b>Claim:</b> Leo is brave. <b>Quote:</b> 'He stepped forward while everyone froze.'<br><br>Which sentence best <b>explains</b> how the evidence supports the claim?|This shows courage because he acts while the others are too scared.|Leo stepped forward.|Leo is the name of a boy.",
    "<b>Claim:</b> Winter is hard for the animals. <b>Evidence:</b> 'Food was buried under deep snow.'<br><br>Which sentence best <b>explains</b> how the evidence supports the claim?|Without food they can reach, animals struggle to survive.|There was snow.|Snow is white.",
    "<b>Claim:</b> The town values community. <b>Evidence:</b> 'Neighbors gathered to rebuild the library.'<br><br>Which sentence best <b>explains</b> how the evidence supports the claim?|Rebuilding together shows people share responsibility for common places.|The library was rebuilt.|Neighbors can be friendly.",
    "<b>Claim:</b> Plants need light. <b>Evidence:</b> 'Plants in a dark closet turned pale and weak.'<br><br>Which sentence best <b>explains</b> how the evidence supports the claim?|The plants suffered without light, which shows light is needed for healthy growth.|The closet was dark.|Plants are green.",
    "<b>Claim:</b> Mara is curious. <b>Evidence:</b> 'She opened every drawer in the attic.'<br><br>Which sentence best <b>explains</b> how the evidence supports the claim?|Opening every drawer shows she wants to discover what is hidden.|Mara went to the attic.|Attics have drawers.",
    "<b>Claim:</b> Daily practice builds skill. <b>Evidence:</b> 'Students who studied daily improved their scores.'<br><br>Which sentence best <b>explains</b> how the evidence supports the claim?|The improvement suggests that daily practice builds skills that raise performance.|Students took tests.|Scores are numbers.",
    "<b>Claim:</b> The ending is hopeful. <b>Evidence:</b> 'A single green shoot pushed through the ashes.'<br><br>Which sentence best <b>explains</b> how the evidence supports the claim?|The shoot is a sign of new life, suggesting recovery is possible.|A shoot grew.|Ashes are gray.",
    "<b>Claim:</b> Sam is generous. <b>Evidence:</b> 'He gave his lunch to a hungry classmate.'<br><br>Which sentence best <b>explains</b> how the evidence supports the claim?|Giving up his own food shows he puts others' needs first.|Sam had lunch.|The classmate was hungry."],
    ["Do not just repeat the evidence. Say what it proves.", "A good explanation links the evidence back to the claim with words like 'this shows', 'because' or 'which suggests', and tells why the detail matters.", "Example: <b>Claim: Ana is tidy. Evidence: 'Every pencil sat in its place.'</b> Explanation: <b>This shows she likes order.</b> Now do yours."],
    [["Claim, evidence, explanation", "🧱", "Strong paragraphs have a <b>claim</b>, <b>evidence</b> to support it, and an <b>explanation</b> that connects them."], ["Do not stop at the quote", "🚧", "A quote does not speak for itself. Say <b>what it shows</b> and <b>why it matters</b>."], ["Helpful phrases", "💬", "<b>This shows..., This suggests..., This matters because...</b>"]]);

  const C14 = mk("Strong verbs, not heavy nouns", "🪶", [
    "Which is stronger?|The committee decided to cancel the event.|The committee made a decision to cancel the event.|A decision was made by the committee for cancellation of the event.",
    "Which is stronger?|The team considered the plan.|The team gave consideration to the plan.|Consideration of the plan was given by the team.",
    "Which is stronger?|Police investigated the noise.|Police conducted an investigation of the noise.|An investigation of the noise was conducted.",
    "Which is stronger?|We discussed the rules.|We had a discussion about the rules.|A discussion about the rules took place.",
    "Which is stronger?|Volunteers helped the neighbors.|Volunteers provided assistance to the neighbors.|Assistance was provided to the neighbors by volunteers.",
    "Which is stronger?|She suggests a new route.|She makes a suggestion for a new route.|A suggestion for a new route is being made.",
    "Which is stronger?|The mayor acted quickly.|The mayor took quick action.|Quick action was taken by the mayor.",
    "Which is stronger?|I applied for the job.|I made an application for the job.|An application was made by me for the job."],
    ["Look for a sentence where a strong verb does the work, instead of a weak verb plus a long noun.", "Heavy nouns made from verbs (decision, discussion, assistance) with weak verbs (make, have, give, take) can be turned back into one lively verb: decide, discuss, assist.", "Example: <b>make a decision</b> becomes <b>decide</b>; <b>give an answer</b> becomes <b>answer</b>. Now do yours."],
    [["Verbs hidden in nouns", "🪶", "<b>decision</b> hides <b>decide</b>. <b>investigation</b> hides <b>investigate</b>. Turn them back into verbs."], ["Weak verbs plus nouns", "🐌", "<b>make a suggestion</b>, <b>have a discussion</b>, <b>take action</b> are wordy."], ["Shorter and clearer", "✂️", "<b>suggest, discuss, act</b> say the same thing in fewer words and give more energy."]]);

  const C15 = mk("Present tense for literature", "📖", [
    "In the novel, Ana ___ a hidden door.|discovers|discovered|will discover",
    "In the poem, the speaker ___ about autumn.|reflects|reflected|will reflect",
    "The author ___ many images of the sea.|uses|used|will use",
    "Charles Dickens ___ A Christmas Carol in 1843. (a fact about the real world)|wrote|writes|will write",
    "In Chapter 3, the hero ___ a map.|finds|found|will find",
    "Shakespeare ___ in England long ago.|lived|lives|living",
    "At the end of the story, the family ___ home.|returns|returned|will return",
    "Which tense do we usually use to tell what happens in a story we are analyzing?|present|past|future"],
    ["Are you telling what happens inside the book, or a real-world fact about when the author lived or wrote?", "Write about what happens in a book, poem or film in the present tense (the 'literary present'). Use the past tense for real history, like when the author wrote it.", "Example: <b>In the story, the dog runs away.</b> (present) <b>The author wrote it in 1950.</b> (past) Now do yours."],
    [["The literary present", "📖", "A story is always happening when you open it, so we use <b>present tense</b>: <b>Ana opens the door.</b>"], ["Real history", "🕰️", "Real-world facts about the author use <b>past tense</b>: <b>She wrote it in 1900.</b>"], ["Do not mix", "🚫", "Avoid switching back and forth in one paragraph about the same book."]]);

  const C16 = mk("e.g., i.e., etc. and more", "🔖", [
    "Which abbreviation means 'for example'?|e.g.|i.e.|etc.",
    "Which abbreviation means 'that is' (to restate)?|i.e.|e.g.|etc.",
    "Which abbreviation means 'and so on'?|etc.|e.g.|i.e.",
    "I like citrus fruits, ___ oranges and lemons.|e.g.|i.e.|etc.",
    "My favorite season, ___ summer, is the hottest.|i.e.|e.g.|vs.",
    "Bring pencils, paper, erasers, ___|etc.|e.g.|i.e.",
    "Which means 'and others', used for many authors?|et al.|etc.|vs.",
    "Which abbreviation means 'versus' (against)?|vs.|i.e.|etc.",
    "Which means 'before noon'?|a.m.|p.m.|e.g."],
    ["These abbreviations come from Latin. Match what the sentence needs: an example, a restating, a list that goes on, or a time.", "e.g. = for example (a sample). i.e. = that is (the exact meaning). etc. = and so on. et al. = and others. vs. = against. a.m. = before noon.", "Example: <b>I enjoy sports, ___ soccer and tennis.</b> It lists examples, so e.g. Now do yours."],
    [["Latin shortcuts", "🔖", "English borrows short Latin abbreviations. Learn what each one really means."], ["e.g. and i.e.", "🔀", "<b>e.g.</b> = for example (one of many). <b>i.e.</b> = that is (says it another way)."], ["More", "➕", "<b>etc.</b> = and so on. <b>et al.</b> = and others. <b>vs.</b> = against. <b>a.m.</b> = before noon. <b>p.m.</b> = after noon."]]);

  const C17 = mk("Commonly misspelled words", "🔡", [
    "Which is spelled correctly?|necessary|neccessary|necesary",
    "Which is spelled correctly?|separate|seperate|separat",
    "Which is spelled correctly?|definitely|definately|definitly",
    "Which is spelled correctly?|occasion|ocassion|occassion",
    "Which is spelled correctly?|embarrass|embarass|embarras",
    "Which is spelled correctly?|restaurant|restaraunt|restarant",
    "Which is spelled correctly?|rhythm|rythm|rhythem",
    "Which is spelled correctly?|February|Febuary|Febrary",
    "Which is spelled correctly?|calendar|calender|calandar",
    "Which is spelled correctly?|government|goverment|govermment",
    "Which is spelled correctly?|environment|enviroment|envirnment",
    "Which is spelled correctly?|privilege|privelege|priviledge"],
    ["Say the word in syllables and notice which letters you might skip or swap.", "Memory tricks: a Shirt has One Collar and Two Sleeves (necessary). There is 'a rat' in sepARATe. 'Definitely' has 'finite' inside. 'Embarrass' has two r's and two s's. Rhythm Helps Your Two Hips Move.", "Example: <b>Wednesday</b> sounds like 'Wens-day' but has a d: Wed-nes-day. Say it in parts to remember. Now do yours."],
    [["Words that trip us up", "🔡", "Some words are spelled differently from how they sound. Memorize the tricky bits."], ["Memory tricks", "🧠", "<b>sepARATe</b> has a rat. <b>necessary</b> has one c and two s's. <b>definitely</b> has 'finite' inside."], ["Check and learn", "✅", "When you misspell a word, write it correctly three times and keep a personal list."]]);

  const C18 = mk("Block quotes and quoting poems", "💬", [
    "When you quote two lines of a poem inside a sentence, how do you show where a line ends?|with a slash|with a comma|with a period",
    "A block quote has what around it?|no quotation marks|double quotation marks|brackets",
    "A block quote is used for a quote that is...|long (more than about four lines)|one word|a title",
    "How do you set off a block quote?|start it on a new line and indent it|put it in bold|put it in all capitals",
    "Where does the citation go after a block quote?|after the final punctuation of the quote|before the quote|in the middle of the quote",
    "After you quote, you should always...|explain what it means|add another quote|leave it alone",
    "Which is <b>not</b> a good use of a block quote?|a six-word phrase|a long passage of more than four lines|a long poem passage of more than three lines",
    "In a block quote of a poem, you keep the poet's...|original line breaks|slashes between lines|no line breaks"],
    ["Think about how long the quote is and how it should look on the page.", "Short quotes go inside your sentence with quotation marks. In a short poem quote, a slash shows where a line ends. Long quotes become a block quote: new line, indented, no quotation marks.", "Example: <b>Lines 1 and 2 of a poem inside a sentence:</b> “Roses are red / Violets are blue.” The slash shows the line break. Now do yours."],
    [["Short quotes", "💬", "Put short quotes in <b>quotation marks</b> inside your sentence. For poems, a <b>slash /</b> shows the line break."], ["Long quotes", "📏", "A <b>block quote</b> starts on a new line, is <b>indented</b>, and has <b>no quotation marks</b>."], ["Explain it", "🧱", "After any quote, add your own sentence saying what it means and why you chose it."]]);

  const L18 = [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, C17, C18];

  const lvl = (n, L) => L.concat([MIX("Mixed practice", ...L.slice(0, 6)), MIX("Level " + n + " Challenge", ...L.slice(6))]);
  Object.assign(WRITING_LEVELS, { 16: lvl(16, L16), 17: lvl(17, L17), 18: lvl(18, L18) });
})();
