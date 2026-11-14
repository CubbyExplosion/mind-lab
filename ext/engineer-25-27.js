// ext/engineer-25-27.js  Engineering levels 25-27 (12th grade, then College year 1 first half: intro to engineering)
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
  const rd = x => Math.round(x * 100) / 100;
  const until = f => { for (let i = 0; i < 500; i++) { const r = f(); if (r) return r; } return f(); };
  const mcl = (title, slides, hints, items) => gen(title, slides, () => {
    const it = pick(items), parts = it[0].split("§");
    return Q(parts[parts.length - 1], parts.length > 1 ? parts[0] : undefined, it[1], hints, it.slice(1));
  });

  // ================= LEVEL 25 =================
  const a = [
    gen("Slopes and derivatives", [
      ["Derivative = slope", "📐", "The <b>derivative</b> of a function is its slope at each point, or how fast it changes. For a straight line y = mx + c, the slope is m everywhere."],
      ["The power rule", "🔢", "For x<sup>n</sup>, the derivative is <b>n·x<sup>n−1</sup></b>. Bring the power down in front, then lower the power by one. A number in front just stays: the derivative of 5x<sup>3</sup> is 15x<sup>2</sup>."],
      ["Flat spots", "⛰️", "A constant has slope zero. At the top of a hill or the bottom of a valley the slope is zero too. Engineers set the derivative to zero to find those spots."]
    ], () => {
      const a = ri(1, 5), n = pick([2, 3]), k = ri(1, 4), b = ri(1, 9) * 2, m = ri(2, 9), p = ri(3, 7), c = ri(1, 4);
      return pick([
        Q(`f(x) = ${a}x<sup>${n}</sup>. What is the slope f′(x) at x = ${k}?`, "📐", a * n * k ** (n - 1), ["Bring the power down in front, then lower the power by one.", "Multiply the number in front by the old power, then put in the x value.", "Example: for 2x<sup>3</sup> at x = 2, the slope is 2·3·2<sup>2</sup> = 24. Now do yours."]),
        Q(`f(x) = ${a}x² + ${m}x. What is the slope at x = ${k}?`, "📈", 2 * a * k + m, ["Take the derivative of each piece, then add them.", "The x² piece gives 2 times its number times x. The plain x piece gives just its number.", "Example: for 3x² + 4x at x = 2, the slope is 6·2 + 4 = 16. Now do yours."]),
        Q(`The graph y = ${m}x + ${p} is a straight line. What is its slope everywhere?`, "📏", m, ["A straight line has the same slope everywhere.", "In y = mx + c, one of the two numbers is the slope.", "Example: y = 7x + 1 has slope 7, because 7 is the number multiplying x. Now do yours."]),
        Q(`f(x) = x² − ${b}x. At what x is the slope zero?`, "⛰️", b / 2, ["Take the derivative, then set it equal to zero and solve for x.", "The derivative has a 2x part and a plain number part. Make them cancel.", "Example: f(x) = x² − 10x has slope 2x − 10. Zero when 2x = 10, so x = 5. Now do yours."]),
        Q(`The derivative of x<sup>${p}</sup> has x raised to what power?`, "🔢", p - 1, ["The power rule lowers the power.", "The new power is the old one made smaller by a fixed step.", "Example: the derivative of x<sup>9</sup> is 9x<sup>8</sup>, so the new power is 8. Now do yours."])
      ]);
    }),
    gen("Velocity and acceleration", [
      ["Position to velocity", "🏃", "<b>Velocity</b> is the derivative of position: how fast position changes. <b>Acceleration</b> is the derivative of velocity."],
      ["An example", "📍", "If position is x = 3t<sup>2</sup>, then velocity is v = 6t, and acceleration is a = 6. Each derivative drops the power by one."],
      ["Why it matters", "🚀", "Engineers read a motion sensor's position data and use derivatives to find speed and acceleration, for example in robots, cars and rockets."]
    ], () => {
      const a = ri(1, 5), b = ri(1, 9), t = ri(1, 6), c = ri(2, 9);
      return pick([
        Q(`A cart's position is x = ${a}t² + ${b}t (meters, t in seconds). What is its velocity (m/s) at t = ${t}?`, "🛒", 2 * a * t + b, ["Velocity is the derivative of position.", "The t² part gives two times its number times t. The plain t part gives its number.", "Example: x = 2t² + 5t at t = 3 gives v = 4·3 + 5 = 17. Now do yours."]),
        Q(`A cart's position is x = ${a}t² + ${b}t. What is its constant acceleration (m/s²)?`, "🛒", 2 * a, ["Acceleration is the derivative of velocity.", "Take two derivatives. The plain t part disappears after the first one.", "Example: x = 4t² + 9t gives v = 8t + 9, so a = 8. Now do yours."]),
        Q(`A robot's position is x = ${c}t (meters). How fast is it moving (m/s)?`, "🤖", c, ["A straight-line graph has a steady slope.", "Velocity is the slope of the position graph.", "Example: x = 6t has slope 6, so the speed is 6 m/s. Now do yours."]),
        Q(`A rocket sled has velocity v = ${c}t (m/s). What is its acceleration (m/s²)?`, "🚀", c, ["Acceleration is the slope of the velocity graph.", "The velocity graph is a straight line, so the slope is steady.", "Example: v = 3t has a = 3 m/s². Now do yours."]),
        Q(`A drone's height is h = ${a}t³ (meters). What is its vertical velocity (m/s) at t = ${t}?`, "🚁", 3 * a * t * t, ["Use the power rule on the t cubed.", "Bring the 3 down, multiply by the number in front, then lower the power.", "Example: h = 2t³ at t = 2 gives v = 6·4 = 24. Now do yours."])
      ]);
    }),
    gen("Area under a curve", [
      ["Adding up tiny pieces", "📊", "An <b>integral</b> adds up many tiny pieces. It gives the <b>area under a graph</b>. Area under a velocity graph = distance travelled."],
      ["Simple shapes", "🔺", "Constant speed: area is a rectangle, distance = v × t. Speed rising steadily from zero: the area is a triangle, distance = ½ × base × height."],
      ["Opposite of the derivative", "🔁", "Integrating undoes differentiating. Since the derivative of x² is 2x, the area under the line y = 2x from 0 to T is T²."]
    ], () => {
      const k = ri(1, 4) * 2, T = ri(2, 8), v = ri(2, 9), T2 = ri(2, 6), v0 = ri(2, 8), g = ri(1, 4) * 2;
      return pick([
        Q(`A car's speed rises steadily: v = ${k}t (m/s). How far does it go from t = 0 to t = ${T} seconds (m)?`, "🚗", k * T * T / 2, ["Area under a sloping straight line from zero is a triangle.", "Find the final speed first, then take half of base times height.", "Example: v = 4t for 5 s ends at 20 m/s, area = ½·5·20 = 50 m. Now do yours."]),
        Q(`A cyclist rides at a steady ${v} m/s for ${T2} seconds. What is the area under the velocity graph (distance in m)?`, "🚴", v * T2, ["Steady speed makes a rectangle on the graph.", "Area of a rectangle is base times height.", "Example: 6 m/s for 4 s gives 24 m. Now do yours."]),
        Q(`A robot starts at ${v0} m/s and speeds up at ${g} m/s² for ${T2} seconds. How far does it go (m)? (Rectangle plus triangle.)`, "🤖", v0 * T2 + g * T2 * T2 / 2, ["Split the area into a rectangle (the starting speed) and a triangle (the extra speed).", "Rectangle = start speed × time. Triangle = half × time × (acceleration × time).", "Example: start 3 m/s, speed up at 2 m/s², 4 s: 12 + ½·4·8 = 28 m. Now do yours."]),
        Q(`The area under y = ${2 * v} from x = 0 to x = ${T2} is what number?`, "📏", 2 * v * T2, ["A flat line makes a rectangle with the x axis.", "Multiply the height by the width.", "Example: y = 10 from 0 to 3 has area 30. Now do yours."]),
        Q(`The area under y = 2x from x = 0 to x = ${T} equals x² at the end. What is the area?`, "🔁", T * T, ["Integrating 2x gives x².", "Put the end value into x².", "Example: from 0 to 9 the area is 9² = 81. Now do yours."])
      ]);
    }),
    gen("Dot product and work", [
      ["Multiplying vectors", "➡️", "The <b>dot product</b> of A = (a<sub>x</sub>, a<sub>y</sub>) and B = (b<sub>x</sub>, b<sub>y</sub>) is a<sub>x</sub>b<sub>x</sub> + a<sub>y</sub>b<sub>y</sub>. The result is one number, not a vector."],
      ["Work", "🏋️", "<b>Work = F · d</b>. Only the part of the force pointing along the movement does work. Perpendicular vectors have a dot product of zero."],
      ["Length of a vector", "📏", "A vector dotted with itself gives its length squared. For (3, 4): 3² + 4² = 25, so the length is 5."]
    ], () => {
      const ax = ri(1, 6), ay = ri(1, 6), bx = ri(1, 6), by = ri(1, 6), t = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10]]);
      return pick([
        Q(`What is the dot product of (${ax}, ${ay}) and (${bx}, ${by})?`, "⚫", ax * bx + ay * by, ["Multiply matching parts, then add.", "Multiply the x parts together, multiply the y parts together, and add the two results.", "Example: (2, 3) · (4, 5) = 8 + 15 = 23. Now do yours."]),
        Q(`A force (${ax}, ${ay}) newtons moves a crate by (${bx}, ${by}) meters. How much work in joules?`, "📦", ax * bx + ay * by, ["Work is the dot product of force and movement.", "Multiply matching parts of the two vectors, then add.", "Example: F = (3, 1) N, d = (2, 6) m: 6 + 6 = 12 J. Now do yours."]),
        Q(`What is the dot product of (${ax}, 0) and (0, ${by})?`, "⟂", 0, ["These two vectors point along different axes.", "Perpendicular vectors give the same special result every time.", "Example: (5, 0) · (0, 8) = 0 + 0 = 0. Now do yours."]),
        Q(`The length of the vector (${t[0]}, ${t[1]}) is what number?`, "📏", t[2], ["Dot the vector with itself, then take the square root.", "Add the squares of the two parts and find the number that squares to that sum.", "Example: (9, 12) has 81 + 144 = 225, length 15. Now do yours."]),
        Q(`A wall pushes a robot with force (0, ${ay}) N while the robot slides by (${bx}, 0) m. How much work does the wall do (J)?`, "🧱", 0, ["Check if the push points along the movement.", "A force at a right angle to the movement does no work.", "Example: gravity on a ball rolling along a flat floor does no work on it, so W = 0. Now do yours."])
      ]);
    }),
    gen("Complex numbers", [
      ["A number with two parts", "🧮", "A <b>complex number</b> is a + bi, where i is the square root of −1 (so i² = −1). a is the real part, b the imaginary part."],
      ["Adding and size", "➕", "Add real parts to real parts and imaginary parts to imaginary parts: (2 + 3i) + (1 + 4i) = 3 + 7i. The size (magnitude) is √(a² + b²), like the hypotenuse of a triangle."],
      ["Why engineers use them", "🔌", "AC circuits have size and timing. Complex numbers track both at once, so impedance is written like R + jX (engineers write j to avoid mixing up with current i)."]
    ], () => {
      const a1 = ri(1, 9), b1 = ri(1, 9), a2 = ri(1, 9), b2 = ri(1, 9), k = ri(2, 5), t = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17]]);
      return pick([
        Q(`Add (${a1} + ${b1}i) and (${a2} + ${b2}i). What is the real part of the sum?`, "➕", a1 + a2, ["Real parts go with real parts.", "Ignore the i terms and add the plain numbers.", "Example: (4 + 2i) + (5 + 7i) has real part 9. Now do yours."]),
        Q(`Add (${a1} + ${b1}i) and (${a2} + ${b2}i). What is the imaginary part of the sum (the number multiplying i)?`, "➕", b1 + b2, ["The i terms go together.", "Add only the numbers that multiply i.", "Example: (4 + 2i) + (5 + 7i) has imaginary part 9. Now do yours."]),
        Q(`What is the magnitude of ${t[0]} + ${t[1]}i?`, "📏", t[2], ["Magnitude works like the long side of a right triangle.", "Square both parts, add, then take the square root.", "Example: 9 + 12i has 81 + 144 = 225, magnitude 15. Now do yours."]),
        Q(`Multiply ${k} by (${a1} + ${b1}i). What is the imaginary part of the result?`, "✖️", k * b1, ["Multiply both parts by the plain number.", "Only the number attached to i matters here.", "Example: 3 × (2 + 5i) = 6 + 15i, imaginary part 15. Now do yours."]),
        Q("What is i² equal to?", "🧮", "Minus one", ["i is defined as the square root of a negative number.", "Squaring a square root gives back the number under it.", "Example: (√9)² = 9. Likewise i is √(−1), so its square returns what was under the root. Now do yours."], ["Minus one", "One", "Zero", "i"])
      ]);
    }),
    gen("Cables and angles", [
      ["Splitting a cable force", "🪢", "A tilted cable pulls partly up and partly sideways. Up part = T·sin θ, sideways part = T·cos θ, with θ measured from the horizontal."],
      ["Equilibrium", "⚖️", "If a load hangs still, the up pulls add to equal the weight. Two matching cables at 30° each give 2·T·sin 30° = 2·T·0.5 = T, so T = W."],
      ["The 3-4-5 slope", "📐", "A cable that rises 3 while going 4 across has length 5. Up part = (3/5)T and sideways part = (4/5)T. No calculator needed!"]
    ], () => {
      const W = ri(2, 12) * 6, W2 = ri(2, 9) * 10, k = ri(2, 12);
      return pick([
        Q(`A ${W2} N light hangs from two matching cables, each rising 30° above horizontal. What is the tension in each cable (N)? (sin 30° = 0.5)`, "💡", W2, ["Add the up pulls from both cables and set them equal to the weight.", "With sin 30° = 0.5, two cables together pull up with exactly one cable's worth of tension.", "Example: a 40 N lamp on two cables at 30° has T = 40 N. Now do yours."]),
        Q(`A ${W2} N load hangs from the tip of a light strut. One cable rising 30° above horizontal holds it up. What is the cable tension (N)?`, "🏗️", 2 * W2, ["Only the up part of the cable supports the weight.", "Up part = T × 0.5, and it must match the weight.", "Example: a 30 N load gives T × 0.5 = 30, T = 60 N. Now do yours."]),
        Q(`A ${W} N sign hangs from two matching cables, each rising 3 m over 4 m across (length 5 m). What is the tension in each cable (N)?`, "🪧", W * 5 / 6, ["Each cable's up part is a fraction of its tension.", "Two cables share the weight; each carries half, and its up part is three fifths of T.", "Example: 36 N sign: each carries 18 N up, 0.6T = 18, T = 30 N. Now do yours."]),
        Q(`A cable with tension ${5 * k} N rises 3 over 4 across (length 5). What is its sideways (horizontal) pull in newtons?`, "↔️", 4 * k, ["Sideways part uses the across side of the 3-4-5 triangle.", "Horizontal part is the across side divided by the length, times the tension.", "Example: T = 25 N gives (4/5)·25 = 20 N. Now do yours."]),
        Q(`A cable with tension ${5 * k} N rises 3 over 4 across (length 5). How big is its upward pull (N)?`, "⬆️", 3 * k, ["Up part uses the rise side of the 3-4-5 triangle.", "Up part is the rise divided by the length, times the tension.", "Example: T = 35 N gives (3/5)·35 = 21 N. Now do yours."])
      ]);
    }),
    gen("Distributed loads", [
      ["Load along a beam", "🛤️", "Snow or a crowd spreads weight along a beam. A <b>distributed load</b> of w newtons per meter over length L has total load <b>w × L</b>."],
      ["Where it acts", "📍", "For a flat load, the total acts at the middle of the loaded length. On a beam supported at both ends, each support carries half: w·L/2."],
      ["Maximum bending", "〰️", "A simply supported beam with a flat load bends most in the middle, with bending moment w·L²/8."]
    ], () => {
      const w = ri(1, 6) * 2, L = pick([2, 4, 6, 8, 10]), x = ri(1, 3);
      return pick([
        Q(`A beam carries ${w} N per meter over ${L} m. What is the total load (N)?`, "🛤️", w * L, ["Load per meter times the number of meters.", "Multiply the two numbers in the question.", "Example: 5 N/m over 6 m = 30 N. Now do yours."]),
        Q(`A ${L} m beam is supported at each end and carries ${w} N/m along its whole length. What force does each support carry (N)?`, "⚖️", w * L / 2, ["Find the total load first.", "The two supports share it equally, so divide the total by two.", "Example: 4 N/m over 10 m = 40 N total, each end 20 N. Now do yours."]),
        Q(`A flat load covers the whole of a ${L * 2} m beam. How many meters from the left end does the total load act?`, "📍", L, ["A flat load acts at its balance point.", "That point is halfway along the loaded length.", "Example: for a 14 m load, it acts 7 m from the end. Now do yours."]),
        Q(`A simply supported ${L * 2} m beam carries ${w} N/m. Its maximum bending moment is w·L²/8. What is it (N·m)?`, "〰️", w * L * L * 4 / 8, ["Use the formula in the question.", "Square the length first, then multiply by the load per meter and divide by eight.", "Example: w = 2, L = 4: 2·16/8 = 4 N·m. Now do yours."]),
        Q(`A shelf of ${L} m has books weighing ${w * x} N per meter. What is the total weight (N)?`, "📚", w * x * L, ["Weight per meter times length.", "Multiply the load per meter by the shelf length.", "Example: 8 N/m on a 3 m shelf is 24 N. Now do yours."])
      ]);
    }),
    gen("Series-parallel networks", [
      ["Series and parallel", "🔌", "In <b>series</b>, resistances add: R = R₁ + R₂. In <b>parallel</b>, current has more paths, so total resistance is smaller. Two equal resistors R in parallel give R/2."],
      ["Mixed circuits", "🧩", "Solve the parallel part first, treat it as one resistor, then add it in series with the rest. Draw the circuit again after each step."],
      ["Then current", "⚡", "Once you have the total resistance, I = V ÷ R gives the current drawn from the battery."]
    ], () => {
      const r1 = ri(1, 8), h = ri(1, 6), V = ri(2, 6), r = ri(2, 9);
      const Rt = r1 + h;
      return pick([
        Q(`A ${r1} Ω resistor is in series with two ${2 * h} Ω resistors in parallel. What is the total resistance (Ω)?`, "🔌", Rt, ["Do the parallel pair first.", "Two equal resistors in parallel give half of one. Then add the series resistor.", "Example: 3 Ω in series with two 8 Ω in parallel: 4 + 3 = 7 Ω. Now do yours."]),
        Q(`A ${r1} Ω resistor is in series with two ${2 * h} Ω resistors in parallel, connected to ${Rt * V} V. What current flows from the battery (A)?`, "🔋", V, ["First find the total resistance, then use Ohm's law.", "Current is voltage divided by total resistance.", "Example: total 6 Ω on 30 V gives 5 A. Now do yours."]),
        Q(`Two ${2 * r} Ω resistors in parallel are followed by another two ${2 * r} Ω in parallel, all in series. What is the total (Ω)?`, "🧩", 2 * r, ["Each parallel pair acts like one smaller resistor.", "Each pair is half of one resistor. Then add the two pairs.", "Example: pairs of 10 Ω give 5 + 5 = 10 Ω. Now do yours."]),
        Q(`Three resistors of ${r} Ω, ${r1} Ω and ${h} Ω are all in series. What is the total (Ω)?`, "➕", r + r1 + h, ["Series resistors simply add.", "Add all three values.", "Example: 2, 3 and 4 Ω in series total 9 Ω. Now do yours."]),
        Q(`Two ${r * 2} Ω resistors in parallel have a total of what (Ω)?`, "↔️", r, ["More paths for the current means less resistance than one resistor alone.", "Equal resistors in parallel share the current equally, so the total is one resistor divided by how many.", "Example: two 12 Ω in parallel give 6 Ω. Now do yours."])
      ]);
    }),
    gen("Real batteries and internal resistance", [
      ["Not a perfect source", "🔋", "A real battery has a voltage (EMF) <b>E</b> and a small <b>internal resistance r</b>. When current I flows, some voltage is lost inside: V<sub>terminal</sub> = E − I·r."],
      ["Short circuit", "⚠️", "If the terminals are joined by a wire, the current is limited only by r: I = E ÷ r. That large current heats the battery dangerously, so fuses are used."],
      ["Why it matters", "📱", "Cold or old batteries have higher r, so the voltage sags when a heavy load switches on."]
    ], () => {
      const E = ri(3, 12), r = ri(1, 3), I = ri(1, 3);
      const E2 = (I * r) + ri(3, 10);
      return pick([
        Q(`A battery with E = ${E2} V and internal resistance ${r} Ω supplies ${I} A. What is the terminal voltage (V)?`, "🔋", E2 - I * r, ["Some voltage is used up inside the battery.", "Subtract (current × internal resistance) from E.", "Example: E = 12 V, r = 2 Ω, I = 3 A: 12 − 6 = 6 V. Now do yours."]),
        Q(`A battery has E = ${E * r} V and internal resistance ${r} Ω. What current flows if the terminals are shorted (A)?`, "⚠️", E, ["With a short circuit, only the inside resistance limits current.", "Divide E by the internal resistance.", "Example: E = 24 V, r = 4 Ω: 6 A. Now do yours."]),
        Q(`A battery reads ${E2 - I * r} V at its terminals while supplying ${I} A, and its internal resistance is ${r} Ω. What is its EMF E (V)?`, "🔍", E2, ["E is the voltage before losses inside the battery.", "Add back the lost volts (I × r) to the terminal reading.", "Example: terminal 9 V, I = 2 A, r = 1 Ω: E = 11 V. Now do yours."]),
        Q(`A battery with E = ${E2} V and r = ${r} Ω is connected to no load (no current). What does a voltmeter read (V)?`, "📟", E2, ["With no current, nothing is lost inside.", "The loss term I × r becomes zero.", "Example: a 9 V battery with no load reads 9 V. Now do yours."])
      ]);
    }),
    gen("The first law of thermodynamics", [
      ["Energy is conserved", "🔥", "The <b>first law</b>: the change in a system's internal energy equals heat added minus work done by the system. <b>ΔU = Q − W</b>."],
      ["Reading the signs", "➕", "Heat added to the system: Q is positive. Work done BY the gas pushing a piston: W is positive. So adding heat raises energy, and doing work takes energy away."],
      ["Special cases", "🧊", "No heat flow (insulated, adiabatic): Q = 0, so ΔU = −W. Nothing moves (rigid container): W = 0, so ΔU = Q."]
    ], () => {
      const Q1 = ri(3, 9) * 100, W = ri(1, 2) * 100, U = ri(2, 8) * 100;
      return pick([
        Q(`A gas absorbs ${Q1} J of heat and does ${W} J of work on a piston. By how many joules does its internal energy rise?`, "🔥", Q1 - W, ["Use ΔU = Q − W.", "Take the heat in and subtract the work the gas does.", "Example: 900 J in, 300 J of work out: ΔU = 600 J. Now do yours."]),
        Q(`A rigid sealed tank is heated with ${Q1} J. By how many joules does its internal energy rise?`, "🥫", Q1, ["A rigid tank cannot move, so it does no work.", "With zero work, the heat goes straight into internal energy.", "Example: heating a rigid can with 500 J raises U by 500 J. Now do yours."]),
        Q(`A gas has its internal energy rise by ${U} J while it does ${W} J of work. How much heat was added (J)?`, "🧮", U + W, ["Rearrange ΔU = Q − W.", "Heat is the energy change plus the work done by the gas.", "Example: ΔU = 400 J, W = 100 J: Q = 500 J. Now do yours."]),
        Q(`An insulated gas expands and does ${Q1} J of work with no heat flow. By how many joules does its internal energy fall?`, "💨", Q1, ["Insulated means no heat flows in or out.", "With Q = 0, the work comes entirely from internal energy.", "Example: an insulated gas doing 250 J of work loses 250 J of internal energy. Now do yours."]),
        Q("A gas gives off heat while being squeezed with no work done by it. Its internal energy...", "🧊", "Falls", ["Heat leaving the system lowers its energy.", "With no work by the gas, only the heat term matters.", "Example: a hot cup cooling loses energy to the air. Now do yours."], ["Falls", "Rises", "Stays the same"])
      ]);
    }),
    gen("Gas laws and temperature", [
      ["Use kelvin", "🌡️", "Gas laws need absolute temperature. <b>Kelvin = °C + 273</b>. So 27 °C is 300 K. Zero kelvin is the coldest possible temperature."],
      ["Rigid container", "🥫", "If volume is fixed, pressure is proportional to temperature: <b>P₂ = P₁ × T₂ ÷ T₁</b> (in kelvin). Double the kelvin temperature and the pressure doubles."],
      ["Constant pressure", "🎈", "If pressure stays the same (a loose balloon), volume is proportional to temperature: V₂ = V₁ × T₂ ÷ T₁."]
    ], () => {
      const C = pick([27, 47, 77, 127, 7, 17]), P = ri(1, 6) * 100, k = pick([2, 3]), T1 = pick([200, 300, 400]), V = ri(2, 9) * 10;
      return pick([
        Q(`Convert ${C} °C to kelvin.`, "🌡️", C + 273, ["Kelvin starts at absolute zero.", "Add the fixed offset to the Celsius value.", "Example: 20 °C + 273 = 293 K. Now do yours."]),
        Q(`A sealed rigid can of gas at ${T1} K has pressure ${P} kPa. It is heated to ${k * T1} K. What is the new pressure (kPa)?`, "🥫", P * k, ["Pressure is proportional to kelvin temperature at fixed volume.", "Multiply by the ratio of new temperature to old temperature.", "Example: 100 kPa at 200 K heated to 600 K gives 300 kPa. Now do yours."]),
        Q(`A balloon at constant pressure holds ${V} liters at ${T1} K. It is warmed to ${k * T1} K. What is its new volume (liters)?`, "🎈", V * k, ["At constant pressure volume follows temperature in kelvin.", "Multiply by the temperature ratio.", "Example: 15 L at 100 K heated to 200 K becomes 30 L. Now do yours."]),
        Q(`A rigid sealed tank of gas at ${k * T1} K has pressure ${P * k} kPa. It cools to ${T1} K. What is the new pressure (kPa)?`, "❄️", P, ["Cooling lowers the pressure.", "Multiply by the ratio of new temperature to old temperature.", "Example: 300 kPa at 600 K cooling to 200 K gives 100 kPa. Now do yours."])
      ]);
    }),
    mcl("Entropy and the second law", [
      ["Heat flows downhill", "🌡️", "The <b>second law of thermodynamics</b>: heat flows by itself from hot to cold, never the other way, unless you do work (like a refrigerator)."],
      ["Entropy", "🌀", "<b>Entropy</b> measures how spread out or disordered energy is. In any real process, total entropy stays the same or grows. It never shrinks overall."],
      ["No perfect engine", "⚙️", "No heat engine can turn all heat into work. Some heat must go out to a cold place. That is why even good engines are never 100% efficient."]
    ], ["Think about which way heat or disorder naturally goes.", "The second law says the total of the universe cannot go backwards on its own.", "Example: a hot cup of tea cools in a cold room, never heats itself up. Now try yours."], [
      ["A cup of hot tea sits in a cool room. Heat flows...", "From the tea to the air", "From the air to the tea", "Nowhere"],
      ["Total entropy of the universe in any real process...", "Increases or stays the same", "Always decreases", "Always stays at zero"],
      ["A perfect heat engine that turns 100% of heat into work is...", "Impossible by the second law", "Common in cars", "Easy with good oil"],
      ["Which process needs work to happen?", "Moving heat from a cold fridge to a warm room", "An ice cube melting in a warm room", "A hot pan cooling"],
      ["Entropy is a measure of...", "Disorder or spread of energy", "Only the mass of a gas", "Only the color of a metal"],
      ["Why is an engine never 100% efficient?", "Some heat must be rejected to a cold place", "Engines are too small", "Gravity blocks it"],
      ["Which is an example of entropy increasing?", "A dropped glass breaking", "A broken glass jumping back together", "A messy room tidying itself"],
      ["A refrigerator needs electricity because...", "Moving heat from cold to hot does not happen by itself", "Cold is a fluid", "Food makes heat"],
      ["Mixing hot and cold water gives...", "Warm water that will not separate again", "Hot and cold layers by themselves", "Ice"]
    ]),
    gen("Heat through a wall", [
      ["Thermal resistance", "🧱", "A wall resists heat flow. Each layer has a <b>thermal resistance R</b> (in m²·K/W). Layers in a row add: R<sub>total</sub> = R₁ + R₂ + R₃."],
      ["Heat flow", "🔥", "Heat flow per square meter = <b>ΔT ÷ R<sub>total</sub></b> (in W/m²), where ΔT is the temperature difference across the wall."],
      ["Insulation", "🏠", "A thick layer with a high R, like foam or fiberglass, slows heat leaving a house. Doubling the insulation R roughly halves the heat loss."]
    ], () => {
      const r1 = ri(1, 3), r2 = ri(1, 4), r3 = ri(1, 5), k = ri(2, 12), dT = ri(1, 5) * 10;
      const Rt = r1 + r2 + r3;
      return pick([
        Q(`A wall has layers with R = ${r1}, ${r2} and ${r3} m²·K/W. What is the total R?`, "🧱", Rt, ["Layers in a row add.", "Add all three R values.", "Example: layers of 1, 2 and 4 give R = 7. Now do yours."]),
        Q(`A wall has total R = ${Rt} m²·K/W, with ${k * Rt} °C difference across it. What is the heat flow (W per square meter)?`, "🔥", k, ["Heat flow is the temperature difference divided by resistance.", "Divide the temperature difference by the total R.", "Example: ΔT = 30 °C, R = 6: heat flow 5 W/m². Now do yours."]),
        Q(`A wall with R = ${Rt} m²·K/W loses ${k} W per square meter. What is the temperature difference across it (°C)?`, "🌡️", k * Rt, ["Rearrange the heat flow rule.", "Multiply the heat flow by the total resistance.", "Example: 4 W/m² with R = 5 means ΔT = 20 °C. Now do yours."]),
        Q(`Heat flow through a wall is ${dT} W/m² with R = ${r3 * 2}. If the R is doubled, what is the new heat flow? (Same ΔT; answer W/m².)`, "🏠", dT / 2, ["More insulation means less heat flow.", "Heat flow and resistance move in opposite ways.", "Example: 30 W/m² with double R becomes 15 W/m². Now do yours."])
      ]);
    }),
    gen("Hooke's law for materials", [
      ["Stress and strain", "🏋️", "<b>Stress σ</b> = force ÷ area. <b>Strain ε</b> = change in length ÷ original length. Strain has no units."],
      ["Young's modulus", "📏", "In the elastic range stress and strain are proportional: <b>σ = E × ε</b>. E (<b>Young's modulus</b>) tells how stiff a material is. Large E means very stiff."],
      ["Units trick", "🔧", "E in GPa and strain in thousandths (0.001) give stress in MPa directly: E = 50 GPa and strain 2 thousandths gives 100 MPa."]
    ], () => {
      const E = pick([20, 50, 70, 100, 200]), n = ri(1, 5), A = ri(1, 5) * 100, s0 = ri(2, 9), LL = pick([1000, 2000, 4000]), m1 = ri(1, 5);
      return pick([
        Q(`A rod has E = ${E} GPa and is stretched to a strain of ${n} thousandths (0.00${n}). What is the stress (MPa)?`, "🧵", E * n, ["Use stress = E × strain.", "With GPa and thousandths, the two numbers simply multiply.", "Example: E = 30 GPa, strain 4 thousandths gives 120 MPa. Now do yours."]),
        Q(`A rod has E = ${E} GPa and carries ${E * n} MPa of stress. What is the strain, in thousandths?`, "📏", n, ["Rearrange stress = E × strain.", "Divide stress by E.", "Example: 160 MPa with E = 40 GPa gives 4 thousandths. Now do yours."]),
        Q(`A ${s0 * A} N force pulls on a bar of cross-section ${A} mm². What is the stress (N/mm², which equals MPa)?`, "🏋️", s0, ["Stress is force over area.", "Divide the force by the area.", "Example: 600 N over 200 mm² is 3 MPa. Now do yours."]),
        Q(`A bar is ${LL} mm long and stretches by ${m1 * LL / 1000} mm. What is the strain, in thousandths? (Stretch ÷ length × 1000.)`, "🧵", m1, ["Strain is a ratio of two lengths.", "Divide the stretch by the original length, then convert to thousandths.", "Example: 2 mm on a 1000 mm bar is 2 thousandths. Now do yours."]),
        Q("Steel has a much larger E than rubber. Which one is stiffer?", "🔩", "Steel", ["A bigger E means less strain for the same stress.", "Think about which material barely stretches under a load.", "Example: a steel ruler barely bends compared with a rubber one. Now do yours."], ["Steel", "Rubber", "They are equal"])
      ]);
    }),
    mcl("Choosing metals", [
      ["Steel and iron", "🔩", "<b>Steel</b> is iron with a little carbon. It is strong, stiff and cheap, so it is used in bridges and cars. Plain steel rusts unless it is coated or alloyed (stainless steel adds chromium)."],
      ["Light metals", "✈️", "<b>Aluminium</b> is light and resists rusting; it is used in aircraft and cans. <b>Titanium</b> is strong, light and corrosion-resistant but costly."],
      ["Copper", "🔌", "<b>Copper</b> is an excellent conductor of electricity and heat, so it is used in wires and pipes. Engineers match the metal to the job: strength, weight, cost, corrosion, conductivity."]
    ], ["Match the job to the key property: weight, conduction, strength or cost.", "Ask what matters most for this use, and which metal is known for that.", "Example: electric wire needs high conductivity, so copper beats steel. Now try yours."], [
      ["Which metal is a very good electrical conductor used in wires?", "Copper", "Steel", "Lead glass"],
      ["Which is light and widely used for aircraft bodies?", "Aluminium alloy", "Cast iron", "Lead"],
      ["Stainless steel resists rust because it contains...", "Chromium", "Sugar", "Extra water"],
      ["Which is strong, light and corrosion-resistant but costly?", "Titanium", "Plain steel", "Tin"],
      ["For a cheap, strong bridge girder, engineers often choose...", "Steel", "Gold", "Titanium"],
      ["Steel is mostly iron plus a little...", "Carbon", "Helium", "Wood"],
      ["Why are cooking pans often made with copper or aluminium?", "They conduct heat well", "They are transparent", "They are magnetic"],
      ["A metal part must be very light but strong. Which pair of properties matters?", "High strength for low weight", "Only low price", "Only color"],
      ["Plain steel left outside in wet weather will...", "Rust", "Turn to gold", "Get lighter in color only"]
    ]),
    mcl("Prototypes and iteration", [
      ["Build to learn", "🛠️", "A <b>prototype</b> is an early version made to test an idea. A <b>proof of concept</b> shows the idea can work. Later prototypes look and work more like the final product."],
      ["Fail early", "🔁", "Finding mistakes in a cheap prototype costs far less than finding them after thousands of products are made. Design is a loop: build, test, learn, improve."],
      ["Test with users", "🧑‍🤝‍🧑", "Real users show problems the designers did not expect. Engineers write down results, change one thing at a time, and test again."]
    ], ["Think about why people build early versions before the final product.", "Changing a design early is cheaper than changing it late.", "Example: a cardboard model of a chair shows if it is comfortable before any wood is cut. Now try yours."], [
      ["A prototype is...", "An early model made to test an idea", "The final product", "A broken product"],
      ["The best time to find a design mistake is...", "Early, with a cheap prototype", "After mass production", "Never"],
      ["The design loop is...", "Build, test, learn, improve", "Guess and never check", "Copy and stop"],
      ["A proof of concept shows...", "The idea can work", "The product is finished", "The price is final"],
      ["When testing changes, it is best to change...", "One thing at a time", "Everything at once", "Nothing"],
      ["Why test a prototype with real users?", "They find problems you did not expect", "To make them pay", "To avoid writing results"],
      ["A cardboard model of a gadget is a good first prototype because it is...", "Cheap and quick to change", "Perfect and permanent", "Hard to adjust"],
      ["After a test fails, a good engineer...", "Studies why and improves the design", "Hides the result", "Quits the project"],
      ["Each new prototype usually is...", "Closer to the final product", "Exactly the same as before", "Worse on purpose"]
    ]),
    mcl("Life-cycle and sustainability", [
      ["Whole life", "♻️", "A <b>life-cycle</b> view looks at a product from raw materials, making, using, to throwing away or recycling. Most energy may be used while the product runs, not when it is made."],
      ["Reduce, reuse, recycle", "🔁", "Good design uses less material, lasts longer, can be repaired and can be taken apart for recycling. This is called <b>sustainable design</b>."],
      ["Trade-offs", "⚖️", "A lighter car saves fuel but may cost more to make. Engineers weigh costs for people, the environment and money over the whole life, not just the price tag."]
    ], ["Think about the whole life of the product, not only the buying moment.", "Sustainable design saves resources, energy and waste over time.", "Example: a phone that is easy to repair keeps its materials in use longer. Now try yours."], [
      ["A life-cycle assessment looks at...", "A product from raw materials to disposal", "Only the shop price", "Only the factory"],
      ["Which design choice is more sustainable?", "A product that can be repaired", "A product glued so it cannot be opened", "A product that breaks in a week"],
      ["For a refrigerator, most energy is usually used...", "While running in homes", "While being shipped", "In the paint shop"],
      ["Recycling aluminium is helpful because it...", "Saves a lot of energy compared with making new", "Makes it heavier", "Turns it into steel"],
      ["Using less material to do the same job is called...", "Reducing", "Wasting", "Delaying"],
      ["A product designed to be taken apart helps...", "Recycling", "Rust", "Noise"],
      ["Engineers weigh cost, safety and effect on the environment. This is a...", "Trade-off", "Mistake", "Coincidence"],
      ["A longer-lasting product usually...", "Reduces waste over time", "Increases waste", "Has no effect"],
      ["LED bulbs use less electricity than old filament bulbs, so they...", "Lower energy use over their life", "Cannot light rooms", "Need to be bigger"]
    ]),
    gen("Measurement uncertainty", [
      ["Every measurement has doubt", "📏", "A reading like 50 ± 1 mm means the true value is probably between 49 and 51 mm. The ± part is the <b>uncertainty</b>."],
      ["Percent uncertainty", "💯", "<b>Percent uncertainty = (uncertainty ÷ reading) × 100</b>. 1 mm in 50 mm is 2%. Longer readings with the same ± are more precise in percent."],
      ["Adding measurements", "➕", "When you add or subtract measurements, the uncertainties add: (20 ± 1) + (30 ± 2) = 50 ± 3. Doubts pile up, even when subtracting."]
    ], () => {
      const px = pick([[20, 1], [25, 1], [40, 2], [50, 1], [100, 2], [200, 4], [50, 5]]), a1 = ri(10, 40), u1 = ri(1, 3), a2 = ri(10, 40), u2 = ri(1, 3), n = ri(2, 5);
      return pick([
        Q(`A length is measured as ${px[0]} ± ${px[1]} mm. What is the percent uncertainty? Type just the number.`, "📏", 100 * px[1] / px[0], ["Divide the ± part by the reading.", "Then multiply that fraction by one hundred.", "Example: 5 ± 1 is 1 ÷ 5 × 100 = 20%. Now do yours."]),
        Q(`A plate is ${a1} ± ${u1} mm wide and another plate is ${a2} ± ${u2} mm wide. Placed side by side, what is the uncertainty of the total width (± mm)?`, "📐", u1 + u2, ["When you add measurements, the doubts add up too.", "Add the two ± values.", "Example: (10 ± 1) + (20 ± 2) has ± 3. Now do yours."]),
        Q(`You subtract two lengths: (${a1 + a2} ± ${u1}) − (${a2} ± ${u2}) mm. What is the uncertainty of the difference (± mm)?`, "➖", u1 + u2, ["Subtracting does not cancel the doubts.", "Even for subtraction, add the ± values.", "Example: (30 ± 1) − (10 ± 2) = 20 ± 3. Now do yours."]),
        Q(`Each of ${n} stacked sheets is measured as thick ± ${u1} mm. If you add all ${n} readings, what is the total uncertainty (± mm)?`, "📚", n * u1, ["Each reading brings its own doubt.", "Add the doubt once for each sheet.", "Example: 4 sheets with ± 2 each give ± 8. Now do yours."]),
        Q("Which is the more precise measurement?", "🎯", "100 ± 1 mm", ["Compare the size of the doubt compared with the reading.", "A smaller percent uncertainty means a more precise measurement.", "Example: 1 in 100 is better than 1 in 10. Now do yours."], ["100 ± 1 mm", "10 ± 1 mm", "They are equal"])
      ]);
    })
  ];
  a[18] = mix("Mixed practice", at(a, [0, 1, 3, 5, 7, 9, 10, 12, 13, 17]));
  a[19] = mix("Level 25 Challenge", at(a, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));

  // ================= LEVEL 26 =================
  const b = [
    gen("Finding the best: optimization", [
      ["Max and min", "⛰️", "To find the best (largest or smallest) value, find where the <b>slope is zero</b>: take the derivative and set it to 0."],
      ["Example", "📐", "f(x) = 10x − x² has slope 10 − 2x. Zero when x = 5. The best value is f(5) = 50 − 25 = 25."],
      ["Fencing", "🔲", "With a fixed amount of fence, a square encloses the most area of all rectangles. Side = fence ÷ 4."]
    ], () => {
      const h = ri(2, 9), P = ri(2, 8) * 4, c = ri(1, 4);
      return pick([
        Q(`f(x) = ${2 * h}x − x². At which x is f largest?`, "⛰️", h, ["The top of the curve has slope zero.", "The derivative is the plain number minus 2x. Set it equal to 0.", "Example: f(x) = 12x − x² has slope 12 − 2x, zero at x = 6. Now do yours."]),
        Q(`f(x) = ${2 * h}x − x². What is the largest value of f?`, "🏔️", h * h, ["First find the x where the slope is zero.", "Then put that x back into f.", "Example: f(x) = 8x − x² peaks at x = 4, where f = 32 − 16 = 16. Now do yours."]),
        Q(`You have ${P} m of fence to enclose a rectangle on all four sides. What side length of a square gives the largest area (m)?`, "🔲", P / 4, ["The best rectangle is a square.", "A square has four equal sides sharing the fence.", "Example: 20 m of fence gives 5 m sides. Now do yours."]),
        Q(`You have ${P} m of fence for a square. What is the largest area it encloses (m²)?`, "🟩", (P / 4) ** 2, ["Find the side length first.", "Then square it.", "Example: 12 m of fence gives side 3, area 9. Now do yours."]),
        Q(`The cost of a part is C = x² − ${2 * c * h}x + ${100}. At which x is the cost smallest?`, "💲", c * h, ["The bottom of a valley has slope zero.", "Set the derivative to zero. The derivative has a 2x and a plain number.", "Example: C = x² − 14x + 60 is lowest at x = 7. Now do yours."])
      ]);
    }),
    gen("Integrals of simple powers", [
      ["Reverse the power rule", "🔁", "To integrate x<sup>n</sup>, <b>raise the power by one and divide by the new power</b>: ∫x<sup>n</sup> dx = x<sup>n+1</sup> ÷ (n+1)."],
      ["Area from 0 to T", "📊", "The area under y = c·x<sup>n</sup> from 0 to T is c·T<sup>n+1</sup> ÷ (n+1). Example: y = 3x² gives T³."],
      ["Use in engineering", "🔋", "Add up a changing power over time and you get energy. Add up a changing force over distance and you get work."]
    ], () => {
      const n = ri(1, 3), m = ri(1, 4), T = ri(2, 4), c = ri(1, 3) * 2;
      return pick([
        Q(`Find the area under y = ${(n + 1) * m}x<sup>${n}</sup> from x = 0 to x = ${T}.`, "📊", m * T ** (n + 1), ["Raise the power by one and divide by the new power.", "The number in front divided by the new power simplifies neatly. Then put in the end value.", "Example: y = 6x² from 0 to 2: 6/3 · 2³ = 16. Now do yours."]),
        Q(`A force F = ${c}x newtons pushes a cart from x = 0 to x = ${T * 2} m. How much work does it do in joules? (Area under the force graph.)`, "🛒", c * T * T * 2, ["Work is the area under a force-distance graph.", "A rising straight line from zero makes a triangle, or integrate x to get half of x squared.", "Example: F = 4x for 3 m: ½ · 3 · 12 = 18 J. Now do yours."]),
        Q(`Power rises as P = ${2 * m}t watts. How much energy (J) is used from t = 0 to t = ${T} s?`, "🔌", m * T * T, ["Energy is the area under the power-time graph.", "Integrate t to get t squared over two.", "Example: P = 6t for 2 s gives 6 · 4 / 2 = 12 J. Now do yours."]),
        Q(`Integrate: what is the power of x after integrating x<sup>${n}</sup>?`, "🔢", n + 1, ["Integrating is the opposite of differentiating.", "The power goes up by a fixed step.", "Example: integrating x<sup>5</sup> gives x<sup>6</sup>/6. Now do yours."]),
        Q(`The area under the constant y = ${c} from x = 0 to x = ${T} is what?`, "📏", c * T, ["A constant height makes a rectangle.", "Multiply the height by the width.", "Example: y = 4 from 0 to 5 gives 20. Now do yours."])
      ]);
    }),
    gen("Average and instantaneous rates", [
      ["Two kinds of speed", "⏱️", "<b>Average rate</b> = change ÷ time taken over an interval. <b>Instantaneous rate</b> is the derivative: the rate at one exact moment."],
      ["Example", "🚗", "If x = 2t², from t = 1 to t = 3 the position goes from 2 to 18, so the average speed is 16 ÷ 2 = 8. The instantaneous speed at t = 2 is 4t = 8 as well; the average of a parabola matches its middle."],
      ["Why both matter", "📈", "Sensors give you data at points, so you often compute average rates between readings. Shorter intervals give a closer match to the instantaneous rate."]
    ], () => {
      const a = ri(1, 5), t1 = ri(1, 4), t2 = t1 + ri(1, 4), x1 = ri(2, 9) * 10, d = ri(2, 9), dt = ri(2, 6);
      return pick([
        Q(`A part's position is x = ${a}t² (m). What is its average speed from t = ${t1} s to t = ${t2} s (m/s)?`, "📍", a * (t1 + t2), ["Find the position at both times, subtract, and divide by the time between.", "For x = a·t², the change in x equals a times (t₂² − t₁²).", "Example: x = 3t² from 1 to 3: (27 − 3) ÷ 2 = 12 m/s. Now do yours."]),
        Q(`A part's position is x = ${a}t². What is its instantaneous speed at t = ${t2} s (m/s)?`, "🎯", 2 * a * t2, ["Instantaneous speed is the derivative of position.", "The derivative of a t-squared term is two times its number times t.", "Example: x = 3t² at t = 4 gives 24 m/s. Now do yours."]),
        Q(`A sensor reads position ${x1} m at ${t1} s and ${x1 + d * dt} m at ${t1 + dt} s. What is the average speed (m/s)?`, "📟", d, ["Average speed is change in position divided by change in time.", "Subtract the two positions, then divide by the time gap.", "Example: 10 m to 40 m in 6 s gives 5 m/s. Now do yours."]),
        Q("Which gives the speed at one exact moment?", "⏱️", "The derivative", ["Think about the rate at a single instant, not over an interval.", "It comes from the slope of the position graph at one point.", "Example: a car's speedometer shows speed at this moment. Now do yours."], ["The derivative", "The average over an hour", "The total distance"])
      ]);
    }),
    gen("Determinants and matrix products", [
      ["A 2 × 2 matrix", "🔲", "A <b>matrix</b> is a box of numbers. For [a b; c d], the <b>determinant</b> is ad − bc. A system of equations has a unique solution when the determinant is not zero."],
      ["Matrix times vector", "✖️", "[a b; c d] × (x, y) = (ax + by, cx + dy). Engineers use matrices to rotate, scale and move shapes, and to solve circuits with many unknowns."],
      ["Zero determinant", "⚠️", "If ad − bc = 0, the rows are copies of each other (like two identical equations), so the system has no single answer."]
    ], () => {
      const a1 = ri(3, 9), d1 = ri(3, 9), b1 = ri(1, 2), c1 = ri(1, 2), x = ri(1, 5), y = ri(1, 5);
      return pick([
        Q(`What is the determinant of [${a1} ${b1}; ${c1} ${d1}]?`, "🔲", a1 * d1 - b1 * c1, ["Multiply along the main diagonal, then subtract the other diagonal.", "ad − bc: the top-left times the bottom-right, minus the other pair.", "Example: [5 2; 1 4] has 20 − 2 = 18. Now do yours."]),
        Q(`Multiply [${a1} ${b1}; ${c1} ${d1}] by the vector (${x}, ${y}). What is the top entry of the result?`, "✖️", a1 * x + b1 * y, ["The top entry uses the top row.", "Top row times the vector: first number times x plus second number times y.", "Example: [2 3; 1 4] times (1, 2) has top entry 2 + 6 = 8. Now do yours."]),
        Q(`Multiply [${a1} ${b1}; ${c1} ${d1}] by the vector (${x}, ${y}). What is the bottom entry of the result?`, "✖️", c1 * x + d1 * y, ["The bottom entry uses the bottom row.", "Bottom row times the vector: first number times x plus second number times y.", "Example: [2 3; 1 4] times (1, 2) has bottom entry 1 + 8 = 9. Now do yours."]),
        Q(`The determinant of [${a1} ${a1 * 2}; ${d1} ${d1 * 2}] is what?`, "⚠️", 0, ["Check if one column is a copy of the other, scaled.", "Compute ad − bc; the two products match.", "Example: [1 2; 3 6] has 6 − 6 = 0. Now do yours."])
      ]);
    }),
    gen("Ramps and slopes", [
      ["Ramps help", "🛝", "On a smooth ramp, you only need to push the part of the weight that points down the slope. For a 30° ramp, that is W × sin 30° = W ÷ 2."],
      ["Mechanical advantage", "⚙️", "A ramp of length L rising height h has mechanical advantage L ÷ h. A longer, gentler ramp needs less force but a longer push."],
      ["Work stays the same", "🔄", "The ramp does not reduce the work: force × distance along the ramp equals the weight × height (if there is no friction)."]
    ], () => {
      const W = ri(2, 12) * 10, h = ri(1, 4), k = ri(2, 6), F = ri(2, 9) * 10;
      return pick([
        Q(`A ${W} N crate sits on a smooth 30° ramp. What force along the ramp holds it still (N)? (sin 30° = 0.5)`, "📦", W / 2, ["Only the part of the weight along the slope needs holding.", "That part is the weight times the sine of the angle.", "Example: a 60 N crate on 30° needs 30 N. Now do yours."]),
        Q(`A ramp is ${h * k} m long and rises ${h} m. What is its mechanical advantage?`, "🛝", k, ["Mechanical advantage is the ramp length divided by the height gain.", "Divide the long length by the short one.", "Example: a 12 m ramp rising 3 m has MA 4. Now do yours."]),
        Q(`A ${F * k} N load is pushed up a smooth ramp with mechanical advantage ${k}. What force is needed (N)?`, "💪", F, ["Mechanical advantage divides the force you need.", "Divide the load by the mechanical advantage.", "Example: 90 N load with MA 3 needs 30 N. Now do yours."]),
        Q(`A ${F} N box is lifted ${h} m straight up by hand. How much work (J) is done lifting it? (Same on a smooth ramp.)`, "🏋️", F * h, ["Work against gravity is weight times height gained.", "Multiply weight by the vertical height.", "Example: 40 N lifted 2 m takes 80 J. Now do yours."]),
        Q("A longer ramp for the same height means...", "🛝", "Less force but a longer push", ["The ramp trades force for distance.", "Work stays the same, so as one grows the other shrinks.", "Example: stairs are steep and short; a wheelchair ramp is long and gentle. Now do yours."], ["Less force but a longer push", "More force over a shorter push", "No change in either"])
      ]);
    }),
    gen("Centroid of a shape", [
      ["Balance point", "⚖️", "The <b>centroid</b> is the balance point of a flat shape. A rectangle's centroid is at its center."],
      ["Joining shapes", "🧩", "For a shape made of parts: x̄ = (A₁x₁ + A₂x₂) ÷ (A₁ + A₂), where A is each part's area and x its centroid position."],
      ["Equal areas", "🔲", "If two parts have equal area, the centroid is simply halfway between them: the average of x₁ and x₂. A bigger part pulls the centroid toward itself."]
    ], () => {
      const x1 = ri(1, 6), x2 = x1 + ri(1, 3) * 2, A = ri(1, 4);
      const pr = until(() => { const p = ri(1, 9), q = ri(1, 9); const s = p * 1 + q * 3; return (s % 4 === 0) ? [p, q] : null; });
      const w = ri(2, 9) * 2;
      return pick([
        Q(`Two equal-area plates have centroids at x = ${x1} cm and x = ${x2} cm. Where is the centroid of the pair (cm)?`, "🧩", (x1 + x2) / 2, ["Equal areas pull equally on the centroid.", "Find the point halfway between the two positions.", "Example: plates at 2 and 8 cm give 5 cm. Now do yours."]),
        Q(`A part with area ${A} cm² has its centroid at x = ${pr[0]} cm. A second part with area ${3 * A} cm² has its centroid at x = ${pr[1]} cm. Where is the combined centroid (cm)?`, "⚖️", (pr[0] + 3 * pr[1]) / 4, ["The bigger part pulls harder.", "Weigh each position by its area, add, then divide by the total area. Here one area is three times the other.", "Example: areas 1 and 3 at x = 2 and x = 6: (2 + 18) ÷ 4 = 5. Now do yours."]),
        Q(`A rectangle is ${w} cm wide, with its left edge at x = 0. Where is its centroid (cm from the left)?`, "▭", w / 2, ["A rectangle is symmetrical.", "The balance point is halfway across.", "Example: a 10 cm wide rectangle has centroid at 5 cm. Now do yours."]),
        Q("If a heavy part is added to one side of a plank, the balance point moves...", "🪵", "Toward the heavy part", ["The bigger part pulls harder.", "Think of a see-saw with a heavy child on one side.", "Example: a hammer's balance point is near its heavy head. Now do yours."], ["Toward the heavy part", "Away from the heavy part", "It never moves"])
      ]);
    }),
    gen("Cantilever beams", [
      ["Fixed at one end", "🏗️", "A <b>cantilever</b> is fixed at one end and free at the other, like a diving board. The wall must resist a force and a turning moment."],
      ["Point load", "⬇️", "A force P at the free tip of length L gives a wall reaction force P and a <b>moment M = P × L</b>."],
      ["Flat load", "🛤️", "A load of w per meter over the whole length totals w·L and acts at L/2, so the wall moment is w·L × L/2 = <b>w·L²/2</b>."]
    ], () => {
      const P = ri(2, 9) * 10, L = ri(2, 6), w = ri(1, 5) * 2, m = ri(2, 8) * 10;
      return pick([
        Q(`A ${P} N load hangs at the tip of a ${L} m cantilever. What is the moment at the wall (N·m)?`, "🏗️", P * L, ["Moment is force times distance.", "Multiply the load by the whole length to the wall.", "Example: 30 N at 4 m gives 120 N·m. Now do yours."]),
        Q(`A ${P} N load hangs at the tip of a cantilever. What vertical force does the wall provide (N)?`, "🧱", P, ["The wall must hold the load up.", "Vertical forces must balance.", "Example: a 55 N tip load needs a 55 N reaction. Now do yours."]),
        Q(`A flat load of ${w} N/m covers a ${L} m cantilever. What is the total load (N)?`, "🛤️", w * L, ["Load per meter times length.", "Multiply the two numbers.", "Example: 4 N/m over 3 m is 12 N. Now do yours."]),
        Q(`A flat load of ${w} N/m covers a ${L} m cantilever. What is the moment at the wall (N·m)? (Use w·L²/2.)`, "🏗️", w * L * L / 2, ["Square the length first.", "Multiply by the load per meter, then halve it.", "Example: w = 2, L = 3: 2·9/2 = 9 N·m. Now do yours."]),
        Q(`A cantilever has a wall moment of ${m * L} N·m from a tip load at ${L} m. What is the tip load (N)?`, "🔍", m, ["Rearrange moment = force × length.", "Divide the moment by the length.", "Example: 120 N·m at 4 m means 30 N. Now do yours."])
      ]);
    }),
    gen("Thevenin equivalent and maximum power", [
      ["Simplify a circuit", "🧠", "<b>Thevenin's theorem</b> says any circuit with sources and resistors, seen from two terminals, acts like one voltage source V<sub>th</sub> in series with one resistor R<sub>th</sub>."],
      ["How to find them", "🔍", "For a source V with R₁ in series and R₂ across the output: V<sub>th</sub> = V × R₂ ÷ (R₁ + R₂), and R<sub>th</sub> = R₁ and R₂ in parallel."],
      ["Maximum power", "⚡", "A load takes the most power when its resistance equals R<sub>th</sub>. Then P<sub>max</sub> = V<sub>th</sub>² ÷ (4 R<sub>th</sub>)."]
    ], () => {
      const [r1, r2] = pick([[6, 3], [3, 6], [4, 4], [12, 4], [6, 12], [10, 10]]);
      const V = ri(1, 4) * 12;
      const vth = V * r2 / (r1 + r2), rth = r1 * r2 / (r1 + r2);
      const vv = pick([4, 8, 12, 16, 20]), rr = pick([1, 2, 4]);
      return pick([
        Q(`A ${V} V source feeds ${r1} Ω in series, with ${r2} Ω across the output. What is V<sub>th</sub> (V)?`, "🔋", vth, ["This is a voltage divider.", "V × (output resistor) ÷ (sum of both resistors).", "Example: 24 V, 4 Ω series, 4 Ω across: 24 × 4 ÷ 8 = 12 V. Now do yours."]),
        Q(`A ${V} V source feeds ${r1} Ω in series, with ${r2} Ω across the output. What is R<sub>th</sub> (Ω)? (Source acts as a plain wire.)`, "🔍", rth, ["Turn the source off; the two resistors then sit side by side as seen from the output.", "Parallel: product divided by sum.", "Example: 6 Ω and 3 Ω in parallel give 18 ÷ 9 = 2 Ω. Now do yours."]),
        Q(`A Thevenin source has R<sub>th</sub> = ${rr} Ω. What load resistance gets the maximum power (Ω)?`, "⚡", rr, ["Max power happens at a match.", "The load should equal the source's own resistance.", "Example: R<sub>th</sub> = 6 Ω → load 6 Ω. Now do yours."]),
        Q(`A Thevenin source has V<sub>th</sub> = ${vv} V and R<sub>th</sub> = ${rr} Ω. What is the maximum power to a load (W)? Use V²/(4R).`, "🔌", vv * vv / (4 * rr), ["Use the maximum power formula.", "Square the voltage; divide by four times the resistance.", "Example: 10 V and 5 Ω: 100 ÷ 20 = 5 W. Now do yours."])
      ]);
    }),
    gen("Reactance", [
      ["Opposition to AC", "〰️", "Coils and capacitors oppose AC current without wasting power as heat. This opposition is <b>reactance</b>, measured in ohms."],
      ["Inductive reactance", "🧲", "<b>X<sub>L</sub> = ω × L</b> (ω is angular frequency in rad/s, L in henries). Bigger frequency or bigger coil gives more opposition."],
      ["Capacitive reactance", "🔋", "<b>X<sub>C</sub> = 1 ÷ (ω × C)</b>. Capacitors oppose low frequencies more; at high frequency they pass signal easily."]
    ], () => {
      const w = pick([100, 200, 500, 1000]), L = pick([10, 20, 50]), w2 = pick([100, 500, 1000]), C = pick([10, 20, 50, 100, 200]);
      return pick([
        Q(`A coil of ${L} mH is used at ω = ${w} rad/s. What is X<sub>L</sub> (Ω)? (mH means thousandths of a henry.)`, "🧲", w * L / 1000, ["Multiply ω by L, in henries.", "Convert millihenries to henries by dividing by one thousand.", "Example: ω = 100, L = 30 mH = 0.03 H gives 3 Ω. Now do yours."]),
        Q(`A capacitor of ${C} µF is used at ω = ${w2} rad/s. What is X<sub>C</sub> (Ω)? (µF means millionths of a farad.)`, "🔋", 1000000 / (w2 * C), ["Multiply ω by C in farads, then take one over that.", "Equivalent: one million divided by (ω times C in µF).", "Example: ω = 1000, C = 100 µF gives 10⁶ ÷ 100000 = 10 Ω. Now do yours."]),
        Q("If frequency goes up, the reactance of an inductor...", "📈", "Goes up", ["X<sub>L</sub> depends directly on ω.", "Think about the formula: ω is multiplied by L.", "Example: doubling ω doubles X<sub>L</sub>. Now do yours."], ["Goes up", "Goes down", "Stays the same"]),
        Q("If frequency goes up, the reactance of a capacitor...", "📉", "Goes down", ["X<sub>C</sub> has ω in the bottom of the fraction.", "Think about what happens to a fraction when its bottom number grows.", "Example: doubling ω halves X<sub>C</sub>. Now do yours."], ["Goes down", "Goes up", "Stays the same"]),
        Q(`A coil has X<sub>L</sub> = ${w * L / 1000} Ω at ω = ${w} rad/s. What is L in mH?`, "🔍", L, ["Rearrange X<sub>L</sub> = ωL.", "Divide X<sub>L</sub> by ω, then convert henries to millihenries.", "Example: X = 3 Ω at ω = 100 gives 0.03 H = 30 mH. Now do yours."])
      ]);
    }),
    gen("Impedance of a series RL circuit", [
      ["Resistance + reactance", "🧩", "In AC, resistance R and reactance X add at a right angle, not straight. The total opposition is <b>impedance Z = √(R² + X²)</b>."],
      ["Ohm's law for AC", "⚡", "V = I × Z. A bigger impedance means less current. Z is always at least as big as R."],
      ["3-4-5 shortcuts", "📐", "Z comes from a right triangle. R = 3, X = 4 gives Z = 5. Multiples work too: 6, 8 → 10; 5, 12 → 13."]
    ], () => {
      const t = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20]]), I = ri(1, 4), k = ri(2, 9);
      return pick([
        Q(`A circuit has R = ${t[0]} Ω and X = ${t[1]} Ω in series. What is the impedance Z (Ω)?`, "🧩", t[2], ["Z is the hypotenuse of a right triangle.", "Square both, add, then take the square root.", "Example: R = 9, X = 12 gives Z = √225 = 15. Now do yours."]),
        Q(`R = ${t[0]} Ω and X = ${t[1]} Ω in series, with a current of ${I} A. What is the voltage across the whole circuit (V)?`, "🔌", t[2] * I, ["First find Z, then use V = I × Z.", "Multiply the current by the impedance.", "Example: Z = 10 Ω, I = 2 A gives 20 V. Now do yours."]),
        Q(`A circuit has Z = ${t[2]} Ω and R = ${t[0]} Ω. What is its reactance X (Ω)?`, "🔍", t[1], ["Rearrange Z² = R² + X².", "X² is Z² minus R². Then take the square root.", "Example: Z = 13, R = 5 gives X² = 169 − 25 = 144, X = 12. Now do yours."]),
        Q(`A circuit has Z = ${t[2]} Ω and is connected to ${t[2] * k} V AC. What current flows (A)?`, "⚡", k, ["Use Ohm's law with impedance.", "Divide the voltage by Z.", "Example: 50 V across Z = 10 Ω gives 5 A. Now do yours."]),
        Q("Which of these is always the biggest: R, X or Z?", "📐", "Z", ["Think about the longest side of a right triangle.", "The hypotenuse is longer than either side.", "Example: in a 3-4-5 triangle, 5 is the longest. Now do yours."], ["Z", "R", "X"])
      ]);
    }),
    gen("Entropy numbers", [
      ["Counting entropy", "🌀", "When heat Q flows at temperature T (in kelvin), entropy changes by <b>ΔS = Q ÷ T</b>, in J/K. Heat leaving a hot place lowers its entropy; heat entering a cold place raises it more."],
      ["Net change", "➕", "Heat Q leaves a hot body at T<sub>h</sub> and enters a cold body at T<sub>c</sub>. Net entropy change = Q/T<sub>c</sub> − Q/T<sub>h</sub>, which is positive."],
      ["Reversible limit", "♻️", "Zero net entropy change would be a perfect (reversible) process. Real processes always make entropy, which is why they are irreversible."]
    ], () => {
      const T = pick([200, 300, 400, 500]), k = ri(1, 6), Th = pick([600, 900, 1200]), Tc = pick([300, 400]);
      const Q1 = pick([3600, 7200]);
      return pick([
        Q(`${T * k} J of heat flows in at ${T} K. What is the entropy gained (J/K)?`, "🌀", k, ["Use ΔS = Q ÷ T.", "Divide heat by the kelvin temperature.", "Example: 600 J at 300 K gives 2 J/K. Now do yours."]),
        Q(`${Q1} J of heat leaves a ${Th} K body. What is the size of the entropy lost by the hot body (J/K)?`, "🔥", Q1 / Th, ["Use ΔS = Q ÷ T for the hot body.", "Divide the heat by the hot temperature.", "Example: 800 J leaving a 400 K block loses 2 J/K. Now do yours."]),
        Q(`${Q1} J of heat flows from a ${Th} K body to a ${Tc} K body. What is the net entropy produced (J/K)?`, "➕", Q1 / Tc - Q1 / Th, ["Find the entropy gained by the cold body and the entropy lost by the hot body.", "Subtract the loss from the gain.", "Example: 600 J from 300 K to 200 K: 3 − 2 = 1 J/K. Now do yours."]),
        Q("Heat flows from a hot body to a cold body. The total entropy...", "📈", "Increases", ["Compare the cold body's gain with the hot body's loss.", "Remember what the second law says.", "Example: a hot pan cooling in a room makes the universe more spread out. Now do yours."], ["Increases", "Decreases", "Stays exactly the same"])
      ]);
    }),
    gen("Work done by an expanding gas", [
      ["Pushing a piston", "🔧", "At constant pressure, a gas does work when it expands: <b>W = P × ΔV</b>. Units: kPa × m³ = kJ."],
      ["On a graph", "📊", "On a pressure-volume graph, work is the <b>area under the curve</b>. A bigger expansion or a higher pressure means more work."],
      ["With the first law", "🔥", "Heat in = change in internal energy + work out: Q = ΔU + W. Heating a gas that expands in a cylinder does both."]
    ], () => {
      const P = pick([100, 200, 300, 500]), dv = ri(1, 9), U = ri(2, 9) * 10;
      const W = P * dv / 10;
      return pick([
        Q(`A gas at ${P} kPa expands by ${dv / 10} m³ at constant pressure. How much work does it do (kJ)?`, "🔧", W, ["Use W = P × ΔV.", "Multiply pressure by the change in volume.", "Example: 200 kPa and 0.5 m³ gives 100 kJ. Now do yours."]),
        Q(`A piston does ${W} kJ of work as its volume grows by ${dv / 10} m³ at constant pressure. What is the pressure (kPa)?`, "🔍", P, ["Rearrange W = P × ΔV.", "Divide the work by the volume change.", "Example: 60 kJ over 0.3 m³ means 200 kPa. Now do yours."]),
        Q(`A gas absorbs heat and its internal energy rises by ${U} kJ while it does ${W} kJ of work. How much heat was added (kJ)?`, "🔥", U + W, ["Use Q = ΔU + W.", "Add the internal energy rise and the work done.", "Example: ΔU = 30 kJ, W = 20 kJ: Q = 50 kJ. Now do yours."]),
        Q(`On a P-V graph, a rectangle is ${P} kPa tall and ${dv / 10} m³ wide. What is the area (kJ)?`, "📊", W, ["Area of a rectangle is height times width.", "That area equals the work done.", "Example: 300 kPa by 0.2 m³ is 60 kJ. Now do yours."])
      ]);
    }),
    gen("Allowable stress and safety factor", [
      ["Yield strength", "🔩", "<b>Yield strength</b> S<sub>y</sub> is the stress where a material starts to bend permanently. Designs stay well below it."],
      ["Allowable stress", "🛡️", "Allowable stress = S<sub>y</sub> ÷ factor of safety (FS). A part can carry a load up to <b>allowable × area</b>."],
      ["Checking a design", "✅", "Actual factor of safety = S<sub>y</sub> ÷ actual stress. A value of 1 is no margin at all; most designs need 2 or more."]
    ], () => {
      const Sy = pick([240, 360, 480]), FS = pick([2, 3, 4]), A = pick([100, 200, 500, 1000]), s = pick([60, 120]);
      const sa = Sy / FS;
      return pick([
        Q(`A steel has yield strength ${Sy} MPa and the design uses a factor of safety of ${FS}. What is the allowable stress (MPa)?`, "🛡️", sa, ["Divide the yield strength.", "Divide by the factor of safety.", "Example: S<sub>y</sub> = 300 MPa and FS = 5 gives 60 MPa. Now do yours."]),
        Q(`The allowable stress is ${sa} MPa and the bar's cross-section is ${A} mm². What is the largest safe load (kN)? (MPa × mm² = N.)`, "🏋️", sa * A / 1000, ["Load = stress × area.", "Multiply, then divide by one thousand to change newtons to kilonewtons.", "Example: 100 MPa on 500 mm² = 50 000 N = 50 kN. Now do yours."]),
        Q(`A bar made of ${Sy} MPa steel works at a stress of ${s} MPa. What is its actual factor of safety?`, "✅", Sy / s, ["Compare the yield strength to the working stress.", "Divide the yield strength by the actual stress.", "Example: 300 MPa steel under 100 MPa has FS 3. Now do yours."]),
        Q("A factor of safety of exactly 1 means...", "⚠️", "No margin before yielding", ["Think about stress compared with the strength limit.", "At a factor of one, working stress equals yield strength.", "Example: a rope loaded to its exact breaking strength has no spare strength. Now do yours."], ["No margin before yielding", "Twice as strong as needed", "The part can never fail"])
      ]);
    }),
    gen("Composite materials", [
      ["Mixing materials", "🧵", "A <b>composite</b> joins two materials, like strong fibers inside a plastic matrix. Fiberglass and carbon fiber are common."],
      ["Rule of mixtures", "⚖️", "A stiffness estimate along the fibers: <b>E = f × E<sub>fiber</sub> + (1 − f) × E<sub>matrix</sub></b>, where f is the fraction of fiber by volume."],
      ["Why use them", "✈️", "Composites can be stiff and strong yet very light. Aircraft, bikes and wind turbine blades use them, but they cost more and are harder to repair."]
    ], () => {
      const f = pick([20, 25, 40, 50, 60, 75]), Ef = pick([100, 200, 300, 400]), Em = pick([20, 40, 60]);
      const E = (f * Ef + (100 - f) * Em) / 100;
      return pick([
        Q(`A composite has ${f}% fibers (E = ${Ef} GPa) and the rest plastic (E = ${Em} GPa). What is its stiffness along the fibers (GPa)?`, "🧵", E, ["Weigh each material's E by its share.", "Fiber share times fiber E, plus plastic share times plastic E.", "Example: 50% of 200 and 50% of 40: 100 + 20 = 120 GPa. Now do yours."]),
        Q(`A composite is half ${Ef} GPa fibers and half ${Em} GPa plastic. What is its E (GPa)?`, "⚖️", (Ef + Em) / 2, ["With equal shares, the answer is halfway between.", "Average the two stiffness values.", "Example: 300 and 60 average to 180. Now do yours."]),
        Q("Why do aircraft makers use carbon fiber composites?", "✈️", "High strength and stiffness for low weight", ["Think about what matters most for a flying machine.", "Weight costs fuel in aircraft.", "Example: a lighter bike frame is easier to ride uphill. Now do yours."], ["High strength and stiffness for low weight", "They are always cheaper than metal", "They never need inspection"]),
        Q("Adding more strong fiber to a composite (same matrix) makes it...", "📈", "Stiffer along the fibers", ["The rule of mixtures gives a bigger share to the stiff material.", "More of the stiff part raises the weighted result.", "Example: a mix with more rods than clay is harder to bend. Now do yours."], ["Stiffer along the fibers", "Less stiff", "Unchanged"])
      ]);
    }),
    mcl("Root causes: the five whys", [
      ["Look deeper", "🔎", "When something fails, the first reason is rarely the real cause. Ask <b>why?</b> again and again, about five times, until you reach the <b>root cause</b>."],
      ["Example", "🛠️", "A machine stopped. Why? A fuse blew. Why? The motor overheated. Why? The bearing was dry. Why? No one oiled it. Why? There was no maintenance schedule. Fix the schedule, not just the fuse."],
      ["Tools", "🐟", "A <b>fishbone diagram</b> sorts possible causes into groups (people, machine, materials, method, environment). Fixing a symptom only hides the problem; fixing the root cause stops it from coming back."]
    ], ["Ask why again until you reach a cause you can fix for good.", "Fixing only the first symptom lets the problem return.", "Example: a flat tire caused by a nail needs the nail removed, not just a new tire patch. Now try yours."], [
      ["The five whys method means...", "Asking why repeatedly to find the root cause", "Asking five people for money", "Waiting five days"],
      ["A root cause is...", "The deepest cause that you can fix", "The first thing that went wrong in sight", "Always a person's fault"],
      ["Replacing a blown fuse without asking why it blew is fixing...", "A symptom only", "The root cause", "The whole system"],
      ["A fishbone diagram helps you...", "Sort possible causes into groups", "Fish in a lake", "Count bolts"],
      ["Which is a better response to a failure?", "Find why it happened and prevent it", "Replace the part and forget it", "Hide the part"],
      ["A robot keeps jamming. The 4th why shows the sensor is dirty. The best fix is...", "Add regular cleaning and better sealing", "Reboot the robot each time", "Ignore the jams"],
      ["Why is blaming one person usually a weak root cause?", "Systems and processes often allowed the error", "People never make mistakes", "It takes less time to type"],
      ["After you fix a root cause, you should...", "Check that the problem really stops", "Throw away the report", "Stop testing"],
      ["The five whys works best when answers are based on...", "Evidence and facts", "Guesses", "Opinions of the loudest person"]
    ]),
    gen("Planning tests: factors and runs", [
      ["Factors and levels", "🧪", "In a test, a <b>factor</b> is something you can change (like temperature). A <b>level</b> is a setting for it (low or high). A <b>full factorial</b> test tries every combination."],
      ["Counting runs", "🔢", "With k factors that each have 2 levels, you need 2<sup>k</sup> runs. With 3 levels each: 3<sup>k</sup>. The count grows fast, so plan carefully."],
      ["Good habits", "📝", "Change factors on purpose, keep everything else the same (controls), repeat runs to see random scatter, and keep clear records."]
    ], () => {
      const k = ri(2, 5), l = ri(2, 4), rep = ri(2, 3);
      return pick([
        Q(`A test has ${k} factors with 2 levels each. How many runs does a full factorial need?`, "🧪", 2 ** k, ["Each factor doubles the number of combinations.", "Multiply 2 by itself once per factor.", "Example: 3 factors need 2·2·2 = 8 runs. Now do yours."]),
        Q(`A test has 2 factors, each with ${l + 1} levels. How many runs for a full factorial?`, "🔢", (l + 1) ** 2, ["Combine every level of one factor with every level of the other.", "Multiply the levels of the two factors.", "Example: 3 levels and 3 levels give 9 runs. Now do yours."]),
        Q(`A full factorial with ${k} two-level factors is repeated ${rep} times to check scatter. How many runs in all?`, "🔁", 2 ** k * rep, ["First count the combinations, then count the repeats.", "Multiply the combinations by the number of repeats.", "Example: 4 combinations repeated 3 times is 12 runs. Now do yours."]),
        Q("Why keep other conditions the same while you change one factor?", "📝", "So you know what caused the change", ["Think about being able to explain a result.", "If several things change together you cannot tell which one mattered.", "Example: testing two different glues on different days could mix up weather and glue. Now do yours."], ["So you know what caused the change", "To make the test longer", "Because it is the rule of the school"]),
        Q("Repeating a test run several times helps you see...", "🔁", "Random scatter", ["Even identical runs give slightly different results.", "More than one run shows how much results wander.", "Example: three runs of 10.1, 9.9 and 10.0 show a small scatter. Now do yours."], ["Random scatter", "Nothing at all", "The final price"])
      ]);
    }),
    mcl("Honest data and peer review", [
      ["Honest numbers", "📊", "Engineers report what they measured, even if the result is disappointing. Changing, inventing or hiding data is dishonest and can hurt people when a bad design is trusted."],
      ["Credit", "🏷️", "Give credit when you use other people's ideas, data or text. Copying without credit is <b>plagiarism</b>. Keep clear records so results can be repeated."],
      ["Peer review", "🔍", "Other experts <b>review</b> work before it is accepted. Good reviewers look for mistakes, missing evidence and unsafe assumptions, and they give kind, honest feedback."]
    ], ["Think about honesty, credit and checking by others.", "Safe designs need trustworthy data.", "Example: if a test fails, you report the failure and fix the design, you do not delete the result. Now try yours."], [
      ["A test result is lower than hoped. An honest engineer...", "Reports the real result", "Changes the number", "Deletes the file"],
      ["Using someone else's text and calling it yours is...", "Plagiarism", "Teamwork", "Efficient writing"],
      ["Peer review means...", "Other experts check the work", "The author checks twice", "No one reads it"],
      ["Why keep clear records of tests?", "So others can repeat and check them", "To make the folder heavy", "To hide mistakes"],
      ["A reviewer finds an error in your calculation. You should...", "Thank them and fix it", "Argue and ignore it", "Remove their comment"],
      ["One outlier point does not fit. A good report...", "Shows it and explains how it was handled", "Deletes it silently", "Moves it to look better"],
      ["Using a published graph in your report needs...", "Credit to the source", "Nothing", "A different title only"],
      ["Why does honesty in data matter for safety?", "Others rely on it to build and use the design", "It makes reports longer", "It is only about grades"],
      ["Which is an honest way to handle uncertainty?", "Report the ± range", "Pretend it is zero", "Hide it in an appendix with no label"]
    ]),
    gen("Harmonics and signals", [
      ["Waves inside waves", "🎼", "Any repeating signal can be built from simple sine waves. The first, called the <b>fundamental</b>, has the signal's frequency f. The others are <b>harmonics</b>: 2f, 3f, 4f and so on."],
      ["Square waves", "◻️", "A square wave contains only odd harmonics: f, 3f, 5f, 7f... Each one is weaker than the one before, which is why sharp corners need high frequencies."],
      ["Why it matters", "📡", "A circuit or speaker that cannot pass high frequencies will round off sharp edges. Engineers choose the bandwidth to fit the harmonics they need."]
    ], () => {
      const f = ri(1, 9) * 50, n = ri(2, 5), odd = pick([3, 5, 7]);
      return pick([
        Q(`A signal has a fundamental of ${f} Hz. What is its ${n}${n === 2 ? "nd" : n === 3 ? "rd" : "th"} harmonic (Hz)?`, "🎼", f * n, ["Harmonics are whole-number multiples of the fundamental.", "Multiply the fundamental by the harmonic number.", "Example: a 100 Hz fundamental has a 4th harmonic at 400 Hz. Now do yours."]),
        Q(`A square wave has a fundamental of ${f} Hz. What is its ${odd}${odd === 3 ? "rd" : "th"} harmonic (Hz)?`, "◻️", f * odd, ["A square wave has odd harmonics.", "Multiply the fundamental by the odd number.", "Example: a 60 Hz square wave has a 5th harmonic at 300 Hz. Now do yours."]),
        Q("A square wave contains which harmonics?", "◻️", "Odd ones only", ["Think of the pattern 1, 3, 5...", "Even-numbered harmonics are missing.", "Example: 1f, 3f, 5f are present; 2f and 4f are not. Now do yours."], ["Odd ones only", "Even ones only", "All of them equally"]),
        Q("If a speaker cannot reproduce high frequencies, a sharp square wave will look...", "🔊", "Rounded", ["Sharp corners need the highest harmonics.", "Without them the edges are smooth.", "Example: low-pass filtering a pulse makes soft edges. Now do yours."], ["Rounded", "Sharper", "Unchanged"])
      ]);
    })
  ];
  b[18] = mix("Mixed practice", at(b, [0, 1, 4, 6, 7, 9, 10, 11, 12, 13, 15, 17]));
  b[19] = mix("Level 26 Challenge", at(b, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));

  // ================= LEVEL 27 =================
  const c = [
    mcl("Free-body diagrams", [
      ["Draw the forces", "✏️", "A <b>free-body diagram</b> (FBD) shows one object alone, with arrows for every force acting ON it: weight, supports, pulls, pushes, friction."],
      ["Steps", "📝", "1) Pick the object. 2) Remove the surroundings. 3) Draw each force as an arrow with a label. 4) Choose x and y directions. Then write ΣF<sub>x</sub> = 0 and ΣF<sub>y</sub> = 0 if it is not accelerating."],
      ["Common mistakes", "⚠️", "Do not draw forces the object exerts on others, and do not draw velocity or acceleration as forces. A support gives a reaction force, not a mystery."]
    ], ["Only forces acting on the chosen object belong in the diagram.", "Think about what touches the object and what pulls on it from a distance.", "Example: a book on a table has weight pointing down and the table's push pointing up. Now try yours."], [
      ["A free-body diagram shows...", "All forces acting on one object", "All objects in a room", "Only the speed"],
      ["Which belongs in the FBD of a book resting on a table?", "Its weight and the table's push up", "The book's push on the table only", "Its color"],
      ["Velocity is drawn on an FBD as...", "It is not drawn; it is not a force", "A big arrow", "A force down"],
      ["A cable holds a lamp. On the lamp's FBD the cable force points...", "Along the cable, away from the lamp", "Straight down", "Sideways only"],
      ["For an object at rest, the forces add up to...", "Zero", "Its weight", "Its speed"],
      ["A friction force on a sliding block points...", "Against the motion", "Along the motion", "Straight up"],
      ["Why do we remove the surroundings in an FBD?", "To focus on forces acting on one object", "To save paper", "To change the physics"],
      ["The reaction from a smooth floor on a block acts...", "Perpendicular to the floor", "Parallel to the floor", "Downward into the floor"],
      ["Gravity pulls the object...", "Toward the center of the Earth (down)", "Up", "Sideways"]
    ]),
    gen("Method of joints", [
      ["Truss joints", "🔗", "In a <b>truss</b>, each member is a straight bar that pulls (tension) or pushes (compression) along its length. Each joint is in equilibrium: forces add to zero."],
      ["One joint at a time", "📍", "At a joint with a load P down, an inclined member and a horizontal member: the inclined member's vertical part balances P, then its horizontal part is balanced by the horizontal member."],
      ["3-4-5 truss", "📐", "If the inclined member rises 3 for every 4 across, its vertical part is 3/5 of its force. So P = (3/5)F, F = 5P/3, and the horizontal part is (4/5)F = 4P/3."]
    ], () => {
      const k = ri(1, 12), P = 3 * k, P2 = ri(2, 9) * 10, k2 = ri(2, 9);
      return pick([
        Q(`A ${P} N load hangs at a joint. The inclined member rises 3 over 4 across (length 5). What is the force in the inclined member (N)?`, "🔗", 5 * k, ["Only the up part of the inclined member balances the load.", "The up part is three fifths of the member force.", "Example: a 12 N load gives F with 0.6F = 12, so F = 20 N. Now do yours."]),
        Q(`A ${P} N load hangs at a joint. The inclined member rises 3 over 4 across. What force does the horizontal member carry (N)?`, "↔️", 4 * k, ["The horizontal member balances the sideways part of the inclined one.", "Find the inclined force first, then take four fifths of it.", "Example: a 15 N load: F = 25 N, horizontal part 20 N. Now do yours."]),
        Q(`An inclined truss member with force ${5 * k2} N rises 3 over 4 across. What is its vertical part (N)?`, "⬆️", 3 * k2, ["Use the rise over the length.", "Multiply the member force by three fifths.", "Example: a member force of 35 N has a vertical part of 21 N. Now do yours."]),
        Q(`A vertical load ${P2} N hangs from a joint at the end of a member at 30° above horizontal (sin 30° = 0.5). What is the member force (N)?`, "🏗️", P2 * 2, ["Up part = force × sine of the angle.", "Up part must equal the load; divide the load by the sine.", "Example: a 40 N load gives 40 ÷ 0.5 = 80 N. Now do yours."]),
        Q("A truss member that is being pulled along its length is in...", "🔗", "Tension", ["Pulling stretches the member.", "The opposite is when the member is pushed and shortened.", "Example: a hanging cable is pulled. Now do yours."], ["Tension", "Compression", "Torsion"])
      ]);
    }),
    gen("Shear and bending in a beam", [
      ["Simply supported beam", "🌉", "A beam on two supports with a single load P in the middle: each support carries P/2. The shear force just either side of the load is P/2."],
      ["Maximum moment", "〰️", "The bending moment is greatest under the load: <b>M<sub>max</sub> = P × L ÷ 4</b>, where L is the span between the supports."],
      ["Why it matters", "📈", "Beams are designed for the biggest moment. Making them deeper (taller) is the cheapest way to resist it."]
    ], () => {
      const P = ri(1, 9) * 2, L = pick([4, 8, 12]), m = ri(1, 6) * 4, a2 = ri(1, 4);
      return pick([
        Q(`A ${L} m simply supported beam carries a ${P} kN load in the middle. What does each support carry (kN)?`, "🌉", P / 2, ["By symmetry the supports share equally.", "Divide the load by two.", "Example: a 16 kN center load gives 8 kN on each support. Now do yours."]),
        Q(`A ${L} m simply supported beam carries a ${P} kN load in the middle. What is the maximum bending moment (kN·m)? (M = PL/4)`, "〰️", P * L / 4, ["Use the formula in the question.", "Multiply the load by the span, then divide by four.", "Example: P = 10 kN, L = 8 m: 10·8/4 = 20 kN·m. Now do yours."]),
        Q(`A ${L} m beam has a maximum moment of ${P * L / 4} kN·m from a center load. What is the load (kN)?`, "🔍", P, ["Rearrange M = PL/4.", "Multiply the moment by four, then divide by the span.", "Example: M = 20 kN·m, L = 8 m: P = 80 ÷ 8 = 10 kN. Now do yours."]),
        Q(`A diver of ${m * 5} N stands at the middle of a ${L} m board supported at both ends. What is the force on each support (N)?`, "🏊", m * 5 / 2 * 1, ["Equal sharing again.", "Divide the weight by two.", "Example: 80 N shared gives 40 N each. Now do yours."]),
        Q("Where is the bending moment largest for a center load on a simply supported beam?", "📍", "Under the load", ["Think about where the beam bends most.", "It is at the middle where the bending is greatest.", "Example: a plank bends most at its middle when you stand there. Now do yours."], ["Under the load", "At the supports", "It is equal everywhere"])
      ]);
    }),
    gen("Friction on a slope", [
      ["Resolve the weight", "📐", "On a slope, split the weight W into a part <b>along</b> the slope and a part <b>into</b> the slope. For a 3-4-5 slope: along = 0.6 W, into = 0.8 W (the normal force N)."],
      ["Friction limit", "🧱", "Static friction can grow up to a maximum of <b>μN</b>. The block stays put if the pull along the slope is no bigger than μN."],
      ["Will it slide?", "🎿", "Compare 0.6 W (pull down the slope) with μ × 0.8 W (the most friction can give). If μ is at least 0.75, a block on a 3-4-5 slope stays put."]
    ], () => {
      const k = ri(2, 12), W = 5 * k, mu = pick([0.25, 0.5, 0.75]), muBig = pick([0.4, 0.5, 0.6, 0.7, 0.8, 0.9]);
      return pick([
        Q(`A ${W} N block rests on a slope with a 3-4-5 shape (rise 3, run 4, length 5). What is the normal force N (N)?`, "📐", 4 * k, ["N is the part of the weight pressing into the slope.", "It is four fifths of the weight.", "Example: a 25 N block has N = 20 N. Now do yours."]),
        Q(`A ${W} N block rests on a 3-4-5 slope. What force pulls it down along the slope (N)?`, "⬇️", 3 * k, ["This is the part of the weight along the slope.", "It is three fifths of the weight.", "Example: a 35 N block has 21 N along the slope. Now do yours."]),
        Q(`A ${W} N block is on a 3-4-5 slope with μ = ${mu}. What is the maximum static friction (N)?`, "🧱", mu * 4 * k, ["Maximum friction is μ times N.", "Find N first (four fifths of the weight), then multiply by μ.", "Example: 25 N block, μ = 0.5: N = 20, friction 10 N. Now do yours."]),
        Q(`A ${W} N block is on a 3-4-5 slope with μ = ${muBig}. Does it slide?`, "🎿", muBig < 0.75 ? "Yes" : "No", ["Compare the pull down the slope with the biggest friction available.", "Pull is 0.6 W; maximum friction is μ × 0.8 W. Which is bigger?", "Example: for μ = 0.5, friction 0.4 W is less than 0.6 W, so it slides. Now do yours."], ["Yes", "No"])
      ]);
    }),
    gen("Nodal analysis", [
      ["Voltage at a node", "🔌", "<b>Nodal analysis</b> finds the voltage at a junction using Kirchhoff's current law: currents into the node add to zero."],
      ["Two sources", "🔋", "Two sources V₁ and V₂ connect through equal resistors R to a node. A third R goes from the node to ground. Then V<sub>node</sub> = (V₁ + V₂) ÷ 3."],
      ["Without the third", "↔️", "With no third resistor, the node sits halfway: V<sub>node</sub> = (V₁ + V₂) ÷ 2. Currents balance because the voltage drops cancel."]
    ], () => {
      const t = until(() => { const x = ri(1, 12), y = ri(1, 12); return (x + y) % 6 === 0 ? [x, y] : null; });
      const R = ri(1, 5) * 100;
      return pick([
        Q(`Two sources of ${t[0]} V and ${t[1]} V connect through equal resistors to a node. The node also has an equal resistor to ground. What is the node voltage (V)?`, "🔌", (t[0] + t[1]) / 3, ["The equal resistors make each current proportional to its voltage difference.", "Add the two source voltages and divide by the number of equal resistors at the node.", "Example: 9 V and 6 V give 15 ÷ 3 = 5 V. Now do yours."]),
        Q(`Two sources of ${t[0]} V and ${t[1]} V connect through equal resistors to a node with nothing else attached. What is the node voltage (V)?`, "↔️", (t[0] + t[1]) / 2, ["With no other path, the node settles between the two sources.", "Equal resistors give an average.", "Example: 10 V and 20 V give 15 V. Now do yours."]),
        Q(`A ${R} Ω resistor sits between a node at ${t[0] + 6} V and a node at ${t[0]} V. What current flows (mA)? (Voltage difference over resistance, times 1000.)`, "🔍", 6 * 1000 / R, ["Current needs the voltage across the resistor.", "Subtract the node voltages, divide by R, then convert amps to milliamps.", "Example: 4 V across 200 Ω is 0.02 A = 20 mA. Now do yours."]),
        Q("Kirchhoff's current law at a node says the currents entering and leaving...", "🔗", "Add up to zero", ["Charge cannot pile up at a junction.", "What goes in must come out.", "Example: 3 A in and two paths out share the same 3 A. Now do yours."], ["Add up to zero", "Are always equal in size on every wire", "Double at each junction"])
      ]);
    }),
    gen("RL circuits and time constants", [
      ["Slow to change", "🧲", "A coil resists sudden changes in current. In an RL circuit, current rises gradually with <b>time constant τ = L ÷ R</b>."],
      ["How long?", "⏳", "After one τ the current reaches about 63% of its final value. After about 5τ it has essentially finished."],
      ["Units", "📏", "L in henries and R in ohms give τ in seconds. L in millihenries and R in ohms give τ in milliseconds."]
    ], () => {
      const R = pick([10, 20, 50, 100]), tau = ri(1, 9);
      const L = R * tau;
      return pick([
        Q(`An RL circuit has L = ${L} mH and R = ${R} Ω. What is τ (ms)?`, "⏳", tau, ["Time constant is L divided by R.", "Millihenries over ohms gives milliseconds.", "Example: 60 mH and 20 Ω give 3 ms. Now do yours."]),
        Q(`An RL circuit has τ = ${tau} ms and R = ${R} Ω. What is L (mH)?`, "🔍", L, ["Rearrange τ = L ÷ R.", "Multiply τ by R.", "Example: τ = 2 ms, R = 50 Ω gives L = 100 mH. Now do yours."]),
        Q(`An RL circuit has τ = ${tau} ms. About how long until it has essentially finished changing (5τ, in ms)?`, "🏁", 5 * tau, ["The usual rule is a fixed number of time constants.", "Multiply τ by five.", "Example: τ = 3 ms gives 15 ms. Now do yours."]),
        Q("Making the inductance L larger makes the current change...", "🐢", "More slowly", ["Look at where L sits in τ = L ÷ R.", "A bigger τ means a slower change.", "Example: a bigger flywheel is slower to speed up. Now do yours."], ["More slowly", "More quickly", "In the same time"])
      ]);
    }),
    gen("Power factor", [
      ["Real and apparent power", "⚡", "<b>Apparent power S = V × I</b> (in volt-amperes). The part that does useful work is <b>real power P = V × I × pf</b>, where pf is the power factor between 0 and 1."],
      ["Why pf is below 1", "🧲", "Motors and coils make current lag behind voltage, so some current just swings back and forth. Resistors alone have pf = 1."],
      ["Cost", "💰", "A low power factor makes the grid carry extra current for the same real power, so factories add capacitors to bring pf closer to 1."]
    ], () => {
      const V = pick([100, 200, 250]), I = pick([2, 4, 5, 10]), pf = pick([0.5, 0.6, 0.8, 0.9]);
      const S = V * I, Pw = Math.round(S * pf * 100) / 100;
      return pick([
        Q(`A motor runs on ${V} V and draws ${I} A. What is the apparent power (VA)?`, "⚡", S, ["Apparent power ignores pf.", "Multiply volts by amperes.", "Example: 50 V and 4 A give 200 VA. Now do yours."]),
        Q(`A motor draws ${I} A at ${V} V with a power factor of ${pf}. What is the real power (W)?`, "🔧", Math.round(S * pf * 100) / 100, ["Real power is apparent power times pf.", "Multiply V, I and pf together.", "Example: 100 V, 2 A, pf 0.5 gives 100 W. Now do yours."]),
        Q(`A heater with a power factor of 1 draws ${I} A from ${V} V. What is its real power (W)?`, "🔥", S, ["A pure resistor has the biggest possible pf.", "With pf = 1, real power equals apparent power.", "Example: 10 A at 100 V is 1000 W. Now do yours."]),
        Q(`A load uses ${Pw} W of real power at pf ${pf} and ${V} V. What current does it draw (A)?`, "🔍", I, ["Real power divided by pf gives apparent power.", "Divide apparent power by the voltage to get the current.", "Example: 200 W at pf 0.5 and 100 V: S = 400, I = 4 A. Now do yours."]),
        Q("A power factor close to 1 means...", "✅", "Most current does useful work", ["pf compares real power to apparent power.", "A value near the top of its range means little is wasted swinging back and forth.", "Example: a toaster has pf = 1. Now do yours."], ["Most current does useful work", "Most current is wasted", "No current flows"])
      ]);
    }),
    gen("Strain gauges", [
      ["Measuring tiny stretch", "📏", "A <b>strain gauge</b> is a thin foil pattern glued to a part. When the part stretches, the foil gets longer and thinner, so its resistance rises slightly."],
      ["Gauge factor", "🔧", "ΔR ÷ R = GF × ε. The <b>gauge factor GF</b> is about 2 for metal foil. A strain of 1 thousandth (0.001) changes R by 0.2%."],
      ["Reading it", "🌉", "Engineers wire gauges into a Wheatstone bridge to measure the tiny change. They are used on bridges, aircraft wings and weighing scales."]
    ], () => {
      const n = ri(1, 9), R = pick([500, 1000]);
      const dR = R * 2 * n / 1000;
      return pick([
        Q(`A strain gauge has R = ${R} Ω and GF = 2. The part has a strain of ${n} thousandths (${n / 1000}). What is ΔR (Ω)?`, "📏", dR, ["Use ΔR = R × GF × ε.", "Multiply the three numbers together; ε is the strain as a decimal.", "Example: R = 500, GF = 2, ε = 0.003 gives ΔR = 3 Ω. Now do yours."]),
        Q(`A gauge with R = ${R} Ω and GF = 2 changes by ${dR} Ω. What is the strain in thousandths?`, "🔍", n, ["Rearrange ΔR = R × GF × ε.", "Divide ΔR by R and by GF, then convert to thousandths.", "Example: R = 500, ΔR = 2 Ω: ε = 2/(1000) = 0.002 = 2 thousandths. Now do yours."]),
        Q("Stretching a strain gauge makes its resistance...", "📈", "Rise slightly", ["A longer, thinner wire resists more.", "Think about what resistance depends on.", "Example: a longer wire has more resistance than a short one. Now do yours."], ["Rise slightly", "Drop slightly", "Stay exactly the same"]),
        Q("Strain gauges are commonly wired into a...", "🌉", "Wheatstone bridge", ["The resistance change is tiny, so a sensitive circuit is needed.", "It is a four-resistor bridge circuit named after a scientist.", "Example: load cells in kitchen scales use one. Now do yours."], ["Wheatstone bridge", "Logic gate", "Gear train"])
      ]);
    }),
    mcl("Thermodynamic systems", [
      ["Three kinds of systems", "🔬", "A <b>closed system</b> exchanges energy but not matter (a sealed can). An <b>open system</b> exchanges both (a running tap, a jet engine). An <b>isolated system</b> exchanges neither (an ideal thermos)."],
      ["State and properties", "📋", "The <b>state</b> of a system is described by properties like pressure, temperature and volume. <b>Intensive</b> properties don't depend on size (temperature); <b>extensive</b> ones do (mass, volume)."],
      ["Surroundings", "🌍", "Everything outside the system is the <b>surroundings</b>. The boundary between them is where heat and work cross."]
    ], ["Decide whether matter, energy, both or neither can cross the boundary.", "Match each system to what is allowed to cross.", "Example: a sealed soup can lets heat through but not soup, so it is closed. Now try yours."], [
      ["A sealed can of soup heated on a stove is a...", "Closed system", "Open system", "Isolated system"],
      ["A jet engine, with air flowing in and out, is an...", "Open system", "Closed system", "Isolated system"],
      ["An ideal thermos exchanging neither heat nor matter is an...", "Isolated system", "Open system", "Closed system"],
      ["Temperature is an...", "Intensive property", "Extensive property", "Unit of mass"],
      ["Mass is an...", "Extensive property", "Intensive property", "Unit of heat"],
      ["Everything outside the system boundary is called the...", "Surroundings", "State", "Cycle"],
      ["A kettle of water, with steam escaping, is an...", "Open system", "Isolated system", "Closed system"],
      ["Pressure, temperature and volume describe a system's...", "State", "Boundary", "Owner"],
      ["Hot coffee in a nearly perfect sealed thermos is close to an...", "Isolated system", "Open system", "Boundary"]
    ]),
    mcl("Power plant cycles", [
      ["Four parts", "🏭", "A steam power plant cycles water through a <b>pump</b>, a <b>boiler</b>, a <b>turbine</b> and a <b>condenser</b>. This is the Rankine cycle."],
      ["What each does", "🔄", "The pump raises the water's pressure. The boiler adds heat and makes steam. The steam spins the turbine, which drives a generator. The condenser turns the steam back to water by rejecting heat."],
      ["Efficiency", "📈", "Hotter steam and a colder condenser give higher efficiency, but even good plants reach only around 35-45%, because a lot of heat must go out the condenser."]
    ], ["Follow the water around the loop: pump, boiler, turbine, condenser.", "Think about whether each part adds heat, takes heat, adds pressure or makes work.", "Example: the turbine is the part where steam gives up energy to make work. Now try yours."], [
      ["Which part makes steam by adding heat?", "Boiler", "Condenser", "Pump"],
      ["Which part turns steam back into liquid water?", "Condenser", "Boiler", "Turbine"],
      ["Which part spins the generator?", "Turbine", "Pump", "Condenser"],
      ["Which part raises the pressure of the liquid water?", "Pump", "Turbine", "Boiler"],
      ["The loop of steam plant parts runs in the order...", "Pump, boiler, turbine, condenser", "Turbine, pump, condenser, boiler", "Boiler, condenser, pump, turbine"],
      ["Where does a power plant reject waste heat?", "In the condenser", "In the pump", "In the generator coil only"],
      ["To raise efficiency, you can...", "Use hotter steam", "Use colder steam", "Remove the turbine"],
      ["A typical steam plant's efficiency is about...", "35 to 45 percent", "100 percent", "5 percent"],
      ["Why can the plant not reach 100% efficiency?", "Heat must be rejected to a cold place", "Water is heavy", "Turbines are always broken"]
    ]),
    mcl("Thermodynamic processes", [
      ["Holding one thing fixed", "🔧", "<b>Isothermal</b>: temperature constant. <b>Isobaric</b>: pressure constant. <b>Isochoric</b> (isometric): volume constant. <b>Adiabatic</b>: no heat transfer."],
      ["What each means", "📊", "Isochoric: the piston cannot move, so the work is zero. Isobaric: W = P ΔV. Adiabatic: Q = 0, so ΔU = −W; a gas that expands this way cools."],
      ["Examples", "💨", "Quickly pumping a bike tire is nearly adiabatic and warms the pump. A rigid tank being heated is isochoric. A balloon warming under constant air pressure is isobaric."]
    ], ["Look at the prefix: it says which thing is constant or what is blocked.", "Think about what the piston or the walls are doing.", "Example: a rigid tank cannot expand, so its volume is fixed. Now try yours."], [
      ["An isochoric process keeps which quantity constant?", "Volume", "Pressure", "Temperature"],
      ["An isobaric process keeps which quantity constant?", "Pressure", "Volume", "Heat"],
      ["An isothermal process keeps which quantity constant?", "Temperature", "Pressure", "Volume"],
      ["An adiabatic process has no...", "Heat transfer", "Pressure", "Work at all"],
      ["Work done by gas in a rigid tank (isochoric) is...", "Zero", "Large", "Always negative energy"],
      ["A gas expanding adiabatically (no heat in) usually...", "Cools", "Heats up", "Stays the same"],
      ["Pumping a bike tire fast warms the pump because the process is nearly...", "Adiabatic", "Isochoric", "Isobaric"],
      ["A balloon warming in open air at steady pressure is...", "Isobaric", "Isochoric", "Adiabatic"],
      ["A piston that is locked in place makes the process...", "Isochoric", "Isobaric", "Isothermal"]
    ]),
    gen("Heat flow in a moving fluid", [
      ["Heat rate", "💧", "To warm a flowing fluid: <b>Q̇ = ṁ × c × ΔT</b>. ṁ is the mass flow rate (kg/s), c the specific heat, ΔT the temperature rise. The result is power in kW if c is in kJ/(kg·K)."],
      ["Water", "🚿", "Water's specific heat is about <b>4.2 kJ/(kg·K)</b>. Heating 1 kg/s of water by 10 K takes 42 kW."],
      ["Uses", "🏭", "This sizes water heaters, car radiators, and power plant boilers. If heat can't leave fast enough, temperature rises."]
    ], () => {
      const m = pick([5, 10, 15, 20]), dT = ri(2, 12), dT2 = ri(2, 12), Q0 = ri(2, 9) * 21;
      return pick([
        Q(`Water flows at ${m} kg/s and is heated by ${dT} K. Using c = 4.2 kJ/(kg·K), how much heating power is needed (kW)?`, "💧", Math.round(m * 4.2 * dT * 10) / 10, ["Multiply flow rate, specific heat and temperature rise.", "Mass flow times 4.2 times the rise.", "Example: 10 kg/s heated 5 K needs 10 × 4.2 × 5 = 210 kW. Now do yours."]),
        Q(`A heater gives ${Math.round(m * 4.2 * dT2)} kW to water flowing at ${m} kg/s. By how many kelvin does the water warm? (c = 4.2)`, "🔥", dT2, ["Rearrange Q̇ = ṁ c ΔT.", "Divide the power by (flow rate times 4.2).", "Example: 84 kW with 2 kg/s: 84 ÷ 8.4 = 10 K. Now do yours."]),
        Q(`A radiator removes ${Q0 * 2} kW from coolant (c = 4.2) flowing at ${5} kg/s. By how many kelvin does the coolant cool? (Q̇ = ṁ c ΔT; round to a whole number if needed.)`, "🚗", Math.round(Q0 * 2 / (5 * 4.2)), ["Same formula, solved for the temperature change.", "Divide by (flow rate times 4.2).", "Example: 84 kW at 2 kg/s: 84 ÷ 8.4 = 10 K. Now do yours."]),
        Q("If the mass flow rate doubles and heating power stays the same, the temperature rise...", "⚖️", "Halves", ["Power is shared by more mass.", "ΔT is power divided by (flow rate times c).", "Example: heating twice as much water with the same stove warms it half as much. Now do yours."], ["Halves", "Doubles", "Stays the same"])
      ]);
    }),
    mcl("Bonding and material classes", [
      ["Atoms stick together", "⚛️", "In <b>metals</b>, atoms share a sea of free electrons. That makes them conduct electricity and heat and lets layers slide, so metals are <b>ductile</b> (they bend without cracking)."],
      ["Ceramics and polymers", "🏺", "<b>Ceramics</b> (glass, brick, porcelain) have strong ionic or covalent bonds: hard, heat-resistant, but <b>brittle</b>. <b>Polymers</b> (plastics) have long chains of carbon atoms: light, flexible, usually poor conductors."],
      ["Choosing", "🎯", "Engineers match the class to the job: metals for strong, tough parts and wires; ceramics for heat and wear; polymers for light, cheap, shaped parts; composites to combine strengths."]
    ], ["Think about what the atoms are doing: sharing free electrons, fixed strong bonds, or long chains.", "Match the property to the material class.", "Example: a glass plate shatters, which tells you it is brittle. Now try yours."], [
      ["Which material class has free electrons that carry current?", "Metals", "Ceramics", "Polymers"],
      ["A ceramic mug is usually...", "Hard but brittle", "Soft and stretchy", "A good conductor"],
      ["Plastics are made of...", "Long chains of atoms", "A sea of free electrons", "Only glass"],
      ["Which material class is best for a very hot furnace lining?", "Ceramic", "Common plastic", "Rubber"],
      ["Ductile means a material can...", "Bend or stretch a lot without cracking", "Never change shape", "Only crack"],
      ["Which is usually a poor electrical conductor?", "Plastic", "Copper", "Silver"],
      ["Why do metals conduct heat well?", "Free electrons carry energy", "They are shiny", "They are cold"],
      ["Combining two material classes, such as fiber in plastic, makes a...", "Composite", "Ceramic", "Metal"],
      ["Brittle materials tend to...", "Crack with little bending", "Bend like clay", "Stretch like rubber"]
    ]),
    gen("Alloy composition", [
      ["Mixing metals", "⚗️", "An <b>alloy</b> mixes metals (or a metal with another element). Brass is copper and zinc; bronze is copper and tin; steel is iron and carbon."],
      ["Composition of a mix", "🧮", "If you melt together masses m₁ and m₂ with compositions c₁ and c₂ (percent of an element), the result has c = (m₁c₁ + m₂c₂) ÷ (m₁ + m₂)."],
      ["Lever rule idea", "⚖️", "To reach a target composition between c₁ and c₂, the fraction of alloy 2 is (target − c₁) ÷ (c₂ − c₁). It works like balancing a lever."]
    ], () => {
      const mm = until(() => { const c1 = ri(1, 9) * 5, c2 = ri(1, 9) * 5; return (c1 + 3 * c2) % 4 === 0 && c1 !== c2 ? [c1, c2] : null; });
      const k = ri(1, 5), c1 = pick([0, 10, 20]), c2 = c1 + pick([20, 40, 80]), frac = pick([25, 50, 75]);
      const t = c1 + (c2 - c1) * frac / 100;
      const e1 = ri(2, 9) * 10, e2 = e1 + ri(2, 8) * 10;
      return pick([
        Q(`${k} kg of alloy with ${e1}% copper is melted with ${k} kg of alloy with ${e2}% copper. What is the copper percent of the mix?`, "⚗️", (e1 + e2) / 2, ["Equal masses give a simple average.", "Add the two percents and halve.", "Example: 20% and 60% in equal masses give 40%. Now do yours."]),
        Q(`${k} kg of ${mm[0]}% tin alloy is mixed with ${3 * k} kg of ${mm[1]}% tin alloy. What is the tin percent of the mix?`, "🧮", (mm[0] + 3 * mm[1]) / 4, ["Weigh each percent by its mass.", "Multiply each percent by its mass, add them, and divide by the total mass.", "Example: 1 kg of 20% with 3 kg of 60%: (20 + 180) ÷ 4 = 50%. Now do yours."]),
        Q(`Alloys A (${c1}% zinc) and B (${c2}% zinc) are mixed. What percent of the mix must be alloy B to reach ${t}% zinc?`, "⚖️", frac, ["Use the lever rule: how far the target is along the way from A to B.", "Divide (target − A) by (B − A), then turn it into a percent.", "Example: A = 0%, B = 40%, target 10%: 10 ÷ 40 = 25%. Now do yours."]),
        Q("Brass is an alloy of copper and...", "🎺", "Zinc", ["Think of the two metals in brass instruments.", "Bronze uses a different partner metal than brass does.", "Example: bronze is copper with tin. Now do yours."], ["Zinc", "Tin", "Lead"])
      ]);
    }),
    gen("Poisson's ratio", [
      ["Thin when stretched", "🪢", "Pull a rubber band and it gets thinner. <b>Poisson's ratio ν</b> = sideways strain ÷ lengthwise strain (ignoring the minus sign)."],
      ["Typical values", "📋", "Most metals have ν near 0.3. Rubber is close to 0.5 (it keeps its volume). Cork is almost 0, which is why it fits bottles so well."],
      ["Using it", "🔧", "Sideways strain = ν × lengthwise strain. A stretch of 1000 microstrain with ν = 0.3 makes the part shrink sideways by 300 microstrain."]
    ], () => {
      const nu = pick([0.25, 0.3, 0.5]), e = pick([1000, 2000, 4000]);
      return pick([
        Q(`A metal part with ν = ${nu} is stretched by ${e} microstrain. By how many microstrain does it shrink sideways?`, "🪢", Math.round(nu * e), ["Use sideways strain = ν × lengthwise strain.", "Multiply Poisson's ratio by the stretch.", "Example: ν = 0.3, 500 microstrain gives 150. Now do yours."]),
        Q(`A part stretched by ${e} microstrain shrinks sideways by ${Math.round(nu * e)} microstrain. What is ν?`, "🔍", nu, ["ν is a ratio of sideways to lengthwise strain.", "Divide the sideways strain by the stretch.", "Example: 150 sideways, 500 stretch gives 0.3. Now do yours."]),
        Q("A material with a Poisson's ratio of almost 0 (like cork) gets...", "🍾", "Hardly thinner when stretched", ["Poisson's ratio measures the sideways effect.", "A tiny ν means a tiny sideways change.", "Example: stretching cork leaves its width nearly the same. Now do yours."], ["Hardly thinner when stretched", "Much thinner when stretched", "Thicker when stretched"]),
        Q("Which material keeps its volume and has ν close to 0.5?", "🟤", "Rubber", ["Think about a very stretchy material.", "It gets much thinner as it gets longer.", "Example: a pulled rubber band gets visibly thinner. Now do yours."], ["Rubber", "Glass", "Cork"])
      ]);
    }),
    mcl("Stages of the design process", [
      ["From need to product", "🛠️", "A common order: 1) <b>Define the problem</b> and users' needs. 2) Write <b>requirements and specifications</b>. 3) <b>Generate concepts</b>. 4) <b>Select</b> the best concept. 5) <b>Detail design</b> and analysis. 6) <b>Prototype and test</b>. 7) <b>Manufacture and review</b>."],
      ["Iterate", "🔁", "It is a loop, not a straight line. Test results send you back to change requirements or concepts. Document decisions at each step."],
      ["Requirements", "📝", "Good requirements are clear, measurable and testable: 'Carry 50 kg' beats 'be strong'."]
    ], ["Think about what must happen first: understand, then plan, then make, then test.", "Each step needs the one before it.", "Example: you cannot test a design before it is built. Now try yours."], [
      ["What usually comes first in design?", "Define the problem and needs", "Manufacture", "Order materials"],
      ["Writing 'must carry 50 kg' is part of...", "Requirements and specifications", "Disposal", "Marketing"],
      ["After you generate several concepts, you...", "Select the best one", "Ship them all", "Forget them"],
      ["Which requirement is testable?", "Lift 50 kg", "Be nice and strong", "Look cool"],
      ["Test results show a problem. The next step is often to...", "Iterate and improve the design", "Hide the result", "Skip testing"],
      ["Which happens after detail design?", "Prototype and test", "Define the problem", "Choose requirements"],
      ["Why is design called a loop?", "Results lead back to earlier steps", "It never ends", "The steps are random"],
      ["Why write down design decisions?", "Others can understand and check them", "To fill space", "To hide errors"],
      ["Good specifications are...", "Clear and measurable", "Vague", "Secret"]
    ]),
    gen("Estimation: Fermi problems", [
      ["Quick estimates", "🧠", "A <b>Fermi estimate</b> breaks a big question into easy numbers you can guess, then multiplies them. Even rough numbers give an answer in the right range."],
      ["Example", "🏙️", "A city of 200 000 people each using 150 liters of water a day uses 200 000 × 150 = 30 000 000 liters, or 30 million liters."],
      ["Check", "✅", "Engineers check units and ask: does this answer make sense? An estimate is not exact, but it can catch huge mistakes before costly calculations."]
    ], () => {
      const tt = ri(2, 9) * 10, pop = ri(1, 9) * 100, per = pick([100, 150, 200]), n = ri(2, 9), s = ri(2, 9) * 10, h = ri(2, 6);
      return pick([
        Q(`A town of ${pop} 000 people uses ${per} liters of water per person per day. How many million liters per day is that?`, "💧", pop * per / 1000, ["Multiply people by liters each.", "Then convert thousands times liters into millions of liters.", "Example: 200 000 people × 150 L = 30 million liters. Now do yours."]),
        Q(`A school has ${n * 100} students. Each one throws away ${h} sheets of paper a week. How many sheets a week is that in total?`, "📄", n * 100 * h, ["Multiply students by sheets each.", "A round number of students times sheets.", "Example: 300 students × 4 sheets = 1200. Now do yours."]),
        Q(`A factory makes ${s} parts an hour and runs ${8} hours a day for ${n} days. How many parts are made in all?`, "🏭", s * 8 * n, ["Multiply the three numbers together.", "Rate times hours per day times days.", "Example: 30 parts × 8 h × 2 days = 480. Now do yours."]),
        Q(`A tank holds ${s * tt} liters. A pump moves ${s} liters a minute. How many minutes to empty it?`, "🚰", tt, ["Total divided by rate.", "Divide the tank volume by the flow rate.", "Example: 600 L at 20 L/min takes 30 min. Now do yours."]),
        Q("A Fermi estimate is useful because it...", "🧠", "Gives a quick answer in the right range", ["It trades exactness for speed.", "It helps you check if a result is believable.", "Example: guessing a room's volume before buying paint. Now do yours."], ["Gives a quick answer in the right range", "Is always exact", "Replaces all calculations"])
      ]);
    }),
    mcl("Safety culture and speaking up", [
      ["Near misses", "⚠️", "A <b>near miss</b> is an event that could have caused harm but did not. Good teams report near misses, because they show weak spots before someone is hurt."],
      ["Speaking up", "🗣️", "Engineers must say so if they see a danger, even when it is awkward or costs time. A <b>safety culture</b> rewards honesty and does not punish people for reporting problems."],
      ["Responsibility", "🤝", "Engineers have a duty to protect the public, follow standards, work within their skills, and be honest about limits. Checklists, reviews and clear reports all help."]
    ], ["Think about protecting people first, then schedules and money.", "Reporting problems early is part of good engineering.", "Example: a worker sees a loose bolt on a ladder and tells a supervisor before anyone climbs. Now try yours."], [
      ["A near miss should be...", "Reported and studied", "Hidden", "Ignored"],
      ["You spot a danger in a design. You should...", "Speak up", "Stay quiet to avoid delays", "Wait for an accident"],
      ["A safety culture means people are...", "Encouraged to report problems", "Punished for reporting", "Told to guess"],
      ["Why are checklists used in engineering?", "They help avoid forgotten steps", "They replace training", "They look tidy"],
      ["The first duty of an engineer is to...", "Protect the public", "Save the most money", "Finish the fastest"],
      ["You are asked to do work outside your skills. A good response is to...", "Say so and get qualified help", "Do it quietly", "Copy someone else's answer"],
      ["A design review is a chance to...", "Find mistakes before they are built", "Praise only", "Blame people"],
      ["A coworker reports a mistake they made. A good team...", "Fixes the system and thanks them", "Punishes them harshly", "Forgets the report"],
      ["Following published standards helps because they...", "Hold proven safe practice", "Are always optional jokes", "Slow every project by design"]
    ])
  ];
  c[18] = mix("Mixed practice", at(c, [1, 2, 3, 4, 5, 6, 7, 10, 11, 13, 14, 15, 16]));
  c[19] = mix("Level 27 Challenge", at(c, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));

  Object.assign(ENGINEER_LEVELS, { 25: a, 26: b, 27: c });
})();
