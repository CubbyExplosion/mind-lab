// ext/hand-25-27.js  Mind Lab Handwriting, levels 25-27 (60 lessons)
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

  // =============== LEVEL 25 ===============
  const A1 = mk("Ogham, writing on stone", "🪨", [
    "Ogham was used mainly to write which early language?|Early Irish|Old Norse|Ancient Greek",
    "How are Ogham letters made?|Strokes and notches along a stem line|Loops and curls in ink|Tiny pictures of animals",
    "Where are most surviving Ogham inscriptions found?|Carved on standing stones, mostly in Ireland|On clay tablets in Iraq|On paper scrolls in Egypt",
    "An Ogham stone is usually read starting from...|The bottom, running up the edge|The top, running down the face|The middle, running outward",
    "Roughly when was Ogham in use for carving?|The 400s to 600s CE|The 1800s|About 3000 BCE",
    "The 20 main Ogham letters are grouped in sets of...|Five|Two|Ten",
    "Why does Ogham suit carving on stone?|Straight cuts are easy to make along an edge|Curves are impossible in any material|It needs wet ink",
    "The long line that the strokes attach to is called the...|Stem line|Headline|Baseline of a ruled page"
  ],
    ["Think about the material it was made for and what shapes that material allows.", "Match the feature to how the script looks and where people actually found it.", "Example: runes are also made of straight lines, which suit carving in wood. Now do yours."],
    [["A script for stone", "🪨", "<b>Ogham</b> is an early Irish writing system carved mostly on standing stones in the 400s to 600s CE."], ["Strokes on a line", "📏", "Letters are <b>short strokes and notches</b> cut across or along a long <b>stem line</b>, usually the stone's edge. You read it bottom to top."], ["Fitting the material", "🔨", "Straight cuts are easy to carve. Scripts often take their shape from the <b>tool and the surface</b>."]]);

  const A2 = mk("Palm leaf and birch bark", "🌴", [
    "In South and Southeast Asia, many manuscripts were written on...|Dried palm leaves|Plastic sheets|Sheets of glass",
    "Palm-leaf writers often scratched letters with a...|Sharp stylus, then darkened the lines|Gold-tipped brush only|Typewriter",
    "Palm-leaf pages were often held together with...|A cord threaded through holes|Metal staples|Glue only",
    "Medieval everyday letters scratched on birch bark survive in...|Novgorod, in Russia|Rome, in Italy|Cairo, in Egypt",
    "The Novgorod birch-bark letters were mostly...|Everyday notes and messages|Royal laws printed in books|Maps of space",
    "In Kashmir, Sanskrit texts were often written on...|Birch bark|Printed newspaper|Cotton shirts",
    "Palm-leaf books are fragile mainly because of...|Damp, insects and brittleness|Too many readers|Magnets",
    "One reason palm leaf was popular in warm regions was that it was...|Cheap and local|Imported from far away|Made only by kings"
  ],
    ["Think about what grows near the writers and what a stylus or ink does to it.", "Look for the plant material and the method that fit the climate and place in the question.", "Example: papyrus was used in Egypt because it grew along the Nile. Now do yours."],
    [["Writing on plants", "🌴", "Before paper arrived, many places wrote on <b>plant materials</b>: palm leaves in South and Southeast Asia, birch bark in Kashmir and Russia."], ["Scratch and darken", "✏️", "Palm leaf was often <b>scratched with a stylus</b> and then rubbed with soot or oil. Pages were threaded on a cord."], ["Everyday notes", "💬", "In Novgorod, people scratched <b>ordinary messages</b> on birch bark in the 1000s to 1400s, a real window into daily life."]]);

  const A3 = mk("Printing in East Asia", "🖨️", [
    "The Diamond Sutra, the oldest dated printed book, is from about...|868 CE|1450 CE|1000 BCE",
    "Woodblock printing means...|Carving a whole page into a block, inking and pressing paper|Casting each letter in metal|Typing on a keyboard",
    "Who is credited with the first movable type in China?|Bi Sheng|Johannes Gutenberg|William Caxton",
    "Bi Sheng's first movable type was made of...|Baked clay|Gold|Plastic",
    "Korea printed the Jikji with metal movable type in...|1377|1877|1077",
    "Why was movable type harder for Chinese than for alphabets?|Thousands of different characters were needed|Chinese has no ink|Chinese was never written",
    "Early printing in East Asia was often used for...|Buddhist texts and calendars|Pop songs|Comic books",
    "Gutenberg's type in Europe was made mostly of...|A lead-based metal alloy|Clay|Stone"
  ],
    ["Think about which method carves a whole page and which one reuses single pieces.", "Pay attention to the material and the place named in the question.", "Example: a rubber stamp prints one fixed picture, while a set of letter stamps can be rearranged. Now do yours."],
    [["Printing from wood", "🪵", "<b>Woodblock printing</b> carved a whole page into a block. The Diamond Sutra of <b>868 CE</b> is the oldest dated printed book."], ["Pieces you can reuse", "🔤", "<b>Movable type</b> uses single characters you rearrange. Bi Sheng made clay type in China; Korea used <b>metal type</b> by 1377."], ["Alphabet advantage", "🔡", "A few dozen letters need few pieces. Chinese needs <b>thousands of characters</b>, so woodblocks stayed popular for centuries."]]);

  const A4 = mk("Caxton and early English printing", "📚", [
    "William Caxton set up the first printing press in England in...|1476|1276|1876",
    "Caxton printed an edition of Chaucer's...|The Canterbury Tales|Hamlet|Beowulf",
    "Where was the Gutenberg Bible printed, around 1455?|Mainz, in Germany|London, in England|Kyoto, in Japan",
    "Printing helped fix English spelling because...|Many identical copies spread one spelling|Printers banned spelling|Every book was different",
    "Caxton's types were modeled on...|A Gothic book hand|Italic handwriting|Modern sans-serif",
    "Compared with copying by hand, printing...|Made many copies cheaper and faster|Made books much rarer|Was slower for every book",
    "After printing arrived, hand scribes...|Still wrote certificates and luxury books|All vanished overnight|Switched to typewriters",
    "Caxton learned the printing trade mainly...|On the European mainland|In Egypt|In Australia"
  ],
    ["Think about how many copies a press can make compared with one pair of hands.", "Look for the answer about printing's real effects, not an extreme claim.", "Example: a school photocopier lets one page reach many students at once. Now do yours."],
    [["The press reaches England", "🏴", "William Caxton learned printing on the continent and set up England's first press at Westminster in <b>1476</b>."], ["Spelling gets fixed", "🔤", "Printers chose one spelling for <b>hundreds of identical copies</b>, so readers saw the same spellings everywhere."], ["Scribes carry on", "🖋️", "Handwriting did not disappear. It stayed vital for <b>letters, records and fine presentation books</b>."]]);

  const A5 = mk("Aldus and the first italic type", "🐬", [
    "Aldus Manutius ran his famous press in which city?|Venice|London|Mainz",
    "Aldus popularized small portable books in the format called...|Octavo|Scroll|Giant folio",
    "Italic type first appeared in print around...|1500|1700|1300",
    "Aldus's italic type was cut by...|Francesco Griffo|Johannes Gutenberg|Claude Garamond",
    "One reason italic helped small books was that it...|Saved space with narrow letters|Used bigger letters|Needed more paper",
    "The Aldine printer's mark showed...|A dolphin and anchor|A crown|A lion",
    "Early italic type used capitals that were...|Upright Roman capitals|Very swashy|Missing",
    "Italic type was based on the handwriting of...|Italian scholars and chancery scribes|Roman soldiers|Viking carvers"
  ],
    ["Think about a printer who wanted small books that were cheap to carry.", "The clue is in the space-saving shape of slanted writing and the printer's city.", "Example: tall narrow lettering fits more words on a line than wide lettering. Now do yours."],
    [["Books you can carry", "📖", "In Venice around 1500, <b>Aldus Manutius</b> printed small <b>octavo</b> books, easy to carry and cheaper than big volumes."], ["Type from handwriting", "✍️", "Francesco Griffo cut an <b>italic type</b> copying the narrow, quick chancery hand of Italian scholars."], ["A dolphin and anchor", "⚓", "Aldus's mark, a <b>dolphin wound round an anchor</b>, stood for 'hasten slowly': a famous printer's logo."]]);

  const A6 = mk("Hot metal: Linotype and Monotype", "🏭", [
    "The Linotype machine cast...|A whole line of type as one metal slug|One letter at a time only|Photographs",
    "Linotype's name comes from...|'Line o' type'|'Lined notes'|'Lion type'",
    "The brass letter molds inside a Linotype are called...|Matrices|Monitors|Manuscripts",
    "The Monotype system, by contrast, cast...|Individual letters|Full newspaper pages|Pencils",
    "Linotype was especially useful for newspapers because...|It set lines of text quickly|It printed in color only|It could not make errors",
    "After printing, the used metal could be...|Melted and recast|Stored uncut forever|Eaten",
    "People who set type by hand are called...|Compositors|Calligraphers|Cartographers",
    "Hot-metal typesetting was mostly replaced by...|Phototypesetting and digital type|Quill pens|Woodblocks"
  ],
    ["Think about the difference between casting one letter and casting a full line.", "Look at the word parts: 'mono' means one, and check what each machine produced.", "Example: a stamp pad with one stamp per letter works like single type; a name label stamp is a whole line. Now do yours."],
    [["Fast typesetting", "⌨️", "The <b>Linotype</b> (1880s, Ottmar Mergenthaler) let an operator type a line while the machine cast it as one <b>slug</b> of hot metal."], ["One letter at a time", "🔤", "The <b>Monotype</b> system cast <b>single letters</b>, handy for books and tables, and it was easy to fix one letter."], ["Reuse", "♻️", "After printing, the metal was <b>melted and recast</b>. Later, photo and digital type replaced hot metal."]]);

  const A7 = mk("Points and picas", "📐", [
    "How many points are in one pica?|12|6|72",
    "About how many picas are in one inch?|6|12|72",
    "About how many points are in one inch in desktop publishing?|72|12|6",
    "A 24-point heading is how many picas tall (as a type size)?|2|4|12",
    "6 picas equals how many points?|72|6|36",
    "A 3-pica margin is how many points?|36|3|18",
    "Line spacing in type (leading) is measured in...|Points|Degrees|Ounces",
    "Europe's Didot point is...|Slightly larger than the American point|Exactly an inch|Smaller than a millimeter by far"
  ],
    ["Remember the relationship between one pica and its points, then multiply or divide.", "A pica is a small unit made of a fixed number of points. Work out the arithmetic step by step.", "Example: 4 picas times 12 points per pica gives 48 points. Now do yours."],
    [["Printers' units", "📏", "Type is measured in <b>points</b>. <b>12 points = 1 pica</b>. In digital type, <b>72 points = 1 inch</b>, so 6 picas = 1 inch."], ["Do the math", "🧮", "To convert picas to points, <b>multiply by 12</b>. To go back, divide by 12."], ["Leading too", "↕️", "<b>Leading</b> (the space between lines) uses points too. Text of 10 points often has 12 points of leading."]]);

  const A8 = mk("Unicode and fonts", "🔠", [
    "Unicode gives each character a unique...|Code point|Ink color|Pen size",
    "Standard ASCII covers how many characters?|128|26|1,000,000",
    "UTF-8 is...|An encoding that stores Unicode text as bytes|A kind of pen|A paper size",
    "Why was Unicode created?|To give writing systems one shared standard|To ban fonts|To replace paper",
    "A font is...|A design for showing characters|The same thing as the character|A code point",
    "An empty box ('tofu') on screen usually means...|The font lacks that character|The computer is broken forever|The ink ran out",
    "Which scripts does Unicode include?|Latin, Arabic, Devanagari and many more|Only Latin|Only English",
    "Emoji are...|Characters in Unicode too|Pictures with no code|Fonts"
  ],
    ["Think about the difference between the idea of a letter and how it is drawn.", "The character itself has a number; the picture of it is chosen separately.", "Example: the letter A is the same character in many fonts, drawn differently. Now do yours."],
    [["A number for every character", "🔢", "<b>Unicode</b> gives each character from writing systems around the world a unique <b>code point</b>."], ["Character vs font", "🅰️", "The character is stored as a number. The <b>font</b> decides how it looks. Missing glyphs show as empty boxes."], ["Encodings", "💾", "<b>UTF-8</b> is a common way to store Unicode as bytes. Older <b>ASCII</b> had only 128 characters."]]);

  const A9 = mk("The book as an object", "📕", [
    "Codicology is the study of...|Manuscript books as physical objects|The stars|Animal bones",
    "A quire is...|A gathering of folded sheets sewn together|A kind of quill|A page border",
    "Recto means...|The front side of a leaf|The back side of a leaf|The book's spine",
    "A citation '12v' points to...|The back of leaf 12|The front of leaf 12|Volume 12",
    "A bifolium is...|One sheet folded in half, making two leaves|Two whole books|A kind of ink",
    "A catchword at the bottom of a page...|Gives the first word of the next page or quire|Is the scribe's name|Marks the end of the book",
    "On parchment, the hair side is usually...|Darker and rougher than the flesh side|Smoother and whiter|Impossible to tell",
    "A leaf is...|One sheet with a front and a back|A tree part used as ink|Half a word"
  ],
    ["Think of a book as made of folded sheets gathered into groups.", "Narrow down by the word's meaning: front, back, fold or gathering.", "Example: folding one sheet of paper once gives 2 leaves, which is 4 pages. Now do yours."],
    [["Books as objects", "🧱", "<b>Codicology</b> studies how manuscript books were physically made: skins, folding, sewing and binding."], ["Leaves and sides", "📄", "A <b>leaf</b> has two sides: <b>recto</b> (front) and <b>verso</b> (back). '12v' means the back of leaf 12."], ["Gatherings", "🧵", "Sheets are folded into a <b>bifolium</b> and nested in a <b>quire</b>. <b>Catchwords</b> help bind quires in order."]]);

  const A10 = mk("Palimpsests", "🔍", [
    "A palimpsest is a manuscript in which...|Earlier writing was scraped off and written over|Pages are glued shut|All pages are blank",
    "Why were pages reused?|Parchment was costly|Scribes hated old books|Paper was banned",
    "The Archimedes Palimpsest hid works by...|Archimedes|Shakespeare|Homer",
    "Erased writing can often be revealed with...|Multispectral imaging|A hot iron|Sandpaper",
    "Imaging light of different colors helps because...|Old ink and parchment react differently|It paints new letters|It dissolves the page",
    "The word palimpsest comes from Greek roughly meaning...|Scraped again|Written twice|Hidden gold",
    "Why do researchers avoid harsh chemicals today?|They can damage the page|Chemicals are free|They make writing bigger",
    "The Archimedes Palimpsest was reused as a...|Prayer book|Cookbook|Map"
  ],
    ["Think about why a scribe would erase and reuse a page.", "Pick the answer about the method or the reason, not the dramatic one.", "Example: a whiteboard that still shows faint marks after erasing hints at an earlier message. Now do yours."],
    [["Scrape and reuse", "🧽", "Parchment was costly, so scribes sometimes <b>scraped off old writing</b> and wrote again. The result is a <b>palimpsest</b>."], ["Hidden texts", "🕵️", "The Archimedes Palimpsest, a 13th-century prayer book, was written over works by <b>Archimedes</b>."], ["Light, not chemicals", "💡", "<b>Multispectral imaging</b> uses many colors of light to show faint text without harming the page."]]);

  const A11 = mk("Watermarks and paper clues", "💧", [
    "A watermark in paper is made by...|A wire design in the mold that thins the paper|Ink printed on top|A pencil",
    "You see a watermark best by...|Holding the sheet up to the light|Wetting it with oil|Folding it",
    "Watermarks help historians...|Date and place paper|Read minds|Guess the ink flavor",
    "Laid paper shows...|Faint parallel lines when held to light|A woven mesh pattern only|No pattern at all",
    "Wove paper is made on a mold of...|Fine woven mesh|Thick chain lines|Wooden slats",
    "Paper before the 1800s was mostly made from...|Cotton and linen rags|Wood pulp|Plastic",
    "Wood-pulp paper became widespread in the...|1800s|1200s|Stone Age",
    "Modern banknotes use watermarks to...|Make forgery harder|Make them heavier|Change their color daily"
  ],
    ["Think about how a pattern can be part of the paper rather than printed on it.", "Light passing through the sheet is the key clue here.", "Example: a leaf pressed in damp clay leaves a mark you can see from the side. Now do yours."],
    [["A mark in the paper", "💧", "A <b>watermark</b> comes from a wire design in the mold. The paper is thinner there, so it shows when held to the <b>light</b>."], ["Laid and wove", "🧶", "<b>Laid paper</b> shows faint parallel lines; <b>wove paper</b> comes from fine mesh and looks smooth."], ["Dating with paper", "🗓️", "Rag paper came first; <b>wood-pulp paper</b> spread in the 1800s. Watermark designs help date and place old documents."]]);

  const A12 = mk("Colophons and scribe notes", "🖊️", [
    "A colophon is a note, usually at the end, that gives...|Details about the scribe, place or date|The table of contents|A map",
    "Many medieval colophons ask readers to...|Pray for the scribe|Buy more books|Return the book to the shop",
    "Marginalia are...|Notes and drawings in the margins|Page numbers|Book covers",
    "Why are dated colophons valuable?|They help date and place other undated manuscripts|They remove errors|They add pictures",
    "Modern books can have a colophon that lists...|The typeface and printing details|The next book's plot|The author's age",
    "The Latin word incipit means...|Here begins|Here ends|The pen",
    "The Latin word explicit at a text's end signals...|The text ends here|The text starts here|A new chapter title",
    "A rubric is text written in...|Red ink|Gold only|Pencil"
  ],
    ["Think about what a scribe would want to record or ask the reader.", "A clue is in the Latin: start words and end words come in pairs.", "Example: a dedication page says who a book is for. Now do yours."],
    [["The scribe speaks", "🗣️", "A <b>colophon</b> is a note by the scribe or printer saying who made the book, where and when, and sometimes asking for prayers."], ["Margins", "📝", "<b>Marginalia</b> are notes and doodles in the margins. They show how real readers used the book."], ["Helpful markers", "🔴", "<b>Incipit</b> means 'here begins', <b>explicit</b> 'here ends', and a <b>rubric</b> is a heading in red ink."]]);

  const A13 = mk("Humanist script", "🏛️", [
    "Humanist scholars in early 1400s Italy revived...|Carolingian minuscule, thinking it was ancient Roman|Runic writing|Blackletter",
    "Which scholar helped shape the humanist hand?|Poggio Bracciolini|Charlemagne|William Caxton",
    "Humanist script is an ancestor of...|Today's Roman lowercase type|Blackletter type|Cuneiform",
    "Humanists disliked the Gothic style because...|They found it medieval and less clear|It was illegal|It was too colorful",
    "Humanist cursive developed into...|Italic handwriting|Runic carving|Hieroglyphs",
    "Nicolas Jenson's roman type of 1470 was modeled on...|Humanist handwriting|Egyptian hieroglyphs|Rune stones",
    "The humanists' belief that the script was ancient Roman was...|A mistake, since it was medieval|Exactly correct|A joke",
    "Humanist letters are known for being...|Round, open and well spaced|Dense and angular|Tiny and unreadable"
  ],
    ["Think about scholars who wanted to bring back what they believed was ancient.", "Compare angular medieval writing with the rounder style that followed.", "Example: a revival style often borrows from an older model, such as retro lettering. Now do yours."],
    [["Back to the ancients", "🏛️", "Early 1400s Italian <b>humanists</b> wanted a clearer script. They revived <b>Carolingian minuscule</b>, believing it ancient Roman."], ["Round and open", "⭕", "<b>Humanist minuscule</b> has round, open letters and generous spacing, in contrast to compact Gothic hands."], ["From pen to type", "🔤", "Printers like Jenson modeled <b>roman type</b> on it, so today's lowercase descends from this hand."]]);

  const A14 = mk("Tibetan scripts", "🏔️", [
    "The formal 'headed' style of Tibetan script is called...|Uchen|Umê|Naskh",
    "The 'headless' handwriting style is called...|Umê|Uchen|Kufic",
    "Tibetan script is based on...|Indian Brahmic scripts|Chinese characters|The Latin alphabet",
    "In Tibetan, vowels are shown by...|Marks above or below consonants|Separate full letters only|Colors",
    "Syllables in Tibetan are separated by a mark called the...|Tsek|Chop|Pilcrow",
    "Tibetan is written...|Left to right|Right to left|Top to bottom only",
    "Traditional Tibetan books were often printed with...|Carved woodblocks|Linotype|Laser printers",
    "A script related to Tibetan is used for Dzongkha in...|Bhutan|Brazil|Iceland"
  ],
    ["Think about what 'headed' means for the top of the letters.", "Compare the two styles by whether they have a top line and how formal they are.", "Example: print letters are formal and separate, while cursive is quick and flowing. Now do yours."],
    [["Two hands", "🖋️", "<b>Uchen</b> ('with a head') is the formal Tibetan script with a top line. <b>Umê</b> ('headless') is the quick handwriting."], ["Born from India", "🧭", "Tibetan is based on <b>Indian Brahmic scripts</b>. Marks above and below consonants show <b>vowels</b>."], ["Dots between syllables", "•", "A small mark, the <b>tsek</b>, separates syllables. Many books were printed from <b>woodblocks</b>."]]);

  const A15 = mk("Ethiopic (Ge'ez) script", "🌍", [
    "Ge'ez script is used to write languages such as...|Amharic and Tigrinya|Korean|Spanish",
    "Each basic Ge'ez sign shows...|A consonant plus a vowel|One vowel only|A whole word",
    "The same Ge'ez consonant changes shape to show a vowel in about...|Seven forms|Two forms|One form",
    "Ethiopic writing runs...|Left to right|Right to left|In spirals",
    "Ge'ez is still a liturgical language of...|Ethiopian and Eritrean churches|Roman senates|Japanese schools",
    "Ethiopia is unusual in Africa because it has...|An indigenous script used for centuries|No writing|Only Latin",
    "Such a script, where signs carry a built-in vowel, is called an...|Abugida|Alphabet of pictures|Abacus",
    "Ethiopian manuscripts were often written on...|Parchment, using red and black inks|Plastic|Birch bark"
  ],
    ["Think about how one sign can carry both a consonant and a vowel.", "Focus on the type of system: syllable-like signs that change a bit for each vowel.", "Example: in Hindi's Devanagari, a consonant sign has a built-in a and takes marks for other vowels. Now do yours."],
    [["An African script", "🌍", "<b>Ge'ez</b> script writes Amharic, Tigrinya and Ge'ez itself. It is an <b>indigenous African script</b> used for centuries."], ["Consonant plus vowel", "🔠", "Each basic sign has a built-in vowel and changes shape for <b>seven vowel orders</b>. This kind of system is an <b>abugida</b>."], ["On parchment", "📜", "Ethiopian manuscripts used <b>parchment</b> with red and black inks. The script is written left to right."]]);

  const A16 = mk("Georgia's three scripts", "🔤", [
    "How many historical scripts has Georgian had?|Three|One|Seven",
    "The everyday modern Georgian script is...|Mkhedruli|Asomtavruli|Kufic",
    "The oldest, rounded, capital-like Georgian script is...|Asomtavruli|Mkhedruli|Cyrillic",
    "Modern Georgian Mkhedruli has no...|Uppercase and lowercase|Vowels|Words",
    "Modern Georgian has how many letters?|33|26|44",
    "Georgian is written...|Left to right|Right to left|Top to bottom only",
    "UNESCO recognized Georgia's three writing systems as...|Intangible cultural heritage|A mountain range|A new font",
    "The name Mkhedruli is linked to a word for...|Horseman|Mountain|Scribe"
  ],
    ["Think about how many versions of the script exist and which is used on signs today.", "The oldest form has the most rounded, formal shapes; the newest is for daily life.", "Example: many countries have both formal ceremonial lettering and everyday handwriting. Now do yours."],
    [["Three writing systems", "3️⃣", "Georgia has <b>Asomtavruli</b>, <b>Nuskhuri</b> and <b>Mkhedruli</b>. UNESCO has recognized them as cultural heritage."], ["The modern script", "🔤", "<b>Mkhedruli</b> is the everyday script with <b>33 letters</b>, written left to right, with no capital letters."], ["Old and new", "⏳", "Asomtavruli is the old, rounded, formal script, once used for inscriptions and church books."]]);

  const A17 = mk("The Armenian alphabet", "💡", [
    "The Armenian alphabet was created by...|Mesrop Mashtots|Cyril|Sequoyah",
    "It was created around...|405 CE|1405 CE|205 BCE",
    "The alphabet first had about how many letters?|36|12|60",
    "A main goal of creating it was to...|Write Armenian and translate the Bible|Print newspapers|Replace Greek numbers",
    "Armenian is written...|Left to right|Right to left|Top to bottom",
    "Erkatagir, 'iron letters', is an old Armenian style that is...|Capital-like and angular|Cursive only|Pictures",
    "Armenian, Hangul and the Cherokee syllabary share what feature?|Each has a known inventor|All came from hieroglyphs|All have no vowels",
    "Bolorgir, 'rounded letters', is a style of...|Armenian lowercase writing|Chinese brush writing|Runic carving"
  ],
    ["Think about writing systems that were invented on purpose by one person.", "The clue is in what the alphabet was made for and its century.", "Example: King Sejong led the creation of Hangul so more people could read. Now do yours."],
    [["A planned alphabet", "💡", "<b>Mesrop Mashtots</b> created the Armenian alphabet around <b>405 CE</b>, first used to translate the Bible and write Armenian."], ["Two styles", "🖋️", "<b>Erkatagir</b> is an old capital-like style; <b>Bolorgir</b> is a rounded, lowercase style."], ["Inventors", "🧠", "Armenian, Hangul and the Cherokee syllabary were each <b>designed by known people</b>, unlike most alphabets that grew slowly."]]);

  const A18 = mk("The Barnum effect", "🎪", [
    "The Barnum (Forer) effect is when people...|Accept vague statements as personal descriptions|Win circus prizes|Forget their names",
    "'You sometimes doubt yourself' feels true because...|It applies to almost everyone|The writer is psychic|It is always false",
    "Bertram Forer's 1948 classroom demo gave students...|The same 'personal' description, rated highly accurate|Different handwriting samples|A math test",
    "Another name for the Barnum effect is the...|Forer effect|Franklin effect|Morse effect",
    "A good way to test a handwriting-analysis claim is...|A blind test against known facts|Asking if it feels right|Asking the reader for confidence",
    "Why aren't personal testimonials enough?|People remember hits and forget misses|They are always correct|They are too short",
    "Reviews of graphology and job performance found...|Little or no predictive value|Strong predictions|Perfect accuracy",
    "A statement that is specific and checkable is...|Easier to test than a vague one|Impossible to test|Always true"
  ],
    ["Think about why a description could seem to fit nearly everyone.", "Look for the answer about testing fairly, without clues, rather than feelings.", "Example: a horoscope that says 'a change is coming' can fit anyone's week. Now do yours."],
    [["Too vague to fail", "🎪", "The <b>Barnum (Forer) effect</b>: people accept vague, flattering statements as describing them personally."], ["Test it blind", "🧪", "To test a claim, give the reader <b>samples without clues</b> and compare the results with known facts."], ["What studies show", "📊", "Reviews of <b>graphology</b> have found little or no ability to predict job performance or personality."]]);

  const L25 = [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18];

  // =============== LEVEL 26 ===============
  const B1 = mk("The pen and the keyboard", "⌨️", [
    "In the well-known 2014 study, laptop note takers tended to...|Type near word-for-word notes|Draw pictures only|Take no notes",
    "Hand note takers had to...|Summarize in their own words as they went|Copy every word|Skip the lecture",
    "On conceptual questions, hand note takers often scored...|Better in the original study|Far worse|The same every time",
    "Later replication attempts found the effect...|Smaller or less consistent|Always much bigger|Impossible to measure",
    "Why can summarizing help learning?|It makes you process the meaning|It makes you work slower and rest|It shortens the lecture",
    "A replication is...|Repeating a study to see if results hold|Copying someone's paper|A kind of lab notebook",
    "A fair takeaway is that learning depends on...|How you take notes, not only the tool|The brand of the pen|The color of the screen",
    "Typists can do as well as handwriters when they...|Paraphrase instead of transcribing|Type faster|Use bigger screens"
  ],
    ["Think about what your mind must do when you cannot write everything down.", "Look for the answer about thinking and meaning, not about machines or brands.", "Example: summarizing a movie plot forces you to pick what matters, unlike reciting every line. Now do yours."],
    [["Verbatim vs your words", "💬", "In a 2014 study, laptop users often typed <b>near-verbatim notes</b>, while handwriters had to <b>summarize</b>, which can deepen understanding."], ["Mixed evidence", "⚖️", "Later studies found the pen advantage <b>smaller and less consistent</b>. Science improves by <b>replication</b>."], ["The real lesson", "🎯", "The method matters: whether by hand or keyboard, <b>paraphrasing and organizing</b> beat copying word for word."]]);

  const B2 = mk("Working memory and cognitive load", "🧠", [
    "Working memory is...|The small space that holds and handles information briefly|A permanent store|A type of notebook",
    "George Miller's 1956 paper made famous the number...|Seven, plus or minus two|One hundred|Ten thousand",
    "Later research suggests we hold about how many chunks at once?|Around four|Around fifty|Zero",
    "Cognitive load theory says learning suffers when...|Too much new information arrives at once|The room is silent|You write neatly",
    "Writing notes can lower load because...|It moves information out of your head onto paper|It deletes memories|It makes you read faster",
    "Cluttered notes can raise load because...|Your eyes must search for what matters|They are always wrong|They weigh more",
    "Long-term memory is...|A very large and lasting store|The same as working memory|Temporary only",
    "A way to reduce load is to...|Break a task into smaller steps|Learn everything at once|Skip reviewing"
  ],
    ["Think about how many things you can juggle in your mind at the same moment.", "The limit is small, so look for the answer about easing the pressure on it.", "Example: writing a shopping list means you do not have to hold ten items in your head. Now do yours."],
    [["A small workspace", "🧠", "<b>Working memory</b> holds only a few <b>chunks</b> at once, perhaps about four. Miller's famous estimate was seven plus or minus two."], ["Cognitive load", "🏋️", "If too much new information arrives together, learning breaks down. Splitting tasks into <b>steps</b> reduces <b>cognitive load</b>."], ["Paper as helper", "📝", "Notes act as an outside memory. Clear, <b>well-organized</b> notes free your mind for thinking."]]);

  const B3 = mk("The forgetting curve", "📉", [
    "Hermann Ebbinghaus studied memory in the...|1880s|1980s|1680s",
    "He memorized lists of...|Nonsense syllables|Famous poems|Maps",
    "The forgetting curve shows memory fading...|Fast at first, then more slowly|At a steady rate forever|Not at all",
    "What helps flatten the curve?|Reviewing at spaced times|Rereading once and stopping|Avoiding sleep",
    "Each successful review tends to make memory last...|Longer|Shorter|Exactly the same",
    "Why did he use nonsense syllables?|So prior meanings would not affect the test|They are easy to remember|They are real words",
    "A quick review soon after class helps because...|It catches memories before the steepest drop|It erases the lesson|It is always enough",
    "Ebbinghaus's main test subject was...|Himself|His students|A group of cats"
  ],
    ["Think about when forgetting happens fastest: right away or much later.", "Compare how reviewing at planned times changes the shape of the curve.", "Example: a new phone number is hardest to recall an hour later, then fades slowly. Now do yours."],
    [["Fast then slow", "📉", "<b>Ebbinghaus</b> (1885) found we forget <b>quickly at first</b>, then more slowly, without review."], ["Flatten it", "📈", "<b>Spaced reviews</b> make each memory last longer. A short review soon after learning matters most."], ["Careful science", "🔬", "He tested <b>himself</b> with <b>nonsense syllables</b> so earlier knowledge could not help."]]);

  const B4 = mk("Dual coding", "🖼️", [
    "Dual coding theory, by Allan Paivio, says we learn well from...|Words and images together|Words only|Silence",
    "Which note best uses dual coding?|A labeled diagram beside a short explanation|Ten pages of unbroken text|A list of page numbers",
    "A drawing helps most when it...|Shows the idea's meaning|Is only decoration|Is very large",
    "Interesting but unrelated details that distract are called...|Seductive details|Footnotes|Pilcrows",
    "Simple sketches in notes...|Still help, even if not artistic|Only work for artists|Make notes worse",
    "Dual coding works partly because the brain has...|Separate verbal and visual channels|Two left hands|A built-in printer",
    "When making a timeline, you can add dual coding with...|Small icons for events|More text only|Blank space",
    "Where should labels go on a diagram?|Right next to the part they name|On a separate page|Anywhere at all"
  ],
    ["Think about learning from both a picture and words that explain it.", "Choose the option that connects the picture to the idea, not the one that only decorates.", "Example: a map with place names beside each spot is easier to remember than a list of names. Now do yours."],
    [["Words plus pictures", "🖼️", "<b>Dual coding</b> (Paivio) means pairing <b>words and visuals</b>: diagrams, icons and sketches linked to the idea."], ["Meaningful visuals", "🎨", "Pictures help when they <b>show the idea</b>. Fun but unrelated extras, called <b>seductive details</b>, can distract."], ["Labels near parts", "🏷️", "Put labels <b>right next to the thing they name</b>. Simple sketches are enough."]]);

  const B5 = mk("Self-explanation", "💭", [
    "Self-explanation means...|Explaining to yourself how and why steps work|Rereading quickly|Copying the page",
    "A good self-explanation question starts with...|Why or how|What color|How many pages",
    "Elaborative interrogation asks you to...|Ask why a fact is true|Memorize without meaning|Highlight everything",
    "A big review of study techniques (Dunlosky and others, 2013) rated which as high-utility?|Practice testing and spaced practice|Highlighting and rereading|Underlining",
    "Which sentence shows elaboration?|Ink dries faster on absorbent paper because it soaks in|Ink dries|Paper is paper",
    "Self-explaining works best when you...|Put it in words, then check yourself|Never check|Only watch someone else",
    "When you cannot explain a step, you have found...|A gap to study|A reason to quit|A mistake to hide",
    "Explaining a step in your own words is better than...|Recopying it unchanged|Thinking about meaning|Asking why"
  ],
    ["Think about the difference between knowing a fact and knowing why it works.", "Look for the option that adds a reason or a connection, rather than repeating.", "Example: instead of 'oil floats', say 'oil floats because it is less dense than water'. Now do yours."],
    [["Say why", "💭", "<b>Self-explanation</b> means telling yourself <b>why and how</b> each step works while you study."], ["Add reasons", "🔗", "<b>Elaboration</b> connects a new fact to what you know, using the word <b>because</b>."], ["Strong techniques", "🏆", "Reviews of study methods rate <b>practice testing</b> and <b>spacing</b> high, and plain highlighting or rereading low."]]);

  const B6 = mk("Interleaving", "🔀", [
    "Interleaving means...|Mixing different problem types in one session|Doing all of one type in a row|Studying with music",
    "Doing many problems of the same type in a row is called...|Blocked practice|Interleaved practice|Random sleep",
    "Interleaving often feels harder but leads to...|Better long-term learning|Worse results|No learning",
    "Why does interleaving help?|You must choose the right method each time|It is easier to forget|It saves paper",
    "In handwriting practice, interleaving might mean...|Alternating different letters and joins|One page of the same letter|Never practicing joins",
    "Blocked practice can look good in the session because...|Performance improves quickly while repeating|It cannot be measured|It avoids the real skill",
    "Interleaving works best when topics are...|Similar enough to be confused|Totally unrelated|Identical",
    "A music student who rotates scales, a piece and sight-reading is using...|Interleaving|Blocked practice only|No method"
  ],
    ["Think about practicing a bit of everything versus a lot of one thing.", "Look for the answer that involves switching between kinds of problems.", "Example: a sports team that mixes passing, shooting and defense drills in one practice. Now do yours."],
    [["Mix it up", "🔀", "<b>Interleaving</b> mixes different kinds of problems or skills in one session instead of <b>blocking</b> them."], ["Harder but better", "💪", "It feels tougher and slower, yet usually brings <b>better long-term learning</b>, because you must pick the method each time."], ["For handwriting", "✍️", "Rotate between letters, joins and words in practice, and revisit earlier skills."]]);

  const B7 = mk("Illusions of knowing", "🪞", [
    "Rereading a page can make it feel familiar, creating...|An illusion of knowing|Real mastery|A new language",
    "Metacognition means...|Thinking about your own thinking|Thinking very fast|Writing in code",
    "A reliable way to check learning is to...|Test yourself without looking|Reread the notes|Hope for the best",
    "Cramming often leads to...|Quick forgetting|Lasting memory|Better handwriting",
    "Judgments of how well you know something are often more accurate when made...|After a delay|Right after reading|Never",
    "Fluency here means...|Ease of processing|Speed of the pen|Pen thickness",
    "Which is the strongest sign you know it?|You can explain it from a blank page|It looks familiar|You underlined it twice",
    "Copying notes over without thinking is mostly...|Passive|Active|Impossible"
  ],
    ["Think about the difference between recognizing something and recalling it.", "Compare passive looking with active retrieval, and choose the stronger evidence.", "Example: you recognize a friend's number when you see it, but can you write it from memory? Now do yours."],
    [["Familiar is not known", "🪞", "Rereading makes text feel familiar, which can create an <b>illusion of knowing</b>."], ["Think about thinking", "🧭", "<b>Metacognition</b> is checking your own understanding. The best check is <b>testing yourself</b> from memory."], ["Delay helps", "⏳", "Judging your knowledge <b>after a delay</b> is more honest than right after reading."]]);

  const B8 = mk("Chunking", "🧩", [
    "Chunking means grouping items into...|Meaningful units|Longer lists|Random piles",
    "Why is 555-0142 easier than 5550142?|The dash forms chunks|It is shorter|It uses letters",
    "Chess experts remember positions well partly because they see...|Familiar patterns as chunks|Single pieces only|Nothing",
    "An acronym helps memory by...|Chunking a list into one word|Adding more items|Hiding the list",
    "Notes with clear headings help because they...|Group ideas into chunks|Fill the page|Use less ink",
    "Chunking gets easier with...|Knowledge and practice|Quitting early|Extra silence",
    "A list of 12 items is easier if you group them into...|3 or 4 categories|12 separate lines|One long sentence",
    "A chunk is stored as...|One unit in working memory|Twelve separate items|Nothing at all"
  ],
    ["Think about how a long number is easier when it is split into small groups.", "Look for the answer that creates groups with meaning.", "Example: remembering 1492 as one date instead of four digits. Now do yours."],
    [["Group to remember", "🧩", "<b>Chunking</b> groups separate items into <b>meaningful units</b>, like splitting a phone number."], ["Experts see patterns", "♟️", "Experts store many <b>patterns</b> as single chunks, so they hold more in working memory."], ["On paper", "📋", "Use <b>headings, groups and acronyms</b> in notes to chunk a long list into a few categories."]]);

  const B9 = mk("Paraphrasing and summarizing", "🔁", [
    "A paraphrase is...|Your own words with the same meaning, similar length|A shorter list of main points|A direct quotation",
    "A summary is...|A shorter version with just the main points|A word-for-word copy|A question",
    "Changing a few words but keeping the sentence structure is called...|Patchwriting|Paraphrasing well|Quoting",
    "A good paraphrase still needs...|A citation|No credit|A new title",
    "To paraphrase well, first...|Read, close the source, then write from memory|Copy and swap words|Skip reading",
    "A direct quote needs...|Quotation marks and a citation|Only a title|Nothing",
    "Use a direct quote when...|The exact words matter|You want to save effort|You forgot the idea",
    "A good summary includes...|The main idea, not small details|Every detail|Only the title"
  ],
    ["Think about restating an idea in a way that shows you understood it.", "Check whether the option copies the original structure or truly changes it.", "Example: 'The cat sat on the mat' becomes 'A cat rested on the rug'. Now do yours."],
    [["Your own words", "🔁", "A <b>paraphrase</b> restates an idea in your own words and structure. A <b>summary</b> is shorter and gives only the main points."], ["Avoid patchwriting", "⚠️", "Swapping a few words in the original sentence is <b>patchwriting</b>. Close the source and write from memory."], ["Always credit", "🏷️", "Paraphrases still need a <b>citation</b>. Direct quotes also need <b>quotation marks</b>."]]);

  const B10 = mk("Dyslexia-friendly design", "📖", [
    "Dyslexia mainly affects...|Reading and spelling accuracy and fluency|Intelligence|Hearing",
    "A helpful layout is text that is...|Left-aligned with a ragged right edge|Fully justified in tiny type|Centered everywhere",
    "More space between lines and letters can...|Help some readers|Make no difference ever|Be illegal",
    "Long stretches of italic or underlined text can be...|Harder for some readers|Always easier|Required",
    "Research on special dyslexia fonts shows...|Mixed or limited evidence|Proven big benefits for all|They cure dyslexia",
    "A helpful accommodation is...|Extra time or typing options|Hiding the test|Less sleep",
    "Dyslexia and dysgraphia are...|Different, but can occur together|The same thing|Never found together",
    "Off-white matte paper can help because...|It reduces glare|It changes the words|It is heavier"
  ],
    ["Think about design choices that make letters and lines easier to follow.", "Look for evidence-based support rather than a miracle fix.", "Example: a worksheet with wide margins and short paragraphs is easier to follow. Now do yours."],
    [["Reading differences", "📖", "<b>Dyslexia</b> affects accurate, fluent reading and spelling. It is not about intelligence."], ["Design helps", "📐", "Use <b>left-aligned text</b>, clear spacing, limited italics and plain, matte paper."], ["Beware miracle fonts", "🔬", "Studies of special dyslexia fonts show <b>mixed or limited</b> benefit. Support and extra time matter more."]]);

  const B11 = mk("Tactile aids and braille by hand", "⠿", [
    "Raised-line paper helps writers with low vision or blindness by...|Giving a feel for the lines|Making ink dry quicker|Changing the letters",
    "A signature guide is...|A frame with a cutout in which you sign|A print of someone's name|A pen grip",
    "Bold-line paper is designed for...|Writers with low vision|Left-handed writers only|Calligraphers",
    "With a braille slate and stylus, a writer works...|Right to left, in mirror image|Left to right, normally|Top to bottom only",
    "A Perkins Brailler is...|A mechanical braille typewriter|A kind of pencil|A reading light",
    "High contrast, such as black ink on white paper, helps...|Many writers with low vision|Nobody|Only printers",
    "A tactile ruler or guide helps by...|Letting fingers find the line or margin|Changing the writer's name|Making the page larger",
    "In braille, each cell has up to how many dots?|Six|Two|Twelve"
  ],
    ["Think about guides that you can feel rather than only see.", "Look for the tool whose job matches the described need.", "Example: a raised border on a form helps fingers find where to sign. Now do yours."],
    [["Guides for the hands", "✋", "<b>Raised-line</b> and <b>bold-line</b> paper, <b>signature guides</b> and tactile rulers help writers find the page's lines and spaces."], ["Writing braille", "⠿", "With a <b>slate and stylus</b>, dots are punched from the back, so writing runs right to left in mirror image. A <b>Perkins Brailler</b> is a braille typewriter."], ["Contrast", "⚫", "<b>High contrast</b> like black on white helps many writers with low vision."]]);

  const B12 = mk("Writing sign languages", "🤟", [
    "SignWriting was created by Valerie Sutton in...|1974|1874|1994",
    "SignWriting records...|Handshapes, movements and facial expressions|Spoken sounds only|Music only",
    "SignWriting is usually written...|Vertically, top to bottom|Right to left only|In circles",
    "American Sign Language has its own...|Grammar, different from English|Alphabet only|Voice",
    "William Stokoe's 1960 notation helped show that ASL is...|A true language|A set of gestures only|An English code",
    "Valerie Sutton earlier developed a system to write...|Dance movement|Chess moves|Recipes",
    "Fingerspelling (the manual alphabet) is used to...|Spell names or words without a sign|Replace sign language|Draw maps",
    "Sign languages differ by country because...|They grew within different communities|One was invented by a committee|They are all the same"
  ],
    ["Think about what has to be recorded: hands, motion and the face.", "Notice the idea that signing is a real language with its own rules.", "Example: dance notation records movement and position on paper. Now do yours."],
    [["Signs on paper", "✍️", "<b>SignWriting</b> (Valerie Sutton, 1974) records <b>handshape, movement, location and facial expression</b>, usually in columns."], ["A true language", "🗣️", "<b>William Stokoe</b> (1960) showed that ASL has its own structure. Sign languages are <b>not</b> signed versions of English."], ["Fingerspelling", "🤟", "The <b>manual alphabet</b> spells names and words, but is only one small part of signing."]]);

  const B13 = mk("Automatic handwriting", "⚙️", [
    "Handwriting is automatic when...|Forming letters needs little conscious thought|You must think of each stroke|The pen is new",
    "Researchers like Virginia Berninger found children with fluent handwriting often...|Write longer, better compositions|Write less|Cannot spell",
    "Why does automaticity help writing?|It frees working memory for ideas|It makes letters bigger|It removes spelling",
    "A good way to build automaticity is...|Short, frequent practice|One huge session a year|Avoiding feedback",
    "Slow, effortful handwriting can lead students to...|Write less or use simpler words|Write more|Win contests",
    "One measure of fluency is writing the alphabet from memory...|In a set time|With eyes closed only|Backwards only",
    "Typing also becomes automatic with...|Practice|Rest only|A bigger screen",
    "Fluent but unreadable writing is...|Not a complete success|Perfect|Impossible"
  ],
    ["Think about how a skill feels when you no longer have to think about each move.", "The main benefit is about what your mind can do instead.", "Example: once tying shoes is automatic, you can talk while doing it. Now do yours."],
    [["Writing on autopilot", "⚙️", "<b>Automatic</b> handwriting means letters flow with little conscious effort."], ["Freed mind", "🧠", "When forming letters is easy, <b>working memory</b> can focus on ideas and sentences. Children with fluent handwriting often write more."], ["Practice, then balance", "⏱️", "Build it with <b>short, frequent practice</b>, but keep <b>legibility</b> as a goal too."]]);

  const B14 = mk("Expressive writing", "📓", [
    "Who pioneered research on expressive writing?|James Pennebaker|Charles Darwin|Aldus Manutius",
    "A typical study asked people to write about an upsetting event for...|About 15 to 20 minutes on a few days|Eight hours straight|One second",
    "Findings were generally...|Modest, varying benefits for some people|Miracle cures for all|Always harmful",
    "Expressive writing replaces professional help...|No, it does not|Yes, always|Only on Sundays",
    "Why might it help?|It can organize thoughts and give events meaning|It deletes feelings|It makes paper warm",
    "It tends to work best when writing includes...|Facts and reflection on meaning|Only complaints|Random words",
    "Private writing means...|You do not have to share it|You must post it|You must read it aloud",
    "If writing about something upsetting feels too hard, you should...|Stop and talk to a trusted adult|Push through alone|Hide it"
  ],
    ["Think about what writing about feelings can do for understanding events.", "Remember that research shows small and varied effects, not magic.", "Example: a diary entry that says what happened and what you learned. Now do yours."],
    [["Writing about feelings", "📓", "<b>James Pennebaker</b> studied writing about stressful events for about <b>15 to 20 minutes</b> on a few days."], ["Modest results", "⚖️", "Findings show <b>modest, varied</b> benefits for some people, not a cure for everyone."], ["Stay safe", "🤝", "Your writing can stay <b>private</b>. If it feels too upsetting, <b>stop and talk to a trusted adult</b>."]]);

  const B15 = mk("Does doodling help?", "🖍️", [
    "In Jackie Andrade's study, doodlers recalled...|More details of a dull phone message|Fewer details|Nothing",
    "Doodling may help because it...|Keeps you from drifting into daydreams|Replaces listening|Makes noise",
    "Doodling differs from sketchnoting because sketchnotes are...|Purposeful and tied to the content|Random scribbles|Banned in class",
    "A very detailed doodle may...|Take attention away from listening|Always help|Make you invisible",
    "Evidence suggests doodling may help most with...|Boring listening tasks|Mathematics tests|Singing",
    "A limit of the doodling study is that it was...|Small and only one kind of task|Perfectly complete|Done on the moon",
    "Mind wandering means...|Your attention drifts from the task|You walk around|You doodle",
    "Good attention-helping doodles are...|Simple shapes that need little thought|Elaborate portraits|Long essays"
  ],
    ["Think about a simple task that keeps part of your mind busy but not too busy.", "Remember that one small study is a hint, not a final answer.", "Example: tapping a pencil rhythm while listening to a long talk. Now do yours."],
    [["A surprising study", "🖍️", "Jackie Andrade found people who <b>doodled</b> during a dull message recalled <b>more details</b>."], ["Why it may work", "🎯", "A simple doodle may <b>reduce daydreaming</b>. A complicated drawing can instead steal attention."], ["Keep perspective", "🔍", "One small study is a clue. Sketchnotes with <b>purpose</b> are different from random doodles."]]);

  const B16 = mk("Stylus tablets and latency", "📱", [
    "Latency is...|The delay between pen movement and ink appearing|The width of a line|A kind of paper",
    "Lower latency generally feels...|More like writing on paper|Slower and stickier|Louder",
    "Palm rejection helps by...|Ignoring your resting hand|Rejecting the pen|Locking the screen",
    "Pressure sensitivity lets strokes...|Change width with force|Always stay thin|Disappear",
    "Digital pens can record...|Stroke order, timing and pressure|Only the page color|Nothing",
    "Vector ink stays sharp because it...|Stores strokes as curves, not pixels|Is a photo|Uses real paint",
    "A paper-feel screen protector adds...|Friction like paper|Heat|Sound only",
    "Handwritten notes can become searchable when software does...|Handwriting recognition|Coloring|Folding"
  ],
    ["Think about how smoothly a screen follows your pen.", "Match the feature to the effect it has on your writing experience.", "Example: a mouse that lags behind your hand feels awkward. Now do yours."],
    [["Delay matters", "⏱️", "<b>Latency</b> is the gap between moving the pen and seeing ink. Lower latency feels closer to paper."], ["Smart pens", "🖊️", "Styluses can sense <b>pressure</b>, ignore your palm and record <b>stroke order and timing</b>."], ["Ink as data", "💾", "<b>Vector ink</b> stays sharp at any zoom, and recognition software can make handwriting <b>searchable</b>."]]);

  const B17 = mk("The learning styles myth", "🧪", [
    "The idea that students learn better when taught in their preferred style (visual, auditory, kinesthetic) is...|Not supported by good evidence|Proven for everyone|A law",
    "People may have preferences, but matching teaching to them...|Did not improve outcomes in reviews|Always doubled scores|Was required",
    "Better advice is to match the method to...|The content being learned|Your favorite color|Your shoe size",
    "Using several modes, such as pictures and words, can help...|Almost everyone|No one|Only teachers",
    "A claim like 'I am a visual learner' should be...|Tested rather than assumed|Believed without checking|Banned",
    "Which is evidence-based?|Practice testing|Matching to learning style|Highlighting everything",
    "A map is best learned with...|A visual map|Only spoken words|Silence",
    "A review of learning-style research in 2008 was led by...|Harold Pashler|Mesrop Mashtots|Valerie Sutton"
  ],
    ["Think about whether the content or the person's taste should decide the method.", "Look for the statement based on research that was tested fairly.", "Example: you learn a dance by moving, not by reading about it. Now do yours."],
    [["A popular belief", "🧪", "The idea that people learn best in a personal <b>learning style</b> has <b>weak evidence</b> when tested."], ["Match the content", "🎯", "Choose the method that fits what you learn: maps for places, <b>practice</b> for skills, <b>pictures plus words</b> for many ideas."], ["Stay curious", "🔍", "Test a claim before building on it. <b>Practice testing</b> has strong support."]]);

  const B18 = mk("Pre-questions and errors", "❓", [
    "Prequestioning means...|Trying questions before studying the material|Skipping questions|Asking only after the exam",
    "Even wrong guesses before learning can...|Improve later learning of the answer|Ruin the topic|Be unlearnable",
    "Previewing headings helps because it...|Gives you a mental map|Shortens the book|Replaces reading",
    "The hypercorrection effect says confident errors, once corrected, are...|Remembered especially well|Forgotten at once|Never corrected",
    "A good pre-question for a chapter is...|What causes this process?|What page is this?|Who printed it?",
    "Making mistakes during practice is...|A normal part of learning|A sign to stop|Cheating",
    "If you cannot answer a pre-question, you should...|Make a guess, then read to find out|Give up|Skip the chapter",
    "Writing questions in the margin before reading helps you...|Read with a purpose|Read less carefully|Avoid reading"
  ],
    ["Think about how a question can prepare your attention before you read.", "Look for the option that treats a wrong guess as useful.", "Example: guessing a trivia answer and then learning the real one makes it stick. Now do yours."],
    [["Ask first", "❓", "<b>Prequestioning</b> means writing or trying questions <b>before</b> you read. Guessing, even wrongly, prepares you to learn."], ["Preview", "🗺️", "Skim <b>headings and bold words</b> first to build a mental map of the chapter."], ["Errors help", "✅", "The <b>hypercorrection effect</b>: errors you were sure about are often remembered well once corrected."]]);

  const L26 = [B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17, B18];

  // =============== LEVEL 27 ===============
  const C1 = mk("Chain of custody", "🗂️", [
    "A chain of custody is...|A record of who handled evidence and when|A kind of lock|A list of authors",
    "Why does a chain of custody matter?|It helps show the document was not altered|It makes paper heavier|It improves handwriting",
    "When handling a questioned document, you should...|Avoid adding marks, folds or stains|Fold it to fit|Write notes on it",
    "Should you write notes directly on an original document?|No, use copies or a separate sheet|Yes, in ink|Yes, with a highlighter",
    "A custody log entry should include...|Date, time, person and purpose|Only a doodle|Nothing",
    "Photocopies can hide...|Ink details and indentations|The text entirely|Nothing at all",
    "If you find a suspicious document, the best first step is to...|Leave it as it is and report it|Rewrite it|Throw it away",
    "Documents should be stored...|Flat, dry and away from strong light|Rolled in a hot attic|Clipped with metal staples"
  ],
    ["Think about why each person who touched a document should be recorded.", "Look for the careful, minimal-handling choice.", "Example: a library checkout record shows who had a book and when. Now do yours."],
    [["Who held it?", "🗂️", "A <b>chain of custody</b> logs everyone who handled a document, with <b>date, time and purpose</b>."], ["Hands off the original", "🧤", "Do not fold, mark or stain it. Work from <b>copies</b> and keep the original safe."], ["Store safely", "📦", "Keep documents <b>flat, dry and out of strong light</b>, away from metal clips."]]);

  const C2 = mk("Natural variation and disguise", "🎭", [
    "No two signatures from one person are...|Exactly identical|Always identical|Printed",
    "Natural variation is...|The range of differences in a person's own writing|Writing with the wrong hand|A forged copy",
    "Disguised writing often shows...|Unnatural slowness or odd changes in slant|Perfect consistency|Faster speed",
    "Copying another person's writing often shows...|Hesitation, tremor and pen lifts|Flowing speed|Perfect rhythm",
    "Why do examiners want several known samples?|To see the writer's natural range|To make a collection|To find the best pen",
    "Writing done naturally in daily life is usually a better comparison than writing...|Made on request, which may be altered|From last year|On thicker paper",
    "Illness, age and writing surface can...|Change how someone writes|Never change handwriting|Remove signatures",
    "With only one known signature, an examiner should be...|Cautious|Certain|Silent"
  ],
    ["Think about how your own signature changes a little each time you sign.", "Compare natural fluency with signs of slow, careful drawing.", "Example: two photos of the same person look alike but never match perfectly. Now do yours."],
    [["Always a little different", "✍️", "Everyone's writing varies slightly. Examiners must understand a writer's <b>natural variation</b>."], ["Signs of disguise", "🎭", "Copying or disguising often shows <b>slow speed, tremor, pen lifts</b> or odd slant changes."], ["Enough samples", "📄", "Several <b>known samples</b>, ideally written naturally, show the writer's true range."]]);

  const C3 = mk("Anachronisms expose forgeries", "⏰", [
    "An anachronism is...|Something out of its correct time|A kind of handwriting|A paper size",
    "Lorenzo Valla showed in 1440 that the Donation of Constantine was a forgery by studying its...|Language and history|Ink color only|Weight",
    "A letter dated 1750 on paper with a modern watermark is...|An anachronism|Perfectly normal|A palimpsest",
    "A document dated 1900 written in ballpoint pen is suspicious because...|Ballpoint pens became common in the 1940s|Ballpoints cannot write|Ink did not exist",
    "A document dated 1970 that uses the Calibri font is suspicious because...|Calibri was released in 2007|Calibri is ancient|Fonts did not exist",
    "Valla's evidence included Latin words and style that...|Did not fit the supposed century|Matched perfectly|Were invisible",
    "A 'medieval' charter using words that only appeared later suggests...|A later forgery|An early original|A printing error",
    "To check a date, examiners look at paper, ink, language and...|Typefaces or handwriting styles|The color of the room|Shoe sizes"
  ],
    ["Think about something that could not exist at the date written on the document.", "Compare the date on the document with when the tool or font appeared.", "Example: a text message in a story set in 1850 would be out of place. Now do yours."],
    [["Out of time", "⏰", "An <b>anachronism</b> is something that does not belong to the claimed date: a modern paper, pen or font."], ["Valla's proof", "📜", "In 1440, <b>Lorenzo Valla</b> exposed the Donation of Constantine as a forgery partly by its <b>Latin and historical errors</b>."], ["Modern clues", "🖊️", "<b>Ballpoints</b> (common from the 1940s) or fonts like <b>Calibri</b> (2007) can expose false dates."]]);

  const C4 = mk("How forgeries show", "🔎", [
    "A traced signature often shows...|A smooth outline but pauses or blunt strokes|Natural flying starts|Perfect speed",
    "Authentic fast signatures often have...|Tapered endings from speed|Blunt stops everywhere|Pencil dents only",
    "Pen lifts in the middle of a letter can suggest...|Slow, careful drawing|Natural speed|A new pen",
    "A forger can copy the shape of a signature but often misses its...|Rhythm, speed and pressure pattern|Color|Word count",
    "Under magnification, tracing may show...|Guide lines or indentations|Gold flecks|Nothing ever",
    "A freehand simulation means the forger...|Copies from a model without tracing|Uses a stencil|Types the name",
    "A scanned signature pasted into a file is...|A digital copy of a real signature|Always a trusted signature|A new signature style",
    "Examiners treat one odd feature as...|A clue, not proof|Final proof|Meaningless"
  ],
    ["Think about the difference between moving quickly and carefully drawing a shape.", "Look for the speed and pressure clues rather than just the outline.", "Example: a smooth line drawn fast tapers at the end; a slow one stays blunt. Now do yours."],
    [["Shape vs motion", "📈", "Forgers can copy a signature's <b>shape</b> but struggle to copy its <b>natural speed, rhythm and pressure</b>."], ["Tell-tale signs", "🔍", "<b>Pen lifts, blunt endings and tremor</b> can show slow drawing. Magnification may reveal tracing guide marks."], ["Careful claims", "⚖️", "One feature is a <b>clue, not proof</b>. Examiners weigh many features together."]]);

  const C5 = mk("How archives are arranged", "🏛️", [
    "The principle of provenance means keeping records together by...|Who created them|Their size|Their color",
    "Original order means preserving...|The order in which the creator kept the records|Alphabetical order always|Random order",
    "A finding aid is...|A guide describing an archival collection|A kind of pen|A fire alarm",
    "A fonds is...|All the records from one creator or source|A single page|A map case",
    "A common archival hierarchy runs...|Fonds, series, file, item|Item, fonds, file, series|Series, item, fonds, file",
    "Compared with libraries, archives mostly hold...|Unique records and papers|Many copies of printed books|Only maps",
    "Metal paper clips are often removed because they can...|Rust and damage paper|Be too shiny|Weigh too much",
    "Item-level description means...|Describing each single document|Describing the building|Not describing anything"
  ],
    ["Think about keeping each person's or group's papers together, in the way they used them.", "Look for the answer about the creator or the arrangement of a collection.", "Example: a family photo box kept in the order the family stored it. Now do yours."],
    [["Keep the creator's logic", "🏛️", "<b>Provenance</b> keeps records together by who created them. <b>Original order</b> keeps the creator's own arrangement."], ["Levels", "🪜", "Archives describe at levels: <b>fonds, series, file, item</b>. A <b>finding aid</b> guides researchers."], ["Protect the paper", "📎", "Rust-prone <b>metal clips</b> are replaced to protect documents."]]);

  const C6 = mk("Diplomatics", "📜", [
    "Diplomatics studies...|Official documents, such as charters, and how they are formed|Diplomats' travel|Dinner menus",
    "Jean Mabillon wrote De re diplomatica in...|1681|1281|1981",
    "Mabillon's work set out rules for...|Judging whether old documents are authentic|Cooking medieval food|Building cathedrals",
    "A charter is traditionally divided into...|Protocol, text and eschatocol|Chapter, verse and index|Head, thorax and tail",
    "A dating clause gives...|The date and sometimes the place|The scribe's lunch|The paper size",
    "A witness list in a charter shows...|Who attended or approved|Who printed it|Who read it later",
    "The word diploma originally meant something...|Folded|Painted|Spoken",
    "Checking a charter's authenticity includes script, seal and...|Standard formulas and language|The stamp price|The ink flavor"
  ],
    ["Think about formal documents that grant rights or record decisions, and how they are structured.", "Match the term to its job: starting, middle and ending parts, or dates and witnesses.", "Example: a modern contract has a heading, terms and signatures. Now do yours."],
    [["Studying documents", "📜", "<b>Diplomatics</b> studies how official documents like <b>charters</b> are made and how to test if they are genuine."], ["Mabillon's rules", "⚖️", "Jean <b>Mabillon</b> (1681) laid out methods that remain the basis of authenticity checks."], ["Parts of a charter", "🧩", "Charters have <b>protocol, text and eschatocol</b>, with dating clauses and witnesses."]]);

  const C7 = mk("Seals and notaries", "🔏", [
    "A wax seal on a letter was used to...|Close it and mark authority|Keep ink wet|Make it louder",
    "The engraved die used to make a seal impression is the...|Matrix|Quire|Colophon",
    "A notary public's job includes...|Witnessing signatures and checking identity|Printing money|Writing songs",
    "A signet ring was worn to...|Press a seal into wax|Hold paper|Light candles",
    "In medieval Europe, notaries often used a personal mark called a...|Signum|Tsek|Hanko",
    "An embossed seal makes...|A raised impression in the paper|A colored ink dot|A hole",
    "An apostille is a certificate that...|Makes a document accepted abroad under the Hague Convention|Prints a document|Replaces signatures",
    "A notary's stamp or seal shows...|The notarization was officially done|The weather|The paper brand"
  ],
    ["Think about marks that show a document is official or has been checked.", "Match the object to its job: pressing, witnessing or certifying.", "Example: a school stamp on a certificate shows where it came from. Now do yours."],
    [["Marks of authority", "🔏", "A <b>wax seal</b> closed letters and showed who sent them. The engraved die is the <b>matrix</b>."], ["Official witnesses", "🧑‍⚖️", "A <b>notary</b> checks identity and witnesses signatures. Medieval notaries used a personal <b>signum</b>."], ["Crossing borders", "🌐", "An <b>apostille</b> certifies a document for use in other countries that follow the Hague Convention."]]);

  const C8 = mk("Witnesses, initials and wills", "✍️", [
    "A witness signs to show...|They saw the signing take place|They wrote the contract|They own the paper",
    "A holographic will is...|One handwritten by the person making it|Printed in a newspaper|Signed by a notary only",
    "Holographic wills are valid...|In some places but not all|Everywhere|Never",
    "Legal rules for documents depend on...|The place (jurisdiction)|The pen brand|The paper color",
    "Initials on each page of a contract help...|Show each page was reviewed and prevent swaps|Make it longer|Replace the signature",
    "A handwritten change on a contract should usually be...|Initialed by the parties|Hidden|Done in pencil",
    "A person who gains from a document usually should not be its...|Witness|Reader|Owner of the pen",
    "Dating a signature carefully helps...|Show when it was signed|Hide the signer|Make it legal everywhere"
  ],
    ["Think about proof: who saw it, who agreed and when.", "Remember laws differ by place, so check local rules.", "Example: a teacher initialing a corrected test shows who approved the change. Now do yours."],
    [["Witness", "👀", "A <b>witness</b> signs to confirm they saw the signing. They usually should not be someone who <b>benefits</b>."], ["Initials", "🔤", "<b>Initials</b> on each page and beside changes show pages and corrections were agreed."], ["Local rules", "⚖️", "<b>Holographic wills</b> (fully handwritten) are valid in some places only, so always check local law."]]);

  const C9 = mk("Engrossing", "🖋️", [
    "Engrossing means...|Writing a document out in a formal, clear hand|Scribbling a draft|Printing in color",
    "Who engrossed the U.S. Constitution in 1787?|Jacob Shallus|Johannes Gutenberg|William Caxton",
    "An engrossed copy is...|The final fair copy|A first rough draft|A sketch",
    "The Constitution's engrossed copy was written on...|Parchment|Plastic|Wood",
    "In a legislature, an engrossed bill is...|The version with all amendments in final form|The first idea|A rejected bill",
    "An engrossing hand needs to be...|Legible and consistent|Messy and quick|Tiny only",
    "Engrossers also lettered documents like...|Diplomas and resolutions|Tickets for sports|Recipes only",
    "A rough draft is changed into a fair copy by...|Revising, then writing it out cleanly|Throwing it away|Adding more mistakes"
  ],
    ["Think about the last step after drafting: producing the clean, official version.", "Match the term to its purpose: final, formal and readable.", "Example: copying your final essay neatly after editing the draft. Now do yours."],
    [["The fair copy", "🖋️", "<b>Engrossing</b> means writing the final version of a document in a <b>formal, clear hand</b>."], ["Famous example", "🏛️", "Jacob Shallus engrossed the <b>U.S. Constitution</b> on parchment in 1787."], ["Today", "📃", "In legislatures, an <b>engrossed bill</b> is the final text with all changes included."]]);

  const C10 = mk("Envelope and place-card calligraphy", "✉️", [
    "In the U.S., the return address usually goes in the...|Upper left corner|Lower right corner|Back only",
    "The stamp goes in the...|Upper right corner|Lower left|Middle",
    "Before inking an envelope, many calligraphers use...|A light pencil guideline or a guide sheet|No planning|A ruler of ink",
    "Light pencil lines are erased...|Only after the ink is fully dry|While the ink is wet|Never",
    "A place card usually carries...|The guest's name|The whole menu|A long poem",
    "Metallic ink shows best on...|Dark paper|White paper only|Clear glass",
    "To center a name, you can...|Find its middle and align it with the card's center|Guess|Write as big as possible",
    "Planning a layout first helps you...|Avoid running out of space|Use more ink|Skip practice"
  ],
    ["Think about corners and middle lines, and how you plan before inking.", "Match the position or step to the task named in the question.", "Example: laying out a poster with a light pencil grid first. Now do yours."],
    [["Where things go", "✉️", "Return address: <b>upper left</b>. Stamp: <b>upper right</b>. Plan the recipient's lines so they are <b>centered and even</b>."], ["Plan then ink", "✏️", "Use <b>light pencil guides</b> or a guide sheet. Erase only after the ink is <b>fully dry</b>."], ["Place cards", "🍽️", "Keep it <b>short and clear</b>: the guest's name, centered. Metallic ink pops on <b>dark paper</b>."]]);

  const C11 = mk("Gilding basics", "✨", [
    "Gesso, used under gold leaf, is...|A plaster-like base|A type of ink|A kind of brush",
    "Gold leaf is extremely...|Thin|Thick|Magnetic",
    "Burnishing means...|Polishing with a smooth hard tool|Painting over|Tearing",
    "In breath gilding, gold leaf sticks to gesso after you...|Breathe on it to dampen it|Soak it in water|Heat it red hot",
    "Shell gold is...|Gold powder paint in a binder|A sea creature|A pen nib",
    "Gold was used in manuscripts because it...|Catches light when the page moves|Dries quickly|Is cheap",
    "Gold leaf is handled with...|A gilder's tip or tissue, not fingers|Bare fingers|A hammer",
    "A good burnisher is often made with...|Agate|Cotton|Rubber"
  ],
    ["Think about a thin sheet that must stick to a smooth base and then shine.", "Match each tool or term to its job: base, thin sheet, polishing or sticking.", "Example: a sticker needs a clean surface and gentle pressing. Now do yours."],
    [["A base for gold", "✨", "<b>Gesso</b> forms a smooth base. Damp it with your <b>breath</b> and the delicate <b>gold leaf</b> sticks."], ["Shine", "🔆", "<b>Burnishing</b> with a smooth hard stone like agate polishes the gold so it glows."], ["Handle gently", "🧤", "Leaf is thin and sticks to fingers. Use a <b>gilder's tip</b> or tissue, and keep air still."]]);

  const C12 = mk("Seals in East Asian art", "🈴", [
    "A seal or 'chop' in East Asian art is usually stamped in...|Red paste|Black chalk|Blue water",
    "Artists use seals to...|Sign or authenticate their work|Cut paper|Clean brushes",
    "Collectors added their own seals to paintings to show...|Ownership|The paint age|Weather",
    "A style often carved on seals is...|Seal script|Cursive Latin|Blackletter",
    "Seals are often carved in...|Stone|Cotton|Soap bubbles",
    "In Japan, a personal seal used for official papers is a...|Hanko|Haiku|Kimono",
    "A seal on a painting is usually placed...|Near the signature or in a balanced spot|Over the center of the painting|Anywhere, no thought",
    "Compared with a signature, a seal is...|Stamped, not handwritten each time|Written fresh each time|Always printed in black"
  ],
    ["Think about a stamp that acts like a signature or mark of ownership.", "Look for the color, use and place of the stamp.", "Example: a school stamp on a certificate in red ink. Now do yours."],
    [["The red mark", "🈴", "East Asian <b>seals</b> are stamped in <b>red paste</b> to sign or approve a work. Many are carved in <b>stone</b> in <b>seal script</b>."], ["Collectors too", "🖼️", "Owners added <b>collector's seals</b> to paintings, building a record of who held them."], ["Seals today", "📑", "In Japan, a <b>hanko</b> is a personal seal used instead of a signature on many documents."]]);

  const C13 = mk("The sofer's craft", "📜", [
    "A scribe who writes Torah scrolls is called a...|Sofer|Cartographer|Compositor",
    "A Torah scroll is written on...|Parchment|Plastic|Cotton",
    "A sofer writes with a...|Quill|Marker|Typewriter",
    "Hebrew is written...|Right to left|Left to right|Top to bottom only",
    "The text of a Torah scroll is traditionally written without...|Vowel marks|Letters|Ink",
    "A sofer is trained to copy the text...|With great care and then checking it|Casually|From memory only",
    "Besides scrolls, a sofer also writes parchments for...|Tefillin and mezuzot|Newspapers|Maps",
    "The sofer's work shows the value of...|Accuracy and tradition|Speed only|Decoration only"
  ],
    ["Think about a scribe whose job is to copy a sacred text with care.", "Match the tool or material to the tradition: animal skin and a feather.", "Example: a bookbinder follows careful traditional steps for strong, lasting books. Now do yours."],
    [["A careful scribe", "📜", "A <b>sofer</b> copies sacred texts by hand on <b>parchment</b> using a <b>quill</b>, in traditional Hebrew script."], ["Exact copying", "🔍", "Text is copied with great care and checked. A Torah scroll has <b>no vowel marks</b>."], ["More than scrolls", "📿", "A sofer also writes small parchments for <b>tefillin</b> and <b>mezuzot</b>."]]);

  const C14 = mk("The Universal Penman", "🖋️", [
    "The Universal Penman, published 1733 to 1741, was by...|George Bickham|Mesrop Mashtots|Aldus Manutius",
    "It showed examples by many...|Writing masters, engraved on copper|Printers' devils|Typewriter makers",
    "Copperplate engraving prints from...|A copper plate with cut lines|A wooden block|Metal slugs",
    "Engraving helped printers reproduce...|Fine pen flourishes|Only block capitals|Photos",
    "A roundhand is a style that is...|Rounded and slanted for business|Angular blackletter|Runes",
    "Copybooks spread handwriting styles to...|Schools and counting houses|Only monasteries|Only the military",
    "A counting house was...|A merchant's office|A school for counting only|A mint",
    "The tool that cuts lines into a copper plate is a...|Burin|Quill|Spatula"
  ],
    ["Think about how a fine pen flourish could be copied onto metal and printed many times.", "Match the term to its job: the plate, the tool, the style, the setting.", "Example: a stamp carved to repeat a pattern many times. Now do yours."],
    [["A showcase book", "📘", "<b>George Bickham</b>'s <b>Universal Penman</b> (1733-41) displayed the best writing masters' work, <b>engraved on copper</b>."], ["Engraving", "🔨", "Engravers cut lines with a <b>burin</b>, letting printers reproduce fine <b>flourishes</b>."], ["Styles spread", "🏫", "Copybooks carried <b>roundhand</b> to schools and <b>counting houses</b> (merchants' offices)."]]);

  const C15 = mk("Writing a condolence note", "🕊️", [
    "A good condolence note is usually...|Short, sincere and personal|Long and formal|Funny",
    "A caring way to start is to...|Name the person and share a kind memory|Talk about yourself|List facts",
    "A phrase best avoided is...|'At least...' that tries to cheer someone|'I am thinking of you'|'With sympathy'",
    "It is better to send a note...|Soon, but a late note is still welcome|Never, if late|Only on a holiday",
    "A fitting sign-off is...|With sympathy|See you soon!|Whatever",
    "You should avoid...|Comparing it to your own loss|Writing kindly|Using clear handwriting",
    "You should not expect...|A reply|A kind word|A signature",
    "A plain card with clear handwriting shows...|Care and respect|Carelessness|Nothing"
  ],
    ["Think about what a grieving person needs from words: warmth, not advice.", "Choose the option that is gentle and about them, not about you.", "Example: 'I will always remember how kind your mother was to me.' Now do yours."],
    [["Short and sincere", "🕊️", "Keep a <b>condolence note</b> short, warm and personal. Name the person and share a <b>kind memory</b> if you have one."], ["What to avoid", "🚫", "Avoid 'at least...' lines, advice, or <b>comparing to your own loss</b>."], ["Timing and tone", "💌", "Send it <b>soon</b>, but a late note is still welcome. Sign off simply: <b>With sympathy</b>."]]);

  const C16 = mk("Scanning for the archive", "🖨️", [
    "For archival scans, a lossless format is...|TIFF|A heavily compressed JPEG|A screenshot",
    "JPEG compression is lossy, meaning...|Some detail is lost|Nothing changes|It adds color",
    "Resolution for scans is measured in...|ppi (pixels per inch)|Pounds|Decibels",
    "A common minimum for text documents is about...|300 ppi|30 ppi|3 ppi",
    "A color target or scale bar in a scan helps with...|Checking color and size|Adding decoration|Hiding errors",
    "OCR turns images of printed text into...|Machine-readable text|Fonts|Paper",
    "PDF/A is a format designed for...|Long-term archiving|Fast games|Photos only",
    "A master file is kept for preservation, while an access copy is...|A smaller version for sharing|A secret copy|The same file renamed"
  ],
    ["Think about which choices keep the most detail for the future.", "Match the term to its job: detail, size, text or long-term storage.", "Example: saving a drawing as a huge clear photo and a small web version. Now do yours."],
    [["Keep all the detail", "🖨️", "Archives scan at about <b>300 ppi or more</b> and save a <b>lossless master</b> such as <b>TIFF</b>."], ["Copies for use", "📤", "Make smaller <b>access copies</b> for sharing. <b>JPEG</b> is lossy, so avoid resaving."], ["Searchable", "🔎", "<b>OCR</b> makes text searchable. <b>PDF/A</b> is a standard for long-term archives."]]);

  const C17 = mk("Limits of handwriting expertise", "⚖️", [
    "In the 1993 case Daubert v. Merrell Dow, U.S. judges became...|Gatekeepers for expert evidence|Handwriting teachers|Publishers",
    "The 2009 National Academy of Sciences report on forensic science urged...|More research and validation|Closing all labs|No testing",
    "Studies suggest trained examiners make...|Fewer errors than untrained people|More errors than beginners|No errors",
    "Examiners should express conclusions with...|Careful levels of confidence, not absolute certainty|Perfect certainty always|Guesses",
    "Cognitive bias means extra case information can...|Influence an examiner's judgment|Never matter|Improve every result",
    "Blind verification means a second examiner...|Reviews without knowing the first result|Copies the first|Skips the work",
    "Error rates in forensic work are...|Measured in studies|Impossible to know|Always zero",
    "Handwriting comparison relies on...|Trained human judgment|Only machines|Only luck"
  ],
    ["Think about how science checks whether a method gives reliable results.", "Look for the answer that sounds careful and open to testing.", "Example: a referee reviewing a close play from several angles. Now do yours."],
    [["Courts as gatekeepers", "⚖️", "Under <b>Daubert</b> (1993), U.S. judges check that expert methods are <b>reliable</b>."], ["Test the method", "🔬", "A 2009 national report asked for <b>more validation research</b>. Studies show trained examiners do better than novices but <b>not perfectly</b>."], ["Guard against bias", "🛡️", "<b>Blind verification</b> and careful wording about confidence reduce <b>cognitive bias</b>."]]);

  const C18 = mk("Ciphers by hand", "🔐", [
    "A Caesar cipher shifts each letter by...|A fixed number of places|A random amount each time|Nothing",
    "With a shift of 3, A becomes...|D|C|E",
    "With a shift of 1, HAL becomes...|IBM|GZK|HBM",
    "With a shift of 3, CAT becomes...|FDW|DBU|FEX",
    "With a shift of 2, DOG becomes...|FQI|EPH|FOI",
    "Decode KHOOR (shift of 3 forward).|HELLO|JGNNQ|LIPPS",
    "Julius Caesar is said to have used a shift of...|Three|Thirteen|One hundred",
    "The Atbash cipher swaps A with Z, so B becomes...|Y|C|A"
  ],
    ["Count forward through the alphabet by the shift, one letter at a time.", "Write the alphabet in a row and slide a second row under it by the shift. Read across.", "Example: with a shift of 2, B becomes D and C becomes E. Now do yours."],
    [["Shift the alphabet", "🔐", "A <b>Caesar cipher</b> shifts every letter by the <b>same number</b>. With shift 3, A→D, B→E, C→F."], ["Decode backwards", "↩️", "To decode, shift the <b>other way</b>. KHOOR minus 3 gives HELLO."], ["Easy to break", "🔓", "Only 25 shifts exist, so a codebreaker can try them all. <b>Atbash</b> reverses the alphabet: A↔Z, B↔Y."]]);

  const L27 = [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, C17, C18];

  Object.assign(HAND_LEVELS, {
    25: L25.concat([MIX("Mixed practice", L25[0], L25[2], L25[5], L25[8], L25[12]), MIX("Level 25 Challenge", L25[1], L25[3], L25[7], L25[10], L25[15], L25[17])]),
    26: L26.concat([MIX("Mixed practice", L26[0], L26[2], L26[5], L26[7], L26[12]), MIX("Level 26 Challenge", L26[1], L26[3], L26[8], L26[10], L26[15], L26[17])]),
    27: L27.concat([MIX("Mixed practice", L27[0], L27[2], L27[5], L27[7], L27[12]), MIX("Level 27 Challenge", L27[1], L27[3], L27[8], L27[10], L27[15], L27[17])])
  });
})();
