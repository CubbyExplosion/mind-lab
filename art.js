// Mind Lab Art & Drawing. Levels 1-3 have 20 lessons each (60 lessons).
// Every lesson teaches first (3 slides), then quizzes. Every question has 3 hints
// (nudge, clue, worked example) and never shows the real answer.
// Needs math.js loaded first (uses ri, pick, shuf).

const ART_LEVELS = (() => {
  const S = a => ({ h: a[0], v: a[1], t: a[2] });
  // multiple-choice lesson: items = [question, right answer, [wrong answers], visual?]
  const L = (title, slides, items, hints) => {
    const make = () => { const [q, a, w, v] = pick(items); return { text: q, visual: v, choices: shuf([a, ...w]), answer: a, hints }; };
    make.teach = () => slides.map(S);
    return { title, make };
  };
  const F = (title, slides, fn) => { const make = () => fn(); make.teach = () => slides.map(S); return { title, make }; };
  const MIX = (title, ...ls) => {
    const make = () => pick(ls).make();
    make.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here is a quick reminder of each idea, then the quiz." }, ...ls.slice(0, 4).map(l => l.make.teach()[0])];
    return { title, make };
  };

  // ---------- colors ----------
  const HEX = { red: "#e53935", blue: "#1e88e5", yellow: "#fdd835", green: "#43a047", orange: "#fb8c00", purple: "#8e24aa", pink: "#f48fb1", brown: "#6d4c41", black: "#212121", white: "#fafafa", gray: "#9e9e9e" };
  const sw = (n, cls = "") => `<span class="swatch ${cls}" style="background:${HEX[n]}"></span>`;
  const ALLC = Object.keys(HEX);

  const nameColor = (list) => () => {
    const c = pick(list), wr = shuf(ALLC.filter(x => x !== c)).slice(0, 2);
    return {
      text: "What color is this?", visual: sw(c), choices: shuf([c, ...wr]), answer: c,
      hints: ["Look at the color. Think of something in nature that is the same color.", `The color name starts with the letter "${c[0].toUpperCase()}".`, "Example: the sky on a sunny day is blue, and grass is green. Now name yours."]
    };
  };
  const MIXES = [["red", "yellow", "orange"], ["yellow", "blue", "green"], ["red", "blue", "purple"]];
  const mixQ = () => {
    const [a, b, r] = pick(MIXES), form = ri(0, 2);
    const others = ["red", "yellow", "blue", "green", "orange", "purple", "pink", "brown"].filter(x => x !== r);
    if (form === 0) {
      const wr = shuf(others.filter(x => x !== a && x !== b)).slice(0, 2);
      return {
        text: `Mix ${a} paint and ${b} paint. What color do you get?`, visual: sw(a) + " + " + sw(b), choices: shuf([r, ...wr]), answer: r,
        hints: ["Think about mixing two paints together in a cup.", "Only three secondary colors can be made from the primary colors: orange, green and purple. Which pair makes which?", "Example: red + white makes pink. The two colors you see now make a different color. Now do yours."]
      };
    }
    if (form === 1) {
      const right = `${a} and ${b}`, pairs = MIXES.map(m => `${m[0]} and ${m[1]}`).filter(x => x !== right);
      return {
        text: `Which two colors make ${r}?`, visual: sw(r), choices: shuf([right, ...pairs]), answer: right,
        hints: ["Think about the colors you mix to get a new color.", "Orange, green and purple are each made from two primary colors. Which two would make the color you see?", "Example: blue and red make purple, while red and yellow make orange. Now do yours."]
      };
    }
    const wr = shuf(others.filter(x => x !== a && x !== b)).slice(0, 2);
    return {
      text: `${a[0].toUpperCase() + a.slice(1)} + ${b} = ?`, visual: "🎨", choices: shuf([r, ...wr]), answer: r,
      hints: ["Imagine mixing two paints on a palette.", "Mixing two primary colors makes a secondary color. Think of the pair.", "Example: yellow + red = orange when you mix paint. Now do yours with its two colors."]
    };
  };
  const RAINBOW = ["red", "orange", "yellow", "green", "blue", "purple"];
  const wheelNext = () => {
    const after = Math.random() < 0.5, i = after ? ri(0, 4) : ri(1, 5), c = RAINBOW[i], ans = RAINBOW[after ? i + 1 : i - 1];
    const wr = shuf(RAINBOW.filter(x => x !== ans && x !== c)).slice(0, 2);
    return {
      text: `In a rainbow, which color comes ${after ? "after" : "before"} ${c}?`, visual: RAINBOW.map(x => sw(x, "tiny")).join(" "), choices: shuf([ans, ...wr]), answer: ans,
      hints: ["A rainbow has its colors in the same order every time.", `Find ${c} in the row of squares. Look at the square ${after ? "to its right" : "to its left"}.`, "Example: the order is red, orange, yellow, green, blue, purple. After red is orange, and before orange is red. Now do yours."]
    };
  };
  const WARM = ["red", "orange", "yellow"], COOL = ["blue", "green", "purple"];
  const warmCool = () => {
    if (Math.random() < 0.3) {
      const warm = Math.random() < 0.5, ans = pick(warm ? WARM : COOL), wr = shuf(warm ? COOL : WARM).slice(0, 2);
      return {
        text: `Which one is a ${warm ? "warm" : "cool"} color?`, choices: shuf([ans, ...wr]), answer: ans,
        hints: ["Think of the sun and fire versus water and ice.", "Warm colors: red, orange, yellow. Cool colors: blue, green, purple.", "Example: yellow is a warm color like the sun. Now find yours."]
      };
    }
    const c = pick(WARM.concat(COOL)), warm = WARM.includes(c);
    return {
      text: "Is this a warm color or a cool color?", visual: sw(c), choices: ["Warm", "Cool"], answer: warm ? "Warm" : "Cool",
      hints: ["Think about what the color reminds you of: sun and fire, or water and ice?", "Warm colors: red, orange, yellow. Cool colors: blue, green, purple.", "Example: orange is warm (like a flame) and blue is cool (like a lake). Now do yours."]
    };
  };
  const LD = [["red", "#ef9a9a", "light"], ["red", "#7f0000", "dark"], ["blue", "#90caf9", "light"], ["blue", "#0d47a1", "dark"], ["green", "#a5d6a7", "light"], ["green", "#1b5e20", "dark"], ["yellow", "#fff59d", "light"], ["purple", "#ce93d8", "light"], ["purple", "#4a148c", "dark"]];
  const lightDark = () => {
    const [n, hex, ld] = pick(LD);
    return {
      text: `This is ${n}. Is it a light ${n} or a dark ${n}?`, visual: `<span class="swatch" style="background:${hex}"></span>`, choices: ["Light", "Dark"], answer: ld === "light" ? "Light" : "Dark",
      hints: ["Compare it to a bright, pale color and a deep, strong color.", "A light color looks like it has white mixed in. A dark color looks like it has black mixed in.", "Example: pale pink is a light red, and maroon is a dark red. Now decide about yours."]
    };
  };
  const SIDES = [["triangle", 3, "🔺"], ["square", 4, "🟦"], ["rectangle", 4, ""], ["pentagon", 5, ""], ["hexagon", 6, ""]];
  const sidesQ = () => {
    const [n, k, e] = pick(SIDES), what = pick(["sides", "corners"]);
    return {
      text: `How many ${what} does a ${n} have?`, visual: e || undefined, answer: k,
      hints: [`Picture a ${n} and trace around it with your finger.`, `Count the ${what} one by one as you trace.`, "Example: a triangle has 3 sides and 3 corners. Now count yours."]
    };
  };
  const SEQC = [["🔴", "red"], ["🔵", "blue"], ["🟡", "yellow"], ["🟢", "green"], ["🟠", "orange"], ["🟣", "purple"]];
  const patternQ = (units) => () => {
    const u = pick(units), cols = shuf(SEQC).slice(0, 3), uSeq = u.split("").map(ch => cols[ch.charCodeAt(0) - 65]);
    const len = uSeq.length * 2 + ri(0, uSeq.length - 1), seq = [];
    for (let i = 0; i < len; i++) seq.push(uSeq[i % uSeq.length]);
    const ans = uSeq[len % uSeq.length], wr = shuf(SEQC.filter(x => x[1] !== ans[1])).slice(0, 2);
    return {
      text: "What color comes next in the pattern?", visual: seq.map(x => x[0]).join(" ") + " ❓", choices: shuf([ans[1], ...wr.map(x => x[1])]), answer: ans[1],
      hints: ["A pattern repeats. Say the colors out loud from the start.", "Find the small group that repeats, then see where you are in the group.", "Example: 🔴 🔵 🔴 🔵 🔴 ❓ . The group is red, blue, so blue comes next. Now do yours."]
    };
  };
  // mirror pairs for symmetry
  const MIRROR = [
    ["◀", "arrow pointing right", ["arrow pointing left", "arrow pointing up"]],
    ["▶", "arrow pointing left", ["arrow pointing right", "arrow pointing down"]],
    ["◣", "bottom-right corner", ["bottom-left corner", "top-left corner"]],
    ["◢", "bottom-left corner", ["bottom-right corner", "top-right corner"]],
    ["◤", "top-right corner", ["top-left corner", "bottom-right corner"]],
    ["◥", "top-left corner", ["top-right corner", "bottom-left corner"]],
    ["↖", "arrow to the top right", ["arrow to the top left", "arrow to the bottom right"]],
    ["↗", "arrow to the top left", ["arrow to the top right", "arrow to the bottom left"]],
    ["↙", "arrow to the bottom right", ["arrow to the bottom left", "arrow to the top left"]]
  ];
  const mirrorQ = () => {
    const [a, ans, wr] = pick(MIRROR);
    return {
      text: "A mirror line goes straight up and down in the middle. What shows on the other side?", visual: `${a} &nbsp;|&nbsp; ❓`, choices: shuf([ans, ...wr]), answer: ans,
      hints: ["A mirror makes a flipped copy, left to right.", "Whatever points or sits on the left goes to the right in the mirror, and the other way around. Up and down stay the same.", "Example: if a shape is on the far left, its mirror copy is on the far right. Now flip yours."]
    };
  };

  // ======================= LEVEL 1 =======================
  const l1 = [
    F("Name the colors", [
      ["Colors everywhere", "🌈", "Colors are all around us. Let's learn their names!"],
      ["Basic colors", [HEX.red, HEX.blue, HEX.yellow, HEX.green].map(h => `<span class="swatch small" style="background:${h}"></span>`).join(" "), "Red, blue, yellow and green are four colors you see every day."],
      ["Look around", "👀", "Find something red, then something blue. Name the colors you see."]
    ], nameColor(["red", "blue", "yellow", "green", "orange", "purple"])),

    F("More colors", [
      ["Even more colors", [HEX.pink, HEX.brown, HEX.black, HEX.white, HEX.gray].map(h => `<span class="swatch small" style="background:${h}"></span>`).join(" "), "Pink, brown, black, white and gray are colors too."],
      ["Where we see them", "🐻 🐘 ☁️", "A bear can be brown. A cloud can be white. An elephant is gray."],
      ["Black and white", "⚫ ⚪", "Black and white are very different. One is the darkest, the other is the lightest."]
    ], nameColor(["pink", "brown", "black", "white", "gray", "orange"])),

    L("Primary colors", [
      ["Three special colors", [HEX.red, HEX.yellow, HEX.blue].map(h => `<span class="swatch" style="background:${h}"></span>`).join(" "), "<b>Red, yellow and blue</b> are the <b>primary colors</b>."],
      ["Why special?", "🎨", "You cannot make primary colors by mixing other paints. But you can mix them to make new colors!"],
      ["Remember", "1 2 3", "Primary means first. They are the first three colors of painting."]
    ], [
      ["Which one is a primary color?", "Red", ["Green", "Pink"]],
      ["Which one is a primary color?", "Blue", ["Orange", "Purple"]],
      ["Which one is a primary color?", "Yellow", ["Green", "Brown"]],
      ["Which one is NOT a primary color?", "Green", ["Red", "Blue"]],
      ["Which one is NOT a primary color?", "Orange", ["Yellow", "Red"]],
      ["How many primary colors are there?", "3", ["2", "5"]],
      ["Which set has all three primary colors?", "Red, yellow, blue", ["Red, green, pink", "Blue, orange, black"]],
      ["Which one is NOT a primary color?", "Purple", ["Blue", "Yellow"]]
    ], ["Think about the three colors painters start with.", "The primary colors are red, yellow and blue. Anything else is not primary.", "Example: red is primary, but pink is not. Now check yours."]),

    L("Is it primary?", [
      ["Check the color", "🔍", "Look at a color and ask: is it red, yellow or blue? If so, it is primary."],
      ["Other colors", [HEX.green, HEX.orange, HEX.purple].map(h => `<span class="swatch small" style="background:${h}"></span>`).join(" "), "Green, orange and purple are not primary. They are made by mixing."],
      ["Quick tip", "💡", "If you see yellow, red or blue, say 'primary!'"]
    ], [
      ["Is red a primary color?", "Yes", ["No", "Only on Tuesdays"], sw("red")],
      ["Is green a primary color?", "No", ["Yes", "Only in summer"], sw("green")],
      ["Is blue a primary color?", "Yes", ["No", "Only on Tuesdays"], sw("blue")],
      ["Is orange a primary color?", "No", ["Yes", "Only in summer"], sw("orange")],
      ["Is yellow a primary color?", "Yes", ["No", "Only at night"], sw("yellow")],
      ["Is purple a primary color?", "No", ["Yes", "Only in winter"], sw("purple")],
      ["Is pink a primary color?", "No", ["Yes", "Always"], sw("pink")],
      ["Is brown a primary color?", "No", ["Yes", "Always"], sw("brown")]
    ], ["Remember the three special colors painters start with.", "Primary colors: red, yellow, blue. If the color is not one of those three, it is not primary.", "Example: yellow is primary, green is not. Now decide about yours."]),

    F("Mixing colors", [
      ["Mixing paint", "🎨", "When you mix two primary colors, you make a new color."],
      ["Three mixes", "🔴+🟡 🟡+🔵 🔴+🔵", "Red and yellow make <b>orange</b>. Yellow and blue make <b>green</b>. Red and blue make <b>purple</b>."],
      ["Try it", "🖌️", "These new colors are called <b>secondary colors</b>."]
    ], mixQ),

    L("Lines", [
      ["Lines", "〰️", "A <b>line</b> is a mark you make when you move your pencil. Lines can look different."],
      ["Kinds of lines", "─  /\\/\\  ～  ➰", "A <b>straight</b> line goes one way. A <b>zigzag</b> goes up and down in points. A <b>wavy</b> line has smooth ups and downs. A <b>curly</b> line loops around."],
      ["Draw them", "✏️", "Try drawing each kind of line on paper."]
    ], [
      ["What kind of line is this?", "Straight", ["Zigzag", "Wavy"], "──────────"],
      ["What kind of line is this?", "Zigzag", ["Straight", "Wavy"], "/\\/\\/\\/\\/\\"],
      ["What kind of line is this?", "Wavy", ["Straight", "Zigzag"], "～～～～～～"],
      ["Which line goes in sharp points?", "Zigzag", ["Straight", "Wavy"]],
      ["Which line goes smoothly up and down like water?", "Wavy", ["Straight", "Zigzag"], "🌊"],
      ["Which line goes one way with no bends?", "Straight", ["Wavy", "Zigzag"]],
      ["Lightning looks like a...", "zigzag line", ["straight line", "dot"], "⚡"],
      ["A ruler helps you draw a...", "straight line", ["wavy line", "zigzag line"], "📏"]
    ], ["Think about how the line moves: straight, pointy or smooth?", "Straight: no bends. Zigzag: sharp points. Wavy: smooth ups and downs.", "Example: a line like '/\\/\\/\\' is a zigzag. Now name yours."]),

    L("Shapes", [
      ["Flat shapes", "🔵 🟦 🔺", "Shapes are everywhere. A <b>circle</b> is round. A <b>square</b> has 4 equal sides. A <b>triangle</b> has 3 sides."],
      ["More shapes", "▬ ⭐ ❤️", "A <b>rectangle</b> has 4 sides, two long and two short. Stars and hearts are shapes too."],
      ["Draw them", "✏️", "Try drawing a circle without lifting your pencil."]
    ], [
      ["What shape is this?", "Circle", ["Square", "Triangle"], "🔵"],
      ["What shape is this?", "Square", ["Circle", "Triangle"], "🟦"],
      ["What shape is this?", "Triangle", ["Circle", "Square"], "🔺"],
      ["What shape is this?", "Star", ["Heart", "Circle"], "⭐"],
      ["What shape is this?", "Heart", ["Star", "Square"], "❤️"],
      ["What shape is this?", "Diamond", ["Circle", "Triangle"], "🔶"],
      ["Which shape has 3 sides?", "Triangle", ["Circle", "Square"]],
      ["Which shape is round with no corners?", "Circle", ["Square", "Triangle"]]
    ], ["Look at the number of sides and corners.", "Circle: round, no corners. Triangle: 3 sides. Square: 4 equal sides.", "Example: a shape with 4 equal sides is a square. Now name yours."]),

    L("Shapes in things", [
      ["Shapes around us", "🕐 🚪 🍕", "Look at everyday things: a clock is a circle, a door is a rectangle, a pizza slice is a triangle."],
      ["Hidden shapes", "🔍", "Artists see shapes in everything and draw them."],
      ["Build a picture", "🏠", "A house can be drawn from a square and a triangle."]
    ], [
      ["A clock face is shaped like a...", "circle", ["triangle", "heart"], "🕐"],
      ["A door is shaped like a...", "rectangle", ["circle", "star"], "🚪"],
      ["A slice of pizza looks like a...", "triangle", ["square", "circle"], "🍕"],
      ["A ball looks like a...", "circle", ["square", "triangle"], "⚽"],
      ["A slice of toast looks like a...", "square", ["circle", "star"], "🍞"],
      ["The roof of a house often looks like a...", "triangle", ["circle", "heart"], "🏠"],
      ["The moon in the sky can look like a...", "circle", ["triangle", "square"], "🌕"],
      ["A TV screen is mostly a...", "rectangle", ["circle", "star"], "📺"]
    ], ["Picture the outline of the object.", "Round things are circles. Things with long and short sides are rectangles. Pointy tops are triangles.", "Example: a window pane can be a square. Now picture yours."]),

    L("Art tools", [
      ["Tools for art", "🖍️ 🖌️ ✏️", "Artists use many tools: crayons, brushes, pencils, scissors and glue."],
      ["Making marks", "🖍️", "Crayons and pencils make lines. A paintbrush spreads paint."],
      ["Cutting and sticking", "✂️ 🧴", "Scissors cut. Glue sticks things together."]
    ], [
      ["Which tool do you use to paint?", "Paintbrush", ["Scissors", "Ruler"], "🖌️"],
      ["Which tool cuts paper?", "Scissors", ["Crayon", "Glue"], "✂️"],
      ["Which tool sticks paper together?", "Glue", ["Scissors", "Pencil"], "🧴"],
      ["Which tool makes waxy colorful lines?", "Crayon", ["Scissors", "Glue"], "🖍️"],
      ["Which tool makes gray lines you can erase?", "Pencil", ["Paint", "Scissors"], "✏️"],
      ["What do you paint on?", "Paper", ["A cloud", "Soup"], "📄"],
      ["Which holds many colors of paint?", "Paint palette", ["Eraser", "Scissors"], "🎨"],
      ["Which is the tool for drawing a straight line?", "Ruler", ["Paintbrush", "Glue"], "📏"]
    ], ["Think about what you do with the tool: cut, stick, paint or draw?", "Match the action to the tool. Paint needs a brush. Cutting needs scissors.", "Example: to stick two papers together you use glue. Now match yours."]),

    L("What do I use?", [
      ["Choose a tool", "🧰", "Before you start, think about what you want to do. Then choose the right tool."],
      ["Match", "✂️→cut · 🖌️→paint", "Cutting → scissors. Painting → brush. Coloring → crayons or markers."],
      ["Safety", "👀", "Use scissors carefully. Keep them pointing down when you walk."]
    ], [
      ["You want to cut paper. What do you use?", "Scissors", ["Crayon", "Brush"]],
      ["You want to paint a rainbow. What do you use?", "Paintbrush", ["Scissors", "Eraser"]],
      ["You want to glue two papers. What do you use?", "Glue", ["Brush", "Ruler"]],
      ["You want to color a picture with waxy sticks. What do you use?", "Crayons", ["Scissors", "Glue"]],
      ["You made a pencil mistake. What fixes it?", "Eraser", ["Paint", "Glue"]],
      ["You want to draw a straight line. What helps?", "Ruler", ["Scissors", "Eraser"]],
      ["You want to make a cat from clay. What do you use?", "Clay", ["Paper only", "Water only"]],
      ["How do you carry scissors safely?", "Points down", ["Pointing at friends", "Swinging them"]]
    ], ["Think about what job you need the tool to do.", "Cut = scissors, stick = glue, paint = brush, erase = eraser.", "Example: to draw a line you use a pencil. Now pick the tool for yours."]),

    L("Big and small", [
      ["Size", "🐘 🐭", "Things can be <b>big</b> or <b>small</b>. An elephant is big. A mouse is small."],
      ["In a picture", "🖼️", "Artists draw some things bigger and some smaller to make their pictures interesting."],
      ["Compare", "↔️", "Which is bigger? Which is smaller? Look closely."]
    ], [
      ["Which is bigger?", "Elephant", ["Mouse", "Ant"], "🐘"],
      ["Which is smaller?", "Ant", ["Elephant", "Horse"], "🐜"],
      ["Which is bigger?", "Tree", ["Flower", "Seed"], "🌳"],
      ["Which is smaller?", "Seed", ["Tree", "Mountain"], "🌱"],
      ["Which is bigger?", "House", ["Shoe", "Key"], "🏠"],
      ["Which is smaller?", "Button", ["Door", "Bed"], "🔘"],
      ["Which is bigger?", "Whale", ["Fish", "Shrimp"], "🐋"],
      ["Which is smaller?", "Ladybug", ["Cow", "Bus"], "🐞"]
    ], ["Think about how much room each thing takes up.", "Bigger things take up more room. Smaller things fit in your hand.", "Example: a dog is bigger than a hamster. Now compare yours."]),

    F("Light and dark", [
      ["Light colors", "☀️", "A <b>light</b> color looks pale and bright, like pale yellow."],
      ["Dark colors", "🌑", "A <b>dark</b> color looks deep and strong, like navy blue."],
      ["Compare", "↔️", "Put two colors side by side to see which is lighter."]
    ], lightDark),

    L("Colors of things", [
      ["Real colors", "🍌 🌳 🍓", "Many things have colors we know: bananas are yellow, grass is green, strawberries are red."],
      ["Choose colors", "🖍️", "When you draw, pick the color that fits. Or use your imagination!"],
      ["Nature's colors", "🌈", "Nature has lots of colors. Look outside and see."]
    ], [
      ["What color is a ripe banana?", "Yellow", ["Blue", "Purple"], "🍌"],
      ["What color is grass?", "Green", ["Red", "Pink"], "🌱"],
      ["What color is a strawberry?", "Red", ["Blue", "Green"], "🍓"],
      ["What color is the sky on a sunny day?", "Blue", ["Brown", "Pink"], "☀️"],
      ["What color is a carrot?", "Orange", ["Blue", "Black"], "🥕"],
      ["What color is snow?", "White", ["Green", "Purple"], "❄️"],
      ["What color is a blueberry?", "Blue", ["Orange", "Yellow"], "🫐"],
      ["What color is the sun in a drawing?", "Yellow", ["Black", "Blue"], "☀️"]
    ], ["Picture the thing in your mind.", "Think of the thing and the color you usually see.", "Example: a lemon is yellow. Now think about yours."]),

    F("Make a pattern", [
      ["A pattern", "🔴 🔵 🔴 🔵", "A <b>pattern</b> is something that repeats again and again."],
      ["Find the next one", "🔴 🔵 🔴 ❓", "Say the colors in order. Which comes next? Blue!"],
      ["Tip", "🔁", "Look for the small part that repeats."]
    ], patternQ(["AB"])),

    L("Touch and texture", [
      ["Texture", "🧶", "<b>Texture</b> is how something feels when you touch it."],
      ["Texture words", "smooth · rough · soft · bumpy", "Glass is <b>smooth</b>. Tree bark is <b>rough</b>. A teddy bear is <b>soft</b>. An orange peel is <b>bumpy</b>."],
      ["Artists use texture", "🖼️", "Artists sometimes add real things to their art to make it feel different."]
    ], [
      ["Which feels soft?", "A cotton ball", ["A rock", "Sandpaper"], "☁️"],
      ["Which feels rough?", "Sandpaper", ["A cotton ball", "A feather"]],
      ["Which feels smooth?", "A window glass", ["Tree bark", "A pinecone"]],
      ["Which feels bumpy?", "An orange peel", ["A mirror", "A silk scarf"], "🍊"],
      ["Which feels fuzzy?", "A teddy bear", ["A rock", "A spoon"], "🧸"],
      ["Which feels hard?", "A rock", ["A pillow", "A cotton ball"]],
      ["Which feels sticky?", "Tape", ["A feather", "Glass"]],
      ["Which feels spiky?", "A cactus", ["A pillow", "A balloon"], "🌵"]
    ], ["Imagine touching each one with your fingers.", "Soft: gentle and cushiony. Rough: scratchy. Smooth: slick and flat.", "Example: a pillow feels soft. Now imagine yours."]),

    L("What is art?", [
      ["Art", "🎨", "<b>Art</b> is making something with your imagination and your hands."],
      ["Ways to make art", "🖼️ 🗿 ✂️", "You can <b>paint</b> or <b>draw</b> a picture, <b>sculpt</b> with clay, or <b>cut and glue</b> paper into a <b>collage</b>."],
      ["Anyone can", "😊", "Anyone can make art. There is no one right way."]
    ], [
      ["Making a picture with paint is...", "painting", ["sleeping", "eating"], "🖌️"],
      ["Shaping clay into a figure is...", "sculpture", ["painting", "singing"], "🗿"],
      ["Gluing paper pieces to make a picture is a...", "collage", ["sculpture", "song"], "✂️"],
      ["Using a pencil or crayon to make a picture is...", "drawing", ["running", "cooking"], "✏️"],
      ["Which one needs imagination?", "Making art", ["Sleeping", "Waiting"]],
      ["Who can make art?", "Anyone", ["Only grown-ups", "Only famous people"]],
      ["Is there only one right way to make art?", "No", ["Yes", "Only in school"]],
      ["Clay figures are an example of...", "sculpture", ["collage", "painting"], "🏺"]
    ], ["Art is about using your imagination.", "Painting uses a brush, sculpture shapes things, and collage glues pieces.", "Example: gluing cut-up paper pieces into a picture is a collage. Now do yours."]),

    L("Kind artists", [
      ["Be kind", "💛", "Good artists are kind. They share materials and clean up."],
      ["Respect", "🖼️", "Say nice things about other people's art. Never rip or mess up their work."],
      ["Clean up", "🧹", "When you finish, put the tools back and wipe the table."]
    ], [
      ["A friend needs a crayon. What do you do?", "Share one", ["Hide them", "Snap them"], "🖍️"],
      ["A friend finishes a picture. What kind thing can you say?", "I like your colors!", ["That's ugly!", "Mine is better!"]],
      ["You finish painting. What do you do?", "Clean up", ["Leave a mess", "Run away"], "🧹"],
      ["Someone else's drawing is on the table. You...", "leave it alone", ["tear it", "scribble on it"]],
      ["You made a mistake. What can you do?", "Try again", ["Rip up the paper", "Give up forever"]],
      ["Paint spilled on the floor. You...", "tell a grown-up and help wipe", ["hide it", "blame a friend"]],
      ["Art supplies should be...", "used carefully", ["thrown", "eaten"]],
      ["When it is your friend's turn to use the paint, you...", "wait kindly", ["grab it", "yell"]]
    ], ["Think about how you would like others to treat you and your art.", "Share, be polite and clean up.", "Example: if a friend has no glue, you can share yours. Now think about yours."]),

    L("Rainbow order", [
      ["Rainbow", "🌈", "A rainbow shows its colors in the same order every time."],
      ["The order", [HEX.red, HEX.orange, HEX.yellow, HEX.green, HEX.blue, HEX.purple].map(h => `<span class="swatch small" style="background:${h}"></span>`).join(" "), "<b>Red, orange, yellow, green, blue, purple.</b>"],
      ["Remember", "🧠", "Say it like a song: red, orange, yellow, green, blue, purple."]
    ], [
      ["Which color is at the start of the rainbow?", "Red", ["Blue", "Green"]],
      ["Which color comes after red?", "Orange", ["Blue", "Purple"]],
      ["Which color comes after yellow?", "Green", ["Red", "Orange"]],
      ["Which color comes after green?", "Blue", ["Red", "Yellow"]],
      ["Which color comes before blue?", "Green", ["Orange", "Purple"]],
      ["Which color is at the end of the rainbow?", "Purple", ["Red", "Orange"]],
      ["Which color comes between orange and green?", "Yellow", ["Red", "Purple"]],
      ["Which color comes before orange?", "Red", ["Yellow", "Blue"]]
    ], ["Say the rainbow colors in order: red, orange, yellow, green, blue, purple.", "Find the color in the list, then look before or after it.", "Example: after blue comes purple. Now do yours."])
  ];
  l1.push(
    MIX("Mixed practice", l1[0], l1[2], l1[4], l1[5]),
    MIX("Level 1 Challenge", l1[3], l1[6], l1[7], l1[12], l1[13], l1[15])
  );

  // ======================= LEVEL 2 =======================
  const l2 = [
    F("Mix secondary colors", [
      ["Secondary colors", [HEX.orange, HEX.green, HEX.purple].map(h => `<span class="swatch" style="background:${h}"></span>`).join(" "), "<b>Orange, green and purple</b> are the <b>secondary colors</b>. You make them by mixing two primary colors."],
      ["The recipe", "🔴+🟡=🟠 &nbsp; 🟡+🔵=🟢 &nbsp; 🔴+🔵=🟣", "Red + yellow = orange. Yellow + blue = green. Red + blue = purple."],
      ["Practice", "🎨", "Say the recipes out loud as you paint."]
    ], mixQ),

    F("Which colors make it?", [
      ["Work backwards", "🔍", "If you know the new color, you can find the two colors that made it."],
      ["Examples", "🟠 ← 🔴🟡", "Orange comes from red and yellow."],
      ["More", "🟢 ← 🟡🔵 &nbsp; 🟣 ← 🔴🔵", "Green comes from yellow and blue. Purple comes from red and blue."]
    ], mixQ),

    F("Color wheel order", [
      ["A color wheel", "🎡", "A <b>color wheel</b> shows how the colors fit together in a circle."],
      ["Rainbow order", [HEX.red, HEX.orange, HEX.yellow, HEX.green, HEX.blue, HEX.purple].map(h => `<span class="swatch small" style="background:${h}"></span>`).join(" "), "Red, orange, yellow, green, blue, purple."],
      ["Next door", "↔️", "Each color sits next to the colors that it mixes with."]
    ], wheelNext),

    L("Warm colors", [
      ["Warm colors", "🔥 ☀️", "<b>Red, orange and yellow</b> are <b>warm colors</b>. They remind us of fire and the sun."],
      ["How they feel", "😊", "Warm colors can feel bold, bright and cozy."],
      ["Find them", "🔍", "Look for warm colors in a sunset or a flame."]
    ], [
      ["Which is a warm color?", "Red", ["Blue", "Green"]],
      ["Which is a warm color?", "Orange", ["Purple", "Blue"]],
      ["Which is a warm color?", "Yellow", ["Green", "Blue"]],
      ["Which of these is warm?", "A campfire", ["An ice cube", "A snowman"], "🔥"],
      ["The sun is usually drawn with...", "warm colors", ["cool colors", "no colors"], "☀️"],
      ["Which three colors are warm?", "Red, orange, yellow", ["Blue, green, purple", "Black, white, gray"]],
      ["Which of these is warm?", "A sunset", ["A glacier", "An ice cube"], "🌅"],
      ["Which is NOT a warm color?", "Blue", ["Red", "Orange"]]
    ], ["Think of fire, sun and cozy things.", "Warm colors: red, orange, yellow.", "Example: a flame is drawn with orange and red. Now do yours."]),

    L("Cool colors", [
      ["Cool colors", "🌊 ❄️", "<b>Blue, green and purple</b> are <b>cool colors</b>. They remind us of water, ice and grass."],
      ["How they feel", "😌", "Cool colors can feel calm and quiet."],
      ["Find them", "🔍", "Look for cool colors in the ocean or a forest."]
    ], [
      ["Which is a cool color?", "Blue", ["Red", "Orange"]],
      ["Which is a cool color?", "Green", ["Yellow", "Red"]],
      ["Which is a cool color?", "Purple", ["Orange", "Yellow"]],
      ["Which of these is cool?", "Ocean waves", ["A campfire", "A flame"], "🌊"],
      ["Ice and snow are often drawn with...", "cool colors", ["warm colors", "no colors"], "❄️"],
      ["Which three colors are cool?", "Blue, green, purple", ["Red, orange, yellow", "Black, white, gray"]],
      ["Which of these is cool?", "A lake", ["A fire", "A candle flame"], "🏞️"],
      ["Which is NOT a cool color?", "Orange", ["Blue", "Green"]]
    ], ["Think of water, ice and shady forests.", "Cool colors: blue, green, purple.", "Example: a lake is drawn with blue. Now do yours."]),

    F("Warm or cool?", [
      ["Sort the colors", "🔥 / ❄️", "Is the color warm like fire, or cool like ice?"],
      ["Warm", "🟥 🟧 🟨", "Red, orange, yellow."],
      ["Cool", "🟦 🟩 🟪", "Blue, green, purple."]
    ], warmCool),

    F("Light and dark", [
      ["Make a color lighter", "+ ⚪", "Add <b>white</b> to a color to make it <b>lighter</b>. Red plus white makes pink."],
      ["Make a color darker", "+ ⚫", "Add <b>black</b> to make it <b>darker</b>. Be careful: a little black goes a long way."],
      ["Light and dark", "🌗", "Light colors look pale. Dark colors look deep."]
    ], lightDark),

    L("Kinds of lines", [
      ["Thick and thin", "▬ ─", "Lines can be <b>thick</b> (wide) or <b>thin</b> (narrow)."],
      ["Straight and curved", "─ ⌒", "A <b>straight</b> line goes one way. A <b>curved</b> line bends."],
      ["Lines tell a story", "🎨", "Lines can show things: zigzag for lightning, wavy for water, spiral for a snail."]
    ], [
      ["A line made with a fat marker looks...", "thick", ["thin", "invisible"], "🖊️"],
      ["A line made with a sharp pencil tip looks...", "thin", ["thick", "fat"], "✏️"],
      ["A line that bends is...", "curved", ["straight", "flat only"]],
      ["Which line shows water best?", "Wavy", ["Straight", "Dot"], "🌊"],
      ["Which line shows lightning best?", "Zigzag", ["Wavy", "Circle"], "⚡"],
      ["Which line shows a snail shell?", "Spiral", ["Straight", "Zigzag"], "🐌"],
      ["Which line is best for a ruler's edge?", "Straight", ["Wavy", "Spiral"]],
      ["A rainbow arcs. Its line is...", "curved", ["straight", "zigzag"], "🌈"]
    ], ["Think about the shape of what you want to draw.", "Straight things use straight lines. Water uses wavy lines. Lightning uses zigzags.", "Example: a river is best shown with a wavy line. Now do yours."]),

    L("Up, down and across", [
      ["Three directions", "↔️ ↕️ ↗️", "Lines can go different ways."],
      ["Horizontal", "➖", "A <b>horizontal</b> line goes <b>across</b>, side to side, like the horizon, where the sky meets the ground."],
      ["Vertical and diagonal", "| /", "A <b>vertical</b> line goes <b>up and down</b>, like a tree trunk. A <b>diagonal</b> line is <b>slanted</b>, like a slide."]
    ], [
      ["A line that goes side to side is...", "horizontal", ["vertical", "diagonal"], "➖"],
      ["A line that goes straight up and down is...", "vertical", ["horizontal", "diagonal"]],
      ["A slanted line is...", "diagonal", ["horizontal", "vertical"], "⁄"],
      ["A flagpole is a...", "vertical line", ["horizontal line", "diagonal line"], "🚩"],
      ["The floor of a room is a...", "horizontal line", ["vertical line", "diagonal line"]],
      ["A playground slide is a...", "diagonal line", ["horizontal line", "vertical line"], "🛝"],
      ["A tree trunk is a...", "vertical line", ["horizontal line", "diagonal line"], "🌲"],
      ["The line where the sea meets the sky is a...", "horizontal line", ["vertical line", "diagonal line"], "🌊"]
    ], ["Picture it standing, lying down or leaning.", "Horizontal lies flat (like sleeping). Vertical stands tall. Diagonal leans.", "Example: a ladder leaning on a wall is diagonal. Now picture yours."]),

    F("Count the sides", [
      ["Sides", "🔺", "A <b>side</b> is a straight edge of a shape. A <b>corner</b> is where two sides meet."],
      ["Counting", "3 · 4 · 4 · 5 · 6", "Triangle: 3. Square: 4. Rectangle: 4. Pentagon: 5. Hexagon: 6."],
      ["Same number", "📐", "A shape always has the same number of sides as corners."]
    ], sidesQ),

    F("Color patterns (AAB)", [
      ["Longer patterns", "🔴 🔴 🔵 🔴 🔴 🔵", "Some patterns repeat three or four things."],
      ["Find the group", "🔁", "Look for the part that comes again and again."],
      ["Then continue", "➡️", "Count where you are in the group and say what comes next."]
    ], patternQ(["AAB", "ABB", "ABC"])),

    F("Color patterns", [
      ["Patterns again", "🔴 🔵 🟡", "Patterns can use two or three colors."],
      ["Say it", "🗣️", "Say the colors out loud to hear the pattern."],
      ["Next one", "➡️", "Use the repeating group to pick the next color."]
    ], patternQ(["AB", "AAB", "ABB", "ABC"])),

    L("Texture words", [
      ["More texture words", "🧸 🪵 🧊", "Texture words: <b>smooth</b>, <b>rough</b>, <b>soft</b>, <b>bumpy</b>, <b>fuzzy</b>, <b>hard</b>, <b>squishy</b>, <b>prickly</b>."],
      ["Drawing texture", "✏️", "You can draw lines to show texture: tiny dots for sandy, small lines for fur."],
      ["Rubbing", "🍃", "Put paper over a leaf and rub with a crayon. You'll see its texture!"]
    ], [
      ["Which feels squishy?", "A sponge", ["A rock", "A table"], "🧽"],
      ["Which feels prickly?", "A cactus", ["A pillow", "A balloon"], "🌵"],
      ["Which feels fuzzy?", "A peach", ["A mirror", "A spoon"], "🍑"],
      ["Which feels smooth?", "A glass marble", ["Tree bark", "Sandpaper"]],
      ["Which feels rough?", "Tree bark", ["A silk ribbon", "A bubble"], "🪵"],
      ["Which feels hard?", "A rock", ["Jelly", "A cloud"]],
      ["Which would you draw with tiny dots?", "Sand", ["Glass", "Water"]],
      ["Doing a leaf rubbing shows you its...", "texture", ["color only", "taste"], "🍃"]
    ], ["Imagine touching it.", "Match the texture word to the way it feels in your fingers.", "Example: a pillow feels soft. A cactus feels prickly. Now do yours."]),

    L("Matching halves", [
      ["Symmetry", "🦋", "Something is <b>symmetrical</b> if one side is a mirror of the other. A butterfly's wings match."],
      ["A line down the middle", "🦋 |", "If you fold along the middle, both halves match perfectly."],
      ["Find symmetry", "🔍", "Faces, leaves, and butterflies are mostly symmetrical."]
    ], [
      ["Which is symmetrical?", "A butterfly", ["A scribble", "A random splash"], "🦋"],
      ["If you fold a symmetrical shape in the middle, the halves...", "match", ["do not match", "disappear"]],
      ["Which is symmetrical?", "A heart", ["A scribble", "A cloud shape"], "❤️"],
      ["Which is symmetrical?", "A leaf", ["A splash", "A crumple"], "🍃"],
      ["Is a circle symmetrical?", "Yes", ["No", "Only red ones"], "🔵"],
      ["Which one is symmetrical?", "A star ⭐", ["A random blob", "A squiggle"]],
      ["The word for a mirror match is...", "symmetry", ["mystery", "symphony"]],
      ["Which has two matching halves?", "A butterfly", ["A bush", "A tangled rope"], "🦋"]
    ], ["Imagine folding it in half down the middle.", "If the two halves would match exactly, it's symmetrical.", "Example: a smiley face folds into matching halves. Now imagine yours."]),

    F("Finish the other half", [
      ["Mirror pictures", "◀ | ▶", "In a symmetrical picture, the right side is a flipped copy of the left."],
      ["Flip it", "🔄", "Left things go to the right. Right things go to the left."],
      ["Up stays up", "⬆️", "A mirror down the middle flips left and right, but not up and down."]
    ], mirrorQ),

    L("Art materials", [
      ["Other art things", "🧱 🖼️ 🧑‍🎨", "Artists use clay, paper, paint, markers, chalk and canvas."],
      ["Where to paint", "🖼️", "A <b>canvas</b> is a stretched cloth that artists paint on. An <b>easel</b> holds it up."],
      ["Mixing paint", "🎨", "A <b>palette</b> is where an artist mixes colors."]
    ], [
      ["What holds a canvas up?", "An easel", ["A sandwich", "A palette"], "🖼️"],
      ["Where does an artist mix paint?", "On a palette", ["On a cloud", "On a plate of food"], "🎨"],
      ["What is clay used for?", "Making sculptures", ["Drawing lines", "Cutting"], "🏺"],
      ["What do you use to draw on a sidewalk?", "Chalk", ["Glue", "Ink only"]],
      ["What do artists paint on besides paper?", "Canvas", ["Soup", "Air"]],
      ["Which would you use to draw with thick, bold lines?", "A marker", ["A feather", "A spoon"], "🖊️"],
      ["What do you use to wash a paintbrush?", "Water", ["Sand", "Glue"], "💧"],
      ["Where do artists keep their pictures to look at?", "A sketchbook", ["A bucket", "A shoe"]]
    ], ["Think about what the material or tool is for.", "Easel holds canvas, palette holds paint, clay is shaped.", "Example: you shape clay with your hands. Now think about yours."]),

    L("Kinds of art", [
      ["Painting and drawing", "🖼️", "A <b>painting</b> is made with paint. A <b>drawing</b> is made with pencils, crayons or markers. Both are flat."],
      ["Sculpture", "🗿", "A <b>sculpture</b> is art you can walk around, like a clay animal. It's 3D."],
      ["Collage", "✂️", "A <b>collage</b> is made by gluing pieces of paper or cloth onto a surface."]
    ], [
      ["Art made of glued bits of paper is a...", "collage", ["painting", "sculpture"], "✂️"],
      ["A clay animal you can hold is a...", "sculpture", ["painting", "drawing"], "🗿"],
      ["A picture made with brush and paint is a...", "painting", ["sculpture", "collage"], "🖌️"],
      ["A picture made with crayons is a...", "drawing", ["sculpture", "collage"], "🖍️"],
      ["Which kind of art can you walk around?", "Sculpture", ["Painting", "Drawing"]],
      ["Which kind of art is flat?", "Painting", ["Sculpture", "Statue"]],
      ["Pottery is made from...", "clay", ["paper", "water"], "🏺"],
      ["Cutting and gluing pictures from paper is...", "collage", ["pottery", "painting"]]
    ], ["Think about how the art is made: paint, clay or glue?", "Paint → painting. Clay → sculpture. Glued pieces → collage.", "Example: a statue is a sculpture. Now think about yours."]),

    L("Being a kind artist", [
      ["Share", "🤝", "Kind artists share paints, crayons and space."],
      ["Say kind things", "💬", "Say what you like: \"I like your colors!\""],
      ["Be patient", "⏳", "Wait for your turn and help clean up."]
    ], [
      ["Someone wants to use your red paint. You...", "share it", ["hide it", "pour it out"]],
      ["Your friend shows you their picture. You say...", "I like your colors!", ["That's silly!", "Mine is better!"]],
      ["Art class is over. You...", "help clean up", ["leave", "hide"], "🧹"],
      ["Someone else is using the glue. You...", "wait your turn", ["grab it", "yell"]],
      ["A classmate's art fell on the floor. You...", "pick it up and give it back", ["step on it", "hide it"]],
      ["Your picture does not look how you planned. You...", "keep trying", ["rip it", "get mad at others"]],
      ["What do you do with art supplies when you finish?", "Put them away", ["Throw them", "Leave them out"]],
      ["Art is for...", "everyone", ["only experts", "only one person"]]
    ], ["Be kind, fair and respectful.", "Sharing and kind words help everyone enjoy art.", "Example: if your friend needs a pencil, you can lend yours. Now think about yours."])
  ];
  l2.push(
    MIX("Mixed practice", l2[0], l2[3], l2[8], l2[13]),
    MIX("Level 2 Challenge", l2[1], l2[5], l2[6], l2[9], l2[10], l2[14])
  );

  // ======================= LEVEL 3 =======================
  const l3 = [
    L("Primary or secondary?", [
      ["Two groups", "🔴🟡🔵 / 🟠🟢🟣", "<b>Primary</b> colors are red, yellow and blue. <b>Secondary</b> colors are orange, green and purple."],
      ["How to tell", "🎨", "Primary colors can't be mixed from other paint. Secondary colors are made from two primary colors."],
      ["Sort them", "🔍", "Is it red, yellow or blue? Primary. Is it orange, green or purple? Secondary."]
    ], [
      ["Is orange primary or secondary?", "Secondary", ["Primary", "Neither"], sw("orange")],
      ["Is red primary or secondary?", "Primary", ["Secondary", "Neither"], sw("red")],
      ["Is green primary or secondary?", "Secondary", ["Primary", "Neither"], sw("green")],
      ["Is blue primary or secondary?", "Primary", ["Secondary", "Neither"], sw("blue")],
      ["Is purple primary or secondary?", "Secondary", ["Primary", "Neither"], sw("purple")],
      ["Is yellow primary or secondary?", "Primary", ["Secondary", "Neither"], sw("yellow")],
      ["How many secondary colors are there?", "3", ["2", "6"]],
      ["Which color is a secondary color?", "Green", ["Red", "Blue"]]
    ], ["Think of the paint recipe: are two colors mixed?", "Primary: red, yellow, blue. Secondary: mix of two primaries (orange, green, purple).", "Example: purple is made by mixing, so it's secondary. Now decide about yours."]),

    F("Mix it up", [
      ["Mixing review", "🎨", "Red + yellow = orange. Yellow + blue = green. Red + blue = purple."],
      ["Both ways", "🔄", "You can find the new color or the two colors that made it."],
      ["Check", "✅", "Say the recipe out loud."]
    ], mixQ),

    L("Tints and shades", [
      ["Tint", "+ ⚪", "A <b>tint</b> is a color with <b>white</b> added. It looks lighter. Red + white = pink."],
      ["Shade", "+ ⚫", "A <b>shade</b> is a color with <b>black</b> added. It looks darker."],
      ["Mix a lot", "🌈", "One color can be many tints and shades. Try painting a blue ladder from light to dark."]
    ], [
      ["Adding white to a color makes it...", "lighter", ["darker", "wetter"]],
      ["Adding black to a color makes it...", "darker", ["lighter", "dryer"]],
      ["A tint is a color with ___ added.", "white", ["black", "glue"]],
      ["A shade is a color with ___ added.", "black", ["white", "water"]],
      ["Red mixed with white makes...", "pink", ["brown", "green"], sw("red")],
      ["Which one is a tint of blue?", "Light blue", ["Dark blue", "Navy"], "💙"],
      ["Which one is a shade of green?", "Dark green", ["Light green", "Pale green"]],
      ["To get a pale color, add...", "white", ["black", "nothing"]]
    ], ["Think about adding white or black to a color.", "Tint = white added, lighter. Shade = black added, darker.", "Example: yellow + white = pale yellow, a tint. Now think about yours."]),

    L("Foreground and background", [
      ["Near and far", "🌳 ⛰️", "In a picture, things can look near or far."],
      ["Foreground", "👇", "The <b>foreground</b> is the part closest to you, at the front."],
      ["Background", "👆", "The <b>background</b> is the part farthest away, at the back. The <b>middle ground</b> is in between."]
    ], [
      ["The part of a picture closest to you is the...", "foreground", ["background", "ceiling"]],
      ["The part of a picture farthest away is the...", "background", ["foreground", "frame"]],
      ["In a picture of flowers in front of mountains, the mountains are in the...", "background", ["foreground", "middle only"], "🌸⛰️"],
      ["In a picture of a dog in front of a house, the dog is in the...", "foreground", ["background", "sky"], "🐶🏠"],
      ["The sky is usually in the...", "background", ["foreground", "frame"], "☁️"],
      ["The in-between part is the...", "middle ground", ["foreground", "ceiling"]],
      ["A tall tree right in front of you is in the...", "foreground", ["background", "attic"], "🌳"],
      ["Far-away mountains are in the...", "background", ["foreground", "frame"], "⛰️"]
    ], ["Think about what's near you and what's far.", "Foreground is near (front). Background is far (back).", "Example: a fence right in front of you is in the foreground; far hills are the background. Now do yours."]),

    L("Big near, small far", [
      ["Looks bigger", "🌲 🌲", "Things that are close look <b>bigger</b>. Things far away look <b>smaller</b>."],
      ["In art", "🖼️", "Artists draw far-away things smaller to make a picture look deep."],
      ["Higher up", "⬆️", "Far-away things are also placed higher on the page."]
    ], [
      ["Two trees: one big, one small. Which one looks closer?", "The big one", ["The small one", "Neither"], "🌳"],
      ["To show a house far away, draw it...", "smaller", ["bigger", "upside down"], "🏠"],
      ["A car far down a road looks...", "small", ["huge", "invisible"], "🚗"],
      ["A friend near you looks...", "big", ["tiny", "invisible"]],
      ["Far-away things are drawn...", "smaller and higher up", ["bigger and lower", "invisible"]],
      ["A tiny house in the corner of a drawing looks...", "far away", ["very close", "inside"], "🏠"],
      ["Mountains far away look...", "small", ["huge", "red"], "⛰️"],
      ["Which would you draw biggest to show it's closest?", "The flower in front", ["The far hill", "The cloud"], "🌸"]
    ], ["Close things look big and far things look small.", "To show depth, draw close things big and far things small.", "Example: a tree beside you is huge but a faraway tree is tiny. Now think about yours."]),

    L("Warm and cool pictures", [
      ["Mood", "😊", "Colors can make a picture feel different. <b>Warm colors</b> often feel lively and cozy. <b>Cool colors</b> often feel calm."],
      ["Sunny day", "🌅", "Artists often use warm colors for a sunset and cool colors for a snowy night."],
      ["Choose", "🎨", "What feeling do you want? Choose colors that match."]
    ], [
      ["Which colors fit a hot sunny day?", "Warm colors", ["Cool colors", "No colors"], "☀️"],
      ["Which colors fit a snowy night?", "Cool colors", ["Warm colors", "Only red"], "❄️"],
      ["A cozy fire is best drawn with...", "warm colors", ["cool colors", "no color"], "🔥"],
      ["A calm blue lake is drawn with...", "cool colors", ["warm colors", "red only"], "🏞️"],
      ["Which colors fit a sunset?", "Orange, red and yellow", ["Blue, green, purple", "Gray only"], "🌅"],
      ["Which colors fit a quiet forest?", "Green and blue", ["Red and orange", "Yellow only"], "🌲"],
      ["Warm colors often feel...", "lively", ["calm only", "sleepy only"]],
      ["Cool colors often feel...", "calm", ["hot", "angry only"]]
    ], ["Think about what you would see in the scene.", "Warm: sun, fire. Cool: water, ice, shade.", "Example: a campfire is drawn with warm colors. Now do yours."]),

    L("Contrast", [
      ["Contrast", "⚫⚪", "<b>Contrast</b> is a big difference, like dark next to light. It makes things stand out."],
      ["Stand out", "🌟", "Yellow on dark blue stands out. Yellow on white is hard to see."],
      ["Pick for a poster", "🪧", "For a poster, use colors that contrast so people can read it."]
    ], [
      ["Which stands out most on white paper?", "Black", ["Light yellow", "White"]],
      ["Which stands out most on black paper?", "White", ["Dark blue", "Black"]],
      ["Dark next to light is...", "contrast", ["boring", "sleep"]],
      ["Which is easier to read?", "Black words on white paper", ["Light yellow words on white paper", "White words on white paper"], "📖"],
      ["Which has more contrast?", "Black and white", ["Pink and light pink", "Gray and gray"]],
      ["To make a star glow in the night sky, paint the sky...", "dark", ["very light", "yellow like the star"], "⭐"],
      ["A good poster uses...", "colors that stand out", ["colors that blend in", "only gray"]],
      ["Which will NOT stand out on a yellow page?", "Light yellow", ["Dark blue", "Black"]]
    ], ["Think about which color is very different from the page.", "More different = more contrast. Dark on light or light on dark works best.", "Example: black on white is easy to see. Now think about yours."]),

    L("Symmetry in things", [
      ["Symmetry", "🦋", "Something is <b>symmetrical</b> if you can fold it so the two halves match."],
      ["The fold line", "📐", "The fold line is called the <b>line of symmetry</b>."],
      ["Letters too", "A H M T", "A, H, M and T are symmetrical. F, G, L and P are not."]
    ], [
      ["Which letter is symmetrical?", "A", ["F", "G"]],
      ["Which letter is symmetrical?", "H", ["L", "P"]],
      ["Which letter is NOT symmetrical?", "F", ["A", "M"]],
      ["Which letter is NOT symmetrical?", "G", ["H", "T"]],
      ["Which letter is symmetrical?", "T", ["L", "F"]],
      ["Which letter is symmetrical?", "M", ["P", "G"]],
      ["The fold line of a symmetrical shape is called a...", "line of symmetry", ["line of sleep", "line of paint"]],
      ["Which is symmetrical?", "A butterfly", ["A scribble", "A rock pile"], "🦋"]
    ], ["Imagine folding the letter down the middle.", "If both halves match, it's symmetrical. Letters like A, H, M, T match; F, G, L, P do not.", "Example: H folds into two matching halves, and L does not. Now check yours."]),

    F("Complete the picture", [
      ["Half a picture", "◀ | ?", "If you see half of a symmetrical picture, you can draw the other half."],
      ["Mirror it", "🔄", "Everything flips left to right."],
      ["Check", "✅", "Fold your paper to see if the halves match."]
    ], mirrorQ),

    F("Pattern rules", [
      ["Pattern rules", "🔴 🔵 🟡 🔴 🔵 🟡", "A pattern follows a rule. The rule may repeat 2, 3 or more colors."],
      ["Find the core", "🔍", "The part that repeats is called the <b>core</b>."],
      ["Predict", "➡️", "Count your place in the core to find the next color."]
    ], patternQ(["AB", "AAB", "ABB", "ABC", "AABB"])),

    L("2D and 3D", [
      ["Flat shapes", "🔵 🟦 🔺", "<b>2D</b> shapes are flat, like a circle drawn on paper."],
      ["Solid shapes", "⚽ 🧊 🔺", "<b>3D</b> shapes are solid, like a ball (sphere) or a block (cube)."],
      ["Matching", "🔵→⚽ · 🟦→🧊", "A circle goes with a sphere. A square goes with a cube. A triangle goes with a pyramid."]
    ], [
      ["A ball is shaped like a...", "sphere", ["cube", "square"], "⚽"],
      ["A dice is shaped like a...", "cube", ["sphere", "circle"], "🎲"],
      ["A circle is...", "flat (2D)", ["solid (3D)", "a cube"], "🔵"],
      ["A sphere is...", "solid (3D)", ["flat (2D)", "a line"]],
      ["Which 3D shape goes with a square?", "Cube", ["Sphere", "Cone"], "🟦"],
      ["Which flat shape goes with a sphere?", "Circle", ["Square", "Triangle"]],
      ["A party hat is shaped like a...", "cone", ["cube", "sphere"], "🎉"],
      ["An ice cream cone is shaped like a...", "cone", ["sphere", "cube"], "🍦"]
    ], ["Flat shapes are on paper. Solid shapes you can hold.", "Circle ↔ sphere, square ↔ cube, triangle ↔ pyramid or cone.", "Example: a box is a 3D rectangle shape. Now do yours."]),

    L("Drawing steps", [
      ["Start simple", "⭕ 🟦 🔺", "Draw big, simple shapes first. A snowman starts with three circles."],
      ["Then details", "👀 😊", "Add small things like eyes, buttons and a hat."],
      ["Color last", "🖍️", "Color at the end, so you can fix your lines first."]
    ], [
      ["What do you draw first?", "Big simple shapes", ["Tiny details", "The signature only"]],
      ["A snowman starts with...", "circles", ["triangles", "stars"], "⛄"],
      ["When do you add the eyes and buttons?", "After the big shapes", ["Before anything", "Never"]],
      ["When do you color?", "Near the end", ["Before drawing", "Never"], "🖍️"],
      ["A house can be drawn from a square and a...", "triangle", ["star", "heart"], "🏠"],
      ["What does a pencil sketch help you do?", "Plan and fix", ["Make a mess", "Wash paper"]],
      ["If you make a mistake, you can...", "erase and try again", ["rip the paper", "give up"]],
      ["A tree can be drawn with a rectangle trunk and...", "a circle on top", ["a boat", "a hat"], "🌳"]
    ], ["Think about starting big and ending small.", "Big shapes first, small details second, color last.", "Example: to draw a cat, start with an oval body, then add ears. Now do yours."]),

    L("Texture in art", [
      ["Real and drawn", "🧶", "<b>Real</b> texture is what you can feel. <b>Drawn</b> texture is what the picture looks like it feels."],
      ["Ways to show it", "✏️", "Short lines look like fur. Dots look like sand. Cross-hatching makes rough lines."],
      ["Rubbing", "🍃", "Put paper on a leaf and rub it with a crayon to copy its texture."]
    ], [
      ["Short lines are good for drawing...", "fur", ["glass", "water"], "🐻"],
      ["Tiny dots could show...", "sand", ["glass", "ice"], "🏖️"],
      ["A crayon rubbing copies a...", "texture", ["smell", "sound"], "🍃"],
      ["To feel a texture you use your...", "fingers", ["ears", "nose"], "🖐️"],
      ["A smooth picture of glass would have...", "no bumps", ["lots of scratches", "lots of fur"]],
      ["Wavy lines can show...", "water", ["rocks", "ice cubes"]],
      ["Real texture is something you can...", "touch", ["only see", "only hear"]],
      ["If an artist glues sand on a painting, the painting has...", "real texture", ["no texture", "only color"]]
    ], ["Think about which marks look like the thing.", "Fur = short lines. Sand = dots. Water = wavy lines.", "Example: tiny dots might show sand. Now do yours."]),

    L("Types of pictures", [
      ["Portrait", "🖼️", "A <b>portrait</b> is a picture of a person's face or a pet."],
      ["Landscape", "🏞️", "A <b>landscape</b> is a picture of the outdoors: mountains, fields, rivers."],
      ["Still life", "🍎 🍐", "A <b>still life</b> is a picture of objects that don't move, like fruit in a bowl."]
    ], [
      ["A picture of mountains and trees is a...", "landscape", ["portrait", "still life"], "🏞️"],
      ["A picture of fruit in a bowl is a...", "still life", ["landscape", "portrait"], "🍎"],
      ["A picture of someone's face is a...", "portrait", ["landscape", "still life"]],
      ["A picture of a seaside is a...", "landscape", ["portrait", "still life"], "🌊"],
      ["A picture of flowers in a vase is a...", "still life", ["landscape", "portrait"], "💐"],
      ["Drawing your dog's face is a...", "portrait", ["landscape", "still life"], "🐶"],
      ["A picture of a river and meadow is a...", "landscape", ["portrait", "still life"], "🏞️"],
      ["A picture of a book and a mug on a table is a...", "still life", ["landscape", "portrait"], "📚"]
    ], ["What is the picture mostly about: a face, the outdoors or objects?", "Portrait: face. Landscape: outdoors. Still life: objects.", "Example: a picture of a bowl of pears is a still life. Now do yours."]),

    L("Art tools and paints", [
      ["Kinds of paint", "🎨", "<b>Watercolor</b> paint is mixed with water and looks see-through. <b>Tempera</b> and <b>acrylic</b> paints are thicker."],
      ["Other tools", "🖍️", "Chalk, pastels, markers and colored pencils make different marks."],
      ["Clean brushes", "💧", "Wash your brush in water between colors."]
    ], [
      ["Which paint is mixed with lots of water?", "Watercolor", ["Clay", "Glue"], "💧"],
      ["Which tool do you use on a sidewalk?", "Chalk", ["Watercolor", "Scissors"]],
      ["Between colors you should wash your...", "brush", ["shoe", "hat"], "🖌️"],
      ["Which makes thin lines of color?", "Colored pencil", ["Paint roller", "Bucket"], "✏️"],
      ["Which can be rubbed onto paper in soft colors?", "Pastel", ["Glue", "Tape"]],
      ["Which holds paint while you mix?", "Palette", ["Easel", "Frame"], "🎨"],
      ["Watercolor looks...", "see-through", ["thick like clay", "gluey"]],
      ["Where does a painting rest while an artist paints?", "On an easel", ["On a pillow", "In a bucket"], "🖼️"]
    ], ["Think about what each tool or paint is used for.", "Watercolor uses water. Chalk is for sidewalks and chalkboards. A palette mixes colors.", "Example: you wash a brush in water. Now do yours."]),

    L("Art jobs", [
      ["Artist jobs", "🧑‍🎨", "A <b>painter</b> paints pictures. A <b>sculptor</b> shapes sculptures. A <b>potter</b> makes things from clay."],
      ["Making books", "📚", "An <b>illustrator</b> draws pictures for books."],
      ["Cartoons", "🎬", "An <b>animator</b> makes drawings that move."]
    ], [
      ["Who paints pictures?", "A painter", ["A plumber", "A baker"], "🧑‍🎨"],
      ["Who shapes statues?", "A sculptor", ["A painter", "A farmer"]],
      ["Who makes pots and bowls from clay?", "A potter", ["An animator", "A farmer"], "🏺"],
      ["Who draws pictures for storybooks?", "An illustrator", ["A bus driver", "A baker"], "📚"],
      ["Who makes cartoons move?", "An animator", ["A potter", "A farmer"], "🎬"],
      ["A person who makes art is an...", "artist", ["engineer only", "alien"]],
      ["Who shapes things from clay on a wheel?", "A potter", ["A painter", "A pilot"]],
      ["Who works with brushes and canvas?", "A painter", ["A sculptor with stone only", "A baker"], "🖼️"]
    ], ["Think about what the artist makes.", "Painter: paintings. Sculptor: statues. Potter: pots. Illustrator: book pictures. Animator: cartoons.", "Example: a person who draws pictures for books is an illustrator. Now do yours."]),

    L("Colors and feelings", [
      ["Colors and moods", "😊 😌", "Artists often use colors to show a feeling."],
      ["Examples", "💛 💙", "Yellow often feels bright and cheerful. Blue often feels calm."],
      ["Your choice", "🎨", "There is no wrong answer. Use colors that make you feel something."]
    ], [
      ["Which color often feels bright and cheerful?", "Yellow", ["Dark gray", "Black"], sw("yellow")],
      ["Which color often feels calm?", "Blue", ["Bright red", "Orange"], sw("blue")],
      ["Which color feels cozy like a fire?", "Orange", ["Light blue", "Gray"], sw("orange")],
      ["Which color might you use for a peaceful night?", "Dark blue", ["Bright red", "Hot orange"]],
      ["Which colors might you use for a happy picture?", "Bright colors", ["Only dark gray", "No colors"]],
      ["Green often reminds people of...", "nature", ["ice cream only", "outer space"], sw("green")],
      ["Do artists have to use the same colors as everyone else?", "No", ["Yes", "Always"]],
      ["A sleepy lullaby picture may use...", "soft, cool colors", ["hot neon colors", "only black"]]
    ], ["There are no wrong feelings in art. Think about what usually fits.", "Bright colors often feel happy. Cool colors often feel calm.", "Example: yellow can feel sunny and happy. Now do yours."]),

    L("Visiting art", [
      ["Art museums", "🏛️", "A <b>museum</b> is a place where art is shown for people to see."],
      ["Look with your eyes", "👀", "In a museum we look with our eyes, not our hands. Touching can harm art."],
      ["Quiet voices", "🤫", "Use quiet voices so everyone can enjoy the art."]
    ], [
      ["At an art museum you should...", "use quiet voices", ["shout", "run"], "🏛️"],
      ["At a museum you look with your...", "eyes", ["hands", "feet"], "👀"],
      ["Why don't we touch art in a museum?", "Touching can harm it", ["It tastes bad", "It is hot"]],
      ["How do you walk in a museum?", "Slowly", ["Fast, running", "Jumping"]],
      ["A museum is a place for...", "seeing art", ["swimming", "cooking"]],
      ["If you like a painting, you can say...", "It makes me happy!", ["Give it to me!", "Take it down!"]],
      ["You want to take a picture. First you...", "ask if it's okay", ["just do it", "run"]],
      ["After the visit, you can...", "draw what you saw", ["break something", "throw things"]]
    ], ["Think about being careful and kind in a place with special art.", "Walk, whisper and keep your hands to yourself.", "Example: in a museum, you stay quiet. Now do yours."])
  ];
  l3.push(
    MIX("Mixed practice", l3[0], l3[3], l3[6], l3[9]),
    MIX("Level 3 Challenge", l3[1], l3[2], l3[5], l3[7], l3[8], l3[10])
  );

  return { 1: l1, 2: l2, 3: l3 };
})();
