// ext/engineer-28-30.js  Engineering levels 28-30 (College year 1 second half, College year 2: core engineering sciences)
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
  // multiple choice with a hint pair for every item: item = [prompt, hint1, hint2, correct, wrong, wrong, ...]; ex = worked example (hint 3)
  const mcl = (title, slides, ex, items) => gen(title, slides, () => {
    const it = pick(items);
    return Q(it[0], undefined, it[3], [it[1], it[2], ex], it.slice(3));
  });

  // ================= LEVEL 28 =================
  const a = [
    gen("Second moment of area", [
      ["Stiffness of a shape", "📐", "The <b>second moment of area</b> I tells you how well a cross-section resists bending. For a rectangle of width b and depth h: <b>I = b·h³ ÷ 12</b>."],
      ["Depth is king", "🪵", "Depth is <b>cubed</b>, width is not. Doubling the depth makes I eight times bigger, but doubling the width only doubles it. That is why floor joists stand on their edge."],
      ["Units", "📏", "I is in length to the fourth power (cm⁴ or mm⁴). A square of side s has I = s⁴ ÷ 12."]
    ], () => {
      const b = 3 * ri(1, 4), h = 2 * ri(2, 5), s = pick([6, 12]), k = pick([2, 3]);
      return pick([
        Q(`A rectangular beam is ${b} cm wide and ${h} cm deep. What is I = b·h³/12 (in cm⁴)?`, "🪵", b * h ** 3 / 12, ["Cube the depth first.", "Multiply the cubed depth by the width, then divide by twelve.", "Example: 3 cm wide and 4 cm deep: 3·64/12 = 16 cm⁴. Now do yours."]),
        Q(`A beam's depth is multiplied by ${k} (the width stays the same). I becomes how many times bigger?`, "↕️", k ** 3, ["Depth is cubed in the formula.", "Cube the scale factor you were given.", "Example: depth times 4 gives 4·4·4 = 64 times more I. Now do yours."]),
        Q(`A square beam has sides of ${s} cm. What is I = s⁴/12 (cm⁴)?`, "⬛", s ** 4 / 12, ["For a square, b and h are the same number.", "Raise the side to the fourth power, then divide by twelve.", "Example: a 3 cm square: 81/12 = 6.75 cm⁴. Now do yours."]),
        Q(`A beam ${b} cm wide has I = ${b * h ** 3 / 12} cm⁴. How deep is it (cm)?`, "🔎", h, ["Rearrange I = b·h³/12 to get h³ on its own.", "h³ = 12·I ÷ b. Then find the cube root.", "Example: b = 3, I = 16: h³ = 192/3 = 64, so the cube root gives 4. Now do yours."]),
        Q("Two beams use the same wood. One is tall and thin, one is short and wide. Loaded from above, which resists bending better?", "🪵", "The tall, thin one", ["Think about which has more depth.", "Depth is cubed in I, so it beats width.", "Example: a plank on its edge is much stiffer than flat. Now do yours."], ["The tall, thin one", "The short, wide one", "They are exactly equal"])
      ]);
    }),
    gen("Bending stress: σ = M·c/I", [
      ["Stress from bending", "🌉", "A bent beam is squeezed on one side and stretched on the other. The bending stress is <b>σ = M·c ÷ I</b>, where M is the bending moment, c the distance from the neutral axis and I the second moment of area."],
      ["Where it is biggest", "📍", "The stress is <b>zero at the neutral axis</b> (the middle line) and <b>largest at the top and bottom surfaces</b>, where c is largest."],
      ["Units", "🔧", "With M in N·mm, c in mm and I in mm⁴, σ comes out in N/mm², which is the same as MPa."]
    ], () => {
      const sg = ri(2, 20), c = ri(1, 5) * 10, q = ri(1, 9) * 100, b = pick([6, 12]), h = ri(2, 6) * 5, s2 = ri(2, 10), s0 = ri(2, 12) * 10, m = pick([2, 3, 4]);
      return pick([
        Q(`A beam has M = ${sg * q} N·mm, c = ${c} mm and I = ${c * q} mm⁴. What is the bending stress (MPa)?`, "🌉", sg, ["Use σ = M·c/I.", "Multiply M by c first, then divide by I.", "Example: M = 600, c = 10, I = 300: 6000/300 = 20 MPa. Now do yours."]),
        Q(`A rectangle ${b} mm wide and ${h} mm deep carries M = ${s2 * h * h * b / 6} N·mm. For a rectangle σ = 6M/(b·h²). What is the surface stress (MPa)?`, "🪵", s2, ["Square the depth, then multiply by the width.", "Divide six times M by that number.", "Example: b = 6, h = 10, M = 500: 3000/600 = 5 MPa. Now do yours."]),
        Q(`A steel beam has I = ${c * q} mm⁴, c = ${c} mm and may carry up to ${sg} MPa. What is the largest moment M (N·mm)?`, "🔧", sg * q, ["Rearrange σ = M·c/I for M.", "M = σ·I ÷ c.", "Example: σ = 4, I = 3000, c = 10: M = 4·3000/10 = 1200 N·mm. Now do yours."]),
        Q(`A beam has surface stress ${s0} MPa. The bending moment is multiplied by ${m}. What is the new stress (MPa)?`, "✖️", s0 * m, ["Stress is directly proportional to M.", "Multiply the old stress by the same factor.", "Example: 50 MPa with M doubled gives 100 MPa. Now do yours."]),
        Q("What is the bending stress exactly at the neutral axis (MPa)?", "🎯", 0, ["At the neutral axis the distance c is a special value.", "The fibres there are neither stretched nor squeezed.", "Example: in a bent ruler the middle line keeps its length, so its stress is nothing. Now do yours."]),
        Q("Where is the bending stress largest in a loaded beam section?", "📍", "At the top and bottom surfaces", ["Think about where c is biggest.", "Look at the formula: stress grows with c.", "Example: the outer fibres of a bent ruler stretch or squash the most. Now do yours."], ["At the top and bottom surfaces", "At the neutral axis", "Equally everywhere"])
      ]);
    }),
    gen("Torsion of shafts", [
      ["Twisting a shaft", "🔩", "A shaft carrying torque T is twisted. The shear stress at radius r is <b>τ = T·r ÷ J</b>, where J is the polar second moment of area (a solid round shaft has J = πd⁴/32)."],
      ["Where it is biggest", "📍", "τ is <b>zero on the centre line</b> and <b>largest at the outer surface</b>. So hollow tubes make good drive shafts: the middle does little work and just adds weight."],
      ["Diameter matters a lot", "📏", "J grows with the diameter to the <b>fourth power</b>. A shaft twice as wide has J sixteen times larger."]
    ], () => {
      const tau = ri(2, 30), r = ri(1, 5) * 5, q = ri(1, 9) * 100, k = pick([2, 3]), L = pick([2, 3, 4]);
      return pick([
        Q(`A shaft has T = ${tau * q} N·mm, outer radius r = ${r} mm and J = ${r * q} mm⁴. What is the surface shear stress (MPa)?`, "🔩", tau, ["Use τ = T·r/J.", "Multiply T by r, then divide by J.", "Example: T = 800, r = 10, J = 4000: 8000/4000 = 2 MPa. Now do yours."]),
        Q(`A shaft with r = ${r} mm and J = ${r * q} mm⁴ may carry ${tau} MPa. What is the largest torque T (N·mm)?`, "🔩", tau * q, ["Rearrange τ = T·r/J for T.", "T = τ·J ÷ r.", "Example: τ = 3, J = 2000, r = 10: T = 3·2000/10 = 600. Now do yours."]),
        Q(`A shaft's diameter is multiplied by ${k}. J becomes how many times larger?`, "📏", k ** 4, ["J depends on the diameter raised to a power.", "Use that power on the scale factor.", "Example: diameter times 3 gives 3·3·3·3 = 81. Now do yours."]),
        Q(`A shaft of length 1 m twists by some angle. Another shaft is the same but ${L} m long, with the same torque. Its angle is how many times bigger?`, "📐", L, ["The angle of twist grows steadily along the length.", "Angle is directly proportional to length.", "Example: a shaft three times as long twists three times as much. Now do yours."]),
        Q("Why are many drive shafts hollow tubes?", "🛞", "The centre carries little stress, so removing it saves weight", ["Think about where the shear stress is largest.", "Stress is smallest at the middle.", "Example: bicycle frames use tubes for the same reason. Now do yours."], ["The centre carries little stress, so removing it saves weight", "Tubes are always stronger than solid bars of the same weight in every way", "Hollow shafts never twist"])
      ]);
    }),
    gen("Shear and bearing in bolts", [
      ["Average shear stress", "🔩", "A bolt holding two plates is being sheared. Average shear stress is <b>τ = F ÷ A</b>, using the cross-section area A of the bolt. If the bolt is cut in <b>two places</b> (double shear) the area counts twice."],
      ["Sharing the load", "🤝", "If n identical bolts share a load equally, each carries F ÷ n. So τ = F ÷ (n·A)."],
      ["Bearing stress", "🧱", "A bolt also presses on the edge of its hole. The <b>bearing stress</b> is <b>σ = F ÷ (d·t)</b>, using the bolt diameter d and the plate thickness t."]
    ], () => {
      const A = ri(1, 5) * 50, tau = ri(10, 60), n = ri(2, 6), d = ri(2, 5) * 2, t = ri(2, 8), sb = ri(20, 100);
      return pick([
        Q(`A single bolt of area ${A} mm² carries a shear load of ${tau * A} N in single shear. What is the shear stress (MPa)?`, "🔩", tau, ["Use τ = F/A.", "Divide the force by the bolt area.", "Example: 600 N on 100 mm²: 6 MPa. Now do yours."]),
        Q(`A bolt of area ${A} mm² is in double shear and carries ${2 * tau * A} N. What is the shear stress (MPa)?`, "🔩", tau, ["Double shear means two cut surfaces share the load.", "Use the area twice: divide F by two times A.", "Example: 800 N on 100 mm² in double shear: 800/200 = 4 MPa. Now do yours."]),
        Q(`${n} identical bolts of area ${A} mm² share a load of ${n * tau * A} N equally. What is the shear stress in each (MPa)?`, "🤝", tau, ["Find the load on one bolt first.", "Divide F by n, then by the area.", "Example: 3 bolts of area 50 mm² carry 450 N: 150 N each, 3 MPa. Now do yours."]),
        Q(`A ${d} mm bolt passes through a ${t} mm thick plate and carries ${sb * d * t} N. What is the bearing stress F/(d·t) (MPa)?`, "🧱", sb, ["Multiply the diameter by the thickness to get the bearing area.", "Divide the force by that area.", "Example: 6 mm bolt, 5 mm plate, 900 N: 900/30 = 30 MPa. Now do yours."]),
        Q(`A bolt of area ${A} mm² can take ${tau} MPa in shear (single shear). What is the greatest load F (N)?`, "⚖️", tau * A, ["Rearrange τ = F/A.", "F is the stress times the area.", "Example: 5 MPa on 40 mm² gives 200 N. Now do yours."])
      ]);
    }),
    gen("Pressure vessels", [
      ["Hoop stress", "🥫", "A thin-walled cylinder with internal pressure p, radius r and wall thickness t is pulled around its circumference. The <b>hoop stress</b> is <b>σ = p·r ÷ t</b>."],
      ["Along the length", "↔️", "The stress along the length (longitudinal) is only <b>half</b> as big: p·r ÷ (2t). So a pipe or soda can splits along its length first."],
      ["Choosing thickness", "🛢️", "Rearrange to find the wall thickness you need: t = p·r ÷ σ<sub>allowed</sub>. Higher pressure or a bigger radius needs a thicker wall."]
    ], () => {
      const t = pick([5, 10]), kk = ri(5, 20), p = ri(1, 10), r = t * kk;
      const p2 = 2 * ri(1, 5);
      return pick([
        Q(`A thin cylinder has p = ${p} MPa, r = ${r} mm and t = ${t} mm. What is the hoop stress p·r/t (MPa)?`, "🥫", p * kk, ["Use σ = p·r/t.", "Multiply p by r, then divide by t.", "Example: p = 2, r = 100, t = 10: 200/10 = 20 MPa. Now do yours."]),
        Q(`A thin cylinder has p = ${p2} MPa, r = ${r} mm and t = ${t} mm. What is the longitudinal stress p·r/(2t) (MPa)?`, "↔️", p2 * kk / 2, ["Work out the hoop stress first.", "The stress along the length is half of the hoop stress.", "Example: hoop stress 40 MPa means longitudinal 20 MPa. Now do yours."]),
        Q(`A tank must hold p = ${p} MPa with r = ${r} mm. The allowed stress is ${p * kk} MPa. What is the least wall thickness t (mm)?`, "🛢️", t, ["Rearrange σ = p·r/t to find t.", "t = p·r ÷ allowed stress.", "Example: p = 2, r = 100, allowed 40 MPa: t = 200/40 = 5 mm. Now do yours."]),
        Q(`The longitudinal stress in a thin pipe is ${p2 * 5} MPa. What is the hoop stress (MPa)?`, "🔁", p2 * 10, ["Compare hoop and longitudinal stresses.", "The hoop stress is a fixed multiple of the longitudinal one.", "Example: longitudinal 8 MPa means hoop 16 MPa. Now do yours."]),
        Q("A pressurised pipe splits along its length. Which stress caused it?", "🔧", "Hoop stress", ["Think about which stress is bigger.", "Compare the sizes: one of the two stresses is double the other.", "Example: a sausage skin splits lengthwise when it is overcooked. Now do yours."], ["Hoop stress", "Longitudinal stress", "Bearing stress"])
      ]);
    }),
    gen("Atwood machines", [
      ["Two masses on a pulley", "⚖️", "Two masses hang on a rope over a light, smooth pulley. The heavier one m₁ goes down, the lighter one m₂ goes up, both with the same acceleration."],
      ["The formulas", "🧮", "Net force = (m₁ − m₂)·g and the whole mass moves, so <b>a = (m₁ − m₂)·g ÷ (m₁ + m₂)</b>. The rope tension is <b>T = m₂·(g + a)</b>. Use g = 10 m/s²."],
      ["Check", "✅", "Equal masses give a = 0 and T = m·g. The tension is always between the two weights."]
    ], () => {
      const pr = pick([[3, 1, 5], [6, 4, 2], [9, 1, 8], [7, 3, 4], [8, 2, 6], [4, 1, 6], [3, 2, 2], [11, 9, 1]]);
      const [m1, m2, ac] = pr, T = m2 * (10 + ac), e = ri(2, 9);
      return pick([
        Q(`Masses of ${m1} kg and ${m2} kg hang over a smooth pulley (g = 10). What is the acceleration (m/s²)?`, "⚖️", ac, ["Use a = (m₁ − m₂)g ÷ (m₁ + m₂).", "Subtract the masses on top, add them on the bottom, then multiply the top by ten.", "Example: 5 kg and 3 kg: a = 2·10/8 = 2.5 m/s². Now do yours."]),
        Q(`Masses of ${m1} kg and ${m2} kg hang over a smooth pulley (g = 10). The acceleration is ${ac} m/s². What is the rope tension (N)?`, "🪢", T, ["Look at the lighter mass: it moves upward.", "T = m₂ × (g + a).", "Example: 2 kg lifted with a = 3 m/s²: T = 2·13 = 26 N. Now do yours."]),
        Q(`What is the net force that drives the system with masses ${m1} kg and ${m2} kg (N)? (g = 10)`, "💪", (m1 - m2) * 10, ["Only the difference in weight is unbalanced.", "Subtract the masses, then multiply by g.", "Example: 9 kg and 4 kg: 5·10 = 50 N. Now do yours."]),
        Q(`How much total mass does the net force have to accelerate with masses ${m1} kg and ${m2} kg (kg)?`, "🧱", m1 + m2, ["Both masses move together.", "Add them.", "Example: 5 kg and 7 kg move as 12 kg. Now do yours."]),
        Q(`Two equal masses of ${e} kg hang over a smooth pulley. What is the acceleration (m/s²)?`, "⚖️", 0, ["Compare the two weights.", "When both sides pull equally nothing speeds up.", "Example: two 4 kg masses stay balanced. Now do yours."])
      ]);
    }),
    gen("Work-energy theorem", [
      ["Work changes energy", "🔋", "The <b>work-energy theorem</b> says the net work on an object equals its change in kinetic energy: <b>F·d = ½mv₂² − ½mv₁²</b>."],
      ["Stopping a car", "🚗", "To stop, the brakes must remove all the kinetic energy: F·d = ½mv². Doubling the speed makes KE four times bigger, so the stopping distance is four times longer."],
      ["Starting from rest", "🏁", "Starting from rest, a force F over distance d gives KE = F·d. Then v = √(2·F·d ÷ m)."]
    ], () => {
      const m = ri(1, 4) * 500, v = pick([10, 20]), d = pick([5, 10, 20, 25, 50]), pr = pick([[4, 9, 6], [5, 5, 5], [2, 8, 4], [3, 12, 6], [10, 10, 10], [5, 20, 10], [8, 2, 4], [9, 4, 6]]), k = pick([2, 3]), mm = 2 * ri(1, 6), vv = ri(2, 9);
      return pick([
        Q(`A ${m} kg car at ${v} m/s is stopped by brakes over ${d} m. What braking force is needed (N)?`, "🚗", (m * v * v / 2) / d, ["Find the kinetic energy first, ½mv².", "All of it must be removed by F times d. Divide the energy by d.", "Example: 1000 kg at 10 m/s over 25 m: KE = 50000 J, F = 2000 N. Now do yours."]),
        Q(`A 2 kg cart starts from rest. A ${pr[0]} N force pushes it over ${pr[1]} m. What is its final speed (m/s)?`, "🛒", pr[2], ["Work done = F·d equals the kinetic energy gained.", "KE = ½·2·v² = v², so v² equals the work. Take the square root.", "Example: 7 N over 7 m is 49 J, so v² = 49 and v = 7 m/s. Now do yours."]),
        Q(`A car's speed is multiplied by ${k}. The stopping distance with the same braking force is multiplied by how much?`, "🛑", k * k, ["Kinetic energy depends on speed in a special way.", "Distance is proportional to KE, which goes with the square of speed.", "Example: speed times 5 means 25 times the distance. Now do yours."]),
        Q(`What is the kinetic energy of a ${mm} kg object moving at ${vv} m/s (J)?`, "⚡", mm * vv * vv / 2, ["Use KE = ½mv².", "Square the speed, multiply by the mass, then halve.", "Example: 4 kg at 3 m/s: ½·4·9 = 18 J. Now do yours."]),
        Q("The net work done on an object equals the change in its...", "🔋", "Kinetic energy", ["Think about which energy depends on speed.", "This is the work-energy theorem.", "Example: pushing a cart makes it faster, so its energy of motion rises. Now do yours."], ["Kinetic energy", "Mass", "Temperature"])
      ]);
    }),
    gen("Circular motion: centripetal force", [
      ["Going round a bend", "🏎️", "To move in a circle, something must pull or push towards the centre: the <b>centripetal force</b>. The acceleration is <b>a = v² ÷ r</b> and the force is <b>F = m·v² ÷ r</b>."],
      ["Where it comes from", "🛞", "For a car on a flat bend, friction provides it. The greatest friction is μ·m·g, so the top speed on the bend is <b>v = √(μ·g·r)</b>."],
      ["Speed matters most", "⚠️", "Double the speed and the force needed is four times bigger. A tighter bend (smaller r) needs more force too."]
    ], () => {
      const pr = pick([[6, 4, 9], [10, 5, 20], [8, 4, 16], [4, 2, 8], [12, 6, 24], [6, 3, 12], [9, 3, 27], [10, 4, 25], [5, 5, 5]]), m = ri(1, 6) * 10;
      const fr = pick([[0.4, 25, 10], [0.4, 9, 6], [0.4, 16, 8], [0.4, 36, 12], [0.5, 20, 10], [0.5, 5, 5], [0.5, 45, 15], [0.5, 80, 20]]), k = pick([2, 3]);
      return pick([
        Q(`A car drives at ${pr[0]} m/s round a bend of radius ${pr[1]} m. What is its acceleration towards the centre (m/s²)?`, "🏎️", pr[2], ["Use a = v²/r.", "Square the speed, then divide by the radius.", "Example: 6 m/s on a 12 m radius: 36/12 = 3 m/s². Now do yours."]),
        Q(`A ${m} kg cart moves at ${pr[0]} m/s round a circle of radius ${pr[1]} m. What centripetal force acts on it (N)?`, "🎠", m * pr[2], ["First find the acceleration v²/r.", "Multiply that acceleration by the mass.", "Example: 20 kg, a = 3 m/s²: F = 60 N. Now do yours."]),
        Q(`Friction coefficient μ = ${fr[0]} on a flat bend of radius ${fr[1]} m (g = 10). What is the greatest safe speed v = √(μ·g·r) (m/s)?`, "🛞", fr[2], ["Multiply μ, g and r first.", "Then take the square root of that product.", "Example: μ = 0.4, r = 100: 0.4·10·100 = 400, so v = 20 m/s. Now do yours."]),
        Q(`A car's speed round a bend is multiplied by ${k}. The centripetal force needed is multiplied by how much?`, "✖️", k * k, ["Force depends on v².", "Square the scale factor.", "Example: speed times 4 needs 16 times the force. Now do yours."]),
        Q("A ball swings round on a string. In which direction does the string pull the ball?", "🪀", "Towards the centre", ["The pull keeps the ball from flying straight off.", "It points at the middle of the circle.", "Example: a hammer thrower pulls inwards on the wire. Now do yours."], ["Towards the centre", "Away from the centre", "Along the direction of motion"])
      ]);
    }),
    gen("Horizontal projectiles", [
      ["Two motions at once", "🏹", "A ball rolling off a table moves sideways at constant speed and falls with gravity at the same time. The two motions are independent."],
      ["Falling", "⬇️", "Falling from rest (with g = 10): <b>h = 5t²</b> and vertical speed <b>v = 10t</b>. The time to fall does not depend on the sideways speed."],
      ["Sideways", "➡️", "Sideways distance = <b>speed × time</b>. Nothing speeds it up or slows it down (we ignore air)."]
    ], () => {
      const t = ri(1, 4), v = ri(2, 12);
      return pick([
        Q(`An object falls from rest for ${t} s (g = 10). How far does it fall, h = 5t² (m)?`, "⬇️", 5 * t * t, ["Square the time.", "Multiply the squared time by five.", "Example: 3 s gives 5·9 = 45 m. Now do yours."]),
        Q(`A ball rolls off a ${5 * t * t} m high cliff (g = 10). How long does it take to land, using h = 5t² (s)?`, "⏱️", t, ["Rearrange h = 5t² for t².", "Divide the height by five, then take the square root.", "Example: a 125 m drop: 125/5 = 25, so t = 5 s. Now do yours."]),
        Q(`A ball leaves a ${5 * t * t} m high table edge sideways at ${v} m/s (g = 10). How far from the base of the table does it land (m)?`, "🏹", v * t, ["Find the fall time first.", "Sideways distance = speed × fall time.", "Example: 20 m drop (2 s) at 6 m/s lands 12 m away. Now do yours."]),
        Q(`A ball falls for ${t} s (g = 10). What is its downward speed at the end (m/s)?`, "⬇️", 10 * t, ["Gravity adds speed steadily.", "v = g × t.", "Example: after 4 s, v = 40 m/s. Now do yours."]),
        Q(`A ball leaves a table sideways at ${v} m/s. Ignoring air, what is its sideways speed just before landing (m/s)?`, "➡️", v, ["Does anything push it sideways during the fall?", "With no sideways force, the sideways speed does not change.", "Example: a ball leaving at 5 m/s still goes sideways at 5 m/s when it lands. Now do yours."])
      ]);
    }),
    gen("Capacitors in series and parallel", [
      ["Parallel adds", "🔋", "Capacitors in <b>parallel</b> have more plate area, so their capacitances <b>add</b>: C = C₁ + C₂."],
      ["Series shrinks", "🔗", "In <b>series</b> the total is smaller: <b>C = C₁·C₂ ÷ (C₁ + C₂)</b>. Two equal capacitors in series give half of one. (This is the opposite of resistors!)"],
      ["Charge", "⚡", "Stored charge is <b>Q = C·V</b>. With C in µF and V in volts, Q is in µC."]
    ], () => {
      const pr = pick([[3, 6, 2], [4, 12, 3], [6, 12, 4], [2, 2, 1], [10, 10, 5], [20, 30, 12], [6, 3, 2], [15, 30, 10]]), V = ri(2, 12), c = 3 * ri(1, 6);
      return pick([
        Q(`Two capacitors of ${pr[0]} µF and ${pr[1]} µF are in parallel. What is the total (µF)?`, "🔋", pr[0] + pr[1], ["In parallel the plate areas combine.", "Just add the two values.", "Example: 2 µF and 7 µF in parallel give 9 µF. Now do yours."]),
        Q(`Two capacitors of ${pr[0]} µF and ${pr[1]} µF are in series. What is the total (µF)?`, "🔗", pr[2], ["Use product over sum.", "Multiply the two values, then divide by their sum.", "Example: 4 µF and 4 µF: 16/8 = 2 µF. Now do yours."]),
        Q(`Three equal capacitors of ${c} µF are in series. What is the total (µF)?`, "🔗", c / 3, ["Series capacitors share the voltage.", "Equal capacitors in series: divide one value by how many there are.", "Example: three 12 µF in series give 4 µF. Now do yours."]),
        Q(`A ${pr[2]} µF capacitor is charged to ${V} V. How much charge does it hold (µC)?`, "⚡", pr[2] * V, ["Use Q = C·V.", "Multiply capacitance by voltage.", "Example: 5 µF at 3 V stores 15 µC. Now do yours."]),
        Q("Which way of joining two capacitors gives the larger total capacitance?", "🔋", "In parallel", ["Compare adding with product over sum.", "Series always gives less than the smaller one alone.", "Example: 2 µF and 2 µF give 4 µF one way and 1 µF the other. Now do yours."], ["In parallel", "In series", "They are always equal"])
      ]);
    }),
    gen("Energy in capacitors and inductors", [
      ["Capacitor energy", "🔋", "A capacitor stores energy in its electric field: <b>E = ½·C·V²</b>. With C in µF and V in volts, E is in µJ."],
      ["Inductor energy", "🧲", "An inductor stores energy in its magnetic field: <b>E = ½·L·I²</b>. With L in mH and I in amps, E is in mJ."],
      ["Squares!", "✖️", "Both depend on a square. Doubling the voltage (or current) makes the stored energy four times bigger."]
    ], () => {
      const C = 2 * ri(1, 5), V = ri(2, 10), L = 2 * ri(1, 6), I = ri(1, 6), k = pick([2, 3]), E = ri(2, 9) * 10;
      return pick([
        Q(`A ${C} µF capacitor is charged to ${V} V. How much energy does it store (µJ)?`, "🔋", C * V * V / 2, ["Use E = ½CV².", "Square the voltage, multiply by C, then halve.", "Example: 4 µF at 5 V: ½·4·25 = 50 µJ. Now do yours."]),
        Q(`A ${L} mH inductor carries ${I} A. How much energy does it store (mJ)?`, "🧲", L * I * I / 2, ["Use E = ½LI².", "Square the current, multiply by L, then halve.", "Example: 6 mH at 3 A: ½·6·9 = 27 mJ. Now do yours."]),
        Q(`A capacitor is charged to ${E} µJ. Its voltage is then multiplied by ${k}. What energy does it store now (µJ)?`, "✖️", E * k * k, ["Energy depends on the voltage squared.", "Multiply the old energy by the square of the factor.", "Example: 10 µJ with voltage times 4 becomes 160 µJ. Now do yours."]),
        Q(`An inductor stores ${E} mJ. The current is multiplied by ${k}. What energy is stored now (mJ)?`, "🧲", E * k * k, ["Inductor energy depends on current squared.", "Square the factor and multiply.", "Example: 20 mJ with current times 3 becomes 180 mJ. Now do yours."]),
        Q("In what kind of field does an inductor store its energy?", "🧲", "A magnetic field", ["Inductors are coils of wire.", "A current in a coil makes this kind of field.", "Example: a capacitor uses an electric field between its plates. Now do yours."], ["A magnetic field", "An electric field between plates", "A gravitational field"])
      ]);
    }),
    gen("Superposition in circuits", [
      ["Add the effects", "➕", "In a <b>linear</b> circuit with several sources, you can find the effect of each source <b>alone</b> and then add the results. This is the <b>superposition</b> principle."],
      ["Switching a source off", "🔌", "To turn a voltage source off, replace it with a <b>wire</b> (short circuit). To turn a current source off, replace it with an <b>open gap</b>."],
      ["Direction counts", "↔️", "Add the currents that point the same way and subtract the ones that point opposite ways."]
    ], () => {
      const R = ri(2, 8), I1 = ri(2, 6), I2 = ri(1, I1 - 1), I3 = ri(1, 6);
      const lo = Math.min(I1, I2) , hi = Math.max(I1, I2);
      return pick([
        Q(`Source 1 alone drives ${I1} A through a resistor. Source 2 alone drives ${I3} A the same way. What current flows with both on (A)?`, "➕", I1 + I3, ["The currents help each other.", "Add the two currents.", "Example: 3 A and 2 A in the same direction give 5 A. Now do yours."]),
        Q(`Source 1 alone drives ${I1} A through a resistor. Source 2 alone drives ${I2} A the opposite way. What current flows with both on (A)?`, "↔️", I1 - I2, ["The two currents oppose each other.", "Subtract the smaller from the larger.", "Example: 6 A one way and 2 A the other leaves 4 A. Now do yours."]),
        Q(`Two batteries of ${R * I1} V and ${R * I3} V in series with a ${R} Ω resistor help each other. What current flows (A)?`, "🔋", I1 + I3, ["Superposition: find the current from each battery alone.", "Each battery alone gives V ÷ R. Add them.", "Example: 12 V and 6 V with 3 Ω: 4 A + 2 A = 6 A. Now do yours."]),
        Q(`To switch a voltage source off in superposition, what do you replace it with?`, "🔌", "A wire (short circuit)", ["An ideal voltage source has zero voltage when switched off.", "A zero-voltage connection is just a plain conductor.", "Example: removing a battery and joining its two connection points closes the gap. Now do yours."], ["A wire (short circuit)", "An open gap", "A resistor of 1 kΩ"]),
        Q(`To switch a current source off in superposition, what do you replace it with?`, "🔌", "An open gap", ["An ideal current source has zero current when it is off.", "Zero current means no path for current at all.", "Example: removing a current source leaves a break in the wire. Now do yours."], ["An open gap", "A wire (short circuit)", "A battery"])
      ]);
    }),
    gen("RC low-pass filters", [
      ["Letting slow signals through", "🎚️", "A resistor in series followed by a capacitor to ground makes a <b>low-pass filter</b>. Slow (low-frequency) signals pass; fast ones are weakened."],
      ["Cutoff", "✂️", "The cutoff is at <b>ω<sub>c</sub> = 1 ÷ (R·C)</b> in radians per second. The time constant is τ = R·C. With R in kΩ and C in µF, R·C is in milliseconds, so ω<sub>c</sub> = 1000 ÷ (R·C)."],
      ["Using it", "🎧", "Low-pass filters remove hiss and rapid noise from sensor signals, and smooth the output of power supplies."]
    ], () => {
      const pr = pick([[2, 5, 100], [5, 5, 40], [10, 10, 10], [1, 4, 250], [2, 10, 50], [4, 5, 50], [5, 10, 20], [1, 8, 125], [10, 20, 5]]);
      return pick([
        Q(`An RC filter uses R = ${pr[0]} kΩ and C = ${pr[1]} µF. What is its time constant R·C (ms)?`, "⏱️", pr[0] * pr[1], ["kΩ times µF gives milliseconds.", "Multiply the two numbers.", "Example: 3 kΩ and 4 µF: 12 ms. Now do yours."]),
        Q(`An RC filter uses R = ${pr[0]} kΩ and C = ${pr[1]} µF. What is the cutoff ω<sub>c</sub> = 1000/(R·C) (rad/s)?`, "✂️", pr[2], ["Find R·C first.", "Divide one thousand by that product.", "Example: R·C = 20 gives 1000/20 = 50 rad/s. Now do yours."]),
        Q("A low-pass filter mostly lets through...", "🎚️", "Slow signals", ["Think about the name: low pass.", "Fast signals are the ones weakened.", "Example: a bass speaker filter keeps slow vibrations. Now do yours."], ["Slow signals", "Fast signals", "Only signals of exactly zero size"]),
        Q("To lower the cutoff of an RC low-pass filter you can...", "🔧", "Make C bigger", ["Look at ω = 1/(R·C).", "A bigger product makes ω smaller.", "Example: doubling C halves the cutoff. Now do yours."], ["Make C bigger", "Make C smaller", "Remove the resistor"]),
        Q(`An RC filter has R·C = ${pr[0] * pr[1]} ms. If R is doubled, R·C becomes what (ms)?`, "✖️", 2 * pr[0] * pr[1], ["R·C grows with R.", "Multiply by the same factor.", "Example: 10 ms with R tripled becomes 30 ms. Now do yours."])
      ]);
    }),
    gen("Diodes and rectifiers", [
      ["A one-way valve", "➡️", "A <b>diode</b> lets current flow one way only. A silicon diode drops about <b>0.7 V</b> when it conducts."],
      ["Half-wave", "〰️", "One diode in series with an AC supply passes only the positive half of each cycle. The output peak is about V<sub>peak</sub> − 0.7 V and it has the <b>same frequency</b> as the supply."],
      ["Full-wave", "🔁", "A bridge of four diodes flips the negative halves upward. The output pulses at <b>double</b> the supply frequency, which is easier to smooth with a capacitor."]
    ], () => {
      const V = ri(5, 20), f = pick([50, 60]), R = ri(2, 9), I = ri(2, 9);
      return pick([
        Q(`A half-wave rectifier has a ${V} V peak AC input and a silicon diode (0.7 V drop). What is the output peak (V)?`, "➡️", rd(V - 0.7), ["The diode uses up a small voltage when it conducts.", "Subtract the diode drop from the peak.", "Example: a 10 V peak gives 9.3 V. Now do yours."]),
        Q(`A half-wave rectifier runs from ${f} Hz mains. How many output pulses per second?`, "〰️", f, ["Half-wave keeps one pulse per cycle.", "One pulse per cycle means the same count as the supply frequency.", "Example: a 40 Hz supply gives 40 pulses. Now do yours."]),
        Q(`A full-wave bridge rectifier runs from ${f} Hz mains. How many output pulses per second?`, "🔁", 2 * f, ["Both halves of each cycle make a pulse.", "Pulses per second are doubled.", "Example: a 40 Hz supply gives 80 pulses. Now do yours."]),
        Q(`An ideal diode in series with a ${R} Ω resistor conducts with ${R * I} V across the resistor. What current flows (A)?`, "⚡", I, ["Use Ohm's law on the resistor.", "Divide the voltage by the resistance.", "Example: 12 V across 4 Ω gives 3 A. Now do yours."]),
        Q("A diode lets current flow...", "➡️", "In one direction only", ["Think of a one-way valve.", "Reversing the battery stops the current.", "Example: an LED lights one way round only. Now do yours."], ["In one direction only", "Equally in both directions", "Only when it is cold"])
      ]);
    }),
    gen("Bernoulli's equation", [
      ["Speed and pressure trade", "💧", "For smooth flow of a fluid along a level pipe, <b>P + ½ρv²</b> stays constant. Where the fluid moves faster, the pressure is lower."],
      ["Numbers for water", "🔢", "Water has ρ = 1000 kg/m³, so ½ρ = 500. The pressure drop between a slow part (v₁) and a fast part (v₂) is <b>ΔP = 500·(v₂² − v₁²)</b> in pascals, or 0.5·(v₂² − v₁²) in kPa."],
      ["Drain speed", "🚰", "Water leaving a hole a depth h below the surface comes out at <b>v = √(2g·h)</b> = √(20h) with g = 10."]
    ], () => {
      const v1 = pick([2, 4]), v2 = pick([6, 8, 10]), r = pick([2, 4]), h = pick([5, 20, 45, 80]);
      const hv = { 5: 10, 20: 20, 45: 30, 80: 40 };
      return pick([
        Q(`Water in a level pipe speeds up from ${v1} m/s to ${v2} m/s. By how much does the pressure fall (kPa)? Use ΔP = 0.5·(v₂² − v₁²).`, "💧", 0.5 * (v2 * v2 - v1 * v1), ["Square both speeds.", "Subtract the squares, then halve the difference.", "Example: 2 m/s to 6 m/s: 0.5·(36 − 4) = 16 kPa. Now do yours."]),
        Q(`Water at ${v1} m/s flows into a section whose area is ${r} times smaller. What is the new speed (m/s)?`, "🧯", v1 * r, ["Water must pass the same volume per second.", "A smaller area means a proportionally higher speed.", "Example: 3 m/s into an area 5 times smaller gives 15 m/s. Now do yours."]),
        Q(`Water at ${v1} m/s flows into a section with ${r} times smaller area. By how much does the pressure fall (kPa)? (ΔP = 0.5·(v₂² − v₁²))`, "💧", 0.5 * ((v1 * r) ** 2 - v1 * v1), ["Find the new speed first using the area ratio.", "Then use the Bernoulli pressure drop with both speeds.", "Example: 2 m/s into area 3 times smaller: v₂ = 6, ΔP = 0.5·(36 − 4) = 16 kPa. Now do yours."]),
        Q(`A hole is ${h} m below the surface of a tank. How fast does water leave, v = √(20h) (m/s)?`, "🚰", hv[h], ["Multiply the depth by twenty.", "Take the square root.", "Example: depth 125 m: 20·125 = 2500, so v = 50 m/s. Now do yours."]),
        Q("Where a pipe narrows and the water speeds up, the pressure...", "💧", "Falls", ["Bernoulli: P + ½ρv² stays constant.", "If one term rises, the other must do the opposite.", "Example: air speeding over a wing has lower pressure. Now do yours."], ["Falls", "Rises", "Stays the same no matter what"])
      ]);
    }),
    gen("Pump power", [
      ["Lifting water", "⛲", "The useful power a pump gives the water is <b>P = ρ·g·Q·H</b>. For water, with Q in litres per second and head H in metres, that is about <b>P = 10·Q·H</b> watts."],
      ["Real pumps lose energy", "🔧", "A pump's <b>efficiency η</b> is useful power ÷ electrical power. Electrical input = hydraulic power ÷ η."],
      ["Head", "📏", "Head H is the height the water is lifted (plus any pressure it must overcome, written as an equivalent height)."]
    ], () => {
      const Q1 = ri(2, 12), H = ri(2, 10) * 5, eta = pick([50, 80, 40, 25]), k = pick([2, 3]);
      const P = 10 * Q1 * H;
      return pick([
        Q(`A pump lifts ${Q1} litres per second through a head of ${H} m. What is the hydraulic power P = 10·Q·H (W)?`, "⛲", P, ["Use the rule P = 10·Q·H.", "Multiply the flow, the head and ten.", "Example: 4 L/s and 5 m: 10·4·5 = 200 W. Now do yours."]),
        Q(`A pump gives the water ${P} W and has efficiency ${eta}%. What electrical power does it need (W)?`, "🔌", P * 100 / eta, ["Input must be bigger than output.", "Divide the useful power by the efficiency as a fraction.", "Example: 300 W useful at 50% needs 600 W. Now do yours."]),
        Q(`A pump gives ${P} W of hydraulic power while lifting ${Q1} L/s. What is the head (m)?`, "📏", H, ["Rearrange P = 10·Q·H.", "H = P ÷ (10·Q).", "Example: 600 W at 3 L/s: H = 600/30 = 20 m. Now do yours."]),
        Q(`A pump gives ${P} W lifting water through ${H} m. What is the flow Q (litres per second)?`, "💧", Q1, ["Rearrange P = 10·Q·H.", "Q = P ÷ (10·H).", "Example: 800 W through 10 m: Q = 8 L/s. Now do yours."]),
        Q(`A pump's flow stays the same but the head is multiplied by ${k}. The hydraulic power is multiplied by how much?`, "✖️", k, ["Power is proportional to head.", "Multiply by the same factor.", "Example: head times 4 means 4 times the power. Now do yours."])
      ]);
    }),
    gen("Present value", [
      ["Money changes with time", "⏳", "Money now is worth more than the same money later, because it could be invested. <b>Future value = Present value × (1 + r)ⁿ</b> for interest rate r over n years."],
      ["Going backwards", "↩️", "To find what future money is worth today, divide: <b>PV = FV ÷ (1 + r)ⁿ</b>. This is called <b>discounting</b>."],
      ["Why engineers care", "🏗️", "A project that pays back in ten years must be compared fairly with one that pays now. Discounting puts all cash on the same day."]
    ], () => {
      const base = ri(1, 9) * 100, r = pick([10, 20]), n = pick([1, 2]), f = 1 + r / 100;
      const FV = Math.round(base * f ** n);
      return pick([
        Q(`At ${r}% a year, what is $${FV} received in ${n} year${n > 1 ? "s" : ""} worth today ($)?`, "⏳", base, ["Divide, because the money arrives later.", `Divide by (1 + ${r / 100}) once for each year.`, "Example: $110 in 1 year at 10%: 110/1.1 = $100. Now do yours."]),
        Q(`$${base} is invested at ${r}% a year. What is it worth after ${n} year${n > 1 ? "s" : ""} ($)?`, "📈", FV, ["Multiply, because the money grows.", `Multiply by (1 + ${r / 100}) once for each year.`, "Example: $200 at 10% for 1 year: $220. Now do yours."]),
        Q("Which is worth more today: $100 now, or $100 in a year?", "💰", "$100 now", ["Think about what you could do with money now.", "Money now can earn interest.", "Example: $100 in a bank grows, so money later is worth less today. Now do yours."], ["$100 now", "$100 in a year", "They are always equal"]),
        Q("A higher interest rate makes the present value of future money...", "📉", "Smaller", ["PV = FV ÷ (1 + r)ⁿ.", "A bigger r makes the divider bigger.", "Example: dividing by 1.5 gives less than dividing by 1.1. Now do yours."], ["Smaller", "Larger", "The same"])
      ]);
    }),
    mcl("Conflicts of interest", [
      ["What is a conflict?", "⚖️", "A <b>conflict of interest</b> is when your personal gain could affect, or seem to affect, your professional judgement. Examples: choosing a supplier owned by your brother, or accepting expensive gifts from a bidder."],
      ["What to do", "🙋", "Engineers must <b>disclose</b> the conflict to their employer or client, and often step away from the decision. Hiding it is the real mistake."],
      ["Appearance counts", "👀", "Even if you would be fair, the appearance of bias harms trust. Written rules and open reporting protect everyone."]
    ], "Example: you own shares in a company that bids for your project. Tell your manager and let someone else choose. Now try yours.", [
      ["You own a company that bids for a contract your team is judging. You should...", "Think about being fair and open.", "Telling others protects the decision.", "Tell your manager and step away from judging", "Quietly give your company the best score", "Say nothing if you are sure you'd be fair", "Ask a friend to pick for you without telling anyone"],
      ["A supplier offers you an expensive holiday during a tender. The best response is to...", "Would a gift affect how the choice looks?", "Look for the honest, open choice.", "Politely decline and report the offer", "Accept it and say nothing", "Accept it if the price is still fair", "Keep it secret from your manager"],
      ["What does 'disclose' a conflict mean?", "Think of the opposite of hiding.", "It means telling the people who need to know.", "Tell the right people about it openly", "Hide it carefully", "Delete the evidence", "Sell it"],
      ["Your cousin's firm is the cheapest bidder. Which is the best step?", "Be open about the family link.", "Let the process stay fair and visible.", "Declare the link and let others review the bids", "Choose them quickly so nobody notices", "Reject them to look fair, with no reason", "Hide the family link"],
      ["A conflict of interest can exist even if you would act fairly. Why does it still matter?", "Think about what others can see.", "Trust depends on how things look as well as how they are.", "Others may doubt the decision's fairness", "It never matters if you are honest", "Only the law matters", "Only large companies care"],
      ["Which is a conflict of interest?", "Look for personal gain affecting a work decision.", "Check if you would benefit from the choice.", "Picking a supplier you own part of", "Picking the cheapest supplier by clear rules", "Asking a manager for advice", "Writing down your design choices"],
      ["Reviewers of an engineering report should not be...", "Think about who should judge fairly.", "The reviewer must be independent.", "The author's close business partner", "Experts in the topic", "Trained in standards", "Paid by their own employer"],
      ["After you disclose a conflict, the best next step is usually to...", "Disclosing is the beginning, not the end.", "Others need to be able to decide without your influence.", "Let someone without the conflict decide", "Make the decision yourself anyway", "Delete the report", "Change jobs immediately"]
    ])
  ];
  a[18] = mix("Mixed practice", at(a, [0, 1, 2, 4, 5, 7, 9, 11, 13, 14, 15, 16]));
  a[19] = mix("Level 28 Challenge", at(a, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));

  // ================= LEVEL 29 =================
  const b = [
    gen("Thermal stress", [
      ["Growing with heat", "🌡️", "A bar that is free to expand grows by <b>ΔL = α·L·ΔT</b>, where α is the expansion coefficient. For steel α is about 12 millionths per °C."],
      ["Held in place", "🧱", "If the ends are fixed so the bar cannot grow, it is squeezed instead. The stress is <b>σ = E·α·ΔT</b>. Rails, pipes and bridge decks use <b>expansion joints</b> to avoid this."],
      ["Numbers", "🔢", "With E in GPa and α in millionths per °C (µ/°C), σ in MPa equals E·α·ΔT ÷ 1000."]
    ], () => {
      const pr = pick([[200, 12], [70, 24], [100, 10], [100, 20], [200, 10], [100, 15]]), dT = ri(1, 4) * 50;
      const al = pick([12, 24, 20, 16]), L = 5 * ri(1, 6), k = pick([2, 3]);
      return pick([
        Q(`A fixed steel-like bar has E = ${pr[0]} GPa and α = ${pr[1]} µ/°C. It is heated by ${dT} °C. What stress builds up, σ = E·α·ΔT/1000 (MPa)?`, "🌡️", pr[0] * pr[1] * dT / 1000, ["Multiply E, α and ΔT together.", "Then divide by one thousand to get MPa.", "Example: E = 100, α = 10, ΔT = 50: 50000/1000 = 50 MPa. Now do yours."]),
        Q(`A free bar ${L} m long has α = ${al} µ/°C and is heated by ${dT} °C. How much longer does it get, ΔL = α·L·ΔT/1000 (mm)?`, "📏", al * L * dT / 1000, ["Multiply α, the length in metres and ΔT.", "Divide by one thousand to get millimetres.", "Example: α = 10, L = 20 m, ΔT = 50: 10000/1000 = 10 mm. Now do yours."]),
        Q(`A fixed bar has a thermal stress of ${pr[0] * pr[1] * dT / 1000} MPa. The temperature rise is multiplied by ${k}. What is the new stress (MPa)?`, "✖️", k * pr[0] * pr[1] * dT / 1000, ["Stress is directly proportional to ΔT.", "Multiply by the same factor.", "Example: 30 MPa with the rise doubled gives 60 MPa. Now do yours."]),
        Q("Why do long steel bridges have expansion joints?", "🌉", "So heat growth does not build up huge stress", ["Think about what happens to steel on a hot day.", "If it cannot grow freely, something else happens inside it.", "Example: railway tracks are laid with small gaps for the same reason. Now do yours."], ["So heat growth does not build up huge stress", "So the bridge can be taken apart for the winter", "To make the road bumpy and slow the cars"]),
        Q("A fixed bar is cooled instead of heated. The bar tries to shrink, so the stress is...", "❄️", "Tension (pulling)", ["A bar that tries to shrink but is held at the ends is stretched instead.", "Think of it as being pulled by the walls.", "Example: a shrinking wire between two posts gets tighter. Now do yours."], ["Tension (pulling)", "Compression (squeezing)", "Zero"])
      ]);
    }),
    gen("Euler buckling", [
      ["Slender columns bow", "📏", "A long thin column under compression can suddenly bow sideways, called <b>buckling</b>, long before the material crushes. The <b>Euler load</b> is <b>P<sub>cr</sub> = π²·E·I ÷ (K·L)²</b>."],
      ["Length is powerful", "📉", "P<sub>cr</sub> goes with <b>1 ÷ L²</b>. A column twice as long can only carry one quarter of the load. The effective length factor K depends on the ends: pinned-pinned K = 1, fixed-free K = 2, fixed-fixed K = 0.5."],
      ["Slenderness", "📐", "The <b>slenderness ratio</b> is L ÷ r, where r = √(I ÷ A) is the radius of gyration. A big ratio means buckling is likely."]
    ], () => {
      const k = pick([2, 3]), j = ri(2, 20) * 5, r = ri(2, 10) * 5, ratio = ri(20, 120);
      const ends = pick([["fixed at the bottom and free at the top", "smaller", 4], ["fixed at both ends", "larger", 4]]);
      return pick([
        Q(`A column's length is multiplied by ${k} (same section, same ends). Its Euler load is divided by what number?`, "📉", k * k, ["P<sub>cr</sub> depends on the length squared.", "Square the length factor.", "Example: length times 5 divides the load by 25. Now do yours."]),
        Q(`A pinned column ${k * 2} m long has an Euler load of ${j * k * k} kN. The same column made ${k * 2 * k} m long would have what Euler load (kN)?`, "🏛️", j, ["The length grows by a factor. The load changes by the inverse of its square.", "Divide the load by the length factor squared.", "Example: 3 m column at 400 kN becomes 6 m: 100 kN. Now do yours."]),
        Q(`A column is ${ends[0]}. Its Euler load is how many times ${ends[1]} than the same pinned-pinned column? (K = ${ends[2] === 4 && ends[1] === "smaller" ? 2 : 0.5})`, "🔩", 4, ["P<sub>cr</sub> goes with 1 ÷ (K·L)².", "Square the factor K and compare with pinned-pinned (K = 1).", "Example: K = 3 would divide the load by nine. Now do yours."]),
        Q(`A column is ${r * ratio} mm long and its radius of gyration is ${r} mm. What is its slenderness ratio L/r?`, "📐", ratio, ["Divide length by radius of gyration.", "Both are in millimetres, so the ratio has no unit.", "Example: 1200 mm and r = 20 mm gives 60. Now do yours."]),
        Q("Buckling is a failure mode in which a slender column...", "📏", "Bows sideways under compression", ["Think about what a thin ruler does when you push on its ends.", "It happens suddenly, even though the material is not crushed.", "Example: a plastic ruler pushed end to end suddenly bends. Now do yours."], ["Bows sideways under compression", "Snaps in tension", "Melts from heat"])
      ]);
    }),
    gen("Principal stresses and Mohr's circle", [
      ["Stress at a point", "⭕", "At a point we can have normal stresses σx and σy and a shear stress τ. Turning your viewpoint changes the numbers. The biggest and smallest normal stresses are the <b>principal stresses</b>."],
      ["The formula", "🧮", "Centre of the circle: <b>C = (σx + σy) ÷ 2</b>. Radius: <b>R = √(((σx − σy) ÷ 2)² + τ²)</b>. Then σ₁ = C + R and σ₂ = C − R."],
      ["Shear", "✂️", "The largest shear stress is <b>τmax = R</b>. On the principal planes the shear stress is zero."]
    ], () => {
      const t = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10], [12, 5, 13], [9, 12, 15], [15, 8, 17]]), C = t[2] + ri(0, 15);
      const sx = C + t[0], sy = C - t[0];
      return pick([
        Q(`σx = ${sx} MPa, σy = ${sy} MPa and τ = ${t[1]} MPa. What is the Mohr's circle radius R (MPa)?`, "⭕", t[2], ["Find half the difference of σx and σy first.", "Square it, add τ squared, then take the square root.", "Example: half difference 9 and τ = 12: √(81 + 144) = 15. Now do yours."]),
        Q(`σx = ${sx} MPa, σy = ${sy} MPa and τ = ${t[1]} MPa. What is the largest principal stress σ₁ (MPa)?`, "⬆️", C + t[2], ["Find the circle centre and radius.", "σ₁ is the centre plus the radius.", "Example: centre 40 and R = 15 gives 55 MPa. Now do yours."]),
        Q(`σx = ${sx} MPa, σy = ${sy} MPa and τ = ${t[1]} MPa. What is the smaller principal stress σ₂ (MPa)?`, "⬇️", C - t[2], ["Find the circle centre and radius.", "σ₂ is the centre minus the radius.", "Example: centre 40 and R = 15 gives 25 MPa. Now do yours."]),
        Q(`σx = ${sx} MPa, σy = ${sy} MPa and τ = ${t[1]} MPa. What is the largest shear stress τmax (MPa)?`, "✂️", t[2], ["The largest shear equals a measure of the circle's size.", "τmax equals R.", "Example: a circle with R = 13 has τmax = 13 MPa. Now do yours."]),
        Q("What is the shear stress on a principal plane (MPa)?", "🎯", 0, ["Principal planes are special orientations.", "They have the largest and smallest normal stresses and no sliding stress.", "Example: at the top and bottom of the circle the shear is large; at the left and right ends it is nothing. Now do yours."])
      ]);
    }),
    gen("Stress concentrations and fatigue", [
      ["Stress raisers", "🕳️", "A hole, notch or sharp corner makes the local stress higher than average: <b>σmax = Kt × σnominal</b>. A small circular hole in a wide plate in tension has Kt ≈ 3."],
      ["Cycles", "🔁", "Repeated loading can crack a part at stresses well below its strength. This is <b>fatigue</b>. Cracks start at stress raisers and grow a little each cycle until the part fails."],
      ["S-N curves", "📉", "An <b>S-N curve</b> shows how many cycles N a part survives at stress S. For steel, below the <b>endurance limit</b> it can last almost forever. <b>Miner's rule</b>: life used = n ÷ N for each level, added up."]
    ], () => {
      const s = ri(10, 100), rpm = pick([600, 1200, 1800, 3000]), hrs = ri(1, 4), N = pick([50000, 100000, 200000]), p = ri(1, 9) * 10;
      return pick([
        Q(`A plate with a small circular hole (Kt = 3) has a nominal stress of ${s} MPa. What is the peak stress at the hole (MPa)?`, "🕳️", 3 * s, ["Multiply the nominal stress by Kt.", "Kt is given in the question.", "Example: nominal 20 MPa with Kt = 2.5 gives 50 MPa. Now do yours."]),
        Q(`A shaft turns at ${rpm} rpm for ${hrs} hour${hrs > 1 ? "s" : ""}. How many load cycles (turns) is that?`, "🔁", rpm * 60 * hrs, ["Turns per minute times minutes.", "There are 60 minutes in an hour.", "Example: 500 rpm for 2 hours is 500·60·2 = 60000 cycles. Now do yours."]),
        Q(`A part fails after ${N} cycles at one stress level. It has had ${N * p / 100} cycles. What percent of its life is used (n/N × 100)?`, "📊", p, ["Divide the cycles used by the cycles to failure.", "Turn the fraction into a percent.", "Example: 20000 of 80000 is 25 percent. Now do yours."]),
        Q("How can you reduce the stress concentration at an inside corner?", "🔧", "Use a larger rounded fillet", ["Sharp corners concentrate stress.", "Smooth, gentle curves spread it out.", "Example: rounded corners on a picture frame hold up better than sharp ones. Now do yours."], ["Use a larger rounded fillet", "Make the corner as sharp as possible", "Scratch the surface"]),
        Q("Fatigue cracks usually start...", "🔍", "At the surface or a stress raiser", ["Think about where stress is highest and where scratches live.", "Cracks need a weak spot to begin.", "Example: a paperclip bent back and forth cracks at its outer bend first. Now do yours."], ["At the surface or a stress raiser", "In the exact centre, far from any flaw", "Only on the day the part is made"])
      ]);
    }),
    gen("Torque and angular acceleration", [
      ["Spinning version of F = ma", "🌀", "<b>τ = I·α</b>: torque equals moment of inertia times angular acceleration. Big I means hard to speed up."],
      ["Moment of inertia of a disk", "💿", "A solid disk of mass m and radius r has <b>I = ½·m·r²</b>. Mass far from the centre makes I bigger."],
      ["Then motion", "⏱️", "Starting from rest, ω = α·t. The energy is <b>½·I·ω²</b>."]
    ], () => {
      const m = 2 * ri(1, 10), r = ri(1, 4), al = ri(1, 6), t = ri(2, 8), I = (m / 2) * r * r, w = 2 * ri(1, 5);
      return pick([
        Q(`A solid disk has mass ${m} kg and radius ${r} m. What is I = ½mr² (kg·m²)?`, "💿", I, ["Square the radius first.", "Multiply by the mass and halve.", "Example: 6 kg, r = 2 m: ½·6·4 = 12. Now do yours."]),
        Q(`A flywheel with I = ${I} kg·m² must accelerate at ${al} rad/s². What torque is needed (N·m)?`, "🌀", I * al, ["Use τ = I·α.", "Multiply I by α.", "Example: I = 5 and α = 3: τ = 15 N·m. Now do yours."]),
        Q(`A torque of ${I * al} N·m acts on a flywheel with I = ${I} kg·m². What is α (rad/s²)?`, "🌀", al, ["Rearrange τ = I·α.", "α = τ ÷ I.", "Example: 24 N·m on I = 6: α = 4 rad/s². Now do yours."]),
        Q(`A flywheel starts from rest and speeds up at ${al} rad/s² for ${t} s. What is its speed ω = α·t (rad/s)?`, "⏱️", al * t, ["Angular speed grows steadily from zero.", "Multiply α by the time.", "Example: 3 rad/s² for 5 s gives 15 rad/s. Now do yours."]),
        Q(`A flywheel with I = ${I} kg·m² spins at ${w} rad/s. What is its energy ½Iω² (J)?`, "⚡", I * w * w / 2, ["Square the angular speed.", "Multiply by I and halve.", "Example: I = 4, ω = 3: ½·4·9 = 18 J. Now do yours."])
      ]);
    }),
    gen("Rolling down a ramp", [
      ["Slide or roll?", "🛝", "A block sliding down a smooth ramp at angle θ accelerates at <b>g·sin θ</b>. A rolling object has to spin up too, so it accelerates more slowly."],
      ["Rolling accelerations", "⚙️", "Without slipping: a solid cylinder has <b>a = (2/3)·g·sin θ</b> and a hollow ring (hoop) has <b>a = ½·g·sin θ</b>. They do not depend on mass or size! Use g = 10."],
      ["Energy view", "🔋", "The energy lost in height goes into speed AND spin. For a hoop, half of m·g·h ends up as spin. The more mass near the rim, the slower the roll."]
    ], () => {
      const s1 = pick([0.3, 0.6, 0.9]), s2 = pick([0.4, 0.6, 0.8]), m = ri(1, 8), h = ri(1, 6);
      return pick([
        Q(`A solid cylinder rolls down a ramp with sin θ = ${s1} (g = 10). What is its acceleration (2/3)·g·sin θ (m/s²)?`, "🛝", rd(2 / 3 * 10 * s1), ["Multiply g by sin θ first.", "Then take two thirds of the result.", "Example: g·sin θ = 6 gives (2/3)·6 = 4 m/s². Now do yours."]),
        Q(`A hoop rolls down a ramp with sin θ = ${s2} (g = 10). What is its acceleration ½·g·sin θ (m/s²)?`, "⭕", rd(0.5 * 10 * s2), ["Multiply g by sin θ first.", "Then take half.", "Example: g·sin θ = 7 gives 3.5 m/s². Now do yours."]),
        Q(`A block slides without friction down a ramp with sin θ = ${s2} (g = 10). What is its acceleration g·sin θ (m/s²)?`, "📦", rd(10 * s2), ["Slides need no spin energy.", "Multiply g by sin θ.", "Example: sin θ = 0.5 gives 5 m/s². Now do yours."]),
        Q(`A hoop of mass ${m} kg rolls down from a height of ${h} m (g = 10). Half of m·g·h becomes spin energy. How much spin energy (J)?`, "🔋", 5 * m * h, ["First find the total energy lost, m·g·h.", "Then take half of it.", "Example: 4 kg, 3 m: total 120 J, half is 60 J. Now do yours."]),
        Q("A sliding block, a solid cylinder and a hoop race down the same smooth ramp from rest. Which finishes first?", "🏁", "The sliding block", ["Compare how much of the energy goes into spinning.", "The one with no spin keeps all its energy for speed.", "Example: a hockey puck slides faster than a rolling can would roll. Now do yours."], ["The sliding block", "The solid cylinder", "The hoop"])
      ]);
    }),
    gen("Natural frequency of a spring-mass", [
      ["Bouncing mass", "🧶", "A mass m on a spring of stiffness k bounces at its <b>natural frequency</b> <b>ω = √(k ÷ m)</b> in radians per second."],
      ["Stiff and light", "⚖️", "Stiffer spring means faster bouncing; a heavier mass means slower. Quadruple the mass and ω is halved."],
      ["Resonance", "🎵", "If something shakes the mass at exactly ω, the swings grow huge. Engineers choose k and m so ω is far from the shaking."]
    ], () => {
      const m = ri(1, 9), w = ri(2, 10), f = pick([2, 3, 4]);
      return pick([
        Q(`A ${m} kg mass sits on a spring with k = ${m * w * w} N/m. What is ω = √(k/m) (rad/s)?`, "🧶", w, ["Divide k by m first.", "Take the square root of the result.", "Example: k = 100, m = 4: √25 = 5 rad/s. Now do yours."]),
        Q(`A ${m} kg mass must bounce at ω = ${w} rad/s. What spring stiffness k = m·ω² is needed (N/m)?`, "🔩", m * w * w, ["Square ω first.", "Multiply by the mass.", "Example: m = 3, ω = 4: k = 3·16 = 48 N/m. Now do yours."]),
        Q(`A spring with k = ${m * w * w} N/m must bounce at ${w} rad/s. What mass m = k/ω² is needed (kg)?`, "⚖️", m, ["Rearrange ω² = k/m.", "m = k ÷ ω².", "Example: k = 90, ω = 3: m = 90/9 = 10 kg. Now do yours."]),
        Q(`The mass on a spring is multiplied by ${f * f} (same spring). The natural frequency is divided by what number?`, "➗", f, ["ω depends on the square root of 1/m.", "Take the square root of the mass factor.", "Example: mass times 25 divides ω by 5. Now do yours."]),
        Q("A machine shakes a mass-spring system at its natural frequency. What is likely to happen?", "🎵", "The vibration grows very large", ["This is called resonance.", "Energy keeps adding to the motion in time with it.", "Example: pushing a swing at its own rhythm builds the swing up. Now do yours."], ["The vibration grows very large", "The vibration disappears", "Nothing changes"])
      ]);
    }),
    gen("Method of sections", [
      ["Cut the truss", "✂️", "To find the force in one truss member without solving every joint, imagine cutting the truss in two through that member. The forces in the cut members hold each piece in equilibrium."],
      ["Take moments", "🔄", "Take moments about a joint where the other cut members meet. The chord force is then <b>F = M ÷ h</b>, where M is the bending moment at the cut and h is the truss depth. Three unknowns, three equations (ΣFx, ΣFy, ΣM)."],
      ["Diagonals", "📐", "The vertical shear V at the cut is carried by the diagonal. A diagonal rising 3 over 4 across has length 5, so its vertical part is (3/5)·F, giving F = 5V ÷ 3."]
    ], () => {
      const h = ri(1, 4), j = ri(1, 6), R = ri(2, 10), V3 = 3 * ri(1, 8), F0 = ri(2, 12);
      return pick([
        Q(`A truss is ${h} m deep. The bending moment at a cut is ${F0 * h} kN·m. What is the chord force M/h (kN)?`, "✂️", F0, ["Use F = M ÷ h.", "Divide the moment by the depth.", "Example: M = 60 kN·m, h = 3 m: 20 kN. Now do yours."]),
        Q(`A left support has a reaction of ${R} kN. A cut is ${h * j} m from it, no loads before the cut. Truss depth is ${h} m. What is the chord force (kN)?`, "🏗️", R * j, ["First find the moment at the cut: reaction times distance.", "Then divide by the truss depth.", "Example: R = 10 kN, 8 m from the support, h = 2 m: M = 80, F = 40 kN. Now do yours."]),
        Q(`A diagonal rises 3 m over 4 m across. It must carry a vertical shear of ${V3} kN. What force does it carry (kN)?`, "📐", V3 * 5 / 3, ["Its vertical part is a fraction of its force.", "The vertical part is three fifths of the force, so multiply the shear by five thirds.", "Example: V = 6 kN gives F = 10 kN. Now do yours."]),
        Q("How many independent equilibrium equations can you write for one rigid body in 2D?", "🧮", 3, ["Two directions of force and one more kind of equation.", "ΣFx, ΣFy and ΣM.", "Example: a 3D body would have six. Now do yours."]),
        Q("The method of sections is best when you want...", "✂️", "One member in the middle of a truss", ["Think about not having to solve every joint.", "It lets you jump straight to a chosen member.", "Example: to check the middle chord of a long bridge. Now do yours."], ["One member in the middle of a truss", "Every member's force in order", "The colour of the paint"])
      ]);
    }),
    gen("Tipping and stability", [
      ["Will it tip?", "📦", "A box tips about its bottom edge when the <b>overturning moment</b> beats the <b>restoring moment</b>. Overturning = F·y (force times its height). Restoring = W·w/2 (weight times half the width)."],
      ["Tipping force", "⚖️", "Setting them equal gives the force that just tips the box: <b>F = W·w ÷ (2·y)</b>. Friction must be high enough that the box does not slide first."],
      ["Making things stable", "🏗️", "A wider base and a lower centre of gravity both make tipping harder. Trucks carry heavy loads low; ladders get a wide stance."]
    ], () => {
      const W = ri(1, 5) * 200, w = pick([20, 40, 80]), y = pick([20, 40, 80]);
      const Ft = W * w / (2 * y), dir = pick([20, -20]);
      return pick([
        Q(`A box of weight ${W} N is ${w} cm wide. What is its restoring moment W·w/2 about the bottom edge (N·cm)?`, "⚖️", W * w / 2, ["Half the width is the lever arm of the weight.", "Multiply the weight by half the width.", "Example: 300 N and 40 cm wide: 300·20 = 6000 N·cm. Now do yours."]),
        Q(`A box (weight ${W} N, ${w} cm wide) is pushed ${y} cm above the floor. What force just tips it, F = W·w/(2y) (N)?`, "📦", Ft, ["Set F·y equal to W·w/2.", "F = W·w ÷ (2y).", "Example: 400 N, 40 cm wide, push at 80 cm: F = 400·40/160 = 100 N. Now do yours."]),
        Q(`A box has a tipping force of ${Ft} N. You push with ${Ft + dir} N at the same height (no sliding). Does it tip?`, "❓", dir > 0 ? "Yes, it tips" : "No, it stays", ["Compare your push with the tipping force.", "Tipping happens when the push is bigger.", "Example: tipping force 100 N and push 80 N does not tip it. Now do yours."], ["Yes, it tips", "No, it stays"]),
        Q("Which change makes a box harder to tip?", "📐", "Lowering its centre of gravity", ["Think about the lever arms.", "A lower centre of gravity makes the overturning moment smaller for a given push.", "Example: a low sports car tips less easily than a tall van. Now do yours."], ["Lowering its centre of gravity", "Making it taller and narrower", "Pushing higher up"]),
        Q("A tall truck tips on a slope when the line of its weight passes...", "🚚", "Outside the wheels", ["Where does the weight line fall compared with the wheel base?", "The restoring moment vanishes when the weight line leaves the base.", "Example: a leaning tower is safe while its weight line stays over its base. Now do yours."], ["Outside the wheels", "Between the wheels", "Through the centre of the wheels"])
      ]);
    }),
    gen("Series RLC impedance", [
      ["Three parts", "🔌", "In AC, an inductor has reactance X<sub>L</sub> and a capacitor X<sub>C</sub>. They work against each other: net reactance <b>X = |X<sub>L</sub> − X<sub>C</sub>|</b>."],
      ["Total", "📐", "The impedance is <b>Z = √(R² + X²)</b>, like the long side of a right triangle. Current is I = V ÷ Z."],
      ["Which wins?", "⚔️", "If X<sub>L</sub> is bigger the circuit acts like an inductor; if X<sub>C</sub> is bigger it acts like a capacitor."]
    ], () => {
      const t = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10], [12, 5, 13], [15, 8, 17], [9, 12, 15]]), base = ri(2, 10), cap = Math.random() < 0.5, k = ri(2, 6);
      const XL = cap ? base : base + t[1], XC = cap ? base + t[1] : base;
      return pick([
        Q(`A series circuit has X<sub>L</sub> = ${XL} Ω and X<sub>C</sub> = ${XC} Ω. What is the net reactance (Ω)?`, "🔌", t[1], ["The two reactances oppose each other.", "Subtract the smaller from the larger.", "Example: 9 Ω and 4 Ω leave 5 Ω. Now do yours."]),
        Q(`R = ${t[0]} Ω, X<sub>L</sub> = ${XL} Ω and X<sub>C</sub> = ${XC} Ω in series. What is the impedance Z (Ω)?`, "📐", t[2], ["Find the net reactance first.", "Then use Z = √(R² + X²).", "Example: R = 9, net X = 12: Z = √225 = 15. Now do yours."]),
        Q(`A series RLC circuit has Z = ${t[2]} Ω and is connected to ${t[2] * k} V AC. What current flows (A)?`, "⚡", k, ["Use Ohm's law with impedance.", "Divide voltage by Z.", "Example: 60 V across 10 Ω gives 6 A. Now do yours."]),
        Q(`A series RLC circuit has R = ${t[0]} Ω and X<sub>L</sub> = X<sub>C</sub> = ${base} Ω. What is Z (Ω)?`, "⚖️", t[0], ["What is the net reactance when the two are equal?", "With no net reactance, only R is left.", "Example: R = 7 Ω with equal reactances gives Z = 7 Ω. Now do yours."]),
        Q("X<sub>L</sub> is bigger than X<sub>C</sub> in a series circuit. The circuit mostly acts like...", "🧲", "An inductor", ["Which reactance wins?", "The larger reactance decides the behaviour.", "Example: if the capacitor's reactance is bigger, it acts like a capacitor. Now do yours."], ["An inductor", "A capacitor", "A battery"])
      ]);
    }),
    gen("Resonant frequency of LC circuits", [
      ["Tuned circuits", "📻", "An inductor and capacitor together trade energy back and forth. They resonate at <b>ω₀ = 1 ÷ √(L·C)</b> radians per second."],
      ["Easy numbers", "🔢", "With L in henries and C in microfarads: <b>ω₀ = 1000 ÷ √(L·C)</b>. Radios are tuned by changing C or L."],
      ["At resonance", "⚖️", "At ω₀ the reactances are equal (X<sub>L</sub> = X<sub>C</sub>) and cancel, so a series circuit has Z = R and the current is largest."]
    ], () => {
      const pr = pick([[1, 4, 2, 500], [1, 16, 4, 250], [1, 25, 5, 200], [4, 16, 8, 125], [4, 25, 10, 100], [16, 25, 20, 50], [25, 25, 25, 40], [1, 64, 8, 125]]), k = pick([2, 3, 4]);
      return pick([
        Q(`L = ${pr[0]} H and C = ${pr[1]} µF. What is √(L·C)?`, "🧮", pr[2], ["Multiply L and C.", "Find the number that squares to the product.", "Example: L = 4, C = 9: 36, whose square root is 6. Now do yours."]),
        Q(`L = ${pr[0]} H and C = ${pr[1]} µF. What is ω₀ = 1000/√(L·C) (rad/s)?`, "📻", pr[3], ["Find √(L·C) first.", "Divide one thousand by that number.", "Example: √(L·C) = 8 gives 1000/8 = 125 rad/s. Now do yours."]),
        Q(`L and C are both multiplied by ${k}. The resonant frequency ω₀ is divided by what number?`, "➗", k, ["L·C grows by the factor squared.", "ω₀ goes with 1 ÷ √(L·C), so take that square root.", "Example: both times 5 divides ω₀ by 5. Now do yours."]),
        Q("At resonance of a series RLC circuit, the net reactance is...", "⚖️", "Zero", ["Compare X<sub>L</sub> and X<sub>C</sub> at ω₀.", "They are equal and opposite.", "Example: +5 Ω and −5 Ω add to nothing. Now do yours."], ["Zero", "As large as possible", "Equal to R"]),
        Q("To raise the resonant frequency of an LC circuit you can...", "📻", "Make C smaller", ["Look at ω₀ = 1/√(LC).", "A smaller product LC makes ω₀ larger.", "Example: a smaller tuning capacitor tunes a radio to a higher station. Now do yours."], ["Make C smaller", "Make C larger", "Add a long wire in series"])
      ]);
    }),
    gen("Transistor as a switch", [
      ["A tiny current controls a big one", "🔀", "A transistor's small <b>base current I<sub>B</sub></b> controls a much bigger <b>collector current I<sub>C</sub> = β·I<sub>B</sub></b>. β is the current gain (often 50 to 200)."],
      ["The base resistor", "🔌", "The base-emitter junction drops 0.7 V, so a base resistor sees (V<sub>in</sub> − 0.7). <b>I<sub>B</sub> = (V<sub>in</sub> − 0.7) ÷ R<sub>B</sub></b>. Use kΩ for R and you get mA."],
      ["Switch on", "💡", "Pushed hard on (saturated), the transistor acts like a closed switch to run an LED, relay or motor from a small chip signal."]
    ], () => {
      const Ib = ri(1, 5), Rb = ri(1, 6), Vr = Ib * Rb, beta = pick([20, 50, 100, 200]);
      return pick([
        Q(`A ${rd(Vr + 0.7)} V signal drives a transistor base through ${Rb} kΩ (0.7 V drop). What base current flows, in mA?`, "🔌", Ib, ["Subtract the junction drop first.", "Divide the remaining voltage by the resistor.", "Example: 5.7 V and 5 kΩ: 5/5 = 1 mA. Now do yours."]),
        Q(`A transistor with β = ${beta} has a base current of ${Ib} mA. What is the collector current (mA)?`, "🔀", beta * Ib, ["Use I<sub>C</sub> = β·I<sub>B</sub>.", "Multiply the gain by the base current.", "Example: β = 50 and 2 mA gives 100 mA. Now do yours."]),
        Q(`A load needs ${beta * Ib} mA through a transistor with β = ${beta}. What base current is needed (mA)?`, "💡", Ib, ["Rearrange I<sub>C</sub> = β·I<sub>B</sub>.", "Divide the collector current by β.", "Example: 300 mA with β = 100 needs 3 mA. Now do yours."]),
        Q(`A base current of ${Ib} mA must flow with ${rd(Vr + 0.7)} V at the input (0.7 V drop). What base resistor is needed (kΩ)?`, "🔧", Rb, ["Find the voltage across the resistor after the 0.7 V drop.", "R = voltage ÷ current.", "Example: 4.7 V input and 2 mA: 4/2 = 2 kΩ. Now do yours."]),
        Q("A fully-on (saturated) transistor behaves like...", "🔀", "A closed switch", ["Think about current flowing freely.", "The gap between collector and emitter is nearly nothing.", "Example: a relay driver turns on a big load from a tiny signal. Now do yours."], ["A closed switch", "An open switch", "A battery"])
      ]);
    }),
    gen("DC motors and back-EMF", [
      ["A motor is also a generator", "🔄", "As a DC motor spins it makes a voltage that opposes the supply, the <b>back-EMF</b> <b>E = K·ω</b>. The current is <b>I = (V − E) ÷ R</b>."],
      ["Starting and stalling", "🛑", "At rest (stall) E = 0, so the current is huge: I = V ÷ R. As the motor speeds up E rises and the current drops. At no-load speed, E is nearly V."],
      ["Torque", "🔧", "Motor torque is <b>T = K·I</b>, with the same constant K. Big current means big torque, and the torque is highest at stall."]
    ], () => {
      const R = ri(1, 6), I = ri(1, 8), E = ri(2, 12), K = pick([0.02, 0.04, 0.05, 0.1]), V = pick([6, 12, 24]), w = ri(2, 6) * 50, Vst = R * ri(2, 8);
      return pick([
        Q(`A motor on ${E + I * R} V has back-EMF ${E} V and winding resistance ${R} Ω. What current flows (A)?`, "🔄", I, ["The back-EMF opposes the supply.", "I = (V − E) ÷ R.", "Example: 12 V, E = 8 V, R = 2 Ω: 4/2 = 2 A. Now do yours."]),
        Q(`A ${Vst} V motor with winding resistance ${R} Ω is stalled (E = 0). What is the stall current (A)?`, "🛑", Vst / R, ["With no spin there is no back-EMF.", "Divide the supply voltage by R.", "Example: 12 V and 3 Ω: 4 A. Now do yours."]),
        Q(`A motor has K = ${K} V per rad/s. At ${w} rad/s what is its back-EMF (V)?`, "🔄", rd(K * w), ["Use E = K·ω.", "Multiply K by ω.", "Example: K = 0.05 at 100 rad/s: 5 V. Now do yours."]),
        Q(`A motor has K = ${K} V per rad/s on a ${V} V supply. What is its no-load speed V/K (rad/s)?`, "🌀", rd(V / K), ["At no load the back-EMF almost equals the supply.", "ω = V ÷ K.", "Example: 12 V and K = 0.1: 120 rad/s. Now do yours."]),
        Q("As a DC motor speeds up with the supply voltage fixed, its current...", "📉", "Falls", ["Back-EMF rises with speed.", "The voltage across the winding gets smaller.", "Example: a washing machine motor draws the most current at start-up. Now do yours."], ["Falls", "Rises", "Stays the same"])
      ]);
    }),
    gen("Convection and cooling", [
      ["Heat to the air", "🌬️", "Heat leaves a hot surface into moving air or water by <b>convection</b>: <b>Q = h·A·ΔT</b>, where h is the heat transfer coefficient (W/m²·K), A the area and ΔT the temperature difference."],
      ["Fans and fins", "🧊", "A fan raises h (forced convection is much stronger than natural). Fins raise the area A. Both help cool a chip or engine."],
      ["Units", "⚡", "With h in W/m²K, A in m² and ΔT in kelvin, Q comes out in watts."]
    ], () => {
      const h = ri(1, 5) * 10, A = ri(1, 5) * 0.5, dT = ri(2, 12) * 5, k = pick([2, 3]);
      return pick([
        Q(`A hot plate of area ${A} m² has h = ${h} W/m²K and is ${dT} K hotter than the air. What heat leaves, Q = h·A·ΔT (W)?`, "🌬️", rd(h * A * dT), ["Multiply the three numbers together.", "Area times h times ΔT.", "Example: h = 20, A = 2 m², ΔT = 10: 400 W. Now do yours."]),
        Q(`A surface loses ${rd(h * A * dT)} W with h = ${h} W/m²K and area ${A} m². How much hotter than the air is it (K)?`, "🌡️", dT, ["Rearrange Q = h·A·ΔT.", "ΔT = Q ÷ (h·A).", "Example: 300 W, h = 10, A = 3: ΔT = 10 K. Now do yours."]),
        Q(`A heat sink's area is multiplied by ${k} (same h, same ΔT). The heat removed is multiplied by how much?`, "🧊", k, ["Q is proportional to A.", "Multiply by the same factor.", "Example: a sink with 4 times the area removes 4 times the heat. Now do yours."]),
        Q("Which usually has the larger h?", "🌬️", "Air blown by a fan", ["Moving air carries heat away faster.", "Forced convection beats natural convection.", "Example: a hot cup cools faster in a breeze. Now do yours."], ["Air blown by a fan", "Still air", "A vacuum"]),
        Q("Fins on a heat sink help mainly because they...", "🧊", "Increase the surface area", ["Look at which term in Q = h·A·ΔT they change.", "More surface touches more air.", "Example: the folds in a radiator expose more metal. Now do yours."], ["Increase the surface area", "Reduce the surface area", "Lower the air temperature"])
      ]);
    }),
    gen("Heat through layered walls", [
      ["Thermal resistance", "🧱", "A layer of thickness L and conductivity k resists heat with <b>R = L ÷ k</b> (in m²K/W). Thick, low-k layers (insulation) have high R."],
      ["Layers add", "➕", "Layers in series add resistances: <b>R<sub>total</sub> = R₁ + R₂</b>. The heat flow per square meter is <b>q = ΔT ÷ R<sub>total</sub></b>, the same through every layer."],
      ["Temperature drop", "🌡️", "The drop across a layer is <b>q × R<sub>layer</sub></b>. The layer with the biggest R takes the biggest drop, so it does the most work."]
    ], () => {
      const lay = pick([[0.1, 0.5, 0.2], [0.2, 0.4, 0.5], [0.05, 0.05, 1], [0.1, 0.04, 2.5], [0.02, 0.2, 0.1], [0.3, 1.5, 0.2], [0.2, 0.8, 0.25]]);
      const h1 = ri(1, 5), h2 = ri(1, 5), s = h1 + h2, j = ri(1, 6), q0 = ri(2, 10) * 5, T = ri(5, 10) * 10;
      return pick([
        Q(`A layer is ${lay[0]} m thick with k = ${lay[1]} W/mK. What is its thermal resistance R = L/k (m²K/W)?`, "🧱", lay[2], ["Divide thickness by conductivity.", "Use the thickness in metres.", "Example: 0.3 m and k = 0.6: R = 0.5. Now do yours."]),
        Q(`A wall has two layers with R = ${h1 / 2} and R = ${h2 / 2} m²K/W in series. What is the total R (m²K/W)?`, "➕", s / 2, ["Resistances in series add.", "Add the two R values.", "Example: 0.5 and 1.5 gives 2. Now do yours."]),
        Q(`A wall with total R = ${s / 2} m²K/W has ${s * j} K between inside and outside. What is the heat flow q = ΔT/R (W/m²)?`, "🏠", 2 * j, ["Heat flow is the temperature difference divided by the total resistance.", "Divide ΔT by R.", "Example: 30 K across R = 3: 10 W/m². Now do yours."]),
        Q(`Heat flows at ${q0} W/m² through a layer with R = 0.2. What is the temperature drop across that layer (K)? (drop = q × R)`, "🌡️", rd(q0 * 0.2), ["The drop is the flow times the layer's resistance.", "Multiply q by R.", "Example: 40 W/m² and R = 0.5 gives 20 K. Now do yours."]),
        Q("Which layer would you add to cut heat loss the most?", "🏠", "A thin layer of low-conductivity foam", ["Look for the highest R per thickness.", "Low k means high resistance.", "Example: wool jackets use trapped air for the same reason. Now do yours."], ["A thin layer of low-conductivity foam", "A thin layer of copper", "A thick layer of steel"])
      ]);
    }),
    gen("Reynolds number", [
      ["Smooth or swirly?", "🌊", "Fluid in a pipe flows in smooth layers (<b>laminar</b>) or in chaotic swirls (<b>turbulent</b>). The <b>Reynolds number</b> decides: <b>Re = ρ·v·D ÷ μ</b>."],
      ["Water numbers", "💧", "For water in a pipe, ρ/μ = 1,000,000 in SI units. With v in m/s and D in mm, <b>Re ≈ 1000·v·D</b>."],
      ["Rule of thumb", "📏", "Below about 2300 the flow is laminar. Above about 4000 it is turbulent. In between it flips. Thick fluids like honey have a large μ, so a small Re."]
    ], () => {
      const v = pick([0.1, 0.2, 0.5, 1, 2]), D = pick([5, 10, 20, 50]), D2 = pick([10, 20, 40]), k = pick([2, 3]);
      const Re = rd(1000 * v * D);
      return pick([
        Q(`Water at ${v} m/s flows in a ${D} mm pipe. What is Re ≈ 1000·v·D?`, "💧", Re, ["Multiply the speed by the diameter in mm.", "Then multiply by one thousand.", "Example: 0.4 m/s and 10 mm: 4000. Now do yours."]),
        Q(`A pipe has Re = ${Re}. Is the flow laminar (below 2300) or turbulent (above 4000)?`, "🌀", Re < 2300 ? "Laminar" : Re > 4000 ? "Turbulent" : "Transitional", ["Compare Re with the two limits.", "Below the low limit it is smooth; above the high limit it is swirly.", "Example: Re = 500 is laminar, Re = 9000 is turbulent. Now do yours."], ["Laminar", "Turbulent", "Transitional"]),
        Q(`A ${D2} mm water pipe must stay laminar, Re below 2000. What is the highest speed (m/s)?`, "🐌", rd(2 / D2), ["Rearrange Re = 1000·v·D for v.", "v = 2000 ÷ (1000·D) = 2 ÷ D.", "Example: D = 4 mm gives v = 0.5 m/s. Now do yours."]),
        Q(`The flow speed is multiplied by ${k} in the same pipe. Re is multiplied by how much?`, "✖️", k, ["Re is proportional to v.", "Multiply by the same factor.", "Example: speed times 5 means Re times 5. Now do yours."]),
        Q("Honey has a very high viscosity μ. Compared with water, its Reynolds number in the same pipe at the same speed is...", "🍯", "Much smaller", ["μ is in the bottom of Re.", "A bigger number underneath makes the result smaller.", "Example: dividing 100 by 1000 is smaller than dividing it by 10. Now do yours."], ["Much smaller", "Much larger", "Exactly the same"])
      ]);
    }),
    gen("Drag force", [
      ["Pushing through fluid", "🚤", "A body moving through a fluid feels drag: <b>F = ½·ρ·C<sub>d</sub>·A·v²</b>. In water ρ = 1000, so F = 500·C<sub>d</sub>·A·v²."],
      ["Speed to the second", "📈", "Drag grows with the <b>square</b> of speed: twice as fast means four times the drag. Power to overcome it is F × v, which grows with the <b>cube</b> of speed."],
      ["Shape", "🐟", "The drag coefficient C<sub>d</sub> is small for streamlined shapes and large for flat plates. That is why fish, boats and planes have smooth shapes."]
    ], () => {
      const pr = pick([[0.4, 0.1], [0.5, 0.2], [1, 0.5], [0.4, 0.5]]), v = ri(1, 5), k = pick([2, 3]);
      const F = rd(500 * pr[0] * pr[1] * v * v);
      return pick([
        Q(`A model sub (C<sub>d</sub> = ${pr[0]}, frontal area ${pr[1]} m²) moves at ${v} m/s in water. What is the drag F = 500·C<sub>d</sub>·A·v² (N)?`, "🚤", F, ["Multiply 500, C<sub>d</sub> and A first.", "Then multiply by the speed squared.", "Example: C<sub>d</sub> = 0.5, A = 0.4, v = 2: 500·0.2·4 = 400 N. Now do yours."]),
        Q(`A boat's speed is multiplied by ${k}. The drag is multiplied by how much?`, "📈", k * k, ["Drag goes with speed squared.", "Square the speed factor.", "Example: speed times 5 gives 25 times the drag. Now do yours."]),
        Q(`A boat's speed is multiplied by ${k}. The power needed to overcome drag is multiplied by how much?`, "⚡", k ** 3, ["Power is drag times speed.", "Drag has a square, speed adds one more factor.", "Example: speed times 4 needs 64 times the power. Now do yours."]),
        Q(`A sub meets ${F} N of drag at ${v} m/s. What power does it need to keep that speed, P = F·v (W)?`, "🔋", F * v, ["Power is force times speed.", "Multiply the drag by the speed.", "Example: 200 N at 3 m/s: 600 W. Now do yours."]),
        Q("Why are submarines and fish streamlined?", "🐟", "A smooth shape has a low drag coefficient", ["Think about which part of the drag formula shape changes.", "C<sub>d</sub> depends on shape.", "Example: a flat plate moved sideways through water is hard to push. Now do yours."], ["A smooth shape has a low drag coefficient", "It makes them heavier", "It makes the water thicker"])
      ]);
    }),
    gen("First-order step response", [
      ["Slow rise to a goal", "📈", "Heaters, tanks and RC circuits respond to a sudden step by rising smoothly towards a final value: <b>y = Y<sub>final</sub>·(1 − e<sup>−t/τ</sup>)</b>. τ is the <b>time constant</b>."],
      ["Memorise these", "🔟", "After 1τ it reaches about <b>63%</b> of the final value. After 2τ about <b>86%</b>, after 3τ about <b>95%</b> and after 5τ about <b>99%</b>. We say it has settled in about 4τ."],
      ["Gain", "⚖️", "The final value is the input times the <b>DC gain K</b>: Y<sub>final</sub> = K × input."]
    ], () => {
      const Y = ri(1, 9) * 100, tau = ri(1, 9), K = ri(2, 9), u = ri(2, 9);
      return pick([
        Q(`A heater should rise by ${Y} °C in the end. About how many °C has it risen after one time constant (use 63%)?`, "🔥", Math.round(63 * Y / 100), ["After one time constant it has covered most of the way, but not all.", "Take 63 percent of the final rise.", "Example: a 200 °C final rise gives 126 °C. Now do yours."]),
        Q(`A first-order system has τ = ${tau} s. About how long until it has settled (4τ) (s)?`, "⏱️", 4 * tau, ["Settling takes about four time constants.", "Multiply τ by four.", "Example: τ = 3 s settles in 12 s. Now do yours."]),
        Q(`A system with DC gain K = ${K} gets a steady input of ${u}. What is the final output K × input?`, "⚖️", K * u, ["The gain multiplies the input.", "Multiply K by the input.", "Example: K = 3 and input 5 gives 15. Now do yours."]),
        Q("About what percent of its final value has a first-order system reached after 3 time constants?", "📊", 95, ["Think of the list: 63, 86, then the next.", "Each extra time constant closes most of the remaining gap.", "Example: after 2 time constants it is at about 86 percent. Now do yours."], undefined),
        Q("A system with a larger time constant τ responds...", "🐌", "More slowly", ["τ is the time scale of the response.", "Bigger τ means it takes longer to rise.", "Example: a big water tank heats more slowly than a mug. Now do yours."], ["More slowly", "More quickly", "At exactly the same speed"])
      ]);
    })
  ];
  b[18] = mix("Mixed practice", at(b, [0, 2, 3, 4, 6, 8, 9, 11, 12, 14, 15, 17]));
  b[19] = mix("Level 29 Challenge", at(b, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));

  // ================= LEVEL 30 =================
  const c = [
    gen("Steady-state error", [
      ["Does it reach the goal?", "🎯", "A controller with only proportional gain K on a simple plant settles near the target, but not exactly on it. For a step input r, the leftover is the <b>steady-state error</b>: <b>e = r ÷ (1 + K)</b>."],
      ["Output", "📈", "The final output is <b>y = r·K ÷ (1 + K)</b>. A bigger loop gain K makes the error smaller, but never quite zero with P control alone."],
      ["Integral action", "∫", "Adding an <b>integral</b> term keeps adding up the leftover error until it is gone, so a PI controller can bring the steady-state error to zero."]
    ], () => {
      const K = ri(2, 19), j = ri(1, 5), e = ri(1, 5);
      return pick([
        Q(`A loop has gain K = ${K}. A step of ${(1 + K) * j} is applied. What is the steady-state error r/(1 + K)?`, "🎯", j, ["Add one to K first.", "Divide the step size by that.", "Example: K = 4, step 20: 20/5 = 4. Now do yours."]),
        Q(`A loop has gain K = ${K}. A step of ${(1 + K) * j} is applied. What is the final output y = r·K/(1 + K)?`, "📈", K * j, ["The output is the target minus the leftover error.", "Find the error first, then subtract from r.", "Example: K = 4, step 20: error 4, output 16. Now do yours."]),
        Q(`A step of ${e * (1 + K)} leaves an error of ${e}. What loop gain K was used?`, "🔎", K, ["Rearrange e = r/(1 + K).", "1 + K = r ÷ e. Then take one away.", "Example: r = 30, e = 5: 1 + K = 6, so K = 5. Now do yours."]),
        Q("To make the steady-state error exactly zero for a step, you can add...", "∫", "Integral action", ["A bigger gain only reduces the error.", "Something must keep adding up the leftover error.", "Example: a thermostat that slowly keeps pushing until the room reaches the set point. Now do yours."], ["Integral action", "A smaller gain", "More noise"]),
        Q("Raising the proportional gain K, the steady-state error...", "📉", "Gets smaller", ["Look at e = r/(1 + K).", "A bigger divider makes a smaller result.", "Example: 10/2 is bigger than 10/6. Now do yours."], ["Gets smaller", "Gets larger", "Stays exactly the same"])
      ]);
    }),
    gen("Stability and poles", [
      ["Poles tell the story", "🎼", "A linear system's behaviour is set by its <b>poles</b>, special numbers s. A pole at s = −a gives a response that fades like e<sup>−a·t</sup>, with time constant <b>τ = 1 ÷ a</b>."],
      ["Stable or not", "⚖️", "If every pole has a <b>negative real part</b> the system is <b>stable</b>: disturbances die away. A pole with a <b>positive</b> real part grows without limit: <b>unstable</b>."],
      ["Complex poles", "🌀", "Poles at s = −σ ± jω oscillate at ω rad/s while fading at rate σ. Poles with zero real part (±jω) oscillate forever, which is the edge of stability."]
    ], () => {
      const a = pick([2, 4, 5, 10]), tau = { 2: 0.5, 4: 0.25, 5: 0.2, 10: 0.1 }, sg = ri(1, 6), w = ri(2, 12);
      const st = pick([[-3, -5, true], [-1, -8, true], [2, -4, false], [3, 1, false], [-2, 6, false]]);
      return pick([
        Q(`A system has a single pole at s = −${a}. What is its time constant τ = 1/a (s)?`, "⏱️", tau[a], ["τ is one over the size of the pole.", "Divide one by the number.", "Example: a pole at −8 gives τ = 0.125 s. Now do yours."]),
        Q(`A system has a time constant of ${tau[a]} s. The pole is at s = −a. What is a?`, "🔎", a, ["a is one over τ.", "Divide one by the time constant.", "Example: τ = 0.5 s means a = 2. Now do yours."]),
        Q(`A system has poles at s = −${sg} ± j${w}. At what angular frequency does it oscillate (rad/s)?`, "🌀", w, ["The imaginary part is the oscillation.", "Look at the number after the j.", "Example: poles −3 ± j7 oscillate at 7 rad/s. Now do yours."]),
        Q(`A system has poles at s = ${st[0]} and s = ${st[1]}. Is it stable?`, "⚖️", st[2] ? "Stable" : "Unstable", ["Look at the sign of each pole.", "All poles must have negative real parts.", "Example: poles −1 and −2 are stable; −1 and +3 are not. Now do yours."], ["Stable", "Unstable"]),
        Q("Which pole makes a faster response, s = −2 or s = −10?", "🏃", "s = −10", ["A larger a gives a smaller time constant.", "The time constant is one over a.", "Example: a pole at −100 settles much faster than −1. Now do yours."], ["s = −10", "s = −2", "They are equally fast"])
      ]);
    }),
    gen("Feedback block diagrams", [
      ["Boxes in a row", "🧱", "Blocks in <b>series</b> multiply: G = G₁ × G₂. Blocks in <b>parallel</b> add: G = G₁ + G₂. A summing circle subtracts the fed-back signal: error e = r − y."],
      ["Closing the loop", "🔁", "With forward gain G and feedback gain H, the overall gain is <b>T = G ÷ (1 + G·H)</b>. For unity feedback H = 1, so T = G ÷ (1 + G)."],
      ["Big gain trick", "✨", "When G·H is much bigger than 1, T ≈ 1 ÷ H. The overall gain depends on the feedback part, not on the (drifty) forward part. That is why op-amp circuits are so accurate."]
    ], () => {
      const g1 = ri(2, 9), g2 = ri(2, 9), u = pick([[1, 0.5], [3, 0.75], [4, 0.8], [9, 0.9]]), t = pick([[10, 0.1, 5], [20, 0.2, 4], [100, 0.04, 20], [50, 0.02, 25], [20, 0.05, 10], [90, 0.1, 9], [40, 0.1, 8]]), r = ri(5, 20), y = ri(1, r - 1);
      return pick([
        Q(`Two blocks with gains ${g1} and ${g2} are in series. What is the combined gain?`, "🧱", g1 * g2, ["Series blocks multiply.", "Multiply the two gains.", "Example: gains 3 and 5 give 15. Now do yours."]),
        Q(`Two blocks with gains ${g1} and ${g2} are in parallel and their outputs add. What is the combined gain?`, "➕", g1 + g2, ["Parallel paths add.", "Add the two gains.", "Example: gains 3 and 5 give 8. Now do yours."]),
        Q(`A unity-feedback loop has forward gain G = ${u[0]}. What is T = G/(1 + G)?`, "🔁", u[1], ["Add one to G for the bottom.", "Divide G by that sum.", "Example: G = 5 gives 5/6. Now do yours."]),
        Q(`A feedback loop has G = ${t[0]} and H = ${t[1]}. What is T = G/(1 + G·H)?`, "🔁", t[2], ["Multiply G and H first.", "Add one, then divide G by it.", "Example: G = 30, H = 0.1: 30/4 = 7.5. Now do yours."]),
        Q(`The reference is ${r} and the output is ${y}. What is the error e = r − y at the summing point?`, "➖", r - y, ["The error is the target minus the actual output.", "Subtract.", "Example: target 12, output 9: error 3. Now do yours."])
      ]);
    }),
    gen("Second-order response and damping", [
      ["Mass, spring, damper", "🪀", "A mass m, spring k and damper c make a second-order system. The undamped natural frequency is <b>ω<sub>n</sub> = √(k ÷ m)</b>. The <b>damping ratio</b> is <b>ζ = c ÷ (2·√(k·m))</b>."],
      ["Three cases", "📊", "ζ < 1: <b>underdamped</b>, it overshoots and rings. ζ = 1: <b>critically damped</b>, the fastest with no overshoot. ζ > 1: <b>overdamped</b>, slow and no overshoot."],
      ["Overshoot table", "🔢", "Approximate overshoot for ζ = 0.1: 73%. 0.2: 53%. 0.3: 37%. 0.5: 16%. 0.7: 5%. 1: none. Car suspensions aim for ζ around 0.5 to 0.7."]
    ], () => {
      const m = ri(1, 4), w = ri(2, 5), j = pick([0.5, 1, 1.5, 2]), ov = pick([[0.1, 73], [0.2, 53], [0.3, 37], [0.5, 16], [0.7, 5]]);
      const zz = pick([0.5, 1, 1.5, 2]);
      return pick([
        Q(`A system has m = ${m} kg and k = ${m * w * w} N/m. What is ω<sub>n</sub> = √(k/m) (rad/s)?`, "🪀", w, ["Divide k by m.", "Take the square root.", "Example: k = 100, m = 4 gives √25 = 5 rad/s. Now do yours."]),
        Q(`A system has m = ${m} kg, k = ${m * w * w} N/m and a damper c = ${2 * j * m * w} N·s/m. Using √(k·m) = ${m * w}, what is ζ = c/(2·√(km))?`, "📊", j, ["Double the given square root value.", "Divide c by that.", "Example: c = 12, √(km) = 4: ζ = 12/8 = 1.5. Now do yours."]),
        Q(`A step response has ζ = ${ov[0]}. Using the table, roughly what percent overshoot is that?`, "📈", ov[1], ["Look in the overshoot table of the lesson.", "Find the row with this ζ.", "Example: ζ = 0.4 sits between 37% and 16%, so about 25%. Now do yours."]),
        Q(`A damped system has ζ = ${zz}. What kind of damping is it?`, "🎚️", zz < 1 ? "Underdamped" : zz === 1 ? "Critically damped" : "Overdamped", ["Compare ζ with 1.", "Below, equal, or above.", "Example: ζ = 0.3 is underdamped; ζ = 3 is overdamped. Now do yours."], ["Underdamped", "Critically damped", "Overdamped"]),
        Q("Which damping gives the fastest response with no overshoot?", "🏁", "Critical damping", ["There is no overshoot.", "It sits exactly on the boundary between ringing and slow.", "Example: a good door closer shuts quickly without banging. Now do yours."], ["Critical damping", "Heavy overdamping", "No damping at all"])
      ]);
    }),
    gen("Motors and generators", [
      ["Moving a wire in a field", "🧲", "Moving a wire of length l at speed v across a magnetic field B makes a voltage (a generator): <b>EMF = B·l·v</b>. B is in tesla, l in meters, v in m/s."],
      ["Current in a field", "➡️", "A wire carrying current I in a field B feels a force <b>F = B·I·L</b> (a motor). Both effects happen in any electric machine."],
      ["Same machine", "🔄", "A motor and a generator are the same device run backwards. Spinning a motor shaft with your hand makes a voltage; applying a voltage makes the shaft turn."]
    ], () => {
      const B = pick([0.5, 1, 2]), l = pick([0.2, 0.5, 1, 2]), v = ri(1, 10), I = ri(1, 10), L = pick([0.5, 1, 2]), k = pick([2, 3, 4]);
      return pick([
        Q(`A ${l} m wire moves at ${v} m/s through a field of ${B} T. What is the EMF = B·l·v (V)?`, "🧲", rd(B * l * v), ["Multiply the three numbers.", "Field times length times speed.", "Example: 2 T, 0.5 m, 4 m/s: 4 V. Now do yours."]),
        Q(`A wire of length ${L} m carries ${I} A in a field of ${B} T. What is the force F = B·I·L (N)?`, "➡️", rd(B * I * L), ["Multiply the three numbers.", "Field times current times length.", "Example: 2 T, 3 A, 0.5 m: 3 N. Now do yours."]),
        Q(`A generator makes ${rd(B * l * v)} V. Its wire speed is multiplied by ${k}. The EMF is multiplied by how much?`, "✖️", k, ["EMF is proportional to speed.", "Use the same factor.", "Example: speed times 3 gives 3 times the voltage. Now do yours."]),
        Q("Moving a wire through a magnetic field makes...", "🧲", "A voltage in the wire", ["This is how generators work.", "The movement changes how the wire cuts the field.", "Example: a bicycle dynamo lights a lamp when the wheel turns. Now do yours."], ["A voltage in the wire", "Nothing at all", "Sound"]),
        Q("A motor and a generator are...", "🔄", "The same kind of machine used in opposite ways", ["Think about running one backwards.", "Voltage in gives motion, motion in gives voltage.", "Example: spinning a toy motor shaft by hand can light an LED. Now do yours."], ["The same kind of machine used in opposite ways", "Completely unrelated machines", "Both only found in power stations"])
      ]);
    }),
    gen("AC motor speed", [
      ["Following the field", "🌀", "An AC induction motor is driven by a rotating magnetic field. Its <b>synchronous speed</b> is <b>n<sub>s</sub> = 120·f ÷ p</b> rpm, where f is the supply frequency and p the number of poles."],
      ["Slip", "🐢", "The rotor runs a little slower than the field: <b>n = n<sub>s</sub>·(1 − slip)</b>. A slip of 3% means the rotor turns at 97% of synchronous speed."],
      ["Speed control", "🎛️", "Because speed follows f, a <b>variable-frequency drive</b> changes the motor speed by changing the supply frequency."]
    ], () => {
      const f = pick([50, 60]), p = pick([2, 4, 6, 8]), ns = pick([3600, 1800, 1200, 900, 3000, 1500, 1000]), s = ri(2, 5);
      return pick([
        Q(`A ${p}-pole motor runs from ${f} Hz. What is its synchronous speed 120·f/p (rpm)?`, "🌀", 120 * f / p, ["Multiply 120 by the frequency.", "Divide by the number of poles.", "Example: 4 poles at 50 Hz: 6000/4 = 1500 rpm. Now do yours."]),
        Q(`A motor has synchronous speed ${ns} rpm and a slip of ${s}%. What is its actual speed (rpm)?`, "🐢", ns * (100 - s) / 100, ["The rotor runs at a fraction of the field speed.", "Multiply by (100 minus the slip) percent.", "Example: 1000 rpm with 4% slip: 960 rpm. Now do yours."]),
        Q(`A motor runs at ${ns} rpm synchronous speed from ${f} Hz. How many poles p = 120·f/n<sub>s</sub> does it have?`, "🧲", 120 * f / ns, ["Rearrange n<sub>s</sub> = 120f/p for p.", "p = 120 × f ÷ speed.", "Example: 50 Hz and 1500 rpm: 6000/1500 = 4 poles. Now do yours."]),
        Q("A variable-frequency drive changes a motor's speed by changing the...", "🎛️", "Supply frequency", ["Look at the formula for synchronous speed.", "Speed goes with the frequency.", "Example: lowering the frequency slows a fan motor. Now do yours."], ["Supply frequency", "Colour of the wires", "Number of magnets in the room"]),
        Q("If the supply frequency doubles with the same motor, the synchronous speed...", "✖️", "Doubles", ["n<sub>s</sub> = 120f/p.", "Speed is proportional to f.", "Example: halving f halves the speed. Now do yours."], ["Doubles", "Halves", "Stays the same"])
      ]);
    }),
    gen("High-voltage transmission", [
      ["Power lines", "⚡", "Electric power is <b>P = V·I</b>. To send the same power at higher voltage, you need less current: <b>I = P ÷ V</b>. With P in kW and V in kV, I comes out in amps."],
      ["Losses", "🔥", "The wire heats up by <b>P<sub>loss</sub> = I²·R</b>. Cutting the current by 10 cuts the loss by 100! That is why power lines use tens or hundreds of kilovolts."],
      ["Then step down", "🔽", "Transformers raise the voltage for the long trip and lower it again near homes."]
    ], () => {
      const P = ri(1, 10) * 1000, V = pick([10, 20, 50, 100]), R = ri(1, 5), k = pick([2, 5, 10]);
      const I = P / V;
      return pick([
        Q(`A line sends ${P} kW at ${V} kV. What current flows, I = P/V (A)?`, "⚡", I, ["Divide power by voltage.", "kW divided by kV gives amps.", "Example: 3000 kW at 50 kV: 60 A. Now do yours."]),
        Q(`A line carries ${I} A and has resistance ${R} Ω. How much power does the wire waste, I²R (kW)? (Divide watts by 1000)`, "🔥", rd(I * I * R / 1000), ["Square the current first.", "Multiply by R, then divide by one thousand.", "Example: 100 A and 2 Ω: 20000 W, which is 20 kW. Now do yours."]),
        Q(`The line voltage is multiplied by ${k} for the same power. The wire loss is divided by what number?`, "🔽", k * k, ["Current falls by the same factor as the voltage rises.", "Loss goes with current squared.", "Example: voltage times 3 divides the loss by 9. Now do yours."]),
        Q(`A line carries ${I} A. If the voltage is raised ${k} times for the same power, what is the new current (A)?`, "⚡", I / k, ["The same power needs less current.", "Divide the current by the voltage factor.", "Example: 60 A with voltage times 3 gives 20 A. Now do yours."]),
        Q("Why are power lines run at very high voltage?", "🗼", "Lower current means much less wasted heat", ["Think about I = P/V.", "The wire loss depends on current squared.", "Example: a thin wire can safely carry a small current but not a large one. Now do yours."], ["Lower current means much less wasted heat", "High voltage makes the wires cooler by magic", "Lightning prefers it"])
      ]);
    }),
    gen("Turbines and compressors", [
      ["Work from flowing gas", "🌬️", "In steady flow, the power of a turbine or compressor is <b>P = ṁ × Δh</b> (mass flow in kg/s times the change in enthalpy in kJ/kg gives kW)."],
      ["Gases and heat capacity", "🔥", "For air, Δh ≈ c<sub>p</sub>·ΔT with c<sub>p</sub> ≈ 1 kJ/kg·K. So P ≈ ṁ × ΔT (kW) for air."],
      ["Real machines", "⚙️", "A real turbine gives less than the ideal (isentropic) drop: <b>η = actual ÷ ideal</b>. A real compressor needs more work than the ideal."]
    ], () => {
      const m = ri(1, 20), dh = ri(1, 10) * 50, m2 = ri(1, 5), dT = ri(2, 10) * 10, eta = pick([60, 70, 80, 90]), ideal = ri(5, 40) * 10;
      return pick([
        Q(`A steam turbine passes ${m} kg/s and the enthalpy falls by ${dh} kJ/kg. What power does it produce (kW)?`, "🌬️", m * dh, ["Use P = ṁ·Δh.", "Multiply the mass flow by the enthalpy drop.", "Example: 4 kg/s and 100 kJ/kg: 400 kW. Now do yours."]),
        Q(`A turbine makes ${m * dh} kW and the enthalpy drop is ${dh} kJ/kg. What is the mass flow (kg/s)?`, "💨", m, ["Rearrange P = ṁ·Δh.", "ṁ = P ÷ Δh.", "Example: 600 kW and 100 kJ/kg gives 6 kg/s. Now do yours."]),
        Q(`A compressor heats ${m2} kg/s of air by ${dT} K (use c<sub>p</sub> = 1 kJ/kg·K). What power does it need (kW)?`, "🔧", m2 * dT, ["Δh = c<sub>p</sub>·ΔT.", "Multiply the mass flow by the temperature rise.", "Example: 2 kg/s heated by 50 K: 100 kW. Now do yours."]),
        Q(`The ideal enthalpy drop is ${ideal} kJ/kg. A real turbine achieves ${ideal * eta / 100} kJ/kg. What is its efficiency (%)?`, "📊", eta, ["Efficiency = actual ÷ ideal.", "Turn the fraction into a percent.", "Example: 80 out of 100 is 80 percent. Now do yours."]),
        Q("A compressor...", "🔧", "Needs power to squeeze the gas", ["Think about pushing a bicycle pump.", "Work goes into the gas.", "Example: a turbine does the opposite, taking work out of the flow. Now do yours."], ["Needs power to squeeze the gas", "Produces power from the gas", "Cools the gas for free"])
      ]);
    }),
    gen("Pump and fan affinity laws", [
      ["Changing the speed", "🔧", "When you change a pump or fan's speed N, the flow, head and power change by simple rules: <b>flow ∝ N</b>, <b>head ∝ N²</b> and <b>power ∝ N³</b>."],
      ["Twice the speed", "✖️", "Run it twice as fast: 2 times the flow, <b>4</b> times the head and <b>8</b> times the power!"],
      ["Saving energy", "🌱", "Slow a fan a little and the power falls a lot. A fan at half speed uses only one eighth of the power, which is why variable speed drives save energy."]
    ], () => {
      const k = pick([2, 3]), Qf = ri(1, 9) * 10, H = ri(1, 9) * 5, P = ri(1, 5), kk = pick([2, 3, 4]);
      return pick([
        Q(`A pump moves ${Qf} L/s. Its speed is multiplied by ${k}. What is the new flow (L/s)?`, "💧", Qf * k, ["Flow is proportional to speed.", "Multiply by the same factor.", "Example: 20 L/s with speed times 4: 80 L/s. Now do yours."]),
        Q(`A pump gives ${H} m of head. Its speed is multiplied by ${k}. What is the new head (m)?`, "📏", H * k * k, ["Head goes with speed squared.", "Multiply by the square of the factor.", "Example: 10 m with speed times 3: 90 m. Now do yours."]),
        Q(`A fan uses ${P} kW. Its speed is multiplied by ${k}. What power does it now use (kW)?`, "⚡", P * k ** 3, ["Power goes with speed cubed.", "Multiply by the cube of the factor.", "Example: 2 kW with speed times 3: 54 kW. Now do yours."]),
        Q(`A fan's speed is divided by ${kk}. Its power is divided by what number?`, "🌱", kk ** 3, ["Power goes with the cube of speed.", "Cube the speed factor.", "Example: speed divided by 5 divides the power by 125. Now do yours."]),
        Q("Slowing a fan a little saves a lot of power because power goes with...", "📉", "The cube of the speed", ["The saving is bigger than the slowdown.", "Look at the lesson's list of affinity rules.", "Example: half speed gives an eighth of the power. Now do yours."], ["The cube of the speed", "The square root of the speed", "The speed in a straight line"])
      ]);
    }),
    gen("Second-law efficiency", [
      ["How good is it, really?", "🌡️", "The best possible efficiency between a hot temperature T<sub>h</sub> and a cold T<sub>c</sub> (in kelvin) is <b>η<sub>Carnot</sub> = 1 − T<sub>c</sub>/T<sub>h</sub></b>. No real engine can beat it."],
      ["Second-law efficiency", "📊", "<b>η<sub>II</sub> = η<sub>actual</sub> ÷ η<sub>Carnot</sub></b> tells you how close a machine is to perfect for its temperatures. It shows where improvement is possible."],
      ["Impossible claims", "🚫", "If someone claims an efficiency above Carnot, the claim must be wrong (it would break the second law)."]
    ], () => {
      const Th = pick([500, 600, 1000]), carn = { 500: 40, 600: 50, 1000: 70 }[Th], j = pick([0.4, 0.5, 0.6, 0.8]), Qin = ri(1, 9) * 100;
      const claim = pick([carn + 20, carn - 20]);
      return pick([
        Q(`An engine works between ${Th} K and 300 K. What is its Carnot efficiency (%)?`, "🌡️", carn, ["Divide the cold temperature by the hot one.", "Take that away from one, then change to a percent.", "Example: 400 K and 300 K: 1 − 0.75 = 25 percent. Now do yours."]),
        Q(`An engine between ${Th} K and 300 K has Carnot efficiency ${carn}% and actual efficiency ${rd(carn * j)}%. What is its second-law efficiency (%)?`, "📊", Math.round(j * 100), ["Divide the actual by the Carnot value.", "Turn the result into a percent.", "Example: actual 20 percent over Carnot 40 percent: 50 percent. Now do yours."]),
        Q(`An engine is claimed to be ${claim}% efficient between ${Th} K and 300 K (Carnot limit ${carn}%). Is this possible?`, "🚫", claim > carn ? "Impossible" : "Possible", ["Compare the claim with the Carnot limit.", "No engine can go above Carnot.", "Example: a claim of 60 percent when the limit is 50 percent is impossible. Now do yours."], ["Impossible", "Possible"]),
        Q(`An engine takes in ${Qin} kJ of heat at 25% efficiency. How much heat is rejected (kJ)?`, "🔥", Qin * 0.75, ["Energy in = work out + heat rejected.", "Heat rejected = heat in × (1 − η).", "Example: 200 kJ at 50 percent rejects 100 kJ. Now do yours."]),
        Q("A high second-law efficiency means the machine is...", "📊", "Close to the best possible for its temperatures", ["Compare with the Carnot limit.", "Closer to 100 percent means closer to the limit.", "Example: a machine at 95 percent of Carnot has little room to improve. Now do yours."], ["Close to the best possible for its temperatures", "Always very hot", "Producing no work"])
      ]);
    }),
    mcl("Ductile and brittle failure", [
      ["Two ways to break", "🔩", "<b>Ductile</b> materials (copper, mild steel, aluminium) stretch a lot and <b>neck</b> before breaking. You get a warning. <b>Brittle</b> materials (glass, ceramics, cast iron) snap suddenly with almost no stretch."],
      ["Toughness", "📈", "<b>Toughness</b> is the energy a material absorbs before breaking: the area under its stress-strain curve. Ductile metals are usually tough; glass is not."],
      ["Things that make it worse", "❄️", "Cold, fast loading and sharp notches can turn a normally ductile metal brittle. Impact tests (like Charpy) check this."]
    ], "Example: a copper wire bends and stretches before it breaks, so it is ductile. Now try yours.", [
      ["Which of these is the most ductile?", "Which stretches a lot before breaking?", "Think of drawing it into a thin wire.", "Copper", "Window glass", "Ceramic tile", "Cast iron"],
      ["Which gives the most warning before it breaks?", "Look for visible stretching.", "Necking is a warning sign.", "A ductile metal", "A brittle ceramic", "Window glass", "A dry twig of stiff plastic"],
      ["Brittle failure usually shows...", "Think about snapping.", "There is little time to react.", "Almost no stretching before it breaks", "A long neck before breaking", "Slow bending first", "Large stretching first"],
      ["Toughness is the area under which curve?", "Area = energy absorbed.", "Think of stress against another quantity.", "The stress-strain curve", "The temperature curve", "The voltage curve", "The speed curve"],
      ["What can make a normally ductile steel behave in a brittle way?", "Think about the weather and about notches.", "Cold, sharp notches and fast loading all matter.", "Very low temperature and a sharp notch", "Warm oil", "Being painted", "Being new"],
      ["Window glass is...", "Does it bend before it breaks?", "Think of what happens when it is hit.", "Brittle", "Ductile", "A tough metal", "Very stretchy"],
      ["Which test checks how well a metal absorbs a sudden hit?", "Think of a swinging hammer.", "It measures the energy absorbed in breaking.", "An impact test such as Charpy", "A colour test", "A weight test", "A sound test"],
      ["Why do engineers prefer ductile materials for safety-critical parts?", "Consider what happens before failure.", "People can notice and fix the problem.", "They give a warning before failing", "They are always cheaper", "They never fail", "They are lighter than everything"],
      ["Necking is when a stretched bar...", "Look at the middle of a test bar before it breaks.", "Its shape changes before the break.", "Gets narrower at one place before breaking", "Gets wider along its length", "Turns into glass", "Becomes completely round"]
    ]),
    mcl("Corrosion and creep", [
      ["Corrosion", "🧂", "<b>Corrosion</b> is the slow chemical attack of a metal. Steel rusts when it has oxygen and water. Salt water makes it faster. Paint, plating, <b>galvanising</b> (a zinc coat) and stainless steel (which grows a thin protective oxide) all fight it."],
      ["Galvanic corrosion", "🔋", "Two different metals touching in water form a weak battery, and the more reactive one corrodes. A zinc block bolted to a ship's hull is a <b>sacrificial anode</b>: it rusts instead of the steel."],
      ["Creep", "🔥", "<b>Creep</b> is slow, permanent stretching under a steady load, mostly at high temperature (turbine blades, boiler pipes). It gets worse as it gets hotter."]
    ], "Example: a steel bolt touching copper pipe in wet conditions corrodes faster, so engineers use insulating washers. Now try yours.", [
      ["Steel rusts fastest when it has...", "Rust needs two things from the surroundings.", "One is in the air; the other is also found in the sea.", "Oxygen and water", "Dry nitrogen only", "Oil and no air", "Vacuum"],
      ["What is a sacrificial anode?", "The word sacrificial gives a clue.", "It is a more reactive metal that is attached to the structure.", "A metal that corrodes so the steel does not", "A coat of paint", "An insulating washer", "A strong bolt"],
      ["Galvanised steel is steel with a coat of...", "A common metal is used for this protection.", "It is the same metal used for sacrificial anodes.", "Zinc", "Gold", "Plastic only", "Copper"],
      ["Why is stainless steel resistant to rust?", "Think of a very thin skin on the metal.", "The skin forms by itself and protects it.", "It grows a thin protective oxide layer", "It contains no iron", "It is always painted", "It is made of rubber"],
      ["Creep is most important in parts that are...", "It is a slow process that depends on heat.", "Think about the inside of a jet engine.", "Hot and loaded for a long time", "Cold and lightly loaded", "Used only once for a second", "Made of glass"],
      ["Creep means...", "It happens slowly.", "The part gets longer permanently.", "Slow permanent stretching under steady load", "A sudden snap", "A change of colour", "A change of sound"],
      ["Which pair of metals is most likely to cause galvanic corrosion when wet?", "Look for two different metals in contact.", "Same metal touching itself will not form a cell.", "Steel touching copper", "Steel touching steel", "Copper touching copper", "Aluminium touching aluminium"],
      ["Which does NOT help prevent corrosion?", "Think of the opposite of protecting.", "It lets water and salt reach the metal.", "Leaving the metal bare in salty air", "Painting it", "Plating it with zinc", "Using stainless steel"],
      ["Raising the temperature of a loaded part makes creep...", "Heat helps atoms move.", "The effect gets bigger.", "Faster", "Slower", "Stop completely", "Turn into rust"]
    ]),
    gen("Net present value (NPV)", [
      ["Is the project worth it?", "💰", "<b>NPV</b> = (present value of all the money coming in) − (money spent now). Cash that arrives later is discounted by (1 + r) for each year."],
      ["Decision rule", "✅", "<b>NPV &gt; 0</b>: the project earns more than the rate r, so accept. <b>NPV &lt; 0</b>: reject. Between two projects, pick the larger NPV."],
      ["Example", "🧮", "Spend $1000 now and receive $1210 in 2 years at r = 10%: PV = 1210 ÷ 1.21 = $1000, so NPV = 0. You break even exactly."]
    ], () => {
      const a1 = ri(1, 9), a2 = ri(1, 9);
      const PV = (a1 + a2) * 100, d = pick([-1, 1]), dd = ri(1, Math.min(3, a1 + a2 - 1));
      const C2 = Math.max(100, PV + d * 100 * ri(1, 3));
      return pick([
        Q(`At r = 10%, what is the present value of $${110 * a1} received in 1 year ($)?`, "⏳", 100 * a1, ["Discount by one year.", "Divide by 1.1.", "Example: $220 in a year is worth 220/1.1 = $200 today. Now do yours."]),
        Q(`At r = 10%, what is the present value of $${121 * a2} received in 2 years ($)?`, "⏳", 100 * a2, ["Discount by two years.", "Divide by 1.1 twice, which is 1.21.", "Example: $242 in 2 years is worth $200 today. Now do yours."]),
        Q(`A project costs $${PV - 100 * dd} now and returns $${110 * a1} after 1 year and $${121 * a2} after 2 years (r = 10%). What is the NPV ($)?`, "💰", 100 * dd, ["Find the present value of each return first.", "Add the two present values, then subtract the cost.", "Example: returns $110 and $121 for a cost of $150: 100 + 100 − 150 = $50. Now do yours."]),
        Q(`A project's returns have a present value of $${PV}. It costs $${C2} now. Accept or reject?`, "✅", PV > C2 ? "Accept" : "Reject", ["Compare present value of returns with the cost.", "If returns are worth more than the cost, NPV is positive.", "Example: returns worth $800 for a $600 cost: accept. Now do yours."], ["Accept", "Reject"]),
        Q("A project has a positive NPV. This means it...", "📈", "Earns more than the discount rate", ["Positive means better than break-even.", "It beats the required return.", "Example: NPV 0 means it just earns the rate. Now do yours."], ["Earns more than the discount rate", "Loses money compared with the rate", "Is impossible to build"])
      ]);
    }),
    gen("Depreciation and book value", [
      ["Value fades", "📉", "Machines lose value as they age. <b>Straight-line depreciation</b> spreads the loss evenly: <b>D = (cost − salvage) ÷ life</b> per year, where salvage is the value at the end."],
      ["Book value", "📖", "<b>Book value</b> after n years = cost − n × D. It falls in a straight line down to the salvage value."],
      ["Faster early", "🏎️", "<b>Double-declining balance</b> takes more off in early years: each year's depreciation is (2 ÷ life) × the book value at the start of that year."]
    ], () => {
      const life = pick([4, 5, 8, 10]), sal = ri(1, 4) * 500, D = ri(1, 6) * 500, n = ri(1, life - 1);
      const cost = sal + D * life, cost2 = ri(1, 9) * 1000;
      return pick([
        Q(`A machine costs $${cost}, lasts ${life} years and is then worth $${sal}. What is the straight-line depreciation per year ($)?`, "📉", D, ["Subtract the salvage value from the cost.", "Divide the result by the life in years.", "Example: cost $9000, salvage $1000, life 4 years: 8000/4 = $2000. Now do yours."]),
        Q(`A machine costs $${cost} and loses $${D} each year in straight-line depreciation. What is its book value after ${n} year${n > 1 ? "s" : ""} ($)?`, "📖", cost - n * D, ["Find the total depreciation so far.", "Subtract it from the cost.", "Example: cost $6000, $1000 a year, 2 years: $4000. Now do yours."]),
        Q(`A machine costs $${cost2} and has a ${life}-year life. Double-declining balance takes (2/${life}) of the book value in year 1. How much is year 1's depreciation ($)?`, "🏎️", cost2 * 2 / life, ["The first-year rate is two divided by the life.", "Apply it to the full cost.", "Example: cost $10000, life 5: 2/5 of 10000 = $4000. Now do yours."]),
        Q("Book value at the end of the machine's life in straight-line depreciation equals...", "📖", "The salvage value", ["At the end of life, how much is left?", "It is the scrap or resale value.", "Example: a bus kept for 10 years is sold for its salvage value. Now do yours."], ["The salvage value", "The original cost", "Always zero"]),
        Q("Straight-line depreciation takes off...", "📉", "The same amount every year", ["The name gives you a clue: a straight line.", "The yearly loss does not change.", "Example: $500 per year, every year. Now do yours."], ["The same amount every year", "More each year", "Nothing in the first year"])
      ]);
    }),
    gen("Benefit-cost and life-cycle cost", [
      ["Benefit-cost ratio", "⚖️", "<b>B/C = benefits ÷ costs</b> (both in today's money). A ratio above 1 means the benefits beat the costs."],
      ["Life-cycle cost", "🧾", "The <b>life-cycle cost</b> adds everything over a product's life: <b>initial cost + (yearly running cost × years) − salvage</b>. A cheap-to-buy item can cost more over time."],
      ["Choosing", "🏗️", "Compare options over the same number of years. The lowest life-cycle cost wins unless other needs (safety, reliability) say otherwise."]
    ], () => {
      const cost = ri(1, 9) * 100, bc = pick([1.5, 2, 2.5, 3, 4]), y = ri(5, 15), a = ri(5, 20) * 100, b2 = ri(2, 9) * 100, ra = ri(1, 6) * 20, rb = ri(7, 14) * 20, sal = ri(1, 3) * 100;
      const lccA = a + ra * y, lccB = b2 + rb * y;
      return pick([
        Q(`A project has benefits worth $${rd(cost * bc)} and costs of $${cost}. What is the benefit-cost ratio?`, "⚖️", bc, ["Divide benefits by costs.", "Make sure the larger number is on top.", "Example: benefits $600 over costs $400 gives 1.5. Now do yours."]),
        Q(`A pump costs $${a} to buy and $${ra} a year to run for ${y} years. What is its life-cycle cost ($)?`, "🧾", lccA, ["Running cost for all years is the yearly amount times the number of years.", "Add the purchase price.", "Example: $500 plus $50 a year for 4 years: 500 + 200 = $700. Now do yours."]),
        Q(`A machine costs $${a} to buy, $${ra} a year to run for ${y} years, and sells for $${sal} at the end. What is its life-cycle cost ($)?`, "🧾", lccA - sal, ["Add up the purchase price and the running costs.", "Take away the money from selling it.", "Example: $400 plus $100 a year for 3 years, minus $50: 400 + 300 − 50 = $650. Now do yours."]),
        Q(`Option A: $${a} to buy, $${ra} a year. Option B: $${b2} to buy, $${rb} a year. Over ${y} years, which has the lower life-cycle cost?`, "🏗️", lccA < lccB ? "Option A" : lccB < lccA ? "Option B" : "They are equal", ["Work out each option's total over the years.", "Initial cost plus years times yearly cost, for each one.", "Example: A $300 + $20 a year, B $100 + $50 a year over 10 years: A = 500, B = 600, A is cheaper. Now do yours."], ["Option A", "Option B", "They are equal"]),
        Q("A benefit-cost ratio below 1 means...", "📉", "The costs are bigger than the benefits", ["Compare the top number with the bottom.", "Less than one means the top is smaller.", "Example: benefits $80 over costs $100 gives 0.8. Now do yours."], ["The costs are bigger than the benefits", "The benefits are bigger than the costs", "The project is free"])
      ]);
    }),
    mcl("Professional duties", [
      ["The public comes first", "🛡️", "Engineering codes of ethics say that the engineer's first duty is to protect the <b>safety, health and welfare of the public</b>. This comes before the boss or the client."],
      ["Honesty and secrets", "🔒", "Be truthful in reports and data. Keep your client's confidential information private, unless hiding it would put people in danger. Give credit to others for their work."],
      ["Speaking up and patents", "📣", "If a design is unsafe and your employer will not fix it, you must raise it, first inside the company, then to the proper authority if needed (<b>whistleblowing</b>). <b>Patents</b> protect an inventor's new ideas, so copying them without permission is not allowed."]
    ], "Example: you find a crack in a bridge design. You report it, even if it delays the project. Now try yours.", [
      ["Your employer wants to ignore a safety problem you found. What should you do first?", "You have a duty to the public.", "Start by raising it with the right people.", "Report it to your supervisor in writing", "Hide it", "Change the data", "Wait and see"],
      ["An engineer's first duty is to...", "The code of ethics puts one group first.", "It is the people who might be hurt.", "Protect public safety", "Maximise profit", "Finish early", "Impress the boss"],
      ["You learn a client's private design details. You should...", "Think of trust.", "Information does not go public without a reason.", "Keep them confidential", "Post them online", "Sell them to a rival", "Share them with friends"],
      ["A colleague designed a clever part. In your report you should...", "Think about who deserves recognition.", "Be honest about who did the work.", "Give your colleague credit", "Claim it as your own", "Leave their name out", "Change the design a little and claim it"],
      ["Copying a patented design without permission is...", "Patents protect the inventor.", "It would take their idea unfairly.", "Not allowed", "Always allowed", "Fine if you change the colour", "Required"],
      ["A test result fails the limit slightly. The honest action is to...", "Be truthful with data.", "Do not change numbers to look better.", "Report the true result and fix the problem", "Change the number to pass", "Delete the test", "Ask a friend to re-measure until it passes"],
      ["Whistleblowing means...", "Think of warning others about a danger.", "It happens when other routes have failed.", "Raising a serious safety concern to the proper authority", "Telling jokes at work", "Quitting without saying why", "Stealing company files"],
      ["You are asked to sign off a drawing in a field you do not know. You should...", "Think about competence.", "Honesty about skill protects people.", "Say it is outside your skills and get an expert", "Sign it anyway", "Guess", "Copy another drawing"],
      ["Why does a profession have a code of ethics?", "Think about trust from society.", "It guides engineers in hard situations.", "So the public can trust engineers' judgement", "To make the work easier", "To keep salaries high", "To avoid ever being checked"]
    ]),
    gen("Bill of materials and costing", [
      ["The shopping list", "🧾", "A <b>bill of materials (BOM)</b> lists every part of a product with its quantity and unit cost. Line cost = quantity × unit cost. The total adds all the lines."],
      ["Adding up", "➕", "Add <b>labour</b> (hours × rate) and sometimes a <b>contingency</b>, an extra percentage (often 10%) for surprises."],
      ["Cost per unit", "📦", "If you build n identical products, <b>cost per unit = total cost ÷ n</b>. Setup costs shrink per unit as n grows."]
    ], () => {
      const q1 = ri(2, 10), u1 = ri(2, 20), q2 = ri(1, 8), u2 = ri(5, 40), q3 = ri(1, 4) * 2, u3 = ri(3, 30), hrs = ri(2, 10), rate = ri(2, 6) * 5, tot = ri(2, 9) * 100, n = pick([2, 4, 5, 10]), base = ri(1, 9) * 100;
      return pick([
        Q(`A BOM line has ${q1} parts at $${u1} each. What is the line cost ($)?`, "🧾", q1 * u1, ["Quantity times unit cost.", "Multiply the two numbers.", "Example: 6 parts at $4: $24. Now do yours."]),
        Q(`A robot needs ${q1} bolts at $${u1} each, ${q2} sensors at $${u2} each and ${q3} wheels at $${u3} each. What is the total BOM cost ($)?`, "🤖", q1 * u1 + q2 * u2 + q3 * u3, ["Work out the cost of each line.", "Add the three line costs together.", "Example: 2 at $3 plus 1 at $10 plus 4 at $2 = 6 + 10 + 8 = $24. Now do yours."]),
        Q(`Labour takes ${hrs} hours at $${rate} an hour. What is the labour cost ($)?`, "🔨", hrs * rate, ["Hours times rate.", "Multiply them.", "Example: 4 hours at $20: $80. Now do yours."]),
        Q(`A project's costs add to $${base}. A 10% contingency is added. What is the new total ($)?`, "🛟", base * 11 / 10, ["Find ten percent of the cost.", "Add it to the cost.", "Example: $200 plus 10% = $220. Now do yours."]),
        Q(`${n} identical units cost $${tot * n} in total. What is the cost of one unit ($)?`, "📦", tot, ["Share the total across the units.", "Divide the total by the number of units.", "Example: $600 for 3 units is $200 each. Now do yours."])
      ]);
    }),
    gen("Design project: sizing a motor", [
      ["Start from the job", "🛠️", "A design project turns a need into numbers. A cart of mass m must accelerate at a and overcome rolling friction. The force is <b>F = m·a + μ·m·g</b> (use g = 10)."],
      ["Wheel and motor", "⚙️", "Wheel torque is <b>T = F × r</b> (r is the wheel radius). With a gearbox of ratio G, the motor torque is <b>T<sub>motor</sub> = T ÷ G</b> (ideal, no losses)."],
      ["Power", "⚡", "Mechanical power is <b>P = F × v</b>. Add margin: engineers usually choose a motor with 20 to 50 percent more than the calculated need."]
    ], () => {
      const m = 2 * ri(1, 10), a = ri(1, 3), mu = pick([0.05, 0.1]), r = pick([0.05, 0.1, 0.2]), G = pick([5, 10, 20]), v = ri(1, 4);
      const F = rd(m * a + mu * m * 10);
      return pick([
        Q(`A ${m} kg cart must accelerate at ${a} m/s². What force m·a is needed for the acceleration alone (N)?`, "🛒", m * a, ["Use F = m·a.", "Multiply the mass by the acceleration.", "Example: 6 kg at 2 m/s²: 12 N. Now do yours."]),
        Q(`A ${m} kg cart has rolling friction μ = ${mu}. What is the friction force μ·m·g (N)? (g = 10)`, "🛞", rd(mu * m * 10), ["Multiply μ, the mass and g.", "That is the force that always opposes the motion.", "Example: μ = 0.1, m = 8: 0.1·8·10 = 8 N. Now do yours."]),
        Q(`A ${m} kg cart accelerates at ${a} m/s² with rolling friction μ = ${mu}. What total force F = m·a + μ·m·g is needed (N)?`, "💪", F, ["Work out the acceleration force and the friction force.", "Add them.", "Example: m = 10, a = 1, μ = 0.1: 10 + 10 = 20 N. Now do yours."]),
        Q(`The wheels need a force of ${F} N and have radius ${r} m. What wheel torque T = F·r is needed (N·m)?`, "⚙️", rd(F * r), ["Force times radius.", "Multiply the two numbers.", "Example: 30 N and 0.1 m: 3 N·m. Now do yours."]),
        Q(`A wheel needs ${rd(F * r)} N·m. A gearbox with ratio ${G} drives it. What motor torque is needed (N·m)? (ideal)`, "🔧", rd(F * r / G), ["The gearbox multiplies torque.", "Divide the wheel torque by the gear ratio.", "Example: 6 N·m with a ratio of 20: 0.3 N·m. Now do yours."]),
        Q(`The cart needs ${F} N at a speed of ${v} m/s. What mechanical power does it need, P = F·v (W)?`, "⚡", rd(F * v), ["Power is force times speed.", "Multiply the two numbers.", "Example: 20 N at 3 m/s: 60 W. Now do yours."])
      ]);
    })
  ];
  c[18] = mix("Mixed practice", at(c, [0, 1, 2, 3, 6, 7, 8, 9, 12, 13, 14, 16, 17]));
  c[19] = mix("Level 30 Challenge", at(c, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));

  Object.assign(ENGINEER_LEVELS, { 28: a, 29: b, 30: c });
})();
