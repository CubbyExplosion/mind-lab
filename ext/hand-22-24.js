// ext/hand-22-24.js  Mind Lab Handwriting, levels 22-24 (60 lessons)
(() => {
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

  // =============== LEVEL 22 ===============
  const A1 = mk("Secretary hand", "📜", [
    "Secretary hand was widely used in England mostly in which centuries?|The 1500s and 1600s|The 1100s and 1200s|The 1900s and 2000s",
    "How do secretary hand letters mostly look?|Angular and compact, with broken strokes|Round and like modern printed type|Tall, thin and perfectly upright capitals only",
    "What was secretary hand mainly used for?|Legal papers, letters and records|Road signs|Printing music",
    "Which style competed with secretary hand and later took over in England?|Italic hand|Runes|Cuneiform",
    "Why can secretary hand be hard for modern readers?|Many letter shapes differ from ours|It is written in a secret code|It has no letters at all",
    "When reading old handwriting, a good first step is to...|find known words and learn how the writer shapes each letter|guess the whole page at once|skip to the last line only",
    "The study of old handwriting is called...|paleography|geography|cartography",
    "Handwriting styles change over time mostly because of...|tools, fashion, speed and what people needed|a law that bans change|nothing, styles never change"
  ],
    ["Think about when the style lived, and what kind of writing it did for people.", "Compare the shapes the style used with the shapes in your own handwriting. Only one idea fits what the question asks.", "Example: the 'long s' in old books looks like an f without a full bar, so readers learn it from known words. Now do yours."],
    [["An old English hand", "📜", "<b>Secretary hand</b> was an everyday English script in the 1500s and 1600s, used for letters, legal papers and records."], ["Strange shapes", "🔍", "Its letters are <b>angular and compact</b>. Some, like e, h and r, look quite different from ours."], ["Paleography", "🕵️", "Readers of old writing learn each letter shape by <b>comparing known words</b>. This skill is called paleography."]]);

  const A2 = mk("Medieval abbreviations", "✂️", [
    "Why did medieval scribes use many abbreviations?|They saved time, space and costly parchment|They were bored of full words|Parchment was free and endless",
    "A short line over a letter often showed...|that letters (often m or n) were left out|that the word was a name|that the page was finished",
    "The Tironian sign for 'and' looked like a 7 and was named after...|Tiro, a secretary of Cicero|Tiro, a king of Egypt|Tyrone, an English printer",
    "Cutting off the end of a word and marking it is called a...|suspension|conclusion|expansion",
    "Writing 'dns' for 'dominus' (lord) is an example of a...|contraction|full spelling|rune",
    "Holy names such as IHS were often shortened as...|nomina sacra, or sacred names|spelling mistakes|map labels",
    "When you meet an abbreviation in a manuscript, the best clue is...|the surrounding words and the language|the color of the ink only|the page number",
    "A modern example of an abbreviation we use daily is...|etc. for 'and so on'|a smiling face|a page border"
  ],
    ["Think about what a scribe wanted to save when writing a whole book by hand.", "Look for the choice that explains the purpose or the method, not a silly cause.", "Example: 'Dr' is a modern shortening of 'Doctor', with the middle left out. Now do yours."],
    [["Save space and time", "⏳", "Parchment was made from animal skin and was costly. Scribes shortened common words so books took <b>less time and parchment</b>."], ["Signs for missing letters", "➖", "A <b>line over a letter</b> often meant m or n was missing. A cut-off ending is a <b>suspension</b>; a missing middle is a <b>contraction</b>."], ["Read in context", "🧩", "To expand an abbreviation, use the <b>language and nearby words</b>. We still do it today with Dr, etc. and St."]]);

  const A3 = mk("The scriptorium", "🏛️", [
    "A scriptorium was a place where...|books were copied by hand|coins were minted|crops were stored",
    "Many scriptoria were found in...|monasteries|train stations|stadiums",
    "Parchment is made from...|animal skin|tree bark only|cotton rags",
    "Before writing, scribes often pricked holes and then...|ruled guide lines|dyed the page blue|folded the page in half",
    "A writing tool made from a bird feather was a...|quill|stylus|brush stick",
    "Red headings in manuscripts are called rubrics, from the Latin word for...|red|ruler|rule",
    "A colophon at the end of a book often tells...|who copied it and sometimes when|how to cook a meal|the price in coins",
    "Copying one large book by hand could take...|months or even years|a few minutes|one breath"
  ],
    ["Think about a workshop where every book was made by one slow hand.", "Link the word to what it is made from or what it does in a book.", "Example: a stylus pressed marks in a wax tablet, so it is a pointed tool, not a feather. Now do yours."],
    [["Book workshops", "🏛️", "A <b>scriptorium</b> was a writing room, often in a monastery, where scribes copied books by hand."], ["Preparing the page", "📏", "Scribes made parchment from animal skin, <b>pricked tiny holes</b>, and ruled lines to keep writing straight."], ["Signs of the scribe", "✒️", "<b>Rubrics</b> were red headings. A <b>colophon</b> sometimes named the scribe at the end."]]);

  const A4 = mk("Gutenberg and movable type", "🖨️", [
    "Johannes Gutenberg worked in which German city?|Mainz|Rome|Cairo",
    "Roughly when did Gutenberg develop printing with movable type in Europe?|Around 1450|Around 1050|Around 1850",
    "What was 'movable' about movable type?|Single letters could be rearranged and reused|The press moved around town|The paper moved by itself",
    "Gutenberg's type was cast in...|metal|clay only|ice",
    "The best-known book from his press is the...|Gutenberg Bible|Rosetta Stone|Penny Black",
    "Why did printing spread knowledge faster than copying?|Many identical copies could be made quickly|It made letters invisible|It stopped people reading",
    "Early printers often copied the look of...|handwritten blackletter books|digital screens|road signs",
    "A key idea of movable type is that letters are...|reused in many pages|carved once into a whole page forever|written fresh by the printer each time"
  ],
    ["Think about why separate letters would be handy compared with carving whole pages.", "Choose the answer about reuse, copies or place. Rule out silly or wrong-century choices.", "Example: a stamp set lets you spell different words by rearranging letters. Now do yours."],
    [["Letters you can reuse", "🔠", "Around 1450 in Mainz, Gutenberg used <b>separate metal letters</b> that could be arranged, printed, then rearranged."], ["Many identical copies", "📚", "Printing made lots of matching books fast. The <b>Gutenberg Bible</b> (about 1455) is the most famous."], ["Handwriting's mirror", "🪞", "The first printed books copied <b>handwritten blackletter</b> so they would look familiar."]]);

  const A5 = mk("Old-style, transitional, modern", "🔤", [
    "Garamond and Caslon are examples of which type group?|Old-style|Modern|Monospace",
    "Baskerville is usually called...|transitional|old-style|rune",
    "Bodoni and Didot are known as...|modern (Didone) faces|handwriting faces|stencil faces",
    "Which group has extreme contrast between thick and thin strokes?|Modern|Old-style|Monoline",
    "Old-style faces have lower contrast and what kind of stress?|Slanted stress|Perfectly vertical stress|No stress at all",
    "The thin lines of a Didone letter are called...|hairlines|baselines|headlines",
    "Time order of the three groups, earliest first, is...|old-style, transitional, modern|modern, transitional, old-style|transitional, old-style, modern",
    "Times New Roman, made for a newspaper in 1931, belongs to the...|transitional group|blackletter group|script group"
  ],
    ["Think about how the three groups move from soft pen-like shapes toward sharp, geometric ones.", "Look at stress (angle) and contrast (thick against thin) as the clues, not the name of the font itself.", "Example: a font with hairline thin strokes and very thick stems has high contrast. Now do yours."],
    [["Three families", "🔤", "<b>Old-style</b> (Garamond, Caslon), <b>transitional</b> (Baskerville, Times New Roman) and <b>modern</b> (Bodoni, Didot)."], ["Contrast", "◐", "Old-style faces look like pen strokes with a slanted stress. Modern faces have <b>high contrast</b> and vertical stress."], ["In between", "↔️", "Transitional faces sit between: more contrast than old-style but softer than modern."]]);

  const A6 = mk("Kerning, tracking, leading", "↔️", [
    "Adjusting the space between two particular letters is called...|kerning|leading|tracking",
    "Changing the spacing across a whole block of letters is...|tracking|kerning|leading",
    "The space between lines of text is called...|leading|kerning|tracking",
    "The word leading comes from thin strips of...|lead metal|leaf|leather",
    "Which pair of letters usually needs kerning tighter?|AV|ii|ll",
    "A common tip for all-capital words is to...|add a little extra tracking|squeeze letters until they touch|use no spacing at all",
    "Very tight leading in a paragraph makes it...|crowded and harder to read|easier for everyone|invisible",
    "In hand lettering, you spot bad spacing by checking...|whether the white space between letters looks even|if all letters have the same width|how long each letter took"
  ],
    ["Think: is the question about two letters, a whole block, or the lines?", "Remember: one word for the gaps between letters in pairs, one for a whole run, one for between lines.", "Example: pulling the T and o closer in 'To' fixes one pair. Now do yours."],
    [["Three spacings", "↔️", "<b>Kerning</b>: space between one pair of letters. <b>Tracking</b>: spacing over a whole run. <b>Leading</b>: space between lines."], ["Even white space", "👁️", "Good spacing is about <b>even white space</b>, not even gaps. Letters like AV tuck close; ii need more room."], ["Hand lettering", "✍️", "When lettering by hand, step back and <b>squint</b>. Uneven gaps then stand out."]]);

  const A7 = mk("Legibility and readability", "👓", [
    "Legibility is about how easily you can...|tell one letter from another|buy a pen|count lines",
    "Readability is about how comfortable it is to...|read a long stretch of text|find a pen|sharpen a pencil",
    "A very long line of text hurts which of the two?|Readability|Nothing at all|Only color",
    "A comfortable line is often about how many characters?|45 to 75|5 to 10|300 to 400",
    "Which helps readability for long text?|Enough space between lines|Squeezed lines|All capitals",
    "Which hurts legibility most?|Letters that look alike, like a and o in messy writing|Wide margins|Good light",
    "Long passages in all capitals are...|slower to read|faster to read|impossible to print",
    "Pale grey ink on cream paper reduces...|contrast and so legibility|paper weight|the number of words"
  ],
    ["Decide whether the question is about telling letters apart or reading comfortably.", "Think of the eyes tracking a long line or a tired reader. What helps or hurts them?", "Example: black on white has high contrast, so letters stand out. Now do yours."],
    [["Two ideas", "👓", "<b>Legibility</b>: can you tell the letters apart? <b>Readability</b>: is a long text comfortable to read?"], ["Helps readers", "✅", "Clear letter shapes, good contrast, <b>line length of 45 to 75 characters</b> and room between lines."], ["Hurts readers", "⚠️", "Pale ink, cramped lines, very long lines and <b>long text in all capitals</b>."]]);

  const A8 = mk("Runes", "ᚠ", [
    "The runic alphabet is called...|the futhark|the abugida|the kana",
    "The name futhark comes from...|the sounds of its first six runes|a king's name|a river",
    "Runes were written by...|early Germanic peoples, including the Norse|the ancient Maya|the Inca",
    "Runes have mostly straight lines because they were...|carved into wood, stone and bone|written with a brush|stamped in clay",
    "How many runes does the Elder Futhark have?|24|8|52",
    "The Younger Futhark was shorter, with...|16 runes|40 runes|1 rune",
    "What kind of system is a futhark?|An alphabet, where signs stand for sounds|A set of pictures only|A counting system only",
    "Which material was NOT a typical rune surface?|Plastic|Stone|Wood"
  ],
    ["Think about tools: what shapes are easy to cut into hard surfaces?", "Count carefully if the question asks for a number. Use the first-letters idea if it asks about the name.", "Example: the word alphabet comes from the first two Greek letters, alpha and beta. Now do yours."],
    [["Carved letters", "ᚠ", "<b>Runes</b> were used by Germanic peoples, including the Norse. Straight lines were easy to <b>carve</b> in stone, wood and bone."], ["The futhark", "🔤", "It is named for its first six runes: F, U, Th, A, R, K. The <b>Elder Futhark</b> has 24 runes."], ["A shorter set", "✂️", "Later the <b>Younger Futhark</b> used only 16 runes."]]);

  const A9 = mk("Hebrew script", "א", [
    "In which direction is Hebrew written?|Right to left|Left to right|Top to bottom only",
    "How many letters are in the Hebrew alphabet?|22|26|44",
    "Hebrew is called an abjad because it mainly writes...|consonants|vowels only|whole words",
    "Small dots and dashes that mark vowels are called...|niqqud|serifs|ligatures",
    "Hebrew has no...|capital letters|consonants|spaces between words",
    "Some Hebrew letters change shape at the end of a word. These are called...|final forms|capitals|ligatures",
    "Where does a Hebrew book start for the reader?|On what an English reader sees as the back|Same as English|At the middle",
    "The letter shapes used in modern Hebrew print are described as...|square|runic|brush-like"
  ],
    ["Think about which way your hand moves across the page.", "A word you know, abjad, gives a clue about what kind of letters it uses.", "Example: Arabic is also written right to left, so the page is turned the opposite way. Now do yours."],
    [["Right to left", "⬅️", "<b>Hebrew</b> is written from <b>right to left</b>, so books open from what looks like the back to an English reader."], ["An abjad", "🔤", "It has 22 letters for consonants. Vowels are often left out or shown with dots called <b>niqqud</b>."], ["Final forms", "🔁", "Five letters have a special shape at the end of a word. There are no capital letters."]]);

  const A10 = mk("Devanagari", "अ", [
    "Devanagari is used to write...|Hindi, Sanskrit, Marathi and Nepali|Greek and Latin|Cherokee",
    "Letters in Devanagari seem to hang from...|a horizontal line along the top|a line at the bottom|a vertical line only",
    "That top line is called...|shirorekha|niqqud|colophon",
    "Devanagari is written in which direction?|Left to right|Right to left|Bottom to top",
    "Devanagari is an abugida, which means each consonant sign carries...|a built-in vowel sound|no sound|a whole word",
    "To change the built-in vowel, writers add...|small vowel marks to the consonant|a new page|an uppercase letter",
    "Does Devanagari use capital letters?|No|Yes, like English|Only for names in print",
    "Where is the Devanagari script mainly used?|South Asia|Northern Europe|South America"
  ],
    ["Think about the picture: letters look like they hang on a clothesline.", "An abugida mixes a consonant with a vowel. Think what the unmarked sign sounds like.", "Example: Greek is an alphabet with separate letters for vowels. Now do yours."],
    [["Hanging letters", "अ", "<b>Devanagari</b> writes Hindi, Sanskrit, Marathi and Nepali, left to right, with a <b>top line</b> (shirorekha) joining letters."], ["Abugida", "🔤", "Each consonant has a <b>built-in vowel</b>. Other vowels are added as marks."], ["No capitals", "🔡", "There are no uppercase and lowercase forms. Words stand out by the line over them."]]);

  const A11 = mk("The Cherokee syllabary", "🪶", [
    "Who created the Cherokee syllabary?|Sequoyah|Gutenberg|Cicero",
    "Roughly when did he complete it?|Around 1821|Around 1021|Around 1921",
    "In a syllabary, each symbol stands for...|a syllable|a single consonant|a whole sentence",
    "About how many symbols does the Cherokee syllabary have?|85|26|2,000",
    "Many Cherokee symbols look like Latin letters but...|sound different|sound the same|mean numbers",
    "What happened soon after the syllabary was introduced?|Many Cherokee people learned it quickly|Nobody used it|It was lost the next year",
    "Sequoyah is known as a...|silversmith who invented a writing system|king of Rome|printer in Mainz",
    "Why is a syllabary quick to learn?|Each symbol is a whole sound unit, so you read syllable by syllable|It has only 3 symbols|It has no sounds"
  ],
    ["Think about the word syllable, the beats you clap in a word.", "Use the year or the count carefully. The symbols borrow shapes but not always sounds.", "Example: Japanese kana is also a syllabary, with one symbol per sound beat. Now do yours."],
    [["One person, one system", "🪶", "Around 1821, <b>Sequoyah</b>, a Cherokee silversmith, finished a writing system for his language."], ["Syllable symbols", "👏", "Each of its <b>85 symbols</b> is a syllable. Some look like Latin letters but sound different."], ["Quickly adopted", "📖", "Many Cherokee people learned it fast, and newspapers and books followed."]]);

  const A12 = mk("Roman and Hindu-Arabic numerals", "🔢", [
    "What number is XLII?|42|62|12",
    "What does IV mean in Roman numerals?|4|6|9",
    "Which year is MCMXCIV?|1994|1944|2094",
    "The digits 0 to 9 we use developed first in...|India|Rome|Norway",
    "A big advantage of our digits is...|place value and a symbol for zero|they use only straight lines|they are Latin letters",
    "Roman numerals have no symbol for...|zero|ten|five",
    "How is 2026 written in Roman numerals?|MMXXVI|MMXVI|MMXXIV",
    "Leonardo of Pisa (Fibonacci) helped bring our digits to Europe in his book of...|1202|1020|2020"
  ],
    ["Read each symbol's value: I=1, V=5, X=10, L=50, C=100, D=500, M=1000.", "A smaller symbol before a bigger one subtracts; after it, adds. Work left to right in chunks.", "Example: XIV is X (10) plus IV (4), so 14. Now do yours."],
    [["Roman rules", "🏛️", "I=1, V=5, X=10, L=50, C=100, D=500, M=1000. A smaller symbol <b>before</b> a bigger one subtracts (IV = 4)."], ["Our digits", "0️⃣", "The digits 0-9 came from <b>India</b> and spread through Arabic scholars. <b>Place value</b> and zero make sums easy."], ["Into Europe", "📘", "Fibonacci's book <i>Liber Abaci</i> (1202) helped bring them to Europe."]]);

  const A13 = mk("Large print and high contrast", "🔎", [
    "Large print usually means type of about what size?|18 point or bigger|6 point|8 point",
    "Which pairing has the best contrast?|Black ink on white paper|Light grey on white|Yellow on white",
    "For low vision, a good pen choice is...|a bold, dark marker|a faint pencil|a dry ink pen",
    "Glossy paper can be a problem because of...|glare|weight|price only",
    "Raised or bold lines on paper help with...|keeping writing on the line|erasing|folding",
    "Wider spacing between lines helps readers who...|lose their place easily|prefer small print|never read",
    "Putting sentences in all capitals is...|not helpful because the word shapes look the same|the best choice for low vision|required by law",
    "Writing a label for someone with low vision, you should use...|big, thick, dark letters|small, thin letters|decorative script"
  ],
    ["Think about what an eye with low vision needs to separate letters from the page.", "Look for dark against light, bigger size, and less glare.", "Example: a black marker on white card is far easier to see than pencil on grey card. Now do yours."],
    [["Make it easy to see", "🔎", "<b>Large print</b> is 18 point or more. Use thick, dark letters on a plain light page."], ["Contrast and glare", "☀️", "Black on white is best. Avoid pale ink and <b>glossy paper</b> that shines."], ["Space helps", "↕️", "Wider line spacing helps readers keep their place. Avoid long text in capitals."]]);

  const A14 = mk("Adaptive grips and slant boards", "🖍️", [
    "A pencil grip is a tool that...|makes a pen easier to hold|writes by itself|erases ink",
    "A slant board holds the paper...|at an angle|upside down|inside a bag",
    "Slant boards can help with...|wrist position and posture|pen color|paper price",
    "A weighted pen is sometimes used to...|steady a shaky hand|lighten the pen|make ink pale",
    "Who often suggests adaptive writing tools?|An occupational therapist|A pilot|A baker",
    "A wide-barrel pen is easier for someone with...|a weak or sore grip|perfect strength only|no hands",
    "Raised-line paper helps a writer...|feel where the lines are|see rainbows|write faster by magic",
    "Using an adaptive tool is...|a smart way to make writing comfortable|cheating|a sign of failing"
  ],
    ["Think about what the tool does for the hand, wrist or paper.", "Match each tool to its problem: grip, steadiness, posture or finding lines.", "Example: a thick foam grip helps a hand that tires holding a thin pen. Now do yours."],
    [["Tools that fit you", "🖍️", "Grips, wide-barrel pens and weighted pens help when the hand is <b>weak, sore or shaky</b>."], ["Paper helpers", "📐", "A <b>slant board</b> tilts the paper to help wrist and posture. <b>Raised lines</b> can be felt as well as seen."], ["Smart, not cheating", "💪", "Occupational therapists suggest these tools. Using the right tool is a <b>smart choice</b>."]]);

  const A15 = mk("Deliberate practice for handwriting", "🎯", [
    "Deliberate practice means practice that is...|focused on a specific goal with feedback|random and relaxed|only for fun",
    "Which is better for improving: 15 minutes daily or 2 hours once a month?|15 minutes daily|2 hours once a month|They are exactly equal",
    "When you aim to improve one letter shape, you should...|pick one target and check it each try|change everything at once|stop looking at the page",
    "Automaticity means letter forming has become...|so easy it needs little attention|slower and harder|impossible",
    "Why is automaticity useful?|It frees your mind for ideas|It makes ink last longer|It removes the need for words",
    "When learning a new form, a good order is...|slow and accurate first, then faster|fast first, then accurate|never repeat",
    "Feedback in handwriting practice can come from...|comparing with a model or a teacher's comments|only hoping|only luck",
    "Practicing a mistake over and over...|can make the mistake stronger|fixes it|erases it"
  ],
    ["Think about practice with a purpose, not just doing it for long.", "Look for the answer about focus, small steps and checking your work.", "Example: practicing just the letter e for five minutes and comparing each one with a model. Now do yours."],
    [["Practice with a target", "🎯", "<b>Deliberate practice</b> aims at one specific goal and uses <b>feedback</b>: compare your work with a model."], ["Little and often", "📅", "Ten to fifteen minutes a day beats one long session. Go <b>slow and accurate first</b>, speed later."], ["Automaticity", "⚡", "When forming letters becomes automatic, your mind is free for <b>ideas</b>. But practicing mistakes also locks them in."]]);

  const A16 = mk("Wet-ink and electronic signatures", "✍️", [
    "A wet-ink signature is signed...|by hand on paper|only on a screen|by robot only",
    "A typed name or a drawn image on a form can count as...|an electronic signature|a wet-ink signature|no signature at all",
    "A digital signature uses...|a code that shows a file has not been changed|a special pen color|a stamp",
    "Why do some documents still need wet ink?|Rules or the receiver may require it|Ink is never allowed|Paper is a law",
    "Electronic signatures are legally valid in...|many countries, for many kinds of documents|no places|only one tiny island",
    "Before signing anything, you should...|read it carefully|sign quickly|sign a blank page",
    "A good habit with a signed paper is to...|keep a copy|throw it away|give out the original to anyone",
    "Which is the strongest way to show who signed?|A signature plus a witness or verified identity|A random scribble|A typed 'x'"
  ],
    ["Think about what the signature is meant to show: a person agreed.", "Read the words carefully: wet-ink means physical pen, digital means a code check.", "Example: signing a delivery tablet with your finger is an electronic signature. Now do yours."],
    [["Different kinds", "🖋️", "<b>Wet ink</b> is signed with a pen. An <b>electronic signature</b> can be typed or drawn on a screen."], ["Digital signature", "🔐", "A <b>digital signature</b> is a code that proves a file has not been changed since it was signed."], ["Safe habits", "📄", "Always <b>read before signing</b>, never sign a blank page, and keep a copy."]]);

  const A17 = mk("Freewriting", "⏲️", [
    "In freewriting you write nonstop for...|a set time|only one word|until the pen breaks",
    "While freewriting, you should NOT...|stop to edit or cross out|let your hand move|use a pen",
    "If you get stuck, you can...|write 'I am stuck' until new ideas come|stop for good|erase the page",
    "Freewriting is useful for...|finding ideas and warming up|checking spelling|printing",
    "A good time for a freewrite is...|5 to 10 minutes|10 seconds|10 hours",
    "After freewriting, what comes next?|Look for good ideas and then edit|Nothing, it must be perfect|Burn the page",
    "What does freewriting help beat?|The fear of a blank page|Hunger|Bad weather",
    "Teacher Peter Elbow helped popularize freewriting for...|writers who feel stuck|only mathematicians|printers"
  ],
    ["Think about writing without a judge looking over your shoulder.", "Pick the answer about keeping the pen moving or ideas coming, not about perfection.", "Example: a 5-minute timer and one prompt like 'My best day'. Now do yours."],
    [["Keep the pen moving", "⏲️", "Set a timer and <b>write nonstop</b>. Do not stop to fix spelling or cross things out."], ["When stuck", "🔁", "Write 'I am stuck' and keep going. New ideas usually <b>arrive</b> within a few lines."], ["Edit later", "✂️", "Afterwards, circle the best bits. Freewriting is for <b>finding ideas</b>, not making a finished page."]]);

  const A18 = mk("Citing sources by hand", "📚", [
    "Which detail is part of a basic source note?|Author, title and year|Your shoe size|The weather",
    "Alphabetical bibliography lists are ordered by the author's...|last name|first name|favorite color",
    "A direct quotation needs...|quotation marks and a source|no marks at all|a joke",
    "When taking notes from a book, also write down...|the page number|your lunch|the room temperature",
    "Using someone's words without credit is...|plagiarism|summarizing|editing",
    "A hanging indent means the first line is...|at the margin and others are indented|centered|upside down",
    "The best time to record a source is...|while you take the notes|a year later|never",
    "Index cards are handy for sources because...|you can sort them alphabetically|they never get lost|they can write alone"
  ],
    ["Think about how a reader could find your source again.", "Pick the answer about crediting and recording the details early.", "Example: a card with 'Sato, K. Birds of Japan, 2018' records author, title and year. Now do yours."],
    [["Record as you go", "📇", "Write the <b>author, title, year</b> and <b>page number</b> as you take notes, not later."], ["Credit words", "❝", "Put <b>quotation marks</b> around exact words and name the source. Otherwise it is plagiarism."], ["Make the list", "🔤", "A bibliography is in <b>alphabetical order by last name</b>. Index cards make sorting easy."]]);

  const L22 = [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18];

  // =============== LEVEL 23 ===============
  const B1 = mk("Symbols in your notes", "∴", [
    "Which symbol is a common shorthand for 'therefore'?|∴ (one dot above two)|∵ (two dots above one)|≠ (not equal)",
    "Which symbol usually means 'because'?|∵ (two dots above one)|∴ (one dot above two)|≈ (about equal)",
    "What does ≈ mean in notes?|approximately equal|not equal|greater than",
    "What does ≠ mean?|is not equal to|is equal to|is about the same as",
    "In notes, 'w/' is shorthand for...|with|without|worldwide",
    "In notes, 'b/c' stands for...|because|before the class|between classes",
    "The Greek letter Δ in science notes usually means...|change|total|zero",
    "An arrow → in notes often means...|leads to or causes|stop|erase"
  ],
    ["Think about what each small sign would save you from writing out in full.", "Match the shape: three dots in a triangle point to a result, the other one points to a reason.", "Example: ↑ can stand for 'increases'. Now do yours."],
    [["Short signs save time", "∴", "Use symbols for common words: <b>∴</b> therefore, <b>∵</b> because, <b>→</b> leads to, <b>≈</b> about, <b>≠</b> not equal."], ["Letters and slashes", "✂️", "<b>w/</b> = with, <b>b/c</b> = because, <b>Δ</b> = change. Keep a small <b>key</b> if you invent new ones."], ["Be consistent", "🔑", "Use each symbol <b>the same way every time</b> so future you can read your notes."]]);

  const B2 = mk("Measuring your writing speed", "⏱️", [
    "You copy 90 words in 3 minutes. What is your speed in words per minute?|30|270|93",
    "To measure speed fairly, you should copy...|the same passage for a set time|a different random thing each time|nothing at all",
    "After timing, you also check...|how legible your writing is|the room's color|the pen's price",
    "A rise in speed but a drop in legibility means...|you pushed too hard and should find a balance|you have improved perfectly|the paper is faulty",
    "Words per minute is found by dividing...|words written by minutes|minutes by pages|pages by pens",
    "You copy 60 words in 2 minutes. What is your speed?|30 words per minute|120 words per minute|62 words per minute",
    "For a trustworthy comparison across weeks, keep these the same:|pen, passage type and time limit|nothing, change it all|only your mood",
    "A good use of a speed measure is to...|track progress over weeks|compare yourself to everyone in town|punish yourself"
  ],
    ["Think about speed as how much you get done in one minute.", "Divide the words by the minutes, and remember to keep the test the same each time.", "Example: 45 words in 3 minutes is 15 words per minute. Now do yours."],
    [["Words per minute", "⏱️", "Copy a passage for a set time, then <b>divide the words by the minutes</b>. 90 words in 3 minutes is 30 per minute."], ["Fair test", "⚖️", "Use the <b>same kind of passage, pen and time</b>, so changes show real progress."], ["Speed and legibility", "👓", "Always check that your writing is <b>still readable</b>. Fast but unreadable does not help."]]);

  const B3 = mk("Linked notes (Zettelkasten)", "🗃️", [
    "Zettelkasten is a German word for a...|slip box of notes|a kind of pen|a lecture hall",
    "The sociologist who made the method famous was...|Niklas Luhmann|Johannes Gutenberg|Sequoyah",
    "In this method, each note holds...|one idea|a whole chapter|a random page",
    "Notes are connected by...|numbers or links pointing to related notes|rubber bands only|one long list in order",
    "You should write notes in...|your own words|word for word copying|a code nobody knows",
    "The main benefit of linking is that...|ideas connect and new ones appear|notes get heavier|you never review",
    "A good title for a linked note is...|a short phrase naming its idea|a long paragraph|nothing at all",
    "A slip box suits which kind of work?|Long projects that grow over time|A single shopping list|Only one-day tasks"
  ],
    ["Think about notes that talk to each other, like a web instead of a stack.", "Remember: one idea per note, your own words, and a pointer to related notes.", "Example: note 12 'Spacing helps memory' points to note 18 'Flashcards'. Now do yours."],
    [["One idea per slip", "🗃️", "In a <b>Zettelkasten</b> (slip box) each card holds <b>one idea</b>, written in your own words."], ["Link them", "🔗", "Give each note a number and <b>point to related notes</b>. Ideas form a web instead of a pile."], ["Grows with you", "🌱", "Sociologist Niklas Luhmann used one for decades. It suits <b>long projects</b>, where notes keep building."]]);

  const B4 = mk("The Feynman technique on paper", "🧒", [
    "The Feynman technique starts by...|writing the topic at the top of a page|memorizing words without meaning|erasing the page",
    "Then you explain the idea...|in plain words, as if to a younger student|using the hardest words|only in a symbol code",
    "When you get stuck explaining, that shows...|a gap in your understanding|you are tired only|the topic is false",
    "What do you do with the gaps?|Go back to the source and relearn them|Skip them forever|Write them smaller",
    "The last step is to...|simplify and use examples|add more jargon|stop learning",
    "Richard Feynman was a famous...|physicist|painter|typewriter maker",
    "Why do it by hand?|Writing slowly forces you to put it in your own words|Hand writing is always faster|It uses less paper",
    "Using a simple example in your explanation shows that...|you truly get the idea|you copied|you want longer notes"
  ],
    ["Think about teaching someone younger than you. What must you do with hard words?", "The method has steps: topic, plain explanation, find gaps, review, simplify.", "Example: explaining 'photosynthesis' as plants making food from light, water and air. Now do yours."],
    [["Explain it simply", "🧒", "Write the topic. Then explain it in <b>plain words</b>, as if to a younger student."], ["Find the gaps", "🕳️", "Where you get stuck, you do not understand yet. <b>Go back</b> to your source and fix the gap."], ["Simplify", "✨", "Rewrite using <b>short words and examples</b>. Physicist Richard Feynman liked clear ideas."]]);

  const B5 = mk("Annotating math and science", "🧮", [
    "Beside each step of a worked solution, write...|the rule or reason used|a doodle|nothing, it is clutter",
    "Q.E.D. at the end of a proof stands for...|which was to be shown|quick end of day|quite easily done",
    "Underline or circle the 'given' information to...|make it easy to find|hide it|decorate",
    "Why add units next to numbers?|They show what the number measures|They make the page long|They are decoration",
    "A diagram in a physics note helps because...|it shows the situation at a glance|it replaces all words|it fills the space",
    "A star beside a note usually marks...|something important or a key result|a mistake|a joke",
    "Marking a step with a question mark means...|you do not yet see why it works|the page is wet|you are certain",
    "Writing 'why?' beside a confusing step is...|a useful way to find what to ask later|a waste of ink|against the rules"
  ],
    ["Think about how a quick mark can help you find or fix the idea later.", "Look for the choice that explains meaning, not decoration.", "Example: next to 2x = 8 write 'divide both sides by 2'. Now do yours."],
    [["Write the reason", "📝", "Next to each step note <b>the rule you used</b>. Later you will see why it works."], ["Mark what matters", "⭐", "<b>Underline</b> the given facts, <b>star</b> key results and write <b>units</b> beside numbers."], ["Question marks", "❓", "A <b>'?'</b> or 'why?' tells you where to ask. Q.E.D. means 'which was to be shown'."]]);

  const B6 = mk("Lab notebooks", "🥼", [
    "In a lab notebook, you should date...|every entry|only the first page|nothing",
    "Why are pages usually numbered and bound?|It shows pages were not removed or added|It looks fancy|It saves ink",
    "Should you tear out a page with a mistake?|No, cross it out with one line|Yes, tear it out|Yes, hide it",
    "Observations should be written...|at the time they happen|a week later from memory|never",
    "Which belongs in the notebook?|What you did, what you saw and the results|Only the final answer|Your lunch order",
    "Writing in pen rather than pencil helps because...|the record is permanent|it is faster|pencils are not allowed anywhere",
    "A sketch with labels is useful because...|it records what you saw exactly|it replaces data|it is optional decoration",
    "A good notebook entry would let another person...|repeat your experiment|guess your lunch|find your locker"
  ],
    ["Think of a notebook as a trustworthy record someone else could check.", "Pick the answer about honesty, time and permanence.", "Example: write '10:15 am, water 20 C' as the reading happens. Now do yours."],
    [["A true record", "🥼", "Write in <b>pen</b>, date each entry, and keep pages <b>numbered and bound</b>. Never tear a page out."], ["Write it now", "⏰", "Record <b>what you did, saw and measured</b> as it happens, with units and labeled sketches."], ["Fix with one line", "➖", "Cross out mistakes with <b>one neat line</b>. Honest records are what make science trustworthy."]]);

  const B7 = mk("Writing on boards", "🖊️", [
    "Writing on a board should be...|bigger than on paper|tiny|faint",
    "For readability from the back, use...|thick strokes and print letters|tiny cursive|light-colored chalk on a light board",
    "When writing on a board, you should try not to...|block the board with your body|write straight|use color",
    "Why print rather than join letters on a board?|Separate letters are easier to see far away|Cursive is banned|Print is slower to read",
    "Which color is clearest on a white board?|Black or dark blue|Yellow|Pale pink",
    "Writing slowly on a board helps because...|people can follow and copy it|nobody sees|the marker lasts longer",
    "Keep lines of board writing...|level and not drifting uphill|slanting wildly|squeezed in a corner",
    "Before erasing, you should...|check whether others still need to copy|erase at once|tear the board down"
  ],
    ["Think about a person at the back of the room trying to read you.", "Pick answers about size, clearness and giving people time.", "Example: a 4 cm tall letter in dark marker is easy to read from afar. Now do yours."],
    [["Big and bold", "🖊️", "Write <b>larger than on paper</b>, with thick strokes and separate (printed) letters."], ["Dark and level", "➡️", "Use <b>dark colors</b> on a white board. Keep lines level and not drifting uphill."], ["Be kind to the viewer", "👥", "Stand to the side, write slowly, and <b>do not erase</b> until people have copied."]]);

  const B8 = mk("Lettering a poster for distance", "📢", [
    "A common rule of thumb says letters need about how much height for each 10 feet (3 m) of viewing distance?|1 inch (2.5 cm)|1 mile|1 foot",
    "A poster should use...|few words|a full essay|tiny type",
    "The best contrast on a poster is...|dark on light, or light on dark|pastel on pastel|grey on grey",
    "Thick strokes help because...|thin ones disappear at a distance|thick strokes are slower|they use more paper",
    "A poster's main message should be...|biggest and first to read|smallest|hidden",
    "Using too many styles on one poster...|makes it messy|makes it perfect|cannot happen",
    "Leaving blank space around the lettering...|helps the words stand out|wastes the poster always|should never be done",
    "Before the final copy, make...|a rough sketch with light pencil guidelines|nothing, just start in ink|ten copies in permanent paint"
  ],
    ["Think about walking past a poster and having only a few seconds to read it.", "Choose the answer about big, clear and simple, with space around.", "Example: 'SCHOOL FAIR' in big thick letters beats a small paragraph. Now do yours."],
    [["Big, bold, brief", "📢", "People read posters from far away, so use <b>few words</b>, <b>thick strokes</b> and big letters."], ["Contrast and space", "◐", "Dark on light (or light on dark), and <b>blank space</b> around the lettering so it stands out."], ["Plan first", "✏️", "Sketch lightly with <b>pencil guidelines</b>, then go over it. Use one or two styles, not ten."]]);

  const B9 = mk("Kurrent and Sütterlin", "🇩🇪", [
    "Kurrent and Sütterlin are historic handwriting styles from...|Germany|Japan|Brazil",
    "Sütterlin was designed by...|Ludwig Sütterlin|Johannes Gutenberg|Sequoyah",
    "Roughly when was Sütterlin designed?|In the 1910s|In the 1510s|In the 1990s",
    "Compared with modern cursive, these scripts look...|narrow and pointed|round and wide|like capital block letters",
    "Why might a family historian learn to read them?|Old letters and records may be in them|They use a new alphabet of Greek letters|They are used on phones",
    "Sütterlin was taught in German schools until the...|early 1940s|early 1800s|early 2000s",
    "These scripts are a good example of how...|handwriting changes by place and time|all handwriting is identical|printing never reached Germany",
    "To read an old Kurrent letter you should...|compare each letter shape with a chart|assume it is modern cursive|ignore the letters"
  ],
    ["Think about where and when these styles belong.", "Eliminate choices from the wrong country, wrong century, or with silly links.", "Example: the long s in old English books is also a form readers must learn. Now do yours."],
    [["German hands", "🇩🇪", "<b>Kurrent</b> and <b>Sütterlin</b> were German handwriting styles, narrow and pointed."], ["A school script", "🏫", "Ludwig Sütterlin designed his version in the <b>1910s</b>, and it was taught until the early 1940s."], ["Why read them?", "🔎", "Many old family letters and records are in them. Use a <b>letter chart</b> and compare shapes."]]);

  const B10 = mk("A short history of the pencil", "✏️", [
    "The 'lead' in a pencil is really...|graphite mixed with clay|metal lead|charcoal only",
    "Graphite was found in a famous mine in which country?|England|Peru|Iceland",
    "Nicolas-Jacques Conté improved pencils in 1795 by...|mixing graphite with clay and firing it|adding paint|using glue only",
    "On a pencil grade scale, B stands for...|black, a softer and darker mark|bright|blunt",
    "On a pencil grade scale, H stands for...|hard, a lighter mark|heavy|handy",
    "HB is...|in the middle of the scale|the hardest|the softest",
    "Which pencil would suit a dark, smooth sketch?|6B|9H|2H",
    "The eraser on the end of a pencil was patented in the 1850s in...|the United States|Egypt|Mexico"
  ],
    ["Think about what 'lead' really is and how clay changes hardness.", "On the grade scale, B is soft and dark, H is hard and light.", "Example: a 4H pencil makes a pale thin line, ideal for neat guidelines. Now do yours."],
    [["Graphite, not lead", "✏️", "Pencils use <b>graphite</b>, found in England in the 1500s. 'Lead' is only an old name."], ["Conté's trick", "🧪", "In 1795 Conté mixed graphite with <b>clay</b> and baked it. More clay makes a harder pencil."], ["B, H, HB", "📏", "<b>B</b> = black (soft, dark), <b>H</b> = hard (light), <b>HB</b> = in the middle."]]);

  const B11 = mk("How a fountain pen works", "🖋️", [
    "In a fountain pen, ink travels from the reservoir to the nib by...|capillary action and gravity|batteries|magnets",
    "The part that carries ink from the reservoir to the nib is the...|feed|cap|clip",
    "The slit down the middle of a nib helps...|ink flow to the tip|the pen stand up|the cap fit",
    "A converter is used to...|fill the pen from a bottle|clean the paper|sharpen the nib",
    "A cartridge is a...|small sealed ink container|kind of nib|type of paper",
    "Letting a fountain pen dry out may cause...|clogs and hard starts|better flow|nothing",
    "Pushing hard on a fountain nib can...|bend or damage it|improve the ink|make the line thinner always",
    "The two halves of the nib point are called the...|tines|clips|caps"
  ],
    ["Think of ink creeping through a narrow space the way water climbs a paper towel.", "Match the part to the job: reservoir, feed, nib, or cartridge.", "Example: dipping a paper towel corner in water shows capillary action. Now do yours."],
    [["Ink on a journey", "🖋️", "Ink moves from the reservoir through the <b>feed</b> to the <b>nib</b> by <b>capillary action</b> and gravity."], ["The nib slit", "✂️", "The slit and tiny channels draw ink to the tip. A <b>light touch</b> is enough."], ["Fill and care", "🧴", "A <b>cartridge</b> is a sealed ink tube; a <b>converter</b> lets you fill from a bottle. Do not let the pen dry out."]]);

  const B12 = mk("Dye and pigment inks", "🎨", [
    "In a dye ink, color molecules are...|dissolved in liquid|tiny solid grains|baked into the paper",
    "In a pigment ink, color is carried by...|tiny solid particles|only dissolved molecules|nothing",
    "Which ink tends to resist fading and water better?|Pigment ink|Dye ink|Neither ever",
    "Which ink often has brighter, more vivid colors?|Dye ink|Both exactly the same|Neither can be bright",
    "India ink is traditionally made from...|carbon|iron only|cherries",
    "Pigment inks can sometimes clog fine nibs because...|particles are solid|they are too wet|they are too thin",
    "For documents you want to keep for years, choose...|archival or pigment ink|any washable ink|pale highlighter",
    "Water-soluble means...|it dissolves in water|it dissolves in oil only|it can never smudge"
  ],
    ["Think: dissolved like sugar in tea, or suspended like sand in water?", "Match the property: tiny solid bits tend to last, dissolved dye can run.", "Example: sugar in tea is dissolved; sand in water just floats and settles. Now do yours."],
    [["Dye or pigment?", "🎨", "<b>Dye</b> is dissolved in the liquid. <b>Pigment</b> is made of <b>tiny solid particles</b> carried by it."], ["Strengths", "⚖️", "Dye inks are bright. Pigment inks are usually <b>more lightfast and water-resistant</b>."], ["Keeping documents", "🗄️", "For records that must last, use <b>archival ink</b>. India ink is carbon-based and very stable."]]);

  const B13 = mk("Types of writing systems", "🌍", [
    "Greek and Latin are examples of an...|alphabet|logography|syllabary",
    "Arabic and Hebrew are mostly...|abjads|logographies|runes only",
    "Devanagari and Ethiopic are examples of an...|abugida|alphabet|abjad",
    "Japanese kana and the Cherokee symbols are a...|syllabary|logography|abjad",
    "Chinese characters are mainly...|logographic|alphabetic|abjad",
    "In an abjad, vowels are usually...|left out or shown with small marks|always written in full|written first",
    "A logographic system uses...|a symbol for each word or meaning part|a symbol for each vowel|only sounds",
    "In an abugida, each consonant sign carries a...|built-in vowel|capital|no sound"
  ],
    ["Ask what a single symbol stands for: a sound, a syllable, or a whole word.", "Remember a hint in the name: syllabary has syllable, logographic has word.", "Example: English letters mostly stand for single sounds, so English is an alphabet. Now do yours."],
    [["Five kinds", "🌍", "<b>Alphabet</b> (letters for all sounds), <b>abjad</b> (mostly consonants), <b>abugida</b> (consonant plus built-in vowel), <b>syllabary</b>, and <b>logography</b>."], ["Examples", "🔤", "Latin, Greek: alphabets. Arabic, Hebrew: abjads. Devanagari: abugida. Kana, Cherokee: syllabaries. Chinese: logographic."], ["Mixed in real life", "🧩", "Real scripts blend ideas. Japanese uses kana <b>and</b> Chinese-based characters together."]]);

  const B14 = mk("Maya glyphs and Inca quipus", "🗿", [
    "Maya writing is made of glyph blocks that stand for...|words and syllables|only numbers|musical notes",
    "Maya glyphs were carved in stone and also painted in...|folded bark-paper books|plastic sheets|glass",
    "In Maya numbers, a dot stands for...|1|5|0",
    "In Maya numbers, a bar stands for...|5|1|20",
    "A shell shape in Maya numbers marks...|zero|ten|a hundred",
    "A quipu was a record made of...|knotted cords|painted rocks|written scrolls",
    "Quipus were used by the...|Inca|Vikings|Romans",
    "Knots and colors on a quipu helped store...|numbers and other records|only songs|nothing"
  ],
    ["Think about who wrote with glyphs and who tied cords.", "Remember Maya numbers use dots, bars and a shell.", "Example: three dots and one bar would be 5 + 3 = 8. Now do yours."],
    [["Maya glyphs", "🗿", "Maya writing used <b>glyph blocks</b> for words and syllables, carved in stone and painted in bark-paper books."], ["Maya numbers", "🔢", "A <b>dot = 1</b>, a <b>bar = 5</b>, and a <b>shell = zero</b>."], ["Inca cords", "🧶", "The Inca kept records with <b>quipus</b>: cords with knots and colors, tied rather than written."]]);

  const B15 = mk("Accessible documents", "♿", [
    "Alt text is a short description of...|an image for people who cannot see it|a link's address|a table's color",
    "A screen reader does what?|Reads on-screen text aloud|Prints the page|Writes essays",
    "Plain language means...|short words and clear sentences|long technical terms|hidden meaning",
    "Why not use color alone to show meaning?|Some readers cannot tell colors apart|Color is expensive|Color is banned",
    "A good link text is...|descriptive, like 'Read the school rules'|just 'click here'|a long string of symbols",
    "Headings in a document help readers who...|navigate by headings with assistive tools|never read|only print",
    "Good contrast between text and background helps...|everyone, especially low-vision readers|nobody|only printers",
    "For handwritten notes meant to be shared, accessible writing means...|clear, large enough, high-contrast letters|tiny pale writing|ornate script only"
  ],
    ["Think about readers who use sound, big print or keyboards instead of a mouse or sight.", "Pick the choice that helps the most people without extra steps.", "Example: alt text for a chart might say 'Bar chart showing sales rising each month'. Now do yours."],
    [["Reach more readers", "♿", "Accessible documents work for people who use <b>screen readers</b>, large print, or keyboards."], ["Good habits", "✅", "Use <b>headings</b>, <b>alt text</b> for images, <b>plain language</b>, and links that say what they lead to."], ["Do not rely on color", "🎨", "Do not use <b>color alone</b> to carry meaning. Add words or shapes too."]]);

  const B16 = mk("Initials, dates and contracts", "📑", [
    "Initialing each page of a contract shows...|you saw that page|you drew a picture|the page is new",
    "Signing a blank contract is...|not a good idea|always smart|required",
    "If a printed term is changed by hand, both sides should...|initial the change|ignore it|erase it",
    "An unused blank space in a contract is often...|lined out so nothing can be added|left open for anyone|filled with doodles",
    "A document's date should be...|written clearly and in full|left out|scribbled",
    "The signature goes on...|the signature line|any random place|the back of the envelope",
    "Before signing, read the...|whole document, including the small print|title only|price only",
    "After signing, you should receive and keep...|a copy|nothing|an empty folder"
  ],
    ["Think about protecting yourself and making clear what both sides agreed.", "Look for the careful choice: read, mark changes, keep proof.", "Example: a changed delivery date has both parties' initials beside it. Now do yours."],
    [["Read first", "👀", "Read the <b>whole document</b>, including small print, before you sign. Never sign blank pages."], ["Mark changes", "✏️", "Hand changes need <b>initials</b> from each side. Blank gaps are often <b>lined out</b>."], ["Date and keep", "🗂️", "Write the <b>date</b> clearly and keep a <b>copy</b>. Signatures go on the signature line."]]);

  const B17 = mk("How computers read handwriting", "🤖", [
    "OCR stands for...|optical character recognition|only copy rewriting|open code reading",
    "Software that reads handwriting is often called...|handwritten text recognition|a pencil|a font",
    "Such software learns from...|many examples of writing|a single sample|magic",
    "Which handwriting is generally easier for software to read?|Neat, evenly spaced writing|Very cramped, joined scribble|Writing in faint ink",
    "After a scan is converted, you should...|check it for errors|assume it is perfect|delete the original",
    "A stylus on a tablet can be converted to text by...|recognition software|erasing|folding",
    "Why is cursive tricky for software?|Letters join and run together|It uses too much ink|It is printed in red",
    "Good scanning needs...|even light and a flat page|a crumpled page|a dark room"
  ],
    ["Think of the computer as a reader that learned from lots of examples.", "Neat spacing and good scans are the user's part in helping.", "Example: a flat page in daylight scans better than a folded one in shadow. Now do yours."],
    [["Learning to read", "🤖", "<b>OCR</b> reads printed text. <b>Handwriting recognition</b> uses software that learned from <b>many examples</b> of writing."], ["Help it help you", "🪄", "Neat, evenly spaced writing, dark ink and a flat, well-lit scan give better results."], ["Always check", "🔍", "The result may contain <b>errors</b>, especially with joined cursive. Read it over."]]);

  const B18 = mk("Sensory detail in a journal", "👃", [
    "Sensory details come from...|the five senses|only sight|only memory",
    "Which sentence uses a strong sensory detail?|The kettle hissed and steam fogged the window.|It was a nice day.|Things happened.",
    "Which is more specific?|A red bicycle with a squeaky left pedal|A thing|Some stuff",
    "A journal entry becomes richer when you add...|a smell, a sound and a texture|only the date|only a title",
    "Show, don't tell means...|let details make the feeling clear|never describe anything|tell everything in lists",
    "Instead of 'I was nervous', a showing detail is...|my palms felt damp and my pencil wobbled|nervous nervous nervous|I felt things",
    "Which sense is described? 'The soup tasted salty.'|Taste|Sight|Hearing",
    "Good journaling often includes the date and...|the place|your full address|your passwords"
  ],
    ["Ask which of the five senses a detail uses.", "Pick the sentence or choice that is specific and uses a concrete picture.", "Example: 'The bus smelled of wet wool' beats 'It smelled bad'. Now do yours."],
    [["Use your senses", "👃", "Sight, sound, smell, taste and touch make a journal come alive. Add <b>one small detail</b> to each entry."], ["Show, don't tell", "🎭", "Instead of 'I was nervous', write 'my palms felt <b>damp</b> and my pencil wobbled'."], ["Be specific", "🔎", "<b>A red bicycle with a squeaky pedal</b> is better than 'a thing'. Always add date and place."]]);

  const L23 = [B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17, B18];

  // =============== LEVEL 24 ===============
  const C1 = mk("Dating a manuscript", "🗓️", [
    "A watermark in old paper is...|a design pressed in during papermaking, seen against light|a stain from a cup|a signature",
    "Why can a watermark help date a document?|Mills used marks that changed over time|They are always the same everywhere|They show the writer's age",
    "Paper took over from parchment in much of Europe during the...|late Middle Ages|Stone Age|1990s",
    "Handwriting style is a clue because...|styles changed across the centuries|all styles stay identical|only the pen color matters",
    "A mention of a known event inside a text can...|set the earliest possible date|prove nothing|always give the exact day",
    "Radiocarbon dating can be used on...|parchment made from animal skin|the writing style|the page number",
    "Spelling and language changes help because...|they differ by period|they never change|they are random",
    "Scholars date a manuscript best by...|combining several clues|trusting one clue only|guessing"
  ],
    ["Think of the manuscript as a detective case with many small clues.", "Pick the answer that uses change over time or combines clues.", "Example: a letter that mentions a known coronation must be written after it. Now do yours."],
    [["Material clues", "📄", "<b>Watermarks</b>, paper or parchment, and ink all give hints. Parchment can even be tested by <b>radiocarbon dating</b>."], ["Writing clues", "✍️", "<b>Script style</b>, spelling, abbreviations and language change over time, so they help narrow the date."], ["Combine clues", "🧩", "No single clue is certain. Paleographers <b>combine</b> several, and events named in the text give an earliest date."]]);

  const C2 = mk("Scrolls and codices", "📜", [
    "A codex is a book made of...|pages bound along one edge|one long roll|a single tablet",
    "A scroll is read by...|unrolling it|turning pages|opening a lid",
    "A big advantage of a codex is that you can...|find a page quickly|never lose it|write only on one side",
    "Papyrus scrolls were common in ancient...|Egypt and the Mediterranean|Iceland|Antarctica",
    "The codex spread widely in the early centuries...|AD|BC only|today only",
    "A codex can be written on...|both sides of each page|one side only always|no side",
    "A modern book is a kind of...|codex|scroll|tablet",
    "Searching a long scroll for one passage is...|slow and awkward|instant|impossible only on Tuesdays"
  ],
    ["Think about unrolling a long poster versus flipping pages.", "Pick the choice about how you find a spot or how it is bound.", "Example: a sticky note flag on page 12 is easy in a book but not in a roll. Now do yours."],
    [["Roll or book?", "📜", "A <b>scroll</b> is a long roll you unwind. A <b>codex</b> is pages <b>bound along one edge</b>, like today's books."], ["Why codices won", "📖", "You can jump to a page, write on <b>both sides</b>, and store it compactly."], ["Where from", "🏛️", "Papyrus scrolls were common in Egypt and the Mediterranean. Codices spread widely in the early centuries AD."]]);

  const C3 = mk("Proofreader's marks", "🔴", [
    "Which mark means 'let it stand', undoing a correction?|stet|dele|caps",
    "The mark that means 'delete' is...|dele, drawn as a loop|stet|a heart",
    "A caret (^) in the text shows where to...|insert something|delete something|begin a new book",
    "The paragraph symbol ¶ means...|start a new paragraph|end the document|italic",
    "'tr' in the margin means...|transpose, swap the order|translate|trim",
    "Three short lines under a letter mean...|make it a capital|make it small|make it bold italic",
    "A slash through a capital letter means...|make it lowercase|delete the page|make it larger",
    "Proofreading marks go in the margin and...|a matching mark in the text|nowhere|on a second page only"
  ],
    ["Think about the Latin: stet is a command to a printer; dele is another.", "Marks come in pairs: one in the text, one in the margin.", "Example: a slash through a letter and 'lc' in the margin makes it lowercase. Now do yours."],
    [["Marks for editing", "🔴", "<b>Dele</b> deletes, <b>stet</b> means 'let it stand', a <b>caret</b> inserts, <b>¶</b> starts a new paragraph."], ["Capitals and swaps", "🔠", "Three lines under a letter mean <b>capital</b>. A slash through a letter makes it <b>lowercase</b>. <b>tr</b> swaps the order."], ["Two places", "📍", "Put a mark in the text <b>and</b> a matching note in the margin so the editor can find it."]]);

  const C4 = mk("Revision passes", "🔁", [
    "A good first revision pass looks at...|big ideas and order|commas only|pen color",
    "Proofreading for spelling and punctuation comes...|last|first|never",
    "Reading your draft aloud helps you catch...|awkward sentences|nothing at all|the price of paper",
    "Taking a break before revising helps because...|you see it with fresh eyes|your pen cools|the ink dries",
    "Using a different color pen for edits helps you...|see what you changed|waste ink|confuse the reader",
    "Writing a draft with wide margins and spaced lines...|leaves room for edits|is wasteful always|is against rules",
    "After the big ideas, the next pass is usually...|paragraphs and sentences|spelling of one word|binding the book",
    "Revision means...|re-seeing and improving, not just fixing typos|copying out neatly only|erasing everything"
  ],
    ["Think about fixing the biggest problems first, then smaller ones.", "Order matters: ideas, structure, sentences, words, then tiny details.", "Example: moving a paragraph to a better place before fixing its spelling. Now do yours."],
    [["Big to small", "🔁", "Revise in passes: <b>ideas and order</b>, then paragraphs, then sentences, then words, and <b>proofreading last</b>."], ["Make room", "📐", "Leave <b>wide margins</b> and space between lines in a handwritten draft so edits fit. Use another pen color."], ["Fresh eyes", "👀", "Take a break and <b>read aloud</b>. Awkward sentences are easier to hear than to see."]]);

  const C5 = mk("Ampersand, pilcrow and friends", "&", [
    "The ampersand & began as a joined form of the Latin word...|et, meaning and|ad, meaning to|in, meaning in",
    "The symbol ¶ is called the...|pilcrow|ampersand|asterisk",
    "The pilcrow marks...|a new paragraph|a footnote|a bold word",
    "An asterisk * is named from a Latin word for...|little star|little line|little page",
    "The interrobang ‽ combines...|a question mark and an exclamation mark|a comma and a period|two quotes",
    "The interrobang was invented in 1962 by...|Martin K. Speckter|Johannes Gutenberg|Ludwig Sütterlin",
    "The section sign § is often used for...|laws and legal sections|sports scores|musical notes",
    "The @ symbol is called the...|at sign|ampersand|pilcrow"
  ],
    ["Think about what each symbol joins or marks: a word, a paragraph, a star.", "Name clues: pilcrow and interrobang are odd words, but each hides a simple job.", "Example: 'Dr' and '&' are shortenings we meet every day. Now do yours."],
    [["Ampersand", "&", "The <b>&</b> began as a joined handwritten <b>et</b> (Latin for 'and'). Its name is a squashed form of 'and per se and'."], ["Pilcrow and star", "¶", "<b>¶</b> (pilcrow) marks a paragraph. <b>*</b> (asterisk) means 'little star'. <b>§</b> is the section sign in laws."], ["The interrobang", "‽", "A question mark mixed with an exclamation mark, invented in <b>1962</b> by Martin K. Speckter."]]);

  const C6 = mk("Why uppercase and lowercase?", "🅰️", [
    "The words uppercase and lowercase come from...|printers' trays of type|colors of ink|the weight of paper",
    "Capital letters were kept in the...|upper case|lower case|middle drawer",
    "Small letters were kept in the...|lower case|upper case|top shelf",
    "Another word for capital letters is...|majuscule|minuscule|serif",
    "Another word for small letters is...|minuscule|majuscule|italic",
    "A compositor was a person who...|set type for printing|painted pictures|sold stamps",
    "Why were the capitals in the upper tray?|They were used less often, so they were farther away|They were heavier|They were more colorful",
    "The terms remain in common use because...|we still say them even in digital typing|they were banned|nobody uses them"
  ],
    ["Picture a printer standing at a wooden tray of metal letters.", "The place where letters sat explains the name. Think about which were used most.", "Example: a baker keeps the most-used flour nearest. Printers kept common letters nearest too. Now do yours."],
    [["Cases of type", "🅰️", "Printers kept metal letters in two wooden trays. <b>Capitals</b> sat in the <b>upper case</b>; small letters in the <b>lower case</b>."], ["Majuscule and minuscule", "🔠", "The Latin-based names are <b>majuscule</b> (capital) and <b>minuscule</b> (small)."], ["Still alive", "💻", "A <b>compositor</b> set the type. We still say upper and lower case on computers."]]);

  const C7 = mk("Roman, italic and oblique", "𝑖", [
    "In type, roman means...|the upright style|a style from Rome only|the bold style",
    "True italics have letterforms that...|are redesigned, often like handwriting|are just slanted|are always capitals",
    "An oblique style is...|an upright design simply slanted|a new design for every letter|never used",
    "Italic type was first used by printer...|Aldus Manutius, in Venice|Gutenberg in Mainz|Conté in Paris",
    "Italic type got its name from...|Italy|Ireland|Iceland",
    "The italic a often looks like...|a single-story a, like handwriting|a capital A|a zero",
    "Italic is commonly used for...|emphasis and titles|nothing|all headlines only",
    "In handwriting, slanting your letters a little is like...|an oblique style|a true italic with new shapes|print capitals"
  ],
    ["Think of the difference between leaning a drawing and redrawing each letter.", "Look at the name for the place the style came from.", "Example: a leaning 'a' with the same shape is oblique; a changed 'a' is true italic. Now do yours."],
    [["Three looks", "𝑖", "<b>Roman</b>: upright. <b>Oblique</b>: roman simply slanted. <b>Italic</b>: redrawn letters, closer to handwriting."], ["From Italy", "🇮🇹", "Aldus Manutius in <b>Venice</b> (about 1500) used italic type for small, portable books."], ["Use", "✨", "Italics add <b>emphasis</b> and mark titles. In your own hand, a slant is only oblique unless the shapes change too."]]);

  const C8 = mk("Islamic calligraphy styles", "🕌", [
    "Kufic script is known for being...|angular and geometric|loopy and tiny|always colored red",
    "Naskh script is known for being...|clear and rounded, good for reading|too ornate to read|used only on coins",
    "Thuluth script is often used for...|large titles and inscriptions|footnotes|tickets",
    "Nastaliq script is linked with which languages?|Persian and Urdu|Greek and Latin|Hebrew and Cherokee",
    "The traditional pen for Arabic calligraphy is a...|reed pen (qalam)|ballpoint|crayon",
    "Calligraphy in Islamic cultures is valued as...|a major art form|an unimportant hobby|only a typewriter style",
    "Arabic script is written...|right to left|left to right|top to bottom only",
    "Which style is often seen in architecture and old Qur'an copies as a bold angular hand?|Kufic|Comic|Gothic"
  ],
    ["Think about the shape: angular, rounded, grand, or flowing.", "Match the style to the job: reading text, big titles, or poetry.", "Example: a sharp-cornered, square style is angular, unlike a round hand. Now do yours."],
    [["Many styles", "🕌", "<b>Kufic</b> is angular and geometric. <b>Naskh</b> is clear and rounded for reading. <b>Thuluth</b> is grand, for titles."], ["Persian flow", "🌊", "<b>Nastaliq</b> is a flowing, slanting style used for Persian and Urdu."], ["A great art", "🖌️", "Calligraphers use a cut <b>reed pen</b> (qalam) and train for years. Calligraphy decorates books and buildings."]]);

  const C9 = mk("Hieratic and demotic", "🪶", [
    "Hieratic was a handwritten form of...|hieroglyphs|runes|Greek",
    "Hieratic was usually written with a...|reed brush or pen on papyrus|chisel in stone|stamp in clay",
    "Demotic was...|an even faster, more cursive script|a monument-carving style|a type of Greek",
    "Which was used for monuments and temple walls?|Hieroglyphs|Demotic|Hieratic only for coins",
    "The Rosetta Stone carries hieroglyphs, demotic and...|Greek|Latin|Runes",
    "Why did hieroglyphs become simplified into hieratic?|Writing by hand was quicker that way|They were too easy|Paper was invented",
    "Demotic came to be used for...|everyday documents|only carving|fireworks",
    "This history shows that handwriting tends to...|get faster and simpler for daily use|stay carved forever|become more complicated always"
  ],
    ["Think about how hurried writers simplify shapes.", "Pick the answer about speed, pens and daily use.", "Example: cursive is a quick, joined form of print letters. Now do yours."],
    [["Three scripts", "🪶", "<b>Hieroglyphs</b> for monuments, <b>hieratic</b> a quick handwritten form, and <b>demotic</b> an even more cursive everyday script."], ["Tools", "🖌️", "Hieratic and demotic were written with a <b>reed brush or pen</b> on papyrus."], ["Speed shapes script", "⚡", "Daily writing gets <b>faster and simpler</b>. The Rosetta Stone shows hieroglyphic, demotic and Greek together."]]);

  const C10 = mk("Monograms", "🔡", [
    "A monogram is...|initials combined into one design|a long poem|a brand of pen",
    "Monograms often appear on...|stationery, seals and silverware|speedometers|tea leaves",
    "A classic three-letter monogram usually makes which letter largest?|The last-name initial in the center|The middle initial at the end|The first initial only",
    "In that classic style, the first-name initial sits...|on the left|in the center|on the right",
    "A cipher is similar to a monogram, with letters...|interlaced or overlapped|written in separate boxes|upside down",
    "A good monogram needs...|balanced, readable letters|as many swirls as possible|tiny pale lines only",
    "Before final inking, draft monograms...|in pencil several times|never|only on a computer",
    "A rubber stamp monogram makes it easy to...|repeat the same design|erase it|hide it"
  ],
    ["Think about making initials into a neat badge or emblem.", "Pick the choice about balance, order, or readable design.", "Example: J S W: J left, S big in the center, W right. Now do yours."],
    [["Initials as design", "🔡", "A <b>monogram</b> joins initials into a single emblem for stationery, seals and silverware."], ["Classic layout", "🧭", "In a three-letter style: first initial <b>left</b>, last-name initial <b>big in the center</b>, middle initial <b>right</b>."], ["Draft it", "✏️", "Sketch several versions in <b>pencil</b>, keep letters balanced and readable, then ink the best one."]]);

  const C11 = mk("Muscle memory and motor programs", "🧠", [
    "'Muscle memory' is mostly stored in the...|brain, in motor programs|fingers|pen",
    "Your signature looks alike on paper and on a large board because...|the same motor program drives it|the pen is the same|the table is the same",
    "A motor program is a learned plan for...|a movement|a color|a word",
    "Slow, careful practice is useful because...|it builds the right movement before speed|it makes you tired|it hides mistakes",
    "Repeating a movement correctly many times makes it...|more automatic|harder|disappear",
    "Which part of the brain helps with smooth, coordinated movement?|The cerebellum|The tongue|The eyebrow",
    "If you practice a wrong grip for months, you...|learn the wrong grip well|fix it automatically|forget how to hold anything",
    "Changing a long-time habit takes...|many correct repeats|one try|no effort"
  ],
    ["Think about where the plan for a movement lives: in the hand or in the brain?", "Choose the answer about repeating the correct movement.", "Example: learning to tie shoes becomes automatic after many repeats. Now do yours."],
    [["Memory lives in the brain", "🧠", "Muscles do not remember. The <b>brain</b> stores a <b>motor program</b> for each movement."], ["Same pattern, different size", "📏", "That is why your signature looks alike small on paper or big on a board: it is the <b>same program</b>."], ["Practice right", "🔁", "Slow, correct repeats make the program automatic. Wrong repeats <b>lock in</b> the wrong habit."]]);

  const C12 = mk("Desirable difficulty", "💪", [
    "Desirable difficulties are learning methods that feel...|harder but help memory last|easy and weak|impossible",
    "The term was coined by psychologist...|Robert Bjork|Johannes Gutenberg|Sequoyah",
    "Which is a desirable difficulty?|Testing yourself|Reading the same page five times fast|Skimming",
    "Spacing practice over days feels harder but...|helps you remember longer|has no effect|erases memory",
    "Mixing different kinds of problems in practice is called...|interleaving|rewinding|spacing",
    "Writing by hand is slower, which can help because...|you must choose and summarize|you copy everything|you fall asleep",
    "Copying a lecture word for word is...|less effective than summarizing|the best method|impossible",
    "Feeling that studying is easy can be misleading because...|easy practice may not stick|it always sticks|it proves mastery"
  ],
    ["Think about workouts: the effort that feels hard builds strength.", "The point is effort that helps remember, not effort that wastes time.", "Example: covering your notes and trying to recall them. Now do yours."],
    [["Hard but helpful", "💪", "<b>Desirable difficulties</b> make learning feel harder but help memory last: testing, spacing and mixing."], ["Slower can be smarter", "✍️", "Hand writing is slower, so you <b>summarize</b> in your own words instead of copying."], ["Easy can fool you", "🪤", "Reading again and again feels easy but often does not stick. <b>Test yourself</b> instead."]]);

  const C13 = mk("Sleep and memory", "😴", [
    "During sleep, the brain helps to...|strengthen new memories|forget everything|stop working",
    "A good time to review notes is...|before going to sleep|never|only during a test",
    "All-night cramming is...|a poor way to learn|the best way|required",
    "A short nap can help...|memory and alertness|nothing|erase notes",
    "Reviewing notes within a day, then sleeping, helps because...|memory gets strengthened overnight|the paper dries|ink fades",
    "Lack of sleep often makes it harder to...|focus and remember|breathe|grow nails",
    "The word used for strengthening memories is...|consolidation|evaporation|punctuation",
    "On the night before an exam, a good plan is to...|do a short review and sleep|stay up all night|skip dinner"
  ],
    ["Think about what the brain does while you rest.", "Choose the answer about reviewing and then resting.", "Example: study a little, sleep, and recall it the next morning. Now do yours."],
    [["Sleep helps memory", "😴", "While you sleep, the brain <b>consolidates</b>, or strengthens, what you learned."], ["Smart timing", "⏰", "Review notes <b>before bed</b>. Short reviews plus sleep beat all-night cramming."], ["Tired brains struggle", "🥱", "Too little sleep makes it harder to <b>focus and remember</b>. A short nap can help."]]);

  const C14 = mk("Taking dictation", "🎙️", [
    "In dictation, you write down...|what someone says aloud|what you see|what you imagine",
    "A good first step is to...|listen for the whole phrase before writing|write every sound as a drawing|stop listening",
    "If you miss a word, you should...|leave a gap and carry on|stop the whole task|give up",
    "Afterwards, you should...|compare your text with the original|throw it away|never read it",
    "Dictation helps with listening, spelling and...|punctuation|cooking|swimming",
    "A speaker reads punctuation aloud, so you should...|write the marks, not the words 'comma'|write the word comma|ignore them",
    "If you cannot hear a word, you can politely ask them to...|repeat it|leave|speak faster",
    "Using quick abbreviations is useful because...|you can keep up with the speaker|they make it unreadable|they take more time"
  ],
    ["Think of your job as catching words while someone is still speaking.", "Choose the answer about keeping pace, checking later and being accurate.", "Example: write 'b/c' for 'because', then expand it afterwards. Now do yours."],
    [["Listen, then write", "🎙️", "Listen for a <b>whole phrase</b>, then write it. Do not stop for one missed word: <b>leave a gap</b>."], ["Quick helpers", "✂️", "Use abbreviations and write punctuation as <b>marks</b>, not the words 'comma' or 'period'."], ["Check afterwards", "✅", "Compare your copy with the original and note your mistakes. Accuracy first, then speed."]]);

  const C15 = mk("Universal design in writing tools", "🌐", [
    "Universal design means designing things that...|as many people as possible can use|only experts can use|only one person can use",
    "An example of universal design is...|a comfortable, thick-barrel pen anyone can use|a pen only for left-handers|a locked pen",
    "The term was popularized by architect...|Ronald Mace|Johannes Gutenberg|Fibonacci",
    "A tool that works for left- and right-handers is...|ambidextrous|one-sided|hidden",
    "Universal design aims to avoid...|needing special adaptations|having any design|good materials",
    "Large, clear labels and good contrast on notebooks are...|helpful to many readers|decoration only|a mistake",
    "A pen that is easy to hold helps people with...|different hand strengths|only musicians|nobody",
    "Why design for everyone from the start?|It is easier and fairer than fixing later|It costs more always|It makes things worse"
  ],
    ["Think about designs that help many people without anyone needing a special version.", "Pick the choice that includes more users rather than fewer.", "Example: automatic doors help a person with a heavy bag and a wheelchair user. Now do yours."],
    [["Design for many", "🌐", "<b>Universal design</b> aims to make things usable by <b>as many people as possible</b> without special changes."], ["In writing tools", "🖊️", "Comfortable <b>wide pens</b>, ambidextrous tools and high-contrast paper help many people at once."], ["Better from the start", "🌱", "It is easier and fairer to design well at the start than to <b>fix problems later</b>."]]);

  const C16 = mk("Formal letter layout", "💌", [
    "In a formal letter, the date usually goes...|near the top|at the end|in the middle of a sentence",
    "The greeting 'Dear Ms. Lee,' is called the...|salutation|signature|heading",
    "When you know the person's name, a common British closing is...|Yours sincerely|Yours faithfully|See you",
    "When you start 'Dear Sir or Madam', a common British closing is...|Yours faithfully|Yours sincerely|Bye",
    "Where does your handwritten signature go?|Above your printed name|Before the greeting|On the envelope only",
    "A good first paragraph states...|why you are writing|your life story|a joke",
    "Compared with a note to a friend, a formal letter uses...|polite, clear language|slang and emoji|secret code",
    "Keep a formal letter...|short with one clear purpose|as long as possible|full of tangents"
  ],
    ["Imagine a reader who has to sort lots of letters quickly.", "Pick the choice about where things belong or how polite and clear language works.", "Example: 'I am writing to ask about the library hours.' states the purpose straight away. Now do yours."],
    [["The parts", "💌", "Sender's address, <b>date</b>, recipient's address, <b>salutation</b>, body, <b>closing</b>, signature and printed name."], ["Closings", "✍️", "'Dear Ms. Lee' goes with <b>Yours sincerely</b> (British). 'Dear Sir or Madam' goes with <b>Yours faithfully</b>. In the US, 'Sincerely' is common."], ["Tone", "🎩", "Be <b>polite and clear</b>, and say in your first paragraph why you are writing."]]);

  const C17 = mk("Preserving handwritten documents", "🗄️", [
    "Which damages old paper the most?|Strong sunlight|Soft shade|A dry shelf",
    "Acid-free folders and boxes are used because...|ordinary paper slowly turns acidic and yellow|they smell nice|they glow",
    "Paper clips and staples can harm old paper by...|rusting and making marks|making it shiny|keeping it cool",
    "Which tape should you avoid on a precious document?|Sticky tape|Soft paper folder|Acid-free envelope",
    "Where is a good place to store old papers?|A cool, dry, dark place|A damp basement|A hot attic",
    "Before touching fragile paper, you should...|wash and dry your hands|lick your finger|wet the page",
    "To protect the original, you can also...|scan or photograph it|shred it|write over it",
    "For labeling an archive folder, which is safer?|Pencil on the folder, not on the document|Ink on the document|Marker on the document"
  ],
    ["Think about what ages paper faster: light, water, heat, rust and acid.", "Look for the answer that keeps it cool, dry, dark and unmarked.", "Example: a letter in an acid-free folder in a drawer lasts longer than one in a sunny window. Now do yours."],
    [["Enemies of paper", "☀️", "<b>Light, heat, damp</b>, rust, sticky tape and acid all harm paper."], ["Safe storage", "🗄️", "Use <b>acid-free folders</b> in a cool, dry, dark place. Store flat. Avoid clips, staples and tape."], ["Handle with care", "🧤", "Wash hands, label with <b>pencil on the folder</b>, and make a <b>scan</b> to protect the original."]]);

  const C18 = mk("Copywork", "📖", [
    "Copywork means copying good writing...|by hand to study how it works|to hand it in as your own|without reading it",
    "Benjamin Franklin taught himself to write better by...|rewriting essays from memory|avoiding books|never practicing",
    "Copying a passage exactly includes...|its punctuation|only the first word|a different order",
    "If you quote copywork in your own essay, you must...|put it in quotation marks and credit the author|claim it as yours|change a few words and hide it",
    "After copying, a good next step is to...|try rewriting the idea from memory|throw it away|never reread it",
    "Copywork is mainly for...|studying style, structure and spelling|cheating|decorating walls",
    "A short passage is a good start because...|you can copy it carefully|short passages are better than long novels always|it takes no focus",
    "Choosing a passage that you admire helps you...|notice what makes it work|avoid learning|get bored"
  ],
    ["Think about learning like a musician who plays other people's songs first.", "Pick the answer that is honest and focused on learning, not on cheating.", "Example: copying one paragraph and noting how its sentences vary in length. Now do yours."],
    [["Learn from the best", "📖", "<b>Copywork</b> means copying good writing by hand to study <b>style, punctuation and structure</b>."], ["Franklin's way", "🎩", "Benjamin Franklin practiced by taking notes on essays, then <b>rewriting them from memory</b> and comparing."], ["Stay honest", "✅", "Copywork is practice, not your own essay. If you quote it later, use <b>quotation marks and credit</b>."]]);

  const L24 = [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, C17, C18];

  Object.assign(HAND_LEVELS, {
    22: L22.concat([MIX("Mixed practice", L22[0], L22[2], L22[5], L22[8], L22[12]), MIX("Level 22 Challenge", L22[1], L22[3], L22[7], L22[10], L22[15], L22[17])]),
    23: L23.concat([MIX("Mixed practice", L23[0], L23[2], L23[5], L23[7], L23[12]), MIX("Level 23 Challenge", L23[1], L23[3], L23[8], L23[10], L23[15], L23[17])]),
    24: L24.concat([MIX("Mixed practice", L24[0], L24[2], L24[5], L24[7], L24[12]), MIX("Level 24 Challenge", L24[1], L24[3], L24[8], L24[10], L24[15], L24[17])])
  });
})();
