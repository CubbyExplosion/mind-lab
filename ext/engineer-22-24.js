// ext/engineer-22-24.js  Engineering levels 22-24 (10th grade second half, 11th grade)
(() => {
  const gen = (title, slides, g) => {
    const make = () => { const q = g(); return { text: q.text, visual: q.visual, textInput: q.textInput, answer: q.answer, choices: q.choices ? shuf(q.choices) : undefined, hints: q.hints }; };
    make.teach = () => slides.map(s => ({ h: s[0], v: s[1], t: s[2] }));
    make.slide = slides[0];
    return { title, make };
  };
  const mix = (title, ls) => {
    const make = () => pick(ls).make();
    make.teach = () => {
      const out = [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here is a quick reminder of some ideas, then the quiz." }];
      ls.filter((_, i) => i % Math.ceil(ls.length / 4) === 0).slice(0, 4).forEach(l => out.push({ h: l.make.slide[0], v: l.make.slide[1], t: l.make.slide[2] }));
      return out;
    };
    return { title, make };
  };
  const at = (arr, idx) => idx.map(i => arr[i]);
  const Q = (text, visual, answer, hints, choices) => ({ text, visual, answer, hints, choices });
  const Qt = (text, visual, answer, hints) => ({ text, visual, answer, hints, textInput: true });
  const sup = (b, p) => `${b}<sup>${p}</sup>`;
  const rd = x => Math.round(x * 100) / 100;
  const until = f => { for (let i = 0; i < 500; i++) { const r = f(); if (r) return r; } return f(); };
  // multiple-choice lesson: items are ["emoji§question", right, wrong1, wrong2?]; hints are shared by the whole lesson
  const mcl = (title, slides, hints, items, extra) => gen(title, slides, () => {
    if (extra && Math.random() < 0.4) return extra();
    const it = pick(items), parts = it[0].split("§");
    return Q(parts[parts.length - 1], parts.length > 1 ? parts[0] : undefined, it[1], hints, it.slice(1));
  });


  // ================= LEVEL 22 =================
  const a = [
    gen("Logarithms", [
      ["What is a logarithm?", "🔟", "A <b>logarithm</b> asks: <i>what power do I raise the base to?</i> Since 10<sup>3</sup> = 1000, log<sub>10</sub>(1000) = 3. Since 2<sup>5</sup> = 32, log<sub>2</sub>(32) = 5."],
      ["Why engineers use logs", "📉", "Logs squash huge ranges into small numbers. Sound levels, earthquake size and acidity (pH) use log scales. A log<sub>2</sub> tells you how many bits you need."],
      ["Logs and multiplying", "➕", "Powers add when you multiply, so logs add too: log<sub>2</sub>(8 × 16) = 3 + 4 = 7. Also, the log of 1 is always 0."]
    ], () => {
      const n = ri(2, 6), m = ri(3, 10), x = ri(1, 5), y = ri(1, 5), k = ri(1, 3);
      return pick([
        Q(`What is log<sub>10</sub>(${10 ** n})?`, "🔟", n, ["A log asks for a power. The base here is ten.", "Count how many tens you must multiply together to reach the number.", "Example: log<sub>10</sub>(100000): 10 × 10 × 10 × 10 × 10 uses five tens, so it is 5. Now do yours."]),
        Q(`What is log<sub>2</sub>(${2 ** m})?`, "2️⃣", m, ["A log asks for a power. The base here is two.", "Double 1 again and again until you reach the number; count the doublings.", "Example: log<sub>2</sub>(64): 2, 4, 8, 16, 32, 64 is six doublings, so it is 6. Now do yours."]),
        Q(`What is log<sub>2</sub>(${2 ** x} × ${2 ** y})?`, "➕", x + y, ["Find the log of each number first.", "When numbers are multiplied, their logs are combined with the matching operation.", "Example: log<sub>2</sub>(4 × 32) = 2 + 5 = 7. Now do yours."]),
        Q(`What is log<sub>10</sub>(${10 ** (n + k)} ÷ ${10 ** k})?`, "➗", n, ["Simplify the division first, or use logs of each part.", "Dividing numbers makes their powers shrink by the matching operation.", "Example: log<sub>10</sub>(10000000 ÷ 1000) = log<sub>10</sub>(10000) = 4. Now do yours."]),
        Q(`A signal is ${10 ** n} times stronger than a reference signal. Its level in bels is log<sub>10</sub> of that ratio. How many bels?`, "🔊", n, ["The level is just a log of the ratio.", "Ask: how many times is ten multiplied by itself to make the ratio?", "Example: a ratio of 1000 is 10 × 10 × 10, so the level is 3 bels. Now do yours."]),
        Q(`A counter must tell apart ${2 ** m} different values. What is log<sub>2</sub> of that number, the bits needed?`, "💾", m, ["Bits double the number of values each time you add one.", "Find the power of two that equals the number of values.", "Example: 128 values need log<sub>2</sub>(128) = 7 bits. Now do yours."])
      ]);
    }),
    gen("Compound growth", [
      ["Growing by a percent", "📈", "If something grows by a percent each period, multiply by a <b>growth factor</b>. Growing 10% means × 1.10. After 2 periods: start × 1.10 × 1.10."],
      ["Decay", "📉", "Shrinking by a percent works the same way. Losing 20% each step means × 0.80. Losing half each step means × 0.5."],
      ["Where it shows up", "🏦", "Savings, populations, bacteria and signals losing power all change by a fixed percent per step. The number of steps goes in the exponent."]
    ], () => {
      const P = pick([1000, 2000]), r = pick([10, 20, 50, 100]), n = ri(2, 3), s = ri(2, 9) * 10, h = ri(2, 6), r2 = pick([5, 10, 25]), d = ri(1, 5), st = ri(1, 4);
      return pick([
        Q(`A savings account has $${P} and grows ${r}% each year. How many dollars after ${n} years?`, "🏦", Math.round(P * (1 + r / 100) ** n), ["Each year you multiply by the same growth factor.", "The factor is 1 plus the percent as a decimal; use it once per year.", "Example: $100 at 50% for 2 years: 100 × 1.5 × 1.5 = 225. Now do yours."]),
        Q(`A culture of ${s} bacteria doubles every hour. How many bacteria after ${h} hours?`, "🦠", s * 2 ** h, ["Doubling means multiplying by two each hour.", "Multiply the starting number by two, once for each hour.", "Example: 5 bacteria doubling for 3 hours: 5 × 2 × 2 × 2 = 40. Now do yours."]),
        Q(`A sample of ${640} grams of a material loses half of its mass every day. How many grams are left after ${d} day${d > 1 ? "s" : ""}?`, "☢️", 640 / 2 ** d, ["Losing half means multiplying by one half each day.", "Halve the amount once for each day.", "Example: 200 grams after 3 days of halving: 100, 50, 25. Now do yours."]),
        Q(`What is the growth factor for ${r2}% growth per step?`, "✖️", rd(1 + r2 / 100), ["Growth means you keep the whole amount and add a bit more.", "Write the percent as a decimal and add it to one.", "Example: 30% growth gives a factor of 1.3. Now do yours."], [rd(1 + r2 / 100), rd(r2 / 100), rd(1 - r2 / 100)]),
        Q(`A part loses 20% of its value each year and starts at $${P}. What is it worth after ${n} years?`, "📉", Math.round(P * 0.8 ** n), ["Losing 20% means keeping the rest each year.", "Multiply by the share you keep, once per year.", "Example: $500 losing 50% a year for 2 years: 500 × 0.5 × 0.5 = 125. Now do yours."]),
        Q(`A signal of ${s * 16} mW loses half of its power in each cable section. How many mW remain after ${st} section${st > 1 ? "s" : ""}?`, "📡", s * 16 / 2 ** st, ["Half the power is lost in each section.", "Halve the power once for every section.", "Example: 80 mW through 2 sections: 40, then 20. Now do yours."])
      ]);
    }),
    mcl("Requirements and specs", [
      ["Requirements", "📝", "A <b>requirement</b> says what a design must do. A good one is <b>measurable</b> so you can test it: 'must hold 50 kg' can be tested; 'must be strong' cannot."],
      ["Specification", "📏", "A <b>specification</b> turns needs into numbers: sizes, speeds, limits, and how each will be checked."],
      ["Check it", "✅", "Good requirements are clear, testable and not too narrow. Engineers trace each requirement to a test."]
    ], ["Ask: could I run a test and get a pass or fail?", "Look for a number, a limit or a clear way to check. Fuzzy words like 'nice' or 'strong' cannot be tested.", "Example: 'The lamp must run for at least 6 hours' is testable with a clock; 'The lamp must last long' is not. Now do yours."], [
      ["📱§A phone case needs a requirement. Which one can be tested?", "It must survive a 1.5 m drop onto concrete", "It must be really tough", "It must look good"],
      ["🌉§A footbridge needs a requirement. Which one can be tested?", "It must carry 400 kg at once with no bending over 5 mm", "It must be very safe", "It must feel solid"],
      ["🔋§A battery pack needs a requirement. Which one can be tested?", "It must run the device for at least 8 hours", "It must last a long time", "It must be powerful enough"],
      ["🤖§A robot arm needs a requirement. Which one can be tested?", "It must place a part within 0.5 mm of the target", "It must be accurate", "It must be good at its job"],
      ["💧§A water filter needs a requirement. Which one can be tested?", "It must remove at least 99% of particles larger than 1 micron", "It must make water clean", "It must work well"],
      ["🚲§A bike helmet needs a requirement. Which one can be tested?", "It must weigh no more than 350 g", "It must be light", "It must be comfortable for everybody"],
      ["📶§A wireless sensor needs a requirement. Which one can be tested?", "It must send data every 10 seconds within 30 m", "It must send data quickly", "It must have a good range"],
      ["🏠§A shelter needs a requirement. Which one can be tested?", "It must stay above 15 °C inside when it is 0 °C outside", "It must keep people warm", "It must be cozy"]
    ]),
    gen("Net force with friction", [
      ["Net force", "➡️", "Newton's second law: <b>F<sub>net</sub> = m × a</b>. The net force is the push forward minus the friction backward."],
      ["Using it", "🧮", "Push F = 30 N, friction f = 10 N, mass 5 kg. Net = 30 - 10 = 20 N, so a = 20 ÷ 5 = 4 m/s²."],
      ["Rearranging", "🔁", "You can solve for any piece: F = m × a + f, f = F - m × a, m = (F - f) ÷ a."]
    ], () => {
      const m = ri(2, 10), ac = ri(1, 6), f = ri(2, 20), F = m * ac + f;
      return pick([
        Q(`A ${m} kg cart is pushed with ${F} N while friction pulls back with ${f} N. What is its acceleration in m/s²?`, "🛒", ac, ["First find the net force along the motion.", "Subtract friction from the push, then divide by the mass.", "Example: push 40 N, friction 10 N, mass 6 kg: net 30 N, a = 5 m/s². Now do yours."]),
        Q(`A ${m} kg sled accelerates at ${ac} m/s² against ${f} N of friction. How many newtons of push are needed?`, "🛷", F, ["The push must beat friction and also accelerate the mass.", "Find m × a, then add the friction.", "Example: 4 kg at 3 m/s² with 5 N friction: 12 + 5 = 17 N. Now do yours."]),
        Q(`A force of ${F} N pushes a ${m} kg crate at ${ac} m/s². How many newtons of friction act on it?`, "📦", f, ["Part of the push is used up by friction.", "Compare the push with m × a. The leftover is friction.", "Example: push 50 N, mass 5 kg, a = 6: m × a = 30, friction is 20 N. Now do yours."]),
        Q(`A push of ${F} N against ${f} N of friction gives an acceleration of ${ac} m/s². What is the mass in kg?`, "⚖️", m, ["Mass links net force and acceleration.", "Find the net force first, then divide by the acceleration.", "Example: net force 24 N and a = 4 m/s²: m = 6 kg. Now do yours."]),
        Q(`A push of ${F} N works against ${f} N of friction. What is the net force in newtons?`, "➖", F - f, ["Forces in opposite directions subtract.", "Take the push and remove the part that friction cancels.", "Example: 35 N push, 12 N friction: 23 N net. Now do yours."])
      ]);
    }),
    gen("Constant acceleration", [
      ["Three handy formulas", "🚀", "For constant acceleration a: <b>v = u + a×t</b> (final speed), <b>s = u×t + ½×a×t²</b> (distance), <b>v² = u² + 2×a×s</b>. Here u is the starting speed."],
      ["Example", "🏎️", "Start u = 4 m/s, a = 2 m/s², t = 5 s. Final speed v = 4 + 10 = 14 m/s. Distance s = 20 + ½×2×25 = 45 m."],
      ["Choose smartly", "🎯", "Pick the formula that has the unknown and the numbers you know. Use meters, seconds and m/s² together."]
    ], () => {
      const u = ri(0, 10), ac = 2 * ri(1, 4), t = ri(2, 8), v = u + ac * t, s = u * t + ac * t * t / 2, u2 = ri(2, 12), t2 = ri(2, 10), v2 = u2 + 2 * t2;
      return pick([
        Q(`A scooter starts at ${u} m/s and speeds up at ${ac} m/s² for ${t} s. What is its final speed in m/s?`, "🛴", v, ["Speed grows by acceleration each second.", "Add the acceleration times the time to the starting speed.", "Example: u = 3 m/s, a = 2 m/s², t = 4 s: 3 + 8 = 11 m/s. Now do yours."]),
        Q(`A train speeds up from ${u} m/s to ${v} m/s at ${ac} m/s². How many seconds does it take?`, "🚆", t, ["Find how much speed was gained.", "Divide the gain in speed by the acceleration.", "Example: 5 to 25 m/s at 4 m/s²: gain 20, time 5 s. Now do yours."]),
        Q(`A car starts at ${u} m/s and accelerates at ${ac} m/s² for ${t} s. How many meters does it travel?`, "🚗", s, ["Distance has a part from the starting speed and a part from accelerating.", "Use u×t plus half of a×t².", "Example: u = 2, a = 4, t = 3: 6 + 18 = 24 m. Now do yours."]),
        Q(`A ball rolls with average speed ${u2 + t2} m/s for ${t2} s. How many meters does it cover?`, "⚽", (u2 + t2) * t2, ["For steady average speed, distance is speed times time.", "Multiply the average speed by the time.", "Example: 6 m/s for 5 s is 30 m. Now do yours."]),
        Q(`A rocket sled starts at ${u2} m/s and speeds up steadily to ${v2} m/s in ${t2} s. What is its acceleration in m/s²?`, "🛷", 2, ["Acceleration is the change in speed per second.", "Subtract the speeds, then divide by the time.", "Example: 10 to 40 m/s in 6 s: 30 ÷ 6 = 5 m/s². Now do yours."]),
        Q(`A skater at ${u} m/s accelerates at ${ac} m/s² over ${s} m. Using v² = u² + 2as, what is v² (in m²/s²)?`, "⛸️", u * u + 2 * ac * s, ["The formula gives the square of the speed directly.", "Square the starting speed and add twice a times the distance.", "Example: u = 3, a = 2, s = 10: 9 + 40 = 49. Now do yours."])
      ]);
    }),
    gen("Stopping distance", [
      ["Two parts", "🛑", "Stopping takes two steps. During <b>reaction time</b> the vehicle keeps going at full speed: distance = speed × reaction time. Then <b>braking</b> slows it down."],
      ["Braking distance", "🚗", "With braking deceleration a, the braking distance is <b>v² ÷ (2a)</b>. A car at 20 m/s braking at 5 m/s² needs 400 ÷ 10 = 40 m."],
      ["Speed matters a lot", "⚠️", "Because speed is squared, <b>double the speed means four times the braking distance</b>. That is why speed limits protect people."]
    ], () => {
      const c = pick([[10, 5, 10], [10, 10, 5], [20, 5, 40], [20, 4, 50], [20, 8, 25], [20, 10, 20], [30, 5, 90], [30, 6, 75], [30, 10, 45]]), tr = ri(1, 2), d = ri(2, 9) * 5;
      return pick([
        Q(`A car at ${c[0]} m/s brakes at ${c[1]} m/s². What is its braking distance in meters?`, "🚗", c[2], ["Use the braking formula that has speed squared.", "Square the speed, then divide by twice the deceleration.", "Example: 12 m/s and 4 m/s²: 144 ÷ 8 = 18 m. Now do yours."]),
        Q(`A driver at ${c[0]} m/s has a reaction time of ${tr} s. How far does the car go before the brakes start?`, "⏱️", c[0] * tr, ["Nothing slows the car during reaction time.", "Distance equals speed times the reaction time.", "Example: 15 m/s with 2 s of reaction: 30 m. Now do yours."]),
        Q(`A car at ${c[0]} m/s, ${tr} s reaction time, brakes at ${c[1]} m/s². What is the total stopping distance in meters?`, "🛑", c[0] * tr + c[2], ["Total = reaction distance plus braking distance.", "Work out both pieces separately, then add them.", "Example: 10 m/s, 1 s reaction, 5 m/s² braking: 10 + 10 = 20 m. Now do yours."]),
        Q(`A car's braking distance is ${d} m. If its speed doubles, what is the new braking distance in meters?`, "⚠️", d * 4, ["Braking distance depends on the square of the speed.", "Doubling a number that is squared multiplies the result by a bigger factor.", "Example: braking distance 12 m, speed doubled: 4 × 12 = 48 m. Now do yours."]),
        Q(`A car's braking distance is ${d * 9} m. If its speed becomes one third, what is the new braking distance in meters?`, "🐢", d, ["Braking distance depends on the square of the speed.", "A third of the speed makes the distance shrink by the square of that.", "Example: braking distance 36 m, speed halved: 36 ÷ 4 = 9 m. Now do yours."])
      ]);
    }),
    gen("Heating wires: P = I²R", [
      ["Current heats things", "🔥", "Power lost as heat in a resistor is <b>P = I² × R</b> (watts, with I in amps and R in ohms). Double the current and the heat is four times bigger."],
      ["Other forms", "🔁", "Combine with Ohm's law (V = I×R): P = V²÷R too. Engineers use thick wires to keep R small so less energy turns to heat."],
      ["Example", "🧮", "I = 3 A through R = 4 Ω: P = 9 × 4 = 36 W."]
    ], () => {
      const I = ri(2, 6), R = ri(2, 10), V = pick([12, 24]), R2 = pick([4, 6, 8, 12, 16, 24].filter(r => (V * V) % r === 0));
      return pick([
        Q(`A current of ${I} A flows through a ${R} Ω resistor. How many watts of heat does it make?`, "🔥", I * I * R, ["Heat power uses the current squared.", "Square the current, then multiply by the resistance.", "Example: 5 A through 2 Ω: 25 × 2 = 50 W. Now do yours."]),
        Q(`A heater element of ${R} Ω gives off ${I * I * R} W. What current in amps flows through it?`, "♨️", I, ["Work backwards from P = I² × R.", "Divide the power by R, then find the number that multiplies by itself to give it.", "Example: 72 W in 2 Ω: 72 ÷ 2 = 36, and 6 × 6 = 36, so 6 A. Now do yours."]),
        Q(`A ${I} A current makes ${I * I * R} W of heat in a wire. What is the resistance in ohms?`, "🧵", R, ["Work backwards from P = I² × R.", "Divide the power by the square of the current.", "Example: 90 W with 3 A: 90 ÷ 9 = 10 Ω. Now do yours."]),
        Q(`A wire gets ${I * I * R} W hot with a current of ${I} A. If the current doubles, how many watts will it make now?`, "⚡", 4 * I * I * R, ["Heat power depends on the square of the current.", "Doubling the current multiplies the power by a bigger factor.", "Example: 20 W, current tripled: 9 × 20 = 180 W. Now do yours."]),
        Q(`${V} V is placed across a ${R2} Ω heater. Using P = V² ÷ R, how many watts does it give?`, "🔌", (V * V) / R2, ["This form uses the voltage squared.", "Square the voltage, then divide by the resistance.", "Example: 10 V across 5 Ω: 100 ÷ 5 = 20 W. Now do yours."])
      ]);
    }),
    gen("Wire resistance", [
      ["Length and thickness", "🧵", "A wire's resistance is <b>R = ρ × L ÷ A</b>. Longer wire means more resistance. A thicker wire (bigger cross-section A) means less."],
      ["Scaling", "↔️", "Same material: double the length → double R. Double the area → half R. Double the diameter → area is 4 times bigger → R is a quarter."],
      ["Why it matters", "🏗️", "Long power cables are thick so they waste less energy as heat. Thin wires are fine for small currents."]
    ], () => {
      const k = ri(2, 4), m = ri(2, 4), x = ri(2, 6), R4 = 4 * x;
      return pick([
        Q(`A wire has a resistance of ${m * x} Ω. A wire of the same material and thickness that is ${k} times longer has what resistance in ohms?`, "📏", m * x * k, ["Resistance grows with length.", "A longer wire multiplies the resistance by the same factor.", "Example: 5 Ω for a wire 3 times as long: 15 Ω. Now do yours."]),
        Q(`A wire has a resistance of ${m * x} Ω. A wire of the same material and length with ${m} times the cross-section area has what resistance in ohms?`, "🔘", x, ["Thicker wires let current through more easily.", "Divide the resistance by how many times larger the area is.", "Example: 12 Ω with 3 times the area: 4 Ω. Now do yours."]),
        Q(`A wire has a resistance of ${R4} Ω. Another wire of the same material and length has twice the diameter. What is its resistance in ohms?`, "⭕", x, ["Cross-section area depends on the square of the diameter.", "Double the diameter makes the area grow by a bigger factor, so R shrinks by that factor.", "Example: a 36 Ω wire with triple the diameter: area is 9 times bigger, so 36 ÷ 9 = 4 Ω. Now do yours."]),
        Q(`A wire has ${m * x} Ω. A same-material wire is ${k} times longer and has ${m} times the area. What is its resistance in ohms?`, "🧮", x * k, ["Longer raises R; thicker lowers R.", "Multiply by the length factor and divide by the area factor.", "Example: 6 Ω, 4 times longer, 2 times the area: 6 × 4 ÷ 2 = 12 Ω. Now do yours."]),
        Q("Which wire has the LEAST resistance (same material)?", "🧵", "Short and thick", ["Think about both length and thickness.", "Current flows most easily over a short path through a wide path.", "Example: a short fat pipe moves water more easily than a long thin one. Now do yours."], ["Short and thick", "Long and thin", "Long and thick"]),
        Q("Why are long power cables thick?", "🏗️", "To lose less energy as heat", ["Resistance wastes energy as heat.", "Bigger cross-section means lower resistance.", "Example: a thin extension cable warms up when carrying a big load. Now do yours."], ["To lose less energy as heat", "To make them look strong", "To make them flexible"])
      ]);
    }),
    gen("Latent heat", [
      ["Changing state", "🧊", "To melt ice or boil water, you must add energy even though the temperature does not rise. This hidden energy is <b>latent heat</b>: <b>Q = m × L</b>."],
      ["Numbers", "🔥", "Melting ice: about 334 kJ per kg. Boiling water to steam: about 2260 kJ per kg. So boiling needs much more energy."],
      ["Temperature stays put", "🌡️", "While a pure substance is melting or boiling, its temperature stays the same. The energy goes into breaking bonds."]
    ], () => {
      const m = ri(2, 6), L = pick([200, 300, 400, 500]), x = ri(2, 6);
      return pick([
        Q(`About how many kJ are needed to melt ${m} kg of ice that is already at 0 °C? (Ice needs 334 kJ per kg.)`, "🧊", 334 * m, ["Use Q = m × L.", "Multiply the mass by the energy per kilogram.", "Example: 10 kg of ice: 10 × 334 = 3340 kJ. Now do yours."]),
        Q(`About how many kJ are needed to boil away ${m} kg of water already at 100 °C? (2260 kJ per kg.)`, "♨️", 2260 * m, ["Use Q = m × L.", "Multiply the mass by the energy per kilogram.", "Example: 10 kg of water boiling: 10 × 2260 = 22600 kJ. Now do yours."]),
        Q(`A material needs ${L} kJ per kg to melt. How many kJ are needed to melt ${x} kg?`, "⚗️", L * x, ["Latent heat is energy per kilogram.", "Multiply by the number of kilograms.", "Example: 150 kJ per kg for 4 kg: 600 kJ. Now do yours."]),
        Q(`Melting ${x} kg of a metal took ${L * x} kJ. What is its latent heat in kJ per kg?`, "🔩", L, ["Latent heat is energy per kilogram.", "Divide the total energy by the mass.", "Example: 900 kJ for 3 kg is 300 kJ per kg. Now do yours."]),
        Q("Ice at 0 °C is melting while heat is added. What happens to its temperature?", "🌡️", "It stays at 0 °C", ["Think about where the added energy goes.", "During a change of state the added energy changes the structure, not the temperature.", "Example: boiling water in a pot stays at the same temperature even though the flame keeps heating. Now do yours."], ["It stays at 0 °C", "It rises quickly", "It drops below 0 °C"]),
        Q("Which needs more energy: melting 1 kg of ice or boiling 1 kg of water?", "⚖️", "Boiling the water", ["Compare the energy per kilogram for each change.", "Turning liquid to gas pulls particles much further apart than melting does.", "Example: it takes far more heat to dry a wet cloth by evaporation than to warm it slightly. Now do yours."], ["Boiling the water", "Melting the ice", "They need the same"])
      ]);
    }),
    gen("Gas pressure and volume", [
      ["Boyle's law", "🎈", "At constant temperature, squeezing a gas into a smaller space raises its pressure: <b>P₁ × V₁ = P₂ × V₂</b>. Half the volume means double the pressure."],
      ["Example", "🫁", "Air at 100 kPa in 8 L is squeezed to 2 L: 100 × 8 = P₂ × 2, so P₂ = 400 kPa."],
      ["Uses", "🤿", "Scuba tanks, air compressors, pumps and syringes all use this law. Gas stored at high pressure takes less room."]
    ], () => {
      const o = until(() => { const P1 = pick([100, 200, 400]), V1 = pick([4, 8, 12, 16]), V2 = pick([2, 4, 5, 8]), P2 = P1 * V1 / V2; return P1 * V1 % V2 === 0 && V2 !== V1 ? { P1, V1, V2, P2 } : null; });
      const p = pick([100, 150, 200]), v = ri(2, 9), tk = pick([5, 10, 12]), at2 = pick([20, 50, 100]);
      return pick([
        Q(`Air at ${o.P1} kPa fills ${o.V1} L. It is squeezed (same temperature) to ${o.V2} L. What is the new pressure in kPa?`, "🎈", o.P2, ["Pressure and volume trade off: P × V stays constant.", "Multiply the first pressure and volume, then divide by the new volume.", "Example: 100 kPa in 6 L squeezed to 3 L: 600 ÷ 3 = 200 kPa. Now do yours."]),
        Q(`Air at ${o.P2} kPa fills ${o.V2} L. It expands (same temperature) to ${o.V1} L. What is the new pressure in kPa?`, "🎈", o.P1, ["Pressure and volume trade off: P × V stays constant.", "Multiply pressure and volume first, then divide by the new volume.", "Example: 300 kPa in 2 L expands to 6 L: 600 ÷ 6 = 100 kPa. Now do yours."]),
        Q(`A gas has a pressure of ${p} kPa. Its volume is cut to half at the same temperature. What is the new pressure in kPa?`, "🔧", p * 2, ["Squeezing a gas into less room raises pressure.", "Half the volume means the pressure is multiplied by a matching factor.", "Example: 80 kPa with a third of the volume: 240 kPa. Now do yours."]),
        Q(`A ${tk} L tank holds air at ${at2} times atmospheric pressure. About how many liters of air at normal pressure does it hold?`, "🤿", tk * at2, ["Normal pressure is one atmosphere.", "Volume at one atmosphere is volume times the number of atmospheres.", "Example: 4 L at 50 atmospheres is 200 L of normal air. Now do yours."]),
        Q(`A syringe holds ${v * 10} mL of air at 100 kPa. The plunger is pushed so the volume becomes ${v * 5} mL. What is the pressure in kPa?`, "💉", 200, ["Volume is cut to a fraction of the starting value.", "Find how many times smaller the volume became; pressure grows by that factor.", "Example: 60 mL to 20 mL at 50 kPa gives 150 kPa. Now do yours."])
      ]);
    }),
    mcl("Fiber optics", [
      ["Light in glass", "💡", "A <b>fiber-optic cable</b> is a hair-thin strand of glass. Data travels as pulses of light, which bounce along the inside by <b>total internal reflection</b>."],
      ["Core and cladding", "🔬", "The center (<b>core</b>) has a higher refractive index than the outer layer (<b>cladding</b>), so light stays trapped in the core. Bending a fiber too sharply lets light leak out."],
      ["Why use it", "🌐", "Fibers carry huge amounts of data over long distances, lose little signal and are not disturbed by electrical noise. Light in glass travels at about 200,000 km/s."]
    ], ["Think about what light does at the boundary between two kinds of glass.", "The design traps light by reflecting it back inward, and it carries signals as pulses.", "Example: a flashlight beam bouncing inside a curved water stream shows light can be guided. Now do yours."], [
      ["How does information travel along a fiber-optic cable?", "As pulses of light", "As electric current in glass", "As sound waves"],
      ["What keeps the light inside the core of a fiber?", "Total internal reflection", "Gravity pulling it down", "A magnet around the glass"],
      ["The cladding of a fiber has a ___ refractive index than the core.", "Lower", "Higher", "Exactly the same"],
      ["Why are fibers used for long-distance internet links?", "They carry lots of data with little signal loss", "They are cheaper than every other material", "They never need any glass"],
      ["What happens if a fiber is bent too sharply?", "Some light leaks out", "The light speeds up", "It turns into electricity"],
      ["Which of these does NOT disturb a fiber signal?", "Electrical noise from nearby wires", "A crack in the glass", "A very sharp bend"],
      ["What is a fiber's core made of?", "Very pure glass", "Copper", "Rubber"],
      ["Compared to a copper cable, fiber is usually...", "Better at carrying data far", "Heavier and thicker", "Unable to carry digital data"]
    ], () => {
      const km = ri(2, 20) * 200;
      return Q(`Light in glass fiber travels about 200,000 km/s (200 km per millisecond). About how many milliseconds does a pulse take to cross ${km} km?`, "⏱️", km / 200, ["Time is distance divided by speed.", "The speed is the same as 200 km each millisecond, so divide the distance by 200.", "Example: 1000 km at 200 km per millisecond takes 5 ms. Now do yours."]);
    }),
    gen("How many bits?", [
      ["Counting values", "💾", "<b>n bits</b> can show 2<sup>n</sup> different values. 8 bits give 256 values. The biggest whole number in n bits is 2<sup>n</sup> - 1 (255 for 8 bits)."],
      ["Choosing a size", "📏", "To tell N things apart, find the smallest n with 2<sup>n</sup> ≥ N. 100 things need 7 bits, because 2<sup>6</sup> = 64 is too small and 2<sup>7</sup> = 128 is enough."],
      ["Pictures", "🖼️", "A color pixel often uses 3 bytes (red, green, blue). Memory for a picture = width × height × bytes per pixel."]
    ], () => {
      const n = ri(3, 10), k = ri(3, 8), w = ri(2, 20) * 10, h = ri(2, 20) * 10;
      const c = pick([[5, 3], [9, 4], [17, 5], [33, 6], [100, 7], [200, 8], [1000, 10], [300, 9]]);
      return pick([
        Q(`How many different values can ${n} bits show?`, "💾", 2 ** n, ["Each added bit doubles the number of values.", "Multiply two by itself once for every bit.", "Example: 5 bits show 2 × 2 × 2 × 2 × 2 = 32 values. Now do yours."]),
        Q(`What is the largest whole number that fits in ${k} bits (starting from 0)?`, "🔢", 2 ** k - 1, ["Counting starts at zero, so the top number is one less than the count of values.", "Find how many values there are, then subtract one.", "Example: 4 bits show 16 values, so the largest number is 15. Now do yours."]),
        Q(`What is the smallest number of bits that can tell apart ${c[0]} different items?`, "🏷️", c[1], ["Find a power of two that is big enough.", "Try powers of two (2, 4, 8, 16...) until one is at least as large as the count.", "Example: 40 items: 32 is too small, 64 is enough, so 6 bits. Now do yours."]),
        Q(`A grayscale image is ${w} pixels wide and ${h} pixels tall, with 1 byte per pixel. How many bytes is it?`, "🖼️", w * h, ["Count the pixels first.", "Multiply width by height; each pixel uses one byte.", "Example: 30 by 20 pixels at one byte each is 600 bytes. Now do yours."]),
        Q(`A color image is ${w} by ${h} pixels using 3 bytes per pixel. How many bytes is it?`, "🌈", w * h * 3, ["Find the number of pixels, then the bytes each uses.", "Multiply width, height and the bytes per pixel.", "Example: 10 by 10 pixels at 3 bytes each is 300 bytes. Now do yours."])
      ]);
    }),
    mcl("Objects and classes", [
      ["Class and object", "🧩", "A <b>class</b> is a blueprint. An <b>object</b> is one thing made from it. Class <i>Robot</i> is the blueprint; <i>robot1</i> is an object."],
      ["Attributes and methods", "🔧", "<b>Attributes</b> store data (name, speed). <b>Methods</b> are actions the object can do (move, stop)."],
      ["Reuse", "♻️", "<b>Inheritance</b> lets a new class reuse an old one: a <i>FlyingRobot</i> inherits everything from <i>Robot</i> and adds flying. <b>Encapsulation</b> keeps inside details private."]
    ], ["Decide whether the item is a blueprint, one real thing, a piece of data, or an action.", "Data is what the object has; actions are what it does; the blueprint is the shared plan.", "Example: in a Car class, 'color' is data, 'brake()' is an action and 'myCar' is one real car made from the plan. Now do yours."], [
      ["In code, Robot is a class and r1 is made from it. What is r1?", "An object", "A method", "A bug"],
      ["A class is best described as...", "A blueprint for making objects", "One finished object", "A syntax error"],
      ["A Car has speed = 30. What is speed?", "An attribute", "A class", "A method"],
      ["A Car can brake(). What is brake?", "A method", "An attribute", "An object"],
      ["An ElectricCar class reuses everything from Car and adds a battery. This is called...", "Inheritance", "Encapsulation", "Debugging"],
      ["Keeping a battery level private so only safe methods change it is called...", "Encapsulation", "Inheritance", "Looping"],
      ["You make 3 different drones from one Drone class. How many objects exist?", "3", "1", "0"],
      ["Which is an attribute of a Lamp object?", "Brightness level", "Turning on", "The Lamp blueprint"]
    ]),
    mcl("Staying safe online", [
      ["Passwords", "🔐", "Strong passwords are <b>long</b> and <b>unique</b> for each account. A password manager can remember them. Never share a password with anyone."],
      ["Layers of defense", "🛡️", "<b>Two-factor authentication</b> asks for a second proof, like a code, besides the password. <b>Updates</b> fix security holes. <b>Backups</b> save your work if something goes wrong."],
      ["Spotting tricks", "🎣", "<b>Phishing</b> messages pretend to be someone you trust to steal information. Never click a surprising link or enter a password because a message told you to."]
    ], ["Ask what makes it harder for an attacker, or what a careful person would do.", "Layers of protection are better than one; never trust a surprise message that rushes you.", "Example: reusing one password everywhere is risky because one leak opens every account. Now do yours."], [
      ["Which password is the strongest?", "A long phrase of random words with numbers", "The word password", "Your pet's name"],
      ["What does two-factor authentication add?", "A second proof of identity", "A faster internet speed", "A free storage upgrade"],
      ["Why install software updates?", "They fix security holes", "They delete your files", "They make passwords unnecessary"],
      ["An email says 'Your account is locked! Click here right now!' What is the safest action?", "Do not click; go to the real site yourself or ask an adult", "Click quickly and type your password", "Forward it to all your friends"],
      ["What is a backup?", "An extra copy of your files kept safely", "A faster computer", "A virus scanner"],
      ["Why use a different password for each account?", "A leak at one site cannot unlock the others", "It makes websites load faster", "It is required by law everywhere"],
      ["What is phishing?", "Tricking people into giving up private information", "A way to speed up a network", "A type of backup"],
      ["Encryption scrambles data so that...", "Only someone with the key can read it", "Everyone can read it faster", "It cannot ever be changed"]
    ]),
    gen("Tolerance stack-up", [
      ["Errors add up", "🧱", "Each part has a nominal size and a tolerance, like 20 ± 2 mm. When parts are stacked, the <b>worst-case</b> total tolerance is the <b>sum</b> of all the tolerances."],
      ["Max and min", "↕️", "Add up the nominal sizes for the middle value. Largest = nominal total + total tolerance. Smallest = nominal total - total tolerance."],
      ["Fit checks", "🔩", "For a bolt in a slot: the smallest gap is (smallest slot) - (largest bolt). If it is zero or less, parts might jam."]
    ], () => {
      const n1 = ri(2, 5) * 10, n2 = ri(2, 5) * 10, n3 = ri(2, 5) * 10, t1 = ri(1, 3), t2 = ri(1, 3), t3 = ri(1, 3);
      const B = ri(8, 15), tb = ri(1, 2), ts = ri(1, 2), S = B + tb + ts + ri(1, 4);
      return pick([
        Q(`Three blocks are stacked: ${n1} ± ${t1} mm, ${n2} ± ${t2} mm and ${n3} ± ${t3} mm. What is the greatest possible total height in mm?`, "🧱", n1 + n2 + n3 + t1 + t2 + t3, ["Worst-case means every part is as big as allowed.", "Add the nominal sizes, then add all the tolerances.", "Example: 10 ± 1 and 20 ± 2: biggest is 30 + 3 = 33 mm. Now do yours."]),
        Q(`Three blocks are stacked: ${n1} ± ${t1} mm, ${n2} ± ${t2} mm and ${n3} ± ${t3} mm. What is the smallest possible total height in mm?`, "🧱", n1 + n2 + n3 - t1 - t2 - t3, ["Worst-case means every part is as small as allowed.", "Add the nominal sizes, then take away all the tolerances.", "Example: 10 ± 1 and 20 ± 2: smallest is 30 - 3 = 27 mm. Now do yours."]),
        Q(`Three stacked parts have tolerances of ± ${t1} mm, ± ${t2} mm and ± ${t3} mm. What is the total worst-case tolerance in mm (the ± amount)?`, "➕", t1 + t2 + t3, ["Errors in a stack can all push the same way.", "Add the tolerances together.", "Example: ± 2, ± 1 and ± 3 give ± 6 mm. Now do yours."]),
        Q(`A bolt is ${B} ± ${tb} mm wide and goes in a slot that is ${S} ± ${ts} mm wide. What is the smallest possible gap in mm?`, "🔩", S - ts - (B + tb), ["The smallest gap happens with the smallest slot and the biggest bolt.", "Take the slot minus its tolerance, then subtract the bolt plus its tolerance.", "Example: slot 20 ± 1 and bolt 16 ± 1: gap is 19 - 17 = 2 mm. Now do yours."]),
        Q(`A bolt is ${B} ± ${tb} mm wide and goes in a slot that is ${S} ± ${ts} mm wide. What is the largest possible gap in mm?`, "🔩", S + ts - (B - tb), ["The biggest gap happens with the biggest slot and the smallest bolt.", "Take the slot plus its tolerance, then subtract the bolt minus its tolerance.", "Example: slot 20 ± 1 and bolt 16 ± 1: gap is 21 - 15 = 6 mm. Now do yours."])
      ]);
    }),
    gen("Critical path", [
      ["Tasks that overlap", "🗓️", "Some tasks can happen at the same time. If A (4 days) and B (6 days) run together and C (3 days) needs both, the project takes 6 + 3 = 9 days."],
      ["The critical path", "🛤️", "The <b>critical path</b> is the longest chain of tasks that must happen in order. It sets the shortest possible project time."],
      ["Slack", "⏳", "Tasks off the critical path have <b>slack</b>: time they can slip without delaying the project. Speeding up non-critical tasks does not help."]
    ], () => {
      const a1 = ri(2, 8), b1 = ri(2, 8), c1 = ri(2, 8), p1 = ri(2, 6), p2 = ri(2, 6), p3 = ri(2, 6), q1 = ri(2, 6), q2 = ri(2, 6), q3 = ri(2, 6);
      const pa = p1 + p2, pb = q1 + q2 + q3;
      return pick([
        Q(`Tasks A (${a1} days) and B (${b1} days) run at the same time. Task C (${c1} days) starts when both are finished. How many days does the whole project take?`, "🗓️", Math.max(a1, b1) + c1, ["The slower of the two parallel tasks decides when C can start.", "Take the longer parallel task, then add the last task.", "Example: A 3 days, B 5 days, then C 2 days: 5 + 2 = 7 days. Now do yours."]),
        Q(`Path 1 has tasks of ${p1} and ${p2} days in order. Path 2 has tasks of ${q1}, ${q2} and ${q3} days in order. The paths run together. How many days is the whole project?`, "🛤️", Math.max(pa, pb), ["Add the tasks along each path first.", "The project is done when the longer path is done.", "Example: path of 2+3 days and path of 1+1+1 days: the longer is 5 days. Now do yours."]),
        Q(`A and B run in parallel (A: ${a1} days, B: ${b1 + a1} days). How many days of slack does A have?`, "⏳", b1, ["Slack is the spare time before a task delays the project.", "Compare how long A takes with how long B takes.", "Example: A 2 days, B 7 days: A has 5 days of slack. Now do yours."]),
        Q(`A project's critical path is ${pa + p3} days long. You speed up a task that is NOT on the critical path by 2 days. How many days does the project take now?`, "⚡", pa + p3, ["Only the longest chain sets the finish date.", "Shortening a task off that chain leaves the finish date unchanged.", "Example: a critical path of 12 days stays at 12 days if a side task gets faster. Now do yours."]),
        Q(`The critical path takes ${pb + 3} days. You cut one task on it by 2 days, and no other path is longer than ${pb} days. How many days does the project take now?`, "🚀", pb + 1, ["Shortening a task on the critical path helps, until another path becomes critical.", "Subtract the saving, then check it against the other path.", "Example: critical path of 10 days with a side path of 6; cutting 2 days gives 8. Now do yours."])
      ]);
    }),
    gen("Resonance", [
      ["Natural frequency", "🎵", "Every structure has a <b>natural frequency</b> at which it likes to vibrate. A swing pushed at its own rhythm swings higher and higher: that is <b>resonance</b>."],
      ["Danger", "🏗️", "If a motor, wind or footsteps shake a structure at its natural frequency, the shaking can grow big and cause damage. Engineers avoid matching frequencies or add <b>damping</b> to absorb energy."],
      ["Frequency and rpm", "🔄", "Frequency in hertz (Hz) = cycles per second. A motor at 600 rpm turns 600 ÷ 60 = 10 times each second, so it shakes at 10 Hz."]
    ], () => {
      const hz = ri(2, 30), f = ri(2, 25);
      return pick([
        Q(`A motor turns at ${hz * 60} rpm. What is its frequency in Hz?`, "⚙️", hz, ["A minute has sixty seconds.", "Divide revolutions per minute by the number of seconds in a minute.", "Example: 900 rpm ÷ 60 = 15 Hz. Now do yours."]),
        Q(`A floor has a natural frequency of ${f} Hz. At what motor speed in rpm would it resonate?`, "🏢", f * 60, ["Convert cycles per second to cycles per minute.", "Multiply by the number of seconds in a minute.", "Example: 8 Hz is 8 × 60 = 480 rpm. Now do yours."]),
        Q(`A machine vibrates ${hz * 10} times in 10 seconds. What is the frequency in Hz?`, "📳", hz, ["Frequency is cycles per second.", "Divide the cycles by the seconds.", "Example: 60 vibrations in 20 s is 3 Hz. Now do yours."]),
        Q("What is resonance?", "🎢", "Vibrating strongly when pushed at the natural frequency", ["Think of pushing a swing.", "Matching the natural rhythm adds up the pushes.", "Example: a glass can hum loudly when a matching sound plays near it. Now do yours."], ["Vibrating strongly when pushed at the natural frequency", "Cooling down to a stop", "Changing a metal into glass"]),
        Q("What does damping do to a vibrating structure?", "🧽", "Removes vibration energy", ["Think of a shock absorber in a car.", "Damping works against motion.", "Example: a hand touching a ringing bell stops the sound. Now do yours."], ["Removes vibration energy", "Adds vibration energy", "Doubles the frequency"]),
        Q("A bridge has a natural frequency of 2 Hz. Which footstep rhythm is MOST worrying?", "🚶", "2 steps each second", ["The risk is matching the natural rhythm.", "Look for the rhythm equal to the structure's own frequency.", "Example: a 4 Hz structure and 4 pushes each second would build up. Now do yours."], ["2 steps each second", "1 step every 5 seconds", "20 steps each second"])
      ]);
    }),
    mcl("Lean manufacturing", [
      ["Cut waste", "✂️", "<b>Lean</b> manufacturing tries to remove waste: making too much, waiting, extra moving, extra stock, defects and unneeded steps."],
      ["Tools", "🧰", "<b>Just-in-time</b>: parts arrive when needed. <b>Kanban</b>: cards signal when to make more. <b>5S</b>: sort, set in order, shine, standardize, sustain. <b>Kaizen</b>: small continuous improvements."],
      ["Value", "💎", "Only steps that add value for the customer are worth doing. Everything else is a target to shrink."]
    ], ["Ask whether the step helps the customer or wastes time, space or material.", "Lean ideas aim at smooth flow with only what is needed, when it is needed.", "Example: a worker walking across a factory to fetch a tool is wasted motion; storing the tool at hand fixes it. Now do yours."], [
      ["Workers wait 20 minutes for parts to arrive. Lean calls this...", "Waiting waste", "A kaizen event", "Value"],
      ["Making 500 items when only 100 are ordered is...", "Overproduction waste", "Just-in-time", "5S"],
      ["Parts that must be thrown away because they are faulty are...", "Defects waste", "Kanban cards", "Value-adding steps"],
      ["Kanban cards are used to...", "Signal when more parts are needed", "Measure temperature", "Repaint the factory"],
      ["Just-in-time delivery means parts arrive...", "When they are needed", "A year early", "Never"],
      ["Kaizen means...", "Small improvements all the time", "One huge change every ten years", "Stopping all work"],
      ["Which is part of 5S?", "Shine (clean the workspace)", "Skip safety checks", "Store extra stock everywhere"],
      ["A worker walks 50 m to fetch a tool again and again. The waste is...", "Extra motion", "Overproduction", "Defects"]
    ])
  ];

  a[18] = mix("Mixed practice", at(a, [0, 1, 3, 4, 5, 6, 7, 8, 9, 11, 13, 14, 15, 16]));
  a[19] = mix("Level 22 Challenge", at(a, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));

  // ================= LEVEL 23 =================
  const b = [
    gen("Angular momentum", [
      ["Spin that stays", "⛸️", "A spinning object has <b>angular momentum L = I × ω</b>, where I is its moment of inertia (how spread out its mass is) and ω is how fast it spins."],
      ["Conservation", "🌀", "With no outside twist, L stays the same. A skater who pulls her arms in makes I smaller, so ω must get bigger: <b>I₁ω₁ = I₂ω₂</b>."],
      ["Uses", "🛰️", "Satellites use spinning wheels to turn without fuel. Gyroscopes and flywheels use the same idea."]
    ], () => {
      const o = until(() => { const I1 = pick([8, 12, 16, 24]), w1 = pick([2, 3, 5, 6]), I2 = pick([2, 3, 4, 6, 8]); return (I1 * w1) % I2 === 0 && I2 < I1 ? { I1, w1, I2 } : null; });
      const k = ri(2, 5), w = ri(2, 6);
      return pick([
        Q(`A spinner has I = ${o.I1} kg·m² and ω = ${o.w1} rad/s. What is its angular momentum (kg·m²/s)?`, "🌀", o.I1 * o.w1, ["Angular momentum multiplies two quantities.", "Multiply the moment of inertia by the spin rate.", "Example: I = 5 and ω = 4 gives L = 20. Now do yours."]),
        Q(`A skater spins at ${o.w1} rad/s with I = ${o.I1} kg·m². She pulls in her arms so that I = ${o.I2} kg·m². What is her new spin rate in rad/s?`, "⛸️", (o.I1 * o.w1) / o.I2, ["Angular momentum stays the same when no outside twist acts.", "Find L first, then divide by the new moment of inertia.", "Example: I = 10, ω = 3 changes to I = 5: L = 30, new ω = 6. Now do yours."]),
        Q(`A skater spinning at ${w} rad/s pulls her arms in so her moment of inertia becomes ${k} times smaller. What is her new spin rate in rad/s?`, "🌪️", w * k, ["Angular momentum stays the same.", "If I shrinks by some factor, ω grows by the same factor.", "Example: 7 rad/s with I cut to a half: 14 rad/s. Now do yours."]),
        Q(`A flywheel (I = ${o.I2} kg·m²) spins at ${o.w1 * 2} rad/s. What is its angular momentum (kg·m²/s)?`, "🛞", o.I2 * o.w1 * 2, ["Angular momentum multiplies two quantities.", "Multiply the moment of inertia by the spin rate.", "Example: I = 3 and ω = 7 gives 21. Now do yours."]),
        Q("A spinning skater extends her arms. What happens to her spin rate?", "🤸", "It slows down", ["Extending arms spreads mass farther from the axis.", "A bigger moment of inertia must be balanced by a smaller spin rate, since L stays constant.", "Example: pulling arms in speeds a skater up, so the opposite action does the opposite. Now do yours."], ["It slows down", "It speeds up", "It stays exactly the same"])
      ]);
    }),
    gen("Pendulums", [
      ["Swing time", "🕰️", "A pendulum's <b>period</b> T is the time for one full swing back and forth. For small swings, T depends on length and gravity, not on the mass: <b>T = 2π√(L÷g)</b>."],
      ["Square root rule", "√", "A 1 m pendulum has a period of about 2 s. Make it 4 times longer and T doubles; 9 times longer and T triples. Period grows with the <b>square root</b> of length."],
      ["Frequency", "🔔", "Frequency f = 1 ÷ T swings per second. Grandfather clocks use long pendulums to keep time."]
    ], () => {
      const r = pick([[4, 4], [9, 6], [16, 8], [25, 10]]), T = pick([2, 3, 4, 5]), sw = pick([10, 20, 30]), per = pick([2, 3, 4, 5, 6]);
      return pick([
        Q(`A 1 m pendulum has a period of about 2 s. How many seconds is the period of a pendulum ${r[0]} m long?`, "🕰️", r[1], ["Period grows with the square root of length.", "Find the square root of the length factor, then scale 2 s by it.", "Example: for a 36 m pendulum the square root of 36 is 6, so the period is 2 × 6 = 12 s. Now do yours."]),
        Q(`A pendulum's period is ${T} s. How many full swings does it make in ${T * sw} seconds?`, "🔔", sw, ["Divide the total time by the time for one swing.", "Swings = total time ÷ period.", "Example: period 4 s over 60 s gives 15 swings. Now do yours."]),
        Q(`A pendulum swings back and forth once every ${per} s. How many swings does it make each minute?`, "⏱️", 60 / per, ["A minute is sixty seconds.", "Divide sixty by the period.", "Example: period 5 s: 60 ÷ 5 = 12 swings. Now do yours."]),
        Q("A pendulum's bob is replaced with one twice as heavy, same length. What happens to the period?", "⚖️", "It stays the same", ["Look at which things appear in the formula.", "Mass does not appear in the period formula.", "Example: a light and a heavy child on equal swings take the same time per swing. Now do yours."], ["It stays the same", "It doubles", "It is cut in half"]),
        Q("To make a pendulum clock tick slower, you should...", "🕰️", "Make the pendulum longer", ["Slower ticks mean a longer period.", "Period grows with length.", "Example: a very long rope swing swings slowly. Now do yours."], ["Make the pendulum longer", "Make the pendulum shorter", "Use a lighter bob"]),
        Q("How does the period change if the length is made 4 times longer?", "📏", "It doubles", ["Period grows with the square root of length.", "Find the square root of the length factor.", "Example: length ×9 would make the period triple. Now do yours."], ["It doubles", "It quadruples", "It stays the same"])
      ]);
    }),
    gen("Springs together", [
      ["Spring constant", "🔩", "A spring obeys <b>F = k × x</b>. The stiffer the spring, the bigger k (N per meter)."],
      ["Parallel", "⏸️", "Springs side by side share the load: the stiffness <b>adds</b>. Two 20 N/m springs in parallel give 40 N/m."],
      ["Series", "➡️", "Springs end to end are floppier: <b>1/k = 1/k₁ + 1/k₂</b>. Two equal springs in series give half the stiffness."]
    ], () => {
      const k1 = ri(2, 9) * 10, k2 = ri(2, 9) * 10, p = pick([[6, 3, 2], [12, 4, 3], [10, 10, 5], [20, 5, 4], [15, 10, 6], [12, 6, 4], [30, 20, 12]]), x = ri(2, 8), kk = ri(2, 6) * 10;
      return pick([
        Q(`Two springs of ${k1} N/m and ${k2} N/m are side by side (parallel). What is the combined stiffness in N/m?`, "⏸️", k1 + k2, ["Side-by-side springs share the force.", "Their stiffnesses combine with the simplest operation.", "Example: 15 N/m and 25 N/m in parallel give 40 N/m. Now do yours."]),
        Q(`Two springs of ${p[0]} N/m and ${p[1]} N/m are joined end to end (series). What is the combined stiffness in N/m?`, "➡️", p[2], ["Use the reciprocal rule for series springs.", "Add 1/k for each spring, then flip the total.", "Example: 2 and 2 in series: 1/2 + 1/2 = 1, so the combined stiffness is 1. Now do yours."]),
        Q(`Two identical springs of ${kk * 2} N/m are joined end to end. What is the combined stiffness in N/m?`, "🔗", kk, ["Identical springs in series share the stretch.", "The pair is twice as floppy as one spring.", "Example: two 60 N/m springs in series give 30 N/m. Now do yours."]),
        Q(`A spring with k = ${kk} N/m is stretched ${x} m. What force in newtons does it exert?`, "🔩", kk * x, ["Use F = k × x.", "Multiply stiffness by stretch.", "Example: 30 N/m stretched 2 m gives 60 N. Now do yours."]),
        Q(`A force of ${kk * x} N stretches a spring by ${x} m. What is k in N/m?`, "📐", kk, ["Use F = k × x and rearrange.", "Divide the force by the stretch.", "Example: 90 N for 3 m gives 30 N/m. Now do yours."]),
        Q("Which arrangement of two springs is stiffer?", "⚖️", "Parallel", ["Compare adding stiffness with combining reciprocals.", "One arrangement gives a combined stiffness larger than either spring; the other gives less than either.", "Example: two ropes side by side hold more than the same two tied end to end in stretch resistance. Now do yours."], ["Parallel", "Series", "They are always equal"])
      ]);
    }),
    gen("Square-law scaling", [
      ["Squares everywhere", "²️⃣", "Many forces grow with the <b>square of speed</b>: drag and lift are proportional to v². Double the speed and the force is 4 times bigger; triple it and the force is 9 times bigger."],
      ["Inverse square", "💡", "Light and sound spread out, so intensity falls with the <b>square of distance</b>: twice as far means a quarter of the brightness."],
      ["Working backwards", "🔁", "If a force became 9 times bigger, the speed became 3 times bigger, because 3 × 3 = 9."]
    ], () => {
      const k = ri(2, 5), D = ri(2, 9) * 5, s = pick([2, 3, 4, 5]), lux = pick([8, 16, 24, 36, 100]) * 25;
      return pick([
        Q(`A drag force is ${D} N at a speed v. What is the drag in N at ${k} times that speed?`, "🌬️", D * k * k, ["Drag depends on the square of speed.", "Multiply the starting force by the speed factor squared.", "Example: 12 N with the speed ×3 becomes 108 N. Now do yours."]),
        Q(`A wing makes ${D * k * k} N of lift at a speed ${k} times larger than a slow flight. What was the lift in N at the slow speed?`, "✈️", D, ["Lift depends on the square of speed.", "Divide by the square of the speed factor.", "Example: 160 N at 4 times the speed means 160 ÷ 16 = 10 N. Now do yours."]),
        Q(`A force became ${s * s} times bigger because only the speed changed. By what factor did the speed grow?`, "🔍", s, ["Force depends on the square of speed.", "Find the number that multiplied by itself gives the force factor.", "Example: a force 49 times bigger means a speed 7 times bigger. Now do yours."]),
        Q(`A lamp gives ${lux * s * s} lux at 1 m. How many lux at ${s} m?`, "💡", lux, ["Light spreads over a bigger area as it travels.", "Intensity falls with the square of the distance.", "Example: 900 lux at 1 m becomes 100 lux at 3 m. Now do yours."]),
        Q(`A sound has intensity ${lux * 4} units at 2 m. What is the intensity at 4 m?`, "🔊", lux, ["Moving farther away means weaker sound.", "Doubling the distance divides intensity by a square.", "Example: 80 units at 1 m become 20 units at 2 m. Now do yours."]),
        Q(`A car's kinetic energy is ${D} kJ. The car goes ${k} times faster. What is its kinetic energy in kJ?`, "🚗", D * k * k, ["Kinetic energy depends on the square of speed.", "Multiply by the speed factor squared.", "Example: 4 kJ at 3 times the speed is 36 kJ. Now do yours."])
      ]);
    }),
    gen("Why tall beams resist bending", [
      ["Stiffness of a beam", "📐", "A rectangular beam's stiffness depends on <b>I = b × h³ ÷ 12</b>, where b is the width and h is the height (depth) in the direction of the load."],
      ["Height wins", "🪵", "Height is cubed! Double the height and the beam is <b>8 times</b> stiffer. Double the width and it is only 2 times stiffer."],
      ["On edge", "🧱", "A plank 2 cm × 6 cm is far stiffer standing on its edge than lying flat. That is why floor joists are tall and thin."]
    ], () => {
      const w = pick([[2, 4], [2, 6], [3, 6], [1, 5], [2, 8], [3, 9]]), k = ri(2, 4), x = ri(2, 5);
      return pick([
        Q(`A beam's height is made ${k} times larger (same width and material). By what factor is its stiffness multiplied?`, "📏", k ** 3, ["Stiffness uses the height raised to a power.", "The height is cubed, so cube the factor.", "Example: height ×10 gives 10 × 10 × 10 = 1000 times the stiffness. Now do yours."]),
        Q(`A beam's width is made ${k} times larger (same height and material). By what factor is its stiffness multiplied?`, "↔️", k, ["Stiffness depends on width in a simple way.", "Width is not cubed; the factor stays the same.", "Example: width ×6 gives 6 times the stiffness. Now do yours."]),
        Q(`A plank is ${w[0]} cm by ${w[1]} cm. How many times stiffer is it standing on its ${w[0]} cm edge (height ${w[1]} cm) than lying flat (height ${w[0]} cm)?`, "🪵", (w[1] / w[0]) ** 2, ["Compare b·h³ for each way of placing it.", "The ratio works out to the tall side divided by the short side, squared.", "Example: a 3 cm by 12 cm plank: (12 ÷ 3)² = 16 times. Now do yours."]),
        Q(`A beam has width ${x} cm and height ${x * 2} cm. Calculate b × h³ (use cm⁴ units).`, "🧮", x * (x * 2) ** 3, ["Cube the height first.", "Then multiply by the width.", "Example: width 1, height 3: 1 × 27 = 27. Now do yours."]),
        Q("Which change makes a floor joist stiffer for the least wood?", "🏠", "Making it taller", ["Compare how much each dimension contributes.", "One dimension counts much more than the other.", "Example: a ruler resists bending much more standing on its edge than lying flat. Now do yours."], ["Making it taller", "Making it wider", "Making it painted"])
      ]);
    }),
    gen("Strength-to-weight", [
      ["A fair comparison", "🏋️", "A strong material that is also heavy may not be the best choice. The <b>strength-to-weight ratio</b> is strength ÷ density."],
      ["Aircraft and bikes", "✈️", "Planes, race bikes and rockets need parts that are strong but light, so engineers choose materials with the highest ratio, such as aluminum alloys, titanium and carbon-fiber composites."],
      ["Mass of a part", "⚖️", "Mass = density × volume. A higher ratio means you need less material, so a lighter part, for the same strength."]
    ], () => {
      const d = ri(2, 8), r = ri(20, 80), S = d * r, d2 = ri(2, 8), r2 = ri(20, 80);
      const r3 = until(() => { const q = ri(20, 80); return q !== r && q !== r2 ? q : 0; });
      const V = ri(2, 9) * 10;
      return pick([
        Q(`A material has a strength of ${S} MPa and a density of ${d} g/cm³. What is its strength-to-weight ratio (MPa per g/cm³)?`, "🏋️", r, ["The ratio compares strength with weight.", "Divide strength by density.", "Example: 600 MPa and 3 g/cm³: 200. Now do yours."]),
        Q(`Alloy A has a ratio of ${r}, alloy B has ${r2} and alloy C has ${r3}. Which gives the lightest part for a required strength?`, "✈️", "Alloy " + "ABC"[[r, r2, r3].indexOf(Math.max(r, r2, r3))], ["Think about which is the best value for weight.", "The highest ratio needs the least material.", "Example: ratios 30, 90 and 60: the one with 90 wins. Now do yours."], ["Alloy A", "Alloy B", "Alloy C"]),
        Q(`A block has a volume of ${V} cm³ and a density of ${d} g/cm³. What is its mass in grams?`, "⚖️", V * d, ["Mass comes from how much material and how dense it is.", "Multiply density by volume.", "Example: 15 cm³ at 2 g/cm³ is 30 g. Now do yours."]),
        Q(`A material has a ratio of ${r} and a density of ${d} g/cm³. What is its strength in MPa?`, "🔩", r * d, ["The ratio is strength divided by density.", "Multiply the ratio by the density.", "Example: ratio 70 and density 4 gives 280. Now do yours."]),
        Q(`Steel part: strength ${S} MPa, density ${d} g/cm³. A second material has strength ${S} MPa but density ${d * 2} g/cm³. Which has the higher strength-to-weight ratio?`, "🆚", "The first material", ["Both are equally strong, so compare weight.", "The lighter one has the better ratio.", "Example: two ropes of equal strength where one weighs half as much: the lighter rope wins. Now do yours."], ["The first material", "The second material", "They are equal"])
      ]);
    }),
    mcl("Stress-strain curves", [
      ["Pulling a sample", "📈", "Engineers pull a test bar and plot <b>stress</b> (force per area) against <b>strain</b> (stretch ÷ original length). The curve shows how the material behaves."],
      ["Key points", "📍", "<b>Elastic region</b>: it springs back; the slope is Young's modulus (stiffness). <b>Yield point</b>: permanent bending starts. <b>Ultimate strength</b>: the highest stress. Then it narrows (<b>necks</b>) and <b>fractures</b>."],
      ["Ductile or brittle", "🥜", "<b>Ductile</b> materials (copper, mild steel) stretch a lot before breaking and give warning. <b>Brittle</b> ones (glass, chalk) snap with little stretch."]
    ], ["Locate which part of the curve the description talks about.", "Think about whether the stretch is temporary or permanent, and where the peak is.", "Example: a paperclip bent slightly springs back, but bent a lot stays bent. Now do yours."], [
      ["In the elastic region, when the load is removed the material...", "Returns to its original shape", "Stays permanently stretched", "Turns into glass"],
      ["The point where permanent deformation begins is called the...", "Yield point", "Ultimate point", "Fracture point"],
      ["The highest stress on the curve is the...", "Ultimate tensile strength", "Yield point", "Elastic limit"],
      ["The slope of the straight part of the curve is the...", "Young's modulus", "Density", "Strain rate"],
      ["A material that stretches a lot before breaking is...", "Ductile", "Brittle", "Rigid"],
      ["Glass snaps with very little stretch. It is...", "Brittle", "Ductile", "Elastic forever"],
      ["After the ultimate strength, the sample often forms a narrow region called a...", "Neck", "Yield", "Hinge"],
      ["A stiffer material has a ___ slope in the elastic region.", "Steeper", "Flatter", "Negative"]
    ], () => {
      const L = pick([100, 200, 400, 500, 1000]), p = ri(1, 5), dL = L * p / 100;
      return pick([
        Q(`A ${L} mm rod is stretched by ${dL} mm. What is the strain as a percent?`, "📏", p, ["Strain compares the stretch with the original length.", "Divide the stretch by the original length, then convert to percent.", "Example: 5 mm on a 250 mm rod: 5 ÷ 250 = 0.02, which is 2%. Now do yours."]),
        Q(`A ${L} mm rod has a strain of ${p}%. How many millimeters did it stretch?`, "📏", dL, ["Percent strain tells the stretch as a share of the length.", "Turn the percent into a decimal and multiply by the length.", "Example: 3% of a 200 mm rod is 6 mm. Now do yours."])
      ]);
    }),
    gen("Continuity of flow", [
      ["Same water, narrower pipe", "🚰", "Water cannot pile up or vanish. The flow rate stays the same: <b>A₁ × v₁ = A₂ × v₂</b> (area times speed)."],
      ["Narrow means fast", "⚡", "If a pipe narrows to half the area, the water speeds up to double. A garden hose nozzle works this way."],
      ["Diameter", "⭕", "Area grows with the square of the diameter. Halve the diameter and the area is a quarter, so the speed is 4 times larger."]
    ], () => {
      const o = until(() => { const A1 = pick([20, 30, 40, 60]), v1 = pick([2, 3, 4, 5]), A2 = pick([5, 10, 15, 20]); return (A1 * v1) % A2 === 0 && A1 !== A2 ? { A1, v1, A2 } : null; });
      const dd = pick([[6, 3], [4, 2], [9, 3], [8, 4], [10, 5]]), v = ri(2, 5), A = ri(2, 5), vv = ri(2, 6);
      return pick([
        Q(`Water flows at ${o.v1} m/s through a pipe of ${o.A1} cm² that narrows to ${o.A2} cm². What is the speed in the narrow part in m/s?`, "🚰", (o.A1 * o.v1) / o.A2, ["The flow rate (area × speed) stays constant.", "Multiply area by speed in the wide part, then divide by the narrow area.", "Example: 10 cm² at 2 m/s narrowing to 5 cm²: 20 ÷ 5 = 4 m/s. Now do yours."]),
        Q(`Water flows at ${(o.A1 * o.v1) / o.A2} m/s in a ${o.A2} cm² pipe that widens to ${o.A1} cm². What is the speed in the wide part in m/s?`, "🚰", o.v1, ["The flow rate (area × speed) stays constant.", "Multiply area by speed in the narrow part, then divide by the wide area.", "Example: 5 cm² at 8 m/s widening to 20 cm²: 40 ÷ 20 = 2 m/s. Now do yours."]),
        Q(`A pipe of diameter ${dd[0]} cm narrows to ${dd[1]} cm. Water in the wide part moves at ${vv} m/s. How fast does it move in the narrow part in m/s?`, "⭕", vv * (dd[0] / dd[1]) ** 2, ["Area depends on the diameter squared.", "The speed grows by the square of the diameter ratio.", "Example: diameter 6 cm to 2 cm at 1 m/s: ratio 3, squared 9, so 9 m/s. Now do yours."]),
        Q(`A pipe has a cross-section of ${A} m² and water moves at ${v} m/s. What is the flow rate in m³/s?`, "💧", A * v, ["Flow rate combines area and speed.", "Multiply them.", "Example: 3 m² at 4 m/s gives 12 m³/s. Now do yours."]),
        Q("A river narrows between two cliffs. What happens to the speed of the water there?", "🏞️", "It speeds up", ["The same amount of water must squeeze through.", "A smaller area needs a higher speed to carry the same flow.", "Example: pinching a hose makes the water shoot out faster. Now do yours."], ["It speeds up", "It slows down", "It stays exactly the same"])
      ]);
    }),
    gen("Battery C-rate", [
      ["Capacity", "🔋", "Battery <b>capacity</b> is measured in amp-hours (Ah) or milliamp-hours (mAh). A 2 Ah battery can supply 2 A for 1 hour."],
      ["C-rate", "⚡", "The <b>C-rate</b> tells how fast a battery is used: C-rate = current ÷ capacity. At <b>1C</b> a battery empties in 1 hour; at <b>2C</b> in half an hour; at 0.5C in 2 hours."],
      ["Why it matters", "🌡️", "High C-rates heat a battery and wear it out faster. Fast chargers and power tools need batteries built for it."]
    ], () => {
      const cap = ri(1, 6), c = pick([2, 3, 4, 5, 6]), cr = pick([2, 4, 5, 10]), I = ri(2, 5) * cap;
      return pick([
        Q(`A ${cap} Ah battery is discharged at ${c}C. How many amps flow?`, "🔋", cap * c, ["The C-rate is a multiple of the capacity number.", "Multiply the capacity in Ah by the C-rate.", "Example: a 3 Ah battery at 2C supplies 6 A. Now do yours."]),
        Q(`A battery rated ${cap} Ah is discharged at ${I} A. What is the C-rate?`, "⚡", I / cap, ["C-rate compares current with capacity.", "Divide the current by the capacity.", "Example: 12 A from a 4 Ah battery is 3C. Now do yours."]),
        Q(`A battery is discharged at ${cr}C. How many minutes until it is empty?`, "⏱️", 60 / cr, ["At 1C a battery lasts 60 minutes.", "Divide 60 minutes by the C-rate.", "Example: at 3C it lasts 20 minutes. Now do yours."]),
        Q(`A ${cap * 1000} mAh phone battery is charged at 1C. How many milliamps flow?`, "📱", cap * 1000, ["1C means the current number matches the capacity number.", "Use the capacity figure as the current.", "Example: 800 mAh at 1C is 800 mA. Now do yours."]),
        Q(`A battery is charged at 0.5C. How many hours does a full charge take?`, "🔌", 2, ["Half the C-rate means a slower charge.", "Divide one hour by the C-rate.", "Example: at 0.25C a charge takes 4 hours. Now do yours."]),
        Q(`A power tool pack of ${cap} Ah must give ${cap * c} A. What C-rate must the battery support?`, "🛠️", c, ["Compare the current needed with the capacity.", "Divide current by capacity.", "Example: 20 A from a 5 Ah pack: 4C. Now do yours."])
      ]);
    }),
    gen("Boolean expressions", [
      ["True and false", "🔀", "Logic uses <b>true</b> and <b>false</b>. AND is true only when both inputs are true. OR is true when at least one is true. NOT flips the value."],
      ["Order", "🧮", "Work inside brackets first, then NOT, then AND, then OR. Example with A = true, B = false: (A AND B) is false, so NOT (A AND B) is true."],
      ["Used in code", "💻", "Programs use these in if-statements, like: if (door_closed AND NOT alarm_off). Engineers check all input combinations in a truth table."]
    ], () => {
      const A = Math.random() < 0.5, B = Math.random() < 0.5, C = Math.random() < 0.5, tf = x => x ? "true" : "false";
      const ex = pick([
        ["(A AND B) OR C", (A && B) || C], ["A AND (B OR C)", A && (B || C)], ["NOT A AND B", !A && B], ["A OR (B AND C)", A || (B && C)],
        ["NOT (A OR B)", !(A || B)], ["(A OR B) AND NOT C", (A || B) && !C], ["NOT (A AND B) OR C", !(A && B) || C], ["A AND B AND NOT C", A && B && !C]
      ]);
      return Q(`A = ${tf(A)}, B = ${tf(B)}, C = ${tf(C)}. What is ${ex[0]}?`, "🔀", tf(ex[1]), ["Work out the smallest pieces first.", "Do the brackets, then NOT, then AND, then OR, writing each result.", "Example: A = true, B = false: A OR B is true, and NOT of that is false. Now do yours."], ["true", "false"]);
    }),
    gen("Flip-flops and states", [
      ["Memory in hardware", "🧠", "A <b>flip-flop</b> is a circuit that remembers one bit (0 or 1). It changes only when a clock pulse arrives."],
      ["Many flip-flops", "🔢", "n flip-flops together can hold 2<sup>n</sup> different states. Three flip-flops give 8 states (000 to 111), enough for a counter from 0 to 7."],
      ["Counters wrap", "🔄", "A 3-bit counter goes 0,1,...7 and then wraps back to 0. After p pulses it shows <b>p mod 8</b>, the remainder after dividing by 8."]
    ], () => {
      const n = ri(2, 6), k = ri(3, 6), nn = ri(3, 5), pulses = (2 ** nn) * ri(1, 3) + ri(1, 2 ** nn - 1), c = pick([[5, 3], [9, 4], [17, 5], [40, 6], [100, 7], [200, 8]]);
      return pick([
        Q(`How many different states can ${n} flip-flops hold together?`, "🧠", 2 ** n, ["Each flip-flop has two possible values.", "Multiply two by itself once for each flip-flop.", "Example: 4 flip-flops give 2 × 2 × 2 × 2 = 16 states. Now do yours."]),
        Q(`A counter must have ${2 ** k} states. How many flip-flops does it need?`, "🔢", k, ["Ask which power of two equals the number of states.", "Find the exponent that gives the state count.", "Example: 32 states need 5 flip-flops, since 2 to the 5th is 32. Now do yours."]),
        Q(`A ${nn}-bit counter starts at 0 and receives ${pulses} pulses. What value does it show?`, "🔄", pulses % (2 ** nn), ["The counter wraps back to zero after its biggest value.", "Divide the pulses by the number of states and keep the remainder.", "Example: a 2-bit counter has 4 states; 11 pulses give remainder 3. Now do yours."]),
        Q(`At least how many flip-flops are needed to count up to ${c[0]} different states?`, "🔢", c[1], ["Find a power of two that is large enough.", "Try powers of two until one is at least the number of states.", "Example: 20 states: 16 is too few, 32 is enough, so 5 flip-flops. Now do yours."]),
        Q(`A register has 8 flip-flops. How many bytes can it store?`, "💾", 1, ["A byte is a standard group of bits.", "Count the number of bits in one byte.", "Example: 16 flip-flops would store 2 bytes. Now do yours."])
      ]);
    }),
    gen("Serial communication", [
      ["Bits in a line", "📡", "<b>Serial</b> communication sends bits one after another on a wire. The speed is the <b>baud rate</b> (about bits per second)."],
      ["Frames", "🖼️", "A common frame (8N1) has 1 start bit, 8 data bits and 1 stop bit: <b>10 bits per byte</b>. At 9600 baud that is 960 bytes per second."],
      ["Protocols", "🔌", "<b>UART</b> uses two wires and agreed speed. <b>I²C</b> uses two shared wires and device addresses. <b>SPI</b> is faster and uses extra select wires."]
    ], () => {
      const bd = pick([1000, 2000, 4800, 9600, 19200]), sec = ri(2, 6), bytes = (bd / 10) * sec;
      return pick([
        Q(`A serial link runs at ${bd} baud with 10 bits per byte. How many bytes per second can it send?`, "📡", bd / 10, ["Each byte needs more than 8 bits on the wire.", "Divide the baud rate by the bits in a frame.", "Example: 4000 baud with 10 bits per byte is 400 bytes per second. Now do yours."]),
        Q(`A serial link at ${bd} baud uses 10 bits per byte. How many seconds does it take to send ${bytes} bytes?`, "⏱️", sec, ["First find how many bytes pass each second.", "Divide the number of bytes by the bytes per second.", "Example: 800 bytes at 400 bytes per second takes 2 s. Now do yours."]),
        Q(`A frame has 1 start bit, 8 data bits, 1 parity bit and 1 stop bit. How many bits are in the frame?`, "🖼️", 11, ["Count every kind of bit in the frame.", "Add them all together.", "Example: 1 start, 7 data and 1 stop is 9 bits. Now do yours."]),
        Q(`How many data bits are carried in ${sec} frames of the 8N1 format (8 data bits each)?`, "🔢", sec * 8, ["Only some bits in a frame are data.", "Multiply the data bits per frame by the number of frames.", "Example: 5 frames carry 40 data bits. Now do yours."]),
        Q("Which protocol uses a shared pair of wires and device addresses?", "🔌", "I²C", ["Think about how many devices can share the same wires.", "Addresses let a controller talk to one device at a time on a shared bus.", "Example: classroom students all hear the teacher but only answer to their own name. Now do yours."], ["I²C", "Morse code", "USB-C power only"])
      ]);
    }),
    gen("Parity and checksums", [
      ["Catching mistakes", "🔍", "Data can get flipped by noise. A <b>parity bit</b> is an extra bit added so the number of 1s is even (<b>even parity</b>) or odd."],
      ["Example", "1️⃣", "Data 1011001 has four 1s. For even parity the extra bit is 0 (still even). Data 1011011 has five 1s, so the parity bit must be 1."],
      ["Checksum", "➕", "A <b>checksum</b> adds up the data in a simple way and sends the result too. If the receiver's sum differs, something went wrong."]
    ], () => {
      const bits = Array.from({ length: 7 }, () => ri(0, 1)), ones = bits.reduce((x, y) => x + y, 0), digs = [ri(1, 9), ri(1, 9), ri(1, 9), ri(1, 9)], sm = digs.reduce((x, y) => x + y, 0);
      return pick([
        Q(`Data bits ${bits.join("")}. With even parity, what should the parity bit be?`, "🔍", ones % 2, ["Count how many ones are in the data.", "The parity bit makes the total number of ones even.", "Example: 1100000 has two ones, so it needs a 0. Now do yours."], [0, 1]),
        Q(`How many 1s are in the bits ${bits.join("")}?`, "1️⃣", ones, ["Look at each bit one at a time.", "Count only the ones.", "Example: 1010101 has four ones. Now do yours."]),
        Q(`A checksum is the sum of the digits. The data is ${digs.join(", ")}. What is the checksum?`, "➕", sm, ["Combine all the digits.", "Add them one after another.", "Example: 2, 5 and 7 give 14. Now do yours."]),
        Q(`A checksum is the sum of the digits mod 10 (just the last digit). Data: ${digs.join(", ")}. What is the checksum?`, "🔢", sm % 10, ["First total the digits.", "Keep only the ones digit of the total.", "Example: digits 7, 8 and 9 total 24, so the checksum is 4. Now do yours."]),
        (() => { const t = ri(3, 8); return Q(`Even parity is used. A received byte has ${t} ones in total (including the parity bit). Was an error detected?`, "🚨", t % 2 ? "Yes" : "No", ["With even parity the total number of ones should be even.", "Check whether the count of ones is even or odd.", "Example: 9 ones in total with even parity means a bit flipped, so an error is detected. Now do yours."], ["Yes", "No"]); })()
      ]);
    }),
    gen("Run-length encoding", [
      ["Squeezing repeats", "🗜️", "<b>Run-length encoding</b> (RLE) compresses repeated characters by writing a count and the character. AAAABB becomes 4A2B."],
      ["Good for", "🖼️", "RLE works well on simple pictures with long runs of the same color, like icons and fax pages. It works badly on data with no repeats, where it can even make files bigger."],
      ["Decoding", "🔓", "To decode, read the count and write the letter that many times: 3C1D becomes CCCD."]
    ], () => {
      const L = shuf("ABCDEFGHKMNPRSTXYZ".split("")), runs = ri(2, 4), cs = Array.from({ length: runs }, () => ri(2, 6)), letters = L.slice(0, runs);
      const raw = cs.map((c, i) => letters[i].repeat(c)).join(""), enc = cs.map((c, i) => c + letters[i]).join("");
      const total = cs.reduce((x, y) => x + y, 0);
      return pick([
        Qt(`Run-length encode this string: ${raw}`, "🗜️", enc, ["Group the same letters that sit side by side.", "For each group write how many there are, then the letter, with no spaces.", "Example: WWWBB becomes 3W2B. Now do yours."]),
        Qt(`Decode this run-length code into the original string: ${enc}`, "🔓", raw, ["Each number tells how many times to repeat the letter after it.", "Write each letter that many times in order.", "Example: 2X3Y becomes XXYYY. Now do yours."]),
        Q(`How many characters long is the original string for the code ${enc}?`, "📏", total, ["Each number is how many letters come from that part.", "Add up all the counts.", "Example: 3A5B stands for 8 letters in total. Now do yours."]),
        Q(`The string ${raw} is encoded as ${enc}. How many characters does the encoding take?`, "🔢", enc.length, ["Count each digit and each letter in the code.", "Each run uses one digit and one letter here.", "Example: 4W2B has 4 characters. Now do yours."]),
        Q(`The string ${raw} is ${total} characters long. Its code ${enc} is ${enc.length} characters long. How many characters are saved?`, "💾", total - enc.length, ["Compare the two lengths.", "Subtract the shorter from the longer.", "Example: 20 characters shrinking to 6 saves 14. Now do yours."])
      ]);
    }),
    mcl("Version control", [
      ["Save points", "📸", "<b>Version control</b> (like Git) keeps the full history of a project. A <b>commit</b> is a saved snapshot with a message about what changed."],
      ["Branches", "🌿", "A <b>branch</b> lets you try a new feature without breaking the main code. When it works, you <b>merge</b> it back. If two people changed the same line, you fix a <b>merge conflict</b> by choosing what to keep."],
      ["Teamwork", "🤝", "A <b>repository</b> stores the project. You <b>clone</b> a copy, <b>push</b> your commits to share them and <b>pull</b> others' work. You can <b>revert</b> to an older version if something breaks."]
    ], ["Think about what each word does to the project history.", "Snapshots, side paths, combining, and sharing each have their own name.", "Example: copying a document before a big edit is like making a branch, and combining the edits later is like a merge. Now do yours."], [
      ["A saved snapshot of the project with a message is a...", "Commit", "Branch", "Conflict"],
      ["You want to try a new feature without risking the main code. You create a...", "Branch", "Backup of the monitor", "New repository for every line"],
      ["Combining the work from one branch into another is called...", "Merging", "Cloning", "Compiling"],
      ["Two people changed the same line differently. This causes a...", "Merge conflict", "Fast commit", "Clone"],
      ["A new bug appeared after the last commit. You can go back to a working version by...", "Reverting", "Deleting the whole project", "Renaming the files"],
      ["Getting a full copy of a repository onto your computer is called...", "Cloning", "Pushing", "Debugging"],
      ["Sending your commits to the shared repository is called...", "Pushing", "Pulling", "Forking the wires"],
      ["A good commit message should...", "Say briefly what changed and why", "Be left empty", "Contain only the word 'stuff'"]
    ]),
    mcl("Agile and waterfall", [
      ["Waterfall", "🌊", "<b>Waterfall</b> does the steps in order: requirements, design, build, test, release. It is clear but hard to change late in the project."],
      ["Agile", "🔁", "<b>Agile</b> works in short cycles called <b>sprints</b> (often 1-4 weeks). Each sprint builds a small working piece, gets feedback and plans the next one."],
      ["Scrum words", "🗣️", "A <b>backlog</b> is the to-do list. A <b>daily stand-up</b> is a short team check-in. A <b>retrospective</b> looks at what to improve. An <b>MVP</b> is a minimum viable product, the simplest version that is useful."]
    ], ["Decide whether the description is one long ordered plan or short repeating cycles.", "Agile means frequent feedback; waterfall means finishing each phase before the next.", "Example: baking one huge cake in one go is like waterfall; baking and tasting small cupcakes first is like agile. Now do yours."], [
      ["A short work cycle in agile, often 1-4 weeks, is called a...", "Sprint", "Waterfall", "Backlog"],
      ["The list of things the team might build is the...", "Backlog", "Retrospective", "Sprint wall"],
      ["A quick daily team check-in is called a...", "Stand-up", "Release party", "Merge"],
      ["Looking back at a sprint to decide how to improve is a...", "Retrospective", "Prototype", "Requirement"],
      ["Which method does design, build and test in strict order?", "Waterfall", "Agile", "Scrum"],
      ["Which method is better when requirements keep changing?", "Agile", "Waterfall", "Neither can handle change"],
      ["A simple first version that real users can try is a(n)...", "Minimum viable product", "Final inspection", "Debug log"],
      ["Why show a working piece to users each sprint?", "To get feedback early", "To avoid testing", "To skip planning"]
    ]),
    gen("Moving shapes in CAD", [
      ["Transformations", "🖱️", "CAD programs move shapes with numbers. <b>Translate</b> adds to coordinates: (x, y) moved by (3, 2) becomes (x + 3, y + 2)."],
      ["Scale and mirror", "🔍", "<b>Scale</b> by k multiplies coordinates (and lengths) by k; areas grow by k². <b>Mirror</b> across a vertical line x = m turns x into 2m - x."],
      ["Why numbers", "🧮", "Because every move is arithmetic, a computer can copy, resize and flip thousands of parts exactly."]
    ], () => {
      const x = ri(2, 9), y = ri(2, 9), dx = ri(1, 8), dy = ri(1, 8), k = ri(2, 4), w = ri(2, 6), h = ri(2, 6), m = ri(6, 10), xm = ri(1, m - 1);
      return pick([
        Q(`A corner is at (${x}, ${y}). It is translated by (${dx}, ${dy}). What is the new x coordinate?`, "📍", x + dx, ["Translating adds to the coordinates.", "Add the x-move to the old x.", "Example: (5, 2) moved by (3, 4) has new x = 8. Now do yours."]),
        Q(`A corner is at (${x}, ${y}). It is translated by (${dx}, ${dy}). What is the new y coordinate?`, "📍", y + dy, ["Translating adds to the coordinates.", "Add the y-move to the old y.", "Example: (5, 2) moved by (3, 4) has new y = 6. Now do yours."]),
        Q(`A point at (${x}, ${y}) is scaled by ${k} from the origin. What is the new x coordinate?`, "🔍", x * k, ["Scaling multiplies coordinates.", "Multiply the old x by the scale factor.", "Example: (3, 4) scaled by 5 has new x = 15. Now do yours."]),
        Q(`A ${w} by ${h} rectangle is scaled by ${k} in every direction. What is its new area?`, "▭", w * h * k * k, ["Both sides grow by the scale factor.", "Find the new width and height, then multiply them.", "Example: a 2 by 3 rectangle scaled by 5 is 10 by 15, area 150. Now do yours."]),
        Q(`A part at x = ${xm} is mirrored across the vertical line x = ${m}. What is its new x?`, "🪞", 2 * m - xm, ["A mirrored point lands the same distance on the other side of the line.", "Use 2 times the mirror line position, minus the old x.", "Example: x = 3 mirrored across x = 8 lands at 13. Now do yours."]),
        Q(`A line segment ${w * k} units long is scaled by ${k}. What is its new length in units?`, "📏", w * k * k, ["Lengths are multiplied by the scale factor.", "Multiply the length by the factor.", "Example: 6 units scaled by 4 is 24 units. Now do yours."])
      ]);
    }),
    gen("Energy audits", [
      ["Finding savings", "🔎", "An <b>energy audit</b> measures where energy is used and how to save. Energy (kWh) = power (kW) × hours. Watts ÷ 1000 gives kilowatts."],
      ["Example", "💡", "Swap a 100 W bulb for a 20 W LED used 1000 hours a year: saves 80 W × 1000 h = 80,000 Wh = 80 kWh."],
      ["Money", "💲", "Cost = kWh × price per kWh. At 10 cents per kWh, 80 kWh saves $8. Standby devices also use energy all day."]
    ], () => {
      const Wold = pick([60, 75, 100, 150]), Wnew = pick([10, 15, 20, 25]), hrs = pick([1000, 2000, 4000]), hd = ri(2, 6), pr = pick([[100, 25], [80, 20], [60, 15], [100, 20], [50, 10], [40, 10], [200, 50], [150, 30], [100, 40], [60, 12]]), price = pick([10, 20, 25]), stb = pick([2, 4, 5, 10]), days = pick([125, 250, 500]);
      const kwh = (Wold - Wnew) * hrs / 1000;
      return pick([
        Q(`A ${Wold} W bulb is replaced with a ${Wnew} W LED, used ${hrs} hours a year. How many kWh are saved in a year?`, "💡", rd(kwh), ["Find the power saved first.", "Multiply the watts saved by the hours, then divide by 1000 to get kWh.", "Example: saving 50 W over 2000 hours is 100,000 Wh = 100 kWh. Now do yours."]),
        Q(`Switching to LEDs saves ${hrs / 10} kWh a year. Electricity costs ${price} cents per kWh. How many dollars are saved?`, "💲", rd(hrs / 10 * price / 100), ["Cost is energy times price.", "Multiply kWh by cents, then divide by 100 to get dollars.", "Example: 70 kWh at 10 cents is 700 cents, which is $7. Now do yours."]),
        Q(`A device uses ${stb} W on standby all day, every day. How many kWh does it use in ${days} days?`, "🔌", rd(stb * 24 * days / 1000), ["Standby runs for twenty-four hours each day.", "Multiply watts by hours in all those days, then divide by 1000.", "Example: 10 W for 1000 hours is 10 kWh. Now do yours."]),
        Q(`An old appliance uses ${pr[0]} W and a new one uses ${pr[1]} W for the same job. By what percent is the power use cut?`, "📉", Math.round((pr[0] - pr[1]) / pr[0] * 100), ["Percent saved compares the saving with the old use.", "Divide the power saved by the old power and multiply by 100.", "Example: 90 W cut to 45 W saves 50%. Now do yours."]),
        Q(`A 1 kW heater runs ${hd} hours a day. Electricity costs ${price} cents per kWh. How many cents does it cost per day?`, "♨️", hd * price, ["Energy in kWh = kW × hours.", "Then multiply the energy by the price per kWh.", "Example: 7 hours at 10 cents per kWh costs 70 cents. Now do yours."])
      ]);
    })
  ];
  b[18] = mix("Mixed practice", at(b, [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 16, 17]));
  b[19] = mix("Level 23 Challenge", at(b, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));

  // ================= LEVEL 24 =================
  const c = [
    mcl("Verification and validation", [
      ["Two questions", "❓", "<b>Verification</b>: Did we build the product <i>right</i>? Does it meet the written specification? <b>Validation</b>: Did we build the <i>right</i> product? Does it actually meet the user's real needs?"],
      ["The V-model", "✌️", "The V-model pairs each design stage with a test stage. Requirements are checked by acceptance tests, system design by system tests, and small parts by unit tests."],
      ["Methods", "🧪", "Verification uses inspections, measurements and tests against the spec. Validation uses real users, field trials and prototypes in real conditions."]
    ], ["Ask whether the check compares with the written spec or with what people really need.", "Spec checks are about building it correctly; user-need checks are about building the correct thing.", "Example: measuring that a toaster heats to the specified temperature checks the spec; asking families if it makes toast they like checks the need. Now do yours."], [
      ["Engineers measure that a bridge carries the load written in the spec. This is...", "Verification", "Validation", "Marketing"],
      ["Real users try a prototype to see if it solves their problem. This is...", "Validation", "Verification", "Maintenance"],
      ["'Did we build the product right?' is the question of...", "Verification", "Validation", "Recycling"],
      ["'Did we build the right product?' is the question of...", "Validation", "Verification", "Documentation"],
      ["A product passes every spec test but customers cannot use it. What was missing?", "Validation", "Verification", "A bigger budget"],
      ["In the V-model, unit tests check...", "Small individual parts", "The whole user experience in the field", "The company's profits"],
      ["In the V-model, acceptance tests check...", "The original requirements and user needs", "A single line of code only", "The color of the logo"],
      ["Inspecting a drawing against the specification is...", "Verification", "Validation", "Destruction testing"]
    ]),
    gen("Chained amplifiers", [
      ["Gain multiplies", "📶", "A system is often a chain of stages. Each has a <b>gain</b> (output ÷ input). The total gain is the <b>product</b> of the stage gains."],
      ["Losses", "📉", "A loss is a gain below 1. A cable that halves a signal has a gain of 0.5. Gain 10 then gain 0.5 gives 10 × 0.5 = 5."],
      ["Working back", "🔁", "If the total gain is known, divide it by the gains you know to find the missing stage."]
    ], () => {
      const g1 = ri(2, 9), g2 = ri(2, 9), g3 = ri(2, 5), vin = ri(1, 9) * 10, tot = g1 * g2;
      return pick([
        Q(`Two amplifier stages have gains of ${g1} and ${g2}. What is the total gain?`, "📶", g1 * g2, ["Stages in a chain multiply their effects.", "Combine the gains with multiplication.", "Example: gains 4 and 6 give 24. Now do yours."]),
        Q(`Three stages have gains of ${g1}, ${g2} and ${g3}. What is the total gain?`, "📶", g1 * g2 * g3, ["Stages in a chain multiply their effects.", "Multiply all three gains together.", "Example: gains 2, 3 and 5 give 30. Now do yours."]),
        Q(`A ${vin} mV signal goes into a chain with total gain ${g3}. How many mV come out?`, "🔊", vin * g3, ["Output equals input times gain.", "Multiply the input by the total gain.", "Example: 20 mV with gain 7 gives 140 mV. Now do yours."]),
        Q(`A chain has a total gain of ${tot}. The first stage has a gain of ${g1}. What gain does the second stage need?`, "🔁", g2, ["The total is the first gain times the second.", "Divide the total by the known stage.", "Example: total 45, first stage 5: second stage 9. Now do yours."]),
        Q(`A ${vin * 2} mV signal loses half its size in a cable, then passes through an amplifier of gain ${g3}. How many mV come out?`, "📡", vin * g3, ["Treat the cable as a stage with a gain below one.", "Halve the signal first, then multiply by the amplifier gain.", "Example: 80 mV halved to 40, then gain 6: 240 mV. Now do yours."]),
        Q(`A signal of ${vin} mV goes through a stage of gain ${g1} and then a stage of gain ${g2}. How many mV come out?`, "📈", vin * g1 * g2, ["Work stage by stage.", "Multiply the input by the first gain, then by the second.", "Example: 10 mV through gains 2 and 3: 20 then 60 mV. Now do yours."])
      ]);
    }),
    gen("Closed-loop gain", [
      ["Feedback loop", "🔁", "In a control system with <b>negative feedback</b>, part of the output (the fraction H) is fed back and subtracted from the input. The forward gain is G."],
      ["The formula", "🧮", "Closed-loop gain = <b>G ÷ (1 + G×H)</b>. The loop gain is G×H. Example: G = 20, H = 0.2: loop gain 4, so 20 ÷ 5 = 4."],
      ["Why use it", "🎯", "With a big loop gain the result is about 1 ÷ H, no matter how G drifts. Feedback makes systems accurate and steady."]
    ], () => {
      const t = pick([[20, 0.2, 4], [10, 0.1, 5], [18, 0.5, 2], [12, 0.25, 3], [16, 0.25, 3.2], [8, 0.5, 1.6]]), big = pick([[1000, 0.1, 10], [500, 0.2, 5], [200, 0.5, 2], [1000, 0.01, 100]]);
      const opts = [big[2], big[2] * 2, big[2] / 2];
      return pick([
        Q(`A system has a forward gain G = ${t[0]} and feedback fraction H = ${t[1]}. What is the loop gain G × H?`, "🔁", rd(t[0] * t[1]), ["The loop gain multiplies the forward path and the feedback path.", "Multiply G by H.", "Example: G = 70 and H = 0.1 give a loop gain of 7. Now do yours."]),
        Q(`A system has G = ${t[0]} and H = ${t[1]}. What is the closed-loop gain G ÷ (1 + G×H)?`, "🎯", t[2], ["Find the loop gain first.", "Add one to the loop gain, then divide G by that.", "Example: G = 30, H = 0.1: loop gain 3, so 30 ÷ 4 = 7.5. Now do yours."]),
        Q(`A system has G = ${t[0]} and H = ${t[1]}. What is 1 + G × H?`, "➕", rd(1 + t[0] * t[1]), ["Find the loop gain first.", "Then add one.", "Example: G = 50, H = 0.1: loop gain 5, so 1 + 5 = 6. Now do yours."]),
        Q(`An amplifier has a huge gain G = ${big[0]} with feedback fraction H = ${big[1]}. About what is the closed-loop gain (about 1 ÷ H)?`, "📐", big[2], ["With a very large loop gain, the gain depends almost only on the feedback.", "Divide one by the feedback fraction.", "Example: H = 0.25 gives about 4. Now do yours."], [big[2], big[2] * 2, rd(big[2] / 2)]),
        Q("Negative feedback in an amplifier makes the gain...", "🎛️", "More stable and predictable", ["Think about what feedback does to drift and errors.", "The output is compared with what we want and corrected.", "Example: a thermostat corrects the temperature rather than letting it drift. Now do yours."], ["More stable and predictable", "Wildly unpredictable", "Always infinite"])
      ]);
    }),
    mcl("Positive and negative feedback", [
      ["Negative feedback", "⚖️", "<b>Negative feedback</b> opposes change and keeps things steady: thermostats, cruise control, and the way your body keeps its temperature."],
      ["Positive feedback", "📢", "<b>Positive feedback</b> pushes in the same direction as the change, so it grows. A microphone too close to its speaker squeals as the sound is fed back and amplified."],
      ["Using both", "🎛️", "Most control uses negative feedback for stability. Positive feedback is used where fast switching is wanted, such as a Schmitt trigger that avoids chatter, or in oscillators."]
    ], ["Ask whether the output is pushing back against the change or pushing the change along.", "One kind corrects errors; the other makes them grow.", "Example: a ball rolling in a bowl returns to the middle, but a ball on top of a hill rolls farther away. Now do yours."], [
      ["A thermostat turns the heater off when the room is warm enough. This is...", "Negative feedback", "Positive feedback", "No feedback"],
      ["A microphone squeals when held near its loudspeaker. This is...", "Positive feedback", "Negative feedback", "Damping"],
      ["Cruise control adds fuel when the car slows on a hill. This is...", "Negative feedback", "Positive feedback", "A coincidence"],
      ["Which feedback tends to keep a system steady?", "Negative feedback", "Positive feedback", "Neither"],
      ["Which feedback can make a system run away to extremes?", "Positive feedback", "Negative feedback", "Neither"],
      ["A snowball rolling downhill picks up snow and grows faster. This is like...", "Positive feedback", "Negative feedback", "A thermostat"],
      ["In a feedback system, the measured output is...", "Compared with the desired value", "Ignored completely", "Thrown away every time"],
      ["A body sweating to cool down when it is hot is...", "Negative feedback", "Positive feedback", "A software bug"]
    ]),
    gen("Mean time between failures", [
      ["Reliability numbers", "🔧", "<b>MTBF</b> (mean time between failures) is the average running time between breakdowns of a repairable item. A bigger MTBF means more reliable."],
      ["Failure rate", "📊", "The failure rate is about <b>1 ÷ MTBF</b>. If the MTBF is 1000 hours, expect about 1 failure per 1000 hours. In time T, expect T ÷ MTBF failures."],
      ["Systems in series", "⛓️", "If any one part failing stops the whole system, the failure rates <b>add</b>. Two parts with MTBF 1000 h each give a system MTBF of 500 h."]
    ], () => {
      const M = pick([200, 250, 500, 1000, 2000]), k = ri(2, 9), p = pick([[600, 300, 200], [1000, 1000, 500], [400, 400, 200], [300, 150, 100], [1200, 600, 400], [900, 450, 300]]), nu = ri(2, 6) * 5, hrs = pick([200, 500, 1000]), fl = pick([2, 4, 5, 10]);
      return pick([
        Q(`A pump has an MTBF of ${M} hours. About how many failures are expected in ${M * k} hours?`, "🔧", k, ["Failures are expected about once every MTBF.", "Divide the running time by the MTBF.", "Example: MTBF 300 h over 1500 h gives 5 failures. Now do yours."]),
        Q(`A sensor has an MTBF of ${M} hours. About how many failures per 1000 hours is that?`, "📊", rd(1000 / M), ["Failure rate is the reverse of MTBF.", "Divide 1000 hours by the MTBF.", "Example: MTBF 125 h gives 8 failures per 1000 h. Now do yours."]),
        Q(`${nu} identical units ran for ${hrs} hours each (${nu * hrs} unit-hours in total) and ${fl} failures happened. What is the MTBF in hours?`, "🧮", rd(nu * hrs / fl), ["MTBF is total running time divided by failures.", "Multiply units by hours, then divide by the number of failures.", "Example: 10 units for 100 h each with 5 failures: 1000 ÷ 5 = 200 h. Now do yours."]),
        Q(`Two parts in series have MTBFs of ${p[0]} h and ${p[1]} h. What is the MTBF of the whole system in hours?`, "⛓️", p[2], ["In series, failure rates add.", "Add 1 ÷ MTBF for each part, then flip the total.", "Example: parts of 100 h and 100 h in series give 50 h. Now do yours."]),
        Q("Two parts are wired in series. The system MTBF compared with one part alone is...", "⛓️", "Lower", ["Think about how many things can cause a stop.", "Each added part brings another chance of failure.", "Example: a chain with more links has more places to break. Now do yours."], ["Lower", "Higher", "Exactly the same"])
      ]);
    }),
    gen("Availability and repair", [
      ["Up and down", "🟢", "<b>Availability</b> is the share of time a system works: <b>A = MTBF ÷ (MTBF + MTTR)</b>, where MTTR is the mean time to repair."],
      ["Example", "🧮", "MTBF 90 h and MTTR 10 h: A = 90 ÷ 100 = 90%. Out of every 100 hours, 10 are downtime."],
      ["Two routes", "🛠️", "To raise availability, make parts fail less often (bigger MTBF) or fix them faster (smaller MTTR)."]
    ], () => {
      const a = pick([80, 90, 95, 98, 99]), s = pick([1, 2, 5, 10]), M = a * s, R = (100 - a) * s;
      return pick([
        Q(`A machine has an MTBF of ${M} hours and an MTTR of ${R} hours. What is its availability as a percent?`, "🟢", a, ["Compare the working time with the total cycle time.", "Divide MTBF by (MTBF + MTTR), then change to a percent.", "Example: MTBF 70 h and MTTR 30 h: 70 ÷ 100 = 70%. Now do yours."]),
        Q(`A machine is available ${a}% of the time. How many hours of downtime are expected in ${1000} hours?`, "🔴", (100 - a) * 10, ["Downtime is the share of time it is not available.", "Take the percent that is not available and apply it to 1000 hours.", "Example: 70% available means 30% down, which is 300 h in 1000 h. Now do yours."]),
        Q(`A machine fails every ${M} hours on average (MTBF). Its availability is ${a}%. What is the MTTR in hours?`, "🛠️", R, ["Use the availability formula backwards.", "Total cycle time is MTBF divided by availability; subtract MTBF.", "Example: MTBF 50 h at 50% availability means a cycle of 100 h, so MTTR = 50 h. Now do yours."]),
        Q(`A line has MTBF ${M} h and MTTR ${R} h. A change cuts MTTR to half. Which is true?`, "⚙️", "Availability goes up", ["Less repair time means more time working.", "Check how the formula's bottom part changes.", "Example: if a flat tire is fixed twice as fast, you spend more time driving. Now do yours."], ["Availability goes up", "Availability goes down", "Availability stays the same"]),
        Q("Which action raises availability?", "📈", "Making repairs faster", ["Think about reducing downtime or the number of breakdowns.", "Availability depends on both how often it breaks and how long fixes take.", "Example: a machine that is fixed in minutes instead of days is available more often. Now do yours."], ["Making repairs faster", "Waiting longer before fixing", "Using parts with a smaller MTBF"])
      ]);
    }),
    gen("Pareto-best designs", [
      ["Trade-offs", "⚖️", "Often you cannot improve everything at once: cheaper may be heavier. A design is <b>dominated</b> if another is at least as good on everything and better on something."],
      ["The front", "🏁", "The designs that are not dominated form the <b>Pareto front</b>. These are the sensible candidates; choosing among them depends on priorities."],
      ["How to check", "🔍", "Compare a design with each other design: is there one that is cheaper AND lighter? If yes, it is dominated and can be dropped."]
    ], () => {
      const mk = () => { const cost = shuf([10, 20, 30, 40, 50, 60, 70, 80]).slice(0, 4), wt = shuf([1, 2, 3, 4, 5, 6, 7, 8]).slice(0, 4); return cost.map((c, i) => ({ n: "ABCD"[i], c, w: wt[i] })); };
      const dom = (x, y) => y.c <= x.c && y.w <= x.w && (y.c < x.c || y.w < x.w);
      const lst = ds => ds.map(d => `${d.n}: $${d.c}, ${d.w} kg`).join("; ");
      const o = until(() => { const ds = mk(), dd = ds.filter(x => ds.some(y => y !== x && dom(x, y))); return dd.length === 1 ? { ds, dd } : null; });
      const o2 = mk(), front = o2.filter(x => !o2.some(y => y !== x && dom(x, y)));
      const A = { c: ri(2, 8) * 10, w: ri(2, 8) }, B = { c: ri(2, 8) * 10, w: ri(2, 8) };
      const v = dom(A, B) ? "Yes" : "No";
      return pick([
        Q(`Four designs (cost, weight): ${lst(o.ds)}. Which design is dominated (another is both cheaper and lighter)?`, "📋", o.dd[0].n, ["A dominated design loses to another on both measures.", "Compare each design with the others on cost and weight.", "Example: P: $10, 2 kg; Q: $20, 5 kg. Q is dominated by P. Now check yours."], ["A", "B", "C", "D"]),
        Q(`Four designs (cost, weight): ${lst(o2)}. How many designs are on the Pareto front (not dominated by any other)?`, "🏁", front.length, ["Count the designs that no other design beats on both measures.", "Check each design: is there another that is cheaper and lighter?", "Example: P: $10, 2 kg; Q: $20, 5 kg; R: $30, 1 kg. Q is dominated by P; P and R survive, so 2. Now do yours."]),
        Q(`Design X costs $${A.c} and weighs ${A.w} kg. Design Y costs $${B.c} and weighs ${B.w} kg. Does Y dominate X (Y is at least as good in both, better in one)?`, "🆚", v, ["Compare cost, then weight.", "Y must be no worse on either measure and better on at least one.", "Example: X: $30, 4 kg and Y: $20, 3 kg: Y is cheaper and lighter, so yes. Now do yours."], ["Yes", "No"])
      ]);
    }),
    gen("Fence optimization", [
      ["Most area", "🌾", "With a fixed length of fence, which rectangle holds the most? The <b>square</b> is the best for a free-standing rectangle. Perimeter P gives the maximum area (P ÷ 4)²."],
      ["Next to a wall", "🧱", "If one side is a wall, you need fence for only three sides: 2w + L = F. The best shape has L = F ÷ 2 and w = F ÷ 4, giving area F² ÷ 8."],
      ["Trying values", "📋", "To find a best design, try several values, calculate the result for each, and look for the peak."]
    ], () => {
      const P = 4 * ri(3, 12), F = 4 * ri(3, 12), w = ri(2, 8), P2 = 2 * ri(8, 20), w2 = ri(2, 7);
      return pick([
        Q(`You have ${P} m of fence for a free-standing rectangle. What is the largest area it can enclose, in m²?`, "🌾", (P / 4) ** 2, ["The best rectangle for a fixed perimeter is a special one.", "Make all sides equal, so each side is a quarter of the perimeter; then multiply side by side.", "Example: 100 m of fence: sides of 25 m give 625 m². Now do yours."]),
        Q(`A rectangular pen is built against a long wall with ${F} m of fence on the three open sides. What is the best length (parallel to the wall) for the most area, in m?`, "📐", F / 2, ["The side along the wall should be about twice each of the other sides.", "Take half of the total fence for the long side.", "Example: with 60 m of fence, the best long side is 30 m. Now do yours."]),
        Q(`A rectangular pen is built against a wall with ${F} m of fence on three sides. What is the largest area possible in m²?`, "🧱", F * F / 8, ["Find the best width and length first.", "Use width = F ÷ 4 and length = F ÷ 2, then multiply.", "Example: 100 m of fence: width 25, length 50, area 1250 m². Now do yours."]),
        Q(`A rectangle has a perimeter of ${P2} m and a width of ${w2} m. What is its area in m²?`, "▭", w2 * (P2 / 2 - w2), ["Half the perimeter equals width plus length.", "Find the length by subtracting the width from half the perimeter, then multiply.", "Example: perimeter 50 m, width 10 m: length 15 m, area 150 m². Now do yours."]),
        Q(`A square pen has a side of ${P / 4} m. How many meters of fence go around it?`, "🔲", P, ["A square has four equal sides.", "Multiply the side by four.", "Example: side 25 m needs 100 m. Now do yours."])
      ]);
    }),
    gen("Area under a graph", [
      ["Distance from a graph", "📊", "On a speed-time graph, the <b>area under the line</b> is the distance traveled. A flat line at 5 m/s for 10 s covers 5 × 10 = 50 m."],
      ["Slopes and shapes", "📐", "The slope of a speed graph is the acceleration. A line that rises from 0 to v in t seconds forms a triangle with area ½ × t × v."],
      ["Other graphs", "⚡", "The same trick works elsewhere: area under a force-distance graph is work; area under a power-time graph is energy."]
    ], () => {
      const ac6 = ri(2, 6), v = ri(2, 10) * 2, t = ri(2, 10), t1 = ri(2, 6), t2 = ri(2, 8), t3 = ri(2, 6), v2 = ri(1, 6) * 2, F = ri(2, 10) * 2, d = ri(2, 9), P = ri(2, 9) * 10, tm = ri(2, 9);
      return pick([
        Q(`A robot moves at a steady ${v} m/s for ${t} s. How many meters does it travel (the area under the graph)?`, "🤖", v * t, ["The graph is a flat rectangle.", "Multiply the height by the width.", "Example: 9 m/s for 4 s covers 36 m. Now do yours."]),
        Q(`A cart speeds up steadily from 0 to ${v} m/s in ${t * 2} s. How many meters does it travel (the triangle area)?`, "🛒", v * t, ["The graph makes a triangle.", "Take half of base times height.", "Example: 0 to 7 m/s in 10 s: ½ × 10 × 7 = 35 m. Now do yours."]),
        Q(`A drone speeds up from 0 to ${v2} m/s in ${t1 * 2} s, cruises ${t2} s, then slows to a stop in ${t3 * 2} s. How many meters does it travel in total?`, "🚁", v2 * (t1 + t2 + t3), ["Split the graph into a triangle, a rectangle and another triangle.", "The two triangles add up to the area of one rectangle with the same speed and half the ramp times.", "Example: 0 to 4 m/s in 2 s, cruise 3 s, stop in 2 s: 4 + 12 + 4 = 20 m. Now do yours."]),
        Q(`A force rises steadily from 0 to ${F} N over ${d * 2} m. How many joules of work are done (area under the graph)?`, "💪", F * d, ["The graph is a triangle again.", "Half of the distance times the force.", "Example: 0 to 10 N over 6 m: 30 J. Now do yours."]),
        Q(`A machine uses a constant ${P} W for ${tm} s. How many joules of energy is that (area under the power graph)?`, "⚡", P * tm, ["Area under a power-time graph is energy.", "Multiply power by time.", "Example: 25 W for 4 s is 100 J. Now do yours."]),
        Q(`A speed graph rises from 0 to ${ac6 * t} m/s in ${t} s. What is the acceleration in m/s² (the slope)?`, "📐", ac6, ["The slope is the rise divided by the run.", "Divide the speed gained by the time taken.", "Example: 0 to 20 m/s in 5 s is 4 m/s². Now do yours."])
      ]);
    }),
    gen("Balancing energy and flow", [
      ["Nothing disappears", "⚖️", "For any system: <b>in = out + stored</b>. Energy or material that goes in must come out, be lost, or build up inside."],
      ["Rates", "🔋", "Use rates when things flow steadily. A charger gives 20 W, the device uses 12 W: the battery stores 8 W. In 3 hours that is 24 Wh."],
      ["Efficiency", "📉", "Not all input becomes useful output. Efficiency = useful output ÷ input. The rest is losses, often heat."]
    ], () => {
      const inp = ri(3, 10) * 10, out = ri(1, 2) * 10, h = ri(2, 6), fi = ri(8, 20), fo = ri(2, 7), mn = ri(2, 9), eff = pick([[100, 60], [200, 150], [50, 40], [80, 20], [500, 400]]);
      return pick([
        Q(`A charger supplies ${inp} W and the device uses ${out} W. How many watts go into the battery?`, "🔋", inp - out, ["Input is split between use and storage.", "Subtract the amount used from the amount supplied.", "Example: 25 W supplied and 10 W used leaves 15 W for storage. Now do yours."]),
        Q(`A battery gains ${inp - out} W of net power for ${h} hours. How many Wh are stored?`, "🔌", (inp - out) * h, ["Energy is power times time.", "Multiply the net power by the hours.", "Example: 15 W for 4 h is 60 Wh. Now do yours."]),
        Q(`A tank is filled at ${fi} L/min and drained at ${fo} L/min. How many liters does it gain in ${mn} minutes?`, "🛢️", (fi - fo) * mn, ["Find the net flow first.", "Net flow is inflow minus outflow; multiply by the minutes.", "Example: 25 L/min in, 5 L/min out for 3 min gains 60 L. Now do yours."]),
        Q(`A motor takes in ${eff[0]} W of electrical power and gives out ${eff[1]} W of useful mechanical power. How many watts are lost (mostly as heat)?`, "🔥", eff[0] - eff[1], ["Whatever is not useful output must go somewhere.", "Subtract the useful output from the input.", "Example: 90 W in and 70 W out loses 20 W. Now do yours."]),
        Q(`A motor takes in ${eff[0]} W and gives out ${eff[1]} W of useful power. What is its efficiency as a percent?`, "⚙️", Math.round(eff[1] / eff[0] * 100), ["Efficiency compares useful output with input.", "Divide output by input and multiply by 100.", "Example: 40 W out of 80 W in is 50%. Now do yours."])
      ]);
    }),
    gen("Mixing solutions", [
      ["Concentration", "🧪", "A solution that is 20% salt by mass has 20 g of salt in every 100 g. Salt mass = total mass × concentration."],
      ["Mixing two", "🥣", "When you mix two solutions, the salt adds and the masses add: <b>final % = total salt ÷ total mass</b>. 100 g of 10% plus 100 g of 30% gives (10 + 30) ÷ 200 = 20%."],
      ["Diluting", "💧", "Adding plain water keeps the salt the same but increases the mass: the concentration falls."]
    ], () => {
      const o = until(() => { const m1 = pick([100, 200, 300, 400]), m2 = pick([100, 200, 300, 400]), c1 = ri(1, 9) * 5, c2 = ri(1, 9) * 5; const f = (m1 * c1 + m2 * c2) / (m1 + m2); return Number.isInteger(f) && c1 !== c2 ? { m1, m2, c1, c2, f } : null; });
      const m = pick([100, 200, 400, 500]), c = pick([10, 20, 25, 40]), w = pick([100, 200, 300, 500]), sg = m * c / 100;
      const dil = until(() => { const M = pick([100, 200, 300, 400, 500]), C = pick([10, 20, 30, 40, 50]), W = pick([100, 200, 300, 400, 500]); return (M * C) % (M + W) === 0 ? { M, C, W, F: M * C / (M + W) } : null; });
      return pick([
        Q(`How many grams of salt are in ${m} g of a ${c}% salt solution?`, "🧂", sg, ["Concentration is the share that is salt.", "Multiply the mass by the percent as a share of 100.", "Example: 300 g of a 10% solution holds 30 g of salt. Now do yours."]),
        Q(`${o.m1} g of ${o.c1}% salt solution is mixed with ${o.m2} g of ${o.c2}% salt solution. What is the percent salt in the mix?`, "🥣", o.f, ["Find the salt in each part first.", "Add the salt masses, then divide by the total mass and convert to percent.", "Example: 150 g at 12% plus 50 g at 40%: 18 + 20 = 38 g of salt in 200 g, which is 19%. Now do yours."]),
        Q(`${dil.M} g of ${dil.C}% salt solution is diluted by adding ${dil.W} g of pure water. What is the percent salt now?`, "💧", dil.F, ["Adding water does not change the amount of salt.", "Keep the salt mass, divide it by the new total mass, then make it a percent.", "Example: 250 g at 24% plus 50 g of water: 60 g of salt in 300 g is 20%. Now do yours."]),
        Q(`A tank has ${m} g of ${c}% solution. How many grams of the solution are NOT salt?`, "🛢️", m - sg, ["Part of the mass is salt and the rest is water.", "Find the salt, then subtract from the total.", "Example: 200 g of 25% solution has 50 g of salt, so 150 g is water. Now do yours."]),
        Q(`Mixing equal masses of 10% and 30% solutions gives what percent?`, "⚖️", 20, ["Equal masses mean a simple middle value.", "Find the number halfway between the two.", "Example: equal masses of 20% and 60% give 40%. Now do yours."])
      ]);
    }),
    gen("Heat exchangers", [
      ["Moving heat in water", "♨️", "A <b>heat exchanger</b> passes heat from a hot fluid to a cold one without mixing them. Radiators and car coolers are heat exchangers."],
      ["Heat rate", "🔥", "Heat power = mass flow × specific heat × temperature change. For water c is about 4.2 kJ per kg per °C, so P (kW) = 4.2 × (kg/s) × ΔT."],
      ["Balance", "⚖️", "Heat lost by the hot stream equals heat gained by the cold stream (minus small losses). Equal flows of the same fluid change by equal amounts."]
    ], () => {
      const m = ri(1, 5), dT = pick([5, 10, 15, 20]), P = Math.round(42 * m * dT) / 10, T0 = ri(10, 30), drop = pick([10, 15, 20, 25]), h = pick([60, 70, 80, 90]);
      return pick([
        Q(`Water flows at ${m} kg/s and is heated by ${dT} °C. About how many kW of heat does it absorb? (Use 4.2 kJ per kg per °C.)`, "♨️", P, ["Heat rate uses flow, specific heat and temperature change.", "Multiply the flow by 4.2 and by the temperature change.", "Example: 1.5 kg/s heated by 10 °C: 4.2 × 1.5 × 10 = 63 kW. Now do yours."]),
        Q(`A heat exchanger transfers ${P} kW into water flowing at ${m} kg/s. By how many °C does the water warm? (4.2 kJ per kg per °C.)`, "🌡️", dT, ["Work backwards from the heat rate formula.", "Divide the power by (4.2 × the flow).", "Example: 105 kW into 2.5 kg/s: 105 ÷ 10.5 = 10 °C. Now do yours."]),
        Q(`Hot water at ${h} °C cools by ${drop} °C in a heat exchanger. Cold water of equal flow enters at ${T0} °C. What is the cold water's outlet temperature in °C (ignore losses)?`, "🔄", T0 + drop, ["With equal flows of the same fluid, the temperature changes are equal in size.", "Add the hot stream's drop to the cold stream's starting temperature.", "Example: hot drops 10 °C; cold enters at 15 °C, so it leaves at 25 °C. Now do yours."]),
        Q(`A radiator removes ${P} kW from engine coolant that flows at ${m} kg/s. What is the coolant's temperature drop in °C? (4.2 kJ per kg per °C.)`, "🚗", dT, ["Use the heat rate formula backwards.", "Divide the power by (4.2 × the flow).", "Example: 52.5 kW with 2.5 kg/s: 52.5 ÷ 10.5 = 5 °C. Now do yours."]),
        Q("Why do heat exchangers keep the two fluids separate?", "🚰", "So heat moves across but the fluids do not mix", ["Consider what you want to move and what you want to keep apart.", "Heat passes through a wall between the fluids.", "Example: a hot water pipe inside a cold water bath warms the bath without mixing. Now do yours."], ["So heat moves across but the fluids do not mix", "So no heat can ever move", "To make the fluids freeze"])
      ]);
    }),
    gen("Combined heat and power", [
      ["Using the waste heat", "🏭", "A power plant burns fuel to make electricity but much of the energy leaves as heat. <b>Combined heat and power (CHP)</b> captures that heat for buildings or industry."],
      ["Overall efficiency", "🧮", "Overall efficiency = (electricity + useful heat) ÷ fuel energy. 35 units of electricity and 45 units of heat from 100 units of fuel is 80%."],
      ["Why it saves fuel", "🌍", "Making heat and electricity separately needs more total fuel. CHP uses one fuel input for both, wasting less."]
    ], () => {
      const s = ri(1, 3), e = pick([30, 35, 40]), hh = pick([40, 45, 50]), F = 100 * s;
      return pick([
        Q(`A CHP plant burns ${F} units of fuel and produces ${e * s} units of electricity and ${hh * s} units of useful heat. What is the overall efficiency as a percent?`, "🏭", e + hh, ["Add all the useful outputs.", "Divide the total useful energy by the fuel energy and convert to percent.", "Example: 100 fuel gives 20 electricity and 55 heat: 75%. Now do yours."]),
        Q(`A CHP plant burns ${F} units of fuel, makes ${e * s} units of electricity and has an overall efficiency of ${e + hh}%. How many units of useful heat does it provide?`, "🔥", hh * s, ["Total useful energy is the efficiency times the fuel.", "Subtract the electricity from the total useful energy.", "Example: 100 fuel, 20 electricity, 75% overall: 75 - 20 = 55 units of heat. Now do yours."]),
        Q(`A power plant is ${e}% efficient at making electricity. How many units of fuel are needed to make ${e * s} units of electricity?`, "⚡", F, ["Fuel needed is electricity divided by efficiency.", "Divide the electricity by the efficiency as a decimal.", "Example: 20 units at 40% needs 50 units of fuel. Now do yours."]),
        Q(`A CHP plant has an overall efficiency of ${e + hh}% and burns ${F} units of fuel. How many units of useful energy (electricity + heat) does it give?`, "🧮", (e + hh) * s, ["Use the percent on the fuel energy.", "Multiply the fuel by the efficiency as a decimal.", "Example: 300 fuel at 60% gives 180 units. Now do yours."]),
        Q("What is the main advantage of CHP over separate electricity and heat plants?", "🌍", "It uses less fuel for the same useful energy", ["Think about where the heat usually goes in a power plant.", "Capturing otherwise wasted heat means less extra fuel is needed.", "Example: a car whose engine heat warms the cabin is using energy that would be wasted. Now do yours."], ["It uses less fuel for the same useful energy", "It makes the plant produce no heat", "It removes the need for any fuel"])
      ]);
    }),
    gen("Cost per kWh", [
      ["Levelized cost", "☀️", "Engineers compare power sources by the <b>cost per kWh</b> over the whole life: total cost ÷ total energy produced."],
      ["Example", "🧮", "A solar system costing $6000 makes 3000 kWh a year for 20 years: 60,000 kWh. Cost per kWh = $6000 ÷ 60,000 = $0.10, or 10 cents."],
      ["Comparing", "⚖️", "A source is a good deal if its cost per kWh is below the price you would pay otherwise. Include running and repair costs too."]
    ], () => {
      const c = pick([5, 8, 10, 12, 15]), E = pick([2000, 3000, 4000, 5000]), Y = pick([10, 20, 25]), C = c * E * Y / 100, grid = pick([8, 10, 12, 15, 20]);
      return pick([
        Q(`A system costs $${C} and makes ${E} kWh each year for ${Y} years. How many cents does each kWh cost over its life?`, "☀️", c, ["First find the lifetime energy.", "Divide the cost in cents by the total kWh.", "Example: $7000 and 28,000 kWh in total: 700,000 cents ÷ 28,000 = 25 cents. Now do yours."]),
        Q(`A solar system makes ${E} kWh a year for ${Y} years. How many kWh is that in total?`, "🔋", E * Y, ["Total energy is the yearly output over all the years.", "Multiply the yearly kWh by the years.", "Example: 1000 kWh a year for 30 years is 30,000 kWh. Now do yours."]),
        Q(`Energy from a system costs ${c} cents per kWh over its life. How many dollars does it cost to produce ${E * Y} kWh?`, "💲", C, ["Cost is energy times price.", "Multiply kWh by cents, then divide by 100 to get dollars.", "Example: 30,000 kWh at 7 cents is $2100. Now do yours."]),
        Q(`A system produces energy at ${c} cents per kWh. The grid sells it at ${grid} cents. How many cents per kWh are saved?`, "🔌", Math.max(0, grid - c), ["Compare the two prices.", "Subtract the cheaper price from the dearer one; if the system is dearer, the saving is zero.", "Example: grid at 18 cents and a system at 7 cents saves 11 cents per kWh. Now do yours."]),
        Q(`A system costs $${C} and the lifetime energy is ${E * Y} kWh. Is it cheaper than the grid at ${grid} cents per kWh?`, "⚖️", c < grid ? "Yes" : "No", ["Find the cost per kWh of the system first.", "Compare it with the grid price (equal prices are not cheaper).", "Example: $1500 for 20,000 kWh is 7.5 cents; against 9 cents, yes. Now do yours."], ["Yes", "No"])
      ]);
    }),
    gen("CPU load and deadlines", [
      ["Tasks and periods", "⏱️", "In an embedded system, tasks repeat every period T and need compute time C each time. A task's <b>utilization</b> is C ÷ T."],
      ["Total load", "🧮", "Add the utilizations of all tasks. A task using 2 ms every 10 ms takes 20% of the processor. If the total is above 100%, the processor cannot keep up."],
      ["Real-time", "🚨", "In a real-time system such as a car airbag, missing a deadline is a failure. Engineers keep the load safely below 100%."]
    ], () => {
      const tk = () => { const T = pick([10, 20, 25, 50, 100]), C = T === 10 ? ri(1, 4) : T === 20 ? ri(1, 6) : T === 25 ? ri(1, 5) : T === 50 ? ri(2, 14) : ri(5, 30); return { T, C, u: Math.round(C / T * 100) }; };
      const t1 = tk(), t2 = tk(), t3 = tk();
      const sum = t1.u + t2.u + t3.u, free = 100 - t1.u - t2.u;
      return pick([
        Q(`A task needs ${t1.C} ms every ${t1.T} ms. What percent of the CPU does it use?`, "⏱️", t1.u, ["Utilization compares compute time with the period.", "Divide the compute time by the period and convert to percent.", "Example: 3 ms every 12 ms is 25%. Now do yours."]),
        Q(`Task A uses ${t1.u}% of the CPU and Task B uses ${t2.u}%. What percent of the CPU is used in total?`, "➕", t1.u + t2.u, ["Loads from different tasks combine.", "Add the utilizations.", "Example: 15% and 30% make 45%. Now do yours."]),
        Q(`Three tasks use ${t1.u}%, ${t2.u}% and ${t3.u}% of the CPU. What is the total load in percent?`, "🧮", sum, ["Loads from different tasks combine.", "Add all three utilizations.", "Example: 10%, 20% and 25% make 55%. Now do yours."]),
        Q(`Two tasks use ${t1.u}% and ${t2.u}% of the CPU. What percent is still free?`, "🟢", free > 0 ? free : 0, ["Free capacity is what is left of the whole CPU.", "Subtract the total load from 100%.", "Example: 35% and 40% used leaves 25% free. Now do yours."]),
        Q(`Total CPU load is ${sum}%. Can the processor keep up with all the tasks?`, "🚨", sum <= 100 ? "Yes" : "No", ["Compare the total load to the whole processor.", "The load must not go above one hundred percent.", "Example: a load of 130% cannot be handled, but 85% can. Now do yours."], ["Yes", "No"])
      ]);
    }),
    gen("Averaging away noise", [
      ["Noisy sensors", "📈", "Every measurement has random error (<b>noise</b>). Averaging several readings smooths it out, because errors in different directions cancel."],
      ["Square-root law", "√", "Averaging n independent readings reduces the noise by a factor of <b>√n</b>. Noise 60 averaged over 9 readings becomes 60 ÷ 3 = 20."],
      ["Cost of accuracy", "⏳", "To cut noise to a third you need 9 times as many readings. Better accuracy gets more expensive as you ask for more."]
    ], () => {
      const s = pick([60, 120]), n = pick([4, 9, 16, 25, 36, 100]), k = ri(2, 8), rs = Array.from({ length: 4 }, () => ri(10, 30)), tot = rs.reduce((a, b) => a + b, 0), rem = (4 - tot % 4) % 4;
      rs[0] += rem;
      return pick([
        Q(`A sensor reading has noise of ${s} units. You average ${n} independent readings. What is the noise in units now?`, "📈", s / Math.sqrt(n), ["Noise shrinks with the square root of the number of readings.", "Take the square root of the count, then divide the noise by it.", "Example: noise 40 with 25 readings: square root 5, so 8 units. Now do yours."]),
        Q(`To cut the noise of a sensor to 1 ÷ ${k} of its size, how many readings must be averaged?`, "🔁", k * k, ["The noise falls with a square root.", "Square the reduction factor.", "Example: cutting noise to one tenth needs 10 × 10 = 100 readings. Now do yours."]),
        Q(`Four readings from a sensor are ${rs.join(", ")}. What is their average?`, "🧮", rs.reduce((a, b) => a + b, 0) / 4, ["Average means total divided by count.", "Add the readings, then divide by four.", "Example: 6, 8, 10 and 12 give 36 ÷ 4 = 9. Now do yours."]),
        Q(`With ${n} readings averaged, the noise falls by what factor?`, "√", Math.sqrt(n), ["The reduction factor is a square root.", "Find the number that multiplied by itself gives the count.", "Example: 49 readings give a factor of 7. Now do yours."]),
        Q("Averaging more readings makes noise smaller. If you want much less noise, you need...", "⏳", "Many more readings", ["Noise drops slowly as you add readings.", "To get a big improvement, the count needs to grow a lot.", "Example: to cut the noise to a tenth you need a hundred times as many readings. Now do yours."], ["Many more readings", "Just two readings", "Fewer readings"])
      ]);
    }),
    gen("Servers with a spare", [
      ["Capacity planning", "🖥️", "Each server can handle a certain load. Servers needed = load ÷ capacity, rounded <b>up</b>. 450 requests per second with 100 per server needs 5 servers."],
      ["N+1", "🛟", "<b>N+1 redundancy</b> adds one spare server so the service keeps running if one fails. Needed 5 servers, so build 6."],
      ["Sharing load", "⚖️", "A load shared across n servers puts load ÷ n on each. When one fails, the same load is spread over one fewer, so the others work harder."]
    ], () => {
      const cap = pick([50, 100, 200]), load = ri(2, 9) * cap + ri(1, cap - 1), need = Math.ceil(load / cap);
      const o = until(() => { const n = ri(3, 6), L = ri(2, 9) * 60; return L % n === 0 && L % (n - 1) === 0 && L / (n - 1) <= 100 ? { n, L } : null; });
      return pick([
        Q(`A site gets ${load} requests per second. Each server handles ${cap} per second. How many servers are needed (rounded up)?`, "🖥️", need, ["You cannot buy part of a server.", "Divide the load by the capacity and round up to the next whole number.", "Example: 250 requests with 100 per server: 2.5 rounds up to 3. Now do yours."]),
        Q(`A site needs ${need} servers to carry its load. With N+1 redundancy, how many servers are installed?`, "🛟", need + 1, ["N+1 means one extra.", "Add one spare to the number needed.", "Example: needing 8 servers means installing 9. Now do yours."]),
        Q(`${o.n} servers share ${o.L * 1} requests per second equally (capacity ${100} per server). What load does each server carry?`, "⚖️", o.L / o.n, ["Shared equally means divide.", "Divide the total load by the number of servers.", "Example: 300 requests over 5 servers is 60 each. Now do yours."]),
        Q(`${o.n} servers share ${o.L} requests per second equally. One server fails. What load does each remaining server carry?`, "💥", o.L / (o.n - 1), ["The same load must be carried by fewer servers.", "Divide the total load by the servers still working.", "Example: 240 requests over 4 servers, one fails: 240 ÷ 3 = 80 each. Now do yours."]),
        Q("Why do engineers build an extra spare server (N+1)?", "🛟", "So the service survives one failure", ["Think about what happens when one machine breaks.", "A spare lets the others cover for the missing one.", "Example: a spare tire lets you keep driving after a flat. Now do yours."], ["So the service survives one failure", "To make the site slower", "To use up the budget"])
      ]);
    }),
    mcl("Engineering ethics", [
      ["Public safety first", "🛡️", "Professional engineers promise to put the <b>safety and welfare of the public</b> first. If a design could hurt people, they must speak up even when it is awkward."],
      ["Honesty and fairness", "🤝", "Be honest in reports and data, never hide test failures, admit mistakes and give credit to others. Avoid <b>conflicts of interest</b>, such as choosing a supplier just because they pay you."],
      ["Competence and community", "📚", "Only do work you are qualified for, follow standards and laws, and think about effects on the environment and future people. Sharing safety lessons helps everyone."]
    ], ["Ask which choice protects people and stays honest.", "Safety, honesty and fairness come before speed, profit or comfort.", "Example: if a test shows a part can break, the right move is to report it and fix it, not to hide it. Now do yours."], [
      ["A test shows a safety problem just before launch. The best action is to...", "Report it and fix it before launch", "Hide it so the launch is on time", "Wait and hope nobody notices"],
      ["An engineer is asked to sign off work outside their training. They should...", "Say it is outside their skill and ask a qualified expert", "Sign it anyway", "Copy the old answer and not check"],
      ["A supplier offers an engineer an expensive gift for choosing their parts. This is a...", "Conflict of interest", "Safety standard", "Normal test"],
      ["A team member's idea made the design better. In the report you should...", "Give them credit", "Pretend it was your idea", "Leave their name out on purpose"],
      ["Data from one test does not match what the client hoped for. You should...", "Report the real results", "Change the numbers", "Delete the test"],
      ["When there is a conflict between profit and public safety, engineers should put first...", "Public safety", "Profit", "Speed"],
      ["Why do engineers follow published standards?", "They capture proven safe practice", "They make designs worse on purpose", "They are only decorations"],
      ["An engineer discovers a mistake in a design already sold. The right thing is to...", "Tell the right people and help fix it", "Say nothing", "Blame someone else"]
    ])
  ];
  c[18] = mix("Mixed practice", at(c, [1, 2, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]));
  c[19] = mix("Level 24 Challenge", at(c, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));

  Object.assign(ENGINEER_LEVELS, { 22: a, 23: b, 24: c });
})();
