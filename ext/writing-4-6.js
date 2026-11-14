// ext/writing-4-6.js  Mind Lab Writing & Grammar, levels 4-6 (60 lessons)
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
  // classify helper: map {label:[words]} -> rows
  const cls = (map, tmpl) => {
    const labels = Object.keys(map), out = [];
    labels.forEach(l => map[l].forEach(w => out.push([tmpl.replace("{w}", w), l, ...labels.filter(x => x !== l)].join("|"))));
    return out;
  };

  // =============== LEVEL 4 ===============
  const A1 = mk("Nouns: naming words", "🏷️", cls({ person: ["teacher", "doctor", "baker", "farmer", "pilot", "sister"], place: ["park", "beach", "library", "zoo", "farm", "kitchen"], animal: ["frog", "tiger", "duck", "whale", "rabbit", "goat"], thing: ["spoon", "kite", "chair", "book", "drum", "ball"] }, "Is <b>{w}</b> a person, a place, an animal or a thing?"),
    ["A noun is a naming word. Ask yourself: can I meet it, visit it, pet it or hold it?", "People do jobs. Places are where you go. Animals are alive and they are not people. Things are objects you can hold.", "Example: <b>nurse</b> is someone who helps sick people, so it is a person. <b>Pond</b> is where ducks swim, so it is a place. Now do yours."],
    [["What is a noun?", "🏷️", "A <b>noun</b> names a <b>person</b>, a <b>place</b>, an <b>animal</b> or a <b>thing</b>."], ["Examples", "👩‍🏫 🏫 🐸 ⚽", "<b>teacher</b> is a person. <b>school</b> is a place. <b>frog</b> is an animal. <b>ball</b> is a thing."], ["Tip", "💡", "Try putting <b>the</b> in front of the word. <b>The zoo</b> works, so zoo is a noun."]]);
  const A2 = mk("Special names", "🌎", [
    "Which word is a <b>special name</b> (proper noun)?|Monday|day|week", "Which word is a <b>special name</b> (proper noun)?|Canada|country|map",
    "Which word is a <b>special name</b> (proper noun)?|Rex|dog|bone", "Which word is a <b>special name</b> (proper noun)?|Florida|state|sun",
    "Which word is a <b>special name</b> (proper noun)?|Lake Erie|lake|water", "Which word is a <b>special name</b> (proper noun)?|Mount Everest|mountain|hill",
    "Which word is a <b>special name</b> (proper noun)?|Spot|puppy|collar", "Which word is a <b>special name</b> (proper noun)?|Tuesday|morning|clock",
    "Which word needs a capital letter in this sentence?<br><b>We flew to france.</b>|france|flew|we"],
    ["A special name is the name of one exact person, place or thing.", "Special names always start with a capital letter. Find the one that names one exact thing.", "Example: <b>city</b> is any city, but <b>Chicago</b> is one exact city, so Chicago is the special name. Now do yours."],
    [["Special names", "🌎", "A <b>proper noun</b> is the special name of one exact person, place or thing. It starts with a <b>capital letter</b>."], ["Compare", "dog → Max", "<b>dog</b> is any dog. <b>Max</b> is one exact dog. <b>girl</b> → <b>Ella</b>. <b>country</b> → <b>Japan</b>."], ["Tip", "💡", "Days, months, towns, countries and pet names all start with capital letters."]]);
  const PL = [["box", "boxes", "boxs", "boxies"], ["dish", "dishes", "dishs", "dishies"], ["bus", "buses", "buss", "busies"], ["fox", "foxes", "foxs", "foxies"], ["church", "churches", "churchs", "churchies"], ["brush", "brushes", "brushs", "brushies"], ["glass", "glasses", "glass's", "glassies"], ["wish", "wishes", "wishs", "wishies"]];
  const A3 = mk("More than one: s and es", "📦", PL.map(r => `Which word means <b>more than one ${r[0]}</b>?|${r[1]}|${r[2]}|${r[3]}`),
    ["To mean more than one, you usually add an ending to the word. Which ending?", "If a word ends in <b>s, x, ch or sh</b>, it needs <b>es</b> so you can say it.", "Example: <b>watch</b> ends in ch, so you add es: <b>watches</b>. But <b>cat</b> just adds s: cats. Now do yours."],
    [["Adding s", "🐱 → 🐱🐱", "Most words just add <b>s</b>: cat → cats, dog → dogs."], ["Adding es", "📦 → boxes", "If a word ends in <b>s, x, ch or sh</b>, add <b>es</b>: bus → buses, fox → foxes, dish → dishes."], ["Say it", "👂", "Say the word out loud. You can hear the extra part: box-<b>es</b>."]]);
  const A4 = mk("Action words", "🏃", [
    "Which word is the action (verb)?<br><b>The cat jumped over the log.</b>|jumped|cat|log", "Which word is the action (verb)?<br><b>Birds sing in the morning.</b>|sing|Birds|morning",
    "Which word is the action (verb)?<br><b>The boy kicks the ball.</b>|kicks|boy|ball", "Which word is the action (verb)?<br><b>We paint a picture.</b>|paint|We|picture",
    "Which word is the action (verb)?<br><b>My sister swims fast.</b>|swims|sister|fast", "Which word is the action (verb)?<br><b>The bear climbs a tree.</b>|climbs|bear|tree",
    "Which word is the action (verb)?<br><b>Dad stirs the soup.</b>|stirs|Dad|soup", "Which word is the action (verb)?<br><b>The rabbit hops away.</b>|hops|rabbit|away"],
    ["A verb tells what someone or something does. What is the doing word?", "Ask: what is happening? Skip the naming words and look for the action.", "Example: <b>The girl reads a book.</b> The action is <b>reads</b>. Girl and book are naming words. Now do yours."],
    [["Verbs", "🏃", "A <b>verb</b> is an action word. It tells what someone or something does."], ["Examples", "🐸 hops · 🐦 flies · 🧒 runs", "<b>hops</b>, <b>flies</b> and <b>runs</b> are all verbs."], ["Tip", "💡", "Act it out! If you can do it with your body, it is probably a verb."]]);
  const IP = [["run", "ran", "runned", "running", "Yesterday I ___ to the park."], ["eat", "ate", "eated", "eats", "Last night we ___ pizza."], ["see", "saw", "seed", "seen", "Yesterday I ___ a rainbow."], ["go", "went", "goed", "going", "Last week we ___ to the zoo."], ["give", "gave", "gived", "gives", "Grandma ___ me a gift yesterday."], ["sit", "sat", "sitted", "sits", "The cat ___ on my lap earlier."], ["swim", "swam", "swimmed", "swims", "We ___ in the lake yesterday."], ["make", "made", "maked", "makes", "Mom ___ a cake last Sunday."]];
  const A5 = mk("Tricky past words", "⏪", IP.map(r => `${r[4]}<br>(verb: ${r[0]})|${r[1]}|${r[2]}|${r[3]}`),
    ["The sentence says yesterday or last week, so the action already happened. Use the past word.", "Some verbs do not take -ed. They change into a whole new word when they are in the past.", "Example: <b>Yesterday I (fly) a kite.</b> Fly changes to <b>flew</b>, not flyed. Now do yours."],
    [["Past tense", "⏪", "<b>Past</b> words tell what already happened. Many add <b>-ed</b>: jump → jumped."], ["Tricky ones", "come → came · get → got", "Some verbs change completely: <b>come → came</b>, <b>get → got</b>, <b>stand → stood</b>."], ["Tip", "💡", "Say it out loud. \"Goed\" sounds funny, but \"went\" sounds right."]]);
  const A6 = mk("Now or before?", "⏰", [
    "Does this sentence tell about now or before?<br><b>The dog barked.</b>|before|now", "Does this sentence tell about now or before?<br><b>The dog barks.</b>|now|before",
    "Does this sentence tell about now or before?<br><b>We played outside.</b>|before|now", "Does this sentence tell about now or before?<br><b>We play outside.</b>|now|before",
    "Does this sentence tell about now or before?<br><b>She walked home.</b>|before|now", "Does this sentence tell about now or before?<br><b>She walks home.</b>|now|before",
    "Does this sentence tell about now or before?<br><b>I ate my lunch.</b>|before|now", "Does this sentence tell about now or before?<br><b>Birds build nests.</b>|now|before",
    "Does this sentence tell about now or before?<br><b>The bell rang.</b>|before|now"],
    ["Look at the verb. Does it sound like it is happening right now, or did it already happen?", "A verb ending in -ed, or a tricky word like ate or ran, tells about before.", "Example: <b>The clown laughed.</b> It ends in -ed, so it happened before. <b>The clown laughs.</b> That is now. Now do yours."],
    [["Now and before", "⏰", "Verbs change to show <b>when</b>. Now: <b>walks</b>. Before: <b>walked</b>."], ["Clue words", "today · yesterday", "<b>Today</b> and <b>now</b> go with present verbs. <b>Yesterday</b> and <b>last night</b> go with past verbs."], ["Tip", "💡", "Ask: did it already happen? If yes, the verb is in the past."]]);
  const A7 = mk("Describing words", "🎨", [
    "Which word describes the noun (adjective)?<br><b>The tall tree swayed.</b>|tall|tree|swayed", "Which word describes the noun (adjective)?<br><b>I have a red bike.</b>|red|have|bike",
    "Which word describes the noun (adjective)?<br><b>A fluffy cloud floated by.</b>|fluffy|cloud|floated", "Which word describes the noun (adjective)?<br><b>We ate sweet grapes.</b>|sweet|ate|grapes",
    "Which word describes the noun (adjective)?<br><b>The loud drum boomed.</b>|loud|drum|boomed", "Which word describes the noun (adjective)?<br><b>She wore a yellow hat.</b>|yellow|wore|hat",
    "Which word describes the noun (adjective)?<br><b>Mom baked warm bread.</b>|warm|baked|bread", "Which word describes the noun (adjective)?<br><b>The sleepy puppy yawned.</b>|sleepy|puppy|yawned"],
    ["An adjective tells more about a noun. Which word tells what kind?", "Find the noun first. The describing word is usually right before it.", "Example: <b>A shiny coin fell.</b> Coin is the noun. <b>Shiny</b> describes it. Now do yours."],
    [["Adjectives", "🎨", "An <b>adjective</b> describes a noun. It can tell the <b>color</b>, <b>size</b>, <b>shape</b> or <b>feeling</b>."], ["Examples", "a big 🐘 · a red 🍎", "<b>big</b> describes the elephant. <b>red</b> describes the apple."], ["Tip", "💡", "Adjectives answer: What kind? How many? Which one?"]]);
  const A8 = mk("Compare with -er and -est", "📏", [
    "A giraffe is ___ than a horse. (tall)|taller|tallest|more tall", "Mia is the ___ girl in her class. (fast)|fastest|faster|more fast",
    "My bag is ___ than your bag. (small)|smaller|smallest|more small", "That is the ___ mountain of all. (high)|highest|higher|more high",
    "A pillow is ___ than a rock. (soft)|softer|softest|more soft", "Today is the ___ day of the year. (long)|longest|longer|more long",
    "A turtle is ___ than a rabbit. (slow)|slower|slowest|more slow", "He has the ___ puppy in the park. (young)|youngest|younger|more young"],
    ["Count how many things are being compared. Two things or more than two?", "Comparing <b>two</b> things uses <b>-er</b>. Comparing <b>three or more</b> uses <b>-est</b>.", "Example: <b>A mouse is (small) than a cat.</b> Two things, so <b>smaller</b>. <b>The (small) animal in the farm</b> means all animals: <b>smallest</b>. Now do yours."],
    [["Comparing", "📏", "Add <b>-er</b> to compare <b>two</b> things: taller, faster, softer."], ["The most", "🏆", "Add <b>-est</b> to compare <b>three or more</b>: tallest, fastest, softest."], ["Tip", "💡", "The word <b>than</b> usually goes with -er. The word <b>the</b> goes with -est."]]);
  const A9 = mk("Commas in a list", "📝", [
    "One comma is missing from this list. Which word needs a comma <b>right after</b> it?<br><b>I like apples pears, and plums.</b>|apples|like|plums",
    "One comma is missing from this list. Which word needs a comma <b>right after</b> it?<br><b>We saw lions tigers, and bears.</b>|lions|saw|bears",
    "One comma is missing from this list. Which word needs a comma <b>right after</b> it?<br><b>Pack your hat coat, and boots.</b>|hat|Pack|boots",
    "One comma is missing from this list. Which word needs a comma <b>right after</b> it?<br><b>She bought milk eggs, and bread.</b>|milk|bought|bread",
    "One comma is missing from this list. Which word needs a comma <b>right after</b> it?<br><b>Red blue, and green are colors.</b>|Red|are|green",
    "One comma is missing from this list. Which word needs a comma <b>right after</b> it?<br><b>I play soccer tennis, and chess.</b>|soccer|play|chess",
    "One comma is missing from this list. Which word needs a comma <b>right after</b> it?<br><b>Dad packed sandwiches fruit, and juice.</b>|sandwiches|packed|juice",
    "One comma is missing from this list. Which word needs a comma <b>right after</b> it?<br><b>The farm has cows pigs, and hens.</b>|cows|farm|hens"],
    ["A comma separates the things in a list. Find the first item in the list.", "Put a comma after each item in a list, except the very last one. The word <b>and</b> comes before the last item.", "Example: <b>I see ants bees, and flies.</b> The first item, ants, needs its comma: ants, bees, and flies. Now do yours."],
    [["Lists", "📝", "When you name three or more things in a row, put a <b>comma</b> between them."], ["Example", "🍎, 🍌, and 🍇", "I like <b>apples, bananas, and grapes</b>."], ["Tip", "💡", "No comma at the very end of the list. The word <b>and</b> comes before the last thing."]]);
  const A10 = mk("What two words? Contractions", "✂️", [
    "What two words make <b>don't</b>?|do not|did not|does not", "What two words make <b>isn't</b>?|is not|it is|has not",
    "What two words make <b>I'm</b>?|I am|I will|I have", "What two words make <b>they're</b>?|they are|they were|they will",
    "What two words make <b>we'll</b>?|we will|we are|we had", "What two words make <b>didn't</b>?|did not|do not|does not",
    "What two words make <b>wasn't</b>?|was not|were not|was it", "What two words make <b>you're</b>?|you are|you will|you have"],
    ["A contraction squishes two words into one. An apostrophe takes the place of missing letters.", "Think about which letters the apostrophe hides. Say the contraction slowly and listen for the full words.", "Example: <b>can't</b> = can + not (the o in not is gone). <b>He's</b> = he + is. Now do yours."],
    [["Contractions", "✂️", "A <b>contraction</b> shortens two words into one. An <b>apostrophe (')</b> shows where letters were left out."], ["Examples", "do not → don't", "<b>I am → I'm</b>, <b>we are → we're</b>, <b>she will → she'll</b>."], ["Tip", "💡", "The apostrophe sits where the missing letters used to be."]]);
  const A11 = mk("Which end mark?", "❓", [
    "Which mark ends this sentence?<br><b>Where do you live</b>|a question mark|a period|an exclamation mark", "Which mark ends this sentence?<br><b>I like to swim</b>|a period|a question mark|an exclamation mark",
    "Which mark ends this sentence?<br><b>Wow, that is so cool</b>|an exclamation mark|a period|a question mark", "Which mark ends this sentence?<br><b>Can you help me</b>|a question mark|a period|an exclamation mark",
    "Which mark ends this sentence?<br><b>The moon is bright</b>|a period|a question mark|an exclamation mark", "Which mark ends this sentence?<br><b>Hooray, we won</b>|an exclamation mark|a period|a question mark",
    "Which mark ends this sentence?<br><b>What time is lunch</b>|a question mark|a period|an exclamation mark", "Which mark ends this sentence?<br><b>My bike has two wheels</b>|a period|a question mark|an exclamation mark"],
    ["Read the sentence out loud. Is it telling, asking or shouting?", "Telling ends with a period. Asking ends with a question mark. A big feeling ends with an exclamation mark.", "Example: <b>Is it snowing</b> is asking, so it gets a question mark. <b>It is snowing</b> is telling, so it gets a period. Now do yours."],
    [["Period", ". ", "A <b>period</b> ends a sentence that <b>tells</b> something."], ["Question mark", "? ", "A <b>question mark</b> ends a sentence that <b>asks</b> something."], ["Exclamation mark", "! ", "An <b>exclamation mark</b> shows a <b>big feeling</b>, like surprise or joy."]]);
  const A12 = mk("Whole sentence or not?", "✅", [
    "Is this a whole sentence?<br><b>The dog barked loudly.</b>|a sentence|not a sentence", "Is this a whole sentence?<br><b>Under the big tree</b>|not a sentence|a sentence",
    "Is this a whole sentence?<br><b>We eat lunch at noon.</b>|a sentence|not a sentence", "Is this a whole sentence?<br><b>Ran down the hill</b>|not a sentence|a sentence",
    "Is this a whole sentence?<br><b>My sister plays the piano.</b>|a sentence|not a sentence", "Is this a whole sentence?<br><b>The little yellow bird</b>|not a sentence|a sentence",
    "Is this a whole sentence?<br><b>Birds fly south in winter.</b>|a sentence|not a sentence", "Is this a whole sentence?<br><b>After the rain stopped</b>|not a sentence|a sentence"],
    ["A whole sentence tells a complete idea. Does this one leave you waiting for more?", "A whole sentence needs two parts: <b>who or what</b>, and <b>what they do</b>.", "Example: <b>The frog hopped.</b> Who? The frog. What did it do? Hopped. Whole sentence! <b>On a green leaf</b> has no action, so it is not. Now do yours."],
    [["Whole sentences", "✅", "A whole sentence has <b>who or what</b> and <b>what they do</b>. It makes full sense."], ["Missing pieces", "The big dog ...", "\"The big dog\" is not a whole sentence. What did the dog do? \"The big dog <b>ran</b>.\" is whole."], ["Tip", "💡", "If you want to ask \"What happened?\", the sentence is not finished."]]);
  const A13 = mk("Who is it about?", "👤", [
    "Which words tell <b>who</b> or <b>what</b> the sentence is about?<br><b>The little bird sang a song.</b>|The little bird|sang a song|a song",
    "Which words tell <b>who</b> or <b>what</b> the sentence is about?<br><b>My best friend plays chess.</b>|My best friend|plays chess|chess",
    "Which words tell <b>who</b> or <b>what</b> the sentence is about?<br><b>The red car zoomed away.</b>|The red car|zoomed away|away",
    "Which words tell <b>who</b> or <b>what</b> the sentence is about?<br><b>Our teacher reads stories.</b>|Our teacher|reads stories|stories",
    "Which words tell <b>who</b> or <b>what</b> the sentence is about?<br><b>The hungry bears ate berries.</b>|The hungry bears|ate berries|berries",
    "Which words tell <b>who</b> or <b>what</b> the sentence is about?<br><b>Grandpa tells funny jokes.</b>|Grandpa|tells funny jokes|funny jokes",
    "Which words tell <b>who</b> or <b>what</b> the sentence is about?<br><b>The tiny seed grew tall.</b>|The tiny seed|grew tall|tall",
    "Which words tell <b>who</b> or <b>what</b> the sentence is about?<br><b>Two ducks swam in the pond.</b>|Two ducks|swam in the pond|the pond"],
    ["Ask: who or what is this sentence mostly about?", "The naming part comes first. The other part tells what it does.", "Example: <b>The brown horse eats hay.</b> It is about the <b>brown horse</b>. Eats hay tells what it does. Now do yours."],
    [["The subject", "👤", "Every sentence has a <b>subject</b>. It tells <b>who or what</b> the sentence is about."], ["Find it", "The 🐶 barked.", "Ask: who barked? <b>The dog</b>. That is the subject."], ["Tip", "💡", "The other half of the sentence tells what the subject does."]]);
  const A14 = mk("And, but, because, or", "🔗", [
    "I like soup, ___ I do not like salad.|but|and|because", "We were tired ___ we went to bed.|so|but|or",
    "I wore a coat ___ it was cold.|because|but|or", "Tom is small, ___ he is strong.|but|because|or",
    "Do you want milk ___ juice?|or|and|because", "She sat down ___ she was tired.|because|but|or",
    "I have a cat ___ a dog.|and|but|because", "I wanted to play, ___ it was raining.|but|because|or"],
    ["Read the sentence both ways. Which little word joins the two ideas so they make sense?", "<b>and</b> adds, <b>but</b> shows a difference, <b>because</b> gives a reason, <b>or</b> gives a choice, <b>so</b> shows a result.", "Example: <b>I like tea, ___ I do not like coffee.</b> The two ideas are different, so <b>but</b>. Now do yours."],
    [["Joining words", "🔗", "Little words can join ideas: <b>and</b>, <b>but</b>, <b>or</b>, <b>so</b>, <b>because</b>."], ["What they do", "+ ≠ ? →", "<b>and</b> adds more. <b>but</b> shows a difference. <b>or</b> gives a choice. <b>so</b> and <b>because</b> connect cause and result."], ["Example", "☔", "We stayed in <b>because</b> it rained. It rained, <b>so</b> we stayed in."]]);
  const A15 = mk("Pronouns", "👉", [
    "Which word can take the place of <b>Tom</b>?<br><b>Tom runs fast.</b>|He|She|They", "Which word can take the place of <b>Grandma</b>?<br><b>Grandma bakes pies.</b>|She|He|They",
    "Which word can take the place of <b>The girls</b>?<br><b>The girls sang.</b>|They|She|It", "Which word can take the place of <b>The ball</b>?<br><b>The ball rolled.</b>|It|He|They",
    "Which word can take the place of <b>My dad</b>?<br><b>My dad drives.</b>|He|She|It", "Which word can take the place of <b>The cats</b>?<br><b>The cats nap.</b>|They|It|She",
    "Which word can take the place of <b>The box</b>?<br><b>The box is heavy.</b>|It|He|They", "Which word can take the place of <b>Anna and I</b>?<br><b>Anna and I play chess.</b>|We|They|She"],
    ["A pronoun takes the place of a noun. Who or what are we talking about?", "Use <b>he</b> for a boy or man, <b>she</b> for a girl or woman, <b>it</b> for one thing, <b>they</b> for more than one.", "Example: <b>Sara reads</b> becomes <b>She reads</b>. <b>The birds sing</b> becomes <b>They sing</b>. Now do yours."],
    [["Pronouns", "👉", "A <b>pronoun</b> takes the place of a noun: <b>he, she, it, we, they</b>."], ["Example", "Ben ran. → He ran.", "<b>Ben</b> is replaced by <b>He</b>. <b>The flowers</b> is replaced by <b>They</b>."], ["Tip", "💡", "Pronouns stop us from saying the same name again and again."]]);
  const A16 = mk("Same meaning words", "🟰", [
    "Which word means almost the same as <b>big</b>?|large|tiny|slow", "Which word means almost the same as <b>happy</b>?|glad|angry|sleepy",
    "Which word means almost the same as <b>fast</b>?|quick|slow|heavy", "Which word means almost the same as <b>little</b>?|small|huge|loud",
    "Which word means almost the same as <b>begin</b>?|start|stop|wait", "Which word means almost the same as <b>cold</b>?|chilly|warm|dry",
    "Which word means almost the same as <b>smart</b>?|clever|silly|shy", "Which word means almost the same as <b>sad</b>?|unhappy|joyful|fast"],
    ["A word with a similar meaning is called a synonym. Which choice could you swap in?", "Try each choice in a sentence. The sentence should still mean nearly the same thing.", "Example: <b>shut</b> means almost the same as <b>close</b>, so you can say \"shut the door\" or \"close the door\". Now do yours."],
    [["Synonyms", "🟰", "<b>Synonyms</b> are words that mean almost the same thing."], ["Examples", "big = large · fast = quick", "<b>glad</b> and <b>happy</b> are synonyms. So are <b>start</b> and <b>begin</b>."], ["Why?", "💡", "Synonyms help you use the best word and not repeat the same one."]]);
  const A17 = mk("Opposite words", "↔️", [
    "Which word means the <b>opposite</b> of <b>hot</b>?|cold|warm|sunny", "Which word means the <b>opposite</b> of <b>up</b>?|down|high|top",
    "Which word means the <b>opposite</b> of <b>old</b>?|new|big|slow", "Which word means the <b>opposite</b> of <b>empty</b>?|full|clean|small",
    "Which word means the <b>opposite</b> of <b>day</b>?|night|noon|week", "Which word means the <b>opposite</b> of <b>heavy</b>?|light|thick|tall",
    "Which word means the <b>opposite</b> of <b>open</b>?|closed|wide|door", "Which word means the <b>opposite</b> of <b>sad</b>?|happy|tired|quiet"],
    ["An opposite is a word that means the very other thing. Think of the other end.", "Picture the word, then picture its complete opposite. Rule out words that are just related.", "Example: the opposite of <b>wet</b> is <b>dry</b>. Not damp, not rain. Now do yours."],
    [["Antonyms", "↔️", "<b>Antonyms</b> are words with opposite meanings."], ["Examples", "in ↔ out · tall ↔ short", "<b>fast</b> and <b>slow</b>, <b>start</b> and <b>stop</b>, <b>wet</b> and <b>dry</b>."], ["Tip", "💡", "Think of a pair, like a see-saw. One end up, one end down."]]);
  const A18 = mk("First, next, last", "1️⃣", [
    "Which sentence should come <b>first</b>?|We dug a hole.|We watered the plant.|We picked a flower.",
    "Which sentence should come <b>first</b>?|I woke up.|I ate breakfast.|I went to school.",
    "Which sentence should come <b>last</b>?|We said goodnight.|We brushed our teeth.|We put on pajamas.",
    "Which sentence should come <b>first</b>?|The egg was laid.|The chick hatched.|The chick grew up.",
    "Which sentence should come <b>last</b>?|I ate the sandwich.|I got two slices of bread.|I put cheese on the bread.",
    "Which sentence should come <b>first</b>?|Mom got the flour.|Mom baked the bread.|We ate the bread.",
    "Which sentence should come <b>last</b>?|I took off my shoes.|I opened the door.|I walked into the house.",
    "Which sentence should come <b>first</b>?|Dad put paint on the brush.|Dad painted the wall.|Dad washed the brush."],
    ["Think about what has to happen before anything else can happen.", "Look for the step that makes the other steps possible. That one is first. The step that finishes is last.", "Example: To make toast: <b>get bread</b>, <b>toast it</b>, <b>eat it</b>. Getting bread is first. Eating is last. Now do yours."],
    [["Order", "1️⃣ 2️⃣ 3️⃣", "Stories and steps have an order: <b>first</b>, <b>next</b>, <b>then</b>, <b>last</b>."], ["Example", "🌱 → 🌿 → 🌸", "First a seed. Next a sprout. Last a flower."], ["Tip", "💡", "Ask: what must happen before this? What can only happen after?"]]);

  // =============== LEVEL 5 ===============
  const IPL = [["child", "children", "childs", "childen"], ["mouse", "mice", "mouses", "mices"], ["foot", "feet", "foots", "feets"], ["tooth", "teeth", "tooths", "teeths"], ["man", "men", "mans", "manes"], ["woman", "women", "womans", "womens"], ["goose", "geese", "gooses", "geeses"], ["leaf", "leaves", "leafs", "leafes"]];
  const B1 = mk("Plurals that change", "🐭", IPL.map(r => `Which word means <b>more than one ${r[0]}</b>?|${r[1]}|${r[2]}|${r[3]}`),
    ["Some words do not just add s. They change in the middle or at the end.", "These are special words you learn by heart. Say each choice out loud. Which one sounds right?", "Example: one <b>ox</b>, two <b>oxen</b>. And one <b>wolf</b>, two <b>wolves</b>. Now do yours."],
    [["Special plurals", "🐭🐭", "Some plurals change the word: <b>mouse → mice</b>, <b>foot → feet</b>."], ["More", "child → children", "<b>man → men</b>, <b>woman → women</b>, <b>tooth → teeth</b>, <b>goose → geese</b>."], ["f to v", "leaf → leaves", "Some words change <b>f</b> to <b>ves</b>: leaf → leaves, wolf → wolves."]]);
  const IP2 = [["buy", "bought", "buyed", "I ___ new shoes yesterday."], ["bring", "brought", "bringed", "She ___ her lunch to school today. It happened this morning."], ["catch", "caught", "catched", "He ___ the ball last week."], ["draw", "drew", "drawed", "Mia ___ a picture yesterday."], ["drink", "drank", "drinked", "We ___ water after the race."], ["fly", "flew", "flied", "The geese ___ south last fall."], ["grow", "grew", "growed", "The beans ___ tall last summer."], ["write", "wrote", "writed", "Dad ___ me a note this morning."]];
  const B2 = mk("More tricky past words", "⏪", IP2.map(r => `${r[3]}<br>(verb: ${r[0]})|${r[1]}|${r[2]}|${r[0]}`),
    ["The sentence tells about the past. Which choice shows that the action is done?", "Many past words are not made by adding -ed. They change completely. Which one have you heard before?", "Example: <b>Last year I (sing) in a play.</b> Sing becomes <b>sang</b>, not singed. Now do yours."],
    [["Tricky past", "⏪", "Some verbs do not end in -ed in the past: <b>buy → bought</b>, <b>catch → caught</b>."], ["More", "draw → drew · fly → flew", "<b>grow → grew</b>, <b>write → wrote</b>, <b>drink → drank</b>, <b>bring → brought</b>."], ["Tip", "💡", "If it sounds wrong, it probably is. \"Flied\" is not a word, but \"flew\" is."]]);
  const B3 = mk("Who owns it? 's", "🧸", [
    "Which word needs an apostrophe to show who owns it?<br><b>The girls hat is red.</b> (one girl)|girls|hat|red",
    "Which word needs an apostrophe to show who owns it?<br><b>The dogs bone is big.</b> (one dog)|dogs|bone|big",
    "Which word needs an apostrophe to show who owns it?<br><b>Mias bike is blue.</b>|Mias|bike|blue",
    "Which word needs an apostrophe to show who owns it?<br><b>I like the teachers desk.</b> (one teacher)|teachers|desk|like",
    "What does the <b>'s</b> show in <b>Ben's</b> kite?|the kite belongs to Ben|there is more than one Ben|Ben is a kite",
    "What does the <b>'s</b> show in <b>the bird's</b> nest?|the nest belongs to the bird|there are many nests|the bird is a nest",
    "What does the <b>'s</b> show in <b>Grandpa's</b> hat?|the hat belongs to Grandpa|there are many hats|Grandpa is a hat",
    "What does the <b>'s</b> show in <b>the cat's</b> tail?|the tail belongs to the cat|there are many cats|the cat is small"],
    ["An apostrophe followed by s can show that something belongs to someone.", "Ask: who owns it? Add <b>'s</b> to the owner's name.", "Example: The bag belongs to Sam: <b>Sam's bag</b>. The toy belongs to the pup: <b>the pup's toy</b>. Now do yours."],
    [["Owning", "🧸", "Add <b>'s</b> to a noun to show it <b>owns</b> something: <b>Sam's</b> bag, the <b>dog's</b> bowl."], ["Not plural!", "dogs ≠ dog's", "<b>dogs</b> means many dogs. <b>dog's</b> means something belongs to the dog."], ["Tip", "💡", "Ask: \"Who has it?\" Put the 's on that word."]]);
  const B4 = mk("Squish the words", "✂️", [
    "Which contraction is made from <b>you will</b>?|you'll|you're|you've", "Which contraction is made from <b>we have</b>?|we've|we're|we'll",
    "Which contraction is made from <b>could not</b>?|couldn't|wouldn't|shouldn't", "Which contraction is made from <b>would not</b>?|wouldn't|couldn't|wasn't",
    "Which contraction is made from <b>he is</b>?|he's|he'd|he'll", "Which contraction is made from <b>I would</b>?|I'd|I'll|I'm",
    "Which contraction is made from <b>has not</b>?|hasn't|haven't|hadn't", "Which contraction is made from <b>they have</b>?|they've|they're|they'll"],
    ["Look at the second word. The contraction ending tells you which one: 'll, 're, 've, 'd, n't.", "<b>will</b> = 'll, <b>are</b> = 're, <b>have</b> = 've, <b>would</b> = 'd, <b>not</b> = n't. Match the ending.", "Example: <b>she will</b> → she + 'll = <b>she'll</b>. <b>did not</b> → didn't. Now do yours."],
    [["Contraction endings", "✂️", "<b>'ll</b> = will · <b>'re</b> = are · <b>'ve</b> = have · <b>'d</b> = would · <b>n't</b> = not."], ["Examples", "she will → she'll", "<b>we are → we're</b>, <b>could not → couldn't</b>, <b>I have → I've</b>."], ["Careful!", "'s", "<b>'s</b> can mean <b>is</b> (he's here) or show ownership (Ben's hat)."]]);
  const B5 = mk("Commas in dates and places", "📅", [
    "Where does the comma go?<br><b>My birthday is March 9 2018.</b>|after 9|after March|after is", "Where does the comma go?<br><b>We moved on June 5 2024.</b>|after 5|after June|after moved",
    "Where does the comma go?<br><b>I live in Austin Texas.</b>|after Austin|after live|after in", "Where does the comma go?<br><b>She was born in Denver Colorado.</b>|after Denver|after born|after in",
    "Where does the comma go?<br><b>Dear Grandma</b>|after Grandma|after Dear|before Dear", "Where does the comma go?<br><b>Your friend Zoe</b> (end of a letter)|after friend|after Your|after Zoe",
    "Where does the comma go?<br><b>School ends on May 30 2025.</b>|after 30|after May|after ends", "Where does the comma go?<br><b>The zoo is in Omaha Nebraska.</b>|after Omaha|after zoo|after in"],
    ["A comma helps readers pause. Between which two parts would you pause?", "In a date, the comma goes between the day number and the year. In a place, it goes between the city and the state.", "Example: <b>July 4, 1999</b> has a comma after the 4. <b>Boston, Massachusetts</b> has a comma after Boston. Now do yours."],
    [["Dates", "📅", "Put a comma between the day and the year: <b>May 5, 2020</b>."], ["Places", "🏙️", "Put a comma between a city and a state: <b>Dallas, Texas</b>."], ["Letters", "✉️", "Use a comma after the greeting (<b>Dear Sam,</b>) and after the closing (<b>Your friend,</b>)."]]);
  const B6 = mk("Capitals for special things", "🔠", [
    "Which word needs a capital letter?<br><b>We eat turkey on thanksgiving.</b>|thanksgiving|turkey|eat", "Which word needs a capital letter?<br><b>My uncle lives in denver.</b>|denver|uncle|lives",
    "Which word needs a capital letter?<br><b>Maple syrup comes from canada.</b>|canada|syrup|comes", "Which word needs a capital letter?<br><b>Kids dress up on halloween.</b>|halloween|dress|kids",
    "Which word needs a capital letter?<br><b>We drove through ohio today.</b>|ohio|drove|today", "Which word needs a capital letter?<br><b>I want to visit spain someday.</b>|spain|visit|someday",
    "Which word needs a capital letter?<br><b>We open presents on christmas.</b>|christmas|open|presents", "Which word needs a capital letter?<br><b>Whales swim in the atlantic ocean.</b>|atlantic|whales|swim"],
    ["Think: is one word the exact name of a holiday or a place?", "Holidays, cities, states, countries, oceans and rivers are all special names. They start with capital letters.", "Example: <b>We camp near lake tahoe in july.</b> Both <b>Tahoe</b> and <b>July</b> need capitals. Now do yours."],
    [["Capitals", "🔠", "Use a capital letter for the <b>exact name</b> of a place or a holiday."], ["Examples", "Texas · Paris · Easter", "<b>states</b>, <b>cities</b>, <b>countries</b>, <b>oceans</b>, <b>holidays</b>, <b>days</b> and <b>months</b>."], ["Not special", "city · holiday", "General words like <b>city</b> or <b>holiday</b> stay small."]]);
  const B7 = mk("Adverbs: how?", "🐌", [
    "Which word tells <b>how</b> the action happens?<br><b>The snail crawled slowly.</b>|slowly|snail|crawled", "Which word tells <b>how</b> the action happens?<br><b>She sang softly.</b>|softly|She|sang",
    "Which word tells <b>how</b> the action happens?<br><b>The horse ran quickly.</b>|quickly|horse|ran", "Which word tells <b>how</b> the action happens?<br><b>He closed the door gently.</b>|gently|closed|door",
    "Which word tells <b>how</b> the action happens?<br><b>We waited patiently.</b>|patiently|We|waited", "Which word tells <b>how</b> the action happens?<br><b>The baby laughed happily.</b>|happily|baby|laughed",
    "Which word tells <b>how</b> the action happens?<br><b>Dad drove carefully.</b>|carefully|Dad|drove", "Which word tells <b>how</b> the action happens?<br><b>The kids cheered loudly.</b>|loudly|kids|cheered"],
    ["An adverb tells how, when or where an action happens. Which word tells how?", "Many adverbs end in <b>-ly</b>. Look for the word that tells the way the action was done.", "Example: <b>The bird flew high.</b> and <b>The bird flew swiftly.</b> Swiftly tells how it flew. Now do yours."],
    [["Adverbs", "🐌", "An <b>adverb</b> tells more about a verb. It can tell <b>how</b> something is done."], ["Examples", "runs fast · sings sweetly", "Many end in <b>-ly</b>: slowly, softly, quickly, happily."], ["Tip", "💡", "Ask: how did they do it? The answer is the adverb."]]);
  const B8 = mk("Compound words", "🌈", [
    "Put together: <b>butter</b> + <b>fly</b>|butterfly|flybutter|butterfli", "Put together: <b>base</b> + <b>ball</b>|baseball|ballbase|basebal",
    "Put together: <b>sun</b> + <b>flower</b>|sunflower|flowersun|sunflowr", "Put together: <b>rain</b> + <b>coat</b>|raincoat|coatrain|rainkoat",
    "Put together: <b>snow</b> + <b>man</b>|snowman|mansnow|snoman", "Put together: <b>cup</b> + <b>cake</b>|cupcake|cakecup|cupcak",
    "Put together: <b>tooth</b> + <b>brush</b>|toothbrush|brushtooth|toothbrus", "Put together: <b>star</b> + <b>fish</b>|starfish|fishstar|starfsh"],
    ["A compound word is two small words stuck together. Keep them in the same order.", "Write the first word, then the second word right next to it. Do not drop any letters.", "Example: <b>door</b> + <b>bell</b> = <b>doorbell</b>. Now do yours."],
    [["Compound words", "🌈", "Two small words can join to make a new word: <b>sun + shine = sunshine</b>."], ["Examples", "🏀 basket + ball", "<b>rain + bow = rainbow</b>, <b>moon + light = moonlight</b>."], ["Tip", "💡", "You can often guess the meaning by thinking about the two small words."]]);
  const B9 = mk("un- and re-", "🔁", [
    "What does <b>unhappy</b> mean?|not happy|happy again|very happy", "What does <b>redo</b> mean?|do again|not do|do first",
    "What does <b>unfair</b> mean?|not fair|fair again|very fair", "What does <b>rewrite</b> mean?|write again|not write|write well",
    "What does <b>unsafe</b> mean?|not safe|safe again|very safe", "What does <b>refill</b> mean?|fill again|not fill|fill halfway",
    "What does <b>unkind</b> mean?|not kind|kind again|very kind", "What does <b>replay</b> mean?|play again|not play|play first"],
    ["Look at the beginning part of the word. It changes the meaning of the base word.", "<b>un-</b> means <b>not</b>. <b>re-</b> means <b>again</b>. Find the base word and add that meaning.", "Example: <b>unclear</b> = not clear. <b>reread</b> = read again. Now do yours."],
    [["Prefixes", "🔁", "A <b>prefix</b> goes at the start of a word and changes its meaning."], ["un-", "un + happy", "<b>un-</b> means <b>not</b>: unhappy = not happy."], ["re-", "re + do", "<b>re-</b> means <b>again</b>: redo = do again."]]);
  const B10 = mk("-ful and -less", "🎁", [
    "What does <b>helpful</b> mean?|full of help|without help|help again", "What does <b>hopeless</b> mean?|without hope|full of hope|hope again",
    "What does <b>colorful</b> mean?|full of color|without color|color again", "What does <b>painless</b> mean?|without pain|full of pain|pain again",
    "What does <b>joyful</b> mean?|full of joy|without joy|joy again", "What does <b>fearless</b> mean?|without fear|full of fear|fear again",
    "What does <b>useless</b> mean?|without use|full of use|use again", "What does <b>thankful</b> mean?|full of thanks|without thanks|thanks again"],
    ["The ending of a word also changes its meaning. Look at the last part.", "<b>-ful</b> means <b>full of</b>. <b>-less</b> means <b>without</b>.", "Example: <b>careful</b> = full of care. <b>careless</b> = without care. Now do yours."],
    [["Suffixes", "🎁", "A <b>suffix</b> goes at the end of a word and changes its meaning."], ["-ful", "joy + ful", "<b>-ful</b> means <b>full of</b>: joyful = full of joy."], ["-less", "fear + less", "<b>-less</b> means <b>without</b>: fearless = without fear."]]);
  const B11 = mk("Sound-alike words", "👂", [
    "I want to go, ___.<br>Pick the right word.|too|to|two", "I have ___ cats.<br>Pick the right word.|two|to|too",
    "The kids lost ___ hats.<br>Pick the right word.|their|there|they're", "Put the book over ___.<br>Pick the right word.|there|their|they're",
    "I can ___ a bird in the tree.<br>Pick the right word.|see|sea|say", "We swam in the ___.<br>Pick the right word.|sea|see|sew",
    "I ___ the answer.<br>Pick the right word.|know|no|now", "Can you ___ me from over there?<br>Pick the right word.|hear|here|her",
    "We ___ pizza last night.<br>Pick the right word.|ate|eight|at"],
    ["Some words sound the same but are spelled differently. Think about what the sentence means.", "Ask: which spelling has the meaning I need? <b>to</b> is a direction, <b>too</b> means also, <b>two</b> is the number 2.", "Example: <b>I ___ a letter.</b> Writing is <b>write</b>. But <b>right</b> means correct. Choose by meaning. Now do yours."],
    [["Homophones", "👂", "<b>Homophones</b> sound the same but have different spellings and meanings."], ["Examples", "to · too · two", "<b>to</b> (go to), <b>too</b> (also), <b>two</b> (the number). <b>see</b> and <b>sea</b>. <b>hear</b> and <b>here</b>."], ["Their, there", "🏠", "<b>their</b> = belongs to them. <b>there</b> = a place. <b>they're</b> = they are."]]);
  const B12 = mk("Complete sentences 2", "✅", [
    "Which one is a complete sentence?|The cat sat on the mat.|On the mat|Sat on the mat", "Which one is a complete sentence?|Birds build nests in spring.|Build nests in spring|In the spring",
    "Which one is a complete sentence?|My brother plays the drums.|Plays the drums|The drums", "Which one is a complete sentence?|We walked to the park.|To the park|Walked to the park",
    "Which one is a complete sentence?|The water was cold.|Very cold water|Was cold", "Which one is a complete sentence?|Grandma knits warm socks.|Knits warm socks|Warm socks",
    "Which one is a complete sentence?|The bus stopped at the corner.|At the corner|Stopped at the corner", "Which one is a complete sentence?|Our class made a poster.|Made a poster|A big poster"],
    ["A complete sentence has a naming part (who or what) and a doing part (what happens).", "Check both parts. If you cannot tell who or what did it, or what they did, it is only a piece.", "Example: <b>The baby smiled.</b> is complete. <b>Smiled at me</b> has no who. <b>The happy baby</b> has no action. Now do yours."],
    [["Complete", "✅", "A complete sentence has a <b>subject</b> (who or what) and a <b>verb</b> (what happens)."], ["Pieces", "❌", "A piece of a sentence is a <b>fragment</b>: \"Ran down the road.\" Who ran?"], ["Fix it", "🔧", "Add the missing part: \"<b>The dog</b> ran down the road.\""]]);
  const B13 = mk("Verbs that match", "🤝", [
    "My brother ___ a bike.|rides|ride", "The kids ___ tall.|are|is", "She ___ to school.|walks|walk", "The cats ___ asleep.|are|is",
    "He ___ a dog.|has|have", "We ___ lunch at noon.|eat|eats", "The bees ___ honey.|make|makes", "My friends ___ at the park.|play|plays", "The bird ___ in the tree.|sings|sing"],
    ["Look at the naming part of the sentence. Is it one or more than one?", "One person or thing usually goes with a verb that ends in <b>s</b> (rides). More than one goes with the verb without s (ride). Is/are and has/have work the same way.", "Example: <b>The pig (roll/rolls) in mud.</b> One pig, so <b>rolls</b>. <b>The pigs (roll/rolls)</b>, many, so <b>roll</b>. Now do yours."],
    [["Matching", "🤝", "The verb must <b>match</b> the subject. One thing: <b>She runs</b>. More than one: <b>They run</b>."], ["Is and are", "is · are", "<b>is</b> goes with one (The dog <b>is</b> big). <b>are</b> goes with many (The dogs <b>are</b> big)."], ["Has and have", "has · have", "<b>has</b> goes with one (He has). <b>have</b> goes with many (They have, we have, I have)."]]);
  const B14 = mk("Quotation marks", "💬", [
    "Which words are the exact words someone said?<br><b>Mia said, \"I am hungry.\"</b>|I am hungry|Mia said|hungry",
    "Which words are the exact words someone said?<br><b>Tom asked, \"Can we go now?\"</b>|Can we go now|Tom asked|go now",
    "Which words are the exact words someone said?<br><b>\"Look at the stars,\" whispered Dad.</b>|Look at the stars|whispered Dad|Dad",
    "Which words are the exact words someone said?<br><b>The teacher said, \"Please sit down.\"</b>|Please sit down|The teacher said|teacher",
    "Which words are the exact words someone said?<br><b>\"I love this song,\" said Ana.</b>|I love this song|said Ana|song",
    "Which words are the exact words someone said?<br><b>Max shouted, \"We won the game!\"</b>|We won the game|Max shouted|game",
    "Which words go inside the quotation marks?<br><b>Sam said, I like rain.</b>|I like rain|Sam said|rain",
    "Which words go inside the quotation marks?<br><b>The clerk said, Thank you.</b>|Thank you|The clerk said|clerk"],
    ["Quotation marks wrap around the words a person says out loud.", "Ask: which words did the person actually say? Those are the ones inside the marks. The \"said\" part stays outside.", "Example: <b>Ben said, \"Let's eat.\"</b> Ben spoke the words <b>Let's eat</b>. The marks go around only those words. Now do yours."],
    [["Speaking", "💬", "Use <b>quotation marks (\" \")</b> around the exact words a person says."], ["Example", "Lily said, \"Hi!\"", "The words <b>Hi!</b> are inside the marks. <b>Lily said</b> is outside."], ["Tip", "💡", "Put a comma after the speaker when they come first: Lily said, \"Hello.\""]]);
  const B15 = mk("Which sentence does not belong?", "🚫", [
    "Which sentence does <b>not</b> belong in a paragraph about dogs?|Cats like to nap.|Dogs wag their tails.|Dogs love to play fetch.",
    "Which sentence does <b>not</b> belong in a paragraph about rain?|Pizza has cheese.|Rain fills the rivers.|Rain helps flowers grow.",
    "Which sentence does <b>not</b> belong in a paragraph about apples?|Trains are fast.|Apples can be red or green.|Apples grow on trees.",
    "Which sentence does <b>not</b> belong in a paragraph about the school bus?|Whales live in the sea.|The bus is yellow.|The bus picks up kids.",
    "Which sentence does <b>not</b> belong in a paragraph about bees?|My shoes are new.|Bees make honey.|Bees fly from flower to flower.",
    "Which sentence does <b>not</b> belong in a paragraph about snow?|I like to read.|Snow is cold.|Snow falls in winter.",
    "Which sentence does <b>not</b> belong in a paragraph about the moon?|Frogs hop.|The moon shines at night.|The moon circles the Earth.",
    "Which sentence does <b>not</b> belong in a paragraph about swimming?|Bananas are yellow.|You kick your legs.|You can swim in a pool."],
    ["Every sentence in a paragraph should be about the same topic. Which one wanders off?", "Read the topic. Check each sentence. The odd one out is about something else.", "Example: Topic: <b>pizza</b>. \"Pizza has cheese.\" \"Pizza is hot.\" \"Birds can fly.\" The last one does not belong. Now do yours."],
    [["Stay on topic", "🎯", "A good paragraph is about <b>one topic</b>. All sentences should help explain it."], ["Odd one out", "🐶 🐶 🐶 🚗", "If a sentence is about something different, take it out."], ["Tip", "💡", "Ask of each sentence: does this tell about the topic?"]]);
  const B16 = mk("The topic sentence", "📌", [
    "Which is the best <b>topic sentence</b> for these details?<br>Rabbits eat grass. Rabbits hop fast. Rabbits sleep in burrows.|Rabbits are interesting animals.|I like carrots.|Burrows are holes.",
    "Which is the best <b>topic sentence</b> for these details?<br>Spring has flowers. Spring has warm days. Spring has baby birds.|Spring is a lovely season.|Winter is cold.|Flowers have petals.",
    "Which is the best <b>topic sentence</b> for these details?<br>You need a bat. You need a ball. You need a glove.|Baseball needs some equipment.|I watched TV.|Gloves are brown.",
    "Which is the best <b>topic sentence</b> for these details?<br>Wash your hands. Brush your teeth. Take a bath.|There are many ways to stay clean.|Soap smells good.|I like water.",
    "Which is the best <b>topic sentence</b> for these details?<br>Lions roar. Lions hunt in groups. Lions have thick manes.|Lions are amazing cats.|Zoos have tickets.|I saw a bird.",
    "Which is the best <b>topic sentence</b> for these details?<br>The sun gives light. The sun gives heat. The sun helps plants grow.|The sun is very important.|Night is dark.|Stars twinkle.",
    "Which is the best <b>topic sentence</b> for these details?<br>We sing songs. We play games. We eat cake.|Birthday parties are fun.|Cake is round.|My shoes are red.",
    "Which is the best <b>topic sentence</b> for these details?<br>Ants carry food. Ants dig tunnels. Ants work together.|Ants are hard workers.|Spiders spin webs.|Hills are tall."],
    ["The topic sentence tells the big idea of the whole paragraph.", "Read the details. What one big idea do they all share? The topic sentence says it, but is not just one of the details.", "Example: <b>Dogs bark. Dogs fetch. Dogs wag.</b> Big idea: <b>Dogs do many things.</b> Now do yours."],
    [["Topic sentence", "📌", "A <b>topic sentence</b> is usually the first sentence. It tells the <b>main idea</b>."], ["Details", "📋", "The other sentences give <b>details</b> that explain the main idea."], ["Tip", "💡", "A good topic sentence is not too small and not too big. It covers every detail."]]);
  const B17 = mk("Fact or opinion?", "🔍", [
    "Is this a fact or an opinion?<br><b>Dogs are the best pets.</b>|opinion|fact", "Is this a fact or an opinion?<br><b>A week has seven days.</b>|fact|opinion",
    "Is this a fact or an opinion?<br><b>Pizza is delicious.</b>|opinion|fact", "Is this a fact or an opinion?<br><b>Frogs are green.</b> (many frogs are green)|fact|opinion",
    "Is this a fact or an opinion?<br><b>Summer is the best season.</b>|opinion|fact", "Is this a fact or an opinion?<br><b>The sun is a star.</b>|fact|opinion",
    "Is this a fact or an opinion?<br><b>Math is boring.</b>|opinion|fact", "Is this a fact or an opinion?<br><b>Water freezes when it is very cold.</b>|fact|opinion"],
    ["A fact can be checked. An opinion tells what someone thinks or feels.", "Ask: can I prove it? If yes it is a fact. Words like best, boring, fun and delicious often mean opinion.", "Example: <b>Cats have whiskers</b> can be checked: fact. <b>Cats are cute</b> is a feeling: opinion. Now do yours."],
    [["Fact", "🔍", "A <b>fact</b> is true and can be checked."], ["Opinion", "💭", "An <b>opinion</b> is what someone thinks or feels. People can disagree."], ["Clue words", "best · worst · fun", "Words like <b>best, worst, boring, fun, yummy</b> often show an opinion."]]);
  const B18 = mk("Who, what, where, when?", "❓", [
    "Which question word asks about a <b>place</b>?|Where|When|Who", "Which question word asks about <b>time</b>?|When|Where|Why",
    "Which question word asks about a <b>person</b>?|Who|What|Where", "Which question word asks for a <b>reason</b>?|Why|When|Who",
    "Dan fed the fish at noon.<br>Which part tells <b>when</b>?|at noon|Dan|the fish", "Mia hid under the bed.<br>Which part tells <b>where</b>?|under the bed|Mia|hid",
    "Grandpa baked bread in the oven.<br>Which part tells <b>who</b>?|Grandpa|bread|in the oven", "The kids ate lunch after school.<br>Which part tells <b>when</b>?|after school|The kids|lunch"],
    ["Each question word asks about a different kind of detail.", "<b>Who</b> asks about a person, <b>what</b> about a thing, <b>where</b> about a place, <b>when</b> about time, <b>why</b> about a reason.", "Example: <b>Pat swam in the lake on Monday.</b> Where? <b>in the lake</b>. When? <b>on Monday</b>. Now do yours."],
    [["Question words", "❓", "<b>Who</b>, <b>what</b>, <b>where</b>, <b>when</b> and <b>why</b> help you ask and tell."], ["Details", "👤 📍 ⏰", "<b>who</b> = person · <b>where</b> = place · <b>when</b> = time"], ["Good writing", "✏️", "Good sentences answer these questions, so the reader can picture the story."]]);

  // =============== LEVEL 6 ===============
  const C1 = mk("Myself, yourself, themselves", "🪞", [
    "I hurt ___ at the park.|myself|himself|themselves", "She looked at ___ in the mirror.|herself|himself|yourself",
    "They made lunch for ___.|themselves|ourselves|itself", "We built the fort by ___.|ourselves|themselves|yourselves",
    "He taught ___ to swim.|himself|herself|myself", "The cat cleaned ___.|itself|themselves|himself",
    "You can do it ___.|yourself|myself|ourselves", "Mom gave ___ a rest.|herself|himself|themselves"],
    ["A reflexive pronoun turns the action back to the one who does it. Who is doing the action?", "Match the doer: <b>I</b> → myself, <b>he</b> → himself, <b>she</b> → herself, <b>we</b> → ourselves, <b>they</b> → themselves, <b>you</b> → yourself, <b>it</b> → itself.", "Example: <b>The boys fixed it by (___).</b> The boys are more than one: <b>themselves</b>. Now do yours."],
    [["Reflexive pronouns", "🪞", "Words that end in <b>-self</b> or <b>-selves</b> point back to the doer: <b>myself, yourself, himself, herself, itself</b>."], ["More than one", "ourselves · themselves", "For more than one, use <b>-selves</b>: <b>ourselves, yourselves, themselves</b>."], ["Tip", "💡", "Match the doer. \"She hurt <b>herself</b>.\" \"They hurt <b>themselves</b>.\""]]);
  const C2 = mk("Past, now or future?", "🕰️", [
    "Which sentence is in the <b>future</b>?|Tomorrow we will visit Grandma.|Yesterday we visited Grandma.|We visit Grandma every day.",
    "Which sentence is in the <b>past</b>?|The bird built a nest.|The bird will build a nest.|The bird builds a nest.",
    "Which sentence is in the <b>present</b>?|I walk to school.|I walked to school.|I will walk to school.",
    "Which sentence is in the <b>future</b>?|She will play the violin.|She played the violin.|She plays the violin.",
    "Which sentence is in the <b>past</b>?|We painted the fence.|We will paint the fence.|We paint the fence.",
    "Which sentence is in the <b>present</b>?|The baby sleeps.|The baby slept.|The baby will sleep.",
    "Which sentence is in the <b>future</b>?|The train will leave at noon.|The train left at noon.|The train leaves at noon every day.",
    "Which sentence is in the <b>past</b>?|He found a shell.|He will find a shell.|He finds a shell."],
    ["Look for clue words like yesterday, now and tomorrow. Then look at the verb.", "Past often ends in -ed (or is a tricky word). Present is the plain verb. Future uses <b>will</b> before the verb.", "Example: <b>She jumped</b> is past. <b>She jumps</b> is present. <b>She will jump</b> is future. Now do yours."],
    [["Three times", "🕰️", "Verbs show <b>when</b>: past (already happened), present (happening now), future (will happen)."], ["Example", "jumped · jumps · will jump", "Past: I <b>jumped</b>. Present: I <b>jump</b>. Future: I <b>will jump</b>."], ["Clue words", "yesterday · today · tomorrow", "<b>yesterday</b> → past · <b>today</b> → present · <b>tomorrow</b> → future."]]);
  const C3 = mk("Has eaten, has seen", "🧩", [
    "She has ___ her lunch. (eat)|eaten|ate|eated", "Tom has ___ the bus. (take)|taken|took|taked",
    "I have ___ a letter. (write)|written|wrote|writed", "We have ___ that movie. (see)|seen|saw|seed",
    "They have ___ home. (go)|gone|went|goed", "Mom has ___ me a gift. (give)|given|gave|gived",
    "He has ___ the answer. (know)|known|knew|knowed", "Someone has ___ the window. (break)|broken|broke|breaked"],
    ["After <b>has</b>, <b>have</b> or <b>had</b>, some verbs use a special form.", "Say it with \"yesterday\": \"I wrote\". Then say it with \"have\": \"I have written\". The two forms are different for these verbs.", "Example: <b>I have (drive) a long way.</b> Drive → drove (before) → <b>driven</b> (after have). Now do yours."],
    [["Helping verbs", "🧩", "<b>Has</b>, <b>have</b> and <b>had</b> are helper words. Some verbs need a special form after them."], ["Examples", "eat → ate → eaten", "I <b>ate</b>. I have <b>eaten</b>. · I <b>saw</b>. I have <b>seen</b>. · I <b>went</b>. I have <b>gone</b>."], ["Tip", "💡", "Say both: yesterday I ___, and I have ___. The two words are different."]]);
  const C4 = mk("Adding -ing", "🔧", [
    "Add -ing to <b>run</b>.|running|runing|runeing", "Add -ing to <b>hop</b>.|hopping|hoping|hopeing",
    "Add -ing to <b>sit</b>.|sitting|siting|sitiing", "Add -ing to <b>swim</b>.|swimming|swiming|swimeing",
    "Add -ing to <b>make</b>.|making|makeing|makking", "Add -ing to <b>take</b>.|taking|takeing|takking",
    "Add -ing to <b>bake</b>.|baking|bakeing|bakking", "Add -ing to <b>dance</b>.|dancing|danceing|dancting"],
    ["Look at the end of the word. Is there a silent e? Is it a short word with a short vowel sound?", "If the word ends in a silent <b>e</b>, drop the e. If it is a short word with one vowel and one consonant at the end, double the last letter.", "Example: <b>shop</b> → doubles the p → <b>shopping</b>. <b>love</b> → drops the e → <b>loving</b>. Now do yours."],
    [["Add -ing", "🔧", "Most words just add <b>-ing</b>: jump → jumping, play → playing."], ["Silent e", "make → making", "If a word ends in a silent <b>e</b>, <b>drop the e</b>: take → taking, dance → dancing."], ["Doubling", "run → running", "Short word, one vowel, one end consonant: <b>double the last letter</b>: sit → sitting, hop → hopping."]]);
  const C5 = mk("Where does the comma go?", "✏️", [
    "Where does the comma go?<br><b>First we ate lunch.</b>|after First|after we|after ate", "Where does the comma go?<br><b>Yes I can come.</b>|after Yes|after I|after can",
    "Where does the comma go?<br><b>Later we played tag.</b>|after Later|after we|after played", "Where does the comma go?<br><b>Well I think so.</b>|after Well|after I|after think",
    "Where does the comma go?<br><b>I wanted to go but it rained.</b>|before but|after go|after it", "Where does the comma go?<br><b>We can swim or we can play ball.</b>|before or|after swim|after play",
    "Where does the comma go?<br><b>No I do not like fish.</b>|after No|after I|after like", "Where does the comma go?<br><b>Finally the bus came.</b>|after Finally|after the|after bus"],
    ["Commas tell readers where to take a tiny pause.", "A comma follows a starting word like <b>First, Yes, Well, Later</b>. Another comma goes before <b>and, but, or</b> when it joins two whole sentences.", "Example: <b>Next we cleaned up.</b> has a comma after Next. <b>I like tea but she likes milk</b> has a comma before but. Now do yours."],
    [["Starting words", "✏️", "After a starting word like <b>First</b>, <b>Yes</b> or <b>Finally</b>, add a comma."], ["Joining", "sentence, but sentence", "Put a comma before <b>and</b>, <b>but</b> or <b>or</b> when it joins two whole sentences."], ["Tip", "💡", "Say it out loud. Where do you naturally pause? That is often the comma."]]);
  const C6 = mk("Little words in titles", "📖", [
    "Which word in this title should <b>not</b> start with a capital letter?<br><b>Birds In Trees</b>|In|Birds|Trees", "Which word in this title should <b>not</b> start with a capital letter?<br><b>Bears At Play</b>|At|Bears|Play",
    "Which word in this title should <b>not</b> start with a capital letter?<br><b>Ants And Honey</b>|And|Ants|Honey", "Which word in this title should <b>not</b> start with a capital letter?<br><b>Ducks Go To Town</b>|To|Ducks|Town",
    "Which word in this title should <b>not</b> start with a capital letter?<br><b>Frogs On Logs</b>|On|Frogs|Logs", "Which word in this title should <b>not</b> start with a capital letter?<br><b>Cats Or Dogs</b>|Or|Cats|Dogs",
    "Which word in this title should <b>not</b> start with a capital letter?<br><b>A Trip By Train</b>|By|Trip|Train", "Which word in this title should <b>not</b> start with a capital letter?<br><b>Kites In Spring</b>|In|Kites|Spring"],
    ["In a title, the important words start with a capital letter. The tiny joining words do not.", "Small words like <b>a, an, the, in, on, at, to, by, and, or, of</b> stay small unless they are first.", "Example: <b>Dogs And Cats</b> should be <b>Dogs and Cats</b>. The word and is small. Now do yours."],
    [["Titles", "📖", "Capitalize the <b>first word</b> and the <b>important words</b> in a title."], ["Small words", "a · an · the · in · on · of", "Little words like <b>a, the, in, on, at, to, by, and, or, of</b> stay small, unless they come first."], ["Example", "The Cat in the Hat", "<b>The</b> is capital at the start. <b>in</b> and <b>the</b> stay small."]]);
  const C7 = mk("Prefixes: pre-, dis-, mis-", "🔠", [
    "What does <b>misspell</b> mean?|spell wrongly|spell again|spell before", "What does <b>disagree</b> mean?|not agree|agree again|agree before",
    "What does <b>preheat</b> mean?|heat before|heat wrongly|not heat", "What does <b>dislike</b> mean?|not like|like again|like before",
    "What does <b>pretest</b> mean?|a test before|a test again|a wrong test", "What does <b>misplace</b> mean?|put in the wrong place|put again|not place",
    "What does <b>disobey</b> mean?|not obey|obey again|obey first", "What does <b>prepay</b> mean?|pay before|pay wrongly|not pay"],
    ["The beginning part tells you how the base word changes. Find it first.", "<b>pre-</b> means <b>before</b>. <b>dis-</b> means <b>not</b> or <b>opposite</b>. <b>mis-</b> means <b>wrongly</b>.", "Example: <b>mistake</b>-type words: <b>misjudge</b> = judge wrongly. <b>preview</b> = view before. <b>disconnect</b> = not connect. Now do yours."],
    [["More prefixes", "🔠", "<b>pre-</b> means before. <b>dis-</b> means not. <b>mis-</b> means wrongly."], ["Examples", "preschool · dislike · misspell", "<b>preschool</b> = school before. <b>dislike</b> = not like. <b>misspell</b> = spell wrongly."], ["Tip", "💡", "Cover the prefix. Read the base word. Then add the meaning back."]]);
  const C8 = mk("Find the root word", "🌱", [
    "What is the root (base) word of <b>jumping</b>?|jump|jumpi|ping", "What is the root (base) word of <b>played</b>?|play|plaed|ed",
    "What is the root (base) word of <b>happily</b>?|happy|hap|ily", "What is the root (base) word of <b>hopeful</b>?|hope|hopef|ful",
    "What is the root (base) word of <b>unlocked</b>?|lock|unlock|ed", "What is the root (base) word of <b>replaying</b>?|play|replay|ing",
    "What is the root (base) word of <b>kindness</b>?|kind|kin|ness", "What is the root (base) word of <b>careless</b>?|care|car|less"],
    ["A root word is the main word with nothing added to the front or the back.", "Cut off any prefix at the start (un-, re-) and any ending at the back (-ing, -ed, -ful, -less, -ness). What word is left?", "Example: <b>unhappiness</b>: cut un- and -ness, change i back to y: <b>happy</b>. <b>walking</b>: cut -ing: <b>walk</b>. Now do yours."],
    [["Root words", "🌱", "A <b>root word</b> is the main part of a word. Prefixes and suffixes grow around it."], ["Example", "un + kind + ness", "<b>unkindness</b> has the root <b>kind</b>."], ["Tip", "💡", "Take away the beginnings and endings. What word is left that you know?"]]);
  const C9 = mk("Stronger words", "💪", [
    "Which word means <b>very big</b>?|enormous|large|medium", "Which word means <b>very small</b>?|tiny|little|short",
    "Which word means <b>very cold</b>?|freezing|chilly|cool", "Which word means <b>very hot</b>?|boiling|warm|mild",
    "Which word means <b>very tired</b>?|exhausted|sleepy|rested", "Which word means <b>very happy</b>?|thrilled|glad|fine",
    "Which word means <b>very scared</b>?|terrified|nervous|calm", "Which word means <b>very wet</b>?|soaked|damp|dry"],
    ["Words with the same idea can be weaker or stronger. Which one shows the most?", "Look for the choice that is more powerful than the plain word. Ignore the weak or opposite choices.", "Example: <b>good</b> → <b>great</b> → <b>wonderful</b>. Wonderful is strongest. Now do yours."],
    [["Shades of meaning", "💪", "Some words say the same thing, but with more or less strength."], ["Example", "warm → hot → boiling", "<b>cool → cold → freezing</b>. Each one is stronger."], ["Writing tip", "✏️", "A strong word makes your sentence clearer: \"The soup was <b>boiling</b>\" beats \"very hot\"."]]);
  const C10 = mk("Similes: as ... as", "🌟", [
    "as busy as a ___|bee|rock|cloud", "as light as a ___|feather|brick|car", "as cold as ___|ice|fire|soup",
    "as sly as a ___|fox|cow|rock", "as brave as a ___|lion|tissue|sheep", "as slow as a ___|snail|rocket|cheetah",
    "as fast as a ___|cheetah|snail|turtle", "as bright as the ___|sun|dark|mud"],
    ["A simile compares two things using the word as or like. Which picture fits best?", "Think about the main trait: busy, light, cold. Which choice is famous for it?", "Example: <b>as quiet as a ___</b>: a <b>mouse</b>. Mice are quiet. Now do yours."],
    [["Simile", "🌟", "A <b>simile</b> compares two things using <b>like</b> or <b>as</b>."], ["Examples", "as brave as a lion", "<b>as light as a feather</b>, <b>as cold as ice</b>, <b>runs like the wind</b>."], ["Use them!", "✏️", "Similes make your writing exciting and easy to picture."]]);
  const C11 = mk("Four kinds of sentences", "🗣️", [
    "What kind of sentence is this?<br><b>Please close the door.</b>|command|statement|question", "What kind of sentence is this?<br><b>The moon is bright.</b>|statement|command|question",
    "What kind of sentence is this?<br><b>Where is my hat?</b>|question|statement|command", "What kind of sentence is this?<br><b>What a great day!</b>|exclamation|statement|question",
    "What kind of sentence is this?<br><b>Wash your hands.</b>|command|exclamation|question", "What kind of sentence is this?<br><b>I love this song!</b>|exclamation|command|question",
    "What kind of sentence is this?<br><b>Can I have a turn?</b>|question|command|exclamation", "What kind of sentence is this?<br><b>Birds sing in spring.</b>|statement|question|command"],
    ["Think about what the sentence is doing. Telling? Asking? Giving an order? Showing a strong feeling?", "A <b>statement</b> tells. A <b>question</b> asks. A <b>command</b> tells someone to do something. An <b>exclamation</b> shows a strong feeling.", "Example: <b>Sit down.</b> is an order: command. <b>It is hot!</b> shows strong feeling: exclamation. Now do yours."],
    [["Statement and question", "🗣️", "A <b>statement</b> tells something (.). A <b>question</b> asks something (?)."], ["Command", "👉", "A <b>command</b> tells someone to do something: <b>Pick up your toys.</b>"], ["Exclamation", "❗", "An <b>exclamation</b> shows a strong feeling: <b>What a big wave!</b>"]]);
  const C12 = mk("Join two sentences", "🧵", [
    "Join these two sentences:<br>The soup is hot.<br>The soup is tasty.|The soup is hot and tasty.|The soup hot and tasty is.|Soup hot the and tasty.",
    "Join these two sentences:<br>Mia likes to read.<br>Mia likes to draw.|Mia likes to read and draw.|Mia likes read and to draw.|Likes Mia to read draw.",
    "Join these two sentences:<br>The dog is big.<br>The dog is friendly.|The dog is big and friendly.|The dog big friendly and is.|Dog the is big, friendly the.",
    "Join these two sentences:<br>We ran.<br>We jumped.|We ran and jumped.|We ran jumped and we.|And we ran we jumped.",
    "Join these two sentences:<br>I like pizza.<br>I do not like peas.|I like pizza, but I do not like peas.|I like pizza, because I do not like peas.|I like pizza peas not.",
    "Join these two sentences:<br>The bird sang.<br>The bird flew away.|The bird sang and flew away.|The bird sang flew and away.|Sang the bird and away flew.",
    "Join these two sentences:<br>Dad cooks dinner.<br>Dad washes dishes.|Dad cooks dinner and washes dishes.|Dad cooks and dinner washes dishes.|Cooks Dad dinner dishes and.",
    "Join these two sentences:<br>It was raining.<br>We stayed inside.|It was raining, so we stayed inside.|It was raining, but we stayed inside happy.|Raining inside so was stayed it."],
    ["Joining short sentences makes writing smoother. Look for the part that repeats.", "Say the repeated part only once, then join the different parts with <b>and</b>, <b>but</b> or <b>so</b>. The result must still be a whole sentence.", "Example: <b>Ben sings. Ben dances.</b> becomes <b>Ben sings and dances.</b> Now do yours."],
    [["Joining", "🧵", "Two short sentences can become one smoother sentence."], ["Example", "I ran. I jumped.", "<b>I ran and jumped.</b> The repeated word <b>I</b> is only said once."], ["Joining words", "and · but · so", "Use <b>and</b> to add, <b>but</b> to show a difference, <b>so</b> to show a result."]]);
  const C13 = mk("The main idea", "🎯", [
    "What is the main idea?<br><b>Bees make honey. Bees help flowers grow. Bees are helpful insects.</b>|Bees are helpful.|Honey is sticky.|Flowers are pretty.",
    "What is the main idea?<br><b>Dogs can guard homes. Dogs can help blind people. Dogs can find lost things.</b>|Dogs do many jobs.|Dogs like bones.|Dogs bark loudly.",
    "What is the main idea?<br><b>Plants need sun. Plants need water. Plants need soil.</b>|Plants need certain things to grow.|Soil is brown.|Water is wet.",
    "What is the main idea?<br><b>Fall leaves turn red. Fall days get shorter. Fall air gets cool.</b>|Fall brings changes.|Red is a color.|Leaves fall off.",
    "What is the main idea?<br><b>Penguins cannot fly. Penguins swim fast. Penguins slide on ice.</b>|Penguins are good swimmers who cannot fly.|Ice is cold.|Birds have feathers.",
    "What is the main idea?<br><b>Libraries have books. Libraries have computers. Libraries have story time.</b>|Libraries offer many things.|Books have pages.|Computers have keys.",
    "What is the main idea?<br><b>Turtles carry a shell. Turtles move slowly. Turtles can live a long time.</b>|Turtles are interesting animals.|Shells are hard.|Time is long.",
    "What is the main idea?<br><b>Exercise makes us strong. Exercise helps us sleep. Exercise is fun with friends.</b>|Exercise is good for us.|Friends are nice.|Sleep is quiet."],
    ["The main idea is the big idea that all the sentences share.", "Do not pick just one detail. Choose the choice that covers every sentence.", "Example: <b>Cats purr. Cats climb. Cats nap.</b> The big idea: <b>Cats do cat things.</b> Now do yours."],
    [["Main idea", "🎯", "The <b>main idea</b> is what a paragraph is mostly about."], ["Details", "📋", "<b>Details</b> are small facts that support the main idea."], ["Tip", "💡", "Ask: what one sentence could cover all the details?"]]);
  const C14 = mk("Parts of a letter", "✉️", [
    "In a letter, what is <b>Dear Sam,</b>?|the greeting|the closing|the body", "In a letter, what is <b>Your friend, Ann</b>?|the closing|the greeting|the body",
    "In a letter, what is <b>Thank you for the gift. I love it.</b>?|the body|the greeting|the closing", "In a letter, what is <b>Love, Max</b>?|the closing|the greeting|the body",
    "In a letter, what is <b>Dear Mr. Lee,</b>?|the greeting|the closing|the body", "In a letter, what is <b>I had so much fun at your party.</b>?|the body|the greeting|the closing",
    "In a letter, what is <b>Sincerely, Jo</b>?|the closing|the greeting|the body", "In a letter, what is <b>Dear Aunt Rose,</b>?|the greeting|the closing|the body"],
    ["A letter has parts in a special order. Where does this piece go: start, middle or end?", "The <b>greeting</b> starts the letter. The <b>body</b> is the message. The <b>closing</b> and your name end it.", "Example: <b>Dear Ben,</b> starts the letter: greeting. <b>Your pal, Kim</b> ends it: closing. Now do yours."],
    [["Letter parts", "✉️", "A friendly letter has a <b>date</b>, a <b>greeting</b>, a <b>body</b>, a <b>closing</b> and your <b>name</b>."], ["Greeting", "Dear Grandma,", "The <b>greeting</b> says hello and uses a comma."], ["Closing", "Love, Mia", "The <b>closing</b> says goodbye, like <b>Your friend,</b> or <b>Sincerely,</b>, and uses a comma."]]);
  const C15 = mk("Parts of a story", "📚", [
    "Ben lost his kite in a tree.<br>What part of the story is this?|the problem|the setting|the solution", "A boy named Leo had a pet fox.<br>What part of the story is this?|the character|the problem|the solution",
    "Ben climbed up and got the kite back.<br>What part of the story is this?|the solution|the problem|the setting", "It was a snowy night in a quiet village.<br>What part of the story is this?|the setting|the character|the solution",
    "The little robot could not find its battery.<br>What part of the story is this?|the problem|the setting|the character", "Mia asked a friend to help, and they found the battery.<br>What part of the story is this?|the solution|the setting|the problem",
    "On a sunny day at the beach, the crabs played.<br>What part of the story is this?|the setting|the problem|the solution", "Captain Pip was a brave little duck.<br>What part of the story is this?|the character|the setting|the problem"],
    ["Stories have parts. Think about what this sentence does in the story.", "<b>Characters</b> are who. <b>Setting</b> is where and when. The <b>problem</b> is the trouble. The <b>solution</b> fixes it.", "Example: <b>Tess cannot find her shoe.</b> That is trouble: the problem. <b>She finds it under the bed.</b> That fixes it: the solution. Now do yours."],
    [["Story parts", "📚", "A story has <b>characters</b> (who), a <b>setting</b> (where and when), a <b>problem</b> and a <b>solution</b>."], ["Example", "🐸 pond · lost key · found key", "Character: frog. Setting: pond. Problem: lost key. Solution: found it."], ["Tip", "💡", "Ask: who is it about? Where? What went wrong? How was it fixed?"]]);
  const C16 = mk("Reasons for an opinion", "👍", [
    "Which reason best supports this opinion?<br><b>Dogs make great pets.</b>|They are loyal and fun to play with.|Dogs have four legs and fur.|I saw a dog.",
    "Which reason best supports this opinion?<br><b>Reading is important.</b>|It helps you learn new things.|Books come in many sizes.|My book is blue.",
    "Which reason best supports this opinion?<br><b>Kids should play outside.</b>|It keeps them healthy and happy.|The sky is blue.|Some trees are tall.",
    "Which reason best supports this opinion?<br><b>Recess should be longer.</b>|Kids learn better after a good break.|The bell is loud.|Recess is after lunch.",
    "Which reason best supports this opinion?<br><b>Everyone should recycle.</b>|It helps keep our planet clean.|Cans are shiny.|Bins can be green.",
    "Which reason best supports this opinion?<br><b>Our school needs a garden.</b>|We could grow food and learn about plants.|Gardens have dirt.|I like green.",
    "Which reason best supports this opinion?<br><b>Sleep is important.</b>|It gives your body energy for the next day.|Beds have pillows.|Night is dark.",
    "Which reason best supports this opinion?<br><b>Libraries are great.</b>|You can borrow books for free.|The building is big.|There is a desk."],
    ["An opinion needs a good reason. A reason explains WHY you think it.", "A strong reason is connected to the opinion and tells why it is true. A random fact does not.", "Example: Opinion: <b>Soup is great on cold days.</b> Reason: <b>It warms you up.</b> That connects. Now do yours."],
    [["Opinion writing", "👍", "An <b>opinion</b> says what you think. A <b>reason</b> says <b>why</b>."], ["Linking", "because · also", "Use <b>because</b> and <b>also</b> to add reasons: \"I love swimming <b>because</b> it is fun.\""], ["Tip", "💡", "A good reason really supports your opinion. Ask: does this make someone agree with me?"]]);
  const C17 = mk("Order words for steps", "🥪", [
    "___, get two slices of bread. Next, add peanut butter.<br>Which word fits?|First|Finally|Last", "First, wash your hands. ___, dry them with a towel.<br>Which word fits?|Next|Finally|First",
    "First, put on your socks. Next, put on your shoes. ___, tie the laces.<br>Which word fits?|Finally|First|Before", "First, plant the seed. ___, water it every day.<br>Which word fits?|Then|Last|Finally",
    "First, crack the eggs. Then, stir them. ___, serve them hot.<br>Which word fits?|Finally|First|Then", "___, open the book. Next, find the page.<br>Which word fits?|First|Finally|Last",
    "First, draw a circle. Then, add two eyes. ___, draw a smile.<br>Which word fits?|Last|First|Before", "First, fill a cup with water. ___, add a straw.<br>Which word fits?|Next|Finally|Lastly"],
    ["Steps happen in an order. Is this the beginning, the middle or the end?", "<b>First</b> starts, <b>next</b> and <b>then</b> go in the middle, <b>finally</b> and <b>last</b> end.", "Example: <b>___, get a bowl. Then, add cereal. ___, pour milk.</b> First, then Finally. Now do yours."],
    [["Sequence words", "🥪", "<b>First</b>, <b>next</b>, <b>then</b>, <b>last</b> and <b>finally</b> show the order of steps."], ["Example", "1️⃣ 2️⃣ 3️⃣", "First, spread the jam. Next, add the top slice. Finally, cut it in half."], ["Tip", "💡", "Use them when you write how-to paragraphs, so readers can follow."]]);
  const C18 = mk("Find the mistake", "🔎", [
    "Find the mistake:<br><b>we saw a big dog.</b>|needs a capital letter|needs a question mark|needs a comma",
    "Find the mistake:<br><b>Where is my shoe.</b>|needs a question mark|needs a capital letter|needs a comma",
    "Find the mistake:<br><b>I herd a loud noise.</b>|wrong word spelling (heard)|needs a question mark|needs a capital letter",
    "Find the mistake:<br><b>We bought eggs milk and bread.</b>|needs commas in the list|needs a question mark|needs a capital letter",
    "Find the mistake:<br><b>The kids ate there lunch.</b>|wrong word (their)|needs a question mark|needs a capital letter",
    "Find the mistake:<br><b>Mia said I am ready.</b>|needs quotation marks|needs a capital letter|needs a question mark",
    "Find the mistake:<br><b>He go to school.</b>|verb does not match (goes)|needs a question mark|needs a comma",
    "Find the mistake:<br><b>I seen a big bird.</b>|wrong verb form (saw)|needs a question mark|needs a comma"],
    ["Check the sentence step by step: capital letter, end mark, spelling, verb, commas.", "Read it out loud, slowly. Which part sounds or looks wrong?", "Example: <b>they like pizza.</b> It starts with a small t: needs a capital letter. <b>Do you like pizza.</b> It asks, but ends with a period: needs a question mark. Now do yours."],
    [["Editing", "🔎", "<b>Editing</b> means checking your writing and fixing mistakes."], ["Checklist", "✅", "Capital letter at the start? Right end mark? Words spelled right? Verbs matching? Commas in lists?"], ["Tip", "💡", "Read your writing out loud. Your ears often catch what your eyes miss."]]);

  Object.assign(WRITING_LEVELS, {
    4: [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18,
      MIX("Mixed practice", A1, A5, A9, A13, A15), MIX("Level 4 Challenge", A2, A3, A8, A10, A12, A14, A17, A18)],
    5: [B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17, B18,
      MIX("Mixed practice", B1, B4, B7, B9, B13), MIX("Level 5 Challenge", B3, B5, B8, B10, B11, B14, B16, B18)],
    6: [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, C17, C18,
      MIX("Mixed practice", C1, C3, C5, C8, C11), MIX("Level 6 Challenge", C2, C4, C7, C9, C12, C14, C15, C18)]
  });
})();
