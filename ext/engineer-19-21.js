// ext/engineer-19-21.js  Engineering levels 19-21 (9th grade, 10th grade first half)
(() => {
  const les = (title, slides, hints, items) => {
    const make = () => {
      const it = pick(items), parts = it[0].split("§");
      return { text: parts[parts.length - 1], visual: parts.length > 1 ? parts[0] : undefined, choices: shuf(it.slice(1)), answer: it[1], hints };
    };
    make.teach = () => slides.map(s => ({ h: s[0], v: s[1], t: s[2] }));
    make.slide = slides[0];
    return { title, make };
  };
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
  // Q(text, visual, answer, [hint1, hint2, hint3], choices?)
  const Q = (text, visual, answer, hints, choices) => ({ text, visual, answer, hints, choices });
  const sup = (b, p) => `${b}<sup>${p}</sup>`;
  // three-choice builder from a pool of strings
  const opts = (right, pool) => [right, ...shuf(pool.filter(x => x !== right)).slice(0, 2)];

  // ================= LEVEL 19 =================
  const a = [
    gen("Laws of exponents", [
      ["Same base", "✖️", "When you <b>multiply</b> powers with the same base, <b>add</b> the exponents: 2<sup>3</sup> × 2<sup>4</sup> = 2<sup>7</sup>. When you <b>divide</b>, <b>subtract</b>: 2<sup>7</sup> ÷ 2<sup>4</sup> = 2<sup>3</sup>."],
      ["Power of a power", "🔢", "A power raised to another power: <b>multiply</b> the exponents. (2<sup>3</sup>)<sup>2</sup> = 2<sup>6</sup>, because 2<sup>3</sup> × 2<sup>3</sup> = 2<sup>6</sup>."],
      ["Special cases", "1️⃣", "Anything (except zero) to the power <b>0</b> is 1. Engineers use these laws to handle huge and tiny numbers, like in scientific notation."]
    ], () => {
      const b = pick([2, 3, 5, 10]), p = ri(2, 6), q = ri(2, 6), r = ri(2, 4), n = ri(3, 9);
      return pick([
        Q(`${sup(b, p)} × ${sup(b, q)} = ${sup(b, "?")}. What is the missing exponent?`, "✖️", p + q, ["The bases are the same, so only the exponents change.", "When multiplying powers of one base, combine the exponents with the matching operation.", "Example: 4<sup>2</sup> × 4<sup>3</sup> = 4<sup>5</sup>, since 2 + 3 = 5. Now do yours."]),
        Q(`${sup(b, p + q)} ÷ ${sup(b, q)} = ${sup(b, "?")}. What is the missing exponent?`, "➗", p, ["The bases are the same, so only the exponents change.", "When dividing powers of one base, combine the exponents with the matching operation.", "Example: 6<sup>9</sup> ÷ 6<sup>4</sup> = 6<sup>5</sup>, since 9 - 4 = 5. Now do yours."]),
        Q(`(${sup(b, p)})<sup>${r}</sup> = ${sup(b, "?")}. What is the missing exponent?`, "🔢", p * r, ["There is a power inside brackets and another power outside.", "For a power of a power, the two exponents are combined with multiplication.", "Example: (7<sup>2</sup>)<sup>3</sup> = 7<sup>6</sup>, since 2 × 3 = 6. Now do yours."]),
        Q(`What is the value of 2<sup>${n}</sup>?`, "💾", 2 ** n, ["Start from 1 and keep going.", "Double the number again and again, once for each power.", "Example: 2<sup>4</sup>: 2, 4, 8, 16, so it is 16. Now do yours."]),
        Q(`What is ${sup(b, 0)} + ${q}?`, "0️⃣", 1 + q, ["First find what a power of zero means.", "Any non-zero number to the power zero is one. Then add.", "Example: 9<sup>0</sup> + 4 = 1 + 4 = 5. Now do yours."])
      ]);
    }),
    gen("Two unknowns, two clues", [
      ["Two equations", "🧩", "Sometimes there are <b>two unknown numbers</b> and two clues. If x + y = 20 and x - y = 6, add the clues: 2x = 26, so x = 13. Then y = 7."],
      ["Substitute", "🔁", "Another way: if you know x = 2y, put 2y in place of x in the other equation. Then only y is left to solve."],
      ["Check", "✅", "Always test both clues with your answers. Engineers use this to find costs, sizes and counts from two measurements."]
    ], () => {
      const y = ri(3, 12), D = ri(2, 9), x = y + D, S = x + y, s = ri(2, 9), bt = ri(3, 12), A = 2 * s + bt, B = s + bt, t = ri(2, 9);
      return pick([
        Q(`Two gears have ${S} teeth in total. The big one has ${D} more teeth than the small one. How many teeth does the BIG gear have?`, "⚙️", x, ["If you take the extra teeth away, both gears would be equal.", "Remove the difference from the total, split the rest evenly, then add the difference back to the big gear.", "Example: total 30, big has 4 more. 30 - 4 = 26, half is 13, big = 13 + 4 = 17. Now do yours."]),
        Q(`Two gears have ${S} teeth in total. The big one has ${D} more teeth than the small one. How many teeth does the SMALL gear have?`, "⚙️", y, ["If you take the extra teeth away, both gears would be equal.", "Remove the difference from the total, then share what is left equally.", "Example: total 30, big has 4 more. 30 - 4 = 26, half is 13 for the small one. Now do yours."]),
        Q(`2 sensors and 1 battery pack cost $${A}. 1 sensor and 1 battery pack cost $${B}. How many dollars does one sensor cost?`, "🧾", s, ["Compare the two bills. What is the difference between the two orders?", "The extra item in the first order explains the difference in price.", "Example: 2 bolts + 1 nut = $9 and 1 bolt + 1 nut = $6, so one bolt is $3. Now do yours."]),
        Q(`2 sensors and 1 battery pack cost $${A}. 1 sensor and 1 battery pack cost $${B}. How many dollars does one battery pack cost?`, "🔋", bt, ["First find the price of one sensor by comparing the two bills.", "Once you know a sensor price, take it out of the cheaper bill.", "Example: 2 bolts + 1 nut = $9 and 1 bolt + 1 nut = $6. A bolt is $3, so the nut is $6 - $3 = $3. Now do yours."]),
        Q(`Two rods together are ${3 * t} cm long. One rod is twice as long as the other. How long is the LONGER rod, in cm?`, "📏", 2 * t, ["The longer rod is made of two shorter-rod lengths.", "Together they make three equal parts. Find one part first.", "Example: total 12 cm. Three parts of 4 cm, so the longer rod is 8 cm. Now do yours."])
      ]);
    }),
    gen("Quadratic curves", [
      ["Curved paths", "🏀", "A <b>quadratic</b> has an x² (or t²) term. Its graph is a curve called a <b>parabola</b>. A thrown ball follows one: h = vt - 5t² (height in meters, t in seconds, v in m/s)."],
      ["Using it", "🧮", "Put the number in for t and work it out: with v = 20 and t = 1, h = 20 - 5 = 15 m. To find when it lands, set h = 0 and factor: t(20 - 5t) = 0, so t = 4 s."],
      ["Doubling sizes", "📐", "Area grows with a square: make a square plate 3 times wider and its area becomes 3² = 9 times bigger. Bridge cables also hang in curves like parabolas."]
    ], () => {
      const m = ri(2, 8), v = 5 * m, t = ri(1, m - 1), bb = ri(1, 6), c = ri(1, 9), x = ri(2, 6), k = ri(2, 7);
      return pick([
        Q(`A ball is thrown up at ${v} m/s. Its height is h = ${v}t - 5t² meters. What is its height, in meters, at t = ${t} seconds?`, "🏀", v * t - 5 * t * t, ["Put the time into every t in the formula.", "Work out the t² part first (square the time), then multiply, then subtract.", "Example: h = 20t - 5t² at t = 3 gives 60 - 45 = 15. Now do yours."]),
        Q(`A ball is thrown up at ${v} m/s, with h = ${v}t - 5t². At what time t (greater than zero) does it land, in seconds?`, "🪂", m, ["On the ground, the height is zero.", "Set h to zero, take t out of both terms, and solve the bracket that is left.", "Example: h = 10t - 5t². Then t(10 - 5t) = 0, so 10 - 5t = 0 and t = 2. Now do yours."]),
        Q(`A hanging cable has height y = x² + ${bb}x + ${c} (in meters). What is y when x = ${x}?`, "🌉", x * x + bb * x + c, ["Replace every x with the given number.", "Square first, then multiply the middle term, then add everything.", "Example: y = x² + 2x + 3 at x = 4: 16 + 8 + 3 = 27. Now do yours."]),
        Q(`A square plate is made ${k} times wider. How many times bigger is its area?`, "🟦", k * k, ["Area depends on width times width.", "If the width is multiplied by some number, the area is multiplied by that number squared.", "Example: 3 times wider gives 3 × 3 = 9 times the area. Now do yours."])
      ]);
    }),
    gen("Kirchhoff: currents at a node", [
      ["Junctions", "🔌", "A <b>node</b> is a point where wires meet. <b>Kirchhoff's current law</b>: the current flowing in equals the current flowing out. Charge is not lost or made at a node."],
      ["Adding", "➕", "If 3 A and 2 A flow into a node, 5 A must flow out, perhaps split into 4 A and 1 A on two wires."],
      ["Parallel branches", "🔀", "When a circuit splits into parallel branches, the branch currents add up to the total supply current."]
    ], () => {
      const p = ri(2, 9), q = ri(2, 9), r = ri(1, p + q - 1), T = ri(19, 30), u = ri(3, 9), w = ri(3, 9);
      return pick([
        Q(`At a node, ${p} A and ${q} A flow in. One wire carries ${r} A out. How many amps flow out through the other wire?`, "🔌", p + q - r, ["Everything that goes in must come out.", "Add the incoming currents, then subtract the outgoing current you already know.", "Example: 6 A and 3 A in, one wire takes 4 A out. 9 - 4 = 5 A leaves on the other wire. Now do yours."]),
        Q(`Three wires carry ${p} A, ${q} A and ${r} A into a node. One thick wire carries all the current away. How many amps is that?`, "🔌", p + q + r, ["There is one way out for all of the current.", "The outgoing current equals the sum of all the incoming currents.", "Example: 2 A, 4 A and 5 A flow in, so 11 A flows out. Now do yours."]),
        Q(`A ${T} A supply splits into three parallel branches. Two branches carry ${u} A and ${w} A. How many amps does the third branch carry?`, "🔀", T - u - w, ["The three branches together carry the supply current.", "Subtract the two known branch currents from the total.", "Example: 12 A supply, branches of 5 A and 4 A, so the third has 3 A. Now do yours."])
      ]);
    }),
    gen("Kirchhoff: voltages in a loop", [
      ["Around the loop", "🔁", "<b>Kirchhoff's voltage law</b>: in a loop, the voltage supplied equals the sum of the voltage drops. Think of climbing up with the battery and stepping down across each part."],
      ["Example", "🔋", "A 9 V battery feeds a resistor with a 4 V drop and an LED with a 2 V drop. The last part must drop 9 - 4 - 2 = 3 V."],
      ["Use it", "🧰", "Engineers use it to find a missing voltage or to pick a resistor so an LED gets just the right amount."]
    ], () => {
      const v1 = ri(1, 8), v2 = ri(1, 8), v3 = ri(1, 8), V = v1 + v2 + v3, led = pick([2, 3]), sup5 = pick([5, 9, 12]);
      return pick([
        Q(`A ${V} V battery drives three parts in series. The drops are ${v1} V and ${v2} V across two of them. What is the drop across the third part, in volts?`, "🔁", v3, ["The drops around the loop have to use up the whole supply.", "Subtract the known drops from the supply voltage.", "Example: 10 V supply, drops of 3 V and 4 V, so the third drops 3 V. Now do yours."]),
        Q(`Three parts in series drop ${v1} V, ${v2} V and ${v3} V. What voltage does the supply need to give, in volts?`, "🔋", V, ["Think about where the supply voltage goes in the loop.", "The supply equals the sum of all the drops.", "Example: drops of 2 V, 3 V and 4 V need a 9 V supply. Now do yours."]),
        Q(`A ${sup5} V supply powers an LED (drop ${led} V) and a resistor in series. How many volts must drop across the resistor?`, "💡", sup5 - led, ["The LED and the resistor share the supply voltage.", "Resistor drop = supply minus the LED drop.", "Example: 6 V supply, LED drops 2 V, resistor drops 4 V. Now do yours."])
      ]);
    }),
    les("Diodes and rectifiers", [
      ["One-way valve", "➡️", "A <b>diode</b> lets current flow one way only, from the <b>anode</b> to the <b>cathode</b>, like a one-way valve. A silicon diode drops about 0.7 V when it conducts."],
      ["Rectifiers", "〰️", "Wall power is AC, which flips direction. A <b>rectifier</b> made of diodes keeps only one direction and makes DC. A bridge rectifier uses 4 diodes."],
      ["Protection", "🛡️", "A diode wired backwards across a motor or relay coil (a <b>flyback diode</b>) soaks up voltage spikes. A diode in series can also block a battery put in backwards."]
    ], ["Think of a diode as a one-way gate for current.", "Remember where current can pass, what a rectifier does to AC, and what a spike-catching diode protects.", "Example: an LED is a diode that glows, so it only lights when connected the right way round. Now try yours."], [
      ["A diode lets current flow...", "In one direction only", "In both directions equally", "Only when it is hot"],
      ["A diode is connected backwards. What happens?", "It blocks the current", "It makes the current stronger", "It makes AC"],
      ["A rectifier changes...", "AC into DC", "DC into light", "Sound into heat"],
      ["Typical voltage drop of a silicon diode that is conducting?", "About 0.7 V", "About 7 V", "About 70 V"],
      ["Current flows through a diode from the...", "Anode to cathode", "Cathode to anode", "Neither side"],
      ["Why add a flyback diode across a motor?", "To absorb voltage spikes", "To make it spin faster", "To store its charge forever"],
      ["How many diodes are in a bridge rectifier?", "4", "2", "6"],
      ["LED stands for...", "Light-emitting diode", "Low energy device", "Linked electric door"],
      ["A diode in series with a battery can protect a circuit if the battery is put in...", "Backwards", "Slowly", "Twice"]
    ]),
    les("Dimensional analysis", [
      ["Units check", "📏", "Every quantity has <b>dimensions</b>: length, time, mass. A formula is only right if both sides have matching units. You can't add 5 m to 3 s."],
      ["Building units", "🧱", "Speed = distance ÷ time, so m/s. Acceleration is m/s². Force = mass × acceleration, so 1 N = 1 kg·m/s². Energy = force × distance, so N·m, also called joules."],
      ["Catch mistakes", "🔍", "If your answer for a length comes out in seconds, a step went wrong. Checking units is a fast way to find errors."]
    ], ["Write the units of each part and see how they combine.", "When you divide, units divide too. When you multiply, units multiply.", "Example: area = length × length, so the unit is m². Now try yours."], [
      ["Which unit is for speed?", "m/s", "kg", "N"],
      ["Which unit is for acceleration?", "m/s²", "kg", "N"],
      ["Force × distance gives units of...", "N·m (joules)", "N/m", "m/s"],
      ["Power is energy divided by time. Its unit is...", "J/s (watts)", "J·s", "N/m"],
      ["A student finds a length is 5 s. What is wrong?", "Seconds measure time, not length", "Nothing is wrong", "It should be in kilograms"],
      ["Which sum makes sense?", "5 m + 3 m", "5 m + 3 s", "5 kg + 3 m"],
      ["Density is mass divided by volume. Its unit is...", "kg/m³", "m³/kg", "N"],
      ["Which unit measures torque?", "N·m", "kg/m³", "m/s"],
      ["1 N is the same as...", "1 kg·m/s²", "1 kg/m", "1 m/s"],
      ["Pressure is force per area. Its unit is...", "N/m² (pascal)", "N·m²", "kg·s"]
    ]),
    les("Significant figures", [
      ["What counts", "🔢", "<b>Significant figures</b> show how precise a measurement is. Non-zero digits count. Zeros between digits count (3.07 has 3). Leading zeros do not (0.0052 has 2). Trailing zeros after a decimal point do count (4.50 has 3)."],
      ["Rounding", "✂️", "To round to 3 significant figures, keep the first 3 meaningful digits and round the next one. 3.14159 becomes 3.14."],
      ["Calculations", "🧮", "When you multiply or divide, the answer should have no more significant figures than the least precise measurement. You can't be more precise than your ruler."]
    ], ["Find the first non-zero digit. Count from there.", "Leading zeros never count. Zeros inside or after the decimal point's last digits do.", "Example: 0.0071 has 2 significant figures, and 5.020 has 4. Now try yours."], [
      ["How many significant figures does 3.07 have?", "3", "2", "4"],
      ["How many significant figures does 0.0052 have?", "2", "4", "5"],
      ["How many significant figures does 4.50 have?", "3", "2", "1"],
      ["How many significant figures does 0.0450 have?", "3", "4", "5"],
      ["How many significant figures does 12.30 have?", "4", "3", "2"],
      ["How many significant figures does 100.5 have?", "4", "2", "3"],
      ["Round 3.14159 to 3 significant figures.", "3.14", "3.1", "3.142"],
      ["Round 0.004567 to 2 significant figures.", "0.0046", "0.0045", "0.00457"],
      ["Round 2748 to 2 significant figures.", "2700", "2800", "2740"],
      ["You multiply 12.3 cm by 4.5 cm and get 55.35. How many significant figures should you keep?", "2", "4", "5"]
    ]),
    gen("Center of mass", [
      ["Balance point", "⚖️", "The <b>center of mass</b> is the point where an object balances. For a uniform ruler it is in the middle."],
      ["Two masses", "🏋️", "Masses m₁ at 0 and m₂ at a distance d: the balance point is at (m₂ × d) ÷ (m₁ + m₂) from m₁. It sits closer to the heavier mass."],
      ["Seesaw rule", "🎠", "A seesaw balances when mass × distance from the pivot is equal on both sides: m₁ × d₁ = m₂ × d₂. Robots and cars keep the center of mass low so they don't tip."]
    ], () => {
      const m1 = ri(1, 5), m2 = ri(1, 5), k = ri(2, 6), L = ri(2, 20) * 2;
      let x = ri(1, 5), y = ri(1, 5); if (x === y) y = x + 1; const u = ri(1, 4), v = ri(1, 4);
      return pick([
        Q(`A 0 cm mark holds a ${m1} kg mass and a point ${(m1 + m2) * k} cm away holds a ${m2} kg mass (the bar is very light). How many cm from the first mass is the balance point?`, "⚖️", m2 * k, ["The balance point is closer to the heavier mass.", "Multiply the second mass by the distance, then divide by the total mass.", "Example: 1 kg at 0 and 3 kg at 8 cm: 3 × 8 ÷ 4 = 6 cm from the 1 kg. Now do yours."]),
        Q(`A uniform bar is ${L} cm long. How many cm from one end is its center of mass?`, "📏", L / 2, ["The bar is the same all along.", "A uniform object balances right in the middle.", "Example: a 10 cm uniform ruler balances at 5 cm. Now do yours."]),
        Q(`A seesaw is balanced. A ${x * u} kg child sits ${y * v} m from the pivot. A ${y * u} kg child sits on the other side. How many meters from the pivot is the second child? (Use m₁d₁ = m₂d₂.)`, "🎠", x * v, ["Balance means mass times distance is the same on both sides.", "Multiply the first mass by its distance, then divide by the second mass.", "Example: 20 kg at 3 m balances 10 kg at 6 m, since 20 × 3 ÷ 10 = 6. Now do yours."])
      ]);
    }),
    gen("Cones and spheres", [
      ["Cone", "🔺", "A <b>cone</b> holds one third as much as a cylinder with the same base and height: V = ⅓ × base area × height."],
      ["Sphere", "⚽", "A <b>sphere</b> has V = (4/3) × π × r³. A hemisphere (a dome) has half of that. The surface area of a sphere is 4 × π × r²."],
      ["Using π = 3", "3️⃣", "In these questions use π ≈ 3 to keep numbers neat. A sphere with r = 3 has V = (4/3) × 3 × 27 = 108. Tanks, funnels and domes are made of these shapes."]
    ], () => {
      const r = ri(2, 6), h = 3 * ri(1, 5), B = ri(2, 9) * 3 * 1, hh = ri(2, 9);
      return pick([
        Q(`A funnel is a cone with a base area of ${B} cm² and a height of ${3 * hh} cm. What is its volume in cm³?`, "🔺", B * hh, ["A cone is one third of the matching cylinder.", "Multiply base area by height, then take a third.", "Example: base 6 cm², height 9 cm: 6 × 9 = 54, a third is 18 cm³. Now do yours."]),
        Q(`A cone has radius ${r} cm and height ${h} cm. Use π = 3. What is its volume in cm³?`, "🍦", r * r * h, ["Base area is π × r². Then use one third of base area times height.", "With π = 3, the 3 in the base area cancels with the one third.", "Example: r = 2, h = 5, π = 3: ⅓ × 3 × 4 × 5 = 20 cm³. Now do yours."]),
        Q(`A sphere has radius ${r} cm. Use π = 3. What is its volume in cm³? (V = 4/3 × π × r³)`, "⚽", 4 * r * r * r, ["Cube the radius first.", "With π = 3, the 3 on the bottom of the fraction cancels with π, leaving 4 times r³.", "Example: r = 2, π = 3: 4 × 8 = 32 cm³. Now do yours."]),
        Q(`A dome is half a sphere with radius ${r} m. Use π = 3. What is its volume in m³?`, "🕌", 2 * r * r * r, ["A dome is half of a whole sphere.", "Work out a whole sphere with π = 3 (it is 4 times r³), then halve it.", "Example: r = 3, π = 3: sphere = 108, dome = 54 m³. Now do yours."]),
        Q(`A sphere-shaped tank has radius ${r} m. Use π = 3. What is its surface area in m²? (A = 4 × π × r²)`, "🛢️", 12 * r * r, ["Square the radius, not cube it.", "Multiply 4 by π (use 3) by r squared.", "Example: r = 2, π = 3: 4 × 3 × 4 = 48 m². Now do yours."])
      ]);
    }),
    les("Stacks and queues", [
      ["Stack", "🥞", "A <b>stack</b> is like a pile of plates: you add (<b>push</b>) on top and remove (<b>pop</b>) from the top. Last in, first out (LIFO)."],
      ["Queue", "🚶", "A <b>queue</b> is like a line at a shop: the first one in is the first one out (FIFO). Adding is <b>enqueue</b>, removing is <b>dequeue</b>."],
      ["Where used", "💻", "The undo button and the browser Back button use stacks. A printer's waiting jobs and a robot's list of tasks often use queues."]
    ], ["Ask: does the newest item leave first, or the oldest?", "Stack means last in, first out. Queue means first in, first out.", "Example: push 7, push 8, pop gives 8. Now try yours."], [
      ["On a stack, which item comes off first?", "The last one put on", "The first one put on", "A random one"],
      ["In a queue, which item leaves first?", "The one that came in first", "The one that came in last", "The biggest one"],
      ["The Undo button in an editor uses a...", "Stack", "Queue", "Printer"],
      ["Jobs waiting for a printer line up in a...", "Queue", "Stack", "Circle only"],
      ["LIFO stands for...", "Last in, first out", "Last in, fast order", "Left in, first out"],
      ["FIFO stands for...", "First in, first out", "Fast in, fast out", "First in, final order"],
      ["You push 1, push 2, push 3, then pop once. What came off?", "3", "1", "2"],
      ["You enqueue A, B, C, then dequeue once. What left?", "A", "C", "B"],
      ["The browser Back button uses a...", "Stack of pages", "Queue of pages", "Photo album"],
      ["Customers at a help desk are served from a...", "Queue", "Stack", "Pile"]
    ]),
    gen("Functions in code", [
      ["A function", "📦", "A <b>function</b> takes inputs and gives back an output: <code>function f(x) { return 2 * x + 1; }</code>. Calling f(3) gives 7."],
      ["Chains", "🔗", "You can use the output of one call as the input of another: f(f(1)) means first f(1) = 3, then f(3) = 7."],
      ["Loops", "🔁", "A loop repeats steps. Adding 1 + 2 + 3 with a loop gives 6. Following the code line by line is called <b>tracing</b>."]
    ], () => {
      const m = ri(2, 6), b = ri(1, 9), x = ri(2, 9), w = ri(2, 9), h = ri(2, 9), n = ri(3, 10), c = ri(2, 5);
      return pick([
        Q(`<code>function f(x) { return ${m} * x + ${b}; }</code> What does f(${x}) return?`, "📦", m * x + b, ["Replace x with the number being given.", "Multiply first, then add, just like in algebra.", "Example: g(x) returns 4 * x + 2, so g(3) = 14. Now do yours."]),
        Q(`<code>function area(w, h) { return w * h; }</code> What does area(${w}, ${h}) return?`, "📐", w * h, ["The first number goes into w and the second into h.", "The function multiplies the two inputs.", "Example: area(3, 5) returns 15. Now do yours."]),
        Q(`<code>function add(x) { return x + ${b}; }<br>function dbl(x) { return x * 2; }</code> What does dbl(add(${x})) return?`, "🔗", (x + b) * 2, ["Work from the inside out.", "Run add on the number first, then give that result to dbl.", "Example: with add(x) = x + 1 and dbl, dbl(add(4)) = dbl(5) = 10. Now do yours."]),
        Q(`<code>let total = 0;<br>for (let i = 1; i <= ${n}; i++) { total = total + i; }</code> What is total at the end?`, "🔁", n * (n + 1) / 2, ["Trace the loop: i takes each value from the start up to the limit.", "Add up all the whole numbers from 1 to the limit.", "Example: the loop with limit 4 adds 1 + 2 + 3 + 4 = 10. Now do yours."]),
        Q(`<code>function twice(x) { return x * ${c}; }</code> What does twice(twice(${x})) return?`, "🔁", x * c * c, ["The inner call happens first.", "The output of the inner call becomes the input of the outer call.", "Example: with times 3, f(f(2)) = f(6) = 18. Now do yours."])
      ]);
    }),
    les("Bernoulli's principle", [
      ["Fast and low", "💨", "<b>Bernoulli's principle</b>: where a fluid (a liquid or air) moves faster, its pressure is lower. This only holds for smooth flow."],
      ["Narrow pipes", "🚰", "When a pipe narrows, the same amount of fluid has to squeeze through, so it flows faster. Halve the area and the speed doubles. In a <b>Venturi tube</b> the narrow throat has the lowest pressure."],
      ["Uses", "✈️", "Air flows faster over the curved top of a wing, so pressure on top is lower and the wing is pushed up. Spray bottles and carburetors use low pressure to suck liquid or fuel upward."]
    ], ["Link the speed of the flow to its pressure.", "Faster flow goes with the opposite change in pressure, and a smaller pipe area changes speed.", "Example: a river squeezed between narrow banks flows faster there. Now try yours."], [
      ["Where a fluid moves faster, its pressure is...", "Lower", "Higher", "The same always"],
      ["Air flows faster over the top of a wing, so pressure on top is...", "Lower", "Higher", "Zero"],
      ["A pipe narrows. The water in the narrow part moves...", "Faster", "Slower", "Backwards"],
      ["In a Venturi tube, the lowest pressure is at the...", "Narrow throat", "Wide entrance", "Outer wall only"],
      ["The area of a pipe is cut in half. The fluid speed becomes...", "Twice as fast", "Half as fast", "The same"],
      ["How does a spray bottle pull liquid up its tube?", "Fast air makes low pressure above the tube", "A tiny motor inside", "The liquid is lighter than air"],
      ["Two trucks pass very close on a road. Why can they pull towards each other?", "Air between them moves fast, so pressure there is lower", "Air between them stops moving", "They are magnets"],
      ["What does a pitot tube on a plane measure?", "Airspeed", "Fuel left", "Cabin temperature"],
      ["The wing's lift pushes the plane...", "Up", "Down", "Sideways only"]
    ]),
    gen("Pressure under water", [
      ["Depth matters", "🌊", "Water has weight, so pressure grows as you go deeper. Gauge pressure = density × g × depth."],
      ["Easy number", "🔟", "For fresh water, every 1 meter of depth adds about <b>10 kPa</b> (kilopascals). At 5 m deep, the gauge pressure is about 50 kPa."],
      ["Engineering", "🏗️", "Dams are thicker at the bottom, submarines have strong round hulls, and water towers sit up high to give pressure to the pipes below."]
    ], () => {
      const d = ri(2, 40), d2 = ri(d + 1, d + 30), e = ri(2, 9);
      return pick([
        Q(`About how many kPa is the gauge pressure of fresh water at ${d} m deep? (Use 10 kPa for each meter.)`, "🌊", 10 * d, ["Each meter of depth adds the same amount.", "Multiply the depth by the pressure added per meter.", "Example: at 6 m deep the pressure is 60 kPa. Now do yours."]),
        Q(`A diver sensor reads ${10 * d} kPa of gauge pressure in fresh water. How deep is it, in meters? (Use 10 kPa per meter.)`, "🤿", d, ["Work backwards from the pressure.", "Divide the pressure by the pressure added per meter.", "Example: a reading of 80 kPa means 8 m deep. Now do yours."]),
        Q(`A water tower makes the water surface ${d} m above a tap. About how many kPa of pressure does the tap get? (Use 10 kPa per meter.)`, "🏙️", 10 * d, ["The height of water above the tap gives the pressure.", "Multiply that height by the pressure per meter.", "Example: 15 m of water above gives 150 kPa. Now do yours."]),
        Q(`A sensor is at ${d} m deep and another at ${d2} m deep in the same tank. How many kPa more pressure does the deeper one read? (Use 10 kPa per meter.)`, "📊", 10 * (d2 - d), ["Find how many extra meters of depth there are.", "Multiply the extra depth by the pressure per meter.", "Example: 4 m and 9 m is 5 m extra, which is 50 kPa more. Now do yours."]),
        Q(`A hatch is ${e} m underwater. The pressure on it is 10 kPa per meter. What is the pressure in kPa?`, "🚪", 10 * e, ["The number of meters decides the pressure.", "Multiply the depth by 10 kPa.", "Example: at 3 m the pressure is 30 kPa. Now do yours."])
      ]);
    }),
    gen("Hydropower", [
      ["Falling water", "💧", "A hydroelectric dam turns the energy of falling water into electricity. Water drops through a pipe, spins a turbine, and the turbine spins a generator."],
      ["Ideal power", "🧮", "Ideal power in kW ≈ 10 × flow (m³ per second) × head (m), where <b>head</b> is the height the water falls. Real plants lose some, so multiply by the efficiency."],
      ["Energy", "🔋", "Energy (kWh) = power (kW) × time (hours). Hydropower makes no smoke, but dams change rivers and fish habitats, so engineers plan carefully."]
    ], () => {
      const Qf = ri(2, 20), H = ri(5, 60), eff = pick([50, 80]), kw = ri(2, 12) * 100, hrs = ri(2, 12);
      return pick([
        Q(`Water flows at ${Qf} m³ per second and falls ${H} m. What is the ideal power in kW? (Power ≈ 10 × flow × head.)`, "💧", 10 * Qf * H, ["You need the flow and the head.", "Multiply the flow, the head and the factor from the formula.", "Example: 3 m³/s falling 20 m gives 10 × 3 × 20 = 600 kW. Now do yours."]),
        Q(`A plant's ideal power is ${Qf * H * 10} kW, and it is ${eff}% efficient. How many kW does it really produce?`, "⚡", Qf * H * 10 * eff / 100, ["Efficiency is the fraction that really gets turned into electricity.", "Find that percent of the ideal power.", "Example: 400 kW ideal at 50% gives 200 kW. Now do yours."]),
        Q(`A hydro generator produces ${kw} kW for ${hrs} hours. How many kWh is that?`, "🔋", kw * hrs, ["Energy is power multiplied by time.", "Multiply kW by the hours.", "Example: 50 kW for 4 hours gives 200 kWh. Now do yours."]),
        Q(`Water falls ${H} m. A turbine passes ${Qf} m³ every second. If the head doubles and the flow stays the same, the ideal power is multiplied by what?`, "✖️", 2, ["Power depends on flow times head.", "If one factor doubles and the other stays the same, the answer changes by the same factor.", "Example: if the flow triples with the same head, power is multiplied by 3. Now do yours."])
      ]);
    }),
    les("Fuel cells and hydrogen", [
      ["Fuel cell", "🔋", "A <b>fuel cell</b> combines hydrogen and oxygen to make electricity, with water as the exhaust. It does not burn the fuel."],
      ["Making hydrogen", "💧", "<b>Electrolysis</b> uses electricity to split water into hydrogen and oxygen. If the electricity comes from wind or solar power, it is called green hydrogen."],
      ["Trade-offs", "⚖️", "Hydrogen is the lightest element and holds a lot of energy for its weight, but it takes up lots of space unless it is compressed. Fuel cells power some buses and trains."]
    ], ["Think about what goes in and what comes out.", "A fuel cell does not burn anything. Electrolysis runs the other way.", "Example: a solar-powered electrolyzer splits water, so the hydrogen it makes is called green. Now try yours."], [
      ["A hydrogen fuel cell makes electricity and what exhaust?", "Water", "Smoke", "Oil"],
      ["A fuel cell combines hydrogen with...", "Oxygen", "Nitrogen only", "Sand"],
      ["Splitting water into hydrogen and oxygen with electricity is called...", "Electrolysis", "Evaporation", "Rusting"],
      ["Green hydrogen is made using electricity from...", "Wind or solar power", "Only coal", "Batteries made of hydrogen"],
      ["Hydrogen is the...", "Lightest element", "Heaviest element", "Only liquid element"],
      ["Why is hydrogen stored compressed or very cold?", "It takes lots of space as a normal gas", "It is too heavy to move", "It turns into water"],
      ["Which vehicle might use a fuel cell?", "A bus", "A paper boat", "A bicycle only"],
      ["Does a fuel cell burn its fuel like a petrol engine?", "No, it reacts it chemically to make electricity", "Yes, with a flame", "Yes, with a spark plug"],
      ["Electrolysis uses electricity to...", "Split water", "Make rain", "Cool the air"]
    ]),
    les("Nuclear power", [
      ["Heat from atoms", "☢️", "In a nuclear power plant, <b>fission</b> splits atoms of uranium and releases heat. The heat boils water into steam, and the steam turns a turbine to make electricity."],
      ["Safety", "🛡️", "<b>Control rods</b> absorb neutrons to slow or stop the reaction. A coolant carries heat away, and thick concrete and steel buildings contain the reactor."],
      ["Trade-offs", "⚖️", "Nuclear plants make very little carbon dioxide while running and a small amount of fuel lasts a long time. Used fuel is kept carefully in cooling pools and heavy casks, so waste storage is an important engineering job."]
    ], ["Follow the energy chain from atoms to the grid.", "Control rods, coolant and thick buildings are all there for safety.", "Example: a coal plant also boils water to make steam, but its heat comes from burning. Now try yours."], [
      ["What does a nuclear plant use to make heat?", "Splitting atoms (fission)", "Burning wood", "Sunlight on mirrors"],
      ["What turns the generator?", "A steam turbine", "A giant magnet only", "A wind vane"],
      ["Control rods are used to...", "Slow or stop the reaction", "Cool the building by fan", "Make the steam"],
      ["Which fuel is commonly used?", "Uranium", "Wood", "Salt"],
      ["During running, nuclear plants produce very little...", "Carbon dioxide", "Electricity", "Heat"],
      ["The reactor is housed in a thick building to...", "Contain it for safety", "Hide the plant", "Make it louder"],
      ["Used nuclear fuel is stored...", "Carefully in pools and casks", "In a school", "In a river"],
      ["The heat from fission first makes...", "Steam from water", "Sound", "Snow"],
      ["Which is a challenge for nuclear power?", "Storing used fuel safely", "Having no heat", "Needing coal"]
    ]),
    les("Earthquake-safe buildings", [
      ["Shaking ground", "🏢", "Earthquakes send <b>seismic waves</b> through the ground. A building must stay up while the ground moves under it."],
      ["Design tricks", "🧱", "Engineers add cross-bracing and shear walls to resist sideways pushes. <b>Base isolators</b> (rubber and steel pads) let the ground move without shaking the building as much."],
      ["Tall towers", "🏙️", "Steel can bend without snapping (<b>ductile</b>), which is good. A <b>tuned mass damper</b>, a huge weight on a spring or cable near the top, swings against the sway. Soft, wet ground can lose its strength, so foundations matter."]
    ], ["Think about how a building can stay up while the ground moves.", "Bracing resists sideways pushes, and isolators and dampers soak up motion.", "Example: a bridge expansion joint lets the road move slightly when it heats up. Now try yours."], [
      ["Seismic waves travel through the...", "Ground", "Clouds only", "Sunlight"],
      ["What do base isolators do?", "Let the ground move with less shaking of the building", "Make the building taller", "Hold water"],
      ["Cross-bracing helps a building resist...", "Sideways pushes", "Only rain", "Only snow"],
      ["A ductile material can...", "Bend without snapping", "Never bend", "Melt in the sun"],
      ["A tuned mass damper is...", "A heavy weight that swings against sway", "A speaker", "A water pipe"],
      ["Which building shape is usually steadier?", "Wide base and symmetrical", "Tall and lopsided", "A single thin pole"],
      ["Soft wet ground can be a problem because it...", "Can lose strength when shaken", "Is too hard", "Is too bright"],
      ["Shear walls are strong walls that resist...", "Sideways forces", "Light", "Music"],
      ["Why test models on a shake table?", "To see how a design reacts to shaking safely", "To make it fall for fun", "To measure the temperature"]
    ])
  ];
  a[18] = mix("Mixed practice", at(a, [0, 1, 2, 3, 4, 5, 7, 9, 10, 11, 12, 13, 15, 17]));
  a[19] = mix("Level 19 Challenge", at(a, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));


  // ================= LEVEL 20 =================
  const RAD = [[1, 6, 30, "π/6"], [1, 4, 45, "π/4"], [1, 3, 60, "π/3"], [1, 2, 90, "π/2"], [2, 3, 120, "2π/3"], [3, 4, 135, "3π/4"], [5, 6, 150, "5π/6"], [1, 1, 180, "π"], [3, 2, 270, "3π/2"], [2, 1, 360, "2π"]];
  const b = [
    gen("Half-life and decay", [
      ["Halving", "⏳", "Some things shrink by <b>half</b> in a fixed time called the <b>half-life</b>. After one half-life, half is left. After two, a quarter. After three, an eighth."],
      ["Counting", "🔢", "Divide the time by the half-life to count the halvings. 80 g with a half-life of 2 hours: after 6 hours there are 3 halvings, so 80 ÷ 2 ÷ 2 ÷ 2 = 10 g."],
      ["Where used", "🧪", "Half-life describes radioactive samples, medicine leaving the body, and even a capacitor losing charge. Engineers use it to plan safe storage and the age of materials."]
    ], () => {
      const n = ri(2, 4), h = pick([2, 3, 5, 6, 10]), k = ri(1, 9), A = k * 2 ** n;
      return pick([
        Q(`A sample starts at ${A} grams. Its half-life is ${h} hours. How many grams remain after ${n * h} hours?`, "⏳", k, ["First find how many half-lives fit in the time.", "Halve the amount once for every half-life that passes.", "Example: 40 g, half-life 3 h, after 9 h: 3 halvings, 40 → 20 → 10 → 5 g. Now do yours."]),
        Q(`A sample has a half-life of ${h} hours. How many half-lives pass in ${n * h} hours?`, "🕒", n, ["Think: how many times does the half-life fit into the total time?", "Divide the total time by the half-life.", "Example: 4 h half-life and 12 h total gives 3 half-lives. Now do yours."]),
        Q(`After ${n} half-lives, the amount left is 1 out of how many equal parts of the original?`, "➗", 2 ** n, ["Each half-life doubles the number of parts.", "Multiply 2 by itself once for each half-life.", "Example: after 3 half-lives, 1 out of 8 is left. Now do yours."]),
        Q(`A charge starts at ${A} units and falls to ${k} units. Its half-life is ${h} hours. How many hours did that take?`, "🔋", n * h, ["First find how many times the amount was halved.", "Count the halvings, then multiply by the half-life.", "Example: 48 falls to 6 with a 4 h half-life: 3 halvings, 12 hours. Now do yours."])
      ]);
    }),
    gen("Linear interpolation", [
      ["In between", "📈", "<b>Interpolation</b> finds a value between two known readings by assuming a straight line. A sensor reads 100 at 10°C and 140 at 20°C."],
      ["Steps", "🪜", "Find the change per one unit: (140 - 100) ÷ (20 - 10) = 4 per °C. At 15°C that is 5 steps from 10°C: 100 + 5 × 4 = 120."],
      ["Calibration", "🎚️", "Engineers calibrate sensors with a few known points and interpolate the rest. It works best when the real relationship is close to a straight line."]
    ], () => {
      const x1 = ri(1, 9) * 10, dx = pick([10, 20, 40]), m = ri(2, 9), y1 = ri(10, 90), j = ri(1, dx - 1);
      return pick([
        Q(`A sensor reads ${y1} at ${x1} °C and ${y1 + m * dx} at ${x1 + dx} °C. Assuming a straight line, what does it read at ${x1 + j} °C?`, "🌡️", y1 + m * j, ["A straight line changes by the same amount for each degree.", "Find the change per degree first, then count the degrees from the first point.", "Example: 50 at 0 °C and 90 at 10 °C is 4 per degree, so at 3 °C it reads 62. Now do yours."]),
        Q(`A sensor reads ${y1} at ${x1} °C and ${y1 + m * dx} at ${x1 + dx} °C. At what temperature (in °C) does it read ${y1 + m * j}? Assume a straight line.`, "🎯", x1 + j, ["The reading goes up by the same amount for each degree.", "Find the change per degree, work out how many degrees above the first point you need, and add.", "Example: 50 at 0 °C, 90 at 10 °C: a reading of 62 is 12 above 50, which is 3 degrees, so 3 °C. Now do yours."]),
        Q(`A sensor reads ${y1} at ${x1} °C and ${y1 + m * dx} at ${x1 + dx} °C. How much does the reading change for every 1 °C?`, "📏", m, ["Find the total change in the reading first.", "Divide the change in reading by the change in temperature.", "Example: 50 to 90 over 10 degrees is 40 ÷ 10 = 4 per degree. Now do yours."])
      ]);
    }),
    gen("Radians", [
      ["Another angle unit", "📐", "A <b>radian</b> is an angle measured by arc length: an arc equal to the radius makes 1 radian. A full turn is 2π radians, so 180° = π radians."],
      ["Converting", "🔄", "To change radians to degrees, multiply by 180/π. π/2 rad = 90°. π/3 rad = 60°. π/6 rad = 30°."],
      ["Arc length", "🛞", "With radians, arc length is simple: s = r × θ. A wheel of radius 10 cm turning 3 radians moves a rim point 30 cm. Engineers use radians for motors and spinning parts."]
    ], () => {
      const e = pick(RAD), w = pick(RAD), r = ri(2, 15), th = ri(2, 6), tt = ri(2, 6);
      const wrong = shuf(RAD.filter(z => z[3] !== w[3])).slice(0, 2).map(z => z[3].replace("π", "pi"));
      return pick([
        Q(`${e[3]} radians is how many degrees?`, "📐", e[2], ["Remember that π radians is a half turn.", "Think of what fraction of π it is, then take that fraction of the half-turn in degrees.", "Example: π/5 rad is a fifth of 180°, which is 36°. Now do yours."]),
        Q(`${w[2]}° is how many radians?`, "🔄", w[3].replace("π", "pi"), ["A half turn is π radians (written pi here).", "Write the angle as a fraction of a half turn and use that fraction of π.", "Example: 36° is 1/5 of a half turn, so π/5. Now do yours."], [w[3].replace("π", "pi"), ...wrong]),
        Q(`A wheel has radius ${r} cm and turns through ${th} radians. How many cm does a point on its rim travel along the arc?`, "🛞", r * th, ["Arc length depends on the radius and the angle in radians.", "Multiply the radius by the angle in radians.", "Example: radius 8 cm, 2 radians: 16 cm. Now do yours."]),
        Q(`A shaft makes ${tt} full turns. Using π = 3, how many radians is that in total?`, "🌀", 6 * tt, ["One full turn is twice π radians.", "Find the radians in one turn with π = 3, then multiply by the number of turns.", "Example: 2 turns with π = 3: 6 × 2 = 12 radians. Now do yours."])
      ]);
    }),
    gen("Spinning speed: rpm and rad/s", [
      ["rpm", "🔁", "<b>rpm</b> means revolutions per minute. 120 rpm is 120 ÷ 60 = 2 revolutions each second."],
      ["Rim speed", "⚙️", "A point on the rim moves at speed v = ω × r, where ω (omega) is the turning speed in radians per second. A wheel of radius 5 cm turning at 4 rad/s has a rim speed of 20 cm/s."],
      ["Counting turns", "🧮", "Total revolutions = rpm × minutes. A fan at 300 rpm for 2 minutes makes 600 turns."]
    ], () => {
      const rpm = ri(2, 20) * 60, w = ri(2, 20), r = ri(2, 15), mins = ri(2, 9), rps = ri(2, 30), rp2 = ri(2, 40) * 10;
      return pick([
        Q(`A motor turns at ${rpm} rpm. How many revolutions is that each second?`, "🔁", rpm / 60, ["There are sixty seconds in a minute.", "Divide the minute rate by the number of seconds in a minute.", "Example: 180 rpm is 3 revolutions per second. Now do yours."]),
        Q(`A fan makes ${rps} revolutions each second. What is that in rpm?`, "🌀", rps * 60, ["You need revolutions per minute, not per second.", "Multiply by the number of seconds in a minute.", "Example: 4 turns per second is 240 rpm. Now do yours."]),
        Q(`A wheel turns at ${w} rad/s and has a radius of ${r} cm. How fast does the rim move, in cm/s?`, "🛞", w * r, ["Rim speed depends on how fast it turns and how far the rim is from the center.", "Multiply the turning speed by the radius.", "Example: 6 rad/s and radius 5 cm gives 30 cm/s. Now do yours."]),
        Q(`A shaft turns at ${rp2} rpm for ${mins} minutes. How many revolutions does it make?`, "⏲️", rp2 * mins, ["Revolutions per minute times minutes.", "Multiply the rate by the time.", "Example: 50 rpm for 4 minutes is 200 revolutions. Now do yours."])
      ]);
    }),
    gen("Motor power: torque and speed", [
      ["Rotating power", "🔧", "For a spinning shaft, <b>power</b> (watts) = torque (N·m) × angular speed (rad/s). A motor with 5 N·m turning at 20 rad/s gives 100 W."],
      ["Rearranging", "🔄", "Torque = power ÷ speed. Speed = power ÷ torque. A bigger load needs more torque for the same power, so the shaft turns more slowly."],
      ["Energy used", "🔋", "Energy (joules) = power × time in seconds. A 50 W motor running for 10 s uses 500 J."]
    ], () => {
      const tq = ri(2, 12), w = ri(5, 40), t = ri(2, 30);
      return pick([
        Q(`A motor gives ${tq} N·m of torque while turning at ${w} rad/s. How many watts is its power?`, "🔧", tq * w, ["Power for a shaft involves both the twist and the turning speed.", "Multiply torque by speed.", "Example: 3 N·m at 10 rad/s is 30 W. Now do yours."]),
        Q(`A motor delivers ${tq * w} W while turning at ${w} rad/s. How many N·m of torque is it giving?`, "🪛", tq, ["Start from power = torque × speed and work backwards.", "Divide the power by the speed.", "Example: 60 W at 10 rad/s means 6 N·m. Now do yours."]),
        Q(`A motor delivers ${tq * w} W with ${tq} N·m of torque. How fast is it turning, in rad/s?`, "🌀", w, ["Start from power = torque × speed and work backwards.", "Divide the power by the torque.", "Example: 60 W with 3 N·m means 20 rad/s. Now do yours."]),
        Q(`A ${tq * w} W motor runs for ${t} seconds. How many joules of energy does it use?`, "⚡", tq * w * t, ["Energy depends on the power and how long it runs.", "Multiply power by the time in seconds.", "Example: 40 W for 5 s is 200 J. Now do yours."])
      ]);
    }),
    gen("Vector components", [
      ["Split a push", "↗️", "A force at an angle can be split into a <b>horizontal</b> part and a <b>vertical</b> part. They make a right triangle, with the force as the long side (hypotenuse)."],
      ["3-4-5", "📐", "If the triangle is 3-4-5, a 50 N pull is 10 times bigger: 30 N vertical and 40 N horizontal. The parts use the same ratio as the sides."],
      ["Why", "🏗️", "Only the horizontal part pulls a crate along the floor, and only the vertical part lifts it. Engineers split forces to work on each direction separately."]
    ], () => {
      const T = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10]]), k = ri(2, 9), [v, h2, F] = T;
      return pick([
        Q(`A cable pulls with ${F * k} N. Its slope triangle has sides in the ratio ${v}-${h2}-${F} (vertical, horizontal, long side). How many N of the pull are HORIZONTAL?`, "↗️", h2 * k, ["The long side stands for the full force.", "Find the scale factor between the long side of the ratio and the real force, then scale the horizontal side.", "Example: a 50 N pull with a 3-4-5 triangle: scale 10, so horizontal = 40 N. Now do yours."]),
        Q(`A cable pulls with ${F * k} N. Its slope triangle has sides in the ratio ${v}-${h2}-${F} (vertical, horizontal, long side). How many N of the pull are VERTICAL?`, "🪝", v * k, ["The long side stands for the full force.", "Find the scale factor between the long side of the ratio and the real force, then scale the vertical side.", "Example: a 50 N pull with a 3-4-5 triangle: scale 10, so vertical = 30 N. Now do yours."]),
        Q(`A force has a horizontal part of ${h2 * k} N and a vertical part of ${v * k} N. The sides are in the ratio ${v}-${h2}-${F}. How strong is the full force in N?`, "💪", F * k, ["The full force is the long side of the triangle.", "Find the scale factor from the horizontal part, and scale the long side.", "Example: horizontal 40 N and vertical 30 N in a 3-4-5 triangle gives 50 N. Now do yours."])
      ]);
    }),
    les("Finding angles with trig", [
      ["Ratios", "📐", "In a right triangle: sin = opposite ÷ hypotenuse, cos = adjacent ÷ hypotenuse, tan = opposite ÷ adjacent."],
      ["Special values", "⭐", "sin 30° = 0.5, cos 60° = 0.5, tan 45° = 1, sin 90° = 1, cos 0° = 1, cos 90° = 0."],
      ["Going backwards", "↩️", "To find an angle from sides, use the inverse function (sin⁻¹, cos⁻¹, tan⁻¹). If a ramp rises 1 m over a 2 m slope, sin θ = 0.5, so θ = 30°."]
    ], ["Decide which two sides the problem gives you, or which special value is needed.", "Match them to sine, cosine or tangent, and recall the special values from the slides.", "Example: if the opposite side is 3 and the hypotenuse is 6, sin θ = 0.5, which matches 30°. Now try yours."], [
      ["sin 30° equals...", "0.5", "1", "0"],
      ["cos 60° equals...", "0.5", "1", "0"],
      ["tan 45° equals...", "1", "0.5", "0"],
      ["sin 90° equals...", "1", "0.5", "0"],
      ["cos 90° equals...", "0", "1", "0.5"],
      ["Tangent of an angle equals...", "Opposite ÷ adjacent", "Opposite ÷ hypotenuse", "Adjacent ÷ hypotenuse"],
      ["Sine of an angle equals...", "Opposite ÷ hypotenuse", "Adjacent ÷ hypotenuse", "Opposite ÷ adjacent"],
      ["A ramp rises 1 m over a 2 m long slope. Its angle is...", "30°", "45°", "60°"],
      ["The opposite and adjacent sides are equal. The angle is...", "45°", "30°", "60°"],
      ["What do sin⁻¹, cos⁻¹ and tan⁻¹ do?", "Find an angle from a ratio", "Find a length from a time", "Add two angles"]
    ]),
    gen("Variance and spread", [
      ["How spread out?", "📊", "<b>Variance</b> measures spread. Find the mean, find each value's distance from the mean, square each distance, and average the squares."],
      ["Standard deviation", "📏", "The <b>standard deviation</b> is the square root of the variance. For values 2, 2, 8, 8 the mean is 5, every distance is 3, the variance is 9, and the standard deviation is 3."],
      ["Use", "🔩", "A small standard deviation means parts are very consistent. A big one means they vary a lot, which matters in quality control."]
    ], () => {
      const m = ri(10, 30), A = ri(1, 5), B = A + 2 * ri(0, 2), d = ri(1, 9), s = ri(2, 12), d1 = ri(1, 4), d2 = d1 + ri(1, 4);
      return pick([
        Q(`Four lengths in mm are ${m - B}, ${m - A}, ${m + A}, ${m + B}. The mean is ${m}. What is the variance?`, "📊", (A * A + B * B) / 2, ["Find how far each value is from the mean.", "Square those distances, add them up, and divide by how many values there are.", "Example: values 4, 6, 8, 10 have mean 7. Distances 3, 1, 1, 3; squares 9, 1, 1, 9; sum 20; divided by 4 is 5. Now do yours."]),
        Q(`Four values are ${m - d}, ${m - d}, ${m + d}, ${m + d}. The mean is ${m}. What is the standard deviation?`, "📏", d, ["Every value is the same distance from the mean.", "If all distances are equal, the standard deviation equals that distance.", "Example: values 7, 7, 13, 13 have mean 10, so the standard deviation is 3. Now do yours."]),
        Q(`A set of parts has variance ${s * s}. What is the standard deviation?`, "🔧", s, ["Standard deviation is linked to variance by a root.", "Take the square root of the variance.", "Example: variance 49 gives a standard deviation of 7. Now do yours."]),
        Q(`Set A: ${m - d1}, ${m - d1}, ${m + d1}, ${m + d1}. Set B: ${m - d2}, ${m - d2}, ${m + d2}, ${m + d2}. Both have mean ${m}. Which set has the larger spread?`, "⚖️", "Set B", ["Compare how far values sit from the mean.", "The set with values further from the mean is more spread out.", "Example: 5, 5, 15, 15 is more spread than 8, 8, 12, 12. Now do yours."], ["Set A", "Set B", "They are the same"])
      ]);
    }),
    gen("Counting designs", [
      ["Multiply choices", "🧮", "If you choose a motor from 3 types and a battery from 4 types, there are 3 × 4 = 12 combinations. This is the <b>counting principle</b>."],
      ["Orders", "🔀", "The number of ways to order n different tasks is n × (n - 1) × … × 1, written n! For 4 tasks: 4 × 3 × 2 × 1 = 24."],
      ["Switches and codes", "🔢", "Each on/off switch doubles the options: 3 switches give 2 × 2 × 2 = 8 states. A 4-digit code using digits 0-9 has 10 × 10 × 10 × 10 = 10,000 possibilities."]
    ], () => {
      const m = ri(2, 6), bt = ri(2, 6), fr = ri(2, 4), n = ri(3, 5), sw = ri(3, 9), dg = ri(2, 4), fact = [1, 1, 2, 6, 24, 120];
      return pick([
        Q(`A robot kit lets you choose 1 of ${m} motors, 1 of ${bt} batteries and 1 of ${fr} frames. How many different robots can you build?`, "🤖", m * bt * fr, ["Each choice multiplies the number of options.", "Multiply the number of options for each part.", "Example: 2 motors and 5 batteries give 10 robots. Now do yours."]),
        Q(`In how many different orders can ${n} different tasks be done?`, "🔀", fact[n], ["The first task has many choices, the next has one fewer, and so on.", "Multiply the counts down to one.", "Example: 3 tasks can be ordered 3 × 2 × 1 = 6 ways. Now do yours."]),
        Q(`A control panel has ${sw} on/off switches. How many different switch settings are possible?`, "🎛️", 2 ** sw, ["Each switch has two choices, and each doubles the total.", "Multiply 2 by itself once for each switch.", "Example: 4 switches give 2 × 2 × 2 × 2 = 16. Now do yours."]),
        Q(`A lock code has ${dg} digits, each from 0 to 9. How many different codes are possible?`, "🔒", 10 ** dg, ["Each position has the same number of choices.", "Multiply that number by itself once for every position.", "Example: 2 digits give 10 × 10 = 100 codes. Now do yours."])
      ]);
    }),
    gen("Choosing without order", [
      ["Pairs", "🤝", "When order does not matter, you count <b>combinations</b>. Choosing 2 sensors from 5: the number of pairs is 5 × 4 ÷ 2 = 10."],
      ["Triples", "🔺", "Choosing 3 from n: n × (n - 1) × (n - 2) ÷ 6. From 5 it is 5 × 4 × 3 ÷ 6 = 10."],
      ["Connections", "🕸️", "If every robot in a team must talk to every other, the number of links is n × (n - 1) ÷ 2. This also counts matches in a round-robin tournament."]
    ], () => {
      const n = ri(4, 12), t = ri(4, 8), k = ri(4, 10);
      return pick([
        Q(`How many different pairs of sensors can you choose from ${n} sensors?`, "📡", n * (n - 1) / 2, ["Order does not matter, so each pair is counted once, not twice.", "Multiply the count by one less, then divide by two.", "Example: 6 sensors give 6 × 5 ÷ 2 = 15 pairs. Now do yours."]),
        Q(`How many ways can you choose 3 parts from ${t} different parts (order does not matter)?`, "🔩", t * (t - 1) * (t - 2) / 6, ["Count the ordered choices first, then correct for repeats.", "Multiply the three counts that go down by one each time, then divide by six.", "Example: 5 parts: 5 × 4 × 3 ÷ 6 = 10 ways. Now do yours."]),
        Q(`${k} robots each play every other robot once. How many matches are played?`, "🏆", k * (k - 1) / 2, ["Each match involves two robots.", "Every robot plays all the others, but each match is counted twice that way.", "Example: 5 robots give 5 × 4 ÷ 2 = 10 matches. Now do yours."]),
        Q(`${n} computers in a lab are each connected directly to every other. How many cables are needed?`, "🖧", n * (n - 1) / 2, ["One cable joins exactly two computers.", "Multiply the number of computers by one fewer, then halve it.", "Example: 4 computers need 4 × 3 ÷ 2 = 6 cables. Now do yours."])
      ]);
    }),
    gen("The bell curve", [
      ["Normal curve", "🔔", "Many measurements (heights, part sizes) cluster around the <b>mean</b> in a bell shape called a <b>normal distribution</b>. The <b>standard deviation</b> (σ) measures how wide it is."],
      ["68-95-99.7", "📏", "About 68% of values lie within 1σ of the mean, about 95% within 2σ, and about 99.7% within 3σ."],
      ["Quality control", "🔧", "If bolts average 50 mm with σ = 2 mm, about 95% are between 46 mm and 54 mm. Anything outside 3σ is rare and may signal a problem."]
    ], () => {
      const mu = ri(5, 20) * 10, sg = ri(1, 5), r = (z) => `${mu - z * sg} to ${mu + z * sg} mm`, N = pick([200, 500, 1000]);
      return pick([
        Q(`Parts have a mean length of ${mu} mm and σ = ${sg} mm. About 68% of parts are between which two lengths?`, "🔔", r(1), ["This is the narrowest of the three common ranges.", "It is the range within one standard deviation either side of the mean.", "Example: mean 20 and σ = 3: that range is 17 to 23. Now do yours."], [r(1), r(2), r(3)]),
        Q(`Parts have a mean length of ${mu} mm and σ = ${sg} mm. About 95% of parts are between which two lengths?`, "🔔", r(2), ["This is the middle-sized range of the three common ones.", "It is two standard deviations either side of the mean.", "Example: mean 20 and σ = 3: that range is 14 to 26. Now do yours."], [r(1), r(2), r(3)]),
        Q(`Parts have a mean length of ${mu} mm and σ = ${sg} mm. About 99.7% of parts are between which two lengths?`, "🔔", r(3), ["This is the widest of the three common ranges.", "It is three standard deviations either side of the mean.", "Example: mean 20 and σ = 3: that range is 11 to 29. Now do yours."], [r(1), r(2), r(3)]),
        Q(`Out of ${N} parts from a normal process, about how many lie within 1σ of the mean?`, "🧮", N * 68 / 100, ["Use the share of values the rule gives for one standard deviation.", "Find that percent of the total.", "Example: out of 100 parts, the share within 2σ is about 95. Now do yours."])
      ]);
    }),
    gen("Heat conduction", [
      ["Heat through a wall", "🧱", "Heat flows through a solid by <b>conduction</b>. Rate (watts) = k × A × ΔT ÷ L, where k is the material's conductivity, A the area, ΔT the temperature difference, and L the thickness."],
      ["Doubling", "✖️", "Double the area and the heat flow doubles. Double the thickness and the flow halves. That is why thick insulation works."],
      ["Choosing k", "🧊", "Metals have a big k (they conduct heat well). Foam and wool have a tiny k. Engineers use metal for heat sinks and foam for coolers."]
    ], () => {
      let k, A, dT, L; do { k = pick([2, 5, 10, 20]); A = pick([2, 4, 5, 10]); dT = pick([10, 20, 30, 40]); L = pick([1, 2, 4, 5]); } while ((k * A * dT) % L !== 0);
      const pair = pick([["the wall is made twice as thick", "Half"], ["the area is made twice as big", "Double"], ["the temperature difference doubles", "Double"], ["the thickness is cut to half", "Double"]]);
      return pick([
        Q(`A wall panel has k = ${k}, area ${A} m², thickness ${L} m and a temperature difference of ${dT} °C. What is the heat flow in watts? (k × A × ΔT ÷ L)`, "🧱", k * A * dT / L, ["All four values go into one formula.", "Multiply k, area and temperature difference, then divide by the thickness.", "Example: k = 2, A = 3, ΔT = 10, L = 1 gives 2 × 3 × 10 ÷ 1 = 60 W. Now do yours."]),
        Q(`Heat conducts through a wall. What happens to the heat flow if ${pair[0]}?`, "🌡️", pair[1], ["Look at where that quantity appears in the formula.", "Things on top of the fraction multiply the flow, things on the bottom divide it.", "Example: if the area is tripled, the flow triples. Now do yours."], ["Half", "Double", "Stay the same"])
      ]);
    }),
    gen("Thermal expansion numbers", [
      ["Formula", "🌡️", "A solid grows when it heats up: ΔL = α × L × ΔT. α is the <b>expansion coefficient</b>, L the original length, ΔT the temperature rise."],
      ["Example", "🛤️", "Steel has α ≈ 12 per million per °C. A 10 m steel rail heated by 50 °C grows 12 × 10 × 50 ÷ 1,000,000 m = 0.006 m = 6 mm."],
      ["Gaps", "🌉", "That is why bridges have expansion joints and railways leave tiny gaps. Without them, hot weather could bend the track."]
    ], () => {
      let al, L, dT; do { al = pick([10, 12, 20, 24, 25]); L = pick([10, 20, 25, 40, 50, 100]); dT = pick([20, 25, 40, 50, 100]); } while ((al * L * dT) % 1000 !== 0);
      return pick([
        Q(`A metal bar has α = ${al} (millionths per °C), is ${L} m long and warms by ${dT} °C. How many mm does it grow? (ΔL = α × L × ΔT ÷ 1000 gives mm.)`, "📏", al * L * dT / 1000, ["Put the three numbers into the formula.", "Multiply α, length and temperature rise, then divide by one thousand for millimeters.", "Example: α = 10, L = 20, ΔT = 50 gives 10 × 20 × 50 ÷ 1000 = 10 mm. Now do yours."]),
        Q(`A bar with α = ${al} grows ${al * L * dT / 1000} mm when warmed by ${dT} °C. How long was it, in meters? (ΔL = α × L × ΔT ÷ 1000.)`, "🛤️", L, ["Rearrange the formula to find the length.", "Multiply the growth by one thousand and divide by α times the temperature rise.", "Example: 10 mm growth, α = 10, ΔT = 50: L = 10 × 1000 ÷ (10 × 50) = 20 m. Now do yours."])
      ]);
    }),
    les("Semiconductors", [
      ["In between", "💎", "Metals conduct electricity, plastics and glass insulate. <b>Semiconductors</b>, like silicon, are in between. Their conduction can be controlled."],
      ["Doping", "🧪", "<b>Doping</b> adds tiny amounts of other atoms. Phosphorus makes n-type (extra electrons). Boron makes p-type (missing electrons, called holes). Joining n and p gives a diode."],
      ["Chips", "🧠", "Silicon is made from sand. Transistors cut into thin slices called <b>wafers</b> make up chips, with billions on a single chip."]
    ], ["Think of where semiconductors sit between conductors and insulators.", "Doping changes how well silicon conducts, and n and p types differ in their charge carriers.", "Example: copper is a conductor and rubber is an insulator; silicon is neither of those. Now try yours."], [
      ["Silicon is a...", "Semiconductor", "Perfect conductor", "Perfect insulator"],
      ["Silicon is mainly made from...", "Sand", "Wood", "Salt water"],
      ["Doping means...", "Adding tiny amounts of other atoms", "Heating the chip", "Cutting the wafer"],
      ["N-type silicon has extra...", "Electrons", "Neutrons", "Holes only"],
      ["Joining n-type and p-type silicon makes a...", "Diode", "Magnet", "Bridge"],
      ["A thin slice of silicon used to make chips is a...", "Wafer", "Cable", "Tile"],
      ["Which is a good conductor?", "Copper", "Rubber", "Glass"],
      ["Which is an insulator?", "Rubber", "Copper", "Silver"],
      ["A modern chip can hold how many transistors?", "Billions", "About ten", "None"]
    ]),
    les("Heat treating metals", [
      ["Change by heat", "🔥", "Heating and cooling steel in a controlled way changes how hard or tough it is. This is <b>heat treatment</b>."],
      ["Three methods", "🛠️", "<b>Annealing</b>: heat, then cool slowly. It makes steel softer and easier to shape. <b>Quenching</b>: cool quickly in water or oil. It makes steel hard but brittle. <b>Tempering</b>: reheat quenched steel gently to make it less brittle."],
      ["Surface and bending", "🔩", "<b>Case hardening</b> makes only the outside hard while the inside stays tough, good for gears. Bending a wire back and forth also makes it harder (<b>work hardening</b>) until it snaps."]
    ], ["Think about whether the metal cools slowly or fast, and what you want it to be like.", "Slow cooling gives soft metal. Fast cooling gives hard but brittle. A gentle reheat afterwards trades some hardness for toughness.", "Example: a chisel must be hard but not shatter, so it is quenched and then reheated gently. Now try yours."], [
      ["Annealing makes steel...", "Softer", "Harder and brittle", "Magnetic"],
      ["Quenching means cooling...", "Quickly", "Very slowly", "Never"],
      ["Quenched steel is hard but...", "Brittle", "Soft", "Liquid"],
      ["Tempering is done to...", "Make quenched steel less brittle", "Melt the steel", "Make it rust"],
      ["Case hardening gives a part...", "A hard surface with a tough core", "A soft surface and a hard core", "No change at all"],
      ["Which is cooled slowly?", "Annealed steel", "Quenched steel", "Hot sand"],
      ["Gear teeth often need to be...", "Hard on the surface", "Soft as dough", "Hollow"],
      ["Bending a paperclip back and forth many times makes it...", "Harder, then it snaps", "Softer and softer", "Bigger"],
      ["Heat treatment changes a metal's...", "Hardness and toughness", "Color of the sky", "Weight on the Moon"]
    ]),
    les("Joining parts", [
      ["Permanent joins", "🔗", "<b>Welding</b> melts metals together so they become one piece. <b>Rivets</b> and <b>adhesives</b> are also permanent. Welding needs training and a mask, so it is a job for trained people."],
      ["Removable joins", "🔩", "<b>Bolts, nuts and screws</b> can be taken apart. A washer spreads the load and a lock washer helps stop loosening. A torque wrench tightens to the right amount."],
      ["Other joins", "🔌", "<b>Solder</b> joins electronics with a low-melting metal. <b>Snap-fits</b> hold plastic parts with built-in clips. Adhesives spread the load over a whole surface."]
    ], ["Ask whether the join must be permanent or removable.", "Removable joins use threads or clips. Permanent ones melt or glue the parts.", "Example: a bike wheel must come off for repairs, so a threaded nut is better than a weld. Now try yours."], [
      ["Which join can be taken apart easily?", "Bolt and nut", "Weld", "Rivet"],
      ["Welding joins metal by...", "Melting it together", "Gluing paper", "Painting"],
      ["What joins electronic parts onto a circuit board?", "Solder", "Rivets", "Rope"],
      ["A snap-fit is common in...", "Plastic parts", "Skyscraper beams", "Bridge cables"],
      ["Why use a washer under a nut?", "It spreads the load", "It adds color", "It makes sound"],
      ["A torque wrench is used to...", "Tighten to the right amount", "Cut wood", "Measure length"],
      ["Which is a permanent join?", "A weld", "A screw", "A snap-fit"],
      ["Adhesives help because they...", "Spread the load over a surface", "Stop all heat", "Make parts float"],
      ["Welding should be done by...", "Trained people with safety gear", "Anyone without a mask", "Young children"]
    ]),
    gen("Machine paths: G-code", [
      ["G-code", "🖥️", "A CNC machine follows <b>G-code</b>: lines such as <code>G1 X30 Y10</code> move the tool to X = 30 mm, Y = 10 mm. <code>G0</code> is a quick move, <code>G1</code> is a cutting move."],
      ["Absolute or incremental", "📍", "In <b>absolute</b> mode (G90), numbers are positions on the grid. In <b>incremental</b> mode (G91), numbers are moves from where the tool is now."],
      ["Time", "⏱️", "Time = distance ÷ feed rate. Cutting 120 mm at a feed rate of 60 mm per minute takes 2 minutes."]
    ], () => {
      const w = ri(5, 40), h = ri(5, 40), x1 = ri(0, 20), len = ri(5, 40), a0 = ri(5, 30), d = ri(2, 9), n = ri(2, 6), F = pick([60, 120, 300, 600]), mn = ri(1, 5), T = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10]]), k = ri(2, 6);
      return pick([
        Q(`The tool cuts a rectangle ${w} mm wide and ${h} mm tall. How long is the cutting path, in mm?`, "🔲", 2 * (w + h), ["A rectangle has four sides.", "Add all four sides.", "Example: a 5 by 3 rectangle has a path of 5 + 3 + 5 + 3 = 16 mm. Now do yours."]),
        Q(`<code>G1 X${x1} Y10</code> then <code>G1 X${x1 + len} Y10</code> (absolute mode). How many mm does the tool travel on the second move?`, "➡️", len, ["Only X changes between the two moves.", "Subtract the first X from the second X.", "Example: from X5 to X20 is a move of 15 mm. Now do yours."]),
        Q(`In incremental mode the tool starts at X = ${a0}. The program says <code>G1 X${d}</code> ${n} times in a row. What is the final X position?`, "📍", a0 + d * n, ["In incremental mode each number is a move from the current spot.", "Add up all the moves to the starting position.", "Example: start at X = 10, three moves of 4 gives 10 + 12 = 22. Now do yours."]),
        Q(`A cut is ${F * mn} mm long and the feed rate is ${F} mm per minute. How many minutes does it take?`, "⏱️", mn, ["Time is distance divided by speed.", "Divide the length by the feed rate.", "Example: 240 mm at 120 mm/min takes 2 minutes. Now do yours."]),
        Q(`The tool moves diagonally from (0, 0) to (${T[0] * k}, ${T[1] * k}) in mm. The sides are a ${T[0]}-${T[1]}-${T[2]} triangle scaled up. How long is the diagonal move in mm?`, "↗️", T[2] * k, ["The move forms a right triangle.", "Scale the long side of the ratio by the same factor as the short sides.", "Example: (30, 40) comes from the 3-4-5 triangle times 10, so the diagonal is 50 mm. Now do yours."])
      ]);
    }),
    les("Degrees of freedom", [
      ["Ways to move", "🦾", "A <b>degree of freedom</b> (DOF) is one independent way a thing can move. A door hinge has 1 (swing). A train on a track has 1 (forward or back)."],
      ["In space", "🚁", "A free object in 3D has 6 DOF: move left-right, forward-back, up-down, plus turn around 3 axes (roll, pitch, yaw). A drone has 6. A wheeled robot on a flat floor has 3 (x, y and which way it faces)."],
      ["Robot arms", "🤖", "Each joint of a robot arm usually adds 1 DOF. To put a hand anywhere in space at any angle, you need at least 6 joints. A human arm has about 7."]
    ], ["Count the independent ways the thing can move or turn.", "One joint usually gives one DOF. Free movement in 3D needs three slides and three turns.", "Example: a sliding drawer can only slide, so it has one DOF. Now try yours."], [
      ["A door on a hinge has how many degrees of freedom?", "1", "3", "6"],
      ["A free object in 3D space has how many DOF?", "6", "3", "2"],
      ["A robot arm with 4 simple joints has about how many DOF?", "4", "6", "1"],
      ["A wheeled robot on a flat floor has DOF of...", "3", "1", "6"],
      ["To place a robot hand anywhere in space, at any angle, you need at least...", "6 joints", "2 joints", "10 wheels"],
      ["A drawer that only slides has...", "1 DOF", "6 DOF", "3 DOF"],
      ["Roll, pitch and yaw are...", "Three ways to turn", "Three kinds of fuel", "Three batteries"],
      ["Each joint on a robot arm usually adds...", "One degree of freedom", "Zero", "Ten"],
      ["A drone can move in how many independent ways?", "6", "2", "1"]
    ])
  ];
  b[18] = mix("Mixed practice", at(b, [0, 1, 2, 3, 4, 5, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17]));
  b[19] = mix("Level 20 Challenge", at(b, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));


  // ================= LEVEL 21 =================
  const c = [
    gen("Decibels", [
      ["A ratio scale", "🔊", "The <b>decibel</b> (dB) compares two powers on a scale that adds up instead of multiplies. dB = 10 × log₁₀(power ratio). Every ×10 in power adds 10 dB."],
      ["Landmarks", "📊", "×10 = 10 dB, ×100 = 20 dB, ×1000 = 30 dB. Doubling the power adds about 3 dB, so ×4 is about 6 dB and ×8 is about 9 dB."],
      ["Used for", "🎧", "Sound levels, radio signals and amplifiers all use dB, because their sizes cover enormous ranges. A sound 10 dB louder has 10 times the power."]
    ], () => {
      const kk = ri(1, 5), j = ri(2, 5), L = ri(3, 9) * 10;
      return pick([
        Q(`A signal's power is multiplied by ${10 ** kk}. By how many dB does it rise?`, "📶", 10 * kk, ["Count the zeros in the multiplier.", "Each zero (each factor of ten) is worth the same number of dB.", "Example: ×1000 has three zeros, so 30 dB. Now do yours."]),
        Q(`An amplifier adds ${10 * kk} dB. By what number is the power multiplied?`, "🔈", 10 ** kk, ["Each ten dB means one more factor of ten.", "Divide the dB by the dB per factor of ten, then write that many tens multiplied together.", "Example: 30 dB is ×1000, since three tens make a thousand. Now do yours."]),
        Q(`Each doubling of power adds about 3 dB. Power is multiplied by ${2 ** j}. About how many dB is that?`, "✌️", 3 * j, ["Count how many doublings make that multiplier.", "Multiply the number of doublings by the dB per doubling.", "Example: ×8 is three doublings, so about 9 dB. Now do yours."]),
        Q(`A sound rises from ${L} dB to ${L + 10 * kk} dB. By what factor does the sound power increase?`, "🎧", 10 ** kk, ["Find the dB difference.", "Each 10 dB of difference is one factor of ten.", "Example: from 40 dB to 60 dB is 20 dB, which is ×100. Now do yours."])
      ]);
    }),
    gen("Op-amp amplifiers", [
      ["Op-amp", "🔺", "An <b>operational amplifier</b> (op-amp) is a tiny chip that boosts small voltages. With feedback resistors Rf and Rin, we can set its gain."],
      ["Two types", "🔁", "Inverting: gain = - Rf ÷ Rin (the output flips sign). Non-inverting: gain = 1 + Rf ÷ Rin. A voltage follower has gain 1 and is used to buffer a signal."],
      ["Ideal rules", "📏", "An ideal op-amp draws no input current and tries to make both inputs equal. Real ones can't output more than their supply voltage."]
    ], () => {
      const R = pick([1, 2, 5, 10]), kk = ri(2, 9), v = ri(1, 5);
      return pick([
        Q(`Inverting op-amp: Rin = ${R} kΩ, Rf = ${R * kk} kΩ. The input is ${v} V. What is the SIZE of the output in volts? (Ignore the minus sign and supply limits.)`, "🔺", kk * v, ["The size of the gain is Rf divided by Rin.", "Find the gain by dividing the resistors, then multiply by the input.", "Example: Rin = 1 kΩ, Rf = 4 kΩ, input 2 V gives gain 4 and output size 8 V. Now do yours."]),
        Q(`Non-inverting op-amp: Rin = ${R} kΩ, Rf = ${R * kk} kΩ. The input is ${v} V. What is the output in volts? (Ignore supply limits.)`, "🔼", (kk + 1) * v, ["This type adds one to the resistor ratio.", "Gain = 1 + Rf ÷ Rin, then multiply by the input.", "Example: Rin = 1 kΩ, Rf = 4 kΩ, input 2 V gives gain 5 and output 10 V. Now do yours."]),
        Q(`Non-inverting op-amp: Rin = ${R} kΩ, Rf = ${R * kk} kΩ. What is the gain?`, "🎚️", kk + 1, ["Compare Rf with Rin first.", "Take the resistor ratio, then add the extra amount this type always has.", "Example: Rf ÷ Rin = 4 gives a gain of 5. Now do yours."]),
        Q(`A voltage follower op-amp is fed ${v} V. How many volts come out?`, "🔁", v, ["A follower is built to copy its input.", "Its gain is exactly the number that leaves a value unchanged when multiplied.", "Example: a follower given 7 V outputs 7 V. Now do yours."])
      ]);
    }),
    gen("Alternating current", [
      ["Back and forth", "〰️", "<b>AC</b> flips direction many times a second. <b>Frequency</b> (Hz) is cycles per second. Home power is 50 Hz in many countries and 60 Hz in others, such as the US."],
      ["Period", "⏱️", "The <b>period</b> is the time for one cycle: period = 1 ÷ frequency. A 100 Hz signal has a period of 1/100 s = 10 ms."],
      ["Peak", "📈", "The <b>peak</b> is the biggest voltage in one direction. The <b>peak-to-peak</b> value runs from the highest to the lowest: it is 2 × peak."]
    ], () => {
      const f = pick([50, 100, 125, 200, 250, 500, 1000]), p = pick([1, 2, 4, 5, 8, 10, 20, 25, 40, 50]), g = pick([50, 60, 100, 400]), t = ri(2, 9), pk = ri(2, 170);
      return pick([
        Q(`An AC signal has a frequency of ${f} Hz. What is its period in milliseconds? (1000 ms = 1 s)`, "〰️", 1000 / f, ["Period and frequency are opposites.", "Divide one thousand milliseconds by the frequency.", "Example: 250 Hz gives 1000 ÷ 250 = 4 ms. Now do yours."]),
        Q(`An AC signal has a period of ${p} milliseconds. What is its frequency in Hz?`, "🔁", 1000 / p, ["Frequency tells how many periods fit in a second.", "Divide one thousand milliseconds by the period.", "Example: a period of 4 ms gives 250 Hz. Now do yours."]),
        Q(`A ${g} Hz supply runs for ${t} seconds. How many full cycles is that?`, "🔌", g * t, ["Hz means cycles every second.", "Multiply the frequency by the seconds.", "Example: 50 Hz for 3 s gives 150 cycles. Now do yours."]),
        Q(`A sine wave has a peak of ${pk} V. What is its peak-to-peak voltage?`, "📈", 2 * pk, ["Peak-to-peak spans from the lowest point to the highest point.", "It is double the peak value.", "Example: a peak of 5 V gives 10 V peak-to-peak. Now do yours."])
      ]);
    }),
    les("Inductors", [
      ["Coils", "🧲", "An <b>inductor</b> is a coil of wire. When current flows, it makes a magnetic field and stores energy in it. Its unit is the <b>henry</b> (H)."],
      ["Resisting change", "🚧", "An inductor resists sudden changes in current. If you cut the current quickly, it pushes back with a voltage spike. That is why motors and relays need flyback diodes."],
      ["Uses", "📻", "Inductors filter noise in power supplies, tune radios with a capacitor, and form the coils inside transformers and electric motors."]
    ], ["Think of what an inductor stores energy in, and what it dislikes.", "It resists a change in current, the way a heavy wheel resists a change in speed.", "Example: a capacitor stores energy in an electric field; an inductor uses a different kind of field. Now try yours."], [
      ["An inductor stores energy in a...", "Magnetic field", "Chemical store", "Tank of water"],
      ["The unit of inductance is the...", "Henry", "Farad", "Ohm"],
      ["An inductor resists changes in...", "Current", "Color", "Temperature of the room"],
      ["An inductor is mostly a...", "Coil of wire", "Flat plate", "Glass tube"],
      ["A capacitor stores energy in a(n)...", "Electric field", "Magnetic field", "Spring"],
      ["Why do relays and motors need a flyback diode?", "Inductors make a voltage spike when current stops", "They need more current", "They get too cold"],
      ["An inductor and capacitor together can...", "Tune a radio", "Cook food", "Cut metal"],
      ["Inductors in power supplies help to...", "Smooth out noise", "Make sound louder", "Store water"],
      ["A transformer is made from...", "Coils of wire", "Plain glass", "Springs"]
    ]),
    gen("PID control", [
      ["Three parts", "🎛️", "A <b>PID</b> controller steers a system using error = target - actual. <b>P</b> (proportional) reacts to the present error: output = Kp × error."],
      ["I and D", "⏳", "<b>I</b> (integral) adds up the error over time: Ki × the sum of errors. It removes small leftover errors. <b>D</b> (derivative) looks at how fast the error is changing: Kd × the change in error. It brakes before overshooting."],
      ["Example", "🤖", "A robot is 10 cm from its target and Kp = 3, so P gives 30 units of push. As the error shrinks, the push gets gentler."]
    ], () => {
      const Kp = ri(2, 9), e = ri(2, 20), Ki = ri(2, 5), es = [ri(1, 9), ri(1, 9), ri(1, 9), ri(1, 9)], Kd = ri(2, 6), e2 = ri(1, 8), e1 = e2 + ri(2, 9);
      const choose = pick([
        ["Which part reacts to how big the error is right now?", "P (proportional)"],
        ["Which part adds up past errors to remove a small leftover error?", "I (integral)"],
        ["Which part reacts to how fast the error is changing, to prevent overshoot?", "D (derivative)"]
      ]);
      return pick([
        Q(`Kp = ${Kp} and the error is ${e}. What is the P output?`, "🎛️", Kp * e, ["The P part depends only on the current error.", "Multiply the gain by the error.", "Example: Kp = 4 and error 6 gives 24. Now do yours."]),
        Q(`Ki = ${Ki}. The last four errors were ${es.join(", ")}. What is the I output? (Ki × the sum of the errors)`, "➕", Ki * es.reduce((s, x) => s + x, 0), ["The I part uses the history of errors.", "Add up all the errors first, then multiply the total by the gain.", "Example: Ki = 2 and errors 1, 2, 3 give 2 × 6 = 12. Now do yours."]),
        Q(`Kd = ${Kd}. The error fell from ${e1} to ${e2} in one step. How big is the braking (D) output? (Ignore the sign.)`, "🛑", Kd * (e1 - e2), ["The D part cares about the size of the change.", "Find how much the error fell, then multiply by the gain.", "Example: Kd = 3, error falls from 9 to 5: change 4, output 12. Now do yours."]),
        Q(choose[0], "🧠", choose[1], ["Think about whether the part looks at now, the past, or the speed of change.", "One part reacts to now, one remembers the past, and one watches the trend.", "Example: a part that watches the trend is like a driver who eases off the gas when the target is approaching fast. Now do yours."], ["P (proportional)", "I (integral)", "D (derivative)"])
      ]);
    }),
    les("Overshoot and damping", [
      ["Oscillation", "🔁", "A spring, a swing or a robot arm that is pushed to a position can overshoot and wobble before settling. <b>Damping</b> removes the wobble."],
      ["Three cases", "📉", "<b>Underdamped</b>: it overshoots and oscillates a few times. <b>Overdamped</b>: it creeps slowly with no overshoot. <b>Critically damped</b>: fastest return with no overshoot."],
      ["Real life", "🚗", "Car shock absorbers damp the bounce of springs. A door closer is close to critically damped. In control, <b>settling time</b> is how long to stay near the target, and <b>steady-state error</b> is what is left at the end."]
    ], ["Think about whether the thing wobbles, creeps, or settles perfectly.", "Wobbling means too little damping. Creeping means too much. The best case is in between.", "Example: a swing with no friction keeps swinging, so it has no damping at all. Now try yours."], [
      ["An underdamped system...", "Overshoots and wobbles", "Never moves", "Creeps without overshoot"],
      ["An overdamped system...", "Creeps slowly with no overshoot", "Wobbles a lot", "Explodes"],
      ["Critically damped means...", "Fastest return with no overshoot", "No movement ever", "Maximum wobble"],
      ["Car shock absorbers are there to...", "Damp the bounce", "Add more bounce", "Make the car lighter"],
      ["Settling time is...", "How long to stay near the target", "How tall the system is", "The cost of the controller"],
      ["Steady-state error is...", "The error left at the end", "The error at the start", "A computer fault"],
      ["A swing with no friction at all would...", "Keep swinging", "Stop right away", "Fall up"],
      ["Too much damping makes a system...", "Slow", "Fast and wobbly", "Louder"],
      ["A good door closer is close to...", "Critically damped", "Undamped", "Broken"]
    ]),
    gen("Two-link robot arm", [
      ["Reach", "🦾", "A robot arm with two links of length L₁ and L₂ can reach as far as L₁ + L₂ (fully stretched)."],
      ["Closest point", "↩️", "Folded back on itself, the hand can come as close as the difference of the two lengths |L₁ - L₂|. Points between the minimum and the maximum are reachable."],
      ["Right angle", "📐", "With the elbow bent at a right angle, the hand is at distance √(L₁² + L₂²) from the shoulder. 3-4-5 and 5-12-13 triangles give whole numbers."]
    ], () => {
      const L1 = ri(5, 30), L2 = ri(5, 30), T = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10]]), k = ri(2, 6), mn = Math.abs(L1 - L2), mx = L1 + L2, inside = Math.random() < 0.5, d = inside ? ri(mn + 1, mx - 1) : pick([mx + ri(1, 8), Math.max(mn - ri(1, 4), 0)]);
      return pick([
        Q(`A robot arm has links of ${L1} cm and ${L2} cm. What is its maximum reach, in cm?`, "🦾", L1 + L2, ["Maximum reach is with the arm fully straight.", "Add the two link lengths.", "Example: links of 12 cm and 9 cm reach 21 cm. Now do yours."]),
        Q(`A robot arm has links of ${L1} cm and ${L2} cm. When folded back on itself, how close can the hand get to the shoulder, in cm?`, "↩️", mn, ["The links point in opposite directions.", "Subtract the shorter link from the longer one.", "Example: links of 12 cm and 9 cm fold to 3 cm. Now do yours."]),
        Q(`Links of ${T[0] * k} cm and ${T[1] * k} cm meet at a right angle at the elbow. How far is the hand from the shoulder, in cm?`, "📐", T[2] * k, ["The shoulder, elbow and hand form a right triangle.", "The distance is the long side. The sides are a Pythagorean triple scaled up.", "Example: links of 30 and 40 give 50 (3-4-5 times 10). Now do yours."]),
        Q(`A robot arm has links of ${L1} cm and ${L2} cm. Can its hand reach a point ${d} cm from the shoulder?`, "🎯", d >= mn && d <= mx ? "Yes" : "No", ["Work out the nearest and furthest points the hand can reach.", "A point is reachable only if its distance is between the minimum and maximum reach.", "Example: links of 10 and 6 reach from 4 to 16 cm, so 20 cm is out of reach. Now do yours."], ["Yes", "No"])
      ]);
    }),
    gen("Law of cosines", [
      ["Any triangle", "🔺", "For any triangle with sides a and b and the angle C between them, the third side c follows: c² = a² + b² - 2ab·cos C. With C = 90° it becomes Pythagoras."],
      ["Values", "📏", "cos 60° = 0.5, cos 90° = 0, cos 120° = -0.5. For 60°: c² = a² + b² - ab. For 120°: c² = a² + b² + ab."],
      ["Use", "🛠️", "Two struts meeting at an angle make a triangle with the base. Engineers use this to find the base length or the distance between two points when only an angle and two lengths are known."]
    ], () => {
      const T = pick([[5, 8, 60, 7], [3, 8, 60, 7], [7, 15, 60, 13], [3, 5, 120, 7], [8, 7, 120, 13], [5, 16, 120, 19], [3, 4, 90, 5], [5, 12, 90, 13]]), k = ri(1, 3), s = ri(3, 12);
      return pick([
        Q(`Two struts of ${T[0] * k} cm and ${T[1] * k} cm meet at an angle of ${T[2]}°. How long is the third side, in cm? (Use c² = a² + b² - 2ab cos C.)`, "🔺", T[3] * k, ["First work out c², then take a square root.", "Use the value of cos for the angle from the slide, put in the two sides, and add and subtract.", "Example: sides 3 and 5 at 120°: c² = 9 + 25 + 15 = 49, so c = 7. Now do yours."]),
        Q(`In a triangle, the side opposite a 30° angle is ${s} cm. The side opposite the 90° angle is how many cm? (Law of sines: side ÷ sin angle is the same for all sides. sin 30° = 0.5, sin 90° = 1.)`, "📐", 2 * s, ["The ratio side ÷ sin(angle) is the same for every side.", "Divide the known side by its sine to get the ratio, then multiply by the other sine.", "Example: opposite 30° is 4, so ratio = 8, and opposite 90° is 8. Now do yours."])
      ]);
    }),
    gen("Bending in a beam", [
      ["Supports", "🌉", "A beam resting on two supports with a load pushes down, and each support pushes up. For a load P in the middle, each support carries P ÷ 2."],
      ["Bending moment", "💪", "The bending moment is the beam's twisting-bend effect. For a middle load P on a span L, the biggest moment is M = P × L ÷ 4 (in N·m)."],
      ["Spread-out loads", "🧱", "A load spread along the beam (like snow) has total load = w × L, where w is load per meter. Each support carries half of the total."]
    ], () => {
      const P = ri(2, 20) * 2, L = ri(2, 12), p4 = ri(1, 10) * 4, w = ri(2, 9), L2 = ri(1, 6) * 2;
      return pick([
        Q(`A beam rests on two supports. A ${P} N load sits exactly in the middle. How many N does each support carry?`, "🌉", P / 2, ["The load is central, so the supports share it equally.", "Divide the load by the number of supports.", "Example: a 30 N load in the middle gives 15 N at each end. Now do yours."]),
        Q(`A beam spans ${L} m with a ${p4} N load in the middle. What is the biggest bending moment in N·m? (M = P × L ÷ 4)`, "💪", p4 * L / 4, ["Put the load and the span into the formula.", "Multiply them, then divide by four.", "Example: P = 20 N, L = 6 m gives 20 × 6 ÷ 4 = 30 N·m. Now do yours."]),
        Q(`Snow loads a beam at ${w} N per meter, and the beam is ${L} m long. What is the total load, in N?`, "❄️", w * L, ["Total load is spread along the whole length.", "Multiply the load per meter by the length.", "Example: 5 N per meter on a 4 m beam is 20 N. Now do yours."]),
        Q(`A ${L2} m beam carries ${w} N per meter spread evenly. How many N does each of the two supports carry?`, "🏔️", w * L2 / 2, ["Find the total load first.", "The supports share the total load equally.", "Example: 4 N per meter on a 6 m beam is 24 N total, so 12 N each. Now do yours."])
      ]);
    }),
    gen("Flywheels and spinning energy", [
      ["Spinning energy", "🎡", "A spinning object stores <b>rotational kinetic energy</b>: E = ½ × I × ω², where I is the moment of inertia (how hard it is to spin, in kg·m²) and ω is the speed in rad/s."],
      ["Speed matters", "⚡", "Because ω is squared, doubling the speed gives 4 times the energy. Tripling gives 9 times."],
      ["Flywheels", "🔋", "A <b>flywheel</b> is a heavy wheel that stores energy to smooth out an engine's pulses or to power a machine for a short time."]
    ], () => {
      const I = 2 * ri(1, 6), w = ri(2, 12), kk = ri(2, 5), f = ri(2, 9);
      return pick([
        Q(`A flywheel has I = ${I} kg·m² and spins at ${w} rad/s. How many joules of energy does it store? (E = ½ × I × ω²)`, "🎡", I / 2 * w * w, ["Square the speed first.", "Square ω, multiply by I, then halve it.", "Example: I = 4 and ω = 3: ½ × 4 × 9 = 18 J. Now do yours."]),
        Q(`A flywheel spins ${kk} times faster than before. By what factor does its stored energy increase?`, "⚡", kk * kk, ["Energy depends on speed times speed.", "Multiply the speed factor by itself.", "Example: 3 times faster gives 9 times the energy. Now do yours."]),
        Q(`A spinning wheel has I = ${2 * f} kg·m² and stores ${f * w * w} J. How fast is it turning, in rad/s? (E = ½ × I × ω²)`, "🌀", w, ["Work backwards from the energy formula.", "Double the energy, divide by I, then take a square root.", "Example: E = 36 J and I = 8: 72 ÷ 8 = 9, and the square root is 3 rad/s. Now do yours."])
      ]);
    }),
    gen("Impulse and collisions", [
      ["Impulse", "💥", "<b>Impulse</b> is force × time. It equals the change in momentum: F × t = m × Δv. The unit is N·s."],
      ["Softer stops", "🛡️", "To stop the same moving object, a longer time means a smaller force. That is why airbags, crumple zones and helmets with foam spread the stopping over more time."],
      ["Example", "🥎", "A 2 kg ball changes speed by 6 m/s, so the impulse is 12 N·s. If that happens over 3 s, the average force is 12 ÷ 3 = 4 N."]
    ], () => {
      const F = ri(2, 20), t = ri(2, 9), m = ri(2, 12), dv = ri(2, 12);
      return pick([
        Q(`A force of ${F} N acts for ${t} seconds. What is the impulse, in N·s?`, "💥", F * t, ["Impulse combines the push and how long it lasts.", "Multiply the force by the time.", "Example: 5 N for 4 s gives 20 N·s. Now do yours."]),
        Q(`A ${m} kg cart changes its speed by ${dv} m/s. What is the impulse needed, in N·s?`, "🛒", m * dv, ["Impulse equals the change in momentum.", "Multiply the mass by the change in speed.", "Example: 3 kg changing by 4 m/s needs 12 N·s. Now do yours."]),
        Q(`A crash dummy's momentum of ${F * t} kg·m/s is stopped over ${t} seconds. What is the average force, in N?`, "🚗", F, ["Impulse equals force times time.", "Divide the momentum change by the time.", "Example: 30 kg·m/s stopped in 5 s means 6 N. Now do yours."]),
        Q(`The same momentum change of ${F * t * 2} kg·m/s is stopped over ${t * 2} seconds instead of ${t} seconds. What is the force now, in N?`, "🛡️", F, ["A longer stopping time changes the force.", "Divide the momentum change by the longer time.", "Example: 40 kg·m/s over 8 s is 5 N, while over 4 s it would have been 10 N. Now do yours."])
      ]);
    }),
    gen("Heat pumps and COP", [
      ["Moving heat", "♨️", "A <b>heat pump</b> or refrigerator moves heat instead of making it. It uses electricity to carry heat from a cold place to a warm place."],
      ["COP", "🔢", "The <b>coefficient of performance</b> is COP = heat moved ÷ electrical energy used. A COP of 3 means 3 kWh of heat for every 1 kWh of electricity."],
      ["Why good", "🌱", "A direct electric heater has a COP of 1. A heat pump with COP 3 gives three times the heating from the same electricity, so it saves energy."]
    ], () => {
      const cop = ri(2, 5), W = ri(2, 12), Hh = cop * W;
      return pick([
        Q(`A heat pump has a COP of ${cop} and uses ${W} kWh of electricity. How many kWh of heat does it deliver?`, "♨️", Hh, ["COP tells you how many times more heat than electricity you get.", "Multiply the electricity used by the COP.", "Example: COP 3 and 4 kWh used gives 12 kWh of heat. Now do yours."]),
        Q(`A heat pump delivers ${Hh} kWh of heat using ${W} kWh of electricity. What is its COP?`, "🔢", cop, ["COP compares the heat moved with the electricity used.", "Divide the heat by the electricity.", "Example: 12 kWh of heat from 4 kWh of electricity is a COP of 3. Now do yours."]),
        Q(`A heat pump with a COP of ${cop} must deliver ${Hh} kWh of heat. How many kWh of electricity does it use?`, "🔌", W, ["Work backwards from the heat delivered.", "Divide the heat needed by the COP.", "Example: COP 3 and 12 kWh of heat needs 4 kWh of electricity. Now do yours."]),
        Q(`A direct electric heater has a COP of 1. To deliver ${Hh} kWh of heat, how many kWh of electricity does it use?`, "🔥", Hh, ["Think about what a COP of one means.", "When COP is one, the heat equals the electricity.", "Example: to deliver 5 kWh of heat, a COP-1 heater uses 5 kWh of electricity. Now do yours."])
      ]);
    }),
    gen("Carnot efficiency and kelvin", [
      ["Kelvin", "🌡️", "In thermodynamics we use the <b>kelvin</b> scale: K = °C + 273. So 0 °C is 273 K and 27 °C is 300 K."],
      ["Best possible", "🏆", "No heat engine can beat the <b>Carnot efficiency</b>: η = 1 - T_cold ÷ T_hot, with temperatures in kelvin. It is the upper limit for any engine working between those temperatures."],
      ["Example", "🏭", "A power plant with hot steam at 600 K and cooling water at 300 K: η = 1 - 300/600 = 0.5, or 50% at most. Real engines are lower because of friction and heat leaks."]
    ], () => {
      const P = pick([[300, 600], [300, 500], [200, 400], [300, 1000], [250, 500], [400, 500], [300, 400], [240, 300], [270, 360], [320, 400], [300, 750]]), C = ri(0, 100);
      return pick([
        Q(`A temperature of ${C} °C is how many kelvin? (K = °C + 273)`, "🌡️", C + 273, ["Kelvin starts lower than Celsius.", "Add the offset between the two scales.", "Example: 20 °C is 293 K. Now do yours."]),
        Q(`What is the best possible (Carnot) efficiency, in percent, for an engine between a hot side at ${P[1]} K and a cold side at ${P[0]} K?`, "🏭", Math.round(100 * (1 - P[0] / P[1])), ["Divide the cold temperature by the hot temperature first.", "Subtract that fraction from one, then turn it into a percent.", "Example: cold 200 K and hot 400 K: 1 - 0.5 = 0.5, which is 50%. Now do yours."])
      ]);
    }),
    les("Laminar and turbulent flow", [
      ["Two kinds of flow", "🌊", "Smooth, layered flow is <b>laminar</b>. Messy, swirling flow is <b>turbulent</b>. Slow flow in a narrow pipe is usually laminar. Fast flow in a wide pipe is turbulent."],
      ["Reynolds number", "🔢", "The <b>Reynolds number</b> Re = (density × speed × diameter) ÷ viscosity predicts which one you get. Low Re means laminar, high Re means turbulent. In a pipe the change happens at roughly Re 2300 to 4000."],
      ["Uses", "⛳", "Turbulent flow mixes fluids well, which is great for stirring. It also causes more drag. Golf balls have dimples to make a thin turbulent layer that lets air cling and reduces drag."]
    ], ["Think of whether the flow is smooth and layered or messy and swirling.", "Fast, wide and thin fluids tend toward swirling. Slow, narrow and thick fluids stay smooth.", "Example: honey poured slowly stays smooth, so it is laminar. Now try yours."], [
      ["Smooth layered flow is called...", "Laminar", "Turbulent", "Frozen"],
      ["Messy swirling flow is called...", "Turbulent", "Laminar", "Silent"],
      ["A low Reynolds number usually means...", "Laminar flow", "Turbulent flow", "No fluid"],
      ["A high Reynolds number usually means...", "Turbulent flow", "Laminar flow", "A small pipe"],
      ["Reynolds number depends on density, speed, diameter and...", "Viscosity", "Color", "Price"],
      ["Why do golf balls have dimples?", "They reduce drag", "To hold paint", "To make them heavier"],
      ["Turbulent flow is good for...", "Mixing fluids", "Making no drag", "Keeping things silent"],
      ["Which is more likely laminar?", "Honey flowing slowly in a narrow tube", "A fast river over rocks", "Water from a burst pipe"],
      ["Turbulence usually causes more...", "Drag", "Silence", "Heat-free flow"]
    ]),
    les("PLCs and ladder logic", [
      ["Factory brains", "🏭", "A <b>PLC</b> (programmable logic controller) is a tough computer that runs factory machines. It reads inputs (buttons, sensors) and switches outputs (motors, lamps)."],
      ["Ladder logic", "🪜", "<b>Ladder logic</b> looks like a ladder, with rungs. Two contacts in series on a rung act like AND. Contacts in parallel act like OR. The rung's output is a coil, like a lamp or motor."],
      ["Safe design", "🛑", "The PLC repeats a scan: read inputs, run the program, write outputs, again and again. Emergency stop buttons are wired as normally closed, so a broken wire also stops the machine. This is called fail-safe."]
    ], ["Think of a rung as a path that power must follow to reach the output.", "Series needs every part to be on. Parallel needs just one.", "Example: a machine that runs only if the guard is closed AND the start button is pressed uses two contacts in series. Now try yours."], [
      ["Two contacts in series on a rung work like...", "AND", "OR", "NOT"],
      ["Two contacts in parallel on a rung work like...", "OR", "AND", "NOR only"],
      ["What does PLC stand for?", "Programmable logic controller", "Power line connector", "Plastic liquid cooler"],
      ["A PLC scan cycle is...", "Read inputs, run program, write outputs", "Write outputs, then switch off", "Only run once a day"],
      ["Emergency stop buttons are wired normally closed so that...", "A broken wire also stops the machine", "The machine never stops", "They glow"],
      ["Fail-safe means...", "If something breaks, it goes to a safe state", "It can never break", "It is very cheap"],
      ["The output on a ladder rung is called a...", "Coil", "Rung", "Scan"],
      ["PLCs mainly control...", "Factory machines", "Cell phone games", "Radio stations"],
      ["Inputs to a PLC can be...", "Buttons and sensors", "Only lamps", "Only motors"]
    ]),
    les("Databases", [
      ["Tables", "🗄️", "A <b>database</b> stores organized data in tables. Each <b>row</b> is one record (one part, one test) and each <b>column</b> is a field (name, weight, date)."],
      ["Keys and queries", "🔑", "A <b>primary key</b> is a unique ID for each row. A <b>query</b> asks the database a question, such as: SELECT name FROM parts WHERE weight > 5. <b>SQL</b> is a language for this."],
      ["Good habits", "💾", "A <b>foreign key</b> links one table to another. An <b>index</b> speeds up searches. Always keep <b>backups</b>, because a database is often a company's most valuable data."]
    ], ["Think about what a row is, what a column is, and what a key is for.", "Rows are records, columns are fields, keys make each row unique.", "Example: in a class list table, each student is one row, and the student ID could be the key. Now try yours."], [
      ["In a database table, each row is usually...", "One record", "One field name", "One backup"],
      ["Each column holds...", "One kind of data (a field)", "A whole database", "A single key only"],
      ["A primary key is...", "A unique ID for each row", "A password for all users", "The name of the table"],
      ["SQL is used to...", "Ask questions of a database", "Draw 3D models", "Cook food"],
      ["SELECT name FROM parts WHERE weight > 5 returns...", "Names of parts heavier than 5", "The weight of one part", "All parts lighter than 5"],
      ["An index in a database helps with...", "Faster searching", "Deleting data", "Making copies of the screen"],
      ["A foreign key...", "Links one table to another", "Locks the building", "Counts rows only"],
      ["Why keep backups of a database?", "To recover data if something goes wrong", "To make it slower", "To use more power"],
      ["Which could be a field in a parts table?", "Weight", "The whole table", "A cable"]
    ]),
    gen("How fast does work grow?", [
      ["Big-O", "📈", "<b>Big-O</b> describes how the work of a program grows when the input size n grows. O(n) means work grows in step with n. O(n²) means work grows with n × n."],
      ["Doubling test", "✌️", "If you double n: O(n) work doubles (×2), O(n²) work multiplies by 4, O(n³) by 8. Nested loops give n × n steps (two loops) or n × n × n (three loops)."],
      ["Why care", "⏱️", "A loop in a loop on 1000 items does a million steps. Engineers pick fast methods so programs stay quick when the data gets big."]
    ], () => {
      const n = ri(5, 40), m = ri(3, 9), pw = pick([1, 2, 3]), lab = ["", "O(n)", "O(n²)", "O(n³)"][pw], ans = ["", "2 times", "4 times", "8 times"][pw];
      return pick([
        Q(`Two nested loops each run ${n} times. How many steps does the inner code run in total?`, "🔁", n * n, ["The inner loop runs fully for each pass of the outer loop.", "Multiply the two loop counts.", "Example: loops of 6 and 6 give 36 steps. Now do yours."]),
        Q(`Three nested loops each run ${m} times. How many steps does the inner code run in total?`, "🔂", m * m * m, ["Each loop multiplies the count again.", "Multiply the loop count by itself three times.", "Example: three loops of 3 give 27 steps. Now do yours."]),
        Q(`An algorithm takes ${lab} time. If the input size doubles, the work grows by about...`, "✌️", ans, ["Think about how the formula changes when n becomes 2n.", "Square or cube the doubling factor, depending on the power of n.", "Example: for O(n²), doubling gives 2 × 2 = 4 times the work. Now do yours."], ["2 times", "4 times", "8 times"]),
        Q(`An O(n²) program does ${n * n} steps for n = ${n}. How many steps for n = ${2 * n}?`, "📈", 4 * n * n, ["Work out how the work changes when n doubles.", "For O(n²), doubling the input multiplies the work by the square of the factor.", "Example: 100 steps at n = 10 means 400 steps at n = 20. Now do yours."])
      ]);
    }),
    gen("Failure modes: FMEA", [
      ["What is FMEA?", "🔍", "<b>FMEA</b> means Failure Modes and Effects Analysis. Engineers list each way a part could fail (the <b>failure mode</b>), what would happen (the <b>effect</b>), and the cause."],
      ["Scoring", "📝", "Each failure mode is scored 1 to 10 for <b>severity</b> (S: how bad), <b>occurrence</b> (O: how often) and <b>detection</b> (D: how hard to notice, 10 = very hard)."],
      ["RPN", "🧮", "<b>Risk Priority Number</b> RPN = S × O × D. Fix the highest RPN first. Example: 8 × 3 × 2 = 48."]
    ], () => {
      const S = ri(2, 10), O = ri(2, 10), D = ri(2, 10), S2 = ri(2, 10), O2 = ri(2, 10), D2 = ri(2, 10), r1 = S * O * D, r2 = S2 * O2 * D2;
      return pick([
        Q(`A failure mode scores severity ${S}, occurrence ${O} and detection ${D}. What is its RPN?`, "🧮", r1, ["The RPN combines all three scores.", "Multiply the three scores together.", "Example: 4, 3 and 5 give 4 × 3 × 5 = 60. Now do yours."]),
        Q(`A failure mode has RPN ${r1}, with severity ${S} and occurrence ${O}. What is its detection score?`, "🔎", D, ["Work backwards from the RPN.", "Divide the RPN by the other two scores.", "Example: RPN 60, severity 4, occurrence 3: 60 ÷ 12 = 5. Now do yours."]),
        Q(`Failure A: S ${S}, O ${O}, D ${D}. Failure B: S ${S2}, O ${O2}, D ${D2}. Which should be fixed first?`, "📋", r1 === r2 ? "They tie" : r1 > r2 ? "Failure A" : "Failure B", ["Work out the RPN for each failure.", "The failure with the larger RPN is the higher priority.", "Example: RPN 48 versus RPN 60: the second one is fixed first. Now do yours."], ["Failure A", "Failure B", "They tie"]),
        Q(`In FMEA, a detection score of 10 means the problem is...`, "👀", "Very hard to notice", ["The scale tells how likely you are to catch the problem before it hurts someone.", "A high detection score is a warning sign.", "Example: a hidden crack inside a part would score high because it is hard to see. Now do yours."], ["Very hard to notice", "Very easy to notice", "Harmless"])
      ]);
    })
  ];
  c[18] = mix("Mixed practice", at(c, [0, 1, 2, 4, 6, 7, 8, 9, 10, 11, 12, 16, 17]));
  c[19] = mix("Level 21 Challenge", at(c, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));

  Object.assign(ENGINEER_LEVELS, { 19: a, 20: b, 21: c });
})();
