// Mind Lab Geography. Levels 1-3, 20 lessons each (60 lessons). Teach slides, then quiz; every question has 3 hints.
const GEO_LEVELS = (() => {
  // ---------- tiny lesson engine (all inside this IIFE) ----------
  const slide = (h, v, t) => ({ h, v, t });
  const cap = s => s[0].toUpperCase() + s.slice(1);
  const strip = s => String(s).replace(/^(a|an|the)\s+/i, "");
  const first = s => strip(s).replace(/<[^>]+>/g, "")[0].toUpperCase();
  // Bank lesson. items = [name, emoji, clue]; the clue is a verb phrase ("flies in the sky").
  // Questions: clue -> name, name -> clue, picture -> name.
  const BK = o => {
    const it = o.items, hasE = it.every(x => x[1]);
    const qa = o.qa || (c => `Which one ${c}?`), qb = o.qb || (n => `Finish the sentence: ${cap(n)} ...`), qc = o.qc || "What is this?";
    const make = () => {
      const m = pick(hasE ? ["a", "b", "c"] : ["a", "b"]), cur = pick(it), rest = shuf(it.filter(x => x !== cur)), ex = rest[0];
      if (m === "a") return {
        text: qa(cur[2]), choices: shuf([cur[0], rest[1][0], rest[2][0]]), answer: cur[0],
        hints: ["Read the clue again slowly. Which choice matches it best?", `The answer starts with the letter "${first(cur[0])}".`, `Example: ${cap(ex[0])} ${ex[2]}. So if a clue says "${ex[2]}", the answer is ${ex[0]}. Now do yours.`]
      };
      if (m === "b") return {
        text: qb(cur[0]), choices: shuf([cur[2], rest[1][2], rest[2][2]]), answer: cur[2],
        hints: ["Think back to the lesson. What did you learn about this one?", "Cross out the choices that sound like something else. Only one fits.", `Example: ${cap(ex[0])} ${ex[2]}. Now do yours.`]
      };
      return {
        text: qc, visual: cur[1], choices: shuf([cur[0], rest[1][0], rest[2][0]]), answer: cur[0],
        hints: ["Look at the picture closely. What do you see?", `The answer starts with the letter "${first(cur[0])}".`, `Example: ${ex[1]} is ${ex[0]}. Now look at your picture.`]
      };
    };
    make.teach = () => [
      slide(o.title, o.tv || it.slice(0, 3).map(x => x[1] || "").join(" ") || "📚", o.intro),
      slide("Let's learn", it.map(x => (x[1] ? x[1] + " " : "") + `<b>${cap(x[0])}</b> ${x[2]}.`).join("<br>"), o.look || "Read each one slowly."),
      slide("Remember", o.tipv || "💡", o.tip)
    ];
    return make;
  };
  // Multiple-choice lesson. items = [question, right answer, "wrong1|wrong2", optional picture].
  // s = 3 slides [heading, picture, text]. h = 3 hints.
  const MC = o => {
    const make = () => {
      const [q, a, w, v] = pick(o.items), r = { text: q, choices: shuf([a, ...w.split("|")]), answer: a, hints: o.h };
      if (v) r.visual = v;
      return r;
    };
    make.teach = () => o.s.map(x => slide(x[0], x[1], x[2]));
    return make;
  };
  // Mixed lesson built from earlier lessons of the same level.
  const MX = (lessons, idxs) => {
    const ms = idxs.map(i => lessons[i].make), f = () => pick(ms)();
    f.teach = () => [slide("Review time!", "🔄", "This lesson mixes ideas you already learned. Here is a quick reminder of each one, then the quiz.")].concat(ms.map(m => m.teach()[0]));
    return f;
  };
  const LS = (title, make) => ({ title, make });
  const M = (t, s, h, items) => LS(t, MC({ s, h, items }));
  const B = (t, o) => LS(t, BK(Object.assign({ title: t }, o)));

  // ---------- geography makers ----------
  // Flags: list = [country, flag emoji, description]. (Some computers show two letters instead of a flag picture.)
  const FLG = list => {
    const make = () => {
      const m = pick(["a", "b", "c"]), cur = pick(list), rest = shuf(list.filter(x => x !== cur)), ex = rest[0];
      const exh = `Example: ${ex[1]} is the flag of ${ex[0]}, with ${ex[2]}. Now do yours.`;
      if (m === "a") return {
        text: "Which country has this flag?", visual: cur[1], choices: shuf([cur[0], rest[1][0], rest[2][0]]), answer: cur[0],
        hints: ["Look at the colors and shapes. (If you see two letters, they are a short code for the country.)", `The country starts with the letter "${first(cur[0])}".`, exh]
      };
      if (m === "b") return {
        text: `What does the flag of ${cur[0]} look like?`, choices: shuf([cur[2], rest[1][2], rest[2][2]]), answer: cur[2],
        hints: ["Try to picture the flag from the lesson.", "Cross out the choices that sound like other countries' flags.", exh]
      };
      return {
        text: `Which country has a flag with ${cur[2]}?`, choices: shuf([cur[0], rest[1][0], rest[2][0]]), answer: cur[0],
        hints: ["Think about the colors and shapes in the question.", `The country starts with the letter "${first(cur[0])}".`, exh]
      };
    };
    make.teach = () => [
      slide("Country flags", list.slice(0, 4).map(x => x[1]).join(" "), "Every country has its own <b>flag</b>. A flag has special colors and shapes that stand for the country."),
      slide("Let's learn", list.map(x => `${x[1]} <b>${x[0]}</b>: ${x[2]}`).join("<br>"), "If you see two letters instead of a flag, that is the short code for the country."),
      slide("Remember", "💡", "Look for the colors first, then the shapes, like stars, stripes or a circle.")
    ];
    return make;
  };
  // Capitals: list = [country, capital].
  const CAPQ = list => {
    const make = () => {
      const cur = pick(list), rest = shuf(list.filter(x => x !== cur)), ex = rest[0];
      const exh = `Example: the capital of ${ex[0]} is ${ex[1]}. Now do yours.`;
      if (Math.random() < 0.6) return {
        text: `What is the capital of ${cur[0]}?`, choices: shuf([cur[1], rest[1][1], rest[2][1]]), answer: cur[1],
        hints: ["A capital is the city where a country's leaders work.", `The capital starts with the letter "${first(cur[1])}".`, exh]
      };
      return {
        text: `${cur[1]} is the capital of which country?`, choices: shuf([cur[0], rest[1][0], rest[2][0]]), answer: cur[0],
        hints: ["Every country has one main city called its capital.", `The country starts with the letter "${first(cur[0])}".`, exh]
      };
    };
    make.teach = () => [
      slide("Capital cities", "🏛️", "A <b>capital</b> is the main city of a country. It is where the leaders of the country work."),
      slide("Let's learn", list.map(x => `<b>${x[1]}</b> is the capital of ${x[0]}`).join("<br>"), "Say each pair out loud."),
      slide("Remember", "💡", "Capital cities begin with a capital letter, and they are the capital of the country!")
    ];
    return make;
  };
  // Map scale: 1 inch on the map = k miles in real life.
  const SCALE = () => {
    const make = () => {
      const k = pick([2, 5, 10]), n = ri(2, 6);
      if (Math.random() < 0.65) return {
        text: `On a map, 1 inch means ${k} miles. A road is ${n} inches long on the map. How many miles long is the real road?`, answer: n * k,
        hints: ["Each inch on the map stands for the same number of real miles.", `Skip count by ${k}s, one count for each inch. There are ${n} inches.`, "Example: if 1 inch means 3 miles, then 4 inches is 3, 6, 9, 12, so 12 miles. Now do yours."]
      };
      return {
        text: `On a map, 1 inch means ${k} miles. A trip is ${n * k} miles. How many inches long is the trip on the map?`, answer: n,
        hints: ["Each inch on the map stands for the same number of real miles.", `Skip count by ${k}s until you reach ${n * k}. How many counts did it take?`, "Example: if 1 inch means 3 miles and a trip is 12 miles, count 3, 6, 9, 12. That is 4 counts, so 4 inches. Now do yours."]
      };
    };
    make.teach = () => [
      slide("Map scale", "📏", "A map is smaller than the real place. The <b>scale</b> tells you how much real distance each inch on the map stands for."),
      slide("Example", "1 inch = 5 miles", "If 1 inch means 5 miles, then 2 inches mean 10 miles and 3 inches mean 15 miles. Skip count by 5s!"),
      slide("Tip", "💡", "Use a ruler to measure on the map. Then skip count by the scale.")
    ];
    return make;
  };
  // Grid map: columns A-C, rows 1-3.
  const GRID_POOL = [["🌳", "tree"], ["🏠", "house"], ["🏫", "school"], ["⛲", "fountain"], ["🚒", "fire truck"], ["🏪", "store"], ["🌷", "flower"], ["🛝", "slide"], ["📮", "mailbox"], ["🐕", "dog"], ["🚏", "bus stop"]];
  const GRID = () => {
    const make = () => {
      const cells = shuf(GRID_POOL).slice(0, 9), cols = ["A", "B", "C"];
      const html = `<table style="margin:auto;border-collapse:collapse;font-size:26px"><tr><th></th>${cols.map(c => `<th>${c}</th>`).join("")}</tr>` +
        [0, 1, 2].map(r => `<tr><th style="padding:0 8px">${r + 1}</th>${[0, 1, 2].map(c => `<td style="border:1px solid #888;padding:4px 12px;text-align:center">${cells[r * 3 + c][0]}</td>`).join("")}</tr>`).join("") + "</table>";
      const idx = ri(0, 8), code = cols[idx % 3] + (Math.floor(idx / 3) + 1);
      const hints = ["Find the letter across the top (the column). Then find the number down the side (the row).", "The box is where the column and the row meet. Put one finger on the letter and one on the number.", "Example: B3 is where column B and row 3 meet. Slide your fingers until they touch. Now do yours."];
      if (Math.random() < 0.5) {
        const others = shuf(cells.filter((x, i) => i !== idx)).slice(0, 2).map(x => x[1]);
        return { text: `What is in box ${code}?`, visual: html, choices: shuf([cells[idx][1], ...others]), answer: cells[idx][1], hints };
      }
      const codes = shuf([0, 1, 2, 3, 4, 5, 6, 7, 8].filter(i => i !== idx)).slice(0, 2).map(i => cols[i % 3] + (Math.floor(i / 3) + 1));
      return { text: `Which box has the ${cells[idx][1]}?`, visual: html, choices: shuf([code, ...codes]), answer: code, hints };
    };
    make.teach = () => [
      slide("Grid maps", "🗺️", "Some maps have a <b>grid</b>: letters across the top and numbers down the side. A grid helps you find things."),
      slide("Finding a box", "A · B · C / 1 · 2 · 3", "To find box <b>B2</b>, go across to column B, then down to row 2. The place where they meet is box B2."),
      slide("Tip", "💡", "Say the letter first, then the number, like \"B2\".")
    ];
    return make;
  };
  const LFL = (title, items) => M(title, [
    ["Left and right", "⬅️ ➡️", "Your <b>left</b> and <b>right</b> are the two sides of your body. Left hand makes an L shape with your thumb and first finger."],
    ["Up and down", "⬆️ ⬇️", "<b>Up</b> is toward the sky. <b>Down</b> is toward the ground."],
    ["Tip", "💡", "Look at the arrow's point. That is the way it is telling you to go."]],
    ["Look at where the arrow's point is.", "Look at where the arrow's point is, or think about which hand makes an L shape.", "Example: an arrow pointing to the sky means up. Now do yours."], items);

  // ================= LEVEL 1 =================
  const l1 = [
    M("Land and water", [
      ["Land and water", "🌍", "Earth has <b>land</b> and <b>water</b>. Land is the ground, like soil, sand and rock. Water is wet and flows or fills a space."],
      ["Examples", "⛰️ 🌊", "Mountains, deserts and islands are land. Oceans, rivers and lakes are water."],
      ["Tip", "💡", "Ask yourself: could I walk on it, or would I swim in it?"]],
      ["Ask: could you walk on it, or would you swim in it?", "Think of soil, sand and rock. Then think of things that are wet and flow.", "Example: a forest is land because trees grow in the ground. A pool is water. Now do yours."],
      [["Is the ocean land or water?", "Water", "Land", "🌊"], ["Is a mountain land or water?", "Land", "Water", "⛰️"], ["Is a river land or water?", "Water", "Land", "🏞️"], ["Is a desert land or water?", "Land", "Water", "🏜️"],
       ["Is an island land or water?", "Land", "Water", "🏝️"], ["Is a pond land or water?", "Water", "Land", "🦆"], ["Is a beach land or water?", "Land", "Water", "🏖️"]]),
    M("Maps and globes", [
      ["A globe", "🌍", "A <b>globe</b> is a model of Earth. It is shaped like a ball and it can spin."],
      ["A map", "🗺️", "A <b>map</b> is a flat drawing of a place. You can fold it up and take it with you."],
      ["Why use them?", "🔍", "Maps and globes help us find places and see where things are."]],
      ["Think about the shape of each one.", "One of them is round. The other is flat like a page.", "Example: a beach ball is round like a globe, and a poster is flat like a map. Now do yours."],
      [["A globe is shaped like a...", "Ball", "Box|Triangle", "🌍"], ["A map is...", "A flat drawing of a place", "A kind of food|A song", "🗺️"], ["Which one shows the whole Earth as a ball?", "A globe", "A map of a town|A picture book"],
       ["Maps help us...", "Find places", "Bake bread|Fly"], ["A globe can...", "Spin around", "Fold flat|Melt"], ["Which is easier to fold up?", "A map", "A globe|A basketball"], ["Which one is a flat drawing?", "A map", "A globe|A ball"]]),
    B("My neighborhood", { intro: "Your <b>neighborhood</b> is the place around your home. It has homes, shops, schools and parks.", tip: "A neighborhood is where people live, work and play together.",
      items: [["a house", "🏠", "is where you live"], ["a school", "🏫", "is where you learn"], ["a playground", "🛝", "has swings and slides"], ["a store", "🏪", "sells food and things"], ["a library", "📚", "lends books"], ["a fire station", "🚒", "is where firefighters wait to help"]] }),
    M("Near and far", [
      ["Near", "👟", "Something <b>near</b> is close to you. Your shoes are near you."],
      ["Far", "🌙", "Something <b>far</b> is a long way from you. The Moon is far away."],
      ["Tip", "💡", "Close, next to and nearby all mean near. Faraway means far."]],
      ["Is it close to you or a long way away?", "If you can touch it or walk to it quickly, it is near. If it takes a long trip, it is far.", "Example: your hand is near and the other side of the world is far. Now do yours."],
      [["Which is FAR from you?", "The Moon", "Your nose|Your shoes"], ["Which is NEAR you?", "Your desk", "A faraway country|The Moon"], ["A neighbor next door lives...", "Near", "Far|Very far away"],
       ["A different country is usually...", "Far", "Near|Next door"], ["If a place is close, it is...", "Near", "Far|Hidden"], ["Which is FARTHER from your house?", "Another country", "Your yard|Your street"], ["Which is NEAREST?", "Your front door", "Your school across town|Another country"]]),
    LFL("Left, right, up, down", [["Which way does this arrow point?", "Left", "Right", "⬅️"], ["Which way does this arrow point?", "Right", "Left", "➡️"], ["Which way does this arrow point?", "Up", "Down", "⬆️"],
       ["Which way does this arrow point?", "Down", "Up", "⬇️"], ["Which hand makes an L shape with the thumb and first finger?", "Left hand", "Right hand"], ["You turn the page of a book toward the right. Which way do you move?", "Right", "Left", "➡️"], ["A bird flies toward the sky. Which way does it go?", "Up", "Down", "🐦"]]),
    M("Above, below, between", [
      ["Where is it?", "📍", "Words like <b>above</b>, <b>below</b> and <b>between</b> tell us where things are."],
      ["Examples", "🐶 🐱 🐭", "The cat is between the dog and the mouse. The dog is first on the left."],
      ["Tip", "💡", "Above means higher up. Below means lower down. Between means in the middle of two things."]],
      ["Look at where things are placed.", "Above is higher up. Below or under is lower down. Between is in the middle of two things.", "Example: in 🍎🍌🍊 the banana is between the apple and the orange. Now do yours."],
      [["In this row, which animal is in the middle?", "Cat", "Dog|Mouse", "🐶 🐱 🐭"], ["In this row, which is first from the left?", "Dog", "Cat|Mouse", "🐶 🐱 🐭"], ["In this row, which is last on the right?", "Mouse", "Dog|Cat", "🐶 🐱 🐭"],
       ["A kite flies ___ the ground.", "Above", "Below|Under"], ["A mole digs ___ the ground.", "Under", "Above|Over"], ["A rug is ___ your feet.", "Under", "Above|Over"], ["A lamp hangs ___ a table.", "Above", "Under|Below"]]),
    M("North, south, east, west", [
      ["Four directions", "🧭", "The four main directions are <b>north</b>, <b>south</b>, <b>east</b> and <b>west</b>. A compass shows them."],
      ["On a map", "⬆️ N", "On most maps, north is at the top and south is at the bottom. East is on the right and west is on the left."],
      ["The sun", "🌅", "The sun rises in the east and sets in the west."]],
      ["Think of a map. Which way is each direction?", "Picture a map with a compass rose on it. Say the four directions around it, one after the other.", "Example: on a map, the direction opposite to north is south. Now do yours."],
      [["On most maps, north is at the...", "Top", "Bottom|Left"], ["On most maps, south is at the...", "Bottom", "Top|Right"], ["The sun rises in the...", "East", "West|South"], ["The sun sets in the...", "West", "East|North"],
       ["The opposite of north is...", "South", "East|West"], ["The opposite of east is...", "West", "North|South"], ["On most maps, east is on the...", "Right", "Left|Top"]]),
    B("Landforms", { intro: "The land on Earth has many shapes. We call them <b>landforms</b>. Water can have shapes too.", tip: "Look at the shape and what is around it.",
      items: [["a mountain", "⛰️", "is very high land with a peak"], ["an island", "🏝️", "is land with water all around"], ["a desert", "🏜️", "is dry land with very little rain"], ["a river", "🏞️", "is water that flows across the land"], ["an ocean", "🌊", "is a huge body of salty water"], ["a beach", "🏖️", "is sandy land beside the water"]] }),
    B("Weather", { intro: "<b>Weather</b> is what the air outside is like today. It can change from day to day.", tip: "Look outside and ask: what is the weather like?",
      items: [["sunny weather", "☀️", "is bright and warm"], ["rainy weather", "🌧️", "has drops falling from clouds"], ["snowy weather", "❄️", "has cold white flakes falling"], ["windy weather", "💨", "moves trees and flies kites"], ["cloudy weather", "☁️", "has clouds covering the sky"]] }),
    M("Seven continents", [
      ["Continents", "🌎", "A <b>continent</b> is a huge area of land. Earth has <b>7 continents</b>."],
      ["The seven", "🌍", "Africa · Antarctica · Asia · Australia · Europe · North America · South America"],
      ["Tip", "💡", "Continents are land. Oceans are water."]],
      ["Think about the huge pieces of land on Earth.", "Continents are land. Oceans, rivers and cities are not continents.", "Example: South America is a continent, and the Atlantic is not, because the Atlantic is water. Now do yours."],
      [["How many continents are on Earth?", "7", "5|10"], ["A continent is...", "A huge area of land", "A small pond|A kind of cloud"], ["Which one is a continent?", "Africa", "Pacific|Nile"], ["Which one is a continent?", "Asia", "Atlantic|Paris"],
       ["Which one is a continent?", "Europe", "Mexico City|Pacific"], ["Which continent is covered in ice at the bottom of Earth?", "Antarctica", "Africa|Asia", "🧊"], ["Which continent has kangaroos?", "Australia", "Europe|Antarctica", "🦘"], ["Which one is a continent?", "North America", "Pacific|Sahara"]]),
    M("Five oceans", [
      ["Oceans", "🌊", "An <b>ocean</b> is a huge body of salty water. Earth has <b>5 oceans</b>."],
      ["The five", "🌊", "Pacific · Atlantic · Indian · Southern · Arctic. The Pacific is the biggest."],
      ["Tip", "💡", "Oceans are water. Continents are land."]],
      ["Think: oceans are water, continents are land.", "The names of the oceans do not end like the names of continents. Think of the big water on a globe.", "Example: the Southern Ocean is an ocean, and South America is a continent. Now do yours."],
      [["How many oceans are on Earth?", "5", "7|3"], ["Ocean water is...", "Salty", "Sweet|Sour"], ["Which is an ocean?", "Pacific", "Asia|Africa"], ["Which is an ocean?", "Atlantic", "Europe|Antarctica"],
       ["The biggest ocean is the...", "Pacific", "Arctic|Indian"], ["An ocean is made of...", "Salt water", "Sand|Ice cream"], ["Which is an ocean?", "Indian", "Mexico|Australia"], ["Which is an ocean?", "Arctic", "North America|Egypt"]]),
    M("Planet Earth", [
      ["Our planet", "🌍", "Earth is a <b>planet</b>. It is shaped like a ball and it floats in space."],
      ["Water and land", "🌊 🏝️", "Most of Earth is covered with water. The rest is land, where we live."],
      ["Sun and Moon", "☀️ 🌙", "The Sun gives Earth light and heat. The Moon goes around the Earth."]],
      ["Think about what you know about our planet.", "Earth is a round ball in space. Think about what covers most of it and what lights it up.", "Example: Mars is a planet too, but we live on Earth. Now do yours."],
      [["Earth is a...", "Planet", "Star|Cloud", "🌍"], ["Earth is shaped like a...", "Ball", "Flat plate|Cube"], ["Most of Earth is covered by...", "Water", "Sand|Ice"], ["What goes around the Earth?", "The Moon", "The Sun|A cloud", "🌙"],
       ["What gives Earth light and heat?", "The Sun", "The Moon|A cloud", "☀️"], ["It is daytime on the side of Earth that faces the...", "Sun", "Moon|Clouds"], ["Earth is our...", "Home planet", "Toy|Lunchbox"]]),
    M("Map symbols", [
      ["Maps use pictures", "🗺️", "A <b>symbol</b> is a small picture on a map that stands for something real. A map key tells you what each symbol means."],
      ["Colors", "💙 💚", "On many maps, blue shows water and green shows grass, parks or forests."],
      ["Compass rose", "🧭", "A <b>compass rose</b> on a map shows north, south, east and west."]],
      ["Look at the map's key to see what a symbol means.", "A map key explains the symbols. The colors often follow the same patterns.", "Example: a little picture of a tree on a map can stand for a forest. Now do yours."],
      [["On many maps, blue shows...", "Water", "Sand|Grass"], ["On many maps, green shows...", "Land with plants or parks", "Water|Snow"], ["A map key shows...", "What the map symbols mean", "The weather|The time"],
       ["A compass rose shows...", "Directions", "Prices|Colors", "🧭"], ["A star on a map often marks a...", "Capital city", "Pond|Bakery", "⭐"], ["The title of a map tells you...", "What the map is about", "Who made lunch|The day"], ["A symbol on a map is a...", "Small picture for something real", "Real mountain|Giant sign"]]),
    B("Where people live", { intro: "People live in many kinds of places. Some live in busy cities and some live far from other people.", tip: "People live where they can find food, water and a home.",
      items: [["a city", "🏙️", "has tall buildings and many people"], ["a town", "🏘️", "is smaller than a city"], ["a farm", "🚜", "has fields where food grows"], ["an island", "🏝️", "has water all around it"]] }),
    B("Homes around the world", { intro: "Homes look different in different places. Each home keeps people safe from weather.", tip: "A home gives shelter, but not all homes look alike.",
      items: [["an apartment", "🏢", "is one home inside a big building"], ["a farmhouse", "🏡", "is a home on a farm"], ["a houseboat", "🛥️", "floats on the water"], ["a tent", "⛺", "is a home you can carry and set up anywhere"], ["a cabin", "🛖", "is a small wooden home"]] }),
    LS("Flags", FLG([["United States", "🇺🇸", "red and white stripes and white stars on blue"], ["Canada", "🇨🇦", "a red maple leaf on white with red sides"], ["Mexico", "🇲🇽", "green, white and red stripes with an eagle in the middle"],
       ["Japan", "🇯🇵", "a red circle on white"], ["Brazil", "🇧🇷", "a yellow diamond and a blue circle on green"], ["France", "🇫🇷", "blue, white and red stripes"]])),
    M("Countries", [
      ["What is a country?", "🏳️", "A <b>country</b> is a land with its own people, laws and flag. Our world has almost 200 countries."],
      ["Examples", "🇨🇦 🇲🇽 🇯🇵", "Canada, Mexico and Japan are all countries. Africa and Asia are continents, and each has many countries."],
      ["Tip", "💡", "A continent holds many countries. A country is smaller than a continent."]],
      ["Think about the size of a country.", "Countries are parts of continents. Oceans and continents are not countries.", "Example: France is a country in the continent of Europe. Now do yours."],
      [["A country is...", "A land with its own people, laws and flag", "A kind of weather|A pond"], ["Our world has many...", "Countries", "Moons|Sunsets"], ["Every country has its own...", "Flag", "Pizza|Ocean"],
       ["Which is a country?", "Canada", "Asia|Atlantic"], ["Which is a country?", "Mexico", "Africa|Pacific"], ["Which is a country?", "Japan", "Europe|Arctic"], ["A continent holds many...", "Countries", "Moons|Clouds"]]),
    M("Hot and cold places", [
      ["Different weather", "🔥 ❄️", "Some places are very hot and some are very cold. Deserts are hot and dry. The North Pole and South Pole are icy and cold."],
      ["What to wear", "🧥 🕶️", "In a cold place we wear warm coats. In a hot place we wear light clothes and sun hats."],
      ["Animals", "🐪 🐧", "Camels live in hot deserts. Penguins live in cold places."]],
      ["Think about hot places and cold places.", "Ice and snow mean cold. Sand and sun mean hot.", "Example: a snowy mountain is cold, so you would wear a coat. Now do yours."],
      [["Which place is usually very hot and dry?", "A desert", "The North Pole|A glacier"], ["Which place is usually icy and cold?", "The South Pole", "A desert|A beach"], ["What should you wear in a snowy place?", "A warm coat", "Swim trunks|Sandals"],
       ["What should you wear at a hot sunny beach?", "A sun hat", "A snow suit|Big boots"], ["Polar bears live where it is...", "Cold", "Hot|Dry and sandy"], ["Camels live in...", "Hot deserts", "Icy poles|Cold oceans"], ["A rainforest is...", "Warm and wet", "Cold and dry|Icy"]])
  ];
  l1.push(LS("Mixed practice", MX(l1, [0, 1, 3, 6, 7])));
  l1.push(LS("Level 1 Challenge", MX(l1, [2, 8, 9, 10, 11, 12, 15, 16])));

  // ================= LEVEL 2 =================
  const CONT = [["Africa", "", "is the continent with Egypt and the Sahara desert"], ["Antarctica", "", "is the icy continent at the very bottom of Earth"], ["Asia", "", "is the biggest continent, with China and India"], ["Australia", "", "is a continent and a country where kangaroos live"],
    ["Europe", "", "has France, Italy and Greece"], ["North America", "", "has the United States, Canada and Mexico"], ["South America", "", "has Brazil and the Amazon rainforest"]];
  const l2 = [
    B("Continents, part 1", { intro: "Let's learn about four of the seven continents.", tv: "🌍 🌏", tip: "Each continent has its own countries, animals and weather.", items: CONT.slice(0, 4) }),
    B("Continents, part 2", { intro: "Now meet three more continents. Two of them have 'America' in their name!", tv: "🌎", tip: "North America and South America are two different continents.", items: CONT.slice(4).concat([CONT[2]]) }),
    M("All seven continents", [
      ["Seven in all", "🌍 🌎 🌏", "Africa, Antarctica, Asia, Australia, Europe, North America and South America."],
      ["Big and small", "📏", "<b>Asia</b> is the biggest continent. <b>Australia</b> is the smallest continent."],
      ["Where countries are", "📍", "Egypt is in Africa. Japan is in Asia. France is in Europe. Canada is in North America. Brazil is in South America."]],
      ["Think about where each country or feature is on a globe.", "Each country is on one continent. Think about the lesson on the seven continents.", "Example: Italy is in Europe. Now do yours."],
      [["Which is the biggest continent?", "Asia", "Europe|Africa"], ["Which is the smallest continent?", "Australia", "Asia|Africa"], ["Which continent is covered in ice?", "Antarctica", "Africa|Europe"], ["Egypt is in the continent of...", "Africa", "Asia|Europe"],
       ["Brazil is in the continent of...", "South America", "North America|Europe"], ["The United States is in the continent of...", "North America", "South America|Europe"], ["France is in the continent of...", "Europe", "Asia|Africa"], ["Japan is in the continent of...", "Asia", "Europe|Africa"]]),
    B("The five oceans", { intro: "Oceans are the biggest bodies of water. They cover most of Earth.", tv: "🌊 🌊 🌊", tip: "Say the five oceans in order from biggest: Pacific, Atlantic, Indian, Southern, Arctic.",
      items: [["the Pacific Ocean", "", "is the biggest ocean on Earth"], ["the Atlantic Ocean", "", "lies between the Americas and Europe and Africa"], ["the Indian Ocean", "", "touches India, Africa and Australia"], ["the Southern Ocean", "", "surrounds Antarctica"], ["the Arctic Ocean", "", "is the icy ocean at the top of Earth"]] }),
    M("Ocean facts", [
      ["Salty water", "🧂 🌊", "Ocean water is <b>salty</b>. You cannot drink it. Rivers and most lakes have fresh water."],
      ["Big and small", "📏", "The <b>Pacific</b> is the biggest ocean. The <b>Arctic</b> is the smallest."],
      ["Life in the ocean", "🐋 🐠", "Oceans are home to whales, fish, turtles and many other animals."]],
      ["Think about what you learned about oceans.", "Oceans are big, salty and full of life. They have names you have learned.", "Example: the Atlantic is east of the United States. Now do yours."],
      [["Which ocean is the biggest?", "Pacific", "Arctic|Indian"], ["Which ocean is icy and at the top of Earth?", "Arctic", "Indian|Atlantic"], ["Which ocean is between the Americas and Europe?", "Atlantic", "Indian|Arctic"],
       ["Which ocean touches India?", "Indian", "Arctic|Pacific"], ["Which ocean is around Antarctica?", "Southern", "Atlantic|Arctic"], ["How many oceans are there?", "5", "3|7"], ["Ocean water tastes...", "Salty", "Sweet|Sour"]]),
    B("More landforms", { intro: "There are many more shapes of land. Each one has its own name.", tip: "Landforms are shaped by wind, water and time.",
      items: [["a valley", "🌄", "is low land between hills or mountains"], ["a plain", "🌾", "is wide, flat land"], ["a hill", "🌳", "is a rounded piece of land, smaller than a mountain"], ["a canyon", "🪨", "is a deep valley with steep sides"], ["a volcano", "🌋", "is a mountain with an opening at the top"]] }),
    B("Bodies of water", { intro: "Water covers much of Earth. It comes in many sizes.", tip: "Oceans and seas are salty. Most rivers and lakes are fresh water.",
      items: [["an ocean", "🌊", "is a huge body of salty water"], ["a lake", "🛶", "is water with land all around it"], ["a river", "🏞️", "flows across the land toward the sea"], ["a pond", "🦆", "is a small, still body of water"], ["a waterfall", "💦", "is where a river drops over a high edge"]] }),
    M("Directions on a map", [
      ["Between directions", "🧭", "Between north and east is <b>northeast</b>. Between south and west is <b>southwest</b>."],
      ["Facing north", "⬆️", "If you face north, east is on your right and west is on your left."],
      ["Tip", "💡", "Point your arm toward the sunrise. That is east."]],
      ["Picture a compass with N at the top.", "Picture a compass with N at the top. Turn your body to face the way the question says.", "Example: if you face north, east is on your right. Now do yours."],
      [["If you face north, east is on your...", "Right", "Left|Back"], ["If you face north, west is on your...", "Left", "Right|Front"], ["Which direction is between north and east?", "Northeast", "Southwest|Northwest"],
       ["Which direction is between south and west?", "Southwest", "Northeast|Southeast"], ["If you walk toward the sunset, which way are you going?", "West", "East|North"], ["If you face south, what is behind you?", "North", "East|West"], ["The opposite of southeast is...", "Northwest", "Northeast|Southwest"]]),
    B("Parts of a map", { intro: "Maps have helpful parts. Learn these and you can read any map.", tv: "🗺️ 🧭 🔑", tip: "Always look at the title, the key and the compass rose first.",
      items: [["a map key", "🗝️", "tells what the symbols mean"], ["a compass rose", "🧭", "shows north, south, east and west"], ["a map title", "🏷️", "tells what the map is about"], ["a map scale", "📏", "shows how far real distances are"], ["a map symbol", "⭐", "is a small picture that stands for something real"]] }),
    M("Globes and maps", [
      ["Globe or map?", "🌍 🗺️", "A <b>globe</b> shows Earth's real shape. A <b>map</b> is flat and easy to carry."],
      ["The Equator", "➖", "The <b>Equator</b> is an imaginary line around the middle of Earth. It splits Earth into the north half and the south half."],
      ["The poles", "🧊", "The <b>North Pole</b> is at the very top of Earth. The <b>South Pole</b> is at the very bottom."]],
      ["Think about what the line or place looks like on a globe.", "The Equator is in the middle. The poles are at the ends.", "Example: the North Pole is at the top, so the South Pole is at the bottom. Now do yours."],
      [["The Equator is an imaginary line around the...", "Middle of Earth", "Top of Earth|Moon"], ["The North Pole is at the...", "Top of Earth", "Bottom of Earth|Middle"], ["The South Pole is at the...", "Bottom of Earth", "Top of Earth|Middle"],
       ["Which shows Earth's real shape?", "A globe", "A flat map|A poster"], ["Which is easiest to carry in a backpack?", "A map", "A globe|A beach"], ["The Equator splits Earth into the north and the...", "South", "East|Top"], ["Is the Equator a real line on the ground?", "No, it is imaginary", "Yes, it is painted|Yes, it is a fence"]]),
    M("Poles and the Equator", [
      ["Hot and cold", "🔥 ❄️", "Places near the <b>Equator</b> are hot most of the year. Places near the <b>poles</b> are very cold."],
      ["Why?", "☀️", "The sun shines more straight down at the Equator, so it warms the land more. At the poles, the sunlight is weaker."],
      ["Tip", "💡", "Hot in the middle, cold at the ends."]],
      ["Think about where it is warm and where it is cold.", "The middle of Earth is warm. The top and bottom of Earth are cold.", "Example: a place near the North Pole is cold, so it has lots of ice. Now do yours."],
      [["Places near the Equator are usually...", "Hot", "Icy|Frozen"], ["Places near the poles are usually...", "Very cold", "Hot|Jungle"], ["Where would you find penguins and ice?", "Near the South Pole", "At the Equator|In a desert", "🐧"], ["Where would you find a hot rainforest?", "Near the Equator", "At the North Pole|At the South Pole", "🌴"],
       ["Which is colder?", "The poles", "The Equator|A beach"], ["Which is hotter?", "The Equator", "The poles|A glacier"], ["Polar bears live near the...", "North Pole", "Equator|Sahara", "🐻‍❄️"]]),
    B("Climates", { intro: "<b>Climate</b> is the usual weather of a place over many years. Different places have different climates.", tip: "Climate decides which plants and animals live in a place.",
      items: [["a desert", "🏜️", "has very little rain"], ["a rainforest", "🌴", "is warm and rainy with many tall trees"], ["a polar region", "🧊", "is icy and very cold"], ["a grassland", "🌾", "has lots of grass and few trees"]] }),
    M("Animals around the world", [
      ["Homes of animals", "🐧 🦘 🐼", "Animals live where they can find food and the right weather."],
      ["Where?", "🌍", "Penguins live near Antarctica. Kangaroos live in Australia. Giant pandas live in China. Lions live in Africa. Polar bears live in the Arctic."],
      ["Tip", "💡", "Each animal fits its home. Penguins like the cold. Camels like the heat."]],
      ["Think about the weather where each animal lives.", "Animals live in places that match their needs. Think about hot, cold, and wet.", "Example: camels live in hot deserts. Now do yours."],
      [["Which animal lives in Antarctica?", "Penguin", "Lion|Kangaroo", "🐧"], ["Kangaroos live in...", "Australia", "Canada|Egypt", "🦘"], ["Giant pandas live in...", "China", "Brazil|Egypt", "🐼"],
       ["Lions live in...", "Africa", "Antarctica|Australia", "🦁"], ["Polar bears live near the...", "North Pole", "Equator|Amazon", "🐻‍❄️"], ["Llamas live in the mountains of...", "South America", "Antarctica|Europe", "🦙"], ["Camels live in...", "Hot deserts", "Icy poles|Oceans", "🐪"]]),
    LS("More flags", FLG([["United Kingdom", "🇬🇧", "red, white and blue crosses"], ["Italy", "🇮🇹", "green, white and red stripes standing up"], ["Germany", "🇩🇪", "black, red and gold stripes"], ["Spain", "🇪🇸", "red and yellow stripes"],
       ["China", "🇨🇳", "a big yellow star and small stars on red"], ["India", "🇮🇳", "orange, white and green stripes with a blue wheel"], ["Australia", "🇦🇺", "a blue flag with white stars and a small Union Jack"], ["Egypt", "🇪🇬", "red, white and black stripes with a golden eagle"]])),
    B("Famous places", { intro: "Some buildings and places are famous all over the world. People travel far to see them.", tip: "Landmarks help us remember a place.",
      qc: "Which landmark goes with this picture?",
      items: [["the Eiffel Tower", "🗼", "is a tall iron tower in Paris, France"], ["the Statue of Liberty", "🗽", "stands in New York, USA"], ["the Pyramids", "🔺", "are huge stone buildings in Egypt"], ["the Great Wall", "🧱", "is a very long wall in China"], ["the Taj Mahal", "🕌", "is a white marble building in India"], ["the Sydney Opera House", "🎭", "is a building with curved roofs in Australia"]] }),
    B("Natural wonders", { intro: "Nature has made some amazing places. Many are very big, very tall or very old.", tip: "Natural wonders are made by nature, not by people.",
      qc: "Which natural wonder goes with this picture?",
      items: [["the Grand Canyon", "🏜️", "is a giant canyon in Arizona, USA"], ["Mount Everest", "🏔️", "is the tallest mountain above sea level, in Asia"], ["Niagara Falls", "💦", "is a huge waterfall between Canada and the USA"], ["the Amazon rainforest", "🌳", "is the biggest rainforest, in South America"], ["the Sahara", "🐪", "is the biggest hot desert, in Africa"], ["the Great Barrier Reef", "🐠", "is a huge coral reef near Australia"]] }),
    M("The four seasons", [
      ["Four seasons", "🌸 ☀️ 🍂 ❄️", "Many places have four <b>seasons</b>: spring, summer, fall and winter. They come in the same order every year."],
      ["What each is like", "🌷 🏖️ 🍁 ⛄", "Spring is rainy and flowers grow. Summer is the warmest. In fall, leaves change color and fall. Winter is the coldest."],
      ["Tip", "💡", "Winter is followed by spring, and then the seasons go around again."]],
      ["Think about the weather in each season.", "Picture a year as a circle. The seasons go around and around in the same order.", "Example: after summer comes fall. Now do yours."],
      [["Which season comes after winter?", "Spring", "Summer|Fall"], ["Which season comes after spring?", "Summer", "Winter|Fall"], ["Which season comes after summer?", "Fall", "Winter|Spring"], ["Which season comes after fall?", "Winter", "Spring|Summer"],
       ["In which season do leaves change color and fall?", "Fall", "Spring|Summer", "🍂"], ["Which season is usually the warmest?", "Summer", "Winter|Fall", "☀️"], ["In which season is it usually snowy?", "Winter", "Summer|Spring", "⛄"], ["How many seasons are there?", "4", "2|6"]]),
    LS("Capital cities", CAPQ([["the United States", "Washington, D.C."], ["Canada", "Ottawa"], ["Mexico", "Mexico City"], ["the United Kingdom", "London"], ["France", "Paris"], ["Japan", "Tokyo"], ["Italy", "Rome"], ["Egypt", "Cairo"]]))
  ];
  l2.push(LS("Mixed practice", MX(l2, [0, 3, 6, 9, 11])));
  l2.push(LS("Level 2 Challenge", MX(l2, [1, 2, 4, 7, 10, 12, 14, 15])));

  // ================= LEVEL 3 =================
  const l3 = [
    M("Continent facts", [
      ["Continent facts", "🌍", "<b>Asia</b> has the most people. <b>Africa</b> has the biggest hot desert, the Sahara. <b>Antarctica</b> is the coldest, and almost nobody lives there."],
      ["More facts", "🏔️ 🌳", "<b>South America</b> has the Amazon rainforest and the Andes mountains. <b>Europe</b> is small but has many countries. <b>Australia</b> is the smallest continent."],
      ["Tip", "💡", "Link each continent to one big fact."]],
      ["Think about the one big fact for each continent.", "Match a feature with its continent. Picture it on a globe.", "Example: the Rocky Mountains are in North America. Now do yours."],
      [["Which continent has the most people?", "Asia", "Antarctica|Australia"], ["The Sahara desert is in...", "Africa", "Europe|South America"], ["The Amazon rainforest is in...", "South America", "Africa|Europe"],
       ["The Andes mountains are in...", "South America", "Asia|Australia"], ["Which continent is the coldest?", "Antarctica", "Asia|Africa"], ["Which continent is the smallest?", "Australia", "Europe|Asia"], ["The Rocky Mountains are in...", "North America", "Europe|Asia"], ["Mount Everest is in...", "Asia", "Europe|Africa"]]),
    M("Countries and continents", [
      ["Each country has a home", "📍", "Every country is on a continent. Kenya and Nigeria are in Africa. India is in Asia. Peru and Argentina are in South America."],
      ["More", "🌍", "Italy is in Europe. Canada is in North America. Egypt is in Africa."],
      ["Tip", "💡", "Think of a globe and find the country on a continent."]],
      ["Think about where the country is on a globe.", "Match each country to the continent it is on.", "Example: Spain is in Europe. Now do yours."],
      [["Kenya is in...", "Africa", "Asia|Europe"], ["India is in...", "Asia", "Africa|Europe"], ["Peru is in...", "South America", "North America|Europe"], ["Italy is in...", "Europe", "Asia|Africa"],
       ["Canada is in...", "North America", "South America|Europe"], ["Argentina is in...", "South America", "Africa|Asia"], ["Nigeria is in...", "Africa", "Asia|North America"], ["Mexico is in...", "North America", "South America|Europe"]]),
    LS("More capitals", CAPQ([["Spain", "Madrid"], ["Germany", "Berlin"], ["China", "Beijing"], ["India", "New Delhi"], ["Brazil", "Brasília"], ["Australia", "Canberra"], ["Argentina", "Buenos Aires"], ["Kenya", "Nairobi"], ["Peru", "Lima"], ["South Korea", "Seoul"]])),
    LS("Even more flags", FLG([["South Korea", "🇰🇷", "a white flag with a red and blue circle and black bars"], ["Argentina", "🇦🇷", "light blue and white stripes with a sun"], ["Greece", "🇬🇷", "blue and white stripes with a cross"], ["Sweden", "🇸🇪", "a blue flag with a yellow cross"],
       ["Kenya", "🇰🇪", "black, red and green stripes with a shield"], ["New Zealand", "🇳🇿", "a blue flag with red stars and a small Union Jack"], ["Peru", "🇵🇪", "red, white and red upright stripes"], ["South Africa", "🇿🇦", "many colors joined in a sideways Y shape"]])),
    M("Hemispheres", [
      ["Halves of Earth", "🌍", "The <b>Equator</b> splits Earth into the <b>Northern Hemisphere</b> and the <b>Southern Hemisphere</b>. \"Hemi\" means half."],
      ["East and west", "⬅️ ➡️", "Another imaginary line, the <b>Prime Meridian</b>, splits Earth into the Eastern and Western Hemispheres."],
      ["Seasons", "🌞 ❄️", "When it is summer in the Northern Hemisphere, it is winter in the Southern Hemisphere."]],
      ["Think about the line and the halves.", "One imaginary line splits Earth into top and bottom halves. A different line splits it into left and right halves.", "Example: the line that splits Earth into east and west is the Prime Meridian. Now do yours."],
      [["The Equator splits Earth into the Northern and the...", "Southern Hemisphere", "Eastern Hemisphere|Western Hemisphere"], ["\"Hemi\" means...", "Half", "Whole|Double"], ["The Prime Meridian splits Earth into east and...", "West", "North|South"],
       ["The United States is in the...", "Northern Hemisphere", "Southern Hemisphere|Equator"], ["Australia is in the...", "Southern Hemisphere", "Northern Hemisphere|Arctic"], ["When it is summer in the Northern Hemisphere, it is ___ in the Southern.", "Winter", "Summer|Spring"], ["The line around the middle of Earth is the...", "Equator", "Prime Meridian|Pole"]]),
    LS("Map scale", SCALE()),
    LS("Grid maps", GRID()),
    M("Turning and directions", [
      ["Turning", "↪️", "When you turn <b>right</b> from north, you face east. When you turn <b>left</b> from north, you face west."],
      ["Going around", "🧭", "North, east, south, west go clockwise, like the hands of a clock."],
      ["Tip", "💡", "Imagine you are standing on the compass, and turn your body."]],
      ["Picture yourself standing on a compass.", "Turning right goes the same way as the hands of a clock. Turning left goes the opposite way.", "Example: if you face west and turn right, you face north. Now do yours."],
      [["You face north and turn right. Which way do you face?", "East", "West|South"], ["You face north and turn left. Which way do you face?", "West", "East|South"], ["You face east and turn right. Which way do you face?", "South", "North|West"],
       ["You face south and turn left. Which way do you face?", "East", "West|North"], ["You face south and turn right. Which way do you face?", "West", "East|North"], ["You face east and turn left. Which way do you face?", "North", "South|West"]]),
    B("Landform review", { intro: "Let's learn some more words for the shapes of land and sea.", tv: "⛰️ 🏝️ 🌊", tip: "Landforms are all around us, even if you cannot see them from your house.",
      items: [["a plateau", "", "is high, flat land"], ["a peninsula", "", "is land with water on three sides"], ["a bay", "", "is part of the sea that curves into the land"], ["a coast", "", "is the land next to the sea"], ["a mountain range", "", "is a long line of mountains"]] }),
    B("Famous rivers and lakes", { intro: "Rivers and lakes give people water to drink, fish to eat, and a way to travel.", tv: "🏞️ 🛶", tip: "Many big cities grew up beside rivers.",
      items: [["the Nile", "", "is a very long river in Africa"], ["the Amazon River", "", "is a huge river in South America"], ["the Mississippi River", "", "is a big river in the United States"], ["the Yangtze River", "", "is a very long river in China"], ["the Great Lakes", "", "are five large lakes between Canada and the United States"]] }),
    B("Mountains and deserts", { intro: "Some mountains and deserts are famous around the world.", tv: "🏔️ 🏜️", tip: "Mountains and deserts are found on almost every continent.",
      items: [["Mount Everest", "", "is the tallest mountain above sea level, in Asia"], ["the Rocky Mountains", "", "stretch across western North America"], ["the Alps", "", "are a mountain range in Europe"], ["the Andes", "", "are a long mountain range in South America"], ["the Sahara", "", "is the biggest hot desert, in Africa"]] }),
    M("Climate and seasons", [
      ["What is climate?", "🌡️", "<b>Climate</b> is the usual weather of a place over many years."],
      ["Places differ", "🏜️ 🌴 🧊", "Some places are hot and dry, some are warm and wet, and some are icy."],
      ["Seasons", "🌸 ☀️ 🍂 ❄️", "Many places have four seasons: spring, summer, fall and winter. Near the Equator it stays warm all year."]],
      ["Think about the usual weather of a place.", "Climate stays about the same for many years. The weather can change day to day.", "Example: a desert usually has little rain, so it has a dry climate. Now do yours."],
      [["Climate is the usual weather of a place over...", "Many years", "One minute|One hour"], ["A desert climate is...", "Hot and dry", "Cold and wet|Always snowy"], ["A rainforest climate is...", "Warm and rainy", "Cold and dry|Icy"],
       ["Near the Equator it is warm...", "All year", "Only in spring|Only at night"], ["How many seasons do many places have?", "4", "2|7"], ["Which season is usually the coldest?", "Winter", "Summer|Spring"], ["Which season has the longest days?", "Summer", "Winter|Fall"]]),
    M("Weather and climate", [
      ["Weather", "🌦️", "<b>Weather</b> is what it is like outside today. It can change quickly."],
      ["Climate", "📅", "<b>Climate</b> is the pattern of weather over many years."],
      ["Tip", "💡", "Weather is what you get today. Climate is what you expect over the years."]],
      ["Think about time. Is it about today or many years?", "Ask: is this about right now, or about the usual pattern over many years?", "Example: \"It rained this morning\" is weather. \"This place gets lots of rain every year\" is climate. Now do yours."],
      [["\"It is raining today.\" Is this weather or climate?", "Weather", "Climate"], ["\"Deserts are dry year after year.\" Is this weather or climate?", "Climate", "Weather"], ["\"It is snowing right now.\" Is this weather or climate?", "Weather", "Climate"],
       ["\"The Arctic is cold all year.\" Is this weather or climate?", "Climate", "Weather"], ["\"Yesterday was windy.\" Is this weather or climate?", "Weather", "Climate"], ["\"Rainforests are warm and rainy.\" Is this weather or climate?", "Climate", "Weather"]]),
    B("Natural resources", { intro: "<b>Natural resources</b> are things from nature that people use every day.", tip: "Take care of natural resources so there is enough for everyone.",
      items: [["water", "💧", "is something we drink and use to wash"], ["soil", "🌱", "is where plants grow"], ["trees", "🌳", "give us wood and paper"], ["sunlight", "☀️", "can be turned into solar power"], ["wind", "💨", "can turn windmills to make power"]] }),
    M("How people use land", [
      ["Land has jobs", "🚜 🏙️ ⚓", "People use land in different ways. Farmers use flat land with good soil. Cities grow where many people can live and work."],
      ["Ports", "🚢", "A <b>port</b> is a place by the water where ships load and unload."],
      ["Tip", "💡", "People build homes and towns near water, food and ways to travel."]],
      ["Think about what people need from the land.", "People need water, food and a way to travel. Think about which place fits.", "Example: farmers grow food in flat fields with good soil. Now do yours."],
      [["A port is a place where...", "Ships load and unload", "Planes fly|Kids play ball"], ["Farmers like land that is...", "Flat with good soil", "Icy and rocky|Under water"], ["Many cities grow near...", "Rivers or the sea", "Deserts with no water|The top of tall mountains"],
       ["Which place is best for growing food?", "A flat field with rich soil", "Sandy desert|Frozen ice"], ["A bridge helps people cross...", "A river", "A cloud|A rainbow"], ["Why do people live near water?", "They need it to drink and use", "They do not like land|They want fish only"]]),
    B("Landmarks of the world", { intro: "There are famous places on every continent. People visit them to learn and to have fun.", tip: "Match each landmark to its country.",
      qc: "Which landmark goes with this picture?",
      items: [["Machu Picchu", "⛰️", "is an old mountain city in Peru"], ["Stonehenge", "🪨", "is a circle of huge stones in England"], ["the Golden Gate Bridge", "🌉", "is a red bridge in San Francisco, USA"], ["the CN Tower", "🗼", "is a very tall tower in Toronto, Canada"], ["Mount Fuji", "🗻", "is a famous snowy mountain in Japan"]] }),
    M("Where is it?", [
      ["Neighbors", "🧭", "Countries and oceans have neighbors. Canada is north of the United States. Mexico is south of the United States."],
      ["Oceans", "🌊", "The Atlantic Ocean is on the east side of the United States. The Pacific Ocean is on the west side."],
      ["Tip", "💡", "Use north, south, east and west to say where a place is."]],
      ["Picture a map of North America.", "Use the directions: north is up, south is down, east is right, west is left.", "Example: on a map of Europe, Spain is south-west of France. Now do yours."],
      [["Which country is north of the United States?", "Canada", "Mexico|Brazil"], ["Which country is south of the United States?", "Mexico", "Canada|Greenland"], ["Which ocean is on the east coast of the United States?", "Atlantic", "Pacific|Indian"],
       ["Which ocean is on the west coast of the United States?", "Pacific", "Atlantic|Arctic"], ["Spain is next to which country?", "Portugal", "Japan|Egypt"], ["Which continent is north of Africa, across a sea?", "Europe", "Antarctica|South America"], ["Egypt is on the continent of...", "Africa", "Europe|Asia"]]),
    M("Caring for our Earth", [
      ["Our home", "🌍 💚", "Earth is our home. We can all help to take care of it."],
      ["Three Rs", "♻️", "<b>Reduce</b> (use less), <b>Reuse</b> (use again) and <b>Recycle</b> (make old things into new ones)."],
      ["More ways", "💧 🌳", "Save water, turn off lights, plant trees and keep parks clean."]],
      ["Think about what helps nature.", "Ask: does this save things or waste things?", "Example: turning off a light when you leave saves power. Now do yours."],
      [["Which one helps take care of Earth?", "Recycling cans and paper", "Dropping trash on the ground|Wasting water", "♻️"], ["What does reuse mean?", "Use something again", "Throw it away|Hide it"], ["What does reduce mean?", "Use less", "Use more|Break it"],
       ["Which saves water?", "Turning off the tap while you brush", "Leaving the tap on|Splashing the sink", "💧"], ["What can we plant to help nature?", "Trees", "Candy|Plastic bags", "🌳"], ["Where should trash go?", "In a trash can or recycling bin", "On the beach|In the river"]])
  ];
  l3.push(LS("Mixed practice", MX(l3, [0, 1, 4, 7, 11])));
  l3.push(LS("Level 3 Challenge", MX(l3, [2, 3, 5, 6, 12, 13, 16, 17])));

  return { 1: l1, 2: l2, 3: l3 };
})();
