// ext/geo-10-12.js : Mind Lab Geography levels 10-12 (60 lessons)
(() => {
  const slide = (h, v, t) => ({ h, v, t });
  const strip = s => String(s).replace(/^(a|an|the)\s+/i, "");
  const first = s => strip(s).replace(/<[^>]+>/g, "")[0].toUpperCase();
  const LS = (title, make) => ({ title, make });
  const fmt = n => n.toLocaleString("en-US");
  const cap = s => s[0].toUpperCase() + s.slice(1);

  // Multiple choice. items = [question, right, "wrong1|wrong2", optional picture]
  const MC = (s, n, c, items) => {
    const make = () => {
      const [q, a, w, v] = pick(items), ex = pick(items.filter(x => x[1] !== a));
      const r = {
        text: q, choices: shuf([a, ...w.split("|")]), answer: a,
        hints: [n, `${c} The answer starts with the letter "${first(a)}".`, `Example: "${ex[0]}" The answer is "${ex[1]}". Now do yours.`]
      };
      if (v) r.visual = v;
      return r;
    };
    make.teach = () => s.map(x => slide(x[0], x[1], x[2]));
    return make;
  };
  // Pairs: list = [a, b, optional emoji]
  const PAIR = (list, o) => {
    const make = () => {
      const cur = pick(list), rest = shuf(list.filter(x => x !== cur)), ex = rest[0];
      if (o.r && Math.random() < 0.4) return {
        text: o.r(cur[1]), choices: shuf([cur[0], rest[1][0], rest[2][0]]), answer: cur[0],
        hints: [o.n, `The answer starts with the letter "${first(cur[0])}".`, `Example: ${ex[1]} goes with ${ex[0]}. Now do yours.`]
      };
      const r = {
        text: o.f(cur[0]), choices: shuf([cur[1], rest[1][1], rest[2][1]]), answer: cur[1],
        hints: [o.n, `The answer starts with the letter "${first(cur[1])}".`, `Example: ${ex[0]} goes with ${ex[1]}. So when the question is about ${ex[0]}, the answer is ${ex[1]}. Now do yours.`]
      };
      if (cur[2]) r.visual = cur[2];
      return r;
    };
    make.teach = () => [
      slide(o.title, o.tv || "🌍 🗺️", o.intro),
      slide("Let's learn", "📋", list.map(x => `${x[2] ? x[2] + " " : ""}<b>${x[0]}</b>: ${x[1]}`).join("<br>")),
      slide("Remember", "💡", o.tip)
    ];
    return make;
  };
  // Sorting into groups. items = [name, group, optional emoji]
  const CLS = o => {
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
  const NUM = (s, fn) => { fn.teach = () => s.map(x => slide(x[0], x[1], x[2])); return fn; };

  // ---------- number makers ----------
  const TRIP = NUM([
    ["Map and travel time", "🚌 🗺️", "You can plan a trip with a map. First use the scale to change <b>map centimeters</b> into <b>real kilometers</b>. Then use the speed to find the <b>hours</b>."],
    ["Two steps", "✖️ ➗", "Real km = map cm <b>x</b> km per cm. Hours = real km <b>÷</b> km per hour."],
    ["Example", "3 cm, 1 cm = 20 km, 30 km/h", "3 x 20 = 60 km. Then 60 ÷ 30 = 2 hours."]
  ], () => {
    let k, v, h, total;
    do { k = pick([10, 20, 25, 50]); v = pick([40, 50, 60, 80, 100]); h = ri(2, 7); total = v * h; } while (total % k !== 0 || total / k > 40);
    const n = total / k, m = Math.random();
    if (m < 0.5) return {
      text: `On a map, 1 cm stands for ${k} km. A bus trip is ${n} cm long on the map. The bus drives ${v} km each hour. How many hours does the trip take?`, answer: h,
      hints: ["There are two steps. First find the real distance, then find the time.", "Change the map centimeters into real kilometers first. Then divide the kilometers by the speed.", "Example: 3 cm on a map where 1 cm = 20 km is 60 km. At 30 km each hour, 60 ÷ 30 = 2 hours. Now do yours."]
    };
    if (m < 0.75) return {
      text: `On a map, 1 cm stands for ${k} km. A trip is ${n} cm long on the map. How many real kilometers is the trip?`, answer: total,
      hints: ["Each centimeter on the map stands for the same real distance.", "Multiply the number of centimeters by the number of kilometers for each centimeter.", "Example: 4 cm where 1 cm = 25 km is 4 x 25 = 100 km. Now do yours."]
    };
    return {
      text: `A train trip takes ${h} hours at ${v} km each hour. On a map, 1 cm stands for ${k} km. How many centimeters long is the trip on the map?`, answer: n,
      hints: ["First find the real distance the train travels.", "Real distance is speed times hours. Then divide by the kilometers that one centimeter stands for.", "Example: 2 hours at 50 km each hour is 100 km. If 1 cm = 20 km, then 100 ÷ 20 = 5 cm. Now do yours."]
    };
  });

  const CONTOUR = NUM([
    ["Contour lines", "⛰️ ➰", "A <b>contour line</b> joins places that are the <b>same height</b> above sea level. The <b>contour interval</b> is how much the height goes up from one line to the next."],
    ["Reading them", "🔍", "Lines <b>close together</b> mean a <b>steep</b> slope. Lines <b>far apart</b> mean gentle, flatter land. Circles inside circles show a hill or mountain top."],
    ["Example", "interval = 20 m", "The 0 m line, then 20 m, 40 m, 60 m. The third line above sea level is 3 x 20 = 60 m high."]
  ], () => {
    const k = pick([10, 20, 25, 50, 100]), m = Math.random();
    if (m < 0.35) {
      const n = ri(3, 9);
      return {
        text: `The contour interval is ${k} m. A hill's top is circled by the line that is ${n} lines above the 0 m line. How many meters high is that line?`, answer: n * k,
        hints: ["Each line is the same number of meters higher than the one before.", "Multiply the number of lines by the contour interval.", "Example: with an interval of 20 m, the 4th line above sea level is 4 x 20 = 80 m. Now do yours."]
      };
    }
    if (m < 0.7) {
      const a = k * ri(1, 4), b = a + k * ri(2, 6);
      return {
        text: `The contour interval is ${k} m. Point A is on the ${a} m line. Point B is on the ${b} m line. How many meters higher is Point B than Point A?`, answer: b - a,
        hints: ["You are comparing two heights.", "Subtract the lower height from the higher height.", "Example: a point on the 300 m line and one on the 120 m line differ by 300 - 120 = 180 m. Now do yours."]
      };
    }
    const n = ri(3, 9);
    return {
      text: `The contour interval is ${k} m. A hiker walks from the 0 m line up to the ${n * k} m line. How many new contour lines does the hiker reach (counting the last one, not the 0 m line)?`, answer: n,
      hints: ["Each line the hiker reaches is one step in height.", "Count how many steps of the interval fit into the total height. Divide the height by the interval.", "Example: with an interval of 50 m, going from 0 m to 200 m reaches 200 ÷ 50 = 4 lines. Now do yours."]
    };
  });

  const ROUND = NUM([
    ["Rounding big numbers", "👥", "Geographers round population numbers to make them easy to read. You round to a <b>place</b>, like the nearest hundred, thousand or ten thousand."],
    ["The rule", "👉", "Look at the digit <b>one place to the right</b> of the place you are rounding to. If it is <b>5 or more</b>, round <b>up</b>. If it is <b>4 or less</b>, keep the digit the same. Then change the digits to the right into zeros."],
    ["Example", "2,370", "To the nearest hundred: the tens digit is 7, so round up. 2,370 rounds to 2,400."]
  ], () => {
    const place = pick([100, 1000, 10000]), n = ri(10000, 99999), r = Math.round(n / place) * place;
    const pn = place === 100 ? "hundred" : place === 1000 ? "thousand" : "ten thousand";
    const who = pick(["A city", "A town", "A county", "A stadium", "A region"]);
    return {
      text: `${who} has ${fmt(n)} people. Round the number to the nearest ${pn}.`, answer: r,
      hints: ["Find the place you are rounding to. Then look at the digit just to its right.", "If the digit to the right is 5 or more, round up. If it is 4 or less, the digit stays the same. Then make the rest zeros.", "Example: 36,482 to the nearest thousand. The hundreds digit is 4, so we keep the 6. The answer is 36,000. Now do yours."]
    };
  });

  const LATS = [["Reykjavik", 64], ["Moscow", 56], ["London", 52], ["Paris", 49], ["Rome", 42], ["New York", 41], ["Tokyo", 36], ["Cairo", 30], ["Mumbai", 19], ["Singapore", 1], ["Nairobi", -1], ["Lima", -12], ["Rio de Janeiro", -23], ["Sydney", -34], ["Buenos Aires", -35], ["Wellington", -41]];
  const lat = l => `${Math.abs(l)}° ${l >= 0 ? "N" : "S"}`;
  const LATCOMP = NUM([
    ["Comparing latitudes", "🌐", "Latitude tells how far north or south a place is. A place with <b>N</b> is north of the Equator. A place with <b>S</b> is south of it."],
    ["Farthest north", "⬆️", "Among north places, the <b>bigger</b> number is farther north. Any N place is farther north than any S place. Among south places, the bigger number is farther south."],
    ["Close to the Equator", "➖", "The Equator is 0°. The place with the <b>smallest number</b> (ignore N and S) is closest to the Equator."]
  ], () => {
    let t, mode = pick(["north", "south", "eq"]);
    for (;;) {
      t = shuf(LATS).slice(0, 3);
      const ls = t.map(x => x[1]), as = ls.map(Math.abs);
      const ok = (arr) => { const s = arr.slice().sort((a, b) => a - b); return s[1] - s[0] >= 5 && s[2] - s[1] >= 5; };
      if (mode === "eq" ? ok(as) : ok(ls)) break;
    }
    const vis = t.map(x => `<b>${x[0]}</b>: ${lat(x[1])}`).join("<br>");
    const best = mode === "north" ? t.reduce((a, b) => b[1] > a[1] ? b : a) : mode === "south" ? t.reduce((a, b) => b[1] < a[1] ? b : a) : t.reduce((a, b) => Math.abs(b[1]) < Math.abs(a[1]) ? b : a);
    const what = mode === "north" ? "farthest north" : mode === "south" ? "farthest south" : "closest to the Equator";
    return {
      text: `Look at the latitudes of these three cities. Which city is ${what}?`, visual: vis, choices: shuf(t.map(x => x[0])), answer: best[0],
      hints: [mode === "eq" ? "The Equator is 0°. Which city has the number nearest to 0?" : mode === "north" ? "North is toward the North Pole. Look at the letters N and S first." : "South is toward the South Pole. Look at the letters N and S first.",
        mode === "eq" ? "Ignore the letters N and S. Find the smallest number." : mode === "north" ? "Any city marked N is farther north than any city marked S. Among the N cities, look for the biggest number." : "Any city marked S is farther south than any city marked N. Among the S cities, look for the biggest number.",
        mode === "eq" ? "Example: for 5° N, 20° S and 48° N, the 5° N one is closest to the Equator. Now do yours." : mode === "north" ? "Example: for 10° S, 25° N and 60° N, the 60° N one is farthest north. Now do yours." : "Example: for 10° N, 25° S and 60° S, the 60° S one is farthest south. Now do yours."]
    };
  });

  const RFSCALE = (() => {
    const SC = [[25000, 0.25], [50000, 0.5], [100000, 1], [200000, 2], [500000, 5], [1000000, 10]];
    return NUM([
      ["Ratio scales", "📐", "Some maps show the scale as a ratio, like <b>1:100,000</b>. It means <b>1 cm</b> on the map stands for <b>100,000 cm</b> in real life."],
      ["Change to kilometers", "🛣️", "<b>100,000 cm = 1 km</b>. To change real centimeters into kilometers, take away the last <b>five zeros</b>. So 1:100,000 means 1 cm = 1 km, and 1:1,000,000 means 1 cm = 10 km."],
      ["Half and quarter", "½", "For 1:50,000, 1 cm = <b>half</b> a kilometer. For 1:25,000, 1 cm = <b>a quarter</b> of a kilometer. Pick a map distance that fits, then multiply."]
    ], () => {
      const s = pick(SC), n = s[1] === 0.25 ? 4 * ri(1, 6) : s[1] === 0.5 ? 2 * ri(1, 9) : ri(2, 9), km = n * s[1];
      const ex = pick(SC.filter(x => x[0] !== s[0] && x[1] >= 1));
      const exh = `Example: on a 1:${fmt(ex[0])} map, 1 cm = ${ex[1]} km, so 3 cm = ${3 * ex[1]} km. Now do yours.`;
      if (Math.random() < 0.65) return {
        text: `A map has the scale 1:${fmt(s[0])}. Two towns are ${n} cm apart on the map. How many kilometers apart are they in real life?`, answer: km,
        hints: ["The ratio tells you how many real centimeters one map centimeter stands for.", "Change the real centimeters to kilometers by taking away five zeros (100,000 cm = 1 km). Then multiply by the map distance.", exh]
      };
      return {
        text: `A map has the scale 1:${fmt(s[0])}. Two towns are ${km} km apart in real life. How many centimeters apart are they on the map?`, answer: n,
        hints: ["First work out how many kilometers one map centimeter stands for.", "Take away five zeros from the scale number to get kilometers for 1 cm. Then see how many of those fit into the real distance.", `Example: on a 1:${fmt(ex[0])} map, 1 cm = ${ex[1]} km, so ${5 * ex[1]} km is 5 cm. Now do yours.`]
      };
    });
  })();

  const POPGROW = NUM([
    ["Growing towns", "🏘️", "Towns can grow or shrink. If a town gains the same number of people every year, <b>multiply</b> the yearly gain by the number of years."],
    ["Start and change", "➕➖", "New population = start + (gain per year x years). If people leave, <b>subtract</b> instead."],
    ["Example", "10,000 + 500 x 4", "500 x 4 = 2,000. Then 10,000 + 2,000 = 12,000 people."]
  ], () => {
    const P = pick([20000, 30000, 40000, 50000, 60000]), g = pick([1000, 1500, 2000, 2500, 3000]), y = ri(3, Math.min(8, Math.floor((P - 1) / g))), m = Math.random();
    if (m < 0.35) return {
      text: `A town has ${fmt(P)} people. Each year ${fmt(g)} new people move in. How many people live there after ${y} years?`, answer: P + g * y,
      hints: ["There are two steps. First find the total gain, then add it to the start.", "Multiply the yearly gain by the number of years. Then add that to the starting number.", "Example: 10,000 people, 500 more each year for 4 years. 500 x 4 = 2,000, and 10,000 + 2,000 = 12,000. Now do yours."]
    };
    if (m < 0.6) return {
      text: `A town has ${fmt(P)} people. Each year ${fmt(g)} people move away. How many people live there after ${y} years?`, answer: P - g * y,
      hints: ["People are leaving, so the number gets smaller.", "Multiply the yearly loss by the number of years. Then subtract that from the starting number.", "Example: 10,000 people, 500 leave each year for 4 years. 500 x 4 = 2,000, and 10,000 - 2,000 = 8,000. Now do yours."]
    };
    if (m < 0.8) return {
      text: `A city grew by ${fmt(g)} people every year. It grew for ${y} years. How many people did it gain in all?`, answer: g * y,
      hints: ["The same gain happens each year.", "Multiply the yearly gain by the number of years.", "Example: a gain of 500 a year for 4 years is 500 x 4 = 2,000 people. Now do yours."]
    };
    return {
      text: `A city gains ${fmt(g)} people each year. In how many years will it gain ${fmt(g * y)} people?`, answer: y,
      hints: ["You know the total and the yearly gain. You need the number of years.", "Divide the total gain by the yearly gain.", "Example: gaining 500 a year, a total gain of 2,000 takes 2,000 ÷ 500 = 4 years. Now do yours."]
    };
  });

  const COMPASS = (() => {
    const D = [["North", 0], ["East", 90], ["South", 180], ["West", 270]];
    const I = [["Northeast", 45, "halfway between North and East"], ["Southeast", 135, "halfway between East and South"], ["Southwest", 225, "halfway between South and West"], ["Northwest", 315, "halfway between West and North"]];
    return NUM([
      ["Compass degrees", "🧭", "A circle has 360 degrees. On a compass, <b>North = 0°</b>, <b>East = 90°</b>, <b>South = 180°</b> and <b>West = 270°</b>. We count clockwise."],
      ["In between", "↗️", "<b>Northeast = 45°</b>, <b>Southeast = 135°</b>, <b>Southwest = 225°</b> and <b>Northwest = 315°</b>. Each one is halfway between two main directions."],
      ["Turning", "🔄", "Turning clockwise <b>adds</b> degrees. Turning counterclockwise <b>subtracts</b>. If you pass 360, go back to 0."]
    ], () => {
      const m = Math.random();
      if (m < 0.45) {
        const d = pick(D), t = pick([90, 180, 270]);
        return {
          text: `You face ${d[0]} (${d[1]}°) and turn clockwise ${t}°. What compass bearing do you face now? (Type a number from 0 to 359.)`, answer: (d[1] + t) % 360,
          hints: ["Turning clockwise means adding degrees.", "Add the turn to your starting bearing. If the total reaches 360, it goes back around to 0.", "Example: facing East (90°) and turning clockwise 90° gives 180°, which is South. Now do yours."]
        };
      }
      if (m < 0.65) {
        const d = pick(D), t = pick([90, 180, 270]);
        return {
          text: `You face ${d[0]} (${d[1]}°) and turn counterclockwise ${t}°. What compass bearing do you face now? (Type a number from 0 to 359.)`, answer: (d[1] - t + 360) % 360,
          hints: ["Turning counterclockwise means taking degrees away.", "Subtract the turn from your starting bearing. If the answer would be below 0, add 360.", "Example: facing South (180°) and turning counterclockwise 90° gives 90°, which is East. Now do yours."]
        };
      }
      const c = pick(I), e = pick(I.filter(x => x !== c));
      return {
        text: `The direction ${c[0]} is ${c[2]}. What is its compass bearing in degrees?`, answer: c[1],
        hints: ["Find the two main directions in the question. Think of their degrees.", "Find the number that is exactly in the middle of the two bearings.", `Example: ${e[0]} is ${e[2]}, so its bearing is ${e[1]}°. Now do yours.`]
      };
    });
  })();

  const CONV = NUM([
    ["Kilometers and meters", "📏", "<b>1 kilometer (km) = 1,000 meters (m)</b>. To change km to m, <b>multiply by 1,000</b>. To change m to km, <b>divide by 1,000</b>."],
    ["Mixed lengths", "🥾", "For 2 km 300 m, change the km first: 2 km = 2,000 m. Then add the rest: 2,000 + 300 = 2,300 m."],
    ["Tip", "💡", "Moving a decimal point three places is the same as x 1,000 or ÷ 1,000."]
  ], () => {
    const n = ri(2, 9), m = Math.random();
    if (m < 0.3) return {
      text: `A hiking trail is ${n} km long. How many meters is that?`, answer: n * 1000,
      hints: ["Meters are smaller than kilometers, so the number gets bigger.", "Multiply the kilometers by 1,000.", "Example: 3 km is 3 x 1,000 = 3,000 m. Now do yours."]
    };
    if (m < 0.55) return {
      text: `A river bridge is ${n * 1000} m long. How many kilometers is that?`, answer: n,
      hints: ["Kilometers are bigger than meters, so the number gets smaller.", "Divide the meters by 1,000.", "Example: 6,000 m is 6,000 ÷ 1,000 = 6 km. Now do yours."]
    };
    if (m < 0.8) {
      const r = pick([100, 200, 250, 300, 400, 500, 600, 750]);
      return {
        text: `A path is ${n} km ${r} m long. How many meters is that in all?`, answer: n * 1000 + r,
        hints: ["Change the kilometers into meters first.", "Multiply the kilometers by 1,000, then add the extra meters.", "Example: 2 km 400 m is 2,000 + 400 = 2,400 m. Now do yours."]
      };
    }
    return {
      text: `A lake is ${n * 1000 + 500} m across. How many kilometers and meters is that? Type just the number of kilometers (the whole part).`, answer: n,
      hints: ["Every 1,000 m makes one whole kilometer.", "Divide the meters by 1,000 and keep only the whole number part.", "Example: 4,500 m is 4 whole kilometers and 500 meters left over, so the whole part is 4. Now do yours."]
    };
  });

  const SEALEVEL = NUM([
    ["Above and below sea level", "🌊", "<b>Sea level</b> is 0 m. Land higher than the sea is <b>above</b> sea level. Some places are <b>below</b> sea level, like the shore of the Dead Sea and Death Valley."],
    ["Negative numbers", "➖", "Heights below sea level are written with a minus sign: -86 m means 86 meters <b>below</b> sea level."],
    ["Finding the gap", "↕️", "From a place below sea level to a place above it, <b>add</b> the two distances. They are on opposite sides of 0."]
  ], () => {
    const m = Math.random();
    if (m < 0.35) {
      const a = ri(50, 900), b = ri(20, 400);
      return {
        text: `Town A is ${a} m above sea level. Town B is ${b} m below sea level. How many meters higher is Town A than Town B?`, answer: a + b,
        hints: ["The two towns are on opposite sides of sea level (0 m).", "When one is above and one is below, add the two distances.", "Example: a hill 300 m above sea level and a valley 50 m below it are 300 + 50 = 350 m apart. Now do yours."]
      };
    }
    if (m < 0.65) {
      const d = ri(100, 500), c = ri(10, d - 10);
      return {
        text: `A submarine is ${d} m below sea level. It rises ${c} m. How many meters below sea level is it now?`, answer: d - c,
        hints: ["Rising means moving closer to the surface.", "Subtract the rise from the starting depth.", "Example: a submarine 200 m deep that rises 80 m is at 200 - 80 = 120 m below sea level. Now do yours."]
      };
    }
    if (m < 0.85) {
      const b = ri(20, 300), a = ri(100, 1200);
      return {
        text: `A path begins ${b} m below sea level and climbs to ${a} m above sea level. How many meters does the path climb?`, answer: a + b,
        hints: ["The path crosses sea level on its way up.", "Add the distance below sea level to the distance above it.", "Example: from 40 m below to 160 m above is 40 + 160 = 200 m of climbing. Now do yours."]
      };
    }
    const a = ri(500, 3000), c = ri(100, a - 50);
    return {
      text: `A village is ${a} m above sea level. A hiker walks down ${c} m. How many meters above sea level is the hiker now?`, answer: a - c,
      hints: ["Walking down makes the height smaller.", "Subtract the distance walked down from the village height.", "Example: from 900 m above sea level, walking down 250 m leaves 900 - 250 = 650 m. Now do yours."]
    };
  });

  const AVGTEMP = NUM([
    ["Average temperature", "🌡️", "The <b>average</b> (mean) is found by <b>adding</b> all the numbers and then <b>dividing</b> by how many numbers there are."],
    ["Range", "↔️", "The <b>range</b> shows how spread out the numbers are. Range = <b>highest</b> number minus <b>lowest</b> number."],
    ["Example", "10, 14, 18, 22", "10 + 14 + 18 + 22 = 64, and 64 ÷ 4 = 16. The range is 22 - 10 = 12."]
  ], () => {
    const c = pick([4, 5]), months = shuf(["January", "March", "May", "July", "September", "November", "April", "June"]).slice(0, c);
    let ts;
    for (;;) {
      ts = Array.from({ length: c - 1 }, () => ri(4, 34));
      const s = ts.reduce((a, b) => a + b, 0), last = c * ri(8, 26) - s;
      if (last >= 2 && last <= 36) { ts.push(last); break; }
    }
    const list = months.map((mo, i) => `${mo}: ${ts[i]}°C`).join(", ");
    const sum = ts.reduce((a, b) => a + b, 0);
    if (Math.random() < 0.6) return {
      text: `A city had these temperatures: ${list}. What is the average temperature in °C?`, answer: sum / c,
      hints: ["The average shares the total equally among all the numbers.", "Add all the temperatures together, then divide by how many temperatures there are.", "Example: 10, 14, 18 and 22 add up to 64. 64 ÷ 4 = 16. Now do yours."]
    };
    return {
      text: `A city had these temperatures: ${list}. What is the range (highest minus lowest) in °C?`, answer: Math.max(...ts) - Math.min(...ts),
      hints: ["The range compares the warmest month and the coolest month.", "Find the highest and the lowest temperature, then subtract the lowest from the highest.", "Example: for 10, 14, 18 and 22, the range is 22 - 10 = 12. Now do yours."]
    };
  });

  // Cities and coordinates
  const CITYCOORD = [["Cairo", "30° N, 31° E"], ["Tokyo", "36° N, 140° E"], ["Sydney", "34° S, 151° E"], ["Rio de Janeiro", "23° S, 43° W"], ["New York City", "41° N, 74° W"], ["Cape Town", "34° S, 18° E"], ["Lima", "12° S, 77° W"],
    ["Moscow", "56° N, 38° E"], ["New Delhi", "29° N, 77° E"], ["Mexico City", "19° N, 99° W"], ["Nairobi", "1° S, 37° E"], ["Madrid", "40° N, 4° W"], ["Beijing", "40° N, 116° E"]];
  const COORDCITY = (() => {
    const make = () => {
      const cur = pick(CITYCOORD), rest = shuf(CITYCOORD.filter(x => x !== cur)), ex = rest[0];
      const exh = `Example: ${ex[0]} is at about ${ex[1]}. The letters tell the hemispheres. Now do yours.`;
      if (Math.random() < 0.55) return {
        text: `Which coordinates are closest to ${cur[0]}?`, choices: shuf([cur[1], rest[1][1], rest[2][1]]), answer: cur[1],
        hints: ["The letters N or S say north or south of the Equator. E or W say east or west of the Prime Meridian.", "Think about where the city is on a world map. Use the letters to cross out choices in the wrong hemispheres.", exh]
      };
      return {
        text: `Which city is closest to ${cur[1]}?`, choices: shuf([cur[0], rest[1][0], rest[2][0]]), answer: cur[0],
        hints: ["Read the letters after the numbers. They tell you the hemispheres.", "Picture the world map. Is the place north or south, east or west? Cross out cities in the wrong part of the world.", `Example: ${ex[1]} is closest to ${ex[0]}. Now do yours.`]
      };
    };
    make.teach = () => [
      slide("Cities on the grid", "🌐", "Every city has coordinates: <b>latitude</b> (N or S) and <b>longitude</b> (E or W). They are often rounded to whole degrees."),
      slide("Let's learn", "📋", CITYCOORD.map(x => `<b>${x[0]}</b>: ${x[1]}`).join("<br>")),
      slide("Remember", "💡", "First think about the hemispheres. N or S? E or W? That often shows you the right answer fast.")
    ];
    return make;
  })();

  // ---------- fact lists ----------
  const NICK = [["Florida", "Sunshine State"], ["Texas", "Lone Star State"], ["California", "Golden State"], ["New York", "Empire State"], ["New Jersey", "Garden State"], ["Ohio", "Buckeye State"], ["Georgia", "Peach State"], ["Hawaii", "Aloha State"], ["Maine", "Pine Tree State"], ["Colorado", "Centennial State"], ["Alaska", "Last Frontier"]];
  const ABBR = [["Alabama", "AL"], ["Alaska", "AK"], ["Arizona", "AZ"], ["Colorado", "CO"], ["Massachusetts", "MA"], ["Michigan", "MI"], ["Minnesota", "MN"], ["Mississippi", "MS"], ["Missouri", "MO"], ["Pennsylvania", "PA"], ["Tennessee", "TN"], ["Washington", "WA"], ["Florida", "FL"], ["Texas", "TX"]];
  const LANG = [["Egypt", "Arabic"], ["Turkey", "Turkish"], ["Iran", "Persian"], ["Sweden", "Swedish"], ["Thailand", "Thai"], ["Poland", "Polish"], ["Vietnam", "Vietnamese"], ["South Korea", "Korean"], ["Indonesia", "Indonesian"], ["Ethiopia", "Amharic"], ["Hungary", "Hungarian"], ["Finland", "Finnish"]];
  const FOOD = [["paella", "Spain", "🥘"], ["tacos", "Mexico", "🌮"], ["pierogi", "Poland", "🥟"], ["kimchi", "South Korea", "🥬"], ["injera flatbread", "Ethiopia", "🫓"], ["couscous", "Morocco", "🍲"], ["pad thai", "Thailand", "🍜"], ["poutine", "Canada", "🍟"],
    ["goulash", "Hungary", "🍲"], ["ceviche", "Peru", "🐟"], ["pho", "Vietnam", "🍜"], ["fish and chips", "the United Kingdom", "🐟"], ["sushi", "Japan", "🍣"]];
  const LANDMARK = [["Big Ben", "London", "🕰️"], ["the Colosseum", "Rome", "🏛️"], ["the Eiffel Tower", "Paris", "🗼"], ["the Brandenburg Gate", "Berlin", "🏛️"], ["the Acropolis", "Athens", "🏛️"], ["the Sagrada Familia", "Barcelona", "⛪"], ["Christ the Redeemer", "Rio de Janeiro", "🗿"],
    ["the Burj Khalifa", "Dubai", "🏙️"], ["the Forbidden City", "Beijing", "🏯"], ["the Golden Gate Bridge", "San Francisco", "🌉"], ["the Space Needle", "Seattle", "🗼"], ["the Gateway Arch", "St. Louis", "🌈"], ["the Kremlin", "Moscow", "🏰"]];
  const STATEPROD = [["potatoes", "Idaho", "🥔"], ["wheat", "Kansas", "🌾"], ["corn", "Iowa", "🌽"], ["lobster", "Maine", "🦞"], ["apples", "Washington", "🍎"], ["maple syrup", "Vermont", "🍁"], ["cattle ranches", "Texas", "🐄"], ["dairy and cheese", "Wisconsin", "🧀"], ["sugarcane", "Louisiana", "🎋"], ["tart cherries", "Michigan", "🍒"]];
  const SEASIA = [["Cambodia", "Phnom Penh"], ["Laos", "Vientiane"], ["Myanmar", "Naypyidaw"], ["Kazakhstan", "Astana"], ["Kyrgyzstan", "Bishkek"], ["Bhutan", "Thimphu"], ["Brunei", "Bandar Seri Begawan"], ["Timor-Leste", "Dili"], ["Turkmenistan", "Ashgabat"], ["Tajikistan", "Dushanbe"]];
  const AFCAPS = [["the Democratic Republic of the Congo", "Kinshasa"], ["Angola", "Luanda"], ["Cameroon", "Yaounde"], ["Mozambique", "Maputo"], ["Madagascar", "Antananarivo"], ["Namibia", "Windhoek"], ["Botswana", "Gaborone"], ["Mali", "Bamako"], ["Sudan", "Khartoum"], ["Somalia", "Mogadishu"]];

  // =============== LEVEL 10 ===============
  const l10 = [
    LS("State nicknames", PAIR(NICK, {
      title: "State nicknames", tv: "🇺🇸 ⭐", intro: "Many states have a <b>nickname</b> that tells something special about them, like their weather, a famous plant or their history.",
      f: a => `What is the nickname of ${a}?`, r: b => `Which state is called the ${b}?`, n: "Think about what is special about the state, like sunshine, peaches, stars or gold.", tip: "A nickname is a hint about the state. Link each one with a picture, like a sun for Florida."
    })),
    LS("State postal codes", PAIR(ABBR, {
      title: "State postal codes", tv: "✉️ 🇺🇸", intro: "Every state has a two-letter <b>postal code</b> used on mail. Some are easy, like TX for Texas. Some are tricky, like MA, MI, MN, MS and MO.",
      f: a => `What is the two-letter postal code of ${a}?`, r: b => `Which state has the postal code ${b}?`, n: "Say the state name and think about the first letters of its name.", tip: "Be careful with the states that start with the same letters: Massachusetts, Michigan, Minnesota, Mississippi and Missouri."
    })),
    LS("National parks", CLS({
      title: "National parks", tv: "🏞️ 🦬 🌲", cats: ["Wyoming", "California", "Arizona", "Florida", "Maine", "Utah", "Alaska", "South Dakota", "Washington", "New Mexico"], q: n => `In which state is ${n} National Park?`,
      intro: "A <b>national park</b> is land the nation protects so that nature and wildlife stay safe and people can enjoy them.", tip: "Picture each park and its famous feature: geysers, giant trees, canyons, caves or swamps.",
      n: "Think about the park's famous feature and where in the country it is.", c: "Use the map of the United States. Cross out states that are far from the park's land type.",
      items: [["Yellowstone", "Wyoming", "⛲"], ["Yosemite", "California", "🌲"], ["Grand Canyon", "Arizona", "🏜️"], ["Everglades", "Florida", "🐊"], ["Acadia", "Maine", "🌊"], ["Zion", "Utah", "🏔️"], ["Denali", "Alaska", "🐻"], ["Badlands", "South Dakota", "🦬"], ["Olympic", "Washington", "🌲"], ["Carlsbad Caverns", "New Mexico", "🦇"], ["Arches", "Utah", "🪨"]]
    })),
    LS("Map trips: distance and time", TRIP),
    LS("Contour lines", CONTOUR),
    LS("The water cycle", MC([
      ["Water goes round", "💧 ☀️ ☁️", "Water is always moving in a loop called the <b>water cycle</b>. The Sun gives the energy that makes it go."],
      ["The steps", "🌧️", "<b>Evaporation</b>: the Sun turns water into invisible vapor. <b>Condensation</b>: vapor cools and forms clouds. <b>Precipitation</b>: rain, snow, sleet or hail falls. <b>Collection</b>: water gathers in oceans, lakes and rivers."],
      ["Extra words", "🌱", "<b>Runoff</b> is water flowing over the ground to streams and rivers. <b>Transpiration</b> is water vapor that plants give off through their leaves."]],
      "Think about the step: is water rising, cooling, falling or collecting?", "Warm and rising is one step. Cooling into clouds is another. Falling is another.",
      [["The Sun heats ocean water and turns it into invisible water vapor. This is called...", "Evaporation", "Condensation|Precipitation"], ["Water vapor cools high in the sky and forms tiny drops that make clouds. This is called...", "Condensation", "Evaporation|Collection"],
       ["Rain, snow, sleet and hail falling from clouds is called...", "Precipitation", "Evaporation|Condensation"], ["Water that flows over the ground into streams and rivers is called...", "Runoff", "Evaporation|Condensation"],
       ["What gives the energy that powers the water cycle?", "The Sun", "The Moon|The wind"], ["Water vapor is water as a...", "Gas", "Solid|Liquid"],
       ["A cold glass gets drops on the outside on a warm day. This shows...", "Condensation", "Evaporation|Precipitation"], ["A puddle slowly disappears on a sunny day. This shows...", "Evaporation", "Condensation|Precipitation"],
       ["Plants give off water vapor through their leaves. This is called...", "Transpiration", "Erosion|Runoff"], ["Where does most of Earth's water collect?", "In the oceans", "In clouds|In puddles"], ["Does the water cycle ever stop?", "No, it keeps going round and round", "Yes, every winter|Yes, at night"]])),
    LS("Clouds and precipitation", MC([
      ["Reading the sky", "☁️", "Clouds are made of tiny drops of water or ice. Their shapes tell about the weather. <b>Cumulus</b> clouds are puffy and white. <b>Stratus</b> clouds are flat gray layers. <b>Cirrus</b> clouds are thin and wispy, high up."],
      ["Storm clouds", "⛈️", "<b>Cumulonimbus</b> clouds are tall and dark and bring thunderstorms. <b>Fog</b> is a cloud that touches the ground."],
      ["What falls", "🌨️", "<b>Rain</b> is liquid drops. <b>Snow</b> is ice crystals. <b>Sleet</b> is frozen raindrops. <b>Hail</b> is balls of ice from thunderstorms. A <b>meteorologist</b> is a scientist who studies weather."]],
      "Think about the shape or the height of the cloud, or how the water falls.", "Puffy, flat, wispy and tall each have their own name.",
      [["Which cloud is puffy and white like cotton, often seen on fair days?", "Cumulus", "Stratus|Cirrus"], ["Which cloud is a flat gray layer that can bring drizzle?", "Stratus", "Cumulus|Cirrus"], ["Which cloud is thin and wispy, high in the sky?", "Cirrus", "Stratus|Cumulonimbus"],
       ["Which cloud is tall and dark and brings thunderstorms?", "Cumulonimbus", "Cirrus|Stratus"], ["A cloud that touches the ground is called...", "Fog", "Hail|Sleet"], ["Balls of ice that fall from thunderstorm clouds are called...", "Hail", "Fog|Drizzle"],
       ["Rain that freezes into small ice pellets as it falls is...", "Sleet", "Hail|Fog"], ["A scientist who studies weather is a...", "Meteorologist", "Geologist|Cartographer"], ["Snow forms when water in clouds freezes into...", "Ice crystals", "Raindrops|Sand"],
       ["Light rain with very small drops is called...", "Drizzle", "Hail|Blizzard"], ["Clouds are made of...", "Tiny drops of water or ice", "Smoke|Cotton"]])),
    LS("Weather maps and tools", MC([
      ["Weather map symbols", "🗺️ 🌦️", "On a weather map, <b>H</b> means <b>high</b> air pressure and usually fair, calm weather. <b>L</b> means <b>low</b> pressure and usually clouds and rain."],
      ["Fronts", "🔵 🔴", "A <b>cold front</b> is drawn as a blue line with triangles. A <b>warm front</b> is drawn as a red line with half circles. A front is where two kinds of air meet."],
      ["Tools", "🌡️", "A <b>thermometer</b> measures temperature. A <b>barometer</b> measures air pressure. A <b>wind vane</b> shows where the wind is blowing from. Water freezes at 0°C and boils at 100°C."]],
      "Think about the symbol or the tool and what it measures or shows.", "High and low pressure bring different weather. Fronts and tools each have their own sign or job.",
      [["On a weather map, what does an H mean?", "High air pressure", "Hot desert|Hail storm"], ["Which weather usually comes with high pressure?", "Clear, calm weather", "Stormy weather with rain|A hurricane"], ["On a weather map, what does an L mean?", "Low air pressure", "Land|Lake"],
       ["Low pressure often brings...", "Clouds and rain", "Clear dry skies|Dry sunshine"], ["A cold front is drawn as a blue line with...", "Triangles", "Half circles|Stars"], ["A warm front is drawn as a red line with...", "Half circles", "Triangles|Squares"],
       ["A tool that measures air pressure is a...", "Barometer", "Thermometer|Wind vane"], ["A wind vane shows...", "Which way the wind is blowing from", "How hot it is|How much rain fell"], ["A west wind blows from the...", "West", "East|North"],
       ["A weather forecast is...", "A prediction of coming weather", "A record of last year|A map of mountains"], ["Water freezes at what temperature on the Celsius scale?", "0°C", "32°C|100°C"], ["Water boils at what temperature on the Celsius scale?", "100°C", "0°C|50°C"]])),
    LS("Biomes up close", CLS({
      title: "Biomes up close", tv: "🌲 🦁 🌵", cats: ["Tundra", "Taiga (boreal forest)", "Temperate forest", "Savanna", "Desert", "Tropical rainforest"], q: n => `Which biome has ${n}?`,
      intro: "A <b>biome</b> is a big kind of place with its own weather, plants and animals. Each biome has its own clues.", tip: "Think about the temperature, the rain and the plants. Those three clues point to the biome.",
      n: "Think about the plants, the animals and the weather in the description.", c: "Cold with no tall trees, cold with evergreens, four seasons, grass with scattered trees, dry, or hot and wet: which fits?",
      items: [["caribou and frozen ground with no tall trees", "Tundra", "🦌"], ["Arctic foxes and permafrost (ground frozen all year)", "Tundra", "🦊"], ["evergreen trees with cones and very long winters", "Taiga (boreal forest)", "🌲"], ["moose and wolves among spruce and pine", "Taiga (boreal forest)", "🐺"],
              ["oak and maple trees that drop their leaves in fall", "Temperate forest", "🍂"], ["deer and squirrels with four seasons", "Temperate forest", "🦌"], ["lions and zebras with scattered acacia trees", "Savanna", "🦁"], ["elephants and giraffes grazing on grass in Africa", "Savanna", "🐘"],
              ["cacti and very little rain", "Desert", "🌵"], ["camels and sand dunes", "Desert", "🐪"], ["sloths and toucans under a thick canopy of tall trees", "Tropical rainforest", "🦥"], ["monkeys and parrots in hot, wet weather all year", "Tropical rainforest", "🦜"]]
    })),
    LS("South America", MC([
      ["The big picture", "🌎", "South America has <b>12 countries</b>. <b>Brazil</b> is the biggest and speaks Portuguese. Most other countries speak Spanish. The <b>Andes</b> are the longest mountain range on land."],
      ["Special places", "🏞️", "The <b>Amazon</b> is a huge river and rainforest. <b>Angel Falls</b> in Venezuela is the tallest waterfall. The <b>Atacama</b> in Chile is a very dry desert. <b>Lake Titicaca</b> sits high in the Andes between Peru and Bolivia."],
      ["Fun facts", "🐢", "<b>Chile</b> is long and thin. <b>Bolivia</b> and <b>Paraguay</b> have no coast. <b>Ecuador</b> means equator in Spanish. The <b>Galapagos Islands</b> belong to Ecuador."]],
      "Picture a map of South America. Where is the place or country?", "Use the facts about the Andes, the Amazon, the deserts and the coasts.",
      [["How many countries are in South America?", "12", "7|20"], ["Which is the biggest country in South America?", "Brazil", "Peru|Chile"], ["Which language do people speak in Brazil?", "Portuguese", "Spanish|French"], ["Which mountain range is the longest on land?", "The Andes", "The Alps|The Rockies"],
       ["Angel Falls, the tallest waterfall, is in which country?", "Venezuela", "Peru|Chile"], ["Which very dry desert is in Chile?", "The Atacama", "The Gobi|The Sahara"], ["Lake Titicaca lies between Peru and which country?", "Bolivia", "Brazil|Chile"],
       ["Which country is long and thin and runs along the Pacific coast?", "Chile", "Paraguay|Uruguay"], ["Which of these South American countries has no coast?", "Paraguay", "Peru|Argentina"], ["The Galapagos Islands belong to which country?", "Ecuador", "Colombia|Brazil"],
       ["The name of Ecuador means what in Spanish?", "Equator", "Island|Mountain"]])),
    LS("Canada", MC([
      ["Provinces and territories", "🇨🇦", "Canada has <b>10 provinces</b> and <b>3 territories</b>: Yukon, the Northwest Territories and Nunavut. Its capital is <b>Ottawa</b>. It is the second largest country in the world by area."],
      ["Land and water", "🍁", "The <b>Rocky Mountains</b> are in the west. The <b>Prairies</b> of Alberta, Saskatchewan and Manitoba are flat farmland. <b>Hudson Bay</b> is a huge bay in the north. The <b>St. Lawrence River</b> flows toward the Atlantic."],
      ["People", "🗣️", "Canada has two official languages: <b>English and French</b>. Most French speakers live in <b>Quebec</b>."]],
      "Think about the map of Canada from west to east and south to north.", "Use the lesson: provinces, territories, the Rockies, the Prairies and the bay in the north.",
      [["How many provinces does Canada have?", "10", "5|13"], ["Which of these is a Canadian territory?", "Yukon", "Ontario|Alberta"], ["What is the capital of Canada?", "Ottawa", "Toronto|Montreal"], ["Which mountains are in western Canada?", "The Rocky Mountains", "The Appalachians|The Alps"],
       ["The Prairies are mostly...", "Flat farmland", "Icy mountains|Rainforest"], ["Which huge bay is in northern Canada?", "Hudson Bay", "Bay of Bengal|Chesapeake Bay"], ["Canada's two official languages are English and...", "French", "Spanish|German"],
       ["Where do most French speakers in Canada live?", "Quebec", "Alberta|Nunavut"], ["Canada is the world's ... largest country by area.", "Second", "Fifth|Tenth"], ["Which river flows from the Great Lakes toward the Atlantic Ocean?", "St. Lawrence River", "Mississippi River|Colorado River"]])),
    LS("Mexico and Central America", MC([
      ["Mexico", "🇲🇽", "<b>Mexico</b> is south of the United States. Its capital, <b>Mexico City</b>, is on a high plateau. The <b>Rio Grande</b> forms part of the border with Texas. People there speak mostly Spanish."],
      ["Peninsulas", "🏝️", "<b>Baja California</b> is a long peninsula in the west. The <b>Yucatan Peninsula</b> sticks out in the east between the Gulf of Mexico and the Caribbean Sea. Mountain ranges called the <b>Sierra Madre</b> run along both sides."],
      ["Central America", "🌉", "<b>Central America</b> is a narrow bridge of land (an <b>isthmus</b>) joining North and South America. It has 7 countries: Belize, Guatemala, Honduras, El Salvador, Nicaragua, Costa Rica and Panama."]],
      "Picture the map of Mexico and Central America.", "Think about the peninsulas, the mountains, the capital and the narrow bridge of land.",
      [["What is the capital of Mexico?", "Mexico City", "Guadalajara|Cancun"], ["Which river forms part of the border between Mexico and Texas?", "The Rio Grande", "The Colorado|The Hudson"], ["Which peninsula sticks out in eastern Mexico?", "The Yucatan Peninsula", "Baja California|Florida"],
       ["Which long peninsula is in western Mexico?", "Baja California", "The Yucatan Peninsula|Alaska"], ["What do people speak in most of Mexico?", "Spanish", "Portuguese|French"], ["How many countries are in Central America?", "7", "3|12"],
       ["A narrow bridge of land joining two bigger lands is an...", "Isthmus", "Island|Archipelago"], ["Which Central American country has a famous canal?", "Panama", "Belize|Honduras"], ["Which Central American country is the only one that uses English as its official language?", "Belize", "Guatemala|Nicaragua"],
       ["Central America joins North America to...", "South America", "Africa|Europe"]])),
    LS("The Caribbean", MC([
      ["Island world", "🏝️ 🌴", "The <b>Caribbean Sea</b> is dotted with hundreds of islands. They are warm and tropical. <b>Cuba</b> is the biggest island. <b>Hispaniola</b> is shared by Haiti and the Dominican Republic."],
      ["More islands", "🇯🇲", "<b>Jamaica</b> is south of Cuba. <b>Puerto Rico</b> is a territory of the United States. The <b>Bahamas</b> are a chain of islands northeast of Cuba, in the Atlantic Ocean."],
      ["Storms", "🌀", "The Caribbean gets hurricanes. Hurricane season runs from <b>June to November</b>. People watch forecasts and prepare to stay safe."]],
      "Think about warm islands in a sea between North and South America.", "Use the lesson about the biggest island, the shared island and the storm season.",
      [["Which is the biggest island in the Caribbean?", "Cuba", "Jamaica|Barbados"], ["Which two countries share the island of Hispaniola?", "Haiti and the Dominican Republic", "Cuba and Jamaica|Cuba and Haiti"], ["Puerto Rico is a territory of which country?", "The United States", "Spain|France"],
       ["Which island country is south of Cuba?", "Jamaica", "Bahamas|Iceland"], ["Hurricane season in the Caribbean runs from...", "June to November", "December to March|January to February"], ["The Caribbean is a warm sea. Its weather is...", "Tropical", "Polar|Desert"],
       ["The Bahamas are a chain of...", "Islands", "Mountains|Canyons"], ["What is the capital of Cuba?", "Havana", "Kingston|Nassau"], ["Which sea surrounds these islands?", "The Caribbean Sea", "The Red Sea|The Black Sea"]])),
    LS("Landforms of Europe", MC([
      ["Mountains", "🏔️", "The <b>Alps</b> are in the middle of Europe, with Mont Blanc as a famous peak. The <b>Pyrenees</b> divide France and Spain. The <b>Ural Mountains</b> mark the edge between Europe and Asia."],
      ["Rivers and peninsulas", "🌊", "The <b>Volga</b> is Europe's longest river. The <b>Danube</b> flows through many countries to the Black Sea. The <b>Iberian Peninsula</b> holds Spain and Portugal. <b>Italy</b> is a boot-shaped peninsula."],
      ["Coasts", "⛵", "Norway has deep, narrow sea inlets called <b>fjords</b>. The <b>English Channel</b> is the water between England and France. A large flat area called the <b>North European Plain</b> stretches across northern Europe."]],
      "Picture a map of Europe. Where do these mountains, rivers and seas go?", "Think about the mountains in the middle, the rivers and the peninsulas.",
      [["Which mountains divide France and Spain?", "The Pyrenees", "The Alps|The Urals"], ["Which mountains mark the edge between Europe and Asia?", "The Ural Mountains", "The Alps|The Andes"], ["Which is the longest river in Europe?", "The Volga", "The Thames|The Seine"],
       ["The Danube River flows into which sea?", "The Black Sea", "The Red Sea|The Baltic Sea"], ["Spain and Portugal are on which peninsula?", "The Iberian Peninsula", "The Italian Peninsula|The Scandinavian Peninsula"], ["Which country is shaped like a boot?", "Italy", "Spain|Poland"],
       ["Deep, narrow sea inlets in Norway are called...", "Fjords", "Deltas|Mesas"], ["The water between England and France is the...", "English Channel", "Strait of Hormuz|Suez Canal"], ["Which mountains include the peak Mont Blanc?", "The Alps", "The Pyrenees|The Urals"],
       ["Northern Europe has a large flat area called the...", "North European Plain", "Great Plains|Tibetan Plateau"]])),
    LS("Landforms of Africa", MC([
      ["Deserts and rivers", "🏜️ 🌊", "The <b>Sahara</b> covers much of northern Africa. The <b>Sahel</b> is a dry belt south of it. The <b>Nile</b> flows north to the Mediterranean Sea. The <b>Congo River</b> flows through the rainforest in central Africa."],
      ["Mountains and lakes", "🏔️", "<b>Mount Kilimanjaro</b> in Tanzania is the tallest mountain in Africa. The <b>Atlas Mountains</b> are in the northwest. <b>Lake Victoria</b> is the biggest lake in Africa. The <b>Great Rift Valley</b> cuts through East Africa."],
      ["More", "💦", "<b>Victoria Falls</b> is a huge waterfall on the border of Zambia and Zimbabwe. <b>Madagascar</b> is a large island in the Indian Ocean. The <b>Kalahari</b> is a dry region in southern Africa."]],
      "Picture a map of Africa. Where is the place?", "Think about north, east, central and southern Africa.",
      [["Which desert covers much of northern Africa?", "The Sahara", "The Gobi|The Atacama"], ["The Nile River flows toward which sea?", "The Mediterranean Sea", "The Red Sea|The Caribbean Sea"], ["Which is the tallest mountain in Africa?", "Mount Kilimanjaro", "Mount Everest|Mont Blanc"],
       ["Which is the biggest lake in Africa?", "Lake Victoria", "Lake Superior|Lake Titicaca"], ["Which valley cuts through East Africa?", "The Great Rift Valley", "Death Valley|The Grand Canyon"], ["Victoria Falls is on the border of Zambia and which country?", "Zimbabwe", "Egypt|Kenya"],
       ["Madagascar is a large...", "Island in the Indian Ocean", "Lake in the Sahara|Mountain range"], ["Which mountains are in the northwest of Africa?", "The Atlas Mountains", "The Andes|The Alps"], ["Which river flows through the rainforest in central Africa?", "The Congo River", "The Danube|The Yangtze"],
       ["The Sahel is a dry belt...", "South of the Sahara", "North of the Sahara|Inside Antarctica"]])),
    LS("Landforms of Asia", MC([
      ["Mountains and plateaus", "🏔️", "The <b>Himalayas</b> hold Mount Everest, on the border of Nepal and China. The <b>Tibetan Plateau</b> is so high it is called the roof of the world. The <b>Gobi</b> is a cold desert in Mongolia and China."],
      ["Rivers and lakes", "🌊", "The <b>Yangtze</b> is the longest river in Asia. The <b>Ganges</b> flows into the Bay of Bengal. The <b>Mekong</b> flows through Southeast Asia. <b>Lake Baikal</b> in Russia is the deepest lake in the world."],
      ["More", "🗾", "<b>Siberia</b> is a huge, cold region of Russia. The <b>Arabian Peninsula</b> is the largest peninsula in the world. Japan is a chain of islands. The <b>Dead Sea</b> shore is the lowest land on Earth."]],
      "Picture a map of Asia. Where is the place?", "Think about the mountains in the middle, the rivers and the peninsulas.",
      [["Mount Everest is in which mountain range?", "The Himalayas", "The Alps|The Rockies"], ["Which plateau is called the roof of the world?", "The Tibetan Plateau", "The Great Plains|The Sahel"], ["Which cold desert is in Mongolia and China?", "The Gobi", "The Sahara|The Kalahari"],
       ["Which is the longest river in Asia?", "The Yangtze", "The Nile|The Amazon"], ["The Ganges River flows into the...", "Bay of Bengal", "Black Sea|Gulf of Mexico"], ["Which lake in Russia is the deepest in the world?", "Lake Baikal", "Lake Victoria|Lake Erie"],
       ["Which huge, cold region is in Russia?", "Siberia", "The Sahel|Patagonia"], ["Which is the largest peninsula in the world?", "The Arabian Peninsula", "Florida|The Iberian Peninsula"], ["The lowest land on Earth is the shore of the...", "Dead Sea", "Black Sea|Red Sea"],
       ["The Mekong River flows through which part of Asia?", "Southeast Asia", "Central Asia|The Arctic"]])),
    LS("Oceania", MC([
      ["Australia", "🦘", "<b>Australia</b> is a country and a continent. The dry middle is called the <b>Outback</b>. <b>Uluru</b> is a giant red rock there. The <b>Great Barrier Reef</b> lies off the northeast coast. The <b>Great Dividing Range</b> runs along the east."],
      ["Islands", "🏝️", "<b>Tasmania</b> is an island south of Australia. <b>New Zealand</b> has two main islands, the <b>North Island</b> and the <b>South Island</b>. The <b>Southern Alps</b> are on the South Island."],
      ["Pacific islands", "🌴", "<b>Papua New Guinea</b> shares the island of New Guinea with Indonesia. An <b>atoll</b> is a ring-shaped coral island. Many Pacific islands are volcanoes or coral."]],
      "Picture the map of Australia, New Zealand and the Pacific islands.", "Think about the dry middle, the reef, the mountains and the islands.",
      [["What is the dry middle of Australia called?", "The Outback", "The Prairies|The Sahel"], ["Uluru is a giant...", "Red rock", "Waterfall|Lake"], ["The Great Barrier Reef is off the coast of which part of Australia?", "Northeast", "Southwest|Northwest"],
       ["Which island is south of Australia?", "Tasmania", "Madagascar|Iceland"], ["How many main islands does New Zealand have?", "Two", "Five|Ten"], ["The Southern Alps are on which island of New Zealand?", "The South Island", "The North Island|Tasmania"],
       ["Papua New Guinea shares an island with which country?", "Indonesia", "Australia|Japan"], ["A ring-shaped coral island is called an...", "Atoll", "Isthmus|Archipelago"], ["Which mountains run along eastern Australia?", "The Great Dividing Range", "The Andes|The Pyrenees"],
       ["Australia is both a country and a...", "Continent", "Sea|Peninsula"]])),
    LS("Rounding populations", ROUND),
  ];
  l10.push(LS("Mixed practice", MX(l10, [0, 1, 3, 5, 8, 9, 13, 15])));
  l10.push(LS("Level 10 Challenge", MX(l10, [2, 4, 6, 7, 10, 11, 12, 14, 16, 17])));

  // =============== LEVEL 11 ===============
  const l11 = [
    LS("Groups of US states", CLS({
      title: "Groups of US states", tv: "🇺🇸 🗺️", cats: ["New England", "Mid-Atlantic", "Great Lakes", "Gulf Coast"], q: n => `${n} belongs to which group of states?`,
      intro: "States near each other share land, weather and history, so we group them. <b>New England</b> is in the far northeast. The <b>Mid-Atlantic</b> is on the east coast below it. The <b>Great Lakes</b> states touch the big lakes. The <b>Gulf Coast</b> states touch the Gulf of Mexico.",
      tip: "Picture the map: New England top right corner, Great Lakes in the north middle, Gulf Coast along the south.", n: "Picture a map of the United States. Where is this state?", c: "Top right corner, east coast middle, around the big lakes, or along the south coast: which fits?",
      items: [["Maine", "New England"], ["Vermont", "New England"], ["New Hampshire", "New England"], ["Massachusetts", "New England"], ["Connecticut", "New England"], ["Rhode Island", "New England"], ["New Jersey", "Mid-Atlantic"], ["Delaware", "Mid-Atlantic"], ["Maryland", "Mid-Atlantic"],
              ["Michigan", "Great Lakes"], ["Wisconsin", "Great Lakes"], ["Illinois", "Great Lakes"], ["Indiana", "Great Lakes"], ["Texas", "Gulf Coast"], ["Louisiana", "Gulf Coast"], ["Mississippi", "Gulf Coast"], ["Alabama", "Gulf Coast"]]
    })),
    LS("US records and territories", MC([
      ["State records", "🏆", "<b>Alaska</b> is the biggest state. <b>Rhode Island</b> is the smallest. <b>Texas</b> is the second biggest. <b>California</b> has the most people. The United States has <b>50 states</b>."],
      ["Newest states", "🌺", "<b>Alaska</b> became the 49th state and <b>Hawaii</b> became the 50th state, both in 1959. The 48 states that touch each other are called the <b>contiguous</b> states."],
      ["Beyond the states", "🏝️", "<b>Washington, D.C.</b> is the capital but not a state. The US also has <b>territories</b>, such as Puerto Rico, Guam, the US Virgin Islands and American Samoa."]],
      "Think about the records and how the states and territories are different.", "Use the lesson about records, newest states and territories.",
      [["Which is the biggest US state by area?", "Alaska", "Texas|California"], ["Which is the smallest US state by area?", "Rhode Island", "Delaware|Hawaii"], ["Which state has the most people?", "California", "Texas|Alaska"], ["Which state is the second biggest by area?", "Texas", "California|Montana"],
       ["How many states are in the United States?", "50", "48|52"], ["Which state became the 50th state?", "Hawaii", "Alaska|Florida"], ["Which of these is a US territory, not a state?", "Puerto Rico", "Hawaii|Alaska"], ["Washington, D.C. is...", "The capital, but not a state", "The 51st state|A big island"],
       ["Which of these is a US territory in the Pacific Ocean?", "Guam", "Cuba|Jamaica"], ["The 48 states that touch each other are called the...", "Contiguous states", "Island states|Territories"]])),
    LS("Which city is farther north?", LATCOMP),
    LS("Absolute and relative location", MC([
      ["Where is it?", "📍", "<b>Absolute location</b> is the exact spot of a place. It uses an address or coordinates, like 40° N, 74° W."],
      ["Relative location", "🧭", "<b>Relative location</b> tells where a place is compared with other places. Example: the school is next to the park, two blocks north of the library."],
      ["Using both", "🗺️", "Use absolute location when you need the exact spot. Use relative location when you need to explain how to find a place."]],
      "Ask yourself: is it an exact address or number, or is it described using nearby places?", "Absolute uses an address or coordinates. Relative uses words like near, next to, north of.",
      [["\"The library is at 125 Oak Street.\" Is this absolute or relative location?", "Absolute", "Relative"], ["\"The park is across from the school.\" Is this absolute or relative location?", "Relative", "Absolute"],
       ["\"The city is at 30° N, 31° E.\" Is this absolute or relative location?", "Absolute", "Relative"], ["\"Canada is north of the United States.\" Is this absolute or relative location?", "Relative", "Absolute"],
       ["\"The store is two blocks east of the bank.\" Is this absolute or relative location?", "Relative", "Absolute"], ["\"The house is at 14 Pine Road.\" Is this absolute or relative location?", "Absolute", "Relative"],
       ["Which is an absolute location?", "40° N, 74° W", "Near the river|Next to the mountain"], ["Which is a relative location?", "Just south of the lake", "40° N, 74° W|5 Main Street"], ["Coordinates give an...", "Absolute location", "Relative location|Rough guess"]])),
    LS("Flat maps and globes", MC([
      ["Flattening Earth", "🌍 ➡️ 🗺️", "Earth is round, so a flat map must <b>stretch</b> some places. It is like trying to flatten an orange peel. A <b>globe</b> shows shapes and sizes best."],
      ["Map projections", "📐", "A <b>projection</b> is a way to put Earth on a flat map. The <b>Mercator</b> map stretches places near the poles, so Greenland looks as big as Africa. Africa is really about 14 times bigger!"],
      ["Which to use", "🧭", "Mercator is useful for sailing because straight lines keep the same compass direction. The <b>Robinson</b> map is a balanced picture for the classroom. <b>Equal-area</b> maps show sizes fairly."]],
      "Think about what goes wrong when a round shape is flattened.", "Flat maps can stretch shapes or sizes, mostly near the poles.",
      [["Why must a flat map stretch or squeeze some places?", "Earth is round", "Earth is flat|Maps are small"], ["Which shows Earth's shapes and sizes best?", "A globe", "A flat map|A road map"], ["A way to put Earth on a flat map is called a...", "Projection", "Compass|Census"],
       ["On a Mercator map, places near the poles look...", "Bigger than they really are", "Smaller than they really are|Exactly right"], ["On a Mercator map, which place looks about as big as Africa but is much smaller?", "Greenland", "Australia|Brazil"],
       ["Which map is useful for sailors because straight lines keep the same compass direction?", "Mercator", "Equal-area|A weather map"], ["Which kind of map is designed to show sizes fairly?", "Equal-area map", "Mercator map|Road map"], ["Flattening an orange peel is like...", "Flattening Earth onto a map", "Drawing a compass|Making a graph"]])),
    LS("Map ratios: 1:100,000", RFSCALE),
    LS("The International Date Line", MC([
      ["A new day", "📅", "The <b>International Date Line</b> is an imaginary line near <b>180° longitude</b> in the Pacific Ocean. It is where each new calendar day starts."],
      ["Crossing it", "✈️", "Crossing the line going <b>west</b> (toward Asia) moves your calendar forward <b>one day</b>. Crossing it going <b>east</b> (toward the Americas) moves your calendar back one day."],
      ["Opposite of Greenwich", "🌐", "The <b>Prime Meridian</b> is at 0°. The Date Line is on the opposite side of Earth, at about 180°. Earth has 24 time zones, about 15° wide each."]],
      "Think about which line starts each new day and about east and west.", "Going west moves the date forward. Going east moves it back.",
      [["The International Date Line is near which longitude?", "180°", "0°|90°"], ["The International Date Line is in which ocean?", "Pacific Ocean", "Atlantic Ocean|Arctic Ocean"], ["The Prime Meridian is at which longitude?", "0°", "180°|90°"],
       ["You cross the Date Line going west. The calendar date moves...", "Forward one day", "Back one day|Does not change"], ["You cross the Date Line going east. The calendar date moves...", "Back one day", "Forward one day|Does not change"],
       ["The Date Line is on the opposite side of Earth from the...", "Prime Meridian", "Equator|Tropic of Cancer"], ["About how wide is one time zone in degrees of longitude?", "15°", "5°|90°"], ["How many time zones does Earth have?", "24", "12|7"],
       ["Going west across the Date Line, you travel toward...", "Asia", "North America|South America"]])),
    LS("Hurricanes, typhoons and cyclones", MC([
      ["Same storm, different names", "🌀", "A huge spinning storm over warm ocean water is a <b>hurricane</b> in the Atlantic and the northeast Pacific, a <b>typhoon</b> in the northwest Pacific and a <b>cyclone</b> in the Indian Ocean and South Pacific."],
      ["Parts and scales", "🌬️", "A hurricane's calm center is the <b>eye</b>. The <b>Saffir-Simpson scale</b> rates hurricanes from 1 to 5. A <b>storm surge</b> is a rush of seawater onto the land."],
      ["Land storms", "🌪️", "A <b>tornado</b> is a spinning funnel of wind over land. Many tornadoes hit the central United States, called <b>Tornado Alley</b>. A <b>blizzard</b> is a heavy snowstorm with strong wind."]],
      "Think about where the storm forms: over warm water or over land.", "The ocean where it forms changes the name. Land storms have other names.",
      [["A huge spinning storm that hits the Atlantic coast of the US is a...", "Hurricane", "Typhoon|Cyclone"], ["A huge spinning storm in the northwest Pacific near Japan and China is a...", "Typhoon", "Hurricane|Tornado"], ["A huge spinning storm in the Indian Ocean is a...", "Cyclone", "Hurricane|Blizzard"],
       ["The calm center of a hurricane is called the...", "Eye", "Wall|Surge"], ["A rush of seawater onto the land during a hurricane is a...", "Storm surge", "Eye|Drought"], ["The Saffir-Simpson scale rates...", "Hurricanes", "Earthquakes|Tornadoes only"],
       ["A narrow spinning funnel of wind over land is a...", "Tornado", "Hurricane|Typhoon"], ["The area of the central US where many tornadoes hit is called...", "Tornado Alley", "Hurricane Row|Cyclone Valley"], ["A heavy snowstorm with strong wind is a...", "Blizzard", "Drought|Typhoon"],
       ["Hurricanes form over...", "Warm ocean water", "Cold deserts|Frozen lakes"]])),
    LS("Winds of the world", MC([
      ["Moving air", "💨", "<b>Wind</b> is moving air. The Sun heats Earth unevenly, and air moves from high pressure to low pressure. Winds have names. <b>Trade winds</b> blow from east to west near the Equator. <b>Prevailing westerlies</b> blow from west to east in the middle of the globe."],
      ["Sea and land", "🌊", "A <b>sea breeze</b> blows from the cool sea to the warm land by day. A <b>land breeze</b> blows from land to sea at night. A <b>monsoon</b> is a wind that changes with the season and brings heavy rain to South Asia in summer."],
      ["Mountains and jets", "🏔️", "The <b>jet stream</b> is a fast river of air high above the ground. Air that climbs a mountain loses its rain on the <b>windward</b> side. The far side, the <b>leeward</b> side, is dry. This is a <b>rain shadow</b>."]],
      "Think about where the wind blows from and why.", "Wind moves from high pressure to low pressure. Direction names tell where wind comes from.",
      [["Trade winds blow from...", "East to west", "West to east|North to south"], ["The prevailing westerlies blow from...", "West to east", "East to west|South to north"], ["In the daytime, a sea breeze blows from the...", "Sea to the land", "Land to the sea|Sky to the ground"],
       ["At night, a land breeze blows from the...", "Land to the sea", "Sea to the land|Sky to the ground"], ["A wind that changes direction with the season and brings heavy summer rain to South Asia is a...", "Monsoon", "Jet stream|Breeze"], ["A fast river of air high above the ground is the...", "Jet stream", "Monsoon|Trade wind"],
       ["The side of a mountain that gets most of the rain is the...", "Windward side", "Leeward side|Top side"], ["The dry far side of a mountain is called the...", "Leeward side or rain shadow", "Windward side|River side"], ["Wind is...", "Moving air", "Moving water|Moving rock"]])),
    LS("Ocean currents", MC([
      ["Rivers in the sea", "🌊", "<b>Ocean currents</b> are streams of water that move through the ocean. Wind, Earth's spin and differences in temperature push them along."],
      ["Warm and cold", "🔥 ❄️", "The <b>Gulf Stream</b> is a warm current that starts in the Gulf of Mexico, flows up the US East Coast and across to Europe. It keeps northwest Europe warmer than other places at the same latitude. The <b>Humboldt Current</b> is cold and flows north along the west coast of South America."],
      ["El Nino and trash", "🌐", "<b>El Nino</b> is a warming of Pacific Ocean water near South America that changes weather around the world. Currents can also carry floating trash far away, which is why keeping plastic out of the sea matters."]],
      "Think about whether the current is warm or cold and where it flows.", "Warm currents heat the coasts they pass. Cold currents cool them.",
      [["What are ocean currents?", "Streams of water moving through the ocean", "Rainstorms at sea|Waves on a beach"], ["Which warm current flows up the US East Coast toward Europe?", "The Gulf Stream", "The Humboldt Current|The California Current"],
       ["The Gulf Stream keeps northwest Europe...", "Warmer than expected", "Colder than expected|Exactly the same as Antarctica"], ["The Humboldt Current is...", "Cold", "Warm|Frozen solid"], ["The Humboldt Current flows along the coast of...", "South America", "Africa|Europe"],
       ["A warming of Pacific water that changes weather around the world is called...", "El Nino", "The jet stream|A monsoon"], ["Which of these helps push ocean currents?", "Wind", "Roads|Mountains"], ["A warm current makes the nearby coast...", "Warmer", "Colder|Drier than a desert"],
       ["Floating trash in the ocean can be carried by...", "Currents", "Tornadoes|Volcanoes"]])),
    LS("River basins and watersheds", MC([
      ["Where the water goes", "🏞️", "A <b>watershed</b> (or <b>drainage basin</b>) is all the land where rain and melting snow flow to the same river. A high ridge that separates two watersheds is a <b>divide</b>."],
      ["Big basins", "🌎", "The <b>Mississippi</b> basin is the biggest in the US. The <b>Missouri</b> and <b>Ohio</b> Rivers flow into the Mississippi, so they are its <b>tributaries</b>. The <b>Continental Divide</b> runs along the Rocky Mountains. The <b>Amazon</b> has the biggest river basin on Earth."],
      ["Why it matters", "💧", "Pollution put in a river upstream can travel downstream. An <b>estuary</b> is where a river meets the sea and fresh water mixes with salt water. <b>Wetlands</b> help clean the water."]],
      "Think about all the land that drains into one river.", "A watershed is a bowl of land. A divide is its high edge.",
      [["All the land where water flows to the same river is called a...", "Watershed", "Desert|Plateau"], ["A high ridge that separates two watersheds is a...", "Divide", "Delta|Estuary"], ["The Missouri and Ohio Rivers flow into which river?", "The Mississippi River", "The Colorado River|The Hudson River"],
       ["A river that flows into a bigger river is a...", "Tributary", "Delta|Mouth"], ["The Continental Divide runs along which mountains in North America?", "The Rocky Mountains", "The Appalachians|The Alps"], ["Which river has the biggest basin on Earth?", "The Amazon", "The Nile|The Rhine"],
       ["Where a river meets the sea and fresh water mixes with salt water is an...", "Estuary", "Divide|Plateau"], ["Pollution put into a river upstream can travel...", "Downstream", "Uphill|Into space"], ["Which land helps clean water?", "Wetlands", "Parking lots|Highways"]])),
    LS("Fresh water and salt water", MC([
      ["Most water is salty", "🌊 🧂", "About <b>97%</b> of Earth's water is salty ocean water. Only about <b>3%</b> is fresh water, which we can drink after it is cleaned."],
      ["Where fresh water is", "🧊", "Most of the fresh water is frozen in <b>glaciers</b> and <b>ice caps</b>. Some is <b>groundwater</b> under the soil. An <b>aquifer</b> is rock that holds groundwater. Only a small part is in lakes and rivers."],
      ["Using water wisely", "🚰", "A <b>reservoir</b> is a lake that stores water, often made behind a dam. Saving water at home and keeping rivers clean helps everyone have enough."]],
      "Think about how much of Earth's water is salty or fresh and where it is stored.", "Most water is salty. Most fresh water is frozen or underground.",
      [["Most of Earth's water is...", "Salty ocean water", "Fresh river water|Fresh lake water"], ["About how much of Earth's water is fresh water?", "About 3%", "About 50%|About 97%"], ["Where is most fresh water on Earth stored?", "Frozen in glaciers and ice caps", "In rivers|In clouds"],
       ["Water stored under the ground is called...", "Groundwater", "Runoff|Sea spray"], ["Rock that holds groundwater is an...", "Aquifer", "Estuary|Archipelago"], ["A lake that stores water, often behind a dam, is a...", "Reservoir", "Delta|Glacier"],
       ["Which is a way to save fresh water?", "Turn off the tap while brushing teeth", "Water the sidewalk|Let the tap drip all night"], ["Can people drink ocean water safely?", "No, it is too salty", "Yes, it is clean|Yes, if it is cold"]])),
    LS("Adapt, modify or depend?", CLS({
      title: "Adapt, modify or depend?", tv: "🏠 🌉 🌾", cats: ["Adapt to it", "Modify it", "Depend on it"], q: n => `People ${n}. Is this adapting to, modifying, or depending on the environment?`,
      intro: "People and their environment affect each other. We <b>adapt</b> (change how we live to fit), <b>modify</b> (change the environment) and <b>depend</b> (rely on it for what we need).", tip: "Adapt = I change myself. Modify = I change the place. Depend = I need what the place gives me.",
      n: "Ask: are people changing themselves, changing the land, or using what nature gives?", c: "Wearing clothes or building a certain kind of house is adapting. Building dams or digging is modifying. Needing food or water is depending.",
      items: [["wear warm coats in a cold place", "Adapt to it", "🧥"], ["build houses on stilts where floods happen", "Adapt to it", "🏠"], ["build thick-walled homes to stay cool in a desert", "Adapt to it", "🏜️"], ["wear light clothes in a hot place", "Adapt to it", "👕"],
              ["build a dam on a river", "Modify it", "🏗️"], ["cut terraces into a hillside for farming", "Modify it", "🌾"], ["dig a canal across the land", "Modify it", "🚢"], ["drain a swamp to build a town", "Modify it", "🏘️"],
              ["need rain and good soil to grow crops", "Depend on it", "🌱"], ["use the sea for fish to eat", "Depend on it", "🎣"], ["drink water from a river", "Depend on it", "💧"], ["use sunshine to make power with solar panels", "Depend on it", "☀️"]]
    })),
    LS("Population growth", POPGROW),
    LS("Islands of the world", MC([
      ["Giant islands", "🏝️", "<b>Greenland</b> is the biggest island in the world. It belongs to Denmark. <b>New Guinea</b> is second and <b>Borneo</b> is third. <b>Madagascar</b> is fourth."],
      ["More islands", "🗾", "<b>Great Britain</b> is the biggest island in Europe. <b>Honshu</b> is the biggest island of Japan. <b>Sicily</b> is the biggest island in the Mediterranean Sea. <b>Iceland</b> is a volcanic island in the north Atlantic."],
      ["Groups of islands", "🌴", "A group of islands is an <b>archipelago</b>. Indonesia, Japan, the Philippines and Hawaii are archipelagos."]],
      "Think about big islands and groups of islands on the world map.", "Use the list of the largest islands and the word for a group of islands.",
      [["Which is the biggest island in the world?", "Greenland", "Madagascar|Iceland"], ["Greenland belongs to which country?", "Denmark", "Canada|Norway"], ["Which is the biggest island in Europe?", "Great Britain", "Sicily|Iceland"], ["Which is the biggest island in Japan?", "Honshu", "Sicily|Borneo"],
       ["Which is the biggest island in the Mediterranean Sea?", "Sicily", "Honshu|Cuba"], ["A group of islands is called an...", "Archipelago", "Isthmus|Atoll"], ["Which island country in the north Atlantic is volcanic?", "Iceland", "Cuba|Malta"], ["Which large island lies off the east coast of Africa?", "Madagascar", "Borneo|Greenland"],
       ["Which of these is an archipelago?", "Indonesia", "Egypt|Switzerland"]])),
    LS("Seas of the world", MC([
      ["Seas next to land", "🌊", "A <b>sea</b> is part of the ocean that is partly closed in by land. The <b>Mediterranean</b> lies between Europe and Africa. The <b>Red Sea</b> lies between Africa and the Arabian Peninsula."],
      ["Around Europe and Asia", "🗺️", "The <b>Black Sea</b> touches Turkey, Ukraine and Romania. The <b>Baltic Sea</b> is in northern Europe. The <b>North Sea</b> lies between Great Britain and Norway. The <b>Arabian Sea</b> is beside India and Oman."],
      ["Odd ones", "🧂", "The <b>Caribbean Sea</b> has many islands. The <b>Sargasso Sea</b> has no coast at all: it is in the Atlantic Ocean. The <b>Caspian Sea</b> and the <b>Dead Sea</b> are really lakes."]],
      "Picture the sea on a map and the lands around it.", "Think about which continents or countries touch each sea.",
      [["Which sea lies between Europe and Africa?", "Mediterranean Sea", "Black Sea|Baltic Sea"], ["Which sea lies between Africa and the Arabian Peninsula?", "Red Sea", "Black Sea|North Sea"], ["Which sea touches Turkey, Ukraine and Romania?", "Black Sea", "Red Sea|Arabian Sea"],
       ["Which sea is in northern Europe, beside Sweden and Finland?", "Baltic Sea", "Arabian Sea|Caribbean Sea"], ["Which sea lies between Great Britain and Norway?", "North Sea", "Black Sea|Red Sea"], ["Which sea is beside India and Oman?", "Arabian Sea", "Baltic Sea|Caribbean Sea"],
       ["Which sea has many islands such as Jamaica and Cuba?", "Caribbean Sea", "Baltic Sea|Red Sea"], ["Which sea has no coast and sits in the Atlantic Ocean?", "Sargasso Sea", "Black Sea|North Sea"], ["The Caspian Sea is really a...", "Lake", "Ocean|Gulf"]])),
    LS("Languages of the world", PAIR(LANG, {
      title: "Languages of the world", tv: "🗣️ 💬", intro: "There are thousands of languages. Each country has its own main or <b>official language</b>, and many people speak more than one.",
      f: a => `What is the main official language of ${a}?`, r: b => `Which country is known for the ${b} language?`, n: "Think about the country's name. The language often sounds like it, but not always.", tip: "Some languages are named after their country, like Polish and Poland. Some are not, like Persian in Iran."
    })),
    LS("Foods of the world", PAIR(FOOD, {
      title: "Foods of the world", tv: "🍜 🌮 🍣", intro: "Food is part of a country's culture. Many dishes come from the plants, animals and traditions of one place.",
      f: a => `Which country is famous for ${a}?`, r: b => `Which dish is famous in ${b}?`, n: "Picture the food. Where in the world is it eaten most?", tip: "Link each dish and its country with a picture, like tacos and Mexico."
    })),
  ];
  l11.push(LS("Mixed practice", MX(l11, [0, 1, 3, 6, 8, 9, 12, 14])));
  l11.push(LS("Level 11 Challenge", MX(l11, [2, 4, 5, 7, 10, 11, 13, 15, 16, 17])));

  // =============== LEVEL 12 ===============
  const l12 = [
    LS("Growing the United States", MC([
      ["Going west", "🐎 🛶", "In 1803 the United States bought the <b>Louisiana Purchase</b> from France. It was a huge area west of the Mississippi River and it doubled the size of the country. <b>Lewis and Clark</b> explored it, traveling up the <b>Missouri River</b> to the Pacific."],
      ["Trails and canals", "🚧", "Settlers followed the <b>Oregon Trail</b> by wagon from Missouri to Oregon. The <b>Cumberland Gap</b> was a pass through the Appalachian Mountains. The <b>Erie Canal</b> (opened 1825) joined the Hudson River to Lake Erie."],
      ["Railroads", "🚂", "The <b>transcontinental railroad</b> was finished in 1869 at Promontory, Utah. It joined the east and the west by train. The <b>California Gold Rush</b> began in 1848 and 1849 and brought many people west."]],
      "Think about the routes people used: rivers, trails, canals and railroads.", "Picture the map: east to west, with the Mississippi River in the middle.",
      [["In 1803 the US doubled in size with the...", "Louisiana Purchase", "Gold Rush|Erie Canal"], ["The Louisiana Purchase was bought from which country?", "France", "Spain|Canada"], ["Which pair explored the Louisiana Purchase and traveled up the Missouri River?", "Lewis and Clark", "Columbus and Cortes|Wright and Wright"],
       ["Which trail did settlers take by wagon from Missouri to Oregon?", "The Oregon Trail", "The Erie Trail|The Panama Trail"], ["Which canal joined the Hudson River to Lake Erie?", "The Erie Canal", "The Panama Canal|The Suez Canal"], ["A pass through the Appalachian Mountains used by settlers was the...", "Cumberland Gap", "Grand Canyon|Rocky Pass"],
       ["The transcontinental railroad joined...", "The east and the west", "North and South America|Canada and Mexico"], ["The transcontinental railroad was finished in 1869 in which state?", "Utah", "Florida|Maine"], ["The California Gold Rush brought many people to...", "California", "Maine|Florida"]])),
    LS("Famous landmarks and their cities", PAIR(LANDMARK, {
      title: "Famous landmarks and their cities", tv: "🗼 🏛️ 🌉", intro: "Many cities are known for a famous landmark. Knowing the city helps you find the landmark on a map.",
      f: a => `In which city is ${a}?`, r: b => `Which famous landmark is in ${b}?`, n: "Picture the landmark and think about which city you see it in.", tip: "Link each city with its landmark, like Paris with the Eiffel Tower."
    })),
    LS("Compass degrees", COMPASS),
    LS("Cities and coordinates", COORDCITY),
    LS("Kilometers and meters", CONV),
    LS("Above and below sea level", SEALEVEL),
    LS("Average and range of temperatures", AVGTEMP),
    LS("Climate regions", CLS({
      title: "Climate regions", tv: "🌴 🏜️ 🧊", cats: ["Tropical", "Dry", "Temperate", "Continental", "Polar"], q: n => `Which climate region is ${n} in?`,
      intro: "Geographers sort the world into <b>climate regions</b>. <b>Tropical</b> is hot and wet. <b>Dry</b> gets very little rain. <b>Temperate</b> has mild weather. <b>Continental</b> has hot summers and cold winters. <b>Polar</b> is freezing.",
      tip: "Think about heat and rain. Hot and wet is tropical. Dry is desert. Mild is temperate. Big seasonal swings are continental. Freezing is polar.", n: "Think about the temperature and the rain in the place.", c: "Hot and wet all year, very little rain, mild weather, cold winters and warm summers, or icy cold: which fits?",
      items: [["Singapore", "Tropical", "🌴"], ["the Amazon rainforest", "Tropical", "🌳"], ["the Sahara", "Dry", "🏜️"], ["the Gobi", "Dry", "🏜️"], ["the Arabian Desert", "Dry", "🐪"], ["Rome, Italy", "Temperate", "🏛️"], ["Seattle, USA", "Temperate", "🌧️"], ["Sydney, Australia", "Temperate", "🏖️"],
              ["Moscow, Russia", "Continental", "🏙️"], ["Chicago, USA", "Continental", "🌬️"], ["Winnipeg, Canada", "Continental", "❄️"], ["Antarctica", "Polar", "🐧"], ["the Greenland ice sheet", "Polar", "🧊"], ["the Arctic Ocean", "Polar", "🐻‍❄️"]]
    })),
    LS("Land use", CLS({
      title: "Land use", tv: "🏘️ 🏭 🌾", cats: ["Residential", "Commercial", "Industrial", "Agricultural", "Recreational"], q: n => `${cap(n)} is an example of which land use?`,
      intro: "People use land in different ways. <b>Residential</b> land has homes. <b>Commercial</b> land has shops and offices. <b>Industrial</b> land has factories. <b>Agricultural</b> land grows food. <b>Recreational</b> land is for play and rest.",
      tip: "Ask what people do on the land: live, buy and sell, make things, grow food, or play.", n: "Ask: what do people do on this land?", c: "Live, shop and work, make goods, grow food or play: which is it?",
      items: [["a neighborhood of houses", "Residential", "🏘️"], ["an apartment building", "Residential", "🏢"], ["a shopping mall", "Commercial", "🛍️"], ["an office tower", "Commercial", "🏢"], ["a car factory", "Industrial", "🏭"], ["a warehouse and shipping yard", "Industrial", "📦"],
              ["a wheat farm", "Agricultural", "🌾"], ["a cattle ranch", "Agricultural", "🐄"], ["a city park", "Recreational", "🌳"], ["a soccer field", "Recreational", "⚽"], ["a campground", "Recreational", "⛺"], ["an orchard", "Agricultural", "🍎"]]
    })),
    LS("Chokepoints of trade", MC([
      ["Narrow waterways", "🚢", "A <b>chokepoint</b> is a narrow waterway that ships must pass through. A problem there can slow trade around the world."],
      ["Famous ones", "🧭", "The <b>Strait of Gibraltar</b> joins the Atlantic to the Mediterranean. The <b>Bosporus</b> in Istanbul links the Black Sea to the Mediterranean. The <b>Strait of Malacca</b> lies between the Malay Peninsula and Sumatra. The <b>Strait of Hormuz</b> is the entrance to the Persian Gulf."],
      ["Canals", "🔒", "The <b>Panama Canal</b> and the <b>Suez Canal</b> are chokepoints made by people. They save ships from sailing all the way around South America or Africa."]],
      "Think about narrow waters between two bigger seas or oceans.", "Each chokepoint joins two bodies of water. Think about which ones.",
      [["A narrow waterway that ships must pass through is called a...", "Chokepoint", "Delta|Plateau"], ["The Strait of Gibraltar joins the Atlantic Ocean to the...", "Mediterranean Sea", "Black Sea|Red Sea"], ["The Bosporus is in which city?", "Istanbul", "Cairo|Athens"],
       ["The Strait of Malacca lies between the Malay Peninsula and...", "Sumatra", "Madagascar|Japan"], ["The Strait of Hormuz is the entrance to the...", "Persian Gulf", "Baltic Sea|Black Sea"], ["The Panama Canal saves ships from sailing around...", "South America", "Africa|Australia"],
       ["The Suez Canal saves ships from sailing around...", "Africa", "South America|Greenland"], ["Why are chokepoints important?", "Many ships pass through them", "They are warm|They have no water"], ["The Suez Canal is in which country?", "Egypt", "Panama|Turkey"]])),
    LS("Earthquake and volcano words", MC([
      ["Earthquakes", "🌐 〰️", "An earthquake begins along a crack called a <b>fault</b>. The spot underground where it starts is the <b>focus</b>. The spot on the surface right above is the <b>epicenter</b>. A <b>seismograph</b> records the shaking, and <b>magnitude</b> tells how strong it is."],
      ["Volcanoes", "🌋", "<b>Magma</b> is melted rock underground. When it comes out, it is <b>lava</b>. The bowl at the top is the <b>crater</b>. An <b>active</b> volcano can erupt. A <b>dormant</b> one is sleeping. An <b>extinct</b> one will not erupt again."],
      ["Famous ones", "🗻", "<b>Mauna Loa</b> in Hawaii is a huge volcano. <b>Vesuvius</b> is near Naples in Italy. <b>Mount St. Helens</b> is in Washington state. <b>Mount Fuji</b> is in Japan. A giant sea wave caused by an undersea quake is a <b>tsunami</b>."]],
      "Think about what each word describes: the crack, the spot, the tool, or the melted rock.", "Earthquake words and volcano words each have their own set of names.",
      [["A crack in Earth's crust where an earthquake can begin is a...", "Fault", "Crater|Delta"], ["The spot on the surface right above where an earthquake starts is the...", "Epicenter", "Crater|Magnitude"], ["A tool that records earthquake shaking is a...", "Seismograph", "Barometer|Compass"],
       ["Melted rock underground is called...", "Magma", "Lava|Crater"], ["Melted rock that flows out onto the surface is called...", "Lava", "Magma|Sand"], ["The bowl-shaped opening at the top of a volcano is the...", "Crater", "Fault|Delta"],
       ["A volcano that could erupt is called...", "Active", "Extinct|Frozen"], ["A volcano that will never erupt again is called...", "Extinct", "Active|Dormant"], ["Mount Fuji is in which country?", "Japan", "Italy|Mexico"], ["A giant sea wave caused by an undersea earthquake is a...", "Tsunami", "Hurricane|Monsoon"]])),
    LS("Glaciers and sea level", MC([
      ["Rivers of ice", "🧊", "A <b>glacier</b> is a huge slow river of ice. It moves downhill and carves valleys. Glaciers make U-shaped valleys. An <b>ice sheet</b> is a giant glacier that covers land. <b>Greenland</b> and <b>Antarctica</b> have ice sheets."],
      ["Ice and sea", "🌊", "When land ice melts and flows into the sea, <b>sea level</b> rises. Floating sea ice, like ice cubes in a drink, does not raise the level when it melts. A warmer world is melting glaciers faster."],
      ["Ice ages", "❄️", "Long ago, in an <b>ice age</b>, ice sheets covered much of North America and Europe. Glaciers shaped the Great Lakes and many valleys."]],
      "Think about ice that moves and ice that melts.", "Land ice that melts adds water to the sea. Moving ice carves the land.",
      [["A huge slow river of ice is a...", "Glacier", "Delta|Canyon"], ["A glacier moves...", "Slowly downhill", "Quickly uphill|Not at all, ever"], ["Which place has a giant ice sheet?", "Greenland", "Egypt|Brazil"], ["Glaciers carve valleys that are shaped like a...", "U", "V|L"],
       ["When land ice melts into the sea, sea level...", "Rises", "Falls|Stays the same forever"], ["During an ice age, ice sheets covered much of...", "North America and Europe", "The Sahara|The Amazon"], ["Which was shaped by glaciers long ago?", "The Great Lakes", "The Sahara|The Nile Delta"],
       ["A giant glacier that covers land is an...", "Ice sheet", "Atoll|Oasis"], ["Which continent is mostly covered by an ice sheet?", "Antarctica", "Australia|Africa"]])),
    LS("What states make and grow", PAIR(STATEPROD, {
      title: "What states make and grow", tv: "🌽 🥔 🦞", intro: "States are known for what they grow, catch or make. The land and weather decide what grows best.",
      f: a => `Which state is famous for ${a}?`, r: b => `${b} is famous for which of these?`, n: "Think about the weather and land of the state. Which crop or product fits?", tip: "Link each state with its product, like Idaho and potatoes or Maine and lobster."
    })),
    LS("Parts of Oceania", CLS({
      title: "Parts of Oceania", tv: "🌴 🏝️ 🌊", cats: ["Melanesia", "Micronesia", "Polynesia", "Australia and New Zealand"], q: n => `${n} belongs to which part of Oceania?`,
      intro: "Oceania is split into parts. <b>Melanesia</b> is in the southwest Pacific. <b>Micronesia</b> is a group of tiny islands in the northwest Pacific. <b>Polynesia</b> is a huge triangle of islands in the central and eastern Pacific.",
      tip: "Mela means black, micro means small and poly means many: Melanesia, Micronesia and Polynesia.", n: "Picture the Pacific Ocean. Is the island in the southwest, the northwest, or the center and east?", c: "Southwest, northwest, or a huge triangle of islands in the center and east: which fits?",
      items: [["Fiji", "Melanesia"], ["Papua New Guinea", "Melanesia"], ["the Solomon Islands", "Melanesia"], ["Vanuatu", "Melanesia"], ["Palau", "Micronesia"], ["Guam", "Micronesia"], ["Kiribati", "Micronesia"], ["the Marshall Islands", "Micronesia"],
              ["Samoa", "Polynesia"], ["Tonga", "Polynesia"], ["Tahiti", "Polynesia"], ["Hawaii", "Polynesia"], ["Australia", "Australia and New Zealand"], ["New Zealand", "Australia and New Zealand"]]
    })),
    LS("Capitals: Central and Southeast Asia", PAIR(SEASIA, {
      title: "Capitals: Central and Southeast Asia", tv: "🌏 🏙️", intro: "Let's learn more capitals in Asia. Remember, a capital is the city where a country's leaders work.",
      f: a => `What is the capital of ${a}?`, r: b => `${b} is the capital of which country?`, n: "Say the country's name and think of its capital city.", tip: "Group them by neighbors. Kazakhstan, Kyrgyzstan, Turkmenistan and Tajikistan are in Central Asia."
    })),
    LS("Capitals: more of Africa", PAIR(AFCAPS, {
      title: "Capitals: more of Africa", tv: "🌍 🏙️", intro: "Africa has 54 countries. Here are the capitals of ten more.",
      f: a => `What is the capital of ${a}?`, r: b => `${b} is the capital of which country?`, n: "Say the country's name and think of its capital city.", tip: "Make a silly sentence for each pair to help you remember the sounds."
    })),
    LS("Tools of a geographer", MC([
      ["Seeing from above", "🛰️", "<b>Satellite images</b> are pictures of Earth taken from space. <b>Aerial photos</b> are taken from planes or drones. <b>Remote sensing</b> means collecting information from far away, like a satellite measuring forests."],
      ["Computers and counts", "💻", "<b>GIS</b> (Geographic Information System) is computer software that puts many map layers together, like roads, rivers and schools. <b>GPS</b> uses satellites to find your exact spot. A <b>census</b> counts the people."],
      ["Fieldwork", "📝", "Geographers also do <b>surveys</b> (asking people questions), take measurements and interview people. Good geographers check their facts with more than one source."]],
      "Think about the tool and what it does: take pictures, combine layers or count.", "Some tools look from above, some use computers, some ask people.",
      [["Pictures of Earth taken from space are...", "Satellite images", "Road maps|Atlases"], ["Pictures taken from a plane or drone are called...", "Aerial photos", "Satellite maps|Surveys"], ["Collecting information from far away, like from a satellite, is...", "Remote sensing", "A census|A survey"],
       ["Computer software that puts many map layers together is...", "GIS", "GPS|A census"], ["A system that uses satellites to find your exact spot is...", "GPS", "GIS|A survey"], ["An official count of people is a...", "Census", "Satellite image|Compass"],
       ["Asking people questions to collect information is a...", "Survey", "Projection|Contour line"], ["Which tool would show roads, rivers and schools as separate layers?", "GIS", "A thermometer|A ruler"], ["A good geographer checks facts with...", "More than one source", "Only one guess|No sources"]])),
    LS("Protected places", MC([
      ["Saving nature", "🌿", "A <b>national park</b> or <b>wildlife refuge</b> is land where nature is protected. <b>Yellowstone</b> became the first national park in the world in 1872. <b>Banff</b> is Canada's first national park. <b>Kruger</b> is in South Africa."],
      ["Special places", "🐢 🦓", "The <b>Galapagos Islands</b> (Ecuador) have animals found nowhere else. The <b>Serengeti</b> (Tanzania) is famous for its huge herds of wildebeest. The <b>Great Barrier Reef</b> is a protected marine park."],
      ["Threats and help", "🛡️", "An <b>endangered</b> species is at risk of dying out. Losing homes, or <b>habitat loss</b>, is the biggest threat. Warm water can cause <b>coral bleaching</b>. <b>UNESCO World Heritage Sites</b> are places of special value that people work to protect."]],
      "Think about what is being protected and why.", "Protected places keep animals, plants and special land safe.",
      [["Which was the first national park in the world?", "Yellowstone", "Yosemite|Banff"], ["The Galapagos Islands belong to which country?", "Ecuador", "Chile|Peru"], ["The Serengeti is famous for herds of...", "Wildebeest", "Penguins|Polar bears"], ["The Serengeti is in which country?", "Tanzania", "Peru|Canada"],
       ["Kruger National Park is in which country?", "South Africa", "Kenya|Egypt"], ["A species that is at risk of dying out is...", "Endangered", "Migrating|Common"], ["The biggest threat to many animals is...", "Losing their habitat", "Too many parks|Cold ice"],
       ["Warm water can cause coral...", "Bleaching", "Growth|Singing"], ["UNESCO World Heritage Sites are...", "Places of special value that need protection", "Fast-food restaurants|Shopping malls"], ["Banff is a national park in which country?", "Canada", "Mexico|Australia"]])),
  ];
  l12.push(LS("Mixed practice", MX(l12, [0, 1, 2, 3, 6, 7, 10, 12])));
  l12.push(LS("Level 12 Challenge", MX(l12, [4, 5, 8, 9, 11, 13, 14, 15, 16, 17])));

  Object.assign(GEO_LEVELS, { 10: l10, 11: l11, 12: l12 });
})();
