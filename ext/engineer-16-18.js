// ext/engineer-16-18.js  Engineering levels 16-18 (7th grade second half, 8th grade)
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
  const LET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // ================= LEVEL 16 =================
  const a = [
    les("Metric prefixes", [
      ["Prefixes", "🏷️", "A <b>prefix</b> at the front of a unit changes its size. <b>kilo</b> = 1000, <b>mega</b> = 1,000,000, <b>centi</b> = one hundredth, <b>milli</b> = one thousandth, <b>micro</b> = one millionth."],
      ["Examples", "📏", "1 kilometer = 1000 meters. 1 millimeter = one thousandth of a meter. A chip might use 5 microamps, a power plant might make 200 megawatts."],
      ["Which way?", "↔️", "Big prefixes (kilo, mega) mean you have many small units. Small prefixes (milli, micro) mean only a tiny piece of the unit."]
    ], ["Prefixes are labels for powers of ten.", "Decide first if the prefix is a big one or a small one.", "Example: a decimeter is a tenth of a meter, so 10 dm make 1 m. Now try yours."], [
      ["1 kilometer is how many meters?", "1000 m", "100 m", "10 m"],
      ["1 meter is how many millimeters?", "1000 mm", "100 mm", "10 mm"],
      ["1 meter is how many centimeters?", "100 cm", "1000 cm", "10 cm"],
      ["Which prefix means one thousand?", "kilo", "milli", "micro"],
      ["Which prefix means one millionth?", "micro", "mega", "kilo"],
      ["1 megawatt is how many watts?", "1,000,000 W", "1000 W", "100 W"],
      ["A millisecond is what part of a second?", "A thousandth", "A thousand", "A millionth"],
      ["Which is the biggest?", "1 kilogram", "1 gram", "1 milligram"],
      ["Which is the smallest?", "1 microamp", "1 milliamp", "1 amp"]
    ]),
    gen("Proportional relationships", [
      ["Same rate", "⚖️", "Two things are <b>proportional</b> when one is always the same number of times the other. A robot that moves 12 cm every second moves 24 cm in 2 seconds and 36 cm in 3 seconds."],
      ["Unit rate", "1️⃣", "The <b>unit rate</b> is the amount for ONE. If 4 gears cost $20, one gear costs $5. Divide the total by the count."],
      ["Using it", "🧮", "Once you know the unit rate, multiply to find any amount: cost = rate × number. Starting at zero and rising steadily is the mark of a proportional relationship."]
    ], () => {
      const r = ri(2, 9), t = ri(2, 6), T = ri(7, 12), k = ri(3, 9);
      return pick([
        Q(`A robot rolls ${r * t} cm in ${t} seconds at a steady speed. How far will it roll in ${T} seconds?`, "🤖", r * T, ["Find how far it goes in just one second first.", "Divide the distance by the time to get the rate, then multiply by the new time.", "Example: 30 cm in 5 s means 6 cm each second, so 8 s is 48 cm. Now do yours."]),
        Q(`${t} sensors cost $${r * t * 3}. What is the cost of one sensor, in dollars?`, "💲", r * 3, ["You want the amount for ONE sensor.", "Divide the total cost by the number of sensors.", "Example: 4 bolts cost $20, so one costs $5. Now do yours."]),
        Q(`A 3D printer uses ${r * 2} grams of plastic for each toy. How many grams does it use for ${k} toys?`, "🖨️", r * 2 * k, ["Each toy uses the same amount.", "Multiply the grams for one toy by the number of toys.", "Example: 7 g each for 10 toys is 70 g. Now do yours."]),
        Q(`A pump fills ${r * T} liters in ${T} minutes at a steady rate. How many liters does it fill in ${k} minutes?`, "🚰", r * k, ["First find the liters for one minute.", "Divide the liters by the minutes to get the rate, then multiply it by the new minutes.", "Example: 40 L in 8 min is 5 L per min, so 3 min is 15 L. Now do yours."])
      ]);
    }),
    gen("Solving equations for designs", [
      ["Undo the steps", "🔄", "An equation like 3x + 5 = 20 says \"some number times 3, plus 5, makes 20\". To find x, undo the steps in reverse order."],
      ["Step by step", "🪜", "Subtract 5 from both sides: 3x = 15. Then divide both sides by 3: x = 5. Whatever you do to one side, do to the other."],
      ["Check it", "✅", "Put your answer back in. 3 × 5 + 5 = 20, so it works. Engineers use equations to find the size or number of parts a design needs."]
    ], () => {
      const x = ri(3, 12), c = ri(2, 6), b = ri(1, 9);
      return pick([
        Q(`Solve for x: ${c}x + ${b} = ${c * x + b}`, "🧮", x, ["Undo the adding first.", "Subtract the plain number from both sides, then divide by the number in front of x.", "Example: 4x + 3 = 23. Subtract 3 to get 20, divide by 4 to get 5. Now do yours."]),
        Q(`Solve for x: ${c}x - ${b} = ${c * x - b}`, "🧮", x, ["Undo the subtracting first.", "Add the plain number to both sides, then divide by the number in front of x.", "Example: 4x - 3 = 17. Add 3 to get 20, divide by 4 to get 5. Now do yours."]),
        Q(`A bracket kit costs $${b} to start plus $${c} for each bracket. The bill was $${c * x + b}. How many brackets were bought?`, "🧾", x, ["Take away the part charged only once.", "Subtract the starting fee from the bill, then divide by the price of each bracket.", "Example: a $5 fee plus $2 each with a $19 bill: 19 - 5 = 14, 14 / 2 = 7 brackets. Now do yours."]),
        Q(`Solve for x: x / ${c} + ${b} = ${x + b}`, "🧮", x * c, ["The x is being divided. Undo the adding first.", "Subtract the plain number, then multiply both sides by the number x is divided by.", "Example: x / 4 + 2 = 5. Subtract 2 to get 3, multiply by 4 to get 12. Now do yours."].map(s => s))
      ].map((q, i) => i === 3 ? Q(`Solve for x: x / ${c} + ${b} = ${x + b}`, "🧮", x * c, q.hints) : q));
    }),
    gen("Inequalities and constraints", [
      ["Limits", "🚧", "A <b>constraint</b> is a limit. \"At most 50 grams\" means the total must be 50 or less (≤). \"At least 10 cm\" means 10 or more (≥)."],
      ["Fit under a limit", "📦", "A shelf holds at most 50 kg and each box is 12 kg. 4 boxes weigh 48 kg, which fits. 5 boxes weigh 60 kg, which is too much. So the most is 4 boxes."],
      ["Rounding", "🔼", "For a maximum, round DOWN to whole items. For a minimum number of things needed, round UP, because a part of a piece is not enough."]
    ], () => {
      const w = ri(5, 15), k = ri(3, 9), r = ri(1, w - 1), p = ri(4, 9), n = ri(3, 8), s = ri(1, p - 1), c = ri(3, 9), f = ri(10, 30), m = ri(4, 12);
      return pick([
        Q(`A model bridge can hold at most ${w * k + r} grams. Each block is ${w} grams. What is the greatest whole number of blocks it can hold?`, "🌉", k, ["The total weight of the blocks must stay at or under the limit.", "Divide the limit by the weight of one block, then round DOWN.", "Example: a limit of 50 g and 12 g blocks gives 50 / 12 = 4.1, so 4 blocks. Now do yours."]),
        Q(`A frame needs at least ${p * n - s} cm of rod. Rods come in pieces of ${p} cm. What is the smallest number of pieces you must buy?`, "📏", n, ["Pieces of rod cannot be cut from the air, so you need enough in total.", "Divide the length needed by the piece length, then round UP.", "Example: 25 cm needed from 10 cm pieces is 2.5, so 3 pieces. Now do yours."]),
        Q(`Your budget is $${f + c * m + ri(0, c - 1)}. A starter board costs $${f} and each sensor costs $${c}. What is the greatest number of sensors you can afford?`, "💰", null, ["Take the starter board out of the budget first.", "Divide what is left by the price of a sensor and round down.", "Example: $30 budget, $12 board, $5 sensors: 18 / 5 = 3.6, so 3 sensors. Now do yours."])
      ].map((q, i) => i === 2 ? (() => { const extra = ri(0, c - 1), B = f + c * m + extra; return Q(`Your budget is $${B}. A starter board costs $${f} and each sensor costs $${c}. What is the greatest number of sensors you can afford?`, "💰", m, q.hints); })() : q));
    }),
    gen("Weighted decision matrix", [
      ["Not all equal", "🏆", "When you compare designs, some goals matter more than others. A <b>decision matrix</b> gives each goal a <b>weight</b> (its importance) and each design a <b>score</b>."],
      ["Calculate", "🧮", "Multiply each score by its weight and add. Cost (weight 3) scored 4 and strength (weight 2) scored 5: 3 × 4 + 2 × 5 = 22."],
      ["Pick the winner", "🥇", "The design with the highest total wins. Changing the weights can change the winner, so choose weights before you score."]
    ], () => {
      const w1 = ri(2, 4), w2 = ri(1, 3), s1 = ri(1, 5), s2 = ri(1, 5);
      let a1 = ri(1, 5), a2 = ri(1, 5), b1 = ri(1, 5), b2 = ri(1, 5);
      while (w1 * a1 + w2 * a2 === w1 * b1 + w2 * b2) { b1 = ri(1, 5); b2 = ri(1, 5); }
      const A = w1 * a1 + w2 * a2, B = w1 * b1 + w2 * b2;
      return pick([
        Q(`Cost has weight ${w1} and strength has weight ${w2}. A design scores ${s1} for cost and ${s2} for strength. What is its total weighted score?`, "📊", w1 * s1 + w2 * s2, ["Each score is multiplied by the weight of its goal.", "Multiply cost score by the cost weight, strength score by the strength weight, then add.", "Example: weights 2 and 1, scores 3 and 4: 2 x 3 + 1 x 4 = 10. Now do yours."]),
        Q(`Weights: cost ${w1}, strength ${w2}. Design A scores ${a1} (cost) and ${a2} (strength). Design B scores ${b1} (cost) and ${b2} (strength). Which design has the higher total?`, "🏆", A > B ? "Design A" : "Design B", ["Work out a total for each design.", "For each design, multiply every score by its weight and add them up. Compare the two totals.", "Example: weights 2 and 1. A = 3 and 1 gives 7; B = 2 and 4 gives 8. B wins. Now do yours."], ["Design A", "Design B", "They tie"]),
        Q(`A design's total weighted score is ${w1 * s1 + w2 * s2}. Cost has weight ${w1} and its cost score is ${s1}. Strength has weight ${w2}. What is its strength score?`, "🔍", s2, ["The total is the cost part plus the strength part.", "Take the cost part (weight x score) away from the total, then divide by the strength weight.", "Example: total 17, cost part 2 x 5 = 10, left 7, weight 1 means a score of 7. Now do yours."])
      ]);
    }),
    gen("Volume of cylinders", [
      ["A can shape", "🥫", "A cylinder has a circle at each end. Its <b>volume</b> is the area of the circle times the height: V = π × r² × h. Use π ≈ 3.14."],
      ["Step by step", "🧮", "Radius 10 cm, height 5 cm: circle area = 3.14 × 10 × 10 = 314 square cm. Volume = 314 × 5 = 1570 cubic cm."],
      ["Where used", "🛢️", "Engineers use this for tanks, pipes, pistons and cans. The radius is half of the diameter, so check which one you are given."]
    ], () => {
      const r = pick([10, 20]), h = pick([5, 10, 15]), A = Math.round(3.14 * r * r);
      return pick([
        Q(`A cylinder tank has a radius of ${r} cm and a height of ${h} cm. What is its volume in cubic cm? (Use 3.14 for π.)`, "🛢️", A * h, ["Find the area of the circular end first.", "Circle area = 3.14 x radius x radius. Then multiply by the height.", "Example: radius 10 cm and height 20 cm: 314 x 20 = 6280 cubic cm. Now do yours."]),
        Q(`A round pipe has a diameter of ${2 * r} cm. What is the area of its circular end in square cm? (Use 3.14 for π.)`, "⭕", A, ["The formula uses the radius, not the diameter.", "Halve the diameter to get the radius, then multiply 3.14 by the radius twice.", "Example: radius 10 cm gives 3.14 x 10 x 10 = 314. Now try a different size for yours."]),
        Q(`A cylinder has a circular end of area ${A} square cm and a height of ${h} cm. What is its volume in cubic cm?`, "🥫", A * h, ["You already know the area of the end.", "Multiply the end area by the height.", "Example: end area 50 and height 4 gives a volume of 200. Now do yours."]),
        Q(`A cylinder has a volume of ${A * h} cubic cm and an end area of ${A} square cm. What is its height in cm?`, "📐", h, ["Volume = end area x height, so undo the multiplying.", "Divide the volume by the end area.", "Example: volume 600 and end area 50 gives 12 cm. Now do yours."])
      ]);
    }),
    gen("Scaling up", [
      ["Scale factor", "🔍", "If every length of a model is made <b>k</b> times bigger, then areas become <b>k × k</b> times bigger and volumes become <b>k × k × k</b> times bigger."],
      ["Example", "🧊", "A cube with side 1 cm has area 1 per face and volume 1. Make it 2 times bigger: each face has area 4, and the volume is 8 cubic cm."],
      ["Why it matters", "🐘", "Weight grows with volume but strength grows with area. So giant copies of a design can be too heavy for their own parts. That is why scale models are tested carefully."]
    ], () => {
      const k = ri(2, 5), k2 = ri(2, 4), A = ri(2, 9), V = ri(2, 6);
      return pick([
        Q(`A model plate has an area of ${A} square cm. A copy is made ${k} times longer and ${k} times wider. What is the area of the copy in square cm?`, "🍽️", A * k * k, ["Area grows with length times width.", "Multiply the area by the scale factor twice.", "Example: area 3 and a scale factor of 10 gives 3 x 10 x 10 = 300. Now do yours."]),
        Q(`A cube-shaped model has a volume of ${V} cubic cm. The real part is ${k2} times bigger in every direction. What is the real volume in cubic cm?`, "🧊", V * k2 * k2 * k2, ["Volume has three directions: length, width and height.", "Multiply the volume by the scale factor three times.", "Example: volume 2 and a factor of 10 gives 2 x 10 x 10 x 10 = 2000. Now do yours."]),
        Q(`Every length of a design is made ${k} times bigger. By what number is the AREA multiplied?`, "📐", k * k, ["Area has two directions.", "Multiply the scale factor by itself.", "Example: a scale factor of 10 would multiply area by 10 x 10. Now do yours."]),
        Q(`Every length of a design is made ${k2} times bigger. By what number is the VOLUME multiplied?`, "📦", k2 * k2 * k2, ["Volume has three directions.", "Multiply the scale factor by itself three times.", "Example: a scale factor of 10 would multiply volume by 10 x 10 x 10. Now do yours."])
      ]);
    }),
    gen("Speed conversions", [
      ["Two units", "🚗", "Speed can be in <b>km/h</b> (kilometers per hour) or <b>m/s</b> (meters per second). 1 m/s is the same as 3.6 km/h."],
      ["Convert", "🔁", "From m/s to km/h, multiply by 3.6. From km/h to m/s, divide by 3.6. So 90 km/h ÷ 3.6 = 25 m/s."],
      ["Per minute", "⏱️", "A minute has 60 seconds. A robot at 2 m/s covers 2 × 60 = 120 m in one minute."]
    ], () => {
      const n = ri(1, 4), kk = ri(1, 8), v = ri(2, 9), t = ri(2, 5);
      return pick([
        Q(`A train moves at ${36 * n} km/h. What is its speed in m/s?`, "🚆", 10 * n, ["Going from km/h to m/s makes the number smaller.", "Divide the km/h number by 3.6.", "Example: 54 km/h / 3.6 = 15 m/s. Now do yours."]),
        Q(`A drone flies at ${5 * kk} m/s. What is its speed in km/h?`, "🛸", 18 * kk, ["Going from m/s to km/h makes the number bigger.", "Multiply the m/s number by 3.6.", "Example: 2 m/s x 3.6 = 7.2 km/h. Now do the one in your question."]),
        Q(`A robot rolls at ${v} m/s. How many meters does it roll in ${t} minutes?`, "🤖", v * t * 60, ["The speed is per second, but the time is in minutes.", "Change the minutes to seconds first (60 seconds in a minute), then multiply by the speed.", "Example: 3 m/s for 2 minutes is 3 x 120 = 360 m. Now do yours."])
      ]);
    }),
    gen("Charge and current", [
      ["Charge", "⚡", "Electric <b>charge</b> is measured in <b>coulombs (C)</b>. <b>Current</b> in amps (A) tells how many coulombs flow past each second."],
      ["The rule", "🧮", "Charge = current × time, or Q = I × t. A current of 2 A for 5 s moves 2 × 5 = 10 coulombs."],
      ["Backward", "↩️", "I = Q ÷ t and t = Q ÷ I. Batteries are rated by how much charge they hold, so these are useful for planning how long a device can run."]
    ], () => {
      const I = ri(2, 9), t = ri(2, 12);
      return pick([
        Q(`A motor draws ${I} A for ${t} seconds. How many coulombs of charge flow through it?`, "⚡", I * t, ["Charge is the current times the time.", "Multiply the amps by the seconds.", "Example: 1 A for 20 s moves 20 C. Now do yours."]),
        Q(`${I * t} coulombs flow through a wire in ${t} seconds. What is the current in amps?`, "🔌", I, ["Current is how much charge flows each second.", "Divide the charge by the time.", "Example: 50 C in 10 s is 5 A. Now do yours."]),
        Q(`A current of ${I} A carries ${I * t} coulombs. For how many seconds did it flow?`, "⏱️", t, ["Undo Q = I x t to find the time.", "Divide the charge by the current.", "Example: 60 C at 4 A takes 15 s. Now do yours."])
      ]);
    }),
    gen("Sound and frequency", [
      ["Vibrations", "🎵", "Sound is a vibration that travels through air. <b>Frequency</b> is how many vibrations happen each second, measured in hertz (Hz). High frequency means high pitch."],
      ["Loud and quiet", "🔊", "<b>Loudness</b> depends on the size of the vibration (amplitude), not the pitch. Sound needs something to travel through, so it cannot cross empty space."],
      ["Speed of sound", "🏃", "In air, sound travels about 340 meters each second. An <b>echo</b> is sound bouncing back from a wall. It travels there and back, so the wall is half of the total distance away."]
    ], () => {
      const f = ri(2, 9) * 50, t = ri(2, 5), e = pick([2, 4, 6]);
      return pick([
        Q(`A speaker cone vibrates at ${f} Hz. How many vibrations happen in ${t} seconds?`, "🔈", f * t, ["Hertz means vibrations per second.", "Multiply the frequency by the number of seconds.", "Example: 100 Hz for 10 s makes 1000 vibrations. Now do yours."]),
        Q(`Sound travels 340 meters each second in air. How far does it travel in ${t} seconds?`, "💨", 340 * t, ["The speed is given for one second.", "Multiply 340 by the number of seconds.", "Example: in 10 seconds, sound goes 3400 m. Now do yours."]),
        Q(`You clap and hear an echo ${e} seconds later. Sound travels 340 m each second. How far away is the wall, in meters?`, "🏔️", 170 * e, ["The sound travelled to the wall AND back.", "Find the whole distance with 340 x seconds, then take half of it.", "Example: an echo after 10 s means 3400 m total, so the wall is 1700 m away. Now do yours."]),
        Q("A flute plays a note with a higher pitch than before. What changed?", "🎶", "The frequency went up", ["Pitch is about how fast something vibrates.", "High pitch means more vibrations each second.", "Example: a thin guitar string vibrates faster than a thick one, giving a higher note. Now do yours."], ["The frequency went up", "The frequency went down", "Sound started to travel in space"]),
        Q("Which of these CANNOT carry sound?", "🌌", "Empty space (a vacuum)", ["Sound needs particles to pass the vibration along.", "Think about where there is nothing at all.", "Example: sound travels through air, water and steel, because they have particles. Now do yours."], ["Empty space (a vacuum)", "Water", "A steel bar"])
      ]);
    }),
    gen("Compound gear trains", [
      ["Two stages", "⚙️", "In a <b>compound gear train</b>, two gears sit on the same shaft. The first pair slows the speed, and the second pair slows it again."],
      ["Multiply", "✖️", "Each pair has a ratio = teeth on the driven gear ÷ teeth on the driving gear. A 10-tooth gear driving a 20-tooth gear gives 2. The overall ratio is the two stage ratios multiplied."],
      ["Output speed", "🔄", "Output rpm = input rpm ÷ overall ratio. A ratio of 2 then 3 gives 6, so 600 rpm in becomes 100 rpm out. Torque goes up by the same factor (ignoring losses)."]
    ], () => {
      const S = [[10, 20, 2], [10, 30, 3], [20, 40, 2], [10, 40, 4], [20, 60, 3]];
      const s1 = pick(S), s2 = pick(S), F = s1[2] * s2[2], m = ri(2, 9) * 5, x = ri(2, 5), y = ri(2, 5);
      return pick([
        Q(`Gear A (${s1[0]} teeth) drives gear B (${s1[1]} teeth). Gear C is on the same shaft as B and has ${s2[0]} teeth. It drives gear D with ${s2[1]} teeth. How many times slower does D turn than A?`, "⚙️", F, ["Work out the ratio of each pair on its own.", "Divide driven teeth by driving teeth for each pair, then multiply the two answers.", "Example: pairs of 10 to 30 and 20 to 40 give 3 and 2, so 6. Now do yours."]),
        Q(`A two-stage gear train has ratios ${s1[2]} and ${s2[2]}. The motor turns at ${F * m} rpm. How fast does the output turn, in rpm?`, "🔩", m, ["Find the overall ratio first.", "Multiply the two ratios, then divide the motor speed by that.", "Example: ratios 2 and 5 give 10. A motor at 300 rpm gives 30 rpm. Now do yours."]),
        Q(`One stage of a gear train slows things by ${x} and the next stage slows by ${y}. What is the overall ratio?`, "🔗", x * y, ["Stages work one after the other.", "Multiply the two ratios.", "Example: ratios 2 and 7 give an overall ratio of 14. Now do yours."])
      ]);
    }),
    gen("Forces on beam supports", [
      ["Two supports", "🌉", "A beam resting on two supports pushes down on both. Each support pushes back up. These upward <b>reaction forces</b> add up to the total load."],
      ["Load in the middle", "⚖️", "A load in the middle is shared equally. A 100 N load gives 50 N to each support. A load closer to one support gives that support a bigger share."],
      ["Quarter way", "📐", "If the load sits a quarter of the way along, the nearer support carries 3/4 of it and the far one carries 1/4."]
    ], () => {
      const W = ri(1, 9) * 20, w = ri(1, 9) * 10, p = ri(2, 9) * 10, q = ri(2, 9) * 10;
      return pick([
        Q(`A ${W} N load sits exactly in the middle of a beam on two supports. How much force does each support carry, in newtons?`, "🌉", W / 2, ["The load is shared between the two supports.", "In the middle, the two shares are equal, so split the load in two.", "Example: a 90 N load in the middle gives 45 N to each side. Now do yours."]),
        Q(`Two crates of ${w} N each sit symmetrically on a beam with two supports. How much does each support carry, in newtons?`, "📦", w, ["Think about the whole load and how many supports share it.", "Add both crates, then split in two since the layout is symmetrical.", "Example: two 25 N crates, 50 N total, 25 N each. Now do yours."]),
        Q(`A ${W} N load sits a quarter of the way along a beam from the left support. How much does the left support carry, in newtons?`, "📐", W * 3 / 4, ["The support nearer the load carries more.", "The near support carries three quarters of the load.", "Example: for a 40 N load the near support carries 30 N. Now do yours."]),
        Q(`The two supports of a beam push up with ${p} N and ${q} N. What is the total load on the beam, in newtons?`, "🔼", p + q, ["The beam is not moving, so the ups and downs balance.", "Add the two upward forces to find the downward load.", "Example: 15 N and 35 N up means a 50 N load. Now do yours."])
      ]);
    }),
    gen("Specific heat", [
      ["Heating things", "🔥", "Different materials need different heat to warm up. The <b>specific heat</b> c is the energy needed to warm 1 gram by 1 °C. Water has a high c, so it heats and cools slowly."],
      ["The formula", "🧮", "Heat energy Q = m × c × ΔT. For 10 g of a metal with c = 2 J per gram per °C, warmed by 5 °C: Q = 10 × 2 × 5 = 100 joules."],
      ["Using it", "🍳", "Metals have a low c, so pans heat fast. Water has a high c, so it is used to carry heat in cooling systems and to store it."]
    ], () => {
      const m = ri(2, 9) * 10, c = ri(1, 4), d = ri(2, 9);
      return pick([
        Q(`A ${m} g block of metal has c = ${c} J per gram per °C. How many joules warm it up by ${d} °C?`, "🔥", m * c * d, ["The energy depends on the mass, the specific heat and the temperature rise.", "Multiply the mass, c and the rise in temperature together.", "Example: 10 g, c = 3, rise of 4 °C gives 10 x 3 x 4 = 120 J. Now do yours."]),
        Q(`It takes ${m * c * d} joules to warm ${m} g of a material by some degrees. Its c is ${c} J per gram per °C. How many °C did it rise?`, "🌡️", d, ["Undo Q = m x c x temperature rise.", "Divide the energy by the mass times c.", "Example: 240 J, 20 g, c = 3 gives 240 / 60 = 4 °C. Now do yours."]),
        Q(`A material with c = ${c} J per gram per °C needs ${m * c * d} joules to warm by ${d} °C. What is its mass in grams?`, "⚖️", m, ["Undo Q = m x c x temperature rise to find the mass.", "Divide the energy by c times the rise.", "Example: 240 J, c = 3, rise 4 gives 240 / 12 = 20 g. Now do yours."])
      ]);
    }),
    les("Plastics and composites", [
      ["Polymers", "🧪", "Plastics are <b>polymers</b>: very long chain molecules. <b>Thermoplastics</b> (like the PET in drink bottles) soften when heated and can be melted and reshaped again."],
      ["Thermosets", "🔥", "<b>Thermosets</b> (like epoxy glue) harden for good when they cure. Heating them again does not make them soft, so they are harder to recycle."],
      ["Composites", "🧵", "A <b>composite</b> mixes two materials to get the best of both. Fiberglass is glass fibers in plastic. Carbon fiber is very strong for its weight and is used in bikes and aircraft."]
    ], ["Think about what happens to the material when you reheat it.", "Soft again when reheated is one family; stays hard is another.", "Example: concrete is a composite of stone and cement. Now try yours."], [
      ["A plastic that softens when heated and can be reshaped is a...", "Thermoplastic", "Thermoset", "Ceramic"],
      ["A plastic that hardens permanently when cured is a...", "Thermoset", "Thermoplastic", "Liquid metal"],
      ["Which is a composite?", "Fiberglass", "Pure copper", "Water"],
      ["A composite is made by...", "Combining two or more materials", "Melting one metal", "Freezing water"],
      ["Carbon fiber is popular in aircraft because it is...", "Strong and light", "Heavy and weak", "Soft and sticky"],
      ["Plastics are made of long chain molecules called...", "Polymers", "Crystals", "Alloys"],
      ["Which can be melted down and made into a new shape?", "A thermoplastic", "A fully cured thermoset", "A diamond"],
      ["Why are thermosets harder to recycle?", "They cannot be softened again by heat", "They are too soft", "They float away"],
      ["Plywood is layers of thin wood glued together. It is a...", "Composite", "Pure metal", "Gas"]
    ]),
    les("Making parts: add or remove", [
      ["Additive", "🖨️", "<b>Additive manufacturing</b> builds a part by adding material, usually layer by layer. A 3D printer is the best known example. It is great for one-off prototypes and shapes with hollow insides."],
      ["Subtractive", "🪚", "<b>Subtractive manufacturing</b> starts with a block and cuts material away: drilling, milling and turning on a lathe. It makes precise, smooth parts but wastes cut-away material."],
      ["Molding and CAD", "🏭", "<b>Injection molding</b> squirts melted plastic into a mold, which is cheap per part when making thousands. Parts are designed first on a computer using <b>CAD</b> (computer-aided design)."]
    ], ["Ask: is material being added, or taken away?", "Think about how many parts are needed too.", "Example: carving a statue from stone takes material away. Now try yours."], [
      ["A 3D printer builds a part by...", "Adding material layer by layer", "Cutting away from a block", "Melting a whole mold"],
      ["Drilling and milling are examples of...", "Subtractive manufacturing", "Additive manufacturing", "Composting"],
      ["Which gives more leftover waste material?", "Cutting a part out of a block", "Printing layer by layer", "Neither makes any waste"],
      ["Which is best for making a single custom prototype quickly?", "3D printing", "A giant mold", "Casting steel"],
      ["Injection molding is cheapest per part when...", "Making thousands of the same part", "Making one part", "Making none"],
      ["CAD stands for...", "Computer-aided design", "Cutting and drilling", "Color and detail"],
      ["Why design on a computer before making a part?", "Mistakes are cheap to fix on screen", "It makes the part heavier", "It removes the need for testing"],
      ["A lathe spins a piece while a tool cuts it. This is...", "Subtractive", "Additive", "Neither"]
    ]),
    gen("Text as numbers", [
      ["Codes for letters", "🔤", "Computers store letters as numbers. In the <b>ASCII</b> code, capital A is 65, B is 66, C is 67 and so on up to Z at 90. Small a is 97, b is 98, and so on."],
      ["Counting on", "➕", "To find a capital letter's code, start at 65 and add its place in the alphabet minus one. D is the 4th letter, so its code is 65 + 3 = 68."],
      ["Bytes", "💾", "One ASCII character uses one <b>byte</b> (8 bits). A message with 20 characters, including spaces, takes 20 bytes."]
    ], () => {
      const P = "FGHJKMNPQRSTUVWXYZ", L1 = pick(P.split("")), i = LET.indexOf(L1), n = ri(6, 40), L2 = pick(P.split("")), j = LET.indexOf(L2);
      return pick([
        Q(`In ASCII, A is 65. What is the code for the capital letter ${L1}?`, "🔤", 65 + i, ["Count how far the letter is after A.", `Start at 65 and add one for each step from A up to your letter.`, "Example: C is 2 steps after A, so its code is 67. Now do yours."]),
        Q(`In ASCII, small a is 97. What is the code for the small letter ${L2.toLowerCase()}?`, "🔡", 97 + j, ["Count how far the letter is after a.", "Start at 97 and add one for each step from a up to your letter.", "Example: c is 2 steps after a, so its code is 99. Now do yours."]),
        Q(`In ASCII, capital A is 65. Which capital letter has the code ${65 + i}?`, "🔢", L1, ["Subtract 65 to see how many steps after A it is.", "Count that many letters on from A.", "Example: code 67 is 2 steps after A, so it is C. Now do yours."], shuf([L1, LET[(i + 1) % 26], LET[(i + 25) % 26]])),
        Q(`A text message has ${n} ASCII characters. How many bytes does it use?`, "💬", n, ["Each character gets its own storage.", "One ASCII character is one byte.", "Example: a 12-character word takes 12 bytes. Now do yours."])
      ]);
    }),
    les("Test cases and edge cases", [
      ["Test cases", "🧪", "A <b>test case</b> is an input and the output you expect. If the program gives something different, you have found a bug. Write the expected answer before you run the code."],
      ["Edge cases", "🧗", "Bugs hide at the edges: zero, the smallest and largest allowed values, empty lists, and the exact boundary. For \"age at least 13\" test 12, 13 and 14."],
      ["Retest", "🔁", "After you fix a bug, run all your old tests again. This is called <b>regression testing</b>, and it catches new bugs that a fix may cause."]
    ], ["Think about unusual or extreme inputs.", "Bugs love the boundaries between two cases.", "Example: for a program that divides by a number, zero is a risky input. Now try yours."], [
      ["A program says \"allowed if age is at least 13\". Which pair of ages best tests the boundary?", "12 and 13", "5 and 50", "30 and 31"],
      ["A function finds the average of a list. Which input is an edge case?", "An empty list", "A list of 3 normal numbers", "A list of 5 numbers"],
      ["A test case is...", "An input with the output you expect", "A tool box", "A random guess"],
      ["After fixing a bug, you re-run the old tests. This is...", "Regression testing", "Painting", "Brainstorming"],
      ["A speed program accepts 1 to 10. Which input is NOT on the edge?", "5", "1", "10"],
      ["Testing only easy, normal inputs is risky because...", "Bugs often hide at the edges", "It uses too much battery", "Normal inputs are illegal"],
      ["A program divides 100 by a number typed in. Which input is the riskiest?", "0", "5", "20"],
      ["Why write the expected answer BEFORE running the test?", "So you do not just accept whatever it prints", "It saves paper", "It makes the code shorter"]
    ]),
    gen("Sampling and quality control", [
      ["Checking a few", "🔎", "Checking every item can be too slow or can break it (like testing how hard a bulb can be hit). So engineers check a small <b>sample</b> and use it to guess about the whole <b>batch</b>."],
      ["Percent defective", "🧮", "If 2 of 50 in the sample are defective, that is 2 out of 50 = 4%. Then about 4% of the whole batch is probably defective too."],
      ["Fair samples", "🎲", "A sample must be picked at random from the whole batch. Picking only from the top of a box can give a wrong answer."]
    ], () => {
      const n = pick([10, 20, 25, 50, 100]), d = ri(1, 4), mult = ri(5, 20), N = pick([2, 3, 4, 5, 6, 8]) * 100, p = pick([2, 3, 4, 5, 10]);
      return pick([
        Q(`In a sample of ${n} parts, ${d} are defective. What percent of the sample is defective?`, "🔎", d * 100 / n, ["Percent means out of 100.", "Divide the defective number by the sample size, then multiply by 100.", "Example: 3 bad out of 20 is 3/20 = 0.15, so 15%. Now do yours."]),
        Q(`A sample of ${n} chips has ${d} defective. A batch has ${n * mult} chips. About how many in the whole batch are defective?`, "💾", d * mult, ["Use the sample to guess for the batch.", "Find how many times bigger the batch is than the sample, then multiply the defective count by that.", "Example: 2 bad in 10, with a batch 30 times bigger, is about 60. Now do yours."]),
        Q(`${p}% of a batch of ${N} bulbs are defective. How many bulbs is that?`, "💡", N * p / 100, ["Percent means out of 100.", "Multiply the batch size by the percent, then divide by 100.", "Example: 4% of 500 is 500 x 4 / 100 = 20. Now do yours."])
      ]);
    }),
    null, null
  ];
  a[18] = mix("Mixed practice", at(a, [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 15]));
  a[19] = mix("Level 16 Challenge", at(a, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));

  // ================= LEVEL 17 =================
  const b = [
    gen("Sine, cosine and tangent", [
      ["Right triangles", "📐", "In a right triangle, the longest side is the <b>hypotenuse</b>. For one of the other angles, one side is <b>opposite</b> it and the other is <b>adjacent</b> (next to it)."],
      ["Three ratios", "🧮", "<b>sin</b> = opposite ÷ hypotenuse. <b>cos</b> = adjacent ÷ hypotenuse. <b>tan</b> = opposite ÷ adjacent. Remember it as SOH-CAH-TOA."],
      ["Handy facts", "🪜", "sin 30° = 1/2 (one half), and tan 45° = 1. So a 10 m ramp at 30° rises 10 × 1/2 = 5 m, and a ladder at 45° reaches as high as its base is far from the wall."]
    ], () => {
      const T = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]]), a = T[0], bb = T[1], c = T[2], L = ri(1, 6) * 10, d = ri(2, 9);
      const fr = [`${a}/${c}`, `${bb}/${c}`, `${a}/${bb}`];
      return pick([
        Q(`A right triangle has sides ${a}, ${bb} and ${c} (the hypotenuse). For the angle opposite the side of length ${a}, what is sin?`, "📐", fr[0], ["Sine compares the side across from the angle with the longest side.", "sin = opposite ÷ hypotenuse. The side across from your angle is the one you were told about.", "Example: sides 6, 8, 10, angle opposite 6: sin = 6/10. Now do yours."], fr),
        Q(`A right triangle has sides ${a}, ${bb} and ${c} (the hypotenuse). For the angle opposite the side of length ${a}, what is cos?`, "📐", fr[1], ["Cosine uses the side NEXT TO the angle, not the one across.", "cos = adjacent ÷ hypotenuse. The adjacent side is the short side that is not opposite.", "Example: sides 6, 8, 10, angle opposite 6: cos = 8/10. Now do yours."], fr),
        Q(`A right triangle has sides ${a}, ${bb} and ${c} (the hypotenuse). For the angle opposite the side of length ${a}, what is tan?`, "📐", fr[2], ["Tangent does not use the hypotenuse at all.", "tan = opposite ÷ adjacent, using the two shorter sides.", "Example: sides 6, 8, 10, angle opposite 6: tan = 6/8. Now do yours."], fr),
        Q(`A ramp is ${L} m long and rises at 30° (sin 30° = 1/2). How many meters high does it rise?`, "🛝", L / 2, ["The rise is the side opposite the angle, and the ramp is the hypotenuse.", "Rise = length × sin of the angle, and sin 30° is one half.", "Example: a 14 m ramp at 30° rises 7 m. Now do yours."]),
        Q(`A ladder leans at 45° (tan 45° = 1). Its base is ${d} m from the wall. How high up the wall does it reach, in meters?`, "🪜", d, ["Tangent compares the height with the distance from the wall.", "height = base distance × tan 45°, and tan 45° equals one.", "Example: with the base 13 m away, the ladder at 45° reaches 13 m. Now do yours with its own number."])
      ]);
    }),
    gen("Combining forces", [
      ["Same line", "➡️", "Forces on a line add up or cancel. Two people pushing the same way add: 30 N + 20 N = 50 N. Pushing opposite ways, you subtract and the bigger one wins: 30 N - 20 N = 10 N."],
      ["At right angles", "↗️", "When two forces are at 90° to each other, the single <b>resultant</b> force is the diagonal of the box they make. Use Pythagoras: resultant² = a² + b²."],
      ["Nice triples", "🔺", "3 and 4 give a resultant of 5. Doubling gives 6 and 8, resultant 10. Look out for 5-12-13 and 8-15-17 too."]
    ], () => {
      const T = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17]]), k = T[0] === 3 ? ri(1, 4) : 1, x = ri(6, 40), y = ri(1, x - 1) ;
      return pick([
        Q(`Two tugs push a barge the same way with ${x} N and ${y} N. What is the total force, in newtons?`, "🚤", x + y, ["Forces in the same direction work together.", "Add them.", "Example: pushes of 12 N and 5 N the same way make 17 N. Now do yours."]),
        Q(`Two tugs pull a barge in opposite directions with ${x} N and ${y} N. What is the size of the net force, in newtons?`, "⚓", x - y, ["Forces in opposite directions work against each other.", "Subtract the smaller from the bigger.", "Example: 12 N one way and 5 N the other leaves 7 N. Now do yours."]),
        Q(`A drone is pushed ${T[0] * k} N north and ${T[1] * k} N east. How big is the single resultant force, in newtons?`, "🚁", T[2] * k, ["The two forces are at a right angle.", "Square both, add the squares, then take the square root. Look for a famous triple.", "Example: 6 N and 8 N at a right angle give a resultant of 10 N. Now do yours."])
      ]);
    }),
    gen("Cables sharing a load", [
      ["Equal share", "🪢", "When a load hangs from several vertical cables of the same kind, each cable carries an equal share. A 600 N sign on 2 cables puts 300 N on each."],
      ["Breaking", "💥", "If one cable fails, the others must carry more. With 3 cables, a 600 N sign gives 200 N each. If one breaks, the other two carry 300 N each."],
      ["Angles", "📐", "Cables that go out at an angle must pull harder than straight up cables, because part of their pull is sideways. The flatter the angle, the larger the tension."]
    ], () => {
      const n = ri(2, 5), k = ri(2, 6) * 10, q = ri(3, 5), z = ri(2, 6) * 10;
      return pick([
        Q(`A sign weighing ${n * k} N hangs from ${n} equal vertical cables. How much tension is in each cable, in newtons?`, "🪧", k, ["The load is shared equally.", "Divide the weight by the number of cables.", "Example: a 600 N sign on 2 cables, 300 N each. Now do yours."]),
        Q(`A platform weighing ${q * (q - 1) * z / 10} N hangs from ${q} equal vertical cables. One cable breaks and the rest share the load equally. How much tension is in each remaining cable, in newtons?`, "🏗️", q * z / 10, ["Count how many cables are still working.", "Divide the weight by the number of cables left (one fewer than before).", "Example: a 600 N sign on 3 cables loses one, so each of the 2 left carries 300 N. Now do yours."]),
        Q("Two cables hold a sign. If they are moved from straight up to a wide angle, the tension in each cable gets...", "📐", "Larger", ["Part of the pull now goes sideways.", "The more sideways the cables, the harder they must pull to hold the same weight.", "Example: pulling a washing line flat is nearly impossible, because the tension becomes huge. Now do yours."], ["Larger", "Smaller", "Exactly the same"]),
        Q("A cable can safely hold 500 N. Two such cables hang straight up. About how much weight can they safely hold together?", "🧗", "1000 N", ["Each cable takes half of the weight.", "Two cables can hold twice what one can.", "Example: three cables of 200 N each hold 600 N. Now do yours."], ["1000 N", "500 N", "250 N"])
      ]);
    }),
    gen("Friction force: F = μN", [
      ["The coefficient", "🧱", "<b>Friction</b> depends on how hard the surfaces press together (the <b>normal force</b> N) and how rough they are. The roughness is a number called the <b>friction coefficient μ</b> (mu)."],
      ["The formula", "🧮", "F = μ × N. On a flat floor the normal force is the weight. A 3 kg box weighs 30 N (taking g = 10), so with μ = 0.4 the friction is 0.4 × 30 = 12 N."],
      ["Moving it", "📦", "To slide the box you must push harder than the friction. The net force is your push minus friction."]
    ], () => {
      const mu = pick([0.1, 0.2, 0.3, 0.4, 0.5]), m10 = Math.round(mu * 10), m = ri(2, 9), N = ri(2, 20) * 10, F = Math.round(mu * N), P = Math.round(mu * N) + ri(1, 20);
      return pick([
        Q(`A ${m} kg crate sits on a flat floor with μ = ${mu}. Take g = 10, so N = 10 × ${m}. What is the friction force in newtons?`, "📦", m10 * m, ["First find the normal force, which is the weight.", "Multiply μ by the normal force.", "Example: a 5 kg crate with μ = 0.2 has N = 50 and friction 0.2 x 50 = 10 N. Now do yours."]),
        Q(`A sled has friction of ${F} N with μ = ${mu}. What is the normal force N in newtons?`, "🛷", N, ["Undo F = μ x N.", "Divide the friction force by μ.", "Example: friction 12 N with μ = 0.4 gives N = 30. Now do yours."]),
        Q(`You push a box with ${P} N. Friction pushes back with ${F} N. What is the net force in newtons?`, "👉", P - F, ["The two forces act against each other.", "Subtract the friction from your push.", "Example: a push of 25 N against friction of 18 N leaves 7 N. Now do yours."])
      ]);
    }),
    gen("Roller coaster energy", [
      ["Height gives energy", "🎢", "Lifting a mass up stores <b>potential energy</b>: PE = m × g × h. Take g = 10. A 50 kg cart lifted 10 m stores 50 × 10 × 10 = 5000 joules."],
      ["Trade", "🔄", "When the cart rolls down, potential energy turns into <b>kinetic energy</b> (movement). Ignoring friction, the energy total stays the same."],
      ["Speed at the bottom", "💨", "Speed at the bottom: v = √(2 × g × h) = √(20 × h). Dropping 5 m gives √100 = 10 m/s. The mass does not matter for the speed!"]
    ], () => {
      const h = pick([5, 20, 45, 80, 125]), v = Math.round(Math.sqrt(20 * h)), v2 = pick([10, 20, 30, 40]), m = ri(2, 9) * 10, hh = ri(2, 9) * 5;
      return pick([
        Q(`A cart drops ${h} m from rest and friction is ignored. Using v = √(20 × h), what is its speed at the bottom in m/s?`, "🎢", v, ["Put the height into the formula first.", `Multiply the drop by 20, then find the number which multiplied by itself gives that.`, "Example: a drop of 20 m gives 20 x 20 = 400 and its square root is 20 m/s. Now do yours."]),
        Q(`A cart reaches ${v2} m/s at the bottom of a drop (v = √(20 × h)). How tall was the drop in meters?`, "📏", v2 * v2 / 20, ["Undo the square root by squaring the speed.", "Square the speed, then divide by 20.", "Example: a speed of 50 m/s gives 2500 / 20 = 125 m. Now do yours."]),
        Q(`A ${m} kg cart is lifted ${hh} m. Using PE = m × 10 × h, how many joules of potential energy does it gain?`, "⚡", m * 10 * hh, ["Multiply three things: mass, 10 and height.", "Mass x 10 x height.", "Example: 20 kg lifted 3 m is 20 x 10 x 3 = 600 J. Now do yours."])
      ]);
    }),
    gen("Capacitors and time constants", [
      ["A tiny tank", "🔋", "A <b>capacitor</b> stores a little electric charge and can release it very fast. Camera flashes use one. It holds much less energy than a battery but delivers it quickly."],
      ["Smoothing", "〰️", "Capacitors also smooth out bumps in power. When they charge through a resistor, it takes time. The <b>time constant</b> is τ = R × C."],
      ["Units trick", "🧮", "If R is in kilo-ohms and C is in millifarads, τ comes out in seconds. A 2 kΩ resistor with a 3 mF capacitor gives τ = 6 seconds. Bigger R or bigger C means slower charging."]
    ], () => {
      const R = ri(2, 9), C = ri(2, 9);
      return pick([
        Q(`A circuit has R = ${R} kΩ and C = ${C} mF. What is the time constant τ = R × C in seconds?`, "⏱️", R * C, ["Multiply the two numbers.", "With kilo-ohms and millifarads, the product is already in seconds.", "Example: 4 kΩ and 5 mF give 20 seconds. Now do yours."]),
        Q(`A circuit has τ = ${R * C} seconds and R = ${R} kΩ. What is C in millifarads?`, "🔍", C, ["Undo τ = R x C.", "Divide the time constant by R.", "Example: 36 s with R = 4 gives C = 9 mF. Now do yours."]),
        Q("Why do camera flashes use a capacitor?", "📸", "It can release stored charge very quickly", ["Think about what a flash needs.", "A flash needs lots of energy in a very short moment.", "Example: a capacitor is like a small bucket you can tip out fast. Now do yours."], ["It can release stored charge very quickly", "It stores more energy than any battery", "It makes the battery last forever"]),
        Q("If you increase the resistance in an RC circuit, the capacitor charges...", "🐢", "More slowly", ["The time constant is R x C.", "A bigger R makes a bigger time constant.", "Example: a narrow pipe fills a bucket more slowly. Now do yours."], ["More slowly", "More quickly", "At the same speed"])
      ]);
    }),
    gen("Voltage dividers", [
      ["Splitting voltage", "🔌", "Two resistors in series share the voltage. A <b>voltage divider</b> uses this to make a smaller voltage from a bigger one."],
      ["The formula", "🧮", "V_out = V_in × R2 ÷ (R1 + R2), measured across R2. With 9 V, R1 = 1 kΩ and R2 = 2 kΩ: V_out = 9 × 2 ÷ 3 = 6 V."],
      ["Use in sensors", "☀️", "If one resistor changes with light or heat, the output voltage changes too. The robot reads that voltage to sense its surroundings."]
    ], () => {
      const P = pick([[1, 1], [1, 2], [2, 1], [1, 3], [3, 1], [2, 3], [3, 2], [1, 4], [4, 1]]), R1 = P[0], R2 = P[1], S = R1 + R2, k = ri(1, 3), Vin = S * k, Vout = R2 * k, e = ri(2, 6) * 2;
      return pick([
        Q(`A divider has R1 = ${R1} kΩ and R2 = ${R2} kΩ across ${Vin} V. What is the voltage across R2 in volts?`, "🔌", Vout, ["R2 gets a share of the total.", "Its share is R2 divided by the total resistance (R1 + R2). Multiply by the supply voltage.", "Example: R1 = 1, R2 = 5 across 12 V gives 12 x 5 / 6 = 10 V. Now do yours."]),
        Q(`Two EQUAL resistors in series are connected across ${e} V. What is the voltage across one of them in volts?`, "⚖️", e / 2, ["Equal resistors take equal shares.", "Split the supply voltage into two equal parts.", "Example: across 18 V each of two equal resistors gets 9 V. Now do yours."]),
        Q(`R1 = ${R1} kΩ and R2 = ${R2} kΩ. The voltage across R2 is ${Vout} V. What is the supply voltage in volts?`, "🔋", Vin, ["The voltage across R2 is only a share of the supply.", "R2's share is R2 / (R1 + R2), so divide R2's voltage by that fraction.", "Example: with R1 = 1, R2 = 5 and 10 V across R2, the supply is 10 / (5/6) = 12 V. Now do yours."])
      ]);
    }),
    gen("Transformers", [
      ["AC and turns", "🔌", "Mains electricity is <b>AC</b> (alternating current): it keeps changing direction. A <b>transformer</b> uses two coils of wire to change AC voltage. A battery's steady DC will not work."],
      ["Turns ratio", "🧮", "V_secondary ÷ V_primary = turns on the secondary ÷ turns on the primary. With 100 turns on the primary and 10 on the secondary, 120 V becomes 12 V."],
      ["Step up and down", "⬆️", "More secondary turns than primary means <b>step-up</b> (higher voltage). Fewer means <b>step-down</b>. Phone chargers step the voltage down. Power grids step it up for long-distance lines."]
    ], () => {
      const Ns = pick([10, 20, 50, 200, 300]), Vp = pick([100, 120, 240]), Vs = Vp * Ns / 100;
      return pick([
        Q(`A transformer has 100 turns on the primary and ${Ns} turns on the secondary. The primary gets ${Vp} V AC. What is the secondary voltage in volts?`, "🔌", Vs, ["Compare the number of turns on the two coils.", "Multiply the input voltage by secondary turns, then divide by primary turns.", "Example: 100 turns to 400 turns on 5 V input gives 20 V. Now do yours."]),
        Q(`A transformer has 100 turns on the primary. ${Vp} V goes in and ${Vs} V comes out. How many turns does the secondary have?`, "🔄", Ns, ["The voltage ratio equals the turns ratio.", "Divide the output voltage by the input voltage, then multiply by the primary turns.", "Example: 10 V in and 40 V out with 100 primary turns needs 400 secondary turns. Now do yours."]),
        Q(`A transformer has 100 primary turns and ${Ns} secondary turns. Is it a step-up or a step-down?`, "↕️", Ns > 100 ? "Step-up" : "Step-down", ["Compare the two numbers of turns.", "More turns on the secondary raises the voltage; fewer lowers it.", "Example: 100 turns to 30 turns lowers the voltage, which is the opposite kind to 100 turns to 500. Now do yours."], ["Step-up", "Step-down", "It only works with DC"])
      ]);
    }),
    gen("Sampling rate and bit depth", [
      ["Digital sound", "🎧", "To store sound digitally, a computer measures the wave many times a second. Each measurement is a <b>sample</b>. The <b>sampling rate</b> is the number of samples per second."],
      ["Bit depth", "🔢", "The <b>bit depth</b> is how many bits each sample uses. With b bits you can show 2 × 2 × ... (b times) different levels. 3 bits gives 8 levels."],
      ["File size", "💾", "Size = samples per second × bytes per sample × seconds. 8 bits is 1 byte and 16 bits is 2 bytes. More samples and more bits give better quality but bigger files."]
    ], () => {
      const bits = ri(2, 8), r = pick([1000, 2000, 5000, 8000]), t = ri(2, 9), bb = pick([8, 16]);
      return pick([
        Q(`A sample uses ${bits} bits. How many different levels can it show?`, "🔢", Math.pow(2, bits), ["Each extra bit doubles the number of levels.", "Multiply 2 by itself once for every bit.", "Example: 4 bits gives 2 x 2 x 2 x 2 = 16 levels. Now do yours."]),
        Q(`A recorder takes ${r} samples every second for ${t} seconds. How many samples is that?`, "🎙️", r * t, ["The rate is per second.", "Multiply the samples per second by the number of seconds.", "Example: 3000 samples a second for 10 seconds is 30,000. Now do yours."]),
        Q(`A recorder takes ${r} samples per second, each ${bb} bits, for ${t} seconds. How many bytes does the recording need? (8 bits = 1 byte)`, "💾", r * (bb / 8) * t, ["First change bits to bytes.", "Multiply samples per second by bytes per sample by seconds.", "Example: 4000 samples a second, 1 byte each, for 5 seconds is 20,000 bytes. Now do yours."])
      ]);
    }),
    gen("Hexadecimal", [
      ["Base 16", "🔠", "<b>Hexadecimal</b> counts in sixteens. It uses digits 0 to 9, then letters A = 10, B = 11, C = 12, D = 13, E = 14, F = 15."],
      ["Two digits", "🔢", "A two-digit hex number is (first digit × 16) + second digit. Hex 2B is 2 × 16 + 11 = 43."],
      ["Colors", "🎨", "Web colors use hex pairs for red, green and blue: #RRGGBB. FF is the maximum (255). So #FF0000 is bright red, #00FF00 is green and #0000FF is blue."]
    ], () => {
      const HX = "0123456789ABCDEF", v1 = ri(1, 15), v2 = ri(0, 15), v = ri(10, 15), c = pick([["#FF0000", "Red"], ["#00FF00", "Green"], ["#0000FF", "Blue"]]);
      return pick([
        Q(`In hexadecimal, what number does the digit ${HX[v]} stand for?`, "🔠", v, ["A to F come after 9.", "A is 10, so count up in the alphabet from A.", "Example: decimal 9 is the digit 9, and the next value, 10, needs a letter. Count on from there."]),
        Q(`What is the hex number ${HX[v1]}${HX[v2]} in ordinary (decimal) numbers?`, "🔢", v1 * 16 + v2, ["The first digit is worth sixteen times as much.", "Multiply the first digit's value by 16, then add the second digit's value (A = 10 up to F = 15).", "Example: hex 1C is 1 x 16 + 12 = 28. Now do yours."]),
        Q(`Which letter in hex stands for ${v}?`, "🔤", HX[v], ["Hex needs single symbols for 10 to 15.", "Start from A = 10 and count up.", "Example: 12 is the letter C. Now do the one in your question."], shuf([HX[v], HX[v === 15 ? 10 : v + 1], HX[v === 10 ? 15 : v - 1]])),
        Q(`In the web color code ${c[0]}, which color is at full strength?`, "🎨", c[1], ["The code is #RRGGBB: red, green, blue pairs.", "Find which pair is FF while the others are 00.", "Example: #FFFF00 has full red and full green. Now do yours."], ["Red", "Green", "Blue"])
      ]);
    }),
    gen("Bandwidth and download time", [
      ["Bits and bytes", "📶", "Network speed is measured in <b>bits</b> per second (Mbps = millions of bits per second). File sizes use <b>bytes</b> (MB). 1 byte = 8 bits."],
      ["Convert", "🔁", "To turn Mbps into MB per second, divide by 8. A connection of 80 Mbps moves 10 MB every second."],
      ["Time", "⏳", "Download time = file size ÷ speed (in the same units). A 30 MB file at 10 MB per second takes 3 seconds."]
    ], () => {
      const sp = pick([8, 16, 40, 80]), t = ri(2, 9), size = sp * t / 8, S = pick([8, 16, 24, 40, 48, 80]);
      return pick([
        Q(`A connection runs at ${S} Mbps. How many megabytes can it move each second? (8 bits = 1 byte)`, "📶", S / 8, ["Mbps counts bits and MB counts bytes.", "Divide the Mbps by 8.", "Example: 64 Mbps is 8 MB each second. Now do yours."]),
        Q(`A file is ${size} MB and your speed is ${sp} Mbps. How many seconds does it take to download? (8 bits = 1 byte)`, "⏳", t, ["First change the file size from bytes to bits, or the speed from bits to bytes.", "Speed in MB per second = Mbps / 8. Then divide the file size by that.", "Example: 20 MB at 16 Mbps (2 MB per second) takes 10 seconds. Now do yours."]),
        Q(`A link at ${sp} Mbps runs for ${t} seconds. How many megabytes does it download? (8 bits = 1 byte)`, "💾", size, ["Find the MB per second first.", "Divide the Mbps by 8, then multiply by the seconds.", "Example: 24 Mbps for 5 seconds is 3 x 5 = 15 MB. Now do yours."])
      ]);
    }),
    gen("Counting comparisons", [
      ["Counting steps", "🔢", "Engineers count how many steps an algorithm needs, because more steps means a slower program. A list of N items checked one by one needs up to N steps."],
      ["All pairs", "🤝", "If every one of n robots must compare with every other robot, there are n × (n - 1) ÷ 2 pairs. With 5 robots that is 5 × 4 ÷ 2 = 10."],
      ["Loops in loops", "🔁", "An outer loop that runs a times with an inner loop that runs b times does the inner work a × b times. Doubling the list size can double or quadruple the work."]
    ], () => {
      const n = ri(3, 10), a2 = ri(3, 9), b2 = ri(3, 9), N = ri(2, 9) * 10;
      return pick([
        Q(`${n} robots each compare with every other robot exactly once. How many comparisons are there in all?`, "🤝", n * (n - 1) / 2, ["Each robot meets all the others, but each pair is counted once.", "Multiply n by one less than n, then halve it.", "Example: 6 robots give 6 x 5 / 2 = 15. Now do yours."]),
        Q(`An outer loop runs ${a2} times and an inner loop runs ${b2} times each time. How many times does the inner loop body run in total?`, "🔁", a2 * b2, ["The inner loop starts again every time the outer loop goes round.", "Multiply the two loop counts.", "Example: 4 and 7 give 28. Now do yours."]),
        Q(`Checking one item at a time through an unsorted list of ${N} items, what is the largest number of items you might have to check?`, "📋", N, ["The worst case is when the thing you want is last.", "In the worst case you look at every item.", "Example: a list of 15 items might take 15 checks. Now do yours."]),
        Q(`A one-by-one search takes up to ${N} checks. How many checks might it take if the list is twice as long?`, "↗️", N * 2, ["The work grows along with the list.", "Double the number of checks.", "Example: 35 checks becomes 70 when the list doubles. Now do yours."])
      ]);
    }),
    les("Scatter plots and trends", [
      ["Dots on a graph", "📈", "A <b>scatter plot</b> puts one dot for each test. One measurement goes on the x axis and another on the y axis. The pattern of the dots shows if the two are related."],
      ["Trend lines", "📉", "A <b>line of best fit</b> runs through the middle of the dots. If it goes up to the right it is a <b>positive</b> trend. If it goes down, it is <b>negative</b>. Scattered dots mean little or no relationship."],
      ["Careful", "⚠️", "A dot far from the pattern is an <b>outlier</b>. Predicting inside your data is safer than far outside it. And two things moving together does not always mean one causes the other."]
    ], ["Look at the direction the dots go.", "Up to the right is one kind of trend, down to the right is the other.", "Example: heavier cars use more fuel, which is a positive trend. Now try yours."], [
      ["Dots rise from left to right. This shows a...", "Positive trend", "Negative trend", "No relationship"],
      ["Dots fall from left to right. This shows a...", "Negative trend", "Positive trend", "Perfect circle"],
      ["Dots are spread everywhere with no pattern. This shows...", "Little or no relationship", "A strong positive trend", "A strong negative trend"],
      ["A line of best fit goes...", "Through the middle of the dots", "Only through the top dot", "Away from all dots"],
      ["One dot is far from all the others. It is an...", "Outlier", "Average", "Axis"],
      ["Predicting a value inside the range of your data is usually...", "Safer than predicting far outside it", "Less safe than far outside", "Impossible"],
      ["Ice-cream sales and sunburns both rise in summer. This shows...", "Two things can rise together without one causing the other", "Ice cream causes sunburn", "Sunburn causes ice cream sales"],
      ["Longer bridge beams bend more. On a scatter plot of length against bend the trend is...", "Positive", "Negative", "None"]
    ]),
    gen("Linear functions and calibration", [
      ["Straight-line rule", "📏", "Many sensors follow a straight-line rule: reading = m × x + b. The number m is the <b>slope</b> (how much the reading changes for each step in x) and b is the reading when x is zero."],
      ["Using it", "🧮", "If reading = 3x + 4, then at x = 5 the reading is 3 × 5 + 4 = 19. To go backward, subtract 4, then divide by 3."],
      ["Slope from two points", "↗️", "Slope = change in reading ÷ change in x. Readings of 10 at x = 2 and 22 at x = 6 give (22 - 10) ÷ (6 - 2) = 3."]
    ], () => {
      const m = ri(2, 6), bb = ri(1, 9), x = ri(3, 12), x1 = ri(1, 4), x2 = x1 + ri(2, 5);
      return pick([
        Q(`A sensor reading follows r = ${m}d + ${bb}, where d is distance in cm. What is r when d = ${x}?`, "📡", m * x + bb, ["Put the distance in for d.", "Multiply by the number in front of d, then add the other number.", "Example: r = 4d + 2 at d = 6 gives 4 x 6 + 2 = 26. Now do yours."]),
        Q(`A sensor follows r = ${m}d + ${bb}. The reading is ${m * x + bb}. What is the distance d in cm?`, "🔍", x, ["Undo the steps in reverse.", "Subtract the plain number first, then divide by the number in front of d.", "Example: r = 4d + 2 with r = 26: subtract 2, divide by 4 to get 6. Now do yours."]),
        Q(`A sensor reads ${m * x1 + bb} at ${x1} cm and ${m * x2 + bb} at ${x2} cm. What is the slope (change in reading per cm)?`, "↗️", m, ["Slope is how much the reading changes for each 1 cm.", "Divide the change in reading by the change in distance.", "Example: readings 7 at 1 cm and 19 at 4 cm give (19 - 7) / (4 - 1) = 4. Now do yours."])
      ]);
    }),
    gen("Doubling and growth", [
      ["Doubling", "🌱", "Some things grow by <b>doubling</b>: 1, 2, 4, 8, 16... This is <b>exponential growth</b>. After n doublings you multiply by 2 n times. Starting from 3 and doubling 4 times gives 3 × 16 = 48."],
      ["Tripling and halving", "↘️", "Tripling multiplies by 3 each step. Halving divides by 2 each step and is used for <b>decay</b>. A 400 g sample halved 3 times leaves 400 ÷ 8 = 50 g."],
      ["Surprising", "🚀", "Exponential growth starts slowly but becomes huge quickly. That is why bacteria, data storage and computer power can grow so fast, and why engineers plan ahead for it."]
    ], () => {
      const s = ri(1, 5), n = ri(2, 6), s3 = ri(1, 3), n3 = ri(2, 4), k = ri(2, 6), nh = ri(2, 5), e = ri(3, 9);
      return pick([
        Q(`A colony starts at ${s} and doubles every hour. How big is it after ${n} hours?`, "🦠", s * Math.pow(2, n), ["Multiply by 2 once for each hour.", "Work step by step, doubling the number each time.", "Example: starting at 3 and doubling 4 times: 6, 12, 24, 48. Now do yours."]),
        Q(`A quantity starts at ${s3} and triples every day. What is it after ${n3} days?`, "📈", s3 * Math.pow(3, n3), ["Multiply by 3 once for each day.", "Work step by step, tripling the number each time.", "Example: starting at 2 and tripling 3 times: 6, 18, 54. Now do yours."]),
        Q(`A sample of ${k * Math.pow(2, nh) * 10} grams is halved ${nh} times. How many grams are left?`, "⚗️", k * 10, ["Halving means dividing by 2 each time.", "Divide by 2 as many times as the number of halvings.", "Example: 160 g halved 3 times: 80, 40, 20. Now do yours."]),
        Q(`Starting from 1 and doubling each time, how many doublings does it take to reach ${Math.pow(2, e)}?`, "🔢", e, ["Count how many times you must multiply 2 to reach it.", "Double 1 again and again, counting the steps: 2, 4, 8...", "Example: reaching 32 takes 5 doublings. Now count for the number in your question."])
      ]);
    }),
    gen("Counting truss members", [
      ["Triangle by triangle", "🔺", "A simple truss is built from triangles. A single triangle has 3 joints (corners) and 3 members (bars)."],
      ["The rule", "🧮", "For a simple stiff truss: members = 2 × joints - 3. With 5 joints: 2 × 5 - 3 = 7 members. Each new joint adds two bars, making a new triangle."],
      ["Too few or too many", "⚠️", "Fewer members than the rule and the truss can fold or collapse. More members means extra bars that add weight and cost, but may add strength."]
    ], () => {
      const j = ri(4, 12), m = 2 * ri(4, 12) - 3, j2 = ri(4, 8), diff = pick([-1, 0, 1]), m2 = 2 * j2 - 3 + diff;
      return pick([
        Q(`How many members does a simple stiff truss with ${j} joints need? (members = 2 × joints - 3)`, "🌉", 2 * j - 3, ["Use the rule with the number of joints.", "Double the joints, then subtract 3.", "Example: 8 joints need 2 x 8 - 3 = 13 members. Now do yours."]),
        Q(`A simple stiff truss has ${m} members. How many joints does it have?`, "🔍", (m + 3) / 2, ["Undo members = 2 x joints - 3.", "Add 3 to the members, then halve.", "Example: 21 members give (21 + 3) / 2 = 12 joints. Now do yours."]),
        Q(`A truss has ${j2} joints and ${m2} members. The rule says it needs ${2 * j2 - 3}. What is true?`, "🔺", diff < 0 ? "It has too few members and can fold" : diff === 0 ? "It is exactly stiff" : "It has an extra member", ["Compare the real members with the number the rule gives.", "Fewer is not stiff, equal is just stiff, more has extras.", "Example: needing 9 but having 8 means it can fold. Now do yours."], ["It has too few members and can fold", "It is exactly stiff", "It has an extra member"])
      ]);
    }),
    gen("Wind turbine power", [
      ["Wind speed cubed", "🌬️", "The power in wind grows with the <b>cube</b> of its speed. If the wind speed doubles, power goes up 2 × 2 × 2 = 8 times! Tripling the speed gives 27 times the power."],
      ["Blade length", "🌀", "Longer blades sweep a circle of area π × r². Doubling the blade length makes the swept area 4 times bigger, so about 4 times the power."],
      ["Tall towers", "🗼", "Wind is faster and steadier high up, so turbines are on tall towers. Even a small gain in wind speed gives a lot more power."]
    ], () => {
      const k = pick([2, 3]), P = ri(1, 9), r = ri(2, 4);
      return pick([
        Q(`The wind speed becomes ${k} times faster. By how much is the power in the wind multiplied?`, "🌬️", k * k * k, ["Power depends on the cube of speed.", "Multiply the speed factor by itself three times.", "Example: 4 times faster wind gives 64 times the power. Now do yours."]),
        Q(`A turbine makes ${P} kW at a certain wind speed. How many kW would it make if the wind speed doubled? (power grows as speed cubed)`, "⚡", P * 8, ["Doubling the speed makes the power much bigger than double.", "Multiply by 2 three times, which is 8.", "Example: 3 kW at the first speed would become 24 kW. Now do yours with its own power."]),
        Q(`The blades of a turbine are made ${r} times longer. By what number is the swept area multiplied?`, "🌀", r * r, ["Area depends on the radius times itself.", "Multiply the blade-length factor by itself.", "Example: blades 10 times longer would give an area 100 times bigger. Now do yours."]),
        Q("Why are wind turbines placed on tall towers?", "🗼", "Wind is faster and steadier higher up", ["Think about what happens to the wind high above the ground.", "Power depends strongly on wind speed.", "Example: hills block wind near the ground. Now do yours."], ["Wind is faster and steadier higher up", "To make the blades heavier", "So birds can find them"])
      ]);
    }),
    les("Patents, copyright and sharing", [
      ["Owning ideas", "💡", "People own what they create. A <b>patent</b> protects a new invention for a limited time. <b>Copyright</b> protects creative work like writing, drawings, music and software code."],
      ["Names and logos", "🏷️", "A <b>trademark</b> protects a name or logo. A <b>trade secret</b>, such as a secret recipe, is protected by keeping it hidden."],
      ["Sharing", "🤝", "Some creators choose an <b>open source</b> or open license that lets others use and improve their work if they follow its rules. Always give credit and check permission before you reuse someone's work."]
    ], ["Think about what kind of thing is being protected.", "Inventions, creative works and names each have their own kind of protection.", "Example: a brand's logo on shoes is protected as a trademark. Now try yours."], [
      ["Which protects a new invention?", "A patent", "A trademark", "A file name"],
      ["Which protects a song or a drawing?", "Copyright", "A patent", "A trade secret only"],
      ["A company logo is protected by a...", "Trademark", "Patent", "Battery"],
      ["A secret recipe kept hidden is a...", "Trade secret", "Trademark", "Public license"],
      ["An open source license lets others...", "Use and improve the work by following its rules", "Never see the work", "Claim they wrote it"],
      ["Before using someone's picture in your project, you should...", "Check permission and give credit", "Copy it and say it is yours", "Change the colors and hide where it came from"],
      ["A patent lasts...", "For a limited time", "Forever", "Only one day"],
      ["Why do patents help inventors?", "They can stop others copying the invention without permission", "They make the invention work better", "They make it free for all"],
      ["Software code you wrote is usually protected by...", "Copyright", "A patent only", "Nothing at all"]
    ]),
    null, null
  ];
  b[18] = mix("Mixed practice", at(b, [0, 1, 3, 4, 6, 8, 10, 11, 13, 14, 16]));
  b[19] = mix("Level 17 Challenge", at(b, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));

  // ================= LEVEL 18 =================
  const c = [
    gen("Break-even: two plans", [
      ["Two choices", "⚖️", "Plan A: $20 to start plus $2 each hour. Plan B: $8 to start plus $5 each hour. Plan B is cheaper at first, but its hourly price is higher, so at some point they cost the same."],
      ["Find the match", "🧮", "Set the two costs equal: 20 + 2h = 8 + 5h. Subtract 8 and 2h from both sides: 12 = 3h, so h = 4 hours. At 4 hours both cost 28 dollars."],
      ["Which is better?", "🏁", "Before the break-even time, the plan with the lower starting fee is cheaper. After it, the plan with the lower hourly price wins. Engineers compare designs and suppliers this way."]
    ], () => {
      const h = ri(2, 9), d = ri(1, 5), fb = ri(3, 10), fa = fb + d * h, ra = ri(2, 6), rb = ra + d, H1 = h + ri(1, 4), H2 = ri(1, h - 1);
      const useLong = Math.random() < 0.5, H = useLong ? H1 : H2;
      return pick([
        Q(`Plan A costs $${fa} to start plus $${ra} per hour. Plan B costs $${fb} to start plus $${rb} per hour. After how many hours do the two plans cost the same?`, "⚖️", h, ["The plans match when their total costs are equal.", "The difference in starting fees is made up by the difference in hourly prices. Divide the first difference by the second.", "Example: A = $10 + $1 per hour, B = $4 + $3 per hour. Fee gap 6, price gap 2, so 3 hours. Now do yours."]),
        Q(`Plan A costs $${fa} to start plus $${ra} per hour. Plan B costs $${fb} to start plus $${rb} per hour. How many dollars does either plan cost at the break-even time?`, "💲", fa + ra * h, ["First find the hours when they match.", "Find the break-even hours, then put them into either plan's cost.", "Example: with A = $10 + $1 per hour matching at 3 hours, the cost is 10 + 3 = $13. Now do yours."]),
        Q(`Plan A costs $${fa} to start plus $${ra} per hour. Plan B costs $${fb} to start plus $${rb} per hour. Which is cheaper for ${H} hours?`, "🤔", H > h ? "Plan A" : "Plan B", ["Work out each total cost for that many hours.", "Cost = starting fee + hourly price x hours. Compare the two totals.", "Example: A = $10 + $1 per hour, B = $4 + $3 per hour, 5 hours: A is $15, B is $19, so A. Now do yours."], ["Plan A", "Plan B", "They cost the same"])
      ]);
    }),
    gen("Square roots and cube roots", [
      ["Undoing a square", "🟩", "A square with side 7 has area 49. Going backward from the area to the side is the <b>square root</b>: √49 = 7."],
      ["Cubes", "🧊", "A cube with side 3 has volume 27. Going backward is the <b>cube root</b>: ∛27 = 3."],
      ["Estimating", "🎯", "Not every number is a perfect square. √50 is between 7 and 8, because 7 × 7 = 49 and 8 × 8 = 64. Engineers estimate to check answers."]
    ], () => {
      const n = ri(3, 15), k = ri(2, 8), nn = pick([10, 11, 12, 13, 14, 17, 18, 19, 20, 22, 23, 24, 26, 27, 28, 29, 30, 33, 34, 35, 37, 38, 39, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90]), f = Math.floor(Math.sqrt(nn));
      return pick([
        Q(`A square solar panel has an area of ${n * n} square cm. How long is each side in cm?`, "☀️", n, ["The area is the side times itself.", "Find the number which multiplied by itself gives the area.", "Example: area 81 gives side 9. Now do yours."]),
        Q(`A cube-shaped tank holds ${k * k * k} cubic cm. How long is each edge in cm?`, "🧊", k, ["Volume of a cube is edge x edge x edge.", "Find the number that multiplied by itself three times gives the volume.", "Example: volume 64 gives edge 4. Now do yours."]),
        Q(`The square root of ${nn} is between which two whole numbers?`, "🎯", `${f} and ${f + 1}`, ["Find perfect squares just below and just above the number.", "Square the whole numbers near your guess, e.g. 5 x 5, 6 x 6, and see where your number fits between them.", "Example: 40 is between 36 (6 x 6) and 49 (7 x 7), so its root is between 6 and 7. Now do yours."], [`${f} and ${f + 1}`, `${f - 1} and ${f}`, `${f + 1} and ${f + 2}`])
      ]);
    }),
    gen("Scientific notation", [
      ["Big numbers", "🔭", "Engineers write very big or small numbers as <b>scientific notation</b>: a number from 1 to under 10 times a power of ten. Light travels about 3 × 10^8 meters per second."],
      ["Reading it", "🧮", "The little number (the exponent) tells how many places to move the decimal point right. 4 × 10^3 = 4000 and 2.5 × 10^4 = 25,000."],
      ["Comparing", "⚖️", "Compare the exponents first. 9 × 10^4 is bigger than 8 × 10^3, because 10^4 is ten times 10^3 and the front numbers are close."]
    ], () => {
      const a = ri(2, 9), e = ri(3, 6), m = pick(["1.2", "3.5", "4.8", "6.3", "7.4", "2.5"]), e2 = ri(4, 7), d = m.replace(".", ""), N = parseInt(d) * Math.pow(10, e2 - 1);
      let a1, a2, e1;
      do { e1 = ri(3, 7); a1 = ri(1, 8); a2 = ri(2, 9); } while (a1 * 10 === a2);
      const v1 = a1 * Math.pow(10, e1), v2 = a2 * Math.pow(10, e1 - 1), s1 = `${a1} × 10^${e1}`, s2 = `${a2} × 10^${e1 - 1}`;
      return pick([
        Q(`Write ${a} × 10^${e} as an ordinary number.`, "🔭", a * Math.pow(10, e), ["The exponent says how many zeros to put after the front digit.", "Write the front number, then add as many zeros as the exponent.", "Example: 7 × 10^3 is 7000. Now do yours."]),
        Q(`How many zeros come after the ${a} when you write ${a} × 10^${e} in full?`, "0️⃣", e, ["Look at the little raised number.", "The exponent is the number of zeros.", "Example: 4 × 10^5 is 400000, which has five zeros. Now do yours."]),
        Q(`Which is ${N.toLocaleString("en-US")} in scientific notation?`, "🔭", `${m} × 10^${e2}`, ["The front number should be from 1 to just under 10.", "Move the decimal point until only one digit is in front, and count the moves for the exponent.", "Example: 52,000 becomes 5.2 x 10^4. Now do yours."], [`${m} × 10^${e2}`, `${d} × 10^${e2 - 1}`, `0.${d} × 10^${e2 + 1}`]),
        Q(`Which number is larger?`, "⚖️", v1 > v2 ? s1 : s2, ["Write each as an ordinary number or compare the powers of ten.", "A power of ten one bigger is ten times as large, so check how the front numbers compare after that.", "Example: 2 x 10^5 beats 9 x 10^3. Now do yours."], [s1, s2])
      ]);
    }),
    gen("Efficiency of a chain", [
      ["Losses add up", "🔗", "A machine often has several parts in a row. Each part wastes some energy. A motor that is 80% efficient driving gears that are 90% efficient does not give 90% overall."],
      ["Multiply", "✖️", "Overall efficiency = efficiency 1 × efficiency 2. 80% × 90% = 0.8 × 0.9 = 0.72, which is 72%. The overall result is always lower than the weakest part."],
      ["Energy out", "⚡", "Useful energy = energy in × efficiency. 500 J in at 60% gives 300 J useful. The rest, 200 J, is wasted as heat or sound."]
    ], () => {
      const e1 = pick([50, 60, 70, 80, 90]), e2 = pick([50, 60, 70, 80, 90]), E = ri(1, 9) * 100, p = pick([20, 30, 40, 50, 60, 70, 80, 90]), In = pick([200, 400, 500, 1000]);
      return pick([
        Q(`A motor is ${e1}% efficient and drives gears that are ${e2}% efficient. What is the overall efficiency, in percent?`, "🔗", e1 * e2 / 100, ["Efficiencies in a chain multiply.", "Turn each percent into a decimal (divide by 100), multiply, then change back to a percent.", "Example: 50% and 80% gives 0.5 x 0.8 = 0.4, or 40%. Now do yours."]),
        Q(`${E} joules of energy go into a machine that is ${p}% efficient. How many joules are useful output?`, "⚡", E * p / 100, ["Efficiency is the useful share of the energy in.", "Multiply the energy in by the percent and divide by 100.", "Example: 400 J at 25% gives 100 J. Now do yours."]),
        Q(`${E} joules go into a machine that is ${p}% efficient. How many joules are wasted?`, "🔥", E - E * p / 100, ["Wasted energy is whatever is not useful.", "Find the useful energy first, then subtract it from the energy in.", "Example: 400 J in at 25% gives 100 J useful, so 300 J wasted. Now do yours."]),
        Q(`A machine takes in ${In} J and gives out ${In * p / 100} J of useful energy. What is its efficiency, in percent?`, "📊", p, ["Compare the useful energy with the energy in.", "Divide useful energy by energy in, then multiply by 100.", "Example: 50 J out from 200 J in is 50/200 = 0.25, so 25%. Now do yours."])
      ]);
    }),
    gen("Payback time", [
      ["Paying for itself", "💡", "A better product can cost more now but save money later. The <b>payback time</b> is how long the savings take to cover the extra cost."],
      ["The formula", "🧮", "Payback time = cost ÷ savings per year. A $60 LED fixture that saves $15 a year pays back in 60 ÷ 15 = 4 years."],
      ["After payback", "📈", "After the payback time, every year of savings is a real gain. Net gain = savings × years - cost."]
    ], () => {
      const s = ri(2, 12) * 5, y = ri(2, 9), C = s * y, Y = y + ri(1, 6), own = ri(3, 9) * 10, run = ri(2, 9), yy = ri(3, 8);
      return pick([
        Q(`Solar lights cost $${C} and save $${s} a year. How many years is the payback time?`, "☀️", y, ["The savings gradually cover the cost.", "Divide the cost by the savings per year.", "Example: a $90 gadget saving $18 a year pays back in 5 years. Now do yours."]),
        Q(`A new motor costs $${C} and pays itself back in ${y} years. How many dollars per year does it save?`, "⚙️", s, ["Undo payback = cost / savings.", "Divide the cost by the number of years.", "Example: $120 paying back in 8 years saves $15 a year. Now do yours."]),
        Q(`A device costs $${C} and saves $${s} a year. After ${Y} years, what is the net gain in dollars?`, "📈", s * Y - C, ["Total savings minus what you paid.", "Multiply savings per year by the years, then subtract the cost.", "Example: $50 cost, $20 saved a year for 5 years: 100 - 50 = $50 gain. Now do yours."]),
        Q(`A heater costs $${own} to buy and $${run} a year to run. What is the total cost of owning it for ${yy} years, in dollars?`, "🔥", own + run * yy, ["Count the buying price once and the running cost every year.", "Multiply the yearly cost by the years and add the purchase price.", "Example: $40 to buy and $5 a year for 6 years is 40 + 30 = $70. Now do yours."])
      ]);
    }),
    gen("Redundancy and reliability", [
      ["All must work", "⛓️", "Parts in <b>series</b> all have to work. If each is 90% reliable, two in series work together only 0.9 × 0.9 = 0.81, or 81% of the time."],
      ["Backup parts", "🛟", "With a backup (parallel), the system fails only if BOTH fail. If each part fails 10% of the time, both fail 0.1 × 0.1 = 0.01, or 1% of the time."],
      ["Why redundancy", "✈️", "Planes, hospitals and space probes use backups for the most important systems. Redundancy costs more and weighs more, so engineers add it where failure would be most serious."]
    ], () => {
      const p1 = pick([50, 60, 70, 80, 90]), p2 = pick([50, 60, 70, 80, 90]), f1 = pick([10, 20, 30, 40, 50]), f2 = pick([10, 20, 30, 40, 50]);
      return pick([
        Q(`Two parts in series work ${p1}% and ${p2}% of the time. What percent of the time does the whole chain work?`, "⛓️", p1 * p2 / 100, ["Both must work at the same time.", "Multiply the two chances after turning each percent into a decimal.", "Example: 50% and 60% gives 0.5 x 0.6 = 0.3, or 30%. Now do yours."]),
        Q(`A main part fails ${f1}% of the time and its backup fails ${f2}% of the time (independently). What percent of the time do BOTH fail?`, "🛟", f1 * f2 / 100, ["Both failing at once is less likely than either one failing.", "Multiply the two failure chances (as decimals) and change back to percent.", "Example: failure rates of 20% and 30%: 0.2 x 0.3 = 0.06, so 6%. Now do yours."]),
        Q(`A main part fails ${f1}% of the time and has a backup that fails ${f2}% of the time. What percent of the time does the system keep working?`, "✅", 100 - f1 * f2 / 100, ["The system fails only when both parts fail.", "Find the chance both fail, then subtract it from 100.", "Example: both fail 6% of the time, so it works 94%. Now do yours."])
      ]);
    }),
    les("Fatigue and corrosion", [
      ["Fatigue", "🔁", "<b>Fatigue</b> is damage from repeated loading. Bend a paper clip back and forth and it snaps even though each bend was small. Bridges, planes and axles can crack from many small cycles."],
      ["Stress concentration", "🔲", "Sharp corners focus stress, so cracks start there. Engineers round the corners of windows and holes to spread the stress."],
      ["Corrosion", "🟫", "<b>Corrosion</b> eats metal. Iron rusts when it meets water and oxygen. Paint, zinc coating (galvanizing), stainless steel and regular inspection help parts last."]
    ], ["Think about what slowly damages a part: repeating loads, or water and air.", "Cracks tend to start at sharp corners.", "Example: a spoon bent back and forth gets warm and finally snaps. Now try yours."], [
      ["Damage from many repeated small loads is called...", "Fatigue", "Fusion", "Friction fix"],
      ["Rust on iron needs water and...", "Oxygen", "Helium", "Sugar"],
      ["Why do engineers round the corners of windows and holes?", "Sharp corners concentrate stress and start cracks", "Round corners look nicer only", "Round corners weigh more"],
      ["Coating steel with zinc is called...", "Galvanizing", "Fatiguing", "Insulating"],
      ["Stainless steel resists rust because it...", "Contains chromium that forms a protective layer", "Contains extra water", "Is made of paper"],
      ["Why do engineers inspect bridges regularly?", "To find cracks and rust early", "To make them heavier", "To change their color"],
      ["Bending a paper clip back and forth until it breaks shows...", "Fatigue", "Corrosion", "Buoyancy"],
      ["Which helps most to stop a steel gate rusting?", "Paint or a coating that keeps out water", "Leaving it wet", "Adding salt"]
    ]),
    gen("Proportional control", [
      ["Error", "🎯", "A controller compares a <b>target</b> with a measured value. The difference is the <b>error</b>: error = target - measured."],
      ["Proportional", "🧮", "In <b>proportional control</b>, output = Kp × error. A heater with Kp = 5, target 20 °C and measured 16 °C has error 4, so power = 5 × 4 = 20%."],
      ["Smooth and safe", "🛑", "As the error gets smaller, the output gets smaller too, so the system slows down gently near the target. Outputs usually have a limit, such as 100% power."]
    ], () => {
      const T = ri(25, 60), err = ri(2, 20), Kp = ri(2, 5), Kc = pick([5, 10]), ec = pick([8, 12, 15, 25]);
      return pick([
        Q(`A heater has Kp = ${Kp}. The target is ${T} °C and the measured temperature is ${T - err} °C. What is the heater power (Kp × error) in percent?`, "🌡️", Kp * err, ["First find how far from the target you are.", "Subtract the measured value from the target for the error, then multiply by Kp.", "Example: Kp = 3, target 40, measured 30: error 10, output 30. Now do yours."]),
        Q(`A controller with Kp = ${Kp} gives an output of ${Kp * err}. What was the error?`, "🔍", err, ["Undo output = Kp x error.", "Divide the output by Kp.", "Example: Kp = 4 and output 36 gives error 9. Now do yours."]),
        Q(`A motor controller has Kp = ${Kc} and the error is ${ec}. The output is limited to 100. What is the actual output?`, "🧢", Math.min(100, Kc * ec), ["Work out Kp x error, then check the limit.", "If the product is above 100, the output stays at 100.", "Example: Kp = 8 and error 20 gives 160, which is limited to 100; error 5 gives 40. Now do yours."]),
        Q("In proportional control, what happens to the output as the error gets smaller?", "📉", "It gets smaller", ["Output is proportional to the error.", "Smaller error means smaller correction.", "Example: a car eases off the pedal as it nears the right speed. Now do yours."], ["It gets smaller", "It gets bigger", "It stays the same"])
      ]);
    }),
    gen("Reading sensors: ADC", [
      ["Analog to digital", "🎚️", "An <b>ADC</b> (analog-to-digital converter) turns a voltage into a whole number a computer can use. An 8-bit ADC reading 0 to 5 V gives numbers from 0 to 255."],
      ["Steps", "🪜", "Each extra bit doubles the number of levels: 8 bits gives 256 levels and 10 bits gives 1024. The highest reading is one less than the number of levels (255 or 1023), since counting starts at 0."],
      ["Scaling", "🧮", "For an 8-bit ADC and 5 V, each volt is about 51 steps. So 2 V reads 2 × 51 = 102, and a reading of 153 means 153 ÷ 51 = 3 V."]
    ], () => {
      const V = ri(1, 5), bits = pick([8, 10, 12]), b2 = pick([8, 10]);
      return pick([
        Q(`An 8-bit ADC reads 0 to 5 V as 0 to 255, about 51 steps per volt. What reading do you get for ${V} V?`, "🎚️", 51 * V, ["Each volt is worth the same number of steps.", "Multiply the volts by 51.", "Example: if 0-10 V mapped onto 0-100, then 4 V would read 40. Now do yours."]),
        Q(`An 8-bit ADC (about 51 steps per volt) gives a reading of ${51 * V}. What is the voltage in volts?`, "🔌", V, ["Undo the step count.", "Divide the reading by 51.", "Example: if each volt were 10 steps, a reading of 70 would mean 7 V. Now do yours."]),
        Q(`How many different levels can a ${bits}-bit ADC show?`, "🔢", Math.pow(2, bits), ["Each bit doubles the number of levels.", "Multiply 2 by itself once for each bit.", "Example: 3 bits gives 8 levels. Now do yours."]),
        Q(`What is the largest reading a ${b2}-bit ADC can give? (counting starts at 0)`, "🔝", Math.pow(2, b2) - 1, ["The number of levels is a power of two.", "Count the levels as 2 multiplied by itself once per bit, then take one away.", "Example: a 3-bit ADC has 8 levels, so its largest reading is 7. Now do yours."])
      ]);
    }),
    gen("Encoders and rotation", [
      ["Counting ticks", "🧭", "An <b>encoder</b> on a wheel makes a pulse (a tick) at each small step of turning. By counting ticks, a robot knows how far it has turned."],
      ["Distance per tick", "📏", "One full turn gives a set number of ticks. Distance per tick = wheel circumference ÷ ticks per turn. A 40 cm wheel with 20 ticks per turn moves 2 cm per tick."],
      ["Using it", "🤖", "Distance = ticks counted × distance per tick. Counting 60 ticks on that wheel means 120 cm. More ticks per turn gives finer measuring."]
    ], () => {
      const P = pick([[20, 40], [10, 30], [50, 100], [25, 50], [20, 60]]), k = ri(2, 8);
      return pick([
        Q(`A wheel has a circumference of ${P[1]} cm and its encoder gives ${P[0]} ticks per turn. How many cm does the wheel move per tick?`, "🛞", P[1] / P[0], ["Spread the distance of one turn over all the ticks.", "Divide the circumference by the ticks per turn.", "Example: 30 cm and 10 ticks per turn gives 3 cm per tick. Now do yours."]),
        Q(`The wheel has a circumference of ${P[1]} cm and ${P[0]} ticks per turn. The robot counted ${P[0] * k} ticks. How far did it go in cm?`, "🤖", P[1] * k, ["Work out how many full turns the ticks make.", "Divide the ticks by the ticks per turn, then multiply by the circumference.", "Example: 40 ticks on a 20-tick, 50 cm wheel is 2 turns, 100 cm. Now do yours."]),
        Q(`The wheel has a circumference of ${P[1]} cm and ${P[0]} ticks per turn. How many ticks make the robot go ${P[1] * k} cm?`, "🎯", P[0] * k, ["First find how many turns that distance is.", "Divide the distance by the circumference, then multiply by the ticks per turn.", "Example: 100 cm on a 50 cm, 25-tick wheel is 2 turns, so 50 ticks. Now do yours."]),
        Q(`An encoder gives ${P[0]} ticks per turn. The robot counted ${P[0] * k} ticks. How many full turns did the wheel make?`, "🔄", k, ["Each turn gives the same number of ticks.", "Divide the ticks counted by the ticks in one turn.", "Example: 120 ticks at 30 ticks per turn is 4 turns. Now do yours."])
      ]);
    }),
    gen("Recursion", [
      ["A function calls itself", "🪆", "A <b>recursive</b> function calls itself on a smaller problem, like nesting dolls. It needs a <b>base case</b>: a simple case that stops it, such as \"when n is 0, stop\"."],
      ["Example", "🧮", "factorial(n) = n × factorial(n - 1), with factorial(0) = 1. So factorial(3) = 3 × 2 × 1 = 6. And sum(n) = n + sum(n - 1), with sum(0) = 0."],
      ["Careful", "⚠️", "Without a base case, the function would call itself forever. Recursion is great for trees, folders in a computer and splitting problems in halves."]
    ], () => {
      const f = ri(3, 6), n = ri(3, 10), cd = ri(3, 12), t = ri(3, 7);
      const fact = [1, 1, 2, 6, 24, 120, 720];
      return pick([
        Q(`If factorial(n) = n × factorial(n - 1) and factorial(0) = 1, what is factorial(${f})?`, "🪆", fact[f], ["Multiply all the whole numbers from your number down to 1.", "Write out n x (n - 1) x ... x 1 and multiply step by step.", "Example: factorial(4) = 4 x 3 x 2 x 1 = 24. Now do yours with its own number."]),
        Q(`sum(n) = n + sum(n - 1), and sum(0) = 0. What is sum(${n})?`, "➕", n * (n + 1) / 2, ["It adds n, then n - 1, and so on down to zero.", "Add all the whole numbers from 1 up to your number.", "Example: sum(4) = 4 + 3 + 2 + 1 = 10. Now do yours with its own number."]),
        Q(`A function countdown(n) prints n, then calls countdown(n - 1), and stops after printing 0. How many numbers does countdown(${cd}) print?`, "🔟", cd + 1, ["List the numbers it prints.", "It prints every whole number from your number down to 0, including both ends.", "Example: countdown(2) prints 2, 1, 0, which is 3 numbers. Now do yours with its own number."]),
        Q(`f(0) = 1 and f(n) = 2 × f(n - 1). What is f(${t})?`, "✖️", Math.pow(2, t), ["Each step doubles the one before.", "Start at f(0) = 1 and double it again and again.", "Example: f(1) = 2, f(2) = 4, f(3) = 8. Now keep going for yours."]),
        Q("What is the job of the base case in a recursive function?", "🛑", "It stops the function calling itself", ["Think about what would happen with no stopping point.", "Without it, the calls would never end.", "Example: in the countdown, the base case is reaching 0. Now do yours."], ["It stops the function calling itself", "It makes the function run faster", "It prints the answer in color"])
      ]);
    }),
    gen("Machine learning basics", [
      ["Learning from examples", "🤖", "In <b>machine learning</b>, a computer finds patterns from many examples instead of following rules written by a person. Pictures labeled \"cracked\" or \"fine\" can train a program to check bridge parts."],
      ["Training and testing", "🧪", "A model is <b>trained</b> on one set of examples and <b>tested</b> on new ones it has never seen. Accuracy = correct answers ÷ total tests."],
      ["Fairness", "⚖️", "If the training data is missing some kinds of examples, the model can be wrong for them. Engineers check their data carefully and test with people to make the system fair and safe."]
    ], () => {
      const tot = pick([20, 25, 50, 100, 40]), acc = pick([60, 70, 80, 90, 85, 75]);
      const correct = tot * acc / 100;
      return pick([
        Q(`A crack-spotting program got ${correct} of ${tot} new test pictures right. What is its accuracy, in percent?`, "🔍", acc, ["Accuracy compares the correct answers with all the tests.", "Divide correct by total and multiply by 100.", "Example: 18 right out of 20 is 18/20 = 0.9, so 90%. Now do yours."].map(s => s)),
        Q("Why do engineers test a trained model on new examples it has not seen?", "🧪", "To check it works on things it did not memorize", ["Think about the difference between memorizing and learning.", "New examples show if it really learned the pattern.", "Example: a student who memorizes answers may fail a new question. Now do yours."], ["To check it works on things it did not memorize", "To make it forget everything", "To make the training data smaller"]),
        Q("Training data for a bridge-crack detector has pictures only from sunny days. What problem might happen?", "☀️", "It may struggle with pictures taken in rain or shade", ["Think about what the model has never seen.", "A model is best at situations that look like its training data.", "Example: a model trained only on cats may not recognize dogs. Now do yours."], ["It may struggle with pictures taken in rain or shade", "It will work perfectly in all weather", "It will refuse to run"]),
        Q("In machine learning, labels in the training data are...", "🏷️", "The right answers attached to the examples", ["Think of a name tag on each example.", "They tell the model what each example is.", "Example: a photo labeled \"cat\" teaches the word. Now do yours."], ["The right answers attached to the examples", "Stickers on the computer", "The model's final score"])
      ]);
    }),
    gen("Secret codes: ciphers", [
      ["Scrambling messages", "🔐", "<b>Encryption</b> scrambles a message so only people with the <b>key</b> can read it. The original message is the plaintext, and the scrambled one is the ciphertext."],
      ["Caesar cipher", "🔤", "A Caesar cipher shifts every letter along the alphabet by a fixed number. With a shift of 3, A becomes D, and B becomes E. To decode, shift backward."],
      ["Real security", "🛡️", "A Caesar cipher is easy to crack. Real systems use much stronger math. Good habits matter too: use long, unique passwords and never share them."]
    ], () => {
      const S = [1, 2, 4, 5, 6, 7, 8, 9], s = pick(S), i = ri(0, 25), enc = LET[(i + s) % 26], j = ri(0, 25), dec = LET[(j - s + 26) % 26];
      return pick([
        Q(`With a Caesar shift of ${s}, what does the letter ${LET[i]} become?`, "🔐", enc, ["Count forward in the alphabet.", `Move ${s} letters along from ${LET[i]}. After Z you go back to A.`, "Example: with a shift of 3, M becomes P. Now do yours."], shuf([enc, LET[(i + s + 1) % 26], LET[(i + s + 25) % 26]])),
        Q(`A message was encoded with a Caesar shift of ${s}. The coded letter is ${LET[j]}. What was the original letter?`, "🔓", dec, ["Decoding means going the other way.", `Move ${s} letters BACKWARD from ${LET[j]}. Before A you go back to Z.`, "Example: with a shift of 3, the coded P was originally M. Now do yours."], shuf([dec, LET[(j - s + 27) % 26], LET[(j - s + 25) % 26]])),
        Q(`In a Caesar cipher, ${LET[i]} becomes ${enc}. How many places was the shift?`, "🔢", s, ["Count the steps from the first letter to the coded one.", "Count forward in the alphabet from the plain letter until you reach the coded letter.", "Example: P is 3 letters after M, so the shift was 3. Now do yours."]),
        Q("In encryption, the key is...", "🗝️", "The secret needed to lock and unlock the message", ["Think of a real key.", "Only people who have it can read the message.", "Example: a diary lock opens with its key. Now do yours."], ["The secret needed to lock and unlock the message", "The first letter of the message", "The name of the computer"]),
        Q("Which is the best habit for passwords?", "🔑", "A long, unique one for each account that you do not share", ["Think about what an attacker could guess.", "Longer and different for each account is safer.", "Example: using one short password everywhere means one leak opens every account. Now do yours."], ["A long, unique one for each account that you do not share", "The same short one everywhere", "Your name and birthday"])
      ]);
    }),
    gen("Glide ratio", [
      ["Gliding", "🛩️", "A glider has no engine. It trades height for distance. The <b>glide ratio</b> says how many meters it travels forward for each meter it drops."],
      ["Using it", "🧮", "Distance = height × glide ratio. A glider with a ratio of 20 starting 100 m up can glide about 100 × 20 = 2000 m."],
      ["Better design", "🕊️", "Long, thin wings and smooth shapes give a high ratio. Albatrosses and sailplanes have wings like this. Heavy, stubby shapes drop quickly."]
    ], () => {
      const r = pick([8, 10, 12, 15, 20, 25]), h = pick([100, 200, 300, 500]), r2 = pick([8, 10, 12, 15, 20]), r3 = pick([30, 40, 50, 60]);
      return pick([
        Q(`A glider with a glide ratio of ${r} starts ${h} m high. About how far can it glide, in meters?`, "🛩️", r * h, ["The ratio says meters forward per meter of height.", "Multiply the height by the glide ratio.", "Example: a ratio of 10 from 50 m high gives 500 m. Now do yours."]),
        Q(`A glider flew ${r * h} m while dropping ${h} m. What is its glide ratio?`, "📏", r, ["The ratio is distance forward per meter dropped.", "Divide the distance flown by the height lost.", "Example: 900 m forward for a 30 m drop is a ratio of 30. Now do yours."]),
        Q(`A glider with a ratio of ${r2} must glide ${r2 * h} m to reach a landing field. What height does it need to start from, in meters?`, "🏞️", h, ["Undo distance = height x ratio.", "Divide the distance by the glide ratio.", "Example: 2000 m with a ratio of 20 needs 100 m of height. Now do yours."]),
        Q(`Glider A has a ratio of ${r3 - 20}. Glider B has a ratio of ${r3}. Which one goes farther from the same height?`, "🥇", "Glider B", ["A higher ratio means more distance per meter dropped.", "Compare the two ratios.", "Example: of ratios 12 and 18, the 18 glides farther. Now do yours."], ["Glider A", "Glider B", "They go the same"])
      ]);
    }),
    les("Simulation and testing virtually", [
      ["Virtual tests", "💻", "Engineers use computer <b>simulations</b> to test designs before building them. They can try thousands of ideas cheaply and safely."],
      ["Finite elements", "🧩", "In <b>finite element analysis</b>, a part is split into many tiny pieces called a <b>mesh</b>. The computer works out forces on each piece, and colors show where stress is high."],
      ["Not magic", "⚠️", "A simulation is only as good as its inputs: \"garbage in, garbage out\". Engineers check models against real tests and still build prototypes."]
    ], ["Think about what a computer test can and cannot do.", "Simulations are cheap and fast, but they depend on the numbers put in.", "Example: a wind tunnel on screen can test shapes before any metal is cut. Now try yours."], [
      ["Why use a simulation before building?", "It tests ideas cheaply and safely", "It makes the part lighter", "It replaces all physical testing forever"],
      ["In finite element analysis, a part is split into...", "Many tiny pieces called a mesh", "Two big halves", "One single block"],
      ["On a stress map, bright red usually shows...", "High stress", "Low stress", "A different material"],
      ["\"Garbage in, garbage out\" means...", "Bad inputs give bad results", "Computers can eat garbage", "Simulations never fail"],
      ["How do engineers check a simulation is trustworthy?", "Compare it with real measurements", "Trust it blindly", "Turn off the screen"],
      ["Which is a good use of simulation?", "Testing many bridge shapes before choosing one", "Replacing safety checks completely", "Guessing the weather next year exactly"],
      ["A digital twin is...", "A computer model that follows a real machine", "A second real machine", "A tool box"],
      ["Why are prototypes still built after simulation?", "Real tests can show things the model missed", "Because simulations are illegal", "To waste material"]
    ]),
    gen("Foundation pressure", [
      ["Spreading weight", "🏢", "A building pushes down on the ground through its foundation. <b>Pressure</b> = force ÷ area. In building, loads use kN (kilonewtons) and areas use m², giving kPa (kilopascals)."],
      ["Soil limit", "🌍", "Soil can carry only so much. Soft clay might allow 100 kPa, firm gravel 300 kPa. If the pressure is above what the soil allows, the building can sink."],
      ["Wider is safer", "↔️", "To lower the pressure, make the foundation wider. Doubling the area halves the pressure. That is why tall buildings sit on big slabs or deep piles."]
    ], () => {
      const p = pick([50, 100, 150, 200]), A = ri(2, 9), allow = pick([100, 150, 200]), over = Math.random() < 0.5;
      const pr = over ? allow + pick([20, 50]) : allow - pick([20, 50]);
      return pick([
        Q(`A footing of ${A} m² carries ${p * A} kN. What is the pressure on the soil in kPa?`, "🏢", p, ["Pressure is force spread over area.", "Divide the force in kN by the area in m².", "Example: 300 kN on 3 m² is 100 kPa. Now do yours."]),
        Q(`A load of ${p * A} kN must sit on soil allowed to take ${p} kPa. What area must the footing have, in m²?`, "📐", A, ["Rearrange pressure = force / area.", "Divide the load by the allowed pressure.", "Example: 600 kN at 200 kPa needs 3 m². Now do yours."]),
        Q(`The pressure under a footing is ${pr} kPa. The soil allows ${allow} kPa. Is the footing safe?`, "🌍", pr <= allow ? "Yes, pressure is within the limit" : "No, pressure is above the limit", ["Compare the pressure with the soil limit.", "It is safe only if the pressure is not more than the limit.", "Example: 90 kPa on soil allowing 120 kPa is safe. Now do yours."], ["Yes, pressure is within the limit", "No, pressure is above the limit"]),
        Q("A footing is made twice as wide in area. What happens to the pressure on the soil?", "↔️", "It is halved", ["Pressure = force / area.", "More area spreads the same force thinner.", "Example: a snowshoe spreads your weight so you sink less. Now do yours."], ["It is halved", "It doubles", "It stays the same"])
      ]);
    }),
    gen("Outliers and spread", [
      ["Far from the rest", "📍", "An <b>outlier</b> is a measurement far from the others. It may be a mistake (a wrongly read scale) or a real surprise. Engineers investigate it before deciding to remove it."],
      ["Mean vs median", "⚖️", "One big outlier pulls the <b>mean</b> up a lot, but the <b>median</b> (the middle value) barely changes. The median is more robust."],
      ["Range", "↔️", "The <b>range</b> = biggest - smallest. It shows spread, but an outlier makes it jump."]
    ], () => {
      const base = ri(40, 60), vals = [base - 3, base - 1, base + 1, base + 3], out = base + ri(20, 40);
      const arr = [ri(10, 20), ri(21, 30), ri(31, 40), ri(41, 50), ri(51, 60)];
      const med = [base - 3, base - 1, base + 1, base + 3, out];
      const mn = Math.min(...arr), mx = Math.max(...arr);
      return pick([
        Q(`Test results: ${shuf(arr).join(", ")}. What is the range?`, "↔️", mx - mn, ["Range uses the largest and smallest values only.", "Find the biggest and smallest numbers and subtract.", "Example: 4, 9, 15 has a range of 15 - 4 = 11. Now do yours."]),
        Q(`Beam strengths: ${shuf(med).join(", ")}. What is the median?`, "📊", base + 1, ["Put the numbers in order first.", "The median is the middle number of the ordered list of five.", "Example: 3, 9, 4, 5, 70: ordered 3, 4, 5, 9, 70, median 5. Now do yours."]),
        Q(`Beam strengths: ${shuf(vals.concat([out])).join(", ")}. The value ${out} is an outlier. What is the mean of the OTHER four values?`, "🧮", base, ["Leave out the outlier.", "Add the other four and divide by 4.", "Example: 10, 12, 14, 16 gives 52 / 4 = 13. Now do yours."]),
        Q("Which is less affected by one extreme outlier?", "🛡️", "The median", ["The mean uses every number's size.", "The median only depends on the middle position.", "Example: adding one huge number to a list of ages moves the mean a lot but the middle only a little. Now do yours."], ["The median", "The mean", "Both change equally"])
      ]);
    }),
    les("Writing an engineering report", [
      ["Tell the story", "📝", "An engineering report explains what you did so others can check it and repeat it. Start with the <b>problem</b> and the <b>criteria and constraints</b>."],
      ["The middle", "📊", "Describe your design and how you built it, with labeled drawings. Show test <b>data</b> in tables or graphs, with units, and say how many times you tested."],
      ["The end", "✅", "End with a <b>conclusion</b>: did the design meet the criteria? What would you improve? Be honest about failures, because they teach the most. List any sources you used."]
    ], ["Think about what a reader needs to trust and repeat your work.", "Include the problem, the evidence and an honest conclusion.", "Example: a lab report that hides a failed test is less useful than one that shows it. Now try yours."], [
      ["A report should begin with...", "The problem and the goals", "The final price only", "A joke"],
      ["Test data in a report should include...", "Units and how many tests were done", "Only the best result", "No numbers"],
      ["A conclusion says...", "Whether the design met the goals and what to improve", "Nothing important", "Who is the fastest typist"],
      ["Why show failed tests honestly?", "They teach what to fix", "To make the report longer", "To hide the good results"],
      ["Why list your sources?", "So readers can check where facts came from", "To make the page full", "To avoid writing a conclusion"],
      ["Labeled drawings help because they...", "Show exactly what was built", "Replace the data", "Make the design heavier"],
      ["A graph in a report needs...", "Labeled axes with units", "No title", "Random colors only"],
      ["Which makes a report easier for others to repeat?", "Clear steps and measurements", "Vague descriptions", "Leaving out materials"]
    ]),
    null, null
  ];
  c[18] = mix("Mixed practice", at(c, [0, 2, 3, 4, 5, 7, 8, 9, 10, 12, 13, 15, 16]));
  c[19] = mix("Level 18 Challenge", at(c, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));

  Object.assign(ENGINEER_LEVELS, { 16: a, 17: b, 18: c });
})();
