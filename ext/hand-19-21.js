// ext/hand-19-21.js  Mind Lab Handwriting, levels 19-21 (60 lessons)
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

  // =============== LEVEL 19 ===============
  const A1 = mk("Planning a timed essay", "⏱️", [
    "You have 40 minutes for an essay. About how long is a sensible planning stage?|3 to 5 minutes|No time at all|20 minutes",
    "What should a quick essay plan jot down?|Your main point and the order of your paragraphs|Every full sentence of the essay|Only the title",
    "Why plan before writing a timed essay?|It stops you wandering and running out of time|It makes the pen write faster by itself|It makes the essay longer for free",
    "Which plan shape is fastest to write?|A short list of numbered points|A full copy of the essay|One long paragraph",
    "Your plan has four points but you only have time for three paragraphs. What is sensible?|Combine points or drop the weakest one|Squeeze four tiny paragraphs into one line|Skip the conclusion",
    "Writing your plan in the same order as the essay helps because...|you can tick points off as you go|it makes the paper heavier|it hides your ideas",
    "A plan written in unreadable scribble is a problem because...|you may not be able to follow it under pressure|it is too tidy|it uses too much ink",
    "Where is the usual place for a rough plan in an exam booklet?|In the margin or scrap space, as the exam rules allow|On a neighbor's page|Nowhere, you must only keep it in your head"
  ],
    ["Think about what a plan is for: it is a map, not the finished essay.", "A plan is short and fast, so look for the choice that saves time instead of spending it.", "Example: for a 30-minute answer, someone might spend 3 minutes listing three points, then write. Now do yours."],
    [["A plan is a map", "🗺️", "A quick plan lists your <b>main point</b> and the <b>order</b> of your paragraphs. It takes minutes, not pages."], ["Keep it short", "📝", "Use <b>numbers and a few words</b> per point. Write it neatly enough that you can read it under pressure."], ["Follow it", "✅", "Tick off each point as you write. A plan keeps you on track and helps you finish in time."]]);

  const A2 = mk("Crossing out neatly", "✂️", [
    "How should you correct a small error in an exam answer?|Draw one neat line through it|Scribble it into a dark blob|Tear out the page",
    "Why is a single line better than scribbling the mistake out?|It is quick and tidy and the rest stays readable|It uses more ink|It makes the page shiny",
    "Where does the corrected word usually go?|Right after, or just above, the crossed-out word|On a different page|Nowhere",
    "You change your mind about a whole answer. What is clear?|Put a line through it and write the new answer clearly nearby|Leave both answers with no sign of which counts|Write the new one over the old one",
    "Overwriting a 3 to make it an 8 is risky because...|it can look like neither number|it saves paper|it is always banned",
    "Which is clearer when correcting a number?|Cross it out and rewrite it beside it|Draw over the digits|Smudge it with a finger",
    "If you cross out something and then realize it was right, what can you write beside it?|stet, or the word keep|more scribbles|A question mark and nothing else",
    "Correction fluid in an exam is...|often not allowed, so check the rules and use a neat line|always required|always free"
  ],
    ["Think about what a marker needs: a clear sign of what you meant.", "The tidiest fix is quick and leaves a clean page. Look for the choice that keeps things readable.", "Example: if you write the date 12 March but meant 21 March, a line through the 12 and 21 beside it is clear. Now do yours."],
    [["One neat line", "➖", "To fix a mistake, draw <b>one straight line</b> through it and write the correction next to it."], ["Do not overwrite", "🚫", "Writing one letter or digit on top of another often makes <b>something nobody can read</b>."], ["Know the rules", "📋", "Some exams ban correction fluid or tape. A neat line always works."]]);

  const A3 = mk("Leaving space to add things", "↕️", [
    "Writing on every second line leaves room to...|add corrections or extra points|waste paper only|make the page smell nice",
    "A caret mark ^ shows...|where to insert extra words|where to end the page|a spelling mistake",
    "If you need to add a long note later, a clear method is...|an asterisk (*) at the spot and the same mark by the added note|a new page with no sign|writing it upside down",
    "Leaving a margin on both sides is helpful because...|comments and your own notes fit there|it makes the paper longer|it stops ink drying",
    "When is double-spacing most valuable?|On a first draft you plan to edit|On a shopping label|On a street sign",
    "For a diagram plus text, a good habit is to...|leave blank space for labels|squeeze everything together|draw over the text",
    "An arrow from a note to the place it belongs is called...|an insertion arrow|a title|a footer",
    "Writing right up to the page edge can cause...|words to be cut off when copied or scanned|better scores|brighter ink"
  ],
    ["Think about what you might need to add after you have written.", "Empty space is useful. Look for the choice that makes later changes easy.", "Example: a student leaves a wide right margin so a missed fact can be inserted with a star and a note there. Now do yours."],
    [["Leave room", "📏", "Leave <b>margins</b> and, on drafts, write on <b>every second line</b> so you can add things later."], ["Mark the spot", "⭐", "Use a <b>caret ^</b>, an <b>asterisk *</b> or an <b>arrow</b> to show where an addition belongs."], ["Edges matter", "📄", "Keep your writing off the very edge so nothing is lost when a page is copied or scanned."]]);

  const A4 = mk("Greek letters in science", "🔣", [
    "Which Greek letter stands for the ratio of a circle's circumference to its diameter?|π (pi)|Σ (sigma)|λ (lambda)",
    "The symbol Δ often means 'change in'. What is its name?|delta|omega|mu",
    "The symbol Σ usually tells you to...|add up a series of terms|find a difference|take a square root",
    "Which Greek letter is often used for wavelength?|λ (lambda)|α (alpha)|θ (theta)",
    "The symbol Ω is used for the unit of...|electrical resistance (the ohm)|speed|mass",
    "Which Greek letter is commonly used for an unknown angle?|θ (theta)|Σ (sigma)|Ω (omega)",
    "Why should you write α and a differently?|They can look alike when rushed|They sound the same|They are the same letter",
    "In a unit like μm, the μ means...|micro (one millionth)|mega (one million)|milli (one thousandth)"
  ],
    ["Science and math borrow many letters from the Greek alphabet. Think about which job each one does.", "Each symbol has a common job: a constant, a change, a total, an angle or a prefix. Match the job in the question.", "Example: in 5Δt, the Δ says 'a change in t', such as the time between two readings. Now do yours."],
    [["A second alphabet", "🔤", "Science and math use <b>Greek letters</b> because the Latin ones run out: π, Δ, Σ, λ, θ, Ω, μ."], ["Make them clear", "✍️", "Practice each one so it does not turn into a letter you know. <b>α</b> is not <b>a</b>, and <b>μ</b> is not <b>u</b>."], ["Learn the jobs", "🎯", "<b>Δ</b> change, <b>Σ</b> sum, <b>π</b> circle ratio, <b>θ</b> angle, <b>λ</b> wavelength, <b>Ω</b> resistance."]]);

  const A5 = mk("From Phoenician to Latin", "🏺", [
    "Which people created an early alphabet that many later alphabets descend from?|The Phoenicians|The Vikings|The Aztecs",
    "The Phoenician alphabet had letters mainly for...|consonants|vowels|whole words",
    "Which people added letters for vowels to the alphabet?|The Greeks|The Egyptians|The Sumerians",
    "The word 'alphabet' comes from the first two Greek letters...|alpha and beta|delta and gamma|omega and pi",
    "The Latin alphabet is named after...|Latium, the region around Rome|Lapland|Latvia",
    "Which letter was added long after Roman times?|W|A|M",
    "In which direction was early Phoenician writing read?|right to left|top to bottom only|in a spiral",
    "The Phoenician letter aleph began as a picture of an ox head. Which letter did it become?|A|Z|S"
  ],
    ["Think about where our letters came from: a chain of peoples who each changed the one before.", "Writing systems are passed along and changed by each people who borrow them. Think about what changed and where.", "Example: the Hebrew and Arabic alphabets also grew from older signs, and each people altered shapes to fit its language. Now do yours."],
    [["A long chain", "⛓️", "Our alphabet passed from the <b>Phoenicians</b> to the <b>Greeks</b> to the <b>Romans</b>, and then to us."], ["Vowels arrive", "🅰️", "Phoenician letters stood for <b>consonants</b>. The <b>Greeks</b> added vowels."], ["Pictures to letters", "🐂", "Many letters began as <b>pictures</b>. The ox head of <b>aleph</b> turned on its side and became <b>A</b>."]]);

  const A6 = mk("Roman capitals and serifs", "🏛️", [
    "Which Roman monument has an inscription whose capital letters are still copied by lettering artists?|Trajan's Column|The Eiffel Tower|The Great Wall",
    "Small finishing strokes on the ends of letters are called...|serifs|stems|bowls",
    "One theory says serifs began because...|carvers finished strokes neatly at the ends|printers disliked paper|scribes disliked ink",
    "Roman capitals have thick and thin strokes. This difference is called...|contrast|slant|baseline",
    "Which tool carved Roman inscriptions into stone?|a chisel|a quill|a keyboard",
    "Capital letters are sometimes called...|majuscules|minuscules|italics",
    "In Roman inscriptions, words were often separated by...|small dots|colored lines|pictures",
    "The Romans wrote their formal inscriptions mostly in...|capital letters|joined lowercase script|emoji"
  ],
    ["Think about what stone and a chisel can do, and how letters were finished.", "Roman capitals are the model for many modern capitals. Think about how the shape of a tool shapes a letter.", "Example: a sign painter's capital letters copy the proportions of carved stone letters from long ago. Now do yours."],
    [["Carved capitals", "🏛️", "Roman inscriptions used <b>capital letters</b> carved into stone with a chisel. They became the model for later capitals."], ["Serifs", "🔠", "The little finishing strokes on the ends of letters are <b>serifs</b>."], ["Thick and thin", "🖋️", "Roman capitals mix <b>thick</b> and <b>thin</b> strokes. That difference is called <b>contrast</b>."]]);

  const A7 = mk("Uncial and insular script", "📜", [
    "Uncial script is made of...|rounded, capital-style letters|tiny pointed letters|numbers only",
    "Uncial was popular roughly between the...|4th and 8th centuries|1960s and 1990s|1st and 2nd centuries BC",
    "Irish monks developed a style called...|insular script|laser script|monoline",
    "A famous Irish manuscript with rich decoration and insular lettering is...|the Book of Kells|the Rosetta Stone|the Dead Sea Scrolls",
    "Where were many manuscripts copied in the early Middle Ages?|monasteries|supermarkets|airports",
    "Half-uncial letters are...|smaller and closer to lowercase|bigger than capitals|made only of dots",
    "What was the Book of Kells written on?|vellum (prepared calf skin)|plastic sheets|paper from wood pulp",
    "Scribes trained for years because...|every page was copied by hand|printers were cheap|ink was free"
  ],
    ["Think about the early Middle Ages: no printing, so every book was copied by hand.", "Think about who made books before printing and how long it took.", "Example: a scribe copying a long prayer book might need months for one volume, working in candlelight or daylight. Now do yours."],
    [["Rounded letters", "⭕", "<b>Uncial</b> has round, wide letters. It was a popular book hand from about the 4th to the 8th century."], ["Irish style", "☘️", "Irish and British monks wrote <b>insular script</b>, famous in the beautifully decorated <b>Book of Kells</b>."], ["Copying by hand", "🕯️", "Before printing, monks copied books on <b>vellum</b>. It took a long time and years of training."]]);

  const A8 = mk("Blackletter", "🏰", [
    "Blackletter, also called Gothic script, is known for...|dense, angular, pointed letters|round bubbly letters|tiny dots",
    "The famous Gutenberg Bible used type based on...|blackletter handwriting|emoji|a typewriter",
    "A blackletter page looks very dark because...|strokes are heavy and close together|ink is pale|letters are huge and far apart",
    "A whole word in blackletter capitals is hard to read, so...|use capitals sparingly|always do it|remove all spaces",
    "Where is blackletter still often seen?|Newspaper titles, diplomas and certificates|Road signs|Phone keypads",
    "The name 'Gothic' was given later and was...|a put-down by people who found the style old-fashioned|chosen by the Goths themselves|invented by Gutenberg",
    "Blackletter strokes are made with...|a broad-edged pen|a felt-tip fine liner|a pencil eraser",
    "A tip for reading blackletter is to...|look at whole word shapes, not single letters|read the page upside down|read it in the dark"
  ],
    ["Think about the look of the letters: tight, pointed and dark.", "Think about the tool, the look and where you have seen this style on titles.", "Example: the title of an old newspaper in sharp, dark letters is a good case to study. Now do yours."],
    [["Sharp and dark", "🏰", "<b>Blackletter</b> (Gothic script) has narrow, angular, heavy letters packed closely together."], ["A broad pen", "🖊️", "It is written with a <b>broad-edged pen</b> held at a steady angle. Gutenberg's type copied it."], ["Use with care", "⚠️", "All-capital blackletter is hard to read. Use <b>capitals sparingly</b> and keep spacing clear."]]);

  const A9 = mk("Serif and sans-serif", "🅰️", [
    "Sans-serif means a font...|has no serifs|has extra serifs|has only capitals",
    "Which sentence describes a serif font?|Letters have small feet and finishing strokes|Letters have no strokes|Letters are made of dots",
    "Which kind of type is often chosen for long printed books?|serif|decorative block lettering|tiny script",
    "Many screens use sans-serif type because...|simple shapes stay clear at small sizes|it is more expensive|it is drawn by hand",
    "'Sans' comes from a French word meaning...|without|with|large",
    "Slab serif fonts have...|thick, block-like serifs|no letters|only curly serifs",
    "A monospaced font gives every character...|the same width|its own color|a curve",
    "If you add little feet to your hand-lettered capitals, they look...|serif style|sans-serif style|script style"
  ],
    ["Think about the little feet on the ends of strokes: present or not?", "Look at the question: is it about feet on strokes, about size, or about spacing?", "Example: a capital I drawn with small bars at top and bottom looks different from a plain vertical line. Now do yours."],
    [["Feet or no feet", "🦶", "<b>Serif</b> letters have small finishing strokes. <b>Sans-serif</b> letters do not ('sans' means without)."], ["Where they work", "📖", "Serif type is common in <b>books</b>. Sans-serif is common on <b>screens</b> and signs."], ["Other types", "📏", "<b>Slab serif</b> has thick block feet. <b>Monospaced</b> type gives every character the same width."]]);

  const A10 = mk("Typeface words to know", "🔡", [
    "A typeface is...|a design family of related letter styles|one single size|a type of paper",
    "A font is traditionally...|one style and size of a typeface|a ruler|a kind of ink",
    "Leading is the space between...|lines of text|letters inside a word|pages",
    "Kerning is adjusting the space between...|specific pairs of letters|whole paragraphs|pages and covers",
    "Tracking changes the spacing of...|all letters in a stretch of text evenly|only the first letter|only numbers",
    "Point size measures...|the size of type|ink amount|paper weight",
    "Which letter pair is classic to kern because it leaves a gap?|AV|MM|II",
    "Bold and italic versions of a typeface are called...|styles|folders|margins"
  ],
    ["These words come from print shops. Think about what is being spaced or sized.", "Each word names one thing being spaced or sized: lines, pairs, a stretch of letters, or the size. Match the word to its job.", "Example: on a poster, a printer might tighten one awkward gap between two letters so the word looks even. Now do yours."],
    [["Face and font", "🔤", "A <b>typeface</b> is the design family. A <b>font</b> is one style and size of it."], ["Spacing words", "↔️", "<b>Kerning</b> is spacing between a pair. <b>Tracking</b> is spacing across many letters. <b>Leading</b> is the space between lines."], ["Size", "📐", "Type size is measured in <b>points</b>."]]);

  const A11 = mk("Anatomy of a letter", "🧬", [
    "The part of a d or b that rises above the x-height is the...|ascender|descender|counter",
    "The tail of a g or y that goes below the baseline is a...|descender|serif|ascender",
    "The enclosed empty space inside a letter like o is the...|counter|stem|spine",
    "The main upright stroke of a letter like l or t is the...|stem|bowl|arm",
    "The curved part of b and p that encloses a counter is the...|bowl|terminal|ear",
    "The end of a stroke, with or without a serif, is its...|terminal|baseline|leading",
    "The curvy main stroke of an S is its...|spine|stem|crossbar",
    "The horizontal stroke in an A or e is the...|crossbar|ascender|loop"
  ],
    ["Think of the letter as a body with named parts.", "Parts above the line, below the line, enclosed spaces and ends of strokes each have their own name.", "Example: in the letter h, the tall straight stroke up to the top is the stem, and its top part is an ascender. Now do yours."],
    [["Name the parts", "🧩", "Letters have parts: <b>stem</b>, <b>bowl</b>, <b>counter</b>, <b>crossbar</b>, <b>terminal</b> and <b>spine</b>."], ["Up and down", "↕️", "<b>Ascenders</b> rise above the x-height and <b>descenders</b> drop below the baseline."], ["Why learn them", "🔍", "Names help you talk about your lettering, such as 'my counters are too small'."]]);

  const A12 = mk("Warming up your hands", "🤲", [
    "Why warm up before long writing?|It loosens muscles and makes writing more comfortable|It changes ink color|It makes paper thinner",
    "Which is a gentle warm-up?|Slowly opening and closing your fist|Cracking your knuckles hard|Squeezing a ball as hard as you can for ten minutes",
    "A good drawing warm-up before writing is...|big ovals and zigzags on scrap paper|punching holes|tiny dots only",
    "Wrist circles help by...|moving the joint gently|locking the wrist|tightening the fingers",
    "A stretch should feel...|mild, never painful|sharp|numb",
    "How often is it sensible to pause during long writing?|Every 20 to 30 minutes for a short break|Never|Only after finishing the whole task",
    "Shaking out your hands loosely helps to...|release tension|build tension|dry ink",
    "If your hand tingles or hurts while writing, you should...|stop, rest, and tell an adult if it continues|push harder|ignore it forever"
  ],
    ["Think about athletes: they prepare muscles before hard work. Hands can too.", "Warm-ups are easy and gentle. Look for the choice that is comfortable and safe.", "Example: before a long exam, shake your hands, circle your wrists slowly, then draw loops on scrap paper. Now do yours."],
    [["Warm up first", "🔥", "Gently open and close your fists, circle your wrists and shake out your hands before a long writing session."], ["Draw big loops", "➰", "Large ovals and zigzags on scrap paper get your arm and hand moving smoothly."], ["Never force it", "🛑", "Stretches should feel <b>mild</b>. If you feel pain or tingling, stop and rest."]]);

  const A13 = mk("Left-handed writing", "🖐️", [
    "Left-handed writers often smudge ink because...|the hand drags over fresh writing|ink is magic|pens are made left-sided",
    "Which tip helps avoid smudges?|Use fast-drying ink or a gel pen|Use wet ink on glossy paper|Press very hard",
    "Which way should a left-handed writer usually tilt the paper?|Slightly clockwise, with the top toward the right|Strongly counterclockwise|Upside down",
    "A good grip position for a left-hander is...|a little farther back from the tip so they can see the writing|touching the tip|at the very end of the pen",
    "Which notebook suits a left-hander well?|One bound at the top or on the right|One with tight rings under the hand|Any, no difference at all",
    "About how many people are left-handed?|around 1 in 10|about half|almost nobody",
    "A hooked wrist when writing is a habit that...|can strain the hand|always helps|is required",
    "Forcing a natural left-hander to switch hands is...|not helpful, better to adjust paper and grip|the best approach|needed for neat writing"
  ],
    ["Think about the direction the hand travels: left-handers push the pen across fresh ink.", "Smart choices of paper angle, pen and notebook can help without any change of hand.", "Example: a left-hander turns the page a little clockwise and uses quick-dry ink so the hand stays clean. Now do yours."],
    [["The smudge problem", "💧", "Left-handers move across what they have just written, so <b>ink can smudge</b>."], ["Paper and pen", "📄", "Tilt the paper slightly <b>clockwise</b>, hold the pen a bit farther back, and choose <b>fast-drying</b> ink."], ["Never switch", "✅", "Being left-handed is normal. Adjust the setup rather than <b>forcing</b> a change of hand."]]);

  const A14 = mk("Graphology: myth and fact", "🔮", [
    "Graphology is the belief that handwriting reveals...|personality and the future|the weather|paper age",
    "Scientific studies found graphology...|cannot reliably predict personality or job success|always right|is a medical test",
    "Which is a true fact about handwriting?|It can change with age, mood and tools|It never changes|It is controlled by star signs",
    "A claim says a big loop on your y means you are generous. This is...|a myth with no good evidence|proven fact|a law of science",
    "Forensic document examination differs from graphology because it...|compares samples to see whether the same person wrote them|reads personality|predicts the future",
    "Why do people believe vague personality readings?|Vague statements feel true for almost anyone|Pens are magic|They are measured with instruments",
    "Your handwriting is messy when you hurry. This shows...|speed and situation affect writing|you have a bad character|a bad future",
    "Good critical thinking about a claim means asking...|what evidence supports it|who says it loudest|how old the claim is"
  ],
    ["Think about the difference between a claim and evidence.", "Handwriting changes with speed, tools and mood. Ask what a test would actually show.", "Example: a reading says 'slanted writing means you are shy'. A test would need many writers and a fair way to measure shyness. Now do yours."],
    [["A popular belief", "🔮", "<b>Graphology</b> says handwriting reveals personality. Studies show it <b>cannot</b> predict it reliably."], ["Real handwriting facts", "🔍", "Handwriting <b>changes</b> with speed, tool, mood and age. A messy day is not a flaw in your character."], ["Ask for evidence", "🧠", "Good thinkers ask <b>what evidence</b> supports a claim before they believe it."]]);

  const A15 = mk("Dysgraphia", "🧩", [
    "Dysgraphia is a learning difference that affects...|writing, such as forming letters and spacing|hearing|sight",
    "A person with dysgraphia is...|just as capable, but writing is harder|lazy|careless",
    "Which support can help?|Keyboards, speech-to-text and extra time|Punishment|Hiding the problem",
    "Writing may be tiring for someone with dysgraphia because...|forming letters takes extra effort and thought|ink is heavy|paper is slippery",
    "Which is a kind response to someone with messy writing?|Ask whether they would like another way to share their work|Laugh at it|Tell them only to try harder",
    "Pencil grips and slanted writing boards...|can make writing more comfortable|are banned|have no use",
    "Who can identify dysgraphia?|A qualified professional such as a therapist or psychologist|A horoscope|A stranger online",
    "Is messy handwriting alone proof of dysgraphia?|No, many things can cause it and it needs a proper assessment|Yes, always|Only for left-handers"
  ],
    ["Think about the difference between ability and effort: writing can be hard without any lack of effort.", "Support means making tasks possible and fair, not blaming. Look for a kind, practical choice.", "Example: a student who writes slowly but understands everything may do better with a keyboard and extra time. Now do yours."],
    [["A writing difference", "🧩", "<b>Dysgraphia</b> makes writing physically and mentally harder. It has nothing to do with being lazy."], ["Helpful tools", "⌨️", "<b>Keyboards</b>, <b>speech-to-text</b>, grips, slant boards and <b>extra time</b> can all help."], ["Be kind", "💛", "Never tease about handwriting. A <b>professional assessment</b> is how a difference is properly identified."]]);

  const A16 = mk("Speech-to-text and scribes", "🎙️", [
    "Speech-to-text turns...|spoken words into written text|text into pictures|ink into paper",
    "What should you do after dictating?|Proofread, because wrong words can appear|Nothing at all|Delete it",
    "A useful tip when dictating is to...|say punctuation or check it afterward|skip punctuation forever|speak in whispers only",
    "A scribe in an exam is a person who...|writes down what you say, following exam rules|takes the exam for you|marks your paper",
    "Who may be allowed a scribe or extra time?|Students with a documented need, arranged in advance with the school|Anyone, at any time|Only teachers",
    "Dictation works best in...|a quiet place|a noisy hall|a thunderstorm",
    "Which tool reads text aloud so you can check your writing?|text-to-speech|a stapler|a ruler",
    "An accommodation such as extra time is meant to...|make the test fair for a person's needs|give an unfair advantage|lower the learning"
  ],
    ["Think about different ways to get ideas onto a page besides a pen.", "Technology and helpers still need you to check the work. Look for the choice that keeps your ideas correct and fair.", "Example: a student dictates a paragraph, then reads it on screen and fixes a word that was misheard. Now do yours."],
    [["Speak to write", "🎙️", "<b>Speech-to-text</b> turns your voice into text. It is a powerful tool, but it makes mistakes."], ["Check it", "🔍", "Always <b>proofread</b> dictated text and fix wrong words and punctuation."], ["Fair support", "🤝", "A <b>scribe</b> or extra time is arranged in advance for those who need it, so everyone can show what they know."]]);

  const A17 = mk("Thank-you notes", "💌", [
    "A good thank-you note names...|the gift or help and why it mattered|only your name|a complaint",
    "How long is a typical thank-you note?|Three to five warm sentences|Ten pages|One word",
    "Which greeting suits a note to a relative named Maya?|Dear Maya,|To Maya-person|Yo,",
    "Where does the date usually go?|At the top of the note|Nowhere|After the signature only",
    "Which closing is warm?|With thanks, Sam|Hurry up, Sam|Never mind, Sam",
    "When is it best to send one?|Within a week or two|After a year|Never",
    "Handwritten notes feel personal because...|they take time and show effort|they are always long|they cost nothing",
    "Which detail makes a note sincere and specific?|Saying how you will use the gift|Saying 'thanks for the thing'|Asking for another gift"
  ],
    ["Think about how the person who receives it will feel.", "A good note is short, specific and warm. Look for the choice that shows real thought.", "Example: 'Dear Uncle Ben, thank you for the sketchbook. I used it on the trip to draw the harbor. With thanks, Lila.' Now do yours."],
    [["Short and warm", "💌", "Write <b>three to five sentences</b>: a greeting, the thanks, a detail, and a warm closing."], ["Be specific", "🎁", "Name the gift or help and say <b>how you will use it</b> or why it mattered."], ["Send it soon", "📬", "A note sent within <b>a week or two</b> shows you care. Write it by hand for a personal touch."]]);

  const A18 = mk("Deciphering messy writing", "🕵️", [
    "When you cannot read a word, first look at...|the surrounding sentence for context|only the first letter|the paper color",
    "Comparing an unclear letter with the same letter elsewhere in the text is...|a letter-matching strategy|random guessing|ignoring it",
    "Counting a word's length and its tall and short letters gives you its...|shape or outline|tone|margin",
    "A medicine instruction is unclear. The safest action is to...|check with the writer or a professional|guess|ignore it",
    "Which letter pair is easily confused in messy writing?|n and u|g and w|f and k",
    "To help your own readers, you should...|print names and numbers clearly|write names tiny|join every letter",
    "Reading a half-guessed line aloud helps because...|you can check whether it makes sense|it erases the ink|it makes the words bigger",
    "For important items like doses or addresses, you should...|confirm rather than trust a guess|trust your guess|skip them"
  ],
    ["Think like a detective: use clues from around the word.", "Context, repeated letter shapes and word outline all give clues; for important facts, ask.", "Example: in 'I will meet you at the st_tion', context suggests 'station' even if the a is unclear. Now do yours."],
    [["Use context", "🕵️", "Read the whole sentence. The words around a mystery word often tell you what it must be."], ["Match shapes", "🔎", "Compare the unclear letter with the <b>same letter elsewhere</b>, and notice the word's length and outline."], ["Confirm important facts", "☎️", "For names, numbers, doses and addresses, <b>never guess</b>. Ask the writer."]]);

  const L19 = [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18];

  // =============== LEVEL 20 ===============
  const B1 = mk("Marks mean points", "🎯", [
    "A question is worth 4 marks. Roughly how many separate points should you make?|About 4|Exactly 1 long one|About 20",
    "In a 60-minute exam with 60 marks, about how much time is there per mark?|About 1 minute|10 minutes|10 seconds",
    "A 2-mark 'explain' question usually wants...|a point plus a reason|a full page|only a title",
    "You wrote a very long answer for a 1-mark question. What is the likely problem?|You spent time that earns no extra marks|The marker will give 10 marks|The page will be too white",
    "What helps a marker find your points quickly?|Short separate lines or clear sentences for each point|One huge block of text|Tiny crowded writing",
    "A 6-mark question is worth more than a 2-mark one, so it needs...|more points and more time|less writing|no plan",
    "If you cannot do part of a question, a good choice is to...|move on and come back if you have time|leave the exam|erase the whole page",
    "Why is it wise to glance at the marks before you write?|It tells you how much to write|It tells you the answer|It hides the question"
  ],
    ["Look at the number in brackets: it tells you how much the question expects.", "More marks means more separate points and more time, not just longer sentences.", "Example: a 3-mark question about why a river floods might need three short, separate causes. Now do yours."],
    [["Read the marks", "🔢", "The marks tell you <b>how many points</b> to make and how much time to spend."], ["Separate points", "📌", "Give each point its own short sentence or line so the marker can see and <b>tick</b> it."], ["Do not over-write", "⏳", "Extra writing on a low-mark question <b>earns nothing</b> and uses time you need elsewhere."]]);

  const B2 = mk("Staying calm under pressure", "😮‍💨", [
    "Your mind goes blank at the start of an exam. A helpful first step is to...|breathe slowly and read the question again|panic|leave the room",
    "A slow breathing pattern helps because it...|calms the body's stress response|makes the pen heavier|erases memory",
    "You get stuck on one question. What is sensible?|Move on and return later|Stare at it for the whole time|Scribble random words",
    "If your handwriting gets shaky from nerves, you can...|relax your grip and slow down slightly|press harder|switch hands",
    "Writing down what you do know first helps because...|it starts your memory and earns marks|it wastes time|it annoys the marker",
    "A short stretch or shoulder drop during an exam is...|fine and can ease tension|forbidden by law|bad for the paper",
    "Which thought helps?|One question at a time|I must get everything perfect|I'm going to fail everything",
    "Before an exam it is helpful to...|sleep well, eat and pack your kit|stay up all night|skip breakfast"
  ],
    ["Think about what the body does under stress, and how to settle it.", "Slow breathing and a small step forward help more than panic. Look for the calm, practical choice.", "Example: a student who freezes takes three slow breaths, writes down one fact they know, and the next idea follows. Now do yours."],
    [["Breathe", "🌬️", "Take a few <b>slow breaths</b>. It calms your body so your hand and mind can work."], ["Start small", "✏️", "Write down <b>anything you know</b> to get going. Skip a stuck question and come back."], ["Loosen up", "🖐️", "Nerves tighten your grip. <b>Relax your hand</b> and your writing will stay readable."]]);

  const B3 = mk("Your personal abbreviation key", "🗝️", [
    "A good personal abbreviation should be...|quick to write and always used the same way|different every time|impossible to read",
    "Writing 'w/' usually stands for...|with|without|was",
    "The symbol ∴ means...|therefore|because|equals",
    "The abbreviation 'e.g.' means...|for example|that is|and so on",
    "The abbreviation 'i.e.' means...|that is|for example|compare",
    "'etc.' means...|and so on|therefore|note well",
    "Where is a good place to keep your abbreviation key?|At the top or the back of your notebook|On a separate loose page you lose|Nowhere, memorize it all in a day",
    "Why avoid personal shorthand in a final exam answer or formal essay?|The marker may not understand it|It is too neat|It uses too much ink"
  ],
    ["Abbreviations help only if you and your reader can decode them.", "Match each abbreviation to what it stands for, and keep your own key so you stay consistent.", "Example: if you write 'b/c' for 'because' every time, you can read your notes tomorrow. Now do yours."],
    [["Short and steady", "⚡", "Abbreviations save time, but only if you use them the <b>same way</b> every time."], ["Common ones", "🔣", "<b>w/</b> with, <b>w/o</b> without, <b>→</b> leads to, <b>∴</b> therefore, <b>e.g.</b> for example, <b>i.e.</b> that is, <b>etc.</b> and so on."], ["Keep a key", "🗝️", "List your abbreviations in one place. In formal writing, <b>write words in full</b>."]]);

  const B4 = mk("Mnemonics on paper", "🧠", [
    "A mnemonic is...|a memory trick|a kind of pen|a book cover",
    "'Please Excuse My Dear Aunt Sally' helps remember...|the order of operations in math|the planets|the days",
    "ROY G. BIV helps remember...|the colors of the rainbow|musical notes|chemical symbols",
    "An acrostic uses...|the first letters of words to make a new phrase|only numbers|only pictures",
    "Writing a mnemonic by hand helps because...|writing it also helps it stick in memory|ink improves memory|paper stores it for you",
    "Which is the best mnemonic?|One you make yourself, with words that mean something to you|One too long to remember|One with nonsense letters",
    "'Every Good Boy Does Fine' helps remember the lines of the treble clef staff in music. It is...|an acrostic mnemonic|a poem about food|a math rule",
    "To keep a mnemonic useful, you should...|test yourself without looking|never look at it again|rewrite it every hour"
  ],
    ["A mnemonic turns something hard to remember into something simple.", "Many use the first letters of the words you need to remember. Think about which list each is for.", "Example: for the Great Lakes, the word HOMES stands for Huron, Ontario, Michigan, Erie, Superior. Now do yours."],
    [["Memory tricks", "🧠", "A <b>mnemonic</b> is a trick to remember a list or an order, often using first letters."], ["Famous ones", "🌈", "<b>ROY G. BIV</b> for rainbow colors, <b>PEMDAS</b> phrases for order of operations, and <b>EGBDF</b> phrases for music."], ["Make your own", "✍️", "Write your own by hand. A phrase that is <b>funny or personal</b> sticks best."]]);

  const B5 = mk("One-page summary sheets", "📃", [
    "A one-page summary sheet works best when it holds...|key ideas, formulas and definitions in short form|every sentence from the book|only the title",
    "Making your own summary sheet helps because...|choosing and writing the key points is itself studying|someone else does it for you|it avoids learning",
    "Which makes a summary sheet easy to scan?|Clear headings and boxes around key facts|One dense block of text|Very tiny handwriting",
    "What should you do if your summary does not fit on one page?|Cut to the most important points|Add more pages|Write over the lines",
    "Before using a summary sheet in a test, you should...|check that the rules allow it|hide it in a pocket|ignore the rules",
    "A good use of the sheet before a test is to...|try to recall the page from memory, then check|only read it once|lose it",
    "Which handwriting choice helps on a summary sheet?|Bigger headings and neat, spaced lines|The same size for everything|Cramming in all directions",
    "A summary sheet is best made...|a few days before so you can review it|ten minutes before the exam|after the exam"
  ],
    ["Think about what you would want to see in a fast final review.", "A summary sheet is about choosing what matters and making it easy to see.", "Example: a history sheet might have a boxed timeline, three key names, and two cause-and-effect arrows. Now do yours."],
    [["Choose what matters", "🎯", "Pick the <b>key ideas, formulas and definitions</b>. Leave out everything else."], ["Make it scannable", "📦", "Use <b>headings, boxes and arrows</b> with neat, spaced writing."], ["Use it to recall", "🔁", "Cover it and <b>recall from memory</b>, then check. Follow the exam rules about what you may bring."]]);

  const B6 = mk("Flowcharts by hand", "🔀", [
    "In a flowchart, a diamond usually shows...|a decision (yes or no)|the start only|a title",
    "A rectangle in a flowchart usually shows...|a step or action|a decision|the end",
    "Ovals mark the...|start and end|decisions|labels",
    "What do arrows show in a flowchart?|The direction of the flow|The color of ink|The page number",
    "A diamond has two paths out. What are they usually labeled?|Yes and No|Start and End|Up and Down",
    "A good flowchart flows from...|top to bottom or left to right|bottom to top in a spiral|random corners",
    "To keep a hand-drawn flowchart readable, you should...|keep text short and boxes aligned|write whole paragraphs inside|draw all shapes tiny and crowded",
    "Before drawing neatly, it helps to...|sketch it in pencil first|use the final pen at once|ignore the order"
  ],
    ["Each shape in a flowchart has its own job.", "Think of a path through a recipe or a game: steps, questions, and arrows between them.", "Example: 'Is it raining?' goes in a diamond, with 'Take umbrella' on one path. Now do yours."],
    [["Shapes have jobs", "🔷", "<b>Ovals</b> start and end, <b>rectangles</b> are steps, <b>diamonds</b> are decisions."], ["Follow the arrows", "➡️", "Arrows show the order. Keep the flow <b>top to bottom</b> or <b>left to right</b>."], ["Keep it neat", "✏️", "Use short words in each shape, align your boxes and <b>sketch in pencil</b> first."]]);

  const B7 = mk("Copperplate script", "🖋️", [
    "Copperplate gets its name from...|the engraved copper plates once used to print it|the color of the ink|a penny coin",
    "Copperplate is written with a...|pointed, flexible nib|chisel marker|felt brush",
    "Thick strokes in copperplate come from...|pressing down on downstrokes|pressing on upstrokes|never pressing",
    "Upstrokes in copperplate are...|thin hairlines|the thickest strokes|skipped",
    "Traditional copperplate slant is about...|55 degrees from horizontal|10 degrees|90 degrees",
    "An oblique holder is useful because...|it holds the nib at an angle to match the slant|it makes ink dry|it adds color",
    "Copperplate was used in the 1700s and 1800s for...|formal letters, certificates and business writing|computer code|road signs",
    "The best way to start learning copperplate is...|slow, even practice of basic strokes|rushing the fancy capitals|skipping guidelines"
  ],
    ["Think about the tool and how pressure changes the line.", "Copperplate depends on a flexible nib, a steady slant and thick and thin lines.", "Example: a beginner draws a row of slanted ovals on guidelines before trying any letters. Now do yours."],
    [["A flowing hand", "🖋️", "<b>Copperplate</b> (or roundhand) is an elegant script based on engraved copper plates."], ["Thick and thin", "⚖️", "Press on <b>downstrokes</b> for thick lines and release on <b>upstrokes</b> for thin hairlines."], ["Slant and rhythm", "📐", "Keep a steady slant of about <b>55 degrees</b> and practice basic strokes slowly."]]);

  const B8 = mk("Arabic script", "🕌", [
    "In which direction is Arabic written?|right to left|left to right|top to bottom only",
    "Arabic letters change shape depending on...|their position in a word|the pen color|the page size",
    "The Arabic alphabet has about...|28 letters|5 letters|100 letters",
    "Many Arabic letters are told apart by...|dots above or below the letter|their color|their size alone",
    "A traditional Arabic calligraphy pen is the...|qalam, a reed pen|ballpoint|crayon",
    "Naskh, thuluth and kufic are...|styles of Arabic calligraphy|musical notes|math terms",
    "Arabic writing is mostly...|joined, flowing script|separate block capitals only|pictures only",
    "Short vowels in Arabic text are often...|left out or shown by small marks|written as big letters|always doubled"
  ],
    ["Think about the direction and the joined shape of the writing.", "Position in the word, dots and the reed pen are key ideas for this script.", "Example: the Arabic letter ba looks different at the start, middle and end of a word, but the idea stays the same. Now do yours."],
    [["Right to left", "⬅️", "Arabic is written and read <b>from right to left</b>, and its letters are joined."], ["Shapes change", "🔤", "A letter can have a different shape at the <b>start, middle or end</b> of a word. <b>Dots</b> tell similar letters apart."], ["A rich art", "🎨", "Calligraphers use a <b>reed pen (qalam)</b> and styles such as <b>naskh</b>, <b>thuluth</b> and <b>kufic</b>."]]);

  const B9 = mk("Japanese writing", "🗾", [
    "How many kinds of writing does Japanese use together?|three: hiragana, katakana and kanji|one|seven",
    "Kanji characters were borrowed from...|Chinese characters|Greek letters|Latin",
    "Katakana is often used for...|foreign loan words|every word|numbers only",
    "Hiragana is mainly used for...|grammar endings and native words|foreign names only|math",
    "Kanji characters mainly stand for...|meanings or ideas|only sounds|only numbers",
    "Traditional Japanese is often written...|top to bottom in columns|left to right only|in a circle",
    "Hiragana and katakana are...|sound-based scripts (syllabaries)|picture systems only|math symbols",
    "Learning stroke order in Japanese helps...|characters look balanced and are easier to write fast|nothing at all|only printing"
  ],
    ["Japanese combines several systems. Think about what each is for.", "Two are based on sounds and one on meanings borrowed from China.", "Example: a Japanese sentence may include a kanji for the main idea and hiragana to finish the word. Now do yours."],
    [["Three together", "🗾", "Japanese uses <b>hiragana</b>, <b>katakana</b> and <b>kanji</b> side by side."], ["Sounds and meanings", "🔊", "Hiragana and katakana stand for <b>sounds</b>. Kanji came from <b>China</b> and stand for ideas."], ["Which for what", "📘", "<b>Katakana</b> is often used for loan words. Text can run <b>top to bottom</b> or left to right."]]);

  const B10 = mk("Hangul, the Korean alphabet", "🇰🇷", [
    "Who led the creation of Hangul in the 1400s?|King Sejong the Great|Gutenberg|A Roman emperor",
    "Hangul letters are grouped into...|syllable blocks|single long lines|pictures only",
    "Some Hangul consonant shapes were designed to copy...|the shape of the mouth or tongue making the sound|animal footprints|star patterns",
    "Hangul was designed to be...|easy to learn|secret|impossible to write",
    "Hangul Day in South Korea is celebrated on...|9 October|1 January|4 July",
    "Hangul is an alphabet. That means its letters mostly represent...|individual sounds|whole words|animals",
    "Korean had earlier been written using...|Chinese characters|Latin letters|Braille",
    "Hangul has about...|24 basic letters|3 letters|300 basic letters"
  ],
    ["Think about a writing system that was planned on purpose by a ruler and scholars.", "It was meant to be learned easily, with letters that reflect how sounds are made.", "Example: when letters for sounds are stacked into square blocks, each block makes one syllable. Now do yours."],
    [["Designed on purpose", "👑", "<b>Hangul</b> was created in the 1440s under <b>King Sejong the Great</b> so ordinary people could learn to read."], ["Smart shapes", "👄", "Some consonants copy the shape of the <b>mouth or tongue</b> making that sound."], ["Blocks", "🧱", "Letters stack into <b>syllable blocks</b>. Modern Hangul has about <b>24 basic letters</b>."]]);

  const B11 = mk("Cyrillic", "🔤", [
    "Which of these languages is written with the Cyrillic alphabet?|Russian|Spanish|Swahili",
    "Cyrillic is named after...|Saint Cyril|Emperor Cyrus|Cyrus the Cat",
    "Cyrillic was developed about...|1,100 years ago, in the 9th to 10th centuries|50 years ago|5,000 years ago",
    "Many Cyrillic letters were based on the...|Greek alphabet|Chinese characters|Egyptian hieroglyphs",
    "The Cyrillic letter В sounds like English...|V|B|W",
    "The Cyrillic letter Н sounds like English...|N|H|M",
    "The Cyrillic letter Р sounds like English...|R|P|F",
    "How many letters does the Russian alphabet have?|33|10|60"
  ],
    ["Think about the family of alphabets: Greek influenced many others.", "Some Cyrillic letters look like Latin ones but sound different, so check each shape.", "Example: the Cyrillic С looks like our C but sounds like S. Now do yours."],
    [["A cousin alphabet", "🌍", "<b>Cyrillic</b> is used for Russian, Bulgarian, Serbian and other languages. It grew from the <b>Greek alphabet</b>."], ["Look-alikes", "👀", "Some letters look familiar but sound different: <b>В</b> = V, <b>Н</b> = N, <b>Р</b> = R, <b>С</b> = S."], ["Russian", "📚", "The Russian alphabet has <b>33 letters</b>. Take care to write each one clearly."]]);

  const B12 = mk("Which way does writing run?", "↔️", [
    "Which languages are written from right to left?|Arabic and Hebrew|English and French|Spanish and German",
    "English is written...|left to right, top to bottom|right to left|bottom to top",
    "Boustrophedon means writing that...|switches direction on each line|runs in a circle|runs only down",
    "The word boustrophedon comes from Greek words meaning...|as the ox turns|a great letter|many lines",
    "Traditional Chinese and Japanese could be written...|in vertical columns|only in rows|in spirals",
    "Where might you see boustrophedon?|Some very early Greek inscriptions|A modern novel|A digital clock",
    "Hebrew books open from which side compared with English books?|The opposite side, so the front cover is on the right|The same side|From the top",
    "Egyptian hieroglyphs could be written in different directions, and the way to tell is to see...|which way the animal or person signs face|the page number|the ink color"
  ],
    ["Writing direction is a choice that cultures made, and different ones chose differently.", "Think about which languages go left to right, which go right to left, and which use columns.", "Example: a Hebrew book opens from the other side and each line starts on the right. Now do yours."],
    [["Different directions", "↔️", "<b>Arabic</b> and <b>Hebrew</b> run right to left. <b>English</b> runs left to right."], ["Columns", "⬇️", "Traditional <b>Chinese</b> and <b>Japanese</b> are often written in vertical columns."], ["Ox-turning", "🐂", "<b>Boustrophedon</b> ('as the ox turns') switches direction on each line, like ploughing a field."]]);

  const B13 = mk("Braille", "⠃", [
    "Braille is a writing system you read by...|touch|sight only|hearing",
    "How many dots are in a standard braille cell?|6|2|20",
    "Who developed braille?|Louis Braille|Thomas Edison|Julius Caesar",
    "Louis Braille began developing his system when he was...|a teenager|a grandfather|a baby",
    "A braille cell has dots arranged in...|two columns of three|a single row of ten|a circle of twelve",
    "Which tool lets people write braille by hand?|a slate and stylus|a paint roller|a ruler",
    "Braille was first published in...|the 1820s|the 1990s|1500 BC",
    "Because braille is made of raised dots, it is read by...|running fingertips over the page|shining a light on it|listening to it"
  ],
    ["Think about a writing system that does not need sight.", "Braille uses a tiny grid of raised dots. Think about its shape and who made it.", "Example: one raised dot in the top left of a cell stands for the letter a. Now do yours."],
    [["Reading by touch", "👆", "<b>Braille</b> is a system of raised dots that people read with their <b>fingertips</b>."], ["Six dots", "⠿", "Each cell has up to <b>six dots</b> in two columns of three. Different patterns make letters, numbers and symbols."], ["Louis Braille", "📚", "<b>Louis Braille</b> of France developed the system as a teenager in the 1820s. People can write it by hand with a <b>slate and stylus</b>."]]);

  const B14 = mk("Writing that others can read", "🔍", [
    "For a reader with low vision, which text is best?|Large, dark, evenly spaced letters on plain paper|Tiny gray writing|Fancy script on patterned paper",
    "Which color pairing is easiest to read?|Black on white|Light yellow on white|Pale gray on pink",
    "For accessible printing, a good size is often...|18 point or larger|6 point|any size as long as it is pretty",
    "Which is easier to read in large amounts?|Lowercase with normal capitals|All capital letters|Letters all stretched out",
    "A weighted pen or a thick pen grip can help someone who...|has a weak or shaky grip|loves speed|dislikes paper",
    "Why avoid relying on color alone to give meaning?|Some readers cannot tell certain colors apart|Color never prints|Color is always confusing",
    "A slanted writing board can...|make writing more comfortable|erase writing|speed up ink drying",
    "The best way to find out what helps a person is to...|ask them|decide for them|ignore it"
  ],
    ["Think about the reader: what will make your writing easiest for them to see and understand?", "Large size, strong contrast and clear spacing help many readers; tools can help hands too.", "Example: a notice for a school hall is written in thick black letters on white so it can be read from far away. Now do yours."],
    [["Clear and large", "🔎", "Use <b>big, dark, well-spaced</b> letters on plain paper. Avoid long stretches of all capitals."], ["Contrast", "◼️", "<b>Black on white</b> is easiest. Do not rely on color alone for meaning."], ["Helpful tools", "🛠️", "<b>Pen grips</b>, <b>weighted pens</b> and <b>slant boards</b> can help hands. Ask the person what works for them."]]);

  const B15 = mk("Why handwriting varies", "📈", [
    "Which of these can change how your handwriting looks?|speed, tool, surface and tiredness|only your age|only your shoe size",
    "Two signatures by the same person are...|never exactly identical|always identical|always different people",
    "A document examiner looks for...|habits that stay consistent within natural variation|exact copies only|ink color only",
    "A pen on rough paper tends to produce writing that is...|different from smooth paper|always identical|invisible",
    "Writing on your knee in a bus compared with writing at a desk is likely to look...|less steady|steadier|identical",
    "Natural variation means...|small differences in a person's own writing|forgery|a stain",
    "Which can make handwriting shaky for a while?|Being very cold or tired|Eating lunch|Using a ruler",
    "Why is perfect copying of a signature each time unlikely?|Small movements always differ slightly|Ink changes it|Pens refuse"
  ],
    ["Think about the many things that change each time you pick up a pen.", "Speed, surface, tools and body state all affect writing, but core habits stay. Think about natural variation.", "Example: a quick grocery list and a careful card look different even from the same hand. Now do yours."],
    [["Always a little different", "🔄", "Your writing changes with <b>speed, tools, surface and tiredness</b>. No two samples match exactly."], ["Core habits", "🧬", "Some habits, like letter shapes and spacing, stay <b>consistent</b> within natural variation."], ["Why it matters", "🕵️", "Examiners look for habits <b>within the range</b> of a person's normal variation."]]);

  const B16 = mk("Signs of hand strain", "🩺", [
    "Which is a warning sign of overuse in the hand?|aching, cramping or tingling|a smile|a bright page",
    "If your fingers feel numb while writing, you should...|stop, rest, and tell an adult|keep writing harder|ignore it",
    "A good way to ease strain is to...|take breaks and loosen your grip|press harder|write without stopping",
    "Which change to your setup can reduce strain?|A comfortable pen and a supported forearm|A thinner, slippery pen|A table that is too high",
    "Writing with a very tight grip can cause...|tired, sore fingers|a faster mind|better handwriting",
    "If pain keeps coming back, the best step is to...|see a doctor or other health professional|just pretend it is not there|buy a harder pen",
    "Switching between writing and typing and resting can...|spread the load on your hands|make the pain worse|do nothing",
    "Which is a good habit for long writing sessions?|Short stretch breaks|Skipping all breaks|Squeezing the pen"
  ],
    ["Your body gives signals. Think about what those signals mean and how to respond.", "Aches, tingling and numbness are signs to rest; light grip and breaks help prevent them.", "Example: after twenty minutes a student shakes out her hand, relaxes her grip, then goes on writing. Now do yours."],
    [["Listen to your hand", "👂", "<b>Aching, cramping, tingling or numbness</b> are signs to stop and rest."], ["Prevent it", "🛋️", "Take <b>breaks</b>, loosen your grip, choose a comfortable pen and support your forearm."], ["Get help", "🩺", "If problems <b>keep coming back</b>, tell an adult and see a health professional."]]);

  const B17 = mk("Commonplace books", "📚", [
    "A commonplace book is a notebook for collecting...|quotes, ideas and facts you want to keep|only your shopping lists|only maths homework",
    "Why record the source of each entry?|So you can find and credit it later|To fill up space|To hide it",
    "A useful feature for finding entries later is...|an index or contents page|a lock|a long gap",
    "Commonplace books were popular with readers in...|early modern Europe, for centuries|only the 2000s|only in prehistory",
    "An entry in a commonplace book often includes...|the quote, who said it, and your short thought|a drawing of nothing|only a date",
    "Which topic suits a commonplace book?|Lines from your reading that you want to remember|Passwords|Secret numbers",
    "Why add your own thought beside a quote?|It helps you think about it and remember it|It makes it unreadable|It is required by law",
    "A modern way to keep one is...|a paper notebook with dated entries and an index|a loose pile of unlabeled scraps|no notebook at all"
  ],
    ["Think of a notebook that holds the best bits of everything you read or hear.", "Collecting is only useful if you can find things again and know where they came from.", "Example: a student copies a line from a poem, adds the poet's name, and writes one sentence about why it matters. Now do yours."],
    [["A collection book", "📚", "A <b>commonplace book</b> holds quotes, ideas and facts you want to keep, in your own handwriting."], ["Source and thought", "✍️", "Write <b>who said it</b> and add a short note of <b>your own</b>."], ["Make it findable", "🔖", "Date entries and add an <b>index or contents page</b> so you can look things up."]]);

  const B18 = mk("Postcards and short messages", "📮", [
    "A good postcard message is...|short, friendly and specific|three pages long|empty",
    "On a postcard, where does the address usually go?|On the right half of the message side|Over the picture|In the corner of the stamp",
    "Why write small but clearly on a postcard?|There is limited space|Pens are small|Stamps are small",
    "What should you include to help the reader picture your trip?|One or two vivid details|The whole itinerary|A long list of numbers",
    "Before writing the address, a good habit is to...|do it in dark ink, in clear capital letters or print|use pencil|scribble",
    "A postcard message works best when you...|plan a few sentences before writing|write without looking|fill every millimeter",
    "The first official postcards were issued in Austria in...|1869|1269|1999",
    "A friendly sign-off for a postcard is...|Wish you were here, Sam|Dear Sir or Madam|To whom it may concern"
  ],
    ["Think about how little room there is and what you most want to say.", "Short, clear and specific wins. The address must be readable by the postal workers.", "Example: 'Hi Gran, the beach is wide and the ice cream is huge! Back Friday. Love, Max.' Now do yours."],
    [["Small space", "📮", "A postcard has little room. Plan <b>two to four short sentences</b> before you write."], ["Be vivid", "🌅", "Share <b>one or two specific details</b> so the reader can picture your trip."], ["Clear address", "📍", "Write the address in <b>dark ink and clear print</b> so it reaches its home."]]);

  const L20 = [B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17, B18];

  // =============== LEVEL 21 ===============
  const C1 = mk("Essay skeletons", "🦴", [
    "An essay skeleton lists...|your thesis, one point per paragraph and a closing idea|every sentence in full|only the date",
    "How many main ideas should each body paragraph carry?|One|Five|None",
    "Numbering your planned paragraphs helps you to...|keep order and see what is left|make the essay longer|hide the plan",
    "A quick skeleton for a 35-minute essay might have...|an intro, three body points and a conclusion|ten body points|only a conclusion",
    "Which belongs in the skeleton for each body paragraph?|The point and the evidence you will use|A summary of the whole book|The marker's name",
    "If time is running short, which part should you protect?|A clear conclusion that answers the question|A fifth example|Extra decoration",
    "Where do you put a thesis in your skeleton?|At the top, in one sentence|Nowhere|At the very end of the page only",
    "Why write the skeleton in short phrases?|It saves time and is easy to follow|It uses more paper|It is required for neatness"
  ],
    ["Think of the skeleton as the bones of the essay: strong, simple and in order.", "A skeleton is short phrases and numbers, one idea per paragraph, with the thesis on top.", "Example: Thesis; 1 evidence A; 2 evidence B; 3 evidence C; conclusion. Now do yours."],
    [["Bones first", "🦴", "A skeleton lists the <b>thesis</b>, <b>one point per paragraph</b> and a closing idea, in short phrases."], ["Number it", "🔢", "Numbers show the <b>order</b> and let you see what is left when time runs short."], ["Protect the ending", "🏁", "If time is short, make sure the <b>conclusion</b> still answers the question."]]);

  const C2 = mk("Exam pen and kit rules", "🎒", [
    "Before an exam, you should check...|the rules for pens, pencils and calculators|the weather|your neighbor's bag",
    "Many exams ask for answers in...|black ink|every color|pencil only for all answers",
    "Why bring a spare pen?|One may run out or fail|Pens are required in pairs|It makes the exam easier",
    "Pencil is usually allowed for...|diagrams and graphs, when the rules say so|every answer|nothing",
    "Why avoid a leaky or smudgy pen in an exam?|Smudges make your answers hard to read|It writes too clearly|It is illegal",
    "Which item should be in a clear pencil case in many exams?|Pens, pencils, ruler and eraser|Notes|A phone",
    "A good pen for an exam is...|comfortable and reliable, tested beforehand|brand new and untested|expensive but unfamiliar",
    "When the exam rules are unclear, you should...|ask your teacher or exam office before the day|guess|ignore it"
  ],
    ["Rules and preparation protect your marks. Think about what could go wrong on the day.", "A tested, reliable kit and knowing the rules ahead of time prevent problems.", "Example: a student tries her exam pen in a practice test and packs a spare in a clear case. Now do yours."],
    [["Know the rules", "📋", "Check <b>which pens, pencils and tools</b> are allowed. Many exams ask for black ink."], ["Test your kit", "🖊️", "Use a pen you have <b>tested</b>. Bring a <b>spare</b> in a clear pencil case if allowed."], ["Smudge-free", "💧", "Pick ink that dries fast so your answers stay <b>clear and readable</b>."]]);

  const C3 = mk("Writing for the marker", "🧑‍🏫", [
    "A marker may read hundreds of papers. What helps them most?|Clear, readable writing|Tiny cramped writing|Decorative lettering",
    "If a marker cannot read a word, the likely result is...|they cannot give marks for it|they give bonus marks|they fix it for you",
    "Which helps the marker find your final answer?|Underline or box it|Hide it in the middle|Rewrite it in tiny letters",
    "Numbering your answers clearly like 3(a) helps because...|the marker can match answers to questions|it uses more pages|it hides mistakes",
    "Key technical terms should be...|written clearly, even in print if needed|abbreviated beyond recognition|joined into a blur",
    "Leaving a blank line between answers helps...|separate them visibly|waste paper only|annoy markers",
    "Which handwriting change helps most when time is short?|Keep size and spacing steady|Switch styles every line|Squash every letter",
    "Which of these matters most for marks?|Content that is correct and readable|Fancy flourishes|Colorful pens"
  ],
    ["Imagine you are the marker reading your own paper for the hundredth time.", "Clear numbering, spacing and readable key terms save the marker time and win you marks.", "Example: a student boxes the final answer and labels each part, so no mark is missed. Now do yours."],
    [["Be readable", "👓", "A marker can only give marks for what they <b>can read</b>. Keep size and spacing steady."], ["Make answers findable", "🔢", "<b>Number</b> your answers and <b>underline or box</b> final results."], ["Key terms", "🔑", "Write important words <b>clearly</b>, in print if your cursive gets messy."]]);

  const C4 = mk("Capitals in chemical symbols", "⚗️", [
    "CO is carbon monoxide, but Co is...|cobalt|carbon|copper",
    "NO is nitric oxide, but No is...|nobelium|nitrogen|nickel",
    "Which is the chemical symbol for chlorine?|Cl|C|L",
    "Why does 'Cl' need a lowercase l written clearly?|It can be confused with a capital I|It is a number|It is a capital C",
    "Symbols with two letters begin with...|a capital letter and then a lowercase letter|two capitals|two lowercase letters",
    "In H₂O, the small 2 is...|a subscript written below the line|a superscript above the line|a power",
    "A subscript 2 should be written...|small and below the line|large and above the line|as a letter",
    "Which is the chemical symbol for sodium?|Na|S|So"
  ],
    ["Chemistry uses upper- and lowercase letters to mean different things.", "A capital then a lowercase letter marks a single element; two capitals mark two elements joined together.", "Example: Mn is manganese, but writing MN would suggest two different symbols run together. Now do yours."],
    [["Case matters", "🔠", "Elements have one capital letter, and a second letter is <b>lowercase</b>. <b>Co</b> is cobalt, <b>CO</b> is carbon monoxide."], ["Clear shapes", "✏️", "Write <b>Cl</b> so the l is tall and the C is clearly a capital C. Avoid shapes that look like I or 1."], ["Subscripts", "⬇️", "Write numbers like the 2 in <b>H₂O</b> small and below the line."]]);

  const C5 = mk("Notes in a language class", "🌐", [
    "In a vocabulary list, writing the article with each noun (like el or la) helps you learn...|its gender|its color|its page",
    "Accents can change meaning. In Spanish, está means 'is', but esta means...|this|that|here",
    "In French, où means 'where' and ou means...|or|and|but",
    "A good two-column layout for vocabulary is...|new word on the left, meaning on the right|everything in one line|random",
    "A conjugation table lists...|the forms of a verb for each person|only nouns|only numbers",
    "Marking irregular verbs in a different color helps you...|spot the ones that break the pattern|hide them|skip them",
    "Why copy accents carefully by hand?|They are part of the spelling and can change meaning|They are decoration|They are optional always",
    "Covering one column and quizzing yourself is...|an active way to learn the words|a waste|a rule"
  ],
    ["Small marks and clear layout matter in language notes.", "Accents and articles belong to the word, so they must be written with it.", "Example: French 'a' means has and 'à' means to or at, so the accent must be clear. Now do yours."],
    [["Words with extras", "🏷️", "Write each noun with its <b>article</b>, and keep <b>accents</b> clear. They change meaning."], ["Two columns", "📑", "Put the new word on one side and the meaning on the other. <b>Cover one side</b> to test yourself."], ["Spot patterns", "🔍", "Highlight <b>irregular</b> verbs and use tables for verb forms."]]);

  const C6 = mk("Meeting minutes", "🗒️", [
    "Minutes record...|decisions and action items|every word spoken|only jokes",
    "An action item should name...|what to do, who does it and by when|only a topic|nothing",
    "What goes at the top of minutes?|Date, time, place and who was there|A drawing|The weather only",
    "Minutes are usually written...|in short, neutral sentences|as a long story|in secret code",
    "Why write down who is responsible for each task?|So people know what they must do|To blame them|To fill space",
    "While taking minutes, you should focus on...|decisions and key points|copying every sentence|doodling",
    "After a meeting, minutes should be shared...|soon, while memories are fresh|a year later|never",
    "If you miss a point, you can...|ask the speaker to repeat or clarify|invent it|skip it for good"
  ],
    ["Minutes are a record of what was decided and who will do what.", "Short, neutral notes with clear tasks help everyone. Think of what matters afterward.", "Example: 'Action: Priya to book the hall by Friday.' Now do yours."],
    [["What to record", "🗒️", "Note the <b>date, who was there</b>, the <b>decisions</b> and the <b>action items</b>."], ["Action items", "✅", "Write <b>what</b>, <b>who</b> and <b>by when</b> for each task."], ["Share soon", "📤", "Write them up neatly soon after the meeting so they are accurate."]]);

  const C7 = mk("Interview notes", "🎤", [
    "When you write a direct quote, you should...|put it in quotation marks and write it exactly|paraphrase it silently|guess it",
    "Why check the spelling of a person's name?|A wrong name is disrespectful and a mistake|Names are optional|Spelling is not important",
    "It is polite to ask permission before...|recording the interview|asking the first question|saying hello",
    "After the interview, you should...|read through your notes soon and fill in gaps|wait a month|throw them away",
    "Writing the time or a marker next to a key quote helps you...|find it later|score points|erase it",
    "If you did not catch a quote, the best step is to...|ask the person to repeat or confirm|invent it|leave it out and pretend",
    "Which notes are best to prepare beforehand?|A list of clear questions|The answers|Nothing",
    "Mixed shorthand and full quotes are fine if you...|mark which is which|never review them|mix them randomly"
  ],
    ["An interview note must be accurate and respectful of the speaker.", "Quotes are the speaker's exact words, so mark them and check them. Think about how you keep facts straight.", "Example: a reporter writes a quote in quotation marks and then checks it with the speaker. Now do yours."],
    [["Accurate quotes", "💬", "Use <b>quotation marks</b> for exact words and write what was said carefully."], ["Prepare", "📝", "Bring a list of <b>questions</b>, ask permission to record, and check the spelling of <b>names</b>."], ["Review soon", "⏰", "Read and clean up your notes soon, while you still remember the details."]]);

  const C8 = mk("Spacing letters by eye", "👁️", [
    "In lettering, spacing between letters should look...|visually even, not measured by rulers alone|exactly the same distance between edges|random",
    "Between two round letters like o and o, the gap can be...|tighter|wider|the same as between two straight stems",
    "Two straight stems side by side, like in 'ii', need...|more space than round neighbors|no space|less than round letters",
    "A quick test for even spacing is to...|squint and look for dark or light patches|measure with a ruler|close your eyes",
    "Pairs like AV are tricky because...|their diagonals leave a big gap|they overlap|they are the same",
    "Why does uneven spacing look wrong?|It breaks the rhythm of the word|It saves ink|It makes letters shorter",
    "Adjusting spacing between specific pairs is called...|kerning|leading|justifying",
    "Spaces between words should be...|a little wider than the spaces inside words|zero|as large as a line"
  ],
    ["Spacing is about how the white shapes look, not about the distance in millimeters.", "Round shapes can sit closer; straight stems need more room. Squinting reveals the unevenness.", "Example: in 'HOT', the gap between H and O is a little wider than between O and T if the O's curve leans away. Now do yours."],
    [["Balance the white", "⚪", "Aim for <b>even-looking</b> space, not equal distances. Round shapes sit closer, straight ones need more."], ["The squint test", "😑", "Squint at your word. <b>Dark or light patches</b> show where spacing is uneven."], ["Tricky pairs", "🔠", "Pairs like <b>AV</b> leave a gap and need to be tucked closer together. This fix is called <b>kerning</b>."]]);

  const C9 = mk("Lettering layout and hierarchy", "🪧", [
    "In a lettered poster, the biggest words should be...|the main message|the smallest details|the date always",
    "Hierarchy in lettering means...|some words are more important and look it|all words are equal|the paper is thick",
    "A sensible limit for styles on one poster is...|two or three|twelve|none",
    "White space around words is...|helpful and gives the design room to breathe|a mistake|wasted ink",
    "Aligning text to a clear edge makes a layout...|look tidy|messy|invisible",
    "A good way to plan a layout is to...|sketch small thumbnails first|start with the final ink|ignore the plan",
    "Which makes a heading stand out?|Larger size or bolder weight|Making it tiny|Using the same style as the body",
    "Too many different lettering styles on one page make it look...|busy and confusing|clean|empty"
  ],
    ["Think about what the viewer should read first, second and last.", "Size, weight and space guide the eye. Limit the styles so the page stays calm.", "Example: a bake-sale poster has a large title, a medium date line and small details at the bottom. Now do yours."],
    [["Order of reading", "👀", "Make the <b>main message</b> biggest. Smaller sizes show less important details."], ["Limit styles", "✋", "Use <b>two or three</b> lettering styles at most, and align to clear edges."], ["Sketch first", "✏️", "Draw small <b>thumbnails</b> to plan the layout before inking."]]);

  const C10 = mk("Contrast and color in lettering", "🎨", [
    "Which color pairing is easiest to read?|Dark navy on cream|Light yellow on white|Pale pink on white",
    "Why use an outline on light lettering over a busy picture?|It separates the letters from the background|It hides the letters|It uses less ink",
    "Red and green together can be hard to tell apart for people with...|red-green color blindness|perfect sight|none of these",
    "To help all readers, you should...|not rely on color alone to give meaning|use only colors|use no letters",
    "A pale pencil letter on gray paper is...|low contrast and hard to read|high contrast|bold",
    "Black text on a dark background is...|hard to read|ideal|bold",
    "To test your design for contrast, you can...|view it in grayscale or squint at it|add more colors|shrink it small",
    "Warm colors like red and orange tend to feel...|energetic and eye-catching|cold and distant|invisible"
  ],
    ["Contrast is the difference between letters and what is behind them.", "Strong difference in light and dark helps. Think about color and tone together.", "Example: dark green letters on a pale yellow card are easy to read from far away. Now do yours."],
    [["Light versus dark", "🌗", "Letters need a strong difference in <b>light and dark</b> from their background."], ["Do not rely on color alone", "🚦", "Some people cannot tell colors like red and green apart, so add <b>shape, labels or contrast</b>."], ["Test it", "🔍", "Squint, or check it in <b>grayscale</b>. If the words fade out, increase contrast."]]);

  const C11 = mk("Quill pens", "🪶", [
    "Quill pens were usually made from the...|flight feathers of birds such as geese|bones of fish|bark of trees",
    "A quill pen is sharpened with a...|small knife (a penknife)|file made of wood|rubber stamp",
    "Quills needed to be recut because...|the tip wore down with use|ink melted them|they grew",
    "Quills were widely used for about...|a thousand years or more|ten years|one week",
    "What largely replaced quills in the 1800s?|steel nibs|ballpoint tips|keyboards",
    "Why were quills good for fine lines?|The tip is flexible and could be cut sharp|They are made of metal|They never run out",
    "Why is it called a penknife?|It was used to sharpen pens|It cuts pencils|It was a letter opener",
    "Before dipping a quill, you would...|dip in ink and shake off the excess|soak it in water|dry it in the sun"
  ],
    ["Think of the writing tool of scribes and poets before modern pens.", "A bird feather, a small knife and ink: this was a daily tool for centuries.", "Example: a scribe dips his tool, wipes the excess, and sometimes recuts the tip when it dulls. Now do yours."],
    [["A feather pen", "🪶", "<b>Quills</b> came from the flight feathers of geese and other big birds. They were used for over a thousand years."], ["Sharpened by knife", "🔪", "A small <b>penknife</b> cut the tip, and the quill had to be <b>recut</b> as it wore down."], ["Steel takes over", "🖋️", "In the <b>1800s</b> cheap steel nibs replaced quills for most writing."]]);

  const C12 = mk("Chinese characters and strokes", "🈶", [
    "How many strokes does 人 (person) have?|2|5|8",
    "How many strokes does 口 (mouth) have?|3|1|6",
    "How many strokes does 木 (tree) have?|4|2|7",
    "A general stroke-order rule is...|top to bottom, left to right|bottom to top, right to left|random",
    "In 十, which stroke is written first?|the horizontal one|the vertical one|both at once",
    "A radical is a part of a character that often hints at...|its meaning category|its ink color|its page",
    "Why learn correct stroke order?|It makes characters balanced and faster to write|It is just tradition with no use|It stops ink drying",
    "How many strokes does 山 (mountain) have?|3|9|1"
  ],
    ["Chinese characters are built from strokes in a set order.", "Count each separate line or bend as one stroke. The general rule is top to bottom, left to right.", "Example: the character for 'one', 一, is just a single horizontal stroke. Now do yours."],
    [["Stroke by stroke", "🖌️", "Each character is made of <b>strokes</b> written in a set order: <b>top to bottom, left to right</b>."], ["Crossing rule", "➕", "When strokes cross, write the <b>horizontal</b> one before the vertical one, as in <b>十</b>."], ["Radicals", "🧩", "A <b>radical</b> is a part of a character that often hints at its meaning, like 木 (tree) in tree words."]]);

  const C13 = mk("The Rosetta Stone", "🪨", [
    "The Rosetta Stone had the same text written in how many scripts?|three|one|ten",
    "The three scripts were hieroglyphic, Demotic and...|Greek|Latin|Arabic",
    "It was found in Egypt in...|1799|1999|1066",
    "Who announced how to read hieroglyphs in 1822?|Jean-François Champollion|Isaac Newton|Louis Braille",
    "Why was the Greek text so useful?|Scholars could already read Greek|It was in color|It was in braille",
    "Where is the Rosetta Stone displayed today?|The British Museum in London|A school in Rome|A private house",
    "The stone was carved with a decree from about...|196 BC|1990 AD|5000 BC",
    "Hieroglyphs had not been read for about...|1,400 years|20 years|a week"
  ],
    ["Think about a stone that held one message in three writing systems.", "One of the three scripts could already be read, giving scholars a way in.", "Example: if you can read a note in one language and see the same note in another, you can match words across them. Now do yours."],
    [["One text, three scripts", "🪨", "The <b>Rosetta Stone</b> carries the same decree in <b>hieroglyphic, Demotic and Greek</b>."], ["A key", "🔑", "Scholars could read <b>Greek</b>, so they compared it to the Egyptian scripts. <b>Champollion</b> announced his breakthrough in <b>1822</b>."], ["Today", "🏛️", "The stone, found in <b>1799</b>, is in the <b>British Museum</b> in London."]]);

  const C14 = mk("Cracking Linear B", "🔓", [
    "Linear B was written on...|clay tablets|plastic|paper",
    "Who deciphered Linear B in 1952?|Michael Ventris|Louis Braille|Johannes Gutenberg",
    "What language did Linear B turn out to record?|an early form of Greek|Latin|Egyptian",
    "Where were many Linear B tablets found?|Knossos, on Crete|Rome|Paris",
    "Michael Ventris was by profession...|an architect|a chef|a teacher",
    "A script related to Linear B, called Linear A, is still...|undeciphered|fully understood|forgotten about",
    "Linear B was mostly used for...|lists and records, such as goods and supplies|poems|diaries",
    "Deciphering an unknown script depends on...|patterns, clues and careful comparison|guessing|luck alone"
  ],
    ["Think about how a puzzle of symbols is solved: patterns and clues.", "The tablets were mostly lists. Think about who solved the riddle and what language was found.", "Example: if a list repeats certain word endings, a decoder can guess that they mark grammar. Now do yours."],
    [["A lost script", "🏺", "<b>Linear B</b> was written on clay tablets over 3,000 years ago, and found at <b>Knossos</b> on Crete."], ["The surprise", "🇬🇷", "In 1952 <b>Michael Ventris</b> showed it recorded an early form of <b>Greek</b>."], ["Still a mystery", "❓", "Its relative <b>Linear A</b> has still not been deciphered."]]);

  const C15 = mk("Writing stamina for long exams", "🔋", [
    "To keep writing for long periods, you should...|relax your grip and use your whole arm|squeeze the pen hard|lock your wrist",
    "Which habit builds stamina over weeks?|Timed practice sessions that gradually get longer|One huge session the night before|No practice",
    "Taking a short pause to shake out your hand during a long exam is...|helpful and quick|against all rules|a waste of time",
    "Pressing hard on the paper makes your hand...|tire faster|stronger|faster",
    "A pen with a comfortable barrel can...|reduce fatigue|erase letters|fix spelling",
    "What does drinking water and eating before an exam do?|Helps your body and concentration|Makes the pen lighter|Nothing",
    "If your hand cramps, a sensible first step is to...|pause, stretch gently and continue lightly|write harder|give up",
    "The best sign that your practice is working is...|you can write comfortably for longer|your hand hurts more|your paper is heavier"
  ],
    ["Stamina is built like fitness: little by little and with good technique.", "Relaxed muscles and good habits protect your hand. Look for comfortable and gradual choices.", "Example: a student practices 20-minute timed writing for two weeks, then 30, then 45. Now do yours."],
    [["Light touch", "🪶", "Grip <b>lightly</b>, use your <b>whole arm</b> and avoid pressing hard."], ["Build slowly", "📈", "Practice in <b>timed sessions</b> that gradually get longer."], ["Look after yourself", "💧", "Eat, drink water and take quick <b>shake-out pauses</b>."]]);

  const C16 = mk("Handwriting over a lifetime", "🧓", [
    "Children first learn writing mostly with...|large, simple letter shapes|fast joined scripts|calligraphy",
    "A personal style usually develops...|in the teenage years|before age 2|only at 90",
    "Handwriting tends to become faster as...|writers get practice and fluency|ink gets older|paper gets thicker",
    "A hand injury or illness can change handwriting. What can help?|Adaptive pens and therapy|Giving up on writing|Ignoring it",
    "Can handwriting be improved as an adult?|Yes, with practice at any age|No, never|Only with a special pen",
    "Why might an older person's writing look shakier?|Muscles and nerves can change with age|Pens get old|Paper shrinks",
    "Two people who learned the same style at school often...|develop different personal styles|write identically forever|stop writing",
    "A good attitude to your own changing handwriting is to...|keep it clear and comfortable|compare yourself with everyone|hide it"
  ],
    ["Handwriting grows and changes through life, like other skills.", "Practice builds fluency; bodies change; tools can help. Think about kind, practical ideas.", "Example: a teenager switches from rounded school letters to a quicker, joined hand that is clearly her own. Now do yours."],
    [["Growing up", "🌱", "Children start with <b>large simple shapes</b>. A personal style forms in the <b>teenage years</b>."], ["It can change", "🔄", "Practice makes writing faster, and bodies change with <b>age, injury or illness</b>. Adaptive tools can help."], ["Never too late", "✨", "You can <b>improve</b> your handwriting at any age with steady practice."]]);

  const C17 = mk("Styles for different jobs", "🎭", [
    "Your quick lecture notes can be...|fast and personal, as long as you can read them|perfect calligraphy|only capitals",
    "A card for a grandparent deserves...|your neatest, unhurried writing|your fastest scribble|no writing",
    "Why keep a more formal handwriting for forms?|They must be read by strangers|Forms are free|They want art",
    "Switching between a fast hand and a neat hand is a skill that...|writers can practice|nobody can do|is illegal",
    "For a label or a sign that others will read from a distance, use...|large, clear print|joined tiny script|very fancy swashes",
    "A fair copy is...|a neat, final version of earlier notes|a draft|a mistake",
    "Which situation calls for your most careful hand?|A formal letter or application|A grocery list|A doodle",
    "Why is it good to have more than one style available?|The right style makes your message clear for the task|It confuses readers|It uses more paper"
  ],
    ["Think about who will read it and how much time you have.", "Fast notes need speed, formal documents need care, and signs need size. Match the style to the job.", "Example: a student writes lecture notes quickly but uses neat print on a job application. Now do yours."],
    [["Right tool for the job", "🧰", "Use a <b>fast hand</b> for your own notes, a <b>careful hand</b> for others to read, and <b>large print</b> for signs."], ["Practice both", "🔁", "Being able to <b>shift between styles</b> is a skill you can practice."], ["Fair copy", "📄", "A <b>fair copy</b> is a neat final version made from earlier drafts."]]);

  const C18 = mk("Keeping handwritten records", "🗄️", [
    "Which paper is best for long-lasting records?|acid-free paper|newspaper|tissue",
    "Where should old letters be stored?|A cool, dry, dark place|A damp basement|A sunny window",
    "Why avoid sticky tape on old documents?|It can stain and damage the paper over time|It makes paper stronger|It is too clear",
    "Which clip is safer for storing papers?|A plastic or coated clip, or none|A rusty metal pin|A rubber band",
    "Labeling a box with names and dates helps because...|people can find and understand the records later|it makes it heavy|it hides it",
    "Which ink is more likely to last?|Archival pigment ink|Washable marker|Cheap ink that fades in sunlight",
    "Making a scanned or photo copy is useful because...|it protects the original from handling|it destroys the original|it makes ink fade",
    "To help future readers, you should write...|your name and date on notes and letters|nothing at all|only a nickname"
  ],
    ["Think about what damages paper over time: light, damp, metal and tape.", "Good materials and good labels help records last and be understood.", "Example: a family stores letters in an acid-free folder, with dates written on the back in pencil. Now do yours."],
    [["Good conditions", "📦", "Store papers in a <b>cool, dry, dark</b> place, away from sun and damp."], ["Gentle materials", "🧷", "Use <b>acid-free</b> paper and folders. Avoid sticky tape, rusty pins and rubber bands."], ["Label it", "🏷️", "Write the <b>name and date</b> on notes, and keep a <b>scanned copy</b> as a backup."]]);

  const L21 = [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, C17, C18];

  Object.assign(HAND_LEVELS, {
    19: L19.concat([MIX("Mixed practice", L19[0], L19[2], L19[5], L19[8], L19[12]), MIX("Level 19 Challenge", L19[1], L19[3], L19[7], L19[10], L19[15], L19[17])]),
    20: L20.concat([MIX("Mixed practice", L20[0], L20[2], L20[5], L20[7], L20[12]), MIX("Level 20 Challenge", L20[1], L20[3], L20[8], L20[10], L20[15], L20[17])]),
    21: L21.concat([MIX("Mixed practice", L21[0], L21[2], L21[5], L21[7], L21[12]), MIX("Level 21 Challenge", L21[1], L21[3], L21[8], L21[10], L21[15], L21[17])])
  });
})();
