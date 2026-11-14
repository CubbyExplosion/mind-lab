// ext/writing-10-12.js  Mind Lab Writing & Grammar, levels 10-12 (60 lessons)
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
  // sq: same question text for every row; row = "correct|wrong|wrong"
  const sq = (q, rows) => rows.map(r => q + "|" + r);
  // bq: question + bold sentence; row = "sentence|answer|wrong|wrong"
  const bq = (q, rows) => rows.map(r => { const p = r.split("|"); p[0] = q + "<br><br><b>" + p[0] + "</b>"; return p.join("|"); });

  // =============== LEVEL 10 ===============
  const A1 = mk("Plural or possessive?", "🐶", [
    "Where does the apostrophe go in <b>dogs tail</b>? (the tail of one dog)|before the s|after the s|no apostrophe",
    "Where does the apostrophe go in <b>birds</b>? (Three birds sat on the fence.)|no apostrophe|before the s|after the s",
    "Where does the apostrophe go in <b>dogs bowls</b>? (the bowls of two dogs)|after the s|before the s|no apostrophe",
    "Where does the apostrophe go in <b>birds nest</b>? (the nest of one bird)|before the s|after the s|no apostrophe",
    "Where does the apostrophe go in <b>kids voices</b>? (the voices of many kids)|after the s|before the s|no apostrophe",
    "Where does the apostrophe go in <b>bikes</b>? (My bikes are in the garage.)|no apostrophe|before the s|after the s",
    "Where does the apostrophe go in <b>bikes wheel</b>? (the wheel of one bike)|before the s|after the s|no apostrophe",
    "Where does the apostrophe go in <b>cats toys</b>? (the toys of two cats)|after the s|before the s|no apostrophe"],
    ["Ask: is the word only counting more than one, or does it own something? How many owners are there?", "Counting only: no apostrophe at all. One owner: the apostrophe comes before the s. Many owners that end in s: the apostrophe comes after the s.", "Example: <b>rabbits ears</b> (the ears of one rabbit): one owner, so the apostrophe goes before the s. <b>Two rabbits hopped</b>: only counting, so no apostrophe. Now do yours."],
    [["Two jobs for s", "🐶", "A word that ends in <b>s</b> may just mean <b>more than one</b> (dogs) or it may show <b>ownership</b> (dog's)."], ["Who owns it?", "🦴", "One owner: <b>the dog's bone</b>. Many owners: <b>the dogs' bones</b>. The apostrophe tells you how many owners there are."], ["Quick test", "💡", "Say 'belonging to'. If you can, it is possessive. <b>The tail belonging to the dog</b> = the dog's tail. If you cannot, it is a plain plural: <b>three dogs</b>."]]);

  const A2 = mk("Commas when talking to someone", "💬", bq("Where does the <b>comma</b> go? (One comma is missing.)", [
    "Thank you Grandma.|after you|after Thank|after Grandma",
    "Class please line up.|after Class|after please|after line",
    "Can you help me Dad?|after me|after help|after Can",
    "Hello Ms. Lee!|after Hello|after Ms.|after Lee",
    "Lucy your pizza is ready.|after Lucy|after your|after pizza",
    "Please pass the salt Aunt Rosa.|after salt|after pass|after the",
    "Yes we can go now.|after Yes|after we|after can",
    "Well I think we should go.|after Well|after I|after think"]),
    ["Find the name or title of the person being spoken to, or the starting word like yes or well.", "Use a comma to set off the name of the person you are talking to. Also use a comma after a starting word like yes, no or well. Put it right between that word and the rest.", "Example: <b>Hi Leo how are you</b> becomes <b>Hi, Leo, how are you?</b> The name is set off by commas. Now do yours."],
    [["Talking to someone", "🗣️", "When you speak straight to a person, their name is called a <b>noun of address</b>."], ["Set it off", "✂️", "Put a comma between the name and the rest. At the start: <b>Mia, come here.</b> At the end: <b>Come here, Mia.</b> In the middle: <b>Come, Mia, and see.</b>"], ["Starting words", "👋", "Words like <b>yes</b>, <b>no</b>, <b>well</b> and <b>oh</b> also get a comma: <b>Yes, I can.</b>"]]);

  const A3 = mk("Helping verbs", "🤝", bq("Find the <b>helping verb</b>.", [
    "She is baking cookies.|is|baking|cookies",
    "We have finished our project.|have|finished|project",
    "The kids were playing outside.|were|playing|outside",
    "I will visit my aunt.|will|visit|aunt",
    "He has lost his key.|has|lost|key",
    "They can swim fast.|can|swim|fast",
    "The dog was chasing a squirrel.|was|chasing|squirrel",
    "You should wear a coat.|should|wear|coat"]),
    ["A helping verb sits right before the main verb. Which word is the action, and which word helps it?", "Helping verbs do not show the action by themselves. They add time or meaning to the main verb.", "Example: <b>Mia is reading a book.</b> Reading is the action. The word right before it is the helper. Now do yours."],
    [["Verb teams", "🤝", "Many verbs work as a team: a <b>helping verb</b> plus a <b>main verb</b>. Together they make a <b>verb phrase</b>."], ["Main and helper", "📖", "In <b>Mia is reading</b>, the main verb <b>reading</b> shows the action. The helper <b>is</b> tells when it happens."], ["Common helpers", "🧰", "am, is, are, was, were, has, have, had, will, can, could, should, would, must. Spot them just before the action word."]]);

  const A4 = mk("Possessive pronouns", "👉", [
    "That book is not mine. The red one belongs to her. It is ___.|hers|she|her",
    "The dog wagged ___ tail.|its|it|it is",
    "Our team won, and the trophy belongs to us. It is ___.|ours|we|our",
    "The garden belongs to them. It is ___.|theirs|they|them",
    "Is this pencil ___? (it belongs to you)|yours|you|your",
    "The cat licked ___ paws.|its|it|it is",
    "That blue bike belongs to him. It is ___.|his|he|him",
    "That house belongs to me. It is ___.|mine|my|me"],
    ["Does the blank show that something belongs to someone? Which word shows ownership?", "A possessive pronoun takes the place of a noun and shows who owns it. It never needs an apostrophe.", "Example: <b>The bird fed ___ chicks.</b> Which word shows the chicks belong to it? Its. <b>That coat belongs to you. It is ___.</b> Yours. Now do yours."],
    [["Owning pronouns", "👉", "Some pronouns show who owns something: <b>mine, yours, his, hers, ours, theirs, its</b>."], ["No apostrophe!", "🚫", "Possessive pronouns never use an apostrophe. We write <b>The book is hers</b>, not her's."], ["Its or it's?", "🔎", "<b>It's</b> = it is or it has. <b>Its</b> = belongs to it. Test: say 'it is'. If it fits, use it's."]]);

  const A5 = mk("Double negatives", "🚫", sq("Which sentence is correct?", [
    "I don't have any pencils.|I don't have no pencils.|I haven't no pencils.",
    "We didn't see anyone.|We didn't see no one.|We didn't see nobody.",
    "She has never eaten anything spicy.|She hasn't never eaten anything spicy.|She never ate nothing spicy.",
    "There isn't any milk left.|There isn't no milk left.|There ain't no milk left.",
    "He can't find his shoes anywhere.|He can't find his shoes nowhere.|He can't never find his shoes.",
    "I have no homework today.|I haven't no homework today.|I don't have no homework today.",
    "Nobody wanted to leave.|Nobody didn't want to leave.|Nobody wanted not to leave.",
    "They didn't bring anything.|They didn't bring nothing.|They never brought nothing."]),
    ["Count the 'no' words in each choice: no, not, n't, never, nobody, nothing, nowhere.", "A sentence needs only one 'no' word. Two together cancel each other out and make the meaning muddled.", "Example: <b>I can't see nothing</b> has two. Fix it: <b>I can't see anything</b> or <b>I can see nothing.</b> Now do yours."],
    [["Too many nos", "🙅", "A <b>double negative</b> uses two 'no' words in one idea, like <b>don't have no</b>."], ["Why fix it?", "🧮", "In math, a minus and a minus make a plus. In writing, two negatives can turn into a yes! <b>I don't have no money</b> could mean you do have some."], ["The fix", "🔧", "Keep one. Change the other to a word like <b>any</b>, <b>anyone</b>, <b>anything</b> or <b>ever</b>."]]);

  const A6 = mk("Abbreviations", "✏️", [
    "What is the usual abbreviation for <b>Mister</b>?|Mr.|Mstr.|Mir.",
    "What is the usual abbreviation for <b>Street</b>?|St.|Str|Sr.",
    "What is the usual abbreviation for <b>Doctor</b> before a name?|Dr.|Doc.|Dtr.",
    "What is the usual abbreviation for <b>Avenue</b>?|Ave.|Av|Avn.",
    "What is the usual abbreviation for <b>January</b>?|Jan.|Janu|Ja.",
    "What is the usual abbreviation for <b>Monday</b>?|Mon.|Mo|Mnd.",
    "What is the usual abbreviation for <b>Road</b>?|Rd.|Roa.|Rod.",
    "What is the usual abbreviation for <b>Mount</b>, as in Mount Rainier?|Mt.|Mnt|Mo."],
    ["An abbreviation is a short way to write a long word. Think about the first letters of the word.", "Most abbreviations use the first letters of the word and end with a period. Titles and days start with a capital letter.", "Example: <b>Wednesday</b> is shortened to <b>Wed.</b> and <b>Captain</b> to <b>Capt.</b> Keep the first letters and end with a period. Now do yours."],
    [["Short words", "✏️", "An <b>abbreviation</b> is a shortened form of a word. It saves space in addresses, lists and notes."], ["Add the dot", "⚫", "Most abbreviations end with a <b>period</b>: Mr., Dr., St., Ave., Jan., Mon."], ["Capital letters", "🔠", "Titles, days and months keep their capital letter: <b>Dr. Kim</b>, <b>Tues.</b>, <b>Oct.</b> Use them in notes, not in everyday sentences."]]);

  const A7 = mk("Hyphens in words", "➖", sq("Which one needs a hyphen?", [
    "twenty five|twenty cats|twenty of them",
    "a ten year old boy|a tall boy|a very happy boy",
    "my mother in law|my mother and father|my mother says",
    "sixty three marbles|sixty red marbles|sixty big marbles",
    "a quick thinking girl|a quick girl|a very clever girl",
    "ninety nine balloons|ninety balloons|a few balloons",
    "a well known author|a famous author|an old author",
    "a two word answer|a short answer|a clear answer"]),
    ["Look for words that team up to act as one word. Which choice has a number-pair or a team-up describer?", "Use a hyphen in numbers from twenty-one to ninety-nine, in family words with 'in-law', and to join words that act as one describing word before a noun.", "Example: <b>a well known singer</b> needs a hyphen, because well and known work together to describe the singer. <b>forty two</b> needs one too. Now do yours."],
    [["The hyphen", "➖", "A <b>hyphen</b> is a short line that joins words or word parts together."], ["Numbers", "🔢", "Write numbers from 21 to 99 with a hyphen: <b>twenty-one</b>, <b>forty-six</b>, <b>ninety-nine</b>."], ["Team describers", "🤝", "When two words team up to describe a noun, join them: <b>a part-time job</b>, <b>a ten-year-old boy</b>. Also family words like <b>sister-in-law</b>."]]);

  const A8 = mk("The colon", "🔟", [
    "Where does the colon go?<br><br><b>Bring these items a pencil, a ruler and an eraser.</b>|after items|after Bring|after pencil",
    "Where does the colon go?<br><br><b>She has three pets a cat, a dog and a fish.</b>|after pets|after has|after cat",
    "Where does the colon go?<br><br><b>The recipe needs four things flour, eggs, milk and sugar.</b>|after things|after needs|after flour",
    "Where does the colon go?<br><br><b>We visited two cities Denver and Dallas.</b>|after cities|after visited|after Denver",
    "Where does the colon go?<br><br><b>You will need the following paper, glue and tape.</b>|after following|after need|after paper",
    "Where does the colon go?<br><br><b>I have one wish peace.</b>|after wish|after have|after one",
    "In the time 7:30, which mark separates the hour from the minutes?|a colon|a semicolon|a comma",
    "Which mark points to a list after a complete sentence?|a colon|a hyphen|an apostrophe"],
    ["Find the place where a complete sentence is finished and a list or explanation is about to start.", "A colon follows a complete thought and points to a list or an explanation. Do not put a colon straight after a verb like 'has' or 'need'. A colon also separates hours and minutes.", "Example: <b>I packed three things socks, a hat and a map.</b> The sentence is complete after 'things', so the colon goes there. Now do yours."],
    [["The colon", "🔟", "A <b>colon</b> (:) says 'here comes more'. It points to a list or an explanation."], ["After a whole sentence", "📋", "Write a complete sentence first, then the colon, then the list: <b>We bought fruit: apples, pears and plums.</b>"], ["Do not interrupt", "🚧", "Do not place a colon after a verb like 'are' or 'need'. Colons also split hours and minutes: <b>4:45</b>."]]);

  const A9 = mk("Interjections", "😮", bq("Which word is the <b>interjection</b>?", [
    "Wow! That is a huge cake.|Wow|huge|cake",
    "Oops, I dropped my pencil.|Oops|dropped|pencil",
    "Yikes! The bus is leaving.|Yikes|bus|leaving",
    "Hooray! We won the game.|Hooray|won|game",
    "Ouch! That hurt my toe.|Ouch|hurt|toe",
    "Hey! Wait for me.|Hey|Wait|me",
    "Ahh, this soup is so good.|Ahh|soup|good",
    "Phew, I made it on time.|Phew|made|time"]),
    ["An interjection shows a sudden feeling, like surprise, joy or pain.", "It often comes first and is followed by an exclamation mark or a comma. It is not part of the main sentence.", "Example: <b>Yay! We get pizza.</b> Yay shows joy and stands apart from the sentence. Now do yours."],
    [["Little outbursts", "😮", "An <b>interjection</b> is a word that shows a sudden feeling: <b>Wow! Ouch! Hooray!</b>"], ["Punctuation", "❗", "Strong feelings get an exclamation mark: <b>Hooray!</b> Mild feelings get a comma: <b>Well, I think so.</b>"], ["Stands alone", "🏝️", "An interjection is not connected to the rest of the sentence. If you take it away, the sentence still works."]]);

  const A10 = mk("Look-alike words 3", "🔀", [
    "We don't know ___ it will rain.|whether|weather|wether",
    "The ___ is sunny today.|weather|whether|wheather",
    "Press the ___ to stop the bike.|brake|break|braik",
    "Take a ___ and rest.|break|brake|breik",
    "She ___ the ball over the fence.|threw|through|thru",
    "We walked ___ the tunnel.|through|threw|thru",
    "The ___ of our school is very kind.|principal|principle|principel",
    "Please be ___ in the library.|quiet|quite|quit",
    "I ate chocolate cake for ___.|dessert|desert|desart"],
    ["Sound-alike words have different meanings. What does the sentence need: an action, a thing or a describing word?", "Match the meaning. Weather is about rain and sun. Another word means 'if'. One stops a bike, the other is a rest. Past action versus from one side to the other.", "Example: <b>He ___ his bag on the bed.</b> It is a past action: threw. <b>We drove ___ the town.</b> From one side to the other: through. Now do yours."],
    [["Tricky pairs", "🔀", "These words sound alike but mean different things: <b>weather/whether</b>, <b>brake/break</b>, <b>threw/through</b>."], ["Meanings", "📖", "<b>Weather</b> = sun, rain, snow. <b>Whether</b> = if. <b>Brake</b> = to stop. <b>Break</b> = to snap, or a rest. <b>Principal</b> = head of a school."], ["Memory tricks", "💡", "The <b>principal</b> is your <b>pal</b>. A <b>dessert</b> has two s's because you want <b>s</b>econd helpings!"]]);

  const A11 = mk("Prefixes: anti-, inter-, sub-, trans-", "🧱", [
    "What does the prefix <b>sub-</b> mean?|under|against|across",
    "What does the prefix <b>trans-</b> mean, as in <i>transport</i>?|across|under|between",
    "What does the prefix <b>inter-</b> mean?|between|against|under",
    "What does the prefix <b>anti-</b> mean?|against|between|across",
    "A boat that travels under the water is a ___marine.|sub|anti|inter",
    "A flight across the Atlantic Ocean is ___atlantic.|trans|sub|anti",
    "A game between nations is an ___national game.|inter|anti|sub",
    "A train that runs under the ground is a ___way train.|sub|trans|inter"],
    ["A prefix is added to the front of a word. Think about the direction or place the word means.", "One prefix is about being below, one is about moving over to the other side, one is about being among others, one is about being opposed.", "Example: <b>sub-</b> + <b>zero</b> = subzero, below zero. <b>anti-</b> + <b>bully</b> = against bullying. Now do yours."],
    [["Prefix power", "🧱", "A <b>prefix</b> comes at the start of a word and changes its meaning."], ["Four new prefixes", "🔑", "<b>sub-</b> = under. <b>trans-</b> = across. <b>inter-</b> = between. <b>anti-</b> = against."], ["Build words", "🏗️", "<b>submarine</b> (under the sea), <b>transatlantic</b> (across the Atlantic), <b>international</b> (between nations), <b>antifreeze</b> (against freezing)."]]);

  const A12 = mk("Spelling rules for endings", "🔤", [
    "Add <b>-ing</b> to <b>make</b>.|making|makeing|makking",
    "Add <b>-ed</b> to <b>hop</b>.|hopped|hoped|hopedd",
    "Make <b>baby</b> mean more than one.|babies|babys|babyes",
    "Add <b>-ing</b> to <b>run</b>.|running|runing|runming",
    "Add <b>-ed</b> to <b>carry</b>.|carried|carryed|caried",
    "Add <b>-ing</b> to <b>dance</b>.|dancing|danceing|dancking",
    "Add <b>-er</b> to <b>big</b>.|bigger|biger|bigier",
    "Add <b>-ed</b> to <b>smile</b>.|smiled|smileed|smilled"],
    ["Look at the last letters of the base word. Is it a silent e, a y, or one vowel and one consonant?", "Silent e: drop the e before -ing or -ed. Consonant + y: change the y to i before -ed or -es. One short vowel plus one consonant: double the consonant.", "Example: <b>skate + ing</b> drops the e: skating. <b>cry + ed</b> changes y to i: cried. <b>sit + ing</b> doubles the t: sitting. Now do yours."],
    [["Endings change words", "🔤", "When you add <b>-ing</b>, <b>-ed</b>, <b>-er</b> or <b>-es</b>, the base word sometimes changes."], ["Three rules", "📏", "1) Silent e: <b>drop the e</b> (hope, hoping). 2) Consonant + y: <b>y to i</b> (try, tried). 3) Short vowel + one consonant: <b>double it</b> (hop, hopped)."], ["Check it", "✅", "Say the word aloud. A doubled letter keeps the vowel short: <b>hopped</b> (hop) but <b>hoped</b> (hope)."]]);

  const A13 = mk("Better than 'said'", "🗣️", [
    "'Help!' he ___ as the boat began to tip.|shouted|whispered|giggled",
    "'It is a secret,' she ___ so no one could hear.|whispered|shouted|cheered",
    "'We won the match!' the team ___.|cheered|mumbled|sighed",
    "'Ha ha, that joke is funny!' he ___.|giggled|groaned|whispered",
    "'I am so sleepy,' Dad ___ with a big yawn.|sighed|cheered|barked",
    "'Please, can I have that toy?' the little boy ___.|whined|chuckled|boomed",
    "'The answer is seven,' the teacher calmly ___.|replied|howled|squealed",
    "'Look out behind you!' she ___ in a loud voice.|yelled|murmured|sighed"],
    ["Look at the clues in the sentence. How loud was the voice, and what was the feeling?", "Pick the speaking word that matches the volume and the feeling. A quiet secret and a cheering crowd need very different words.", "Example: <b>'I can't find my toy,' she ___ sadly.</b> A sad, soft voice fits sobbed, not roared. Now do yours."],
    [["Said is tired", "😴", "<b>Said</b> is fine, but a stronger word shows how the words were spoken."], ["Match the feeling", "🎭", "Loud: <b>shouted, yelled, cheered</b>. Quiet: <b>whispered, murmured</b>. Sad: <b>sighed, sobbed</b>. Happy: <b>giggled, laughed</b>."], ["Clues in the sentence", "🔎", "Use clues like 'in a loud voice' or 'so no one could hear' to choose the best word."]]);

  const A14 = mk("Hooks that grab readers", "🎣", sq("Which opening sentence is the best <b>hook</b>?", [
    "One cold morning, a tiny door appeared in my bedroom wall.|This story is about a door.|I will tell you about my room.",
    "Crash! The cymbals hit the floor and the whole band froze.|I am going to write about a band.|The band was in a room.",
    "Did you know a snail can sleep for up to three years?|This paper is about snails.|Snails are animals.",
    "The lights went out just as I opened the old trunk.|I found a trunk.|My story is about a trunk.",
    "Have you ever tried to carry five puppies at once?|This is a story about puppies.|I like puppies a lot.",
    "Splash! My brother and the garden hose had a plan.|My brother has a hose.|This story is about a hose.",
    "Nobody believed me when I said the moon was following our car.|I will tell you about a car ride.|We went for a drive.",
    "Beep, beep, beep! The robot would not stop dancing.|There was a robot.|I am writing about robots."]),
    ["Which opening makes you ask a question in your head, or feel something right away?", "A good hook uses action, a sound, a surprising fact or a question. A weak opening only announces the topic.", "Example: <b>The kitten was on the roof, and the ladder was gone!</b> beats <b>This story is about a kitten.</b> It makes you want to read on. Now do yours."],
    [["The first line", "🎣", "A <b>hook</b> is the opening of a piece of writing. It makes the reader want to keep reading."], ["Ways to hook", "🪝", "Start with action, a sound word, a surprising fact, a question, or a funny or mysterious moment."], ["Do not announce", "🚫", "Skip openings like <b>This story is about...</b>. Jump straight into the story."]]);

  const A15 = mk("Text features", "📚", [
    "Which text feature lists chapters and their page numbers?|table of contents|glossary|caption",
    "Which text feature is an alphabetical list of topics with page numbers at the back of a book?|index|table of contents|heading",
    "Which text feature gives the meaning of hard words at the back of a book?|glossary|index|caption",
    "Which text feature explains what a photograph shows?|caption|heading|index",
    "Which text feature tells you what a section is about before you read it?|heading|glossary|index",
    "Which text feature makes an important word stand out in dark print?|bold print|caption|index",
    "Which text feature shows numbers in rows and columns?|table|caption|glossary",
    "Which text feature uses labels to show the parts of something?|diagram|index|heading"],
    ["Think about where you would look in a book for that kind of help.", "The table of contents is at the start and goes in page order. The index and glossary are at the back and go in alphabetical order. One lists topics; the other gives meanings.", "Example: to find the meaning of 'habitat' at the back of a book, look in the glossary. To see which chapter is on bats, look at the contents page. Now do yours."],
    [["Book helpers", "📚", "<b>Text features</b> help you find and understand information in nonfiction."], ["Finding things", "🔍", "<b>Table of contents</b>: chapters in order at the front. <b>Index</b>: topics from A to Z at the back. <b>Glossary</b>: word meanings."], ["Showing things", "🖼️", "<b>Headings</b> name sections. <b>Captions</b> explain pictures. <b>Bold words</b> are important. <b>Diagrams</b> and <b>tables</b> organize facts."]]);

  const A16 = mk("Own words, not copied", "📝", [
    "Which sentence puts the idea in your <b>own words</b>?<br><br>Original: <i>The giant panda eats bamboo for most of the day.</i>|Pandas spend much of their time munching bamboo.|The giant panda eats bamboo for most of the day.|Pandas are black and white.",
    "Which sentence puts the idea in your <b>own words</b>?<br><br>Original: <i>Bees collect nectar from flowers to make honey.</i>|Bees gather flower nectar and turn it into honey.|Bees collect nectar from flowers to make honey.|Bees can sting people.",
    "Which sentence puts the idea in your <b>own words</b>?<br><br>Original: <i>The Sahara is the largest hot desert in the world.</i>|No other hot desert is as big as the Sahara.|The Sahara is the largest hot desert in the world.|The Sahara is covered in ice.",
    "Which sentence puts the idea in your <b>own words</b>?<br><br>Original: <i>Plants need sunlight, water and air to grow.</i>|To grow, a plant must get light, water and air.|Plants need sunlight, water and air to grow.|Plants like to be moved.",
    "Which sentence puts the idea in your <b>own words</b>?<br><br>Original: <i>The library opens at nine and closes at five.</i>|You can visit the library from nine until five.|The library opens at nine and closes at five.|The library has many books.",
    "Which sentence puts the idea in your <b>own words</b>?<br><br>Original: <i>Whales are mammals, so they breathe air.</i>|Because whales are mammals, they must come up for air.|Whales are mammals, so they breathe air.|Whales are huge fish.",
    "Which sentence puts the idea in your <b>own words</b>?<br><br>Original: <i>Volcanoes erupt when hot melted rock rises to the surface.</i>|An eruption happens when hot, melted rock pushes up to the top.|Volcanoes erupt when hot melted rock rises to the surface.|Volcanoes are very tall.",
    "Which sentence puts the idea in your <b>own words</b>?<br><br>Original: <i>Frogs begin life as tadpoles in the water.</i>|A frog's life starts as a tadpole swimming in water.|Frogs begin life as tadpoles in the water.|Frogs eat flies."],
    ["Rewriting in your own words means keeping the idea but changing the wording. Which choice does both?", "A copy repeats the same words. A different fact changes the idea. A good rewrite keeps the same meaning with new words.", "Example: <b>Owls hunt at night.</b> Own words: <b>Owls do their hunting after dark.</b> Same idea, new words. Now do yours."],
    [["Not copying", "📝", "When you write a report, you must use <b>your own words</b>. Copying someone's writing is not fair."], ["Paraphrase", "🔄", "To <b>paraphrase</b>, read the idea, look away, and say it your own way. The meaning stays the same."], ["Check it", "✅", "Does it keep the same idea? Are most of the words different? If yes to both, you paraphrased well."]]);

  const A17 = mk("Poetry words", "🎵", [
    "Which word rhymes with <b>light</b>?|kite|lamp|lake",
    "A group of lines in a poem is called a ___.|stanza|chapter|title",
    "Which word rhymes with <b>play</b>?|stay|stop|plan",
    "The beat of the words in a poem is called ___.|rhythm|stanza|title",
    "Which pair of words rhymes?|moon, spoon|moon, mine|cat, cut",
    "Two rhyming lines in a row (cat / hat) are called a ___.|couplet|stanza|riddle",
    "A poem with three lines of 5, 7 and 5 syllables is a ___.|haiku|couplet|stanza",
    "How many syllables does the first line of a haiku have?|5|7|9"],
    ["Say the words out loud and listen to the ending sounds.", "Rhyme means the ends of words sound the same. A stanza is a group of lines. A short Japanese-style poem follows a fixed counting pattern of syllables, line by line.", "Example: <b>sky</b> rhymes with <b>fly</b>. Two lines that rhyme side by side form a short matching pair. Now do yours."],
    [["Poem parts", "🎵", "Poems are written in <b>lines</b>. A group of lines is a <b>stanza</b>, like a paragraph in a poem."], ["Sound", "🎶", "<b>Rhyme</b> is when words end with the same sound. <b>Rhythm</b> is the beat you can tap."], ["Special poems", "🌸", "A <b>couplet</b> is two rhyming lines. A <b>haiku</b> has three lines with 5, 7 and 5 syllables."]]);

  const A18 = mk("Smooth, varied sentences", "🌊", bq("Which is the smoothest way to say this?", [
    "The sun set. The sky turned pink. The birds flew home.|As the sun set, the sky turned pink and the birds flew home.|The sun set. The sky turned pink. The birds flew home.|The sun set. Then the sky turned pink. Then the birds flew home.",
    "I ate lunch. I washed my hands. I went outside.|After I ate lunch and washed my hands, I went outside.|I ate lunch. I washed my hands. I went outside.|I ate lunch. Then I washed my hands. Then I went outside.",
    "Tom has a bike. It is red. It is fast.|Tom has a fast red bike.|Tom has a bike. It is red. It is fast.|Tom has a bike red fast.",
    "The rain fell. We stayed inside. We played games.|Because the rain fell, we stayed inside and played games.|The rain fell. We stayed inside. We played games.|The rain fell. Then we stayed inside. Then we played games.",
    "Mia sings. Mia dances. Mia acts.|Mia sings, dances and acts.|Mia sings. Mia dances. Mia acts.|Mia sings dances acts.",
    "We saw a bear. It was huge. It was in the woods.|In the woods, we saw a huge bear.|We saw a bear. It was huge. It was in the woods.|We saw a bear huge woods.",
    "Dad cooked. He made soup. It smelled good.|Dad made soup that smelled good.|Dad cooked. He made soup. It smelled good.|Dad cooked and he made soup and it smelled good.",
    "The cat napped. It was on the sofa. It was warm.|The cat napped on the warm sofa.|The cat napped. It was on the sofa. It was warm.|The cat napped sofa warm."]),
    ["Read the short sentences aloud. Do they sound choppy, like a robot?", "Join short sentences with words like because, after and as, or move details into one sentence. Do not just repeat 'then' again and again.", "Example: <b>I have a dog. It is brown. It is small.</b> becomes <b>I have a small brown dog.</b> Now do yours."],
    [["Choppy writing", "🤖", "Too many short sentences in a row sound choppy, like a robot."], ["Smooth it out", "🌊", "Join ideas: <b>As the sun set, the sky turned pink.</b> Move describing words in front of the noun: <b>a small brown dog</b>."], ["Mix it up", "🎨", "Use some short sentences and some longer ones. Start sentences in different ways. That is called <b>sentence variety</b>."]]);

  Object.assign(WRITING_LEVELS, {
    10: [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18,
      MIX("Mixed practice", A1, A3, A5, A8, A12), MIX("Level 10 Challenge", A2, A4, A6, A7, A10, A13, A16, A18)]
  });

  // =============== LEVEL 11 ===============
  const B1 = mk("Active or passive voice", "🎬", [
    "Which sentence is in the <b>passive voice</b>?|The window was broken by the ball.|The ball broke the window.|The boy threw the ball.",
    "Which sentence is in the <b>passive voice</b>?|The cake was eaten by the kids.|The kids ate the cake.|The cake looked tasty.",
    "Which sentence is in the <b>passive voice</b>?|The song was sung by the choir.|The choir sang the song.|The choir stood up.",
    "Which sentence is in the <b>passive voice</b>?|The letter was written by Ana.|Ana wrote the letter.|Ana smiled at the letter.",
    "Which sentence is in the <b>passive voice</b>?|The trees were planted by the class.|The class planted the trees.|The class watered the garden.",
    "Which sentence is in the <b>active voice</b>?|The chef cooked the soup.|The soup was cooked by the chef.|The soup was cooked slowly.",
    "Which sentence is in the <b>active voice</b>?|A bee stung my arm.|My arm was stung by a bee.|My arm was stung.",
    "Which sentence is in the <b>active voice</b>?|My sister walked the dog.|The dog was walked by my sister.|The dog was walked."],
    ["Who or what comes first: the one doing the action, or the one receiving it?", "In active voice, the doer comes first. In passive voice, the receiver comes first, and the verb often has a form of 'to be' (was, were) and the word 'by'.", "Example: <b>The bird ate the seed</b> has the doer first (active). <b>The seed was eaten by the bird</b> has the receiver first (passive). Now do yours."],
    [["Two voices", "🎬", "<b>Active voice</b>: the subject does the action. <b>The dog chased the cat.</b>"], ["Passive voice", "🔄", "<b>Passive voice</b>: the subject receives the action. <b>The cat was chased by the dog.</b> Look for was/were + a past verb."], ["Which is better?", "⭐", "Active sentences are usually stronger and shorter. Use passive when the doer is unknown or not important: <b>The window was broken.</b>"]]);

  const B2 = mk("Either/or, neither/nor, both/and", "🔗", bq("Which pair completes the sentence?", [
    "___ the cat ___ the dog likes the bath. (neither one likes it)|Neither ... nor|Either ... nor|Both ... nor",
    "You may have ___ juice ___ milk. (one of the two)|either ... or|neither ... or|both ... or",
    "___ Sara ___ Leo play the violin. (they both do)|Both ... and|Either ... and|Neither ... and",
    "She is ___ smart ___ kind.|not only ... but also|either ... but|neither ... but also",
    "I can't decide ___ to go ___ to stay.|whether ... or|either ... nor|both ... or",
    "___ the soup ___ the salad was ready. (neither was)|Neither ... nor|Both ... and|Either ... and",
    "He wants to learn ___ drums ___ guitar. (he wants both)|both ... and|neither ... or|either ... nor",
    "We will walk ___ to the park ___ to the pool. (one of them)|either ... or|both ... or|neither ... and"]),
    ["Think about what the sentence means: one of two choices, both things, or neither?", "These word pairs travel together, like shoes. Pick the pair that fits the meaning and matches the partner word.", "Example: <b>___ the bus ___ the train was late. (both on time)</b> uses neither ... nor when nothing was late. Now do yours."],
    [["Word pairs", "🔗", "<b>Correlative conjunctions</b> come in pairs and join two equal parts of a sentence."], ["The pairs", "👟", "<b>either ... or</b> (one of two), <b>neither ... nor</b> (not either), <b>both ... and</b> (two together), <b>not only ... but also</b>, <b>whether ... or</b>."], ["Keep them matched", "✅", "Always use the right partner: <b>neither ... nor</b>, not 'neither ... or'. The two parts after them should match too."]]);

  const B3 = mk("However, therefore, also", "🔀", [
    "It was raining; ___, we stayed inside.|therefore|however|meanwhile",
    "I like pizza; ___, I do not like onions on it.|however|therefore|also",
    "She studied hard; ___, she passed the test.|therefore|however|instead",
    "Tim loves soccer. ___, he plays basketball too.|Also|However|Therefore",
    "We wanted to swim; ___, the pool was closed.|however|therefore|also",
    "The recipe is easy. ___, it tastes great.|Also|However|Instead",
    "He missed the bus. ___, he walked to school.|As a result|However|Also",
    "I wanted cereal; ___, there was no milk.|however|therefore|also"],
    ["Does the second part show a result, a surprise or contrast, or an extra idea?", "A contrast word shows a surprise turn. A result word shows what happened because of the first part. An adding word gives more of the same.", "Example: <b>It was cold; ___, we wore coats.</b> The coats are a result: therefore. <b>It was cold; ___, we went swimming.</b> A surprise: however. Now do yours."],
    [["Bridge words", "🌉", "Words like <b>however</b>, <b>therefore</b> and <b>also</b> connect two ideas."], ["What they mean", "🧭", "<b>However</b> = but, a contrast. <b>Therefore / as a result</b> = because of that. <b>Also / moreover</b> = and more."], ["Punctuation", "✍️", "Put a semicolon before and a comma after when they join two full sentences: <b>I was tired; however, I kept going.</b>"]]);

  const B4 = mk("The semicolon", "⏸️", [
    "Which mark best joins the two complete sentences?<br><br><b>I love swimming ___ my sister prefers running.</b>|a semicolon|a comma by itself|an apostrophe",
    "Which mark best joins the two complete sentences?<br><br><b>The bell rang ___ the students lined up.</b>|a semicolon|a comma by itself|a hyphen",
    "Which mark best joins the two complete sentences?<br><br><b>It was late ___ we went home.</b>|a semicolon|a comma by itself|a question mark",
    "Which mark best joins the two complete sentences?<br><br><b>Dad cooked dinner ___ I set the table.</b>|a semicolon|a comma by itself|a colon",
    "Which mark best joins the two complete sentences?<br><br><b>The sky darkened ___ thunder rumbled.</b>|a semicolon|a comma by itself|an apostrophe",
    "Which mark best joins the two complete sentences?<br><br><b>Lily plays piano ___ Max plays drums.</b>|a semicolon|a comma by itself|a hyphen",
    "Which part could stand alone as a complete sentence, so a semicolon can follow it?|The bell rang|When the bell rang|After the bell",
    "Which part could stand alone as a complete sentence, so a semicolon can follow it?|The movie was long|Because the movie was long|Although long"],
    ["A semicolon joins two complete sentences. Could the part before the blank stand alone? Could the part after it?", "Use a semicolon between two closely related complete sentences. A comma by itself is too weak to join two sentences.", "Example: <b>The sun set ___ the stars came out.</b> Both halves are complete sentences, so a semicolon works. Now do yours."],
    [["The semicolon", "⏸️", "A <b>semicolon</b> (;) is stronger than a comma but softer than a period."], ["When to use it", "🔗", "Use it to join two <b>complete sentences</b> that are closely related: <b>It was cold; we wore coats.</b>"], ["Not a comma splice", "🚫", "Two sentences joined by only a comma is a mistake called a comma splice. Fix it with a semicolon, a period, or a comma plus and, but or so."]]);

  const B5 = mk("Parentheses and dashes", "💭", [
    "Which part is extra information that goes in <b>parentheses</b>?<br><br><b>Our new puppy a tiny beagle loves to chew.</b>|a tiny beagle|Our new puppy|loves to chew",
    "Which part is extra information that goes in <b>parentheses</b>?<br><br><b>Mr. Lee our principal waved hello.</b>|our principal|Mr. Lee|waved hello",
    "Which part is extra information that goes in <b>parentheses</b>?<br><br><b>Her room painted bright green glowed in the sun.</b>|painted bright green|Her room|in the sun",
    "Which part is extra information that goes in <b>parentheses</b>?<br><br><b>The storm which lasted an hour knocked out the power.</b>|which lasted an hour|knocked out the power|The storm",
    "Which part is extra information that goes in <b>parentheses</b>?<br><br><b>My cousin the one from Texas is visiting.</b>|the one from Texas|My cousin|is visiting",
    "Which part goes between two <b>dashes</b>?<br><br><b>The prize a golden trophy sat on the shelf.</b>|a golden trophy|The prize|on the shelf",
    "Which mark shows a sudden break, as in <b>Everyone cheered—even the goalie!</b>?|a dash|a comma|a period",
    "Which marks come in a pair around extra information?|parentheses|periods|question marks"],
    ["Which part could you take out and still have a complete sentence?", "Extra information that is nice to know but not needed goes inside a pair of parentheses or a pair of dashes. A single dash can show a sudden break.", "Example: <b>My bike the red one is fast.</b> Take out 'the red one' and the sentence still works, so that is the extra part. Now do yours."],
    [["Extra information", "💭", "<b>Parentheses</b> ( ) hold extra information that is nice to know but not needed."], ["Dashes", "➖", "A <b>dash</b> (—) shows a sudden break or a dramatic pause: <b>We won—at last!</b>"], ["Pairs", "👯", "Parentheses always come in pairs. Dashes around extra information also come in pairs. Do not leave one out."]]);

  const B6 = mk("Titles: italics or quotation marks?", "📖", [
    "How do you write the title of the book <b>Charlotte's Web</b>?|italics|quotation marks|no marks",
    "How do you write the title of the poem <b>The Road Not Taken</b>?|quotation marks|italics|no marks",
    "How do you write the title of the movie <b>Finding Nemo</b>?|italics|quotation marks|no marks",
    "How do you write the title of the song <b>Happy Birthday</b>?|quotation marks|italics|no marks",
    "How do you write the title of a chapter called <b>The Big Storm</b>?|quotation marks|italics|no marks",
    "How do you write the title of the magazine <b>Highlights</b>?|italics|quotation marks|no marks",
    "How do you write the title of a short story called <b>The Gift of the Magi</b>?|quotation marks|italics|no marks",
    "How do you write the title of the TV show <b>Sesame Street</b>?|italics|quotation marks|no marks"],
    ["Is it a big, whole work, or a small piece that lives inside something bigger?", "Big whole works (books, movies, magazines, TV shows) use italics, or underlining when you write by hand. Small pieces (poems, songs, chapters, short stories) use quotation marks.", "Example: the book <b>Matilda</b> gets italics; a poem inside a collection gets quotation marks. A whole movie is italics; one song from it is in quotation marks. Now do yours."],
    [["Writing titles", "📖", "Titles need special marks so readers know they are titles."], ["Big works", "📚", "Books, movies, magazines, newspapers and TV shows go in <i>italics</i> (or are underlined when handwritten)."], ["Small works", "🎵", "Poems, songs, short stories, chapters and articles go in <b>“quotation marks”</b>."]]);

  const B7 = mk("Lie, lay, sit, set, rise, raise", "🛏️", [
    "I want to ___ down for a nap.|lie|lay|laid",
    "Please ___ your pencil on the desk.|lay|lie|lain",
    "The sun will ___ at six.|rise|raise|rose",
    "Please ___ your hand if you know the answer.|raise|rise|rose",
    "Come ___ next to me on the sofa.|sit|set|sat",
    "___ the cups on the table, please.|Set|Sit|Sat",
    "Yesterday the cat ___ on the rug all day.|lay|laid|lied",
    "Smoke will ___ from the chimney.|rise|raise|raised"],
    ["Does the verb act on something (an object), or does the subject do it by itself?", "Lay, set and raise need an object: you lay, set or raise something. Lie, sit and rise do not: the subject does it alone.", "Example: <b>I will ___ the book down.</b> The book is the object, so lay. <b>I will ___ down.</b> No object, so lie. Now do yours."],
    [["Confusing pairs", "🛏️", "These verb pairs look alike: <b>lie/lay</b>, <b>sit/set</b>, <b>rise/raise</b>."], ["Object test", "🔎", "<b>Lay, set, raise</b> take an object: <b>Lay the book. Set the table. Raise your hand.</b>"], ["No object", "🙂", "<b>Lie, sit, rise</b> do not: <b>I lie down. I sit here. The sun rises.</b> Tricky: the past of lie is <b>lay</b>."]]);

  const B8 = mk("Clear pronouns", "👀", sq("Which sentence is clear about who or what the pronoun means?", [
    "The dog chased the cat until the dog was tired.|The dog chased the cat until it was tired.|The dog chased it until it was tired.",
    "Mom hugged Grandma, and Mom smiled.|Mom hugged Grandma, and she smiled.|She hugged her, and she smiled.",
    "The box fell on the shelf, and the box broke.|The box fell on the shelf, and it broke.|It fell on it, and it broke.",
    "The teacher called the girl, and the girl came.|The teacher called the girl, and she came.|She called her, and she came.",
    "The bird landed on the branch, and the branch swayed.|The bird landed on the branch, and it swayed.|It landed on it, and it swayed.",
    "Mia and Zoe baked, and Zoe's cake was bigger.|Mia and Zoe baked, and her cake was bigger.|They baked, and hers was bigger.",
    "The cup hit the plate, and the plate cracked.|The cup hit the plate, and it cracked.|It hit it, and it cracked.",
    "Dad called Uncle Joe, and Uncle Joe laughed.|Dad called Uncle Joe, and he laughed.|He called him, and he laughed."]),
    ["Pick a pronoun in each choice. Can you tell for sure who or what it means?", "If a pronoun could mean two different people or things, the sentence is confusing. Repeat the noun to make it clear.", "Example: <b>Ben told Sam he was late.</b> Who was late? Fix it: <b>Ben told Sam that Sam was late.</b> Now do yours."],
    [["Pronoun trouble", "👀", "A pronoun (he, she, it, they) takes the place of a noun. But the reader must know <b>which</b> noun."], ["Two possible nouns", "👥", "In <b>Tom saw Max and he waved</b>, who waved? It is unclear because there are two possible people."], ["Fix it", "🔧", "Use the noun again, or rewrite the sentence so only one noun could fit."]]);

  const B9 = mk("Direct objects", "🎯", bq("Find the <b>direct object</b>.", [
    "Mia kicked the ball.|ball|Mia|kicked",
    "The baker sold fresh bread.|bread|baker|sold",
    "Dad painted the fence.|fence|Dad|painted",
    "My sister reads comics.|comics|sister|reads",
    "The kids built a snowman.|snowman|kids|built",
    "Grandma knitted a warm scarf.|scarf|Grandma|knitted",
    "Leo found his keys.|keys|Leo|found",
    "The farmer feeds the chickens.|chickens|farmer|feeds"]),
    ["Find the action verb first. Then ask: what (or whom) receives that action?", "The subject does the action, the verb is the action, and the direct object answers 'what?' or 'whom?' after the verb.", "Example: <b>Ana ate an apple.</b> Verb: ate. Ate what? An apple. Now do yours."],
    [["Who gets the action?", "🎯", "A <b>direct object</b> is the noun that receives the action of the verb."], ["Ask a question", "❓", "Say the verb, then ask <b>what?</b> or <b>whom?</b> <b>Mia kicked what?</b> The ball. The answer is the direct object."], ["Not every sentence", "🙂", "Some sentences have none: <b>The baby slept.</b> Slept what? Nothing. There is no direct object."]]);

  const B10 = mk("Latin roots", "🏛️", [
    "The Latin root <b>spect</b> means 'look'. A <b>spectator</b> is someone who...|watches|carries|builds",
    "The root <b>dict</b> means 'say'. To <b>predict</b> is to...|say what will happen first|carry something away|break something apart",
    "The root <b>rupt</b> means 'break'. If a storm <b>interrupts</b> a game, it...|breaks into it|builds it|carries it",
    "The root <b>struct</b> means 'build'. To <b>construct</b> a house is to...|build it|look at it|say it aloud",
    "The root <b>port</b> means 'carry'. A <b>portable</b> radio can be...|carried easily|broken easily|heard far away",
    "The root <b>spect</b> means 'look'. To <b>inspect</b> a bike is to...|look at it closely|carry it away|say its name",
    "The root <b>dict</b> means 'say'. If you <b>dictate</b> a note, you...|say it aloud for someone to write|break it into pieces|carry it to the mail",
    "The root <b>rupt</b> means 'break'. When a volcano <b>erupts</b>, it...|bursts out|builds up|looks around"],
    ["A root is the main part of a word. Use the root's meaning to understand the whole word.", "Match the root's meaning to the word. The other parts (like pre-, inter-, con-) add extra direction.", "Example: <b>aud</b> means 'hear'. An <b>audience</b> is a group of people who... hear. Roots unlock new words. Now do yours."],
    [["Word roots", "🏛️", "Many English words come from <b>Latin roots</b>. Learn a root and you can guess many words."], ["Five roots", "🔑", "<b>spect</b> = look, <b>dict</b> = say, <b>rupt</b> = break, <b>struct</b> = build, <b>port</b> = carry."], ["Word families", "🌳", "<b>inspect, spectator, spectacle</b> all share spect. <b>transport, portable, export</b> all share port."]]);

  const B11 = mk("Greek roots", "🏺", [
    "<b>tele</b> means 'far'. A <b>telescope</b> helps you see things that are...|far away|very small|underwater",
    "<b>bio</b> means 'life'. <b>Biology</b> is the study of...|living things|rocks|stars",
    "<b>geo</b> means 'earth'. <b>Geography</b> is about...|the earth and its places|machines|music",
    "<b>photo</b> means 'light'. A <b>photograph</b> is a picture made with...|light|sound|heat",
    "<b>phon</b> means 'sound'. A <b>microphone</b> picks up...|sound|light|heat",
    "<b>therm</b> means 'heat' and <b>meter</b> means 'measure'. A <b>thermometer</b> measures...|temperature|distance|weight",
    "<b>auto</b> means 'self', <b>bio</b> means 'life' and <b>graph</b> means 'write'. An <b>autobiography</b> is a life story written by...|the person themselves|a stranger|a teacher",
    "<b>tele</b> means 'far' and <b>phon</b> means 'sound'. A <b>telephone</b> carries sound...|from far away|only nearby|under water"],
    ["Break the word into parts. Each root has its own meaning.", "Put the meanings of the parts together to build the meaning of the whole word.", "Example: <b>hydro</b> means 'water' and <b>meter</b> means 'measure'. A hydrometer measures water-related things. Joining parts makes meaning. Now do yours."],
    [["Greek roots", "🏺", "Many science words come from <b>Greek roots</b>."], ["Roots to know", "🔑", "<b>tele</b> = far, <b>bio</b> = life, <b>geo</b> = earth, <b>photo</b> = light, <b>phon</b> = sound, <b>graph</b> = write, <b>meter</b> = measure."], ["Build a meaning", "🧩", "<b>tele + scope</b> = see far. <b>bio + logy</b> = study of life. Add the parts together."]]);

  const B12 = mk("Shades of meaning", "🎚️", [
    "Which word means 'to walk slowly for fun'?|stroll|stomp|dash",
    "Which word means 'very, very big'?|enormous|big|wide",
    "Which word is the <b>strongest</b> way to say 'angry'?|furious|annoyed|upset",
    "Which word means 'to look quickly'?|glance|stare|gaze",
    "Which word is the <b>weakest</b> way to say 'cold'?|cool|freezing|frozen",
    "Which word means 'to eat hungrily and fast'?|gobble|nibble|taste",
    "Which word means 'a little bit scared'?|nervous|terrified|horrified",
    "Which word sounds the most <b>negative</b> for a person who does not like spending money?|stingy|thrifty|careful"],
    ["Similar words are not exactly the same. Think about how strong or how quick each one is.", "Rank the words from weakest to strongest, or soft to harsh. The best answer matches the strength in the question.", "Example: <b>happy</b> is mild, <b>delighted</b> is stronger, <b>thrilled</b> is even stronger. Now do yours."],
    [["Close but not equal", "🎚️", "<b>Synonyms</b> share a meaning but can be stronger or weaker: <b>warm, hot, scorching</b>."], ["Strength", "💪", "Look at the scale: <b>annoyed → angry → furious</b>. A writer picks the word with the right strength."], ["Feeling", "😊", "Some words feel kind (<b>thrifty</b>) and others feel unkind (<b>stingy</b>) even if the meaning is close."]]);

  const B13 = mk("Formal or friendly?", "🎩", [
    "Which is best for a letter to your principal?|Dear Principal, may we please have a longer recess?|Hey Principal, can we get more recess?|Yo, longer recess pls!",
    "Which is best for a school report?|Frogs live near water because they need to keep their skin moist.|Frogs hang out by water 'cause their skin gets dry, ya know.|Frogs are like totally into water.",
    "Which is best for a text to your best friend?|See you at the park in five minutes!|I shall arrive at the park shortly.|Kindly await me at the park.",
    "Which is best for a thank-you note to a teacher?|Thank you for helping me learn to read.|Thx for the help, dude.|u r the best teacher lol",
    "Which is best for an essay?|The author uses strong words to persuade readers.|The writer uses really cool words to get u.|The author is, like, super persuasive.",
    "Which is best when talking to a friend at lunch?|Wanna swap sandwiches?|Would you care to exchange sandwiches?|May I propose a sandwich trade?",
    "Which is best for an email to a librarian?|Could you help me find a book about space?|Hey, got any space books?|Gimme space books.",
    "Which is best for a speech to the class?|Today I will explain how plants grow.|So yeah, plants grow and stuff.|Plants, like, grow, okay?"],
    ["Think about who will read it or hear it. Is it a friend or someone you should show respect to?", "Formal writing (reports, letters to adults) uses polite, complete sentences and no slang. Friendly writing (to pals) can be casual.", "Example: to a doctor, <b>Could you tell me how long the cast stays on?</b> To a friend, <b>How long do you have the cast on?</b> Now do yours."],
    [["Know your reader", "🎩", "The words you pick depend on your <b>audience</b> and your <b>purpose</b>."], ["Formal", "👔", "<b>Formal</b>: reports, essays, letters to adults. Use complete sentences, polite words, no slang or text-speak."], ["Friendly", "👟", "<b>Informal</b>: notes and texts to friends. Short and casual is fine, but still keep it kind."]]);

  const B14 = mk("Word relationships", "🧩", bq("Which word completes the pattern?", [
    "Hot is to cold as up is to ___.|down|high|top",
    "Bird is to nest as bee is to ___.|hive|honey|flower",
    "Finger is to hand as toe is to ___.|foot|shoe|leg",
    "Puppy is to dog as kitten is to ___.|cat|mouse|fur",
    "Pen is to write as scissors are to ___.|cut|paper|sharp",
    "Teacher is to school as doctor is to ___.|hospital|medicine|nurse",
    "Big is to large as small is to ___.|tiny|short|huge",
    "Fish is to swim as bird is to ___.|fly|feather|sky"]),
    ["Figure out how the first two words are connected.", "Say the link as a sentence ('a ___ is a baby ___' or 'a ___ is the opposite of ___'), then use the same link for the second pair.", "Example: <b>Glove is to hand as sock is to ___.</b> A glove covers a hand, so a sock covers a foot. Now do yours."],
    [["Word puzzles", "🧩", "An <b>analogy</b> compares two pairs of words that have the same kind of link."], ["Kinds of links", "🔗", "Opposites (hot/cold), same meaning (big/large), part and whole (finger/hand), baby and grown-up (puppy/dog), tool and job (pen/write)."], ["Solve it", "🔎", "1) Say how the first pair is linked. 2) Use that same link on the second pair."]]);

  const B15 = mk("Setting and mood", "🌙", [
    "What <b>mood</b> do these words create?<br><br><b>The dark hallway creaked, and shadows crept along the walls.</b>|spooky|cheerful|silly",
    "What <b>mood</b> do these words create?<br><br><b>Sunshine sparkled on the lake as birds sang.</b>|peaceful and happy|tense|gloomy",
    "What <b>mood</b> do these words create?<br><br><b>Rain tapped the window all day, and the house felt empty.</b>|gloomy|exciting|funny",
    "What <b>mood</b> do these words create?<br><br><b>Drums pounded as the race began and the crowd roared.</b>|exciting|sleepy|sad",
    "What <b>mood</b> do these words create?<br><br><b>A soft lullaby drifted through the quiet room.</b>|calm|angry|nervous",
    "What <b>mood</b> do these words create?<br><br><b>The balloon popped. Everyone jumped, then burst into laughter.</b>|playful|gloomy|frightening",
    "Which detail best sets a <b>winter</b> setting?|frost on the window and puffs of breath|a warm breeze and open windows|buzzing bees on flowers",
    "Which detail best sets a <b>beach</b> setting?|waves, sand and seagulls|snow and sleds|tall pines and a cabin"],
    ["Read the words and notice the feeling they give you.", "Look at the sounds, weather, light and actions. Together they build the mood. Which feeling do they point to?", "Example: <b>Thunder boomed and the wind slammed the shutters.</b> The sound words and the storm make a tense, stormy mood. Now do yours."],
    [["Setting", "🏞️", "The <b>setting</b> is where and when a story happens. Details like weather and sounds paint it."], ["Mood", "🌙", "The <b>mood</b> is the feeling a reader gets: spooky, happy, calm, exciting or sad."], ["Word choices", "🎨", "Writers choose words to build the mood. <b>Creaked</b> and <b>shadows</b> feel spooky. <b>Sparkled</b> and <b>sang</b> feel happy."]]);

  const B16 = mk("Reasons and evidence", "⚖️", [
    "Opinion: <i>Our school should have a garden.</i> Which gives the best <b>reason</b>?|A garden would teach us where food comes from.|Gardens are green.|I like gardens.",
    "Opinion: <i>Kids need more recess.</i> Which gives the best <b>reason</b>?|Exercise helps students focus when they go back to class.|Recess is fun.|My friend likes recess.",
    "Opinion: <i>Everyone should read every day.</i> Which gives the best <b>reason</b>?|Reading builds vocabulary and helps you write better.|Books are on shelves.|I read yesterday.",
    "Opinion: <i>We should recycle.</i> Which gives the best <b>reason</b>?|Recycling keeps trash out of landfills and saves resources.|Recycling bins are blue.|Some people recycle.",
    "Opinion: <i>Bikes are better than cars for short trips.</i> Which gives the best <b>reason</b>?|Bikes use no gas and give you exercise.|I own a bike.|Cars are shiny.",
    "Opinion: <i>Homework should be short.</i> Which gives the best <b>reason</b>?|Kids need time to rest, play and sleep.|Homework is a word.|Teachers give it.",
    "Which is the strongest <b>evidence</b> that our class loves reading?|Last month, 24 of our 25 students checked out a book.|Books are good.|I think they do.",
    "Which is a <b>claim</b> (an opinion the writer wants you to believe)?|Our town needs a new playground.|The playground has two slides.|The park opens at nine."],
    ["A reason answers the question 'why?'. Which choice explains why the opinion is good?", "Strong reasons give facts, examples or results. Weak ones only say 'I like it' or repeat a fact that does not prove anything.", "Example: <b>Opinion: Pets are good for kids.</b> Strong reason: <b>Caring for a pet teaches responsibility.</b> Weak: <b>Pets are cute.</b> Now do yours."],
    [["Claim", "📣", "A <b>claim</b> is the opinion you want your reader to agree with."], ["Reasons", "🧱", "A <b>reason</b> says why. Good reasons explain how the claim helps people or solves a problem."], ["Evidence", "📊", "<b>Evidence</b> backs a reason with facts, numbers or examples: <b>24 of 25 students checked out a book.</b>"]]);

  const B17 = mk("Alike and different words", "⚖️", [
    "Which word shows two things are <b>alike</b>?|similarly|however|unlike",
    "Which word shows a <b>difference</b>?|unlike|likewise|both",
    "Whales are mammals. ___, dolphins are mammals.|Likewise|However|Unlike",
    "Frogs live in water. ___, toads live mostly on land.|In contrast|Similarly|Likewise",
    "___ apples and pears are fruits.|Both|Unlike|Instead",
    "Summer is hot. ___, winter is cold.|In contrast|Likewise|Both",
    "A bike has two wheels. ___, a trike has three.|In contrast|Likewise|Both",
    "Cats have fur. ___, dogs have fur.|Likewise|However|Unlike"],
    ["Is the sentence telling how two things are the same or how they are different?", "Words like both, likewise and similarly show things in common. Words like however, unlike and in contrast show differences.", "Example: <b>Ducks swim. ___, geese swim.</b> Same: likewise. <b>Ducks swim. ___, eagles fly.</b> Different: in contrast. Now do yours."],
    [["Compare and contrast", "⚖️", "To <b>compare</b> is to show how things are alike. To <b>contrast</b> is to show how they are different."], ["Alike words", "🤝", "<b>both, also, likewise, similarly, like, the same as</b>."], ["Different words", "↔️", "<b>but, however, unlike, in contrast, on the other hand, while</b>."]]);

  const B18 = mk("Where to look", "🔎", [
    "Which is the best source to learn about how volcanoes form?|a science book written by an expert|a made-up story|a friend's guess",
    "A <b>primary source</b> is something that...|was made by someone who was there|was written later by a stranger|is only a guess",
    "A <b>secondary source</b> is something that...|was written later by someone who studied the topic|is a diary from that day|is a photo taken at the time",
    "Which is the most <b>reliable</b> for facts about space?|a science book by an astronomer|a cartoon|a rumor",
    "Where would you look up what a word means?|a dictionary|an atlas|a calendar",
    "Where would you find a map of countries?|an atlas|a dictionary|a thesaurus",
    "Where would you find another word that means 'big'?|a thesaurus|an atlas|a dictionary",
    "Which is a <b>primary source</b> about a school trip?|a diary written by a student on the trip|a book about school trips|a poster for school trips"],
    ["Think about who made the source and how close they were to the facts.", "Reliable sources are written by experts. A primary source comes straight from the time or the person. A secondary source tells about it later.", "Example: for how bees make honey, a book by a bee scientist is reliable. A diary from the day of an event is a primary source. Now do yours."],
    [["Good sources", "🔎", "Not every source is equally good. Trust books and articles written by <b>experts</b>."], ["Primary and secondary", "📜", "<b>Primary</b>: made by someone who was there (a diary, a photo, a letter). <b>Secondary</b>: written later about it (a textbook)."], ["Reference books", "📚", "<b>Dictionary</b>: word meanings. <b>Thesaurus</b>: words that mean the same. <b>Atlas</b>: maps. <b>Encyclopedia</b>: facts about many topics."]]);

  Object.assign(WRITING_LEVELS, {
    11: [B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17, B18,
      MIX("Mixed practice", B1, B4, B6, B9, B12), MIX("Level 11 Challenge", B2, B3, B5, B7, B8, B10, B16, B18)]
  });

  // =============== LEVEL 12 ===============
  const C1 = mk("Who is doing it? Modifiers", "🧐", [
    "Which sentence clearly says the <b>dog</b> was covered in mud?|Dad hosed down the dog, which was covered in mud.|Covered in mud, Dad hosed down the dog.|Dad, covered in mud, hosed down the dog.",
    "Which sentence clearly says the <b>cookies</b> were warm?|Mia ate the cookies, which were still warm.|Warm from the oven, Mia ate the cookies.|Mia, warm from the oven, ate the cookies.",
    "Which sentence clearly says the <b>boy</b> was running?|Running to catch the bus, the boy dropped his bag.|Running to catch the bus, the bag fell from the boy.|The bag, running to catch the bus, fell.",
    "Which sentence clearly says the <b>girl</b> was singing?|Singing happily, the girl walked home.|Singing happily, the walk home was long.|The walk home, singing happily, was long.",
    "Which sentence clearly says the <b>teacher</b> was tired?|Tired after class, the teacher sat down.|Tired after class, the chair was comfortable.|The chair, tired after class, was comfortable.",
    "Which sentence clearly says <b>Dad</b> was wearing the apron?|Wearing an apron, Dad flipped the pancakes.|Wearing an apron, the pancakes were flipped.|The pancakes, wearing an apron, were flipped.",
    "Which sentence clearly says the <b>kitten</b> was hiding?|Hiding under the bed, the kitten was hard to find.|Hiding under the bed, the room was hard to search.|The room, hiding under the bed, was hard to search.",
    "Which sentence clearly says the <b>children</b> were laughing?|Laughing loudly, the children ran outside.|Laughing loudly, the door slammed behind the children.|The door, laughing loudly, slammed."],
    ["A describing phrase should sit next to the person or thing it describes. Who is the phrase really about?", "If a phrase starting a sentence ends in a comma, the very next noun should be the one it describes. Otherwise the sentence says something silly.", "Example: <b>Eating lunch, the bell rang.</b> The bell was not eating! Fix it: <b>Eating lunch, we heard the bell ring.</b> Now do yours."],
    [["Modifiers", "🧐", "A <b>modifier</b> is a word or phrase that describes something. It must sit close to what it describes."], ["Dangling", "🪂", "<b>Covered in mud, Dad hosed the dog.</b> This says Dad is muddy! A modifier with no clear owner is a <b>dangling modifier</b>."], ["Fix it", "🔧", "Put the describing phrase next to the right noun, or add the noun: <b>Dad hosed the dog, which was covered in mud.</b>"]]);

  const C2 = mk("Parallel lists", "🪜", sq("Which sentence has a matching (parallel) list?", [
    "I like swimming, hiking and biking.|I like swimming, to hike and biking.|I like to swim, hiking and bike.",
    "She plans to read, write and draw.|She plans to read, writing and draw.|She plans reading, to write and draw.",
    "The park has swings, slides and a pond.|The park has swings, sliding and a pond.|The park has swinging, slides and a pond.",
    "Our job is to clean, to sort and to stack.|Our job is to clean, sorting and stack.|Our job is cleaning, to sort and stacking.",
    "He is tall, funny and kind.|He is tall, funny and has kindness.|He is tallness, funny and kind.",
    "We cooked dinner, washed dishes and swept the floor.|We cooked dinner, washing dishes and swept the floor.|We cooked dinner, washed dishes and sweeping the floor.",
    "Coach told us to run, to stretch and to drink water.|Coach told us to run, stretching and to drink water.|Coach told us running, to stretch and drink water.",
    "I love reading, drawing and baking.|I love reading, to draw and baking.|I love to read, drawing and bake."]),
    ["Look at each item in the list. Do they all have the same kind of ending or the same pattern?", "In a parallel list, every item uses the same form: all -ing words, all 'to' verbs, all plain nouns, or all past-tense verbs.", "Example: <b>She likes painting, to sing and dancing</b> is mixed up. Fix it: <b>She likes painting, singing and dancing.</b> Now do yours."],
    [["Matching lists", "🪜", "When you list things, make every item the <b>same kind</b> of word. This is called <b>parallel structure</b>."], ["Match the form", "🧩", "All -ing: <b>swimming, hiking, biking</b>. All 'to' verbs: <b>to swim, to hike, to bike</b>. Mixing them sounds clumsy."], ["Check", "👂", "Read it aloud. If one item sounds different from the others, change it to match."]]);

  const C3 = mk("Say it with fewer words", "✂️", sq("Which sentence says it clearly in the <b>fewest words</b>?", [
    "Now we are leaving.|At this point in time, we are leaving.|We are leaving at this very moment in time.",
    "I think he is wrong.|It is my personal opinion that I think he is wrong.|In my own opinion, I think that he is wrong.",
    "She sang loudly.|She sang in a loud way.|She sang with a loud sound in her voice.",
    "Because it rained, we stayed in.|Due to the fact that it rained, we stayed in.|The reason we stayed in was the fact that it rained.",
    "The room was small.|The room was small in size.|The room was very small in size and tiny.",
    "He walked quickly.|He walked in a quick manner.|He walked in a manner that was quick.",
    "We met at dawn.|We met in the early hours of the morning at dawn.|We met at the time of dawn in the morning.",
    "Please be quiet.|I would like to ask you to please be quiet now.|It is my request that you be quiet, please."]),
    ["All the choices say the same thing. Which one has no extra, repeated words?", "Cut words that repeat an idea or add nothing, like 'in a ___ way', 'the fact that' and 'in size'.", "Example: <b>He was tall in height</b> repeats itself. Better: <b>He was tall.</b> Now do yours."],
    [["Wordy writing", "🐘", "<b>Wordy</b> sentences use more words than they need. They hide the idea."], ["Cut the extras", "✂️", "Remove repeated ideas: <b>in size, in color, at this point in time, the fact that</b>."], ["Clear and short", "⚡", "Short does not mean childish. Make every word do a job."]]);

  const C4 = mk("What is the -ing word doing?", "🔍", bq("What is the <b>-ing</b> word doing in this sentence?", [
    "Swimming is fun.|a noun (the thing)|the main verb|a describing word",
    "The dog was barking.|the main verb|a noun (the thing)|a describing word",
    "I saw a sleeping baby.|a describing word|a noun (the thing)|the main verb",
    "Reading helps you learn.|a noun (the thing)|a describing word|the main verb",
    "The running water cooled us.|a describing word|a noun (the thing)|the main verb",
    "She is singing.|the main verb|a noun (the thing)|a describing word",
    "Cooking is his hobby.|a noun (the thing)|a describing word|the main verb",
    "We watched the falling leaves.|a describing word|a noun (the thing)|the main verb"]),
    ["Try swapping the -ing word with a plain noun like 'it' or 'dinner'. Does it still make sense? Or does it describe another noun?", "A noun can be the subject (a gerund). A describing word sits in front of a noun. A main verb has a helper like is or was.", "Example: <b>Dancing is fun.</b> Dancing is the thing (the subject). <b>The dancing bear smiled.</b> Dancing describes the bear. Now do yours."],
    [["-ing words", "🔍", "Words ending in <b>-ing</b> can do different jobs, so look at how they are used."], ["Three jobs", "🎭", "Noun (a <b>gerund</b>): <b>Swimming is fun.</b> Describer (a <b>participle</b>): <b>a swimming duck.</b> Verb: <b>The duck is swimming.</b>"], ["How to tell", "🔎", "Does it name a thing you can do? Noun. Does it sit before a noun and describe it? Describer. Is there is/was before it? Verb."]]);

  const C5 = mk("Were: wishes and what-ifs", "💫", [
    "If I ___ a bird, I would fly south.|were|was|am",
    "I wish it ___ summer now.|were|was|is",
    "If she ___ here, she would help us.|were|was|is",
    "If Dad ___ a superhero, he would save the day.|were|was|is",
    "I wish I ___ better at chess.|were|was|am",
    "If it ___ Saturday, we could sleep in.|were|was|is",
    "If the dog ___ able to talk, it would tell us everything.|were|was|is",
    "Tomorrow, if it ___ sunny, we will go to the lake.|is|were|be"],
    ["Is the sentence about something real that could happen, or a wish or pretend idea that is not true?", "For wishes and pretend ideas that are not true, a special verb form is used with every subject, even I, he and she. For real possibilities, use the normal verb.", "Example: <b>If I ___ taller, I could reach.</b> I am not taller, so it is pretend: were. <b>If it ___ cold, I will wear a coat.</b> Possible: is. Now do yours."],
    [["Pretend ideas", "💫", "Sometimes we talk about things that are <b>not true</b>: wishes and 'what if' ideas."], ["Use were", "🌠", "For these, use <b>were</b> with every subject, even I, he and she: <b>If I were you... I wish she were here.</b>"], ["Real or not?", "⚖️", "A real chance uses the normal verb: <b>If it is sunny, we will swim.</b> A pretend wish uses were."]]);

  const C6 = mk("Who or whom?", "🙋", [
    "___ is knocking at the door?|Who|Whom|Whose",
    "To ___ did you give the note?|whom|who|whose",
    "___ wants to go first?|Who|Whom|Whose",
    "With ___ are you going to the park?|whom|who|whose",
    "I know ___ left the light on.|who|whom|whose",
    "The girl ___ I met was friendly.|whom|who|whose",
    "He asked ___ was ready.|who|whom|whose",
    "For ___ is this gift?|whom|who|whose"],
    ["Is this word the one doing the action, or the one receiving it or following a word like to, with or for?", "Test: replace the word with he or him. If 'he' fits, use who. If 'him' fits, use whom.", "Example: <b>___ ate the pie?</b> 'He ate the pie' works, so who. <b>To ___ did you speak?</b> 'To him' works, so whom. Now do yours."],
    [["Who and whom", "🙋", "Both ask about people. They are used in different spots."], ["Who", "🏃", "<b>Who</b> does the action: <b>Who made this?</b> (He made this.)"], ["Whom", "🎁", "<b>Whom</b> receives the action or follows a word like to, with, for: <b>To whom did you write?</b> (To him.)"]]);

  const C7 = mk("Fewer, less, between, among", "📏", [
    "We have ___ chairs than we need. (you can count chairs)|fewer|less|least",
    "There is ___ water in the glass.|less|fewer|few",
    "Sit ___ the two of us.|between|among|within",
    "The ball rolled ___ the many trees.|among|between|beside",
    "Please ___ this note to the office. (carry it away from here)|take|bring|fetch",
    "Please ___ your lunch when you come here.|bring|take|send",
    "There are ___ cookies on the plate now.|fewer|less|littler",
    "I have ___ time than you do.|less|fewer|few"],
    ["Can you count the things one by one? Does the thing go toward you or away from you? Are there two things or many?", "Fewer is for things you can count. Less is for amounts you cannot count. Between is for two. Among is for three or more. Bring comes toward the speaker; take goes away.", "Example: <b>fewer apples</b> (countable), <b>less juice</b> (not countable). <b>Bring</b> it here, <b>take</b> it there. Now do yours."],
    [["Fewer or less?", "📏", "<b>Fewer</b> goes with things you can count (fewer cookies). <b>Less</b> goes with things you cannot count (less milk, less time)."], ["Between or among?", "👥", "<b>Between</b> two: between you and me. <b>Among</b> three or more: among the trees."], ["Bring or take?", "🧳", "<b>Bring</b> = toward the place where the speaker is. <b>Take</b> = away from there."]]);

  const C8 = mk("Commas around interrupters", "⏯️", bq("Which words should have <b>commas around them</b>?", [
    "The answer I think is seven.|I think|The answer|is seven",
    "My cousin however likes broccoli.|however|My cousin|likes broccoli",
    "We can of course ask for help.|of course|We can|ask for help",
    "The movie by the way starts at six.|by the way|The movie|starts at six",
    "It is in fact a rare bird.|in fact|It is|a rare bird",
    "Tom on the other hand prefers tea.|on the other hand|Tom|prefers tea",
    "Her answer surprisingly was correct.|surprisingly|Her answer|was correct",
    "The game unfortunately was canceled.|unfortunately|The game|was canceled"]),
    ["Find the little phrase that interrupts the sentence. Take it out: does the sentence still work?", "A word or phrase that breaks into the middle of a sentence gets a comma before it and a comma after it, like parentheses made of commas.", "Example: <b>The test thankfully was easy.</b> 'Thankfully' is the interrupter: <b>The test, thankfully, was easy.</b> Take it out and the sentence still works. Now do yours."],
    [["Interrupters", "⏯️", "An <b>interrupter</b> is a word or phrase that breaks into the middle of a sentence: <b>however, of course, in fact, I think</b>."], ["Two commas", "✌️", "Put a comma <b>before and after</b> it: <b>My cousin, however, likes broccoli.</b>"], ["Test", "✅", "Take the interrupter out. If the sentence still works, it is just extra, and the commas belong around it."]]);

  const C9 = mk("Capital letters, advanced", "🔠", [
    "Which word needs a capital letter?<br><br><b>We drove north to canada.</b>|canada|north|drove",
    "Which word needs a capital letter?<br><br><b>Many people in the midwest grow corn.</b>|midwest|people|corn",
    "Which word needs a capital letter?<br><br><b>I have math and spanish today.</b>|spanish|math|today",
    "Which word needs a capital letter?<br><br><b>Today uncle Joe came to visit.</b>|uncle|Today|came",
    "Which word should <b>not</b> have a capital letter?<br><br><b>My Uncle came to visit.</b>|Uncle|My|came",
    "Which word needs a capital letter?<br><br><b>Today mayor Davis spoke at noon.</b>|mayor|noon|spoke",
    "Which word needs a capital letter?<br><br><b>We read a poem about the pacific Ocean.</b>|pacific|poem|read",
    "Which word needs a capital letter?<br><br><b>I visited lake Michigan last summer.</b>|lake|summer|visited"],
    ["Is the word part of the actual name of one particular person, place or thing, or just a general kind?", "Capitalize names of people, titles used with names, languages, regions and named places. Do not capitalize directions as words, school subjects (except languages), or family words used without a name.", "Example: <b>I went west.</b> (direction, lowercase) but <b>I live in the West.</b> (a region). <b>Aunt May</b> is a name, but <b>my aunt</b> is not. Now do yours."],
    [["Special names", "🔠", "Capitalize the <b>name</b> of one particular person, place or thing: <b>Lake Michigan, Pacific Ocean, Mayor Davis</b>."], ["Titles and family", "👨‍👩‍👧", "<b>Uncle Joe</b> (used as a name) is capitalized. <b>my uncle</b> (a general word) is not."], ["Directions and subjects", "🧭", "<b>north, south, east, west</b> and school subjects like <b>math</b> are lowercase. But languages (<b>Spanish</b>) and regions (<b>the Midwest</b>) get capitals."]]);

  const C10 = mk("Quote, paraphrase or summarize?", "📑", [
    "'The sun is a star,' writes the author. This is a...|direct quote|paraphrase|summary",
    "The author says that the sun is a star. This is a...|paraphrase|direct quote|summary",
    "The article explains what stars are, how they shine and how far away they are. This is a...|summary|direct quote|paraphrase",
    "'Water boils at 100 degrees Celsius,' says the book. This is a...|direct quote|summary|paraphrase",
    "The book states that water bubbles up as steam once it reaches 100 degrees Celsius. This is a...|paraphrase|direct quote|summary",
    "In three sentences, the chapter tells how a seed becomes a plant. This is a...|summary|direct quote|paraphrase",
    "Which one keeps the author's <b>exact words</b>?|'The tide comes in twice a day,' the author wrote.|The author wrote that tides rise two times daily.|The author wrote about tides.",
    "Which is the best <b>summary</b> of this passage?<br><i>Ants live in colonies. Each ant has a job. Some gather food and some care for eggs.</i>|Ants live in colonies where each has a job.|Ants are small.|Some ants gather food."],
    ["Does it use the exact words, new words for the same idea, or only the main points in shorter form?", "A quote uses the author's exact words in quotation marks. A paraphrase says the same idea in new words, with about the same length. A summary is much shorter and keeps only the main ideas.", "Example: <b>'Cats purr when happy,' the book says</b> is a quote. <b>The book says happy cats purr</b> is a paraphrase. Now do yours."],
    [["Three ways", "📑", "When you use ideas from a source, you can <b>quote</b>, <b>paraphrase</b> or <b>summarize</b>."], ["Quote and paraphrase", "💬", "A <b>quote</b> copies exact words inside “quotation marks”. A <b>paraphrase</b> says the same idea in your own words."], ["Summary", "📦", "A <b>summary</b> is a short version with only the <b>main ideas</b>. It leaves out small details."]]);

  const C11 = mk("Citing sources", "🏷️", [
    "Which is a correct source entry? (Author. Title. Year.)|Green, Lee. Ocean Life. 2020.|Ocean Life. Green, Lee. 2020.|2020. Ocean Life. Green, Lee.",
    "Which is a correct source entry? (Author. Title. Year.)|Rivera, Sam. Our Solar System. 2018.|Our Solar System. 2018. Rivera, Sam.|2018. Rivera, Sam. Our Solar System.",
    "Which is a correct source entry? (Author. Title. Year.)|Adams, Kim. How Bridges Work. 2021.|How Bridges Work. Adams, Kim. 2021.|Adams, Kim. 2021. How Bridges Work.",
    "Why do we list our sources?|so readers can check the facts and credit the authors|to make the paper longer|so no one can find the facts",
    "What should you do when you use someone else's exact words?|put them in quotation marks and name the source|change one word and skip the source|copy them quietly",
    "Using someone else's words as if they were your own is called...|plagiarism|paraphrasing|summarizing",
    "A bibliography is...|a list of the sources you used|a story about a person's life|a page of pictures",
    "Which detail do you need to cite a book?|the author's name|your favorite color|the weather that day"],
    ["Think about what a reader would need in order to find the same book.", "Sources are listed so readers can check them and so the authors get credit. A book entry gives the author (last name first), the title and the year.", "Example: <b>Lopez, Ana. Birds of Spring. 2015.</b> Last name first, then the title, then the year. Now do yours."],
    [["Give credit", "🏷️", "When you use ideas from a book or article, you must tell where they came from. This is called <b>citing</b> your sources."], ["The list", "📋", "A <b>bibliography</b> lists every source at the end: <b>Author's last name, first name. Title. Year.</b>"], ["Stay honest", "🤝", "Using someone else's words as your own is <b>plagiarism</b>. Quote, paraphrase and always give credit."]]);

  const C12 = mk("Symbols in stories", "🕊️", [
    "A dove often stands for...|peace|anger|speed",
    "A rainbow after a storm often stands for...|hope|danger|boredom",
    "A lion often stands for...|courage|laziness|sadness",
    "An owl often stands for...|wisdom|speed|fear",
    "A broken chain often stands for...|freedom|trouble|hunger",
    "A road in a story often stands for...|a journey through life|a snack|a noise",
    "A seed sprouting often stands for...|new beginnings|endings|silence",
    "A white flag often stands for...|peace or giving up|a party|a sale"],
    ["A symbol is a thing that stands for a bigger idea. What idea do you think of when you see it?", "Think of the common meaning people give to that object or animal across many stories.", "Example: a candle burning in a dark window might stand for hope, because light shows a way through darkness. Now do yours."],
    [["Symbols", "🕊️", "A <b>symbol</b> is an object, animal or color that stands for a bigger idea."], ["Common symbols", "🌈", "A dove = peace. A rainbow = hope. A lion = courage. An owl = wisdom. A road = a journey."], ["In writing", "✍️", "Authors use symbols to add deeper meaning without saying it directly."]]);

  const C13 = mk("Story tricks", "🎞️", [
    "Dark clouds gathered, though no one thought anything of it. This is...|foreshadowing|flashback|cliffhanger",
    "Years earlier, Dad had lived on a farm, and he remembered the first time he milked a cow. This is...|flashback|foreshadowing|cliffhanger",
    "The chapter ended just as the lights went out. This is...|a cliffhanger|a flashback|foreshadowing",
    "Mia noticed the loose board on the bridge but said nothing. This is...|foreshadowing|flashback|a cliffhanger",
    "'I still remember my first day of school,' he thought, and the scene went back in time. This is...|flashback|foreshadowing|a cliffhanger",
    "The last line read: 'Then the door slowly began to open...' This is...|a cliffhanger|a flashback|foreshadowing",
    "A single crow sat on the fence the morning before the storm. This is...|foreshadowing|flashback|a cliffhanger",
    "Back when she was five, she had planted this very tree. This is...|flashback|foreshadowing|a cliffhanger"],
    ["Does it look back in time, hint at what is coming, or stop at an exciting moment?", "A flashback jumps to the past. Foreshadowing gives a clue about the future. A cliffhanger stops at a tense moment so you must read on.", "Example: <b>A strange sound came from the attic, but Ben ignored it.</b> It hints at trouble later: foreshadowing. Now do yours."],
    [["Flashback", "⏪", "A <b>flashback</b> jumps back to an earlier time: <b>When I was five, I planted this tree.</b>"], ["Foreshadowing", "🔮", "<b>Foreshadowing</b> drops a clue about what will happen later: <b>The sky looked strange that morning.</b>"], ["Cliffhanger", "🧗", "A <b>cliffhanger</b> stops at an exciting moment so that readers must keep reading."]]);

  const C14 = mk("The focus statement", "🎯", sq("Which sentence is the best <b>focus statement</b> for an essay?", [
    "School uniforms should be optional because they limit student choice.|Uniforms are clothes.|Do you like uniforms?",
    "Dogs make better pets than fish because they offer companionship and exercise.|Dogs and fish are pets.|I will write about pets.",
    "Reading every day improves vocabulary, focus and imagination.|Reading is a thing people do.|What is reading?",
    "Our school should plant a garden to teach students about healthy food.|Gardens have plants.|Let me tell you about gardens.",
    "The Amazon rainforest is important because it gives homes to animals and helps clean the air.|The Amazon is a place.|This essay is about the Amazon.",
    "Recycling programs help cities cut down on trash.|Recycling is something.|Do cities recycle?",
    "Volcanoes are dangerous but also help create new land and rich soil.|Volcanoes are mountains.|My topic is volcanoes.",
    "Students should get a longer lunch break to eat and relax.|Lunch is at noon.|Why is lunch so short?"]),
    ["A focus statement tells your main point. Which choice tells the reader what you will say about the topic?", "A good focus statement makes a clear point or a claim. It is not just a topic, a question, or an announcement.", "Example: <b>Zoos help protect rare animals.</b> This is a clear point. <b>Zoos are places.</b> is only a topic. Now do yours."],
    [["Main point", "🎯", "A <b>focus statement</b> (or thesis) says the main point of your whole essay in one sentence."], ["What it includes", "🧩", "It names the topic <b>and</b> says something about it: <b>Dogs make great pets because they are loyal.</b>"], ["What it is not", "🚫", "Not just a topic (<b>Dogs</b>), not a question, and not an announcement (<b>I will write about dogs</b>)."]]);

  const C15 = mk("The other side", "🗣️", [
    "Claim: <i>Kids should have more recess.</i> Which is a <b>counterclaim</b>?|Some people say recess takes time away from learning.|Recess is fun for everyone.|Kids like the playground.",
    "Claim: <i>School should start later.</i> Which is a <b>counterclaim</b>?|Some argue a later start would make the day end too late.|Sleep is important.|Buses are yellow.",
    "Claim: <i>Cell phones should stay out of class.</i> Which is a <b>counterclaim</b>?|Others say phones can be useful learning tools.|Phones are distracting.|Some phones are blue.",
    "Claim: <i>We should walk to school.</i> Which is a <b>counterclaim</b>?|Some families live too far to walk safely.|Walking is healthy.|Walking saves gas.",
    "Counterclaim: <i>Some say pets are too much work.</i> Which is the best <b>rebuttal</b>?|Yes, pets take effort, but they give love and teach responsibility.|Pets are cute.|No one said that.",
    "Counterclaim: <i>Some say homework is useful.</i> Which is the best <b>rebuttal</b>?|True, but too much homework leaves kids no time to rest.|Homework is boring.|I do not do homework.",
    "Which words usually <b>introduce a counterclaim</b>?|Some people argue that|In my opinion|First of all",
    "Which words usually <b>introduce a rebuttal</b>?|However, the evidence shows|For example|In conclusion"],
    ["A counterclaim is what the other side would say. A rebuttal answers it. Which choice does that job?", "A counterclaim disagrees with your claim. A rebuttal admits the other side's point and then shows why your claim is still stronger.", "Example: <b>Claim: Parks need more trees. Counterclaim: Trees cost money. Rebuttal: True, but they cool the air and save energy later.</b> Now do yours."],
    [["Both sides", "🗣️", "A strong argument shows that the writer has thought about <b>both sides</b>."], ["Counterclaim", "↩️", "A <b>counterclaim</b> is what someone who disagrees might say: <b>Some people argue that...</b>"], ["Rebuttal", "🛡️", "A <b>rebuttal</b> answers the counterclaim with evidence: <b>However, the facts show...</b>"]]);

  const C16 = mk("Linking paragraphs", "🌉", [
    "Paragraph 1 is about why dogs make good pets. Paragraph 2 is about the work of owning one. Which is the best start for paragraph 2?|On the other hand, owning a dog also takes work.|Dogs are good.|First of all, dogs bark.",
    "Paragraph 1 describes mixing the ingredients. Paragraph 2 describes baking. Which is the best start for paragraph 2?|After the batter is ready, it is time to bake.|Cakes taste sweet.|My dog likes cake.",
    "Paragraph 1 gives reasons to visit the zoo. Paragraph 2 gives one more reason. Which is the best start for paragraph 2?|Another reason to visit the zoo is the chance to learn.|The zoo has gates.|Zoos are places.",
    "Paragraph 1 is about how the Moon looks. Paragraph 2 is about how it moves around Earth. Which is the best start for paragraph 2?|Besides how it looks, the Moon also moves around Earth.|Earth is round.|The sun is big.",
    "Paragraph 1 describes the problem of litter. Paragraph 2 gives solutions. Which is the best start for paragraph 2?|To solve this problem, we can start a cleanup club.|Litter is on the ground.|Trash cans exist.",
    "This is the final paragraph of an essay about a school garden. Which is the best start?|In conclusion, a garden would help our whole school.|Next, I will talk about soil.|Also, plants need water.",
    "Paragraph 1 is about summer. Paragraph 2 shows a difference with winter. Which is the best start for paragraph 2?|In contrast, winter brings cold and snow.|Summer has sun.|Snow is white.",
    "Paragraph 1 is the first step of making bread. Paragraph 2 is the second step. Which is the best start for paragraph 2?|Once the dough has risen, the next step is to shape it.|Dough is soft.|Bread is brown."],
    ["How does the next paragraph connect to the one before? Same idea, an extra idea, a contrast, a result or the end?", "Start a new paragraph with a linking phrase that shows how it connects: 'Another reason', 'In contrast', 'After that', 'To solve this', 'In conclusion'.", "Example: after a paragraph about the problem of noise, <b>One way to fix this problem is to add rugs.</b> starts the solution paragraph smoothly. Now do yours."],
    [["Bridges", "🌉", "Good essays flow from one paragraph to the next. A <b>transition</b> is the bridge."], ["How they link", "🔗", "Add: <b>another, besides, also</b>. Contrast: <b>in contrast, on the other hand</b>. Order: <b>after that, next, once</b>. End: <b>in conclusion</b>."], ["Use the idea", "💡", "A strong first sentence repeats a piece of the last idea and then moves on: <b>Besides how it looks...</b>"]]);

  const C17 = mk("Tone and audience", "🎼", [
    "'Stop! Get away from the edge right now!' What is the tone?|urgent|playful|bored",
    "'Oh, what a lovely day for a stroll, my dear!' What is the tone?|cheerful|angry|fearful",
    "'Fine. Whatever. I do not care.' What is the tone?|annoyed|excited|thankful",
    "'We are proud of you, and we know you can do it.' What is the tone?|encouraging|rude|bored",
    "Which word describes the tone of a thank-you letter?|grateful|grumpy|scary",
    "You write to kindergarteners about fire safety. Which style fits best?|short, friendly words|long, hard words|slang jokes",
    "You write to the city council asking for a crosswalk. Which style fits best?|polite and serious, with reasons|silly, with jokes|angry and rude",
    "You write a funny poem for your friends. Which tone fits best?|playful|stern|grim"],
    ["Imagine how the words would sound out loud. What feeling is in the voice?", "Tone is the writer's attitude. Choose words and sentence length that fit the feeling and the reader.", "Example: <b>'Oh no, we're late!'</b> sounds worried. <b>'Hooray, we made it!'</b> sounds joyful. The words show the tone. Now do yours."],
    [["Tone", "🎼", "<b>Tone</b> is the writer's attitude shown in word choice: urgent, cheerful, serious, playful, gentle."], ["Audience", "👥", "Your <b>audience</b> is who will read it. Choose words they understand and a tone they will respect."], ["Matching", "🎯", "Little kids: short, friendly words. Officials: polite and serious with reasons. Friends: relaxed and fun."]]);

  const C18 = mk("Proofreading", "🧐", bq("What kind of mistake is in this sentence?", [
    "We went to the park on saturday.|capital letter|spelling|end punctuation|verb form",
    "She was very excited about the field trip|end punctuation|capital letter|spelling|verb form",
    "The librarian recieved a new shipment of books.|spelling|capital letter|end punctuation|verb form",
    "He runned all the way home.|verb form|spelling|capital letter|end punctuation",
    "The bird flew over it's nest.|wrong word|spelling|capital letter|end punctuation",
    "Where are you going.|end punctuation|spelling|verb form|wrong word",
    "Yesterday, we seen a rainbow.|verb form|capital letter|end punctuation|spelling",
    "I would like to buy a nice pair of shoos.|spelling|capital letter|verb form|end punctuation"]),
    ["Read the sentence slowly, one word at a time. Look at the first letter, the last mark, and each word.", "Check four things in order: capital letters, spelling, word choice and verb forms, then the end mark. Which one is off?", "Example: <b>they was happy.</b> There is a capital letter missing at the start and a wrong verb form. Find the one that fits the choices. Now do yours."],
    [["Proofreading", "🧐", "<b>Proofreading</b> means reading carefully to find and fix mistakes."], ["What to check", "📋", "<b>Capital letters</b>, <b>spelling</b>, <b>punctuation</b>, <b>verb forms</b> and look-alike <b>words</b> such as its/it's."], ["Tips", "💡", "Read it aloud. Read it backward, one word at a time, to catch spelling. Check the first letter and the last mark of each sentence."]]);

  Object.assign(WRITING_LEVELS, {
    12: [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, C17, C18,
      MIX("Mixed practice", C1, C2, C5, C8, C14), MIX("Level 12 Challenge", C3, C4, C6, C7, C9, C11, C15, C18)]
  });
})();
