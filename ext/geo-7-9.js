// ext/geo-7-9.js : Mind Lab Geography levels 7-9 (60 lessons)
(() => {
  const slide = (h, v, t) => ({ h, v, t });
  const strip = s => String(s).replace(/^(a|an|the)\s+/i, "");
  const first = s => strip(s).replace(/<[^>]+>/g, "")[0].toUpperCase();
  const LS = (title, make) => ({ title, make });
  const hrs = n => n === 1 ? "1 hour" : `${n} hours`;

  // Multiple choice. items = [question, right, "wrong1|wrong2", optional picture]
  // n = nudge, c = clue. The worked example (hint 3) is built from a different item.
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
  // Pairs: list = [a, b, optional emoji]; ask b from a (and a from b if o.r).
  const PAIR = (list, o) => {
    const make = () => {
      const cur = pick(list), rest = shuf(list.filter(x => x !== cur)), ex = rest[0];
      const rev = o.r && Math.random() < 0.4;
      if (rev) return {
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
      slide(o.title, o.tv || (list[0][2] || "🌍") + " " + (list[1][2] || "🗺️"), o.intro),
      slide("Let's learn", "📋", list.map(x => `${x[2] ? x[2] + " " : ""}<b>${x[0]}</b>: ${x[1]}`).join("<br>")),
      slide("Remember", "💡", o.tip)
    ];
    return make;
  };
  // Sorting into groups. items = [name, group, optional emoji]; cats = all group names.
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
  // Number lesson: fn() returns a question; s = teaching slides.
  const NUM = (s, fn) => { fn.teach = () => s.map(x => slide(x[0], x[1], x[2])); return fn; };

  // ---------- number makers ----------
  const SCALE100 = NUM([
    ["Bigger map scales", "📏", "Some maps show very big places, so one centimeter can stand for many kilometers, like <b>1 cm = 100 km</b>."],
    ["Example", "1 cm = 50 km", "If 1 cm = 50 km, then 4 cm = 50 + 50 + 50 + 50 = 200 km. <b>Multiply</b> to go from the map to real life. <b>Divide</b> to go back."],
    ["Compare routes", "🛣️", "To find how much longer one route is, first find the difference in centimeters. Then multiply by the scale."]
  ], () => {
    const k = pick([25, 50, 100, 200]), n = ri(2, 9), m = Math.random();
    if (m < 0.4) return {
      text: `On a map, 1 cm stands for ${k} km. A train line is ${n} cm long on the map. How many km long is it in real life?`, answer: n * k,
      hints: ["Each centimeter on the map stands for the same real distance.", `Multiply the number of centimeters by ${k}. You can add ${k} again and again if that is easier.`, "Example: if 1 cm = 40 km, then 3 cm = 40 + 40 + 40 = 120 km. Now do yours."]
    };
    if (m < 0.75) return {
      text: `On a map, 1 cm stands for ${k} km. Two cities are ${n * k} km apart. How many cm apart are they on the map?`, answer: n,
      hints: ["Going from real life to the map means dividing.", `How many groups of ${k} fit into ${n * k}? Skip count by ${k}s.`, "Example: if 1 cm = 40 km and the trip is 120 km, count 40, 80, 120. That is 3 counts, so 3 cm. Now do yours."]
    };
    const b = ri(1, n - 1 || 1), a = n + b;
    return {
      text: `On a map, 1 cm stands for ${k} km. Route A is ${a} cm long on the map and Route B is ${b} cm long. How many km longer is Route A?`, answer: (a - b) * k,
      hints: ["First find how many more centimeters Route A has than Route B.", `Subtract the centimeters, then multiply the difference by ${k}.`, "Example: if 1 cm = 40 km, Route X is 5 cm and Route Y is 2 cm, then 5 - 2 = 3 cm, and 3 x 40 = 120 km. Now do yours."]
    };
  });

  const COORD = NUM([
    ["Reading coordinates", "🧭", "A place can be found with two numbers. <b>Latitude</b> comes first and ends with <b>N</b> (north) or <b>S</b> (south). <b>Longitude</b> comes second and ends with <b>E</b> (east) or <b>W</b> (west)."],
    ["Which hemispheres?", "🌍", "N means the Northern Hemisphere. S means the Southern Hemisphere. E means the Eastern Hemisphere. W means the Western Hemisphere."],
    ["Example", "20° S, 50° W", "S = Southern and W = Western. So 20° S, 50° W is in the Southern and Western Hemispheres."]
  ], () => {
    const N = { N: "Northern", S: "Southern" }, E = { E: "Eastern", W: "Western" };
    const combos = [["N", "E"], ["N", "W"], ["S", "E"], ["S", "W"]];
    const ns = pick(["N", "S"]), ew = pick(["E", "W"]);
    if (Math.random() < 0.65) {
      const lat = ri(15, 80), lon = ri(5, 170), ans = `${N[ns]} and ${E[ew]}`;
      return {
        text: `A place is at ${lat}° ${ns}, ${lon}° ${ew}. Which hemispheres is it in?`,
        choices: shuf(combos.map(c => `${N[c[0]]} and ${E[c[1]]}`)), answer: ans,
        hints: ["Look at the two letters after the numbers. They tell you the directions.", "The letter after the first number is for north or south. The letter after the second number is for east or west. Match each letter to its hemisphere.", "Example: 12° S, 60° W. S means Southern and W means Western, so the answer is Southern and Western. Now do yours."]
      };
    }
    return {
      text: `Which letters go with a place in the ${N[ns]} and ${E[ew]} Hemispheres?`,
      choices: shuf(combos.map(c => `${c[0]} and ${c[1]}`)), answer: `${ns} and ${ew}`,
      hints: ["Each hemisphere name matches one letter. Think of the first letter of each direction.", "Northern, Southern, Eastern and Western each have their own letter. Find the letter for each name in the question.", "Example: Southern and Western are the letters S and W. Now do yours with your two hemispheres."]
    };
  });

  const TIMEBEHIND = NUM([
    ["Time zones in the USA", "🕐", "The USA has several time zones. When it is later in the east, it is earlier in the west. New York is <b>1 hour ahead</b> of Chicago, <b>2 hours</b> ahead of Denver and <b>3 hours</b> ahead of Los Angeles."],
    ["Ahead or behind", "➡️", "Places in the <b>east</b> are <b>ahead</b>: their clocks show a later hour. Places in the <b>west</b> are <b>behind</b>: their clocks show an earlier hour."],
    ["Tip", "💡", "Ahead means <b>add</b> hours. Behind means <b>subtract</b> hours."]
  ], () => {
    const pairs = [["New York", "Chicago", 1], ["New York", "Denver", 2], ["New York", "Los Angeles", 3], ["Chicago", "Denver", 1], ["Chicago", "Los Angeles", 2], ["Denver", "Los Angeles", 1]];
    const [A, B, d] = pick(pairs);
    if (Math.random() < 0.5) {
      const t = ri(d + 1, 11);
      return {
        text: `${B} is ${hrs(d)} behind ${A}. It is ${t} p.m. in ${A}. What hour is it in ${B}?`, answer: t - d,
        hints: ["Behind means the clock shows an earlier hour.", `Subtract ${d} from the hour in ${A}.`, "Example: Denver is 2 hours behind New York. If it is 9 p.m. in New York, then 9 - 2 = 7 p.m. in Denver. Now do yours."]
      };
    }
    const t = ri(1, 11 - d);
    return {
      text: `${A} is ${hrs(d)} ahead of ${B}. It is ${t} p.m. in ${B}. What hour is it in ${A}?`, answer: t + d,
      hints: ["Ahead means the clock shows a later hour.", `Add ${d} to the hour in ${B}.`, "Example: New York is 3 hours ahead of Los Angeles. If it is 4 p.m. in Los Angeles, then 4 + 3 = 7 p.m. in New York. Now do yours."]
    };
  });

  const MOUNTS = [["Mount Everest", 8800], ["K2", 8600], ["Aconcagua", 7000], ["Denali", 6200], ["Kilimanjaro", 5900], ["Mount Elbrus", 5600], ["Mont Blanc", 4800]];
  const MOUNTAINS = NUM([
    ["Mountain heights", "🏔️", "Mountain heights are measured in <b>meters</b> above sea level. <b>Mount Everest</b> in Asia is the highest mountain on land, about 8,800 m."],
    ["Peaks on each continent", "🌍", "<b>Aconcagua</b> (South America) is about 7,000 m. <b>Denali</b> (North America) is about 6,200 m. <b>Kilimanjaro</b> (Africa) is about 5,900 m. <b>Mont Blanc</b> (Europe's Alps) is about 4,800 m."],
    ["Math with heights", "➖", "To find <b>how much taller</b>, subtract. To find <b>how far a climber still has to go</b>, subtract the height where they start."]
  ], () => {
    const [a, b] = shuf(MOUNTS).slice(0, 2).sort((x, y) => y[1] - x[1]);
    if (Math.random() < 0.55) return {
      text: `${a[0]} is about ${a[1]} m high. ${b[0]} is about ${b[1]} m high. How many meters taller is ${a[0]}?`, answer: a[1] - b[1],
      hints: ["You are comparing two heights. Which operation finds the difference?", "Subtract the smaller height from the bigger height. Subtract the hundreds first if that is easier.", "Example: a hill is 900 m high and a mountain is 2,000 m high. 2,000 - 900 = 1,100 m taller. Now do yours."]
    };
    const base = pick([1000, 2000, 3000]);
    return {
      text: `A climber starts at a camp ${base} m above sea level. The top of ${a[0]} is about ${a[1]} m above sea level. About how many meters must the climber still go up?`, answer: a[1] - base,
      hints: ["The climber has already gone up part of the way. Subtract what is done.", "Take the height of the top and subtract the height of the camp.", "Example: a peak is 3,500 m high and the camp is at 1,500 m. 3,500 - 1,500 = 2,000 m to go. Now do yours."]
    };
  });

  const TOWNS = ["Maplewood", "Oakdale", "Riverton", "Pinehill", "Lakeview", "Sunnyvale"];
  const POPDATA = NUM([
    ["Reading population numbers", "👥", "Geographers study <b>population</b>, the number of people in a place. Big numbers are often written in <b>thousands</b>. \"12 thousand\" means 12,000 people."],
    ["Adding and comparing", "➕➖", "To find the people in two towns together, <b>add</b>. To find how many more people live in one town, <b>subtract</b>."],
    ["Tip", "💡", "Do the math with the small numbers, then say \"thousand\" at the end. 5 thousand + 4 thousand = 9 thousand."]
  ], () => {
    const [A, B, C] = shuf(TOWNS), m = Math.random();
    const a = ri(11, 89), b = ri(11, 89), c = ri(11, 60);
    if (m < 0.35) return {
      text: `${A} has ${a} thousand people. ${B} has ${b} thousand people. How many thousand people live in the two towns together?`, answer: a + b,
      hints: ["Together means you put the two towns' people into one group.", "Add the two numbers. The unit stays \"thousand\".", "Example: Town X has 5 thousand people and Town Y has 4 thousand. 5 + 4 = 9 thousand. Now do yours."]
    };
    if (m < 0.7) {
      const hi = Math.max(a, b), lo = Math.min(a, b);
      return {
        text: `${A} has ${hi} thousand people. ${B} has ${lo} thousand people. How many thousand more people live in ${A}?`, answer: hi - lo,
        hints: ["More than means you compare. Which operation finds the gap?", "Subtract the smaller number from the bigger number.", "Example: Town X has 9 thousand and Town Y has 4 thousand. 9 - 4 = 5 thousand more. Now do yours."]
      };
    }
    return {
      text: `${A} has ${a} thousand people, ${B} has ${b} thousand and ${C} has ${c} thousand. How many thousand people live in all three towns?`, answer: a + b + c,
      hints: ["All three towns means you need every number.", "Add the three numbers. Add two first, then add the third.", "Example: 5 thousand, 4 thousand and 2 thousand. 5 + 4 = 9, and 9 + 2 = 11 thousand. Now do yours."]
    };
  });

  const DEGLAT = NUM([
    ["Degrees of latitude", "📐", "Latitude is measured in <b>degrees</b> north or south of the Equator (0°). The North Pole is 90° N and the South Pole is 90° S."],
    ["How far apart?", "↕️", "Same side of the Equator (both N or both S): <b>subtract</b>. Opposite sides: <b>add</b>, because you cross the Equator."],
    ["In kilometers", "🛣️", "One degree of latitude is about 111 km. To keep math easy we will pretend it is <b>100 km</b>."]
  ], () => {
    const m = Math.random();
    if (m < 0.35) {
      const a = ri(10, 60), b = ri(5, a - 2), h = pick(["N", "S"]);
      return {
        text: `City A is at ${a}° ${h} and City B is at ${b}° ${h}. How many degrees of latitude apart are they?`, answer: a - b,
        hints: ["Both cities are on the same side of the Equator.", "On the same side, subtract the smaller number from the bigger number.", "Example: 70° N and 30° N are on the same side. 70 - 30 = 40 degrees apart. Now do yours."]
      };
    }
    if (m < 0.7) {
      const a = ri(5, 60), b = ri(5, 60);
      return {
        text: `City A is at ${a}° N and City B is at ${b}° S. How many degrees of latitude apart are they?`, answer: a + b,
        hints: ["One city is north of the Equator and the other is south of it.", "When you cross the Equator, add the two numbers.", "Example: 70° N and 30° S are on opposite sides. 70 + 30 = 100 degrees apart. Now do yours."]
      };
    }
    const d = ri(2, 9);
    return {
      text: `Pretend 1 degree of latitude is 100 km. Two places are ${d} degrees of latitude apart. About how many km is that?`, answer: d * 100,
      hints: ["Each degree is the same distance.", "Multiply the number of degrees by 100. Think of adding hundreds.", "Example: 12 degrees apart at 100 km each is 12 x 100 = 1,200 km. Now do yours."]
    };
  });

  const UTC = NUM([
    ["UTC: the world's clock", "🕛", "Time zones are counted from <b>UTC</b>, the time at the Prime Meridian. A zone of <b>UTC+3</b> is 3 hours ahead. A zone of <b>UTC-5</b> is 5 hours behind."],
    ["Hours between zones", "↔️", "Both plus (or both minus): <b>subtract</b> the numbers. One plus and one minus: <b>add</b> the numbers."],
    ["24-hour clock", "⌚", "After noon the 24-hour clock goes 13:00, 14:00 ... 23:00. So 3 p.m. is 15:00. Noon plus 3 hours is 15:00."]
  ], () => {
    const m = Math.random();
    if (m < 0.35) {
      const a = ri(5, 11), b = ri(1, a - 2);
      return {
        text: `Zone A is UTC+${a} and Zone B is UTC+${b}. How many hours apart are the two zones?`, answer: a - b,
        hints: ["Both zones are on the plus side of UTC.", "Subtract the smaller number from the bigger number.", "Example: UTC+12 and UTC+1. 12 - 1 = 11 hours apart. Now do yours."]
      };
    }
    if (m < 0.65) {
      const a = ri(2, 11), b = ri(2, 10);
      return {
        text: `Zone A is UTC+${a} and Zone B is UTC-${b}. How many hours apart are the two zones?`, answer: a + b,
        hints: ["One zone is ahead of UTC and the other is behind it. You cross UTC between them.", "When the signs are different (+ and -), add the numbers.", "Example: UTC+1 and UTC-1 are 1 + 1 = 2 hours apart. Now do yours."]
      };
    }
    const k = pick([-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    return {
      text: `It is 12:00 (noon) in UTC. A town is at UTC${k > 0 ? "+" : "-"}${Math.abs(k)}. What hour is it in that town, on the 24-hour clock?`, answer: 12 + k,
      hints: [k > 0 ? "A plus sign means the town is ahead of UTC, so its clock shows a later hour." : "A minus sign means the town is behind UTC, so its clock shows an earlier hour.", `Start at 12 and ${k > 0 ? "add" : "subtract"} the zone number.`, "Example: if it is 6:00 in UTC and a town is UTC+2, add 2 to get 8:00. Now do yours."]
    };
  });

  const FLIGHT = NUM([
    ["Flying across zones", "✈️", "When you fly east or west you cross time zones. The clock at the end of the trip is not just the start time plus the flight time."],
    ["Three steps", "1️⃣2️⃣3️⃣", "Take the leaving hour. <b>Add the flight hours</b> to find the time at home. Then <b>add</b> the zone hours if the new place is <b>ahead</b>, or <b>subtract</b> them if it is <b>behind</b>."],
    ["Example", "🛬", "Leave at 8:00. Flight 3 hours. 8 + 3 = 11. The new place is 2 hours behind, so 11 - 2 = 9:00 local time."]
  ], () => {
    const h = ri(6, 12), f = ri(2, 8), z = ri(1, 5), ahead = Math.random() < 0.55;
    return {
      text: `A plane leaves City A at ${h}:00 local time (24-hour clock). The flight takes ${f} hours. City B is ${hrs(z)} ${ahead ? "ahead of" : "behind"} City A. What hour is it in City B when the plane lands?`,
      answer: ahead ? h + f + z : h + f - z,
      hints: ["First find the hour in City A when the plane lands.", `Add the flight time to the leaving hour. Then ${ahead ? "add" : "subtract"} the zone difference, because City B is ${ahead ? "ahead" : "behind"}.`, "Example: leave at 5:00, flight 2 hours, City B is 1 hour ahead. 5 + 2 = 7, then 7 + 1 = 8:00. Now do yours."]
    };
  });

  const SCALEHALF = NUM([
    ["Half centimeters", "📏", "A ruler has millimeters (mm). <b>10 mm = 1 cm</b>, so <b>5 mm is half a centimeter</b>. A line of 3 cm and 5 mm is 3 and a half cm."],
    ["Half of the scale", "½", "If 1 cm = 20 km, then half a centimeter is 10 km. So 3 and a half cm = 60 + 10 = 70 km."],
    ["Tip", "💡", "Find the whole centimeters first, then add half of the scale number."]
  ], () => {
    const k = pick([10, 20, 30, 40, 50]), n = ri(1, 8);
    if (Math.random() < 0.6) return {
      text: `On a map, 1 cm stands for ${k} km. Two towns are ${n} cm and 5 mm apart on the map. How many km apart are they in real life?`, answer: n * k + k / 2,
      hints: ["5 mm is half of one centimeter, so it counts as half of the scale number.", `Multiply the whole centimeters by ${k}, then add half of ${k}.`, "Example: if 1 cm = 14 km, then 2 cm and 5 mm = 28 + 7 = 35 km. Now do yours."]
    };
    const m = ri(1, 5), p = ri(1, 5);
    return {
      text: `On a map, 1 cm stands for ${k} km. A trail has two parts: ${m} cm and 5 mm, then ${p} cm and 5 mm. How many km long is the whole trail?`, answer: (m + p + 1) * k,
      hints: ["Two halves make one whole centimeter.", `Add the whole centimeters, then add 1 more for the two half centimeters. Multiply by ${k}.`, "Example: if 1 cm = 14 km, then 1.5 cm + 2.5 cm = 4 cm, and 4 x 14 = 56 km. Now do yours."]
    };
  });

  const LONGTIME = NUM([
    ["Longitude and time", "🌐", "Earth turns a full circle (360°) in 24 hours. So it turns <b>15° every hour</b>. 360 ÷ 24 = 15."],
    ["East is ahead", "➡️", "Every <b>15° east</b> of the Prime Meridian, the time is <b>1 hour ahead</b>. Every 15° west, it is 1 hour behind."],
    ["Example", "45° E", "45 ÷ 15 = 3, so a place at 45° E is 3 hours ahead of Greenwich."]
  ], () => {
    const m = Math.random(), h = ri(1, 8);
    if (m < 0.4) return {
      text: `A town is ${h * 15}° east of the Prime Meridian. How many hours ahead of Greenwich is its clock?`, answer: h,
      hints: ["Earth turns 15 degrees every hour.", `Divide the degrees by 15. Count how many 15s fit into ${h * 15}.`, "Example: 180° east is 180 ÷ 15 = 12 hours ahead. Now do yours."]
    };
    if (m < 0.7) return {
      text: `A town's clock is ${hrs(h)} behind Greenwich. How many degrees west of the Prime Meridian is it?`, answer: h * 15,
      hints: ["Each hour is 15 degrees.", `Multiply the number of hours by 15. Count by 15s: 15, 30, 45 ... ${h} times.`, "Example: 12 hours is 12 x 15 = 180 degrees. Now do yours."]
    };
    return {
      text: `Two towns are ${h * 15}° of longitude apart. How many hours apart are their clocks?`, answer: h,
      hints: ["Use the rule for how many degrees make one hour.", "Divide the degrees by 15.", "Example: 180 degrees apart is 180 ÷ 15 = 12 hours. Now do yours."]
    };
  });

  const DENSITY = NUM([
    ["Population density", "🏘️", "<b>Population density</b> tells how crowded a place is: the number of people for each square kilometer (km²)."],
    ["The rule", "➗", "<b>Density = people ÷ area</b>. If 600 people live in 20 km², then 600 ÷ 20 = 30 people per km²."],
    ["Using it backwards", "✖️", "If you know the density and the area, <b>multiply</b> to find the number of people."]
  ], () => {
    const A = pick([2, 4, 5, 10, 20, 50]), d = ri(11, 90);
    if (Math.random() < 0.6) return {
      text: `A town has ${A * d} people and covers ${A} square kilometers. How many people live in each square kilometer (the density)?`, answer: d,
      hints: ["Density spreads the people out equally over the area.", "Divide the number of people by the number of square kilometers.", "Example: 60 people on 6 square kilometers is 60 ÷ 6 = 10 people per square kilometer. Now do yours."]
    };
    return {
      text: `A region has a density of ${d} people per square kilometer and an area of ${A} square kilometers. How many people live there?`, answer: d * A,
      hints: ["Each square kilometer holds the same number of people.", "Multiply the density by the area.", "Example: a density of 8 people per square kilometer over 3 square kilometers is 8 x 3 = 24 people. Now do yours."]
    };
  });

  const RAIN = NUM([
    ["Reading rainfall data", "🌧️", "Rainfall is measured in <b>millimeters (mm)</b>. A table or bar graph shows how much rain falls each month."],
    ["Using the data", "📊", "To find the rain in several months together, <b>add</b>. To compare two months, <b>subtract</b>."],
    ["Tip", "💡", "Write the numbers in a column, line up the ones and tens, and work carefully."]
  ], () => {
    const mo = shuf(["January", "February", "March", "April", "May", "June", "July", "August"]), v = () => ri(20, 150), m = Math.random();
    const a = v(), b = v(), c = v(), d = v();
    if (m < 0.35) return {
      text: `Rain fell in ${mo[0]}: ${a} mm, ${mo[1]}: ${b} mm and ${mo[2]}: ${c} mm. How many mm of rain fell in all three months?`, answer: a + b + c,
      hints: ["All three months together means you join the amounts.", "Add the three numbers. Add two first, then the third.", "Example: 10 mm, 20 mm and 30 mm. 10 + 20 = 30, and 30 + 30 = 60 mm. Now do yours."]
    };
    if (m < 0.7) {
      const hi = Math.max(a, b), lo = Math.min(a, b), wet = a >= b ? mo[0] : mo[1], dry = a >= b ? mo[1] : mo[0];
      return {
        text: `${wet} had ${hi} mm of rain and ${dry} had ${lo} mm. How many mm more rain fell in ${wet}?`, answer: hi - lo,
        hints: ["More than means you compare the two amounts.", "Subtract the smaller amount from the bigger one.", "Example: 60 mm and 25 mm. 60 - 25 = 35 mm more. Now do yours."]
      };
    }
    return {
      text: `A city had ${a} mm, ${b} mm, ${c} mm and ${d} mm of rain in four months. What was the total rainfall in mm?`, answer: a + b + c + d,
      hints: ["Total means add all the amounts.", "Add the numbers two at a time, then add your answers together.", "Example: 10, 20, 30 and 40. 10 + 20 = 30, 30 + 40 = 70, and 30 + 70 = 100 mm. Now do yours."]
    };
  });

  // ---------- facts: lists ----------
  const CAN = [["Ontario", "Toronto"], ["Quebec", "Quebec City"], ["Alberta", "Edmonton"], ["British Columbia", "Victoria"], ["Manitoba", "Winnipeg"], ["Nova Scotia", "Halifax"], ["Saskatchewan", "Regina"], ["New Brunswick", "Fredericton"]];
  const MONEY = [["Japan", "Yen", "💴"], ["United Kingdom", "Pound", "💷"], ["Switzerland", "Franc", "🪙"], ["Russia", "Ruble", "🪙"], ["China", "Yuan", "🪙"], ["South Korea", "Won", "🪙"], ["Brazil", "Real", "🪙"], ["South Africa", "Rand", "🪙"], ["Sweden", "Krona", "🪙"], ["Thailand", "Baht", "🪙"], ["India", "Rupee", "🪙"]];
  const CITYRIV = [["London", "Thames"], ["Paris", "Seine"], ["Cairo", "Nile"], ["Rome", "Tiber"], ["Vienna", "Danube"], ["Baghdad", "Tigris"], ["New York City", "Hudson"], ["Washington, D.C.", "Potomac"], ["Berlin", "Spree"], ["Prague", "Vltava"]];
  const MIDCAPS = [["Iraq", "Baghdad"], ["Afghanistan", "Kabul"], ["Uzbekistan", "Tashkent"], ["Jordan", "Amman"], ["Lebanon", "Beirut"], ["Syria", "Damascus"], ["Qatar", "Doha"], ["Oman", "Muscat"], ["Azerbaijan", "Baku"], ["Georgia", "Tbilisi"], ["Armenia", "Yerevan"], ["United Arab Emirates", "Abu Dhabi"]].map(x => [x[1], x[0], "🏙️"]);
  const EECAPS = [["Ukraine", "Kyiv"], ["Belarus", "Minsk"], ["Bulgaria", "Sofia"], ["Romania", "Bucharest"], ["Serbia", "Belgrade"], ["Croatia", "Zagreb"], ["Albania", "Tirana"], ["Montenegro", "Podgorica"]].map(x => [x[1], x[0], "🏙️"]);
  const SMALLCAPS = [["Estonia", "Tallinn"], ["Latvia", "Riga"], ["Lithuania", "Vilnius"], ["Slovakia", "Bratislava"], ["Slovenia", "Ljubljana"], ["Iceland", "Reykjavik"], ["Malta", "Valletta"], ["Cyprus", "Nicosia"]].map(x => [x[1], x[0], "🏙️"]);
  const RIVSEA = [["Nile", "Mediterranean Sea", "🌊"], ["Amazon", "Atlantic Ocean", "🌊"], ["Mississippi", "Gulf of Mexico", "🌊"], ["Rhine", "North Sea", "🌊"], ["Danube", "Black Sea", "🌊"], ["Ganges", "Bay of Bengal", "🌊"], ["Volga", "Caspian Sea", "🌊"], ["Yangtze", "East China Sea", "🌊"], ["Mekong", "South China Sea", "🌊"], ["Zambezi", "Indian Ocean", "🌊"]];
  const TRADE = [["coffee", "Brazil", "☕"], ["cocoa", "Ivory Coast", "🍫"], ["oil", "Saudi Arabia", "🛢️"], ["watches", "Switzerland", "⌚"], ["tulips", "Netherlands", "🌷"], ["maple syrup", "Canada", "🍁"], ["wool", "Australia", "🐑"], ["tea", "Sri Lanka", "🍵"], ["bananas", "Ecuador", "🍌"], ["diamonds", "Botswana", "💎"]];
  const BIGCITY = [["Shanghai", "China"], ["Lagos", "Nigeria"], ["Karachi", "Pakistan"], ["São Paulo", "Brazil"], ["Chicago", "United States"], ["Saint Petersburg", "Russia"], ["Melbourne", "Australia"], ["Casablanca", "Morocco"], ["Ho Chi Minh City", "Vietnam"], ["Medellín", "Colombia"]].map(x => [x[0], x[1], "🌆"]);
  const WONDERS = [["Petra", "Jordan", "🏜️"], ["Angkor Wat", "Cambodia", "🛕"], ["Chichen Itza", "Mexico", "🗿"], ["The Acropolis", "Greece", "🏛️"], ["The Pyramids of Giza", "Egypt", "🔺"], ["Christ the Redeemer", "Brazil", "🗽"], ["Stonehenge", "United Kingdom", "🪨"], ["Machu Picchu", "Peru", "⛰️"], ["The Great Wall", "China", "🧱"]];

  // ================= LEVEL 7 =================
  const l7 = [
    LS("Provinces of Canada", PAIR(CAN, {
      title: "Provinces of Canada", tv: "🇨🇦 🍁", intro: "Canada is split into <b>provinces</b> (and territories). Each province has its own capital city. The capital of the whole country is <b>Ottawa</b>.",
      f: a => `What is the capital of the province of ${a}?`, r: b => `${b} is the capital of which province?`,
      n: "A province is like a state. Its capital is where the province's leaders work.", tip: "Toronto is the biggest city of Canada, but it is only a provincial capital. Ottawa is the national capital."
    })),
    LS("Money around the world", PAIR(MONEY, {
      title: "Money around the world", tv: "💴 💷", intro: "Each country has its own kind of money, called a <b>currency</b>. Many countries in Europe share the <b>euro</b>.",
      f: a => `What is the money of ${a} called?`, n: "Think about the country's money. Say the country name and picture its coins.", tip: "A currency name often has a story. Try to link each country and its money in a funny sentence."
    })),
    LS("Island countries", MC([
      ["Island or landlocked?", "🏝️", "An <b>island country</b> is surrounded by water, like <b>Japan</b> or <b>New Zealand</b>. A <b>landlocked</b> country has no coast, like <b>Mongolia</b> or <b>Austria</b>."],
      ["More island countries", "🗺️", "<b>Cuba, Iceland, Madagascar, Sri Lanka</b> and the <b>Philippines</b> are islands or groups of islands. <b>Indonesia</b> has thousands of islands."],
      ["Tip", "💡", "Most countries touch other countries. Island countries only touch the sea."]],
      "Think about whether the country is surrounded by water or by other countries.", "Picture the country on a world map.",
      [["Which of these is an island country?", "Japan", "Germany|Brazil"], ["Which of these is an island country?", "Cuba", "Peru|Chad"], ["Which of these is an island country?", "New Zealand", "Mexico|Kenya"],
       ["Which of these is an island country?", "Iceland", "Norway|Poland"], ["Which country is an island off the coast of Africa?", "Madagascar", "Egypt|Ethiopia"], ["Which country is made of thousands of islands in Southeast Asia?", "Indonesia", "Vietnam|Mongolia"],
       ["Which country is landlocked (it has no coast)?", "Bolivia", "Chile|Peru"], ["Which country is landlocked (it has no coast)?", "Mongolia", "Japan|Vietnam"], ["Which country is landlocked (it has no coast)?", "Austria", "Spain|Portugal"], ["Which country is both a country and a whole continent?", "Australia", "Canada|India"]])),
    LS("Seas, straits and gulfs", MC([
      ["Parts of the sea", "🌊", "A <b>strait</b> is a narrow water passage between two lands. A <b>gulf</b> is a large part of the sea that reaches into the land. A <b>bay</b> is a smaller curve of water."],
      ["Famous ones", "🧭", "The <b>Strait of Gibraltar</b> joins the Atlantic Ocean to the <b>Mediterranean Sea</b>. The <b>Bering Strait</b> lies between Alaska and Russia. The <b>Persian Gulf</b> is in the Middle East."],
      ["Tip", "💡", "The <b>Caspian Sea</b> is called a sea, but it is really the largest lake in the world."]],
      "Think about the shape of the water and what it connects.", "A strait is narrow and a gulf is wide. Use that to cross out choices.",
      [["A strait is...", "A narrow water passage between two lands", "A tall mountain pass|A big desert"], ["A gulf is...", "A large part of the sea that reaches into the land", "A small pond|A high flat land"],
       ["The Strait of Gibraltar joins the Atlantic Ocean to which sea?", "Mediterranean Sea", "Red Sea|Baltic Sea"], ["The Bering Strait separates Alaska from which continent?", "Asia", "Africa|Australia"],
       ["The Persian Gulf is in which part of the world?", "The Middle East", "Northern Europe|Southern Africa"], ["The Caspian Sea is really the world's largest...", "Lake", "Ocean|River"],
       ["Which sea lies between Europe and Africa?", "Mediterranean Sea", "Black Sea|Caspian Sea"], ["The Gulf of Mexico touches the south of which country?", "United States", "Canada|Russia"]])),
    LS("Lines of latitude", MC([
      ["Lines across the map", "📏", "Lines of <b>latitude</b> (also called <b>parallels</b>) run east to west. The <b>Equator</b> is 0°. The poles are 90°."],
      ["Special lines", "🌴", "The <b>Tropic of Cancer</b> is north of the Equator. The <b>Tropic of Capricorn</b> is south of it. The warm tropics lie between them. The <b>Arctic Circle</b> is near the North Pole."],
      ["Tip", "💡", "Latitude tells how far north or south you are. Lat is like a ladder: you climb up and down."]],
      "Latitude tells how far north or south a place is from the Equator.", "Picture a globe with lines going around it like belts.",
      [["Lines of latitude run which way on a map?", "East to west (side to side)", "North to south (up and down)|Diagonally"], ["What is the latitude of the Equator?", "0°", "90°|180°"], ["The North Pole is at what latitude?", "90° N", "0°|45° N"],
       ["The Tropic of Cancer is...", "North of the Equator", "South of the Equator|On the Prime Meridian"], ["The Tropic of Capricorn is...", "South of the Equator", "North of the Equator|At the North Pole"],
       ["The Arctic Circle is near which place?", "The North Pole", "The South Pole|The Equator"], ["Another name for lines of latitude is...", "Parallels", "Meridians|Compasses"],
       ["The warm tropics lie between which two lines?", "Tropic of Cancer and Tropic of Capricorn", "Arctic Circle and Equator|North Pole and Tropic of Cancer"]])),
    LS("Hemispheres", MC([
      ["Halves of the Earth", "🌍", "The <b>Equator</b> splits Earth into the <b>Northern</b> and <b>Southern Hemispheres</b>. The <b>Prime Meridian</b> (it passes through Greenwich, England) splits it into the <b>Eastern</b> and <b>Western Hemispheres</b>."],
      ["Where are countries?", "🗺️", "Canada and Egypt are in the Northern Hemisphere. Australia, New Zealand and Argentina are in the Southern Hemisphere. The USA is in the Northern and Western Hemispheres."],
      ["Four parts", "4️⃣", "Use both lines and Earth is cut into <b>4 parts</b>, like Northern-Eastern or Southern-Western."]],
      "Think about which line divides Earth and which side the country is on.", "North and south are about the Equator. East and west are about the Prime Meridian.",
      [["Which hemisphere is Canada in?", "Northern Hemisphere", "Southern Hemisphere"], ["Which hemisphere is Australia in?", "Southern Hemisphere", "Northern Hemisphere"], ["Which hemisphere is Argentina in?", "Southern Hemisphere", "Northern Hemisphere"],
       ["Which hemisphere is Egypt in?", "Northern Hemisphere", "Southern Hemisphere"], ["Which line splits Earth into north and south?", "The Equator", "The Prime Meridian|The Arctic Circle"], ["Which line splits Earth into east and west?", "The Prime Meridian", "The Equator|The Tropic of Cancer"],
       ["The Prime Meridian passes through which place in England?", "Greenwich", "Paris|Sydney"], ["The Equator and the Prime Meridian cut Earth into how many parts?", "4 parts", "2 parts|3 parts"],
       ["The United States is in the Northern Hemisphere and which other?", "Western Hemisphere", "Eastern Hemisphere"], ["Australia is in the Southern Hemisphere and which other?", "Eastern Hemisphere", "Western Hemisphere"]])),
    LS("Coordinates and hemispheres", COORD),
    LS("Big map scales", SCALE100),
    LS("Hours behind and ahead", TIMEBEHIND),
    LS("Natural resources", MC([
      ["Gifts from nature", "🌳", "<b>Natural resources</b> are things from nature that people use: water, soil, trees, fish, oil, coal and metals."],
      ["Where they come from", "⛏️", "Wood comes from <b>forests</b>. Fish come from oceans, rivers and lakes. Metals like iron come from <b>mines</b>. Oil, coal and natural gas are <b>fossil fuels</b>."],
      ["Renewable or not", "♻️", "Trees can grow again, so they are <b>renewable</b>. Coal and oil take millions of years to form, so they can run out."]],
      "Think about where people get this material from nature.", "Ask: does it grow, flow, or get dug from the ground?",
      [["Wood comes from...", "Forests", "Oceans|Mines"], ["Fish are caught in...", "Oceans, rivers and lakes", "Mines|Deserts"], ["Iron ore is dug out of...", "Mines", "Forests|Rivers"],
       ["Coal, oil and natural gas are called...", "Fossil fuels", "Crops|Metals"], ["Which of these is a natural resource?", "Water", "A plastic toy|A car"], ["Which resource can grow back?", "Trees", "Coal|Oil"],
       ["Farmers need good...", "Soil", "Gold|Coal"], ["Gold and silver are...", "Metals dug from the ground", "Plants|Fossil fuels"], ["Which is a fossil fuel?", "Coal", "Wood|Wind"]])),
    LS("Landforms", MC([
      ["Shapes of the land", "🏞️", "A <b>plateau</b> is high flat land. A <b>plain</b> is low flat land. A <b>valley</b> is low land between hills. A <b>canyon</b> is a deep valley with steep sides."],
      ["More landforms", "🏜️", "A <b>mesa</b> is a hill with a flat top and steep sides. A <b>glacier</b> is a slow river of ice. A <b>delta</b> forms where a river meets the sea. A <b>cape</b> is a point of land that sticks out into the water."],
      ["Tip", "💡", "Think of the Grand Canyon: a river wore the rock away over millions of years."]],
      "Think about whether the land is high or low, flat or steep.", "Match the shape described in the question to the landform from the lesson.",
      [["Which landform is high, flat land?", "Plateau", "Valley|Delta"], ["Which landform is low land between hills?", "Valley", "Plateau|Mesa"], ["Which landform is a deep valley with steep sides?", "Canyon", "Plain|Cape"],
       ["Which landform is a slow river of ice?", "Glacier", "Delta|Mesa"], ["Which landform forms where a river meets the sea?", "Delta", "Canyon|Plateau"], ["Which landform is a hill with a flat top and steep sides?", "Mesa", "Valley|Delta"],
       ["Which landform is low, flat land?", "Plain", "Mesa|Canyon"], ["Which landform is a point of land sticking into the water?", "Cape", "Glacier|Valley"], ["The Grand Canyon was carved by a...", "River", "Glacier|Volcano"]])),
    LS("Parts of a river", MC([
      ["A river's journey", "🏞️", "A river starts at its <b>source</b>, often high in the hills. It flows downhill. It ends at its <b>mouth</b>, where it meets a sea, lake or bigger river."],
      ["Helpers and edges", "🌊", "A small river that joins a bigger one is a <b>tributary</b>. The land on each side is the <b>bank</b>. Flat land next to a river that floods is a <b>floodplain</b>."],
      ["Delta", "🔺", "At the mouth, a river can drop mud and sand and build a <b>delta</b>. The Nile Delta is a famous one."]],
      "Think about the river's journey from start to end.", "Rivers always flow from high land to low land. Use that and the lesson's words.",
      [["Where does a river start?", "At its source", "At its mouth|At its bank"], ["Where does a river end?", "At its mouth", "At its source|At its tributary"], ["A small river that joins a bigger river is a...", "Tributary", "Delta|Bank"],
       ["The land on each side of a river is the...", "Bank", "Source|Mouth"], ["Which way do rivers flow?", "Downhill", "Uphill|Along flat sand only"], ["Flat land next to a river that sometimes floods is a...", "Floodplain", "Plateau|Cape"],
       ["Mud and sand dropped at a river's mouth build a...", "Delta", "Source|Canyon"], ["The Nile Delta is in which country?", "Egypt", "Brazil|Canada"]])),
    LS("Weather and climate", MC([
      ["Short and long", "⛅", "<b>Weather</b> is what the air is like right now or this week: sunny, rainy, windy. <b>Climate</b> is the usual weather in a place over many years."],
      ["Examples", "🌵 ⛈️", "\"It is raining today\" is weather. \"The desert is dry all year\" is climate."],
      ["Weather tools", "🌡️", "A <b>thermometer</b> measures temperature. A <b>rain gauge</b> measures rain. An <b>anemometer</b> measures wind speed."]],
      "Is it about one day or week, or about many years?", "Weather changes quickly. Climate is the long-term pattern.",
      [["\"It is raining right now.\" Is this weather or climate?", "Weather", "Climate"], ["\"Deserts are hot and dry for most of the year.\" Is this weather or climate?", "Climate", "Weather"],
       ["\"There was a thunderstorm this afternoon.\" Is this weather or climate?", "Weather", "Climate"], ["\"Rainforests are warm and wet all year.\" Is this weather or climate?", "Climate", "Weather"],
       ["\"This week was windy.\" Is this weather or climate?", "Weather", "Climate"], ["The usual weather of a place over many years is its...", "Climate", "Season|Forecast"],
       ["Which tool measures temperature?", "Thermometer", "Rain gauge|Anemometer"], ["Which tool measures rainfall?", "Rain gauge", "Thermometer|Anemometer"], ["Which tool measures wind speed?", "Anemometer", "Thermometer|Rain gauge"]])),
    LS("Population words", MC([
      ["Counting people", "👥", "<b>Population</b> is the number of people living in a place. A <b>census</b> is an official count of the people."],
      ["Where people live", "🏙️ 🌾", "<b>Urban</b> means in a city. <b>Rural</b> means in the countryside. A <b>suburb</b> is an area of homes near a city."],
      ["Crowded or spread out", "📊", "<b>Population density</b> tells how crowded a place is. Cities are dense. Farm country is not."]],
      "Think about people, and about where they live.", "Urban is a city, rural is the countryside, a suburb is near a city.",
      [["The number of people living in a place is its...", "Population", "Climate|Border"], ["An official count of the people is a...", "Census", "Compass|Delta"], ["Urban means...", "In a city", "On a farm|On the sea"],
       ["Rural means...", "In the countryside", "In a big city|Under the ground"], ["A suburb is...", "An area of homes near a city", "A farm far away|A mountain town"], ["Which place has the highest density?", "A big city", "A desert|A farm field"],
       ["Which is a rural place?", "A farm village", "A busy downtown|A big airport"], ["Which is an urban place?", "A big city", "A wheat field|A small farm"], ["Population density tells how...", "Crowded a place is", "Hot a place is|Tall a place is"]])),
    LS("Neighbors and borders", MC([
      ["Touching countries", "🗺️", "A <b>border</b> is the line where two countries meet. Neighbors share a border. Canada is north of the USA and Mexico is south of it."],
      ["More neighbors", "🧭", "France and Spain are neighbors. Germany and Poland are neighbors. Egypt and Libya are neighbors. Haiti and the Dominican Republic share one island."],
      ["Not touching", "🚫", "Chile and Ecuador are in South America, but neither one touches Brazil. Peru does."]],
      "Picture the countries on a map. Which ones touch?", "A country across an ocean does not share a border.",
      [["Which country is north of the United States?", "Canada", "Mexico|Cuba"], ["Which country is south of the United States?", "Mexico", "Canada|Brazil"], ["Which country shares a border with France?", "Spain", "Japan|Egypt"],
       ["Which country borders Germany to the east?", "Poland", "Spain|Portugal"], ["Which country borders Egypt?", "Libya", "Brazil|Greece"], ["Which country shares the island of Hispaniola with Haiti?", "Dominican Republic", "Cuba|Jamaica"],
       ["Which country borders Brazil?", "Peru", "Chile|Ecuador"], ["Which country borders China to the north?", "Mongolia", "Japan|Thailand"], ["Which country lies between India and China, high in the Himalayas?", "Nepal", "Egypt|Spain"]])),
    LS("Cities on rivers", PAIR(CITYRIV, {
      title: "Cities on rivers", tv: "🏙️ 🌊", intro: "Many of the world's great cities grew up beside a <b>river</b>. Rivers gave people water, food and a way to travel and trade.",
      f: a => `Which river flows through ${a}?`, r: b => `The ${b} River flows through which city?`, n: "Think of a famous river and the big city beside it.", tip: "Link each city and river in a short rhyme or picture."
    })),
    LS("Canals that join seas", MC([
      ["Waterways made by people", "🚢", "A <b>canal</b> is a waterway dug by people. Ships use canals as shortcuts, so they do not have to sail all the way around a continent."],
      ["Two giants", "🌐", "The <b>Panama Canal</b> in Panama joins the Atlantic and Pacific Oceans. The <b>Suez Canal</b> in Egypt joins the Mediterranean Sea and the Red Sea."],
      ["Locks", "🔒", "Some canals use <b>locks</b>, rooms with gates that raise or lower ships. The <b>Erie Canal</b> in New York joined the Hudson River to the Great Lakes."]],
      "Think about what a canal connects and why ships use it.", "A canal is a shortcut between two bodies of water.",
      [["The Panama Canal is in which country?", "Panama", "Egypt|Brazil"], ["The Panama Canal joins the Atlantic Ocean to which ocean?", "Pacific Ocean", "Indian Ocean|Arctic Ocean"], ["The Suez Canal is in which country?", "Egypt", "Panama|India"],
       ["The Suez Canal joins the Red Sea to which sea?", "Mediterranean Sea", "Black Sea|Baltic Sea"], ["A canal is a waterway made by...", "People", "Volcanoes|Glaciers"], ["Ships use the Suez Canal to avoid sailing all the way around which continent?", "Africa", "Australia|Europe"],
       ["Gates that raise and lower ships in a canal are called...", "Locks", "Banks|Deltas"], ["The Erie Canal is in which US state?", "New York", "Texas|Florida"]])),
    LS("Capitals: Middle East and Central Asia", PAIR(MIDCAPS, {
      title: "Capitals: Middle East and Central Asia", tv: "🕌 🏙️", intro: "Now let's learn capitals in Southwest and Central Asia. Remember, a capital is the city where a country's leaders work.",
      f: a => `What is the capital of ${a}?`, r: b => `${b} is the capital of which country?`, n: "Say the country's name and think of its capital city.", tip: "Group the capitals by neighbors. Iraq's Baghdad and Jordan's Amman are close to each other."
    })),
  ];
  l7.push(LS("Mixed practice", MX(l7, [0, 1, 4, 5, 7, 8, 10, 12])));
  l7.push(LS("Level 7 Challenge", MX(l7, [2, 3, 6, 9, 11, 13, 14, 15, 16, 17])));

  // ================= LEVEL 8 =================
  const l8 = [
    LS("Capitals: Eastern Europe", PAIR(EECAPS, {
      title: "Capitals: Eastern Europe", tv: "🏰 🏙️", intro: "Eastern Europe and the Balkans have many countries side by side. A capital is the city where a country's leaders work.",
      f: a => `What is the capital of ${a}?`, r: b => `${b} is the capital of which country?`, n: "Say the country's name and think of its capital city.", tip: "Make a sound link: Kyiv and Ukraine, Sofia and Bulgaria. Say each pair out loud."
    })),
    LS("Capitals: small countries of Europe", PAIR(SMALLCAPS, {
      title: "Capitals: small countries of Europe", tv: "🇪🇺 🏙️", intro: "Some European countries are small, but they still have a capital city. Estonia, Latvia and Lithuania are called the Baltic countries.",
      f: a => `What is the capital of ${a}?`, r: b => `${b} is the capital of which country?`, n: "Say the country's name and think of its capital city.", tip: "Iceland and Malta are island countries. Cyprus is an island too."
    })),
    LS("Where rivers end", PAIR(RIVSEA, {
      title: "Where rivers end", tv: "🏞️ 🌊", intro: "Every river flows to a mouth. Many end in a <b>sea</b> or an <b>ocean</b>. Some, like the Volga, flow into a big lake-sea.",
      f: a => `The ${a} River flows into which body of water?`, r: b => `Which river flows into the ${b}?`, n: "Think about which sea or ocean is closest to where the river ends.", tip: "Draw a quick map in your head and trace each river to the water at its end."
    })),
    LS("Comparing mountain heights", MOUNTAINS),
    LS("What shapes climate", MC([
      ["Climate clues", "🌡️", "Three big things shape climate. <b>Latitude</b>: near the Equator is warm, near the poles is cold. <b>Elevation</b>: higher up is colder. <b>Distance from the sea</b>: places near the sea have milder weather."],
      ["Ocean currents", "🌊", "<b>Ocean currents</b> are rivers of water in the sea. Warm currents warm the coasts they pass. Cold currents cool them."],
      ["Example", "🏔️", "La Paz, in Bolivia, is high up in the mountains, so it is cool even though it is near the Equator."]],
      "Think about how far from the Equator, how high, or how close to the sea.", "Warm air near the Equator, cold air near the poles and high mountains.",
      [["Places near the Equator are usually...", "Warm", "Cold|Frozen"], ["As you go higher up a mountain, the air gets...", "Colder", "Warmer|Hotter"], ["Places near the sea usually have winters that are...", "Milder", "Much harsher|Always snowy"],
       ["Why are the poles cold?", "They are far from the Equator", "They are very low|They are close to the Sun"], ["A warm ocean current makes the coast it passes...", "Warmer", "Colder|Drier than a desert"],
       ["A town high on a mountain is probably...", "Cooler than a town at sea level", "Hotter than a town at sea level|The same as a beach"], ["Which three things help shape climate?", "Latitude, elevation and distance from the sea", "Colors, sounds and names|Rivers, roads and bridges"],
       ["La Paz is cool because of its...", "High elevation", "Low elevation|Position on the Equator"]])),
    LS("Plates and the Ring of Fire", MC([
      ["Moving plates", "🌋", "Earth's outer layer is cracked into huge pieces called <b>tectonic plates</b>. They move very slowly, a few centimeters a year."],
      ["What they cause", "🌐", "When plates push, pull or slide past each other, we can get <b>earthquakes</b>, <b>volcanoes</b> and new <b>mountains</b>. The <b>Himalayas</b> grew when two plates pushed together."],
      ["Ring of Fire", "🔥", "Many volcanoes and earthquakes happen in a ring around the <b>Pacific Ocean</b>, called the <b>Ring of Fire</b>."]],
      "Think about the huge slow-moving pieces of Earth's outer layer.", "Plates meeting or sliding cause shaking and mountains.",
      [["The huge moving pieces of Earth's outer layer are called...", "Tectonic plates", "Deltas|Tributaries"], ["How fast do plates move?", "Very slowly, a few cm a year", "Very fast, a meter a minute|They never move"], ["Where plates grind together, we may get...", "Earthquakes", "Tides|Blizzards"],
       ["The Ring of Fire circles which ocean?", "Pacific Ocean", "Atlantic Ocean|Arctic Ocean"], ["Melted rock that comes out of a volcano is called...", "Lava", "Sand|Gravel"], ["The Himalayas formed when plates...", "Pushed together", "Pulled apart"],
       ["A tsunami is a giant wave often started by...", "An earthquake under the sea", "A strong wind on land|A rain shower"], ["The Ring of Fire has many...", "Volcanoes and earthquakes", "Deserts and lakes|Glaciers only"], ["Mountains can form when plates...", "Crash together", "Stand still|Float away"]])),
    LS("Kinds of maps", MC([
      ["Different jobs", "🗺️", "A <b>political map</b> shows borders and capitals. A <b>physical map</b> shows land and water. A <b>road map</b> shows roads."],
      ["Maps about one topic", "📊", "A <b>thematic map</b> shows one topic, such as rainfall, climate or population. A <b>topographic map</b> uses <b>contour lines</b> to show hills and heights."],
      ["Tip", "💡", "Always check the title and the key to see what a map shows."]],
      "Think about what information the map needs to show.", "Contour lines join places of the same height.",
      [["Which map shows borders and capitals?", "Political map", "Road map|Climate map"], ["Which map shows mountains, rivers and lakes?", "Physical map", "Political map|Road map"], ["Which map shows roads and highways?", "Road map", "Physical map|Population map"],
       ["Which map uses contour lines to show heights?", "Topographic map", "Political map|Road map"], ["A map that shows one topic like rainfall is called a...", "Thematic map", "Road map|Globe"], ["Which map would show how many people live in each state?", "Population map", "Road map|Topographic map"],
       ["Where on a map do you find out what the symbols mean?", "The key", "The border|The scale bar only"], ["A map showing the usual weather of regions is a...", "Climate map", "Road map|Political map"]])),
    LS("Reading population numbers", POPDATA),
    LS("Degrees of latitude", DEGLAT),
    LS("UTC and time zones", UTC),
    LS("Why people move", MC([
      ["Migration", "🧳", "<b>Migration</b> means moving to live in a new place. An <b>immigrant</b> moves into a new country. An <b>emigrant</b> leaves a country."],
      ["Push and pull", "↔️", "A <b>push factor</b> is a reason to leave, like no jobs or a drought. A <b>pull factor</b> is a reason to come, like jobs, schools or safety."],
      ["Within a country", "🏘️", "People also move within a country, often from the countryside to cities to find work. This is called <b>rural-to-urban</b> migration."]],
      "Think about leaving a place versus arriving at a new one.", "Push means pushed away. Pull means drawn toward.",
      [["Moving to live in a new place is called...", "Migration", "Climate|Trade"], ["A person who moves into a new country is an...", "Immigrant", "Emigrant"], ["A person who leaves their country is an...", "Emigrant", "Immigrant"],
       ["A reason to leave a place is a...", "Push factor", "Pull factor"], ["A reason to move to a place is a...", "Pull factor", "Push factor"], ["Good jobs and schools in a city are a...", "Pull factor", "Push factor"],
       ["A long drought that ruins crops can be a...", "Push factor", "Pull factor"], ["People moving from farms to cities is called...", "Rural-to-urban migration", "Island migration|Ocean current"]])),
    LS("Trade: top exports", PAIR(TRADE, {
      title: "Trade: top exports", tv: "🚢 📦", intro: "<b>Exports</b> are goods a country sells to other countries. <b>Imports</b> are goods a country buys. Countries trade because no place has everything.",
      f: a => `Which country is a top exporter of ${a}?`, r: b => `${b} is a top exporter of which of these?`, n: "Think about where in the world this good is grown or made.", tip: "Try picturing the product and the country together."
    })),
    LS("Big cities that are not capitals", PAIR(BIGCITY, {
      title: "Big cities that are not capitals", tv: "🌆 🏙️", intro: "Some of the biggest cities in the world are not capitals. A city with more than 10 million people is a <b>megacity</b>.",
      f: a => `In which country is the city of ${a}?`, r: b => `Which of these big cities is in ${b}?`, n: "Think about the city and the country it belongs to.", tip: "A big city is not always the capital. Link each city to its country."
    })),
    LS("Layers of the Earth", MC([
      ["Inside Earth", "🌍", "Earth has four main layers. The thin outside is the <b>crust</b>. Under it is the thick <b>mantle</b>. Then the liquid <b>outer core</b>. In the center is the solid <b>inner core</b>."],
      ["Facts", "🔥", "We live on the crust. The mantle is the thickest layer. The cores are made mostly of hot metal: iron and nickel."],
      ["Tip", "🍎", "Think of an apple: the crust is like the skin."]],
      "Think about layers from the outside to the center.", "Crust, mantle, outer core, inner core. Which is first, thickest, liquid or solid?",
      [["Which layer do we live on?", "Crust", "Mantle|Inner core"], ["Which layer is the thickest?", "Mantle", "Crust|Outer core"], ["Which layer is a liquid metal?", "Outer core", "Crust|Inner core"],
       ["Which layer is a hot solid ball in the center?", "Inner core", "Crust|Mantle"], ["How many main layers does Earth have?", "4", "2|7"], ["Which layer is the thinnest?", "Crust", "Mantle|Outer core"],
       ["What are the cores mostly made of?", "Iron and nickel", "Water and ice|Sand and clay"], ["Which layer is like the skin of an apple?", "Crust", "Inner core|Mantle"]])),
    LS("Tilt, spin and seasons", MC([
      ["Spin and orbit", "🔄", "Earth <b>spins</b> once about every 24 hours, which gives us day and night. It <b>orbits</b> the Sun once in about 365 days, which is a year."],
      ["Tilt", "🌍", "Earth is <b>tilted</b>. When the Northern Hemisphere leans toward the Sun, it has summer and the south has winter. Half a year later, it switches."],
      ["Near the Equator", "☀️", "Near the Equator the Sun is high all year, so it is warm all year. The seasons are not very different."]],
      "Think about spinning, going around the Sun and leaning.", "The tilt, not the distance from the Sun, causes the seasons.",
      [["What gives us day and night?", "Earth spinning", "Earth's tilt|The Moon's orbit"], ["About how long does Earth take to go around the Sun?", "365 days", "24 hours|30 days"], ["About how long does Earth take to spin once?", "24 hours", "365 days|7 days"],
       ["What causes the seasons?", "Earth's tilt", "Earth's spin|The Moon"], ["When it is summer in Canada, it is ... in Australia.", "Winter", "Summer|Spring all year"], ["When the Northern Hemisphere leans toward the Sun, it has...", "Summer", "Winter"],
       ["Near the Equator, the seasons are...", "Not very different", "Very snowy|Very icy"], ["In the Northern Hemisphere, the longest day of the year is in...", "June", "December|February"]])),
    LS("People and the environment", MC([
      ["Our effect on nature", "🌲", "People change the environment. <b>Deforestation</b> is cutting down large areas of forest. <b>Pollution</b> is dirty stuff in the air, water or soil."],
      ["Helping the planet", "♻️", "<b>Conservation</b> means protecting nature. We can <b>reduce, reuse and recycle</b>, plant trees and make <b>national parks</b> where wildlife is safe."],
      ["Tip", "💡", "Small actions add up. A cleaner river or a planted tree helps animals and people."]],
      "Think about how people harm or help the land, air and water.", "Conservation means keeping and protecting.",
      [["Cutting down large areas of forest is called...", "Deforestation", "Conservation|Migration"], ["Dirty stuff in air, water or soil is called...", "Pollution", "Climate|Trade"], ["Protecting nature is called...", "Conservation", "Pollution|Deforestation"],
       ["Which action helps the planet?", "Recycling paper", "Dropping litter in a river|Cutting down all the trees"], ["Planting trees helps...", "Animals, air and soil", "Only roads|Nothing"], ["A national park is a place where...", "Nature and wildlife are protected", "Factories are built|Cities grow"],
       ["Reduce, reuse and recycle help us make less...", "Waste", "Rain|Wind"], ["Litter in the ocean is a problem because it...", "Can hurt sea life", "Makes water saltier|Helps fish"]])),
    LS("Physical or human-made?", CLS({
      title: "Physical or human-made?", tv: "⛰️ 🌉", cats: ["Physical (natural)", "Human-made"], q: n => `Is ${n} physical (natural) or human-made?`,
      intro: "<b>Physical features</b> are made by nature, like mountains and rivers. <b>Human features</b> are built by people, like roads and cities.", tip: "If nature made it, it is physical. If people built it, it is human-made.",
      n: "Ask: did nature make it, or did people build it?",
      items: [["a mountain", "Physical (natural)", "⛰️"], ["a river", "Physical (natural)", "🏞️"], ["a desert", "Physical (natural)", "🏜️"], ["a lake", "Physical (natural)", "💧"], ["a forest", "Physical (natural)", "🌲"], ["a valley", "Physical (natural)", "🏞️"],
              ["a bridge", "Human-made", "🌉"], ["a city", "Human-made", "🏙️"], ["a road", "Human-made", "🛣️"], ["a farm", "Human-made", "🚜"], ["an airport", "Human-made", "🛫"], ["a canal", "Human-made", "🚢"], ["a dam", "Human-made", "🏗️"], ["a school", "Human-made", "🏫"]]
    })),
    LS("Regions of Asia", CLS({
      title: "Regions of Asia", tv: "🌏 🗺️", cats: ["East Asia", "Southeast Asia", "South Asia", "Central Asia", "Middle East"], q: n => `${n} is in which region of Asia?`,
      intro: "Asia is the biggest continent, so geographers split it into <b>regions</b>.", tip: "Think about the compass: east, southeast, south, central, and the Middle East in the southwest.",
      n: "Picture Asia and where the country sits in it.",
      items: [["Japan", "East Asia", "🗾"], ["China", "East Asia", "🐼"], ["South Korea", "East Asia", "🇰🇷"], ["Mongolia", "East Asia", "🐎"], ["Thailand", "Southeast Asia", "🐘"], ["Vietnam", "Southeast Asia", "🛶"], ["Indonesia", "Southeast Asia", "🌋"], ["The Philippines", "Southeast Asia", "🏝️"],
              ["India", "South Asia", "🕌"], ["Pakistan", "South Asia", "🏔️"], ["Nepal", "South Asia", "🏔️"], ["Bangladesh", "South Asia", "🌾"], ["Kazakhstan", "Central Asia", "🏜️"], ["Uzbekistan", "Central Asia", "🕌"], ["Saudi Arabia", "Middle East", "🐪"], ["Iraq", "Middle East", "🏜️"], ["Jordan", "Middle East", "🏜️"]]
    })),
  ];
  l8.push(LS("Mixed practice", MX(l8, [0, 2, 4, 6, 8, 10, 12, 14])));
  l8.push(LS("Level 8 Challenge", MX(l8, [1, 3, 5, 7, 9, 11, 13, 15, 16, 17])));

  // ================= LEVEL 9 =================
  const l9 = [
    LS("Capital or biggest city?", MC([
      ["Not always the biggest", "🏛️", "The capital is where the government works. It is often not the biggest or best-known city. The capital of Australia is <b>Canberra</b>, not Sydney."],
      ["More surprises", "🌆", "Canada's capital is Ottawa, not Toronto. Brazil's capital is Brasília, not Rio. Turkey's capital is Ankara, not Istanbul. Switzerland's capital is Bern, not Zurich."],
      ["Tip", "💡", "When a country has a very famous city, check carefully: the capital may be a smaller one."]],
      "The biggest or most famous city is not always the capital.", "A capital is where the country's leaders work.",
      [["What is the capital of Australia?", "Canberra", "Sydney|Melbourne"], ["What is the capital of Canada?", "Ottawa", "Toronto|Vancouver"], ["What is the capital of Brazil?", "Brasília", "Rio de Janeiro|São Paulo"],
       ["What is the capital of Turkey?", "Ankara", "Istanbul|Izmir"], ["What is the capital of Switzerland?", "Bern", "Zurich|Geneva"], ["What is the capital of New Zealand?", "Wellington", "Auckland|Christchurch"],
       ["What is the capital of Morocco?", "Rabat", "Casablanca|Marrakesh"], ["What is the capital of Nigeria?", "Abuja", "Lagos|Kano"], ["What is the capital of Pakistan?", "Islamabad", "Karachi|Lahore"],
       ["What is the capital of the United States?", "Washington, D.C.", "New York City|Los Angeles"], ["What is the capital of Tanzania?", "Dodoma", "Dar es Salaam|Arusha"]])),
    LS("US state neighbors", MC([
      ["Bordering states", "🇺🇸", "Many states touch each other along borders. Oregon touches Washington. Texas touches New Mexico. Florida touches Georgia."],
      ["More borders", "🗺️", "Colorado touches Utah. Ohio touches Michigan. New York touches Pennsylvania. Arizona and Texas touch Mexico. Maine touches Canada."],
      ["Special ones", "🌺", "<b>Hawaii</b> is a group of islands in the Pacific Ocean. <b>Alaska</b> touches Canada. Neither one touches another US state."]],
      "Picture the US map and look next door to the state.", "Think of the states in the lesson that touch each other.",
      [["Which state borders Oregon?", "Washington", "Florida|Texas"], ["Which state borders Texas?", "New Mexico", "Maine|Oregon"], ["Which state borders Florida?", "Georgia", "Ohio|Nevada"],
       ["Which state borders Colorado?", "Utah", "Maine|Florida"], ["Which state borders Ohio?", "Michigan", "Utah|Montana"], ["Which state borders Arizona?", "Nevada", "Oregon|Wyoming"],
       ["Which state borders New York?", "Pennsylvania", "Illinois|Florida"], ["Which of these states touches Mexico?", "Arizona", "Nevada|Utah"], ["Which of these states touches Canada?", "Maine", "Texas|Georgia"],
       ["Alaska is next to which country by land?", "Canada", "Japan|Mexico"], ["Which state is a group of islands far out in the Pacific?", "Hawaii", "Florida|Maine"]])),
    LS("Landforms of the USA", MC([
      ["East and west", "⛰️", "The <b>Appalachian Mountains</b> are in the east. The <b>Rocky Mountains</b> are in the west. In between lie the flat grasslands of the <b>Great Plains</b>."],
      ["Rivers and canyons", "🏞️", "The <b>Mississippi River</b> flows south into the Gulf of Mexico. The <b>Colorado River</b> carved the <b>Grand Canyon</b> in Arizona. <b>Niagara Falls</b> is between New York and Canada."],
      ["Records", "🏆", "<b>Denali</b> in Alaska is the highest mountain. <b>Death Valley</b> in California is the lowest and hottest place. The <b>Everglades</b> in Florida is a huge wetland."]],
      "Think about where on the US map each landform is.", "Remember east, middle and west, and the rivers in the lesson.",
      [["Which mountains are in the eastern United States?", "Appalachian Mountains", "Rocky Mountains|Alps"], ["Which mountains are in the western United States?", "Rocky Mountains", "Appalachian Mountains|Himalayas"], ["What is the huge flat grassland in the middle of the USA?", "Great Plains", "Rocky Mountains|Grand Canyon"],
       ["Which river carved the Grand Canyon?", "Colorado River", "Mississippi River|Hudson River"], ["Death Valley is in which state?", "California", "Florida|Maine"], ["Which mountain is the highest in the USA?", "Denali", "Mount Everest|Mont Blanc"],
       ["The Everglades are a huge wetland in which state?", "Florida", "Nevada|Oregon"], ["The Mississippi River flows into the...", "Gulf of Mexico", "Pacific Ocean|Great Lakes"], ["Niagara Falls is on the border of New York and which country?", "Canada", "Mexico|Cuba"]])),
    LS("Flights and time zones", FLIGHT),
    LS("Map scale with halves", SCALEHALF),
    LS("Longitude and time", LONGTIME),
    LS("Population density", DENSITY),
    LS("Kinds of work", CLS({
      title: "Kinds of work", tv: "👷 🏭", cats: ["Primary (from nature)", "Secondary (makes goods)", "Services"], q: n => `Which kind of work does ${n} do?`,
      intro: "Jobs fall into three groups. <b>Primary</b> work takes things from nature. <b>Secondary</b> work makes goods in factories. <b>Services</b> help people.", tip: "Nature gives raw things, factories make them into goods, services help people.",
      n: "Ask: does this person take from nature, make something, or help people?", c: "Primary is farm, mine, sea or forest. Secondary is factory. Services are helping jobs.",
      items: [["a farmer", "Primary (from nature)", "🚜"], ["a miner", "Primary (from nature)", "⛏️"], ["a fisher", "Primary (from nature)", "🎣"], ["a forest worker", "Primary (from nature)", "🌲"],
              ["a car factory worker", "Secondary (makes goods)", "🚗"], ["a furniture maker", "Secondary (makes goods)", "🪑"], ["a steel mill worker", "Secondary (makes goods)", "🏭"], ["a bread factory worker", "Secondary (makes goods)", "🍞"],
              ["a teacher", "Services", "🏫"], ["a nurse", "Services", "🏥"], ["a bus driver", "Services", "🚌"], ["a store clerk", "Services", "🛒"]]
    })),
    LS("Energy sources and places", MC([
      ["Where energy comes from", "⚡", "<b>Hydropower</b> uses moving water, often from a dam. <b>Wind turbines</b> work best on windy plains and coasts. <b>Solar panels</b> work best where it is sunny."],
      ["Heat and plants", "🌋", "<b>Geothermal</b> energy uses heat from inside Earth, and Iceland uses lots of it. <b>Biomass</b> comes from wood, plants and waste."],
      ["Fossil fuels", "🛢️", "Coal, oil and natural gas make smoke and gases when burned. Renewable sources make much less."]],
      "Think about what powers each kind of energy: water, wind, sun, heat or plants.", "Match each energy to the place or thing that gives it power.",
      [["Hydropower uses...", "Moving water", "Strong wind|Sunlight"], ["Wind turbines work best in...", "Windy places", "Dark caves|Still valleys"], ["Solar panels work best where it is...", "Sunny", "Cloudy|Dark"],
       ["Geothermal energy comes from...", "Heat inside Earth", "Wind|Tides only"], ["Which country uses lots of geothermal energy?", "Iceland", "Egypt|Mongolia"], ["Biomass energy comes from...", "Wood, plants and waste", "Wind and rain|Oil wells"],
       ["Which of these is a fossil fuel?", "Coal", "Wind|Sunlight"], ["A dam often helps make...", "Hydropower", "Wind power|Solar power"], ["Which energy would work best in a sunny desert?", "Solar power", "Hydropower|Geothermal power"]])),
    LS("Parts of culture", MC([
      ["What is culture?", "🎎", "<b>Culture</b> is the way of life of a group of people: their language, food, clothing, music, holidays and customs."],
      ["Customs and traditions", "🎶", "A <b>custom</b> is something people usually do, like bowing to say hello in Japan. A <b>tradition</b> is a custom passed down for many years."],
      ["Sharing culture", "🤝", "When people move to a new place, they bring their culture with them. Cultures are different, and each one is worth respect."]],
      "Think about the way of life of a group of people.", "Culture is made of things people do, say, make and share.",
      [["Which of these is part of culture?", "Music, food and holidays", "The weather|The height of mountains"], ["A group's way of life is called its...", "Culture", "Climate|Latitude"], ["Something people usually do, like a way of greeting, is a...", "Custom", "Landform|Border"],
       ["A custom passed down for many years is a...", "Tradition", "Plateau|Census"], ["Traditional clothing is part of a people's...", "Culture", "Climate|Landforms"], ["When people move, they bring their...", "Culture with them", "Mountains with them|Rivers with them"],
       ["In Japan, people often greet each other by...", "Bowing", "Shouting|Running"], ["Stories told by grandparents are part of...", "Culture", "Weather|A map scale"]])),
    LS("Weathering and erosion", MC([
      ["Changing the land", "🏔️", "<b>Weathering</b> breaks rock into smaller pieces. <b>Erosion</b> carries those pieces away by water, wind or ice. <b>Deposition</b> is when they are dropped in a new place."],
      ["Examples", "🏜️", "A river erodes rock and carves a canyon. Wind erosion makes sand dunes when the sand is dropped. A river's mud and sand build a delta."],
      ["Tip", "💡", "Break, carry, drop: weathering, erosion, deposition."]],
      "Think: break, carry or drop?", "Weathering breaks. Erosion carries. Deposition drops.",
      [["Breaking rock into smaller pieces is called...", "Weathering", "Erosion|Deposition"], ["Carrying pieces of rock away is called...", "Erosion", "Weathering|Deposition"], ["Dropping the pieces in a new place is called...", "Deposition", "Weathering|Erosion"],
       ["A river carving a canyon is an example of...", "Erosion", "Deposition|Migration"], ["A river building a delta with mud and sand is an example of...", "Deposition", "Erosion|Weathering"], ["Which can carry rock pieces away?", "Water, wind or ice", "Only the Sun|Only the Moon"],
       ["Wind drops sand and makes a...", "Dune", "Canyon|Glacier"], ["Rain and ice cracking a rock is an example of...", "Weathering", "Deposition|Migration"]])),
    LS("Rainfall data", RAIN),
    LS("Natural or drawn borders?", CLS({
      title: "Natural or drawn borders?", tv: "🏔️ 📏", cats: ["Natural border", "Drawn border"], q: n => `Is ${n} a natural border or a drawn border?`,
      intro: "Some borders follow nature, like a river or a mountain range. Others are lines people agreed on and drew on the map.", tip: "Natural borders follow land or water. Drawn borders are straight lines or treaty lines.",
      n: "Does the border follow something in nature, or is it a line that people drew?",
      items: [["a river", "Natural border", "🏞️"], ["a mountain range", "Natural border", "⛰️"], ["a coastline", "Natural border", "🌊"], ["a lake", "Natural border", "💧"], ["the Pyrenees mountains between France and Spain", "Natural border", "⛰️"],
              ["a straight line drawn on a map", "Drawn border", "📏"], ["the 49th parallel between the USA and Canada", "Drawn border", "📏"], ["a line agreed in a treaty", "Drawn border", "📜"], ["a fence along a line", "Drawn border", "🚧"]]
    })),
    LS("The Arctic and Antarctica", MC([
      ["Two polar lands", "🧊", "The <b>Arctic</b> is mostly a frozen ocean around the <b>North Pole</b>. <b>Antarctica</b> is a continent of ice around the <b>South Pole</b>."],
      ["Animals", "🐧 🐻‍❄️", "<b>Penguins</b> live in the south. <b>Polar bears</b> live in the Arctic. Penguins and polar bears do not meet in the wild."],
      ["Facts", "🔬", "Antarctica is the coldest, windiest, driest continent. No country owns it. Scientists from many countries study there."]],
      "Think about north and south, ocean and land.", "The Arctic is in the north. Antarctica is in the south.",
      [["Which pole is in the Arctic?", "North Pole", "South Pole"], ["Which pole is in Antarctica?", "South Pole", "North Pole"], ["The Arctic is mostly a frozen...", "Ocean", "Desert|Forest"],
       ["Antarctica is a...", "Continent", "Ocean|Country"], ["Which animal lives in the Arctic?", "Polar bear", "Penguin|Kangaroo"], ["Which animal lives in Antarctica?", "Penguin", "Polar bear|Camel"],
       ["Who owns Antarctica?", "No country", "Russia|Canada"], ["Who lives in Antarctica for a short time?", "Scientists", "Farmers|Miners"], ["Which is the coldest continent?", "Antarctica", "Africa|Australia"]])),
    LS("Caring for the planet", MC([
      ["Smart choices", "🌍", "Small choices help the planet. Turn off lights, use less water, walk or ride a bike, and take a bag to the store."],
      ["Reduce, reuse, recycle", "♻️", "<b>Reduce</b> means use less. <b>Reuse</b> means use again, like a jar for pencils. <b>Recycle</b> means turn old things into new ones. <b>Compost</b> turns food scraps into soil food."],
      ["Energy and water", "💧", "Using less energy and water protects resources for the future."]],
      "Think about using less, using again or turning into something new.", "Which choice saves energy, water or materials?",
      [["Which saves electricity?", "Turning off lights when you leave", "Leaving the TV on|Opening the fridge for a long time"], ["Reusing means...", "Using something again", "Using it less|Throwing it away"],
       ["Reducing means...", "Using less", "Using it again|Making it new"], ["Recycling means...", "Turning old things into new ones", "Burying things|Burning things"], ["Compost turns food scraps into...", "Soil food", "Plastic|Glass"],
       ["Which choice saves water?", "A short shower", "Leaving the tap running|Washing a car every day"], ["Which is an example of reusing?", "Using a jar for pencils", "Throwing a jar away|Breaking a jar"], ["Walking or riding a bike instead of driving...", "Makes less pollution", "Makes more pollution|Uses more fuel"]])),
    LS("Wonders and ruins", PAIR(WONDERS, {
      title: "Wonders and ruins", tv: "🏛️ 🔺", intro: "Some places are famous for their very old buildings and ruins. People travel from all over the world to see them.",
      f: a => `In which country is ${a}?`, r: b => `Which famous place is in ${b}?`, n: "Picture the famous place and think about where it is on the map.", tip: "Link each place with its country using a picture in your mind."
    })),
    LS("Regions of Europe", CLS({
      title: "Regions of Europe", tv: "🇪🇺 🗺️", cats: ["Northern Europe", "Southern Europe", "Western Europe", "Eastern Europe"], q: n => `${n} is in which region of Europe?`,
      intro: "Europe is a small continent with many countries. Geographers group them into <b>regions</b>: north, south, west and east.", tip: "Think of the compass. Sunny Mediterranean lands are in the south. Cold, northern lands are in the north.",
      n: "Picture Europe. Is the country in the north, south, west or east?",
      items: [["Norway", "Northern Europe", "🏔️"], ["Sweden", "Northern Europe", "🌲"], ["Finland", "Northern Europe", "🌲"], ["Iceland", "Northern Europe", "🌋"],
              ["Italy", "Southern Europe", "🍕"], ["Spain", "Southern Europe", "☀️"], ["Portugal", "Southern Europe", "⛵"], ["Greece", "Southern Europe", "🏛️"],
              ["France", "Western Europe", "🥐"], ["The Netherlands", "Western Europe", "🌷"], ["Belgium", "Western Europe", "🍫"],
              ["Poland", "Eastern Europe", "🏰"], ["Ukraine", "Eastern Europe", "🌻"], ["Romania", "Eastern Europe", "🏰"], ["Bulgaria", "Eastern Europe", "🌹"]]
    })),
    LS("Regions of Africa", CLS({
      title: "Regions of Africa", tv: "🌍 🦁", cats: ["North Africa", "West Africa", "East Africa", "Central Africa", "Southern Africa"], q: n => `${n} is in which region of Africa?`,
      intro: "Africa is the second biggest continent and has 54 countries. Geographers group them into <b>regions</b>.", tip: "North Africa touches the Mediterranean Sea. Southern Africa is at the bottom of the continent.",
      n: "Picture Africa. Is the country in the north, west, east, center or south?",
      items: [["Egypt", "North Africa", "🔺"], ["Morocco", "North Africa", "🐪"], ["Algeria", "North Africa", "🏜️"], ["Tunisia", "North Africa", "🏖️"],
              ["Nigeria", "West Africa", "🌴"], ["Ghana", "West Africa", "🌴"], ["Senegal", "West Africa", "🌅"], ["Mali", "West Africa", "🏜️"],
              ["Kenya", "East Africa", "🦒"], ["Ethiopia", "East Africa", "⛰️"], ["Tanzania", "East Africa", "🏔️"], ["Uganda", "East Africa", "🦍"],
              ["Cameroon", "Central Africa", "🌳"], ["Chad", "Central Africa", "🏜️"], ["South Africa", "Southern Africa", "🦁"], ["Zambia", "Southern Africa", "💧"], ["Botswana", "Southern Africa", "🐘"], ["Namibia", "Southern Africa", "🏜️"]]
    })),
  ];
  l9.push(LS("Mixed practice", MX(l9, [0, 3, 5, 6, 8, 10, 12, 14])));
  l9.push(LS("Level 9 Challenge", MX(l9, [1, 2, 4, 7, 9, 11, 13, 15, 16, 17])));

  Object.assign(GEO_LEVELS, { 7: l7, 8: l8, 9: l9 });
})();
