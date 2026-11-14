// Mind Lab Typing & Computers. Levels 1-3, 20 lessons each.
// Needs math.js loaded first (uses ri, pick, shuf).
const TYPING_LEVELS = (() => {
  const S = (h, v, t) => ({ h, v, t });
  const L = (title, make, slides) => { make.teach = () => slides; return { title, make }; };
  const mix = (...ms) => () => pick(ms)();
  const MIXS = topics => [
    S("Review time!", "🔄", "This lesson mixes things you already know. Take your time and think about each one."),
    S("Remember", "🧠", topics),
    S("Tip", "💡", "Go slowly. Look at the keyboard picture in your mind if you get stuck.")
  ];
  const big = (t, s = 2.4) => `<span style="font-size:${s}em;font-weight:bold">${t}</span>`;

  const facts = (items, nudge, example) => () => {
    const [q, r, w, c, v] = pick(items);
    return { text: q, visual: v, choices: shuf([r, ...w]), answer: r, hints: [nudge, c, example] };
  };
  const yn = (items, nudge, example) => () => {
    const [q, a, c, v] = pick(items);
    return { text: q, visual: v, choices: ["yes", "no"], answer: a, hints: [nudge, c, example] };
  };

  // ---------- computer parts ----------
  const PARTS = [
    ["🖥️", "screen", "shows pictures and words"], ["⌨️", "keyboard", "you press its keys to type"], ["🖱️", "mouse", "moves the pointer and clicks"],
    ["🔊", "speaker", "plays sounds"], ["🎧", "headphones", "let you hear sound quietly"], ["🖨️", "printer", "puts words and pictures on paper"],
    ["🎤", "microphone", "hears your voice"], ["📷", "camera", "takes pictures"], ["💻", "laptop", "is a computer you can carry"], ["🔌", "power cable", "gives the computer its power"]
  ];
  const partName = () => {
    const p = pick(PARTS), ex = pick(PARTS.filter(x => x !== p));
    return {
      text: "What is this computer part called?", visual: big(p[0]), choices: shuf([p[1], ...shuf(PARTS.filter(x => x !== p)).slice(0, 2).map(x => x[1])]), answer: p[1],
      hints: ["Look at the picture. Have you seen one before?", `This part ${p[2]}.`, `Example: ${ex[0]} is called a ${ex[1]}, because it ${ex[2]}. Now do yours.`]
    };
  };
  const partJob = () => {
    const p = pick(PARTS), ex = pick(PARTS.filter(x => x !== p));
    return {
      text: `Which computer part ${p[2]}?`, choices: shuf([p[1], ...shuf(PARTS.filter(x => x !== p)).slice(0, 2).map(x => x[1])]), answer: p[1],
      hints: ["Think about how you use each part.", `The answer starts with the letter "${p[1][0]}".`, `Example: the ${ex[1]} ${ex[2]}. Now find yours.`]
    };
  };
  const IOI = [
    ["🖱️", "mouse", "input", "You move it to tell the computer where to go."], ["⌨️", "keyboard", "input", "You press its keys to send letters in."],
    ["🎤", "microphone", "input", "It sends your voice into the computer."], ["📷", "camera", "input", "It sends pictures into the computer."],
    ["🖥️", "screen", "output", "It shows you what the computer made."], ["🔊", "speaker", "output", "It plays sounds out to you."],
    ["🎧", "headphones", "output", "They play sound out to your ears."], ["🖨️", "printer", "output", "It puts the computer's work on paper."]
  ];
  const ioQ = () => {
    const [e, n, a, c] = pick(IOI);
    return {
      text: `Is the ${n} an input or an output?`, visual: big(e), choices: ["input", "output"], answer: a,
      hints: ["Input means you send something IN to the computer. Output means the computer sends something OUT to you.", c, "Example: a game controller sends your button presses in, so it is an input. Now do yours."]
    };
  };
  const INSIDE = facts([
    ["Which part is the computer's brain? It does the thinking.", "processor (CPU)", ["speaker", "mouse"], "Its name has the letters C, P, U."],
    ["Which part keeps your files and games even when the computer is off?", "storage", ["screen", "speaker"], "Think of a big closet for your files."],
    ["Which part holds what the computer is working on right now?", "memory (RAM)", ["printer", "mouse pad"], "It is like the top of your desk while you work."],
    ["What does a battery do in a laptop?", "gives it power without a cable", ["makes it louder", "cleans the screen"], "It is stored energy."],
    ["Where do your games and pictures stay saved?", "in storage", ["on the keyboard", "in the speaker"], "Think of the big closet for files."],
    ["What does the processor do?", "follows the steps of a program", ["plays loud music", "prints paper"], "It is the brain."],
    ["What happens if the computer has no power?", "it turns off", ["it gets faster", "it gets louder"], "Computers need power to work."],
    ["Which part do you NOT need inside to type a letter?", "printer", ["keyboard", "processor"], "You can type a letter without printing it."]
  ], "Think about what each part is for.", "Example: the screen shows pictures. The speaker plays sound. Each part has a job. Now do yours.");
  const HW = [["keyboard", "hardware"], ["mouse", "hardware"], ["screen", "hardware"], ["speaker", "hardware"], ["a game", "software"], ["a drawing app", "software"], ["a music player app", "software"], ["a web browser", "software"]];
  const hwsw = () => {
    const [n, a] = pick(HW);
    return {
      text: `Is ${/^(a )/.test(n) ? n : "the " + n} hardware or software?`, choices: ["hardware", "software"], answer: a,
      hints: ["Hardware is a part you can touch. Software is a program that tells the computer what to do.", "Can you pick it up and hold it? Or is it a program on the screen?", "Example: a toy robot's wheels are hardware, and the steps that make it move are software. Now do yours."]
    };
  };

  // ---------- keyboard ----------
  const ROWS = { "top row": "qwertyuiop", "home row": "asdfghjkl", "bottom row": "zxcvbnm", "number row": "1234567890" };
  const rowOf = ch => Object.keys(ROWS).find(r => ROWS[r].includes(ch));
  const findRow = (letters, digits) => () => {
    const c = pick(letters.split("")), r = rowOf(c);
    const ex = pick((letters + (digits ? "1234567890" : "")).split("").filter(x => rowOf(x) !== r));
    return {
      text: digits ? `Which row of the keyboard is the key <b>${c}</b> on?` : `Which row of the keyboard is the letter <b>${c.toUpperCase()}</b> on?`,
      visual: big(c.toUpperCase()), choices: digits ? ["top row", "home row", "bottom row", "number row"] : ["top row", "home row", "bottom row"], answer: r,
      hints: ["Letters are in three rows. Numbers have their own row at the top.", "The top letter row starts Q W E R T Y. The home row starts A S D F. The bottom row starts Z X C V.", `Example: the key ${ex.toUpperCase()} is on the ${rowOf(ex)}. Now find yours.`]
    };
  };
  const LH = "qwertasdfgzxcvb", RH = "yuiophjklnm";
  const handOf = () => {
    const c = pick((LH + RH).split("")), a = LH.includes(c) ? "left hand" : "right hand";
    return {
      text: `Which hand types the letter <b>${c.toUpperCase()}</b>?`, visual: big(c.toUpperCase()), choices: ["left hand", "right hand"], answer: a,
      hints: ["The keyboard is split down the middle. Each hand types its own side.", "The letters G and B are the last ones for the left hand. H and N are the first for the right hand.", "Example: the letter Q is on the far left, so the left hand types it. Now do yours."]
    };
  };
  const FING = { q: "left pinky", a: "left pinky", z: "left pinky", w: "left ring finger", s: "left ring finger", x: "left ring finger", e: "left middle finger", d: "left middle finger", c: "left middle finger", r: "left pointer finger", f: "left pointer finger", v: "left pointer finger", t: "left pointer finger", g: "left pointer finger", b: "left pointer finger", y: "right pointer finger", h: "right pointer finger", n: "right pointer finger", u: "right pointer finger", j: "right pointer finger", m: "right pointer finger", i: "right middle finger", k: "right middle finger", o: "right ring finger", l: "right ring finger", p: "right pinky", ";": "right pinky" };
  const NEAR = { q: "A", w: "S", e: "D", r: "F", t: "F", y: "J", u: "J", i: "K", o: "L", p: "the semicolon (;)", z: "A", x: "S", c: "D", v: "F", b: "F", n: "J", m: "J", g: "F", h: "J" };
  const ALLF = ["left pinky", "left ring finger", "left middle finger", "left pointer finger", "right pointer finger", "right middle finger", "right ring finger", "right pinky"];
  const fingerOf = keys => () => {
    const k = pick(keys.split("")), a = FING[k];
    const exK = pick(Object.keys(FING).filter(x => FING[x] !== a && x !== ";"));
    const wr = shuf(ALLF.filter(x => x !== a)).slice(0, 2);
    return {
      text: k === ";" ? "Which finger types the <b>;</b> (semicolon) key?" : `Which finger types the <b>${k.toUpperCase()}</b> key?`, visual: big(k === ";" ? ";" : k.toUpperCase()), choices: shuf([a, ...wr]), answer: a,
      hints: ["Rest your fingers on the home row: A S D F on the left, J K L ; on the right.", NEAR[k] ? `Each finger reaches from its home key. This key is close to ${NEAR[k] === "the semicolon (;)" ? NEAR[k] : "the " + NEAR[k] + " key"}.` : "This is a home row key. Your finger rests right on it.", `Example: the ${exK.toUpperCase()} key is typed by the ${FING[exK]}. Now do yours.`]
    };
  };
  const HK = { "left pinky": "a", "left ring finger": "s", "left middle finger": "d", "left pointer finger": "f", "right pointer finger": "j", "right middle finger": "k", "right ring finger": "l" };
  const homeKeyOf = () => {
    const f = pick(Object.keys(HK)), a = HK[f].toUpperCase();
    const wr = shuf(Object.values(HK).filter(x => x !== HK[f])).slice(0, 2).map(x => x.toUpperCase());
    return {
      text: `Which home row key does your <b>${f}</b> rest on?`, choices: shuf([a, ...wr]), answer: a,
      hints: ["Home row keys are A S D F on the left and J K L ; on the right.", f.startsWith("left") ? "The left hand rests on four keys in a row. The pinky takes the first one on the left. Count in from there." : "The right hand rests on J K L and ;. The pointer finger takes the first one on the left of those four. Count in from there.", "Example: the left pinky rests on A and the right pinky rests on the semicolon. Now do yours."]
    };
  };

  // ---------- typing ----------
  const LET = "abcdefghijklmnopqrstuvwxyz";
  const typeLetter = letters => () => {
    const c = pick(letters.split("")), twice = Math.random() < 0.5, ex = pick(LET.split("").filter(x => x !== c));
    return {
      text: twice ? "Type this letter two times." : "Type this letter.", visual: big(c.toUpperCase()), textInput: true, answer: twice ? c + c : c,
      hints: ["Look at the keyboard. Find the key with the same letter on it.", `This key is on the ${rowOf(c)} of the keyboard.`, `Example: to type the letter ${ex.toUpperCase()}, find ${ex.toUpperCase()} on the keyboard and press it. Now type yours.`]
    };
  };
  const typeKeys = (letters, lo, hi) => () => {
    const n = ri(lo, hi), s = Array.from({ length: n }, () => pick(letters.split(""))).join("");
    return {
      text: "Type these letters. Go slowly!", visual: big(s.toUpperCase().split("").join(" "), 1.8), textInput: true, answer: s,
      hints: ["Look at one letter at a time. Press the key for each letter in order.", `There are ${n} letters to type. Check each one as you go.`, "Example: for F J, press the F key, then the J key. Now type yours."]
    };
  };
  const typeWord = (words, pic) => () => {
    const [w, e] = pick(words), ex = pick(["at", "up", "hat"].filter(x => x !== w));
    return {
      text: pic ? "Type the word for this picture." : "Type this word.", visual: pic ? big(e) : big(w, 2), textInput: true, answer: w,
      hints: pic ? ["Say the name of the picture. Then find each letter on the keyboard.", `The word has ${w.length} letters and begins with the letter "${w[0]}".`, `Example: for the word ${ex}, press ${ex.toUpperCase().split("").join(", then ")}. Now type yours.`]
        : ["Say the word slowly. Then find each letter on the keyboard.", `The word has ${w.length} letters and begins with the letter "${w[0]}".`, `Example: for the word ${ex}, press ${ex.toUpperCase().split("").join(", then ")}. Now type yours.`]
    };
  };
  const W2 = ["at", "in", "on", "up", "go", "me", "we", "he", "is", "it", "no", "so", "do"].map(x => [x]);
  const W3 = [["cat", "🐱"], ["dog", "🐶"], ["sun", "☀️"], ["hat", "🎩"], ["bus", "🚌"], ["pig", "🐷"], ["cow", "🐮"], ["bed", "🛏️"], ["bug", "🐛"], ["fox", "🦊"], ["hen", "🐔"]];
  const W4 = [["fish", "🐟"], ["frog", "🐸"], ["duck", "🦆"], ["tree", "🌳"], ["moon", "🌙"], ["star", "⭐"], ["book", "📖"], ["ball", "⚽"], ["cake", "🎂"], ["bike", "🚲"], ["boat", "⛵"], ["milk", "🥛"]];
  const W5 = [["apple", "🍎"], ["horse", "🐴"], ["house", "🏠"], ["train", "🚂"], ["plane", "✈️"], ["pizza", "🍕"], ["tiger", "🐯"], ["snake", "🐍"], ["robot", "🤖"], ["bread", "🍞"], ["grape", "🍇"]];
  const WHOME = ["dad", "sad", "add", "ask", "all", "fall", "flask", "salad", "glad", "half", "hall", "flash"].map(x => [x]);
  const SENT = ["i see a cat", "the sun is hot", "we like to play", "my dog can run", "i read a book", "the bus is big", "she has a red hat", "it is a fun day", "the frog can jump", "i help my mom", "we can go now", "the fish can swim"];
  const typeSentence = () => {
    const s = pick(SENT), ws = s.split(" ");
    return {
      text: "Type this sentence. Press the space bar between words.", visual: big(s, 1.4), textInput: true, answer: s,
      hints: ["Type one word at a time. Press the space bar between the words.", `There are ${ws.length} words. The first word starts with "${ws[0][0]}".`, "Example: to type \"go now\", type g, o, press the space bar, then type n, o, w. Now type yours."]
    };
  };
  const typeNumber = (lo, hi) => () => {
    const n = ri(lo, hi);
    return {
      text: "Type this number. Use the number row at the top of the keyboard.", visual: big(n), answer: n,
      hints: ["Look at the number row above the letters. Find each digit.", `The number has ${String(n).length} ${String(n).length === 1 ? "digit" : "digits"}. Type them in order.`, "Example: to type 42, press 4 and then 2. Now type yours."]
    };
  };
  const tabNumLabel = 0;

  // ---------- fact banks ----------
  const KEYS1 = facts([
    ["Which key makes a space between words?", "space bar", ["enter", "shift"], "It is the long key at the bottom."],
    ["Which key starts a new line?", "enter", ["space bar", "backspace"], "Press it when you want to go to the next line."],
    ["Which key erases the letter you just typed?", "backspace", ["shift", "tab"], "It helps you fix a mistake."],
    ["Which key makes a capital letter when you hold it down?", "shift", ["backspace", "enter"], "There is one on each side of the keyboard."],
    ["Which finger do most people use for the space bar?", "thumb", ["pinky", "pointer finger"], "It is the finger that sticks out to the side."],
    ["What do the arrow keys do?", "move the cursor", ["make capitals", "turn off the computer"], "They point up, down, left and right."],
    ["Where are the number keys?", "in a row above the letters", ["below the space bar", "on the mouse"], "Look at the top of the keyboard. 1 2 3 are there."],
    ["How many hands do you use to type?", "two", ["one", "three"], "Both hands share the work."]
  ], "Think about what you press to do each job.", "Example: to erase a mistake you press backspace. Now do yours.");
  const KEYS2 = facts([
    ["Which key keeps all letters CAPITAL until you press it again?", "caps lock", ["tab", "esc"], "Press it once and the letters stay big."],
    ["Which key makes a big jump to the right when you type?", "tab", ["enter", "shift"], "It is at the left edge of the keyboard."],
    ["Which key is short for \"escape\" and often closes a menu?", "esc", ["tab", "space bar"], "It is at the top left."],
    ["Which key erases the letter AFTER the cursor?", "delete", ["backspace", "shift"], "Its name says what it does."],
    ["Which key moves the cursor up?", "up arrow", ["enter", "tab"], "It points the way."],
    ["Which key do you press to go to the next line?", "enter", ["shift", "space bar"], "It is a big key on the right side."],
    ["Which two keys can you use to move the cursor left and right?", "arrow keys", ["F keys", "number keys"], "They look like little arrows."],
    ["Where is the space bar?", "at the bottom", ["at the top", "next to the numbers"], "Your thumbs rest near it."]
  ], "Think about the job of each key.", "Example: the caps lock key makes every letter a capital. Now do yours.");
  const SHIFT = facts([
    ["How do you type a capital A?", "hold shift and press A", ["press backspace and A", "press enter twice"], "Shift changes the letter."],
    ["When do we use a capital letter?", "at the start of a name", ["in the middle of a word", "never"], "Names are special words."],
    ["Does a sentence start with a capital letter?", "yes", ["no"], "Look at any book. The first letter is big."],
    ["Which key do you let go of after the capital letter?", "shift", ["space bar", "enter"], "It is the key that you held down."],
    ["How do you type the ! mark? It is above the number 1.", "hold shift and press 1", ["press 1 only", "press enter"], "Shift changes a number key into a symbol."],
    ["Which finger usually presses the shift key?", "pinky", ["thumb", "pointer finger"], "Shift keys are at the edges, far from the home keys."],
    ["Which is a good time for a capital letter?", "the first letter of your name", ["every letter in a word", "the last letter of a word"], "Names start with capital letters."],
    ["What does the caps lock key do?", "keeps capitals on", ["erases words", "plays a sound"], "It locks capitals on."]
  ], "Think about how capital letters work.", "Example: to type the word Sam, hold shift for the S, let go, then type a and m. Now do yours.");
  const MOUSE1 = facts([
    ["What do you do to choose something with the mouse?", "click", ["spin", "shake"], "Press the left button one time."],
    ["What is the little arrow on the screen called?", "pointer", ["banana", "window"], "It points at things."],
    ["Which mouse button do you usually press?", "the left button", ["the back wheel", "the cable"], "Most clicks use the same side as your pointer finger."],
    ["When you move the mouse, what moves on the screen?", "the pointer", ["the speaker", "the keyboard"], "The arrow follows your hand."],
    ["Should you bang the mouse on the table?", "no", ["yes"], "Mice break if you are rough."],
    ["How do you press a button on the screen?", "move the pointer to it and click", ["shout at the screen", "press the speaker"], "Point first, then click."],
    ["Which hand do most people use for the mouse?", "the hand they write with", ["both feet", "the elbow"], "It is the hand you are best with."],
    ["Where should the mouse rest?", "on a flat, clean surface", ["on a pillow", "in the air"], "It needs a smooth place to slide."]
  ], "Think about how you control the pointer.", "Example: to press a Play button, move the pointer onto it and click. Now do yours.");
  const MOUSE2 = facts([
    ["What do you do to open a file or a program? Click two times quickly.", "double-click", ["drag", "scroll"], "Two quick clicks."],
    ["What do you do to pick something up and move it?", "drag", ["double-click", "blink"], "Click and hold, then move the mouse."],
    ["What does the wheel on the mouse do?", "scrolls the page up and down", ["turns off the screen", "types letters"], "Roll it with your finger."],
    ["How do you drag something?", "click, hold, move, then let go", ["click and shout", "double-click and wait"], "You hold the button down while you move."],
    ["What is a double-click?", "two quick clicks", ["one long click", "a click with the right hand and the left foot"], "Double means two."],
    ["You want to see more of a long page. What do you do?", "scroll", ["blow on the screen", "type a number"], "The wheel helps."],
    ["You dropped a picture into the wrong place. What do you do?", "drag it back", ["shut the computer", "click the speaker"], "Pick it up again."],
    ["Which one is faster for opening a game icon?", "double-click", ["blink", "wave"], "You make two quick clicks."]
  ], "Think about how your fingers work the mouse.", "Example: to move a toy picture, drag it with the mouse. Now do yours.");
  const MOUSE3 = facts([
    ["What happens when you right-click?", "a menu opens", ["the computer turns off", "a song plays"], "You get a list of choices."],
    ["What does it mean to hover?", "keep the pointer over something", ["click twice", "turn the screen"], "Rest the pointer there without clicking."],
    ["What is a touchpad?", "a flat pad that works like a mouse", ["a kind of speaker", "a screen cleaner"], "Slide your finger on it."],
    ["How do you click on a touchpad?", "press it or tap it", ["blow on it", "sing to it"], "Press the pad."],
    ["You hold the left button and move the mouse. What is that?", "dragging", ["scrolling", "typing"], "Holding and moving."],
    ["What do you use to see the bottom of a long page?", "scroll", ["print", "shift"], "Roll the wheel down."],
    ["Which button shows a menu of choices?", "the right button", ["the left button", "the wheel only"], "It is on the other side."],
    ["What do you do first to pick a file?", "click on it", ["shout at it", "turn off the screen"], "A click chooses it."]
  ], "Think about what each mouse action does.", "Example: to see options for a picture, right-click it and a menu opens. Now do yours.");
  const POSTURE = facts([
    ["How should your feet be when you sit at the computer?", "flat on the floor", ["on the keyboard", "in the air"], "They should be supported."],
    ["How should your back be?", "straight and tall", ["curled up", "lying down"], "Sit up like a tree."],
    ["Where should the screen be?", "about an arm's length away", ["touching your nose", "across the room"], "Not too close, not too far."],
    ["How should your wrists be when you type?", "flat and relaxed", ["bent up high", "twisted tight"], "They should not be bent."],
    ["Should you slouch while typing?", "no", ["yes"], "Slouching can hurt your back."],
    ["Where should your eyes look on the screen?", "straight ahead or slightly down", ["way up at the ceiling", "at the floor"], "Do not strain your neck."],
    ["Where should your hands be when you rest between words?", "near the home row", ["on your lap", "on the screen"], "Ready to type again."],
    ["What is a good way to sit?", "sit up tall with your feet flat", ["lean far to one side", "sit on your knees on the chair"], "Comfort and balance matter."]
  ], "Think about sitting in a comfortable, healthy way.", "Example: sit with your back straight and your feet flat on the floor. Now do yours.");
  const BREAKS = facts([
    ["How often should you take a break from the screen?", "often, every little while", ["never", "only at night"], "Little breaks keep you healthy."],
    ["What can you do on a screen break?", "look at something far away", ["stare harder", "turn the brightness up"], "Rest your eyes."],
    ["Your eyes feel tired. What should you do?", "take a break", ["keep staring", "type faster"], "Tired eyes need rest."],
    ["Which is a good break?", "stretch and move around", ["sit very still", "watch another screen"], "Move your body."],
    ["What should you drink while you take a break?", "some water", ["nothing at all", "a bucket of paint"], "Water is good for you."],
    ["The 20-20-20 idea says: every 20 minutes, look at something far away for ___ seconds.", "20", ["2", "200"], "The number repeats in the name."],
    ["Your head hurts after using the computer. What do you do?", "stop and tell a grown-up", ["keep going", "turn the screen brighter"], "Tell someone."],
    ["Why do we blink and rest our eyes?", "it keeps our eyes comfortable", ["it makes the computer faster", "it makes the screen cooler"], "Eyes get dry when you stare."]
  ], "Think about how to keep your eyes and body healthy.", "Example: after a long time on the computer, you can stand up and stretch. Now do yours.");
  const SAFE1 = facts([
    ["Someone online asks for your password. What do you do?", "say no and tell a parent", ["tell them", "type it fast"], "Passwords are secret."],
    ["A pop-up says \"You won a prize! Click here!\" What do you do?", "do not click, tell a parent", ["click it fast", "give your name"], "It may be a trick."],
    ["You see a new link. What should you do before you click?", "ask a parent", ["click it right away", "send it to a stranger"], "A grown-up can check it."],
    ["Who is allowed to know your password?", "just you and your parents", ["everyone at school", "any stranger online"], "Keep it very private."],
    ["Someone you do not know sends you a message. What should you do?", "stop and tell a parent", ["write back with your address", "send them a photo"], "Strangers are not friends."],
    ["Should you share your home address online?", "no", ["yes"], "That is private."],
    ["A game wants you to download a program. What do you do?", "ask a parent first", ["download it now", "ignore every rule"], "Downloads can be unsafe."],
    ["You feel unsure about something online. What do you do?", "tell a grown-up", ["hide it", "keep clicking"], "Grown-ups can help."]
  ], "Think about how to keep yourself safe online.", "Example: if a stranger says hello online, do not answer. Tell a parent. Now do yours.");
  const KIND1 = facts([
    ["A friend makes a mistake in a game. What do you say?", "That's okay, try again!", ["You are bad!", "I will not play with you"], "Be kind and helpful."],
    ["You want to say something kind. Which is better?", "Good job!", ["You can't do it!", "That is silly!"], "Pick the cheerful words."],
    ["Should you say mean things to someone online?", "no", ["yes"], "Mean words hurt, even on a screen."],
    ["Someone is mean to you online. What do you do?", "tell a parent", ["be mean back", "hide it forever"], "Grown-ups can help."],
    ["Which words are kind?", "Please and thank you", ["Go away", "Give me that"], "Good manners work online too."],
    ["A friend wins a game. What can you say?", "Great job!", ["You cheated!", "I do not care"], "Be happy for others."],
    ["Should you share another kid's picture without asking?", "no", ["yes"], "Ask first, or do not share."],
    ["We should treat people online ___", "the way we treat them in person", ["worse than in person", "like they are not real"], "People are real."]
  ], "Think about how you like to be treated.", "Example: say \"Nice try!\" instead of something mean. Now do yours.");
  const SAFE2 = facts([
    ["Which is the best password?", "Blue-Tiger-77-Moon", ["1234", "password"], "Long and hard to guess is best."],
    ["Should you tell a friend your password?", "no", ["yes"], "It is a secret."],
    ["Who can help you make a strong password?", "a parent", ["a stranger", "a pop-up"], "Someone you trust."],
    ["Where should a password NOT be?", "on a note anyone can see", ["in your head", "safe with a parent"], "Keep it private."],
    ["A strong password is ___", "long and hard to guess", ["short and easy", "your name"], "Make it tricky."],
    ["Which is NOT a good password?", "your own name", ["Green-Rocket-85-Cloud", "a long mix of words and numbers"], "Others can guess names."],
    ["A website asks you to make a password. What do you do?", "ask a parent to help", ["use 1234", "tell it to a friend"], "Do it together."],
    ["Should you use the same password for every game?", "no", ["yes"], "If one is found, others are safe."]
  ], "Think about keeping passwords secret and strong.", "Example: \"Red-Frog-42-Lake\" is stronger than \"abc\". Now do yours.");
  const SAFE3 = facts([
    ["A game asks for your real name and school. What do you do?", "ask a parent, and do not give it", ["type it in", "tell your friends"], "Private things stay private."],
    ["Someone asks you to keep a secret from your parents. What do you do?", "stop and tell a parent", ["keep the secret", "send a photo"], "Good people do not ask for secrets."],
    ["A stranger offers you a gift online. What do you do?", "do not reply, tell a parent", ["say yes", "give your address"], "It is a trick."],
    ["Someone asks to chat in private. What do you do?", "stop replying and tell a parent", ["move to a private chat", "give your number"], "Grown-ups need to know."],
    ["Should you ever send a photo of yourself to a stranger?", "no", ["yes"], "Keep your face private."],
    ["Who do you tell if something feels wrong online?", "a parent", ["a stranger", "nobody"], "Someone you trust."],
    ["A site says \"Enter your email to win!\" What do you do?", "ask a parent first", ["type it in", "tell everyone"], "Ask first."],
    ["You get a message from someone you do not know. You should ___", "not answer", ["write back", "tell them where you live"], "Do not chat with strangers."]
  ], "Think about what is safe to share, and who to tell.", "Example: if a stranger asks where you live, do not answer. Tell a parent right away. Now do yours.");
  const FILES1 = facts([
    ["What is a file?", "one saved thing, like a picture or a story", ["a kind of screen", "a mouse button"], "Your drawing is one."],
    ["What is a folder?", "a place that holds files", ["a kind of mouse", "a loud speaker"], "Think of a paper folder."],
    ["Where might you keep your drawings?", "in a folder", ["on the speaker", "in the cable"], "Group them together."],
    ["Which folder name tells you what is inside?", "My Pictures", ["asdf", "x"], "A clear name helps."],
    ["Can a folder hold many files?", "yes", ["no"], "That is its job."],
    ["What do you do to keep your work so you can find it later?", "save it", ["close your eyes", "turn up the sound"], "Do not lose it."],
    ["Which is a file?", "a story you wrote", ["the keyboard", "the mouse"], "It is something saved on the computer."],
    ["Which helps you find your files?", "putting them in folders", ["hiding them", "deleting them"], "Keep things organized."]
  ], "Think of files like papers and folders like paper folders.", "Example: a folder named Art can hold your drawings. Now do yours.");
  const FILES2 = facts([
    ["What should you do before you close your work?", "save it", ["ignore it", "shout at it"], "Otherwise you may lose it."],
    ["What can happen if you forget to save?", "your work can be lost", ["nothing at all", "the screen gets bigger"], "Computers do not remember everything."],
    ["Which file name is clearer?", "my-cat-story", ["asdfgh", "zzz"], "It tells you what is inside."],
    ["What do you do to see a file you saved?", "open it", ["turn it off", "bang the keyboard"], "Double-click it."],
    ["You want to give your file a name. What do you do?", "type a name that tells what it is", ["leave it blank", "use a random mix of letters"], "Make it easy to remember."],
    ["Where do you look for a file you saved last week?", "in the folder you put it in", ["in the speaker", "under the mouse"], "You put it there."],
    ["What does it mean to close a file?", "you stop looking at it", ["you erase it", "you break it"], "It is still saved."],
    ["Which keys often work as a shortcut to save?", "Ctrl + S", ["Ctrl + Q", "Shift + Q"], "S is for save."]
  ], "Think about how to keep and find your work.", "Example: name a drawing of a dog \"my-dog\" so you can find it later. Now do yours.");
  const FOLD = [["a photo of your dog", "Pictures"], ["a song you like", "Music"], ["a movie clip", "Videos"], ["your school story", "Documents"], ["a drawing you made", "Pictures"], ["your favorite album", "Music"], ["a funny video", "Videos"], ["a spelling list", "Documents"]];
  const folderFor = () => {
    const [it, f] = pick(FOLD);
    return {
      text: `Which folder is best for ${it}?`, choices: shuf(["Pictures", "Music", "Videos", "Documents"]), answer: f,
      hints: ["Think about what kind of file it is: a picture, a sound, a movie, or words.", "Pictures hold photos and drawings. Music holds songs. Videos hold movies. Documents hold writing.", "Example: a recipe you typed goes in Documents. Now do yours."]
    };
  };
  const FT = [["a picture", "png"], ["a song", "mp3"], ["a story", "txt"], ["a video", "mp4"]];
  const fileType = () => {
    const [d, ext] = pick(FT), base = pick(["cat", "sun", "dog", "tree", "fun", "my-file", "trip"]);
    const wr = shuf(FT.filter(x => x[1] !== ext)).slice(0, 2).map(x => `${pick(["cat", "sun", "dog", "tree", "fun", "trip"])}.${x[1]}`);
    const right = `${base}.${ext}`;
    return {
      text: `Which file is ${d}? Look at the end of the name.`, choices: shuf([right, ...wr.filter(x => x !== right)]).slice(0, 3), answer: right,
      hints: ["The last letters after the dot show what kind of file it is.", "png and jpg are pictures, mp3 is music, txt is writing, and mp4 is a video.", "Example: \"cake.png\" is a picture of cake, and \"cake.mp3\" is a song. Now do yours."]
    };
  };
  const SHORT = facts([
    ["Which shortcut copies something?", "Ctrl + C", ["Ctrl + V", "Ctrl + Z"], "C is for copy."],
    ["Which shortcut pastes what you copied?", "Ctrl + V", ["Ctrl + C", "Ctrl + Z"], "It is next to the one for copy."],
    ["Which shortcut undoes your last step?", "Ctrl + Z", ["Ctrl + C", "Ctrl + V"], "Z is the last letter, and it takes you back."],
    ["Which shortcut saves your work?", "Ctrl + S", ["Ctrl + Q", "Ctrl + Z"], "S is for save."],
    ["Which shortcut selects everything?", "Ctrl + A", ["Ctrl + S", "Ctrl + Z"], "A is for all."],
    ["What does Ctrl + C do?", "copies", ["pastes", "undoes"], "C is the first letter."],
    ["What does Ctrl + V do?", "pastes", ["copies", "saves"], "It puts it in."],
    ["What does Ctrl + Z do?", "undoes", ["copies", "pastes"], "It goes back."],
    ["Why do people use shortcuts?", "to save time", ["to make noise", "to break things"], "They are quick."],
    ["To copy and paste, you press Ctrl + C and then ___", "Ctrl + V", ["Ctrl + Z", "Ctrl + S"], "Copy first, then paste."]
  ], "A shortcut uses the Ctrl key plus a letter.", "Example: Ctrl + P is a shortcut to print. P is for print. Now do yours.");
  const NET = facts([
    ["What is the internet?", "computers all over the world connected together", ["a kind of TV", "a big book"], "Many computers talk to each other."],
    ["What is a website?", "a page you can visit on the internet", ["a kind of mouse", "a kind of snack"], "You look at it on a screen."],
    ["What is a browser?", "a program for visiting websites", ["a kind of cable", "a game console"], "It lets you look at web pages."],
    ["What does Wi-Fi do?", "connects devices without wires", ["makes noise", "cleans the screen"], "No cable needed."],
    ["What is an email?", "a message sent over the internet", ["a kind of paper", "a toy"], "It is a digital letter."],
    ["Is everything on the internet true?", "no", ["yes"], "Anyone can put things there."],
    ["Who should you ask before using the internet?", "a parent", ["a stranger", "nobody"], "They help keep you safe."],
    ["What is a web address (URL)?", "the name that helps you find a website", ["a type of cable", "a kind of keyboard"], "It is like a home address for a website."]
  ], "Think about how computers can be connected.", "Example: the internet connects computers across the world so they can share things. Now do yours.");
  const PRINT = facts([
    ["Before you share a photo online, what should you do?", "ask a parent first", ["post it right away", "tell a stranger"], "Think before you post."],
    ["Once you post something online, can it stay there for a long time?", "yes", ["no"], "Others may save it."],
    ["Which is okay to post?", "nothing private without a parent's okay", ["your address", "your phone number"], "Keep private things private."],
    ["What should you do before you post a comment?", "think if it is kind", ["post it fast", "make it mean"], "Pause first."],
    ["Your \"digital footprint\" is ___", "the trail of what you do online", ["a muddy shoe", "a printer"], "It is what you leave behind."],
    ["If you post something unkind, can you always take it back?", "no, others may have seen it", ["yes, always", "it vanishes"], "Be careful."],
    ["Which is best?", "think before you post", ["post and see what happens", "post and hide"], "Pause."],
    ["Who should help you decide what to share?", "a parent", ["a stranger", "a pop-up"], "They keep you safe."]
  ], "Think about what stays online after you post.", "Example: pause and ask yourself: is it kind, true, and okay to share? Now do yours.");
  const KIND3 = facts([
    ["You see someone being picked on in a chat. What can you do?", "tell a grown-up", ["join in", "ignore forever"], "Help from a grown-up."],
    ["Someone sends you an unkind message. What do you do?", "do not answer, and tell a parent", ["send one back", "delete it and tell no one"], "Grown-ups can help."],
    ["How can you be a good friend online?", "be kind and helpful", ["be bossy", "tease people"], "Treat people the way you want to be treated."],
    ["Is it okay to copy someone's picture and say you made it?", "no", ["yes"], "Be honest."],
    ["A friend is sad in a game chat. What can you say?", "Are you okay? I can help.", ["Ha ha!", "Quit crying"], "Show you care."],
    ["Why should we be kind online?", "real people read what we write", ["no one is there", "it does not matter"], "There are real people on the other side."],
    ["What is a kind way to disagree?", "say it politely", ["yell in capitals", "call names"], "Be respectful."],
    ["You wrote something and feel it might hurt someone. What do you do?", "change it to be kinder", ["post it anyway", "send it to many people"], "Pause and fix."]
  ], "Think about how your words feel to the other person.", "Example: instead of \"That is dumb,\" you could say \"I think a different way is better.\" Now do yours.");
  const SCREEN = facts([
    ["How should you decide how long to use a screen?", "follow the rules your parents set", ["use it all day", "stay up all night"], "Grown-ups help you balance."],
    ["What is a good thing to do besides screens?", "play outside", ["stare at a wall", "sit still all day"], "Move your body."],
    ["Should you use screens right before bed?", "it is better not to", ["always", "all night"], "Screens can make sleep harder."],
    ["Why is it good to read a book or draw too?", "it gives your eyes a rest", ["it breaks the computer", "it is boring"], "Variety is good."],
    ["You feel grumpy after lots of screen time. What helps?", "a break and some fresh air", ["more screen time", "no water"], "Move and breathe."],
    ["Who helps you decide screen time rules?", "your family", ["a pop-up", "a stranger"], "They care about you."],
    ["What should you do if you cannot stop playing?", "ask for help and take a break", ["play faster", "hide from everyone"], "It is okay to need help."],
    ["Eating while you use the computer can ___", "make crumbs in the keyboard", ["make you faster", "make the screen bigger"], "Keep it clean."]
  ], "Think about a healthy mix of screens and other fun.", "Example: after a game, you can go outside and play. Now do yours.");
  const PROBLEM = facts([
    ["The computer freezes. What should you do first?", "tell a grown-up", ["bang on it", "pull out cables"], "Do not break it."],
    ["You see a strange message you do not understand. What do you do?", "ask a parent", ["click everything", "type your password"], "Let a grown-up look."],
    ["You spilled water near the keyboard. What do you do?", "tell a grown-up right away", ["keep typing", "shake it"], "Water can break a computer."],
    ["A game stops working. What can you try?", "close it and ask a grown-up", ["smash the keys", "scream at it"], "Be calm."],
    ["The screen is too bright for your eyes. What do you do?", "ask a grown-up to help change it", ["stare longer", "put a blanket on it"], "Comfort matters."],
    ["Your computer shows a pop-up asking you to call a number. What do you do?", "do not call, tell a parent", ["call the number", "give your name"], "It may be a trick."],
    ["You do not know how to do something. What can you do?", "ask for help", ["give up", "click random buttons"], "It is okay to ask."],
    ["Your computer gets very hot. What do you do?", "tell a grown-up", ["cover it with a pillow", "ignore it"], "Heat can be a problem."]
  ], "Stay calm and ask for help from a grown-up.", "Example: if the computer stops working, stay calm and get a grown-up. Now do yours.");

  // ---------- lessons ----------
  const L1 = [
    L("Parts of a computer", partName, [S("A computer has parts", "💻", "A computer has parts you can see: a screen, a keyboard, a mouse and more."), S("Meet the parts", "🖥️⌨️🖱️", "The <b>screen</b> shows things. The <b>keyboard</b> types. The <b>mouse</b> moves the pointer."), S("Tip", "💡", "Look at each picture and say its name out loud.")]),
    L("What does it do?", partJob, [S("Each part has a job", "🛠️", "Every part of a computer has its own job."), S("Jobs", "🔊🎤", "The <b>speaker</b> plays sounds. The <b>microphone</b> hears your voice."), S("Tip", "💡", "Ask yourself: how do I use this part?")]),
    L("Keys on the keyboard", KEYS1, [S("Special keys", "⌨️", "Some keys do special jobs, not just letters."), S("Jobs of keys", "␣ ⏎ ⇧", "The <b>space bar</b> makes a space. <b>Enter</b> starts a new line. <b>Shift</b> makes capitals. <b>Backspace</b> erases."), S("Tip", "💡", "Your thumbs press the space bar.")]),
    L("Where is the key?", findRow("qwertyuiopasdfghjklzxcvbnm", true), [S("Rows", "⌨️", "The keys are in rows. The numbers are at the top. Then there are three rows of letters."), S("The three letter rows", "Q A Z", "The <b>top row</b> starts with Q. The <b>home row</b> starts with A. The <b>bottom row</b> starts with Z."), S("Tip", "💡", "The home row is the middle row.")]),
    L("Find the letters A to M", typeLetter("abcdefghijklm"), [S("Typing a letter", "A", "To type a letter, find the key and press it."), S("Look and find", "🔎", "Look at the letter on the screen. Find the same letter on your keyboard."), S("Tip", "💡", "The letters are not in ABC order. Take your time.")]),
    L("Find the letters N to Z", typeLetter("nopqrstuvwxyz"), [S("More letters", "N", "Now find the letters from N to Z."), S("Where they live", "⌨️", "They are spread out on three rows."), S("Tip", "💡", "Look at the rows one by one.")]),
    L("The home row", facts([
      ["Which row is called the home row?", "the middle row of letters", ["the number row", "the space bar row"], "Your fingers rest there."],
      ["Which letters do the left fingers rest on?", "A S D F", ["Q W E R", "Z X C V"], "The left hand starts with A."],
      ["Which letters do the right fingers rest on?", "J K L ;", ["U I O P", "N M , ."], "The right hand starts with J."],
      ["Why is it called the home row?", "your fingers rest there", ["it has a house on it", "it is only for numbers"], "It is where your fingers live."],
      ["Which two keys have little bumps to feel?", "F and J", ["A and S", "Q and P"], "They are the pointer finger keys."],
      ["Where do your pointer fingers rest?", "on F and J", ["on Q and P", "on Z and M"], "They have bumps."],
      ["How many letters are on the left side of the home row for resting?", "four", ["two", "nine"], "A S D F."],
      ["Where do your thumbs rest?", "on the space bar", ["on the shift keys", "on the numbers"], "They are at the bottom."]
    ], "Think about where your fingers rest.", "Example: your fingers go on A S D F and J K L ;. Now do yours."), [S("Home row", "A S D F · J K L ;", "The <b>home row</b> is where your fingers rest while you type."), S("Feel the bumps", "F J", "The F and J keys have little bumps. They help your pointer fingers find home without looking."), S("Tip", "💡", "Thumbs rest on the space bar.")]),
    L("Type the home row", typeKeys("asdfjkl", 3, 4), [S("Typing home row keys", "A S D F", "Let's type letters from the home row. Keep your fingers on the home keys."), S("Slowly", "🐢", "Go slowly. Speed comes later."), S("Tip", "💡", "Look at the screen, not your hands.")]),
    L("Left hand or right hand?", handOf, [S("Two hands", "🤲", "The keyboard is split down the middle. Each hand types its own side."), S("Which side", "Q ‖ P", "Letters on the left are for the left hand. Letters on the right are for the right hand."), S("Tip", "💡", "G and B are the last for the left hand.")]),
    L("Which finger?", fingerOf("asdfjkl;"), [S("Finger names", "🖐️", "Your fingers have names: pinky, ring finger, middle finger, and pointer finger."), S("On the home row", "A S D F", "Left pinky: A. Left ring: S. Left middle: D. Left pointer: F."), S("Other side", "J K L ;", "Right pointer: J. Right middle: K. Right ring: L. Right pinky: ;.")]),
    L("Type short words", typeWord(W2, false), [S("Typing words", "at", "Now we will type small words. Press one key at a time."), S("In order", "a → t", "Type the letters in order, from left to right."), S("Tip", "💡", "Say the word slowly and watch the letters.")]),
    L("Type a picture word", typeWord(W3, true), [S("Picture words", "🐱", "Look at the picture. Think of its name, and type the word."), S("Spell it", "c-a-t", "Say each sound. Find each letter."), S("Tip", "💡", "Short words have two or three letters.")]),
    L("Mouse: click", MOUSE1, [S("The mouse", "🖱️", "The <b>mouse</b> moves the little arrow on the screen. The arrow is called the <b>pointer</b>."), S("Click", "👆", "A <b>click</b> is a quick press of the left button. It picks things."), S("Tip", "💡", "Move first, then click.")]),
    L("Mouse: double-click and drag", MOUSE2, [S("Double-click", "👆👆", "A <b>double-click</b> is two quick clicks. It often opens things."), S("Drag", "✋", "To <b>drag</b>, click and hold, then move the mouse, then let go."), S("Scroll", "🖱️", "The wheel scrolls a page up and down.")]),
    L("Sit well", POSTURE, [S("Sit smart", "🪑", "How you sit matters. Sit tall with your feet flat on the floor."), S("Screen and wrists", "👀", "Keep the screen about an arm's length away. Keep your wrists flat."), S("Tip", "💡", "No slouching!")]),
    L("Screen breaks", BREAKS, [S("Rest your eyes", "👀", "Looking at a screen can make eyes tired."), S("Take breaks", "⏸️", "Stop every little while. Look far away. Stretch. Drink water."), S("Tell a grown-up", "🗣️", "If your head or eyes hurt, tell a grown-up.")]),
    L("Be safe: ask first", SAFE1, [S("Stay safe", "🛡️", "Some things online can be tricky. We always stay safe."), S("Passwords", "🔑", "A <b>password</b> is a secret key. Only you and your parents know it."), S("Ask first", "🙋", "Before you click a new link or download, <b>ask a parent</b>.")]),
    L("Be kind", KIND1, [S("Kind words", "💬", "Kind words feel nice on screens too."), S("Examples", "😊", "Say \"Good job!\" and \"That's okay, try again.\""), S("Tell a parent", "🧑‍🧑‍🧒", "If someone is mean to you, tell a parent.")]),
    L("Mixed practice", mix(partName, KEYS1, findRow("qwertyuiopasdfghjklzxcvbnm", true), typeLetter("asdfjklghqwertyuiop"), handOf, SAFE1), MIXS("Parts of a computer, keys, rows, letters, hands, and staying safe.")),
    L("Level 1 Challenge", mix(partJob, KEYS1, typeKeys("asdfjkl", 3, 4), fingerOf("asdfjkl;"), typeWord(W3, true), MOUSE2, POSTURE, BREAKS, SAFE1, KIND1), MIXS("Everything from level 1: parts, keys, home row, typing, mouse, posture and safety."))
  ];

  const L2 = [
    L("Input and output", ioQ, [S("Input", "⌨️🖱️", "<b>Input</b> is how you tell a computer something: keyboard, mouse, microphone, camera."), S("Output", "🖥️🔊", "<b>Output</b> is what the computer gives back: screen, speaker, printer."), S("Tip", "💡", "Input goes IN. Output comes OUT.")]),
    L("Special keys", KEYS2, [S("More keys", "⇥ ⎋ ⌫", "Caps lock, tab, esc and delete each have a job."), S("Examples", "⇪", "<b>Caps lock</b> keeps capitals on. <b>Tab</b> jumps. <b>Esc</b> means escape. <b>Delete</b> erases."), S("Tip", "💡", "Do not press keys just to see what happens, unless a grown-up says it is okay.")]),
    L("Capital letters", SHIFT, [S("Capitals", "A a", "A capital letter is the big form of a letter."), S("Use shift", "⇧ + A", "Hold shift and press a letter to make a capital."), S("When", "Mia", "Names and the first word of a sentence start with a capital.")]),
    L("Numbers", typeNumber(1, 99), [S("Number row", "1 2 3 4 5", "The number row is at the top of the keyboard, above the letters."), S("Type numbers", "4 7", "Press the key for each digit in order."), S("Tip", "💡", "Use the top row, not the letter row.")]),
    L("Where are the letters?", findRow("qwertyuiopasdfghjklzxcvbnm", false), [S("Three rows", "Q A Z", "Top row, home row and bottom row."), S("Starts", "Q W E · A S D · Z X C", "Learn what each row starts with."), S("Tip", "💡", "Say the row names out loud.")]),
    L("Fingers on the home row", fingerOf("asdfghjkl;"), [S("Finger names", "🖐️", "Left hand: pinky, ring, middle, pointer. Right hand: pointer, middle, ring, pinky."), S("Home keys", "A S D F  J K L ;", "Each finger rests on its own home key."), S("Tip", "💡", "Thumbs rest on the space bar.")]),
    L("Which key for which finger?", homeKeyOf, [S("Home keys", "🖐️", "Each finger has one home key."), S("Left hand", "A S D F", "Left pinky A, ring S, middle D, pointer F."), S("Right hand", "J K L ;", "Right pointer J, middle K, ring L, pinky ;.")]),
    L("Reach up and down", fingerOf("qweruiopzxcvnm"), [S("Reaching", "⬆️⬇️", "Your fingers reach up and down from their home keys."), S("Example", "S → W", "The ring finger that rests on S also types W (up) and X (down)."), S("Tip", "💡", "Find the home key that is closest.")]),
    L("Type pairs", typeKeys("fjdksl", 4, 6), [S("Pairs", "F J", "Let's type two or three letters from the home row at a time."), S("Switch hands", "🤲", "Your hands take turns. It feels like a drumbeat."), S("Tip", "💡", "Do not look down. Watch the screen.")]),
    L("Home row words", typeWord(WHOME, false), [S("Words from the home row", "ask", "Many words can be typed with the home row only."), S("Examples", "all · dad · fall", "Type them with your home row fingers."), S("Tip", "💡", "Fingers return home after each key.")]),
    L("Type longer picture words", typeWord(W4, true), [S("Four letters", "🐟", "Now the words have four letters."), S("Spell it", "f-i-s-h", "Say the sounds, then type each letter."), S("Tip", "💡", "Check each letter as you go.")]),
    L("Type a sentence", typeSentence, [S("Sentences", "i see a cat", "A sentence is a group of words that says something."), S("Space bar", "␣", "Press the space bar between the words."), S("Tip", "💡", "Type slowly and look at the screen.")]),
    L("Mouse skills", MOUSE3, [S("More mouse moves", "🖱️", "You can right-click, hover and use a touchpad."), S("Right-click", "📋", "A <b>right-click</b> opens a little menu of choices."), S("Hover", "👆", "<b>Hover</b> means to rest the pointer over something.")]),
    L("Files and folders", FILES1, [S("Files", "📄", "A <b>file</b> is one saved thing: a picture, a story or a song."), S("Folders", "📁", "A <b>folder</b> holds many files. It keeps things tidy."), S("Tip", "💡", "Give folders names that tell what is inside.")]),
    L("Save and name", FILES2, [S("Saving", "💾", "When you <b>save</b> your work, it stays on the computer."), S("Names", "🏷️", "Give your file a name that tells what it is, like my-cat-story."), S("Tip", "💡", "Save before you close!")]),
    L("Strong passwords", SAFE2, [S("Passwords", "🔑", "A strong password is long and hard to guess."), S("Keep it secret", "🤫", "Never share your password with friends or strangers. Only your parents."), S("Tip", "💡", "Ask a parent to help you make one.")]),
    L("Ask first, stay safe", SAFE3, [S("Private things", "🔒", "Your name, school, address and photos are private. Do not share them online."), S("Strangers", "🙅", "Do not chat with people you do not know. If someone asks for secrets or gifts, stop and tell a parent."), S("Tell", "🗣️", "Telling a parent is always a good idea.")]),
    L("Be kind online", KIND3, [S("Kindness", "💛", "Real people read what you write. Be kind."), S("If someone is mean", "🛑", "Do not be mean back. Tell a parent."), S("Think first", "🤔", "Is it kind? Is it true? Pause before you post.")]),
    L("Mixed practice", mix(ioQ, KEYS2, SHIFT, findRow("qwertyuiopasdfghjklzxcvbnm", false), fingerOf("asdfghjkl;"), SAFE3), MIXS("Input and output, keys, capitals, rows, fingers, and staying safe.")),
    L("Level 2 Challenge", mix(KEYS2, SHIFT, typeNumber(1, 99), homeKeyOf, fingerOf("qweruiopzxcvnm"), typeWord(WHOME, false), typeWord(W4, true), typeSentence, MOUSE3, FILES1, FILES2, SAFE2, KIND3), MIXS("Everything from level 2: keys, fingers, typing, files, safety and kindness."))
  ];

  const L3 = [
    L("Shift and symbols", SHIFT, [S("Capitals", "⇧", "Hold shift to type a capital letter."), S("Symbols", "!  ?  #", "Shift also changes number keys into symbols. Shift + 1 makes an exclamation mark."), S("Tip", "💡", "Let go of shift after the key.")]),
    L("Shortcuts", SHORT, [S("Shortcuts", "Ctrl", "A <b>shortcut</b> uses the Ctrl key plus a letter to do a job fast."), S("Copy and paste", "C · V", "Ctrl + C copies. Ctrl + V pastes."), S("Undo", "Z", "Ctrl + Z undoes your last step. Ctrl + S saves.")]),
    L("Inside the computer", INSIDE, [S("Inside", "🧠", "A computer has a processor, memory and storage inside."), S("What they do", "⚙️", "The <b>processor</b> is the brain. <b>Memory</b> holds what it is doing now. <b>Storage</b> keeps files."), S("Power", "🔋", "A computer needs power from a plug or a battery.")]),
    L("Hardware and software", hwsw, [S("Hardware", "⌨️", "<b>Hardware</b> is the parts of a computer you can touch."), S("Software", "📱", "<b>Software</b> is the programs that tell the computer what to do."), S("Tip", "💡", "Hardware you can hold. Software you cannot.")]),
    L("Mouse and touchpad", MOUSE3, [S("Mouse moves", "🖱️", "Right-click opens a menu. Hover means resting the pointer on something. A touchpad works like a mouse."), S("Drag and scroll", "✋", "Dragging moves things. Scrolling shows more of a page."), S("Tip", "💡", "Move slowly and gently.")]),
    L("Type 5 letter words", typeWord(W5, true), [S("Longer words", "🍎", "Now the words are longer: five letters."), S("Take your time", "🐢", "Spell it out loud, then type."), S("Tip", "💡", "Fingers go back home after every key.")]),
    L("Type sentences", typeSentence, [S("Sentences", "i see a cat", "Type each word, press the space bar, then the next word."), S("Fingers", "🖐️", "Keep your fingers on the home row."), S("Tip", "💡", "Accuracy first, speed later.")]),
    L("Which finger for each letter?", fingerOf("qwertyuiopasdfghjklzxcvbnm"), [S("All the letters", "🖐️", "Every key belongs to one finger."), S("Reach", "⬆️⬇️", "Each finger reaches up or down from its home key."), S("Tip", "💡", "Find the closest home key.")]),
    L("Type the letters", typeKeys("qwertyuiopasdfghjklzxcvbnm", 4, 6), [S("Mixed letters", "Q W E R", "Now letters come from all over the keyboard."), S("Find them", "🔎", "Look for the key. Use the right finger."), S("Tip", "💡", "Go slowly and be right.")]),
    L("Folders", folderFor, [S("Folders", "📁", "Folders keep files tidy. Pictures go in a Pictures folder."), S("Examples", "🖼️🎵🎬📝", "Music goes in Music. Videos go in Videos. Writing goes in Documents."), S("Tip", "💡", "Think: what kind of file is it?")]),
    L("File types", fileType, [S("File endings", ".png", "The letters after the dot tell you the kind of file."), S("Common endings", "png · mp3 · txt · mp4", "png is a picture, mp3 is a song, txt is writing, mp4 is a video."), S("Tip", "💡", "Read the end of the name.")]),
    L("What is the internet?", NET, [S("The internet", "🌍", "The <b>internet</b> is computers all over the world connected together."), S("Websites", "🌐", "A <b>website</b> is a page you can visit. A <b>browser</b> is the program that lets you visit."), S("Ask first", "🙋", "Ask a parent before you go online or click new things.")]),
    L("Staying safe: ask first", SAFE3, [S("Private", "🔒", "Keep your name, school, address and photos private."), S("Strangers", "🙅", "Do not chat with people you do not know. Stop and tell a parent."), S("Tricks", "🎣", "Pop-ups that offer prizes can be tricks.")]),
    L("Strong passwords", SAFE2, [S("Strong passwords", "🔑", "Use long passwords with words and numbers."), S("Secret", "🤫", "Never tell a friend or stranger. Only your parents."), S("Different ones", "🔁", "Use a different password for each place.")]),
    L("Think before you post", PRINT, [S("Footprint", "👣", "What you post stays online for a long time. That is your <b>digital footprint</b>."), S("Pause", "⏸️", "Ask: is it kind? Is it true? Is it okay to share?"), S("Ask", "🙋", "Ask a parent before you share a photo.")]),
    L("Be kind online", KIND3, [S("Kindness", "💛", "Real people read your words."), S("Speak up", "📢", "If someone is being picked on, tell a grown-up."), S("Tip", "💡", "Be the friend you want to have.")]),
    L("Healthy screen time", SCREEN, [S("Balance", "⚖️", "Screens are fun, but we need other fun too."), S("Healthy habits", "🏃", "Take breaks, play outside, and sleep well."), S("Family rules", "👨‍👩‍👧", "Your family helps decide how much screen time is right.")]),
    L("When things go wrong", PROBLEM, [S("Stay calm", "😌", "Computers sometimes freeze or act strangely."), S("Ask for help", "🙋", "Tell a grown-up. Do not bang on it or click everything."), S("Pop-ups", "⚠️", "If a message tells you to call a number or give your name, tell a parent.")]),
    L("Mixed practice", mix(SHORT, INSIDE, hwsw, fingerOf("qwertyuiopasdfghjklzxcvbnm"), folderFor, NET, SAFE3), MIXS("Shortcuts, parts, fingers, folders, the internet and safety.")),
    L("Level 3 Challenge", mix(SHORT, INSIDE, hwsw, typeWord(W5, true), typeSentence, typeKeys("qwertyuiopasdfghjklzxcvbnm", 4, 6), fileType, folderFor, NET, SAFE2, PRINT, KIND3, SCREEN, PROBLEM), MIXS("Everything from level 3: computers, typing, files, the internet and staying safe and kind."))
  ];

  return { 1: L1, 2: L2, 3: L3 };
})();
