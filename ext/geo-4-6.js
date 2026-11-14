// ext/geo-4-6.js : Mind Lab Geography levels 4-6 (60 lessons)
(() => {
  const slide = (h, v, t) => ({ h, v, t });
  const strip = s => String(s).replace(/^(a|an|the)\s+/i, "");
  const first = s => strip(s).replace(/<[^>]+>/g, "")[0].toUpperCase();
  const LS = (title, make) => ({ title, make });

  // Multiple choice. items = [question, right, "wrong1|wrong2", optional picture]
  const MC = (s, h, items) => {
    const make = () => {
      const [q, a, w, v] = pick(items), r = { text: q, choices: shuf([a, ...w.split("|")]), answer: a, hints: h };
      if (v) r.visual = v;
      return r;
    };
    make.teach = () => s.map(x => slide(x[0], x[1], x[2]));
    return make;
  };
  // Pairs: list = [a, b, optional emoji]; ask b from a (and a from b if o.r).
  const PAIR = (list, o) => {
    const make = () => {
      const cur = pick(list), rest = shuf(list.filter(x => x !== cur)), ex = rest[0];
      const rev = o.r && Math.random() < 0.4;
      const exh = `Example: ${ex[0]} goes with ${ex[1]}. So when the question is about ${ex[0]}, the answer is ${ex[1]}. Now do yours.`;
      if (rev) return {
        text: o.r(cur[1]), choices: shuf([cur[0], rest[1][0], rest[2][0]]), answer: cur[0],
        hints: [o.n, `The answer starts with the letter "${first(cur[0])}".`, `Example: ${ex[1]} goes with ${ex[0]}. Now do yours.`]
      };
      const r = {
        text: o.f(cur[0]), choices: shuf([cur[1], rest[1][1], rest[2][1]]), answer: cur[1],
        hints: [o.n, `The answer starts with the letter "${first(cur[1])}".`, exh]
      };
      if (cur[2]) r.visual = cur[2];
      return r;
    };
    make.teach = () => [
      slide(o.title, o.tv || (list[0][2] || "🌍") + " " + (list[1][2] || "🗺️"), o.intro),
      slide("Let's learn", "📋", list.map(x => `${x[2] ? x[2] + " " : ""}<b>${x[0]}</b>: ${x[1]}`).join("<br>")),
      slide("Remember", "💡", o.tip)
    ];
    return make;
  };
  // Sorting into groups. items = [name, group, optional emoji]; cats = all group names.
  const CLS = (o) => {
    const make = () => {
      const cur = pick(o.items), rest = shuf(o.items.filter(x => x[0] !== cur[0] && x[1] !== cur[1])), ex = rest[0];
      const wrong = shuf(o.cats.filter(c => c !== cur[1])).slice(0, 2);
      const r = {
        text: o.q(cur[0]), choices: shuf([cur[1], ...wrong]), answer: cur[1],
        hints: [o.n, o.c || "Cross out any choice you know is wrong. Think about the list in the lesson.", `Example: ${ex[0]} goes with ${ex[1]}. Now do yours.`]
      };
      if (cur[2]) r.visual = cur[2];
      return r;
    };
    make.teach = () => [
      slide(o.title, o.tv || "🌍", o.intro),
      slide("Let's learn", "📋", o.items.map(x => `${x[2] ? x[2] + " " : ""}<b>${x[0]}</b>: ${x[1]}`).join("<br>")),
      slide("Remember", "💡", o.tip)
    ];
    return make;
  };
  const MX = (lessons, idxs) => {
    const ms = idxs.map(i => lessons[i].make), f = () => pick(ms)();
    f.teach = () => [slide("Review time!", "🔄", "This lesson mixes ideas you already learned. Here is a quick reminder of each one, then the quiz.")].concat(ms.map(m => m.teach()[0]));
    return f;
  };
  const CONTS = ["Africa", "Antarctica", "Asia", "Australia", "Europe", "North America", "South America"];
  const CONT = (title, items, noun, intro, tip, qf, tv) => LS(title, CLS({
    title, items, cats: CONTS, intro, tip, tv, q: qf || (n => `On which continent is ${n}?`),
    n: `Think about where in the world this ${noun} is. Picture a world map.`, c: "Think about the seven continents. Cross out the ones that are far away."
  }));
  const CAPS = (title, list, intro, tv) => LS(title, PAIR(list, {
    title, intro, tv, f: a => `What is the capital of ${a}?`, r: b => `${b} is the capital of which country?`,
    n: "A capital is the city where a country's leaders work. Say the country's name and think of its capital.",
    tip: "Say each pair out loud. Make up a silly sentence to help you remember."
  }));

  // ---------- number makers ----------
  const SCALEKM = () => {
    const make = () => {
      const k = pick([5, 10, 20, 50]), n = ri(2, 9);
      if (Math.random() < 0.6) return {
        text: `On a map, 1 centimeter stands for ${k} kilometers. Two towns are ${n} centimeters apart on the map. How many kilometers apart are they in real life?`, answer: n * k,
        hints: ["Every centimeter on the map stands for the same number of real kilometers.", `Add ${k} once for each centimeter, or skip count by ${k}s. You need ${n} counts.`, "Example: if 1 cm stands for 4 km, then 3 cm is 4 + 4 + 4 = 12 km. Now do yours."]
      };
      return {
        text: `On a map, 1 centimeter stands for ${k} kilometers. Two towns are ${n * k} kilometers apart in real life. How many centimeters apart are they on the map?`, answer: n,
        hints: ["Each centimeter on the map is the same real distance.", `Skip count by ${k}s until you reach ${n * k}. How many counts did it take?`, "Example: if 1 cm stands for 4 km and the trip is 12 km, count 4, 8, 12. That is 3 counts, so 3 cm. Now do yours."]
      };
    };
    make.teach = () => [
      slide("Bar scale", "📏", "Many maps have a <b>bar scale</b>. It shows how many real kilometers (km) are in each centimeter (cm) on the map."),
      slide("Example", "1 cm = 10 km", "If 1 cm = 10 km, then 3 cm = 30 km. To go from the map to real life, <b>multiply</b>. To go from real life to the map, <b>divide</b> (or skip count)."),
      slide("Tip", "💡", "Measure with a ruler first. Then skip count by the scale number.")
    ];
    return make;
  };
  const SCALEROUTE = () => {
    const make = () => {
      const k = pick([5, 10, 20]), a = ri(3, 9), b = ri(2, a - 1);
      if (Math.random() < 0.5) return {
        text: `On a map, 1 cm stands for ${k} km. A road goes ${a} cm east and then ${b} cm north. How many km long is the whole road?`, answer: (a + b) * k,
        hints: ["First find how many centimeters long the whole road is on the map.", `Add the two parts in centimeters. Then count that many ${k}s.`, "Example: if 1 cm = 3 km, a road of 2 cm + 4 cm is 6 cm, and 6 x 3 = 18 km. Now do yours."]
      };
      return {
        text: `On a map, 1 cm stands for ${k} km. Route A is ${a} cm long and Route B is ${b} cm long. How many km longer is Route A?`, answer: (a - b) * k,
        hints: ["Find how much longer Route A is on the map first, in centimeters.", `Subtract the two lengths. Then count that many ${k}s.`, "Example: if 1 cm = 3 km, routes of 7 cm and 4 cm differ by 3 cm, and 3 x 3 = 9 km. Now do yours."]
      };
    };
    make.teach = () => [
      slide("Routes and scale", "🛣️", "You can use the scale on a road with more than one part. Add the parts in <b>centimeters</b> first."),
      slide("Example", "2 cm + 4 cm = 6 cm", "If 1 cm = 3 km, then 6 cm = 18 km. To compare two routes, subtract the centimeters and then use the scale."),
      slide("Tip", "💡", "Do the map math first (add or subtract). Then change to real kilometers at the end.")
    ];
    return make;
  };
  const COORD = () => {
    const make = () => {
      const a = ri(1, 6); let b = ri(1, 6); while (b === a) b = ri(1, 6);
      let ea = ri(1, 6), eb = ri(1, 6); while (ea === a && eb === b) ea = ri(1, 6);
      const m = pick(["p", "r", "u"]);
      if (m === "p") {
        const right = `(${a}, ${b})`, cands = shuf([`(${b}, ${a})`, `(${a + 1}, ${b})`, `(${a}, ${b + 1})`, `(${a - 1}, ${b})`]);
        return {
          text: `Start at the corner (0, 0). Go right ${a} and then up ${b}. Where do you stop?`, choices: shuf([right, cands[0], cands[1]]), answer: right,
          hints: ["In a point like (3, 5), the first number is how far to go across (right).", "The second number is how far to go up. First find the right number, then the up number.", `Example: go right ${ea} and up ${eb} and you stop at (${ea}, ${eb}). The across number always comes first. Now do yours.`]
        };
      }
      const word = m === "r" ? "RIGHT" : "UP", ans = m === "r" ? a : b;
      return {
        text: `A treasure is at (${a}, ${b}). Start at (0, 0). How many steps ${word} do you go?`, answer: ans,
        hints: ["The two numbers in a point are across (right) and then up.", m === "r" ? "Right means across. Which number comes first in the point?" : "Up is the second number in the point. Look at the second number.", `Example: for a treasure at (${ea}, ${eb}) you go ${ea} steps right and ${eb} steps up. Now do yours.`]
      };
    };
    make.teach = () => [
      slide("Points on a grid", "📍", "A point on a map grid has <b>two numbers</b> in brackets, like (3, 2). They tell you where it is."),
      slide("Across, then up", "➡️ ⬆️", "The <b>first number</b> says how many steps to go <b>right</b> (across). The <b>second number</b> says how many steps to go <b>up</b>. Start at (0, 0)."),
      slide("Tip", "💡", "Remember: <b>walk across the hall, then climb up the stairs</b>.")
    ];
    return make;
  };
  const TZ = () => {
    const make = () => {
      const h = ri(5, 9), d = ri(1, 3), behind = Math.random() < 0.5, w = d === 1 ? "hour" : "hours";
      return {
        text: behind ? `It is ${h} o'clock in Town A. Town B is ${d} ${w} behind Town A (earlier). What time is it in Town B? (Type the hour.)`
          : `It is ${h} o'clock in Town A. Town B is ${d} ${w} ahead of Town A (later). What time is it in Town B? (Type the hour.)`,
        answer: behind ? h - d : h + d,
        hints: [behind ? "Behind means earlier, so the clock number goes down." : "Ahead means later, so the clock number goes up.", behind ? `Take away ${d} from ${h}.` : `Add ${d} to ${h}.`, behind ? "Example: it is 11 o'clock in one town. A town 4 hours behind is at 11 - 4 = 7 o'clock. Now do yours." : "Example: it is 3 o'clock in one town. A town 4 hours ahead is at 3 + 4 = 7 o'clock. Now do yours."]
      };
    };
    make.teach = () => [
      slide("Time zones", "🕒", "The world is split into <b>time zones</b>. Places in different zones have different clock times at the same moment."),
      slide("East and west", "🌅", "The sun rises in the east first. So places to the <b>east</b> are <b>ahead</b> (later). Places to the <b>west</b> are <b>behind</b> (earlier)."),
      slide("Tip", "💡", "Ahead means add hours. Behind means take away hours.")
    ];
    return make;
  };
  const CHART = () => {
    const names = ["Sunville", "Rainton", "Snowby", "Windham", "Sandport", "Lakeside"];
    const make = () => {
      const ns = shuf(names).slice(0, 4), ts = shuf([8, 11, 14, 17, 20, 23, 26, 29, 32]).slice(0, 4);
      const html = `<table style="margin:auto;border-collapse:collapse;font-size:18px">${ns.map((n, i) => `<tr><td style="border:1px solid #888;padding:3px 12px">${n}</td><td style="border:1px solid #888;padding:3px 12px">${ts[i]}°C</td></tr>`).join("")}</table>`;
      const hi = Math.max(...ts), lo = Math.min(...ts), m = pick(["hot", "cold", "diff"]);
      if (m === "diff") return {
        text: "The table shows the temperature in four towns today. How many degrees warmer is the warmest town than the coldest town?", visual: html, answer: hi - lo,
        hints: ["Find the biggest number and the smallest number in the table.", "Subtract the smallest number from the biggest number.", "Example: if the warmest is 25 and the coldest is 10, then 25 - 10 = 15 degrees. Now do yours."]
      };
      const ans = ns[ts.indexOf(m === "hot" ? hi : lo)];
      return {
        text: `The table shows the temperature in four towns today. Which town is the ${m === "hot" ? "hottest" : "coldest"}?`, visual: html, choices: shuf(ns), answer: ans,
        hints: ["Look at the numbers in the table, not the names.", m === "hot" ? "A bigger number means hotter weather. Find the biggest number." : "A smaller number means colder weather. Find the smallest number.", "Example: with towns at 9, 15 and 22 degrees, the 22 is the hottest and the 9 is the coldest. Now do yours."]
      };
    };
    make.teach = () => [
      slide("Reading a table", "📊", "Geographers use tables to compare places. A table puts names and numbers in rows."),
      slide("Hot and cold", "🌡️", "A <b>bigger</b> temperature number means <b>hotter</b>. A <b>smaller</b> number means <b>colder</b>. To find how far apart two numbers are, <b>subtract</b>."),
      slide("Tip", "💡", "Check every row before you choose. Do not stop at the first one!")
    ];
    return make;
  };
  const TURN = () => {
    const D = ["North", "East", "South", "West"], A = ["⬆️", "➡️", "⬇️", "⬅️"], T = [["right", 1, "to the right"], ["left", 3, "to the left"], ["around", 2, "all the way around (a U-turn)"]];
    const make = () => {
      const i = ri(0, 3), t = pick(T), ans = (i + t[1]) % 4;
      let ei, et, ea; do { ei = ri(0, 3); et = pick(T); ea = (ei + et[1]) % 4; } while ((ei === i && et === t) || ea === ans);
      return {
        text: `You are facing ${D[i]}. You turn ${t[2]}. Which way are you facing now?`, visual: A[i], choices: shuf(D), answer: D[ans],
        hints: ["Picture yourself standing on a compass rose. North is up, East is right, South is down, West is left.", t[0] === "around" ? "Turning all the way around means you face the opposite way." : `Turn ${t[0]}: look at the compass rose and move one step ${t[0] === "right" ? "clockwise (like a clock hand)" : "counter-clockwise (the other way)"}.`, `Example: facing ${D[ei]}, turn ${et[2]}, and you face ${D[ea]}. Now do yours.`]
      };
    };
    make.teach = () => [
      slide("Turning on a compass", "🧭", "North, East, South and West go in a circle, like the numbers on a clock: <b>N, E, S, W</b>."),
      slide("Right and left", "↪️ ↩️", "Turning <b>right</b> moves one step forward in the circle (N to E). Turning <b>left</b> moves one step back (N to W). Turning <b>around</b> gives the opposite direction (N to S)."),
      slide("Tip", "💡", "Stand up and turn your body to feel it. Face the way the question says, then turn.")
    ];
    return make;
  };

  // =============== LEVEL 4 ===============
  const l4 = [
    CAPS("US state capitals", [["Texas", "Austin"], ["California", "Sacramento"], ["Florida", "Tallahassee"], ["New York", "Albany"], ["Ohio", "Columbus"], ["Colorado", "Denver"], ["Arizona", "Phoenix"], ["Illinois", "Springfield"], ["Georgia", "Atlanta"], ["Washington", "Olympia"], ["Massachusetts", "Boston"], ["Nevada", "Carson City"]],
      "Each of the 50 states in the United States has its own <b>capital city</b>. It is often not the biggest city!", "🇺🇸 🏛️"),
    CAPS("Capitals in North America", [["Canada", "Ottawa"], ["Mexico", "Mexico City"], ["the United States", "Washington, D.C."], ["Cuba", "Havana"], ["Jamaica", "Kingston"], ["Guatemala", "Guatemala City"], ["Costa Rica", "San Jose"], ["Panama", "Panama City"]],
      "North America has many countries. Each one has a capital city where its leaders work.", "🌎 🏛️"),
    CAPS("Capitals in Europe", [["France", "Paris"], ["Italy", "Rome"], ["Spain", "Madrid"], ["Germany", "Berlin"], ["England", "London"], ["Greece", "Athens"], ["Portugal", "Lisbon"], ["Ireland", "Dublin"], ["Norway", "Oslo"], ["Sweden", "Stockholm"]],
      "Europe has many countries close together. Let's learn some of their capitals.", "🇪🇺 🏛️"),
    CAPS("Capitals in Asia", [["Japan", "Tokyo"], ["China", "Beijing"], ["India", "New Delhi"], ["South Korea", "Seoul"], ["Thailand", "Bangkok"], ["Vietnam", "Hanoi"], ["Indonesia", "Jakarta"], ["the Philippines", "Manila"]],
      "Asia is the biggest continent. It has lots of countries and lots of capitals.", "🌏 🏛️"),
    CAPS("Capitals in Africa", [["Egypt", "Cairo"], ["Kenya", "Nairobi"], ["Nigeria", "Abuja"], ["Morocco", "Rabat"], ["Ethiopia", "Addis Ababa"], ["Ghana", "Accra"], ["Uganda", "Kampala"], ["Senegal", "Dakar"]],
      "Africa has 54 countries. Here are the capitals of some of them.", "🌍 🏛️"),
    CAPS("Capitals in South America", [["Brazil", "Brasilia"], ["Argentina", "Buenos Aires"], ["Peru", "Lima"], ["Chile", "Santiago"], ["Colombia", "Bogota"], ["Ecuador", "Quito"], ["Venezuela", "Caracas"], ["Uruguay", "Montevideo"]],
      "South America has 12 countries. Let's learn the capitals of eight of them.", "🌎 🏛️"),
    LS("Equator and Prime Meridian", MC([
      ["The Equator", "🌍", "The <b>Equator</b> is an imaginary line around the middle of Earth. It is at <b>0 degrees latitude</b>. It splits Earth into the Northern and Southern Hemispheres."],
      ["The Prime Meridian", "🧭", "The <b>Prime Meridian</b> is an imaginary line from the North Pole to the South Pole. It is at <b>0 degrees longitude</b> and passes through England. It splits Earth into the Eastern and Western Hemispheres."],
      ["Tip", "💡", "Lines of <b>latitude</b> go side to side, like the rungs of a ladder. Lines of <b>longitude</b> go up and down."]],
      ["Think about the Equator (around the middle) and the Prime Meridian (up and down).", "Latitude lines go side to side. Longitude lines go up and down.", "Example: the line at 0 degrees longitude is the Prime Meridian, and it splits East from West. Now do yours."],
      [["The Equator splits Earth into which two halves?", "Northern and Southern", "Eastern and Western|Top and Bottom Pole"], ["The Prime Meridian splits Earth into which two halves?", "Eastern and Western", "Northern and Southern|Hot and cold"],
       ["Lines of latitude run which way?", "Side to side (east to west)", "Up and down (north to south)|Round in a spiral"], ["Lines of longitude run which way?", "Up and down (north to south)", "Side to side (east to west)|Round in a spiral"],
       ["Which line is at 0 degrees latitude?", "The Equator", "The Prime Meridian|The North Pole"], ["Which line is at 0 degrees longitude?", "The Prime Meridian", "The Equator|The South Pole"],
       ["Places near the Equator are usually...", "Hot", "Always icy|Covered in snow"]])),
    LS("Map key and compass rose", MC([
      ["Parts of a map", "🗺️", "A <b>title</b> tells what the map shows. A <b>map key</b> (or legend) tells what the symbols mean. A <b>compass rose</b> shows directions. A <b>scale</b> shows distance."],
      ["Symbols", "⭐ 🔵 🟢", "Maps use symbols to save space. A blue line often shows a river. A star often marks a capital city."],
      ["Tip", "💡", "When you see a symbol you do not know, look in the map key first!"]],
      ["Think about what each part of a map is for.", "Key = symbols, compass rose = directions, scale = distance, title = topic.", "Example: to find out what a little tree picture means on a map, you read the map key. Now do yours."],
      [["Which part of a map tells you what the symbols mean?", "The map key", "The title|The scale"], ["Which part of a map shows north, south, east and west?", "The compass rose", "The map key|The title"], ["Which part tells what the map is about?", "The title", "The compass rose|The scale"],
       ["Which part helps you tell how far apart two towns are?", "The scale", "The title|The compass rose"], ["A blue line on a map often shows...", "A river", "A road|A capital city"], ["Another name for a map key is a...", "Legend", "Scale|Globe"], ["A star on a map often marks...", "A capital city", "A lake|A mountain"]])),
    LS("North-east, south-west", MC([
      ["More directions", "🧭", "Between the main directions are more directions. <b>Northeast</b> is between north and east. <b>Northwest</b> is between north and west."],
      ["Southern ones", "↘️ ↙️", "<b>Southeast</b> is between south and east. <b>Southwest</b> is between south and west."],
      ["Opposites", "↔️", "North and south are opposites. East and west are opposites. Northeast and southwest are opposites too."]],
      ["Picture the compass rose.", "Look at which two main directions are next to the mixed one.", "Example: southeast is between south and east. Now do yours."],
      [["Northeast is between...", "North and east", "South and west|North and west"], ["Southwest is between...", "South and west", "North and east|South and east"], ["Northwest is between...", "North and west", "South and east|North and east"],
       ["Which direction is between south and east?", "Southeast", "Northwest|Northeast"], ["The opposite of northeast is...", "Southwest", "Northwest|Southeast"], ["The opposite of north is...", "South", "East|West"], ["The opposite of west is...", "East", "North|South"]])),
    CONT("Rivers of the world", [["the Nile River", "Africa"], ["the Amazon River", "South America"], ["the Mississippi River", "North America"], ["the Yangtze River", "Asia"], ["the Danube River", "Europe"], ["the Murray River", "Australia"], ["the Congo River", "Africa"], ["the Ganges River", "Asia"], ["the Rhine River", "Europe"]],
      "river", "A <b>river</b> is a big stream of water that flows to a sea or an ocean. Every continent has famous rivers.", "Say the river and its continent together, like Nile and Africa."),
    CONT("Mountains of the world", [["the Himalayas", "Asia"], ["the Rocky Mountains", "North America"], ["the Andes", "South America"], ["the Alps", "Europe"], ["Mount Kilimanjaro", "Africa"], ["Mount Everest", "Asia"], ["Denali", "North America"], ["the Atlas Mountains", "Africa"], ["the Appalachian Mountains", "North America"]],
      "mountain", "A <b>mountain</b> is very high land with steep sides. Some mountains stand alone, and some come in long rows called <b>ranges</b>.", "Mount Everest is the highest mountain above sea level, and it is in the Himalayas in Asia."),
    CONT("Deserts of the world", [["the Sahara Desert", "Africa"], ["the Gobi Desert", "Asia"], ["the Mojave Desert", "North America"], ["the Atacama Desert", "South America"], ["the Arabian Desert", "Asia"], ["the Kalahari Desert", "Africa"], ["the Sonoran Desert", "North America"], ["the Great Victoria Desert", "Australia"]],
      "desert", "A <b>desert</b> is a place that gets very little rain. Some deserts are hot, and some are cold.", "The Sahara is the biggest hot desert. The Atacama is one of the driest places on Earth."),
    LS("Great Lakes and seas", MC([
      ["The Great Lakes", "🏞️", "The five <b>Great Lakes</b> sit between the United States and Canada: Superior, Michigan, Huron, Erie and Ontario. Lake Superior is the biggest."],
      ["Other big waters", "🌊", "Lake Victoria is a huge lake in Africa. The Caspian Sea is the biggest lake in the world, even though it has \"sea\" in its name. The Dead Sea is so salty that people float easily."],
      ["Tip", "💡", "HOMES helps you remember the Great Lakes: Huron, Ontario, Michigan, Erie, Superior."]],
      ["Think about the Great Lakes and where they are.", "There are five Great Lakes. The first letters spell HOMES.", "Example: Lake Ontario is the smallest of the Great Lakes by area, and Superior is the largest. Now do yours."],
      [["How many Great Lakes are there?", "Five", "Three|Seven"], ["Which Great Lake is the biggest?", "Lake Superior", "Lake Erie|Lake Ontario"], ["The Great Lakes are on the border of the United States and which country?", "Canada", "Mexico|Cuba"],
       ["Which Great Lake has the same name as a US state?", "Lake Michigan", "Lake Huron|Lake Superior"], ["Lake Victoria is on which continent?", "Africa", "Asia|Europe"], ["The Caspian Sea is really a...", "Giant lake", "Small pond|River"],
       ["The Dead Sea is very...", "Salty", "Icy|Sweet"]])),
    LS("Islands, peninsulas and bays", MC([
      ["Land and water shapes", "🏝️", "An <b>island</b> is land with water all around it. A <b>peninsula</b> is land with water on three sides. An <b>isthmus</b> is a narrow strip of land that joins two bigger pieces of land."],
      ["Water shapes", "⛵", "A <b>bay</b> is part of the sea that curves into the land. A <b>gulf</b> is a bigger one. A <b>strait</b> is a narrow strip of water between two pieces of land."],
      ["Tip", "💡", "Island = water on all sides. Peninsula = water on three sides."]],
      ["Think about how many sides have water.", "Land words: island, peninsula, isthmus. Water words: bay, gulf, strait.", "Example: Italy sticks out into the sea with water on three sides, so it is a peninsula. Now do yours."],
      [["Land with water on all sides is a...", "Island", "Peninsula|Isthmus"], ["Land with water on three sides is a...", "Peninsula", "Island|Bay"], ["A narrow strip of land joining two bigger lands is an...", "Isthmus", "Island|Strait"],
       ["Part of the sea that curves into the land is a...", "Bay", "Peninsula|Isthmus"], ["A narrow strip of water between two lands is a...", "Strait", "Isthmus|Island"], ["Florida is a...", "Peninsula", "Desert|Strait"], ["Hawaii is made of...", "Islands", "Isthmuses|Bays"]])),
    LS("Biomes", MC([
      ["What is a biome?", "🌴 🏜️ ❄️", "A <b>biome</b> is a big kind of place with its own weather, plants and animals. Examples are rainforest, desert, tundra, grassland and forest."],
      ["Meet the biomes", "🌲 🌾", "<b>Rainforest</b>: hot, wet, many trees. <b>Desert</b>: very dry. <b>Tundra</b>: cold and treeless. <b>Grassland</b>: flat, with grass and few trees. <b>Forest</b>: many trees and four seasons."],
      ["Tip", "💡", "Think about two things: how much rain and how warm it is."]],
      ["Think about how much rain falls and how warm the place is.", "Rainforest = wet and warm, desert = dry, tundra = cold, grassland = grass.", "Example: a place with thick ice and no trees, where it is very cold, is tundra. Now do yours."],
      [["Which biome is hot and wet with tall trees all year?", "Rainforest", "Tundra|Desert", "🌴"], ["Which biome is very dry with very little rain?", "Desert", "Rainforest|Forest", "🏜️"], ["Which biome is cold with no tall trees?", "Tundra", "Rainforest|Desert", "❄️"],
       ["Which biome is flat land covered with grass?", "Grassland", "Tundra|Rainforest", "🌾"], ["Camels are used to life in the...", "Desert", "Rainforest|Tundra", "🐪"], ["Which biome has the most kinds of plants and animals?", "Rainforest", "Desert|Tundra"], ["Zebras and lions roam the African savanna, a kind of...", "Grassland", "Tundra|Rainforest"]])),
    LS("Animals around the world", CLS({
      title: "Animals around the world", tv: "🦘 🐼 🐧", cats: CONTS, q: n => `On which continent do ${n} live in the wild?`,
      intro: "Different animals live in different parts of the world. Where an animal lives is called its <b>habitat</b>.", tip: "Match each animal to the place where it lives in the wild.",
      n: "Think about the animal. Where is it from?", c: "Think about the seven continents. Cross out the ones that are far away.",
      items: [["kangaroos", "Australia", "🦘"], ["koalas", "Australia", "🐨"], ["giant pandas", "Asia", "🐼"], ["llamas", "South America", "🦙"], ["emperor penguins", "Antarctica", "🐧"], ["giraffes", "Africa", "🦒"], ["gorillas", "Africa", "🦍"], ["tigers", "Asia", "🐯"], ["bison", "North America", "🦬"], ["jaguars", "South America", "🐆"]]
    })),
    LS("Famous landmarks", PAIR([["the Eiffel Tower", "France", "🗼"], ["the Colosseum", "Italy", "🏛️"], ["the Great Wall", "China", "🧱"], ["the Pyramids of Giza", "Egypt", "🔺"], ["the Taj Mahal", "India", "🕌"], ["Big Ben", "England", "🕰️"], ["the Statue of Liberty", "the United States", "🗽"], ["the Sydney Opera House", "Australia", "🎭"], ["Christ the Redeemer", "Brazil", "⛪"]], {
      title: "Famous landmarks", tv: "🗼 🗽 🔺", intro: "A <b>landmark</b> is a famous place or building that people travel to see.", tip: "Picture each landmark and say its country.",
      f: a => `In which country is ${a}?`, r: b => `Which landmark is in ${b}?`, n: "Think about the landmark. Where have you seen pictures of it?"
    })),
    LS("Languages of the world", PAIR([["Brazil", "Portuguese"], ["Mexico", "Spanish"], ["France", "French"], ["Japan", "Japanese"], ["Germany", "German"], ["Italy", "Italian"], ["China", "Mandarin"], ["Greece", "Greek"], ["Russia", "Russian"], ["the Netherlands", "Dutch"]], {
      title: "Languages of the world", tv: "🗣️ 💬", intro: "People in different countries speak different <b>languages</b>. Most countries have one main language, and many people speak more than one.", tip: "Many languages are named after their country, like French and France.",
      f: a => `What is the main language in ${a}?`, n: "Think about the country. What would you hear people say there?"
    })),
  ];
  l4.push(LS("Mixed practice", MX(l4, [0, 6, 7, 9, 12, 14, 15, 16])));
  l4.push(LS("Level 4 Challenge", MX(l4, [1, 2, 3, 4, 5, 8, 10, 11, 13, 16, 17])));

  // =============== LEVEL 5 ===============
  const REG = ["Northeast", "Southeast", "Midwest", "Southwest", "West"];
  const STATES = ["California", "Texas", "New York", "Arizona", "Washington", "Missouri", "South Dakota", "Wyoming", "Pennsylvania", "Florida"];
  const l5 = [
    LS("Regions of the United States", CLS({
      title: "Regions of the United States", tv: "🇺🇸 🗺️", cats: REG, q: n => `${n} is in which region of the United States?`,
      intro: "The 50 states are grouped into <b>regions</b>. States in a region are close together and share some things, like weather.", tip: "Think of the map: Northeast is top right, West is on the left coast, Midwest is in the middle.",
      n: "Picture a map of the United States. Where is this state?", c: "Look at where the state is on the map: top right, bottom right, middle, bottom left or far left.",
      items: [["Maine", "Northeast"], ["Vermont", "Northeast"], ["Florida", "Southeast"], ["Georgia", "Southeast"], ["Ohio", "Midwest"], ["Iowa", "Midwest"], ["Kansas", "Midwest"], ["Arizona", "Southwest"], ["New Mexico", "Southwest"], ["California", "West"], ["Oregon", "West"]]
    })),
    CAPS("More state capitals", [["Pennsylvania", "Harrisburg"], ["Michigan", "Lansing"], ["Minnesota", "Saint Paul"], ["Oregon", "Salem"], ["Tennessee", "Nashville"], ["Louisiana", "Baton Rouge"], ["Virginia", "Richmond"], ["Oklahoma", "Oklahoma City"], ["Hawaii", "Honolulu"], ["Alaska", "Juneau"], ["Utah", "Salt Lake City"], ["Missouri", "Jefferson City"], ["Wisconsin", "Madison"]],
      "Here are more state capitals. Remember, the capital is not always the biggest city in the state.", "🏛️ 🇺🇸"),
    LS("Landmarks of the USA", CLS({
      title: "Landmarks of the USA", tv: "🗽 🌉 🏜️", cats: STATES, q: n => `In which state is ${n}?`,
      intro: "The United States has famous landmarks in many states. People visit them from all over the world.", tip: "Link each landmark to its state with a picture in your mind.",
      n: "Think about the landmark. What do you know about where it is?", c: "Think about the map of the United States. Cross out states that do not fit.",
      items: [["Mount Rushmore", "South Dakota", "🗿"], ["the Grand Canyon", "Arizona", "🏜️"], ["the Statue of Liberty", "New York", "🗽"], ["the Space Needle", "Washington", "🗼"], ["the Gateway Arch", "Missouri", "🌈"], ["Old Faithful geyser", "Wyoming", "⛲"], ["the Golden Gate Bridge", "California", "🌉"], ["the Alamo", "Texas", "🏰"], ["the Liberty Bell", "Pennsylvania", "🔔"], ["the Everglades", "Florida", "🐊"]]
    })),
    LS("Rivers and lakes of the USA", MC([
      ["Big waters", "🏞️", "The <b>Mississippi River</b> flows south into the Gulf of Mexico. The <b>Colorado River</b> carved the Grand Canyon. The <b>Rio Grande</b> forms part of the border between Texas and Mexico."],
      ["More water", "🌊", "The <b>Hudson River</b> flows through New York. The <b>Great Salt Lake</b> is in Utah. <b>Lake Superior</b> is the biggest Great Lake. <b>Lake Michigan</b> is the only Great Lake completely inside the United States."],
      ["Tip", "💡", "Tie each water to one fact: Colorado = Grand Canyon, Rio Grande = Mexico border."]],
      ["Think about what you learned about each river or lake.", "Link the water to a place: canyon, border, state or gulf.", "Example: the Hudson River flows through the state of New York. Now do yours."],
      [["Which river carved the Grand Canyon?", "The Colorado River", "The Hudson River|The Ohio River"], ["Which river forms part of the border between Texas and Mexico?", "The Rio Grande", "The Hudson River|The Colorado River"], ["The Mississippi River flows south into the...", "Gulf of Mexico", "Pacific Ocean|Great Lakes"],
       ["The Great Salt Lake is in which state?", "Utah", "Maine|Florida"], ["Which Great Lake is completely inside the United States?", "Lake Michigan", "Lake Erie|Lake Huron"], ["The Hudson River flows through which state?", "New York", "Utah|Texas"], ["Which Great Lake is the biggest?", "Lake Superior", "Lake Erie|Lake Ontario"]])),
    LS("Latitude and longitude", MC([
      ["Degrees", "🌐", "We measure positions on Earth in <b>degrees</b>. <b>Latitude</b> tells how far north or south of the Equator a place is. The North Pole is at 90 degrees north."],
      ["Longitude", "🧭", "<b>Longitude</b> tells how far east or west of the Prime Meridian a place is. Together, latitude and longitude give an exact location."],
      ["Tools", "📡", "A phone or <b>GPS</b> uses latitude and longitude to find where you are."]],
      ["Think: latitude is north or south. Longitude is east or west.", "Latitude lines are like ladder rungs. Longitude lines run from pole to pole.", "Example: a place 40 degrees north of the Equator has a latitude of 40 degrees north. Now do yours."],
      [["Latitude tells how far a place is...", "North or south of the Equator", "East or west of the Equator|Up in the sky"], ["Longitude tells how far a place is...", "East or west of the Prime Meridian", "North or south of the Equator|Under the sea"], ["The Equator is at how many degrees latitude?", "0", "45|90"],
       ["The North Pole is at about how many degrees north?", "90", "0|45"], ["Which two things together give an exact location?", "Latitude and longitude", "Weather and climate|Rivers and lakes"], ["Which tool uses latitude and longitude to find you?", "GPS", "A ruler|A paper clip"], ["The Prime Meridian is at how many degrees longitude?", "0", "90|180"]])),
    LS("Points on a grid", COORD()),
    LS("Bar scale in kilometers", SCALEKM()),
    LS("Time zones", MC([
      ["Why time zones?", "🌍 🕒", "Earth <b>spins</b>, so the sun shines on different places at different times. When it is day in one place, it is night in another."],
      ["East and west", "🌅", "The sun rises in the <b>east</b> first. So places to the east have a <b>later</b> time. Places to the west have an <b>earlier</b> time."],
      ["In the USA", "🇺🇸", "The lower 48 states have four main time zones: Eastern, Central, Mountain and Pacific. Eastern is the earliest to get the sun."]],
      ["Think about where the sun rises first.", "East is later. West is earlier.", "Example: if you travel east, the time goes later, like going from 2 o'clock to 3 o'clock. Now do yours."],
      [["When it is noon in New York, what is the time in Los Angeles (to the west)?", "Earlier than noon", "Later than noon|The same"], ["If you travel east, the time gets...", "Later", "Earlier|Stops"], ["If you travel west, the time gets...", "Earlier", "Later|Stops"],
       ["Why do we have time zones?", "Earth spins, so the sun shines at different times", "The Moon is far away|Clocks are different colors"], ["Who sees the sunrise first?", "People in the east", "People in the west|Everyone together"], ["How many main time zones do the lower 48 US states have?", "Four", "One|Ten"], ["Which US time zone is the earliest to get sunlight?", "Eastern", "Pacific|Mountain"]])),
    LS("Towns, cities and the countryside", MC([
      ["Where people live", "🏙️ 🏘️ 🚜", "An <b>urban</b> area is a city with lots of people and tall buildings. A <b>suburb</b> is an area of homes near a city. A <b>rural</b> area is the countryside, with farms and open land."],
      ["Differences", "🚇 🌾", "Cities have subways, big stores and busy streets. Rural areas have fewer people and more space."],
      ["Tip", "💡", "Urban = city. Rural = country."]],
      ["Think about how many people live there.", "Urban is busy. Rural is open and quiet.", "Example: a farm far from town is in a rural area. Now do yours."],
      [["Farms are usually found in...", "Rural areas", "Urban areas|Subways"], ["A place with tall buildings and lots of people is...", "Urban", "Rural|A farm"], ["A suburb is an area of homes...", "Near a city", "At the North Pole|Under the sea"],
       ["Which place has the most people?", "A big city", "A small town|A farm"], ["Which is most likely to have a subway?", "A big city", "A farm|A tiny village"], ["Rural means the...", "Countryside", "Downtown|Airport"], ["Urban means...", "A city area", "A farm area|A desert"]])),
    LS("Biggest and smallest continents", MC([
      ["Big and small", "🌏", "<b>Asia</b> is the biggest continent and has the most people. <b>Australia</b> is the smallest continent."],
      ["More facts", "🧊 🏜️", "<b>Antarctica</b> is the coldest continent, and no countries are there. <b>Africa</b> has the Sahara, the biggest hot desert. <b>South America</b> has the Amazon rainforest."],
      ["Tip", "💡", "Biggest = Asia. Smallest = Australia. Coldest = Antarctica."]],
      ["Think about the seven continents on a map.", "Biggest and smallest: Asia and Australia.", "Example: the continent with the Alps is Europe. Now do yours."],
      [["Which continent is the biggest?", "Asia", "Europe|Antarctica"], ["Which continent is the smallest?", "Australia", "Asia|Africa"], ["Which continent is the coldest?", "Antarctica", "Africa|Asia"],
       ["Which continent has the most people?", "Asia", "Antarctica|Australia"], ["Which continent has the Sahara Desert?", "Africa", "Europe|South America"], ["Which continent has the Amazon rainforest?", "South America", "Africa|Asia"], ["Which continent has no countries?", "Antarctica", "Europe|Asia"]])),
    LS("Ocean facts", MC([
      ["Our oceans", "🌊", "The <b>Pacific</b> is the biggest and deepest ocean. The <b>Arctic</b> is the smallest. The <b>Atlantic</b> is between the Americas and Europe and Africa."],
      ["More ocean", "🧂", "The <b>Indian Ocean</b> touches Africa, Asia and Australia. The <b>Southern Ocean</b> goes around Antarctica. Ocean water is salty, and it covers about 7 out of every 10 parts of Earth."],
      ["Tip", "💡", "Pacific = biggest. Arctic = smallest."]],
      ["Think about the five oceans.", "Biggest: Pacific. Smallest: Arctic.", "Example: the ocean around Antarctica is the Southern Ocean. Now do yours."],
      [["Which ocean is the biggest?", "Pacific", "Arctic|Atlantic"], ["Which ocean is the smallest?", "Arctic", "Pacific|Indian"], ["Which ocean is between the Americas and Europe and Africa?", "Atlantic", "Arctic|Indian"],
       ["Which ocean touches Africa, Asia and Australia?", "Indian", "Arctic|Atlantic"], ["Which ocean goes around Antarctica?", "Southern", "Arctic|Pacific"], ["Ocean water is...", "Salty", "Sweet|Fizzy"], ["Water covers about how much of Earth?", "7 out of 10 parts", "1 out of 10 parts|All of it"]])),
    LS("Storms and shaking ground", MC([
      ["Big storms", "🌀 🌪️", "A <b>hurricane</b> is a huge spinning storm that forms over warm ocean water, with strong wind and heavy rain. A <b>tornado</b> is a narrow spinning funnel of wind over land."],
      ["Ground and fire", "🌋", "A <b>volcano</b> is a mountain where hot melted rock can come out. An <b>earthquake</b> is when the ground shakes. Many of both happen around the Pacific Ocean, in a ring called the <b>Ring of Fire</b>."],
      ["Water events", "🌧️", "A <b>flood</b> is too much water over dry land. A <b>drought</b> is a long time with very little rain. Grown-ups use warnings to keep people safe."]],
      ["Think about what each word means.", "Wind and rain: hurricane. Funnel on land: tornado. Shaking ground: earthquake.", "Example: a long time with no rain is a drought. Now do yours."],
      [["A huge spinning storm over warm ocean water is a...", "Hurricane", "Earthquake|Drought"], ["A narrow spinning funnel of wind over land is a...", "Tornado", "Volcano|Flood"], ["When the ground shakes, it is an...", "Earthquake", "Hurricane|Drought"],
       ["A mountain where hot melted rock can come out is a...", "Volcano", "Tornado|Flood"], ["Too much water over dry land is a...", "Flood", "Drought|Volcano"], ["A long time with very little rain is a...", "Drought", "Flood|Hurricane"], ["The Ring of Fire is around which ocean?", "Pacific", "Arctic|Atlantic"]])),
    LS("Climate zones", CLS({
      title: "Climate zones", tv: "🌴 🍂 ❄️", cats: ["Tropical", "Temperate", "Polar"], q: n => `Which climate zone is ${n} in?`,
      intro: "Earth has three main <b>climate zones</b>. <b>Tropical</b> is hot, near the Equator. <b>Temperate</b> has four seasons, in the middle. <b>Polar</b> is freezing cold, near the poles.",
      tip: "Near the Equator is hot. Near the poles is freezing. In the middle are the four seasons.", n: "Think about how hot or cold it is there all year.", c: "Hot all year = tropical. Four seasons = temperate. Freezing = polar.",
      items: [["the Amazon rainforest", "Tropical"], ["the North Pole", "Polar"], ["the South Pole", "Polar"], ["Paris, France", "Temperate"], ["Chicago, USA", "Temperate"], ["Indonesia, on the Equator", "Tropical"], ["Antarctica", "Polar"], ["the Congo rainforest", "Tropical"]]
    })),
    LS("Summer and winter, north and south", MC([
      ["Tilted Earth", "🌍", "Earth is <b>tilted</b> as it goes around the Sun. That gives us seasons. The half of Earth tilted toward the Sun has summer."],
      ["Opposite seasons", "☀️ ❄️", "When it is summer in the Northern Hemisphere, it is winter in the Southern Hemisphere. Seasons are opposite!"],
      ["The Equator", "🌴", "Places on the Equator are warm all year, with little change between seasons."]],
      ["Think about the two hemispheres.", "North and south have opposite seasons.", "Example: when it is spring in the north, it is autumn in the south. Now do yours."],
      [["When it is summer in the United States, it is ___ in Australia.", "Winter", "Summer|Spring"], ["When it is winter in the Northern Hemisphere, it is ___ in the Southern Hemisphere.", "Summer", "Winter|Snowy everywhere"], ["Why do we have seasons?", "Earth is tilted as it goes around the Sun", "Earth stops spinning|The Moon moves close"],
       ["Places on the Equator have weather that is...", "Warm all year", "Frozen all year|Very different every season"], ["December in Australia is...", "Summer", "Winter|Always snowy"], ["July in Canada is...", "Summer", "Winter|Always frozen"], ["Is the United States in the Northern or Southern Hemisphere?", "Northern", "Southern|Neither"]])),
    LS("Renewable and not renewable", CLS({
      title: "Renewable and not renewable", tv: "☀️ 💨 ⛽", cats: ["Renewable", "Not renewable"], q: n => `Is ${n} a renewable or not renewable energy source?`,
      intro: "<b>Renewable</b> energy never runs out, or comes back quickly. <b>Not renewable</b> energy, like coal and oil, takes millions of years to form, so it can run out.",
      tip: "Sun, wind and water keep coming back. Coal, oil and gas are used up.", n: "Ask: will it run out, or does it keep coming back?", c: "Things in the sky or in moving water keep coming back.",
      items: [["sunlight", "Renewable", "☀️"], ["wind", "Renewable", "💨"], ["flowing water", "Renewable", "🌊"], ["ocean waves", "Renewable", "🌊"], ["coal", "Not renewable", "⚫"], ["oil", "Not renewable", "🛢️"], ["natural gas", "Not renewable", "🔥"]]
    })),
    LS("Moving people and goods", CLS({
      title: "Moving people and goods", tv: "🚆 🚢 ✈️", cats: ["Land", "Water", "Air"], q: n => `Does a ${n} travel by land, water or air?`,
      intro: "People and goods travel by <b>land</b>, by <b>water</b> and by <b>air</b>. The right way to go depends on where things are and how far they must go.", tip: "Ships carry heavy goods across oceans. Planes are the fastest over long distances.",
      n: "Think about where the vehicle moves: on the ground, on the sea or in the sky.", c: "Wheels on a road or track = land. Floats = water. Wings or a balloon = air.",
      items: [["train", "Land", "🚆"], ["truck", "Land", "🚚"], ["bus", "Land", "🚌"], ["bicycle", "Land", "🚲"], ["ship", "Water", "🚢"], ["ferry", "Water", "⛴️"], ["sailboat", "Water", "⛵"], ["airplane", "Air", "✈️"], ["helicopter", "Air", "🚁"], ["hot air balloon", "Air", "🎈"]]
    })),
    LS("Holidays around the world", PAIR([["Canada Day", "Canada", "🍁"], ["Bastille Day", "France", "🥖"], ["St. Patrick's Day", "Ireland", "☘️"], ["Diwali, the festival of lights", "India", "🪔"], ["Chinese New Year", "China", "🧧"], ["the Rio Carnival", "Brazil", "🎭"], ["the Fourth of July", "the United States", "🎆"], ["Hanami, cherry blossom picnics", "Japan", "🌸"]], {
      title: "Holidays around the world", tv: "🎉 🌍", intro: "People around the world have special days. They show a country's history and culture.", tip: "Learning about holidays helps us understand how other people live.",
      f: a => `Which country is famous for ${a}?`, n: "Think about the holiday name. Which country does it remind you of?"
    })),
    LS("Wild animals by continent", CLS({
      title: "Wild animals by continent", tv: "🦁 🐘 🐧", cats: CONTS, q: n => `On which continent can you find ${n} in the wild?`,
      intro: "Many animals live only on certain continents. A map of animals shows where each lives.", tip: "Pick an animal and trace it on a world map in your mind.",
      n: "Think about where this animal lives in the wild.", c: "Think about the seven continents. Cross out the ones that are far away.",
      items: [["pandas", "Asia", "🐼"], ["kangaroos", "Australia", "🦘"], ["penguins in the deep south", "Antarctica", "🐧"], ["zebras", "Africa", "🦓"], ["llamas", "South America", "🦙"], ["bison", "North America", "🦬"], ["tigers", "Asia", "🐯"], ["capybaras", "South America", "🐹"], ["lions on the savanna", "Africa", "🦁"], ["moose in the North American forests", "North America", "🫎"]]
    })),
  ];
  l5.push(LS("Mixed practice", MX(l5, [0, 1, 3, 4, 5, 8, 10, 12])));
  l5.push(LS("Level 5 Challenge", MX(l5, [2, 6, 7, 9, 11, 13, 14, 15, 16, 17, 18])));

  // =============== LEVEL 6 ===============
  const l6 = [
    CAPS("Capitals in Oceania", [["Australia", "Canberra"], ["New Zealand", "Wellington"], ["Fiji", "Suva"], ["Papua New Guinea", "Port Moresby"], ["Samoa", "Apia"], ["Tonga", "Nukualofa"]],
      "Oceania is the area of Australia, New Zealand and thousands of islands in the Pacific Ocean. Sydney is Australia's biggest city, but its capital is Canberra!", "🌏 🏛️"),
    CAPS("More capitals in Africa", [["South Africa", "Pretoria"], ["Algeria", "Algiers"], ["Tanzania", "Dodoma"], ["Libya", "Tripoli"], ["Tunisia", "Tunis"], ["Zambia", "Lusaka"], ["Zimbabwe", "Harare"], ["Rwanda", "Kigali"]],
      "Let's learn more African capitals. South Africa has more than one capital city; Pretoria is where the government leaders work.", "🌍 🏛️"),
    CAPS("More capitals in Europe", [["the Netherlands", "Amsterdam"], ["Belgium", "Brussels"], ["Switzerland", "Bern"], ["Austria", "Vienna"], ["Poland", "Warsaw"], ["Finland", "Helsinki"], ["Denmark", "Copenhagen"], ["Hungary", "Budapest"], ["Czechia", "Prague"], ["Russia", "Moscow"]],
      "Europe has more than 40 countries. Here are ten more capitals.", "🇪🇺 🏛️"),
    CAPS("More capitals in Asia", [["Turkey", "Ankara"], ["Saudi Arabia", "Riyadh"], ["Iran", "Tehran"], ["Pakistan", "Islamabad"], ["Nepal", "Kathmandu"], ["Mongolia", "Ulaanbaatar"], ["Malaysia", "Kuala Lumpur"], ["Bangladesh", "Dhaka"]],
      "Asia stretches from Turkey in the west to Japan in the east. Here are more of its capitals.", "🌏 🏛️"),
    CAPS("Capitals in Latin America", [["the Bahamas", "Nassau"], ["the Dominican Republic", "Santo Domingo"], ["Haiti", "Port-au-Prince"], ["Honduras", "Tegucigalpa"], ["Paraguay", "Asuncion"], ["El Salvador", "San Salvador"], ["Nicaragua", "Managua"], ["Belize", "Belmopan"]],
      "Latin America includes Mexico, Central America, the Caribbean islands and South America. Let's learn more capitals there.", "🌎 🏛️"),
    CONT("Countries and their continents", [["Kenya", "Africa"], ["Japan", "Asia"], ["Canada", "North America"], ["Brazil", "South America"], ["Germany", "Europe"], ["Egypt", "Africa"], ["India", "Asia"], ["Mexico", "North America"], ["Argentina", "South America"], ["Italy", "Europe"], ["New Zealand", "Australia"]],
      "country", "Every country is part of a continent. New Zealand and Australia are often grouped together as the continent of Oceania.", "Think of a world map. Find the country, then name the big land around it.", n => `Which continent is ${n} in?`),
    LS("Largest, smallest, highest", MC([
      ["Big records", "🏆", "<b>Russia</b> is the biggest country by area. <b>Vatican City</b> is the smallest country. <b>India</b> has the most people. <b>Canada</b> is the biggest country in North America."],
      ["Nature records", "🏔️", "<b>Mount Everest</b> is the highest mountain above sea level. The <b>Sahara</b> is the biggest hot desert. The <b>Pacific</b> is the biggest ocean. <b>Asia</b> is the biggest continent."],
      ["Tip", "💡", "Make a list of records and quiz yourself with a friend."]],
      ["Think about the biggest, smallest and highest places on Earth.", "These come from the lesson: Russia, Vatican City, Everest, Sahara.", "Example: the biggest ocean is the Pacific. Now do yours."],
      [["Which country is the biggest by area?", "Russia", "Canada|Brazil"], ["Which country is the smallest?", "Vatican City", "Monaco|Iceland"], ["Which country has the most people?", "India", "Canada|Japan"], ["What is the highest mountain above sea level?", "Mount Everest", "Mount Kilimanjaro|Denali"],
       ["What is the biggest hot desert?", "The Sahara", "The Gobi|The Mojave"], ["What is the biggest country in North America?", "Canada", "Mexico|Cuba"], ["Which continent is the biggest?", "Asia", "Africa|Europe"]])),
    LS("Time zone clocks", TZ()),
    LS("Reading a temperature table", CHART()),
    LS("Scale and routes", SCALEROUTE()),
    LS("Turning on the compass", TURN()),
    LS("Physical and political maps", MC([
      ["Physical maps", "⛰️ 🏞️", "A <b>physical map</b> shows land and water features like mountains, rivers, lakes and deserts. Colors show how high the land is."],
      ["Political maps", "🏛️ 🏳️", "A <b>political map</b> shows borders of countries and states, and often capitals and cities. A <b>road map</b> shows roads."],
      ["Tip", "💡", "Physical = nature. Political = people's borders."]],
      ["Think about what the map is trying to show.", "Nature features = physical. Borders and capitals = political.", "Example: to find where the Alps are, use a physical map. Now do yours."],
      [["Which map shows country borders and capitals?", "A political map", "A physical map|A weather chart"], ["Which map shows mountains, rivers and deserts?", "A physical map", "A political map|A road map"], ["Which map shows roads between towns?", "A road map", "A physical map|A political map"],
       ["To find the capital of France, use...", "A political map", "A physical map|A rainfall chart"], ["To see where the Rocky Mountains are, use...", "A physical map", "A political map|A seating chart"], ["Lines between states are shown on a...", "Political map", "Physical map|Star map"], ["On many maps, blue stands for...", "Water", "Mountains|Roads"]])),
    CONT("Natural wonders of the world", [["the Great Barrier Reef", "Australia"], ["Victoria Falls", "Africa"], ["Mount Everest", "Asia"], ["the Amazon rainforest", "South America"], ["Niagara Falls", "North America"], ["the Matterhorn", "Europe"], ["the Grand Canyon", "North America"], ["Angel Falls", "South America"], ["Mount Kilimanjaro", "Africa"]],
      "wonder", "A <b>natural wonder</b> is an amazing place made by nature, not by people. There are natural wonders on every continent.", "Picture each wonder on the world map."),
    LS("Rainforests and polar lands", MC([
      ["Rainforests", "🌴 🦜", "A <b>rainforest</b> is a warm forest that gets lots of rain all year. The tall treetops form the <b>canopy</b>. The <b>Amazon</b> is the biggest rainforest."],
      ["Polar lands", "🧊 🐧", "The <b>Arctic</b> is around the North Pole, with sea ice. <b>Antarctica</b> is around the South Pole and is covered in thick ice. Polar bears live in the Arctic. Penguins live in the south."],
      ["Tip", "💡", "Rainforests are warm and wet. Polar places are cold and icy."]],
      ["Think about warm and wet versus cold and icy.", "Rainforest: lots of rain, near the Equator. Polar: ice, near the poles.", "Example: the treetop layer of a rainforest is the canopy. Now do yours."],
      [["A rainforest gets lots of...", "Rain", "Snow|Sand"], ["The treetops of a rainforest are the...", "Canopy", "Tundra|Dune"], ["What is the biggest rainforest?", "The Amazon", "The Sahara|The Alps"], ["The Arctic is around the...", "North Pole", "South Pole|Equator"],
       ["Antarctica is around the...", "South Pole", "North Pole|Equator"], ["Antarctica is covered with thick...", "Ice", "Sand|Grass"], ["Polar bears live in the...", "Arctic", "Sahara|Amazon"]])),
    LS("Farming and food", MC([
      ["Where food grows", "🌾 🍚", "Food grows best where the land and weather fit. <b>Wheat</b> grows on flat plains. <b>Rice</b> grows in warm, wet fields. <b>Bananas</b> grow in hot, wet lands."],
      ["Helping crops", "💧 ⛰️", "Where there is little rain, farmers use <b>irrigation</b> to bring water to the crops. In hilly places, farmers cut flat steps called <b>terraces</b> into the hillside."],
      ["Tip", "💡", "Farmers need three things: good soil, enough water and the right weather."]],
      ["Think about what plants need to grow.", "Water, soil and warmth. Which place has them?", "Example: wheat grows well on flat, grassy plains. Now do yours."],
      [["Rice grows best in...", "Warm, wet fields", "Dry deserts|Icy lands"], ["Wheat often grows on...", "Flat plains", "Frozen ice|Tall cliffs"], ["Bananas need...", "Hot, wet weather", "Snow|Dry ice"], ["Bringing water to dry crops is called...", "Irrigation", "Terracing|Shipping"],
       ["Steps cut into a hillside for farming are called...", "Terraces", "Canals|Caves"], ["Which place is hard for farming?", "A dry desert with no water", "A plain with rain|A river valley"], ["Farmers need good...", "Soil and water", "Ice and wind|Snow and sand"]])),
    LS("Cities and their countries", PAIR([["Sydney", "Australia", "🏙️"], ["Toronto", "Canada", "🏙️"], ["Rio de Janeiro", "Brazil", "🏙️"], ["Mumbai", "India", "🏙️"], ["Cape Town", "South Africa", "🏙️"], ["Barcelona", "Spain", "🏙️"], ["Osaka", "Japan", "🏙️"], ["Munich", "Germany", "🏙️"], ["Venice", "Italy", "🏙️"], ["Istanbul", "Turkey", "🏙️"]], {
      title: "Cities and their countries", tv: "🏙️ 🌆", intro: "Capitals are not the only big cities. Many countries have other large and famous cities too.", tip: "A city is part of a country. Say them together, like Sydney, Australia.",
      f: a => `In which country is the city of ${a}?`, r: b => `Which city is in ${b}?`, n: "Think about the city. Which country is it part of?"
    })),
    LS("Map tools", MC([
      ["Tools for finding places", "🗺️ 🧭", "An <b>atlas</b> is a book of maps. A <b>globe</b> is a model of Earth. A <b>compass</b> has a needle that points north."],
      ["Modern tools", "📡 📱", "<b>GPS</b> uses satellites to tell where you are, and phones use it for directions. A <b>cartographer</b> is a person who makes maps."],
      ["Tip", "💡", "A globe shows the true shape of Earth. A flat map can stretch some places."]],
      ["Think about what each tool does.", "Book of maps, model of Earth, needle pointing north, satellites.", "Example: a model of the whole Earth is a globe. Now do yours."],
      [["A book of maps is an...", "Atlas", "Compass|Globe"], ["A model of Earth is a...", "Globe", "Atlas|Scale"], ["Which tool has a needle that points north?", "A compass", "A ruler|A globe"], ["Which tool uses satellites to find where you are?", "GPS", "An atlas|A compass rose"],
       ["A person who makes maps is a...", "Cartographer", "Chef|Pilot"], ["Which shows the true shape of Earth best?", "A globe", "A flat map|A table"], ["Which tool could help a driver find a road in a new town?", "GPS", "A globe|A thermometer"]])),
    LS("Places from small to big", MC([
      ["Growing bigger", "🏠 🏙️ 🌍", "Places nest like boxes. A <b>neighborhood</b> is inside a <b>city</b>. A city is inside a <b>state</b>. A state is inside a <b>country</b>. A country is in a <b>continent</b>."],
      ["Examples", "📍", "Paris is a city in France. France is a country in Europe. Texas is a state in the United States."],
      ["Tip", "💡", "Think of Russian dolls: each place fits in a bigger one."]],
      ["Think of boxes inside boxes.", "Neighborhood, city, state, country, continent: small to big.", "Example: a city is bigger than a neighborhood. Now do yours."],
      [["Which is bigger: a city or a state?", "A state", "A city"], ["Which is bigger: a country or a continent?", "A continent", "A country"], ["Paris is a...", "City", "Continent|State"], ["France is a...", "Country", "City|Continent"],
       ["Africa is a...", "Continent", "Country|City"], ["Texas is a...", "State", "Continent|City"], ["A neighborhood is inside a...", "City", "Planet|Continent"]])),
  ];
  l6.push(LS("Mixed practice", MX(l6, [0, 2, 5, 6, 8, 11, 12, 15])));
  l6.push(LS("Level 6 Challenge", MX(l6, [1, 3, 4, 7, 9, 10, 13, 14, 16, 17])));

  Object.assign(GEO_LEVELS, { 4: l4, 5: l5, 6: l6 });
})();
