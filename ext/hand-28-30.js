// ext/hand-28-30.js  Mind Lab Handwriting, levels 28-30 (60 lessons)
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

  // =============== LEVEL 28 ===============
  const A1 = mk("Regional minuscules", "📜", [
    "Beneventan script was used mainly in...|Southern Italy|Ireland|Scandinavia",
    "Monte Cassino abbey was a famous centre for which script?|Beneventan|Insular|Blackletter",
    "Visigothic script was used in...|The Iberian Peninsula (Spain and Portugal)|Scotland|Poland",
    "Merovingian script was used in...|Frankish Gaul in the 600s and 700s|Roman Egypt|Medieval Japan",
    "Which script spread across Charlemagne's lands and replaced many regional hands?|Carolingian minuscule|Runes|Cuneiform",
    "A minuscule script is...|A small, lowercase-style book hand|A carved capital|A shorthand sign",
    "Why did regional scripts develop after the Roman Empire broke up?|Local scribal schools drifted apart|Printing presses forced it|One font was ordered everywhere",
    "Visigothic script is named after the...|Visigoths, who ruled Iberia|Vikings of Iceland|Tang dynasty"
  ],
    ["Think about the place and the time each script belongs to.", "Match the script name to the region it grew in, not to the material it was written on.", "Example: Insular script grew in Ireland and Britain. Now do yours."],
    [["Many hands, many places", "🗺️", "After Rome's central offices faded, scribal schools in different regions developed their own <b>minuscule</b> hands."], ["Three regional scripts", "✍️", "<b>Beneventan</b> in southern Italy, <b>Visigothic</b> in Iberia, <b>Merovingian</b> in Frankish Gaul."], ["One script wins", "👑", "<b>Carolingian minuscule</b> spread widely under Charlemagne and replaced many of them."]]);

  const A2 = mk("Quires and gatherings", "📚", [
    "A quire is...|A gathering of folded sheets that are sewn together|A kind of pen|A scroll rod",
    "A bifolium is...|One sheet folded in half, making two leaves|Two books sewn together|A blank page",
    "Folding one bifolium gives how many page sides?|Four|Two|Eight",
    "A quaternion is a quire made from...|Four sheets folded, giving eight leaves|Four leaves|Forty leaves",
    "Eight leaves give how many page sides?|16|8|32",
    "Why were quires numbered with signatures?|To keep them in order for binding|To make the book heavier|To show the price",
    "A catchword is...|The first word of the next page written at the foot of the page before|A magic spell|A red title",
    "Gregory's rule says that facing pages in a parchment quire show...|The same side: hair side faces hair side, flesh side faces flesh side|Opposite sides|Random sides"
  ],
    ["Think about how many times a sheet is folded and what it makes.", "Count leaves first, then remember each leaf has a front and a back.", "Example: three bifolia give six leaves, so twelve page sides. Now do yours."],
    [["Fold, nest, sew", "🧵", "Sheets were folded into <b>bifolia</b>, nested into a <b>quire</b> and sewn with other quires to form a book."], ["Count the sides", "🔢", "One bifolium = 2 leaves = 4 sides. A <b>quaternion</b> = 4 sheets = 8 leaves = 16 sides."], ["Order markers", "🏷️", "Scribes used <b>signatures</b> and <b>catchwords</b> so binders could put quires in the right order."]]);

  const A3 = mk("Making parchment", "🐑", [
    "Parchment is made from...|Animal skin, treated and stretched|Pressed plant fibres|Rag pulp",
    "Skins were soaked in lime to...|Loosen the hair and fat|Make them glow|Add colour",
    "After liming, the skin was stretched on a frame and...|Scraped and dried|Sprayed with ink|Boiled until it melted",
    "A crescent-shaped scraping knife was called a...|Lunellum|Quill|Stylus",
    "The hair side of parchment is usually...|Darker and more textured|Whiter and smoother|Printed",
    "The word vellum originally meant parchment from...|Calf|Palm|Fish",
    "Writing scraped off parchment so it could be reused made a...|Palimpsest|Colophon|Quire",
    "Compared with papyrus rolls, parchment suited codices because it...|Could be folded and written on both sides|Grew in rivers|Was printed",
  ],
    ["Think about the material and what had to be done to turn it into a writing surface.", "Match each step to its purpose: loosen, stretch, scrape, dry.", "Example: papyrus is made by pressing strips of reed in layers. Now do yours."],
    [["Skin into page", "📄", "Parchment starts as animal skin: <b>soaked in lime</b>, stretched on a frame, <b>scraped</b> and dried."], ["Two sides", "↔️", "The <b>hair side</b> is usually darker; the <b>flesh side</b> is paler and smoother. Sheets were arranged to match."], ["Vellum", "🐄", "<b>Vellum</b> originally meant calfskin. Today the words are often mixed up."]]);

  const A4 = mk("Ruling and pricking", "📏", [
    "Pricking means...|Making tiny holes in the margin to mark line positions|Poking a reader|Cutting a nib",
    "Lines on a manuscript page were often ruled with...|A hard point, lead or ink|A laser|A typewriter",
    "A drypoint ruling leaves...|A faint groove in the page|A thick red line|No mark at all",
    "Why prick and rule before writing?|To keep lines straight and spacing even|To make the ink dry|To hide errors",
    "Pricking several sheets together at once gave...|Matching layouts across the sheets|Ruined pages|A new language",
    "Vertical lines at the sides of the text mark the...|Writing area (text block)|Binding thread|Page number",
    "Pricks in the outer margin are often lost because...|Pages were trimmed when rebound|The ink faded|Readers erased them",
    "Which tool best matches a hard point?|A blunt metal stylus|A paint roller|A keyboard"
  ],
    ["Think about what a scribe needs to do before the first letter is written.", "The answer is about planning the page, not about the words on it.", "Example: a carpenter marks a plank before cutting. Now do yours."],
    [["Plan the page", "📐", "Before writing, scribes marked the lines: tiny <b>prick</b> holes in the margins showed where lines went."], ["Rule it", "✏️", "Then they ruled lines with a <b>hard point</b>, lead or ink, plus vertical lines to frame the <b>text block</b>."], ["Clues for scholars", "🔍", "Pricking, ruling and layout help scholars group manuscripts and spot a scriptorium's habits."]]);

  const A5 = mk("Recto, verso and foliation", "📖", [
    "Recto is...|The front of a leaf|The back of a leaf|The spine",
    "Verso is...|The back of a leaf|The front of a leaf|A title",
    "Numbering leaves instead of pages is called...|Foliation|Pagination|Rubrication",
    "Numbering every page side is called...|Pagination|Foliation|Binding",
    "A reference to f. 12v means...|Folio 12, the back side|Page 12, front|Volume 12",
    "A reference to f. 3r means...|Leaf 3, the front side|Row 3, right|The third volume",
    "After f. 1v comes...|f. 2r|f. 2v|f. 1r",
    "A manuscript with 20 leaves has how many sides?|40|20|10"
  ],
    ["A leaf has two sides. Which side comes first?", "The letters r and v come from Latin words for the two sides of a leaf.", "Example: f. 7r is the front of leaf 7, and f. 7v is its back. Now do yours."],
    [["Leaves, not pages", "🍃", "Medieval books were often numbered by <b>leaf</b> (foliation), not by page side."], ["Two sides", "↩️", "<b>Recto</b> (r) is the front of the leaf, <b>verso</b> (v) the back. So 1r, 1v, 2r, 2v..."], ["Citing precisely", "🎯", "Scholars cite <b>f. 12v</b> to point to an exact spot. Each leaf gives two sides."]]);

  const A6 = mk("Folio, quarto, octavo", "📏", [
    "A sheet folded once makes a...|Folio (2 leaves)|Quarto|Octavo",
    "A sheet folded twice makes a...|Quarto (4 leaves)|Folio|Duodecimo",
    "A sheet folded three times makes an...|Octavo (8 leaves)|Folio|Quarto",
    "How many page sides does a sheet in quarto give?|8|4|16",
    "How many leaves does a sheet in octavo give?|8|4|16",
    "Shakespeare's collected plays of 1623 are known as the First...|Folio|Octavo|Quarto",
    "Folio books are usually...|Large and tall|Pocket-sized|Tiny",
    "Why do bibliographers record format names?|They show how the sheet was folded and printed|They name ink brands|They give the language"
  ],
    ["More folds make more leaves from one sheet, and a smaller book.", "Count the folds: once, twice, three times. Each fold doubles the leaves.", "Example: folding a sheet four times gives sixteen leaves (a sextodecimo). Now do yours."],
    [["Folds name the book", "📘", "In hand-press printing, one big sheet was folded: <b>folio</b> (once), <b>quarto</b> (twice), <b>octavo</b> (three times)."], ["Doubling", "✖️", "Each fold doubles the leaves: 2, 4, 8. Leaves times two gives page sides."], ["Size clue", "📐", "More folds usually mean a smaller book. Format tells scholars how the book was made."]]);

  const A7 = mk("Incunabula", "🖨️", [
    "Incunabula are books printed...|Before 1501|After 1800|Only by hand",
    "The Latin word incunabula means roughly...|Cradle|Hard cover|Library",
    "The Gutenberg Bible was printed about...|1455|1055|1855",
    "Early printed books often imitated...|Manuscripts|Newspapers|Comic strips",
    "Printers often left blank spaces for initials so that...|Rubricators or illuminators could add them by hand|Readers could draw|The ink would not smudge",
    "Which date falls in the incunabula period?|1499|1520|1650",
    "Gutenberg is linked with the German city of...|Mainz|Rome|Beijing",
    "A book printed in 1480 is called an...|Incunable|Folio of 1700|Autograph"
  ],
    ["Think about the date range and the word's Latin meaning.", "The name refers to the early childhood of printing, before a set cut-off year.", "Example: the date 1450 falls before the cut-off, so it is in the early period. Now do yours."],
    [["Cradle books", "👶", "<b>Incunabula</b> (Latin 'cradle') are books printed in Europe from the 1450s to the end of <b>1500</b>."], ["Looks like a manuscript", "✍️", "Early printers copied manuscript layouts and left room for <b>hand-added initials</b> and decoration."], ["Why they matter", "🏛️", "Libraries catalogue them carefully. Each copy can differ in hand-added colour and notes."]]);

  const A8 = mk("Laid and wove paper", "🧻", [
    "Laid paper shows...|Fine parallel lines when held to the light|A perfectly even texture|A printed grid",
    "Wove paper is made on...|Fine woven wire cloth, giving an even surface|Parchment|Stone",
    "Wove paper became widely used in the...|Later 1700s|Bronze Age|1990s",
    "Chain lines are...|Widely spaced lines left by the wires holding the mould|Printed marks|Pen strokes",
    "A watermark shows against light because...|The paper is thinner where the wire design sat|Ink is see-through|It is painted on",
    "Laid lines come from...|Wires laid close side by side in the mould|Laying eggs|Folding twice",
    "Handmade paper is formed by...|Dipping a wire-screen mould into pulp|Pouring metal|Weaving threads",
    "Continuous machine-made paper began around...|1800|1200|1950"
  ],
    ["Think about the screen used in the paper mould and what pattern it leaves.", "Hold a sheet up to the light in your mind: do you see lines or an even surface?", "Example: a sieve with a grid of wires leaves a grid pattern in what it holds. Now do yours."],
    [["Mould marks", "🔦", "Held to the light, <b>laid paper</b> shows close <b>laid lines</b> and wider <b>chain lines</b> from the mould's wires."], ["Even surface", "🧵", "<b>Wove paper</b> uses fine woven cloth, so the sheet looks even. It spread in the later 1700s."], ["Machines", "⚙️", "Around 1800, machines made paper in long rolls. Marks help date and identify paper."]]);

  const A9 = mk("Rubrics and red ink", "🔴", [
    "The word rubric comes from the Latin for...|Red|Round|Rule",
    "Scribes used red ink to mark...|Headings, chapter starts and initials|Only mistakes|Nothing",
    "Red pigments included...|Vermilion and red lead|Printer toner|Neon dye",
    "A rubricator was...|A scribe who added red headings and initials|A papermaker|A binder",
    "Today a school 'rubric' means...|A scoring guide|A pen|A map",
    "Red-letter days in old calendars were...|Feast days marked in red|Rainy days|Test days",
    "Why use red in a manuscript?|It stands out and helps readers find their place|It dries faster|It is cheaper than black",
    "Rubrication was often done...|After the main black text was written|Before the parchment was made|Never by hand"
  ],
    ["Think about what colour name the word rubric comes from.", "Ask what a reader gains from a second colour on the page.", "Example: highlighters today mark key words so you can find them again. Now do yours."],
    [["Red for navigation", "🔴", "<b>Rubrica</b> is Latin for red ochre. Scribes wrote headings, initials and instructions in <b>red</b>."], ["Two steps", "🖋️", "The black text was usually written first; a <b>rubricator</b> added the red parts."], ["Words that stayed", "🏫", "A 'rubric' now means a set of rules or a scoring guide. 'Red-letter day' comes from red feast-day marks."]]);

  const A10 = mk("Glosses and marginalia", "💬", [
    "A gloss is...|A short explanation added in the margin or between lines|Shiny paint|A page number",
    "An interlinear gloss sits...|Between the lines of the text|At the end of the book|On the cover",
    "Marginalia are...|Notes and drawings in the margins|Removed margins|Page numbers",
    "The Würzburg glosses are notes in which language added to Latin text?|Old Irish|Hieroglyphs|Morse code",
    "Why do historians value marginalia?|They show how real readers reacted and used a book|They always contain the author's secrets|They prove a page is fake",
    "The word glossary comes from...|Gloss, an explained word|A glass jar|Glossy paper",
    "Scribes testing a pen in the margin left a...|Probatio pennae (pen trial)|Colophon|Quire",
    "A reader's note in the margin is evidence of the book's...|Use and ownership history|Paper weight|Ink recipe"
  ],
    ["Think about where on the page these notes appear and who wrote them.", "Marginal means 'in the margin'. Decide what the word root suggests.", "Example: a student writes a definition above a hard word in a textbook. Now do yours."],
    [["Notes on notes", "🔍", "A <b>gloss</b> explains a word. It can sit in the margin or <b>between the lines</b> (interlinear)."], ["Readers talk back", "🗨️", "<b>Marginalia</b> show readers' questions, corrections and doodles, and sometimes pen tests (<b>probatio pennae</b>)."], ["Evidence", "🕵️", "Historians use them to see <b>how books were read</b>, not just what they say."]]);

  const A11 = mk("Tironian notes", "⚡", [
    "Tironian notes were an ancient system of...|Shorthand|Cooking|Weights",
    "They are named after...|Tiro, Cicero's secretary|A baker called Tyro|A Greek poet",
    "The Tironian et sign means...|And|Or|But",
    "Which modern language still uses the Tironian et?|Irish|French|Japanese",
    "The Tironian system grew to include...|Thousands of signs|Only ten signs|No signs",
    "Tironian notes were still taught in monasteries in the...|Middle Ages|2000s|Stone Age",
    "Shorthand was useful in Rome for taking down...|Speeches and legal records|Radio shows|Text messages",
    "The Tironian et looks most like the numeral...|7|2|0"
  ],
    ["Think about what shorthand is for and who is named in its title.", "The modern survival is a small symbol that stands for a very common word.", "Example: the plus sign + can stand for 'and' in notes. Now do yours."],
    [["Shorthand in Rome", "⚡", "<b>Tironian notes</b> were quick signs, linked to Cicero's secretary <b>Tiro</b>, for recording speech."], ["Growing list", "📈", "Thousands of signs were collected and taught for centuries, even in medieval monasteries."], ["One survives", "⁊", "The sign <b>⁊</b> still means 'and' in Irish and Gaelic printing (<b>agus</b>)."]]);

  const A12 = mk("Nomina sacra", "➖", [
    "Nomina sacra are...|Abbreviated sacred names in early Christian manuscripts|Prices|Maps",
    "They were usually marked with...|A line over the shortened letters|Red circles|Stars",
    "In Greek, the nomen sacrum for Theos (God) is written with the letters...|Theta and final sigma (ΘΣ)|Chi and xi (ΧΞ)|Alpha and omega (ΑΩ)",
    "Nomina sacra usually keep...|The first and last letters (and sometimes more)|Only the middle letter|All the letters",
    "Where do nomina sacra appear?|Papyri and codices of the early centuries CE|Cave paintings|Computer code",
    "A likely reason for them is...|Showing respect and saving space|Hiding the text|Saving ink only",
    "A line over letters in a manuscript usually signals...|An abbreviation|A mistake|A title",
    "Nomina sacra are mainly a feature of which writing tradition?|Early Christian scribes|Roman tax clerks|Chinese brush writers"
  ],
    ["Think about what 'sacred names' means and what a scribe would do to mark them.", "Look for the clue in the shape: a line drawn over shortened words.", "Example: in a text message, 'pls' is a shortened word. Now do yours."],
    [["Special names, shortened", "✝️", "Early Christian scribes shortened a small set of <b>sacred names</b> and drew a <b>line over</b> them."], ["Keep the ends", "🔤", "Most were <b>contractions</b>: first and last letters kept, like ΘΣ for Θεός (Theos)."], ["Early evidence", "🏺", "They appear in papyri from the first centuries, so scholars use them to study early book habits."]]);

  const A13 = mk("Ductus, modulus, pen angle", "🖋️", [
    "Ductus is...|The order, direction and number of strokes used to make a letter|The colour of ink|The weight of paper",
    "Modulus is...|The size of a letter compared with the width of the pen stroke|The weight of a book|The amount of ink",
    "Pen angle is...|The angle of the nib edge to the baseline|The slope of the desk|The angle of the book",
    "A change in ductus can show...|A different scribe or script period|Nothing at all|A wrong ink",
    "A minim is...|A single downstroke, as in i, n, m and u|A tiny coin|A musical rest",
    "Why study ductus?|Habitual stroke order is a clue to scribe and school|It changes the ink|It makes the page smaller",
    "A broad nib held flat (0 degrees) makes horizontal strokes come out...|Thin|Thick|Wavy",
    "A tall, narrow letter with thin strokes has a modulus that is...|High (many pen-widths tall)|Zero|Unrelated to pen width"
  ],
    ["Each term describes one aspect: movement, size relative to the pen, or nib position.", "Match the term to what it measures, using its root: duct- means leading.", "Example: stroke order for the letter E could be top bar, stem, then lower bar. That is its ductus. Now do yours."],
    [["Three paleography terms", "🔠", "<b>Ductus</b>: how a letter is built (order and direction of strokes). <b>Modulus</b>: letter size in pen-widths. <b>Angle</b>: nib edge to baseline."], ["Reading the pen", "🔍", "Cross-overs and ink blobs reveal stroke order. Scribes trained together share a ductus."], ["Why it matters", "🧩", "Scholars compare these features to place a hand in time and place."]]);

  const A14 = mk("Papyrology, epigraphy, codicology", "🏛️", [
    "Papyrology studies...|Texts written on papyrus|Pot shapes|Insects",
    "Epigraphy studies...|Inscriptions on hard materials like stone and metal|Perfumes|Maps",
    "Codicology studies...|Manuscript books as physical objects|Computer code|Cooking",
    "Paleography studies...|Historical handwriting and scripts|Fossils|Stars",
    "Diplomatics studies...|Charters and official documents|Diplomats' manners|Dance",
    "Examining the binding, quires and ruling of a book is...|Codicology|Epigraphy|Papyrology",
    "Reading a Roman gravestone is...|Epigraphy|Codicology|Papyrology",
    "Reading a Greek tax receipt found in Egypt is...|Papyrology|Epigraphy|Diplomatics"
  ],
    ["Each word ends in -logy or -graphy, so think about what the front part names.", "Match the surface or object: papyrus, stone, codex, handwriting, charter.", "Example: ichthyology studies fish, because ichthys is Greek for fish. Now do yours."],
    [["Names for the study", "🔤", "<b>Papyrology</b> (papyrus), <b>epigraphy</b> (inscriptions), <b>codicology</b> (books as objects)."], ["Handwriting and documents", "📜", "<b>Paleography</b> studies scripts. <b>Diplomatics</b> studies official documents like charters."], ["Teamwork", "🤝", "A single manuscript may need all of them: the hand, the book, the document type."]]);

  const A15 = mk("Ostraca", "🏺", [
    "Ostraca are...|Pieces of broken pottery (or stone) used for writing|Plastic|Paper scraps",
    "Ostraca were used for...|Quick notes, receipts and school exercises|Large books|Library shelves",
    "Why were ostraca popular?|They were cheap and plentiful|They were rare|They were soft",
    "The word ostracism comes from...|Ostraca used in Athens to vote someone out|A kind of bird|A Roman bath",
    "At Deir el-Medina in Egypt, workers wrote ostraca about...|Daily work, supplies and absences|Space travel|Stock prices",
    "Ostraca survive well because pottery is...|Durable|Soft|Edible",
    "Ink on pottery was usually put on with...|A reed pen or brush|A laser|Chalk only",
    "At the Roman fort of Vindolanda in Britain, many letters survive on...|Thin wooden leaf tablets|Silk|Glass"
  ],
    ["Think about what is cheap, plentiful and long lasting.", "Remember: ostrakon is a Greek word for a pottery fragment.", "Example: a bus ticket is a scrap used to scribble a phone number. Now do yours."],
    [["Writing on pot pieces", "🏺", "<b>Ostraca</b> are potsherds used as scrap paper for notes, receipts, lists and lessons."], ["Voting with sherds", "🗳️", "In Athens, citizens scratched names on ostraca to vote someone into temporary exile: <b>ostracism</b>."], ["Everyday life", "🧱", "Ostraca and Vindolanda wooden tablets show <b>ordinary people</b> writing ordinary things."]]);

  const A16 = mk("The long s", "ſ", [
    "The long s (ſ) looks most like which letter?|f|t|l",
    "The long s was used in English printing until about...|The early 1800s|The 1950s|The 1200s",
    "The long s was normally used...|At the start or middle of a word, not at the end|Only at the end|Only in capitals",
    "The long s differs from f because it has...|No full crossbar through the stem|A thicker body|A blue colour",
    "The word ſinging would be read as...|singing|finging|linging",
    "The German letter ß developed partly from...|A long s joined to another s or z|The Greek beta|A numeral",
    "How would the word Congress be written with long s?|Congreſs|Congrefs|Congrelz",
    "Printers dropped the long s mainly to...|Match modern style and avoid confusion with f|Save paper only|Hide meaning"
  ],
    ["Look closely: the letter resembles another one, but is missing a feature.", "Remember where in a word it was used: not at the end.", "Example: a lowercase l and a capital I can look alike in some fonts. Now do yours."],
    [["An old s", "ſ", "The <b>long s</b> (ſ) was a form of lowercase s used in the middle or start of words in old printing."], ["Not an f", "🔍", "An f has a full <b>crossbar</b>; the long s has none, or only a small nub on the left."], ["Gone by 1800s", "📅", "English printers dropped it in the early 1800s. A final s was always the round one: Congreſs."]]);

  const A17 = mk("Charter anatomy", "📃", [
    "The three parts of a medieval charter are...|Protocol, text and eschatocol|Title, cover and index|Prologue, plot and epilogue",
    "The protocol is...|The opening section, naming the issuer and greeting|The closing seal|The pen type",
    "The eschatocol contains...|Closing items such as date, witnesses and seals|The cover design|The ISBN",
    "The text of a charter states the...|Actual grant or business|Ink recipe|Library number",
    "An invocation is...|An opening formula at the start of the document|A list of witnesses|A page number",
    "The corroboration clause says...|How the document is validated (seal, witnesses)|Which ink was used|When it expires",
    "The intitulation names...|The issuer of the document|The scribe's pen|The type of ink",
    "Witness lists usually appear in the...|Eschatocol|Protocol|Cover"
  ],
    ["The word eschatocol is built from a Greek word meaning 'last'.", "Sort the clues: opening, main business, closing.", "Example: a letter has greeting, message, sign-off. Now do yours."],
    [["Three parts", "3️⃣", "Medieval charters are often split: <b>protocol</b> (opening), <b>text</b> (main business), <b>eschatocol</b> (closing)."], ["Formulas", "🔖", "Protocol: invocation, <b>intitulation</b> (issuer), address, greeting. Text: the grant and clauses."], ["Closing", "🔏", "Eschatocol: date, <b>witnesses</b>, and <b>corroboration</b> (how it is validated), often with a seal."]]);

  const A18 = mk("Ottoman printing", "🕌", [
    "Ibrahim Müteferrika founded an Ottoman Turkish press in Istanbul in the...|1720s|1320s|1920s",
    "His press printed books in...|Ottoman Turkish in Arabic script|English|Cyrillic",
    "Before that, Ottoman books were copied mostly by...|Scribes and calligraphers|Machines|Robots",
    "One reason print spread slowly in Arabic script was...|Joined, changing letter shapes are harder to cast, and calligraphy was prized|No ink existed|The script cannot be written",
    "Hebrew printing came to Istanbul in...|1493|1793|1393",
    "Which kinds of books did Müteferrika's press publish?|Dictionaries, histories and geography|Hymnals only|Cookbooks only",
    "The city of Istanbul is in modern...|Türkiye|Greece|Egypt",
    "Calligraphers resisted print partly because...|Their craft and income depended on copying by hand|They disliked paper|They could not read"
  ],
    ["Think about when and where; the date is long after Gutenberg.", "Consider the script: joined letters, calligraphy culture, and scribal trades.", "Example: a famous craft today may resist machines because the craft is the product. Now do yours."],
    [["A late press", "🏭", "<b>Ibrahim Müteferrika</b> set up the first Ottoman Turkish press in Istanbul in the <b>1720s</b>."], ["Why slow?", "✒️", "Arabic script <b>joins</b> and changes shape, so it was harder to cast. Calligraphy and scribal trades were strong."], ["Earlier presses", "📘", "Hebrew printing in Istanbul started in <b>1493</b>. Müteferrika printed dictionaries, history and geography."]]);

  const L28 = [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18];

  // =============== LEVEL 29 ===============
  const B1 = mk("Lining and old-style figures", "🔢", [
    "Old-style figures are numerals that...|Vary in height, some rising or dropping|Are all the same height|Are Roman numerals",
    "Lining figures are numerals that are...|All the same height, like capitals|Different heights|Letters",
    "Which suits a table of numbers best?|Lining (tabular) figures|Old-style figures|Decorative figures",
    "Which blend more smoothly into running text?|Old-style figures|Lining figures in capitals|Roman numerals",
    "Tabular figures mean every digit has...|The same width, so columns align|A different colour|An underline",
    "Proportional figures...|Have widths that fit each digit's shape|Are all the same width|Are italic",
    "In most old-style sets, 6 and 8 usually...|Rise above the x-height|Drop below the baseline|Become capitals",
    "In many old-style sets, 3, 4, 5, 7 and 9 usually...|Drop below the baseline|Rise above the x-height|Disappear"
  ],
    ["Think about how tall each digit is and where the digit sits against the baseline.", "Decide whether the digits behave like capitals or like lowercase letters.", "Example: in a price list, columns line up when every digit takes the same space. Now do yours."],
    [["Two families", "🔢", "<b>Lining</b> figures sit between baseline and cap height. <b>Old-style</b> figures vary, like lowercase."], ["Tabular or proportional", "📊", "<b>Tabular</b>: equal widths, columns line up. <b>Proportional</b>: widths fit the shape, better for text."], ["Choose by job", "🎯", "Old-style in sentences; lining and tabular in tables and prices."]]);

  const B2 = mk("Variable fonts", "🎚️", [
    "A variable font stores...|A whole range of styles along axes in one file|One fixed weight|A photo",
    "An axis in a variable font is...|A slider for a property like weight or width|A cutting tool|A pen",
    "Common axes include...|Weight, width and slant|Smell and taste|Temperature",
    "Variable fonts were introduced in...|2016, as part of OpenType 1.8|1816|1996",
    "A benefit of variable fonts is that...|One file can replace many static style files|They are always larger|They need no screen",
    "The wght axis controls...|Weight, from light to bold|Weight of paper|Width",
    "Named instances are...|Preset positions on the axes, like 'Bold'|Pen names|Nicknames of designers",
    "The range a designer allows on an axis is part of the font's...|Design space|Margins|Colophon"
  ],
    ["Think of a slider or dial rather than a fixed set of files.", "Match the tag or word to the visual property it adjusts.", "Example: a volume knob moves smoothly from quiet to loud. A weight axis does that for thickness. Now do yours."],
    [["Sliders for letters", "🎚️", "A <b>variable font</b> holds a range of designs along <b>axes</b> such as weight (wght), width (wdth) and slant."], ["One file", "📦", "Instead of separate Light, Regular, Bold files, one file can offer all the steps between."], ["Presets", "📌", "<b>Named instances</b> are saved positions, e.g. Bold. Designers set the allowed range."]]);

  const B3 = mk("Optical sizes", "🔍", [
    "Optical size means adjusting a design for...|The size at which it will be viewed|The paper colour|The language",
    "Display (large-size) cuts usually have...|Finer details and tighter spacing|Sturdier hairlines and looser spacing|More swashes",
    "Text (small-size) cuts usually have...|Sturdier thin strokes and looser spacing|Hairline strokes and tight spacing|Wild flourishes",
    "Small text needs looser spacing because...|Details blur together at small sizes|Letters grow bigger|Ink spreads wider",
    "In metal type, each point size was usually...|Cut as its own design|An identical scaled copy|Printed digitally",
    "Scaling a text font way up for a poster can look...|Heavy and clumsy next to a display cut|Perfect|Invisible",
    "The standard variable-font axis tag for optical size is...|opsz|wght|slnt",
    "A caption cut is meant for...|Very small text|Billboards|Book covers"
  ],
    ["Ask what happens to thin lines and gaps when text is tiny or huge.", "Small text needs strength and space; large text can afford fine detail.", "Example: a delicate pencil sketch needs a bolder outline when you shrink it. Now do yours."],
    [["Design for the size", "📏", "A letter designed for 8 points is not just a smaller copy of one designed for 80. That is <b>optical size</b>."], ["Text vs display", "🆚", "<b>Text</b> cuts: sturdy strokes, looser spacing. <b>Display</b> cuts: fine details, tighter spacing."], ["Today", "💻", "Variable fonts can include an <b>opsz</b> axis so the design shifts smoothly as size changes."]]);

  const B4 = mk("Page margins and canons", "📖", [
    "A canon of page construction gives rules for...|Placing the text block and margins by ratio|Writing dates|Binding thread",
    "Jan Tschichold's well-known margin ratio gives which margin the most space?|The bottom|The inner (gutter)|The top",
    "Why are the two inner margins of a spread kept modest?|Together they read as one gap|To save ink|To hide the binding",
    "A comfortable line length for book text is about...|45 to 75 characters|5 characters|300 characters",
    "The gutter is...|The inner margin next to the binding|The gap between letters|The top margin",
    "The text block is...|The area of the page holding the text|The ink|A stack of paper",
    "Tschichold's 1928 book about modern design was titled...|The New Typography|Printing 101|The Pen",
    "Very long lines make reading harder because...|The eye struggles to find the next line|Ink runs|Paper tears"
  ],
    ["Think about how a book looks when open: two pages facing each other.", "Margins are not equal: designers give some sides more room on purpose.", "Example: a framed picture often has more space at the bottom of its mat. Now do yours."],
    [["Rules from old books", "📐", "Designers like <b>Tschichold</b> studied medieval pages and found repeating ratios for margins and text blocks."], ["Not equal", "↕️", "Typically inner margin smallest, then top, outer, and the <b>bottom</b> largest."], ["Line length", "↔️", "Lines of about <b>45 to 75 characters</b> are comfortable. Longer lines lose the reader."]]);

  const B5 = mk("Rivers, widows and orphans", "🌊", [
    "A river in typography is...|A chain of word spaces forming a white streak|A blue ink|A margin",
    "Widows and orphans both describe stray lines that are...|Left alone at the top or bottom of a page or column|Printed in red|Centred",
    "Ragged right means...|Lines end unevenly on the right|Both sides are aligned|The text is centred",
    "Justified text can cause rivers because...|Spaces between words are stretched to fill lines|Ink pools|Fonts shrink",
    "One way to reduce rivers is to...|Allow hyphenation or rebreak the lines|Increase the font size only|Delete paragraphs",
    "Ragged-right text keeps...|Equal word spaces|Equal line lengths|Lines the same height",
    "Flush left means lines start at...|The left margin|The right margin|The centre",
    "A river is most visible in...|Narrow justified columns|Wide ragged text|A single word"
  ],
    ["Picture the shape the white space makes on the page.", "Rivers happen when something is stretched. Ask what is being stretched.", "Example: stretching a rubber band to fill a gap makes it thin and uneven. Now do yours."],
    [["White streaks", "🌊", "In justified text, word spaces can line up down the page into a pale <b>river</b>."], ["Stray lines", "🧍", "<b>Widows and orphans</b> are single lines stranded at the top or bottom of a column or page."], ["Fixes", "🔧", "Hyphenate, rebreak lines or use <b>ragged right</b> so spaces stay even."]]);

  const B6 = mk("Justification and hyphenation", "↔️", [
    "Justified text is aligned on...|Both left and right edges|The left edge only|The centre",
    "To justify a line, a typesetter adjusts...|Word spaces (and sometimes letter spacing)|Pen angle|Page numbers",
    "The Knuth-Plass method breaks lines by...|Looking at the whole paragraph to find the best breaks|Filling each line greedily|Random choice",
    "Donald Knuth released TeX in the late...|1970s|1870s|1990s",
    "A greedy line-breaking method...|Fills each line as full as possible, one at a time|Looks at the whole paragraph|Counts pages",
    "Hyphenation helps justified text because...|Lines can break more flexibly, reducing big gaps|It makes words bigger|It changes meaning",
    "Hanging punctuation means...|Punctuation sits in the margin so the edge looks straight|Punctuation is deleted|Punctuation is bold",
    "Hyphens normally go at...|Syllable or word-part breaks|Any random letter|Before capitals only"
  ],
    ["Think about which spaces get stretched or squeezed to make both edges even.", "Looking at the whole paragraph gives better results than deciding line by line.", "Example: packing a suitcase well means planning everything, not stuffing one item at a time. Now do yours."],
    [["Even on both sides", "↔️", "<b>Justified</b> text lines up on both edges by changing the spaces between words."], ["Smart line breaks", "🧠", "<b>Knuth-Plass</b> (in TeX, 1978) considers the whole paragraph. Simple 'greedy' methods fill one line at a time."], ["Hyphens and margins", "➖", "Hyphenation gives more break choices. <b>Hanging punctuation</b> keeps the edge visually straight."]]);

  const B7 = mk("Type designers and their faces", "🅰️", [
    "Claude Garamond cut types in...|Paris, in the 1500s|Berlin, in the 1900s|Tokyo",
    "William Caslon's types were popular in...|England and the American colonies in the 1700s|China|Greece",
    "John Baskerville worked in...|Birmingham|Venice|Boston",
    "Giambattista Bodoni worked in the Italian city of...|Parma|Naples|Turin",
    "Bodoni's types are known for...|High contrast between thick and thin strokes|No contrast at all|Hand-drawn wobble",
    "Nicolas Jenson's admired roman types of the 1470s were cut in...|Venice|Moscow|Cairo",
    "Matthew Carter designed the screen fonts...|Verdana and Georgia|Helvetica and Futura|Times and Arial",
    "Adrian Frutiger designed the typeface...|Univers|Garamond|Comic Sans"
  ],
    ["Link each designer to a city and a century.", "Use the style clue: high contrast, sturdy text face, or screen design.", "Example: Gutenberg worked in Mainz, so Mainz goes with early printing. Now do yours."],
    [["Names behind the fonts", "👤", "<b>Jenson</b> (Venice, 1470s), <b>Garamond</b> (Paris, 1500s), <b>Caslon</b> (London, 1700s), <b>Baskerville</b> (Birmingham)."], ["High contrast", "◐", "<b>Bodoni</b> of Parma made the thick and thin strokes sharply different."], ["Modern designers", "💻", "<b>Frutiger</b> made Univers; <b>Matthew Carter</b> made Verdana and Georgia for screens."]]);

  const B8 = mk("Sans-serif milestones", "🔤", [
    "Edward Johnston's sans-serif for the London Underground dates from...|1916|1816|2016",
    "Gill Sans (1928) is classed as a...|Humanist sans-serif|Geometric slab|Blackletter",
    "Futura (1927) was designed by...|Paul Renner|Max Miedinger|Eric Gill",
    "Helvetica (1957) was developed at a Swiss foundry by...|Max Miedinger|Johannes Gutenberg|William Caslon",
    "Helvetica was first named...|Neue Haas Grotesk|Old Swiss|Univers",
    "Geometric sans-serifs like Futura are based on...|Circles, squares and triangles|The stroke of a broad pen|Rough handwriting",
    "Humanist sans-serifs draw on...|Classical Roman capitals and handwriting|Pure circles|Machine parts",
    "Times New Roman was designed for the newspaper...|The Times of London|The New York Times|The Daily Planet"
  ],
    ["Link each face to its designer, country or main idea.", "Geometric means shapes from basic forms; humanist means shapes from handwriting.", "Example: Garamond is an old-style serif from Paris, not a sans-serif. Now do yours."],
    [["Sans-serif grows up", "🔠", "<b>Johnston</b> (1916) and <b>Gill Sans</b> (1928) are humanist: proportions from Roman capitals and the pen."], ["Geometric", "⚪", "<b>Futura</b> (Paul Renner, 1927) is built from circles and simple shapes."], ["Neutral grotesques", "🇨🇭", "<b>Helvetica</b> (1957, Switzerland) began as Neue Haas Grotesk. <b>Times New Roman</b> was made for The Times in 1931."]]);

  const B9 = mk("Edward Johnston", "🖌️", [
    "Johnston revived broad-pen lettering by studying...|Medieval manuscripts such as the Ramsey Psalter|Newspapers|Neon signs",
    "His 1906 book is titled...|Writing & Illuminating, & Lettering|The Pen Is Mighty|Type Today",
    "Johnston taught lettering in...|London|Chicago|Sydney",
    "Johnston is often called the father of the modern...|Calligraphy revival|Printing press|Photograph",
    "Johnston taught that letter shapes should come from...|The way the tool is used|Random doodles|Copying handwriting only",
    "Which sculptor and typeface designer studied under him?|Eric Gill|Gutenberg|Bodoni",
    "The Ramsey Psalter was written about...|1,000 years ago|In 1900|In 100 CE",
    "Johnston's Underground alphabet is the basis of...|New Johnston, still used by Transport for London|Times New Roman|Arial"
  ],
    ["Think about the tool and the old books Johnston studied.", "He believed a letter's form is a result of the tool's shape and the writer's movement.", "Example: a chisel-cut capital and a brush-drawn capital look different for good reasons. Now do yours."],
    [["Back to the pen", "🖋️", "<b>Edward Johnston</b> studied the Ramsey Psalter and learned how a <b>broad-edged pen</b> makes letters."], ["A famous book", "📕", "<i>Writing & Illuminating, & Lettering</i> (1906) taught a generation of letterers."], ["Pupils and legacy", "🌱", "<b>Eric Gill</b> studied with him. His Underground sans is still used today as New Johnston."]]);

  const B10 = mk("Ibn Muqla and proportion", "📐", [
    "Ibn Muqla was a...|Vizier and calligrapher in Baghdad|Printer in Venice|Monk in Ireland",
    "He lived in the...|900s CE|1500s|1800s",
    "His system of proportion is based on...|The alif measured in rhombic dots|A ruler in inches|Pen colour",
    "A rhombic dot is made by...|Pressing the pen's nib to make a diamond-shaped mark|Using a brush|Pencil dots",
    "In proportioned scripts, the height of alif is measured in...|Dots|Inches|Lines of text",
    "Which is one of the six classical Arabic scripts, the 'six pens'?|Thuluth|Textura|Uncial",
    "A qalam is...|A reed pen cut with an angled tip|A brush|A ballpoint",
    "The purpose of such proportions is...|Consistent, harmonious letter shapes|Faster printing|Bigger books"
  ],
    ["Think about what unit a calligrapher can use to keep letters consistent.", "The unit comes from the pen itself.", "Example: a weaver counts threads to keep a pattern even. Now do yours."],
    [["Measure with the pen", "📏", "<b>Ibn Muqla</b> (Baghdad, 900s) tied letter size to the <b>rhombic dot</b> made by the pen's nib."], ["The alif as ruler", "|", "The vertical <b>alif</b> is a set number of dots tall; other letters are fitted to that unit and to circles."], ["Six pens", "🖊️", "Proportioned scripts include <b>Thuluth</b> and <b>Naskh</b>, written with a cut reed <b>qalam</b>."]]);

  const B11 = mk("Chinese script styles", "🈶", [
    "Which style is the most ancient-looking, with rounded, even strokes?|Seal script|Cursive script|Running script",
    "Clerical script developed in the Han dynasty for...|Fast official record-keeping|Metal types|Typewriters",
    "Regular script is...|Upright and clear, each stroke separate|Wild and flowing|Round seals",
    "Running script is...|Semi-cursive, between regular and cursive|The same as seal|Carved stone",
    "Cursive (grass) script is the...|Fastest and most abbreviated|Slowest|Printed",
    "Wang Xizhi, 300s CE, is famous for his...|Running script Preface to the Orchid Pavilion|Printed bible|Neon signs",
    "The Four Treasures of the Study are...|Brush, ink, paper and inkstone|Quill, wax, sand and glue|Pen, tablet, screen and mouse",
    "An inkstone is used to...|Grind an ink stick with water|Cut paper|Print pages"
  ],
    ["Match each style to its speed: slow and formal, medium, or fast.", "Think of the order from most formal to most flowing: seal, clerical, regular, running, cursive.", "Example: in English, block capitals are formal and joined handwriting is fast. Now do yours."],
    [["Five styles", "🈶", "<b>Seal</b>, <b>clerical</b>, <b>regular</b>, <b>running</b> and <b>cursive</b> script, from formal to fastest."], ["A master", "🖌️", "<b>Wang Xizhi</b> (300s CE) is famous for the running-script <i>Orchid Pavilion Preface</i>."], ["Four treasures", "💎", "Brush, ink stick, paper and <b>inkstone</b>: the calligrapher's four treasures."]]);

  const B12 = mk("Saccades and fixations", "👀", [
    "When you read, your eyes move in...|Quick jumps called saccades|A smooth slide|Spins",
    "Between jumps the eyes pause in fixations lasting about...|200 to 250 milliseconds|2 hours|2 seconds",
    "During a saccade, readers take in...|Very little useful visual information|The most information|Sound",
    "Regressions are...|Backward jumps to re-read|Forward jumps|Blinks",
    "A typical saccade in English reading covers about...|7 to 9 letters|70 letters|1 letter",
    "For readers of left-to-right scripts, the useful area extends farther to the...|Right|Left|Top",
    "For readers of Hebrew, the useful area extends farther to the...|Left|Right|Bottom",
    "Eye-tracking research records...|Where and how long the eyes fixate|Heart rate|Handwriting pressure"
  ],
    ["Think about what the eyes do while moving versus while still.", "The useful area leans in the direction the reader is heading.", "Example: a car sees the road ahead more than the road behind. Now do yours."],
    [["Jump and pause", "👁️", "Eyes move in <b>saccades</b> and read during <b>fixations</b> of about a quarter second."], ["Look ahead", "➡️", "Readers use a <b>perceptual span</b> that extends farther in the reading direction, to the right for English."], ["Back-tracking", "↩️", "<b>Regressions</b> are jumps back to re-read. Eye-tracking records all of this."]]);

  const B13 = mk("The visual word form area", "🧠", [
    "The visual word form area lies in the left...|Fusiform region at the base of the brain|Frontal pole|Brainstem",
    "Neuronal recycling suggests reading reuses brain areas evolved for...|Recognizing objects and shapes|Hearing|Smelling",
    "Writing is a recent invention, so the brain...|Re-uses existing circuits|Evolved a special reading organ|Has no role",
    "Learning to read increases the area's response to...|Letters and words|Colours only|Faces only",
    "The area responds similarly to 'cat' and 'CAT', showing it codes...|Abstract letter identity|Only the font|Only the sound",
    "fMRI measures...|Blood-oxygen changes linked to brain activity|Skull size|Heart sound",
    "Damage to this region can cause...|Pure alexia, trouble reading with writing often spared|Deafness|Blindness",
    "Stanislas Dehaene wrote the book...|Reading in the Brain|Writing in Stone|Brain Fonts"
  ],
    ["Think about the age of writing compared with the age of the human brain.", "The answer links to existing circuits for seeing shapes.", "Example: you can use a kitchen knife to cut a cake, a use it was not designed for. Now do yours."],
    [["Recycled circuits", "♻️", "Writing is only about 5,000 years old. Reading <b>re-uses</b> brain areas for recognizing shapes."], ["A letterbox", "📬", "The <b>visual word form area</b> (left fusiform) learns to recognize words and responds to 'cat' and 'CAT' alike."], ["Brain damage", "⚕️", "Damage there can cause <b>pure alexia</b>: reading is lost but writing may be spared."]]);

  const B14 = mk("The dual-route model", "🛤️", [
    "The dual-route model says reading uses...|A sound-based route and a whole-word route|Only sounds|Only pictures",
    "The route that sounds out letters is the...|Phonological route|Lexical route|Visual route",
    "The word 'yacht' cannot be read by sounding out, so we need the...|Lexical (whole-word) route|Phonological route|Neither",
    "A made-up word like 'blop' is read via the...|Phonological route|Lexical route|Memory of the word",
    "Damage to the lexical route typically causes trouble with...|Irregular words such as yacht|Nonwords|Digits",
    "Damage to the phonological route typically causes trouble with...|Nonwords|Irregular words|Digits",
    "Spelling 'colonel' relies on...|Stored memory of the word's spelling|Sound rules|Guessing",
    "A rival to dual-route models is the connectionist...|Triangle model, learning links between spelling, sound and meaning|Pyramid model|Square model"
  ],
    ["One route works letter-by-letter with sound rules; the other looks up whole words.", "Ask whether the word follows regular spelling rules or not.", "Example: 'cat' follows rules; 'one' does not. Now do yours."],
    [["Two routes", "🛤️", "Reading may use a <b>phonological</b> route (sound out) and a <b>lexical</b> route (word lookup)."], ["Which for what", "🔀", "Nonwords: phonological. Irregular words like <i>yacht</i>: lexical."], ["Breakdowns", "⚕️", "Damage to each route causes different reading problems. Some models use a connected <b>triangle</b> instead."]]);

  const B15 = mk("Shallow and deep orthographies", "🔤", [
    "Orthographic depth describes how consistently...|Spellings map to sounds|Pens press|Words are long",
    "Which language has a deep orthography?|English|Finnish|Spanish",
    "Which language has a shallow orthography?|Finnish|English|French",
    "Children usually learn to decode accurately faster in...|Shallow orthographies|Deep orthographies|No difference",
    "The letters 'ough' in through, though and tough show English spelling is...|Inconsistent (deep)|Shallow|Absent",
    "Chinese characters mainly represent...|Morphemes or syllables with meaning|Single sounds like letters|Only pictures",
    "Spanish spelling is relatively...|Shallow|Very deep|Picture-based",
    "In a shallow orthography, a letter usually has...|One main sound|Many sounds|No sound"
  ],
    ["Think about how many sounds one spelling can make.", "Shallow means 'regular and predictable'; deep means 'many exceptions'.", "Example: in Spanish, the letter a nearly always sounds the same. Now do yours."],
    [["Predictable or not", "🔍", "<b>Shallow</b> orthographies (Finnish, Spanish) match letters to sounds closely. <b>Deep</b> ones (English, French) have many exceptions."], ["Learning speed", "🏃", "Children tend to read accurately sooner in shallow systems."], ["Other systems", "🈶", "Chinese characters mostly represent <b>meaningful units</b>, not single sounds."]]);

  const B16 = mk("Motor equivalence", "✍️", [
    "Motor equivalence means you can produce the same pattern with...|Different muscles or limbs|Only one limb|No limbs",
    "Your signature written big on a board and small on paper keeps...|Its overall shape and style|Nothing|A totally different style",
    "That suggests handwriting is controlled by...|An abstract motor program, not only muscle commands|Only the fingers|Chance",
    "Writing with your non-dominant hand is usually less...|Smooth and precise|Fast|Interesting",
    "The isochrony principle says a letter written twice as large takes...|About the same time|Twice as long|Half as long",
    "If motor equivalence holds, a style written with the elbow should look...|Recognizably similar to your usual style|Unrelated|Mirrored",
    "A motor program can be stored as...|An abstract plan of the movement|A photograph|A sound",
    "Which skill supports learning a letter motor program?|Repeated practice|Skipping practice|Watching only"
  ],
    ["Think about writing the same word in very different ways.", "The shared pattern suggests a plan stored somewhere above the muscles.", "Example: you can sign your name in the air and it still looks like your signature. Now do yours."],
    [["Same shape, any limb", "🦾", "<b>Motor equivalence</b>: you can write with the other hand or a different size and keep your style."], ["A plan above the muscles", "🧠", "That points to an <b>abstract motor program</b>, not just muscle-by-muscle commands."], ["Isochrony", "⏱️", "Larger letters are written faster, so the time stays about the <b>same</b>."]]);

  const B17 = mk("The two-thirds power law", "🌀", [
    "When the pen goes round a tight curve, it tends to...|Slow down|Speed up|Stop",
    "On a straighter part of a stroke, the pen tends to...|Speed up|Slow down|Skip",
    "The two-thirds power law links speed to...|Curvature of the path|Ink colour|Paper size",
    "In a handwritten loop, the tightest part is usually passed at...|Lower speed|Higher speed|The same speed as straights",
    "The two-thirds power law was described in studies of...|Handwriting and drawing movements|Swimming only|Chess",
    "A skilled stroke's speed profile is typically...|Bell-shaped and smooth|Flat|Jagged",
    "Children's early strokes are often...|More variable and jerky|Smoother|Faster",
    "With practice, handwriting movements become...|More automatic and smooth|Slower and jerkier|Impossible"
  ],
    ["Picture a car on a winding road. Where does it slow down?", "The law ties speed to how sharply the path bends.", "Example: a skater slows for a sharp turn and speeds along a straight rink. Now do yours."],
    [["Slow in the curves", "🌀", "Hands naturally <b>slow down</b> on tight curves and speed up on straighter parts."], ["A law of movement", "📉", "The <b>two-thirds power law</b> (found in handwriting and drawing studies) relates speed to curvature."], ["Smooth with practice", "📈", "Skilled strokes are smooth and bell-shaped; novice strokes are shakier."]]);

  const B18 = mk("Speed-accuracy trade-off", "⏱️", [
    "The speed-accuracy trade-off says faster movement tends to bring...|More errors|Fewer errors|Smaller letters",
    "In handwriting, slowing down usually improves...|Legibility|Nothing|Ink flow",
    "Fitts's law relates movement time to...|Distance and target size|Pen colour|Age",
    "An expert writes fast and legibly because of...|Automaticity from practice|Luck|Special pens only",
    "A digitizing tablet used in research records...|Position, pressure and time|Smell|Weight",
    "Time with the pen lifted between strokes is called...|In-air time|Dwell time|Ink time",
    "A common handwriting speed measure is...|Legible letters per minute|Pages per day|Pens used",
    "To raise speed without losing legibility, practise...|In short sessions with feedback|Randomly|Only at top speed"
  ],
    ["Think about what you lose when you hurry.", "Practice makes the fast version as accurate as the slow version.", "Example: a typist who hurries makes more typos until practice makes speed automatic. Now do yours."],
    [["Fast or tidy", "⚖️", "Moving faster usually brings <b>more errors</b>. This is the speed-accuracy trade-off."], ["Measuring", "📊", "Tablets record <b>position, pressure and time</b>, including time with the pen in the air."], ["Beating it", "🚀", "With practice, movements become <b>automatic</b>, so speed rises without losing legibility."]]);

  const L29 = [B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17, B18];

  // =============== LEVEL 30 ===============
  const C1 = mk("The generation effect", "💡", [
    "The generation effect says information you generate yourself is remembered...|Better than information you only read|Worse|The same",
    "Filling in a missing word yourself helps memory more than...|Reading it ready-made|Skipping it|Looking away",
    "The generation effect was named from an experiment published in...|1978|1878|1998",
    "Writing your own examples of an idea uses the...|Generation effect|Forgetting curve|Barnum effect",
    "Generation works best when...|The task takes effort but you can succeed|It is impossible|You copy exactly",
    "Copying a sentence word for word is less generative than...|Rewording it in your own words|Highlighting it|Ignoring it",
    "If you generate a wrong answer, you should...|Check and correct it with feedback|Ignore it|Memorize it",
    "Writing a question and its answer on a flashcard is...|Generative|Passive|Pointless"
  ],
    ["Ask who does the work of producing the answer: you or the page?", "Effort that helps you produce, not just receive, tends to strengthen memory.", "Example: solving a puzzle yourself is remembered better than being told the solution. Now do yours."],
    [["Make it yourself", "💡", "The <b>generation effect</b>: things you produce yourself are remembered better than things you just read (Slamecka and Graf, 1978)."], ["Use it in notes", "📝", "Reword ideas, write your own examples, make flashcards and fill in blanks."], ["Check afterwards", "✅", "Wrong generated answers need <b>feedback and correction</b> so errors do not stick."]]);

  const C2 = mk("Correlation is not causation", "🔗", [
    "A study finds kids who write by hand more score higher. This shows...|A correlation, not proof of cause|Proof that handwriting causes it|Nothing at all",
    "A confounding variable is...|A third factor linked to both measures|The main outcome|A statistics tool",
    "A possible confounder in a handwriting and grades study is...|Family reading support|Pen colour|Paper size",
    "To test causes, researchers use...|Randomized experiments|Opinion polls only|Anecdotes",
    "Reverse causation means...|B causes A instead of A causing B|A circle of causes|There is no link",
    "Ice cream sales and sunburns both rise because of...|Sunny weather|Ice cream causing sunburn|Sunburn causing ice cream",
    "An observational study...|Records what happens without assigning treatments|Randomly assigns groups|Needs no data",
    "A spurious correlation is...|A link that appears but has no real causal connection|A proven cause|A rare event"
  ],
    ["Two things moving together does not tell you which one pushes the other.", "Look for a third factor that could explain both.", "Example: shoe size and reading skill rise together in children, because both grow with age. Now do yours."],
    [["Together is not because", "🔗", "A <b>correlation</b> means two measures move together. It does not show that one causes the other."], ["Hidden third factors", "👻", "A <b>confounder</b> can explain both. Also check <b>reverse causation</b>."], ["How to test", "🧪", "Randomized experiments help show cause. Observational studies show links."]]);

  const C3 = mk("Randomized trials and blinding", "🎲", [
    "In a randomized controlled trial, participants are...|Randomly assigned to groups|Allowed to choose|Sorted by age",
    "Random assignment helps because it...|Balances unknown differences between groups on average|Guarantees identical people|Makes everyone the same",
    "A control group receives...|The usual or comparison condition|The best treatment|Nothing ever",
    "In a double-blind study...|Neither participants nor the measurers know who is in which group|Both know|Only the director knows",
    "Raters scoring handwriting samples should not know...|Which group the child was in|The rating scale|The date",
    "It is hard to blind a handwriting study because...|Teachers and students know which method they use|Pens are secret|There is no data",
    "A pre-test and post-test help measure...|Change over time|Pen weight|Eye colour",
    "Without randomization, groups may differ because of...|Selection bias|Better ink|Weather"
  ],
    ["Think about how the groups are formed and who knows what.", "Random assignment is like drawing names from a hat; blinding hides labels.", "Example: a taste test where cups are unlabelled is blind. Now do yours."],
    [["Fair groups", "🎲", "In an <b>RCT</b>, chance decides who gets which condition, so groups are alike on average."], ["Hide the labels", "🙈", "<b>Blinding</b>: participants or raters do not know who is in which group. Double-blind hides it from both."], ["In handwriting studies", "✍️", "Blinding is tricky because teachers and children know their method, but <b>raters</b> can still be blinded."]]);

  const C4 = mk("Sample size and effect size", "📊", [
    "Larger samples give estimates that are...|More precise|Less precise|Biased",
    "Effect size measures...|How big a difference is|Whether it was published|The p-value only",
    "A Cohen's d of 0.2 is conventionally called...|Small|Large|Huge",
    "A tiny effect can be statistically significant with...|A huge sample|A tiny sample|No sample",
    "A study of six children is likely to be...|Noisy and low in power|Perfectly reliable|Strange but exact",
    "Statistical power is the chance of...|Detecting a real effect if it exists|Finding a fake effect|Finishing quickly",
    "Standard deviation measures...|The spread of scores|The average|The most common score",
    "Mean difference 5 points, standard deviation 10. Cohen's d is...|0.5|5|50"
  ],
    ["Think about size of effect versus how sure you are.", "A larger sample reduces random noise; effect size says how large the change is.", "Example: a difference of 4 points with spread 8 is half a spread, so d = 0.5. Now do yours."],
    [["How big, how sure", "📏", "<b>Effect size</b> says how big a difference is. <b>Sample size</b> affects how precise the estimate is."], ["Cohen's d", "➗", "d = mean difference divided by the standard deviation. Rough guide: 0.2 small, 0.5 medium, 0.8 large."], ["Power", "🔋", "Small studies often lack <b>power</b> to detect real effects."]]);

  const C5 = mk("Replication and preregistration", "🔁", [
    "Replication means...|Repeating a study to see if the result holds|Copying text|Printing again",
    "The replication crisis arose when...|Many published findings failed to replicate|Labs closed|Papers vanished",
    "Preregistration means...|Publicly stating the plan and analysis before collecting data|Registering after the study|Paying for a journal",
    "Preregistration reduces...|Changing hypotheses after seeing results|The sample size|Pen costs",
    "p-hacking is...|Trying many analyses until something looks significant|Cleaning data|Printing posters",
    "HARKing means...|Hypothesizing after the results are known|Hiding all results|Hearing the results",
    "Publication bias is when journals mostly publish...|Positive results|Negative results|Cooking tips",
    "A 2015 project replicated 100 psychology studies. Roughly what share gave significant results again?|About a third to 40 percent|Nearly all|None"
  ],
    ["Think about whether a result can be trusted once or only when repeated.", "Planning the analysis before seeing data prevents cherry-picking.", "Example: a magic trick that works every time is more convincing than one that worked once. Now do yours."],
    [["Does it hold?", "🔁", "<b>Replication</b> repeats a study. Many findings did not replicate, causing the replication crisis."], ["Plan first", "📋", "<b>Preregistration</b> states the plan before data, reducing <b>p-hacking</b> and <b>HARKing</b>."], ["Open science", "🔓", "Sharing data and materials lets others check and reuse the work."]]);

  const C6 = mk("Measuring legibility reliably", "📐", [
    "Legibility scales usually have raters score samples on...|A rubric of criteria like letter formation, spacing and alignment|Weight|Colour only",
    "Inter-rater reliability is...|Agreement between different raters|Pen quality|Page count",
    "Intra-rater reliability is...|A rater agreeing with themselves at different times|Two raters agreeing|Pen speed",
    "A measure is valid if it measures...|What it claims to measure|Something easy|Anything",
    "A scale that always reads 2 kg too heavy is...|Reliable but not accurate|Valid and accurate|Random",
    "Speed and legibility can be measured together as...|Letters per minute and share of legible letters|Pens used|Pages",
    "Using more than one rater helps because...|Individual judgements vary|It costs less|It is faster",
    "Raters should be blind to...|The identity or group of the writer|The rubric|The task"
  ],
    ["Reliable means consistent; valid means measuring the right thing.", "More than one rater helps check agreement.", "Example: two teachers giving the same sample the same score show good agreement. Now do yours."],
    [["Rubrics", "📋", "Raters score samples on a <b>rubric</b>: letter formation, spacing, size, alignment."], ["Reliable and valid", "🎯", "<b>Reliable</b> = consistent. <b>Valid</b> = measures what it says. You need both."], ["Check agreement", "🤝", "Compare raters (<b>inter-rater</b>) and the same rater over time (<b>intra-rater</b>), and keep raters blind."]]);

  const C7 = mk("Contrast and accessibility standards", "🌓", [
    "WCAG stands for...|Web Content Accessibility Guidelines|Writing Contrast And Grammar|World Contrast Alliance Group",
    "The minimum contrast ratio for normal text at level AA is...|4.5:1|2:1|21:1",
    "For large text at level AA, the minimum contrast ratio is...|3:1|7:1|1:1",
    "The maximum possible contrast ratio (black on white) is...|21:1|10:1|100:1",
    "Light grey text on white often fails because...|The contrast ratio is too low|It is too bold|It is too large",
    "Colour should not be the only way to...|Convey information, such as red versus green|Decorate a page|Choose a font",
    "Level AAA asks for normal-text contrast of at least...|7:1|3:1|2:1",
    "Pencil on grey paper can be hard for low-vision readers because...|Contrast is low|It is too dark|It smells"
  ],
    ["Contrast ratio is a number comparing the lightness of text and background.", "Black on white is the highest; most guidelines set a safe minimum.", "Example: yellow text on white is hard to read because the two are close in lightness. Now do yours."],
    [["A number for contrast", "🌓", "The <b>WCAG</b> contrast ratio compares text and background lightness. Black on white is <b>21:1</b>."], ["Targets", "🎯", "AA needs <b>4.5:1</b> for normal text and <b>3:1</b> for large text. AAA needs 7:1."], ["Not by colour alone", "🎨", "Do not rely on colour only; add shapes, labels or patterns. Dark ink on pale paper helps readers."]]);

  const C8 = mk("Eye-gaze and switch writing", "👁️", [
    "Eye-gaze systems let users...|Select letters by looking at them|Hear letters|Smell letters",
    "Switch access uses...|A single button operated by any reliable movement|Voice only|A pen only",
    "In scanning, the screen...|Highlights options in turn until the user presses the switch|Stays still|Types by itself",
    "AAC stands for...|Augmentative and alternative communication|Automatic audio control|Applied art class",
    "Predictive text helps AAC users by...|Reducing the number of selections needed|Making letters bigger|Hiding errors",
    "Dwell selection happens when you...|Hold your gaze or pointer on a target for a set time|Press a key|Say a word",
    "Stephen Hawking operated his speech software with a sensor that detected movement in his...|Cheek|Foot|Voice",
    "A low-tech AAC example is...|A letter board where a partner points|A satellite|A tablet only"
  ],
    ["Think about what body movement the person can control reliably.", "These tools turn a small, reliable action into a selection.", "Example: a single doorbell press can mean 'someone is here'. Now do yours."],
    [["Writing without hands", "👁️", "<b>Eye-gaze</b> trackers choose letters by looking. <b>Switches</b> work with any reliable movement."], ["Scanning and dwell", "⏳", "<b>Scanning</b> highlights choices in turn; <b>dwell</b> selects after a pause. Prediction reduces effort."], ["AAC", "🗣️", "<b>Augmentative and alternative communication</b> includes letter boards and high-tech systems, such as the setup Stephen Hawking used."]]);

  const C9 = mk("Contextual bias in examination", "⚖️", [
    "Contextual bias is when...|Irrelevant case information influences an expert's judgement|Stationery affects ink|Colours distract",
    "Knowing a suspect confessed might wrongly sway an examiner's reading of...|A questioned signature|The paper weight|The ink brand",
    "Blind verification means...|A second examiner reviews without knowing the first conclusion|Examiners close their eyes|Using blind observers",
    "Linear sequential unmasking asks examiners to analyse the questioned item...|Before seeing the known samples|After seeing everything|Never",
    "Confirmation bias is...|Seeking evidence that supports what you already believe|Weighing all evidence equally|Denying all evidence",
    "A good safeguard is a case manager who...|Withholds irrelevant details from the examiner|Shares all rumours|Hurries the work",
    "Cognitive bias affects...|Even honest, skilled experts|Only beginners|Nobody",
    "Documenting findings before seeing reference samples helps keep conclusions...|Independent|Secret forever|Shorter"
  ],
    ["Bias can sneak in without anyone meaning to cheat.", "Safeguards control what the expert knows and when.", "Example: a judge tastes two drinks without seeing labels so brand cannot sway them. Now do yours."],
    [["Bias is human", "🧠", "<b>Contextual bias</b>: extra case details can nudge experts, even honest ones."], ["Safeguards", "🛡️", "<b>Blind verification</b>, case managers, and <b>linear sequential unmasking</b>: analyse the questioned item first, then the known samples."], ["Document first", "📝", "Writing down findings before looking at references makes reasoning checkable."]]);

  const C10 = mk("Error rates and the courts", "🏛️", [
    "The 2009 National Academy of Sciences report on forensic science criticized...|A lack of scientific validation in many disciplines|Too many labs|Only DNA",
    "Daubert (1993) is a US Supreme Court ruling about...|Admitting expert scientific evidence|Copyright|Gun law",
    "One Daubert factor is the method's...|Known or potential error rate|Colour|Price",
    "A black-box study gives examiners samples with known answers to estimate...|Error rates|Pen brands|Ink prices",
    "Studies comparing document examiners with laypeople generally found examiners were...|More accurate, but not error-free|The same|Always perfect",
    "Foundational validity means...|Evidence that a method works reliably|A very old method|A cheap method",
    "An honest expert should report...|The limits of their conclusions|Only certainties|Nothing",
    "Opinions that come with a stated level of confidence are...|More transparent than absolute claims|Worthless|Illegal"
  ],
    ["Courts ask whether a method has been tested and how often it errs.", "Honest science reports uncertainty.", "Example: a weather forecast that says '70 percent chance' is more honest than 'it will rain'. Now do yours."],
    [["Testing methods", "🔬", "The <b>2009 NAS report</b> asked for scientific validation of many forensic fields."], ["Admissibility", "🏛️", "<b>Daubert</b> (1993) guides US judges on expert evidence, including <b>known error rates</b>."], ["Honest limits", "📏", "<b>Black-box studies</b> estimate accuracy. Good experts state limits, not certainties."]]);

  const C11 = mk("Acid, humidity and mould", "💧", [
    "Acidic paper turns brittle because...|Acid breaks down the cellulose fibres|Ink grows|Dust sticks",
    "Wood-pulp newsprint yellows because it contains...|Lignin|Gold|Sugar",
    "The term 'slow fires' describes...|Acidic paper slowly destroying itself|Candles|Incense",
    "Mould risk rises when relative humidity is above about...|65 percent|15 percent|30 percent",
    "Cooler storage slows...|Chemical decay|Printing|Reading",
    "Humidity swings cause paper and parchment to...|Expand and contract, causing cracks|Glow|Grow",
    "Archives limit light because ultraviolet...|Fades inks and damages paper|Cools the room|Cleans it",
    "Archival boxes often have an alkaline buffer of...|Calcium carbonate|Sugar|Salt"
  ],
    ["Think about the chemistry of paper and the effects of air, light and heat.", "Stability matters: steady cool, dry, dark storage.", "Example: bread goes stale and mouldy faster in a warm, damp kitchen. Now do yours."],
    [["Acid and age", "🧪", "Acidic paper and <b>lignin</b> in wood pulp make paper brittle and yellow. Archival boxes use <b>alkaline buffers</b>."], ["Damp and mould", "💧", "Keep relative humidity steady and below about <b>65 percent</b>. Swings crack parchment."], ["Cool, dark, steady", "🌡️", "Cool temperatures slow decay; low light and UV filtering protect inks."]]);

  const C12 = mk("Reversible conservation", "🩹", [
    "The principle of reversibility means treatments should be...|Possible to undo later|Permanent|Invisible",
    "Minimal intervention means...|Do only what is needed|Do as much as possible|Do nothing",
    "Wheat starch paste is used because it is...|Stable and removable|Sticky forever|Edible only",
    "Thin Japanese tissue is used to mend tears because it is...|Strong, thin and flexible|Heavy and stiff|Waterproof",
    "Conservators record treatments with...|Notes and photographs|Nothing|Rumours",
    "Pressure-sensitive tape is a poor repair because it...|Yellows, stains and is hard to remove|Is too decorative|Is too expensive",
    "Conservation differs from restoration because conservation...|Stabilizes the object|Makes it look new|Replaces it",
    "Before cleaning an ink, conservators first...|Test whether it is stable|Wet the whole page|Guess"
  ],
    ["Ask whether a future conservator could undo the repair.", "Doing less, documenting it, and using stable materials is the safest path.", "Example: a bandage that peels off easily is better than one welded on. Now do yours."],
    [["Undo-able", "↩️", "Treatments should be <b>reversible</b> and <b>minimal</b>: do only what is needed."], ["Gentle materials", "🩹", "Wheat starch paste and <b>Japanese tissue</b> mend tears. Sticky tape does harm."], ["Record it", "📸", "Notes and photographs document every step. <b>Conservation</b> stabilizes; <b>restoration</b> aims to look new."]]);

  const C13 = mk("Multispectral imaging", "🌈", [
    "Multispectral imaging photographs a page under...|Different wavelengths of light|One colour|Water",
    "Ultraviolet light can help reveal...|Faded or erased text through fluorescence|Printer colours|Nothing",
    "The Archimedes Palimpsest has works by Archimedes under a later...|Prayer book|Cookbook|Map",
    "The prayer book overwrote Archimedes' text in...|1229|1929|929",
    "Imaging is often safer than chemicals because it...|Does not touch or alter the object|Dissolves ink|Cuts the page",
    "X-ray fluorescence can find...|Iron in ink|Paper weight|Fonts",
    "Infrared imaging helps because some inks...|Look different or become visible at those wavelengths|Evaporate|Melt",
    "A palimpsest is a manuscript...|Reused after earlier writing was scraped off|Printed in two colours|Rolled into scrolls"
  ],
    ["Think about what you can see under lights that your eyes cannot.", "Imaging does not damage the object.", "Example: a security pen shows hidden ink under UV light. Now do yours."],
    [["Light beyond colour", "🌈", "<b>Multispectral imaging</b> captures a page under many wavelengths, including ultraviolet and infrared."], ["The Archimedes Palimpsest", "📖", "Archimedes' text was scraped off and overwritten by a <b>prayer book</b> in 1229. Imaging revealed it."], ["Non-destructive", "🔬", "Imaging and X-ray fluorescence read inks without altering them."]]);

  const C14 = mk("Digital preservation", "💾", [
    "LOCKSS stands for...|Lots of copies keep stuff safe|Locks on all stuff safely|Local copy keeps secrets",
    "TIFF is often used for archival master images because it is...|Lossless and widely supported|Tiny and lossy|Only for one device",
    "PDF/A is...|A version of PDF for long-term archiving|A game format|A printer type",
    "Fixity checks use...|Checksums to confirm a file has not changed|Pens|Sticky notes",
    "Metadata is...|Data about data, such as title, date and creator|Cheap ink|Large scale",
    "Format migration means...|Moving files to new formats before old ones become unreadable|Printing files|Deleting files",
    "Bit rot is...|Slow corruption of stored digital data|Computers rotting fruit|A file rename",
    "The 3-2-1 rule says keep...|3 copies, on 2 types of media, with 1 off site|1 copy in 3 places|2 copies in 1 room"
  ],
    ["Digital items need care too: copies, checks and formats.", "Spread your risk across copies and places.", "Example: keeping a photo on your phone, a drive and a cloud account protects it. Now do yours."],
    [["Copies and checks", "💾", "Keep several copies (<b>LOCKSS</b>) and run <b>fixity</b> checks to catch corruption."], ["Good formats", "🗂️", "<b>TIFF</b> and <b>PDF/A</b> are suited to long-term keeping. Add <b>metadata</b> so files can be found."], ["3-2-1", "🔢", "3 copies, 2 media types, 1 off site. Migrate formats before they become obsolete."]]);

  const C15 = mk("Orality and literacy", "🗣️", [
    "Walter Ong's book Orality and Literacy appeared in...|1982|1882|1992",
    "Oral cultures remember using...|Rhythm, formulas and repetition|Footnotes|Indexes",
    "Homer's repeated phrases such as 'rosy-fingered dawn' helped oral poets...|Compose and remember|Print|Type",
    "Milman Parry studied...|Oral epic composition|Printing|Paper-making",
    "Writing allows people to...|Store information outside memory and revisit it|Avoid thinking|Speak louder",
    "In Plato's Phaedrus, Socrates worries writing will...|Weaken memory|Improve speech|Cost money",
    "West African griots are...|Traditional storytellers and keepers of oral history|Printers|Ink makers",
    "Primary orality describes a culture with...|No knowledge of writing|Many libraries|Only computers"
  ],
    ["Think about how a story survives without paper.", "Rhythm and repetition help memory.", "Example: songs help us recall long lists, like the alphabet. Now do yours."],
    [["Memory without writing", "🗣️", "<b>Oral cultures</b> use rhythm, repeated phrases and story patterns to remember (Walter Ong, 1982)."], ["Homer", "🎶", "Formulas such as 'rosy-fingered dawn' helped poets compose aloud. <b>Milman Parry</b> studied this."], ["What writing changes", "✍️", "Writing stores words outside the head. Plato's <i>Phaedrus</i> worried it would weaken memory. Griots still keep oral history."]]);

  const C16 = mk("Pepys and his diary", "📔", [
    "Samuel Pepys kept his famous diary from 1660 to...|1669|1769|1569",
    "Pepys wrote in...|Shelton shorthand|Hieroglyphs|Emoji",
    "Pepys lived in...|London|Paris|Cairo",
    "His diary records events such as the Great Fire of London in...|1666|1066|1766",
    "Pepys stopped writing the diary because of worries about his...|Eyesight|Pen|Paper",
    "The diary was first transcribed and published in the...|1800s|1660s|1990s",
    "Pepys left his library to a Cambridge college called...|Magdalene|Pembroke Hall of Rome|Harvard",
    "Diaries are valuable sources because they give...|First-hand everyday detail|Final answers|Printed proof"
  ],
    ["The diary dates from the second half of the 1600s.", "Shorthand kept entries compact and somewhat private.", "Example: a student's journal today might record daily events that later become history. Now do yours."],
    [["A famous diary", "📔", "<b>Samuel Pepys</b> kept a diary in London from 1660 to 1669, writing in <b>Shelton shorthand</b>."], ["Big events", "🔥", "He recorded the <b>Great Fire of London</b> (1666) and everyday life."], ["Preserved", "📚", "He left his library to a Cambridge college (Magdalene). The diary was first published in the 1800s."]]);

  const C17 = mk("N'Ko and Adlam", "🆕", [
    "N'Ko was created in 1949 by...|Solomana Kanté|Ibn Muqla|Sequoyah",
    "N'Ko is written...|Right to left|Left to right|Top to bottom",
    "In Manding languages, N'Ko means...|I say|Hello|Book",
    "Adlam was invented in the late 1980s by...|Two brothers, Ibrahima and Abdoulaye Barry|Gutenberg|A council",
    "Adlam is used to write the...|Fulani (Fula) language|Latin|Basque",
    "Adlam was added to Unicode in...|2016|1996|2026",
    "People create new scripts to...|Fit a language's sounds and strengthen literacy and identity|Replace all writing|Hide messages",
    "N'Ko was added to Unicode in...|2006|1906|2036"
  ],
    ["Both scripts are fairly recent inventions for West African languages.", "Match each script to its creator and its language family.", "Example: Sequoyah created the Cherokee syllabary. Now do yours."],
    [["New scripts", "🆕", "<b>N'Ko</b> (1949, Solomana Kanté) writes Manding languages, right to left."], ["Adlam", "🌍", "<b>Adlam</b> (late 1980s, Barry brothers) writes <b>Fulani</b>. It joined Unicode in 2016."], ["Why make one", "💡", "A script that fits a language's sounds supports literacy, pride and computer use."]]);

  const C18 = mk("Undeciphered scripts", "❓", [
    "The Voynich manuscript is dated to the...|Early 1400s|1900s|500s",
    "Linear A is the Minoan script that...|Remains undeciphered|Was fully deciphered|Is Latin",
    "The Indus script comes from...|The Indus Valley civilization|Rome|The Maya",
    "Rongorongo comes from...|Rapa Nui (Easter Island)|Iceland|Peru",
    "To decipher a script, scholars usually need...|Enough text, and often a bilingual text or a known language|Just one sign|Luck only",
    "The Voynich manuscript is named after...|Wilfrid Voynich, a dealer who bought it in 1912|A monk|A city",
    "A claimed decipherment should be...|Tested on new text and checked by others|Accepted at once|Ignored",
    "A bilingual text helps because...|A known language lets you match signs and meaning|It adds colour|It is longer"
  ],
    ["Think about what clues you need to turn unknown signs into meaning.", "Repeated claims need testing on new text.", "Example: the Rosetta Stone gave Greek beside Egyptian, which unlocked hieroglyphs. Now do yours."],
    [["Mysteries", "❓", "<b>Linear A</b>, the <b>Indus script</b>, <b>rongorongo</b> and the <b>Voynich manuscript</b> are still unread."], ["What helps", "🗝️", "Enough text and a <b>bilingual</b> clue, or a known language behind the script."], ["Testing claims", "🧪", "A real decipherment must work on <b>new text</b> and be checked by other scholars."]]);

  const L30 = [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, C17, C18];

  Object.assign(HAND_LEVELS, {
    28: L28.concat([MIX("Mixed practice", L28[0], L28[2], L28[5], L28[8], L28[12]), MIX("Level 28 Challenge", L28[1], L28[3], L28[7], L28[10], L28[15], L28[17])]),
    29: L29.concat([MIX("Mixed practice", L29[0], L29[2], L29[5], L29[7], L29[12]), MIX("Level 29 Challenge", L29[1], L29[3], L29[8], L29[10], L29[15], L29[17])]),
    30: L30.concat([MIX("Mixed practice", L30[0], L30[2], L30[5], L30[7], L30[12]), MIX("Level 30 Challenge", L30[1], L30[3], L30[8], L30[10], L30[15], L30[17])])
  });
})();
