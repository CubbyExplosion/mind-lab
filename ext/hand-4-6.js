// ext/hand-4-6.js  Mind Lab Handwriting, levels 4-6 (60 lessons)
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
  // typed counting lessons
  const countMk = (title, vis, words, ask, test, exWord, exText, slides) => {
    const make = () => {
      const w = pick(words.filter(x => x !== exWord));
      const n = w.split("").filter(test).length;
      return {
        text: ask(w), visual: vis, answer: n,
        hints: ["Say each letter of the word slowly, one at a time. Count only the ones the question asks about.",
          "Touch each letter with your finger as you go. Keep a tally, and do not count a letter that is not in the group.",
          exText + " Now do yours."]
      };
    };
    make.teach = () => slides.map(([h, v, t]) => ({ h, v, t }));
    return { title, make };
  };

  // =============== LEVEL 4 ===============
  const A1 = mk("Capitals start sentences", "✏️", [
    "What is wrong with this sentence?<br><b>the dog ran home.</b>|It needs a capital letter at the start|It needs a question mark|Nothing is wrong",
    "What is wrong with this sentence?<br><b>We like to swim</b>|It needs a period at the end|It needs a capital at the start|Nothing is wrong",
    "What is wrong with this sentence?<br><b>my cat is soft.</b>|It needs a capital letter at the start|It needs a question mark|Nothing is wrong",
    "What is wrong with this sentence?<br><b>It is sunny today</b>|It needs a period at the end|It needs a capital at the start|Nothing is wrong",
    "What is wrong with this sentence?<br><b>Birds can fly.</b>|Nothing is wrong|It needs a capital at the start|It needs a question mark",
    "What is wrong with this sentence?<br><b>Today i am happy.</b>|The word i should be a capital I|Today should be small|Nothing is wrong",
    "What is wrong with this sentence?<br><b>Mom and i can read.</b>|The word i should be a capital I|Mom should be small|Nothing is wrong",
    "What is wrong with this sentence?<br><b>mom and I can read.</b>|mom should start with a capital|I should be small|Nothing is wrong",
    "Which word must <b>always</b> be a capital letter, even in the middle of a sentence?|I|we|my",
    "A sentence must start with...|a capital letter|a small letter|a comma"
],
    ["Check three things: the first letter, the word I, and the mark at the end.", "A good sentence has a capital letter at the start, a mark at the end, and the word I is always a capital.", "Example: <b>she can jump</b> becomes <b>She can jump.</b> It got a capital S and a period. Now do yours."],
    [["Start with a capital", "A b C", "The first letter of a sentence is a <b>capital letter</b>. It tells the reader a new sentence begins."], ["The word I", "I", "When you write about yourself, the word <b>I</b> is always a capital letter, even in the middle of a sentence."], ["Finish it", "🏁", "End with a mark: a period, a question mark or an exclamation mark. Then read it over."]]);
  const A2 = mk("Ending marks", "❓", [
    "Which mark ends this sentence?<br><b>Where is my hat</b>|a question mark|a period|an exclamation mark",
    "Which mark ends this sentence?<br><b>I have a red kite</b>|a period|a question mark|an exclamation mark",
    "Which mark ends this sentence?<br><b>Hooray, we won</b>|an exclamation mark|a period|a question mark",
    "Which mark ends this sentence?<br><b>What is your favorite color</b>|a question mark|a period|an exclamation mark",
    "Which mark ends this sentence?<br><b>We went to the park</b>|a period|a question mark|an exclamation mark",
    "Which mark ends this sentence?<br><b>Can you swim</b>|a question mark|a period|an exclamation mark",
    "Which mark ends this sentence?<br><b>Ouch, that hurt</b>|an exclamation mark|a question mark|a period",
    "A sentence that asks something ends with...|a question mark|a period|an exclamation mark",
    "A sentence that tells something ends with...|a period|a question mark|an exclamation mark"
],
    ["Is the sentence asking, telling, or showing a big feeling?", "Asking uses a question mark. Telling uses a period. A big feeling or a shout uses an exclamation mark.", "Example: <b>Is it raining</b> is asking, so it ends with a question mark. Now do yours."],
    [["Three end marks", ". ? !", "A <b>period .</b> ends a telling sentence. A <b>question mark ?</b> ends an asking sentence. An <b>exclamation mark !</b> shows a big feeling."], ["Write them neatly", "✍️", "A period is a small dot sitting on the line. A question mark has a curve on top and a dot at the bottom. An exclamation mark is a line and a dot."], ["Tip", "💡", "Read the sentence in your head. Does your voice go up like a question, stay calm, or get loud?"]]);
  const A3 = mk("Days and months", "📅", [
    "What is wrong with <b>monday</b>?|It needs a capital M|It needs a period|Nothing is wrong",
    "What is wrong with <b>march</b> (the month)?|It needs a capital M|It needs a question mark|Nothing is wrong",
    "What is wrong with <b>friday</b>?|It needs a capital F|It needs a comma|Nothing is wrong",
    "What is wrong with <b>July</b> (the month)?|Nothing is wrong|It needs to be all small|It needs a period",
    "What is wrong with <b>sunday</b>?|It needs a capital S|It needs a period|Nothing is wrong",
    "What is wrong with <b>December</b>?|Nothing is wrong|It needs to be all small|It needs a comma",
    "What is wrong with this sentence: <b>today is tuesday.</b>?|Today and Tuesday need capitals|It needs a question mark|Nothing is wrong",
    "What is wrong with this sentence: <b>My birthday is in may.</b>?|May needs a capital M|It needs a question mark|Nothing is wrong",
    "Do the names of days and months start with a capital letter?|yes|no"
],
    ["Look at the first letter of the day or month. Is it big or small?", "Names of days and months start with a capital letter. The rest of the letters are small.", "Example: <b>april</b> should be <b>April</b>. Only the first letter is a capital. Now do yours."],
    [["Special names", "📅", "Days and months are special names, so they start with a <b>capital letter</b>."], ["Examples", "Monday  June", "<b>Monday</b>, <b>Saturday</b>, <b>January</b> and <b>October</b> all start with a capital."], ["Only the first", "💡", "Only the <b>first</b> letter is big. We do not write <b>MoNdAy</b>."]]);
  const A4 = mk("Which letter is tall?", "📏", [
    "Which letter touches the top line in the word <b>cab</b>?|b|c|a",
    "Which letter touches the top line in the word <b>hum</b>?|h|u|m",
    "Which letter touches the top line in the word <b>dug</b>?|d|u|g",
    "Which letter touches the top line in the word <b>fun</b>?|f|u|n",
    "Which letter touches the top line in the word <b>lap</b>?|l|a|p",
    "Which letter touches the top line in the word <b>bun</b>?|b|u|n",
    "Which letter touches the top line in the word <b>den</b>?|d|e|n",
    "Which letter touches the top line in the word <b>sob</b>?|b|s|o",
    "Which letter touches the top line in the word <b>oak</b>?|k|o|a"],
    ["Say the letters one by one. Which one has a tall stick?", "The tall letters are b, d, f, h, k and l. The small letters stay down at the middle line.", "Example: in <b>pet</b> the small letters p and e stay low, and nothing is very tall. In <b>bed</b>, b and d are tall. Now do yours."],
    [["Tall letters", "b d f h k l", "Tall letters stretch up and touch the <b>top line</b>."], ["Small letters", "a c e m n o", "Small letters only reach the <b>middle line</b>."], ["Tip", "💡", "In a word, tall and small letters sit on the same bottom line. Only their heights are different."]]);
  const A5 = mk("Join the letters", "🔗", [
    "In cursive, the letters in a word are...|joined together|all separate|written upside down",
    "Between two words in cursive, you...|lift your pencil and leave a space|keep the pencil down and join the words|erase the first word",
    "Cursive is another name for...|joined-up writing|drawing|typing",
    "What does a cursive join connect?|one letter to the next|a word to a picture|a page to a book",
    "In cursive, when do you add the dot on an i?|after finishing the word|before the word|never",
    "Cursive writing usually has...|fewer pencil lifts|a pencil lift after every letter|no letters",
    "Why can cursive be quicker?|The pencil stays on the paper more|It uses bigger paper|It needs two pencils"],
    ["Think about how a cursive word looks. Does it look like it was written in one flowing line?", "In cursive the letters hold hands with small joining strokes. The pencil lifts less, but it does lift between words.", "Example: in cursive <b>cat</b>, the c joins to a, and a joins to t, all in one go. Now do yours."],
    [["Cursive", "𝒶𝒷𝒸", "<b>Cursive</b> is joined-up writing. The letters in a word connect with little joining strokes."], ["Lift between words", "✋", "At the end of a word, lift your pencil, leave a space, then start the next word."], ["Last touches", "💡", "Dots on i and j and crosses on t are added <b>after</b> the word is finished."]]);
  const A6 = mk("Round or straight start?", "⭕", [
    "Which letter starts with a round curve, like a small c?|a|b|l", "Which letter starts with a round curve, like a small c?|c|h|t",
    "Which letter starts with a round curve, like a small c?|d|k|i", "Which letter starts with a round curve, like a small c?|g|l|p",
    "Which letter starts with a round curve, like a small c?|o|b|k", "Which letter starts with a round curve, like a small c?|q|h|t",
    "Which letter starts with a straight line down?|b|o|c", "Which letter starts with a straight line down?|l|a|g",
    "Which letter starts with a straight line down?|t|c|o", "Which letter starts with a straight line down?|h|q|a",
    "Which letter starts with a straight line down?|k|d|g", "Which letter starts with a straight line down?|p|o|c"],
    ["Picture how you start the letter. Do you begin with a circle-like curve or with a stick?", "The round starters are a, c, d, g, o and q. The stick starters are b, h, k, l, p and t.", "Example: <b>c</b> begins with a curve and <b>i</b> begins with a short stick. Now do yours."],
    [["Two ways to start", "⭕ ❘", "Many small letters begin with a <b>round curve</b>, and many begin with a <b>straight line</b>."], ["Round starters", "a c d g o q", "These letters start with a curve, like a small c."], ["Stick starters", "b h k l p t", "These letters start with a straight line down."]]);
  const A7 = mk("Straight and curvy capitals", "🔤", [
    "Which capital letter is made with only straight lines?|E|O|S", "Which capital letter is made with only straight lines?|H|C|B",
    "Which capital letter is made with only straight lines?|L|U|J", "Which capital letter is made with only straight lines?|T|O|Q",
    "Which capital letter is made with only straight lines?|F|S|C", "Which capital letter is made with only straight lines?|Z|S|O",
    "Which capital letter has no straight lines at all?|O|H|L", "Which capital letter has no straight lines at all?|S|T|F",
    "Which capital letter has no straight lines at all?|C|E|Z"],
    ["Trace the letter with your finger. Do you ever use a curve?", "Straight-line capitals are made of sticks only. Letters like C, O and S are made only of curves.", "Example: <b>A</b> is made of slanted sticks only. <b>B</b> has a stick and two bumps, so it is mixed. Now do yours."],
    [["Straight letters", "E F H I L T", "These capitals are made only with <b>straight lines</b>."], ["Curvy letters", "C O S", "These capitals are made only with <b>curves</b>."], ["Mixed letters", "B D G J", "Some letters have both straight lines and curves."]]);
  const A8 = mk("Writing 10 to 20", "🔢", [
    "How many digits does <b>12</b> have?|2|1|3", "How many digits does <b>7</b> have?|1|2|3", "How many digits does <b>20</b> have?|2|1|3",
    "Which digit do you write first for <b>16</b>?|1|6|0", "Which digit is second in <b>18</b>?|8|1|0",
    "Which number has a 1 first and then a 4?|14|41|4", "Which is right for fifteen?|15|51|105",
    "Which is right for seventeen?|17|71|107", "Which is right for twelve?|12|21|102", "Which is right for nineteen?|19|91|109"],
    ["Say the number slowly. How many number shapes do you hear and see?", "Numbers from 10 to 19 start with a 1 and then another digit. Write them from left to right in order.", "Example: <b>13</b> is a 1 and then a 3, so thirteen is written 13, not 31. Now do yours."],
    [["Two-digit numbers", "1 0", "Numbers like <b>10</b> use <b>two digits</b> side by side, with a small space between neighbors."], ["Left to right", "➡️", "Write the first digit first, then the second. <b>14</b> is a 1 and then a 4."], ["Same size", "💡", "Make both digits the same height, and sit them on the bottom line."]]);
  const A9 = mk("Light hands", "🪶", [
    "If your pencil lines are too dark and hard to erase, you should...|press more lightly|press harder|use a marker",
    "A good pencil pressure is...|light and steady|as hard as you can|not touching the paper",
    "Pressing too hard can make your hand...|tired and sore|taller|invisible",
    "If you make a mistake, you should...|erase gently and write again|tear the page|scribble over it",
    "The part of a pencil that makes the mark is called...|graphite|ink|chalk",
    "How can you tell you are pressing too hard?|You can feel dents on the back of the page|The page turns red|The pencil gets longer",
    "Why should you write lightly at first?|Mistakes are easy to erase|Nobody can read it|The pencil lasts a year",
    "A good eraser should be...|clean|sticky|wet"],
    ["Think about your hand. Is it squeezing or relaxed?", "A light, steady hand makes clear lines that are easy to fix and do not hurt your fingers.", "Example: if a line is dented into the page, the writer pressed too hard. Next time use a lighter touch. Now do yours."],
    [["Light and steady", "🪶", "Press just enough so you can see your letters. You do not need to squeeze."], ["Why?", "✋", "A light hand does not get tired, and pencil marks are easy to erase."], ["Check", "🔍", "Turn your paper over. If you can feel big dents, press lighter next time."]]);
  const A10 = mk("Slow and neat", "🐢", [
    "Neat writing usually takes...|a little time|no time at all|a whole day for one word",
    "If your writing is messy because you rush, you should...|slow down|go faster|close your eyes",
    "When you are learning, what comes first?|neatness|speed|noise",
    "Before you hand in work, a good habit is to...|read it over|throw it away|hide it",
    "Which helps you write neatly?|looking at each letter's shape|writing with your eyes shut|scribbling quickly",
    "If a word is hard to read, you can...|write it again neatly|leave it|scribble over it until it is black",
    "If your hand gets tired, you can...|shake it out and rest|keep going without a break|press harder",
    "Fast scribbles are usually...|hard to read|always neat|always correct"],
    ["Think about speed and care. Which one makes letters easier to read?", "Slow, careful writing makes letters clear. Speed comes later with practice.", "Example: a student who wrote quickly got a messy word. When she slowed down, the word looked great. Now do yours."],
    [["Take your time", "🐢", "Writing neatly is more important than writing fast."], ["Check as you go", "👀", "Look at each letter. Is it the right shape and size? Is it on the line?"], ["Speed will come", "🚀", "The more you practice neat writing, the faster you will get, without losing neatness."]]);
  const A11 = mk("Tilt the paper", "📄", [
    "A right-handed writer tilts the top of the paper a little to the...|left|right|back",
    "A left-handed writer tilts the top of the paper a little to the...|right|left|never tilts it",
    "If you write with your right hand, which hand holds the paper still?|your left hand|your right hand|your elbow",
    "If you write with your left hand, which hand holds the paper still?|your right hand|your left hand|your knee",
    "Why do many left-handed writers tilt the paper?|so they can see what they write|to make it heavy|to colour it",
    "A person who writes with the left hand is...|left-handed|right-handed|no-handed",
    "Where should your free hand rest?|on the paper, holding it still|in your pocket|under the chair",
    "Tilting the paper can make writing...|more comfortable|more squished|louder"],
    ["Think about which hand is writing. The paper tilts so that hand can move smoothly.", "Right-handers tilt the top of the page a little to the left. Left-handers tilt it a little to the right. The other hand holds the page.", "Example: Maya writes with her right hand, so she turns the top of her paper slightly left. Now do yours."],
    [["Turn the page", "📄↺", "Do not keep the paper straight. A small tilt makes your arm move more naturally."], ["Right-handed", "✋", "Tilt the top of the paper a little to the <b>left</b>."], ["Left-handed", "🤚", "Tilt the top of the paper a little to the <b>right</b>. It helps you see what you wrote."]]);
  const A12 = mk("Margins and indents", "🧾", [
    "What is a margin?|the empty space at the edge of the page|a big word|a kind of pencil",
    "Where do you start writing each line?|at the left margin|in the middle|at the bottom",
    "An indent is...|a space at the start of a paragraph|a hole in the page|a type of pen",
    "The first line of a paragraph is usually...|indented|written upside down|left blank",
    "If you run out of room at the end of a line, you...|start a new line|write off the page|write on the desk",
    "Why do we leave margins?|so writing is easy to read and does not run off the page|so the paper is heavier|to hide words",
    "The margin is the white space at the top, the bottom, and the...|sides|stars|clouds"],
    ["Think about the empty edge of the paper. What would happen if you wrote all the way to the very edge?", "The margin keeps the writing neat. An indent is a little gap at the start of a paragraph.", "Example: a story starts with a small gap on the first line. That gap is an indent. Now do yours."],
    [["Margins", "🧾", "A <b>margin</b> is the empty space around the edge of your page."], ["Indent", "➡️", "At the start of a paragraph, leave a small space. This is called an <b>indent</b>."], ["Keep it straight", "💡", "Start every line at the same left margin so the page looks neat."]]);
  const A13 = mk("Sit on the line", "📐", [
    "Which is better for neat work?|writing on the line|floating above or below the line|writing in circles",
    "Letters sit on the...|bottom line|ceiling|margin",
    "Tall letters like b, d, h and l reach up to the...|top line|bottom line|margin",
    "Where do the tails of g, j, p, q and y hang?|below the bottom line|above the top line|in the margin",
    "Short letters like a, c, e and o stop at the...|middle line|top line|edge of the page",
    "If your lines are crooked, what can help?|writing right on the ruled line|writing with your eyes closed|using a bigger pencil",
    "How should the words in a line sit?|all on the same line|jumping up and down|in a circle",
    "Which part of the page do you write on?|the lines|the table|the wall"],
    ["Look at the lines on your paper. Where should the bottom of each letter touch?", "Letters sit on the bottom line, tall letters reach the top line, short letters stop at the middle, and tails drop below.", "Example: in <b>dog</b>, d reaches up, o stays small, and g has a tail below the line. Now do yours."],
    [["Three lines", "═══", "Your paper has a top line, a middle line and a bottom line. They help you size your letters."], ["Stay on the line", "🚆", "Letters ride on the bottom line like a train on a track."], ["Heights", "📏", "Tall letters touch the top line. Short letters touch the middle line. Tails go below."]]);
  const A14 = mk("Copy carefully", "📋", [
    "Sam copied <b>the sun is hot.</b> What is missing?|a capital T|a question mark|a space",
    "Ava copied <b>We like pie</b>. What is missing?|a period|a capital letter|a comma",
    "Ben copied <b>Can you swim.</b> What is wrong?|It needs a question mark|It needs a comma|It needs a capital in the middle",
    "Lily copied <b>my dog is big.</b> What is wrong?|It needs a capital M|It needs a question mark|The word dog is wrong",
    "Tom copied <b>I like cats and dogs.</b> from the board. Is it correct?|yes, it is correct|no, it needs a question mark|no, it needs a capital at the end",
    "When you copy a sentence, what should you do first?|read the whole sentence|write the last word|close your eyes",
    "After copying, you should...|check it against the original|throw it away|add extra words",
    "Zoe copied <b>look at the bird!</b> What is wrong?|It needs a capital L|It needs a question mark|It needs a comma at the end"],
    ["Compare the copy to what it should be, one word at a time.", "Check the capital letter, every word, and the end mark. A good copy is exactly the same as the original.", "Example: the board says <b>Run fast.</b> A child wrote <b>run fast.</b> The capital R is missing. Now do yours."],
    [["Copying", "📋", "When you copy, you write exactly what you see: the same words, capitals and marks."], ["Check", "🔍", "Read your copy slowly and compare it to the original. Point to each word."], ["Fix", "✏️", "If you find a mistake, erase it neatly and fix it."]]);
  const A15 = mk("Titles and dates", "📝", [
    "Where does a title go on your page?|at the top|at the bottom|on the back",
    "What does a heading tell you?|what the writing is about|how many pages there are|the pencil's color",
    "What is wrong with the title <b>my pet cat</b>?|The main words need capital letters|It needs a question mark|Nothing is wrong",
    "What is wrong with the title <b>Our Trip to the Zoo</b>?|Nothing is wrong|It needs a period at the end|It needs to be all small",
    "A title is often written...|in the middle of the top line|in the bottom right corner|in the margin",
    "Underlining a title helps it...|stand out|disappear|get lost",
    "Which can make a title stand out?|bigger letters|tiny letters|invisible ink",
    "What is wrong with the date <b>april 9, 2025</b>?|April needs a capital A|It needs a question mark|Nothing is wrong",
    "What is wrong with the date <b>June 3 2025</b>?|It needs a comma between the day and the year|It needs a capital J|Nothing is wrong"
],
    ["Think about what the reader sees first on a page.", "A title sits at the top, uses capital letters on its main words, and may be bigger or underlined.", "Example: <b>The Big Red Barn</b> is a neat title with capitals on the main words. Now do yours."],
    [["Titles", "📝", "A <b>title</b> tells the reader what the writing is about. It goes at the top."], ["Capitals", "A b C", "Start the main words of a title with a capital letter."], ["Dates", "📅", "Write the date with a capital month and a comma: <b>May 6, 2025</b>."]]);
  const A16 = countMk("Count the letters", "🔡", ["cat", "pencil", "table", "sun", "paper", "window", "apple", "garden", "tree", "yellow", "monkey", "rabbit", "house", "dolphin", "book"],
    w => `How many letters are in the word <b>${w}</b>?`, () => true, "road", "In <b>road</b> there are r, o, a and d, so that is 4 letters.",
    [["Count the letters", "🔡", "Words are made of letters. Count them one at a time from left to right."], ["Touch and count", "☝️", "Touch each letter with your finger and say the numbers: one, two, three..."], ["Tip", "💡", "Do not skip the small letters. Every letter counts."]]);
  const A17 = mk("Turn it upside down", "🙃", [
    "Spin the letter <b>p</b> all the way around (upside down). Which letter do you get?|d|b|q",
    "Spin the letter <b>b</b> all the way around (upside down). Which letter do you get?|q|p|d",
    "Spin the letter <b>n</b> all the way around (upside down). Which letter do you get?|u|m|h",
    "Spin the letter <b>m</b> all the way around (upside down). Which letter do you get?|w|u|n",
    "Spin the letter <b>u</b> all the way around (upside down). Which letter do you get?|n|m|h",
    "Spin the letter <b>d</b> all the way around (upside down). Which letter do you get?|p|b|q",
    "Spin the letter <b>w</b> all the way around (upside down). Which letter do you get?|m|n|u",
    "Which letter looks the same upside down?|o|b|p",
    "Which letter looks the same upside down?|s|b|q",
    "Which letter looks the same upside down?|x|d|b"],
    ["Imagine turning your paper so the bottom becomes the top.", "When you spin a letter all the way around, the tall part and the tail swap places, and left becomes right.", "Example: <b>q</b> spun around becomes <b>b</b>. Its tail goes up and becomes a tall stick. Now do yours."],
    [["Spin it", "🙃", "Some letters turn into other letters when you flip them upside down."], ["Pairs", "p d  b q  n u  m w", "<b>p</b> and <b>d</b> are partners. So are <b>b</b> and <b>q</b>, <b>n</b> and <b>u</b>, <b>m</b> and <b>w</b>."], ["Careful", "⚠️", "This is why writers must make letters in the right way: a flipped letter can become a different letter."]]);
  const A18 = mk("Writing tools", "🖍️", [
    "The black stuff inside a pencil is called...|graphite|ink|wax",
    "Which tool lets you fix mistakes easily?|a pencil|a permanent marker|a paintbrush",
    "A crayon is made mostly of...|wax|metal|glass",
    "What does an eraser do?|rubs out pencil marks|sharpens a pencil|makes ink",
    "A pencil with a blunt, flat point should be...|sharpened|eaten|painted",
    "Which part of a pencil rubs out mistakes?|the eraser|the point|the paint",
    "The outside of most pencils is made of...|wood|glass|rubber",
    "Which tool is best for writing on a whiteboard?|a dry-erase marker|a crayon|a pencil"],
    ["Think about what each tool is made for.", "Pencils are for writing you can fix. Markers are bold. Crayons are waxy and soft. An eraser rubs out pencil.", "Example: to write on a chalkboard you use chalk, not a crayon. Now do yours."],
    [["Pencils", "✏️", "A pencil writes with <b>graphite</b>. It is not really lead. You can erase it."], ["Other tools", "🖍️ 🖊️", "Crayons are made of wax. Pens and markers use ink."], ["Pick the right one", "💡", "Use a sharp pencil for neat school writing and a marker for bold signs."]]);
  const L4 = [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18];

  // =============== LEVEL 5 ===============
  const RF = "Round letters in cursive are a, c, d, g, o and q. Which of these is NOT one?";
  const B1 = mk("Cursive round letters", "🌀", [
    RF + "|l|a|c", RF + "|h|d|g", RF + "|t|o|q", RF + "|k|a|o", RF + "|b|c|d", RF + "|i|g|q", RF + "|n|c|o", RF + "|m|d|a"],
    ["Check each letter against the family list. Which one is missing from the list?", "The round family is a, c, d, g, o and q. Any other letter is not in the family.", "Example: is <b>f</b> in the family a, c, d, g, o, q? No. Now do yours."],
    [["The round family", "a c d g o q", "These letters all start with the same round curve, like a small c."], ["Same start", "🌀", "Start each of them with a curve that goes around to the left, then finish the rest of the letter."], ["Practice", "💡", "If you can make a neat round c, the others in the family get easier."]]);
  const B2 = mk("Loops above the line", "🎈", [
    "Which cursive letter has a tall loop above the line?|l|a|o", "Which cursive letter has a tall loop above the line?|h|c|n",
    "Which cursive letter has a tall loop above the line?|k|u|m", "Which cursive letter has a tall loop above the line?|b|a|o",
    "Which cursive letter has a tall loop above the line?|f|n|u",
    "Which cursive letter does NOT have a tall loop?|a|l|h", "Which cursive letter does NOT have a tall loop?|o|k|b",
    "Which cursive letter does NOT have a tall loop?|m|b|l", "Which cursive letter does NOT have a tall loop?|c|f|h", "Which cursive letter does NOT have a tall loop?|u|h|k"],
    ["Think about which letters are tall. Only tall letters can have a tall loop.", "The tall loop letters are l, h, k, b and f. Small letters like a, c, o, m, n and u have no tall loop.", "Example: <b>e</b> is a small letter with a tiny loop, not a tall one. <b>l</b> has a tall loop. Now do yours."],
    [["Tall loops", "l h k b f", "These cursive letters have a tall loop that goes up to the top line."], ["Ascenders", "⬆️", "The tall part of a letter is called the <b>ascender</b>."], ["Loop tip", "💡", "Make loops narrow and slanted, like a balloon on a string."]]);
  const B3 = mk("Loops below the line", "🪂", [
    "Which cursive letter has a loop that hangs below the line?|g|a|c", "Which cursive letter has a loop that hangs below the line?|j|i|u",
    "Which cursive letter has a loop that hangs below the line?|y|v|w",
    "Which cursive letter does NOT hang below the line?|a|g|j", "Which cursive letter does NOT hang below the line?|c|y|g",
    "Which cursive letter does NOT hang below the line?|o|j|y", "Which cursive letter does NOT hang below the line?|m|g|y",
    "Which cursive letter does NOT hang below the line?|n|j|g", "Which cursive letter does NOT hang below the line?|e|y|j",
    "The part of a letter that hangs below the line is called the...|descender|ascender|margin"],
    ["Picture the letter. Does any part go down past the bottom line?", "The letters g, j and y have loops that hang below the line. These parts are called descenders.", "Example: <b>p</b> in print has a stick that goes below the line. That is a descender. Now do yours."],
    [["Descenders", "g j y", "These letters go <b>below</b> the bottom line. Their hanging part is called a <b>descender</b>."], ["Loops", "🪂", "In cursive, the descender makes a loop and comes back up to join the next letter."], ["Keep it neat", "💡", "Make the loop go as far below as the tall letters go above."]]);
  const B4 = mk("Cursive joins", "🔗", [
    "Cursive joins connect letters at the...|bottom line|top of the page|margin",
    "Do you join letters inside a word in cursive?|yes|no|only vowels",
    "Do you join the last letter of one word to the first letter of the next?|no|yes|yes, always",
    "A good space between words is about as wide as...|a small letter o|a whole page|a pencil",
    "What makes cursive faster than print?|fewer pencil lifts|bigger paper|a louder pencil",
    "Why should joins be smooth?|so the word is easy to read|so the pencil is heavy|so the paper is red",
    "In cursive, the pencil stays on the paper...|through a word|never|only for dots"],
    ["Think about how a word flows. Where does the pencil go between letters?", "Joins connect one letter to the next, usually at the bottom line. At the end of the word, lift and leave a space.", "Example: in <b>sun</b>, s joins u, and u joins n. Then you lift the pencil. Now do yours."],
    [["Joins", "🔗", "A <b>join</b> is the small stroke that connects two letters."], ["One word, one flow", "🌊", "Write a whole word without lifting the pencil, then add dots and crosses."], ["Space between words", "↔️", "Leave a gap about as wide as a small o."]]);
  const B5 = mk("Dots and crosses last", "🎯", [
    "When do you add the dot on i and the cross on t in cursive?|after finishing the word|before starting the word|never",
    "Where does the dot on an i go?|right above the letter|far across the page|under the line",
    "A crossbar on a t is a short line...|across the tall line|below the baseline|in the margin",
    "Why wait until the word is done?|so you do not break the flow of the word|so the pencil rests|so the page gets wet",
    "The dot on a j goes...|above the letter|below the line|in the margin",
    "Which letters need a dot?|i and j|a and o|l and k",
    "Which letter needs a crossbar?|t|l|o",
    "What shape is the dot on an i?|a small round dot|a big star|a heart"],
    ["Think about when a word is finished. Then think about what is left to add.", "Finish the whole word first. Then go back and add dots and crosses.", "Example: write <b>kit</b> all in one flow, lift your pencil, then dot the i and cross the t. Now do yours."],
    [["Finish first", "✅", "Write the whole word without stopping. Then add the extras."], ["Dots", "i j", "The letters <b>i</b> and <b>j</b> each get a small dot right above them."], ["Crosses", "t", "The <b>t</b> gets a short crossbar over its tall line."]]);
  const B6 = mk("Capital letters for names", "👑", [
    "Cursive capital letters are...|bigger than small letters|tiny|invisible",
    "Names of people start with a...|capital letter|number|picture",
    "What does <b>paris</b> (the city) need?|a capital P|a question mark|nothing",
    "What does <b>africa</b> need?|a capital A|a question mark|nothing",
    "What does <b>canada</b> need?|a capital C|a comma|nothing",
    "What does the name <b>emma</b> need?|a capital E|a period|nothing",
    "What does <b>ohio</b> (a state) need?|a capital O|a question mark|nothing",
    "What does <b>mr. lee</b> need?|capital letters on Mr. and Lee|a question mark|nothing",
    "What does the pet name <b>buddy</b> need?|a capital B|a comma|nothing"
],
    ["Names and places are special. How should their first letter look?", "The first letter of a name or a place is a capital. The rest of the letters are small.", "Example: <b>london</b> should be written <b>London</b>. Now do yours."],
    [["Capitals", "A B C", "A capital letter is big. It sits on the bottom line and reaches the top line."], ["Special names", "👑", "People, pets, cities, states and countries all start with a capital."], ["Tip", "💡", "Only the first letter is big. The rest are small, even in cursive."]]);
  const B7 = mk("Same slant", "📐", [
    "Letters in cursive usually lean to the...|right|left|bottom",
    "Letters in a word should all lean the...|same way|different ways|opposite way",
    "To keep a steady slant, you can use...|slanted guide lines|a round ruler|a blindfold",
    "If some letters lean right and some left, the writing looks...|messy|neat|silent",
    "Straight-up letters are called...|upright|slanted|round",
    "Which direction do many cursive letters lean?|to the right|to the left|upside down",
    "Slanted letters should all have the same...|angle|color|name",
    "Even slant makes writing look...|smooth and neat|crooked|invisible"],
    ["Picture a row of letters. Do they all tilt the same way, like trees in the wind?", "Choose one slant and keep every letter at that same lean. Slant lines on your page can help.", "Example: a student drew slanted lines on her paper and kept her tall strokes parallel to them. Now do yours."],
    [["Slant", "📐", "The <b>slant</b> is how much your letters lean. In cursive they lean a little to the right."], ["Be steady", "🌳", "Make all your tall lines lean the same way, like trees in the wind."], ["Guide lines", "💡", "Slanted guide lines under your paper help you keep a steady lean."]]);
  const B8 = countMk("Tall and tail letters", "🔍", ["happy", "bubble", "jelly", "kitten", "yellow", "puppy", "finger", "hungry", "flying", "garden", "kettle", "pickle", "blanket", "jumping", "paddle", "giggle", "hobby", "kangaroo"],
    w => `Tall letters are b, d, f, h, k, l. Tail letters are g, j, p, q, y. How many tall letters and tail letters are in <b>${w}</b> altogether?`,
    c => "bdfhklgjpqy".includes(c), "plenty", "<b>plenty</b> has p (tail), l (tall) and y (tail), and e, n, t are not in the group, so that is 3.",
    [["Tall and tail", "b d f h k l  g j p q y", "Tall letters go up. Tail letters hang down. Together they are the letters that do not stay in the small middle zone."], ["Count them", "☝️", "Go letter by letter. Count only letters that are in the two groups."], ["Tip", "💡", "Say the group letters to yourself, so you remember them."]]);
  const B9 = mk("A friendly letter", "💌", [
    "The first line of a letter, like <b>Dear Sam,</b> is the...|greeting|closing|body",
    "Words like <b>Your friend,</b> are the...|closing|greeting|date",
    "The main part of a letter is called the...|body|head|foot",
    "Where does the date go in a friendly letter?|at the top|at the bottom|in the middle of the body",
    "Which part comes last in a letter?|the signature|the greeting|the date",
    "After <b>Dear Sam</b> you put a...|comma|period|question mark",
    "After the closing <b>Your friend</b> you put a...|comma|period|exclamation mark",
    "What is wrong with the closing <b>your friend,</b>?|Your needs a capital Y|It needs a period|Nothing is wrong"
],
    ["A letter has parts in a special order. Where does this part go?", "The order is: date, greeting, body, closing, signature.", "Example: <b>Dear Mia,</b> is the greeting, and it is followed by the body of the letter. Now do yours."],
    [["Parts of a letter", "💌", "A friendly letter has a <b>date</b>, a <b>greeting</b>, a <b>body</b>, a <b>closing</b> and a <b>signature</b>."], ["Greeting and closing", "💬", "The greeting (<b>Dear Sam,</b>) and the closing (<b>Your friend,</b>) both end with a <b>comma</b>."], ["Neat order", "📋", "Go from top to bottom: date, greeting, body, closing, signature."]]);
  const B10 = mk("Writing an envelope", "✉️", [
    "Where does the stamp go on an envelope?|top right corner|bottom left corner|on the back",
    "Where does the return address (who it is from) go?|top left corner|bottom right corner|in the middle",
    "Where does the address of the person who gets the letter go?|in the middle of the front|top right|on the back",
    "The stamp pays for...|mailing the letter|the paper|the glue",
    "The address tells the mail carrier...|where the letter is going|what is inside|what the weather is",
    "Which is the best way to write an address?|clearly in neat print|tiny and squished|in fancy swirls",
    "Why write addresses clearly?|so the letter gets to the right place|so the envelope looks fancy|so it weighs more",
    "Before you seal the envelope, you should...|put the letter inside|draw on the stamp|eat the glue"],
    ["Picture the front of an envelope. Where is each thing?", "Return address top left, stamp top right, and the address of the person getting the letter in the middle.", "Example: the stamp is always in the top right corner so machines can find it. Now do yours."],
    [["Three places", "✉️", "The <b>return address</b> goes top left. The <b>stamp</b> goes top right. The <b>delivery address</b> goes in the middle."], ["Write clearly", "✍️", "Use neat print and big enough letters so every word can be read."], ["Check", "🔍", "Read the address again before you send the letter."]]);
  const B11 = mk("Writing a paragraph", "📃", [
    "The first line of a paragraph is usually...|indented|blank|crossed out",
    "A paragraph is a group of sentences about...|one idea|a hundred ideas|nothing",
    "Each sentence in a paragraph starts with a...|capital letter|number|picture",
    "Each sentence ends with...|an end mark|a drawing|a stamp",
    "When you start a new paragraph, you go to a...|new line|new page|different pen",
    "Spaces between words in a paragraph should be...|even|huge|zero",
    "How many main ideas does a paragraph have?|one|ten|none"],
    ["A paragraph holds sentences that go together. How are they set out?", "Indent the first line, write sentences with capitals and end marks, and keep to one main idea.", "Example: a paragraph about dogs does not suddenly talk about bikes. Now do yours."],
    [["Paragraph", "📃", "A <b>paragraph</b> is a group of sentences about one idea."], ["Indent", "➡️", "Start the first line a little way in from the margin."], ["Neat sentences", "✅", "Use capitals, end marks and even spaces between words."]]);
  const B12 = mk("Commas and lists", "🧺", [
    "Where do the commas go in this sentence?<br><b>I like red blue and green.</b>|after red and after blue|after I and after like|only at the very start",
    "Where do the commas go in this sentence?<br><b>We bought apples pears and plums.</b>|after apples and after pears|after We and after bought|only at the very start",
    "Where do the commas go in this sentence?<br><b>Mia Sam and Jo went to the park.</b>|after Mia and after Sam|after went and after to|only after park",
    "Where do the commas go in this sentence?<br><b>I packed a hat a coat and boots.</b>|after hat and after coat|after I and after packed|only after boots",
    "Where does the comma go in the date <b>June 3 2025</b>?|between 3 and 2025|before June|after 2025",
    "What goes right after the name in the greeting <b>Dear Tom</b>?|a comma|a period|a question mark",
    "A comma helps the reader take a...|small pause|nap|long trip",
    "In a list, commas go between...|the items|the letters|the pages"
],
    ["Look for where the reader should pause. A comma shows that pause.", "In a list, put a comma between the items. A date has a comma between the day and the year.", "Example: <b>I see a cat, a dog, and a bird.</b> The commas separate the three animals. Now do yours."],
    [["Commas", ",", "A <b>comma</b> is a small curved mark that sits on the line and tails below it."], ["In lists", "🧺", "Put a comma between the things in a list: <b>pens, pencils, and paper</b>."], ["In dates and greetings", "📅", "Write <b>May 4, 2025</b> and <b>Dear Jo,</b>."]]);
  const B13 = mk("Apostrophes", "✂️", [
    "Which letter does the apostrophe replace in <b>don't</b> (do not)?|o|n|t",
    "Which letter does the apostrophe replace in <b>isn't</b> (is not)?|o|s|t",
    "Which letter does the apostrophe replace in <b>I'm</b> (I am)?|a|m|I",
    "Which letter does the apostrophe replace in <b>we're</b> (we are)?|a|r|e",
    "Which letter does the apostrophe replace in <b>she's</b> (she is)?|i|s|h",
    "Which letter does the apostrophe replace in <b>didn't</b> (did not)?|o|d|t",
    "An apostrophe sits...|high up near the top of the letters|on the line like a period|below the line like a comma",
    "The apostrophe in <b>don't</b> shows that a letter is...|missing|extra|upside down",
    "A contraction is two words squeezed into...|one word|three words|a number"
],
    ["Think about which letter is left out when two words are squeezed together.", "An apostrophe sits high up, in the place of the missing letter.", "Example: <b>it is</b> becomes <b>it's</b>. The apostrophe replaces the letter i. Now do yours."],
    [["Apostrophe", "'", "An <b>apostrophe</b> looks like a tiny comma that sits up high."], ["Contractions", "✂️", "A contraction squeezes two words into one (<b>do not</b> becomes <b>don't</b>). The apostrophe takes the place of the missing letters."], ["Write it high", "💡", "Make the apostrophe at the top of the letters, not on the line."]]);
  const B14 = mk("Quotation marks", "💬", [
    "Which words need quotation marks?<br><b>Mom said come here.</b>|come here|Mom said|said come",
    "Which words need quotation marks?<br><b>Jo asked can I play?</b>|can I play|Jo asked|asked can",
    "Which words need quotation marks?<br><b>The teacher said great job!</b>|great job|The teacher said|teacher said",
    "Which words need quotation marks?<br><b>Ben yelled look out!</b>|look out|Ben yelled|yelled look",
    "Which words need quotation marks?<br><b>Dad said time for bed.</b>|time for bed|Dad said|said time",
    "Quotation marks show...|the exact words someone says|the end of the page|a new paragraph",
    "Quotation marks come in a...|pair|group of ten|single only",
    "After <b>said</b> in a sentence like Sam said, “Hi.” comes a...|comma|colon|star"
],
    ["Which words did the person say out loud? Those go inside the marks.", "Put a pair of quotation marks around the spoken words, and a comma after the word said.", "Example: <b>Lily said, “I won!”</b> The marks wrap around I won. Now do yours."],
    [["Quotation marks", "“ ”", "<b>Quotation marks</b> go around the exact words that someone says."], ["A pair", "💬", "You need one at the start of the spoken words and one at the end."], ["Comma", "💡", "Write a comma after <b>said</b>: <b>Mia said, “Hello!”</b>"]]);
  const B15 = mk("Lists and labels", "🏷️", [
    "A list is easier to read if each item is on its...|own line|same line|different page",
    "Labels should be...|big and clear|tiny and curly|invisible",
    "Which is best for a label on a box?|neat capital letters in print|tiny messy cursive|blurry scribbles",
    "A shopping list uses...|short words|a long story|a poem",
    "Items in a list often start with a...|bullet or number|picture of a bear|nothing",
    "Which is the best way to number a list?|1, 2, 3|3, 1, 5|a, 1, ?",
    "A label tells what something...|is|costs a million|dreams",
    "Why make labels dark and big?|so they are easy to see|so they hide|so they are heavy"],
    ["Think about who will read your list or label. What do they need?", "Lists need one item per line. Labels need big, clear, neat letters.", "Example: a label on a jar says <b>RICE</b> in big print so you can read it from across the room. Now do yours."],
    [["Lists", "📋", "A list puts each item on its own line. You can use numbers or bullets."], ["Labels", "🏷️", "A <b>label</b> tells what something is. Use big, clear print."], ["Easy to read", "👀", "Leave space between items and keep letters the same size."]]);
  const B16 = mk("Left and right hands", "🤝", [
    "To avoid smudges, left-handed writers can use a pen or pencil that...|dries fast|never dries|is wet",
    "Is it OK to be left-handed?|yes, it is totally fine|no|only on Sundays",
    "About how many people are left-handed?|about 1 in 10|almost everyone|nobody",
    "A left-handed child should have room to move their...|elbow|knee|ear",
    "Right-handers write English from left to right. Left-handers write English from...|left to right too|right to left|bottom to top",
    "Left-handed writers can hold the pencil a bit higher up so they can...|see what they write|fly|hear better",
    "Both left-handed and right-handed children can have...|beautiful handwriting|only messy writing|no handwriting",
    "A left-handed writer's hand can smudge pencil because it moves...|over what was just written|in the air|to the side"],
    ["Think kindly: being left-handed is just a different way of writing.", "Left-handers and right-handers both write left to right. Lefties may hold the pencil a little higher and tilt the paper so they can see.", "Example: a left-handed girl used a quick-dry pen and the smudges went away. Now do yours."],
    [["All hands are great", "🤝", "Some people write with the left hand and some with the right. Both are fine."], ["Same direction", "➡️", "In English, everyone writes from left to right."], ["Left-handed tips", "💡", "Tilt the paper, hold the pencil a bit higher, and use fast-drying ink."]]);
  const B17 = mk("Fix messy writing", "🛠️", [
    "Your letters look too tiny and crowded. Try...|writing a little bigger|writing smaller|writing faster",
    "Your word spaces are too small. Use...|a finger space|no space|two pages",
    "Your letters do not sit on the line. Try...|slowing down and aiming for the line|writing in the air|using no lines",
    "Your round letters are open, like a u instead of an a. Fix it by...|closing the round shape|leaving it open|adding a tail",
    "Your tall letters are as short as your small ones. Fix it by...|reaching up to the top line|making everything tiny|making all letters tails",
    "Your letters wobble. Try...|relaxing your grip|squeezing harder|tapping the pencil",
    "Your d looks like a b. Fix it by...|checking which side the tall line is on|ignoring it|flipping the page",
    "Your tails do not go below the line. Fix it by...|letting g, j, p, q and y drop below the line|cutting the tails off|writing them above the line"],
    ["Find the problem first. What looks wrong?", "Fix one thing at a time: size, spacing, sitting on the line, and shape.", "Example: if your words touch each other, leave a finger space between them. Now do yours."],
    [["Be a detective", "🔍", "Look at your writing. Is it too small, crowded, or crooked?"], ["Fix one thing", "🛠️", "Pick one problem and fix it on the next line you write."], ["Improve", "📈", "Every time you fix a problem, your writing gets better."]]);
  const B18 = mk("Hand warm-ups", "🤲", [
    "Before writing a lot, you can stretch your...|fingers and hand|ears|knees",
    "A good warm-up pattern is drawing...|loops and waves|nothing|a car",
    "If your hand is tired, you should...|take a short break|squeeze tighter|write faster",
    "Shaking your hands out helps them...|relax|freeze|grow",
    "Drawing ovals in the air helps loosen your...|wrist|toes|hair",
    "Which is a good writing warm-up?|drawing circles on scrap paper|running a race|sleeping",
    "How often should you rest when writing for a long time?|every so often|never|only at midnight",
    "Relaxed hands make writing...|smoother|spikier|louder"],
    ["Think about how athletes stretch before a game. Writers stretch too.", "Gentle stretches and easy patterns get your hand ready and help you avoid soreness.", "Example: a writer made ten loops on scrap paper before starting her story. Now do yours."],
    [["Warm up", "🤲", "Stretch your fingers wide, then make a loose fist. Repeat a few times."], ["Easy patterns", "〰️", "Draw waves, loops and circles on scrap paper."], ["Rest", "☕", "If your hand feels sore, take a short break."]]);
  const L5 = [B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17, B18];

  // =============== LEVEL 6 ===============
  const C1 = mk("What is calligraphy?", "🖋️", [
    "Calligraphy means...|beautiful writing|fast writing|quiet writing",
    "Calligraphy is the art of making...|letters look beautiful|bridges|pizza",
    "A calligrapher is a person who...|does calligraphy|bakes bread|drives a bus",
    "Which is a calligraphy tool?|a broad-edge pen|a hammer|a bicycle",
    "Calligraphy is often used on...|invitations and certificates|tires|mountains",
    "Calligraphy takes...|practice and patience|no practice|a robot",
    "Is calligraphy more about speed or beauty?|beauty and care|speed|noise",
    "Different looks of calligraphy letters are called...|styles|animals|colors"],
    ["Think about the two parts of the word: one is about beauty, one is about writing.", "Calligraphy is slow, careful, artistic writing. People make letters look beautiful.", "Example: a calligrapher takes a long time to make one beautiful word on a card. Now do yours."],
    [["Calligraphy", "🖋️", "<b>Calligraphy</b> means <b>beautiful writing</b>. It comes from old Greek words for beauty and writing."], ["Where you see it", "🎉", "Invitations, certificates, signs and cards often use calligraphy."], ["How to do it", "💡", "Go slowly, keep a steady hand and care about every stroke."]]);
  const C2 = mk("Letter parts", "🔠", [
    "The line your letters sit on is called the...|baseline|skyline|sideline",
    "The ascender of a letter is the part that...|goes up above the small letters|drops below the line|is the dot",
    "The descender of a letter is the part that...|drops below the baseline|rises above the small letters|is the dot",
    "Which letter has an ascender?|h|a|e", "Which letter has a descender?|y|a|o",
    "The x-height is the height of...|small letters like x, a and o|tall letters only|the whole page",
    "Which letter has no ascender and no descender?|o|b|g",
    "Which letter has no ascender and no descender?|e|d|p",
    "Which letter has no ascender and no descender?|a|k|q",
    "Which letter has a descender?|g|e|c"],
    ["Think about where in the line the part of the letter sits.", "Ascenders go up, descenders go down, and small letters stay at x-height between the lines.", "Example: <b>b</b> has an ascender, <b>p</b> has a descender, and <b>x</b> has neither. Now do yours."],
    [["Baseline", "📏", "The <b>baseline</b> is the line the letters sit on."], ["Ascender and descender", "⬆️ ⬇️", "An <b>ascender</b> reaches up (b, d, h). A <b>descender</b> hangs down (g, p, y)."], ["x-height", "x", "The <b>x-height</b> is how tall small letters like x, a and o are."]]);
  const C3 = mk("Pen nibs and angle", "🖊️", [
    "A broad-edge pen has a nib that is...|flat and wide|round and tiny|pointed like a needle",
    "For italic calligraphy, you hold the nib at about...|45 degrees|90 degrees|180 degrees",
    "The nib is the part of the pen that...|touches the paper|you hold|is the cap",
    "A nib that stays at the same angle makes...|even, steady letters|random shapes|no ink",
    "Why keep the nib angle steady?|so every letter has the same thick and thin parts|so the nib breaks|so ink spills",
    "Which pen gives thick and thin lines from one stroke?|a broad-edge nib|a ball of string|a crayon",
    "A fountain pen holds ink in...|a cartridge or converter|a basket|a sock",
    "Old dip pens need to be dipped in...|ink|water|juice"],
    ["Which tool shape and which angle make beautiful letters?", "A broad-edge nib is flat. Hold it at a steady angle, about 45 degrees, to make thick and thin parts.", "Example: if you twist the pen halfway through a letter, the lines change width and look uneven. Now do yours."],
    [["Nibs", "🖊️", "The <b>nib</b> is the tip of a pen. A broad-edge nib is flat and wide."], ["Angle", "📐", "Hold the nib at a steady angle, about 45 degrees for italic writing."], ["Do not twist", "💡", "Do not turn the pen while you make a letter. A steady angle gives even lines."]]);
  const C4 = mk("Thick and thin strokes", "〰️", [
    "With a flexible pointed pen, you press harder on the...|downstroke|upstroke|margin",
    "With a flexible pointed pen, you press lightly on the...|upstroke|downstroke|page edge",
    "A pointed pen makes thin lines when you press...|lightly|very hard|never",
    "Why do calligraphers mix thick and thin lines?|it makes letters look graceful|it saves ink|it makes pens louder",
    "A downstroke goes...|down the page|up the page|across the table",
    "An upstroke goes...|up the page|down the page|under the paper",
    "A thick line next to a thin line is called...|contrast|a margin|a comma",
    "Pressing very hard on a pointed pen can...|spread its tip and blot ink|make it invisible|make it float"],
    ["Think about pressure. Press hard for thick, light for thin.", "In pointed-pen writing, the downstroke is thick and the upstroke is thin.", "Example: in <b>l</b>, the line going down is pressed and thick, and the way back up is thin. Now do yours."],
    [["Thick and thin", "〰️", "Thick and thin lines together make letters look graceful. This is called <b>contrast</b>."], ["Pointed pen", "🖋️", "Press on the <b>down</b> stroke. Go light on the <b>up</b> stroke."], ["Be gentle", "💡", "Do not press too hard. The tip can spread and make blots."]]);
  const C5 = mk("Italic writing", "🅸", [
    "Italic letters lean slightly to the...|right|left|bottom",
    "Italic writing is...|narrow and slightly slanted|round and upright|huge and square",
    "Italic letters are based on the shape of an...|oval|square|triangle",
    "Italic style began in Italy, hundreds of years ago. Which country is that?|Italy|Japan|Chile",
    "Italic writing can be...|quick and clear|impossible to read|only done by robots",
    "Italic letters are often...|narrower than round letters|wider than the page|always upside down",
    "Italic is a style of...|handwriting|swimming|building"],
    ["Think about the name, which sounds like a country.", "Italic letters are narrow ovals that lean a little to the right.", "Example: an italic <b>o</b> is like a narrow egg leaning slightly. Now do yours."],
    [["Italic", "🅸", "<b>Italic</b> writing is slanted and narrow. It began in Italy long ago."], ["Ovals", "🥚", "Italic letters are built from narrow, slanted ovals."], ["Quick and clear", "💡", "Because the letters are narrow, you can write them neatly and fairly quickly."]]);
  const SF = `font-size:42px`;
  const SER = w => `<span style='font-family:Georgia,serif;${SF}'>${w}</span><br>These letters have small feet at the ends of the strokes. This style is...|serif|sans serif|cursive`;
  const SAN = w => `<span style='font-family:Arial,Helvetica,sans-serif;${SF}'>${w}</span><br>These letters have clean ends with no feet. This style is...|sans serif|serif|cursive`;
  const C6 = mk("Serif and sans serif", "🔤", [
    SER("Hat"), SER("Dog"), SER("Sun"), SAN("Cat"), SAN("Pig"), SAN("Bee"),
    "The word <b>sans</b> in sans serif means...|without|with|small",
    "A small foot at the end of a letter stroke is called a...|serif|margin|nib",
    "A <b>font</b> is a...|style of letters|kind of pencil|type of paper"],
    ["Look closely at the ends of the strokes. Do they have little feet or are they clean?", "Serif letters have small feet. Sans serif letters do not (sans means without).", "Example: a letter with tiny feet at the bottom of its stick is a serif letter. Now do yours."],
    [["Serif", "Hat", "<b>Serif</b> letters have small feet at the ends of the strokes."], ["Sans serif", "Hat", "<b>Sans serif</b> means without serifs. The strokes end cleanly."], ["Fonts", "🔤", "A <b>font</b> is a style of letters. Different fonts give writing a different feeling."]]);
  const C7 = mk("Spacing like a pro", "↔️", [
    "A good space between words is about as wide as...|a small letter o|an entire sentence|nothing at all",
    "The space between letters in a word should be...|even|random|zero",
    "Too much space between words makes a line look...|gappy|neat|tiny",
    "Too little space between words makes them...|run together|disappear|move",
    "A good tip is to use a pencil or finger to...|measure the space|poke the page|tickle the paper",
    "Spacing in a word should look...|steady and even|jumbled|random",
    "Why does spacing matter?|so readers can tell where words start and stop|so the paper tears|so ink dries",
    "Letters crammed together are hard to...|read|fold|send"],
    ["Think about how a reader sees where one word ends and the next one begins.", "Keep spaces even. A space about as wide as a small o separates words.", "Example: <b>the cat</b> has a gap that looks like one small o between the words. Now do yours."],
    [["Even spaces", "↔️", "Leave the same amount of space between letters, and a bit more between words."], ["Word space", "o", "Make the gap between words about as wide as a small <b>o</b>."], ["Check", "🔍", "Look at your line from far away. Do the words stand out clearly?"]]);
  const C8 = mk("Early writing", "🏺", [
    "In ancient Egypt, people wrote with picture symbols called...|hieroglyphs|pixels|numbers",
    "Egyptians wrote on a paper-like material made from a reed plant called...|papyrus|cotton|cardboard",
    "In Mesopotamia, people pressed a reed into soft clay to make wedge-shaped marks called...|cuneiform|hieroglyphs|italic",
    "Cuneiform was written on tablets made of...|clay|plastic|glass",
    "A tool pressed into clay to write was called a...|stylus|ballpoint|marker",
    "Ancient Egyptians used pens made from...|reeds|plastic|steel",
    "Writing is more than how old?|5,000 years|100 years|10 years",
    "One early reason for writing was to...|keep records|send text messages|play video games"],
    ["Think about long, long ago, before paper as we know it.", "Early writing used clay tablets and papyrus, with reed pens and styluses.", "Example: Sumerians pressed a reed into clay to write on a tablet. Now do yours."],
    [["Cuneiform", "🏺", "Long ago, people pressed a reed into soft clay and made wedge-shaped marks called <b>cuneiform</b>."], ["Hieroglyphs", "📜", "The ancient Egyptians used picture symbols called <b>hieroglyphs</b>, written on <b>papyrus</b>."], ["Old", "⏳", "Writing is more than 5,000 years old!"]]);
  const C9 = mk("Pens, paper and printing", "🪶", [
    "Paper was invented in ancient...|China|Brazil|Iceland",
    "Long ago, people wrote with a feather pen called a...|quill|ruler|needle",
    "The printing press in Europe is linked to...|Gutenberg|Edison|Columbus",
    "Before printing presses, books were copied...|by hand|by robots|by phone",
    "Typewriters let people write by pressing...|keys|brushes|toes",
    "A quill is made from a...|feather|bone|plastic",
    "A pencil's black center is really...|graphite|lead metal|silver",
    "Old dip pens needed to be dipped in...|ink|milk|water only"],
    ["Think about how writing tools changed over time.", "People moved from reeds and quills, to dip pens, pencils and typewriters. Paper came from China, and the printing press let books be made faster.", "Example: a monk copied a book by hand with a quill because there was no printing press. Now do yours."],
    [["Tools", "🪶", "People wrote with reeds, then <b>quills</b> made from feathers, then metal-tipped pens and pencils."], ["Paper", "📄", "Paper was first made in ancient <b>China</b>."], ["Printing", "📚", "Gutenberg's printing press helped make many copies of books quickly."]]);
  const C10 = mk("Pattern practice", "🌊", [
    "Rows of upright pushes and pulls help you practice...|straight strokes|swimming|cooking",
    "Making ovals and loops helps your cursive letters become...|smooth|spiky|huge",
    "Practice patterns should be...|repeated neatly|fast and messy|done once",
    "When doing a pattern, keep every shape the same...|size and spacing|color|name",
    "Why do writers practice patterns?|to train the hand to make smooth strokes|to make paper wet|to waste pencils",
    "Which pattern helps you practice cursive m and n?|arches|circles|stars",
    "Which pattern helps you practice o and a?|ovals|zigzags|stripes",
    "Which pattern helps you practice u and y?|cups (valleys)|arches|squares"],
    ["Which pattern looks like the shape of the letter?", "Patterns are practice. Repeat them slowly and neatly, matching size and spacing.", "Example: arches in a row look like the humps of m and n. Now do yours."],
    [["Patterns", "🌊", "Patterns like ovals, waves and loops train your hand."], ["Match the letter", "m n  o a  u y", "Arches help <b>m</b> and <b>n</b>. Ovals help <b>o</b> and <b>a</b>. Cups help <b>u</b> and <b>y</b>."], ["Neat repeat", "🔁", "Repeat each pattern across the line with the same size and spacing."]]);
  const C11 = mk("Your signature", "🖊️", [
    "A signature is...|your name written in your own style|a drawing of a cat|a secret code",
    "A signature shows that something is...|from you|free|broken",
    "You should sign a letter at the...|end|beginning|middle",
    "A good place to sign a birthday card is...|at the end, after your message|before the greeting|on the stamp",
    "A signature should be...|clear enough to be you|a random doodle|blank",
    "Where does a signature go in a friendly letter?|below the closing|above the date|beside the stamp",
    "A signature often starts with a...|capital letter|number|picture"],
    ["Think about what a signature is for.", "A signature is your name, written your own way. It goes at the end of a letter or card, below the closing.", "Example: a card says <b>Your friend,</b> and the writer signs underneath. Now do yours."],
    [["Signature", "🖊️", "Your <b>signature</b> is your name written in your own style."], ["Where", "📍", "It goes at the end of a card or letter, below the closing."], ["Practice", "💡", "Practice writing it smoothly and clearly. Keep it on paper for school and family, not in public places."]]);
  const C12 = mk("Proofreading by hand", "🔍", [
    "Proofreading means...|checking your work for mistakes|throwing it away|writing bigger",
    "A caret (^) is used to...|add a missing word|erase everything|make bold",
    "To fix a mistake, you can...|draw a line through it and write the correction neatly|scribble until the page is black|tear the page",
    "Why read your work slowly?|you catch mistakes|you lose your pencil|the paper moves",
    "When should you proofread?|after you finish writing|before you start|never",
    "Which is something to check?|spacing and spelling|tire pressure|the weather",
    "A pencil is good for proofreading because...|you can change it|it is invisible|it is loud",
    "You read your work and two letters look the same. You should...|make them clearer|ignore it|erase the page"],
    ["A proofreader is like a detective looking for small mistakes.", "Read slowly after you finish. Check capitals, spaces, spelling and end marks.", "Example: she found a missing word, so she wrote a caret and added it neatly above the line. Now do yours."],
    [["Proofreading", "🔍", "After writing, read your work again to find and fix mistakes."], ["What to check", "✅", "Capital letters, end marks, spelling, spacing and letter shapes."], ["Fix neatly", "✏️", "Draw a single line through a mistake and write the fix next to it, or use a caret ^ to add a missing word."]]);
  const C13 = mk("Comfortable writing", "🪑", [
    "When you write, sit with your feet...|flat on the floor|up on the desk|in the air",
    "Your back should be...|straight and supported|curled over the desk|leaning back on two chair legs",
    "Your paper should be...|within easy reach|across the room|under the desk",
    "Good light helps you see...|your writing clearly|the stars|nothing",
    "Take a break after...|a long stretch of writing|one letter|never",
    "Squeezing your pencil too hard can cause...|a sore hand|a sore ear|a rash on your knee",
    "The top of your desk should be about at...|elbow height|your ankles|the ceiling",
    "A relaxed grip means holding the pencil...|lightly|with all your strength|with your teeth"],
    ["Think about a body that is comfortable and not tense.", "Sit up, feet flat, paper close, good light, and a relaxed grip. Take breaks.", "Example: a girl moved her chair closer to the desk and her back stopped hurting. Now do yours."],
    [["Sit well", "🪑", "Sit up straight with your feet flat on the floor."], ["Light and reach", "💡", "Have good light, and keep your paper within easy reach."], ["Breaks", "☕", "Stretch your hand and rest it when you write for a long time."]]);
  const C14 = mk("Handwriting and typing", "⌨️", [
    "Which one uses a keyboard?|typing|handwriting|colouring",
    "Which one uses a pencil or pen?|handwriting|typing|texting",
    "A signature is written...|by hand|on a keyboard|with a printer",
    "Which helps you practise forming letters with your fingers?|handwriting|using a mouse|watching TV",
    "Typing is useful for...|writing long things quickly|drawing with crayons|learning cursive",
    "Handwriting is useful because...|you can write anywhere with a pencil|it needs electricity|it needs wifi",
    "Writing notes in your own words helps you...|remember|forget|sleep",
    "Both handwriting and typing are good skills to...|have|avoid|forget"],
    ["What tools does each use? A pencil, or a keyboard?", "Both skills matter. Handwriting needs no power, and typing is fast for long writing.", "Example: she wrote a short card by hand, and typed a long report on a computer. Now do yours."],
    [["Two skills", "✏️ ⌨️", "Handwriting uses a pen or pencil. Typing uses a keyboard. Both are useful."], ["By hand", "📝", "Cards, notes, labels and signatures are often written by hand."], ["Keyboard", "💻", "Long reports are often typed because it is quick."]]);
  const C15 = mk("Abbreviations", "✂️", [
    "<b>Mr.</b> is short for...|Mister|Missus|Mistake",
    "<b>Dr.</b> is short for...|Doctor|Door|Dream",
    "<b>St.</b> on a sign often means...|Street|Stove|Sit",
    "<b>Mon.</b> is short for...|Monday|Money|Monkey",
    "<b>Jan.</b> is short for...|January|June|July",
    "<b>Wed.</b> is short for...|Wednesday|Weekend|Window",
    "<b>Feb.</b> is short for...|February|Friday|Feast",
    "An abbreviation is...|a short way to write a word|a long word|a picture",
    "Many abbreviations end with a...|period|question mark|star"],
    ["Say the full word out loud. Which short form comes from its start?", "An abbreviation shortens a word, often with the first letters and a period.", "Example: <b>Tues.</b> is short for <b>Tuesday</b>. Now do yours."],
    [["Abbreviations", "✂️", "An <b>abbreviation</b> is a short way to write a word, like <b>Mr.</b>, <b>Dr.</b> or <b>St.</b> It often ends with a period."], ["Examples", "📅", "<b>Mon.</b> = Monday, <b>Jan.</b> = January, <b>Dr.</b> = Doctor."], ["Capitals", "A b C", "If the full word starts with a capital, so does the short form."]]);
  const C16 = mk("Ink care", "🫗", [
    "To avoid smudges, you should wait for ink to...|dry|swim|rise",
    "A left-handed writer who smudges can try a pen that...|dries quickly|is empty|is dripping",
    "Put the cap back on your pen so it does not...|dry out|run away|fly",
    "A leaking pen should be...|kept away from your work and shown to an adult|shaken harder|put in your mouth",
    "To clean ink off your fingers, use...|soap and water|paint|ice cream",
    "Blotting paper is used to...|soak up extra ink|write on|cut paper",
    "Cartridge pens use ink from a small...|cartridge|toaster|tire",
    "Keep ink bottles...|closed when you are not using them|open|upside down"],
    ["Think about ink. It is wet. What do you do about that?", "Let ink dry, cap pens, keep bottles closed and wash up with soap and water.", "Example: she blotted the page, and the extra ink soaked up into the blotting paper. Now do yours."],
    [["Ink", "🫗", "Ink is wet when you write. Wait until it dries so it does not smudge."], ["Caps", "🧢", "Put caps back on pens and lids on bottles."], ["Clean up", "🧼", "Wash ink off your hands with soap and water."]]);
  const C17 = mk("Poster lettering", "🪧", [
    "A poster should be readable from...|far away|only an inch|inside a box",
    "Poster letters should be...|big and bold|tiny|faint",
    "Which colour pair is easiest to read?|black on white|yellow on white|light grey on white",
    "Do not put too many words on a poster. Use...|a few clear words|a whole book|nothing",
    "The title on a poster should be the...|biggest writing|smallest writing|hidden writing",
    "Spacing between lines on a poster should be...|even|none|random",
    "Light pencil guide lines first help your letters be...|straight|invisible|bumpy",
    "Print capital letters are good for posters because they are...|clear from far away|tiny|slanted"],
    ["Imagine reading from across the room. What do you need?", "Big, dark, clear letters with good spacing and strong contrast.", "Example: a sign with black letters on a white background is easy to read from far away. Now do yours."],
    [["Big and bold", "🪧", "Poster words need to be large and dark."], ["Contrast", "◼️◻️", "Pick colors that are very different: dark letters on a light background."], ["Plan", "📏", "Draw light guide lines first. Keep the words few and clear."]]);
  const C18 = mk("Fancy lettering", "📜", [
    "An illuminated manuscript is a hand-written book with...|decorated letters and pictures|only plain text|no words",
    "A drop cap is a big decorated letter at the start of...|a paragraph|a pencil|a table",
    "A flourish is...|a swirl added to a letter|a punctuation mark|a tiny font",
    "Fancy writing is best for...|invitations or titles|long stories|math tests",
    "Gold leaf in old books was used to make pages...|shine|spoil|noisy",
    "Why use plain letters for long text?|they are easier to read|they cost more|they fall off",
    "Which would be tiring to read in a long story?|too many curly letters|plain neat letters|clear spacing",
    "Before printing presses, decorated books were made...|by hand|by robots|by phone"],
    ["Think about when fancy lettering helps, and when it makes reading harder.", "Decorated letters and flourishes are lovely for titles and cards. For long text, plain clear letters are better.", "Example: a book's first letter was big and golden, and the rest of the page was plain. Now do yours."],
    [["Decorated letters", "📜", "Long ago, people decorated books by hand with gold, colors and pictures."], ["Flourish and drop cap", "🌿", "A <b>flourish</b> is a swirl. A <b>drop cap</b> is a big first letter."], ["Plain for reading", "👀", "For long writing, clear, plain letters are easiest on the eyes."]]);
  const L6 = [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, C17, C18];

  Object.assign(HAND_LEVELS, {
    4: L4.concat([MIX("Mixed practice", L4[0], L4[1], L4[4], L4[10], L4[13]), MIX("Level 4 Challenge", L4[2], L4[3], L4[6], L4[8], L4[11], L4[16])]),
    5: L5.concat([MIX("Mixed practice", L5[0], L5[3], L5[8], L5[11], L5[12]), MIX("Level 5 Challenge", L5[1], L5[2], L5[5], L5[9], L5[13], L5[16])]),
    6: L6.concat([MIX("Mixed practice", L6[1], L6[2], L6[6], L6[10], L6[13]), MIX("Level 6 Challenge", L6[0], L6[4], L6[7], L6[11], L6[14], L6[16])])
  });
})();
