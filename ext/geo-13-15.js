// ext/geo-13-15.js : Mind Lab Geography levels 13-15 (60 lessons)
(() => {
  const slide = (h, v, t) => ({ h, v, t });
  const LS = (title, make) => ({ title, make });
  const fmt = n => n.toLocaleString("en-US");
  const first = s => {
    const c = String(s).replace(/^(a|an|the)\s+/i, "").replace(/<[^>]+>/g, "")[0];
    return /[A-Za-z]/.test(c) ? c.toUpperCase() : null;
  };
  const clue = (c, a) => { const f = first(a); return f ? `${c} The answer starts with the letter "${f}".` : `${c} Cross out the choices that cannot be right.`; };

  // Multiple choice. s = 3 slides, n = nudge, c = clue, items = [question, right, "wrong1|wrong2"]
  const MC = (s, n, c, items) => {
    const make = () => {
      const [q, a, w, v] = pick(items), ex = pick(items.filter(x => x[1] !== a && x[0] !== q));
      const r = { text: q, choices: shuf([a, ...w.split("|")]), answer: a, hints: [n, clue(c, a), `Example: "${ex[0]}" The answer is "${ex[1]}". Now do yours.`] };
      if (v) r.visual = v;
      return r;
    };
    make.teach = () => s.map(x => slide(x[0], x[1], x[2]));
    return make;
  };
  // Pairs: list = [a, b, emoji]
  const PAIR = (list, o) => {
    const make = () => {
      const cur = pick(list), rest = shuf(list.filter(x => x !== cur)), ex = rest[0];
      if (Math.random() < 0.4) return {
        text: o.r(cur[1]), choices: shuf([cur[0], rest[1][0], rest[2][0]]), answer: cur[0],
        hints: [o.n, clue("Think about the list you studied.", cur[0]), `Example: ${ex[1]} goes with ${ex[0]}. Now do yours.`]
      };
      const r = {
        text: o.f(cur[0]), choices: shuf([cur[1], rest[1][1], rest[2][1]]), answer: cur[1],
        hints: [o.n, clue("Think about the list you studied.", cur[1]), `Example: ${ex[0]} goes with ${ex[1]}. So when the question is about ${ex[0]}, the answer is ${ex[1]}. Now do yours.`]
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
  const MX = (lessons, idxs) => {
    const ms = idxs.map(i => lessons[i].make), f = () => pick(ms)();
    f.teach = () => [slide("Review time!", "🔄", "This lesson mixes ideas you already learned. Here is a quick reminder of each one, then the quiz.")].concat(ms.map(m => m.teach()[0]));
    return f;
  };
  const NUM = (s, fn) => { fn.teach = () => s.map(x => slide(x[0], x[1], x[2])); return fn; };
  const uniq = arr => arr.filter((x, i) => arr.indexOf(x) === i);

  // ---------- number makers ----------
  const NATINC = NUM([
    ["Birth and death rates", "👶 🌍", "A <b>birth rate</b> is how many babies are born each year for every 1,000 people. A <b>death rate</b> is how many people die each year for every 1,000 people."],
    ["Natural increase", "➖", "<b>Natural increase</b> = birth rate <b>minus</b> death rate. If more are born than die, the population grows."],
    ["Example", "20 births, 8 deaths", "20 - 8 = 12 more people for every 1,000. In a town of 5,000 people that is 12 x 5 = 60 more people in a year."]
  ], () => {
    const b = ri(12, 40), d = ri(5, b - 3), inc = b - d, m = Math.random();
    if (m < 0.4) return {
      text: `In one country there are ${b} births and ${d} deaths each year for every 1,000 people. By how many people does the population grow for every 1,000 people?`, answer: inc,
      hints: ["The population grows when more people are born than die.", "Take the death rate away from the birth rate.", "Example: 47 births and 12 deaths for every 1,000 people. 47 - 12 = 35 more. Now do yours."]
    };
    if (m < 0.7) return {
      text: `A country has a birth rate of ${b} per 1,000 people. Its population grows by ${inc} per 1,000 people each year. What is its death rate per 1,000 people?`, answer: d,
      hints: ["Growth is what is left after the deaths are taken away from the births.", "Work backwards: birth rate minus growth gives the death rate.", "Example: births 45, growth 33. 45 - 33 = 12 deaths. Now do yours."]
    };
    const n = pick([2, 3, 4, 5, 10]);
    return {
      text: `A city has ${fmt(n * 1000)} people. Its natural increase is ${inc} per 1,000 people each year. About how many more people will it have after one year (counting only births and deaths)?`, answer: inc * n,
      hints: ["First think about how many groups of 1,000 people the city has.", "Multiply the natural increase for one group of 1,000 by the number of groups.", "Example: 7,000 people and an increase of 6 per 1,000. 7 groups x 6 = 42 more people. Now do yours."]
    };
  });

  const PCTCH = NUM([
    ["Percent change", "📈 📉", "<b>Percent change</b> tells how much something grew or shrank compared with where it started."],
    ["The steps", "🧮", "Change = new number minus old number. Then find what percent of the <b>old</b> number the change is."],
    ["Example", "200 to 250", "Change is 50. 50 is a quarter of 200, which is 25%. The population grew by 25%."]
  ], () => {
    let A, p, B;
    do { A = pick([50, 100, 200, 250, 400, 500, 800, 1000]); p = pick([5, 10, 20, 25, 50]); B = A * (100 + p) / 100; } while (!Number.isInteger(B) || !Number.isInteger(A * (100 - p) / 100));
    const D = A * (100 - p) / 100, m = Math.random();
    if (m < 0.35) return {
      text: `A town grew from ${fmt(A)} people to ${fmt(B)} people. By what percent did it grow?`, answer: p,
      hints: ["Find how many people were added first.", "Compare the number added with the starting number, not the new number.", "Example: 300 grew to 330. 30 were added, and 30 is a tenth of 300, so 10. Now do yours."]
    };
    if (m < 0.7) return {
      text: `A town has ${fmt(A)} people. Its population grows by ${p}%. How many people does it have now?`, answer: B,
      hints: ["Find the number of new people first, then add them on.", "Change the percent to a part of the old number, then add that part to the old number.", "Example: 600 people grow by 10%. 10% of 600 is 60, so 600 + 60 = 660. Now do yours."]
    };
    return {
      text: `A village had ${fmt(A)} people. Then its population fell to ${fmt(D)}. By what percent did it shrink?`, answer: p,
      hints: ["Find how many people were lost.", "Compare the number lost with the starting number.", "Example: 300 fell to 240. 60 were lost, and 60 is a fifth of 300, so 20. Now do yours."]
    };
  });

  const TEMPC = NUM([
    ["Two temperature scales", "🌡️", "Most of the world uses <b>Celsius</b> (°C). The United States mostly uses <b>Fahrenheit</b> (°F). Water freezes at 0°C = 32°F and boils at 100°C = 212°F."],
    ["Celsius to Fahrenheit", "✖️ ➕", "Multiply the Celsius number by 9, divide by 5, then add 32. Fahrenheit to Celsius: take away 32, multiply by 5, divide by 9."],
    ["Example", "10°C", "10 x 9 = 90. 90 ÷ 5 = 18. 18 + 32 = 50. So 10°C is 50°F."]
  ], () => {
    const c = pick([5, 10, 15, 20, 25, 30, 35, 40]), f = c * 9 / 5 + 32;
    if (Math.random() < 0.5) return {
      text: `A city in Asia has a high of ${c}°C. What is that in °F?`, answer: f,
      hints: ["You need to change from Celsius to Fahrenheit.", "Multiply by nine, divide by five, then add thirty-two.", "Example: 45°C. 45 x 9 = 405, 405 ÷ 5 = 81, 81 + 32 = 113°F. Now do yours."]
    };
    return {
      text: `A weather report in the United States says ${f}°F. What is that in °C?`, answer: c,
      hints: ["You need to change from Fahrenheit to Celsius.", "Take away thirty-two first. Then multiply by five and divide by nine.", "Example: 113°F. 113 - 32 = 81, 81 x 5 = 405, 405 ÷ 9 = 45°C. Now do yours."]
    };
  });

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const CLIMO = NUM([
    ["What is a climograph?", "📊 🌡️", "A <b>climograph</b> shows a place's <b>temperature</b> (a line) and <b>rainfall</b> (bars) month by month."],
    ["How to read it", "🔍", "To find the hottest month, look for the highest temperature. To find the wettest month, look for the tallest rain bar. The <b>range</b> is the highest number minus the lowest."],
    ["Example", "Jan 5°, Feb 9°, Mar 7°", "The warmest of these is Feb (9°). The range is 9 - 5 = 4 degrees."]
  ], () => {
    const st = ri(0, 6), ms = MONTHS.slice(st, st + 6);
    const temps = shuf([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28]).slice(0, 6);
    const rain = shuf([10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]).slice(0, 6);
    const tbl = ms.map((m, i) => `<b>${m}</b>: ${temps[i]}°C, ${rain[i]} mm rain`).join("<br>");
    const ix = (arr, fn) => arr.indexOf(fn(...arr));
    const kind = pick(["hot", "cold", "wet", "dry", "range", "diff"]);
    const ch = a => shuf(uniq([ms[a], ...shuf(ms.filter((_, i) => i !== a)).slice(0, 3)]));
    const head = `Here is a city's weather:<br>${tbl}<br>`;
    if (kind === "hot") { const a = ix(temps, Math.max); return { text: head + "Which month is the warmest?", choices: ch(a), answer: ms[a], hints: ["Look only at the temperatures and ignore the rain.", "Find the biggest temperature number. The month beside it is your answer.", "Example: Jan 5°, Feb 9°, Mar 7°. The biggest number is 9, so Feb. Now do yours."] }; }
    if (kind === "cold") { const a = ix(temps, Math.min); return { text: head + "Which month is the coolest?", choices: ch(a), answer: ms[a], hints: ["Look only at the temperatures and ignore the rain.", "Find the smallest temperature number. The month beside it is your answer.", "Example: Jan 5°, Feb 9°, Mar 7°. The smallest number is 5, so Jan. Now do yours."] }; }
    if (kind === "wet") { const a = ix(rain, Math.max); return { text: head + "Which month is the wettest?", choices: ch(a), answer: ms[a], hints: ["Look only at the rain numbers (mm).", "Find the biggest rain number. The month beside it is your answer.", "Example: Jan 30 mm, Feb 80 mm, Mar 50 mm. The biggest is 80, so Feb. Now do yours."] }; }
    if (kind === "dry") { const a = ix(rain, Math.min); return { text: head + "Which month is the driest?", choices: ch(a), answer: ms[a], hints: ["Look only at the rain numbers (mm).", "Find the smallest rain number. The month beside it is your answer.", "Example: Jan 30 mm, Feb 80 mm, Mar 50 mm. The smallest is 30, so Jan. Now do yours."] }; }
    if (kind === "range") return { text: head + "What is the temperature range (highest minus lowest) in °C?", answer: Math.max(...temps) - Math.min(...temps), hints: ["Pick out the highest and lowest temperatures first.", "Subtract the lowest from the highest.", "Example: 5°, 9°, 7°. 9 - 5 = 4. Now do yours."] };
    return { text: head + "How many more mm of rain fell in the wettest month than in the driest month?", answer: Math.max(...rain) - Math.min(...rain), hints: ["Find the wettest and the driest month first.", "Subtract the smallest rain number from the biggest.", "Example: 30 mm, 80 mm, 50 mm. 80 - 30 = 50. Now do yours."] };
  });

  const DEGMIN = NUM([
    ["Degrees and minutes", "🧭 ⏱️", "To name a place exactly, a degree of latitude or longitude is cut into <b>60 minutes</b> (written ′), just like an hour has 60 minutes."],
    ["Reading it", "📍", "<b>40° 30′ N</b> means 40 degrees and 30 minutes north. 30′ is half of a degree."],
    ["Example", "3°", "3 degrees = 3 x 60 = 180 minutes. And at 15′ you need 60 - 15 = 45′ more to reach the next full degree."]
  ], () => {
    const m = Math.random();
    if (m < 0.35) { const d = ri(2, 9); return { text: `How many minutes (′) are there in ${d} degrees?`, answer: d * 60, hints: ["One degree is cut into a fixed number of minutes.", "Multiply the number of degrees by the number of minutes in one degree.", "Example: 12 degrees = 12 x 60 = 720 minutes. Now do yours."] }; }
    if (m < 0.65) { const d = ri(2, 9); return { text: `How many degrees are there in ${d * 60} minutes (′) of latitude?`, answer: d, hints: ["Go the other way. Minutes turn into degrees.", "Divide the minutes by the number of minutes in one degree.", "Example: 720 minutes ÷ 60 = 12 degrees. Now do yours."] }; }
    const dg = ri(10, 60), mi = pick([5, 10, 15, 20, 30, 40, 45, 50]);
    return { text: `A ship is at ${dg}° ${mi}′ N. How many more minutes must it sail north to reach ${dg + 1}° N?`, answer: 60 - mi, hints: ["The next full degree is reached when the minutes get to a full set.", "Take the minutes you have away from a full set of minutes in one degree.", "Example: at 20° 25′ N, you need 60 - 25 = 35′ more to reach 21° N. Now do yours."] };
  });

  const PCTWHOLE = NUM([
    ["Percent of a whole", "🥧", "A <b>percent</b> means 'out of 100'. 50% is a half, 25% is a quarter, 10% is one tenth."],
    ["Three kinds of problem", "🧮", "Part of a total: take that percent of the total. Percent: part ÷ total x 100. Total: divide the part by the percent, then multiply by 100."],
    ["Example", "25% of 400", "A quarter of 400 is 100. If 100 people are 25% of the whole, the whole is 100 x 4 = 400."]
  ], () => {
    const m = Math.random(), T = pick([200, 400, 500, 800, 1000, 2000]), p = pick([10, 20, 25, 50, 75]), part = T * p / 100;
    if (m < 0.4) return { text: `A country has ${fmt(T)} thousand people. ${p}% of them live in cities. How many thousand people live in cities?`, answer: part, hints: ["You want a part of the total.", "Turn the percent into a fraction of the total, then find that fraction of the total.", "Example: 40% of 700 thousand. 10% is 70, so 40% is 4 x 70 = 280 thousand. Now do yours."] };
    if (m < 0.7) return { text: `A country has ${fmt(T)} thousand people. ${fmt(part)} thousand of them live in cities. What percent live in cities?`, answer: p, hints: ["Compare the part with the whole.", "Divide the part by the total, then multiply by one hundred.", "Example: 90 out of 300 is 90 ÷ 300 = 0.3, which is 30%. Now do yours."] };
    return { text: `${fmt(part)} thousand people live in cities. That is ${p}% of the country. How many thousand people live in the whole country?`, answer: T, hints: ["The part you know is a percent of the whole.", "Work out how much 1% is, then find 100%.", "Example: 50% of a country is 330 thousand. 50% is half, so the whole is 2 x 330 = 660 thousand. Now do yours."] };
  });

  const AREASQ = NUM([
    ["Area on a grid map", "🟦", "Some maps use a grid of squares. If each square is 5 km on each side, one square covers 5 x 5 = 25 square kilometers (km²)."],
    ["Finding area", "🧮", "Area of a rectangle = number of squares across x number of squares down x the area of one square."],
    ["Example", "3 by 2 squares, 10 km each", "One square is 10 x 10 = 100 km². There are 3 x 2 = 6 squares. 6 x 100 = 600 km²."]
  ], () => {
    const s = pick([2, 5, 10, 20, 50]), m = Math.random();
    if (m < 0.4) { const l = ri(2, 8), w = ri(2, 6); return { text: `On a grid map, each square is ${s} km by ${s} km. A forest covers a rectangle of ${l} squares by ${w} squares. What is its area in km²?`, answer: l * w * s * s, hints: ["First work out how many squares there are in all.", "Find the area of one square, then multiply by the number of squares.", "Example: 3 by 7 squares, each 4 km by 4 km. 21 squares x 16 = 336 km². Now do yours."] }; }
    if (m < 0.7) { const n = ri(3, 12); return { text: `On a grid map, each square is ${s} km by ${s} km. A lake covers ${n} whole squares. What is the lake's area in km²?`, answer: n * s * s, hints: ["Find the area that one square stands for.", "Multiply one square's area by the number of squares.", "Example: 7 squares, each 3 km by 3 km. One square is 9 km², so 7 x 9 = 63 km². Now do yours."] }; }
    const n = ri(3, 12);
    return { text: `A park covers ${n} squares on a grid map and its real area is ${fmt(n * s * s)} km². How many km² does ONE square stand for?`, answer: s * s, hints: ["The park's area is shared out equally between the squares.", "Divide the real area by the number of squares.", "Example: 6 squares cover 216 km². 216 ÷ 6 = 36 km² for each square. Now do yours."] };
  });

  const MEDIAN = NUM([
    ["Median and mode", "📊", "The <b>median</b> is the middle number when the numbers are lined up from smallest to biggest. The <b>mode</b> is the number that shows up most often."],
    ["How to find them", "🔢", "Put the numbers in order. For an odd list, take the middle one. For an even list, add the two middle numbers and halve. For the mode, find the repeated number."],
    ["Example", "3, 9, 5, 7, 1", "In order: 1, 3, 5, 7, 9. The middle is 5, so the median is 5."]
  ], () => {
    const ctx = pick(["millions of people in cities", "mm of rain in different towns", "hundreds of meters for mountain heights", "degrees at different weather stations"]);
    const pool = shuf(Array.from({ length: 40 }, (_, i) => i + 2)), m = Math.random();
    if (m < 0.4) { const a = pool.slice(0, 5), s = a.slice().sort((x, y) => x - y); return { text: `Here are five numbers (${ctx}): ${a.join(", ")}. What is the median?`, answer: s[2], hints: ["Line the numbers up in order first.", "With five numbers, the median is the one in the very middle.", "Example: 8, 2, 6, 4, 10. In order: 2, 4, 6, 8, 10. The middle is 6. Now do yours."] }; }
    if (m < 0.7) { let a, s; do { a = pool.slice(0, 4); s = a.slice().sort((x, y) => x - y); pool.push(pool.shift()); } while ((s[1] + s[2]) % 2); return { text: `Here are four numbers (${ctx}): ${a.join(", ")}. What is the median?`, answer: (s[1] + s[2]) / 2, hints: ["Line the numbers up in order first. With four numbers there are two in the middle.", "Add the two middle numbers together and then cut the total in half.", "Example: 2, 4, 6, 10. The middle two are 4 and 6. 4 + 6 = 10, and half of 10 is 5. Now do yours."] }; }
    const v = pool[0], o = pool.slice(1, 5), a = shuf([v, v, ...o]);
    return { text: `Here are six numbers (${ctx}): ${a.join(", ")}. Which number is the mode?`, answer: v, hints: ["The mode is about which number shows up most.", "Look for the number that is written more than once.", "Example: 4, 9, 4, 7, 2, 1. The number 4 appears twice, so the mode is 4. Now do yours."] };
  });

  const MILEKM = NUM([
    ["Miles and kilometers", "🛣️", "The United States and the United Kingdom use <b>miles</b> on road signs. Most other countries use <b>kilometers</b>."],
    ["A handy rule", "🔁", "1 mile is about <b>1.6 km</b>. Miles to km: multiply by 1.6 (or multiply by 8 and divide by 5). Km to miles: divide by 1.6."],
    ["Example", "10 miles", "10 x 8 = 80. 80 ÷ 5 = 16. So 10 miles is about 16 km."]
  ], () => {
    const mi = pick([5, 10, 15, 20, 25, 30, 40, 45, 50, 60, 75, 100]), km = mi * 8 / 5, m = Math.random();
    if (m < 0.4) return { text: `A road trip is ${mi} miles. About how many kilometers is that? (Use 1 mile = 1.6 km)`, answer: km, hints: ["A mile is longer than a kilometer, so the number of km will be bigger.", "Multiply the miles by eight, then divide by five.", "Example: 55 miles. 55 x 8 = 440, 440 ÷ 5 = 88 km. Now do yours."] };
    if (m < 0.75) return { text: `A road sign in France says ${km} km to the next city. About how many miles is that? (Use 1 mile = 1.6 km)`, answer: mi, hints: ["Going from km to miles gives a smaller number.", "Multiply the kilometers by five, then divide by eight.", "Example: 88 km. 88 x 5 = 440, 440 ÷ 8 = 55 miles. Now do yours."] };
    const a = pick([5, 10, 15, 20]), b = pick([5, 10, 15, 20, 30]);
    return { text: `A hiker walks ${a} miles on Saturday and ${b} miles on Sunday. About how many kilometers is that in all? (Use 1 mile = 1.6 km)`, answer: (a + b) * 8 / 5, hints: ["Add the two days together first.", "Then change the total from miles to kilometers.", "Example: 30 miles and 25 miles make 55 miles. 55 x 1.6 = 88 km. Now do yours."] };
  });

  const hm = t => { t = ((t % 1440) + 1440) % 1440; return String(Math.floor(t / 60)).padStart(2, "0") + ":" + String(t % 60).padStart(2, "0"); };
  const INDIA = NUM([
    ["A half-hour time zone", "🇮🇳 🕐", "India uses one time for the whole country: <b>UTC +5:30</b>. Most zones are whole hours apart, but India's is a <b>half hour</b> off."],
    ["Doing the math", "➕ ➖", "To get India time from UTC, add 5 hours and 30 minutes. To get UTC from India time, subtract 5 hours and 30 minutes. We write time on the 24-hour clock here."],
    ["Example", "UTC 02:00", "02:00 + 5:30 = 07:30 in India. And 15:00 in India is 15:00 - 5:30 = 09:30 UTC."]
  ], () => {
    const m = Math.random(), offs = [30, -30, 60, -60, 90, -90, 300, -300];
    if (m < 0.35) {
      const t = ri(0, 23) * 60 + pick([0, 0, 30]), c = t + 330, w = shuf(offs).slice(0, 3).map(o => hm(c + o));
      return { text: `It is ${hm(t)} UTC (24-hour clock). What time is it in India?`, choices: shuf([hm(c), ...w]), answer: hm(c), hints: ["India is ahead of UTC, so the time in India is later.", "Add the hours first, then the extra half hour.", "Example: 04:10 UTC. 04:10 + 5:30 = 09:40 in India. Now do yours."] };
    }
    if (m < 0.7) {
      const t = ri(0, 23) * 60 + pick([0, 30]), c = t - 330, w = shuf(offs).slice(0, 3).map(o => hm(c + o));
      return { text: `It is ${hm(t)} in India (24-hour clock). What time is it in UTC?`, choices: shuf([hm(c), ...w]), answer: hm(c), hints: ["UTC is behind India, so the UTC time is earlier.", "Take away five hours first, then the extra half hour.", "Example: 12:20 in India. 12:20 - 5:30 = 06:50 UTC. Now do yours."] };
    }
    const cities = [["Dubai", 240, "UTC +4"], ["Karachi", 300, "UTC +5"], ["Dhaka", 360, "UTC +6"], ["Bangkok", 420, "UTC +7"], ["Moscow", 180, "UTC +3"], ["Tokyo", 540, "UTC +9"]], c = pick(cities);
    return { text: `${c[0]} is on ${c[2]}. India is on UTC +5:30. How many minutes apart are their clocks?`, answer: Math.abs(330 - c[1]), hints: ["Find how far each city is from UTC, then look at the gap between them.", "Subtract the smaller offset from the bigger one, then change hours into minutes.", "Example: UTC +10 and India UTC +5:30. The gap is 4 h 30 min, which is 270 minutes. Now do yours."] };
  });

  const SLOPE = NUM([
    ["How steep is a slope?", "⛰️ 📐", "A slope's steepness is how much the land <b>rises</b> over a certain <b>distance</b>. Geographers call this the <b>gradient</b>."],
    ["Gradient", "➗", "Gradient = rise ÷ distance. For example, a path that climbs 300 m over 3 km rises 300 ÷ 3 = 100 m for every km."],
    ["Example", "400 m over 4 km", "400 ÷ 4 = 100 m of rise for each km. A bigger number means a steeper slope."]
  ], () => {
    const d = ri(2, 9), g = pick([20, 25, 30, 40, 50, 60, 75, 100, 150, 200]), r = g * d, m = Math.random();
    if (m < 0.4) return { text: `A river valley path climbs ${fmt(r)} m over a distance of ${d} km. How many meters does it rise for each km?`, answer: g, hints: ["You want the rise for just one kilometer.", "Divide the total rise by the distance in km.", "Example: 560 m over 4 km. 560 ÷ 4 = 140 m for each km. Now do yours."] };
    if (m < 0.75) return { text: `A mountain road rises ${g} m for every km. How many meters high does it climb in ${d} km?`, answer: r, hints: ["Each km adds the same height.", "Multiply the rise for one km by the number of km.", "Example: 35 m for every km, over 6 km. 35 x 6 = 210 m. Now do yours."] };
    return { text: `A trail rises ${g} m for every km. It climbs ${fmt(r)} m in total. How many km long is the trail?`, answer: d, hints: ["Think about how many km you need to add up to the total rise.", "Divide the total rise by the rise for each km.", "Example: 45 m for every km and 270 m in total. 270 ÷ 45 = 6 km. Now do yours."] };
  });

  const MONEY = NUM([
    ["Exchange rates", "💱", "Each country has its own money. An <b>exchange rate</b> says how much of one money you get for another."],
    ["Using a rate", "🧮", "Suppose 1 dollar buys 5 pesos. To change dollars to pesos, <b>multiply</b> by 5. To change pesos to dollars, <b>divide</b> by 5."],
    ["Example", "1 dollar = 5 pesos", "6 dollars = 6 x 5 = 30 pesos. A 40-peso snack costs 40 ÷ 5 = 8 dollars."]
  ], () => {
    const r = pick([2, 3, 4, 5, 6, 8, 10, 12, 15, 20]), d = pick([2, 3, 4, 5, 8, 10, 20, 25]), cur = pick(["pesos", "rupees", "yuan", "krona"]), m = Math.random();
    if (m < 0.35) return { text: `Suppose 1 dollar buys ${r} ${cur}. How many ${cur} do you get for ${d} dollars?`, answer: r * d, hints: ["You are changing dollars into the other money.", "Multiply the dollars by the number of coins one dollar buys.", "Example: 1 dollar = 7 pesos. 9 dollars = 9 x 7 = 63 pesos. Now do yours."] };
    if (m < 0.7) return { text: `Suppose 1 dollar buys ${r} ${cur}. A souvenir costs ${fmt(r * d)} ${cur}. How many dollars is that?`, answer: d, hints: ["You are changing the other money back into dollars.", "Divide the price by the number of coins one dollar buys.", "Example: 1 dollar = 7 pesos. A 42-peso toy costs 42 ÷ 7 = 6 dollars. Now do yours."] };
    const e = pick([2, 3, 4, 5, 10].filter(x => x !== d));
    return { text: `Suppose 1 dollar buys ${r} ${cur}. One gift costs ${fmt(r * d)} ${cur} and another costs ${fmt(r * e)} ${cur}. How many dollars do the two gifts cost together?`, answer: d + e, hints: ["You can change each price to dollars, or add first.", "Add the two prices, then divide by the number of coins one dollar buys.", "Example: 1 dollar = 7 pesos. Gifts of 14 and 21 pesos make 35 pesos, which is 35 ÷ 7 = 5 dollars. Now do yours."] };
  });

  // ================= LEVEL 13 : 6th grade, first half =================
  const l13 = [
    LS("Five themes of geography", MC([
      ["Five themes", "🧩 🌍", "Geographers use <b>five themes</b> to study the world: <b>Location</b>, <b>Place</b>, <b>Human-Environment Interaction</b>, <b>Movement</b> and <b>Region</b>."],
      ["What each one asks", "❓", "<b>Location</b>: where is it? <b>Place</b>: what is it like? <b>Interaction</b>: how do people and nature affect each other? <b>Movement</b>: how do people, goods and ideas travel? <b>Region</b>: which places share something?"],
      ["Example", "🌾", "A farmer building terraces on a hill is <b>Human-Environment Interaction</b>. A ship carrying goods across the ocean is <b>Movement</b>."]],
      "Think about which question the sentence is really asking.", "Match the idea to one of the five themes: location, place, interaction, movement or region.",
      [["Telling where a town is using latitude and longitude is the theme of...", "Location", "Movement|Region"], ["Describing a place's climate, landforms and people is the theme of...", "Place", "Location|Movement"],
       ["Building a dam on a river is an example of...", "Human-Environment Interaction", "Movement|Region"], ["Goods, people and ideas traveling from place to place is the theme of...", "Movement", "Place|Location"],
       ["An area that shares something in common, like a desert or a language, is a...", "Region", "Movement|Location"], ["Cutting terraces into a steep hillside for farming shows...", "Human-Environment Interaction", "Location|Region"],
       ["A ship carrying cars across the ocean shows...", "Movement", "Region|Place"], ["The Corn Belt is a part of the United States where lots of corn is grown. It is an example of a...", "Region", "Location|Movement"],
       ["Saying the school is next to the park uses which theme?", "Location", "Place|Human-Environment Interaction"], ["Planting trees to stop soil washing away shows...", "Human-Environment Interaction", "Place|Movement"]])),
    LS("Ancient river valleys", MC([
      ["Rivers and early cities", "🌊 🏛️", "Some of the first big civilizations grew in <b>river valleys</b>: the <b>Nile</b> in Egypt, the <b>Tigris and Euphrates</b> in Mesopotamia, the <b>Indus</b> in South Asia and the <b>Yellow River</b> in China."],
      ["Why rivers?", "🌾", "Rivers gave water to drink, <b>silt</b> (rich soil) for crops, fish, and a way to travel and trade."],
      ["Remember", "💡", "<b>Mesopotamia</b> means 'between the rivers'. It was mostly in what is now Iraq. The Nile flows <b>north</b> to the Mediterranean Sea."]],
      "Think about which river valley each early civilization used.", "Rivers gave early farmers water, rich soil and a way to travel.",
      [["Ancient Egypt grew up along which river?", "The Nile", "The Indus|The Yellow River"], ["Mesopotamia was the land between which two rivers?", "The Tigris and the Euphrates", "The Nile and the Congo|The Indus and the Ganges"],
       ["The Indus Valley civilization was along a river that flows mostly through which modern country?", "Pakistan", "Egypt|Iraq"], ["An early Chinese civilization grew along which river?", "The Yellow River", "The Nile|The Euphrates"],
       ["Each year the Nile flooded and left behind rich soil called...", "Silt", "Sand dunes|Salt"], ["Most of Mesopotamia is in which modern country?", "Iraq", "Egypt|China"],
       ["Which direction does the Nile flow?", "North", "South|West"], ["Which is a reason early cities grew near rivers?", "Water for crops and drinking", "Rivers kept out all visitors|Rivers made the land dry"],
       ["The Yellow River flows through which modern country?", "China", "India|Egypt"], ["The Nile flows into which sea?", "The Mediterranean Sea", "The Red Sea|The Arabian Sea"]])),
    LS("Capitals: Southwest Asia", PAIR([["Egypt", "Cairo", "🇪🇬"], ["Iraq", "Baghdad", "🇮🇶"], ["Iran", "Tehran", "🇮🇷"], ["Turkey", "Ankara", "🇹🇷"], ["Saudi Arabia", "Riyadh", "🇸🇦"], ["Jordan", "Amman", "🇯🇴"], ["Syria", "Damascus", "🇸🇾"], ["Lebanon", "Beirut", "🇱🇧"], ["Qatar", "Doha", "🇶🇦"], ["Oman", "Muscat", "🇴🇲"], ["Kuwait", "Kuwait City", "🇰🇼"], ["United Arab Emirates", "Abu Dhabi", "🇦🇪"]], {
      title: "Capitals: Southwest Asia", tv: "🕌 🏜️", intro: "Southwest Asia (the Middle East) is where Africa, Europe and Asia meet. Let's learn the capital cities of some of its countries.",
      n: "Think about the list of countries and their capitals from the lesson.", f: c => `What is the capital of ${c}?`, r: c => `${c} is the capital of which country?`,
      tip: "Turkey's capital is Ankara, not Istanbul (its biggest city). Egypt's Cairo is on the Nile."
    })),
    LS("Latin America", MC([
      ["What is Latin America?", "🌎 💃", "<b>Latin America</b> is the part of North and South America where most people speak <b>Spanish</b> or <b>Portuguese</b>. It starts at Mexico and goes down to the tip of South America."],
      ["Big facts", "📌", "<b>Brazil</b> is the biggest country (Portuguese, capital <b>Brasília</b>). <b>Mexico</b> speaks Spanish. <b>Argentina</b>: Buenos Aires. <b>Chile</b>: Santiago. <b>Peru</b>: Lima. <b>Colombia</b>: Bogotá."],
      ["Landmarks", "🏔️", "The <b>Andes</b> run along the west of South America. <b>Machu Picchu</b> in Peru was built by the Inca. The <b>Panama Canal</b> joins the Atlantic and Pacific."]],
      "Think about the countries and facts in the lesson.", "Remember: Brazil speaks Portuguese, and most other Latin American countries speak Spanish.",
      [["Which language do most people in Brazil speak?", "Portuguese", "Spanish|French"], ["What is the capital of Brazil?", "Brasília", "Rio de Janeiro|São Paulo"], ["What is the capital of Argentina?", "Buenos Aires", "Lima|Santiago"],
       ["What is the capital of Chile?", "Santiago", "Bogotá|Lima"], ["Machu Picchu is in which country?", "Peru", "Mexico|Chile"], ["Which mountains run along the west coast of South America?", "The Andes", "The Alps|The Rockies"],
       ["The Panama Canal joins which two oceans?", "The Atlantic and the Pacific", "The Pacific and the Indian|The Arctic and the Atlantic"], ["What is the capital of Colombia?", "Bogotá", "Lima|Caracas"],
       ["Which is the largest country in South America?", "Brazil", "Argentina|Peru"], ["The largest island in the Caribbean Sea is...", "Cuba", "Jamaica|Puerto Rico"]])),
    LS("Russia and Central Asia", MC([
      ["The biggest country", "🇷🇺 ❄️", "<b>Russia</b> is the largest country in the world. It stretches over <b>11 time zones</b> from Europe to the Pacific. Its capital is <b>Moscow</b>. <b>Siberia</b>, in the east, is huge and very cold."],
      ["Land and water", "🏞️", "The <b>Ural Mountains</b> mark the border between Europe and Asia. <b>Lake Baikal</b> in Siberia is the deepest lake on Earth. The <b>Volga</b> is Europe's longest river. The <b>Trans-Siberian Railway</b> crosses the country."],
      ["Central Asia", "🐪", "<b>Kazakhstan</b> is the largest landlocked country; its capital is <b>Astana</b>. <b>Uzbekistan</b>'s capital is <b>Tashkent</b>. The <b>Caspian Sea</b> is the world's largest inland body of water."]],
      "Think about the big facts about Russia and its neighbors.", "Remember the biggest, deepest and longest facts from the lesson.",
      [["Which is the largest country in the world?", "Russia", "China|Canada"], ["What is the capital of Russia?", "Moscow", "Saint Petersburg|Kyiv"], ["Which lake is the deepest on Earth?", "Lake Baikal", "Lake Superior|Lake Victoria"],
       ["The Ural Mountains separate which two continents?", "Europe and Asia", "Asia and Africa|Europe and Africa"], ["The cold, huge region in eastern Russia is called...", "Siberia", "The Sahel|The Outback"], ["Which is the longest river in Europe?", "The Volga", "The Rhine|The Seine"],
       ["Which is the largest landlocked country?", "Kazakhstan", "Mongolia|Switzerland"], ["What is the capital of Kazakhstan?", "Astana", "Tashkent|Moscow"], ["What is the capital of Uzbekistan?", "Tashkent", "Astana|Baku"],
       ["How many time zones does Russia cross?", "11", "5|3"]])),
    LS("Birth rate and death rate", NATINC),
    LS("Developed and developing", MC([
      ["Measuring a country", "📊", "<b>GDP</b> (Gross Domestic Product) is the total value of goods and services a country makes in a year. <b>GDP per person</b> is GDP divided by the number of people."],
      ["Quality of life", "🏥 📚", "Other signs: <b>life expectancy</b> (how long people are expected to live) and <b>literacy rate</b> (the percent of people who can read and write)."],
      ["Two groups", "🏭 🌾", "Countries with high incomes, many factories and services are called <b>more developed</b>. Countries still building schools, roads and industries are <b>developing</b>."]],
      "Think about what each word means.", "GDP is about money made. Life expectancy is about years. Literacy is about reading.",
      [["GDP measures...", "The value of goods and services a country makes in a year", "How many people live in the country|How tall its mountains are"], ["GDP per person is found by...", "Dividing GDP by the population", "Adding GDP to the population|Multiplying GDP by area"],
       ["Life expectancy is...", "How long people are expected to live on average", "How tall people grow|How many babies are born"], ["The literacy rate is the percent of people who...", "Can read and write", "Live in cities|Have a job"],
       ["A country with high incomes and many factories and services is called...", "More developed", "Landlocked|Rural"], ["A country that is still building schools, roads and industries is...", "Developing", "Finished|Empty"],
       ["Building more schools would most help raise the...", "Literacy rate", "Height of mountains|Size of the country"], ["Clean water and good hospitals can raise a country's...", "Life expectancy", "Area|Latitude"],
       ["Which is a measure of how much money a country makes?", "GDP", "Latitude|Literacy"], ["If GDP is big but there are very many people, GDP per person can be...", "Small", "Impossible to find|Always large"]])),
    LS("Cities that keep growing", MC([
      ["Urbanization", "🏙️ 📈", "<b>Urbanization</b> means more and more people living in cities. Since about 2007, more than half of the world's people live in <b>urban</b> areas. The countryside is <b>rural</b>."],
      ["Why cities grow", "🚆", "People move to cities for jobs, schools and hospitals. Fast growth can cause crowding, traffic, pollution and not enough homes."],
      ["Megacities", "🌆", "A <b>megacity</b> has <b>10 million</b> people or more. Examples: Tokyo, Delhi, Shanghai, São Paulo, Mexico City, Cairo and Mumbai."]],
      "Think about what makes a city grow and what problems it brings.", "A megacity is a very big city. Urban means city, rural means countryside.",
      [["A megacity has at least how many people?", "10 million", "1 million|100,000"], ["Urbanization means...", "More people living in cities", "More farms in the countryside|People moving to the poles"], ["Urban means...", "Having to do with cities", "Having to do with farms|Having to do with oceans"],
       ["Rural areas are...", "The countryside", "The center of a big city|Under the sea"], ["Which is a problem of fast-growing cities?", "Crowding and traffic", "Too many empty mountains|Too much desert"], ["Why do many people move to cities?", "For jobs, schools and hospitals", "To get away from all buildings|To live far from shops"],
       ["Mexico City is in which country?", "Mexico", "Spain|Brazil"], ["São Paulo is a megacity in which country?", "Brazil", "Portugal|Chile"], ["Mumbai and Delhi are big cities in which country?", "India", "Pakistan|Egypt"], ["Cairo, a very large city, is in which country?", "Egypt", "Iraq|Turkey"]])),
    LS("Percent change in population", PCTCH),
    LS("Celsius and Fahrenheit", TEMPC),
    LS("Reading a climograph", CLIMO),
    LS("Natural hazards", MC([
      ["Hazards from nature", "🌪️ 🌊", "A <b>natural hazard</b> is something in nature that can hurt people or damage property. Some come from weather, some from the ground, some from water."],
      ["Weather and water", "🌧️", "A <b>flood</b> is when water covers dry land. A <b>drought</b> is a long time with very little rain. A <b>tornado</b> is a spinning funnel of air that touches the ground. A <b>blizzard</b> is a heavy snowstorm with strong wind."],
      ["Ground and sea", "🏔️", "A <b>tsunami</b> is a giant wave, often caused by an undersea earthquake. A <b>landslide</b> is when a slope slides down, often after heavy rain. Being ready and having a safety plan keeps people safe."]],
      "Think about the cause of each hazard.", "Match each name to what it does: water, wind, snow, or moving ground.",
      [["A long time with very little rain is a...", "Drought", "Flood|Tornado"], ["When a river overflows and covers dry land, it is a...", "Flood", "Drought|Blizzard"], ["A spinning funnel of air that touches the ground is a...", "Tornado", "Tsunami|Landslide"],
       ["A giant ocean wave often caused by an undersea earthquake is a...", "Tsunami", "Blizzard|Drought"], ["A heavy snowstorm with strong wind is a...", "Blizzard", "Flood|Tornado"], ["Heavy rain can cause soil and rocks on a slope to slide in a...", "Landslide", "Drought|Blizzard"],
       ["The part of the central United States with many tornadoes is nicknamed...", "Tornado Alley", "Snow Valley|Flood Plain"], ["A wildfire spreads fastest in weather that is...", "Dry, hot and windy", "Cold and wet|Calm and snowy"], ["During a tornado warning, the safest place in a house is...", "The lowest floor, away from windows", "Next to a window|Outside on the porch"],
       ["A natural hazard is something in nature that can...", "Hurt people or damage property", "Make maps|Change the compass"]])),
    LS("Deforestation and desertification", MC([
      ["Losing forests", "🌳 🪓", "<b>Deforestation</b> is cutting down or clearing large areas of forest. People clear land for farms, wood, roads and cities."],
      ["Why it matters", "🐒", "Animals lose their <b>habitat</b>, soil can wash away, and fewer trees are left to take in carbon dioxide from the air."],
      ["Land turning to desert", "🏜️", "<b>Desertification</b> is when dry but useful land becomes desert. Causes include drought, too many animals eating the plants (overgrazing) and poor farming. <b>Reforestation</b> means planting trees again."]],
      "Think about causes and solutions for each problem.", "Deforestation is about trees. Desertification is about land turning dry.",
      [["Clearing large areas of forest is called...", "Deforestation", "Reforestation|Irrigation"], ["Planting trees where forest was lost is called...", "Reforestation", "Deforestation|Erosion"], ["Dry but useful land turning into desert is called...", "Desertification", "Deforestation|Urbanization"],
       ["Which can cause deforestation?", "Clearing land for farms and roads", "Planting new trees|Heavy snow"], ["When forests are cleared, animals lose their...", "Habitat", "Latitude|Rivers"], ["Which can lead to desertification?", "Overgrazing and drought", "Plenty of rain|Planting trees"],
       ["Which rainforest is the largest in the world?", "The Amazon", "The Congo|The Daintree"], ["Trees take in which gas from the air?", "Carbon dioxide", "Helium|Neon"], ["Which helps stop soil washing away from a hillside?", "Planting trees and grass", "Cutting all the plants|Paving the soil"],
       ["The Aral Sea shrank mostly because water from its rivers was used for...", "Irrigation", "Making snow|Drinking by animals only"]])),
    LS("Lakes of the world", MC([
      ["Giant lakes", "🏞️", "The <b>Caspian Sea</b> is the largest lake in the world (it is salty). <b>Lake Superior</b> in North America is the largest freshwater lake by area. <b>Lake Baikal</b> in Russia is the deepest."],
      ["Africa and South America", "🌍", "<b>Lake Victoria</b> is Africa's largest lake, shared by Uganda, Kenya and Tanzania. <b>Lake Titicaca</b> lies high in the Andes between Peru and Bolivia."],
      ["Salt lakes", "🧂", "The <b>Dead Sea</b> is very salty and its shore is the lowest dry land on Earth. The <b>Great Salt Lake</b> is in Utah, USA."]],
      "Think about size, depth or saltiness of each lake.", "Remember where each lake is and what makes it special.",
      [["Which is the largest lake in the world by area?", "The Caspian Sea", "Lake Superior|Lake Victoria"], ["Which is the largest freshwater lake by area?", "Lake Superior", "Lake Baikal|Lake Titicaca"], ["Which lake is the deepest on Earth?", "Lake Baikal", "Lake Victoria|The Dead Sea"],
       ["Africa's largest lake is...", "Lake Victoria", "Lake Superior|Lake Titicaca"], ["Lake Titicaca lies between which two countries?", "Peru and Bolivia", "Chile and Argentina|Kenya and Uganda"], ["The Dead Sea is famous for being very...", "Salty", "Deep|Cold"],
       ["The Great Salt Lake is in which US state?", "Utah", "Texas|Florida"], ["Lake Victoria is bordered by Uganda, Kenya and...", "Tanzania", "Egypt|Zambia"], ["Which lake is in the Andes mountains?", "Lake Titicaca", "Lake Baikal|Lake Victoria"], ["The shore of the Dead Sea is...", "The lowest dry land on Earth", "The highest land in Asia|Part of the Arctic"]])),
    LS("How culture spreads", MC([
      ["Cultural diffusion", "🔄 🍕", "<b>Cultural diffusion</b> is when ideas, foods, words, music and customs spread from one place to another."],
      ["How it spreads", "✈️ 🌐", "Culture spreads by <b>trade</b>, <b>migration</b> (people moving), <b>travel</b>, and today by the <b>internet</b>, TV and music."],
      ["Examples", "🥁", "Paper was invented in China and spread west. The numbers we use (0 to 9) came from India and spread through Arab traders. A <b>cultural hearth</b> is a place where a culture began and then spread."]],
      "Think about how ideas and customs travel between places.", "Spread means moving from where it started to new places.",
      [["Cultural diffusion means...", "Ideas and customs spreading from place to place", "A country making new borders|Rivers changing course"], ["Which way helps culture spread?", "Trade and travel", "Staying in one place always|Building walls only"], ["Paper was first invented in...", "China", "Brazil|Canada"],
       ["The number system we use (0 to 9) came to Europe from...", "India, through Arab traders", "Antarctica|The Pacific islands"], ["A place where a culture began and spread from is a...", "Cultural hearth", "Climate zone|Time zone"], ["When people move to a new country, they often bring their...", "Food, music and customs", "Mountains|Climate"],
       ["The internet helps culture spread...", "Very quickly", "Only by ship|Not at all"], ["Pizza began in Italy. Eating it all over the world is an example of...", "Cultural diffusion", "Deforestation|Erosion"], ["Coffee first came from the highlands of...", "Ethiopia", "Iceland|Canada"], ["Moving from one country to live in another is called...", "Migration", "Erosion|Irrigation"]])),
    LS("Kinds of government", MC([
      ["Who makes the rules?", "🏛️ 🗳️", "A <b>government</b> makes laws and runs a country. Countries have different kinds of governments."],
      ["Kinds", "👑", "In a <b>democracy</b> the people vote for their leaders. In a <b>monarchy</b> a king or queen rules. In a <b>dictatorship</b> one person holds all the power. A <b>republic</b> has elected leaders who act for the people."],
      ["Rule books", "📜", "A <b>constitution</b> is a country's set of basic rules. In a <b>constitutional monarchy</b>, like the United Kingdom or Japan, the king, queen or emperor has limited powers and elected leaders run the government."]],
      "Think about who holds the power.", "Democracy means people vote. Monarchy means a king or queen.",
      [["In a democracy, the leaders are chosen by...", "The people, by voting", "One ruler only|The oldest person"], ["A country ruled by a king or queen is a...", "Monarchy", "Republic|Democracy"], ["When one person holds all the power, it is a...", "Dictatorship", "Democracy|Constitution"],
       ["A set of basic rules for how a country is run is a...", "Constitution", "Climate|Border"], ["A republic has...", "Elected leaders who act for the people", "No laws at all|Only one family ruling"], ["The United Kingdom has a king or queen and an elected government. This is a...", "Constitutional monarchy", "Dictatorship|Desert"],
       ["Voting is a key part of which kind of government?", "Democracy", "Dictatorship|Absolute monarchy"], ["A government's job includes...", "Making laws and running the country", "Making rain|Moving the continents"], ["Which country is a constitutional monarchy with an emperor?", "Japan", "Brazil|Mexico"], ["A person who rules a monarchy is a...", "Monarch", "Voter|Mayor"]])),
    LS("East Asia", MC([
      ["The countries", "🏯 🗻", "<b>China</b> (capital Beijing) is the biggest. <b>Japan</b> (Tokyo) is a chain of islands. <b>South Korea</b> (Seoul), <b>North Korea</b> (Pyongyang) and <b>Mongolia</b> (Ulaanbaatar) are nearby."],
      ["Land and water", "🌊", "The <b>Yangtze</b> is the longest river in Asia. The <b>Gobi Desert</b> lies in Mongolia and China. Japan's main islands are <b>Hokkaido, Honshu, Shikoku and Kyushu</b>. <b>Mount Fuji</b> is Japan's highest mountain."],
      ["Seas", "🌏", "The <b>Sea of Japan</b> lies between Japan and the mainland. The <b>Yellow Sea</b> lies between China and Korea. The <b>Great Wall</b> is in China."]],
      "Think about the capitals, rivers and seas of East Asia.", "Remember each country and its capital from the lesson.",
      [["What is the capital of China?", "Beijing", "Shanghai|Seoul"], ["What is the capital of Japan?", "Tokyo", "Osaka|Beijing"], ["What is the capital of South Korea?", "Seoul", "Tokyo|Pyongyang"], ["What is the capital of Mongolia?", "Ulaanbaatar", "Beijing|Seoul"],
       ["The longest river in Asia is the...", "Yangtze", "Mekong|Ganges"], ["The desert in Mongolia and China is the...", "Gobi", "Sahara|Thar"], ["Japan's highest mountain is...", "Mount Fuji", "Mount Everest|Mount Kilimanjaro"], ["The largest of Japan's main islands is...", "Honshu", "Hokkaido|Kyushu"],
       ["The sea between Japan and the Asian mainland is the Sea of...", "Japan", "China|Korea"], ["The Great Wall is in which country?", "China", "Japan|Mongolia"]])),
    LS("Earth by the numbers", MC([
      ["Size and shape", "🌍 📏", "Earth is almost a ball. It is about <b>12,700 km</b> across and about <b>40,000 km</b> around the Equator."],
      ["Land and water", "🌊", "About <b>71%</b> of Earth's surface is water and about <b>29%</b> is land. The tallest mountain, Everest, is about <b>8,800 m</b> high. The deepest part of the ocean, the Mariana Trench, is about <b>11,000 m</b> deep."],
      ["Time and distance", "⏳ ☀️", "Earth is about <b>4.5 billion</b> years old. It is about <b>150 million km</b> from the Sun. It spins once in about 24 hours and goes around the Sun in about 365 days."]],
      "Think about the big numbers from the lesson.", "Remember the numbers for distance around, percent of water, and age.",
      [["About how far is it around Earth at the Equator?", "40,000 km", "4,000 km|400,000 km"], ["About what percent of Earth's surface is water?", "71%", "29%|50%"], ["About what percent of Earth's surface is land?", "29%", "71%|10%"],
       ["About how old is Earth?", "4.5 billion years", "4.5 million years|450 years"], ["About how long does Earth take to go around the Sun?", "365 days", "24 hours|30 days"], ["About how long does Earth take to spin once?", "24 hours", "365 days|1 hour"],
       ["About how far is Earth from the Sun?", "150 million km", "150 thousand km|1.5 billion km"], ["The Mariana Trench is about how deep?", "11,000 m", "1,100 m|110 m"], ["Mount Everest is about how high?", "8,800 m", "880 m|88,000 m"], ["About how far is it straight through Earth, from side to side?", "12,700 km", "127 km|127,000 km"]])),
  ];
  l13.push(LS("Mixed practice", MX(l13, [0, 1, 2, 3, 4, 7, 11, 12, 16, 17])));
  l13.push(LS("Level 13 Challenge", MX(l13, [5, 6, 8, 9, 10, 13, 14, 15, 16, 17, 2, 4])));

  // ================= LEVEL 14 : 6th grade, second half =================
  const l14 = [
    LS("The European Union", MC([
      ["A club of countries", "🇪🇺", "The <b>European Union (EU)</b> is a group of European countries that work together. Their people and goods can move between member countries easily."],
      ["Money and travel", "💶", "Many EU countries use one money, the <b>euro</b>. Many let people cross borders without passport checks. Much of the EU's work happens in <b>Brussels</b>, Belgium."],
      ["Facts", "📌", "<b>Germany</b> has the most people in the EU. <b>France</b> is the biggest EU country by area. The <b>United Kingdom</b> left the EU in 2020. <b>Norway</b> and <b>Switzerland</b> are not members."]],
      "Think about what the EU is and which countries are in it.", "The EU is a group of European countries. Think about money, travel and cities.",
      [["The European Union is...", "A group of European countries that work together", "One huge country|A river in Europe"], ["Much of the EU's work happens in which city?", "Brussels", "Madrid|Warsaw"], ["The money used by many EU countries is the...", "Euro", "Dollar|Pound"],
       ["Which EU country has the most people?", "Germany", "Portugal|Ireland"], ["Which country left the EU in 2020?", "The United Kingdom", "France|Italy"], ["Which of these is NOT in the EU?", "Norway", "France|Italy"],
       ["Which of these countries uses the euro?", "Spain", "Denmark|Poland"], ["Brussels is the capital of which country?", "Belgium", "Netherlands|Luxembourg"], ["Which is the largest EU country by area?", "France", "Greece|Austria"], ["A big plus of the EU is that goods and people can...", "Move easily between member countries", "Never cross borders|Only travel by train"]])),
    LS("Greece and Rome", MC([
      ["The land of Greece", "🏛️ ⛵", "Greece is a mountainous <b>peninsula</b> with thousands of islands in the <b>Aegean Sea</b>. Mountains kept communities apart, so each city, like <b>Athens</b> or <b>Sparta</b>, became its own city-state."],
      ["Sea power", "🌊", "The sea was the easiest road. Greeks sailed to trade and start colonies. <b>Crete</b> is the largest Greek island. <b>Mount Olympus</b> is Greece's highest mountain."],
      ["Rome", "🏺", "<b>Rome</b> grew on the <b>Tiber River</b> in Italy, a boot-shaped peninsula. Its empire spread all around the <b>Mediterranean Sea</b>, linked by roads. The <b>Alps</b> are north of Italy. <b>Sicily</b> is the Mediterranean's largest island."]],
      "Think about how land and sea shaped these places.", "Both Greece and Italy are peninsulas that stick out into the Mediterranean.",
      [["Why did ancient Greece have many separate city-states?", "Mountains kept communities apart", "It had no sea|It was flat desert"], ["Athens and Sparta were...", "Greek city-states", "Italian rivers|Roman roads"], ["Greece sits on a...", "Peninsula with many islands", "Giant desert|Frozen plain"],
       ["The sea next to Greece with thousands of islands is the...", "Aegean Sea", "Red Sea|Baltic Sea"], ["The highest mountain in Greece is...", "Mount Olympus", "Mount Fuji|Mount Etna"], ["Rome was built on which river?", "The Tiber", "The Nile|The Seine"],
       ["Italy is shaped like a...", "Boot", "Circle|Star"], ["Which mountains lie north of Italy?", "The Alps", "The Andes|The Urals"], ["The largest island in the Mediterranean Sea is...", "Sicily", "Crete|Cyprus"], ["The Roman Empire was built around which sea?", "The Mediterranean Sea", "The Arctic Ocean|The Baltic Sea"]])),
    LS("Trade routes", MC([
      ["The Silk Road", "🐪 🧵", "The <b>Silk Road</b> was a web of land routes joining <b>China</b> to the Mediterranean. Traders carried silk, spices and ideas on camels, passing through deserts and oasis towns."],
      ["By sea", "⛵ 🌬️", "Ships crossed the <b>Indian Ocean</b> carrying spices from India and Southeast Asia. Sailors used the seasonal <b>monsoon winds</b> to sail one way and then back."],
      ["Across the Sahara", "🧂 🪙", "In Africa, camel caravans carried <b>salt</b> and <b>gold</b> across the Sahara. <b>Timbuktu</b> grew into a rich trading city on the edge of the desert."]],
      "Think about what was traded and how it traveled.", "Trade routes joined far-away places by land and by sea.",
      [["The Silk Road joined China to which region?", "The Mediterranean", "Antarctica|South America"], ["Traders crossed deserts on the Silk Road mostly using...", "Camels", "Trains|Airplanes"], ["Which was a main product carried on the Silk Road?", "Silk", "Plastic|Oil"],
       ["Sailors in the Indian Ocean used which seasonal winds?", "Monsoon winds", "Jet streams|Land breezes"], ["Camel caravans across the Sahara carried gold and...", "Salt", "Snow|Cars"], ["Which city grew rich on Sahara trade?", "Timbuktu", "Sydney|Oslo"],
       ["An oasis town was important because it had...", "Water in the desert", "Snow in summer|Mountains of ice"], ["Spices came mainly from India and...", "Southeast Asia", "Greenland|Iceland"], ["Besides goods, trade routes also spread...", "Ideas and religions", "Only weather|Only rocks"], ["Which ocean did monsoon trading ships cross?", "The Indian Ocean", "The Arctic Ocean|The Southern Ocean"]])),
    LS("Great explorers", MC([
      ["Voyages that changed maps", "🧭 ⛵", "Explorers sailed to learn new routes and places. Their voyages changed maps. Many of the places they reached were already home to people."],
      ["Famous trips", "🗺️", "<b>Columbus</b> sailed west from Spain in <b>1492</b> and reached the Caribbean. <b>Vasco da Gama</b> sailed around Africa to India in 1498. <b>Magellan</b>'s expedition (1519-1522) was the first to sail all the way around the world."],
      ["More explorers", "🏔️", "<b>Marco Polo</b> traveled to China along the Silk Road. <b>Lewis and Clark</b> explored the western United States (from 1804). <b>Amundsen</b> reached the South Pole in 1911. <b>Hillary and Tenzing</b> climbed Mount Everest in 1953."]],
      "Think about who went where, and when.", "Match each explorer to the place or the trip you learned.",
      [["Which explorer sailed west from Spain in 1492 and reached the Caribbean?", "Columbus", "Magellan|Marco Polo"], ["Whose expedition was the first to sail around the world?", "Magellan's", "Columbus's|Lewis and Clark's"], ["Vasco da Gama sailed around Africa to reach...", "India", "Australia|Canada"],
       ["Who traveled to China along the Silk Road?", "Marco Polo", "Columbus|Amundsen"], ["Lewis and Clark explored...", "The western United States", "Antarctica|South Africa"], ["Amundsen was the first to reach the...", "South Pole", "Top of Everest|Bottom of the sea"],
       ["Hillary and Tenzing Norgay climbed...", "Mount Everest", "Mount Fuji|The Alps"], ["In which year did Columbus first sail across the Atlantic?", "1492", "1692|1392"], ["Magellan's voyage is famous because it...", "Went all the way around the world", "Reached the Moon|Crossed the Sahara"], ["The name for a person who travels to learn about new places is an...", "Explorer", "Mayor|Farmer"]])),
    LS("Minerals and metals", MC([
      ["Treasures in the ground", "⛏️", "<b>Minerals</b> are solid natural materials found in the ground. <b>Mining</b> is taking them out of the earth. Some give us metals."],
      ["Metals", "🔩 ⚙️", "<b>Iron ore</b> makes iron and steel (Australia and Brazil have a lot). <b>Copper</b> is used in wires (Chile is a leading producer). <b>Bauxite</b> makes aluminum."],
      ["Fuels", "🛢️", "<b>Coal</b>, <b>oil</b> and <b>natural gas</b> are fuels from the ground. <b>China</b> mines the most coal. <b>Saudi Arabia</b> is famous for its oil."]],
      "Think about what each material is used for.", "Match each ore or fuel to the thing made from it or the country known for it.",
      [["Steel is made mostly from...", "Iron", "Aluminum|Gold"], ["Aluminum is made from an ore called...", "Bauxite", "Coal|Granite"], ["Copper is often used to make...", "Electric wires", "Glass|Paper"],
       ["Which country is a leading copper producer?", "Chile", "Iceland|Norway"], ["Which country is famous for its oil?", "Saudi Arabia", "Ireland|Nepal"], ["Which country mines the most coal?", "China", "Greenland|Portugal"],
       ["Taking minerals out of the earth is called...", "Mining", "Farming|Planting"], ["Coal, oil and natural gas are...", "Fuels from the ground", "Kinds of cloud|Kinds of wind"], ["Which country is a big producer of iron ore?", "Australia", "Finland|Cuba"], ["Which of these is a metal?", "Copper", "Sand|Water"]])),
    LS("Crops and where they grow", MC([
      ["Crops need the right place", "🌾 ☕", "Each crop grows best with the right climate. Coffee, cocoa and bananas like warm, wet <b>tropical</b> places. Wheat likes cooler, drier grasslands. Rice grows in flooded fields called <b>paddies</b>."],
      ["Leaders", "🌍", "<b>Brazil</b> grows the most coffee and sugarcane. <b>Ivory Coast</b> in West Africa grows the most cocoa (for chocolate). <b>India</b> and <b>China</b> grow lots of tea and rice. <b>Spain</b> grows the most olives."],
      ["Where crops began", "🥔 🌽", "<b>Potatoes</b> first came from the Andes in South America. <b>Corn</b> first came from Mexico. <b>Canada</b> (Quebec) makes most of the world's maple syrup."]],
      "Think about the climate each crop needs and the country known for it.", "Match each crop to the country or place known for it.",
      [["Which country grows the most coffee?", "Brazil", "Norway|Mongolia"], ["Chocolate comes from cocoa. The top cocoa grower is...", "Ivory Coast", "Japan|Finland"], ["Rice grows in flooded fields called...", "Paddies", "Dunes|Glaciers"],
       ["Potatoes were first grown in the...", "Andes", "Alps|Sahara"], ["Corn was first grown in...", "Mexico", "Iceland|Mongolia"], ["Which country is known for maple syrup?", "Canada", "Egypt|Brazil"],
       ["Olives grow well in the warm, dry...", "Mediterranean", "Arctic|Tundra"], ["Which crop grows best in warm, wet tropical places?", "Bananas", "Wheat|Barley"], ["Which country grows the most sugarcane?", "Brazil", "Sweden|Chile"], ["Wheat grows best on...", "Cooler, drier grasslands", "Flooded rainforest|Frozen ice caps"]])),
    LS("Water for everyone", MC([
      ["Not enough fresh water", "💧", "Most of Earth is water, but less than <b>3%</b> is fresh, and most of that is frozen in glaciers and ice. Only a small part is easy to use."],
      ["Where we use it", "🚜 🏭", "About <b>70%</b> of fresh water used worldwide goes to farming. <b>Irrigation</b> brings water to crops. Underground rock that holds water is an <b>aquifer</b>."],
      ["Solutions", "🛠️", "People dig <b>wells</b>, build <b>dams</b>, recycle water, and use <b>desalination</b> to remove salt from sea water. Saving water at home helps too."]],
      "Think about where fresh water is found and how it is used.", "Fresh water is rare. Think about ways to find it, clean it, or save it.",
      [["What percent of Earth's water is fresh water?", "Less than 3%", "About 50%|About 90%"], ["Most of Earth's fresh water is...", "Frozen in glaciers and ice", "In lakes|In the clouds"], ["Taking salt out of sea water is called...", "Desalination", "Irrigation|Erosion"],
       ["Underground rock that holds water is an...", "Aquifer", "Oasis|Estuary"], ["Bringing water to crops is called...", "Irrigation", "Mining|Deforestation"], ["Which uses the most fresh water worldwide?", "Farming", "Swimming pools|Bathing"],
       ["A hole dug to reach underground water is a...", "Well", "Delta|Dune"], ["Which action saves water?", "Fixing a leaking tap", "Leaving the hose on|Watering the road"], ["A long time with too little rain can cause a water shortage called a...", "Drought", "Flood|Tsunami"], ["A dam can help by...", "Storing water in a reservoir", "Making rain|Melting the sea"]])),
    LS("The greenhouse effect", MC([
      ["A blanket of gas", "🌡️ 🌍", "Some gases in the air, like <b>carbon dioxide</b> and <b>methane</b>, trap some of the Sun's heat. This is the <b>greenhouse effect</b>. It is natural, and it keeps Earth warm enough for life."],
      ["Too much of a good thing", "🏭 🚗", "Burning <b>fossil fuels</b> (coal, oil, gas) puts extra carbon dioxide in the air. More heat is trapped, so Earth's average temperature rises. This is <b>global warming</b>."],
      ["Effects and fixes", "🧊 ☀️", "Warming melts glaciers and ice, and sea level rises. We can use <b>renewable energy</b> (solar, wind), save energy, and protect forests to cut the problem."]],
      "Think about which gases trap heat and where they come from.", "The greenhouse effect is about gases holding heat near Earth.",
      [["Gases that trap the Sun's heat near Earth cause the...", "Greenhouse effect", "Water cycle|Rock cycle"], ["Which is a greenhouse gas?", "Carbon dioxide", "Helium|Neon"], ["Burning coal, oil and gas adds more...", "Carbon dioxide to the air", "Trees to the forest|Water to the ocean"],
       ["Global warming means...", "Earth's average temperature is rising", "Winter is longer|The Sun is closer"], ["Melting glaciers and ice can make sea level...", "Rise", "Fall|Stay frozen"], ["Which energy source adds the least carbon dioxide?", "Solar power", "Coal|Oil"],
       ["The natural greenhouse effect...", "Keeps Earth warm enough for life", "Freezes the whole planet|Does not exist"], ["Which helps slow climate change?", "Protecting forests", "Burning more coal|Cutting down trees"], ["Coal, oil and natural gas are called...", "Fossil fuels", "Solar fuels|Wind fuels"], ["Weather is what the sky does today. What is the long-term pattern called?", "Climate", "Season|Forecast"]])),
    LS("Under the sea", MC([
      ["The ocean floor has landforms too", "🌊 ⛰️", "Under the water there are mountains, plains and valleys. The edge of a continent under shallow water is the <b>continental shelf</b>. Past it, the <b>continental slope</b> drops steeply."],
      ["Deep down", "🔽", "The flat deep floor is the <b>abyssal plain</b>. A <b>mid-ocean ridge</b> is a long chain of underwater mountains. An <b>ocean trench</b> is a very deep, narrow valley."],
      ["Record", "📏", "The <b>Mariana Trench</b> in the Pacific Ocean is the deepest place, about 11,000 m. A <b>seamount</b> is an underwater mountain that does not reach the surface."]],
      "Think about the shape and depth of each underwater landform.", "Match each name to its shape: shelf, slope, plain, ridge or trench.",
      [["The shallow edge of a continent under the sea is the...", "Continental shelf", "Abyssal plain|Trench"], ["The flat, deep ocean floor is the...", "Abyssal plain", "Ridge|Delta"], ["A very deep, narrow valley on the ocean floor is a...", "Trench", "Ridge|Shelf"],
       ["A long chain of underwater mountains is a...", "Mid-ocean ridge", "Abyssal plain|Shelf"], ["Where is the Mariana Trench?", "The Pacific Ocean", "The Atlantic Ocean|The Arctic Ocean"], ["The deepest place in the ocean is in the...", "Mariana Trench", "Mid-Atlantic Ridge|Continental shelf"],
       ["An underwater mountain that does not reach the surface is a...", "Seamount", "Island|Cape"], ["Past the continental shelf, the sea floor drops steeply on the...", "Continental slope", "Abyssal hill|Delta"], ["The continental shelf is usually...", "Shallow", "The deepest part|Above the water"], ["The deepest part of the ocean is about how deep?", "11,000 m", "1,100 m|500 m"]])),
    LS("Layers of the atmosphere", MC([
      ["Layers of air", "🌤️ 🚀", "The atmosphere has layers. From the ground up: <b>troposphere</b>, <b>stratosphere</b>, <b>mesosphere</b>, <b>thermosphere</b> and <b>exosphere</b>."],
      ["What happens where", "☁️", "Weather and clouds happen in the <b>troposphere</b>. The <b>ozone layer</b>, which blocks harmful sunlight, is in the <b>stratosphere</b>. Meteors burn up in the <b>mesosphere</b>. Auroras (northern lights) glow in the <b>thermosphere</b>."],
      ["What air is made of", "🫧", "Air is about <b>78% nitrogen</b> and <b>21% oxygen</b>, plus a little carbon dioxide and other gases. Higher up, the air gets thinner."]],
      "Think about which layer is the closest to the ground and what happens in each.", "The names go in order from the ground upward.",
      [["Weather happens in which layer?", "Troposphere", "Thermosphere|Exosphere"], ["The ozone layer is in the...", "Stratosphere", "Troposphere|Exosphere"], ["Which layer is closest to the ground?", "Troposphere", "Stratosphere|Mesosphere"],
       ["Meteors usually burn up in the...", "Mesosphere", "Troposphere|Ozone layer"], ["Auroras (northern lights) glow in the...", "Thermosphere", "Troposphere|Stratosphere"], ["About what part of air is oxygen?", "21%", "78%|50%"],
       ["The most common gas in air is...", "Nitrogen", "Oxygen|Carbon dioxide"], ["The ozone layer protects us from...", "Harmful sunlight", "Rain|Wind"], ["As you go higher in the atmosphere, the air gets...", "Thinner", "Thicker|Wetter"], ["Which layer is the farthest from the ground?", "Exosphere", "Troposphere|Mesosphere"]])),
    LS("Degrees and minutes", DEGMIN),
    LS("Percent of a whole", PCTWHOLE),
    LS("Area on a grid map", AREASQ),
    LS("Median and mode", MEDIAN),
    LS("Miles and kilometers", MILEKM),
    LS("Ancient Americas", MC([
      ["Great civilizations of the Americas", "🏔️ 🌽", "Long before ships came from Europe, big civilizations lived in the Americas. They grew <b>corn</b>, built cities and studied the sky."],
      ["Maya, Aztec, Inca", "🛕", "The <b>Maya</b> built stone pyramids in the forests of Mexico (the Yucatán) and Central America. The <b>Aztec</b> capital, <b>Tenochtitlan</b>, was on an island in a lake where Mexico City is today. The <b>Inca</b> ruled along the Andes from <b>Cusco</b>."],
      ["More", "🪨", "The Inca built roads, rope bridges and farm <b>terraces</b> on steep slopes, and raised llamas. <b>Machu Picchu</b> is in Peru. <b>Cahokia</b>, near St. Louis, was a large city of Mississippian people. Pueblo peoples built homes in cliffs in the Southwest."]],
      "Think about where each people lived and what they built.", "Maya: forest and pyramids. Aztec: lake city. Inca: Andes mountains.",
      [["The Maya lived in what is now Mexico and...", "Central America", "Antarctica|Greenland"], ["The Aztec capital was...", "Tenochtitlan", "Cusco|Cahokia"], ["The Inca empire was in the...", "Andes mountains", "Sahara|Alps"],
       ["The Inca capital was...", "Cusco", "Tenochtitlan|Athens"], ["Machu Picchu is in which country?", "Peru", "Mexico|Chile"], ["Tenochtitlan stood where which modern city is?", "Mexico City", "Lima|Bogotá"],
       ["The Inca farmed steep slopes using...", "Terraces", "Ice|Sailboats"], ["Which crop was grown by the Maya and first came from Mexico?", "Corn", "Coffee|Rice"], ["Which animal did the Inca raise in the Andes?", "Llamas", "Camels|Reindeer"], ["Cahokia was a large city near what is now...", "St. Louis", "Phoenix|Seattle"]])),
    LS("Kingdoms of Africa", MC([
      ["Rich kingdoms", "👑 🌍", "Long ago, strong African kingdoms grew rich by trade. The <b>Ghana Empire</b> (in West Africa) traded gold. The <b>Mali Empire</b> was ruled by <b>Mansa Musa</b>, famous for his wealth."],
      ["Cities", "🕌 🏛️", "<b>Timbuktu</b> was a famous trading and learning city. <b>Great Zimbabwe</b> was a large stone city in southern Africa. <b>Axum</b> was a trading kingdom in the Ethiopian highlands. <b>Kush</b> lay south of Egypt along the Nile."],
      ["Coast and desert", "🧂 🐪", "Camel caravans crossed the Sahara carrying salt and gold. Along the East African coast, <b>Swahili</b> trading towns sent goods across the Indian Ocean."]],
      "Think about the places and trade of these kingdoms.", "Match each kingdom or city to what it was known for.",
      [["Mansa Musa ruled which empire?", "Mali", "Rome|Inca"], ["Timbuktu was famous as a city of...", "Trade and learning", "Ice and snow|Space travel"], ["Great Zimbabwe was...", "A large stone city in southern Africa", "A river in Egypt|A desert in Asia"],
       ["Kush was a kingdom located...", "South of Egypt along the Nile", "In Antarctica|In South America"], ["The Ghana Empire grew rich from trading...", "Gold", "Cars|Coal"], ["Camel caravans across the Sahara carried gold and...", "Salt", "Rice|Snow"],
       ["Axum was a trading kingdom in the highlands of...", "Ethiopia", "Chile|Norway"], ["Swahili trading towns were on the coast of...", "East Africa", "North America|Antarctica"], ["Swahili towns traded across the...", "Indian Ocean", "Arctic Ocean|Pacific Ocean"], ["What made trading kingdoms rich?", "Controlling trade routes", "Having no neighbors|Staying isolated"]])),
    LS("Where continents meet", MC([
      ["Borders between continents", "🗺️", "Continents are separated by mountains, seas and straits. Some are joined by narrow strips of land."],
      ["Europe and Asia", "⛰️", "The <b>Ural Mountains</b> and the <b>Bosporus</b> strait (in Istanbul) mark parts of the Europe-Asia border. Together they form one big landmass, <b>Eurasia</b>."],
      ["Others", "🌉", "The <b>Strait of Gibraltar</b> separates Europe and Africa. The <b>Suez Canal</b> marks the border between Africa and Asia. The <b>Bering Strait</b> separates Asia and North America. The <b>Isthmus of Panama</b> joins North and South America."]],
      "Think about which landform or water lies between the two continents.", "Match each mountain range, strait or canal to the two continents it separates.",
      [["The Ural Mountains help separate...", "Europe and Asia", "Africa and Asia|North and South America"], ["The Strait of Gibraltar lies between...", "Europe and Africa", "Asia and North America|Europe and Asia"], ["The Suez Canal marks the border of Africa and...", "Asia", "Europe|South America"],
       ["The Bering Strait lies between Asia and...", "North America", "Africa|Australia"], ["The Isthmus of Panama joins North America and...", "South America", "Africa|Europe"], ["The strait that runs through Istanbul is the...", "Bosporus", "Gibraltar|Bering"],
       ["Europe and Asia together form the landmass called...", "Eurasia", "Oceania|Pangaea"], ["An isthmus is a...", "Narrow strip of land joining two larger land areas", "Narrow sea between two lands|Deep ocean trench"], ["A strait is a...", "Narrow strip of water joining two bodies of water", "Strip of land joining continents|Mountain range"], ["The Drake Passage lies between South America and...", "Antarctica", "Africa|Europe"]])),
  ];
  l14.push(LS("Mixed practice", MX(l14, [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 15, 17])));
  l14.push(LS("Level 14 Challenge", MX(l14, [6, 11, 12, 13, 14, 15, 16, 17, 0, 3, 7, 9])));

  // ================= LEVEL 15 : 7th grade, first half =================
  const l15 = [
    LS("Asking geographic questions", MC([
      ["How geographers work", "🔎 🗺️", "Geographers follow steps: <b>ask</b> a question, <b>gather</b> information, <b>organize</b> it, <b>analyze</b> it, and <b>share</b> an answer."],
      ["Good questions and sources", "📚", "A geographic question asks about <b>where</b> and <b>why there</b>, like 'Why do cities grow near rivers?' A <b>primary source</b> comes from someone who was there (a diary, photo, interview). A <b>secondary source</b> was written later (a textbook)."],
      ["Tools and trust", "🛰️", "Sources include <b>atlases</b>, <b>almanacs</b> (yearly facts), <b>satellite images</b> and <b>fieldwork</b> (studying a place in person). Check that a source is trustworthy and not one-sided (<b>bias</b>)."]],
      "Think about what kind of source or step each question describes.", "A primary source is firsthand. A secondary source is written later. Geographic questions are about places.",
      [["Which is a geographic question?", "Why do many big cities grow near rivers?", "What is your favorite color?|What is for lunch?"], ["A diary written by a traveler who was there is a...", "Primary source", "Secondary source|Atlas"], ["A textbook written long after an event is a...", "Secondary source", "Primary source|Diary"],
       ["Studying a place by visiting it in person is called...", "Fieldwork", "Guessing|Daydreaming"], ["A book of maps is an...", "Atlas", "Almanac|Diary"], ["A yearly book of facts and numbers is an...", "Almanac", "Atlas|Novel"],
       ["After asking a question, a geographer's next step is to...", "Gather information", "Share the answer|Stop"], ["A one-sided view that is not fair is called...", "Bias", "Scale|Latitude"], ["A photo taken from space of a flood is a...", "Satellite image", "Diary|Poem"], ["The last step is to...", "Share the answer", "Ask a new question first|Hide the findings"]])),
    LS("South Asia", PAIR([["India", "New Delhi", "🇮🇳"], ["Pakistan", "Islamabad", "🇵🇰"], ["Bangladesh", "Dhaka", "🇧🇩"], ["Nepal", "Kathmandu", "🇳🇵"], ["Bhutan", "Thimphu", "🇧🇹"], ["Afghanistan", "Kabul", "🇦🇫"]], {
      title: "South Asia", tv: "🏔️ 🐘", intro: "South Asia is a region under the high <b>Himalayas</b>. The great rivers <b>Indus</b> and <b>Ganges</b> water the plains. <b>India</b> is the most populous country in the world. <b>Sri Lanka</b> and the <b>Maldives</b> are island countries. Mount Everest is on the Nepal-China border.",
      n: "Think about the list of countries and capitals.", f: c => `What is the capital of ${c}?`, r: c => `${c} is the capital of which country?`,
      tip: "India's capital New Delhi is next to the old city of Delhi. The Himalayas are in the north."
    })),
    LS("Plate boundaries", MC([
      ["Plates move", "🌋 🧩", "Earth's crust is broken into <b>plates</b> that move slowly. Where plates meet, we find <b>boundaries</b>."],
      ["Three kinds", "↔️", "<b>Divergent</b>: plates move apart (the Mid-Atlantic Ridge, Iceland). <b>Convergent</b>: plates push together (mountains, trenches, volcanoes). <b>Transform</b>: plates slide past each other (the San Andreas Fault in California)."],
      ["Examples", "🏔️", "The <b>Himalayas</b> rose where the Indian Plate crashed into the Eurasian Plate. <b>Subduction</b> is when one plate sinks under another."]],
      "Think about how the plates move: apart, together, or sideways.", "Divergent means moving apart, convergent means coming together, transform means sliding past.",
      [["Plates moving apart is a...", "Divergent boundary", "Convergent boundary|Transform boundary"], ["Plates pushing together is a...", "Convergent boundary", "Divergent boundary|Transform boundary"], ["Plates sliding past each other is a...", "Transform boundary", "Divergent boundary|Convergent boundary"],
       ["The San Andreas Fault in California is a...", "Transform boundary", "Divergent boundary|Convergent boundary"], ["The Mid-Atlantic Ridge is a...", "Divergent boundary", "Transform boundary|Convergent boundary"], ["The Himalayas formed when the Indian Plate...", "Collided with the Eurasian Plate", "Moved away from Asia|Sank into the sea"],
       ["When one plate sinks under another, it is called...", "Subduction", "Erosion|Deposition"], ["Deep ocean trenches often form at...", "Convergent boundaries", "Rivers|Deserts"], ["Iceland has many volcanoes because it sits on a...", "Divergent boundary", "Flat desert|Glacier"], ["A crack in Earth's crust where movement happens is a...", "Fault", "Delta|Isthmus"]])),
    LS("Mountain and volcano types", MC([
      ["Four kinds of mountain", "⛰️", "<b>Fold mountains</b> form when plates squeeze the land into folds (Himalayas, Alps). <b>Fault-block mountains</b> form when blocks of crust tilt or lift along faults (Sierra Nevada). <b>Volcanic mountains</b> are built from lava and ash (Mount Fuji). <b>Dome mountains</b> form when magma pushes the land up (Black Hills)."],
      ["Volcano shapes", "🌋", "<b>Shield volcanoes</b> are broad and gently sloped, like <b>Mauna Loa</b> in Hawaii. <b>Composite</b> (or stratovolcanoes) are steep cones, like Mount Fuji. <b>Cinder cones</b> are small and steep."],
      ["Words", "🔥", "<b>Magma</b> is hot melted rock underground. <b>Lava</b> is magma that reaches the surface. The opening at the top is the <b>crater</b>."]],
      "Think about how each mountain or volcano forms.", "Fold = squeezed. Fault-block = broken blocks. Volcanic = lava and ash.",
      [["The Himalayas and the Alps are...", "Fold mountains", "Volcanic mountains|Dome mountains"], ["The Sierra Nevada is an example of...", "Fault-block mountains", "Fold mountains|Cinder cones"], ["Mount Fuji is a...", "Volcano", "Fault-block mountain|River valley"],
       ["Mauna Loa in Hawaii is a...", "Shield volcano", "Cinder cone|Dome mountain"], ["Melted rock underground is...", "Magma", "Lava|Silt"], ["Magma that reaches Earth's surface is called...", "Lava", "Magma|Ash only"],
       ["The opening at the top of a volcano is the...", "Crater", "Delta|Peak only"], ["A broad volcano with gentle slopes is a...", "Shield volcano", "Composite volcano|Cinder cone"], ["A steep cone volcano built of layers of lava and ash is a...", "Composite volcano", "Shield volcano|Dome"], ["Fold mountains form when plates...", "Squeeze the land into folds", "Pull apart in the ocean|Slide over sand"]])),
    LS("Three kinds of rock", MC([
      ["Rocks make landforms", "🪨", "Rocks fall into three groups, based on how they form."],
      ["The groups", "🧱 🌋 🔥", "<b>Igneous</b> rock forms when magma or lava cools and hardens (granite, basalt). <b>Sedimentary</b> rock forms from layers of sand, mud and shells pressed together (sandstone, limestone). <b>Metamorphic</b> rock is changed by heat and pressure (marble, slate)."],
      ["Rock cycle", "🔄", "Rocks slowly change from one type to another in the <b>rock cycle</b>. Marble forms from limestone. <b>Fossils</b> are found in sedimentary rock."]],
      "Think about how each rock type forms: cooled, pressed, or changed.", "Igneous = cooled melted rock. Sedimentary = layers. Metamorphic = changed.",
      [["Rock formed from cooled magma or lava is...", "Igneous", "Sedimentary|Metamorphic"], ["Rock formed from pressed layers of sand and mud is...", "Sedimentary", "Igneous|Metamorphic"], ["Rock changed by heat and pressure is...", "Metamorphic", "Igneous|Sedimentary"],
       ["Granite is a kind of...", "Igneous rock", "Sedimentary rock|Metamorphic rock"], ["Sandstone is a kind of...", "Sedimentary rock", "Igneous rock|Metamorphic rock"], ["Marble is a kind of...", "Metamorphic rock", "Igneous rock|Sedimentary rock"],
       ["Marble forms from which rock?", "Limestone", "Granite|Basalt"], ["Fossils are usually found in...", "Sedimentary rock", "Igneous rock|Lava"], ["Rocks slowly changing from one type to another is called the...", "Rock cycle", "Water cycle|Seasons"], ["Basalt forms when...", "Lava cools", "Mud is pressed|Marble melts"]])),
    LS("Ways of farming", MC([
      ["Why farm?", "🚜 🌾", "<b>Subsistence farming</b> grows food mainly for the farmer's own family. <b>Commercial farming</b> grows crops or animals to sell."],
      ["Big and small", "🍌 ☕", "A <b>plantation</b> is a very large farm that grows one cash crop, like bananas, coffee or tea. <b>Pastoral</b> herders move their animals to find grass."],
      ["Farming tricks", "💦", "<b>Terraces</b> are steps cut into hills. <b>Irrigation</b> brings water. <b>Crop rotation</b> means changing crops each year to keep soil healthy. The <b>Green Revolution</b> (1960s) used new seeds and fertilizers to grow more food."]],
      "Think about whether the food is for the family or to sell.", "Subsistence means for the family. Commercial means to sell.",
      [["Growing food mainly for your own family is...", "Subsistence farming", "Commercial farming|Plantation farming"], ["Growing crops to sell is...", "Commercial farming", "Subsistence farming|Pastoral herding"], ["A very large farm growing one cash crop, like bananas, is a...", "Plantation", "Terrace|Oasis"],
       ["Steps cut into a hillside for farming are...", "Terraces", "Dunes|Deltas"], ["Changing crops each year to keep soil healthy is...", "Crop rotation", "Irrigation|Deforestation"], ["Bringing water to dry fields is...", "Irrigation", "Erosion|Rotation"],
       ["People who move animals to find grass are...", "Pastoral herders", "Plantation owners|Miners"], ["The Green Revolution helped farmers grow more food using...", "New seeds and fertilizers", "No water|Fewer farms"], ["Which is a cash crop?", "Coffee", "A garden for one family|Wild berries"], ["Terraces are mostly used on...", "Steep hills", "Flat deserts|Lakes"]])),
    LS("Reading population pyramids", MC([
      ["A graph shaped like a pyramid", "📊 👥", "A <b>population pyramid</b> shows how many people are in each age group. Men are on one side and women on the other. The young are at the bottom and the old at the top."],
      ["Shapes", "🔺", "A <b>wide bottom</b> means many children and fast growth (like Nigeria). <b>Straight sides</b> mean a steady population. A <b>narrow bottom</b> means fewer babies and an older population (like Japan)."],
      ["Why it matters", "🏫 🏥", "Countries with many children need schools. Countries with many older people need more health care."]],
      "Think about the shape: wide bottom or narrow bottom.", "The bottom bar shows the youngest people.",
      [["A pyramid with a very wide bottom shows...", "Many children and fast growth", "Mostly old people|No people"], ["A pyramid with a narrow bottom shows...", "Fewer babies and an older population", "Very fast growth|Only children"], ["Where are the oldest people on a population pyramid?", "At the top", "At the bottom|In the middle"],
       ["Where are the youngest people shown?", "At the bottom", "At the top|At the left edge"], ["A pyramid with straight sides shows a...", "Steady population", "Shrinking forest|Growing desert"], ["A country with many children needs more...", "Schools", "Retirement homes only|Ships"],
       ["A country with many older people needs more...", "Health care", "Playgrounds only|Schools only"], ["Japan's pyramid is narrow at the bottom because...", "Few babies are born compared with past years", "No one lives there|Many children live there"], ["A population pyramid shows people grouped by...", "Age and sex", "Height|Country name"], ["Which country has a young, fast-growing population?", "Nigeria", "Japan|Italy"]])),
    LS("Groups of nations", MC([
      ["Working together", "🤝 🌐", "Countries join groups to solve problems together. The <b>United Nations (UN)</b> was formed in 1945 to keep peace and help countries cooperate. Its headquarters is in <b>New York City</b>."],
      ["UN helpers", "🏥 📚", "<b>WHO</b> (World Health Organization) works on health. <b>UNESCO</b> works on education, science and culture. <b>UNICEF</b> helps children."],
      ["Regional groups", "🗺️", "<b>ASEAN</b> links Southeast Asian nations. The <b>African Union</b> links African countries. <b>OPEC</b> is a group of oil-producing countries."]],
      "Think about what each group works on.", "Match the group to its job: peace, health, education, children, region, or oil.",
      [["Where is the United Nations headquarters?", "New York City", "Paris|London"], ["Which group works on health around the world?", "WHO", "UNESCO|OPEC"], ["Which group works on education, science and culture?", "UNESCO", "WHO|ASEAN"],
       ["Which group helps children around the world?", "UNICEF", "OPEC|ASEAN"], ["ASEAN is a group of countries in...", "Southeast Asia", "South America|Europe"], ["OPEC is a group of countries that produce...", "Oil", "Wheat|Cars"],
       ["The African Union links...", "African countries", "Asian islands only|European countries"], ["The United Nations was formed to...", "Keep peace and help countries cooperate", "Make maps only|Build ships"], ["The United Nations was formed in...", "1945", "1845|1995"], ["WHO stands for World...", "Health Organization", "Heights Organization|Hurricane Office"]])),
    LS("India time and half-hour zones", INDIA),
    LS("Steepness of a slope", SLOPE),
    LS("Longitude gets closer", MC([
      ["Lines that meet", "🧭 🌐", "Lines of <b>longitude</b> run from pole to pole. They are farthest apart at the <b>Equator</b> and meet at the <b>North and South Poles</b>."],
      ["How far is a degree?", "📏", "One degree of <b>latitude</b> is about <b>111 km</b> everywhere. One degree of <b>longitude</b> is about 111 km at the Equator, about <b>56 km</b> at 60° latitude, and <b>0</b> at the poles."],
      ["Time", "⏰", "Earth turns 360° in 24 hours, so it turns <b>15° each hour</b>. That is why time zones are about 15° of longitude wide."]],
      "Think about where longitude lines are far apart and where they meet.", "Longitude lines squeeze together toward the poles.",
      [["Where are longitude lines farthest apart?", "At the Equator", "At the North Pole|At the South Pole"], ["Where do all longitude lines meet?", "At the poles", "At the Equator|At the Tropics"], ["One degree of latitude is about how far?", "111 km", "11 km|1,100 km"],
       ["One degree of longitude at the Equator is about...", "111 km", "56 km|0 km"], ["One degree of longitude at 60° latitude is about...", "56 km", "111 km|222 km"], ["At the poles, one degree of longitude is about...", "0 km", "111 km|56 km"],
       ["Earth turns how many degrees of longitude each hour?", "15", "30|10"], ["As you travel from the Equator toward the poles, a degree of longitude gets...", "Shorter", "Longer|The same"], ["Lines of latitude are always...", "Parallel to each other", "Meeting at the poles|Crossing at the Equator"], ["Lines of longitude are also called...", "Meridians", "Parallels|Tropics"]])),
    LS("Exchange rates", MONEY),
    LS("Mountain ranges of the world", MC([
      ["Famous ranges", "🏔️", "A <b>mountain range</b> is a long chain of mountains. The <b>Himalayas</b> (Asia) have Mount Everest. The <b>Andes</b> (South America) are the longest range on land. The <b>Rockies</b> are in western North America. The <b>Alps</b> are in Europe."],
      ["More ranges", "⛰️", "The <b>Urals</b> are in Russia. The <b>Atlas Mountains</b> are in northwest Africa. The <b>Drakensberg</b> is in southern Africa. The <b>Great Dividing Range</b> is in eastern Australia."],
      ["Others", "🗺️", "The <b>Appalachians</b> are in eastern North America. The <b>Pyrenees</b> separate Spain and France. The <b>Caucasus</b> lie between the Black and Caspian seas."]],
      "Think about the continent each mountain range is on.", "Match each range to its continent.",
      [["The Himalayas are in...", "Asia", "Europe|Africa"], ["The Andes are in...", "South America", "North America|Asia"], ["The Rocky Mountains are in...", "North America", "Europe|South America"],
       ["The Alps are in...", "Europe", "Asia|Australia"], ["The Atlas Mountains are in...", "Northwest Africa", "Southern Europe|Central Asia"], ["The Great Dividing Range is in...", "Australia", "Africa|South America"],
       ["Which is the longest mountain range on land?", "The Andes", "The Alps|The Urals"], ["The Appalachians are in...", "Eastern North America", "Western Europe|Southern Africa"], ["The Pyrenees separate Spain and...", "France", "Italy|Germany"], ["The Drakensberg is in...", "Southern Africa", "Northern Europe|Eastern Asia"]])),
    LS("Inside a city", MC([
      ["The layout of a city", "🏙️ 🚌", "Most cities grew from a busy center. The <b>Central Business District (CBD)</b> has tall office buildings, shops and the most traffic. Land costs a lot there, so buildings go <b>up</b>."],
      ["Beyond the center", "🏘️", "Around it are neighborhoods, then <b>suburbs</b> with homes, schools and parks. When a city spreads out over farmland, we call it <b>urban sprawl</b>. People who travel into the city for work are <b>commuters</b>."],
      ["Planning", "🗺️", "<b>Zoning</b> divides land into areas for homes, shops and factories. Good <b>public transit</b> (buses, trains) cuts traffic and pollution."]],
      "Think about what is in the center of a city and what is around it.", "The CBD is the busy center. Suburbs are the outer residential areas.",
      [["The busy center with offices and shops is the...", "CBD", "Suburb|Rural area"], ["Neighborhoods on the edge of a city with many homes are...", "Suburbs", "CBD|Harbors"], ["A city spreading over farmland is called...", "Urban sprawl", "Zoning|Irrigation"],
       ["People who travel into the city for work are...", "Commuters", "Explorers|Farmers"], ["Dividing land for homes, shops and factories is called...", "Zoning", "Sprawl|Erosion"], ["Why are there skyscrapers in the CBD?", "Land is expensive, so buildings go up", "There is no land at all|Cities hate tall buildings"],
       ["CBD stands for Central...", "Business District", "Building Design|Bridge Division"], ["Public transit helps a city by...", "Cutting traffic and pollution", "Making roads longer|Closing shops"], ["Which land use is usually found in the CBD?", "Offices and shops", "Big farms|Forests"], ["Suburbs are usually...", "Farther from the center than the CBD", "In the very middle|Under water"]])),
    LS("Lines through countries", MC([
      ["Special lines pass through countries", "📍 🌍", "The <b>Equator</b> crosses countries like <b>Ecuador, Colombia, Brazil, Gabon, Uganda, Kenya and Indonesia</b>."],
      ["The Tropics", "☀️", "The <b>Tropic of Cancer</b> crosses Mexico, Egypt, Saudi Arabia and India. The <b>Tropic of Capricorn</b> crosses Chile, Brazil, Namibia, South Africa and Australia."],
      ["Other lines", "🧭", "The <b>Prime Meridian</b> crosses the United Kingdom, France, Spain, Algeria and Ghana. The <b>Arctic Circle</b> crosses Norway, Russia and Canada."]],
      "Think about whether the country is near the Equator, the tropics, or other lines.", "Remember which countries each line passes through.",
      [["Which South American country does the Equator cross?", "Ecuador", "Peru|Chile"], ["Which African country does the Equator cross?", "Kenya", "Egypt|Tanzania"], ["Which Asian country does the Equator cross?", "Indonesia", "India|Japan"],
       ["Which Asian country does the Tropic of Cancer cross?", "India", "Japan|Indonesia"], ["Which African country does the Tropic of Cancer cross?", "Egypt", "Kenya|South Africa"], ["Which country does the Tropic of Capricorn cross, on the continent of Oceania?", "Australia", "Egypt|India"],
       ["Which South American country does the Tropic of Capricorn cross?", "Chile", "Colombia|Venezuela"], ["Which African country does the Prime Meridian cross?", "Ghana", "Nigeria|Kenya"], ["Which European country does the Prime Meridian cross, besides France and the United Kingdom?", "Spain", "Italy|Germany"], ["The Arctic Circle passes through which country?", "Norway", "Spain|India"]])),
    LS("Southwest Asia's landscape", MC([
      ["Deserts and seas", "🏜️ 🛢️", "Southwest Asia has big deserts, like the Rub' al Khali (the 'Empty Quarter') on the <b>Arabian Peninsula</b>. Most of the region gets little rain."],
      ["Water", "🌊", "The <b>Persian Gulf</b> is a major oil-producing area, and ships pass the narrow <b>Strait of Hormuz</b>. The <b>Tigris and Euphrates</b> water Iraq. The <b>Dead Sea</b> is very salty. An <b>oasis</b> is a place in the desert with water."],
      ["Highlands", "⛰️", "<b>Anatolia</b> is the high plateau that makes up most of Turkey. The <b>Zagros Mountains</b> are in Iran. Where fresh water is rare, <b>desalination</b> makes sea water drinkable."]],
      "Think about deserts, oil and water in this region.", "Southwest Asia is dry, with oil near the Persian Gulf and big rivers in Iraq.",
      [["The large peninsula in Southwest Asia is the...", "Arabian Peninsula", "Iberian Peninsula|Korean Peninsula"], ["The Rub' al Khali is a huge...", "Desert", "River|Sea"], ["Which narrow strait do oil ships pass near the Persian Gulf?", "Strait of Hormuz", "Strait of Gibraltar|Bering Strait"],
       ["The Tigris and Euphrates flow through...", "Iraq", "Egypt|India"], ["A place in the desert with water is an...", "Oasis", "Isthmus|Archipelago"], ["Anatolia is the high plateau of...", "Turkey", "Iran|Egypt"],
       ["The Zagros Mountains are in...", "Iran", "Saudi Arabia|Egypt"], ["Removing salt from sea water to drink is...", "Desalination", "Irrigation|Erosion"], ["The Persian Gulf is known for its...", "Oil", "Snow|Rainforests"], ["Most of Southwest Asia has a...", "Dry climate", "Rainforest climate|Polar climate"]])),
    LS("Layers of the rainforest", MC([
      ["Tall green world", "🌳 🦜", "A <b>tropical rainforest</b> grows near the Equator where it is hot and very rainy all year. The biggest are the <b>Amazon</b> in South America, the <b>Congo</b> in Africa and forests in Southeast Asia."],
      ["Four layers", "📶", "<b>Emergent layer</b>: the tallest trees poking above. <b>Canopy</b>: a thick leafy roof where most animals live. <b>Understory</b>: dim, with small trees and shrubs. <b>Forest floor</b>: dark, with fallen leaves rotting quickly."],
      ["Life", "🐒", "Rainforests have more kinds of plants and animals (<b>biodiversity</b>) than any other land biome. Some rainforests grow in cooler places, like the Pacific Northwest."]],
      "Think about the height of each layer.", "From top to bottom: emergent, canopy, understory, forest floor.",
      [["The tallest trees poking above the rest form the...", "Emergent layer", "Forest floor|Understory"], ["The thick leafy roof where most animals live is the...", "Canopy", "Forest floor|Emergent layer"], ["The dim layer with small trees and shrubs is the...", "Understory", "Canopy|Emergent layer"],
       ["The darkest layer at the bottom is the...", "Forest floor", "Canopy|Emergent layer"], ["The Amazon rainforest is in...", "South America", "Africa|Asia"], ["The Congo rainforest is in...", "Africa", "Australia|Europe"], ["Tropical rainforests grow near the...", "Equator", "Poles|Tropic of Cancer only"],
       ["Rainforests have a lot of...", "Biodiversity", "Snow|Sand"], ["Fallen leaves on a rainforest floor rot...", "Quickly", "Never|Very slowly"], ["Rainforest weather is usually...", "Hot and rainy all year", "Cold and dry|Hot and dry"]])),
    LS("Coasts and shores", MC([
      ["Where land meets sea", "🌊 🏖️", "Waves shape coasts. They cut <b>sea cliffs</b> and leave behind <b>sea stacks</b>. They build <b>beaches</b> and <b>spits</b> (narrow strips of sand reaching into the water)."],
      ["River mouths", "🏞️", "A <b>delta</b> forms where a river drops mud as it meets the sea (the Nile Delta). An <b>estuary</b> is where a river meets the sea and fresh water mixes with salt water."],
      ["More", "🪸", "A <b>fjord</b> is a deep inlet carved by a glacier (Norway). A <b>lagoon</b> is shallow water cut off from the sea. A <b>barrier island</b> is a long sandy island along a coast. A <b>coral reef</b> is built by tiny animals."]],
      "Think about how waves and rivers shape the shore.", "Match each landform to how it forms.",
      [["A fan of mud and sand where a river meets the sea is a...", "Delta", "Spit|Fjord"], ["Where a river's fresh water mixes with the sea is an...", "Estuary", "Oasis|Isthmus"], ["A deep inlet carved by a glacier is a...", "Fjord", "Delta|Spit"],
       ["A narrow strip of sand reaching into the water is a...", "Spit", "Delta|Fjord"], ["A tall column of rock left standing in the sea is a...", "Sea stack", "Lagoon|Beach"], ["A steep rock face cut by waves is a...", "Sea cliff", "Delta|Estuary"],
       ["Which country is famous for fjords?", "Norway", "Egypt|Mongolia"], ["The Nile Delta is in which country?", "Egypt", "India|Peru"], ["A shallow pool of water cut off from the sea is a...", "Lagoon", "Fjord|Cliff"], ["Coral reefs are built by...", "Tiny animals", "Wind|Ice"]])),
  ];
  l15.push(LS("Mixed practice", MX(l15, [0, 1, 2, 3, 4, 5, 6, 7, 10, 12, 13, 14])));
  l15.push(LS("Level 15 Challenge", MX(l15, [8, 9, 11, 15, 16, 17, 2, 3, 6, 10, 12, 14])));

  Object.assign(GEO_LEVELS, { 13: l13, 14: l14, 15: l15 });
})();
