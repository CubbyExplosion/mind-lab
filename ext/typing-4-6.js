// ext/typing-4-6.js  Mind Lab Typing & Computers, levels 4-6 (60 lessons)
(() => {
  const sl = a => () => a.map(([h, v, t]) => ({ h, v, t }));
  const big = (t, s = 2) => `<span style="font-size:${s}em;font-weight:bold">${t}</span>`;
  // multiple choice from rows "question|answer|wrong1|wrong2"
  const mc = (title, vis, rows, hints, slides) => {
    const rs = rows.map(r => r.split("|"));
    const make = () => { const [text, ans, ...wr] = pick(rs); return { text, visual: vis, choices: shuf([ans, ...wr]), answer: ans, hints: hints.slice() }; };
    make.teach = sl(slides);
    return { title, make };
  };
  // type-it lessons: items are strings the child types
  const ty = (title, prompt, items, hints, slides, shown) => {
    const make = () => {
      const s = pick(items), n = s.split(" ").length;
      const h = hints.slice(); h[1] = h[1].replace("{n}", s.replace(/ /g, "").length).replace("{w}", n).replace("{f}", s[0]);
      return { text: prompt, visual: big(shown ? shown(s) : s, s.length > 14 ? 1.2 : 1.8), textInput: true, answer: s, hints: h };
    };
    make.teach = sl(slides);
    return { title, make };
  };
  // numeric makers: fn returns [text, answer, visual?]
  const num = (title, vis, fn, hints, slides) => {
    const make = () => { const [text, answer, v] = fn(); return { text, visual: v || vis, answer, hints: hints.slice() }; };
    make.teach = sl(slides);
    return { title, make };
  };
  const MIX = (title, ...ls) => {
    const f = () => pick(ls).make();
    f.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes ideas you already know. Here is a quick reminder of each one, then the quiz." }].concat(ls.map(l => l.make.teach()[0]));
    return { title, make: f };
  };
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

  // =============== LEVEL 4 ===============
  const A1 = ty("Top row words", "Type this word. Use the top row of letters.",
    ["tower", "write", "quiet", "pretty", "print", "route", "power", "type", "pipe", "toy", "pure", "outer", "report", "poetry", "equip"],
    ["Look at the word. Find each letter on the keyboard, one at a time.", "The word has {n} letters and starts with \"{f}\". Reach up from the home row for the top row letters.", "Example: for the word <b>wet</b>, reach up for W, then E, then T. Now type yours."],
    [["Reach up", "⬆️", "The top row is the row above the home row: <b>Q W E R T Y U I O P</b>."], ["Return home", "🏠", "After each reach, bring your finger <b>back to its home key</b>."], ["Tip", "💡", "Do not look at your hands. Look at the word on the screen."]]);
  const A2 = ty("Reach down", "Type this word. Some letters are on the bottom row.",
    ["zoom", "mix", "van", "bunch", "exam", "bank", "music", "cave", "next", "cabin", "movie", "black", "small", "vixen", "zebra"],
    ["Say the word, then find each letter on the keyboard.", "The word has {n} letters and starts with \"{f}\". The bottom row is Z X C V B N M.", "Example: for the word <b>van</b>, reach down for V, press A on the home row, then reach down for N. Now type yours."],
    [["Reach down", "⬇️", "The bottom row is below the home row: <b>Z X C V B N M</b>."], ["Which finger?", "🖐️", "Left hand: Z, X, C, V, B. Right hand: N and M. Use the same finger that rests above."], ["Tip", "💡", "Keep your other fingers resting on the home row."]]);
  const SENT4 = ["the cat sat on the mat.", "i can type with ten fingers.", "we go to school today.", "my dog likes to run fast.", "the sun is bright and warm.", "she reads a book at night.", "birds can fly in the sky.", "i like to build with blocks.", "the moon is far away.", "we eat lunch at noon."];
  const A3 = ty("Type a sentence", "Type this sentence. Press the space bar between words.", SENT4,
    ["Type one word at a time. Press the space bar after each word.", "There are {w} words. The first word starts with \"{f}\". Do not forget the period at the end.", "Example: for \"go to bed.\", type go, press space, type to, press space, type bed and the period. Now type yours."],
    [["Words and spaces", "⌨️", "Press the <b>space bar</b> with your thumb between every word."], ["The end mark", "🔚", "A sentence ends with a <b>period</b> (.). It is the key right of the comma key."], ["Tip", "💡", "Read the whole word, then type it. Do not type letter by letter."]], cap);
  const A4 = (() => {
    const make = () => { const n = ri(1000, 99999); return { text: "Type this number using the number row.", visual: big(n), answer: n, hints: ["Look at the digits from left to right and press them in order.", "Take your time and check each digit as you type it.", "Example: to type 7305, press 7, then 3, then 0, then 5. Now type yours."] }; };
    make.teach = sl([["Number row", "1️⃣", "The numbers 1 to 0 are in a row above the letters."], ["Fingers", "🖐️", "Each finger reaches up to its own number. Pointer fingers do 4, 5, 6 and 7."], ["Tip", "💡", "Read two or three digits at a time, then type them."]]);
    return { title: "Type big numbers", make };
  })();
  const A5 = mc("Punctuation marks", "❓", [
    "Which mark goes at the end of a question?|question mark|period|comma", "Which mark goes at the end of a telling sentence?|period|question mark|comma", "Which mark shows excitement, like <b>Wow</b>?|exclamation mark|period|comma",
    "Which mark goes between items in a list, like <b>red, blue, green</b>?|comma|period|question mark", "Which sentence needs a question mark at the end?|Where is my hat|My hat is red|I found my hat",
    "Which sentence needs a period at the end?|I love pizza|Do you love pizza|Wow, what a pizza", "Which sentence needs an exclamation mark at the end?|Watch out|The cat sat|We have a dog",
    "What is the name of the mark <b>.</b>?|period|comma|question mark", "What is the name of the mark <b>,</b>?|comma|period|exclamation mark"],
    ["Think about what the sentence is doing: asking, telling or shouting.", "A question asks something. A telling sentence states a fact. An exciting sentence shows strong feeling.", "Example: <b>Can we go</b> asks, so it ends with a question mark. <b>We can go</b> tells, so it ends with a period. Now do yours."],
    [["End marks", "❗", "Every sentence needs an ending: a <b>period (.)</b>, a <b>question mark (?)</b> or an <b>exclamation mark (!)</b>."], ["Where are they?", "⌨️", "The period and comma are next to the M key. The ? and ! are made with <b>Shift</b>."], ["Tip", "💡", "Read the sentence in your head. Does your voice go up like a question?"]]);
  const A6 = mc("Fix your mistakes", "🧹", [
    "You typed a wrong letter just now. Which key erases it?|Backspace|Enter|Tab", "Which key erases the letter AFTER the cursor?|Delete|Backspace|Shift",
    "You see a red wavy line under a word. What does it mean?|The word may be spelled wrong|The word is finished|The computer is off",
    "Which keys move the cursor to a mistake in the middle of a line?|arrow keys|F keys|Caps Lock", "You typed <b>teh</b> by mistake. What is the best thing to do?|erase it and type the word again|leave it|turn off the screen",
    "What should you do before you turn in your typing?|read it again and fix mistakes|nothing|type it twice", "Which key erases one letter at a time on the left?|Backspace|Space bar|Esc",
    "You can click in the text to move the cursor. Which tool do you use?|the mouse|the speaker|the printer"],
    ["Think about which key undoes a letter you just typed.", "Backspace takes away what is to the left of the cursor. Delete takes away what is to the right.", "Example: you typed <b>cax</b> but wanted <b>cat</b>. Press Backspace once, then type t. Now do yours."],
    [["Everyone makes mistakes", "🙂", "Real typists make mistakes too. They fix them quickly."], ["Backspace", "⌫", "<b>Backspace</b> erases the letter to the left of the cursor. <b>Delete</b> erases the letter to the right."], ["Check your work", "👀", "Read what you typed. Red wavy lines often show a spelling mistake."]]);
  const A7 = mc("Capital letters", "🔠", [
    "Which word needs a capital letter?<br><b>my friend lily is nice.</b>|lily|friend|nice", "Which word needs a capital letter?<br><b>We live in texas.</b>|texas|live|in",
    "Which word needs a capital letter?<br><b>Today is monday.</b>|monday|is|Today", "Which word needs a capital letter?<br><b>I like my dog max.</b>|max|like|dog",
    "Which word needs a capital letter?<br><b>Today i ran.</b>|i|ran|Today", "Which word needs a capital letter?<br><b>My name is ben.</b>|ben|name|is",
    "Which key do you hold to make a capital letter?|Shift|Tab|Enter", "Which letter must be a capital at the start of a sentence?|the first letter|the last letter|every letter",
    "Which key keeps ALL letters capital until you press it again?|Caps Lock|Shift|Tab"],
    ["Think about the first word of the sentence and any names in it.", "Capitals go on the first word of a sentence, on names of people, pets, places and days, and on the word I.", "Example: <b>she met sam on friday.</b> needs capitals on She, Sam and Friday. Now do yours."],
    [["When to use capitals", "🔠", "Use a capital for the <b>first word</b> of a sentence, for <b>names</b>, for <b>days</b>, and for the word <b>I</b>."], ["How to type one", "⌨️", "Hold <b>Shift</b> with one pinky and press the letter with the other hand."], ["Tip", "💡", "Do not use Caps Lock for one letter. It is easy to forget it is on."]]);
  const A8 = mc("Copy and paste", "📋", [
    "Which shortcut copies something? (Ctrl means the Control key)|Ctrl + C|Ctrl + V|Ctrl + X", "Which shortcut pastes what you copied?|Ctrl + V|Ctrl + C|Ctrl + P",
    "Which shortcut cuts, which means takes it away to move it?|Ctrl + X|Ctrl + C|Ctrl + S", "What does copy do?|makes a second copy and keeps the first|erases the first|turns off the computer",
    "What does paste do?|puts the copied thing in a new place|erases the page|prints the page", "You want to repeat a word. What do you do?|copy it, then paste it|erase it|close the window",
    "What do you do before you copy a word?|select it first|turn the screen off|print it", "Which shortcut selects everything on a page?|Ctrl + A|Ctrl + Z|Ctrl + P"],
    ["Think about what each letter in the shortcut could stand for.", "Copy, Paste and Cut sit side by side near the left hand: X, C and V.", "Example: to move a word, select it, cut it, click a new spot and paste it. Now do yours."],
    [["Copy", "📄📄", "Select something, then press <b>Ctrl + C</b>. The first one stays where it was."], ["Paste", "📋", "Click where you want it and press <b>Ctrl + V</b>."], ["Cut", "✂️", "<b>Ctrl + X</b> cuts it away so you can paste it somewhere else."]]);
  const A9 = mc("Undo and save", "💾", [
    "Which shortcut undoes your last step?|Ctrl + Z|Ctrl + S|Ctrl + P", "Which shortcut saves your work?|Ctrl + S|Ctrl + Z|Ctrl + X",
    "You erased a sentence by mistake. What do you press?|Ctrl + Z|Ctrl + P|Esc", "Why should you save your work often?|so you do not lose it|to make it louder|to make it bigger",
    "What happens if the power goes out and you did not save?|you may lose your work|nothing ever happens|the work gets longer", "Which shortcut prints a page?|Ctrl + P|Ctrl + S|Ctrl + A",
    "Which one is a good habit?|save every few minutes|never save|save once a week", "Where can a saved file stay?|on the computer or in the cloud|inside the keyboard|inside the mouse"],
    ["Think about the job: keeping your work safe, or taking back a step.", "One shortcut goes back a step. Another one keeps your work. A third sends it to the printer.", "Example: you pasted a word in the wrong place. Press Ctrl + Z to undo it. Now do yours."],
    [["Undo", "↩️", "<b>Ctrl + Z</b> takes back your last step. You can press it many times."], ["Save", "💾", "<b>Ctrl + S</b> saves your work so it is safe."], ["Habit", "⏱️", "Save <b>often</b>. Then a surprise will not cost you your work."]]);
  const A10 = mc("Windows and buttons", "🪟", [
    "Which button closes a window? It looks like an X.|the X button|the minus button|the square button", "Which button hides a window to the bottom bar for later?|minimize (the minus)|close (the X)|print",
    "Which button makes a window fill the whole screen?|maximize (the square)|minimize (the minus)|close (the X)", "A window is the box that shows ___|a program or a page|the inside of the mouse|a cable",
    "Where are these three buttons usually found?|in the top corner of the window|under the keyboard|on the speaker", "Can you have two windows open at once?|yes|no",
    "How do you move a window?|drag its top bar|shake the mouse|press Enter", "You want to see two programs at once. What can you do?|open two windows|use only one key|unplug the mouse"],
    ["Look at the top corner of a window. Think about what each little button looks like.", "A minus hides the window, a square makes it big, and an X closes it for good.", "Example: to put a drawing aside for a moment, click the minus. To finish with it, click the X. Now do yours."],
    [["What is a window?", "🪟", "A <b>window</b> is a box on the screen that shows a program. You can have many open."], ["Three buttons", "➖ ⬜ ❌", "<b>Minus</b> hides it. <b>Square</b> makes it big. <b>X</b> closes it."], ["Move it", "🖱️", "Click the top bar and <b>drag</b> to move a window."]]);
  const A11 = mc("The desktop", "🖥️", [
    "What is the desktop?|the main screen where your icons are|the keyboard|a kind of cable", "What is an icon?|a small picture that stands for a program or file|a loud sound|a keyboard key",
    "How do you open a program from an icon on the desktop?|double-click it|blow on it|press Esc", "Where is the taskbar usually?|along the bottom of the screen|inside the mouse|on the back of the screen",
    "What does the taskbar show?|the programs that are open|your homework grade|the weather only", "What is the recycle bin for?|files you do not need|your favorite games|new pictures",
    "Which of these is a program icon you might click?|a drawing app|a mouse pad|a power cable", "What is a good way to keep the desktop tidy?|put files in folders|put everything on it|hide the screen"],
    ["Think about a real desk. What do you keep on top?", "The desktop holds icons. The taskbar is a strip that shows what is open.", "Example: to start a paint program, double-click its icon. Now do yours."],
    [["Desktop", "🖥️", "The <b>desktop</b> is the first screen you see. It holds icons."], ["Icons", "🖼️", "An <b>icon</b> is a small picture. Double-click it to open a program or file."], ["Taskbar", "▭", "The <b>taskbar</b> at the bottom shows the programs that are open."]]);
  const A12 = mc("Files and folders", "📁", [
    "What is a file?|one saved piece of work|a kind of cable|a computer part", "What is a folder?|a place that holds files|a type of mouse|a screen",
    "Where would a file called <b>spelling-test</b> belong?|in a School folder|in the speaker|in the mouse", "A folder can hold ___|files and other folders|only one letter|nothing at all",
    "Why use folders?|to keep files tidy and easy to find|to make the screen dim|to slow the computer", "Which is a file?|a drawing you saved|the keyboard|the monitor",
    "Where do your saved pictures go?|into a folder|into the speaker|into the mouse", "A folder inside a folder is called ___|a subfolder|a super key|a window"],
    ["Think about a real paper folder. What do you put inside?", "Files are single pieces of work. Folders hold files to keep them in order.", "Example: a folder named Pets might hold files called dog-photo and cat-story. Now do yours."],
    [["File", "📄", "A <b>file</b> is one saved thing: a story, a picture, a song."], ["Folder", "📁", "A <b>folder</b> holds files so they are easy to find."], ["Inside a folder", "📂", "A folder can hold other folders too. They are called <b>subfolders</b>."]]);
  const A13 = mc("Good file names", "🏷️", [
    "Which is the best name for a story about a dragon?|dragon-story|stuff1|asdf", "Which is the best name for your math homework?|math-homework|new file|xyz",
    "Which name is clearest?|Beach-trip-photos|pictures2|thing", "Which is the best name for a letter to Grandma?|letter-to-grandma|doc|aaa",
    "A good file name tells you ___|what is inside|nothing|only the color of the screen", "Which is a better name?|science-report|file|untitled-untitled",
    "Which name would be hard to find later?|abc123|animal-report|lunch-menu", "Why do we give files clear names?|so we can find them later|to hide them from ourselves|to use more letters"],
    ["Think about finding the file next week. What name would help you?", "A good name says what the file is about, using real words.", "Example: <b>frog-life-cycle</b> is better than <b>stuff</b>, because it tells you what is inside. Now do yours."],
    [["Clear names", "🏷️", "Give each file a name that says <b>what it is</b>."], ["Use dashes", "➖", "Use a dash between words: <b>my-big-story</b>."], ["Avoid", "🚫", "Names like <b>asdf</b> or <b>new file</b> are hard to find later."]]);
  const A14 = mc("The web browser", "🌐", [
    "What is a web browser?|a program for visiting websites|a kind of keyboard|a game controller", "What is a website?|a place on the internet with pages to read|a part inside the mouse|a speaker",
    "Where do you type a web address?|in the address bar|on the taskbar|in the recycle bin", "Which button takes you to the page you saw before?|the back button|the close button|the print button",
    "What is a tab in a browser?|one page you have open|a keyboard key only|a cable", "What does the reload button do?|loads the page again|turns off the computer|closes all windows",
    "Which one is a web address?|www.example.com|Ctrl + C|a power cable", "What is the internet?|computers all over the world joined together|a single big computer|a game"],
    ["Think about how you get from one page to another on the web.", "A browser is the program. The address bar is where an address is typed. Back returns to the last page.", "Example: you click a link by mistake. Press the back button to return. Now do yours."],
    [["Browser", "🌐", "A <b>browser</b> is the program you use to visit websites."], ["Address bar", "⌨️", "Type a web address in the <b>address bar</b> at the top."], ["Back and tabs", "◀️", "<b>Back</b> goes to the last page. A <b>tab</b> keeps another page open."]]);
  const A15 = mc("Taps and swipes", "📱", [
    "What do you do to choose something on a tablet?|tap it|shout at it|press the speaker", "What is a swipe?|sliding your finger across the screen|knocking on the screen|blinking at the screen",
    "How do you scroll a page on a tablet?|swipe up or down|tap the camera|shake the tablet hard", "How can you make a picture bigger on a touch screen?|spread two fingers apart|knock on it|blow on it",
    "How can you make a picture smaller?|pinch two fingers together|press the camera|tap the back", "How should you hold a tablet?|with two hands and care|by one corner while running|over a puddle",
    "What should you do before touching a screen?|make sure your hands are clean|lick your fingers|wet your hands", "Should you throw a tablet?|no|yes"],
    ["Think about what your fingers do on a touch screen.", "A tap is a quick touch. A swipe is a slide. A pinch uses two fingers.", "Example: to see the bottom of a long page, swipe up. Now do yours."],
    [["Tap", "👆", "A <b>tap</b> is a quick touch. It works like a click."], ["Swipe", "👉", "A <b>swipe</b> slides your finger to scroll or turn a page."], ["Pinch", "🤏", "Spread two fingers to <b>zoom in</b>. Pinch them together to <b>zoom out</b>."]]);
  const A16 = mc("Strong passwords", "🔑", [
    "Which password is the strongest?|Purple-Bear-83-River|1234|password", "Who should know your password?|you and your parents|everyone at school|anyone who asks",
    "Which is a weak password?|your own name|a long mix of random words and numbers|Blue-Moon-27-Cloud", "A friend asks for your password. What do you do?|say no kindly|tell them|write it on their hand",
    "Where is a safe place to keep a password?|with a parent, not on a visible note|on a poster on your wall|in a chat message", "A strong password is ___|long and hard to guess|short and easy|your birthday",
    "Should you use the same password everywhere?|no|yes", "Which one has a mix of letters and numbers?|Tiger-Sun-52-Lake|tiger|sun"],
    ["Think about how easy the password would be for someone else to guess.", "Strong passwords are long, use a mix of words and numbers, and are never shared with friends.", "Example: <b>Green-Frog-61-Hill</b> is strong. <b>frog</b> is weak. Now do yours."],
    [["Strong", "💪", "A strong password is <b>long</b> and uses <b>words, capitals and numbers</b>."], ["Secret", "🤐", "Only you and your <b>parents</b> should know it."], ["Different", "🔑", "Use a <b>different password</b> for each important place."]]);
  const A17 = mc("Kind messages", "💬", [
    "A friend made a mistake in your game. What do you write?|No worries, try again!|You are the worst!|Go away", "You want to ask for help. What is the polite way?|Could you help me, please?|Help me now!!!|Hey you",
    "Why should you read your message before you send it?|to make sure it is kind and clear|to make it longer|to hide it", "Which message is kind?|Great job on your drawing!|Your drawing is awful|Who cares",
    "Is typing in ALL CAPITAL LETTERS usually friendly?|no, it can look like shouting|yes always|only on Fridays", "Someone writes something mean to you. What should you do?|tell a parent or teacher|write something meaner|hide it forever",
    "Should you say things online that you would not say in person?|no|yes", "Which words are polite?|please and thank you|give me that|hurry up"],
    ["Think about how the other person will feel when they read it.", "Kind words are clear, polite and cheerful. Capital letters for a whole message can feel like shouting.", "Example: instead of \"That is dumb\", write \"I think we could try this\". Now do yours."],
    [["Read first", "👀", "Read your message before you send it. Is it kind?"], ["Use polite words", "🙏", "Say <b>please</b> and <b>thank you</b>. Be friendly."], ["Mean messages", "🛑", "If someone is mean, do not write back. <b>Tell a parent or teacher.</b>"]]);
  const A18 = mc("When tech goes wrong", "🛠️", [
    "A program is stuck. What is a good first step?|wait a moment, then ask a grown-up|bang on the keyboard|spill water on it", "The screen is black. What should you check first?|that it is plugged in and turned on|that it is raining|the color of the mouse",
    "The sound does not work. What should you check?|the volume|the size of the screen|the keyboard letters", "Should you pull on cables hard if something is stuck?|no, ask a grown-up|yes|yes, as hard as you can",
    "A pop-up appears that you do not understand. What do you do?|ask a grown-up before clicking|click everything|type your name", "Restarting a computer can sometimes ___|fix small problems|break the keyboard|make it a toy",
    "You spilled a drink near the keyboard. What do you do?|tell a grown-up right away|keep typing|hide it", "Why should you ask for help?|they can fix it safely|they like to be bothered|it does not matter"],
    ["Think about the safest first step. Do not rush.", "Check the easy things first, like power and volume. If you are not sure, ask a grown-up.", "Example: no sound from the speakers? Check that the volume is not on mute. Now do yours."],
    [["Stay calm", "😌", "Problems happen to everyone. Take a breath."], ["Check simple things", "🔌", "Is it <b>plugged in</b>? Is the <b>volume</b> up?"], ["Ask for help", "🙋", "If you are unsure, <b>ask a grown-up</b>. Never force or pull on parts."]]);
  const L4 = [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18,
    MIX("Mixed practice", A1, A3, A5, A6, A7, A8, A9, A10, A12, A14, A16, A17),
    MIX("Level 4 Challenge", A2, A4, A6, A8, A9, A11, A13, A14, A15, A16, A17, A18)];

  // =============== LEVEL 5 ===============
  const B1 = ty("Home row speed words", "Type this word. Keep your fingers on the home row.",
    ["flash", "salad", "glad", "shall", "dash", "flask", "hall", "falls", "alas", "adds", "skid", "lads", "dads", "fads", "slash"],
    ["Rest your fingers on A S D F and J K L ;. Type the word slowly.", "The word has {n} letters and starts with \"{f}\". Use the finger that belongs to each key.", "Example: for the word <b>sad</b>, the left ring finger presses S, the left pinky A and the left middle finger D. Now type yours."],
    [["Home row", "🏠", "Your fingers rest on <b>A S D F</b> and <b>J K L ;</b>."], ["Speed comes later", "🐢", "First type <b>slowly and correctly</b>. Speed grows from practice."], ["Feel the keys", "👇", "Little bumps on <b>F</b> and <b>J</b> help you find home without looking."]]);
  const SENT5 = ["a quick brown fox jumps over the lazy dog.", "the little bird sings a song every morning.", "we plant seeds in the garden each spring.", "my friend and i built a tall tower.", "it is fun to learn how to type fast.", "the train rolls down the long, quiet track.", "please close the door when you leave.", "i will practice my typing every day.", "the library has books about space.", "our class has a pet fish named bubbles."];
  const B2 = ty("Type longer sentences", "Type this sentence. Keep a steady pace.", SENT5,
    ["Read a few words ahead, then type them. Keep your eyes on the screen.", "The sentence has {w} words and starts with \"{f}\". Do not forget the space bar between words.", "Example: for \"we can play.\", type we, space, can, space, play, then the period. Now type yours."],
    [["Rhythm", "🥁", "Type with an even beat, like tapping a drum."], ["Eyes up", "👀", "Keep your eyes on the <b>screen</b>, not on your fingers."], ["Space bar", "➖", "Hit the space bar with your <b>thumb</b> after each word."]], cap);
  const B3 = num("Words per minute", "⏱️", () => { const m = ri(2, 5), r = ri(8, 30); return [`Mia typed <b>${m * r}</b> words in <b>${m}</b> minutes. How many words per minute did she type?`, r]; },
    ["Words per minute means how many words in just one minute.", "Share the words equally over the minutes. Divide.", "Example: 40 words in 2 minutes. 40 divided by 2 is 20 words per minute. Now do yours."],
    [["WPM", "⏱️", "<b>WPM</b> means words per minute. It tells you how fast you type."], ["How to find it", "➗", "Divide the number of words by the number of minutes."], ["Example", "📝", "30 words in 3 minutes is <b>10 WPM</b>, because 30 ÷ 3 = 10."]]);
  const B4 = num("Typing accuracy", "🎯", () => { const n = ri(20, 60), e = ri(1, 9); return [`Sam typed <b>${n}</b> words and made <b>${e}</b> mistakes. How many words were right?`, n - e]; },
    ["Accuracy is about how many things you got right.", "Take away the mistakes from the words typed.", "Example: 30 words typed with 4 mistakes is 30 take away 4, which is 26 right. Now do yours."],
    [["Accuracy", "🎯", "<b>Accuracy</b> means how many words you typed correctly."], ["Count", "🧮", "Right words = words typed minus mistakes."], ["Goal", "🌟", "Aim for few mistakes. Then you can go faster."]]);
  const B5 = mc("Slow and sure", "🐢", [
    "What should a new typist work on first?|accuracy|speed only|typing with one finger", "Which is better?|correct and steady|fast with many mistakes|looking at the keys all the time",
    "How do you get faster?|practice a little every day|never practice|type with two fingers", "How long can a good practice be for a kid?|about 10 to 15 minutes|8 hours|one second",
    "What does touch typing mean?|typing without looking at the keys|typing on a touch screen only|typing very loudly", "Why look at the screen and not the keys?|you find mistakes faster|the keys are boring|the keys are hidden",
    "When you make a mistake, you should ___|fix it and keep going|give up|slam the keyboard", "What helps your wrists?|keeping them relaxed and flat|bending them up high|pressing hard"],
    ["Think about what makes typing good before it makes it fast.", "Speed is built on correct habits. Correct typing ends up faster, because you do not have to fix as much.", "Example: a typist who makes 10 mistakes spends time fixing them, so careful typing can be faster. Now do yours."],
    [["Accuracy first", "🎯", "Good typing is <b>correct</b> first, then fast."], ["Touch typing", "🙈", "Look at the <b>screen</b>. Your fingers learn where the keys are."], ["Little and often", "📅", "A few minutes every day beats one long day."]]);
  const B6 = mc("Bold, italic, underline", "🅱️", [
    "Which button makes text thick and dark?|B (bold)|I (italic)|U (underline)", "Which button makes text slanted?|I (italic)|B (bold)|U (underline)",
    "Which button puts a line under text?|U (underline)|B (bold)|I (italic)", "Which shortcut makes text bold?|Ctrl + B|Ctrl + I|Ctrl + U", "Which shortcut makes text italic?|Ctrl + I|Ctrl + B|Ctrl + S",
    "What should you do before you make a word bold?|select the word|erase the word|close the window", "Is it a good idea to make every word bold?|no, use it for important words|yes|only on Mondays",
    "Which shortcut underlines text?|Ctrl + U|Ctrl + B|Ctrl + I"],
    ["Look at each button. Its letter is the first letter of the word.", "One letter for thick letters, one for slanted, one for a line below. You can also use Ctrl with that letter.", "Example: to make the word <b>Warning</b> stand out, select it and press the bold shortcut. Now do yours."],
    [["Bold", "B", "<b>Bold</b> makes letters thick and dark. Ctrl + B."], ["Italic", "I", "<i>Italic</i> makes letters lean. Ctrl + I."], ["Underline", "U", "<u>Underline</u> draws a line below. Ctrl + U."]]);
  const B7 = mc("Fonts, size and color", "🎨", [
    "What is a font?|the style of the letters|a type of mouse|a cable", "Which setting makes letters bigger?|font size|file name|volume", "Which is easiest to read in a story?|a plain, clear font|tiny curly letters in neon|letters the same color as the page",
    "What happens if text and background are the same color?|you cannot read it|it looks perfect|it gets louder", "A title usually is ___|bigger than the rest|invisible|the smallest text",
    "Which size is easier to read?|12 or bigger|2|0", "Which color text is easiest to read on white paper?|black|white|very pale yellow", "Why not use many fonts in one page?|it looks messy|it breaks the computer|it is not allowed"],
    ["Think about how easy it would be for someone to read the text.", "Clear fonts, a good size and dark text on a light page make reading easy.", "Example: black text on a white page is easy to read. Light gray text on white is not. Now do yours."],
    [["Font", "🔤", "A <b>font</b> is the style of the letters."], ["Size", "🔎", "<b>Font size</b> makes letters bigger or smaller. Titles are bigger."], ["Color", "🌈", "Pick colors that are easy to read. Dark on light works well."]]);
  const B8 = mc("Word processor tools", "📝", [
    "What is a word processor?|a program for writing documents|a kitchen tool|a game console", "What does the red wavy line under a word mean?|it might be spelled wrong|the word is great|the word is a name",
    "What does centering text do?|puts it in the middle|makes it bold|makes it tiny", "What does the Enter key do?|starts a new line or paragraph|erases the page|prints", "What is a paragraph?|a group of sentences about one idea|one letter|a mouse",
    "What does the Save button do?|keeps your document|erases your document|turns the page blue", "Where do you often find the Print option?|in the File menu|in the speaker|on the mouse", "What is a title?|the name of your document at the top|the last line|the page number"],
    ["Think about what each part of a document is used for.", "A word processor helps you write. Menus hold options such as Save and Print.", "Example: to start a new paragraph, press Enter and begin on the next line. Now do yours."],
    [["Write", "📝", "A <b>word processor</b> helps you write letters, stories and reports."], ["Tools", "🧰", "Find <b>Save</b> and <b>Print</b> in the <b>File</b> menu."], ["Spell check", "🔴", "A red wavy line says a word may be <b>spelled wrong</b>. Check it!"]]);
  const B9 = mc("Select, cut and paste", "✂️", [
    "How do you select one word with the mouse?|double-click it|press Esc|tap the speaker", "How do you select a whole line?|click and drag across it|press the power button|type the line twice",
    "Which shortcut selects everything?|Ctrl + A|Ctrl + C|Ctrl + P", "After you select text, which shortcut copies it?|Ctrl + C|Ctrl + V|Ctrl + X", "Which shortcut removes the text so you can move it?|Ctrl + X|Ctrl + C|Ctrl + A",
    "You cut a sentence. Where is it now?|waiting to be pasted|gone forever|inside the speaker", "What are the steps to move a word?|select, cut, click new spot, paste|print, close, open|erase, shout, save",
    "What does Ctrl + V do?|pastes|prints|selects all"],
    ["Think of the steps in order: choose, take, put.", "First select. Then cut or copy. Then click a spot and paste.", "Example: to move the word <b>blue</b>: select it, press Ctrl + X, click a new spot, press Ctrl + V. Now do yours."],
    [["Select", "🖱️", "Double-click a word, or drag across text, to <b>select</b> it."], ["Cut or copy", "✂️", "<b>Ctrl + X</b> cuts it. <b>Ctrl + C</b> copies it."], ["Paste", "📋", "Click a new place and press <b>Ctrl + V</b>."]]);
  const B10 = mc("Handy shortcuts", "⚡", [
    "Which shortcut undoes?|Ctrl + Z|Ctrl + P|Ctrl + S", "Which shortcut saves?|Ctrl + S|Ctrl + Z|Ctrl + B", "Which shortcut prints?|Ctrl + P|Ctrl + S|Ctrl + I", "Which shortcut makes text bold?|Ctrl + B|Ctrl + C|Ctrl + Z",
    "Which shortcut finds a word on the page?|Ctrl + F|Ctrl + V|Ctrl + S", "Which shortcut selects everything?|Ctrl + A|Ctrl + X|Ctrl + P", "Why use shortcuts?|they save time|they break the keyboard|they turn off the screen",
    "Ctrl is short for ___|Control|Cursor|Copy"],
    ["Remember that the letter often matches the job.", "Save, Print, Bold and Find all use the first letter of their name. Z undoes the last step.", "Example: to find the word <b>apple</b> on a long page, press Ctrl + F and type apple. Now do yours."],
    [["Ctrl key", "⌨️", "<b>Ctrl</b> means Control. Hold it, then tap a letter."], ["Easy to remember", "🧠", "<b>S</b>ave, <b>P</b>rint, <b>B</b>old, <b>F</b>ind."], ["Faster", "🚀", "Shortcuts save you trips to the mouse."]]);
  const COLS = "ABCDE".split("");
  const B11 = (() => {
    const make = () => {
      const c = pick(COLS), r = ri(1, 6), ans = c + r;
      const wr = new Set(); while (wr.size < 2) { const w = pick(COLS) + ri(1, 6); if (w !== ans) wr.add(w); }
      return { text: `A spreadsheet cell is in <b>column ${c}</b> and <b>row ${r}</b>. What is its name?`, visual: "📊", choices: shuf([ans, ...wr]), answer: ans,
        hints: ["A cell name has a letter and a number.", "The letter is the column. The number is the row. The column comes first in the name.", "Example: column B and row 2 is the cell B2. Now do yours."] };
    };
    make.teach = sl([["Spreadsheet", "📊", "A <b>spreadsheet</b> is a grid of boxes called <b>cells</b>."], ["Columns and rows", "↔️ ↕️", "<b>Columns</b> go up and down and have letters. <b>Rows</b> go across and have numbers."], ["Cell names", "🏷️", "A cell is named by its column and row, like <b>C3</b>."]]);
    return { title: "Spreadsheet cells", make };
  })();
  const B12 = num("Adding in a spreadsheet", "➕", () => { const a = ri(2, 20), b = ri(2, 20), c = ri(2, 20); return [`Cell A1 has <b>${a}</b>. Cell A2 has <b>${b}</b>. Cell A3 has <b>${c}</b>. What does a SUM of A1 to A3 show?`, a + b + c]; },
    ["A SUM adds up all the numbers in the cells.", "Add the three numbers together.", "Example: if the cells hold 2, 3 and 4, the sum is 9. Now do yours."],
    [["Formula", "🧮", "A <b>formula</b> starts with an equals sign, like <b>=SUM(A1:A3)</b>."], ["SUM", "➕", "<b>SUM</b> adds up the numbers in the cells you pick."], ["A1:A3", "📏", "The colon means <b>from A1 to A3</b>, with all cells in between."]]);
  const B13 = mc("Website addresses", "🔗", [
    "What is a web address also called?|a URL|a USB|a PDF", "Which part of this address is the site name?<br><b>www.zoo.com</b>|zoo|www|com", "What does the www in an address stand for?|World Wide Web|Windows Wide Window|Water Wind Wave",
    "Which address ending is usually for schools?|.edu|.zip|.toy", "Can an address have spaces in it?|no|yes", "Where do you type a web address?|in the address bar|in the keyboard|on the screen's edge",
    "Which is a web address?|www.library.org|library|Ctrl + L", "Why should a grown-up check unknown links?|some are not safe|they are always safe|links are never real"],
    ["Think about how a web address is built. It has parts separated by dots.", "The dots split an address into parts: a name in the middle and an ending such as com or org.", "Example: in <b>www.books.org</b>, the site name is <b>books</b>. Now do yours."],
    [["URL", "🔗", "A <b>URL</b> is a web address. It tells the browser where to go."], ["Parts", "🧩", "<b>www.name.com</b>: the name is in the middle, and the ending is <b>.com</b>, <b>.org</b> or <b>.edu</b>."], ["Careful", "⚠️", "Type addresses carefully. Ask a grown-up before visiting a new site."]]);
  const B14 = mc("Smart searching", "🔎", [
    "Which search words work best to find facts about whales?|how big is a blue whale|stuff|whale", "Key words are ___|the most important words|all the words|silly words",
    "You want to learn about volcanoes. Which is the better search?|how do volcanoes erupt|things|I want something", "What should you do if a result looks strange?|do not click, ask a grown-up|click it fast|download it",
    "Why check more than one result?|to be sure the facts match|to make the page louder|to type more", "Which words are the key words?<br><b>how do bees make honey</b>|bees and honey|how and do|make only",
    "A search page gives you ___|a list of links|a finished homework|a free game for sure", "Who should help you decide what is safe?|a parent or teacher|a stranger|a pop-up"],
    ["Think about the few words that tell the topic.", "Short, clear key words work better than a long chat. Look for the topic words.", "Example: to learn about pandas, search <b>what do pandas eat</b>. Now do yours."],
    [["Key words", "🔑", "<b>Key words</b> are the main words about your topic."], ["Check", "✅", "Look at <b>more than one</b> result to check the facts."], ["Safe", "🛡️", "If something looks odd, <b>do not click</b>. Ask a grown-up."]]);
  const B15 = mc("Email basics", "📧", [
    "What is email?|a message sent by computer|a letter on paper only|a cable", "In an email, who goes in the To box?|the person you send it to|your favorite food|the subject",
    "What is the Subject line?|a short title of what the email is about|the name of the computer|the sender's picture", "Should you open an email from a stranger?|no, tell a parent|yes|only at night",
    "What should you start an email with?|a greeting like Hello|nothing at all|a mean word", "What does Send do?|sends the message|erases it|prints it", "Should you share your password in an email?|never|always|sometimes",
    "A good subject line for a note about a party is ___|Birthday party on Saturday|Hi|asdf"],
    ["Think about what each box in an email is for.", "To holds the receiver. Subject is a short title. The big box holds the message.", "Example: the To box holds your teacher's address; the Subject might say <b>Question about homework</b>. Now do yours."],
    [["Parts", "📧", "An email has <b>To</b>, <b>Subject</b> and a message."], ["Be polite", "🙂", "Start with a greeting and end with your name."], ["Safety", "🛡️", "Never open emails from <b>strangers</b>. Tell a parent."]]);
  const B16 = mc("Private information", "🔒", [
    "Which is private?|your home address|your favorite color|a cartoon you like", "Which can you share safely with a friend you know?|a joke|your password|your address online",
    "Should you post your phone number online?|no|yes", "A game asks for your real name. What do you do?|ask a parent first|type it right away|tell all your friends", "Which is private?|your school name|the weather|the sky",
    "Which is NOT private information?|a joke you like|your birthday and town|your address", "Who can help you decide what is safe to share?|a parent|a stranger|a pop-up", "A photo of you is ___|private, ask a parent before sharing|fine to send to anyone|a password"],
    ["Think about whether a stranger could use the information to find you.", "Private information tells who you are or where you are: name, address, school, phone, photos and passwords.", "Example: sharing your street name online is not safe, but sharing your favorite animal is fine. Now do yours."],
    [["Private", "🔒", "Your <b>address, school, phone number, photos</b> and <b>passwords</b> are private."], ["Safe to share", "😊", "Fun facts like your favorite animal are okay."], ["Ask first", "🙋", "If a site asks for details, <b>ask a parent</b>."]]);
  const B17 = mc("Strangers online", "🚫", [
    "A person you do not know sends you a message. What do you do?|do not answer, tell a parent|answer and tell them about you|send a photo", "Someone online says: keep this a secret. What do you do?|stop and tell a parent|keep the secret|send your address",
    "A player offers you gifts or money. What do you do?|stop replying and tell a parent|say yes|give your name", "Someone asks to talk in a private chat. What do you do?|tell a parent, do not go|go right away|share your number",
    "An online friend asks where you live. What do you do?|do not answer, tell a parent|tell them the street|tell them your town", "Is every person online who they say they are?|no|yes always",
    "Who should know about strange messages?|a parent|nobody|a stranger", "What is the best thing to do when someone makes you feel uneasy online?|stop and tell a grown-up|keep chatting|hide it"],
    ["Think about whether you know this person in real life.", "People online can pretend. Never share details, and tell a parent right away if someone asks for them.", "Example: a stranger says hello in a game chat. Do not answer; tell a parent. Now do yours."],
    [["Not everyone is real", "🎭", "People online may <b>pretend</b> to be someone else."], ["Warning signs", "🚩", "Asking for details, private chats, gifts, or secrets are <b>warning signs</b>."], ["What to do", "🛑", "<b>Stop replying</b> and <b>tell a parent</b> straight away."]]);
  const B18 = mc("Being a good digital friend", "🤝", [
    "A friend posts a drawing. What is a kind comment?|I love the colors!|That's ugly|Nobody cares", "Is it okay to share a funny photo of a classmate without asking?|no|yes",
    "Someone is being picked on online. What can you do?|tell a grown-up and be kind|join in|ignore everything", "Before posting, ask yourself ___|is it kind and true|is it mean enough|will it get likes",
    "Which is cyberbullying?|sending mean messages again and again|saying thank you|sharing a joke", "What is a good way to disagree?|politely say what you think|insult them|shout in capitals",
    "You are upset in a chat. What do you do first?|take a break|send an angry message|post it everywhere", "Good digital friends ___|treat people the way they like to be treated|copy other people's work|hide mean notes"],
    ["Think about how the other person would feel.", "Be kind, be honest, and ask before sharing someone's photo. If you see meanness, tell an adult.", "Example: your friend's story has a spelling mistake. Say it kindly, in private, not in front of others. Now do yours."],
    [["Think first", "🤔", "Before you post, ask: is it <b>kind</b>? Is it <b>true</b>?"], ["Ask first", "📸", "Ask before sharing a <b>photo</b> of someone else."], ["Speak up", "📢", "If someone is hurt online, <b>tell a grown-up</b>."]]);
  const L5 = [B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17, B18,
    MIX("Mixed practice", B1, B3, B4, B6, B8, B9, B10, B11, B13, B16, B17, B18),
    MIX("Level 5 Challenge", B2, B3, B5, B7, B9, B10, B12, B14, B15, B16, B17, B18)];

  // =============== LEVEL 6 ===============
  const SENT6 = ["practice makes your fingers fast and sure.", "the museum had a giant model of the solar system.", "in the spring, the rain helps flowers grow.", "she wrote a short story about a brave little robot.", "our team finished the science project on time.", "a good typist keeps eyes on the screen.", "the bridge over the river was very long.", "he saved his work before closing the file.", "we can learn something new each day.", "turn the page and read the next chapter."];
  const C1 = ty("Type longer text", "Type this sentence. Aim for steady and correct.", SENT6,
    ["Read a few words ahead. Keep your fingers on the home row between words.", "The sentence has {w} words and starts with \"{f}\". Watch the commas and the period at the end.", "Example: for \"we run, jump and play.\", type each word, press the comma key after run, and finish with a period. Now type yours."],
    [["Look ahead", "👀", "Read a little way <b>ahead</b> of what you are typing."], ["Keep a rhythm", "🥁", "Even beats make fewer mistakes than quick bursts."], ["Check", "✅", "Read what you typed. Fix any red wavy lines."]], cap);
  const SYM = [["!", "1"], ["@", "2"], ["#", "3"], ["$", "4"], ["%", "5"], ["&", "7"], ["*", "8"], ["(", "9"], [")", "0"]];
  const C2 = (() => {
    const make = () => {
      const [s, k] = pick(SYM), wr = shuf(SYM.filter(x => x[1] !== k)).slice(0, 2).map(x => x[1]);
      return { text: `Hold Shift and press a number key to type the symbol <b>${s}</b>. Which number key is it?`, visual: big(s), choices: shuf([k, ...wr]), answer: k,
        hints: ["The symbols sit right above the number keys on the top row.", "Look at the number row: each key has a number and a symbol. Shift makes the symbol.", "Example: Shift with the 6 key types the ^ sign. Now find yours."] };
    };
    make.teach = sl([["Two jobs", "⌨️", "Each number key has a <b>symbol</b> above it. Hold <b>Shift</b> to type the symbol."], ["Common ones", "! @ # $ %", "<b>!</b> is Shift + 1. <b>@</b> is Shift + 2. <b>$</b> is Shift + 4."], ["Where is it used?", "📧", "<b>@</b> is in email addresses. <b>$</b> is for money. <b>%</b> is for percent."]]);
    return { title: "Symbols with Shift", make };
  })();
  const C3 = mc("Numbers on the keypad", "🔢", [
    "What is the numeric keypad?|the block of number keys on the right|the mouse|the speaker", "Who finds the keypad handy?|people who type lots of numbers|only drummers|nobody",
    "Which key must be on to type numbers on the keypad?|Num Lock|Caps Lock|Esc", "Where is the keypad on a full-size keyboard?|on the right side|on the left edge|under the space bar",
    "Do laptops always have a keypad?|no, many do not|yes always", "Which is faster for lots of numbers?|the keypad|the mouse|the speaker",
    "On the keypad, the numbers 7 8 9 are in the ___ row|top|bottom|middle", "On the keypad, the numbers 1 2 3 are in the ___ row|bottom|top|middle"],
    ["Think about where the number block sits on a keyboard.", "The keypad is on the right. Num Lock turns it on. The numbers are laid out like a phone or a calculator.", "Example: the keypad is on the right side of a full keyboard, and a calculator uses the same kind of layout. Now do yours."],
    [["Keypad", "🔢", "The <b>numeric keypad</b> is a block of number keys on the right of a keyboard."], ["Layout", "5️⃣", "The 7 8 9 are on top, then 4 5 6, then 1 2 3. The 5 has a little bump."], ["Num Lock", "🔒", "Press <b>Num Lock</b> to turn the number keys on."]]);
  const C4 = num("Real typing speed", "⌨️", () => { const w = ri(6, 16) * 5; return [`A word counts as 5 characters. Ben typed <b>${w * 5}</b> characters in 1 minute. What is his speed in WPM?`, w]; },
    ["Typists count 5 characters as one word.", "Divide the number of characters by the number of characters in a word.", "Example: 100 characters is 100 ÷ 5 = 20 words, so 20 WPM in one minute. Now do yours."],
    [["Standard word", "🔤", "In typing tests, <b>5 characters</b> (letters, spaces, marks) count as <b>1 word</b>."], ["Math", "➗", "Characters ÷ 5 = words."], ["Per minute", "⏱️", "If it took 1 minute, the words are your <b>WPM</b>."]]);
  const C5 = num("Reach your goal", "🏆", () => { const a = ri(10, 25), g = a + ri(5, 20); return [`Ava types <b>${a}</b> WPM now. Her goal is <b>${g}</b> WPM. How many more WPM does she need?`, g - a]; },
    ["She needs to go from where she is to her goal.", "Find the gap by taking away the smaller number from the bigger one.", "Example: now 18 WPM, goal 25 WPM. 25 take away 18 is 7 more. Now do yours."],
    [["Goals", "🏆", "A <b>goal</b> is something you want to reach, like a typing speed."], ["Gap", "📏", "Goal minus now = how far to go."], ["Grow", "🌱", "Practice a little each day and watch the number go up."]]);
  const C6 = mc("Switching windows", "🪟", [
    "Which shortcut switches between open windows? (Windows)|Alt + Tab|Ctrl + Z|Ctrl + B", "Which shortcut opens a new browser tab?|Ctrl + T|Ctrl + Z|Ctrl + S",
    "Which shortcut closes the current browser tab?|Ctrl + W|Ctrl + P|Ctrl + A", "Which key gets you out of full screen or closes a menu?|Esc|Tab|Shift", "Which key moves the cursor to the next box in a form?|Tab|Space|Esc",
    "Which shortcut finds words on a page?|Ctrl + F|Ctrl + Q|Ctrl + Z", "Which key refreshes a page in many browsers?|F5|F1|Esc", "Which shortcut selects everything?|Ctrl + A|Ctrl + T|Ctrl + W"],
    ["Think about what each shortcut is trying to do.", "Alt + Tab flips between programs. Ctrl + T opens a tab. Ctrl + W closes the current tab.", "Example: you have a game and a document open. Alt + Tab jumps from one to the other. Now do yours."],
    [["Switch", "🔄", "<b>Alt + Tab</b> jumps to the next open program."], ["Tabs", "🗂️", "<b>Ctrl + T</b> opens a new tab. <b>Ctrl + W</b> closes one."], ["Tab key", "⇥", "The <b>Tab</b> key moves between boxes in a form."]]);
  const C7 = mc("Making slides", "🎞️", [
    "What is a slide show used for?|sharing ideas with pictures and short words|baking a cake|cleaning a screen", "How many words should a slide have?|only a few|a whole book|none ever", "A good slide picture is ___|clear and helps the idea|blurry|random",
    "A slide title should be ___|short and clear|very long|empty", "What does a bullet point show?|one short idea in a list|a game|a password", "Which text size is easiest for the audience?|large|tiny|invisible",
    "What helps people remember a slide?|a simple picture and short words|lots of paragraphs|flashing colors", "Should you read every word on your slide aloud?|no, explain it in your own words|yes always"],
    ["Think about what the audience needs to see and hear.", "Slides are short. The words are big, the picture helps, and you explain the rest by talking.", "Example: a slide about frogs might have a title, 3 short points and a frog picture. Now do yours."],
    [["Short and clear", "✂️", "Put only a <b>few words</b> on each slide."], ["Pictures", "🖼️", "A picture helps the idea. Keep it clear."], ["Talk", "🗣️", "Use the slide as a guide. <b>Explain</b> in your own words."]]);
  const C8 = mc("Tabs and bookmarks", "⭐", [
    "What is a bookmark?|a saved link to a page you like|a paper marker only|a mouse button", "Why bookmark a page?|to find it again fast|to make it louder|to hide it", "What is a browser tab?|a way to keep several pages open|a type of cable|a kind of font",
    "What happens if you have too many tabs open?|the computer may slow down|nothing at all|the screen turns orange",
    "What should you do when you are done with a tab?|close it|leave a hundred open|ignore it", "What is a homepage?|the page the browser opens first|your home address|a keyboard", "Where are bookmarks usually found?|below the address bar or in a menu|inside the keyboard|inside the mouse",
    "A lock icon in the address bar means the connection is ___|protected|a game|finished"],
    ["Think about how you could come back to a page you liked.", "A bookmark is a saved shortcut to a page. Tabs let you flip between pages.", "Example: you find a good page about space. Bookmark it, and you can find it again tomorrow. Now do yours."],
    [["Bookmark", "⭐", "A <b>bookmark</b> saves a link so you can return to it."], ["Tabs", "🗂️", "Each <b>tab</b> is a page. Close the ones you are done with."], ["Lock", "🔒", "A lock shows the connection is protected, but still stay careful."]]);
  const C9 = mc("Steps in order", "🪜", [
    "What is an algorithm?|a list of steps to do something|a kind of key|a tiny mouse", "Which step comes FIRST when making a sandwich?|get the bread|eat it|wash the plate",
    "Which comes FIRST when you brush your teeth?|put toothpaste on the brush|rinse|put the brush away", "Which step comes LAST when planting a seed?|water it|dig a hole|get a seed",
    "Why do computers need steps in the right order?|they do exactly what they are told, in order|they guess|they sleep", "If steps are in the wrong order, the result may be ___|wrong|always perfect|louder",
    "Which is the best first step when saving a file?|choose Save|close the window|turn off the computer", "A program is ___|steps written for a computer|a metal part|a wire"],
    ["Think about which step has to happen before the others.", "An algorithm is steps in order. Ask which step cannot happen until another one is done.", "Example: to make toast, first put bread in the toaster, then press down, then wait. Now do yours."],
    [["Algorithm", "🪜", "An <b>algorithm</b> is a list of steps in a clear order."], ["Computers follow", "🤖", "A computer does exactly what the steps say, so the <b>order matters</b>."], ["Program", "📜", "A <b>program</b> is steps written for a computer."]]);
  const C10 = num("Loops: repeat", "🔁", () => { const n = ri(2, 9), k = ri(2, 4); return [`A robot program says: <b>repeat ${n} times: clap ${k} times</b>. How many claps in total?`, n * k]; },
    ["A loop repeats the same steps again and again.", "Count how many claps in one round, then think how many rounds. Multiply.", "Example: repeat 3 times: jump 2 times. That is 3 × 2 = 6 jumps. Now do yours."],
    [["Loop", "🔁", "A <b>loop</b> makes the computer repeat steps."], ["Why?", "⚡", "Loops save writing the same step many times."], ["Count", "🔢", "Rounds × steps in one round = total."]]);
  const C11 = mc("Finding bugs", "🐞", [
    "What is a bug in a program?|a mistake that makes it go wrong|a real insect inside|a new feature", "Fixing bugs is called ___|debugging|decorating|deleting", "Your game character walks the wrong way. What do you do?|look for the mistake and fix it|throw the computer|give up",
    "Should you be upset when you find a bug?|no, it is a normal part of coding|yes always", "How can you find a bug?|test one step at a time|guess wildly|never test", "Who can have bugs in their programs?|every programmer|only beginners|nobody",
    "After you fix a bug, what do you do?|test again|turn off the screen|forget it", "What does a good coder do when stuck?|breathe, try again or ask for help|break the keyboard|stop forever"],
    ["Think about what a coder does when something does not work.", "Bugs are normal. Test slowly, find the mistake, fix it, then test again.", "Example: a sprite does not jump. Check the jump step and fix it. Now do yours."],
    [["Bug", "🐞", "A <b>bug</b> is a mistake in a program."], ["Debug", "🔧", "To <b>debug</b> is to find and fix the mistake."], ["Keep going", "💪", "All programmers make bugs. <b>Test, fix, test again.</b>"]]);
  const C12 = mc("Networks and Wi-Fi", "📶", [
    "What is Wi-Fi?|a way to connect to the internet without a cable|a type of mouse|a battery", "What is a network?|computers joined together|one lonely computer|a power cable", "What does a router do?|shares the internet with devices|prints pictures|plays music",
    "Is public Wi-Fi always safe?|no, be careful|yes always", "A device cannot get on the internet. What can you check?|if Wi-Fi is turned on|the color of the case|the keyboard layout", "What is a download?|getting a file from the internet to your device|sending a note|deleting a file",
    "What is an upload?|sending a file from your device to the internet|erasing a file|printing a file", "Who should help you join a new Wi-Fi?|a parent|a stranger|a pop-up"],
    ["Think about how computers talk to each other without wires.", "A router is the box that shares the internet. Wi-Fi is the invisible connection.", "Example: your tablet joins the router's Wi-Fi to reach the internet. Now do yours."],
    [["Network", "🌐", "A <b>network</b> joins computers so they can share."], ["Wi-Fi", "📶", "<b>Wi-Fi</b> connects without a cable."], ["Router", "📡", "A <b>router</b> shares the internet with every device in the home."]]);
  const C13 = mc("Cloud and backups", "☁️", [
    "What does the cloud mean for files?|files stored on faraway computers, reached by the internet|a real cloud in the sky|a kind of keyboard", "What is a backup?|an extra copy of your files|a broken file|a game",
    "Why make a backup?|if something breaks you still have your work|to make it bigger|to hide it", "Which is a safer plan?|keep copies in two places|keep one copy only|never save", "A device is lost. Which helps you the most?|a backup|a bigger screen|a louder speaker",
    "Do you need the internet to reach cloud files?|yes|no, never", "Who should set up a cloud account for a kid?|a parent|a stranger|nobody", "How often should you back up important work?|regularly|never|once in ten years"],
    ["Think about what would happen if you lost the only copy of your project.", "A backup is a spare copy. The cloud stores files on faraway computers.", "Example: you finish a story. Save it on the computer and make a second copy. Now do yours."],
    [["Cloud", "☁️", "The <b>cloud</b> means files saved on faraway computers you reach by the internet."], ["Backup", "📦", "A <b>backup</b> is a spare copy of your files."], ["Two places", "✌️", "Keep important work in <b>two places</b>."]]);
  const C14 = mc("Good sources", "📚", [
    "Which source is best for a school report?|a book from the library|a random comment|a rumor", "What is a source?|where information comes from|a type of key|a font", "Which clue shows a page might be trustworthy?|it names the author and the date|it has flashing ads|it asks for your password",
    "Is everything on the internet true?|no|yes", "How can you check a fact?|find it in a second good source|believe the first thing|ask a pop-up", "Who can help you pick good sources?|a teacher or librarian|a stranger|a pop-up",
    "Which is more trustworthy?|a science museum site|a page with You won! on it|a chat from a stranger", "An opinion is ___|what someone thinks|always a fact|a computer part"],
    ["Think about who wrote it and whether it can be checked.", "Good sources show who wrote them and agree with other good sources. Opinions are not facts.", "Example: a fact about volcanoes in a science book can be checked in a second book. Now do yours."],
    [["Source", "📚", "A <b>source</b> is where a fact comes from."], ["Check", "✅", "Use <b>two sources</b> to check a fact."], ["Fact or opinion", "💭", "A fact can be proven. An opinion is what someone thinks."]]);
  const C15 = mc("Giving credit", "🏷️", [
    "You use a fact from a book in your report. What should you do?|say where it came from|pretend you thought of it|erase the title", "Copying someone's work and saying it is yours is ___|not okay|fine|a shortcut",
    "What is a credit?|a note saying who made something|a coin|a key", "A picture belongs to ___|the person who made it|whoever clicks first|nobody", "How can you use ideas the right way?|put them in your own words and give credit|copy and paste everything|hide the source",
    "Can you use someone's song in your video without asking?|you should ask first|always yes", "How should you use a quote?|put it in quotation marks and name the author|leave out the marks|change the words secretly", "Why give credit?|it is fair and honest|to be slow|no reason"],
    ["Think about the person who worked hard to make it.", "Be fair. Use your own words and tell where an idea came from. Ask before using other people's work.", "Example: if you learned a fact from a book, write the book title at the end. Now do yours."],
    [["Fair", "⚖️", "People work hard on what they make. Treat it with respect."], ["Own words", "✍️", "Say the idea in <b>your own words</b>."], ["Give credit", "🏷️", "Tell <b>where it came from</b>: the book, the site, the author."]]);
  const C16 = mc("Your digital footprint", "👣", [
    "What is a digital footprint?|the trail of things you do online|a shoe print|a battery", "Can things you post be seen by others for a long time?|yes|no, they vanish at once", "Before you post, ask yourself ___|would I be happy for everyone to see this|will it be funny for one second",
    "Which post leaves a good footprint?|a kind comment|a mean joke|private info", "Can you always delete something from the internet?|not always, so think first|always", "Who sees a public post?|many people|only your pet|nobody",
    "A good footprint is ___|kind, safe and honest|full of secrets|meant to hurt", "What do you do if you posted something by mistake?|tell a parent, they can help|hide it|do nothing"],
    ["Think about whether you are happy for anyone to see it later.", "What you put online can stay for a long time. Pause and think before you post.", "Example: a kind comment on a school page leaves a good footprint. Now do yours."],
    [["Footprint", "👣", "Your <b>digital footprint</b> is everything you leave online."], ["Lasting", "⏳", "Posts can <b>stay a long time</b> and be shared."], ["Think", "🤔", "Post only what is <b>kind, safe and true</b>."]]);
  const C17 = mc("Tricks and scams", "🎣", [
    "A message says you won a prize if you click. What is it?|a likely trick|a sure gift|a lesson", "What is phishing?|a trick message to steal your info|a fishing game|a font", "A message says: act now or you lose everything! What should you do?|stop, do not click, tell a parent|click fast|reply with your password",
    "A message asks for your password. Who is it?|probably a scammer|your teacher for sure|a friend", "What can you look for in a scam?|spelling mistakes and rushing you|a calm friendly note from a friend|a plain letter", "A free game asks you to install an unknown file. What do you do?|ask a parent first|install it|share it",
    "Which one is safer?|type the website address yourself|click a strange link|open an attachment from a stranger", "If you clicked something strange, what do you do?|tell a parent right away|hide it|click more"],
    ["Think about whether the message wants you to rush or hand over private information.", "Scams rush you, offer free prizes, and ask for passwords. Stop and tell a parent.", "Example: a pop-up says you won a tablet. Do not click. Tell a parent. Now do yours."],
    [["Phishing", "🎣", "<b>Phishing</b> is a trick message that tries to steal your information."], ["Red flags", "🚩", "Rushing you, free prizes and asking for passwords are <b>red flags</b>."], ["Stop and tell", "🛑", "<b>Do not click.</b> Tell a parent."]]);
  const C18 = mc("Updates and viruses", "🛡️", [
    "What is a computer virus?|a harmful program|a cold for people|a cable", "Why do we install updates?|they fix problems and make devices safer|to make them slower|to waste time", "What helps keep a computer safe?|updates and careful clicking|opening every attachment|sharing passwords",
    "Who should install new software?|a parent or trusted adult|a stranger|a game ad", "A website warns about a virus. What do you do?|close it and tell a parent|call the number it shows|click the pop-up", "What is antivirus software?|a program that helps find harmful files|a game|a font",
    "Should you plug in a USB stick you found?|no, give it to a grown-up|yes|yes, to see what is on it", "Which is a safe habit?|only download from places a parent trusts|download from any link|click all pop-ups"],
    ["Think about how to keep a device healthy and safe.", "Keep software updated, install only what a grown-up approves, and do not open strange files.", "Example: a pop-up says your computer has a virus and gives a phone number. Do not call; tell a parent. Now do yours."],
    [["Virus", "🦠", "A <b>virus</b> is a harmful program."], ["Updates", "⬆️", "<b>Updates</b> fix problems and make devices safer."], ["Safe habits", "✅", "Only download what a <b>parent trusts</b>. Do not open strange files."]]);
  const L6 = [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, C17, C18,
    MIX("Mixed practice", C1, C2, C4, C6, C7, C9, C10, C12, C14, C15, C16, C17),
    MIX("Level 6 Challenge", C2, C3, C5, C8, C9, C11, C13, C14, C15, C17, C18, C4)];

  Object.assign(TYPING_LEVELS, { 4: L4, 5: L5, 6: L6 });
})();
