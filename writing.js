// Mind Lab Writing & Grammar. Levels 1-3, 20 lessons each (60 lessons).
// Needs math.js loaded first (uses ri, pick, shuf).
const WRITING_LEVELS = (() => {
  const T = (h, v, t) => ({ h, v, t });
  const rest = (arr, x, n) => shuf(arr.filter(y => y !== x)).slice(0, n);
  const mkL = (title, make, slides) => { make.teach = () => slides; return { title, make }; };
  const MIX = (title, ...ls) => {
    const f = () => pick(ls).make();
    f.teach = () => [T("Review time!", "🔄", "This lesson mixes things you already know. Here is a quick reminder of each idea, then the quiz.")].concat(ls.map(l => l.make.teach()[0]));
    return { title, make: f };
  };
  // statics: rows are [text, answer, [wrong choices], optional visual, optional hint 2]
  const statics = (rows, h1, h2, h3) => () => {
    const [text, ans, wr, vis, x2] = pick(rows);
    const q = { text, choices: shuf([ans, ...wr]), answer: ans, hints: [h1, x2 || h2, h3] };
    if (vis) q.visual = vis;
    return q;
  };
  const words = s => s.replace(/[.,?!]/g, "").split(" ");
  // wordPick: rows are [sentence, answer word]; the other two choices come from the sentence
  const wordPick = (rows, qtext, h1, h2, h3, skipFirst) => () => {
    const [s, ans] = pick(rows);
    const ws = words(s), seen = new Set([ans.toLowerCase()]), pool = [];
    ws.forEach((w, i) => { const k = w.toLowerCase(); if (!seen.has(k) && !(skipFirst && i === 0)) { seen.add(k); pool.push(w); } });
    return { text: `${qtext}<br><br><b>${s}</b>`, choices: shuf([ans, ...shuf(pool).slice(0, 2)]), answer: ans, hints: [h1, h2, h3] };
  };
  // classify: map {label: [words]}
  const classify = (map, tmpl, h1, h2, h3, vis) => {
    const labels = Object.keys(map);
    return () => {
      const lab = pick(labels), w = pick(map[lab]);
      const q = { text: tmpl.replace("{w}", w), choices: shuf(labels), answer: lab, hints: [h1, h2, h3] };
      if (vis && vis[w]) q.visual = vis[w];
      return q;
    };
  };
  const cap1 = s => s[0].toUpperCase() + s.slice(1);

  // ---------- sentence banks ----------
  const UN = {
    1: ["The cat sat.", "The dog ran.", "The sun is hot.", "The bird can fly.", "A pig is in the mud.", "My dad has a hat.", "The frog hops away.", "Our class reads books."],
    2: ["The little bird sings.", "My mom bakes a cake.", "The big dog ran fast.", "Our teacher reads a story.", "The sun shines in the sky.", "A frog sits on a log.", "The kids play at school.", "My cat sleeps on the bed."],
    3: ["The brown horse ate green grass.", "We saw three ducks at the pond.", "The small boat sails across the lake.", "The baby bird sat in the nest.", "A red balloon floated up high.", "Dad cooks dinner in the kitchen.", "The kids ride bikes to school.", "My brother and I play in the yard."]
  };
  const unscramble = bank => () => {
    const s = pick(bank), ws = s.slice(0, -1).split(" ");
    const low = ws.map((w, i) => (i === 0 || w === "I" ? w : w));
    const norm = a => cap1(a.map((w, i) => (w === "I" ? w : w.toLowerCase())).join(" ")) + ".";
    const swap = ws.slice(); [swap[0], swap[1]] = [swap[1], swap[0]];
    const rev = ws.slice().reverse();
    const rot = ws.slice(1).concat(ws[0]);
    const wr = shuf([norm(swap), norm(rev), norm(rot)]).slice(0, 2);
    return { text: "Which sentence has the words in the <b>right order</b>?", choices: shuf([s, ...wr]), answer: s,
      hints: ["Read each choice out loud. Which one sounds like real talking?", "A sentence usually tells <b>who or what</b> first, then what they do or are. Read each choice and see which one makes sense.", "Example: <b>Sing can birds.</b> does not make sense, but <b>Birds can sing.</b> does. Now read yours."] };
  };
  const unSlides = [
    T("Words in order", "cat · The · sat → <b>The cat sat.</b>", "The order of words matters. If the words are mixed up, the sentence does not make sense."),
    T("How to unscramble", "Who? → What did they do?", "Start with the word that begins with a capital letter. Then say who or what, and what they did."),
    T("Check it", "👂", "Read your sentence out loud in your head. If it sounds right, it is right!")
  ];

  const capStart = () => {
    const bank = ["the sun is hot.", "my dog can run.", "we like to play.", "a bird sits on the tree.", "it is a sunny day.", "she has a red hat.", "he can jump high.", "our cat is soft.", "look at the moon.", "this is my bed."];
    return () => {
      const s = pick(bank), ws = words(s), first = ws[0], pool = [], seen = new Set([first]);
      ws.slice(1).forEach(w => { if (!seen.has(w)) { seen.add(w); pool.push(w); } });
      return { text: `Which word needs a <b>capital letter</b> at the start of this sentence?<br><br><b>${s}</b>`, choices: shuf([first, ...shuf(pool).slice(0, 2)]), answer: first,
        hints: ["Every sentence begins with a capital letter. Where does a sentence begin?", "A sentence begins with its very first word. Look at the start of the line.", "Example: <b>we can run.</b> The first word is \"we\", so it needs a capital: <b>We</b> can run. Now do yours."] };
    };
  };
  const NAMES = ["sam", "mia", "ben", "lily", "max", "anna", "leo", "zoe", "jack", "ella"];
  const nameQ = () => () => {
    const n = pick(NAMES), s = pick(["Today {n} will play at the park.", "My friend {n} has a red kite.", "We went to the zoo with {n}.", "Yesterday {n} got a new hat.", "Did you see {n} at school?", "The dog belongs to {n}.", "Grandma gave a cookie to {n}."]).replace("{n}", n);
    const pool = words(s).slice(1).filter(w => w !== n && w.toLowerCase() !== n);
    return { text: `Which word needs a <b>capital letter</b> because it is a name?<br><br><b>${s}</b>`, choices: shuf([n, ...shuf(pool).slice(0, 2)]), answer: n,
      hints: ["A name is a word that tells who a person is.", "Find the word in the sentence that is somebody's name. Names always start with a capital.", "Example: <b>My friend tom is kind.</b> \"tom\" is a person's name, so it should be <b>Tom</b>. Now do yours."] };
  };
  const iQ = () => () => {
    const s = pick(["Today i will play outside.", "Can i help you?", "Dad and i read a book.", "Yesterday i saw a frog.", "Mom said i can go.", "May i have a cookie?", "Then i went to bed."]);
    const pool = words(s).slice(1).filter(w => w !== "i");
    return { text: `One word in this sentence needs a capital letter because it means <b>me</b>. Which one?<br><br><b>${s}</b>`, choices: shuf(["i", ...shuf(pool).slice(0, 2)]), answer: "i",
      hints: ["When you talk about yourself you use a short word. Which word is that?", "The word for \"me\" is just one letter long.", "Example: <b>Dan and i ran.</b> The word \"i\" means the speaker, so it must be a capital <b>I</b>. Now find yours."] };
  };
  const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
  const dayQ = () => () => {
    const d = pick(DAYS), s = pick(["We go to school on {d}.", "Today is {d}.", "On {d} we play outside.", "My birthday party is on {d}.", "Soccer is on {d}.", "I visit Grandma on {d}.", "Pizza night is {d}."]).replace("{d}", d).replace(/^(\w)/, c => c.toUpperCase());
    const pool = words(s).slice(1).filter(w => w !== d);
    return { text: `Which word needs a <b>capital letter</b> because it is a day of the week?<br><br><b>${s}</b>`, choices: shuf([d, ...shuf(pool).slice(0, 2)]), answer: d,
      hints: ["The days of the week are special names. They have names just like people do.", "Find the day of the week in the sentence. Days like Sunday and Monday start with capital letters.", "Example: <b>We swim on friday.</b> \"friday\" is a day, so it needs a capital: <b>Friday</b>. Now do yours."] };
  };
  const capMulti = rows => wordPick(rows, "Which word needs a <b>capital letter</b>?",
    "Names of people, days of the week and months of the year all start with a capital letter.",
    "Look for a name, a day or a month. It is the one that is written in small letters but should be big.",
    "Example: <b>School starts in august.</b> \"august\" is a month, so it needs a capital: <b>August</b>. Now do yours.", true);
  const CAPROWS2 = [["Today is friday.", "friday"], ["Yesterday ben and I played.", "ben"], ["We go to the lake in july.", "july"], ["Mom saw lily at the shop.", "lily"], ["My class has art on tuesday.", "tuesday"], ["The party is in june.", "june"], ["I gave a gift to max.", "max"], ["We eat pizza on saturday.", "saturday"]].map(r => r.slice());
  CAPROWS2[0][0] = "My favorite day is friday.";
  const CAPROWS3 = [["In july we go to the lake.", "july"], ["My friend lily has a pet frog.", "lily"], ["Our swim class is on tuesday.", "tuesday"], ["Yesterday mia and I built a fort.", "mia"], ["School starts in august.", "august"], ["I think max likes to draw.", "max"], ["We had a party on saturday.", "saturday"], ["My cousin omar lives far away.", "omar"], ["On friday we eat pizza.", "friday"], ["Winter ends in march.", "march"], ["Did you see anna at the park?", "anna"], ["Dad was born in october.", "october"]];

  const markRows = (rows, labels) => statics(rows.map(r => ["Which mark goes at the end?<br><br><b>" + r[0] + "</b>", r[1], labels.filter(l => l !== r[1]), null]),
    "Read the sentence out loud. Is it telling you something, asking something, or showing a big feeling?",
    "A <b>period</b> ends a telling sentence. A <b>question mark</b> ends an asking sentence. An <b>exclamation mark</b> shows a big feeling.",
    "Example: <b>Do you like pizza</b> asks something, so it ends with a question mark. <b>I like pizza</b> tells something, so it ends with a period. Now do yours.");
  const MK12 = [["The sun is up", "period"], ["Do you like cake", "question mark"], ["I have a red ball", "period"], ["Where is my hat", "question mark"], ["We go to school", "period"], ["Can I play", "question mark"], ["What is your name", "question mark"], ["It is time for lunch", "period"], ["Is the dog big", "question mark"], ["Mom made soup", "period"]];
  const EXC = [["Wow, that is huge", "exclamation mark"], ["Look out", "exclamation mark"], ["Yay, we won", "exclamation mark"], ["Ouch, that hurt", "exclamation mark"], ["Hooray, it is snowing", "exclamation mark"], ["Help, I am stuck", "exclamation mark"], ["The sun is up", "period"], ["I have a red ball", "period"], ["Where is my hat", "question mark"], ["Do you like cake", "question mark"]];
  const MK3 = [["The bus comes at eight", "period"], ["We are going to the lake", "period"], ["Where did you put my shoes", "question mark"], ["Is it time for lunch", "question mark"], ["Who knocked on the door", "question mark"], ["Wow, we won the game", "exclamation mark"], ["Watch out for the car", "exclamation mark"], ["Oh no, the cake fell", "exclamation mark"], ["Hooray, it is snowing", "exclamation mark"], ["Ouch, that hurts", "exclamation mark"], ["My sister plays the drums", "period"], ["How old are you", "question mark"]];
  const marks3 = ["period", "question mark", "exclamation mark"];

  const TELL = statics([
    ["The sun is hot.", "telling", ["asking"]], ["I like pizza.", "telling", ["asking"]], ["We have a dog.", "telling", ["asking"]], ["It is raining.", "telling", ["asking"]], ["The bird can sing.", "telling", ["asking"]],
    ["Do you like pizza?", "asking", ["telling"]], ["Where is my hat?", "asking", ["telling"]], ["Can I play?", "asking", ["telling"]], ["What is your name?", "asking", ["telling"]], ["Is it time to eat?", "asking", ["telling"]]
  ].map(r => ["Is this sentence <b>telling</b> or <b>asking</b>?<br><br><b>" + r[0] + "</b>", r[1], r[2]]), "Read the sentence. Does it tell you something, or ask you something?", "Telling sentences end with a period (.). Asking sentences end with a question mark (?).", "Example: <b>The cat is soft.</b> tells us something. <b>Is the cat soft?</b> asks something. Now do yours.");
  const KIND3 = statics([
    ["The kids are playing outside.", "statement", ["question", "exclamation"]], ["My grandma lives by the sea.", "statement", ["question", "exclamation"]], ["We planted a tree today.", "statement", ["question", "exclamation"]],
    ["What time does the bus come?", "question", ["statement", "exclamation"]], ["Did you feed the fish?", "question", ["statement", "exclamation"]], ["Which one is yours?", "question", ["statement", "exclamation"]],
    ["That roller coaster is so fast!", "exclamation", ["statement", "question"]], ["I love this song!", "exclamation", ["statement", "question"]], ["Look at the rainbow!", "exclamation", ["statement", "question"]], ["I got a new puppy!", "exclamation", ["statement", "question"]]
  ].map(r => ["What kind of sentence is this?<br><br><b>" + r[0] + "</b>", r[1], r[2]]), "Look at the mark at the end of the sentence. What does it tell you?", "A <b>statement</b> tells something (.). A <b>question</b> asks something (?). An <b>exclamation</b> shows a strong feeling (!).", "Example: <b>Can we go now?</b> asks something, so it is a question. <b>We can go now.</b> tells something, so it is a statement. Now do yours.");

  const fixRows = [
    ["the dog is big.", "It needs a capital letter at the start.", ["It needs a question mark.", "It needs a capital letter on a name."]],
    ["My cat is soft", "It needs a period at the end.", ["It needs a capital letter at the start.", "It needs a question mark."]],
    ["Where is my hat.", "It needs a question mark, not a period.", ["It needs a capital letter at the start.", "It needs a capital letter on a name."]],
    ["Today I saw ben.", "It needs a capital letter on the name.", ["It needs a capital letter at the start.", "It needs a question mark."]],
    ["we like pizza.", "It needs a capital letter at the start.", ["It needs a period at the end.", "It needs a capital letter on a day."]],
    ["Can you help me", "It needs a question mark at the end.", ["It needs a period at the end.", "It needs a capital letter at the start."]],
    ["Mom and i went home.", "It needs a capital I.", ["It needs a capital letter at the start.", "It needs a question mark."]],
    ["Dad has a car", "It needs a period at the end.", ["It needs a capital letter at the start.", "It needs a capital I."]],
    ["Do you have a pet.", "It needs a question mark, not a period.", ["It needs a capital letter at the start.", "It needs a capital letter on a name."]],
    ["We go to school on monday.", "It needs a capital letter on the day.", ["It needs a capital letter at the start.", "It needs a question mark."]]
  ];
  const FIX = statics(fixRows.map(r => ["What needs to be fixed in this sentence?<br><br><b>" + r[0] + "</b>", r[1], r[2]]), "Check the start of the sentence, then the names and days, then the end.", "A sentence needs a capital letter at the start, capitals on names, days and the word I, and the right mark at the end.", "Example: <b>the cat sat</b> has two problems, but the first one is that \"the\" needs a capital: <b>The</b> cat sat. Now look at yours.");

  const QW = statics([
    ["___ is your name?", "What", ["Where", "When"]], ["___ do you live?", "Where", ["Who", "What"]], ["___ knocked on the door?", "Who", ["Where", "When"]], ["___ is your birthday?", "When", ["Who", "Where"]],
    ["___ is the cat sleeping?", "Where", ["Who", "What"]], ["___ is calling you on the phone?", "Who", ["Where", "When"]], ["___ is your favorite color?", "What", ["Who", "When"]], ["___ do we eat lunch?", "When", ["Who", "What"]]
  ].map(r => ["Which question word fits?<br><br><b>" + r[0] + "</b>", r[1], r[2]]), "Think about what the question is asking for: a person, a thing, a place, or a time.", "<b>Who</b> asks about a person. <b>What</b> asks about a thing. <b>Where</b> asks about a place. <b>When</b> asks about a time.", "Example: <b>___ is your teacher?</b> asks about a person, so it is <b>Who</b>. Now do yours.");

  const strip = s => s.slice(0, -1);
  const CF1 = ["The dog runs.", "Mom sat down.", "I see a bird.", "The sun is hot.", "We play ball.", "Birds can fly.", "My cat sleeps.", "The baby smiled."];
  const FR1 = ["The big dog.", "Runs fast.", "On the red bed.", "A little frog.", "Jumps up high.", "In the sandbox.", "My best friend.", "Eats a snack."];
  const CF2 = ["The kids sing a song.", "Dad bakes bread.", "The rabbit hops away.", "Grandma knits a hat.", "Rain falls on the roof.", "We built a sand castle.", "The bell rings loudly.", "Fish swim in the pond."];
  const FR2 = ["The kids in my class.", "Bakes bread every day.", "Hops away from the dog.", "A hat for Grandma.", "On the roof.", "A big sand castle.", "Rings loudly.", "In the pond."];
  const CF3 = ["The little girl ran home.", "Our team won the game.", "Birds build nests in trees.", "The cook made soup.", "Ben kicked the ball.", "A storm rolled across the sky.", "My sister paints pictures.", "The train stopped at the station."];
  const FR3 = ["The little girl.", "Runs down the hill.", "In the big red barn.", "Under the old bridge.", "My two best friends.", "Jumped over the log.", "A box of crayons.", "Across the wide river."];
  const wholeQ = (c, f, noMark) => () => {
    const fx = noMark ? strip : (x => x);
    const right = pick(c), wr = shuf(f).slice(0, 2);
    return { text: "Which one is a <b>whole sentence</b>?", choices: shuf([right, ...wr].map(fx)), answer: fx(right),
      hints: ["A whole sentence tells who or what AND tells what happens.", "Ask two things: Does it say <b>who or what</b>? Does it say <b>what they do</b>? A whole sentence needs both.", "Example: <b>The cat sat.</b> says who (the cat) and what (sat). <b>The little cat</b> only says who, so it is not whole. Now do yours."] };
  };
  const wholeSlides = [
    T("A whole sentence", "🐱 + 🪑 = <b>The cat sat.</b>", "A <b>sentence</b> has two parts: <b>who or what</b> (the cat) and <b>what happens</b> (sat). It tells a whole idea."),
    T("Pieces are not sentences", "\"The big dog\" 🤔 &nbsp; \"runs fast\" 🤔", "\"The big dog\" says who, but not what happens. \"Runs fast\" says what, but not who. Neither is a whole sentence."),
    T("Put them together", "The big dog + runs fast = <b>The big dog runs fast.</b>", "Join the two parts and you get a whole sentence!")
  ];

  const MAKES = statics([
    ["The boy eats an apple.", "The boy eats an apple.", ["The apple eats a boy.", "The boy apple eats."]], ["The girl reads a book.", "The girl reads a book.", ["The book reads a girl.", "The girl book reads."]],
    ["Mom drinks tea.", "Mom drinks tea.", ["Tea drinks Mom.", "Mom tea drinks."]], ["The baby holds a toy.", "The baby holds a toy.", ["The toy holds a baby.", "The baby toy holds."]],
    ["I ride my bike.", "I ride my bike.", ["My bike rides I.", "I bike my ride."]], ["The cat drinks milk.", "The cat drinks milk.", ["The milk drinks the cat.", "The cat milk drinks."]],
    ["The kids kick a ball.", "The kids kick a ball.", ["A ball kicks the kids.", "The kids ball kick."]], ["We wear hats.", "We wear hats.", ["Hats wear we.", "We hats wear."]]
  ].map(r => ["Which sentence <b>makes sense</b>?", r[1], r[2]]), "Read each sentence out loud. Which one sounds like something that can really happen?", "Check <b>who</b> does the action. People and animals eat, drink, read and ride. Things like apples and books do not.", "Example: <b>The dog chases a ball.</b> makes sense. <b>The ball chases a dog.</b> does not. Now do yours.");

  const SENTS = ["I see a cat.", "It is big.", "We play ball.", "The sun is up.", "I like cake.", "Dad is home.", "The bird sings.", "My dog is soft.", "It is a nice day."];
  const countSent = () => () => {
    const n = ri(1, 3), ss = shuf(SENTS).slice(0, n);
    return { text: `How many sentences are here?<br><br><b>${ss.join(" ")}</b>`, choices: [1, 2, 3], answer: n,
      hints: ["Each sentence ends with a mark, like a period.", "Count the end marks (. ? !). Each one ends one sentence.", "Example: <b>I run. I jump.</b> has 2 periods, so it has 2 sentences. Now count yours."] };
  };

  // ---------- word banks ----------
  const NN1 = ["cat", "tree", "ball", "bird", "shoe", "moon", "bed", "cake", "door", "frog"];
  const VB1 = ["eat", "sing", "hop", "clap", "sit", "draw", "read", "write"];
  const AJ1 = ["red", "big", "soft", "happy", "tall", "small", "loud", "funny"];
  const nounQ = () => () => {
    const w = pick(NN1), wr = [pick(VB1), pick(AJ1)];
    return { text: "Which word is a <b>naming word</b> (a noun)?", choices: shuf([w, ...wr]), answer: w,
      hints: ["A naming word names a person, a place, an animal or a thing.", "Ask: can I see it or point to it? A naming word is something you can name, like a hat or a tree.", "Example: in <b>hop, blue, ball</b> the naming word is <b>ball</b>, because it names a thing. Now do yours."] };
  };
  const verbQ = () => () => {
    const w = pick(VB1), wr = [pick(NN1), pick(AJ1)];
    return { text: "Which word is an <b>action word</b> (a verb)?", choices: shuf([w, ...wr]), answer: w,
      hints: ["An action word tells what someone or something does.", "Ask: can I do it? Action words are things like run, clap and jump. You can act them out!", "Example: in <b>tree, hug, soft</b> you can \"hug\", so <b>hug</b> is the action word. Now do yours."] };
  };
  const PTH = { person: ["mom", "teacher", "baby", "doctor", "friend", "farmer"], place: ["park", "school", "zoo", "store", "beach", "kitchen", "farm", "library"], animal: ["dog", "frog", "horse", "duck", "bee", "rabbit"], thing: ["ball", "chair", "cup", "book", "shoe", "kite", "bed"] };
  const pthQ = classify(PTH, "Is <b>{w}</b> a person, a place, an animal or a thing?", "A noun names a person, a place, an animal or a thing.", "A <b>person</b> is somebody. A <b>place</b> is somewhere you can go. An <b>animal</b> is a living creature. A <b>thing</b> is an object.", "Example: <b>nurse</b> is a person, <b>garden</b> is a place, <b>lion</b> is an animal, <b>spoon</b> is a thing. Now do yours.");
  const NV1 = { "naming word": NN1, "action word": VB1 };
  const nvQ1 = classify(NV1, "Is <b>{w}</b> a naming word or an action word?", "A naming word names something. An action word tells what you do.", "Can you do it, like clap or eat? Then it is an action word. Is it a person, place, animal or thing? Then it is a naming word.", "Example: <b>rope</b> names a thing, so it is a naming word. <b>wave</b> is something you do, so it is an action word. Now do yours.");
  const NV2 = { noun: ["teacher", "kitchen", "farmer", "rabbit", "bridge", "ocean", "window", "doctor"], verb: ["build", "carry", "listen", "whisper", "hurry", "enjoy", "wander", "borrow"] };
  const nvQ2 = classify(NV2, "Is <b>{w}</b> a noun or a verb?", "A noun names a person, place, animal or thing. A verb is an action word.", "Try the test: can you say \"I ___ every day\" with the word? If it works as an action, it is a verb. If you can say \"the ___\" or \"a ___\", it is a noun.", "Example: <b>garden</b> fits \"the garden\", so it is a noun. <b>plant</b> as in \"I plant seeds\" is a verb. Now do yours.");

  const CLOZE1 = statics([
    ["A dog can ___.", "run", ["red", "tree"]], ["I ___ a book.", "read", ["soft", "bed"]], ["The ___ is hot.", "sun", ["run", "eat"]], ["I ___ my lunch.", "eat", ["moon", "soft"]],
    ["The ___ can fly.", "bird", ["bed", "sit"]], ["We ___ a song.", "sing", ["door", "big"]], ["She has a ___ hat.", "red", ["run", "eat"]], ["I ___ on the chair.", "sit", ["moon", "red"]], ["The ___ barks.", "dog", ["cat", "bird"]]
  ].map(r => ["Which word fits the blank?<br><br><b>" + r[0] + "</b>", r[1], r[2]]), "Read the sentence with the blank. What word would make it make sense?", "Try each choice in the blank and read the whole sentence. Only one sounds right.", "Example: <b>The cat can ___.</b> Try \"jump\": \"The cat can jump.\" That makes sense! Now try yours.");

  const PICS1 = [
    ["🐶", "The dog barks.", ["The cat naps.", "The bird sings."]], ["🐸", "The frog jumps.", ["The fish swims.", "The pig rolls."]], ["☀️", "The sun is hot.", ["The moon is out.", "It is snowing."]], ["🌧️", "It is raining.", ["The sun is out.", "It is snowing."]],
    ["🐝", "A bee can buzz.", ["A cow can moo.", "A dog can bark."]], ["🍎", "I eat an apple.", ["I eat a banana.", "I eat a pie."]], ["🐘", "An elephant is big.", ["A mouse is big.", "A bug is big."]], ["🌙", "The moon is out.", ["The sun is hot.", "It is raining."]]
  ];
  const PICS2 = [
    ["🐱🥛", "The cat drinks milk.", ["The cat drinks juice.", "The dog drinks milk."]], ["👧🚲", "The girl rides a bike.", ["The girl rides a horse.", "The boy rides a bike."]], ["🐦🌳", "The bird sits in the tree.", ["The bird sits on the car.", "The cat sits in the tree."]],
    ["🐟💧", "The fish swims in water.", ["The fish flies in the sky.", "The bird swims in water."]], ["👦⚽", "The boy kicks a ball.", ["The boy kicks a hat.", "The girl throws a ball."]], ["🐰🥕", "The rabbit eats a carrot.", ["The rabbit eats a fish.", "The bear eats a carrot."]],
    ["🐶🦴", "The dog chews a bone.", ["The dog chews a shoe.", "The cat chews a bone."]], ["🐝🌸", "A bee visits a flower.", ["A bee visits a dog.", "A fly visits a flower."]]
  ];
  const PICS3 = [
    ["🐶⚽🌳", "The dog plays with a ball by the tree.", ["The dog plays with a bone by the tree.", "The cat plays with a ball by the tree."]], ["👧📖🌙", "The girl reads a book at night.", ["The boy reads a book at night.", "The girl reads a book in the morning."]],
    ["🐦🍎🌳", "The bird eats an apple in the tree.", ["The bird eats a fish in the tree.", "The bird eats an apple in the sea."]], ["🐱🛏️🌙", "The cat sleeps on the bed at night.", ["The cat sleeps in a tree at night.", "The cat eats on the bed at night."]],
    ["🐻🍯🌳", "The bear eats honey near a tree.", ["The bear eats fish near a tree.", "The bear sleeps near a pond."]], ["🐮🌱☀️", "The cow eats grass in the sun.", ["The cow eats a pizza in the sun.", "The cow sleeps in the snow."]],
    ["🐟🌊☀️", "The fish swims in the sea on a sunny day.", ["The fish flies over the sea.", "The fish swims in a tub on a rainy day."]], ["🐸🌧️🌿", "The frog sits on a leaf in the rain.", ["The frog sits on a leaf in the sun.", "The frog sleeps in a tub in the rain."]]
  ];
  const picQ = rows => statics(rows.map(r => ["Which sentence tells about the picture?", r[1], r[2], r[0]]), "Look closely at the picture. Who or what do you see? What are they doing?", "Read each sentence and check it against the picture. Cross out any sentence about things you cannot see.", "Example: for the picture 🐟 the sentence \"The fish swims.\" matches, but \"The bird sings.\" does not. Now do yours.");

  // plural
  const pluralQ = (rows, wrongsOf, exs, rule) => () => {
    const [w, p, e] = pick(rows), ex = exs.find(x => x[0] !== w) || exs[0];
    return { text: `One ${w}. Two ___ .`, visual: e, choices: shuf([p, ...wrongsOf(w)]), answer: p,
      hints: ["Plural means more than one. Two or more things need a plural word.", rule, `Example: one ${ex[0]} → two ${ex[1]}. Now do yours.`] };
  };
  const PL_S = [["cat", "cats", "🐱"], ["dog", "dogs", "🐶"], ["pig", "pigs", "🐷"], ["hat", "hats", "🎩"], ["book", "books", "📖"], ["tree", "trees", "🌳"], ["star", "stars", "⭐"], ["flower", "flowers", "🌸"], ["bed", "beds", "🛏️"]];
  const PL_ES = [["box", "boxes", "📦"], ["bus", "buses", "🚌"], ["dish", "dishes", "🍽️"], ["fox", "foxes", "🦊"], ["glass", "glasses", "🥛"], ["brush", "brushes", "🪥"], ["watch", "watches", "⌚"], ["peach", "peaches", "🍑"]];
  const PL_IES = [["baby", "babies", "👶"], ["puppy", "puppies", "🐶"], ["cherry", "cherries", "🍒"], ["fly", "flies", "🪰"], ["butterfly", "butterflies", "🦋"], ["berry", "berries", "🫐"], ["penny", "pennies", "🪙"]];
  const PL_IRR = [["man", "men", "👨"], ["child", "children", "🧒"], ["foot", "feet", "🦶"], ["mouse", "mice", "🐭"], ["tooth", "teeth", "🦷"], ["woman", "women", "👩"]];
  const plS = pluralQ(PL_S, w => [w, w + "es"], [["dog", "dogs"], ["hat", "hats"]], "For most words, just add an <b>s</b> at the end to make more than one.");
  const plES = pluralQ(PL_ES, w => [w, w + "s"], [["dress", "dresses"], ["lunch", "lunches"]], "Words that end in <b>s, x, sh</b> or <b>ch</b> need <b>-es</b> to make more than one.");
  const plIES = pluralQ(PL_IES, w => [w + "s", w + "es"], [["lady", "ladies"], ["story", "stories"]], "If a word ends in a consonant and then <b>y</b>, change the y to <b>i</b> and add <b>-es</b>.");
  const plIRR = pluralQ(PL_IRR, w => [w + "s", w + "es"], [["goose", "geese"], ["woman", "women"]], "Some words change in a special way. You just have to learn them: man → men, foot → feet, mouse → mice.");
  const plMix = () => () => {
    const kind = pick([plS, plES]);
    return kind();
  };
  const plMixF = () => { const f = () => pick([plS, plES])(); return f; };

  const NOUNROWS2 = [["The dog runs fast.", "dog"], ["A bird sings.", "bird"], ["I eat an apple.", "apple"], ["The sun is hot.", "sun"], ["We read a book.", "book"], ["She has a red hat.", "hat"], ["The frog can jump.", "frog"], ["My cat is soft.", "cat"], ["The fish swims.", "fish"], ["He kicks the ball.", "ball"]];
  const VERBROWS2 = [["The dog runs fast.", "runs"], ["A bird sings.", "sings"], ["I eat an apple.", "eat"], ["The cat jumps.", "jumps"], ["We read a book.", "read"], ["He kicks the ball.", "kicks"], ["Kids play outside.", "play"], ["She draws a star.", "draws"], ["The frog hops.", "hops"], ["Birds fly high.", "fly"]];
  const ADJROWS2 = [["The big dog ran.", "big"], ["I see a red bird.", "red"], ["She has a soft bed.", "soft"], ["The tall tree sways.", "tall"], ["We ate hot soup.", "hot"], ["A tiny ant crawls.", "tiny"], ["He wears a blue hat.", "blue"], ["The cold wind blows.", "cold"], ["My happy dog jumps.", "happy"]];
  const SUBJROWS2 = [["The cat sleeps.", "cat"], ["Birds sing songs.", "Birds"], ["My mom bakes bread.", "mom"], ["The frog hops away.", "frog"], ["Our teacher reads.", "teacher"], ["Rain falls down.", "Rain"], ["The baby laughs.", "baby"], ["Dad drives a truck.", "Dad"]];
  const ADJCLOZE = statics([
    ["The ice is ___.", "cold", ["hot", "loud"]], ["The sun is ___.", "hot", ["cold", "wet"]], ["A feather is ___.", "soft", ["heavy", "loud"]], ["A rock is ___.", "hard", ["soft", "funny"]], ["An ant is ___.", "tiny", ["huge", "tall"]],
    ["A lemon is ___.", "sour", ["loud", "soft"]], ["The pillow is ___.", "soft", ["hard", "loud"]], ["The night sky is ___.", "dark", ["bright", "hot"]], ["Cotton candy is ___.", "sweet", ["sour", "loud"]]
  ].map(r => ["Which describing word fits?<br><br><b>" + r[0] + "</b>", r[1], r[2]]), "A describing word tells more about a thing: how it looks, feels, tastes or sounds.", "Think about the thing in the sentence. Is it hot or cold? Soft or hard? Only one choice is true.", "Example: <b>The snow is ___.</b> Snow is cold, so <b>cold</b> fits. Now think about yours.");
  const ADJ3 = statics([
    ["A lemon tastes ___.", "sour", ["loud", "round"]], ["The ice cube feels ___.", "cold", ["loud", "sweet"]], ["The thunder was very ___.", "loud", ["sweet", "shy"]], ["The giant is very ___.", "tall", ["tiny", "round"]],
    ["A turtle is ___.", "slow", ["fast", "loud"]], ["A cheetah is ___.", "fast", ["slow", "shy"]], ["The night sky is ___.", "dark", ["bright", "hot"]], ["The soup is too ___. I will blow on it.", "hot", ["cold", "sweet"]], ["The pillow is ___.", "soft", ["hard", "loud"]]
  ].map(r => ["Which describing word fits best?<br><br><b>" + r[0] + "</b>", r[1], r[2]]), "Describing words tell how something looks, feels, tastes, sounds or acts.", "Use what you know about the thing. Which word is true about it? Cross out the ones that are not.", "Example: <b>A feather is ___.</b> A feather is light, so <b>light</b> fits, not \"heavy\". Now try yours.");

  const AN_W = ["apple", "egg", "ant", "orange", "elephant", "igloo", "umbrella", "owl", "ink", "eagle"];
  const A_W = ["dog", "cat", "ball", "pig", "tree", "book", "bed", "frog", "sun", "hat"];
  const AN_E = { apple: "🍎", egg: "🥚", ant: "🐜", orange: "🍊", elephant: "🐘", owl: "🦉", eagle: "🦅", dog: "🐶", cat: "🐱", ball: "⚽", pig: "🐷", tree: "🌳", book: "📖", bed: "🛏️", frog: "🐸", sun: "☀️", hat: "🎩" };
  const anQ = () => () => {
    const w = pick(AN_W.concat(A_W)), ans = "aeiou".includes(w[0]) ? "an" : "a", ex = ans === "an" ? "a dog, but an apple" : "an apple, but a dog";
    const q = { text: `Which word fits?<br><br><b>___ ${w}</b>`, choices: ["a", "an"], answer: ans,
      hints: ["Use <b>a</b> or <b>an</b> in front of a naming word.", "Look at the first letter of the word after the blank. Is it a vowel (a, e, i, o, u) or a consonant?", `Example: we say ${ex}. The first letter decides. Now look at your word.`] };
    if (AN_E[w]) q.visual = AN_E[w];
    return q;
  };
  const AN_P = ["red apple", "old hat", "big egg", "easy test", "yellow ant", "empty box", "small orange", "orange cat", "green frog", "icy road", "tall elephant", "blue egg", "open door", "soft pillow"];
  const anAdjQ = () => () => {
    const p = pick(AN_P), ans = "aeiou".includes(p[0]) ? "an" : "a";
    return { text: `Which word fits?<br><br><b>___ ${p}</b>`, choices: ["a", "an"], answer: ans,
      hints: ["Use <b>a</b> or <b>an</b> before a naming word, and before a describing word too.", "Look at the very next word after the blank. Does it start with a vowel sound (a, e, i, o, u)?", "Example: we say <b>an old hat</b>, because \"old\" starts with a vowel. But we say <b>a big hat</b>, because \"big\" starts with a consonant. Now do yours."] };
  };

  const ISARE = statics([
    ["The cat ___ here.", "is", ["are", "am"]], ["The cats ___ here.", "are", ["is", "am"]], ["I ___ happy.", "am", ["is", "are"]], ["We ___ friends.", "are", ["is", "am"]], ["She ___ tall.", "is", ["are", "am"]],
    ["The dogs ___ big.", "are", ["is", "am"]], ["A bird ___ in the tree.", "is", ["are", "am"]], ["You ___ kind.", "are", ["is", "am"]], ["Birds ___ singing.", "are", ["is", "am"]]
  ].map(r => ["Which word fits?<br><br><b>" + r[0] + "</b>", r[1], r[2]]), "Look at who or what the sentence is about. Is it one thing or more than one?", "Use <b>is</b> for one person or thing. Use <b>are</b> for more than one, and for \"you\" and \"we\". Use <b>am</b> only with \"I\".", "Example: <b>The bird ___ small.</b> One bird, so \"is\": The bird is small. <b>The birds ___ small.</b> Many birds, so \"are\". Now do yours.");
  const WASWERE = statics([
    ["The cat ___ happy right now.", "is", ["was", "are"]], ["My friends ___ at the park now.", "are", ["is", "was"]], ["Yesterday, I ___ at home.", "was", ["am", "were"]], ["Yesterday, we ___ at the zoo.", "were", ["was", "are"]],
    ["Last night, the moon ___ bright.", "was", ["is", "were"]], ["The puppies ___ sleepy yesterday.", "were", ["was", "are"]], ["Today, the sky ___ blue.", "is", ["was", "were"]], ["You ___ my best friend today.", "are", ["is", "was"]], ["The flowers ___ pretty last spring.", "were", ["was", "are"]], ["I ___ happy today.", "am", ["is", "are"]]
  ].map(r => ["Which word fits?<br><br><b>" + r[0] + "</b>", r[1], r[2]]), "Look for a time clue: now, today, yesterday, last night.", "<b>Is, am, are</b> are for now. <b>Was</b> and <b>were</b> are for before (the past). Use was with one, and were with more than one or with you.", "Example: <b>Yesterday, the dog ___ sleepy.</b> Yesterday is past, and one dog, so \"was\". Now do yours.");

  const AND2 = statics([
    ["I have a cat ___ a dog.", "and", ["but"]], ["We sang ___ we danced.", "and", ["but"]], ["Mom ___ Dad are here.", "and", ["but"]], ["Salt ___ pepper go on the table.", "and", ["but"]],
    ["I like pizza ___ I do not like peas.", "but", ["and"]], ["I can run ___ I cannot fly.", "but", ["and"]], ["My dog is big ___ my cat is tiny.", "but", ["and"]], ["I am hungry ___ there is no food.", "but", ["and"]]
  ].map(r => ["Which word fits the best?<br><br><b>" + r[0] + "</b>", r[1], r[2]]), "Do the two parts go together, or are they different from each other?", "<b>And</b> joins things that go together. <b>But</b> joins things that are different or surprising.", "Example: <b>I like milk ___ I like juice.</b> Both are things I like, so \"and\". <b>I like milk ___ I do not like tea.</b> Different, so \"but\". Now do yours.");
  const AND3 = statics([
    ["Sam has a dog ___ a cat.", "and", ["but"]], ["We sang ___ we danced.", "and", ["but"]], ["I like to read ___ draw.", "and", ["but"]], ["The sky is blue ___ the grass is green.", "and", ["but"]], ["Mom ___ I baked cookies.", "and", ["but"]],
    ["I like tea ___ I do not like coffee.", "but", ["and"]], ["The bag is small ___ it is heavy.", "but", ["and"]], ["I wanted to play ___ it was raining.", "but", ["and"]], ["Dan is tall ___ his brother is short.", "but", ["and"]], ["I tried hard ___ I could not lift the rock.", "but", ["and"]]
  ].map(r => ["Which word fits best?<br><br><b>" + r[0] + "</b>", r[1], r[2]]), "Read both parts of the sentence. Are they alike, or is one a surprise?", "<b>And</b> adds one more idea. <b>But</b> shows a change, or something that is different.", "Example: <b>I like soup ___ I like bread.</b> That adds, so \"and\". <b>I like soup ___ it is too hot.</b> That is a change, so \"but\". Now do yours.");

  const PRON = statics([
    ["Mia has a cat. ___ is soft.", "It", ["They", "We"]], ["Sam is my brother. ___ is six.", "He", ["She", "They"]], ["The kids play. ___ are happy.", "They", ["He", "It"]], ["Mom bakes. ___ uses flour.", "She", ["He", "They"]],
    ["The ball is red. ___ rolls fast.", "It", ["They", "She"]], ["Dad and I ran. ___ were tired.", "We", ["He", "It"]], ["Ben and Mia swim. ___ like water.", "They", ["He", "It"]], ["Lily is funny. ___ makes us laugh.", "She", ["He", "They"]]
  ].map(r => ["Which pronoun fits the blank?<br><br><b>" + r[0] + "</b>", r[1], r[2]]), "A pronoun is a short word that takes the place of a name or a naming word.", "Who is the first sentence about? <b>He</b> = a boy or man. <b>She</b> = a girl or woman. <b>It</b> = a thing or animal. <b>They</b> = more than one. <b>We</b> = me and others.", "Example: <b>Tom is tall. ___ can reach the shelf.</b> Tom is a boy, so \"He\". Now do yours.");

  const DETAIL = statics([
    ["The dog ran.", "The big brown dog ran fast in the park.", ["The big dog ran."]], ["The bird sang.", "The little blue bird sang a happy song.", ["The bird sang a song."]],
    ["We ate lunch.", "We ate a yummy lunch under the tall tree.", ["We ate a yummy lunch."]], ["The cat sat.", "The fluffy gray cat sat on the soft rug.", ["The cat sat on the rug."]],
    ["I saw a bug.", "I saw a tiny green bug on a leaf.", ["I saw a green bug."]], ["Kids play.", "The happy kids play ball at the park.", ["The kids play ball."]],
    ["Rain fell.", "Cold rain fell on the roof all night.", ["Rain fell on the roof."]], ["A fish swims.", "A shiny orange fish swims in the clear pond.", ["A fish swims in the pond."]]
  ].map(r => ["Which sentence tells the <b>most</b> about the story?", r[1], [r[0], r[2][0]]]), "Details tell more: how big, what color, where, or how.", "Look for the sentence with the most describing words and places. It paints the best picture in your mind.", "Example: <b>The cat sat.</b> is short. <b>The fluffy white cat sat on the bed.</b> tells more because it says how the cat looks and where it sat. Now do yours.");

  // ---------- slides ----------
  const sl = {
    capStart: () => [T("Capital letters", "<b>T</b>he cat sat.", "Every sentence starts with a <b>capital</b> (big) letter. It tells the reader a new sentence is starting."), T("Small letters after", "<b>W</b>e <b>l</b>ike <b>t</b>o <b>p</b>lay.", "Only the first letter of the first word is big. The other words are small, unless they are names."), T("Tip", "☝️", "Put your finger at the start of the sentence. That first letter is the one that needs a capital.")],
    names: () => [T("Names are special", "👧 <b>M</b>ia &nbsp; 👦 <b>B</b>en", "Every person has a name. A name always starts with a <b>capital</b> letter, even in the middle of a sentence."), T("In a sentence", "Today <b>S</b>am has a kite.", "Sam is in the middle of the sentence, but it still starts with a capital S, because it is a name."), T("Pets too!", "🐶 <b>R</b>ex", "Names of pets are special names too, so they get a capital letter.")],
    I: () => [T("The word I", "<b>I</b> like cake.", "When you talk about yourself, you say <b>I</b>. The word I is always a capital letter, wherever it is in the sentence."), T("In the middle", "Dad and <b>I</b> went home.", "Even in the middle of a sentence, the word I stays big."), T("Tip", "☝️", "Only the single word I is always big. Other words like \"it\" and \"is\" stay small.")],
    days: () => [T("Days of the week", "<b>M</b>onday · <b>T</b>uesday · <b>W</b>ednesday", "The days of the week are special names, so they start with a <b>capital</b> letter."), T("All seven", "Thursday · Friday · Saturday · Sunday", "There are 7 days: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday and Sunday."), T("In a sentence", "We go to school on <b>M</b>onday.", "Even in the middle of a sentence, a day keeps its capital letter.")],
    caps: () => [T("Special words get capitals", "<b>B</b>en · <b>F</b>riday · <b>J</b>uly", "Names of people, days of the week and months of the year all start with a <b>capital</b> letter."), T("Months", "January · February · March · April · May · June", "The twelve months are special names too: they all start with a capital."), T("Check list", "✅", "Look at each word. Is it a name, a day or a month? Then it needs a capital.")],
    marks: () => [T("Marks at the end", "<b>.</b> &nbsp; <b>?</b> &nbsp; <b>!</b>", "Every sentence ends with a mark. The mark tells you what kind of sentence it is."), T("Telling and asking", "I see a cat<b>.</b> &nbsp; Do you see a cat<b>?</b>", "A telling sentence ends with a <b>period</b> (.). An asking sentence ends with a <b>question mark</b> (?)."), T("Big feelings", "Wow<b>!</b>", "A sentence with a big feeling, like surprise or excitement, can end with an <b>exclamation mark</b> (!).")],
    exc: () => [T("Exclamation mark", "Wow<b>!</b> &nbsp; Yay<b>!</b>", "An <b>exclamation mark</b> (!) shows a big feeling: surprise, joy, fear or a loud shout."), T("Compare", "The sun is up<b>.</b> &nbsp; The sun is up<b>!</b>", "A period is calm. An exclamation mark is excited. Think about how you would say it."), T("Use it carefully", "⭐", "Don't use too many! Save exclamation marks for the really big feelings.")],
    order: () => unSlides,
    nouns: () => [T("Naming words", "🐱 cat · 🏠 house · 👩 teacher", "A <b>noun</b> is a naming word. It names a person, a place, an animal or a thing."), T("Find the noun", "The <b>dog</b> sat on the <b>mat</b>.", "Dog and mat are nouns. They name an animal and a thing."), T("Tip", "👆", "If you can point to it or picture it in your mind, it is probably a noun.")],
    pth: () => [T("Four kinds of nouns", "👩 person · 🏫 place · 🐶 animal · ⚽ thing", "A noun names a <b>person</b>, a <b>place</b>, an <b>animal</b> or a <b>thing</b>."), T("Examples", "teacher · park · frog · cup", "Teacher is a person. Park is a place. Frog is an animal. Cup is a thing."), T("Tip", "🤔", "Ask: is it somebody? somewhere? a creature? or an object?")],
    verbs: () => [T("Action words", "🏃 run · 👏 clap · 🍽️ eat", "A <b>verb</b> is an action word. It tells what someone or something <b>does</b>."), T("Find the verb", "The dog <b>runs</b>.", "\"Runs\" is the action. It tells what the dog does."), T("Tip", "🎭", "Try to act it out! If you can do it, it is an action word.")],
    nv: () => [T("Noun or verb?", "🐸 frog (noun) · 🐸 hop (verb)", "A <b>noun</b> names something. A <b>verb</b> tells what someone does."), T("Test it", "the ___ &nbsp; / &nbsp; I can ___", "If \"the ___\" works, it is a noun. If \"I can ___\" works, it is a verb."), T("Tip", "🧪", "Try both tests on the word. One of them will fit.")],
    cloze: () => [T("Pick the right word", "The ___ is hot. → <b>sun</b>", "Read the sentence with the blank. Think about what word would make sense."), T("Try each one", "🤔", "Say the sentence with each choice. Only one sounds right."), T("Check", "✅", "Read the finished sentence. Does it make sense?")],
    whole: () => wholeSlides,
    pic: () => [T("A sentence about a picture", "🐶 → The dog barks.", "You can write a sentence to tell what you see in a picture."), T("Who? What?", "🐸 + jumps", "Look for <b>who or what</b> is in the picture. Then think about <b>what</b> they are doing."), T("Check the details", "👀", "Make sure every word in your sentence matches the picture.")],
    plS: () => [T("More than one", "🐱 → 🐱🐱", "<b>Singular</b> means one. <b>Plural</b> means more than one. One cat, two <b>cats</b>."), T("Add s", "dog → dog<b>s</b> &nbsp; hat → hat<b>s</b>", "For most words, add <b>s</b> at the end to make it plural."), T("Tip", "✅", "Add the s at the very end. Don't change the rest of the word.")],
    plES: () => [T("Words that need -es", "box → box<b>es</b> &nbsp; bus → bus<b>es</b>", "Words that end in <b>s, x, sh</b> or <b>ch</b> need <b>-es</b> for more than one."), T("Why?", "🗣️", "Try saying \"boxs\" out loud. It's hard! \"Boxes\" is easier to say."), T("Tip", "👀", "Look at the last letters of the word. If it ends in s, x, sh or ch, add es.")],
    plIES: () => [T("Words that end in y", "baby → bab<b>ies</b>", "If a word ends in a consonant and then <b>y</b>, change the y to <b>i</b> and add <b>-es</b>."), T("More examples", "puppy → puppies &nbsp; cherry → cherries", "Take off the y, put on ies. Puppy becomes puppies."), T("Tip", "🔤", "Check the letter just before the y. A consonant before y means ies.")],
    plIRR: () => [T("Special plurals", "man → <b>men</b> &nbsp; foot → <b>feet</b>", "A few words don't follow the rules. They change in a special way."), T("Learn these", "child → children · mouse → mice · tooth → teeth", "Man becomes men, woman becomes women, child becomes children, mouse becomes mice, tooth becomes teeth, foot becomes feet."), T("Tip", "🧠", "Don't add s! Just learn them. They are used a lot.")],
    adj: () => [T("Describing words", "a <b>big</b> dog &nbsp; a <b>red</b> hat", "A describing word (an <b>adjective</b>) tells more about a noun: how it looks, feels, tastes or sounds."), T("Find it", "The <b>tall</b> tree sways.", "\"Tall\" describes the tree. It tells us what kind of tree."), T("Tip", "🎨", "Describing words can tell color, size, shape or feeling.")],
    adjPick: () => [T("Pick a describing word", "The ice is ___. → <b>cold</b>", "Think about the thing. What is it like? Is it hot or cold? Soft or hard?"), T("Use what you know", "🧊 cold · ☀️ hot · 🪨 hard", "You already know a lot about the world. Use it to choose the right word."), T("Check", "✅", "Read the finished sentence. Is it true?")],
    an: () => [T("A or an", "<b>a</b> dog · <b>an</b> apple", "We use <b>a</b> and <b>an</b> before a noun. Which one depends on the next sound."), T("The rule", "an → a, e, i, o, u", "Use <b>an</b> when the next word starts with a <b>vowel</b> (a, e, i, o, u). Use <b>a</b> when it starts with a consonant."), T("Tip", "👀", "Look at the very next word, even if it is a describing word: <b>an</b> old hat, <b>a</b> big hat.")],
    isare: () => [T("Is, am, are", "The cat <b>is</b>. The cats <b>are</b>. I <b>am</b>.", "<b>Is</b> goes with one person or thing. <b>Are</b> goes with more than one. <b>Am</b> goes with I."), T("You and we", "You <b>are</b> kind. We <b>are</b> friends.", "\"You\" and \"we\" always go with <b>are</b>."), T("Tip", "1️⃣ 2️⃣", "Count: one or more than one? That picks is or are.")],
    wasWere: () => [T("Now and before", "is / are → now &nbsp; was / were → before", "Use <b>is, am, are</b> for now. Use <b>was</b> and <b>were</b> for things that already happened."), T("Was or were?", "The dog <b>was</b>. The dogs <b>were</b>.", "<b>Was</b> goes with one. <b>Were</b> goes with more than one, and with \"you\"."), T("Time clues", "yesterday · last night · now · today", "Words like <b>yesterday</b> and <b>last night</b> tell you it is the past.")],
    and: () => [T("Joining ideas", "I like cats <b>and</b> dogs.", "<b>And</b> joins ideas that go together. It adds one more."), T("But", "I like cats <b>but</b> not snakes.", "<b>But</b> joins ideas that are different. It shows a change."), T("Tip", "⚖️", "If the two parts are alike, use and. If one is a surprise, use but.")],
    qw: () => [T("Question words", "Who? What? Where? When?", "Questions often begin with a special word. It tells what kind of answer you want."), T("What each one asks", "👤 who · 📦 what · 📍 where · ⏰ when", "<b>Who</b> asks about a person. <b>What</b> asks about a thing. <b>Where</b> asks about a place. <b>When</b> asks about a time."), T("Tip", "❓", "Ask yourself: is the answer a person, a thing, a place, or a time?")],
    tell: () => [T("Telling or asking", "I like pizza<b>.</b> &nbsp; Do you like pizza<b>?</b>", "A <b>telling</b> sentence gives information. An <b>asking</b> sentence wants an answer."), T("The end mark", ". vs ?", "Telling sentences end with a period. Asking sentences end with a question mark."), T("Tip", "👂", "Does your voice go up at the end? It's probably a question!")],
    kinds: () => [T("Three kinds of sentences", "<b>.</b> statement &nbsp; <b>?</b> question &nbsp; <b>!</b> exclamation", "A <b>statement</b> tells something. A <b>question</b> asks something. An <b>exclamation</b> shows a strong feeling."), T("Examples", "It is sunny. &nbsp; Is it sunny? &nbsp; It is so sunny!", "Same words, different jobs. The end mark and the way you say it show the difference."), T("Tip", "🎤", "Read it out loud. How would you say it?")],
    fix: () => [T("Check your writing", "✏️ → 👀 → ✅", "After you write a sentence, check it carefully. Good writers always check."), T("Your checklist", "Capital? &nbsp; End mark? &nbsp; Names?", "Does it start with a capital letter? Do names, days and I have capitals? Does it end with the right mark?"), T("Fix one thing at a time", "🔧", "Look for each problem one at a time. That is how you catch them all.")],
    sense: () => [T("Sentences that make sense", "The dog eats. ✅ &nbsp; The eats dog. ❌", "A sentence must make sense. The words need to be in the right order, and the action must fit the doer."), T("Who does what?", "🐶 eats 🦴", "Dogs eat bones. Bones don't eat dogs! Think about who does the action."), T("Tip", "👂", "Read it out loud in your head. If it sounds silly, it is probably wrong.")],
    count: () => [T("Sentences in a row", "I run<b>.</b> I jump<b>.</b>", "Writing is made of sentences, one after another. Each one ends with a mark."), T("Count the marks", "I see a cat<b>.</b> It is big<b>.</b> → 2", "Each end mark ends one sentence. Count them to count the sentences."), T("Tip", "☝️", "A new sentence starts with a capital letter, too.")],
    pronoun: () => [T("Pronouns", "Mia → <b>she</b> &nbsp; the ball → <b>it</b>", "A <b>pronoun</b> takes the place of a name or a noun, so you don't have to say it again and again."), T("Pick the right one", "he · she · it · they · we", "<b>He</b> is a boy. <b>She</b> is a girl. <b>It</b> is a thing or animal. <b>They</b> is more than one. <b>We</b> includes you."), T("Example", "Ben is tall. <b>He</b> can reach the shelf.", "\"He\" takes the place of \"Ben\".")],
    past: () => [T("Past tense", "I walk → I walk<b>ed</b>", "To tell about something that already happened, we often add <b>-ed</b> to the verb."), T("Yesterday", "Yesterday I jumped.", "Time words like <b>yesterday</b> and <b>last week</b> tell you to use the past."), T("Tip", "⏮️", "Just add -ed to the end: play → played, look → looked.")],
    detail: () => [T("Add details", "The dog ran. → The big brown dog ran fast.", "Good writers add <b>details</b>: how it looks, where it is, how it moves."), T("Paint a picture", "🎨", "More details help the reader see what you see."), T("Tip", "🔎", "Ask: what color? how big? where? how?")]
  };
  const pastQ = () => {
    const bank = ["walk", "jump", "play", "look", "help", "paint", "cook", "kick", "wash", "pick", "climb", "talk", "want", "call", "open"];
    return () => {
      const w = pick(bank), ex = w === "play" ? "jump" : "play";
      return { text: `Yesterday, we ___ (${w}).`, choices: shuf([w + "ed", w, w + "ing"]), answer: w + "ed",
        hints: ["Yesterday means it already happened. That is the past.", "To show the past for many verbs, add <b>-ed</b> at the end.", `Example: Yesterday, we ${ex}ed. ${ex} + ed = ${ex}ed. Now do yours.`] };
    };
  };

  // ---------- lessons ----------
  const A1 = mkL("Start with a capital", capStart(), sl.capStart());
  const A2 = mkL("Names need capitals", nameQ(), sl.names());
  const A3 = mkL("The word I", iQ(), sl.I());
  const A4 = mkL("Days need capitals", dayQ(), sl.days());
  const A5 = mkL("Period or question mark?", markRows(MK12.filter(r => r[1] !== "exclamation mark"), ["period", "question mark"]), sl.marks());
  const A6 = mkL("Exclamation marks", markRows(EXC, marks3), sl.exc());
  const A7 = mkL("Words in order", unscramble(UN[1]), sl.order());
  const A8 = mkL("Naming words", nounQ(), sl.nouns());
  const A9 = mkL("Person, place, animal, thing", pthQ, sl.pth());
  const A10 = mkL("Action words", verbQ(), sl.verbs());
  const A11 = mkL("Pick the right word", CLOZE1, sl.cloze());
  const A12 = mkL("Whole sentence or not?", wholeQ(CF1, FR1, true), sl.whole());
  const A13 = mkL("Sentence for the picture", picQ(PICS1), sl.pic());
  const A14 = mkL("One and many", plS, sl.plS());
  const A15 = mkL("Naming or action word?", nvQ1, sl.nv());
  const A16 = mkL("Count the sentences", countSent(), sl.count());
  const A17 = mkL("Telling or asking?", TELL, sl.tell());
  const A18 = mkL("Does it make sense?", MAKES, sl.sense());

  const B1 = mkL("What needs fixing?", FIX, sl.fix());
  const B2 = mkL("Ending marks", markRows(MK12.concat(EXC.slice(0, 5)), marks3), sl.marks());
  const B3 = mkL("Question words", QW, sl.qw());
  const B4 = mkL("Complete sentences", wholeQ(CF2, FR2, false), sl.whole());
  const B5 = mkL("Find the noun", wordPick(NOUNROWS2, "Which word is a <b>noun</b> (a naming word)?", "A noun names a person, a place, an animal or a thing.", "Look for the word you could draw a picture of. The other words are action or small helper words.", "Example: <b>The bird sings.</b> The noun is <b>bird</b>, because it names an animal. Now find yours.", false), sl.nouns());
  const B6 = mkL("Find the verb", wordPick(VERBROWS2, "Which word is the <b>verb</b> (the action word)?", "A verb tells what someone or something does.", "Ask: what is happening? What are they doing? That word is the verb.", "Example: <b>The bird sings.</b> What does the bird do? It <b>sings</b>. Now find yours.", false), sl.verbs());
  const B7 = mkL("Noun or verb?", nvQ2, sl.nv());
  const B8 = mkL("Plurals with s or es", plMixF(), sl.plES());
  const B9 = mkL("Find the describing word", wordPick(ADJROWS2, "Which word <b>describes</b> something?", "A describing word tells more about a noun, like how it looks or feels.", "Look for a color, a size or a feeling word. It sits next to the noun it describes.", "Example: <b>The fluffy cat naps.</b> \"Fluffy\" tells what kind of cat. Now find yours.", false), sl.adj());
  const B10 = mkL("Pick the describing word", ADJCLOZE, sl.adjPick());
  const B11 = mkL("A or an?", anQ(), sl.an());
  const B12 = mkL("Unscramble the sentence", unscramble(UN[2]), sl.order());
  const B13 = mkL("Sentence for the picture 2", picQ(PICS2), sl.pic());
  const B14 = mkL("Who or what is it about?", wordPick(SUBJROWS2, "Which word tells <b>who or what</b> the sentence is about?", "Every sentence is about someone or something. That is the naming part.", "Ask: who or what is doing the action? That is the naming part of the sentence.", "Example: <b>The bird sings.</b> Who sings? The <b>bird</b>. So \"bird\" is who it is about. Now find yours.", false), sl.nouns());
  const B15 = mkL("Is, am or are?", ISARE, sl.isare());
  const B16 = mkL("Capitals for special words", capMulti(CAPROWS2), sl.caps());
  const B17 = mkL("And or but?", AND2, sl.and());
  const KIND2 = statics([
    ["The cat is on the bed.", "telling", ["asking", "showing a big feeling"]], ["I have a new hat.", "telling", ["asking", "showing a big feeling"]], ["We play at the park.", "telling", ["asking", "showing a big feeling"]],
    ["Is the cat on the bed?", "asking", ["telling", "showing a big feeling"]], ["Do you have a hat?", "asking", ["telling", "showing a big feeling"]], ["Can we play at the park?", "asking", ["telling", "showing a big feeling"]],
    ["I won the race!", "showing a big feeling", ["telling", "asking"]], ["What a big dog!", "showing a big feeling", ["telling", "asking"]], ["Look at that rocket!", "showing a big feeling", ["telling", "asking"]]
  ].map(r => ["Is this sentence telling, asking, or showing a big feeling?<br><br><b>" + r[0] + "</b>", r[1], r[2]]), "Read the sentence and look at the mark at the end.", "A period (.) is for telling. A question mark (?) is for asking. An exclamation mark (!) shows a big feeling.", "Example: <b>Is it snowing?</b> asks. <b>It is snowing.</b> tells. <b>It is snowing!</b> shows a big feeling. Now do yours.");
  const B18 = mkL("Telling, asking or shouting?", KIND2, sl.kinds());

  const C1 = mkL("Capitals review", capMulti(CAPROWS3), sl.caps());
  const C2 = mkL("Ending marks review", markRows(MK3, marks3), sl.marks());
  const C3 = mkL("Statement, question, exclamation", KIND3, sl.kinds());
  const C4 = mkL("Complete sentences 2", wholeQ(CF3, FR3, false), sl.whole());
  const C5 = mkL("Nouns in sentences", wordPick([["The happy kitten naps.", "kitten"], ["A shiny coin fell.", "coin"], ["Soft snow falls quietly.", "snow"], ["The tiny ant walks slowly.", "ant"], ["We ate a juicy peach.", "peach"], ["The loud drum boomed.", "drum"], ["A cold wind blew.", "wind"], ["The sleepy baby yawned.", "baby"]],
    "Which word is a <b>noun</b>?", "A noun names a person, a place, an animal or a thing.", "Skip the describing words and the action words. Which word names something?", "Example: <b>The silly clown laughed.</b> The noun is <b>clown</b>, a person. Now find yours.", false), sl.nouns());
  const C6 = mkL("Verbs in sentences", wordPick([["The girl climbed a tree.", "climbed"], ["Birds build nests.", "build"], ["The wind blows hard.", "blows"], ["We painted the fence.", "painted"], ["Dad cooks dinner.", "cooks"], ["The dog digs a hole.", "digs"], ["Kids splash in puddles.", "splash"], ["She waves at us.", "waves"]],
    "Which word is the <b>verb</b>?", "A verb tells what someone or something does.", "Ask: what is the action? What happened or is happening?", "Example: <b>The boy kicked the ball.</b> The action is <b>kicked</b>. Now find yours.", false), sl.verbs());
  const C7 = mkL("Past tense with -ed", pastQ(), sl.past());
  const C8 = mkL("Plurals: es and ies", () => pick([plES, plIES])(), sl.plIES());
  const C9 = mkL("Special plurals", plIRR, sl.plIRR());
  const C10 = mkL("Adjectives in sentences", wordPick([["A sparkly star shines.", "sparkly"], ["The fluffy cat purrs.", "fluffy"], ["We saw a huge whale.", "huge"], ["Mom made warm soup.", "warm"], ["A bumpy road winds.", "bumpy"], ["The sour lemon made me smile.", "sour"], ["Quiet mice hid.", "Quiet"], ["The brave firefighter climbed.", "brave"]],
    "Which word is the <b>adjective</b> (describing word)?", "An adjective tells more about a noun: what kind, what color, how big.", "Find the noun first. Then look for the word right before it that tells more about it.", "Example: <b>A tiny frog hopped.</b> \"Tiny\" tells what kind of frog. Now find yours.", false), sl.adj());
  const C11 = mkL("Best describing word", ADJ3, sl.adjPick());
  const C12 = mkL("A or an? (with adjectives)", anAdjQ(), sl.an());
  const C13 = mkL("And or but?", AND3, sl.and());
  const C14 = mkL("Unscramble longer sentences", unscramble(UN[3]), sl.order());
  const C15 = mkL("Sentence for the picture 3", picQ(PICS3), sl.pic());
  const C16 = mkL("Is, are, was or were?", WASWERE, sl.wasWere());
  const C17 = mkL("Pronouns", PRON, sl.pronoun());
  const C18 = mkL("Add more detail", DETAIL, sl.detail());

  return {
    1: [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18,
      MIX("Mixed practice", A1, A5, A8, A14), MIX("Level 1 Challenge", A2, A7, A10, A12, A17, A18)],
    2: [B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17, B18,
      MIX("Mixed practice", B1, B5, B8, B11), MIX("Level 2 Challenge", B3, B6, B9, B12, B15, B17)],
    3: [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, C17, C18,
      MIX("Mixed practice", C1, C5, C8, C12), MIX("Level 3 Challenge", C3, C6, C9, C13, C16, C17)]
  };
})();
