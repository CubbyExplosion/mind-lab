// ext/writing-7-9.js  Mind Lab Writing & Grammar, levels 7-9 (60 lessons)
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
  // lab: label a sentence. pairs [sentence, label]
  const lab = (q, labels, pairs) => pairs.map(([t, a]) => [q + "<br><br><b>" + t + "</b>", a, ...labels.filter(x => x !== a)].join("|"));
  // okr: same question text for every row; row = "correct|wrong|wrong"
  const okr = (q, rows) => rows.map(r => q + "|" + r);
  // mqr: question text + bold sentence; row = "sentence|answer|wrong|wrong"
  const mqr = (q, rows) => rows.map(r => { const p = r.split("|"); p[0] = q + "<br><br><b>" + p[0] + "</b>"; return p.join("|"); });

  // =============== LEVEL 7 ===============
  const CS = "What is the <b>complete subject</b>?<br><br><b>", CP = "What is the <b>complete predicate</b>?<br><br><b>";
  const A1 = mk("Subject and predicate", "✂️", [
    CS + "The tall boy kicked the ball.</b>|The tall boy|kicked the ball|the ball",
    CS + "My little sister sings loudly.</b>|My little sister|sings loudly|little sister sings",
    CS + "The old oak tree fell down.</b>|The old oak tree|fell down|oak tree fell",
    CS + "Our new teacher reads aloud.</b>|Our new teacher|reads aloud|new teacher reads",
    CP + "The brave firefighter climbed the ladder.</b>|climbed the ladder|The brave firefighter|firefighter climbed",
    CP + "Two small birds sat on the fence.</b>|sat on the fence|Two small birds|Two small",
    CP + "My grandmother bakes bread every Sunday.</b>|bakes bread every Sunday|My grandmother|grandmother bakes",
    CP + "The whole class cheered.</b>|cheered|The whole class|whole class"],
    ["Every sentence has two big parts. One part tells who or what the sentence is about. The other part tells what happens.", "The subject is the who or what, with all its describing words. The predicate starts at the verb and goes to the end.", "Example: <b>The funny clown juggled three balls.</b> Who? The funny clown. What did it do? juggled three balls. Now do yours."],
    [["Two parts", "✂️", "Every sentence can be cut into two parts: the <b>subject</b> and the <b>predicate</b>."], ["Subject", "👦", "The <b>complete subject</b> is who or what the sentence is about, plus its describing words: <b>The tall boy</b> kicked the ball."], ["Predicate", "⚽", "The <b>complete predicate</b> tells what the subject does or is. It starts with the verb: The tall boy <b>kicked the ball</b>."]]);

  const A2 = mk("Subject-verb agreement", "🤝", [
    "The dogs ___ in the yard. (bark)|bark|barks|barking", "My brother ___ the piano. (play)|plays|play|playing",
    "The children ___ at recess. (run)|run|runs|running", "She ___ her homework every night. (do)|does|do|doing",
    "The birds ___ south in winter. (fly)|fly|flies|flying", "Tom and Ben ___ best friends.|are|is|am",
    "The cat ___ on the sofa. (sleep)|sleeps|sleep|sleeping", "Mom ___ to work by bus. (go)|goes|go|going"],
    ["Look at the subject. Is it one thing or more than one thing?", "One person or thing usually needs a verb ending in s. More than one needs the verb with no s.", "Example: <b>The bird ___ (sing).</b> One bird, so the verb gets an s: sings. <b>The birds ___ (sing).</b> More than one, so: sing. Now do yours."],
    [["Match them!", "🤝", "The verb must <b>agree</b> with the subject. They fit together like puzzle pieces."], ["One or many", "🐶 / 🐶🐶", "One subject: <b>The dog runs.</b> Many subjects: <b>The dogs run.</b> The s moves from the verb to the noun!"], ["Special verbs", "💡", "<b>Is</b> goes with one, <b>are</b> goes with many or with <b>and</b>: Tom and Ben <b>are</b> friends. <b>Has</b> and <b>have</b>, <b>does</b> and <b>do</b> work the same way."]]);

  const A3 = mk("Who owns them? s' and 's", "🏷️", mqr("Where does the apostrophe go to show the owner?", [
    "The bikes belong to two boys. (boys bikes)|after the s|before the s|no apostrophe",
    "The hat belongs to one girl. (girls hat)|before the s|after the s|no apostrophe",
    "The nests belong to the birds. (birds nests)|after the s|before the s|no apostrophe",
    "The toys belong to the children. (childrens toys)|before the s|after the s|no apostrophe",
    "The desk belongs to the teacher. (teachers desk)|before the s|after the s|no apostrophe",
    "The room belongs to my two sisters. (sisters room)|after the s|before the s|no apostrophe",
    "The coats belong to the men. (mens coats)|before the s|after the s|no apostrophe",
    "The pond belongs to the ducks. (ducks pond)|after the s|before the s|no apostrophe"]),
    ["First ask: does it belong to one owner, or to more than one?", "One owner: the apostrophe goes before the s. Many owners that already end in s: it goes after the s. A plural that does not end in s (like mice) is treated like one owner.", "Example: <b>the paws of the cats (cats paws)</b>: many owners ending in s, so the apostrophe goes at the very end: cats'. <b>the tail of the cat (cats tail)</b>: one owner, so it goes before the s: cat's. Now do yours."],
    [["Showing ownership", "🏷️", "An apostrophe shows who owns something: the <b>dog's</b> bone."], ["One owner", "🐕 → dog's", "One owner: add <b>'s</b>. The girl's hat. The teacher's desk."], ["Many owners", "🐕🐕 → dogs'", "Many owners ending in s: add just <b>'</b> after the s. The dogs' bowls. But words like children or men don't end in s, so add <b>'s</b>: the <b>children's</b> toys."]]);
  const A4 = mk("Tricky past words 3", "⏪", [
    "Yesterday she ___ a letter. (write)|wrote|writed|written", "Last summer I ___ in the lake. (swim)|swam|swimmed|swum",
    "He ___ all his milk this morning. (drink)|drank|drinked|drunk", "The movie ___ at six o'clock. (begin)|began|beginned|begun",
    "The school bell ___ loudly. (ring)|rang|ringed|rung", "We ___ a happy song yesterday. (sing)|sang|singed|sung",
    "Grandpa ___ me a puzzle for my birthday. (give)|gave|gived|given", "I ___ my umbrella to school. (take)|took|taked|taken",
    "Tom ___ the ball to his friend. (throw)|threw|throwed|thrown", "The wind ___ my hat away. (blow)|blew|blowed|blown"],
    ["The sentence tells about something that already happened. Use the past word.", "These verbs do not add -ed. They change into a different word. Say each choice out loud: which sounds right?", "Example: <b>Last night I ___ a pizza. (eat)</b> The past of eat is ate, not eated. <b>Yesterday we ___ to school. (go)</b> The past of go is went. Now do yours."],
    [["Past tense", "⏪", "Many verbs add <b>-ed</b> for the past. But some verbs are tricky and change completely."], ["Tricky pairs", "swim → swam", "<b>write → wrote</b>, <b>drink → drank</b>, <b>begin → began</b>, <b>ring → rang</b>, <b>sing → sang</b>, <b>give → gave</b>, <b>take → took</b>, <b>throw → threw</b>, <b>blow → blew</b>."], ["Careful", "⚠️", "Never add -ed to these: <b>writed</b> and <b>throwed</b> are not words. Learn the pairs by heart!"]]);

  const A5 = mk("Commas after starting words", "✋", mqr("Where does the comma go?", [
    "Yes I would like some juice.|after Yes|after I|after would", "First wash your hands.|after First|after wash|after your",
    "Well that was fun.|after Well|after that|after was", "Luckily we had umbrellas.|after Luckily|after we|after had",
    "Next add the eggs.|after Next|after add|after the", "No thank you.|after No|after thank|after you",
    "Finally the bus came.|after Finally|after the|after bus", "Sadly the game was over.|after Sadly|after the|after game",
    "Oh I forgot my lunch.|after Oh|after I|after forgot"]),
    ["Look at the first word. It is a little word that starts the sentence and is not part of the main idea.", "A comma goes right after a starting word such as yes, no, well or first, before the main idea begins.", "Example: <b>Sometimes I read in bed.</b> The comma comes right after the starting word, before the main idea: Sometimes, I read in bed. Now do yours."],
    [["Starting words", "✋", "Words like <b>yes, no, well, first, next, finally</b> often start a sentence. They get a comma after them."], ["Examples", "👍", "<b>Yes,</b> I can come. <b>First,</b> mix the flour. <b>Luckily,</b> nobody was hurt."], ["Tip", "💡", "Read it out loud. The comma sits where you take a tiny pause."]]);

  const A6 = mk("Commas in two-part sentences", "🔗", mqr("Where does the comma go?", [
    "I wanted to swim but the pool was closed.|after swim|after but|after pool", "Dad cooked dinner and I set the table.|after dinner|after and|after I",
    "The soup was hot so I waited.|after hot|after so|after I", "It was late but we kept playing.|after late|after but|after we",
    "Ana likes soccer and Ben likes tennis.|after soccer|after and|after Ben", "I studied hard so I passed the test.|after hard|after so|after I",
    "We could go to the zoo or we could visit the museum.|after zoo|after or|after we", "Mia loves painting but Leo prefers drawing.|after painting|after but|after Leo"]),
    ["Each sentence joins two complete thoughts with a little joining word. Find where the first thought ends.", "Put the comma at the end of the first thought, right before the joining word (and, but, or, so), not after the joining word.", "Example: <b>It rained so we stayed in.</b> The first thought ends at rained, so the comma goes right there, before so. Now do yours."],
    [["Two thoughts", "🔗", "When two complete sentences are joined with <b>and, but, or, so</b>, we call it a <b>compound sentence</b>."], ["The comma", ", but", "Put a comma <b>before</b> the joining word: I was tired<b>, but</b> I kept going."], ["Check", "✅", "Can each side stand alone as a sentence? If yes, use the comma. Tom and Ben ran (one thought) needs no comma."]]);

  const A7 = mk("Talking: quotation marks", "💬", [
    "Which mark goes in the blank?<br><br><b>“I love pizza__” said Mia.</b>|a comma|a period|a question mark",
    "Which mark goes in the blank?<br><br><b>Tom asked__ “Can I help?”</b>|a comma|a period|a question mark",
    "Which mark goes in the blank?<br><br><b>Grandpa said__ “Dinner is ready.”</b>|a comma|a period|an exclamation mark",
    "Which mark goes in the blank?<br><br><b>“Where are my shoes__” asked Sam.</b>|a question mark|a comma|a period",
    "Which mark goes in the blank?<br><br><b>“Do you like it__” asked Ana.</b>|a question mark|a comma|a period",
    "Which mark goes in the blank?<br><br><b>Mom said__ “Please wash up.”</b>|a comma|a period|a question mark",
    "Which words did the person say?<br><br><b>Sam said, “I like cake.”</b>|I like cake|Sam said|Sam said I like cake",
    "Which words did the person say?<br><br><b>“Let's play,” said Ana.</b>|Let's play|said Ana|Ana said let's play",
    "Which words did the person say?<br><br><b>Dad asked, “Are you ready?”</b>|Are you ready|Dad asked|Dad asked are you",
    "Which word needs a capital letter?<br><br><b>Mom said, “please wash up.”</b>|please|said|wash",
    "Which word needs a capital letter?<br><br><b>Tom shouted, “watch out!”</b>|watch|shouted|out",
    "Which word needs a capital letter?<br><br><b>Ana whispered, “be quiet.”</b>|be|whispered|quiet"],
    ["Quotation marks wrap around the exact words someone says. Think about what the spoken words are, and what comes before or after them.", "Spoken words start with a capital letter. A mark separates the speaker from the words when the speaker comes first. A question or shout keeps its own end mark.", "Example: <b>Lily said__ “I am cold.”</b> The speaker comes first, then the spoken words, so a small pause mark separates them. <b>“Is it cold__” asked Lily.</b> The spoken words ask something. Now do yours."],
    [["Speech marks", "💬", "<b>Quotation marks</b> “ ” go around the exact words a person says."], ["Rules", "📝", "Start the spoken words with a <b>capital</b>. Put a <b>comma</b> between the speaker and the words. Put the ? or ! <b>inside</b> the closing marks."], ["Examples", "🗣️", "Mia said, “I am happy.” · “I am happy,” said Mia. · “Are you happy?” asked Mia."]]);
  const A8 = mk("Sentence, fragment or run-on?", "🔍", lab("What is this?", ["whole sentence", "fragment", "run-on"], [
    ["Running down the hill.", "fragment"], ["The cat purred on my lap.", "whole sentence"], ["I like soup it is warm.", "run-on"], ["Because it was raining.", "fragment"],
    ["We ate lunch then we went outside.", "run-on"], ["My best friend lives next door.", "whole sentence"], ["Under the big red bridge.", "fragment"],
    ["The bell rang everyone ran out.", "run-on"], ["Sam kicked the ball.", "whole sentence"], ["Jumped over the fence.", "fragment"]]),
    ["Ask two questions: does it tell who or what, and does it tell what happens? Is it one complete thought?", "A fragment is missing a part. A run-on squashes two complete thoughts together with nothing between them.", "Example: <b>The puppy chewed a shoe.</b> Who and what happens: whole sentence. <b>Chewed a shoe.</b> Who? Missing, so fragment. <b>The puppy chewed a shoe it was fun.</b> Two thoughts squashed together: run-on. Now do yours."],
    [["Whole sentence", "✅", "A whole sentence has a <b>subject</b>, a <b>verb</b> and a complete thought."], ["Fragment", "✂️", "A <b>fragment</b> is only a piece. It may miss the subject (<i>Ran home.</i>) or leave you waiting (<i>Because it rained.</i>)."], ["Run-on", "🚂", "A <b>run-on</b> sticks two sentences together with no end mark or joining word: <i>I was hungry I ate.</i>"]]);

  const A9 = mk("Fix the run-on", "🛠️", mqr("Which choice fixes the <b>run-on</b>?", [
    "I dropped my pencil it rolled away.|I dropped my pencil, and it rolled away.|I dropped my pencil, it rolled away.|I dropped my pencil, or it rolled away.",
    "The sun set the sky turned pink.|The sun set. The sky turned pink.|The sun set, the sky turned pink.|The sun set, or the sky turned pink.",
    "Dad made pancakes we ate them all.|Dad made pancakes, and we ate them all.|Dad made pancakes, we ate them all.|Dad made pancakes, or we ate them all.",
    "My dog barks loudly he wants a walk.|My dog barks loudly. He wants a walk.|My dog barks loudly, he wants a walk.|My dog barks loudly, or he wants a walk.",
    "It was cold I wore a coat.|It was cold, so I wore a coat.|It was cold, I wore a coat.|It was cold, or I wore a coat.",
    "We read a book then we went to bed.|We read a book, and then we went to bed.|We read a book, then we went to bed.|We read a book, or then we went to bed.",
    "Lila sings well she practices daily.|Lila sings well. She practices daily.|Lila sings well, she practices daily.|Lila sings well, or she practices daily.",
    "The bus was late we waited.|The bus was late, so we waited.|The bus was late, we waited.|The bus was late, or we waited."]),
    ["A run-on has two full sentences squashed together. Where does the first one end?", "To fix it, use an end mark and a capital letter, OR a comma plus a joining word that makes sense. A comma alone is not enough.", "Example: <b>The rain stopped we went out.</b> Fix: The rain stopped. We went out. Or: The rain stopped, so we went out. Now do yours."],
    [["Run-ons", "🚂", "A <b>run-on</b> has two complete thoughts with nothing to separate them."], ["Two fixes", "🔧", "Fix 1: break it into two sentences. Fix 2: add a <b>comma and a joining word</b> (and, but, so)."], ["Warning", "⚠️", "A comma alone makes a <b>comma splice</b>, which is also a mistake: <i>I ran, I fell.</i>"]]);
  const A10 = mk("Good or well?", "👍", [
    "She sings very ___.|well|good|goodly", "That was a ___ movie.|good|well|goodly", "He did ___ on the test.|well|good|goodly",
    "You are a ___ friend.|good|well|goodly", "The team played ___ today.|well|good|goodly", "This soup tastes ___.|good|well|goodly",
    "My dad cooks ___.|well|good|goodly", "Mia is a ___ writer.|good|well|goodly", "He reads ___ for his age.|well|good|goodly"],
    ["Ask: does the blank describe a thing (a noun), or tell how someone does an action?", "Good describes a noun, like a good book. Well tells how an action is done, like sings well.", "Example: <b>He is a ___ singer.</b> Singer is a noun, so use good. <b>He sings ___.</b> Sings is an action, so use well. Now do yours."],
    [["Two words", "👍", "<b>Good</b> and <b>well</b> both mean a nice thing, but they do different jobs."], ["Good", "📚", "<b>Good</b> describes a person, place or thing: a <b>good</b> book, a <b>good</b> friend."], ["Well", "🏃", "<b>Well</b> tells how an action is done: runs <b>well</b>, writes <b>well</b>. Tip: things <i>taste</i> or <i>look</i> good."]]);

  const A11 = mk("Adjective or adverb?", "🎯", [
    "The turtle moves ___.|slowly|slow|slowness", "She is a ___ swimmer.|quick|quickly|quickness", "He spoke ___ to the baby.|softly|soft|softness",
    "A ___ wind blew.|gentle|gently|gentleness", "The kids cheered ___.|loudly|loud|loudness", "We waited ___ for the bus.|patiently|patient|patience",
    "Be ___ with the glass.|careful|carefully|carefulness", "She answered ___.|politely|polite|politeness", "The ___ girl helped us.|kind|kindly|kindness"],
    ["Is the blank describing a noun, or telling how something is done?", "A word that describes a noun is an adjective. A word that tells how an action is done is an adverb, and it often ends in -ly.", "Example: <b>The bear ate ___ (hungry/hungrily).</b> Ate is an action, so we need the how-word: hungrily. <b>A ___ bear</b>: bear is a noun, so: hungry. Now do yours."],
    [["Adjectives", "🎨", "An <b>adjective</b> describes a noun: a <b>quick</b> swimmer, a <b>soft</b> blanket."], ["Adverbs", "🏃", "An <b>adverb</b> tells how, when or where. Many end in <b>-ly</b>: swims <b>quickly</b>, spoke <b>softly</b>."], ["Test", "💡", "Ask: what is the word describing? A noun gets an adjective. A verb gets an adverb."]]);

  const A12 = mk("Their, there, they're", "📍", [
    "Look over ___!|there|their|they're", "The kids put on ___ coats.|their|there|they're", "___ going to the zoo today.|They're|Their|There",
    "I left my book over ___.|there|their|they're", "___ is a bird in the tree.|There|Their|They're", "Ben and Ana love ___ new puppy.|their|there|they're",
    "I think ___ late.|they're|their|there", "The team won ___ game.|their|there|they're", "Please put the box ___.|there|their|they're"],
    ["These three sound the same but mean different things. Try each one in the sentence.", "Try replacing the word with 'they are'. If it fits, you need the one with an apostrophe. If it shows ownership, use the other special one.", "Example: <b>___ cat is asleep.</b> They are cat? No. A place? No. It belongs to them: their. Now do yours."],
    [["Three twins", "👯", "<b>their, there, they're</b> sound alike but have different jobs."], ["Their / there", "🏠 📍", "<b>Their</b> shows ownership: their house. <b>There</b> shows a place: over there. Hint: there has the word <i>here</i> inside it."], ["They're", "👥", "<b>They're</b> = <b>they are</b>. The apostrophe takes the place of the missing letter a."]]);

  const A13 = mk("Your or you're? Whose or who's?", "🔤", [
    "Is this ___ jacket?|your|you're|yours", "___ going to love this.|You're|Your|Yours", "___ coat is this?|Whose|Who's|Whom",
    "___ going to the game?|Who's|Whose|Whom", "Do you know ___ book this is?|whose|who's|whom", "Thank you for ___ help.|your|you're|yours",
    "I hope ___ ready.|you're|your|yours", "I wonder ___ at the door.|who's|whose|whom", "___ turn is it?|Whose|Who's|Whom", "___ ready to go?|Who's|Whose|Whom"],
    ["Try saying the sentence with 'you are' or 'who is' in the blank. Does it still make sense?", "If 'you are' or 'who is' fits, you need the word with an apostrophe. If the blank shows who owns something, it has no apostrophe.", "Example: <b>___ eating lunch.</b> 'You are eating lunch' works, so: you're. <b>___ shoes are these?</b> 'Who is shoes' does not work, so: whose. Now do yours."],
    [["Apostrophe words", "🔤", "<b>you're</b> = you are. <b>who's</b> = who is (or who has). The apostrophe replaces missing letters."], ["Ownership", "🎒", "<b>your</b> and <b>whose</b> (no apostrophe) show who owns something: <b>your</b> bag, <b>whose</b> bag is this?"], ["Trick", "💡", "Say the long form. 'Who is coat is this' sounds wrong, so use <b>whose</b>. 'Who is going' sounds right, so use <b>who's</b>."]]);
  const A14 = mk("To, too or two?", "2️⃣", [
    "I have ___ cats.|two|to|too", "We went ___ the beach.|to|too|two", "Can I come ___?|too|to|two", "It is ___ hot today.|too|to|two",
    "She ate ___ cookies.|two|too|to", "Dad wants ___ help.|to|too|two", "I like pizza, ___.|too|to|two",
    "He gave ___ gifts to his mom.|two|to|too", "The soup is ___ salty.|too|to|two", "Walk ___ the door.|to|too|two"],
    ["Look at the meaning. Is the blank a number, 'also', 'more than enough', or a direction word?", "A number is spelled with a w. The one that means 'also' or 'very much' has an extra o.", "Example: <b>I have ___ pets.</b> That is a number, so use the number spelling. <b>She is going ___ school.</b> That is a direction, so the short one. Now do yours."],
    [["Three words", "2️⃣", "<b>to, too, two</b> sound the same. Learn each job."], ["Two", "✌️", "<b>Two</b> is the number 2. It has a <b>w</b> like the word <i>twin</i>."], ["To and too", "➡️ ➕", "<b>To</b> shows direction (go to the park) or goes before a verb (to run). <b>Too</b> means <b>also</b> or <b>more than enough</b>: me too, too hot."]]);

  const A15 = mk("Word endings: -ly, -ness, -able", "🧩", [
    "Which word means <b>in a quiet way</b>?|quietly|quietness|quietment", "Which word means <b>the state of being happy</b>?|happiness|happily|happyment",
    "Which word means <b>able to be washed</b>?|washable|washment|washness", "Which word means <b>the act of enjoying</b>?|enjoyment|enjoyness|enjoyly",
    "Which word means <b>in a happy way</b>?|happily|happiness|happyment", "Which word means <b>the state of being dark</b>?|darkness|darkly|darkment",
    "Which word means <b>able to be read</b>?|readable|readness|readment", "Which word means <b>in a slow way</b>?|slowly|slowness|slowment",
    "Which word means <b>the state of being kind</b>?|kindness|kindly|kindment"],
    ["Look at the meaning: is it a way of doing something, a state of being, or being able?", "-ly means 'in a ___ way'. -ness means 'the state of being ___'. -able means 'able to be ___ed'. -ment means 'the act of'.", "Example: <b>able to be broken</b> is break + able = breakable. <b>the state of being sad</b> is sad + ness = sadness. Now do yours."],
    [["Suffixes", "🧩", "A <b>suffix</b> is a word part added to the end. It changes the meaning or the job of the word."], ["Meanings", "📖", "<b>-ly</b> = in a ___ way (slowly). <b>-ness</b> = state of being (kindness). <b>-able</b> = can be done (readable). <b>-ment</b> = the act of (enjoyment)."], ["Spelling tip", "✏️", "If a word ends in y, change y to i first: happy → <b>happiness</b>, <b>happily</b>."]]);

  const A16 = mk("Details that fit", "🧱", [
    "Topic sentence: <b>Dogs make great pets.</b> Which detail fits?|Dogs are loyal and love to play.|Cats nap in sunny windows.|Pizza has cheese on top.",
    "Topic sentence: <b>Recycling helps our planet.</b> Which detail fits?|It means less trash goes to the dump.|My bike is blue.|Bananas are yellow.",
    "Topic sentence: <b>Swimming is good exercise.</b> Which detail fits?|It makes your arms and legs stronger.|Snow is cold and white.|Books have many pages.",
    "Topic sentence: <b>Libraries are useful places.</b> Which detail fits?|You can borrow books for free.|Tigers live in the jungle.|My shoes are new.",
    "Topic sentence: <b>Winter is a fun season.</b> Which detail fits?|We can build snowmen and go sledding.|Summer has long, hot days.|Birthday cakes have candles.",
    "Topic sentence: <b>Bees are important insects.</b> Which detail fits?|They carry pollen from flower to flower.|Robins build nests in trees.|Rain falls from clouds.",
    "Topic sentence: <b>Reading is a great hobby.</b> Which detail fits?|Stories take you to new places.|Soccer balls are round.|My desk is brown.",
    "Topic sentence: <b>Our school has a nice garden.</b> Which detail fits?|Students grow carrots and tomatoes there.|The bus comes at eight.|Whales live in the ocean."],
    ["The detail should be about the same topic as the topic sentence.", "Cross out any choice about something else. The right detail gives a fact or example about the topic.", "Example: <b>Apples are a healthy snack.</b> A good detail: they have vitamins and fiber. A bad detail: the sky is blue. Now do yours."],
    [["Topic and details", "🧱", "A paragraph has a <b>topic sentence</b> (the big idea) and <b>details</b> that support it."], ["Fitting details", "🧩", "Good details give facts, reasons or examples about the topic. They stay on topic."], ["Off topic", "🚫", "A detail about something different does not belong, even if it is true. Cross it out when you edit."]]);

  const A17 = mk("Words that give reasons", "💭", [
    "School lunches should have more fruit ___ fruit keeps us healthy.|because|but|or",
    "I like our park. ___, it has a big slide.|For example|However|In the end", "Reading is fun. ___, it helps us learn new words.|Also|But|Because",
    "Some say homework is boring. ___, I think it helps me practice.|However|For example|Also",
    "We should plant a tree. ___, everyone agrees it will help our school.|In conclusion|However|For example",
    "Dogs are better pets than fish ___ dogs can play fetch.|because|but|then",
    "I like soccer. ___, I like basketball more.|However|Because|For example",
    "I want a longer recess ___ kids need time to play.|because|although|until"],
    ["Think about what job the blank has: giving a reason, giving an example, adding more, or showing a different idea?", "Read the sentence before the blank. Does the next part explain why, give an example, or disagree?", "Example: <b>We need a new soccer ball ___ the old one is flat.</b> The second part explains why, so it needs a reason word. Now do yours."],
    [["Opinion writing", "💭", "When you give an opinion, you add <b>reasons</b>. Linking words help the reader follow along."], ["Linking words", "🔗", "<b>because</b> gives a reason. <b>for example</b> gives an example. <b>also</b> adds more. <b>however</b> shows a different idea. <b>in conclusion</b> wraps up."], ["Tip", "💡", "Say your opinion, then say <b>because</b>... Your reason makes your opinion strong."]]);

  const A18 = mk("Combine short sentences", "🪢", [
    "Combine:<br><b>The dog is brown. The dog is friendly.</b>|The dog is brown and friendly.|The dog is brown. And friendly.|Brown the dog friendly is.",
    "Combine:<br><b>Mia likes apples. Mia likes pears.</b>|Mia likes apples and pears.|Mia likes apples Mia likes pears.|Apples Mia likes and pears Mia.",
    "Combine:<br><b>Ben ran fast. Ben ran home.</b>|Ben ran home fast.|Ben ran fast. Ben home.|Fast ran Ben ran home.",
    "Combine:<br><b>We played soccer. We played after school.</b>|We played soccer after school.|We played soccer we played after school.|After school soccer we played played.",
    "Combine:<br><b>The bird sang. The bird was small.</b>|The small bird sang.|The bird sang small the bird.|Sang the bird small.",
    "Combine:<br><b>I packed a sandwich. I packed an apple.</b>|I packed a sandwich and an apple.|I packed a sandwich I packed an apple.|Sandwich an apple I packed and.",
    "Combine:<br><b>The tree is tall. The tree is old.</b>|The tree is tall and old.|The tree is tall the tree is old.|Tall old the tree is and.",
    "Combine:<br><b>Dad washed the car. Dad washed it in the driveway.</b>|Dad washed the car in the driveway.|Dad washed the car Dad washed it in the driveway.|In driveway the car washed Dad the."],
    ["Look for words that repeat in both sentences. You only need to say them once.", "Keep the new information from the second sentence and add it to the first. Use 'and' or move a describing word.", "Example: <b>The cake is big. The cake is yummy.</b> Say cake once: The cake is big and yummy. Now do yours."],
    [["Short and choppy", "🪢", "Lots of short sentences sound choppy: <i>The cat is black. The cat is fluffy.</i>"], ["Combine them", "✨", "Say the repeated part once: <i>The cat is black and fluffy.</i> You can also move a describing word: <i>The fluffy cat.</i>"], ["Check", "✅", "Does the new sentence sound smooth, keep all the facts, and read like real talking?"]]);

  // =============== LEVEL 8 ===============
  const B1 = mk("Simple or compound?", "🔗", lab("What kind of sentence is this?", ["simple sentence", "compound sentence", "fragment"], [
    ["The dog barked loudly.", "simple sentence"], ["The dog barked, and the cat ran away.", "compound sentence"], ["I like tea, but my sister likes juice.", "compound sentence"],
    ["My family went to the lake.", "simple sentence"], ["We could hike, or we could swim.", "compound sentence"], ["Playing in the snow all day.", "fragment"],
    ["Mia and Leo built a fort.", "simple sentence"], ["The sun rose, so the birds sang.", "compound sentence"], ["Over the hills and far away.", "fragment"]]),
    ["Count the complete thoughts, each with its own subject and verb. One thought or two? Or is a piece missing?", "A simple sentence has one complete thought. A compound sentence has two, joined by a comma and a word like and, but, or, so.", "Example: <b>Birds sing.</b> One thought: simple. <b>Birds sing, and bees buzz.</b> Two thoughts: compound. <b>Sitting on a branch.</b> No complete thought: fragment. Now do yours."],
    [["Simple", "1️⃣", "A <b>simple sentence</b> has one subject and one verb (or a pair): <i>Mia and Leo built a fort.</i>"], ["Compound", "2️⃣", "A <b>compound sentence</b> joins two simple sentences with a comma and <b>and, but, or, so</b>."], ["Test", "💡", "Split at the joining word. If both halves can stand alone, it is compound."]]);

  const B2 = mk("Joining words: and, but, or, so", "🧲", [
    "It was raining, ___ we stayed inside.|so|but|or", "I wanted a cookie, ___ the jar was empty.|but|so|or", "You can have milk, ___ you can have juice.|or|but|so",
    "She studied hard, ___ she got a good grade.|so|but|or", "Do you want soup, ___ would you like a sandwich?|or|so|but", "It was late, ___ we kept playing.|but|so|or",
    "The ice melted, ___ the floor got wet.|so|but|or", "Tom was tired, ___ he went to bed early.|so|but|or"],
    ["Read both halves. How are they connected: a result, a surprise, or a choice?", "So shows a result. But shows a surprise or difference. Or gives a choice. And adds on.", "Example: <b>I was hungry, ___ I ate lunch.</b> Eating is the result of being hungry, so use the result word. <b>I was hungry, ___ I did not eat.</b> That is a surprise, so use the but word. Now do yours."],
    [["Joining words", "🧲", "<b>And, but, or, so</b> join two sentences into one. Each has a special job."], ["Jobs", "🧰", "<b>and</b> adds. <b>but</b> shows a difference. <b>or</b> gives a choice. <b>so</b> shows a result."], ["Example", "☔", "It rained, <b>so</b> we stayed in. We wanted to go out, <b>but</b> it rained."]]);

  const B3 = mk("Because, although, while, until", "🧭", [
    "We stayed home ___ it was snowing hard.|because|although|unless", "___ she was tired, she kept walking.|Although|Because|Until", "Wash your hands ___ you eat.|before|until|although",
    "We will play outside ___ it stops raining.|after|although|unless", "___ the movie ended, we went home.|After|Unless|Although", "I will go to the party ___ I finish my chores.|if|although|while",
    "Stay in your seat ___ the bus stops.|until|although|because", "___ it was sunny, the air was cold.|Although|Because|Until", "She sang ___ she washed the dishes.|while|unless|although",
    "He was happy ___ he won the prize.|because|although|unless"],
    ["Read the whole sentence with each choice. Which one makes the idea make sense?", "Because gives a reason. Although shows a surprise. While means at the same time. Until, before and after tell about time.", "Example: <b>___ it was cold, we went swimming.</b> Cold would usually stop us, so it's a surprise: Although. <b>We wore coats ___ it was cold.</b> A reason: because. Now do yours."],
    [["Little bosses", "🧭", "Words like <b>because, although, while, until, if, after</b> start a part that cannot stand alone."], ["Their jobs", "🔧", "<b>because</b> = reason. <b>although</b> = surprise. <b>while</b> = same time. <b>until/before/after</b> = time. <b>if/unless</b> = condition."], ["Tip", "💡", "Say the sentence out loud with each word. Your ear knows what sounds right."]]);

  const B4 = mk("Comma after a starting clause", "🛑", mqr("Where does the comma go?", [
    "When the bell rang we lined up.|after rang|after bell|after we", "After we ate we played outside.|after ate|after we|after played",
    "Because it rained the game was canceled.|after rained|after it|after game", "If you study you will do well.|after study|after you|after will",
    "Although she was shy she raised her hand.|after shy|after she|after raised", "While Dad cooked I set the table.|after cooked|after Dad|after set",
    "Before we left we locked the door.|after left|after we|after locked", "Unless it snows we will have school.|after snows|after it|after will"]),
    ["The sentence begins with a part that cannot stand alone. Find where that part ends and the main part begins.", "When a sentence starts with a because/when/if/after part, put a comma at the end of that part, right before the main part.", "Example: <b>Since it was late we went home.</b> The starter part ends at late, so the comma goes right after late. Now do yours."],
    [["Starter part", "🛑", "A sentence can start with a part like <b>When the bell rang</b>. It is not a full sentence by itself."], ["The comma", ",", "Put a <b>comma</b> after the starter part: <b>When the bell rang,</b> we lined up."], ["Flip it", "🔄", "If the starter part comes last, no comma is needed: We lined up when the bell rang."]]);
  const B5 = mk("Was doing, is doing", "🎬", [
    "Yesterday at noon, I ___ my lunch. (eat)|was eating|am eating|will eating", "Right now, the kids ___ outside. (play)|are playing|were playing|was playing",
    "While Mom ___ dinner, we set the table. (cook)|was cooking|were cooking|is cooking", "The birds ___ when the sun came up. (sing)|were singing|was singing|are singing",
    "At this moment, Dad ___ the car. (wash)|is washing|was washing|were washing", "We ___ a movie when the power went out. (watch)|were watching|was watching|are watching",
    "Look! The cat ___ up the tree. (climb)|is climbing|was climbing|were climbing", "I ___ my bike when I fell. (ride)|was riding|were riding|am riding",
    "They ___ a song right now. (sing)|are singing|were singing|was singing"],
    ["Find the time clue: is it happening right now, or was it going on in the past?", "Past in-progress uses was or were plus -ing. Right-now uses am, is or are plus -ing. Match was/is with one person, were/are with more.", "Example: <b>Last night, the dogs ___ (bark).</b> Past and more than one: were barking. <b>Right now, the dog ___ (bark).</b> Now and one: is barking. Now do yours."],
    [["Long actions", "🎬", "<b>Progressive</b> verbs show an action that goes on over time. They end in <b>-ing</b>."], ["Past and now", "⏪ ⏺️", "Past: I <b>was</b> eating, we <b>were</b> eating. Now: I <b>am</b> eating, she <b>is</b> eating, they <b>are</b> eating."], ["Interrupted", "🔔", "Past progressive often sets the scene when something else happens: I <b>was reading</b> when the phone rang."]]);

  const B6 = mk("Has, have and had", "🧰", [
    "Dad ___ already left for work.|has|have|having", "We ___ lived here for five years.|have|has|having", "By the time we arrived, the movie ___ started.|had|has|have",
    "Mia ___ read four books so far this week.|has|have|having", "The students ___ read three books this month.|have|has|having", "Before I woke up, the sun ___ already risen.|had|has|have",
    "They ___ visited the museum twice this year.|have|has|having", "My brother ___ never tried sushi.|has|have|had", "When Mom got home, we ___ already eaten.|had|has|have"],
    ["Check the subject (one or more than one) and look for time clues like so far, this year, or before.", "Has goes with one person or thing (he, she, it). Have goes with I, you, we, they and more than one. Had is for something finished before another past time.", "Example: <b>Sam ___ finished his chores.</b> One person, up to now: has. <b>The twins ___ finished.</b> More than one: have. Now do yours."],
    [["Perfect tenses", "🧰", "The helper words <b>has, have, had</b> plus a past verb show an action that connects to another time."], ["Has and have", "✅", "<b>She has finished.</b> <b>They have finished.</b> It happened and still matters now."], ["Had", "⏳", "<b>Had</b> shows something that happened <b>before</b> another past thing: When we arrived, the show <b>had</b> started."]]);

  const B7 = mk("Keep the same tense", "🕰️", okr("Which sentence keeps the <b>same tense</b> all the way through?", [
    "Yesterday we walked to the park and played on the swings.|Yesterday we walked to the park and play on the swings.|Yesterday we walk to the park and played on the swings.",
    "Every morning, Dad makes toast and pours juice.|Every morning, Dad makes toast and poured juice.|Every morning, Dad made toast and pours juice.",
    "Last week I visited my aunt and ate her cookies.|Last week I visited my aunt and eat her cookies.|Last week I visit my aunt and ate her cookies.",
    "The class is reading a story and drawing pictures.|The class is reading a story and drew pictures.|The class was reading a story and drawing pictures.",
    "She opened the box and found a puppy.|She opened the box and finds a puppy.|She opens the box and found a puppy.",
    "We grab our coats and run outside.|We grab our coats and ran outside.|We grabbed our coats and run outside.",
    "When it rained, we went inside and played games.|When it rained, we go inside and played games.|When it rains, we went inside and played games.",
    "Tom kicks the ball and scores a goal.|Tom kicks the ball and scored a goal.|Tom kicked the ball and scores a goal."]),
    ["Find the verbs. Do they all tell about the same time: past, or now?", "If one verb is in the past and another is in the present, the tense jumps around. Keep them all the same.", "Example: <b>I ran home and eat dinner.</b> Ran is past but eat is now. Fix: I ran home and ate dinner. Now do yours."],
    [["Tense", "🕰️", "<b>Tense</b> tells when something happens: past, present or future."], ["Stay steady", "🎯", "In a sentence or paragraph, stay in the same tense unless the time really changes."], ["Clue words", "🔎", "<b>Yesterday, last week</b> mean past. <b>Every day, now</b> mean present. Match your verbs to the clue."]]);

  const B8 = mk("Better, best, worse, worst", "🏅", [
    "Today is the ___ day of my life! (good)|best|better|goodest", "This pizza is ___ than that one. (good)|better|best|gooder", "My cold is ___ today than yesterday. (bad)|worse|worst|badder",
    "That was the ___ storm of the year. (bad)|worst|worse|baddest", "This puzzle is ___ difficult than the first.|more|most|very", "She is the ___ talented artist in class.|most|more|mostest",
    "A rabbit is ___ than a turtle. (fast)|faster|fastest|more fast", "Which is the ___ of the three bags? (heavy)|heaviest|heavier|most heavy",
    "This book is ___ interesting than that one.|more|most|many", "The elephant is the ___ animal on land. (big)|biggest|bigger|most big"],
    ["Are you comparing two things, or three or more things?", "Two things use -er (or more). Three or more use -est (or most). Good and bad are special: they change into whole new words.", "Example: <b>My dog is ___ than your dog. (small)</b> Two dogs, so: smaller. <b>He is the ___ dog in town. (small)</b> Many dogs, so: smallest. Now do yours."],
    [["Comparing", "🏅", "We add <b>-er</b> to compare two things and <b>-est</b> to compare three or more: tall, taller, tallest."], ["Long words", "📏", "Long words use <b>more</b> and <b>most</b>: more beautiful, most beautiful. Never use both -er and more."], ["Special ones", "⭐", "<b>good → better → best</b> and <b>bad → worse → worst</b> are different words. There is no gooder or badder!"]]);

  const B9 = mk("Position words", "📍", [
    "We walked ___ the bridge to cross the river.|across|beside|among", "The cat hid ___ the bed, where it was dark.|under|above|across", "Put the milk ___ the fridge to keep it cold.|in|on|beside",
    "The plane flew ___ the clouds, high in the sky.|above|beneath|inside", "The ball rolled ___ the hill to the bottom.|down|into|among", "We sat ___ the campfire in a circle.|around|between|under",
    "She stood ___ her two friends in the line.|between|among|on", "He walked ___ the door and out to the yard.|through|between|beneath"],
    ["Picture what is happening. Where is the thing, or where does it move?", "A preposition shows how two things are connected in place or direction. Say each choice in the sentence.", "Example: <b>The frog jumped ___ the pond. (it landed in the water)</b> The word that fits is into. <b>The frog sat ___ the log. (the log is below it)</b> The word that fits is on. Now do yours."],
    [["Prepositions", "📍", "A <b>preposition</b> shows where, or how things are related: <b>on, in, under, above, between, through</b>."], ["Place and direction", "🧭", "<b>Under</b> the bed. <b>Across</b> the bridge. <b>Down</b> the hill. <b>Around</b> the fire."], ["Between and among", "👥", "<b>Between</b> is for two things. <b>Among</b> is for a group of three or more."]]);

  const B10 = mk("Prepositional phrases", "🧩", mqr("Find the <b>prepositional phrase</b>.", [
    "The book on the shelf is mine.|on the shelf|The book|is mine", "We ate lunch under a tree.|under a tree|We ate|ate lunch",
    "The boy with red hair waved.|with red hair|The boy|waved", "She walked to the store.|to the store|She walked|walked to",
    "A bird flew over the house.|over the house|A bird|bird flew", "The cat slept on the warm couch.|on the warm couch|The cat|slept on",
    "Mom hung the picture above the sofa.|above the sofa|Mom hung|the picture", "I put my shoes by the door.|by the door|I put|my shoes"]),
    ["A prepositional phrase begins with a position word and ends with a noun.", "Find the position word (like in, on, under, over, with, to, by). The phrase runs from it to the noun that follows.", "Example: <b>The fish swam in the pond.</b> The position word is in, the noun is pond: in the pond. Now do yours."],
    [["Phrase", "🧩", "A <b>prepositional phrase</b> starts with a preposition and ends with a noun: <b>on the table</b>."], ["It adds detail", "🔍", "It tells where, when or which one: The cat <b>on the roof</b> is mine."], ["How to find it", "💡", "Look for a position word, then read on until the noun. That whole chunk is the phrase."]]);

  const B11 = mk("I or me?", "🙋", [
    "Mia and ___ went to the park.|I|me|myself", "Dad gave Tom and ___ a snack.|me|I|myself", "Ben and ___ built a fort.|I|me|us",
    "The teacher called Leah and ___.|me|I|mine", "Grandma sent a card to Sam and ___.|me|I|my", "She and ___ are best friends.|I|me|mine",
    "Please sit with Jo and ___.|me|I|my", "Tom and ___ rode our bikes.|I|me|myself", "The coach picked Ella and ___.|me|I|mine"],
    ["Take the other person out. Say the sentence with just the blank. Which word sounds right?", "Use I when you do the action. Use me when the action happens to you, or after words like with, to, for.", "Example: <b>Kim and ___ sang.</b> Without Kim: '___ sang.' I sang is right, so: Kim and I. <b>Mom hugged Kim and ___.</b> 'Mom hugged ___' me. Now do yours."],
    [["I or me", "🙋", "<b>I</b> is the one doing the action. <b>Me</b> is the one the action happens to."], ["The test", "🧪", "Cross out the other person. <i>Tom and I went</i> → <i>I went</i> ✔. <i>Mom called Tom and me</i> → <i>Mom called me</i> ✔."], ["Politeness", "😊", "It is polite to name the other person first: <b>Mia and I</b>, not I and Mia."]]);

  const B12 = mk("Matching pronouns", "👫", [
    "Maria lost ___ backpack.|her|his|their", "The boys put on ___ coats.|their|his|her", "Tom said ___ was hungry.|he|she|they",
    "My sister said ___ would help.|she|he|they", "The girls forgot ___ lunches.|their|her|his", "Mr. Lee read ___ book.|his|her|their",
    "Ana and Ben did ___ homework.|their|her|his", "Mom said ___ would pick us up.|she|he|they"],
    ["A pronoun takes the place of a noun. Who is the noun: a boy, a girl, or more than one person?", "The pronoun has to match the noun: he/his for a boy or man, she/her for a girl or woman, they/their for more than one.", "Example: <b>Grandpa read ___ newspaper.</b> Grandpa is one man, so: his. <b>The twins read ___ books.</b> More than one, so: their. Now do yours."],
    [["Pronouns", "👫", "A <b>pronoun</b> takes the place of a noun so we don't repeat it."], ["Match", "🔗", "<b>he, his</b> = a boy or man. <b>she, her</b> = a girl or woman. <b>they, their</b> = more than one."], ["Example", "💡", "<i>Maria</i> lost <i>Maria's</i> backpack → Maria lost <b>her</b> backpack."]]);

  const B13 = mk("What does the apostrophe do?", "✏️", lab("What does the apostrophe do in this sentence?", ["shows ownership", "joins two words", "makes a plural"], [
    ["The dog's bone is big.", "shows ownership"], ["She's my friend.", "joins two words"], ["My mom's car is blue.", "shows ownership"], ["We can't go.", "joins two words"],
    ["The bird's nest fell.", "shows ownership"], ["It's a sunny day.", "joins two words"], ["Ben's bike is new.", "shows ownership"], ["They're late.", "joins two words"], ["I don't know.", "joins two words"]]),
    ["Try the long form. Can you say two words (like she is) in its place?", "If a long form like 'she is' or 'can not' fits, the apostrophe joins two words. If something belongs to someone, it shows ownership. An apostrophe never makes a plural.", "Example: <b>Sam's hat is red.</b> 'Sam is hat' makes no sense, so it shows ownership. <b>Sam's happy.</b> 'Sam is happy' works, so it joins two words. Now do yours."],
    [["Apostrophe jobs", "✏️", "An apostrophe has two main jobs. It <b>shows ownership</b> and it <b>joins two words</b> (a contraction)."], ["Ownership", "🐕", "<b>The dog's bone</b>: the bone belongs to the dog."], ["Contraction", "🔗", "<b>can't</b> = can not. <b>she's</b> = she is. The apostrophe takes the place of missing letters. It never makes a plural: two cats, not cat's."]]);

  const B14 = mk("Capitals in titles", "📕", [
    "Which word should NOT have a capital letter in this title?<br><br><b>Mud Pies And Magic</b>|And|Pies|Magic", "Which word should NOT have a capital letter in this title?<br><br><b>A Day At the Beach</b>|At|Day|Beach",
    "Which word should NOT have a capital letter in this title?<br><br><b>Friends Of the Forest</b>|Of|Friends|Forest", "Which word should NOT have a capital letter in this title?<br><br><b>My Trip To the Zoo</b>|To|Trip|Zoo",
    "Which word should NOT have a capital letter in this title?<br><br><b>Snow Day At Our School</b>|At|Snow|School", "Which word should NOT have a capital letter in this title?<br><br><b>Cookies And Milk</b>|And|Cookies|Milk",
    "Which word needs a capital letter in this title?<br><br><b>The Dog and the moon</b>|moon|Dog|and", "Which word needs a capital letter in this title?<br><br><b>A Day at the beach</b>|beach|Day|at",
    "Which word needs a capital letter in this title?<br><br><b>my Trip to the Zoo</b>|my|Trip|to", "Which word needs a capital letter in this title?<br><br><b>Snow day at Our School</b>|day|Snow|School",
    "Which word needs a capital letter in this title?<br><br><b>Friends of the forest</b>|forest|Friends|of", "Which word needs a capital letter in this title?<br><br><b>Mud pies and Magic</b>|pies|Mud|Magic"],
    ["Check the first word and the important words. What about the tiny words like a, an, the, and, of, in, at?", "Always capitalize the first word and important words (nouns, verbs, describing words). Keep little words (a, the, and, of, in, at, to) small unless they are first.", "Example: <b>The Cat in the Hat</b>: The (first), Cat and Hat (important), in and the (little, so small). Now do yours."],
    [["Title rules", "📕", "In a title, capitalize the <b>first word</b> and every <b>important word</b>."], ["Little words", "🤏", "Keep small words small: <b>a, an, the, and, but, of, in, on, at, to, for</b>. Exception: if one is the first word, capitalize it."], ["Example", "📖", "<b>The Lion in the Jungle</b>. The (first), Lion, Jungle (important). in and the stay small."]]);
  const B15 = mk("Simile, metaphor or neither?", "🌈", lab("What is this?", ["simile", "metaphor", "literal"], [
    ["Her smile was as bright as the sun.", "simile"], ["The classroom was a zoo.", "metaphor"], ["He ran like the wind.", "simile"], ["The snow was a white blanket on the town.", "metaphor"],
    ["The soup was as hot as lava.", "simile"], ["The cat is sleeping on the sofa.", "literal"], ["Her voice is like honey.", "simile"], ["My room is a messy jungle.", "metaphor"], ["We ate pizza for dinner.", "literal"]]),
    ["Look for the words like or as comparing two things. Is something really being compared?", "A simile compares with like or as. A metaphor says one thing IS another. A literal sentence just says what is true, with no comparing.", "Example: <b>The baby is as quiet as a mouse.</b> Uses as: simile. <b>The baby is a mouse.</b> Says it IS one: metaphor. <b>The baby is sleeping.</b> No comparing: literal. Now do yours."],
    [["Comparing", "🌈", "Writers compare two different things to make a picture in your mind."], ["Simile", "🔗", "A <b>simile</b> uses <b>like</b> or <b>as</b>: She runs <b>like</b> a cheetah. He is <b>as</b> strong <b>as</b> an ox."], ["Metaphor", "🎭", "A <b>metaphor</b> says one thing <b>is</b> another: The classroom <b>was</b> a zoo. (Not really! It was just noisy.)"]]);

  const B16 = mk("Idioms", "🗨️", [
    "What does <b>a piece of cake</b> mean?|very easy|a dessert|very hard", "What does <b>under the weather</b> mean?|feeling sick|standing in the rain|very cold",
    "What does <b>spill the beans</b> mean?|tell a secret|drop some food|make a mess", "What does <b>hit the books</b> mean?|study|throw books|go to the library",
    "What does <b>break the ice</b> mean?|start a friendly talk|crack frozen water|feel cold", "What does <b>once in a blue moon</b> mean?|very rarely|every night|at midnight",
    "What does <b>cost an arm and a leg</b> mean?|be very expensive|hurt someone|be free", "What does <b>it's raining cats and dogs</b> mean?|raining very hard|pets are falling|a light sprinkle",
    "What does <b>the ball is in your court</b> mean?|it is your turn to act|you play tennis|you lost the game"],
    ["An idiom does not mean what the words say. Think about what a person could really mean.", "Picture the words, then ask what silly meaning that gives. The real meaning is a different idea that fits a conversation.", "Example: <b>Let's call it a day</b> does not mean to name a day. It means to stop working for now. <b>Keep your eyes peeled</b> means to watch carefully. Now do yours."],
    [["Idioms", "🗨️", "An <b>idiom</b> is a saying whose meaning is different from the words. <b>Piece of cake</b> is not about cake!"], ["Examples", "🍰 🌧️", "<b>Under the weather</b> = sick. <b>Spill the beans</b> = tell a secret. <b>Hit the books</b> = study."], ["In writing", "✍️", "Idioms make writing lively. But don't use them with readers who might take the words literally."]]);

  const B17 = mk("Sound words in writing", "🔔", lab("Which sound device is used?", ["alliteration", "onomatopoeia", "rhyme"], [
    ["Sally sells seashells.", "alliteration"], ["Boom! went the drum.", "onomatopoeia"], ["The cat sat on the mat.", "rhyme"], ["Peter picked purple plums.", "alliteration"],
    ["The bees buzzed.", "onomatopoeia"], ["The bug hugged the rug.", "rhyme"], ["Splash! The frog jumped in.", "onomatopoeia"], ["Big brown bears bounced.", "alliteration"],
    ["The clock went tick-tock.", "onomatopoeia"], ["A fox in a box.", "rhyme"]]),
    ["Say the sentence out loud and listen. Are words starting with the same sound, ending with the same sound, or copying a noise?", "Alliteration repeats the starting sound. Rhyme repeats the ending sound. Onomatopoeia is a word that sounds like the noise it names.", "Example: <b>Tiny turtles tiptoed.</b> Repeats the T sound at the start: alliteration. <b>The sock is in the clock.</b> Ends match: rhyme. <b>The pot went clang.</b> A noise word: onomatopoeia. Now do yours."],
    [["Alliteration", "🔤", "<b>Alliteration</b> repeats the first sound: <b>S</b>ally <b>s</b>ells <b>s</b>eashells."], ["Onomatopoeia", "💥", "<b>Onomatopoeia</b> words sound like what they mean: <b>buzz, boom, splash, sizzle</b>."], ["Rhyme", "🎵", "<b>Rhymes</b> end with the same sound: <b>cat, hat, mat</b>."]]);

  const B18 = mk("Who is telling the story?", "🎤", lab("Which point of view is this?", ["first person", "second person", "third person"], [
    ["I walked to the store.", "first person"], ["She walked to the store.", "third person"], ["You walk to the store and open the door.", "second person"],
    ["We built a sandcastle.", "first person"], ["The boy found a key.", "third person"], ["My dog chased me around the yard.", "first person"],
    ["They sailed across the sea.", "third person"], ["You turn left at the corner.", "second person"], ["Mr. Chen opened his shop.", "third person"]]),
    ["Look at the pronouns or names. Who is telling the story?", "I, me, my, we mean the storyteller is in the story. You means the reader is in it. He, she, they or names mean someone else is in the story.", "Example: <b>I opened the gift.</b> I: first person. <b>You open the gift.</b> You: second person. <b>Mia opened the gift.</b> A name: third person. Now do yours."],
    [["Point of view", "🎤", "<b>Point of view</b> is who is telling the story."], ["Three kinds", "1️⃣2️⃣3️⃣", "<b>First person</b>: I, me, we. <b>Second person</b>: you. <b>Third person</b>: he, she, they, or a name."], ["Choose one", "🎯", "When you write a story, pick one point of view and stick with it."]]);

  // =============== LEVEL 9 ===============
  const C1 = mk("Complex sentences", "🌳", mqr("Which part is the <b>dependent clause</b> (it cannot stand alone)?", [
    "Because it was raining, we stayed inside.|Because it was raining|we stayed inside|raining, we stayed", "We ate dinner after the sun set.|after the sun set|We ate dinner|dinner after the sun",
    "Although he was tired, Leo finished his run.|Although he was tired|Leo finished his run|he was tired, Leo", "I smile whenever I see my puppy.|whenever I see my puppy|I smile|smile whenever I",
    "Since the store was closed, we went home.|Since the store was closed|we went home|closed, we went", "Mia sang while she cooked.|while she cooked|Mia sang|sang while she",
    "If you finish early, you can read.|If you finish early|you can read|early, you can", "We waited until the bus arrived.|until the bus arrived|We waited|waited until the"]),
    ["A complete sentence can stand by itself. Which part sounds unfinished when you say it alone?", "The dependent clause starts with a little boss word like because, although, when, since, if, while or until.", "Example: <b>When the rain stopped, we went out.</b> 'We went out' stands alone. 'When the rain stopped' leaves you hanging, so that is the dependent clause. Now do yours."],
    [["Two clauses", "🌳", "A <b>clause</b> has a subject and a verb. An <b>independent clause</b> can stand alone. A <b>dependent clause</b> cannot."], ["Complex sentence", "🔗", "A <b>complex sentence</b> has both: <i>Because it was raining</i> (dependent), <i>we stayed inside</i> (independent)."], ["Boss words", "🧭", "Dependent clauses start with words like <b>because, although, when, if, since, while, until, after</b>."]]);

  const C2 = mk("Who, which, that, whose", "🔗", [
    "The girl ___ won the race is my cousin.|who|which|whose", "The book ___ I borrowed was funny.|that|who|whose", "The man ___ dog ran away looked sad.|whose|who|which",
    "I have a friend ___ lives in Spain.|who|which|whose", "The tree, ___ is very old, stands by the lake.|which|who|whose", "The teacher ___ helped me is kind.|who|which|whose",
    "This is the song ___ I love.|that|who|whose", "The boy ___ bike is blue waved at us.|whose|who|which", "The coach ___ whistle is loud ran onto the field.|whose|who|which"],
    ["Is the clause about a person, a thing, or does it show who owns something?", "Who is for people. Which and that are for things. Whose shows that the person or thing owns something that comes next.", "Example: <b>The woman ___ sells fruit is my aunt.</b> A person: who. <b>The fruit ___ she sells is fresh.</b> A thing: that. <b>The woman ___ stand is red is my aunt.</b> Owns the stand: whose. Now do yours."],
    [["Joining with who", "🔗", "<b>Who, which, that, whose</b> help add extra information to a sentence."], ["Who or which?", "👤 📦", "<b>who</b> = people (the girl who sings). <b>which / that</b> = things (the book that I read)."], ["Whose", "🏷️", "<b>whose</b> shows ownership: The boy <b>whose</b> bike is blue."]]);

  const C3 = mk("Must, might, could, should", "🚦", [
    "You ___ wear a helmet when you ride. (it's a rule)|must|might|could", "It ___ rain later. (maybe)|might|must|should", "___ I borrow your pencil? (a polite ask)|May|Must|Should",
    "I ___ swim when I was five. (I was able)|could|should|must", "You ___ brush your teeth every day. (good advice)|should|might|could", "Cars ___ stop at a red light. (it's a law)|must|might|could",
    "We ___ go to the park, or we ___ stay home. (maybe)|might|must|should", "It ___ snow tomorrow. (maybe)|might|must|can"],
    ["Think about how sure or strong the idea is: a rule, advice, a possibility or an ability.", "Must is a rule. Should is advice. Might and may are maybe. Could is a past ability or an option. Can is able to.", "Example: <b>Dogs ___ be on a leash here. (it's a rule)</b> A strong rule word: must. <b>You ___ drink more water. (advice)</b> The advice word: should. Now do yours."],
    [["Helper verbs", "🚦", "<b>Modal verbs</b> are helper verbs that show how strong or sure an idea is. They come before another verb."], ["Strong to weak", "📶", "<b>must</b> (a rule) → <b>should</b> (advice) → <b>might / may</b> (maybe)."], ["Ability", "💪", "<b>Can</b> means able to now. <b>Could</b> means was able to, or it's an option."]]);

  const C4 = mk("Order of describing words", "🗂️", okr("Which sentence puts the describing words in the best order?", [
    "She has a small round wooden box.|She has a wooden round small box.|She has a round wooden small box.", "I saw a big brown dog.|I saw a brown big dog.|I saw a dog big brown.",
    "We ate delicious little red berries.|We ate red little delicious berries.|We ate little red delicious berries.", "He wore a lovely old blue coat.|He wore a blue old lovely coat.|He wore an old lovely blue coat.",
    "There is a tall thin glass vase.|There is a glass thin tall vase.|There is a thin glass tall vase.", "She bought a pretty silver necklace.|She bought a silver pretty necklace.|She bought a necklace pretty silver.",
    "Dad drives a new red truck.|Dad drives a red new truck.|Dad drives a truck red new.", "A huge ancient stone castle stood on the hill.|A stone ancient huge castle stood on the hill.|An ancient stone huge castle stood on the hill.",
    "I found three small shiny coins.|I found small three shiny coins.|I found shiny small three coins."]),
    ["Say each choice out loud. One will sound smooth and natural, the others will sound odd.", "A pattern: how many, then opinion, size, age, shape, color, and last the material it is made of.", "Example: <b>a ___ ___ ___ bag</b> with the words red, big and nice. The smooth order is a nice big red bag: opinion, size, color. Now do yours."],
    [["Smooth order", "🗂️", "When you use more than one describing word, there is a natural order."], ["The pattern", "📋", "<b>number → opinion → size → age → shape → color → material</b>. A <i>lovely old blue</i> coat. A <i>small round wooden</i> box."], ["Trust your ear", "👂", "You already know this. 'A green big frog' just sounds wrong; 'a big green frog' sounds right."]]);

  const C5 = mk("Commas after opening phrases", "🌅", mqr("Where does the comma go?", [
    "After lunch we went to the park.|after lunch|after we|after went", "In the morning the birds sing.|after morning|after the|after birds",
    "At the end of the day we cleaned up.|after day|after end|after we", "Without a sound the cat crept in.|after sound|after a|after cat",
    "During the storm we stayed inside.|after storm|after the|after we", "Before bed I read a book.|after bed|after Before|after I",
    "Under the old bridge a frog lives.|after bridge|after old|after frog", "For my birthday I got a kite.|after birthday|after my|after I"]),
    ["Find where the opening group of words ends and the main sentence starts.", "When a sentence starts with a phrase that tells when or where, put a comma right after the whole phrase, not in the middle of it.", "Example: <b>On Saturday we went fishing.</b> The opening phrase ends at Saturday, so the comma goes right after it. Now do yours."],
    [["Opening phrases", "🌅", "Many sentences start with a <b>phrase</b> that tells when or where: <i>After lunch</i>, <i>Under the bridge</i>."], ["The comma", ",", "Put a comma after the opening phrase, before the main part."], ["Short ones", "✋", "Very short phrases are sometimes written without the comma, but using it is always safe."]]);
  const C6 = mk("Fix the comma splice", "🩹", mqr("Which choice fixes the <b>comma splice</b>?", [
    "The movie was long, we enjoyed it.|The movie was long, but we enjoyed it.|The movie was long, we enjoyed it.|The movie was long, or we enjoyed it.",
    "It is cold, I need a coat.|It is cold, so I need a coat.|It is cold, I need a coat.|It is cold, or I need a coat.",
    "Tom plays guitar, Ana plays drums.|Tom plays guitar, and Ana plays drums.|Tom plays guitar, Ana plays drums.|Tom plays guitar, or Ana plays drums.",
    "The sun rose, the birds sang.|The sun rose. The birds sang.|The sun rose, the birds sang.|The sun rose, or the birds sang.",
    "I was hungry, I made a sandwich.|I was hungry, so I made a sandwich.|I was hungry, I made a sandwich.|I was hungry, or I made a sandwich.",
    "She studied hard, she passed the test.|She studied hard, and she passed the test.|She studied hard, she passed the test.|She studied hard, or she passed the test.",
    "Dogs bark, cats meow.|Dogs bark. Cats meow.|Dogs bark, cats meow.|Dogs bark, or cats meow.",
    "The pool was closed, we went to the park.|The pool was closed, so we went to the park.|The pool was closed, we went to the park.|The pool was closed, or we went to the park."]),
    ["A comma splice sticks two complete sentences together with only a comma. Is a comma strong enough to do that?", "A comma alone cannot join two sentences. Fix it with a period and a capital, or with a comma plus a joining word that makes sense.", "Example: <b>I was sleepy, I went to bed.</b> Fix: I was sleepy, so I went to bed. Or: I was sleepy. I went to bed. Now do yours."],
    [["Comma splice", "🩹", "A <b>comma splice</b> joins two complete sentences with only a comma: <i>I ran, I fell.</i>"], ["Fixes", "🔧", "1) a period: <i>I ran. I fell.</i> 2) comma + joining word: <i>I ran, and I fell.</i> 3) a semicolon: <i>I ran; I fell.</i>"], ["Not a fix", "⚠️", "Taking out the comma only gives a <b>run-on</b>, which is still wrong."]]);

  const C7 = mk("Commas around extra information", "➕", mqr("Which extra information needs commas on <b>both sides</b>?", [
    "My dog Max loves to swim.|Max|My dog|loves to swim", "Mr. Lee our principal spoke first.|our principal|Mr. Lee|spoke first",
    "Paris the capital of France is beautiful.|the capital of France|Paris|is beautiful", "My cousin a doctor lives nearby.|a doctor|My cousin|lives nearby",
    "Ms. Ortiz my art teacher paints murals.|my art teacher|Ms. Ortiz|paints murals", "The Nile a long river flows north.|a long river|The Nile|flows north",
    "Jupiter the largest planet has many moons.|the largest planet|Jupiter|has many moons", "Our school mascot a tiger is orange.|a tiger|Our school mascot|is orange"]),
    ["Find the bit that renames a person or thing right beside it. The sentence would still work without it.", "Cover up each choice. If the sentence still makes sense without it, and it just adds extra information, that bit gets a comma before and after.", "Example: <b>My teacher Mr. Ray likes jazz.</b> Cover Mr. Ray and it still works, and it renames the teacher: My teacher, Mr. Ray, likes jazz. Now do yours."],
    [["Extra information", "➕", "An <b>appositive</b> renames a noun right beside it: <i>my dog, Max,</i> or <i>Paris, the capital of France,</i>."], ["Two commas", ", ... ,", "Put a comma <b>before and after</b> the extra information, like a pair of brackets."], ["Test", "✂️", "Cover it up. If the sentence still works (<i>My dog loves to swim.</i>), the extra bit needs commas."]]);

  const C8 = mk("Split quotations", "🗯️", mqr("What punctuation belongs right after the speaker?", [
    "“I'm tired,” said Ana__ “so I'm going to bed.”|a comma|a period|a question mark", "“We can go,” Mia said__ “after lunch.”|a comma|a period|a question mark",
    "“I am ready,” said Leo__ “Let's go!”|a period|a comma|a question mark", "“It is late,” said Gran__ “Time for bed.”|a period|a comma|a question mark",
    "“If you finish,” said Mom__ “you may play.”|a comma|a period|a question mark", "“Wait,” whispered Ben__ “I hear something.”|a period|a comma|a question mark",
    "“My dog,” said Sam__ “loves bath time.”|a comma|a period|a question mark", "“Come here,” said Dad__ “It is time to eat.”|a period|a comma|a question mark"]),
    ["Read the spoken words as a whole. Is the second part a continuation of the same sentence, or does it start a brand new one?", "If the second part continues the same sentence, it starts with a small letter and needs a pause mark. If it begins with a capital letter, it is a new sentence, so the speaker part ends the first one.", "Example: <b>“Come in,” said Gran__ “and sit down.”</b> It's one sentence (small 'and'), so a pause mark. <b>“Come in,” said Gran__ “Sit down.”</b> A new sentence (capital 'Sit'), so a full stop. Now do yours."],
    [["Split speech", "🗯️", "Sometimes the speaker's name comes in the middle of what they say: <i>“I'm tired,” said Ana, “so I'm going to bed.”</i>"], ["Same sentence", "🔗", "If the speech is one sentence, use commas around the speaker and start the second part with a <b>small letter</b>."], ["New sentence", "🆕", "If the second part is a new sentence, end with a <b>period</b> and start with a <b>capital</b>: <i>“I'm ready,” said Leo. “Let's go!”</i>"]]);
  const C9 = mk("Word roots", "🌱", [
    "The root <b>tele</b> means far. A <b>telescope</b> helps you see things that are ___.|far away|very close|under water",
    "The root <b>bio</b> means life. <b>Biology</b> is the study of ___.|living things|rocks|weather",
    "The root <b>geo</b> means earth. <b>Geology</b> is the study of the ___.|earth and its rocks|stars|ocean fish",
    "The root <b>photo</b> means light. A <b>photograph</b> is a picture made with ___.|light|paint|sound",
    "The root <b>port</b> means carry. A <b>porter</b> ___ bags.|carries|cleans|counts",
    "The root <b>aud</b> means hear. An <b>audience</b> is a group that ___.|listens|sleeps|cooks",
    "The root <b>therm</b> means heat. A <b>thermometer</b> measures ___.|temperature|weight|time",
    "The root <b>vis</b> means see. If something is <b>visible</b>, you can ___ it.|see|hear|smell",
    "The root <b>scrib</b> means write. A <b>scribe</b> is a person who ___.|writes|runs|sings",
    "The root <b>struct</b> means build. To <b>construct</b> a house is to ___ it.|build|paint|sell",
    "The root <b>aqua</b> means water. An <b>aquarium</b> is a place with ___.|water and fish|sand and cactus|snow and ice"],
    ["Find the root inside the big word. Think about what the root means.", "Use the meaning of the root in the sentence. Does the big word fit with that idea?", "Example: <b>The root <i>spect</i> means look. A spectator is a person who ___.</b> Look → watches. So a spectator watches. Now do yours."],
    [["Roots", "🌱", "Many English words are built from <b>roots</b> from Greek and Latin. If you know the root, you can guess new words."], ["Examples", "🔭", "<b>tele</b> = far (telescope, telephone). <b>bio</b> = life. <b>port</b> = carry (transport). <b>aud</b> = hear (audio). <b>struct</b> = build."], ["Detective", "🕵️", "When you meet a long word, look for a root you know. It's like a clue!"]]);

  const C10 = mk("Same word, different meaning", "🔀", [
    "<b>The bat flew out of the cave at night.</b> Here, <b>bat</b> means ___.|a flying animal|a stick for hitting a ball|to blink",
    "<b>He swung the bat and hit a home run.</b> Here, <b>bat</b> means ___.|a stick for hitting a ball|a flying animal|to blink",
    "<b>The bark of the old oak was rough.</b> Here, <b>bark</b> means ___.|a tree's outer covering|a dog's sound|a type of boat",
    "<b>The dog began to bark at the mail carrier.</b> Here, <b>bark</b> means ___.|a dog's sound|a tree's outer covering|a type of boat",
    "<b>We sat on the bank of the river.</b> Here, <b>bank</b> means ___.|the land beside water|a place for money|to tilt",
    "<b>Dad put some money in the bank.</b> Here, <b>bank</b> means ___.|a place that keeps money|the land beside water|to tilt",
    "<b>Please close the door.</b> Here, <b>close</b> means ___.|to shut|near|to hide",
    "<b>The store is close to my house.</b> Here, <b>close</b> means ___.|near|to shut|to hide",
    "<b>I wore a ring on my finger.</b> Here, <b>ring</b> means ___.|a circle of jewelry|to make a bell sound|to run in circles",
    "<b>Listen for the doorbell to ring.</b> Here, <b>ring</b> means ___.|to make a bell sound|a circle of jewelry|to run in circles"],
    ["Many words have more than one meaning. Read the whole sentence for clues.", "Look at the other words around it. Which meaning would make the sentence make sense?", "Example: <b>The fan kept me cool in summer.</b> Fan with cool and summer means a machine that moves air. <b>I am a big fan of soccer.</b> Fan with soccer means someone who loves it. Now do yours."],
    [["Many meanings", "🔀", "Some words have <b>more than one meaning</b>. A <b>bat</b> can be an animal or a stick."], ["Clues", "🔎", "The words around it, called the <b>context</b>, show which meaning is used."], ["Sound change", "🔊", "A few, like <b>close</b> (shut / near), are even said differently. Context tells you which."]]);

  const C11 = mk("Context clues", "🕵️", [
    "The <b>arid</b> desert had no water for miles. <b>Arid</b> means ___.|very dry|very wet|very cold",
    "The <b>enormous</b> whale was bigger than our boat. <b>Enormous</b> means ___.|very large|very small|very fast",
    "The <b>timid</b> kitten hid under the bed, afraid of every noise. <b>Timid</b> means ___.|shy and scared|brave|noisy",
    "The <b>ancient</b> temple had stood for thousands of years. <b>Ancient</b> means ___.|very old|brand new|very tall",
    "The <b>fragile</b> glass broke easily when it fell. <b>Fragile</b> means ___.|easy to break|very heavy|colorful",
    "She was <b>delighted</b>: she clapped and smiled wide. <b>Delighted</b> means ___.|very happy|very tired|confused",
    "After the long race, Max was <b>exhausted</b> and fell asleep. <b>Exhausted</b> means ___.|very tired|very hungry|very angry",
    "Our <b>generous</b> neighbor shared her food with everyone. <b>Generous</b> means ___.|happy to give|very rich|very loud"],
    ["The sentence itself gives clues to the meaning of the unknown word. Find them.", "Look at the words and ideas next to the hard word. What is happening around it?", "Example: <b>The room was <i>silent</i>; you could not hear a sound.</b> The clue 'could not hear a sound' shows silent means quiet. Now do yours."],
    [["Detective work", "🕵️", "When you don't know a word, don't stop! The words around it give <b>context clues</b>."], ["Where to look", "🔎", "Look for a <b>definition</b>, an <b>example</b>, an <b>opposite</b> or a <b>description</b> in the same sentence."], ["Check", "✅", "Put your guess in place of the word. Does the sentence still make sense?"]]);

  const C12 = mk("Word feelings", "💛", [
    "Which word sounds more <b>positive</b> for someone who spends carefully?|thrifty|cheap|stingy", "Which word sounds more <b>positive</b> for a person who likes to be different?|unique|weird|odd",
    "Which word sounds more <b>positive</b> for a small house?|cozy|cramped|tiny", "Which word sounds more <b>positive</b> for someone who stays calm?|relaxed|lazy|dull",
    "Which word sounds more <b>negative</b>?|stubborn|determined|firm", "Which word sounds more <b>negative</b>?|nosy|curious|interested",
    "Which word sounds more <b>negative</b>?|bossy|confident|helpful", "Which word sounds more <b>negative</b> for a thin person?|skinny|slim|lean",
    "Which word sounds more <b>positive</b> for someone who talks a lot?|friendly|chatty|babbling", "Which word sounds more <b>negative</b>?|sneaky|careful|quiet"],
    ["Words with the same basic meaning can give different feelings. How would you feel if someone called you this?", "Pick the one that would make the person feel good (positive) or bad (negative), depending on the question.", "Example: <b>Which sounds more positive: slim or scrawny?</b> Slim sounds kind; scrawny sounds unkind, so slim is positive. Now do yours."],
    [["Word feelings", "💛", "Words can mean nearly the same thing but give a different <b>feeling</b>. This is called <b>connotation</b>."], ["Examples", "⚖️", "<b>thrifty</b> (good) vs <b>stingy</b> (bad). <b>curious</b> (good) vs <b>nosy</b> (bad)."], ["Choose carefully", "🎯", "Good writers pick the word with the right feeling for their message."]]);

  const C13 = mk("Personification and hyperbole", "🎭", lab("What does this sentence use?", ["personification", "hyperbole", "literal"], [
    ["The wind whispered through the trees.", "personification"], ["I have told you a million times!", "hyperbole"], ["The sun smiled down on the beach.", "personification"],
    ["I am so hungry I could eat a horse.", "hyperbole"], ["The flowers danced in the breeze.", "personification"], ["My backpack weighs a ton.", "hyperbole"],
    ["The cat drank water from the bowl.", "literal"], ["The old house groaned in the storm.", "personification"], ["This line is taking forever.", "hyperbole"],
    ["We walked to the park after lunch.", "literal"], ["The moon winked at us.", "personification"]]),
    ["Does the sentence give a human action to something that isn't human, or does it exaggerate hugely? Or is it plain and true?", "Personification: a non-human thing does a human action (smile, dance, whisper). Hyperbole: a big exaggeration that cannot be true. Literal: just plain facts.", "Example: <b>The clouds were crying.</b> Clouds can't cry like people: personification. <b>I'm so tired I could sleep for a year.</b> Too big to be true: hyperbole. <b>The clouds were gray.</b> True and plain: literal. Now do yours."],
    [["Personification", "🎭", "<b>Personification</b> gives human actions to things that aren't human: <i>The sun smiled.</i>"], ["Hyperbole", "🎈", "<b>Hyperbole</b> is a giant exaggeration: <i>I've told you a million times!</i> Nobody thinks it is exactly true."], ["Why use them?", "✨", "Writers use them to make writing lively and fun. Literal writing just states the plain facts."]]);

  const C14 = mk("Show, don't tell", "🎬", okr("Which sentence <b>shows</b> the feeling instead of just telling it?", [
    "Her hands shook and her heart pounded as she stepped on stage.|She was very nervous.|She felt really nervous.",
    "Ben jumped up, shouting and pumping his fists.|Ben was excited.|Ben felt very excited.", "Tears rolled down Mia's cheeks as she waved goodbye.|Mia was sad.|Mia felt really sad.",
    "The dog's tail drooped and he hid under the table.|The dog was scared.|The dog felt afraid.", "Dad's face turned red and he clenched his fists.|Dad was angry.|Dad felt mad.",
    "Ana grinned from ear to ear and hugged her gift.|Ana was happy.|Ana felt joyful.", "Leo yawned, rubbed his eyes and dropped onto the couch.|Leo was tired.|Leo felt sleepy.",
    "The cold made Sam's teeth chatter and his fingers turn pink.|Sam was cold.|Sam felt chilly."]),
    ["One sentence names the feeling. Another lets the reader see what the person does.", "Showing uses actions, body signals and what you can see or hear, instead of naming the feeling word.", "Example: <b>She was bored.</b> That tells. Showing: She tapped her pencil and stared out the window. Now do yours."],
    [["Telling", "🗣️", "<b>Telling</b> names the feeling: <i>He was scared.</i> It is short, but not very exciting."], ["Showing", "🎬", "<b>Showing</b> lets the reader see it: <i>His knees shook and he gripped the blanket.</i>"], ["Try it", "✏️", "Ask: what would I see, hear or feel if someone had this feeling? Then write that."]]);

  const C15 = mk("The five senses", "👃", [
    "Which sense? <b>The sweet smell of cinnamon filled the kitchen.</b>|smell|sound|touch|taste", "Which sense? <b>The thunder boomed and rattled the windows.</b>|sound|sight|taste|smell",
    "Which sense? <b>The sandpaper felt rough and scratchy against my hand.</b>|touch|sound|sight|taste", "Which sense? <b>The lemon was so sour it made my mouth pucker.</b>|taste|smell|sound|touch",
    "Which sense? <b>Bright red and gold leaves covered the ground.</b>|sight|touch|sound|smell", "Which sense? <b>The campfire crackled and popped.</b>|sound|sight|taste|touch",
    "Which sense? <b>The soup tasted salty and rich.</b>|taste|smell|sound|sight", "Which sense? <b>The kitten's fur was soft and fluffy under my fingers.</b>|touch|taste|smell|sound",
    "Which sense? <b>Fresh bread smelled warm and buttery from the oven.</b>|smell|taste|sound|sight"],
    ["Which part of the body would you use to notice this detail?", "Eyes see, ears hear, nose smells, tongue tastes, skin touches. Find the word that points to one of them.", "Example: <b>The siren wailed down the street.</b> You use your ears, so: sound. <b>The ice was freezing against my palm.</b> Your skin: touch. Now do yours."],
    [["Five senses", "👃", "<b>Sight, sound, smell, taste, touch</b>. Good writers use them all."], ["Sensory details", "🌈", "Sensory details help readers feel like they are there: <i>the warm, buttery smell of fresh bread</i>."], ["Try it", "✏️", "When you describe a place, ask: what can I see, hear, smell, taste and touch?"]]);

  const C16 = mk("Strong evidence", "📊", [
    "Claim: <b>Sleep is important for kids.</b> Which is the best evidence?|Doctors say kids who sleep enough think and learn better.|I like my blue pillow.|Beds come in many sizes.",
    "Claim: <b>Walking to school is healthy.</b> Which is the best evidence?|Walking is exercise that makes your heart stronger.|My school is big.|I wear green shoes.",
    "Claim: <b>Bees are helpful.</b> Which is the best evidence?|Bees move pollen so plants can make fruit and seeds.|Honey is sticky.|Bees are yellow and black.",
    "Claim: <b>Reading every day builds strong readers.</b> Which is the best evidence?|Kids who read daily learn more words and read faster.|Books come in many colors.|The library is quiet.",
    "Claim: <b>Our school should plant a garden.</b> Which is the best evidence?|A garden would give us fresh vegetables for lunch.|Gardens are green.|Some people like flowers.",
    "Claim: <b>Exercise is good for you.</b> Which is the best evidence?|Moving your body makes your heart and muscles stronger.|Sneakers are comfortable.|The gym opens early.",
    "Claim: <b>Recycling paper helps trees.</b> Which is the best evidence?|Recycled paper means fewer trees must be cut down.|Paper is white.|I wrote a note yesterday.",
    "Claim: <b>Our town needs a bigger library.</b> Which is the best evidence?|The small room is full every afternoon and kids must wait for seats.|Libraries have shelves.|I like stories."],
    ["Evidence is a fact or reason that proves the claim. Which choice actually explains why the claim is true?", "Cross out answers that are about something else or just a preference. The best evidence connects directly to the claim.", "Example: <b>Claim: Dogs need walks.</b> Evidence: walking gives dogs exercise and keeps them healthy. Not evidence: dogs have fur. Now do yours."],
    [["Claim", "📊", "A <b>claim</b> is the main point you want people to believe: <i>Recess helps students learn.</i>"], ["Evidence", "🔎", "<b>Evidence</b> is a fact, reason or example that supports the claim."], ["Strong or weak", "💪", "Strong evidence is true and connects directly to the claim. Weak evidence is off-topic or only says what you like."]]);

  const C17 = mk("Closing sentences", "🏁", [
    "Which is the best <b>concluding sentence</b> for a paragraph about why dogs make great pets?|That is why dogs make such loyal, loving pets.|Dogs have four legs.|Another reason is that dogs bark.",
    "Which is the best <b>concluding sentence</b> for a paragraph about recycling?|By recycling, we all help keep our planet clean.|Plastic can be shaped in many ways.|I put cans in a blue bin.",
    "Which is the best <b>concluding sentence</b> for a paragraph about reading?|Reading is a fun way to learn and imagine.|Books have covers.|My brother reads on the bus.",
    "Which is the best <b>concluding sentence</b> for a paragraph about swimming?|Swimming keeps our bodies strong and is fun, too.|Pools can be big or small.|First, put on your goggles.",
    "Which is the best <b>concluding sentence</b> for a paragraph about school gardens?|A school garden helps us learn and eat well.|Tomatoes are red.|Seeds go in the soil.",
    "Which is the best <b>concluding sentence</b> for a paragraph about sleep?|Getting enough sleep helps us feel and do our best.|Beds have pillows.|Some people dream in color.",
    "Which is the best <b>concluding sentence</b> for a paragraph about libraries?|A library is a wonderful place for everyone to explore.|Shelves are made of wood.|I borrowed three books.",
    "Which is the best <b>concluding sentence</b> for a paragraph about bees?|Bees are small, but they do a very big job.|Bees live in hives.|One bee flew by my window."],
    ["The ending wraps up the big idea. It should remind us of the topic, not start something new.", "A good closing sentence connects back to the main idea. It does not add a brand new detail or change the subject.", "Example: <b>Topic: Cats are great pets.</b> A good ending: Cats are clean, quiet friends. A poor ending: Fish live in water. Now do yours."],
    [["Closing", "🏁", "A <b>concluding sentence</b> ends a paragraph. It wraps up the big idea."], ["Good closers", "✅", "It connects to the topic sentence and sums up: <i>That is why ... </i>, <i>In the end, ...</i>"], ["Don't", "🚫", "Don't add a new detail or start a new topic in your last sentence."]]);

  const C18 = mk("Mix-up words", "🔀", [
    "Loud noise can ___ your hearing.|affect|effect|defect", "The medicine had a good ___.|effect|affect|defect", "Mia is taller ___ her brother.|than|then|that",
    "First we ate, ___ we played.|then|than|that", "Be careful not to ___ your keys.|lose|loose|loss", "My tooth is ___ and might fall out.|loose|lose|loss",
    "Everyone ___ Tom came to the party.|except|accept|expect", "Please ___ this gift from me.|accept|except|expect", "I ___ it will rain today. (I think it will)|expect|accept|except",
    "Cold weather can ___ how plants grow.|affect|effect|defect"],
    ["These words look and sound alike. Think about each one's meaning.", "Affect is an action (to change something). Effect is the result (a thing). Than compares. Then is about time. Lose is to not keep; loose is not tight. Accept is to take; except is to leave out.", "Example: <b>Rain can ___ our plans.</b> To change is an action: affect. <b>The rain had a big ___.</b> The result: effect. <b>This is better ___ that.</b> Comparing: than. Now do yours."],
    [["Look-alikes", "🔀", "Some words look and sound alike but have different meanings."], ["Pairs", "👯", "<b>affect</b> (to change) / <b>effect</b> (a result). <b>than</b> (compare) / <b>then</b> (next). <b>lose</b> (not keep) / <b>loose</b> (not tight). <b>accept</b> (take) / <b>except</b> (leave out)."], ["Trick", "💡", "<b>A</b>ffect is an <b>A</b>ction. <b>E</b>ffect is the <b>E</b>nd result. <b>Then</b> is about <b>time</b>."]]);

  Object.assign(WRITING_LEVELS, {
    7: [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18,
      MIX("Mixed practice", A1, A4, A8, A10, A12), MIX("Level 7 Challenge", A2, A3, A5, A6, A9, A13, A16, A18)],
    8: [B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17, B18,
      MIX("Mixed practice", B1, B3, B6, B9, B11), MIX("Level 8 Challenge", B2, B4, B5, B8, B10, B13, B15, B18)],
    9: [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, C17, C18,
      MIX("Mixed practice", C1, C2, C5, C9, C13), MIX("Level 9 Challenge", C3, C6, C8, C10, C12, C15, C16, C18)]
  });
})();
