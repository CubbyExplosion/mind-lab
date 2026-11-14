// ext/physics-22-24.js  Physics levels 22-24 (10th grade 2nd half, 11th grade): rotation, gravitation, thermodynamics, fields, induction, modern physics, fluids
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
  // S(text, visual, answer, nudge, clue, workedExample)
  const S = (text, visual, answer, a, b, c) => ({ text, visual, answer: r2(answer), hints: [a, b, c] });
  // choose a random combination from a list of axes that passes a test
  const combo = (axes, ok) => {
    for (let i = 0; i < 5000; i++) { const c = axes.map(a => pick(a)); if (ok(...c)) return c; }
    throw new Error("combo failed");
  };

  // ================= LEVEL 22 =================
  const a = [
    num("Angular speed", [
      ["Turning rate", "🎡", "<b>Angular speed</b> ω says how fast an angle changes: <b>ω = θ ÷ t</b>, in radians per second. One full turn is 2π radians (about 6.3)."],
      ["Revolutions", "🌀", "If something makes <b>f</b> turns each second, then <b>ω = 2πf</b>. To change rpm (turns per minute) into turns per second, divide by 60."],
      ["Example", "🧮", "A wheel turns 40 rad in 8 s: ω = 40 ÷ 8 = 5 rad/s. A fan at 3 turns per second with π = 3: ω = 2 × 3 × 3 = 18 rad/s."]
    ], () => {
      const w = pick([2, 3, 4, 5, 6, 8, 10]), t = pick([2, 3, 4, 5, 10]), f = pick([1, 2, 3, 5, 10]), n = pick([60, 120, 180, 300, 600, 1200]);
      return pick([
        S(`A turntable turns through ${w * t} radians in ${t} seconds at a steady rate. What is its angular speed in rad/s?`, "💿", w,
          "Angular speed is angle divided by time.", "Divide the angle in radians by the number of seconds.", "Example: 60 rad in 5 s gives 60 ÷ 5 = 12 rad/s. Now do yours."),
        S(`A wheel spins steadily at ${w} rad/s. Through how many radians does it turn in ${t} s?`, "🎡", w * t,
          "Steady spin means the angle grows by the same amount every second.", "Angle = angular speed × time.", "Example: 4 rad/s for 6 s gives 4 × 6 = 24 rad. Now do yours."),
        S(`A fan spins at ${f} revolutions per second. What is its angular speed in rad/s? (One revolution is 2π rad; use π = 3.)`, "🌀", 6 * f,
          "Each revolution is 2π radians.", "ω = 2π × f, with π = 3.", "Example: 4 turns per second gives 2 × 3 × 4 = 24 rad/s. Now do yours."),
        S(`A motor turns at ${n} revolutions per minute. How many revolutions per second is that?`, "⚙️", n / 60,
          "A minute has 60 seconds.", "Divide the turns per minute by 60.", "Example: 240 rpm is 240 ÷ 60 = 4 turns per second. Now do yours.")
      ]);
    }),
    num("Speed on a spinning wheel", [
      ["Along the rim", "🎠", "A point at radius <b>r</b> on a wheel turning at ω moves along a circle at speed <b>v = ωr</b>. Points farther from the centre move faster."],
      ["Acceleration towards the centre", "🎯", "The point also accelerates towards the centre with <b>a = ω²r</b> (which equals v²÷r)."],
      ["Example", "🧮", "ω = 5 rad/s and r = 2 m: v = 5 × 2 = 10 m/s and a = 25 × 2 = 50 m/s²."]
    ], () => {
      const [w, r] = combo([[2, 3, 4, 5, 6, 8, 10], [0.25, 0.5, 1, 1.5, 2, 3, 4]], (w, r) => cl(w * r) && cl(w * w * r));
      return pick([
        S(`A merry-go-round turns at ${w} rad/s. How fast is a rider ${r} m from the centre moving, in m/s?`, "🎠", w * r,
          "Speed along the circle depends on both the spin rate and the distance from the centre.", "v = ω × r.", "Example: ω = 3 rad/s and r = 4 m gives v = 12 m/s. Now do yours."),
        S(`A point on a wheel moves at ${r2(w * r)} m/s and the wheel turns at ${w} rad/s. How far is the point from the centre, in metres?`, "🎡", r,
          "Rearrange v = ωr.", "r = v ÷ ω.", "Example: v = 18 m/s at 6 rad/s gives r = 18 ÷ 6 = 3 m. Now do yours."),
        S(`A point ${r} m from the centre of a wheel moves at ${r2(w * r)} m/s. What is the wheel's angular speed in rad/s?`, "⚙️", w,
          "Rearrange v = ωr.", "ω = v ÷ r.", "Example: v = 12 m/s at r = 4 m gives ω = 3 rad/s. Now do yours."),
        S(`A point ${r} m from the centre of a wheel turning at ${w} rad/s has what acceleration towards the centre, in m/s²? (a = ω²r)`, "🎯", w * w * r,
          "Square the angular speed first.", "a = ω² × r.", "Example: ω = 4 rad/s and r = 2 m gives 16 × 2 = 32 m/s². Now do yours.")
      ]);
    }),
    num("Angular acceleration", [
      ["Speeding up a spin", "🌪️", "<b>Angular acceleration</b> α is how fast ω changes, in rad/s². It follows the same pattern as straight-line motion: <b>ω = ω₀ + αt</b>."],
      ["Angle turned", "📐", "Starting from rest, the angle turned is <b>θ = ½αt²</b>. In general θ = ω₀t + ½αt²."],
      ["Example", "🧮", "From rest with α = 4 rad/s² for 5 s: ω = 20 rad/s and θ = ½ × 4 × 25 = 50 rad."]
    ], () => {
      const [w0, al, t] = combo([[0, 2, 4, 6, 10], [1, 2, 3, 4, 5], [2, 3, 4, 5, 6]], () => true);
      return pick([
        S(`A wheel spinning at ${w0} rad/s speeds up at ${al} rad/s² for ${t} s. What is its angular speed at the end, in rad/s?`, "🌀", w0 + al * t,
          "Each second adds the same amount to the spin rate.", "ω = ω₀ + α × t.", "Example: starts at 3 rad/s, α = 2 rad/s² for 4 s: 3 + 8 = 11 rad/s. Now do yours."),
        S(`A wheel at rest speeds up to ${al * t} rad/s in ${t} s at a steady rate. What is its angular acceleration in rad/s²?`, "🎡", al,
          "Acceleration is the change in spin rate divided by time.", "α = (ω − ω₀) ÷ t, and ω₀ = 0 here.", "Example: reaching 24 rad/s in 6 s gives 24 ÷ 6 = 4 rad/s². Now do yours."),
        S(`A wheel starts from rest with α = ${al} rad/s². Through how many radians does it turn in ${t} s? (θ = ½αt²)`, "📐", 0.5 * al * t * t,
          "Starting at rest, the angle grows with the square of time.", "Square the time, multiply by α, then take half.", "Example: α = 2 rad/s² for 5 s gives ½ × 2 × 25 = 25 rad. Now do yours."),
        S(`A wheel at rest speeds up at ${al} rad/s². How long does it take to reach ${al * t} rad/s, in seconds?`, "⏱️", t,
          "Rearrange ω = αt for the time.", "t = ω ÷ α.", "Example: reaching 30 rad/s at 5 rad/s² takes 30 ÷ 5 = 6 s. Now do yours.")
      ]);
    }),
    num("Torque and angle", [
      ["Torque", "🔧", "<b>Torque</b> is a turning effect: <b>τ = F r sinθ</b>, where θ is the angle between the force and the lever arm. Measured in newton metres (N m)."],
      ["Best angle", "📐", "A push at 90° (sin 90° = 1) gives the largest torque. A push at 30° gives half as much (sin 30° = 0.5). A push along the lever (0°) gives none."],
      ["Example", "🧮", "A 40 N push on a 0.5 m spanner at 90°: 40 × 0.5 = 20 N m. At 30° it is 20 × 0.5 = 10 N m."]
    ], () => {
      const [F, r] = combo([[10, 20, 30, 40, 50, 60, 80, 100], [0.2, 0.25, 0.4, 0.5, 0.8, 1, 1.5, 2]], (F, r) => cl(F * r) && cl(F * r / 2));
      return pick([
        S(`A ${F} N force pushes at 90° on a spanner ${r} m long. What is the torque in N m?`, "🔧", F * r,
          "At 90° the full force turns the spanner.", "τ = F × r, because sin 90° = 1.", "Example: 30 N at 90° on 2 m gives 60 N m. Now do yours."),
        S(`A ${F} N force pushes on a lever ${r} m long, at 30° to the lever. What is the torque in N m? (sin 30° = 0.5)`, "📐", F * r / 2,
          "Only part of the push turns the lever.", "τ = F × r × 0.5.", "Example: 40 N on 1 m at 30° gives 40 × 1 × 0.5 = 20 N m. Now do yours."),
        S(`A torque of ${F * r} N m is made by a perpendicular force on a lever ${r} m long. How large is the force in newtons?`, "💪", F,
          "Rearrange τ = F r.", "F = τ ÷ r.", "Example: 60 N m on a 3 m lever needs 60 ÷ 3 = 20 N. Now do yours."),
        S(`A force of ${F} N at 30° to a lever produces a torque of ${F * r / 2} N m. How long is the lever in metres? (sin 30° = 0.5)`, "📏", r,
          "Include the 0.5 from sin 30° in the equation.", "r = τ ÷ (F × 0.5).", "Example: 10 N at 30° gives 10 N m: r = 10 ÷ 5 = 2 m. Now do yours.")
      ]);
    }),
    num("Moment of inertia", [
      ["Resistance to spinning", "🛞", "<b>Moment of inertia</b> I is how hard an object is to start or stop spinning. For a point mass: <b>I = mr²</b>. Mass far from the axis counts a lot (r is squared)."],
      ["Shapes", "⭕", "Hoop (ring) about its centre: <b>I = MR²</b>. Solid disc: <b>I = ½MR²</b>. Several masses: add up each mr²."],
      ["Example", "🧮", "A 3 kg ball on a light rod 2 m from the axis: 3 × 4 = 12 kg m². A 6 kg disc of radius 1 m: ½ × 6 × 1 = 3 kg m²."]
    ], () => {
      const m = pick([1, 2, 3, 4, 5]), r = pick([0.5, 1, 2, 3]), M = pick([2, 4, 6, 8, 10]), R = pick([0.5, 1, 2]);
      return pick([
        S(`A ${m} kg ball sits on a light rod ${r} m from the axis. What is its moment of inertia in kg m²? (I = mr²)`, "⚽", m * r * r,
          "Distance from the axis matters most, because it is squared.", "I = m × r × r.", "Example: 2 kg at 3 m gives 2 × 9 = 18 kg m². Now do yours."),
        S(`A solid disc has mass ${M} kg and radius ${R} m. What is its moment of inertia about its centre in kg m²? (I = ½MR²)`, "💿", 0.5 * M * R * R,
          "Use the formula for a solid disc, with a half in it.", "I = ½ × M × R².", "Example: 4 kg and R = 1 m gives ½ × 4 × 1 = 2 kg m². Now do yours."),
        S(`A thin hoop has mass ${M} kg and radius ${R} m. What is its moment of inertia about its centre in kg m²? (I = MR²)`, "⭕", M * R * R,
          "All the hoop's mass sits at the full radius.", "I = M × R².", "Example: 3 kg and R = 2 m gives 3 × 4 = 12 kg m². Now do yours."),
        S(`Two ${m} kg masses sit on opposite ends of a light rod, each ${r} m from the middle axis. What is the total moment of inertia in kg m²?`, "🏋️", 2 * m * r * r,
          "Each mass contributes its own mr² and you add them.", "Total I = 2 × m × r².", "Example: two 1 kg masses each 3 m from the axis: 9 + 9 = 18 kg m². Now do yours.")
      ]);
    }),
    num("Torque equals I times alpha", [
      ["Newton's second law for rotation", "🔄", "For spinning: <b>τ = Iα</b>. A bigger torque gives more angular acceleration, and a bigger moment of inertia gives less."],
      ["Force on a rim", "🧵", "A string pulling the rim of a wheel of radius R gives torque <b>τ = F R</b>. Then α = FR ÷ I."],
      ["Example", "🧮", "I = 2 kg m² and τ = 10 N m: α = 10 ÷ 2 = 5 rad/s²."]
    ], () => {
      const [I, al] = combo([[0.5, 1, 2, 4, 5, 10], [1, 2, 3, 4, 5, 6, 10]], (I, al) => cl(I * al));
      const [F, R, I2] = combo([[10, 20, 30, 40, 50], [0.1, 0.2, 0.5], [0.5, 1, 2, 4, 5]], (F, R, I2) => cl(F * R / I2) && cl(F * R));
      return pick([
        S(`A wheel has I = ${I} kg m² and a torque makes it accelerate at ${al} rad/s². What is the torque in N m?`, "🛞", I * al,
          "Torque is what causes angular acceleration.", "τ = I × α.", "Example: I = 3 and α = 4 gives τ = 12 N m. Now do yours."),
        S(`A torque of ${I * al} N m acts on a wheel with I = ${I} kg m². What is its angular acceleration in rad/s²?`, "🌀", al,
          "Rearrange τ = Iα.", "α = τ ÷ I.", "Example: 24 N m on I = 6 kg m² gives α = 4 rad/s². Now do yours."),
        S(`A torque of ${I * al} N m gives a wheel an angular acceleration of ${al} rad/s². What is its moment of inertia in kg m²?`, "⚙️", I,
          "Rearrange τ = Iα.", "I = τ ÷ α.", "Example: 30 N m gives 5 rad/s², so I = 6 kg m². Now do yours."),
        S(`A string pulls with ${F} N on the rim of a wheel of radius ${R} m and I = ${I2} kg m². What is the angular acceleration in rad/s²?`, "🧵", F * R / I2,
          "First find the torque from the force and the radius.", "τ = F × R, then α = τ ÷ I.", "Example: 20 N at R = 0.5 m on I = 2: τ = 10, so α = 5 rad/s². Now do yours.")
      ]);
    }),
    num("Rotational kinetic energy", [
      ["Energy of spinning", "⚡", "A spinning object has kinetic energy: <b>KE = ½Iω²</b>. It is the rotation version of ½mv²."],
      ["Rolling", "🛞", "A rolling object has both kinds: ½mv² for its centre moving and ½Iω² for its spin. For a solid disc rolling without slipping the total is <b>¾mv²</b>."],
      ["Example", "🧮", "I = 2 kg m² at ω = 10 rad/s: KE = ½ × 2 × 100 = 100 J."]
    ], () => {
      const [I, w] = combo([[0.5, 1, 2, 4, 0.2, 0.4], [2, 4, 5, 10, 20]], (I, w) => cl(0.5 * I * w * w));
      const m = pick([2, 4, 8]), v = pick([2, 4, 6]);
      return pick([
        S(`A flywheel has I = ${I} kg m² and spins at ${w} rad/s. What is its rotational kinetic energy in joules?`, "⚡", 0.5 * I * w * w,
          "Square the angular speed.", "KE = ½ × I × ω².", "Example: I = 4 and ω = 3 gives ½ × 4 × 9 = 18 J. Now do yours."),
        S(`A spinning wheel with I = ${I} kg m² has ${r2(0.5 * I * w * w)} J of rotational energy. What is its angular speed in rad/s?`, "🌀", w,
          "Undo the half and the square.", "ω² = 2 × KE ÷ I, then take the square root.", "Example: KE = 50 J and I = 4: ω² = 100 ÷ 4 = 25, so ω = 5 rad/s. Now do yours."),
        S(`A wheel spinning at ${w} rad/s has ${r2(0.5 * I * w * w)} J of rotational energy. What is its moment of inertia in kg m²?`, "⚙️", I,
          "Rearrange KE = ½Iω².", "I = 2 × KE ÷ ω².", "Example: 36 J at ω = 3 rad/s gives I = 72 ÷ 9 = 8 kg m². Now do yours."),
        S(`A solid disc of mass ${m} kg rolls without slipping at ${v} m/s. What is its total kinetic energy in joules? (Total = ¾mv²)`, "🛞", 0.75 * m * v * v,
          "Rolling counts both the motion forward and the spin.", "Total KE = 0.75 × m × v².", "Example: 4 kg at 2 m/s gives 0.75 × 4 × 4 = 12 J. Now do yours.")
      ]);
    }),
    num("Angular momentum", [
      ["Spin momentum", "⛸️", "<b>Angular momentum</b> is <b>L = Iω</b>, in kg m²/s. With no outside torque, L stays constant."],
      ["The skater", "🌀", "A skater pulls in her arms, so I falls. L is fixed, so ω must rise: <b>I₁ω₁ = I₂ω₂</b>."],
      ["Example", "🧮", "I = 6 and ω = 2 gives L = 12. If I drops to 3, then ω = 12 ÷ 3 = 4 rad/s."]
    ], () => {
      const [I2, k, w1] = combo([[1, 2, 3, 4, 5], [2, 3, 4], [1, 2, 3, 4, 5]], () => true);
      const I1 = I2 * k;
      return pick([
        S(`A wheel has I = ${I1} kg m² and spins at ${w1} rad/s. What is its angular momentum in kg m²/s?`, "🌀", I1 * w1,
          "Angular momentum multiplies the two spin quantities.", "L = I × ω.", "Example: I = 5 and ω = 3 gives 15 kg m²/s. Now do yours."),
        S(`A skater spins at ${w1} rad/s with I = ${I1} kg m². She pulls her arms in so that I becomes ${I2} kg m². What is her new angular speed in rad/s?`, "⛸️", k * w1,
          "No outside torque, so angular momentum is conserved.", "I₁ω₁ = I₂ω₂, so ω₂ = I₁ω₁ ÷ I₂.", "Example: I from 8 to 2 at 3 rad/s: ω₂ = 24 ÷ 2 = 12 rad/s. Now do yours."),
        S(`A skater spinning at ${w1} rad/s pulls in her arms and speeds up to ${k * w1} rad/s. Her moment of inertia was ${I1} kg m². What is it afterwards, in kg m²?`, "🤸", I2,
          "Angular momentum before equals angular momentum after.", "I₂ = I₁ω₁ ÷ ω₂.", "Example: I = 6 at 2 rad/s, then 6 rad/s: I₂ = 12 ÷ 6 = 2 kg m². Now do yours.")
      ]);
    }),
    num("Inverse-square gravity", [
      ["Weaker with distance", "🌍", "Gravity follows <b>F = Gm₁m₂ ÷ r²</b>. Double the distance and the force becomes one quarter. Triple it and the force is one ninth."],
      ["Measure from the centre", "📏", "Use the distance between centres. At 2R from Earth's centre (one radius above the ground) your weight is ¼ of its surface value."],
      ["Changing masses", "⚖️", "Doubling one mass doubles the force. So the new force is <b>F × (mass factor) ÷ (distance factor)²</b>."]
    ], () => {
      const k = pick([2, 3, 4, 5]), W = k * k * pick([2, 4, 5, 10, 20]);
      const [F, ma, d] = combo([[8, 12, 16, 18, 24, 36, 40, 72], [2, 3, 4], [2, 3]], (F, ma, d) => cl(F * ma / (d * d)));
      return pick([
        S(`An astronaut weighs ${W} N at Earth's surface. What does she weigh at ${k} times that distance from Earth's centre, in newtons?`, "🧑‍🚀", W / (k * k),
          "Gravity falls off with the square of the distance.", `Divide the weight by ${k} × ${k}.`, "Example: 90 N at 3 times the distance gives 90 ÷ 9 = 10 N. Now do yours."),
        S(`Two planets attract each other with ${W} N. If the distance between their centres becomes ${k} times bigger, what is the new force in newtons?`, "🪐", W / (k * k),
          "Greater distance means a weaker pull, by the square of the factor.", "New F = F ÷ (factor)².", "Example: 80 N with distance doubled gives 80 ÷ 4 = 20 N. Now do yours."),
        S(`Two moons attract each other with ${F} N. One moon's mass is multiplied by ${ma} and the distance is multiplied by ${d}. What is the new force in newtons?`, "🌙", F * ma / (d * d),
          "Mass multiplies the force; distance divides it by its square.", "New F = F × (mass factor) ÷ (distance factor)².", "Example: 36 N, mass ×2, distance ×3 gives 36 × 2 ÷ 9 = 8 N. Now do yours.")
      ]);
    }),
    num("Low orbit speed", [
      ["Falling around the Earth", "🛰️", "A satellite in a low circular orbit is falling freely: gravity is the centripetal force, so <b>g = v² ÷ r</b>, giving <b>v = √(gr)</b>."],
      ["Period", "⏱️", "One lap is 2πr, so the period is <b>T = 2πr ÷ v</b>. In these problems use π = 3."],
      ["Example", "🧮", "g = 10 m/s², r = 4 000 000 m: v = √(40 000 000) ≈ 6325 m/s. With g = 9 and r = 4 000 000: v = √36 000 000 = 6000 m/s."]
    ], () => {
      const rows = [[10, 6.4, 8000], [10, 2.5, 5000], [10, 1.6, 4000], [4, 9, 6000], [9, 4, 6000], [4, 1, 2000], [10, 0.9, 3000], [10, 3.6, 6000]];
      const [g, rm, v] = pick(rows);
      return pick([
        S(`Near a planet, g = ${g} m/s² and a satellite orbits at r = ${rm} million metres from the centre. What is its orbital speed in m/s? (v = √(gr))`, "🛰️", v,
          "Multiply g by r first, using r in metres.", `Take the square root of ${g} × ${rm * 1e6}.`, "Example: g = 10 and r = 2.5 million m gives √(25 000 000) = 5000 m/s. Now do yours."),
        S(`A satellite orbits at ${v} m/s where g = ${g} m/s². How far from the planet's centre is it, in millions of metres? (r = v² ÷ g)`, "🌍", rm,
          "Rearrange g = v² ÷ r.", "r = v² ÷ g. Answer in millions of metres.", "Example: v = 5000 m/s and g = 10 gives r = 25 000 000 ÷ 10 = 2.5 million m. Now do yours."),
        S(`A satellite orbits at r = ${rm} million metres at ${v} m/s. How long is one orbit in seconds? (T = 2πr ÷ v with π = 3)`, "⏱️", 6 * rm * 1e6 / v,
          "One lap is the circumference divided by the speed.", `T = 6 × ${rm * 1e6} ÷ ${v}.`, "Example: r = 2 million m at 4000 m/s gives 6 × 2 000 000 ÷ 4000 = 3000 s. Now do yours.")
      ]);
    }),
    les("Kepler's laws", [
      ["Ellipses", "🪐", "<b>First law:</b> planets move in ellipses with the Sun at one focus. <b>Second law:</b> a line from the Sun to a planet sweeps equal areas in equal times, so planets move fastest when closest."],
      ["Third law", "📏", "<b>T² ∝ r³.</b> Planets farther from the Sun take longer to orbit. If r is 4 times larger, T² is 64 times larger, so T is 8 times larger."],
      ["Why", "🔭", "The second law is conservation of angular momentum. Newton showed that all three laws come from inverse-square gravity."]
    ], ["Recall which law is about shapes, areas and periods.", "For the third law compare r cubed with T squared.", "Example: r nine times larger gives r³ 729 times larger, so T is 27 times larger. Now try yours."], [
      ["Kepler's first law says planets orbit in...", "Ellipses with the Sun at one focus", "Perfect circles with the Sun at the centre", "Straight lines"],
      ["At which point is a planet moving fastest?", "Closest to the Sun", "Farthest from the Sun", "It moves at the same speed everywhere"],
      ["A line from the Sun to a planet sweeps out equal areas in equal times. This is Kepler's...", "Second law", "First law", "Third law"],
      ["A planet's orbital radius is 4 times larger. By what factor is its period larger? (T² ∝ r³)", "8", "4", "16"],
      ["A planet's orbital radius is 9 times larger. By what factor is its period larger? (T² ∝ r³)", "27", "9", "81"],
      ["Which planet generally has the longest year?", "The one farthest from the Sun", "The one closest to the Sun", "The largest one"],
      ["The point of closest approach to the Sun is called...", "Perihelion", "Aphelion", "Equinox"],
      ["Kepler's second law is a result of conserving...", "Angular momentum", "Charge", "Temperature"],
      ["If a planet's orbital radius is 4 times larger, its orbital speed is generally...", "Slower", "Faster", "The same"]
    ]),
    num("The first law of thermodynamics", [
      ["Energy bookkeeping", "📒", "The first law: <b>ΔU = Q − W</b>. The gas's internal energy changes by the heat Q added to it minus the work W it does on its surroundings."],
      ["Special cases", "🔬", "Constant temperature: ΔU = 0, so Q = W. No heat flow (adiabatic): Q = 0, so ΔU = −W, and the gas cools while it expands."],
      ["Example", "🧮", "A gas absorbs 300 J of heat and does 120 J of work: ΔU = 300 − 120 = 180 J."]
    ], () => {
      const Q = pick([100, 150, 200, 300, 500]), W = pick([40, 50, 60, 80, 100]);
      return pick([
        S(`A gas absorbs ${Q} J of heat and does ${W} J of work on its surroundings. By how many joules does its internal energy increase?`, "🔥", Q - W,
          "Energy in minus energy out.", "ΔU = Q − W.", "Example: 250 J in and 90 J of work out gives 250 − 90 = 160 J. Now do yours."),
        S(`A gas does ${W} J of work and its internal energy rises by ${Q - W} J. How much heat flowed into it, in joules?`, "🌡️", Q,
          "Heat supplied covers both the work done and the energy stored.", "Q = ΔU + W.", "Example: ΔU = 70 J and W = 30 J gives Q = 100 J. Now do yours."),
        S(`A gas absorbs ${Q} J of heat and its internal energy rises by ${Q - W} J. How much work does the gas do, in joules?`, "⚙️", W,
          "The heat that does not stay as internal energy leaves as work.", "W = Q − ΔU.", "Example: 200 J in and a 150 J rise leaves 50 J of work. Now do yours."),
        S(`A gas expands quickly in an insulated cylinder (no heat flows) and does ${W} J of work. By how many joules does its internal energy fall?`, "🧊", W,
          "With no heat flowing, only the work changes the energy.", "Q = 0, so the loss in U equals the work done.", "Example: an insulated gas doing 35 J of work loses 35 J of internal energy. Now do yours.")
      ]);
    }),
    num("Work done by a gas", [
      ["Pushing a piston", "🚂", "A gas expanding at constant pressure does work <b>W = PΔV</b>. On a pressure-volume graph this is the <b>area under the line</b>."],
      ["Units", "📏", "Pressure in kPa times volume change in litres gives work in <b>joules</b> (1 kPa × 1 L = 1 J)."],
      ["Example", "🧮", "200 kPa while the volume grows from 2 L to 5 L: ΔV = 3 L, so W = 200 × 3 = 600 J."]
    ], () => {
      const P = pick([50, 100, 150, 200, 250, 300]), V1 = pick([1, 2, 3, 4, 5]), dV = pick([1, 2, 3, 4, 5, 6]);
      return pick([
        S(`A gas at a constant ${P} kPa expands from ${V1} L to ${V1 + dV} L. How much work does it do, in joules?`, "🚂", P * dV,
          "Find the change in volume first.", "W = P × ΔV with kPa and litres giving joules.", "Example: 100 kPa and ΔV = 4 L gives 400 J. Now do yours."),
        S(`A gas does ${P * dV} J of work expanding by ${dV} L at constant pressure. What is the pressure in kPa?`, "💨", P,
          "Rearrange W = PΔV.", "P = W ÷ ΔV.", "Example: 600 J for 3 L gives P = 200 kPa. Now do yours."),
        S(`A gas at ${P} kPa does ${P * dV} J of work at constant pressure. By how many litres does its volume increase?`, "🔬", dV,
          "Rearrange W = PΔV.", "ΔV = W ÷ P.", "Example: 600 J at 200 kPa gives 3 L. Now do yours."),
        S(`On a pressure-volume graph, a flat line at ${P} kPa runs from ${V1} L to ${V1 + dV} L. What is the area under it, in joules?`, "📈", P * dV,
          "The area under the line is a rectangle.", "Height × width = pressure × change in volume.", "Example: 300 kPa from 1 L to 3 L gives 300 × 2 = 600 J. Now do yours.")
      ]);
    }),
    num("Efficiency of heat engines", [
      ["What goes where", "🏭", "A heat engine takes heat Qh from a hot source, turns some into work W, and dumps the rest Qc into a cold sink: <b>Qh = W + Qc</b>."],
      ["Efficiency", "📊", "<b>e = W ÷ Qh</b>, often as a percentage. Efficiency is always below 100%."],
      ["Example", "🧮", "An engine takes 800 J and does 200 J of work: e = 200 ÷ 800 = 25%. Waste heat = 800 − 200 = 600 J."]
    ], () => {
      const Qh = pick([200, 400, 500, 800, 1000]), e = pick([20, 25, 30, 40, 50, 60]);
      const W = Qh * e / 100;
      return pick([
        S(`An engine takes ${Qh} J from a hot source and does ${W} J of work. What is its efficiency in percent?`, "🏭", e,
          "Compare the useful work with the heat taken in.", "Efficiency = W ÷ Qh × 100.", "Example: 100 J of work from 400 J of heat is 25%. Now do yours."),
        S(`An engine with ${e}% efficiency takes in ${Qh} J of heat. How much work does it do, in joules?`, "⚙️", W,
          "Efficiency is the fraction of the heat that becomes work.", "W = Qh × e ÷ 100.", "Example: 40% of 500 J is 200 J. Now do yours."),
        S(`An engine takes in ${Qh} J of heat and does ${W} J of work. How much heat is dumped into the cold sink, in joules?`, "♨️", Qh - W,
          "Energy in must equal energy out.", "Qc = Qh − W.", "Example: 300 J in and 100 J of work leaves 200 J of waste heat. Now do yours."),
        S(`An engine does ${W} J of work and has an efficiency of ${e}%. How much heat did it take in, in joules?`, "🔥", Qh,
          "The work is a fraction of the heat in.", "Qh = W × 100 ÷ e.", "Example: 50 J of work at 25% means Qh = 50 × 100 ÷ 25 = 200 J. Now do yours.")
      ]);
    }),
    num("The Carnot limit", [
      ["The best possible engine", "🏆", "No engine between a hot reservoir at Th and a cold one at Tc can beat the Carnot efficiency: <b>e = 1 − Tc ÷ Th</b>, with temperatures in <b>kelvin</b>."],
      ["Kelvin", "🌡️", "K = °C + 273. For round numbers, use 27 °C = 300 K and 127 °C = 400 K."],
      ["Example", "🧮", "Th = 500 K and Tc = 300 K: e = 1 − 300 ÷ 500 = 1 − 0.6 = 0.4, which is 40%."]
    ], () => {
      const [Th, Tc] = combo([[400, 500, 600, 800, 1000], [200, 250, 300, 400, 500]], (Th, Tc) => Tc < Th && Number.isInteger(r2((1 - Tc / Th) * 100)));
      const e = r2((1 - Tc / Th) * 100);
      const cs = pick([[127, 400, 27, 300], [227, 500, 27, 300], [327, 600, 27, 300], [527, 800, 27, 300]]);
      return pick([
        S(`The hot reservoir is at ${Th} K and the cold one at ${Tc} K. What is the maximum (Carnot) efficiency in percent?`, "🏆", e,
          "Divide the cold temperature by the hot one.", "e = (1 − Tc ÷ Th) × 100.", "Example: Th = 600 K and Tc = 300 K gives (1 − 0.5) × 100 = 50%. Now do yours."),
        S(`A Carnot engine runs between ${cs[0]} °C and ${cs[2]} °C. What is its maximum efficiency in percent? (K = °C + 273)`, "🌡️", r2((1 - cs[3] / cs[1]) * 100),
          "Change both temperatures to kelvin first.", `${cs[0]} °C is ${cs[1]} K and ${cs[2]} °C is ${cs[3]} K.`, "Example: 327 °C is 600 K and 27 °C is 300 K, so e = 50%. Now do yours."),
        S(`A Carnot engine with a hot reservoir at ${Th} K has a maximum efficiency of ${e}%. What is the cold reservoir's temperature in kelvin?`, "❄️", Tc,
          "Tc ÷ Th = 1 − e.", "Tc = Th × (1 − e ÷ 100).", "Example: Th = 800 K at 50% gives Tc = 800 × 0.5 = 400 K. Now do yours."),
        S(`A Carnot engine with a cold reservoir at ${Tc} K has a maximum efficiency of ${e}%. What is the hot reservoir's temperature in kelvin?`, "🔥", Th,
          "Tc ÷ Th = 1 − e.", "Th = Tc ÷ (1 − e ÷ 100).", "Example: Tc = 300 K at 25% gives Th = 300 ÷ 0.75 = 400 K. Now do yours.")
      ]);
    }),
    num("Rate of heat conduction", [
      ["Heat through a wall", "🧱", "The heat flow rate through a slab is <b>P = kAΔT ÷ L</b>, where k is the thermal conductivity (W/m K), A the area, ΔT the temperature difference and L the thickness."],
      ["What changes it", "🔧", "Double the area and P doubles. Double the thickness and P halves. Good insulators have a small k."],
      ["Example", "🧮", "k = 0.5, A = 2 m², ΔT = 20 K, L = 0.1 m: P = 0.5 × 2 × 20 ÷ 0.1 = 200 W."]
    ], () => {
      const [k, A, dT, L] = combo([[0.04, 0.5, 0.8, 1, 2], [1, 2, 4], [10, 20, 25, 30, 40], [0.01, 0.02, 0.05, 0.1, 0.2, 0.5]], (k, A, dT, L) => Number.isInteger(r2(k * A * dT / L)));
      const P = r2(k * A * dT / L), f = pick([2, 3, 4]), P0 = f * pick([10, 20, 30, 50]);
      return pick([
        S(`A wall has k = ${k} W/m K, area ${A} m² and thickness ${L} m. The temperature difference across it is ${dT} K. How much heat flows through per second, in watts?`, "🧱", P,
          "Heat flow grows with area and temperature difference, and shrinks with thickness.", "P = k × A × ΔT ÷ L.", "Example: k = 1, A = 3, ΔT = 10, L = 0.5 gives 1 × 3 × 10 ÷ 0.5 = 60 W. Now do yours."),
        S(`A window loses ${P0} W of heat. A second window of the same material and area is ${f} times thicker. How much heat does it lose, in watts, for the same temperature difference?`, "🪟", P0 / f,
          "Thicker means a slower leak, in proportion to the thickness.", `Divide by ${f}.`, "Example: 60 W through glass 3 times thicker gives 20 W. Now do yours."),
        S(`A wall of area ${A} m² and k = ${k} W/m K carries ${P} W when the temperature difference is ${dT} K. How thick is it, in metres?`, "📏", L,
          "Rearrange P = kAΔT ÷ L.", "L = k × A × ΔT ÷ P.", "Example: k = 2, A = 1, ΔT = 10 and P = 100 W gives L = 20 ÷ 100 = 0.2 m. Now do yours.")
      ]);
    }),
    num("Fluid flow rate", [
      ["Continuity", "🚰", "An incompressible fluid cannot pile up. The <b>flow rate Q = Av</b> (m³/s) is the same everywhere in a pipe: <b>A₁v₁ = A₂v₂</b>."],
      ["Narrowing", "🔽", "Where the pipe narrows, the fluid speeds up. Area depends on diameter squared: halving the diameter gives ¼ of the area and 4 times the speed."],
      ["Example", "🧮", "A = 0.02 m² at 3 m/s gives Q = 0.06 m³/s. If the area shrinks to 0.01 m², then v = 0.06 ÷ 0.01 = 6 m/s."]
    ], () => {
      const [A1, A2, v1] = combo([[0.02, 0.04, 0.05, 0.1], [0.01, 0.02, 0.05], [1, 2, 3, 4, 5]], (A1, A2, v1) => A1 > A2 && Number.isInteger(r2(A1 * v1 / A2)));
      const [d1, d2] = pick([[4, 2], [6, 3], [9, 3], [10, 5], [8, 4]]), v = pick([1, 2, 3, 5]);
      return pick([
        S(`Water flows at ${v1} m/s through a pipe of cross-section ${A1} m². What is the flow rate in m³/s?`, "🚰", A1 * v1,
          "Flow rate is area times speed.", "Q = A × v.", "Example: 0.05 m² at 2 m/s gives 0.1 m³/s. Now do yours."),
        S(`Water flows at ${v1} m/s through a pipe of area ${A1} m², then enters a narrower part of area ${A2} m². How fast does it flow there, in m/s?`, "🔽", A1 * v1 / A2,
          "The same volume must pass each second.", "v₂ = A₁v₁ ÷ A₂.", "Example: 0.04 m² at 2 m/s into 0.02 m² gives 0.08 ÷ 0.02 = 4 m/s. Now do yours."),
        S(`Water flows at ${v} m/s in a pipe of diameter ${d1} cm and then enters a section of diameter ${d2} cm. How fast does it flow there, in m/s? (Area is proportional to diameter squared.)`, "🌊", v * (d1 * d1) / (d2 * d2),
          "Compare the areas using the squares of the diameters.", `The speed multiplies by (${d1} ÷ ${d2})².`, "Example: 6 cm narrowing to 3 cm at 1 m/s gives 1 × 4 = 4 m/s. Now do yours.")
      ]);
    }),
    les("Entropy and the second law", [
      ["Arrow of time", "⏳", "<b>Entropy</b> measures how spread out or disordered energy is. The <b>second law</b>: in an isolated system entropy never decreases. That is why heat flows from hot to cold, and never the other way by itself."],
      ["No perfect engine", "🏭", "No engine can turn heat completely into work and nothing else. Some heat must always flow to a colder place. This is why every engine has an efficiency below 100%."],
      ["Fridges", "🧊", "A fridge moves heat from cold to hot, but only with <b>work</b> put in. Entropy of the whole room still rises."]
    ], ["Think about which direction happens by itself.", "Spontaneous change spreads energy out and raises entropy.", "Example: a hot drink cools down by itself, but a cold drink never heats up by itself. Now try yours."], [
      ["Heat flows by itself from...", "A hot object to a cold one", "A cold object to a hot one", "Either way equally"],
      ["The second law says the entropy of an isolated system...", "Never decreases", "Always decreases", "Is always zero"],
      ["Which process is irreversible in everyday life?", "An egg breaking on the floor", "A pendulum swinging in a vacuum", "A mass bouncing on a perfect spring"],
      ["Why can't a heat engine be 100% efficient?", "Some heat must flow to a colder place", "Engines are too small", "Friction is the only problem"],
      ["Entropy is best described as a measure of...", "How many ways energy can be arranged", "How hot something is", "How heavy something is"],
      ["A fridge moves heat from inside to outside. What must be supplied?", "Work", "Nothing", "Extra cold"],
      ["Gas rushes into an empty container. Its entropy...", "Increases", "Decreases", "Stays exactly the same"],
      ["A machine that turns heat from the air entirely into work, forever, with nothing else changing, is...", "Impossible by the second law", "Possible with a good design", "A normal engine"]
    ])
  ];
  a.push(
    mix("Mixed practice", at(a, [0, 1, 2, 3, 4, 5, 7, 8, 9, 11, 12])),
    mix("Level 22 Challenge", at(a, [1, 4, 6, 8, 9, 10, 12, 13, 14, 16, 17]))
  );

  // ================= LEVEL 23 =================
  const b = [
    num("Field of a point charge", [
      ["Radial field", "⚡", "A point charge q makes an electric field <b>E = kq ÷ r²</b>, with k = 9 × 10⁹ N m²/C². It points away from positive charges and towards negative ones."],
      ["Easy numbers", "🧮", "If q is in <b>nanocoulombs</b> (nC), the powers of ten cancel: <b>E = 9q ÷ r²</b> in N/C, with r in metres."],
      ["Example", "🧮", "q = 4 nC at r = 2 m: E = 9 × 4 ÷ 4 = 9 N/C. The field is 4 times weaker at twice the distance."]
    ], () => {
      const [q, r] = combo([[1, 2, 3, 4, 5, 8, 10], [0.5, 1, 2, 3, 4, 6]], (q, r) => cl(9 * q / (r * r)));
      const E = r2(9 * q / (r * r));
      const [q2, E2] = pick([[2, 4], [3, 3], [4, 9], [5, 5]]);
      return pick([
        S(`What is the electric field ${r} m from a point charge of ${q} nC, in N/C? (E = 9q ÷ r² with q in nC)`, "⚡", E,
          "Square the distance first.", "E = 9 × q ÷ r².", "Example: 2 nC at 3 m gives 9 × 2 ÷ 9 = 2 N/C. Now do yours."),
        S(`A point charge makes a field of ${E} N/C at ${r} m. What is the charge in nC? (E = 9q ÷ r²)`, "🔋", q,
          "Rearrange E = 9q ÷ r².", "q = E × r² ÷ 9.", "Example: E = 5 N/C at 3 m gives q = 5 × 9 ÷ 9 = 5 nC. Now do yours."),
        S(`A charge of ${q2} µC sits in a field of ${E2 * 1000} N/C. What force acts on it, in micronewtons? (F = qE)`, "💥", q2 * E2 * 1000,
          "Force is charge times field.", "With q in µC and E in N/C, F comes out in µN.", "Example: 3 µC in 200 N/C gives 600 µN. Now do yours."),
        S(`The field ${r} m from a charge is ${E} N/C. What is the field at ${r * 2} m, in N/C?`, "📏", E / 4,
          "Doubling the distance changes the field by a square law.", "Divide by 2², which is 4.", "Example: 12 N/C at 1 m becomes 3 N/C at 2 m. Now do yours.")
      ]);
    }),
    num("Electric potential of a point charge", [
      ["Potential", "🔋", "<b>Electric potential</b> V is energy per unit charge. A point charge gives <b>V = kq ÷ r</b>, so with q in nC: <b>V = 9q ÷ r</b> volts."],
      ["Adds as a number", "➕", "Potential is a scalar, so the potentials of several charges simply add (keep their signs)."],
      ["Energy", "⚖️", "Moving a charge q through a potential difference ΔV changes its energy by <b>ΔE = qΔV</b>."]
    ], () => {
      const [q, r] = combo([[1, 2, 3, 4, 5, 6, 10], [0.5, 1, 2, 3, 4, 6]], (q, r) => cl(9 * q / r));
      const V = r2(9 * q / r);
      const [q1, r1, q2, r2_] = pick([[2, 3, 4, 2], [1, 1, 3, 3], [5, 5, 2, 1], [6, 3, 3, 3]]);
      const qq = pick([2, 3, 4, 5]), dv = pick([20, 50, 100, 200]);
      return pick([
        S(`What is the electric potential ${r} m from a point charge of ${q} nC, in volts? (V = 9q ÷ r)`, "🔋", V,
          "Unlike the field, potential has r to the first power.", "V = 9 × q ÷ r.", "Example: 4 nC at 2 m gives 9 × 4 ÷ 2 = 18 V. Now do yours."),
        S(`A point charge of ${q} nC produces ${V} V at a point. How far away is the point, in metres? (V = 9q ÷ r)`, "📏", r,
          "Rearrange V = 9q ÷ r.", "r = 9q ÷ V.", "Example: 6 nC and 18 V gives r = 54 ÷ 18 = 3 m. Now do yours."),
        S(`A point is ${r1} m from a ${q1} nC charge and ${r2_} m from another ${q2} nC charge (both positive). What is the total potential there, in volts?`, "➕", r2(9 * q1 / r1 + 9 * q2 / r2_),
          "Find the potential from each charge separately, then add.", "V = 9q₁ ÷ r₁ + 9q₂ ÷ r₂.", "Example: 2 nC at 1 m and 3 nC at 3 m: 18 + 9 = 27 V. Now do yours."),
        S(`A ${qq} µC charge moves through a potential difference of ${dv} V. How much energy does it gain, in microjoules?`, "⚖️", qq * dv,
          "Energy is charge times potential difference.", "ΔE = q × ΔV, with q in µC giving µJ.", "Example: 2 µC through 30 V gives 60 µJ. Now do yours.")
      ]);
    }),
    num("Electron-volts", [
      ["A tiny unit of energy", "🔬", "One <b>electron-volt</b> (eV) is the energy gained by one electron charge e moving through 1 volt. <b>1 eV = 1.6 × 10⁻¹⁹ J</b>."],
      ["Charge number", "🧮", "A particle with charge n·e accelerated through V volts gains <b>n × V electron-volts</b>."],
      ["Example", "🧮", "A particle with charge 3e through 10 V gains 30 eV. In joules that is 30 × 1.6 × 10⁻¹⁹ = 48 × 10⁻¹⁹ J."]
    ], () => {
      const n = pick([1, 2, 3]), V = pick([5, 10, 20, 50, 100, 200]), N = pick([5, 10, 15, 20, 25, 50]);
      return pick([
        S(`An ion with charge ${n}e is accelerated through ${V} V. How much energy does it gain, in eV?`, "⚡", n * V,
          "Energy in eV is charge number times volts.", "eV = n × V.", "Example: charge 2e through 30 V gives 60 eV. Now do yours."),
        S(`A particle gains ${n * V} eV after being accelerated through ${V} V. What is its charge, in units of e?`, "🔋", n,
          "Rearrange eV = n × V.", "n = energy in eV ÷ voltage.", "Example: 90 eV through 30 V gives n = 3. Now do yours."),
        S(`A particle has ${N} eV of energy. How many ×10⁻¹⁹ joules is that? (1 eV = 1.6 × 10⁻¹⁹ J)`, "🔬", r2(1.6 * N),
          "Multiply by the joules in one electron-volt.", "Answer = 1.6 × the number of eV.", "Example: 10 eV is 1.6 × 10 = 16 × 10⁻¹⁹ J. Now do yours."),
        S(`A particle has ${r2(1.6 * N)} × 10⁻¹⁹ J of energy. How many electron-volts is that?`, "🔄", N,
          "Divide by the size of one electron-volt in these units.", "eV = (number) ÷ 1.6.", "Example: 8 × 10⁻¹⁹ J is 8 ÷ 1.6 = 5 eV. Now do yours.")
      ]);
    }),
    num("Capacitance", [
      ["Storing charge", "🔋", "A <b>capacitor</b> stores charge on two plates. <b>Q = CV</b>: charge (coulombs) = capacitance (farads) × voltage."],
      ["Units", "📏", "Using C in microfarads (µF) and V in volts gives Q in <b>microcoulombs</b> (µC)."],
      ["Plate geometry", "🧱", "C is proportional to the plate area A and inversely proportional to the gap d. Double A to double C. Double d to halve C."]
    ], () => {
      const C = pick([2, 4, 5, 10, 20, 50]), V = pick([3, 5, 6, 9, 12, 20]), k = pick([2, 3, 4]);
      return pick([
        S(`A ${C} µF capacitor is charged to ${V} V. How much charge does it store, in µC?`, "🔋", C * V,
          "Charge is capacitance times voltage.", "Q = C × V.", "Example: 3 µF at 10 V stores 30 µC. Now do yours."),
        S(`A capacitor stores ${C * V} µC at ${V} V. What is its capacitance in µF?`, "🔌", C,
          "Rearrange Q = CV.", "C = Q ÷ V.", "Example: 60 µC at 12 V gives 5 µF. Now do yours."),
        S(`A ${C} µF capacitor holds ${C * V} µC. What is the voltage across it, in volts?`, "⚡", V,
          "Rearrange Q = CV.", "V = Q ÷ C.", "Example: 80 µC on 4 µF gives 20 V. Now do yours."),
        S(`A parallel-plate capacitor has ${C * k} µF. The gap between its plates is made ${k} times bigger. What is the new capacitance in µF?`, "🧱", C,
          "A larger gap lowers the capacitance.", "C is inversely proportional to the gap.", "Example: 12 µF with a gap 3 times bigger gives 4 µF. Now do yours.")
      ]);
    }),
    num("Energy stored in a capacitor", [
      ["Energy formula", "⚡", "The energy stored is <b>U = ½CV²</b>. Equivalent forms: ½QV and Q² ÷ 2C."],
      ["Units", "📏", "With C in µF and V in volts, U comes out in <b>microjoules</b> (µJ)."],
      ["Example", "🧮", "10 µF at 20 V: U = ½ × 10 × 400 = 2000 µJ. Doubling V gives four times the energy."]
    ], () => {
      const [C, V] = combo([[2, 4, 10, 20, 50, 100], [2, 5, 10, 20, 50]], (C, V) => cl(0.5 * C * V * V));
      const U = r2(0.5 * C * V * V);
      const Q = C * V;
      return pick([
        S(`A ${C} µF capacitor is charged to ${V} V. How much energy does it store, in µJ?`, "⚡", U,
          "Square the voltage, not the capacitance.", "U = ½ × C × V².", "Example: 4 µF at 10 V gives ½ × 4 × 100 = 200 µJ. Now do yours."),
        S(`A capacitor holds ${Q} µC at ${V} V. How much energy does it store, in µJ? (U = ½QV)`, "🔋", 0.5 * Q * V,
          "Another form of the energy equation uses charge and voltage.", "U = ½ × Q × V.", "Example: 40 µC at 5 V gives ½ × 40 × 5 = 100 µJ. Now do yours."),
        S(`A ${C} µF capacitor stores ${U} µJ. What is its voltage in volts?`, "🔌", V,
          "Undo the half and the square.", "V² = 2U ÷ C, then take the square root.", "Example: 4 µF storing 200 µJ gives V² = 100, so V = 10 V. Now do yours."),
        S(`A capacitor stores ${U} µJ. Its voltage is doubled. How much energy does it store now, in µJ?`, "✖️", U * 4,
          "Energy depends on the square of the voltage.", "Multiply by 2², which is 4.", "Example: 50 µJ with the voltage tripled becomes 450 µJ. Now do yours.")
      ]);
    }),
    num("Capacitors together", [
      ["Parallel", "🔀", "Capacitors in <b>parallel</b> simply add: <b>C = C₁ + C₂</b>. More plate area in total."],
      ["Series", "➡️", "In <b>series</b> the total is smaller: <b>C = C₁C₂ ÷ (C₁ + C₂)</b>. Remember: this is the opposite of resistors."],
      ["Example", "🧮", "6 µF and 3 µF: in parallel 9 µF, in series 18 ÷ 9 = 2 µF."]
    ], () => {
      const p = pick([[6, 3], [12, 4], [20, 5], [30, 20], [10, 10], [12, 6], [15, 10], [30, 15], [60, 20], [24, 8], [18, 9], [60, 40], [40, 10]]);
      const [x, y] = p, s = x * y / (x + y), n = pick([2, 3, 4, 5]), c = pick([6, 12, 30, 60]);
      return pick([
        S(`Two capacitors of ${x} µF and ${y} µF are connected in parallel. What is the total capacitance in µF?`, "🔀", x + y,
          "In parallel the plate areas combine.", "Add the capacitances.", "Example: 5 µF and 8 µF in parallel gives 13 µF. Now do yours."),
        S(`Two capacitors of ${x} µF and ${y} µF are connected in series. What is the total capacitance in µF?`, "➡️", s,
          "Series combination is smaller than either capacitor.", "Product divided by sum.", "Example: 8 µF and 8 µF in series gives 64 ÷ 16 = 4 µF. Now do yours."),
        S(`${n} identical capacitors of ${c * n} µF each are connected in series. What is the total capacitance in µF?`, "🧱", c,
          "For identical capacitors in series, the total is a simple fraction of one of them.", `Divide one capacitor's value by ${n}.`, "Example: 3 capacitors of 9 µF in series give 9 ÷ 3 = 3 µF. Now do yours.")
      ]);
    }),
    num("The RC time constant", [
      ["How fast it charges", "⏱️", "A capacitor charges or discharges through a resistor with a <b>time constant τ = RC</b>. After one τ, a charging capacitor is at about 63% of its final voltage."],
      ["Units", "📏", "R in kΩ times C in µF gives τ in <b>milliseconds</b> (ms)."],
      ["After many time constants", "🧮", "After about <b>5τ</b> the capacitor is within 1% of its final value, so we say it is fully charged. Example: R = 10 kΩ and C = 2 µF gives τ = 20 ms and 5τ = 100 ms."]
    ], () => {
      const R = pick([1, 2, 5, 10, 20, 50]), C = pick([1, 2, 4, 5, 10, 20]);
      return pick([
        S(`A ${R} kΩ resistor charges a ${C} µF capacitor. What is the time constant in ms?`, "⏱️", R * C,
          "The time constant multiplies resistance and capacitance.", "τ = R × C (kΩ × µF = ms).", "Example: 3 kΩ and 4 µF gives 12 ms. Now do yours."),
        S(`A circuit has a time constant of ${R * C} ms and R = ${R} kΩ. What is C in µF?`, "🔌", C,
          "Rearrange τ = RC.", "C = τ ÷ R.", "Example: τ = 24 ms and R = 6 kΩ gives C = 4 µF. Now do yours."),
        S(`A circuit has a time constant of ${R * C} ms and C = ${C} µF. What is R in kΩ?`, "🔧", R,
          "Rearrange τ = RC.", "R = τ ÷ C.", "Example: τ = 30 ms and C = 5 µF gives R = 6 kΩ. Now do yours."),
        S(`A ${R} kΩ resistor and ${C} µF capacitor are used. About how long, in ms, until the capacitor is fully charged (take 5τ)?`, "🔋", 5 * R * C,
          "Fully charged is about five time constants.", "Time = 5 × R × C.", "Example: R = 2 kΩ and C = 3 µF has τ = 6 ms, so 5τ = 30 ms. Now do yours.")
      ]);
    }),
    les("Charging and discharging", [
      ["Charging curve", "📈", "While a capacitor charges, the current is <b>largest at the start</b> and fades away. The voltage rises quickly at first, then levels off. After one time constant it is at about 63% of its final value."],
      ["Discharging", "📉", "Discharging, the voltage and current both fall exponentially. After one time constant the voltage is about 37% of its starting value."],
      ["Bigger R or C", "🐌", "A larger R or a larger C makes the time constant longer, so charging and discharging are <b>slower</b>."]
    ], ["Think about the start versus the end of charging.", "Larger RC means slower changes.", "Example: a capacitor with twice the resistance takes twice as long. Now try yours."], [
      ["When a capacitor starts to charge through a resistor, the current is...", "Largest", "Zero", "Constant all the time"],
      ["When a capacitor is fully charged in a DC circuit, the current is...", "Zero", "Largest", "Equal to V ÷ R"],
      ["After one time constant a charging capacitor reaches about...", "63% of its final voltage", "37% of its final voltage", "100% of its final voltage"],
      ["After one time constant a discharging capacitor has about what fraction of its voltage left?", "37%", "63%", "0%"],
      ["Doubling the resistance in an RC circuit makes charging...", "Slower", "Faster", "Unchanged"],
      ["Where is the energy stored in a charged capacitor?", "In the electric field between the plates", "Inside the wire", "In the resistor"],
      ["A graph of voltage across a discharging capacitor against time is a...", "Decaying curve", "Straight line upward", "Flat line"],
      ["A capacitor in a camera flash is used because it can...", "Release stored energy very quickly", "Make new energy", "Block all current forever"]
    ]),
    num("Magnetic force on a moving charge", [
      ["Sideways force", "🧲", "A charge q moving at speed v across a magnetic field B feels a force <b>F = qvB</b> (when v is perpendicular to B). The force is at right angles to both."],
      ["At an angle", "📐", "In general F = qvB sinθ. At 30° that is half as much, and along the field (0°) there is no force."],
      ["Units", "📏", "With q in µC, v in m/s and B in tesla, F comes out in <b>micronewtons</b>. Example: 2 µC at 500 m/s in 0.2 T gives 2 × 500 × 0.2 = 200 µN."]
    ], () => {
      const [q, v, B] = combo([[1, 2, 5, 10], [100, 200, 500, 1000], [0.1, 0.2, 0.5, 2]], (q, v, B) => cl(q * v * B) && Number.isInteger(r2(q * v * B / 2)));
      const F = r2(q * v * B);
      return pick([
        S(`A ${q} µC charge moves at ${v} m/s perpendicular to a ${B} T field. What is the force on it, in µN?`, "🧲", F,
          "Multiply the three quantities.", "F = q × v × B.", "Example: 3 µC at 100 m/s in 0.5 T gives 150 µN. Now do yours."),
        S(`A ${q} µC charge moves at ${v} m/s at 30° to a ${B} T field. What is the force on it, in µN? (sin 30° = 0.5)`, "📐", F / 2,
          "Only the component across the field matters.", "F = q × v × B × 0.5.", "Example: 4 µC at 100 m/s in 0.5 T at 30° gives 200 × 0.5 = 100 µN. Now do yours."),
        S(`A charge of ${q} µC moving at ${v} m/s across a field feels ${F} µN. What is B in tesla?`, "🧭", B,
          "Rearrange F = qvB.", "B = F ÷ (q × v).", "Example: 100 µN on 2 µC at 100 m/s gives B = 100 ÷ 200 = 0.5 T. Now do yours."),
        S(`A ${q} µC charge feels ${F} µN in a ${B} T field when moving across it. How fast is it moving, in m/s?`, "💨", v,
          "Rearrange F = qvB.", "v = F ÷ (q × B).", "Example: 60 µN on 3 µC in 0.2 T gives v = 60 ÷ 0.6 = 100 m/s. Now do yours.")
      ]);
    }),
    num("Circles in a magnetic field", [
      ["Circular paths", "🌀", "A charged particle entering a magnetic field at right angles moves in a circle, because the magnetic force acts as the centripetal force: <b>r = mv ÷ (qB)</b>."],
      ["Scaling", "📏", "Radius is proportional to speed (and mass), and inversely proportional to B (and charge). Doubling B halves the radius."],
      ["Surprise", "⏱️", "The <b>time for one lap</b> is T = 2πm ÷ (qB). It does not depend on speed: a faster particle takes a bigger circle but takes just as long."]
    ], () => {
      const r0 = pick([2, 4, 6, 8, 12, 20]), a_ = pick([2, 3]), bb = pick([2, 4]), T0 = pick([2, 4, 5, 8, 10]), k = pick([2, 3, 4]);
      return pick([
        S(`A proton moves in a circle of radius ${r0 * bb} cm. Its speed is multiplied by ${a_} and the magnetic field is multiplied by ${bb}. What is its new radius, in cm?`, "🌀", r0 * bb * a_ / bb,
          "Radius grows with speed and shrinks with field strength.", "New r = r × (speed factor) ÷ (field factor).", "Example: 10 cm, speed ×3, B ×2 gives 10 × 3 ÷ 2 = 15 cm. Now do yours."),
        S(`A particle circles in a field with radius ${r0} cm. The magnetic field is multiplied by ${bb}. What is the new radius in cm?`, "🧲", r0 / bb,
          "A stronger field bends the path more tightly.", "New r = r ÷ (field factor).", "Example: 12 cm with B ×3 gives 4 cm. Now do yours."),
        S(`A charged particle completes one circle in ${T0} ms. Its speed is multiplied by ${k} (same field). How long does one circle take now, in ms?`, "⏱️", T0,
          "The period of the motion does not depend on the speed.", "A faster particle travels a bigger circle in the same time.", "Example: a particle with a 7 ms period and double speed still takes 7 ms. Now do yours."),
        S(`A particle of mass m and charge q circles with radius ${r0 * k} cm. A second particle has the same speed and field, twice the mass and the same charge. Its radius in cm is...`, "⚖️", r0 * k * 2,
          "Radius is proportional to mass.", "Double the radius.", "Example: 5 cm for the first particle becomes 10 cm for one with twice the mass. Now do yours.")
      ]);
    }),
    num("Magnetic field of a long wire", [
      ["Circles of field", "🔌", "A long straight wire carrying current I makes a magnetic field that circles it: <b>B = μ₀I ÷ (2πr)</b>."],
      ["Easy numbers", "🧮", "Putting in μ₀ = 4π × 10⁻⁷ gives <b>B = 0.2 I ÷ r</b> microtesla (µT) when I is in amps and r in metres."],
      ["Example", "🧮", "I = 10 A at r = 0.4 m: B = 0.2 × 10 ÷ 0.4 = 5 µT. Doubling the distance halves the field."]
    ], () => {
      const [I, r] = combo([[5, 10, 20, 50, 100], [0.1, 0.2, 0.5, 1, 2, 4]], (I, r) => cl(0.2 * I / r));
      const B = r2(0.2 * I / r);
      return pick([
        S(`A long wire carries ${I} A. What is the magnetic field ${r} m from it, in µT? (B = 0.2I ÷ r)`, "🔌", B,
          "Field is proportional to the current and falls with distance.", "B = 0.2 × I ÷ r.", "Example: 20 A at 0.5 m gives 0.2 × 20 ÷ 0.5 = 8 µT. Now do yours."),
        S(`A wire's field is ${B} µT at ${r} m. What current does it carry, in amps? (B = 0.2I ÷ r)`, "⚡", I,
          "Rearrange B = 0.2I ÷ r.", "I = B × r ÷ 0.2.", "Example: 8 µT at 0.5 m gives I = 8 × 0.5 ÷ 0.2 = 20 A. Now do yours."),
        S(`A wire carrying ${I} A makes ${B} µT at some point. How far away, in metres, is that point? (B = 0.2I ÷ r)`, "📏", r,
          "Rearrange B = 0.2I ÷ r.", "r = 0.2 × I ÷ B.", "Example: 20 A and 8 µT gives r = 4 ÷ 8 = 0.5 m. Now do yours."),
        S(`The field from a wire is ${B} µT at ${r} m. What is it at ${r * 2} m, in µT?`, "🔭", B / 2,
          "Field from a wire falls in proportion to the distance.", "Divide by 2.", "Example: 12 µT at 1 m becomes 6 µT at 2 m. Now do yours.")
      ]);
    }),
    les("Right-hand rules", [
      ["Field around a wire", "🖐️", "Point your right thumb along the current. Your curled fingers show the direction the magnetic field circles the wire."],
      ["Force on a charge", "👉", "For a positive charge: point fingers along the velocity, curl them towards B, and the thumb shows the <b>force</b>. A negative charge feels the opposite force."],
      ["Useful facts", "🧲", "A magnetic force is always at 90° to the motion, so it <b>does no work</b>. It changes direction, not speed. Parallel currents attract; opposite currents repel."]
    ], ["Use your right hand to picture the directions.", "Remember the force is perpendicular to both velocity and field.", "Example: charge moving along a field line feels no force. Now try yours."], [
      ["A current flows straight up. Seen from above, the magnetic field circles...", "Anticlockwise", "Clockwise", "Straight up"],
      ["A positive charge moves east in a field pointing north. The force on it points...", "Up", "Down", "West"],
      ["An electron moves east in a field pointing north. The force on it points...", "Down", "Up", "North"],
      ["A positive charge moves north in a field pointing north. The force is...", "Zero", "Up", "East"],
      ["Does a magnetic force do work on a moving charge?", "No, it is always at right angles to the motion", "Yes, it speeds it up", "Yes, it slows it down"],
      ["Two parallel wires carry current in the same direction. They...", "Attract", "Repel", "Have no force on each other"],
      ["Two parallel wires carry current in opposite directions. They...", "Repel", "Attract", "Have no force on each other"],
      ["Outside a bar magnet, field lines run from the...", "North pole to the south pole", "South pole to the north pole", "Middle to the end only"],
      ["A coil of wire carrying a current behaves like...", "A bar magnet", "A battery", "A resistor only"]
    ]),
    num("Magnetic flux", [
      ["Flux", "🧲", "<b>Magnetic flux</b> measures how much field passes through a loop: <b>Φ = BA cosθ</b>, where θ is the angle between B and the loop's normal (the line at right angles to its face)."],
      ["Angles", "📐", "Facing the field (θ = 0°) gives the maximum, Φ = BA. At 60° it is half as much. A loop edge-on to the field (θ = 90°) has zero flux."],
      ["Units", "📏", "B in mT and A in m² gives Φ in milliwebers (mWb). Example: 20 mT through 0.5 m² gives 10 mWb."]
    ], () => {
      const B = pick([10, 20, 30, 40, 50]), A = pick([0.1, 0.2, 0.5, 1, 2, 4]);
      return pick([
        S(`A loop of area ${A} m² faces straight into a ${B} mT field (θ = 0°). What is the flux in mWb?`, "🧲", B * A,
          "Facing the field gives the largest flux.", "Φ = B × A.", "Example: 40 mT through 0.5 m² gives 20 mWb. Now do yours."),
        S(`A ${A} m² loop sits in a ${B} mT field with its normal at 60° to the field. What is the flux in mWb? (cos 60° = 0.5)`, "📐", B * A * 0.5,
          "Tilting the loop reduces the flux.", "Φ = B × A × 0.5.", "Example: 40 mT, 1 m² at 60° gives 40 × 1 × 0.5 = 20 mWb. Now do yours."),
        S(`A loop facing a field has a flux of ${B * A} mWb and area ${A} m². What is the field in mT?`, "🧭", B,
          "Rearrange Φ = BA.", "B = Φ ÷ A.", "Example: 30 mWb through 2 m² gives 15 mT. Now do yours."),
        S(`A loop facing a ${B} mT field has a flux of ${B * A} mWb. What is the loop's area in m²?`, "📏", A,
          "Rearrange Φ = BA.", "A = Φ ÷ B.", "Example: 60 mWb in a 20 mT field gives 3 m². Now do yours.")
      ]);
    }),
    num("Faraday's law", [
      ["Changing flux", "🔄", "A changing magnetic flux induces an emf in a coil: <b>ε = N ΔΦ ÷ Δt</b>, where N is the number of turns."],
      ["Units", "📏", "With flux change in mWb and time in ms, the emf is in <b>volts</b> (mWb ÷ ms = Wb/s)."],
      ["Example", "🧮", "A 50-turn coil sees the flux change by 10 mWb in 5 ms: ε = 50 × 10 ÷ 5 = 100 V."]
    ], () => {
      const [N, dPhi, dt] = combo([[10, 20, 50, 100, 200], [2, 4, 5, 10, 20], [2, 4, 5, 10, 20, 50]], (N, p, t) => Number.isInteger(r2(N * p / t)));
      const e = r2(N * dPhi / dt);
      return pick([
        S(`A coil of ${N} turns has its flux change by ${dPhi} mWb in ${dt} ms. What emf is induced, in volts?`, "🔄", e,
          "More turns and faster changes both raise the emf.", "ε = N × ΔΦ ÷ Δt.", "Example: 20 turns, 6 mWb in 3 ms gives 20 × 6 ÷ 3 = 40 V. Now do yours."),
        S(`A ${N}-turn coil produces ${e} V when its flux changes by ${dPhi} mWb. How long did the change take, in ms?`, "⏱️", dt,
          "Rearrange ε = NΔΦ ÷ Δt.", "Δt = N × ΔΦ ÷ ε.", "Example: 10 turns, 8 mWb and 20 V gives Δt = 80 ÷ 20 = 4 ms. Now do yours."),
        S(`A coil produces ${e} V when its flux changes by ${dPhi} mWb in ${dt} ms. How many turns does it have?`, "🧵", N,
          "Rearrange ε = NΔΦ ÷ Δt.", "N = ε × Δt ÷ ΔΦ.", "Example: 30 V, 6 mWb in 2 ms gives N = 30 × 2 ÷ 6 = 10 turns. Now do yours."),
        S(`The flux through a ${N}-turn coil falls from ${dPhi + 10} mWb to 10 mWb in ${dt} ms. What size of emf is induced, in volts?`, "📉", e,
          "Find the change in flux first.", "ΔΦ = start − end, then ε = N × ΔΦ ÷ Δt.", "Example: 10 turns, flux from 30 to 10 mWb in 4 ms: ΔΦ = 20, so ε = 50 V. Now do yours.")
      ]);
    }),
    num("A rod moving in a field", [
      ["Motional emf", "🚃", "A rod of length l moving at speed v across a field B has an emf along it: <b>ε = Blv</b>."],
      ["Current", "🔌", "If the rod is part of a circuit of resistance R, the induced current is <b>I = ε ÷ R</b>."],
      ["Example", "🧮", "B = 0.5 T, l = 2 m, v = 10 m/s: ε = 0.5 × 2 × 10 = 10 V. With R = 5 Ω, I = 2 A."]
    ], () => {
      const [B, l, v] = combo([[0.1, 0.2, 0.5, 1, 2], [0.2, 0.5, 1, 2], [2, 5, 10, 20]], (B, l, v) => cl(B * l * v));
      const e = r2(B * l * v);
      const R = pick([2, 4, 5, 10, 20, 25, 50]);
      const Ig = r2(e / R);
      return pick([
        S(`A ${l} m rod moves at ${v} m/s at right angles to a ${B} T field. What emf is induced, in volts?`, "🚃", e,
          "Multiply field, length and speed.", "ε = B × l × v.", "Example: 0.4 T, 1 m, 5 m/s gives 2 V. Now do yours."),
        S(`A rod of length ${l} m produces ${e} V moving in a ${B} T field. How fast is it moving, in m/s?`, "💨", v,
          "Rearrange ε = Blv.", "v = ε ÷ (B × l).", "Example: 6 V, 2 m, 1.5 T gives v = 6 ÷ 3 = 2 m/s. Now do yours."),
        cl(Ig) ? S(`A rod makes ${e} V and is part of a circuit with total resistance ${R} Ω. What current flows, in amps?`, "🔌", Ig,
          "Use Ohm's law with the induced emf.", "I = ε ÷ R.", "Example: 12 V across 4 Ω gives 3 A. Now do yours.") :
        S(`A rod moving at ${v} m/s in a ${B} T field has length ${l} m. If the speed is doubled, what is the new emf, in volts?`, "✖️", 2 * e,
          "The emf is proportional to the speed.", "Double the original emf.", "Example: 3 V at one speed becomes 6 V at double the speed. Now do yours.")
      ]);
    }),
    les("Lenz's law", [
      ["Opposing change", "🛑", "<b>Lenz's law:</b> an induced current flows in the direction that <b>opposes the change</b> that caused it. This is conservation of energy: you must do work to push a magnet towards a coil."],
      ["Magnet and coil", "🧲", "Push a north pole towards a coil and the coil makes a north pole facing it, repelling the magnet. Pull the magnet away and the coil attracts it. Faster motion gives a bigger emf."],
      ["No change, no emf", "⏸️", "A steady flux, even a strong one, induces no emf. A magnet falling down a copper pipe falls slowly because currents in the pipe oppose its motion."]
    ], ["Ask what change is happening, then which way the coil would oppose it.", "Conservation of energy explains the opposing force.", "Example: pulling a magnet away from a coil makes the coil attract it. Now try yours."], [
      ["A north pole moves towards a coil. The induced current makes the coil face...", "A north pole towards the magnet", "A south pole towards the magnet", "No pole at all"],
      ["A magnet is pulled away from a coil. The coil's force on the magnet is...", "Attractive, holding it back", "Repulsive, pushing it away", "Zero"],
      ["A steady magnetic field passes through a stationary coil. The induced emf is...", "Zero", "Large", "Alternating"],
      ["Lenz's law is a result of conserving...", "Energy", "Charge only", "Volume"],
      ["A magnet moves into a coil twice as fast. The induced emf is...", "Larger", "Smaller", "The same"],
      ["A magnet dropped through a copper tube falls slowly because...", "Induced currents oppose its motion", "Copper is sticky", "Air is trapped"],
      ["A transformer needs alternating current because...", "The flux must keep changing", "Direct current is too weak to feel", "Alternating current is cheaper"],
      ["The minus sign in Faraday's law shows that the induced emf...", "Opposes the change in flux", "Always reduces the current to zero", "Is always negative"]
    ]),
    num("Alternating current power", [
      ["RMS values", "〰️", "Mains voltage swings up and down. The <b>rms</b> value gives the same heating as a steady DC voltage: <b>V_peak = √2 × V_rms</b>. Use √2 ≈ 1.4."],
      ["Power", "🔥", "Average power in a resistor: <b>P = V_rms² ÷ R</b>. The frequency is <b>f = 1 ÷ T</b>."],
      ["Example", "🧮", "V_rms = 100 V gives V_peak = 140 V. Across 50 Ω, P = 10 000 ÷ 50 = 200 W. A period of 20 ms means f = 1000 ÷ 20 = 50 Hz."]
    ], () => {
      const Vr = pick([10, 20, 50, 100, 150, 200]), Vp = Vr * 1.4;
      const [V2, R] = combo([[10, 20, 50, 100, 120, 200, 240], [10, 20, 30, 40, 50, 60, 100, 120]], (V, R) => Number.isInteger(r2(V * V / R)));
      const T = pick([10, 20, 25, 40, 50]);
      return pick([
        S(`An AC supply has an rms voltage of ${Vr} V. What is its peak voltage in volts? (Use √2 = 1.4)`, "〰️", r2(Vp),
          "The peak is higher than the rms value.", "V_peak = 1.4 × V_rms.", "Example: 50 V rms gives a peak of 70 V. Now do yours."),
        S(`An AC supply has a peak voltage of ${r2(Vp)} V. What is its rms voltage in volts? (Use √2 = 1.4)`, "🔌", Vr,
          "The rms is smaller than the peak.", "V_rms = V_peak ÷ 1.4.", "Example: a peak of 70 V gives 70 ÷ 1.4 = 50 V. Now do yours."),
        S(`An AC supply of ${V2} V rms is connected across a ${R} Ω heater. What is the average power in watts?`, "🔥", V2 * V2 / R,
          "Use the rms voltage for average power.", "P = V² ÷ R.", "Example: 100 V across 50 Ω gives 10 000 ÷ 50 = 200 W. Now do yours."),
        S(`An AC signal has a period of ${T} ms. What is its frequency in hertz?`, "⏱️", 1000 / T,
          "Frequency is the number of cycles in one second.", "f = 1000 ÷ T when T is in milliseconds.", "Example: a period of 8 ms gives 1000 ÷ 8 = 125 Hz. Now do yours.")
      ]);
    }),
    num("How a generator works", [
      ["Spinning coil", "⚙️", "A coil of N turns and area A spinning at angular speed ω in a field B has a peak emf <b>ε = NBAω</b>."],
      ["Spin rate", "🌀", "To get ω from rpm, use ω = 2π × rpm ÷ 60. With π = 3 that is <b>ω = rpm ÷ 10</b>."],
      ["Example", "🧮", "N = 100, B = 0.2 T, A = 0.05 m², ω = 40 rad/s: ε = 100 × 0.2 × 0.05 × 40 = 40 V."]
    ], () => {
      const [N, B, A, w] = combo([[10, 20, 50, 100, 200], [0.1, 0.2, 0.5], [0.01, 0.02, 0.05, 0.1], [20, 50, 100, 200, 300]], (N, B, A, w) => Number.isInteger(r2(N * B * A * w)));
      const e = r2(N * B * A * w), rpm = pick([300, 600, 1200, 1800, 3000]);
      return pick([
        S(`A generator coil has ${N} turns, area ${A} m², spins at ${w} rad/s in a ${B} T field. What is its peak emf in volts?`, "⚙️", e,
          "Multiply all four quantities.", "ε = N × B × A × ω.", "Example: 50 turns, 0.2 T, 0.02 m², 100 rad/s gives 20 V. Now do yours."),
        S(`A coil of ${N} turns and area ${A} m² in a ${B} T field makes a peak emf of ${e} V. What is its angular speed in rad/s?`, "🌀", w,
          "Rearrange ε = NBAω.", "ω = ε ÷ (N × B × A).", "Example: 20 V from 50 turns, 0.2 T, 0.02 m² gives ω = 20 ÷ 0.2 = 100 rad/s. Now do yours."),
        S(`A generator turns at ${rpm} rpm. What is ω in rad/s? (ω = 2π × rpm ÷ 60 with π = 3)`, "🔄", rpm / 10,
          "Convert rpm to turns per second, then multiply by 2π.", "ω = rpm ÷ 10 when π = 3.", "Example: 900 rpm gives ω = 90 rad/s. Now do yours."),
        S(`A generator makes a peak emf of ${e} V. If the coil is made to spin twice as fast, what is the new peak emf in volts?`, "✖️", 2 * e,
          "Peak emf is proportional to the spin rate.", "Double the original peak emf.", "Example: 15 V becomes 30 V at double speed. Now do yours.")
      ]);
    })
  ];
  b.push(
    mix("Mixed practice", at(b, [0, 1, 3, 4, 5, 8, 9, 12, 13, 14, 16, 17])),
    mix("Level 23 Challenge", at(b, [0, 2, 4, 6, 8, 10, 12, 13, 15, 16, 17]))
  );

  // ================= LEVEL 24 =================
  const c = [
    num("The simple pendulum", [
      ["Swinging time", "🕰️", "For small swings, a pendulum of length L has period <b>T = 2π√(L ÷ g)</b>. The mass and the size of the swing do not matter."],
      ["Use these numbers", "🧮", "Take g = 10 m/s² and π = 3. Frequency is <b>f = 1 ÷ T</b>."],
      ["Example", "🧮", "L = 2.5 m: √(2.5 ÷ 10) = √0.25 = 0.5, so T = 2 × 3 × 0.5 = 3 s."]
    ], () => {
      const [L, T] = pick([[0.1, 0.6], [0.4, 1.2], [0.9, 1.8], [1.6, 2.4], [2.5, 3], [3.6, 3.6], [0.025, 0.3], [6.4, 4.8]]);
      const Tf = pick([[0.5, 2], [0.25, 4], [2, 0.5], [0.2, 5], [4, 0.25], [0.1, 10], [5, 0.2], [1, 1]]);
      const k = pick([4, 9]);
      return pick([
        S(`A pendulum is ${L} m long. What is its period in seconds? (T = 2π√(L ÷ g), g = 10 m/s², π = 3)`, "🕰️", T,
          "Divide L by g, then take the square root.", "T = 6 × √(L ÷ 10).", "Example: L = 10 m gives √1 = 1, so T = 6 s. Now do yours."),
        S(`A pendulum swings with a period of ${T} s. How long is it, in metres? (g = 10 m/s², π = 3)`, "📏", L,
          "Square the period equation and solve for L.", "L = g × (T ÷ 6)².", "Example: T = 6 s gives (6 ÷ 6)² = 1, so L = 10 m. Now do yours."),
        S(`A pendulum has a period of ${Tf[0]} s. What is its frequency in hertz?`, "🔔", Tf[1],
          "Frequency and period are inverses.", "f = 1 ÷ T.", "Example: T = 0.8 s gives f = 1.25 Hz. Now do yours."),
        S(`A pendulum's length is multiplied by ${k}. Its old period was ${T} s. What is its new period in seconds? (T is proportional to √L)`, "✖️", T * Math.sqrt(k),
          "The period depends on the square root of the length.", `Multiply the old period by √${k}.`, "Example: length ×4 turns 2 s into 4 s. Now do yours.")
      ]);
    }),
    num("The mass on a spring", [
      ["Period of a spring", "🌀", "A mass m on a spring of stiffness k oscillates with period <b>T = 2π√(m ÷ k)</b>. A stiffer spring is quicker. A heavier mass is slower."],
      ["Use these numbers", "🧮", "Use π = 3. Square the equation to solve for k or m: <b>k = 4π²m ÷ T² = 36m ÷ T²</b>."],
      ["Example", "🧮", "m = 1 kg and k = 4 N/m: √(1 ÷ 4) = 0.5, so T = 6 × 0.5 = 3 s."]
    ], () => {
      const [m, k, T] = pick([[1, 100, 0.6], [2, 50, 1.2], [9, 100, 1.8], [4, 25, 2.4], [1, 4, 3], [0.4, 10, 1.2], [16, 100, 2.4], [25, 100, 3], [0.1, 10, 0.6]]);
      return pick([
        S(`A ${m} kg mass hangs on a spring with k = ${k} N/m. What is its period in seconds? (T = 2π√(m ÷ k), π = 3)`, "🌀", T,
          "Divide the mass by the spring constant first.", "T = 6 × √(m ÷ k).", "Example: m = 36 kg and k = 100 N/m gives 6 × √0.36 = 6 × 0.6 = 3.6 s. Now do yours."),
        S(`A ${m} kg mass oscillates on a spring with a period of ${T} s. What is the spring constant in N/m? (π = 3)`, "🧰", k,
          "Rearrange T = 2π√(m ÷ k).", "k = 36 × m ÷ T².", "Example: m = 36 kg and T = 3.6 s gives k = 1296 ÷ 12.96 = 100 N/m. Now do yours."),
        S(`A spring with k = ${k} N/m has a period of ${T} s. What is the mass in kg? (π = 3)`, "⚖️", m,
          "Rearrange T = 2π√(m ÷ k).", "m = k × T² ÷ 36.", "Example: k = 100 N/m and T = 3.6 s gives m = 100 × 12.96 ÷ 36 = 36 kg. Now do yours."),
        S(`A mass on a spring has a period of ${T} s. The mass is multiplied by 4. What is the new period in seconds?`, "✖️", 2 * T,
          "Period depends on the square root of the mass.", "√4 = 2, so the period doubles.", "Example: a 5 s period becomes 10 s when the mass is quadrupled. Now do yours.")
      ]);
    }),
    num("Speed and acceleration in SHM", [
      ["Maximum values", "〰️", "In simple harmonic motion with amplitude A and angular frequency ω: maximum speed <b>v = Aω</b> (at the centre) and maximum acceleration <b>a = Aω²</b> (at the ends)."],
      ["Finding ω", "🔁", "<b>ω = 2π ÷ T = 2πf</b>. With π = 3: ω = 6 ÷ T."],
      ["Example", "🧮", "A = 4 cm and ω = 5 rad/s: v_max = 20 cm/s and a_max = 4 × 25 = 100 cm/s²."]
    ], () => {
      const A = pick([2, 3, 4, 5, 10]), w = pick([2, 3, 5, 10]);
      const [T, w2] = pick([[0.6, 10], [1.2, 5], [2, 3], [3, 2], [6, 1]]);
      const f = pick([1, 2, 5]);
      return pick([
        S(`An oscillator has amplitude ${A} cm and angular frequency ${w} rad/s. What is its maximum speed in cm/s?`, "〰️", A * w,
          "The maximum speed is at the centre of the motion.", "v = A × ω.", "Example: A = 6 cm and ω = 4 rad/s gives 24 cm/s. Now do yours."),
        S(`An oscillator has amplitude ${A} cm and angular frequency ${w} rad/s. What is its maximum acceleration in cm/s²?`, "📈", A * w * w,
          "Acceleration involves ω squared.", "a = A × ω².", "Example: A = 3 cm and ω = 4 rad/s gives 3 × 16 = 48 cm/s². Now do yours."),
        S(`An oscillation has a period of ${T} s. What is its angular frequency in rad/s? (ω = 2π ÷ T, π = 3)`, "🔁", w2,
          "Divide one full cycle, 2π, by the time.", "ω = 6 ÷ T.", "Example: T = 1.5 s gives ω = 6 ÷ 1.5 = 4 rad/s. Now do yours."),
        S(`An oscillation has a frequency of ${f} Hz. What is its angular frequency in rad/s? (ω = 2πf, π = 3)`, "🔔", 6 * f,
          "Each cycle is 2π radians.", "ω = 6 × f.", "Example: f = 4 Hz gives ω = 24 rad/s. Now do yours.")
      ]);
    }),
    num("Photon energy", [
      ["Light in packets", "💡", "Light comes in packets called <b>photons</b>, each with energy <b>E = hf</b>. Shorter wavelengths mean more energy per photon."],
      ["Handy formula", "🧮", "With wavelength λ in nanometres, the photon energy in electron-volts is <b>E = 1240 ÷ λ</b>."],
      ["Example", "🧮", "λ = 620 nm: E = 1240 ÷ 620 = 2 eV. Halve the wavelength to 310 nm and E doubles to 4 eV."]
    ], () => {
      const rows = [[620, 2], [400, 3.1], [310, 4], [248, 5], [124, 10], [775, 1.6], [496, 2.5], [1240, 1]];
      const [lam, E] = pick(rows);
      const [l0, E0] = pick([[620, 2], [400, 3.1], [775, 1.6], [496, 2.5]]);
      return pick([
        S(`What is the energy of a photon of wavelength ${lam} nm, in eV? (E = 1240 ÷ λ)`, "💡", E,
          "Short wavelength means high energy, so divide into 1240.", "E = 1240 ÷ λ.", "Example: λ = 155 nm gives 1240 ÷ 155 = 8 eV. Now do yours."),
        S(`A photon has ${E} eV of energy. What is its wavelength in nm? (λ = 1240 ÷ E)`, "🌈", lam,
          "Rearrange E = 1240 ÷ λ.", "λ = 1240 ÷ E.", "Example: 8 eV gives λ = 1240 ÷ 8 = 155 nm. Now do yours."),
        S(`Light of wavelength ${l0} nm has photons of ${E0} eV. What is the photon energy of light with half that wavelength, in eV?`, "➗", E0 * 2,
          "Energy and wavelength are inversely proportional.", "Halving λ doubles E.", "Example: photons of 3 eV at one wavelength have 6 eV at half the wavelength. Now do yours."),
        S(`A laser emits photons of ${E} eV. In total 4 photons are absorbed. How much energy is that, in eV?`, "🔦", E * 4,
          "Total energy is the number of photons times the energy of one.", "Multiply by the number of photons.", "Example: 5 photons of 2 eV each give 10 eV. Now do yours.")
      ]);
    }),
    num("Photoelectric effect", [
      ["Kicking out electrons", "🔆", "A photon with enough energy can free an electron from a metal. The most energetic electrons leave with <b>KEmax = E_photon − φ</b>, where φ is the metal's <b>work function</b>."],
      ["Threshold", "🚪", "Below the threshold frequency, no electrons come out however bright the light. Brighter light means <b>more</b> electrons, not faster ones."],
      ["Stopping voltage", "🛑", "The stopping voltage in volts equals KEmax in eV. Example: 5 eV photons on a metal with φ = 2 eV give KEmax = 3 eV and a stopping voltage of 3 V."]
    ], () => {
      const [E, phi] = combo([[3, 4, 5, 6, 8, 10], [2, 2.5, 3, 4, 4.5]], (E, phi) => E > phi);
      const thr = pick([[2, 620], [2.5, 496], [3.1, 400], [4, 310], [5, 248]]);
      const K = pick([1, 2, 3, 4]);
      return pick([
        S(`Photons of ${E} eV hit a metal with work function ${phi} eV. What is the maximum kinetic energy of the electrons, in eV?`, "🔆", E - phi,
          "Some of the photon's energy pays to escape the metal.", "KEmax = photon energy − work function.", "Example: 7 eV photons on φ = 3.2 eV leave 3.8 eV. Now do yours."),
        S(`Photons of ${E} eV hit a metal with work function ${phi} eV. What stopping voltage, in volts, just stops the electrons?`, "🛑", E - phi,
          "The stopping voltage matches the maximum kinetic energy in eV.", "V = (E − φ), numerically.", "Example: electrons with 3.8 eV need a 3.8 V stopping voltage. Now do yours."),
        S(`A metal has a work function of ${thr[0]} eV. What is the longest wavelength of light, in nm, that can free electrons? (λ = 1240 ÷ φ)`, "🚪", thr[1],
          "At the threshold the photon energy just equals the work function.", "λ = 1240 ÷ φ.", "Example: φ = 4.9 eV is about 1240 ÷ 4.9 ≈ 253 nm. Now do yours."),
        S(`Electrons leave a metal with a maximum kinetic energy of ${K} eV. The light's intensity is doubled (same colour). What is the new maximum kinetic energy, in eV?`, "💡", K,
          "Intensity changes the number of photons, not their energy.", "KEmax stays the same.", "Example: electrons with 2.2 eV stay at 2.2 eV when the light is brighter. Now do yours.")
      ]);
    }),
    num("Matter waves", [
      ["Particles as waves", "🌊", "Every moving particle has a wavelength: <b>λ = h ÷ p</b> (de Broglie). More momentum means a shorter wavelength."],
      ["Electrons", "🔬", "For an electron accelerated through V volts, <b>λ ≈ 1.2 ÷ √V</b> nanometres. Electron microscopes use this tiny wavelength to see very small things."],
      ["Example", "🧮", "V = 100: λ = 1.2 ÷ 10 = 0.12 nm. If momentum doubles, wavelength halves."]
    ], () => {
      const rows = [[100, 0.12], [25, 0.24], [400, 0.06], [144, 0.1], [36, 0.2], [9, 0.4], [225, 0.08], [64, 0.15], [16, 0.3], [4, 0.6], [900, 0.04]];
      const [V, lam] = pick(rows);
      const [l0, f] = combo([[0.4, 0.6, 0.8, 1.2, 2], [2, 3, 4, 5]], (l, f) => cl(l / f));
      return pick([
        S(`Electrons are accelerated through ${V} V. What is their wavelength in nm? (λ = 1.2 ÷ √V)`, "🔬", lam,
          "Take the square root of the voltage first.", "λ = 1.2 ÷ √V.", "Example: V = 1 gives 1.2 ÷ 1 = 1.2 nm. Now do yours."),
        S(`Electrons have a wavelength of ${lam} nm. Through what voltage were they accelerated? (λ = 1.2 ÷ √V)`, "⚡", V,
          "Rearrange to get √V by itself, then square.", "√V = 1.2 ÷ λ, so V = (1.2 ÷ λ)².", "Example: λ = 1.2 nm gives √V = 1, so V = 1 V. Now do yours."),
        S(`A particle's wavelength is ${l0} nm. Its momentum is multiplied by ${f}. What is the new wavelength, in nm?`, "🌊", l0 / f,
          "Wavelength is inversely proportional to momentum.", "Divide the wavelength by the factor.", "Example: 3 nm with momentum ×3 gives 1 nm. Now do yours.")
      ]);
    }),
    num("Energy levels in hydrogen", [
      ["Quantised energies", "⚛️", "An electron in hydrogen can only have certain energies: <b>Eₙ = −13.6 ÷ n² eV</b>. The energy needed to remove it from level n is <b>13.6 ÷ n²</b> eV."],
      ["Jumps make light", "🌈", "When the electron falls from a higher level to a lower one, it emits a photon whose energy is the difference between the two levels. Going up needs the same energy absorbed."],
      ["Example", "🧮", "From n = 2 to n = 1: 13.6 − 3.4 = 10.2 eV. With n levels there are n(n − 1) ÷ 2 possible different jumps down."]
    ], () => {
      const n = pick([1, 2, 4, 5]);
      const j = pick([[2, 1, 10.2], [4, 1, 12.75], [4, 2, 2.55]]);
      const L = pick([2, 3, 4, 5, 6]);
      return pick([
        S(`How much energy, in eV, is needed to remove the electron from hydrogen level n = ${n}? (13.6 ÷ n²)`, "⚛️", 13.6 / (n * n),
          "Square n first.", "Energy = 13.6 ÷ n².", "Example: n = 3 needs 13.6 ÷ 9 ≈ 1.51 eV. Now do yours."),
        S(`A hydrogen electron falls from n = ${j[0]} to n = ${j[1]}. What is the energy of the photon emitted, in eV? (13.6(1/n₁² − 1/n₂²))`, "🌈", j[2],
          "Find the energy of each level and subtract.", `Energy = 13.6 × (1 ÷ ${j[1] * j[1]} − 1 ÷ ${j[0] * j[0]}).`, "Example: n = 3 to n = 1 would be 13.6 × (1 − 1/9) ≈ 12.1 eV. Now do yours."),
        S(`A hydrogen atom has ${L} energy levels available. How many different downward jumps are possible? (n(n − 1) ÷ 2)`, "🪜", L * (L - 1) / 2,
          "Count each pair of levels once.", "Number = L × (L − 1) ÷ 2.", "Example: 3 levels give 3 × 2 ÷ 2 = 3 jumps. Now do yours.")
      ]);
    }),
    num("Mass and energy", [
      ["E = mc²", "☀️", "Mass is a form of energy: <b>E = mc²</b>, with c = 3 × 10⁸ m/s. A tiny mass is a huge amount of energy."],
      ["Easy numbers", "🧮", "For a mass in <b>grams</b>, the energy is <b>E = 9 × m</b> in units of 10¹³ joules."],
      ["Nuclear reactions", "⚛️", "In nuclear energy sums, 1 atomic mass unit (u) is worth about <b>930 MeV</b>. The mass lost in a reaction (the mass defect) is turned into energy."]
    ], () => {
      const m = pick([0.1, 0.5, 1, 2, 3, 5, 10]), E = pick([9, 18, 27, 45, 90]);
      const dm = pick([0.002, 0.01, 0.02, 0.03, 0.05, 0.1]);
      return pick([
        S(`A mass of ${m} g is completely turned into energy. How much energy is released, in units of 10¹³ J? (E = 9 × m)`, "☀️", 9 * m,
          "Multiply the mass in grams by the conversion number.", "E = 9 × m.", "Example: 4 g gives 36 × 10¹³ J. Now do yours."),
        S(`A reaction releases ${E} × 10¹³ J. How many grams of mass were converted? (E = 9 × m)`, "⚖️", E / 9,
          "Reverse the conversion.", "m = E ÷ 9.", "Example: 36 × 10¹³ J comes from 36 ÷ 9 = 4 g of mass. Now do yours."),
        S(`A nuclear reaction loses ${dm} u of mass. How much energy is released, in MeV? (1 u = 930 MeV)`, "⚛️", dm * 930,
          "Multiply the mass defect by the energy of one u.", "Energy = mass defect × 930.", "Example: 0.04 u gives 0.04 × 930 = 37.2 MeV. Now do yours."),
        S(`A reaction releases ${r2(dm * 930)} MeV. What mass defect, in u, does that correspond to? (1 u = 930 MeV)`, "🔍", dm,
          "Reverse the conversion.", "Mass defect = energy ÷ 930.", "Example: 186 MeV corresponds to 186 ÷ 930 = 0.2 u. Now do yours.")
      ]);
    }),
    num("Time dilation", [
      ["Moving clocks run slow", "⏳", "To an observer, a clock moving at speed v ticks slowly: <b>t = γ t₀</b>, where t₀ is the time on the moving clock (the proper time) and γ = 1 ÷ √(1 − v²/c²)."],
      ["Useful values", "🧮", "v = 0.6c gives γ = 1.25 (5/4). v = 0.8c gives γ = 5/3. v = 0.96c gives γ = 25/7. v = 0.28c gives γ = 25/24."],
      ["Example", "🧮", "A trip takes 4 years by the ship's clock at 0.6c. Observers on Earth measure 4 × 1.25 = 5 years."]
    ], () => {
      const rows = [[0.6, "5/4", 1.25, [4, 8, 12, 20]], [0.8, "5/3", 5 / 3, [3, 6, 9, 12]], [0.96, "25/7", 25 / 7, [7, 14, 21]], [0.28, "25/24", 25 / 24, [24, 48]]];
      const [v, gs, g, t0s] = pick(rows), t0 = pick(t0s), t = r2(t0 * g);
      return pick([
        S(`A spaceship travels at ${v}c (γ = ${gs}). Its clock shows ${t0} years pass. How many years pass for observers on Earth?`, "🚀", t,
          "Moving clocks tick slowly, so the Earth observers measure more time.", `t = γ × t₀ = ${gs} × ${t0}.`, "Example: 7 ship-years at γ = 2 is 14 Earth-years. Now do yours."),
        S(`Observers on Earth measure ${t} years for a ship moving at ${v}c (γ = ${gs}). How many years pass on the ship's own clock?`, "⏱️", t0,
          "The ship's own clock shows less time.", "t₀ = t ÷ γ.", "Example: 22 Earth-years at γ = 2 is 11 ship-years. Now do yours."),
        S(`A radioactive particle at ${v}c (γ = ${gs}) has a lifetime of ${t0} microseconds in its own frame. What lifetime does a lab measure, in microseconds?`, "⚛️", t,
          "In the lab, the moving particle's clock runs slowly.", "t = γ × t₀.", "Example: 11 µs at γ = 2 appears as 22 µs. Now do yours.")
      ]);
    }),
    num("Length contraction", [
      ["Moving rulers shrink", "📏", "A length along the direction of motion measures shorter for a moving object: <b>L = L₀ ÷ γ</b>, where L₀ is the length in the object's own rest frame."],
      ["Useful values", "🧮", "At 0.6c, L = 0.8 L₀. At 0.8c, L = 0.6 L₀. At 0.96c, L = 0.28 L₀. At 0.28c, L = 0.96 L₀."],
      ["A trip", "🌟", "A star 20 light-years away, at 0.8c: Earth sees a 25-year trip, but the ship's clock reads only 25 × 0.6 = 15 years."]
    ], () => {
      const rows = [[0.6, 0.8], [0.8, 0.6], [0.96, 0.28], [0.28, 0.96]];
      const [v, f] = pick(rows), L0 = pick([10, 20, 25, 50, 100]);
      const trips = pick([[20, 0.8, 25, 15], [12, 0.6, 20, 16], [24, 0.96, 25, 7], [28, 0.28, 100, 96]]);
      return pick([
        S(`A rocket is ${L0} m long at rest. It passes at ${v}c, where the contraction factor is ${f}. How long does it measure to an observer, in metres?`, "🚀", L0 * f,
          "Moving objects look shorter along their motion.", "L = L₀ × (the factor).", "Example: 35 m at factor 0.6 appears as 21 m. Now do yours."),
        S(`A moving rocket (contraction factor ${f}) measures ${r2(L0 * f)} m to an observer. What is its rest length in metres?`, "📏", L0,
          "Undo the contraction.", "L₀ = L ÷ factor.", "Example: 21 m at factor 0.6 means a rest length of 35 m. Now do yours."),
        S(`A star is ${trips[0]} light-years away in Earth's frame. A ship travels there at ${trips[1]}c. How many years does the trip take by Earth's clocks? (t = d ÷ v)`, "🌟", trips[2],
          "Distance divided by speed, using years and light-years.", `t = ${trips[0]} ÷ ${trips[1]}.`, "Example: 6 light-years at 0.6c takes 6 ÷ 0.6 = 10 years. Now do yours."),
        S(`Earth clocks show a ${trips[2]}-year trip at ${trips[1]}c, where the contraction factor is ${r2(trips[3] / trips[2])}. How many years pass on the ship's clock?`, "🧑‍🚀", trips[3],
          "The ship's clock runs slowly compared with Earth's.", "Ship time = Earth time × factor.", "Example: 10 Earth-years at factor 0.8 is 8 ship-years. Now do yours.")
      ]);
    }),
    les("Ideas of relativity", [
      ["Two postulates", "🚀", "Einstein's special relativity starts from two ideas: the laws of physics are the same in every frame moving at constant speed, and the <b>speed of light is the same for all observers</b>."],
      ["Consequences", "⏳", "Moving clocks run slowly, moving lengths contract, and two events that are simultaneous for one observer may not be for another. Nothing with mass can reach the speed of light."],
      ["Evidence", "🛰️", "Fast muons from the upper atmosphere reach the ground because their clocks run slow in our frame. GPS satellites need corrections for relativity to stay accurate."]
    ], ["Recall the two postulates and what they lead to.", "Think about how time and length depend on speed.", "Example: moving clocks run slowly, so a twin who travels fast ages less. Now try yours."], [
      ["According to special relativity, the speed of light is...", "The same for all observers", "Faster when the source moves towards you", "Slower in empty space"],
      ["A fast-moving clock, seen from Earth, runs...", "Slow", "Fast", "Backwards"],
      ["Which can never reach the speed of light?", "Any object with mass", "A photon", "A radio wave"],
      ["A twin travels away at high speed and returns. Compared with the stay-at-home twin, the traveller has aged...", "Less", "More", "Exactly the same"],
      ["Muons made high in the atmosphere reach the ground because...", "Their clocks run slowly in our frame", "They travel faster than light", "They are very heavy"],
      ["E = mc² says that...", "Mass is a form of energy", "Light has no energy", "Energy has no mass at all"],
      ["Which needs relativity corrections to work accurately?", "GPS satellites", "A rolling ball", "A bicycle"],
      ["General relativity describes gravity as...", "Curved space and time", "A push from air", "A magnetic force"]
    ]),
    les("Quantum ideas", [
      ["Waves and particles", "🌊", "Light acts like waves (interference) and like particles (photons). Electrons also act like both: they make interference patterns, yet arrive one at a time at a detector."],
      ["Quantised", "🪜", "Energy in atoms comes in <b>levels</b>. Atoms emit and absorb light only at specific colours, which gives each element its own line spectrum."],
      ["Uncertainty", "❓", "<b>Heisenberg's uncertainty principle:</b> you cannot know both a particle's exact position and exact momentum at once. This is a basic limit of nature, not a limit of our instruments."]
    ], ["Recall: waves, particles and levels all appear in the quantum world.", "Think of the double-slit experiment with single electrons.", "Example: electrons fired one at a time still build up an interference pattern. Now try yours."], [
      ["Electrons sent one at a time through two slits slowly build up...", "An interference pattern", "Two plain bright lines", "A uniform glow"],
      ["Atoms of an element emit light at...", "Specific colours (a line spectrum)", "Every possible colour equally", "Only invisible light"],
      ["The uncertainty principle says we cannot know exactly both a particle's...", "Position and momentum", "Mass and charge", "Colour and size"],
      ["A photon is...", "A packet of light energy", "A tiny atom", "A kind of sound"],
      ["Brighter light of the same colour on a metal releases more electrons per second, but...", "Not faster ones", "Faster ones", "Slower ones"],
      ["A hydrogen electron can have...", "Only certain allowed energies", "Any energy at all", "Negative mass"],
      ["The wavelength of a moving particle gets shorter when its momentum...", "Increases", "Decreases", "Is zero"],
      ["The double-slit experiment with electrons shows that electrons can behave like...", "Waves", "Only tiny balls", "Light bulbs"]
    ]),
    les("Nuclear binding energy", [
      ["Mass defect", "⚛️", "A nucleus has slightly <b>less mass</b> than its separate protons and neutrons. The missing mass is the <b>binding energy</b> that holds it together (E = mc²)."],
      ["Iron peak", "🔩", "Binding energy per nucleon is highest around iron-56. <b>Fusion</b> of light nuclei and <b>fission</b> of heavy nuclei both move towards that peak, so both release energy."],
      ["Stars and reactors", "☀️", "Stars fuse hydrogen into helium. Fusion needs huge temperatures to push positive nuclei close together. Reactors use fission chain reactions, controlled by rods that absorb neutrons."]
    ], ["Think about energy per nucleon and where it peaks.", "Light nuclei fuse; heavy nuclei split.", "Example: joining two hydrogen nuclei into helium releases energy. Now try yours."], [
      ["A nucleus has _____ mass than its separate nucleons.", "Less", "More", "Exactly the same"],
      ["Binding energy per nucleon is greatest near...", "Iron", "Hydrogen", "Uranium"],
      ["Which process powers the Sun?", "Fusion of hydrogen into helium", "Fission of uranium", "Burning of coal"],
      ["Why does fusion need extreme temperatures?", "Positive nuclei repel and must be forced close together", "Nuclei are too heavy to move", "Neutrons are cold"],
      ["In a nuclear reactor, control rods...", "Absorb neutrons to control the reaction", "Add more fuel", "Cool the Sun"],
      ["Splitting a heavy nucleus such as uranium is called...", "Fission", "Fusion", "Ionisation"],
      ["The energy released in a nuclear reaction comes from...", "Mass converted to energy", "Chemical bonds breaking", "Friction"],
      ["Joining two light nuclei is called...", "Fusion", "Fission", "Decay"]
    ]),
    num("Bernoulli's principle", [
      ["Faster means lower pressure", "🌬️", "In steady flow along a pipe, <b>P + ½ρv² + ρgh</b> is constant. Where the fluid speeds up, its pressure drops."],
      ["Speed change", "🧮", "At the same height, the pressure drop from speed v₁ to v₂ is <b>ΔP = ½ρ(v₂² − v₁²)</b>. For water (ρ = 1000 kg/m³) this is 0.5 × (v₂² − v₁²) in <b>kPa</b>."],
      ["Height change", "🏔️", "For water, rising by h metres costs <b>ρgh = 10h kPa</b> of pressure if the speed stays the same."]
    ], () => {
      const [v1, v2] = pick([[2, 4], [3, 5], [1, 3], [2, 6], [1, 5], [4, 6], [5, 7], [3, 7]]);
      const dP = 0.5 * (v2 * v2 - v1 * v1), h = pick([2, 3, 5, 8]);
      return pick([
        S(`Water speeds up from ${v1} m/s to ${v2} m/s in a horizontal pipe. By how many kPa does the pressure drop? (0.5 × (v₂² − v₁²))`, "🌬️", dP,
          "Square each speed, then subtract.", "ΔP = 0.5 × (v₂² − v₁²), in kPa for water.", "Example: from 1 m/s to 2 m/s gives 0.5 × (4 − 1) = 1.5 kPa. Now do yours."),
        S(`Water flows at ${v1} m/s in a wide horizontal pipe. In a narrow part the pressure is ${dP} kPa lower. How fast is the water moving there, in m/s? (ΔP = 0.5 × (v₂² − v₁²))`, "🔽", v2,
          "Add the pressure change back into the squared speeds.", "v₂² = v₁² + 2 × ΔP.", "Example: v₁ = 6 m/s and ΔP = 14 kPa: v₂² = 36 + 28 = 64, so v₂ = 8 m/s. Now do yours."),
        S(`Water in a pipe flows at a steady speed and rises ${h} m up a hill. By how many kPa does the pressure fall? (ρgh with ρ = 1000 kg/m³ and g = 10 m/s²)`, "🏔️", 10 * h,
          "Pressure falls by the weight of the extra water column.", "ΔP = 10 × h in kPa.", "Example: a rise of 4 m costs 40 kPa. Now do yours."),
        S(`A fire hose nozzle speeds water up from ${v1} m/s to ${v2} m/s at the same height. If the pressure before was 200 kPa above atmospheric, what is it after in kPa above atmospheric?`, "🚒", 200 - dP,
          "The pressure drops by the Bernoulli amount.", "New pressure = 200 − 0.5 × (v₂² − v₁²).", "Example: 100 kPa with speeds 1 to 3 m/s becomes 100 − 4 = 96 kPa. Now do yours.")
      ]);
    }),
    num("Torricelli's law", [
      ["Draining tank", "🪣", "Water leaving a hole a depth h below the surface comes out at <b>v = √(2gh)</b>, the same speed as something falling h metres."],
      ["Horizontal range", "🎯", "If the hole is at depth h in a tank whose surface is at height H above the ground, the jet lands a distance <b>x = 2√(h(H − h))</b> away."],
      ["Example", "🧮", "g = 10 m/s² and h = 1.25 m: v = √25 = 5 m/s. For h = 1 m and H = 5 m: x = 2√(1 × 4) = 4 m."]
    ], () => {
      const [h, v] = pick([[1.25, 5], [5, 10], [0.2, 2], [20, 20], [3.2, 8], [7.2, 12], [11.25, 15], [0.8, 4], [1.8, 6]]);
      const [h2, H, x] = pick([[1, 5, 4], [1, 10, 6], [1, 17, 8], [4, 5, 4], [4, 13, 12], [9, 10, 6], [5, 10, 10], [3, 6, 6], [4, 8, 8], [2, 4, 4]]);
      return pick([
        S(`A tank has a hole ${h} m below the water surface. How fast does the water leave, in m/s? (v = √(2gh), g = 10 m/s²)`, "🪣", v,
          "Multiply 2, g and h, then take the square root.", "v = √(20 × h).", "Example: h = 0.45 m gives √9 = 3 m/s. Now do yours."),
        S(`Water leaves a hole in a tank at ${v} m/s. How deep, in metres, is the hole below the surface? (g = 10 m/s²)`, "📏", h,
          "Rearrange v = √(2gh).", "h = v² ÷ 20.", "Example: v = 3 m/s gives h = 9 ÷ 20 = 0.45 m. Now do yours."),
        S(`The water surface is ${H} m above the ground and there is a hole ${h2} m below the surface. How far from the tank does the jet land, in metres? (x = 2√(h(H − h)))`, "🎯", x,
          "Find h times (H − h) first.", "Take the square root and double it.", "Example: h = 1 m and H = 2 m gives 2√(1 × 1) = 2 m. Now do yours.")
      ]);
    }),
    num("Floating", [
      ["Floating fractions", "🧊", "A floating object has upthrust equal to its weight. The fraction under the surface is <b>ρ_object ÷ ρ_fluid</b>."],
      ["Examples", "🧮", "Ice (900 kg/m³) in water (1000 kg/m³): 900 ÷ 1000 = 90% is under the surface. A block of density 600 in water is 60% submerged."],
      ["Extra load", "⚖️", "A floating block of volume V can carry extra mass before sinking: <b>(ρ_fluid − ρ_object) × V</b>."]
    ], () => {
      const dens = pick([250, 400, 500, 600, 700, 800, 900]);
      const [rho, fl] = pick([[600, 800], [400, 800], [200, 800], [500, 1000], [750, 1000], [250, 1000]]);
      const V = pick([0.2, 0.5, 1, 2]), rb = pick([500, 600, 700, 800]);
      return pick([
        S(`A block of density ${dens} kg/m³ floats in water (1000 kg/m³). What percentage of it is below the surface?`, "🧊", dens / 10,
          "Compare the block's density with the fluid's.", "Percentage = block density ÷ fluid density × 100.", "Example: density 300 in water is 30% submerged. Now do yours."),
        S(`A floating block has ${dens / 10}% of its volume under water (1000 kg/m³). What is its density in kg/m³?`, "🧊", dens,
          "The submerged fraction equals the density ratio.", "Density = fraction × 1000.", "Example: 35% submerged means density 350 kg/m³. Now do yours."),
        S(`A block of density ${rho} kg/m³ floats in oil of density ${fl} kg/m³. What percentage is submerged?`, "🛢️", rho / fl * 100,
          "Fraction submerged = block density ÷ fluid density.", `Divide ${rho} by ${fl} and multiply by 100.`, "Example: density 400 in a fluid of 500 is 80% submerged. Now do yours."),
        S(`A floating raft of density ${rb} kg/m³ and volume ${V} m³ floats in water (1000 kg/m³). What extra mass, in kg, can it carry before it is fully submerged?`, "🛶", (1000 - rb) * V,
          "Fully submerged, the upthrust equals 1000 times V times g.", "Extra mass = (1000 − density) × V.", "Example: density 900, volume 3 m³ gives 100 × 3 = 300 kg. Now do yours.")
      ]);
    }),
    num("Doppler shift with numbers", [
      ["Source moving", "🚑", "Sound speed is v = 340 m/s. A source approaching at v_s has <b>f′ = f · v ÷ (v − v_s)</b>. Receding: <b>f′ = f · v ÷ (v + v_s)</b>."],
      ["Observer moving", "🚶", "An observer moving towards a still source hears <b>f′ = f · (v + v_o) ÷ v</b>."],
      ["Example", "🧮", "f = 300 Hz, v_s = 85 m/s approaching: f′ = 300 × 340 ÷ 255 = 400 Hz."]
    ], () => {
      const a1 = pick([[85, [300, 150, 450]], [68, [400, 200, 240]], [170, [200, 300]]]);
      const f1 = pick(a1[1]);
      const r = pick([[85, [500, 250, 400]], [170, [300, 450]], [34, [220, 330]]]);
      const f2 = pick(r[1]);
      const o = pick([[34, [300, 400, 200]], [68, [250, 100, 150]], [170, [200, 100]]]);
      const f3 = pick(o[1]);
      return pick([
        S(`An ambulance siren of ${f1} Hz approaches at ${a1[0]} m/s. What frequency do you hear, in Hz? (sound speed 340 m/s)`, "🚑", f1 * 340 / (340 - a1[0]),
          "An approaching source sounds higher.", `f′ = f × 340 ÷ (340 − ${a1[0]}).`, "Example: 200 Hz at 85 m/s gives 200 × 340 ÷ 255 ≈ 267 Hz. Now do yours with your numbers."),
        S(`A train horn of ${f2} Hz moves away at ${r[0]} m/s. What frequency do you hear, in Hz? (sound speed 340 m/s)`, "🚂", f2 * 340 / (340 + r[0]),
          "A receding source sounds lower.", `f′ = f × 340 ÷ (340 + ${r[0]}).`, "Example: 340 Hz receding at 340 m/s would give 340 × 340 ÷ 680 = 170 Hz. Now do yours."),
        S(`You walk towards a still speaker playing ${f3} Hz at ${o[0]} m/s. What frequency do you hear, in Hz? (sound speed 340 m/s)`, "🔊", f3 * (340 + o[0]) / 340,
          "Moving towards the source meets more wavefronts each second.", `f′ = f × (340 + ${o[0]}) ÷ 340.`, "Example: 340 Hz and walking at 34 m/s gives 340 × 374 ÷ 340 = 374 Hz. Now do yours.")
      ]);
    }),
    num("Diffraction gratings", [
      ["Many slits", "🌈", "A diffraction grating has thousands of slits. Bright lines appear where <b>d sinθ = mλ</b>, with m = 0, 1, 2… (the order) and d the slit spacing."],
      ["Spacing", "📏", "d (in nm) = 1 000 000 ÷ N when N is the number of lines per millimetre. Orders only exist while sinθ ≤ 1, so the highest order is the whole-number part of d ÷ λ."],
      ["Example", "🧮", "d = 2000 nm and λ = 500 nm: first order sinθ = 500 ÷ 2000 = 0.25. The highest order is 2000 ÷ 500 = 4."]
    ], () => {
      const [d, lam, m] = combo([[1000, 1500, 2000, 2500, 4000], [400, 500, 600, 800], [1, 2]], (d, l, m) => cl(m * l / d) && m * l / d < 1);
      const N = pick([[500, 2000], [1000, 1000], [250, 4000], [400, 2500], [200, 5000]]);
      const mm = pick([[2000, 500, 4], [1500, 500, 3], [2400, 600, 4], [1000, 400, 2], [3000, 500, 6], [1800, 600, 3]]);
      return pick([
        S(`A grating has slit spacing ${d} nm. Light of wavelength ${lam} nm is used. What is sin θ for the order m = ${m}?`, "🌈", m * lam / d,
          "Rearrange d sinθ = mλ.", "sinθ = m × λ ÷ d.", "Example: d = 2000 nm, λ = 600 nm, m = 2 gives sinθ = 1200 ÷ 2000 = 0.6. Now do yours."),
        S(`First-order light of wavelength ${lam} nm has sinθ = ${r2(lam / d)}. What is the slit spacing in nm?`, "📏", d,
          "Rearrange d sinθ = λ.", "d = λ ÷ sinθ.", "Example: λ = 600 nm and sinθ = 0.3 gives d = 600 ÷ 0.3 = 2000 nm. Now do yours."),
        S(`A grating has ${N[0]} lines per mm. What is the slit spacing in nm? (d = 1 000 000 ÷ N)`, "🧮", N[1],
          "A millimetre is a million nanometres.", "d = 1 000 000 ÷ N.", "Example: 2000 lines per mm gives d = 500 nm. Now do yours."),
        S(`A grating has spacing ${mm[0]} nm and is lit with ${mm[1]} nm light. What is the highest order visible? (Whole-number part of d ÷ λ.)`, "🔢", mm[2],
          "sinθ cannot exceed 1.", "Highest m = whole part of d ÷ λ.", "Example: d = 3800 nm and λ = 500 nm: 7.6, so the highest order is 7. Now do yours.")
      ]);
    })
  ];
  c.push(
    mix("Mixed practice", at(c, [0, 1, 3, 4, 5, 6, 7, 8, 9, 13, 14, 15, 16, 17])),
    mix("Level 24 Challenge", at(c, [0, 2, 3, 4, 6, 7, 8, 10, 11, 12, 13, 15, 16, 17]))
  );

  Object.assign(PHYSICS_LEVELS, { 22: a, 23: b, 24: c });
})();
