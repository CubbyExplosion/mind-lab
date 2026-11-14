// ext/physics-25-27.js  Physics levels 25-27 (12th grade, College year 1 first half): calculus mechanics, oscillations and waves, thermodynamics, electromagnetism intro
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
  const r2 = x => Math.round(x * 10000) / 10000;
  const cl = x => Math.abs(x * 100 - Math.round(x * 100)) < 1e-6 && x > 0;
  const S = (text, visual, answer, a, b, c) => ({ text, visual, answer: r2(answer), hints: [a, b, c] });
  const combo = (axes, ok) => {
    for (let i = 0; i < 5000; i++) { const c = axes.map(a => pick(a)); if (ok(...c)) return c; }
    throw new Error("combo failed");
  };

  // ================= LEVEL 25 =================
  const a = [
    num("Velocity as a derivative", [
      ["Slope of position", "📈", "Velocity is the <b>derivative</b> of position: <b>v = dx/dt</b>. For a power, d/dt (tⁿ) = n·tⁿ⁻¹. Constants vanish."],
      ["Reading a formula", "🧩", "If x = At² + Bt + C, then <b>v = 2At + B</b>. The velocity is zero when the slope of x(t) is flat."],
      ["Example", "🧮", "x = 3t² + 2t: v = 6t + 2. At t = 4 s, v = 26 m/s. Average velocity over 0 to 4 s = (3×16 + 8) ÷ 4 = 14 m/s, different from the instantaneous value."]
    ], () => {
      const [A, B, t] = combo([[1, 2, 3, 4, 5], [1, 2, 3, 4, 6], [1, 2, 3, 4, 5]], () => true);
      const k = pick([1, 2, 3, 4, 5]), T = pick([2, 3, 4, 5, 6]);
      return pick([
        S(`A particle's position is x = ${A}t² + ${B}t (metres, seconds). What is its velocity at t = ${t} s, in m/s?`, "📈", 2 * A * t + B,
          "Velocity is the rate of change of position, so differentiate.", "The derivative of t² is 2t, and the derivative of t is 1.", "Example: x = 7t² + 5t at t = 6 gives v = 14×6 + 5 = 89 m/s. Now do yours."),
        S(`A particle's position is x = ${A}t³ (metres, seconds). What is its velocity at t = ${t} s, in m/s?`, "🚀", 3 * A * t * t,
          "Differentiate the position with respect to time.", "The derivative of tⁿ is n·tⁿ⁻¹, so the power drops by one.", "Example: x = 2t³ at t = 5 gives v = 6×25 = 150 m/s. Now do yours."),
        S(`A particle moves with x = ${A}t² − ${2 * A * k}t (metres, seconds). At what time, in seconds, is it momentarily at rest?`, "⏸️", k,
          "At rest means the velocity is zero.", "Find v = dx/dt, then solve v = 0 for t.", "Example: x = 2t² − 28t gives v = 4t − 28 = 0, so t = 7 s. Now do yours."),
        S(`For x = ${A}t² + ${B}t (metres, seconds), what is the average velocity from t = 0 to t = ${T} s, in m/s? (Average = displacement ÷ time.)`, "📏", A * T + B,
          "Average velocity uses the start and end positions, not the derivative.", "Find x at the end, subtract x at the start, then divide by the time.", "Example: x = 3t² + 4t over 0 to 9 s: x = 243 + 36 = 279 m, so the average is 279 ÷ 9 = 31 m/s. Now do yours.")
      ]);
    }),
    num("Acceleration from position", [
      ["Second derivative", "🔁", "Acceleration is the derivative of velocity, so it is the <b>second derivative</b> of position: <b>a = d²x/dt²</b>."],
      ["Powers", "🧩", "x = At³ + Bt² gives v = 3At² + 2Bt and <b>a = 6At + 2B</b>. The rate of change of acceleration is called <b>jerk</b>: j = 6A."],
      ["Example", "🧮", "x = 2t³ + t²: v = 6t² + 2t, a = 12t + 2. At t = 3 s, a = 38 m/s²."]
    ], () => {
      const [A, B, t] = combo([[1, 2, 3, 4], [1, 2, 3, 5], [1, 2, 3, 4, 5]], () => true);
      return pick([
        S(`A particle has x = ${A}t³ + ${B}t² (metres, seconds). What is its acceleration at t = ${t} s, in m/s²?`, "🔁", 6 * A * t + 2 * B,
          "Differentiate twice: position to velocity to acceleration.", "d²/dt² of t³ is 6t, and d²/dt² of t² is 2.", "Example: x = 5t³ + 4t² at t = 7 gives a = 30×7 + 8 = 218 m/s². Now do yours."),
        S(`A particle has x = ${A}t³ (metres, seconds). What is its jerk (the rate of change of acceleration), in m/s³?`, "🎢", 6 * A,
          "Jerk is one more derivative than acceleration.", "Differentiate x three times; the power of t disappears.", "Example: x = 5t³ has jerk 30 m/s³ (5 × 3 × 2 × 1). Now do yours."),
        S(`A particle has x = ${A}t³ + ${B}t² (metres, seconds). At what time, in seconds, does its acceleration equal ${6 * A * t + 2 * B} m/s²?`, "⏱️", t,
          "Find a(t) first, then set it equal to the given value.", "a = 6At + 2B; solve for t.", "Example: x = 2t³ + 3t², a = 12t + 6. For a = 66, 12t = 60 so t = 5 s. Now do yours."),
        S(`A particle has x = ${A}t⁴ (metres, seconds). What is its acceleration at t = ${t} s, in m/s²?`, "📐", 12 * A * t * t,
          "Differentiate twice.", "d/dt of t⁴ is 4t³, and then d/dt of that is 12t².", "Example: x = 3t⁴ at t = 2 gives a = 36 × 4 = 144 m/s². Now do yours.")
      ]);
    }),
    num("Velocity from acceleration", [
      ["Integrating", "∫", "Going backwards from acceleration uses <b>integration</b>: <b>v = v₀ + ∫ a dt</b>. For a = kt, the integral is kt²÷2."],
      ["Rules", "🧩", "∫ c dt = ct, ∫ kt dt = ½kt², ∫ 3kt² dt = kt³. Always add the starting velocity v₀."],
      ["Example", "🧮", "a = 4t, v₀ = 3 m/s: v = 3 + 2t². At t = 5 s, v = 3 + 50 = 53 m/s."]
    ], () => {
      const [k, t, v0] = combo([[2, 4, 6, 8, 10], [1, 2, 3, 4, 5], [0, 1, 2, 3, 5]], () => true);
      const c = pick([1, 2, 3, 4, 5]), q = pick([1, 2, 3, 4]);
      return pick([
        S(`A particle's acceleration is a = ${k}t (m/s², t in s) and it starts with v₀ = ${v0} m/s. What is its speed at t = ${t} s, in m/s?`, "🚀", v0 + k * t * t / 2,
          "Integrate the acceleration over time.", "The integral of kt is ½kt²; then add v₀.", "Example: a = 6t, v₀ = 4 m/s, at t = 7: v = 4 + 3×49 = 151 m/s. Now do yours."),
        S(`A particle's acceleration is a = ${c} + ${k}t (m/s², t in s) and it starts with v₀ = ${v0} m/s. What is its speed at t = ${t} s, in m/s?`, "📈", v0 + c * t + k * t * t / 2,
          "Integrate each term of the acceleration separately.", "∫ c dt = ct and ∫ kt dt = ½kt². Add v₀ at the end.", "Example: a = 5 + 2t, v₀ = 1, t = 6: v = 1 + 30 + 36 = 67 m/s. Now do yours."),
        S(`A particle starting from rest has a = ${3 * q}t² (m/s², t in s). What is its speed at t = ${t} s, in m/s?`, "🔼", q * t * t * t,
          "Integrate a with respect to t; it starts from rest so v₀ = 0.", "The integral of 3kt² is kt³.", "Example: a = 12t² from rest at t = 3: v = 4 × 27 = 108 m/s. Now do yours."),
        S(`A particle from rest has a = ${k}t (m/s², t in s). At what time, in seconds, does its speed reach ${k * t * t / 2} m/s?`, "🎯", t,
          "First find v(t) by integrating.", "v = ½kt², so set that equal to the target speed and solve for t.", "Example: a = 8t from rest: v = 4t². Reaching 100 m/s needs t² = 25, so t = 5 s. Now do yours.")
      ]);
    }),
    num("Position from velocity", [
      ["Area under v", "📊", "Position is the <b>integral of velocity</b>: <b>x = x₀ + ∫ v dt</b>. The displacement is the area under the v-t graph."],
      ["Rules", "🧩", "∫ t dt = ½t², ∫ t² dt = ⅓t³. For v = p + qt² the position is <b>x = x₀ + pt + qt³÷3</b>."],
      ["Example", "🧮", "v = 2 + 3t² from x₀ = 1 m: x = 1 + 2t + t³. At t = 4 s, x = 1 + 8 + 64 = 73 m."]
    ], () => {
      const [p, q, T] = combo([[1, 2, 3, 4, 5], [3, 6, 9], [1, 2, 3, 4]], () => true);
      const [k, T2, x0] = combo([[2, 4, 6, 8], [1, 2, 3, 4, 5], [0, 1, 2, 5]], () => true);
      return pick([
        S(`A particle starts at x₀ = ${x0} m with velocity v = ${p} + ${q}t² (m/s, t in s). Where is it at t = ${T} s, in metres?`, "📍", x0 + p * T + q * T * T * T / 3,
          "Integrate the velocity to get the displacement, then add the start position.", "∫ t² dt = t³÷3.", "Example: x₀ = 2, v = 3 + 6t² at t = 5: x = 2 + 15 + 2×125 = 267 m. Now do yours."),
        S(`A particle starts at x₀ = ${x0} m with velocity v = ${k}t (m/s, t in s). Where is it at t = ${T2} s, in metres?`, "📍", x0 + k * T2 * T2 / 2,
          "Integrate v over time and add x₀.", "∫ kt dt = ½kt².", "Example: x₀ = 3, v = 10t at t = 4: x = 3 + 5×16 = 83 m. Now do yours."),
        S(`A particle from the origin has v = ${2 * p}t + ${k} (m/s, t in s). What is its displacement between t = 0 and t = ${T} s, in metres?`, "📏", p * T * T + k * T,
          "Displacement is the integral of velocity over the time interval.", "∫ (2pt + k) dt = pt² + kt.", "Example: v = 6t + 5 over 0 to 4 s gives 3×16 + 5×4 = 68 m. Now do yours."),
        S(`A particle has v = ${2 * k}t (m/s, t in s). How far does it move between t = 1 s and t = ${T + 1} s, in metres?`, "↔️", k * ((T + 1) * (T + 1) - 1),
          "Integrate, then evaluate at both ends and subtract.", "x(t) = kt² for this velocity, so use x(end) − x(start).", "Example: v = 10t between 1 s and 4 s: 5×16 − 5×1 = 75 m. Now do yours.")
      ]);
    }),
    num("Dot product", [
      ["Multiplying vectors to get a number", "✖️", "The <b>dot product</b> is a number: <b>A·B = AₓBₓ + AᵧBᵧ (+ A_zB_z)</b>. Also A·B = |A||B| cosθ."],
      ["Work", "💪", "Work is a dot product: <b>W = F·d</b>. Only the part of the force along the displacement does work, and perpendicular vectors give zero."],
      ["Example", "🧮", "F = (3, 5) N and d = (4, 2) m: W = 12 + 10 = 22 J. |A| = √(a² + b²), for example (6, 8) has length 10."]
    ], () => {
      const [a1, a2, b1, b2] = combo([[1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6]], () => true);
      const c3 = pick([1, 2, 3, 4]), d3 = pick([1, 2, 3, 4]);
      const [m1, m2, cs] = combo([[2, 4, 6, 8, 10], [2, 4, 5, 6, 10], [[0, "0°", 1], [60, "60°", 0.5], [90, "90°", 0]]], () => true);
      const tri = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15], [7, 24, 25]]);
      return pick([
        S(`Find A·B for A = (${a1}, ${a2}) and B = (${b1}, ${b2}).`, "✖️", a1 * b1 + a2 * b2,
          "Multiply matching components and add.", "A·B = AₓBₓ + AᵧBᵧ.", "Example: (2, 7)·(5, 3) = 10 + 21 = 31. Now do yours."),
        S(`A force F = (${a1}, ${a2}) N moves an object through d = (${b1}, ${b2}) m. How much work does it do, in joules?`, "💪", a1 * b1 + a2 * b2,
          "Work is the dot product of force and displacement.", "Multiply the x parts, multiply the y parts, then add.", "Example: F = (4, 1) N and d = (2, 9) m: W = 8 + 9 = 17 J. Now do yours."),
        S(`Find A·B for the 3D vectors A = (${a1}, ${a2}, ${c3}) and B = (${b1}, ${b2}, ${d3}).`, "🧊", a1 * b1 + a2 * b2 + c3 * d3,
          "Add one more product for the third component.", "A·B = AₓBₓ + AᵧBᵧ + A_zB_z.", "Example: (1, 2, 3)·(6, 5, 4) = 6 + 10 + 12 = 28. Now do yours."),
        S(`Two vectors have lengths ${m1} and ${m2} and the angle between them is ${cs[1]}. What is A·B?`, "📐", m1 * m2 * cs[2],
          "Use the angle form of the dot product.", `A·B = |A||B| cosθ, and cos ${cs[1]} is ${cs[2]}.`, "Example: lengths 10 and 3 at 60° give 10 × 3 × 0.5 = 15. Now do yours."),
        S(`What is the length of the vector (${tri[0]}, ${tri[1]})?`, "📏", tri[2],
          "Use Pythagoras on the components.", "Length = √(x² + y²).", "Example: (20, 21) has length √(400 + 441) = 29. Now do yours.")
      ]);
    }),
    num("Cross product and torque", [
      ["Multiplying vectors to get a vector", "🔄", "The <b>cross product</b> A×B has size <b>|A||B| sinθ</b> and points at right angles to both. It is the area of the parallelogram the vectors make."],
      ["In components", "🧩", "In 2D the out-of-page part is <b>AₓBᵧ − AᵧBₓ</b>. Torque is a cross product: <b>τ = r × F</b>, size rF sinθ."],
      ["Example", "🧮", "A = (4, 1), B = (2, 5): 4×5 − 1×2 = 18. A 3 m wrench with 20 N at 30° gives τ = 3 × 20 × 0.5 = 30 N·m."]
    ], () => {
      const [a1, a2, b1, b2] = combo([[1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6]], (a1, a2, b1, b2) => a1 * b2 - a2 * b1 > 0 && (a1 * b2 - a2 * b1) % 2 === 0);
      const [r, F, s] = combo([[1, 2, 3, 4, 5], [10, 20, 30, 40, 50], [[30, 0.5], [90, 1], [150, 0.5]]], () => true);
      return pick([
        S(`Find the size of A×B for A = (${a1}, ${a2}) and B = (${b1}, ${b2}). (The result points out of the page.)`, "🔄", a1 * b2 - a2 * b1,
          "In 2D the cross product has only one component.", "Use AₓBᵧ − AᵧBₓ.", "Example: (5, 2) × (3, 4) = 20 − 6 = 14. Now do yours."),
        S(`Vectors A and B are ${r + 1} and ${r + 3} long with ${s[0]}° between them. What is |A×B|?`, "📐", (r + 1) * (r + 3) * s[1],
          "Use the sine form of the cross product.", `|A×B| = |A||B| sinθ, and sin ${s[0]}° is ${s[1]}.`, "Example: lengths 6 and 4 at 90° give 24 × 1 = 24. Now do yours."),
        S(`A ${F} N force acts on a wrench ${r} m from the bolt, at ${s[0]}° to the wrench. What is the torque, in N·m?`, "🔧", r * F * s[1],
          "Torque is r × F, which includes a sine of the angle.", `τ = r F sinθ, with sin ${s[0]}° equal to ${s[1]}.`, "Example: 4 m, 30 N at 30° gives 4 × 30 × 0.5 = 60 N·m. Now do yours."),
        S(`A triangle has sides A = (${a1}, ${a2}) and B = (${b1}, ${b2}). What is its area? (Half of |A×B|.)`, "🔺", (a1 * b2 - a2 * b1) / 2,
          "The parallelogram area is the size of the cross product.", "Triangle area is half of that.", "Example: (2, 1) and (1, 6): cross = 12 − 1 = 11, so area = 5.5. Now do yours.")
      ]);
    }),
    num("Projectile range and height", [
      ["The formulas", "🎯", "With launch speed v and angle θ (level ground, g = 10): <b>R = v² sin2θ ÷ g</b>, <b>H = v² sin²θ ÷ 2g</b>, <b>T = 2v sinθ ÷ g</b>."],
      ["Special angles", "🧩", "sin 90° = 1, sin 30° = 0.5, sin 45° ≈ 0.7. The maximum range is at 45°, and angles that add to 90° (like 30° and 60°) share the same range."],
      ["Example", "🧮", "v = 20 m/s at 45°: R = 400 × 1 ÷ 10 = 40 m. At 90°: H = 400 ÷ 20 = 20 m and T = 40 ÷ 10 = 4 s."]
    ], () => {
      const v = pick([10, 20, 30, 40]), th = pick([5, 10, 15, 20, 25, 35, 40]);
      const r = pick([10, 20, 30, 40]);
      return pick([
        S(`A ball is launched at ${v} m/s at 45° on level ground (g = 10 m/s²). What is its range, in metres? (sin 90° = 1)`, "⚽", v * v / 10,
          "At 45° the sine in the range formula uses double the angle.", "R = v² sin2θ ÷ g with sin 90° = 1.", "Example: 50 m/s at 45° gives 2500 ÷ 10 = 250 m. Now do yours."),
        S(`A ball is launched at ${r} m/s at 30° (g = 10 m/s²). What is its maximum height, in metres? (sin 30° = 0.5)`, "🏀", r * r * 0.25 / 20,
          "Height uses the square of the sine of the launch angle.", "H = v² sin²θ ÷ (2g).", "Example: 60 m/s at 30°: H = 3600 × 0.25 ÷ 20 = 45 m. Now do yours."),
        S(`A ball is thrown straight up at ${r} m/s (θ = 90°, g = 10 m/s²). What is its total time in the air, in seconds?`, "⏳", 2 * r / 10,
          "Up and down take equal times.", "T = 2v sinθ ÷ g with sin 90° = 1.", "Example: thrown up at 35 m/s gives 70 ÷ 10 = 7 s. Now do yours."),
        S(`A projectile launched at ${th}° has the same range as one launched at another angle with the same speed. What is that other angle, in degrees?`, "🔀", 90 - th,
          "Range depends on sin2θ, and sin x = sin(180° − x).", "The two angles add up to 90°.", "Example: the partner of 20° is 70°. Now do yours."),
        S(`A kicked ball has v = ${v} m/s at 15° (g = 10 m/s²). What is its range, in metres? (sin 30° = 0.5)`, "🥅", v * v * 0.5 / 10,
          "Double the angle before taking the sine.", "R = v² sin2θ ÷ g; sin 30° is one half.", "Example: 60 m/s at 15° gives 3600 × 0.5 ÷ 10 = 180 m. Now do yours.")
      ]);
    }),
    num("Drag and terminal speed", [
      ["Linear drag", "🪂", "A fast object in a fluid feels a drag force opposing the motion: <b>F = bv</b>. Newton's law gives <b>m dv/dt = mg − bv</b>."],
      ["Terminal speed", "🧩", "The speed stops growing when drag equals weight: <b>v_t = mg ÷ b</b>. The acceleration at speed v is <b>a = g − (b÷m)v</b>, and the time scale is <b>τ = m ÷ b</b>."],
      ["Example", "🧮", "m = 3 kg and b = 6 kg/s: v_t = 30 ÷ 6 = 5 m/s and τ = 0.5 s. At v = 2 m/s, a = 10 − 2×2 = 6 m/s²."]
    ], () => {
      const [m, b] = combo([[1, 2, 3, 4, 5, 8], [1, 2, 4, 5, 10]], (m, b) => cl(m * 10 / b) && cl(m / b));
      const [m2, b2, v] = combo([[1, 2, 4, 5], [1, 2, 4, 5], [1, 2, 3]], (m2, b2, v) => b2 * v < m2 * 10 && cl(b2 * v / m2));
      return pick([
        S(`A falling object of mass ${m} kg feels drag F = bv with b = ${b} kg/s (g = 10 m/s²). What is its terminal speed, in m/s?`, "🪂", m * 10 / b,
          "At terminal speed the net force is zero.", "Set drag equal to weight: bv = mg.", "Example: m = 6 kg, b = 4 kg/s gives v_t = 60 ÷ 4 = 15 m/s. Now do yours."),
        S(`An object of mass ${m} kg falls with drag F = bv, b = ${b} kg/s. What is the time constant τ = m ÷ b, in seconds?`, "⏱️", m / b,
          "The time constant compares inertia to the drag coefficient.", "τ = m ÷ b.", "Example: m = 9 kg, b = 6 kg/s gives τ = 1.5 s. Now do yours."),
        S(`A ${m2} kg object falls with drag F = bv, b = ${b2} kg/s (g = 10 m/s²). What is its acceleration when v = ${v} m/s, in m/s²?`, "🔽", 10 - b2 * v / m2,
          "Net force is weight minus drag.", "a = g − (b ÷ m) × v.", "Example: m = 2, b = 3, v = 4 gives a = 10 − 6 = 4 m/s². Now do yours."),
        S(`A skydiver reaches a terminal speed of ${m * 10 / b} m/s with b = ${b} kg/s (g = 10 m/s²). What is the skydiver's mass, in kg?`, "🧍", m,
          "At terminal speed weight equals drag.", "m = b × v_t ÷ g.", "Example: v_t = 20 m/s, b = 5 kg/s gives m = 100 ÷ 10 = 10 kg. Now do yours.")
      ]);
    }),
    num("Impulse from a changing force", [
      ["Impulse is an area", "⏱️", "<b>Impulse J = ∫ F dt</b> is the area under a force-time graph, and <b>J = Δp = mΔv</b>."],
      ["Common shapes", "🧩", "For F = kt from 0 to T, J = kT²÷2. A triangle that rises to F₀ over T has J = ½F₀T. A constant force gives J = FT."],
      ["Example", "🧮", "F = 6t for 4 s: J = 3×16 = 48 N·s. On a 12 kg cart from rest, v = 48 ÷ 12 = 4 m/s."]
    ], () => {
      const [k, T] = combo([[2, 4, 6, 8, 10], [2, 3, 4, 5, 6]], () => true);
      const [F0, T3] = combo([[10, 20, 30, 40], [2, 4, 6]], () => true);
      const [m, k2, T2] = combo([[1, 2, 4, 5], [2, 4, 6, 8], [1, 2, 3, 4, 5]], (m, k2, T2) => cl(k2 * T2 * T2 / 2 / m));
      return pick([
        S(`A force F = ${k}t (N, t in s) acts for ${T} s. What impulse does it deliver, in N·s?`, "⏱️", k * T * T / 2,
          "Impulse is the integral of force over time.", "∫ kt dt = ½kT².", "Example: F = 10t for 3 s gives 5 × 9 = 45 N·s. Now do yours."),
        S(`A force rises steadily from 0 to ${F0} N over ${T3} s (a triangle on the F-t graph). What is the impulse, in N·s?`, "🔺", 0.5 * F0 * T3,
          "The impulse is the area under the graph.", "Area of a triangle = ½ × base × height.", "Example: 0 to 50 N over 8 s gives ½ × 50 × 8 = 200 N·s. Now do yours."),
        S(`A ${m} kg cart starts from rest and feels F = ${k2}t (N) for ${T2} s. What is its final speed, in m/s?`, "🛒", k2 * T2 * T2 / 2 / m,
          "Find the impulse first, then use J = mΔv.", "v = J ÷ m where J = ½kT².", "Example: 3 kg cart, F = 6t for 4 s: J = 48, so v = 16 m/s. Now do yours."),
        S(`A ${m} kg ball moving at ${T} m/s receives an impulse of ${m * (T + 4)} N·s in its direction of travel. What is its new speed, in m/s?`, "🎾", T + 4,
          "Impulse equals the change in momentum.", "Δv = J ÷ m; add it to the old speed.", "Example: 2 kg at 3 m/s with J = 10 N·s: Δv = 5, new speed 8 m/s. Now do yours.")
      ]);
    }),
    num("Work done by a changing force", [
      ["Work is an area", "📐", "<b>W = ∫ F dx</b>: the area under the force-position graph. For a constant force this is just Fd."],
      ["Useful integrals", "🧩", "Spring F = kx: <b>W = ½kx²</b>. F = kx²: W = kx³÷3. F = a + bx: W = aX + bX²÷2. Between two points, subtract the value at the start."],
      ["Example", "🧮", "F = 3x² from x = 0 to 4 m: W = 4³ = 64 J. A 50 N/m spring stretched 2 m stores ½ × 50 × 4 = 100 J."]
    ], () => {
      const [k, X] = combo([[2, 4, 10, 20, 50, 100], [1, 2, 3, 4]], () => true);
      const [k3, X3] = combo([[3, 6, 9, 12], [1, 2, 3, 4]], () => true);
      const [p, q, X2] = combo([[2, 4, 5, 10], [2, 4, 6, 8], [1, 2, 3, 4]], () => true);
      const [k4, x1, x2] = combo([[10, 20, 40, 60], [1, 2, 3], [2, 3, 4, 5]], (k4, x1, x2) => x2 > x1);
      return pick([
        S(`A spring with k = ${k} N/m is stretched ${X} m from its natural length. How much work is done, in joules?`, "🌀", 0.5 * k * X * X,
          "The force grows as you stretch, so use the area under F = kx.", "W = ½kx².", "Example: k = 30 N/m stretched 2 m gives ½ × 30 × 4 = 60 J. Now do yours."),
        S(`A force F = ${k3}x² (N, x in m) pushes an object from x = 0 to x = ${X3} m. How much work is done, in joules?`, "💪", k3 * X3 * X3 * X3 / 3,
          "Integrate the force over the distance.", "∫ kx² dx = kx³÷3.", "Example: F = 9x² from 0 to 2 m gives 3 × 8 = 24 J. Now do yours."),
        S(`A force F = ${p} + ${q}x (N, x in m) acts from x = 0 to x = ${X2} m. What work is done, in joules?`, "📏", p * X2 + q * X2 * X2 / 2,
          "Integrate each term separately.", "∫ (a + bx) dx = ax + bx²÷2.", "Example: F = 3 + 10x over 0 to 4 m: 12 + 80 = 92 J. Now do yours."),
        S(`A spring with k = ${k4} N/m is already stretched ${x1} m. How much extra work does it take to stretch it to ${x2} m? (Answer in joules.)`, "🧵", 0.5 * k4 * (x2 * x2 - x1 * x1),
          "Work between two positions is the difference of the two spring energies.", "W = ½k(x₂² − x₁²).", "Example: k = 20 N/m from 1 m to 3 m: 10 × (9 − 1) = 80 J. Now do yours.")
      ]);
    }),
    num("The work-energy theorem", [
      ["Net work changes kinetic energy", "⚡", "<b>W_net = ΔKE = ½mv² − ½mv₀²</b>. It works for any force, even one that changes along the way."],
      ["Using it", "🧩", "Find the work (area under F-x), then solve for the speed: <b>v² = v₀² + 2W÷m</b>. With constant F over distance d, W = Fd."],
      ["Example", "🧮", "A 2 kg block at 3 m/s gets 16 J of net work: v² = 9 + 16 = 25, so v = 5 m/s."]
    ], () => {
      const [m, v0, v] = combo([[1, 2, 4, 5], [0, 1, 2, 3, 4], [3, 4, 5, 6, 8, 10]], (m, v0, v) => v > v0);
      const [m2, s, X] = combo([[1, 2, 4], [2, 3, 5, 10], [1, 2, 3, 4]], () => true);
      const [F, d, m3] = combo([[10, 20, 30, 40], [2, 3, 4, 5], [1, 2, 4, 5]], (F, d, m3) => cl(F * d / m3 * 2) && Number.isInteger(Math.sqrt(2 * F * d / m3)));
      return pick([
        S(`A ${m} kg object moving at ${v0} m/s receives ${0.5 * m * (v * v - v0 * v0)} J of net work. What is its final speed, in m/s?`, "⚡", v,
          "Net work equals the change in kinetic energy.", "v² = v₀² + 2W ÷ m, then take the square root.", "Example: 2 kg at 1 m/s plus 24 J gives v² = 1 + 24 = 25, v = 5 m/s. Now do yours."),
        S(`A ${m} kg object speeds up from ${v0} m/s to ${v} m/s. How much net work was done on it, in joules?`, "🔋", 0.5 * m * (v * v - v0 * v0),
          "Work is the change in kinetic energy.", "W = ½m(v² − v₀²).", "Example: 4 kg from 2 to 5 m/s gives 2 × (25 − 4) = 42 J. Now do yours."),
        S(`A ${m2} kg block starts from rest and is pulled by a spring (k = ${m2 * s * s} N/m) from ${X} m stretched to its natural length. What is its speed at the end, in m/s? (Energy ½kX² becomes kinetic.)`, "🌀", s * X,
          "All the spring energy becomes kinetic energy.", "½kX² = ½mv², so v = X√(k÷m).", "Example: m = 3 kg, k = 48 N/m, X = 2 m gives v = 2 × 4 = 8 m/s. Now do yours."),
        S(`A constant net force of ${F} N pushes a ${m3} kg cart from rest over ${d} m. What is its final speed, in m/s?`, "🛒", Math.sqrt(2 * F * d / m3),
          "Work is force times distance, and it becomes kinetic energy.", "Fd = ½mv², so v = √(2Fd ÷ m).", "Example: 50 N over 4 m on 2 kg: v² = 200, so v = √200 (about 14). Now do yours (it comes out a whole number).")
      ]);
    }),
    num("Force from potential energy", [
      ["Force is minus the slope", "⛰️", "The force is the negative slope of the potential energy: <b>F = −dU/dx</b>. A steep U means a strong force pushing downhill."],
      ["Equilibrium", "🧩", "At equilibrium the slope is zero, <b>dU/dx = 0</b>, so F = 0. If U is a minimum there, the equilibrium is stable."],
      ["Example", "🧮", "U = 3x²: F = −6x, size 6x. U = x² − 8x: slope 2x − 8 = 0 gives x = 4 m."]
    ], () => {
      const [A, x] = combo([[1, 2, 3, 4, 5], [1, 2, 3, 4]], () => true);
      const k = pick([1, 2, 3, 4, 5]);
      const [kk, xx] = combo([[10, 20, 50, 100], [0.1, 0.2, 0.5, 1, 2]], (kk, xx) => cl(kk * xx));
      return pick([
        S(`A particle has U = ${A}x² (J, x in m). What is the size of the force on it at x = ${x} m, in newtons?`, "⛰️", 2 * A * x,
          "Force is the derivative of the potential energy, with a minus sign.", "d/dx of Ax² is 2Ax.", "Example: U = 6x² at x = 7 gives size 12 × 7 = 84 N. Now do yours."),
        S(`A particle has U = ${A}x³ (J, x in m). What is the size of the force at x = ${x} m, in newtons?`, "📉", 3 * A * x * x,
          "Differentiate U, then ignore the minus sign for the size.", "d/dx of Ax³ is 3Ax².", "Example: U = 2x³ at x = 5 gives 6 × 25 = 150 N. Now do yours."),
        S(`A particle has U = ${A}x² − ${2 * A * k}x (J, x in m). At what position, in metres, is it in equilibrium?`, "⚖️", k,
          "Equilibrium means zero force, i.e. a flat U.", "Set dU/dx = 0 and solve for x.", "Example: U = 3x² − 54x: 6x − 54 = 0 gives x = 9 m. Now do yours."),
        S(`A spring has potential energy U = ½kx² with k = ${kk} N/m. What force size acts at x = ${xx} m, in newtons?`, "🌀", kk * xx,
          "Differentiate U with respect to x.", "d/dx of ½kx² is kx.", "Example: k = 40 N/m at x = 0.5 m gives 20 N. Now do yours.")
      ]);
    }),
    num("Power as a rate", [
      ["Instantaneous power", "⚡", "Power is the rate of doing work: <b>P = dW/dt</b>. For a force on a moving object, <b>P = F·v</b>."],
      ["From formulas", "🧩", "If W = ct³ then P = 3ct². If KE = kt² then P = 2kt. Average power is the total work divided by the total time."],
      ["Example", "🧮", "W = 2t³ gives P = 6t². At t = 3 s, P = 54 W. A 40 N force at 5 m/s delivers 200 W."]
    ], () => {
      const [c, t] = combo([[1, 2, 3, 4, 5], [1, 2, 3, 4]], () => true);
      const [F, v] = combo([[10, 20, 30, 50, 100], [2, 5, 10, 15, 20]], () => true);
      const [k, T] = combo([[2, 3, 5, 10], [2, 3, 4, 5, 6]], () => true);
      return pick([
        S(`The work done by an engine is W = ${c}t³ (joules, t in s). What is its instantaneous power at t = ${t} s, in watts?`, "🏎️", 3 * c * t * t,
          "Power is the derivative of work with respect to time.", "d/dt of ct³ is 3ct².", "Example: W = 4t³ at t = 5 gives 12 × 25 = 300 W. Now do yours."),
        S(`A force of ${F} N pushes a vehicle moving at ${v} m/s in the same direction. What power does it deliver, in watts?`, "🚗", F * v,
          "Power from a force on a moving object uses the speed.", "P = F × v.", "Example: 250 N at 12 m/s gives 3000 W. Now do yours."),
        S(`A cart's kinetic energy grows as KE = ${k}t² (joules, t in s). What is the net power delivered at t = ${T} s, in watts?`, "🛒", 2 * k * T,
          "Net power is the rate at which kinetic energy changes.", "d/dt of kt² is 2kt.", "Example: KE = 6t² at t = 7 gives 84 W. Now do yours."),
        S(`An engine does work W = ${k}t² (joules, t in s). What is its average power over the first ${T} s, in watts?`, "⏱️", k * T,
          "Average power is total work divided by total time.", "Find W at the end time, then divide by the time.", "Example: W = 8t² over 6 s: W = 288, so average = 48 W. Now do yours.")
      ]);
    }),
    num("Friction and circular motion", [
      ["Friction as the centripetal force", "🛞", "On a flat curve, static friction supplies the centripetal force: <b>μmg ≥ mv²÷r</b>. So <b>v_max = √(μ r g)</b> and mass cancels."],
      ["Banked curves", "🧩", "On a frictionless banked curve, the normal force's sideways part does the job: <b>tanθ = v² ÷ (r g)</b>. Use g = 10 m/s²."],
      ["Example", "🧮", "μ = 0.5, r = 40 m: v_max = √(0.5 × 40 × 10) = √200 (about 14). For v = 20 m/s and r = 50 m, tanθ = 400 ÷ 500 = 0.8."]
    ], () => {
      const [mu, r] = combo([[0.2, 0.4, 0.5, 0.8, 0.9], [5, 10, 20, 25, 40, 45, 50, 80, 90, 100]], (mu, r) => { const s = Math.round(Math.sqrt(mu * r * 10)); return Math.abs(s * s - mu * r * 10) < 1e-6 && s > 0; });
      const [v, r2_] = combo([[10, 15, 20, 30], [20, 25, 30, 40, 45, 50, 60, 90, 100]], (v, rr) => cl(v * v / (rr * 10)));
      const [mu2, r3] = combo([[0.2, 0.4, 0.5, 0.8], [10, 20, 25, 40, 50]], (mu2, rr) => cl(mu2 * rr * 10 / 10));
      return pick([
        S(`A car takes a flat curve of radius ${r} m. The tyre-road coefficient of friction is ${mu} (g = 10 m/s²). What is the maximum speed, in m/s?`, "🚗", Math.sqrt(mu * r * 10),
          "Friction provides the centripetal force at the limit.", "μmg = mv²÷r, so v = √(μ r g).", "Example: μ = 0.9, r = 40 m: v² = 360 (not a whole number), so try μ = 0.5, r = 20 m: v² = 100, v = 10 m/s. Now do yours."),
        S(`A car goes round a flat curve of radius ${r} m at ${Math.sqrt(mu * r * 10)} m/s and is just about to slip (g = 10 m/s²). What is the coefficient of friction?`, "🛞", mu,
          "At the slipping point friction is at its maximum.", "μ = v² ÷ (r g).", "Example: v = 10 m/s, r = 50 m gives μ = 100 ÷ 500 = 0.2. Now do yours."),
        S(`A frictionless banked road is designed for ${v} m/s on a curve of radius ${r2_} m (g = 10 m/s²). What is tanθ of the banking?`, "🛣️", v * v / (r2_ * 10),
          "For no friction, the horizontal part of the normal force supplies the centripetal force.", "tanθ = v² ÷ (r g).", "Example: v = 30 m/s, r = 90 m gives 900 ÷ 900 = 1 (45°). Now do yours."),
        S(`The coefficient of friction between a coin and a turntable is ${mu2}. The coin sits ${r3 / 100} m from the centre. What is the greatest centripetal acceleration friction can give, in m/s²? (g = 10)`, "🪙", mu2 * 10,
          "The most friction can supply is μ times the weight.", "a_max = μg (mass cancels).", "Example: μ = 0.6 gives 6 m/s². Now do yours.")
      ]);
    }),
    num("Centre of mass", [
      ["The balance point", "⚖️", "The <b>centre of mass</b> is the weighted average position: <b>x_cm = Σ(mx) ÷ Σm</b>. It moves as if all the mass and all the outside forces were there."],
      ["Its velocity", "🧩", "Likewise <b>v_cm = Σ(mv) ÷ Σm</b>, which is total momentum divided by total mass. It stays constant when no outside force acts."],
      ["Example", "🧮", "2 kg at 0 m and 6 kg at 4 m: x_cm = (0 + 24) ÷ 8 = 3 m, closer to the heavy mass."]
    ], () => {
      const [m1, m2, x1, x2] = combo([[1, 2, 3, 4, 6], [1, 2, 3, 4, 6], [0, 1, 2, 3], [4, 5, 6, 8, 10]], (m1, m2, x1, x2) => cl((m1 * x1 + m2 * x2) / (m1 + m2)));
      const [n1, n2, n3, y1, y2, y3] = combo([[1, 2, 3], [1, 2, 3], [1, 2, 4], [0, 2, 4], [1, 3, 5], [2, 6, 8]], (n1, n2, n3, y1, y2, y3) => cl((n1 * y1 + n2 * y2 + n3 * y3) / (n1 + n2 + n3)) && (n1 * y1 + n2 * y2 + n3 * y3) > 0);
      const [p1, p2, d] = combo([[1, 2, 3, 4, 6], [1, 2, 3, 4, 6], [2, 4, 6, 8, 10]], (p1, p2, d) => p1 !== p2 && cl(p2 * d / (p1 + p2)));
      const [q1, q2, u1, u2] = combo([[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 5, 10], [1, 2, 3, 4, 6]], (q1, q2, u1, u2) => cl((q1 * u1 + q2 * u2) / (q1 + q2)));
      return pick([
        S(`A ${m1} kg mass is at x = ${x1} m and a ${m2} kg mass is at x = ${x2} m. Where is the centre of mass, in metres?`, "⚖️", (m1 * x1 + m2 * x2) / (m1 + m2),
          "The heavier mass pulls the centre of mass closer to itself.", "x_cm = (m₁x₁ + m₂x₂) ÷ (m₁ + m₂).", "Example: 1 kg at 0 and 3 kg at 8: x_cm = 24 ÷ 4 = 6 m. Now do yours."),
        S(`Masses ${n1} kg, ${n2} kg and ${n3} kg sit on a rod at ${y1} m, ${y2} m and ${y3} m. Where is the centre of mass, in metres?`, "📏", (n1 * y1 + n2 * y2 + n3 * y3) / (n1 + n2 + n3),
          "Weight each position by its mass, for all three.", "Sum m×x, then divide by the total mass.", "Example: 1, 2, 3 kg at 0, 3, 5 m: (0 + 6 + 15) ÷ 6 = 3.5 m. Now do yours."),
        S(`Two masses of ${p1} kg and ${p2} kg are ${d} m apart. How far is the centre of mass from the ${p1} kg mass, in metres?`, "🏋️", p2 * d / (p1 + p2),
          "Put the origin on the first mass.", "Distance = m₂ d ÷ (m₁ + m₂).", "Example: 1 kg and 5 kg, 12 m apart: 5×12÷6 = 10 m from the 1 kg mass. Now do yours."),
        S(`A ${q1} kg cart moves at ${u1} m/s and a ${q2} kg cart moves at ${u2} m/s in the same direction. How fast does their centre of mass move, in m/s?`, "🛒", (q1 * u1 + q2 * u2) / (q1 + q2),
          "The centre of mass velocity is total momentum over total mass.", "v_cm = (m₁v₁ + m₂v₂) ÷ (m₁ + m₂).", "Example: 2 kg at 7 m/s and 3 kg at 2 m/s gives 20 ÷ 5 = 4 m/s. Now do yours.")
      ]);
    }),
    num("Rocket thrust", [
      ["Throwing mass backwards", "🚀", "A rocket pushes exhaust backwards, and the exhaust pushes the rocket forwards. <b>Thrust = v_ex × (dm/dt)</b>, the exhaust speed times the mass burnt per second."],
      ["Acceleration", "🧩", "With thrust F and current mass m: <b>a = F÷m − g</b> near Earth (g = 10), or just F÷m in deep space. The mass drops as fuel burns, so a grows."],
      ["Example", "🧮", "v_ex = 2000 m/s and 100 kg/s: F = 200 kN. For a 10 t rocket: a = 200 ÷ 10 − 10 = 10 m/s² (kN ÷ tonnes gives m/s²)."]
    ], () => {
      const [ve, mdot] = combo([[1000, 2000, 2500, 3000, 4000], [10, 20, 40, 50, 100, 200]], (ve, md) => cl(ve * md / 1000));
      const [F, m] = combo([[200, 300, 500, 600, 800, 1000], [10, 20, 25, 40, 50]], (F, m) => F / m > 10 && Number.isInteger(F / m));
      const [F2, ve2] = combo([[100, 200, 300, 500, 800], [1000, 2000, 2500, 4000]], (F2, ve2) => cl(F2 * 1000 / ve2));
      return pick([
        S(`A rocket burns ${mdot} kg of fuel each second and expels it at ${ve} m/s. What is the thrust, in kilonewtons? (1 kN = 1000 N)`, "🚀", ve * mdot / 1000,
          "Thrust is the momentum given to the exhaust each second.", "F = v_ex × dm/dt; divide by 1000 for kN.", "Example: 3000 m/s and 60 kg/s gives 180 000 N = 180 kN. Now do yours."),
        S(`A ${m} tonne rocket has a thrust of ${F} kN at lift-off (g = 10 m/s²). What is its upward acceleration, in m/s²? (kN ÷ tonnes = m/s²)`, "🛫", F / m - 10,
          "Net force is thrust minus weight.", "a = F ÷ m − g.", "Example: 400 kN on a 25 t rocket: a = 16 − 10 = 6 m/s². Now do yours."),
        S(`A rocket's engine produces ${F2} kN of thrust with exhaust speed ${ve2} m/s. How many kilograms of fuel does it burn per second?`, "⛽", F2 * 1000 / ve2,
          "Rearrange the thrust formula.", "dm/dt = F ÷ v_ex, with F in newtons.", "Example: 240 kN at 3000 m/s gives 240 000 ÷ 3000 = 80 kg/s. Now do yours."),
        S(`In deep space a ${m} tonne rocket fires an engine of ${F} kN. What is its acceleration, in m/s²? (kN ÷ tonnes = m/s²)`, "🌌", F / m,
          "With no gravity, only the thrust matters.", "a = F ÷ m.", "Example: 90 kN on a 30 t rocket gives 3 m/s². Now do yours.")
      ]);
    }),
    num("The Atwood machine", [
      ["Two masses on a pulley", "⚖️", "Two masses hang over a light, frictionless pulley. Both move with the same acceleration: <b>a = (m₂ − m₁)g ÷ (m₁ + m₂)</b>, with m₂ the heavier."],
      ["Tension", "🧩", "Tension is the same on both sides: <b>T = 2m₁m₂g ÷ (m₁ + m₂)</b>. It lies between the two weights. Use g = 10 m/s²."],
      ["Table version", "🪑", "If m₁ lies on a smooth table and m₂ hangs: <b>a = m₂g ÷ (m₁ + m₂)</b> and T = m₁a."]
    ], () => {
      const [m1, m2] = combo([[1, 2, 3, 4, 5, 6], [2, 3, 4, 5, 6, 8, 10]], (m1, m2) => m2 > m1 && cl((m2 - m1) * 10 / (m1 + m2)) && cl(2 * m1 * m2 * 10 / (m1 + m2)));
      const [t1, t2] = combo([[1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6, 10]], (t1, t2) => cl(t2 * 10 / (t1 + t2)));
      return pick([
        S(`An Atwood machine has masses ${m1} kg and ${m2} kg (g = 10 m/s²). What is the acceleration, in m/s²?`, "⚖️", (m2 - m1) * 10 / (m1 + m2),
          "The net force is the difference of the two weights, moving both masses.", "a = (m₂ − m₁)g ÷ (m₁ + m₂).", "Example: 2 kg and 8 kg gives 6×10÷10 = 6 m/s². Now do yours."),
        S(`An Atwood machine has masses ${m1} kg and ${m2} kg (g = 10 m/s²). What is the tension in the string, in newtons?`, "🧵", 2 * m1 * m2 * 10 / (m1 + m2),
          "The tension is larger than the lighter weight and smaller than the heavier one.", "T = 2m₁m₂g ÷ (m₁ + m₂).", "Example: 3 kg and 6 kg: T = 2×18×10 ÷ 9 = 40 N. Now do yours."),
        S(`A ${t1} kg block sits on a smooth table, joined by a string over a pulley to a ${t2} kg block hanging off the edge (g = 10 m/s²). What is the acceleration, in m/s²?`, "🪑", t2 * 10 / (t1 + t2),
          "Only the hanging weight drives the motion, but both masses accelerate.", "a = m₂g ÷ (m₁ + m₂).", "Example: 2 kg on the table, 3 kg hanging: a = 30 ÷ 5 = 6 m/s². Now do yours.")
      ]);
    }),
    num("Rolling without slipping", [
      ["Rolling", "🛞", "A wheel that rolls without slipping has <b>v = ωR</b>. Its energy is split: <b>KE = ½mv² + ½Iω²</b>."],
      ["Solid cylinder", "🧩", "For a solid cylinder I = ½mR², so the rotation adds a half: <b>KE_total = ¾mv²</b>, <b>KE_rot = ¼mv²</b>. Rolling down height h: <b>v² = 4gh÷3</b> (slower than sliding)."],
      ["Example", "🧮", "m = 4 kg at 5 m/s: KE_total = ¾ × 4 × 25 = 75 J, and KE_rot = 25 J. With R = 0.5 m, ω = 5 ÷ 0.5 = 10 rad/s."]
    ], () => {
      const hv = pick([[0.3, 2], [1.2, 4], [2.7, 6], [4.8, 8], [7.5, 10]]);
      const [m, v] = combo([[2, 4, 6, 8], [2, 4, 6, 10]], () => true);
      const [v3, R] = combo([[2, 3, 4, 6, 10], [0.1, 0.2, 0.25, 0.5]], (v3, R) => cl(v3 / R));
      return pick([
        S(`A solid cylinder rolls without slipping from rest down a height of ${hv[0]} m (g = 10 m/s²). What is its speed at the bottom, in m/s? (v² = 4gh÷3)`, "🛢️", hv[1],
          "Gravity's energy goes into both moving forward and spinning.", "v² = 4gh ÷ 3, then take the square root.", "Example: h = 4.8 m gives v² = 4×10×4.8÷3 = 64, so v = 8 m/s. Now do yours."),
        S(`A ${m} kg solid cylinder rolls without slipping at ${v} m/s. What is its total kinetic energy, in joules? (KE = ¾mv²)`, "🛞", 0.75 * m * v * v,
          "Rolling includes both movement and spin.", "Total KE = ¾ m v² for a solid cylinder.", "Example: 12 kg at 3 m/s gives 0.75 × 12 × 9 = 81 J. Now do yours."),
        S(`A ${m} kg solid cylinder rolls at ${v} m/s. How much of its kinetic energy is rotational, in joules? (KE_rot = ¼mv²)`, "🌀", 0.25 * m * v * v,
          "The spin part is one third of the total for a solid cylinder.", "KE_rot = ¼ m v².", "Example: 8 kg at 5 m/s gives 0.25 × 8 × 25 = 50 J. Now do yours."),
        S(`A wheel of radius ${R} m rolls without slipping at ${v3} m/s. What is its angular speed, in rad/s?`, "🎡", v3 / R,
          "Rolling without slipping links the centre's speed to the spin.", "ω = v ÷ R.", "Example: v = 6 m/s, R = 0.3 m gives ω = 20 rad/s. Now do yours.")
      ]);
    })
  ];
  a.push(
    mix("Mixed practice", at(a, [0, 1, 2, 3, 4, 6, 7, 9, 11, 13, 14, 16])),
    mix("Level 25 Challenge", at(a, [1, 3, 5, 6, 8, 10, 11, 12, 14, 15, 16, 17]))
  );

  // ================= LEVEL 26 =================
  const b = [
    num("Position in simple harmonic motion", [
      ["A cosine in time", "〰️", "In SHM the position is <b>x = A cos(ωt)</b> when it starts at maximum. A is the amplitude, ω the angular frequency."],
      ["Period and frequency", "🧩", "<b>ω = 2π ÷ T = 2πf</b>, so T = 2π ÷ ω and f = 1 ÷ T. (Use π = 3 in numbers here.) Phases: cos 0 = 1, cos 60° (π/3) = 0.5, cos 90° (π/2) = 0."],
      ["Example", "🧮", "x = 4 cos(2t): amplitude 4, ω = 2 rad/s, T = 6 ÷ 2 = 3 s. When ωt = π/3, x = 4 × 0.5 = 2."]
    ], () => {
      const A = pick([2, 4, 6, 8, 10, 12]);
      const ph = pick([["0", 1], ["π/3", 0.5], ["π/2", 0]]);
      const [w] = combo([[2, 3, 4, 6, 12, 1.5]], () => true);
      const T = pick([0.5, 1, 1.5, 2, 3, 4]);
      return pick([
        S(`A mass oscillates as x = ${A} cos(ωt) centimetres. What is x when ωt = ${ph[0]}? (In centimetres.)`, "〰️", A * ph[1],
          "Evaluate the cosine at the given phase first.", `cos(${ph[0]}) equals ${ph[1]}; multiply by the amplitude.`, "Example: amplitude 20 cm at ωt = π/3 gives 20 × 0.5 = 10 cm. Now do yours."),
        S(`An oscillator follows x = ${A} cos(${w}t) (t in seconds). What is its period, in seconds? (Use π = 3.)`, "⏱️", 6 / w,
          "The number multiplying t is ω.", "T = 2π ÷ ω = 6 ÷ ω.", "Example: x = 5 cos(4t) has T = 6 ÷ 4 = 1.5 s. Now do yours."),
        S(`An oscillator completes one cycle every ${T} s. What is its angular frequency ω, in rad/s? (Use π = 3.)`, "🔄", 6 / T,
          "ω = 2π ÷ T.", "With π = 3, ω = 6 ÷ T.", "Example: T = 4 s gives ω = 1.5 rad/s. Now do yours."),
        S(`An oscillator has period ${T} s. What is its frequency in hertz?`, "🔔", 1 / T,
          "Frequency is cycles per second.", "f = 1 ÷ T.", "Example: T = 0.25 s gives f = 4 Hz. Now do yours.")
      ]);
    }),
    num("Maximum speed and acceleration in SHM", [
      ["Derivatives of the cosine", "📈", "From x = A cos ωt: <b>v = −Aω sin ωt</b> and <b>a = −Aω² cos ωt = −ω²x</b>. Acceleration is proportional to minus the displacement."],
      ["The maxima", "🧩", "<b>v_max = Aω</b> (passing through the centre) and <b>a_max = Aω²</b> (at the ends, where v = 0)."],
      ["Example", "🧮", "A = 0.2 m and ω = 5 rad/s: v_max = 1 m/s and a_max = 0.2 × 25 = 5 m/s²."]
    ], () => {
      const [A, w] = combo([[0.1, 0.2, 0.5, 1, 2, 4], [2, 3, 5, 10, 20]], (A, w) => cl(A * w) && cl(A * w * w));
      return pick([
        S(`A mass oscillates with amplitude ${A} m and angular frequency ${w} rad/s. What is its maximum speed, in m/s?`, "🏃", A * w,
          "The speed is greatest when it passes the centre.", "v_max = Aω.", "Example: A = 0.5 m and ω = 4 rad/s gives 2 m/s. Now do yours."),
        S(`A mass oscillates with amplitude ${A} m and angular frequency ${w} rad/s. What is its maximum acceleration, in m/s²?`, "🎢", A * w * w,
          "Acceleration is greatest at the ends of the motion.", "a_max = Aω².", "Example: A = 0.5 m and ω = 4 rad/s gives 8 m/s². Now do yours."),
        S(`An oscillator has v_max = ${r2(A * w)} m/s and ω = ${w} rad/s. What is its amplitude, in metres?`, "📏", A,
          "Rearrange v_max = Aω.", "A = v_max ÷ ω.", "Example: v_max = 6 m/s, ω = 3 rad/s gives A = 2 m. Now do yours."),
        S(`An oscillator has v_max = ${r2(A * w)} m/s and a_max = ${r2(A * w * w)} m/s². What is its angular frequency, in rad/s?`, "🔄", w,
          "Divide one maximum by the other.", "a_max ÷ v_max = Aω² ÷ Aω = ω.", "Example: v_max = 4, a_max = 20 gives ω = 5 rad/s. Now do yours.")
      ]);
    }),
    num("A mass on a spring", [
      ["The natural frequency", "🌀", "A mass m on a spring of stiffness k oscillates with <b>ω = √(k÷m)</b>. A stiffer spring is faster; a heavier mass is slower."],
      ["Period", "🧩", "<b>T = 2π√(m÷k)</b>. (Use π = 3.) Neither the amplitude nor g affects the period of a horizontal or vertical spring."],
      ["Example", "🧮", "k = 100 N/m and m = 4 kg: ω = √25 = 5 rad/s, T = 6 ÷ 5 = 1.2 s."]
    ], () => {
      const [m, w] = combo([[0.25, 0.5, 1, 2, 4], [2, 3, 4, 5, 10]], (m, w) => cl(m * w * w));
      return pick([
        S(`A ${m} kg mass hangs on a spring with k = ${m * w * w} N/m. What is the angular frequency of its oscillations, in rad/s?`, "🌀", w,
          "Compare the stiffness with the mass.", "ω = √(k ÷ m).", "Example: k = 90 N/m, m = 10 kg gives ω = 3 rad/s. Now do yours."),
        S(`An oscillating ${m} kg mass has ω = ${w} rad/s. What is the spring constant, in N/m?`, "🔧", m * w * w,
          "Square the angular frequency in your rearrangement.", "k = mω².", "Example: m = 3 kg and ω = 4 rad/s gives k = 48 N/m. Now do yours."),
        S(`A spring with k = ${m * w * w} N/m oscillates with ω = ${w} rad/s. What is the mass attached, in kg?`, "⚖️", m,
          "Rearrange ω = √(k÷m) to get m.", "m = k ÷ ω².", "Example: k = 200 N/m and ω = 10 rad/s gives m = 2 kg. Now do yours."),
        S(`A ${m} kg mass on a spring with k = ${m * w * w} N/m is pulled aside and released. What is its period, in seconds? (T = 2π/ω, use π = 3.)`, "⏱️", 6 / w,
          "Find ω first.", "T = 6 ÷ ω with π = 3.", "Example: ω = 4 rad/s gives T = 1.5 s. Now do yours.")
      ]);
    }),
    num("Energy in SHM", [
      ["Total energy", "🔋", "The total energy of a spring oscillator is constant: <b>E = ½kA²</b>. It swaps between potential ½kx² and kinetic ½mv²."],
      ["At a position x", "🧩", "KE = ½k(A² − x²) and <b>v = ω√(A² − x²)</b>. The fraction that is kinetic is <b>1 − x²÷A²</b>."],
      ["Example", "🧮", "A = 5 cm, x = 3 cm, ω = 10 rad/s: v = 10 × √(25 − 9) = 40 cm/s. At x = A÷2, 75% of the energy is kinetic."]
    ], () => {
      const [k, A] = combo([[2, 4, 10, 20, 50, 100], [0.1, 0.2, 0.5, 1, 2]], (k, A) => cl(0.5 * k * A * A));
      const [tr, w] = combo([[[5, 3, 4], [10, 6, 8], [13, 5, 12], [5, 4, 3], [10, 8, 6]], [2, 3, 5, 10]], () => true);
      const f = pick([[2, 0.75], [4, 0.9375], [5, 0.96], [10, 0.99]]);
      const [k2, A2, x2] = combo([[20, 50, 100, 200], [0.2, 0.4, 1, 2], [0.1, 0.2, 0.5]], (k2, A2, x2) => x2 < A2 && cl(0.5 * k2 * (A2 * A2 - x2 * x2)));
      return pick([
        S(`A spring (k = ${k} N/m) oscillates with amplitude ${A} m. What is its total mechanical energy, in joules?`, "🔋", 0.5 * k * A * A,
          "The total energy equals the potential energy at the extreme.", "E = ½kA².", "Example: k = 40 N/m, A = 0.5 m gives 5 J. Now do yours."),
        S(`An oscillator with amplitude ${tr[0]} cm and ω = ${w} rad/s is at x = ${tr[1]} cm. What is its speed, in cm/s?`, "🏃", w * tr[2],
          "Use energy conservation: the missing potential energy became kinetic.", "v = ω√(A² − x²).", "Example: A = 25, x = 7, ω = 2: √(625 − 49) = 24, so v = 48 cm/s. Now do yours."),
        S(`When an oscillator is at x = A/${f[0]}, what fraction of its total energy is kinetic? (Give a decimal.)`, "🍰", f[1],
          "The potential fraction is (x÷A)².", "KE fraction = 1 − (x÷A)².", "Example: at x = A÷3 the potential fraction is 1/9 so the kinetic fraction is 8/9 ≈ 0.8889. Now do yours (a decimal)."),
        S(`A spring (k = ${k2} N/m, amplitude ${A2} m) is at x = ${x2} m. What is the kinetic energy there, in joules?`, "⚡", 0.5 * k2 * (A2 * A2 - x2 * x2),
          "Kinetic energy is total energy minus potential energy.", "KE = ½k(A² − x²).", "Example: k = 100, A = 0.5, x = 0.3 gives 50 × (0.25 − 0.09) = 8 J. Now do yours.")
      ]);
    }),
    num("Springs together", [
      ["Parallel", "🪢", "Two springs side by side share the load and are stiffer: <b>k = k₁ + k₂</b>."],
      ["Series", "🔗", "Two springs end to end stretch more: <b>k = k₁k₂ ÷ (k₁ + k₂)</b> (like resistors in parallel). Cutting a spring in half doubles its stiffness."],
      ["Example", "🧮", "30 and 60 N/m: parallel 90 N/m; series 1800 ÷ 90 = 20 N/m."]
    ], () => {
      const [k1, k2] = combo([[10, 20, 30, 40, 60, 100], [10, 20, 30, 40, 60, 100, 120]], (k1, k2) => cl(k1 * k2 / (k1 + k2)));
      const k = pick([10, 20, 30, 40, 50, 60]), m = pick([1, 2, 4, 5]);
      return pick([
        S(`Two springs, ${k1} N/m and ${k2} N/m, are attached side by side to the same mass (parallel). What is the effective spring constant, in N/m?`, "🪢", k1 + k2,
          "Parallel springs add their stiffnesses.", "k = k₁ + k₂.", "Example: 50 and 70 N/m gives 120 N/m. Now do yours."),
        S(`Two springs, ${k1} N/m and ${k2} N/m, are joined end to end (series). What is the effective spring constant, in N/m?`, "🔗", k1 * k2 / (k1 + k2),
          "Series springs are softer than either one.", "k = k₁k₂ ÷ (k₁ + k₂).", "Example: 20 and 30 N/m gives 600 ÷ 50 = 12 N/m. Now do yours."),
        S(`A spring has k = ${k} N/m. It is cut into two equal halves. What is the spring constant of one half, in N/m?`, "✂️", 2 * k,
          "A shorter piece is stiffer.", "Halving the length doubles k.", "Example: 35 N/m cut in half gives 70 N/m. Now do yours."),
        S(`A ${m} kg mass is on two identical ${k} N/m springs side by side. What is the effective spring constant, in N/m?`, "⚖️", 2 * k,
          "Identical springs in parallel double the stiffness.", "k_eff = k + k.", "Example: two 25 N/m springs gives 50 N/m. Now do yours.")
      ]);
    }),
    num("Damped oscillations", [
      ["Friction in oscillators", "📉", "With a drag force F = −bv the amplitude shrinks: <b>A(t) = A₀ e^(−t/τ)</b> with <b>τ = 2m ÷ b</b>. The energy dies twice as fast, with time constant m÷b."],
      ["Critical damping", "🧩", "The borderline damping is <b>b_c = 2√(km)</b>. Under it (underdamped) the system still swings; at it, it returns fastest without swinging."],
      ["Example", "🧮", "m = 2 kg and b = 4 kg/s: τ = 1 s. For k = 8 N/m and m = 2 kg: b_c = 2 × √16 = 8 kg/s."]
    ], () => {
      const [m, bb] = combo([[0.5, 1, 2, 3, 4, 5], [0.5, 1, 2, 4, 5, 10]], (m, bb) => cl(2 * m / bb) && cl(m / bb));
      const [k, mm] = combo([[1, 4, 9, 16, 25, 36, 100], [1, 4, 9, 16, 25]], (k, mm) => Number.isInteger(Math.sqrt(k * mm)));
      return pick([
        S(`A ${m} kg mass on a spring has damping b = ${bb} kg/s. What is the amplitude time constant τ = 2m÷b, in seconds?`, "⏱️", 2 * m / bb,
          "The time constant compares the mass to the damping.", "τ = 2m ÷ b.", "Example: m = 3 kg, b = 4 kg/s gives τ = 1.5 s. Now do yours."),
        S(`A ${m} kg mass on a spring has damping b = ${bb} kg/s. What is the time constant for its energy (m÷b), in seconds?`, "🔋", m / bb,
          "Energy goes with the square of amplitude, so it decays faster.", "τ_energy = m ÷ b, half of the amplitude time constant.", "Example: m = 6 kg and b = 4 kg/s gives 1.5 s. Now do yours."),
        S(`A spring with k = ${k} N/m carries a ${mm} kg mass. What damping b_c, in kg/s, makes it critically damped? (b_c = 2√(km))`, "🚪", 2 * Math.sqrt(k * mm),
          "Multiply the stiffness by the mass first.", "b_c = 2√(km).", "Example: k = 16, m = 1 gives 2 × 4 = 8 kg/s. Now do yours."),
        S(`An oscillator with amplitude time constant τ = ${2 * m / bb} s has mass ${m} kg. What is b, in kg/s?`, "📉", bb,
          "Rearrange τ = 2m ÷ b.", "b = 2m ÷ τ.", "Example: m = 5 kg and τ = 2 s gives b = 5 kg/s. Now do yours.")
      ]);
    }),
    les("Resonance and driven oscillators", [
      ["Pushing at the right rhythm", "🎠", "A driven oscillator is pushed by a repeating force. When the driving frequency is close to the <b>natural frequency</b>, the amplitude becomes large. That is <b>resonance</b>."],
      ["Damping", "🧩", "More damping makes the resonance peak lower and broader. In the steady state the system oscillates at the <b>driving</b> frequency, not its own."],
      ["Examples", "🌉", "Pushing a swing, a radio tuner (an LC circuit) and a glass shattered by a matching note are all resonance. Soldiers break step on bridges to avoid driving them at the bridge's natural frequency."]
    ], ["Think about whose frequency matters: the push or the oscillator?", "Resonance needs the push to match what the system prefers to do.", "Example: a child pushed in rhythm with the swing goes higher. Now think about yours."], [
      ["You push a swing exactly at its natural frequency. The amplitude...", "Grows large", "Stays tiny", "Drops to zero"],
      ["Resonance happens when the driving frequency is close to the...", "natural frequency", "mass in kilograms", "speed of light"],
      ["More damping makes the resonance peak...", "Lower and broader", "Taller and narrower", "Infinitely high"],
      ["After the start-up, a driven oscillator moves at...", "the driving frequency", "zero frequency", "double its natural frequency"],
      ["Marching soldiers break step on a bridge to avoid...", "driving it at its natural frequency", "wearing out their boots", "making too much noise"],
      ["A glass can shatter from a loud note that matches its...", "natural frequency", "colour", "temperature"],
      ["A radio picks a station by tuning a circuit until it...", "resonates at the station's frequency", "gets heavier", "stops moving"],
      ["With no damping at all, resonance would make the amplitude...", "grow without limit", "stay fixed", "fall to zero"]
    ]),
    num("Travelling waves", [
      ["The wave function", "🌊", "A travelling wave is <b>y = A sin(kx − ωt)</b>. The wave number is <b>k = 2π÷λ</b> and ω = 2πf."],
      ["Speed", "🧩", "<b>v = ω÷k = fλ</b>. The wave moves in the +x direction when x and t have opposite signs. (Use π = 3.)"],
      ["Example", "🧮", "y = 0.1 sin(2x − 8t): k = 2 rad/m, ω = 8 rad/s, v = 4 m/s, λ = 6 ÷ 2 = 3 m."]
    ], () => {
      const [k, w] = combo([[1, 2, 3, 4, 5, 6], [6, 12, 18, 24, 30, 60]], (k, w) => cl(w / k));
      return pick([
        S(`A wave is y = 0.05 sin(${k}x − ${w}t) in SI units. What is its speed, in m/s?`, "🌊", w / k,
          "Read off k and ω from the formula.", "v = ω ÷ k.", "Example: y = sin(3x − 12t) has v = 12 ÷ 3 = 4 m/s. Now do yours."),
        S(`A wave is y = 0.05 sin(${k}x − ${w}t). What is its wavelength, in metres? (Use π = 3, so λ = 6 ÷ k.)`, "📏", 6 / k,
          "The number in front of x is the wave number k.", "λ = 2π ÷ k.", "Example: k = 4 rad/m gives λ = 1.5 m. Now do yours."),
        S(`A wave is y = 0.05 sin(${k}x − ${w}t). What is its frequency in hertz? (Use π = 3, so f = ω ÷ 6.)`, "🔔", w / 6,
          "The number in front of t is ω.", "f = ω ÷ 2π.", "Example: ω = 24 rad/s gives f = 4 Hz. Now do yours."),
        S(`A wave has k = ${k} rad/m and speed ${w / k} m/s. What is its angular frequency ω, in rad/s?`, "🔄", w,
          "Rearrange v = ω ÷ k.", "ω = v × k.", "Example: k = 5 and v = 3 gives ω = 15 rad/s. Now do yours.")
      ]);
    }),
    num("Speed of waves on a string", [
      ["Tension and mass per length", "🎸", "A pulse on a string moves at <b>v = √(T÷μ)</b>, where T is the tension (N) and μ is the mass per unit length (kg/m)."],
      ["What it means", "🧩", "Tighter strings carry waves faster; heavier strings slower. Quadruple the tension and the speed doubles."],
      ["Example", "🧮", "T = 100 N and μ = 0.25 kg/m: v = √400 = 20 m/s."]
    ], () => {
      const [mu, v] = combo([[0.01, 0.04, 0.1, 0.25, 0.5], [10, 20, 30, 40, 50]], (mu, v) => cl(mu * v * v));
      const v0 = pick([20, 30, 40, 50, 60]), f = pick([[4, 2], [9, 3], [16, 4], [25, 5]]);
      return pick([
        S(`A string has mass per length ${mu} kg/m and tension ${r2(mu * v * v)} N. How fast do waves travel on it, in m/s?`, "🎸", v,
          "Compare the tension with the mass per length.", "v = √(T ÷ μ).", "Example: T = 36 N, μ = 1 kg/m gives v = 6 m/s. Now do yours."),
        S(`Waves move at ${v} m/s on a string with μ = ${mu} kg/m. What tension is it under, in newtons?`, "🔧", mu * v * v,
          "Square the speed in your rearrangement.", "T = μv².", "Example: μ = 0.2 kg/m and v = 10 m/s gives T = 20 N. Now do yours."),
        S(`Waves move at ${v} m/s on a string under ${r2(mu * v * v)} N. What is its mass per unit length, in kg/m?`, "📏", mu,
          "Rearrange v = √(T÷μ) for μ.", "μ = T ÷ v².", "Example: T = 50 N and v = 10 m/s gives 0.5 kg/m. Now do yours."),
        S(`A string's wave speed is ${v0} m/s. The tension is multiplied by ${f[0]}. What is the new wave speed, in m/s?`, "🎻", v0 * f[1],
          "The speed depends on the square root of the tension.", `Take the square root of the factor ${f[0]}.`, "Example: tension times 4 turns 10 m/s into 20 m/s. Now do yours.")
      ]);
    }),
    num("Power carried by a wave", [
      ["Energy flow", "⚡", "A sinusoidal wave on a string carries power <b>P = ½μvω²A²</b>. It is the rate at which the source's energy travels down the string."],
      ["Scaling", "🧩", "P grows with the <b>square of the amplitude</b> and the <b>square of the frequency</b>. Doubling A makes P four times larger."],
      ["Example", "🧮", "μ = 0.02 kg/m, v = 10 m/s, ω = 100 rad/s, A = 0.01 m: P = 0.5 × 0.02 × 10 × 10 000 × 0.0001 = 0.1 W."]
    ], () => {
      const [mu, v, w, A] = combo([[0.01, 0.02, 0.04, 0.05, 0.1], [10, 20, 25, 40, 50], [10, 20, 40, 50, 100], [0.01, 0.02, 0.05]], (mu, v, w, A) => cl(0.5 * mu * v * w * w * A * A));
      const P0 = pick([2, 3, 5, 10]), fa = pick([2, 3, 4]), ff = pick([2, 3]);
      return pick([
        S(`A wave on a string has μ = ${mu} kg/m, v = ${v} m/s, ω = ${w} rad/s and amplitude ${A} m. What power does it carry, in watts?`, "⚡", 0.5 * mu * v * w * w * A * A,
          "Plug each quantity into the power formula carefully, squaring ω and A.", "P = ½ μ v ω² A².", "Example: μ = 0.04, v = 20, ω = 50, A = 0.02: 0.5 × 0.04 × 20 × 2500 × 0.0004 = 0.4 W. Now do yours."),
        S(`A wave carries ${P0} W. The amplitude is multiplied by ${fa} with everything else unchanged. What is the new power, in watts?`, "📈", P0 * fa * fa,
          "Power depends on the square of the amplitude.", "Multiply the power by the factor squared.", "Example: 4 W with amplitude doubled gives 16 W. Now do yours."),
        S(`A wave carries ${P0} W. The frequency is multiplied by ${ff} with the amplitude and string unchanged. What is the new power, in watts?`, "🔔", P0 * ff * ff,
          "Power goes with ω squared.", "Multiply by the frequency factor squared.", "Example: 5 W with frequency times 4 gives 5 × 16 = 80 W. Now do yours."),
        S(`A wave carries ${P0} W. Both the amplitude and the frequency are multiplied by ${ff}. What is the new power, in watts?`, "🌊", P0 * ff * ff * ff * ff,
          "Each factor enters squared.", "Multiply by (factor)² for A and by (factor)² for ω.", "Example: 2 W with both doubled gives 2 × 4 × 4 = 32 W. Now do yours.")
      ]);
    }),
    num("Decibels and intensity", [
      ["The decibel scale", "🔊", "Sound level is <b>β = 10 log₁₀(I÷I₀)</b> with I₀ = 10⁻¹² W/m². Every tenfold rise in intensity adds <b>10 dB</b>."],
      ["Inverse square", "🧩", "A point source spreads out, so <b>I ∝ 1÷r²</b>: <b>I₂ = I₁(r₁÷r₂)²</b>. Doubling the distance cuts the intensity to a quarter."],
      ["Example", "🧮", "I = 10⁻⁵ W/m²: β = 10 × (12 − 5) = 70 dB. 100× the intensity is +20 dB."]
    ], () => {
      const n = pick([3, 4, 5, 6, 7, 8, 9, 10]);
      const [fac, add] = pick([[10, 10], [100, 20], [1000, 30], [10000, 40], [100000, 50]]);
      const [k, I1] = combo([[2, 3, 4, 5], [8, 12, 18, 20, 32, 36, 48, 100]], (k, I1) => cl(I1 / (k * k)));
      return pick([
        S(`A sound has intensity 10⁻${n} W/m². What is its level in decibels? (I₀ = 10⁻¹² W/m²)`, "🔊", 10 * (12 - n),
          "Find how many powers of ten the intensity is above the reference.", "β = 10 × (exponent difference), here 12 minus the exponent.", "Example: 10⁻⁶ W/m² gives 10 × (12 − 6) = 60 dB. Now do yours."),
        S(`A sound's intensity is multiplied by ${fac}. By how many decibels does its level rise?`, "📶", add,
          "Each factor of ten adds 10 dB.", "Count how many tens are in the factor.", "Example: a factor of 100 000 adds 50 dB. Now do yours."),
        S(`A siren gives ${I1} W/m² at 10 m. What is the intensity at ${10 * k} m, in W/m²?`, "🚨", I1 / (k * k),
          "Intensity falls with the square of the distance.", "I₂ = I₁ × (r₁÷r₂)².", "Example: 90 W/m² at 10 m becomes 90 ÷ 9 = 10 W/m² at 30 m. Now do yours."),
        S(`A siren gives ${I1 / (k * k)} W/m² at ${10 * k} m. What would the intensity be at 10 m, in W/m²?`, "📢", I1,
          "Getting closer makes it stronger by the square of the distance ratio.", "I₂ = I₁ × (r₁÷r₂)², with r₂ smaller.", "Example: 2 W/m² at 30 m becomes 18 W/m² at 10 m. Now do yours.")
      ]);
    }),
    num("Beats", [
      ["Two close frequencies", "🎼", "Add two waves of slightly different frequency and the loudness rises and falls. The <b>beat frequency</b> is <b>f_beat = |f₁ − f₂|</b>."],
      ["Where it comes from", "🧩", "cos(2πf₁t) + cos(2πf₂t) = 2cos(π(f₁ − f₂)t) cos(π(f₁ + f₂)t). The fast wave sits at the <b>average</b> frequency; the slow envelope makes the beats."],
      ["Example", "🧮", "440 Hz and 444 Hz: 4 beats per second, and you hear a tone at 442 Hz that swells every 0.25 s."]
    ], () => {
      const [f1, d] = combo([[256, 300, 440, 512, 600], [1, 2, 3, 4, 5, 6, 8, 10]], () => true);
      const T = pick([2, 3, 5, 10]);
      const d2 = pick([2, 4, 5, 10, 20]);
      return pick([
        S(`Two tuning forks sound at ${f1} Hz and ${f1 + d} Hz together. How many beats per second are heard?`, "🎼", d,
          "Beats come from the difference of the frequencies.", "f_beat = |f₁ − f₂|.", "Example: 300 Hz and 307 Hz give 7 beats per second. Now do yours."),
        S(`Two forks sound at ${f1} Hz and ${f1 + d} Hz. How many beats are heard in ${T} seconds?`, "⏳", d * T,
          "First get the beats per second.", "Total beats = beat frequency × time.", "Example: 5 beats per second for 4 s gives 20 beats. Now do yours."),
        S(`Two sounds of ${f1} Hz and ${f1 + 2 * d2} Hz are played together. What is the frequency of the tone you actually hear, in Hz? (The average frequency.)`, "🔔", f1 + d2,
          "The fast tone sits halfway between the two frequencies.", "f_avg = (f₁ + f₂) ÷ 2.", "Example: 400 Hz and 410 Hz average to 405 Hz. Now do yours."),
        S(`Two sounds produce ${d2} beats per second. How long between one loud moment and the next, in seconds?`, "⏱️", 1 / d2,
          "The beat period is the inverse of the beat frequency.", "T_beat = 1 ÷ f_beat.", "Example: 4 beats per second means 0.25 s between swells. Now do yours.")
      ]);
    }),
    num("Phase difference and path difference", [
      ["Phase from distance", "🌗", "A path difference Δx between two waves gives a phase difference <b>Δφ = 360° × Δx ÷ λ</b> (or 2πΔx÷λ). One whole wavelength is a full 360° cycle."],
      ["Constructive or destructive", "🧩", "Whole wavelengths (0°, 360°…) give <b>constructive</b> interference; half wavelengths (180°…) give <b>destructive</b>. A time delay gives <b>Δφ = 360° × Δt ÷ T</b>."],
      ["Example", "🧮", "Δx = 0.5 m and λ = 2 m: Δφ = 360 × 0.25 = 90°."]
    ], () => {
      const [dx, lam] = combo([[0.25, 0.5, 0.75, 1, 1.5, 2, 3], [1, 2, 3, 4, 6]], (dx, lam) => cl(360 * dx / lam) && dx / lam <= 1);
      const [dt, T] = combo([[0.1, 0.2, 0.25, 0.5, 1], [1, 2, 4, 0.8, 0.5]], (dt, T) => dt <= T && cl(360 * dt / T));
      return pick([
        S(`Two waves of wavelength ${lam} m travel paths that differ by ${dx} m. What is their phase difference, in degrees?`, "🌗", 360 * dx / lam,
          "Find what fraction of a wavelength the path difference is.", "Δφ = 360° × Δx ÷ λ.", "Example: Δx = 0.3 m with λ = 1.2 m gives 360 × 0.25 = 90°. Now do yours."),
        S(`Two waves of wavelength ${lam} m have a phase difference of ${360 * dx / lam}°. What is the path difference, in metres?`, "📏", dx,
          "A full 360° would be one wavelength.", "Δx = λ × Δφ ÷ 360°.", "Example: λ = 2 m and 90° gives 0.5 m. Now do yours."),
        S(`A signal of period ${T} s is delayed by ${dt} s. What is the phase shift, in degrees?`, "⏲️", 360 * dt / T,
          "The delay as a fraction of the period gives the fraction of a cycle.", "Δφ = 360° × Δt ÷ T.", "Example: delay 0.5 s with period 2 s gives 90°. Now do yours."),
        S(`Two speakers play a ${lam} m wavelength. A listener is 3 m from one and ${3 + lam * 2} m from the other. What is the path difference measured in whole wavelengths? (A whole number means constructive interference.)`, "🔈", 2,
          "Divide the path difference by the wavelength.", "Path difference = second distance minus first.", "Example: λ = 4 m with paths 5 m and 13 m: 8 ÷ 4 = 2 wavelengths. Now do yours.")
      ]);
    }),
    num("Thin-film interference", [
      ["Two reflections", "🫧", "Light reflects from the top and bottom of a thin film (thickness t, refractive index n). The reflected waves interfere. Reflection off a higher-n surface flips the phase by 180°."],
      ["Soap film in air", "🧩", "Only the top reflection flips, so reflections reinforce when <b>2nt = (m + ½)λ</b>. The thinnest bright film: <b>t = λ÷4n</b>. Cancellation needs 2nt = mλ."],
      ["Coated lens", "🔍", "A coating with n between air and glass flips both reflections, so the thinnest coating that kills reflection also has <b>t = λ÷4n</b> (λ is the wavelength in air)."]
    ], () => {
      const [lam, n] = combo([[400, 500, 560, 600, 700], [1.25, 1.5, 2, 1.25]], (lam, n) => cl(lam / (4 * n)));
      const [lam2, n2] = combo([[400, 500, 600, 700, 450], [1.25, 1.5, 2]], (lam2, n2) => cl(lam2 / n2));
      const [lam3, n3] = combo([[500, 600, 700, 400], [1.25, 1.5, 2]], (lam3, n3) => cl(lam3 / (2 * n3)));
      return pick([
        S(`A soap film (n = ${n}) in air is lit by light of wavelength ${lam} nm. What is the thinnest film that reflects this light brightly, in nm? (t = λ÷4n)`, "🫧", lam / (4 * n),
          "Only one of the two reflections flips phase.", "t = λ ÷ (4n).", "Example: λ = 600 nm and n = 1.5 gives t = 100 nm. Now do yours."),
        S(`A lens coating with n = ${n} is designed to remove reflection of ${lam} nm light. What is the thinnest coating, in nm?`, "🔍", lam / (4 * n),
          "Both reflections flip, so cancellation needs a half-wavelength round trip.", "t = λ ÷ (4n), where λ is measured in air.", "Example: λ = 500 nm and n = 1.25 gives 100 nm. Now do yours."),
        S(`Light of wavelength ${lam2} nm in air passes into a film with n = ${n2}. What is its wavelength inside the film, in nm?`, "📏", lam2 / n2,
          "Light slows down in the film while its frequency stays the same.", "λ_film = λ ÷ n.", "Example: 600 nm into n = 1.5 gives 400 nm. Now do yours."),
        S(`A film (n = ${n3}) is lit by ${lam3} nm light (in air). Reflections from both surfaces cancel when 2nt = λ. What thickness t does this give, in nm?`, "🌈", lam3 / (2 * n3),
          "Use the cancellation condition directly.", "t = λ ÷ (2n).", "Example: λ = 600 nm and n = 1.5 gives t = 200 nm. Now do yours.")
      ]);
    }),
    num("Single-slit diffraction", [
      ["Waves spreading through a gap", "🕳️", "Light through a slit of width a spreads out. Dark fringes appear where <b>a sinθ = mλ</b> (m = 1, 2, 3 …). The central bright band is the widest."],
      ["On a screen", "🧩", "For small angles the central maximum has width <b>w = 2λL ÷ a</b>. A narrower slit gives a wider pattern. Units tip: with λ in nm, L in m, a in µm, w in mm is 2λL÷a."],
      ["Example", "🧮", "λ = 600 nm and a = 2 µm: first dark at sinθ = 600 ÷ 2000 = 0.3. For L = 2 m, a = 200 µm: w = 2×600×2÷200 = 12 mm."]
    ], () => {
      const [lam, a_] = combo([[400, 500, 600, 700], [2, 4, 5, 8, 10]], (lam, a_) => cl(lam / (1000 * a_)) && lam / (1000 * a_) < 1);
      const [lam2, L, a2] = combo([[400, 500, 600, 700], [1, 2, 3, 4], [100, 200, 250, 400, 500]], (lam2, L, a2) => cl(2 * lam2 * L / a2));
      return pick([
        S(`Light of wavelength ${lam} nm passes through a slit ${a_} µm wide. What is sinθ for the first dark fringe? (1 µm = 1000 nm)`, "🕳️", lam / (1000 * a_),
          "First put the slit width into nanometres.", "sinθ = λ ÷ a for m = 1.", "Example: λ = 500 nm and a = 2.5 µm (2500 nm) gives 0.2. Now do yours."),
        S(`The first dark fringe of ${lam} nm light is at sinθ = ${r2(lam / (1000 * a_))}. What is the slit width, in µm?`, "📏", a_,
          "Rearrange a sinθ = λ.", "a = λ ÷ sinθ, then convert nm to µm.", "Example: λ = 600 nm, sinθ = 0.2 gives 3000 nm = 3 µm. Now do yours."),
        S(`Light of ${lam2} nm passes through a slit ${a2} µm wide onto a screen ${L} m away. What is the width of the central maximum, in mm? (w = 2λL÷a with these units)`, "📺", 2 * lam2 * L / a2,
          "The central band reaches the first dark fringe on each side.", "w = 2λL ÷ a, using nm, m and µm to give mm.", "Example: 500 nm, 2 m, 250 µm gives 2×500×2÷250 = 8 mm. Now do yours."),
        S(`A slit pattern has a central maximum ${2 * lam2 * L / a2} mm wide. The slit is made twice as narrow. What is the new width, in mm?`, "↔️", 4 * lam2 * L / a2,
          "A narrower slit spreads the light more.", "Width is inversely proportional to the slit width.", "Example: 6 mm with a slit half as wide becomes 12 mm. Now do yours.")
      ]);
    }),
    num("Mach number and the shock cone", [
      ["Faster than sound", "✈️", "The <b>Mach number</b> is <b>M = v ÷ v_sound</b>. If a source moves faster than sound (M > 1), its waves pile into a cone."],
      ["The cone angle", "🧩", "The half-angle satisfies <b>sinθ = v_sound ÷ v = 1÷M</b>. A faster jet makes a narrower cone. Use v_sound = 340 m/s."],
      ["Example", "🧮", "v = 680 m/s: M = 2 and sinθ = 0.5, so θ = 30°. A 1020 m/s jet is Mach 3."]
    ], () => {
      const v = pick([170, 510, 680, 850, 1020, 1360, 1700]);
      const M = pick([2, 4, 5, 10]);
      return pick([
        S(`A jet flies at ${v} m/s. What is its Mach number? (Speed of sound 340 m/s.)`, "✈️", v / 340,
          "Compare the jet's speed to the speed of sound.", "M = v ÷ 340.", "Example: 1190 m/s gives M = 3.5. Now do yours."),
        S(`A jet flies at Mach ${M}. What is its speed, in m/s? (Speed of sound 340 m/s.)`, "🚀", M * 340,
          "Mach number multiplies the speed of sound.", "v = M × 340.", "Example: Mach 6 is 2040 m/s. Now do yours."),
        S(`A jet at Mach ${M} makes a shock cone. What is sinθ for its half-angle? (Give a decimal.)`, "🔺", 1 / M,
          "The cone gets narrower as the speed increases.", "sinθ = 1 ÷ M.", "Example: Mach 8 gives sinθ = 0.125. Now do yours."),
        S(`A shock cone has sinθ = ${r2(1 / M)}. What speed does the jet have, in m/s? (Speed of sound 340 m/s.)`, "💨", 340 * M,
          "Rearrange sinθ = v_sound ÷ v.", "v = 340 ÷ sinθ.", "Example: sinθ = 0.25 gives 1360 m/s. Now do yours.")
      ]);
    }),
    num("Polarisation and Malus's law", [
      ["Polarisers", "🕶️", "Light is a transverse wave. A <b>polariser</b> passes only the electric field along one direction. Unpolarised light loses <b>half</b> its intensity: I = I₀÷2."],
      ["Malus's law", "🧩", "Polarised light of intensity I₀ meeting a polariser at angle θ gives <b>I = I₀ cos²θ</b>. cos²: 0° → 1, 30° → 0.75, 45° → 0.5, 60° → 0.25, 90° → 0."],
      ["Example", "🧮", "Unpolarised 80 W/m² through two polarisers at 60°: after the first 40, after the second 40 × 0.25 = 10 W/m²."]
    ], () => {
      const th = pick([[0, 1], [30, 0.75], [45, 0.5], [60, 0.25], [90, 0]]);
      const I0 = pick([8, 16, 24, 40, 80, 120]);
      const th2 = pick([[30, 0.75], [45, 0.5], [60, 0.25], [90, 0]]);
      return pick([
        S(`Polarised light of intensity ${I0} W/m² meets a polariser at ${th[0]}° to its polarisation. What intensity passes, in W/m²?`, "🕶️", I0 * th[1],
          "Use the square of the cosine of the angle.", "I = I₀ cos²θ.", "Example: 60 W/m² at 60° gives 60 × 0.25 = 15 W/m². Now do yours."),
        S(`Unpolarised light of ${I0} W/m² passes through one polariser. What intensity emerges, in W/m²?`, "💡", I0 / 2,
          "On average, half of the random orientations get through.", "I = I₀ ÷ 2.", "Example: 50 W/m² becomes 25 W/m². Now do yours."),
        S(`Unpolarised light of ${I0} W/m² passes through a polariser and then a second one at ${th2[0]}° to the first. What is the final intensity, in W/m²?`, "🔀", I0 / 2 * th2[1],
          "The first polariser halves the intensity; the second follows Malus's law.", "I = (I₀÷2) × cos²θ.", "Example: 80 W/m² and a 60° second polariser: 40 × 0.25 = 10 W/m². Now do yours."),
        S(`Unpolarised light of ${I0} W/m² passes through three polarisers at 0°, 45° and 90°. What is the final intensity, in W/m²?`, "🧩", I0 / 8,
          "Halve first, then two Malus steps at 45°.", "I₀ × ½ × (cos²45°) × (cos²45°), and cos²45° is one half.", "Example: 64 W/m² gives 64 × ½ × ½ × ½ = 8 W/m². Now do yours.")
      ]);
    }),
    num("Speed of sound in materials", [
      ["Stiffness and density", "🔔", "Sound speed grows with stiffness and falls with density. In a fluid <b>v = √(B÷ρ)</b> (bulk modulus B); in a thin solid rod <b>v = √(Y÷ρ)</b> (Young's modulus Y)."],
      ["Units", "🧩", "Use pascals (1 GPa = 10⁹ Pa) and kg/m³. The speed comes out in m/s. Solids are stiff, so sound goes faster in them than in air."],
      ["Example", "🧮", "Water: B = 2.25 GPa and ρ = 1000 kg/m³: v = √(2.25 × 10⁹ ÷ 1000) = √(2.25 × 10⁶) = 1500 m/s."]
    ], () => {
      const [rho, v] = combo([[1000, 2000, 4000, 8000], [1000, 1500, 2000, 3000, 4000, 5000]], (rho, v) => cl(rho * v * v / 1e9));
      return pick([
        S(`A material has stiffness ${r2(rho * v * v / 1e9)} GPa and density ${rho} kg/m³. How fast does sound travel in it, in m/s?`, "🔔", v,
          "Convert gigapascals into pascals first.", "v = √(stiffness ÷ density).", "Example: 8 GPa and 2000 kg/m³ gives √(4 × 10⁶) = 2000 m/s. Now do yours."),
        S(`Sound travels at ${v} m/s in a material of density ${rho} kg/m³. What is its stiffness, in GPa?`, "🔧", rho * v * v / 1e9,
          "Square the speed in your rearrangement.", "Stiffness = ρv², then divide by 10⁹ for GPa.", "Example: 3000 m/s with 2000 kg/m³ gives 18 × 10⁹ Pa = 18 GPa. Now do yours."),
        S(`Sound travels at ${v} m/s in a material of stiffness ${r2(rho * v * v / 1e9)} GPa. What is its density, in kg/m³?`, "⚖️", rho,
          "Rearrange v = √(B÷ρ) for ρ.", "ρ = stiffness ÷ v², with stiffness in pascals.", "Example: 18 GPa and 3000 m/s gives 18 × 10⁹ ÷ 9 × 10⁶ = 2000 kg/m³. Now do yours.")
      ]);
    })
  ];
  b.push(
    mix("Mixed practice", at(b, [0, 1, 2, 3, 5, 7, 8, 10, 11, 12, 14, 16])),
    mix("Level 26 Challenge", at(b, [1, 3, 5, 6, 8, 9, 10, 12, 13, 14, 15, 17]))
  );

  // ================= LEVEL 27 =================
  const c = [];
  c.push(
    num("Equipartition and internal energy", [
      ["Energy per degree of freedom", "🌡️", "Each way a molecule can store energy (a <b>degree of freedom</b>) holds ½kT on average. Monatomic gases have 3 (f = 3); diatomic gases near room temperature have 5."],
      ["Internal energy", "🧩", "<b>U = (f÷2) nRT</b>. For a change, ΔU = (f÷2) nRΔT. Use R = 8 J/(mol·K) here (the true value is about 8.3)."],
      ["Example", "🧮", "2 mol of helium at 300 K: U = 1.5 × 2 × 8 × 300 = 7200 J. Heating 1 mol of nitrogen by 10 K: ΔU = 2.5 × 8 × 10 = 200 J."]
    ], () => {
      const [n, T] = combo([[1, 2, 3, 4], [100, 200, 300, 400, 500]], () => true);
      const dT = pick([10, 20, 25, 50]);
      return pick([
        S(`${n} mol of a monatomic gas is at ${T} K. What is its internal energy, in joules? (R = 8, f = 3)`, "🎈", 1.5 * n * 8 * T,
          "A monatomic gas has three degrees of freedom.", "U = (f÷2) nRT with f = 3.", "Example: 2 mol at 500 K: 1.5 × 2 × 8 × 500 = 12 000 J. Now do yours."),
        S(`${n} mol of a diatomic gas (f = 5) is at ${T} K. What is its internal energy, in joules? (R = 8)`, "🫧", 2.5 * n * 8 * T,
          "A diatomic gas at room temperature has five degrees of freedom.", "U = (f÷2) nRT with f = 5.", "Example: 3 mol at 100 K: 2.5 × 3 × 8 × 100 = 6000 J. Now do yours."),
        S(`${n} mol of a monatomic gas is warmed by ${dT} K. By how much does its internal energy rise, in joules? (R = 8)`, "🔥", 1.5 * n * 8 * dT,
          "Only the temperature change matters.", "ΔU = (3÷2) n R ΔT.", "Example: 2 mol warmed by 30 K: 1.5 × 2 × 8 × 30 = 720 J. Now do yours."),
        S(`A monatomic gas (${n} mol) has internal energy ${1.5 * n * 8 * T} J. What is its temperature, in kelvin? (R = 8)`, "🌡️", T,
          "Rearrange U = (3÷2) nRT.", "T = 2U ÷ (3nR).", "Example: U = 7200 J, n = 2 mol gives T = 14 400 ÷ 48 = 300 K. Now do yours.")
      ]);
    }),
    num("Molar heat capacities", [
      ["Heating a gas", "♨️", "<b>Q = nC ΔT</b>. At constant volume <b>C_v = (f÷2)R</b> (all heat raises U). At constant pressure <b>C_p = C_v + R</b>, because the gas also does work."],
      ["With R = 8", "🧩", "Monatomic: C_v = 12, C_p = 20 J/(mol·K). Diatomic: C_v = 20, C_p = 28. Heating at constant pressure always needs more heat for the same ΔT."],
      ["Example", "🧮", "1 mol of neon heated 10 K at constant volume: Q = 1 × 12 × 10 = 120 J; at constant pressure, 1 × 20 × 10 = 200 J."]
    ], () => {
      const [n, dT] = combo([[1, 2, 3, 5], [5, 10, 20, 50]], () => true);
      return pick([
        S(`${n} mol of a monatomic gas is heated by ${dT} K at constant volume. How much heat is needed, in joules? (R = 8, C_v = 12)`, "♨️", n * 12 * dT,
          "At constant volume the heat only raises the internal energy.", "Q = n C_v ΔT with C_v = 12.", "Example: 2 mol heated 30 K gives 2 × 12 × 30 = 720 J. Now do yours."),
        S(`${n} mol of a monatomic gas is heated by ${dT} K at constant pressure. How much heat is needed, in joules? (R = 8, C_p = 20)`, "🔥", n * 20 * dT,
          "Some of the heat becomes expansion work.", "Q = n C_p ΔT with C_p = 20.", "Example: 2 mol heated 30 K gives 2 × 20 × 30 = 1200 J. Now do yours."),
        S(`${n} mol of a diatomic gas is heated by ${dT} K at constant volume. How much heat is needed, in joules? (C_v = 20)`, "🫧", n * 20 * dT,
          "Diatomic gas has more degrees of freedom.", "Q = n C_v ΔT with C_v = 20.", "Example: 2 mol heated 30 K gives 2 × 20 × 30 = 1200 J. Now do yours."),
        S(`${n} mol of a monatomic gas absorbs ${n * 12 * dT} J at constant volume. By how many kelvin does it warm? (C_v = 12)`, "🌡️", dT,
          "Rearrange Q = nC_vΔT.", "ΔT = Q ÷ (n C_v).", "Example: 2 mol absorbing 720 J gives 720 ÷ 24 = 30 K. Now do yours.")
      ]);
    }),
    num("Gas processes and the first law", [
      ["Q, W and ΔU", "⚖️", "<b>ΔU = Q − W</b> with W the work done <i>by</i> the gas. At constant pressure <b>W = pΔV</b>; at constant volume W = 0."],
      ["Isothermal", "🧩", "If T stays constant, U does not change (for an ideal gas): ΔU = 0, so <b>Q = W</b>. Handy unit: 1 kPa × 1 L = 1 J."],
      ["Example", "🧮", "100 kPa and ΔV = 3 L: W = 300 J. If Q = 500 J, ΔU = 200 J."]
    ], () => {
      const [p, dV] = combo([[50, 100, 200, 300], [1, 2, 3, 4, 5]], () => true);
      const [Q, W] = combo([[300, 400, 500, 600, 800], [100, 150, 200, 250]], (Q, W) => Q > W);
      return pick([
        S(`A gas expands at a constant ${p} kPa by ${dV} L. How much work does it do, in joules? (1 kPa·L = 1 J)`, "🎈", p * dV,
          "Constant pressure makes the work a rectangle on the p-V graph.", "W = p ΔV.", "Example: 80 kPa and 5 L gives 400 J. Now do yours."),
        S(`A gas absorbs ${Q} J of heat and does ${W} J of work. By how much does its internal energy change, in joules?`, "🔋", Q - W,
          "Energy in minus work out is what stays inside.", "ΔU = Q − W.", "Example: Q = 700 J and W = 250 J gives 450 J. Now do yours."),
        S(`A gas expands isothermally and does ${W} J of work. How much heat did it absorb, in joules?`, "🌡️", W,
          "An isothermal ideal gas has no change in U.", "With ΔU = 0, Q = W.", "Example: 350 J of work needs 350 J of heat. Now do yours."),
        S(`A gas in a rigid box absorbs ${Q} J of heat. By how much does its internal energy increase, in joules?`, "📦", Q,
          "A rigid box cannot expand.", "With ΔV = 0 the work is zero, so ΔU = Q.", "Example: 450 J absorbed gives 450 J rise. Now do yours.")
      ]);
    }),
    num("Adiabatic changes", [
      ["No heat flows", "🚫", "In an <b>adiabatic</b> process Q = 0, so ΔU = −W. Expansion cools the gas; compression heats it. For a monatomic gas γ = 5/3."],
      ["The laws", "🧩", "<b>TV^(γ−1) = constant</b> and <b>pV^γ = constant</b>. For γ = 5/3 the exponent γ − 1 is 2/3, so T₂ = T₁(V₁÷V₂)^(2/3)."],
      ["Example", "🧮", "V grows by 8 (cube root 2, squared 4): T falls by 4. 600 K becomes 150 K. Compressed by 27 (cube root 3, squared 9): T rises ×9."]
    ], () => {
      const [T1, g] = combo([[300, 360, 400, 480, 600, 720, 900], [[8, 0.25], [27, 1 / 9], [64, 1 / 16], [1 / 8, 4], [1 / 27, 9]]], (T1, g) => cl(T1 * g[1]));
      const p1 = pick([32, 64, 96, 160]);
      const W = pick([200, 300, 450, 600]);
      return pick([
        S(`A monatomic ideal gas (γ = 5/3) at ${T1} K expands adiabatically to ${g[0] >= 1 ? g[0] : "1/" + Math.round(1 / g[0])} times its volume. What is its final temperature, in kelvin?`, "🎈", T1 * g[1],
          "Use TV^(γ−1) constant, and think about whether the gas heats or cools.", "T₂ = T₁ (V₁÷V₂)^(2/3). Take the cube root, then square.", "Example: 800 K and volume ×8: (1/8)^(2/3) = 1/4, so 200 K. Now do yours."),
        S(`A monatomic gas at ${p1} kPa is expanded adiabatically to 8 times its volume (γ = 5/3, 8^(5/3) = 32). What is its final pressure, in kPa?`, "🔽", p1 / 32,
          "Pressure drops faster than in an isothermal expansion.", "p₂ = p₁ ÷ 8^(5/3) = p₁ ÷ 32.", "Example: 160 kPa goes to 5 kPa for volume ×8. Now do yours."),
        S(`A gas expands adiabatically and does ${W} J of work. By how many joules does its internal energy fall?`, "📉", W,
          "There is no heat flow.", "ΔU = Q − W with Q = 0.", "Example: 250 J of work means a 250 J fall. Now do yours."),
        S(`A gas is compressed adiabatically, and ${W} J of work is done on it. By how many joules does its internal energy rise?`, "📈", W,
          "No heat enters or leaves.", "All the work done on the gas goes into U.", "Example: 400 J of work done on it means a 400 J rise. Now do yours.")
      ]);
    }),
    num("Entropy and heat flow", [
      ["Counting disorder", "🎲", "<b>Entropy</b> S measures how many ways the energy can be arranged. When heat Q flows reversibly at temperature T, <b>ΔS = Q ÷ T</b> (J/K)."],
      ["Heat from hot to cold", "🧩", "If Q leaves a hot body (T_h) for a cold one (T_c): <b>ΔS_total = Q÷T_c − Q÷T_h</b>, which is positive. The entropy of the universe never decreases."],
      ["Example", "🧮", "600 J flows from 400 K to 300 K: gain 2 J/K, loss 1.5 J/K, so total +0.5 J/K."]
    ], () => {
      const [Th, Tc, Q] = combo([[300, 400, 500, 600, 900], [200, 250, 300, 400], [100, 200, 300, 400, 600, 1200, 1500, 2000, 3000]], (Th, Tc, Q) => Th > Tc && cl(Q / Tc - Q / Th));
      const [Q2, T2] = combo([[300, 400, 600, 900, 1200], [100, 200, 300, 400, 600]], (Q2, T2) => cl(Q2 / T2));
      const [m, L, T3] = combo([[1, 2, 3, 5], [100, 150, 300], [300, 100, 150]], (m, L, T3) => cl(m * L / T3));
      return pick([
        S(`${Q2} J of heat flows reversibly into a reservoir at ${T2} K. What is its entropy change, in J/K?`, "🌡️", Q2 / T2,
          "Entropy change is heat divided by temperature.", "ΔS = Q ÷ T.", "Example: 900 J into a 300 K reservoir gives 3 J/K. Now do yours."),
        S(`${Q} J of heat flows from a ${Th} K body to a ${Tc} K body. What is the total entropy change, in J/K?`, "🔥", Q / Tc - Q / Th,
          "The cold body gains more entropy than the hot one loses.", "ΔS = Q÷T_c − Q÷T_h.", "Example: 600 J from 400 K to 300 K: 2 − 1.5 = 0.5 J/K. Now do yours."),
        S(`A solid of mass ${m} kg melts at ${T3} K with latent heat ${L} kJ/kg. What is the entropy change of the substance, in kJ/K? (ΔS = mL ÷ T)`, "🧊", m * L / T3,
          "Heat for the phase change happens at one fixed temperature.", "ΔS = mL ÷ T, using kJ gives kJ/K.", "Example: 2 kg, 200 kJ/kg at 400 K: 400 ÷ 400 = 1 kJ/K. Now do yours."),
        S(`A reservoir at ${T2} K gains ${Q2 / T2} J/K of entropy. How much heat entered it, in joules?`, "♨️", Q2,
          "Rearrange ΔS = Q÷T.", "Q = T × ΔS.", "Example: 200 K and 4 J/K gives 800 J. Now do yours.")
      ]);
    }),
    num("Refrigerators and heat pumps", [
      ["Moving heat uphill", "❄️", "A refrigerator uses work W to pull heat Q_c out of a cold place and dump Q_h = Q_c + W into the room. Its <b>coefficient of performance</b> is <b>COP = Q_c ÷ W</b>."],
      ["The best possible", "🧩", "An ideal (Carnot) fridge has <b>COP = T_c ÷ (T_h − T_c)</b>. An ideal heat pump, which aims at the heat delivered, has <b>COP = T_h ÷ (T_h − T_c)</b>. Temperatures in kelvin."],
      ["Example", "🧮", "Inside 270 K, kitchen 300 K: fridge COP = 270 ÷ 30 = 9. Heat pump COP = 300 ÷ 30 = 10."]
    ], () => {
      const pr = pick([[300, 250], [400, 300], [360, 300], [330, 300], [350, 280], [320, 240], [500, 400]]);
      const W = pick([100, 200, 300, 500]);
      return pick([
        S(`An ideal refrigerator keeps its inside at ${pr[1]} K in a ${pr[0]} K room. What is its coefficient of performance?`, "🧊", pr[1] / (pr[0] - pr[1]),
          "Compare the cold temperature with the temperature gap.", "COP = T_c ÷ (T_h − T_c).", "Example: 270 K inside and 300 K outside gives 270 ÷ 30 = 9. Now do yours."),
        S(`An ideal heat pump warms a house to ${pr[0]} K from outdoors at ${pr[1]} K. What is its coefficient of performance?`, "🏠", pr[0] / (pr[0] - pr[1]),
          "A heat pump counts the heat delivered, so use the hot temperature on top.", "COP = T_h ÷ (T_h − T_c).", "Example: 300 K inside and 270 K outside gives 300 ÷ 30 = 10. Now do yours."),
        S(`A fridge with COP ${pr[1] / (pr[0] - pr[1])} uses ${W} J of work. How much heat does it remove from the inside, in joules?`, "❄️", W * pr[1] / (pr[0] - pr[1]),
          "COP is the heat removed per unit of work.", "Q_c = COP × W.", "Example: COP 4 and 150 J of work removes 600 J. Now do yours."),
        S(`A fridge removes ${W * pr[1] / (pr[0] - pr[1])} J from its inside using ${W} J of work. What is its COP?`, "🧮", pr[1] / (pr[0] - pr[1]),
          "COP compares the heat removed with the work paid.", "COP = Q_c ÷ W.", "Example: removing 900 J with 300 J of work gives 3. Now do yours.")
      ]);
    }),
    num("Kinetic theory scaling", [
      ["Molecules in motion", "💨", "In an ideal gas the average translational energy per molecule is <b>(3÷2) kT</b>, so it is proportional to T. The typical speed is <b>v_rms ∝ √(T÷M)</b>."],
      ["Using ratios", "🧩", "Four times the temperature gives twice the speed. A molecule four times heavier at the same T is half as fast. Pressure follows <b>p ∝ nT÷V</b>."],
      ["Example", "🧮", "H₂ (2) vs O₂ (32) at the same T: speed ratio = √(32÷2) = 4, so hydrogen is 4× faster."]
    ], () => {
      const [v0, f] = combo([[300, 400, 500, 600, 800], [[4, 2], [9, 3], [16, 4], [25, 5]]], () => true);
      const pr = pick([[2, 32, 4], [4, 64, 4], [1, 9, 3], [4, 36, 3], [2, 8, 2], [8, 32, 2], [3, 27, 3]]);
      const [p0, fT, fV] = combo([[100, 200, 300], [2, 3, 4], [2, 4]], () => true);
      return pick([
        S(`Gas molecules have rms speed ${v0} m/s. The temperature is multiplied by ${f[0]}. What is the new rms speed, in m/s?`, "💨", v0 * f[1],
          "Speed depends on the square root of the temperature.", `Take the square root of ${f[0]}.`, "Example: T times 4 turns 250 m/s into 500 m/s. Now do yours."),
        S(`Gas A has molar mass ${pr[0]} and gas B has molar mass ${pr[1]}, at the same temperature. How many times faster (rms) are the molecules of A than B?`, "⚗️", pr[2],
          "Lighter molecules move faster at the same temperature.", "Ratio = √(M_B ÷ M_A).", "Example: masses 3 and 12 give √4 = 2. Now do yours."),
        S(`A gas at ${p0} kPa has its temperature multiplied by ${fT} and its volume divided by ${fV} (same moles). What is the new pressure, in kPa?`, "🎈", p0 * fT * fV,
          "Pressure rises with T and with squeezing.", "p₂ = p₁ × (T₂÷T₁) × (V₁÷V₂).", "Example: 50 kPa, T ×3 and V ÷ 2 gives 300 kPa. Now do yours."),
        S(`A gas has molecules with average kinetic energy 6 × 10⁻²¹ J at 300 K. What is the average kinetic energy at ${300 * fT} K, in units of 10⁻²¹ J?`, "🌡️", 6 * fT,
          "Average kinetic energy is proportional to T.", "Multiply by the ratio of temperatures.", "Example: doubling T from 300 K takes 6 to 12 (×10⁻²¹ J). Now do yours with the new factor.")
      ]);
    }),
    num("Thermal radiation", [
      ["Everything glows", "🔆", "Every hot object radiates. The power is <b>P = σAT⁴</b> (Stefan-Boltzmann), so doubling T gives <b>16×</b> the power."],
      ["Wien's law", "🧩", "The peak wavelength shifts as it heats: <b>λ_max T = b</b> with b ≈ 3000 µm·K (the true value is 2898). Hotter means shorter wavelengths: red, white, then blue."],
      ["Example", "🧮", "T ×3 gives 3⁴ = 81× the power. The Sun at 6000 K peaks near 3000 ÷ 6000 = 0.5 µm; a person at 300 K near 10 µm (infrared)."]
    ], () => {
      const P0 = pick([2, 5, 10, 20]), k = pick([2, 3]);
      const [T, ] = combo([[300, 600, 1000, 1500, 2000, 3000, 6000]], () => true);
      const f = pick([[16, 2], [81, 3]]);
      const A = pick([2, 3, 4]);
      return pick([
        S(`A hot object radiates ${P0} W. Its absolute temperature is multiplied by ${k}. What power does it radiate now, in watts?`, "🔆", P0 * Math.pow(k, 4),
          "The power depends on the fourth power of T.", `Raise ${k} to the power 4 and multiply.`, "Example: 2 W with T doubled gives 2 × 16 = 32 W. Now do yours."),
        S(`A glowing object radiates ${f[0]} times as much power as before at the same size. By what factor did its absolute temperature rise?`, "🌡️", f[1],
          "Undo the fourth power with a fourth root.", `Which number to the fourth gives ${f[0]}?`, "Example: 625 times the power means a factor 5, since 5⁴ = 625. Now do yours."),
        S(`A star has surface temperature ${T} K. Using λ_max T = 3000 µm·K, what is its peak wavelength, in µm?`, "⭐", 3000 / T,
          "Hotter objects peak at shorter wavelengths.", "λ_max = 3000 ÷ T.", "Example: 1200 K gives 2.5 µm. Now do yours."),
        S(`Two glowing objects have the same temperature. Object B has ${A} times the surface area of A, and A radiates ${P0} W. How much does B radiate, in watts?`, "📐", P0 * A,
          "At the same temperature, power is proportional to area.", "P = σAT⁴ with the same T.", "Example: A radiates 4 W, B has 5 times the area: 20 W. Now do yours.")
      ]);
    }),
    num("Gauss's law and symmetry", [
      ["Flux through a closed surface", "🫧", "<b>Gauss's law: Φ = Q_enc ÷ ε₀</b>. Only the charge inside counts. Use ε₀ ≈ 9 × 10⁻¹² C²/(N·m²) and k = 9 × 10⁹ N·m²/C²."],
      ["Fields from symmetry", "🧩", "Sphere (outside): <b>E = kQ÷r²</b>. Long line: <b>E = 2kλ÷r</b>. Infinite sheet: <b>E = σ÷2ε₀</b>, the same at every distance. With charges in nC: sphere E = 9Q÷r², line E = 18λ÷r."],
      ["Example", "🧮", "18 nC inside: Φ = 18 × 10⁻⁹ ÷ 9 × 10⁻¹² = 2000 N·m²/C. A 4 nC sphere at 2 m: E = 9 × 4 ÷ 4 = 9 N/C."]
    ], () => {
      const Q = pick([9, 18, 27, 36, 45]);
      const [q2, r] = combo([[1, 2, 3, 4, 5, 8, 10], [1, 2, 3, 4, 5, 6]], (q2, r) => cl(9 * q2 / (r * r)));
      const [lam, r3] = combo([[1, 2, 3, 4, 5], [1, 2, 3, 4, 6, 9]], (lam, r3) => cl(18 * lam / r3));
      const s = pick([9, 18, 27, 36]);
      return pick([
        S(`A closed surface encloses ${Q} nC of net charge. What is the electric flux through it, in N·m²/C? (ε₀ = 9 × 10⁻¹²)`, "🫧", Q * 1e-9 / 9e-12,
          "Only the enclosed charge matters, not the surface's shape.", "Φ = Q ÷ ε₀, converting nC to C.", "Example: 27 nC gives 27 × 10⁻⁹ ÷ 9 × 10⁻¹² = 3000 N·m²/C. Now do yours."),
        S(`A charged sphere carries ${q2} nC. What is the field at ${r} m from its centre, in N/C? (E = 9Q÷r² with Q in nC)`, "🔮", 9 * q2 / (r * r),
          "Outside a sphere it acts like a point charge.", "E = kQ ÷ r², which is 9Q÷r² when Q is in nC.", "Example: 8 nC at 3 m gives 72 ÷ 9 = 8 N/C. Now do yours."),
        S(`A long line carries ${lam} nC per metre. What is the field ${r3} m away, in N/C? (E = 18λ÷r with λ in nC/m)`, "📏", 18 * lam / r3,
          "A line of charge has a field that falls as 1÷r.", "E = 2kλ ÷ r = 18λ ÷ r.", "Example: 4 nC/m at 6 m gives 72 ÷ 6 = 12 N/C. Now do yours."),
        S(`A large flat sheet carries ${s} nC/m². What is the field near it, in N/C? (E = σ÷2ε₀, ε₀ = 9 × 10⁻¹²)`, "🟦", s * 1e-9 / (2 * 9e-12),
          "The sheet's field does not depend on distance.", "E = σ ÷ (2ε₀), converting nC to C.", "Example: 18 nC/m² gives 18 × 10⁻⁹ ÷ 18 × 10⁻¹² = 1000 N/C. Now do yours.")
      ]);
    }),
    les("Gauss's law in conductors", [
      ["Conductors in equilibrium", "🔩", "In electrostatics, charges in a conductor move until the field inside is <b>zero</b>. Any extra charge sits on the <b>outer surface</b>."],
      ["Shells", "🧩", "Inside a charged conducting shell the field is zero (no enclosed charge). Outside, a spherical shell acts like a point charge at its centre. The field at a conductor's surface is perpendicular to it."],
      ["Shielding", "🛡️", "A closed metal box is a Faraday cage: charges rearrange to cancel external fields inside it."]
    ], ["Think about what the charges in a conductor do until nothing moves.", "Gauss's law uses only the charge inside the surface you draw.", "Example: a Gaussian surface inside metal encloses no net charge, so the field there is zero. Now think about yours."], [
      ["Inside a conductor in electrostatic equilibrium the electric field is...", "Zero", "Equal to the outside field", "Infinite"],
      ["Extra charge placed on an isolated conductor ends up...", "On its outer surface", "Throughout its volume", "At its centre"],
      ["Inside the hollow of a charged conducting shell the field is...", "Zero", "kQ÷r²", "Constant but non-zero"],
      ["Outside a uniformly charged sphere the field looks like that of...", "a point charge at the centre", "a long line of charge", "an infinite sheet"],
      ["A Gaussian surface is...", "an imaginary closed surface chosen for symmetry", "a real metal shell", "a magnetic field line"],
      ["The field just outside a conductor's surface points...", "perpendicular to the surface", "parallel to the surface", "at 45° to the surface"],
      ["If the net flux through a closed surface is zero, the net enclosed charge is...", "zero", "positive", "negative"],
      ["A metal box shields its inside from static electric fields because...", "charges rearrange to cancel the field inside", "metal absorbs all light", "gravity pulls the field away"]
    ]),
    num("Charges through a potential difference", [
      ["Energy from voltage", "⚡", "A charge q moved through a potential difference ΔV gains energy <b>qΔV</b>. If it started at rest, <b>qΔV = ½mv²</b>."],
      ["Electron-volts", "🧩", "An <b>electron-volt</b> is the energy of one elementary charge through 1 V. A particle of charge ne through V volts gains <b>nV eV</b>. With q in µC, m in mg and V in volts, v = √(2qV÷m) in m/s."],
      ["Example", "🧮", "q = 2 µC through 100 V gains 200 µJ. With m = 4 mg: v = √(2×2×100÷4) = 10 m/s."]
    ], () => {
      const [q, V, v] = combo([[1, 2, 5, 10], [10, 50, 100, 200, 500], [2, 4, 5, 10, 20]], (q, V, v) => Number.isInteger(2 * q * V / (v * v)) && 2 * q * V / (v * v) > 0);
      const m = 2 * q * V / (v * v);
      const [n, V2] = combo([[1, 2, 3, 4], [10, 50, 100, 200, 500]], () => true);
      return pick([
        S(`A ${q} µC charge is accelerated from rest through ${V} V. How much kinetic energy does it gain, in µJ?`, "⚡", q * V,
          "Energy gained is charge times voltage.", "KE = qV (µC × V gives µJ).", "Example: 3 µC through 40 V gains 120 µJ. Now do yours."),
        S(`A ${m} mg particle with charge ${q} µC is accelerated from rest through ${V} V. What speed does it reach, in m/s? (v = √(2qV÷m))`, "🚀", v,
          "All the electrical energy becomes kinetic energy.", "qV = ½mv², so v = √(2qV ÷ m) using µC, mg and volts.", "Example: q = 3 µC, V = 150 V, m = 9 mg gives v = √(2×3×150÷9) = √100 = 10 m/s. Now do yours."),
        S(`An ion with charge ${n}e is accelerated through ${V2} V. What energy does it gain, in eV?`, "🔬", n * V2,
          "One elementary charge through one volt is one electron-volt.", "Energy in eV = n × V.", "Example: 3e through 200 V gains 600 eV. Now do yours."),
        S(`A ${q} µC charge gains ${q * V} µJ crossing a gap. What potential difference did it cross, in volts?`, "🔋", V,
          "Rearrange KE = qV.", "V = KE ÷ q.", "Example: 600 µJ for 3 µC means 200 V. Now do yours.")
      ]);
    }),
    num("Electric field from potential", [
      ["Field is minus the slope of V", "⛰️", "<b>E = −dV/dx</b>. The field points downhill in potential, and its size is the slope of V(x). For a uniform field, E = ΔV ÷ d."],
      ["Potential from a field", "🧩", "Going backwards: <b>ΔV = −∫ E dx</b>. For E = kx, the potential drop from 0 to x is <b>½kx²</b>."],
      ["Example", "🧮", "V = 4x² gives E = 8x, size 16 V/m at x = 2 m. V = 100 − 20x gives a uniform 20 V/m."]
    ], () => {
      const [A, x] = combo([[1, 2, 3, 4, 5], [1, 2, 3, 4]], () => true);
      const [V0, b_] = pick([[100, 20], [200, 50], [60, 15], [300, 40]]);
      const [kk, X] = combo([[2, 4, 6, 10], [1, 2, 3, 4]], () => true);
      return pick([
        S(`In a region V = ${A}x² (volts, x in m). What is the size of the electric field at x = ${x} m, in V/m?`, "⛰️", 2 * A * x,
          "The field is the (negative) derivative of the potential.", "d/dx of Ax² is 2Ax.", "Example: V = 3x² at x = 5 gives 30 V/m. Now do yours."),
        S(`In a region V = ${A}x³ (volts, x in m). What is the size of the field at x = ${x} m, in V/m?`, "📉", 3 * A * x * x,
          "Differentiate V with respect to x.", "d/dx of Ax³ is 3Ax².", "Example: V = 2x³ at x = 4 gives 96 V/m. Now do yours."),
        S(`The potential along a line is V = ${V0} − ${b_}x (volts, x in m). What is the size of the (uniform) field, in V/m?`, "📏", b_,
          "A straight-line potential has a constant slope.", "|E| = |dV/dx|.", "Example: V = 90 − 12x has E = 12 V/m. Now do yours."),
        S(`The field in a region is E = ${kk}x V/m. What is the potential drop from x = 0 to x = ${X} m, in volts?`, "🔋", 0.5 * kk * X * X,
          "Integrate the field over the distance.", "ΔV = ∫ kx dx = ½kx².", "Example: E = 8x to x = 3 m gives 4 × 9 = 36 V. Now do yours.")
      ]);
    }),
    num("Dielectrics in capacitors", [
      ["Filling the gap", "🧱", "A <b>dielectric</b> of constant κ between the plates multiplies the capacitance: <b>C = κC₀</b>. It weakens the field inside by κ."],
      ["Two situations", "🧩", "<b>Battery connected</b> (V fixed): Q → κQ₀ and U → κU₀. <b>Isolated</b> (Q fixed): V → V₀÷κ, U → U₀÷κ, E → E₀÷κ."],
      ["Example", "🧮", "C₀ = 5 µF, κ = 4: C = 20 µF. An isolated capacitor at 80 V with κ = 4 drops to 20 V."]
    ], () => {
      const [C0, k] = combo([[1, 2, 3, 5, 10], [2, 3, 4, 5]], () => true);
      const [V0, k2] = combo([[60, 120, 240, 300, 600], [2, 3, 4, 5, 6]], (V0, k2) => cl(V0 / k2));
      const [Q0, k3] = combo([[10, 20, 30, 40], [2, 3, 4]], () => true);
      const [U0, k4] = combo([[60, 120, 240, 480], [2, 3, 4, 6]], (U0, k4) => cl(U0 / k4));
      return pick([
        S(`A ${C0} µF capacitor is filled with a dielectric of κ = ${k}. What is its new capacitance, in µF?`, "🧱", C0 * k,
          "The dielectric makes it store more charge per volt.", "C = κC₀.", "Example: 6 µF with κ = 5 gives 30 µF. Now do yours."),
        S(`An isolated charged capacitor is at ${V0} V. A dielectric of κ = ${k2} is slid in. What is the new voltage, in volts?`, "🔌", V0 / k2,
          "Isolated means the charge cannot change.", "V = Q ÷ C, and C grew by κ, so V drops by κ.", "Example: 200 V with κ = 4 becomes 50 V. Now do yours."),
        S(`A capacitor stays connected to a battery and holds ${Q0} µC. A dielectric with κ = ${k3} is inserted. What charge does it hold now, in µC?`, "🔋", Q0 * k3,
          "The battery holds the voltage fixed.", "Q = CV, and C grew by κ, so Q grows by κ.", "Example: 15 µC with κ = 4 becomes 60 µC. Now do yours."),
        S(`An isolated capacitor stores ${U0} µJ. A dielectric of κ = ${k4} is inserted. What energy does it store now, in µJ?`, "⚡", U0 / k4,
          "With Q fixed, energy is Q²÷2C.", "U = U₀ ÷ κ for an isolated capacitor.", "Example: 300 µJ with κ = 5 becomes 60 µJ. Now do yours.")
      ]);
    }),
    num("Current density and fields in wires", [
      ["Current per area", "🔌", "<b>Current density J = I ÷ A</b> (A/m² or A/mm²). Inside a wire the electric field drives it: <b>E = ρJ</b>, where ρ is resistivity."],
      ["Along a wire", "🧩", "The voltage along a length L is <b>V = E L</b>. Use ρ in units of 10⁻⁸ Ω·m, A in mm², and I in amps: <b>E = ρ₈ × I ÷ (100 A_mm²)</b> V/m."],
      ["Example", "🧮", "10 A in a 2 mm² wire: J = 5 A/mm². With ρ = 2 × 10⁻⁸: E = 2 × 10 ÷ 200 = 0.1 V/m. Over 30 m that is 3 V."]
    ], () => {
      const [I, A] = combo([[2, 4, 5, 10, 20], [1, 2, 4, 5]], () => true);
      const [rho, I2, A2] = combo([[1, 2, 4, 5], [5, 10, 20, 50], [1, 2, 4, 5]], (rho, I2, A2) => cl(rho * I2 / (100 * A2)));
      const L = pick([10, 20, 30, 50, 100]);
      return pick([
        S(`A current of ${I * A} A flows through a wire of cross-section ${A} mm². What is the current density, in A/mm²?`, "🔌", I,
          "Current density is current per unit area.", "J = I ÷ A.", "Example: 24 A through 4 mm² gives 6 A/mm². Now do yours."),
        S(`A wire has current density ${I} A/mm² and cross-section ${A} mm². What current does it carry, in amps?`, "⚡", I * A,
          "Rearrange J = I÷A.", "I = J × A.", "Example: 6 A/mm² through 3 mm² gives 18 A. Now do yours."),
        S(`A wire (ρ = ${rho} × 10⁻⁸ Ω·m, area ${A2} mm²) carries ${I2} A. What is the electric field inside it, in V/m? (E = ρ₈ I ÷ (100 A))`, "🧲", rho * I2 / (100 * A2),
          "Field equals resistivity times current density.", "E = ρ × J; convert mm² to m² using the shortcut formula.", "Example: ρ = 2, I = 30 A, A = 3 mm²: E = 60 ÷ 300 = 0.2 V/m. Now do yours."),
        S(`The field inside a wire is ${rho * I2 / (100 * A2)} V/m. How much voltage appears along ${L} m of it, in volts?`, "📏", rho * I2 / (100 * A2) * L,
          "For a uniform field, voltage is field times length.", "V = E × L.", "Example: 0.05 V/m over 40 m gives 2 V. Now do yours.")
      ]);
    }),
    num("Ampere's law inside and outside a wire", [
      ["Ampère's law", "🧲", "<b>∮ B·dl = μ₀ I_enc</b>. Pick a circular loop of radius r around a wire and only the current inside the loop counts."],
      ["A thick wire", "🧩", "For uniform current in a wire of radius R: inside, <b>B ∝ r</b> (B = B_surface × r÷R); outside, <b>B ∝ 1÷r</b> (B = B_surface × R÷r). The enclosed current inside is I r²÷R²."],
      ["Example", "🧮", "B = 12 mT at the surface. At r = R÷2 inside: 6 mT. At r = 3R outside: 4 mT. Far away, B = 0.2 I÷r µT (I in amps, r in metres)."]
    ], () => {
      const [Bs, fi] = combo([[8, 12, 16, 20, 40], [[0.5, 0.5], [0.25, 0.25], [0.75, 0.75], [0.2, 0.2]]], (Bs, fi) => cl(Bs * fi[0]));
      const [Bs2, fo] = combo([[12, 20, 40, 60], [2, 4, 5]], (Bs2, fo) => cl(Bs2 / fo));
      const [I, fr] = combo([[8, 12, 16, 20], [0.5, 0.25]], (I, fr) => cl(I * fr * fr));
      const [I3, r] = combo([[5, 10, 20, 25, 40], [0.5, 1, 2, 5]], (I3, r) => cl(0.2 * I3 / r));
      return pick([
        S(`A long thick wire has B = ${Bs} mT at its surface. What is B inside the wire at ${fi[0]} of the radius from the centre, in mT?`, "🧲", Bs * fi[0],
          "Inside a uniformly filled wire, less current is enclosed as you move toward the centre.", "B grows in proportion to r inside the wire.", "Example: 24 mT at the surface; at 0.5 R gives 12 mT. Now do yours."),
        S(`A long thick wire has B = ${Bs2} mT at its surface. What is B at ${fo} times the radius from the centre (outside), in mT?`, "🔭", Bs2 / fo,
          "Outside, the whole current is enclosed, so it acts like a thin wire.", "B falls like 1÷r outside.", "Example: 30 mT at the surface becomes 10 mT at 3R. Now do yours."),
        S(`A wire of radius R carries ${I} A uniformly. How much current is enclosed by a loop of radius ${fr}R, in amps?`, "🔁", I * fr * fr,
          "Uniform current means enclosed current is proportional to area.", "I_enc = I × (r÷R)².", "Example: 40 A and r = R÷2 encloses 10 A. Now do yours."),
        S(`A long straight wire carries ${I3} A. Using B = 0.2 I÷r (µT, with I in amps and r in metres), what is B at ${r} m, in µT?`, "🧲", 0.2 * I3 / r,
          "The field of a long wire falls as 1÷r.", "B = (μ₀ ÷ 2π) I ÷ r = 0.2 I÷r in these units.", "Example: 30 A at 3 m gives 0.2 × 30 ÷ 3 = 2 µT. Now do yours.")
      ]);
    }),
    num("Faraday's law with calculus", [
      ["Induced emf", "🧲", "<b>ε = −dΦ/dt</b>, and for a coil of N turns <b>ε = −N dΦ/dt</b>. Magnetic flux through a flat loop: Φ = BA (field perpendicular to loop)."],
      ["Changing field", "🧩", "If B = bt² through area A, then Φ = bt²A, so ε = 2btA. If B = bt, then ε = bA (constant). Lenz's law gives the sign; here we use sizes."],
      ["Example", "🧮", "Φ = 3t² Wb gives ε = 6t V, so 18 V at 3 s. A 100-turn coil with Φ = 0.05t gives ε = 5 V."]
    ], () => {
      const [a_, t] = combo([[1, 2, 3, 4, 5], [1, 2, 3, 4]], () => true);
      const [b2, A] = combo([[0.5, 1, 2, 4], [0.1, 0.2, 0.5, 1]], (b2, A) => cl(b2 * A) && cl(2 * b2 * A));
      const [N, f] = combo([[10, 20, 50, 100], [0.01, 0.02, 0.05, 0.1]], (N, f) => cl(N * f));
      return pick([
        S(`The magnetic flux through a loop is Φ = ${a_}t² (webers, t in s). What is the induced emf size at t = ${t} s, in volts?`, "🧲", 2 * a_ * t,
          "Induced emf is the rate of change of flux.", "d/dt of at² is 2at.", "Example: Φ = 4t² at 5 s gives 40 V. Now do yours."),
        S(`A loop of area ${A} m² sits in a field B = ${b2}t² (tesla, t in s). What is the induced emf size at t = ${t} s, in volts?`, "🧿", 2 * b2 * t * A,
          "Flux is B times A; differentiate it with respect to time.", "ε = A × dB/dt = A × 2bt.", "Example: A = 0.5 m², B = 3t² at t = 2 s: 0.5 × 12 = 6 V. Now do yours."),
        S(`A loop of area ${A} m² sits in a field B = ${b2}t (tesla, t in s). What is the induced emf, in volts? (It is constant.)`, "⏱️", b2 * A,
          "A steadily growing field gives a steady emf.", "ε = A × dB/dt = A b.", "Example: A = 2 m² and B = 3t gives 6 V. Now do yours."),
        S(`A ${N}-turn coil has flux per turn Φ = ${f}t (webers, t in s). What is the induced emf, in volts?`, "🌀", N * f,
          "Every turn contributes the same emf.", "ε = N × dΦ/dt.", "Example: 200 turns and Φ = 0.04t gives 8 V. Now do yours.")
      ]);
    }),
    num("Inductors and RL circuits", [
      ["Self-inductance", "🧵", "A coil resists changes in current: <b>ε = L dI/dt</b> (henries). It stores magnetic energy <b>U = ½LI²</b>."],
      ["RL circuit", "🧩", "With a battery ε and resistor R in series with the coil: final current <b>I = ε÷R</b>, reached over a time constant <b>τ = L÷R</b>. Right at the start the coil blocks the current."],
      ["Example", "🧮", "L = 2 H and current rising 5 A/s: emf = 10 V. L = 2 H, R = 4 Ω: τ = 0.5 s. At 3 A, U = ½ × 2 × 9 = 9 J."]
    ], () => {
      const [L, r] = combo([[0.5, 1, 2, 4, 5], [2, 5, 10, 20]], () => true);
      const [dI] = combo([[2, 4, 5, 10, 20]], () => true);
      const [I] = combo([[1, 2, 3, 4, 5, 6]], () => true);
      const [eps, R] = combo([[6, 12, 24, 30, 60], [2, 3, 4, 6, 10]], (eps, R) => cl(eps / R));
      return pick([
        S(`A ${L} H inductor has its current changing at ${dI} A/s. What emf appears across it, in volts?`, "🧵", L * dI,
          "The coil's emf is proportional to how fast the current changes.", "ε = L × dI/dt.", "Example: 3 H and 6 A/s gives 18 V. Now do yours."),
        S(`A ${L} H inductor carries ${I} A. How much energy does it store, in joules?`, "🔋", 0.5 * L * I * I,
          "Energy depends on the square of the current.", "U = ½ L I².", "Example: 4 H and 5 A stores 50 J. Now do yours."),
        S(`An RL circuit has L = ${L} H and R = ${r} Ω. What is its time constant, in seconds?`, "⏱️", L / r,
          "The time constant compares inductance with resistance.", "τ = L ÷ R.", "Example: 6 H and 4 Ω gives 1.5 s. Now do yours."),
        S(`A ${eps} V battery drives a coil in series with a ${R} Ω resistor. After a long time, what steady current flows, in amps?`, "🔌", eps / R,
          "After a long time the current stops changing, so the coil has no emf.", "I = ε ÷ R.", "Example: 20 V and 5 Ω gives 4 A. Now do yours.")
      ]);
    }),
    num("Electromagnetic waves", [
      ["Light is a wave of fields", "📡", "Changing E makes B and changing B makes E, giving waves at <b>c = 3 × 10⁸ m/s</b>. In the wave, <b>E₀ = cB₀</b> and the fields are at right angles to each other and to the motion."],
      ["Wavelength and frequency", "🧩", "<b>c = fλ</b>. With f in MHz, λ(m) = 300 ÷ f. With B in nT, E in V/m is E = 0.3 × B(nT). Intensity goes with E₀², so double E₀ means 4× intensity."],
      ["Example", "🧮", "100 MHz radio: λ = 3 m. B₀ = 50 nT gives E₀ = 15 V/m."]
    ], () => {
      const f = pick([3, 6, 10, 30, 60, 100, 150, 300]);
      const B = pick([10, 20, 30, 50, 100, 200]);
      const I0 = pick([2, 5, 10, 25]), fa = pick([2, 3, 4]);
      return pick([
        S(`A radio station broadcasts at ${f} MHz. What is the wavelength, in metres? (c = 3 × 10⁸ m/s)`, "📻", 300 / f,
          "Wavelength is speed divided by frequency.", "λ = c ÷ f, which is 300 ÷ f when f is in MHz.", "Example: 75 MHz gives 4 m. Now do yours."),
        S(`A radio wave has wavelength ${300 / f} m. What is its frequency, in MHz?`, "📡", f,
          "Rearrange c = fλ.", "f = 300 ÷ λ (in MHz, with λ in metres).", "Example: λ = 5 m gives 60 MHz. Now do yours."),
        S(`An electromagnetic wave has B₀ = ${B} nT. What is E₀, in V/m? (E₀ = cB₀, which is 0.3 × B in nT)`, "⚡", 0.3 * B,
          "The electric amplitude is c times the magnetic amplitude.", "E₀ = 0.3 × B₀(nT) in V/m.", "Example: B₀ = 40 nT gives 12 V/m. Now do yours."),
        S(`A light beam has intensity ${I0} W/m². Its electric amplitude is multiplied by ${fa}. What is the new intensity, in W/m²?`, "💡", I0 * fa * fa,
          "Intensity depends on the square of the electric amplitude.", "Multiply by the factor squared.", "Example: 3 W/m² with E₀ ×4 gives 48 W/m². Now do yours.")
      ]);
    })
  );
  c.push(
    mix("Mixed practice", at(c, [0, 1, 2, 3, 4, 5, 6, 8, 10, 11, 12, 14, 16, 17])),
    mix("Level 27 Challenge", at(c, [1, 3, 5, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17]))
  );

  Object.assign(PHYSICS_LEVELS, { 25: a, 26: b, 27: c });
})();
