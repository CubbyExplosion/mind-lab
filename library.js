// Mind Lab Library & Research. Levels 1-3, 20 lessons each.
const LIBRARY_LEVELS = (() => {
  const S = (a, n) => shuf(a).slice(0, n);
  const lead = s => String(s).replace(/<[^>]+>/g, "").replace(/^[^A-Za-z0-9]+/, "")[0].toUpperCase();

  // pairs lesson: rows are "term::description::emoji"
  const PL = (title, v, intro, tip, rows, o = {}) => {
    const pairs = rows.map(r => { const [t, d, e] = r.split("::"); return { t, d, e }; });
    const make = () => {
      const cur = pick(pairs), rest = pairs.filter(x => x !== cur), ex = pick(rest);
      const exh = `Example: "${ex.t}" goes with "${ex.d}". Now do yours.`;
      if (Math.random() < 0.5) return {
        text: `${o.qd || "Which word fits?"}<br><b>${cur.d}</b>`, visual: cur.e, choices: shuf([cur.t, ...S(rest, 2).map(x => x.t)]), answer: cur.t,
        hints: ["Think back to the lesson. Which word fits this?", `The answer starts with "${lead(cur.t)}".`, exh]
      };
      return {
        text: `${o.qt || "What does this mean?"}<br><b>${cur.t}</b>`, visual: cur.e, choices: shuf([cur.d, ...S(rest, 2).map(x => x.d)]), answer: cur.d,
        hints: ["Think back to the lesson. What did you learn about this word?", `The right answer starts with "${lead(cur.d)}".`, exh]
      };
    };
    make.teach = () => [
      { h: title, v, t: intro },
      { h: "Remember these", v: pairs.map(p => `${p.e ? p.e + " " : ""}<b>${p.t}</b>: ${p.d}`).join("<br>"), t: "Read each one slowly, out loud." },
      { h: "Tip", v: "💡", t: tip }
    ];
    return { title, make };
  };
  // scenario lesson: rows are "question|right|wrong|wrong(|wrong)"
  const SC = (title, v, intro, clue, example, rows) => {
    const items = rows.map(r => r.split("|"));
    const make = () => {
      const [q, a, ...ws] = pick(items);
      return { text: q, choices: shuf([a, ...S(ws, 2)]), answer: a, hints: ["Read every choice slowly and picture it.", clue, `Example: ${example} Now do yours.`] };
    };
    make.teach = () => [{ h: title, v, t: intro }, { h: "Think about it", v: "🤔", t: clue }, { h: "Example", v: "✨", t: example }];
    return { title, make };
  };
  const lvl = (n, ls) => {
    const ms = ls.map(l => l.make);
    const mix = (title, arr) => {
      const f = () => pick(arr)();
      const step = Math.ceil(arr.length / 4);
      f.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here is a quick reminder of some of them, then the quiz." }, ...arr.filter((_, i) => i % step === 0).slice(0, 4).map(m => m.teach()[1])];
      return { title, make: f };
    };
    return [...ls, mix("Mixed practice", [ms[1], ms[2], ms[5], ms[6], ms[14]]), mix(`Level ${n} Challenge`, ms)];
  };

  // ---------- custom makers ----------
  const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const abcNext = () => {
    const make = () => {
      const i = ri(1, 23), ans = ALPHA[i + 1], ex = pick(["F", "M", "R", "D"].filter(x => x !== ALPHA[i] && x !== ans));
      const wr = S(ALPHA.filter(x => x !== ans), 2);
      return {
        text: `Which letter comes next in ABC order?<br><b>${ALPHA[i - 1]} ${ALPHA[i]} ?</b>`, choices: shuf([ans, ...wr]), answer: ans,
        hints: ["Sing the alphabet song in your head.", `Find ${ALPHA[i]} in the song. Your answer is the very next letter after it.`, `Example: after ${ex} in the alphabet comes ${ALPHA[ALPHA.indexOf(ex) + 1]}. Now do yours.`]
      };
    };
    make.teach = () => [
      { h: "The alphabet in order", v: "A B C D E F G ...", t: "ABC order means the alphabet order: A first, then B, then C, and so on up to Z." },
      { h: "What comes next?", v: "A B ? → C", t: "To find the next letter, sing the alphabet song and stop at the letter you know." },
      { h: "Tip", v: "🎵", t: "The alphabet song helps you find letters in order." }
    ];
    return { title: "What letter is next?", make };
  };
  const FIRSTW = ["apple", "banana", "cat", "dog", "egg", "fish", "goat", "hat", "jam", "kite", "lion", "moon", "nest", "owl", "pig", "rain", "sun", "tree", "van", "zebra"];
  const abcFirst = () => {
    const make = () => {
      const ws = S(FIRSTW, 3), ans = ws.slice().sort()[0];
      return {
        text: "Which word comes first in ABC order?", choices: shuf(ws), answer: ans,
        hints: ["Words in ABC order go by their first letter, like the alphabet.", `Look at the first letters: ${shuf(ws.map(w => w[0].toUpperCase())).join(", ")}. Which is earliest in the alphabet?`, "Example: ant comes before bee because A comes before B. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Books in ABC order", v: "ant · bee · cat", t: "Libraries and dictionaries put things in ABC order. Words go by their first letter." },
      { h: "Which comes first?", v: "dog → egg → fish", t: "D comes before E, and E comes before F. So dog comes first." },
      { h: "Tip", v: "🔤", t: "Say the first letter of each word, then think of the alphabet song." }
    ];
    return { title: "Which word is first?", make };
  };
  const GROUPS = [["cat", "cow", "cup", "cot"], ["bat", "bed", "bug", "bib"], ["sad", "sit", "sun", "sock"], ["pan", "pen", "pig", "pup"], ["hat", "hen", "hug", "hip"], ["den", "dig", "dog", "dug"]];
  const abc2 = () => {
    const make = () => {
      const ws = S(pick(GROUPS), 3), ans = ws.slice().sort()[0];
      return {
        text: "These words start with the same letter. Which one comes first in ABC order?", choices: shuf(ws), answer: ans,
        hints: ["When the first letters match, look at the second letter.", `The second letters are: ${shuf(ws.map(w => w[1])).join(", ")}. Which one is earliest in the alphabet?`, "Example: bag comes before bus, because the second letters are a and u, and a comes before u. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Same first letter", v: "cat · cow · cup", t: "Sometimes words start with the same letter. Then you look at the <b>second</b> letter." },
      { h: "Use the second letter", v: "ca · co · cu", t: "A comes before O, and O comes before U. So cat, cow, cup is the right order." },
      { h: "Tip", v: "👀", t: "Cover the first letter and look at the next one." }
    ];
    return { title: "Same first letter", make };
  };
  const CH = ["The Big Storm", "A New Friend", "The Lost Key", "The Secret Door", "Under the Sea", "The Race", "A Surprise", "Home at Last"];
  const tocQ = () => {
    const make = () => {
      const ts = S(CH, 4); let p = ri(1, 3); const pages = ts.map(() => (p += ri(4, 12)));
      const k = ri(0, 3);
      const list = ts.map((t, i) => `Chapter ${i + 1}: ${t} ...... ${pages[i]}`).join("<br>");
      return {
        text: `<b>Table of Contents</b><br>${list}<br><br>On which page does "${ts[k]}" begin?`, answer: pages[k],
        hints: ["A table of contents lists the chapters and the page where each one starts.", "Find the chapter name in the list. Its page number is at the end of the same line.", "Example: if the line says 'The Zoo ...... 99', that chapter begins on page 99. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Table of contents", v: "📑", t: "The table of contents is near the front of a book. It lists each chapter and the page where it starts." },
      { h: "How to use it", v: "Chapter 1: The Zoo ...... 5", t: "Find the chapter name, then read the page number at the end of the line. Turn to that page!" },
      { h: "Tip", v: "💡", t: "The numbers go up as you go down the list, because chapters come in order." }
    ];
    return { title: "Use the table of contents", make };
  };
  const TOP = ["ants", "bears", "cats", "dogs", "eagles", "frogs", "horses", "insects", "owls", "whales"];
  const indexQ = () => {
    const make = () => {
      const ts = S(TOP, 4).sort(); const pages = S(Array.from({ length: 38 }, (_, i) => i + 3), 4);
      const k = ri(0, 3);
      return {
        text: `<b>Index</b><br>${ts.map((t, i) => `${t}, ${pages[i]}`).join("<br>")}<br><br>On which page can you read about <b>${ts[k]}</b>?`, answer: pages[k],
        hints: ["An index lists topics in ABC order, with the page numbers where you can find them.", "Find the topic in the list. The page number is right after the topic.", "Example: if the index says 'zebras, 99', you turn to page 99 to read about zebras. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "The index", v: "📖", t: "The index is at the back of a book. It lists topics in ABC order with the page numbers where you can read about them." },
      { h: "How to use it", v: "bears, 12", t: "Find your topic in ABC order. The number tells you which page to open." },
      { h: "Tip", v: "💡", t: "Use the index when you want just one fact, not the whole book." }
    ];
    return { title: "Use the index", make };
  };

  // ================= LEVEL 1 =================
  const L1 = [
    SC("What is a library?", "📚", "A library is a place with lots of books. You can read them there or borrow them and take them home. A librarian helps you find books.", "Think: what do you find in a library, and who helps you?", "At the library you can borrow a book, read it at home and bring it back.", [
      "What do you find in a library?|Lots of books|Only toys|Only shoes",
      "Who helps you in a library?|A librarian|A baker|A plumber",
      "What can you do with a library book?|Borrow it and bring it back|Keep it forever|Throw it away",
      "How do we talk in a library?|With quiet voices|By yelling|By screaming",
      "Is a library a good place to learn?|Yes|No|Only on Mondays",
      "Do you have to pay to read books at most public libraries?|No, it is usually free|Yes, always a lot|Only with gold",
      "Where do library books sit?|On shelves|In the fridge|In a tree"
    ]),
    PL("Parts of a book", "📖", "Every book has parts. Learn their names so you can talk about books like a pro.", "Pick up a book and point to each part.", [
      "cover::the front of the book, with a picture::📕", "title::the name of the book::🏷️", "author::the person who wrote the words::✍️", "illustrator::the person who drew the pictures::🎨", "pages::the sheets you turn::📄", "spine::the edge you see on the shelf::📚"
    ], { qd: "Which part of a book is this?", qt: "What is this part of a book?" }),
    PL("Who makes a book?", "🧑‍🎨", "Many people help make a book. The author writes the words, and the illustrator draws the pictures.", "Author starts with 'A' for 'words' (author writes). Illustrator draws the pictures.", [
      "author::the person who writes the words::✍️", "illustrator::the person who draws the pictures::🎨", "reader::the person who reads the book::👧", "librarian::the helper who looks after the library::🧑‍🏫"
    ], { qd: "Who is this?", qt: "What does this person do?" }),
    SC("Take care of books", "🧼", "Books are for sharing. We keep them clean and careful so others can enjoy them, too.", "A kind reader treats a book gently. Think about clean hands, gentle pages, and a safe place.", "Use a bookmark to keep your place instead of bending the page.", [
      "How do you turn the pages?|Gently|By ripping|By pulling hard",
      "What can you use to keep your place?|A bookmark|A bent corner|A pencil mark",
      "Before you read, your hands should be...|Clean|Sticky|Muddy",
      "Where should you put your book after reading?|Somewhere safe|In a puddle|On the floor",
      "Should you draw in a library book?|No|Yes|Only in red",
      "What do you do if a page tears?|Tell a grown-up or the librarian|Hide it|Rip more",
      "Should you eat messy food while reading a book?|No, it can make a mess|Yes, always|Yes, pizza"
    ]),
    SC("Library rules", "🤫", "Libraries have rules so everyone can read and enjoy. We use quiet voices, walking feet and kind words.", "Think of quiet voices, walking feet, and sharing. Choose the kind choice.", "In the library, we whisper so others can read.", [
      "In the library we use...|Quiet voices|Loud voices|Shouting",
      "In the library we...|Walk|Run|Jump",
      "Someone else wants the book you are done with. You...|Share it|Hide it|Rip it",
      "You are done reading a book. You put it...|Back where it belongs|Under a table|In your pocket",
      "If you need help, you...|Ask kindly|Yell|Cry loudly",
      "What do you do when you hear someone reading?|Stay quiet|Sing|Shout",
      "Library books are for...|Everyone to share|Only one person|Nobody"
    ]),
    PL("Borrowing books", "💳", "You can borrow books with a library card. You must bring them back on time so others can read them, too.", "Return books by the due date. That is kind to the next reader.", [
      "library card::lets you borrow books::💳", "check out::to borrow a book::📤", "return::to bring a book back::📥", "due date::the day to bring a book back::📅", "shelf::where books sit in a row::📚"
    ], { qd: "Which word fits?", qt: "What does this mean?" }),
    PL("Story or facts?", "📘", "Some books tell made-up stories. Others tell true facts.", "Fiction = made up. Nonfiction = true.", [
      "fiction::a made-up story::🧚", "nonfiction::a book with true facts::🔬", "picture book::a book with lots of pictures::🖼️", "chapter book::a longer book split into chapters::📗"
    ], { qd: "Which kind of book is this?", qt: "What kind of book is this?" }),
    SC("Fiction or nonfiction?", "🔎", "Fiction books have made-up stories, like a dragon that bakes cakes. Nonfiction books tell true facts, like how bees make honey.", "Ask: could this really happen and is it a true fact? Then it is nonfiction.", "A book about a talking tree is made up, so it is fiction.", [
      "A book about a talking dragon who bakes cakes|Fiction|Nonfiction",
      "A book with true facts about bees|Nonfiction|Fiction",
      "A fairy tale about a magic castle|Fiction|Nonfiction",
      "A book that shows how to plant a seed|Nonfiction|Fiction",
      "A story about a bunny that rides a rocket|Fiction|Nonfiction",
      "A book with facts about the planets|Nonfiction|Fiction",
      "A funny story about a cat who talks|Fiction|Nonfiction",
      "A book about how a caterpillar becomes a butterfly|Nonfiction|Fiction"
    ]),
    SC("Cover clues", "🖼️", "The cover can tell you what a book is about. Look at the picture and the title for clues.", "Look at the cover pictures and think about what the book is about.", "A cover with fish and waves is probably about the sea.", [
      "A cover shows 🐶🦴. The book is probably about...|A dog|A boat|A cake",
      "A cover shows 🚀🌙. The book is probably about...|Space|Farms|Pizza",
      "A cover shows 🐟🌊. The book is probably about...|The sea|The desert|A castle",
      "A cover shows 🎂🎈. The book is probably about...|A birthday|Winter|A bus",
      "A cover shows 🚜🐄. The book is probably about...|A farm|Space|A pool",
      "A cover shows ⛄❄️. The book is probably about...|Winter|Summer|A beach",
      "A cover shows 🦁🐘. The book is probably about...|Zoo animals|A kitchen|A bike"
    ]),
    abcNext(),
    abcFirst(),
    SC("Ask the librarian", "🙋", "The librarian knows where everything is. You can ask for help finding a book. Use a quiet voice and polite words.", "Politely ask, and say thank you. Librarians love to help!", "I might say: 'Excuse me, can you help me find a book about dogs?'", [
      "You cannot find a book. What do you do?|Ask the librarian politely|Yell|Leave crying",
      "Which is a polite way to ask?|Excuse me, can you help me?|Give me a book!|Hey you!",
      "After the librarian helps you, you say...|Thank you|Nothing|Bye, grumpy",
      "Who knows where the books are?|The librarian|The pencil|The door",
      "You want a book about frogs. You say...|Can you help me find a book about frogs?|I hate this place|Where is the pizza?",
      "Is it okay to ask a librarian questions?|Yes, they love to help|No|Only on Mondays"
    ]),
    SC("Pick a book you love", "❤️", "Pick a book about something you like. Look at the cover, read a few words, and see if it feels fun to read.", "Think: do I like the topic? Can I read the words? Does it look fun?", "If you love space, you might pick a book about planets.", [
      "How can you choose a good book?|Look at the cover and read a few words|Pick the biggest one|Pick one without looking",
      "You love animals. Which book might you pick?|A book about animals|A book about taxes|A book about tires",
      "If the words are too hard, you might...|Pick an easier book|Quit reading forever|Rip the book",
      "A good book for you is one that is...|Fun and just right|Boring and too hard|Wet",
      "You like trains. Which cover would you pick?|A train|A sandwich|A hat",
      "It is okay to ask for help choosing a book.|True|False|Only for grown-ups"
    ]),
    SC("How to read a book", "👀", "We hold a book the right way up. We start at the front. We read from the top to the bottom, and from the left to the right.", "Start at the front, read left to right, and turn pages gently.", "I open the cover and begin on the first page.", [
      "Where do you start a book?|At the front|At the back|In the middle",
      "Which way do we read words?|Left to right|Right to left|Up and down only",
      "A book is the right way up when...|The words are not upside down|The cover faces the floor|It is on your head",
      "How do you turn a page?|Gently, from the edge|Rip it|Fold it",
      "When you finish one line of words, you go...|To the next line down|Back to the start of the book|To the title",
      "A picture helps you...|Understand the story|Lose your place|Forget"
    ]),
    PL("Picture dictionary", "📕", "A dictionary tells you what words mean. A picture dictionary has pictures to help.", "When you see a new word, find it in a dictionary.", [
      "dictionary::a book that tells what words mean::📘", "picture dictionary::a dictionary with pictures::🖼️", "word::letters that mean something::🔤", "alphabet::the letters from A to Z::🔠"
    ], { qd: "Which word fits?", qt: "What does this mean?" }),
    PL("Question words", "❓", "Good questions begin with a question word. They help you find facts.", "Use who, what, where, when and why when you want to learn something.", [
      "who::asks about a person::🧑", "what::asks about a thing::📦", "where::asks about a place::📍", "when::asks about time::⏰", "why::asks for a reason::💭"
    ], { qd: "Which question word fits?", qt: "What does this question word ask about?" }),
    SC("Find a fact", "🔍", "A fact is something that is true. You can find facts in nonfiction books.", "Facts are true. Look for the sentence that is true.", "A fact is: 'A dog has four legs.'", [
      "Which one is a fact?|A cat is an animal|Cats can fly|Cats are made of cheese",
      "Which one is a fact?|The sun is hot|The sun is cold|The sun is a cookie",
      "Which one is a fact?|A fish lives in water|A fish lives in a tree|A fish plays the drum",
      "Which one is a fact?|Birds have feathers|Birds have fur|Birds have wheels",
      "Where could you look to learn about whales?|A nonfiction book about whales|A fairy tale|A cartoon",
      "Which one is a fact?|Ice is cold|Ice is hot|Ice is a banana"
    ]),
    SC("Be safe online", "🛡️", "Some libraries have computers. A grown-up should help when you use one. Never type your name, address, school or phone number online.", "Keep personal things private. Ask a grown-up first.", "If a website asks for my address, I stop and tell a grown-up.", [
      "Before you use a library computer, you should...|Ask a grown-up|Type secrets|Click everything",
      "A website asks for your home address. You...|Stop and tell a grown-up|Type it in|Share it with friends",
      "Which is private?|Your home address|Your favorite color|Your favorite animal",
      "Someone online asks to meet you. You...|Tell a grown-up right away|Say yes|Keep it a secret",
      "Is it okay to type your phone number into a website?|No, ask a grown-up first|Yes|Only on Fridays",
      "Who can help you use the internet safely?|A grown-up|A stranger|Nobody"
    ])
  ];

  // ================= LEVEL 2 =================
  const L2 = [
    SC("Cover clues, part two", "🖼️", "The title and the cover picture give hints about the story or the facts inside.", "Use both the picture and the title. They work together.", "A title like 'My Pet Puppy' and a cover with a puppy shows the book is about a puppy.", [
      "The title is 'The Moon Trip'. The book may be about...|Going to the moon|A kitchen|A pet cat",
      "The title is 'Bees and Honey'. The book may be about...|Bees|Trucks|Hats",
      "A cover shows a dinosaur. The book may be about...|Dinosaurs|Ocean fish|Spoons",
      "The title is 'My Birthday'. The book may be about...|A birthday|A storm|A snow day",
      "A cover shows planets and stars. The book may be about...|Space|Farm animals|Shoes",
      "Why do we read the title?|It tells what the book is about|It is decoration|It is a secret",
      "A cover shows a garden and flowers. The book may be about...|Plants|Cars|Planes"
    ]),
    PL("More parts of a book", "📖", "There are more parts of a book to learn.", "Look inside a real book and find these parts.", [
      "title page::the page with the title and the author's name::📄", "back cover::the back of the book::📕", "page number::tells you which page you are on::🔢", "chapter::a part of a longer book::📑", "spine::the edge you see on the shelf::📚"
    ], { qd: "Which part is this?", qt: "What does this part do?" }),
    SC("Author or illustrator?", "🎨", "An author writes the words. An illustrator makes the pictures. Sometimes one person does both!", "Words means author. Pictures means illustrator.", "A person who paints the pictures in a book is the illustrator.", [
      "Who writes the words in a book?|The author|The illustrator|The mailman",
      "Who draws the pictures in a book?|The illustrator|The author|The baker",
      "Who wrote the story?|The author|The illustrator|The reader",
      "Who painted the pictures?|The illustrator|The author|The librarian",
      "Can one person be author and illustrator?|Yes|No|Never",
      "A person who writes a book is called...|An author|A painter only|A shelf",
      "A person who draws a book's pictures is called...|An illustrator|A librarian|A reader"
    ]),
    PL("Parts of a story", "📖", "Stories have characters, a setting, a problem and an ending.", "Ask yourself: who, where, what went wrong, and how did it end?", [
      "character::a person or animal in a story::🧒", "setting::where and when a story happens::🏞️", "problem::something hard in a story::😟", "ending::the last part of a story::🏁"
    ], { qd: "Which story part is this?", qt: "What is this story part?" }),
    PL("Fact book words", "🔬", "Nonfiction books have special parts that help you find facts.", "Look at the headings, photos, and labels when you read nonfiction.", [
      "fact::something that is true::✅", "photo::a real picture taken with a camera::📷", "label::a word that names a part of a picture::🏷️", "heading::big words that name a section::🔠"
    ], { qd: "Which word fits?", qt: "What does this mean?" }),
    SC("Fiction or nonfiction?", "🔎", "Fiction is made up. Nonfiction is true. Think about what the book is really about.", "If it has pretend characters and magic, it is fiction. If it tells true facts, it is nonfiction.", "A book about a real rainforest is nonfiction, but a book about a talking tree is fiction.", [
      "A book about a princess and a dragon|Fiction|Nonfiction",
      "A book about how volcanoes work|Nonfiction|Fiction",
      "A funny story about a robot who learns to dance|Fiction|Nonfiction",
      "A book that explains how plants grow|Nonfiction|Fiction",
      "A tale about a mouse who goes to the moon|Fiction|Nonfiction",
      "A book with photos of real sharks|Nonfiction|Fiction",
      "A story about a unicorn who sings|Fiction|Nonfiction",
      "A book that explains the water cycle|Nonfiction|Fiction"
    ]),
    PL("Kinds of books", "📚", "There are many kinds of books. Each kind helps you in a different way.", "Pick the kind of book that fits what you want to do or learn.", [
      "fairy tale::a story with magic, like dragons or castles::🧚", "poem::words that often rhyme::🎵", "atlas::a book of maps::🗺️", "dictionary::a book that tells what words mean::📘", "comic::a story told in boxes with speech bubbles::💬"
    ], { qd: "Which kind of book is this?", qt: "What is this kind of book?" }),
    abcNext(), abcFirst(),
    SC("Find the shelf", "🗂️", "Story books are often in ABC order by the author's last name. Fact books are put together by topic, so all the animal books are close together.", "Look at the sign, the letter, or the topic on the shelf.", "To find a story by an author named Smith, look at the S shelf.", [
      "Story books are often in ABC order by the author's...|Last name|Shoe size|Favorite color",
      "Fact books about animals are...|Together on the same shelves|Spread all over the building|In a drawer",
      "To find a book by an author named Brown, look under...|B|Z|M",
      "To find a book by an author named Young, look under...|Y|A|C",
      "Where do you find books about space?|With other space books|In the story shelves only|In the sink",
      "A sign on a shelf helps you...|Know what is there|Make noise|Hide a book",
      "To find a book by an author named Lopez, look under...|L|P|X"
    ]),
    PL("Library computer", "💻", "Many libraries have a computer catalog that tells you which books they have and where to find them.", "Ask a librarian for help the first time you use the catalog.", [
      "catalog::a list of all the books in the library::💻", "search::to look for something::🔍", "title::the name of a book::🏷️", "author::the person who wrote the book::✍️", "topic::what a book is about::💡"
    ], { qd: "Which word fits?", qt: "What does this mean?" }),
    SC("Borrow and return", "📅", "When you borrow a book you must bring it back on time. If you need more time, you can ask the librarian.", "A due date is the day to return the book. Be kind to the next reader.", "I borrowed a book on Monday. It is due next week, so I bring it back by then.", [
      "A due date tells you...|When to bring the book back|When to eat|When to sleep",
      "If you borrow a book you must...|Bring it back|Keep it forever|Give it away",
      "If you lose a library book, you should...|Tell the librarian|Hide it|Blame a friend",
      "You need more time to read. You can...|Ask the librarian|Hide the book|Throw it",
      "Returning on time is...|Kind to the next reader|Not important|Silly",
      "A library card is used to...|Borrow books|Buy toys|Play cards"
    ]),
    SC("Library manners", "🤫", "Be quiet, be kind and share. Pick books up gently. Wait your turn.", "Choose the choice that is calm, kind and fair.", "I wait in line and say please when it is my turn.", [
      "Someone is reading near you. You...|Use a quiet voice|Shout|Dance loudly",
      "There is a line to check out books. You...|Wait your turn|Cut in line|Push",
      "You see a book on the floor. You...|Pick it up and put it back|Kick it|Hide it",
      "You want a book someone else is holding. You...|Wait or ask politely|Grab it|Complain loudly",
      "In the library, running is...|Not safe, so we walk|Fun|Required",
      "If you finish reading at a table, you should...|Put the book back|Leave a mess|Pile all the books"
    ]),
    SC("Just right books", "📏", "A just right book has words you can mostly read. If many words are too hard, pick an easier book first. If every word is easy, try something harder next time.", "Open a page and try reading it. Too many hard words means too hard.", "If I can read most of the words on a page, it is just right for me.", [
      "A page has lots of words you cannot read. The book is...|Too hard right now|Too easy|Just right",
      "You can read almost every word easily. The book is...|Just right or easy|Too hard|Broken",
      "Where can you test if a book is just right?|Read a page|Look at the spine only|Smell it",
      "A book with only a few hard words is...|Probably just right|Too easy|Impossible",
      "If a book is too hard, you can...|Pick an easier one|Rip it|Hide it",
      "A good reader picks books that are...|Just right for them|Always the thickest|Always the thinnest"
    ]),
    PL("Question words", "❓", "Good questions begin with a question word. Here are six of them.", "Pick the question word that matches what you want to find out.", [
      "who::asks about a person::🧑", "what::asks about a thing::📦", "where::asks about a place::📍", "when::asks about time::⏰", "why::asks for a reason::💭", "how::asks in what way something happens::⚙️"
    ], { qd: "Which question word fits?", qt: "What does this question word ask about?" }),
    PL("Where to look", "🔎", "Different books help with different jobs. Pick the right book for what you need.", "Ask: what do I need? A meaning, a map or facts? Then pick the book.", [
      "dictionary::tells what a word means::📘", "atlas::a book of maps::🗺️", "encyclopedia::has facts about many topics::📚", "magazine::has short articles and pictures and comes out often::📰"
    ], { qd: "Which one helps?", qt: "What is this book for?" }),
    SC("Who can help me?", "🧑‍🏫", "Trusted people can help you find true facts: a librarian, a teacher and a parent. They know good places to look.", "Trusted helpers are people you know who care about you.", "If I need facts about frogs, I can ask my teacher or a librarian.", [
      "Who is a trusted helper for finding facts?|A librarian|A random stranger online|A pop-up ad",
      "Who can help you with homework research?|A teacher|A stranger|A pop-up ad",
      "Who can you ask at home?|A parent|A stranger|A robot you do not know",
      "You are not sure if a fact is true. You...|Ask a trusted grown-up|Believe it right away|Ignore it",
      "A pop-up says 'Click here to win!' You...|Ignore it and tell a grown-up|Click it|Type your name",
      "A librarian can help you find...|Good books|Free candy|A new house"
    ]),
    SC("Ask a grown-up online", "🛡️", "When you go online, ask a grown-up first. Never type your name, address, school, phone number or photos. If something feels strange, tell a grown-up.", "Private things stay private. Tell a grown-up if you feel unsure.", "I ask my mom before I open a website.", [
      "Before using the internet, you...|Ask a grown-up|Sneak|Click everything",
      "Which is private information?|Your home address|Your favorite fruit|The color blue",
      "A website asks for your name and school. You...|Stop and ask a grown-up|Type them|Tell a friend to type them",
      "You see something that feels wrong online. You...|Tell a grown-up right away|Hide it|Share it",
      "A stranger online asks you questions. You...|Do not answer and tell a grown-up|Answer all|Send a photo",
      "Who should know what you do online?|A trusted grown-up|Nobody|A stranger"
    ])
  ];

  // ================= LEVEL 3 =================
  const L3 = [
    PL("Table of contents", "📑", "The table of contents is at the front of a book. It shows the chapters and the page where each starts.", "Use it to jump straight to the part you want to read.", [
      "table of contents::a list of chapters with page numbers, at the front::📑", "chapter title::the name of one chapter::🏷️", "page number::tells where a chapter starts::🔢", "chapter::one part of a longer book::📗"
    ], { qd: "Which word fits?", qt: "What does this mean?" }),
    tocQ(),
    PL("Index and glossary", "🔤", "The index is at the back. It lists topics in ABC order with page numbers. A glossary tells what hard words mean.", "Table of contents is at the front. Index is at the back.", [
      "index::topics in ABC order with page numbers, at the back::📖", "glossary::a mini dictionary of hard words in the book::📘", "caption::words under a picture::💬", "heading::big words that name a section::🔠"
    ], { qd: "Which word fits?", qt: "What does this mean?" }),
    indexQ(),
    abc2(),
    SC("Guide words", "📘", "Dictionary pages have two guide words at the top. They show the first and last word on that page. Words in between are on that page.", "The word must come after the first guide word and before the last guide word in ABC order.", "On a page with guide words 'ant - bee', the word 'ape' fits because it is between them.", [
      "Guide words are 'cat - dog'. Which word is on this page?|cow|ant|zoo",
      "Guide words are 'bat - can'. Which word is on this page?|bed|fox|sun",
      "Guide words are 'hat - jam'. Which word is on this page?|ice|ant|zip",
      "Guide words are 'moon - pig'. Which word is on this page?|nest|ant|sun",
      "Guide words are 'sun - van'. Which word is on this page?|top|cat|zoo",
      "Guide words are 'dog - hat'. Which word is on this page?|egg|sun|ant",
      "Guide words tell you...|The first and last word on the page|The meaning of every word|How many pages there are"
    ]),
    PL("Story elements", "📖", "Every good story has a character, a setting, a problem, a solution and a plot.", "Ask: who, where, what is the problem, and how is it solved?", [
      "character::a person or animal in the story::🧒", "setting::where and when the story happens::🏞️", "problem::what goes wrong::😟", "solution::how the problem is solved::💡", "plot::what happens in the story::🎬"
    ], { qd: "Which story element is this?", qt: "What is this story element?" }),
    SC("Fiction or nonfiction?", "🔎", "Fiction is made up. Nonfiction is true. Biographies are true, too.", "Pretend characters and magic mean fiction. True facts or real people mean nonfiction.", "A book about real planets is nonfiction. A book about a space cat is fiction.", [
      "A book about how rainbows form|Nonfiction|Fiction",
      "A story about a bear who bakes pies|Fiction|Nonfiction",
      "A book that tells the life of a real scientist|Nonfiction|Fiction",
      "A tale with a magic wand and a talking fox|Fiction|Nonfiction",
      "A how-to book about drawing animals|Nonfiction|Fiction",
      "A funny story about a pencil that can talk|Fiction|Nonfiction",
      "An encyclopedia|Nonfiction|Fiction",
      "A story about a wizard school|Fiction|Nonfiction"
    ]),
    PL("True books", "🌍", "Nonfiction comes in many kinds. Each kind has a special job.", "Pick the kind that fits what you want to learn.", [
      "biography::a true story about a person's life, written by someone else::🧑", "autobiography::a person's life story, written by that same person::✍️", "how-to book::teaches you how to make or do something::🔧", "reference book::a book you look things up in::📚"
    ], { qd: "Which kind of book is this?", qt: "What is this kind of book?" }),
    SC("Trusted sources", "✅", "A trusted source gives true facts. Good sources are librarians, teachers, parents and good nonfiction books. Be careful with random websites, because anyone can post anything.", "Ask: who wrote this, and can I trust them? A grown-up can help.", "My teacher and a library book are good places to find facts.", [
      "Which is a trusted source?|A library nonfiction book|A random pop-up|A message from a stranger",
      "Who can help you check a fact?|A librarian|A stranger online|A mystery pop-up",
      "Can anyone post on a random website?|Yes, so be careful|No, never|Only experts",
      "A teacher is...|A trusted source|A random website|A pop-up",
      "You find a fact on an unknown website. You should...|Ask a grown-up to check it|Believe it right away|Share it right away",
      "Which source is usually best for facts?|A good nonfiction book|A rumor|A joke video"
    ]),
    SC("Check the facts", "🕵️", "A good researcher checks facts in more than one trusted place. If two good sources say the same thing, it is probably true.", "Check at least two trusted sources, and ask a grown-up if you are unsure.", "I read about owls in two books, and both said they hunt at night.", [
      "How can you check a fact?|Look in two trusted sources|Guess|Ask a stranger online",
      "Two good books say the same fact. It is probably...|True|False|A joke",
      "A fact seems strange. You...|Check another trusted source|Ignore it|Share it quickly",
      "Which is a good way to check?|Ask a librarian|Flip a coin|Close your eyes",
      "One source says one thing and another says something different. You...|Ask a grown-up and look more|Pick one at random|Give up",
      "Why do we check facts?|To make sure they are true|To make it harder|To waste time"
    ]),
    SC("Fact or opinion?", "⚖️", "A fact is true and can be checked. An opinion is what someone thinks or feels. Words like best, yummiest and boring are often opinions.", "Can you check it? Then it is a fact. If it is a feeling, it is an opinion.", "'A week has seven days' is a fact. 'Mondays are boring' is an opinion.", [
      "A spider has eight legs.|Fact|Opinion",
      "Pizza is the yummiest food.|Opinion|Fact",
      "The sun is a star.|Fact|Opinion",
      "Cats are better than dogs.|Opinion|Fact",
      "Birds have feathers.|Fact|Opinion",
      "Blue is the prettiest color.|Opinion|Fact",
      "Water freezes into ice when it is cold enough.|Fact|Opinion",
      "Summer is the best season.|Opinion|Fact",
      "A week has seven days.|Fact|Opinion",
      "Homework is boring.|Opinion|Fact"
    ]),
    SC("Good research questions", "❓", "A good research question can be answered with facts. Start with who, what, where, when, why or how.", "Pick questions you can answer by reading, like 'What do owls eat?'", "'How do bees make honey?' is a good research question.", [
      "Which is a good research question?|What do owls eat?|Is a pizza nice?|Do you like blue?",
      "Which is a good research question?|Where do penguins live?|Which sweater is cutest?|Is today fun?",
      "Which is a good research question?|How do plants grow?|Which hat is best?|Do you like Tuesday?",
      "Which is a good research question?|When did the first airplane fly?|Who is the funniest?|What is tasty?",
      "A research question can be answered by...|Looking in good sources|Guessing|Asking nobody",
      "Which question word is good to start with?|How|Zebra|Blue",
      "Which is a good research question?|Why do leaves change color?|What is cutest?|What is yummiest?"
    ]),
    SC("Pick search words", "🔑", "When you look something up, use the key words: the most important words. To learn how bees make honey, use 'bees' and 'honey'.", "Key words are the main ideas. Leave out small words like the, how and a.", "For 'How do owls hunt at night?' the key words are owls and hunt.", [
      "To learn about whales, good key words are...|whales|the and a|cool fun yes",
      "To learn about how frogs grow, key words are...|frogs grow|the how a|my is it",
      "To learn about the moon, key words are...|moon|so very much|the of a",
      "To learn about sharks' teeth, key words are...|sharks teeth|the is a|very nice",
      "Key words are...|The most important words|The smallest words|Silly words",
      "To learn about volcanoes, key words are...|volcanoes|the and or|now then"
    ]),
    SC("Safe searching", "🛡️", "Search with a grown-up nearby. Never type your name, address, school, phone number or photos. If a page seems wrong or strange, close it and tell a grown-up.", "Ask a grown-up first. Keep private things private. Tell a grown-up if something feels strange.", "I asked my dad to sit with me while I looked up facts about dolphins.", [
      "Before searching, you...|Ask a grown-up|Do it in secret|Type your address",
      "Which should you never type online?|Your home address|The word dolphin|The word moon",
      "A strange page opens. You...|Close it and tell a grown-up|Click everything|Share it",
      "A site asks for your phone number. You...|Stop and ask a grown-up|Type it|Tell a friend to type it",
      "A pop-up says you won a prize. You...|Ignore it and tell a grown-up|Click it|Type your name",
      "Who should be near you when you search?|A grown-up|A stranger|Nobody"
    ]),
    SC("Make a fact list", "📝", "After you read, make a list of facts in your own words. Write a title, then one fact on each line. Put the facts in your own words, not copied.", "Use short sentences, your own words, and one fact on each line.", "Title: Owls. Fact: Owls hunt at night.", [
      "A fact list should have...|A title and one fact on each line|One long messy paragraph|Only pictures",
      "You should write facts in...|Your own words|Someone else's words|A secret code",
      "Which is a good fact for a list about cats?|Cats have whiskers.|Cats are the best.|I like cats.",
      "Where does a fact list start?|With a title|With a joke|With nothing",
      "Why make a list?|To remember facts|To hide facts|To waste paper",
      "Which is a good fact line?|Frogs lay eggs.|Frogs are so cute.|Frogs are my favorite.",
      "A fact list should be...|True and short|Long and silly|Full of opinions"
    ]),
    PL("Where facts come from", "📚", "Facts come from sources. Some sources are better than others.", "Always ask: is it a trusted source?", [
      "book::a good place to find facts::📖", "encyclopedia::a big set of facts about many topics::📚", "expert::a person who knows a lot about a topic::🧑‍🔬", "librarian::a helper who knows where to find facts::🧑‍🏫", "website::pages online (use with a grown-up)::💻"
    ], { qd: "Which source is this?", qt: "What is this source?" }),
    SC("Be a researcher", "🔬", "Researchers follow steps: ask a question, find good sources, read, write facts, check them, and share what they learned.", "Think of the order: question first, then sources, then facts.", "To learn about owls, I ask what owls eat, look in a book, and write facts.", [
      "What is the first step in research?|Ask a question|Share your answer|Check the facts",
      "After you have a question, you...|Find good sources|Guess|Stop",
      "After reading, you...|Write down facts in your own words|Hide the book|Forget it",
      "At the end, you can...|Share what you learned|Hide it|Throw it away",
      "Which is a good way to check your facts?|Use another trusted source|Guess|Ask a stranger online",
      "A researcher is someone who...|Looks for facts|Plays only|Sleeps all day"
    ])
  ];

  return { 1: lvl(1, L1), 2: lvl(2, L2), 3: lvl(3, L3) };
})();
