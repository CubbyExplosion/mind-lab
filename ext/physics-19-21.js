// ext/physics-19-21.js  Physics levels 19-21 (9th grade, 10th grade first half): high-school physics with calculations
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
  const num = (title, slides, gen) => {
    const make = () => { const g = gen(); return { text: g.text, visual: g.visual, answer: g.answer, hints: g.hints }; };
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
  const Q = (text, visual, answer, hints) => ({ text, visual, answer, hints });
  const r2 = x => Math.round(x * 1000) / 1000;
  const tryGen = f => { for (let i = 0; i < 2000; i++) { const r = f(); if (r) return r; } throw new Error("generator failed"); };

  // ================= LEVEL 19 =================
  const a = [
    num("Falling from rest", [
      ["Free fall", "🪨", "Ignoring air, a falling object speeds up by <b>10 m/s every second</b> (g = 10 m/s²). Starting from rest: <b>v = gt</b> and the distance fallen is <b>h = ½gt² = 5t²</b>."],
      ["Worked example", "🧮", "Dropped for 3 s: speed = 10 × 3 = 30 m/s. Distance = 5 × 3² = 5 × 9 = 45 m."],
      ["Tip", "💡", "Distance grows with the <b>square</b> of time: twice as long means four times as far."]
    ], () => {
      const t = ri(1, 6);
      return pick([
        Q(`A stone is dropped from rest. How far does it fall in ${t} s? Use h = 5t² (g = 10 m/s²). Answer in metres.`, "🪨", 5 * t * t,
          ["Falling from rest: distance depends on the time squared.", "Square the time first, then multiply by 5.", "Example: 4 s of falling gives 5 × 4² = 5 × 16 = 80 m. Now do yours."]),
        Q(`A coin falls ${5 * t * t} m from rest. How many seconds does it take? (g = 10 m/s², h = 5t²)`, "🪙", t,
          ["Work backwards from h = 5t².", "Divide the distance by 5, then find which number multiplied by itself gives that.", "Example: 20 m means 20 ÷ 5 = 4, and 2 × 2 = 4, so t = 2 s. Now do yours."]),
        Q(`An apple falls from rest for ${t} s. How fast is it moving at the end, in m/s? (g = 10 m/s², v = gt)`, "🍎", 10 * t,
          ["Speed grows steadily as it falls.", "Gain 10 m/s each second, so multiply g by the time.", "Example: after 5 s the speed is 10 × 5 = 50 m/s. Now do yours."])
      ]);
    }),
    num("Up and down", [
      ["Going up", "🎾", "A ball thrown straight up slows by 10 m/s each second until it stops at the top. Time to the top = <b>v ÷ g</b>."],
      ["Coming down", "⬇️", "The trip down is a mirror image of the trip up. So the <b>total time = 2 × time to top</b>, and it lands at the launch point with the <b>same speed</b> it was thrown."],
      ["Example", "🧮", "Thrown up at 30 m/s: time to top = 30 ÷ 10 = 3 s. Total flight = 6 s."]
    ], () => {
      const v = pick([10, 15, 20, 25, 30, 40, 50]);
      return pick([
        Q(`A ball is thrown straight up at ${v} m/s. How many seconds until it reaches the top? (g = 10 m/s², ignore air)`, "🎾", v / 10,
          ["At the top the ball is momentarily at rest.", "It loses 10 m/s every second, so divide the launch speed by 10.", "Example: launched at 40 m/s it needs 40 ÷ 10 = 4 s to stop. Now do yours."]),
        Q(`A ball is thrown straight up at ${v} m/s and lands back in your hand. How long was it in the air in seconds? (g = 10 m/s²)`, "🙌", v / 5,
          ["Up and down take equal times.", "Find the time to the top (speed ÷ 10), then double it.", "Example: launched at 20 m/s: 2 s up plus 2 s down = 4 s. Now do yours."]),
        Q(`A ball is thrown straight up and takes ${v / 10} s to reach the top. What was its launch speed in m/s? (g = 10 m/s²)`, "🚀", v,
          ["It lost all its speed in that time.", "It loses 10 m/s each second, so multiply the time by 10.", "Example: 3 s to the top means a launch speed of 3 × 10 = 30 m/s. Now do yours."]),
        Q(`A ball is thrown up at ${v} m/s. With no air resistance, how fast is it moving when it comes back down to the same height, in m/s?`, "↩️", v,
          ["The motion down mirrors the motion up.", "Energy is conserved, so the speeds at the same height match.", "Example: thrown up at 12 m/s, it returns at 12 m/s. Now do yours."])
      ]);
    }),
    les("Projectile motion", [
      ["Two motions at once", "🏹", "A <b>projectile</b> moves sideways and up-down at the same time. Sideways (ignoring air) nothing speeds it up or slows it down, so the <b>horizontal velocity stays constant</b>."],
      ["Gravity only works down", "🌍", "Vertically, gravity gives a constant acceleration of 10 m/s² <b>downward</b>. A ball rolled off a table sideways and a ball dropped at the same moment hit the floor together."],
      ["The path", "🌈", "Together these make a curved path called a <b>parabola</b>. At the top, the vertical velocity is zero, but the ball is still moving sideways and gravity is still pulling."]
    ], ["Treat sideways and up-down motion separately.", "Horizontal: no force, so no change in velocity. Vertical: gravity acts every moment.", "Example: a ball kicked at an angle keeps its sideways speed all the way to the ground. Now do yours."], [
      ["A ball rolls off a table sideways and another is dropped at the same moment. With no air, which hits the floor first?", "They land together", "The dropped one", "The one rolled sideways"],
      ["Ignoring air, the horizontal velocity of a projectile is...", "Constant", "Increasing by 10 m/s each second", "Zero at the top"],
      ["At the top of its flight, a kicked ball's acceleration is...", "10 m/s² downward", "Zero", "10 m/s² upward"],
      ["At the highest point of a kicked ball's path, its vertical velocity is...", "Zero", "At its maximum", "Equal to its horizontal velocity"],
      ["Ignoring air, which launch angle gives the longest range on level ground?", "45°", "90°", "10°"],
      ["A ball rolls off a table. If it rolls off twice as fast, the time to fall is...", "The same", "Doubled", "Halved"],
      ["The path of a projectile is a...", "Parabola", "Straight line", "Circle"],
      ["Two balls are thrown with the same speed, one straight up and one at 45°. Which reaches the greater height?", "The one thrown straight up", "The one thrown at 45°", "Both reach the same height"]
    ]),
    num("Horizontal launch", [
      ["Fall time first", "🏀", "A ball rolled off a table fall time depends only on the height: <b>h = 5t²</b>, so t = √(h ÷ 5)."],
      ["Then sideways", "➡️", "Sideways speed stays constant, so <b>range = horizontal speed × time of fall</b>."],
      ["Example", "🧮", "Off a 20 m cliff at 6 m/s: fall time = √(20 ÷ 5) = 2 s. Range = 6 × 2 = 12 m."]
    ], () => {
      const h = pick([5, 20, 45, 80]), t = Math.sqrt(h / 5), vx = pick([4, 5, 6, 8, 10, 12, 15, 20]);
      return pick([
        Q(`A ball rolls off a cliff ${h} m high at ${vx} m/s sideways. How long does it take to land, in seconds? (g = 10 m/s², h = 5t²)`, "🏔️", t,
          ["Only the height matters for the time.", "Divide the height by 5, then take the square root.", "Example: a 20 m cliff gives 20 ÷ 5 = 4, and the square root of 4 is 2 s. Now do yours."]),
        Q(`A ball rolls off a ledge ${h} m high at ${vx} m/s sideways. How far from the base of the wall does it land, in metres? (g = 10 m/s²)`, "📏", vx * t,
          ["Find the fall time first.", "Sideways distance = sideways speed × fall time.", "Example: off a 5 m ledge at 3 m/s: time 1 s, so it lands 3 × 1 = 3 m away. Now do yours."]),
        Q(`A ball leaves a ${h}-m-high roof sideways and lands ${vx * t} m from the wall. What was its horizontal speed in m/s? (g = 10 m/s²)`, "🏠", vx,
          ["Fall time comes from the height alone.", "Horizontal speed = range ÷ fall time.", "Example: it lands 40 m away after a 4 s fall, so the speed is 40 ÷ 4 = 10 m/s. Now do yours."])
      ]);
    }),
    num("Friction force", [
      ["Normal force", "⬇️", "On level ground the surface pushes up with a <b>normal force</b> N equal to the weight: <b>N = mg</b> (g = 10)."],
      ["The friction rule", "🧱", "Sliding friction is <b>F = μN</b>, where μ (mu) is the <b>coefficient of friction</b>. Rough surfaces have a bigger μ."],
      ["Example", "🧮", "A 5 kg box with μ = 0.4: N = 50 N, so F = 0.4 × 50 = 20 N."]
    ], () => {
      const m = pick([2, 3, 4, 5, 6, 8, 10, 15, 20]), mu = pick([0.1, 0.2, 0.4, 0.5]);
      return pick([
        Q(`A ${m} kg crate slides on a floor where μ = ${mu}. What is the friction force in N? (g = 10 m/s²)`, "📦", r2(mu * m * 10),
          ["First find the normal force on level ground.", "N = mass × 10, then friction = μ × N.", "Example: 6 kg with μ = 0.5 gives N = 60 N and F = 0.5 × 60 = 30 N. Now do yours."]),
        Q(`A ${m} kg crate slides on level ground. The friction force is ${r2(mu * m * 10)} N. What is μ? (g = 10 m/s²)`, "🧮", mu,
          ["Rearrange F = μN.", "μ = F ÷ N, and N = mass × 10.", "Example: a 4 kg block has N = 40 N and friction 8 N, so μ = 8 ÷ 40 = 0.2. Now do yours."]),
        Q(`A ${m} kg box sits on a level table. What is the normal force from the table, in N? (g = 10 m/s²)`, "🟫", m * 10,
          ["The table holds the box up.", "On a level surface N equals the weight.", "Example: a 7 kg box has N = 7 × 10 = 70 N. Now do yours."]),
        Q(`A box is dragged at a steady speed. Friction is ${r2(mu * m * 10)} N. What pulling force is needed, in N?`, "🧗", r2(mu * m * 10),
          ["Steady speed means no net force.", "The pull must match the friction exactly.", "Example: if friction is 15 N at steady speed, the pull is 15 N. Now do yours."])
      ]);
    }),
    num("Acceleration with friction", [
      ["Net force", "➡️", "Add up the forces along the line of motion. <b>Net force = pull − friction</b>, and then <b>a = net force ÷ mass</b>."],
      ["Friction first", "🧱", "Find friction from F = μmg. Subtract it from the pull. Divide by the mass."],
      ["Example", "🧮", "A 4 kg block pulled with 20 N, μ = 0.2: friction = 0.2 × 40 = 8 N. Net = 12 N. a = 12 ÷ 4 = 3 m/s²."]
    ], () => {
      const m = pick([2, 4, 5, 10]), mu = pick([0.1, 0.2, 0.3, 0.5]), ac = pick([1, 2, 3, 4]);
      const F = m * (ac + 10 * mu), fr = r2(mu * m * 10);
      return pick([
        Q(`A ${m} kg block is pulled along a floor with ${r2(F)} N. The coefficient of friction is ${mu}. What is its acceleration in m/s²? (g = 10)`, "🛷", ac,
          ["Friction opposes the pull.", "Net force = pull − μmg, then divide by mass.", "Example: 6 kg, pull 30 N, μ = 0.1: friction 6 N, net 24 N, a = 4 m/s². Now do yours."]),
        Q(`A ${m} kg block accelerates at ${ac} m/s² when pulled with ${r2(F)} N. How big is the friction force in N?`, "🧱", fr,
          ["Net force = mass × acceleration.", "Friction = pull − net force.", "Example: 3 kg at 2 m/s² needs net 6 N. With a 20 N pull, friction is 14 N. Now do yours."]),
        Q(`A ${m} kg block is pulled with ${r2(F)} N and friction is ${fr} N. What is the net force in N?`, "⚖️", r2(F - fr),
          ["Forces along the line of motion partly cancel.", "Subtract the smaller force from the larger.", "Example: pull 25 N, friction 9 N: net = 16 N. Now do yours."]),
        Q(`A ${m} kg block slides at constant speed on a floor with μ = ${mu}. What horizontal pull is needed, in N? (g = 10)`, "🚜", fr,
          ["Constant speed means zero acceleration.", "Pull = friction = μmg.", "Example: 5 kg with μ = 0.2 at steady speed needs 0.2 × 50 = 10 N. Now do yours."])
      ]);
    }),
    num("Forces on a slope", [
      ["Split the weight", "⛰️", "On a slope the weight splits in two. The part <b>along the slope</b> is <b>mg sin θ</b>. The part pressing <b>into</b> the slope is <b>mg cos θ</b>."],
      ["Useful values", "📐", "sin 30° = 0.5, sin 37° ≈ 0.6, sin 53° ≈ 0.8. cos 37° ≈ 0.8. On a smooth slope <b>a = g sin θ</b>."],
      ["Example", "🧮", "A 10 kg box on a smooth 30° slope: force down the slope = 100 × 0.5 = 50 N, so a = 50 ÷ 10 = 5 m/s²."]
    ], () => {
      const ang = pick([[30, 0.5], [37, 0.6], [53, 0.8]]), m = pick([2, 4, 5, 10, 20]);
      const mu = pick([0.125, 0.25, 0.5]);
      return pick([
        Q(`A ${m} kg sled is on a smooth slope of ${ang[0]}° (sin ${ang[0]}° = ${ang[1]}). What force pulls it down the slope, in N? (g = 10)`, "🛷", r2(m * 10 * ang[1]),
          ["Use the part of the weight along the slope.", "Force = mass × 10 × sin θ.", "Example: 5 kg on a 30° slope: 5 × 10 × 0.5 = 25 N. Now do yours."]),
        Q(`A frictionless slope is at ${ang[0]}° (sin ${ang[0]}° = ${ang[1]}). What is the acceleration of a block sliding down, in m/s²? (g = 10)`, "⛷️", r2(10 * ang[1]),
          ["The mass cancels out on a smooth slope.", "a = g × sin θ.", "Example: with sin θ = 0.2 the acceleration would be 10 × 0.2 = 2 m/s². Now do yours."]),
        Q(`A block slides down a 37° slope (sin 37° = 0.6, cos 37° = 0.8) with μ = ${mu}. What is its acceleration in m/s²? (g = 10)`, "🏂", r2(6 - 8 * mu),
          ["Down the slope: g sin θ. Up the slope: friction μ g cos θ.", "a = 10 × 0.6 − μ × 10 × 0.8.", "Example: with μ = 0.1 on the same slope: a = 6 − 0.8 = 5.2 m/s². Now do yours."])
      ]);
    }),
    num("Two blocks pulled together", [
      ["One system", "🚃", "Two blocks joined by a rope move with the <b>same acceleration</b>. For the whole system: <b>F = (m₁ + m₂) a</b>."],
      ["Tension", "🪢", "The rope only has to accelerate the block it pulls. If you pull block 1, the tension is <b>T = m₂ a</b> (the block behind)."],
      ["Example", "🧮", "Pull 30 N on 2 kg + 3 kg: a = 30 ÷ 5 = 6 m/s². Rope tension = 3 × 6 = 18 N."]
    ], () => {
      const m1 = ri(1, 8), m2 = ri(1, 8), ac = ri(1, 5), F = (m1 + m2) * ac;
      return pick([
        Q(`A force of ${F} N pulls a ${m1} kg cart that is tied to a ${m2} kg cart. Ignoring friction, what is the acceleration in m/s²?`, "🚃", ac,
          ["Treat the two carts as one object.", "Divide the force by the total mass.", "Example: 24 N on 1 kg + 5 kg gives 24 ÷ 6 = 4 m/s². Now do yours."]),
        Q(`A ${m1} kg cart is pulled by a rope. Behind it, tied by a rope, is a ${m2} kg cart. The system accelerates at ${ac} m/s². What is the tension in the rope between the carts, in N?`, "🪢", m2 * ac,
          ["The rope between the carts pulls only the rear cart.", "Tension = mass of the rear cart × acceleration.", "Example: a 3 kg rear cart at 4 m/s² needs 12 N in the rope. Now do yours."]),
        Q(`Two carts of ${m1} kg and ${m2} kg accelerate together at ${ac} m/s². What total force acts on them, in N?`, "💪", F,
          ["Use the total mass.", "F = (m₁ + m₂) × a.", "Example: 2 kg + 4 kg at 3 m/s² needs 6 × 3 = 18 N. Now do yours."])
      ]);
    }),
    num("Lifts and apparent weight", [
      ["The scale reading", "🛗", "A scale shows the force it pushes up with. In a lift accelerating <b>upward</b>, <b>N = m(g + a)</b>. Accelerating <b>downward</b>: <b>N = m(g − a)</b>."],
      ["Steady speed", "➖", "At rest or at constant speed N = mg. You only feel heavier or lighter while the speed is <i>changing</i>."],
      ["Example", "🧮", "A 50 kg person in a lift accelerating up at 2 m/s²: N = 50 × (10 + 2) = 600 N."]
    ], () => {
      const m = pick([40, 50, 60, 70, 80]), ac = pick([1, 2, 3, 4]);
      return pick([
        Q(`A ${m} kg person stands on a scale in a lift accelerating upward at ${ac} m/s². What does the scale read, in N? (g = 10)`, "🛗", m * (10 + ac),
          ["The floor must push up harder than the weight.", "N = m × (10 + a).", "Example: 60 kg at 1 m/s² up gives 60 × 11 = 660 N. Now do yours."]),
        Q(`A ${m} kg person stands on a scale in a lift accelerating downward at ${ac} m/s². What does the scale read, in N? (g = 10)`, "⬇️", m * (10 - ac),
          ["The floor pushes up with less than the weight.", "N = m × (10 − a).", "Example: 60 kg at 1 m/s² down gives 60 × 9 = 540 N. Now do yours."]),
        Q(`A ${m} kg person in a lift reads ${m * (10 + ac)} N on a scale. The lift is speeding up while going up. What is its acceleration in m/s²? (g = 10)`, "📈", ac,
          ["Compare the reading with the weight.", "a = N ÷ m − 10.", "Example: 50 kg reading 570 N: 570 ÷ 50 = 11.4, so a = 1.4 m/s². Now do yours."]),
        Q(`A ${m} kg person rides a lift moving up at a constant speed. What does the scale read, in N? (g = 10)`, "🧍", m * 10,
          ["Constant speed means balanced forces.", "The reading equals the weight.", "Example: a 45 kg rider at steady speed reads 450 N. Now do yours."])
      ]);
    }),
    les("Equilibrium", [
      ["Balanced forces", "⚖️", "An object is in <b>equilibrium</b> when the net force is zero. It stays at rest or keeps moving at a constant velocity."],
      ["Up equals down", "↕️", "Add forces in each direction. Up must equal down and left must equal right. A hanging weight is held by a tension equal to its weight."],
      ["Three forces", "🔺", "If three forces balance, drawn tip to tail they make a <b>closed triangle</b>. Two ropes sharing a weight each carry part of it."]
    ], ["Ask: is the net force zero?", "Total in one direction must equal the total in the opposite direction.", "Example: a 20 N picture hung by two equal vertical strings has 10 N in each. Now do yours."], [
      ["A 50 N lamp hangs at rest from one cord. The tension is...", "50 N", "25 N", "100 N"],
      ["A 60 N sign hangs from two equal vertical cords. Each carries...", "30 N", "60 N", "120 N"],
      ["A box slides at a constant velocity. The net force on it is...", "Zero", "Equal to the friction", "Equal to its weight"],
      ["A book rests on a table. The table pushes up with 8 N, so the book's weight is...", "8 N", "0 N", "16 N"],
      ["A 12 N pull to the right and a 12 N pull to the left act on a cart at rest. It...", "Stays at rest", "Accelerates right", "Accelerates left"],
      ["Two people each pull a rope with 100 N in opposite directions. The tension in the rope is...", "100 N", "200 N", "0 N"],
      ["10 N acts east, and 6 N and 4 N act west on an object. It is...", "In equilibrium", "Accelerating east", "Accelerating west"],
      ["Three balanced forces drawn tip to tail make a...", "Closed triangle", "Single long line", "Gap"]
    ]),
    num("Hanging weight pulls a cart", [
      ["Set-up", "🛒", "A cart on a smooth table is pulled by a string over a pulley to a hanging mass. The hanging mass's <b>weight is the driving force</b>."],
      ["Whole system", "➕", "Both masses move together: <b>a = m_hang × g ÷ (m_cart + m_hang)</b>. The tension is less than the hanging weight."],
      ["Example", "🧮", "Cart 3 kg, hanging 2 kg: a = 20 ÷ 5 = 4 m/s². Tension = cart mass × a = 3 × 4 = 12 N."]
    ], () => {
      const combos = [];
      for (let mc = 1; mc <= 9; mc++) for (let mh = 1; mh <= 9; mh++) if ((100 * mh) % (mc + mh) === 0) combos.push([mc, mh]);
      const ints = combos.filter(([mc, mh]) => (10 * mh) % (mc + mh) === 0);
      const [mc, mh] = pick(combos), [ic, ih] = pick(ints), A = (m1, m2) => r2(10 * m2 / (m1 + m2));
      return pick([
        Q(`A ${mc} kg cart on a smooth table is tied to a hanging ${mh} kg mass over a pulley. What is the acceleration in m/s²? (g = 10)`, "🛒", A(mc, mh),
          ["The hanging weight drives both masses.", "a = (hanging mass × 10) ÷ (cart mass + hanging mass).", "Example: cart 4 kg, hanging 1 kg: a = 10 ÷ 5 = 2 m/s². Now do yours."]),
        Q(`A ${ic} kg cart on a smooth table is tied to a hanging ${ih} kg mass over a pulley. What is the tension in the string in N? (g = 10)`, "🪢", ic * A(ic, ih),
          ["First find the acceleration of the system.", "The string only accelerates the cart: T = cart mass × a.", "Example: a 4 kg cart at 2 m/s² needs T = 8 N. Now do yours."]),
        Q(`What is the weight of a hanging ${mh} kg mass that pulls a cart along a smooth table, in N? (g = 10)`, "⚖️", mh * 10,
          ["Weight is the force of gravity.", "Weight = mass × 10.", "Example: a 3 kg mass weighs 30 N. Now do yours."])
      ]);
    }),
    num("Centripetal acceleration", [
      ["Always turning", "🎠", "Moving in a circle means the direction keeps changing, so there is always an acceleration <b>towards the centre</b>: <b>a = v² ÷ r</b>."],
      ["Force needed", "🪨", "The force towards the centre is <b>F = m v² ÷ r</b>. Faster or tighter circles need more force."],
      ["Example", "🧮", "A car goes round a 20 m radius bend at 10 m/s: a = 100 ÷ 20 = 5 m/s²."]
    ], () => tryGen(() => {
      const v = ri(2, 20), r = pick([2, 4, 5, 10, 20, 25, 50]);
      if ((v * v * 10) % r !== 0) return null;
      const ac = r2(v * v / r), m = pick([2, 4, 5, 10]);
      return pick([
        Q(`A cyclist goes round a bend of radius ${r} m at ${v} m/s. What is the centripetal acceleration in m/s²?`, "🚴", ac,
          ["Use the speed squared.", "a = v² ÷ r.", "Example: 6 m/s on a 9 m bend gives 36 ÷ 9 = 4 m/s². Now do yours."]),
        Q(`A ${m} kg stone is whirled on a string in a circle of radius ${r} m at ${v} m/s. How big is the force from the string in N?`, "🪨", r2(m * ac),
          ["The string provides the force towards the centre.", "F = m v² ÷ r.", "Example: 2 kg at 4 m/s on a 2 m circle: F = 2 × 16 ÷ 2 = 16 N. Now do yours."]),
        Q(`An object on a circle of radius ${r} m has a centripetal acceleration of ${ac} m/s². How fast is it going in m/s?`, "🎡", v,
          ["Rearrange a = v² ÷ r.", "v² = a × r, then take the square root.", "Example: a = 4 and r = 25 gives v² = 100, so v = 10 m/s. Now do yours."])
      ]);
    })),
    les("What provides the pull to the centre?", [
      ["Not a new force", "🎯", "<b>Centripetal force</b> is not a special force. It is just the name for whichever real force points towards the centre of the circle."],
      ["Examples", "🌙 🚗", "Planet orbit: <b>gravity</b>. Car on a bend: <b>friction</b> of the tyres. Stone on a string: <b>tension</b>."],
      ["Bigger needs", "⚡", "F = mv²/r. Doubling the speed needs <b>four times</b> the force. Doubling the radius <b>halves</b> it. If the force vanishes, the object flies off in a straight line."]
    ], ["Ask which real force points towards the centre.", "If the force stops, the object moves along a straight tangent.", "Example: the Moon circles Earth because of gravity. Now do yours."], [
      ["A car turns on a flat road. The force that turns it is...", "Friction between tyres and road", "Engine thrust", "Air resistance"],
      ["A stone is whirled on a string. The centripetal force is the...", "Tension in the string", "Weight of the stone", "Air resistance"],
      ["What keeps the Moon in orbit around the Earth?", "Gravity", "Friction", "Magnetism"],
      ["A whirled stone's string snaps. The stone moves...", "In a straight line along the tangent", "Straight towards the centre", "Outwards along the radius"],
      ["The speed in a circle doubles with the same radius. The force needed becomes...", "4 times as big", "2 times as big", "The same"],
      ["The same speed, but the circle's radius doubles. The force needed becomes...", "Half as big", "Twice as big", "The same"],
      ["Clothes in a spinning washing machine drum are pushed inwards by...", "The wall of the drum", "Gravity", "Friction with the air"],
      ["In a circle at steady speed, the acceleration points...", "Towards the centre", "Along the direction of motion", "Away from the centre"]
    ]),
    num("Stopping a slide with friction", [
      ["Energy and friction", "🛹", "Friction does work to remove the kinetic energy: <b>μmg × d = ½mv²</b>. The mass cancels, leaving <b>d = v² ÷ (2μg)</b>."],
      ["Use it", "📏", "With g = 10: <b>d = v² ÷ (20 μ)</b>. Double the speed and the stopping distance grows 4 times."],
      ["Example", "🧮", "v = 10 m/s and μ = 0.5: d = 100 ÷ (20 × 0.5) = 100 ÷ 10 = 10 m."]
    ], () => {
      const combos = [];
      for (const mu of [0.2, 0.25, 0.4, 0.5]) for (let v = 2; v <= 30; v++) { const d = v * v / (20 * mu); if (Number.isInteger(d)) combos.push([mu, v, d]); }
      const [mu, v, d] = pick(combos);
      return pick([
        Q(`A box slides at ${v} m/s onto a rough floor with μ = ${mu} and slows to a stop. How far does it slide in metres? (g = 10)`, "📦", d,
          ["Friction must remove all the kinetic energy.", "d = v² ÷ (20 × μ).", "Example: 8 m/s with μ = 0.4 gives 64 ÷ 8 = 8 m. Now do yours."]),
        Q(`A puck slides ${d} m before stopping on a surface with μ = ${mu}. How fast was it going at the start, in m/s? (g = 10)`, "🏒", v,
          ["Work backwards from d = v² ÷ (20 μ).", "v² = 20 × μ × d, then take the square root.", "Example: μ = 0.5 and d = 40 m gives v² = 400, so v = 20 m/s. Now do yours."]),
        Q(`A car skids to a stop in ${d} m on a road with μ = ${mu}. What was its speed in m/s? (g = 10)`, "🚗", v,
          ["Friction does the work of stopping the car.", "v² = 20 × μ × d.", "Example: μ = 0.5 and d = 10 m gives v² = 100, so v = 10 m/s. Now do yours."])
      ]);
    }),
    num("Energy stored in a spring", [
      ["Spring energy", "🌀", "A stretched or squashed spring stores <b>elastic energy</b>: <b>E = ½kx²</b>, where k is the spring constant in N/m and x is the stretch in <b>metres</b>."],
      ["Let it go", "🚀", "Released, the stored energy becomes kinetic: <b>½kx² = ½mv²</b>."],
      ["Example", "🧮", "k = 200 N/m, x = 0.1 m: E = ½ × 200 × 0.01 = 1 J."]
    ], () => {
      const k = pick([50, 100, 200, 400, 800]), xcm = pick([2, 4, 5, 10, 20]), x = xcm / 100;
      const sq = pick([[100, 1], [400, 1], [100, 4], [400, 4], [900, 4], [100, 16]]), x2 = pick([0.05, 0.1, 0.2, 0.3]);
      return pick([
        Q(`A spring with k = ${k} N/m is compressed by ${xcm} cm. How much energy is stored, in joules?`, "🌀", r2(0.5 * k * x * x),
          ["Convert the centimetres to metres first.", "E = ½ × k × x².", "Example: k = 100 and x = 0.2 m gives ½ × 100 × 0.04 = 2 J. Now do yours."]),
        Q(`A spring with k = ${sq[0]} N/m is compressed by ${x2} m and fires a ${sq[1]} kg ball. What is the ball's speed in m/s? (All the spring energy becomes kinetic.)`, "🎯", r2(x2 * Math.sqrt(sq[0] / sq[1])),
          ["Set the spring energy equal to the kinetic energy.", "v = x × √(k ÷ m).", "Example: k = 100, m = 1 kg, x = 0.5 m gives v = 0.5 × 10 = 5 m/s. Now do yours."]),
        Q(`A spring stores ${r2(0.5 * k * x * x)} J when compressed by ${xcm} cm. What is its spring constant k in N/m?`, "🔧", k,
          ["Rearrange E = ½kx².", "k = 2E ÷ x², with x in metres.", "Example: 4 J at x = 0.2 m gives k = 8 ÷ 0.04 = 200 N/m. Now do yours."])
      ]);
    }),
    num("Speed from height", [
      ["Trade height for speed", "🎢", "On a smooth slope or in free fall, lost height energy becomes motion: <b>mgh = ½mv²</b>. So <b>v = √(2gh)</b>, or <b>v² = 20h</b>."],
      ["Mass does not matter", "⚖️", "Heavy and light objects reach the same speed. The shape of the track does not matter either, only the height."],
      ["Example", "🧮", "Down a 5 m slope: v² = 20 × 5 = 100, so v = 10 m/s."]
    ], () => {
      const v = pick([2, 4, 6, 8, 10, 12, 14, 20, 30]);
      return pick([
        Q(`A skateboarder rolls from rest down a smooth ramp that drops ${r2(v * v / 20)} m. How fast is she going at the bottom, in m/s? (g = 10)`, "🛹", v,
          ["Height energy turns into motion.", "v² = 20 × h, then take the square root.", "Example: a 20 m drop gives v² = 400 and v = 20 m/s. Now do yours."]),
        Q(`A ball is thrown straight up at ${v} m/s. How high does it rise above the launch point, in metres? (g = 10)`, "🎾", r2(v * v / 20),
          ["All kinetic energy becomes height energy at the top.", "h = v² ÷ 20.", "Example: launched at 10 m/s the ball rises 100 ÷ 20 = 5 m. Now do yours."]),
        Q(`A roller-coaster car at rest drops through ${r2(v * v / 20)} m. What is its speed, ignoring friction, in m/s?`, "🎢", v,
          ["The mass is not needed.", "v = √(20 × h).", "Example: a 5 m drop gives v² = 100, so v = 10 m/s. Now do yours."])
      ]);
    }),
    num("Power, force and speed", [
      ["Power of a mover", "🚗", "Power is work done per second. For something moving at steady speed: <b>P = F × v</b>."],
      ["Rearranged", "🔁", "<b>F = P ÷ v</b> and <b>v = P ÷ F</b>. A fixed power engine gives a bigger force at a lower speed, which is why you use low gear on hills."],
      ["Example", "🧮", "A force of 500 N at 20 m/s: P = 500 × 20 = 10 000 W = 10 kW."]
    ], () => {
      const F = pick([200, 400, 500, 800, 1000, 2000]), v = pick([5, 10, 15, 20, 25, 30]);
      return pick([
        Q(`A car engine drives with a steady force of ${F} N at ${v} m/s. What power is this in watts?`, "🚗", F * v,
          ["Power links force and speed.", "P = F × v.", "Example: 300 N at 12 m/s gives 3600 W. Now do yours."]),
        Q(`A machine delivers ${F * v} W of power at a steady speed of ${v} m/s. What is the driving force in N?`, "🏗️", F,
          ["Rearrange P = Fv.", "F = P ÷ v.", "Example: 6000 W at 10 m/s gives F = 600 N. Now do yours."]),
        Q(`A boat engine gives a force of ${F} N using ${F * v / 1000} kW. How fast does the boat move in m/s?`, "🚤", v,
          ["Convert kilowatts to watts first.", "v = P ÷ F.", "Example: 4 kW and 800 N gives 4000 ÷ 800 = 5 m/s. Now do yours."])
      ]);
    }),
    num("Reaction time and distance", [
      ["The ruler drop", "📏", "Hold a ruler for a friend to catch. The distance it falls before they catch it gives their reaction time: <b>d = 5t²</b> (metres, seconds)."],
      ["Typical numbers", "⏱️", "A catch after 20 cm means t = 0.2 s. Humans typically react in 0.2 to 0.3 s."],
      ["Reaction distance", "🚗", "A car keeps moving while a driver reacts: <b>distance = speed × reaction time</b>."]
    ], () => {
      const t = pick([0.1, 0.2, 0.3, 0.4]), v = pick([10, 15, 20, 25, 30]), rt = pick([0.5, 0.6, 0.8, 1.0, 1.5]);
      return pick([
        Q(`A friend catches a falling ruler after ${t} s. How far did the ruler fall, in centimetres? (d = 5t² metres)`, "📏", r2(500 * t * t),
          ["Use d = 5t² for the distance in metres.", "Then multiply by 100 to get centimetres.", "Example: t = 0.1 s gives 5 × 0.01 = 0.05 m = 5 cm. Now do yours."]),
        Q(`A ruler falls ${r2(500 * t * t)} cm before it is caught. What is the reaction time in seconds? (d = 5t²)`, "⏱️", t,
          ["Change centimetres to metres first.", "t = √(d ÷ 5).", "Example: 45 cm = 0.45 m, then t² = 0.09 and t = 0.3 s. Now do yours."]),
        Q(`A car travels at ${v} m/s. The driver's reaction time is ${rt} s. How far does the car go before the driver starts braking, in metres?`, "🚦", r2(v * rt),
          ["Constant speed while reacting.", "Distance = speed × reaction time.", "Example: 20 m/s for 0.5 s is 10 m. Now do yours."])
      ]);
    })
  ];
  a.push(
    mix("Mixed practice", at(a, [0, 1, 3, 5, 6, 7, 10, 11, 13, 15])),
    mix("Level 19 Challenge", at(a, [2, 4, 6, 8, 9, 12, 13, 14, 16, 17]))
  );

  // ================= LEVEL 20 =================
  const b = [
    num("Recoil", [
      ["Starting from rest", "🔫", "Before a gun fires, total momentum is zero. After, the bullet goes forward and the gun goes <b>backward</b> so the total is still zero."],
      ["The rule", "⚖️", "<b>m₁v₁ = m₂v₂</b> (in opposite directions). A heavy gun recoils slowly; a light bullet moves fast."],
      ["Example", "🧮", "A 0.02 kg bullet leaves at 300 m/s. Momentum = 6 kg m/s. A 3 kg gun recoils at 6 ÷ 3 = 2 m/s."]
    ], () => {
      const combos = [];
      for (const m1 of [0.05, 0.1, 0.2, 0.5, 1, 2, 4, 5, 10]) for (const v1 of [10, 20, 30, 40, 50, 100, 200, 400]) for (const M of [1, 2, 4, 5, 10, 20, 25, 40, 50, 100]) {
        const vr = m1 * v1 / M; if (vr >= 0.5 && Math.abs(vr * 10 - Math.round(vr * 10)) < 1e-9 && M > m1 * 2) combos.push([m1, v1, M, r2(vr)]);
      }
      const [m1, v1, M, vr] = pick(combos);
      return pick([
        Q(`A ${m1} kg shell leaves a ${M} kg cannon at ${v1} m/s. At what speed does the cannon recoil, in m/s? (Both start at rest.)`, "💥", vr,
          ["Total momentum stays at zero.", "Cannon mass × recoil speed = shell mass × shell speed.", "Example: a 2 kg shell at 50 m/s from a 100 kg gun gives recoil 100 ÷ 100 = 1 m/s. Now do yours."]),
        Q(`A ${M} kg cannon recoils at ${vr} m/s when it fires a ${m1} kg shell. How fast does the shell leave, in m/s?`, "🚀", v1,
          ["Momentum forward = momentum backward.", "Shell speed = (cannon mass × recoil speed) ÷ shell mass.", "Example: a 50 kg gun recoiling at 2 m/s fires a 1 kg shell at 100 m/s. Now do yours."]),
        Q(`A ${M} kg rifle fires a ${m1} kg bullet at ${v1} m/s. At what speed does the rifle kick back, in m/s?`, "🎯", vr,
          ["Rifle and bullet start at rest, so total momentum is zero.", "Rifle momentum backwards = bullet momentum forwards.", "Example: a 4 kg rifle and a 0.01 kg bullet at 400 m/s: recoil = 4 ÷ 4 = 1 m/s. Now do yours."])
      ]);
    }),
    les("Elastic and inelastic collisions", [
      ["Always conserved", "🔒", "In any collision with no outside force, <b>momentum is conserved</b>. Kinetic energy might not be."],
      ["Elastic", "🎱", "In an <b>elastic</b> collision, kinetic energy is also conserved. Billiard balls and bouncy balls are nearly elastic."],
      ["Inelastic", "🧱", "In an <b>inelastic</b> collision, some kinetic energy turns into heat, sound and bending. If the objects <b>stick together</b>, the most kinetic energy is lost."]
    ], ["Momentum is always conserved. Ask about kinetic energy.", "Sticking or crumpling loses kinetic energy. Bouncing well keeps it.", "Example: two clay lumps sticking together is inelastic. Now do yours."], [
      ["In an elastic collision, what is conserved?", "Both momentum and kinetic energy", "Only momentum", "Only kinetic energy"],
      ["In any isolated collision, which is always conserved?", "Momentum", "Kinetic energy", "Speed"],
      ["Two clay balls collide and stick together. This collision is...", "Inelastic", "Perfectly elastic", "An explosion"],
      ["Where does the 'lost' kinetic energy go in an inelastic collision?", "Heat, sound and deformation", "It vanishes", "Into extra momentum"],
      ["A ball bounces back to almost the same height. The bounce was close to...", "Elastic", "Perfectly sticky", "A crash with no bounce"],
      ["An equal-mass moving ball hits another at rest in a perfectly elastic head-on collision. Afterwards...", "The first stops and the second moves off", "Both move at half speed", "Both stop"],
      ["Which collision loses the most kinetic energy?", "The objects stick together", "The objects bounce perfectly", "The objects bounce a little"],
      ["A car crash crumples the metal. This is...", "Highly inelastic", "Perfectly elastic", "Energy-creating"]
    ]),
    num("Energy lost in a collision", [
      ["Stick together", "🚃", "A moving cart hits a cart at rest and they stick. Momentum conservation gives the common speed: <b>v' = m₁v ÷ (m₁ + m₂)</b>."],
      ["Compare energy", "🔋", "Kinetic energy before is <b>½m₁v²</b>. Afterwards it is <b>½(m₁ + m₂)v'²</b>. The difference is lost as heat and sound."],
      ["Example", "🧮", "2 kg at 6 m/s hits a 2 kg cart. v' = 12 ÷ 4 = 3 m/s. Before: ½ × 2 × 36 = 36 J. After: ½ × 4 × 9 = 18 J. So 18 J are lost."]
    ], () => {
      const c = [];
      for (const m1 of [1, 2, 3, 4, 5]) for (const m2 of [1, 2, 3, 4, 5, 6]) for (const v of [2, 4, 6, 8, 10]) {
        const vp = m1 * v / (m1 + m2), kb = 0.5 * m1 * v * v, ka = 0.5 * (m1 + m2) * vp * vp;
        if (Number.isInteger(vp) && Number.isInteger(kb) && Number.isInteger(ka)) c.push([m1, m2, v, vp, kb, ka]);
      }
      const [m1, m2, v, vp, kb, ka] = pick(c);
      return pick([
        Q(`A ${m1} kg trolley moving at ${v} m/s hits a ${m2} kg trolley at rest and they stick together. What is their speed afterwards, in m/s?`, "🚃", vp,
          ["Momentum is conserved.", "Common speed = (m₁ × v) ÷ (m₁ + m₂).", "Example: 3 kg at 8 m/s hits 1 kg at rest, sticking: 24 ÷ 4 = 6 m/s. Now do yours."]),
        Q(`A ${m1} kg trolley at ${v} m/s hits a ${m2} kg trolley at rest and they stick. How much kinetic energy is lost, in joules?`, "💢", kb - ka,
          ["Find the energy before and the energy after.", "Lost = ½m₁v² − ½(m₁ + m₂)v'², where v' = m₁v ÷ (m₁ + m₂).", "Example: 1 kg at 4 m/s hits 1 kg: before 8 J, v' = 2, after 4 J, lost 4 J. Now do yours."]),
        Q(`A ${m1} kg trolley at ${v} m/s sticks to a ${m2} kg trolley at rest. What is their combined kinetic energy afterwards, in joules?`, "🔋", ka,
          ["Find the speed after the collision first.", "KE = ½ × total mass × v'².", "Example: 2 kg + 2 kg moving at 3 m/s: KE = ½ × 4 × 9 = 18 J. Now do yours."])
      ]);
    }),
    num("Force in a collision", [
      ["Impulse again, with numbers", "🚗", "A force acting for a time changes momentum: <b>F × t = m × Δv</b>. So <b>F = m Δv ÷ t</b>."],
      ["Longer time, smaller force", "🛡️", "Airbags and crumple zones make the stopping time longer. The same change in momentum then needs a much smaller force."],
      ["Example", "🧮", "A 0.4 kg ball stopped from 15 m/s in 0.03 s: F = 0.4 × 15 ÷ 0.03 = 200 N."]
    ], () => {
      const c = [[0.5, 20, 0.01], [0.2, 10, 0.02], [0.4, 25, 0.05], [60, 10, 0.5], [70, 12, 0.6], [1000, 20, 0.5], [1200, 15, 0.3], [1000, 10, 0.25], [0.15, 40, 0.03], [0.1, 30, 0.015]];
      const [m, dv, t] = pick(c.filter(x => Number.isInteger(r2(x[0] * x[1] / x[2]))));
      const F = r2(m * dv / t);
      return pick([
        Q(`A ${m} kg object changes speed by ${dv} m/s in ${t} s. What average force acts on it, in newtons?`, "💥", F,
          ["Force changes momentum.", "F = m × Δv ÷ t.", "Example: 2 kg changing speed by 10 m/s in 0.5 s needs F = 20 ÷ 0.5 = 40 N. Now do yours."]),
        Q(`An average force of ${F} N acts on a ${m} kg object for ${t} s. By how much does its speed change, in m/s?`, "📈", dv,
          ["Impulse = force × time.", "Δv = F × t ÷ m.", "Example: 50 N for 0.2 s on 2 kg: Δv = 10 ÷ 2 = 5 m/s. Now do yours."]),
        Q(`A ${m} kg object is stopped from ${dv} m/s by a force of ${F} N. How long does the stop take, in seconds?`, "⏱️", t,
          ["Momentum lost = force × time.", "t = m × Δv ÷ F.", "Example: 2 kg stopped from 10 m/s by 100 N takes 20 ÷ 100 = 0.2 s. Now do yours."])
      ]);
    }),
    num("Head-on collisions", [
      ["Direction matters", "↔️", "Pick a positive direction. Momentum in the other direction is <b>negative</b>. Total momentum before = total momentum after."],
      ["Stick together", "🧲", "For objects that stick: <b>v' = (m₁v₁ − m₂v₂) ÷ (m₁ + m₂)</b> when they move towards each other. Ignore the sign if you only want the speed."],
      ["Example", "🧮", "3 kg at 4 m/s meets 1 kg at 4 m/s head on, sticking: (12 − 4) ÷ 4 = 2 m/s in the 3 kg cart's direction."]
    ], () => {
      const c = [];
      for (const m1 of [1, 2, 3, 4, 5]) for (const m2 of [1, 2, 3, 4, 5]) for (const v1 of [2, 3, 4, 5, 6, 8]) for (const v2 of [1, 2, 3, 4, 5, 6]) {
        const p = m1 * v1 - m2 * v2; if (p > 0 && p % (m1 + m2) === 0) c.push([m1, v1, m2, v2, p / (m1 + m2)]);
      }
      const [m1, v1, m2, v2, vp] = pick(c);
      return pick([
        Q(`A ${m1} kg cart moving right at ${v1} m/s hits a ${m2} kg cart moving left at ${v2} m/s. They stick together. What is their speed afterwards, in m/s?`, "↔️", vp,
          ["Call right positive, so the left-moving cart has negative momentum.", "Total momentum = m₁v₁ − m₂v₂, then divide by the total mass.", "Example: 2 kg at 5 m/s right meets 1 kg at 4 m/s left: (10 − 4) ÷ 3 = 2 m/s. Now do yours."]),
        Q(`Before a collision, a ${m1} kg cart moves right at ${v1} m/s and a ${m2} kg cart moves left at ${v2} m/s. What is the size of the total momentum in kg m/s?`, "⚖️", m1 * v1 - m2 * v2,
          ["Opposite directions partly cancel.", "Subtract the smaller momentum from the larger.", "Example: 4 kg at 3 m/s right and 2 kg at 2 m/s left: 12 − 4 = 8 kg m/s. Now do yours."])
      ]);
    }),
    num("Two resistors in parallel", [
      ["Easier path", "🔀", "Adding a second branch gives current another route, so the total resistance goes <b>down</b>. It is always smaller than the smallest branch."],
      ["Formula", "➗", "For two resistors: <b>R = (R₁ × R₂) ÷ (R₁ + R₂)</b> (product over sum)."],
      ["Example", "🧮", "6 Ω and 3 Ω in parallel: (6 × 3) ÷ (6 + 3) = 18 ÷ 9 = 2 Ω."]
    ], () => {
      const p = [[6, 3], [12, 4], [20, 5], [30, 20], [60, 40], [10, 10], [12, 6], [15, 10], [40, 10], [30, 15], [20, 20], [60, 20], [24, 8], [30, 6], [100, 100], [50, 50], [12, 12], [18, 9]];
      const [x, y] = pick(p), R = x * y / (x + y);
      const qs = [
        Q(`Two resistors of ${x} Ω and ${y} Ω are connected in parallel. What is the combined resistance in ohms?`, "🔀", R,
          ["Parallel resistors give a smaller total.", "Multiply the two values and divide by their sum.", "Example: 8 Ω and 8 Ω give 64 ÷ 16 = 4 Ω. Now do yours."]),
        Q(`Two equal resistors of ${x} Ω are connected in parallel. What is the combined resistance in ohms?`, "🔀", x / 2,
          ["Two identical branches share the current equally.", "Equal resistors in parallel: divide one resistance by 2.", "Example: two 10 Ω resistors give 5 Ω. Now do yours."])
      ];
      if ((12 * (x + y)) % (x * y) === 0) qs.push(Q(`A ${x} Ω resistor is joined in parallel to a ${y} Ω resistor, and a 12 V battery is attached. What is the total current in amps? (Use the combined resistance.)`, "🔋", 12 * (x + y) / (x * y),
          ["Find the combined resistance first.", "Current = voltage ÷ combined resistance.", "Example: 3 Ω combined with 6 V gives 2 A. Now do yours."]));
      return pick(qs);
    }),
    num("Series and parallel together", [
      ["Break it into parts", "🧩", "Work in steps. First replace the <b>parallel pair</b> with its single equivalent resistance. Then <b>add</b> it to the resistor in series."],
      ["Then use Ohm's law", "⚡", "Total resistance gives the battery current: <b>I = V ÷ R_total</b>. The current splits at the parallel part."],
      ["Example", "🧮", "4 Ω in series with (6 Ω ∥ 3 Ω): the pair gives 2 Ω, so R_total = 6 Ω. With 12 V: I = 2 A."]
    ], () => {
      const pairs = [[6, 3, 2], [12, 4, 3], [20, 5, 4], [30, 20, 12], [10, 10, 5], [12, 6, 4], [15, 10, 6], [40, 10, 8], [30, 15, 10], [60, 20, 15], [24, 8, 6]];
      const [x, y, rp] = pick(pairs), r0 = pick([2, 4, 5, 6, 8, 10, 12]), rt = r0 + rp, V = pick([6, 12, 18, 24, 30, 36, 48, 60]);
      const qs = [
        Q(`A ${r0} Ω resistor is in series with a parallel pair of ${x} Ω and ${y} Ω. What is the total resistance in ohms?`, "🧩", rt,
          ["Do the parallel pair first.", "Pair = product ÷ sum. Then add the series resistor.", "Example: 3 Ω in series with (6 Ω ∥ 12 Ω): pair = 4 Ω, total 7 Ω. Now do yours."]),
        Q(`A parallel pair of ${x} Ω and ${y} Ω is connected in series with a ${r0} Ω resistor. How much resistance does the parallel pair add to the circuit, in ohms?`, "🔗", rp,
          ["Only the pair is asked for.", "Product over sum for the two.", "Example: 6 Ω and 12 Ω in parallel give 72 ÷ 18 = 4 Ω. Now do yours."])
      ];
      if (V % rt === 0) qs.push(Q(`A ${V} V battery is connected to a ${r0} Ω resistor in series with a parallel pair of ${x} Ω and ${y} Ω. What current flows from the battery, in amps?`, "🔋", V / rt,
        ["Find the total resistance first.", "I = V ÷ R_total.", "Example: 24 V and a total of 8 Ω gives 3 A. Now do yours."]));
      return pick(qs);
    }),
    num("Branch currents", [
      ["Same voltage", "🔋", "Every branch in a parallel circuit has the <b>same voltage</b> as the battery. So each branch current is <b>I = V ÷ R</b>."],
      ["Add them", "➕", "The currents in the branches <b>add up</b> to the total current from the battery."],
      ["Example", "🧮", "A 12 V battery across 4 Ω and 6 Ω: branches carry 3 A and 2 A, so the battery supplies 5 A."]
    ], () => {
      const V = pick([6, 12, 24, 30, 60]), ds = [1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30].filter(d => V % d === 0);
      const R1 = pick(ds), R2 = pick(ds), I1 = V / R1, I2 = V / R2;
      return pick([
        Q(`A ${V} V battery is connected across a ${R1} Ω resistor and a ${R2} Ω resistor in parallel. What total current does the battery supply, in amps?`, "🔋", I1 + I2,
          ["Each branch gets the full battery voltage.", "Work out each branch current as V ÷ R, then add them.", "Example: 12 V across 3 Ω and 12 Ω: 4 A + 1 A = 5 A. Now do yours."]),
        Q(`A ${V} V battery is connected across a ${R1} Ω resistor and a ${R2} Ω resistor in parallel. What current flows through the ${R2} Ω resistor, in amps?`, "💡", I2,
          ["Voltage across a parallel branch equals the battery voltage.", "I = V ÷ R for that branch only.", "Example: 12 V across 6 Ω gives 2 A. Now do yours."]),
        Q(`A ${V} V battery supplies ${I1 + I2} A to two parallel branches. One branch is a ${R1} Ω resistor. How much current flows in the other branch, in amps?`, "🔀", I2,
          ["The branch currents add to the total.", "Find the current in the known branch (V ÷ R) and subtract.", "Example: total 5 A, one branch 3 A, so the other has 2 A. Now do yours."])
      ]);
    }),
    num("Cells with internal resistance", [
      ["Cells are not perfect", "🔋", "A real cell has some <b>internal resistance r</b>. The total resistance in the circuit is R + r."],
      ["Lost volts", "📉", "<b>I = emf ÷ (R + r)</b>. The voltage 'lost' inside the cell is <b>I × r</b>, so the terminal voltage is <b>V = emf − Ir</b>."],
      ["Example", "🧮", "emf 12 V, r = 1 Ω, R = 5 Ω: I = 12 ÷ 6 = 2 A. Lost volts = 2 V. Terminal voltage = 10 V."]
    ], () => {
      const I = pick([1, 2, 3, 4]), r = pick([1, 2, 0.5]), R = pick([3, 4, 5, 6, 8, 10]), e = I * (R + r);
      return pick([
        Q(`A cell with an emf of ${e} V and internal resistance ${r} Ω is connected to a ${R} Ω resistor. What current flows, in amps?`, "🔋", I,
          ["Add the resistor and the internal resistance.", "I = emf ÷ (R + r).", "Example: emf 10 V, R = 4 Ω, r = 1 Ω gives 10 ÷ 5 = 2 A. Now do yours."]),
        Q(`A cell with emf ${e} V and internal resistance ${r} Ω drives ${I} A round a circuit. How many volts are lost inside the cell?`, "📉", r2(I * r),
          ["Lost volts come from the cell's own resistance.", "Lost volts = I × r.", "Example: 3 A through r = 0.5 Ω loses 1.5 V. Now do yours."]),
        Q(`A cell with emf ${e} V and internal resistance ${r} Ω is connected to a ${R} Ω resistor. What is the voltage across the resistor in volts?`, "🔌", I * R,
          ["Find the current first.", "Voltage across the resistor = I × R (or emf minus lost volts).", "Example: I = 2 A through R = 4 Ω gives 8 V. Now do yours."])
      ]);
    }),
    num("Changing a wire", [
      ["Length and thickness", "🧵", "Resistance depends on the wire: <b>R ∝ L ÷ A</b>. A longer wire has more resistance. A thicker wire (bigger area) has less."],
      ["Area from width", "⭕", "The cross-section area depends on the width <b>squared</b>. Doubling the diameter makes the area <b>4 times</b> bigger."],
      ["Example", "🧮", "A wire has 4 Ω. Make it twice as long: 8 Ω. Make it twice as long with double the diameter: 8 ÷ 4 = 2 Ω."]
    ], () => tryGen(() => {
      const R0 = pick([2, 3, 4, 6, 8, 9, 12, 18, 24]), Lf = pick([2, 3, 4]), Df = pick([1, 2, 3]);
      const R = R0 * Lf / (Df * Df);
      if (!Number.isInteger(R) || R === R0) return null;
      return pick([
        Q(`A wire has a resistance of ${R0} Ω. A wire of the same material is ${Lf} times as long and has ${Df === 1 ? "the same thickness" : Df + " times the diameter"}. What is its resistance in ohms?`, "🧵", R,
          ["Length multiplies the resistance. Area divides it.", "Area changes by (diameter factor)². New R = R × length factor ÷ area factor.", "Example: 6 Ω wire, twice the length, twice the diameter: 6 × 2 ÷ 4 = 3 Ω. Now do yours."])
      ]);
    })),
    num("Mixing liquids", [
      ["Heat given = heat taken", "🥛", "When two amounts of the same liquid mix, the hot one loses as much heat as the cold one gains. The mixture ends at one temperature in between."],
      ["Weighted average", "⚖️", "<b>T = (m₁T₁ + m₂T₂) ÷ (m₁ + m₂)</b>. The bigger mass pulls the answer closer to its own temperature."],
      ["Example", "🧮", "1 kg at 80 °C and 3 kg at 20 °C: (80 + 60) ÷ 4 = 35 °C."]
    ], () => tryGen(() => {
      const m1 = ri(1, 6), m2 = ri(1, 6), T1 = pick([10, 20, 30, 40, 60, 70, 80, 90, 100]), T2 = pick([5, 10, 15, 20, 25, 30, 40, 50]);
      if (T1 <= T2) return null;
      const T = (m1 * T1 + m2 * T2) / (m1 + m2);
      if (!Number.isInteger(T)) return null;
      return pick([
        Q(`${m1} kg of water at ${T1} °C is mixed with ${m2} kg of water at ${T2} °C, with no heat lost. What is the final temperature in °C?`, "🥛", T,
          ["The final temperature is between the two starting ones.", "T = (m₁T₁ + m₂T₂) ÷ (m₁ + m₂).", "Example: 2 kg at 50 °C with 2 kg at 10 °C gives (100 + 20) ÷ 4 = 30 °C. Now do yours."]),
        Q(`${m1} kg of hot tea at ${T1} °C is poured into ${m2} kg of cold water at ${T2} °C. Assume both are the same liquid. What temperature does the mix reach, in °C?`, "☕", T,
          ["Hot and cold end at the same temperature.", "Multiply each mass by its temperature, add, then divide by the total mass.", "Example: 3 kg at 40 °C and 1 kg at 20 °C: (120 + 20) ÷ 4 = 35 °C. Now do yours."])
      ]);
    })),
    num("Thermal expansion", [
      ["Warm things grow", "🌡️", "Most solids <b>expand</b> when heated. Railway tracks and bridges have gaps so they do not buckle in hot weather."],
      ["The size of the growth", "📏", "<b>ΔL = α × L × ΔT</b>, where α is the expansion coefficient. For steel α ≈ 0.000012 per °C (12 millionths)."],
      ["Example", "🧮", "A 10 m steel rail warms by 40 °C: ΔL = 0.000012 × 10 × 40 = 0.0048 m = 4.8 mm."]
    ], () => {
      const L = pick([5, 10, 15, 25, 50]), dT = pick([10, 20, 30, 40, 50, 100]), x = r2(0.012 * L * dT);
      return pick([
        Q(`A steel beam is ${L} m long. It warms by ${dT} °C. Take α = 0.000012 per °C. How much longer does it get, in millimetres?`, "🌉", x,
          ["Multiply three things: α, the length and the temperature rise.", "In metres ΔL = 0.000012 × L × ΔT. Then × 1000 for millimetres (or use 0.012 × L × ΔT directly).", "Example: 20 m rail warming by 25 °C: 0.012 × 20 × 25 = 6 mm. Now do yours."]),
        Q(`A steel rail grows by ${x} mm when warmed by ${dT} °C. Take α = 0.000012 per °C. How long is the rail in metres?`, "🚂", L,
          ["Rearrange ΔL = αLΔT.", "L = ΔL (in mm) ÷ (0.012 × ΔT).", "Example: 6 mm with ΔT = 25 °C gives L = 6 ÷ (0.012 × 25) = 20 m. Now do yours."])
      ]);
    }),
    num("Boyle's law", [
      ["Squeeze a gas", "💨", "At a constant temperature, squeezing a gas into a smaller volume makes its pressure go <b>up</b>."],
      ["The law", "🔁", "<b>P₁V₁ = P₂V₂</b>. Half the volume means double the pressure."],
      ["Example", "🧮", "A syringe of air at 100 kPa and 6 mL is pushed to 2 mL: P₂ = 100 × 6 ÷ 2 = 300 kPa."]
    ], () => tryGen(() => {
      const P1 = pick([100, 120, 150, 200, 300]), V1 = pick([2, 3, 4, 5, 6, 8, 10, 12, 20]), P2 = pick([100, 150, 200, 240, 300, 400, 600, 800]);
      const V2 = P1 * V1 / P2;
      if (!Number.isInteger(V2) || V2 === V1) return null;
      return pick([
        Q(`A gas at ${P1} kPa has a volume of ${V1} litres. Its pressure is changed to ${P2} kPa at a constant temperature. What is the new volume in litres?`, "💨", V2,
          ["Pressure times volume stays constant.", "V₂ = P₁V₁ ÷ P₂.", "Example: 200 kPa and 6 L changed to 300 kPa gives 1200 ÷ 300 = 4 L. Now do yours."]),
        Q(`A gas at ${P1} kPa has a volume of ${V1} litres. It is squeezed to ${V2} litres at a constant temperature. What is the new pressure in kPa?`, "🧪", P2,
          ["Smaller volume means higher pressure.", "P₂ = P₁V₁ ÷ V₂.", "Example: 100 kPa and 6 L squeezed to 2 L gives 600 ÷ 2 = 300 kPa. Now do yours."])
      ]);
    })),
    num("Standing waves on a string", [
      ["Fixed ends", "🎸", "A string fixed at both ends can only vibrate in patterns that fit. The simplest has half a wavelength on the string: <b>λ = 2L</b>."],
      ["Fundamental and harmonics", "🎼", "Fundamental frequency <b>f₁ = v ÷ 2L</b>. The <b>nth harmonic</b> has frequency <b>n × f₁</b>."],
      ["Example", "🧮", "v = 200 m/s, L = 0.5 m: f₁ = 200 ÷ 1 = 200 Hz. The 3rd harmonic is 600 Hz."]
    ], () => tryGen(() => {
      const L = pick([0.4, 0.5, 0.8, 1, 1.2, 2]), f1 = pick([50, 100, 110, 125, 200, 220, 250, 400]), v = 2 * L * f1, n = ri(2, 5);
      if (!Number.isInteger(v)) return null;
      return pick([
        Q(`A string ${L} m long, fixed at both ends, carries waves at ${v} m/s. What is its fundamental frequency in Hz?`, "🎸", f1,
          ["The fundamental has half a wavelength on the string.", "f₁ = v ÷ (2L).", "Example: v = 120 m/s, L = 0.6 m: f₁ = 120 ÷ 1.2 = 100 Hz. Now do yours."]),
        Q(`A string has a fundamental frequency of ${f1} Hz. What is the frequency of its harmonic number ${n}, in Hz?`, "🎼", n * f1,
          ["Harmonics are whole-number multiples of the fundamental.", "Frequency = n × f₁.", "Example: fundamental 80 Hz, 4th harmonic = 4 × 80 = 320 Hz. Now do yours."]),
        Q(`A string ${L} m long vibrates in its fundamental at ${f1} Hz. How fast do waves travel along it, in m/s?`, "💨", v,
          ["Wavelength of the fundamental is twice the length.", "v = f × λ = f × 2L.", "Example: f = 100 Hz and L = 0.5 m: λ = 1 m, so v = 100 m/s. Now do yours."]),
        Q(`What is the wavelength of the fundamental on a fixed string that is ${L} m long, in metres?`, "〰️", r2(2 * L),
          ["Half a wavelength fits on the string.", "Wavelength = 2 × length.", "Example: for a 0.7 m string it would be 1.4 m. Now do yours."])
      ]);
    })),
    les("Kirchhoff's rules", [
      ["Junction rule", "🔀", "At a junction, the current flowing <b>in</b> equals the current flowing <b>out</b>. Charge is conserved: it cannot pile up."],
      ["Loop rule", "🔄", "Around any closed loop, the <b>emfs added equal the potential drops added</b>. Energy is conserved: every volt a battery supplies is used up."],
      ["Use them together", "🧠", "In a series loop of a 12 V cell with drops of 5 V and ? V, the last drop is 12 − 5 = 7 V. At a junction with 5 A in and 2 A out on one wire, the other wire takes 3 A."]
    ], ["Currents at a junction must add up. Volts around a loop must add up.", "Total in = total out. Supply volts = sum of drops.", "Example: 6 A splits at a junction into 2 A and the rest, so the rest is 4 A. Now do yours."], [
      ["3 A and 2 A flow into a junction. The total current out is...", "5 A", "1 A", "6 A"],
      ["A current of 6 A splits into two branches. One carries 4 A. The other carries...", "2 A", "10 A", "4 A"],
      ["A 12 V cell drives two resistors in series. One has a 5 V drop. The other has...", "7 V", "17 V", "5 V"],
      ["The junction rule is conservation of...", "Charge", "Energy", "Mass"],
      ["The loop rule is conservation of...", "Energy", "Charge", "Momentum"],
      ["5 A flows into a junction and 2 A leaves along one wire. The other wire carries...", "3 A", "7 A", "2 A"],
      ["Two parallel branches are connected to a 9 V cell. The voltage across each branch is...", "9 V", "4.5 V", "18 V"],
      ["Two 6 V cells in series drive a single lamp. The voltage across the lamp is...", "12 V", "6 V", "0 V"]
    ]),
    les("Total internal reflection", [
      ["Light trapped", "💎", "Light going from a dense material (glass, water) towards a less dense one (air) bends <b>away from the normal</b>."],
      ["The critical angle", "📐", "At the <b>critical angle</b> the refracted ray skims along the surface. At any larger angle, <b>all</b> the light reflects back in: <b>total internal reflection</b>."],
      ["Use", "📡", "Optical fibres and binocular prisms use it. Glass has a critical angle of about 42°, so it works well. Higher refractive index means a <b>smaller</b> critical angle."]
    ], ["Total internal reflection needs the light to start in the denser material.", "Compare the angle of incidence with the critical angle.", "Example: with a critical angle of 42°, a ray hitting at 70° reflects fully. Now do yours."], [
      ["Total internal reflection can only happen when light goes from...", "A denser to a less dense material", "A less dense to a denser material", "Air to air"],
      ["Glass has a critical angle of about 42°. Light hits the glass-air boundary from inside at 60°. It...", "Totally reflects", "Refracts out", "Is absorbed"],
      ["Glass has a critical angle of about 42°. Light hits the glass-air boundary from inside at 30°. It...", "Mostly refracts out into the air", "Totally reflects", "Stops"],
      ["At exactly the critical angle, the refracted ray travels...", "Along the boundary", "Straight through without bending", "Back into the glass"],
      ["Optical fibres carry light because it...", "Reflects totally again and again", "Is absorbed and re-emitted", "Magnifies"],
      ["A material with a higher refractive index has a critical angle that is...", "Smaller", "Larger", "Always 90°"],
      ["A diamond sparkles because its critical angle is...", "Small, so lots of light stays trapped and reflects", "Large, so light easily escapes", "Exactly 90°"],
      ["Water has a critical angle of about 49°. A ray inside the water hits the surface at 40°. It...", "Partly refracts out", "Totally reflects", "Cannot reach the surface"]
    ]),
    num("The lens equation", [
      ["Finding the image", "🔍", "For a thin lens or a curved mirror: <b>1/f = 1/u + 1/v</b>. Here u is the object distance, v the image distance, f the focal length."],
      ["Real images", "🖼️", "If the object is beyond the focal length of a converging lens, the image is <b>real</b> and v comes out positive. At u = 2f the image is also at 2f."],
      ["Example", "🧮", "f = 10 cm, u = 30 cm: 1/v = 1/10 − 1/30 = 2/30, so v = 15 cm."]
    ], () => tryGen(() => {
      const f = pick([5, 10, 12, 15, 20]), u = pick([1.5, 2, 3, 4, 5, 6]) * f;
      if (!Number.isInteger(u)) return null;
      const v = u * f / (u - f);
      if (!Number.isInteger(v)) return null;
      return pick([
        Q(`A converging lens has a focal length of ${f} cm. An object is ${u} cm away. How far from the lens is the image, in cm?`, "🔍", v,
          ["Use 1/f = 1/u + 1/v.", "1/v = 1/f − 1/u, then flip the fraction. Or v = u f ÷ (u − f).", "Example: f = 6 cm and u = 18 cm gives v = 108 ÷ 12 = 9 cm. Now do yours."]),
        Q(`A converging lens makes a real image ${v} cm away from an object that is ${u} cm from the lens. What is the focal length, in cm?`, "🔭", f,
          ["Use 1/f = 1/u + 1/v.", "f = u v ÷ (u + v).", "Example: u = 30 cm and v = 15 cm gives f = 450 ÷ 45 = 10 cm. Now do yours."])
      ]);
    })),
    num("Balancing moments", [
      ["Turning effect", "🔩", "A force turning something about a pivot has a <b>moment</b>: <b>moment = force × distance from the pivot</b>, measured in N m."],
      ["Balance", "⚖️", "A beam balances when <b>clockwise moments = anticlockwise moments</b>."],
      ["Example", "🧮", "A 4 kg child sits 1.5 m from the pivot. A 3 kg child balances at 2 m: 40 × 1.5 = 60 N m and 30 × 2 = 60 N m."]
    ], () => tryGen(() => {
      const m1 = pick([2, 3, 4, 5, 6, 8, 10, 12, 15, 20]), d1 = pick([0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1, 1.2, 1.5, 2]), m2 = pick([2, 3, 4, 5, 6, 8, 10, 12, 15, 20]);
      const d2 = m1 * d1 / m2, F = pick([10, 20, 30, 40, 50, 60, 80, 100]);
      if (m1 === m2 || Math.abs(d2 * 100 - Math.round(d2 * 100)) > 1e-9 || d2 > 3) return null;
      return pick([
        Q(`A ${m1} kg mass sits ${d1} m from the pivot on one side of a see-saw. Where must a ${m2} kg mass sit on the other side to balance it, in metres from the pivot?`, "⚖️", r2(d2),
          ["Weights are proportional to the masses, so use masses directly.", "m₁ × d₁ = m₂ × d₂, so d₂ = m₁ × d₁ ÷ m₂.", "Example: 6 kg at 1 m is balanced by 3 kg at 2 m. Now do yours."]),
        Q(`A ${m1} kg mass sits ${d1} m from the pivot. A second mass sits ${r2(d2)} m on the other side and balances it. What is the second mass in kg?`, "🧸", m2,
          ["Moments must be equal on both sides.", "m₂ = m₁ × d₁ ÷ d₂.", "Example: 4 kg at 1.5 m balanced by something at 2 m: m = 6 ÷ 2 = 3 kg. Now do yours."]),
        Q(`A force of ${F} N pushes on a spanner ${d1} m from the nut. What is the moment about the nut, in N m?`, "🔧", r2(F * d1),
          ["Moment equals force times distance.", "Multiply them together.", "Example: 40 N at 0.5 m is 20 N m. Now do yours."])
      ]);
    }))
  ];
  b.push(
    mix("Mixed practice", at(b, [0, 2, 3, 5, 6, 7, 9, 10, 12, 16])),
    mix("Level 20 Challenge", at(b, [1, 4, 8, 11, 13, 14, 15, 16, 17]))
  );

  // ================= LEVEL 21 =================
  const c = [
    num("Coulomb's law", [
      ["Force between charges", "⚡", "Two charges push or pull on each other. <b>F ∝ q₁q₂ ÷ r²</b>. Opposite charges attract. Like charges repel."],
      ["Scaling", "🔢", "Double one charge: the force doubles. Double the distance: the force becomes <b>one quarter</b>. Halve the distance: <b>four times</b> as big. This is an inverse-square law."],
      ["Example", "🧮", "A force of 36 N with the distance tripled becomes 36 ÷ 9 = 4 N."]
    ], () => {
      const F0 = pick([36, 72, 108, 144, 180, 216]), q1 = pick([1, 2, 3]), q2 = pick([1, 2, 3]);
      const dopt = pick([["doubled", 4, 1], ["tripled", 9, 1], ["halved", 1, 4]]);
      const F = F0 * q1 * q2 * dopt[2] / dopt[1];
      return pick([
        Q(`Two small charges attract with a force of ${F0} N. The distance between them is ${dopt[0]}. What is the new force in N?`, "⚡", F0 * dopt[2] / dopt[1],
          ["Force depends on 1 over distance squared.", "Doubled distance: ÷ 4. Tripled: ÷ 9. Halved: × 4.", "Example: 40 N with the distance doubled gives 40 ÷ 4 = 10 N. Now do yours."]),
        Q(`Two charges exert ${F0} N on each other. One charge is made ${q1 === 1 ? "twice as big" : q1 + " times as big"} and the other ${q2 === 1 ? "stays the same" : q2 + " times as big"}, and the distance is ${dopt[0]}. What is the new force in N?`, "🧲", F,
          ["Change each factor in turn.", "Multiply by both charge factors and by the distance factor (doubling distance is ÷ 4, tripling ÷ 9, halving × 4).", "Example: 24 N, one charge doubled, distance doubled: 24 × 2 ÷ 4 = 12 N. Now do yours."])
      ]);
    }),
    num("Electric field between plates", [
      ["Field strength", "🔋", "Two parallel metal plates connected to a battery make a <b>uniform</b> electric field between them. Its strength is <b>E = V ÷ d</b> in volts per metre (V/m)."],
      ["Closer plates", "↔️", "Halve the gap and the field doubles. Remember to change cm to metres first."],
      ["Example", "🧮", "100 V across a 2 cm gap: d = 0.02 m, E = 100 ÷ 0.02 = 5000 V/m."]
    ], () => tryGen(() => {
      const V = pick([6, 12, 24, 50, 60, 100, 120, 200, 240, 500]), d = pick([1, 2, 4, 5, 10, 20, 25]);
      const E = V * 100 / d;
      if (!Number.isInteger(E)) return null;
      return pick([
        Q(`A ${V} V battery is connected across two plates ${d} cm apart. What is the electric field between them in V/m?`, "🔋", E,
          ["Change the gap to metres.", "E = V ÷ d with d in metres.", "Example: 50 V across 5 cm (0.05 m) gives 1000 V/m. Now do yours."]),
        Q(`The field between two plates is ${E} V/m and the gap is ${d} cm. What is the voltage across the plates in volts?`, "⚡", V,
          ["Rearrange E = V ÷ d.", "V = E × d with d in metres.", "Example: 2000 V/m and 0.05 m gives 100 V. Now do yours."]),
        Q(`A ${V} V supply across two plates makes a field of ${E} V/m. How far apart are the plates, in centimetres?`, "📏", d,
          ["d = V ÷ E gives metres.", "Multiply the answer by 100 for centimetres.", "Example: 100 V and 5000 V/m gives 0.02 m = 2 cm. Now do yours."])
      ]);
    })),
    les("Electric field lines", [
      ["Drawing a field", "🧲", "Field lines show the direction a <b>positive</b> test charge would move. They point <b>away from positive</b> charges and <b>towards negative</b> ones."],
      ["Reading them", "🔍", "Where lines are <b>close together</b>, the field is strong. Lines never cross. Between two oppositely charged plates the lines are straight and evenly spaced, a <b>uniform</b> field."],
      ["Electrons", "➖", "Electrons are negative, so they move <b>against</b> the field lines. Field strength is measured in N/C (or V/m)."]
    ], ["Field lines run from positive to negative.", "Close lines mean a strong field.", "Example: a positive charge's lines point outward like the spokes of a wheel. Now do yours."], [
      ["Field lines around a positive point charge point...", "Away from it", "Towards it", "In circles around it"],
      ["Field lines around a negative point charge point...", "Towards it", "Away from it", "In circles around it"],
      ["Where field lines are closer together, the field is...", "Stronger", "Weaker", "Zero"],
      ["A positive test charge in a field moves...", "In the direction of the field lines", "Against the field lines", "At right angles to them"],
      ["Between two oppositely charged parallel plates the field is...", "Uniform", "Strongest at the edges", "Zero"],
      ["Which statement about field lines is false?", "They can cross each other", "They leave positive charges", "They enter negative charges"],
      ["Which of these is a unit of electric field strength?", "N/C", "N m", "C/s"],
      ["An electron in an electric field moves...", "Against the field lines", "Along the field lines", "Not at all"]
    ]),
    num("Force on a current-carrying wire", [
      ["Motor effect", "🧲", "A wire carrying current in a magnetic field feels a force. It is biggest when the wire is at <b>right angles</b> to the field."],
      ["The size", "📏", "<b>F = B × I × L</b>. B is the magnetic flux density in <b>tesla (T)</b>, I the current in amps, L the length of wire in the field in metres."],
      ["Example", "🧮", "B = 0.5 T, I = 4 A, L = 0.3 m: F = 0.5 × 4 × 0.3 = 0.6 N."]
    ], () => tryGen(() => {
      const B = pick([0.2, 0.4, 0.5, 1, 2]), I = ri(1, 10), L = pick([0.1, 0.2, 0.25, 0.4, 0.5, 1, 2]);
      const F = r2(B * I * L);
      if (Math.abs(B * I * L - F) > 1e-9) return null;
      return pick([
        Q(`A wire ${L} m long carries ${I} A at right angles to a field of ${B} T. What force acts on it, in newtons?`, "🧲", F,
          ["Multiply three numbers.", "F = B × I × L.", "Example: 0.5 T, 2 A, 0.4 m gives 0.4 N. Now do yours."]),
        Q(`A wire ${L} m long in a ${B} T field feels a force of ${F} N. What current is flowing, in amps?`, "🔌", I,
          ["Rearrange F = BIL.", "I = F ÷ (B × L).", "Example: F = 1.2 N, B = 0.5 T, L = 0.4 m gives I = 1.2 ÷ 0.2 = 6 A. Now do yours."]),
        Q(`A wire carrying ${I} A feels a force of ${F} N in a magnetic field when ${L} m of it is in the field. What is the flux density B in tesla?`, "🌀", B,
          ["Rearrange F = BIL.", "B = F ÷ (I × L).", "Example: F = 0.6 N, I = 3 A, L = 0.5 m gives B = 0.6 ÷ 1.5 = 0.4 T. Now do yours."])
      ]);
    })),
    num("Transformer equation", [
      ["Coils and turns", "🔌", "A transformer has two coils on an iron core. The voltages are in the same ratio as the numbers of turns: <b>Vs ÷ Vp = Ns ÷ Np</b>."],
      ["Step up, step down", "🔁", "More turns on the secondary coil: <b>step-up</b>. Fewer: <b>step-down</b>. An ideal transformer wastes nothing, so <b>Vp × Ip = Vs × Is</b>."],
      ["Example", "🧮", "240 V, 1000 turns primary and 50 turns secondary: Vs = 240 × 50 ÷ 1000 = 12 V."]
    ], () => tryGen(() => {
      const Vp = pick([120, 230, 240, 400]), Np = pick([100, 200, 500, 1000, 2000]), Ns = pick([10, 20, 25, 50, 100, 250, 400, 1000, 2000, 5000]);
      const Vs = Vp * Ns / Np;
      if (!Number.isInteger(Vs) || Ns === Np) return null;
      const Is = pick([1, 2, 4, 5, 10]), Ip = r2(Vs * Is / Vp);
      if (Math.abs(Ip * 100 - Math.round(Ip * 100)) > 1e-9) return null;
      return pick([
        Q(`A transformer's primary coil has ${Np} turns and is connected to ${Vp} V. The secondary has ${Ns} turns. What is the secondary voltage in volts?`, "🔌", Vs,
          ["The voltage ratio equals the turns ratio.", "Vs = Vp × Ns ÷ Np.", "Example: 100 V, 500 turns primary, 50 turns secondary: 100 × 50 ÷ 500 = 10 V. Now do yours."]),
        Q(`A transformer steps ${Vp} V down or up to ${Vs} V. The primary has ${Np} turns. How many turns does the secondary have?`, "🌀", Ns,
          ["The turns ratio equals the voltage ratio.", "Ns = Np × Vs ÷ Vp.", "Example: 200 V to 20 V with 1000 primary turns needs 100 secondary turns. Now do yours."]),
        Q(`An ideal transformer changes ${Vp} V to ${Vs} V. The secondary delivers ${Is} A. What current flows in the primary, in amps?`, "⚡", Ip,
          ["Ideal means power in equals power out.", "Ip = Vs × Is ÷ Vp.", "Example: 10 V and 5 A out, 100 V in: Ip = 50 ÷ 100 = 0.5 A. Now do yours."])
      ]);
    })),
    num("Radio and light wavelengths", [
      ["One wave equation", "📻", "All electromagnetic waves travel at <b>c = 300 000 000 m/s</b> in space. <b>c = f × λ</b>."],
      ["Handy units", "📏", "With wavelength in metres, frequency in <b>MHz</b> is <b>300 ÷ λ</b>. With wavelength in nm, frequency in <b>THz</b> is <b>300 000 ÷ λ</b>."],
      ["Example", "🧮", "A 3 m radio wave has a frequency of 300 ÷ 3 = 100 MHz. Green light at 500 nm has 300 000 ÷ 500 = 600 THz."]
    ], () => {
      const lam = pick([1, 1.5, 2, 3, 5, 6, 10, 12, 15, 20, 30, 50]), nm = pick([400, 500, 600, 750]);
      return pick([
        Q(`A radio station sends waves with a wavelength of ${lam} m. What is the frequency in MHz? (c = 300 000 000 m/s)`, "📻", r2(300 / lam),
          ["Use c = fλ.", "f in MHz = 300 ÷ wavelength in metres.", "Example: a 4 m wave has f = 300 ÷ 4 = 75 MHz. Now do yours."]),
        Q(`A radio station broadcasts at ${r2(300 / lam)} MHz. What is its wavelength in metres?`, "📡", lam,
          ["Use c = fλ.", "λ in metres = 300 ÷ f in MHz.", "Example: 60 MHz gives 300 ÷ 60 = 5 m. Now do yours."]),
        Q(`Light has a wavelength of ${nm} nm. What is its frequency in THz? (c = 300 000 000 m/s)`, "🌈", r2(300000 / nm),
          ["Use c = fλ with the wavelength in metres, or the shortcut.", "Frequency in THz = 300 000 ÷ wavelength in nm.", "Example: 1000 nm gives 300 THz. Now do yours."])
      ]);
    }),
    num("Orbit time", [
      ["Round the circle", "🛰️", "A satellite in a circular orbit covers a distance of <b>2πr</b> in one orbit. The time for one orbit is <b>T = 2πr ÷ v</b>."],
      ["Use π ≈ 3", "🔢", "To keep the sums easy, take π = 3. Then <b>T = 6r ÷ v</b>."],
      ["Example", "🧮", "r = 7000 km, v = 7 km/s: T = 6 × 7000 ÷ 7 = 6000 s, about 100 minutes."]
    ], () => tryGen(() => {
      const v = pick([2, 3, 4, 5, 6, 7]), r = pick([4000, 5000, 6000, 7000, 8000, 9000, 10000, 12000, 14000]);
      const T = 6 * r / v;
      if (!Number.isInteger(T)) return null;
      return pick([
        Q(`A satellite orbits in a circle of radius ${r} km at ${v} km/s. Taking π = 3, how long is one orbit in seconds?`, "🛰️", T,
          ["Distance round the circle is 2πr.", "T = 6r ÷ v (with π = 3).", "Example: r = 8000 km at 4 km/s gives T = 48 000 ÷ 4 = 12 000 s. Now do yours."]),
        Q(`A satellite takes ${T} s to circle a radius of ${r} km. Taking π = 3, what is its speed in km/s?`, "🌍", v,
          ["v = distance ÷ time.", "v = 6r ÷ T.", "Example: r = 6000 km and T = 6000 s gives v = 36 000 ÷ 6000 = 6 km/s. Now do yours."]),
        Q(`A satellite moves at ${v} km/s and takes ${T} s for one orbit. Taking π = 3, what is the radius of its orbit in km?`, "📏", r,
          ["Rearrange T = 6r ÷ v.", "r = v × T ÷ 6.", "Example: v = 5 km/s and T = 9600 s gives r = 48 000 ÷ 6 = 8000 km. Now do yours."])
      ]);
    })),
    num("Gravity on other planets", [
      ["Surface gravity", "🪐", "The pull at a planet's surface is <b>g = GM ÷ r²</b>. A planet with M times Earth's mass and radius R times Earth's has <b>g = 10 × M ÷ R²</b> (m/s²)."],
      ["Mass up, radius up", "⚖️", "More mass means a stronger pull. A bigger radius means weaker pull (r squared!). Weight = mass × g."],
      ["Example", "🧮", "A planet with 8 times Earth's mass and twice the radius: g = 10 × 8 ÷ 4 = 20 m/s²."]
    ], () => {
      const c0 = [[2, 4, 10], [2, 8, 20], [2, 2, 5], [1, 2, 20], [3, 9, 10], [3, 18, 20], [4, 8, 5], [4, 16, 10], [2, 6, 15], [1, 1, 10], [2, 1, 2.5], [1, 4, 40]];
      const [R, M, g] = pick(c0), m = pick([40, 50, 60, 80]);
      return pick([
        Q(`A planet has ${M} times the mass of Earth and ${R} times the radius. What is the gravity at its surface in m/s²? (Earth: g = 10)`, "🪐", g,
          ["Mass multiplies g. Radius squared divides it.", "g = 10 × M ÷ R².", "Example: 6 times the mass and 2 times the radius gives 10 × 6 ÷ 4 = 15 m/s². Now do yours."]),
        Q(`A ${m} kg astronaut stands on a planet with ${M} times Earth's mass and ${R} times Earth's radius. What is the astronaut's weight in N? (Earth: g = 10)`, "🧑‍🚀", r2(m * g),
          ["Find g on the planet first.", "Weight = mass × g.", "Example: g = 15 and mass 40 kg gives 600 N. Now do yours."]),
        Q(`An astronaut weighs ${r2(m * g)} N on a planet where g = ${g} m/s². What is her mass in kg?`, "⚖️", m,
          ["Weight is mass times g.", "Mass = weight ÷ g.", "Example: 600 N on a planet with g = 15 gives 600 ÷ 15 = 40 kg. Now do yours."])
      ]);
    }),
    num("Energy to melt or boil", [
      ["Latent heat in numbers", "🧊", "Melting or boiling takes energy with no change in temperature: <b>Q = m × L</b>, where L is the latent heat per kilogram."],
      ["Values to use", "📘", "For ice melting, L ≈ 330 kJ/kg (use 330). For water boiling, L ≈ 2300 kJ/kg (use 2300)."],
      ["Example", "🧮", "Melting 2 kg of ice: Q = 2 × 330 = 660 kJ."]
    ], () => {
      const m = pick([0.1, 0.2, 0.5, 1, 2, 3, 4, 5, 10]);
      const Lf = 330, Lv = 2300;
      return pick([
        Q(`How much energy is needed to melt ${m} kg of ice at 0 °C? Use L = 330 kJ/kg. Answer in kJ.`, "🧊", r2(m * Lf),
          ["No temperature change, so no mc∆T needed.", "Q = m × L.", "Example: 3 kg of ice needs 3 × 330 = 990 kJ. Now do yours."]),
        Q(`How much energy is needed to boil away ${m} kg of water at 100 °C? Use L = 2300 kJ/kg. Answer in kJ.`, "♨️", r2(m * Lv),
          ["Boiling takes lots of energy per kilogram.", "Q = m × L.", "Example: 2 kg needs 2 × 2300 = 4600 kJ. Now do yours."]),
        Q(`A heater supplies ${r2(m * Lf)} kJ to ice at 0 °C. How many kilograms melt? Use L = 330 kJ/kg.`, "🔥", m,
          ["Rearrange Q = mL.", "m = Q ÷ L.", "Example: 660 kJ melts 660 ÷ 330 = 2 kg. Now do yours."])
      ]);
    }),
    num("Gas laws with temperature", [
      ["Use kelvin", "🌡️", "In gas laws, temperature must be in <b>kelvin</b>: <b>K = °C + 273</b>. Zero kelvin is absolute zero."],
      ["Fixed volume", "🥫", "Heat a gas in a sealed rigid can and pressure rises: <b>P₁ ÷ T₁ = P₂ ÷ T₂</b>."],
      ["Fixed pressure", "🎈", "Heat a gas that can push a piston or balloon and it expands: <b>V₁ ÷ T₁ = V₂ ÷ T₂</b>. Example: 27 °C is 300 K. Warming to 127 °C (400 K) multiplies the pressure by 4 ÷ 3."]
    ], () => tryGen(() => {
      const t1 = pick([7, 27, 47, 77, 127, 177]), t2 = pick([27, 77, 127, 177, 227, 327, 527]);
      if (t1 === t2) return null;
      const T1 = t1 + 273, T2 = t2 + 273, P1 = pick([60, 90, 100, 120, 150, 180, 200, 240, 300]);
      const P2 = P1 * T2 / T1;
      if (!Number.isInteger(P2)) return null;
      return pick([
        Q(`A sealed rigid can of gas at ${P1} kPa is warmed from ${t1} °C to ${t2} °C. What is the new pressure in kPa?`, "🥫", P2,
          ["Convert both temperatures to kelvin.", "P₂ = P₁ × T₂ ÷ T₁ with kelvin temperatures.", "Example: 100 kPa, 27 °C (300 K) to 127 °C (400 K): 100 × 400 ÷ 300 ≈ 133 kPa. Now do yours."]),
        Q(`A balloon holds ${P1} litres of gas at ${t1} °C. It is heated to ${t2} °C at a constant pressure. What is the new volume in litres?`, "🎈", P2,
          ["Convert both temperatures to kelvin.", "V₂ = V₁ × T₂ ÷ T₁ in kelvin.", "Example: 60 L at 27 °C heated to 127 °C: 60 × 400 ÷ 300 = 80 L. Now do yours."])
      ]);
    })),
    num("Ideal gas equation", [
      ["Everything at once", "🧪", "For a fixed amount of gas: <b>pV = nRT</b>. n is the number of moles and T is in kelvin."],
      ["Easy numbers", "🔢", "Use R ≈ 8 J/(mol K). With p in kPa, V comes out in <b>litres</b> (kPa × L = J)."],
      ["Example", "🧮", "n = 1 mol at 300 K and 100 kPa: V = 1 × 8 × 300 ÷ 100 = 24 L."]
    ], () => tryGen(() => {
      const n = ri(1, 5), T = pick([250, 275, 300, 325, 350, 400]), p = pick([100, 200, 50, 80, 400]);
      const V = n * 8 * T / p;
      if (!Number.isInteger(V)) return null;
      return pick([
        Q(`${n} mol of an ideal gas is at ${T} K and ${p} kPa. What volume does it fill, in litres? (R = 8)`, "🧪", V,
          ["Rearrange pV = nRT for V.", "V = n × 8 × T ÷ p.", "Example: 2 mol at 300 K and 100 kPa: V = 2 × 8 × 300 ÷ 100 = 48 L. Now do yours."]),
        Q(`${n} mol of an ideal gas fills ${V} litres at ${T} K. What is its pressure in kPa? (R = 8)`, "💨", p,
          ["Rearrange pV = nRT for p.", "p = n × 8 × T ÷ V.", "Example: 1 mol in 24 L at 300 K gives p = 2400 ÷ 24 = 100 kPa. Now do yours."]),
        Q(`A gas fills ${V} litres at ${p} kPa and ${T} K. How many moles are there? (R = 8)`, "⚗️", n,
          ["Rearrange pV = nRT for n.", "n = pV ÷ (8 × T).", "Example: 100 kPa, 24 L, 300 K gives n = 2400 ÷ 2400 = 1 mol. Now do yours."])
      ]);
    })),
    num("Double-slit interference", [
      ["Bright fringes", "🌈", "Light through two narrow slits makes a pattern of bright and dark <b>fringes</b>. The fringe spacing is <b>x = λD ÷ a</b>."],
      ["Find the wavelength", "🔬", "Rearranged: <b>λ = a x ÷ D</b>. Here a is the slit separation, D the distance to the screen, x the fringe spacing."],
      ["Example", "🧮", "a = 0.5 mm, x = 2 mm, D = 2 m: λ = (0.5 × 2 ÷ 2) × 1000 = 500 nm."]
    ], () => tryGen(() => {
      const lam = pick([400, 500, 600, 700]), a = pick([0.2, 0.25, 0.4, 0.5, 1]), D = pick([1, 2, 3, 4]);
      const x = lam * D / (a * 1e6) * 1e3; // mm: lam nm -> m=lam e-9 ; x(m)=lam e-9 * D / (a e-3) ; in mm multiply 1e3
      const xr = r2(x);
      if (Math.abs(x - xr) > 1e-9 || xr < 0.5) return null;
      return pick([
        Q(`Light shines through slits ${a} mm apart onto a screen ${D} m away. The bright fringes are ${xr} mm apart. What is the wavelength in nm? (λ = a x ÷ D)`, "🌈", lam,
          ["Use λ = a x ÷ D.", "Multiply the slit gap in mm by the spacing in mm, then divide by D in metres and multiply by 1000 to get nm.", "Example: a = 0.5 mm, x = 1.2 mm, D = 1 m: 0.6 × 1000 = 600 nm. Now do yours."]),
        Q(`Light of wavelength ${lam} nm passes through slits ${a} mm apart. The screen is ${D} m away. What is the spacing between bright fringes, in mm? (x = λD ÷ a)`, "🖥️", xr,
          ["Use x = λD ÷ a.", "With λ in nm, a in mm and D in m: x (mm) = λ × D ÷ (a × 1000).", "Example: 600 nm, D = 1 m, a = 0.5 mm gives 600 ÷ 500 = 1.2 mm. Now do yours."])
      ]);
    })),
    num("Organ pipes", [
      ["Air column", "🎺", "Sound in a pipe forms standing waves. An <b>open pipe</b> (both ends open) has fundamental <b>f = v ÷ 2L</b>."],
      ["Closed pipe", "🥁", "A pipe closed at one end has <b>f = v ÷ 4L</b>, so it plays a note an octave lower than an open pipe of the same length. Take v = 340 m/s."],
      ["Example", "🧮", "Open pipe, L = 0.5 m: f = 340 ÷ 1 = 340 Hz. Closed pipe, L = 0.5 m: f = 340 ÷ 2 = 170 Hz."]
    ], () => {
      const L = pick([[0.17, 1000], [0.34, 500], [0.425, 400], [0.68, 250], [0.85, 200]]);
      const Lc = pick([[0.085, 1000], [0.17, 500], [0.2125, 400], [0.34, 250], [0.425, 200]]);
      return pick([
        Q(`An organ pipe open at both ends is ${L[0]} m long. What is its fundamental frequency in Hz? (Speed of sound 340 m/s)`, "🎺", L[1],
          ["Open at both ends: half a wavelength fits in the pipe.", "f = 340 ÷ (2 × L).", "Example: L = 0.68 m gives 340 ÷ 1.36 = 250 Hz. Now do yours."]),
        Q(`A pipe closed at one end is ${Lc[0]} m long. What is its fundamental frequency in Hz? (Speed of sound 340 m/s)`, "🥁", Lc[1],
          ["Closed at one end: a quarter of a wavelength fits in the pipe.", "f = 340 ÷ (4 × L).", "Example: L = 0.34 m gives 340 ÷ 1.36 = 250 Hz. Now do yours."]),
        Q(`An open organ pipe has a fundamental frequency of ${L[1]} Hz. How long is it, in metres? (Speed of sound 340 m/s)`, "📏", L[0],
          ["Rearrange f = v ÷ 2L.", "L = 340 ÷ (2f).", "Example: f = 500 Hz gives L = 340 ÷ 1000 = 0.34 m. Now do yours."])
      ]);
    }),
    num("Crossing a river", [
      ["Two velocities", "🚣", "A boat aimed straight across a river is carried downstream by the current. The two motions are at <b>right angles</b>, so they do not affect each other."],
      ["Crossing time", "⏱️", "<b>Time = width ÷ boat speed (across)</b>. The drift is <b>current speed × time</b>."],
      ["Actual speed", "📐", "The speed over the ground is found with Pythagoras: <b>√(boat² + current²)</b>. A 3 and a 4 give 5."]
    ], () => tryGen(() => {
      const vb = pick([2, 3, 4, 5]), vr = pick([1, 2, 3, 4]), w = pick([40, 60, 80, 100, 120, 150]);
      const t = w / vb;
      if (!Number.isInteger(t)) return null;
      const trip = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10]]);
      return pick([
        Q(`A boat heads straight across a ${w} m wide river at ${vb} m/s (relative to the water). How many seconds does the crossing take?`, "🚣", t,
          ["Only the speed across the river matters for the crossing time.", "Time = width ÷ boat speed.", "Example: 60 m wide at 3 m/s takes 20 s. Now do yours."]),
        Q(`A boat heads straight across a ${w} m wide river at ${vb} m/s. The current flows at ${vr} m/s. How far downstream does the boat land, in metres?`, "🌊", vr * t,
          ["Find the crossing time first.", "Drift = current speed × time.", "Example: 20 s crossing with a 2 m/s current gives 40 m of drift. Now do yours."]),
        Q(`A boat moves across a river at ${trip[0]} m/s while the current carries it downstream at ${trip[1]} m/s. What is the boat's speed over the ground, in m/s?`, "📐", trip[2],
          ["The two velocities are at right angles.", "Use Pythagoras: square each, add, take the square root.", "Example: 5 across and 12 along gives 25 + 144 = 169, so 13 m/s. Now do yours."])
      ]);
    })),
    num("Kinetic energy from momentum", [
      ["A neat link", "🔗", "Since p = mv, kinetic energy can be written <b>KE = p² ÷ 2m</b>."],
      ["Why it helps", "💡", "If you know the momentum and mass, you do not need the speed. For the same momentum, a lighter object has <b>more</b> kinetic energy."],
      ["Example", "🧮", "p = 20 kg m/s, m = 2 kg: KE = 400 ÷ 4 = 100 J."]
    ], () => tryGen(() => {
      const m = pick([1, 2, 4, 5, 8, 10, 20, 50]), p = pick([4, 6, 8, 10, 12, 16, 20, 30, 40]);
      const KE = p * p / (2 * m);
      if (!Number.isInteger(KE)) return null;
      return pick([
        Q(`An object of mass ${m} kg has a momentum of ${p} kg m/s. What is its kinetic energy in joules?`, "⚡", KE,
          ["Use the link between momentum and kinetic energy.", "KE = p² ÷ (2m).", "Example: p = 10 and m = 5 gives 100 ÷ 10 = 10 J. Now do yours."]),
        Q(`An object of mass ${m} kg has ${KE} J of kinetic energy. What is its momentum in kg m/s?`, "🏃", p,
          ["Rearrange KE = p² ÷ 2m.", "p² = 2 × m × KE, then take the square root.", "Example: m = 2 and KE = 25 gives p² = 100, so p = 10. Now do yours."]),
        Q(`An object of mass ${m} kg moves with a momentum of ${p} kg m/s. What is its speed in m/s?`, "💨", r2(p / m),
          ["Momentum is mass times speed.", "v = p ÷ m.", "Example: 30 kg m/s and 5 kg gives 6 m/s. Now do yours."])
      ]);
    })),
    num("Pressure at a depth", [
      ["Weight of the liquid", "🌊", "A liquid presses on everything in it because of the weight above. At depth h: <b>p = ρ g h</b>."],
      ["Water numbers", "🔢", "Water: ρ = 1000 kg/m³ and g = 10, so every metre of depth adds <b>10 000 Pa = 10 kPa</b>. Add the air above: atmosphere ≈ 100 kPa."],
      ["Example", "🧮", "At 8 m deep: extra pressure = 10 × 8 = 80 kPa. Total pressure = 100 + 80 = 180 kPa."]
    ], () => {
      const h = pick([2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30]);
      return pick([
        Q(`How much extra pressure does water cause at a depth of ${h} m? Use ρ = 1000 kg/m³ and g = 10. Answer in kPa.`, "🤿", 10 * h,
          ["Pressure grows steadily with depth.", "p = ρgh = 1000 × 10 × h in pascals, so 10 kPa per metre.", "Example: 7 m deep gives 70 kPa. Now do yours."]),
        Q(`A diver is ${h} m under water. Air pressure at the surface is 100 kPa. What is the total pressure on the diver in kPa? (Water adds 10 kPa per metre.)`, "🌊", 100 + 10 * h,
          ["The air above the water also presses down.", "Total = 100 kPa + 10 kPa per metre of depth.", "Example: at 6 m the total is 100 + 60 = 160 kPa. Now do yours."]),
        Q(`The water pressure (not counting the air) on a submarine hatch is ${10 * h} kPa. How deep is it, in metres? (10 kPa per metre of water)`, "🚢", h,
          ["Each metre of depth adds the same pressure.", "Depth = pressure ÷ 10 kPa.", "Example: 90 kPa means 90 ÷ 10 = 9 m. Now do yours."]),
        Q(`Oil of density 800 kg/m³ fills a tank to a depth of ${h} m. What pressure does the oil cause at the bottom, in kPa? (g = 10)`, "🛢️", 8 * h,
          ["p = ρgh again, but with the oil density.", "800 × 10 × h gives pascals; divide by 1000 for kPa (8 kPa per metre).", "Example: 5 m of oil gives 40 kPa. Now do yours."])
      ]);
    }),
    num("Upthrust", [
      ["Archimedes' principle", "🛁", "A submerged object feels an upward <b>upthrust</b> equal to the weight of the fluid it pushes aside: <b>U = ρ g V</b>."],
      ["Water numbers", "💧", "Each litre of water displaced gives <b>10 N</b> of upthrust (ρ = 1000, g = 10). Oil of density 800 gives 8 N per litre."],
      ["Float or sink", "🛟", "If upthrust is bigger than the weight, the object rises or floats. A floating object's weight equals the upthrust. A 3 kg floating object displaces 3 litres of water."]
    ], () => {
      const V = pick([2, 3, 4, 5, 6, 8, 10, 15, 20]), m = pick([1, 2, 3, 4, 5, 6, 8]), W = pick([5, 10, 15, 20, 25, 30, 40]);
      return pick([
        Q(`An object of volume ${V} litres is fully under water. What is the upthrust on it in newtons? (10 N per litre)`, "🛁", 10 * V,
          ["Upthrust equals the weight of displaced water.", "Multiply the litres by 10 N per litre.", "Example: 7 litres gives 70 N. Now do yours."]),
        Q(`A boat of mass ${m * 100} kg floats in water. How many litres of water does it displace? (1 litre of water has a mass of 1 kg)`, "⛵", m * 100,
          ["A floating object's weight equals the upthrust.", "The displaced water has the same mass as the boat.", "Example: a 300 kg boat displaces 300 litres. Now do yours."]),
        Q(`A ${V}-litre block of wood weighing ${W} N is pushed fully under water. How big is the extra upward force when it is held at rest, in newtons? (Upthrust is bigger than the weight.)`, "🪵", Math.abs(10 * V - W),
          ["Compare the upthrust with the weight.", "Upthrust is 10 × V. Subtract the weight.", "Example: 8 litres (80 N upthrust) and a 30 N block: 80 − 30 = 50 N. Now do yours."])
      ].filter(q => q.answer >= 0 && !(q.text.includes("pushed fully under") && 10 * V <= W)));
    }),
    les("Checking units", [
      ["Units are a safety net", "🧰", "The units of an answer must make sense. 1 newton = <b>1 kg m/s²</b>. 1 joule = <b>1 N m</b>. 1 watt = <b>1 J/s</b>. 1 pascal = <b>1 N/m²</b>."],
      ["Electrical units", "⚡", "1 volt = <b>1 J/C</b>. 1 ohm = <b>1 V/A</b>. 1 hertz = <b>1 per second</b>. Momentum is measured in <b>kg m/s</b>."],
      ["Check your formula", "✅", "If a formula gives metres per second when you expected metres, something is wrong. For v = fλ: (1/s) × m = m/s, which is right for a speed."]
    ], ["Break the unit into its basic parts.", "Use the formula that defines the quantity.", "Example: a watt is energy per second, so J/s. Now do yours."], [
      ["1 newton is the same as...", "1 kilogram metre per second squared", "1 kilogram metre per second", "1 kilogram per metre second squared"],
      ["1 joule is the same as...", "1 newton metre", "1 newton per metre", "1 newton second"],
      ["1 watt is the same as...", "1 joule per second", "1 joule second", "1 newton per second"],
      ["The unit of momentum is...", "Kilogram metre per second", "Kilogram metre per second squared", "Newton metre"],
      ["1 pascal is the same as...", "1 newton per square metre", "1 newton square metre", "1 newton per metre"],
      ["1 volt is the same as...", "1 joule per coulomb", "1 coulomb per joule", "1 amp per second"],
      ["1 ohm is the same as...", "1 volt per amp", "1 amp per volt", "1 volt amp"],
      ["Which combination has the units of energy?", "Kilogram square metre per second squared", "Kilogram metre per second squared", "Kilogram per metre second squared"]
    ])
  ];
  c.push(
    mix("Mixed practice", at(c, [0, 1, 3, 5, 6, 8, 9, 11, 14, 15])),
    mix("Level 21 Challenge", at(c, [2, 4, 7, 10, 12, 13, 15, 16, 17]))
  );

  Object.assign(PHYSICS_LEVELS, { 19: a, 20: b, 21: c });
})();
